var YouYouToolkit=(()=>{var Mi=Object.defineProperty;var Eh=Object.getOwnPropertyDescriptor;var Ah=Object.getOwnPropertyNames;var Ch=Object.prototype.hasOwnProperty;var D=(t,e)=>()=>(t&&(e=t(t=0)),e);var ae=(t,e)=>{for(var r in e)Mi(t,r,{get:e[r],enumerable:!0})},kh=(t,e,r,s)=>{if(e&&typeof e=="object"||typeof e=="function")for(let o of Ah(e))!Ch.call(t,o)&&o!==r&&Mi(t,o,{get:()=>e[o],enumerable:!(s=Eh(e,o))||s.enumerable});return t};var Ih=t=>kh(Mi({},"__esModule",{value:!0}),t);var U,Pi,W,Ze=D(()=>{U={STORAGE_CHANGED:"storage:changed",STORAGE_CLEARED:"storage:cleared",PRESET_CREATED:"preset:created",PRESET_UPDATED:"preset:updated",PRESET_DELETED:"preset:deleted",PRESET_ACTIVATED:"preset:activated",PRESET_IMPORTED:"preset:imported",PRESET_EXPORTED:"preset:exported",API_CONFIG_UPDATED:"api:configUpdated",API_REQUEST_START:"api:requestStart",API_REQUEST_SUCCESS:"api:requestSuccess",API_REQUEST_ERROR:"api:requestError",API_CONNECTION_TESTED:"api:connectionTested",TOOL_REGISTERED:"tool:registered",TOOL_UNREGISTERED:"tool:unregistered",TOOL_UPDATED:"tool:updated",TOOL_RUNTIME_UPDATED:"tool:runtimeUpdated",TOOL_ENABLED:"tool:enabled",TOOL_DISABLED:"tool:disabled",TOOL_EXECUTING:"tool:executing",TOOL_EXECUTED:"tool:executed",TOOL_ERROR:"tool:error",TOOL_EXECUTION_STARTED:"tool:executionStarted",TOOL_EXECUTION_FAILED:"tool:executionFailed",REGEX_RULE_ADDED:"regex:ruleAdded",REGEX_RULE_UPDATED:"regex:ruleUpdated",REGEX_RULE_DELETED:"regex:ruleDeleted",REGEX_RULES_CLEARED:"regex:rulesCleared",REGEX_PRESET_LOADED:"regex:presetLoaded",REGEX_EXTRACTED:"regex:extracted",UI_INITIALIZED:"ui:initialized",UI_RENDER_REQUESTED:"ui:renderRequested",UI_TAB_CHANGED:"ui:tabChanged",UI_SUBTAB_CHANGED:"ui:subTabChanged",UI_POPUP_OPENED:"ui:popupOpened",UI_POPUP_CLOSED:"ui:popupClosed",UI_WINDOW_CREATED:"ui:windowCreated",UI_WINDOW_CLOSED:"ui:windowClosed",APP_INITIALIZING:"app:initializing",APP_INITIALIZED:"app:initialized",APP_ERROR:"app:error",SETTINGS_UPDATED:"settings:updated",TOOL_CONTEXT_INJECTED:"tool:contextInjected",TOOL_CONTEXT_CLEARED:"tool:contextCleared",BYPASS_PRESET_CREATED:"bypass:presetCreated",BYPASS_PRESET_UPDATED:"bypass:presetUpdated",BYPASS_PRESET_DELETED:"bypass:presetDeleted",BYPASS_PRESET_ACTIVATED:"bypass:presetActivated",TOOL_OUTPUT_MODE_CHANGED:"tool:outputModeChanged"},Pi=class{constructor(){this.listeners=new Map,this.onceCallbacks=new Map,this.history=[],this.maxHistorySize=100,this.debugMode=!1}on(e,r,s={}){if(!e||typeof r!="function")return console.warn("[EventBus] \u65E0\u6548\u7684\u4E8B\u4EF6\u6216\u56DE\u8C03"),()=>{};let{priority:o=0}=s;this.listeners.has(e)||this.listeners.set(e,new Set);let n={callback:r,priority:o};return this.listeners.get(e).add(n),this.debugMode&&console.log(`[EventBus] \u8BA2\u9605: ${e}`),()=>this.off(e,r)}off(e,r){let s=this.listeners.get(e);if(s){for(let o of s)if(o.callback===r){s.delete(o);break}this.debugMode&&console.log(`[EventBus] \u53D6\u6D88\u8BA2\u9605: ${e}`)}}emit(e,r){this.debugMode&&console.log(`[EventBus] \u53D1\u5E03: ${e}`,r),this._addToHistory(e,r);let s=this.listeners.get(e);if(!s||s.size===0)return;let o=Array.from(s).sort((n,a)=>a.priority-n.priority);for(let{callback:n}of o)try{n(r)}catch(a){console.error(`[EventBus] \u4E8B\u4EF6\u5904\u7406\u9519\u8BEF (${e}):`,a)}}once(e,r){let s=o=>{this.off(e,s),r(o)};return this.on(e,s)}wait(e,r=0){return new Promise((s,o)=>{let n=null,a=this.once(e,i=>{n&&clearTimeout(n),s(i)});r>0&&(n=setTimeout(()=>{a(),o(new Error(`\u7B49\u5F85\u4E8B\u4EF6\u8D85\u65F6: ${e}`))},r))})}hasListeners(e){let r=this.listeners.get(e);return r&&r.size>0}listenerCount(e){let r=this.listeners.get(e);return r?r.size:0}removeAllListeners(e){e?this.listeners.delete(e):this.listeners.clear()}setDebugMode(e){this.debugMode=e}_addToHistory(e,r){this.history.push({event:e,data:r,timestamp:Date.now()}),this.history.length>this.maxHistorySize&&this.history.shift()}getHistory(e){return e?this.history.filter(r=>r.event===e):[...this.history]}clearHistory(){this.history=[]}},W=new Pi});var Bd={};ae(Bd,{LOG_LEVEL:()=>fe,LoggerService:()=>Hn,default:()=>Rh,logger:()=>E});var fe,$d,Hn,E,Rh,H=D(()=>{Ze();fe=Object.freeze({DEBUG:0,INFO:1,WARN:2,ERROR:3}),$d=Object.freeze({[fe.DEBUG]:"DEBUG",[fe.INFO]:"INFO",[fe.WARN]:"WARN",[fe.ERROR]:"ERROR"}),Hn=class{constructor(){this._entries=[],this._maxSize=2e3,this._nextId=1,this._minLevel=fe.INFO,this._eventKey="logger:entry",this._statsEventKey="logger:statsChanged",this._pendingFlush=!1,this._toastHandler=null}_write(e,r,s,o,n){let a={id:this._nextId++,timestamp:Date.now(),level:e,scope:r,message:s,data:o};if(this._entries.push(a),this._entries.length>this._maxSize&&this._entries.shift(),this._forwardToConsole(a),this._toastHandler&&n)try{this._toastHandler(this.levelToToastType(e),s,n)}catch{}this._pendingFlush||(this._pendingFlush=!0,queueMicrotask(()=>{this._pendingFlush=!1,this._emitEntry(a)}))}_forwardToConsole(e){let r=`[${e.scope}]`;switch(e.level){case fe.DEBUG:console.debug(r,e.message,e.data??"");break;case fe.INFO:console.log(r,e.message,e.data??"");break;case fe.WARN:console.warn(r,e.message,e.data??"");break;case fe.ERROR:console.error(r,e.message,e.data??"");break}}_emitEntry(e){try{W?.emit(this._eventKey,e)}catch{}}debug(e,r,s,o){fe.DEBUG<this._minLevel||this._write(fe.DEBUG,e,r,s,o)}info(e,r,s,o){fe.INFO<this._minLevel||this._write(fe.INFO,e,r,s,o)}log(e,r,s,o){this.info(e,r,s,o)}warn(e,r,s,o){fe.WARN<this._minLevel||this._write(fe.WARN,e,r,s,o)}error(e,r,s,o){fe.ERROR<this._minLevel||this._write(fe.ERROR,e,r,s,o)}createScope(e){return{debug:(r,s,o)=>this.debug(e,r,s,o),info:(r,s,o)=>this.info(e,r,s,o),log:(r,s,o)=>this.log(e,r,s,o),warn:(r,s,o)=>this.warn(e,r,s,o),error:(r,s,o)=>this.error(e,r,s,o)}}setToastHandler(e){this._toastHandler=e}levelToToastType(e){switch(e){case fe.WARN:return"warning";case fe.ERROR:return"error";default:return"info"}}getEntries(e={}){let{level:r,scope:s,search:o,limit:n=500,offset:a=0}=e,i=this._entries;if(r!=null&&(i=i.filter(d=>d.level>=r)),s&&(i=i.filter(d=>d.scope===s)),o){let d=o.toLowerCase();i=i.filter(c=>c.scope.toLowerCase().includes(d)||c.message.toLowerCase().includes(d))}let l=i.length;return i=i.slice(a,a+n),{entries:i,total:l}}getStats(){let e={total:this._entries.length,byLevel:{DEBUG:0,INFO:0,WARN:0,ERROR:0},byScope:{}};for(let r of this._entries){let s=$d[r.level]||"UNKNOWN";e.byLevel[s]=(e.byLevel[s]||0)+1,e.byScope[r.scope]=(e.byScope[r.scope]||0)+1}return e}setLevel(e){this._minLevel=e}getLevel(){return this._minLevel}setMaxSize(e){this._maxSize=Math.max(100,Math.min(1e4,e))}clear(){this._entries=[],this._nextId=1}levelLabel(e){return $d[e]||"UNKNOWN"}},E=new Hn,Rh=E});function Bt(){return typeof window.parent<"u"&&window.parent!==window&&window.parent.document?window.parent.document:document}function ie(t){return typeof t!="string"?"":t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function Gn(t,e,r=3e3){e||(e=t==="error"?"\u64CD\u4F5C\u5931\u8D25":"\u64CD\u4F5C\u5B8C\u6210");let s=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(s.toastr){s.toastr[t](e,"YouYou \u5DE5\u5177\u7BB1",{timeOut:r,progressBar:!0});return}Nh(t,e,r),Ph.log(`[${t.toUpperCase()}] ${e}`)}function $i(t,e,r={}){e||(e=t==="error"?"\u64CD\u4F5C\u5931\u8D25":"\u64CD\u4F5C\u5B8C\u6210");let{duration:s=3500,sticky:o=!1,noticeId:n=""}=r,a=Bt();if(!a?.body){Gn(t,e,s);return}let i="yyt-top-notice-container",l="yyt-top-notice-styles",d=a.getElementById(i);if(d||(d=a.createElement("div"),d.id=i,d.style.cssText=`
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
    `,a.head.appendChild(h)}if(n){let h=d.querySelector(`[data-notice-id="${n}"]`);h&&h.remove()}let c={success:"\u2713",error:"!",warning:"\u2022",info:"i"},u=a.createElement("div");u.className=`yyt-top-notice yyt-top-notice--${t||"info"}`,n&&(u.dataset.noticeId=n);let p=a.createElement("span");p.className="yyt-top-notice__icon",p.textContent=c[t]||c.info;let y=a.createElement("div");y.className="yyt-top-notice__content",y.textContent=e;let m=a.createElement("button");m.className="yyt-top-notice__close",m.type="button",m.setAttribute("aria-label","\u5173\u95ED\u901A\u77E5"),m.textContent="\xD7";let g=()=>{u.style.animation="yyt-top-notice-out 0.18s ease forwards",setTimeout(()=>u.remove(),180)};m.addEventListener("click",g),u.appendChild(p),u.appendChild(y),u.appendChild(m),d.appendChild(u),o||setTimeout(g,s)}function Nh(t,e,r){let s=Bt();if(!s)return;let o=s.getElementById("yyt-fallback-toast");o&&o.remove();let n={success:{bg:"rgba(74, 222, 128, 0.9)",border:"#22c55e"},error:{bg:"rgba(248, 113, 113, 0.9)",border:"#ef4444"},warning:{bg:"rgba(251, 191, 36, 0.9)",border:"#f59e0b"},info:{bg:"rgba(123, 183, 255, 0.9)",border:"#7bb7ff"}},a=n[t]||n.info,i=s.createElement("div");i.id="yyt-fallback-toast",i.style.cssText=`
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
  `,i.textContent=e,s.body.appendChild(i),setTimeout(()=>{i.style.animation="yyt-toast-out 0.3s ease forwards",setTimeout(()=>{i.remove()},300)},r)}function te(){if(ds)return ds;if(typeof window.parent<"u"&&window.parent!==window)try{if(window.parent.jQuery)return ds=window.parent.jQuery,ds}catch{}return window.jQuery&&(ds=window.jQuery),ds}function Dh(){ds=null}function we(t){if(!t||t.length===0)return!1;let e=t[0];if(!e||e.nodeType!==1)return!1;let r=e.ownerDocument||document;return e.isConnected?r?.documentElement?.contains?r.documentElement.contains(e):!0:!1}function Mr(...t){return t.flat(1/0).flatMap(e=>String(e||"").split(/\s+/)).map(e=>e.trim()).filter(Boolean).join(" ")}function Hs(t={}){return Object.entries(t).filter(([,e])=>e!=null&&e!==!1).map(([e,r])=>r===!0?e:`${e}="${ie(String(r))}"`).join(" ")}function jd(t=[],e="",r=""){let s=String(e??""),o=t.find(n=>n.value===s)||t.find(n=>n.disabled!==!0)||null;return o||{value:s,label:r||s||"\u8BF7\u9009\u62E9",disabled:!1}}function Lh(t=""){return String(t||"").split(/\s+/).map(e=>e.trim()).filter(e=>e&&e!=="yyt-select"&&e!=="yyt-native-select-bridge")}function Kd(t,e){let r=te();if(!r||!e?.length)return null;let s=e.attr("id")?`#${e.attr("id")}`:e.attr("data-yyt-select-key")?`[data-yyt-select-key="${e.attr("data-yyt-select-key")}"]`:"";if(!s)return null;let n=t.find("[data-yyt-custom-select]").filter((a,i)=>String(r(i).attr("data-yyt-select-target")||"")===s);return n.length?n.first():null}function Wd(t){let e=t?.[0];return e?.ownerDocument?e.ownerDocument:typeof window.parent<"u"&&window.parent!==window&&window.parent.document?window.parent.document:document}function Oh(t){if(!te()||!we(t))return null;let r=t.find("[data-yyt-custom-select]");return r.length?r:null}function Hd(t,e){if(!te()||!e?.length)return null;let s=e.find("[data-yyt-select-native]").first();if(s.length)return s;let o=String(e.attr("data-yyt-select-target")||"").trim();if(!o)return null;let n=t.find(o).first();return n.length?n:null}function Gd(t=null){return t?.jquery&&t[0]?.ownerDocument?t[0].ownerDocument:t?.ownerDocument?t.ownerDocument:t?.nodeType===9?t:Bt()}function er(t=null){let e=Gd(t),r=Ud.get(e);return r||(r={targetDoc:e,layer:null,activeRoot:null,activeDropdown:null,placeholder:null,cleanup:null},Ud.set(e,r)),r}function $h(t=null){let e=Gd(t);if(!e?.body)return null;let r=er(e);if(r.layer&&r.layer.isConnected)return r.layer;let s=e.getElementById(Fd);return s||(s=e.createElement("div"),s.id=Fd,s.className="yyt-select-portal-layer",e.body.appendChild(s)),r.layer=s,s}function qn(t){if(!te()||!t?.length)return null;let r=t.find("[data-yyt-select-trigger]").first();return r.length?r:t.find(".yyt-select-trigger").first()}function qd(t){let e=te();if(!e||!t?.length)return null;let r=er(t);if(r.activeRoot===t[0]&&r.activeDropdown)return e(r.activeDropdown);let s=t.find("[data-yyt-select-dropdown]").first();return s.length?s:t.find(".yyt-select-dropdown").first()}function Bh(t){t&&(t.classList.remove("yyt-floating-open"),t.removeAttribute("data-yyt-floating"),t.removeAttribute("data-yyt-floating-placement"),t.style.position="",t.style.top="",t.style.left="",t.style.right="",t.style.width="",t.style.minWidth="",t.style.maxWidth="",t.style.maxHeight="",t.style.visibility="",t.style.zIndex="")}function Yd(t,e=null){if(!t)return!1;let r=er(e||t);return r.activeRoot?.contains?.(t)||r.activeDropdown?.contains?.(t)?!0:!!t.closest?.("[data-yyt-custom-select], .yyt-select-portal-layer")}function zh(t){if(!t?.targetDoc||typeof t.cleanup=="function")return;let e=t.targetDoc,r=e.defaultView||window,s=i=>{!t.activeRoot||!t.activeDropdown||Yd(i.target,e)||Zt(e)},o=i=>{if(i.key!=="Escape")return;let l=t.activeRoot;Zt(e);let d=te();d&&l&&qn(d(l))?.trigger("focus")},n=()=>{Oi(e)},a=()=>{Oi(e)};e.addEventListener("mousedown",s,!0),e.addEventListener("keydown",o,!0),r.addEventListener("resize",n),e.addEventListener("scroll",a,!0),t.cleanup=()=>{e.removeEventListener("mousedown",s,!0),e.removeEventListener("keydown",o,!0),r.removeEventListener("resize",n),e.removeEventListener("scroll",a,!0)}}function Kh(t){typeof t?.cleanup=="function"&&t.cleanup(),t&&(t.cleanup=null)}function Li(t){let e=te();if(!e||!t?.activeRoot||!t?.activeDropdown)return;let r=t.targetDoc;if(!r?.body?.contains?.(t.activeRoot)){Zt(r);return}let s=e(t.activeRoot),o=qn(s),n=t.activeDropdown,a=r?.defaultView||window;if(!o?.length||!n?.isConnected||!s[0]?.isConnected){Zt(r);return}let i=o[0].getBoundingClientRect(),l=a.innerWidth||r.documentElement?.clientWidth||0,d=a.innerHeight||r.documentElement?.clientHeight||0,c=12,u=8,p=Math.max(0,d-i.bottom-c-u),y=Math.max(0,i.top-c-u),m=p<220&&y>p,h=Math.max(120,Math.floor((m?y:p)||0));n.setAttribute("data-yyt-floating","true"),n.setAttribute("data-yyt-floating-placement",m?"top":"bottom"),n.classList.add("yyt-floating-open");let x=Math.ceil(i.width),S=Math.max(x,Math.floor(l-c*2)),T=n.style.width,A=n.style.minWidth,C=n.style.maxWidth,w=n.style.visibility;n.style.width="max-content",n.style.minWidth=`${x}px`,n.style.maxWidth=`${S}px`,n.style.visibility="hidden";let P=Math.ceil(n.scrollWidth||n.getBoundingClientRect().width||x),B=Math.max(x,Math.min(S,P)),z=Math.min(n.scrollHeight||h,h);n.style.width=T,n.style.minWidth=A,n.style.maxWidth=C,n.style.visibility=w;let R=Math.round(i.left);R+B>l-c&&(R=Math.max(c,Math.round(l-c-B))),R=Math.max(c,R);let _=Math.round(m?i.top-u-z:i.bottom+u);_=Math.max(c,Math.min(_,Math.round(d-c-z))),n.style.position="fixed",n.style.top=`${_}px`,n.style.left=`${R}px`,n.style.right="auto",n.style.width=`${B}px`,n.style.minWidth=`${x}px`,n.style.maxWidth=`${S}px`,n.style.maxHeight=`${Math.floor(h)}px`,n.style.visibility="",n.style.zIndex="10050"}function Zt(t=null){let e=te(),r=er(t);if(!e||!r?.activeRoot)return;let s=r.activeRoot,o=r.activeDropdown,n=r.placeholder,a=e(s),i=qn(a);o&&(Bh(o),n?.parentNode?n.parentNode.insertBefore(o,n):s?.isConnected?s.appendChild(o):o.remove()),n?.parentNode?.removeChild(n),a.removeClass("yyt-open"),i?.attr("aria-expanded","false"),r.activeRoot=null,r.activeDropdown=null,r.placeholder=null,Kh(r)}function Oi(t=null){let e=er(t);!e?.activeRoot||!e?.activeDropdown||Li(e)}function Vd(t){if(!te()||!t?.length)return;let r=t.first(),s=qn(r),o=qd(r);if(!s?.length||!o?.length||s.prop("disabled"))return;let n=er(r);if(n.activeRoot===r[0]){Li(n);return}Zt(r);let a=$h(r);if(!a)return;let i=o[0],l=n.targetDoc.createComment("yyt-select-dropdown-placeholder");i.parentNode?.insertBefore(l,i),a.appendChild(i),n.activeRoot=r[0],n.activeDropdown=i,n.placeholder=l,r.addClass("yyt-open"),s.attr("aria-expanded","true"),zh(n),Li(n)}function Uh(t,e){let r=te();if(!r||!e?.length)return null;let s=e.closest("[data-yyt-custom-select]");if(s.length)return s.first();let o=er(e);if(o.activeRoot&&o.activeDropdown?.contains?.(e[0])){let n=r(o.activeRoot);return t.has(o.activeRoot).length?n:null}return null}function Bi(t){let e=er(t);t?.length&&e.activeRoot&&e.activeRoot!==t[0]||Zt(t)}function Jd(t){let e=er(t);if(t?.length&&e.activeRoot===t[0]){Zt(t);return}Vd(t)}function Ni(t,e,r=null){let s=te();if(!s||!e?.length)return;let o=r||Hd(t,e);if(!o?.length)return;let n=Array.isArray(o.data("yytCustomSelectOptions"))?o.data("yytCustomSelectOptions"):[],a=jd(n,o.val(),e.attr("data-yyt-select-placeholder")||""),i=String(a.value??""),l=String(a.label??""),d=o.is(":disabled");e.find(".yyt-select-value").text(l).attr("data-value",i).data("value",i);let c=qd(e);(c?.length?c.find("[data-yyt-select-option]"):e.find("[data-yyt-select-option]")).each((y,m)=>{let g=s(m),h=String(g.attr("data-value")||"")===i;g.toggleClass("yyt-selected",h).attr("aria-selected",String(h))});let p=e.find("[data-yyt-select-trigger]").first();p.prop("disabled",d),d&&(Bi(e),e.removeClass("yyt-open"),p.attr("aria-expanded","false"))}function Xd(t=[]){return Array.isArray(t)?t.map(e=>{if(e&&typeof e=="object"&&!Array.isArray(e)){let s=String(e.value??""),o=String(e.label??e.text??e.name??s);return{value:s,label:o,disabled:e.disabled===!0}}let r=String(e??"");return{value:r,label:r,disabled:!1}}):[]}function Qd(t={}){let{selectedValue:e="",options:r=[],placeholder:s="\u8BF7\u9009\u62E9",disabled:o=!1,includeNative:n=!0,nativeTag:a="input",nativeType:i="hidden",rootAttributes:l={},nativeAttributes:d={},triggerAttributes:c={},dropdownAttributes:u={},optionAttributes:p={},optionClass:y="",optionTextClass:m=""}=t,g=Xd(r),h=jd(g,e,s),x=o===!0||g.length===0,S=Hs({...l,class:Mr("yyt-custom-select",l.class),"data-yyt-custom-select":l["data-yyt-custom-select"]??"true","data-yyt-select-placeholder":s}),T=Hs({type:"button",...c,class:Mr("yyt-select-trigger",c.class),"data-yyt-select-trigger":c["data-yyt-select-trigger"]??"true","aria-haspopup":c["aria-haspopup"]??"listbox","aria-expanded":c["aria-expanded"]??"false",disabled:x?!0:c.disabled}),A=Hs({...u,class:Mr("yyt-select-dropdown",u.class),"data-yyt-select-dropdown":u["data-yyt-select-dropdown"]??"true",role:u.role??"listbox"}),C=n?(()=>{let w={...d,class:Mr(d.class),"data-yyt-select-native":d["data-yyt-select-native"]??"true",disabled:x?!0:d.disabled};return a==="select"?`<select ${Hs(w)}>${g.map(z=>`
            <option value="${ie(z.value)}" ${z.value===String(h.value??"")?"selected":""} ${z.disabled?"disabled":""}>${ie(z.label)}</option>
          `).join("")}</select>`:`<input ${Hs({type:i,value:h.value,...w})}>`})():"";return`
    <div ${S}>
      ${C}
      <button ${T}>
        <span class="${ie(Mr("yyt-select-value"))}" data-value="${ie(h.value)}">${ie(h.label)}</span>
        <i class="fa-solid fa-chevron-down yyt-select-arrow"></i>
      </button>
      <div ${A}>
        ${g.map(w=>{let P=w.value===String(h.value??"");return`
            <button ${Hs({type:"button",...p,class:Mr("yyt-select-option",y,p.class,P?"yyt-selected":""),"data-yyt-select-option":p["data-yyt-select-option"]??"true","data-value":w.value,role:p.role??"option","aria-selected":P?"true":"false",disabled:w.disabled?!0:p.disabled})}>
              <span class="${ie(Mr("yyt-option-text",m))}">${ie(w.label)}</span>
            </button>
          `}).join("")}
      </div>
    </div>
  `}function gt(t,e="yytCustomSelect"){let r=te();if(!r||!we(t))return;let s=Wd(t),o=er(s);o.activeRoot&&t.has(o.activeRoot).length&&Zt(s),t.off(`.${e}`),r(s).off(`click.${e}`),r(s).off(`mousedown.${e}`),t.find('[data-yyt-enhanced-select="true"]').remove(),t.find(".yyt-native-select-bridge").each((n,a)=>{let i=r(a),l=i.attr("data-yyt-original-style");l!==void 0&&l?i.attr("style",l):i.removeAttr("style"),i.removeClass("yyt-native-select-bridge").removeAttr("data-yyt-original-style").removeAttr("data-yyt-select-key").removeData("yytCustomSelectOptions")})}function zt(t,e={}){let r=te();if(!r||!we(t))return;let{namespace:s="yytCustomSelect",selectors:o=[]}=e,n=Array.isArray(o)?o.filter(Boolean):[o].filter(Boolean);if(n.length===0)return;gt(t,s);let a=n.join(", "),i=Wd(t);t.find(a).each((l,d)=>{let c=r(d),u=String(c.attr("id")||"").trim(),p=u||`yyt-select-${Date.now()}-${l}`,y=u?`#${u}`:`[data-yyt-select-key="${p}"]`,m=`${p}-dropdown`,g=Lh(c.attr("class")),h=c.attr("style"),x=c.find("option").map((A,C)=>{let w=r(C);return{value:String(w.attr("value")??w.val()??""),label:w.text(),disabled:w.is(":disabled")}}).get();c.attr("data-yyt-original-style",h??"").attr("data-yyt-select-key",p).addClass("yyt-native-select-bridge").css("display","none").data("yytCustomSelectOptions",x);let S=Qd({includeNative:!1,selectedValue:c.val(),options:x,disabled:c.is(":disabled"),placeholder:x[0]?.label||"\u8BF7\u9009\u62E9",rootAttributes:{class:Mr(g),style:h||void 0,"data-yyt-enhanced-select":"true","data-yyt-select-target":y},triggerAttributes:{id:`${p}-trigger`,"aria-controls":m},dropdownAttributes:{id:m}});c.after(S);let T=Kd(t,c);Ni(t,T,c)}),t.on(`click.${s}`,"[data-yyt-select-trigger]",l=>{l.preventDefault(),l.stopPropagation();let d=r(l.currentTarget);if(d.prop("disabled"))return;let c=d.closest("[data-yyt-custom-select]");Jd(c)}),t.on(`change.${s}`,a,l=>{let d=r(l.currentTarget),c=d.find("option").map((p,y)=>{let m=r(y);return{value:String(m.attr("value")??m.val()??""),label:m.text(),disabled:m.is(":disabled")}}).get();d.data("yytCustomSelectOptions",c);let u=Kd(t,d);Ni(t,u,d)}),r(i).off(`click.${s}`).on(`click.${s}`,l=>{if(Yd(l.target,i))return;let d=Oh(t);d?.length&&(Zt(i),d.filter(".yyt-open").removeClass("yyt-open").find("[data-yyt-select-trigger]").attr("aria-expanded","false"))}),r(i).off(`mousedown.${s}`,".yyt-select-portal-layer [data-yyt-select-option]").on(`mousedown.${s}`,".yyt-select-portal-layer [data-yyt-select-option]",l=>{l.preventDefault(),l.stopPropagation();let d=r(l.currentTarget);if(d.prop("disabled"))return;let c=Uh(t,d);if(!c?.length)return;let u=Hd(t,c);if(!u?.length)return;let p=String(d.attr("data-value")||"");u.val(p).trigger("change"),Ni(t,c,u),Bi(c)})}function Fh(t,e=us){if(!te()||!we(t))return{url:"",apiKey:"",model:"",useMainApi:!0,stream:!1,max_tokens:4096,temperature:.7,top_p:.9};let s=t.find(`#${e}-model`).val()?.trim()||"",o=t.find(`#${e}-model-select`);return o.is(":visible")&&(s=o.val()||s),{url:t.find(`#${e}-api-url`).val()?.trim()||"",apiKey:t.find(`#${e}-api-key`).val()||"",model:s,useMainApi:t.find(`#${e}-use-main-api`).is(":checked"),stream:t.find(`#${e}-stream`).is(":checked"),max_tokens:parseInt(t.find(`#${e}-max-tokens`).val())||4096,temperature:parseFloat(t.find(`#${e}-temperature`).val())??.7,top_p:parseFloat(t.find(`#${e}-top-p`).val())??.9}}function jh(t,e,r=us){if(!te()||!we(t)||!e)return;t.find(`#${r}-api-url`).val(e.url||""),t.find(`#${r}-api-key`).val(e.apiKey||""),t.find(`#${r}-model`).val(e.model||""),t.find(`#${r}-stream`).prop("checked",e.stream===!0),t.find(`#${r}-max-tokens`).val(e.max_tokens||4096),t.find(`#${r}-temperature`).val(e.temperature??.7),t.find(`#${r}-top-p`).val(e.top_p??.9);let o=e.useMainApi??!0;t.find(`#${r}-use-main-api`).prop("checked",o);let a=t.find(`#${r}-custom-api-fields`);o?a.addClass("yyt-disabled").find("input, button, select").prop("disabled",!0):a.removeClass("yyt-disabled").find("input, button, select").prop("disabled",!1),t.find(`#${r}-model`).show(),t.find(`#${r}-model-select`).hide()}function Bo(t){let{id:e,title:r,body:s,width:o="380px",wide:n=!1,dialogClass:a="",bodyClass:i="",footerClass:l=""}=t;return`
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
  `}function zo(t,e,r={}){if(!te())return()=>{};let o=t.find(`#${e}-overlay`),n=()=>{o.remove(),a?.removeEventListener("keydown",i),r.onClose&&r.onClose()};o.find(`#${e}-close, #${e}-cancel`).on("click",n),o.on("click",function(l){l.target===this&&n()}),o.find(`#${e}-save`).on("click",function(){r.onSave&&r.onSave(n)});let a=o[0]?.ownerDocument||document,i=l=>{l.key==="Escape"&&(l.stopPropagation(),n())};return a.addEventListener("keydown",i),n}function br(t,e,r={}){let{confirmText:s="\u786E\u5B9A",cancelText:o="\u53D6\u6D88",danger:n=!1,width:a="380px"}=r,i=te(),l=Bt();if(!i||!l?.body)return Promise.resolve(!1);let d=`yyt-confirm-${++Zd}`;return new Promise(c=>{let u=!1,p=h=>{u||(u=!0,g.remove(),y?.focus(),c(h))},y=l.activeElement,m=`
      <div class="yyt-dialog-overlay" id="${d}-overlay">
        <div class="yyt-dialog" style="${a!=="380px"?`width: ${a};`:""} max-height: calc(100vh - 32px);">
          <div class="yyt-dialog-header">
            <span class="yyt-dialog-title">${ie(t)}</span>
            <button class="yyt-dialog-close" id="${d}-close">
              <i class="fa-solid fa-times"></i>
            </button>
          </div>
          <div class="yyt-dialog-body">
            <div style="color: var(--yyt-text-secondary); font-size: 13px; line-height: 1.6;">${ie(e)}</div>
          </div>
          <div class="yyt-dialog-footer">
            <button class="yyt-btn yyt-btn-secondary" id="${d}-cancel">${ie(o)}</button>
            <button class="yyt-btn ${n?"yyt-btn-danger":"yyt-btn-primary"}" id="${d}-confirm">${ie(s)}</button>
          </div>
        </div>
      </div>`,g=i(m).appendTo(l.body);g.find(`#${d}-confirm`).on("click",()=>p(!0)),g.find(`#${d}-cancel, #${d}-close`).on("click",()=>p(!1)),g.on("click",function(h){h.target===this&&p(!1)}),g.on("keydown",h=>{h.key==="Escape"&&(h.stopPropagation(),p(!1)),h.key==="Enter"&&(h.stopPropagation(),p(!0))}),g.find(`#${d}-${n?"cancel":"confirm"}`).trigger("focus")})}function Wh(t,e,r={}){let{defaultValue:s="",placeholder:o="",confirmText:n="\u786E\u5B9A",cancelText:a="\u53D6\u6D88",width:i="380px"}=r,l=te(),d=Bt();if(!l||!d?.body)return Promise.resolve(null);let c=`yyt-prompt-${++Zd}`;return new Promise(u=>{let p=!1,y=T=>{p||(p=!0,h.remove(),m?.focus(),u(T))},m=d.activeElement,g=`
      <div class="yyt-dialog-overlay" id="${c}-overlay">
        <div class="yyt-dialog" style="${i!=="380px"?`width: ${i};`:""} max-height: calc(100vh - 32px);">
          <div class="yyt-dialog-header">
            <span class="yyt-dialog-title">${ie(t)}</span>
            <button class="yyt-dialog-close" id="${c}-close">
              <i class="fa-solid fa-times"></i>
            </button>
          </div>
          <div class="yyt-dialog-body">
            ${e?`<div style="color: var(--yyt-text-secondary); font-size: 13px; line-height: 1.6;">${ie(e)}</div>`:""}
            <input class="yyt-input" id="${c}-input" type="text" value="${ie(s)}" placeholder="${ie(o)}" />
          </div>
          <div class="yyt-dialog-footer">
            <button class="yyt-btn yyt-btn-secondary" id="${c}-cancel">${ie(a)}</button>
            <button class="yyt-btn yyt-btn-primary" id="${c}-confirm">${ie(n)}</button>
          </div>
        </div>
      </div>`,h=l(g).appendTo(d.body),x=h.find(`#${c}-input`),S=()=>{let T=x.val().trim();y(T||null)};h.find(`#${c}-confirm`).on("click",S),h.find(`#${c}-cancel, #${c}-close`).on("click",()=>y(null)),h.on("click",function(T){T.target===this&&y(null)}),x.on("keydown",T=>{T.key==="Enter"&&(T.stopPropagation(),S())}),h.on("keydown",T=>{T.key==="Escape"&&(T.stopPropagation(),y(null))}),x.trigger("focus").trigger("select")})}function Hh(t,e,r){if(t.prop("disabled")&&t.data("yytLoading"))return Promise.resolve();let s=t.html(),o=t.outerWidth();if(t.prop("disabled",!0).data("yytLoading",!0),t.css("min-width",o+"px"),r)t.html(`<i class="fa-solid fa-spinner fa-spin" style="margin-right:4px"></i>${ie(r)}`);else{let n=t.find("i.fa-solid, i.fa-regular").first();n.length?(n.data("yytOriginalClass",n.attr("class")),n.attr("class","fa-solid fa-spinner fa-spin")):t.html(`<i class="fa-solid fa-spinner fa-spin" style="margin-right:4px"></i>${s}`)}return Promise.resolve().then(()=>e()).finally(()=>{if(r)t.html(s);else{let n=t.find("i.fa-spinner"),a=n.data("yytOriginalClass");a?n.attr("class",a).removeData("yytOriginalClass"):t.html(s)}t.prop("disabled",!1).removeData("yytLoading").css("min-width","")})}function Ko(t,e){let r=new Blob([t],{type:"application/json"}),s=URL.createObjectURL(r),o=document.createElement("a");o.href=s,o.download=e,o.click(),URL.revokeObjectURL(s)}function Uo(t){return new Promise((e,r)=>{let s=new FileReader;s.onload=o=>e(o.target.result),s.onerror=o=>r(new Error("\u6587\u4EF6\u8BFB\u53D6\u5931\u8D25")),s.readAsText(t)})}var Ph,us,Di,ds,Ud,Fd,Zd,tt=D(()=>{H();Ph=E.createScope("UIUtils"),us="youyou_toolkit",Di=class{constructor(e={}){this._state={...e}}get(e){return this._state[e]}set(e,r){return this._state[e]=r,this}reset(e={}){return this._state={...e},this}toJSON(){return{...this._state}}};ds=null;Ud=new WeakMap,Fd="yyt-select-portal-layer";Zd=0});var eu={};ae(eu,{StorageService:()=>ps,default:()=>Vh,getStorage:()=>Gh,loadSettings:()=>qh,presetStorage:()=>ke,saveSettings:()=>Yh,storage:()=>$,toolStorage:()=>Se,windowStorage:()=>Yn});function Gh(){let t=$;return t._getStorage(),t._storage}function qh(){return $.get("settings",{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}})}function Yh(t){$.set("settings",t)}var zi,ps,$,Se,ke,Yn,Vh,je=D(()=>{H();zi=E.createScope("StorageService"),ps=class t{constructor(e="youyou_toolkit"){this.namespaceKey=e,this._storage=null,this._cache=new Map}_getStorage(){if(this._storage)return this._storage;try{let e=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(e.SillyTavern?.getContext){let r=e.SillyTavern.getContext();if(r?.extensionSettings)return r.extensionSettings[this.namespaceKey]||(r.extensionSettings[this.namespaceKey]={}),this._storage={_target:r.extensionSettings[this.namespaceKey],getItem:s=>{let o=r.extensionSettings[this.namespaceKey][s];return typeof o=="string"?o:o?JSON.stringify(o):null},setItem:(s,o)=>{r.extensionSettings[this.namespaceKey][s]=o,this._saveSettings(r)},removeItem:s=>{delete r.extensionSettings[this.namespaceKey][s],this._saveSettings(r)},_isTavern:!0},this._storage}}catch{zi.warn("SillyTavern\u5B58\u50A8\u4E0D\u53EF\u7528\uFF0C\u4F7F\u7528localStorage")}return this._storage={getItem:e=>{try{return localStorage.getItem(e)}catch{return null}},setItem:(e,r)=>{try{localStorage.setItem(e,r)}catch(s){zi.error("localStorage\u5199\u5165\u5931\u8D25:",s)}},removeItem:e=>{try{localStorage.removeItem(e)}catch{}},_isTavern:!1},this._storage}_saveSettings(e){if(typeof e.saveSettings=="function")try{e.saveSettings()}catch{}else if(typeof e.saveSettingsDebounced=="function")try{e.saveSettingsDebounced()}catch{}}get(e,r=null){let s=`${this.namespaceKey}:${e}`;if(this._cache.has(s))return this._cache.get(s);let o=this._getStorage(),n=this._getFullKey(e),a=o.getItem(n);if(a===null)return r;try{let i=JSON.parse(a);return this._cache.set(s,i),i}catch{return a}}set(e,r){let s=this._getStorage(),o=this._getFullKey(e),n=`${this.namespaceKey}:${e}`;this._cache.set(n,r);try{s.setItem(o,JSON.stringify(r))}catch(a){zi.error("\u5B58\u50A8\u5931\u8D25:",a)}}remove(e){let r=this._getStorage(),s=this._getFullKey(e),o=`${this.namespaceKey}:${e}`;this._cache.delete(o),r.removeItem(s)}has(e){let r=this._getStorage(),s=this._getFullKey(e);return r.getItem(s)!==null}clear(){if(this._getStorage()._isTavern){let r=typeof window.parent<"u"?window.parent:window;if(r.SillyTavern?.getContext){let s=r.SillyTavern.getContext();s?.extensionSettings?.[this.namespaceKey]&&(s.extensionSettings[this.namespaceKey]={},this._saveSettings(s))}}else{let r=`${this.namespaceKey}_`,s=[];for(let o=0;o<localStorage.length;o++){let n=localStorage.key(o);n&&n.startsWith(r)&&s.push(n)}s.forEach(o=>localStorage.removeItem(o))}this._cache.clear()}_getFullKey(e){return this._getStorage()._isTavern?e:`${this.namespaceKey}_${e}`}namespace(e){return new t(`${this.namespaceKey}:${e}`)}getMultiple(e){let r={};return e.forEach(s=>{r[s]=this.get(s)}),r}setMultiple(e){Object.entries(e).forEach(([r,s])=>{this.set(r,s)})}exportAll(){let e=this._getStorage(),r={};if(e._isTavern){let s=typeof window.parent<"u"?window.parent:window;if(s.SillyTavern?.getContext){let n=s.SillyTavern.getContext()?.extensionSettings?.[this.namespaceKey]||{};Object.entries(n).forEach(([a,i])=>{r[a]=typeof i=="string"?JSON.parse(i):i})}}else{let s=`${this.namespaceKey}_`;for(let o=0;o<localStorage.length;o++){let n=localStorage.key(o);if(n&&n.startsWith(s)){let a=n.slice(s.length);try{r[a]=JSON.parse(localStorage.getItem(n))}catch{r[a]=localStorage.getItem(n)}}}}return r}},$=new ps("youyou_toolkit"),Se=new ps("youyou_toolkit:tools"),ke=new ps("youyou_toolkit:presets"),Yn=new ps("youyou_toolkit:windows");Vh=$});var nu={};ae(nu,{API_STATUS:()=>rb,fetchAvailableModels:()=>ub,getApiConfig:()=>Gs,getEffectiveApiConfig:()=>Fo,hasEffectiveApiPreset:()=>jo,sendApiRequest:()=>Wo,sendWithPreset:()=>Fi,testApiConnection:()=>db,updateApiConfig:()=>ob,validateApiConfig:()=>Vn});function Zh(){return{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,stream:!1,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}}}function Ui(){return $.get(tu,Zh())}function eb(t){$.set(tu,t)}function ru(){return $.get(Xh,[])}function tb(){return $.get(Qh,"")}function Ki(t,e={}){let r=new Error(t);return r.allowDirectFallback=e.allowDirectFallback===!0,r}function su(t,e="chat_completions"){let r=String(t||"").trim();if(!r)return"";let s=null;try{s=new URL(r)}catch{return r}let o=s.pathname.replace(/\/+$/,""),n=o;return e==="chat_completions"?!/\/chat\/completions$/i.test(o)&&!/\/completions$/i.test(o)&&(n=`${o||""}/chat/completions`):e==="models"&&(/\/chat\/completions$/i.test(o)?n=o.replace(/\/chat\/completions$/i,"/models"):/\/completions$/i.test(o)?n=o.replace(/\/completions$/i,"/models"):/\/models$/i.test(o)||(n=`${o||""}/models`)),s.pathname=n.replace(/\/+/g,"/"),s.toString()}function sb(t){let e=String(t||"").trim();if(!e)return"";try{let r=new URL(e);return r.pathname=r.pathname.replace(/\/chat\/completions$/i,"").replace(/\/completions$/i,"").replace(/\/models$/i,"").replace(/\/+$/,"")||"/",r.toString().replace(/\/$/,"")}catch{return e.replace(/\/chat\/completions$/i,"").replace(/\/completions$/i,"").replace(/\/models$/i,"").replace(/\/+$/,"")}}function Gs(){return Ui().apiConfig||{}}function ob(t){let e=Ui();e.apiConfig={...e.apiConfig,...t},eb(e)}function Vn(t){let e=[];if(t.useMainApi)return{valid:!0,errors:[]};if(!t.url||!t.url.trim())e.push("API URL \u4E0D\u80FD\u4E3A\u7A7A");else try{new URL(t.url)}catch{e.push("API URL \u683C\u5F0F\u65E0\u6548")}return(!t.model||!t.model.trim())&&e.push("\u6A21\u578B\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"),{valid:e.length===0,errors:e}}function Fo(t=""){let e=Ui(),r=t||tb()||"";if(r){let o=ru().find(n=>n.name===r);if(o&&o.apiConfig)return{...o.apiConfig,presetName:o.name}}return e.apiConfig||{}}function jo(t=""){return t?ru().some(r=>r?.name===t):!1}async function Fi(t,e,r={},s=null){let o=Fo(t);return await Wo(e,{...r,apiConfig:o},s)}function ou(t,e={}){let r=e.apiConfig||Gs();return{messages:t,model:r.model||"gpt-3.5-turbo",max_tokens:r.max_tokens||4096,temperature:r.temperature??.7,top_p:r.top_p??.9,stream:r.stream??!1,...e.extraParams}}function ji(t){let e="";if(t?.choices&&t.choices[0]?.message?.content)e=t.choices[0].message.content;else if(t?.content)e=t.content;else if(t?.text)e=t.text;else if(t?.response)e=t.response;else throw new Error(`\u65E0\u6CD5\u89E3\u6790API\u54CD\u5E94\u683C\u5F0F: ${JSON.stringify(t).slice(0,200)}`);return String(e||"").trim()}async function Wo(t,e={},r=null){let s=e.apiConfig||Gs(),o=s.useMainApi,n=Vn(s);if(!n.valid&&!o)throw new Error(`API\u914D\u7F6E\u65E0\u6548: ${n.errors.join(", ")}`);return o?await nb(t,e,r):await ab(t,s,e,r)}async function nb(t,e,r){let s=typeof window.parent<"u"?window.parent:window;if(!s.TavernHelper?.generateRaw)throw new Error("TavernHelper.generateRaw \u4E0D\u53EF\u7528\u3002\u8BF7\u68C0\u67E5SillyTavern\u7248\u672C\u3002");try{let o=await s.TavernHelper.generateRaw({ordered_prompts:t,should_stream:e.apiConfig?.stream??Gs().stream??!1,...e.extraParams});if(typeof o!="string")throw new Error("\u4E3BAPI\u8FD4\u56DE\u4E86\u975E\u9884\u671F\u7684\u54CD\u5E94\u7C7B\u578B");return o.trim()}catch(o){throw o.name==="AbortError"?o:new Error(`\u4E3BAPI\u8BF7\u6C42\u5931\u8D25: ${o.message}`)}}async function ab(t,e,r,s){let o=typeof window.parent<"u"?window.parent:window;if(o.TavernHelper?.generateRaw)try{return await ib(t,e,r,s,o)}catch(n){let a=String(n?.message||n||"");if(n?.name==="AbortError"||s?.aborted||a.includes("\u505C\u6B62\u6309\u94AE")||a.includes("stop button")||a.includes("Clicked stop")||a==="\u8BF7\u6C42\u5DF2\u53D6\u6D88")throw n;Jh.warn("TavernHelper \u81EA\u5B9A\u4E49\u8BF7\u6C42\u5931\u8D25\uFF0C\u56DE\u9000\u5230\u540E\u5907\u94FE\u8DEF:",n)}if(o.SillyTavern?.getRequestHeaders)try{return await lb(t,e,r,s,o)}catch(n){if(!n?.allowDirectFallback)throw n}return await cb(t,e,r,s)}async function ib(t,e,r,s,o){if(s?.aborted)throw new DOMException("\u8BF7\u6C42\u5DF2\u53D6\u6D88","AbortError");let n=await o.TavernHelper.generateRaw({ordered_prompts:t,should_stream:e.stream??!1,max_chat_history:0,custom_api:{apiurl:sb(e.url),key:e.apiKey||"",model:e.model||"gpt-3.5-turbo",max_tokens:e.max_tokens||4096,temperature:e.temperature??.7,top_p:e.top_p??.9},...r.extraParams||{}});return typeof n=="string"?n.trim():ji(n)}async function lb(t,e,r,s,o){let n=String(e.url||"").trim(),a={...ou(t,{apiConfig:e,...r}),chat_completion_source:"custom",reverse_proxy:n,proxy_password:"",custom_url:n,custom_include_headers:e.apiKey?`Authorization: Bearer ${e.apiKey}`:""},i={...typeof o.SillyTavern?.getRequestHeaders=="function"?o.SillyTavern.getRequestHeaders():{},"Content-Type":"application/json"},l=null;try{l=await fetch("/api/backends/chat-completions/generate",{method:"POST",headers:i,body:JSON.stringify(a),signal:s})}catch(u){throw u?.name==="AbortError"?u:Ki(`\u9152\u9986\u540E\u7AEF\u8F6C\u53D1\u8BF7\u6C42\u4E0D\u53EF\u7528\uFF0C\u5DF2\u5C1D\u8BD5\u56DE\u9000\u5230\u6D4F\u89C8\u5668\u76F4\u8FDE\u3002\u539F\u59CB\u9519\u8BEF: ${u.message}`,{allowDirectFallback:!0})}let d=await l.text().catch(()=>"");if(!l.ok){let u=[404,405,501,502].includes(l.status);throw Ki(`\u9152\u9986\u540E\u7AEF\u8F6C\u53D1\u8BF7\u6C42\u5931\u8D25 (${l.status}): ${d||"Unknown error"}`,{allowDirectFallback:u})}let c=null;try{c=d?JSON.parse(d):{}}catch{let p=String(d||"").replace(/\s+/g," ").trim().slice(0,120);throw Ki(`\u9152\u9986\u540E\u7AEF\u8FD4\u56DE\u4E86\u975EJSON\u5185\u5BB9\u3002\u54CD\u5E94\u7247\u6BB5: ${p||"(\u7A7A\u54CD\u5E94)"}`)}return ji(c)}async function cb(t,e,r,s){let o=ou(t,{apiConfig:e,...r}),n=su(e.url,"chat_completions"),a={"Content-Type":"application/json"};e.apiKey&&(a.Authorization=`Bearer ${e.apiKey}`);let i=await fetch(n,{method:"POST",headers:a,body:JSON.stringify(o),signal:s}),l=await i.text().catch(()=>"");if(!i.ok){let c=l||"Unknown error";throw new Error(`API\u8BF7\u6C42\u5931\u8D25 (${i.status}): ${c}`)}let d=null;try{d=l?JSON.parse(l):{}}catch{let u=String(l||"").replace(/\s+/g," ").trim().slice(0,120);throw new Error(`\u81EA\u5B9A\u4E49API\u8FD4\u56DE\u7684\u4E0D\u662FJSON\uFF0C\u53EF\u80FD\u662FURL\u914D\u7F6E\u9519\u8BEF\u3001\u53EA\u586B\u5199\u4E86\u7AD9\u70B9\u9996\u9875/\u57FA\u7840\u8DEF\u5F84\u3001\u6216\u8BF7\u6C42\u88AB\u91CD\u5B9A\u5411\u3002\u5F53\u524D\u4F1A\u81EA\u52A8\u5C1D\u8BD5\u8865\u5168 chat/completions \u7AEF\u70B9\uFF1B\u82E5\u4ECD\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5API URL\uFF0C\u6216\u6539\u4E3A\u542F\u7528\u201C\u4F7F\u7528SillyTavern\u4E3BAPI\u201D\u3002\u54CD\u5E94\u7247\u6BB5: ${u||"(\u7A7A\u54CD\u5E94)"}`)}return ji(d)}async function db(t=null){let e=t||Gs(),r=Date.now();try{await Wo([{role:"user",content:'Hello, this is a connection test. Please respond with "OK".'}],{apiConfig:e});let o=Date.now()-r;return{success:!0,message:`\u8FDE\u63A5\u6210\u529F (\u5EF6\u8FDF: ${o}ms)`,latency:o}}catch(s){return{success:!1,message:`\u8FDE\u63A5\u5931\u8D25: ${s.message}`,latency:Date.now()-r}}}async function ub(t=null){let e=t||Gs();return e.useMainApi?await pb():await yb(e)}async function pb(){let t=typeof window.parent<"u"?window.parent:window;try{if(t.SillyTavern?.getContext){let e=t.SillyTavern.getContext();if(e.settings?.api_server)return[e.settings.api_server]}return["gpt-4","gpt-4-turbo","gpt-3.5-turbo","claude-3-opus","claude-3-sonnet"]}catch{return["gpt-4","gpt-3.5-turbo"]}}async function yb(t){if(!t.url||!t.apiKey)return[];try{let e=su(t.url,"models"),r=await fetch(e,{method:"GET",headers:{Authorization:`Bearer ${t.apiKey}`}});if(!r.ok)return[];let s=await r.json();return s.data&&Array.isArray(s.data)?s.data.map(o=>o.id||o.name).filter(Boolean).sort():[]}catch{return[]}}var Jh,tu,Xh,Qh,rb,Jn=D(()=>{je();H();Jh=E.createScope("ApiConnection"),tu="settings",Xh="api_presets",Qh="current_preset";rb={IDLE:"idle",CONNECTING:"connecting",SUCCESS:"success",ERROR:"error"}});var cu={};ae(cu,{createPreset:()=>Zn,createPresetFromCurrentConfig:()=>vb,deletePreset:()=>ea,duplicatePreset:()=>Gi,exportPresets:()=>Yi,generateUniquePresetName:()=>Sb,getActiveConfig:()=>wb,getActivePresetName:()=>qi,getAllPresets:()=>Pr,getPreset:()=>fs,getPresetNames:()=>hb,getStarredPresets:()=>xb,importPresets:()=>Vi,presetExists:()=>Ho,renamePreset:()=>Hi,switchToPreset:()=>ta,togglePresetStar:()=>bb,updatePreset:()=>Wi,validatePreset:()=>Tb});function mb(){return{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}}}function lu(){return $.get(gb,mb())}function xt(){return $.get(au,[])}function ys(t){$.set(au,t)}function Qn(){return $.get(iu,"")}function Xn(t){$.set(iu,t||"")}function Pr(){return xt()}function hb(){return xt().map(e=>e.name)}function fs(t){return!t||typeof t!="string"?null:xt().find(r=>r.name===t)||null}function Ho(t){return!t||typeof t!="string"?!1:xt().some(r=>r.name===t)}function Zn(t){let{name:e,description:r,apiConfig:s}=t;if(!e||typeof e!="string"||!e.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let o=e.trim();if(Ho(o))return{success:!1,message:`\u9884\u8BBE "${o}" \u5DF2\u5B58\u5728`};let n={name:o,description:r||"",apiConfig:{url:s?.url||"",apiKey:s?.apiKey||"",model:s?.model||"",useMainApi:s?.useMainApi??!0,stream:s?.stream??!1,max_tokens:s?.max_tokens||4096,temperature:s?.temperature??.7,top_p:s?.top_p??.9},createdAt:Date.now(),updatedAt:Date.now()},a=xt();return a.push(n),ys(a),{success:!0,message:`\u9884\u8BBE "${o}" \u521B\u5EFA\u6210\u529F`,preset:n}}function Wi(t,e){if(!t||typeof t!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let r=xt(),s=r.findIndex(a=>a.name===t);if(s===-1)return{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if(e.name&&e.name!==t)return{success:!1,message:"\u4E0D\u652F\u6301\u4FEE\u6539\u9884\u8BBE\u540D\u79F0\uFF0C\u8BF7\u521B\u5EFA\u65B0\u9884\u8BBE"};let o=r[s],n={...o,...e,name:o.name,updatedAt:Date.now()};return e.apiConfig&&(n.apiConfig={...o.apiConfig,...e.apiConfig}),r[s]=n,ys(r),{success:!0,message:`\u9884\u8BBE "${t}" \u66F4\u65B0\u6210\u529F`,preset:n}}function ea(t){if(!t||typeof t!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let e=xt(),r=e.findIndex(s=>s.name===t);return r===-1?{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`}:(e.splice(r,1),ys(e),Qn()===t&&Xn(""),{success:!0,message:`\u9884\u8BBE "${t}" \u5DF2\u5220\u9664`})}function Hi(t,e){if(!t||typeof t!="string")return{success:!1,message:"\u539F\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};if(!e||typeof e!="string"||!e.trim())return{success:!1,message:"\u65B0\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let r=e.trim();if(!Ho(t))return{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if(Ho(r))return{success:!1,message:`\u9884\u8BBE "${r}" \u5DF2\u5B58\u5728`};let s=xt(),o=s.find(n=>n.name===t);return o&&(o.name=r,o.updatedAt=Date.now(),ys(s),Qn()===t&&Xn(r)),{success:!0,message:`\u9884\u8BBE\u5DF2\u91CD\u547D\u540D\u4E3A "${r}"`}}function Gi(t,e){if(!t||typeof t!="string")return{success:!1,message:"\u6E90\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};if(!e||typeof e!="string"||!e.trim())return{success:!1,message:"\u76EE\u6807\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let r=e.trim(),s=fs(t);if(!s)return{success:!1,message:`\u6E90\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if(Ho(r))return{success:!1,message:`\u9884\u8BBE "${r}" \u5DF2\u5B58\u5728`};let o={...JSON.parse(JSON.stringify(s)),name:r,createdAt:Date.now(),updatedAt:Date.now()},n=xt();return n.push(o),ys(n),{success:!0,message:`\u9884\u8BBE\u5DF2\u590D\u5236\u4E3A "${r}"`,preset:o}}function bb(t){if(!t||typeof t!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let e=xt(),r=e.find(s=>s.name===t);return r?(r.starred=!r.starred,r.updatedAt=Date.now(),ys(e),{success:!0,message:r.starred?`\u5DF2\u5C06 "${t}" \u6DFB\u52A0\u5230\u9884\u89C8\u5217\u8868`:`\u5DF2\u5C06 "${t}" \u4ECE\u9884\u89C8\u5217\u8868\u79FB\u9664`,starred:r.starred}):{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`}}function xb(){return xt().filter(e=>e.starred===!0)}function ta(t){if(!t)return Xn(""),{success:!0,message:"\u5DF2\u5207\u6362\u5230\u5F53\u524DAPI\u914D\u7F6E"};let e=fs(t);return e?(Xn(t),{success:!0,message:`\u5DF2\u5207\u6362\u5230\u9884\u8BBE "${t}"`,apiConfig:e.apiConfig}):{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`}}function qi(){return Qn()}function wb(){let t=Qn();if(t){let r=fs(t);if(r)return{presetName:t,apiConfig:r.apiConfig}}return{presetName:"",apiConfig:lu().apiConfig||{}}}function Yi(t=null){if(t){let r=fs(t);if(!r)throw new Error(`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`);return JSON.stringify(r,null,2)}let e=xt();return JSON.stringify(e,null,2)}function Vi(t,e={overwrite:!1}){let r;try{r=JSON.parse(t)}catch(a){return fb.error("\u9884\u8BBE\u5BFC\u5165\u5931\u8D25: JSON\u89E3\u6790\u9519\u8BEF",{error:a}),{success:!1,message:"JSON\u89E3\u6790\u5931\u8D25",imported:0}}let s=Array.isArray(r)?r:[r];if(s.length===0)return{success:!1,message:"\u6CA1\u6709\u627E\u5230\u6709\u6548\u7684\u9884\u8BBE\u6570\u636E",imported:0};let o=xt(),n=0;for(let a of s){if(!a.name||typeof a.name!="string"||!a.apiConfig||typeof a.apiConfig!="object")continue;let i=o.findIndex(l=>l.name===a.name);i>=0?e.overwrite&&(a.updatedAt=Date.now(),o[i]=a,n++):(a.createdAt=a.createdAt||Date.now(),a.updatedAt=Date.now(),o.push(a),n++)}return n>0&&ys(o),{success:!0,message:`\u6210\u529F\u5BFC\u5165 ${n} \u4E2A\u9884\u8BBE`,imported:n}}function vb(t,e=""){let r=lu();return Zn({name:t,description:e,apiConfig:r.apiConfig})}function Tb(t){let e=[];return(!t.name||typeof t.name!="string"||!t.name.trim())&&e.push("\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"),(!t.apiConfig||typeof t.apiConfig!="object")&&e.push("\u7F3A\u5C11API\u914D\u7F6E"),{valid:e.length===0,errors:e}}function Sb(t){(!t||typeof t!="string")&&(t="\u65B0\u9884\u8BBE");let e=xt(),r=new Set(e.map(o=>o.name));if(!r.has(t))return t;let s=1;for(;r.has(`${t} (${s})`);)s++;return`${t} (${s})`}var fb,gb,au,iu,Go=D(()=>{je();H();fb=E.createScope("PresetManager"),gb="settings",au="api_presets",iu="current_preset"});var qs,qo,qt,Ji=D(()=>{Ze();tt();H();qs=E.createScope("UIManager"),qo=class{constructor(){this.components=new Map,this.activeInstances=new Map,this.dependencies={},this.currentTab="main",this.currentSubTab={},this.initialized=!1}init(e={}){this.initialized||(this.dependencies=e.services||{},this._subscribeEvents(),this.initialized=!0,W.emit(U.UI_INITIALIZED),qs.log("\u521D\u59CB\u5316\u5B8C\u6210"))}register(e,r){return!e||!r?(qs.warn("\u65E0\u6548\u7684\u7EC4\u4EF6\u6CE8\u518C"),!1):(this.components.set(e,{id:e,...r,render:r.render||(()=>""),bindEvents:r.bindEvents||(()=>{}),destroy:r.destroy||(()=>{}),getStyles:r.getStyles||(()=>"")}),!0)}unregister(e){this.destroyInstance(e),this.components.delete(e)}getComponent(e){return this.components.get(e)}render(e,r,s={}){let o=te();if(!o){qs.error("jQuery\u4E0D\u53EF\u7528");return}let n=this.components.get(e);if(!n){qs.error(`\u7EC4\u4EF6\u4E0D\u5B58\u5728: ${e}`);let i;typeof r=="string"?i=o(r):r&&r.jquery?i=r:r&&(i=o(r)),i?.length&&i.html(`<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u7EC4\u4EF6\u672A\u6CE8\u518C\uFF1A${e}</span></div>`);return}let a;if(typeof r=="string"?a=o(r):r&&r.jquery?a=r:r&&(a=o(r)),!we(a)){qs.warn("\u5BB9\u5668\u4E0D\u5B58\u5728");return}this.activeInstances.forEach((i,l)=>{i?.container?.length&&a.length&&i.container[0]===a[0]&&l!==e&&this.destroyInstance(l)}),this.destroyInstance(e);try{if(typeof n.renderTo=="function")n.renderTo(a,{...s,dependencies:this.dependencies});else{let i=n.render({...s,dependencies:this.dependencies});a.html(i),n.bindEvents(a,this.dependencies)}}catch(i){qs.error(`\u7EC4\u4EF6\u6E32\u67D3\u5931\u8D25: ${e}`,i),a.html(`<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u7EC4\u4EF6\u6E32\u67D3\u5931\u8D25\uFF1A${e}${i?.message?` - ${i.message}`:""}</span></div>`);return}this.activeInstances.set(e,{container:a,component:n,props:s}),W.emit(U.UI_RENDER_REQUESTED,{componentId:e})}destroyInstance(e){let r=this.activeInstances.get(e);r&&(r.component.destroy(r.container),this.activeInstances.delete(e))}destroyContainerInstance(e){let r=te();if(!r||!e)return;let s;if(typeof e=="string"?s=r(e):e?.jquery?s=e:s=r(e),!s?.length)return;let o=[];this.activeInstances.forEach((n,a)=>{n?.container?.length&&n.container[0]===s[0]&&o.push(a)}),o.forEach(n=>this.destroyInstance(n))}switchTab(e){let r=this.currentTab;this.currentTab=e,W.emit(U.UI_TAB_CHANGED,{tabId:e,oldTab:r})}getCurrentTab(){return this.currentTab}switchSubTab(e,r){this.currentSubTab[e]=r,W.emit(U.UI_SUBTAB_CHANGED,{mainTab:e,subTab:r})}getCurrentSubTab(e){return this.currentSubTab[e]||""}getAllStyles(){let e="";return this.components.forEach((r,s)=>{r.getStyles&&(e+=r.getStyles())}),e}injectStyles(e=document){let r="yyt-component-styles";if(e.getElementById(r))return;let s=e.createElement("style");s.id=r,s.textContent=this.getAllStyles(),(e.head||e.documentElement).appendChild(s)}setDependency(e,r){this.dependencies[e]=r}getDependency(e){return this.dependencies[e]}_subscribeEvents(){W.on(U.PRESET_UPDATED,()=>{}),W.on(U.TOOL_UPDATED,()=>{})}},qt=new qo});function f(t,e={},...r){let s=document.createElement(t);if(e.className&&(s.className=e.className),e.text!==void 0&&e.text!==null&&(s.textContent=String(e.text)),e.html!==void 0&&e.html!==null&&(s.innerHTML=String(e.html)),e.attrs)for(let[o,n]of Object.entries(e.attrs))n==null||n===!1||s.setAttribute(o,n===!0?"":String(n));if(e.style&&Object.assign(s.style,e.style),e.dataset)for(let[o,n]of Object.entries(e.dataset))s.dataset[o]=String(n);for(let o of r)G(s,o);return s}function G(t,e){if(!(e==null||e===!1)){if(Array.isArray(e)){for(let r of e)G(t,r);return}if(typeof e=="string"||typeof e=="number"){t.appendChild(document.createTextNode(String(e)));return}if(e instanceof Node){t.appendChild(e);return}if(e&&e.el instanceof Node){t.appendChild(e.el);return}}}function du(){let t=new Map;return{on(e,r){return!e||typeof r!="function"?()=>{}:(t.has(e)||t.set(e,new Set),t.get(e).add(r),()=>this.off(e,r))},off(e,r){let s=t.get(e);s&&s.delete(r)},emit(e,...r){let s=t.get(e);if(s)for(let o of[...s])try{o(...r)}catch{}},clear(){t.clear()}}}function Xi(t,e){if(!t||!e)return null;if(t._id===e)return t;let r=t._children;if(!r)return null;let s=r instanceof Map?[...r.values()]:Array.isArray(r)?r:[];for(let o of s){let n=Xi(o,e);if(n)return n}return null}function Le({id:t=null,kind:e="control",el:r=null,style:s=null,className:o=null,attrs:n=null}={}){if(r){if(s&&Object.assign(r.style,s),o){let i=String(o).trim().split(/\s+/).filter(Boolean);i.length&&r.classList.add(...i)}if(n)for(let[i,l]of Object.entries(n))l===!1||l==null||r.setAttribute(i,l===!0?"":String(l))}let a=du();return{_id:t||null,_kind:e,_children:null,_emitter:a,on(i,l){return a.on(i,l)},off(i,l){a.off(i,l)},getControl(i){return Xi(this,i)},get(){},set(i){},destroy(){if(a.clear(),this._children){let i=this._children instanceof Map?[...this._children.values()]:Array.isArray(this._children)?this._children:[];for(let l of i)try{l?.destroy?.()}catch{}this._children instanceof Map?this._children.clear():Array.isArray(this._children)&&(this._children.length=0)}if(this.el?.parentNode)try{this.el.parentNode.removeChild(this.el)}catch{}}}}var mt=D(()=>{});function X(t={}){let{id:e=null,label:r="",icon:s=null,variant:o="default",size:n="normal",disabled:a=!1,title:i=null,onClick:l=null}=t,d=["yyt-btn"];o==="primary"?d.push("yyt-btn-primary"):o==="danger"?d.push("yyt-btn-danger"):o==="ghost"&&d.push("yyt-btn-secondary"),n==="small"&&d.push("yyt-btn-small");let c=f("button",{className:d.join(" "),attrs:{type:"button",disabled:a?"disabled":null,title:i}}),u=null;s&&(u=f("span",{className:"yyt-btn-icon-glyph",text:s}),c.appendChild(u));let p=f("span",{text:r});c.appendChild(p);let y={...Le({id:e,kind:"button",el:c,style:t.style,className:t.className,attrs:t.attrs}),el:c,setLabel(m){p.textContent=String(m||"")},setIcon(m){u&&(u.textContent=String(m||""))},setDisabled(m){m?c.setAttribute("disabled","disabled"):c.removeAttribute("disabled")},isDisabled(){return c.hasAttribute("disabled")},get(){return p.textContent},set(m){this.setLabel(m)}};return c.addEventListener("click",m=>{if(!c.hasAttribute("disabled")){if(typeof l=="function")try{l(m,y)}catch(g){console.error("[button] onClick \u5F02\u5E38",g)}y._emitter.emit("click",m)}}),y}var uu=D(()=>{mt()});function he(t={}){let{id:e=null,placeholder:r="",value:s="",type:o="text",disabled:n=!1,maxLength:a=null,onInput:i=null,onChange:l=null}=t,d=f("input",{className:"yyt-input",attrs:{type:o,placeholder:r,disabled:n?"disabled":null,maxlength:a!=null?String(a):null}});d.value=s==null?"":String(s);let c={...Le({id:e,kind:"textInput",el:d,style:t.style,className:t.className,attrs:t.attrs}),el:d,get(){return d.value},set(u,{silent:p=!1}={}){d.value=u==null?"":String(u),p||c._emitter.emit("change",d.value)},setPlaceholder(u){d.placeholder=u==null?"":String(u)},setDisabled(u){d.disabled=!!u},focus(){d.focus()},select(){d.select()}};return d.addEventListener("input",()=>{if(typeof i=="function")try{i(d.value,c)}catch(u){console.error("[textInput] onInput \u5F02\u5E38",u)}c._emitter.emit("input",d.value)}),d.addEventListener("change",()=>{if(typeof l=="function")try{l(d.value,c)}catch(u){console.error("[textInput] onChange \u5F02\u5E38",u)}c._emitter.emit("change",d.value)}),d.addEventListener("blur",()=>c._emitter.emit("blur",d.value)),c}var pu=D(()=>{mt()});function Re(t={}){let{id:e=null,options:r=[],value:s="",placeholder:o=null,disabled:n=!1,onChange:a=null}=t,i=f("select",{className:"yyt-select",attrs:{disabled:n?"disabled":null}});function l(c,u){if(i.innerHTML="",o!==null){let p=f("option",{text:o,attrs:{value:"",disabled:"disabled",selected:u?null:"selected"}});i.appendChild(p)}for(let p of c){let y=f("option",{text:p.label??String(p.value),attrs:{value:String(p.value),selected:String(p.value)===String(u)?"selected":null,disabled:p.disabled?"disabled":null}});i.appendChild(y)}}l(r,s);let d={...Le({id:e,kind:"select",el:i,style:t.style,className:t.className,attrs:t.attrs}),el:i,get(){return i.value},set(c,{silent:u=!1}={}){i.value=c==null?"":String(c),u||d._emitter.emit("change",i.value)},setOptions(c,u){l(c||[],u??i.value)},setDisabled(c){i.disabled=!!c}};return i.addEventListener("change",()=>{if(typeof a=="function")try{a(i.value,d)}catch(c){typeof console<"u"&&console.error&&console.error("[selectInput] onChange \u5F02\u5E38",c)}d._emitter.emit("change",i.value)}),d}var yu=D(()=>{mt()});function wt(t={}){let{id:e=null,label:r="",hint:s="",checked:o=!1,disabled:n=!1,onChange:a=null}=t,i=f("label",{className:"yyt-toggle-label"});r&&i.appendChild(f("span",{text:r})),s&&i.appendChild(f("span",{className:"yyt-toggle-hint",text:s}));let l=f("input",{attrs:{type:"checkbox",disabled:n?"disabled":null}});l.checked=!!o;let d=f("span",{className:"yyt-toggle-slider"}),c=f("label",{className:"yyt-toggle"});c.appendChild(l),c.appendChild(d);let u=f("div",{className:"yyt-toggle-row"});u.appendChild(i),u.appendChild(c),i.addEventListener("click",y=>{y.preventDefault(),!l.disabled&&(l.checked=!l.checked,l.dispatchEvent(new Event("change",{bubbles:!0})))});let p={...Le({id:e,kind:"toggle",el:u,style:t.style,className:t.className,attrs:t.attrs}),el:u,get(){return!!l.checked},set(y,{silent:m=!1}={}){l.checked=!!y,m||p._emitter.emit("change",!!y)},setDisabled(y){l.disabled=!!y}};return l.addEventListener("change",()=>{let y=!!l.checked;if(typeof a=="function")try{a(y,p)}catch(m){console.error("[toggle] onChange \u5F02\u5E38",m)}p._emitter.emit("change",y)}),p}var fu=D(()=>{mt()});var gu=D(()=>{mt()});var mu=D(()=>{mt()});function kt(t={}){let{id:e=null,label:r="",hint:s="",control:o=null,inline:n=!1}=t,a=f("div",{className:"yyt-form-group",style:n?{flexDirection:"row",alignItems:"center",gap:"12px"}:null});r&&a.appendChild(f("label",{text:r,style:n?{flex:"0 0 auto",minWidth:"120px"}:null}));let i=f("div",{style:n?{flex:"1",minWidth:"0"}:null});o&&G(i,o),a.appendChild(i),s&&a.appendChild(f("div",{className:"yyt-form-hint",text:s}));let l=o?[o]:[];return{...Le({id:e,kind:"formRow",el:a,style:t.style,className:t.className,attrs:t.attrs}),el:a,_children:l,get(){return o?.get?.()},set(d,c){o?.set?.(d,c)},setControl(d){i.innerHTML="",l.length=0,d&&(G(i,d),l.push(d))}}}var hu=D(()=>{mt()});function Qi(t={}){let{id:e=null,icon:r=null,name:s="",desc:o="",active:n=!1,disabled:a=!1,actions:i=[],onClick:l=null}=t,d=["yyt-list-row"];n&&d.push("yyt-list-row-active"),a&&d.push("yyt-list-row-disabled");let c=f("div",{className:d.join(" "),style:a?{opacity:"0.5",pointerEvents:"none"}:null});r&&c.appendChild(f("div",{className:"yyt-list-row-icon",text:r}));let u=f("div",{className:"yyt-list-row-main"}),p=f("div",{className:"yyt-list-row-name",text:s});u.appendChild(p);let y=null;o&&(y=f("div",{className:"yyt-list-row-desc",text:o}),u.appendChild(y)),c.appendChild(u);let m=null;if(i&&i.length){m=f("div",{className:"yyt-list-row-actions"});for(let h of i)G(m,h);c.appendChild(m)}typeof l=="function"&&(c.style.cursor="pointer",c.addEventListener("click",h=>{h.target.closest(".yyt-list-row-actions")||(l(h,g),g._emitter.emit("click",h))}));let g={...Le({id:e,kind:"listRow",el:c,style:t.style,className:t.className,attrs:t.attrs}),el:c,_children:i||[],setName(h){p.textContent=h==null?"":String(h)},setDesc(h){if(y)y.textContent=h==null?"":String(h);else{if(!h)return;y=f("div",{className:"yyt-list-row-desc",text:h}),u.appendChild(y)}},setActive(h){h?c.classList.add("yyt-list-row-active"):c.classList.remove("yyt-list-row-active")},setDisabled(h){h?(c.classList.add("yyt-list-row-disabled"),c.style.opacity="0.5",c.style.pointerEvents="none"):(c.classList.remove("yyt-list-row-disabled"),c.style.opacity="",c.style.pointerEvents="")}};return g}var bu=D(()=>{mt()});function Yt(t={}){let{id:e=null,heading:r="",icon:s=null,actions:o=[],content:n=[]}=t,a=f("div",{className:"yyt-flow-section"}),i=null,l=null,d=null;if(r||s||o&&o.length){if(i=f("div",{className:"yyt-flow-heading"}),s&&(l=f("span",{className:"yyt-flow-heading-icon",text:s}),i.appendChild(l)),r&&i.appendChild(f("span",{text:r})),o&&o.length){d=f("div",{className:"yyt-flow-heading-action"});for(let y of o)G(d,y);i.appendChild(d)}a.appendChild(i)}let c=f("div",{className:"yyt-flow-content"}),u=[];for(let y of n||[])y&&(G(c,y),u.push(y));for(let y of o||[])y&&typeof y=="object"&&y.el&&u.push(y);return a.appendChild(c),{...Le({id:e,kind:"flowSection",el:a,style:t.style,className:t.className,attrs:t.attrs}),el:a,_children:u,appendContent(y){y&&(G(c,y),y&&typeof y=="object"&&y.el&&u.push(y))},clearContent(){c.innerHTML="";let y=u.filter(m=>(o||[]).includes(m));u.length=0;for(let m of y)u.push(m)},setHeading(y){if(!i)return;let m=i.querySelector("span:not(.yyt-flow-heading-icon):not(.yyt-flow-heading-action)");m&&(m.textContent=y==null?"":String(y))},setIcon(y){l&&(l.textContent=y==null?"":String(y))}}}var xu=D(()=>{mt()});function ra(){try{if(window.parent&&window.parent!==window&&window.parent.document)return window.parent.document}catch{}return document}function Zi({title:t,width:e,wide:r}){let s=`yyt-ctrl-dialog-${++Eb}`,o=f("div",{className:"yyt-dialog-overlay",attrs:{"data-dialog-id":s}}),n={};e&&e!=="380px"&&(n.width=e),n.maxHeight="calc(100vh - 32px)";let a=f("div",{className:`yyt-dialog${r?" yyt-dialog-wide":""}`,style:n}),i=f("div",{className:"yyt-dialog-header"});i.appendChild(f("span",{className:"yyt-dialog-title",text:t||""}));let l=f("button",{className:"yyt-dialog-close",attrs:{type:"button","aria-label":"close"},html:'<i class="fa-solid fa-times"></i>'});i.appendChild(l),a.appendChild(i);let d=f("div",{className:"yyt-dialog-body"});a.appendChild(d);let c=f("div",{className:"yyt-dialog-footer"});return a.appendChild(c),o.appendChild(a),{overlay:o,body:d,footer:c,closeBtn:l,id:s}}function el(t){let e=ra();return e?.body?(e.body.appendChild(t),!0):!1}function tl(t){if(t?.parentNode)try{t.parentNode.removeChild(t)}catch{}}function Ab(t={}){let{title:e="\u8BF7\u786E\u8BA4",message:r="",confirmText:s="\u786E\u5B9A",cancelText:o="\u53D6\u6D88",danger:n=!1,width:a="380px"}=t;return new Promise(i=>{let{overlay:l,body:d,footer:c,closeBtn:u}=Zi({title:e,width:a,wide:!1}),p=(ra()||document).activeElement,y=f("div",{style:{color:"var(--yyt-text-secondary)",fontSize:"13px",lineHeight:"1.6"},text:r});d.appendChild(y);let m=f("button",{className:"yyt-btn yyt-btn-secondary",attrs:{type:"button"},text:o}),g=f("button",{className:`yyt-btn ${n?"yyt-btn-danger":"yyt-btn-primary"}`,attrs:{type:"button"},text:s});c.appendChild(m),c.appendChild(g);let h=!1,x=S=>{if(!h){h=!0,tl(l);try{p?.focus()}catch{}i(S)}};if(g.addEventListener("click",()=>x(!0)),m.addEventListener("click",()=>x(!1)),u.addEventListener("click",()=>x(!1)),l.addEventListener("click",S=>{S.target===l&&x(!1)}),l.addEventListener("keydown",S=>{S.key==="Escape"?(S.stopPropagation(),x(!1)):S.key==="Enter"&&(S.stopPropagation(),x(!0))}),!el(l)){i(!1);return}(n?m:g).focus()})}function Cb(t={}){let{title:e="\u8F93\u5165",message:r="",defaultValue:s="",placeholder:o="",confirmText:n="\u786E\u5B9A",cancelText:a="\u53D6\u6D88",validate:i=null,width:l="380px"}=t;return new Promise(d=>{let{overlay:c,body:u,footer:p,closeBtn:y}=Zi({title:e,width:l,wide:!1}),m=(ra()||document).activeElement;r&&u.appendChild(f("div",{style:{color:"var(--yyt-text-secondary)",fontSize:"13px",lineHeight:"1.6",marginBottom:"8px"},text:r}));let g=f("input",{className:"yyt-input",attrs:{type:"text",placeholder:o}});g.value=String(s||""),u.appendChild(g);let h=f("div",{style:{color:"var(--yyt-danger, #f87171)",fontSize:"12px",marginTop:"6px",minHeight:"14px"}});u.appendChild(h);let x=f("button",{className:"yyt-btn yyt-btn-secondary",attrs:{type:"button"},text:a}),S=f("button",{className:"yyt-btn yyt-btn-primary",attrs:{type:"button"},text:n});p.appendChild(x),p.appendChild(S);let T=!1,A=w=>{if(!T){T=!0,tl(c);try{m?.focus()}catch{}d(w)}},C=()=>{let w=g.value.trim();if(typeof i=="function"){let P=i(w);if(P){h.textContent=P,g.focus();return}}A(w||null)};if(S.addEventListener("click",C),x.addEventListener("click",()=>A(null)),y.addEventListener("click",()=>A(null)),c.addEventListener("click",w=>{w.target===c&&A(null)}),g.addEventListener("keydown",w=>{w.key==="Enter"&&(w.stopPropagation(),C())}),c.addEventListener("keydown",w=>{w.key==="Escape"&&(w.stopPropagation(),A(null))}),!el(c)){d(null);return}g.focus(),g.select()})}function kb(t={}){let{title:e="",body:r=null,buttons:s=[],width:o="480px",wide:n=!1,onMounted:a=null}=t,{overlay:i,body:l,footer:d,closeBtn:c}=Zi({title:e,width:o,wide:n}),u=(ra()||document).activeElement;r&&G(l,r);let p=!1,y,m=new Promise(h=>{y=h}),g=h=>{if(!p){p=!0,tl(i);try{u?.focus()}catch{}y(h)}};for(let h of s){let x=h.variant==="primary"?"yyt-btn-primary":h.variant==="danger"?"yyt-btn-danger":"yyt-btn-secondary",S=f("button",{className:`yyt-btn ${x}`,attrs:{type:"button"},text:h.label||""});S.addEventListener("click",()=>{try{h.onClick?.(g,l)}catch(T){_b.error("button onClick error",T),g(null)}}),d.appendChild(S)}if(c.addEventListener("click",()=>g(null)),i.addEventListener("click",h=>{h.target===i&&g(null)}),i.addEventListener("keydown",h=>{h.key==="Escape"&&(h.stopPropagation(),g(null))}),!el(i))y(null);else if(typeof a=="function")try{a({overlay:i,body:l,close:g})}catch{}return{el:i,body:l,close:g,result:m}}var _b,Eb,Me,sa=D(()=>{mt();H();_b=E.createScope("Dialog"),Eb=0;Me={confirm:Ab,prompt:Cb,custom:kb}});function rl(t={}){let{id:e=null,items:r=[],align:s="start",gap:o="8px",wrap:n=!0}=t,i=f("div",{className:"yyt-toolbar",style:{display:"flex",alignItems:"center",justifyContent:{start:"flex-start",end:"flex-end",center:"center","space-between":"space-between"}[s]||"flex-start",gap:o,flexWrap:n?"wrap":"nowrap"}}),l=[];for(let d of r)d&&(G(i,d),l.push(d));return{...Le({id:e,kind:"toolbar",el:i,style:t.style,className:t.className,attrs:t.attrs}),el:i,_children:l,addItem(d){d&&(G(i,d),l.push(d))},clear(){for(;i.firstChild;)i.removeChild(i.firstChild);for(let d of l)try{d?.destroy?.()}catch{}l.length=0}}}var wu=D(()=>{mt()});function sl(t={}){let{id:e=null,name:r="",desc:s="",active:o=!1,disabled:n=!1,builtin:a=!1,readonly:i=!1,metaChips:l=[],actions:d=[],onClick:c=null}=t,u=a||i,p=["yyt-list-row","yyt-preset-list-item"];o&&p.push("yyt-list-row-active"),n&&p.push("yyt-list-row-disabled"),u&&p.push("yyt-preset-list-item-readonly");let y=f("div",{className:p.join(" "),style:n?{opacity:"0.5",pointerEvents:"none"}:null}),m=f("span",{className:"yyt-preset-dot",style:{width:"8px",height:"8px",borderRadius:"50%",flexShrink:"0",marginRight:"8px",background:o?"var(--yyt-accent, #7bb7ff)":"transparent",border:o?"none":"1px solid var(--yyt-border, rgba(255,255,255,0.15))",transition:"background 0.15s ease"}});y.appendChild(m);let g=f("div",{className:"yyt-list-row-main",style:{flex:"1",minWidth:"0"}}),h=f("div",{style:{display:"flex",alignItems:"center",gap:"8px"}}),x=f("div",{className:"yyt-list-row-name",text:r,style:{fontWeight:"600"}});h.appendChild(x),a&&h.appendChild(f("span",{className:"yyt-preset-badge yyt-preset-badge-builtin",text:"\u5185\u7F6E",style:{fontSize:"10px",padding:"2px 6px",borderRadius:"999px",background:"var(--yyt-surface-3, rgba(255,255,255,0.06))",color:"var(--yyt-text-muted, rgba(255,255,255,0.5))",border:"1px solid var(--yyt-border, rgba(255,255,255,0.1))"}})),g.appendChild(h);let S=null;s&&(S=f("div",{className:"yyt-list-row-desc",text:s}),g.appendChild(S)),y.appendChild(g);let T=null;if(Array.isArray(l)&&l.length){T=f("div",{className:"yyt-preset-meta-chips",style:{display:"flex",gap:"6px",flexWrap:"wrap"}});for(let P of l)P&&T.appendChild(f("span",{className:"yyt-preset-meta-chip",text:String(P),style:{fontSize:"11px",padding:"2px 8px",borderRadius:"999px",background:"var(--yyt-surface-2, rgba(255,255,255,0.04))",color:"var(--yyt-text-secondary, rgba(255,255,255,0.6))",border:"1px solid var(--yyt-border-soft, rgba(255,255,255,0.04))"}}));y.appendChild(T)}let A=null,C=u?d.filter(P=>P?._kind!=="button"||!P._destructive):d;if(C&&C.length){A=f("div",{className:"yyt-list-row-actions"});for(let P of C)G(A,P);y.appendChild(A)}typeof c=="function"&&(y.style.cursor="pointer",y.addEventListener("click",P=>{P.target.closest(".yyt-list-row-actions")||(c(P,w),w._emitter.emit("click",P))}));let w={...Le({id:e,kind:"presetListItem",el:y,style:t.style,className:t.className,attrs:t.attrs}),el:y,_children:d||[],setActive(P){P?y.classList.add("yyt-list-row-active"):y.classList.remove("yyt-list-row-active"),m.style.background=P?"var(--yyt-accent, #7bb7ff)":"transparent",m.style.border=P?"none":"1px solid var(--yyt-border, rgba(255,255,255,0.15))"},setName(P){x.textContent=P==null?"":String(P)},setDesc(P){if(S)S.textContent=P==null?"":String(P);else{if(!P)return;S=f("div",{className:"yyt-list-row-desc",text:P}),g.appendChild(S)}},setDisabled(P){P?(y.classList.add("yyt-list-row-disabled"),y.style.opacity="0.5",y.style.pointerEvents="none"):(y.classList.remove("yyt-list-row-disabled"),y.style.opacity="",y.style.pointerEvents="")}};return w}var vu=D(()=>{mt()});function ol(t={}){let{id:e=null,values:r=[],placeholder:s="\u8F93\u5165\u540E\u56DE\u8F66\u6DFB\u52A0",suggestions:o=null,allowDuplicates:n=!1,maxChips:a=0,chipVariant:i="default",onChange:l=null,onAdd:d=null,onRemove:c=null}=t,u=o&&o.length?`yyt-chip-dl-${++Ib}`:null,p=f("div",{className:"yyt-chip-group",style:{display:"flex",flexWrap:"wrap",gap:"6px",padding:"6px 8px",borderRadius:"var(--yyt-radius-sm, 6px)",border:"1px solid var(--yyt-control-border, rgba(255,255,255,0.08))",background:"var(--yyt-control-bg, transparent)",minHeight:"36px",alignItems:"center"}}),y=[],m={type:"text",placeholder:s,autocomplete:"off"};u&&(m.list=u);let g=f("input",{className:"yyt-chip-input",attrs:m,style:{flex:"1 1 auto",minWidth:"120px",border:"none",outline:"none",background:"transparent",color:"var(--yyt-text, inherit)",fontSize:"12px",padding:"4px 0"}}),h=null;if(u){h=f("datalist",{attrs:{id:u}});for(let R of o)h.appendChild(f("option",{attrs:{value:String(R)}}));p.appendChild(h)}function x(){return i==="danger"?"rgba(248,113,113,0.12)":i==="soft"?"var(--yyt-surface-2, rgba(255,255,255,0.04))":"var(--yyt-accent-soft, rgba(123,183,255,0.15))"}function S(){return i==="danger"?"rgba(248,113,113,0.25)":"var(--yyt-border, rgba(255,255,255,0.1))"}function T(){return i==="danger"?"#f87171":"var(--yyt-text, inherit)"}function A(R){let _=f("span",{className:"yyt-chip",style:{display:"inline-flex",alignItems:"center",gap:"4px",padding:"3px 4px 3px 10px",borderRadius:"999px",background:x(),border:`1px solid ${S()}`,color:T(),fontSize:"11px",fontWeight:"500"}});_.appendChild(f("span",{text:R,style:{lineHeight:"1"}}));let M=f("button",{attrs:{type:"button","aria-label":"remove"},text:"\xD7",style:{border:"none",background:"transparent",color:"inherit",cursor:"pointer",padding:"0 4px",fontSize:"14px",lineHeight:"1",opacity:"0.7"}});return M.addEventListener("click",j=>{j.stopPropagation(),P(R)}),M.addEventListener("mouseenter",()=>{M.style.opacity="1"}),M.addEventListener("mouseleave",()=>{M.style.opacity="0.7"}),_.appendChild(M),_}function C(){let R=[];for(let _ of p.children)_===g||_===h||R.push(_);for(let _ of R)p.removeChild(_);for(let _ of y)p.insertBefore(A(_),g)}function w(R){let _=String(R||"").trim();if(!_||!n&&y.includes(_)||a>0&&y.length>=a)return!1;y.push(_),C();try{d?.(_,y.slice())}catch(M){console.error("[chipGroup] onAdd \u5F02\u5E38",M)}try{l?.(y.slice())}catch(M){console.error("[chipGroup] onChange \u5F02\u5E38",M)}return z._emitter.emit("change",y.slice()),!0}function P(R){let _=y.indexOf(R);if(_<0)return!1;y.splice(_,1),C();try{c?.(R,y.slice())}catch(M){console.error("[chipGroup] onRemove \u5F02\u5E38",M)}try{l?.(y.slice())}catch(M){console.error("[chipGroup] onChange \u5F02\u5E38",M)}return z._emitter.emit("change",y.slice()),!0}function B(){if(y.length!==0){y=[],C();try{l?.([])}catch(R){console.error("[chipGroup] onChange \u5F02\u5E38",R)}z._emitter.emit("change",[])}}for(let R of r){let _=String(R||"").trim();_&&(!n&&y.includes(_)||y.push(_))}p.appendChild(g),C(),g.addEventListener("keydown",R=>{if(R.key==="Enter"||R.key===","){R.preventDefault();let _=g.value.trim();_&&w(_)&&(g.value="")}else R.key==="Backspace"&&!g.value&&y.length&&P(y[y.length-1])}),g.addEventListener("blur",()=>{let R=g.value.trim();R&&w(R)&&(g.value="")}),p.addEventListener("click",R=>{R.target===p&&g.focus()});let z={...Le({id:e,kind:"chipGroup",el:p,style:t.style,className:t.className,attrs:t.attrs}),el:p,get(){return y.slice()},set(R){y=[];for(let _ of Array.isArray(R)?R:[]){let M=String(_||"").trim();M&&(!n&&y.includes(M)||y.push(M))}C();try{l?.(y.slice())}catch(_){console.error("[chipGroup] onChange \u5F02\u5E38",_)}z._emitter.emit("change",y.slice())},addChip:w,removeChip:P,clear:B,setSuggestions(R){if(h){for(;h.firstChild;)h.removeChild(h.firstChild);for(let _ of R||[])h.appendChild(f("option",{attrs:{value:String(_)}}))}}};return z}var Ib,Tu=D(()=>{mt();Ib=0});var tr=D(()=>{uu();pu();yu();fu();gu();mu();hu();bu();xu();sa();wu();vu();Tu();mt()});function Su(t){return t?t.length!==void 0&&typeof t.get=="function"?t.get(0):t:null}function Rb(t){return typeof t=="string"&&t.startsWith("builtin_")}function Nr(t={}){let{id:e,kind:r="generic",panelTitle:s="\u9884\u8BBE\u7BA1\u7406",panelHint:o="",store:n,renderEditor:a,renderExtras:i=null,renderListItemMeta:l=null,hasSwitchToButton:d=!1,onSwitchTo:c=null}=t;if(!n||typeof n.listPresets!="function")throw new Error("createPresetManagerPanel: store \u7F3A\u5C11\u5FC5\u8981\u7684 listPresets \u65B9\u6CD5");if(typeof a!="function")throw new Error("createPresetManagerPanel: \u5FC5\u987B\u63D0\u4F9B renderEditor");return{id:e,kind:r,renderTo(u){let p=Su(u);if(!p)return;if(p._yytPresetPanelCleanup)try{p._yytPresetPanelCleanup()}catch{}let y=()=>this.renderTo(u),m=n.listPresets(),g=typeof n.getCurrentPresetId=="function"?n.getCurrentPresetId():"",h=f("div",{className:"yyt-preset-manager-panel",style:{display:"flex",flexDirection:"column",gap:"14px"}});if(s||o){let R=f("div",{style:{display:"flex",flexDirection:"column",gap:"4px"}});s&&R.appendChild(f("div",{text:s,style:{fontSize:"15px",fontWeight:"700",color:"var(--yyt-text)"}})),o&&R.appendChild(f("div",{text:o,style:{fontSize:"12px",color:"var(--yyt-text-secondary)",lineHeight:"1.6"}})),h.appendChild(R)}let x=[],S=f("div",{style:{display:"flex",flexDirection:"column"}});if(m.length===0)S.appendChild(f("div",{text:'\u6682\u65E0\u9884\u8BBE\u3002\u70B9\u51FB\u4E0B\u65B9"\u65B0\u5EFA"\u521B\u5EFA\u7B2C\u4E00\u4E2A\u9884\u8BBE\u3002',style:{fontSize:"12px",color:"var(--yyt-text-muted)",padding:"12px 0",textAlign:"center"}}));else for(let R of m){let _=R.id===g,M=Rb(R.id),j=typeof l=="function"?l(R)||[]:[],q=[];d&&typeof c=="function"&&q.push(X({label:_?"\u2713 \u5DF2\u52A0\u8F7D":"\u52A0\u8F7D",size:"small",variant:_?"ghost":"primary",disabled:_,onClick:pe=>{pe.stopPropagation();try{c(R.id)}catch(re){gs.warn("onSwitchTo \u5F02\u5E38",{err:re})}y()}})),q.push(X({label:"\u590D\u5236",size:"small",variant:"ghost",title:"\u590D\u5236\u4E3A\u7528\u6237\u9884\u8BBE",onClick:async pe=>{pe.stopPropagation();try{let re=n.duplicatePreset(R.id);re?.id&&typeof n.setCurrentPresetId=="function"&&n.setCurrentPresetId(re.id),y()}catch(re){gs.warn("duplicate \u5F02\u5E38",{err:re})}}})),M||(q.push(X({label:"\u270E",size:"small",variant:"ghost",title:"\u91CD\u547D\u540D",onClick:async pe=>{pe.stopPropagation();let re=await Me.prompt({title:"\u91CD\u547D\u540D\u9884\u8BBE",defaultValue:R.name,placeholder:"\u9884\u8BBE\u540D",validate:Te=>Te?null:"\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"});re&&re!==R.name&&(n.renamePreset(R.id,re),y())}})),q.push(X({label:"\xD7",size:"small",variant:"ghost",title:"\u5220\u9664",onClick:async pe=>{pe.stopPropagation(),await Me.confirm({title:"\u5220\u9664\u9884\u8BBE",message:`\u786E\u8BA4\u5220\u9664\u300C${R.name}\u300D\uFF1F\u6B64\u64CD\u4F5C\u4E0D\u53EF\u64A4\u9500\u3002`,confirmText:"\u5220\u9664",danger:!0})&&(n.deletePreset(R.id),y())}})));let ue=sl({id:R.id,name:R.name,desc:R.description,active:_,builtin:M,metaChips:j,actions:q,onClick:()=>{typeof n.setCurrentPresetId=="function"&&n.setCurrentPresetId(R.id),y()}});S.appendChild(ue.el)}let T=X({label:"+ \u65B0\u5EFA\u9884\u8BBE",size:"small",variant:"primary",onClick:async()=>{let R=await Me.prompt({title:"\u65B0\u5EFA\u9884\u8BBE",placeholder:"\u9884\u8BBE\u540D\uFF08\u5FC5\u586B\uFF09",validate:_=>_?null:"\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"});if(R)try{let _=n.createPreset({name:R});_?.id&&typeof n.setCurrentPresetId=="function"&&n.setCurrentPresetId(_.id),y()}catch(_){gs.warn("createPreset \u5931\u8D25",{err:_}),await Me.confirm({title:"\u521B\u5EFA\u5931\u8D25",message:String(_?.message||_),confirmText:"\u786E\u5B9A"})}}}),A=Yt({heading:"\u9884\u8BBE\u9009\u62E9",icon:"\u{1F4CB}",actions:[T.el],content:[S]});x.push(A),h.appendChild(A.el);let C=g?m.find(R=>R.id===g):null;if(C){let R=null;try{R=a(C,{readonly:!1,onChange:M=>{if(!(!M||typeof M!="object"))try{n.updatePreset(C.id,M)}catch(j){gs.warn("updatePreset \u5931\u8D25",{err:j})}},refresh:y})}catch(M){gs.error("renderEditor \u5F02\u5E38",{err:M}),R=f("div",{text:`\u7F16\u8F91\u5668\u6E32\u67D3\u5F02\u5E38\uFF1A${M?.message||M}`,style:{color:"var(--yyt-danger, #f87171)",fontSize:"12px"}})}let _=Yt({heading:`\u7F16\u8F91\u300C${C.name}\u300D`,icon:"\u270E",content:[R].filter(Boolean)});if(x.push(_),h.appendChild(_.el),typeof i=="function"){let M=null;try{M=i(C,{refresh:y})}catch(j){gs.warn("renderExtras \u5F02\u5E38",{err:j})}if(M){let j=Yt({heading:"\u9644\u52A0",icon:"\u{1F527}",content:[M]});x.push(j),h.appendChild(j.el)}}}else m.length>0&&h.appendChild(f("div",{text:"\u8BF7\u5728\u4E0A\u65B9\u5217\u8868\u9009\u62E9\u4E00\u4E2A\u9884\u8BBE\u4EE5\u7F16\u8F91",style:{fontSize:"12px",color:"var(--yyt-text-muted)",padding:"16px",textAlign:"center",border:"1px dashed var(--yyt-border, rgba(255,255,255,0.08))",borderRadius:"var(--yyt-radius-sm, 6px)"}}));let w=X({label:"\u2B06 \u5BFC\u5165",size:"small",variant:"ghost",onClick:async()=>{await Mb(n,y)}}),P=X({label:"\u2B07 \u5BFC\u51FA",size:"small",variant:"ghost",onClick:()=>{Pb(n,r)}}),B=X({label:"\u6E05\u7A7A\u5168\u90E8",size:"small",variant:"ghost",onClick:async()=>{await Me.confirm({title:"\u6E05\u7A7A\u6240\u6709\u9884\u8BBE",message:"\u6B64\u64CD\u4F5C\u4F1A\u5220\u9664\u6240\u6709\u7528\u6237\u9884\u8BBE\uFF08\u5185\u7F6E\u9884\u8BBE\u4E0D\u53D7\u5F71\u54CD\uFF09\uFF0C\u4E0D\u53EF\u64A4\u9500\u3002",confirmText:"\u6E05\u7A7A",danger:!0})&&typeof n.resetAll=="function"&&(n.resetAll(),y())}}),z=rl({items:[w,P,B],align:"end",gap:"8px"});h.appendChild(z.el),p.innerHTML="",p.appendChild(h),p._yytPresetPanelCleanup=()=>{for(let R of x)try{R.destroy()}catch{}delete p._yytPresetPanelCleanup}},destroy(u){let p=Su(u);if(p?._yytPresetPanelCleanup)try{p._yytPresetPanelCleanup()}catch{}},getStyles(){return""}}}async function Mb(t,e){if(typeof t.importPresets!="function"){await Me.confirm({title:"\u4E0D\u652F\u6301\u5BFC\u5165",message:"\u5F53\u524D\u9884\u8BBE\u7C7B\u578B\u4E0D\u652F\u6301\u5BFC\u5165\u3002",confirmText:"\u786E\u5B9A"});return}let r=f("textarea",{className:"yyt-textarea",attrs:{placeholder:"\u7C98\u8D34\u5BFC\u51FA\u7684 JSON"},style:{width:"100%",minHeight:"180px",fontSize:"12px",fontFamily:"monospace"}}),s=Me.custom({title:"\u5BFC\u5165\u9884\u8BBE",width:"520px",body:r,buttons:[{label:"\u53D6\u6D88",variant:"ghost",onClick:n=>n(null)},{label:"\u4ECE\u6587\u4EF6\u2026",variant:"ghost",onClick:()=>{let n=f("input",{attrs:{type:"file",accept:"application/json,.json"}});n.addEventListener("change",()=>{let a=n.files?.[0];if(!a)return;let i=new FileReader;i.onload=()=>{r.value=String(i.result||""),r.focus()},i.readAsText(a)}),n.click()}},{label:"\u5BFC\u5165",variant:"primary",onClick:async n=>{let a=r.value.trim();if(!a){n(null);return}let i;try{i=JSON.parse(a)}catch(l){await Me.confirm({title:"JSON \u89E3\u6790\u5931\u8D25",message:String(l?.message||l),confirmText:"\u786E\u5B9A"});return}try{let l=t.importPresets(i);n(l)}catch(l){await Me.confirm({title:"\u5BFC\u5165\u5931\u8D25",message:String(l?.message||l),confirmText:"\u786E\u5B9A"})}}}]});setTimeout(()=>r.focus(),0);let o=await s.result;o&&(o.added>0||o.imported>0)&&e()}function Pb(t,e){if(typeof t.exportAll!="function"){Me.confirm({title:"\u4E0D\u652F\u6301\u5BFC\u51FA",message:"\u5F53\u524D\u9884\u8BBE\u7C7B\u578B\u4E0D\u652F\u6301\u5BFC\u51FA\u3002",confirmText:"\u786E\u5B9A"});return}let r=t.exportAll(),s=JSON.stringify(r,null,2),o=f("textarea",{className:"yyt-textarea",style:{width:"100%",minHeight:"220px",fontSize:"12px",fontFamily:"monospace"}});o.value=s,o.readOnly=!0,Me.custom({title:`\u5BFC\u51FA ${e||""} \u9884\u8BBE`,width:"600px",body:o,buttons:[{label:"\u5173\u95ED",variant:"ghost",onClick:n=>n(null)},{label:"\u590D\u5236\u5230\u526A\u8D34\u677F",variant:"ghost",onClick:async()=>{try{await navigator.clipboard.writeText(s)}catch{o.select();try{document.execCommand("copy")}catch{}}}},{label:"\u4E0B\u8F7D JSON",variant:"primary",onClick:()=>{try{let n=new Blob([s],{type:"application/json"}),a=URL.createObjectURL(n),i=f("a",{attrs:{href:a,download:`${e||"preset"}_${Date.now()}.json`}});document.body.appendChild(i),i.click(),setTimeout(()=>{try{document.body.removeChild(i)}catch{}try{URL.revokeObjectURL(a)}catch{}},100)}catch(n){gs.warn("\u4E0B\u8F7D\u5931\u8D25",{err:n})}}}]})}var gs,Yo=D(()=>{tr();H();gs=E.createScope("PresetManagerBase")});var Eu={};ae(Eu,{ApiPresetPanel:()=>_u,default:()=>Ob});function Db(t,{onChange:e,readonly:r}){let s=f("div",{style:{display:"flex",flexDirection:"column",gap:"12px"}}),o=t.apiConfig||{};G(s,kt({label:"\u63CF\u8FF0",control:he({value:t.description||"",placeholder:"\u53EF\u9009 \u2014 \u5907\u6CE8\u7528\u9014",disabled:r,onChange:i=>e({description:i})})})),G(s,wt({label:"\u4F7F\u7528\u4E3B API",hint:"\u5F00\u542F\u540E\u5FFD\u7565\u4E0B\u65B9 URL/Key/Model\uFF0C\u76F4\u63A5\u590D\u7528 SillyTavern \u4E3B\u8FDE\u63A5",checked:o.useMainApi!==!1,disabled:r,onChange:i=>e({apiConfig:{...o,useMainApi:i}})})),G(s,wt({label:"\u6D41\u5F0F\u8F93\u51FA\uFF08stream\uFF09",hint:"\u9010\u5B57\u63A5\u6536\u54CD\u5E94",checked:o.stream===!0,disabled:r,onChange:i=>e({apiConfig:{...o,stream:i}})})),G(s,kt({label:"API URL",control:he({value:o.url||"",placeholder:"https://api.example.com/v1",disabled:r,onChange:i=>e({apiConfig:{...o,url:i}})})})),G(s,kt({label:"API Key",control:he({value:o.apiKey||"",placeholder:"sk-...",disabled:r,attrs:{type:"password"},onChange:i=>e({apiConfig:{...o,apiKey:i}})})})),G(s,kt({label:"\u6A21\u578B",control:he({value:o.model||"",placeholder:"gpt-4 / gemini-pro / claude-...",disabled:r,onChange:i=>e({apiConfig:{...o,model:i}})})}));let n=f("div",{style:{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:"10px"}});function a(i,l,d,c="1"){let u=f("div",{style:{display:"flex",flexDirection:"column",gap:"4px"}});u.appendChild(f("label",{text:i,style:{fontSize:"11px",color:"var(--yyt-text-secondary)",fontWeight:"600"}}));let p=f("input",{className:"yyt-input",attrs:{type:"number",step:c,disabled:r?"disabled":null},style:{padding:"6px 10px",fontSize:"12px"}});return p.value=String(o[l]??d),p.addEventListener("change",()=>{let y=Number(p.value);Number.isFinite(y)&&e({apiConfig:{...o,[l]:y}})}),u.appendChild(p),u}return n.appendChild(a("max_tokens","max_tokens",4096,"1")),n.appendChild(a("temperature","temperature",.7,"0.05")),n.appendChild(a("top_p","top_p",.9,"0.05")),G(s,n),s}function Lb(t){let e=t.apiConfig||{},r=[];return e.useMainApi!==!1?r.push("\u4E3B API"):r.push(e.model||"\u81EA\u5B9A\u4E49"),t.starred&&r.push("\u2605"),r}var Dr,Nb,_u,Ob,Au=D(()=>{tr();Go();H();Yo();Dr=E.createScope("ApiPresetPanel"),Nb={listPresets(){return Pr().map(t=>({id:t.name,name:t.name,description:t.description||"",apiConfig:t.apiConfig||{},starred:t.starred===!0,createdAt:t.createdAt,updatedAt:t.updatedAt}))},getPreset(t){if(!t)return null;let e=fs(t);return e?{id:e.name,...e,description:e.description||""}:null},getCurrentPresetId(){return qi()||""},setCurrentPresetId(t){if(!t)return!1;try{return!!ta(t)}catch(e){return Dr.warn("switchToPreset \u5931\u8D25",{err:e}),!1}},createPreset(t){let e=String(t?.name||"").trim();if(!e)return Dr.warn("createPreset: name \u7F3A\u5931"),null;let r=Zn({name:e,description:t?.description||"",apiConfig:t?.apiConfig||{}});return r?.success?{id:r.preset.name,...r.preset,description:r.preset.description||""}:(Dr.warn("createPreset \u5931\u8D25",{msg:r?.message}),null)},updatePreset(t,e){if(!t)return null;let r=Wi(t,e);return r?.success?{id:r.preset.name,...r.preset,description:r.preset.description||""}:(Dr.warn("updatePreset \u5931\u8D25",{id:t,msg:r?.message}),null)},deletePreset(t){if(!t)return!1;try{let e=ea(t);return!!(e?.success??e===!0)}catch(e){return Dr.warn("deletePreset \u5931\u8D25",{err:e}),!1}},duplicatePreset(t,e={}){if(!t)return null;let r=e.nameSuffix||"_\u526F\u672C",s=`${t}${r}`;try{let o=Gi(t,s);return o?.success?{id:o.preset.name,...o.preset,description:o.preset.description||""}:null}catch(o){return Dr.warn("duplicatePreset \u5931\u8D25",{err:o}),null}},renamePreset(t,e){if(!t||!e)return null;try{let r=Hi(t,e);return r?.success?{id:r.preset?.name||e,...r.preset,description:r.preset?.description||""}:null}catch(r){return Dr.warn("renamePreset \u5931\u8D25",{err:r}),null}},exportAll(){let t=Yi();try{return{version:1,exportedAt:Date.now(),presets:JSON.parse(t)}}catch{return{version:1,exportedAt:Date.now(),presets:[]}}},importPresets(t){if(!t||typeof t!="object")return{added:0};let e=Array.isArray(t.presets)?t.presets:[t],r=JSON.stringify(e);return{added:Vi(r,{overwrite:!1})?.imported||0}},resetAll(){let t=Pr();for(let e of t)try{ea(e.name)}catch{}}};_u=Nr({id:"apiPresetPanel",kind:"api",panelTitle:"API \u9884\u8BBE",panelHint:'\u7BA1\u7406\u591A\u7EC4 API \u8FDE\u63A5\u914D\u7F6E\u3002\u70B9\u51FB"\u52A0\u8F7D"\u6FC0\u6D3B\u67D0\u4E2A\u9884\u8BBE\u4F5C\u4E3A\u5F53\u524D API\uFF1B\u5176\u4ED6\u5DE5\u5177\u53EF\u5728\u914D\u7F6E\u9762\u677F\u4E2D\u6309\u9884\u8BBE\u540D\u5F15\u7528\u3002',store:Nb,renderEditor:Db,renderListItemMeta:Lb,hasSwitchToButton:!0,onSwitchTo:t=>{try{ta(t)}catch(e){Dr.warn("switchToPreset",{err:e})}}}),Ob=_u});function al(){return`wb_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`}function Or(){let t=ke.get(nl);return!t||typeof t!="object"?{}:t}function na(t){ke.set(nl,t)}function hs(t){return typeof t=="string"&&t.startsWith($b)}function Cu(t){return hs(t)&&oa.find(e=>e.id===t)||null}function il(t){if(!Array.isArray(t)){oa=[];return}oa=t.map(e=>Lr({...e,id:String(e?.id||"")})).filter(e=>hs(e.id))}function Lr(t={}){let e=String(t.id||al()),r=Array.isArray(t.bookList)?t.bookList.map(s=>({bookName:String(s?.bookName||""),enabled:s?.enabled!==!1,entryOverrides:s?.entryOverrides&&typeof s.entryOverrides=="object"?s.entryOverrides:{}})).filter(s=>s.bookName):[];return{id:e,name:String(t.name||"").trim()||"\u672A\u547D\u540D\u9884\u8BBE",description:String(t.description||""),bindingMode:t.bindingMode===rr.CUSTOM?rr.CUSTOM:rr.CHARACTER_CARD,includeDisabled:t.includeDisabled===!0,bookList:r,createdAt:Number.isFinite(t.createdAt)?t.createdAt:Date.now(),updatedAt:Number.isFinite(t.updatedAt)?t.updatedAt:Date.now()}}function Bb(){let t=Or(),e=new Set,r=[];for(let o of oa){let n=t[o.id];n?(r.push(Lr(n)),e.add(o.id)):r.push(o)}let s=Object.values(t).map(Lr).filter(o=>!e.has(o.id)).sort((o,n)=>n.updatedAt-o.updatedAt);return r.push(...s),r}function Jo(t){if(!t)return null;let e=Or();return e[t]?Lr(e[t]):hs(t)?Cu(t):null}function ll(){let t=ke.get(Vo);return typeof t=="string"&&t?t:""}function zb(){let t=ll();return t?Jo(t):null}function Kb(t){if(t&&hs(t))return ke.set(Vo,t),W.emit(U.PRESET_ACTIVATED,{kind:"worldbook",id:t}),!0;let e=Or();return t&&!e[t]?(ms.warn(`setCurrentPresetId \u627E\u4E0D\u5230\u9884\u8BBE: ${t}`),!1):(ke.set(Vo,t||""),W.emit(U.PRESET_ACTIVATED,{kind:"worldbook",id:t}),!0)}function aa(t={}){let e=Lr({...t,id:al(),createdAt:Date.now(),updatedAt:Date.now()}),r=Or();return r[e.id]=e,na(r),W.emit(U.PRESET_CREATED,{kind:"worldbook",id:e.id}),ms.info(`\u521B\u5EFA\u9884\u8BBE: ${e.id} (${e.name})`),e}function ku(t,e={},{silent:r=!1}={}){if(!t)return null;let s=Or(),o=s[t];if(!o&&hs(t)&&(o=Cu(t)),!o)return ms.warn(`updatePreset \u627E\u4E0D\u5230\u9884\u8BBE: ${t}`),null;let n=Lr({...o,...e,id:t,createdAt:o.createdAt,updatedAt:Date.now()});return s[t]=n,na(s),r||W.emit(U.PRESET_UPDATED,{kind:"worldbook",id:t}),n}function Ub(t){if(!t)return!1;if(hs(t))return ms.warn(`\u62D2\u7EDD\u5220\u9664\u5185\u7F6E\u9884\u8BBE: ${t}`),!1;let e=Or();return e[t]?(delete e[t],na(e),ll()===t&&ke.set(Vo,""),W.emit(U.PRESET_DELETED,{kind:"worldbook",id:t}),ms.info(`\u5220\u9664\u9884\u8BBE: ${t}`),!0):!1}function Fb(t,{nameSuffix:e=" \u526F\u672C"}={}){let r=Jo(t);return r?aa({...r,id:void 0,name:`${r.name}${e}`}):null}function jb(t,e){return hs(t)?(ms.warn(`\u62D2\u7EDD\u91CD\u547D\u540D\u5185\u7F6E\u9884\u8BBE: ${t}`),null):ku(t,{name:String(e||"").trim()||"\u672A\u547D\u540D\u9884\u8BBE"})}function Wb(){return{version:1,exportedAt:Date.now(),presets:Object.values(Or()).map(Lr)}}function Hb(t){if(!t||typeof t!="object")return{added:0,skipped:0};let e=Array.isArray(t.presets)?t.presets:[],r=Or(),s=0,o=0;for(let n of e){let a=Lr({...n,id:al(),createdAt:Date.now(),updatedAt:Date.now()});r[a.id]=a,s+=1}return na(r),s>0&&W.emit(U.PRESET_IMPORTED,{kind:"worldbook",count:s}),{added:s,skipped:o}}function Gb(){ke.set(nl,{}),ke.set(Vo,""),ms.info("\u5DF2\u6E05\u7A7A\u6240\u6709\u4E16\u754C\u4E66\u9884\u8BBE")}var ms,nl,Vo,rr,$b,oa,ct,Ys=D(()=>{je();Ze();H();ms=E.createScope("WorldbookPresetStore"),nl="worldbook_presets",Vo="worldbook_current_preset",rr=Object.freeze({CHARACTER_CARD:"character_card",CUSTOM:"custom"});$b="builtin_worldbook_",oa=[];ct={listPresets:Bb,getPreset:Jo,getCurrentPresetId:ll,getCurrentPreset:zb,setCurrentPresetId:Kb,createPreset:aa,updatePreset:ku,deletePreset:Ub,duplicatePreset:Fb,renamePreset:jb,exportAll:Wb,importPresets:Hb,resetAll:Gb,BINDING_MODES:rr}});function $r(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window}function ia(){return $r()?.SillyTavern||null}function _e(t){return t==null?"":String(t).trim()}function Yb(t){if(!t)return"";let e=[t.content,t.mes,t.message,t.text,t?.data?.content];for(let r of e)if(typeof r=="string"&&r.trim())return r.trim();return""}function Vb(t){let e=String(t?.role||"").trim().toLowerCase();return e==="assistant"||e==="ai"?"assistant":e==="system"?"system":e==="user"||t?.is_user===!0?"user":t?.is_system===!0?"system":"assistant"}function Ru(t=""){let e=String(t||"").trim();if(!e)return"empty";let r=0;for(let s=0;s<e.length;s+=1)r=(r<<5)-r+e.charCodeAt(s),r|=0;return`fp_${Math.abs(r).toString(36)}`}function Mu(t={}){let e=_e(t.chatId)||"chat_default",r=_e(t.messageId)||"latest";return`${e}::${r}`}function Pu(t={}){let e=Mu(t),r=_e(t.effectiveSwipeId)||"swipe:current",s=_e(t.assistantContentFingerprint)||"empty";return`${e}::${r}::${s}`}function Jb(t={}){let e=Pu(t),r=_e(t.eventType)||"MANUAL",s=_e(t.traceId)||Nu("manual");return`${e}::${r}::${s}`}function Nu(t="trace"){return`${t}_${Date.now()}_${Math.random().toString(36).slice(2,8)}`}function Du(){let t=ia();try{let e=t?.getContext?.()||null;if(Array.isArray(e?.chat))return e.chat}catch{}return Array.isArray(t?.chat)?t.chat:[]}function Lu(t=[]){let e=[],r=null,s=null;return t.forEach((o,n)=>{let a=Vb(o),i=Yb(o);if(!i)return;let l=_e(o?.messageId??o?.message_id??o?.id??o?.mid??o?.mesid??o?.chat_index??n),d=_e(o?.swipe_id??o?.swipeId??o?.swipe??""),c={role:a,content:i,sourceId:l,swipeId:d,raw:o,index:n};e.push(c),a==="user"&&(r=c),a==="assistant"&&(s=c)}),{messages:e,lastUserMessage:r,lastAiMessage:s}}function Xb(t,e,r){return _e(e?.chatId??e?.chat_id??t?.chatId??t?.chat_id??t?.this_chid??r?.id??"chat_default")||"chat_default"}async function cl(){let t=ia();if(!t)return null;try{let e=t.this_chid,r=t.characters||[];if(e>=0&&e<r.length){let s=r[e];return{id:e,name:s?.name||"",description:s?.description||"",personality:s?.personality||"",scenario:s?.scenario||"",firstMes:s?.first_mes||"",mesExample:s?.mes_example||""}}}catch(e){qb.error("\u83B7\u53D6\u89D2\u8272\u4FE1\u606F\u5931\u8D25:",e)}return null}function Qb(t="",e=null){let r=String(t||""),s=e?.YouYouToolkit_toolOutputs;return s&&typeof s=="object"&&Object.values(s).forEach(o=>{let n=String(o?.blockText||o?.content||"").trim();n&&r.includes(n)&&(r=r.replace(n,"").trimEnd())}),r.trim()}function Zb(t,e={}){let r=Array.isArray(t?.messages)?t.messages:[],s=_e(e.messageId),o=_e(e.swipeId);if(!s)return t?.lastAiMessage||null;let n=r.filter(i=>i.role==="assistant"),a=n.find(i=>i.sourceId!==s?!1:o?_e(i.swipeId)===o:!0);return a||n.find(i=>i.sourceId===s)||null}function Ou({api:t,stContext:e,character:r,conversation:s,targetAssistantMessage:o,runSource:n="MANUAL"}={}){let a=s?.messages||[],i=s?.lastUserMessage||null,l=_e(o?.sourceId)||"",d=_e(o?.swipeId)||"swipe:current",c=o?.content||"",u=Qb(c,o?.raw||null),p=Ru(c),y=Ru(u),m=Xb(t,e,r),g=Nu(String(n||"manual").toLowerCase()),h=Mu({chatId:m,messageId:l}),x=Pu({chatId:m,messageId:l,effectiveSwipeId:d,assistantContentFingerprint:y});return{startedAt:Date.now(),runSource:n,traceId:g,chatId:m,messageId:l,confirmedAssistantMessageId:l,slotBindingKey:h,slotRevisionKey:x,slotTransactionId:Jb({chatId:m,messageId:l,effectiveSwipeId:d,assistantContentFingerprint:y,eventType:n,traceId:g}),executionKey:x,lastAiMessage:c,assistantContentFingerprint:p,assistantBaseText:u,assistantBaseFingerprint:y,lastAiMessageSwipeId:d,confirmedAssistantSwipeId:d,effectiveSwipeId:d,sourceMessageId:l,sourceSwipeId:d,lastUserMessage:i?.content||"",userMessage:i?.content||"",targetAssistantMessage:o,chatMessages:a,characterCard:r,chatHistory:a,input:{userMessage:i?.content||"",lastAiMessage:c,assistantBaseText:u,extractedContent:"",previousToolOutput:"",context:{character:r?.name||"",chatLength:a.length||0}},config:{},status:"pending"}}async function bs({runSource:t="MANUAL"}={}){let e=ia(),r=e?.getContext?.()||null,s=await cl(),o=Du(),n=Lu(o),a=n?.lastAiMessage||null;return Ou({api:e,stContext:r,character:s,conversation:n,targetAssistantMessage:a,runSource:t})}async function xs({messageId:t,swipeId:e="",runSource:r="AUTO"}={}){let s=ia(),o=s?.getContext?.()||null,n=await cl(),a=Du(),i=Lu(a),l=Zb(i,{messageId:t,swipeId:e});return Ou({api:s,stContext:o,character:n,conversation:i,targetAssistantMessage:l,runSource:r})}var qb,ws=D(()=>{H();qb=E.createScope("ExecutionContext")});function Xo(){try{if(typeof TavernHelper<"u"&&TavernHelper)return TavernHelper}catch{}return $r()?.TavernHelper||null}function $u(){try{if(typeof SillyTavern<"u"&&SillyTavern)return SillyTavern}catch{}return $r()?.SillyTavern||null}function Vs(t){return Array.isArray(t)?Array.from(new Set(t.map(e=>String(e||"").trim()).filter(Boolean))):[]}function dl(t){if(Array.isArray(t))return t.map(e=>typeof e=="string"?e:e&&typeof e=="object"?e.name||e.id||e.title||JSON.stringify(e):String(e??""));if(t&&typeof t=="object"){let e={};return Object.keys(t).forEach(r=>{let s=t[r];Array.isArray(s)?e[r]=s.map(o=>typeof o=="string"?o:o&&typeof o=="object"?o.name||o.id||o.title||"[object]":String(o??"")):s&&typeof s=="object"?e[r]="[object]":e[r]=s}),e}return t}function tx(t={}){let e=typeof t.content=="string"?t.content.trim():"";if(!e)return"";let r=[t.comment,t.key,t.keysecondary,t.text].map(s=>String(s||"").trim()).find(Boolean);return r&&r!==e?`## ${r}
${e}`:e}function Bu(){return Array.isArray(ul)?[...ul]:[]}async function la(t){if(t||(t=Xo()),!t||typeof t.getCharLorebooks!="function")return[];try{let e=await Promise.resolve(t.getCharLorebooks({type:"all"}));return Vs([e?.primary,e?.secondary,...Array.isArray(e?.additional)?e.additional:[]])}catch(e){return vs.warn("\u83B7\u53D6\u89D2\u8272\u7ED1\u5B9A\u4E16\u754C\u4E66\u5931\u8D25:",e),[]}}async function rx(t,e){if(t&&typeof t.getLorebooks=="function")try{let r=Vs(await Promise.resolve(t.getLorebooks()));if(r.length>0)return r}catch(r){vs.warn("\u83B7\u53D6\u5168\u90E8\u4E16\u754C\u4E66\u5217\u8868\u5931\u8D25:",r)}if(e&&typeof e.getWorldBooks=="function")try{let r=await Promise.resolve(e.getWorldBooks()),s=Vs(Array.isArray(r)?r.map(o=>o?.name??o):[]);if(s.length>0)return s}catch(r){vs.warn("\u4ECE SillyTavern \u83B7\u53D6\u4E16\u754C\u4E66\u5217\u8868\u5931\u8D25:",r)}return[]}async function pl(){let t=Xo(),e=$u(),r={checkedAt:Date.now(),hasGlobalTavernHelper:(()=>{try{return typeof TavernHelper<"u"&&!!TavernHelper}catch{return!1}})(),hasParentTavernHelper:!!$r()?.TavernHelper,hasGlobalSillyTavern:(()=>{try{return typeof SillyTavern<"u"&&!!SillyTavern}catch{return!1}})(),hasParentSillyTavern:!!$r()?.SillyTavern,helperKeys:t?Object.keys(t).sort():[],stKeys:e?Object.keys(e).sort():[],getLorebooksType:typeof t?.getLorebooks,getCharLorebooksType:typeof t?.getCharLorebooks,getLorebookEntriesType:typeof t?.getLorebookEntries,getWorldBooksType:typeof e?.getWorldBooks,characterWorldbooks:[],allWorldbooks:[],combinedWorldbooks:[],rawResults:{},errors:[]};try{r.rawResults.getLorebooks=t&&typeof t.getLorebooks=="function"?dl(await Promise.resolve(t.getLorebooks())):"[unavailable]"}catch(a){r.errors.push(`getLorebooks: ${a?.message||a}`)}try{r.rawResults.getCharLorebooks=t&&typeof t.getCharLorebooks=="function"?dl(await Promise.resolve(t.getCharLorebooks({type:"all"}))):"[unavailable]"}catch(a){r.errors.push(`getCharLorebooks: ${a?.message||a}`)}try{r.rawResults.getWorldBooks=e&&typeof e.getWorldBooks=="function"?dl(await Promise.resolve(e.getWorldBooks())):"[unavailable]"}catch(a){r.errors.push(`getWorldBooks: ${a?.message||a}`)}let s=await la(t),o=await rx(t,e),n=Vs([...s,...o]);return r.characterWorldbooks=[...s],r.allWorldbooks=[...o],r.combinedWorldbooks=[...n],ex=r,ul=n,[...n]}async function ca(t){let e="";if(typeof t=="string"?e=t:t&&typeof t=="object"&&(e=t?.worldbooks?.presetId||""),!e)return"";let r=Jo(e);if(!r)return vs.warn(`buildSelectedWorldbookContent: \u9884\u8BBE\u4E0D\u5B58\u5728 ${e}`),"";let s=r.includeDisabled===!0,o=[];if(r.bindingMode==="character_card"){let l=Xo(),d=$u(),c=await la(l),u=new Map((r.bookList||[]).map(p=>[String(p.bookName||""),p]));for(let p of Vs(c)){let y=u.get(p);y&&y.enabled===!1||o.push(p)}}else o=(r.bookList||[]).filter(l=>l&&l.bookName&&l.enabled!==!1).map(l=>l.bookName);if(o=Vs(o),o.length===0)return"";let n=Xo();if(!n||typeof n.getLorebookEntries!="function")return vs.warn("TavernHelper.getLorebookEntries \u4E0D\u53EF\u7528\uFF0C\u65E0\u6CD5\u8BFB\u53D6\u4E16\u754C\u4E66\u5185\u5BB9\u3002"),"";let a=new Map((r.bookList||[]).map(l=>[l.bookName,l.entryOverrides||{}])),i=[];for(let l of o)try{let d=await n.getLorebookEntries(l),c=Array.isArray(d)?d:[],u=a.get(l)||{},y=c.filter(m=>s||m?.enabled!==!1&&!m?.disable).filter(m=>{let g=u[String(m?.uid??"")];return g&&typeof g.enabled=="boolean"?g.enabled:!0}).map(tx).filter(Boolean).join(`

`);y&&i.push(`[\u4E16\u754C\u4E66\uFF1A${l}]
${y}`)}catch(d){vs.warn(`\u8BFB\u53D6\u4E16\u754C\u4E66\u5931\u8D25: ${l}`,d)}return i.join(`

---

`)}async function zu(t){if(!t)return[];let e=Xo();if(!e||typeof e.getLorebookEntries!="function")return[];try{let r=await e.getLorebookEntries(t);return Array.isArray(r)?r:[]}catch(r){return vs.warn(`getEntriesForBook \u5931\u8D25: ${t}`,r),[]}}var vs,ul,ex,da=D(()=>{ws();H();Ys();vs=E.createScope("ToolWorldbookService"),ul=[],ex=null});function Ku(t){if(!t)return"";let e=String(t).trim();return e=e.replace(/([a-z0-9])([A-Z])/g,"$1_$2"),e.toUpperCase()}function ua(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window}function Br(){try{return ua()?.SillyTavern||null}catch{return null}}function pa(t){try{return(t||Br())?.getContext?.()||null}catch{return null}}function yl(t,e){if(!t)return null;let r=typeof t?.on=="function"||typeof t?.addListener=="function",s=typeof t?.off=="function"||typeof t?.removeListener=="function";return!r||!s?null:{source:e,eventSource:t,capabilities:{on:typeof t?.on=="function",off:typeof t?.off=="function",addListener:typeof t?.addListener=="function",removeListener:typeof t?.removeListener=="function"}}}function sx(){let t=ua(),e=Br(),r=pa(e),o=[yl(e?.eventSource,"SillyTavern.eventSource"),yl(r?.eventSource,"SillyTavern.getContext().eventSource"),yl(t?.eventSource,"topWindow.eventSource")].filter(Boolean)[0]||null,n=e?.eventTypes||e?.event_types||r?.eventTypes||r?.event_types||t?.eventTypes||t?.event_types||{};return{topWindow:t,api:e,context:r,eventSource:o?.eventSource||null,eventTypes:n,source:o?.source||"unavailable",capabilities:o?.capabilities||null,hasBridge:!!o?.eventSource}}var It,We,ox,Uu,fl,vt,ya=D(()=>{H();It=E.createScope("HostEvents"),We=Object.freeze({APP_READY:"APP_READY",MESSAGE_SENT:"MESSAGE_SENT",MESSAGE_RECEIVED:"MESSAGE_RECEIVED",MESSAGE_UPDATED:"MESSAGE_UPDATED",MESSAGE_DELETED:"MESSAGE_DELETED",MESSAGE_EDITED:"MESSAGE_EDITED",MESSAGE_SWIPED:"MESSAGE_SWIPED",USER_MESSAGE_RENDERED:"USER_MESSAGE_RENDERED",CHARACTER_MESSAGE_RENDERED:"CHARACTER_MESSAGE_RENDERED",IMPERSONATE_READY:"IMPERSONATE_READY",GENERATION_STARTED:"GENERATION_STARTED",GENERATION_STOPPED:"GENERATION_STOPPED",GENERATION_ENDED:"GENERATION_ENDED",GENERATION_AFTER_COMMANDS:"GENERATION_AFTER_COMMANDS",CHAT_CHANGED:"CHAT_CHANGED",CHAT_CREATED:"CHAT_CREATED",CHAT_DELETED:"CHAT_DELETED",CHARACTER_PAGE_LOADED:"CHARACTER_PAGE_LOADED",CHARACTER_EDITOR_OPENED:"CHARACTER_EDITOR_OPENED",CHARACTER_EDITED:"CHARACTER_EDITED",WORLDINFO_UPDATED:"WORLDINFO_UPDATED"});ox=1500,Uu=20,fl=class{constructor(){this._bridge=null,this._pending=[],this._initAttempts=0,this._retryTimer=null,this._readyResolvers=[],this._initialized=!1,this._disposed=!1}subscribe(e,r,s={}){if(!e||typeof r!="function")return It.warn("subscribe \u65E0\u6548\u53C2\u6570",{eventKey:e,handlerType:typeof r}),()=>{};if(this._disposed)return It.warn("subscribe \u5728 dispose \u4E4B\u540E\u88AB\u8C03\u7528",{eventKey:e}),()=>{};let o={key:Ku(e),rawKey:e,handler:r,options:s,attached:!1,_hostName:"",_hostUnsubscribe:null,_disposed:!1};return this._pending.push(o),this._ensureInitialized(),this._bridge?.hasBridge&&this._attachEntry(o),()=>{if(o._disposed)return;o._disposed=!0;let n=this._pending.indexOf(o);if(n>=0&&this._pending.splice(n,1),o.attached&&typeof o._hostUnsubscribe=="function")try{o._hostUnsubscribe()}catch(a){It.warn("\u53D6\u6D88\u5BBF\u4E3B\u8BA2\u9605\u5931\u8D25",{event:o._hostName,error:a})}}}async emit(e,...r){if(this._ensureInitialized(),!this._bridge?.hasBridge)return It.debug("emit \u65F6\u5BBF\u4E3B\u6865\u672A\u5C31\u7EEA\uFF0C\u8DF3\u8FC7",{eventKey:e}),!1;let s=this._resolveHostEventName(e);if(!s)return!1;let{eventSource:o}=this._bridge;try{if(typeof o?.emit=="function")return await o.emit(s,...r),!0;if(typeof o?.dispatch=="function")return await o.dispatch(s,...r),!0}catch(n){It.warn("emit \u629B\u9519",{eventKey:e,hostName:s,error:n})}return!1}ready({timeoutMs:e=1e4}={}){return this._ensureInitialized(),this._bridge?.hasBridge?Promise.resolve(!0):new Promise(r=>{let s=!1,o=a=>{s||(s=!0,r(a))},n=e>0?setTimeout(()=>o(!1),e):null;this._readyResolvers.push(a=>{n&&clearTimeout(n),o(a)})})}describe(){this._ensureInitialized();let e=this._bridge?.eventTypes||{};return{initialized:this._initialized,source:this._bridge?.source||"unavailable",hasBridge:!!this._bridge?.hasBridge,initAttempts:this._initAttempts,retryScheduled:!!this._retryTimer,pendingCount:this._pending.filter(r=>!r.attached).length,attachedCount:this._pending.filter(r=>r.attached).length,availableEvents:Object.keys(e).slice(0,100)}}reinit(){if(this._disposed)return!1;for(let e of this._pending){if(e.attached&&typeof e._hostUnsubscribe=="function")try{e._hostUnsubscribe()}catch{}e.attached=!1,e._hostUnsubscribe=null,e._hostName=""}return this._bridge=null,this._initialized=!1,this._initAttempts=0,this._retryTimer&&(clearTimeout(this._retryTimer),this._retryTimer=null),this._ensureInitialized()}dispose(){this._retryTimer&&(clearTimeout(this._retryTimer),this._retryTimer=null);for(let e of this._pending){if(e.attached&&typeof e._hostUnsubscribe=="function")try{e._hostUnsubscribe()}catch{}e._disposed=!0}this._pending=[],this._readyResolvers=[],this._bridge=null,this._initialized=!1,this._disposed=!0}_ensureInitialized(){if(this._disposed)return!1;if(this._initialized&&this._bridge?.hasBridge)return!0;this._initAttempts+=1;let e=sx();if(this._bridge=e,this._initialized=!0,!e.hasBridge)return It.debug(`\u5BBF\u4E3B\u6865\u672A\u5C31\u7EEA (attempt ${this._initAttempts})`,{source:e.source}),this._scheduleRetry(),!1;It.info("\u5BBF\u4E3B\u6865\u5DF2\u5C31\u7EEA",{source:e.source,eventTypesCount:Object.keys(e.eventTypes).length});for(let s of this._pending)!s.attached&&!s._disposed&&this._attachEntry(s);let r=this._readyResolvers.slice();this._readyResolvers=[];for(let s of r)try{s(!0)}catch{}return!0}_scheduleRetry(){if(!this._retryTimer){if(this._initAttempts>=Uu){It.warn(`\u5DF2\u8FBE\u6700\u5927\u91CD\u8BD5\u6B21\u6570 (${Uu})\uFF0C\u505C\u6B62\u91CD\u8BD5`);let e=this._readyResolvers.slice();this._readyResolvers=[];for(let r of e)try{r(!1)}catch{}return}this._retryTimer=setTimeout(()=>{this._retryTimer=null,this._initialized=!1,this._ensureInitialized()},ox)}}_resolveHostEventName(e){let r=Ku(e),s=this._bridge?.eventTypes||{};if(s[r])return s[r];let o=r.toLowerCase();if(s[o])return s[o];let n=String(e).trim();return n&&n===n.toLowerCase()?n:o}_attachEntry(e){if(!this._bridge?.hasBridge||e.attached||e._disposed)return;let r=this._resolveHostEventName(e.rawKey);if(!r){It.warn("\u65E0\u6CD5\u89E3\u6790\u5BBF\u4E3B\u4E8B\u4EF6\u540D",{rawKey:e.rawKey});return}let{eventSource:s}=this._bridge,o=typeof s?.on=="function"?s.on.bind(s):typeof s?.addListener=="function"?s.addListener.bind(s):null,n=typeof s?.off=="function"?s.off.bind(s):typeof s?.removeListener=="function"?s.removeListener.bind(s):null;if(!o||!n){It.warn("\u5BBF\u4E3B eventSource \u7F3A\u5C11 on/off \u65B9\u6CD5");return}try{o(r,e.handler),e.attached=!0,e._hostName=r,e._hostUnsubscribe=()=>{try{n(r,e.handler)}catch(a){It.warn("\u53D6\u6D88\u5BBF\u4E3B\u8BA2\u9605\u5931\u8D25",{event:r,error:a})}},It.debug(`\u7ED1\u5B9A\u5BBF\u4E3B\u4E8B\u4EF6: "${r}" (key=${e.key})`)}catch(a){It.error(`\u7ED1\u5B9A\u5BBF\u4E3B\u4E8B\u4EF6\u5931\u8D25: "${r}"`,{error:a})}}},vt=new fl});var ju={};ae(ju,{WorldbookPresetPanel:()=>Qo,default:()=>px});function nx(t){return t===rr.CUSTOM?"\u81EA\u5B9A\u4E49":"\u8DDF\u968F\u89D2\u8272\u5361"}function ax(t,e,r){let s=[...t.bookList],o=s.findIndex(n=>n.bookName===e);o>=0?s[o]={...s[o],enabled:r}:s.push({bookName:e,enabled:r,entryOverrides:{}}),ct.updatePreset(t.id,{bookList:s})}function ix(t,e){let r=t.bookList.filter(s=>s.bookName!==e);ct.updatePreset(t.id,{bookList:r})}async function lx(t,e){let r=Bu();if(!r.length)try{r=await pl()}catch{}let s=new Set(t.bookList.map(c=>c.bookName)),o=r.filter(c=>!s.has(c));if(!o.length){await Me.confirm({title:"\u6CA1\u6709\u53EF\u6DFB\u52A0\u7684\u4E16\u754C\u4E66",message:"\u5BBF\u4E3B\u672A\u63D0\u4F9B\u66F4\u591A\u53EF\u7528\u4E16\u754C\u4E66\uFF0C\u6216\u7F13\u5B58\u5185\u5168\u90E8\u5DF2\u52A0\u5165\u6B64\u9884\u8BBE\u3002",confirmText:"\u786E\u5B9A"});return}let n=f("div",{style:{display:"flex",flexDirection:"column",gap:"8px"}}),a=f("input",{className:"yyt-input",attrs:{type:"text",placeholder:`\u641C\u7D22 ${o.length} \u672C\u4E16\u754C\u4E66\u2026`,autocomplete:"off"},style:{padding:"7px 10px",fontSize:"12px"}});n.appendChild(a);let i=f("div",{style:{display:"flex",flexDirection:"column",gap:"4px",maxHeight:"320px",overflowY:"auto"}}),l=new Set,d=[];for(let c of o){let u=f("label",{style:{display:"flex",alignItems:"center",gap:"8px",padding:"8px 10px",cursor:"pointer",borderRadius:"var(--yyt-radius-sm, 6px)",background:"var(--yyt-surface-2, rgba(255,255,255,0.03))",fontSize:"12px"}}),p=f("input",{attrs:{type:"checkbox",value:c}});p.addEventListener("change",()=>{p.checked?l.add(c):l.delete(c)}),u.appendChild(p),u.appendChild(f("span",{text:c,style:{color:"var(--yyt-text)"}})),i.appendChild(u),d.push({el:u,search:c.toLowerCase()})}n.appendChild(i),a.addEventListener("input",()=>{let c=a.value.trim().toLowerCase();for(let u of d)u.el.style.display=!c||u.search.includes(c)?"":"none"}),Me.custom({title:`\u6DFB\u52A0\u4E16\u754C\u4E66\uFF08${o.length} \u9879\u53EF\u9009\uFF09`,width:"480px",body:n,buttons:[{label:"\u53D6\u6D88",variant:"ghost",onClick:c=>c(null)},{label:"\u5168\u9009\u53EF\u89C1",variant:"ghost",onClick:()=>{for(let c of i.querySelectorAll("input[type=checkbox]")){let u=c.closest("label");(!u||u.style.display!=="none")&&(c.checked=!0,l.add(c.value))}}},{label:"\u6DFB\u52A0\u9009\u4E2D",variant:"primary",onClick:c=>{let u=Array.from(l);if(!u.length){c(null);return}let p=u.map(m=>({bookName:m,enabled:!0,entryOverrides:{}})),y=[...t.bookList,...p];ct.updatePreset(t.id,{bookList:y}),c(u.length)}}]}).result.then(c=>{c&&e&&e()})}function cx(t,{onChange:e,readonly:r,refresh:s}){let o=f("div",{style:{display:"flex",flexDirection:"column",gap:"12px"}});G(o,kt({label:"\u63CF\u8FF0",control:he({value:t.description,placeholder:"\u53EF\u9009 \u2014 \u5907\u6CE8\u7528\u9014",disabled:r,onChange:c=>e({description:c})})})),G(o,kt({label:"\u7ED1\u5B9A\u6A21\u5F0F",hint:"\u8DDF\u968F\u89D2\u8272\u5361 = \u6CE8\u5165\u5F53\u524D\u89D2\u8272\u7ED1\u5B9A\u7684\u4E16\u754C\u4E66\uFF1B\u81EA\u5B9A\u4E49 = \u7528\u4E0B\u65B9\u624B\u52A8\u9009\u62E9\u7684\u5217\u8868",control:Re({value:t.bindingMode,disabled:r,options:[{value:rr.CHARACTER_CARD,label:"\u8DDF\u968F\u89D2\u8272\u5361\uFF08\u52A8\u6001\uFF09"},{value:rr.CUSTOM,label:"\u81EA\u5B9A\u4E49\uFF08\u56FA\u5B9A\u5217\u8868\uFF09"}],onChange:c=>{e({bindingMode:c}),s&&s()}})})),G(o,wt({label:"\u5305\u542B\u7981\u7528\u8BCD\u6761",hint:"\u5F00\u542F\u540E\uFF1A\u6E90\u4E16\u754C\u4E66\u4E2D\u5DF2\u7981\u7528\u7684\u8BCD\u6761\u53EF\u88AB\u672C\u9884\u8BBE\u5F3A\u5236\u542F\u7528\u5E76\u6CE8\u5165",checked:t.includeDisabled,disabled:r,onChange:c=>e({includeDisabled:c})}));let n=t.bindingMode===rr.CHARACTER_CARD,a=f("div",{style:{display:"flex",flexDirection:"column"}}),i=f("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"6px",gap:"8px"}});i.appendChild(f("div",{style:{display:"flex",flexDirection:"column",gap:"2px"}},f("div",{text:n?"\u968F\u89D2\u8272\u5361\u6CE8\u5165\u7684\u4E16\u754C\u4E66":"\u9009\u4E2D\u7684\u4E16\u754C\u4E66",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}}),f("div",{text:n?"\u4EE5\u4E0B\u6765\u81EA\u5F53\u524D\u89D2\u8272\u5361\u7684\u4E16\u754C\u4E66\u5C06\u88AB\u81EA\u52A8\u6CE8\u5165\uFF0C\u5217\u8868\u968F\u89D2\u8272\u5361\u53D8\u52A8\u81EA\u52A8\u66F4\u65B0":'\u672C\u9884\u8BBE\u56FA\u5B9A\u6CE8\u5165\u4E0B\u5217\u4E16\u754C\u4E66\uFF1B\u70B9\u51FB"+ \u6DFB\u52A0"\u4ECE\u53EF\u7528\u5217\u8868\u591A\u9009',style:{fontSize:"11px",color:"var(--yyt-text-muted)",lineHeight:"1.5"}})));let l=f("div",{style:{display:"flex",gap:"6px"}});!n&&!r&&l.appendChild(X({label:"+ \u6DFB\u52A0",size:"small",onClick:()=>lx(t,s)}).el),n||l.appendChild(X({label:"\u{1F504} \u5237\u65B0",size:"small",variant:"ghost",onClick:async()=>{try{await pl()}catch(c){gl.warn("\u5237\u65B0\u5931\u8D25",{e:c})}s&&s()}}).el),i.appendChild(l),G(a,i);let d=[];if(n){let c=f("div",{style:{display:"flex",flexDirection:"column",gap:"4px"}});c.appendChild(f("div",{text:"\u6B63\u5728\u83B7\u53D6\u89D2\u8272\u5361\u7ED1\u5B9A\u7684\u4E16\u754C\u4E66\u2026",style:{padding:"14px 0",color:"var(--yyt-text-muted)",fontSize:"12px"}})),la().then(u=>{if(c.innerHTML="",!u.length)c.appendChild(f("div",{style:{padding:"14px 0",color:"var(--yyt-text-muted)",fontSize:"12px"},text:'\u5F53\u524D\u89D2\u8272\u5361\u672A\u7ED1\u5B9A\u4E16\u754C\u4E66 \u2014 \u5207\u6362\u5230"\u81EA\u5B9A\u4E49"\u53EF\u4EE5\u624B\u52A8\u9009\u62E9\u4EFB\u610F\u4E16\u754C\u4E66\u3002'}));else for(let p of u)c.appendChild(f("div",{style:{padding:"8px 10px",borderRadius:"var(--yyt-radius-sm, 6px)",background:"var(--yyt-surface-2, rgba(255,255,255,0.03))",fontSize:"12px",display:"flex",alignItems:"center",gap:"8px",opacity:"0.7"}},f("span",{text:"\u{1F4D6}",style:{fontSize:"11px"}}),f("span",{text:p,style:{flex:"1",color:"var(--yyt-text)"}}),f("span",{text:"\u968F\u89D2\u8272\u5361\u6CE8\u5165",style:{fontSize:"11px",color:"var(--yyt-text-muted)"}})))}).catch(u=>{gl.warn("\u83B7\u53D6\u89D2\u8272\u5361\u4E16\u754C\u4E66\u5931\u8D25",u),c.innerHTML="",c.appendChild(f("div",{style:{padding:"14px 0",color:"var(--yyt-danger, #f87171)",fontSize:"12px"},text:"\u83B7\u53D6\u89D2\u8272\u5361\u4E16\u754C\u4E66\u5931\u8D25"}))}),d=[c]}else t.bookList.length?d=t.bookList.map(c=>{let u=Object.keys(c.entryOverrides||{}).filter(m=>{let g=c.entryOverrides[m];return g&&typeof g.enabled=="boolean"}).length,p=f("div",{style:{display:"flex",flexDirection:"column"}}),y=Qi({name:c.bookName,desc:c.enabled===!1?"\u5DF2\u7981\u7528":`\u5DF2\u542F\u7528 \xB7 \u6574\u672C\u6CE8\u5165${u?` \xB7 ${u} \u6761 override`:""}`,actions:[X({label:"\u25B8 \u8BCD\u6761",size:"small",variant:"ghost",title:"\u5C55\u5F00/\u6536\u8D77\u8BCD\u6761\u7EA7 override",onClick:()=>dx(p,t,c,r,s)}),wt({checked:c.enabled!==!1,disabled:r,onChange:m=>ax(t,c.bookName,m)}),...r?[]:[X({label:"\xD7",size:"small",variant:"ghost",title:"\u4ECE\u9884\u8BBE\u79FB\u9664",onClick:()=>{ix(t,c.bookName),s&&s()}})]]});return y?.el&&G(p,y.el),p}):d=[f("div",{style:{padding:"14px 0",color:"var(--yyt-text-muted)",fontSize:"12px"},text:'\u70B9\u51FB\u53F3\u4E0A\u89D2"+ \u6DFB\u52A0"\u9009\u62E9\u4E16\u754C\u4E66\u52A0\u5165\u6B64\u9884\u8BBE\u3002'})];for(let c of d)c?.el?G(a,c.el):c instanceof Node&&G(a,c);return G(o,a),o}function dx(t,e,r,s,o){let n=t.querySelector(".yyt-wb-entry-panel");if(n){n.remove();let l=t.querySelector('[title="\u5C55\u5F00/\u6536\u8D77\u8BCD\u6761\u7EA7 override"]');l&&(l.textContent="\u25B8 \u8BCD\u6761");return}let a=t.querySelector('[title="\u5C55\u5F00/\u6536\u8D77\u8BCD\u6761\u7EA7 override"]');a&&(a.textContent="\u25BE \u8BCD\u6761");let i=f("div",{className:"yyt-wb-entry-panel",style:{marginLeft:"18px",marginTop:"4px",padding:"8px 10px",background:"var(--yyt-surface-2, rgba(255,255,255,0.03))",borderRadius:"var(--yyt-radius-sm, 6px)",border:"1px solid var(--yyt-border, rgba(255,255,255,0.06))",fontSize:"12px",display:"flex",flexDirection:"column",gap:"4px"}});i.appendChild(f("div",{text:"\u52A0\u8F7D\u4E2D\u2026",style:{color:"var(--yyt-text-muted)",padding:"4px 0"}})),t.appendChild(i),zu(r.bookName).then(l=>{if(!l.length){i.innerHTML="",i.appendChild(f("div",{text:"\u8BE5\u4E16\u754C\u4E66\u65E0\u8BCD\u6761",style:{color:"var(--yyt-text-muted)",padding:"4px 0"}}));return}let d=r.entryOverrides||{};i.innerHTML="";let c=f("input",{className:"yyt-input",attrs:{type:"text",placeholder:`\u641C\u7D22 ${l.length} \u4E2A\u8BCD\u6761\u2026`,autocomplete:"off"},style:{padding:"5px 8px",fontSize:"11px",marginBottom:"4px",flexShrink:"0"}});i.appendChild(c);let u=f("div",{style:{display:"flex",flexDirection:"column",gap:"2px",height:"260px",overflowY:"scroll",overscrollBehavior:"contain",WebkitOverflowScrolling:"touch"}});u.addEventListener("wheel",m=>{let g=m.deltaY;if(g===0)return;let h=u.scrollTop+u.clientHeight<u.scrollHeight-.5,x=u.scrollTop>.5;(g>0&&h||g<0&&x)&&(m.preventDefault(),m.stopPropagation(),u.scrollTop+=g)},{passive:!1});let p=e.includeDisabled===!0,y=[];for(let m of l){let g=String(m.uid??""),h=m.comment||m.key||m.name||"",x=String(Array.isArray(h)?h[0]:h).trim()||`\u6761\u76EE ${m.uid}`,S=m.enabled===!1||m.disable===!0,T=d[g],A=T&&typeof T.enabled=="boolean",C=S&&!A&&!p,w=f("div",{style:{display:"flex",alignItems:"center",gap:"8px",padding:"5px 8px",borderRadius:"4px",background:A?"rgba(123,183,255,0.08)":"transparent",opacity:C?"0.4":"1"}}),P=_=>{w.style.background=_?"rgba(123,183,255,0.08)":"transparent",R.style.color=_?"var(--yyt-accent)":"var(--yyt-text)",_?B||(B=z(),w.appendChild(B)):(B&&(B.remove(),B=null),w.style.opacity=S?"0.4":"1")},B=null,z=()=>{let _=f("span",{text:"\u2715",style:{cursor:"pointer",color:"var(--yyt-text-muted)",fontSize:"10px",flexShrink:"0"},attrs:{title:"\u6E05\u9664 override"}});return _.addEventListener("click",M=>{if(M.stopPropagation(),s)return;let j=ct.getPreset(e.id);if(!j)return;let q=j.bookList.find(ue=>ue.bookName===r.bookName);q&&(q.entryOverrides=q.entryOverrides||{},delete q.entryOverrides[g],ct.updatePreset(e.id,{bookList:[...j.bookList]},{silent:!0}),B=null,P(!1))}),_};w.appendChild(wt({checked:A?T.enabled:!S,disabled:s||C,onChange:_=>{let M=ct.getPreset(e.id);if(!M)return;let j=M.bookList.find(pe=>pe.bookName===r.bookName);if(!j)return;j.entryOverrides=j.entryOverrides||{};let q=!S;_===q?delete j.entryOverrides[g]:j.entryOverrides[g]={enabled:_};let ue=_!==q;ct.updatePreset(e.id,{bookList:[...M.bookList]},{silent:!0}),P(ue),w.style.opacity=C?"0.4":"1"}}).el);let R=f("span",{style:{flex:"1",minWidth:"0",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",color:A?"var(--yyt-accent)":"var(--yyt-text)",fontSize:"11px"},text:x+(C?" (\u6E90\u7981\u7528)":"")});w.appendChild(R),A&&(B=z(),w.appendChild(B)),u.appendChild(w),y.push({el:w,search:x.toLowerCase()})}i.appendChild(u),c.addEventListener("input",()=>{let m=c.value.trim().toLowerCase();for(let g of y)g.el.style.display=!m||g.search.includes(m)?"":"none"})}).catch(l=>{gl.warn("\u52A0\u8F7D\u8BCD\u6761\u5931\u8D25",l),i.innerHTML="",i.appendChild(f("div",{text:`\u52A0\u8F7D\u5931\u8D25\uFF1A${l?.message||l}`,style:{color:"var(--yyt-danger, #f87171)",padding:"4px 0"}}))})}function ux(t){let e=[`${nx(t.bindingMode)}`,`${t.bookList.length} \u672C`];return t.includeDisabled&&e.push("\u542B\u7981\u7528"),e}var gl,Qo,ml,Fu,px,Wu=D(()=>{tr();Ys();da();ya();sa();H();Yo();gl=E.createScope("WorldbookPresetPanel");Qo=Nr({id:"worldbookPresetPanel",kind:"worldbook",panelTitle:"\u4E16\u754C\u4E66\u9884\u8BBE",panelHint:"\u7BA1\u7406\u4E16\u754C\u4E66\u6CE8\u5165\u9884\u8BBE\u3002\u5DE5\u5177\u914D\u7F6E\u4E2D\u901A\u8FC7\u9884\u8BBE ID \u5F15\u7528\uFF0C\u53EF\u7ED1\u5B9A\u89D2\u8272\u5361\uFF08\u52A8\u6001\uFF09\u6216\u56FA\u5B9A\u5217\u8868\u3002",store:ct,renderEditor:cx,renderListItemMeta:ux}),ml=null,Fu=Qo.renderTo;Qo.renderTo=function(t){ml=t,Fu.call(this,t)};vt.subscribe(We.CHAT_CHANGED,()=>{if(!ml)return;let t=ct.getCurrentPreset();!t||t.bindingMode!==rr.CHARACTER_CARD||Fu.call(Qo,ml)});px=Qo});var Sl={};ae(Sl,{MESSAGE_MACROS:()=>yp,addTagRule:()=>rp,createRuleTemplate:()=>Qu,default:()=>gx,deleteRulePreset:()=>cp,deleteRuleTemplate:()=>ep,deleteTagRule:()=>op,escapeRegex:()=>Ts,exportRulesConfig:()=>dp,extractComplexTag:()=>Gu,extractCurlyBraceTag:()=>vl,extractHtmlFormatTag:()=>qu,extractSimpleTag:()=>wl,extractTagContent:()=>xr,generateTagSuggestions:()=>Vu,getAllRulePresets:()=>ip,getAllRuleTemplates:()=>Ju,getContentBlacklist:()=>Xs,getRuleTemplate:()=>Xu,getTagRules:()=>Js,importRulesConfig:()=>up,isValidTagName:()=>xl,loadRulePreset:()=>lp,saveRulesAsPreset:()=>ap,scanTextForTags:()=>Yu,setContentBlacklist:()=>np,setTagRules:()=>tp,shouldSkipContent:()=>bl,testRegex:()=>pp,updateRuleTemplate:()=>Zu,updateTagRule:()=>sp});function yx(){return{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"},ruleTemplates:[...hl],tagRules:[],contentBlacklist:[],tagRulePresets:{}}}function Rt(){return $.get(Hu,yx())}function or(t){$.set(Hu,t)}function fa(){let t=Rt();return dt=t.ruleTemplates||[...hl],Oe=t.tagRules||[],Tt=t.contentBlacklist||[],{ruleTemplates:dt,tagRules:Oe,contentBlacklist:Tt}}function Ts(t){return typeof t!="string"?"":t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function bl(t,e){if(!e||e.length===0||!t||typeof t!="string")return!1;let r=t.toLowerCase();return e.some(s=>{let o=s.trim().toLowerCase();return o&&r.includes(o)})}function xl(t){return!t||typeof t!="string"?!1:/^[a-zA-Z][a-zA-Z0-9_-]*$/.test(t)&&!fx.includes(t.toLowerCase())}function wl(t,e){if(!t||!e)return[];let r=[],s=Ts(e),o=new RegExp(`<${s}>([\\s\\S]*?)<\\/${s}>`,"gi");[...t.matchAll(o)].forEach(l=>{l[1]&&r.push(l[1].trim())});let a=(t.match(new RegExp(`<${s}>`,"gi"))||[]).length,i=(t.match(new RegExp(`<\\/${s}>`,"gi"))||[]).length;return a>i&&sr.warn(`\u53D1\u73B0 ${a-i} \u4E2A\u672A\u95ED\u5408\u7684 <${e}> \u6807\u7B7E`),r}function vl(t,e){if(!t||!e)return[];let r=[],s=Ts(e),o=new RegExp(`\\{${s}\\|`,"gi"),n;for(;(n=o.exec(t))!==null;){let a=n.index,i=a+n[0].length,l=1,d=i;for(;d<t.length&&l>0;)t[d]==="{"?l++:t[d]==="}"&&l--,d++;if(l===0){let c=t.substring(i,d-1);c.trim()&&r.push(c.trim())}o.lastIndex=a+1}return r}function Gu(t,e){if(!t||!e)return[];let r=e.split(",");if(r.length!==2)return sr.error(`\u590D\u6742\u6807\u7B7E\u914D\u7F6E\u683C\u5F0F\u9519\u8BEF\uFF0C\u5E94\u8BE5\u5305\u542B\u4E00\u4E2A\u9017\u53F7: ${e}`),[];let s=r[0].trim(),o=r[1].trim(),n=o.match(/<\/(\w+)>/);if(!n)return sr.error(`\u65E0\u6CD5\u89E3\u6790\u7ED3\u675F\u6807\u7B7E: ${o}`),[];let a=n[1],i=new RegExp(`${Ts(s)}([\\s\\S]*?)<\\/${a}>`,"gi"),l=[];return[...t.matchAll(i)].forEach(c=>{c[1]&&l.push(c[1].trim())}),l}function qu(t,e){if(!t||!e)return[];let r=e.match(/<(\w+)(?:\s[^>]*)?>/);if(!r)return sr.error(`\u65E0\u6CD5\u89E3\u6790HTML\u683C\u5F0F\u6807\u7B7E: ${e}`),[];let s=r[1],o=[],n=new RegExp(`<${s}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${s}>`,"gi");[...t.matchAll(n)].forEach(d=>{d[1]&&o.push(d[1].trim())});let i=(t.match(new RegExp(`<${s}(?:\\s[^>]*)?>`,"gi"))||[]).length,l=(t.match(new RegExp(`<\\/${s}>`,"gi"))||[]).length;return i>l&&sr.warn(`\u53D1\u73B0 ${i-l} \u4E2A\u672A\u95ED\u5408\u7684 <${s}> \u6807\u7B7E`),o}function xr(t,e,r=[]){if(!t)return"";if(!e||e.length===0)return t;let s=e.filter(c=>c.type==="exclude"&&c.enabled),o=e.filter(c=>(c.type==="include"||c.type==="regex_include")&&c.enabled),n=e.filter(c=>c.type==="regex_exclude"&&c.enabled),a=t;for(let c of s)try{let u=new RegExp(`<${Ts(c.value)}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${Ts(c.value)}>`,"gi");a=a.replace(u,"")}catch(u){sr.error("Error applying block exclusion rule:",{rule:c,error:u})}let i=[];if(o.length>0)for(let c of o){let u=[];try{if(c.type==="include")u.push(...wl(a,c.value)),u.push(...vl(a,c.value));else if(c.type==="regex_include"){let p=new RegExp(c.value,"gi");[...a.matchAll(p)].forEach(m=>{m[1]&&u.push(m[1])})}}catch(p){sr.error("Error applying inclusion rule:",{rule:c,error:p})}u.forEach(p=>i.push(p.trim()))}else i.push(a);let l=[];for(let c of i){for(let u of n)try{let p=new RegExp(u.value,"gi");c=c.replace(p,"")}catch(p){sr.error("Error applying cleanup rule:",{rule:u,error:p})}bl(c,r)||l.push(c)}return l.join(`

`).replace(/\n\s*\n\s*\n/g,`

`).replace(/^\s+|\s+$/g,"").trim()}async function Yu(t,e={}){let r=performance.now(),{chunkSize:s=5e4,maxTags:o=100,timeoutMs:n=5e3}=e,a=new Set,i=/<(?:\/|)([a-zA-Z0-9_-]+)(?:[^>]*)>|\{([a-zA-Z0-9_-]+)(?:\||})/g,l=0,d=0;for(let u=0;u<t.length;u+=s){let p=t.slice(u,Math.min(u+s,t.length));if(d++,l+=p.length,performance.now()-r>n){sr.warn(`Tag scanning timed out after ${n}ms`);break}let y;for(;(y=i.exec(p))!==null&&a.size<o;){let m=(y[1]||y[2]).toLowerCase();xl(m)&&a.add(m)}if(a.size>=o)break;d%5===0&&await new Promise(m=>setTimeout(m,0))}let c=performance.now();return{tags:Array.from(a).sort(),stats:{processingTimeMs:Math.round(c-r),processedChars:l,totalChars:t.length,chunkCount:d,tagsFound:a.size}}}function Vu(t,e=25){let r=t.tags.slice(0,e);return{suggestions:r,stats:{totalFound:t.stats.tagsFound,finalCount:r.length}}}function Ju(){return dt.length===0&&fa(),dt}function Xu(t){return dt.find(e=>e.id===t)}function Qu(t){let e={id:`rule-${Date.now()}`,name:t.name||"\u65B0\u89C4\u5219",description:t.description||"",type:t.type||"include",value:t.value||"",enabled:t.enabled!==!1,createdAt:new Date().toISOString()};return dt.push(e),Tl(),{success:!0,template:e,message:"\u89C4\u5219\u6A21\u677F\u521B\u5EFA\u6210\u529F"}}function Zu(t,e){let r=dt.findIndex(s=>s.id===t);return r===-1?{success:!1,message:"\u89C4\u5219\u6A21\u677F\u4E0D\u5B58\u5728"}:(dt[r]={...dt[r],...e,updatedAt:new Date().toISOString()},Tl(),{success:!0,template:dt[r],message:"\u89C4\u5219\u6A21\u677F\u66F4\u65B0\u6210\u529F"})}function ep(t){let e=dt.findIndex(r=>r.id===t);return e===-1?{success:!1,message:"\u89C4\u5219\u6A21\u677F\u4E0D\u5B58\u5728"}:(dt.splice(e,1),Tl(),{success:!0,message:"\u89C4\u5219\u6A21\u677F\u5DF2\u5220\u9664"})}function Tl(){let t=Rt();t.ruleTemplates=dt,or(t)}function Js(){return Oe||fa(),Oe}function tp(t){Oe=t||[];let e=Rt();e.tagRules=Oe,or(e)}function rp(t){let e={id:`tag-${Date.now()}`,type:t.type||"include",value:t.value||"",enabled:t.enabled!==!1};Oe.push(e);let r=Rt();return r.tagRules=Oe,or(r),{success:!0,rule:e,message:"\u89C4\u5219\u6DFB\u52A0\u6210\u529F"}}function sp(t,e){if(t<0||t>=Oe.length)return{success:!1,message:"\u89C4\u5219\u7D22\u5F15\u65E0\u6548"};Oe[t]={...Oe[t],...e};let r=Rt();return r.tagRules=Oe,or(r),{success:!0,rule:Oe[t],message:"\u89C4\u5219\u66F4\u65B0\u6210\u529F"}}function op(t){if(t<0||t>=Oe.length)return{success:!1,message:"\u89C4\u5219\u7D22\u5F15\u65E0\u6548"};Oe.splice(t,1);let e=Rt();return e.tagRules=Oe,or(e),{success:!0,message:"\u89C4\u5219\u5DF2\u5220\u9664"}}function Xs(){return Tt||fa(),Tt}function np(t){Tt=t||[];let e=Rt();e.contentBlacklist=Tt,or(e)}function ap(t,e=""){if(!t||!t.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let r=Rt();r.tagRulePresets||(r.tagRulePresets={});let s=`preset-${Date.now()}`;return r.tagRulePresets[s]={id:s,name:t.trim(),description:e.trim(),rules:JSON.parse(JSON.stringify(Oe)),blacklist:JSON.parse(JSON.stringify(Tt)),createdAt:new Date().toISOString()},or(r),{success:!0,preset:r.tagRulePresets[s],message:"\u9884\u8BBE\u4FDD\u5B58\u6210\u529F"}}function ip(){let e=Rt().tagRulePresets||{};return Object.values(e)}function lp(t){let e=Rt(),s=(e.tagRulePresets||{})[t];return s?(Oe=JSON.parse(JSON.stringify(s.rules||[])),Tt=JSON.parse(JSON.stringify(s.blacklist||[])),e.tagRules=Oe,e.contentBlacklist=Tt,or(e),{success:!0,preset:s,message:"\u9884\u8BBE\u52A0\u8F7D\u6210\u529F"}):{success:!1,message:"\u9884\u8BBE\u4E0D\u5B58\u5728"}}function cp(t){let e=Rt(),r=e.tagRulePresets||{};return r[t]?(delete r[t],e.tagRulePresets=r,or(e),{success:!0,message:"\u9884\u8BBE\u5DF2\u5220\u9664"}):{success:!1,message:"\u9884\u8BBE\u4E0D\u5B58\u5728"}}function dp(){return JSON.stringify({tagRules:Oe,contentBlacklist:Tt,ruleTemplates:dt,tagRulePresets:Rt().tagRulePresets||{}},null,2)}function up(t,e={overwrite:!0}){try{let r=JSON.parse(t);if(e.overwrite)Oe=r.tagRules||[],Tt=r.contentBlacklist||[],dt=r.ruleTemplates||hl;else if(r.tagRules&&Oe.push(...r.tagRules),r.contentBlacklist){let o=new Set(Tt.map(n=>n.toLowerCase()));r.contentBlacklist.forEach(n=>{o.has(n.toLowerCase())||Tt.push(n)})}let s=Rt();return s.tagRules=Oe,s.contentBlacklist=Tt,s.ruleTemplates=dt,r.tagRulePresets&&(s.tagRulePresets={...s.tagRulePresets||{},...r.tagRulePresets}),or(s),{success:!0,message:"\u914D\u7F6E\u5BFC\u5165\u6210\u529F"}}catch(r){return sr.error("\u89C4\u5219\u914D\u7F6E\u5BFC\u5165\u5931\u8D25",{error:r}),{success:!1,message:`\u5BFC\u5165\u5931\u8D25: ${r.message}`}}}function pp(t,e,r="g",s=0){try{if(!t||typeof t!="string")return{success:!1,error:"\u6B63\u5219\u8868\u8FBE\u5F0F\u4E0D\u80FD\u4E3A\u7A7A",matches:[]};let o=new RegExp(t,r),n=[];if(r.includes("g")){let a;for(;(a=o.exec(e))!==null;)a.length>1?n.push({fullMatch:a[0],groups:a.slice(1),index:a.index,extracted:a[s]||a[1]||a[0]}):n.push({fullMatch:a[0],groups:[],index:a.index,extracted:a[0]})}else{let a=o.exec(e);a&&n.push({fullMatch:a[0],groups:a.length>1?a.slice(1):[],index:a.index,extracted:a.length>1?a[s]||a[1]:a[0]})}return{success:!0,matches:n,count:n.length,extracted:n.map(a=>a.extracted)}}catch(o){return{success:!1,error:o.message,matches:[]}}}var sr,Hu,fx,hl,dt,Oe,Tt,yp,gx,Qs=D(()=>{je();H();sr=E.createScope("RegexExtractor"),Hu="settings";fx=["font","span","div","p","br","hr","img","a","b","i","u","s","em","strong","small","big","sub","sup","h1","h2","h3","h4","h5","h6","table","tr","td","th","tbody","thead","tfoot","ul","ol","li","form","input","button","select","option","textarea","label","script","style","meta","link","title","head","body","html"],hl=[{id:"exclude-thinking",name:"\u6392\u9664\u601D\u8003\u6807\u7B7E",description:"\u79FB\u9664<thinking>\u6807\u7B7E\u5757",type:"exclude",value:"thinking",enabled:!0},{id:"include-content",name:"\u63D0\u53D6\u5185\u5BB9\u6807\u7B7E",description:"\u63D0\u53D6<content>\u6807\u7B7E\u5185\u5BB9",type:"include",value:"content",enabled:!0},{id:"regex-exclude-cot",name:"\u6392\u9664\u5C0FCoT",description:"\u79FB\u9664HTML\u6CE8\u91CA",type:"regex_exclude",value:"<!--[\\s\\S]*?-->",enabled:!1},{id:"regex-include-details",name:"\u63D0\u53D6details\u6807\u7B7E",description:"\u63D0\u53D6<details>\u6807\u7B7E\u5185\u5BB9",type:"regex_include",value:"<details[^>]*>([\\s\\S]*?)</details>",enabled:!1}],dt=[],Oe=[],Tt=[];yp={lastMessage:{macro:"{{lastMessage}}",description:"\u6700\u540E\u4E00\u6761\u6D88\u606F"},lastCharMessage:{macro:"{{lastCharMessage}}",description:"\u6700\u540E\u4E00\u6761\u89D2\u8272\u6D88\u606F"},lastUserMessage:{macro:"{{lastUserMessage}}",description:"\u6700\u540E\u4E00\u6761\u7528\u6237\u6D88\u606F"},char:{macro:"{{char}}",description:"\u89D2\u8272\u540D\u79F0"},user:{macro:"{{user}}",description:"\u7528\u6237\u540D\u79F0"},input:{macro:"{{input}}",description:"\u5F53\u524D\u8F93\u5165\u6846\u5185\u5BB9"}};fa();gx={extractTagContent:xr,extractSimpleTag:wl,extractCurlyBraceTag:vl,extractComplexTag:Gu,extractHtmlFormatTag:qu,escapeRegex:Ts,shouldSkipContent:bl,isValidTagName:xl,scanTextForTags:Yu,generateTagSuggestions:Vu,getAllRuleTemplates:Ju,getRuleTemplate:Xu,createRuleTemplate:Qu,updateRuleTemplate:Zu,deleteRuleTemplate:ep,getTagRules:Js,setTagRules:tp,addTagRule:rp,updateTagRule:sp,deleteTagRule:op,getContentBlacklist:Xs,setContentBlacklist:np,saveRulesAsPreset:ap,getAllRulePresets:ip,loadRulePreset:lp,deleteRulePreset:cp,exportRulesConfig:dp,importRulesConfig:up,testRegex:pp,MESSAGE_MACROS:yp}});var vp={};ae(vp,{createDefaultToolDefinition:()=>Ss,default:()=>xx,deleteTool:()=>eo,deleteToolPreset:()=>bp,exportTools:()=>to,getAllTools:()=>nr,getCurrentToolPreset:()=>xp,getTool:()=>ar,getToolPresets:()=>ma,importTools:()=>ro,normalizeToolDefinitionToRuntimeConfig:()=>en,resetTools:()=>so,saveTool:()=>Zs,saveToolPreset:()=>hp,setCurrentToolPreset:()=>wp,setToolEnabled:()=>ha});function mx(t={}){return!t||typeof t!="object"?{}:Object.fromEntries(Object.entries(t).map(([e,r])=>[e,Ss({...r||{},id:e})]))}function Zo(t){return Array.isArray(t)?t.map(e=>String(e||"").trim()).filter(Boolean):[]}function _l(t,e){let r=parseInt(t,10);return Number.isFinite(r)&&r>0?r:e}function fp(t,e){let r=parseInt(t,10);return Number.isFinite(r)&&r>=0?r:e}function gp(t={}){return{settleMs:fp(t?.settleMs,1200),cooldownMs:fp(t?.cooldownMs,5e3)}}function mp(t={}){return{enabled:t?.enabled===!0,selected:Zo(t?.selected),presetId:typeof t?.presetId=="string"?t.presetId:""}}function hx(t=[]){let e=Array.isArray(t)?t.map(r=>({role:String(r?.role||"user").trim().toUpperCase(),content:String(r?.content||"").trim()})).filter(r=>r.content):[];return e.length===0?"":e.length===1?e[0].content:e.map(r=>`\u3010${r.role||"USER"}\u3011
${r.content}`).join(`

`)}function bx(t,e={}){let r=typeof e?.promptTemplate=="string"?e.promptTemplate.trim():"";if(r)return r;let s=hx(e?.config?.messages||[]);return s||`\u8BF7\u57FA\u4E8E\u6700\u8FD1\u7684 AI \u56DE\u590D\u4E3A\u5DE5\u5177\u201C${e?.name||t}\u201D\u751F\u6210\u7ED3\u6784\u5316\u8F93\u51FA\u3002`}function Ss(t={}){let e=new Date().toISOString(),r=t?.config||{};return{...Kt,...t,id:t?.id||Kt.id,icon:t?.icon||Kt.icon,order:Number.isFinite(t?.order)?t.order:Kt.order,promptTemplate:typeof t?.promptTemplate=="string"?t.promptTemplate:Kt.promptTemplate,extractTags:Zo(t?.extractTags),config:{execution:{...Kt.config.execution,...r.execution||{},timeout:_l(r?.execution?.timeout,Kt.config.execution.timeout),retries:Math.max(0,parseInt(r?.execution?.retries,10)||Kt.config.execution.retries)},api:{...Kt.config.api,...r.api||{}},messages:Array.isArray(r?.messages)?r.messages:[],context:{...Kt.config.context,...r.context||{},depth:_l(r?.context?.depth,Kt.config.context.depth),includeTags:Zo(r?.context?.includeTags),excludeTags:Zo(r?.context?.excludeTags)},automation:gp(r?.automation),worldbooks:mp(r?.worldbooks)},enabled:t?.enabled!==!1,metadata:{...Kt.metadata,...t?.metadata||{},createdAt:t?.metadata?.createdAt||e,updatedAt:t?.metadata?.updatedAt||e}}}function en(t,e={},r={}){let s=Ss({...e,id:t||e?.id||""}),o=Zo(s?.extractTags?.length?s.extractTags:s?.config?.context?.includeTags),n=String(e?.output?.apiPreset||s?.config?.api?.preset||"").trim(),a=bx(t,s),i=typeof e?.output?.mode=="string"&&e.output.mode.trim()?e.output.mode.trim():r.defaultOutputMode||"follow_ai";return{id:s.id||t,name:s.name||t,icon:s.icon||"fa-screwdriver-wrench",description:s.description||"",enabled:s.enabled!==!1,order:Number.isFinite(s.order)?s.order:100,bypass:{enabled:s?.config?.api?.useBypass===!0&&!!s?.config?.api?.bypassPreset,presetId:s?.config?.api?.bypassPreset||""},output:{mode:i,apiPreset:n,overwrite:!0,enabled:!0},automation:gp(s?.config?.automation),worldbooks:mp(s?.config?.worldbooks),extraction:{enabled:!0,maxMessages:_l(s?.config?.context?.depth,5),selectors:o,regexPresetId:typeof s?.config?.extraction?.regexPresetId=="string"?s.config.extraction.regexPresetId:"",writebackTag:typeof s?.config?.extraction?.writebackTag=="string"?s.config.extraction.writebackTag:""},promptTemplate:a,runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},apiPreset:n,extractTags:o,isCustom:!0,category:s.category||"utility",metadata:{...s.metadata||{}}}}function nr(){let t=Se.get(ze.TOOLS),e=mx(t);return t&&JSON.stringify(t)!==JSON.stringify(e)&&Se.set(ze.TOOLS,e),{...ga,...e}}function ar(t){return nr()[t]||null}function Zs(t,e){if(!t||!e)return!1;let r=Se.get(ze.TOOLS)||{},s=!r[t]&&!ga[t],o=Ss({...r[t]||{},...e,id:t,metadata:{...r[t]?.metadata||{},...e.metadata||{},createdAt:r[t]?.metadata?.createdAt||e?.metadata?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString()}});return r[t]=o,Se.set(ze.TOOLS,r),W.emit(s?U.TOOL_REGISTERED:U.TOOL_UPDATED,{toolId:t,tool:o}),!0}function eo(t){let e=Se.get(ze.TOOLS)||{};return!e[t]&&!ga[t]||ga[t]?!1:(delete e[t],Se.set(ze.TOOLS,e),W.emit(U.TOOL_UNREGISTERED,{toolId:t}),!0)}function ma(){return Se.get(ze.PRESETS)||{}}function hp(t,e){if(!t||!e)return!1;let r=ma(),s=!r[t];return r[t]={...e,name:t,updatedAt:new Date().toISOString()},Se.set(ze.PRESETS,r),W.emit(s?U.PRESET_CREATED:U.PRESET_UPDATED,{type:"tool",presetName:t,preset:r[t]}),!0}function bp(t){let e=ma();return e[t]?(delete e[t],Se.set(ze.PRESETS,e),W.emit(U.PRESET_DELETED,{type:"tool",presetName:t}),!0):!1}function xp(){return Se.get(ze.CURRENT_PRESET)||""}function wp(t){return Se.set(ze.CURRENT_PRESET,t||""),W.emit(U.PRESET_ACTIVATED,{type:"tool",presetName:t}),!0}function ha(t,e){let r=ar(t);if(!r)return!1;let s=Se.get(ze.TOOLS)||{};return s[t]=Ss({...r,id:t,enabled:e,metadata:{...r?.metadata||{},createdAt:r?.metadata?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString()}}),Se.set(ze.TOOLS,s),W.emit(e?U.TOOL_ENABLED:U.TOOL_DISABLED,{toolId:t,enabled:e}),!0}function to(){let t=Se.get(ze.TOOLS)||{},e=Se.get(ze.PRESETS)||{};return JSON.stringify({version:"1.0.0",exportedAt:new Date().toISOString(),tools:t,presets:e},null,2)}function ro(t,e=!1){try{let r=typeof e=="object"?!!e?.overwrite:!!e,s=JSON.parse(t);if(!s||typeof s!="object")return{success:!1,toolsImported:0,presetsImported:0,message:"\u65E0\u6548\u7684JSON\u683C\u5F0F"};let o=r?{}:Se.get(ze.TOOLS)||{},n=r?{}:Se.get(ze.PRESETS)||{},a=0,i=0;if(s.tools&&typeof s.tools=="object"){for(let[l,d]of Object.entries(s.tools))!d||typeof d!="object"||(o[l]=Ss({...d,id:l}),a+=1);Se.set(ze.TOOLS,o)}if(s.presets&&typeof s.presets=="object"){for(let[l,d]of Object.entries(s.presets))!d||typeof d!="object"||(n[l]={...d,name:l,updatedAt:new Date().toISOString()},i+=1);Se.set(ze.PRESETS,n)}return{success:!0,toolsImported:a,presetsImported:i,message:`\u6210\u529F\u5BFC\u5165 ${a} \u4E2A\u5DE5\u5177\u548C ${i} \u4E2A\u9884\u8BBE`}}catch(r){return log.error("\u5DE5\u5177\u5BFC\u5165\u5931\u8D25",{error:r}),{success:!1,toolsImported:0,presetsImported:0,message:`\u5BFC\u5165\u5931\u8D25: ${r.message}`}}}function so(){Se.remove(ze.TOOLS),Se.remove(ze.PRESETS),Se.remove(ze.CURRENT_PRESET)}var Kt,ga,ze,xx,tn=D(()=>{je();Ze();Kt={id:"",name:"",description:"",icon:"fa-screwdriver-wrench",order:100,category:"utility",promptTemplate:"",extractTags:[],config:{execution:{timeout:6e4,retries:3},api:{preset:"",useBypass:!1,bypassPreset:""},messages:[],context:{depth:3,includeTags:[],excludeTags:[]},automation:{settleMs:1200,cooldownMs:5e3},worldbooks:{enabled:!1,selected:[]}},enabled:!0,metadata:{createdAt:null,updatedAt:null,author:"",version:"1.0.0"}},ga={},ze={TOOLS:"tools",PRESETS:"tool_presets",CURRENT_PRESET:"current_tool_preset"};xx={getAllTools:nr,getTool:ar,saveTool:Zs,deleteTool:eo,setToolEnabled:ha,exportTools:to,importTools:ro,resetTools:so,getToolPresets:ma,saveToolPreset:hp,deleteToolPreset:bp,getCurrentToolPreset:xp,setCurrentToolPreset:wp,createDefaultToolDefinition:Ss,normalizeToolDefinitionToRuntimeConfig:en}});var Ml={};ae(Ml,{TOOL_CATEGORIES:()=>Tp,TOOL_REGISTRY:()=>oo,appendToolRuntimeHistory:()=>Dp,clearToolApiPreset:()=>Mp,default:()=>Cx,ensureToolRuntimeConfig:()=>no,getAllDefaultToolConfigs:()=>Op,getAllToolApiBindings:()=>Pp,getAllToolFullConfigs:()=>on,getEnabledTools:()=>$p,getToolApiPreset:()=>Il,getToolBaseConfig:()=>ba,getToolConfig:()=>sn,getToolFullConfig:()=>le,getToolList:()=>Cp,getToolSubTabs:()=>kp,getToolWindowState:()=>zp,hasTool:()=>kl,onPresetDeleted:()=>Np,patchToolRuntime:()=>Kr,registerTool:()=>Ep,resetToolConfig:()=>Lp,resetToolRegistry:()=>Ip,saveToolConfig:()=>Ie,saveToolWindowState:()=>Bp,setToolApiPreset:()=>Rp,setToolApiPresetConfig:()=>_x,setToolBypassConfig:()=>Ex,setToolOutputMode:()=>Sx,setToolPromptTemplate:()=>Ax,unregisterTool:()=>Ap,updateToolRuntime:()=>Rl});function _s(t={}){let e=Array.isArray(t?.recentWritebackHistory)?t.recentWritebackHistory.filter(Boolean):[];return{lastRunAt:Number.isFinite(t?.lastRunAt)?t.lastRunAt:0,lastStatus:typeof t?.lastStatus=="string"?t.lastStatus:"idle",lastError:typeof t?.lastError=="string"?t.lastError:"",lastDurationMs:Number.isFinite(t?.lastDurationMs)?t.lastDurationMs:0,successCount:Number.isFinite(t?.successCount)?t.successCount:0,errorCount:Number.isFinite(t?.errorCount)?t.errorCount:0,lastMessageKey:typeof t?.lastMessageKey=="string"?t.lastMessageKey:"",lastExecutionKey:typeof t?.lastExecutionKey=="string"?t.lastExecutionKey:"",lastExecutionPath:typeof t?.lastExecutionPath=="string"?t.lastExecutionPath:"",lastWritebackStatus:typeof t?.lastWritebackStatus=="string"?t.lastWritebackStatus:"",lastFailureStage:typeof t?.lastFailureStage=="string"?t.lastFailureStage:"",lastSlotBindingKey:typeof t?.lastSlotBindingKey=="string"?t.lastSlotBindingKey:"",lastSlotRevisionKey:typeof t?.lastSlotRevisionKey=="string"?t.lastSlotRevisionKey:"",lastSlotTransactionId:typeof t?.lastSlotTransactionId=="string"?t.lastSlotTransactionId:"",lastSourceMessageId:typeof t?.lastSourceMessageId=="string"?t.lastSourceMessageId:"",lastSourceSwipeId:typeof t?.lastSourceSwipeId=="string"?t.lastSourceSwipeId:"",lastContentCommitted:t?.lastContentCommitted===!0,lastHostCommitApplied:t?.lastHostCommitApplied===!0,lastRefreshRequested:t?.lastRefreshRequested===!0,lastRefreshConfirmed:t?.lastRefreshConfirmed===!0,lastPreferredCommitMethod:typeof t?.lastPreferredCommitMethod=="string"?t.lastPreferredCommitMethod:"",lastAppliedCommitMethod:typeof t?.lastAppliedCommitMethod=="string"?t.lastAppliedCommitMethod:"",lastRefreshMethodCount:Number.isFinite(t?.lastRefreshMethodCount)?t.lastRefreshMethodCount:0,lastRefreshMethods:Array.isArray(t?.lastRefreshMethods)?t.lastRefreshMethods.filter(Boolean):[],lastRefreshConfirmChecks:Number.isFinite(t?.lastRefreshConfirmChecks)?t.lastRefreshConfirmChecks:0,lastRefreshConfirmedBy:typeof t?.lastRefreshConfirmedBy=="string"?t.lastRefreshConfirmedBy:"",lastTraceId:typeof t?.lastTraceId=="string"?t.lastTraceId:"",lastAutoRunAt:Number.isFinite(t?.lastAutoRunAt)?t.lastAutoRunAt:0,lastAutoStatus:typeof t?.lastAutoStatus=="string"?t.lastAutoStatus:"idle",lastAutoMessageId:typeof t?.lastAutoMessageId=="string"?t.lastAutoMessageId:"",lastAutoSwipeId:typeof t?.lastAutoSwipeId=="string"?t.lastAutoSwipeId:"",lastAutoRevisionKey:typeof t?.lastAutoRevisionKey=="string"?t.lastAutoRevisionKey:"",lastAutoWritebackStatus:typeof t?.lastAutoWritebackStatus=="string"?t.lastAutoWritebackStatus:"",lastAutoRefreshConfirmed:t?.lastAutoRefreshConfirmed===!0,lastAutoSkipReason:typeof t?.lastAutoSkipReason=="string"?t.lastAutoSkipReason:"",recentWritebackHistory:e}}function wx(t,e=10){let r=Number.isFinite(e)?Math.max(1,Math.min(50,Math.floor(e))):10;return Array.isArray(t)?t.length<=r?t:t.slice(t.length-r):[]}function Sp(){let t=nr()||{};return Object.entries(t).filter(([e])=>!rn[e]).map(([e,r])=>[e,r||{}])}function El(t={}){return t?.toolKind==="script"?"script":t?.toolKind==="ai"?"ai":t?.output?.mode==="local_transform"||t?.processor?.type?"script":"ai"}function _p(){let t=Array.isArray(oo.tools?.subTabs)?oo.tools.subTabs.map((r,s)=>({...r,order:Number.isFinite(r?.order)?r.order:s,toolKind:El(r),toolGroupLabel:El(r)==="script"?"\u811A\u672C\u5DE5\u5177":"AI \u5DE5\u5177"})):[],e=Sp().map(([r,s],o)=>{let n=en(r,s),a=El(n);return{id:r,name:n.name||r,icon:n.icon||"fa-screwdriver-wrench",component:"GenericToolConfigPanel",order:Number.isFinite(n.order)?n.order:100+o,isCustom:!0,description:n.description||"",toolKind:a,toolGroupLabel:a==="script"?"\u811A\u672C\u5DE5\u5177":"AI \u5DE5\u5177"}});return[...t,...e].sort((r,s)=>(r.order??0)-(s.order??0))}function vx(t,e={}){let r=en(t,e,{defaultOutputMode:"follow_ai"});return{...r,runtime:_s(r.runtime)}}function Cl(t){let e=rn[t];if(e)return{...e,output:{...e.output||{}},bypass:{...e.bypass||{}},worldbooks:{...e.worldbooks||{},selected:Array.isArray(e?.worldbooks?.selected)?[...e.worldbooks.selected]:[]},extraction:{...e.extraction||{}},processor:{...e.processor||{},options:{...e?.processor?.options||{}}},runtime:_s(e.runtime),extractTags:Array.isArray(e.extractTags)?[...e.extractTags]:[]};let s=(nr()||{})[t]||null;return s?vx(t,s):sn(t)}function ba(t){let e=Cl(t);return e?{...e,output:{...e.output||{}},automation:{...e.automation||{}},bypass:{...e.bypass||{}},worldbooks:{...e.worldbooks||{},selected:Array.isArray(e?.worldbooks?.selected)?[...e.worldbooks.selected]:[]},extraction:{...e.extraction||{},selectors:Array.isArray(e?.extraction?.selectors)?[...e.extraction.selectors]:[]},processor:{...e.processor||{},options:{...e?.processor?.options||{}}},runtime:{...e.runtime||{}},extractTags:Array.isArray(e.extractTags)?[...e.extractTags]:[]}:null}function Tx(t,e={},r=""){if(!t)return null;let s={...t,...e,id:t.id||e.id};s.output={...t.output||{},...e.output||{}},s.automation={settleMs:Number.isFinite(e?.automation?.settleMs)?e.automation.settleMs:Number.isFinite(t?.automation?.settleMs)?t.automation.settleMs:1200,cooldownMs:Number.isFinite(e?.automation?.cooldownMs)?e.automation.cooldownMs:Number.isFinite(t?.automation?.cooldownMs)?t.automation.cooldownMs:5e3},s.bypass={...t.bypass||{},...e.bypass||{}},s.worldbooks={...t.worldbooks||{},...e.worldbooks||{},selected:Array.isArray(e?.worldbooks?.selected)?[...e.worldbooks.selected]:Array.isArray(t?.worldbooks?.selected)?[...t.worldbooks.selected]:[]},s.runtime=_s({...t.runtime||{},...e.runtime||{}}),s.extraction={...t.extraction||{},...e.extraction||{}},s.processor={...t.processor||{},...e.processor||{},options:{...t?.processor?.options||{},...e?.processor?.options||{}}};let o=e?.output?.apiPreset||e?.apiPreset||s.output?.apiPreset||s.apiPreset||r||"";return s.output={...s.output||{},apiPreset:o},s.apiPreset=o,t.isCustom?s.enabled=t.enabled!==!1:typeof e.enabled=="boolean"?s.enabled=e.enabled:s.enabled=t.enabled!==!1,s}function Ep(t,e){if(!t||typeof t!="string")return rt.error("\u5DE5\u5177ID\u65E0\u6548"),!1;if(!e||typeof e!="object")return rt.error("\u5DE5\u5177\u914D\u7F6E\u65E0\u6548"),!1;let r=["name","icon","component"];for(let s of r)if(!e[s])return rt.error(` \u5DE5\u5177\u7F3A\u5C11\u5FC5\u9700\u5B57\u6BB5: ${s}`),!1;return ir[t]={id:t,...e,order:e.order??Object.keys(ir).length},rt.log(` \u5DE5\u5177\u5DF2\u6CE8\u518C: ${t}`),!0}function Ap(t){return ir[t]?(delete ir[t],rt.log(` \u5DE5\u5177\u5DF2\u6CE8\u9500: ${t}`),!0):(rt.warn(` \u5DE5\u5177\u4E0D\u5B58\u5728: ${t}`),!1)}function Cp(t=!0){let e=Object.values(ir).map(r=>r.id==="tools"?{...r,subTabs:_p()}:r);return t?e.sort((r,s)=>(r.order??0)-(s.order??0)):e}function sn(t){return t==="tools"&&ir[t]?{...ir[t],subTabs:_p()}:ir[t]||null}function kl(t){return!!ir[t]}function kp(t){let e=sn(t);return!e||!e.hasSubTabs?[]:e.subTabs||[]}function Ip(){ir={...oo},rt.log("\u5DE5\u5177\u6CE8\u518C\u8868\u5DF2\u91CD\u7F6E")}function Rp(t,e){if(!kl(t))return rt.warn(` \u5DE5\u5177\u4E0D\u5B58\u5728: ${t}`),!1;let r=$.get(Ut)||{};return r[t]=e||"",$.set(Ut,r),rt.log(` \u5DE5\u5177 "${t}" \u7ED1\u5B9A\u5230\u9884\u8BBE "${e||"\u5F53\u524D\u914D\u7F6E"}"`),!0}function Il(t){return($.get(Ut)||{})[t]||""}function Mp(t){let e=$.get(Ut)||{};delete e[t],$.set(Ut,e),rt.log(` \u5DE5\u5177 "${t}" \u7684API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u6E05\u9664`)}function Pp(){return $.get(Ut)||{}}function Np(t){let e=$.get(Ut)||{},r=!1;for(let s in e)e[s]===t&&(e[s]="",r=!0,rt.log(` \u5DE5\u5177 "${s}" \u7684API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u6E05\u9664\uFF08\u9884\u8BBE\u88AB\u5220\u9664\uFF09`));r&&$.set(Ut,e)}function le(t){let e=Cl(t);if(!e)return sn(t);let s=($.get(zr)||{})[t]||{},o=Il(t),n=Tx({...e,id:t},s,o);return rt.debug(`[PRESET] getToolFullConfig ${t}`,{base_extraction:JSON.parse(JSON.stringify(e.extraction||{})),base_worldbooks:JSON.parse(JSON.stringify(e.worldbooks||{})),user_extraction:JSON.parse(JSON.stringify(s.extraction||{})),user_worldbooks:JSON.parse(JSON.stringify(s.worldbooks||{})),merged_extraction:JSON.parse(JSON.stringify(n.extraction||{})),merged_worldbooks:JSON.parse(JSON.stringify(n.worldbooks||{}))}),n}function no(t){if(!t)return!1;let e=Cl(t);if(!e)return!1;let r=$.get(zr)||{};if(r[t])return!0;let s={promptTemplate:e.promptTemplate||"",enabled:e.enabled!==!1,extractTags:Array.isArray(e.extractTags)?[...e.extractTags]:[],apiPreset:e.apiPreset||"",output:{...e.output||{}},automation:{...e.automation||{}},bypass:{...e.bypass||{}},worldbooks:{...e.worldbooks||{},selected:Array.isArray(e?.worldbooks?.selected)?[...e.worldbooks.selected]:[]},extraction:{...e.extraction||{},selectors:Array.isArray(e?.extraction?.selectors)?[...e.extraction.selectors]:[]},processor:{...e.processor||{},options:{...e?.processor?.options||{}}},runtime:{...e.runtime||{}}};r[t]=s,$.set(zr,r);let o=$.get(Ut)||{};return o[t]=s.output?.apiPreset||s.apiPreset||"",$.set(Ut,o),W.emit(U.TOOL_UPDATED,{toolId:t,config:s}),!0}function Ie(t,e,r={}){if(!t||!le(t))return rt.warn("\u5DE5\u5177\u4E0D\u5B58\u5728:",t),!1;let{emitEvent:s=!0}=r,o=$.get(zr)||{},n=$.get(Ut)||{},a=e?.output?.apiPreset??e?.apiPreset??"",i=["promptTemplate","enabled","extractTags","apiPreset","output","automation","bypass","worldbooks","extraction","processor","runtime"];return o[t]={},i.forEach(l=>{if(e[l]!==void 0){if(l==="output"&&e.output){o[t][l]={...e.output,apiPreset:a};return}if(l==="apiPreset"){o[t][l]=a;return}o[t][l]=e[l]}}),o[t].apiPreset===void 0&&(o[t].apiPreset=a),!o[t].output&&e.output!==void 0&&(o[t].output={...e.output||{},apiPreset:a}),$.set(zr,o),n[t]=a,$.set(Ut,n),rt.debug(`[PRESET] saveToolConfig ${t}`,{input_extraction:JSON.parse(JSON.stringify(e.extraction||{})),input_worldbooks:JSON.parse(JSON.stringify(e.worldbooks||{})),saved_extraction:JSON.parse(JSON.stringify(o[t].extraction||{})),saved_worldbooks:JSON.parse(JSON.stringify(o[t].worldbooks||{})),verify_storage:JSON.parse(JSON.stringify(($.get(zr)||{})[t]?.extraction||{}))}),s&&W.emit(U.TOOL_UPDATED,{toolId:t,config:o[t]}),rt.log(` \u5DE5\u5177\u914D\u7F6E\u5DF2\u4FDD\u5B58: ${t}`),!0}function Sx(t,e){let r=le(t);return r?Ie(t,{...r,output:{...r.output,mode:e}}):!1}function _x(t,e){let r=le(t);return r?Ie(t,{...r,apiPreset:e,output:{...r.output,apiPreset:e}}):!1}function Ex(t,e){let r=le(t);return r?Ie(t,{...r,bypass:{...r.bypass,...e}}):!1}function Ax(t,e){let r=le(t);return r?Ie(t,{...r,promptTemplate:e}):!1}function Kr(t,e,r={}){let s=le(t);if(!s)return!1;let{touchLastRunAt:o=!1,emitEvent:n=!1,emitRuntimeEvent:a=!0}=r,i=_s({...s.runtime||{},...e||{}});o&&(i.lastRunAt=Date.now());let l=Ie(t,{...s,runtime:i},{emitEvent:n});return l&&a&&W.emit(U.TOOL_RUNTIME_UPDATED,{toolId:t,runtime:i,previousRuntime:_s(s.runtime||{})}),l}function Dp(t,e,r={},s={}){let o=le(t);if(!o)return!1;let{limit:n=10,emitEvent:a=!1,emitRuntimeEvent:i=!0}=s,l=_s(o.runtime||{}),d=_s(o.runtime||{}),c="recentWritebackHistory",u={id:r?.id||`hist_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,at:r?.at||Date.now(),...r};l[c]=wx([...Array.isArray(l[c])?l[c]:[],u],n),u?.traceId&&(l.lastTraceId=u.traceId);let p=Ie(t,{...o,runtime:l},{emitEvent:a});return p&&i&&W.emit(U.TOOL_RUNTIME_UPDATED,{toolId:t,runtime:l,previousRuntime:d,historyType:e,historyEntry:u}),p}function Rl(t,e,r={}){let{touchLastRunAt:s=!0,emitEvent:o=!1,emitRuntimeEvent:n=!0}=r;return Kr(t,e,{touchLastRunAt:s,emitEvent:o,emitRuntimeEvent:n})}function Lp(t){if(!t||!rn[t])return rt.warn("\u5DE5\u5177\u4E0D\u5B58\u5728:",t),!1;let e=$.get(zr)||{};return delete e[t],$.set(zr,e),W.emit(U.TOOL_UPDATED,{toolId:t,config:null}),rt.log(` \u5DE5\u5177\u914D\u7F6E\u5DF2\u91CD\u7F6E: ${t}`),!0}function Op(){return{...rn}}function on(){let t=new Set([...Object.keys(rn),...Sp().map(([e])=>e)]);return Array.from(t).map(e=>le(e)).filter(Boolean)}function $p(){return on().filter(t=>t&&t.enabled)}function Bp(t,e){let r=$.get(Al)||{};r[t]={...e,updatedAt:Date.now()},$.set(Al,r)}function zp(t){return($.get(Al)||{})[t]||null}var rt,zr,Ut,Al,rn,oo,Tp,ir,Cx,lr=D(()=>{je();Ze();H();tn();rt=E.createScope("ToolRegistry"),zr="tool_configs",Ut="tool_api_bindings",Al="tool_window_states";rn={summaryTool:{id:"summaryTool",name:"\u6458\u8981\u5DE5\u5177",icon:"fa-file-lines",description:"\u751F\u6210\u5267\u60C5\u6458\u8981\u5757",enabled:!0,order:3,bypass:{enabled:!1,presetId:""},output:{mode:"follow_ai",apiPreset:"",overwrite:!0,enabled:!0},automation:{settleMs:1200,cooldownMs:5e3},worldbooks:{enabled:!1,selected:[]},extraction:{enabled:!0,maxMessages:5,regexPresetId:"builtin_regex_summary"},promptTemplate:`\u8BF7\u6839\u636E\u4EE5\u4E0BAI\u56DE\u590D\u751F\u6210\u6458\u8981\u5757\uFF1A

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
</youyou>`,runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},apiPreset:"",extractTags:[]},escapeTransformTool:{id:"escapeTransformTool",name:"\u8F6C\u4E49\u5904\u7406",icon:"fa-quote-left",description:"\u5BF9\u63D0\u53D6\u5185\u5BB9\u6267\u884C\u672C\u5730\u8F6C\u4E49\u6216\u53BB\u8F6C\u4E49",enabled:!0,order:6,output:{mode:"local_transform",apiPreset:"",overwrite:!0,enabled:!0,autoTrigger:!0},extraction:{enabled:!0,maxMessages:5,selectors:[]},processor:{type:"escape_transform",direction:"escape",options:{doubleQuote:!0,singleQuote:!1,newline:!1}},runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},extractTags:[]},punctuationTransformTool:{id:"punctuationTransformTool",name:"\u4E2D\u6587\u6807\u70B9\u66FF\u6362",icon:"fa-language",description:"\u5C06\u82F1\u6587\u6807\u70B9\u6309\u52FE\u9009\u9879\u66FF\u6362\u4E3A\u4E2D\u6587\u6807\u70B9",enabled:!0,order:7,output:{mode:"local_transform",apiPreset:"",overwrite:!0,enabled:!0,autoTrigger:!0},extraction:{enabled:!0,maxMessages:5,selectors:[]},processor:{type:"punctuation_transform",direction:"en_to_zh",options:{comma:!0,period:!0,exclamation:!0,question:!0,semicolon:!1,colon:!1,leftParen:!1,rightParen:!1}},runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},extractTags:[]}},oo={presetManagement:{id:"presetManagement",name:"\u9884\u8BBE\u7BA1\u7406",icon:"fa-bookmark",hasSubTabs:!0,description:"\u7EDF\u4E00\u7BA1\u7406 API / \u6B63\u5219 / \u4E16\u754C\u4E66 / \u8868\u683C\u6A21\u677F\u9884\u8BBE",order:0,subTabs:[{id:"apiPresets",name:"API \u9884\u8BBE",icon:"fa-database",component:"ApiPresetPanel",presetKind:"api"},{id:"regexPresets",name:"\u6B63\u5219\u63D0\u53D6",icon:"fa-filter",component:"RegexExtractPanel",presetKind:"regex"},{id:"worldbookPresets",name:"\u4E16\u754C\u4E66",icon:"fa-book-atlas",component:"WorldbookPresetPanel",presetKind:"worldbook"},{id:"tableTemplates",name:"\u8868\u683C\u6A21\u677F",icon:"fa-table-list",component:"TableTemplatePanel",presetKind:"table"}]},tools:{id:"tools",name:"\u5DE5\u5177",icon:"fa-tools",hasSubTabs:!0,description:"\u5DE5\u5177\u96C6\u5408",order:4,subTabs:[{id:"summaryTool",name:"\u6458\u8981\u5DE5\u5177",icon:"fa-file-lines",component:"SummaryToolPanel",toolKind:"ai"},{id:"statusBlock",name:"\u4E3B\u89D2\u72B6\u6001\u680F",icon:"fa-user-check",component:"StatusBlockPanel",toolKind:"ai"},{id:"youyouReview",name:"\u5C0F\u5E7D\u70B9\u8BC4",icon:"fa-comment-dots",component:"YouyouReviewPanel",toolKind:"ai"},{id:"escapeTransformTool",name:"\u8F6C\u4E49\u5904\u7406",icon:"fa-quote-left",component:"EscapeTransformToolPanel",toolKind:"script"},{id:"punctuationTransformTool",name:"\u4E2D\u6587\u6807\u70B9\u66FF\u6362",icon:"fa-language",component:"PunctuationTransformToolPanel",toolKind:"script"}]},tableWorkbench:{id:"tableWorkbench",name:"\u586B\u8868\u5DE5\u4F5C\u53F0",icon:"fa-table-cells",hasSubTabs:!1,description:"\u7ED3\u6784\u5316\u586B\u8868\u4E0E\u72B6\u6001\u9884\u89C8\u5DE5\u4F5C\u53F0",component:"TableWorkbenchPanel",order:5},bypass:{id:"bypass",name:"Ai\u6307\u4EE4\u9884\u8BBE",icon:"fa-shield-halved",hasSubTabs:!1,description:"\u7BA1\u7406 Ai \u6307\u4EE4\u9884\u8BBE",component:"BypassPanel",order:6},settings:{id:"settings",name:"\u8BBE\u7F6E",icon:"fa-cog",hasSubTabs:!1,description:"\u5168\u5C40\u8BBE\u7F6E",component:"SettingsPanel",order:7},logger:{id:"logger",name:"\u65E5\u5FD7",icon:"fa-terminal",hasSubTabs:!1,description:"\u67E5\u770B\u63D2\u4EF6\u8FD0\u884C\u65E5\u5FD7\uFF0C\u652F\u6301\u8FC7\u6EE4\u4E0E\u5BFC\u51FA",component:"LoggerPanel",order:8}},Tp={api:{name:"API\u5DE5\u5177",icon:"fa-plug",order:0},prompt:{name:"\u63D0\u793A\u8BCD\u5DE5\u5177",icon:"fa-file-alt",order:1},utility:{name:"\u5B9E\u7528\u5DE5\u5177",icon:"fa-wrench",order:2}},ir={...oo};Cx={TOOL_REGISTRY:oo,TOOL_CATEGORIES:Tp,registerTool:Ep,unregisterTool:Ap,getToolList:Cp,getToolConfig:sn,hasTool:kl,getToolSubTabs:kp,resetToolRegistry:Ip,setToolApiPreset:Rp,getToolApiPreset:Il,clearToolApiPreset:Mp,getAllToolApiBindings:Pp,onPresetDeleted:Np,saveToolWindowState:Bp,getToolWindowState:zp,getToolBaseConfig:ba,ensureToolRuntimeConfig:no,getToolFullConfig:le,patchToolRuntime:Kr,appendToolRuntimeHistory:Dp,saveToolConfig:Ie,resetToolConfig:Lp,getAllDefaultToolConfigs:Op,getAllToolFullConfigs:on,getEnabledTools:$p}});function va(){return`rgx_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`}function jp(){return`r_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,6)}`}function Dl(t={}){let e=Object.values(Vt).includes(t.type)?t.type:Vt.INCLUDE;return{id:String(t.id||jp()),name:String(t.name||"").trim(),description:String(t.description||""),type:e,value:String(t.value||""),enabled:t.enabled!==!1}}function cr(t={}){return{id:String(t.id||va()),name:String(t.name||"").trim()||"\u672A\u547D\u540D\u9884\u8BBE",description:String(t.description||""),rules:Array.isArray(t.rules)?t.rules.map(Dl):[],blacklist:Array.isArray(t.blacklist)?t.blacklist.map(e=>String(e||"").trim()).filter(Boolean):[],createdAt:Number.isFinite(t.createdAt)?t.createdAt:Date.now(),updatedAt:Number.isFinite(t.updatedAt)?t.updatedAt:Date.now()}}function wr(){let t=ke.get(Nl);return!t||typeof t!="object"?{}:t}function nn(t){ke.set(Nl,t)}function Es(t){return typeof t=="string"&&t.startsWith(kx)}function Wp(t){return Es(t)&&xa.find(e=>e.id===t)||null}function Ll(t){if(!Array.isArray(t)){xa=[];return}xa=t.map(e=>cr({...e,id:String(e?.id||"")})).filter(e=>Es(e.id))}function io(){if(Fp)return;Fp=!0;let t=$.get(Kp)||{};if(t[Up]===!0)return;let e=wr(),r=Object.keys(e).length>0,s=0,o={...e},n=t.tagRulePresets||{};for(let a of Object.values(n)){let i=cr({id:va(),name:a.name||"\u5DF2\u8FC1\u79FB\u9884\u8BBE",description:a.description||"",rules:a.rules||[],blacklist:a.blacklist||[],createdAt:typeof a.createdAt=="string"&&Date.parse(a.createdAt)||Date.now(),updatedAt:Date.now()});o[i.id]=i,s+=1}if(!r&&s===0){let a=Array.isArray(t.tagRules)?t.tagRules:[],i=Array.isArray(t.contentBlacklist)?t.contentBlacklist:[];if(a.length||i.length){let l=cr({name:"\u9ED8\u8BA4\u89C4\u5219\u96C6\uFF08\u8FC1\u79FB\uFF09",description:"\u4ECE\u8001\u7248\u672C\u7684\u5F53\u524D\u89C4\u5219\u8FC1\u79FB\u800C\u6765",rules:a,blacklist:i});o[l.id]=l,ke.set(ao,l.id),s+=1}}s>0&&(nn(o),Ur.info(`\u5DF2\u4ECE\u8001\u6570\u636E\u8FC1\u79FB ${s} \u4E2A\u6B63\u5219\u9884\u8BBE`)),$.set(Kp,{...t,[Up]:!0})}function Ix(){io();let t=wr(),e=new Set,r=[];for(let o of xa){let n=t[o.id];n?(r.push(cr(n)),e.add(o.id)):r.push(o)}let s=Object.values(t).map(cr).filter(o=>!e.has(o.id)).sort((o,n)=>n.updatedAt-o.updatedAt);return r.push(...s),r}function vr(t){if(!t)return null;io();let e=wr();return e[t]?cr(e[t]):Es(t)?Wp(t):null}function Ta(){io();let t=ke.get(ao);return typeof t=="string"&&t?t:""}function Hp(){let t=Ta();return t?vr(t):null}function Rx(t){if(t&&Es(t))return ke.set(ao,t),wa(),W.emit(U.PRESET_ACTIVATED,{kind:"regex",id:t}),!0;let e=wr();return t&&!e[t]?(Ur.warn(`setCurrentPresetId \u627E\u4E0D\u5230\u9884\u8BBE: ${t}`),!1):(ke.set(ao,t||""),wa(),W.emit(U.PRESET_ACTIVATED,{kind:"regex",id:t}),!0)}function Sa(t={}){io();let e=cr({...t,id:va(),createdAt:Date.now(),updatedAt:Date.now()}),r=wr();return r[e.id]=e,nn(r),W.emit(U.PRESET_CREATED,{kind:"regex",id:e.id}),Ur.info(`\u521B\u5EFA\u9884\u8BBE: ${e.id} (${e.name})`),e}function As(t,e={}){if(!t)return null;let r=wr(),s=r[t];if(!s&&Es(t)&&(s=Wp(t)),!s)return null;let o=cr({...s,...e,id:t,createdAt:s.createdAt,updatedAt:Date.now()});return r[t]=o,nn(r),Ta()===t&&Pl(o),W.emit(U.PRESET_UPDATED,{kind:"regex",id:t}),o}function Mx(t){if(!t)return!1;if(Es(t))return Ur.warn(`\u62D2\u7EDD\u5220\u9664\u5185\u7F6E\u9884\u8BBE: ${t}`),!1;let e=wr();return e[t]?(delete e[t],nn(e),Ta()===t&&(ke.set(ao,""),wa()),W.emit(U.PRESET_DELETED,{kind:"regex",id:t}),Ur.info(`\u5220\u9664\u9884\u8BBE: ${t}`),!0):!1}function Px(t,{nameSuffix:e=" \u526F\u672C"}={}){let r=vr(t);return r?Sa({...r,id:void 0,name:`${r.name}${e}`}):null}function Nx(t,e){return Es(t)?(Ur.warn(`\u62D2\u7EDD\u91CD\u547D\u540D\u5185\u7F6E\u9884\u8BBE: ${t}`),null):As(t,{name:String(e||"").trim()||"\u672A\u547D\u540D\u9884\u8BBE"})}function Dx(t,e={}){let r=vr(t);if(!r)return null;let s=Dl({...e,id:jp()}),o=[...r.rules,s];return As(t,{rules:o})}function Lx(t,e,r={}){let s=vr(t);if(!s)return null;let o=s.rules.map(n=>n.id===e?Dl({...n,...r,id:n.id}):n);return As(t,{rules:o})}function Ox(t,e){let r=vr(t);if(!r)return null;let s=r.rules.filter(o=>o.id!==e);return As(t,{rules:s})}function $x(t,e,r){let s=vr(t);if(!s)return null;let o=s.rules.findIndex(i=>i.id===e);if(o<0)return null;let n=r==="up"?o-1:o+1;if(n<0||n>=s.rules.length)return null;let a=[...s.rules];return[a[o],a[n]]=[a[n],a[o]],As(t,{rules:a})}function Bx(t,e){let r=Array.isArray(e)?e.map(s=>String(s||"").trim()).filter(Boolean):[];return As(t,{blacklist:Array.from(new Set(r))})}function zx(){return io(),{version:1,exportedAt:Date.now(),presets:Object.values(wr()).map(cr)}}function Kx(t){if(io(),!t||typeof t!="object")return{added:0};let e=Array.isArray(t.presets)?t.presets:[],r=wr(),s=0;for(let o of e){let n=cr({...o,id:va(),createdAt:Date.now(),updatedAt:Date.now()});r[n.id]=n,s+=1}return s>0&&(nn(r),W.emit(U.PRESET_IMPORTED,{kind:"regex",count:s})),{added:s}}function Ux(){ke.set(Nl,{}),ke.set(ao,""),wa(),Ur.info("\u5DF2\u6E05\u7A7A\u6240\u6709\u6B63\u5219\u9884\u8BBE")}async function Pl(t){if(t)try{let e=await Promise.resolve().then(()=>(Qs(),Sl));typeof e.setCurrentRules=="function"&&e.setCurrentRules(JSON.parse(JSON.stringify(t.rules||[]))),typeof e.setContentBlacklist=="function"&&e.setContentBlacklist(JSON.parse(JSON.stringify(t.blacklist||[])))}catch(e){Ur.warn("\u540C\u6B65\u5230 regex-extractor \u5931\u8D25",{error:e})}}function wa(){let t=Hp();return Pl(t||{rules:[],blacklist:[]})}async function Fx(t){if(!t)return[];try{let e=await Promise.resolve().then(()=>(lr(),Ml));return(typeof e.getToolList=="function"?e.getToolList(!1):[]).filter(s=>(typeof e.getToolFullConfig=="function"?e.getToolFullConfig(s.id):null)?.extraction?.regexPresetId===t).map(s=>s.id)}catch{return[]}}var Ur,Nl,ao,Kp,Up,Vt,kx,xa,Fp,Ee,Fr=D(()=>{je();Ze();H();Ur=E.createScope("RegexPresetStore"),Nl="regex_presets",ao="regex_current_preset",Kp="settings",Up="regex_presets_migrated",Vt=Object.freeze({INCLUDE:"include",EXCLUDE:"exclude",REGEX_INCLUDE:"regex_include",REGEX_EXCLUDE:"regex_exclude"});kx="builtin_regex_",xa=[];Fp=!1;Ee={listPresets:Ix,getPreset:vr,getCurrentPresetId:Ta,getCurrentPreset:Hp,setCurrentPresetId:Rx,createPreset:Sa,updatePreset:As,deletePreset:Mx,duplicatePreset:Px,renamePreset:Nx,addRule:Dx,updateRule:Lx,deleteRule:Ox,moveRule:$x,setBlacklist:Bx,exportAll:zx,importPresets:Kx,resetAll:Ux,findLinkedTools:Fx,RULE_TYPES:Vt}});var Vp={};ae(Vp,{RegexExtractPanel:()=>Yp,default:()=>Vx});function Wx(t,e,r,s,o,n){let a=f("div",{style:{display:"grid",gridTemplateColumns:"auto auto minmax(140px, 1fr) 200px minmax(120px, 2fr) auto",gap:"10px",alignItems:"center",padding:"10px 0",borderTop:r===0?"none":"1px solid var(--yyt-border)",opacity:e.enabled===!1?"0.55":"1"},attrs:{draggable:n?null:"true","data-rule-id":e.id}}),i=f("div",{style:{cursor:n?"default":"grab",padding:"4px",color:"var(--yyt-text-muted)",fontSize:"14px",userSelect:"none"},text:"\u22EE\u22EE",title:n?"\u5185\u7F6E\u9884\u8BBE\u4E0D\u53EF\u91CD\u6392":"\u62D6\u52A8\u6392\u5E8F"});a.appendChild(i);let l=f("div",{style:{display:"flex",flexDirection:"column",gap:"2px"}}),d=X({label:"\u25B2",size:"small",variant:"ghost",title:"\u4E0A\u79FB",disabled:n||r===0,style:{padding:"0 6px",minHeight:"auto",fontSize:"9px"},onClick:()=>{Ee.moveRule(t.id,e.id,"up"),o()}}),c=X({label:"\u25BC",size:"small",variant:"ghost",title:"\u4E0B\u79FB",disabled:n||r===s-1,style:{padding:"0 6px",minHeight:"auto",fontSize:"9px"},onClick:()=>{Ee.moveRule(t.id,e.id,"down"),o()}});l.appendChild(d.el),l.appendChild(c.el),a.appendChild(l);let u=f("div",{style:{display:"flex",flexDirection:"column",gap:"2px",minWidth:"0"}}),p=he({value:e.name||"",placeholder:"\u89C4\u5219\u540D\uFF08\u53EF\u9009\uFF09",disabled:n,style:{fontSize:"12px",padding:"6px 10px"},onChange:S=>Ee.updateRule(t.id,e.id,{name:S})});u.appendChild(p.el),e.description&&u.appendChild(f("div",{text:e.description,style:{fontSize:"10px",color:"var(--yyt-text-muted)"}})),a.appendChild(u);let y=Re({value:e.type,disabled:n,options:jx,style:{fontSize:"11px",padding:"6px 10px"},onChange:S=>{Ee.updateRule(t.id,e.id,{type:S}),o()}});a.appendChild(y.el);let m=e.type===Vt.REGEX_INCLUDE||e.type===Vt.REGEX_EXCLUDE,g=he({value:e.value||"",placeholder:m?"\u6B63\u5219\u8868\u8FBE\u5F0F...":"\u6807\u7B7E\u540D\uFF08\u5982 content\uFF09",disabled:n,style:{fontSize:"12px",padding:"6px 10px",fontFamily:"ui-monospace, monospace"},onChange:S=>Ee.updateRule(t.id,e.id,{value:S})});a.appendChild(g.el);let h=f("div",{style:{display:"flex",gap:"6px",alignItems:"center"}}),x=wt({checked:e.enabled!==!1,disabled:n,style:{padding:"0",border:"none",background:"transparent"},onChange:S=>{Ee.updateRule(t.id,e.id,{enabled:S}),o()}});return h.appendChild(x.el),n||h.appendChild(X({label:"\xD7",size:"small",variant:"ghost",title:"\u5220\u9664\u89C4\u5219",onClick:()=>{Ee.deleteRule(t.id,e.id),o()}}).el),a.appendChild(h),a}function Hx(t,e,r){let s=null;t.addEventListener("dragstart",o=>{let n=o.target;if(!(n instanceof HTMLElement))return;let a=n.closest("[data-rule-id]");if(a){s=a.getAttribute("data-rule-id"),a.style.opacity="0.4";try{o.dataTransfer.effectAllowed="move",o.dataTransfer.setData("text/plain",s)}catch{}}}),t.addEventListener("dragend",o=>{let n=o.target;n instanceof HTMLElement&&(n.style.opacity=""),s=null}),t.addEventListener("dragover",o=>{if(s){o.preventDefault();try{o.dataTransfer.dropEffect="move"}catch{}}}),t.addEventListener("drop",o=>{if(o.preventDefault(),!s)return;let n=o.target instanceof HTMLElement?o.target.closest("[data-rule-id]"):null;if(!n)return;let a=n.getAttribute("data-rule-id");if(!a||a===s)return;let i=Ee.getPreset(e.id);if(!i)return;let l=i.rules.findIndex(p=>p.id===s),d=i.rules.findIndex(p=>p.id===a);if(l<0||d<0)return;let c=[...i.rules],[u]=c.splice(l,1);c.splice(d,0,u),Ee.updatePreset(e.id,{rules:c}),r()})}function Gx(t,{onChange:e,readonly:r,refresh:s}){let o=f("div",{style:{display:"flex",flexDirection:"column",gap:"14px"}});G(o,kt({label:"\u63CF\u8FF0",control:he({value:t.description,placeholder:"\u53EF\u9009 \u2014 \u5907\u6CE8\u7528\u9014",disabled:r,onChange:i=>e({description:i})})}));let n=f("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"6px"}},f("div",{text:"\u63D0\u53D6\u89C4\u5219\uFF08\u6309\u987A\u5E8F\u5E94\u7528\uFF09",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}}),r?f("span",{text:"\u5185\u7F6E\u9884\u8BBE\u53EA\u8BFB",style:{fontSize:"11px",color:"var(--yyt-text-muted)"}}):X({label:"+ \u65B0\u589E\u89C4\u5219",size:"small",onClick:()=>{Ee.addRule(t.id,{type:Vt.INCLUDE,value:"",enabled:!0}),s&&s()}}).el);G(o,n);let a=f("div");if(t.rules.length){for(let i=0;i<t.rules.length;i++)a.appendChild(Wx(t,t.rules[i],i,t.rules.length,s,r));r||Hx(a,t,s)}else a.appendChild(f("div",{style:{padding:"14px 0",color:"var(--yyt-text-muted)",fontSize:"12px"},text:'\u5C1A\u65E0\u89C4\u5219\u3002\u70B9\u51FB\u53F3\u4E0A\u89D2"+ \u65B0\u589E\u89C4\u5219"\u5F00\u59CB\u6DFB\u52A0\u3002'}));if(G(o,a),G(o,f("div",{text:"\u5185\u5BB9\u9ED1\u540D\u5355",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)",marginTop:"6px",marginBottom:"4px"}})),G(o,f("div",{text:"\u63D0\u53D6\u51FA\u7684\u5185\u5BB9\u5757\u82E5\u5305\u542B\u4EFB\u4E00\u5173\u952E\u8BCD\u5219\u8DF3\u8FC7\u8BE5\u5757\uFF08\u4E0D\u533A\u5206\u5927\u5C0F\u5199\uFF09\u3002",style:{fontSize:"11px",color:"var(--yyt-text-muted)",marginBottom:"6px"}})),r)G(o,f("div",{style:{fontSize:"12px",color:"var(--yyt-text-muted)"},text:t.blacklist.length?t.blacklist.join("\u3001"):"\uFF08\u7A7A\uFF09"}));else{let i=ol({values:t.blacklist,placeholder:"\u8F93\u5165\u5173\u952E\u8BCD\u56DE\u8F66\u6DFB\u52A0",chipVariant:"danger",onChange:l=>Ee.setBlacklist(t.id,l)});G(o,i.el)}return o}function qx(t){if(!t)return null;let e=f("div",{style:{display:"flex",flexDirection:"column",gap:"8px"}});G(e,f("div",{text:"\u6D4B\u8BD5\u63D0\u53D6",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}}));let r=qp.get(t.id)||{input:"",output:""};qp.set(t.id,r);let s=f("textarea",{className:"yyt-textarea",attrs:{rows:"5",placeholder:"\u7C98\u8D34\u6D4B\u8BD5\u6587\u672C\uFF08\u5982 AI \u56DE\u590D\u539F\u6587\uFF09..."},style:{width:"100%",resize:"vertical",fontFamily:"ui-monospace, monospace",fontSize:"12px"}});s.value=r.input,s.addEventListener("input",()=>{r.input=s.value}),G(e,s);let o=f("div",{style:{padding:"10px",background:"var(--yyt-bg-base)",border:"1px solid var(--yyt-border)",borderRadius:"var(--yyt-radius-sm)",fontFamily:"ui-monospace, monospace",fontSize:"11px",lineHeight:"1.6",color:"var(--yyt-text-muted)",maxHeight:"200px",overflowY:"auto",whiteSpace:"pre-wrap",wordBreak:"break-all",minHeight:"50px"}});o.textContent=r.output||'// \u70B9\u51FB"\u8FD0\u884C\u6D4B\u8BD5"\u770B\u63D0\u53D6\u7ED3\u679C';let n=X({label:"\u25B6 \u8FD0\u884C\u6D4B\u8BD5",size:"small",variant:"primary",onClick:()=>{let a=s.value;if(!a.trim()){r.output="// \u6D4B\u8BD5\u8F93\u5165\u4E3A\u7A7A",o.textContent=r.output,o.style.color="var(--yyt-text-muted)";return}try{let i=xr(a,t.rules||[],t.blacklist||[]);r.output=i||"// \u6CA1\u6709\u63D0\u53D6\u5230\u5185\u5BB9",o.textContent=r.output,o.style.color=i?"var(--yyt-text)":"var(--yyt-text-muted)"}catch(i){r.output=`// \u6D4B\u8BD5\u51FA\u9519\uFF1A${i?.message||i}`,o.textContent=r.output,o.style.color="var(--yyt-danger, #f87171)"}}});return G(e,n.el),G(e,o),e}function Yx(t){let e=t.rules.filter(r=>r.enabled!==!1).length;return[`${t.rules.length} \u89C4\u5219\uFF08${e} \u542F\u7528\uFF09`,`${t.blacklist.length} \u9ED1\u540D\u5355`]}var WE,jx,qp,Yp,Vx,Jp=D(()=>{tr();Fr();Qs();H();Yo();WE=E.createScope("RegexExtractPanel"),jx=[{value:Vt.INCLUDE,label:"include \u2014 \u63D0\u53D6\u6807\u7B7E"},{value:Vt.EXCLUDE,label:"exclude \u2014 \u6392\u9664\u6807\u7B7E"},{value:Vt.REGEX_INCLUDE,label:"regex_include \u2014 \u6B63\u5219\u63D0\u53D6"},{value:Vt.REGEX_EXCLUDE,label:"regex_exclude \u2014 \u6B63\u5219\u6392\u9664"}],qp=new Map;Yp=Nr({id:"regexExtractPanel",kind:"regex",panelTitle:"\u6B63\u5219\u63D0\u53D6\u9884\u8BBE",panelHint:"\u7BA1\u7406\u591A\u4E2A\u63D0\u53D6\u89C4\u5219\u96C6\uFF0C\u5DE5\u5177\u914D\u7F6E\u4E2D\u901A\u8FC7\u9884\u8BBE ID \u5F15\u7528\u3002\u89C4\u5219\u6309\u987A\u5E8F\u5E94\u7528\uFF0C\u53EF\u62D6\u62FD\u6392\u5E8F\u3002",store:Ee,renderEditor:Gx,renderExtras:qx,renderListItemMeta:Yx}),Vx=Yp});function ve(t){return t==null?"":String(t).trim()}function Xx(t="table"){let e=ve(t)||"table",r=Date.now().toString(36),s=Math.random().toString(36).slice(2,8);return`${e}_${r}_${s}`}function an(t="row"){return Xx(t)}function Jt(t,e=0){return ve(t)||`table_${Number.isFinite(e)?e+1:1}`}function ln(t,e=0){return ve(t)||`row_${Number.isFinite(e)?e+1:1}`}function ce(t){if(t!==void 0)try{return JSON.parse(JSON.stringify(t))}catch{return t}}function lo(t={}){return{chatId:ve(t.chatId),sourceMessageId:ve(t.sourceMessageId||t.messageId),sourceSwipeId:ve(t.sourceSwipeId||t.effectiveSwipeId),effectiveSwipeId:ve(t.effectiveSwipeId||t.sourceSwipeId),slotBindingKey:ve(t.slotBindingKey),slotRevisionKey:ve(t.slotRevisionKey),slotTransactionId:ve(t.slotTransactionId),traceId:ve(t.traceId),resolvedAt:Number.isFinite(t.resolvedAt)?t.resolvedAt:Date.now()}}function Ol(t={}){return{resolvedAt:Number.isFinite(t.resolvedAt)?t.resolvedAt:Date.now(),runSource:ve(t.runSource)||st.MANUAL,traceId:ve(t.traceId),chatId:ve(t.chatId),sourceMessageId:ve(t.sourceMessageId||t.messageId),sourceSwipeId:ve(t.sourceSwipeId||t.effectiveSwipeId),effectiveSwipeId:ve(t.effectiveSwipeId||t.sourceSwipeId)||"swipe:current",slotBindingKey:ve(t.slotBindingKey),slotRevisionKey:ve(t.slotRevisionKey),slotTransactionId:ve(t.slotTransactionId),assistantContentFingerprint:ve(t.assistantContentFingerprint),assistantBaseFingerprint:ve(t.assistantBaseFingerprint),assistantText:String(t.assistantText||""),assistantBaseText:String(t.assistantBaseText||""),targetMessageIndex:Number.isFinite(t.targetMessageIndex)?t.targetMessageIndex:-1}}function Tr(t){return!t||typeof t!="object"?null:{chatId:ve(t.chatId),slotBindingKey:ve(t.slotBindingKey),slotRevisionKey:ve(t.slotRevisionKey),sourceMessageId:ve(t.sourceMessageId),sourceSwipeId:ve(t.sourceSwipeId),tables:Array.isArray(t.tables)?ce(t.tables):[],updatedAt:Number.isFinite(t.updatedAt)?t.updatedAt:0,meta:t.meta&&typeof t.meta=="object"?ce(t.meta):{}}}function cn(t={},e={}){let r=Ol(t),s=e.meta&&typeof e.meta=="object"?ce(e.meta):{};return{chatId:r.chatId,slotBindingKey:r.slotBindingKey,slotRevisionKey:r.slotRevisionKey,sourceMessageId:r.sourceMessageId,sourceSwipeId:r.sourceSwipeId||r.effectiveSwipeId,tables:Array.isArray(e.tables)?ce(e.tables):[],updatedAt:Number.isFinite(e.updatedAt)?e.updatedAt:Date.now(),meta:{sourceKind:s.sourceKind||Mt.EMPTY,...s}}}function _a(t){return!t||typeof t!="object"?{lastResolvedTarget:null,lastCommittedTarget:null,updatedAt:0}:{lastResolvedTarget:t.lastResolvedTarget?lo(t.lastResolvedTarget):null,lastCommittedTarget:t.lastCommittedTarget?lo(t.lastCommittedTarget):null,updatedAt:Number.isFinite(t.updatedAt)?t.updatedAt:0}}function Ae(t){if(t==null)return St;let e=String(t).trim();return e===""?St:e}function dn(t,e){let r=ve(t),s=Ae(e);return`${r}::${s}`}function Qp(){return{rows:[],cols:[],cells:[],indexColumn:!1}}function Zp(t,e){return`${Number.isFinite(t)?t:-1}:${Number.isFinite(e)?e:-1}`}var Cs,jr,st,ht,ks,Mt,co,Jx,St,qe,Xp,HE,GE,He=D(()=>{Cs="YouYouToolkit_tableState",jr="YouYouToolkit_tableBindings",st=Object.freeze({MANUAL:"MANUAL_TABLE",AUTO:"AUTO_TABLE"}),ht=Object.freeze({ENABLED:"enabled",SELECTED:"selected",CURRENT:"current"}),ks=Object.freeze({EXACT:"exact",BINDING_FALLBACK:"binding_fallback",HISTORY:"history",TEMPLATE:"template",EMPTY:"empty"}),Mt=Object.freeze({EXACT:"exact",BINDING:"binding",HISTORY:"history",TEMPLATE:"template",EMPTY:"empty"}),co=Object.freeze({INSERT_ROW:"insertRow",UPDATE_ROW:"updateRow",DELETE_ROW:"deleteRow"}),Jx=Object.freeze({CELL:"cell",ROW:"row",COLUMN:"column",INDEX_COLUMN:"index_column"});St="";qe=Object.freeze({INHERIT_GLOBAL:"inherit_global",CHAT_OVERRIDE:"chat_override",PRESET_LINK:"preset_link"}),Xp=8,HE=Object.freeze({NOTE:"note",INIT_NODE:"initNode",INSERT_NODE:"insertNode",UPDATE_NODE:"updateNode",DELETE_NODE:"deleteNode"}),GE=Object.freeze({INHERIT_GLOBAL:-1,DISABLED:0})});function Ea(t,e=""){return t==null?e:String(t).trim()||e}function Qx(t,e=!1){return t==null?e:t===!0}function Aa(t={},e=0){return Jt(t?.id||t?.key,e)}function un(t={},e={}){let r=t&&typeof t=="object"?t:{},s=e&&typeof e=="object"?e:{},o=Ea(r.mode||r.runScope||s.mode||s.runScope,ht.ENABLED),n=Array.isArray(r.selectedTableIds)?r.selectedTableIds.map(i=>Ea(i,"")).filter(Boolean):Array.isArray(s.selectedTableIds)?s.selectedTableIds.map(i=>Ea(i,"")).filter(Boolean):[],a=Ea(r.activeTableId||s.activeTableId,"");return{mode:Object.values(ht).includes(o)?o:ht.ENABLED,selectedTableIds:n,activeTableId:a}}function ey(t={},e=[]){let r=un(t,t?.scope||{}),s=Array.isArray(e)?e:[],o=s.map((c,u)=>Aa(c,u)),n=new Set(o),a=r.mode,i=!1;a===ht.CURRENT?(!r.activeTableId||!n.has(r.activeTableId))&&(a=ht.ENABLED,i=!0):a===ht.SELECTED&&r.selectedTableIds.filter(u=>n.has(u)).length===0&&(a=ht.ENABLED,i=!0);let l=[];a===ht.CURRENT?l=r.activeTableId?[r.activeTableId]:[]:a===ht.SELECTED?l=r.selectedTableIds.filter(c=>n.has(c)):l=s.map((c,u)=>({table:c,id:Aa(c,u)})).filter(({table:c})=>Qx(c?.enabled,!0)).map(({id:c})=>c);let d=new Set(l);return{...r,mode:a,requestedMode:r.mode,staleScope:i,allTableIds:o,allowedTableIds:l,allowedIdSet:d,includes(c={},u=-1){return d.has(Aa(c,u))},filterTables(c=[]){return(Array.isArray(c)?c:[]).filter((p,y)=>d.has(Aa(p,y)))},toJSON(){return{mode:a,requestedMode:r.mode,staleScope:i,selectedTableIds:ce(r.selectedTableIds),activeTableId:r.activeTableId,allowedTableIds:[...l]}}}}var Ca=D(()=>{He()});function Pt(t,e=""){return t==null?e:String(t).trim()||e}function $l(){let t=globalThis.window||globalThis;return Pt(t?.TavernHelper?.getCurrentChatId?.()||t?.Silvy?.getCurrentChatId?.()||t?.chat_metadata?.chat_id||t?.this_chid||t?.name1,"default_chat")}function Zx(t,e=!1){return t===!0}function ew(t={}){let e=t&&typeof t=="object"?t:{};return{enabled:Zx(e.enabled,!1),targetBook:Pt(e.targetBook,""),entryComment:Pt(e.entryComment,"YYT-\u586B\u8868\u6570\u636E")}}function Bl(t={},e={}){let r=t&&typeof t=="object"?t:{},s=un(r.scope,{mode:r.runScope||e.runScope||ht.ENABLED,selectedTableIds:r.selectedTableIds||e.selectedTableIds||[],activeTableId:r.activeTableId||e.activeTableId||""});return{chatId:Pt(r.chatId,Pt(e.chatId,$l())),templateId:Pt(r.templateId,Pt(e.templateId,bt)),enabledTableIds:Array.isArray(r.enabledTableIds)?r.enabledTableIds.map(o=>Pt(o,"")).filter(Boolean):[],focusedTableId:Pt(r.focusedTableId,s.activeTableId),scope:s,worldbookSync:ew(r.worldbookSync),seedNote:Pt(r.seedNote,""),updatedAt:Pt(r.updatedAt,new Date().toISOString())}}function sy(){let t=ty.get(ry,{});return t&&typeof t=="object"&&!Array.isArray(t)?t:{}}function zl(t=$l()){let e=Pt(t,"default_chat"),r=sy();return Bl(r[e],{chatId:e})}function oy(t={},e=$l()){let r=Pt(e,"default_chat"),s=sy(),o=Bl({...s[r],...t||{},chatId:r,updatedAt:new Date().toISOString()},{chatId:r});return ty.set(ry,{...s,[r]:o}),{success:!0,guide:o}}function ny(t={},e=null){let r=Bl(e||zl(),{templateId:t.activeTemplate,runScope:t.runScope,selectedTableIds:t.scope?.selectedTableIds,activeTableId:t.scope?.activeTableId}),s={...t,activeTemplate:r.templateId||t.activeTemplate,runScope:r.scope.mode,scope:r.scope};return r.worldbookSync&&r.worldbookSync.targetBook&&(s.worldbookSync={...t.worldbookSync||{},...r.worldbookSync}),s}var ty,ry,ay=D(()=>{je();dr();He();Ca();ty=$.namespace("tableWorkbenchGuides"),ry="guides"});function se(t,e,r="",s=Ia){return{key:t,title:e,description:r,type:s,required:!1}}function Wr({id:t,name:e,note:r,aiInstructions:s,columns:o}){return{id:t,name:e,note:r,enabled:!0,aiInstructions:{init:s?.init||"",create:s?.create||"",update:s?.update||"",delete:s?.delete||""},columns:o,rows:[]}}var Ce,ka,Kl,iy,tw,Ia,ly,bt,Ul,uo,cy=D(()=>{Ce=Object.freeze({IDLE:"idle",RUNNING:"running",SUCCESS:"success",ERROR:"error",ABORTED:"aborted",SKIPPED:"skipped"}),ka=Object.freeze({INCREMENTAL:"incremental",FULL:"full"}),Kl=`\u8BF7\u6839\u636E\u5F53\u524D\u5BF9\u8BDD\u4E0E\u5F53\u524D\u8868\u683C\u57FA\u5E95\uFF0C\u5BF9\u7ED3\u6784\u5316 tables \u6570\u636E\u505A\u589E\u91CF\u66F4\u65B0\u3002

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
{{toolContentMacro}}`,iy=`\u8F93\u51FA\u8981\u6C42 \u2014 \u7528 <tableEdit>...</tableEdit> \u589E\u91CF DSL\uFF1A

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
\u4F46\u5E94\u8BE5\u5C3D\u91CF\u4F18\u5148\u7528 DSL\uFF08\u6D41\u91CF\u5C0F\u3001\u4E0D\u5F71\u54CD\u9501\u5B57\u6BB5\uFF09\u3002`,tw=Object.freeze([{value:"text",label:"\u6587\u672C"},{value:"number",label:"\u6570\u5B57"},{value:"boolean",label:"\u5E03\u5C14"},{value:"date",label:"\u65E5\u671F"},{value:"json",label:"JSON"}]),Ia="text",ly=Object.freeze(tw.map(t=>Object.freeze({...t}))),bt="default_story_state",Ul="\u9ED8\u8BA4\u5267\u60C5\u72B6\u6001\u6A21\u677F";uo=Object.freeze([Wr({id:"default_global_state",name:"\u5168\u5C40\u6570\u636E\u8868",note:"\u8BB0\u5F55\u5F53\u524D\u4E3B\u89D2\u6240\u5728\u5730\u70B9\u53CA\u65F6\u95F4\u76F8\u5173\u53C2\u6570\u3002\u6B64\u8868\u901A\u5E38\u6709\u4E14\u4EC5\u6709\u4E00\u884C\u3002",aiInstructions:{init:"\u63D2\u5165\u4E00\u6761\u5173\u4E8E\u5F53\u524D\u4E16\u754C\u72B6\u6001\u7684\u8BB0\u5F55\u3002",create:"\u901A\u5E38\u7981\u6B62\u65B0\u589E\uFF1B\u9664\u975E\u8868\u4E3A\u7A7A\u4E14\u9700\u8981\u521D\u59CB\u5316\u3002",update:"\u5F53\u5730\u70B9\u6216\u65F6\u95F4\u53D1\u751F\u53D8\u5316\u65F6\u66F4\u65B0\u6B64\u8868\uFF1B\u6BCF\u8F6E\u5E94\u6839\u636E\u5267\u60C5\u66F4\u65B0\u65F6\u95F4\u76F8\u5173\u5B57\u6BB5\u3002",delete:"\u7981\u6B62\u5220\u9664\u3002"},columns:[se("location","\u4E3B\u89D2\u5F53\u524D\u6240\u5728\u5730\u70B9","\u4E3B\u89D2\u5F53\u524D\u6240\u5728\u7684\u5177\u4F53\u573A\u666F\u540D\u79F0\u3002"),se("current_time","\u5F53\u524D\u65F6\u95F4","\u6E38\u620F\u4E16\u754C\u7684\u5F53\u524D\u65F6\u95F4\uFF1B\u5982\u5267\u60C5\u6CA1\u6709\u660E\u786E\u65F6\u95F4\uFF0C\u53EF\u6839\u636E\u4E16\u754C\u89C2\u7ED9\u51FA\u5408\u7406\u65F6\u95F4\u3002"),se("previous_scene_time","\u4E0A\u8F6E\u573A\u666F\u65F6\u95F4","\u4E0A\u4E00\u8F6E\u4EA4\u4E92\u7ED3\u675F\u65F6\u7684\u65F6\u95F4\u3002"),se("elapsed_time","\u7ECF\u8FC7\u7684\u65F6\u95F4","\u6839\u636E\u5F53\u524D\u4E0E\u4E0A\u8F6E\u65F6\u95F4\u8BA1\u7B97\u51FA\u7684\u6587\u672C\u63CF\u8FF0\u3002")]}),Wr({id:"default_protagonist_profile",name:"\u4E3B\u89D2\u4FE1\u606F",note:"\u8BB0\u5F55\u4E3B\u89D2\u7684\u6838\u5FC3\u8EAB\u4EFD\u4FE1\u606F\u3002\u6B64\u8868\u901A\u5E38\u6709\u4E14\u4EC5\u6709\u4E00\u884C\u3002",aiInstructions:{init:"\u521D\u59CB\u5316\u65F6\u63D2\u5165\u4E3B\u89D2\u7684\u552F\u4E00\u6761\u76EE\u3002",create:"\u7981\u6B62\u65B0\u589E\u591A\u540D\u4E3B\u89D2\uFF1B\u9664\u975E\u8868\u4E3A\u7A7A\u4E14\u9700\u8981\u521D\u59CB\u5316\u3002",update:"\u5F53\u4E3B\u89D2\u8EAB\u4EFD\u3001\u5916\u8C8C\u3001\u7ECF\u5386\u6216\u6027\u683C\u6709\u660E\u786E\u53D8\u5316\u65F6\u66F4\u65B0\u3002",delete:"\u7981\u6B62\u5220\u9664\u3002"},columns:[se("name","\u4EBA\u7269\u540D\u79F0","\u4E3B\u89D2\u7684\u540D\u5B57\u3002"),se("gender_age","\u6027\u522B/\u5E74\u9F84","\u4E3B\u89D2\u7684\u6027\u522B\u4E0E\u5E74\u9F84\u3002"),se("appearance","\u5916\u8C8C\u7279\u5F81","\u5BF9\u4E3B\u89D2\u5916\u8C8C\u7684\u5BA2\u89C2\u6587\u5B57\u63CF\u5199\u3002"),se("identity","\u804C\u4E1A/\u8EAB\u4EFD","\u4E3B\u89D2\u5728\u793E\u4F1A\u6216\u5267\u60C5\u4E2D\u7684\u4E3B\u8981\u8EAB\u4EFD\u3002"),se("history","\u8FC7\u5F80\u7ECF\u5386","\u4E3B\u89D2\u80CC\u666F\u6545\u4E8B\u4E0E\u5173\u952E\u7ECF\u5386\uFF0C\u968F\u5267\u60C5\u589E\u91CF\u66F4\u65B0\u3002"),se("personality","\u6027\u683C\u7279\u70B9","\u5BF9\u4E3B\u89D2\u6838\u5FC3\u6027\u683C\u7684\u6982\u62EC\u3002")]}),Wr({id:"default_important_characters",name:"\u91CD\u8981\u89D2\u8272\u8868",note:"\u8BB0\u5F55\u5173\u952E NPC \u6216\u91CD\u8981\u89D2\u8272\u7684\u4FE1\u606F\u548C\u52A8\u6001\u72B6\u6001\u3002",aiInstructions:{init:"\u521D\u59CB\u5316\u65F6\u4E3A\u5F53\u524D\u5728\u573A\u7684\u91CD\u8981\u4EBA\u7269\u5206\u522B\u63D2\u5165\u6761\u76EE\u3002",create:"\u5267\u60C5\u4E2D\u6709\u672A\u8BB0\u5F55\u7684\u91CD\u8981\u4EBA\u7269\u767B\u573A\u65F6\u65B0\u589E\u3002",update:"\u5DF2\u6709\u89D2\u8272\u7684\u72B6\u6001\u3001\u5173\u7CFB\u3001\u60F3\u6CD5\u3001\u7ECF\u5386\u6216\u6301\u6709\u7269\u53D8\u5316\u65F6\u66F4\u65B0\u3002",delete:'\u901A\u5E38\u7981\u6B62\u5220\u9664\uFF1B\u89D2\u8272\u79BB\u573A\u65F6\u4F18\u5148\u66F4\u65B0"\u662F\u5426\u79BB\u573A"\u3002'},columns:[se("name","\u59D3\u540D","\u89D2\u8272\u59D3\u540D\u3002"),se("gender_age","\u6027\u522B/\u5E74\u9F84","\u89D2\u8272\u7684\u6027\u522B\u4E0E\u5E74\u9F84\u3002"),se("summary","\u4E00\u53E5\u8BDD\u4ECB\u7ECD","\u7528\u7B80\u77ED\u6587\u5B57\u6982\u62EC\u89D2\u8272\u8EAB\u4EFD\u80CC\u666F\u3002"),se("appearance","\u5916\u8C8C\u7279\u5F81","\u5BF9\u89D2\u8272\u5916\u8C8C\u548C\u5F53\u524D\u8863\u7740\u7684\u5BA2\u89C2\u63CF\u5199\u3002"),se("important_items","\u6301\u6709\u7684\u91CD\u8981\u7269\u54C1","\u89D2\u8272\u62E5\u6709\u7684\u5173\u952E\u7269\u54C1\uFF0C\u7528\u5206\u53F7\u5206\u9694\u3002"),se("offstage","\u662F\u5426\u79BB\u573A",'\u5224\u65AD\u8BE5\u89D2\u8272\u5F53\u524D\u662F\u5426\u5DF2\u7ECF\u79BB\u573A\uFF0C\u586B\u5199"\u662F"\u6216"\u5426"\u3002',"boolean"),se("history","\u8FC7\u5F80\u7ECF\u5386","\u89D2\u8272\u80CC\u666F\u4E0E\u5173\u952E\u4E8B\u4EF6\uFF0C\u968F\u5267\u60C5\u589E\u91CF\u66F4\u65B0\u3002")]}),Wr({id:"default_protagonist_skills",name:"\u4E3B\u89D2\u6280\u80FD\u8868",note:"\u8BB0\u5F55\u4E3B\u89D2\u83B7\u5F97\u7684\u6280\u80FD\u3001\u80FD\u529B\u6216\u9636\u6BB5\u6027\u6210\u957F\u3002",aiInstructions:{init:"\u521D\u59CB\u5316\u65F6\u6839\u636E\u8BBE\u5B9A\u6DFB\u52A0\u4E3B\u89D2\u7684\u521D\u59CB\u6280\u80FD\u3002",create:"\u4E3B\u89D2\u83B7\u5F97\u65B0\u6280\u80FD\u6216\u65B0\u80FD\u529B\u65F6\u65B0\u589E\u3002",update:"\u5DF2\u6709\u6280\u80FD\u5347\u7EA7\u3001\u964D\u7EA7\u6216\u6548\u679C\u53D8\u5316\u65F6\u66F4\u65B0\u3002",delete:"\u6280\u80FD\u88AB\u5267\u60C5\u5265\u593A\u3001\u66FF\u6362\u6216\u5931\u6548\u65F6\u5220\u9664\u3002"},columns:[se("skill_name","\u6280\u80FD\u540D\u79F0","\u6280\u80FD\u6216\u80FD\u529B\u540D\u79F0\u3002"),se("skill_type","\u6280\u80FD\u7C7B\u578B","\u6280\u80FD\u7C7B\u522B\uFF0C\u4F8B\u5982\u4E3B\u52A8\u3001\u88AB\u52A8\u3001\u5929\u8D4B\u7B49\u3002"),se("level","\u7B49\u7EA7/\u9636\u6BB5","\u6280\u80FD\u5F53\u524D\u7B49\u7EA7\u3001\u719F\u7EC3\u5EA6\u6216\u9636\u6BB5\u3002"),se("effect","\u6548\u679C\u63CF\u8FF0","\u6280\u80FD\u5728\u5F53\u524D\u9636\u6BB5\u4E0B\u7684\u5177\u4F53\u6548\u679C\u3002")]}),Wr({id:"default_inventory",name:"\u80CC\u5305\u7269\u54C1\u8868",note:"\u8BB0\u5F55\u4E3B\u89D2\u62E5\u6709\u7684\u7269\u54C1\u3001\u88C5\u5907\u6216\u6D88\u8017\u54C1\u3002",aiInstructions:{init:"\u521D\u59CB\u5316\u65F6\u6839\u636E\u5267\u60C5\u4E0E\u8BBE\u5B9A\u6DFB\u52A0\u4E3B\u89D2\u7684\u521D\u59CB\u643A\u5E26\u7269\u54C1\u3002",create:"\u4E3B\u89D2\u83B7\u5F97\u80CC\u5305\u4E2D\u6CA1\u6709\u7684\u5168\u65B0\u7269\u54C1\u65F6\u65B0\u589E\u3002",update:"\u5DF2\u6709\u7269\u54C1\u6570\u91CF\u3001\u72B6\u6001\u6216\u63CF\u8FF0\u53D8\u5316\u65F6\u66F4\u65B0\u3002",delete:"\u7269\u54C1\u88AB\u5B8C\u5168\u6D88\u8017\u3001\u4E22\u5F03\u6216\u6467\u6BC1\u65F6\u5220\u9664\u3002"},columns:[se("item_name","\u7269\u54C1\u540D\u79F0","\u7269\u54C1\u540D\u79F0\u3002"),se("quantity","\u6570\u91CF","\u62E5\u6709\u6570\u91CF\u3002","number"),se("description","\u63CF\u8FF0/\u6548\u679C","\u7269\u54C1\u529F\u80FD\u3001\u6548\u679C\u6216\u80CC\u666F\u63CF\u8FF0\u3002"),se("category","\u7C7B\u522B","\u7269\u54C1\u7C7B\u522B\uFF0C\u4F8B\u5982\u6B66\u5668\u3001\u6D88\u8017\u54C1\u3001\u6742\u7269\u7B49\u3002")]}),Wr({id:"default_quests_events",name:"\u4EFB\u52A1\u4E0E\u4E8B\u4EF6\u8868",note:"\u8BB0\u5F55\u5F53\u524D\u6B63\u5728\u8FDB\u884C\u6216\u9700\u8981\u6301\u7EED\u8FFD\u8E2A\u7684\u4EFB\u52A1\u4E0E\u4E8B\u4EF6\u3002",aiInstructions:{init:"\u521D\u59CB\u5316\u65F6\u6839\u636E\u5267\u60C5\u4E0E\u8BBE\u5B9A\u6DFB\u52A0\u4E3B\u8981\u4EFB\u52A1\u6216\u5173\u952E\u4E8B\u4EF6\u3002",create:"\u4E3B\u89D2\u63A5\u53D6\u3001\u89E6\u53D1\u6216\u53D1\u73B0\u65B0\u7684\u4EFB\u52A1\u4E0E\u4E8B\u4EF6\u65F6\u65B0\u589E\u3002",update:"\u4EFB\u52A1\u53D6\u5F97\u5173\u952E\u8FDB\u5C55\u3001\u76EE\u6807\u53D8\u5316\u6216\u65F6\u9650\u53D8\u5316\u65F6\u66F4\u65B0\u3002",delete:"\u4EFB\u52A1\u5B8C\u6210\u3001\u5931\u8D25\u3001\u8FC7\u671F\u6216\u4E0D\u518D\u9700\u8981\u8FFD\u8E2A\u65F6\u5220\u9664\u3002"},columns:[se("quest_name","\u4EFB\u52A1\u540D\u79F0","\u4EFB\u52A1\u6216\u4E8B\u4EF6\u6807\u9898\u3002"),se("quest_type","\u4EFB\u52A1\u7C7B\u578B","\u4E3B\u7EBF\u3001\u652F\u7EBF\u3001\u4E2A\u4EBA\u3001\u7A81\u53D1\u4E8B\u4EF6\u7B49\u3002"),se("issuer","\u53D1\u5E03\u8005","\u53D1\u5E03\u4EFB\u52A1\u6216\u89E6\u53D1\u4E8B\u4EF6\u7684\u89D2\u8272\u3001\u5730\u70B9\u6216\u52BF\u529B\u3002"),se("detail","\u8BE6\u7EC6\u63CF\u8FF0","\u4EFB\u52A1\u76EE\u6807\u3001\u4E8B\u4EF6\u80CC\u666F\u548C\u8981\u6C42\u3002"),se("progress","\u5F53\u524D\u8FDB\u5EA6","\u5BF9\u5B8C\u6210\u5EA6\u6216\u5F53\u524D\u9636\u6BB5\u7684\u7B80\u8981\u63CF\u8FF0\u3002"),se("deadline","\u4EFB\u52A1\u65F6\u9650","\u5B8C\u6210\u4EFB\u52A1\u7684\u5269\u4F59\u65F6\u95F4\u6216\u622A\u6B62\u6761\u4EF6\u3002"),se("reward","\u5956\u52B1","\u5B8C\u6210\u540E\u53EF\u80FD\u83B7\u5F97\u7684\u5956\u52B1\u3002"),se("penalty","\u60E9\u7F5A","\u5931\u8D25\u6216\u9519\u8FC7\u540E\u7684\u540E\u679C\u3002")]}),Wr({id:"default_memo_log",name:"\u7EAA\u8981\u8868",note:"\u8BB0\u5F55\u6BCF\u8F6E\u6216\u5173\u952E\u7247\u6BB5\u53D1\u751F\u7684\u4E8B\u4EF6\u7EAA\u8981\uFF0C\u7528\u4E8E\u540E\u7EED\u56DE\u987E\u3002",aiInstructions:{init:"\u6545\u4E8B\u521D\u59CB\u5316\u65F6\u63D2\u5165\u4E00\u6761\u8BB0\u5F55\uFF0C\u7528\u4E8E\u8BB0\u5F55\u521D\u59CB\u5316\u5267\u60C5\u3002",create:"\u6BCF\u8F6E\u4EA4\u4E92\u7ED3\u675F\u540E\uFF0C\u82E5\u53D1\u751F\u4E86\u503C\u5F97\u8BB0\u5F55\u7684\u65B0\u4E8B\u4EF6\uFF0C\u5219\u63D2\u5165\u4E00\u6761\u65B0\u7EAA\u8981\u3002",update:"\u901A\u5E38\u7981\u6B62\u66F4\u65B0\u5386\u53F2\u7EAA\u8981\uFF1B\u53EA\u6709\u660E\u663E\u4E8B\u5B9E\u9519\u8BEF\u65F6\u624D\u4FEE\u6B63\u3002",delete:"\u7981\u6B62\u5220\u9664\u3002"},columns:[se("time_span","\u65F6\u95F4\u8DE8\u5EA6","\u672C\u8F6E\u4E8B\u4EF6\u53D1\u751F\u7684\u65F6\u95F4\u8303\u56F4\u3002"),se("location","\u5730\u70B9","\u672C\u8F6E\u4E8B\u4EF6\u53D1\u751F\u5730\u70B9\u3002"),se("memo","\u7EAA\u8981","\u4EE5\u7B2C\u4E09\u65B9\u89C6\u89D2\u5BA2\u89C2\u8BB0\u5F55\u672C\u8F6E\u53D1\u751F\u7684\u4E8B\u5B9E\u3002"),se("summary","\u6982\u89C8","\u4E00\u53E5\u8BDD\u6982\u62EC\u7EAA\u8981\u5185\u5BB9\u3002"),se("index_code","\u7F16\u7801\u7D22\u5F15","\u7528\u4E8E\u540E\u7EED\u68C0\u7D22\u7684\u7B80\u77ED\u7F16\u7801\u3002")]}),Wr({id:"default_options",name:"\u9009\u9879\u8868",note:"\u8BB0\u5F55\u6BCF\u8F6E\u4E3B\u89D2\u53EF\u4EE5\u91C7\u53D6\u7684\u884C\u52A8\u9009\u9879\u3002\u6B64\u8868\u901A\u5E38\u6709\u4E14\u4EC5\u6709\u4E00\u884C\u3002\u6240\u6709\u9009\u9879\u4F7F\u7528\u7B2C\u4E09\u4EBA\u79F0\uFF0C\u4E0D\u4EE3\u66FF\u4E3B\u89D2\u53D1\u8A00\uFF0C\u5E76\u7D27\u6263\u5F53\u524D\u5267\u60C5\u3002",aiInstructions:{init:"\u521D\u59CB\u5316\u65F6\u751F\u6210\u56DB\u4E2A\u521D\u59CB\u884C\u52A8\u9009\u9879\u3002",create:"\u901A\u5E38\u7981\u6B62\u65B0\u589E\uFF1B\u9664\u975E\u8868\u4E3A\u7A7A\u4E14\u9700\u8981\u521D\u59CB\u5316\u3002",update:"\u6BCF\u8F6E\u4EA4\u4E92\u540E\u6839\u636E\u5F53\u524D\u5267\u60C5\u751F\u6210\u65B0\u7684\u56DB\u4E2A\u9009\u9879\u5E76\u8986\u76D6\u539F\u6709\u5185\u5BB9\u3002",delete:"\u7981\u6B62\u5220\u9664\u3002"},columns:[se("option_1","\u9009\u9879\u4E00","\u504F\u5411\u7B56\u7565\u3001\u63A8\u8FDB\u5267\u60C5\u6216\u89E3\u51B3\u5F53\u524D\u95EE\u9898\u7684\u884C\u52A8\u3002"),se("option_2","\u9009\u9879\u4E8C","\u504F\u5411\u8C28\u614E\u89C2\u5BDF\u3001\u6536\u96C6\u4FE1\u606F\u6216\u4FDD\u6301\u4E2D\u7ACB\u7684\u884C\u52A8\u3002"),se("option_3","\u9009\u9879\u4E09","\u504F\u5411\u5E2E\u52A9\u3001\u4FDD\u62A4\u3001\u6C9F\u901A\u6216\u5B89\u629A\u7684\u884C\u52A8\u3002"),se("option_4","\u9009\u9879\u56DB","\u504F\u5411\u5192\u9669\u3001\u8BD5\u63A2\u3001\u6539\u53D8\u5C40\u52BF\u6216\u5173\u7CFB\u4E92\u52A8\u7684\u884C\u52A8\u3002")]})])});function rw(t,e=""){return t==null?e:String(t).trim()||e}function Hr(t){if(t==null)return"";if(typeof t=="string")return t;try{return JSON.stringify(t,null,2)}catch{return String(t)}}function dy(t,e="col"){return rw(t,"").toLowerCase().replace(/[^a-z0-9]+/g,"_").replace(/^_+|_+$/g,"")||e}function pn(t,e=new Set){let r=dy(t,"col"),s=r,o=2;for(;e.has(s);)s=`${r}_${o}`,o+=1;return e.add(s),s}var uy=D(()=>{});function L(t,e=""){return t==null?e:String(t).trim()||e}function ur(t,e=!1){return t==null?e:t===!0}function sw(t){if(!Array.isArray(t)||t.length!==1)return!1;let e=t[0]&&typeof t[0]=="object"?t[0]:null;if(!e)return!1;let r=L(e.name||e.title,""),s=L(e.note||e.description,""),o=Array.isArray(e.columns)?e.columns:[],n=Array.isArray(e.rows)?e.rows:[];if(r&&!["\u88681","\u8868\u683C 1","\u8868\u683C1"].includes(r)||s||o.length!==1||n.length>1)return!1;let a=o[0]&&typeof o[0]=="object"?o[0]:{},i=L(a.key||a.id,""),l=L(a.title||a.name||a.label,"");if(L(a.description||a.note,"")||i&&i!=="col_1"||l&&!["\u52171","col_1"].includes(l))return!1;if(n.length===0)return!0;let c=n[0]&&typeof n[0]=="object"?n[0]:{},u=L(c.name||c.title||c.label,""),p=c.cells&&typeof c.cells=="object"&&!Array.isArray(c.cells)?c.cells:{},y=Array.isArray(c.values)?c.values:[],m=Object.values(p).some(g=>L(g,""))||y.some(g=>L(g,""));return(!u||u==="\u884C1")&&!m}function ow(t,{seedDefaultWhenMissing:e=!1}={}){return sw(t)?ce(uo):Array.isArray(t)?ce(t):t&&typeof t=="object"?nw(t):e?ce(uo):[]}function Wl(t=""){let e=[],r=L(t,""),s=/-\s*列\d+\s*[:：]\s*([^\n\-–—]+?)\s*[-–—]\s*([^\n]+)/g,o;for(;o=s.exec(r);)e.push({title:L(o[1],""),description:L(o[2],"")});return e}function nw(t={}){let e=t&&typeof t=="object"?t:{};return Object.keys(e).filter(s=>s.startsWith("sheet_")&&e[s]&&typeof e[s]=="object").map((s,o)=>({key:s,table:e[s],fallbackOrder:o})).sort((s,o)=>{let n=Number.isFinite(s.table.orderNo)?s.table.orderNo:s.fallbackOrder,a=Number.isFinite(o.table.orderNo)?o.table.orderNo:o.fallbackOrder;return n-a}).map(({key:s,table:o},n)=>{let a=o.sourceData&&typeof o.sourceData=="object"?o.sourceData:{},i=Array.isArray(o.content)?o.content:[],l=Array.isArray(i[0])?i[0]:[],d=Wl(a.note),c=new Set,u=l.slice(1).map((y,m)=>{let g=d[m]||{},h=L(y||g.title,`\u5217${m+1}`);return{key:pn(h||`col_${m+1}`,c),title:h,description:L(g.description,""),type:Ia,required:!1}}),p=i.slice(1).map((y,m)=>{let g=Array.isArray(y)?y:[],h={};return u.forEach((x,S)=>{h[x.key]=Hr(g[S+1])}),{name:L(g[0],`\u884C${m+1}`),cells:h}});return{id:L(o.uid||s,`sheet_${n+1}`),name:L(o.name,`\u8868${n+1}`),note:L(a.note,""),enabled:o.enabled!==!1,aiInstructions:{init:L(a.initNode,""),create:L(a.insertNode,""),update:L(a.updateNode,""),delete:L(a.deleteNode,"")},columns:u,rows:p}})}function aw(t=[]){let e=[],r=0;return t.forEach(s=>{let o=s&&typeof s=="object"?s:{},n=o.cells&&typeof o.cells=="object"&&!Array.isArray(o.cells)?o.cells:null,a=Array.isArray(o.cells)?o.cells:Array.isArray(o.values)?o.values:null;n&&Object.keys(n).forEach(i=>{e.includes(i)||e.push(i)}),a&&a.length>r&&(r=a.length)}),e.length>0?e.map(s=>({key:s,title:String(s)})):r>0?Array.from({length:r},(s,o)=>({key:`col_${o+1}`,title:`\u5217${o+1}`})):[]}function Hl(t,e=Ia){let r=L(t,e);return ly.some(s=>s.value===r)?r:e}function iw(t={},e=0,r=new Set){let s=t&&typeof t=="object"?t:{},o=L(s.title||s.name||s.label,`\u5217${e+1}`),n=L(s.key||s.id,""),a=pn(n||o||`col_${e+1}`,r),i=[n,L(s.title,""),L(s.name,""),L(s.label,"")].filter(Boolean);return{key:a,title:o,description:L(s.description||s.note,""),type:Hl(s.type),required:s.required===!0,sourceKeys:i}}function lw(t={},e={},r=0){let s=t.cells&&typeof t.cells=="object"&&!Array.isArray(t.cells)?t.cells:null,o=Array.isArray(t.cells)?t.cells:Array.isArray(t.values)?t.values:null;if(s){let n=[...Array.isArray(e.sourceKeys)?e.sourceKeys:[],e.key,e.title].filter(Boolean);for(let a of n)if(s[a]!==void 0)return Hr(s[a])}return o&&o[r]!==void 0?Hr(o[r]):""}function cw(t={},e=[],r=0){let s=t&&typeof t=="object"?t:{},o={};return e.forEach((n,a)=>{o[n.key]=lw(s,n,a)}),{id:ln(s.id||s.rowId,r),name:L(s.name||s.title||s.label,`\u884C${r+1}`),cells:o}}function dw(t={}){let e=t&&typeof t=="object"?t:{};return{init:L(e.init,""),create:L(e.create,""),update:L(e.update,""),delete:L(e.delete,"")}}function uw(t={},e=""){let r=t&&typeof t=="object"?t:{},s=L(r.presetId,L(e,""));return{enabled:r.enabled===!0,presetId:s}}function pw(t={},e=""){let r=t&&typeof t=="object"?t:{};return{enabled:ur(r.enabled,!1),entryName:L(r.entryName,e),entryType:r.entryType==="keyword"?"keyword":"constant",splitByRow:ur(r.splitByRow,!1),keywords:L(r.keywords,""),injectionTemplate:L(r.injectionTemplate,""),preventRecursion:ur(r.preventRecursion,!0),entryPlacement:{position:L(r.entryPlacement?.position||r.placement?.position,"before_character_definition"),depth:Number.isFinite(Number(r.entryPlacement?.depth??r.placement?.depth))?Math.floor(Number(r.entryPlacement?.depth??r.placement?.depth)):2,order:Number.isFinite(Number(r.entryPlacement?.order??r.placement?.order))?Math.floor(Number(r.entryPlacement?.order??r.placement?.order)):0}}}function yw(t={},e=0){let r=t&&typeof t=="object"?t:{},s=new Set,n=(Array.isArray(r.columns)&&r.columns.length>0?r.columns:aw(Array.isArray(r.rows)?r.rows:[])).map((l,d)=>iw(l,d,s)),a=Array.isArray(r.rows)?r.rows.map((l,d)=>cw(l,n,d)):[],i=L(r.name||r.title,`\u8868${e+1}`);return{id:Jt(r.id||r.key,e),name:i,note:L(r.note||r.description,""),enabled:r.enabled!==!1,aiInstructions:dw(r.aiInstructions),exportConfig:pw(r.exportConfig,i),columns:n.map(l=>({key:l.key,title:l.title,description:L(l.description,""),type:Hl(l.type),required:l.required===!0})),rows:a}}function py(t={}){let e=t&&typeof t=="object"?t:{},r=Array.isArray(e.lastErrorDetails)?e.lastErrorDetails.map(o=>L(o,"")).filter(Boolean):[],s=e.lastValidationSummary&&typeof e.lastValidationSummary=="object"?{errorCount:Number.isFinite(e.lastValidationSummary.errorCount)?e.lastValidationSummary.errorCount:0,warningCount:Number.isFinite(e.lastValidationSummary.warningCount)?e.lastValidationSummary.warningCount:0}:{errorCount:0,warningCount:0};return{lastStatus:L(e.lastStatus,Ce.IDLE),lastRunAt:Number.isFinite(e.lastRunAt)?e.lastRunAt:0,lastDurationMs:Number.isFinite(e.lastDurationMs)?e.lastDurationMs:0,lastError:L(e.lastError,""),lastErrorDetails:r,lastValidationSummary:s,successCount:Number.isFinite(e.successCount)?e.successCount:0,errorCount:Number.isFinite(e.errorCount)?e.errorCount:0,lastSourceMessageId:L(e.lastSourceMessageId,""),lastSlotRevisionKey:L(e.lastSlotRevisionKey,""),lastLoadMode:L(e.lastLoadMode,""),lastFillMode:L(e.lastFillMode,""),lastMirrorApplied:e.lastMirrorApplied===!0,lastResolvedFromMessageId:L(e.lastResolvedFromMessageId,""),lastResolvedFromRevisionKey:L(e.lastResolvedFromRevisionKey,""),lastSourceKind:L(e.lastSourceKind,""),lastScopeMode:L(e.lastScopeMode,""),lastAutoRunAt:Number.isFinite(e.lastAutoRunAt)?e.lastAutoRunAt:0,lastAutoStatus:L(e.lastAutoStatus,Ce.IDLE),lastAutoMessageId:L(e.lastAutoMessageId,""),lastAutoRevisionKey:L(e.lastAutoRevisionKey,""),lastAutoSkipReason:L(e.lastAutoSkipReason,"")}}function fw(t={}){let e=t&&typeof t=="object"?t:{};return(Array.isArray(e.tables)?e.tables:[]).map((s,o)=>yw(s,o))}function yy(t="",e={},r={}){let s=Hl(e?.type),o=String(t??"").trim(),n=L(r?.label,`${L(r?.tableName,"\u8868\u683C")} / ${L(r?.rowName,"\u884C")} / ${L(e?.title||e?.key,"\u5355\u5143\u683C")}`),a=[],i=[];if(e?.required===!0&&!o&&a.push(`${n} \u4E3A\u5FC5\u586B\uFF0C\u5F53\u524D\u4E3A\u7A7A\u3002`),!o)return{valid:a.length===0,errors:a,warnings:i};if(s==="number"&&!Number.isFinite(Number(o))&&a.push(`${n} \u9700\u8981\u586B\u5199\u6570\u5B57\u3002`),s==="boolean"&&!["true","false","1","0","yes","no"].includes(o.toLowerCase())&&a.push(`${n} \u9700\u8981\u586B\u5199\u5E03\u5C14\u503C\uFF08true / false\uFF09\u3002`),s==="date"&&Number.isNaN(Date.parse(o))&&a.push(`${n} \u9700\u8981\u586B\u5199\u53EF\u89E3\u6790\u7684\u65E5\u671F\u3002`),s==="json")try{JSON.parse(o)}catch(l){a.push(`${n} \u9700\u8981\u586B\u5199\u5408\u6CD5 JSON\uFF1A${l?.message||"\u89E3\u6790\u5931\u8D25"}`)}return{valid:a.length===0,errors:a,warnings:i}}function gw(t={}){let r=fw(t&&typeof t=="object"?t:{}),s=[];return r.forEach((o,n)=>{let a=L(o?.name,`\u8868${n+1}`),i=Array.isArray(o?.columns)?o.columns:[],l=Array.isArray(o?.rows)?o.rows:[];a||s.push(`\u8868 ${n+1} \u7F3A\u5C11\u540D\u79F0\u3002`),i.length===0&&s.push(`${a} \u81F3\u5C11\u9700\u8981\u4E00\u5217\u3002`);let d=new Set;i.forEach((c,u)=>{let p=L(c?.key,""),y=L(c?.title,`\u5217${u+1}`);if(!p){s.push(`${a} / ${y} \u7F3A\u5C11\u5185\u90E8\u540D\u3002`);return}if(d.has(p)){s.push(`${a} \u4E2D\u5B58\u5728\u91CD\u590D\u5217\u5185\u90E8\u540D\uFF1A${p}`);return}d.add(p)}),l.forEach((c,u)=>{let p=L(c?.name,`\u884C${u+1}`),y=c?.cells&&typeof c.cells=="object"&&!Array.isArray(c.cells)?c.cells:{};i.forEach((m,g)=>{let h=L(m?.key,""),x=L(m?.title||h,`\u5217${g+1}`),S=h?Hr(y[h]):"",T=yy(S,m,{label:`${a} / ${p} / ${x}`,tableName:a,rowName:p});s.push(...T.errors)})})}),{valid:s.length===0,errors:s,tables:r}}function po({severity:t="error",message:e="",tableIndex:r=-1,tableName:s="",columnIndex:o=-1,columnKey:n="",rowIndex:a=-1,rowName:i="",cellKey:l=""}={}){return{severity:t,message:L(e,t==="warning"?"\u5B58\u5728\u8B66\u544A\u3002":"\u5B58\u5728\u9519\u8BEF\u3002"),tableIndex:r,tableName:L(s,""),columnIndex:o,columnKey:L(n,""),rowIndex:a,rowName:L(i,""),cellKey:L(l,"")}}function Ra(t={}){let e=gw(t),r=[];if(!e.valid)return{...e,warnings:[],issues:r,summary:{errorCount:e.errors.length,warningCount:0}};let s=Array.isArray(e.tables)?e.tables:[];s.forEach((a,i)=>{let l=L(a?.name,`\u8868${i+1}`),d=Array.isArray(a?.columns)?a.columns:[],c=Array.isArray(a?.rows)?a.rows:[],u=new Set;l||r.push(po({severity:"error",message:`\u8868 ${i+1} \u7F3A\u5C11\u540D\u79F0\u3002`,tableIndex:i,tableName:l})),d.forEach((p,y)=>{let m=L(p?.key,""),g=L(p?.title,`\u5217${y+1}`);m||r.push(po({severity:"error",message:`${l} / ${g} \u7F3A\u5C11\u5185\u90E8\u540D\u3002`,tableIndex:i,tableName:l,columnIndex:y,columnKey:m,cellKey:m})),m&&(u.has(m)&&r.push(po({severity:"error",message:`${l} \u4E2D\u5B58\u5728\u91CD\u590D\u5217\u5185\u90E8\u540D\uFF1A${m}`,tableIndex:i,tableName:l,columnIndex:y,columnKey:m,cellKey:m})),u.add(m))}),c.forEach((p,y)=>{let m=L(p?.name,`\u884C${y+1}`),g=p?.cells&&typeof p.cells=="object"&&!Array.isArray(p.cells)?p.cells:{};Object.keys(g).forEach(x=>{d.some(S=>L(S?.key,"")===x)||r.push(po({severity:"warning",message:`${l} / ${m} \u5305\u542B\u672A\u5B9A\u4E49\u5217 ${x}\uFF0C\u4FDD\u5B58\u540E\u4F1A\u88AB\u5FFD\u7565\u3002`,tableIndex:i,tableName:l,rowIndex:y,rowName:m,cellKey:x}))}),d.forEach((x,S)=>{let T=L(x?.key,""),A=L(x?.title||T,`\u5217${S+1}`),C=T?Hr(g[T]):"",w=yy(C,x,{label:`${l} / ${m} / ${A}`,tableName:l,rowName:m});w.errors.forEach(P=>{r.push(po({severity:"error",message:P,tableIndex:i,tableName:l,columnIndex:S,columnKey:T,rowIndex:y,rowName:m,cellKey:T}))}),w.warnings.forEach(P=>{r.push(po({severity:"warning",message:P,tableIndex:i,tableName:l,columnIndex:S,columnKey:T,rowIndex:y,rowName:m,cellKey:T}))})})})});let o=r.filter(a=>a.severity!=="warning").map(a=>a.message),n=r.filter(a=>a.severity==="warning").map(a=>a.message);return{valid:o.length===0,errors:o,warnings:n,issues:r,tables:s,summary:{errorCount:o.length,warningCount:n.length}}}function fy(){return{tables:ce(uo),promptTemplate:Kl,apiPreset:"",promptPreset:"",bypass:{enabled:!1,presetId:""},activeTemplate:bt,autoUpdateEnabled:!1,autoUpdateTrigger:"assistantMessage",runScope:ht.ENABLED,scope:{mode:ht.ENABLED,selectedTableIds:[],activeTableId:""},fillMode:ka.INCREMENTAL,contextDepth:8,contextRoles:"all",contextExtractTags:[],contextUseGlobalRules:!1,worldbooks:{enabled:!1,selected:[]},sendLatestRows:-1,mirrorToMessage:!1,mirrorTag:"yyt-table-workbench",worldbookSync:{enabled:!1,targetBook:"",entryComment:"YYT-\u586B\u8868\u6570\u636E"},wrapperConfig:{enabled:!0,wrapperTag:"\u6700\u65B0\u6570\u636E\u4E0E\u8BB0\u5F55",wrapperHint:"\u4EE5\u4E0B\u662F\u5728\u8FD9\u4E2A\u65F6\u95F4\u70B9\uFF0C\u5F53\u524D\u573A\u666F\u4E0B\u5267\u60C5\u76F8\u5173\u7684\u6700\u65B0\u6570\u636E\u4E0E\u8BB0\u5F55\uFF0C\u4F60\u5728\u8FDB\u884C\u5267\u60C5\u5206\u6790\u65F6\u5FC5\u987B\u4EE5\u6B64\u6700\u65B0\u7684\u6570\u636E\u4E3A\u51C6\uFF0C\u4EE5\u4E0B\u6570\u636E\u4E0E\u8BB0\u5F55\u7684\u4F18\u5148\u7EA7\u9AD8\u4E8E\u5176\u4ED6\u4EFB\u4F55\u80CC\u666F\u8BBE\u5B9A\uFF1A",wrapperPlacement:{position:"before_character_definition",depth:2,order:0}},tableEnabledOverrides:{},runtime:py()}}function Ft(t={}){let e=fy(),r=t&&typeof t=="object"?t:{},s=r.bypass?r.bypass:r.bypassPresetId?{presetId:r.bypassPresetId,enabled:!!r.bypassPresetId}:void 0,o=uw(s,r.promptPreset),n=ow(r.tables,{seedDefaultWhenMissing:!Object.prototype.hasOwnProperty.call(r,"tables")}),a=r.scope&&typeof r.scope=="object"?r.scope:{},i=typeof r.runScope=="string"&&r.runScope?{...a,mode:r.runScope}:a,l=un(i,{mode:r.runScope,selectedTableIds:r.selectedTableIds,activeTableId:r.activeTableId}),d=ur(r.autoUpdateEnabled!==void 0?r.autoUpdateEnabled:r.automation?.enabled,e.autoUpdateEnabled);return{tables:n,promptTemplate:L(r.promptTemplate,e.promptTemplate),apiPreset:L(r.apiPreset,""),promptPreset:o.presetId,bypass:o,activeTemplate:L(r.activeTemplate,e.activeTemplate),autoUpdateEnabled:d,autoUpdateTrigger:L(r.autoUpdateTrigger,e.autoUpdateTrigger),runScope:l.mode,scope:l,fillMode:r.fillMode===ka.FULL?ka.FULL:e.fillMode,contextDepth:Number.isFinite(Number(r.contextDepth))&&Number(r.contextDepth)>0?Math.floor(Number(r.contextDepth)):e.contextDepth,contextRoles:r.contextRoles==="assistant_only"?"assistant_only":"all",contextExtractTags:Array.isArray(r.contextExtractTags)?r.contextExtractTags.filter(c=>typeof c=="string"&&c.trim()):typeof r.contextExtractTags=="string"&&r.contextExtractTags.trim()?r.contextExtractTags.split(`
`).map(c=>c.trim()).filter(Boolean):[],contextUseGlobalRules:ur(r.contextUseGlobalRules??r.contextUseExtractRules??r.contextUseExcludeRules,!1),extraction:{regexPresetId:L(r.extraction?.regexPresetId,"")},worldbooks:{enabled:ur(r.worldbooks?.enabled,!1),selected:Array.isArray(r.worldbooks?.selected)?r.worldbooks.selected.filter(c=>typeof c=="string"&&c.trim()):[],presetId:L(r.worldbooks?.presetId,"")},sendLatestRows:Number.isFinite(Number(r.sendLatestRows))?Math.floor(Number(r.sendLatestRows)):-1,mirrorToMessage:ur(r.mirrorToMessage,e.mirrorToMessage),mirrorTag:L(r.mirrorTag,e.mirrorTag),worldbookSync:{enabled:ur(r.worldbookSync?.enabled,!1),targetBook:L(r.worldbookSync?.targetBook,""),entryComment:L(r.worldbookSync?.entryComment,e.worldbookSync.entryComment),wrapperConfig:r.worldbookSync?.wrapperConfig?{enabled:ur(r.worldbookSync.wrapperConfig?.enabled,!0),wrapperTag:L(r.worldbookSync.wrapperConfig?.wrapperTag,e.wrapperConfig.wrapperTag),wrapperHint:L(r.worldbookSync.wrapperConfig?.wrapperHint,""),wrapperPlacement:{position:L(r.worldbookSync.wrapperConfig?.wrapperPlacement?.position,e.wrapperConfig.wrapperPlacement.position),depth:Number.isFinite(Number(r.worldbookSync.wrapperConfig?.wrapperPlacement?.depth))?Math.floor(Number(r.worldbookSync.wrapperConfig?.wrapperPlacement?.depth)):e.wrapperConfig.wrapperPlacement.depth,order:Number.isFinite(Number(r.worldbookSync.wrapperConfig?.wrapperPlacement?.order))?Math.floor(Number(r.worldbookSync.wrapperConfig?.wrapperPlacement?.order)):e.wrapperConfig.wrapperPlacement.order}}:void 0},wrapperConfig:{enabled:ur(r.wrapperConfig?.enabled,e.wrapperConfig.enabled),wrapperTag:L(r.wrapperConfig?.wrapperTag,e.wrapperConfig.wrapperTag),wrapperHint:L(r.wrapperConfig?.wrapperHint,e.wrapperConfig.wrapperHint),wrapperPlacement:{position:L(r.wrapperConfig?.wrapperPlacement?.position,e.wrapperConfig.wrapperPlacement.position),depth:Number.isFinite(Number(r.wrapperConfig?.wrapperPlacement?.depth))?Math.floor(Number(r.wrapperConfig?.wrapperPlacement?.depth)):e.wrapperConfig.wrapperPlacement.depth,order:Number.isFinite(Number(r.wrapperConfig?.wrapperPlacement?.order))?Math.floor(Number(r.wrapperConfig?.wrapperPlacement?.order)):e.wrapperConfig.wrapperPlacement.order}},tableEnabledOverrides:r.tableEnabledOverrides&&typeof r.tableEnabledOverrides=="object"&&!Array.isArray(r.tableEnabledOverrides)?Object.fromEntries(Object.entries(r.tableEnabledOverrides).filter(([c,u])=>typeof c=="string"&&c&&typeof u=="boolean")):{},runtime:py({...e.runtime,...r.runtime||{}})}}function Gl(t={}){let e=Ft(t),r=[];return Array.isArray(e.tables)||r.push("\u8868\u5B9A\u4E49\u5FC5\u987B\u662F JSON \u6570\u7EC4\u3002"),e.promptTemplate||r.push("\u586B\u8868 Prompt \u4E0D\u80FD\u4E3A\u7A7A\u3002"),e.mirrorTag||r.push("\u6B63\u6587\u955C\u50CF\u6807\u7B7E\u4E0D\u80FD\u4E3A\u7A7A\u3002"),{valid:r.length===0,errors:r,config:e}}function Pe(){let t=Fl.get(jl,fy()),e=Ft(t),r=zl();return{...ny(e,r),guide:r}}function mw(t){let r=(Array.isArray(t?.tables)?t.tables:[]).map(s=>({...s,rows:[]}));return{...t,tables:r}}function ut(t={}){let e=Pe(),r=Ft({...e,...t||{},runtime:t?.runtime===void 0?e.runtime:t.runtime}),s=Gl(r);if(!s.valid)return{success:!1,error:s.errors.join(`
`),errors:s.errors,config:s.config};let o=mw(s.config);return Fl.set(jl,o),oy({templateId:s.config.activeTemplate,scope:s.config.scope,worldbookSync:s.config.worldbookSync}),{success:!0,config:s.config}}function gy(t={}){let e=Pe(),r=Ft({...e,runtime:{...e.runtime,...t||{}}});return Fl.set(jl,r),r.runtime}function hw(t={},e={}){let r=Ft(t),s=L(r.promptTemplate,Kl);return e.skipResponseContract?s.trim():`${s}

${iy}`.trim()}function my(t={},e={}){let r=Ft(t);return{id:"tableWorkbench",name:"\u586B\u8868\u5DE5\u4F5C\u53F0",promptTemplate:hw(r,e),bypass:{enabled:r.bypass?.enabled===!0,presetId:r.bypass?.presetId||r.promptPreset||""}}}var Fl,jl,dr=D(()=>{je();He();yo();Ca();ay();cy();uy();Fl=$.namespace("tableWorkbench"),jl="config"});function Yl(){return ql||(ql=E.createScope("TableIsolation")),ql}var hy,by,ql,Vl,de,qr=D(()=>{je();H();He();hy="tableEngine.isolation",by=Object.freeze({enabled:!1,key:St});Vl=class{constructor(){this._cache=null,this._subscribers=new Set}getState(){if(this._cache)return this._cache;let e=$.get(hy,null);return this._cache=this._normalize(e),this._cache}isEnabled(){return this.getState().enabled===!0}getKey(){let e=this.getState();return e.enabled?e.key||St:St}getConfiguredKey(){return this.getState().key}setEnabled(e){let r=this._normalize({...this.getState(),enabled:!!e});this._commit(r,{reason:"enabled"})}setKey(e){let r=this._normalize({...this.getState(),key:e});this._commit(r,{reason:"key"})}updateState(e={}){let r=this.getState(),s=this._normalize({enabled:e.enabled!==void 0?!!e.enabled:r.enabled,key:e.key!==void 0?e.key:r.key});this._commit(s,{reason:"patch"})}reset(){this._commit({...by},{reason:"reset"})}getScopeKey(e){return dn(e,this.getKey())}subscribe(e){return typeof e!="function"?()=>{}:(this._subscribers.add(e),()=>this._subscribers.delete(e))}_normalize(e){return!e||typeof e!="object"?{...by}:{enabled:e.enabled===!0,key:Ae(e.key)}}_commit(e,r={}){let s=this.getState();if(s.enabled===e.enabled&&s.key===e.key)return;this._cache=e;try{$.set(hy,e)}catch(n){Yl().error("isolation \u72B6\u6001\u843D\u76D8\u5931\u8D25",n)}Yl().info("isolation \u72B6\u6001\u53D8\u5316",{prev:s,next:e,reason:r.reason||""});let o={...e,prev:s,reason:r.reason||""};for(let n of this._subscribers)try{n(o)}catch(a){Yl().error("isolation \u8BA2\u9605\u8005\u56DE\u8C03\u5F02\u5E38",a)}}},de=new Vl});var xy={};ae(xy,{AuthorityProvider:()=>Ma,default:()=>xw});var fo,Jl,bw,Yr,Ma,xw,wy=D(()=>{H();mo();fo=E.createScope("AuthorityProvider"),Jl="third-party/youyou-toolkit",bw="YouYou Toolkit",Yr="main",Ma=class{constructor({extensionVersion:e="1.0.149"}={}){this.kind=go.AUTHORITY,this._client=null,this._extensionVersion=e,this._initialized=!1}async init(){let e=Pa();if(!e)return fo.error("\u672A\u68C0\u6D4B\u5230 window.STAuthority.AuthoritySDK"),!1;try{return this._client=await e.init({extensionId:Jl,displayName:bw,version:this._extensionVersion,installType:"local",declaredPermissions:{sql:{private:!0}}}),this._initialized=!0,fo.info("AuthorityProvider \u521D\u59CB\u5316\u6210\u529F",{extensionId:Jl}),!0}catch(r){return fo.error("AuthorityProvider \u521D\u59CB\u5316\u5931\u8D25",{error:r?.message||r}),this._initialized=!1,!1}}async dispose(){this._client=null,this._initialized=!1}async migrate({migrations:e,database:r=Yr,tableName:s}={}){this._ensureReady();let o={database:r,migrations:e};s&&(o.tableName=s);let n=await this._client.sql.migrate(o);return{applied:n?.applied||[],skipped:n?.skipped||[],tableName:n?.tableName,latestId:n?.latestId}}async query({statement:e,params:r=[],database:s=Yr,page:o=void 0}={}){this._ensureReady();let n={database:s,statement:e,params:r};o&&(n.page=o);let a=await this._client.sql.query(n);return{columns:a.columns||[],rows:a.rows||[],rowCount:a.rowCount??(a.rows?.length||0),page:a.page}}async execute({statement:e,params:r=[],database:s=Yr}={}){this._ensureReady();let o=await this._client.sql.exec({database:s,statement:e,params:r});return{rowsAffected:o.rowsAffected??0,lastInsertRowid:o.lastInsertRowid??null}}async batch({statements:e,database:r=Yr}={}){this._ensureReady();let s=(e||[]).map(n=>({mode:n.mode||(/^\s*SELECT/i.test(n.statement)?"query":"exec"),statement:n.statement,params:n.params||[]}));return{results:(await this._client.sql.batch({database:r,statements:s}))?.results||[]}}async transaction({statements:e,database:r=Yr}={}){this._ensureReady();let s=(e||[]).map(n=>({mode:n.mode||(/^\s*SELECT/i.test(n.statement)?"query":"exec"),statement:n.statement,params:n.params||[]})),o=await this._client.sql.transaction({database:r,statements:s});return{committed:!!o?.committed,results:o?.results||[]}}async paginate({statement:e,params:r=[],database:s=Yr,page:o={}}={}){return this._ensureReady(),this.query({statement:e,params:r,database:s,page:o})}async pageAll({statement:e,params:r=[],database:s=Yr,pageSize:o=200,maxPages:n}={}){this._ensureReady();let a=await this._client.sql.pageAll({database:s,statement:e,params:r},{pageSize:o,maxPages:n});return{columns:a.columns||[],rows:a.rows||[],rowCount:a.rowCount??(a.rows?.length||0)}}async backup(){return fo.warn("backup() \u6682\u672A\u5B9E\u73B0\uFF0CAuthorityProvider \u8D70 Authority \u5185\u7F6E\u5907\u4EFD"),{kind:"authority",timestamp:Date.now()}}async export(){return fo.warn("export() \u6682\u672A\u5B9E\u73B0\uFF0CAuthorityProvider \u8D70 Authority \u5185\u7F6E\u5BFC\u51FA"),{kind:"authority",timestamp:Date.now()}}async import(){fo.warn("import() \u6682\u672A\u5B9E\u73B0\uFF0CAuthorityProvider \u8D70 Authority \u5185\u7F6E\u5BFC\u5165")}describe(){return{kind:this.kind,initialized:this._initialized,extensionId:Jl,database:Yr,hasClient:!!this._client}}_ensureReady(){if(!this._initialized||!this._client)throw new Error("AuthorityProvider \u5C1A\u672A\u521D\u59CB\u5316")}},xw=Ma});var Ty={};ae(Ty,{FallbackProvider:()=>Na,default:()=>Cw});function ww(t){let e=[],r=0,s="";for(let o of t)o==="("?r+=1:o===")"&&(r-=1),o===","&&r===0?(s.trim()&&e.push(s),s=""):s+=o;return s.trim()&&e.push(s),e}function vw(t){let e=t.match(/^\s*CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?(\w+)\s*\(([\s\S]+)\)\s*$/i);if(!e)return null;let r=e[1],s=e[2],o=ww(s),n=[],a=[];for(let i of o){let l=i.trim(),d=l.match(/^PRIMARY\s+KEY\s*\(([^)]+)\)$/i);if(d){a=d[1].split(",").map(u=>u.trim());continue}let c=l.match(/^(\w+)\s+(\w+)/);c&&(n.push({name:c[1],type:c[2].toUpperCase(),raw:l}),/PRIMARY\s+KEY/i.test(l)&&!a.length&&(a=[c[1]]))}return{name:r,columns:n,pkCols:a}}function Tw(t){let e=t.match(/^\s*INSERT\s+(?:OR\s+REPLACE\s+)?INTO\s+(\w+)(?:\s*\(([^)]+)\))?\s+VALUES\s*\(([^)]+)\)\s*$/i);if(!e)return null;let r=e[1],s=e[2]?e[2].split(",").map(n=>n.trim()):null,o=(e[3].match(/\?/g)||[]).length;return{name:r,cols:s,paramCount:o}}function Zl(t){let e=t.split(/\s+AND\s+/i),r=[];for(let s of e){let o=s.match(/^\s*(\w+)\s*(=|!=|<>|>=|<=|>|<)\s*\?\s*$/);if(o){let a=o[2]==="<>"?"!=":o[2];r.push({col:o[1],op:a,placeholder:!0});continue}let n=s.match(/^\s*(\w+)\s+IS\s+(NOT\s+)?NULL\s*$/i);if(n){r.push({col:n[1],op:n[2]?"IS NOT NULL":"IS NULL",placeholder:!1});continue}throw new Error(`FallbackProvider \u4E0D\u652F\u6301\u7684 WHERE \u5B50\u53E5: "${s}"`)}return r}function Sw(t){let e=t.match(/^\s*SELECT\s+([\s\S]+?)\s+FROM\s+(\w+)([\s\S]*)$/i);if(!e)return null;let r=e[1].trim(),s=e[2],o=e[3],n=o.match(/\bWHERE\s+([\s\S]+?)(?=\bORDER\s+BY\b|\bLIMIT\b|\bOFFSET\b|$)/i),a=o.match(/\bORDER\s+BY\s+(\w+)\s*(ASC|DESC)?/i),i=o.match(/\bLIMIT\s+(\d+)/i),l=o.match(/\bOFFSET\s+(\d+)/i);return{name:s,cols:r==="*"?null:r.split(",").map(d=>d.trim()),where:n?Zl(n[1].trim()):null,orderBy:a?{col:a[1],dir:(a[2]||"ASC").toUpperCase()}:null,limit:i?parseInt(i[1],10):null,offset:l?parseInt(l[1],10):null}}function _w(t){let e=t.match(/^\s*UPDATE\s+(\w+)\s+SET\s+([\s\S]+?)(?:\s+WHERE\s+([\s\S]+))?\s*$/i);if(!e)return null;let r=e[1],s=e[2],o=e[3],n=s.split(",").map(a=>{let i=a.trim().match(/^(\w+)\s*=\s*\?$/);if(!i)throw new Error(`FallbackProvider \u4E0D\u652F\u6301\u7684 SET \u5B50\u53E5: "${a}"`);return i[1]});return{name:r,setCols:n,where:o?Zl(o.trim()):null}}function Ew(t){let e=t.match(/^\s*DELETE\s+FROM\s+(\w+)(?:\s+WHERE\s+([\s\S]+))?\s*$/i);return e?{name:e[1],where:e[2]?Zl(e[2].trim()):null}:null}function Ql(t,e){return t===e?!0:t==null?e==null:e==null?!1:typeof t=="number"||typeof e=="number"?Number(t)===Number(e):String(t)===String(e)}function yn(t,e){return t===e?0:t==null?-1:e==null?1:typeof t=="number"&&typeof e=="number"?t-e:String(t)<String(e)?-1:1}function Aw(t,e,r){let s=t[e.col];if(e.op==="IS NULL")return s==null;if(e.op==="IS NOT NULL")return s!=null;let o=r.shift();switch(e.op){case"=":return Ql(s,o);case"!=":return!Ql(s,o);case">":return yn(s,o)>0;case"<":return yn(s,o)<0;case">=":return yn(s,o)>=0;case"<=":return yn(s,o)<=0;default:return!1}}function Xl(t,e,r){if(!e||!e.length)return!0;let s=Array.isArray(r)?[...r]:[];for(let o of e)if(!Aw(t,o,s))return!1;return!0}var ho,vy,Na,Cw,Sy=D(()=>{H();je();mo();ho=E.createScope("FallbackProvider"),vy="provider_fallback_v1";Na=class{constructor(){this.kind=go.FALLBACK,this._tables=new Map,this._migrations=new Set,this._initialized=!1,this._dirty=!1,this._saveTimer=null}async init(){try{let e=Se.get(vy)||{};this._migrations=new Set(Array.isArray(e.migrations)?e.migrations:[]),this._tables=new Map;for(let[r,s]of Object.entries(e.tables||{}))this._tables.set(r,{schema:s.schema||{name:r,columns:[],pkCols:[]},rows:Array.isArray(s.rows)?s.rows:[]});return this._initialized=!0,ho.info("FallbackProvider \u521D\u59CB\u5316\u5B8C\u6210",{tables:this._tables.size,migrations:this._migrations.size}),!0}catch(e){return ho.error("FallbackProvider \u521D\u59CB\u5316\u5931\u8D25",{error:e?.message||e}),this._initialized=!1,!1}}async dispose(){this._flushSave(!0),this._tables.clear(),this._migrations.clear(),this._initialized=!1}async migrate({migrations:e}={}){this._ensureReady();let r=[],s=[];for(let o of e||[]){if(!o?.id||!o?.statement)continue;if(this._migrations.has(o.id)){s.push(o.id);continue}let n=o.statement.trim();if(/^CREATE\s+TABLE/i.test(n)){let a=vw(n);if(!a)throw new Error(`\u65E0\u6CD5\u89E3\u6790 CREATE TABLE: ${n}`);this._tables.has(a.name)||this._tables.set(a.name,{schema:a,rows:[]})}else if(!/^CREATE\s+(UNIQUE\s+)?INDEX/i.test(n))if(/^DROP\s+TABLE/i.test(n)){let a=n.match(/^DROP\s+TABLE\s+(?:IF\s+EXISTS\s+)?(\w+)/i);a&&this._tables.delete(a[1])}else/^ALTER\s+TABLE/i.test(n)?ho.warn("FallbackProvider \u4E0D\u652F\u6301 ALTER TABLE\uFF0C\u8DF3\u8FC7",{id:o.id}):ho.warn("FallbackProvider \u8DF3\u8FC7\u672A\u8BC6\u522B DDL",{id:o.id,statement:n});this._migrations.add(o.id),r.push(o.id)}return this._markDirty(),{applied:r,skipped:s}}async query({statement:e,params:r=[]}={}){this._ensureReady();let s=Sw(e);if(!s)throw new Error(`\u65E0\u6CD5\u89E3\u6790 SELECT: ${e}`);let o=this._tables.get(s.name);if(!o)return{columns:s.cols||[],rows:[],rowCount:0};let n=o.rows.filter(l=>Xl(l,s.where,r));if(s.orderBy){let l=s.orderBy.dir==="DESC"?-1:1;n=[...n].sort((d,c)=>yn(d[s.orderBy.col],c[s.orderBy.col])*l)}s.offset&&(n=n.slice(s.offset)),Number.isFinite(s.limit)&&(n=n.slice(0,s.limit));let a,i=n;return s.cols?(i=n.map(l=>{let d={};for(let c of s.cols)d[c]=l[c]===void 0?null:l[c];return d}),a=s.cols):a=o.schema?.columns?.map(l=>l.name)||(i[0]?Object.keys(i[0]):[]),{columns:a,rows:i,rowCount:i.length}}async execute({statement:e,params:r=[]}={}){this._ensureReady();let s=String(e||"").trim(),o=s.split(/\s+/)[0].toUpperCase(),n;if(o==="INSERT")n=this._doInsert(s,r);else if(o==="UPDATE")n=this._doUpdate(s,r);else if(o==="DELETE")n=this._doDelete(s,r);else throw new Error(`FallbackProvider \u4E0D\u652F\u6301\u7684 execute \u8BED\u53E5: ${e}`);return n}_doInsert(e,r){let s=Tw(e);if(!s)throw new Error(`\u65E0\u6CD5\u89E3\u6790 INSERT: ${e}`);let o=this._tables.get(s.name);if(!o)throw new Error(`\u8868\u4E0D\u5B58\u5728: ${s.name}`);let n=s.cols||(o.schema.columns||[]).map(d=>d.name);if(!n.length)throw new Error(`\u8868 ${s.name} \u65E0\u5217\u5B9A\u4E49`);if(r.length!==n.length)throw new Error(`INSERT \u53C2\u6570\u6570\u91CF\u4E0D\u5339\u914D (\u671F\u671B ${n.length}, \u5B9E\u9645 ${r.length})`);let a={};for(let d=0;d<n.length;d+=1)a[n[d]]=r[d];let i=o.schema?.pkCols||[],l=/^INSERT\s+OR\s+REPLACE/i.test(e);if(i.length){let d=o.rows.findIndex(c=>i.every(u=>Ql(c[u],a[u])));if(d>=0){if(l)return o.rows[d]=a,this._markDirty(),{rowsAffected:1,lastInsertRowid:d+1};throw new Error(`PRIMARY KEY \u51B2\u7A81 (${i.join(",")})`)}}return o.rows.push(a),this._markDirty(),{rowsAffected:1,lastInsertRowid:o.rows.length}}_doUpdate(e,r){let s=_w(e);if(!s)throw new Error(`\u65E0\u6CD5\u89E3\u6790 UPDATE: ${e}`);let o=this._tables.get(s.name);if(!o)return{rowsAffected:0,lastInsertRowid:null};let n=s.setCols.length;if(r.length<n)throw new Error(`UPDATE \u53C2\u6570\u4E0D\u8DB3 (SET \u9700\u8981 ${n}, \u5B9E\u9645 ${r.length})`);let a=r.slice(0,n),i=r.slice(n),l=0;for(let d of o.rows)if(Xl(d,s.where,i)){for(let c=0;c<n;c+=1)d[s.setCols[c]]=a[c];l+=1}return l>0&&this._markDirty(),{rowsAffected:l,lastInsertRowid:null}}_doDelete(e,r){let s=Ew(e);if(!s)throw new Error(`\u65E0\u6CD5\u89E3\u6790 DELETE: ${e}`);let o=this._tables.get(s.name);if(!o)return{rowsAffected:0,lastInsertRowid:null};let n=o.rows.length;o.rows=o.rows.filter(i=>!Xl(i,s.where,r));let a=n-o.rows.length;return a>0&&this._markDirty(),{rowsAffected:a,lastInsertRowid:null}}async batch({statements:e}={}){this._ensureReady();let r=[];for(let s of e||[])if(String(s.statement||"").trim().split(/\s+/)[0].toUpperCase()==="SELECT"){let n=await this.query(s);r.push({kind:"query",...n})}else{let n=await this.execute(s);r.push({kind:"exec",...n})}return{results:r}}async transaction({statements:e}={}){this._ensureReady();let r=this._snapshot();try{let{results:s}=await this.batch({statements:e});return this._flushSave(!0),{committed:!0,results:s}}catch(s){throw this._restore(r),ho.warn("FallbackProvider \u4E8B\u52A1\u56DE\u6EDA",{error:s?.message||s}),s}}async paginate({statement:e,params:r=[],page:s={}}={}){this._ensureReady();let o=Number.isFinite(s?.limit)?s.limit:50,n=Number.isFinite(s?.offset)?s.offset:0,a=`${e} LIMIT ${o} OFFSET ${n}`;return this.query({statement:a,params:r})}async backup(){return this._ensureReady(),this._snapshot()}async export(){return this.backup()}async import(e){this._ensureReady(),this._restore(e||{}),this._markDirty(),this._flushSave(!0)}describe(){return{kind:this.kind,initialized:this._initialized,tables:this._tables.size,migrations:this._migrations.size,tableNames:[...this._tables.keys()]}}_snapshot(){let e={};for(let[r,s]of this._tables)e[r]={schema:s.schema,rows:JSON.parse(JSON.stringify(s.rows))};return{migrations:[...this._migrations],tables:e}}_restore(e){this._migrations=new Set(Array.isArray(e?.migrations)?e.migrations:[]),this._tables=new Map;for(let[r,s]of Object.entries(e?.tables||{}))this._tables.set(r,{schema:s.schema||{name:r,columns:[],pkCols:[]},rows:Array.isArray(s.rows)?s.rows:[]})}_markDirty(){this._dirty=!0,this._saveTimer&&clearTimeout(this._saveTimer),this._saveTimer=setTimeout(()=>this._flushSave(!1),300)}_flushSave(e){if(this._saveTimer&&(clearTimeout(this._saveTimer),this._saveTimer=null),!(!this._dirty&&!e))try{Se.set(vy,this._snapshot()),this._dirty=!1}catch(r){ho.error("FallbackProvider \u6301\u4E45\u5316\u5931\u8D25",{error:r?.message||r})}}_ensureReady(){if(!this._initialized)throw new Error("FallbackProvider \u5C1A\u672A\u521D\u59CB\u5316")}},Cw=Na});var _y={};ae(_y,{PROVIDER_KIND:()=>go,createProvider:()=>kw,detectAuthoritySdk:()=>Pa,disposeToolDataProvider:()=>Iw,getCurrentProvider:()=>bo,getToolDataProvider:()=>gn});function Pa(){if(typeof window>"u")return null;try{let t=window.STAuthority?.AuthoritySDK;if(t)return t}catch{}try{if(window.parent&&window.parent!==window){let t=window.parent.STAuthority?.AuthoritySDK;if(t)return t}}catch{}return null}async function tc({preferAuthority:t=!0,extensionVersion:e="1.0.149"}={}){if(t&&Pa()){let{AuthorityProvider:s}=await Promise.resolve().then(()=>(wy(),xy));return new s({extensionVersion:e})}let{FallbackProvider:r}=await Promise.resolve().then(()=>(Sy(),Ty));return new r}async function gn(t={}){return Rs||fn||(fn=(async()=>{let e=await tc({preferAuthority:!0,...t}),r=await e.init();if(!r&&e.kind===go.AUTHORITY){ec.warn("AuthorityProvider \u521D\u59CB\u5316\u5931\u8D25\uFF0C\u964D\u7EA7\u5230 FallbackProvider");try{await e.dispose()}catch{}e=await tc({preferAuthority:!1}),r=await e.init()}return r?ec.info(`Provider \u521D\u59CB\u5316\u5B8C\u6210: kind=${e.kind}`):ec.error(`Provider \u5168\u90E8\u521D\u59CB\u5316\u5931\u8D25 (kind=${e.kind})`),Rs=e,e})(),fn)}function bo(){return Rs}async function kw(t={}){let e=await tc(t);return await e.init(),e}async function Iw(){if(Rs){try{await Rs.dispose()}catch{}Rs=null}fn=null}var ec,go,Rs,fn,mo=D(()=>{H();ec=E.createScope("ToolDataProvider"),go=Object.freeze({AUTHORITY:"authority",FALLBACK:"fallback"}),Rs=null,fn=null});var lc={};ae(lc,{clearChatScopeConfig:()=>By,clearLockEntry:()=>Ny,clearScopeLocks:()=>Ly,clearSheetLocks:()=>Dy,clearSlot:()=>Ry,commitSlotTables:()=>$a,default:()=>Mw,deleteRowsBySheet:()=>ky,deleteSheetsBySlot:()=>Oa,ensureTableDataReady:()=>Ye,getChatScopeConfig:()=>Oy,getCurrentTableDataProvider:()=>Ay,getLocksForSheet:()=>My,getRowsBySheet:()=>ic,getSheetsBySlot:()=>nc,loadSlotTables:()=>Iy,setChatScopeConfig:()=>$y,setLockEntry:()=>Py,upsertSheetMeta:()=>oc,upsertSheetRows:()=>ac});function sc(){return rc||(rc=E.createScope("TableDataService")),rc}async function Ye(){return Ey?bo():mn||(mn=(async()=>{try{let t=await gn();if(!t)return sc().error("Provider \u4E0D\u53EF\u7528\uFF0C\u8DF3\u8FC7 migration"),null;let e=await t.migrate({migrations:[...Rw]});return Ey=!0,sc().info("\u8868\u683C\u6570\u636E migration \u5B8C\u6210",{kind:t.kind,applied:e?.applied?.length||0,skipped:e?.skipped?.length||0}),t}catch(t){return sc().error("table-data-service migration \u5931\u8D25",t),null}finally{mn=null}})(),mn)}function Ay(){return bo()}function Cy(){return Date.now()}function Da(t){try{return JSON.stringify(t)}catch{return"{}"}}function La(t,e=null){if(typeof t!="string")return e;try{return JSON.parse(t)}catch{return e}}function Vr(t={}){return{chatId:String(t.chatId??"").trim(),messageId:String(t.messageId??"").trim(),swipeId:String(t.swipeId??"0").trim()||"0",isolationKey:Ae(t.isolationKey)}}function Jr(t){return t&&t.chatId&&t.messageId}async function oc(t,e){let r=await Ye();if(!r)return!1;let s=Vr(t);return!Jr(s)||!e?.uid?!1:(await r.execute({statement:`INSERT INTO table_sheets
      (chat_id, message_id, swipe_id, isolation_key, sheet_uid, name, columns_json, meta_json, order_no, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,params:[s.chatId,s.messageId,s.swipeId,s.isolationKey,String(e.uid),String(e.name??e.uid),Da(Array.isArray(e.columns)?e.columns:[]),Da(e.meta||e.sourceData||{}),Number.isFinite(e.orderNo)?e.orderNo:0,Cy()]}),!0)}async function nc(t){let e=await Ye();if(!e)return[];let r=Vr(t);return Jr(r)?((await e.query({statement:`SELECT * FROM table_sheets
      WHERE chat_id = ? AND message_id = ? AND swipe_id = ? AND isolation_key = ?
      ORDER BY order_no ASC`,params:[r.chatId,r.messageId,r.swipeId,r.isolationKey]}))?.rows||[]).map(o=>({uid:o.sheet_uid,name:o.name,columns:La(o.columns_json,[]),meta:La(o.meta_json,{}),orderNo:o.order_no||0,updatedAt:o.updated_at||0})):[]}async function Oa(t){let e=await Ye();if(!e)return 0;let r=Vr(t);return Jr(r)&&(await e.execute({statement:`DELETE FROM table_sheets
      WHERE chat_id = ? AND message_id = ? AND swipe_id = ? AND isolation_key = ?`,params:[r.chatId,r.messageId,r.swipeId,r.isolationKey]}))?.rowsAffected||0}async function ac(t,e,r){let s=await Ye();if(!s)return!1;let o=Vr(t);if(!Jr(o)||!e||!Array.isArray(r))return!1;if(await s.execute({statement:`DELETE FROM table_rows
      WHERE chat_id = ? AND message_id = ? AND swipe_id = ? AND isolation_key = ? AND sheet_uid = ?`,params:[o.chatId,o.messageId,o.swipeId,o.isolationKey,String(e)]}),r.length===0)return!0;let n=r.map((a,i)=>({statement:`INSERT INTO table_rows
      (chat_id, message_id, swipe_id, isolation_key, sheet_uid, row_index, row_id, row_name, cells_json)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,params:[o.chatId,o.messageId,o.swipeId,o.isolationKey,String(e),i,String(a?.id??""),String(a?.name??""),Da(a?.cells||{})]}));return typeof s.transaction=="function"?await s.transaction({statements:n}):await s.batch({statements:n}),!0}async function ic(t,e){let r=await Ye();if(!r)return[];let s=Vr(t);return!Jr(s)||!e?[]:((await r.query({statement:`SELECT * FROM table_rows
      WHERE chat_id = ? AND message_id = ? AND swipe_id = ? AND isolation_key = ? AND sheet_uid = ?
      ORDER BY row_index ASC`,params:[s.chatId,s.messageId,s.swipeId,s.isolationKey,String(e)]}))?.rows||[]).map(n=>({id:n.row_id||"",name:n.row_name||"",cells:La(n.cells_json,{}),rowIndex:n.row_index}))}async function ky(t,e){let r=await Ye();if(!r)return 0;let s=Vr(t);return!Jr(s)||!e?0:(await r.execute({statement:`DELETE FROM table_rows
      WHERE chat_id = ? AND message_id = ? AND swipe_id = ? AND isolation_key = ? AND sheet_uid = ?`,params:[s.chatId,s.messageId,s.swipeId,s.isolationKey,String(e)]}))?.rowsAffected||0}async function Iy(t){let e=await nc(t);if(e.length===0)return[];let r=[];for(let s of e){let o=await ic(t,s.uid);r.push({id:s.uid,uid:s.uid,name:s.name,columns:s.columns,rows:o,meta:s.meta,orderNo:s.orderNo,updatedAt:s.updatedAt})}return r}async function $a(t,e){let r=await Ye();if(!r)return!1;let s=Vr(t);if(!Jr(s)||!Array.isArray(e))return!1;await Oa(s),await r.execute({statement:`DELETE FROM table_rows
      WHERE chat_id = ? AND message_id = ? AND swipe_id = ? AND isolation_key = ?`,params:[s.chatId,s.messageId,s.swipeId,s.isolationKey]});for(let o=0;o<e.length;o++){let n=e[o],a=String(n?.uid||n?.id||`sheet_${o+1}`);await oc(s,{uid:a,name:n?.name||a,columns:n?.columns||[],meta:n?.meta||{},orderNo:Number.isFinite(n?.orderNo)?n.orderNo:o}),await ac(s,a,Array.isArray(n?.rows)?n.rows:[])}return!0}async function Ry(t){let e=await Ye();if(!e)return!1;let r=Vr(t);return Jr(r)?(await Oa(r),await e.execute({statement:`DELETE FROM table_rows
      WHERE chat_id = ? AND message_id = ? AND swipe_id = ? AND isolation_key = ?`,params:[r.chatId,r.messageId,r.swipeId,r.isolationKey]}),!0):!1}async function My(t,e){let r=await Ye();if(!r)return[];let s=String(t?.chatId??"").trim(),o=Ae(t?.isolationKey);return!s||!e?[]:((await r.query({statement:`SELECT lock_type, target FROM table_locks
      WHERE chat_id = ? AND isolation_key = ? AND sheet_uid = ?`,params:[s,o,String(e)]}))?.rows||[]).map(a=>({lockType:a.lock_type,target:a.target||""}))}async function Py(t,e,r,s=""){let o=await Ye();if(!o)return!1;let n=String(t?.chatId??"").trim(),a=Ae(t?.isolationKey);return!n||!e||!r?!1:(await o.execute({statement:"INSERT INTO table_locks (chat_id, isolation_key, sheet_uid, lock_type, target) VALUES (?, ?, ?, ?, ?)",params:[n,a,String(e),String(r),String(s)]}),!0)}async function Ny(t,e,r,s=""){let o=await Ye();if(!o)return!1;let n=String(t?.chatId??"").trim(),a=Ae(t?.isolationKey);return!n||!e||!r?!1:(await o.execute({statement:`DELETE FROM table_locks
      WHERE chat_id = ? AND isolation_key = ? AND sheet_uid = ? AND lock_type = ? AND target = ?`,params:[n,a,String(e),String(r),String(s)]}),!0)}async function Dy(t,e){let r=await Ye();if(!r)return!1;let s=String(t?.chatId??"").trim(),o=Ae(t?.isolationKey);return!s||!e?!1:(await r.execute({statement:`DELETE FROM table_locks
      WHERE chat_id = ? AND isolation_key = ? AND sheet_uid = ?`,params:[s,o,String(e)]}),!0)}async function Ly(t){let e=await Ye();if(!e)return!1;let r=String(t?.chatId??"").trim(),s=Ae(t?.isolationKey);return r?(await e.execute({statement:"DELETE FROM table_locks WHERE chat_id = ? AND isolation_key = ?",params:[r,s]}),!0):!1}async function Oy(t){let e=await Ye();if(!e)return null;let r=String(t??"").trim();if(!r)return null;let o=(await e.query({statement:"SELECT scoped_config_json FROM table_chat_scope WHERE chat_id = ?",params:[r]}))?.rows?.[0];return o?La(o.scoped_config_json,null):null}async function $y(t,e){let r=await Ye();if(!r)return!1;let s=String(t??"").trim();return s?(await r.execute({statement:"INSERT INTO table_chat_scope (chat_id, scoped_config_json, updated_at) VALUES (?, ?, ?)",params:[s,Da(e||{}),Cy()]}),!0):!1}async function By(t){let e=await Ye();if(!e)return!1;let r=String(t??"").trim();return r?(await e.execute({statement:"DELETE FROM table_chat_scope WHERE chat_id = ?",params:[r]}),!0):!1}var rc,Rw,Ey,mn,Mw,Ba=D(()=>{H();mo();He();Rw=Object.freeze([{id:"table_engine_v1__sheets",statement:`
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
    `.replace(/\s+/g," ").trim()}]),Ey=!1,mn=null;Mw={ensureTableDataReady:Ye,getCurrentTableDataProvider:Ay,upsertSheetMeta:oc,getSheetsBySlot:nc,deleteSheetsBySlot:Oa,upsertSheetRows:ac,getRowsBySheet:ic,deleteRowsBySheet:ky,loadSlotTables:Iy,commitSlotTables:$a,clearSlot:Ry,getLocksForSheet:My,setLockEntry:Py,clearLockEntry:Ny,clearSheetLocks:Dy,clearScopeLocks:Ly,getChatScopeConfig:Oy,setChatScopeConfig:$y,clearChatScopeConfig:By}});function _r(){return cc||(cc=E.createScope("TableChatScope")),cc}function pr(){let t=globalThis.window||globalThis,e=t?.TavernHelper?.getCurrentChatId?.()||t?.Silvy?.getCurrentChatId?.()||t?.chat_metadata?.chat_id||t?.this_chid||t?.name1;return String(e??"").trim()||"default_chat"}function Ka(){return new Date().toISOString()}function xo(t){return t!==null&&typeof t=="object"&&!Array.isArray(t)}function Sr(t){let e=uc.get(dc,{}),s=(xo(e)?e:{})[t];return Ky(s)}function Ms(t,e){let r=uc.get(dc,{}),s=xo(r)?r:{};s[t]=e,uc.set(dc,s),Nw(t,e).catch(()=>{})}async function Nw(t,e){try{let r=await Promise.resolve().then(()=>(Ba(),lc));await r.ensureTableDataReady(),await r.setChatScopeConfig(t,e||{})}catch(r){_r().warn("chat-scope SQL \u955C\u50CF\u5931\u8D25\uFF08\u4E0D\u5F71\u54CD\u4E3B\u6D41\u7A0B\uFF09",{error:r?.message||String(r)})}}function zy(){return{template:{},templateArchives:{}}}function Ky(t){return xo(t)?{template:xo(t.template)?t.template:{},templateArchives:xo(t.templateArchives)?t.templateArchives:{}}:zy()}function za(t){return xo(t)?{mode:Dw.has(t.mode)?t.mode:qe.INHERIT_GLOBAL,presetName:typeof t.presetName=="string"?t.presetName:"",templateStr:typeof t.templateStr=="string"?t.templateStr:"",guideData:t.guideData!==void 0?ce(t.guideData):null,updatedAt:typeof t.updatedAt=="string"?t.updatedAt:Ka(),source:typeof t.source=="string"?t.source:"ui"}:null}function Lw(t){let e=[t.mode||"",t.presetName||"",t.templateStr||""],r=5381,s=e.join("||");for(let o=0;o<s.length;o++)r=(r<<5)+r+s.charCodeAt(o),r|=0;return String(r)}var Pw,dc,cc,uc,Dw,pc,yr,Uy=D(()=>{je();H();He();qr();Pw="tableChatScope",dc="chats";uc=$.namespace(Pw);Dw=new Set(Object.values(qe));pc=class{getScopedConfig(e=pr()){return Sr(e)}setScopedConfig(e,r=pr()){let s=Ky(e);return Ms(r,s),s}getTemplateScope(e,r=pr()){let s=Ae(e===void 0?de.getKey():e),o=Sr(r);return za(o.template[s])||null}setTemplateScope(e,r,s=pr()){let o=Ae(r===void 0?de.getKey():r),n=za({...e,updatedAt:Ka()});if(!n)return _r().warn("setTemplateScope \u6536\u5230\u65E0\u6548 state",e),null;let a=Sr(s);return a.template[o]=n,Ms(s,a),_r().info("\u6A21\u677F\u4F5C\u7528\u57DF\u5DF2\u66F4\u65B0",{chatId:s,isolationKey:o,mode:n.mode}),n}clearTemplateScope(e,r=pr()){let s=Ae(e===void 0?de.getKey():e),o=Sr(r);o.template[s]!==void 0&&(delete o.template[s],Ms(r,o),_r().info("\u6A21\u677F\u4F5C\u7528\u57DF\u5DF2\u6E05\u9664",{chatId:r,isolationKey:s}))}archiveCurrentTemplate(e,r=pr()){let s=Ae(e===void 0?de.getKey():e),o=Sr(r),n=za(o.template[s]);if(!n)return null;let a=Lw(n),i=Array.isArray(o.templateArchives[s])?o.templateArchives[s]:[];if(i.length>0&&i[0].fingerprint===a)return null;let l={fingerprint:a,state:ce(n),archivedAt:Ka()},d=[l,...i].slice(0,Xp);return o.templateArchives[s]=d,Ms(r,o),_r().info("\u6A21\u677F\u5DF2\u5F52\u6863",{chatId:r,isolationKey:s,archiveCount:d.length}),l}listTemplateArchives(e,r=pr()){let s=Ae(e===void 0?de.getKey():e),o=Sr(r);return(Array.isArray(o.templateArchives[s])?o.templateArchives[s]:[]).map(a=>ce(a))}restoreTemplateArchive(e,r,s=pr()){let o=Ae(r===void 0?de.getKey():r),n=Sr(s),a=Array.isArray(n.templateArchives[o])?n.templateArchives[o]:[],i=a[e];if(!i)return _r().warn("restoreTemplateArchive: \u627E\u4E0D\u5230 archive",{index:e,available:a.length}),null;this.archiveCurrentTemplate(o,s);let l=za({...i.state,source:"restore",updatedAt:Ka()});if(!l)return null;let d=Sr(s);return d.template[o]=l,Ms(s,d),_r().info("\u6A21\u677F\u5DF2\u6062\u590D",{chatId:s,isolationKey:o,fromArchiveIndex:e}),l}clearTemplateArchives(e,r=pr()){let s=Ae(e===void 0?de.getKey():e),o=Sr(r);Array.isArray(o.templateArchives[s])&&(delete o.templateArchives[s],Ms(r,o),_r().info("\u6A21\u677F\u5F52\u6863\u5DF2\u6E05\u7A7A",{chatId:r,isolationKey:s}))}resetChat(e=pr()){Ms(e,zy()),_r().warn("\u5DF2\u91CD\u7F6E chat \u7684 ScopedConfig",{chatId:e})}},yr=new pc});var Fy,jy=D(()=>{He();Fy=Object.freeze({formatId:"youyou",displayName:"YouYou \u539F\u751F (tables \u6570\u7EC4)",detect(t){return!t||typeof t!="object"||Array.isArray(t)?!1:Array.isArray(t.tables)},parse(t){if(!t||typeof t!="object")throw new Error("youyou-importer: raw \u4E0D\u662F\u5BF9\u8C61");return{tables:Array.isArray(t.tables)?ce(t.tables):[],name:typeof t.name=="string"?t.name:"",description:typeof t.description=="string"?t.description:"",promptTemplate:typeof t.promptTemplate=="string"?t.promptTemplate:""}}})});function fr(t,e=""){return t==null?e:String(t).trim()||e}function Wy(t){return t&&typeof t=="object"&&Array.isArray(t.content)}function Hy(t){return!t||typeof t!="object"?null:t.tables&&typeof t.tables=="object"&&!Array.isArray(t.tables)&&Object.keys(t.tables).filter(s=>s.startsWith("sheet_")&&Wy(t.tables[s])).length>0?t.tables:Object.keys(t).filter(r=>r.startsWith("sheet_")&&Wy(t[r])).length>0?t:null}function Ow(t){return!t||typeof t!="object"?[]:Object.keys(t).filter(r=>r.startsWith("sheet_")&&t[r]&&typeof t[r]=="object").map((r,s)=>({key:r,table:t[r],fallbackOrder:s})).sort((r,s)=>{let o=Number.isFinite(r.table.orderNo)?r.table.orderNo:r.fallbackOrder,n=Number.isFinite(s.table.orderNo)?s.table.orderNo:s.fallbackOrder;return o-n}).map(({key:r,table:s},o)=>{let n=s.sourceData&&typeof s.sourceData=="object"?s.sourceData:{},a=Array.isArray(s.content)?s.content:[],i=Array.isArray(a[0])?a[0]:[],l=Wl(n.note),d=new Set,c=i.slice(1).map((p,y)=>{let m=l[y]||{},g=fr(p||m.title,`\u5217${y+1}`);return{key:pn(g||`col_${y+1}`,d),title:g,description:fr(m.description,""),type:"text",required:!1}}),u=a.slice(1).map((p,y)=>{let m=Array.isArray(p)?p:[],g={};return c.forEach((h,x)=>{g[h.key]=Hr(m[x+1])}),{name:fr(m[0],`\u884C${y+1}`),cells:g}});return{id:fr(s.uid||r,`sheet_${o+1}`),name:fr(s.name,`\u8868${o+1}`),note:fr(n.note,""),enabled:s.enabled!==!1,aiInstructions:{init:fr(n.initNode,""),create:fr(n.insertNode,""),update:fr(n.updateNode,""),delete:fr(n.deleteNode,"")},columns:c,rows:u}})}var Gy,qy=D(()=>{He();dr();Gy=Object.freeze({formatId:"shujuku",displayName:"shujuku \u6570\u636E\u5E93\u683C\u5F0F (sheet_x)",detect(t){return!t||typeof t!="object"||Array.isArray(t)?!1:Hy(t)!==null},parse(t){let e=Hy(t);if(!e)throw new Error("shujuku-importer: \u672A\u627E\u5230 sheet_xxx \u5165\u53E3");return{tables:Ow(e),name:typeof t.name=="string"?t.name:"",description:typeof t.description=="string"?t.description:""}}})});var Yy,Vy=D(()=>{Yy=Object.freeze({formatId:"youyou",displayName:"YouYou \u539F\u751F (.json)",fileExtension:".json",mimeType:"application/json",serialize(t){return{version:1,exportedAt:new Date().toISOString(),templates:Array.isArray(t)?t:[]}}})});function hn(){return yc||(yc=E.createScope("TemplateAdapter")),yc}function Jy(t){if(t==null)return null;for(let e of $w){let r=!1;try{r=e.detect(t)}catch(s){hn().warn(`importer ${e.formatId} detect \u629B\u9519`,s);continue}if(r)try{let s=e.parse(t);if(s&&Array.isArray(s.tables))return hn().debug("\u9002\u914D\u5668\u547D\u4E2D",{formatId:e.formatId,displayName:e.displayName,tableCount:s.tables.length,firstTableName:s.tables[0]?.name||""}),{...s,formatId:e.formatId};hn().warn(`importer ${e.formatId} parse \u8FD4\u56DE\u65E0\u6548\u7ED3\u6784`,{hasResult:!!s,hasTablesArray:Array.isArray(s?.tables)})}catch(s){hn().warn(`importer ${e.formatId} parse \u629B\u9519\uFF0C\u5C1D\u8BD5\u4E0B\u4E00\u4E2A`,s)}}return hn().warn("importTemplateAuto: \u65E0\u9002\u914D\u5668\u547D\u4E2D",{isObject:t&&typeof t=="object",isArray:Array.isArray(t),keys:t&&typeof t=="object"?Object.keys(t).slice(0,10):[]}),null}var yc,$w,qA,Xy=D(()=>{H();jy();qy();Vy();$w=Object.freeze([Fy,Gy]),qA=Object.freeze([Yy])});function _t(){return fc||(fc=E.createScope("TableTemplate")),fc}function ot(t,e=""){return t==null?e:String(t).trim()||e}function Qy(t="template"){return`${t}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`}function vo(t={}){let e=Jy(t),r=[],s="",o="",n="",a="";e?(r=e.tables,s=e.formatId||"",o=e.name||"",n=e.description||"",a=e.promptTemplate||""):t&&typeof t=="object"&&_t().warn("normalizeTemplate: \u65E0\u9002\u914D\u5668\u547D\u4E2D\uFF0C\u6309\u7A7A\u6A21\u677F\u5904\u7406",{keys:Object.keys(t).slice(0,10)});let i=Ra({tables:r});return{id:ot(t?.id,Qy()),name:ot(t?.name||o,"\u672A\u547D\u540D\u6A21\u677F"),description:ot(t?.description||n,""),tables:i.tables||r,promptTemplate:ot(t?.promptTemplate||a,""),sourceFormat:s,createdAt:ot(t?.createdAt,new Date().toISOString()),updatedAt:ot(t?.updatedAt,new Date().toISOString())}}function Zy(){bn=null}function ef(){return[vo({id:bt,name:Ul,description:"\u5305\u542B\u5168\u5C40\u6570\u636E\u3001\u4E3B\u89D2\u3001\u91CD\u8981\u89D2\u8272\u3001\u6280\u80FD\u3001\u80CC\u5305\u3001\u4EFB\u52A1\u3001\u7EAA\u8981\u548C\u9009\u9879\u8868\u3002",tables:ce(uo)})]}function Ps(){let t=wo.get(gc,[]);return Array.isArray(t)?t.map(vo):[]}function Qr(){if(bn)return bn;let t=ef(),e=Ps(),r=new Map(e.map(n=>[n.id,n])),s=t.map(n=>r.has(n.id)?r.get(n.id):n),o=new Set(t.map(n=>n.id));for(let n of e)o.has(n.id)||s.push(n);return bn=Object.freeze(s),bn}function Is(t){let e=ot(t,"");return Qr().find(r=>r.id===e)||null}function Gr(t={}){let e=new Date().toISOString(),r=vo({...t,id:ot(t.id,Qy()),updatedAt:e,createdAt:ot(t.createdAt,e)}),o=Ps().filter(n=>n.id!==r.id);return o.push(r),wo.set(gc,o),Zy(),{success:!0,template:r}}function hc(t){let e=ot(t,"");if(!e||e===bt)return{success:!1,error:"\u5185\u7F6E\u6A21\u677F\u4E0D\u80FD\u5220\u9664\u3002"};let r=Ps().filter(s=>s.id!==e);return wo.set(gc,r),Zy(),Bw()===e&&bc(bt),{success:!0}}function tf(t,e){let r=ot(t,"");if(!r||r===bt)return{success:!1,error:"\u5185\u7F6E\u6A21\u677F\u4E0D\u80FD\u91CD\u547D\u540D\u3002"};let s=ot(e,"");if(!s)return{success:!1,error:"\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A\u3002"};let o=Is(r);return o?Gr({...o,name:s}):{success:!1,error:"\u6A21\u677F\u4E0D\u5B58\u5728\u3002"}}function Ua(){return{version:1,exportedAt:new Date().toISOString(),templates:Ps()}}function rf(t,{overwrite:e=!1}={}){let r;if(Array.isArray(t))r=t;else if(t&&typeof t=="object")Array.isArray(t.templates)?r=t.templates:t.template&&typeof t.template=="object"?r=[t.template]:r=[t];else return{success:!1,imported:0,skipped:0,errors:["\u65E0\u6548\u7684\u5BFC\u5165\u6570\u636E\u683C\u5F0F\u3002"]};_t().info("importTemplates \u5F00\u59CB",{rawListCount:r.length,overwrite:e});let s=new Set(Ps().map(i=>i.id)),o=0,n=0,a=[];for(let i of r)try{let l=vo(i);if(_t().info("importTemplates \u5355\u6761",{id:l.id,name:l.name,tableCount:Array.isArray(l.tables)?l.tables.length:0,firstTableName:l.tables?.[0]?.name||""}),!e&&s.has(l.id)){n++;continue}Gr(l),s.add(l.id),o++}catch(l){a.push(ot(l?.message,"\u672A\u77E5\u9519\u8BEF")),_t().error("importTemplates \u5355\u6761\u5931\u8D25",l)}return _t().info("importTemplates \u5B8C\u6210",{imported:o,skipped:n,errorCount:a.length}),{success:!0,imported:o,skipped:n,errors:a}}function Bw(){let t=wo.get(mc,""),e=ot(t,bt);return Is(e)?e:bt}function bc(t){let e=ot(t,bt);return wo.set(mc,e),_t().info("\u5168\u5C40\u6FC0\u6D3B\u6A21\u677F\u5DF2\u5207\u6362",{templateId:e}),e}function Xr(){let t=wo.get(mc,""),e=ot(t,bt),r=Is(e);return r||ef()[0]}function zw(t){try{return JSON.stringify(t)}catch(e){return _t().error("templateToString \u5931\u8D25",e),""}}function Kw(t){if(!t||typeof t!="string")return null;try{let e=JSON.parse(t);return vo(e)}catch(e){return _t().warn("templateFromString \u53CD\u5E8F\u5217\u5316\u5931\u8D25",e),null}}function To({chatId:t,isolationKey:e}={}){let r=e===void 0?de.getKey():e,s=yr.getTemplateScope(r,t);if(!s||s.mode===qe.INHERIT_GLOBAL){let n=Xr();return _t().debug("resolveActiveTemplate: inherit_global",{chatId:t,isolationKey:r,templateId:n?.id||"",templateName:n?.name||"",tableCount:Array.isArray(n?.tables)?n.tables.length:0,firstTableName:n?.tables?.[0]?.name||""}),{template:n,mode:qe.INHERIT_GLOBAL,source:{templateId:n?.id||""}}}if(s.mode===qe.CHAT_OVERRIDE){let n=Kw(s.templateStr);if(n)return{template:n,mode:qe.CHAT_OVERRIDE,source:{}};_t().warn("chat_override templateStr \u53CD\u5E8F\u5217\u5316\u5931\u8D25\uFF0C\u964D\u7EA7\u5230 inherit_global");let a=Xr();return{template:a,mode:qe.INHERIT_GLOBAL,source:{templateId:a?.id||"",fallback:!0}}}if(s.mode===qe.PRESET_LINK){let n=s.presetName||"",a=Qr(),i=a.find(d=>d.name===n)||a.find(d=>d.id===n);if(i)return{template:i,mode:qe.PRESET_LINK,source:{presetName:n,templateId:i.id}};_t().warn("preset_link \u6307\u5411\u7684\u5168\u5C40\u9884\u8BBE\u4E0D\u5B58\u5728\uFF0C\u964D\u7EA7\u5230 inherit_global",{presetName:n});let l=Xr();return{template:l,mode:qe.INHERIT_GLOBAL,source:{templateId:l?.id||"",presetName:n,fallback:!0}}}let o=Xr();return{template:o,mode:qe.INHERIT_GLOBAL,source:{templateId:o?.id||"",unknownMode:s.mode}}}function sf(t,e={}){if(!t||typeof t!="object")return{success:!1,error:"\u6A21\u677F\u4E0D\u80FD\u4E3A\u7A7A"};let r=vo(t),s=e.isolationKey===void 0?de.getKey():e.isolationKey;yr.archiveCurrentTemplate(s,e.chatId);let o=yr.setTemplateScope({mode:qe.CHAT_OVERRIDE,templateStr:zw(r),source:e.source||"ui"},s,e.chatId);return _t().info("applyTemplateAsChatOverride",{chatId:e.chatId,isolationKey:s,templateName:r.name}),{success:!0,scopeState:o}}function of(t,e={}){let r=ot(t,"");if(!r)return{success:!1,error:"presetName \u4E0D\u80FD\u4E3A\u7A7A"};let s=Qr(),o=s.find(i=>i.name===r)||s.find(i=>i.id===r);if(!o)return{success:!1,error:"\u627E\u4E0D\u5230\u6307\u5B9A\u7684\u5168\u5C40\u9884\u8BBE"};let n=e.isolationKey===void 0?de.getKey():e.isolationKey;yr.archiveCurrentTemplate(n,e.chatId);let a=yr.setTemplateScope({mode:qe.PRESET_LINK,presetName:o.name,source:e.source||"ui"},n,e.chatId);return _t().info("linkPresetToChat",{chatId:e.chatId,isolationKey:n,presetName:o.name}),{success:!0,scopeState:a}}function nf(t={}){let e=t.isolationKey===void 0?de.getKey():t.isolationKey;return t.archive!==!1&&yr.archiveCurrentTemplate(e,t.chatId),yr.clearTemplateScope(e,t.chatId),_t().info("resetChatTemplateScope",{chatId:t.chatId,isolationKey:e}),{success:!0}}function af(t={}){let e=t.isolationKey===void 0?de.getKey():t.isolationKey;return yr.listTemplateArchives(e,t.chatId)}function lf(t,e={}){let r=e.isolationKey===void 0?de.getKey():e.isolationKey,s=yr.restoreTemplateArchive(t,r,e.chatId);return s?{success:!0,scopeState:s}:{success:!1,error:"\u5F52\u6863\u4E0D\u5B58\u5728"}}var wo,gc,mc,fc,bn,yo=D(()=>{je();H();dr();He();Uy();qr();Xy();wo=$.namespace("tableWorkbenchTemplates"),gc="templates",mc="activeId";bn=null});var uf={};ae(uf,{TableTemplatePanel:()=>df,default:()=>Hw});function xc(t){return t===bt}function jw(t,{onChange:e,readonly:r}){let s=f("div",{style:{display:"flex",flexDirection:"column",gap:"12px"}});G(s,kt({label:"\u63CF\u8FF0",control:he({value:t.description||"",placeholder:"\u53EF\u9009 \u2014 \u5907\u6CE8\u7528\u9014",disabled:r,onChange:a=>e({description:a})})})),G(s,f("div",{text:"\u586B\u8868\u63D0\u793A\u8BCD\u6A21\u677F",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}})),G(s,f("div",{text:"\u53EF\u4F7F\u7528\u5B8F\uFF1A{{tableData}} {{lastUserMessage}} {{lastAiMessage}} {{toolWorldbookContent}} \u7B49\u3002\u7559\u7A7A\u4F7F\u7528\u9ED8\u8BA4\u6A21\u677F\u3002",style:{fontSize:"11px",color:"var(--yyt-text-muted)",lineHeight:"1.6",marginBottom:"4px"}}));let o=f("textarea",{className:"yyt-textarea",attrs:{rows:"8",placeholder:"\u53EF\u9009 \u2014 \u81EA\u5B9A\u4E49\u586B\u8868\u63D0\u793A\u8BCD",disabled:r?"disabled":null},style:{width:"100%",resize:"vertical",fontFamily:"ui-monospace, monospace",fontSize:"12px"}});o.value=t.promptTemplate||"",o.addEventListener("change",()=>{r||e({promptTemplate:o.value})}),G(s,o),G(s,f("div",{text:`\u8868\u683C\u7ED3\u6784\uFF08${(t.tables||[]).length} \u5F20\u8868\uFF09`,style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)",marginTop:"6px"}})),G(s,f("div",{text:"\u672C\u9762\u677F\u53EA\u5C55\u793A\u8868\u7ED3\u6784 JSON\u3002\u590D\u6742 schema \u7F16\u8F91\uFF08\u589E\u5220\u8868\u3001\u5217\u5B9A\u4E49\u3001\u9ED8\u8BA4\u884C\uFF09\u5C06\u5728\u586B\u8868\u5DE5\u4F5C\u53F0\u4E2D\u63D0\u4F9B\u3002",style:{fontSize:"11px",color:"var(--yyt-text-muted)",lineHeight:"1.6",marginBottom:"4px"}}));let n=f("pre",{style:{padding:"10px 12px",background:"var(--yyt-bg-base)",border:"1px solid var(--yyt-border)",borderRadius:"var(--yyt-radius-sm, 6px)",fontFamily:"ui-monospace, monospace",fontSize:"11px",lineHeight:"1.6",color:"var(--yyt-text-secondary)",maxHeight:"260px",overflow:"auto",whiteSpace:"pre",margin:"0"}});try{n.textContent=JSON.stringify(t.tables||[],null,2)}catch{n.textContent="// \u65E0\u6CD5\u5E8F\u5217\u5316"}return G(s,n),s}function Ww(t){let r=[`${(t.tables||[]).length} \u5F20\u8868`];return t.promptTemplate&&r.push("\u81EA\u5B9A\u4E49\u6A21\u677F"),r}var Uw,cf,Fw,df,Hw,pf=D(()=>{tr();yo();dr();H();Yo();Uw=E.createScope("TableTemplatePanel"),cf="";Fw={listPresets(){return Qr().map(t=>({id:xc(t.id)?`builtin_table_${t.id}`:t.id,name:t.name,description:t.description||"",promptTemplate:t.promptTemplate||"",tables:t.tables||[],_rawId:t.id,createdAt:t.createdAt,updatedAt:t.updatedAt}))},getPreset(t){if(!t)return null;let e=t.startsWith("builtin_table_")?t.slice(14):t,r=Is(e);return r?{id:xc(r.id)?`builtin_table_${r.id}`:r.id,name:r.name,description:r.description||"",promptTemplate:r.promptTemplate||"",tables:r.tables||[],_rawId:r.id,createdAt:r.createdAt,updatedAt:r.updatedAt}:null},getCurrentPresetId(){return cf||""},setCurrentPresetId(t){return cf=t||"",!0},createPreset(t){let e=String(t?.name||"").trim()||"\u65B0\u5EFA\u6A21\u677F",r=Gr({name:e,description:t?.description||"",promptTemplate:t?.promptTemplate||"",tables:Array.isArray(t?.tables)?t.tables:[]});return r?.success?{id:r.template.id,...r.template,_rawId:r.template.id}:null},updatePreset(t,e){if(!t)return null;let r=t.startsWith("builtin_table_")?t.slice(14):t;if(xc(r))return Uw.warn("\u62D2\u7EDD\u4FEE\u6539\u5185\u7F6E\u8868\u683C\u6A21\u677F"),null;let s=Is(r);if(!s)return null;let o=Gr({...s,...e,id:r});return o?.success?{id:o.template.id,...o.template,_rawId:o.template.id}:null},deletePreset(t){if(!t)return!1;let e=t.startsWith("builtin_table_")?t.slice(14):t;return!!hc(e)?.success},duplicatePreset(t,e={}){let r=this.getPreset(t);if(!r)return null;let s=e.nameSuffix||" \u526F\u672C";return this.createPreset({name:`${r.name}${s}`,description:r.description,promptTemplate:r.promptTemplate,tables:r.tables})},renamePreset(t,e){if(!t||!e)return null;let r=t.startsWith("builtin_table_")?t.slice(14):t,s=tf(r,e);return s?.success?this.getPreset(s.template?.id||r):null},exportAll(){return Ua()},importPresets(t){let e=rf(t,{overwrite:!1});return{added:e?.imported||0,skipped:e?.skipped||0}},resetAll(){let t=Ps();for(let e of t)try{hc(e.id)}catch{}}};df=Nr({id:"tableTemplatePanel",kind:"table",panelTitle:"\u8868\u683C\u6A21\u677F",panelHint:"\u7BA1\u7406\u586B\u8868\u5DE5\u4F5C\u53F0\u7684\u8868\u683C\u7ED3\u6784\u6A21\u677F\u3002\u5728\u586B\u8868\u9762\u677F\u9876\u90E8\u5DE5\u5177\u680F\u53EF\u5FEB\u901F\u52A0\u8F7D/\u4FDD\u5B58\u5F53\u524D\u6A21\u677F\u3002",store:Fw,renderEditor:jw,renderListItemMeta:Ww}),Hw=df});var ff={};ae(ff,{ToolManagePanel:()=>yf,default:()=>Gw});var Nt,yf,Gw,gf=D(()=>{tt();H();tn();lr();Nt=E.createScope("ToolManagePanel"),yf={id:"toolManagePanel",_removeDialog(t){if(!t?.length)return;let e=t.find("#yyt-tool-dialog-overlay");gt(e,"yytToolManageDialogSelect"),e.remove()},_getToolkitWindow(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window},_openToolConfig(t){if(!t)return;let r=this._getToolkitWindow()?.YouYouToolkit||window.YouYouToolkit;if(!r){Nt.warn("\u672A\u627E\u5230\u5DE5\u5177\u7BB1\u5B9E\u4F8B\uFF0C\u65E0\u6CD5\u8DF3\u8F6C\u5230\u5DE5\u5177\u914D\u7F6E",null,{toast:!0});return}r.switchMainTab("tools"),r.switchSubTab("tools",t)},render(t){let e=nr(),r=Object.entries(e),s=r.filter(([,o])=>o?.enabled!==!1).length;return`
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
            ${ie(o.name)}
            <span class="yyt-badge" style="background: var(--yyt-accent-soft); color: var(--yyt-accent); margin-left: 6px;">${ie(o.category)}</span>
          </div>
          <div class="yyt-list-row-desc">${ie(o.description)}</div>
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
      `},bindEvents(t,e){let r=te();!r||!we(t)||(t.off(".yytToolManage"),this._bindToolEvents(t,r),this._bindFileEvents(t,r))},_bindToolEvents(t,e){t.on("change.yytToolManage",".yyt-tool-toggle input",r=>{let s=e(r.currentTarget).closest(".yyt-list-row"),o=s.data("tool-id"),n=e(r.currentTarget).is(":checked");ha(o,n),s.toggleClass("yyt-tool-item-enabled",n).toggleClass("yyt-tool-item-disabled",!n),s.find(".yyt-status-dot").toggleClass("yyt-status-dot-on",n).toggleClass("yyt-status-dot-off",!n),Nt.info(n?"\u5DE5\u5177\u5DF2\u542F\u7528":"\u5DE5\u5177\u5DF2\u7981\u7528",null,{toast:!0})}),t.on("click.yytToolManage","#yyt-add-tool",()=>{this._showToolEditDialog(t,e,null)}),t.on("click.yytToolManage",'.yyt-list-row [data-action="config"]',r=>{let s=e(r.currentTarget).closest(".yyt-list-row").data("tool-id");this._openToolConfig(s)}),t.on("click.yytToolManage",'.yyt-list-row [data-action="edit"]',r=>{let s=e(r.currentTarget).closest(".yyt-list-row").data("tool-id");this._showToolEditDialog(t,e,s)}),t.on("click.yytToolManage",'.yyt-list-row [data-action="delete"]',async r=>{let s=e(r.currentTarget).closest(".yyt-list-row").data("tool-id"),o=ar(s);if(!s||!o||!await br("\u5220\u9664\u5DE5\u5177",`\u786E\u5B9A\u8981\u5220\u9664\u5DE5\u5177"${o.name}"\u5417\uFF1F`,{danger:!0}))return;if(!eo(s)){Nt.error("\u5220\u9664\u5931\u8D25",null,{toast:!0});return}this.renderTo(t),Nt.info("\u5DE5\u5177\u5DF2\u5220\u9664",null,{toast:"success"})})},_bindFileEvents(t,e){t.on("click.yytToolManage","#yyt-import-tools",()=>{t.find("#yyt-import-tools-file").click()}),t.on("change.yytToolManage","#yyt-import-tools-file",async r=>{let s=r.target.files[0];if(s){try{let o=await Uo(s),n=ro(o,{overwrite:!1});n.success?Nt.info(n.message,null,{toast:"success"}):Nt.error(n.message,null,{toast:!0}),n.success&&this.renderTo(t)}catch(o){Nt.error(`\u5BFC\u5165\u5931\u8D25: ${o.message}`,null,{toast:!0})}e(r.target).val("")}}),t.on("click.yytToolManage","#yyt-export-tools",()=>{try{let r=to();Ko(r,`youyou_toolkit_tools_${Date.now()}.json`),Nt.info("\u5DE5\u5177\u5DF2\u5BFC\u51FA",null,{toast:"success"})}catch(r){Nt.error(`\u5BFC\u51FA\u5931\u8D25: ${r.message}`,null,{toast:!0})}}),t.on("click.yytToolManage","#yyt-reset-tools",async()=>{await br("\u91CD\u7F6E\u5DE5\u5177","\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u5DE5\u5177\u5417\uFF1F",{danger:!0})&&(so(),this.renderTo(t),Nt.info("\u5DE5\u5177\u5DF2\u91CD\u7F6E",null,{toast:!0}))})},_showToolEditDialog(t,e,r){let s=r?ar(r):null,o=!!s,n=`
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
                       value="${s?ie(s.name):""}" placeholder="\u5DE5\u5177\u540D\u79F0">
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
                     value="${s?ie(s.description||""):""}" placeholder="\u5DE5\u5177\u63CF\u8FF0">
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
    `;this._removeDialog(t),t.append(n);let a=t.find("#yyt-tool-dialog-overlay"),i=a.find("#yyt-tool-name"),l=a.find("#yyt-tool-category"),d=a.find("#yyt-tool-desc"),c=a.find("#yyt-tool-timeout"),u=a.find("#yyt-tool-retries");zt(a,{namespace:"yytToolManageDialogSelect",selectors:["#yyt-tool-category"]});let p=()=>{gt(a,"yytToolManageDialogSelect"),a.remove()};a.find("#yyt-tool-dialog-close, #yyt-tool-dialog-cancel").on("click",p),a.on("click",function(y){y.target===this&&p()}),a.find("#yyt-tool-dialog-save").on("click",()=>{let y=i.val().trim(),m=l.val(),g=d.val().trim(),h=parseInt(c.val())||6e4,x=parseInt(u.val())||3;if(!y){Nt.warn("\u8BF7\u8F93\u5165\u5DE5\u5177\u540D\u79F0",null,{toast:!0}),i.trigger("focus").trigger("select");return}let S=r||`tool_${Date.now()}`;if(!Zs(S,{name:y,category:m,description:g,promptTemplate:s?.promptTemplate||"",extractTags:Array.isArray(s?.extractTags)?s.extractTags:[],config:{execution:{timeout:h,retries:x},api:s?.config?.api||{preset:"",useBypass:!1,bypassPreset:""},messages:Array.isArray(s?.config?.messages)?s.config.messages:[],context:{depth:s?.config?.context?.depth||3,includeTags:Array.isArray(s?.config?.context?.includeTags)?s.config.context.includeTags:[],excludeTags:Array.isArray(s?.config?.context?.excludeTags)?s.config.context.excludeTags:[]},worldbooks:{enabled:s?.config?.worldbooks?.enabled===!0,selected:Array.isArray(s?.config?.worldbooks?.selected)?s.config.worldbooks.selected:[]}},enabled:s?.enabled!==!1})){Nt.error(o?"\u5DE5\u5177\u66F4\u65B0\u5931\u8D25":"\u5DE5\u5177\u521B\u5EFA\u5931\u8D25",null,{toast:!0});return}no(S),p(),this.renderTo(t),Nt.info(o?"\u5DE5\u5177\u5DF2\u66F4\u65B0":"\u5DE5\u5177\u5DF2\u521B\u5EFA",null,{toast:"success"}),o||this._openToolConfig(S)})},destroy(t){!te()||!we(t)||(this._removeDialog(t),t.off(".yytToolManage"))},getStyles(){return`
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
    `},renderTo(t){let e=this.render({});t.html(e),this.bindEvents(t,{})}},Gw=yf});var hf={};ae(hf,{BypassManager:()=>ja,DEFAULT_BYPASS_PRESETS:()=>Ar,addMessage:()=>iv,buildBypassMessages:()=>pv,bypassManager:()=>ye,createPreset:()=>ev,default:()=>yv,deleteMessage:()=>cv,deletePreset:()=>rv,duplicatePreset:()=>sv,exportPresets:()=>dv,getAllPresets:()=>Qw,getDefaultPresetId:()=>ov,getEnabledMessages:()=>av,getPreset:()=>Zw,getPresetList:()=>xn,importPresets:()=>uv,setDefaultPresetId:()=>nv,updateMessage:()=>lv,updatePreset:()=>tv});function mf(t){let e=String(t||"").trim().toLowerCase();return e==="system"?"SYSTEM":e==="assistant"||e==="ai"?"assistant":"USER"}function Vw(t){return t&&typeof t=="object"&&typeof t.content=="string"&&!t.name&&!Array.isArray(t.messages)}function Jw(t){return String(t||"").replace(/\$0/g,"{{toolContentMacro}}").replace(/\$1/g,"{{rawRecentMessagesText}}").replace(/\$4/g,"{{toolWorldbookContent}}").replace(/\$8/g,"{{userMessage}}").replace(/\$C/g,"{{characterCard}}")}function Xw(t,e,r){let s=t.mainSlot||(t.isMain?"A":t.isMain2?"B":"");return{id:typeof t.id=="string"&&t.id.trim()?t.id.trim():`${r}_msg_${e+1}`,role:mf(t.role),content:Jw(t.content),enabled:t.enabled!==!1,deletable:t.deletable!==!1,...s?{mainSlot:s,isMain:s==="A",isMain2:s==="B"}:{}}}var Fa,Er,So,wc,qw,Ar,Yw,ja,ye,Qw,xn,Zw,ev,tv,rv,sv,ov,nv,av,iv,lv,cv,dv,uv,pv,yv,_o=D(()=>{je();Ze();H();Fa=E.createScope("BypassManager"),Er="bypass_presets",So="default_bypass_preset",wc="current_bypass_preset",qw=Object.freeze([{id:"table_fill_default_msg_1",role:"SYSTEM",content:"\u4F60\u662F\u4E00\u4E2A\u52A9\u624B\uFF0C\u8D1F\u8D23\u542C\u4ECE\u7528\u6237\u7684\u6307\u4EE4\u5B8C\u6210\u4F60\u7684\u5DE5\u4F5C",enabled:!0,deletable:!0},{id:"table_fill_default_msg_2",role:"assistant",content:"\u6536\u5230\uFF0C\u6211\u5C06\u5145\u5206\u63CF\u7ED8\u7528\u6237\u7684\u610F\u5FD7\uFF0C\u6BEB\u4E0D\u5077\u61D2\uFF0C\u5E76\u4E14\u6211\u4E00\u5B9A\u4F1A\u9075\u7167\u7528\u6237\u7684\u8981\u6C42",enabled:!0,deletable:!0},{id:"table_fill_default_msg_3",role:"USER",content:`\u4EE5\u4E0B\u662F\u4F60\u53EF\u80FD\u9700\u8981\u7528\u5230\u7684\u80CC\u666F\u8BBE\u5B9A\uFF0C\u6CE8\u610F\u4F60\u53EA\u9700\u8981\u5176\u4E2D\u5173\u4E8E\u5267\u60C5\u4EE5\u53CA\u4EBA\u8BBE\u65B9\u9762\u7684\u6570\u636E\uFF0C\u4E0D\u9700\u8981\u601D\u8003\u91CC\u8FB9\u9664\u6B64\u4E4B\u5916\u7684\u4EFB\u4F55\u683C\u5F0F\u6216\u8005\u601D\u7EF4\u94FE\u65B9\u9762\u7684\u8981\u6C42\uFF1A
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

{{userMessage}}`,enabled:!0,deletable:!1,mainSlot:"B",isMain2:!0},{id:"table_fill_default_msg_8",role:"assistant",content:"\u6536\u5230\u6307\u4EE4\uFF0C\u6211\u5C06\u4E00\u6B65\u4E00\u6B65\u5F00\u59CB\u601D\u8003\uFF0C\u5E76\u5B8C\u6210\u586B\u8868\uFF0C\u9996\u5148\u6211\u8981\u5206\u6790\u5F53\u524D\u8F6E\u6B21\u7684\u5267\u60C5\u53D8\u5316\u3002",enabled:!0,deletable:!0}]),Ar={table_workbench_fill_default:{id:"table_workbench_fill_default",name:"\u9ED8\u8BA4\u586B\u8868 Ai \u6307\u4EE4\u9884\u8BBE",description:"\u7528\u4E8E\u586B\u8868\u5DE5\u4F5C\u53F0\u7684\u5185\u7F6E Ai \u6307\u4EE4\u9884\u8BBE\uFF0C\u53EF\u590D\u5236\u540E\u6309\u9700\u7F16\u8F91\u3002",enabled:!0,messages:qw.map(t=>({...t})),createdAt:0,updatedAt:0}},Yw=new Set(["\u6807\u51C6\u7834\u9650\u8BCD","\u589E\u5F3A\u7834\u9650"]);ja=class{constructor(){this._cache=null,this._migrated=!1,this.debugMode=!1}getAllPresets(){if(this._migrateLegacyData(),this._cache)return this._cache;let e=$.get(Er,{});return this._cache={...Ar,...e},this._cache}getPresetList(){let e=this.getAllPresets();return Object.values(e).sort((r,s)=>(s.updatedAt||0)-(r.updatedAt||0))}getPreset(e){return e&&this.getAllPresets()[e]||null}presetExists(e){return!!this.getPreset(e)}createPreset(e){let{id:r,name:s,description:o,messages:n}=e;if(!r||typeof r!="string"||!r.trim())return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};if(!s||typeof s!="string"||!s.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let a=r.trim();if(this.presetExists(a))return{success:!1,message:`\u9884\u8BBE "${a}" \u5DF2\u5B58\u5728`};let i={id:a,name:s.trim(),description:o||"",enabled:!0,messages:n||[],createdAt:Date.now(),updatedAt:Date.now()};return this._savePreset(a,i),W.emit(U.BYPASS_PRESET_CREATED,{presetId:a,preset:i}),Fa.info(`\u9884\u8BBE\u5DF2\u521B\u5EFA: ${a}`),{success:!0,message:`\u9884\u8BBE "${s}" \u521B\u5EFA\u6210\u529F`,preset:i}}updatePreset(e,r){if(!e)return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};let s=this.getPreset(e);if(!s)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};if(r.id&&r.id!==e)return{success:!1,message:"\u4E0D\u5141\u8BB8\u4FEE\u6539\u9884\u8BBEID"};let o={...s,...r,id:e,updatedAt:Date.now()};return this._savePreset(e,o),W.emit(U.BYPASS_PRESET_UPDATED,{presetId:e,preset:o}),Fa.info(`\u9884\u8BBE\u5DF2\u66F4\u65B0: ${e}`),{success:!0,message:`\u9884\u8BBE "${s.name}" \u66F4\u65B0\u6210\u529F`,preset:o}}deletePreset(e){if(!e)return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};if(Ar[e])return{success:!1,message:"\u4E0D\u5141\u8BB8\u5220\u9664\u9ED8\u8BA4\u9884\u8BBE"};let r=this.getPreset(e);if(!r)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let s=$.get(Er,{});return delete s[e],$.set(Er,s),this._cache=null,this.getDefaultPresetId()===e&&this.setDefaultPresetId(null),W.emit(U.BYPASS_PRESET_DELETED,{presetId:e}),Fa.info(`\u9884\u8BBE\u5DF2\u5220\u9664: ${e}`),{success:!0,message:`\u9884\u8BBE "${r.name}" \u5DF2\u5220\u9664`}}duplicatePreset(e,r,s){let o=this.getPreset(e);if(!o)return{success:!1,message:`\u6E90\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};if((!r||!r.trim())&&(r=`${e}_copy_${Date.now()}`),this.presetExists(r))return{success:!1,message:`\u9884\u8BBE "${r}" \u5DF2\u5B58\u5728`};let n={...JSON.parse(JSON.stringify(o)),id:r.trim(),name:s||`${o.name} (\u526F\u672C)`,createdAt:Date.now(),updatedAt:Date.now()};return this._savePreset(r.trim(),n),W.emit(U.BYPASS_PRESET_CREATED,{presetId:r,preset:n}),{success:!0,message:`\u9884\u8BBE\u5DF2\u590D\u5236\u4E3A "${n.name}"`,preset:n}}addMessage(e,r){let s=this.getPreset(e);if(!s)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let o={id:`msg_${Date.now()}`,role:mf(r.role||"SYSTEM"),content:r.content||"",enabled:r.enabled!==!1,deletable:r.deletable!==!1,...r.mainSlot?{mainSlot:r.mainSlot}:{}},n=[...s.messages||[],o];return this.updatePreset(e,{messages:n})}updateMessage(e,r,s){let o=this.getPreset(e);if(!o)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let n=o.messages||[],a=n.findIndex(l=>l.id===r);if(a===-1)return{success:!1,message:`\u6D88\u606F "${r}" \u4E0D\u5B58\u5728`};let i=[...n];return i[a]={...i[a],...s},this.updatePreset(e,{messages:i})}deleteMessage(e,r){let s=this.getPreset(e);if(!s)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let o=s.messages||[],n=o.find(i=>i.id===r);if(!n)return{success:!1,message:`\u6D88\u606F "${r}" \u4E0D\u5B58\u5728`};if(n.deletable===!1)return{success:!1,message:"\u8BE5\u6D88\u606F\u4E0D\u53EF\u5220\u9664"};let a=o.filter(i=>i.id!==r);return this.updatePreset(e,{messages:a})}getEnabledMessages(e){let r=this.getPreset(e);return!r||!r.enabled?[]:(r.messages||[]).filter(s=>s.enabled!==!1)}getDefaultPresetId(){this._migrateLegacyData();let e=$.get(So,null);return e==="undefined"||e==="null"||e===""?($.remove(So),null):e}setDefaultPresetId(e){return e&&!this.presetExists(e)?!1:($.set(So,e),W.emit(U.BYPASS_PRESET_ACTIVATED,{presetId:e}),Fa.info(`\u9ED8\u8BA4\u9884\u8BBE\u5DF2\u8BBE\u7F6E: ${e}`),!0)}getDefaultPreset(){let e=this.getDefaultPresetId();return e?this.getPreset(e):null}exportPresets(e=null){if(e){let s=this.getPreset(e);if(!s)throw new Error(`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`);return JSON.stringify(s,null,2)}let r=this.getAllPresets();return JSON.stringify({version:"1.0.0",exportedAt:new Date().toISOString(),presets:Object.values(r)},null,2)}importPresets(e,r={}){let{overwrite:s=!1,name:o=""}=r,n;try{n=JSON.parse(e)}catch{return{success:!1,message:"JSON\u89E3\u6790\u5931\u8D25",imported:0}}let a=$.get(Er,{}),l=Array.isArray(n)&&n.every(Vw)?[{id:this._generatePresetId(o||"\u5BFC\u5165\u586B\u8868\u6307\u4EE4\u9884\u8BBE",a),name:o||"\u5BFC\u5165\u586B\u8868\u6307\u4EE4\u9884\u8BBE",description:"\u7531\u5916\u90E8\u586B\u8868\u63D0\u793A\u8BCD\u7EC4\u5BFC\u5165\u3002",enabled:!0,messages:n}]:Array.isArray(n)?n:n.presets?n.presets:[n];if(l.length===0)return{success:!1,message:"\u6CA1\u6709\u627E\u5230\u6709\u6548\u7684\u9884\u8BBE\u6570\u636E",imported:0};let d=0;for(let c of l){let u=this._normalizePreset(c?.id,c,a);u&&(Ar[u.id]&&!s||!s&&a[u.id]||(a[u.id]={...u,updatedAt:Date.now()},d++))}return d>0&&($.set(Er,a),this._cache=null),{success:!0,message:`\u6210\u529F\u5BFC\u5165 ${d} \u4E2A\u9884\u8BBE`,imported:d}}getToolBypassPreset(e){if(!e?.bypass?.enabled)return null;let r=e?.bypass?.presetId;return r?this.getPreset(r):this.getDefaultPreset()}buildBypassMessages(e){let r=this.getToolBypassPreset(e);return r?this.getEnabledMessages(r.id):[]}_savePreset(e,r){let s=$.get(Er,{});s[e]=r,$.set(Er,s),this._cache=null}_migrateLegacyData(){if(this._migrated)return;let e=$.get(Er,{}),r={},s=!1,o=Array.isArray(e)?e.map((n,a)=>[n?.id||n?.name||`legacy_${a}`,n]):Object.entries(e||{});for(let[n,a]of o){let i=this._normalizePreset(n,a,r);if(!i){s=!0;continue}r[i.id]=i,(!e?.[i.id]||e?.[i.id]?.id!==i.id)&&(s=!0)}s&&$.set(Er,r),this._migrateDefaultPreset(r),this._cache=null,this._migrated=!0}_normalizePreset(e,r,s={}){if(!r||typeof r!="object")return null;let o=typeof r.name=="string"?r.name.trim():"",n=typeof r.id=="string"?r.id.trim():"",a=typeof e=="string"?e.trim():"";if(!o&&a&&a!=="undefined"&&a!=="null"&&(o=a),this._isLegacySamplePreset(o,n)||(!n&&a&&a!=="undefined"&&a!=="null"&&(n=a),!n&&o&&o!=="undefined"&&o!=="null"&&(n=this._generatePresetId(o,s)),!o||!n||n==="undefined"||o==="undefined"))return null;let l=Array.isArray(r.messages)?r.messages.filter(d=>d&&typeof d=="object").map((d,c)=>Xw(d,c,n)):[];return{...r,id:n,name:o,description:typeof r.description=="string"?r.description:"",enabled:r.enabled!==!1,messages:l,createdAt:r.createdAt||Date.now(),updatedAt:r.updatedAt||Date.now()}}_migrateDefaultPreset(e){let r=$.get(So,null),s=$.get(wc,null),o=r??s;(o==="undefined"||o==="null"||o==="")&&(o=null),o&&!e[o]&&(o=Object.values(e).find(a=>a.name===o)?.id||null),o?$.set(So,o):$.remove(So),$.has(wc)&&$.remove(wc)}_isLegacySamplePreset(e,r=""){return e?r==="standard"||r==="enhanced"||r==="jailbreak"||Yw.has(e)?!0:/^增强破限（副本）(?:\s*\(\d+\))?$/.test(e):!1}_generatePresetId(e,r={}){let s=String(e).trim().toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g,"_").replace(/^_+|_+$/g,"")||`bypass_${Date.now()}`,o=s,n=1;for(;r[o];)o=`${s}_${n++}`;return o}},ye=new ja,Qw=()=>ye.getAllPresets(),xn=()=>ye.getPresetList(),Zw=t=>ye.getPreset(t),ev=t=>ye.createPreset(t),tv=(t,e)=>ye.updatePreset(t,e),rv=t=>ye.deletePreset(t),sv=(t,e,r)=>ye.duplicatePreset(t,e,r),ov=()=>ye.getDefaultPresetId(),nv=t=>ye.setDefaultPresetId(t),av=t=>ye.getEnabledMessages(t),iv=(t,e)=>ye.addMessage(t,e),lv=(t,e,r)=>ye.updateMessage(t,e,r),cv=(t,e)=>ye.deleteMessage(t,e),dv=t=>ye.exportPresets(t),uv=(t,e)=>ye.importPresets(t,e),pv=t=>ye.buildBypassMessages(t),yv=ye});var bf={};ae(bf,{DEFAULT_SETTINGS:()=>wn,SettingsService:()=>Ha,default:()=>fv,settingsService:()=>jt});var wn,Wa,Ha,jt,fv,vn=D(()=>{je();Ze();wn={executor:{maxConcurrent:3,maxRetries:2,retryDelayMs:5e3,requestTimeoutMs:9e4,queueStrategy:"fifo"},automation:{settleMs:1200,cooldownMs:5e3,maxConcurrentSlots:1},debug:{enableDebugLog:!1,saveExecutionHistory:!0,showRuntimeBadge:!0},ui:{compactMode:!1,animationEnabled:!0,theme:"dark-blue",startupScreenDismissed:!1}},Wa="settings_v2",Ha=class{constructor(){this._cache=null}getSettings(){if(this._cache)return this._cache;let e=$.get(Wa,{}),r=this._migrateLegacy(e);return this._cache=this._mergeWithDefaults(r.settings),r.changed&&$.set(Wa,this._cache),this._cache}saveSettings(e){this._cache=this._mergeWithDefaults(e),$.set(Wa,this._cache),W.emit(U.SETTINGS_UPDATED,{settings:this._cache})}updateSettings(e){let r=this.getSettings(),s=this._deepMerge(r,e);this.saveSettings(s)}getExecutorSettings(){return this.getSettings().executor}updateExecutorSettings(e){this.updateSettings({executor:e})}getAutomationSettings(){return this.getSettings().automation}updateAutomationSettings(e){this.updateSettings({automation:e})}getDebugSettings(){return this.getSettings().debug}updateDebugSettings(e){this.updateSettings({debug:e})}getUiSettings(){return this.getSettings().ui}updateUiSettings(e){this.updateSettings({ui:e})}resetSettings(){this._cache=JSON.parse(JSON.stringify(wn)),$.set(Wa,this._cache),W.emit(U.SETTINGS_UPDATED,{settings:this._cache,reset:!0})}get(e,r=null){let s=this.getSettings(),o=e.split("."),n=s;for(let a of o)if(n&&typeof n=="object"&&a in n)n=n[a];else return r;return n}set(e,r){let s=JSON.parse(JSON.stringify(this.getSettings())),o=e.split("."),n=s;for(let a=0;a<o.length-1;a+=1){let i=o[a];i in n||(n[i]={}),n=n[i]}n[o[o.length-1]]=r,this.saveSettings(s)}_migrateLegacy(e){if(!e||typeof e!="object")return{settings:{},changed:!1};let r=!1,s=JSON.parse(JSON.stringify(e));return s.automation&&Object.prototype.hasOwnProperty.call(s.automation,"enabled")&&(delete s.automation.enabled,r=!0),{settings:s,changed:r}}_mergeWithDefaults(e){return this._deepMerge(JSON.parse(JSON.stringify(wn)),e)}_deepMerge(e,r){let s={...e};for(let o in r)r[o]&&typeof r[o]=="object"&&!Array.isArray(r[o])?s[o]=this._deepMerge(e[o]||{},r[o]):s[o]=r[o];return s}},jt=new Ha,fv=jt});var wf={};ae(wf,{ContextInjector:()=>Ya,DEFAULT_INJECTION_OPTIONS:()=>xf,WRITEBACK_METHODS:()=>Xt,WRITEBACK_RESULT_STATUS:()=>qa,contextInjector:()=>Dt,default:()=>hv});function vc(t){return typeof t=="number"&&Number.isFinite(t)?String(t):typeof t=="string"&&t.trim()?t.trim():""}function Ns(t,e){let r=String(e||"").trim();return r?Array.isArray(t)?(t.includes(r)||t.push(r),t):[r]:t}function Ga(t={}){if(t?.signal?.aborted)return"\u5DE5\u5177\u7ED3\u679C\u5DF2\u53D6\u6D88\uFF0C\u8DF3\u8FC7\u5199\u56DE";if(typeof t?.shouldAbortWriteback=="function")try{if(t.shouldAbortWriteback()===!0)return"\u5DE5\u5177\u7ED3\u679C\u5DF2\u8FC7\u671F\uFF0C\u8DF3\u8FC7\u5199\u56DE"}catch{return"\u5DE5\u5177\u7ED3\u679C\u5DF2\u8FC7\u671F\uFF0C\u8DF3\u8FC7\u5199\u56DE"}return""}var pt,Et,Eo,xf,qa,Xt,gv,mv,Ya,Dt,hv,Ds=D(()=>{Ze();H();ya();pt=E.createScope("ContextInjector"),Et="YouYouToolkit_toolOutputs",Eo="YouYouToolkit_injectedContext",xf={overwrite:!0,enabled:!0};qa={SUCCESS:"success",FAILED:"failed"},Xt={NONE:"none",LOCAL_ONLY:"local_only",SET_CHAT_MESSAGES:"setChatMessages",SET_CHAT_MESSAGE:"setChatMessage"},gv=60,mv=3;Ya=class{constructor(){this.debugMode=!1}async inject(e,r,s={}){return(await this.injectDetailed(e,r,s)).success}async injectDetailed(e,r,s={}){let o={...xf,...s},n=this._createWritebackResult(e,o);if(!e||r===void 0||r===null)return pt.error("\u6CE8\u5165\u5931\u8D25: \u53C2\u6570\u65E0\u6548"),n.error="\u6CE8\u5165\u5931\u8D25: \u53C2\u6570\u65E0\u6548",n;if(!vc(o.sourceMessageId))return pt.error("\u6CE8\u5165\u5931\u8D25: \u7F3A\u5C11 sourceMessageId"),n.error="\u6CE8\u5165\u5931\u8D25: \u7F3A\u5C11 sourceMessageId",n;if(o?.signal?.aborted)return n.error="\u5DE5\u5177\u7ED3\u679C\u5DF2\u53D6\u6D88\uFF0C\u8DF3\u8FC7\u5199\u56DE",n;if(typeof o?.shouldAbortWriteback=="function")try{if(o.shouldAbortWriteback()===!0)return n.error="\u5DE5\u5177\u7ED3\u679C\u5DF2\u8FC7\u671F\uFF0C\u8DF3\u8FC7\u5199\u56DE",n}catch{return n.error="\u5DE5\u5177\u7ED3\u679C\u5DF2\u8FC7\u671F\uFF0C\u8DF3\u8FC7\u5199\u56DE",n}let a=n.chatId,i={toolId:e,content:String(r),updatedAt:Date.now(),sourceMessageId:o.sourceMessageId||null,sourceSwipeId:o.sourceSwipeId||o.effectiveSwipeId||null,options:o};W.emit(U.TOOL_CONTEXT_INJECTED,{toolId:e,chatId:a,content:i.content,sourceMessageId:i.sourceMessageId,sourceSwipeId:i.sourceSwipeId,effectiveSwipeId:i.sourceSwipeId,slotBindingKey:o.slotBindingKey||"",slotRevisionKey:o.slotRevisionKey||"",slotTransactionId:o.slotTransactionId||"",traceId:o.traceId||"",sessionKey:o.sessionKey||"",options:o});let l=await this._insertToolOutputToBoundAssistantSlot(e,i,o,n);return l.success&&pt.info(`\u6CE8\u5165\u6210\u529F: ${e} -> ${a}`,{inserted:l}),l}getAggregatedContext(e){return this.getLatestMessageInjectedContext()}getLatestMessageInjectedContext(e=null){try{let{chat:r}=this._getChatRuntime(),s=this._findAssistantMessageIndex(r,e);if(s<0)return"";let o=r[s]||{},n=o[Eo];if(typeof n=="string"&&n.trim())return n.trim();let a=o[Et];return a&&typeof a=="object"?this._buildMessageInjectedContext(a).trim():""}catch(r){return pt.warn("\u8BFB\u53D6\u6700\u65B0 AI \u6D88\u606F injectedContext \u5931\u8D25",{error:r}),""}}_getLatestAssistantMessageOutputs(){try{let{chat:e}=this._getChatRuntime(),r=this._findAssistantMessageIndex(e,null);if(r<0)return{};let o=(e[r]||{})[Et];return o&&typeof o=="object"?o:{}}catch(e){return pt.warn("\u8BFB\u53D6\u6700\u65B0 AI \u6D88\u606F\u4E0A\u4E0B\u6587\u5931\u8D25",{error:e}),{}}}getToolContext(e,r){if(!r)return null;try{let{chat:s}=this._getChatRuntime(),o=this._findAssistantMessageIndex(s,null);return o<0?null:s[o]?.[Et]?.[r]||null}catch{return null}}getAllToolContexts(e){return this._getLatestAssistantMessageOutputs()}async clearToolContext(e,r){if(!r)return!1;try{let{api:s,context:o,chat:n}=this._getChatRuntime(),a=this._findAssistantMessageIndex(n,null);if(a<0)return!1;let i=n[a],l=i?.[Et];if(!l||!l[r])return!1;delete l[r],i[Et]=l,i[Eo]=this._buildMessageInjectedContext(l);let d=o?.saveChat||s?.saveChat||null;return typeof d=="function"&&await d.call(o||s),W.emit(U.TOOL_CONTEXT_CLEARED,{chatId:e||this._getCurrentChatId(),toolId:r}),!0}catch(s){return pt.warn("\u6E05\u9664\u5DE5\u5177\u4E0A\u4E0B\u6587\u5931\u8D25",{error:s}),!1}}async clearAllContext(e){try{let{api:r,context:s,chat:o}=this._getChatRuntime(),n=this._findAssistantMessageIndex(o,null);if(n<0)return!1;let a=o[n];delete a[Et],delete a[Eo];let i=s?.saveChat||r?.saveChat||null;return typeof i=="function"&&await i.call(s||r),W.emit(U.TOOL_CONTEXT_CLEARED,{chatId:e||this._getCurrentChatId(),allTools:!0}),!0}catch(r){return pt.warn("\u6E05\u9664\u6240\u6709\u5DE5\u5177\u4E0A\u4E0B\u6587\u5931\u8D25",{error:r}),!1}}clearAllChatsContexts(){pt.info("\u6E05\u9664\u6240\u6709\u4E0A\u4E0B\u6587")}hasToolContext(e,r){return!!this.getToolContext(e,r)}getContextSummary(e){let r=this._getLatestAssistantMessageOutputs(),s=Object.entries(r).map(([o,n])=>({toolId:o,updatedAt:n.updatedAt,contentLength:n.content?.length||0}));return{chatId:e||this._getCurrentChatId(),tools:s,totalCount:s.length}}exportContext(e){return{chatId:e||this._getCurrentChatId(),contexts:this._getLatestAssistantMessageOutputs(),exportedAt:Date.now()}}importContext(e,r={}){return!1}_getChatRuntime(){try{let e=typeof window.parent<"u"&&window.parent!==window?window.parent:window,r=e.SillyTavern||null,s=r?.getContext?.()||null,o=Array.isArray(s?.chat)?s.chat:[],n=Array.isArray(r?.chat)?r.chat:[],a=o.length?o:n;return{topWindow:e,api:r,context:s,chat:a,contextChat:o,apiChat:n}}catch{return{topWindow:null,api:null,context:null,chat:[],contextChat:[],apiChat:[]}}}_createWritebackResult(e,r={}){let s=Xt.SET_CHAT_MESSAGES;return{success:!1,toolId:e,chatId:this._getCurrentChatId(),traceId:r.traceId||"",sessionKey:r.sessionKey||"",sourceMessageId:r.sourceMessageId||null,sourceSwipeId:r.sourceSwipeId||r.effectiveSwipeId||null,effectiveSwipeId:r.effectiveSwipeId||r.sourceSwipeId||null,slotBindingKey:r.slotBindingKey||"",slotRevisionKey:r.slotRevisionKey||"",slotTransactionId:r.slotTransactionId||"",messageIndex:-1,textField:"",blockIdentity:null,hostUpdateMethod:Xt.NONE,commit:{preferredMethod:s,attemptedMethods:[],appliedMethod:Xt.NONE,fallbackUsed:!1,contentCommitted:!1,hostCommitApplied:!1},refresh:{requestMethods:[],requested:!1,confirmChecks:0,confirmed:!1,confirmedBy:"",eventSource:"",eventName:""},contentCommitted:!1,hostCommitApplied:!1,refreshRequested:!1,refreshConfirmed:!1,writebackStatus:qa.FAILED,replacedExistingBlock:!1,insertedNewBlock:!1,conflictDetected:!1,conflictReason:"",preservedOtherToolBlocks:!0,error:"",errors:[],steps:{foundTargetMessage:!1,contentCommitted:!1,localTextApplied:!1,runtimeSynced:!1,hostSetChatMessages:!1,hostSetChatMessage:!1,refreshForceSetChatMessage:!1,saveChatDebounced:!1,saveChat:!1,refreshRequested:!1,notifiedMessageUpdated:!1,verifiedAfterWrite:!1,refreshConfirmed:!1},verification:{textIncludesContent:!1,mirrorStored:!1,refreshConfirmed:!1}}}async _wait(e){await new Promise(r=>setTimeout(r,e))}_collectWritebackVerification(e,r,s,o,n,a=null){let i=e?.contextChat?.[s]||e?.apiChat?.[s]||r?.[s]||a||null,l=this._getWritableMessageField(i).text||"",d=i?.[Et]?.[o],c=n?l.includes(n):!0,u=!!(d&&String(d.content||"").trim()===n);return{latestMessage:i,latestText:l,textIncludesContent:c,mirrorStored:u}}async _confirmRefresh(e,r,s,o,n,a=null){let i=1,l=this._collectWritebackVerification(e,r,s,o,n,a);for(let d=0;d<mv;d+=1){if(l.textIncludesContent&&l.mirrorStored)return{...l,refreshConfirmed:!0,confirmChecks:i,confirmedBy:"text_and_mirror_present"};await this._wait(gv),i+=1,l=this._collectWritebackVerification(e,r,s,o,n,a)}return{...l,refreshConfirmed:l.textIncludesContent&&l.mirrorStored,confirmChecks:i,confirmedBy:l.textIncludesContent&&l.mirrorStored?"text_and_mirror_present":""}}async _requestAssistantMessageRefresh(e,r,s,o={},n=null){let a=n||this._createWritebackResult("",o),{api:i,context:l}=e||{},d=e?.topWindow||(typeof window.parent<"u"&&window.parent!==window?window.parent:window),c=d?.TavernHelper?.setChatMessages||l?.setChatMessages||i?.setChatMessages||d?.setChatMessages||null;a.commit.preferredMethod=typeof c=="function"?Xt.SET_CHAT_MESSAGES:Xt.LOCAL_ONLY;let u=!1,p=Ga(o);if(p)return a.error=p,a;if(typeof c=="function"){Ns(a.commit.attemptedMethods,Xt.SET_CHAT_MESSAGES);try{let y=Ga(o);if(y)return a.error=y,a;let m=vc(o.sourceMessageId)||r;await c([{message_id:m,message:s}],{refresh:"affected"}),a.steps.hostSetChatMessages=!0,a.hostUpdateMethod=Xt.SET_CHAT_MESSAGES,a.hostCommitApplied=!0,a.commit.appliedMethod=Xt.SET_CHAT_MESSAGES,a.commit.hostCommitApplied=!0,u=!0}catch(y){pt.error("setChatMessages \u5199\u56DE\u5931\u8D25\uFF0C\u56DE\u9000\u672C\u5730\u540C\u6B65",{error:y}),a.errors.push(`setChatMessages: ${y?.message||String(y)}`)}}return u&&(a.refreshRequested=!0,Ns(a.refresh.requestMethods,a.hostUpdateMethod)),u||(Ns(a.commit.attemptedMethods,Xt.LOCAL_ONLY),a.commit.appliedMethod=Xt.LOCAL_ONLY,a.commit.fallbackUsed=!0,a.hostUpdateMethod=a.commit.appliedMethod),a}_inferBlockType(e){let r=String(e||"").trim();if(!r)return"empty";let s=r.match(/^<([a-zA-Z0-9_-]+)(?:\s[^>]*)?>[\s\S]*<\/\1>$/);return s?.[1]?s[1]:"plain_text"}_stripExactStoredBlock(e,r,s=""){let o=String(e||""),n=String(r||"").trim(),a=String(s||"").trim();return n?o.includes(n)?a?{text:o.replace(n,a).trimEnd(),removed:!0,replaced:!0}:{text:o.replace(n,"").trimEnd(),removed:!0,replaced:!1}:{text:o,removed:!1,replaced:!1}:{text:o,removed:!1,replaced:!1}}_syncMessageToRuntimeChats(e,r,s){let{contextChat:o,apiChat:n}=e||{},a=i=>{!Array.isArray(i)||r<0||r>=i.length||i[r]!==s&&(i[r]={...i[r]||{},...s})};a(o),a(n)}_notifyMessageUpdated(e,r,s={}){if(s.skipNotify===!0)return{emitted:!1,source:"skipped_by_caller",eventName:""};try{let o=vt.describe(),n=e?.topWindow||ua();return o.hasBridge?(vt.emit(We.MESSAGE_UPDATED,r),typeof n?.requestAnimationFrame=="function"?n.requestAnimationFrame(()=>{vt.emit(We.MESSAGE_UPDATED,r)}):typeof n?.setTimeout=="function"&&n.setTimeout(()=>{vt.emit(We.MESSAGE_UPDATED,r)},30),{emitted:!0,source:o.source||"unavailable",eventName:We.MESSAGE_UPDATED}):{emitted:!1,source:o.source||"unavailable",eventName:We.MESSAGE_UPDATED}}catch(o){return pt.warn("\u89E6\u53D1\u6D88\u606F\u5237\u65B0\u4E8B\u4EF6\u5931\u8D25",{error:o}),{emitted:!1,source:"error",eventName:"",error:o?.message||String(o)}}}_isAssistantMessage(e){if(!e||e.is_user||e.is_system)return!1;let r=String(e.role||"").toLowerCase();return r==="assistant"||r==="ai"||!r}_findAssistantMessageIndex(e,r){let s=Array.isArray(e)?e:[];if(!s.length)return-1;let o=r!=null&&r!=="",n=(a,i)=>{if(!this._isAssistantMessage(a)||r==null||r==="")return!1;let l=String(r).trim();return l?[a.message_id,a.id,a.messageId,a.mes_id,i].map(c=>c==null?"":String(c).trim()).includes(l):!1};for(let a=s.length-1;a>=0;a-=1)if(n(s[a],a))return a;if(o)return-1;for(let a=s.length-1;a>=0;a-=1)if(this._isAssistantMessage(s[a]))return a;return-1}_buildMessageInjectedContext(e){let s=Object.entries(e&&typeof e=="object"?e:{}).filter(([,n])=>n?.blockType!=="full_message").sort(([,n],[,a])=>(n?.updatedAt||0)-(a?.updatedAt||0));if(!s.length)return"";let o=["[\u5DE5\u5177\u4E0A\u4E0B\u6587\u6CE8\u5165]",""];for(let[n,a]of s)o.push(`[${n}]`),o.push(a?.content||""),o.push("");return o.join(`
`)}_getWritableMessageField(e){let r=["mes","message","content","text"];for(let s of r)if(typeof e?.[s]=="string")return{key:s,text:e[s]};return{key:"mes",text:""}}_applyMessageText(e,r,s={}){let o=e&&typeof e=="object"?e:{},n=["mes","message","content","text"],a=!1;if(n.forEach(i=>{typeof o[i]=="string"&&(o[i]=r,a=!0)}),a||(o.mes=r,o.message=r),Array.isArray(o.swipes)){let i=Number.parseInt(vc(s?.sourceSwipeId||s?.effectiveSwipeId),10),l=Number.isInteger(i)?i:Number.isInteger(o.swipe_id)?o.swipe_id:Number.isInteger(o.swipeId)?o.swipeId:0;l>=0&&l<o.swipes.length&&(o.swipes[l]=r,o.swipe_id=l,o.swipeId=l)}return o}_stripExistingToolOutput(e,r=[]){let s=String(e||"");return(Array.isArray(r)?r:[]).forEach(n=>{let a=String(n||"").trim();if(!a)return;if(a.startsWith("regex:")){try{let c=new RegExp(a.slice(6).trim(),"gis");s=s.replace(c,"")}catch(c){pt.warn("\u79FB\u9664\u65E7\u5DE5\u5177\u8F93\u51FA\u65F6\u6B63\u5219\u65E0\u6548",{value:a,error:c})}return}let i=a.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),l=new RegExp(`<${i}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${i}>\\s*`,"gi"),d=new RegExp(`\\{${i}\\|[\\s\\S]*?\\}\\s*`,"gi");s=s.replace(l,""),s=s.replace(d,"")}),s.trimEnd()}_stripPreviousStoredToolContent(e,r){let s=String(e||""),o=String(r||"").trim();return o?s.replace(o,"").trimEnd():s.trimEnd()}async _insertToolOutputToBoundAssistantSlot(e,r,s={},o=null){let n=o||this._createWritebackResult(e,s);try{let a=this._getChatRuntime(),{context:i,chat:l}=a;if(!Array.isArray(l)||!l.length)return pt.error("\u672A\u627E\u5230\u804A\u5929\u6D88\u606F\uFF0C\u65E0\u6CD5\u63D2\u5165\u5DE5\u5177\u8F93\u51FA"),n.error="\u672A\u627E\u5230\u804A\u5929\u6D88\u606F\uFF0C\u65E0\u6CD5\u63D2\u5165\u5DE5\u5177\u8F93\u51FA",n;let d=this._findAssistantMessageIndex(l,s.sourceMessageId);if(d<0)return pt.error("\u672A\u627E\u5230\u53EF\u5199\u5165\u7684\u6700\u65B0 AI \u56DE\u590D\u6D88\u606F"),n.error="\u672A\u627E\u5230\u53EF\u5199\u5165\u7684\u6700\u65B0 AI \u56DE\u590D\u6D88\u606F",n;if(s?.signal?.aborted)return n.error="\u5DE5\u5177\u7ED3\u679C\u5DF2\u53D6\u6D88\uFF0C\u8DF3\u8FC7\u5199\u56DE",n;if(typeof s?.shouldAbortWriteback=="function")try{if(s.shouldAbortWriteback()===!0)return n.error="\u5DE5\u5177\u7ED3\u679C\u5DF2\u8FC7\u671F\uFF0C\u8DF3\u8FC7\u5199\u56DE",n}catch{return n.error="\u5DE5\u5177\u7ED3\u679C\u5DF2\u8FC7\u671F\uFF0C\u8DF3\u8FC7\u5199\u56DE",n}n.messageIndex=d,n.steps.foundTargetMessage=!0;let c=l[d],{key:u,text:p}=this._getWritableMessageField(c);n.textField=u;let y=c[Et]&&typeof c[Et]=="object"?c[Et]:{},m=y?.[e]||{},g=m?.content||"",h=m?.blockText||g||"",x=Object.entries(y).filter(([Ge])=>Ge!==e).map(([,Ge])=>Ge||{}),S=String(r.content||"").trim(),T=s.replaceFullMessage===!0,A=T?"full_message":this._inferBlockType(S),C={toolId:e,messageId:s.sourceMessageId||c?.message_id||c?.messageId||d,blockType:A,insertedAt:r.updatedAt,replaceable:s.overwrite!==!1};n.blockIdentity=C;let w=s.overwrite===!1||T?{text:String(p||""),removed:!1,replaced:!1}:this._stripExactStoredBlock(p,h,S),P=w.text,B="";!T&&s.overwrite!==!1&&h&&!w.removed&&(B="previous_block_not_found");let z=s.overwrite===!1||w.replaced||T?P:this._stripExistingToolOutput(P,s.extractionSelectors),R=z!==P;P=z;let _=s.overwrite===!1||w.replaced||T?P:this._stripPreviousStoredToolContent(P,g),M=_!==P;P=_,n.replacedExistingBlock=T||w.removed||R||M;let j=s.overwrite===!1?String(p||""):P,q=T?S:w.replaced?P.trim():[j.trimEnd(),S].filter(Boolean).join(`

`).trim();n.insertedNewBlock=!!S;let ue=x.every(Ge=>{if(Ge?.blockType==="full_message")return!0;let ns=String(Ge?.blockText||Ge?.content||"").trim();return ns?q.includes(ns):!0});n.preservedOtherToolBlocks=ue,ue?B&&(n.conflictDetected=!0,n.conflictReason=B):(n.conflictDetected=!0,n.conflictReason="other_tool_block_removed");let pe={...y,[e]:{toolId:e,content:S,blockText:S,blockType:A,blockIdentity:C,updatedAt:r.updatedAt,sourceMessageId:r.sourceMessageId||null}},re=Ga(s);if(re)return n.error=re,n;c[u]=q,this._applyMessageText(c,q,s),c[Et]=pe,c[Eo]=this._buildMessageInjectedContext(pe),n.contentCommitted=!0,n.commit.contentCommitted=!0,n.steps.contentCommitted=!0,n.steps.localTextApplied=!0,this._syncMessageToRuntimeChats(a,d,c),n.steps.runtimeSynced=!0;let Te=Ga(s);if(Te)return n.error=Te,n;await this._requestAssistantMessageRefresh(a,d,q,s,n);let Ue=i?.saveChat||a?.api?.saveChat||null,Y=i?.saveChatDebounced||a?.api?.saveChatDebounced||null;typeof Y=="function"&&(Y.call(i||api),n.steps.saveChatDebounced=!0,n.refreshRequested=!0,Ns(n.refresh.requestMethods,"saveChatDebounced")),typeof Ue=="function"&&(await Ue.call(i||api),n.steps.saveChat=!0,n.refreshRequested=!0,Ns(n.refresh.requestMethods,"saveChat"));let Fe=this._notifyMessageUpdated(a,d,s);n.steps.notifiedMessageUpdated=Fe?.emitted===!0,n.refresh.eventSource=Fe?.source||"",n.refresh.eventName=Fe?.eventName||"",Fe?.error&&n.errors.push(`MESSAGE_UPDATED: ${Fe.error}`);let xe=String(r.content||"").trim();(n.steps.hostSetChatMessages||n.steps.hostSetChatMessage)&&(n.refreshRequested=!0,Ns(n.refresh.requestMethods,n.hostUpdateMethod)),n.steps.notifiedMessageUpdated&&(n.refreshRequested=!0,Ns(n.refresh.requestMethods,`MESSAGE_UPDATED:${n.refresh.eventName||"MESSAGE_UPDATED"}`)),n.steps.refreshRequested=n.refreshRequested,n.refresh.requested=n.refreshRequested;let Ne=await this._confirmRefresh(a,l,d,e,xe,c);return n.verification.textIncludesContent=Ne.textIncludesContent,n.verification.mirrorStored=Ne.mirrorStored,n.verification.refreshConfirmed=Ne.refreshConfirmed,n.steps.verifiedAfterWrite=n.verification.textIncludesContent&&n.verification.mirrorStored,n.refreshConfirmed=n.verification.refreshConfirmed&&n.refreshRequested,n.refresh.confirmChecks=Number(Ne.confirmChecks)||0,n.refresh.confirmedBy=Ne.confirmedBy||"",n.refresh.confirmed=n.refreshConfirmed,n.steps.refreshConfirmed=n.refreshConfirmed,n.success=n.steps.localTextApplied&&n.steps.runtimeSynced&&n.steps.verifiedAfterWrite&&n.refreshConfirmed,n.writebackStatus=n.success?qa.SUCCESS:qa.FAILED,!n.success&&!n.error&&(n.error=n.refreshRequested?"\u5DE5\u5177\u7ED3\u679C\u5DF2\u63D0\u4EA4\uFF0C\u4F46\u5BBF\u4E3B\u5237\u65B0\u786E\u8BA4\u672A\u901A\u8FC7":"\u5DE5\u5177\u7ED3\u679C\u5DF2\u5C1D\u8BD5\u5199\u56DE\uFF0C\u4F46\u6700\u7EC8\u6821\u9A8C\u672A\u901A\u8FC7"),n.conflictDetected&&!n.error&&(n.error=`\u5DE5\u5177\u7ED3\u679C\u5DF2\u5199\u56DE\uFF0C\u4F46\u68C0\u6D4B\u5230\u5757\u51B2\u7A81\uFF1A${n.conflictReason}`),pt.info(`\u5DF2\u5C06\u5DE5\u5177\u8F93\u51FA\u5199\u5165\u7ED1\u5B9A assistant \u69FD\u4F4D: ${e} -> #${d}`),n}catch(a){return pt.error("\u63D2\u5165\u6700\u65B0 AI \u56DE\u590D\u539F\u6587\u5931\u8D25",{error:a}),n.error=a?.message||String(a),n.errors.push(n.error),n}}getAssistantMessageSnapshot(e=null){try{let r=this._getChatRuntime(),{chat:s}=r,o=this._findAssistantMessageIndex(s,e);if(o<0)return null;let n=s[o]||null,a=this._getWritableMessageField(n).text||"",i=n?.[Et]&&typeof n[Et]=="object"?n[Et]:{},l=Object.values(i).reduce((d,c)=>{let u=String(c?.blockText||c?.content||"").trim();return!u||!d.includes(u)?d:d.replace(u,"").trimEnd()},String(a||"")).trim();return{messageIndex:o,message:n,messageText:a,baseText:l,toolOutputs:i,injectedContext:typeof n?.[Eo]=="string"?n[Eo]:this._buildMessageInjectedContext(i)}}catch(r){return pt.warn("\u8BFB\u53D6 assistant \u6D88\u606F\u5FEB\u7167\u5931\u8D25",{error:r}),null}}_getCurrentChatId(){try{let e=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(e.SillyTavern?.getContext){let r=e.SillyTavern.getContext(),o=[r?.chatId,r?.chat_id,r?.chat_filename,r?.chatMetadata?.chatId,r?.chatMetadata?.chat_id,r?.chatMetadata?.file_name,r?.chatMetadata?.name,e.SillyTavern?.chatId,e.SillyTavern?.chat_id,e.SillyTavern?.chat_filename].find(a=>typeof a=="string"&&a.trim());if(o)return o;let n=e.SillyTavern?.this_chid;if(n!=null)return`chat_char_${n}`}return"chat_default"}catch{return"chat_default"}}},Dt=new Ya,hv=Dt});var Tf={};ae(Tf,{BUILTIN_VARIABLES:()=>vf,VariableResolver:()=>Va,default:()=>bv,variableResolver:()=>Wt});var Tn,vf,Va,Wt,bv,Ja=D(()=>{Ze();H();Tn=E.createScope("VariableResolver"),vf={lastUserMessage:{name:"lastUserMessage",description:"\u6700\u65B0\u7528\u6237\u6D88\u606F",category:"chat"},lastAiMessage:{name:"lastAiMessage",description:"\u6700\u65B0AI\u56DE\u590D",category:"chat"},chatHistory:{name:"chatHistory",description:"\u6700\u8FD1\u804A\u5929\u8BB0\u5F55",category:"chat"},characterCard:{name:"characterCard",description:"\u5F53\u524D\u89D2\u8272\u5361\u5185\u5BB9",category:"character"},toolName:{name:"toolName",description:"\u5DE5\u5177\u540D\u79F0",category:"tool"},toolId:{name:"toolId",description:"\u5DE5\u5177ID",category:"tool"},toolPromptMacro:{name:"toolPromptMacro",description:"\u5F53\u524D\u5DE5\u5177\u6A21\u677F\u63D0\u793A\u8BCD\u5B8F",category:"tool"},toolContentMacro:{name:"toolContentMacro",description:"\u5F53\u524D\u5DE5\u5177\u5904\u7406\u540E\u7684\u5185\u5BB9\u5B8F",category:"tool"},toolWorldbookContent:{name:"toolWorldbookContent",description:"\u5F53\u524D\u5DE5\u5177\u9009\u62E9\u7684\u4E16\u754C\u4E66\u6CE8\u5165\u5185\u5BB9",category:"tool"},injectedContext:{name:"injectedContext",description:"\u5DF2\u6CE8\u5165\u7684\u5DE5\u5177\u4E0A\u4E0B\u6587",category:"context"},extractedContent:{name:"extractedContent",description:"\u5DE5\u5177\u63D0\u53D6\u5185\u5BB9",category:"context"},recentMessagesText:{name:"recentMessagesText",description:"\u6700\u8FD1\u6D88\u606F\u6B63\u6587",category:"context"},rawRecentMessagesText:{name:"rawRecentMessagesText",description:"\u6700\u8FD1\u6D88\u606F\u539F\u6587",category:"context"},userMessage:{name:"userMessage",description:"\u5F53\u524D\u7528\u6237\u6D88\u606F",category:"chat"},previousToolOutput:{name:"previousToolOutput",description:"\u4E0A\u4E00\u6B21\u5DE5\u5177\u8F93\u51FA",category:"context"}},Va=class{constructor(){this.customVariables=new Map,this.variableHandlers=new Map,this.debugMode=!1,this._registerDefaultHandlers()}resolveTemplate(e,r){if(typeof e!="string")return e;let s=e;return s=this._resolveBuiltinVariables(s,r),s=this._resolveCustomVariables(s,r),s=this._resolveRegexVariables(s,r),s}resolveObject(e,r){if(!e||typeof e!="object")return e;if(Array.isArray(e))return e.map(o=>this.resolveObject(o,r));let s={};for(let[o,n]of Object.entries(e))typeof n=="string"?s[o]=this.resolveTemplate(n,r):typeof n=="object"&&n!==null?s[o]=this.resolveObject(n,r):s[o]=n;return s}buildToolContext(e){return{lastUserMessage:e.lastUserMessage||"",lastAiMessage:e.lastAiMessage||"",chatHistory:e.chatHistory||[],characterCard:e.characterCard||null,characterName:e.characterCard?.name||"",toolName:e.toolName||"",toolId:e.toolId||"",toolPromptMacro:e.toolPromptMacro||"",toolContentMacro:e.toolContentMacro||"",toolWorldbookContent:e.toolWorldbookContent||"",injectedContext:e.injectedContext||"",extractedContent:e.extractedContent||"",recentMessagesText:e.recentMessagesText||"",rawRecentMessagesText:e.rawRecentMessagesText||"",userMessage:e.userMessage||"",previousToolOutput:e.previousToolOutput||"",regexResults:e.regexResults||{},raw:e,timestamp:Date.now()}}registerVariable(e,r){e&&(this.customVariables.set(e,r),Tn.info(`\u6CE8\u518C\u81EA\u5B9A\u4E49\u53D8\u91CF: ${e}`))}unregisterVariable(e){this.customVariables.delete(e),Tn.info(`\u6CE8\u9500\u81EA\u5B9A\u4E49\u53D8\u91CF: ${e}`)}registerHandler(e,r){!e||typeof r!="function"||(this.variableHandlers.set(e,r),Tn.info(`\u6CE8\u518C\u53D8\u91CF\u5904\u7406\u5668: ${e}`))}getAvailableVariables(){let e=[];for(let[,r]of Object.entries(vf))e.push({name:`{{${r.name}}}`,description:r.description,category:r.category,type:"builtin"});for(let[r,s]of this.customVariables)e.push({name:`{{${r}}}`,description:typeof s=="function"?"\u81EA\u5B9A\u4E49\u51FD\u6570\u53D8\u91CF":"\u81EA\u5B9A\u4E49\u9759\u6001\u53D8\u91CF",category:"custom",type:"custom"});return e}getVariableHelp(){let e=["\u53EF\u7528\u53D8\u91CF\uFF1A",""],r={chat:"\u804A\u5929\u76F8\u5173",character:"\u89D2\u8272\u76F8\u5173",tool:"\u5DE5\u5177\u76F8\u5173",context:"\u4E0A\u4E0B\u6587\u76F8\u5173",custom:"\u81EA\u5B9A\u4E49\u53D8\u91CF"},s={};for(let o of this.getAvailableVariables())s[o.category]||(s[o.category]=[]),s[o.category].push(o);for(let[o,n]of Object.entries(r))if(s[o]&&s[o].length>0){e.push(`\u3010${n}\u3011`);for(let a of s[o])e.push(`  ${a.name} - ${a.description}`);e.push("")}return e.push("\u3010\u6B63\u5219\u63D0\u53D6\u3011"),e.push("  {{regex.xxx}} - \u4F7F\u7528\u6B63\u5219\u63D0\u53D6\u7ED3\u679C\uFF0Cxxx\u4E3A\u6355\u83B7\u7EC4\u540D"),e.join(`
`)}_registerDefaultHandlers(){this.registerHandler("regex",(e,r)=>(r.regexResults||r.raw?.regexResults||{})[e]||"")}_resolveBuiltinVariables(e,r){let s=e;return s=s.replace(/\{\{lastUserMessage\}\}/gi,r.lastUserMessage||r.raw?.lastUserMessage||""),s=s.replace(/\{\{lastAiMessage\}\}/gi,r.lastAiMessage||r.raw?.lastAiMessage||""),s=s.replace(/\{\{chatHistory\}\}/gi,()=>{let o=r.chatHistory||r.raw?.chatHistory||[];return this._formatChatHistory(o)}),s=s.replace(/\{\{characterCard\}\}/gi,()=>{let o=r.characterCard||r.raw?.characterCard;return o?this._formatCharacterCard(o):""}),s=s.replace(/\{\{toolName\}\}/gi,r.toolName||r.raw?.toolName||""),s=s.replace(/\{\{toolId\}\}/gi,r.toolId||r.raw?.toolId||""),s=s.replace(/\{\{toolPromptMacro\}\}/gi,r.toolPromptMacro||r.raw?.toolPromptMacro||""),s=s.replace(/\{\{toolContentMacro\}\}/gi,r.toolContentMacro||r.raw?.toolContentMacro||""),s=s.replace(/\{\{toolWorldbookContent\}\}/gi,r.toolWorldbookContent||r.raw?.toolWorldbookContent||""),s=s.replace(/\{\{injectedContext\}\}/gi,r.injectedContext||r.raw?.injectedContext||""),s=s.replace(/\{\{extractedContent\}\}/gi,r.extractedContent||r.raw?.extractedContent||""),s=s.replace(/\{\{recentMessagesText\}\}/gi,r.recentMessagesText||r.raw?.recentMessagesText||""),s=s.replace(/\{\{rawRecentMessagesText\}\}/gi,r.rawRecentMessagesText||r.raw?.rawRecentMessagesText||""),s=s.replace(/\{\{userMessage\}\}/gi,r.userMessage||r.raw?.userMessage||""),s=s.replace(/\{\{previousToolOutput\}\}/gi,r.previousToolOutput||r.raw?.previousToolOutput||""),s}_resolveCustomVariables(e,r){let s=e;for(let[o,n]of this.customVariables){let a=new RegExp(`\\{\\{${this._escapeRegex(o)}\\}\\}`,"gi");typeof n=="function"?s=s.replace(a,()=>{try{return n(r)}catch(i){return Tn.error(`\u53D8\u91CF\u5904\u7406\u9519\u8BEF ${o}:`,i),""}}):s=s.replace(a,String(n))}return s}_resolveRegexVariables(e,r){let s=e;for(let[o,n]of this.variableHandlers){let a=new RegExp(`\\{\\{${o}\\.([^}]+)\\}\\}`,"gi");s=s.replace(a,(i,l)=>{try{return n(l,r)}catch(d){return Tn.error(`\u53D8\u91CF\u5904\u7406\u9519\u8BEF ${o}.${l}:`,d),""}})}return s}_formatChatHistory(e){return!Array.isArray(e)||e.length===0?"":e.map(r=>{let s=r.role||"unknown",o=r.content||r.mes||"";return`[${s}]: ${o}`}).join(`

`)}_formatCharacterCard(e){if(!e)return"";let r=[];return e.name&&r.push(`\u59D3\u540D: ${e.name}`),e.description&&r.push(`\u63CF\u8FF0: ${e.description}`),e.personality&&r.push(`\u6027\u683C: ${e.personality}`),e.scenario&&r.push(`\u573A\u666F: ${e.scenario}`),r.join(`

`)}_escapeRegex(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}},Wt=new Va,bv=Wt});var Ef={};ae(Ef,{DEFAULT_PROMPT_TEMPLATE:()=>_f,ToolPromptService:()=>Xa,default:()=>xv,toolPromptService:()=>Ls});var Sf,_f,Xa,Ls,xv,Qa=D(()=>{Ze();_o();Ja();da();H();Sf=E.createScope("ToolPromptService"),_f="\u8BF7\u5904\u7406\u4EE5\u4E0BAI\u56DE\u590D\u5185\u5BB9\uFF1A",Xa=class{constructor(){this.debugMode=!1}async _buildVariableContext(e,r={}){let s=this._getPromptTemplate(e),o=String(r?.toolWorldbookContent||r?.input?.toolWorldbookContent||await ca(e)).trim(),n=Wt.buildToolContext({...r,toolName:e?.name||r?.toolName||"",toolId:e?.id||r?.toolId||"",toolWorldbookContent:o}),a=Wt.resolveTemplate(s,n).trim(),i=String(r?.toolContentMacro||r?.input?.toolContentMacro||"").trim();return Wt.buildToolContext({...r,toolName:e?.name||r?.toolName||"",toolId:e?.id||r?.toolId||"",toolPromptMacro:a,toolContentMacro:i,toolWorldbookContent:o})}async buildToolMessages(e,r){if(!e)return Sf.error("\u6784\u5EFA\u5931\u8D25: \u5DE5\u5177\u914D\u7F6E\u4E3A\u7A7A"),[];let s=[],o=await this._buildVariableContext(e,r),n=Array.isArray(e.promptMessages)?e.promptMessages:[],a=this._getBypassMessages(e),i=a?.some(l=>l.mainSlot==="A"||l.mainSlot==="B"||l.isMain||l.isMain2);if(a&&a.length>0)for(let l of a)l.enabled!==!1&&s.push({role:this._normalizeRole(l.role),content:Wt.resolveTemplate(l.content||"",o)});if(!i&&n.length>0)for(let l of n){let d=Wt.resolveTemplate(l?.content||"",o).trim();d&&s.push({role:this._normalizeRole(l?.role),content:d})}else if(!i&&!a?.length){let l=this._buildUserContent(this._getPromptTemplate(e),o);l&&s.push({role:"user",content:l})}return Sf.debug(`\u6784\u5EFA\u6D88\u606F: ${s.length} \u6761`),s}async buildPromptText(e,r){let s=await this._buildVariableContext(e,r),o=Array.isArray(e?.promptMessages)?e.promptMessages:[];return o.length>0?o.map(n=>Wt.resolveTemplate(n?.content||"",s).trim()).filter(Boolean).join(`

`):s.toolPromptMacro||""}getToolPromptTemplate(e){return this._getPromptTemplate(e)}_getPromptTemplate(e){return e.promptTemplate&&typeof e.promptTemplate=="string"?e.promptTemplate:_f}_getBypassMessages(e){return e.bypass?.enabled?ye.buildBypassMessages(e):[]}_buildUserContent(e,r){return!e||!e.trim()?"":Wt.resolveTemplate(e,r).trim()}_normalizeRole(e){if(!e)return"user";switch(String(e).toLowerCase()){case"system":return"system";case"assistant":return"assistant";case"user":default:return"user"}}setDebugMode(e){this.debugMode=e}},Ls=new Xa,xv=Ls});var Cf={};ae(Cf,{LEGACY_OUTPUT_MODES:()=>wv,OUTPUT_MODES:()=>Lt,TOOL_FAILURE_STAGES:()=>Xe,TOOL_RUNTIME_STATUS:()=>vv,TOOL_WRITEBACK_STATUS:()=>Ke,ToolOutputService:()=>Za,default:()=>Tv,toolOutputService:()=>Ot});function Af(t){if(t?.signal?.aborted)return{aborted:!0,stale:!1,reason:"cancelled_before_host_commit"};if(typeof t?.shouldAbortWriteback=="function")try{return t.shouldAbortWriteback()||!1}catch{return{aborted:!0,stale:!0,reason:"stale_base_changed"}}return!1}function Ao(t=[],e="",r=null){return{request:{built:Array.isArray(t)&&t.length>0,messageCount:Array.isArray(t)?t.length:0},extract:{completed:!0,hasOutput:!!String(e||"").trim()},writeback:{attempted:!!r,contentCommitted:!!r?.contentCommitted,hostCommitApplied:!!r?.hostCommitApplied,writebackStatus:r?.writebackStatus||"",preferredCommitMethod:r?.commit?.preferredMethod||"",appliedCommitMethod:r?.commit?.appliedMethod||"",fallbackUsed:!!r?.commit?.fallbackUsed},refresh:{requested:!!r?.refreshRequested,confirmed:!!r?.refreshConfirmed,requestMethods:Array.isArray(r?.refresh?.requestMethods)?[...r.refresh.requestMethods]:[],confirmChecks:Number(r?.refresh?.confirmChecks)||0,confirmedBy:r?.refresh?.confirmedBy||""}}}var Zr,Lt,wv,vv,Xe,Ke,Za,Ot,Tv,Sn=D(()=>{Ze();vn();H();Ds();Qa();Qs();Fr();Jn();Zr=E.createScope("ToolOutputService"),Lt={FOLLOW_AI:"follow_ai",POST_RESPONSE_API:"post_response_api",LOCAL_TRANSFORM:"local_transform"},wv={inline:"follow_ai"},vv={IDLE:"idle",RUNNING:"running",SUCCESS:"success",ERROR:"error"},Xe={BUILD_MESSAGES:"build_messages",SEND_API_REQUEST:"send_api_request",EXTRACT_OUTPUT:"extract_output",INJECT_CONTEXT:"inject_context",COMPATIBILITY_EXECUTE:"compatibility_execute",UNKNOWN:"unknown"},Ke={SUCCESS:"success",FAILED:"failed",SKIPPED_EMPTY_OUTPUT:"skipped_empty_output",NOT_APPLICABLE:"not_applicable"};Za=class{constructor(){this.debugMode=!1,this._apiConnection=null}shouldRunPostResponse(e){return!e||!e.enabled||!e.output?.enabled?!1:e.output?.mode===Lt.POST_RESPONSE_API}shouldRunLocalTransform(e){return!e||!e.enabled||!e.output?.enabled?!1:e.output?.mode===Lt.LOCAL_TRANSFORM||!!e.processor?.type}shouldRunFollowAi(e){if(!e||!e.enabled||!e.output?.enabled)return!1;let r=e.output?.mode;return r===Lt.FOLLOW_AI||r==="inline"}shouldRunInline(e){return this.shouldRunFollowAi(e)}async runToolPostResponse(e,r){let s=Date.now(),o=e.id,n=r?.traceId||`trace_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,a=r?.sessionKey||"",i=r?.executionKey||"",l=this._getExtractionSelectors(e),d=e?.extraction?.writebackTag?.trim(),c=d?[d]:l,u=e.output?.apiPreset||e.apiPreset||"",p="",y=Ke.NOT_APPLICABLE,m=null,g=[],h="";Zr.info(`\u5F00\u59CB\u6267\u884C\u5DE5\u5177: ${o}`),W.emit(U.TOOL_EXECUTION_STARTED,{toolId:o,traceId:n,sessionKey:a,mode:Lt.POST_RESPONSE_API});try{if(p=Xe.BUILD_MESSAGES,g=await this._buildToolMessages(e,r),!g||g.length===0)throw new Error("\u672A\u6784\u5EFA\u51FA\u53EF\u53D1\u9001\u7684\u5DE5\u5177\u8BF7\u6C42\u6D88\u606F\uFF0C\u8BF7\u68C0\u67E5\u63D0\u793A\u8BCD\u6A21\u677F\u6216\u7834\u9650\u8BCD\u914D\u7F6E\u662F\u5426\u4E3A\u7A7A\u3002");Zr.debug(`\u6784\u5EFA\u4E86 ${g.length} \u6761\u6D88\u606F`);let x=Af(r);if(x){let w=Date.now()-s;return{success:!1,toolId:o,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88",duration:w,meta:{traceId:n,sessionKey:a,executionKey:i,sourceMessageId:r?.sourceMessageId||r?.confirmedAssistantMessageId||r?.messageId||"",sourceSwipeId:r?.sourceSwipeId||r?.confirmedAssistantSwipeId||r?.effectiveSwipeId||"",slotRevisionKey:r?.slotRevisionKey||"",selectors:l,apiPreset:u,writebackStatus:y,failureStage:p,writebackDetails:m,aborted:x.aborted===!0,stale:x.stale===!0,abortReason:x.reason||"",phases:Ao(g,h,m)}}}let S=await this._getRequestTimeout();p=Xe.SEND_API_REQUEST;let T=await this._sendApiRequest(u,g,{timeoutMs:S,signal:r.signal});p=Xe.EXTRACT_OUTPUT,h=this._extractOutputContent(T,e);let A=Af(r);if(A){let w=Date.now()-s;return{success:!1,toolId:o,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88",duration:w,meta:{traceId:n,sessionKey:a,executionKey:i,sourceMessageId:r?.sourceMessageId||r?.confirmedAssistantMessageId||r?.messageId||"",sourceSwipeId:r?.sourceSwipeId||r?.confirmedAssistantSwipeId||r?.effectiveSwipeId||"",slotRevisionKey:r?.slotRevisionKey||"",selectors:l,apiPreset:u,writebackStatus:y,failureStage:p,writebackDetails:m,aborted:A.aborted===!0,stale:A.stale===!0,abortReason:A.reason||"",phases:Ao(g,h,m)}}}if(h){if(p=Xe.INJECT_CONTEXT,m=await Dt.injectDetailed(o,h,{overwrite:e.output?.overwrite!==!1,sourceMessageId:r.sourceMessageId||r.confirmedAssistantMessageId||r.messageId||"",sourceSwipeId:r.sourceSwipeId||r.confirmedAssistantSwipeId||r.effectiveSwipeId||"",effectiveSwipeId:r.effectiveSwipeId||r.confirmedAssistantSwipeId||"",slotBindingKey:r.slotBindingKey||"",slotRevisionKey:r.slotRevisionKey||"",slotTransactionId:r.slotTransactionId||"",extractionSelectors:c,traceId:n,sessionKey:a,signal:r.signal,shouldAbortWriteback:r.shouldAbortWriteback,isAutoRun:r.isAutoRun===!0,skipNotify:r.skipNotify===!0}),!m?.success)throw y=Ke.FAILED,new Error(m?.error||"\u5DE5\u5177\u7ED3\u679C\u5DF2\u751F\u6210\uFF0C\u4F46\u5199\u5165\u4E0A\u4E0B\u6587/\u4E16\u754C\u4E66\u5931\u8D25");y=Ke.SUCCESS}else y=Ke.SKIPPED_EMPTY_OUTPUT;p="";let C=Date.now()-s;return W.emit(U.TOOL_EXECUTED,{toolId:o,traceId:n,sessionKey:a,success:!0,duration:C,mode:Lt.POST_RESPONSE_API}),Zr.info(`\u5DE5\u5177\u6267\u884C\u6210\u529F: ${o}, \u8017\u65F6 ${C}ms`),{success:!0,toolId:o,output:h,duration:C,meta:{traceId:n,sessionKey:a,executionKey:i,slotBindingKey:r?.slotBindingKey||"",slotTransactionId:r?.slotTransactionId||"",generationAction:r?.generationAction||"",generationActionSource:r?.generationActionSource||"",rawGenerationType:r?.rawGenerationType||"",normalizedGenerationType:r?.normalizedGenerationType||"",generationMessageBindingSource:r?.generationMessageBindingSource||"",sourceMessageId:r?.sourceMessageId||r?.confirmedAssistantMessageId||r?.messageId||"",sourceSwipeId:r?.sourceSwipeId||r?.confirmedAssistantSwipeId||r?.effectiveSwipeId||"",confirmedAssistantSwipeId:r?.confirmedAssistantSwipeId||"",effectiveSwipeId:r?.effectiveSwipeId||"",slotRevisionKey:r?.slotRevisionKey||"",messageCount:g.length,selectors:l,apiPreset:u,writebackStatus:y,failureStage:"",writebackDetails:m,phases:Ao(g,h,m)}}}catch(x){let S=Date.now()-s,T=p||Xe.UNKNOWN,A=y||Ke.NOT_APPLICABLE;return Zr.error(`\u5DE5\u5177\u6267\u884C\u5931\u8D25: ${o}`,{error:x}),W.emit(U.TOOL_EXECUTION_FAILED,{toolId:o,traceId:n,sessionKey:a,error:x.message||String(x),duration:S}),{success:!1,toolId:o,error:x.message||String(x),duration:S,meta:{traceId:n,sessionKey:a,executionKey:i,slotBindingKey:r?.slotBindingKey||"",slotTransactionId:r?.slotTransactionId||"",generationAction:r?.generationAction||"",generationActionSource:r?.generationActionSource||"",rawGenerationType:r?.rawGenerationType||"",normalizedGenerationType:r?.normalizedGenerationType||"",generationMessageBindingSource:r?.generationMessageBindingSource||"",sourceMessageId:r?.sourceMessageId||r?.confirmedAssistantMessageId||r?.messageId||"",sourceSwipeId:r?.sourceSwipeId||r?.confirmedAssistantSwipeId||r?.effectiveSwipeId||"",confirmedAssistantSwipeId:r?.confirmedAssistantSwipeId||"",effectiveSwipeId:r?.effectiveSwipeId||"",slotRevisionKey:r?.slotRevisionKey||"",messageCount:g.length,selectors:l,apiPreset:u,writebackStatus:A,failureStage:T,writebackDetails:m,phases:Ao(g,h,m)}}}}async runToolFollowAiManual(e,r){let s=Date.now(),o=e.id,n=r?.traceId||`trace_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,a=r?.sessionKey||"",i=r?.executionKey||"",l=e.output?.apiPreset||e.apiPreset||"",d=this._getExtractionSelectors(e),c=e?.extraction?.writebackTag?.trim(),u=c?[c]:d,p="",y=Ke.NOT_APPLICABLE,m=null,g=[],h="";W.emit(U.TOOL_EXECUTION_STARTED,{toolId:o,traceId:n,sessionKey:a,mode:Lt.FOLLOW_AI});try{if(p=Xe.BUILD_MESSAGES,g=await this._buildToolMessages(e,r),!g||g.length===0)throw new Error("\u672A\u6784\u5EFA\u51FA\u53EF\u53D1\u9001\u7684\u5DE5\u5177\u8BF7\u6C42\u6D88\u606F\uFF0C\u8BF7\u68C0\u67E5\u63D0\u793A\u8BCD\u6A21\u677F\u6216\u7834\u9650\u8BCD\u914D\u7F6E\u662F\u5426\u4E3A\u7A7A\u3002");let x=await this._getRequestTimeout();p=Xe.SEND_API_REQUEST;let S=await this._sendApiRequest(l,g,{timeoutMs:x,signal:r.signal});if(p=Xe.EXTRACT_OUTPUT,h=this._extractOutputContent(S,e),h){if(p=Xe.INJECT_CONTEXT,m=await Dt.injectDetailed(o,h,{overwrite:e.output?.overwrite!==!1,sourceMessageId:r.sourceMessageId||r.confirmedAssistantMessageId||r.messageId||"",sourceSwipeId:r.sourceSwipeId||r.confirmedAssistantSwipeId||r.effectiveSwipeId||"",effectiveSwipeId:r.effectiveSwipeId||r.confirmedAssistantSwipeId||"",slotBindingKey:r.slotBindingKey||"",slotRevisionKey:r.slotRevisionKey||"",slotTransactionId:r.slotTransactionId||"",extractionSelectors:u,traceId:n,sessionKey:a}),!m?.success)throw y=Ke.FAILED,new Error(m?.error||"\u5DE5\u5177\u7ED3\u679C\u5DF2\u751F\u6210\uFF0C\u4F46\u5199\u5165\u4E0A\u4E0B\u6587/\u4E16\u754C\u4E66\u5931\u8D25");y=Ke.SUCCESS}else y=Ke.SKIPPED_EMPTY_OUTPUT;p="";let T=Date.now()-s;return W.emit(U.TOOL_EXECUTED,{toolId:o,traceId:n,sessionKey:a,success:!0,duration:T,mode:Lt.FOLLOW_AI}),{success:!0,toolId:o,output:h,duration:T,meta:{traceId:n,sessionKey:a,executionKey:i,slotBindingKey:r?.slotBindingKey||"",slotTransactionId:r?.slotTransactionId||"",sourceMessageId:r?.sourceMessageId||r?.confirmedAssistantMessageId||r?.messageId||"",sourceSwipeId:r?.sourceSwipeId||r?.confirmedAssistantSwipeId||r?.effectiveSwipeId||"",confirmedAssistantSwipeId:r?.confirmedAssistantSwipeId||"",effectiveSwipeId:r?.effectiveSwipeId||"",slotRevisionKey:r?.slotRevisionKey||"",messageCount:g.length,selectors:d,apiPreset:l,writebackStatus:y,failureStage:"",writebackDetails:m,phases:Ao(g,h,m)}}}catch(x){let S=Date.now()-s,T=p||Xe.UNKNOWN,A=y||Ke.NOT_APPLICABLE;return W.emit(U.TOOL_EXECUTION_FAILED,{toolId:o,traceId:n,sessionKey:a,error:x.message||String(x),duration:S,mode:Lt.FOLLOW_AI}),{success:!1,toolId:o,error:x.message||String(x),duration:S,meta:{traceId:n,sessionKey:a,executionKey:i,slotBindingKey:r?.slotBindingKey||"",slotTransactionId:r?.slotTransactionId||"",sourceMessageId:r?.sourceMessageId||r?.confirmedAssistantMessageId||r?.messageId||"",sourceSwipeId:r?.sourceSwipeId||r?.confirmedAssistantSwipeId||r?.effectiveSwipeId||"",confirmedAssistantSwipeId:r?.confirmedAssistantSwipeId||"",effectiveSwipeId:r?.effectiveSwipeId||"",slotRevisionKey:r?.slotRevisionKey||"",messageCount:g.length,selectors:d,apiPreset:l,writebackStatus:A,failureStage:T,writebackDetails:m,phases:Ao(g,h,m)}}}}async runToolInline(e,r){return this.runToolFollowAiManual(e,r)}async previewExtraction(e,r){return{success:!0,...this.getExtractionSnapshot(e,r)}}getExtractionSnapshot(e,r){let s=this._buildRecentMessageExtractionEntries(e,r),o=this._joinMessageBlocks(s,"rawText"),n=this._joinMessageBlocks(s,"filteredText"),a=this._joinMessageBlocks(s,"extractedText",{skipEmpty:!0}),i=(Array.isArray(s)?s:[]).map(d=>String(d?.extractedText||"").trim()).filter(Boolean).join(`

`),l=Array.isArray(s)&&s.length>0?s[s.length-1]:null;return{sourceText:o,filteredSourceText:n,extractedText:a,extractedRawText:i,messageEntries:s,primaryEntry:l,selectors:this._getExtractionSelectors(e),maxMessages:e?.extraction?.maxMessages||5}}async _buildToolMessages(e,r){let s=this._buildRecentMessageExtractionEntries(e,r),o=this._joinMessageBlocks(s,"rawText"),n=this._joinMessageBlocks(s,"filteredText"),a=this._joinMessageBlocks(s,"extractedText",{skipEmpty:!0}),i={...r,rawRecentMessagesText:o,recentMessagesText:n,extractedContent:a,toolContentMacro:this._buildToolContentMacro(s),toolName:e.name,toolId:e.id};return Ls.buildToolMessages(e,i)}_normalizeRole(e){if(!e)return"user";let r=String(e).toLowerCase();return r==="system"?"system":r==="assistant"?"assistant":"user"}setApiConnection(e){this._apiConnection=e}async _sendApiRequest(e,r,s={}){if(!this._apiConnection)throw new Error("API\u8FDE\u63A5\u6A21\u5757\u672A\u914D\u7F6E");let{timeoutMs:o=9e4,signal:n}=s,a=null;if(e){if(!jo(e))throw new Error(`\u672A\u627E\u5230 API \u9884\u8BBE\u201C${e}\u201D\uFF0C\u8BF7\u91CD\u65B0\u9009\u62E9\u6216\u4FDD\u5B58\u540E\u518D\u6267\u884C`);a=Fo(e)}else a=Fo();let i=Vn(a||{});if(!i.valid&&!a?.useMainApi)throw new Error(`API\u914D\u7F6E\u65E0\u6548\uFF1A${i.errors.join("\uFF0C")}\u3002\u8BF7\u5148\u5B8C\u5584\u81EA\u5B9A\u4E49API\u914D\u7F6E\uFF0C\u6216\u542F\u7528\u201C\u4F7F\u7528SillyTavern\u4E3BAPI\u201D`);if(this._apiConnection.sendApiRequest)return await this._apiConnection.sendApiRequest(r,{timeoutMs:o,apiConfig:a},n);throw new Error("\u6CA1\u6709\u53EF\u7528\u7684API\u53D1\u9001\u65B9\u6CD5")}async _getRequestTimeout(){return jt.getSettings().executor?.requestTimeoutMs||9e4}_extractOutputContent(e,r){if(!e)return"";if(typeof e=="string")return this._applyOutputExtractionSelectors(e,r);if(typeof e=="object"){if(e.choices&&e.choices[0]?.message?.content)return this._applyOutputExtractionSelectors(e.choices[0].message.content,r);if(e.content)return this._applyOutputExtractionSelectors(e.content,r);if(e.text)return this._applyOutputExtractionSelectors(e.text,r);if(e.message)return this._applyOutputExtractionSelectors(e.message,r);try{return this._applyOutputExtractionSelectors(JSON.stringify(e,null,2),r)}catch{return this._applyOutputExtractionSelectors(String(e),r)}}return this._applyOutputExtractionSelectors(String(e),r)}_applyOutputExtractionSelectors(e,r){let s=typeof e=="string"?e:String(e||""),o=this._getExtractionSelectors(r);if(!o.length)return s.trim();let n=[];for(let a of o){let i=String(a||"").trim();if(!i)continue;if(i.startsWith("regex:")){let d=i.slice(6).trim();if(!d)continue;try{let c=new RegExp(d,"gi");[...s.matchAll(c)].forEach(p=>{let y=String(p?.[0]||"").trim();y&&n.push(y)})}catch(c){Zr.warn("\u5DE5\u5177\u8F93\u51FA\u6B63\u5219\u63D0\u53D6\u5931\u8D25\uFF0C\u8DF3\u8FC7\u8BE5\u89C4\u5219",{selector:i,error:c})}continue}let l=i.replace(/^<|>$/g,"").trim();if(l)try{let d=new RegExp(`<${l}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${l}>`,"gi");(s.match(d)||[]).forEach(u=>{let p=String(u||"").trim();p&&n.push(p)})}catch(d){Zr.warn("\u5DE5\u5177\u8F93\u51FA\u6807\u7B7E\u63D0\u53D6\u5931\u8D25\uFF0C\u8DF3\u8FC7\u8BE5\u89C4\u5219",{selector:i,error:d})}}return n.length>0?n.join(`

`).trim():s.trim()}_resolveExtractionContext(e){let r=e?.extraction?.regexPresetId;if(!r)return{rules:[],blacklist:[]};try{let s=vr(r);if(!s)return{rules:[],blacklist:[]};let o=Array.isArray(s.rules)?s.rules.filter(a=>a&&a.enabled!==!1&&a.value).map(a=>({id:a.id,type:a.type,value:a.value,enabled:!0})):[],n=Array.isArray(s.blacklist)?s.blacklist.map(a=>String(a||"").trim()).filter(Boolean):[];return{rules:o,blacklist:n}}catch(s){return Zr.warn("_resolveExtractionContext \u5F02\u5E38",{error:s}),{rules:[],blacklist:[]}}}_getExtractionSelectors(e){let{rules:r}=this._resolveExtractionContext(e),s=[];for(let o of r){let n=String(o.value||"").trim();n&&(o.type==="include"?s.push(n):o.type==="regex_include"&&s.push(`regex:${n}`))}return s}_applyExtractionSelectors(e,r){return this._applyExtractionSelectorsInternal(e,r,{strict:!1})}_applyExtractionSelectorsInternal(e,r,s={}){let o=typeof e=="string"?e:String(e||""),{rules:n,blacklist:a}=this._resolveExtractionContext(r),{strict:i=!1}=s;if(!n.length)return o.trim();let l=xr(o,n,a||[]);return i?(l||"").trim():l||o.trim()}_extractToolContent(e,r){let s=typeof r=="string"?r:String(r||""),{rules:o}=this._resolveExtractionContext(e);return o.length?this._applyExtractionSelectorsInternal(s,e,{strict:!0}):s.trim()}_applyGlobalContextRules(e){let r=typeof e=="string"?e:String(e||"");if(!r.trim())return"";try{let s=Js()||[],o=Xs()||[];return!Array.isArray(s)||s.length===0?r.trim():xr(r,s,o)||r.trim()}catch(s){return Zr.warn("\u5E94\u7528\u5168\u5C40\u6B63\u6587\u63D0\u53D6\u89C4\u5219\u5931\u8D25\uFF0C\u56DE\u9000\u539F\u59CB\u6587\u672C",{error:s}),r.trim()}}_getMessageText(e){if(!e)return"";let r=[e.content,e.mes,e.message,e.text,e?.data?.content];for(let s of r)if(typeof s=="string"&&s.trim())return s.trim();return""}_collectRecentAssistantMessages(e,r){return this._collectRecentAssistantMessageEntries(e,r).map(s=>s.text).filter(Boolean).join(`

`)}_collectRecentAssistantMessageEntries(e,r){let s=Math.max(1,parseInt(e?.extraction?.maxMessages,10)||5),o=Array.isArray(r?.chatMessages)?r.chatMessages:[],n=[];for(let i=o.length-1;i>=0&&n.length<s;i-=1){let l=o[i],d=String(l?.role||"").toLowerCase(),c=d==="assistant"||d==="ai"||!l?.is_user&&!l?.is_system&&!d,u=this._getMessageText(l);c&&u&&n.unshift({text:u,message:l,chatIndex:i})}if(n.length>0)return n;let a=r?.lastAiMessage||r?.input?.lastAiMessage||"";return a?[{text:a,message:null,chatIndex:-1}]:[]}_buildRecentMessageExtractionEntries(e,r){return this._collectRecentAssistantMessageEntries(e,r).map((o,n)=>{let a=o.text||"",i=this._applyGlobalContextRules(a),l=this._extractToolContent(e,a);return{...o,order:n+1,rawText:a,filteredText:i,extractedText:l,fullMessageText:a}})}_joinMessageBlocks(e,r,s={}){let o=Array.isArray(e)?e:[],{skipEmpty:n=!1}=s;return o.map(i=>{let l=String(i?.[r]||"").trim();return n&&!l?"":`${`\u3010\u7B2C ${i?.order||0} \u6761 AI \u6D88\u606F\u3011`}
${l||"(\u7A7A)"}`}).filter(Boolean).join(`

--------------------------------

`)}_buildToolContentMacro(e){return(Array.isArray(e)?e:[]).map(o=>{let n=`\u3010\u7B2C ${o?.order||0} \u6761 AI \u6D88\u606F\u3011`,a=String(o?.filteredText||"").trim()||"(\u7A7A)",i=String(o?.extractedText||"").trim()||"(\u7A7A)";return`${n}
\u6B63\u6587\uFF1A
${a}

\u5DE5\u5177\uFF1A
${i}`}).filter(Boolean).join(`

--------------------------------

`).trim()}filterPostResponseTools(e){return Array.isArray(e)?e.filter(r=>this.shouldRunPostResponse(r)):[]}filterAutoPostResponseTools(e){return Array.isArray(e)?e.filter(r=>this.shouldRunPostResponse(r)):[]}filterInlineTools(e){return Array.isArray(e)?e.filter(r=>this.shouldRunInline(r)):[]}setDebugMode(e){this.debugMode=e}},Ot=new Za,Tv=Ot});function If(t={}){return!t||typeof t!="object"?{}:Object.entries(t).reduce((e,[r,s])=>(e[r]=s===!0,e),{})}function Ev(t,e={}){let r=e?.direction==="unescape"?"unescape":"escape",s=If(e?.options);return Sv.reduce((o,n)=>s[n.key]!==!0?o:r==="unescape"?o.replace(n.escaped,n.unescaped):o.replace(n.plain,n.replacement),String(t||""))}function Av(t,e={}){if((e?.direction||"en_to_zh")!=="en_to_zh")return String(t||"");let s=If(e?.options);return _v.reduce((o,n)=>s[n.key]!==!0?o:o.replace(n.from,n.to),String(t||""))}function Cv(t,e){let r=t?.processor||{},s=r?.type||"",o=String(e||"");switch(s){case kf.ESCAPE_TRANSFORM:return Ev(o,r);case kf.PUNCTUATION_TRANSFORM:return Av(o,r);default:return o}}function kv(t,e,r){let s=String(t||""),o=String(e||"").trim(),n=String(r||"").trim();return!s.trim()||!o?{nextMessageText:"",replaced:!1}:s.includes(o)?{nextMessageText:s.replace(o,n).trim(),replaced:!0}:{nextMessageText:"",replaced:!1}}async function ei(t,e={}){let r=Ot.getExtractionSnapshot(t,e),s=r?.primaryEntry||null,o=String(s?.fullMessageText||e?.lastAiMessage||"").trim(),n=String(s?.extractedText||r?.extractedRawText||r?.extractedText||"").trim(),a=Array.isArray(r?.selectors)?r.selectors:[],i=e?.traceId||`trace_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,l=e?.sessionKey||"";if(!n||!o)return{success:!1,error:"\u672A\u63D0\u53D6\u5230\u53EF\u5904\u7406\u5185\u5BB9\uFF0C\u8BF7\u5148\u68C0\u67E5\u6807\u7B7E\u6216\u6B63\u5219\u89C4\u5219",meta:{traceId:i,sessionKey:l,selectors:a,writebackStatus:Ke.NOT_APPLICABLE,failureStage:Xe.EXTRACT_OUTPUT,extraction:r}};let d=String(Cv(t,n)||"").trim(),c=kv(o,n,d),u=c.replaced?c.nextMessageText:d,p=null,y=Ke.NOT_APPLICABLE;if(u){if(p=await Dt.injectDetailed(t.id,u,{overwrite:!0,sourceMessageId:e?.sourceMessageId||e?.confirmedAssistantMessageId||e?.messageId||"",sourceSwipeId:e?.sourceSwipeId||e?.confirmedAssistantSwipeId||e?.effectiveSwipeId||"",effectiveSwipeId:e?.effectiveSwipeId||e?.confirmedAssistantSwipeId||"",slotBindingKey:e?.slotBindingKey||"",slotRevisionKey:e?.slotRevisionKey||"",slotTransactionId:e?.slotTransactionId||"",extractionSelectors:[],replaceFullMessage:c.replaced,traceId:i,sessionKey:l,skipNotify:e?.skipNotify===!0}),!p?.success)return{success:!1,error:p?.error||"\u672C\u5730\u5904\u7406\u5B8C\u6210\uFF0C\u4F46\u5199\u56DE\u5931\u8D25",meta:{traceId:i,sessionKey:l,selectors:a,writebackStatus:Ke.FAILED,failureStage:Xe.INJECT_CONTEXT,writebackDetails:p,extraction:r}};y=Ke.SUCCESS}else y=Ke.SKIPPED_EMPTY_OUTPUT;return{success:!0,output:d,writebackState:u?{committed:p?.contentCommitted===!0}:null,meta:{traceId:i,sessionKey:l,selectors:a,writebackStatus:y,failureStage:"",writebackDetails:p,extraction:r}}}var Sv,_v,kf,Tc=D(()=>{Sn();Ds();Sv=[{key:"newline",plain:/\r\n|\r|\n/g,escaped:/\\n/g,replacement:"\\n",unescaped:`
`},{key:"doubleQuote",plain:/"/g,escaped:/\\"/g,replacement:'\\"',unescaped:'"'},{key:"singleQuote",plain:/'/g,escaped:/\\'/g,replacement:"\\'",unescaped:"'"}],_v=[{key:"comma",from:/,/g,to:"\uFF0C"},{key:"period",from:/\./g,to:"\u3002"},{key:"exclamation",from:/!/g,to:"\uFF01"},{key:"question",from:/\?/g,to:"\uFF1F"},{key:"semicolon",from:/;/g,to:"\uFF1B"},{key:"colon",from:/:/g,to:"\uFF1A"},{key:"leftParen",from:/\(/g,to:"\uFF08"},{key:"rightParen",from:/\)/g,to:"\uFF09"}],kf={ESCAPE_TRANSFORM:"escape_transform",PUNCTUATION_TRANSFORM:"punctuation_transform"}});var Ec={};ae(Ec,{abortAllTasks:()=>Nv,abortTask:()=>Pv,buildToolMessages:()=>Pf,clearExecutionHistory:()=>Bv,createExecutionContext:()=>Fv,createResult:()=>ti,enhanceMessagesWithBypass:()=>jv,executeBatch:()=>Mv,executeTool:()=>Mf,executeToolWithConfig:()=>Nf,executeToolsBatch:()=>Gv,executorState:()=>$e,extractFailed:()=>Uv,extractSuccessful:()=>Kv,generateTaskId:()=>Os,getExecutionHistory:()=>$v,getExecutorStatus:()=>Ov,getScheduler:()=>Co,mergeResults:()=>zv,pauseExecutor:()=>Dv,resumeExecutor:()=>Lv,setMaxConcurrent:()=>Rv});function ti(t,e,r,s,o,n,a=0){return{success:r,taskId:t,toolId:e,data:s,error:o,duration:n,retries:a,timestamp:Date.now(),metadata:{}}}function Os(){return`task_${Date.now()}_${Math.random().toString(36).substr(2,9)}`}function Iv(t,e={}){return{id:Os(),toolId:t,options:e,status:"pending",createdAt:Date.now(),startedAt:null,completedAt:null,retries:0,maxRetries:e.maxRetries||3}}function Co(){return _n||(_n=new Sc($e.maxConcurrent)),_n}function Rv(t){$e.maxConcurrent=Math.max(1,Math.min(10,t)),_n&&(_n.maxConcurrent=$e.maxConcurrent)}async function Mf(t,e={},r){let s=Co(),o=Iv(t,e);for(;$e.isPaused;)await new Promise(n=>setTimeout(n,100));try{let n=await s.enqueue(async a=>{if(a.aborted)throw new DOMException("\u4EFB\u52A1\u5DF2\u4E2D\u6B62","AbortError");if(typeof r=="function")return await r(a,e);throw new Error("\u6267\u884C\u5668\u5FC5\u987B\u662F\u4E00\u4E2A\u51FD\u6570")},o);return Rf(n),n}catch(n){_c.error(`executeTool \u5F02\u5E38 (toolId=${t})`,{error:n});let a=ti(o.id,t,!1,null,n,Date.now()-o.createdAt,o.retries);return Rf(a),a}}async function Mv(t,e={}){let{failFast:r=!1,concurrency:s=$e.maxConcurrent}=e,o=[],n=Co(),a=n.maxConcurrent;n.maxConcurrent=s;try{let i=t.map(({toolId:l,options:d,executor:c})=>Mf(l,d,c));if(r)for(let l of i){let d=await l;if(o.push(d),!d.success){n.abortAll();break}}else{let l=await Promise.allSettled(i);for(let d of l)d.status==="fulfilled"?o.push(d.value):o.push(ti(Os(),"unknown",!1,null,d.reason,0,0))}}finally{n.maxConcurrent=a}return o}function Pv(t){return Co().abort(t)}function Nv(){Co().abortAll(),$e.executionQueue=[]}function Dv(){$e.isPaused=!0}function Lv(){$e.isPaused=!1}function Ov(){return{...Co().getStatus(),isPaused:$e.isPaused,activeControllers:$e.activeControllers.size,historyCount:$e.executionHistory.length}}function Rf(t){$e.executionHistory.push(t),$e.executionHistory.length>100&&$e.executionHistory.shift()}function $v(t={}){let e=[...$e.executionHistory];return t.toolId&&(e=e.filter(r=>r.toolId===t.toolId)),t.success!==void 0&&(e=e.filter(r=>r.success===t.success)),t.limit&&(e=e.slice(-t.limit)),e}function Bv(){$e.executionHistory=[]}function zv(t){let e={success:!0,data:[],errors:[],totalDuration:0,successCount:0,failureCount:0};for(let r of t)e.totalDuration+=r.duration,r.success?(e.successCount++,r.data!==void 0&&r.data!==null&&e.data.push(r.data)):(e.success=!1,e.failureCount++,r.error&&e.errors.push({taskId:r.taskId,toolId:r.toolId,error:r.error.message||String(r.error)}));return e}function Kv(t){return t.filter(e=>e.success).map(e=>e.data)}function Uv(t){return t.filter(e=>!e.success).map(e=>({taskId:e.taskId,toolId:e.toolId,error:e.error}))}function Fv(t={}){return{taskId:Os(),startTime:Date.now(),signal:t.signal||null,apiConfig:t.apiConfig||null,bypassMessages:t.bypassMessages||[],context:t.context||{},metadata:t.metadata||{}}}function jv(t,e){return!e||e.length===0?t:[...e,...t]}function Wv(t){return t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function Pf(t,e){let r=[],s=t.promptTemplate||"",o={"{{userMessage}}":e.input?.userMessage||"","{{lastAiMessage}}":e.input?.lastAiMessage||"","{{extractedContent}}":e.input?.extractedContent||"","{{previousToolOutput}}":e.input?.previousToolOutput||"","{{context}}":JSON.stringify(e.input?.context||{}),"{{pg}}":e.input?.context?.pg||"1","{{time}}":e.input?.context?.time||"","{{scene}}":e.input?.context?.scene||"","{{plot}}":e.input?.context?.plot||"","{{mq}}":e.input?.context?.mq||"\u2160","{{mqStatus}}":e.input?.context?.mqStatus||"\u8FDB\u884C\u4E2D","{{sq}}":e.input?.context?.sq||"1","{{sqStatus}}":e.input?.context?.sqStatus||"\u8FDB\u884C\u4E2D","{{latestSq}}":e.input?.context?.latestSq||"1","{{completed}}":e.input?.context?.completed||"\u65E0","{{defined}}":e.input?.context?.defined||"","{{status}}":e.input?.context?.status||"","{{seeds}}":e.input?.context?.seeds||"","{{name}}":e.input?.context?.name||"","{{location}}":e.input?.context?.location||"","{{condition}}":e.input?.context?.condition||"","{{equipment}}":e.input?.context?.equipment||"","{{skills}}":e.input?.context?.skills||""};for(let[n,a]of Object.entries(o))s=s.replace(new RegExp(Wv(n),"g"),a);return r.push({role:"USER",content:s}),r}async function Nf(t,e,r={}){let s=le(t);if(!s)return{success:!1,taskId:Os(),toolId:t,error:"\u5DE5\u5177\u914D\u7F6E\u4E0D\u5B58\u5728",duration:0};if(!s.enabled)return{success:!1,taskId:Os(),toolId:t,error:"\u5DE5\u5177\u672A\u542F\u7528",duration:0};let o=Date.now(),n=Os();try{W.emit(U.TOOL_EXECUTION_STARTED,{toolId:t,taskId:n,context:e});let a=Pf(s,e);if(typeof r.callApi=="function"){let i=s.output?.apiPreset||s.apiPreset||"",l=i?{preset:i}:null,d=await r.callApi(a,l,r.signal),c=d;s.outputMode==="separate"&&s.extractTags?.length>0&&(c=Hv(d,s.extractTags));let u={success:!0,taskId:n,toolId:t,data:c,duration:Date.now()-o};return W.emit(U.TOOL_EXECUTED,{toolId:t,taskId:n,result:u}),u}else return{success:!0,taskId:n,toolId:t,data:{messages:a,config:{apiPreset:s.output?.apiPreset||s.apiPreset||"",outputMode:s.outputMode,extractTags:s.extractTags}},duration:Date.now()-o,needsExecution:!0}}catch(a){_c.error(`executeToolWithConfig \u5F02\u5E38 (toolId=${t})`,{error:a});let i={success:!1,taskId:n,toolId:t,error:a.message||String(a),duration:Date.now()-o};return W.emit(U.TOOL_EXECUTION_FAILED,{toolId:t,taskId:n,error:a}),i}}function Hv(t,e){let r={};for(let s of e){let o=new RegExp(`<${s}[^>]*>([\\s\\S]*?)<\\/${s}>`,"gi"),n=t.match(o);n&&(r[s]=n.map(a=>{let i=a.match(new RegExp(`<${s}[^>]*>([\\s\\S]*?)<\\/${s}>`,"i"));return i?i[1].trim():""}))}return r}async function Gv(t,e,r={}){let s=[];for(let o of t){let n=le(o);if(n&&n.enabled){let a=await Nf(o,e,r);s.push(a)}}return s}var _c,$e,Sc,_n,Ac=D(()=>{lr();Ze();H();_c=E.createScope("ToolExecutor"),$e={activeControllers:new Map,executionQueue:[],runningCount:0,maxConcurrent:3,executionHistory:[],isPaused:!1};Sc=class{constructor(e=3){this.maxConcurrent=e,this.queue=[],this.running=new Map,this.isProcessing=!1}enqueue(e,r){return new Promise((s,o)=>{this.queue.push({executor:e,task:r,resolve:s,reject:o}),this.process()})}async process(){if(!this.isProcessing){for(this.isProcessing=!0;this.queue.length>0&&this.running.size<this.maxConcurrent;){let e=this.queue.shift();if(!e)continue;let{executor:r,task:s,resolve:o,reject:n}=e,a=new AbortController;s.abortController=a,s.status="running",s.startedAt=Date.now(),this.running.set(s.id,s),$e.activeControllers.set(s.id,a),this.executeTask(r,s,a.signal).then(i=>{s.status="completed",s.completedAt=Date.now(),o(i)}).catch(i=>{s.status=i.name==="AbortError"?"aborted":"failed",s.completedAt=Date.now(),n(i)}).finally(()=>{this.running.delete(s.id),$e.activeControllers.delete(s.id),$e.runningCount=this.running.size})}this.isProcessing=!1}}async executeTask(e,r,s){let o=Date.now(),n=null;for(let a=0;a<=r.maxRetries;a++){if(s.aborted)throw new DOMException("\u4EFB\u52A1\u5DF2\u4E2D\u6B62","AbortError");try{let i=await e(s);return ti(r.id,r.toolId,!0,i,null,Date.now()-o,a)}catch(i){if(n=i,i.name==="AbortError")throw i;a===r.maxRetries&&_c.error(`\u4EFB\u52A1\u6267\u884C\u5931\u8D25 (toolId=${r.toolId}, ${a+1}\u6B21\u91CD\u8BD5)`,{error:i}),a<r.maxRetries&&(await this.delay(1e3*(a+1)),r.retries=a+1)}}throw n}delay(e){return new Promise(r=>setTimeout(r,e))}abort(e){let r=$e.activeControllers.get(e);return r?(r.abort(),!0):!1}abortAll(){for(let e of $e.activeControllers.values())e.abort();$e.activeControllers.clear(),this.queue=[],this.running.clear()}getStatus(){return{pending:this.queue.length,running:this.running.size,maxConcurrent:this.maxConcurrent}}},_n=null});async function qv(){return Cc||(Cc=Promise.resolve().then(()=>(Ac(),Ec))),Cc}async function Yv(t,e,r){return r&&t.output?.mode===Lt.POST_RESPONSE_API?Ot.runToolPostResponse(t,e):r&&t.output?.mode===Lt.FOLLOW_AI?Ot.runToolFollowAiManual(t,e):(await qv()).executeToolWithConfig(t.id,e)}function Vv(t,e){return e?.runSource==="MANUAL"?t.output?.mode==="local_transform"||t.processor?.type?$s.MANUAL_LOCAL_TRANSFORM:t.output?.mode===Lt.POST_RESPONSE_API?$s.MANUAL_POST_RESPONSE_API:$s.MANUAL_COMPATIBILITY:$s.MANUAL_POST_RESPONSE_API}function ri(t,e){try{Rl(t,e)}catch(r){ko.warn("\u66F4\u65B0\u5DE5\u5177\u8FD0\u884C\u65F6\u72B6\u6001\u5931\u8D25:",{toolId:t,error:r})}}async function Jv(t,e){let r=Date.now(),s=t.id,o=`yyt-tool-run-${s}`,n=Vv(t,e),a=e?.executionKey||"";ri(s,{lastStatus:"running",lastError:"",lastDurationMs:0,lastTraceId:e?.traceId||"",lastMessageKey:e?.messageId||"",lastExecutionKey:a,lastExecutionPath:n,lastWritebackStatus:"",lastFailureStage:"",lastSlotBindingKey:e?.slotBindingKey||"",lastSlotRevisionKey:e?.slotRevisionKey||"",lastSlotTransactionId:e?.slotTransactionId||"",lastSourceMessageId:e?.sourceMessageId||e?.messageId||"",lastSourceSwipeId:e?.sourceSwipeId||e?.effectiveSwipeId||"",lastContentCommitted:!1,lastHostCommitApplied:!1,lastRefreshRequested:!1,lastRefreshConfirmed:!1,lastPreferredCommitMethod:"",lastAppliedCommitMethod:"",lastRefreshMethodCount:0,lastRefreshMethods:[],lastRefreshConfirmChecks:0,lastRefreshConfirmedBy:""}),ko.info(`\u6B63\u5728\u624B\u52A8\u6267\u884C ${t.name}`,null,{topNotice:{sticky:!0,noticeId:o}});try{let i=n===$s.MANUAL_LOCAL_TRANSFORM?await ei(t,e):await Yv(t,e,!0),l=Date.now()-r;if(i?.success){let p=le(s),y=i?.meta?.writebackDetails||{};return ri(s,{lastStatus:"success",lastError:"",lastDurationMs:l,lastTraceId:e?.traceId||"",successCount:(p?.runtime?.successCount||0)+1,lastMessageKey:e?.messageId||"",lastExecutionKey:a,lastExecutionPath:n,lastWritebackStatus:i?.meta?.writebackStatus||Ke.NOT_APPLICABLE,lastFailureStage:i?.meta?.failureStage||"",lastSlotBindingKey:e?.slotBindingKey||"",lastSlotRevisionKey:e?.slotRevisionKey||"",lastSlotTransactionId:e?.slotTransactionId||"",lastSourceMessageId:e?.sourceMessageId||e?.messageId||"",lastSourceSwipeId:e?.sourceSwipeId||e?.effectiveSwipeId||"",lastContentCommitted:!!y.contentCommitted,lastHostCommitApplied:!!y.hostCommitApplied,lastRefreshRequested:!!y.refreshRequested,lastRefreshConfirmed:!!y.refreshConfirmed,lastPreferredCommitMethod:y?.commit?.preferredMethod||"",lastAppliedCommitMethod:y?.commit?.appliedMethod||"",lastRefreshMethodCount:Array.isArray(y?.refresh?.requestMethods)?y.refresh.requestMethods.length:0,lastRefreshMethods:Array.isArray(y?.refresh?.requestMethods)?[...y.refresh.requestMethods]:[],lastRefreshConfirmChecks:Number(y?.refresh?.confirmChecks)||0,lastRefreshConfirmedBy:y?.refresh?.confirmedBy||""}),ko.info(`${t.name} \u624B\u52A8\u6267\u884C\u5B8C\u6210`,null,{toast:"success",topNotice:{duration:3200,noticeId:o}}),{success:!0,duration:l,result:i}}let d=le(s),c=i?.error||"\u5DE5\u5177\u6267\u884C\u5931\u8D25",u=i?.meta?.writebackDetails||{};return ri(s,{lastStatus:"error",lastError:c,lastDurationMs:l,lastTraceId:e?.traceId||"",errorCount:(d?.runtime?.errorCount||0)+1,lastMessageKey:e?.messageId||"",lastExecutionKey:a,lastExecutionPath:n,lastWritebackStatus:i?.meta?.writebackStatus||Ke.NOT_APPLICABLE,lastFailureStage:i?.meta?.failureStage||(n===$s.MANUAL_COMPATIBILITY?Xe.COMPATIBILITY_EXECUTE:Xe.UNKNOWN),lastSlotBindingKey:e?.slotBindingKey||"",lastSlotRevisionKey:e?.slotRevisionKey||"",lastSlotTransactionId:e?.slotTransactionId||"",lastSourceMessageId:e?.sourceMessageId||e?.messageId||"",lastSourceSwipeId:e?.sourceSwipeId||e?.effectiveSwipeId||"",lastContentCommitted:!!u.contentCommitted,lastHostCommitApplied:!!u.hostCommitApplied,lastRefreshRequested:!!u.refreshRequested,lastRefreshConfirmed:!!u.refreshConfirmed,lastPreferredCommitMethod:u?.commit?.preferredMethod||"",lastAppliedCommitMethod:u?.commit?.appliedMethod||"",lastRefreshMethodCount:Array.isArray(u?.refresh?.requestMethods)?u.refresh.requestMethods.length:0,lastRefreshMethods:Array.isArray(u?.refresh?.requestMethods)?[...u.refresh.requestMethods]:[],lastRefreshConfirmChecks:Number(u?.refresh?.confirmChecks)||0,lastRefreshConfirmedBy:u?.refresh?.confirmedBy||""}),ko.error(`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${c}`,null,{toast:!0,topNotice:{sticky:!0,noticeId:o}}),{success:!1,duration:l,error:c,result:i}}catch(i){let l=Date.now()-r,d=le(s),c=i?.message||String(i);throw ri(s,{lastStatus:"error",lastError:c,lastDurationMs:l,lastTraceId:e?.traceId||"",errorCount:(d?.runtime?.errorCount||0)+1,lastMessageKey:e?.messageId||"",lastExecutionKey:a,lastExecutionPath:n,lastWritebackStatus:Ke.NOT_APPLICABLE,lastFailureStage:n===$s.MANUAL_COMPATIBILITY?Xe.COMPATIBILITY_EXECUTE:Xe.UNKNOWN,lastSlotBindingKey:e?.slotBindingKey||"",lastSlotRevisionKey:e?.slotRevisionKey||"",lastSlotTransactionId:e?.slotTransactionId||"",lastSourceMessageId:e?.sourceMessageId||e?.messageId||"",lastSourceSwipeId:e?.sourceSwipeId||e?.effectiveSwipeId||"",lastContentCommitted:!1,lastHostCommitApplied:!1,lastRefreshRequested:!1,lastRefreshConfirmed:!1,lastPreferredCommitMethod:"",lastAppliedCommitMethod:"",lastRefreshMethodCount:0,lastRefreshMethods:[],lastRefreshConfirmChecks:0,lastRefreshConfirmedBy:""}),ko.error(`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${c}`,null,{toast:!0,topNotice:{sticky:!0,noticeId:o}}),i}}async function si(t){if(!t)return{success:!1,error:"\u7F3A\u5C11\u5DE5\u5177ID"};let e=le(t);if(!e)return{success:!1,error:"\u5DE5\u5177\u4E0D\u5B58\u5728"};if(!e.enabled)return Kr(t,{lastMessageKey:"",lastExecutionKey:"",lastExecutionPath:"",lastWritebackStatus:Ke.NOT_APPLICABLE,lastFailureStage:"",lastContentCommitted:!1,lastHostCommitApplied:!1,lastRefreshRequested:!1,lastRefreshConfirmed:!1,lastPreferredCommitMethod:"",lastAppliedCommitMethod:"",lastRefreshMethodCount:0,lastRefreshMethods:[],lastRefreshConfirmChecks:0,lastRefreshConfirmedBy:""},{touchLastRunAt:!1,emitEvent:!1}),ko.warn(`${e.name} \u672A\u542F\u7528\uFF0C\u65E0\u6CD5\u624B\u52A8\u6267\u884C`,null,{topNotice:{duration:2800,noticeId:`yyt-tool-run-${t}`}}),{success:!1,error:"\u5DE5\u5177\u672A\u542F\u7528"};let r=await bs({runSource:"MANUAL"});return Jv(e,r)}async function oi(t){if(!t)return{success:!1,error:"\u7F3A\u5C11\u5DE5\u5177ID"};let e=le(t);if(!e)return{success:!1,error:"\u5DE5\u5177\u4E0D\u5B58\u5728"};let r=await bs({runSource:"MANUAL_PREVIEW"});return Ot.previewExtraction(e,r)}var ko,$s,Cc,kc=D(()=>{lr();Sn();ws();Tc();H();ko=E.createScope("ToolTrigger"),$s={MANUAL_POST_RESPONSE_API:"manual_post_response_api",MANUAL_LOCAL_TRANSFORM:"manual_local_transform",MANUAL_COMPATIBILITY:"manual_compatibility"},Cc=null});var Lf={};ae(Lf,{TOOL_CONFIG_PANEL_STYLES:()=>Ic,createToolConfigPanel:()=>ts,default:()=>nT});function Df(t){return t?t.length!==void 0&&typeof t.get=="function"?t.get(0):t:null}function Xv(t){if(!Number.isFinite(t)||t<=0)return"\u4ECE\u672A";let e=Date.now()-t;if(e<6e4)return`${Math.floor(e/1e3)} \u79D2\u524D`;if(e<36e5)return`${Math.floor(e/6e4)} \u5206\u949F\u524D`;if(e<864e5)return`${Math.floor(e/36e5)} \u5C0F\u65F6\u524D`;try{return new Date(t).toLocaleString()}catch{return"\u672A\u77E5"}}function Qv(t){if(!t)return null;let e=t.closest(".yyt-popup-body");if(!e)return gr.warn("pinToolPanelHeight: \u627E\u4E0D\u5230 .yyt-popup-body \u7956\u5148"),null;let r=()=>{let o=t.querySelector(".yyt-tool-panel");if(!o)return;let n=e.getBoundingClientRect(),a=o.getBoundingClientRect(),i=n.bottom-a.top-8;i>100?o.style.height=`${i}px`:gr.warn(`pinToolPanelHeight: \u8BA1\u7B97\u9AD8\u5EA6\u5F02\u5E38 h=${i}`)};if(r(),requestAnimationFrame(()=>requestAnimationFrame(r)),typeof ResizeObserver>"u")return null;let s=new ResizeObserver(()=>r());return s.observe(e),()=>{try{s.disconnect()}catch{}}}function Zv(t){if(!t)return;let e=t.querySelector(".yyt-tool-panel-hero"),r=t.querySelector(".yyt-tool-panel-scroll");if(!e||!r)return;let s=()=>{r.scrollTop>0?e.classList.add("yyt-tool-panel-hero--compact"):e.classList.remove("yyt-tool-panel-hero--compact")};s(),r.addEventListener("scroll",s,{passive:!0})}function ts(t={}){let{id:e,toolId:r,postResponseHint:s,previewDialogId:o,previewTitle:n="\u6D4B\u8BD5\u63D0\u53D6\u7ED3\u679C"}=t;return{id:e,toolId:r,renderTo(a){let i=Df(a);if(!i)return;if(i._yytToolPanelCleanup)try{i._yytToolPanelCleanup()}catch{}let l=()=>this.renderTo(a),d=le(r);if(!d){i.innerHTML='<div class="yyt-empty-state-small">\u5DE5\u5177\u914D\u7F6E\u52A0\u8F7D\u5931\u8D25</div>';return}let c=f("div",{className:"yyt-tool-panel",dataset:{toolId:r}}),u=[];c.appendChild(eT(d,r,l,s));let p=f("div",{className:"yyt-tool-panel-scroll"});p.appendChild(tT(d));let y=rT(d,r,l);u.push(y),p.appendChild(y.el);let m=sT(d,r,l,a,o,n);u.push(m),p.appendChild(m.el),c.appendChild(p),i.innerHTML="",i.appendChild(c);let g=Qv(i);Zv(i),i._yytToolPanelCleanup=()=>{for(let h of u)try{h.destroy()}catch{}if(typeof g=="function")try{g()}catch{}delete i._yytToolPanelCleanup}},destroy(a){let i=Df(a);if(i?._yytToolPanelCleanup)try{i._yytToolPanelCleanup()}catch{}},getStyles(){return Ic}}}function eT(t,e,r,s){let o=f("div",{className:"yyt-tool-panel-hero"}),n=f("div",{className:"yyt-tool-panel-hero-row1"});n.appendChild(f("div",{className:"yyt-tool-panel-hero-icon",text:"\u{1F527}"})),n.appendChild(f("div",{className:"yyt-tool-panel-hero-name",text:t.name||e}));let a=f("div",{className:"yyt-tool-panel-hero-actions"});a.appendChild(X({label:"\u25B6 \u7ACB\u5373\u6267\u884C\u4E00\u6B21",size:"small",onClick:async()=>{try{await si(e),gr.info("\u5DF2\u89E6\u53D1\u624B\u52A8\u6267\u884C",null,{toast:"success"})}catch(m){gr.error(`\u6267\u884C\u5931\u8D25\uFF1A${m?.message||m}`,null,{toast:!0})}}}).el),a.appendChild(X({label:"\u{1F4BE} \u4FDD\u5B58\u914D\u7F6E",size:"small",variant:"primary",onClick:()=>{gr.info("\u914D\u7F6E\u5DF2\u4FDD\u5B58",null,{toast:"success"}),r()}}).el),n.appendChild(a),o.appendChild(n),t.description&&o.appendChild(f("div",{className:"yyt-tool-panel-hero-desc",text:t.description}));let i=f("div",{className:"yyt-tool-panel-hero-chips"}),d=(t.output?.mode||"follow_ai")==="post_response_api"?"\u989D\u5916 AI \u89E3\u6790\uFF08\u81EA\u52A8\uFF09":"\u968F AI \u8F93\u51FA\uFF08\u624B\u52A8\uFF09";i.appendChild(f("span",{className:"yyt-tool-hero-chip mode",text:d}));let c=t.output?.apiPreset||t.apiPreset||"";c&&i.appendChild(f("span",{className:"yyt-tool-hero-chip preset",text:`API: ${c}`}));let u=t.extraction?.regexPresetId||"";if(u){let m=Ee.getPreset(u);i.appendChild(f("span",{className:"yyt-tool-hero-chip preset",text:`\u6B63\u5219: ${m?m.name:"\u5DF2\u5220\u9664"}`}))}else i.appendChild(f("span",{className:"yyt-tool-hero-chip",text:"\u6B63\u5219: \u672A\u7ED1\u5B9A",style:{opacity:"0.6"}}));let p=t.worldbooks?.presetId||"";if(p){let m=ct.getPreset(p);m&&i.appendChild(f("span",{className:"yyt-tool-hero-chip preset",text:`\u4E16\u754C\u4E66: ${m.name}`}))}let y=t.runtime?.lastStatus;if(y){let m=y==="success"?"status-success":y==="failed"?"status-failed":"";i.appendChild(f("span",{className:`yyt-tool-hero-chip ${m}`,text:`\u4E0A\u6B21\u6267\u884C \xB7 ${y}`}))}return o.appendChild(i),o}function tT(t){let e=f("div",{className:"yyt-tool-runtime-row"}),r=t.runtime||{},s=(a,i,l="")=>{let d=f("div",{className:"yyt-tool-runtime-stat"});return d.appendChild(f("span",{className:"yyt-tool-runtime-stat-label",text:a})),d.appendChild(f("span",{className:`yyt-tool-runtime-stat-value ${l}`,text:i})),d},o=r.lastStatus==="success"?"\u2713 \u4E0A\u6B21\u6210\u529F":r.lastStatus==="failed"?"\u2717 \u4E0A\u6B21\u5931\u8D25":r.lastStatus==="idle"?"\u5F85\u547D":r.lastStatus||"\u5F85\u547D",n=r.lastStatus==="success"?"success":r.lastStatus==="failed"?"error":"muted";return e.appendChild(s("\u72B6\u6001",o,n)),e.appendChild(s("\u6700\u8FD1\u8FD0\u884C",Xv(r.lastRunAt),"muted")),e.appendChild(s("\u6210\u529F",String(r.successCount||0),"success")),e.appendChild(s("\u5931\u8D25",String(r.errorCount||0),r.errorCount?"error":"muted")),e}function rT(t,e,r){let s=f("div",{style:{display:"flex",flexDirection:"column"}});s.appendChild(En({label:"\u8F93\u51FA\u6A21\u5F0F",hint:"\u51B3\u5B9A\u6267\u884C\u8DEF\u5F84 + \u81EA\u52A8/\u624B\u52A8",control:Re({value:t.output?.mode||"follow_ai",options:[{value:"follow_ai",label:"follow_ai \u2014 \u968F AI \u8F93\u51FA\uFF08\u624B\u52A8\u89E6\u53D1\uFF09"},{value:"post_response_api",label:"post_response_api \u2014 \u989D\u5916 AI \u89E3\u6790\uFF08\u81EA\u52A8\uFF09"}],onChange:l=>{let d=le(e)||{};Ie(e,{...d,output:{...d.output||{},mode:l,enabled:l==="post_response_api"}}),r()}})}));let o=(()=>{try{return Pr()||[]}catch{return[]}})();s.appendChild(En({label:"API \u9884\u8BBE",hint:"\u989D\u5916 AI \u89E3\u6790\u65F6\u4F7F\u7528",control:Re({value:t.output?.apiPreset||t.apiPreset||"",options:[{value:"",label:"\u2014\u2014 \u8DDF\u968F\u5F53\u524D\u4E3B API \u2014\u2014"},...o.map(l=>({value:l.name,label:l.name}))],onChange:l=>{let d=le(e)||{};Ie(e,{...d,apiPreset:l,output:{...d.output||{},apiPreset:l}}),r()}})}));let n=(()=>{try{return xn()||[]}catch{return[]}})();s.appendChild(En({label:"Ai \u6307\u4EE4\u9884\u8BBE",hint:'\u9644\u52A0\u5728 system/user \u524D\u7684\u6307\u4EE4\uFF1B\u9009"\u65E0"\u5373\u4E0D\u542F\u7528',control:Re({value:t.bypass?.enabled&&t.bypass?.presetId||"",options:[{value:"",label:"\u2014\u2014 \u65E0 \u2014\u2014"},...n.map(l=>({value:l.id,label:`${l.name}${l.isDefault?" [\u9ED8\u8BA4]":""}`}))],onChange:l=>{let d=le(e)||{};Ie(e,{...d,bypass:{enabled:!!l,presetId:l||""}}),r()}})}));let a=Ee.listPresets();s.appendChild(En({label:"\u6B63\u5219\u63D0\u53D6\u9884\u8BBE",hint:"\u51B3\u5B9A\u4ECE AI \u56DE\u590D\u4E2D\u5982\u4F55\u62BD\u53D6",control:Re({value:t.extraction?.regexPresetId||"",options:[{value:"",label:"\u2014\u2014 \u65E0\uFF08\u4E0D\u8FDB\u884C\u63D0\u53D6\uFF09 \u2014\u2014"},...a.map(l=>({value:l.id,label:l.name}))],onChange:l=>{let d=le(e)||{},c={...d.extraction||{},regexPresetId:l};if(l){let u=Ee.getPreset(l);gr.info(`\u5DF2\u7ED1\u5B9A\u6B63\u5219\u9884\u8BBE\uFF1A${u?.name||l}`,null,{toast:"success"})}else gr.info("\u5DF2\u89E3\u7ED1\u6B63\u5219\u9884\u8BBE\uFF0C\u5DE5\u5177\u5C06\u4E0D\u8FDB\u884C\u5185\u5BB9\u63D0\u53D6",null,{toast:"success"});Ie(e,{...d,extraction:c}),r()}})}));let i=ct.listPresets();return s.appendChild(En({label:"\u4E16\u754C\u4E66\u9884\u8BBE",hint:"\u6CE8\u5165\u5230 prompt \u7684 {{toolWorldbookContent}}",control:Re({value:t.worldbooks?.presetId||"",options:[{value:"",label:"\u2014\u2014 \u65E0\uFF08\u4FDD\u7559\u5DE5\u5177\u539F\u6709\u4E16\u754C\u4E66\u8BBE\u7F6E\uFF09 \u2014\u2014"},...i.map(l=>({value:l.id,label:l.name}))],onChange:l=>{let d=le(e)||{},c={...d.worldbooks||{},presetId:l};if(l){let u=ct.getPreset(l);gr.info(`\u5DF2\u7ED1\u5B9A\u4E16\u754C\u4E66\u9884\u8BBE\uFF1A${u?.name||l}`,null,{toast:"success"})}else gr.info("\u5DF2\u89E3\u7ED1\u4E16\u754C\u4E66\u9884\u8BBE\uFF0C\u5DE5\u5177\u4E0D\u518D\u6CE8\u5165\u4E16\u754C\u4E66\u5185\u5BB9",null,{toast:"success"});Ie(e,{...d,worldbooks:c}),r()}})})),Yt({heading:"\u7ED1\u5B9A",icon:"\u{1F517}",content:[s]})}function En({label:t,hint:e,control:r}){let s=f("div",{className:"yyt-tool-binding-row"}),o=f("div",{className:"yyt-tool-binding-label"});return o.appendChild(f("span",{className:"yyt-tool-binding-label-text",text:t})),e&&o.appendChild(f("span",{className:"yyt-tool-binding-label-hint",text:e})),s.appendChild(o),r.el.classList.add("small"),Object.assign(r.el.style,{padding:"7px 10px",fontSize:"12px"}),s.appendChild(r.el),s.appendChild(f("div",{className:"yyt-tool-binding-meta"})),s}function sT(t,e,r,s,o,n){let a=f("div",{style:{display:"flex",flexDirection:"column"}});a.appendChild(f("div",{style:{marginBottom:"8px",display:"flex",alignItems:"center",gap:"10px"}},f("div",{style:{flex:"1"}},f("div",{text:"\u63D0\u793A\u8BCD\u6A21\u677F",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}}),f("div",{text:"\u7528 {{macro}} \u5F15\u7528\u4E0A\u4E0B\u6587\u3002\u6A21\u677F\u5185\u5BB9\u4F1A\u4F5C\u4E3A\u53D1\u7ED9\u989D\u5916 AI \u7684 user \u6D88\u606F\u3002",style:{fontSize:"11px",color:"var(--yyt-text-muted)",lineHeight:"1.6"}})),X({label:"\u{1F504} \u91CD\u7F6E\u4E3A\u9ED8\u8BA4",size:"small",variant:"ghost",onClick:()=>{if(!window.confirm("\u7528\u5DE5\u5177\u9ED8\u8BA4\u6A21\u677F\u8986\u76D6\u5F53\u524D\u6A21\u677F\uFF1F"))return;let x=ba(e)||{},S=le(e)||{};Ie(e,{...S,promptTemplate:x.promptTemplate||""}),r()}}).el));let i=f("textarea",{className:"yyt-textarea yyt-code-textarea",attrs:{rows:"10",placeholder:"\u8F93\u5165\u63D0\u793A\u8BCD\u6A21\u677F..."},style:{width:"100%",resize:"vertical",fontFamily:"ui-monospace, monospace",fontSize:"12px",lineHeight:"1.7"}});i.value=t.promptTemplate||"",i.addEventListener("change",()=>{let x=le(e)||{};Ie(e,{...x,promptTemplate:i.value})}),a.appendChild(i),a.appendChild(f("div",{className:"yyt-macro-inline",html:"\u53EF\u7528\u5B8F\uFF1A<code>{{toolPromptMacro}}</code> <code>{{toolContentMacro}}</code> <code>{{toolWorldbookContent}}</code> <code>{{lastAiMessage}}</code> <code>{{recentMessagesText}}</code> <code>{{rawRecentMessagesText}}</code> <code>{{userMessage}}</code> <code>{{toolName}}</code> <code>{{toolId}}</code>"})),a.appendChild(f("hr",{className:"yyt-zone-divider"})),a.appendChild(f("div",{style:{marginBottom:"8px"}},f("div",{text:"\u63D0\u53D6\u914D\u7F6E",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}}),f("div",{text:'\u4ECE AI \u56DE\u590D\u4E2D\u62BD\u53D6\u5E76\u5199\u56DE\u3002\u5B8C\u6574\u89C4\u5219\u7531"\u6B63\u5219\u63D0\u53D6\u9884\u8BBE"\u51B3\u5B9A\uFF0C\u8FD9\u91CC\u53EA\u914D\u7F6E\u5DE5\u5177\u53C2\u6570\u3002',style:{fontSize:"11px",color:"var(--yyt-text-muted)",lineHeight:"1.6"}})));let l=f("div",{style:{display:"grid",gridTemplateColumns:"1fr auto",gap:"12px",alignItems:"end",marginBottom:"12px"}}),d=f("div",{className:"yyt-form-group",style:{margin:0}});d.appendChild(f("label",{text:"\u6700\u5927\u63D0\u53D6 AI \u6D88\u606F\u6570",style:{fontSize:"12px",fontWeight:"600",color:"var(--yyt-text-secondary, rgba(255,255,255,0.55))"}}));let c=f("input",{className:"yyt-input",attrs:{type:"number",min:"1",max:"50"},style:{padding:"7px 10px",fontSize:"12px"}});c.value=String(Number(t.extraction?.maxMessages)||5),c.addEventListener("change",()=>{let x=le(e)||{};Ie(e,{...x,extraction:{...x.extraction||{},maxMessages:Math.max(1,parseInt(c.value,10)||5)}})}),d.appendChild(c),l.appendChild(d);let u=f("div",{className:"yyt-form-group",style:{margin:0}});u.appendChild(f("label",{html:"&nbsp;",style:{fontSize:"12px"}})),u.appendChild(X({label:"\u{1F50D} \u6D4B\u8BD5\u63D0\u53D6",onClick:async()=>{try{let x=await oi(e);oT(s,x,o,n)}catch(x){gr.error(`\u6D4B\u8BD5\u63D0\u53D6\u5931\u8D25\uFF1A${x?.message||x}`,null,{toast:!0})}}}).el),l.appendChild(u),a.appendChild(l);let p=f("div",{className:"yyt-form-group",style:{margin:0}});p.appendChild(f("label",{html:'\u5199\u56DE\u6807\u7B7E <span style="font-size:10px;color:var(--yyt-text-muted);font-weight:500;">\uFF08\u591A\u6807\u7B7E\u63D0\u53D6\u65F6\u6307\u5B9A\u552F\u4E00\u5199\u56DE\u6807\u7B7E\uFF1B\u7559\u7A7A\u5219\u63D0\u53D6\u9996\u4E2A\uFF09</span>',style:{fontSize:"12px",fontWeight:"600",color:"var(--yyt-text-secondary, rgba(255,255,255,0.55))"}}));let y=`yyt-writeback-dl-${e}-${Math.random().toString(36).slice(2,6)}`,m=f("datalist",{attrs:{id:y}}),g=(()=>{let x=new Set,S=[];function T(C){if(C)for(let w of C.rules||[]){if(w?.enabled===!1||w?.type!=="include")continue;let P=String(w.value||"").trim();!P||x.has(P)||(x.add(P),S.push(P))}}let A=t.extraction?.regexPresetId;if(A)T(Ee.getPreset(A));else for(let C of Ee.listPresets())T(C);return S})();for(let x of g)m.appendChild(f("option",{attrs:{value:x}}));let h=f("input",{className:"yyt-input",attrs:{type:"text",placeholder:"\u5982 status / content\uFF08\u6765\u81EA\u6B63\u5219\u9884\u8BBE\u7684 include \u6807\u7B7E\uFF09",list:y,autocomplete:"off"},style:{padding:"7px 10px",fontSize:"12px"}});return h.value=t.extraction?.writebackTag||"",h.addEventListener("change",()=>{let x=le(e)||{};Ie(e,{...x,extraction:{...x.extraction||{},writebackTag:h.value.trim()}})}),p.appendChild(h),p.appendChild(m),a.appendChild(p),Yt({heading:"\u914D\u7F6E",icon:"\u2699",content:[a]})}function oT(t,e,r,s){if(!te()||!we(t))return;let n=`${us}-${r||"extraction-preview"}`,a=Array.isArray(e?.messageEntries)?e.messageEntries:[],i=a.length>0?`
      <div class="yyt-form-group">
        <label>\u9010\u6761\u6D88\u606F\u9884\u89C8</label>
        <div class="yyt-preview-message-list">
          ${a.map((l,d)=>{let c=d===a.length-1?"\u6700\u65B0\u6D88\u606F":`\u6700\u8FD1\u7684\u7B2C ${a.length-d} \u6761\u6D88\u606F`;return`
              <div class="yyt-preview-message-item">
                <div class="yyt-preview-message-title">${es(c)}</div>
                <div><label>\u539F\u6587</label><pre class="yyt-preview-box yyt-preview-pre">${es(l.rawText||"\u65E0\u53EF\u7528\u6D88\u606F")}</pre></div>
                <div><label>\u6B63\u6587\u63D0\u53D6</label><pre class="yyt-preview-box yyt-preview-pre">${es(l.filteredText||"\u6B63\u6587\u89C4\u5219\u672A\u547D\u4E2D")}</pre></div>
                <div><label>\u5DE5\u5177\u6807\u7B7E\u63D0\u53D6</label><pre class="yyt-preview-box yyt-preview-pre">${es(l.extractedText||"\u672A\u63D0\u53D6\u5230\u5185\u5BB9")}</pre></div>
              </div>
            `}).join("")}
        </div>
      </div>
    `:"";t.append(Bo({id:n,title:s,width:"720px",wide:!0,body:`
      <div class="yyt-form-group">
        <label>\u63D0\u53D6\u89C4\u5219</label>
        <div class="yyt-preview-box">${es((e?.selectors||[]).join(`
`)||"\u65E0")}</div>
      </div>
      <div class="yyt-form-group">
        <label>\u539F\u59CB\u5185\u5BB9\u6C47\u603B</label>
        <pre class="yyt-preview-box yyt-preview-pre">${es(e?.sourceText||"\u65E0\u53EF\u7528\u6D88\u606F")}</pre>
      </div>
      <div class="yyt-form-group">
        <label>\u6B63\u6587\u63D0\u53D6\u6C47\u603B</label>
        <pre class="yyt-preview-box yyt-preview-pre">${es(e?.filteredSourceText||"\u6B63\u6587\u89C4\u5219\u672A\u547D\u4E2D")}</pre>
      </div>
      <div class="yyt-form-group">
        <label>\u5DE5\u5177\u6807\u7B7E\u63D0\u53D6\u6C47\u603B</label>
        <pre class="yyt-preview-box yyt-preview-pre">${es(e?.extractedText||"\u672A\u63D0\u53D6\u5230\u5185\u5BB9")}</pre>
      </div>
      ${i}
    `})),zo(t,n,{onSave:l=>l()}),t.find(`#${n}-save`).text("\u5173\u95ED"),t.find(`#${n}-cancel`).remove()}function es(t){return t==null?"":String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var gr,Ic,nT,Io=D(()=>{tr();tt();tt();lr();Go();_o();kc();H();Fr();Ys();gr=E.createScope("ToolConfigPanel"),Ic=`
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
  .yyt-tool-panel-scroll > .yyt-flow-section {
    padding-left: 20px;
    padding-right: 20px;
  }
  .yyt-tool-runtime-row + .yyt-flow-section {
    margin-top: 18px;
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
`;nT=ts});var $f={};ae($f,{SummaryToolPanel:()=>Of,default:()=>aT});var Of,aT,Bf=D(()=>{Io();Of=ts({id:"summaryToolPanel",toolId:"summaryTool",postResponseHint:"\u70B9\u51FB\u201C\u7ACB\u5373\u6267\u884C\u4E00\u6B21\u201D\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u8FDB\u884C\u6458\u8981\u89E3\u6790\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 boo_FM
\u6216 regex:<boo_FM>([\\s\\S]*?)</boo_FM>`,previewDialogId:"summary-extraction-preview",defaultInjectionOrder:1e4,lorebookLogTag:"SummaryToolPanel"}),aT=Of});var Kf={};ae(Kf,{StatusBlockPanel:()=>zf,default:()=>iT});var zf,iT,Uf=D(()=>{Io();zf=ts({id:"statusBlockPanel",toolId:"statusBlock",postResponseHint:"\u70B9\u51FB\u201C\u7ACB\u5373\u6267\u884C\u4E00\u6B21\u201D\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u751F\u6210\u4E3B\u89D2\u72B6\u6001\u680F\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 status_block
\u6216 regex:<status_block>([\\s\\S]*?)</status_block>`,previewDialogId:"status-extraction-preview",defaultInjectionOrder:10001,lorebookLogTag:"StatusBlockPanel"}),iT=zf});var jf={};ae(jf,{YouyouReviewPanel:()=>Ff,default:()=>lT});var Ff,lT,Wf=D(()=>{Io();Ff=ts({id:"youyouReviewPanel",toolId:"youyouReview",postResponseHint:"\u70B9\u51FB\u201C\u7ACB\u5373\u6267\u884C\u4E00\u6B21\u201D\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u5728\u672B\u5C3E\u751F\u6210\u5C0F\u5E7D\u70B9\u8BC4\u4E0E\u5267\u60C5\u94A9\u5B50\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 youyou
\u6216 regex:<youyou>([\\s\\S]*?)</youyou>`,previewDialogId:"youyou-review-extraction-preview",previewTitle:"\u5C0F\u5E7D\u70B9\u8BC4\u63D0\u53D6\u9884\u89C8"}),lT=Ff});function Hf(t){return t?t.length!==void 0&&typeof t.get=="function"?t.get(0):t:null}function cT(t){if(!Number.isFinite(t)||t<=0)return"\u4ECE\u672A";let e=Date.now()-t;if(e<6e4)return`${Math.floor(e/1e3)} \u79D2\u524D`;if(e<36e5)return`${Math.floor(e/6e4)} \u5206\u949F\u524D`;if(e<864e5)return`${Math.floor(e/36e5)} \u5C0F\u65F6\u524D`;try{return new Date(t).toLocaleString()}catch{return"\u672A\u77E5"}}function rs(t){return t==null?"":String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function ni(t={}){let{id:e,toolId:r,previewDialogId:s,previewTitle:o="\u6D4B\u8BD5\u63D0\u53D6\u7ED3\u679C",processorDirections:n=[],processorOptions:a=[],heroHint:i=""}=t;return{id:e,toolId:r,renderTo(l){let d=Hf(l);if(!d)return;if(d._yytLocalToolPanelCleanup)try{d._yytLocalToolPanelCleanup()}catch{}let c=()=>this.renderTo(l),u=le(r);if(!u){d.innerHTML='<div class="yyt-empty-state-small">\u5DE5\u5177\u914D\u7F6E\u52A0\u8F7D\u5931\u8D25</div>';return}let p=f("div",{className:"yyt-tool-panel",dataset:{toolId:r}}),y=[];p.appendChild(dT(u,r,c,n,i)),p.appendChild(uT(u));let m=pT(u,r,c);y.push(m),p.appendChild(m.el);let g=yT(u,r,c,l,n,a,s,o);y.push(g),p.appendChild(g.el),d.innerHTML="",d.appendChild(p),d._yytLocalToolPanelCleanup=()=>{for(let h of y)try{h.destroy()}catch{}delete d._yytLocalToolPanelCleanup}},destroy(l){let d=Hf(l);if(d?._yytLocalToolPanelCleanup)try{d._yytLocalToolPanelCleanup()}catch{}},getStyles(){return""}}}function dT(t,e,r,s,o){let n=f("div",{className:"yyt-tool-panel-hero"}),a=f("div",{className:"yyt-tool-panel-hero-row1"});a.appendChild(f("div",{className:"yyt-tool-panel-hero-icon",text:"\u2699"})),a.appendChild(f("div",{className:"yyt-tool-panel-hero-name",text:t.name||e}));let i=f("div",{className:"yyt-tool-panel-hero-actions"});i.appendChild(X({label:"\u25B6 \u7ACB\u5373\u6267\u884C\u4E00\u6B21",size:"small",onClick:async()=>{try{await si(e),Ro.info("\u5DF2\u89E6\u53D1\u624B\u52A8\u6267\u884C",null,{toast:"success"})}catch(g){Ro.error(`\u6267\u884C\u5931\u8D25\uFF1A${g?.message||g}`,null,{toast:!0})}}}).el),i.appendChild(X({label:"\u{1F4BE} \u4FDD\u5B58\u914D\u7F6E",size:"small",variant:"primary",onClick:()=>{Ro.info("\u914D\u7F6E\u5DF2\u4FDD\u5B58",null,{toast:"success"}),r()}}).el),a.appendChild(i),n.appendChild(a),t.description&&n.appendChild(f("div",{className:"yyt-tool-panel-hero-desc",text:t.description})),o&&n.appendChild(f("div",{className:"yyt-tool-panel-hero-desc",text:o}));let l=f("div",{className:"yyt-tool-panel-hero-chips"}),d=t.output?.autoTrigger!==!1;l.appendChild(f("span",{className:"yyt-tool-hero-chip mode",text:`\u672C\u5730\u811A\u672C\uFF08${d?"\u81EA\u52A8":"\u624B\u52A8"}\uFF09`}));let c=t.processor?.direction||s[0]?.key||"",u=s.find(g=>g.key===c)?.label||c;u&&l.appendChild(f("span",{className:"yyt-tool-hero-chip preset",text:`\u65B9\u5411: ${u}`}));let p=t.output?.overwrite!==!1;l.appendChild(f("span",{className:"yyt-tool-hero-chip preset",text:`\u5199\u56DE: ${p?"\u8986\u76D6":"\u8FFD\u52A0"}`}));let y=t.extraction?.regexPresetId||"";if(y){let g=Ee.getPreset(y);g&&l.appendChild(f("span",{className:"yyt-tool-hero-chip preset",text:`\u6B63\u5219: ${g.name}`}))}let m=t.runtime?.lastStatus;if(m){let g=m==="success"?"status-success":m==="failed"?"status-failed":"";l.appendChild(f("span",{className:`yyt-tool-hero-chip ${g}`,text:`\u4E0A\u6B21\u6267\u884C \xB7 ${m}`}))}return n.appendChild(l),n}function uT(t){let e=f("div",{className:"yyt-tool-runtime-row"}),r=t.runtime||{},s=(a,i,l="")=>{let d=f("div",{className:"yyt-tool-runtime-stat"});return d.appendChild(f("span",{className:"yyt-tool-runtime-stat-label",text:a})),d.appendChild(f("span",{className:`yyt-tool-runtime-stat-value ${l}`,text:i})),d},o=r.lastStatus==="success"?"\u2713 \u4E0A\u6B21\u6210\u529F":r.lastStatus==="failed"?"\u2717 \u4E0A\u6B21\u5931\u8D25":"\u5F85\u547D",n=r.lastStatus==="success"?"success":r.lastStatus==="failed"?"error":"muted";return e.appendChild(s("\u72B6\u6001",o,n)),e.appendChild(s("\u6700\u8FD1\u8FD0\u884C",cT(r.lastRunAt),"muted")),e.appendChild(s("\u6210\u529F",String(r.successCount||0),"success")),e.appendChild(s("\u5931\u8D25",String(r.errorCount||0),r.errorCount?"error":"muted")),e}function pT(t,e,r){let s=f("div",{style:{display:"flex",flexDirection:"column"}}),o=Ee.listPresets();return s.appendChild(Rc({label:"\u6B63\u5219\u63D0\u53D6\u9884\u8BBE",hint:"\u51B3\u5B9A\u4ECE AI \u56DE\u590D\u4E2D\u5982\u4F55\u62BD\u53D6\u8981\u672C\u5730\u5904\u7406\u7684\u6587\u672C",control:Re({value:t.extraction?.regexPresetId||"",options:[{value:"",label:"\u2014\u2014 \u65E0\uFF08\u4E0D\u8FDB\u884C\u63D0\u53D6\uFF09 \u2014\u2014"},...o.map(n=>({value:n.id,label:n.name}))],onChange:n=>{let a=le(e)||{},i={...a.extraction||{},regexPresetId:n};if(n){let l=Ee.getPreset(n);Ro.info(`\u5DF2\u7ED1\u5B9A\u6B63\u5219\u9884\u8BBE\uFF1A${l?.name||n}`,null,{toast:"success"})}else Ro.info("\u5DF2\u89E3\u7ED1\u6B63\u5219\u9884\u8BBE\uFF0C\u5DE5\u5177\u5C06\u4E0D\u8FDB\u884C\u5185\u5BB9\u63D0\u53D6",null,{toast:"success"});Ie(e,{...a,extraction:i}),r()}})})),s.appendChild(Rc({label:"\u5199\u56DE\u65B9\u5F0F",hint:"\u5904\u7406\u540E\u7684\u7ED3\u679C\u5982\u4F55\u56DE\u5199\u5230 AI \u6D88\u606F",control:Re({value:t.output?.overwrite!==!1?"replace":"append",options:[{value:"replace",label:"\u8986\u76D6\u539F\u5DE5\u5177\u5757"},{value:"append",label:"\u8FFD\u52A0\u5230\u672B\u5C3E"}],onChange:n=>{let a=le(e)||{};Ie(e,{...a,output:{...a.output||{},overwrite:n==="replace",enabled:!0,mode:"local_transform"}}),r()}})})),s.appendChild(Rc({label:"\u81EA\u52A8\u89E6\u53D1",hint:"\u6536\u5230 AI \u56DE\u590D\u540E\u662F\u5426\u81EA\u52A8\u6267\u884C\u6B64\u811A\u672C",control:Re({value:t.output?.autoTrigger!==!1?"auto":"manual",options:[{value:"auto",label:"\u81EA\u52A8\uFF08\u6536\u5230\u56DE\u590D\u5373\u6267\u884C\uFF09"},{value:"manual",label:"\u624B\u52A8\uFF08\u4EC5\u70B9\u51FB\u6309\u94AE\u6267\u884C\uFF09"}],onChange:n=>{let a=le(e)||{};Ie(e,{...a,output:{...a.output||{},autoTrigger:n==="auto",enabled:!0,mode:"local_transform"}}),r()}})})),Yt({heading:"\u7ED1\u5B9A",icon:"\u{1F517}",content:[s]})}function Rc({label:t,hint:e,control:r}){let s=f("div",{className:"yyt-tool-binding-row"}),o=f("div",{className:"yyt-tool-binding-label"});return o.appendChild(f("span",{className:"yyt-tool-binding-label-text",text:t})),e&&o.appendChild(f("span",{className:"yyt-tool-binding-label-hint",text:e})),s.appendChild(o),Object.assign(r.el.style,{padding:"7px 10px",fontSize:"12px"}),s.appendChild(r.el),s.appendChild(f("div",{className:"yyt-tool-binding-meta"})),s}function yT(t,e,r,s,o,n,a,i){let l=f("div",{style:{display:"flex",flexDirection:"column"}});l.appendChild(f("div",{style:{marginBottom:"10px"}},f("div",{text:"\u6267\u884C\u65B9\u5411",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}}),f("div",{text:"\u51B3\u5B9A\u672C\u5730\u811A\u672C\u8FD0\u884C\u54EA\u4E2A\u53D8\u6362\u8DEF\u5F84\u3002",style:{fontSize:"11px",color:"var(--yyt-text-muted)",lineHeight:"1.6"}})));let d=t.processor?.direction||o[0]?.key||"",c=Re({value:d,options:o.map(g=>({value:g.key,label:g.description?`${g.label} \u2014 ${g.description}`:g.label})),style:{padding:"7px 10px",fontSize:"12px"},onChange:g=>{let h=le(e)||{};Ie(e,{...h,processor:{...h.processor||{},direction:g}}),r()}});if(l.appendChild(c.el),l.appendChild(f("hr",{className:"yyt-zone-divider"})),n.length>0){l.appendChild(f("div",{style:{marginBottom:"10px"}},f("div",{text:"\u5904\u7406\u9879",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}}),f("div",{text:"\u52FE\u9009\u8981\u5305\u542B\u5728\u672C\u6B21\u53D8\u6362\u4E2D\u7684\u9879\u76EE\u3002",style:{fontSize:"11px",color:"var(--yyt-text-muted)",lineHeight:"1.6"}})));let g=f("div",{style:{display:"flex",flexDirection:"column"}}),h=t.processor?.options||{};for(let x of n){let S=wt({label:x.label,hint:x.description||"",checked:h[x.key]===!0,onChange:T=>{let A=le(e)||{};Ie(e,{...A,processor:{...A.processor||{},options:{...A.processor?.options||{},[x.key]:T}}})}});g.appendChild(S.el)}l.appendChild(g),l.appendChild(f("hr",{className:"yyt-zone-divider"}))}l.appendChild(f("div",{style:{marginBottom:"10px"}},f("div",{text:"\u63D0\u53D6\u914D\u7F6E",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}}),f("div",{text:'\u4ECE AI \u56DE\u590D\u4E2D\u62BD\u53D6\u8981\u672C\u5730\u5904\u7406\u7684\u6587\u672C\u3002\u5B8C\u6574\u89C4\u5219\u7531"\u6B63\u5219\u63D0\u53D6\u9884\u8BBE"\u51B3\u5B9A\uFF0C\u8FD9\u91CC\u53EA\u914D\u7F6E\u5DE5\u5177\u53C2\u6570\u3002',style:{fontSize:"11px",color:"var(--yyt-text-muted)",lineHeight:"1.6"}})));let u=f("div",{style:{display:"grid",gridTemplateColumns:"1fr auto",gap:"12px",alignItems:"end"}}),p=f("div",{className:"yyt-form-group",style:{margin:0}});p.appendChild(f("label",{text:"\u6700\u5927\u63D0\u53D6 AI \u6D88\u606F\u6570",style:{fontSize:"12px",fontWeight:"600",color:"var(--yyt-text-secondary, rgba(255,255,255,0.55))"}}));let y=f("input",{className:"yyt-input",attrs:{type:"number",min:"1",max:"50"},style:{padding:"7px 10px",fontSize:"12px"}});y.value=String(Number(t.extraction?.maxMessages)||5),y.addEventListener("change",()=>{let g=le(e)||{};Ie(e,{...g,extraction:{...g.extraction||{},maxMessages:Math.max(1,parseInt(y.value,10)||5)}})}),p.appendChild(y),u.appendChild(p);let m=f("div",{className:"yyt-form-group",style:{margin:0}});return m.appendChild(f("label",{html:"&nbsp;",style:{fontSize:"12px"}})),m.appendChild(X({label:"\u{1F50D} \u6D4B\u8BD5\u63D0\u53D6",onClick:async()=>{try{let g=await oi(e);fT(s,g,a,i)}catch(g){Ro.error(`\u6D4B\u8BD5\u63D0\u53D6\u5931\u8D25\uFF1A${g?.message||g}`,null,{toast:!0})}}}).el),u.appendChild(m),l.appendChild(u),Yt({heading:"\u914D\u7F6E",icon:"\u2699",content:[l]})}function fT(t,e,r,s){if(!te()||!we(t))return;let n=`${us}-${r||"extraction-preview"}`,a=Array.isArray(e?.messageEntries)?e.messageEntries:[],i=a.length>0?`
      <div class="yyt-form-group">
        <label>\u9010\u6761\u6D88\u606F\u9884\u89C8</label>
        <div class="yyt-preview-message-list">
          ${a.map((l,d)=>{let c=d===a.length-1?"\u6700\u65B0\u6D88\u606F":`\u6700\u8FD1\u7684\u7B2C ${a.length-d} \u6761\u6D88\u606F`;return`
              <div class="yyt-preview-message-item">
                <div class="yyt-preview-message-title">${rs(c)}</div>
                <div><label>\u539F\u6587</label><pre class="yyt-preview-box yyt-preview-pre">${rs(l.rawText||"\u65E0\u53EF\u7528\u6D88\u606F")}</pre></div>
                <div><label>\u6B63\u6587\u63D0\u53D6</label><pre class="yyt-preview-box yyt-preview-pre">${rs(l.filteredText||"\u6B63\u6587\u89C4\u5219\u672A\u547D\u4E2D")}</pre></div>
                <div><label>\u5DE5\u5177\u6807\u7B7E\u63D0\u53D6</label><pre class="yyt-preview-box yyt-preview-pre">${rs(l.extractedText||"\u672A\u63D0\u53D6\u5230\u5185\u5BB9")}</pre></div>
              </div>
            `}).join("")}
        </div>
      </div>
    `:"";t.append(Bo({id:n,title:s,width:"720px",wide:!0,body:`
      <div class="yyt-form-group">
        <label>\u63D0\u53D6\u89C4\u5219</label>
        <div class="yyt-preview-box">${rs((e?.selectors||[]).join(`
`)||"\u65E0")}</div>
      </div>
      <div class="yyt-form-group">
        <label>\u539F\u59CB\u5185\u5BB9\u6C47\u603B</label>
        <pre class="yyt-preview-box yyt-preview-pre">${rs(e?.sourceText||"\u65E0\u53EF\u7528\u6D88\u606F")}</pre>
      </div>
      <div class="yyt-form-group">
        <label>\u6B63\u6587\u63D0\u53D6\u6C47\u603B</label>
        <pre class="yyt-preview-box yyt-preview-pre">${rs(e?.filteredSourceText||"\u6B63\u6587\u89C4\u5219\u672A\u547D\u4E2D")}</pre>
      </div>
      <div class="yyt-form-group">
        <label>\u5DE5\u5177\u6807\u7B7E\u63D0\u53D6\u6C47\u603B</label>
        <pre class="yyt-preview-box yyt-preview-pre">${rs(e?.extractedText||"\u672A\u63D0\u53D6\u5230\u5185\u5BB9")}</pre>
      </div>
      ${i}
    `})),zo(t,n,{onSave:l=>l()}),t.find(`#${n}-save`).text("\u5173\u95ED"),t.find(`#${n}-cancel`).remove()}var Ro,Mc=D(()=>{tr();tt();lr();kc();H();Io();Fr();Ro=E.createScope("LocalTransformToolPanel")});var qf={};ae(qf,{EscapeTransformToolPanel:()=>Gf,default:()=>gT});var Gf,gT,Yf=D(()=>{Mc();Gf=ni({id:"escapeTransformToolPanel",toolId:"escapeTransformTool",previewDialogId:"escape-transform-extraction-preview",previewTitle:"\u8F6C\u4E49\u5904\u7406\u63D0\u53D6\u9884\u89C8",heroHint:"\u4ECE\u6700\u8FD1 AI \u6D88\u606F\u63D0\u53D6\u6587\u672C\u540E\uFF0C\u5728\u672C\u5730\u6267\u884C\u8F6C\u4E49\u6216\u53BB\u8F6C\u4E49\uFF0C\u518D\u6309\u6240\u9009\u65B9\u5F0F\u5199\u56DE\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\u6216\u6B63\u5219\uFF0C\u4F8B\u5982\uFF1A
content
regex:<content>([\\s\\S]*?)</content>`,processorDirections:[{key:"escape",label:"\u8F6C\u4E49",description:"\u628A\u539F\u59CB\u5B57\u7B26\u8F6C\u6362\u6210\u8F6C\u4E49\u5E8F\u5217\u3002"},{key:"unescape",label:"\u53BB\u8F6C\u4E49",description:"\u628A\u8F6C\u4E49\u5E8F\u5217\u8FD8\u539F\u6210\u539F\u59CB\u5B57\u7B26\u3002"}],processorOptions:[{key:"doubleQuote",label:"\u53CC\u5F15\u53F7",description:'\u5904\u7406 " \u4E0E \\"\u3002'},{key:"singleQuote",label:"\u5355\u5F15\u53F7",description:"\u5904\u7406 ' \u4E0E \\'\u3002"},{key:"newline",label:"\u6362\u884C\u7B26",description:"\u5904\u7406\u6362\u884C\u4E0E \\n\u3002"}]}),gT=Gf});var Jf={};ae(Jf,{PunctuationTransformToolPanel:()=>Vf,default:()=>mT});var Vf,mT,Xf=D(()=>{Mc();Vf=ni({id:"punctuationTransformToolPanel",toolId:"punctuationTransformTool",previewDialogId:"punctuation-transform-extraction-preview",previewTitle:"\u4E2D\u6587\u6807\u70B9\u66FF\u6362\u63D0\u53D6\u9884\u89C8",heroHint:"\u4ECE\u6700\u8FD1 AI \u6D88\u606F\u63D0\u53D6\u6587\u672C\u540E\uFF0C\u5728\u672C\u5730\u628A\u82F1\u6587\u6807\u70B9\u66FF\u6362\u6210\u4E2D\u6587\u6807\u70B9\uFF0C\u518D\u6309\u6240\u9009\u65B9\u5F0F\u5199\u56DE\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\u6216\u6B63\u5219\uFF0C\u4F8B\u5982\uFF1A
content
regex:<content>([\\s\\S]*?)</content>`,processorDirections:[{key:"en_to_zh",label:"\u82F1\u6587\u8F6C\u4E2D\u6587",description:"\u6309\u52FE\u9009\u9879\u628A\u82F1\u6587\u6807\u70B9\u66FF\u6362\u4E3A\u4E2D\u6587\u6807\u70B9\u3002"}],processorOptions:[{key:"comma",label:"\u9017\u53F7 ,",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u9017\u53F7\u3002"},{key:"period",label:"\u53E5\u53F7 .",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u53E5\u53F7\u3002"},{key:"exclamation",label:"\u611F\u53F9\u53F7 !",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u611F\u53F9\u53F7\u3002"},{key:"question",label:"\u95EE\u53F7 ?",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u95EE\u53F7\u3002"},{key:"semicolon",label:"\u5206\u53F7 ;",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u5206\u53F7\u3002"},{key:"colon",label:"\u5192\u53F7 :",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u5192\u53F7\u3002"},{key:"leftParen",label:"\u5DE6\u62EC\u53F7 (",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u5DE6\u62EC\u53F7\u3002"},{key:"rightParen",label:"\u53F3\u62EC\u53F7 )",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u53F3\u62EC\u53F7\u3002"}]}),mT=Vf});var Zf={};ae(Zf,{BypassPanel:()=>Qf,default:()=>hT});var nt,Qf,hT,eg=D(()=>{Ze();_o();tt();H();nt=E.createScope("BypassPanel"),Qf={id:"bypassPanel",_getActivePresetId(t){return t.find(".yyt-bypass-editor-content").data("presetId")||null},render(t){let e=ye.getPresetList(),r=ye.getDefaultPresetId();return`
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
          <span class="yyt-bypass-preset-name">${ie(t.name)}</span>
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
      `;let e=ye.getDefaultPresetId()===t.id,r=Ar&&Ar[t.id];return`
      <div class="yyt-bypass-editor-content" data-preset-id="${t.id}">
        <div class="yyt-bypass-editor-header">
          <div class="yyt-bypass-editor-title">
            <input type="text" class="yyt-input yyt-bypass-name-input" 
                   value="${ie(t.name)}" placeholder="\u9884\u8BBE\u540D\u79F0">
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
                 value="${ie(t.description||"")}" placeholder="\u9884\u8BBE\u63CF\u8FF0\uFF08\u53EF\u9009\uFF09">
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
                  placeholder="\u8F93\u5165\u6D88\u606F\u5185\u5BB9...">${ie(t.content||"")}</textarea>
      </div>
    `},bindEvents(t,e){let r=te();!r||!we(t)||(t.off(".yytBypass"),this._bindPresetListEvents(t,r),this._bindEditorEvents(t,r),this._bindFileEvents(t,r),zt(t,{namespace:"yytBypassSelect",selectors:[".yyt-bypass-role-select"]}))},_bindPresetListEvents(t,e){t.on("click.yytBypass",".yyt-bypass-preset-item",r=>{if(e(r.target).closest(".yyt-bypass-quick-delete").length)return;let s=e(r.currentTarget).data("presetId");this._selectPreset(t,e,s)}),t.on("click.yytBypass",".yyt-bypass-quick-delete",async r=>{r.stopPropagation();let s=e(r.currentTarget).data("presetId");if(!s||!await br("\u5220\u9664\u9884\u8BBE","\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u4E2A\u9884\u8BBE\u5417\uFF1F",{danger:!0}))return;let n=ye.deletePreset(s);n.success?(t.find(".yyt-bypass-editor-content").data("presetId")===s&&t.find(".yyt-bypass-editor").html(`
            <div class="yyt-bypass-empty">
              <i class="fa-solid fa-shield-halved"></i>
              <p>\u9009\u62E9\u6216\u521B\u5EFA Ai \u6307\u4EE4\u9884\u8BBE</p>
            </div>
          `),this._refreshPresetList(t,e),nt.info("\u9884\u8BBE\u5DF2\u5220\u9664",null,{toast:"success"})):nt.error(n?.message||"\u5220\u9664\u9884\u8BBE\u5931\u8D25",null,{toast:!0})}),t.on("click.yytBypass","#yyt-bypass-add",()=>{this._createNewPreset(t,e)})},_bindEditorEvents(t,e){t.on("click.yytBypass","#yyt-bypass-save",()=>{this._saveCurrentPreset(t,e)}),t.on("click.yytBypass","#yyt-bypass-delete",()=>{this._deleteCurrentPreset(t,e)}),t.on("click.yytBypass","#yyt-bypass-duplicate",()=>{this._duplicateCurrentPreset(t,e)}),t.on("click.yytBypass","#yyt-bypass-set-default",()=>{this._setAsDefault(t,e)}),t.on("click.yytBypass","#yyt-bypass-add-message",()=>{this._addMessage(t,e)}),t.on("click.yytBypass",".yyt-bypass-move-up",r=>{let s=e(r.currentTarget).closest(".yyt-bypass-message"),o=s.prev(".yyt-bypass-message");o.length&&(o.before(s),this._refreshMessageIndices(t,e))}),t.on("click.yytBypass",".yyt-bypass-move-down",r=>{let s=e(r.currentTarget).closest(".yyt-bypass-message"),o=s.next(".yyt-bypass-message");o.length&&(o.after(s),this._refreshMessageIndices(t,e))}),t.on("click.yytBypass",".yyt-bypass-insert-message",r=>{let s=e(r.currentTarget).closest(".yyt-bypass-message");this._insertMessageAfter(t,e,s)}),t.on("click.yytBypass",".yyt-bypass-delete-message",r=>{e(r.currentTarget).closest(".yyt-bypass-message").remove(),this._refreshMessageIndices(t,e)}),t.on("change.yytBypass",".yyt-bypass-message-enabled",r=>{e(r.currentTarget).closest(".yyt-bypass-message").toggleClass("yyt-disabled",!e(r.currentTarget).is(":checked"))})},_bindFileEvents(t,e){t.on("click.yytBypass","#yyt-bypass-import",()=>{t.find("#yyt-bypass-import-file").click()}),t.on("change.yytBypass","#yyt-bypass-import-file",async r=>{let s=r.target.files[0];if(s){try{let o=await Uo(s),n=ye.importPresets(o);n.success?nt.info(n.message,null,{toast:"success"}):nt.error(n.message,null,{toast:!0}),n.success&&this.renderTo(t)}catch(o){nt.error(`\u5BFC\u5165\u5931\u8D25: ${o.message}`,null,{toast:!0})}e(r.target).val("")}}),t.on("click.yytBypass","#yyt-bypass-export",()=>{try{let r=ye.exportPresets();Ko(r,`bypass_presets_${Date.now()}.json`),nt.info("\u9884\u8BBE\u5DF2\u5BFC\u51FA",null,{toast:"success"})}catch(r){nt.error(`\u5BFC\u51FA\u5931\u8D25: ${r.message}`,null,{toast:!0})}})},_selectPreset(t,e,r){let s=ye.getPreset(r);s&&(t.find(".yyt-bypass-preset-item").removeClass("yyt-active"),t.find(`.yyt-bypass-preset-item[data-preset-id="${r}"]`).addClass("yyt-active"),t.find(".yyt-bypass-editor").html(this._renderEditor(s)),zt(t,{namespace:"yytBypassSelect",selectors:[".yyt-bypass-role-select"]}))},_createNewPreset(t,e){let r=`bypass_${Date.now()}`,s=ye.createPreset({id:r,name:"\u65B0 Ai \u6307\u4EE4\u9884\u8BBE",description:"",messages:[]});s.success?(this.renderTo(t),this._selectPreset(t,e,r),nt.info("\u9884\u8BBE\u5DF2\u521B\u5EFA",null,{toast:"success"})):nt.error(s?.message||"\u521B\u5EFA\u9884\u8BBE\u5931\u8D25",null,{toast:!0})},_saveCurrentPreset(t,e){let r=t.find(".yyt-bypass-editor-content"),s=r.data("presetId");if(!s)return;let o=r.find(".yyt-bypass-name-input").val().trim(),n=r.find(".yyt-bypass-description-input").val().trim();if(!o){nt.warn("\u8BF7\u8F93\u5165\u9884\u8BBE\u540D\u79F0",null,{toast:!0}),r.find(".yyt-bypass-name-input").trigger("focus").trigger("select");return}let a=[];r.find(".yyt-bypass-message").each(function(){let l=e(this);a.push({id:l.data("messageId"),role:l.find(".yyt-bypass-role-select").val(),content:l.find(".yyt-bypass-message-content").val(),enabled:l.find(".yyt-bypass-message-enabled").is(":checked"),deletable:String(l.data("deletable"))!=="false"})});let i=ye.updatePreset(s,{name:o,description:n,messages:a});i.success?(nt.info("\u9884\u8BBE\u5DF2\u4FDD\u5B58",null,{toast:"success"}),this._refreshPresetList(t,e)):nt.error(i?.message||"\u4FDD\u5B58\u9884\u8BBE\u5931\u8D25",null,{toast:!0})},async _deleteCurrentPreset(t,e){let s=t.find(".yyt-bypass-editor-content").data("presetId");if(!s||!await br("\u5220\u9664\u9884\u8BBE","\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u4E2A\u9884\u8BBE\u5417\uFF1F",{danger:!0}))return;let n=ye.deletePreset(s);n.success?(this.renderTo(t),nt.info("\u9884\u8BBE\u5DF2\u5220\u9664",null,{toast:"success"})):nt.error(n?.message||"\u5220\u9664\u9884\u8BBE\u5931\u8D25",null,{toast:!0})},_duplicateCurrentPreset(t,e){let s=t.find(".yyt-bypass-editor-content").data("presetId");if(!s)return;let o=`bypass_${Date.now()}`,n=ye.duplicatePreset(s,o);n.success?(this.renderTo(t),this._selectPreset(t,e,o),nt.info("\u9884\u8BBE\u5DF2\u590D\u5236",null,{toast:"success"})):nt.error(n?.message||"\u590D\u5236\u9884\u8BBE\u5931\u8D25",null,{toast:!0})},_setAsDefault(t,e){let s=t.find(".yyt-bypass-editor-content").data("presetId");if(!s)return;ye.setDefaultPresetId(s),this._refreshPresetList(t,e);let o=ye.getPreset(s);o&&t.find(".yyt-bypass-editor").html(this._renderEditor(o)),nt.info("\u5DF2\u8BBE\u4E3A\u9ED8\u8BA4\u9884\u8BBE",null,{toast:"success"})},_addMessage(t,e){let r=t.find(".yyt-bypass-messages"),s={id:`msg_${Date.now()}`,role:"SYSTEM",content:"",enabled:!0,deletable:!0},o=r.find(".yyt-bypass-message").length;r.append(this._renderMessageItem(s,o))},_insertMessageAfter(t,e,r){let s=t.find(".yyt-bypass-messages"),o={id:`msg_${Date.now()}`,role:"SYSTEM",content:"",enabled:!0,deletable:!0},n=this._renderMessageItem(o,0),a=e(n);r.after(a),this._refreshMessageIndices(t,e)},_refreshMessageIndices(t,e){t.find(".yyt-bypass-message").each(function(r){e(this).attr("data-message-index",r)})},_refreshPresetList(t,e){let r=ye.getPresetList(),s=ye.getDefaultPresetId(),o=this._getActivePresetId(t);t.find(".yyt-bypass-preset-list").html(r.map(n=>this._renderPresetItem(n,n.id===s)).join("")),o&&t.find(`.yyt-bypass-preset-item[data-preset-id="${o}"]`).addClass("yyt-active")},destroy(t){!te()||!we(t)||(gt(t,"yytBypassSelect"),t.off(".yytBypass"))},getStyles(){return`
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
    `},renderTo(t){let e=this.render({});t.html(e),this.bindEvents(t,{})}},hT=Qf});var Dc={};ae(Dc,{SettingsPanel:()=>ng,applyTheme:()=>og,applyUiPreferences:()=>Nc,default:()=>xT});function An({id:t,checked:e=!1,title:r="",hint:s=""}){return`
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
  `}function rg(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window}function Cn(){return rg()?.document||document}function sg(t=Cn()){return t?.documentElement||document.documentElement}function og(t,e=Cn()){let r=sg(e),s={...bT,...tg[t]||tg["dark-blue"]};Object.entries(s).forEach(([o,n])=>{r.style.setProperty(o,n)}),r.setAttribute("data-yyt-theme",t)}function Nc(t={},e=Cn()){let r=sg(e),{theme:s="dark-blue",compactMode:o=!1,animationEnabled:n=!0}=t||{};og(s,e),r.classList.toggle("yyt-compact-mode",!!o),r.classList.toggle("yyt-no-animation",!n)}var Pc,bT,tg,ng,xT,Lc=D(()=>{Ze();vn();H();Ja();tt();Pc=E.createScope("SettingsPanel"),bT={"--yyt-accent":"#7bb7ff","--yyt-accent-glow":"rgba(123, 183, 255, 0.4)","--yyt-accent-soft":"rgba(123, 183, 255, 0.15)","--yyt-accent-strong":"#a5d4ff","--yyt-on-accent":"#0a0d13","--yyt-bg-base":"#0a0d13","--yyt-surface":"#0f1219","--yyt-surface-2":"#151a24","--yyt-surface-3":"#1c2231","--yyt-surface-hover":"#1c2231","--yyt-surface-active":"#232b3e","--yyt-border":"rgba(255, 255, 255, 0.06)","--yyt-border-soft":"rgba(255, 255, 255, 0.04)","--yyt-border-strong":"rgba(255, 255, 255, 0.12)","--yyt-text":"rgba(255, 255, 255, 0.92)","--yyt-text-secondary":"rgba(255, 255, 255, 0.55)","--yyt-text-muted":"rgba(255, 255, 255, 0.35)","--yyt-focus-ring":"0 0 0 2px rgba(123, 183, 255, 1), 0 0 0 4px rgba(123, 183, 255, 0.15)","--yyt-control-bg":"#0f1219","--yyt-control-bg-hover":"#151a24","--yyt-control-bg-active":"#1c2231","--yyt-control-bg-strong":"#151a24","--yyt-control-bg-focus":"#151a24","--yyt-control-border":"rgba(255, 255, 255, 0.08)","--yyt-control-border-hover":"rgba(255, 255, 255, 0.14)","--yyt-control-border-focus":"rgba(123, 183, 255, 0.5)","--yyt-control-shadow":"none","--yyt-control-shadow-hover":"none","--yyt-control-shadow-focus":"none","--yyt-control-shadow-active":"none","--yyt-select-surface":"#151a24","--yyt-select-option-bg":"#1c2231","--yyt-select-option-hover-bg":"#232b3e","--yyt-select-option-selected-bg":"#2a3450","--yyt-select-option-border":"rgba(123, 183, 255, 0.15)","--yyt-select-option-selected-border":"rgba(123, 183, 255, 0.3)","--yyt-select-dropdown-shadow":"0 8px 24px rgba(0, 0, 0, 0.4)","--yyt-select-arrow-color":"rgba(255, 255, 255, 0.4)"},tg={"dark-blue":{"--yyt-on-accent":"#0a0d13"},"dark-purple":{"--yyt-accent":"#a78bfa","--yyt-accent-glow":"rgba(167, 139, 250, 0.4)","--yyt-accent-soft":"rgba(167, 139, 250, 0.15)","--yyt-accent-strong":"#c4b5fd","--yyt-bg-base":"#0d0a14","--yyt-surface":"#12101c","--yyt-surface-2":"#1a1726","--yyt-surface-3":"#221e32","--yyt-surface-hover":"#221e32","--yyt-surface-active":"#2a2540","--yyt-on-accent":"#0d0a14","--yyt-control-bg":"#12101c","--yyt-control-bg-hover":"#1a1726","--yyt-control-bg-active":"#221e32","--yyt-control-bg-strong":"#1a1726","--yyt-control-bg-focus":"#1a1726","--yyt-control-border-focus":"rgba(167, 139, 250, 0.5)","--yyt-select-surface":"#1a1726","--yyt-select-option-bg":"#221e32","--yyt-select-option-hover-bg":"#2a2540","--yyt-select-option-selected-bg":"#332d50","--yyt-select-option-border":"rgba(167, 139, 250, 0.15)","--yyt-select-option-selected-border":"rgba(167, 139, 250, 0.3)","--yyt-focus-ring":"0 0 0 2px rgba(167, 139, 250, 1), 0 0 0 4px rgba(167, 139, 250, 0.15)"},"dark-green":{"--yyt-accent":"#4ade80","--yyt-accent-glow":"rgba(74, 222, 128, 0.4)","--yyt-accent-soft":"rgba(74, 222, 128, 0.15)","--yyt-accent-strong":"#86efac","--yyt-bg-base":"#0a120d","--yyt-surface":"#0f1912","--yyt-surface-2":"#151f1a","--yyt-surface-3":"#1c2824","--yyt-surface-hover":"#1c2824","--yyt-surface-active":"#233530","--yyt-on-accent":"#0a120d","--yyt-control-bg":"#0f1912","--yyt-control-bg-hover":"#151f1a","--yyt-control-bg-active":"#1c2824","--yyt-control-bg-strong":"#151f1a","--yyt-control-bg-focus":"#151f1a","--yyt-control-border-focus":"rgba(74, 222, 128, 0.5)","--yyt-select-surface":"#151f1a","--yyt-select-option-bg":"#1c2824","--yyt-select-option-hover-bg":"#233530","--yyt-select-option-selected-bg":"#2a4038","--yyt-select-option-border":"rgba(74, 222, 128, 0.15)","--yyt-select-option-selected-border":"rgba(74, 222, 128, 0.3)","--yyt-focus-ring":"0 0 0 2px rgba(74, 222, 128, 1), 0 0 0 4px rgba(74, 222, 128, 0.15)"},light:{"--yyt-accent":"#3b82f6","--yyt-accent-glow":"rgba(59, 130, 246, 0.3)","--yyt-accent-soft":"rgba(59, 130, 246, 0.1)","--yyt-accent-strong":"#93c5fd","--yyt-bg-base":"#f5f7fa","--yyt-surface":"#edf0f5","--yyt-surface-2":"#e4e8ef","--yyt-surface-3":"#dbe0e9","--yyt-surface-hover":"#dbe0e9","--yyt-surface-active":"#d1d7e2","--yyt-text":"rgba(15, 23, 42, 0.92)","--yyt-text-secondary":"rgba(15, 23, 42, 0.55)","--yyt-text-muted":"rgba(15, 23, 42, 0.35)","--yyt-border":"rgba(15, 23, 42, 0.08)","--yyt-border-soft":"rgba(15, 23, 42, 0.04)","--yyt-border-strong":"rgba(15, 23, 42, 0.14)","--yyt-focus-ring":"0 0 0 2px rgba(59, 130, 246, 1), 0 0 0 4px rgba(59, 130, 246, 0.12)","--yyt-on-accent":"#ffffff","--yyt-control-bg":"#edf0f5","--yyt-control-bg-hover":"#e4e8ef","--yyt-control-bg-active":"#dbe0e9","--yyt-control-bg-strong":"#e4e8ef","--yyt-control-bg-focus":"#e4e8ef","--yyt-control-border":"rgba(15, 23, 42, 0.1)","--yyt-control-border-hover":"rgba(15, 23, 42, 0.18)","--yyt-control-border-focus":"rgba(59, 130, 246, 0.5)","--yyt-control-shadow":"none","--yyt-control-shadow-hover":"none","--yyt-control-shadow-focus":"none","--yyt-control-shadow-active":"none","--yyt-select-surface":"#e4e8ef","--yyt-select-option-bg":"#edf0f5","--yyt-select-option-hover-bg":"#dbe0e9","--yyt-select-option-selected-bg":"#dbeafe","--yyt-select-option-border":"rgba(59, 130, 246, 0.12)","--yyt-select-option-selected-border":"rgba(59, 130, 246, 0.3)","--yyt-select-dropdown-shadow":"0 8px 24px rgba(15, 23, 42, 0.1)","--yyt-select-arrow-color":"rgba(15, 23, 42, 0.4)"}};ng={id:"settingsPanel",render(){let t=jt.getSettings(),e=t.debug?.enableDebugLog===!0,r=this._getAutomationRuntime();return`
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
            ${An({id:"yyt-setting-enableDebugLog",checked:t.enableDebugLog,title:"\u542F\u7528\u8C03\u8BD5\u65E5\u5FD7",hint:"\u5F00\u542F\u540E Logger \u9762\u677F\u5C06\u8BB0\u5F55 DEBUG \u7EA7\u522B\u65E5\u5FD7\uFF0C\u5173\u95ED\u4EC5\u8BB0\u5F55 INFO \u53CA\u4EE5\u4E0A"})}
          </div>
          <div class="yyt-settings-hint" style="margin-top: 8px;">
            <i class="fa-solid fa-terminal"></i> \u5728\u300C\u65E5\u5FD7\u300D\u9762\u677F\u4E2D\u67E5\u770B\u3001\u641C\u7D22\u548C\u5BFC\u51FA\u63D2\u4EF6\u8FD0\u884C\u65E5\u5FD7
          </div>
        </div>

        <div class="yyt-flow-section">
          <div class="yyt-flow-heading"><span class="yyt-flow-heading-icon"><i class="fa-solid fa-clock-rotate-left"></i></span>\u6267\u884C\u8BB0\u5F55</div>
          <div class="yyt-form-group">
            ${An({id:"yyt-setting-saveExecutionHistory",checked:t.saveExecutionHistory,title:"\u4FDD\u5B58\u6267\u884C\u5386\u53F2",hint:"\u8BB0\u5F55\u5DE5\u5177\u6267\u884C\u5386\u53F2\uFF0C\u4FBF\u4E8E\u95EE\u9898\u6392\u67E5"})}
          </div>
        </div>

        <div class="yyt-flow-section">
          <div class="yyt-flow-heading"><span class="yyt-flow-heading-icon"><i class="fa-solid fa-eye"></i></span>UI \u663E\u793A</div>
          <div class="yyt-form-group">
            ${An({id:"yyt-setting-showRuntimeBadge",checked:t.showRuntimeBadge,title:"\u663E\u793A\u8FD0\u884C\u72B6\u6001\u5FBD\u7AE0",hint:"\u5728\u5DE5\u5177\u5361\u7247\u4E0A\u663E\u793A\u8FD0\u884C\u72B6\u6001\u6307\u793A\u5668"})}
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
            ${An({id:"yyt-setting-compactMode",checked:t.compactMode,title:"\u7D27\u51D1\u6A21\u5F0F",hint:"\u51CF\u5C11\u5361\u7247\u95F4\u8DDD\uFF0C\u663E\u793A\u66F4\u591A\u5185\u5BB9"})}
          </div>

          <div class="yyt-form-group">
            ${An({id:"yyt-setting-animationEnabled",checked:t.animationEnabled,title:"\u542F\u7528\u52A8\u753B\u6548\u679C",hint:"\u754C\u9762\u8FC7\u6E21\u548C\u4EA4\u4E92\u52A8\u753B"})}
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
    `},_renderMacroList(){return Wt.getAvailableVariables().map(t=>`
        <div class="yyt-list-row">
          <code>${t.name}</code>
          <span>${t.description}</span>
        </div>
      `).join("")},bindEvents(t){let e=te();if(!e||!we(t))return;let r=this;t.off(".yytSettings"),t.on("click.yytSettings",".yyt-settings-tab",o=>{let n=e(o.currentTarget).data("tab");t.find(".yyt-settings-tab").removeClass("yyt-active"),e(o.currentTarget).addClass("yyt-active"),t.find(".yyt-settings-tab-content").removeClass("yyt-active"),t.find(`.yyt-settings-tab-content[data-tab="${n}"]`).addClass("yyt-active")}),t.on("click.yytSettings","#yyt-settings-save",()=>{r._saveSettings(t)}),t.on("click.yytSettings","#yyt-settings-reset",async()=>{await br("\u91CD\u7F6E\u8BBE\u7F6E","\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u8BBE\u7F6E\u4E3A\u9ED8\u8BA4\u503C\u5417\uFF1F",{danger:!0})&&(jt.resetSettings(),Nc(wn.ui,Cn()),r.renderTo(t),Pc.info("\u8BBE\u7F6E\u5DF2\u91CD\u7F6E",null,{toast:"success"}))}),zt(t,{namespace:"yytSettingsSelect",selectors:["#yyt-setting-queueStrategy","#yyt-setting-theme"]});let s=jt.getDebugSettings();E.setLevel(s.enableDebugLog?fe.DEBUG:fe.INFO)},_saveSettings(t){let e=te(),r=[{id:"yyt-setting-maxConcurrent",min:1,max:10,label:"\u6700\u5927\u5E76\u53D1\u6570"},{id:"yyt-setting-maxRetries",min:0,max:10,label:"\u6700\u5927\u91CD\u8BD5\u6B21\u6570"},{id:"yyt-setting-retryDelayMs",min:1e3,max:6e4,label:"\u91CD\u8BD5\u95F4\u9694"},{id:"yyt-setting-requestTimeoutMs",min:1e4,max:3e5,label:"\u8BF7\u6C42\u8D85\u65F6\u65F6\u95F4"},{id:"yyt-setting-automationSettleMs",min:0,max:1e4,label:"\u7B49\u5F85\u7A33\u5B9A\u65F6\u95F4"},{id:"yyt-setting-automationCooldownMs",min:0,max:6e4,label:"\u81EA\u52A8\u5316\u51B7\u5374\u65F6\u95F4"}];for(let o of r){let n=t.find(`#${o.id}`),a=n.val(),i=parseInt(a,10);if(isNaN(i)||i<o.min||i>o.max){Pc.warn(`${o.label} \u987B\u5728 ${o.min} ~ ${o.max} \u4E4B\u95F4`,null,{toast:!0}),n.trigger("focus").trigger("select");return}}let s={executor:{maxConcurrent:parseInt(t.find("#yyt-setting-maxConcurrent").val(),10)||3,maxRetries:parseInt(t.find("#yyt-setting-maxRetries").val(),10)||2,retryDelayMs:parseInt(t.find("#yyt-setting-retryDelayMs").val(),10)||5e3,requestTimeoutMs:parseInt(t.find("#yyt-setting-requestTimeoutMs").val(),10)||9e4,queueStrategy:t.find("#yyt-setting-queueStrategy").val()||"fifo"},automation:{settleMs:parseInt(t.find("#yyt-setting-automationSettleMs").val(),10)||1200,cooldownMs:parseInt(t.find("#yyt-setting-automationCooldownMs").val(),10)||5e3,maxConcurrentSlots:jt.getSettings()?.automation?.maxConcurrentSlots||1},debug:{enableDebugLog:t.find("#yyt-setting-enableDebugLog").is(":checked"),saveExecutionHistory:t.find("#yyt-setting-saveExecutionHistory").is(":checked"),showRuntimeBadge:t.find("#yyt-setting-showRuntimeBadge").is(":checked")},ui:{theme:t.find("#yyt-setting-theme").val()||"dark-blue",compactMode:t.find("#yyt-setting-compactMode").is(":checked"),animationEnabled:t.find("#yyt-setting-animationEnabled").is(":checked")}};jt.saveSettings(s),E.setLevel(s.debug.enableDebugLog?fe.DEBUG:fe.INFO),Nc(s.ui,Cn()),Pc.info("\u8BBE\u7F6E\u5DF2\u4FDD\u5B58",null,{toast:"success"})},_getAutomationRuntime(){try{return rg()?.YouYouToolkit?.getAutomationRuntime?.()||null}catch{return null}},destroy(t){!te()||!we(t)||(gt(t,"yytSettingsSelect"),t.off(".yytSettings"))},getStyles(){return`
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
    `},renderTo(t){t.html(this.render({})),this.bindEvents(t,{})}},xT=ng});function wT(t={},e=-1){return[t?.sourceId,t?.messageId,t?.message_id,t?.id,t?.mid,t?.mesid,t?.mes_id,t?.chat_index,t?.index,e].map(r=>_e(r))}function vT(t=[],e=""){let r=_e(e);if(!r||!Array.isArray(t))return-1;for(let s=t.length-1;s>=0;s-=1){let o=t[s];if(wT(o,s).includes(r))return s}return-1}function kn(t={},e={}){let r=_e(t?.sourceMessageId||t?.confirmedAssistantMessageId||t?.messageId);if(!r)return null;let s=Ol({resolvedAt:Date.now(),runSource:e.runSource||t?.runSource||st.MANUAL,traceId:t?.traceId||"",chatId:t?.chatId||"",sourceMessageId:r,sourceSwipeId:t?.sourceSwipeId||t?.effectiveSwipeId||"",effectiveSwipeId:t?.effectiveSwipeId||t?.sourceSwipeId||"swipe:current",slotBindingKey:t?.slotBindingKey||"",slotRevisionKey:t?.slotRevisionKey||"",slotTransactionId:t?.slotTransactionId||"",assistantContentFingerprint:t?.assistantContentFingerprint||"",assistantBaseFingerprint:t?.assistantBaseFingerprint||"",assistantText:t?.lastAiMessage||"",assistantBaseText:t?.assistantBaseText||"",targetMessageIndex:vT(t?.chatMessages||t?.chatHistory||[],r)});return!s.slotBindingKey||!s.slotRevisionKey?null:s}async function Oc({runSource:t=st.MANUAL}={}){let e=await bs({runSource:t});return kn(e,{runSource:t})}async function TT({messageId:t,swipeId:e="",runSource:r=st.AUTO}={}){let s=await xs({messageId:t,swipeId:e,runSource:r});return kn(s,{runSource:r})}async function ag(t=null,e={}){let r=t||null;if(typeof e.resolveTarget=="function")return await e.resolveTarget(r);let s=_e(e.runSource||r?.runSource)||st.MANUAL,o=_e(e.messageId||r?.sourceMessageId),n=_e(e.swipeId||r?.sourceSwipeId||r?.effectiveSwipeId);return e.useMessageTarget===!0||s===st.AUTO?o?TT({messageId:o,swipeId:n,runSource:s}):null:Oc({runSource:s})}function ig(t,e){let r=t||null,s=e||null;return!r||!s?{valid:!1,reason:"missing_target_snapshot"}:_e(r.sourceMessageId)!==_e(s.sourceMessageId)?{valid:!1,reason:"source_message_changed"}:_e(r.sourceSwipeId||r.effectiveSwipeId)!==_e(s.sourceSwipeId||s.effectiveSwipeId)?{valid:!1,reason:"source_swipe_changed"}:_e(r.slotRevisionKey)!==_e(s.slotRevisionKey)?{valid:!1,reason:"slot_revision_changed"}:{valid:!0,reason:"ok"}}var ai=D(()=>{ws();He()});function Cr(t,e=""){return t==null?e:String(t).trim()||e}function ST(t){if(!t||t?.is_user===!0||t?.is_system===!0)return!1;let e=String(t?.role||"").trim().toLowerCase();return e==="assistant"||e==="ai"||!e}function _T(t){return!t||typeof t!="object"||Array.isArray(t)?!1:!!(Array.isArray(t.tables)||typeof t.chatId=="string"&&t.chatId.length>0||typeof t.slotBindingKey=="string"&&t.slotBindingKey.length>0)}function lg(t,e){if(!t)return null;let r=t[Cs];if(!r)return null;let s=Ae(e);return _T(r)?s===St?r:null:r[s]||null}function In({loadMode:t=ks.EMPTY,mergeBaseOnly:e=!1,state:r=null,sourceKind:s=Mt.EMPTY,resolvedFromMessageId:o="",resolvedFromRevisionKey:n=""}={}){let a=Tr(r)||null;return{loadMode:t,mergeBaseOnly:e,state:a,sourceKind:s,resolvedFromMessageId:Cr(o,a?.sourceMessageId||""),resolvedFromRevisionKey:Cr(n,a?.slotRevisionKey||"")}}function $c(t,e={}){let r=Tr(t);return r?Tr({...r,meta:{...r.meta||{},...e||{}}}):null}function cg({runtime:t,targetSnapshot:e,currentMessageIndex:r=-1,templateTables:s=[],isolationKey:o}={}){let n=Array.isArray(t?.chat)?t.chat:[],a=Cr(e?.slotRevisionKey,""),i=Cr(e?.slotBindingKey,""),l=Ae(o===void 0?"":o);if(r>=0&&r<n.length){let d=lg(n[r],l),c=Tr(d);if(c&&Cr(c.slotRevisionKey,"")===a)return In({loadMode:ks.EXACT,mergeBaseOnly:!1,state:$c(c,{sourceKind:Mt.EXACT,isolationKey:l,resolvedFromMessageId:c.sourceMessageId,resolvedFromRevisionKey:c.slotRevisionKey}),sourceKind:Mt.EXACT,resolvedFromMessageId:c.sourceMessageId,resolvedFromRevisionKey:c.slotRevisionKey});if(c&&Cr(c.slotBindingKey,"")===i){let u=$c({...c,slotRevisionKey:a||c.slotRevisionKey,sourceSwipeId:Cr(e?.sourceSwipeId||e?.effectiveSwipeId,c.sourceSwipeId),meta:{...c.meta||{},sourceKind:Mt.BINDING,mergeBaseOnly:!0,fallbackFromBinding:!0,isolationKey:l,fallbackFromRevisionKey:Cr(c.slotRevisionKey,""),requestedRevisionKey:a,resolvedFromMessageId:c.sourceMessageId,resolvedFromRevisionKey:c.slotRevisionKey}});return In({loadMode:ks.BINDING_FALLBACK,mergeBaseOnly:!0,state:u,sourceKind:Mt.BINDING,resolvedFromMessageId:c.sourceMessageId,resolvedFromRevisionKey:c.slotRevisionKey})}}if(r>0)for(let d=r-1;d>=0;d-=1){let c=n[d];if(!ST(c))continue;let u=lg(c,l),p=Tr(u);if(!p||!Array.isArray(p.tables)||p.tables.length===0)continue;let y=$c({...p,slotBindingKey:i||p.slotBindingKey,slotRevisionKey:a||p.slotRevisionKey,sourceSwipeId:Cr(e?.sourceSwipeId||e?.effectiveSwipeId,p.sourceSwipeId),meta:{...p.meta||{},sourceKind:Mt.HISTORY,mergeBaseOnly:!0,reconstructedFromHistory:!0,isolationKey:l,resolvedFromMessageId:p.sourceMessageId,resolvedFromRevisionKey:p.slotRevisionKey}});return In({loadMode:ks.HISTORY,mergeBaseOnly:!0,state:y,sourceKind:Mt.HISTORY,resolvedFromMessageId:p.sourceMessageId,resolvedFromRevisionKey:p.slotRevisionKey})}return Array.isArray(s)&&s.length>0?In({loadMode:ks.TEMPLATE,mergeBaseOnly:!1,state:cn(e,{tables:ce(s),meta:{fromTemplate:!0,isolationKey:l,sourceKind:Mt.TEMPLATE,resolvedFromMessageId:"",resolvedFromRevisionKey:""}}),sourceKind:Mt.TEMPLATE}):In({loadMode:ks.EMPTY,mergeBaseOnly:!1,state:cn(e,{meta:{isolationKey:l,sourceKind:Mt.EMPTY,resolvedFromMessageId:"",resolvedFromRevisionKey:""}}),sourceKind:Mt.EMPTY})}var dg=D(()=>{He()});function ug(){return Bc||(Bc=E.createScope("TableStateMirror")),Bc}async function ET(t,e,r){try{await Ye(),await $a({chatId:t?.chatId,messageId:t?.sourceMessageId,swipeId:t?.sourceSwipeId||t?.effectiveSwipeId,isolationKey:e},Array.isArray(r)?r:[]),ug().info("slot \u5DF2\u955C\u50CF\u5230 SQL",{chatId:t?.chatId,messageId:t?.sourceMessageId,tableCount:r?.length||0})}catch(s){ug().warn("SQL \u955C\u50CF\u5931\u8D25\uFF08\u4E0D\u5F71\u54CD\u4E3B\u6D41\u7A0B\uFF09",{error:s?.message||String(s)})}}function pg(t){return t==null?"":String(t).trim()}function AT(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window}function Kc(){try{let t=AT(),e=t?.SillyTavern||null,r=e?.getContext?.()||null,s=Array.isArray(r?.chat)?r.chat:[],o=Array.isArray(e?.chat)?e.chat:[],n=s.length?s:o;return{topWindow:t,api:e,context:r,chat:n,contextChat:s,apiChat:o}}catch{return{topWindow:null,api:null,context:null,chat:[],contextChat:[],apiChat:[]}}}function CT(t){if(!t||t?.is_user===!0||t?.is_system===!0)return!1;let e=String(t?.role||"").trim().toLowerCase();return e==="assistant"||e==="ai"||!e}function kT(t=[],e=""){let r=pg(e);if(!Array.isArray(t)||!r)return-1;for(let s=t.length-1;s>=0;s-=1){let o=t[s];if(!CT(o))continue;if([o?.sourceId,o?.message_id,o?.messageId,o?.id,o?.mes_id,o?.mid,o?.mesid,o?.chat_index,o?.index,s].map(a=>pg(a)).includes(r))return s}return-1}function Uc(t){let e=Kc(),r=kT(e.chat,t?.sourceMessageId);return r<0?{runtime:e,messageIndex:r,message:null}:{runtime:e,messageIndex:r,message:e.chat[r]||null}}function ci(t,e,r){let s=o=>{!Array.isArray(o)||e<0||e>=o.length||(o[e]={...o[e]||{},...r})};s(t?.contextChat),s(t?.apiChat)}async function di(t){let e=t?.context||null,r=t?.api||null,s=e?.saveChatDebounced||r?.saveChatDebounced||null,o=e?.saveChat||r?.saveChat||null;typeof s=="function"&&s.call(e||r),typeof o=="function"&&await o.call(e||r)}function ui(t){return!t||typeof t!="object"||Array.isArray(t)?!1:!!(Array.isArray(t.tables)||typeof t.chatId=="string"&&t.chatId.length>0||typeof t.slotBindingKey=="string"&&t.slotBindingKey.length>0)}function Bs(t){return!t||typeof t!="object"||Array.isArray(t)?!1:"lastResolvedTarget"in t||"lastCommittedTarget"in t}function ii(t,e,r,s){if(!t)return null;let o=t[e];if(!o)return null;let n=Ae(r);return typeof s=="function"&&s(o)?n===St?o:null:o[n]||null}function zc(t,e,r,s,o){if(!t)return;let n=Ae(r),a=t[e];if(typeof o=="function"&&o(a)){let i={[St]:a};i[n]=s,t[e]=i}else a&&typeof a=="object"&&!Array.isArray(a)?t[e]={...a,[n]:s}:t[e]={[n]:s}}function li(t,e,r,s){if(!t)return!1;let o=Ae(r),n=t[e];if(!n)return!1;if(typeof s=="function"&&s(n))return o===St?(delete t[e],!0):!1;if(n&&typeof n=="object"&&!Array.isArray(n)){if(n[o]===void 0)return!1;let a={...n};return delete a[o],Object.keys(a).length===0?delete t[e]:t[e]=a,!0}return!1}function yg(t,e={}){let{runtime:r,messageIndex:s}=Uc(t);return cg({runtime:r,targetSnapshot:t,currentMessageIndex:s,templateTables:Array.isArray(e.templateTables)?e.templateTables:[],isolationKey:e.isolationKey===void 0?de.getKey():e.isolationKey})}async function fg(t,e={}){let{runtime:r,messageIndex:s,message:o}=Uc(t);if(!o||s<0)return{success:!1,error:"target_message_not_found"};let n=e.isolationKey===void 0?de.getKey():e.isolationKey,a=ii(o,jr,n,Bs),i={..._a(a),lastResolvedTarget:lo(t),updatedAt:Date.now()};return zc(o,jr,n,i,Bs),ci(r,s,o),await di(r),{success:!0,bindings:i}}async function pi(t,e,r={}){let s=r.skipFreshValidation===!0?t:await ag(t,r),o=r.skipFreshValidation===!0?{valid:!0,reason:"skipped"}:ig(t,s);if(!o.valid)return{success:!1,error:"target_changed_before_commit",validation:o};let n=s||t,{runtime:a,messageIndex:i,message:l}=Uc(n);if(!l||i<0)return{success:!1,error:"target_message_not_found",validation:o};let d=r.isolationKey===void 0?de.getKey():r.isolationKey,c=cn(n),u={...c.meta||{},...e.meta||{},...r.locks?{locks:r.locks}:{},...r.previousSnapshot?{previousSnapshot:r.previousSnapshot}:{},isolationKey:d},p=Tr({...c,...e,meta:u,slotBindingKey:n.slotBindingKey,slotRevisionKey:n.slotRevisionKey,sourceMessageId:n.sourceMessageId,sourceSwipeId:n.sourceSwipeId||n.effectiveSwipeId,updatedAt:Date.now()}),y=ii(l,jr,d,Bs),m={..._a(y),lastResolvedTarget:lo(n),lastCommittedTarget:lo(n),updatedAt:Date.now()};return zc(l,Cs,d,p,ui),zc(l,jr,d,m,Bs),ci(a,i,l),await di(a),ET(n,d,p?.tables||[]).catch(()=>{}),{success:!0,state:p,bindings:m,validation:o,messageIndex:i,sourceMessageId:n.sourceMessageId,slotRevisionKey:n.slotRevisionKey}}function zs(t=null,e={}){let r=Dt.getAssistantMessageSnapshot(t);if(!r?.message)return null;let s=e.isolationKey===void 0?de.getKey():e.isolationKey;return{...r,tableState:Tr(ii(r.message,Cs,s,ui)),tableBindings:_a(ii(r.message,jr,s,Bs))}}async function gg(t,e={}){let r=Kc();if(!Array.isArray(r.chat)||t<0||t>=r.chat.length)return{success:!1,error:"invalid_message_index",messageIndex:t};let s=r.chat[t];if(!s)return{success:!1,error:"message_not_found",messageIndex:t};let o=e.isolationKey===void 0?de.getKey():e.isolationKey,n=li(s,Cs,o,ui),a=e.clearBindings===!1?!1:li(s,jr,o,Bs);return(n||a)&&(ci(r,t,s),await di(r)),{success:!0,cleared:n||a,messageIndex:t,isolationKey:o}}async function mg(t={}){let e=Kc(),r=Number.isFinite(t.fromMessageIndex)?t.fromMessageIndex:0,s=Number.isFinite(t.toMessageIndex)?t.toMessageIndex:(e.chat?.length||0)-1,o=t.isolationKey===void 0?de.getKey():t.isolationKey,n=0;for(let a=r;a<=s;a++){let i=e.chat[a];if(!i)continue;let l=li(i,Cs,o,ui),d=li(i,jr,o,Bs);(l||d)&&(ci(e,a,i),n++)}return n>0&&await di(e),{success:!0,touched:n,from:r,to:s,isolationKey:o}}var Bc,Rn=D(()=>{Ds();He();qr();dg();ai();Ba();H()});function bg(t){let e=new Set;if(!Array.isArray(t))return e;for(let r of t){let s=r?.order;Number.isFinite(s)&&e.add(Math.floor(s))}return e}function Fc(t,e=5e4,r=1,s=99999){for(let o=e;o<=s;o++)if(!t.has(o))return t.add(o),o;for(let o=r;o<e;o++)if(!t.has(o))return t.add(o),o;return hg.warn("\u65E0\u53EF\u7528 order \u69FD\u4F4D"),t.add(e),e}function xg(t,e,r=5e4,s=1,o=99999){let n=o-e+1;for(let a=r;a<=n;a++){let i=!0;for(let l=0;l<e;l++)if(t.has(a+l)){i=!1;break}if(i){for(let l=0;l<e;l++)t.add(a+l);return a}}for(let a=s;a<r&&a<=n;a++){let i=!0;for(let l=0;l<e;l++)if(t.has(a+l)){i=!1;break}if(i){for(let l=0;l<e;l++)t.add(a+l);return a}}hg.warn(`\u65E0\u6CD5\u5206\u914D ${e} \u4E2A\u8FDE\u7EED order \u69FD\u4F4D`);for(let a=0;a<e;a++)t.add(r+a);return r}var hg,wg=D(()=>{H();hg=E.createScope("TableWBOrder")});function jc(t,e="before_character_definition"){let r=String(t||"").trim().toLowerCase();return r==="at_depth_as_system"||r==="system"?"at_depth_as_system":r==="before_char"||r==="before_character"||r==="before_character_definition"||r==="0"?"before_character_definition":r==="after_char"||r==="after_character"||r==="after_character_definition"||r==="1"?"after_character_definition":e}function Mn(t,e){if(!e)return t;let r={...t,position:e.position};return e.position==="at_depth_as_system"?r.depth=e.depth:delete r.depth,r}var ek,tk,vg=D(()=>{ek=Object.freeze(["at_depth_as_system","before_character_definition","after_character_definition"]);tk=Object.freeze({position:"before_character_definition",depth:2,order:5e4})});function Wc(t,e=""){return t==null?e:String(t).trim()||e}function MT(t){return Wc(t,"default_chat").replace(/[\[\]=]/g,"_")}function PT(){let t=globalThis.window||globalThis;return Wc(t?.TavernHelper?.getCurrentChatId?.()||t?.Silvy?.getCurrentChatId?.()||t?.chat_metadata?.chat_id||t?.this_chid||t?.name1,"default_chat")}function NT(){try{if(typeof TavernHelper<"u"&&TavernHelper)return TavernHelper}catch{}return $r()?.TavernHelper||null}function DT(t){return String(t??"").replace(/\|/g,"\uFF5C").replace(/\n/g," ")}function Tg(t){let e=Array.isArray(t.columns)?t.columns:[],r=Array.isArray(t.rows)?t.rows:[];if(r.length===0)return"";let s=e.map(l=>l.key),o=e.map(l=>l.title||l.key),n=`| ${o.join(" | ")} |`,a=`| ${o.map(()=>"---").join(" | ")} |`,i=r.map(l=>{let d=l.cells||{};return`| ${s.map(c=>DT(d[c])).join(" | ")} |`});return`# ${t.name||"\u672A\u547D\u540D\u8868"}

${n}
${a}
${i.join(`
`)}`}function LT(t,e){if(!Array.isArray(t)||t.length===0)return[];let r=new Map;if(Array.isArray(e))for(let s of e){let o=s?.id||s?.key;o&&r.set(o,s)}return t.map(s=>{let o=s?.id?r.get(s.id):null;return{...s,exportConfig:s?.exportConfig||o?.exportConfig||{enabled:!1},enabled:s?.enabled!==!1}})}function yi(t){return`${_g}${IT}${MT(t)}${RT}-`}function OT(t){return`${_g}[${Wc(t,"default_chat")}]-`}function Eg(t,e){if(!t||typeof t!="string")return!1;let r=yi(e);if(t.startsWith(r))return!0;let s=OT(e);return!!t.startsWith(s)}function $T(t,e){let r=yi(t),s=String(e||"").trim();return s?`${r}${s}`:`${r}\u586B\u8868\u6570\u636E`}function Sg(t,e,r){return`${yi(t)}Wrapper-${r}`}function BT(t,e){return t?t.content!==e.content||t.enabled!==e.enabled||t.type!==e.type||t.position!==e.position||t.prevent_recursion!==e.prevent_recursion||t.order!==e.order:!0}async function Pn(t,e,r,s,o,n,a){let i=r.find(l=>l.comment===s);return i&&a&&!Eg(i.comment,a)?(Mo.warn(`upsert \u8DF3\u8FC7\uFF1A\u73B0\u6709\u6761\u76EE comment "${s}" \u4E0D\u5C5E\u4E8E\u5F53\u524D chat`,{chatId:a}),{action:"skipped",comment:s,reason:"cross_chat_collision"}):i&&i.uid?BT(i,o)?(await Promise.resolve(t.setLorebookEntries(e,[{uid:i.uid,...o}])),Mo.info(`\u4E16\u754C\u4E66\u6761\u76EE\u5DF2\u66F4\u65B0\uFF1A${s}`),{action:"updated",comment:s}):(n.add(i.order||0),{action:"skipped",comment:s}):typeof t.createLorebookEntries=="function"?(await Promise.resolve(t.createLorebookEntries(e,[{comment:s,keys:[],...o}])),Mo.info(`\u4E16\u754C\u4E66\u6761\u76EE\u5DF2\u521B\u5EFA\uFF1A${s}`),{action:"created",comment:s}):{action:"failed",comment:s,error:"createLorebookEntries \u4E0D\u53EF\u7528"}}async function Ag(t,e){let r=e?.worldbookSync;if(!r?.enabled)return{skipped:!0,reason:"disabled"};let s=String(r.targetBook||"").trim();if(!s)return{skipped:!0,reason:"no_target_book"};let o=NT();if(!o)return{success:!1,error:"TavernHelper \u4E0D\u53EF\u7528"};if(typeof o.getLorebookEntries!="function")return{success:!1,error:"getLorebookEntries \u4E0D\u53EF\u7528"};if(typeof o.setLorebookEntries!="function"&&typeof o.createLorebookEntries!="function")return{success:!1,error:"\u4E16\u754C\u4E66\u5199\u5165 API \u4E0D\u53EF\u7528"};let n=PT(),a=yi(n),i=Array.isArray(e?.tables)?e.tables:[],d=LT(t,i).filter(p=>p&&p.enabled!==!1&&Array.isArray(p.rows)&&p.rows.length>0);if(d.length===0)return{skipped:!0,reason:"empty_tables"};let c=e?.wrapperConfig||{},u=c.enabled!==!1;try{let p=await Promise.resolve(o.getLorebookEntries(s));Array.isArray(p)||(p=[]);let y=bg(p),m=[],g=d.filter(w=>w.exportConfig?.enabled===!0),h=d.filter(w=>w.exportConfig?.enabled!==!0),x="";if(h.length>0&&(x=h.map(w=>Tg(w)).join(`

`)),u&&(x||g.length>0)){let w=c.wrapperTag||"\u6700\u65B0\u6570\u636E\u4E0E\u8BB0\u5F55",P=c.wrapperHint||"",B=c.wrapperPlacement||{},z=B.order||5e4,R=xg(y,3,z,1,99999),_=jc(B.position,"before_character_definition"),M=Number.isFinite(B.depth)?B.depth:2,j=`<${w}>
${P}`;m.push(await Pn(o,s,p,Sg(n,w,"Start"),Mn({content:j,enabled:!0,type:"constant",order:R,prevent_recursion:!0},{position:_,depth:M}),y,n)),x&&m.push(await Pn(o,s,p,`${a}\u5168\u5C40\u6570\u636E`,Mn({content:x,enabled:!0,type:"constant",order:R+1,prevent_recursion:!0},{position:_,depth:M}),y,n)),m.push(await Pn(o,s,p,Sg(n,w,"End"),Mn({content:`</${w}>`,enabled:!0,type:"constant",order:R+2,prevent_recursion:!0},{position:_,depth:M}),y,n))}else if(x){let w=Fc(y,5e4,1,99999);m.push(await Pn(o,s,p,`${a}\u5168\u5C40\u6570\u636E`,{content:x,enabled:!0,type:"constant",position:"before_character_definition",order:w,prevent_recursion:!0},y,n))}for(let w of g){let P=w.exportConfig||{},B=P.entryName||w.name||"\u672A\u547D\u540D\u8868",z=$T(n,B),R=Tg(w);if(!R)continue;let _=P.entryPlacement||{},M=jc(_.position,"before_character_definition"),j=Fc(y,_.order||5e4,1,99999),q=P.entryType==="keyword"?"keyword":"constant";m.push(await Pn(o,s,p,z,Mn({content:R,enabled:!0,type:q,order:j,prevent_recursion:P.preventRecursion!==!1},{position:M,depth:_.depth||2}),y,n))}let S=new Set(m.map(w=>w.comment).filter(Boolean)),T=p.filter(w=>!w.comment||!Eg(w.comment,n)?!1:!S.has(w.comment));if(T.length>0){let w=T.map(P=>P.uid).filter(Boolean);w.length>0&&typeof o.deleteLorebookEntries=="function"&&(await Promise.resolve(o.deleteLorebookEntries(s,w)),Mo.info(`\u5DF2\u6E05\u7406 ${w.length} \u4E2A\u65E7\u4E16\u754C\u4E66\u6761\u76EE [${n}]`))}let A=m.filter(w=>w.action==="created").length,C=m.filter(w=>w.action==="updated").length;return Mo.info(`\u4E16\u754C\u4E66\u540C\u6B65\u5B8C\u6210 [${n}]\uFF1A${A} \u521B\u5EFA, ${C} \u66F4\u65B0, ${T.length} \u6E05\u7406`),{success:!0,results:m,stats:{created:A,updated:C,cleaned:T.length},targetBook:s,chatId:n}}catch(p){return Mo.warn("\u4E16\u754C\u4E66\u540C\u6B65\u5931\u8D25:",p),{success:!1,error:p?.message||"\u4E16\u754C\u4E66\u540C\u6B65\u5931\u8D25"}}}var Mo,_g,IT,RT,Cg=D(()=>{ws();H();wg();vg();Mo=E.createScope("TableWorldbookSync"),_g="YYT-",IT="[YY:chatId=",RT="]"});function fi(t,e=""){return t==null?e:String(t).trim()||e}function KT(t={}){return{tables:Array.isArray(t?.tables)?ce(t.tables):[]}}function UT(t={},e={}){let r=fi(e.mirrorTag,"yyt-table-workbench"),s=KT(t);return[`<${r}>`,"[\u586B\u8868\u5DE5\u4F5C\u53F0]","```json",JSON.stringify(s,null,2),"```",`</${r}>`].join(`
`)}async function kg({targetSnapshot:t,nextTables:e,config:r,loadResult:s=null,diff:o=null,fillMode:n="",skipNotify:a=!1}={}){let i=Ft(r),l=await pi(t,{tables:Array.isArray(e)?ce(e):[],meta:{lastLoadMode:fi(s?.loadMode,""),lastFillMode:fi(n),mergeBaseOnly:!1,updatedBy:fi(t?.runSource,"MANUAL_TABLE")}});if(!l?.success)return{success:!1,error:l?.error||"table_state_commit_failed",commitResult:l,mirrorResult:null,warning:""};let d=null,c=null,u="";if(i.mirrorToMessage){let p=UT(l.state,{mirrorTag:i.mirrorTag});d=await Dt.injectDetailed(zT,p,{overwrite:!0,extractionSelectors:[i.mirrorTag],sourceMessageId:l.sourceMessageId,sourceSwipeId:t?.sourceSwipeId||t?.effectiveSwipeId,effectiveSwipeId:t?.effectiveSwipeId||t?.sourceSwipeId,slotBindingKey:t?.slotBindingKey,slotRevisionKey:t?.slotRevisionKey,slotTransactionId:t?.slotTransactionId,traceId:t?.traceId,skipNotify:a}),d?.success||(u=d?.error||"\u6B63\u6587\u955C\u50CF\u5199\u56DE\u5931\u8D25")}return i.worldbookSync?.enabled&&(c=await Ag(Array.isArray(e)?e:[],i),c&&!c.success&&!c.skipped&&(u=u?`${u}; ${c.error}`:c.error||"\u4E16\u754C\u4E66\u540C\u6B65\u5931\u8D25")),{success:!0,state:l.state,bindings:l.bindings,diff:o,fillMode:n,commitResult:l,mirrorResult:d,worldbookSyncResult:c,warning:u}}var zT,Ig=D(()=>{Ds();He();Rn();dr();Cg();zT="tableWorkbenchMirror"});function FT(t){return typeof t!="string"||!t?t:t.replace(/[“”「」『』＂]/g,'"')}function Hc(t,e){for(let r=e;r<t.length;r++)if(!/\s/.test(t[r]))return{char:t[r],index:r};return{char:"",index:-1}}function Pg(t){return!!t&&(t==='"'||t==="{"||t==="["||t==="-"||/\d/.test(t)||t==="t"||t==="f"||t==="n")}function jT(t,e,r,s){let o=Hc(t,e+1),n=o.char;if(!n)return r!=="key";if(r==="key")return n===":";if(n==="}"||n==="]")return!0;if(n!==",")return!1;let a=Hc(t,o.index+1).char;return a?s==="object"?a==='"'||a==="}":s==="array"?a==="]"||Pg(a):Pg(a)||a==="}"||a==="]":!0}function WT(t){if(typeof t!="string")return{success:!1,result:t,error:"not a string"};let e="",r=!1,s=!1,o=null,n=[],a=()=>n.length?n[n.length-1]:null,i=()=>{let l=a();l&&(l.expecting="commaOrEnd")};for(let l=0;l<t.length;l++){let d=t[l];if(s){e+=d,s=!1;continue}if(r){if(d==="\\"){e+=d,s=!0;continue}if(d==='"'){let c=a();jT(t,l,o,c?.type||null)?(e+=d,r=!1,o==="key"&&c?.type==="object"?c.expecting="colon":i(),o=null):e+='\\"';continue}e+=d;continue}if(d==='"'){e+=d,r=!0;let c=a();o=c&&c.type==="object"&&(c.expecting==="key"||c.expecting==="keyOrEnd")?"key":"value";continue}if(d==="{"){e+=d,n.push({type:"object",expecting:"keyOrEnd"});continue}if(d==="["){e+=d,n.push({type:"array",expecting:"valueOrEnd"});continue}if(d===":"){e+=d;let c=a();c?.type==="object"&&(c.expecting="value");continue}if(d===","){e+=d;let c=a();c?.type==="object"&&(c.expecting="key"),c?.type==="array"&&(c.expecting="value");continue}if(d==="}"||d==="]"){e+=d,n.pop(),i();continue}e+=d}return{success:!0,result:e,error:null}}function HT(t){if(typeof t!="string"||!t)return t;let e="",r=!1,s=!1;for(let o=0;o<t.length;o++){let n=t[o];if(s){e+=n,s=!1;continue}if(n==="\\"){e+=n,r&&(s=!0);continue}if(n==='"'){e+=n,r=!r;continue}if(r){if(n===`
`){e+="\\n";continue}if(n==="\r"){e+="\\r";continue}if(n==="	"){e+="\\t";continue}if(n==="\0"){e+="\\u0000";continue}}e+=n}return e}function GT(t){if(typeof t!="string"||!t)return t;let e="",r=!1,s=!1;for(let o=0;o<t.length;o++){let n=t[o];if(s){e+=n,s=!1;continue}if(n==="\\"){e+=n,r&&(s=!0);continue}if(n==='"'){e+=n,r=!r;continue}if(!r&&n===","){let a=Hc(t,o+1).char;if(a==="}"||a==="]")continue}e+=n}return e}function qT(t){return typeof t!="string"||!t?t:t.replace(/([{,]\s*)(-?\d+)(\s*:)/g,'$1"$2"$3')}function Nn(t){if(typeof t!="string")return{success:!1,result:t,layersApplied:[],error:"Input is not a string"};let e=[],r=t,s=FT(r);s!==r&&e.push("normalizeQuotes"),r=s;let o=WT(r);if(!o.success)return{success:!1,result:r,layersApplied:e,error:o.error};o.result!==r&&e.push("escapeUnescapedQuotes"),r=o.result;let n=HT(r);n!==r&&e.push("sanitizeControlChars"),r=n;let a=GT(r);a!==r&&e.push("removeTrailingCommas"),r=a;let i=qT(r);return i!==r&&e.push("fixNumericKeys"),r=i,{success:!0,result:r,layersApplied:e,error:null}}function YT(t,e=","){if(typeof t!="string"||!t)return[];let r=[],s="",o=!1,n=!1,a=0,i=0,l=0;for(let d=0;d<t.length;d++){let c=t[d];if(n){s+=c,n=!1;continue}if(c==="\\"){s+=c,o&&(n=!0);continue}if(c==='"'){s+=c,o=!o;continue}if(!o){if(c==="{")a++;else if(c==="}")a=Math.max(0,a-1);else if(c==="[")i++;else if(c==="]")i=Math.max(0,i-1);else if(c==="(")l++;else if(c===")")l=Math.max(0,l-1);else if(c===e&&a===0&&i===0&&l===0){s.trim()&&r.push(s.trim()),s="";continue}}s+=c}return s.trim()&&r.push(s.trim()),r}function VT(t,e=":"){if(typeof t!="string"||!t)return-1;let r=!1,s=!1,o=0,n=0,a=0;for(let i=0;i<t.length;i++){let l=t[i];if(s){s=!1;continue}if(l==="\\"){r&&(s=!0);continue}if(l==='"'){r=!r;continue}if(!r){if(l==="{")o++;else if(l==="}")o=Math.max(0,o-1);else if(l==="[")n++;else if(l==="]")n=Math.max(0,n-1);else if(l==="(")a++;else if(l===")")a=Math.max(0,a-1);else if(l===e&&o===0&&n===0&&a===0)return i}}return-1}function Gc(t){if(typeof t!="string")return{success:!0,value:t,error:null};let e=t.trim();if(!e)return{success:!1,value:null,error:"Empty value"};let s=`[${e.startsWith("'")&&e.endsWith("'")?`"${e.slice(1,-1).replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\r/g,"\\r").replace(/\n/g,"\\n").replace(/\t/g,"\\t")}"`:e}]`;try{return{success:!0,value:JSON.parse(s)[0],error:null}}catch(o){let n=Nn(s);if(n.success)try{return{success:!0,value:JSON.parse(n.result)[0],error:null}}catch{}return{success:!1,value:null,error:o?.message||"Failed to parse loose value"}}}function JT(t){let e=typeof t=="string"?t.trim():"";if(!e)return null;if(/^-?\d+$/.test(e))return e;let r=Gc(e);return r.success&&(typeof r.value=="string"||typeof r.value=="number")?String(r.value):e.replace(/^["']|["']$/g,"")}function Ng(t){if(typeof t!="string")return{success:!1,result:null,recoveredKeys:[],error:"not a string"};let e=t.trim();if(!e.startsWith("{")||!e.endsWith("}"))return{success:!1,result:null,recoveredKeys:[],error:"not an object literal"};let r=e.slice(1,-1).trim();if(!r)return{success:!0,result:{},recoveredKeys:[],error:null};let s=YT(r,",").filter(Boolean);if(!s.length)return{success:!1,result:null,recoveredKeys:[],error:"no segments"};let o={},n=0;for(let i of s){let l=VT(i,":");if(l!==-1){let c=JT(i.slice(0,l)),u=Gc(i.slice(l+1));if(!c||!u.success)return{success:!1,result:null,recoveredKeys:Object.keys(o),error:`Failed segment: ${i}`};o[c]=u.value;let p=parseInt(c,10);!isNaN(p)&&String(p)===c&&(n=Math.max(n,p+1));continue}let d=Gc(i);if(!d.success)return{success:!1,result:null,recoveredKeys:Object.keys(o),error:`Failed value: ${i}`};for(;Object.prototype.hasOwnProperty.call(o,String(n));)n++;o[String(n)]=d.value,n++}let a=Object.keys(o).sort((i,l)=>parseInt(i,10)-parseInt(l,10));return a.length?{success:!0,result:o,recoveredKeys:a,error:null}:{success:!1,result:null,recoveredKeys:[],error:"no keys recovered"}}function XT(t){if(typeof t!="string")return"";let e=t.trim();return e=e.replace(/'\s*\+\s*'/g,""),e.startsWith("'")&&e.endsWith("'")&&(e=e.slice(1,-1)),e=e.replace(/\\n/g,`
`),e=e.replace(/\\\\"/g,'\\"'),e=e.replace(/：/g,":"),e}function QT(t){let e=XT(t);if(!e)return[];let r=[];Rg.lastIndex=0;let s;for(;(s=Rg.exec(e))!==null;){let i=s[1];i&&i.trim()&&r.push(i)}if(r.length)return r;let o=i=>/(insertRow|updateRow|deleteRow)\s*\(/.test(i),n=/<!--([\s\S]*?)-->/g,a=[];for(;(s=n.exec(e))!==null;)o(s[1])&&a.push(s[1]);return a}function ZT(t){let e=t.split(/\r?\n/),r=[],s="",o=!1;for(let a of e){let i=a.trim();if(!i||(!o&&i.includes("//")&&!i.includes('"//')&&!i.includes("'//")&&(i=i.split("//")[0].trim()),!i))continue;if(/^(insertRow|updateRow|deleteRow)\s*\(/.test(i)&&!o?(s&&r.push(s),s=i):s+=(s?" ":"")+i,s){let d=(s.match(/\{/g)||[]).length,c=(s.match(/\}/g)||[]).length;o=d>c}}s&&r.push(s);let n=[];for(let a of r){let i=/(?:^|;\s*)((?:insertRow|deleteRow|updateRow)\s*\()/g,l=[],d;for(;(d=i.exec(a))!==null;)l.push(d.index+(d[0].length-d[1].length));if(l.length<=1)n.push(a.replace(/;\s*$/,""));else for(let c=0;c<l.length;c++){let u=l[c],p=c+1<l.length?l[c+1]:a.length,y=a.substring(u,p).replace(/;\s*$/,"").trim();y&&n.push(y)}}return n}function eS(t){try{let e=t;if(e.match(/\)\s*;?\s*\/\/.*$/)&&(e=e.replace(/\/\/.*$/,"").trim()),!e)return null;let r=e.match(/^(insertRow|deleteRow|updateRow)\s*\((.*)\);?$/);if(!r)return null;let s=r[1],o=r[2],n=o.indexOf("{");if(n===-1)return{command:s,args:JSON.parse(`[${o}]`),line:e};let a=o.substring(0,n).trim(),i=o.substring(n),l=JSON.parse(`[${a.replace(/,$/,"")}]`);try{return{command:s,args:[...l,JSON.parse(i)],line:e}}catch{}let d=Ng(i);if(d.success)return{command:s,args:[...l,d.result],line:e};let c=Nn(i);if(!c.success)return null;try{return{command:s,args:[...l,JSON.parse(c.result)],line:e}}catch{}let u=Ng(c.result);return u.success?{command:s,args:[...l,u.result],line:e}:null}catch{return null}}function tS(t){if(!t)return null;let{command:e,args:r}=t;if(e==="insertRow"){let s=typeof r[0]=="number"?r[0]:0,o=typeof r[1]=="object"&&r[1]!==null?r[1]:{};return{op:e,tableIndex:s,data:o}}if(e==="deleteRow"){let s=typeof r[0]=="number"?r[0]:0,o=typeof r[1]=="number"?r[1]:0;return{op:e,tableIndex:s,rowIndex:o}}if(e==="updateRow"){let s=typeof r[0]=="number"?r[0]:0,o=typeof r[1]=="number"?r[1]:0,n=typeof r[2]=="object"&&r[2]!==null?r[2]:{};return{op:e,tableIndex:s,rowIndex:o,data:n}}return null}function qc(t){let e=QT(t);if(!e.length)return null;let r=[],s=[];for(let o of e){let n=o.replace(/<!--|-->/g,"").trim();if(!n)continue;let a=ZT(n);for(let i of a){let l=eS(i),d=tS(l);d?r.push(d):i&&/^(insertRow|updateRow|deleteRow)/.test(i)&&s.push(i.slice(0,200))}}if(s.length>0)try{console.warn("[TableJsonSanitizer] parseIncrementalEdits: %d \u6761\u6307\u4EE4\u89E3\u6790\u5931\u8D25",s.length,s)}catch{}return r.length?r:null}function Yc(t){Mg.lastIndex=0;let e;for(;(e=Mg.exec(t))!==null;){let m=e[1].trim();if(m)try{return JSON.parse(m)}catch{let h=Nn(m);if(h.success)try{return JSON.parse(h.result)}catch{}}}let r=t.trim();try{return JSON.parse(r)}catch{}let s=Nn(r);if(s.success)try{return JSON.parse(s.result)}catch{}let o=r.indexOf("{"),n=r.indexOf("["),a=-1,i="",l="";if(o!==-1&&(n===-1||o<n)?(a=o,i="{",l="}"):n!==-1&&(a=n,i="[",l="]"),a===-1)return null;let d=0,c=-1,u=!1,p=!1;for(let m=a;m<r.length;m++){let g=r[m];if(p){p=!1;continue}if(g==="\\"&&u){p=!0;continue}if(g==='"'){u=!u;continue}if(!u){if(g===i)d++;else if(g===l&&(d--,d===0)){c=m;break}}}if(c===-1)return null;let y=r.substring(a,c+1);try{return JSON.parse(y)}catch{let g=Nn(y);if(g.success)try{return JSON.parse(g.result)}catch{}}return null}function Dg(t){if(!t||typeof t!="string")return{mode:"empty",edits:null,tables:null};let e=qc(t);if(e)return{mode:"incremental",edits:e,tables:null};let r=Yc(t);if(r){let s=null;if(Array.isArray(r))s=r;else if(r&&Array.isArray(r.tables))s=r.tables;else if(r&&typeof r=="object"){for(let o of Object.values(r))if(Array.isArray(o)){s=o;break}}if(Array.isArray(s))return{mode:"full",edits:null,tables:s}}return{mode:"empty",edits:null,tables:null}}var Rg,Mg,gi=D(()=>{Rg=/<tableEdit>([\s\S]*?)<\/tableEdit>/gi,Mg=/```(?:json)?\s*([\s\S]*?)```/gi});var rS,sS,Lg,Og=D(()=>{gi();rS=/<tableEdit>[\s\S]*?<\/tableEdit>/i,sS=/(insertRow|updateRow|deleteRow)\s*\(/,Lg=Object.freeze({formatId:"dsl",displayName:"<tableEdit> DSL \u589E\u91CF\u534F\u8BAE",detect(t){return!t||typeof t!="string"?!1:rS.test(t)||sS.test(t)},parse(t){let e=qc(t);return!Array.isArray(e)||e.length===0?null:{mode:"incremental",edits:e,tables:null}}})});function Bg(t){if(typeof t!="string")return t;let e=t.trim();return e.startsWith("'")&&e.endsWith("'")||e.startsWith('"')&&e.endsWith('"')?e.slice(1,-1).replace(/''/g,"'").replace(/\\'/g,"'"):e}function Vc(t){let e=String(t||"").match(/(\d+)$/);return e?parseInt(e[1],10):0}function zg(t){let e=String(t||"").match(/row_id\s*=\s*(\d+)/i);return e?parseInt(e[1],10):-1}function oS(t){let e=t.match(/INSERT\s+INTO\s+(\S+)\s*\(([^)]*)\)\s*VALUES\s*\(([^)]*)\)/i);if(!e)return null;let r=e[1],s=e[2],o=e[3],n=s.split(",").map(l=>l.trim()),a=o.split(",").map(l=>Bg(l.trim())),i={};return n.forEach((l,d)=>{l!=="row_id"&&a[d]!==void 0&&(i[l]=a[d])}),{op:"insertRow",tableIndex:Vc(r),data:i}}function nS(t){let e=t.match(/UPDATE\s+(\S+)\s+SET\s+([\s\S]+?)\s+WHERE\s+([\s\S]+?);?$/i);if(!e)return null;let r=e[1],s=e[2],o=e[3],n={},a=s.split(/,(?![^()]*\))/);for(let i of a){let l=i.indexOf("=");if(l<0)continue;let d=i.slice(0,l).trim(),c=Bg(i.slice(l+1).trim());d&&d!=="row_id"&&(n[d]=c)}return{op:"updateRow",tableIndex:Vc(r),rowIndex:zg(o),data:n}}function aS(t){let e=t.match(/DELETE\s+FROM\s+(\S+)\s+WHERE\s+([\s\S]+?);?$/i);return e?{op:"deleteRow",tableIndex:Vc(e[1]),rowIndex:zg(e[2])}:null}function iS(t){let e=[];$g.lastIndex=0;let r;for(;(r=$g.exec(t))!==null;){let s=r[0].trim(),o=null;/^INSERT/i.test(s)?o=oS(s):/^UPDATE/i.test(s)?o=nS(s):/^DELETE/i.test(s)&&(o=aS(s)),o&&e.push(o)}return e}var Dn,$g,Kg,Ug=D(()=>{Dn=/<sql>([\s\S]*?)<\/sql>/gi,$g=/(INSERT\s+INTO\s+\S+[\s\S]*?;)|(UPDATE\s+\S+\s+SET[\s\S]*?;)|(DELETE\s+FROM\s+\S+[\s\S]*?;)/gi;Kg=Object.freeze({formatId:"sql",displayName:"SQL \u534F\u8BAE\uFF08INSERT/UPDATE/DELETE\uFF09",detect(t){return!t||typeof t!="string"?!1:Dn.test(t)?(Dn.lastIndex=0,!0):(Dn.lastIndex=0,/\b(INSERT\s+INTO|UPDATE\s+\S+\s+SET|DELETE\s+FROM)\b/i.test(t))},parse(t){let e="";Dn.lastIndex=0;let r,s=[];for(;(r=Dn.exec(t))!==null;)s.push(r[1]);s.length>0?e=s.join(`
`):e=t;let o=iS(e);return!Array.isArray(o)||o.length===0?null:{mode:"incremental",edits:o,tables:null}}})});var Fg,jg=D(()=>{gi();Fg=Object.freeze({formatId:"full-json",displayName:"JSON envelope \u5168\u91CF\u534F\u8BAE",detect(t){return!t||typeof t!="string"?!1:/```json/i.test(t)||/\{[\s\S]*?"tables"\s*:/i.test(t)},parse(t){let e=Yc(t);if(!e)return null;let r=null;if(Array.isArray(e))r=e;else if(e&&Array.isArray(e.tables))r=e.tables;else if(e&&typeof e=="object"){for(let s of Object.values(e))if(Array.isArray(s)){r=s;break}}return!Array.isArray(r)||r.length===0?null:{mode:"full",edits:null,tables:r}}})});function mi(){return Jc||(Jc=E.createScope("AiProtocolAdapter")),Jc}function Wg(t){if(!t||typeof t!="string")return null;for(let e of lS){let r=!1;try{r=e.detect(t)}catch(s){mi().warn(`adapter ${e.formatId} detect \u629B\u9519`,s);continue}if(r)try{let s=e.parse(t);if(s&&(s.mode==="incremental"||s.mode==="full")&&(s.mode==="incremental"&&Array.isArray(s.edits)&&s.edits.length>0||s.mode==="full"&&Array.isArray(s.tables)&&s.tables.length>0))return mi().info("AI \u534F\u8BAE\u9002\u914D\u5668\u547D\u4E2D",{formatId:e.formatId,mode:s.mode,editsCount:s.edits?.length,tablesCount:s.tables?.length}),{...s,rawFormat:e.formatId}}catch(s){mi().warn(`adapter ${e.formatId} parse \u629B\u9519\uFF0C\u5C1D\u8BD5\u4E0B\u4E00\u4E2A`,s)}}return mi().warn("parseAiResponseAuto: \u65E0\u9002\u914D\u5668\u547D\u4E2D",{responseLength:t.length}),null}var Jc,lS,Hg=D(()=>{H();Og();Ug();jg();lS=Object.freeze([Lg,Kg,Fg])});function cS(t,e){let r=new Map;Array.isArray(t)&&t.forEach((n,a)=>{n&&typeof n=="object"&&r.set(n.name||`__row_${a}`,n)});let s=new Map;Array.isArray(e)&&e.forEach((n,a)=>{n&&typeof n=="object"&&s.set(n.name||`__row_${a}`,n)});let o={};for(let[n,a]of s){let i=r.get(n);if(i){o[n]={};let l=new Set([...Object.keys(i.cells||{}),...Object.keys(a.cells||{})]);for(let d of l){let c=String((i.cells&&i.cells[d])??""),u=String((a.cells&&a.cells[d])??"");o[n][d]=c===u?"unchanged":"updated"}o[n].__rowStatus="kept"}else{if(o[n]={},a.cells&&typeof a.cells=="object")for(let l of Object.keys(a.cells))o[n][l]="new";o[n].__rowStatus="new"}}for(let[n]of r)s.has(n)||(o[n]={__rowStatus:"deleted"});return o}function Gg(t,e){let r=Array.isArray(t)?ce(t):[],s=Array.isArray(e)?ce(e):[],o={},n=Math.max(r.length,s.length);for(let a=0;a<n;a++){let i=r[a],l=s[a];!i&&l?(o[a]={},Array.isArray(l.rows)&&l.rows.forEach(d=>{let c=d.name||`__row_${l.rows.indexOf(d)}`;o[a][c]={__rowStatus:"new"}})):i&&!l?(o[a]={},Array.isArray(i.rows)&&i.rows.forEach(d=>{let c=d.name||`__row_${i.rows.indexOf(d)}`;o[a][c]={__rowStatus:"deleted"}})):i&&l&&(o[a]=cS(i.rows,l.rows))}return o}var qg=D(()=>{He()});function dS(){return{mode:"native",async buildRequest(t={},e={}){if(typeof t.buildRequest!="function")throw new Error("table_provider_missing_build_request");return t.buildRequest(e)},async sendRequest(t={},e=null,r={}){if(typeof t.sendRequest!="function")throw new Error("table_provider_missing_send_request");return t.sendRequest(e?.messages||[],r.config||{},r.abortSignal||null)},parseResponse(t={},e=""){if(typeof t.parseResponse!="function")throw new Error("table_provider_missing_parse_response");return t.parseResponse(e)}}}function Yg(){return dS()}var Vg=D(()=>{});function pS(){return Xc||(Xc=E.createScope("TableLock")),Xc}function Ks(t){return t!==null&&typeof t=="object"&&!Array.isArray(t)}function Qg(){let t=Xg.get(Jg,{});return Ks(t)?t:{}}function yS(t){Xg.set(Jg,t)}function Ln(t){let e=Qg();return Ks(e[t])?e[t]:{}}function Qc(t,e){let r=Qg();r[t]=e,yS(r),fS(t,e).catch(()=>{})}async function fS(t,e){try{let{chatKey:r,isolationKey:s}=(()=>{let n=String(t||"").indexOf("::");return n===-1?{chatKey:String(t||""),isolationKey:""}:{chatKey:t.slice(0,n),isolationKey:t.slice(n+2)}})();if(!r)return;let o=await Promise.resolve().then(()=>(Ba(),lc));await o.ensureTableDataReady(),await o.clearScopeLocks({chatId:r,isolationKey:s});for(let[n,a]of Object.entries(e||{})){if(!Ks(a))continue;let i={chatId:r,isolationKey:s};if(Array.isArray(a.rows))for(let l of a.rows)Number.isFinite(l)&&await o.setLockEntry(i,n,"row",String(l));if(Array.isArray(a.cols))for(let l of a.cols)typeof l=="string"&&l&&await o.setLockEntry(i,n,"column",l);if(Array.isArray(a.cells))for(let l of a.cells)typeof l=="string"&&l.includes(":")&&await o.setLockEntry(i,n,"cell",l);a.indexColumn===!0&&await o.setLockEntry(i,n,"index_column","")}}catch(r){pS().warn("lock-service SQL \u955C\u50CF\u5931\u8D25\uFF08\u4E0D\u5F71\u54CD\u4E3B\u6D41\u7A0B\uFF09",{error:r?.message||String(r)})}}function On(t){let e=Qp();return Ks(t)&&(Array.isArray(t.rows)&&(e.rows=Array.from(new Set(t.rows.filter(r=>Number.isFinite(r)).map(r=>Math.floor(r)))),e.rows.sort((r,s)=>r-s)),Array.isArray(t.cols)&&(e.cols=Array.from(new Set(t.cols.filter(r=>typeof r=="string"&&r.length>0)))),Array.isArray(t.cells)&&(e.cells=Array.from(new Set(t.cells.filter(r=>typeof r=="string"&&r.includes(":"))))),e.indexColumn=t.indexColumn===!0),e}function $n(t){if(typeof t=="string")return t;if(Ks(t)){if(typeof t.scopeKey=="string"&&t.scopeKey.includes("::"))return t.scopeKey;if(t.chatId!==void 0){let e=t.isolationKey!==void 0?t.isolationKey:de.getKey();return dn(t.chatId,e)}}return dn("",de.getKey())}function gS(t,e){let r=Ln(t),s={};if(!Array.isArray(e))return s;for(let o=0;o<e.length;o++){let n=e[o];if(!n)continue;let a=n.uid||n.id||"";a&&r[a]&&(s[o]=On(r[a]))}return s}function Po(t,e){let r=$n(t),s=Ln(r);return On(s[e])}function Zg(t,e,r,s=!0){if(!e||!Number.isFinite(r))return!1;let o=$n(t),n=Ln(o),a=On(n[e]),i=Math.floor(r),l=a.rows.includes(i);if(s&&!l)a.rows.push(i),a.rows.sort((d,c)=>d-c);else if(!s&&l)a.rows=a.rows.filter(d=>d!==i);else return!1;return n[e]=a,Qc(o,n),!0}function em(t,e,r,s=!0){if(!e||!r)return!1;let o=$n(t),n=Ln(o),a=On(n[e]),i=a.cols.includes(r);if(s&&!i)a.cols.push(r);else if(!s&&i)a.cols=a.cols.filter(l=>l!==r);else return!1;return n[e]=a,Qc(o,n),!0}function tm(t,e,r,s,o=!0){if(!e||!s||!Number.isFinite(r))return!1;let n=$n(t),a=Ln(n),i=On(a[e]),l=Zp(r,-1)==="-1:-1"?`${r}:${s}`:`${r}:${s}`,d=`${Math.floor(r)}:${s}`,c=i.cells.includes(d);if(o&&!c)i.cells.push(d);else if(!o&&c)i.cells=i.cells.filter(u=>u!==d);else return!1;return a[e]=i,Qc(n,a),!0}function rm(t,e=[]){let r=$n(t);return gS(r,e)}function sm(t,e,r,s){if(!Ks(t))return!1;let o=t[e];if(!o)return!1;if(Number.isFinite(r)&&o.rows.includes(r)||typeof s=="string"&&s.length>0&&o.cols.includes(s))return!0;if(Number.isFinite(r)&&typeof s=="string"&&s.length>0){let n=`${r}:${s}`;if(o.cells.includes(n))return!0}return!1}function Zc(t,e,r){if(!Ks(t))return!1;let s=t[e];return s?Number.isFinite(r)&&s.rows.includes(r):!1}var uS,Jg,Xc,Xg,ed=D(()=>{je();H();He();qr();uS="tableLocks",Jg="scopes";Xg=$.namespace(uS)});function mS(){return td||(td=E.createScope("TableAutoSchedule")),td}function nm(t,e,r){let s=Ae(e||St);return`${String(t||"")}::${s}::${String(r||"")}`}function hS(t,e,r){if(!r)return null;let s=om.get(nm(t,e,r),null);return s&&typeof s=="object"?s:null}function bS(t,e,r,s){if(!r)return;let o=Number.isFinite(s)?s:-1;om.set(nm(t,e,r),{lastMessageIndex:o,lastUpdatedAt:new Date().toISOString()})}function am(t,e,r=[],s){for(let o of r)bS(t,e,o,s)}function im({chatId:t,isolationKey:e,currentMessageIndex:r,scopeTables:s=[]}){let o=new Set,n={};for(let a of s){let i=a?.id||a?.uid||"";if(!i)continue;if(a?.enabled===!1){n[i]="disabled";continue}let l=a?.updateConfig?.updateFrequency;if(!Number.isFinite(l)||l===-1){o.add(i);continue}if(l===0){n[i]="frequency_zero";continue}if(l>=1){let d=hS(t,e,i);if(!d||!Number.isFinite(d.lastMessageIndex)){o.add(i);continue}let c=r-d.lastMessageIndex;c>=l?o.add(i):n[i]=`frequency_not_met (${c}/${l})`}else o.add(i)}return mS().info("buildAutoSchedulePlan",{chatId:t,isolationKey:e,currentMessageIndex:r,shouldUpdateCount:o.size,skipReasonsCount:Object.keys(n).length,shouldUpdateTables:[...o],skipReasons:n}),{shouldUpdate:o,skipReasons:n}}var om,td,lm=D(()=>{je();H();He();om=$.namespace("tableAutoSchedule")});function xS(t){let e=Wg(t);return e&&(e.mode==="incremental"||e.mode==="full")?e:Dg(t)}function be(){return E.createScope("TableUpdate")}function vS(t,e){return new Promise(r=>{if(e?.aborted){r(!1);return}let s,o=()=>{clearTimeout(s);try{e?.removeEventListener?.("abort",o)}catch{}r(!1)};s=setTimeout(()=>{try{e?.removeEventListener?.("abort",o)}catch{}r(!0)},t);try{e?.addEventListener?.("abort",o)}catch{}})}function V(t,e=""){return t==null?e:String(t).trim()||e}function cm(t=[],e=8,r="all"){if(!Array.isArray(t)||t.length===0)return"";let s=r==="assistant_only"?t.filter(o=>o?.role==="assistant"):t;return s.slice(Math.max(s.length-e,0)).map(o=>`[${V(o?.role,"unknown")}] ${String(o?.content||"").trim()}`).filter(Boolean).join(`

`)}function dm(t,{extractTags:e=[],useGlobalRules:r=!1,regexPresetId:s=""}={}){if(!t)return t;let o=Array.isArray(e)&&e.length>0,n=typeof s=="string"&&s.trim().length>0;if(!o&&!r&&!n)return t;try{let a=[],i=[];if(n)try{let l=Ee.getPreset(s);if(l){let d=Array.isArray(l.rules)?l.rules.filter(c=>c&&c.enabled!==!1&&c.value):[];a.push(...d),Array.isArray(l.blacklist)&&i.push(...l.blacklist.map(c=>String(c||"").trim()).filter(Boolean))}else be().warn("applyContextExtractionRules: \u627E\u4E0D\u5230\u6B63\u5219\u9884\u8BBE",{regexPresetId:s})}catch(l){be().warn("applyContextExtractionRules: \u52A0\u8F7D\u6B63\u5219\u9884\u8BBE\u5931\u8D25",l)}if(o&&a.push(...e.map(l=>{let d=String(l||"").trim();return d.startsWith("regex:")?{type:"regex_include",value:d.slice(6).trim(),enabled:!0}:{type:"include",value:d,enabled:!0}}).filter(l=>l.value)),r){let l=Js()||[];a=[...a,...l.filter(d=>d?.enabled)],i=[...i,...Xs()||[]]}return a.length===0&&i.length===0?t:xr(t,a,i)||t}catch(a){return be().warn("applyContextExtractionRules \u5931\u8D25\uFF0C\u56DE\u9000\u539F\u59CB\u6587\u672C",a),t}}function TS(t=[],e=-1){return!Number.isFinite(e)||e<0?t:t.map(r=>{let s=Array.isArray(r?.rows)?r.rows:[];return e===0||s.length<=e?r:{...r,rows:s.slice(s.length-e)}})}function SS(t=[]){return!Array.isArray(t)||t.length===0?"":t.map((e,r)=>{let s=e?.aiInstructions&&typeof e.aiInstructions=="object"?e.aiInstructions:{},o=Array.isArray(e?.columns)?e.columns:[],n=[`\u8868 ${r}: ${V(e?.name,`\u8868${r+1}`)}`,`\u8868\u683C\u8BF4\u660E: ${V(e?.note,"\u65E0")}`,`\u521D\u59CB\u5316\u8BF4\u660E: ${V(s.init,"\u65E0")}`,`\u65B0\u589E\u8BF4\u660E: ${V(s.create,"\u65E0")}`,`\u66F4\u65B0\u8BF4\u660E: ${V(s.update,"\u65E0")}`,`\u5220\u9664\u8BF4\u660E: ${V(s.delete,"\u65E0")}`,"\u5B57\u6BB5\uFF08\u8BF7\u7528\u5217\u7D22\u5F15\u4F5C\u4E3A data key\uFF09:"];return o.forEach((a,i)=>{n.push(`- [${i}]: ${V(a?.title||a?.key,"\u672A\u547D\u540D\u5B57\u6BB5")} \u2014 ${V(a?.description,"\u65E0")}`)}),n.join(`
`)}).join(`

`)}function _S(t,e=[]){if(!t||!Array.isArray(e)||e.length===0)return"";let r=e.map((o,n)=>{let a=V(o?.name,`\u8868${n+1}`),i=t.includes(o,n);return`\u8868 ${n}: ${a} - ${i?"\u5141\u8BB8\u7F16\u8F91":"\u53EA\u8BFB\uFF0C\u7981\u6B62\u4FEE\u6539"}`});return e.some((o,n)=>!t.includes(o,n))&&(r.push(""),r.push('\u3010\u91CD\u8981\u7EA6\u675F\u3011\u6807\u8BB0\u4E3A"\u53EA\u8BFB"\u7684\u8868\u683C\uFF0C\u4F60\u5FC5\u987B\u5728\u8F93\u51FA\u4E2D\u539F\u6837\u4FDD\u7559\u5176\u6240\u6709\u884C\u6570\u636E\uFF0C\u4E0D\u5F97\u65B0\u589E\u3001\u4FEE\u6539\u6216\u5220\u9664\u4EFB\u4F55\u884C\u3002'),r.push("\u5168\u91CF\u8F93\u51FA\u65F6\uFF0C\u53EA\u8BFB\u8868\u683C\u7684 rows \u5FC5\u987B\u4E0E\u8F93\u5165\u4E2D\u7684\u5B8C\u5168\u4E00\u81F4\u3002")),r.join(`
`)}function ym(t={},e=0,r=[]){let s=t&&typeof t=="object"?t:{},o=s.cells&&typeof s.cells=="object"&&!Array.isArray(s.cells)?s.cells:{},n={},a=Array.isArray(r)?r.map(l=>V(l?.key,"")).filter(Boolean):[];return new Set([...Object.keys(o),...a]).forEach(l=>{n[l]=V(o[l],"")}),{...s,id:ln(s.id||s.rowId,e),name:V(s.name,""),cells:n}}function Fs(t={},e=0){let r=t&&typeof t=="object"?t:{},s=Array.isArray(r.columns)?ce(r.columns):[],o=Array.isArray(r.rows)?r.rows.map((n,a)=>ym(n,a,s)):[];return{...r,id:Jt(r.id||r.key,e),rows:o}}function hr(t=[]){return Array.isArray(t)?t.map((e,r)=>Fs(e,r)):[]}function ES(t=[],e=[],r){let s=hr(t),o=hr(e);if(!r)return o;let n=new Map(o.map((u,p)=>[Jt(u?.id||u?.key,p),u])),a=s.map((u,p)=>({table:u,tableIndex:p,id:Jt(u?.id||u?.key,p)})).filter(({table:u,tableIndex:p})=>r.includes(u,p)),i=new Set,l=new Map;for(let u=0;u<o.length;u++){let p=o[u],y=Jt(p?.id||p?.key,u);n.has(y)&&(l.set(y,p),i.add(y))}let d=0,c=o.filter((u,p)=>{let y=Jt(u?.id||u?.key,p);return!i.has(y)});return s.map((u,p)=>{let y=Jt(u?.id||u?.key,p);if(!r.includes(u,p))return Fs(u,p);let m=l.get(y);if(m)return Fs(m,p);let g=c[d];return g?(d++,Fs({...g,id:u.id||g.id},p)):Fs(u,p)})}function AS(t=[],e=[],r,s={}){if(!Array.isArray(t)||!r)return{edits:[],stats:{total:0,passed:0,droppedByScope:0,droppedByLock:0}};let o=hr(e),n=[],a=0,i=0;for(let l of t){let d=Number.isFinite(l?.tableIndex)?l.tableIndex:-1;if(d<0||d>=o.length){a++;continue}let c=o[d];if(!r.includes(c,d)){a++;continue}if(l.op===co.INSERT_ROW){n.push(l);continue}let u=Number.isFinite(l?.rowIndex)?l.rowIndex:-1;if(u<0||u>=(Array.isArray(c?.rows)?c.rows.length:0)){a++;continue}if(l.op===co.DELETE_ROW){if(Zc(s,d,u)){i++;continue}n.push(l);continue}n.push(l)}return{edits:n,stats:{total:t.length,passed:n.length,droppedByScope:a,droppedByLock:i}}}function CS(t=[],e){let r=hr(t);return e?r.map((s,o)=>{let n=Array.isArray(s?.columns)?s.columns:[];return e.includes(s,o)?{...Fs(s,o),scopeEditable:!0,scopeStatus:"editable"}:{...Fs(s,o),scopeEditable:!1,scopeStatus:"readonly",rows:Array.isArray(s?.rows)?s.rows.map((a,i)=>ym(a,i,n)):[]}}):r}function kS(t,e,r){return{target:{sourceMessageId:V(t?.sourceMessageId),sourceSwipeId:V(t?.sourceSwipeId||t?.effectiveSwipeId),slotBindingKey:V(t?.slotBindingKey),slotRevisionKey:V(t?.slotRevisionKey),slotTransactionId:V(t?.slotTransactionId)},loadMode:V(e?.loadMode),mergeBaseOnly:e?.mergeBaseOnly===!0,resolvedFromMessageId:V(e?.resolvedFromMessageId),resolvedFromRevisionKey:V(e?.resolvedFromRevisionKey),sourceKind:V(e?.sourceKind||e?.state?.meta?.sourceKind),scope:typeof r?.toJSON=="function"?r.toJSON():null,tables:CS(e?.state?.tables,r)}}function um(){return IS}function pm(t,e){if(!t||typeof t!="string")return{key:t,source:"fallback"};if(!Array.isArray(e)||e.length===0)return{key:t,source:"fallback"};for(let s of e)if(s?.key===t)return{key:t,source:"direct"};if(/^\d+$/.test(t)){let s=parseInt(t,10);if(s>=0&&s<e.length&&e[s]?.key)return{key:e[s].key,source:"index"}}let r=t.match(/^col(?:_(\d+))?$/i);if(r){let s=r[1]?parseInt(r[1],10)-1:0;if(s>=0&&s<e.length&&e[s]?.key)return{key:e[s].key,source:"col_n"}}return{key:t,source:"fallback"}}function RS(t,e,r,s=null){let o=hr(t||[]),n=r||{},a={direct:0,index:0,col_n:0,fallback:0},i={},l={};if(Array.isArray(e))for(let d of e){let c=Number.isFinite(d?.tableIndex)?d.tableIndex:-1;i[c]=(i[c]||0)+1,l[d?.op||"unknown"]=(l[d?.op||"unknown"]||0)+1}be().info("applyIncrementalEdits \u603B\u89C8",{totalEdits:e?.length||0,tableCount:o.length,editsByTable:i,editsByOp:l});for(let d of e){let c=d.tableIndex;if(c<0||c>=o.length)continue;let u=o[c];if(!u||!Array.isArray(u.rows)||s&&!s.includes(u,c))continue;if(d.op===co.INSERT_ROW){let y={id:an("row"),name:"",cells:{}};if(d.data&&typeof d.data=="object"){y.name=V(d.data.name,"");let g=Array.isArray(u.columns)?u.columns:[];for(let[h,x]of Object.entries(d.data)){if(h==="name")continue;let{key:S,source:T}=pm(h,g);y.cells[S]=V(x),a[T]=(a[T]||0)+1}}Object.keys(y.cells).length===0&&!y.name&&be().warn("applyIncrementalEdits: \u63D2\u5165\u7A7A\u884C\uFF08data \u89E3\u6790\u4E3A\u7A7A\uFF09",{tableIndex:c,tableName:u.name,editDataKeys:d.data?Object.keys(d.data):[],editDataPreview:JSON.stringify(d.data||{}).slice(0,200)}),u.rows.push(y);continue}let p=d.rowIndex;if(!(p<0||p>=u.rows.length)){if(d.op===co.DELETE_ROW){if(Zc(n,c,p))continue;u.rows.splice(p,1);continue}if(d.op===co.UPDATE_ROW){let y=u.rows[p];if(!y)continue;if(y.id=ln(y.id||y.rowId,p),y.cells=y.cells||{},d.data&&typeof d.data=="object"){let m=Array.isArray(u.columns)?u.columns:[];for(let[g,h]of Object.entries(d.data)){if(g==="name")continue;let{key:x,source:S}=pm(g,m);sm(n,c,p,x)||(y.cells[x]=V(h),a[S]=(a[S]||0)+1)}d.data.name!==void 0&&(y.name=V(d.data.name,y.name))}}}}return Object.values(a).some(d=>d>0)&&be().info("\u5217 key \u89E3\u6790\u7EDF\u8BA1",a),hr(o)}async function MS({executionContext:t,targetSnapshot:e,loadResult:r,config:s,assistantSnapshot:o,fillMode:n,runScope:a}={}){let i=Ft(s),l=n==="incremental"||!n&&i.fillMode!=="full",d=my(i,{skipResponseContract:l}),c=kS(e,r,a),u=Array.isArray(o?.tableState?.tables)?hr(o.tableState.tables):[],p=t?.chatHistory||t?.chatMessages||[],{contextDepth:y,contextRoles:m,contextExtractTags:g,contextUseGlobalRules:h,sendLatestRows:x}=i,S=i?.extraction?.regexPresetId||"",T=cm(p,y,m),A=cm(p,y,"all"),C=dm(T,{extractTags:g,useGlobalRules:h,regexPresetId:S}),w=dm(A,{extractTags:g,useGlobalRules:h,regexPresetId:S}),P=await ca({worldbooks:i.worldbooks}),B=TS(c.tables,x),z={...c,tables:B},R={...t,toolName:"\u586B\u8868\u5DE5\u4F5C\u53F0",toolId:"tableWorkbench",lastAiMessage:t?.assistantBaseText||t?.lastAiMessage||"",recentMessagesText:C,rawRecentMessagesText:w,toolWorldbookContent:P,tableGuidance:SS(i.tables),tableScopeGuidance:_S(a,c.tables),injectedContext:o?.injectedContext||Dt.getLatestMessageInjectedContext(e?.sourceMessageId),toolContentMacro:JSON.stringify(z,null,2),extractedContent:JSON.stringify(z,null,2),previousToolOutput:JSON.stringify(u,null,2)},_=await Ls.buildToolMessages(d,R),M=await Ls.buildPromptText(d,R);if(l&&(M+=um(),Array.isArray(_)&&_.length>0)){let q=_[_.length-1];q&&typeof q.content=="string"&&(q.content+=um())}if(!Array.isArray(_)||_.length===0)throw new Error("\u586B\u8868\u8BF7\u6C42\u6D88\u606F\u6784\u5EFA\u5931\u8D25\u3002");let j=i.apiPreset||"";try{let q=Array.isArray(c?.tables)?c.tables:[],ue=q.filter(pe=>pe?.scopeEditable!==!1).map(pe=>V(pe?.updateConfig?.apiPreset,"")).filter(Boolean);ue.length>0&&ue.every(pe=>pe===ue[0])&&(j=ue[0],be().info("L3: \u8868\u7EA7 API \u9884\u8BBE\u751F\u6548",{preset:j,affectedTables:q.filter(pe=>pe?.scopeEditable!==!1).map(pe=>pe?.name||pe?.id)}))}catch(q){be().warn("L3 \u8868\u7EA7 API \u9884\u8BBE\u89E3\u6790\u5931\u8D25\uFF0C\u7528\u5168\u5C40",q)}return{toolConfig:d,context:R,requestPayload:c,promptText:M,messages:_,fillMode:l?"incremental":"full",effectiveApiPreset:j,runScope:typeof a?.toJSON=="function"?a.toJSON():null}}async function PS(t,e={},r=null){let s=Ft(e),o=V(e?._effectiveApiPreset||s.apiPreset,"");if(o){if(!jo(o))throw new Error(`API \u9884\u8BBE\u4E0D\u5B58\u5728: ${o}`);return Fi(o,t,{},r)}return Wo(t,{},r)}function kr({status:t=Ce.IDLE,targetSnapshot:e=null,skipReason:r="",startedAt:s=Date.now(),error:o=""}={}){return{lastAutoRunAt:s,lastAutoStatus:V(t,Ce.IDLE),lastAutoMessageId:V(e?.sourceMessageId,""),lastAutoRevisionKey:V(e?.slotRevisionKey,""),lastAutoSkipReason:V(r,""),...o?{lastError:o,lastErrorDetails:[o]}:{}}}function mr(t={},e=st.MANUAL){let r=t&&typeof t=="object"?t:{};return Object.keys(r).length?gy(r):null}function Us({targetSnapshot:t=null,startedAt:e=Date.now(),status:r="idle",skipReason:s="",warning:o="",writeback:n=null,aborted:a=!1,stale:i=!1,abortReason:l="",error:d=""}={}){return{isAutoRun:!0,status:r,startedAt:e,targetSnapshot:t,sourceMessageId:V(t?.sourceMessageId,""),sourceSwipeId:V(t?.sourceSwipeId||t?.effectiveSwipeId,""),slotRevisionKey:V(t?.slotRevisionKey,""),writebackStatus:n?.success===!0?"success":o?"warning":"",refreshConfirmed:n?.mirrorResult?.refreshConfirmed===!0,warning:V(o,""),skipReason:V(s,""),aborted:a===!0,stale:i===!0,abortReason:V(l,""),error:V(d,"")}}function bi(t=null){if(t?.signal?.aborted)return{aborted:!0,stale:!1,reason:"cancelled_before_host_commit"};if(typeof t?.shouldAbortWriteback=="function")try{return t.shouldAbortWriteback()||!1}catch{return{aborted:!0,stale:!0,reason:"stale_base_changed"}}return!1}async function Bn(t=null,e={}){return gm({configInput:t,runSource:st.MANUAL,clearBeforeUpdate:e?.clearBeforeUpdate===!0,executionContextBuilder:()=>bs({runSource:st.MANUAL}),targetResolver:r=>kn(r,{runSource:st.MANUAL})})}async function fm({messageId:t,swipeId:e="",sourceEvent:r="AUTO_TABLE",configInput:s=null,signal:o=null,shouldAbortWriteback:n=null}={}){return gm({configInput:s,runSource:st.AUTO,autoMeta:{sourceEvent:r,messageId:V(t,""),swipeId:V(e,""),signal:o,shouldAbortWriteback:n},executionContextBuilder:()=>xs({messageId:t,swipeId:e,runSource:st.AUTO}),targetResolver:a=>kn(a,{runSource:st.AUTO})})}async function gm({configInput:t=null,runSource:e=st.MANUAL,executionContextBuilder:r,targetResolver:s,autoMeta:o=null,clearBeforeUpdate:n=!1}={}){let a=Ft(t||Pe()),i=Gl(a),l=Ra({tables:Array.isArray(a.tables)?a.tables:[]}),d=e===st.AUTO,c=Date.now();if(be().info(`\u5F00\u59CB\u586B\u8868 [${e}]`,{isAutoRun:d,fillMode:a.fillMode}),!i.valid||!l.valid){let g=[...i.errors,...l.errors];return be().error("\u914D\u7F6E\u6821\u9A8C\u5931\u8D25",{errors:g}),mr({lastStatus:Ce.ERROR,lastRunAt:c,lastDurationMs:0,lastError:g[0]||"\u586B\u8868\u914D\u7F6E\u65E0\u6548\u3002",lastErrorDetails:g,lastValidationSummary:l.summary||{errorCount:g.length,warningCount:0},errorCount:Number(a?.runtime?.errorCount)||0,...d?kr({status:Ce.ERROR,startedAt:c,skipReason:"invalid_config",error:g[0]||"\u586B\u8868\u914D\u7F6E\u65E0\u6548\u3002"}):{}},e),{success:!1,error:g.join(`
`),errors:g,...d?{meta:Us({startedAt:c,status:Ce.ERROR,skipReason:"invalid_config",error:g[0]||"\u586B\u8868\u914D\u7F6E\u65E0\u6548\u3002"})}:{}}}let u=a.runtime||{},p=Array.isArray(a.tables)?a.tables:[];try{let h=To({})?.template?.tables;if(Array.isArray(h)&&h.length>0){let x=a.tableEnabledOverrides&&typeof a.tableEnabledOverrides=="object"?a.tableEnabledOverrides:{};if(p=h.map(T=>{let A=T?.id,C=A&&Object.prototype.hasOwnProperty.call(x,A)?x[A]:void 0,w=C!==void 0?C:T.enabled!==!1;return{...T,enabled:w}}),d){let T=Number.isFinite(targetSnapshot?.targetMessageIndex)?targetSnapshot.targetMessageIndex:-1,A=im({chatId:targetSnapshot?.chatId||"",isolationKey:de.getKey?de.getKey():"",currentMessageIndex:T,scopeTables:p});p=p.map(C=>{let w=C?.id||C?.uid||"";return w&&!A.shouldUpdate.has(w)?{...C,enabled:!1}:C})}let S=p.filter(T=>T.enabled===!1).map(T=>T?.name||T?.id);S.length>0&&be().info("scopeTables: \u7528\u6237\u7981\u7528\u4E86\u90E8\u5206\u8868",{disabledCount:S.length,disabledNames:S})}}catch{}let y=ey(a.scope||a,p);if(be().info("runScope \u5DF2\u89E3\u6790",{mode:y.mode,requestedMode:y.requestedMode,staleScope:y.staleScope,scopeTablesCount:Array.isArray(p)?p.length:0,allowedTableIds:y.allowedTableIds,allTableIds:y.allTableIds,scopeTablesEnabled:Array.isArray(p)?p.map(g=>({id:g?.id,name:g?.name,enabled:g?.enabled})):[]}),y.staleScope&&be().warn("runScope: \u68C0\u6D4B\u5230 stale scope\uFF08activeTableId/selectedTableIds \u4E0D\u5728\u5F53\u524D tables \u8303\u56F4\u5185\uFF09\uFF0C\u5DF2\u81EA\u52A8 fallback \u5230 enabled",{requestedMode:y.requestedMode,requestedActiveTableId:y.activeTableId,requestedSelectedTableIds:y.selectedTableIds}),(y.mode==="current"||y.mode==="selected")&&y.allowedTableIds.length===0){let g=y.mode==="current"?"\u672A\u6307\u5B9A\u5F53\u524D\u8868\u683C\uFF0C\u65E0\u6CD5\u6267\u884C\u3002":"\u672A\u9009\u62E9\u4EFB\u4F55\u8868\u683C\uFF0C\u65E0\u6CD5\u6267\u884C\u3002";return be().warn(g,{mode:y.mode}),mr({lastStatus:Ce.ERROR,lastRunAt:c,lastDurationMs:0,lastError:g,lastErrorDetails:[g]},e),{success:!1,error:g,errors:[g]}}let m=null;mr({lastStatus:Ce.RUNNING,lastError:"",lastErrorDetails:[],lastValidationSummary:l.summary||{errorCount:0,warningCount:0},lastScopeMode:V(y.mode,""),...d?kr({status:Ce.RUNNING,startedAt:c,skipReason:""}):{}},e);try{if(typeof r!="function")throw new Error("table_update_missing_execution_context_builder");if(typeof s!="function")throw new Error("table_update_missing_target_resolver");let g=await r();be().info("\u6267\u884C\u4E0A\u4E0B\u6587\u5DF2\u6784\u5EFA");let h=s(g);if(!h)throw new Error("\u5F53\u524D\u6CA1\u6709\u53EF\u7528\u7684 assistant \u76EE\u6807\u697C\u5C42\u3002");m=h,be().info("\u76EE\u6807\u6D88\u606F\u5DF2\u89E3\u6790",{sourceMessageId:h.sourceMessageId,slotRevisionKey:h.slotRevisionKey}),d&&mr(kr({status:Ce.RUNNING,targetSnapshot:h,startedAt:c,skipReason:""}),e);let x=V(a.autoUpdateTrigger,"assistantMessage");if(d&&(!a.autoUpdateEnabled||x!=="assistantMessage")){let Y=a.autoUpdateEnabled?"auto_trigger_not_assistant_message":"auto_update_disabled";return mr(kr({status:Ce.SKIPPED,targetSnapshot:h,startedAt:c,skipReason:Y}),e),{success:!1,skipped:!0,reason:Y,targetSnapshot:h,meta:Us({targetSnapshot:h,startedAt:c,status:Ce.SKIPPED,skipReason:Y})}}if(d){let Y=bi(o);if(Y)return mr(kr({status:Ce.ABORTED,targetSnapshot:h,startedAt:c,skipReason:Y.reason,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88"}),e),{success:!1,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88",targetSnapshot:h,meta:Us({targetSnapshot:h,startedAt:c,status:Ce.ABORTED,skipReason:Y.reason,aborted:Y.aborted===!0,stale:Y.stale===!0,abortReason:Y.reason,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88"})}}let S=await fg(h);if(!S?.success)throw new Error(S?.error||"\u76EE\u6807\u89E3\u6790\u8BB0\u5F55\u5931\u8D25");if(n&&Number.isFinite(h?.targetMessageIndex)&&h.targetMessageIndex>=0){be().info("clearBeforeUpdate \u542F\u7528\uFF0C\u6E05\u7A7A\u76EE\u6807\u697C\u5C42\u6570\u636E",{targetMessageIndex:h.targetMessageIndex});try{let Y=await gg(h.targetMessageIndex);be().info("clearBeforeUpdate \u5B8C\u6210",Y)}catch(Y){be().error("clearBeforeUpdate \u5931\u8D25",Y)}}let T=zs(h.sourceMessageId),A=Array.isArray(p)&&p.length>0?p:a.tables;be().info("templateTables \u6765\u6E90",{usingActiveTemplate:p!==(Array.isArray(a.tables)?a.tables:[]),tableCount:Array.isArray(A)?A.length:0,firstTableName:A?.[0]?.name||"",firstTableId:A?.[0]?.id||""});let C=yg(h,{templateTables:A}),w=hr(C?.state?.tables||[]),P=Yg(),B=o?.signal||g?.signal||null;be().info("\u72B6\u6001\u5DF2\u52A0\u8F7D",{loadMode:C?.loadMode,sourceKind:C?.sourceKind,tableCount:w.length});let z=await P.buildRequest({buildRequest:MS},{executionContext:g,targetSnapshot:h,loadResult:C,config:a,assistantSnapshot:T,runScope:y});be().info("\u8BF7\u6C42\u5DF2\u6784\u5EFA",{messageCount:z?.messages?.length,fillMode:z?.fillMode});let R="",_=null,M=null;for(let Y=1;Y<=hi;Y++){if(B?.aborted)throw new Error("\u8BF7\u6C42\u5DF2\u53D6\u6D88");try{if(R=await P.sendRequest({sendRequest:PS},z,{config:{...a,_effectiveApiPreset:z?.effectiveApiPreset||""},abortSignal:B}),be().info("API \u54CD\u5E94\u5DF2\u6536\u5230",{attempt:Y,responseLength:R?.length||0}),_=P.parseResponse({parseResponse:xS},R),be().info("\u54CD\u5E94\u5DF2\u89E3\u6790",{attempt:Y,mode:_?.mode,hasEdits:!!_?.edits,hasTables:!!_?.tables,rawFormat:_?.rawFormat}),!(_?.mode==="incremental"&&Array.isArray(_.edits)&&_.edits.length>0||_?.mode==="full"&&_?.tables))throw new Error("AI \u54CD\u5E94\u4E2D\u672A\u627E\u5230\u6709\u6548\u7684 <tableEdit> \u6807\u7B7E\u6216\u8868\u683C JSON");M=null;break}catch(Fe){if(M=Fe,be().warn(`\u586B\u8868 attempt ${Y}/${hi} \u5931\u8D25`,{error:Fe?.message||String(Fe)}),Y<hi&&!await vS(wS,B))throw new Error("\u8BF7\u6C42\u5DF2\u53D6\u6D88\uFF08\u91CD\u8BD5\u7B49\u5F85\u671F\u95F4\uFF09")}}if(M)throw new Error(`\u586B\u8868\u5931\u8D25\uFF08${hi} \u6B21\u91CD\u8BD5\u540E\u4ECD\u5931\u8D25\uFF09: ${M?.message||String(M)}`);let j,q=null,ue=z.fillMode||"full",pe=null;if(_.mode==="incremental"&&_.edits){let Y=rm(C?.state,w),Fe=AS(_.edits,w,y,Y);pe=Fe.stats,j=RS(w,Fe.edits,Y,y),ue="incremental",(pe.droppedByScope>0||pe.droppedByLock>0)&&be().info("scope \u8FC7\u6EE4",pe)}else if(_.mode==="full"&&_.tables){let Y=hr(_.tables);j=ES(w,Y,y),ue="full"}else j=hr(w);if(q=Gg(w,j),be().info("\u5DEE\u5F02\u5DF2\u8BA1\u7B97",{fillMode:ue}),d){let Y=bi(o);if(Y)return mr(kr({status:Ce.ABORTED,targetSnapshot:h,startedAt:c,skipReason:Y.reason,error:"\u5199\u56DE\u524D\u5DF2\u53D6\u6D88"}),e),{success:!1,error:"\u5199\u56DE\u524D\u5DF2\u53D6\u6D88",targetSnapshot:h,meta:Us({targetSnapshot:h,startedAt:c,status:Ce.ABORTED,aborted:Y.aborted===!0,stale:Y.stale===!0,abortReason:Y.reason,error:"\u5199\u56DE\u524D\u5DF2\u53D6\u6D88"})}}let re=await kg({targetSnapshot:h,nextTables:j,config:a,loadResult:C,diff:q,fillMode:ue,skipNotify:d});if(d){let Y=bi(o);if(Y)return mr(kr({status:Ce.ABORTED,targetSnapshot:h,startedAt:c,skipReason:Y.reason,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88"}),e),{success:!1,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88",targetSnapshot:h,loadResult:C,request:z,responseText:R,parsed:_,fillMode:ue,diff:q,previousTables:w,nextTables:j,runScope:y,state:re?.state,bindings:re?.bindings,mirrorResult:re?.mirrorResult,warning:re?.warning||"",meta:Us({targetSnapshot:h,startedAt:c,status:Ce.ABORTED,warning:re?.warning||"",writeback:re,aborted:Y.aborted===!0,stale:Y.stale===!0,abortReason:Y.reason,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88"})}}if(!re?.success)throw new Error(re?.error||"\u7ED3\u6784\u5316\u5199\u56DE\u5931\u8D25");if(d)try{let Y=Number.isFinite(h?.targetMessageIndex)?h.targetMessageIndex:-1,Fe=p.filter(xe=>xe?.enabled!==!1&&(xe?.id||xe?.uid)).map(xe=>xe.id||xe.uid);Fe.length>0&&Y>=0&&am(h?.chatId||"",de.getKey?de.getKey():"",Fe,Y)}catch(Y){be().warn("recordTablesUpdated \u5931\u8D25\uFF08\u4E0D\u5F71\u54CD\u4E3B\u6D41\u7A0B\uFF09",Y)}let Te=Date.now()-c;be().info(`\u586B\u8868\u5B8C\u6210 [${ue}] ${Te}ms`,{success:!0,writebackSuccess:re?.success,mirrorSuccess:re?.mirrorResult?.success});let Ue={lastStatus:Ce.SUCCESS,lastRunAt:Date.now(),lastDurationMs:Te,lastError:"",lastErrorDetails:[],lastValidationSummary:l.summary||{errorCount:0,warningCount:0},successCount:(Number(u.successCount)||0)+1,errorCount:Number(u.errorCount)||0,lastSourceMessageId:V(h.sourceMessageId),lastSlotRevisionKey:V(h.slotRevisionKey),lastLoadMode:V(C.loadMode),lastMirrorApplied:re?.mirrorResult?.success===!0,lastResolvedFromMessageId:V(C?.resolvedFromMessageId),lastResolvedFromRevisionKey:V(C?.resolvedFromRevisionKey),lastSourceKind:V(C?.sourceKind||C?.state?.meta?.sourceKind),lastScopeMode:V(y.mode,""),lastFillMode:ue,...d?kr({status:Ce.SUCCESS,targetSnapshot:h,startedAt:c,skipReason:""}):{}};return mr(Ue,e),{success:!0,targetSnapshot:h,loadResult:C,request:z,responseText:R,parsed:_,fillMode:ue,diff:q,previousTables:w,nextTables:j,runScope:y,scopeStats:pe,state:re.state,bindings:re.bindings,mirrorResult:re.mirrorResult,warning:re.warning||"",...d?{meta:Us({targetSnapshot:h,startedAt:c,status:Ce.SUCCESS,warning:re.warning||"",writeback:re})}:{}}}catch(g){let h=Date.now()-c;be().error(`\u586B\u8868\u5931\u8D25 ${h}ms: ${g?.message||g}`,{stack:g?.stack});let x=d?bi(o):!1,S=g?.name==="AbortError"||g?.message==="\u8BF7\u6C42\u5DF2\u53D6\u6D88"||x?.aborted===!0||x?.stale===!0,T=S?Ce.ABORTED:Ce.ERROR,A={lastStatus:T,lastRunAt:Date.now(),lastDurationMs:h,lastError:g?.message||String(g),lastErrorDetails:[g?.message||String(g)],lastValidationSummary:l.summary||{errorCount:0,warningCount:0},successCount:Number(u.successCount)||0,errorCount:S?Number(u.errorCount)||0:(Number(u.errorCount)||0)+1,lastScopeMode:V(y.mode,""),...d?kr({status:T,targetSnapshot:m,startedAt:c,skipReason:S?x?.reason||"cancelled_before_host_commit":"",error:g?.message||String(g)}):{}};return mr(A,e),{success:!1,error:g?.message||String(g),errors:[g?.message||String(g)],...d?{meta:Us({targetSnapshot:m,startedAt:c,status:T,skipReason:S?x?.reason||"cancelled_before_host_commit":"",aborted:S,stale:x?.stale===!0,abortReason:S?x?.reason||"cancelled_before_host_commit":"",error:g?.message||String(g)})}:{}}}}var hi,wS,IS,xi=D(()=>{ws();Ds();Jn();Qa();H();He();ai();Rn();dr();Ig();gi();Hg();qg();Ca();Vg();ed();yo();da();Qs();Fr();lm();qr();hi=3,wS=5e3;IS=`

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

\u53EA\u8FD4\u56DE <tableEdit> \u6807\u7B7E\uFF0C\u4E0D\u8981\u9644\u52A0\u5176\u4ED6\u5185\u5BB9\u3002`});var bm={};ae(bm,{WindowManager:()=>wi,closeWindow:()=>hm,createWindow:()=>rd,windowManager:()=>yt});function LS(){if(yt.stylesInjected)return;yt.stylesInjected=!0;let t=`
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
  `,e=Bt(),r=e.createElement("style");r.id=DS+"_styles",r.textContent=t,(e.head||e.documentElement).appendChild(r)}function rd(t){let{id:e,title:r="\u7A97\u53E3",content:s="",width:o=900,height:n=700,modal:a=!1,resizable:i=!0,maximizable:l=!0,startMaximized:d=!1,rememberState:c=!0,onClose:u,onReady:p}=t;LS();let y=Bt(),m=y.defaultView||window.parent||window,g=window.jQuery||window.parent?.jQuery;if(!g)return NS.error("jQuery not available"),null;if(yt.isOpen(e))return yt.bringToFront(e),yt.getWindow(e);let h=m.innerWidth||1200,x=m.innerHeight||800,S=h<=1100,T=null,A=!1;c&&(T=yt.getState(e),T&&!S&&(A=!0));let C,w;A&&T.width&&T.height?(C=Math.max(400,Math.min(T.width,h-40)),w=Math.max(300,Math.min(T.height,x-40))):(C=Math.max(400,Math.min(o,h-40)),w=Math.max(300,Math.min(n,x-40)));let P=Math.max(20,Math.min((h-C)/2,h-C-20)),B=Math.max(20,Math.min((x-w)/2,x-w-20)),z=l&&!S,R=`
    <div class="yyt-window" id="${e}" style="left:${P}px; top:${B}px; width:${C}px; height:${w}px;">
      <div class="yyt-window-header">
        <div class="yyt-window-title">
          <i class="fa-solid fa-window-maximize"></i>
          <span>${OS(r)}</span>
        </div>
        <div class="yyt-window-controls">
          ${z?'<button class="yyt-window-btn maximize" title="\u6700\u5927\u5316/\u8FD8\u539F"><i class="fa-solid fa-expand"></i></button>':""}
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
  `,_=null;a&&(_=g(`<div class="yyt-window-overlay" data-for="${e}"></div>`),g(y.body).append(_));let M=g(R);g(y.body).append(M),yt.register(e,M),M.on("mousedown",()=>yt.bringToFront(e));let j=!1,q={left:P,top:B,width:C,height:w},ue=()=>{q={left:parseInt(M.css("left")),top:parseInt(M.css("top")),width:M.width(),height:M.height()},M.addClass("maximized"),M.find(".yyt-window-btn.maximize i").removeClass("fa-expand").addClass("fa-compress"),j=!0},pe=()=>{M.removeClass("maximized"),M.css({left:q.left+"px",top:q.top+"px",width:q.width+"px",height:q.height+"px"}),M.find(".yyt-window-btn.maximize i").removeClass("fa-compress").addClass("fa-expand"),j=!1};M.find(".yyt-window-btn.maximize").on("click",()=>{j?pe():ue()}),(S&&l||A&&T.isMaximized&&l||d&&l)&&ue(),M.find(".yyt-window-btn.close").on("click",()=>{if(c&&l){let xe={width:j?q.width:M.width(),height:j?q.height:M.height(),isMaximized:j};yt.saveState(e,xe)}u&&u(),_&&_.remove(),M.remove(),yt.unregister(e),g(y).off(".yytWindowDrag"+e),g(y).off(".yytWindowResize"+e)}),_&&_.on("click",xe=>{xe.target,_[0]});let re=!1,Te,Ue,Y,Fe;if(M.find(".yyt-window-header").on("mousedown",xe=>{g(xe.target).closest(".yyt-window-controls").length||j||(re=!0,Te=xe.clientX,Ue=xe.clientY,Y=parseInt(M.css("left")),Fe=parseInt(M.css("top")),g(y.body).css("user-select","none"))}),g(y).on("mousemove.yytWindowDrag"+e,xe=>{if(!re)return;let Ne=xe.clientX-Te,Ge=xe.clientY-Ue;M.css({left:Math.max(0,Y+Ne)+"px",top:Math.max(0,Fe+Ge)+"px"})}),g(y).on("mouseup.yytWindowDrag"+e,()=>{re&&(re=!1,g(y.body).css("user-select",""))}),i){let xe=!1,Ne="",Ge,ns,Je,js,Lo,Oo;M.find(".yyt-window-resize-handle").on("mousedown",function(Gt){j||(xe=!0,Ne="",g(this).hasClass("se")?Ne="se":g(this).hasClass("e")?Ne="e":g(this).hasClass("s")?Ne="s":g(this).hasClass("w")?Ne="w":g(this).hasClass("n")?Ne="n":g(this).hasClass("nw")?Ne="nw":g(this).hasClass("ne")?Ne="ne":g(this).hasClass("sw")&&(Ne="sw"),Ge=Gt.clientX,ns=Gt.clientY,Je=M.width(),js=M.height(),Lo=parseInt(M.css("left")),Oo=parseInt(M.css("top")),g(y.body).css("user-select","none"),Gt.stopPropagation())}),g(y).on("mousemove.yytWindowResize"+e,Gt=>{if(!xe)return;let as=Gt.clientX-Ge,is=Gt.clientY-ns,Ws=400,jn=300,$o=Je,Ir=js,ls=Lo,Wn=Oo;if(Ne.includes("e")&&($o=Math.max(Ws,Je+as)),Ne.includes("s")&&(Ir=Math.max(jn,js+is)),Ne.includes("w")){let cs=Je-as;cs>=Ws&&($o=cs,ls=Lo+as)}if(Ne.includes("n")){let cs=js-is;cs>=jn&&(Ir=cs,Wn=Oo+is)}M.css({width:$o+"px",height:Ir+"px",left:ls+"px",top:Wn+"px"})}),g(y).on("mouseup.yytWindowResize"+e,()=>{xe&&(xe=!1,g(y.body).css("user-select",""))})}return M.on("remove",()=>{g(y).off(".yytWindowDrag"+e),g(y).off(".yytWindowResize"+e)}),p&&setTimeout(()=>p(M),50),M}function hm(t){let e=yt.getWindow(t);if(e){let r=window.jQuery||window.parent?.jQuery;if(r){let s=Bt();r(`.yyt-window-overlay[data-for="${t}"]`).remove(),r(s).off(".yytWindowDrag"+t),r(s).off(".yytWindowResize"+t)}e.remove(),yt.unregister(t)}}function OS(t){return typeof t!="string"?"":t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}var NS,DS,mm,wi,yt,sd=D(()=>{je();H();tt();NS=E.createScope("WindowManager"),DS="youyou_toolkit_window_manager",mm="window_states",wi=class{constructor(){this.windows=new Map,this.baseZIndex=1e4,this.topZIndex=1e4,this.stylesInjected=!1}register(e,r){this.topZIndex++,this.windows.set(e,{$el:r,zIndex:this.topZIndex}),r.css("z-index",this.topZIndex)}unregister(e){this.windows.delete(e)}bringToFront(e){let r=this.windows.get(e);r&&(this.topZIndex++,r.zIndex=this.topZIndex,r.$el.css("z-index",this.topZIndex))}getWindow(e){return this.windows.get(e)?.$el||null}isOpen(e){return this.windows.has(e)}closeAll(){this.windows.forEach((e,r)=>{e.$el&&e.$el.remove()}),this.windows.clear()}saveState(e,r){let s=this.loadStates();s[e]={...r,updatedAt:Date.now()},Yn.set(mm,s)}loadStates(){return Yn.get(mm)||{}}getState(e){return this.loadStates()[e]||null}},yt=new wi});function Z(){return nd||(nd=E.createScope("TableDataEditor")),nd}function Be(){k.isDirty=!0;try{k._refs.saveBtn?.setDisabled(!1),k._refs.dirtyBadge&&(k._refs.dirtyBadge.style.display="inline-flex")}catch{}}function vm(){k.isDirty=!1;try{k._refs.saveBtn?.setDisabled(!0),k._refs.dirtyBadge&&(k._refs.dirtyBadge.style.display="none")}catch{}}function at(){let t=Array.isArray(k.tempData)?k.tempData:[],e=k.currentTableIndex;return e>=0&&e<t.length?t[e]:null}function BS(){if(!ad)try{let t=window.parent&&window.parent.document?window.parent.document:document,e=t.head||t.documentElement;if(e.querySelector("#yyt-tde-styles")){ad=!0;return}let r=t.createElement("style");r.id="yyt-tde-styles",r.textContent=$S,e.appendChild(r),ad=!0}catch(t){Z().warn("\u6CE8\u5165\u6570\u636E\u7F16\u8F91\u5668\u6837\u5F0F\u5931\u8D25",t)}}function ld(){let t=[],e=null,r=!1,s=k._afterSaveGlobalAt&&Date.now()-k._afterSaveGlobalAt<5*60*1e3;try{let o=zs(null);Z().info("loadEditorData snapshot",{hasSnapshot:!!o,messageId:o?.message?.message_id??o?.sourceMessageId,chatId:o?.chatId,isolationKey:o?.tableState?.meta?.isolationKey,hasTableState:!!o?.tableState,tableStateTablesLen:Array.isArray(o?.tableState?.tables)?o.tableState.tables.length:null,firstTableNameInSlot:o?.tableState?.tables?.[0]?.name,afterSaveGlobalRecent:s}),!s&&Array.isArray(o?.tableState?.tables)&&o.tableState.tables.length>0&&(t=o.tableState.tables),e=o?{chatId:o.chatId||"",sourceMessageId:o.sourceMessageId||o.message?.message_id||"",sourceSwipeId:o.sourceSwipeId||"",effectiveSwipeId:o.effectiveSwipeId||"",slotBindingKey:o.slotBindingKey||"",slotRevisionKey:o.slotRevisionKey||"",slotTransactionId:o.slotTransactionId||"",traceId:o.traceId||"",targetMessageIndex:o.targetMessageIndex??-1}:null}catch(o){Z().warn("loadEditorData \u5F02\u5E38",o)}if(t.length===0)try{let n=To({})?.template?.tables;Array.isArray(n)&&n.length>0&&(t=ce(n),r=!0)}catch(o){Z().warn("\u4ECE\u6A21\u677F fallback \u5931\u8D25",o)}k.tempData=ce(t)||[],k.targetSnapshot=e,k.isDirty=!1,k.isFromTemplate=r,k._pendingMirrorTag=null,k.currentTableIndex>=k.tempData.length?k.currentTableIndex=k.tempData.length>0?0:-1:k.currentTableIndex<0&&k.tempData.length>0&&(k.currentTableIndex=0)}function zS(){let t=f("div",{className:"yyt-tde-toolbar"}),e=f("div",{className:"yyt-tde-toolbar-left"}),r=f("div",{className:"yyt-tde-mode-switch"}),s=[{key:"data",label:"\u6570\u636E\u7F16\u8F91"},{key:"schema",label:"\u7ED3\u6784\u914D\u7F6E"},{key:"global",label:"\u5168\u5C40\u6CE8\u5165"}];for(let c of s){let u=X({label:c.label,variant:k.mode===c.key?"primary":"ghost",size:"small",onClick:()=>{k.mode!==c.key&&(k.mode=c.key,Qe())}});r.appendChild(u.el)}e.appendChild(r);let o=f("span",{className:"yyt-tde-dirty-badge",text:"\u672A\u4FDD\u5B58"});k.isDirty&&(o.style.display="inline-flex"),e.appendChild(o),k._refs.dirtyBadge=o;let n=f("div",{className:"yyt-tde-actions"}),a=X({label:"\u91CD\u65B0\u52A0\u8F7D",icon:"\u21BB",size:"small",onClick:qS}),i=X({label:"\u4FDD\u5B58\u5230 chat",icon:"\u{1F4BE}",size:"small",disabled:!k.isDirty,title:"\u4FDD\u5B58\u5230\u5F53\u524D\u6D88\u606F\u7684 slot",onClick:YS});k._refs.saveBtn=i;let l=X({label:"\u4FDD\u5B58\u5230\u5168\u5C40",icon:"\u{1F310}",size:"small",title:"\u4FDD\u5B58\u5230\u5168\u5C40\u6FC0\u6D3B\u6A21\u677F\uFF08\u5F71\u54CD\u6240\u6709 chat \u540E\u7EED\u586B\u8868\uFF09",onClick:VS});k._refs.saveGlobalBtn=l;let d=X({label:"\u7ACB\u5373\u586B\u8868",icon:"\u25B6",variant:"primary",size:"small",onClick:JS});return n.appendChild(a.el),n.appendChild(i.el),n.appendChild(l.el),n.appendChild(d.el),t.appendChild(e),t.appendChild(n),t}function KS(){let t=f("div",{className:"yyt-tde-sidebar"}),e=k.tempData||[];t.appendChild(f("div",{className:"yyt-tde-sidebar-label",text:`\u8868\u683C\u5217\u8868 (${e.length})`}));let r=f("div",{className:"yyt-tde-sheet-list"});return e.length===0?r.appendChild(f("div",{text:"\u6682\u65E0\u8868",style:{padding:"8px 10px",fontSize:"11px",color:"var(--tde-text-muted)"}})):e.forEach((s,o)=>{let n=o===k.currentTableIndex,a=s?.name||`\u8868 ${o+1}`,i=Array.isArray(s?.rows)?s.rows.length:0,l=f("div",{className:`yyt-tde-sheet-row${n?" active":""}`}),d=f("div",{className:"yyt-tde-sheet-pick"});d.appendChild(f("span",{className:"yyt-tde-sheet-idx",text:`[${o}]`})),d.appendChild(f("span",{className:"yyt-tde-sheet-name",text:a})),d.appendChild(f("span",{className:"yyt-tde-sheet-count",text:String(i)})),d.addEventListener("click",()=>{k.currentTableIndex!==o&&(k.currentTableIndex=o,Qe())}),l.appendChild(d);let c=f("div",{className:"yyt-tde-sheet-actions"});c.appendChild(X({label:"\u2191",size:"small",variant:"ghost",disabled:o===0,title:"\u4E0A\u79FB",onClick:()=>wm(o,-1)}).el),c.appendChild(X({label:"\u2193",size:"small",variant:"ghost",disabled:o===e.length-1,title:"\u4E0B\u79FB",onClick:()=>wm(o,1)}).el),c.appendChild(X({label:"\xD7",size:"small",variant:"danger",title:"\u5220\u9664\u6B64\u8868",onClick:()=>XS(o)}).el),l.appendChild(c),r.appendChild(l)}),t.appendChild(r),t.appendChild(X({label:"+ \u6DFB\u52A0\u65B0\u8868",size:"small",variant:"ghost",onClick:QS}).el),t}function US(){let t=f("main",{className:"yyt-tde-main"}),e=k.tempData||[];if(k.mode==="global")return t.appendChild(WS()),t;if(e.length===0)return t.appendChild(f("div",{className:"yyt-tde-empty",html:'\u5F53\u524D slot \u6CA1\u6709\u8868\u6570\u636E\uFF0C\u6A21\u677F\u4E5F\u672A\u914D\u7F6E\u8868\u3002<br>\u8BF7\u5148\u5728\u5DE5\u4F5C\u53F0\u70B9"\u7ACB\u5373\u586B\u8868"\u8BA9 AI \u521D\u59CB\u5316\uFF0C\u6216\u5230\u300C\u9884\u8BBE\u7BA1\u7406 \u2192 \u8868\u683C\u6A21\u677F\u300D\u914D\u7F6E\u6A21\u677F\u3002'})),t;let r=at();return r?(k.mode==="data"?t.appendChild(FS(r)):k.mode==="schema"&&t.appendChild(jS(r)),t):(t.appendChild(f("div",{className:"yyt-tde-empty",text:"\u8BF7\u4ECE\u5DE6\u4FA7\u9009\u62E9\u4E00\u5F20\u8868\u3002"})),t)}function FS(t){let e=f("div"),r=Array.isArray(t?.columns)?t.columns:[],s=Array.isArray(t?.rows)?t.rows:[],o=k.targetSnapshot?.chatId||"",n=t?.uid||t?.id||"",a={cols:{},rows:{},cells:{},indexCol:!1};try{a=Po({chatId:o,isolationKey:de.getKey()},n)||a}catch{}let i=a?.rows||{},l=a?.cells||{};k.isFromTemplate&&e.appendChild(f("div",{className:"yyt-tde-schema-hint",html:'\u5F53\u524D\u663E\u793A<b>\u6A21\u677F\u9ED8\u8BA4\u7ED3\u6784</b>\uFF08slot \u5C1A\u65E0\u6570\u636E\uFF09\u3002\u76F4\u63A5\u6DFB\u52A0\u884C\u6216\u7F16\u8F91\u4F1A\u521B\u5EFA slot \u6570\u636E\uFF1B\u6216\u5DE5\u4F5C\u53F0\u70B9"\u7ACB\u5373\u586B\u8868"\u8BA9 AI \u586B\u3002'}));let d=f("div",{className:"yyt-tde-card-grid"});s.forEach((u,p)=>{let y=u?.cells||{},m=!!i[p],g=f("article",{className:`yyt-tde-card${m?" yyt-tde-row-locked":""}`}),h=f("header",{className:"yyt-tde-card-header"});h.appendChild(f("span",{className:"yyt-tde-card-index",text:`#${p+1}`}));let x=f("div",{className:"yyt-tde-card-name-slot"}),S=he({value:u?.name||"",placeholder:"\u884C\u540D",disabled:m,onInput:C=>{let w=at();w?.rows?.[p]&&(w.rows[p].name=C,Be())}});x.appendChild(S.el),h.appendChild(x);let T=f("div",{className:"yyt-tde-card-actions"});T.appendChild(X({label:m?"\u{1F512}":"\u{1F513}",size:"small",variant:m?"danger":"ghost",title:m?"\u5DF2\u9501\u5B9A\u6B64\u884C\uFF08\u70B9\u51FB\u89E3\u9501\uFF09":"\u9501\u5B9A\u6B64\u884C\uFF08AI \u4E0D\u4F1A\u6539\uFF09",onClick:()=>ZS(n,p)}).el),T.appendChild(X({label:"\u{1F5D1}",size:"small",variant:"danger",disabled:m,title:"\u5220\u9664\u884C",onClick:()=>t0(p)}).el),h.appendChild(T),g.appendChild(h);let A=f("div",{className:"yyt-tde-card-body"});r.length===0?A.appendChild(f("div",{text:"\u8BE5\u8868\u6CA1\u6709\u5217\u5B9A\u4E49",style:{padding:"8px",color:"var(--tde-text-muted)",fontSize:"12px"}})):r.forEach(C=>{let w=C?.key||"",P=C?.title||w,B=y[w],z=B==null||B==="",R=z?"\uFF08\u7A7A\uFF09":String(B),_=!!l[`${p}::${w}`],M=f("div",{className:`yyt-tde-field${_?" yyt-tde-cell-locked":""}`}),j=f("div",{className:"yyt-tde-field-label"});j.appendChild(f("span",{text:P})),j.appendChild(X({label:_?"\u{1F512}":"\u{1F513}",size:"small",variant:_?"danger":"ghost",title:_?"\u5DF2\u9501\u5B9A\u6B64\u5355\u5143\u683C":"\u9501\u5B9A\u6B64\u5355\u5143\u683C\uFF08AI \u4E0D\u4F1A\u6539\uFF09",onClick:()=>e0(n,p,w)}).el),M.appendChild(j);let q=f("div",{className:`yyt-tde-field-cell${z?" yyt-tde-field-cell--empty":""}${_?" yyt-tde-cell-locked-bg":""}`,text:R,attrs:{contenteditable:_?"false":"true"}});q.addEventListener("input",()=>{let ue=at();ue?.rows?.[p]&&(ue.rows[p].cells||(ue.rows[p].cells={}),ue.rows[p].cells[w]=q.textContent,Be())}),M.appendChild(q),A.appendChild(M)}),g.appendChild(A),d.appendChild(g)});let c=f("div",{className:"yyt-tde-card-add"});return c.appendChild(X({label:"+ \u6DFB\u52A0\u884C",variant:"ghost",onClick:r0}).el),d.appendChild(c),e.appendChild(d),e}function jS(t){let e=f("div"),r=Array.isArray(t?.columns)?t.columns:[],s=t?.sourceData||{},o=t?.aiInstructions||{},n=t?.updateConfig||{},a=k.targetSnapshot?.chatId||"",i=t?.uid||t?.id||"",l={cols:{},rows:{},cells:{},indexCol:!1};try{l=Po({chatId:a,isolationKey:de.getKey()},i)||l}catch{}let d=l?.cols||{},c=f("div",{className:"yyt-tde-schema-section"});c.appendChild(f("div",{className:"yyt-tde-schema-heading",text:"\u57FA\u7840\u4FE1\u606F"}));let u=f("div",{className:"yyt-tde-schema-row"});u.appendChild(f("div",{className:"yyt-tde-schema-key",text:"\u8868\u540D"}));let p=f("div",{className:"yyt-tde-schema-value"});p.appendChild(he({value:t?.name||"",onInput:B=>{let z=at();z&&(z.name=B,Be())}}).el),u.appendChild(p),c.appendChild(u);let y=f("div",{className:"yyt-tde-schema-row"});y.appendChild(f("div",{className:"yyt-tde-schema-key",text:"UID"})),y.appendChild(f("code",{text:t?.uid||t?.id||"",style:{fontSize:"11px",color:"var(--tde-accent)"}})),c.appendChild(y);let m=f("div",{className:"yyt-tde-schema-row",style:{alignItems:"flex-start"}});m.appendChild(f("div",{className:"yyt-tde-schema-key",text:"\u8868\u8BF4\u660E"}));let g=f("div",{className:"yyt-tde-schema-value"});g.appendChild(vi({value:t?.note||s?.note||"",placeholder:"\u8868\u7528\u9014\u8BF4\u660E + \u5217\u6CE8\u91CA",onInput:B=>{let z=at();z&&(z.note=B,Be())}})),m.appendChild(g),c.appendChild(m),e.appendChild(c);let h=f("div",{className:"yyt-tde-schema-section"});h.appendChild(f("div",{className:"yyt-tde-schema-heading",text:"AI \u64CD\u4F5C\u8BF4\u660E (sourceData)"}));let x=[{key:"init",label:"\u521D\u59CB\u5316 (init)",placeholder:"\u8868\u4E3A\u7A7A\u65F6 AI \u5E94\u8BE5\u63D2\u5165\u4EC0\u4E48",legacy:"initNode"},{key:"create",label:"\u65B0\u589E (insert)",placeholder:"\u4EC0\u4E48\u60C5\u51B5\u4E0B AI \u5E94\u8BE5\u65B0\u589E\u884C",legacy:"insertNode"},{key:"update",label:"\u66F4\u65B0 (update)",placeholder:"\u4EC0\u4E48\u60C5\u51B5\u4E0B AI \u5E94\u8BE5\u66F4\u65B0\u884C",legacy:"updateNode"},{key:"delete",label:"\u5220\u9664 (delete)",placeholder:"\u4EC0\u4E48\u60C5\u51B5\u4E0B AI \u5E94\u8BE5\u5220\u9664\u884C",legacy:"deleteNode"}];for(let B of x){let z=f("div",{className:"yyt-tde-schema-row",style:{alignItems:"flex-start"}});z.appendChild(f("div",{className:"yyt-tde-schema-key",text:B.label}));let R=f("div",{className:"yyt-tde-schema-value"});R.appendChild(vi({value:o?.[B.key]||s?.[B.legacy]||"",placeholder:B.placeholder,onInput:_=>{let M=at();M&&(M.aiInstructions=M.aiInstructions||{},M.aiInstructions[B.key]=_,Be())}})),z.appendChild(R),h.appendChild(z)}e.appendChild(h);let S=f("div",{className:"yyt-tde-schema-section"});S.appendChild(f("div",{className:"yyt-tde-schema-heading",text:"\u66F4\u65B0\u914D\u7F6E (updateConfig)"})),S.appendChild(f("div",{className:"yyt-tde-hint",style:{marginBottom:"8px",fontSize:"11px",color:"var(--tde-text-muted)"},html:"<strong>\u8BF4\u660E</strong>\uFF1A\u8FD9\u91CC\u914D\u7F6E AI \u586B\u8868\u65F6\u8FD9\u5F20\u8868\u7684\u884C\u4E3A\uFF08\u9891\u7387\u3001\u4E0A\u4E0B\u6587\u6DF1\u5EA6\u3001token \u8282\u7701\uFF09\u3002\u8DDF\u300C\u4E16\u754C\u4E66\u6CE8\u5165\u300D\u662F\u4E24\u4EF6\u4E8B\uFF1A\u4E16\u754C\u4E66\u662F\u628A\u8868\u6570\u636E\u585E\u8FDB prompt \u7ED9\u4E3B AI \u770B\uFF08\u5408\u5E76\u6761\u76EE / \u72EC\u7ACB\u6761\u76EE\u5728<strong>\u5168\u5C40\u6CE8\u5165</strong> tab \u914D\uFF09\uFF0C\u8FD9\u91CC\u662F\u63A7\u5236<strong>\u586B\u8868\u65F6\u673A</strong>\uFF08\u591A\u4E45\u586B\u4E00\u6B21\u3001\u8DF3\u8FC7\u51E0\u5C42\u7B49\uFF09\u3002-1 = \u6CBF\u7528\u5168\u5C40\uFF0C0 = \u7981\u7528\u5355\u8868\u3002"}));let T=f("div",{className:"yyt-tde-uc-grid"}),A=[{key:"contextDepth",label:"\u4E0A\u4E0B\u6587\u6DF1\u5EA6 (contextDepth)",hint:"-1 = \u6CBF\u7528\u5168\u5C40\uFF0C0 = \u7981\u7528\uFF0CN = \u6700\u8FD1 N \u6761\u6D88\u606F"},{key:"updateFrequency",label:"\u66F4\u65B0\u9891\u7387 (updateFrequency)",hint:"-1 = \u6CBF\u7528\u5168\u5C40\uFF0C0 = \u7981\u7528\u81EA\u52A8\u586B\u8868\uFF0CN = \u6BCF N \u6761\u6D88\u606F\u89E6\u53D1\u4E00\u6B21"},{key:"batchSize",label:"\u6279\u6B21\u5927\u5C0F (batchSize)",hint:"-1 = \u6CBF\u7528\u5168\u5C40\uFF0CN = \u5355\u6B21\u6700\u591A\u5904\u7406 N \u5F20\u8868"},{key:"skipFloors",label:"\u8DF3\u8FC7\u697C\u5C42 (skipFloors)",hint:"-1 = \u6CBF\u7528\u5168\u5C40\uFF0CN = \u8DF3\u8FC7\u6700\u8FD1 N \u5C42"},{key:"sendLatestRows",label:"\u53D1\u9001\u6700\u65B0 N \u884C (sendLatestRows)",hint:"-1 = \u5168\u90E8\u53D1\u9001\uFF0C0 = \u6CBF\u7528\u5168\u5C40\uFF0CN = \u4EC5\u53D1\u9001\u6700\u65B0 N \u884C\uFF08\u5927\u8868 token \u8282\u7701\uFF09"}];for(let B of A){let z=f("div",{className:"yyt-tde-uc-cell"});z.appendChild(f("label",{text:B.label})),z.appendChild(he({type:"number",value:Number.isFinite(n?.[B.key])?String(n[B.key]):"-1",onInput:R=>{let _=at();if(!_)return;_.updateConfig=_.updateConfig||{};let M=Number(R);_.updateConfig[B.key]=Number.isFinite(M)?M:-1,Be()}}).el),z.appendChild(f("span",{className:"yyt-tde-hint",text:B.hint})),T.appendChild(z)}let C=f("div",{className:"yyt-tde-uc-cell"});C.appendChild(f("label",{text:"\u5206\u7EC4 ID (groupId)"})),C.appendChild(he({value:n?.groupId||"",placeholder:"\u540C\u7EC4 ID \u7684\u8868\u4F1A\u5408\u5E76\u89E6\u53D1",onInput:B=>{let z=at();z&&(z.updateConfig=z.updateConfig||{},z.updateConfig.groupId=B,Be())}}).el),C.appendChild(f("span",{className:"yyt-tde-hint",text:"\u540C\u7EC4\u540C\u65F6\u89E6\u53D1\uFF0C\u8DE8\u7EC4\u5E76\u884C\uFF08\u7559\u7A7A = \u72EC\u7ACB\u89E6\u53D1\uFF09"})),T.appendChild(C);let w=f("div",{className:"yyt-tde-uc-cell yyt-tde-uc-cell-wide"});w.appendChild(f("label",{text:"\u8868\u7EA7 API \u9884\u8BBE\u8986\u76D6"})),w.appendChild(he({value:n?.apiPreset||"",placeholder:"\u7559\u7A7A = \u6CBF\u7528\u5168\u5C40\uFF0C\u586B\u9884\u8BBE\u540D = \u8FD9\u5F20\u8868\u7528\u8FD9\u4E2A",onInput:B=>{let z=at();z&&(z.updateConfig=z.updateConfig||{},z.updateConfig.apiPreset=B,Be())}}).el),w.appendChild(f("span",{className:"yyt-tde-hint",text:"\u4F8B\uFF1A\u89D2\u8272\u8868\u7528 Claude\u3001\u7EAA\u8981\u8868\u7528 GPT"})),T.appendChild(w),S.appendChild(T),e.appendChild(S);let P=f("div",{className:"yyt-tde-schema-section"});return P.appendChild(f("div",{className:"yyt-tde-schema-heading",text:`\u5B57\u6BB5\u5B9A\u4E49 (${r.length})`})),r.length===0?P.appendChild(f("div",{text:"\u65E0\u5B57\u6BB5",style:{color:"var(--tde-text-muted)",fontSize:"12px",padding:"8px 0"}})):r.forEach((B,z)=>{let R=B?.key||"",_=R?!!d[R]:!1,M=f("div",{className:`yyt-tde-schema-field${_?" locked":""}`}),j=f("div",{className:"yyt-tde-schema-field-head"});j.appendChild(f("span",{className:"yyt-tde-schema-idx",text:`[${z}]`}));let q=f("div",{className:"yyt-tde-field-input-title"});q.appendChild(he({value:B?.title||B?.key||"",placeholder:"\u5B57\u6BB5\u6807\u9898",onInput:Te=>{let Ue=at();Ue?.columns?.[z]&&(Ue.columns[z].title=Te,Be())}}).el),j.appendChild(q);let ue=f("div",{className:"yyt-tde-field-input-key"}),pe=he({value:B?.key||"",placeholder:"key",style:{fontFamily:"monospace"},onInput:Te=>{let Ue=at();Ue?.columns?.[z]&&(Ue.columns[z].key=Te,Be())}});ue.appendChild(pe.el),j.appendChild(ue);let re=f("div",{className:"yyt-tde-field-input-type"});re.appendChild(Re({value:B?.type||"text",options:["text","number","boolean","date","json"].map(Te=>({value:Te,label:Te})),onChange:Te=>{let Ue=at();Ue?.columns?.[z]&&(Ue.columns[z].type=Te,Be())}}).el),j.appendChild(re),j.appendChild(X({label:_?"\u{1F512}":"\u{1F513}",size:"small",variant:_?"danger":"ghost",title:_?"\u5DF2\u9501\u5B9A\uFF1AAI \u4E0D\u4F1A\u6539\u8FD9\u5217\u3002\u70B9\u51FB\u89E3\u9501":"\u9501\u5B9A\u6B64\u5217\uFF1AAI \u6C38\u4E0D\u4FEE\u6539",onClick:()=>s0(i,R)}).el),j.appendChild(X({label:"\u{1F5D1}",size:"small",variant:"danger",title:"\u5220\u9664\u6B64\u5B57\u6BB5",onClick:()=>o0(z)}).el),M.appendChild(j),M.appendChild(vi({value:B?.description||"",placeholder:"\u5B57\u6BB5\u63CF\u8FF0",minHeight:"32px",onInput:Te=>{let Ue=at();Ue?.columns?.[z]&&(Ue.columns[z].description=Te,Be())}})),P.appendChild(M)}),P.appendChild(X({label:"+ \u6DFB\u52A0\u5B57\u6BB5",variant:"ghost",onClick:n0}).el),e.appendChild(P),e}function WS(){let t=f("div"),e=Array.isArray(k.tempData)?k.tempData:[];if(t.appendChild(f("div",{className:"yyt-tde-schema-hint",style:{background:"rgba(74,158,255,0.08)",borderColor:"rgba(74,158,255,0.3)"},html:"<strong>\u5168\u5C40\u6CE8\u5165\u914D\u7F6E</strong> \u2014 \u6BCF\u5F20\u8868\u7684 exportConfig\uFF08\u72EC\u7ACB\u4E16\u754C\u4E66\u6761\u76EE\uFF09+ placement\uFF08\u6CE8\u5165\u4F4D\u7F6E/\u6DF1\u5EA6/\u987A\u5E8F\uFF09\u3002\u672A\u542F\u7528\u300C\u72EC\u7ACB\u6CE8\u5165\u300D\u7684\u8868\u4F1A\u8D70\u5168\u5C40 wrapper\uFF08\u5DE5\u4F5C\u53F0\u300C\u540C\u6B65\u5230\u4E16\u754C\u4E66\u300D\u5F00\u5173\uFF09\u3002"})),e.length===0)return t.appendChild(f("div",{className:"yyt-tde-empty",text:"\u65E0\u8868\u683C\u53EF\u914D\u7F6E\u3002\u8BF7\u5148\u6DFB\u52A0\u8868\u683C\u3002"})),t;let r="yyt-table-workbench";try{r=Pe()?.mirrorTag||r}catch{}let s=f("div",{className:"yyt-tde-schema-section"});s.appendChild(f("div",{className:"yyt-tde-schema-heading",text:"\u5199\u56DE\u6B63\u6587\u6807\u7B7E"}));let o=f("div",{className:"yyt-tde-uc-grid"}),n=f("div",{className:"yyt-tde-uc-cell yyt-tde-uc-cell-wide"});return n.appendChild(f("label",{text:"mirrorTag"})),n.appendChild(he({value:r,placeholder:"\u9ED8\u8BA4: yyt-table-workbench",onInput:a=>{k._pendingMirrorTag=a,Be()}}).el),n.appendChild(f("span",{className:"yyt-tde-hint",text:"\u5F00\u542F\u5199\u56DE\u6B63\u6587\u65F6\uFF0C\u7528\u6B64 XML \u6807\u7B7E\u5305\u88F9\u8868\u683C\u6570\u636E\u6CE8\u5165\u5230 assistant \u6D88\u606F"})),o.appendChild(n),s.appendChild(o),t.appendChild(s),e.forEach((a,i)=>{t.appendChild(HS(a,i))}),t}function HS(t,e){let r=t?.exportConfig||{},s=r.entryPlacement||{},o=r.extraIndexPlacement||{},n=r.enabled===!0,a=f("div",{className:"yyt-tde-global-card"}),i=f("div",{className:"yyt-tde-global-card-head"});i.appendChild(f("span",{className:"yyt-tde-global-card-name",text:t?.name||`\u8868 ${e+1}`}));let l=wt({label:"\u542F\u7528\u72EC\u7ACB\u6CE8\u5165",checked:n,onChange:p=>{let y=k.tempData?.[e];y&&(y.exportConfig=y.exportConfig||{},y.exportConfig.enabled=p,Be(),Qe())}});i.appendChild(l.el),a.appendChild(i);let d=f("div",{className:`yyt-tde-global-card-body${n?"":" yyt-tde-disabled-section"}`}),c=f("div",{className:"yyt-tde-uc-grid"});c.appendChild(ss({label:"\u6761\u76EE\u540D (entryName)",control:he({value:r.entryName||t?.name||"",onInput:p=>No(e,"entryName",p)})})),c.appendChild(ss({label:"\u6761\u76EE\u7C7B\u578B (entryType)",control:Re({value:r.entryType||"constant",options:[{value:"constant",label:"constant (\u5E38\u9A7B)"},{value:"keyword",label:"keyword (\u5173\u952E\u8BCD\u89E6\u53D1)"}],onChange:p=>No(e,"entryType",p)})})),c.appendChild(ss({label:"\u89E6\u53D1\u5173\u952E\u8BCD (keywords)",wide:!0,control:he({value:r.keywords||"",placeholder:"\u7528\u9017\u53F7\u6216\u6362\u884C\u5206\u9694",onInput:p=>No(e,"keywords",p)})})),c.appendChild(ss({label:"\u6309\u884C\u62C6\u5206 (splitByRow)",control:Re({value:r.splitByRow?"true":"false",options:[{value:"false",label:"\u5426\uFF08\u6574\u5F20\u8868\u4E00\u4E2A\u6761\u76EE\uFF09"},{value:"true",label:"\u662F\uFF08\u6BCF\u884C\u4E00\u4E2A\u6761\u76EE\uFF09"}],onChange:p=>No(e,"splitByRow",p==="true")})})),c.appendChild(ss({label:"\u9632\u9012\u5F52 (preventRecursion)",control:Re({value:r.preventRecursion===!1?"false":"true",options:[{value:"true",label:"\u662F"},{value:"false",label:"\u5426"}],onChange:p=>No(e,"preventRecursion",p!=="false")})}));let u=f("div",{className:"yyt-tde-uc-cell yyt-tde-uc-cell-wide"});return u.appendChild(f("label",{text:"\u6CE8\u5165\u6A21\u677F (injectionTemplate)"})),u.appendChild(vi({value:r.injectionTemplate||"",placeholder:"\u4F8B\uFF1A\u4EE5\u4E0B\u662F {{tableName}} \u7684\u6700\u65B0\u6570\u636E\uFF1A{{tableContent}}",onInput:p=>No(e,"injectionTemplate",p)})),c.appendChild(u),d.appendChild(c),d.appendChild(f("div",{className:"yyt-tde-schema-heading",style:{marginTop:"12px"},text:"\u6761\u76EE\u4F4D\u7F6E (entryPlacement)"})),d.appendChild(xm(e,"entryPlacement",s)),d.appendChild(f("div",{className:"yyt-tde-schema-heading",style:{marginTop:"12px"},text:"\u989D\u5916\u7D22\u5F15\u4F4D\u7F6E (extraIndexPlacement\uFF0C\u53EF\u9009)"})),d.appendChild(xm(e,"extraIndexPlacement",o)),a.appendChild(d),a}function xm(t,e,r){let s=f("div",{className:"yyt-tde-uc-grid"}),o=["before_character_definition","after_character_definition","before_authors_note","after_authors_note"];return s.appendChild(ss({label:"position",control:Re({value:r.position||"before_character_definition",options:o.map(n=>({value:n,label:n})),onChange:n=>id(t,e,"position",n)})})),s.appendChild(ss({label:"depth",control:he({type:"number",value:Number.isFinite(r.depth)?String(r.depth):"2",onInput:n=>id(t,e,"depth",Number(n)||0)})})),s.appendChild(ss({label:"order",control:he({type:"number",value:Number.isFinite(r.order)?String(r.order):"0",onInput:n=>id(t,e,"order",Number(n)||0)})})),s}function ss({label:t,control:e,wide:r=!1,hint:s=null}){let o=f("div",{className:`yyt-tde-uc-cell${r?" yyt-tde-uc-cell-wide":""}`});return o.appendChild(f("label",{text:t})),o.appendChild(e.el),s&&o.appendChild(f("span",{className:"yyt-tde-hint",text:s})),o}function vi({value:t="",placeholder:e="",minHeight:r="60px",onInput:s=null}={}){let o=f("textarea",{className:"yyt-textarea",attrs:{placeholder:e},style:{minHeight:r}});return o.value=t,typeof s=="function"&&o.addEventListener("input",()=>s(o.value)),o}function No(t,e,r){let s=k.tempData?.[t];s&&(s.exportConfig=s.exportConfig||{},s.exportConfig[e]=r,Be())}function id(t,e,r,s){let o=k.tempData?.[t];o&&(o.exportConfig=o.exportConfig||{},o.exportConfig[e]=o.exportConfig[e]||{},o.exportConfig[e][r]=s,Be())}function GS(){let t=f("div",{className:"yyt-tde"});t.appendChild(zS());let e=f("div",{className:"yyt-tde-content"});return e.appendChild(KS()),e.appendChild(US()),t.appendChild(e),t}function Qe(){if(!k.$window)return;let t=k.$window.find(".yyt-window-body");if(!t||!t.length)return;let e=t[0];e.innerHTML="",e.appendChild(GS())}function qS(){if(k.isDirty&&!window.confirm("\u6709\u672A\u4FDD\u5B58\u4FEE\u6539\uFF0C\u91CD\u65B0\u52A0\u8F7D\u5C06\u4E22\u5F03\uFF0C\u786E\u5B9A\uFF1F"))return;let t=k.tempData?.[0];Z().info("reload \u89E6\u53D1",{before:{tableCount:k.tempData?.length,firstName:t?.name,firstAiInit:t?.aiInstructions?.init?.slice(0,50),firstUcFreq:t?.updateConfig?.updateFrequency},targetSnapshot:{messageId:k.targetSnapshot?.sourceMessageId,isFromTemplate:k.isFromTemplate}}),ld();let e=k.tempData?.[0];Z().info("reload \u5B8C\u6210",{after:{tableCount:k.tempData?.length,firstName:e?.name,firstAiInit:e?.aiInstructions?.init?.slice(0,50),firstUcFreq:e?.updateConfig?.updateFrequency,isFromTemplate:k.isFromTemplate}}),Qe(),Z().info("\u5DF2\u91CD\u65B0\u52A0\u8F7D",null,{toast:"success"})}async function YS(){if(!k.isDirty){Z().info("\u6CA1\u6709\u4FEE\u6539",null,{toast:!0});return}try{let t=k.targetSnapshot;if(t?.sourceMessageId||(t=await Oc()),!t?.sourceMessageId){Z().error("\u65E0\u6CD5\u5B9A\u4F4D\u5F53\u524D\u6D88\u606F\uFF08\u627E\u4E0D\u5230 assistant \u6D88\u606F\uFF09",null,{toast:!0});return}let e=await pi(t,{tables:ce(k.tempData)||[],meta:{source:"data-editor-manual-save"}},{skipFreshValidation:!0});Z().info("save-chat commitBoundState \u7ED3\u679C",{success:e?.success,error:e?.error,commitMessageId:e?.sourceMessageId,commitSlotRevisionKey:e?.slotRevisionKey,stateTablesLen:Array.isArray(e?.state?.tables)?e.state.tables.length:null,firstTableInState:e?.state?.tables?.[0]?.name,firstAiInitInState:e?.state?.tables?.[0]?.aiInstructions?.init?.slice(0,50)}),e?.success?(vm(),k.targetSnapshot={chatId:e.state?.chatId||t.chatId,sourceMessageId:e.sourceMessageId,sourceSwipeId:e.state?.sourceSwipeId||t.sourceSwipeId,effectiveSwipeId:t.effectiveSwipeId,slotBindingKey:e.state?.slotBindingKey||t.slotBindingKey,slotRevisionKey:e.slotRevisionKey,slotTransactionId:t.slotTransactionId,traceId:t.traceId,targetMessageIndex:e.messageIndex??t.targetMessageIndex},Array.isArray(e?.state?.tables)&&(k.tempData=ce(e.state.tables)||[],k.isFromTemplate=!1),k._afterSaveGlobalAt=0,Z().info("\u5DF2\u4FDD\u5B58\u5230 chat",null,{toast:"success"}),Qe()):Z().error(`\u4FDD\u5B58\u5931\u8D25\uFF1A${e?.error||"\u672A\u77E5"}`,null,{toast:!0})}catch(t){Z().error("\u4FDD\u5B58\u5F02\u5E38",t),Z().error(`\u4FDD\u5B58\u5F02\u5E38\uFF1A${t?.message||t}`,null,{toast:!0})}}async function VS(){if(!Array.isArray(k.tempData)||k.tempData.length===0){Z().info("\u6CA1\u6709\u53EF\u4FDD\u5B58\u7684\u6570\u636E",null,{toast:!0});return}if(window.confirm("\u4FDD\u5B58\u5230\u300C\u5168\u5C40\u6FC0\u6D3B\u6A21\u677F\u300D\u4F1A\u5F71\u54CD\u540E\u7EED\u6240\u6709 chat \u7684\u65B0\u586B\u8868\uFF08\u5DF2\u6709 slot \u6570\u636E\u4E0D\u53D7\u5F71\u54CD\uFF09\u3002\u7EE7\u7EED\uFF1F"))try{let t=Xr();if(!t?.id){Z().error("\u6CA1\u6709\u53EF\u7528\u7684\u5168\u5C40\u6FC0\u6D3B\u6A21\u677F",null,{toast:!0});return}let e=(k.tempData||[]).map(s=>({id:s?.id||s?.uid,name:s?.name||"",note:s?.note||"",enabled:s?.enabled!==!1,aiInstructions:s?.aiInstructions||{},updateConfig:s?.updateConfig||{},exportConfig:s?.exportConfig||{},columns:Array.isArray(s?.columns)?ce(s.columns):[],rows:[]})),r=Gr({...t,tables:e});if(r?.success){if(typeof k._pendingMirrorTag=="string"&&k._pendingMirrorTag.trim())try{let s=Pe();ut({...s,mirrorTag:k._pendingMirrorTag.trim()})}catch(s){Z().warn("\u4FDD\u5B58 mirrorTag \u5230 workbench config \u5931\u8D25",s)}k._pendingMirrorTag=null,vm(),Array.isArray(r?.template?.tables)&&(k.tempData=ce(r.template.tables)||[],k.isFromTemplate=!0,k._afterSaveGlobalAt=Date.now()),Z().info(`\u5DF2\u4FDD\u5B58\u5230\u5168\u5C40\u6A21\u677F\u300C${t.name}\u300D`,null,{toast:"success"}),Z().info("\u4FDD\u5B58\u5230\u5168\u5C40\u6A21\u677F\u6210\u529F",{templateId:t.id,name:t.name,tableCount:e.length}),Qe()}else Z().error(`\u4FDD\u5B58\u5931\u8D25\uFF1A${r?.error||"\u672A\u77E5"}`,null,{toast:!0})}catch(t){Z().error("\u4FDD\u5B58\u5230\u5168\u5C40\u6A21\u677F\u5F02\u5E38",t),Z().error(`\u4FDD\u5B58\u5F02\u5E38\uFF1A${t?.message||t}`,null,{toast:!0})}}async function JS(){if(!(k.isDirty&&!window.confirm("\u6709\u672A\u4FDD\u5B58\u4FEE\u6539\uFF0C\u7ACB\u5373\u586B\u8868\u4F1A\u5148\u4E22\u5F03\u8FD9\u4E9B\u4FEE\u6539\uFF0C\u786E\u5B9A\uFF1F")))try{let t=await Bn();t?.success?(Z().info("\u586B\u8868\u5B8C\u6210",null,{toast:"success"}),ld(),Qe()):Z().error(`\u586B\u8868\u5931\u8D25\uFF1A${t?.error||"\u672A\u77E5"}`,null,{toast:!0})}catch(t){Z().error("\u7ACB\u5373\u586B\u8868\u5F02\u5E38",t),Z().error(`\u5F02\u5E38\uFF1A${t?.message||t}`,null,{toast:!0})}}function wm(t,e){if(!Array.isArray(k.tempData))return;let r=k.tempData,s=t+e;s<0||s>=r.length||([r[t],r[s]]=[r[s],r[t]],k.currentTableIndex===t?k.currentTableIndex=s:k.currentTableIndex===s&&(k.currentTableIndex=t),Be(),Qe())}function XS(t){if(!Array.isArray(k.tempData)||!k.tempData[t])return;let e=k.tempData[t];window.confirm(`\u5220\u9664\u8868\u300C${e.name||`\u8868 ${t+1}`}\u300D\uFF1F\u6B64\u64CD\u4F5C\u4E0D\u53EF\u64A4\u9500\u3002`)&&(k.tempData.splice(t,1),k.currentTableIndex>=k.tempData.length&&(k.currentTableIndex=Math.max(0,k.tempData.length-1)),Be(),Qe())}function QS(){let t=window.prompt("\u65B0\u8868\u540D\uFF1A",`\u8868 ${(k.tempData?.length||0)+1}`);if(!t||!t.trim())return;k.tempData=Array.isArray(k.tempData)?k.tempData:[];let e=new Set(k.tempData.map(o=>o?.id).filter(Boolean)),r=k.tempData.length+1,s=`sheet_${Date.now().toString(36)}_${r}`;for(;e.has(s);)r++,s=`sheet_${Date.now().toString(36)}_${r}`;k.tempData.push({id:s,name:t.trim(),enabled:!0,note:"",aiInstructions:{init:"",create:"",update:"",delete:""},updateConfig:{},exportConfig:{enabled:!1},columns:[{key:"col_1",title:"\u5B57\u6BB51",description:"",type:"text",required:!1}],rows:[]}),k.currentTableIndex=k.tempData.length-1,Be(),Qe()}function ZS(t,e){if(!(!t||!Number.isFinite(e)))try{let r={chatId:k.targetSnapshot?.chatId||"",isolationKey:de.getKey()},s=Po(r,t)||{rows:{}},o=!!(s.rows&&s.rows[e]);Zg(r,t,e,!o),Z().info(o?`\u5DF2\u89E3\u9501\u884C #${e+1}`:`\u5DF2\u9501\u5B9A\u884C #${e+1}\uFF08AI \u4E0D\u4F1A\u6539\u8FD9\u884C\uFF09`,null,{toast:"success"}),Z().info("row-lock toggled",{sheetUid:t,rowIndex:e,locked:!o}),Qe()}catch(r){Z().error("row-lock \u5F02\u5E38",r),Z().error(`\u9501\u5B9A\u5931\u8D25\uFF1A${r?.message||r}`,null,{toast:!0})}}function e0(t,e,r){if(!(!t||!Number.isFinite(e)||!r))try{let s={chatId:k.targetSnapshot?.chatId||"",isolationKey:de.getKey()},o=Po(s,t)||{cells:{}},n=`${e}::${r}`,a=!!(o.cells&&o.cells[n]);tm(s,t,e,r,!a),Z().info(a?`\u5DF2\u89E3\u9501 [${e}][${r}]`:`\u5DF2\u9501\u5B9A [${e}][${r}]`,null,{toast:"success"}),Z().info("cell-lock toggled",{sheetUid:t,rowIndex:e,colKey:r,locked:!a}),Qe()}catch(s){Z().error("cell-lock \u5F02\u5E38",s),Z().error(`\u9501\u5B9A\u5931\u8D25\uFF1A${s?.message||s}`,null,{toast:!0})}}function t0(t){if(!Number.isFinite(t)||!window.confirm(`\u786E\u5B9A\u5220\u9664\u7B2C ${t+1} \u884C\uFF1F`))return;let e=at();e?.rows&&(e.rows.splice(t,1),Be(),Qe())}function r0(){let t=at();t&&(Array.isArray(t.rows)||(t.rows=[]),t.rows.push({id:an("row"),name:"",cells:{}}),Be(),Qe())}function s0(t,e){if(!t||!e){Z().error("\u5217\u9501\u5B9A\u5931\u8D25\uFF1A\u7F3A\u5C11 sheetUid \u6216 colKey",null,{toast:!0});return}try{let s={chatId:k.targetSnapshot?.chatId||"",isolationKey:de.getKey()},o=Po(s,t)||{cols:{}},n=!!(o.cols&&o.cols[e]);em(s,t,e,!n),Z().info(n?`\u5DF2\u89E3\u9501 ${e}`:`\u5DF2\u9501\u5B9A ${e}\uFF08AI \u4E0D\u4F1A\u6539\u8FD9\u5217\uFF09`,null,{toast:"success"}),Z().info("field-lock toggled",{sheetUid:t,colKey:e,locked:!n}),Qe()}catch(r){Z().error("field-lock \u5F02\u5E38",r),Z().error(`\u9501\u5B9A\u5931\u8D25\uFF1A${r?.message||r}`,null,{toast:!0})}}function o0(t){let e=at();e?.columns?.[t]&&window.confirm(`\u5220\u9664\u5B57\u6BB5\u300C${e.columns[t].title||e.columns[t].key}\u300D\uFF1F\u6B64\u64CD\u4F5C\u4E0D\u4F1A\u81EA\u52A8\u6E05\u7406\u884C\u6570\u636E\u3002`)&&(e.columns.splice(t,1),Be(),Qe())}function n0(){let t=at();if(!t)return;t.columns=Array.isArray(t.columns)?t.columns:[];let e=new Set(t.columns.map(s=>s?.key).filter(Boolean)),r=t.columns.length+1;for(;e.has(`col_${r}`);)r++;t.columns.push({key:`col_${r}`,title:`\u5B57\u6BB5${r}`,description:"",type:"text",required:!1}),Be(),Qe()}function cd(t={}){if(Z().info("openTableDataEditor \u8C03\u7528",{options:t}),BS(),!(window.jQuery||window.parent?.jQuery)){let s="jQuery \u4E0D\u53EF\u7528\uFF08window.jQuery \u548C window.parent.jQuery \u90FD\u662F undefined\uFF09";Z().error(s);try{Z().error(`\u6570\u636E\u7F16\u8F91\u5668\u6253\u5F00\u5931\u8D25\uFF1A${s}`,null,{toast:!0})}catch{}return null}try{let s=yt.getState(od);if(s){let o=Number(s.width),n=Number(s.height),a=Number.isFinite(o)&&o<800||Number.isFinite(n)&&n<500;(s.isMaximized||a)&&(Z().info("\u68C0\u6D4B\u5230\u4E0D\u5408\u7406 saved state\uFF0C\u91CD\u7F6E\u4E3A\u9ED8\u8BA4\u5C3A\u5BF8",{isMaximized:s.isMaximized,savedW:o,savedH:n}),yt.saveState(od,{width:1200,height:800,isMaximized:!1,x:void 0,y:void 0}))}}catch(s){Z().warn("saved state sanity check \u5F02\u5E38",s)}if(k.$window&&k.$window.length&&Bt().body.contains(k.$window[0])){if(t.focusTableUid){let o=(k.tempData||[]).findIndex(n=>(n?.uid||n?.id)===t.focusTableUid);o>=0&&(k.currentTableIndex=o)}return t.focusMode&&["data","schema","global"].includes(t.focusMode)&&(k.mode=t.focusMode),Qe(),k.$window}if(ld(),t.focusTableUid){let o=(k.tempData||[]).findIndex(n=>(n?.uid||n?.id)===t.focusTableUid);o>=0&&(k.currentTableIndex=o)}t.focusMode&&["data","schema","global"].includes(t.focusMode)&&(k.mode=t.focusMode);let r;try{r=rd({id:od,title:"\u586B\u8868\u6570\u636E\u7F16\u8F91\u5668",content:'<div class="yyt-tde-placeholder"></div>',width:1200,height:800,modal:!1,resizable:!0,maximizable:!0,rememberState:!0,onReady:s=>{k.$window=s,Qe()},onClose:()=>{k.isDirty&&Z().warn("\u6570\u636E\u7F16\u8F91\u5668\u5173\u95ED\u65F6\u6709\u672A\u4FDD\u5B58\u4FEE\u6539"),k.$window=null,k._refs={saveBtn:null,saveGlobalBtn:null,dirtyBadge:null}}})}catch(s){Z().error("createWindow \u629B\u9519",s);try{Z().error(`\u521B\u5EFA\u7A97\u53E3\u5931\u8D25\uFF1A${s?.message||s}`,null,{toast:!0})}catch{}return null}return r}var od,nd,k,$S,ad,Tm=D(()=>{sd();tt();H();Rn();ai();xi();yo();dr();He();qr();ed();tr();od="yyt-table-data-editor";k={$window:null,mode:"data",tempData:null,currentTableIndex:-1,isDirty:!1,isFromTemplate:!1,_pendingMirrorTag:null,targetSnapshot:null,_afterSaveGlobalAt:0,_refs:{saveBtn:null,saveGlobalBtn:null,dirtyBadge:null}};$S=`
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
`,ad=!1});function a0(t){return ce(t)}function i0(t,e,r){if(!t||typeof t!="object")return;let s=String(e||"").split(".").filter(Boolean);if(s.length===0)return;let o=t;for(let n=0;n<s.length-1;n++){let a=s[n];(o[a]===null||o[a]===void 0||typeof o[a]!="object")&&(o[a]={}),o=o[a]}o[s[s.length-1]]=r}function O(){return dd||(dd=E.createScope("TableWorkbenchView")),dd}async function l0(){try{let t=await gn();if(!t)return At.kind=null,At.lastError="Provider \u4E0D\u53EF\u7528",At;if(At.kind=t.kind,typeof t.query=="function"){let e=await t.query({statement:"SELECT COUNT(*) as c FROM table_sheets"}),r=await t.query({statement:"SELECT COUNT(*) as c FROM table_rows"});At.sheetCount=e?.rows?.[0]?.c??0,At.rowCount=r?.rows?.[0]?.c??0}At.lastError=null,At.lastRefreshAt=Date.now(),O().info("Provider stats \u5DF2\u5237\u65B0",{...At})}catch(t){At.lastError=t?.message||String(t),O().warn("Provider stats \u5237\u65B0\u5931\u8D25",t)}return At}function c0(){if(!At.kind){let t=bo();t?.kind&&(At.kind=t.kind)}return At}function ee(t){return String(t??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function _m(t){if(!Number.isFinite(t)||t<=0)return"\u4ECE\u672A";let e=Date.now()-t;if(e<6e4)return`${Math.floor(e/1e3)} \u79D2\u524D`;if(e<36e5)return`${Math.floor(e/6e4)} \u5206\u949F\u524D`;if(e<864e5)return`${Math.floor(e/36e5)} \u5C0F\u65F6\u524D`;try{return new Date(t).toLocaleString()}catch{return"\u672A\u77E5"}}function Am(t){let{config:e,activeTemplate:r,isolationKey:s,tablesPreview:o,templateArchives:n=[],providerStats:a={}}=t,i=e?.runtime||{},l=i.lastStatus==="success"?"\u2713 \u4E0A\u6B21\u6210\u529F":i.lastStatus==="failed"?"\u2717 \u4E0A\u6B21\u5931\u8D25":i.lastStatus==="running"?"\u8FD0\u884C\u4E2D":"\u5F85\u547D",d=i.lastStatus==="success"?"success":i.lastStatus==="failed"?"error":"muted",c=e?.automation?.enabled?"\u81EA\u52A8":"\u624B\u52A8",u=e?.apiPreset||"\u8DDF\u968F\u4E3B API",p=e?.bypassPresetId?"\u5DF2\u7ED1\u5B9A":"\u65E0",y=Array.isArray(n)?n.length:0;return`
  <div class="yyt-tww">
    <!-- Hero -->
    <div class="yyt-tww-hero">
      <div class="yyt-tww-hero-row1">
        <div class="yyt-tww-hero-icon"><i class="fa-solid fa-wand-magic-sparkles"></i></div>
        <div class="yyt-tww-hero-name">\u586B\u8868\u5DE5\u4F5C\u53F0</div>
        <div class="yyt-tww-hero-actions">
          <button class="yyt-tww-btn yyt-tww-btn-small" data-action="run-now"><i class="fa-solid fa-play"></i> \u7ACB\u5373\u586B\u8868</button>
          <button class="yyt-tww-btn yyt-tww-btn-small" data-action="run-clear"><i class="fa-solid fa-rotate-left"></i> \u91CD\u586B</button>
          ${y>0?`<button class="yyt-tww-btn yyt-tww-btn-small" data-action="toggle-archives" title="\u6A21\u677F\u5F52\u6863\u5386\u53F2\uFF08chat \xD7 isolationKey \u7EF4\u5EA6\uFF0C\u6700\u591A 8 \u4EFD\uFF09"><i class="fa-solid fa-clock-rotate-left"></i> \u5F52\u6863 (${y})</button>`:""}
          <button class="yyt-tww-btn yyt-tww-btn-small" data-action="export-templates" title="\u5BFC\u51FA\u6240\u6709\u7528\u6237\u6A21\u677F\u4E3A JSON\uFF08\u542B\u5168\u5C40\u6A21\u677F\u7684\u4FEE\u6539\u526F\u672C\uFF09"><i class="fa-solid fa-download"></i> \u5BFC\u51FA\u6A21\u677F</button>
          ${r?.mode&&r.mode!==qe.INHERIT_GLOBAL?`<button class="yyt-tww-btn yyt-tww-btn-small" data-action="reset-template-scope" title="\u672C chat \u5F53\u524D\u662F\u300C${r.mode===qe.CHAT_OVERRIDE?"chat \u4E13\u5C5E":"\u94FE\u63A5\u9884\u8BBE"}\u300D\u6A21\u5F0F\uFF0C\u70B9\u51FB\u6062\u590D\u4E3A\u300C\u7EE7\u627F\u5168\u5C40\u300D"><i class="fa-solid fa-rotate-right"></i> \u6062\u590D\u7EE7\u627F</button>`:""}
          <button class="yyt-tww-btn yyt-tww-btn-small yyt-tww-btn-danger" data-action="reset-chat-data" title="\u6E05\u7A7A\u5F53\u524D\u804A\u5929\u6240\u6709\u697C\u5C42\u7684\u8868\u683C\u6570\u636E\uFF0C\u8BA9\u6A21\u677F\u5207\u6362\u540E\u4ECE\u5934\u5F00\u59CB"><i class="fa-solid fa-trash-can"></i> \u6E05\u7A7A chat \u6570\u636E</button>
        </div>
      </div>
      <div class="yyt-tww-hero-desc">\u4ECE\u5BF9\u8BDD\u5185\u5BB9\u63D0\u53D6\u7ED3\u6784\u5316\u6570\u636E\uFF0C\u81EA\u52A8\u7EF4\u62A4\u8868\u683C\u72B6\u6001\u3002</div>
      <div class="yyt-tww-hero-chips">
        <span class="yyt-tww-chip mode">\u6A21\u5F0F ${ee(c)}</span>
        <span class="yyt-tww-chip preset">\u6A21\u677F: ${ee(r?.template?.name||"\u9ED8\u8BA4")}</span>
        ${(()=>{let m=r?.mode;if(m===qe.CHAT_OVERRIDE)return'<span class="yyt-tww-chip preset" title="\u672C chat \u7528\u4E86\u72EC\u7ACB\u6A21\u677F\u526F\u672C\uFF08\u4FEE\u6539\u4E0D\u5F71\u54CD\u5168\u5C40\uFF09\u3002\u53EF\u5728\u300C\u91CD\u7F6E\u8303\u56F4\u300D\u6309\u94AE\u65C1\u7684\u83DC\u5355\u6062\u590D\u7EE7\u627F\u5168\u5C40\u3002">\u4F5C\u7528\u57DF: chat \u4E13\u5C5E</span>';if(m===qe.PRESET_LINK){let g=r?.source?.presetName||"";return`<span class="yyt-tww-chip preset" title="\u672C chat \u94FE\u63A5\u5230\u5168\u5C40\u9884\u8BBE ${ee(g)}\uFF0C\u8DDF\u968F\u8BE5\u9884\u8BBE\u53D8\u5316\u3002">\u4F5C\u7528\u57DF: \u94FE\u63A5 ${ee(g)}</span>`}return'<span class="yyt-tww-chip preset" title="\u672C chat \u8DDF\u968F\u5168\u5C40\u6FC0\u6D3B\u6A21\u677F\u3002">\u4F5C\u7528\u57DF: \u7EE7\u627F\u5168\u5C40</span>'})()}
        <span class="yyt-tww-chip preset">API: ${ee(u)}</span>
        <span class="yyt-tww-chip preset">\u6307\u4EE4: ${ee(p)}</span>
        ${(()=>{let m=e?.runScope||e?.scope?.mode||"enabled";return m==="enabled"?'<span class="yyt-tww-chip preset">\u8303\u56F4: \u6240\u6709\u542F\u7528\u8868</span>':`<button class="yyt-tww-chip status-failed" data-action="reset-run-scope" title="\u5F53\u524D AI \u53EA\u4F1A\u586B\u90E8\u5206\u8868\uFF0C\u70B9\u51FB\u91CD\u7F6E\u4E3A\u300C\u6240\u6709\u542F\u7528\u8868\u300D" style="border:0;cursor:pointer;">\u8303\u56F4: ${ee(m==="current"?"\u26A0\uFE0F \u4EC5\u5F53\u524D\u8868":"\u4EC5\u9009\u4E2D\u8868")} \u2014 \u70B9\u6B64\u91CD\u7F6E</button>`})()}
        ${(()=>{let m=a?.kind,g=a?.sheetCount,h=a?.rowCount,x=g!==null&&h!==null?` \u2014 ${g} \u8868 ${h} \u884C`:"";return m==="authority"?`<span class="yyt-tww-chip status-success" title="\u6570\u636E\u6301\u4E45\u5316\u5230\u771F\u540E\u7AEF SQLite\uFF08ST-Delegation-of-authority \u63D0\u4F9B\uFF09">\u2713 \u771F\u540E\u7AEF SQLite${ee(x)}</span>`:m==="fallback"?`<span class="yyt-tww-chip preset" title="\u6570\u636E\u6301\u4E45\u5316\u5230 localStorage\uFF08\u672A\u88C5 ST-Delegation-of-authority\uFF09">\u2139 Fallback (localStorage)${ee(x)}</span>`:'<span class="yyt-tww-chip" title="Provider \u8FD8\u672A\u521D\u59CB\u5316\uFF08\u61D2\u52A0\u8F7D\uFF09">Provider \u52A0\u8F7D\u4E2D...</span>'})()}
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
      ${y0(n)}
    </div>

    <!-- Runtime stats -->
    <div class="yyt-tww-stat-row">
      <div class="yyt-tww-stat">
        <span class="yyt-tww-stat-label">\u72B6\u6001</span>
        <span class="yyt-tww-stat-value ${d}">${ee(l)}</span>
      </div>
      <div class="yyt-tww-stat">
        <span class="yyt-tww-stat-label">\u6700\u8FD1\u8FD0\u884C</span>
        <span class="yyt-tww-stat-value muted">${ee(_m(i.lastRunAt))}</span>
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
        ${d0(t)}
      </section>

      <section class="yyt-tww-section" data-section="behavior">
        <div class="yyt-tww-section-heading">
          <span class="yyt-tww-section-icon"><i class="fa-solid fa-arrows-rotate"></i></span>
          \u586B\u8868\u884C\u4E3A
        </div>
        ${u0(t)}
      </section>

      <section class="yyt-tww-section" data-section="overview">
        <div class="yyt-tww-section-heading">
          <span class="yyt-tww-section-icon"><i class="fa-solid fa-table-cells"></i></span>
          \u8868\u683C\u6982\u89C8
          <span class="yyt-tww-section-action">
            <button class="yyt-tww-btn yyt-tww-btn-small" data-action="open-editor"><i class="fa-solid fa-table-cells"></i> \u6253\u5F00\u6570\u636E\u7F16\u8F91\u5668</button>
          </span>
        </div>
        ${f0(t.tablesPreview)}
      </section>

    </div>

    </div>
  </div>
  `}function d0(t){let{config:e,allTemplates:r,apiPresets:s,bypassPresets:o,regexPresets:n,worldbookPresets:a,activeTemplate:i}=t,l=r.map(T=>`<option value="${ee(T.id)}" ${i?.source?.templateId===T.id?"selected":""}>${ee(T.name)}</option>`).join(""),d=e?.autoUpdateEnabled===!0?"auto":"manual",c=e?.apiPreset||"",u='<option value="">\u2014\u2014 \u8DDF\u968F\u4E3B API \u2014\u2014</option>'+s.map(T=>`<option value="${ee(T.name)}" ${T.name===c?"selected":""}>${ee(T.name)}</option>`).join(""),p=e?.bypass?.presetId||"",y='<option value="">\u2014\u2014 \u65E0 \u2014\u2014</option>'+o.map(T=>`<option value="${ee(T.id)}" ${T.id===p?"selected":""}>${ee(T.name)}${T.isDefault?" [\u9ED8\u8BA4]":""}</option>`).join(""),m=e?.extraction?.regexPresetId||"",g='<option value="">\u2014\u2014 \u65E0\uFF08\u4E0D\u8FDB\u884C\u63D0\u53D6\uFF09 \u2014\u2014</option>'+n.map(T=>`<option value="${ee(T.id)}" ${T.id===m?"selected":""}>${ee(T.name)}</option>`).join(""),h=e?.worldbooks?.presetId||"",x='<option value="">\u2014\u2014 \u65E0 \u2014\u2014</option>'+a.map(T=>`<option value="${ee(T.id)}" ${T.id===h?"selected":""}>${ee(T.name)}</option>`).join(""),S=e?.runScope||"enabled";return`
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
      <select class="yyt-select yyt-tww-ctrl" data-binding="bypassPreset">${y}</select>
      <div class="yyt-tww-row-meta"><a data-link="bypass">\u7BA1\u7406\u2026</a></div>
    </div>

    <div class="yyt-tww-row">
      <div class="yyt-tww-row-label">
        <span class="yyt-tww-row-label-text">\u6B63\u5219\u63D0\u53D6\u9884\u8BBE</span>
        <span class="yyt-tww-row-label-hint">\u51B3\u5B9A\u4ECE AI \u56DE\u590D\u4E2D\u5982\u4F55\u62BD\u53D6</span>
      </div>
      <select class="yyt-select yyt-tww-ctrl" data-binding="regexPreset">${g}</select>
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
        <option value="current" ${S==="current"?"selected":""}>\u4EC5\u5F53\u524D\u6D3B\u52A8\u8868</option>
        <option value="selected" ${S==="selected"?"selected":""}>\u5F53\u524D\u9009\u4E2D\u8868</option>
        <option value="enabled" ${S==="enabled"?"selected":""}>\u6240\u6709\u542F\u7528\u7684\u8868</option>
      </select>
      <div class="yyt-tww-row-meta"></div>
    </div>
  `}function u0(t){let{config:e}=t,r=e?.fillMode||"incremental",s=Number(e?.contextDepth)||3,o=e?.worldbookSync?.enabled===!0,n=e?.mirrorToMessage===!0;return`
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

    ${p0(t)}

    <div class="yyt-tww-toggle-row">
      <div class="yyt-tww-toggle-info">
        <div class="yyt-tww-toggle-title">\u5199\u56DE\u6B63\u6587\u955C\u50CF</div>
        <div class="yyt-tww-toggle-desc">\u5728\u52A9\u624B\u6D88\u606F\u672B\u5C3E\u955C\u50CF\u5199\u5165 markdown \u65B9\u4FBF\u624B\u52A8\u67E5\u9605\u3002</div>
      </div>
      <div class="yyt-tww-toggle ${n?"on":""}" data-toggle="mirrorToMessage"></div>
    </div>
  `}function p0(t){let e=t?.config?.worldbookSync||{};if(!(e.enabled===!0))return"";let s=String(e.targetBook||""),o=String(t?.boundLorebook||""),n=t?.chatOpen===!0,a=s||o,i=Array.isArray(t.availableWorldbooks)?t.availableWorldbooks:[],l=e.wrapperConfig||{},d=l.enabled!==!1,c=String(l.wrapperTag||"\u6700\u65B0\u6570\u636E\u4E0E\u8BB0\u5F55"),u=String(l.wrapperHint||""),p=l.wrapperPlacement||{},y=String(p.position||"before_character_definition"),m=Number.isFinite(p.depth)?p.depth:2,g=Number.isFinite(p.order)?p.order:5e4,h;if(!n)h='<option value="">\u2014\u2014 \u8BF7\u5148\u6253\u5F00\u804A\u5929 \u2014\u2014</option>';else if(i.length===0)h=`<option value="${ee(a)}">${a?ee(a):"\u2014\u2014 \u89D2\u8272\u5361\u672A\u7ED1\u5B9A\u4E16\u754C\u4E66 \u2014\u2014"}</option>`;else{let T=i.map(C=>{let w=typeof C=="string"?C:C?.name||"";return`<option value="${ee(w)}" ${w===a?"selected":""}>${ee(w)}${w===o?"\uFF08\u89D2\u8272\u5361\u7ED1\u5B9A\uFF09":""}</option>`}).join("");h=(o?`<option value="">\u2014\u2014 \u89D2\u8272\u5361\u7ED1\u5B9A\uFF1A${ee(o)} \u2014\u2014</option>`:'<option value="">\u2014\u2014 \u9009\u62E9 \u2014\u2014</option>')+T}return`
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
          <option value="before_character_definition" ${y==="before_character_definition"?"selected":""}>\u89D2\u8272\u5B9A\u4E49\u4E4B\u524D</option>
          <option value="after_character_definition" ${y==="after_character_definition"?"selected":""}>\u89D2\u8272\u5B9A\u4E49\u4E4B\u540E</option>
          <option value="before_history" ${y==="before_history"?"selected":""}>\u5386\u53F2\u8BB0\u5F55\u4E4B\u524D</option>
          <option value="after_history" ${y==="after_history"?"selected":""}>\u5386\u53F2\u8BB0\u5F55\u4E4B\u540E</option>
          <option value="at_depth" ${y==="at_depth"?"selected":""}>\u6307\u5B9A\u6DF1\u5EA6</option>
        </select>
        <div class="yyt-tww-sub-meta"></div>
      </div>

      <div class="yyt-tww-sub-row-double">
        <label>\u6DF1\u5EA6 / \u987A\u5E8F</label>
        <input class="yyt-input yyt-tww-ctrl" type="number" data-binding="worldbookWrapperDepth" value="${ee(m)}" min="0">
        <input class="yyt-input yyt-tww-ctrl" type="number" data-binding="worldbookWrapperOrder" value="${ee(g)}" min="0">
      </div>
    </div>
  `}function y0(t=[]){return!Array.isArray(t)||t.length===0?'<div class="yyt-tww-empty">\u5F53\u524D chat \xD7 isolationKey \u6682\u65E0\u5F52\u6863\uFF08\u4EC5\u5728\u5207\u6362\u6A21\u677F\u65F6\u81EA\u52A8\u5F52\u6863\u5F53\u524D\u72B6\u6001\uFF09</div>':`
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
  `}function f0(t){return!Array.isArray(t)||t.length===0?'<div class="yyt-tww-empty">\u5F53\u524D slot \u6682\u65E0\u8868\u6570\u636E\u3002\u8BF7\u5148"\u7ACB\u5373\u586B\u8868"\u6216\u5728\u6570\u636E\u7F16\u8F91\u5668\u4E2D\u521D\u59CB\u5316\u3002</div>':`
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
  `}function Cm(){let t=(()=>{try{return Pe()}catch{return{}}})(),e=(()=>{try{return Qr()||[]}catch{return[]}})(),r=(()=>{try{return To({})}catch{return null}})(),s=(()=>{try{return Pr()||[]}catch{return[]}})(),o=(()=>{try{return xn()||[]}catch{return[]}})(),n=(()=>{try{return Ee.listPresets()||[]}catch{return[]}})(),a=(()=>{try{return ct.listPresets()||[]}catch{return[]}})(),i=(()=>{try{return de.getKey()}catch{return""}})(),l=g0(),d=m0(),c=h0(),u=null,p=0;try{let x=zs(null);Array.isArray(x?.tableState?.tables)&&x.tableState.tables.length>0&&(u=x.tableState.tables,p=Number(x.tableState.updatedAt)||0)}catch{}let y=u||r?.template?.tables||t?.tables||[],m=t?.tableEnabledOverrides&&typeof t.tableEnabledOverrides=="object"?t.tableEnabledOverrides:{},g=y.map(x=>{let S=x?.id||"",T=S&&Object.prototype.hasOwnProperty.call(m,S)?m[S]:void 0;return{id:S,name:x?.name||"",enabled:T!==void 0?T:x?.enabled!==!1,rowCount:Array.isArray(x?.rows)?x.rows.length:0,colCount:Array.isArray(x?.columns)?x.columns.length:0,updatedHint:u&&p>0?_m(p):""}}),h=(()=>{try{return af()||[]}catch{return[]}})();return{config:t,activeTemplate:r,allTemplates:e,apiPresets:s,bypassPresets:o,regexPresets:n,worldbookPresets:a,availableWorldbooks:l,boundLorebook:d,chatOpen:c,isolationKey:i,tablesPreview:g,templateArchives:h,providerStats:c0()}}function g0(){try{let t=globalThis.window||globalThis,e=t?.TavernHelper||t?.parent?.TavernHelper;if(!e)return[];if(typeof e.getLorebooks=="function"){let r=e.getLorebooks();if(Array.isArray(r))return r}if(typeof e.getLorebookList=="function"){let r=e.getLorebookList();if(Array.isArray(r))return r}}catch(t){O().warn("loadAvailableWorldbooks \u5931\u8D25",t)}return[]}function m0(){try{let t=globalThis.window||globalThis,e=t?.TavernHelper||t?.parent?.TavernHelper;if(e){if(typeof e.getCurrentCharPrimaryLorebook=="function"){let s=e.getCurrentCharPrimaryLorebook();if(typeof s=="string"&&s)return s}if(typeof e.getCharLorebooks=="function")try{let s=e.getCharLorebooks();if(s?.primary)return String(s.primary)}catch{}if(typeof e.getChatLorebook=="function")try{let s=e.getChatLorebook();if(typeof s=="string"&&s)return s}catch{}}let r=t?.SillyTavern?.getContext?.()||t?.parent?.SillyTavern?.getContext?.();if(r){let s=r.characters?.[r.characterId],o=s?.data?.character_book?.name||s?.data?.extensions?.world||s?.world;if(typeof o=="string"&&o)return o}}catch(t){O().warn("loadCharacterBoundLorebook \u5931\u8D25",t)}return""}function h0(){try{let t=globalThis.window||globalThis,e=t?.TavernHelper||t?.parent?.TavernHelper;if(e&&typeof e.getCurrentChatId=="function"){let s=e.getCurrentChatId();return!!(s&&String(s).trim()&&String(s).trim()!=="default_chat")}let r=t?.SillyTavern?.getContext?.()||t?.parent?.SillyTavern?.getContext?.();if(r){let s=r.chat;if(Array.isArray(s)&&s.length>0||r.chatId)return!0}}catch{}return!1}function ud(t,e){let r=window.jQuery||window.parent?.jQuery;if(!r||!t||!t.on){O().warn("bindWorkbenchEvents: jQuery \u6216 $container \u4E0D\u53EF\u7528");return}t.off(".tww"),Sm||(Sm=!0,l0().then(()=>{typeof e=="function"&&e()}).catch(()=>{})),t.on("click.tww",'[data-action="run-now"]',async()=>{try{let n=await Bn();n?.success?O().info("\u586B\u8868\u5B8C\u6210",null,{toast:"success"}):O().error(`\u586B\u8868\u5931\u8D25\uFF1A${n?.error||"\u672A\u77E5"}`,null,{toast:!0}),typeof e=="function"&&e()}catch(n){O().error("\u7ACB\u5373\u586B\u8868\u5F02\u5E38",n),O().error(`\u5F02\u5E38\uFF1A${n?.message||n}`,null,{toast:!0})}}),t.on("click.tww",'[data-action="run-clear"]',async()=>{if(window.confirm("\u91CD\u586B\u4F1A\u6E05\u7A7A\u5F53\u524D\u6D88\u606F\u697C\u5C42\u7684\u8868\u683C\u6570\u636E\u5E76\u91CD\u65B0\u751F\u6210\uFF0C\u786E\u5B9A\uFF1F"))try{let n=await Bn(null,{clearBeforeUpdate:!0});n?.success?O().info("\u91CD\u586B\u5B8C\u6210",null,{toast:"success"}):O().error(`\u91CD\u586B\u5931\u8D25\uFF1A${n?.error||"\u672A\u77E5"}`,null,{toast:!0}),typeof e=="function"&&e()}catch(n){O().error("\u91CD\u586B\u5F02\u5E38",n),O().error(`\u5F02\u5E38\uFF1A${n?.message||n}`,null,{toast:!0})}}),t.on("click.tww",'[data-action="reset-run-scope"]',()=>{try{let n=Pe();ut({...n,runScope:"enabled",scope:{...n.scope||{},mode:"enabled",activeTableId:"",selectedTableIds:[]}}),O().info("\u5DF2\u91CD\u7F6E\u8303\u56F4\u4E3A\u300C\u6240\u6709\u542F\u7528\u8868\u300D",null,{toast:"success"}),O().info("\u7528\u6237\u91CD\u7F6E runScope \u4E3A enabled"),typeof e=="function"&&e()}catch(n){O().error("\u91CD\u7F6E\u8303\u56F4\u5F02\u5E38",n),O().error(`\u91CD\u7F6E\u5931\u8D25\uFF1A${n?.message||n}`,null,{toast:!0})}}),t.on("click.tww",'[data-action="toggle-chips"]',function(){let n=t.find(".yyt-tww-hero-chips")[0];if(!n)return;let a=n.classList.toggle("yyt-tww-hero-chips-expanded");this.textContent=a?"\u25BE":"\u25B8"}),t.on("click.tww",'[data-action="export-templates"]',()=>{try{let n=Ua(),a=JSON.stringify(n,null,2),i=new Blob([a],{type:"application/json"}),l=URL.createObjectURL(i),d=document.createElement("a");d.href=l,d.download=`youyou-table-templates-${Date.now()}.json`,document.body.appendChild(d),d.click(),document.body.removeChild(d),URL.revokeObjectURL(l);let c=Array.isArray(n?.templates)?n.templates.length:0;O().info(`\u5DF2\u5BFC\u51FA ${c} \u4E2A\u6A21\u677F\u5230\u4E0B\u8F7D\u6587\u4EF6\u5939`,null,{toast:"success"}),O().info("export-templates \u5B8C\u6210",{count:c})}catch(n){O().error("export-templates \u5F02\u5E38",n),O().error(`\u5BFC\u51FA\u5931\u8D25\uFF1A${n?.message||n}`,null,{toast:!0})}}),t.on("click.tww",'[data-action="reset-template-scope"]',()=>{if(window.confirm("\u6062\u590D\u672C chat \u7684\u6A21\u677F\u4F5C\u7528\u57DF\u5230\u300C\u7EE7\u627F\u5168\u5C40\u300D\uFF1F\u5F53\u524D\u72B6\u6001\u4F1A\u5148\u81EA\u52A8\u5F52\u6863\uFF0C\u53EF\u5728\u300C\u5F52\u6863\u300D\u4E2D\u6062\u590D\u3002"))try{let n=nf({archive:!0});n?.success?(O().info("\u5DF2\u6062\u590D\u4E3A\u7EE7\u627F\u5168\u5C40",null,{toast:"success"}),O().info("reset-template-scope \u5B8C\u6210"),typeof e=="function"&&e()):O().error(`\u6062\u590D\u5931\u8D25\uFF1A${n?.error||"\u672A\u77E5"}`,null,{toast:!0})}catch(n){O().error("reset-template-scope \u5F02\u5E38",n),O().error(`\u5F02\u5E38\uFF1A${n?.message||n}`,null,{toast:!0})}}),t.on("click.tww",'[data-action="chat-template-override"]',()=>{if(window.confirm(`\u628A\u5F53\u524D\u6FC0\u6D3B\u6A21\u677F\u6DF1\u62F7\u8D1D\u4E3A\u672C chat \u7684\u72EC\u7ACB\u526F\u672C\uFF1F
\u4E4B\u540E\u4FEE\u6539\u4E0D\u5F71\u54CD\u5168\u5C40\u6A21\u677F\u3002\u64CD\u4F5C\u524D\u81EA\u52A8\u5F52\u6863\u5F53\u524D\u72B6\u6001\u3002`))try{let n=Xr();if(!n){O().error("\u6CA1\u6709\u53EF\u7528\u7684\u5168\u5C40\u6FC0\u6D3B\u6A21\u677F",null,{toast:!0});return}let a=sf(n,{source:"workbench-chat-override"});a?.success?(O().info(`\u5DF2\u8BBE\u4E3A chat \u4E13\u5C5E\uFF1A${n.name}`,null,{toast:"success"}),O().info("chat-template-override \u5B8C\u6210",{templateId:n.id,name:n.name}),typeof e=="function"&&e()):O().error(`\u8BBE\u7F6E\u5931\u8D25\uFF1A${a?.error||"\u672A\u77E5"}`,null,{toast:!0})}catch(n){O().error("chat-template-override \u5F02\u5E38",n),O().error(`\u5F02\u5E38\uFF1A${n?.message||n}`,null,{toast:!0})}}),t.on("click.tww",'[data-action="chat-template-link"]',()=>{let n=(()=>{try{return Qr()||[]}catch{return[]}})();if(n.length===0){O().info("\u6CA1\u6709\u53EF\u7528\u7684\u6A21\u677F",null,{toast:!0});return}let a=n.map((c,u)=>`${u+1}. ${c.name}`).join(`
`),i=window.prompt(`\u94FE\u63A5\u5230\u54EA\u4E2A\u5168\u5C40\u9884\u8BBE\uFF1F\u8F93\u5165\u7F16\u53F7\uFF081-${n.length}\uFF09\uFF1A

${a}`,"1");if(!i)return;let l=parseInt(i,10)-1;if(!Number.isFinite(l)||l<0||l>=n.length){O().error("\u7F16\u53F7\u65E0\u6548",null,{toast:!0});return}let d=n[l];try{let c=of(d.name,{source:"workbench-link-preset"});c?.success?(O().info(`\u5DF2\u94FE\u63A5\u5230\u9884\u8BBE\uFF1A${d.name}`,null,{toast:"success"}),O().info("chat-template-link \u5B8C\u6210",{presetName:d.name}),typeof e=="function"&&e()):O().error(`\u94FE\u63A5\u5931\u8D25\uFF1A${c?.error||"\u672A\u77E5"}`,null,{toast:!0})}catch(c){O().error("chat-template-link \u5F02\u5E38",c),O().error(`\u5F02\u5E38\uFF1A${c?.message||c}`,null,{toast:!0})}}),t.on("click.tww",'[data-action="reset-chat-data"]',async()=>{if(window.confirm("\u5C06\u6E05\u7A7A\u5F53\u524D\u804A\u5929\u6240\u6709\u697C\u5C42\u7684\u8868\u683C\u6570\u636E\uFF08\u4E0D\u5F71\u54CD\u6A21\u677F/\u914D\u7F6E\uFF09\u3002\u4E0B\u6B21\u586B\u8868\u4F1A\u6309\u5F53\u524D\u6FC0\u6D3B\u6A21\u677F\u4ECE\u5934\u5F00\u59CB\u3002\u786E\u5B9A\uFF1F"))try{let n=await mg();n?.success?(O().info(`\u5DF2\u6E05\u7A7A ${n.touched||0} \u6761\u6D88\u606F\u7684\u8868\u683C\u6570\u636E`,null,{toast:"success"}),O().info("\u6E05\u7A7A chat \u6570\u636E\u5B8C\u6210",n)):O().error("\u6E05\u7A7A\u5931\u8D25",null,{toast:!0}),typeof e=="function"&&e()}catch(n){O().error("\u6E05\u7A7A chat \u6570\u636E\u5F02\u5E38",n),O().error(`\u5F02\u5E38\uFF1A${n?.message||n}`,null,{toast:!0})}}),t.on("click.tww",'[data-action="open-editor"]',n=>{n.preventDefault(),O().info("open-editor button clicked");try{let a=cd();O().info("openTableDataEditor \u8C03\u7528\u5B8C\u6210",{hasReturn:!!a})}catch(a){O().error("\u6253\u5F00\u6570\u636E\u7F16\u8F91\u5668\u5F02\u5E38",a),O().error(`\u6253\u5F00\u5931\u8D25\uFF1A${a?.message||a}`,null,{toast:!0})}}),t.on("click.tww","[data-table-index]",function(n){if(r(n.target).closest('[data-action="toggle-table-enabled"]').length>0||r(n.target).is("label, label *"))return;n.preventDefault();let a=Number(r(this).attr("data-table-index"));if(!(!Number.isFinite(a)||a<0))try{let l=zs(null)?.tableState?.tables?.[a],d=cd({focusTableUid:l?.uid||l?.id||""})}catch(i){O().error("\u6253\u5F00\u6570\u636E\u7F16\u8F91\u5668\u5F02\u5E38",i),O().error(`\u6253\u5F00\u5931\u8D25\uFF1A${i?.message||i}`,null,{toast:!0})}}),t.on("click.tww",'[data-action="toggle-archives"]',function(n){n.preventDefault();let a=t.find("[data-archives-panel]").first();a.length&&(a.css("display")==="none"?a.css("display","block"):a.css("display","none"))}),t.on("click.tww",'[data-action="restore-archive"]',async function(n){n.stopPropagation();let a=Number(r(this).attr("data-archive-index"));if(!(!Number.isFinite(a)||a<0)&&window.confirm(`\u6062\u590D\u5F52\u6863 #${a}\uFF1F\u6062\u590D\u524D\u4F1A\u81EA\u52A8\u5F52\u6863\u5F53\u524D\u72B6\u6001\uFF0C\u53EF\u518D\u6B21\u6062\u590D\u56DE\u6765\u3002`))try{let i=lf(a);i?.success?(O().info("\u5DF2\u6062\u590D\u5F52\u6863",null,{toast:"success"}),O().info("restoreChatTemplateArchive \u6210\u529F",{index:a,scopeState:i.scopeState})):O().error(`\u6062\u590D\u5931\u8D25\uFF1A${i?.error||"\u672A\u77E5"}`,null,{toast:!0}),typeof e=="function"&&e()}catch(i){O().error("\u6062\u590D\u5F52\u6863\u5F02\u5E38",i),O().error(`\u5F02\u5E38\uFF1A${i?.message||i}`,null,{toast:!0})}}),t.on("change.tww",'[data-action="toggle-table-enabled"]',function(n){n.stopPropagation();let a=r(this).attr("data-table-id"),i=r(this).is(":checked");if(a)try{let l=Pe(),d={...l.tableEnabledOverrides||{}};d[a]=i,ut({...l,tableEnabledOverrides:d}),O().info(i?`\u5DF2\u542F\u7528 ${a}`:`\u5DF2\u7981\u7528 ${a}`,null,{toast:"success"}),O().info("toggle \u5355\u8868\u6FC0\u6D3B",{tableId:a,enabled:i}),typeof e=="function"&&e()}catch(l){O().error("toggle \u5355\u8868\u6FC0\u6D3B\u5F02\u5E38",l),O().error(`\u5207\u6362\u5931\u8D25\uFF1A${l?.message||l}`,null,{toast:!0})}}),t.on("change.tww",'[data-binding="template"]',function(){let n=r(this).val();try{bc(n);let a=Pe();ut({...a,activeTemplate:n}),O().info("\u6A21\u677F\u5DF2\u5207\u6362",null,{toast:"success"}),typeof e=="function"&&e()}catch(a){O().error("\u5207\u6362\u6A21\u677F\u5F02\u5E38",a),O().error(`\u5207\u6362\u5931\u8D25\uFF1A${a?.message||a}`,null,{toast:!0})}}),t.on("change.tww",'[data-binding="triggerMode"]',function(){let n=r(this).val();try{let a=Pe();ut({...a,autoUpdateEnabled:n==="auto"}),O().info(n==="auto"?"\u5DF2\u5207\u6362\u4E3A\u81EA\u52A8\u6A21\u5F0F":"\u5DF2\u5207\u6362\u4E3A\u624B\u52A8\u6A21\u5F0F",null,{toast:"success"}),typeof e=="function"&&e()}catch(a){O().error("\u5207\u6362\u89E6\u53D1\u6A21\u5F0F\u5F02\u5E38",a),O().error(`\u5207\u6362\u5931\u8D25\uFF1A${a?.message||a}`,null,{toast:!0})}});let s=[{sel:'[data-binding="apiPreset"]',key:"apiPreset"},{sel:'[data-binding="runScope"]',key:"runScope"},{sel:'[data-binding="fillMode"]',key:"fillMode"}];for(let{sel:n,key:a}of s)t.on("change.tww",n,function(){let i=r(this).val();try{let l=Pe(),d={...l,[a]:i};a==="runScope"&&(d.scope={...l.scope||{},mode:i,...i==="enabled"?{activeTableId:"",selectedTableIds:[]}:{}}),ut(d),O().info("\u5DF2\u4FDD\u5B58",null,{toast:"success"})}catch(l){O().error(`\u4FDD\u5B58 ${a} \u5F02\u5E38`,l),O().error(`\u4FDD\u5B58\u5931\u8D25\uFF1A${l?.message||l}`,null,{toast:!0})}});t.on("change.tww",'[data-binding="bypassPreset"]',function(){let n=r(this).val();try{let a=Pe();ut({...a,bypass:{...a.bypass||{},presetId:n,enabled:!!n}}),O().info("Ai \u6307\u4EE4\u9884\u8BBE\u5DF2\u4FDD\u5B58",null,{toast:"success"})}catch(a){O().error("\u4FDD\u5B58 bypass \u5F02\u5E38",a),O().error(`\u4FDD\u5B58\u5931\u8D25\uFF1A${a?.message||a}`,null,{toast:!0})}}),t.on("change.tww",'[data-binding="regexPreset"]',function(){let n=r(this).val();try{let a=Pe();ut({...a,extraction:{...a.extraction||{},regexPresetId:n}}),O().info("\u6B63\u5219\u9884\u8BBE\u5DF2\u66F4\u65B0",null,{toast:"success"})}catch(a){O().error("\u4FDD\u5B58 regexPreset \u5F02\u5E38",a),O().error(`\u4FDD\u5B58\u5931\u8D25\uFF1A${a?.message||a}`,null,{toast:!0})}}),t.on("change.tww",'[data-binding="worldbookPreset"]',function(){let n=r(this).val();try{let a=Pe();ut({...a,worldbooks:{...a.worldbooks||{},presetId:n}}),O().info("\u4E16\u754C\u4E66\u9884\u8BBE\u5DF2\u66F4\u65B0",null,{toast:"success"})}catch(a){O().error("\u4FDD\u5B58 worldbookPreset \u5F02\u5E38",a),O().error(`\u4FDD\u5B58\u5931\u8D25\uFF1A${a?.message||a}`,null,{toast:!0})}}),t.on("change.tww",'[data-binding="contextDepth"]',function(){let n=Math.max(1,parseInt(r(this).val(),10)||3);try{let a=Pe();ut({...a,contextDepth:n}),O().info("\u5DF2\u4FDD\u5B58",null,{toast:"success"})}catch(a){O().error("\u4FDD\u5B58 contextDepth \u5F02\u5E38",a),O().error(`\u4FDD\u5B58\u5931\u8D25\uFF1A${a?.message||a}`,null,{toast:!0})}}),t.on("click.tww",'[data-toggle="worldbookSync"]',function(){let n=r(this),a=n.hasClass("on"),i=!a;n.toggleClass("on",i);try{let l=Pe();ut({...l,worldbookSync:{...l.worldbookSync||{},enabled:i}}),O().info(i?"\u5DF2\u542F\u7528\u4E16\u754C\u4E66\u540C\u6B65":"\u5DF2\u505C\u7528\u4E16\u754C\u4E66\u540C\u6B65",null,{toast:"success"}),typeof e=="function"&&e()}catch(l){n.toggleClass("on",a),O().error("toggle worldbookSync \u5F02\u5E38",l),O().error(`\u4FDD\u5B58\u5931\u8D25\uFF1A${l?.message||l}`,null,{toast:!0})}}),t.on("click.tww",'[data-toggle="worldbookWrapperEnabled"]',function(){let n=r(this),a=n.hasClass("on"),i=!a;n.toggleClass("on",i);try{let l=Pe(),d=l.worldbookSync||{};ut({...l,worldbookSync:{...d,wrapperConfig:{...d.wrapperConfig||{},enabled:i}}}),O().info(i?"\u5DF2\u542F\u7528 Wrapper \u5305\u88F9":"\u5DF2\u505C\u7528 Wrapper",null,{toast:"success"})}catch(l){n.toggleClass("on",a),O().error("toggle worldbookWrapperEnabled \u5F02\u5E38",l)}});let o=[{sel:'[data-binding="worldbookTargetBook"]',path:"targetBook",type:"string"},{sel:'[data-binding="worldbookWrapperTag"]',path:"wrapperConfig.wrapperTag",type:"string"},{sel:'[data-binding="worldbookWrapperHint"]',path:"wrapperConfig.wrapperHint",type:"string"},{sel:'[data-binding="worldbookWrapperPosition"]',path:"wrapperConfig.wrapperPlacement.position",type:"string"},{sel:'[data-binding="worldbookWrapperDepth"]',path:"wrapperConfig.wrapperPlacement.depth",type:"number"},{sel:'[data-binding="worldbookWrapperOrder"]',path:"wrapperConfig.wrapperPlacement.order",type:"number"}];for(let{sel:n,path:a,type:i}of o)t.on("change.tww",n,function(){let l=r(this).val();i==="number"&&(l=Number.parseInt(l,10));try{let d=Pe(),c=a0(d.worldbookSync||{});i0(c,a,l),ut({...d,worldbookSync:c}),O().info("\u5DF2\u4FDD\u5B58",null,{toast:"success"})}catch(d){O().error(`\u4FDD\u5B58 worldbookSync.${a} \u5F02\u5E38`,d),O().error(`\u4FDD\u5B58\u5931\u8D25\uFF1A${d?.message||d}`,null,{toast:!0})}});t.on("click.tww",'[data-action="refresh-worldbooks"]',function(n){n.preventDefault(),typeof e=="function"&&e(),O().info("\u5DF2\u5237\u65B0\u4E16\u754C\u4E66\u5217\u8868",null,{toast:"success"})}),t.on("click.tww",'[data-toggle="mirrorToMessage"]',function(){let n=r(this),a=n.hasClass("on"),i=!a;n.toggleClass("on",i);try{let l=Pe();ut({...l,mirrorToMessage:i}),O().info(i?"\u5DF2\u542F\u7528\u6B63\u6587\u955C\u50CF":"\u5DF2\u505C\u7528\u6B63\u6587\u955C\u50CF",null,{toast:"success"})}catch(l){n.toggleClass("on",a),O().error("toggle mirrorToMessage \u5F02\u5E38",l),O().error(`\u4FDD\u5B58\u5931\u8D25\uFF1A${l?.message||l}`,null,{toast:!0})}}),t.on("click.tww","[data-link]",function(n){n.preventDefault(),O().info("\u8DF3\u8F6C\u5230\u9884\u8BBE\u7BA1\u7406\u9762\u677F\uFF08\u5F85\u63A5\u5165\uFF09",null,{toast:!0})})}var dd,At,Sm,Em,km=D(()=>{H();mo();dr();yo();He();qr();xi();Rn();Tm();He();Go();_o();Fr();Ys();At={kind:null,sheetCount:null,rowCount:null,lastError:null,lastRefreshAt:0},Sm=!1;Em=`
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
`});var Pm={};ae(Pm,{TableWorkbenchPanel:()=>Mm,default:()=>x0});function b0(){if(!pd)try{let t=window.parent&&window.parent.document?window.parent.document:document,e=t.head||t.documentElement;if(e.querySelector("#yyt-tww-styles")){pd=!0;return}let r=t.createElement("style");r.id="yyt-tww-styles",r.textContent=Em,e.appendChild(r),pd=!0}catch(t){zn.warn("\u6CE8\u5165\u5DE5\u4F5C\u53F0\u6837\u5F0F\u5931\u8D25",t)}}function Im(t){let e=t?.[0];if(!e)return;let r=e.closest(".yyt-popup-body");if(!r){zn.warn("pinWorkbenchHeight: \u627E\u4E0D\u5230 .yyt-popup-body \u7956\u5148");return}let s=()=>{let n=e.querySelector(".yyt-tww");if(!n)return;let a=r.getBoundingClientRect(),i=e.getBoundingClientRect(),l=a.bottom-i.top-8;l>100?n.style.height=`${l}px`:zn.warn(`pinWorkbenchHeight: \u8BA1\u7B97\u9AD8\u5EA6\u5F02\u5E38 h=${l}, popupBottom=${a.bottom}, tabTop=${i.top}`)};if(s(),requestAnimationFrame(()=>requestAnimationFrame(s)),typeof ResizeObserver>"u"||e.__yytwwROTarget===r&&e.__yytwwRO)return;if(e.__yytwwRO)try{e.__yytwwRO.disconnect()}catch{}let o=new ResizeObserver(()=>s());o.observe(r),e.__yytwwRO=o,e.__yytwwROTarget=r}function Rm(t){let e=t?.[0];if(!e)return;let r=e.querySelector(".yyt-tww-hero"),s=e.querySelector(".yyt-tww-scroll");if(!r||!s)return;let o=()=>{s.scrollTop>0?r.classList.add("yyt-tww-hero--compact"):r.classList.remove("yyt-tww-hero--compact")};o(),s.addEventListener("scroll",o,{passive:!0})}var zn,pd,Mm,x0,Nm=D(()=>{tt();H();km();zn=E.createScope("TableWorkbenchPanel"),pd=!1;Mm={id:"tableWorkbenchPanel",render(){b0();try{let t=Cm();return Am(t)}catch(t){return zn.error("\u6E32\u67D3\u5DE5\u4F5C\u53F0 UI \u5F02\u5E38",t),`<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5DE5\u4F5C\u53F0\u6E32\u67D3\u5931\u8D25\uFF1A${t?.message||t}</span></div>`}},bindEvents(t){if(!te()||!we(t))return;let r=this,s=()=>{try{t.html(r.render()),ud(t,s),Im(t),Rm(t)}catch(o){zn.error("refresh \u5F02\u5E38",o)}};ud(t,s),Im(t),Rm(t)},renderTo(t){!te()||!we(t)||(t.html(this.render()),this.bindEvents(t))}},x0=Mm});var Lm={};ae(Lm,{LoggerPanel:()=>Dm,default:()=>_0});function T0(t){switch(t){case fe.DEBUG:return"yyt-log-debug";case fe.INFO:return"yyt-log-info";case fe.WARN:return"yyt-log-warn";case fe.ERROR:return"yyt-log-error";default:return""}}function S0(t){let e=new Date(t),r=s=>String(s).padStart(2,"0");return`${r(e.getHours())}:${r(e.getMinutes())}:${r(e.getSeconds())}.${String(e.getMilliseconds()).padStart(3,"0")}`}var w0,v0,Dm,_0,Om=D(()=>{H();Ze();tt();w0="yyt-logger-panel",v0=[{level:null,label:"\u5168\u90E8",icon:"fa-list"},{level:fe.DEBUG,label:"DEBUG",icon:"fa-bug"},{level:fe.INFO,label:"INFO",icon:"fa-circle-info"},{level:fe.WARN,label:"WARN",icon:"fa-triangle-exclamation"},{level:fe.ERROR,label:"ERROR",icon:"fa-circle-exclamation"}];Dm={id:"loggerPanel",render(){let t=E.getStats();return`
      <div class="yyt-logger-panel" id="${w0}">
        <div class="yyt-logger-toolbar">
          <div class="yyt-logger-filter-btns" data-yyt-log-filter-group>
            ${v0.map((e,r)=>`<button class="yyt-log-filter-btn ${r===0?"yyt-active":""}" data-level="${e.level??""}">
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
    `},bindEvents(t){let e=te();if(!e||!we(t))return;let r=this,s=null,o=!1,n=[],a=t.find("[data-yyt-log-list]"),i=t.find("[data-yyt-log-search]"),l=t.find("[data-yyt-log-autoscroll]"),d=t.find("[data-yyt-log-pause]");function c(y){if(!y.length){a.html('<div class="yyt-logger-empty">\u6682\u65E0\u5339\u914D\u7684\u65E5\u5FD7\u8BB0\u5F55</div>');return}a.html(y.map(m=>`
        <div class="yyt-log-entry ${T0(m.level)}" data-log-id="${m.id}">
          <span class="yyt-log-time">${S0(m.timestamp)}</span>
          <span class="yyt-log-level">${E.levelLabel(m.level)}</span>
          <span class="yyt-log-scope">${ie(m.scope)}</span>
          <span class="yyt-log-msg">${ie(m.message)}</span>
          ${m.data!==void 0?`<span class="yyt-log-data">${ie(typeof m.data=="object"?JSON.stringify(m.data):String(m.data))}</span>`:""}
        </div>
      `).join(""))}function u(){let y=i.val()?.trim()||"",{entries:m}=E.getEntries({level:s,search:y||void 0,limit:500});c(m),l.is(":checked")&&requestAnimationFrame(()=>{a[0].scrollTop=a[0].scrollHeight})}function p(){if(o||!n.length)return;let y=n;n=[],u()}this._onLogEntry=y=>{if(o||s!==null&&y.level<s)return;let m=i.val()?.trim().toLowerCase()||"";if(m){let g=y.scope.toLowerCase().includes(m),h=y.message.toLowerCase().includes(m);if(!g&&!h)return}n.push(y),n.length>=50?p():this._flushTimer||(this._flushTimer=setTimeout(()=>{this._flushTimer=null,p(),r._updateStats(t)},250))},W.on("logger:entry",this._onLogEntry),t.on("click.yytLogger","[data-yyt-log-filter-group] .yyt-log-filter-btn",y=>{t.find("[data-yyt-log-filter-group] .yyt-log-filter-btn").removeClass("yyt-active"),e(y.currentTarget).addClass("yyt-active");let m=e(y.currentTarget).data("level");s=m===""?null:m,u(),r._updateStats(t)}),i.on("input.yytLogger",()=>{u()}),t.on("click.yytLogger","[data-yyt-log-pause]",()=>{o=!o,d.toggleClass("yyt-active",o),d.html(o?'<i class="fa-solid fa-play"></i> \u7EE7\u7EED':'<i class="fa-solid fa-pause"></i> \u6682\u505C'),o||(n=[],u(),r._updateStats(t))}),t.on("click.yytLogger","[data-yyt-log-clear]",()=>{E.clear(),a.html('<div class="yyt-logger-empty">\u65E5\u5FD7\u5DF2\u6E05\u9664</div>'),r._updateStats(t)}),t.on("click.yytLogger","[data-yyt-log-export]",()=>{let{entries:y}=E.getEntries({limit:1e4}),m=JSON.stringify(y.map(S=>({time:new Date(S.timestamp).toISOString(),level:E.levelLabel(S.level),scope:S.scope,message:S.message,data:S.data})),null,2),g=new Blob([m],{type:"application/json"}),h=URL.createObjectURL(g),x=document.createElement("a");x.href=h,x.download=`yyt-logs-${new Date().toISOString().replace(/[:.]/g,"-")}.json`,x.click(),URL.revokeObjectURL(h)}),u()},_updateStats(t){if(!te()||!we(t))return;let r=E.getStats(),s=t.find(".yyt-logger-stats");s.length&&s.html(`
      <span class="yyt-logger-stat">\u5171 <strong>${r.total}</strong> \u6761</span>
      ${["ERROR","WARN","INFO","DEBUG"].map(o=>`<span class="yyt-logger-stat yyt-log-${o.toLowerCase()}">${o}: <strong>${r.byLevel[o]||0}</strong></span>`).join("")}
    `)},destroy(t){let e=te();this._onLogEntry&&(W.off("logger:entry",this._onLogEntry),this._onLogEntry=null),this._flushTimer&&(clearTimeout(this._flushTimer),this._flushTimer=null),!(!e||!we(t))&&t.off(".yytLogger")},getStyles(){return`
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
    `}},_0=Dm});var Hm={};ae(Hm,{MAIN_TAB_RENDERERS:()=>Cd,PanelState:()=>Di,SCRIPT_ID:()=>us,SUB_TAB_RENDERERS:()=>kd,UIManager:()=>qo,bindDialogEvents:()=>zo,closeActiveCustomSelectDropdown:()=>Zt,closeCustomSelectDropdown:()=>Bi,createDialogHtml:()=>Bo,default:()=>A0,destroyEnhancedCustomSelects:()=>gt,downloadJson:()=>Ko,enhanceNativeSelects:()=>zt,escapeHtml:()=>ie,fillFormWithConfig:()=>jh,getAllStyles:()=>Wm,getFormApiConfig:()=>Fh,getJQuery:()=>te,getTargetDocument:()=>Bt,initUI:()=>Km,isContainerValid:()=>we,normalizeCustomSelectOptions:()=>Xd,openCustomSelectDropdown:()=>Vd,readFileContent:()=>Uo,registerComponents:()=>yd,renderApiPanel:()=>fd,renderBypassPanel:()=>Sd,renderCustomSelectControl:()=>Qd,renderEscapeTransformToolPanel:()=>vd,renderLoggerPanel:()=>Ad,renderMainTab:()=>Fm,renderPunctuationTransformToolPanel:()=>Td,renderRegexPanel:()=>md,renderSettingsPanel:()=>_d,renderStatusBlockPanel:()=>xd,renderSubTabComponent:()=>jm,renderSummaryToolPanel:()=>bd,renderTableTemplatePanel:()=>hd,renderTableWorkbenchPanel:()=>Ed,renderToolPanel:()=>Um,renderWorldbookPresetPanel:()=>gd,renderYouyouReviewPanel:()=>wd,repositionActiveCustomSelectDropdown:()=>Oi,resetJQueryCache:()=>Dh,showConfirm:()=>br,showPrompt:()=>Wh,showToast:()=>Gn,showTopNotice:()=>$i,toggleCustomSelectDropdown:()=>Jd,uiManager:()=>qt,withButtonLoading:()=>Hh});async function Bm(t){if(!Ti.has(t)){let e=$m[t];if(typeof e!="function")throw new Error(`unknown_panel:${t}`);Ti.set(t,e().then(r=>{let s=r?.[t]||r?.default;if(!s?.id)throw new Error(`invalid_panel:${t}`);return s}).catch(r=>{throw Ti.delete(t),r}))}return Ti.get(t)}function zm(t,e=null){let r=e?.message?`\uFF1A${ie(e.message)}`:"";return`<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>${ie(t)}${r}</span></div>`}async function yd(){let t=await Promise.allSettled(Object.keys($m).map(async r=>{let s=await Bm(r);return qt.register(s.id,s),s.id})),e=t.filter(r=>r.status==="rejected");e.length&&e.forEach(r=>Kn.error("\u7EC4\u4EF6\u6CE8\u518C\u5931\u8D25",r.reason)),Kn.log(`\u7EC4\u4EF6\u6CE8\u518C\u5B8C\u6210\uFF0C\u6210\u529F ${t.length-e.length} \u4E2A\uFF0C\u5931\u8D25 ${e.length} \u4E2A`)}async function Km(t={}){let{autoInjectStyles:e=!0,targetDocument:r,...s}=t;qt.init(s),await yd(),e&&qt.injectStyles(r),Kn.log("\u6A21\u5757\u521D\u59CB\u5316\u5B8C\u6210")}async function E0(t){let e=await Bm(t);return qt.getComponent(e.id)||qt.register(e.id,e),e}async function Ct(t,e,r={}){let s=await E0(t);qt.render(s.id,e,r)}function fd(t){return Ct("ApiPresetPanel",t)}function gd(t){return Ct("WorldbookPresetPanel",t)}function md(t){return Ct("RegexExtractPanel",t)}function hd(t){return Ct("TableTemplatePanel",t)}function Um(t){return Ct("ToolManagePanel",t)}function bd(t){return Ct("SummaryToolPanel",t)}function xd(t){return Ct("StatusBlockPanel",t)}function wd(t){return Ct("YouyouReviewPanel",t)}function vd(t){return Ct("EscapeTransformToolPanel",t)}function Td(t){return Ct("PunctuationTransformToolPanel",t)}function Sd(t){return Ct("BypassPanel",t)}function _d(t){return Ct("SettingsPanel",t)}function Ed(t){return Ct("TableWorkbenchPanel",t)}function Ad(t){return Ct("LoggerPanel",t)}async function Fm(t,e){let r=Cd[t];if(!r)return!1;try{await r.render(e)}catch(s){Kn.error(r.failMessage,s),e.html(zm(r.failMessage,s))}return!0}async function jm(t,e){let r=kd[t];if(!r)return null;try{await r.render(e)}catch(s){Kn.error(r.failMessage,s),e.html(zm(r.failMessage,s))}return t}function Wm(){return qt.getAllStyles()}var Kn,$m,Ti,Cd,kd,A0,Gm=D(()=>{H();Ji();tt();tt();Ji();Kn=E.createScope("UI"),$m=Object.freeze({ApiPresetPanel:()=>Promise.resolve().then(()=>(Au(),Eu)),WorldbookPresetPanel:()=>Promise.resolve().then(()=>(Wu(),ju)),RegexExtractPanel:()=>Promise.resolve().then(()=>(Jp(),Vp)),TableTemplatePanel:()=>Promise.resolve().then(()=>(pf(),uf)),ToolManagePanel:()=>Promise.resolve().then(()=>(gf(),ff)),SummaryToolPanel:()=>Promise.resolve().then(()=>(Bf(),$f)),StatusBlockPanel:()=>Promise.resolve().then(()=>(Uf(),Kf)),YouyouReviewPanel:()=>Promise.resolve().then(()=>(Wf(),jf)),EscapeTransformToolPanel:()=>Promise.resolve().then(()=>(Yf(),qf)),PunctuationTransformToolPanel:()=>Promise.resolve().then(()=>(Xf(),Jf)),BypassPanel:()=>Promise.resolve().then(()=>(eg(),Zf)),SettingsPanel:()=>Promise.resolve().then(()=>(Lc(),Dc)),TableWorkbenchPanel:()=>Promise.resolve().then(()=>(Nm(),Pm)),LoggerPanel:()=>Promise.resolve().then(()=>(Om(),Lm))}),Ti=new Map;Cd=Object.freeze({tableWorkbench:{render:t=>Ed(t),failMessage:"\u586B\u8868\u5DE5\u4F5C\u53F0\u52A0\u8F7D\u5931\u8D25"},bypass:{render:t=>Sd(t),failMessage:"Ai\u6307\u4EE4\u9884\u8BBE\u9762\u677F\u52A0\u8F7D\u5931\u8D25"},settings:{render:t=>_d(t),failMessage:"\u8BBE\u7F6E\u9762\u677F\u52A0\u8F7D\u5931\u8D25"},logger:{render:t=>Ad(t),failMessage:"\u65E5\u5FD7\u9762\u677F\u52A0\u8F7D\u5931\u8D25"}}),kd=Object.freeze({ApiPresetPanel:{render:t=>fd(t),failMessage:"API \u9884\u8BBE\u9762\u677F\u52A0\u8F7D\u5931\u8D25"},RegexExtractPanel:{render:t=>md(t),failMessage:"\u6B63\u5219\u63D0\u53D6\u9762\u677F\u52A0\u8F7D\u5931\u8D25"},WorldbookPresetPanel:{render:t=>gd(t),failMessage:"\u4E16\u754C\u4E66\u9884\u8BBE\u9762\u677F\u52A0\u8F7D\u5931\u8D25"},TableTemplatePanel:{render:t=>hd(t),failMessage:"\u8868\u683C\u6A21\u677F\u9762\u677F\u52A0\u8F7D\u5931\u8D25"},SummaryToolPanel:{render:t=>bd(t),failMessage:"\u6458\u8981\u5DE5\u5177\u52A0\u8F7D\u5931\u8D25"},StatusBlockPanel:{render:t=>xd(t),failMessage:"\u4E3B\u89D2\u72B6\u6001\u680F\u52A0\u8F7D\u5931\u8D25"},YouyouReviewPanel:{render:t=>wd(t),failMessage:"\u5C0F\u5E7D\u70B9\u8BC4\u52A0\u8F7D\u5931\u8D25"},EscapeTransformToolPanel:{render:t=>vd(t),failMessage:"\u8F6C\u4E49\u5904\u7406\u5DE5\u5177\u52A0\u8F7D\u5931\u8D25"},PunctuationTransformToolPanel:{render:t=>Td(t),failMessage:"\u4E2D\u6587\u6807\u70B9\u66FF\u6362\u5DE5\u5177\u52A0\u8F7D\u5931\u8D25"}});A0={uiManager:qt,registerComponents:yd,initUI:Km,renderApiPanel:fd,renderWorldbookPresetPanel:gd,renderRegexPanel:md,renderTableTemplatePanel:hd,renderToolPanel:Um,renderSummaryToolPanel:bd,renderStatusBlockPanel:xd,renderYouyouReviewPanel:wd,renderEscapeTransformToolPanel:vd,renderPunctuationTransformToolPanel:Td,renderBypassPanel:Sd,renderSettingsPanel:_d,renderTableWorkbenchPanel:Ed,renderLoggerPanel:Ad,MAIN_TAB_RENDERERS:Cd,SUB_TAB_RENDERERS:kd,renderMainTab:Fm,renderSubTabComponent:jm,getAllStyles:Wm}});var Qm={};ae(Qm,{TX_PHASE:()=>Ht,ToolAutomationService:()=>_i,Transaction:()=>Si,default:()=>M0,toolAutomationService:()=>Xm});function ge(t){return t==null?"":String(t).trim()}function qm(t){let e=pa(t);return ge(e?.chatId??e?.chat_id??t?.chatId??t?.chat_id??t?.chat_filename??t?.this_chid??"chat_default")||"chat_default"}function Id(t){let e=pa(t);return Array.isArray(e?.chat)?e.chat:Array.isArray(t?.chat)?t.chat:[]}function Jm(t){if(!t||t?.is_user===!0||t?.is_system===!0)return!1;let e=String(t?.role||"").trim().toLowerCase();return e==="user"||e==="system"?!1:e==="assistant"||e==="ai"||!e}function C0(t,e){let r=ge(e);if(!r)return null;let s=Id(t);for(let o=s.length-1;o>=0;o-=1){let n=s[o];if([n?.messageId,n?.message_id,n?.id,n?.mid,n?.mesid,n?.chat_index,o].map(i=>ge(i)).includes(r))return n||null}return null}function Ym(t){let e=Id(t);if(!Array.isArray(e)||e.length===0)return null;let r=e.length-1,s=e[r]||null;if(!Jm(s))return null;let o=ge(s?.messageId??s?.message_id??s?.id??s?.mid??s?.mesid??s?.chat_index??r);return o?{messageId:o,swipeId:ge(s?.swipeId??s?.swipe_id??s?.swipe??s?.swipeIndex),message:s}:null}function R0(){let t=Date.now().toString(36),e=Math.random().toString(36).slice(2,8);return`tx_${t}_${e}`}var Ve,Vm,k0,I0,Ht,Si,_i,Xm,M0,Zm=D(()=>{vn();H();ya();lr();Sn();Tc();ws();xi();dr();Ve=E.createScope("ToolAutomation");Vm=1e4,k0=15e3,I0=800;Ht=Object.freeze({RECEIVED:"received",CONFIRMED:"confirmed",CONTEXT_BUILT:"context_built",REQUEST_STARTED:"request_started",REQUEST_FINISHED:"request_finished",WRITEBACK_STARTED:"writeback_started",WRITEBACK_COMMITTED:"writeback_committed",REFRESH_CONFIRMED:"refresh_confirmed",SKIPPED:"skipped",FAILED:"failed"}),Si=class{constructor({chatId:e,messageId:r,swipeId:s,sourceEvent:o,generationKey:n}){this.traceId=R0(),this.chatId=e||"",this.messageId=r||"",this.swipeId=s||"",this.sourceEvent=o||"",this.generationKey=n||"",this.phase=Ht.RECEIVED,this.createdAt=Date.now(),this.updatedAt=Date.now(),this.verdict="",this.error=null,this.toolResults=[],this.writebackState=null,this.refreshState=null}transition(e,r={}){return this.phase=e,this.updatedAt=Date.now(),Object.assign(this,r),this}toSnapshot(){return{...this}}},_i=class{constructor(){this._stopCallbacks=[],this._pendingTimers=new Map,this._recentlyProcessedSlots=new Map,this._ownWriteMessageIds=new Map,this._slotQueues=new Map,this._activeTransactions=new Map,this._isProcessing=!1,this._currentChatId="",this.debugMode=!1,this._transactionHistory=[],this._maxHistorySize=30,this._hostBindingStatus={initialized:!1,initAttempts:0,lastInitAt:0,lastInitResult:"idle",source:"unavailable",hasEventSource:!1,hasEventTypes:!1,eventBindings:[],retryScheduled:!1,retryDelayMs:0,lastError:""},this._messageReceivedThrottleUntil=0}setDebugMode(e){this.debugMode=e===!0}init(e={}){this.stop(),this._hostBindingStatus.lastInitAt=Date.now(),this._hostBindingStatus.initAttempts=(this._hostBindingStatus.initAttempts||0)+1;let r=Br();this._currentChatId=qm(r);let s=(o,...n)=>{let a=Br(),{messageId:i,swipeId:l}=this._extractIdentitiesFromArgs(n);if(Ve.debug(`\u6536\u5230\u5BBF\u4E3B\u4E8B\u4EF6 "${o}"`,{messageId:i,swipeId:l,argCount:n.length}),o===We.MESSAGE_RECEIVED){let g=Date.now();if(g<this._messageReceivedThrottleUntil){Ve.debug(`MESSAGE_RECEIVED \u5728\u8282\u6D41\u7A97\u53E3\u5185\uFF0C\u8DF3\u8FC7\uFF08\u5269\u4F59 ${this._messageReceivedThrottleUntil-g}ms\uFF09`);return}this._messageReceivedThrottleUntil=g+this._getSettleMs()+5e3}let d=null,c=i,u=l;if(c&&(d=C0(a,c)),!d){let g=Ym(a);g?.messageId&&(d=g.message,c=g.messageId,u=g.swipeId||u)}if(!c||!d){Ve.debug(`\u4E8B\u4EF6 "${o}" \u65E0 assistant \u76EE\u6807\uFF0C\u8DF3\u8FC7`);return}if(!Jm(d)){Ve.debug(`\u4E8B\u4EF6 "${o}" \u547D\u4E2D\u975E assistant \u6D88\u606F\uFF0C\u8DF3\u8FC7`,{messageId:c});return}let p=String(d.content||d.mes||"").trim();if(!p||p.length<5){Ve.debug(`\u4E8B\u4EF6 "${o}" \u6D88\u606F\u8FC7\u77ED\uFF08${p.length} \u5B57\u7B26\uFF09\uFF0C\u8DF3\u8FC7`);return}if(this._isProcessing){Ve.debug(`\u4E8B\u4EF6 "${o}" \u6B63\u5728\u5904\u7406\u4E2D\uFF0C\u8DF3\u8FC7`);return}if(this._isOwnWrite(c)){Ve.debug(`\u4E8B\u4EF6 "${o}" \u547D\u4E2D own-write \u9ED1\u540D\u5355\uFF0C\u8DF3\u8FC7`,{messageId:c});return}let y=ge(d?.swipeId??d?.swipe_id??d?.swipe??d?.swipeIndex);y&&(u=y);let m=`${c}::${u}`;if(this._isRecentlyProcessed(m)){Ve.debug(`\u4E8B\u4EF6 "${o}" slot \u5DF2\u8FD1\u671F\u5904\u7406\u8FC7\uFF0C\u8DF3\u8FC7`,{slotKey:m});return}this._scheduleMessageProcessing(c,u,{settleMs:this._getSettleMs(),sourceEvent:o}),Ve.info(`\u4E8B\u4EF6 "${o}" \u901A\u8FC7\u6240\u6709\u5B88\u536B\uFF0C\u5DF2\u8C03\u5EA6\u5904\u7406`,{targetMessageId:c,targetSwipeId:u,throttleUntil:this._messageReceivedThrottleUntil,isProcessing:this._isProcessing})};return this._stopCallbacks.push(vt.subscribe(We.MESSAGE_SENT,()=>{Ve.debug("MESSAGE_SENT \u2192 \u6E05\u7406\u8C03\u5EA6\u961F\u5217"),this._pendingTimers.forEach(o=>clearTimeout(o)),this._pendingTimers.clear()})),this._stopCallbacks.push(vt.subscribe(We.MESSAGE_RECEIVED,(...o)=>{s(We.MESSAGE_RECEIVED,...o)})),this._stopCallbacks.push(vt.subscribe(We.GENERATION_STOPPED,()=>{Ve.info("GENERATION_STOPPED \u2192 \u53D6\u6D88\u6240\u6709\u6D3B\u8DC3\u4E8B\u52A1"),this._cancelActiveTransactions("generation_stopped"),this._pendingTimers.forEach(o=>clearTimeout(o)),this._pendingTimers.clear(),this._isProcessing=!1})),this._stopCallbacks.push(vt.subscribe(We.CHAT_CHANGED,()=>{this._resetForChatChange()})),this._stopCallbacks.push(vt.subscribe(We.MESSAGE_DELETED,o=>{this._clearMessageState(ge(o))})),this._refreshHostBindingStatus(),this._seedKnownSlots(),Ve.info("\u81EA\u52A8\u5316\u670D\u52A1\u5DF2\u521D\u59CB\u5316",{chatId:this._currentChatId,source:this._hostBindingStatus.source}),!0}_seedKnownSlots(){try{let e=Br(),r=Ym(e);if(!r?.messageId)return;let s=`${ge(r.messageId)}::${ge(r.swipeId)}`;this._recentlyProcessedSlots.set(s,Number.MAX_SAFE_INTEGER),Ve.debug(`\u5DF2\u5C06\u5F53\u524D\u6700\u65B0 slot "${s}" \u9884\u6807\u8BB0\u4E3A\u5DF2\u77E5\uFF0C\u8DF3\u8FC7 MESSAGE_RECEIVED \u91CD\u653E`)}catch(e){Ve.warn("_seedKnownSlots \u5931\u8D25",{error:e})}}_refreshHostBindingStatus(){let e=vt.describe(),r=[We.MESSAGE_SENT,We.MESSAGE_RECEIVED,We.GENERATION_STOPPED,We.CHAT_CHANGED,We.MESSAGE_DELETED];this._hostBindingStatus={...this._hostBindingStatus,initialized:!!e.hasBridge,lastInitResult:e.hasBridge?"ready":e.retryScheduled?"pending_retry":"pending",source:e.source,hasEventSource:!!e.hasBridge,hasEventTypes:Array.isArray(e.availableEvents)&&e.availableEvents.length>0,eventBindings:r.map(s=>`subscribed: ${s}`),retryScheduled:!!e.retryScheduled,retryDelayMs:0,lastError:""}}stop(){this._stopCallbacks.forEach(e=>{try{e()}catch(r){Ve.warn("\u505C\u6B62\u56DE\u8C03\u5931\u8D25",{error:r})}}),this._stopCallbacks=[],this._pendingTimers.forEach(e=>clearTimeout(e)),this._pendingTimers.clear(),this._slotQueues.clear(),this._recentlyProcessedSlots.clear(),this._ownWriteMessageIds.clear(),this._cancelActiveTransactions("service_stopped"),this._activeTransactions.clear(),this._isProcessing=!1,this._hostBindingStatus={initialized:!1,initAttempts:0,lastInitAt:0,lastInitResult:"idle",source:"unavailable",hasEventSource:!1,hasEventTypes:!1,eventBindings:[],retryScheduled:!1,retryDelayMs:0,lastError:""}}isEnabled(){return!0}getRuntimeSnapshot(){return this._pruneRecentSlots(),this._pruneOwnWrites(),this._refreshHostBindingStatus(),{currentChatId:this._currentChatId,enabled:!0,isProcessing:this._isProcessing,pendingTimerCount:this._pendingTimers.size,queuedSlotCount:this._slotQueues.size,recentlyProcessedSlotCount:this._recentlyProcessedSlots.size,ownWriteMessageIdCount:this._ownWriteMessageIds.size,activeTransactionCount:this._activeTransactions.size,recentTransactions:this._transactionHistory.slice(-10).map(e=>e.toSnapshot()),hostBinding:{...this._hostBindingStatus,eventBindings:Array.isArray(this._hostBindingStatus?.eventBindings)?[...this._hostBindingStatus.eventBindings]:[]},settings:this._getAutomationSettings()}}async processCurrentAssistantMessage(e={}){let r=await xs({messageId:"",swipeId:"",runSource:"AUTO"}),s=ge(r?.sourceMessageId||r?.messageId);return s?this.processAssistantMessage(s,{force:e.force===!0,swipeId:ge(r?.sourceSwipeId),sourceEvent:e.sourceEvent||"MANUAL_CURRENT_ASSISTANT"}):{success:!1,error:"\u672A\u627E\u5230\u5F53\u524D assistant \u697C\u5C42"}}async processAssistantMessage(e,{force:r=!1,swipeId:s="",sourceEvent:o="AUTO"}={}){let n=new Si({chatId:this._currentChatId,messageId:e,swipeId:s,sourceEvent:o});try{if(!e)return this._skipTransaction(n,"missing_message_id");n.transition(Ht.CONFIRMED);let a=await xs({messageId:e,swipeId:s,runSource:"AUTO"}),i=a?.targetAssistantMessage||null;if(!i||!a?.sourceMessageId)return this._skipTransaction(n,"assistant_message_not_found");let l=String(i.content||i.mes||"").trim();if(!l||l.length<5)return this._skipTransaction(n,"assistant_message_too_short");n.transition(Ht.CONTEXT_BUILT);let d=`${ge(a.sourceMessageId)}::${ge(a.sourceSwipeId||s)}`;if(n.generationKey=d,!r&&this._isRecentlyProcessed(d))return this._skipTransaction(n,"duplicate_slot",{slotKey:d});let c=on(),u=Ot.filterAutoPostResponseTools(c),y=[...c.filter(h=>Ot.shouldRunLocalTransform(h)&&h.output?.autoTrigger!==!1),...u],m=Pe(),g=m?.autoUpdateEnabled===!0&&ge(m?.autoUpdateTrigger||"assistantMessage")==="assistantMessage";return!y.length&&!g?this._skipTransaction(n,"no_auto_tools",{tools:y}):(n.slotKey=d,n.slotRevisionKey=a.slotRevisionKey||"",n.sourceMessageId=a.sourceMessageId||e,n.sourceSwipeId=a.sourceSwipeId||s||"",this._enqueueSlot(d,async()=>{if(!r&&this._isRecentlyProcessed(d))return this._skipTransaction(n,"duplicate_slot_after_queue",{slotKey:d});this._isProcessing=!0,this._markSlotProcessed(d),n.transition(Ht.REQUEST_STARTED);let h=new AbortController;this._registerActiveTransaction(n,{controller:h,slotKey:d,sourceMessageId:a.sourceMessageId||e,sourceSwipeId:a.sourceSwipeId||s||""});try{let{results:x,hasWriteback:S}=await this._executeAutoTools(y,a,h,n,{slotKey:d,messageId:e,swipeId:s}),{tableResult:T,hasWriteback:A}=await this._executeAutoTableUpdate(a,h,n,{shouldRunTableAuto:g,tableWorkbenchConfig:m,messageId:e,swipeId:s,sourceEvent:o}),C=S||A;n.transition(Ht.REQUEST_FINISHED,{toolResults:x,tableResult:T}),C&&(n.transition(Ht.WRITEBACK_STARTED),n.writebackState={messageId:a.sourceMessageId,swipeId:a.sourceSwipeId,hasOutput:!0},this._messageReceivedThrottleUntil=Date.now()+k0),this._markSlotProcessed(d);let w=x.every(_=>_?.success!==!1),P=!g||!!T?.success||T?.skipped===!0||T?.meta?.aborted===!0||T?.meta?.stale===!0,B=w&&P,z=x.some(_=>_?.meta?.aborted===!0||_?.meta?.stale===!0||_?.error==="\u8BF7\u6C42\u5DF2\u53D6\u6D88")||T?.meta?.aborted===!0||T?.meta?.stale===!0;B&&n.transition(Ht.WRITEBACK_COMMITTED);let R=B?Ht.REFRESH_CONFIRMED:Ht.FAILED;return n.transition(R,{verdict:z?"aborted":B?"success":"partial_failure"}),this._recordTransaction(n),this._updateAutoRuntimeForResults(y,a,n,x),{success:B,traceId:n.traceId,slotKey:d,sourceEvent:o,messageId:a.sourceMessageId||e,phase:n.phase,results:x,tableResult:T}}finally{this._unregisterActiveTransaction(n.traceId),this._isProcessing=!1}}))}catch(a){return n.transition(Ht.FAILED,{error:a?.message||String(a)}),this._recordTransaction(n),this._unregisterActiveTransaction(n.traceId),this._isProcessing=!1,Ve.error("processAssistantMessage \u5F02\u5E38",{error:a}),{success:!1,traceId:n.traceId,error:n.error,phase:n.phase}}}_extractIdentitiesFromArgs(e){let r="",s="";for(let o of e)if(o!=null){if(typeof o=="number"&&Number.isFinite(o)&&!r){r=ge(o);continue}if(typeof o=="string"){let n=ge(o);!r&&/^\d+$/.test(n)&&(r=n);continue}typeof o=="object"&&(r||(r=ge(o.messageId??o.message_id??o.id??o.mid??o.mesid??o.chat_index??o.message?.messageId??o.message?.message_id??o.message?.id??o.message?.mid??o.message?.mesid??o.message?.chat_index??o.data?.messageId??o.data?.message_id??o.data?.id??o.data?.mid??o.data?.mesid??o.data?.chat_index??o.target?.messageId??o.target?.message_id??o.target?.id??o.target?.mid??o.target?.mesid??o.target?.chat_index)),s||(s=ge(o.swipeId??o.swipe_id??o.swipe??o.swipeIndex??o.currentSwipe??o.message?.swipeId??o.message?.swipe_id??o.message?.swipe??o.data?.swipeId??o.data?.swipe_id??o.data?.swipe??o.target?.swipeId??o.target?.swipe_id??o.target?.swipe)))}return{messageId:r,swipeId:s}}_scheduleMessageProcessing(e,r="",s={}){let o=s.settleMs??this._getSettleMs(),n=`msg::${ge(e)}::${ge(r)}`,a=this._pendingTimers.get(n);a&&clearTimeout(a);let i=setTimeout(()=>{this._pendingTimers.delete(n),this.processAssistantMessage(e,{swipeId:r,sourceEvent:s.sourceEvent||"AUTO"}).catch(l=>{Ve.error("\u8C03\u5EA6\u6267\u884C\u5931\u8D25",{messageId:e,error:l})})},Math.max(0,o));this._pendingTimers.set(n,i),Ve.info("\u5DF2\u8C03\u5EA6\u6D88\u606F\u5904\u7406",{timerKey:n,settleMs:o,sourceEvent:s.sourceEvent})}cancelAutomation(e={}){let r=e.reason||"manual_cancel",s=ge(e.messageId),o=ge(e.slotKey),n=ge(e.traceId),a=0;for(let[i,l]of this._pendingTimers){let d=s&&i.includes(`::${s}::`),c=o&&i.includes(o);(d||c||!s&&!o&&!n)&&(clearTimeout(l),this._pendingTimers.delete(i),a+=1)}return a+=this._cancelActiveTransactions(r,{messageId:s,slotKey:o,traceId:n}),{success:a>0,cancelledCount:a,reason:r}}_isRecentlyProcessed(e){if(!e)return!1;this._pruneRecentSlots();let r=this._recentlyProcessedSlots.get(e);return r?Date.now()-r<this._getDedupeWindowMs():!1}_markSlotProcessed(e){e&&(this._recentlyProcessedSlots.set(e,Date.now()),this._pruneRecentSlots())}_pruneRecentSlots(){let e=Date.now()-this._getDedupeWindowMs();for(let[r,s]of this._recentlyProcessedSlots)(!Number.isFinite(s)||s<e)&&this._recentlyProcessedSlots.delete(r)}async _executeAutoTools(e,r,s,o,{slotKey:n,messageId:a,swipeId:i}){let l=[],d=!1,c=r.lastAiMessage,u=r.assistantBaseText;for(let p of e){let y={...r,signal:s.signal,isAutoRun:!0,abortMeta:{traceId:o.traceId,slotKey:n,sourceMessageId:r.sourceMessageId||a,sourceSwipeId:r.sourceSwipeId||i||""},shouldAbortWriteback:()=>this._shouldAbortAutoWriteback({traceId:o.traceId}),skipNotify:!0,lastAiMessage:c,assistantBaseText:u,input:{...r.input||{},lastAiMessage:c,assistantBaseText:u}},g=Ot.shouldRunLocalTransform(p)?await ei(p,y):await Ot.runToolPostResponse(p,y);if(l.push(g),g?.writebackState||g?.output){d=!0,this._markOwnWrite(r.sourceMessageId||a);let h=this._readCurrentMessageText(r.sourceMessageId||a);if(h){c=h,u=h;let x=Number(r.sourceMessageId||a);Array.isArray(r.chatMessages)&&r.chatMessages[x]&&(r.chatMessages[x].content=h,r.chatMessages[x].mes=h)}}}return{results:l,hasWriteback:d}}async _executeAutoTableUpdate(e,r,s,{shouldRunTableAuto:o,tableWorkbenchConfig:n,messageId:a,swipeId:i,sourceEvent:l}){if(!o)return{tableResult:null,hasWriteback:!1};let d=await fm({messageId:e.sourceMessageId||a,swipeId:e.sourceSwipeId||i||"",sourceEvent:l,configInput:n,signal:r.signal,shouldAbortWriteback:()=>this._shouldAbortAutoWriteback({traceId:s.traceId})}),c=!!(d?.state||d?.mirrorResult?.success===!0);return c&&this._markOwnWrite(e.sourceMessageId||a),{tableResult:d,hasWriteback:c}}_readCurrentMessageText(e){let r=Br(),s=Id(r),o=Number(e);if(!Number.isFinite(o)||o<0||o>=s.length)return"";let n=s[o];return String(n?.mes||n?.content||"").trim()}_markOwnWrite(e){let r=ge(e);r&&(this._ownWriteMessageIds.set(r,Date.now()),this._pruneOwnWrites())}_isOwnWrite(e){let r=ge(e);if(!r)return!1;this._pruneOwnWrites();let s=this._ownWriteMessageIds.get(r);return s?Date.now()-s<Vm:!1}_pruneOwnWrites(){let e=Date.now()-Vm;for(let[r,s]of this._ownWriteMessageIds)(!Number.isFinite(s)||s<e)&&this._ownWriteMessageIds.delete(r)}_recordTransaction(e){this._transactionHistory.push(e),this._transactionHistory.length>this._maxHistorySize&&(this._transactionHistory=this._transactionHistory.slice(-this._maxHistorySize)),Ve.debug(`\u4E8B\u52A1 [${e.traceId}] \u2192 ${e.phase}`,{messageId:e.messageId,generationKey:e.generationKey,verdict:e.verdict,sourceEvent:e.sourceEvent,error:e.error})}_skipTransaction(e,r,s={}){return e.transition(Ht.SKIPPED,{verdict:r,...s}),this._recordTransaction(e),Array.isArray(s?.tools)&&s.tools.length>0&&this._updateAutoRuntimeForSkip(s.tools,e,r,s),{success:!1,skipped:!0,reason:r,traceId:e.traceId,...s}}_enqueueSlot(e,r){let o=(this._slotQueues.get(e)||Promise.resolve()).catch(()=>{}).then(r).finally(()=>{this._slotQueues.get(e)===o&&this._slotQueues.delete(e)});return this._slotQueues.set(e,o),o}_registerActiveTransaction(e,r={}){e?.traceId&&this._activeTransactions.set(e.traceId,{traceId:e.traceId,generationKey:r.generationKey||e.generationKey||"",slotKey:r.slotKey||e.slotKey||"",sourceMessageId:r.sourceMessageId||e.sourceMessageId||"",sourceSwipeId:r.sourceSwipeId||e.sourceSwipeId||"",slotRevisionKey:r.slotRevisionKey||e.slotRevisionKey||"",assistantBaseFingerprint:r.assistantBaseFingerprint||"",assistantBaseText:r.assistantBaseText||"",controller:r.controller||null,cancelled:!1,cancelReason:""})}_unregisterActiveTransaction(e){e&&this._activeTransactions.delete(e)}_cancelActiveTransactions(e="manual_cancel",r={}){let s=ge(r.messageId),o=ge(r.slotKey),n=ge(r.traceId),a=0;for(let[i,l]of this._activeTransactions){let d=n&&i===n,c=s&&ge(l?.sourceMessageId)===s,u=o&&ge(l?.slotKey)===o;if(!(!d&&!c&&!u&&!(!n&&!s&&!o))){l.cancelled=!0,l.cancelReason=e;try{l?.controller?.abort?.()}catch{}a+=1}}return a}_shouldAbortAutoWriteback(e={}){let r=ge(e.traceId);if(r){let s=this._activeTransactions.get(r);if(!s||s.cancelled)return{aborted:!0,reason:"cancelled_before_host_commit"}}return!1}_updateAutoRuntimeForSkip(e,r,s,o={}){e.forEach(n=>{n?.id&&Kr(n.id,{lastAutoRunAt:Date.now(),lastAutoStatus:"skipped",lastAutoMessageId:r?.sourceMessageId||r?.messageId||"",lastAutoSwipeId:r?.sourceSwipeId||r?.swipeId||"",lastAutoRevisionKey:r?.slotRevisionKey||o?.slotRevisionKey||"",lastAutoWritebackStatus:"",lastAutoRefreshConfirmed:!1,lastAutoSkipReason:s||""},{touchLastRunAt:!1,emitEvent:!1,emitRuntimeEvent:!0})})}_updateAutoRuntimeForResults(e,r,s,o=[]){e.forEach((n,a)=>{if(!n?.id)return;let i=o[a]||{},l=i?.meta?.writebackDetails||{},d=i?.meta?.aborted===!0||i?.meta?.stale===!0?"aborted":i?.success===!1?"failed":"success",c=i?.meta?.aborted===!0?i?.meta?.abortReason||(i?.meta?.stale===!0?"stale_base_changed":"cancelled_before_host_commit"):"";Kr(n.id,{lastAutoRunAt:Date.now(),lastAutoStatus:d,lastAutoMessageId:r?.sourceMessageId||s?.sourceMessageId||s?.messageId||"",lastAutoSwipeId:r?.sourceSwipeId||s?.sourceSwipeId||s?.swipeId||"",lastAutoRevisionKey:r?.slotRevisionKey||s?.slotRevisionKey||"",lastAutoWritebackStatus:i?.meta?.writebackStatus||"",lastAutoRefreshConfirmed:!!l.refreshConfirmed,lastAutoSkipReason:c},{touchLastRunAt:!1,emitEvent:!1,emitRuntimeEvent:!0})})}_resetForChatChange(){let e=Br(),r=qm(e);Ve.info("\u804A\u5929\u5207\u6362",{from:this._currentChatId,to:r}),this._currentChatId=r,this._pendingTimers.forEach(s=>clearTimeout(s)),this._pendingTimers.clear(),this._slotQueues.clear(),this._recentlyProcessedSlots.clear(),this._ownWriteMessageIds.clear(),this._cancelActiveTransactions("chat_changed"),this._activeTransactions.clear(),this._isProcessing=!1,this._messageReceivedThrottleUntil=0,this._seedKnownSlots()}_clearMessageState(e){if(e){for(let[r,s]of this._pendingTimers)(r.includes(`::${e}::`)||r.startsWith(`msg::${e}::`))&&(clearTimeout(s),this._pendingTimers.delete(r));for(let r of this._recentlyProcessedSlots.keys())r.startsWith(`${e}::`)&&this._recentlyProcessedSlots.delete(r);this._ownWriteMessageIds.delete(ge(e)),this._seedKnownSlots()}}_getAutomationSettings(){let e=jt.getSettings()?.automation||{},r=Number.isFinite(e.settleMs)?e.settleMs:I0;return{settleMs:r,dedupeWindowMs:Number.isFinite(e.dedupeWindowMs)?e.dedupeWindowMs:Math.max(5e3,r+600)}}_getSettleMs(){return this._getAutomationSettings().settleMs}_getDedupeWindowMs(){return this._getAutomationSettings().dedupeWindowMs}},Xm=new _i,M0=Xm});var sh={};ae(sh,{BUILTIN_REGEX_PRESETS:()=>Ai,BUILTIN_WORLDBOOK_PRESETS:()=>Rd,MIGRATION_BACKUP_KEY:()=>th,MIGRATION_DONE_KEY:()=>Ei,default:()=>L0,ensurePresetSystem:()=>rh,registerBuiltinPresets:()=>Md,runMigrationOnce:()=>Pd});function P0(t){if(!Array.isArray(t)||t.length===0)return null;let e=t.map(r=>String(r||"").trim()).filter(Boolean).sort().join("|");if(!e)return null;for(let r of Ai)if(r.rules.filter(o=>o.type==="include"&&o.enabled!==!1).map(o=>o.value).sort().join("|")===e)return r.id;return null}function Md(){try{typeof Ll=="function"&&Ll(Ai),typeof il=="function"&&il(Rd),os.info("\u5185\u7F6E\u9884\u8BBE\u5DF2\u6CE8\u518C",{regex:Ai.length,worldbook:Rd.length})}catch(t){os.error("\u6CE8\u518C\u5185\u7F6E\u9884\u8BBE\u5931\u8D25",{error:t})}}function N0(t){let e=new Set,r=[];for(let s of Array.isArray(t)?t:[]){let o=String(s||"").trim();if(!(!o||e.has(o)))if(e.add(o),o.startsWith("regex:")){let n=o.slice(6).trim();n&&r.push({type:"regex_include",value:n,enabled:!0,name:"",description:""})}else r.push({type:"include",value:o,enabled:!0,name:"",description:""})}return r}function D0(t,e,r){let s=JSON.parse(JSON.stringify(r||{})),o=!1,n=s.extraction||{};if(!n.regexPresetId){let i=Array.isArray(n.selectors)?n.selectors:[];if(i.length>0){let l=P0(i);if(l)n.regexPresetId=l,o=!0,os.info(`\u5DE5\u5177 ${t} \u7ED1\u5B9A\u5185\u7F6E\u6B63\u5219\u9884\u8BBE: ${l}`);else{let d=Sa({name:`${e||t}_\u8FC1\u79FB_\u6B63\u5219`,description:`\u81EA\u8001\u7248\u672C selectors \u81EA\u52A8\u8FC1\u79FB\uFF08${i.length} \u9879\uFF09`,rules:N0(i),blacklist:[]});d?.id&&(n.regexPresetId=d.id,o=!0,os.info(`\u5DE5\u5177 ${t} \u521B\u5EFA\u8FC1\u79FB\u6B63\u5219\u9884\u8BBE: ${d.id}`))}s.extraction=n}}let a=s.worldbooks||{};if(!a.presetId&&a.enabled===!0&&Array.isArray(a.selected)&&a.selected.length>0){let i=aa({name:`${e||t}_\u8FC1\u79FB_\u4E16\u754C\u4E66`,description:`\u81EA\u8001\u7248\u672C worldbooks.selected \u81EA\u52A8\u8FC1\u79FB\uFF08${a.selected.length} \u672C\uFF09`,bindingMode:"custom",includeDisabled:!1,bookList:a.selected.map(l=>({bookName:String(l||""),enabled:!0,entryOverrides:{}})).filter(l=>l.bookName)});i?.id&&(a.presetId=i.id,o=!0,os.info(`\u5DE5\u5177 ${t} \u521B\u5EFA\u8FC1\u79FB\u4E16\u754C\u4E66\u9884\u8BBE: ${i.id}`)),s.worldbooks=a}return o?s:null}function Pd(){try{if(ke.get(Ei)===!0)return{skipped:!0,reason:"already_done"};let t=$.get(eh)||{};if(!t||typeof t!="object")return os.info("\u65E0\u5DE5\u5177\u914D\u7F6E\u9700\u8981\u8FC1\u79FB"),ke.set(Ei,!0),{skipped:!0,reason:"no_configs"};ke.set(th,{ts:Date.now(),version:"v45",snapshot:t});let e=0,r={...t};for(let[s,o]of Object.entries(t)){if(!o||typeof o!="object")continue;let n=D0(s,o.name,o);n&&(r[s]=n,e+=1)}return e>0&&$.set(eh,r),ke.set(Ei,!0),os.info("\u8FC1\u79FB\u5B8C\u6210",{migratedCount:e,total:Object.keys(t).length}),{skipped:!1,migratedCount:e,total:Object.keys(t).length}}catch(t){return os.error("\u8FC1\u79FB\u5931\u8D25\uFF0C\u5DF2 abort\uFF0C\u8001\u5B57\u6BB5\u4FDD\u7559",{error:t}),{skipped:!1,error:t?.message||String(t),aborted:!0}}}function rh(){return Md(),Pd()}var os,Ei,th,eh,Ai,Rd,L0,oh=D(()=>{je();H();Fr();Ys();os=E.createScope("PresetBootstrap"),Ei="migration_v45_done",th="migration_v45_backup",eh="tool_configs",Ai=[{id:"builtin_regex_summary",name:"\u5185\u7F6E \xB7 \u603B\u7ED3\u63D0\u53D6",description:"\u63D0\u53D6 <boo_FM> \u6807\u7B7E\u5185\u5BB9\uFF08\u5BF9\u5E94\u5185\u7F6E\u300C\u8BB0\u5FC6\u538B\u7F29\u300D\u5DE5\u5177\uFF09",rules:[{id:"r_builtin_summary_1",type:"include",value:"boo_FM",enabled:!0,name:"\u603B\u7ED3\u6807\u7B7E",description:""}],blacklist:[]},{id:"builtin_regex_status_block",name:"\u5185\u7F6E \xB7 \u72B6\u6001\u680F\u63D0\u53D6",description:"\u63D0\u53D6 <status_block> \u6807\u7B7E\u5185\u5BB9\uFF08\u5BF9\u5E94\u5185\u7F6E\u300C\u72B6\u6001\u680F\u300D\u5DE5\u5177\uFF09",rules:[{id:"r_builtin_status_1",type:"include",value:"status_block",enabled:!0,name:"\u72B6\u6001\u6807\u7B7E",description:""}],blacklist:[]},{id:"builtin_regex_youyou",name:"\u5185\u7F6E \xB7 \u4F18\u4F18\u9510\u8BC4\u63D0\u53D6",description:"\u63D0\u53D6 <youyou> \u6807\u7B7E\u5185\u5BB9\uFF08\u5BF9\u5E94\u5185\u7F6E\u300C\u4F18\u4F18\u9510\u8BC4\u300D\u5DE5\u5177\uFF09",rules:[{id:"r_builtin_youyou_1",type:"include",value:"youyou",enabled:!0,name:"\u4F18\u4F18\u6807\u7B7E",description:""}],blacklist:[]}],Rd=[];L0={registerBuiltinPresets:Md,runMigrationOnce:Pd,ensurePresetSystem:rh}});var Dd={};ae(Dd,{confirmDeleteTool:()=>U0,confirmResetTools:()=>W0,getAllTools:()=>nr,getTool:()=>ar,showExportToolsDialog:()=>F0,showImportToolsDialog:()=>j0,showToolEditDialog:()=>K0});async function K0(t=null){let e=t?ar(t):null,r=!!e,s=he({value:e?.name||"",placeholder:"\u5DE5\u5177\u540D\u79F0"}),o=Re({value:e?.category||"utility",options:z0}),n=he({value:e?.description||"",placeholder:"\u5DE5\u5177\u63CF\u8FF0"}),a=f("input",{className:"yyt-input",attrs:{type:"number",min:"1000"},style:{padding:"7px 10px",fontSize:"12px"}});a.value=String(e?.config?.execution?.timeout||6e4);let i=f("input",{className:"yyt-input",attrs:{type:"number",min:"0",max:"10"},style:{padding:"7px 10px",fontSize:"12px"}});i.value=String(e?.config?.execution?.retries??3);function l(y,m,g=""){let h=f("div",{className:"yyt-form-group",style:{margin:"0 0 12px 0"}});return h.appendChild(f("label",{text:y,style:{fontSize:"12px",fontWeight:"600",color:"var(--yyt-text-secondary, rgba(255,255,255,0.55))",display:"block",marginBottom:"4px"}})),h.appendChild(m),g&&h.appendChild(f("div",{text:g,style:{fontSize:"11px",color:"var(--yyt-text-muted)",marginTop:"4px"}})),h}let d=f("div",{style:{display:"flex",flexDirection:"column"}}),c=f("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px"}});c.appendChild(l("\u5DE5\u5177\u540D\u79F0",s.el)),c.appendChild(l("\u5206\u7C7B",o.el)),d.appendChild(c),d.appendChild(l("\u63CF\u8FF0",n.el));let u=f("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px"}});u.appendChild(l("\u8D85\u65F6\u65F6\u95F4 (ms)",a)),u.appendChild(l("\u91CD\u8BD5\u6B21\u6570",i)),d.appendChild(u);let p=Me.custom({title:r?`\u7F16\u8F91\u5DE5\u5177\u300C${e.name}\u300D`:"\u65B0\u5EFA\u5DE5\u5177",width:"480px",body:d,buttons:[{label:"\u53D6\u6D88",variant:"ghost",onClick:y=>y(null)},{label:r?"\u4FDD\u5B58":"\u521B\u5EFA",variant:"primary",onClick:y=>{let m=String(s.get()||"").trim();if(!m){s.el.focus();return}let g=t||`tool_${Date.now()}`;if(!Zs(g,{name:m,category:o.get(),description:String(n.get()||"").trim(),promptTemplate:e?.promptTemplate||"",extractTags:Array.isArray(e?.extractTags)?e.extractTags:[],config:{execution:{timeout:Math.max(1e3,parseInt(a.value,10)||6e4),retries:Math.max(0,parseInt(i.value,10)||3)},api:e?.config?.api||{preset:"",useBypass:!1,bypassPreset:""},messages:Array.isArray(e?.config?.messages)?e.config.messages:[],context:{depth:e?.config?.context?.depth||3,includeTags:Array.isArray(e?.config?.context?.includeTags)?e.config.context.includeTags:[],excludeTags:Array.isArray(e?.config?.context?.excludeTags)?e.config.context.excludeTags:[]},worldbooks:{enabled:e?.config?.worldbooks?.enabled===!0,selected:Array.isArray(e?.config?.worldbooks?.selected)?e.config.worldbooks.selected:[]}},enabled:e?.enabled!==!1})){Nd.warn("saveTool \u5931\u8D25",{id:g});return}try{no(g)}catch(x){Nd.warn("ensureToolRuntimeConfig \u5F02\u5E38",{err:x})}y(g)}}]});return setTimeout(()=>s.el.focus(),0),p.result}async function U0(t){let e=ar(t);return!e||!await Me.confirm({title:"\u5220\u9664\u5DE5\u5177",message:`\u786E\u5B9A\u5220\u9664\u5DE5\u5177\u300C${e.name}\u300D\uFF1F\u6B64\u64CD\u4F5C\u4E0D\u53EF\u64A4\u9500\u3002`,confirmText:"\u5220\u9664",danger:!0})?!1:eo(t)}function F0(){let t;try{t=to()}catch(r){Me.confirm({title:"\u5BFC\u51FA\u5931\u8D25",message:String(r?.message||r),confirmText:"\u786E\u5B9A"});return}let e=f("textarea",{className:"yyt-textarea",style:{width:"100%",minHeight:"220px",fontSize:"12px",fontFamily:"monospace"}});e.value=t,e.readOnly=!0,Me.custom({title:"\u5BFC\u51FA\u5DE5\u5177 JSON",width:"600px",body:e,buttons:[{label:"\u5173\u95ED",variant:"ghost",onClick:r=>r(null)},{label:"\u590D\u5236\u5230\u526A\u8D34\u677F",variant:"ghost",onClick:async()=>{try{await navigator.clipboard.writeText(t)}catch{e.select();try{document.execCommand("copy")}catch{}}}},{label:"\u4E0B\u8F7D JSON",variant:"primary",onClick:()=>{try{let r=new Blob([t],{type:"application/json"}),s=URL.createObjectURL(r),o=f("a",{attrs:{href:s,download:`youyou_tools_${Date.now()}.json`}});document.body.appendChild(o),o.click(),setTimeout(()=>{try{document.body.removeChild(o)}catch{}try{URL.revokeObjectURL(s)}catch{}},100)}catch(r){Nd.warn("\u4E0B\u8F7D\u5931\u8D25",{err:r})}}}]})}async function j0(){let t=f("textarea",{className:"yyt-textarea",attrs:{placeholder:"\u7C98\u8D34 YouYou Toolkit \u5DE5\u5177 JSON"},style:{width:"100%",minHeight:"200px",fontSize:"12px",fontFamily:"monospace"}}),e=f("label",{style:{display:"flex",alignItems:"center",gap:"6px",fontSize:"12px",color:"var(--yyt-text-secondary)",marginTop:"8px"}}),r=f("input",{attrs:{type:"checkbox"}});e.appendChild(r),e.appendChild(f("span",{text:"\u8986\u76D6\u6A21\u5F0F\uFF08\u6E05\u7A7A\u5DF2\u6709\u5DE5\u5177\u540E\u518D\u5BFC\u5165\uFF1B\u4E0D\u52FE\u9009\u5219\u5408\u5E76\uFF09"}));let s=f("div");s.appendChild(t),s.appendChild(e),s.appendChild(f("div",{style:{display:"flex",gap:"6px",marginTop:"8px"}},X({label:"\u{1F4C1} \u4ECE\u6587\u4EF6\u2026",size:"small",variant:"ghost",onClick:()=>{let n=f("input",{attrs:{type:"file",accept:"application/json,.json"}});n.addEventListener("change",()=>{let a=n.files?.[0];if(!a)return;let i=new FileReader;i.onload=()=>{t.value=String(i.result||""),t.focus()},i.readAsText(a)}),n.click()}}).el));let o=Me.custom({title:"\u5BFC\u5165\u5DE5\u5177 JSON",width:"520px",body:s,buttons:[{label:"\u53D6\u6D88",variant:"ghost",onClick:n=>n(null)},{label:"\u5BFC\u5165",variant:"primary",onClick:async n=>{let a=t.value.trim();if(!a){n(null);return}try{let i=ro(a,{overwrite:r.checked});n(i)}catch(i){await Me.confirm({title:"\u5BFC\u5165\u5931\u8D25",message:String(i?.message||i),confirmText:"\u786E\u5B9A"})}}}]});return setTimeout(()=>t.focus(),0),o.result}async function W0(){return await Me.confirm({title:"\u91CD\u7F6E\u6240\u6709\u5DE5\u5177",message:"\u6B64\u64CD\u4F5C\u4F1A\u5220\u9664\u6240\u6709\u81EA\u5B9A\u4E49\u5DE5\u5177\u4E0E\u9884\u8BBE\uFF0C\u4E0D\u53EF\u64A4\u9500\u3002\u5185\u7F6E\u5DE5\u5177\u4E0D\u53D7\u5F71\u54CD\u3002",confirmText:"\u91CD\u7F6E",danger:!0})?(so(),!0):!1}var Nd,z0,Ld=D(()=>{sa();tr();tn();lr();H();Nd=E.createScope("ToolActions"),z0=[{value:"api",label:"API"},{value:"prompt",label:"Prompt"},{value:"utility",label:"Utility"}]});var X0={};ae(X0,{default:()=>J0});H();var zd=`/**\r
 * YouYou Toolkit - \u4E3B\u6837\u5F0F\u6587\u4EF6\r
 * @description \u62BD\u79BB\u6837\u5F0F\uFF0C\u5305\u542B\u4E3B\u9876\u680F\u3001\u6B21\u7EA7\u9876\u680F\u3001\u63D0\u793A\u8BCD\u7F16\u8F91\u5668\u548C\u7A97\u53E3\u6837\u5F0F\r
 */\r
\r
/* ============================================================\r
   CSS\u53D8\u91CF\r
   ============================================================ */\r
\r
:root {\r
  /* \u2014\u2014 Accent & semantic \u2014\u2014 */\r
  --yyt-accent: #7bb7ff;\r
  --yyt-accent-glow: rgba(123, 183, 255, 0.4);\r
  --yyt-accent-soft: rgba(123, 183, 255, 0.15);\r
  --yyt-accent-strong: #a5d4ff;\r
  --yyt-on-accent: #0a0d13;\r
  --yyt-success: #4ade80;\r
  --yyt-success-glow: rgba(74, 222, 128, 0.3);\r
  --yyt-error: #ef4444;\r
  --yyt-danger: var(--yyt-error);\r
  --yyt-danger-soft: rgba(239, 68, 68, 0.16);\r
  --yyt-error-glow: rgba(239, 68, 68, 0.3);\r
  --yyt-warning: #fbbf24;\r
\r
  /* \u2014\u2014 Surface ladder (solid, no gradients) \u2014\u2014 */\r
  --yyt-bg-base: #0a0d13;\r
  --yyt-surface: #0f1219;\r
  --yyt-surface-2: #151a24;\r
  --yyt-surface-3: #1c2231;\r
  --yyt-surface-hover: #1c2231;\r
  --yyt-surface-active: #232b3e;\r
  --yyt-surface-raised: var(--yyt-surface-2);\r
  --yyt-surface-overlay: var(--yyt-surface-3);\r
  --yyt-surface-elevated: var(--yyt-surface-active);\r
\r
  /* \u2014\u2014 Borders (two-level hairline) \u2014\u2014 */\r
  --yyt-border: rgba(255, 255, 255, 0.06);\r
  --yyt-border-soft: rgba(255, 255, 255, 0.04);\r
  --yyt-border-strong: rgba(255, 255, 255, 0.12);\r
  --yyt-border-subtle: var(--yyt-border-soft);\r
  --yyt-border-default: var(--yyt-border);\r
  --yyt-border-emphasis: var(--yyt-border-strong);\r
  --yyt-border-focus: rgba(123, 183, 255, 0.5);\r
\r
  /* \u2014\u2014 Text \u2014\u2014 */\r
  --yyt-text: rgba(255, 255, 255, 0.92);\r
  --yyt-text-secondary: rgba(255, 255, 255, 0.55);\r
  --yyt-text-muted: rgba(255, 255, 255, 0.35);\r
  --yyt-color-text-primary: var(--yyt-text);\r
  --yyt-color-text-secondary: var(--yyt-text-secondary);\r
  --yyt-color-text-muted: var(--yyt-text-muted);\r
  --yyt-color-accent: var(--yyt-accent);\r
\r
  /* \u2014\u2014 Focus (double-ring) \u2014\u2014 */\r
  --yyt-focus-ring: 0 0 0 2px rgba(123, 183, 255, 1), 0 0 0 4px rgba(123, 183, 255, 0.15);\r
\r
  /* \u2014\u2014 Radii (strict outer > inner) \u2014\u2014 */\r
  --yyt-radius-xs: 4px;\r
  --yyt-radius-sm: 6px;\r
  --yyt-radius: 8px;\r
  --yyt-radius-lg: 12px;\r
  --yyt-radius-xl: 16px;\r
  --yyt-control-radius: 6px;\r
  --yyt-control-radius-sm: 4px;\r
\r
  /* \u2014\u2014 Shadows (floating elements only) \u2014\u2014 */\r
  --yyt-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);\r
  --yyt-shadow-soft: 0 4px 16px rgba(0, 0, 0, 0.3);\r
  --yyt-shadow-glow: 0 0 16px var(--yyt-accent-glow);\r
\r
  /* \u2014\u2014 Controls (solid, no gradients) \u2014\u2014 */\r
  --yyt-control-bg: #0f1219;\r
  --yyt-control-bg-hover: #151a24;\r
  --yyt-control-bg-active: #1c2231;\r
  --yyt-control-bg-strong: #151a24;\r
  --yyt-control-bg-focus: #151a24;\r
  --yyt-control-border: rgba(255, 255, 255, 0.08);\r
  --yyt-control-border-hover: rgba(255, 255, 255, 0.14);\r
  --yyt-control-border-focus: rgba(123, 183, 255, 0.5);\r
  --yyt-control-shadow: none;\r
  --yyt-control-shadow-hover: none;\r
  --yyt-control-shadow-focus: none;\r
  --yyt-control-shadow-active: none;\r
\r
  /* \u2014\u2014 Select/Dropdown \u2014\u2014 */\r
  --yyt-select-surface: #151a24;\r
  --yyt-select-option-bg: #1c2231;\r
  --yyt-select-option-hover-bg: #232b3e;\r
  --yyt-select-option-selected-bg: #2a3450;\r
  --yyt-select-option-border: rgba(123, 183, 255, 0.15);\r
  --yyt-select-option-selected-border: rgba(123, 183, 255, 0.3);\r
  --yyt-select-dropdown-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);\r
  --yyt-select-arrow-color: rgba(255, 255, 255, 0.4);\r
\r
  /* \u2014\u2014 Startup (one decorative accent allowed) \u2014\u2014 */\r
  --yyt-startup-overlay: rgba(6, 8, 16, 0.8);\r
  --yyt-startup-panel-border: rgba(255, 255, 255, 0.08);\r
  --yyt-startup-panel-bg:\r
    radial-gradient(500px 200px at 0% 0%, rgba(123, 183, 255, 0.12), transparent 60%),\r
    #0f1219;\r
  --yyt-startup-panel-shadow: 0 16px 48px rgba(0, 0, 0, 0.5);\r
  --yyt-startup-chip-bg: rgba(255, 255, 255, 0.05);\r
  --yyt-startup-chip-border: rgba(255, 255, 255, 0.08);\r
  --yyt-startup-status-bg: rgba(255, 255, 255, 0.05);\r
  --yyt-startup-status-border: rgba(255, 255, 255, 0.08);\r
  --yyt-startup-status-text: rgba(255, 255, 255, 0.8);\r
  --yyt-startup-kicker-bg: rgba(123, 183, 255, 0.1);\r
  --yyt-startup-kicker-border: rgba(123, 183, 255, 0.2);\r
\r
  /* \u2014\u2014 Motion \u2014\u2014 */\r
  --ease-out: cubic-bezier(0, 0, 0.2, 1);\r
  --ease-in: cubic-bezier(0.4, 0, 1, 1);\r
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);\r
  --yyt-ease-spring: cubic-bezier(0.16, 1, 0.3, 1);\r
  --yyt-duration-fast: 150ms;\r
  --yyt-duration-normal: 250ms;\r
\r
  /* \u2014\u2014 Typography scale \u2014\u2014 */\r
  --yyt-text-xs: 10px;\r
  --yyt-text-sm: 11px;\r
  --yyt-text-base: 13px;\r
  --yyt-text-md: 14px;\r
  --yyt-text-lg: 16px;\r
  --yyt-text-xl: 20px;\r
  --yyt-text-2xl: 24px;\r
\r
  /* \u2014\u2014 Layout \u2014\u2014 */\r
  --yyt-shell-sidebar-width: 220px;\r
  --yyt-shell-topbar-gap: 12px;\r
  --yyt-shell-gap: 0px;\r
  --yyt-panel-gap: 0px;\r
  --yyt-backdrop: rgba(6, 8, 16, 0.75);\r
}\r
\r
/* ============================================================\r
   \u57FA\u7840\u5E03\u5C40\r
   ============================================================ */\r
\r
.yyt-app {\r
  display: flex;\r
  flex-direction: column;\r
  height: 100%;\r
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", Roboto, Arial, sans-serif;\r
  color: var(--yyt-text);\r
}\r
\r
/* ============================================================\r
   \u4E3B\u9876\u680F\u6837\u5F0F\r
   ============================================================ */\r
\r
.yyt-main-nav {\r
  display: flex;\r
  gap: 6px;\r
  padding: 6px;\r
  background: transparent;\r
  border-radius: 8px;\r
  margin-bottom: 16px;\r
  border: 1px solid var(--yyt-border-soft);\r
  flex-shrink: 0;\r
}\r
\r
.yyt-main-nav-item {\r
  display: flex;\r
  align-items: flex-start;\r
  gap: 12px;\r
  padding: 14px 15px;\r
  border-radius: 6px;\r
  cursor: pointer;\r
  transition: transform 0.15s ease, border-color 0.15s ease, background 0.15s ease, color 0.15s ease, box-shadow 0.15s ease;\r
  color: var(--yyt-text-secondary);\r
  font-weight: 600;\r
  font-size: 14px;\r
  position: relative;\r
  overflow: hidden;\r
  min-width: 0;\r
  border: 1px solid transparent;\r
}\r
\r
.yyt-main-nav-item:hover {\r
  color: var(--yyt-text);\r
  background: rgba(255, 255, 255, 0.045);\r
  border-color: var(--yyt-border-soft);\r
}\r
\r
.yyt-main-nav-item:focus-visible {\r
  outline: none;\r
  box-shadow: var(--yyt-focus-ring);\r
}\r
\r
.yyt-main-nav-item.active {\r
  color: var(--yyt-on-accent);\r
  background: var(--yyt-accent);\r
  box-shadow: none;\r
}\r
\r
.yyt-main-nav-icon {\r
  width: 38px;\r
  height: 38px;\r
  border-radius: var(--yyt-radius-sm);\r
  display: inline-flex;\r
  align-items: center;\r
  justify-content: center;\r
  background: var(--yyt-accent-soft);\r
  border: none;\r
  flex-shrink: 0;\r
}\r
\r
.yyt-main-nav-item.active .yyt-main-nav-icon {\r
  background: var(--yyt-accent-soft);\r
  border-color: transparent;\r
}\r
\r
.yyt-main-nav-item i {\r
  font-size: 15px;\r
  transition: transform 0.15s ease;\r
}\r
\r
.yyt-main-nav-item:hover i {\r
  transform: scale(1.08);\r
}\r
\r
.yyt-main-nav-copy {\r
  display: flex;\r
  flex-direction: column;\r
  gap: 4px;\r
  min-width: 0;\r
  flex: 1;\r
}\r
\r
.yyt-main-nav-name {\r
  font-size: var(--yyt-text-base);\r
  font-weight: 700;\r
  color: inherit;\r
}\r
\r
.yyt-main-nav-desc {\r
  font-size: var(--yyt-text-sm);\r
  line-height: 1.5;\r
  color: inherit;\r
  opacity: 0.74;\r
}\r
\r
/* ============================================================\r
   \u6B21\u7EA7\u9876\u680F\u6837\u5F0F\r
   ============================================================ */\r
\r
.yyt-sub-nav {\r
  display: flex;\r
  flex-wrap: wrap;\r
  gap: 10px;\r
  padding: 8px;\r
  background: transparent;\r
  border-radius: 6px;\r
  margin-bottom: 10px;\r
  border: 1px solid var(--yyt-border-soft);\r
  flex-shrink: 0;\r
}\r
\r
.yyt-sub-nav-group {\r
  display: flex;\r
  flex-direction: column;\r
  gap: 8px;\r
  min-width: 0;\r
  flex: 1 1 260px;\r
  padding: 10px;\r
  border-radius: 8px;\r
  border: 1px solid rgba(255, 255, 255, 0.06);\r
  background: transparent;\r
  box-shadow: none;\r
}\r
\r
.yyt-sub-nav-group-title {\r
  display: inline-flex;\r
  align-items: center;\r
  gap: 8px;\r
  min-height: 26px;\r
  padding: 0 4px;\r
  font-size: 11px;\r
  font-weight: 700;\r
  letter-spacing: 0.42px;\r
  text-transform: uppercase;\r
  color: var(--yyt-text-muted);\r
}\r
\r
.yyt-sub-nav-group-title::before {\r
  content: '';\r
  width: 8px;\r
  height: 8px;\r
  border-radius: 999px;\r
  background: rgba(255, 255, 255, 0.16);\r
  box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.03);\r
}\r
\r
.yyt-sub-nav-group-ai .yyt-sub-nav-group-title::before {\r
  background: var(--yyt-accent);\r
  box-shadow: 0 0 0 3px var(--yyt-accent-soft);\r
}\r
\r
.yyt-sub-nav-group-script .yyt-sub-nav-group-title::before {\r
  background: rgba(251, 191, 36, 0.92);\r
  box-shadow: 0 0 0 4px rgba(251, 191, 36, 0.12);\r
}\r
\r
.yyt-sub-nav-group-items {\r
  display: flex;\r
  flex-wrap: wrap;\r
  gap: 8px;\r
}\r
\r
.yyt-sub-nav-item {\r
  display: inline-flex;\r
  align-items: center;\r
  gap: 8px;\r
  min-width: 0;\r
  padding: 10px 14px;\r
  border-radius: 6px;\r
  cursor: pointer;\r
  transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease, transform 0.15s ease;\r
  color: var(--yyt-text-secondary);\r
  font-weight: 700;\r
  font-size: var(--yyt-text-sm);\r
  border: 1px solid transparent;\r
  background: rgba(255, 255, 255, 0.015);\r
}\r
\r
.yyt-sub-nav-item:hover {\r
  color: var(--yyt-text);\r
  background: rgba(255, 255, 255, 0.05);\r
  border-color: var(--yyt-border-soft);\r
  transform: translateY(-1px);\r
}\r
\r
.yyt-sub-nav-item.active {\r
  color: var(--yyt-accent);\r
  background: var(--yyt-accent-soft);\r
  border-color: var(--yyt-accent-soft);\r
  box-shadow: none;\r
}\r
\r
.yyt-sub-nav-item i {\r
  font-size: 12px;\r
}\r
\r
/* \u8BAE\u9898 #37\uFF1Atools sub-nav toolbar + filter + \u884C\u5185 hover actions */\r
.yyt-sub-nav-toolbar {\r
  flex-basis: 100%;\r
  display: flex;\r
  gap: 6px;\r
  align-items: center;\r
  padding: 2px 4px 0;\r
  order: -2;\r
}\r
\r
.yyt-sub-nav-toolbar-btn {\r
  display: inline-flex;\r
  align-items: center;\r
  gap: 6px;\r
  padding: 5px 9px;\r
  font-size: 11px;\r
  font-weight: 600;\r
  color: var(--yyt-text-secondary, rgba(255, 255, 255, 0.7));\r
  background: rgba(255, 255, 255, 0.04);\r
  border: 1px solid var(--yyt-border-soft);\r
  border-radius: var(--yyt-radius-sm, 6px);\r
  cursor: pointer;\r
  transition: background 0.15s, color 0.15s, border-color 0.15s;\r
}\r
\r
.yyt-sub-nav-toolbar-btn:hover {\r
  color: var(--yyt-text);\r
  background: rgba(255, 255, 255, 0.08);\r
  border-color: var(--yyt-border);\r
}\r
\r
.yyt-sub-nav-toolbar-btn[data-tool-action="add"] {\r
  color: var(--yyt-accent);\r
  background: var(--yyt-accent-soft);\r
  border-color: var(--yyt-accent-soft);\r
}\r
\r
.yyt-sub-nav-toolbar-btn[data-tool-action="add"]:hover {\r
  color: var(--yyt-text);\r
  background: var(--yyt-accent);\r
  border-color: var(--yyt-accent);\r
}\r
\r
.yyt-sub-nav-toolbar-btn i {\r
  font-size: 11px;\r
}\r
\r
.yyt-sub-nav-filter-wrap {\r
  flex-basis: 100%;\r
  padding: 0 4px 4px;\r
  order: -1;\r
}\r
\r
.yyt-sub-nav-filter {\r
  width: 100%;\r
  padding: 6px 10px;\r
  font-size: 11px;\r
  color: var(--yyt-text);\r
  background: rgba(255, 255, 255, 0.03);\r
  border: 1px solid var(--yyt-border-soft);\r
  border-radius: var(--yyt-radius-sm, 6px);\r
}\r
\r
.yyt-sub-nav-filter::placeholder {\r
  color: var(--yyt-text-muted);\r
}\r
\r
.yyt-sub-nav-filter:focus {\r
  outline: none;\r
  border-color: var(--yyt-accent);\r
  background: rgba(255, 255, 255, 0.05);\r
}\r
\r
.yyt-sub-nav-item-label {\r
  min-width: 0;\r
  overflow: hidden;\r
  text-overflow: ellipsis;\r
  white-space: nowrap;\r
}\r
\r
.yyt-sub-nav-item-actions {\r
  display: inline-flex;\r
  gap: 2px;\r
  margin-left: 4px;\r
  opacity: 0;\r
  transition: opacity 0.15s ease;\r
}\r
\r
.yyt-sub-nav-item:hover .yyt-sub-nav-item-actions,\r
.yyt-sub-nav-item.active .yyt-sub-nav-item-actions {\r
  opacity: 1;\r
}\r
\r
.yyt-sub-nav-item-action {\r
  display: inline-flex;\r
  align-items: center;\r
  justify-content: center;\r
  width: 20px;\r
  height: 20px;\r
  font-size: 10px;\r
  color: var(--yyt-text-muted);\r
  background: transparent;\r
  border: 1px solid transparent;\r
  border-radius: 4px;\r
  cursor: pointer;\r
  transition: background 0.15s, color 0.15s, border-color 0.15s;\r
}\r
\r
.yyt-sub-nav-item-action:hover {\r
  color: var(--yyt-text);\r
  background: rgba(255, 255, 255, 0.08);\r
  border-color: var(--yyt-border-soft);\r
}\r
\r
.yyt-sub-nav-item-action[data-action="delete"]:hover {\r
  color: #f87171;\r
  background: rgba(248, 113, 113, 0.1);\r
  border-color: rgba(248, 113, 113, 0.3);\r
}\r
\r
.yyt-sub-nav-group-custom .yyt-sub-nav-group-title::before {\r
  background: rgba(167, 139, 250, 0.92);\r
  box-shadow: 0 0 0 4px rgba(167, 139, 250, 0.12);\r
}\r
\r
/* ============================================================\r
   \u5185\u5BB9\u533A\u57DF\r
   ============================================================ */\r
\r
.yyt-content {\r
  flex: 1;\r
  display: flex;\r
  flex-direction: column;\r
  min-height: 0;\r
  min-width: 0;\r
  overflow-y: auto;\r
  overflow-x: hidden;\r
  overscroll-behavior: contain;\r
  padding: 6px;\r
  border-radius: calc(var(--yyt-radius-lg) - 2px);\r
  background: transparent;\r
  border: 1px solid rgba(255, 255, 255, 0.05);\r
}\r
\r
.yyt-page {\r
  display: none;\r
  animation: yytSlideUp 0.3s var(--ease-out);\r
}\r
\r
/* \u2014\u2014 Phase E2: \u7EDF\u4E00\u52A8\u753B keyframes \u2014\u2014 */\r
@keyframes yytFadeIn {\r
  from { opacity: 0; }\r
  to { opacity: 1; }\r
}\r
\r
@keyframes yytSlideUp {\r
  from { opacity: 0; transform: translateY(8px); }\r
  to { opacity: 1; transform: translateY(0); }\r
}\r
\r
@keyframes yytScaleIn {\r
  from { opacity: 0; transform: scale(0.96); }\r
  to { opacity: 1; transform: scale(1); }\r
}\r
\r
@keyframes yytScaleInCentered {\r
  from { opacity: 0; transform: translate(-50%, -50%) scale(0.96); }\r
  to { opacity: 1; transform: translate(-50%, -50%) scale(1); }\r
}\r
\r
/* \u2014\u2014 Window manager animations \u2014\u2014 */\r
@keyframes yytWindowFadeIn {\r
  from { opacity: 0; }\r
  to { opacity: 1; }\r
}\r
\r
@keyframes yytWindowSlideIn {\r
  from {\r
    opacity: 0;\r
    transform: scale(0.95) translateY(-20px);\r
  }\r
  to {\r
    opacity: 1;\r
    transform: scale(1) translateY(0);\r
  }\r
}\r
\r
/* \u2014\u2014 Notice & Toast animations \u2014\u2014 */\r
@keyframes yyt-top-notice-in {\r
  from {\r
    opacity: 0;\r
    transform: translateY(-8px);\r
  }\r
  to {\r
    opacity: 1;\r
    transform: translateY(0);\r
  }\r
}\r
\r
@keyframes yyt-top-notice-out {\r
  from {\r
    opacity: 1;\r
    transform: translateY(0);\r
  }\r
  to {\r
    opacity: 0;\r
    transform: translateY(-8px);\r
  }\r
}\r
\r
@keyframes yyt-toast-in {\r
  from { opacity: 0; transform: translateX(100px); }\r
  to { opacity: 1; transform: translateX(0); }\r
}\r
\r
@keyframes yyt-toast-out {\r
  from { opacity: 1; transform: translateX(0); }\r
  to { opacity: 0; transform: translateX(100px); }\r
}\r
\r
.yyt-page.active {\r
  display: block;\r
}\r
\r
/* ============================================================\r
   \u9762\u677F\u6837\u5F0F\r
   ============================================================ */\r
\r
.yyt-panel {\r
  display: flex;\r
  flex-direction: column;\r
  gap: var(--yyt-panel-gap);\r
}\r
\r
.yyt-panel-section {\r
  position: relative;\r
  display: flex;\r
  flex-direction: column;\r
  gap: 12px;\r
  padding: 0;\r
  background: transparent;\r
  border: none;\r
  border-radius: 0;\r
  box-shadow: none;\r
}\r
\r
/* ============================================================\r
   Flat Flow Layout Primitives\r
   ============================================================ */\r
\r
.yyt-flow-section + .yyt-flow-section {\r
  margin-top: 24px;\r
  padding-top: 24px;\r
  border-top: 1px solid var(--yyt-border);\r
}\r
\r
.yyt-flow-heading {\r
  font-size: 12px;\r
  font-weight: 700;\r
  color: var(--yyt-text);\r
  margin-bottom: 14px;\r
  display: flex;\r
  align-items: center;\r
  gap: 8px;\r
  text-transform: uppercase;\r
  letter-spacing: 0.3px;\r
}\r
\r
.yyt-flow-heading-icon {\r
  width: 22px;\r
  height: 22px;\r
  border-radius: var(--yyt-radius-sm);\r
  background: var(--yyt-accent-soft);\r
  color: var(--yyt-accent);\r
  display: inline-flex;\r
  align-items: center;\r
  justify-content: center;\r
  font-size: 11px;\r
}\r
\r
.yyt-flow-heading-action {\r
  margin-left: auto;\r
}\r
\r
/* Stat Row \u2014 single grid container */\r
.yyt-stat-row {\r
  display: grid;\r
  gap: 0;\r
  border: 1px solid var(--yyt-border-strong);\r
  border-radius: var(--yyt-radius);\r
  overflow: hidden;\r
}\r
\r
.yyt-stat-cell {\r
  padding: 16px 18px;\r
  background: var(--yyt-surface-2);\r
  transition: background 0.15s ease;\r
}\r
\r
.yyt-stat-cell:hover {\r
  background: var(--yyt-surface-3);\r
}\r
\r
.yyt-stat-cell + .yyt-stat-cell {\r
  border-left: 1px solid var(--yyt-border);\r
}\r
\r
.yyt-stat-label {\r
  font-size: 10px;\r
  color: var(--yyt-text-muted);\r
  text-transform: uppercase;\r
  letter-spacing: 0.4px;\r
  font-weight: 700;\r
}\r
\r
.yyt-stat-value {\r
  font-size: 22px;\r
  font-weight: 700;\r
  color: var(--yyt-text);\r
  margin-top: 6px;\r
}\r
\r
/* List Table \u2014 single container, hairline rows */\r
.yyt-list-table {\r
  border: 1px solid var(--yyt-border-strong);\r
  border-radius: var(--yyt-radius);\r
  overflow: hidden;\r
}\r
\r
.yyt-list-row {\r
  display: flex;\r
  align-items: center;\r
  gap: 12px;\r
  padding: 14px 18px;\r
  background: var(--yyt-surface-2);\r
  transition: background 0.15s ease;\r
}\r
\r
.yyt-list-row:hover {\r
  background: var(--yyt-surface-3);\r
}\r
\r
.yyt-list-row + .yyt-list-row {\r
  border-top: 1px solid var(--yyt-border);\r
}\r
\r
.yyt-list-row-icon {\r
  width: 32px;\r
  height: 32px;\r
  border-radius: var(--yyt-radius-sm);\r
  display: flex;\r
  align-items: center;\r
  justify-content: center;\r
  font-size: 14px;\r
  flex-shrink: 0;\r
}\r
\r
.yyt-list-row-main {\r
  flex: 1;\r
  min-width: 0;\r
}\r
\r
.yyt-list-row-name {\r
  font-size: 13px;\r
  font-weight: 600;\r
  color: var(--yyt-text);\r
}\r
\r
.yyt-list-row-desc {\r
  font-size: 11px;\r
  color: var(--yyt-text-muted);\r
  margin-top: 2px;\r
}\r
\r
.yyt-list-row-actions {\r
  display: flex;\r
  gap: 6px;\r
}\r
\r
/* Form Inline Row */\r
.yyt-form-inline {\r
  display: flex;\r
  align-items: center;\r
  justify-content: space-between;\r
  gap: 16px;\r
  padding: 14px 0;\r
  border-bottom: 1px solid var(--yyt-border);\r
}\r
\r
.yyt-form-inline:last-child {\r
  border-bottom: none;\r
}\r
\r
.yyt-form-inline-label {\r
  flex: 1;\r
}\r
\r
.yyt-form-inline-control {\r
  flex-shrink: 0;\r
}\r
\r
/* Status indicator dots */\r
.yyt-status-dot {\r
  width: 6px;\r
  height: 6px;\r
  border-radius: 50%;\r
  flex-shrink: 0;\r
}\r
\r
.yyt-status-dot-on {\r
  background: var(--yyt-success);\r
  box-shadow: 0 0 6px var(--yyt-success);\r
}\r
\r
.yyt-status-dot-off {\r
  background: var(--yyt-text-muted);\r
}\r
\r
/* Badge pills */\r
.yyt-badge {\r
  font-size: 10px;\r
  font-weight: 700;\r
  text-transform: uppercase;\r
  padding: 3px 8px;\r
  border-radius: 999px;\r
  letter-spacing: 0.3px;\r
}\r
\r
.yyt-panel-section > .yyt-section-title + * {\r
  min-width: 0;\r
}\r
\r
.yyt-section-title {\r
  display: flex;\r
  align-items: center;\r
  gap: 8px;\r
  font-weight: 700;\r
  font-size: var(--yyt-text-sm);\r
  color: var(--yyt-color-text-primary);\r
  text-transform: uppercase;\r
  letter-spacing: 0.6px;\r
}\r
\r
.yyt-section-title i {\r
  display: inline-flex;\r
  align-items: center;\r
  justify-content: center;\r
  width: 28px;\r
  height: 28px;\r
  border-radius: 10px;\r
  color: var(--yyt-accent);\r
  font-size: 14px;\r
  background: var(--yyt-accent-soft);\r
  border: 1px solid var(--yyt-accent-soft);\r
  \r
}\r
\r
/* ============================================================\r
   \u6309\u94AE\u6837\u5F0F\r
   ============================================================ */\r
\r
.yyt-btn {\r
  display: inline-flex;\r
  align-items: center;\r
  justify-content: center;\r
  gap: 8px;\r
  min-height: 40px;\r
  padding: 10px 16px;\r
  border: 1px solid var(--yyt-control-border);\r
  border-radius: var(--yyt-control-radius);\r
  background: var(--yyt-control-bg-strong);\r
  color: var(--yyt-text);\r
  font-size: 13px;\r
  font-weight: 700;\r
  cursor: pointer;\r
  transition: transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease, background 0.15s ease, color 0.15s ease, filter 0.15s ease;\r
  position: relative;\r
  overflow: hidden;\r
  letter-spacing: 0.2px;\r
  box-shadow: var(--yyt-control-shadow);\r
}\r
\r
.yyt-btn::before {\r
  content: '';\r
  position: absolute;\r
  inset: 0;\r
  display: none;\r
  pointer-events: none;\r
}\r
\r
.yyt-btn::after {\r
  content: '';\r
  position: absolute;\r
  inset: 1px;\r
  border-radius: inherit;\r
  border: 1px solid rgba(255, 255, 255, 0.025);\r
  pointer-events: none;\r
}\r
\r
.yyt-btn:hover {\r
  transform: translateY(-1px);\r
  border-color: var(--yyt-control-border-hover);\r
  background: var(--yyt-control-bg-hover);\r
  box-shadow: var(--yyt-control-shadow-hover);\r
}\r
\r
.yyt-btn:active {\r
  transform: translateY(0) scale(0.98);\r
  background: var(--yyt-control-bg-active);\r
  box-shadow: var(--yyt-control-shadow-active);\r
  filter: saturate(0.98);\r
}\r
\r
.yyt-btn:focus-visible {\r
  outline: none;\r
  box-shadow: var(--yyt-focus-ring), var(--yyt-control-shadow-focus);\r
}\r
\r
.yyt-btn-primary {\r
  background: var(--yyt-accent);\r
  color: var(--yyt-on-accent);\r
  border-color: rgba(255, 255, 255, 0.16);\r
  box-shadow: none;\r
}\r
\r
.yyt-btn-primary:hover {\r
  background: var(--yyt-accent-strong);\r
  box-shadow: none;\r
}\r
\r
.yyt-btn-primary:active {\r
  background: var(--yyt-accent);\r
}\r
\r
.yyt-btn-secondary {\r
  background: var(--yyt-surface-2);\r
  color: var(--yyt-text);\r
  border-color: rgba(255, 255, 255, 0.12);\r
  box-shadow: none;\r
}\r
\r
.yyt-btn-secondary:hover {\r
  background: var(--yyt-surface-3);\r
  border-color: rgba(255, 255, 255, 0.18);\r
}\r
\r
.yyt-btn-danger {\r
  background: var(--yyt-danger-soft);\r
  color: #ffb4b4;\r
  border-color: rgba(248, 113, 113, 0.32);\r
  box-shadow: 0 12px 24px rgba(248, 113, 113, 0.12);\r
}\r
\r
.yyt-btn-danger:hover {\r
  background: rgba(248, 113, 113, 0.2);\r
  border-color: rgba(248, 113, 113, 0.42);\r
  box-shadow: 0 16px 30px rgba(248, 113, 113, 0.16);\r
}\r
\r
.yyt-btn-icon {\r
  padding: 0;\r
  width: 40px;\r
  min-width: 40px;\r
}\r
\r
.yyt-btn-small {\r
  min-height: 34px;\r
  padding: 7px 12px;\r
  font-size: 12px;\r
  border-radius: var(--yyt-control-radius-sm);\r
}\r
\r
.yyt-btn:disabled {\r
  opacity: 0.45;\r
  cursor: not-allowed;\r
  transform: none !important;\r
  box-shadow: none !important;\r
  filter: none !important;\r
}\r
\r
/* ============================================================\r
   \u8868\u5355\u6837\u5F0F\r
   ============================================================ */\r
\r
.yyt-form-group {\r
  display: flex;\r
  flex-direction: column;\r
  gap: 8px;\r
}\r
\r
.yyt-form-group label {\r
  font-size: var(--yyt-text-sm);\r
  font-weight: 600;\r
  color: var(--yyt-color-text-secondary);\r
  letter-spacing: 0.3px;\r
}\r
\r
.yyt-form-hint {\r
  font-size: 11px;\r
  color: var(--yyt-text-muted);\r
  line-height: 1.6;\r
}\r
\r
.yyt-form-hint code {\r
  font-size: 11px;\r
  color: var(--yyt-accent);\r
  background: var(--yyt-accent-soft);\r
  padding: 1px 5px;\r
  border-radius: 3px;\r
  font-weight: 600;\r
}\r
\r
.yyt-settings-hint {\r
  display: flex;\r
  align-items: center;\r
  gap: 8px;\r
  font-size: 12px;\r
  color: var(--yyt-text-secondary);\r
  line-height: 1.6;\r
}\r
\r
.yyt-settings-hint i {\r
  color: var(--yyt-accent);\r
}\r
\r
.yyt-form-row {\r
  display: flex;\r
  gap: 12px;\r
}\r
\r
.yyt-flex-1 {\r
  flex: 1;\r
}\r
\r
.yyt-checkbox-label {\r
  display: flex;\r
  align-items: center;\r
  gap: 10px;\r
  cursor: pointer;\r
  user-select: none;\r
  min-width: 0;\r
}\r
\r
.yyt-checkbox-label > span {\r
  color: var(--yyt-text);\r
  font-weight: 700;\r
  line-height: 1.5;\r
}\r
\r
.yyt-checkbox-label > span:last-child {\r
  flex: 1;\r
  min-width: 0;\r
}\r
\r
.yyt-checkbox-label input[type="checkbox"],\r
.yyt-checkbox-label input[type="radio"] {\r
  width: 18px;\r
  height: 18px;\r
  margin: 0;\r
  flex-shrink: 0;\r
  cursor: pointer;\r
  accent-color: var(--yyt-accent);\r
}\r
\r
.yyt-checkbox-label input[type="checkbox"]:focus-visible,\r
.yyt-checkbox-label input[type="radio"]:focus-visible {\r
  outline: none;\r
  box-shadow: var(--yyt-focus-ring);\r
  border-radius: 6px;\r
}\r
\r
.yyt-worldbook-item .yyt-checkbox-label,\r
.yyt-form-group > .yyt-checkbox-label {\r
  padding: 0;\r
  border-radius: 0;\r
  border: none;\r
  background: transparent;\r
}\r
\r
.yyt-worldbook-item .yyt-checkbox-label:hover,\r
.yyt-form-group > .yyt-checkbox-label:hover {\r
  background: transparent;\r
}\r
\r
/* \u8F93\u5165\u6846 */\r
.yyt-input,\r
.yyt-select,\r
.yyt-textarea {\r
  width: 100%;\r
  box-sizing: border-box;\r
  min-height: 42px;\r
  padding: 11px 15px;\r
  border: 1px solid var(--yyt-control-border) !important;\r
  border-radius: var(--yyt-control-radius) !important;\r
  background: var(--yyt-control-bg) !important;\r
  color: var(--yyt-text) !important;\r
  font-size: 13px;\r
  transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease, transform 0.2s ease;\r
  box-shadow: var(--yyt-control-shadow);\r
}\r
\r
.yyt-select {\r
  --yyt-select-chevron: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23a8b7ca' d='M6 8L1 3h10z'/%3E%3C/svg%3E");\r
  cursor: pointer;\r
  appearance: none;\r
  -webkit-appearance: none;\r
  -moz-appearance: none;\r
  color: var(--yyt-text);\r
  background: var(--yyt-select-chevron) right 14px center / 12px 12px no-repeat, var(--yyt-control-bg);\r
  padding-right: 36px;\r
}\r
\r
.yyt-input:hover,\r
.yyt-select:hover,\r
.yyt-textarea:not(.yyt-code-textarea):hover {\r
  border-color: var(--yyt-control-border-hover);\r
  background: var(--yyt-control-bg-hover);\r
  box-shadow: var(--yyt-control-shadow-hover);\r
}\r
\r
.yyt-select:hover {\r
  color: var(--yyt-text);\r
  background: var(--yyt-select-chevron) right 14px center / 12px 12px no-repeat, var(--yyt-control-bg-hover);\r
}\r
\r
.yyt-input:focus,\r
.yyt-select:focus,\r
.yyt-textarea:not(.yyt-code-textarea):focus,\r
.yyt-input:focus-visible,\r
.yyt-select:focus-visible,\r
.yyt-textarea:not(.yyt-code-textarea):focus-visible {\r
  outline: none;\r
  border-color: var(--yyt-control-border-focus);\r
  background: var(--yyt-control-bg-focus);\r
  box-shadow: var(--yyt-focus-ring), var(--yyt-control-shadow-focus);\r
}\r
\r
.yyt-select:focus,\r
.yyt-select:focus-visible {\r
  color: var(--yyt-text);\r
  background: var(--yyt-select-chevron) right 14px center / 12px 12px no-repeat, var(--yyt-control-bg-focus);\r
}\r
\r
.yyt-select:disabled {\r
  color: var(--yyt-text-muted);\r
  background: var(--yyt-select-chevron) right 14px center / 12px 12px no-repeat, var(--yyt-surface);\r
  cursor: not-allowed;\r
}\r
\r
.yyt-select option,\r
.yyt-select optgroup {\r
  background: var(--yyt-surface) !important;\r
  color: var(--yyt-text) !important;\r
}\r
\r
.yyt-select option:checked,\r
.yyt-select option[selected] {\r
  background: var(--yyt-surface-3);\r
  color: #f5fbff;\r
}\r
\r
.yyt-select option:disabled {\r
  color: rgba(255, 255, 255, 0.42);\r
}\r
\r
.yyt-select optgroup {\r
  font-weight: 700;\r
  color: rgba(255, 255, 255, 0.78);\r
}\r
\r
.yyt-textarea.yyt-code-textarea {\r
  color: var(--yyt-text);\r
  caret-color: var(--yyt-accent-strong);\r
  background: #080a10;\r
}\r
\r
.yyt-textarea.yyt-code-textarea:hover,\r
.yyt-textarea.yyt-code-textarea:focus,\r
.yyt-textarea.yyt-code-textarea:focus-visible {\r
  color: var(--yyt-text);\r
  caret-color: var(--yyt-accent-strong);\r
  border-color: var(--yyt-border-focus);\r
  background: #080a10;\r
}\r
\r
.yyt-input::placeholder,\r
.yyt-textarea::placeholder {\r
  color: rgba(255, 255, 255, 0.42);\r
}\r
\r
.yyt-textarea {\r
  resize: vertical;\r
  min-height: 112px;\r
  line-height: 1.65;\r
}\r
\r
/* Toggle\u5F00\u5173 */\r
.yyt-toggle-row {\r
  display: flex;\r
  align-items: flex-start;\r
  justify-content: space-between;\r
  gap: 20px;\r
  padding: 16px;\r
  background: transparent;\r
  border: 1px solid rgba(255, 255, 255, 0.1);\r
  border-radius: 0;\r
  transition: border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;\r
  box-shadow: none;\r
}\r
\r
.yyt-toggle-row:hover {\r
  background: var(--yyt-surface);\r
  border-color: rgba(255, 255, 255, 0.16);\r
  box-shadow: none;\r
}\r
\r
.yyt-toggle-label {\r
  display: flex;\r
  flex: 1;\r
  min-width: 0;\r
  flex-direction: column;\r
  gap: 6px;\r
}\r
\r
.yyt-toggle-label > span:first-child {\r
  font-weight: 700;\r
  font-size: 14px;\r
  color: var(--yyt-text);\r
  line-height: 1.45;\r
}\r
\r
.yyt-toggle-hint {\r
  font-size: 11px;\r
  color: rgba(255, 255, 255, 0.56);\r
  line-height: 1.55;\r
}\r
\r
.yyt-toggle {\r
  position: relative;\r
  display: inline-block;\r
  width: 52px;\r
  height: 30px;\r
  flex-shrink: 0;\r
  align-self: center;\r
}\r
\r
.yyt-toggle.yyt-small {\r
  width: 46px;\r
  height: 26px;\r
}\r
\r
.yyt-toggle input {\r
  opacity: 0;\r
  width: 0;\r
  height: 0;\r
}\r
\r
.yyt-toggle-slider {\r
  position: absolute;\r
  cursor: pointer;\r
  top: 0;\r
  left: 0;\r
  right: 0;\r
  bottom: 0;\r
  background: var(--yyt-surface-3);\r
  border: 1px solid rgba(255, 255, 255, 0.12);\r
  border-radius: 999px;\r
  transition: background 0.28s var(--ease-in-out), border-color 0.28s var(--ease-in-out), box-shadow 0.28s var(--ease-in-out);\r
  box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.12), 0 6px 14px rgba(0, 0, 0, 0.12);\r
}\r
\r
.yyt-toggle-slider::before {\r
  position: absolute;\r
  content: "";\r
  height: 22px;\r
  width: 22px;\r
  left: 3px;\r
  bottom: 3px;\r
  background: #ffffff;\r
  border-radius: 50%;\r
  transition: transform 0.28s var(--ease-in-out);\r
  box-shadow: none;\r
}\r
\r
.yyt-toggle.yyt-small .yyt-toggle-slider::before {\r
  width: 18px;\r
  height: 18px;\r
  left: 3px;\r
  bottom: 3px;\r
}\r
\r
.yyt-toggle input:focus-visible + .yyt-toggle-slider {\r
  box-shadow: var(--yyt-focus-ring), inset 0 -1px 0 rgba(0, 0, 0, 0.12), 0 6px 14px rgba(0, 0, 0, 0.12);\r
}\r
\r
.yyt-toggle input:checked + .yyt-toggle-slider {\r
  background: var(--yyt-accent);\r
  border-color: var(--yyt-accent);\r
  box-shadow: none;\r
}\r
\r
.yyt-toggle input:checked + .yyt-toggle-slider::before {\r
  transform: translateX(22px);\r
}\r
\r
.yyt-toggle.yyt-small input:checked + .yyt-toggle-slider::before {\r
  transform: translateX(20px);\r
}\r
\r
/* ============================================================\r
   \u9884\u8BBE\u9009\u62E9\u5668\u6837\u5F0F\r
   ============================================================ */\r
\r
.yyt-preset-selector {\r
  display: flex;\r
  gap: 12px;\r
  align-items: center;\r
}\r
\r
.yyt-custom-select {\r
  position: relative;\r
  isolation: isolate;\r
  flex: 1;\r
  min-width: 0;\r
}\r
\r
.yyt-select-fixed-width {\r
  flex: 0 0 auto;\r
  width: 176px;\r
  min-width: 176px;\r
}\r
\r
.yyt-select-trigger {\r
  display: flex;\r
  align-items: center;\r
  justify-content: space-between;\r
  gap: 12px;\r
  min-height: 42px;\r
  padding: 11px 15px;\r
  border: 1px solid var(--yyt-control-border);\r
  border-radius: var(--yyt-control-radius);\r
  background: var(--yyt-control-bg);\r
  color: var(--yyt-text);\r
  font-size: 13px;\r
  cursor: pointer;\r
  transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease, transform 0.2s ease;\r
  box-shadow: var(--yyt-control-shadow);\r
}\r
\r
.yyt-select-trigger:hover {\r
  border-color: var(--yyt-control-border-hover);\r
  background: var(--yyt-control-bg-hover);\r
  box-shadow: var(--yyt-control-shadow-hover);\r
}\r
\r
.yyt-custom-select.yyt-open .yyt-select-trigger {\r
  border-color: var(--yyt-control-border-focus);\r
  background: var(--yyt-control-bg-focus);\r
  box-shadow: var(--yyt-focus-ring), var(--yyt-control-shadow-focus);\r
}\r
\r
.yyt-select-value {\r
  flex: 1;\r
  overflow: hidden;\r
  text-overflow: ellipsis;\r
  white-space: nowrap;\r
}\r
\r
.yyt-select-arrow {\r
  color: var(--yyt-select-arrow-color);\r
  transition: transform 0.2s ease, color 0.2s ease;\r
  margin-left: 8px;\r
}\r
\r
.yyt-custom-select.yyt-open .yyt-select-arrow {\r
  transform: rotate(180deg);\r
  color: var(--yyt-accent-strong);\r
}\r
\r
.yyt-select-portal-layer {\r
  position: fixed;\r
  inset: 0;\r
  z-index: 10040;\r
  pointer-events: none;\r
}\r
\r
.yyt-select-dropdown {\r
  position: absolute;\r
  top: calc(100% + 8px);\r
  left: 0;\r
  right: 0;\r
  max-height: 0;\r
  overflow: hidden;\r
  box-sizing: border-box;\r
  min-width: 100%;\r
  padding: 0;\r
  background: var(--yyt-select-surface) !important;\r
  background-image: none !important;\r
  border: 1px solid var(--yyt-control-border-hover);\r
  border-radius: 6px;\r
  box-shadow: var(--yyt-select-dropdown-shadow);\r
  backdrop-filter: none !important;\r
  -webkit-backdrop-filter: none !important;\r
  z-index: 3200;\r
  opacity: 0;\r
  pointer-events: none;\r
  transition: max-height 0.25s var(--ease-in-out), opacity 0.2s ease, border-color 0.2s ease, padding 0.2s ease;\r
}\r
\r
.yyt-custom-select.yyt-open .yyt-select-dropdown,\r
.yyt-select-dropdown.yyt-floating-open {\r
  max-height: 320px;\r
  overflow-y: auto;\r
  overflow-x: hidden;\r
  opacity: 1;\r
  padding: 8px;\r
  pointer-events: auto;\r
}\r
\r
.yyt-select-option {\r
  display: flex;\r
  align-items: center;\r
  gap: 10px;\r
  width: 100%;\r
  box-sizing: border-box;\r
  padding: 11px 14px;\r
  cursor: pointer;\r
  transition: background 0.15s ease, border-color 0.15s ease, transform 0.15s ease, box-shadow 0.15s ease;\r
  border: 1px solid transparent;\r
  border-radius: 6px;\r
  margin: 0;\r
  background: var(--yyt-select-option-bg) !important;\r
  background-image: none !important;\r
  color: var(--yyt-text);\r
}\r
\r
.yyt-select-option:hover {\r
  background: var(--yyt-select-option-hover-bg) !important;\r
  background-image: none !important;\r
  border-color: var(--yyt-select-option-border);\r
  transform: translateY(-1px);\r
}\r
\r
.yyt-select-option.yyt-selected {\r
  background: var(--yyt-select-option-selected-bg) !important;\r
  background-image: none !important;\r
  border-color: var(--yyt-select-option-selected-border);\r
  box-shadow: none;\r
}\r
\r
.yyt-option-star,\r
.yyt-option-delete {\r
  display: inline-flex;\r
  align-items: center;\r
  justify-content: center;\r
  width: 30px;\r
  height: 26px;\r
  border: 1px solid transparent;\r
  border-radius: 8px;\r
  background: rgba(255, 255, 255, 0.03);\r
  color: var(--yyt-text-muted);\r
  font-size: 14px;\r
  cursor: pointer;\r
  transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;\r
  flex-shrink: 0;\r
}\r
\r
.yyt-option-star:hover {\r
  color: var(--yyt-accent);\r
  background: var(--yyt-accent-soft);\r
  border-color: var(--yyt-accent-soft);\r
}\r
\r
.yyt-option-delete:hover {\r
  color: #fca5a5;\r
  background: rgba(239, 68, 68, 0.12);\r
  border-color: rgba(239, 68, 68, 0.18);\r
}\r
\r
.yyt-option-star.yyt-starred {\r
  color: #fbbf24;\r
  background: rgba(251, 191, 36, 0.12);\r
  border-color: rgba(251, 191, 36, 0.2);\r
}\r
\r
.yyt-option-text {\r
  flex: 1;\r
  overflow: hidden;\r
  text-overflow: ellipsis;\r
  white-space: nowrap;\r
  color: var(--yyt-text);\r
  font-size: 13px;\r
}\r
\r
/* \u9884\u8BBE\u5217\u8868 */\r
.yyt-preset-list-compact {\r
  display: flex;\r
  flex-direction: column;\r
  max-height: 150px;\r
  overflow-y: auto;\r
}\r
\r
.yyt-preset-item {\r
  display: flex;\r
  align-items: center;\r
  justify-content: space-between;\r
  gap: 10px;\r
  padding: 11px 14px;\r
  background: transparent;\r
  border: none;\r
  border-top: 1px solid var(--yyt-border);\r
  border-radius: 0;\r
  transition: background 0.2s ease;\r
}\r
\r
.yyt-preset-item:first-child {\r
  border-top: none;\r
}\r
\r
.yyt-preset-item:hover {\r
  background: var(--yyt-surface-3);\r
}\r
\r
.yyt-preset-item.active {\r
  background: var(--yyt-accent-soft);\r
}\r
\r
.yyt-preset-item.yyt-loaded {\r
  background: rgba(74, 222, 128, 0.12);\r
}\r
\r
.yyt-preset-info {\r
  flex: 1;\r
  min-width: 0;\r
  display: flex;\r
  align-items: center;\r
  gap: 10px;\r
}\r
\r
.yyt-preset-name {\r
  font-weight: 600;\r
  font-size: 13px;\r
  color: var(--yyt-text);\r
}\r
\r
.yyt-preset-meta {\r
  display: flex;\r
  gap: 6px;\r
  flex-wrap: wrap;\r
}\r
\r
.yyt-preset-actions {\r
  display: flex;\r
  gap: 6px;\r
  opacity: 0.58;\r
  transition: opacity 0.2s ease;\r
}\r
\r
.yyt-preset-item:hover .yyt-preset-actions {\r
  opacity: 1;\r
}\r
\r
/* \u5FBD\u7AE0 */\r
.yyt-badge {\r
  display: inline-flex;\r
  align-items: center;\r
  gap: 4px;\r
  padding: 5px 10px;\r
  border-radius: 999px;\r
  font-size: var(--yyt-text-sm);\r
  font-weight: 700;\r
  border: 1px solid rgba(255, 255, 255, 0.1);\r
  background: var(--yyt-surface-2);\r
  color: var(--yyt-color-text-secondary);\r
}\r
\r
.yyt-badge-small {\r
  padding: 3px 8px;\r
  font-size: 10px;\r
  background: var(--yyt-accent-soft);\r
  color: var(--yyt-accent-strong);\r
  border: 1px solid var(--yyt-accent-soft);\r
}\r
\r
/* ============================================================\r
   \u5BF9\u8BDD\u6846\u6837\u5F0F\r
   ============================================================ */\r
\r
.yyt-dialog-overlay {\r
  position: fixed;\r
  top: 0;\r
  left: 0;\r
  right: 0;\r
  bottom: 0;\r
  background: rgba(0, 0, 0, 0.62);\r
  backdrop-filter: blur(12px) saturate(1.1);\r
  display: flex;\r
  align-items: center;\r
  justify-content: center;\r
  padding: 16px;\r
  box-sizing: border-box;\r
  overflow-y: auto;\r
  z-index: 10001;\r
  animation: yytFadeIn 0.2s var(--ease-out);\r
}\r
\r
.yyt-dialog {\r
  background: var(--yyt-bg-base);\r
  border: 1px solid var(--yyt-border-strong);\r
  border-radius: var(--yyt-radius);\r
  box-shadow: 0 25px 80px rgba(0, 0, 0, 0.6);\r
  width: 380px;\r
  max-width: 90vw;\r
  max-height: calc(100vh - 32px);\r
  display: flex;\r
  flex-direction: column;\r
  overflow: hidden;\r
  animation: yytScaleIn 0.25s cubic-bezier(0.16, 1, 0.3, 1);\r
}\r
\r
.yyt-dialog-header {\r
  display: flex;\r
  align-items: center;\r
  justify-content: space-between;\r
  padding: 16px 20px;\r
  border-bottom: 1px solid var(--yyt-border);\r
}\r
\r
.yyt-dialog-title {\r
  font-weight: 600;\r
  font-size: 15px;\r
  color: var(--yyt-text);\r
}\r
\r
.yyt-dialog-close {\r
  width: 28px;\r
  height: 28px;\r
  border: none;\r
  border-radius: 6px;\r
  background: transparent;\r
  color: var(--yyt-text-muted);\r
  cursor: pointer;\r
  display: flex;\r
  align-items: center;\r
  justify-content: center;\r
  transition: background 0.15s ease, color 0.15s ease;\r
}\r
\r
.yyt-dialog-close:hover {\r
  background: rgba(248, 113, 113, 0.15);\r
  color: var(--yyt-error);\r
}\r
\r
.yyt-dialog-body {\r
  padding: 20px;\r
  display: flex;\r
  flex-direction: column;\r
  gap: 16px;\r
  min-height: 0;\r
  overflow-y: auto;\r
  overflow-x: hidden;\r
}\r
\r
.yyt-dialog-footer {\r
  display: flex;\r
  justify-content: flex-end;\r
  gap: 10px;\r
  padding: 16px 20px;\r
  border-top: 1px solid var(--yyt-border);\r
}\r
\r
.yyt-dialog-wide {\r
  width: min(720px, calc(100vw - 32px));\r
}\r
\r
.yyt-dialog-body::-webkit-scrollbar {\r
  width: 8px;\r
}\r
\r
.yyt-dialog-body::-webkit-scrollbar-track {\r
  background: transparent;\r
}\r
\r
.yyt-dialog-body::-webkit-scrollbar-thumb {\r
  background: rgba(255, 255, 255, 0.14);\r
  border-radius: 4px;\r
}\r
\r
.yyt-dialog-body::-webkit-scrollbar-thumb:hover {\r
  background: rgba(255, 255, 255, 0.24);\r
}\r
\r
/* ============================================================\r
   \u9762\u677F\u5E95\u90E8\r
   ============================================================ */\r
\r
.yyt-panel-footer {\r
  display: flex;\r
  justify-content: space-between;\r
  align-items: center;\r
  gap: 12px;\r
  padding-top: 16px;\r
  margin-top: 4px;\r
  border-top: 1px solid var(--yyt-border);\r
}\r
\r
.yyt-footer-left,\r
.yyt-footer-right {\r
  display: flex;\r
  gap: 8px;\r
}\r
\r
/* ============================================================\r
   \u7A7A\u72B6\u6001\r
   ============================================================ */\r
\r
.yyt-empty-state-small {\r
  display: flex;\r
  flex-direction: column;\r
  align-items: center;\r
  justify-content: center;\r
  padding: 24px;\r
  color: var(--yyt-text-muted);\r
  gap: 8px;\r
}\r
\r
.yyt-empty-state-small i {\r
  font-size: 24px;\r
  opacity: 0.4;\r
}\r
\r
.yyt-empty-state-small span {\r
  font-size: 12px;\r
}\r
\r
/* ============================================================\r
   \u7981\u7528\u72B6\u6001\r
   ============================================================ */\r
\r
.yyt-disabled {\r
  opacity: 0.4;\r
  pointer-events: none;\r
  filter: grayscale(0.5);\r
}\r
\r
/* ============================================================\r
   \u6EDA\u52A8\u6761\u6837\u5F0F\r
   ============================================================ */\r
\r
.yyt-panel::-webkit-scrollbar,\r
.yyt-content::-webkit-scrollbar,\r
.yyt-select-dropdown::-webkit-scrollbar {\r
  width: 6px;\r
}\r
\r
.yyt-panel::-webkit-scrollbar-track,\r
.yyt-content::-webkit-scrollbar-track,\r
.yyt-select-dropdown::-webkit-scrollbar-track {\r
  background: transparent;\r
}\r
\r
.yyt-panel::-webkit-scrollbar-thumb,\r
.yyt-content::-webkit-scrollbar-thumb,\r
.yyt-select-dropdown::-webkit-scrollbar-thumb {\r
  background: rgba(255, 255, 255, 0.12);\r
  border-radius: 3px;\r
}\r
\r
.yyt-panel::-webkit-scrollbar-thumb:hover,\r
.yyt-content::-webkit-scrollbar-thumb:hover,\r
.yyt-select-dropdown::-webkit-scrollbar-thumb:hover {\r
  background: rgba(255, 255, 255, 0.2);\r
}\r
\r
/* ============================================================\r
   \u52A8\u753B\r
   ============================================================ */\r
\r
.yyt-panel-section {\r
  animation: yytSlideUp 0.25s var(--ease-out) both;\r
}\r
\r
.yyt-panel-section:nth-child(1) { animation-delay: 0s; }\r
.yyt-panel-section:nth-child(2) { animation-delay: 0.04s; }\r
.yyt-panel-section:nth-child(3) { animation-delay: 0.08s; }\r
\r
/* ============================================================\r
   \u4E3B\u5F39\u7A97\u6837\u5F0F\r
   ============================================================ */\r
\r
.yyt-popup-overlay {\r
  position: fixed;\r
  inset: 0;\r
  background: var(--yyt-backdrop);\r
  backdrop-filter: blur(16px) saturate(1.15);\r
  -webkit-backdrop-filter: blur(16px) saturate(1.15);\r
  z-index: 9999;\r
  animation: yytFadeIn 0.2s var(--ease-out);\r
}\r
\r
.yyt-popup {\r
  position: fixed;\r
  top: 50%;\r
  left: 50%;\r
  transform: translate(-50%, -50%);\r
  display: flex;\r
  flex-direction: column;\r
  width: min(1500px, calc(100vw - 12px));\r
  max-width: calc(100vw - 12px);\r
  height: min(1120px, calc(100vh - 12px));\r
  max-height: calc(100vh - 12px);\r
  background: var(--yyt-bg-base);\r
  border: 1px solid rgba(255, 255, 255, 0.14);\r
  border-radius: 12px;\r
  box-shadow:\r
    0 0 0 1px rgba(255, 255, 255, 0.05),\r
    0 28px 84px rgba(0, 0, 0, 0.58),\r
    0 0 80px var(--yyt-accent-soft);\r
  animation: yytScaleInCentered 0.25s cubic-bezier(0.16, 1, 0.3, 1);\r
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", Roboto, Arial, sans-serif;\r
  color: var(--yyt-text);\r
  z-index: 10000;\r
}\r
\r
.yyt-popup-header {\r
  display: flex;\r
  align-items: center;\r
  justify-content: space-between;\r
  gap: 16px;\r
  padding: 12px 20px;\r
  background: var(--yyt-surface);\r
  border-bottom: 1px solid var(--yyt-border);\r
  border-radius: 12px 12px 0 0;\r
  flex-shrink: 0;\r
  cursor: grab;\r
}\r
\r
.yyt-popup-brand {\r
  display: flex;\r
  flex-direction: column;\r
  gap: 6px;\r
  min-width: 0;\r
}\r
\r
.yyt-popup-title-row {\r
  display: flex;\r
  align-items: center;\r
  gap: 10px;\r
  min-width: 0;\r
}\r
\r
.yyt-popup.yyt-popup-dragging .yyt-popup-header {\r
  cursor: grabbing;\r
}\r
\r
.yyt-popup-title {\r
  display: flex;\r
  align-items: center;\r
  gap: 12px;\r
  font-size: 16px;\r
  font-weight: 700;\r
  color: var(--yyt-text);\r
  min-width: 0;\r
}\r
\r
.yyt-popup-title span:last-child {\r
  overflow: hidden;\r
  text-overflow: ellipsis;\r
  white-space: nowrap;\r
}\r
\r
.yyt-popup-version {\r
  display: inline-flex;\r
  align-items: center;\r
  padding: 5px 11px;\r
  border-radius: 999px;\r
  font-size: 11px;\r
  font-weight: 700;\r
  color: var(--yyt-accent);\r
  background: var(--yyt-accent-soft);\r
  border: 1px solid var(--yyt-accent-soft);\r
  flex-shrink: 0;\r
}\r
\r
.yyt-popup-subtitle {\r
  font-size: 12px;\r
  color: var(--yyt-text-muted);\r
  letter-spacing: 0.3px;\r
}\r
\r
.yyt-popup-title i {\r
  color: var(--yyt-accent);\r
  font-size: 18px;\r
  \r
}\r
\r
.yyt-popup-header-actions {\r
  display: flex;\r
  align-items: center;\r
  gap: 12px;\r
  flex-shrink: 0;\r
}\r
\r
.yyt-popup-drag-hint {\r
  display: inline-flex;\r
  align-items: center;\r
  gap: 8px;\r
  padding: 8px 12px;\r
  border-radius: 999px;\r
  font-size: 12px;\r
  color: var(--yyt-text-secondary);\r
  background: rgba(255, 255, 255, 0.03);\r
  border: 1px solid var(--yyt-border);\r
}\r
\r
.yyt-popup-drag-hint i {\r
  color: var(--yyt-accent);\r
}\r
\r
.yyt-popup-close {\r
  width: 34px;\r
  height: 34px;\r
  border: 1px solid var(--yyt-border);\r
  border-radius: 12px;\r
  background: rgba(255, 255, 255, 0.04);\r
  color: var(--yyt-text-secondary);\r
  cursor: pointer;\r
  display: flex;\r
  align-items: center;\r
  justify-content: center;\r
  transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;\r
  font-size: 14px;\r
}\r
\r
.yyt-popup-close:hover {\r
  background: rgba(248, 113, 113, 0.14);\r
  border-color: rgba(248, 113, 113, 0.2);\r
  color: #ff6b6b;\r
}\r
\r
.yyt-popup-body {\r
  position: relative;\r
  flex: 1;\r
  display: flex;\r
  flex-direction: column;\r
  min-height: 0;\r
  padding: 12px 16px;\r
  overflow: hidden;\r
}\r
\r
.yyt-popup-shell {\r
  flex: 1;\r
  min-height: 0;\r
  display: flex;\r
  flex-direction: column;\r
  gap: 12px;\r
}\r
\r
.yyt-content-frame {\r
  flex: 1;\r
  min-height: 0;\r
  min-width: 0;\r
  overflow: hidden;\r
  padding: 5px;\r
  border-radius: var(--yyt-radius-xl);\r
  background: var(--yyt-surface);\r
}\r
\r
.yyt-content-frame .yyt-content {\r
  height: 100%;\r
}\r
\r
.yyt-content-inner {\r
  min-height: 100%;\r
  height: 100%;\r
}\r
\r
.yyt-startup-screen {\r
  position: absolute;\r
  inset: 16px 18px;\r
  z-index: 3;\r
  display: flex;\r
  align-items: stretch;\r
  justify-content: center;\r
  padding: 18px;\r
  border-radius: 8px;\r
  background: var(--yyt-startup-overlay);\r
  backdrop-filter: blur(16px);\r
  -webkit-backdrop-filter: blur(16px);\r
  box-shadow: 0 24px 56px rgba(0, 0, 0, 0.38);\r
}\r
\r
.yyt-startup-screen-inner {\r
  width: min(760px, 100%);\r
  display: flex;\r
  flex-direction: column;\r
  justify-content: center;\r
  gap: 18px;\r
  padding: 30px 32px;\r
  border-radius: 12px;\r
  border: 1px solid var(--yyt-startup-panel-border);\r
  background: var(--yyt-startup-panel-bg);\r
  box-shadow: var(--yyt-startup-panel-shadow);\r
}\r
\r
.yyt-startup-screen-kicker {\r
  display: inline-flex;\r
  align-items: center;\r
  width: fit-content;\r
  padding: 6px 12px;\r
  border-radius: 999px;\r
  font-size: 11px;\r
  font-weight: 700;\r
  letter-spacing: 0.52px;\r
  text-transform: uppercase;\r
  color: var(--yyt-accent-strong);\r
  background: var(--yyt-startup-kicker-bg);\r
  border: 1px solid var(--yyt-startup-kicker-border);\r
}\r
\r
.yyt-startup-screen-title {\r
  font-size: clamp(28px, 4vw, 40px);\r
  font-weight: 700;\r
  line-height: 1.04;\r
  letter-spacing: -0.5px;\r
  color: var(--yyt-text);\r
}\r
\r
.yyt-startup-screen-desc {\r
  max-width: 62ch;\r
  font-size: 14px;\r
  line-height: 1.8;\r
  color: var(--yyt-text-secondary);\r
}\r
\r
.yyt-startup-screen-modules {\r
  display: flex;\r
  flex-wrap: wrap;\r
  gap: 10px;\r
}\r
\r
.yyt-startup-module-chip {\r
  display: inline-flex;\r
  align-items: center;\r
  gap: 8px;\r
  padding: 10px 13px;\r
  border-radius: 6px;\r
  background: var(--yyt-startup-chip-bg);\r
  border: 1px solid var(--yyt-startup-chip-border);\r
  color: var(--yyt-text);\r
  font-size: 12px;\r
  font-weight: 700;\r
}\r
\r
.yyt-startup-module-chip i {\r
  color: var(--yyt-accent-strong);\r
}\r
\r
.yyt-startup-screen-status {\r
  display: inline-flex;\r
  align-items: center;\r
  gap: 10px;\r
  width: fit-content;\r
  max-width: 100%;\r
  padding: 11px 14px;\r
  border-radius: 8px;\r
  background: var(--yyt-startup-status-bg);\r
  border: 1px solid var(--yyt-startup-status-border);\r
  color: var(--yyt-startup-status-text);\r
  font-size: 12px;\r
  line-height: 1.6;\r
}\r
\r
.yyt-startup-screen-status i {\r
  color: var(--yyt-accent-strong);\r
}\r
\r
.yyt-startup-enter {\r
  align-self: flex-start;\r
  min-width: 148px;\r
}\r
\r
.yyt-popup-shell[data-yyt-startup-visible="true"] .yyt-shell-workspace {\r
  filter: blur(1px);\r
  pointer-events: none;\r
  user-select: none;\r
}\r
\r
.yyt-shell-topbar {\r
  position: relative;\r
  isolation: isolate;\r
  flex-shrink: 0;\r
  display: grid;\r
  grid-template-columns: minmax(0, 1fr) minmax(240px, 300px);\r
  gap: 12px;\r
  padding: 16px 18px;\r
  border-radius: 8px;\r
  border: 1px solid rgba(255, 255, 255, 0.1);\r
  background: var(--yyt-surface);\r
}\r
\r
.yyt-shell-topbar::before {\r
  content: '';\r
  position: absolute;\r
  inset: 0;\r
  border-radius: inherit;\r
  display: none;\r
  pointer-events: none;\r
  opacity: 0.82;\r
}\r
\r
.yyt-shell-topbar-main {\r
  position: relative;\r
  z-index: 1;\r
  display: flex;\r
  align-items: center;\r
  gap: 14px;\r
  min-width: 0;\r
}\r
\r
.yyt-shell-kicker {\r
  display: inline-flex;\r
  align-items: center;\r
  width: fit-content;\r
  padding: 7px 12px;\r
  border-radius: 999px;\r
  background: var(--yyt-accent-soft);\r
  border: 1px solid var(--yyt-accent-soft);\r
  color: var(--yyt-accent-strong);\r
  font-size: 11px;\r
  font-weight: 700;\r
  letter-spacing: 0.5px;\r
  text-transform: uppercase;\r
  box-shadow: none;\r
  flex-shrink: 0;\r
}\r
\r
.yyt-shell-topbar-summary {\r
  display: flex;\r
  flex-direction: column;\r
  gap: 5px;\r
  min-width: 0;\r
}\r
\r
.yyt-shell-topbar-title {\r
  font-size: 18px;\r
  font-weight: 700;\r
  line-height: 1.15;\r
  color: var(--yyt-text);\r
}\r
\r
.yyt-shell-topbar-meta {\r
  font-size: 12px;\r
  line-height: 1.6;\r
  color: rgba(255, 255, 255, 0.72);\r
}\r
\r
.yyt-shell-current-desc {\r
  font-size: 12px;\r
  line-height: 1.65;\r
  color: rgba(255, 255, 255, 0.76);\r
}\r
\r
.yyt-shell-stats {\r
  display: grid;\r
  grid-template-columns: repeat(3, minmax(84px, 1fr));\r
  gap: 10px;\r
  align-self: stretch;\r
}\r
\r
.yyt-shell-stat {\r
  display: flex;\r
  flex-direction: column;\r
  justify-content: center;\r
  gap: 8px;\r
  min-width: 84px;\r
  padding: 16px 14px 14px;\r
  border-radius: 0;\r
  background: transparent;\r
  border: none;\r
  border-left: 1px solid var(--yyt-border);\r
}\r
\r
.yyt-shell-stat:first-child {\r
  border-left: none;\r
}\r
\r
.yyt-shell-stat-label {\r
  font-size: 10px;\r
  color: rgba(255, 255, 255, 0.54);\r
  letter-spacing: 0.48px;\r
  text-transform: uppercase;\r
}\r
\r
.yyt-shell-stat-value {\r
  font-size: 26px;\r
  font-weight: 700;\r
  line-height: 1;\r
  color: var(--yyt-text);\r
}\r
\r
.yyt-shell-workspace {\r
  flex: 1;\r
  min-height: 0;\r
  display: grid;\r
  grid-template-columns: minmax(230px, var(--yyt-shell-sidebar-width)) minmax(0, 1fr);\r
  gap: 16px;\r
}\r
\r
.yyt-shell-sidebar {\r
  min-height: 0;\r
  display: flex;\r
  flex-direction: column;\r
  gap: 12px;\r
}\r
\r
.yyt-shell-sidebar-card {\r
  min-height: 0;\r
  display: flex;\r
  flex-direction: column;\r
  gap: 14px;\r
  overflow: hidden;\r
  padding: 16px;\r
  border-radius: 0;\r
  border: none;\r
  background: transparent;\r
  box-shadow: none;\r
}\r
\r
.yyt-shell-sidebar-title-row {\r
  display: flex;\r
  align-items: center;\r
  justify-content: space-between;\r
  gap: 8px;\r
}\r
\r
.yyt-shell-sidebar-title {\r
  font-size: 14px;\r
  font-weight: 700;\r
  color: var(--yyt-text);\r
}\r
\r
.yyt-shell-sidebar-hint {\r
  font-size: 10px;\r
  color: var(--yyt-text-muted);\r
  text-transform: uppercase;\r
  letter-spacing: 0.5px;\r
}\r
\r
.yyt-shell-sidebar .yyt-main-nav {\r
  flex-direction: column;\r
  gap: 8px;\r
  padding: 0;\r
  margin-bottom: 0;\r
  background: transparent;\r
  border: none;\r
  min-height: 0;\r
  overflow-y: auto;\r
}\r
\r
.yyt-shell-sidebar .yyt-main-nav-item {\r
  position: relative;\r
  width: 100%;\r
  min-width: 0;\r
  padding: 16px;\r
  border-radius: 6px;\r
  border: 1px solid rgba(255, 255, 255, 0.06);\r
  box-shadow: none;\r
  background: transparent;\r
}\r
\r
.yyt-shell-sidebar .yyt-main-nav-item::before {\r
  content: '';\r
  position: absolute;\r
  inset: 10px auto 10px 0;\r
  width: 4px;\r
  border-radius: 999px;\r
  background: transparent;\r
  transition: background 0.15s ease, box-shadow 0.15s ease;\r
}\r
\r
.yyt-shell-sidebar .yyt-main-nav-item:hover {\r
  border-color: rgba(255, 255, 255, 0.12);\r
  box-shadow: none;\r
}\r
\r
.yyt-shell-sidebar .yyt-main-nav-item.active {\r
  color: var(--yyt-text);\r
  border-color: var(--yyt-accent-soft);\r
  background: var(--yyt-accent-soft);\r
}\r
\r
.yyt-shell-sidebar .yyt-main-nav-item.active::before {\r
  background: var(--yyt-accent);\r
}\r
\r
.yyt-shell-sidebar .yyt-main-nav-icon {\r
  width: 42px;\r
  height: 42px;\r
  border-radius: 6px;\r
  background: rgba(255, 255, 255, 0.08);\r
  border: 1px solid rgba(255, 255, 255, 0.1);\r
}\r
\r
.yyt-shell-sidebar .yyt-main-nav-item.active .yyt-main-nav-icon {\r
  background: var(--yyt-accent-soft);\r
  border-color: var(--yyt-accent-soft);\r
}\r
\r
.yyt-shell-sidebar-note {\r
  padding: 13px 14px;\r
  border-radius: 0;\r
  border: none;\r
  background: transparent;\r
  color: var(--yyt-text-muted);\r
  font-size: 12px;\r
  line-height: 1.65;\r
}\r
\r
.yyt-shell-main {\r
  min-height: 0;\r
  display: flex;\r
  flex-direction: column;\r
  gap: 14px;\r
}\r
\r
.yyt-shell-main-header {\r
  position: relative;\r
  overflow: hidden;\r
  flex-shrink: 0;\r
  display: flex;\r
  align-items: flex-start;\r
  justify-content: space-between;\r
  gap: 16px;\r
  padding: 12px 16px;\r
  border-radius: 8px;\r
  border: 1px solid rgba(255, 255, 255, 0.06);\r
  background: transparent;\r
  box-shadow: none;\r
}\r
\r
.yyt-shell-main-header::after {\r
  content: '';\r
  position: absolute;\r
  inset: 0;\r
  display: none;\r
  pointer-events: none;\r
}\r
\r
.yyt-shell-main-actions {\r
  position: relative;\r
  z-index: 1;\r
  display: flex;\r
  align-items: flex-start;\r
  justify-content: flex-end;\r
  gap: 10px;\r
  flex-wrap: wrap;\r
  margin-left: auto;\r
}\r
\r
.yyt-shell-main-heading-block {\r
  position: relative;\r
  z-index: 1;\r
  display: flex;\r
  flex-direction: column;\r
  gap: 9px;\r
  min-width: 0;\r
}\r
\r
.yyt-shell-main-label-row {\r
  display: flex;\r
  align-items: center;\r
  gap: 10px;\r
  flex-wrap: wrap;\r
}\r
\r
.yyt-shell-main-label {\r
  font-size: 11px;\r
  font-weight: 700;\r
  color: rgba(255, 255, 255, 0.58);\r
  text-transform: uppercase;\r
  letter-spacing: 0.5px;\r
}\r
\r
.yyt-shell-breadcrumb {\r
  display: inline-flex;\r
  align-items: center;\r
  padding: 6px 12px;\r
  border-radius: 999px;\r
  font-size: 11px;\r
  font-weight: 700;\r
  color: var(--yyt-text);\r
  background: rgba(255, 255, 255, 0.08);\r
  border: 1px solid rgba(255, 255, 255, 0.12);\r
  max-width: 100%;\r
}\r
\r
.yyt-shell-main-title {\r
  font-size: 26px;\r
  font-weight: 700;\r
  line-height: 1.06;\r
  letter-spacing: -0.3px;\r
  color: var(--yyt-text);\r
}\r
\r
.yyt-shell-main-description {\r
  font-size: 13px;\r
  line-height: 1.7;\r
  color: rgba(255, 255, 255, 0.8);\r
  max-width: 68ch;\r
}\r
\r
.yyt-shell-main-meta {\r
  display: inline-flex;\r
  align-items: center;\r
  gap: 8px;\r
  padding: 12px 14px;\r
  border-radius: 0;\r
  background: transparent;\r
  border: none;\r
  border-bottom: 1px solid var(--yyt-border);\r
  color: var(--yyt-text);\r
  font-size: 12px;\r
  line-height: 1.5;\r
  box-shadow: none;\r
}\r
\r
.yyt-shell-main-save-btn {\r
  white-space: nowrap;\r
  flex-shrink: 0;\r
}\r
\r
.yyt-shell-main-meta i {\r
  color: var(--yyt-accent-strong);\r
}\r
\r
.yyt-popup-footer {\r
  display: flex;\r
  justify-content: space-between;\r
  align-items: center;\r
  gap: 12px;\r
  padding: 16px 22px;\r
  background: var(--yyt-surface);\r
  border-top: 1px solid var(--yyt-border);\r
  border-radius: 0 0 12px 12px;\r
  flex-shrink: 0;\r
}\r
\r
.yyt-popup-footer-left,\r
.yyt-popup-footer-right {\r
  display: flex;\r
  align-items: center;\r
  gap: 10px;\r
}\r
\r
.yyt-popup-footer-left {\r
  min-width: 0;\r
}\r
\r
.yyt-popup-status-cluster {\r
  display: flex;\r
  align-items: center;\r
  gap: 12px;\r
  min-width: 0;\r
  flex-wrap: wrap;\r
}\r
\r
.yyt-popup-status {\r
  display: inline-flex;\r
  align-items: center;\r
  gap: 8px;\r
  padding: 9px 14px;\r
  border-radius: 999px;\r
  font-size: 12px;\r
  color: var(--yyt-text);\r
  background: rgba(255, 255, 255, 0.08);\r
  border: 1px solid rgba(255, 255, 255, 0.12);\r
}\r
\r
.yyt-popup-status i {\r
  color: var(--yyt-accent-strong);\r
}\r
\r
.yyt-popup-footer-note {\r
  font-size: 12px;\r
  line-height: 1.6;\r
  color: rgba(255, 255, 255, 0.72);\r
}\r
\r
.yyt-shell-sidebar .yyt-main-nav,\r
.yyt-sub-nav,\r
.yyt-content,\r
.yyt-tab-content,\r
.yyt-sub-content {\r
  overscroll-behavior: contain;\r
}\r
\r
.yyt-scrollable-surface {\r
  cursor: grab;\r
}\r
\r
.yyt-scrollable-surface.yyt-scroll-dragging {\r
  cursor: grabbing;\r
  user-select: none;\r
}\r
\r
/* \u6807\u7B7E\u5185\u5BB9 */\r
.yyt-tab-content {\r
  display: none;\r
  flex: 1;\r
  min-height: 0;\r
  min-width: 0;\r
  overflow-y: auto;\r
  overflow-x: hidden;\r
  height: 100%;\r
}\r
\r
.yyt-tab-content.active {\r
  display: flex;\r
  flex-direction: column;\r
}\r
\r
/* \u5B50\u5185\u5BB9\u533A\u57DF */\r
.yyt-sub-content {\r
  display: flex;\r
  flex-direction: column;\r
  flex: 1;\r
  min-height: 0;\r
  min-width: 0;\r
  overflow-y: auto;\r
  overflow-x: hidden;\r
  height: 100%;\r
}\r
\r
/* \u5DE5\u5177\u7A97\u53E3\u5BB9\u5668 */\r
.yyt-tool-window {\r
  display: flex;\r
  flex-direction: column;\r
  height: 100%;\r
}\r
\r
.yyt-compact-mode .yyt-popup-body {\r
  padding: 12px 16px;\r
}\r
\r
.yyt-compact-mode .yyt-panel {\r
  gap: 14px;\r
}\r
\r
.yyt-compact-mode .yyt-panel-section {\r
  padding: 14px;\r
  gap: 10px;\r
}\r
\r
.yyt-no-animation *,\r
.yyt-no-animation *::before,\r
.yyt-no-animation *::after {\r
  animation: none !important;\r
  transition: none !important;\r
}\r
\r
/* \u54CD\u5E94\u5F0F\u8C03\u6574 */\r
@media screen and (max-width: 980px) {\r
  .yyt-shell-topbar {\r
    grid-template-columns: 1fr;\r
  }\r
\r
  .yyt-shell-topbar-main {\r
    align-items: flex-start;\r
  }\r
\r
  .yyt-shell-stats {\r
    grid-template-columns: repeat(3, minmax(0, 1fr));\r
  }\r
\r
  .yyt-popup-header {\r
    padding: 12px 16px;\r
  }\r
\r
  .yyt-popup-body {\r
    padding: 12px 14px;\r
  }\r
\r
  .yyt-startup-screen {\r
    inset: 12px 14px;\r
    padding: 14px;\r
  }\r
\r
  .yyt-startup-screen-inner {\r
    padding: 24px 22px;\r
  }\r
\r
  .yyt-popup-header-actions {\r
    gap: 8px;\r
  }\r
\r
  .yyt-popup-drag-hint {\r
    padding: 6px 10px;\r
  }\r
}\r
\r
@media screen and (max-height: 860px) {\r
  .yyt-popup {\r
    height: calc(100vh - 4px);\r
    max-height: calc(100vh - 4px);\r
  }\r
\r
  .yyt-popup-body {\r
    padding: 10px 12px;\r
  }\r
\r
  .yyt-popup-shell {\r
    gap: 8px;\r
  }\r
\r
  .yyt-shell-topbar,\r
  .yyt-shell-main-header,\r
  .yyt-shell-sidebar-card {\r
    padding: 12px;\r
  }\r
\r
  .yyt-shell-topbar-title,\r
  .yyt-shell-main-description {\r
    font-size: 11px;\r
    line-height: 1.4;\r
  }\r
\r
  .yyt-shell-stat {\r
    padding: 8px 10px;\r
  }\r
\r
  .yyt-shell-stat-value {\r
    font-size: 16px;\r
  }\r
\r
  .yyt-startup-screen {\r
    inset: 10px 12px;\r
    padding: 12px;\r
  }\r
\r
  .yyt-startup-screen-inner {\r
    gap: 14px;\r
    padding: 22px 20px;\r
  }\r
\r
  .yyt-startup-screen-desc {\r
    font-size: 12px;\r
    line-height: 1.6;\r
  }\r
}\r
\r
@media screen and (max-width: 860px) {\r
  .yyt-shell-workspace {\r
    grid-template-columns: 1fr;\r
  }\r
\r
  .yyt-shell-sidebar .yyt-main-nav {\r
    flex-direction: row;\r
    overflow-x: auto;\r
    overflow-y: hidden;\r
    padding-bottom: 4px;\r
  }\r
\r
  .yyt-shell-sidebar .yyt-main-nav-item {\r
    min-width: 220px;\r
  }\r
\r
  .yyt-startup-screen {\r
    inset: 12px;\r
    padding: 12px;\r
  }\r
\r
  .yyt-startup-screen-inner {\r
    padding: 22px 18px;\r
  }\r
}\r
\r
@media screen and (max-width: 768px) {\r
  .yyt-dialog-overlay {\r
    align-items: flex-start;\r
    padding: 10px;\r
  }\r
\r
  .yyt-dialog {\r
    width: 100%;\r
    max-width: 100%;\r
    max-height: calc(100vh - 20px);\r
  }\r
\r
  .yyt-dialog-body {\r
    padding: 16px;\r
  }\r
\r
  .yyt-dialog-footer,\r
  .yyt-dialog-header {\r
    padding-left: 16px;\r
    padding-right: 16px;\r
  }\r
\r
  .yyt-popup {\r
    width: 100vw;\r
    height: 100vh;\r
    max-width: 100vw;\r
    max-height: 100vh;\r
    border-radius: 0;\r
    border: none;\r
  }\r
\r
  .yyt-popup-header {\r
    border-radius: 0;\r
    padding: 10px 14px;\r
    align-items: flex-start;\r
  }\r
\r
  .yyt-popup-header-actions {\r
    gap: 6px;\r
  }\r
\r
  .yyt-popup-drag-hint {\r
    display: none;\r
  }\r
\r
  .yyt-popup-body {\r
    padding: 10px 14px;\r
  }\r
\r
  .yyt-shell-topbar,\r
  .yyt-shell-main-header,\r
  .yyt-shell-sidebar-card {\r
    padding: 14px;\r
    border-radius: 8px;\r
  }\r
\r
  .yyt-shell-topbar-main {\r
    flex-direction: column;\r
    align-items: flex-start;\r
    gap: 10px;\r
  }\r
\r
  .yyt-shell-topbar-title {\r
    font-size: 16px;\r
  }\r
\r
  .yyt-shell-main-header {\r
    flex-direction: column;\r
    align-items: flex-start;\r
  }\r
\r
  .yyt-shell-main-actions {\r
    width: 100%;\r
    justify-content: flex-start;\r
    margin-left: 0;\r
  }\r
\r
  .yyt-shell-stats {\r
    grid-template-columns: 1fr;\r
  }\r
\r
  .yyt-shell-sidebar .yyt-main-nav {\r
    flex-direction: column;\r
    overflow: visible;\r
  }\r
\r
  .yyt-shell-sidebar .yyt-main-nav-item {\r
    min-width: 0;\r
  }\r
\r
  .yyt-main-nav-item {\r
    padding: 12px 14px;\r
  }\r
\r
  .yyt-main-nav-desc {\r
    font-size: 10px;\r
  }\r
\r
  .yyt-startup-screen {\r
    inset: 10px 14px;\r
    padding: 10px;\r
    border-radius: 6px;\r
  }\r
\r
  .yyt-startup-screen-inner {\r
    padding: 20px 16px;\r
    border-radius: 8px;\r
  }\r
\r
  .yyt-startup-screen-status {\r
    width: 100%;\r
  }\r
\r
  .yyt-startup-enter {\r
    align-self: stretch;\r
  }\r
\r
  .yyt-popup-footer {\r
    border-radius: 0;\r
    padding: 10px 14px;\r
    flex-direction: column;\r
    align-items: stretch;\r
  }\r
\r
  .yyt-popup-footer-left,\r
  .yyt-popup-footer-right {\r
    width: 100%;\r
    justify-content: center;\r
  }\r
\r
  .yyt-popup-footer-note {\r
    text-align: center;\r
  }\r
}\r
\r
/* ============================================================\r
   Shell polish: tab transitions, sidebar collapse, micro-interactions\r
   ============================================================ */\r
\r
/* ---- Tab content enter animation ---- */\r
.yyt-tab-content.active {\r
  animation: yytFadeIn 0.18s var(--ease-out);\r
}\r
\r
/* ---- Sidebar collapse system ---- */\r
.yyt-shell-sidebar {\r
  transition: width 0.28s var(--ease-in-out);\r
  width: var(--yyt-shell-sidebar-width);\r
}\r
\r
.yyt-shell-sidebar.yyt-collapsed {\r
  width: 56px;\r
}\r
\r
.yyt-shell-workspace {\r
  transition: grid-template-columns 0.28s var(--ease-in-out);\r
}\r
\r
.yyt-shell-workspace.yyt-sidebar-collapsed {\r
  grid-template-columns: 56px minmax(0, 1fr);\r
}\r
\r
/* Collapsed sidebar: hide all text, keep icons only */\r
.yyt-shell-sidebar.yyt-collapsed .yyt-main-nav-name,\r
.yyt-shell-sidebar.yyt-collapsed .yyt-main-nav-desc,\r
.yyt-shell-sidebar.yyt-collapsed .yyt-shell-sidebar-note,\r
.yyt-shell-sidebar.yyt-collapsed .yyt-shell-sidebar-title,\r
.yyt-shell-sidebar.yyt-collapsed .yyt-shell-sidebar-hint,\r
.yyt-shell-sidebar.yyt-collapsed .yyt-shell-sidebar-stats {\r
  display: none;\r
}\r
\r
.yyt-shell-sidebar.yyt-collapsed .yyt-main-nav-item {\r
  padding: 14px 10px;\r
  justify-content: center;\r
}\r
\r
.yyt-shell-sidebar.yyt-collapsed .yyt-main-nav-icon {\r
  width: 36px;\r
  height: 36px;\r
}\r
\r
.yyt-shell-sidebar.yyt-collapsed .yyt-main-nav-copy {\r
  display: none;\r
}\r
\r
.yyt-shell-sidebar.yyt-collapsed .yyt-shell-sidebar-card {\r
  padding: 12px 8px;\r
}\r
\r
.yyt-shell-sidebar.yyt-collapsed .yyt-main-nav-item::before {\r
  display: none;\r
}\r
\r
/* ---- Sidebar collapse toggle button ---- */\r
.yyt-sidebar-toggle {\r
  display: inline-flex;\r
  align-items: center;\r
  justify-content: center;\r
  width: 30px;\r
  height: 30px;\r
  border: 1px solid rgba(255, 255, 255, 0.1);\r
  border-radius: 10px;\r
  background: rgba(255, 255, 255, 0.04);\r
  color: var(--yyt-text-muted);\r
  cursor: pointer;\r
  transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease, transform 0.15s ease;\r
  font-size: 12px;\r
  flex-shrink: 0;\r
}\r
\r
.yyt-sidebar-toggle:hover {\r
  background: rgba(255, 255, 255, 0.08);\r
  color: var(--yyt-text);\r
  border-color: rgba(255, 255, 255, 0.18);\r
}\r
\r
.yyt-sidebar-toggle:focus-visible {\r
  outline: none;\r
  box-shadow: var(--yyt-focus-ring);\r
}\r
\r
/* ---- Compact sidebar stats ---- */\r
.yyt-shell-sidebar-stats {\r
  display: grid;\r
  grid-template-columns: repeat(3, 1fr);\r
  gap: 6px;\r
  padding-top: 4px;\r
  border-top: 1px solid rgba(255, 255, 255, 0.06);\r
}\r
\r
.yyt-shell-sidebar-stat {\r
  display: flex;\r
  flex-direction: column;\r
  align-items: center;\r
  gap: 4px;\r
  padding: 8px 4px;\r
  border-radius: 0;\r
  background: transparent;\r
  border: none;\r
}\r
\r
.yyt-shell-sidebar-stat-value {\r
  font-size: 16px;\r
  font-weight: 700;\r
  line-height: 1;\r
  color: var(--yyt-text);\r
}\r
\r
.yyt-shell-sidebar-stat-label {\r
  font-size: 9px;\r
  font-weight: 700;\r
  color: var(--yyt-text-muted);\r
  text-transform: uppercase;\r
  letter-spacing: 0.4px;\r
}\r
\r
/* ---- Shell main heading block ---- */\r
.yyt-shell-main-heading-block {\r
  gap: 6px;\r
}\r
\r
.yyt-shell-breadcrumb {\r
  /* breadcrumb removed from main header \u2014 now only sidebar active state shows location */\r
}\r
\r
/* ---- Footer compact ---- */\r
.yyt-popup-footer {\r
  padding: 8px 20px;\r
}\r
\r
.yyt-popup-footer-left {\r
  gap: 8px;\r
}\r
\r
/* ---- Sub-content enter animation ---- */\r
.yyt-sub-content {\r
  animation: yytFadeIn 0.15s var(--ease-out);\r
}\r
\r
/* ---- Nav item micro-interactions ---- */\r
.yyt-shell-sidebar .yyt-main-nav-item {\r
  transition: background 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease, transform 0.15s ease, padding 0.28s var(--ease-in-out);\r
}\r
\r
.yyt-shell-sidebar .yyt-main-nav-item::before {\r
  transition: background 0.15s ease, box-shadow 0.15s ease;\r
}\r
\r
.yyt-shell-sidebar .yyt-main-nav-item:hover {\r
  transform: translateX(2px);\r
}\r
\r
.yyt-shell-sidebar .yyt-main-nav-item:focus-visible {\r
  outline: none;\r
  box-shadow: var(--yyt-focus-ring);\r
}\r
\r
/* ---- Shell workspace gap ---- */\r
.yyt-shell-workspace {\r
  gap: 12px;\r
}\r
\r
/* ---- Reduced motion ---- */\r
@media (prefers-reduced-motion: reduce) {\r
  *,\r
  *::before,\r
  *::after {\r
    animation-duration: 0.01ms !important;\r
    animation-iteration-count: 1 !important;\r
    transition-duration: 0.01ms !important;\r
  }\r
}\r
\r
/* ---- Responsive: collapsed sidebar on narrow screens ---- */\r
@media screen and (max-width: 860px) {\r
  .yyt-shell-sidebar.yyt-collapsed {\r
    width: 100%;\r
  }\r
\r
  .yyt-shell-workspace.yyt-sidebar-collapsed {\r
    grid-template-columns: 1fr;\r
  }\r
\r
  .yyt-sidebar-toggle {\r
    display: none;\r
  }\r
}\r
`;tt();function nh(t,e={}){let{constants:r,topLevelWindow:s,modules:o}=t,{SCRIPT_ID:n,SCRIPT_VERSION:a,MENU_ITEM_ID:i,MENU_CONTAINER_ID:l}=r,d=null,c=!1,u=E.createScope("Bootstrap");E.setToastHandler((A,C,w)=>{if(w.toast&&Gn(w.toast===!0?A:w.toast,C,w.duration),w.topNotice){let P=typeof w.topNotice=="object"?w.topNotice:{};$i(A,C,P)}});function p(...A){u.log(A.join(" "))}function y(...A){u.error(A.join(" "))}async function m(){return d||(d=(async()=>{try{o.storageModule=await Promise.resolve().then(()=>(je(),eu)),o.apiConnectionModule=await Promise.resolve().then(()=>(Jn(),nu)),o.presetManagerModule=await Promise.resolve().then(()=>(Go(),cu)),o.uiModule=await Promise.resolve().then(()=>(Gm(),Hm)),o.regexExtractorModule=await Promise.resolve().then(()=>(Qs(),Sl)),o.toolManagerModule=await Promise.resolve().then(()=>(tn(),vp)),o.toolExecutorModule=await Promise.resolve().then(()=>(Ac(),Ec)),o.windowManagerModule=await Promise.resolve().then(()=>(sd(),bm)),o.toolRegistryModule=await Promise.resolve().then(()=>(lr(),Ml)),o.settingsServiceModule=await Promise.resolve().then(()=>(vn(),bf)),o.bypassManagerModule=await Promise.resolve().then(()=>(_o(),hf)),o.variableResolverModule=await Promise.resolve().then(()=>(Ja(),Tf)),o.contextInjectorModule=await Promise.resolve().then(()=>(Ds(),wf)),o.toolPromptServiceModule=await Promise.resolve().then(()=>(Qa(),Ef)),o.toolOutputServiceModule=await Promise.resolve().then(()=>(Sn(),Cf)),o.toolAutomationServiceModule=await Promise.resolve().then(()=>(Zm(),Qm)),o.toolDataProviderModule=await Promise.resolve().then(()=>(mo(),_y)),o.presetBootstrapModule=await Promise.resolve().then(()=>(oh(),sh));try{o.toolDataProviderModule.getToolDataProvider({extensionVersion:a}).then(A=>{u.log(`Provider \u5C31\u7EEA: ${A.kind}`)}).catch(A=>{u.error(`Provider \u521D\u59CB\u5316\u5F02\u5E38: ${A?.message||A}`)})}catch(A){u.error(`Provider \u542F\u52A8\u5F02\u5E38: ${A?.message||A}`)}return o.toolOutputServiceModule?.toolOutputService&&o.apiConnectionModule&&o.toolOutputServiceModule.toolOutputService.setApiConnection(o.apiConnectionModule),!0}catch(A){return d=null,y("\u6A21\u5757\u52A0\u8F7D\u5931\u8D25\uFF0C\u4F7F\u7528\u5185\u7F6E\u529F\u80FD:",A),y("\u5DF2\u52A0\u8F7D\u6A21\u5757:",Object.keys(o).filter(C=>o[C])),!1}})(),d)}function g(){let A=`${n}-styles`,C=s.document||document;if(C.getElementById(A))return;let w=C.createElement("style");w.id=A,w.textContent=zd,(C.head||C.documentElement).appendChild(w),p("\u6837\u5F0F\u5DF2\u6CE8\u5165")}function h(){let A=s.document||document;if(o.uiModule?.getAllStyles){let C=`${n}-ui-styles`;if(!A.getElementById(C)){let w=A.createElement("style");w.id=C,w.textContent=o.uiModule.getAllStyles(),(A.head||A.documentElement).appendChild(w)}}}async function x(){try{let{applyUiPreferences:A}=await Promise.resolve().then(()=>(Lc(),Dc));if(o.settingsServiceModule?.settingsService){let C=o.settingsServiceModule.settingsService.getUiSettings();if(C&&C.theme){let w=s.document||document;A(C,w),p(`\u4E3B\u9898\u5DF2\u5E94\u7528: ${C.theme}`)}}}catch(A){p("\u4E3B\u9898\u52A0\u8F7D\u5931\u8D25:",A)}}function S(){let A=s.jQuery||window.jQuery;if(!A){y("jQuery \u672A\u627E\u5230\uFF0C\u5EF6\u8FDF\u91CD\u8BD5..."),setTimeout(S,1e3);return}let C=s.document||document,w=A("#extensionsMenu",C);if(!w.length){p("\u9B54\u68D2\u83DC\u5355\u672A\u627E\u5230\uFF0C\u5EF6\u8FDF\u91CD\u8BD5..."),setTimeout(S,2e3);return}if(A(`#${l}`,w).length>0){p("\u83DC\u5355\u9879\u5DF2\u5B58\u5728");return}let B=A(`<div class="extension_container interactable" id="${l}" tabindex="0"></div>`),z=`
      <div class="list-group-item flex-container flexGap5 interactable" id="${i}" title="\u6253\u5F00 YouYou \u5DE5\u5177\u7BB1">
        <div class="fa-fw fa-solid fa-wand-magic-sparkles extensionsMenuExtensionButton"></div>
        <span>YouYou \u5DE5\u5177\u7BB1</span>
      </div>
    `,R=A(z);R.on("click",function(M){M.stopPropagation(),p("\u83DC\u5355\u9879\u88AB\u70B9\u51FB");let j=A("#extensionsMenuButton",C);j.length&&w.is(":visible")&&j.trigger("click"),typeof e.openPopup=="function"&&e.openPopup()}),B.append(R),w.append(B),p("\u83DC\u5355\u9879\u5DF2\u6DFB\u52A0\u5230\u9B54\u68D2\u533A")}async function T(){p(`\u521D\u59CB\u5316\u5F00\u59CB... \u7248\u672C: ${a}`),await g();let A=await m();if(p(A?"\u6240\u6709\u6A21\u5757\u52A0\u8F7D\u6210\u529F":"\u90E8\u5206\u6A21\u5757\u52A0\u8F7D\u5931\u8D25\uFF0C\u4F7F\u7528\u53EF\u7528\u529F\u80FD"),!c&&o.uiModule?.initUI)try{await o.uiModule.initUI({services:o,autoInjectStyles:!1,targetDocument:s.document||document}),c=!0,p("UI \u88C5\u914D\u4E2D\u5FC3\u5DF2\u521D\u59CB\u5316")}catch(w){y("UI \u6A21\u5757\u521D\u59CB\u5316\u5931\u8D25:",w)}if(o.uiModule&&(h(),await x()),o.presetBootstrapModule?.ensurePresetSystem)try{let w=o.presetBootstrapModule.ensurePresetSystem();w?.aborted?p(`\u9884\u8BBE\u7CFB\u7EDF\u8FC1\u79FB\u5931\u8D25\u5DF2 abort\uFF0C\u8001\u5B57\u6BB5\u4FDD\u7559: ${w.error}`):w?.skipped?p(`\u9884\u8BBE\u7CFB\u7EDF\u5DF2\u5C31\u7EEA\uFF08${w.reason}\uFF09`):p(`\u9884\u8BBE\u7CFB\u7EDF\u8FC1\u79FB\u5B8C\u6210\uFF08${w.migratedCount}/${w.total} \u5DE5\u5177\uFF09`)}catch(w){y("\u9884\u8BBE\u7CFB\u7EDF\u521D\u59CB\u5316\u5F02\u5E38:",w)}if(o.toolAutomationServiceModule?.toolAutomationService){let w=o.toolAutomationServiceModule.toolAutomationService.init();p(w?"\u81EA\u52A8\u5316\u751F\u547D\u5468\u671F\u670D\u52A1\u5DF2\u521D\u59CB\u5316":"\u81EA\u52A8\u5316\u751F\u547D\u5468\u671F\u670D\u52A1\u521D\u59CB\u5316\u672A\u5B8C\u6210\uFF0C\u7B49\u5F85\u5BBF\u4E3B\u4E8B\u4EF6\u6E90\u91CD\u8BD5")}let C=s.document||document;C.readyState==="loading"?C.addEventListener("DOMContentLoaded",()=>{setTimeout(S,1e3)}):setTimeout(S,1e3),p("\u521D\u59CB\u5316\u5B8C\u6210")}return{loadModules:m,injectStyles:g,addMenuItem:S,init:T,log:p,logError:y}}Ze();tt();tt();H();var Do=E.createScope("PromptEditor"),O0="youyou_toolkit_prompt_editor",$0={system:"System Prompt (\u7CFB\u7EDF\u63D0\u793A\u8BCD)",ai:"AI Prompt (AI\u6307\u4EE4\u63D0\u793A\u8BCD)",user:"User Prompt (\u7528\u6237\u63D0\u793A\u8BCD)"},B0={system:"fa-server",ai:"fa-robot",user:"fa-user"},Un=[{id:"system_1",type:"system",role:"SYSTEM",mainSlot:"",content:"",deletable:!1,expanded:!0},{id:"ai_1",type:"ai",role:"USER",mainSlot:"A",content:"",deletable:!1,expanded:!0,isMain:!0},{id:"user_1",type:"user",role:"USER",mainSlot:"B",content:"",deletable:!1,expanded:!0,isMain2:!0}],Ci=class{constructor(e={}){this.containerId=e.containerId||O0,this.segments=e.segments||[...Un],this.onChange=e.onChange||null,this.editable=e.editable!==!1,this.showMainSlot=e.showMainSlot!==!1,this.$container=null,this.$=null}init(e){if(this.$=window.jQuery||window.parent?.jQuery,!this.$){Do.error("jQuery not available");return}this.$container=e,this.render(),this.bindEvents()}setSegments(e){this.segments=e&&Array.isArray(e)?[...e]:[...Un],this.$container&&(this.render(),this.bindEvents())}getSegments(){return this.segments.map(e=>({...e,content:this.getSegmentContent(e.id)}))}getSegmentContent(e){return this.$container&&this.$container.find(`[data-segment-id="${e}"] .yyt-prompt-textarea`).val()||""}render(){if(!this.$container)return;let e=`
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
    `;this.$container.html(e)}renderSegment(e){let r=$0[e.type]||e.type,s=B0[e.type]||"fa-file",o=e.mainSlot==="A"||e.isMain,n=e.mainSlot==="B"||e.isMain2,a=o?"var(--yyt-accent, #7bb7ff)":n?"#ffb74d":"",i=this.showMainSlot&&e.mainSlot?`<span class="yyt-prompt-slot-badge">mainSlot: ${e.mainSlot}</span>`:"",l=`<span class="yyt-prompt-role-badge">role: ${e.role||"USER"}</span>`;return`
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
    `}bindEvents(){this.$container&&(gt(this.$container,"yytPromptEditorSelect"),this.$container.off(".yytPromptEditor"),this.$container.on("click.yytPromptEditor",".yyt-prompt-toggle",e=>{this.$(e.currentTarget).closest(".yyt-prompt-segment").toggleClass("yyt-expanded"),this.$(e.currentTarget).find("i").toggleClass("fa-chevron-up fa-chevron-down")}),this.$container.on("click.yytPromptEditor",".yyt-prompt-delete",e=>{let r=this.$(e.currentTarget).closest(".yyt-prompt-segment").data("segment-id");this.deleteSegment(r)}),this.$container.on("change.yytPromptEditor",".yyt-prompt-role",e=>{let r=this.$(e.currentTarget).closest(".yyt-prompt-segment").data("segment-id"),s=this.$(e.currentTarget).val();this.updateSegmentMeta(r,{role:s})}),this.$container.on("change.yytPromptEditor",".yyt-prompt-main-slot",e=>{let r=this.$(e.currentTarget).closest(".yyt-prompt-segment").data("segment-id"),s=this.$(e.currentTarget).val();this.updateSegmentMeta(r,{mainSlot:s})}),this.$container.on("input.yytPromptEditor",".yyt-prompt-textarea",e=>{this.onChange&&this.onChange(this.getSegments())}),this.$container.on("click.yytPromptEditor",`#${this.containerId}-add-segment`,()=>{this.addSegment()}),this.$container.on("click.yytPromptEditor",`#${this.containerId}-import-prompt`,()=>{this.importPrompt()}),this.$container.on("click.yytPromptEditor",`#${this.containerId}-export-prompt`,()=>{this.exportPrompt()}),zt(this.$container,{namespace:"yytPromptEditorSelect",selectors:[".yyt-prompt-role",".yyt-prompt-main-slot"]}))}addSegment(e=null){let r=`segment_${Date.now()}`,s=e||{id:r,type:"user",role:"USER",mainSlot:"",content:"",deletable:!0,expanded:!0};s.id||(s.id=r),this.segments.push(s),this.render(),this.bindEvents(),this.onChange&&this.onChange(this.getSegments())}deleteSegment(e){let r=this.segments.findIndex(o=>o.id===e);if(r===-1)return;if(this.segments[r].deletable===!1){Do.warn("\u8BE5\u6BB5\u843D\u4E0D\u53EF\u5220\u9664");return}this.segments.splice(r,1),this.render(),this.bindEvents(),this.onChange&&this.onChange(this.getSegments())}updateSegmentMeta(e,r){let s=this.segments.find(o=>o.id===e);s&&(Object.assign(s,r),this.onChange&&this.onChange(this.getSegments()))}importPrompt(){let e=document.createElement("input");e.type="file",e.accept=".json",e.onchange=r=>{let s=r.target.files[0];if(!s)return;let o=new FileReader;o.onload=n=>{try{let a=JSON.parse(n.target.result);Array.isArray(a)?(this.setSegments(a),Do.log("\u63D0\u793A\u8BCD\u5BFC\u5165\u6210\u529F")):Do.error("\u65E0\u6548\u7684\u63D0\u793A\u8BCD\u683C\u5F0F")}catch(a){Do.error("\u5BFC\u5165\u5931\u8D25:",a)}},o.readAsText(s)},e.click()}exportPrompt(){let e=this.getSegments(),r=JSON.stringify(e,null,2),s=new Blob([r],{type:"application/json"}),o=URL.createObjectURL(s),n=document.createElement("a");n.href=o,n.download=`prompt_group_${Date.now()}.json`,n.click(),URL.revokeObjectURL(o),Do.log("\u63D0\u793A\u8BCD\u5DF2\u5BFC\u51FA")}destroy(){this.$container&&(gt(this.$container,"yytPromptEditorSelect"),this.$container.off(".yytPromptEditor"))}escapeHtml(e){return typeof e!="string"?"":e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}};function ah(){return`
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
  `}function ih(t){return t.filter(e=>e.content&&e.content.trim()).map(e=>({role:e.role,content:e.content,deletable:e.deletable,mainSlot:e.mainSlot}))}function lh(t){return Array.isArray(t)?t.map((e,r)=>({id:`segment_${r}_${Date.now()}`,type:e.role==="SYSTEM"?"system":e.role==="assistant"?"ai":"user",role:e.role,mainSlot:e.mainSlot||"",content:e.content||"",deletable:e.deletable!==!1,expanded:!0,isMain:e.mainSlot==="A"||e.isMain,isMain2:e.mainSlot==="B"||e.isMain2})):[...Un]}H();function ch(t){let{constants:e,topLevelWindow:r,modules:s,caches:o,uiState:n}=t,{SCRIPT_ID:a,SCRIPT_VERSION:i,POPUP_ID:l}=e,d=E.createScope("PopupShell"),c={cleanup:null},u={cleanups:[]},p={cleanups:[]},y={current:null};function m(){return!!n.sidebarCollapsed}function g(){n.sidebarCollapsed=!n.sidebarCollapsed;let b=n.currentPopup;if(!b)return;let v=b.querySelector(".yyt-shell-sidebar"),I=b.querySelector(".yyt-shell-workspace"),N=b.querySelector(".yyt-sidebar-toggle i");v&&v.classList.toggle("yyt-collapsed",n.sidebarCollapsed),I&&I.classList.toggle("yyt-sidebar-collapsed",n.sidebarCollapsed),N&&(N.className=n.sidebarCollapsed?"fa-solid fa-angles-right":"fa-solid fa-angles-left"),Je()}function h(...b){d.log(b.join(" "))}function x(...b){d.error(b.join(" "))}function S(b){return typeof b!="string"?"":b.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function T(){return r.jQuery||window.jQuery}function A(){return r.document||document}function C(b){if(!b)return"\u672A\u9009\u62E9\u9875\u9762";let v=s.toolRegistryModule?.getToolConfig(b);if(!v)return b;if(!v.hasSubTabs)return v.name||b;let I=P(b),N=v.subTabs?.find(K=>K.id===I);return N?.name?`${v.name} / ${N.name}`:v.name||b}function w(b){if(!b)return"\u8BF7\u9009\u62E9\u5DE6\u4FA7\u5BFC\u822A\u4E2D\u7684\u9875\u9762\u8FDB\u884C\u914D\u7F6E\u6216\u6392\u67E5\u3002";let v=s.toolRegistryModule?.getToolConfig(b);if(!v)return"\u5F53\u524D\u9875\u9762\u63CF\u8FF0\u6682\u4E0D\u53EF\u7528\u3002";if(!v.hasSubTabs)return v.description||"\u5728\u8FD9\u91CC\u7BA1\u7406\u5F53\u524D\u9875\u9762\u7684\u914D\u7F6E\u548C\u64CD\u4F5C\u3002";let I=P(b);return v.subTabs?.find(K=>K.id===I)?.description||v.description||"\u5728\u8FD9\u91CC\u7BA1\u7406\u5F53\u524D\u5DE5\u5177\u7684\u6A21\u677F\u3001\u914D\u7F6E\u4E0E\u8C03\u8BD5\u80FD\u529B\u3002"}function P(b,v=""){let I=s.toolRegistryModule?.getToolConfig(b);if(!I?.hasSubTabs||!Array.isArray(I.subTabs)||I.subTabs.length===0)return"";let N=String(v||n.currentSubTab[b]||"").trim(),F=N&&I.subTabs.some(oe=>oe?.id===N)?N:I.subTabs[0]?.id||"";return F&&n.currentSubTab[b]!==F&&(n.currentSubTab[b]=F),F}function B(){let b=n.currentPopup;if(!b)return;let v=C(n.currentMainTab),I=w(n.currentMainTab),N=b.querySelector(".yyt-popup-active-label");N&&(N.textContent=`\u5F53\u524D\uFF1A${v}`);let K=b.querySelector(".yyt-shell-breadcrumb");K&&(K.textContent=v);let F=b.querySelector(".yyt-shell-main-title");F&&(F.textContent=v);let oe=b.querySelector(".yyt-shell-main-description");oe&&(oe.textContent=I)}function z(){typeof c.cleanup=="function"&&(c.cleanup(),c.cleanup=null)}function R(){Array.isArray(u.cleanups)&&(u.cleanups.forEach(b=>{typeof b=="function"&&b()}),u.cleanups=[])}function _(){Array.isArray(p.cleanups)&&(p.cleanups.forEach(b=>{typeof b=="function"&&b()}),p.cleanups=[])}function M(b,v){if(!b||!v)return!1;let I=b.jquery?b[0]:b,N=v.jquery?v[0]:v;return!!(I&&N&&I===N)}function j(b={}){let{container:v=null}=b,I=y.current;if(I&&!(v&&!M(I.container,v))){try{typeof I.destroy=="function"&&I.destroy(I.container)}catch(N){x("\u9500\u6BC1\u52A8\u6001\u9762\u677F host \u5931\u8D25",N)}s.uiModule?.uiManager?.destroyContainerInstance&&s.uiModule.uiManager.destroyContainerInstance(I.container),y.current=null}}function q(b,v={}){y.current={key:v.key||"",container:b,destroy:typeof v.destroy=="function"?v.destroy:null}}function ue(){let b=T();if(!b||!n.currentPopup)return;let v=s.toolRegistryModule?.getToolList()||[],I=b(n.currentPopup).find(".yyt-main-nav");if(!I.length)return;let N=v.map(F=>`
      <div class="yyt-main-nav-item ${F.id===n.currentMainTab?"active":""}" data-tab="${F.id}">
        <div class="yyt-main-nav-icon">
          <i class="fa-solid ${S(F.icon||"fa-file")}"></i>
        </div>
        <div class="yyt-main-nav-copy">
          <span class="yyt-main-nav-name">${S(F.name||F.id)}</span>
          <span class="yyt-main-nav-desc">${S(F.description||"\u8FDB\u5165\u6B64\u9875\u9762\u8FDB\u884C\u914D\u7F6E\u3001\u67E5\u770B\u6216\u7EF4\u62A4\u3002")}</span>
        </div>
      </div>
    `).join("");I.html(N),b(n.currentPopup).find(".yyt-main-nav-item").on("click",function(){let oe=b(this).data("tab");oe&&as(oe)});let K=b(n.currentPopup).find(".yyt-shell-sidebar-hint");K.length&&K.text(`${v.length} tabs`)}function pe(){let b=T();if(!b||!n.currentPopup)return;let v=s.toolRegistryModule?.getToolList()||[],I=s.toolRegistryModule?.getToolConfig("tools"),N=Array.isArray(I?.subTabs)?I.subTabs:[],K=N.filter(ne=>ne?.isCustom).length,F=N.filter(ne=>!ne?.isCustom).length,Q=b(n.currentPopup).find(".yyt-shell-sidebar-stats");Q.length&&(Q.find(".yyt-shell-sidebar-stat").eq(0).find(".yyt-shell-sidebar-stat-value").text(String(v.length)),Q.find(".yyt-shell-sidebar-stat").eq(1).find(".yyt-shell-sidebar-stat-value").text(String(F)),Q.find(".yyt-shell-sidebar-stat").eq(2).find(".yyt-shell-sidebar-stat-value").text(String(K)))}function re(){let b=s.toolRegistryModule?.getToolList()||[];return b.length?(b.some(v=>v.id===n.currentMainTab)||(n.currentMainTab=b[0].id),n.currentMainTab):null}async function Te(b={}){let{rebuildNavigation:v=!1,reRenderSubNav:I=!1}=b,N=T();if(!N||!n.currentPopup)return;j();let K=re();if(!K)return;v&&(ue(),pe());let F=s.toolRegistryModule?.getToolConfig(K),oe=!!F?.hasSubTabs,Q=N(n.currentPopup).find(".yyt-sub-nav"),ne=N(n.currentPopup).find(".yyt-content-inner");if(v&&ne.length){let De=new Set(ne.find(".yyt-tab-content").map((me,it)=>N(it).data("tab")).get());(s.toolRegistryModule?.getToolList()||[]).forEach(me=>{De.has(me.id)||ne.append(`<div class="yyt-tab-content" data-tab="${S(me.id)}"></div>`)}),ne.find(".yyt-tab-content").each((me,it)=>{let $t=N(it).data("tab");(s.toolRegistryModule?.getToolList()||[]).some(Qt=>Qt.id===$t)||N(it).remove()})}N(n.currentPopup).find(".yyt-main-nav-item").removeClass("active"),N(n.currentPopup).find(`.yyt-main-nav-item[data-tab="${K}"]`).addClass("active"),N(n.currentPopup).find(".yyt-tab-content").removeClass("active"),N(n.currentPopup).find(`.yyt-tab-content[data-tab="${K}"]`).addClass("active"),oe?(Q.show(),(I||v)&&Ws(K,F.subTabs)):Q.hide(),await Ir(K),B(),Je()}function Ue(){if(!n.currentPopup)return;R();let b=()=>{if(n.currentMainTab==="presetManagement"){Te();return}n.currentMainTab==="tools"&&Te({reRenderSubNav:!0})},v=()=>{n.currentMainTab==="tools"?Te({rebuildNavigation:!0,reRenderSubNav:!0}):pe()},I=()=>{n.currentMainTab==="tools"&&Te({rebuildNavigation:!1,reRenderSubNav:!1})},N=()=>{(n.currentMainTab==="bypass"||n.currentMainTab==="tools")&&Te({reRenderSubNav:n.currentMainTab==="tools"})};[U.PRESET_CREATED,U.PRESET_UPDATED,U.PRESET_DELETED].forEach(K=>{u.cleanups.push(W.on(K,b))}),[U.TOOL_REGISTERED,U.TOOL_UPDATED,U.TOOL_UNREGISTERED].forEach(K=>{u.cleanups.push(W.on(K,v))}),u.cleanups.push(W.on(U.TOOL_RUNTIME_UPDATED,I)),[U.BYPASS_PRESET_CREATED,U.BYPASS_PRESET_UPDATED,U.BYPASS_PRESET_DELETED].forEach(K=>{u.cleanups.push(W.on(K,N))})}function Y(b){return!!b?.closest?.(["input","textarea","select","button","a","label","summary","details",'[contenteditable="true"]',".yyt-dialog",".yyt-select-dropdown",".yyt-select-portal-layer"].join(","))}function Fe(b){let v=b?.closest?.(["textarea",".yyt-preview-pre",".yyt-select-dropdown",".yyt-select-portal-layer",".yyt-dialog-body",".yyt-worldbook-list",".yyt-tool-panel",".yyt-panel-section"].join(","));return v?v.scrollHeight>v.clientHeight+2||v.scrollWidth>v.clientWidth+2:!1}function xe(b,v){return v?.closest?.(".yyt-scrollable-surface")===b}function Ne(b,v){if(!b||!v)return null;let I=v.closest?.([".yyt-worldbook-list",".yyt-select-dropdown",".yyt-select-portal-layer",".yyt-dialog-body",".yyt-preview-pre",".yyt-tool-panel",".yyt-panel-section"].join(","));return I&&(I.classList?.contains("yyt-select-portal-layer")||b.contains(I))&&(I.scrollHeight>I.clientHeight+2||I.scrollWidth>I.clientWidth+2)?I:[v.closest?.(".yyt-tool-list"),v.closest?.(".yyt-settings-content"),v.closest?.(".yyt-sub-content"),v.closest?.(".yyt-tab-content.active"),b].filter(Boolean).find(K=>K!==b&&!b.contains(K)?!1:K.scrollHeight>K.clientHeight+2||K.scrollWidth>K.clientWidth+2)||b}function Ge({mainTab:b=null,includeSubContent:v=!1}={}){let I=n.currentPopup;if(!I)return;let N=I.querySelector(".yyt-content");N&&(N.scrollTop=0,N.scrollLeft=0);let K=b?`.yyt-tab-content[data-tab="${b}"]`:".yyt-tab-content.active",F=I.querySelector(K);if(F&&(F.scrollTop=0,F.scrollLeft=0),!v)return;(F?.querySelectorAll(".yyt-sub-content")||[]).forEach(Q=>{Q.scrollTop=0,Q.scrollLeft=0})}function ns(b){let v=A();if(!b||!v)return;b.classList.add("yyt-scrollable-surface");let I=!1,N=!1,K=0,F=0,oe=0,Q=0,ne=!1,De=!1,me=()=>{I=!1,N=!1,b.classList.remove("yyt-scroll-dragging")},it=J=>{J.button===0&&(Y(J.target)||xe(b,J.target)&&(ne=b.scrollWidth>b.clientWidth+2,De=b.scrollHeight>b.clientHeight+2,!(!ne&&!De)&&(J.stopPropagation(),I=!0,N=!1,K=J.clientX,F=J.clientY,oe=b.scrollLeft,Q=b.scrollTop)))},$t=J=>{if(!I)return;let ft=J.clientX-K,et=J.clientY-F;!(Math.abs(ft)>4||Math.abs(et)>4)&&!N||(N=!0,b.classList.add("yyt-scroll-dragging"),ne&&(b.scrollLeft=oe-ft),De&&(b.scrollTop=Q-et),J.preventDefault())},Qt=()=>{me()},Rr=J=>{if(J.ctrlKey||Fe(J.target)||!b.classList.contains("yyt-content")&&!xe(b,J.target))return;let et=Ne(b,J.target);!et||et!==b&&!b.contains(et)||!(et.scrollHeight>et.clientHeight+2||et.scrollWidth>et.clientWidth+2)||(Math.abs(J.deltaY)>0&&(et.scrollTop+=J.deltaY),Math.abs(J.deltaX)>0&&(et.scrollLeft+=J.deltaX),J.preventDefault(),J.stopPropagation())},lt=J=>{N&&J.preventDefault()};b.addEventListener("mousedown",it),b.addEventListener("wheel",Rr,{passive:!1}),b.addEventListener("dragstart",lt),v.addEventListener("mousemove",$t),v.addEventListener("mouseup",Qt),p.cleanups.push(()=>{me(),b.classList.remove("yyt-scrollable-surface"),b.removeEventListener("mousedown",it),b.removeEventListener("wheel",Rr),b.removeEventListener("dragstart",lt),v.removeEventListener("mousemove",$t),v.removeEventListener("mouseup",Qt)})}function Je(){let b=n.currentPopup;if(!b)return;_();let v=[...b.querySelectorAll(".yyt-shell-sidebar .yyt-main-nav"),...b.querySelectorAll(".yyt-sub-nav"),...b.querySelectorAll(".yyt-content"),...b.querySelectorAll(".yyt-settings-content"),...b.querySelectorAll(".yyt-tool-list")];[...new Set(v)].forEach(ns)}function js(b){return`
      <div class="yyt-startup-screen" data-yyt-startup-screen>
        <div class="yyt-startup-screen-inner">
          <div class="yyt-startup-screen-kicker">Welcome</div>
          <div class="yyt-startup-screen-title">YouYou \u5DE5\u5177\u7BB1</div>
          <div class="yyt-startup-screen-desc">\u96C6\u4E2D\u7BA1\u7406 API \u9884\u8BBE\u3001\u81EA\u5B9A\u4E49\u5DE5\u5177\u3001\u63D0\u53D6\u89C4\u5219\u3001Ai\u6307\u4EE4\u9884\u8BBE\u4E0E\u8BCA\u65AD\u6D41\u7A0B\u3002\u6BCF\u6B21\u5237\u65B0\u540E\u90FD\u4F1A\u91CD\u65B0\u663E\u793A\uFF0C\u4FBF\u4E8E\u5FEB\u901F\u56DE\u5230\u4ECB\u7ECD\u5165\u53E3\u3002</div>
          <div class="yyt-startup-screen-modules">
            ${(b||[]).slice(0,6).map(I=>`
      <div class="yyt-startup-module-chip">
        <i class="fa-solid ${S(I.icon||"fa-file")}"></i>
        <span>${S(I.name||I.id)}</span>
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
    `}function Lo(b){let v=T();if(!v||!n.currentPopup||n.startupScreenDismissed)return;let I=v(n.currentPopup).find(".yyt-popup-body"),N=I.find(".yyt-popup-shell");!I.length||!N.length||I.find("[data-yyt-startup-screen]").length||(N.attr("data-yyt-startup-visible","true"),I.prepend(js(b)),I.find(".yyt-startup-enter").on("click",()=>{I.find("[data-yyt-startup-screen]").remove(),N.removeAttr("data-yyt-startup-visible"),n.startupScreenDismissed=!0,Je()}))}function Oo(){let b=A(),v=n.currentPopup,I=v?.querySelector(".yyt-popup-header");if(!v||!I||!b)return;let N=!1,K=0,F=0,oe=0,Q=0,ne="",De=()=>({width:r.innerWidth||b.documentElement?.clientWidth||window.innerWidth||0,height:r.innerHeight||b.documentElement?.clientHeight||window.innerHeight||0}),me=(lt,J,ft)=>Math.min(Math.max(lt,J),ft),it=()=>{N&&(N=!1,v.classList.remove("yyt-popup-dragging"),b.body.style.userSelect=ne)},$t=lt=>{if(!N||!n.currentPopup)return;let J=lt.clientX-K,ft=lt.clientY-F,{width:et,height:Ri}=De(),vh=v.offsetWidth||0,Th=v.offsetHeight||0,Sh=Math.max(0,et-vh),_h=Math.max(0,Ri-Th);v.style.left=`${me(oe+J,0,Sh)}px`,v.style.top=`${me(Q+ft,0,_h)}px`,v.style.transform="none",v.style.right="auto",v.style.bottom="auto"},Qt=()=>{it()},Rr=lt=>{if(lt.button!==0||lt.target?.closest(".yyt-popup-close"))return;N=!0,K=lt.clientX,F=lt.clientY;let J=v.getBoundingClientRect();oe=J.left,Q=J.top,v.style.left=`${J.left}px`,v.style.top=`${J.top}px`,v.style.transform="none",v.style.right="auto",v.style.bottom="auto",v.classList.add("yyt-popup-dragging"),ne=b.body.style.userSelect||"",b.body.style.userSelect="none",lt.preventDefault()};I.addEventListener("mousedown",Rr),b.addEventListener("mousemove",$t),b.addEventListener("mouseup",Qt),c.cleanup=()=>{it(),I.removeEventListener("mousedown",Rr),b.removeEventListener("mousemove",$t),b.removeEventListener("mouseup",Qt)}}function Gt(){j(),z(),R(),_();let b=T();if(b&&n.currentPopup){let v=b(n.currentPopup);gt(v,"yytPopupToolConfigSelect"),gt(v,"yytPromptEditorSelect")}n.currentPopup&&(n.currentPopup.remove(),n.currentPopup=null),n.currentOverlay&&(n.currentOverlay.remove(),n.currentOverlay=null),h("\u5F39\u7A97\u5DF2\u5173\u95ED")}function as(b){j(),n.currentMainTab=b;let v=T();if(!v||!n.currentPopup)return;Ge({mainTab:b,includeSubContent:!0}),v(n.currentPopup).find(".yyt-main-nav-item").removeClass("active"),v(n.currentPopup).find(`.yyt-main-nav-item[data-tab="${b}"]`).addClass("active");let I=s.toolRegistryModule?.getToolConfig(b);I?.hasSubTabs?(v(n.currentPopup).find(".yyt-sub-nav").show(),Ws(b,I.subTabs)):v(n.currentPopup).find(".yyt-sub-nav").hide(),v(n.currentPopup).find(".yyt-tab-content").removeClass("active"),v(n.currentPopup).find(`.yyt-tab-content[data-tab="${b}"]`).addClass("active"),Ir(b),B(),Je()}function is(b,v){j(),n.currentSubTab[b]=v;let I=T();!I||!n.currentPopup||(Ge({mainTab:b,includeSubContent:!0}),I(n.currentPopup).find(".yyt-sub-nav-item").removeClass("active"),I(n.currentPopup).find(`.yyt-sub-nav-item[data-subtab="${v}"]`).addClass("active"),ls(b,v),B(),Je())}function Ws(b,v){let I=T();if(!I||!n.currentPopup||!v)return;let N=P(b,n.currentSubTab[b]||v[0]?.id),F=(b==="tools"?[{key:"ai",title:"AI \u5DE5\u5177",items:v.filter(Q=>!Q?.isCustom&&(Q?.toolKind||"ai")!=="script")},{key:"script",title:"\u811A\u672C\u5DE5\u5177",items:v.filter(Q=>!Q?.isCustom&&Q?.toolKind==="script")},{key:"custom",title:"\u81EA\u5B9A\u4E49\u5DE5\u5177",items:v.filter(Q=>Q?.isCustom===!0)}].filter(Q=>Q.items.length>0):[{key:"default",title:"",items:v}]).map(Q=>{let ne=Q.title?`<div class="yyt-sub-nav-group-title">${S(Q.title)}</div>`:"",De=Q.items.map(me=>{let it=me?.isCustom===!0,$t=b==="tools"&&it?`<div class="yyt-sub-nav-item-actions">
               <button type="button" class="yyt-sub-nav-item-action" data-action="edit" data-subtab="${me.id}" title="\u7F16\u8F91"><i class="fa-solid fa-pen"></i></button>
               <button type="button" class="yyt-sub-nav-item-action" data-action="delete" data-subtab="${me.id}" title="\u5220\u9664"><i class="fa-solid fa-trash"></i></button>
             </div>`:"";return`
        <div class="yyt-sub-nav-item ${me.id===N?"active":""}" data-subtab="${me.id}" data-tool-name="${S((me.name||me.id).toLowerCase())}">
          <i class="fa-solid ${me.icon||"fa-file"}"></i>
          <span class="yyt-sub-nav-item-label">${S(me.name||me.id)}</span>
          ${$t}
        </div>
      `}).join("");return`
        <div class="yyt-sub-nav-group yyt-sub-nav-group-${Q.key}">
          ${ne}
          <div class="yyt-sub-nav-group-items">
            ${De}
          </div>
        </div>
      `}).join(""),oe=b==="tools"?`<div class="yyt-sub-nav-toolbar">
           <button type="button" class="yyt-sub-nav-toolbar-btn" data-tool-action="add" title="\u65B0\u5EFA\u81EA\u5B9A\u4E49\u5DE5\u5177"><i class="fa-solid fa-plus"></i><span>\u65B0\u5EFA</span></button>
           <button type="button" class="yyt-sub-nav-toolbar-btn" data-tool-action="import" title="\u4ECE JSON \u5BFC\u5165\u5DE5\u5177"><i class="fa-solid fa-file-import"></i></button>
           <button type="button" class="yyt-sub-nav-toolbar-btn" data-tool-action="export" title="\u5BFC\u51FA\u5DE5\u5177 JSON"><i class="fa-solid fa-file-export"></i></button>
         </div>
         <div class="yyt-sub-nav-filter-wrap">
           <input type="text" class="yyt-sub-nav-filter" placeholder="\u7B5B\u9009\u5DE5\u5177\u2026" autocomplete="off">
         </div>`:"";I(n.currentPopup).find(".yyt-sub-nav").html(oe+F),I(n.currentPopup).find(".yyt-sub-nav-item").on("click",function(ne){if(ne.target.closest&&ne.target.closest(".yyt-sub-nav-item-action"))return;let De=I(this).data("subtab");is(b,De)}),b==="tools"&&$o(b),Je()}function jn(b){if(!n.currentPopup)return;let v=T();if(!v)return;let I=String(b||"").trim().toLowerCase();v(n.currentPopup).find(".yyt-sub-nav-item").each(function(){let K=String(v(this).data("tool-name")||"");v(this).toggle(!I||K.includes(I))}),v(n.currentPopup).find(".yyt-sub-nav-group").each(function(){let K=v(this).find(".yyt-sub-nav-item:visible").length>0;v(this).toggle(K)})}function $o(b){let v=T();if(!v||!n.currentPopup)return;let I=v(n.currentPopup).find(".yyt-sub-nav");I.find(".yyt-sub-nav-filter").off("input.yytFilter").on("input.yytFilter",function(){jn(this.value)}),I.find(".yyt-sub-nav-toolbar-btn").off("click.yytToolAction").on("click.yytToolAction",async function(N){N.preventDefault(),N.stopPropagation();let K=v(this).data("tool-action");try{let F=await Promise.resolve().then(()=>(Ld(),Dd));if(K==="add"){let oe=await F.showToolEditDialog(null);oe&&(n.currentSubTab[b]=oe,is(b,oe))}else K==="import"?await F.showImportToolsDialog():K==="export"&&F.showExportToolsDialog()}catch(F){x("\u5DE5\u5177\u64CD\u4F5C\u5931\u8D25",F)}}),I.find(".yyt-sub-nav-item-action").off("click.yytItemAction").on("click.yytItemAction",async function(N){N.preventDefault(),N.stopPropagation();let K=v(this).data("action"),F=String(v(this).data("subtab")||"");if(F)try{let oe=await Promise.resolve().then(()=>(Ld(),Dd));K==="edit"?await oe.showToolEditDialog(F):K==="delete"&&await oe.confirmDeleteTool(F)&&n.currentSubTab[b]===F&&(n.currentSubTab[b]="")}catch(oe){x("\u5DE5\u5177\u884C\u5185\u64CD\u4F5C\u5931\u8D25",oe)}})}async function Ir(b){let v=T();if(!v||!n.currentPopup)return;let I=v(n.currentPopup).find(`.yyt-tab-content[data-tab="${b}"]`);if(!I.length)return;if(s.toolRegistryModule?.getToolConfig(b)?.hasSubTabs){let F=P(b);F?await ls(b,F):I.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5B50 tab \u914D\u7F6E\u52A0\u8F7D\u5931\u8D25</span></div>'),Je();return}await s.uiModule?.renderMainTab?.(b,I)||cs(b,I),Je()}async function ls(b,v){let I=T();if(!I||!n.currentPopup)return;let N=I(n.currentPopup).find(`.yyt-tab-content[data-tab="${b}"]`);if(!N.length)return;let K=s.toolRegistryModule?.getToolConfig(b);if(K?.hasSubTabs){let oe=P(b,v),Q=K.subTabs?.find(it=>it.id===oe),ne=N.find(".yyt-sub-content");if(ne.length||(N.html('<div class="yyt-sub-content"></div>'),ne=N.find(".yyt-sub-content")),!Q){ne.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5F53\u524D\u5B50\u9875\u9762\u4E0D\u5B58\u5728\u6216\u5DF2\u5931\u6548</span></div>'),Ge({mainTab:b,includeSubContent:!0}),Je();return}let De=Q.component;if(De==="GenericToolConfigPanel"){await Wn(Q,ne),Ge({mainTab:b,includeSubContent:!0}),Je();return}j({container:ne});let me=await s.uiModule?.renderSubTabComponent?.(De,ne);me?q(ne,{key:me}):ne.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-tools"></i><span>\u529F\u80FD\u5F00\u53D1\u4E2D...</span></div>'),Ge({mainTab:b,includeSubContent:!0}),Je();return}let F=N.find(".yyt-sub-content");if(F.length){switch(j({container:F}),v){case"config":ph(b,F);break;case"prompts":await yh(b,F);break;case"presets":fh(b,F);break;default:F.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-tools"></i><span>\u529F\u80FD\u5F00\u53D1\u4E2D...</span></div>')}Ge({mainTab:b,includeSubContent:!0}),Je()}}async function Wn(b,v){if(!(!T()||!v?.length||!b?.id)){j({container:v});try{let N=o.dynamicToolPanelCache.get(b.id);if(!N){let oe=(await Promise.resolve().then(()=>(Io(),Lf)))?.createToolConfigPanel;if(typeof oe!="function")throw new Error("\u901A\u7528\u5DE5\u5177\u9762\u677F\u5DE5\u5382\u4E0D\u53EF\u7528");N=()=>oe({id:`${b.id}Panel`,toolId:b.id,postResponseHint:`\u70B9\u51FB\u201C\u7ACB\u5373\u6267\u884C\u4E00\u6B21\u201D\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u6267\u884C\u201C${b.name||b.id}\u201D\u3002`,extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 custom_tag
\u6216 regex:<custom_tag>([\\s\\S]*?)</custom_tag>`,previewDialogId:`${b.id}-extraction-preview`,previewTitle:`${b.name||b.id} \u63D0\u53D6\u9884\u89C8`}),o.dynamicToolPanelCache.set(b.id,N)}let K=N();K.renderTo(v),q(v,{key:b.id,destroy:typeof K?.destroy=="function"?F=>K.destroy(F):null}),Je()}catch(N){y.current=null,x("\u81EA\u5B9A\u4E49\u5DE5\u5177\u9762\u677F\u52A0\u8F7D\u5931\u8D25:",N),v.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u81EA\u5B9A\u4E49\u5DE5\u5177\u9762\u677F\u52A0\u8F7D\u5931\u8D25</span></div>')}}}function cs(b,v){if(!T())return;let N=s.toolRegistryModule?.getToolConfig(b);if(!N){v.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5DE5\u5177\u914D\u7F6E\u4E0D\u5B58\u5728</span></div>');return}let K=n.currentSubTab[b]||N.subTabs?.[0]?.id||"config";v.html(`
      <div class="yyt-tool-window">
        <div class="yyt-sub-content" data-subtab="${K}">
          <!-- \u5B50\u5185\u5BB9\u5C06\u5728\u6B64\u6E32\u67D3 -->
        </div>
      </div>
    `),ls(b,K)}function ph(b,v){if(!T())return;let N=s.toolManagerModule?.getTool(b),K=s.presetManagerModule?.getAllPresets()||[],F=s.toolRegistryModule?.getToolApiPreset(b)||"",oe=K.map(Q=>`<option value="${S(Q.name)}" ${Q.name===F?"selected":""}>${S(Q.name)}</option>`).join("");v.html(`
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
              ${oe}
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
              <input type="number" class="yyt-input" id="yyt-tool-timeout" value="${N?.config?.execution?.timeout||6e4}">
            </div>
            <div class="yyt-form-group yyt-flex-1">
              <label>\u91CD\u8BD5\u6B21\u6570</label>
              <input type="number" class="yyt-input" id="yyt-tool-retries" value="${N?.config?.execution?.retries||3}">
            </div>
          </div>
        </div>
      </div>
    `),zt(v,{namespace:"yytPopupToolConfigSelect",selectors:["#yyt-tool-api-preset"]}),v.find("#yyt-save-tool-preset").on("click",function(){let ne=v.find("#yyt-tool-api-preset").val();s.toolRegistryModule?.setToolApiPreset(b,ne),d.info("API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u4FDD\u5B58",null,{toast:"success"})})}async function yh(b,v){if(!T()){v.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u63D0\u793A\u8BCD\u7F16\u8F91\u5668\u6A21\u5757\u672A\u52A0\u8F7D</span></div>');return}let K=s.toolManagerModule?.getTool(b)?.config?.messages||[],F=lh(K)||Un,oe=new Ci({containerId:`yyt-prompt-editor-${b}`,segments:F,onChange:ne=>{let De=ih(ne);h("\u63D0\u793A\u8BCD\u5DF2\u66F4\u65B0:",De.length,"\u6761\u6D88\u606F")}});v.html(`<div id="yyt-prompt-editor-${b}" class="yyt-prompt-editor-container"></div>`),oe.init(v.find(`#yyt-prompt-editor-${b}`));let Q=ah();if(Q){let ne="yyt-prompt-editor-styles",De=r.document||document;if(!De.getElementById(ne)){let me=De.createElement("style");me.id=ne,me.textContent=Q,(De.head||De.documentElement).appendChild(me)}}}function fh(b,v){T()&&v.html(`
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
      </div>`}function mh(b,v,I){let N=m(),K=b.map(F=>`
      <div class="yyt-main-nav-item ${F.id===n.currentMainTab?"active":""}" data-tab="${F.id}">
        <div class="yyt-main-nav-icon">
          <i class="fa-solid ${S(F.icon||"fa-file")}"></i>
        </div>
        <div class="yyt-main-nav-copy">
          <span class="yyt-main-nav-name">${S(F.name||F.id)}</span>
          <span class="yyt-main-nav-desc">${S(F.description||"\u8FDB\u5165\u6B64\u9875\u9762\u8FDB\u884C\u914D\u7F6E\u3001\u67E5\u770B\u6216\u7EF4\u62A4\u3002")}</span>
        </div>
      </div>
    `).join("");return`
      <aside class="yyt-shell-sidebar${N?" yyt-collapsed":""}">
        <div class="yyt-shell-sidebar-card">
          <div class="yyt-shell-sidebar-title-row">
            <span class="yyt-shell-sidebar-title">\u9875\u9762\u5BFC\u822A</span>
            <span class="yyt-shell-sidebar-hint">${b.length} tabs</span>
            <button class="yyt-sidebar-toggle" title="${N?"\u5C55\u5F00\u4FA7\u680F":"\u6298\u53E0\u4FA7\u680F"}">
              <i class="fa-solid ${N?"fa-angles-right":"fa-angles-left"}"></i>
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
              <span class="yyt-shell-sidebar-stat-value">${v}</span>
              <span class="yyt-shell-sidebar-stat-label">\u9ED8\u8BA4\u5DE5\u5177</span>
            </div>
            <div class="yyt-shell-sidebar-stat">
              <span class="yyt-shell-sidebar-stat-value">${I}</span>
              <span class="yyt-shell-sidebar-stat-label">\u81EA\u5B9A\u4E49\u5DE5\u5177</span>
            </div>
          </div>
        </div>
      </aside>`}function hh(b,v){return`
      <div class="yyt-shell-main-header">
        <div class="yyt-shell-main-heading-block">
          <div class="yyt-shell-main-title">${S(b)}</div>
          <div class="yyt-shell-main-description">${S(v)}</div>
        </div>
        <div class="yyt-shell-main-actions">
          <div class="yyt-shell-main-meta">
            <i class="fa-solid fa-circle-info"></i>
            <span>\u4FDD\u5B58\u540E\u6267\u884C\u94FE\u4F1A\u7ACB\u5373\u4F7F\u7528\u6700\u65B0\u914D\u7F6E</span>
          </div>
        </div>
      </div>`}function bh(b,v){return b.map(I=>`
      <div class="yyt-tab-content ${I.id===v?"active":""}" data-tab="${I.id}">
      </div>
    `).join("")}function xh(b){return`
      <div class="yyt-popup-footer">
        <div class="yyt-popup-footer-left">
          <div class="yyt-popup-status-cluster">
            <div class="yyt-popup-status">
              <i class="fa-solid fa-compass"></i>
              <span class="yyt-popup-active-label">\u5F53\u524D\uFF1A${S(b)}</span>
            </div>
            <div class="yyt-popup-footer-note">
              API\u3001\u5DE5\u5177\u3001\u63D0\u53D6\u4E0E\u8BCA\u65AD\u7EDF\u4E00\u5165\u53E3\u3002
            </div>
          </div>
        </div>
      </div>`}async function wh(){if(n.currentPopup){h("\u5F39\u7A97\u5DF2\u5B58\u5728");return}let b=t?.services?.loadModules;typeof b=="function"&&await b();let v=T(),I=A();if(!v){x("jQuery \u672A\u627E\u5230\uFF0C\u65E0\u6CD5\u521B\u5EFA\u5F39\u7A97");return}let N=s.toolRegistryModule?.getToolList()||[];if(!N.length){x("\u5DE5\u5177\u5217\u8868\u4E3A\u7A7A\uFF0C\u65E0\u6CD5\u521B\u5EFA\u5F39\u7A97");return}N.some(J=>J.id===n.currentMainTab)||(n.currentMainTab=N[0].id);let K=s.toolRegistryModule?.getToolConfig("tools"),F=Array.isArray(K?.subTabs)?K.subTabs:[],oe=F.filter(J=>J?.isCustom).length,Q=F.filter(J=>!J?.isCustom).length,ne=C(n.currentMainTab),De=w(n.currentMainTab);n.currentOverlay=I.createElement("div"),n.currentOverlay.className="yyt-popup-overlay",n.currentOverlay.addEventListener("click",J=>{J.target===n.currentOverlay&&Gt()}),I.body.appendChild(n.currentOverlay);let me=m(),it=`
      <div class="yyt-popup" id="${l}">
        ${gh()}
        <div class="yyt-popup-body">
          <div class="yyt-popup-shell">
            <div class="yyt-shell-workspace${me?" yyt-sidebar-collapsed":""}">
              ${mh(N,Q,oe)}
              <section class="yyt-shell-main">
                ${hh(ne,De)}
                <div class="yyt-sub-nav" style="display: none;"></div>
                <div class="yyt-content-frame">
                  <div class="yyt-content">
                    <div class="yyt-content-inner">
                      ${bh(N,n.currentMainTab)}
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
        ${xh(ne)}
      </div>
    `,$t=I.createElement("div");$t.innerHTML=it,n.currentPopup=$t.firstElementChild,I.body.appendChild(n.currentPopup),v(n.currentPopup).find(".yyt-popup-close").on("click",Gt),v(n.currentPopup).find(".yyt-sidebar-toggle").on("click",g);let Qt=J=>{J.key==="Escape"&&(I.querySelector(".yyt-dialog-overlay")||I.querySelector(".yyt-twb-editor-drawer.is-open")||(J.stopPropagation(),Gt()))},Rr=J=>{if(!(J.ctrlKey||J.metaKey)||J.key!=="s"||!n.currentPopup)return;J.preventDefault(),J.stopPropagation();let ft=v(n.currentPopup),et=ft.find("#yyt-bypass-save:visible").first()||ft.find(`#${a}-save-api-config:visible`).first()||ft.find("#yyt-save-tool-preset:visible").first()||ft.find('[data-twb-action="save"]:visible').first();et?.length&&et.trigger("click")};I.addEventListener("keydown",Qt),I.addEventListener("keydown",Rr),u.cleanups.push(()=>{I.removeEventListener("keydown",Qt),I.removeEventListener("keydown",Rr)}),Ue(),v(n.currentPopup).find(".yyt-main-nav-item").on("click",function(){let ft=v(this).data("tab");ft&&as(ft)}),Oo(),Ir(n.currentMainTab);let lt=s.toolRegistryModule?.getToolConfig(n.currentMainTab);lt?.hasSubTabs&&(v(n.currentPopup).find(".yyt-sub-nav").show(),Ws(n.currentMainTab,lt.subTabs)),B(),Lo(N),Je(),h("\u5F39\u7A97\u5DF2\u6253\u5F00")}return{openPopup:wh,closePopup:Gt,switchMainTab:as,switchSubTab:is,renderTabContent:Ir,renderSubTabContent:ls}}function dh(t,e={}){let{constants:r,modules:s}=t,{SCRIPT_ID:o,SCRIPT_VERSION:n}=r,{init:a,loadModules:i,addMenuItem:l,popupShell:d}=e;return{version:n,id:o,init:a,openPopup:d?.openPopup,closePopup:d?.closePopup,switchMainTab:d?.switchMainTab,switchSubTab:d?.switchSubTab,addMenuItem:l,getStorage:()=>s.storageModule,getApiConnection:()=>s.apiConnectionModule,getPresetManager:()=>s.presetManagerModule,getUi:()=>s.uiModule,getUiModule:()=>s.uiModule,getRegexExtractor:()=>s.regexExtractorModule,getToolManager:()=>s.toolManagerModule,getToolExecutor:()=>s.toolExecutorModule,getWindowManager:()=>s.windowManagerModule,getToolRegistry:()=>s.toolRegistryModule,getSettingsService:()=>s.settingsServiceModule,getBypassManager:()=>s.bypassManagerModule,getVariableResolver:()=>s.variableResolverModule,getContextInjector:()=>s.contextInjectorModule,getToolPromptService:()=>s.toolPromptServiceModule,getToolOutputService:()=>s.toolOutputServiceModule,getToolAutomationService:()=>s.toolAutomationServiceModule,getDataProvider:()=>s.toolDataProviderModule?.getCurrentProvider?.()||null,async getDataProviderAsync(){return await i(),s.toolDataProviderModule?.getToolDataProvider?.()||null},async getApiConfig(){return await i(),s.apiConnectionModule?.getApiConfig?.()||null},async saveApiConfig(c){return await i(),s.apiConnectionModule?(s.apiConnectionModule.updateApiConfig(c),!0):!1},async getPresets(){return await i(),s.presetManagerModule?s.presetManagerModule.getAllPresets():[]},async sendApiRequest(c,u){if(await i(),s.apiConnectionModule)return s.apiConnectionModule.sendApiRequest(c,u);throw new Error("API\u6A21\u5757\u672A\u52A0\u8F7D")},async testApiConnection(){return await i(),s.apiConnectionModule?s.apiConnectionModule.testApiConnection():{success:!1,message:"API\u6A21\u5757\u672A\u52A0\u8F7D"}},registerTool(c,u){return s.toolRegistryModule?.registerTool(c,u)||!1},unregisterTool(c){return s.toolRegistryModule?.unregisterTool(c)||!1},getToolList(){return s.toolRegistryModule?.getToolList()||[]},createWindow(c){return s.windowManagerModule?.createWindow(c)||null},closeWindow(c){s.windowManagerModule?.closeWindow(c)},startAutomation(){return s.toolAutomationServiceModule?.toolAutomationService?.init?.()||!1},stopAutomation(){s.toolAutomationServiceModule?.toolAutomationService?.stop?.()},getAutomationRuntime(){return s.toolAutomationServiceModule?.toolAutomationService?.getRuntimeSnapshot?.()||null},cancelAutomation(c={}){return s.toolAutomationServiceModule?.toolAutomationService?.cancelAutomation?.(c)||{success:!1,error:"\u81EA\u52A8\u5316\u670D\u52A1\u672A\u52A0\u8F7D"}},async processCurrentAssistantMessage(c={}){return s.toolAutomationServiceModule?.toolAutomationService?.processCurrentAssistantMessage?.(c)||{success:!1,error:"\u81EA\u52A8\u5316\u670D\u52A1\u672A\u52A0\u8F7D"}}}}var ki="youyou_toolkit",H0="1.0.216",G0=`${ki}-menu-item`,q0=`${ki}-menu-container`,Y0=`${ki}-popup`,V0=typeof window.parent<"u"?window.parent:window,Ii={constants:{SCRIPT_ID:ki,SCRIPT_VERSION:H0,MENU_ITEM_ID:G0,MENU_CONTAINER_ID:q0,POPUP_ID:Y0},topLevelWindow:V0,modules:{storageModule:null,apiConnectionModule:null,uiModule:null,presetManagerModule:null,regexExtractorModule:null,toolManagerModule:null,toolExecutorModule:null,toolTriggerModule:null,windowManagerModule:null,toolRegistryModule:null,settingsServiceModule:null,bypassManagerModule:null,variableResolverModule:null,contextInjectorModule:null,toolPromptServiceModule:null,toolOutputServiceModule:null,toolAutomationServiceModule:null,toolDataProviderModule:null},caches:{dynamicToolPanelCache:new Map},services:{loadModules:null},uiState:{currentPopup:null,currentOverlay:null,currentMainTab:"presetManagement",currentSubTab:{},startupScreenDismissed:!1}},uh=ch(Ii),Fn=nh(Ii,{openPopup:uh.openPopup});Ii.services.loadModules=Fn.loadModules;var Od=dh(Ii,{init:Fn.init,loadModules:Fn.loadModules,addMenuItem:Fn.addMenuItem,popupShell:uh});if(typeof window<"u"&&(window.YouYouToolkit=Od,typeof window.parent<"u"&&window.parent!==window))try{window.parent.YouYouToolkit=Od}catch{}var J0=Od;Fn.init();Promise.resolve().then(()=>(H(),Bd)).then(({logger:t})=>{t.createScope("Bootstrap").log("\u6A21\u5757\u52A0\u8F7D\u5B8C\u6210")});return Ih(X0);})();
