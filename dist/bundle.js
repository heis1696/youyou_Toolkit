var Xw=Object.defineProperty;var O=(t,e)=>()=>(t&&(e=t(t=0)),e);var he=(t,e)=>{for(var r in e)Xw(t,r,{get:e[r],enumerable:!0})};var G,ac,q,nt=O(()=>{G={STORAGE_CHANGED:"storage:changed",STORAGE_CLEARED:"storage:cleared",PRESET_CREATED:"preset:created",PRESET_UPDATED:"preset:updated",PRESET_DELETED:"preset:deleted",PRESET_ACTIVATED:"preset:activated",PRESET_IMPORTED:"preset:imported",PRESET_EXPORTED:"preset:exported",API_CONFIG_UPDATED:"api:configUpdated",API_REQUEST_START:"api:requestStart",API_REQUEST_SUCCESS:"api:requestSuccess",API_REQUEST_ERROR:"api:requestError",API_CONNECTION_TESTED:"api:connectionTested",TOOL_REGISTERED:"tool:registered",TOOL_UNREGISTERED:"tool:unregistered",TOOL_UPDATED:"tool:updated",TOOL_RUNTIME_UPDATED:"tool:runtimeUpdated",TOOL_ENABLED:"tool:enabled",TOOL_DISABLED:"tool:disabled",TOOL_EXECUTING:"tool:executing",TOOL_EXECUTED:"tool:executed",TOOL_ERROR:"tool:error",TOOL_EXECUTION_STARTED:"tool:executionStarted",TOOL_EXECUTION_FAILED:"tool:executionFailed",REGEX_RULE_ADDED:"regex:ruleAdded",REGEX_RULE_UPDATED:"regex:ruleUpdated",REGEX_RULE_DELETED:"regex:ruleDeleted",REGEX_RULES_CLEARED:"regex:rulesCleared",REGEX_PRESET_LOADED:"regex:presetLoaded",REGEX_EXTRACTED:"regex:extracted",UI_INITIALIZED:"ui:initialized",UI_RENDER_REQUESTED:"ui:renderRequested",UI_TAB_CHANGED:"ui:tabChanged",UI_SUBTAB_CHANGED:"ui:subTabChanged",UI_POPUP_OPENED:"ui:popupOpened",UI_POPUP_CLOSED:"ui:popupClosed",UI_WINDOW_CREATED:"ui:windowCreated",UI_WINDOW_CLOSED:"ui:windowClosed",APP_INITIALIZING:"app:initializing",APP_INITIALIZED:"app:initialized",APP_ERROR:"app:error",SETTINGS_UPDATED:"settings:updated",TOOL_CONTEXT_INJECTED:"tool:contextInjected",TOOL_CONTEXT_CLEARED:"tool:contextCleared",BYPASS_PRESET_CREATED:"bypass:presetCreated",BYPASS_PRESET_UPDATED:"bypass:presetUpdated",BYPASS_PRESET_DELETED:"bypass:presetDeleted",BYPASS_PRESET_ACTIVATED:"bypass:presetActivated",TOOL_OUTPUT_MODE_CHANGED:"tool:outputModeChanged"},ac=class{constructor(){this.listeners=new Map,this.onceCallbacks=new Map,this.history=[],this.maxHistorySize=100,this.debugMode=!1}on(e,r,n={}){if(!e||typeof r!="function")return console.warn("[EventBus] \u65E0\u6548\u7684\u4E8B\u4EF6\u6216\u56DE\u8C03"),()=>{};let{priority:s=0}=n;this.listeners.has(e)||this.listeners.set(e,new Set);let o={callback:r,priority:s};return this.listeners.get(e).add(o),this.debugMode&&console.log(`[EventBus] \u8BA2\u9605: ${e}`),()=>this.off(e,r)}off(e,r){let n=this.listeners.get(e);if(n){for(let s of n)if(s.callback===r){n.delete(s);break}this.debugMode&&console.log(`[EventBus] \u53D6\u6D88\u8BA2\u9605: ${e}`)}}emit(e,r){this.debugMode&&console.log(`[EventBus] \u53D1\u5E03: ${e}`,r),this._addToHistory(e,r);let n=this.listeners.get(e);if(!n||n.size===0)return;let s=Array.from(n).sort((o,a)=>a.priority-o.priority);for(let{callback:o}of s)try{o(r)}catch(a){console.error(`[EventBus] \u4E8B\u4EF6\u5904\u7406\u9519\u8BEF (${e}):`,a)}}once(e,r){let n=s=>{this.off(e,n),r(s)};return this.on(e,n)}wait(e,r=0){return new Promise((n,s)=>{let o=null,a=this.once(e,i=>{o&&clearTimeout(o),n(i)});r>0&&(o=setTimeout(()=>{a(),s(new Error(`\u7B49\u5F85\u4E8B\u4EF6\u8D85\u65F6: ${e}`))},r))})}hasListeners(e){let r=this.listeners.get(e);return r&&r.size>0}listenerCount(e){let r=this.listeners.get(e);return r?r.size:0}removeAllListeners(e){e?this.listeners.delete(e):this.listeners.clear()}setDebugMode(e){this.debugMode=e}_addToHistory(e,r){this.history.push({event:e,data:r,timestamp:Date.now()}),this.history.length>this.maxHistorySize&&this.history.shift()}getHistory(e){return e?this.history.filter(r=>r.event===e):[...this.history]}clearHistory(){this.history=[]}},q=new ac});var Hp={};he(Hp,{LOG_LEVEL:()=>_e,LoggerService:()=>Xa,default:()=>Zw,logger:()=>$});var _e,Wp,Xa,$,Zw,Z=O(()=>{nt();_e=Object.freeze({DEBUG:0,INFO:1,WARN:2,ERROR:3}),Wp=Object.freeze({[_e.DEBUG]:"DEBUG",[_e.INFO]:"INFO",[_e.WARN]:"WARN",[_e.ERROR]:"ERROR"}),Xa=class{constructor(){this._entries=[],this._maxSize=2e3,this._nextId=1,this._minLevel=_e.INFO,this._eventKey="logger:entry",this._statsEventKey="logger:statsChanged",this._pendingFlush=!1,this._toastHandler=null}_write(e,r,n,s,o){let a={id:this._nextId++,timestamp:Date.now(),level:e,scope:r,message:n,data:s};if(this._entries.push(a),this._entries.length>this._maxSize&&this._entries.shift(),this._forwardToConsole(a),this._toastHandler&&o)try{this._toastHandler(this.levelToToastType(e),n,o)}catch{}this._pendingFlush||(this._pendingFlush=!0,queueMicrotask(()=>{this._pendingFlush=!1,this._emitEntry(a)}))}_forwardToConsole(e){let r=`[${e.scope}]`;switch(e.level){case _e.DEBUG:console.debug(r,e.message,e.data??"");break;case _e.INFO:console.log(r,e.message,e.data??"");break;case _e.WARN:console.warn(r,e.message,e.data??"");break;case _e.ERROR:console.error(r,e.message,e.data??"");break}}_emitEntry(e){try{q?.emit(this._eventKey,e)}catch{}}debug(e,r,n,s){_e.DEBUG<this._minLevel||this._write(_e.DEBUG,e,r,n,s)}info(e,r,n,s){_e.INFO<this._minLevel||this._write(_e.INFO,e,r,n,s)}log(e,r,n,s){this.info(e,r,n,s)}warn(e,r,n,s){_e.WARN<this._minLevel||this._write(_e.WARN,e,r,n,s)}error(e,r,n,s){_e.ERROR<this._minLevel||this._write(_e.ERROR,e,r,n,s)}createScope(e){return{debug:(r,n,s)=>this.debug(e,r,n,s),info:(r,n,s)=>this.info(e,r,n,s),log:(r,n,s)=>this.log(e,r,n,s),warn:(r,n,s)=>this.warn(e,r,n,s),error:(r,n,s)=>this.error(e,r,n,s)}}setToastHandler(e){this._toastHandler=e}levelToToastType(e){switch(e){case _e.WARN:return"warning";case _e.ERROR:return"error";default:return"info"}}getEntries(e={}){let{level:r,scope:n,search:s,limit:o=500,offset:a=0}=e,i=this._entries;if(r!=null&&(i=i.filter(d=>d.level>=r)),n&&(i=i.filter(d=>d.scope===n)),s){let d=s.toLowerCase();i=i.filter(c=>c.scope.toLowerCase().includes(d)||c.message.toLowerCase().includes(d))}let l=i.length;return i=i.slice(a,a+o),{entries:i,total:l}}getStats(){let e={total:this._entries.length,byLevel:{DEBUG:0,INFO:0,WARN:0,ERROR:0},byScope:{}};for(let r of this._entries){let n=Wp[r.level]||"UNKNOWN";e.byLevel[n]=(e.byLevel[n]||0)+1,e.byScope[r.scope]=(e.byScope[r.scope]||0)+1}return e}setLevel(e){this._minLevel=e}getLevel(){return this._minLevel}setMaxSize(e){this._maxSize=Math.max(100,Math.min(1e4,e))}clear(){this._entries=[],this._nextId=1}levelLabel(e){return Wp[e]||"UNKNOWN"}},$=new Xa,Zw=$});function er(){return typeof window.parent<"u"&&window.parent!==window&&window.parent.document?window.parent.document:document}function be(t){return typeof t!="string"?"":t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function Za(t,e,r=3e3){e||(e=t==="error"?"\u64CD\u4F5C\u5931\u8D25":"\u64CD\u4F5C\u5B8C\u6210");let n=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(n.toastr){n.toastr[t](e,"YouYou \u5DE5\u5177\u7BB1",{timeOut:r,progressBar:!0});return}rv(t,e,r),tv.log(`[${t.toUpperCase()}] ${e}`)}function uc(t,e,r={}){e||(e=t==="error"?"\u64CD\u4F5C\u5931\u8D25":"\u64CD\u4F5C\u5B8C\u6210");let{duration:n=3500,sticky:s=!1,noticeId:o=""}=r,a=er();if(!a?.body){Za(t,e,n);return}let i="yyt-top-notice-container",l="yyt-top-notice-styles",d=a.getElementById(i);if(d||(d=a.createElement("div"),d.id=i,d.style.cssText=`
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
    `,a.head.appendChild(h)}if(o){let h=d.querySelector(`[data-notice-id="${o}"]`);h&&h.remove()}let c={success:"\u2713",error:"!",warning:"\u2022",info:"i"},u=a.createElement("div");u.className=`yyt-top-notice yyt-top-notice--${t||"info"}`,o&&(u.dataset.noticeId=o);let y=a.createElement("span");y.className="yyt-top-notice__icon",y.textContent=c[t]||c.info;let p=a.createElement("div");p.className="yyt-top-notice__content",p.textContent=e;let m=a.createElement("button");m.className="yyt-top-notice__close",m.type="button",m.setAttribute("aria-label","\u5173\u95ED\u901A\u77E5"),m.textContent="\xD7";let g=()=>{u.style.animation="yyt-top-notice-out 0.18s ease forwards",setTimeout(()=>u.remove(),180)};m.addEventListener("click",g),u.appendChild(y),u.appendChild(p),u.appendChild(m),d.appendChild(u),s||setTimeout(g,n)}function rv(t,e,r){let n=er();if(!n)return;let s=n.getElementById("yyt-fallback-toast");s&&s.remove();let o={success:{bg:"rgba(74, 222, 128, 0.9)",border:"#22c55e"},error:{bg:"rgba(248, 113, 113, 0.9)",border:"#ef4444"},warning:{bg:"rgba(251, 191, 36, 0.9)",border:"#f59e0b"},info:{bg:"rgba(123, 183, 255, 0.9)",border:"#7bb7ff"}},a=o[t]||o.info,i=n.createElement("div");i.id="yyt-fallback-toast",i.style.cssText=`
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
  `,i.textContent=e,n.body.appendChild(i),setTimeout(()=>{i.style.animation="yyt-toast-out 0.3s ease forwards",setTimeout(()=>{i.remove()},300)},r)}function ue(){if(Bn)return Bn;if(typeof window.parent<"u"&&window.parent!==window)try{if(window.parent.jQuery)return Bn=window.parent.jQuery,Bn}catch{}return window.jQuery&&(Bn=window.jQuery),Bn}function nv(){Bn=null}function Ke(t){if(!t||t.length===0)return!1;let e=t[0];if(!e||e.nodeType!==1)return!1;let r=e.ownerDocument||document;return e.isConnected?r?.documentElement?.contains?r.documentElement.contains(e):!0:!1}function Xr(...t){return t.flat(1/0).flatMap(e=>String(e||"").split(/\s+/)).map(e=>e.trim()).filter(Boolean).join(" ")}function Es(t={}){return Object.entries(t).filter(([,e])=>e!=null&&e!==!1).map(([e,r])=>r===!0?e:`${e}="${be(String(r))}"`).join(" ")}function Jp(t=[],e="",r=""){let n=String(e??""),s=t.find(o=>o.value===n)||t.find(o=>o.disabled!==!0)||null;return s||{value:n,label:r||n||"\u8BF7\u9009\u62E9",disabled:!1}}function sv(t=""){return String(t||"").split(/\s+/).map(e=>e.trim()).filter(e=>e&&e!=="yyt-select"&&e!=="yyt-native-select-bridge")}function Gp(t,e){let r=ue();if(!r||!e?.length)return null;let n=e.attr("id")?`#${e.attr("id")}`:e.attr("data-yyt-select-key")?`[data-yyt-select-key="${e.attr("data-yyt-select-key")}"]`:"";if(!n)return null;let o=t.find("[data-yyt-custom-select]").filter((a,i)=>String(r(i).attr("data-yyt-select-target")||"")===n);return o.length?o.first():null}function Qp(t){let e=t?.[0];return e?.ownerDocument?e.ownerDocument:typeof window.parent<"u"&&window.parent!==window&&window.parent.document?window.parent.document:document}function ov(t){if(!ue()||!Ke(t))return null;let r=t.find("[data-yyt-custom-select]");return r.length?r:null}function Xp(t,e){if(!ue()||!e?.length)return null;let n=e.find("[data-yyt-select-native]").first();if(n.length)return n;let s=String(e.attr("data-yyt-select-target")||"").trim();if(!s)return null;let o=t.find(s).first();return o.length?o:null}function Zp(t=null){return t?.jquery&&t[0]?.ownerDocument?t[0].ownerDocument:t?.ownerDocument?t.ownerDocument:t?.nodeType===9?t:er()}function br(t=null){let e=Zp(t),r=Yp.get(e);return r||(r={targetDoc:e,layer:null,activeRoot:null,activeDropdown:null,placeholder:null,cleanup:null},Yp.set(e,r)),r}function av(t=null){let e=Zp(t);if(!e?.body)return null;let r=br(e);if(r.layer&&r.layer.isConnected)return r.layer;let n=e.getElementById(Vp);return n||(n=e.createElement("div"),n.id=Vp,n.className="yyt-select-portal-layer",e.body.appendChild(n)),r.layer=n,n}function ei(t){if(!ue()||!t?.length)return null;let r=t.find("[data-yyt-select-trigger]").first();return r.length?r:t.find(".yyt-select-trigger").first()}function ey(t){let e=ue();if(!e||!t?.length)return null;let r=br(t);if(r.activeRoot===t[0]&&r.activeDropdown)return e(r.activeDropdown);let n=t.find("[data-yyt-select-dropdown]").first();return n.length?n:t.find(".yyt-select-dropdown").first()}function iv(t){t&&(t.classList.remove("yyt-floating-open"),t.removeAttribute("data-yyt-floating"),t.removeAttribute("data-yyt-floating-placement"),t.style.position="",t.style.top="",t.style.left="",t.style.right="",t.style.width="",t.style.minWidth="",t.style.maxWidth="",t.style.maxHeight="",t.style.visibility="",t.style.zIndex="")}function ty(t,e=null){if(!t)return!1;let r=br(e||t);return r.activeRoot?.contains?.(t)||r.activeDropdown?.contains?.(t)?!0:!!t.closest?.("[data-yyt-custom-select], .yyt-select-portal-layer")}function lv(t){if(!t?.targetDoc||typeof t.cleanup=="function")return;let e=t.targetDoc,r=e.defaultView||window,n=i=>{!t.activeRoot||!t.activeDropdown||ty(i.target,e)||hr(e)},s=i=>{if(i.key!=="Escape")return;let l=t.activeRoot;hr(e);let d=ue();d&&l&&ei(d(l))?.trigger("focus")},o=()=>{dc(e)},a=()=>{dc(e)};e.addEventListener("mousedown",n,!0),e.addEventListener("keydown",s,!0),r.addEventListener("resize",o),e.addEventListener("scroll",a,!0),t.cleanup=()=>{e.removeEventListener("mousedown",n,!0),e.removeEventListener("keydown",s,!0),r.removeEventListener("resize",o),e.removeEventListener("scroll",a,!0)}}function cv(t){typeof t?.cleanup=="function"&&t.cleanup(),t&&(t.cleanup=null)}function cc(t){let e=ue();if(!e||!t?.activeRoot||!t?.activeDropdown)return;let r=t.targetDoc;if(!r?.body?.contains?.(t.activeRoot)){hr(r);return}let n=e(t.activeRoot),s=ei(n),o=t.activeDropdown,a=r?.defaultView||window;if(!s?.length||!o?.isConnected||!n[0]?.isConnected){hr(r);return}let i=s[0].getBoundingClientRect(),l=a.innerWidth||r.documentElement?.clientWidth||0,d=a.innerHeight||r.documentElement?.clientHeight||0,c=12,u=8,y=Math.max(0,d-i.bottom-c-u),p=Math.max(0,i.top-c-u),m=y<220&&p>y,h=Math.max(120,Math.floor((m?p:y)||0));o.setAttribute("data-yyt-floating","true"),o.setAttribute("data-yyt-floating-placement",m?"top":"bottom"),o.classList.add("yyt-floating-open");let b=Math.ceil(i.width),v=Math.max(b,Math.floor(l-c*2)),x=o.style.width,T=o.style.minWidth,E=o.style.maxWidth,w=o.style.visibility;o.style.width="max-content",o.style.minWidth=`${b}px`,o.style.maxWidth=`${v}px`,o.style.visibility="hidden";let _=Math.ceil(o.scrollWidth||o.getBoundingClientRect().width||b),A=Math.max(b,Math.min(v,_)),I=Math.min(o.scrollHeight||h,h);o.style.width=x,o.style.minWidth=T,o.style.maxWidth=E,o.style.visibility=w;let P=Math.round(i.left);P+A>l-c&&(P=Math.max(c,Math.round(l-c-A))),P=Math.max(c,P);let C=Math.round(m?i.top-u-I:i.bottom+u);C=Math.max(c,Math.min(C,Math.round(d-c-I))),o.style.position="fixed",o.style.top=`${C}px`,o.style.left=`${P}px`,o.style.right="auto",o.style.width=`${A}px`,o.style.minWidth=`${b}px`,o.style.maxWidth=`${v}px`,o.style.maxHeight=`${Math.floor(h)}px`,o.style.visibility="",o.style.zIndex="10050"}function hr(t=null){let e=ue(),r=br(t);if(!e||!r?.activeRoot)return;let n=r.activeRoot,s=r.activeDropdown,o=r.placeholder,a=e(n),i=ei(a);s&&(iv(s),o?.parentNode?o.parentNode.insertBefore(s,o):n?.isConnected?n.appendChild(s):s.remove()),o?.parentNode?.removeChild(o),a.removeClass("yyt-open"),i?.attr("aria-expanded","false"),r.activeRoot=null,r.activeDropdown=null,r.placeholder=null,cv(r)}function dc(t=null){let e=br(t);!e?.activeRoot||!e?.activeDropdown||cc(e)}function ry(t){if(!ue()||!t?.length)return;let r=t.first(),n=ei(r),s=ey(r);if(!n?.length||!s?.length||n.prop("disabled"))return;let o=br(r);if(o.activeRoot===r[0]){cc(o);return}hr(r);let a=av(r);if(!a)return;let i=s[0],l=o.targetDoc.createComment("yyt-select-dropdown-placeholder");i.parentNode?.insertBefore(l,i),a.appendChild(i),o.activeRoot=r[0],o.activeDropdown=i,o.placeholder=l,r.addClass("yyt-open"),n.attr("aria-expanded","true"),lv(o),cc(o)}function dv(t,e){let r=ue();if(!r||!e?.length)return null;let n=e.closest("[data-yyt-custom-select]");if(n.length)return n.first();let s=br(e);if(s.activeRoot&&s.activeDropdown?.contains?.(e[0])){let o=r(s.activeRoot);return t.has(s.activeRoot).length?o:null}return null}function pc(t){let e=br(t);t?.length&&e.activeRoot&&e.activeRoot!==t[0]||hr(t)}function ny(t){let e=br(t);if(t?.length&&e.activeRoot===t[0]){hr(t);return}ry(t)}function ic(t,e,r=null){let n=ue();if(!n||!e?.length)return;let s=r||Xp(t,e);if(!s?.length)return;let o=Array.isArray(s.data("yytCustomSelectOptions"))?s.data("yytCustomSelectOptions"):[],a=Jp(o,s.val(),e.attr("data-yyt-select-placeholder")||""),i=String(a.value??""),l=String(a.label??""),d=s.is(":disabled");e.find(".yyt-select-value").text(l).attr("data-value",i).data("value",i);let c=ey(e);(c?.length?c.find("[data-yyt-select-option]"):e.find("[data-yyt-select-option]")).each((p,m)=>{let g=n(m),h=String(g.attr("data-value")||"")===i;g.toggleClass("yyt-selected",h).attr("aria-selected",String(h))});let y=e.find("[data-yyt-select-trigger]").first();y.prop("disabled",d),d&&(pc(e),e.removeClass("yyt-open"),y.attr("aria-expanded","false"))}function sy(t=[]){return Array.isArray(t)?t.map(e=>{if(e&&typeof e=="object"&&!Array.isArray(e)){let n=String(e.value??""),s=String(e.label??e.text??e.name??n);return{value:n,label:s,disabled:e.disabled===!0}}let r=String(e??"");return{value:r,label:r,disabled:!1}}):[]}function oy(t={}){let{selectedValue:e="",options:r=[],placeholder:n="\u8BF7\u9009\u62E9",disabled:s=!1,includeNative:o=!0,nativeTag:a="input",nativeType:i="hidden",rootAttributes:l={},nativeAttributes:d={},triggerAttributes:c={},dropdownAttributes:u={},optionAttributes:y={},optionClass:p="",optionTextClass:m=""}=t,g=sy(r),h=Jp(g,e,n),b=s===!0||g.length===0,v=Es({...l,class:Xr("yyt-custom-select",l.class),"data-yyt-custom-select":l["data-yyt-custom-select"]??"true","data-yyt-select-placeholder":n}),x=Es({type:"button",...c,class:Xr("yyt-select-trigger",c.class),"data-yyt-select-trigger":c["data-yyt-select-trigger"]??"true","aria-haspopup":c["aria-haspopup"]??"listbox","aria-expanded":c["aria-expanded"]??"false",disabled:b?!0:c.disabled}),T=Es({...u,class:Xr("yyt-select-dropdown",u.class),"data-yyt-select-dropdown":u["data-yyt-select-dropdown"]??"true",role:u.role??"listbox"}),E=o?(()=>{let w={...d,class:Xr(d.class),"data-yyt-select-native":d["data-yyt-select-native"]??"true",disabled:b?!0:d.disabled};return a==="select"?`<select ${Es(w)}>${g.map(I=>`
            <option value="${be(I.value)}" ${I.value===String(h.value??"")?"selected":""} ${I.disabled?"disabled":""}>${be(I.label)}</option>
          `).join("")}</select>`:`<input ${Es({type:i,value:h.value,...w})}>`})():"";return`
    <div ${v}>
      ${E}
      <button ${x}>
        <span class="${be(Xr("yyt-select-value"))}" data-value="${be(h.value)}">${be(h.label)}</span>
        <i class="fa-solid fa-chevron-down yyt-select-arrow"></i>
      </button>
      <div ${T}>
        ${g.map(w=>{let _=w.value===String(h.value??"");return`
            <button ${Es({type:"button",...y,class:Xr("yyt-select-option",p,y.class,_?"yyt-selected":""),"data-yyt-select-option":y["data-yyt-select-option"]??"true","data-value":w.value,role:y.role??"option","aria-selected":_?"true":"false",disabled:w.disabled?!0:y.disabled})}>
              <span class="${be(Xr("yyt-option-text",m))}">${be(w.label)}</span>
            </button>
          `}).join("")}
      </div>
    </div>
  `}function jt(t,e="yytCustomSelect"){let r=ue();if(!r||!Ke(t))return;let n=Qp(t),s=br(n);s.activeRoot&&t.has(s.activeRoot).length&&hr(n),t.off(`.${e}`),r(n).off(`click.${e}`),r(n).off(`mousedown.${e}`),t.find('[data-yyt-enhanced-select="true"]').remove(),t.find(".yyt-native-select-bridge").each((o,a)=>{let i=r(a),l=i.attr("data-yyt-original-style");l!==void 0&&l?i.attr("style",l):i.removeAttr("style"),i.removeClass("yyt-native-select-bridge").removeAttr("data-yyt-original-style").removeAttr("data-yyt-select-key").removeData("yytCustomSelectOptions")})}function xr(t,e={}){let r=ue();if(!r||!Ke(t))return;let{namespace:n="yytCustomSelect",selectors:s=[]}=e,o=Array.isArray(s)?s.filter(Boolean):[s].filter(Boolean);if(o.length===0)return;jt(t,n);let a=o.join(", "),i=Qp(t);t.find(a).each((l,d)=>{let c=r(d),u=String(c.attr("id")||"").trim(),y=u||`yyt-select-${Date.now()}-${l}`,p=u?`#${u}`:`[data-yyt-select-key="${y}"]`,m=`${y}-dropdown`,g=sv(c.attr("class")),h=c.attr("style"),b=c.find("option").map((T,E)=>{let w=r(E);return{value:String(w.attr("value")??w.val()??""),label:w.text(),disabled:w.is(":disabled")}}).get();c.attr("data-yyt-original-style",h??"").attr("data-yyt-select-key",y).addClass("yyt-native-select-bridge").css("display","none").data("yytCustomSelectOptions",b);let v=oy({includeNative:!1,selectedValue:c.val(),options:b,disabled:c.is(":disabled"),placeholder:b[0]?.label||"\u8BF7\u9009\u62E9",rootAttributes:{class:Xr(g),style:h||void 0,"data-yyt-enhanced-select":"true","data-yyt-select-target":p},triggerAttributes:{id:`${y}-trigger`,"aria-controls":m},dropdownAttributes:{id:m}});c.after(v);let x=Gp(t,c);ic(t,x,c)}),t.on(`click.${n}`,"[data-yyt-select-trigger]",l=>{l.preventDefault(),l.stopPropagation();let d=r(l.currentTarget);if(d.prop("disabled"))return;let c=d.closest("[data-yyt-custom-select]");ny(c)}),t.on(`change.${n}`,a,l=>{let d=r(l.currentTarget),c=d.find("option").map((y,p)=>{let m=r(p);return{value:String(m.attr("value")??m.val()??""),label:m.text(),disabled:m.is(":disabled")}}).get();d.data("yytCustomSelectOptions",c);let u=Gp(t,d);ic(t,u,d)}),r(i).off(`click.${n}`).on(`click.${n}`,l=>{if(ty(l.target,i))return;let d=ov(t);d?.length&&(hr(i),d.filter(".yyt-open").removeClass("yyt-open").find("[data-yyt-select-trigger]").attr("aria-expanded","false"))}),r(i).off(`mousedown.${n}`,".yyt-select-portal-layer [data-yyt-select-option]").on(`mousedown.${n}`,".yyt-select-portal-layer [data-yyt-select-option]",l=>{l.preventDefault(),l.stopPropagation();let d=r(l.currentTarget);if(d.prop("disabled"))return;let c=dv(t,d);if(!c?.length)return;let u=Xp(t,c);if(!u?.length)return;let y=String(d.attr("data-value")||"");u.val(y).trigger("change"),ic(t,c,u),pc(c)})}function uv(t,e=zn){if(!ue()||!Ke(t))return{url:"",apiKey:"",model:"",useMainApi:!0,stream:!1,max_tokens:4096,temperature:.7,top_p:.9};let n=t.find(`#${e}-model`).val()?.trim()||"",s=t.find(`#${e}-model-select`);return s.is(":visible")&&(n=s.val()||n),{url:t.find(`#${e}-api-url`).val()?.trim()||"",apiKey:t.find(`#${e}-api-key`).val()||"",model:n,useMainApi:t.find(`#${e}-use-main-api`).is(":checked"),stream:t.find(`#${e}-stream`).is(":checked"),max_tokens:parseInt(t.find(`#${e}-max-tokens`).val())||4096,temperature:parseFloat(t.find(`#${e}-temperature`).val())??.7,top_p:parseFloat(t.find(`#${e}-top-p`).val())??.9}}function pv(t,e,r=zn){if(!ue()||!Ke(t)||!e)return;t.find(`#${r}-api-url`).val(e.url||""),t.find(`#${r}-api-key`).val(e.apiKey||""),t.find(`#${r}-model`).val(e.model||""),t.find(`#${r}-stream`).prop("checked",e.stream===!0),t.find(`#${r}-max-tokens`).val(e.max_tokens||4096),t.find(`#${r}-temperature`).val(e.temperature??.7),t.find(`#${r}-top-p`).val(e.top_p??.9);let s=e.useMainApi??!0;t.find(`#${r}-use-main-api`).prop("checked",s);let a=t.find(`#${r}-custom-api-fields`);s?a.addClass("yyt-disabled").find("input, button, select").prop("disabled",!0):a.removeClass("yyt-disabled").find("input, button, select").prop("disabled",!1),t.find(`#${r}-model`).show(),t.find(`#${r}-model-select`).hide()}function Po(t){let{id:e,title:r,body:n,width:s="380px",wide:o=!1,dialogClass:a="",bodyClass:i="",footerClass:l=""}=t;return`
    <div class="yyt-dialog-overlay" id="${e}-overlay">
      <div class="yyt-dialog ${o?"yyt-dialog-wide":""} ${a}" style="${s!=="380px"?`width: ${s};`:""} max-height: calc(100vh - 32px);">
        <div class="yyt-dialog-header">
          <span class="yyt-dialog-title">${r}</span>
          <button class="yyt-dialog-close" id="${e}-close">
            <i class="fa-solid fa-times"></i>
          </button>
        </div>
        <div class="yyt-dialog-body ${i}" style="overflow-y: auto; overflow-x: hidden; max-height: calc(100vh - 160px);">
          ${n}
        </div>
        <div class="yyt-dialog-footer ${l}">
          <button class="yyt-btn yyt-btn-secondary" id="${e}-cancel">\u53D6\u6D88</button>
          <button class="yyt-btn yyt-btn-primary" id="${e}-save">\u4FDD\u5B58</button>
        </div>
      </div>
    </div>
  `}function No(t,e,r={}){if(!ue())return()=>{};let s=t.find(`#${e}-overlay`),o=()=>{s.remove(),a?.removeEventListener("keydown",i),r.onClose&&r.onClose()};s.find(`#${e}-close, #${e}-cancel`).on("click",o),s.on("click",function(l){l.target===this&&o()}),s.find(`#${e}-save`).on("click",function(){r.onSave&&r.onSave(o)});let a=s[0]?.ownerDocument||document,i=l=>{l.key==="Escape"&&(l.stopPropagation(),o())};return a.addEventListener("keydown",i),o}function Lr(t,e,r={}){let{confirmText:n="\u786E\u5B9A",cancelText:s="\u53D6\u6D88",danger:o=!1,width:a="380px"}=r,i=ue(),l=er();if(!i||!l?.body)return Promise.resolve(!1);let d=`yyt-confirm-${++ay}`;return new Promise(c=>{let u=!1,y=h=>{u||(u=!0,g.remove(),p?.focus(),c(h))},p=l.activeElement,m=`
      <div class="yyt-dialog-overlay" id="${d}-overlay">
        <div class="yyt-dialog" style="${a!=="380px"?`width: ${a};`:""} max-height: calc(100vh - 32px);">
          <div class="yyt-dialog-header">
            <span class="yyt-dialog-title">${be(t)}</span>
            <button class="yyt-dialog-close" id="${d}-close">
              <i class="fa-solid fa-times"></i>
            </button>
          </div>
          <div class="yyt-dialog-body">
            <div style="color: var(--yyt-text-secondary); font-size: 13px; line-height: 1.6;">${be(e)}</div>
          </div>
          <div class="yyt-dialog-footer">
            <button class="yyt-btn yyt-btn-secondary" id="${d}-cancel">${be(s)}</button>
            <button class="yyt-btn ${o?"yyt-btn-danger":"yyt-btn-primary"}" id="${d}-confirm">${be(n)}</button>
          </div>
        </div>
      </div>`,g=i(m).appendTo(l.body);g.find(`#${d}-confirm`).on("click",()=>y(!0)),g.find(`#${d}-cancel, #${d}-close`).on("click",()=>y(!1)),g.on("click",function(h){h.target===this&&y(!1)}),g.on("keydown",h=>{h.key==="Escape"&&(h.stopPropagation(),y(!1)),h.key==="Enter"&&(h.stopPropagation(),y(!0))}),g.find(`#${d}-${o?"cancel":"confirm"}`).trigger("focus")})}function yv(t,e,r={}){let{defaultValue:n="",placeholder:s="",confirmText:o="\u786E\u5B9A",cancelText:a="\u53D6\u6D88",width:i="380px"}=r,l=ue(),d=er();if(!l||!d?.body)return Promise.resolve(null);let c=`yyt-prompt-${++ay}`;return new Promise(u=>{let y=!1,p=x=>{y||(y=!0,h.remove(),m?.focus(),u(x))},m=d.activeElement,g=`
      <div class="yyt-dialog-overlay" id="${c}-overlay">
        <div class="yyt-dialog" style="${i!=="380px"?`width: ${i};`:""} max-height: calc(100vh - 32px);">
          <div class="yyt-dialog-header">
            <span class="yyt-dialog-title">${be(t)}</span>
            <button class="yyt-dialog-close" id="${c}-close">
              <i class="fa-solid fa-times"></i>
            </button>
          </div>
          <div class="yyt-dialog-body">
            ${e?`<div style="color: var(--yyt-text-secondary); font-size: 13px; line-height: 1.6;">${be(e)}</div>`:""}
            <input class="yyt-input" id="${c}-input" type="text" value="${be(n)}" placeholder="${be(s)}" />
          </div>
          <div class="yyt-dialog-footer">
            <button class="yyt-btn yyt-btn-secondary" id="${c}-cancel">${be(a)}</button>
            <button class="yyt-btn yyt-btn-primary" id="${c}-confirm">${be(o)}</button>
          </div>
        </div>
      </div>`,h=l(g).appendTo(d.body),b=h.find(`#${c}-input`),v=()=>{let x=b.val().trim();p(x||null)};h.find(`#${c}-confirm`).on("click",v),h.find(`#${c}-cancel, #${c}-close`).on("click",()=>p(null)),h.on("click",function(x){x.target===this&&p(null)}),b.on("keydown",x=>{x.key==="Enter"&&(x.stopPropagation(),v())}),h.on("keydown",x=>{x.key==="Escape"&&(x.stopPropagation(),p(null))}),b.trigger("focus").trigger("select")})}function fv(t,e,r){if(t.prop("disabled")&&t.data("yytLoading"))return Promise.resolve();let n=t.html(),s=t.outerWidth();if(t.prop("disabled",!0).data("yytLoading",!0),t.css("min-width",s+"px"),r)t.html(`<i class="fa-solid fa-spinner fa-spin" style="margin-right:4px"></i>${be(r)}`);else{let o=t.find("i.fa-solid, i.fa-regular").first();o.length?(o.data("yytOriginalClass",o.attr("class")),o.attr("class","fa-solid fa-spinner fa-spin")):t.html(`<i class="fa-solid fa-spinner fa-spin" style="margin-right:4px"></i>${n}`)}return Promise.resolve().then(()=>e()).finally(()=>{if(r)t.html(n);else{let o=t.find("i.fa-spinner"),a=o.data("yytOriginalClass");a?o.attr("class",a).removeData("yytOriginalClass"):t.html(n)}t.prop("disabled",!1).removeData("yytLoading").css("min-width","")})}function $o(t,e){let r=new Blob([t],{type:"application/json"}),n=URL.createObjectURL(r),s=document.createElement("a");s.href=n,s.download=e,s.click(),URL.revokeObjectURL(n)}function Lo(t){return new Promise((e,r)=>{let n=new FileReader;n.onload=s=>e(s.target.result),n.onerror=s=>r(new Error("\u6587\u4EF6\u8BFB\u53D6\u5931\u8D25")),n.readAsText(t)})}var tv,zn,lc,Bn,Yp,Vp,ay,pt=O(()=>{Z();tv=$.createScope("UIUtils"),zn="youyou_toolkit",lc=class{constructor(e={}){this._state={...e}}get(e){return this._state[e]}set(e,r){return this._state[e]=r,this}reset(e={}){return this._state={...e},this}toJSON(){return{...this._state}}};Bn=null;Yp=new WeakMap,Vp="yyt-select-portal-layer";ay=0});var iy={};he(iy,{StorageService:()=>Kn,default:()=>bv,getStorage:()=>mv,loadSettings:()=>gv,presetStorage:()=>Fe,saveSettings:()=>hv,storage:()=>j,toolStorage:()=>$e,windowStorage:()=>ti});function mv(){let t=j;return t._getStorage(),t._storage}function gv(){return j.get("settings",{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}})}function hv(t){j.set("settings",t)}var yc,Kn,j,$e,Fe,ti,bv,Je=O(()=>{Z();yc=$.createScope("StorageService"),Kn=class t{constructor(e="youyou_toolkit"){this.namespaceKey=e,this._storage=null,this._cache=new Map}_getStorage(){if(this._storage)return this._storage;try{let e=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(e.SillyTavern?.getContext){let r=e.SillyTavern.getContext();if(r?.extensionSettings)return r.extensionSettings[this.namespaceKey]||(r.extensionSettings[this.namespaceKey]={}),this._storage={_target:r.extensionSettings[this.namespaceKey],getItem:n=>{let s=r.extensionSettings[this.namespaceKey][n];return typeof s=="string"?s:s?JSON.stringify(s):null},setItem:(n,s)=>{r.extensionSettings[this.namespaceKey][n]=s,this._saveSettings(r)},removeItem:n=>{delete r.extensionSettings[this.namespaceKey][n],this._saveSettings(r)},_isTavern:!0},this._storage}}catch{yc.warn("SillyTavern\u5B58\u50A8\u4E0D\u53EF\u7528\uFF0C\u4F7F\u7528localStorage")}return this._storage={getItem:e=>{try{return localStorage.getItem(e)}catch{return null}},setItem:(e,r)=>{try{localStorage.setItem(e,r)}catch(n){yc.error("localStorage\u5199\u5165\u5931\u8D25:",n)}},removeItem:e=>{try{localStorage.removeItem(e)}catch{}},_isTavern:!1},this._storage}_saveSettings(e){if(typeof e.saveSettings=="function")try{e.saveSettings()}catch{}else if(typeof e.saveSettingsDebounced=="function")try{e.saveSettingsDebounced()}catch{}}get(e,r=null){let n=`${this.namespaceKey}:${e}`;if(this._cache.has(n))return this._cache.get(n);let s=this._getStorage(),o=this._getFullKey(e),a=s.getItem(o);if(a===null)return r;try{let i=JSON.parse(a);return this._cache.set(n,i),i}catch{return a}}set(e,r){let n=this._getStorage(),s=this._getFullKey(e),o=`${this.namespaceKey}:${e}`;this._cache.set(o,r);try{n.setItem(s,JSON.stringify(r))}catch(a){yc.error("\u5B58\u50A8\u5931\u8D25:",a)}}remove(e){let r=this._getStorage(),n=this._getFullKey(e),s=`${this.namespaceKey}:${e}`;this._cache.delete(s),r.removeItem(n)}has(e){let r=this._getStorage(),n=this._getFullKey(e);return r.getItem(n)!==null}clear(){if(this._getStorage()._isTavern){let r=typeof window.parent<"u"?window.parent:window;if(r.SillyTavern?.getContext){let n=r.SillyTavern.getContext();n?.extensionSettings?.[this.namespaceKey]&&(n.extensionSettings[this.namespaceKey]={},this._saveSettings(n))}}else{let r=`${this.namespaceKey}_`,n=[];for(let s=0;s<localStorage.length;s++){let o=localStorage.key(s);o&&o.startsWith(r)&&n.push(o)}n.forEach(s=>localStorage.removeItem(s))}this._cache.clear()}_getFullKey(e){return this._getStorage()._isTavern?e:`${this.namespaceKey}_${e}`}namespace(e){return new t(`${this.namespaceKey}:${e}`)}getMultiple(e){let r={};return e.forEach(n=>{r[n]=this.get(n)}),r}setMultiple(e){Object.entries(e).forEach(([r,n])=>{this.set(r,n)})}exportAll(){let e=this._getStorage(),r={};if(e._isTavern){let n=typeof window.parent<"u"?window.parent:window;if(n.SillyTavern?.getContext){let o=n.SillyTavern.getContext()?.extensionSettings?.[this.namespaceKey]||{};Object.entries(o).forEach(([a,i])=>{r[a]=typeof i=="string"?JSON.parse(i):i})}}else{let n=`${this.namespaceKey}_`;for(let s=0;s<localStorage.length;s++){let o=localStorage.key(s);if(o&&o.startsWith(n)){let a=o.slice(n.length);try{r[a]=JSON.parse(localStorage.getItem(o))}catch{r[a]=localStorage.getItem(o)}}}}return r}},j=new Kn("youyou_toolkit"),$e=new Kn("youyou_toolkit:tools"),Fe=new Kn("youyou_toolkit:presets"),ti=new Kn("youyou_toolkit:windows");bv=j});var py={};he(py,{API_STATUS:()=>Ev,fetchAvailableModels:()=>$v,getApiConfig:()=>As,getEffectiveApiConfig:()=>Oo,hasEffectiveApiPreset:()=>Do,sendApiRequest:()=>Bo,sendWithPreset:()=>Fn,testApiConnection:()=>Nv,updateApiConfig:()=>Cv,validateApiConfig:()=>ri});function Sv(){return{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,stream:!1,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}}}function mc(){return j.get(ly,Sv())}function Tv(t){j.set(ly,t)}function cy(){return j.get(wv,[])}function _v(){return j.get(vv,"")}function fc(t,e={}){let r=new Error(t);return r.allowDirectFallback=e.allowDirectFallback===!0,r}function dy(t,e="chat_completions"){let r=String(t||"").trim();if(!r)return"";let n=null;try{n=new URL(r)}catch{return r}let s=n.pathname.replace(/\/+$/,""),o=s;return e==="chat_completions"?!/\/chat\/completions$/i.test(s)&&!/\/completions$/i.test(s)&&(o=`${s||""}/chat/completions`):e==="models"&&(/\/chat\/completions$/i.test(s)?o=s.replace(/\/chat\/completions$/i,"/models"):/\/completions$/i.test(s)?o=s.replace(/\/completions$/i,"/models"):/\/models$/i.test(s)||(o=`${s||""}/models`)),n.pathname=o.replace(/\/+/g,"/"),n.toString()}function Av(t){let e=String(t||"").trim();if(!e)return"";try{let r=new URL(e);return r.pathname=r.pathname.replace(/\/chat\/completions$/i,"").replace(/\/completions$/i,"").replace(/\/models$/i,"").replace(/\/+$/,"")||"/",r.toString().replace(/\/$/,"")}catch{return e.replace(/\/chat\/completions$/i,"").replace(/\/completions$/i,"").replace(/\/models$/i,"").replace(/\/+$/,"")}}function As(){return mc().apiConfig||{}}function Cv(t){let e=mc();e.apiConfig={...e.apiConfig,...t},Tv(e)}function ri(t){let e=[];if(t.useMainApi)return{valid:!0,errors:[]};if(!t.url||!t.url.trim())e.push("API URL \u4E0D\u80FD\u4E3A\u7A7A");else try{new URL(t.url)}catch{e.push("API URL \u683C\u5F0F\u65E0\u6548")}return(!t.model||!t.model.trim())&&e.push("\u6A21\u578B\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"),{valid:e.length===0,errors:e}}function Oo(t=""){let e=mc(),r=t||_v()||"";if(r){let s=cy().find(o=>o.name===r);if(s&&s.apiConfig)return{...s.apiConfig,presetName:s.name}}return e.apiConfig||{}}function Do(t=""){return t?cy().some(r=>r?.name===t):!1}async function Fn(t,e,r={},n=null){let s=Oo(t);return await Bo(e,{...r,apiConfig:s},n)}function uy(t,e={}){let r=e.apiConfig||As();return{messages:t,model:r.model||"gpt-3.5-turbo",max_tokens:r.max_tokens||4096,temperature:r.temperature??.7,top_p:r.top_p??.9,stream:r.stream??!1,...e.extraParams}}function gc(t){let e="";if(t?.choices&&t.choices[0]?.message?.content)e=t.choices[0].message.content;else if(t?.content)e=t.content;else if(t?.text)e=t.text;else if(t?.response)e=t.response;else throw new Error(`\u65E0\u6CD5\u89E3\u6790API\u54CD\u5E94\u683C\u5F0F: ${JSON.stringify(t).slice(0,200)}`);return String(e||"").trim()}async function Bo(t,e={},r=null){let n=e.apiConfig||As(),s=n.useMainApi,o=ri(n);if(!o.valid&&!s)throw new Error(`API\u914D\u7F6E\u65E0\u6548: ${o.errors.join(", ")}`);return s?await kv(t,e,r):await Iv(t,n,e,r)}async function kv(t,e,r){let n=typeof window.parent<"u"?window.parent:window;if(!n.TavernHelper?.generateRaw)throw new Error("TavernHelper.generateRaw \u4E0D\u53EF\u7528\u3002\u8BF7\u68C0\u67E5SillyTavern\u7248\u672C\u3002");try{let s=await n.TavernHelper.generateRaw({ordered_prompts:t,should_stream:e.apiConfig?.stream??As().stream??!1,...e.extraParams});if(typeof s!="string")throw new Error("\u4E3BAPI\u8FD4\u56DE\u4E86\u975E\u9884\u671F\u7684\u54CD\u5E94\u7C7B\u578B");return s.trim()}catch(s){throw s.name==="AbortError"?s:new Error(`\u4E3BAPI\u8BF7\u6C42\u5931\u8D25: ${s.message}`)}}async function Iv(t,e,r,n){let s=typeof window.parent<"u"?window.parent:window;if(s.TavernHelper?.generateRaw)try{return await Rv(t,e,r,n,s)}catch(o){let a=String(o?.message||o||"");if(o?.name==="AbortError"||n?.aborted||a.includes("\u505C\u6B62\u6309\u94AE")||a.includes("stop button")||a.includes("Clicked stop")||a==="\u8BF7\u6C42\u5DF2\u53D6\u6D88")throw o;xv.warn("TavernHelper \u81EA\u5B9A\u4E49\u8BF7\u6C42\u5931\u8D25\uFF0C\u56DE\u9000\u5230\u540E\u5907\u94FE\u8DEF:",o)}if(s.SillyTavern?.getRequestHeaders)try{return await Mv(t,e,r,n,s)}catch(o){if(!o?.allowDirectFallback)throw o}return await Pv(t,e,r,n)}async function Rv(t,e,r,n,s){if(n?.aborted)throw new DOMException("\u8BF7\u6C42\u5DF2\u53D6\u6D88","AbortError");let o=await s.TavernHelper.generateRaw({ordered_prompts:t,should_stream:e.stream??!1,max_chat_history:0,custom_api:{apiurl:Av(e.url),key:e.apiKey||"",model:e.model||"gpt-3.5-turbo",max_tokens:e.max_tokens||4096,temperature:e.temperature??.7,top_p:e.top_p??.9},...r.extraParams||{}});return typeof o=="string"?o.trim():gc(o)}async function Mv(t,e,r,n,s){let o=String(e.url||"").trim(),a={...uy(t,{apiConfig:e,...r}),chat_completion_source:"custom",reverse_proxy:o,proxy_password:"",custom_url:o,custom_include_headers:e.apiKey?`Authorization: Bearer ${e.apiKey}`:""},i={...typeof s.SillyTavern?.getRequestHeaders=="function"?s.SillyTavern.getRequestHeaders():{},"Content-Type":"application/json"},l=null;try{l=await fetch("/api/backends/chat-completions/generate",{method:"POST",headers:i,body:JSON.stringify(a),signal:n})}catch(u){throw u?.name==="AbortError"?u:fc(`\u9152\u9986\u540E\u7AEF\u8F6C\u53D1\u8BF7\u6C42\u4E0D\u53EF\u7528\uFF0C\u5DF2\u5C1D\u8BD5\u56DE\u9000\u5230\u6D4F\u89C8\u5668\u76F4\u8FDE\u3002\u539F\u59CB\u9519\u8BEF: ${u.message}`,{allowDirectFallback:!0})}let d=await l.text().catch(()=>"");if(!l.ok){let u=[404,405,501,502].includes(l.status);throw fc(`\u9152\u9986\u540E\u7AEF\u8F6C\u53D1\u8BF7\u6C42\u5931\u8D25 (${l.status}): ${d||"Unknown error"}`,{allowDirectFallback:u})}let c=null;try{c=d?JSON.parse(d):{}}catch{let y=String(d||"").replace(/\s+/g," ").trim().slice(0,120);throw fc(`\u9152\u9986\u540E\u7AEF\u8FD4\u56DE\u4E86\u975EJSON\u5185\u5BB9\u3002\u54CD\u5E94\u7247\u6BB5: ${y||"(\u7A7A\u54CD\u5E94)"}`)}return gc(c)}async function Pv(t,e,r,n){let s=uy(t,{apiConfig:e,...r}),o=dy(e.url,"chat_completions"),a={"Content-Type":"application/json"};e.apiKey&&(a.Authorization=`Bearer ${e.apiKey}`);let i=await fetch(o,{method:"POST",headers:a,body:JSON.stringify(s),signal:n}),l=await i.text().catch(()=>"");if(!i.ok){let c=l||"Unknown error";throw new Error(`API\u8BF7\u6C42\u5931\u8D25 (${i.status}): ${c}`)}let d=null;try{d=l?JSON.parse(l):{}}catch{let u=String(l||"").replace(/\s+/g," ").trim().slice(0,120);throw new Error(`\u81EA\u5B9A\u4E49API\u8FD4\u56DE\u7684\u4E0D\u662FJSON\uFF0C\u53EF\u80FD\u662FURL\u914D\u7F6E\u9519\u8BEF\u3001\u53EA\u586B\u5199\u4E86\u7AD9\u70B9\u9996\u9875/\u57FA\u7840\u8DEF\u5F84\u3001\u6216\u8BF7\u6C42\u88AB\u91CD\u5B9A\u5411\u3002\u5F53\u524D\u4F1A\u81EA\u52A8\u5C1D\u8BD5\u8865\u5168 chat/completions \u7AEF\u70B9\uFF1B\u82E5\u4ECD\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5API URL\uFF0C\u6216\u6539\u4E3A\u542F\u7528\u201C\u4F7F\u7528SillyTavern\u4E3BAPI\u201D\u3002\u54CD\u5E94\u7247\u6BB5: ${u||"(\u7A7A\u54CD\u5E94)"}`)}return gc(d)}async function Nv(t=null){let e=t||As(),r=Date.now();try{await Bo([{role:"user",content:'Hello, this is a connection test. Please respond with "OK".'}],{apiConfig:e});let s=Date.now()-r;return{success:!0,message:`\u8FDE\u63A5\u6210\u529F (\u5EF6\u8FDF: ${s}ms)`,latency:s}}catch(n){return{success:!1,message:`\u8FDE\u63A5\u5931\u8D25: ${n.message}`,latency:Date.now()-r}}}async function $v(t=null){let e=t||As();return e.useMainApi?await Lv():await Ov(e)}async function Lv(){let t=typeof window.parent<"u"?window.parent:window;try{if(t.SillyTavern?.getContext){let e=t.SillyTavern.getContext();if(e.settings?.api_server)return[e.settings.api_server]}return["gpt-4","gpt-4-turbo","gpt-3.5-turbo","claude-3-opus","claude-3-sonnet"]}catch{return["gpt-4","gpt-3.5-turbo"]}}async function Ov(t){if(!t.url||!t.apiKey)return[];try{let e=dy(t.url,"models"),r=await fetch(e,{method:"GET",headers:{Authorization:`Bearer ${t.apiKey}`}});if(!r.ok)return[];let n=await r.json();return n.data&&Array.isArray(n.data)?n.data.map(s=>s.id||s.name).filter(Boolean).sort():[]}catch{return[]}}var xv,ly,wv,vv,Ev,Cs=O(()=>{Je();Z();xv=$.createScope("ApiConnection"),ly="settings",wv="api_presets",vv="current_preset";Ev={IDLE:"idle",CONNECTING:"connecting",SUCCESS:"success",ERROR:"error"}});var gy={};he(gy,{createPreset:()=>oi,createPresetFromCurrentConfig:()=>jv,deletePreset:()=>ai,duplicatePreset:()=>wc,exportPresets:()=>Sc,generateUniquePresetName:()=>Hv,getActiveConfig:()=>Uv,getActivePresetName:()=>vc,getAllPresets:()=>Zr,getPreset:()=>jn,getPresetNames:()=>hc,getStarredPresets:()=>Fv,importPresets:()=>Tc,presetExists:()=>zo,renamePreset:()=>xc,switchToPreset:()=>ii,togglePresetStar:()=>Kv,updatePreset:()=>bc,validatePreset:()=>Wv});function zv(){return{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}}}function my(){return j.get(Bv,zv())}function $t(){return j.get(yy,[])}function Un(t){j.set(yy,t)}function si(){return j.get(fy,"")}function ni(t){j.set(fy,t||"")}function Zr(){return $t()}function hc(){return $t().map(e=>e.name)}function jn(t){return!t||typeof t!="string"?null:$t().find(r=>r.name===t)||null}function zo(t){return!t||typeof t!="string"?!1:$t().some(r=>r.name===t)}function oi(t){let{name:e,description:r,apiConfig:n}=t;if(!e||typeof e!="string"||!e.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let s=e.trim();if(zo(s))return{success:!1,message:`\u9884\u8BBE "${s}" \u5DF2\u5B58\u5728`};let o={name:s,description:r||"",apiConfig:{url:n?.url||"",apiKey:n?.apiKey||"",model:n?.model||"",useMainApi:n?.useMainApi??!0,stream:n?.stream??!1,max_tokens:n?.max_tokens||4096,temperature:n?.temperature??.7,top_p:n?.top_p??.9},createdAt:Date.now(),updatedAt:Date.now()},a=$t();return a.push(o),Un(a),{success:!0,message:`\u9884\u8BBE "${s}" \u521B\u5EFA\u6210\u529F`,preset:o}}function bc(t,e){if(!t||typeof t!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let r=$t(),n=r.findIndex(a=>a.name===t);if(n===-1)return{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if(e.name&&e.name!==t)return{success:!1,message:"\u4E0D\u652F\u6301\u4FEE\u6539\u9884\u8BBE\u540D\u79F0\uFF0C\u8BF7\u521B\u5EFA\u65B0\u9884\u8BBE"};let s=r[n],o={...s,...e,name:s.name,updatedAt:Date.now()};return e.apiConfig&&(o.apiConfig={...s.apiConfig,...e.apiConfig}),r[n]=o,Un(r),{success:!0,message:`\u9884\u8BBE "${t}" \u66F4\u65B0\u6210\u529F`,preset:o}}function ai(t){if(!t||typeof t!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let e=$t(),r=e.findIndex(n=>n.name===t);return r===-1?{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`}:(e.splice(r,1),Un(e),si()===t&&ni(""),{success:!0,message:`\u9884\u8BBE "${t}" \u5DF2\u5220\u9664`})}function xc(t,e){if(!t||typeof t!="string")return{success:!1,message:"\u539F\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};if(!e||typeof e!="string"||!e.trim())return{success:!1,message:"\u65B0\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let r=e.trim();if(!zo(t))return{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if(zo(r))return{success:!1,message:`\u9884\u8BBE "${r}" \u5DF2\u5B58\u5728`};let n=$t(),s=n.find(o=>o.name===t);return s&&(s.name=r,s.updatedAt=Date.now(),Un(n),si()===t&&ni(r)),{success:!0,message:`\u9884\u8BBE\u5DF2\u91CD\u547D\u540D\u4E3A "${r}"`}}function wc(t,e){if(!t||typeof t!="string")return{success:!1,message:"\u6E90\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};if(!e||typeof e!="string"||!e.trim())return{success:!1,message:"\u76EE\u6807\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let r=e.trim(),n=jn(t);if(!n)return{success:!1,message:`\u6E90\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if(zo(r))return{success:!1,message:`\u9884\u8BBE "${r}" \u5DF2\u5B58\u5728`};let s={...JSON.parse(JSON.stringify(n)),name:r,createdAt:Date.now(),updatedAt:Date.now()},o=$t();return o.push(s),Un(o),{success:!0,message:`\u9884\u8BBE\u5DF2\u590D\u5236\u4E3A "${r}"`,preset:s}}function Kv(t){if(!t||typeof t!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let e=$t(),r=e.find(n=>n.name===t);return r?(r.starred=!r.starred,r.updatedAt=Date.now(),Un(e),{success:!0,message:r.starred?`\u5DF2\u5C06 "${t}" \u6DFB\u52A0\u5230\u9884\u89C8\u5217\u8868`:`\u5DF2\u5C06 "${t}" \u4ECE\u9884\u89C8\u5217\u8868\u79FB\u9664`,starred:r.starred}):{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`}}function Fv(){return $t().filter(e=>e.starred===!0)}function ii(t){if(!t)return ni(""),{success:!0,message:"\u5DF2\u5207\u6362\u5230\u5F53\u524DAPI\u914D\u7F6E"};let e=jn(t);return e?(ni(t),{success:!0,message:`\u5DF2\u5207\u6362\u5230\u9884\u8BBE "${t}"`,apiConfig:e.apiConfig}):{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`}}function vc(){return si()}function Uv(){let t=si();if(t){let r=jn(t);if(r)return{presetName:t,apiConfig:r.apiConfig}}return{presetName:"",apiConfig:my().apiConfig||{}}}function Sc(t=null){if(t){let r=jn(t);if(!r)throw new Error(`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`);return JSON.stringify(r,null,2)}let e=$t();return JSON.stringify(e,null,2)}function Tc(t,e={overwrite:!1}){let r;try{r=JSON.parse(t)}catch(a){return Dv.error("\u9884\u8BBE\u5BFC\u5165\u5931\u8D25: JSON\u89E3\u6790\u9519\u8BEF",{error:a}),{success:!1,message:"JSON\u89E3\u6790\u5931\u8D25",imported:0}}let n=Array.isArray(r)?r:[r];if(n.length===0)return{success:!1,message:"\u6CA1\u6709\u627E\u5230\u6709\u6548\u7684\u9884\u8BBE\u6570\u636E",imported:0};let s=$t(),o=0;for(let a of n){if(!a.name||typeof a.name!="string"||!a.apiConfig||typeof a.apiConfig!="object")continue;let i=s.findIndex(l=>l.name===a.name);i>=0?e.overwrite&&(a.updatedAt=Date.now(),s[i]=a,o++):(a.createdAt=a.createdAt||Date.now(),a.updatedAt=Date.now(),s.push(a),o++)}return o>0&&Un(s),{success:!0,message:`\u6210\u529F\u5BFC\u5165 ${o} \u4E2A\u9884\u8BBE`,imported:o}}function jv(t,e=""){let r=my();return oi({name:t,description:e,apiConfig:r.apiConfig})}function Wv(t){let e=[];return(!t.name||typeof t.name!="string"||!t.name.trim())&&e.push("\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"),(!t.apiConfig||typeof t.apiConfig!="object")&&e.push("\u7F3A\u5C11API\u914D\u7F6E"),{valid:e.length===0,errors:e}}function Hv(t){(!t||typeof t!="string")&&(t="\u65B0\u9884\u8BBE");let e=$t(),r=new Set(e.map(s=>s.name));if(!r.has(t))return t;let n=1;for(;r.has(`${t} (${n})`);)n++;return`${t} (${n})`}var Dv,Bv,yy,fy,ks=O(()=>{Je();Z();Dv=$.createScope("PresetManager"),Bv="settings",yy="api_presets",fy="current_preset"});var Is,Ko,cr,_c=O(()=>{nt();pt();Z();Is=$.createScope("UIManager"),Ko=class{constructor(){this.components=new Map,this.activeInstances=new Map,this.dependencies={},this.currentTab="main",this.currentSubTab={},this.initialized=!1}init(e={}){this.initialized||(this.dependencies=e.services||{},this._subscribeEvents(),this.initialized=!0,q.emit(G.UI_INITIALIZED),Is.log("\u521D\u59CB\u5316\u5B8C\u6210"))}register(e,r){return!e||!r?(Is.warn("\u65E0\u6548\u7684\u7EC4\u4EF6\u6CE8\u518C"),!1):(this.components.set(e,{id:e,...r,render:r.render||(()=>""),bindEvents:r.bindEvents||(()=>{}),destroy:r.destroy||(()=>{}),getStyles:r.getStyles||(()=>"")}),!0)}unregister(e){this.destroyInstance(e),this.components.delete(e)}getComponent(e){return this.components.get(e)}render(e,r,n={}){let s=ue();if(!s){Is.error("jQuery\u4E0D\u53EF\u7528");return}let o=this.components.get(e);if(!o){Is.error(`\u7EC4\u4EF6\u4E0D\u5B58\u5728: ${e}`);let i;typeof r=="string"?i=s(r):r&&r.jquery?i=r:r&&(i=s(r)),i?.length&&i.html(`<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u7EC4\u4EF6\u672A\u6CE8\u518C\uFF1A${e}</span></div>`);return}let a;if(typeof r=="string"?a=s(r):r&&r.jquery?a=r:r&&(a=s(r)),!Ke(a)){Is.warn("\u5BB9\u5668\u4E0D\u5B58\u5728");return}this.activeInstances.forEach((i,l)=>{i?.container?.length&&a.length&&i.container[0]===a[0]&&l!==e&&this.destroyInstance(l)}),this.destroyInstance(e);try{if(typeof o.renderTo=="function")o.renderTo(a,{...n,dependencies:this.dependencies});else{let i=o.render({...n,dependencies:this.dependencies});a.html(i),o.bindEvents(a,this.dependencies)}}catch(i){Is.error(`\u7EC4\u4EF6\u6E32\u67D3\u5931\u8D25: ${e}`,i),a.html(`<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u7EC4\u4EF6\u6E32\u67D3\u5931\u8D25\uFF1A${e}${i?.message?` - ${i.message}`:""}</span></div>`);return}this.activeInstances.set(e,{container:a,component:o,props:n}),q.emit(G.UI_RENDER_REQUESTED,{componentId:e})}destroyInstance(e){let r=this.activeInstances.get(e);r&&(r.component.destroy(r.container),this.activeInstances.delete(e))}destroyContainerInstance(e){let r=ue();if(!r||!e)return;let n;if(typeof e=="string"?n=r(e):e?.jquery?n=e:n=r(e),!n?.length)return;let s=[];this.activeInstances.forEach((o,a)=>{o?.container?.length&&o.container[0]===n[0]&&s.push(a)}),s.forEach(o=>this.destroyInstance(o))}switchTab(e){let r=this.currentTab;this.currentTab=e,q.emit(G.UI_TAB_CHANGED,{tabId:e,oldTab:r})}getCurrentTab(){return this.currentTab}switchSubTab(e,r){this.currentSubTab[e]=r,q.emit(G.UI_SUBTAB_CHANGED,{mainTab:e,subTab:r})}getCurrentSubTab(e){return this.currentSubTab[e]||""}getAllStyles(){let e="";return this.components.forEach((r,n)=>{r.getStyles&&(e+=r.getStyles())}),e}injectStyles(e=document){let r="yyt-component-styles";if(e.getElementById(r))return;let n=e.createElement("style");n.id=r,n.textContent=this.getAllStyles(),(e.head||e.documentElement).appendChild(n)}setDependency(e,r){this.dependencies[e]=r}getDependency(e){return this.dependencies[e]}_subscribeEvents(){q.on(G.PRESET_UPDATED,()=>{}),q.on(G.TOOL_UPDATED,()=>{})}},cr=new Ko});function f(t,e={},...r){let n=document.createElement(t);if(e.className&&(n.className=e.className),e.text!==void 0&&e.text!==null&&(n.textContent=String(e.text)),e.html!==void 0&&e.html!==null&&(n.innerHTML=String(e.html)),e.attrs)for(let[s,o]of Object.entries(e.attrs))o==null||o===!1||n.setAttribute(s,o===!0?"":String(o));if(e.style&&Object.assign(n.style,e.style),e.dataset)for(let[s,o]of Object.entries(e.dataset))n.dataset[s]=String(o);for(let s of r)re(n,s);return n}function re(t,e){if(!(e==null||e===!1)){if(Array.isArray(e)){for(let r of e)re(t,r);return}if(typeof e=="string"||typeof e=="number"){t.appendChild(document.createTextNode(String(e)));return}if(e instanceof Node){t.appendChild(e);return}if(e&&e.el instanceof Node){t.appendChild(e.el);return}}}function hy(){let t=new Map;return{on(e,r){return!e||typeof r!="function"?()=>{}:(t.has(e)||t.set(e,new Set),t.get(e).add(r),()=>this.off(e,r))},off(e,r){let n=t.get(e);n&&n.delete(r)},emit(e,...r){let n=t.get(e);if(n)for(let s of[...n])try{s(...r)}catch{}},clear(){t.clear()}}}function Ec(t,e){if(!t||!e)return null;if(t._id===e)return t;let r=t._children;if(!r)return null;let n=r instanceof Map?[...r.values()]:Array.isArray(r)?r:[];for(let s of n){let o=Ec(s,e);if(o)return o}return null}function je({id:t=null,kind:e="control",el:r=null,style:n=null,className:s=null,attrs:o=null}={}){if(r){if(n&&Object.assign(r.style,n),s){let i=String(s).trim().split(/\s+/).filter(Boolean);i.length&&r.classList.add(...i)}if(o)for(let[i,l]of Object.entries(o))l===!1||l==null||r.setAttribute(i,l===!0?"":String(l))}let a=hy();return{_id:t||null,_kind:e,_children:null,_emitter:a,on(i,l){return a.on(i,l)},off(i,l){a.off(i,l)},getControl(i){return Ec(this,i)},get(){},set(i){},destroy(){if(a.clear(),this._children){let i=this._children instanceof Map?[...this._children.values()]:Array.isArray(this._children)?this._children:[];for(let l of i)try{l?.destroy?.()}catch{}this._children instanceof Map?this._children.clear():Array.isArray(this._children)&&(this._children.length=0)}if(this.el?.parentNode)try{this.el.parentNode.removeChild(this.el)}catch{}}}}var wt=O(()=>{});function se(t={}){let{id:e=null,label:r="",icon:n=null,variant:s="default",size:o="normal",disabled:a=!1,title:i=null,onClick:l=null}=t,d=["yyt-btn"];s==="primary"?d.push("yyt-btn-primary"):s==="danger"?d.push("yyt-btn-danger"):s==="ghost"&&d.push("yyt-btn-secondary"),o==="small"&&d.push("yyt-btn-small");let c=f("button",{className:d.join(" "),attrs:{type:"button",disabled:a?"disabled":null,title:i}}),u=null;n&&(u=f("span",{className:"yyt-btn-icon-glyph",text:n}),c.appendChild(u));let y=f("span",{text:r});c.appendChild(y);let p={...je({id:e,kind:"button",el:c,style:t.style,className:t.className,attrs:t.attrs}),el:c,setLabel(m){y.textContent=String(m||"")},setIcon(m){u&&(u.textContent=String(m||""))},setDisabled(m){m?c.setAttribute("disabled","disabled"):c.removeAttribute("disabled")},isDisabled(){return c.hasAttribute("disabled")},get(){return y.textContent},set(m){this.setLabel(m)}};return c.addEventListener("click",m=>{if(!c.hasAttribute("disabled")){if(typeof l=="function")try{l(m,p)}catch(g){console.error("[button] onClick \u5F02\u5E38",g)}p._emitter.emit("click",m)}}),p}var by=O(()=>{wt()});function Te(t={}){let{id:e=null,placeholder:r="",value:n="",type:s="text",disabled:o=!1,maxLength:a=null,onInput:i=null,onChange:l=null}=t,d=f("input",{className:"yyt-input",attrs:{type:s,placeholder:r,disabled:o?"disabled":null,maxlength:a!=null?String(a):null}});d.value=n==null?"":String(n);let c={...je({id:e,kind:"textInput",el:d,style:t.style,className:t.className,attrs:t.attrs}),el:d,get(){return d.value},set(u,{silent:y=!1}={}){d.value=u==null?"":String(u),y||c._emitter.emit("change",d.value)},setPlaceholder(u){d.placeholder=u==null?"":String(u)},setDisabled(u){d.disabled=!!u},focus(){d.focus()},select(){d.select()}};return d.addEventListener("input",()=>{if(typeof i=="function")try{i(d.value,c)}catch(u){console.error("[textInput] onInput \u5F02\u5E38",u)}c._emitter.emit("input",d.value)}),d.addEventListener("change",()=>{if(typeof l=="function")try{l(d.value,c)}catch(u){console.error("[textInput] onChange \u5F02\u5E38",u)}c._emitter.emit("change",d.value)}),d.addEventListener("blur",()=>c._emitter.emit("blur",d.value)),c}var xy=O(()=>{wt()});function Me(t={}){let{id:e=null,options:r=[],value:n="",placeholder:s=null,disabled:o=!1,onChange:a=null}=t,i=f("select",{className:"yyt-select",attrs:{disabled:o?"disabled":null}});function l(c,u){if(i.innerHTML="",s!==null){let y=f("option",{text:s,attrs:{value:"",disabled:"disabled",selected:u?null:"selected"}});i.appendChild(y)}for(let y of c){let p=f("option",{text:y.label??String(y.value),attrs:{value:String(y.value),selected:String(y.value)===String(u)?"selected":null,disabled:y.disabled?"disabled":null}});i.appendChild(p)}}l(r,n);let d={...je({id:e,kind:"select",el:i,style:t.style,className:t.className,attrs:t.attrs}),el:i,get(){return i.value},set(c,{silent:u=!1}={}){i.value=c==null?"":String(c),u||d._emitter.emit("change",i.value)},setOptions(c,u){l(c||[],u??i.value)},setDisabled(c){i.disabled=!!c}};return i.addEventListener("change",()=>{if(typeof a=="function")try{a(i.value,d)}catch(c){typeof console<"u"&&console.error&&console.error("[selectInput] onChange \u5F02\u5E38",c)}d._emitter.emit("change",i.value)}),d}var wy=O(()=>{wt()});function Ze(t={}){let{id:e=null,label:r="",hint:n="",checked:s=!1,disabled:o=!1,onChange:a=null}=t,i=f("label",{className:"yyt-toggle-label"});r&&i.appendChild(f("span",{text:r})),n&&i.appendChild(f("span",{className:"yyt-toggle-hint",text:n}));let l=f("input",{attrs:{type:"checkbox",disabled:o?"disabled":null}});l.checked=!!s;let d=f("span",{className:"yyt-toggle-slider"}),c=f("label",{className:"yyt-toggle"});c.appendChild(l),c.appendChild(d);let u=f("div",{className:"yyt-toggle-row"});u.appendChild(i),u.appendChild(c),i.addEventListener("click",p=>{p.preventDefault(),!l.disabled&&(l.checked=!l.checked,l.dispatchEvent(new Event("change",{bubbles:!0})))});let y={...je({id:e,kind:"toggle",el:u,style:t.style,className:t.className,attrs:t.attrs}),el:u,get(){return!!l.checked},set(p,{silent:m=!1}={}){l.checked=!!p,m||y._emitter.emit("change",!!p)},setDisabled(p){l.disabled=!!p}};return l.addEventListener("change",()=>{let p=!!l.checked;if(typeof a=="function")try{a(p,y)}catch(m){console.error("[toggle] onChange \u5F02\u5E38",m)}y._emitter.emit("change",p)}),y}var vy=O(()=>{wt()});var Sy=O(()=>{wt()});var Ty=O(()=>{wt()});function Wt(t={}){let{id:e=null,label:r="",hint:n="",control:s=null,inline:o=!1}=t,a=f("div",{className:"yyt-form-group",style:o?{flexDirection:"row",alignItems:"center",gap:"12px"}:null});r&&a.appendChild(f("label",{text:r,style:o?{flex:"0 0 auto",minWidth:"120px"}:null}));let i=f("div",{style:o?{flex:"1",minWidth:"0"}:null});s&&re(i,s),a.appendChild(i),n&&a.appendChild(f("div",{className:"yyt-form-hint",text:n}));let l=s?[s]:[];return{...je({id:e,kind:"formRow",el:a,style:t.style,className:t.className,attrs:t.attrs}),el:a,_children:l,get(){return s?.get?.()},set(d,c){s?.set?.(d,c)},setControl(d){i.innerHTML="",l.length=0,d&&(re(i,d),l.push(d))}}}var _y=O(()=>{wt()});function Ac(t={}){let{id:e=null,icon:r=null,name:n="",desc:s="",active:o=!1,disabled:a=!1,actions:i=[],onClick:l=null}=t,d=["yyt-list-row"];o&&d.push("yyt-list-row-active"),a&&d.push("yyt-list-row-disabled");let c=f("div",{className:d.join(" "),style:a?{opacity:"0.5",pointerEvents:"none"}:null});r&&c.appendChild(f("div",{className:"yyt-list-row-icon",text:r}));let u=f("div",{className:"yyt-list-row-main"}),y=f("div",{className:"yyt-list-row-name",text:n});u.appendChild(y);let p=null;s&&(p=f("div",{className:"yyt-list-row-desc",text:s}),u.appendChild(p)),c.appendChild(u);let m=null;if(i&&i.length){m=f("div",{className:"yyt-list-row-actions"});for(let h of i)re(m,h);c.appendChild(m)}typeof l=="function"&&(c.style.cursor="pointer",c.addEventListener("click",h=>{h.target.closest(".yyt-list-row-actions")||(l(h,g),g._emitter.emit("click",h))}));let g={...je({id:e,kind:"listRow",el:c,style:t.style,className:t.className,attrs:t.attrs}),el:c,_children:i||[],setName(h){y.textContent=h==null?"":String(h)},setDesc(h){if(p)p.textContent=h==null?"":String(h);else{if(!h)return;p=f("div",{className:"yyt-list-row-desc",text:h}),u.appendChild(p)}},setActive(h){h?c.classList.add("yyt-list-row-active"):c.classList.remove("yyt-list-row-active")},setDisabled(h){h?(c.classList.add("yyt-list-row-disabled"),c.style.opacity="0.5",c.style.pointerEvents="none"):(c.classList.remove("yyt-list-row-disabled"),c.style.opacity="",c.style.pointerEvents="")}};return g}var Ey=O(()=>{wt()});function dr(t={}){let{id:e=null,heading:r="",icon:n=null,actions:s=[],content:o=[]}=t,a=f("div",{className:"yyt-flow-section"}),i=null,l=null,d=null;if(r||n||s&&s.length){if(i=f("div",{className:"yyt-flow-heading"}),n&&(l=f("span",{className:"yyt-flow-heading-icon"}),re(l,n),i.appendChild(l)),r&&i.appendChild(f("span",{text:r})),s&&s.length){d=f("div",{className:"yyt-flow-heading-action"});for(let p of s)re(d,p);i.appendChild(d)}a.appendChild(i)}let c=f("div",{className:"yyt-flow-content"}),u=[];for(let p of o||[])p&&(re(c,p),u.push(p));for(let p of s||[])p&&typeof p=="object"&&p.el&&u.push(p);return a.appendChild(c),{...je({id:e,kind:"flowSection",el:a,style:t.style,className:t.className,attrs:t.attrs}),el:a,_children:u,appendContent(p){p&&(re(c,p),p&&typeof p=="object"&&p.el&&u.push(p))},clearContent(){c.innerHTML="";let p=u.filter(m=>(s||[]).includes(m));u.length=0;for(let m of p)u.push(m)},setHeading(p){if(!i)return;let m=i.querySelector("span:not(.yyt-flow-heading-icon):not(.yyt-flow-heading-action)");m&&(m.textContent=p==null?"":String(p))},setIcon(p){l&&(l.textContent=p==null?"":String(p))}}}var Ay=O(()=>{wt()});function li(){try{if(window.parent&&window.parent!==window&&window.parent.document)return window.parent.document}catch{}return document}function Cc({title:t,width:e,wide:r}){let n=`yyt-ctrl-dialog-${++Gv}`,s=f("div",{className:"yyt-dialog-overlay",attrs:{"data-dialog-id":n}}),o={};e&&e!=="380px"&&(o.width=e),o.maxHeight="calc(100vh - 32px)";let a=f("div",{className:`yyt-dialog${r?" yyt-dialog-wide":""}`,style:o}),i=f("div",{className:"yyt-dialog-header"});i.appendChild(f("span",{className:"yyt-dialog-title",text:t||""}));let l=f("button",{className:"yyt-dialog-close",attrs:{type:"button","aria-label":"close"},html:'<i class="fa-solid fa-times"></i>'});i.appendChild(l),a.appendChild(i);let d=f("div",{className:"yyt-dialog-body"});a.appendChild(d);let c=f("div",{className:"yyt-dialog-footer"});return a.appendChild(c),s.appendChild(a),{overlay:s,body:d,footer:c,closeBtn:l,id:n}}function kc(t){let e=li();return e?.body?(e.body.appendChild(t),!0):!1}function Ic(t){if(t?.parentNode)try{t.parentNode.removeChild(t)}catch{}}function Yv(t={}){let{title:e="\u8BF7\u786E\u8BA4",message:r="",confirmText:n="\u786E\u5B9A",cancelText:s="\u53D6\u6D88",danger:o=!1,width:a="380px"}=t;return new Promise(i=>{let{overlay:l,body:d,footer:c,closeBtn:u}=Cc({title:e,width:a,wide:!1}),y=(li()||document).activeElement,p=f("div",{style:{color:"var(--yyt-text-secondary)",fontSize:"13px",lineHeight:"1.6"},text:r});d.appendChild(p);let m=f("button",{className:"yyt-btn yyt-btn-secondary",attrs:{type:"button"},text:s}),g=f("button",{className:`yyt-btn ${o?"yyt-btn-danger":"yyt-btn-primary"}`,attrs:{type:"button"},text:n});c.appendChild(m),c.appendChild(g);let h=!1,b=v=>{if(!h){h=!0,Ic(l);try{y?.focus()}catch{}i(v)}};if(g.addEventListener("click",()=>b(!0)),m.addEventListener("click",()=>b(!1)),u.addEventListener("click",()=>b(!1)),l.addEventListener("click",v=>{v.target===l&&b(!1)}),l.addEventListener("keydown",v=>{v.key==="Escape"?(v.stopPropagation(),b(!1)):v.key==="Enter"&&(v.stopPropagation(),b(!0))}),!kc(l)){i(!1);return}(o?m:g).focus()})}function Vv(t={}){let{title:e="\u8F93\u5165",message:r="",defaultValue:n="",placeholder:s="",confirmText:o="\u786E\u5B9A",cancelText:a="\u53D6\u6D88",validate:i=null,width:l="380px"}=t;return new Promise(d=>{let{overlay:c,body:u,footer:y,closeBtn:p}=Cc({title:e,width:l,wide:!1}),m=(li()||document).activeElement;r&&u.appendChild(f("div",{style:{color:"var(--yyt-text-secondary)",fontSize:"13px",lineHeight:"1.6",marginBottom:"8px"},text:r}));let g=f("input",{className:"yyt-input",attrs:{type:"text",placeholder:s}});g.value=String(n||""),u.appendChild(g);let h=f("div",{style:{color:"var(--yyt-danger, #f87171)",fontSize:"12px",marginTop:"6px",minHeight:"14px"}});u.appendChild(h);let b=f("button",{className:"yyt-btn yyt-btn-secondary",attrs:{type:"button"},text:a}),v=f("button",{className:"yyt-btn yyt-btn-primary",attrs:{type:"button"},text:o});y.appendChild(b),y.appendChild(v);let x=!1,T=w=>{if(!x){x=!0,Ic(c);try{m?.focus()}catch{}d(w)}},E=()=>{let w=g.value.trim();if(typeof i=="function"){let _=i(w);if(_){h.textContent=_,g.focus();return}}T(w||null)};if(v.addEventListener("click",E),b.addEventListener("click",()=>T(null)),p.addEventListener("click",()=>T(null)),c.addEventListener("click",w=>{w.target===c&&T(null)}),g.addEventListener("keydown",w=>{w.key==="Enter"&&(w.stopPropagation(),E())}),c.addEventListener("keydown",w=>{w.key==="Escape"&&(w.stopPropagation(),T(null))}),!kc(c)){d(null);return}g.focus(),g.select()})}function Jv(t={}){let{title:e="",body:r=null,buttons:n=[],width:s="480px",wide:o=!1,onMounted:a=null}=t,{overlay:i,body:l,footer:d,closeBtn:c}=Cc({title:e,width:s,wide:o}),u=(li()||document).activeElement;r&&re(l,r);let y=!1,p,m=new Promise(h=>{p=h}),g=h=>{if(!y){y=!0,Ic(i);try{u?.focus()}catch{}p(h)}};for(let h of n){let b=h.variant==="primary"?"yyt-btn-primary":h.variant==="danger"?"yyt-btn-danger":"yyt-btn-secondary",v=f("button",{className:`yyt-btn ${b}`,attrs:{type:"button"},text:h.label||""});v.addEventListener("click",()=>{try{h.onClick?.(g,l)}catch(x){qv.error("button onClick error",x),g(null)}}),d.appendChild(v)}if(c.addEventListener("click",()=>g(null)),i.addEventListener("click",h=>{h.target===i&&g(null)}),i.addEventListener("keydown",h=>{h.key==="Escape"&&(h.stopPropagation(),g(null))}),!kc(i))p(null);else if(typeof a=="function")try{a({overlay:i,body:l,close:g})}catch{}return{el:i,body:l,close:g,result:m}}var qv,Gv,we,Fo=O(()=>{wt();Z();qv=$.createScope("Dialog"),Gv=0;we={confirm:Yv,prompt:Vv,custom:Jv}});function Rc(t={}){let{id:e=null,items:r=[],align:n="start",gap:s="8px",wrap:o=!0}=t,i=f("div",{className:"yyt-toolbar",style:{display:"flex",alignItems:"center",justifyContent:{start:"flex-start",end:"flex-end",center:"center","space-between":"space-between"}[n]||"flex-start",gap:s,flexWrap:o?"wrap":"nowrap"}}),l=[];for(let d of r)d&&(re(i,d),l.push(d));return{...je({id:e,kind:"toolbar",el:i,style:t.style,className:t.className,attrs:t.attrs}),el:i,_children:l,addItem(d){d&&(re(i,d),l.push(d))},clear(){for(;i.firstChild;)i.removeChild(i.firstChild);for(let d of l)try{d?.destroy?.()}catch{}l.length=0}}}var Cy=O(()=>{wt()});function Mc(t={}){let{id:e=null,name:r="",desc:n="",active:s=!1,disabled:o=!1,builtin:a=!1,readonly:i=!1,metaChips:l=[],actions:d=[],onClick:c=null}=t,u=a||i,y=["yyt-list-row","yyt-preset-list-item"];s&&y.push("yyt-list-row-active"),o&&y.push("yyt-list-row-disabled"),u&&y.push("yyt-preset-list-item-readonly");let p=f("div",{className:y.join(" "),style:o?{opacity:"0.5",pointerEvents:"none"}:null}),m=f("span",{className:"yyt-preset-dot",style:{width:"8px",height:"8px",borderRadius:"50%",flexShrink:"0",marginRight:"8px",background:s?"var(--yyt-accent, #7bb7ff)":"transparent",border:s?"none":"1px solid var(--yyt-border, rgba(255,255,255,0.15))",transition:"background 0.15s ease"}});p.appendChild(m);let g=f("div",{className:"yyt-list-row-main",style:{flex:"1",minWidth:"0"}}),h=f("div",{style:{display:"flex",alignItems:"center",gap:"8px"}}),b=f("div",{className:"yyt-list-row-name",text:r,style:{fontWeight:"600"}});h.appendChild(b),a&&h.appendChild(f("span",{className:"yyt-preset-badge yyt-preset-badge-builtin",text:"\u5185\u7F6E",style:{fontSize:"10px",padding:"2px 6px",borderRadius:"999px",background:"var(--yyt-surface-3, rgba(255,255,255,0.06))",color:"var(--yyt-text-muted, rgba(255,255,255,0.5))",border:"1px solid var(--yyt-border, rgba(255,255,255,0.1))"}})),g.appendChild(h);let v=null;n&&(v=f("div",{className:"yyt-list-row-desc",text:n}),g.appendChild(v)),p.appendChild(g);let x=null;if(Array.isArray(l)&&l.length){x=f("div",{className:"yyt-preset-meta-chips",style:{display:"flex",gap:"6px",flexWrap:"wrap"}});for(let _ of l)_&&x.appendChild(f("span",{className:"yyt-preset-meta-chip",text:String(_),style:{fontSize:"11px",padding:"2px 8px",borderRadius:"999px",background:"var(--yyt-surface-2, rgba(255,255,255,0.04))",color:"var(--yyt-text-secondary, rgba(255,255,255,0.6))",border:"1px solid var(--yyt-border-soft, rgba(255,255,255,0.04))"}}));p.appendChild(x)}let T=null,E=u?d.filter(_=>_?._kind!=="button"||!_._destructive):d;if(E&&E.length){T=f("div",{className:"yyt-list-row-actions"});for(let _ of E)re(T,_);p.appendChild(T)}typeof c=="function"&&(p.style.cursor="pointer",p.addEventListener("click",_=>{_.target.closest(".yyt-list-row-actions")||(c(_,w),w._emitter.emit("click",_))}));let w={...je({id:e,kind:"presetListItem",el:p,style:t.style,className:t.className,attrs:t.attrs}),el:p,_children:d||[],setActive(_){_?p.classList.add("yyt-list-row-active"):p.classList.remove("yyt-list-row-active"),m.style.background=_?"var(--yyt-accent, #7bb7ff)":"transparent",m.style.border=_?"none":"1px solid var(--yyt-border, rgba(255,255,255,0.15))"},setName(_){b.textContent=_==null?"":String(_)},setDesc(_){if(v)v.textContent=_==null?"":String(_);else{if(!_)return;v=f("div",{className:"yyt-list-row-desc",text:_}),g.appendChild(v)}},setDisabled(_){_?(p.classList.add("yyt-list-row-disabled"),p.style.opacity="0.5",p.style.pointerEvents="none"):(p.classList.remove("yyt-list-row-disabled"),p.style.opacity="",p.style.pointerEvents="")}};return w}var ky=O(()=>{wt()});function Pc(t={}){let{id:e=null,values:r=[],placeholder:n="\u8F93\u5165\u540E\u56DE\u8F66\u6DFB\u52A0",suggestions:s=null,allowDuplicates:o=!1,maxChips:a=0,chipVariant:i="default",onChange:l=null,onAdd:d=null,onRemove:c=null}=t,u=s&&s.length?`yyt-chip-dl-${++Qv}`:null,y=f("div",{className:"yyt-chip-group",style:{display:"flex",flexWrap:"wrap",gap:"6px",padding:"6px 8px",borderRadius:"var(--yyt-radius-sm, 6px)",border:"1px solid var(--yyt-control-border, rgba(255,255,255,0.08))",background:"var(--yyt-control-bg, transparent)",minHeight:"36px",alignItems:"center"}}),p=[],m={type:"text",placeholder:n,autocomplete:"off"};u&&(m.list=u);let g=f("input",{className:"yyt-chip-input",attrs:m,style:{flex:"1 1 auto",minWidth:"120px",border:"none",outline:"none",background:"transparent",color:"var(--yyt-text, inherit)",fontSize:"12px",padding:"4px 0"}}),h=null;if(u){h=f("datalist",{attrs:{id:u}});for(let P of s)h.appendChild(f("option",{attrs:{value:String(P)}}));y.appendChild(h)}function b(){return i==="danger"?"rgba(248,113,113,0.12)":i==="soft"?"var(--yyt-surface-2, rgba(255,255,255,0.04))":"var(--yyt-accent-soft, rgba(123,183,255,0.15))"}function v(){return i==="danger"?"rgba(248,113,113,0.25)":"var(--yyt-border, rgba(255,255,255,0.1))"}function x(){return i==="danger"?"#f87171":"var(--yyt-text, inherit)"}function T(P){let C=f("span",{className:"yyt-chip",style:{display:"inline-flex",alignItems:"center",gap:"4px",padding:"3px 4px 3px 10px",borderRadius:"999px",background:b(),border:`1px solid ${v()}`,color:x(),fontSize:"11px",fontWeight:"500"}});C.appendChild(f("span",{text:P,style:{lineHeight:"1"}}));let N=f("button",{attrs:{type:"button","aria-label":"remove"},text:"\xD7",style:{border:"none",background:"transparent",color:"inherit",cursor:"pointer",padding:"0 4px",fontSize:"14px",lineHeight:"1",opacity:"0.7"}});return N.addEventListener("click",W=>{W.stopPropagation(),_(P)}),N.addEventListener("mouseenter",()=>{N.style.opacity="1"}),N.addEventListener("mouseleave",()=>{N.style.opacity="0.7"}),C.appendChild(N),C}function E(){let P=[];for(let C of y.children)C===g||C===h||P.push(C);for(let C of P)y.removeChild(C);for(let C of p)y.insertBefore(T(C),g)}function w(P){let C=String(P||"").trim();if(!C||!o&&p.includes(C)||a>0&&p.length>=a)return!1;p.push(C),E();try{d?.(C,p.slice())}catch(N){console.error("[chipGroup] onAdd \u5F02\u5E38",N)}try{l?.(p.slice())}catch(N){console.error("[chipGroup] onChange \u5F02\u5E38",N)}return I._emitter.emit("change",p.slice()),!0}function _(P){let C=p.indexOf(P);if(C<0)return!1;p.splice(C,1),E();try{c?.(P,p.slice())}catch(N){console.error("[chipGroup] onRemove \u5F02\u5E38",N)}try{l?.(p.slice())}catch(N){console.error("[chipGroup] onChange \u5F02\u5E38",N)}return I._emitter.emit("change",p.slice()),!0}function A(){if(p.length!==0){p=[],E();try{l?.([])}catch(P){console.error("[chipGroup] onChange \u5F02\u5E38",P)}I._emitter.emit("change",[])}}for(let P of r){let C=String(P||"").trim();C&&(!o&&p.includes(C)||p.push(C))}y.appendChild(g),E(),g.addEventListener("keydown",P=>{if(P.key==="Enter"||P.key===","){P.preventDefault();let C=g.value.trim();C&&w(C)&&(g.value="")}else P.key==="Backspace"&&!g.value&&p.length&&_(p[p.length-1])}),g.addEventListener("blur",()=>{let P=g.value.trim();P&&w(P)&&(g.value="")}),y.addEventListener("click",P=>{P.target===y&&g.focus()});let I={...je({id:e,kind:"chipGroup",el:y,style:t.style,className:t.className,attrs:t.attrs}),el:y,get(){return p.slice()},set(P){p=[];for(let C of Array.isArray(P)?P:[]){let N=String(C||"").trim();N&&(!o&&p.includes(N)||p.push(N))}E();try{l?.(p.slice())}catch(C){console.error("[chipGroup] onChange \u5F02\u5E38",C)}I._emitter.emit("change",p.slice())},addChip:w,removeChip:_,clear:A,setSuggestions(P){if(h){for(;h.firstChild;)h.removeChild(h.firstChild);for(let C of P||[])h.appendChild(f("option",{attrs:{value:String(C)}}))}}};return I}var Qv,Iy=O(()=>{wt();Qv=0});var Ry=O(()=>{wt()});var It=O(()=>{by();xy();wy();vy();Sy();Ty();_y();Ey();Ay();Fo();Cy();ky();Iy();Ry();wt()});function My(t){return t?t.length!==void 0&&typeof t.get=="function"?t.get(0):t:null}function Xv(t){return typeof t=="string"&&t.startsWith("builtin_")}function en(t={}){let{id:e,kind:r="generic",panelTitle:n="\u9884\u8BBE\u7BA1\u7406",panelHint:s="",store:o,renderEditor:a,renderExtras:i=null,renderListItemMeta:l=null,hasSwitchToButton:d=!1,onSwitchTo:c=null}=t;if(!o||typeof o.listPresets!="function")throw new Error("createPresetManagerPanel: store \u7F3A\u5C11\u5FC5\u8981\u7684 listPresets \u65B9\u6CD5");if(typeof a!="function")throw new Error("createPresetManagerPanel: \u5FC5\u987B\u63D0\u4F9B renderEditor");return{id:e,kind:r,renderTo(u){let y=My(u);if(!y)return;if(y._yytPresetPanelCleanup)try{y._yytPresetPanelCleanup()}catch{}let p=()=>this.renderTo(u),m=o.listPresets(),g=typeof o.getCurrentPresetId=="function"?o.getCurrentPresetId():"",h=f("div",{className:"yyt-preset-manager-panel",style:{display:"flex",flexDirection:"column",gap:"14px"}});if(n||s){let P=f("div",{style:{display:"flex",flexDirection:"column",gap:"4px"}});n&&P.appendChild(f("div",{text:n,style:{fontSize:"15px",fontWeight:"700",color:"var(--yyt-text)"}})),s&&P.appendChild(f("div",{text:s,style:{fontSize:"12px",color:"var(--yyt-text-secondary)",lineHeight:"1.6"}})),h.appendChild(P)}let b=[],v=f("div",{style:{display:"flex",flexDirection:"column"}});if(m.length===0)v.appendChild(f("div",{text:'\u6682\u65E0\u9884\u8BBE\u3002\u70B9\u51FB\u4E0B\u65B9"\u65B0\u5EFA"\u521B\u5EFA\u7B2C\u4E00\u4E2A\u9884\u8BBE\u3002',style:{fontSize:"12px",color:"var(--yyt-text-muted)",padding:"12px 0",textAlign:"center"}}));else for(let P of m){let C=P.id===g,N=Xv(P.id),W=typeof l=="function"?l(P)||[]:[],H=[];d&&typeof c=="function"&&H.push(se({label:C?"\u2713 \u5DF2\u52A0\u8F7D":"\u52A0\u8F7D",size:"small",variant:C?"ghost":"primary",disabled:C,onClick:te=>{te.stopPropagation();try{c(P.id)}catch(z){Wn.warn("onSwitchTo \u5F02\u5E38",{err:z})}p()}})),H.push(se({label:"\u590D\u5236",size:"small",variant:"ghost",title:"\u590D\u5236\u4E3A\u7528\u6237\u9884\u8BBE",onClick:async te=>{te.stopPropagation();try{let z=o.duplicatePreset(P.id);z?.id&&typeof o.setCurrentPresetId=="function"&&o.setCurrentPresetId(z.id),p()}catch(z){Wn.warn("duplicate \u5F02\u5E38",{err:z})}}})),N||(H.push(se({label:"\u270E",size:"small",variant:"ghost",title:"\u91CD\u547D\u540D",onClick:async te=>{te.stopPropagation();let z=await we.prompt({title:"\u91CD\u547D\u540D\u9884\u8BBE",defaultValue:P.name,placeholder:"\u9884\u8BBE\u540D",validate:J=>J?null:"\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"});z&&z!==P.name&&(o.renamePreset(P.id,z),p())}})),H.push(se({label:"\xD7",size:"small",variant:"ghost",title:"\u5220\u9664",onClick:async te=>{te.stopPropagation(),await we.confirm({title:"\u5220\u9664\u9884\u8BBE",message:`\u786E\u8BA4\u5220\u9664\u300C${P.name}\u300D\uFF1F\u6B64\u64CD\u4F5C\u4E0D\u53EF\u64A4\u9500\u3002`,confirmText:"\u5220\u9664",danger:!0})&&(o.deletePreset(P.id),p())}})));let ee=Mc({id:P.id,name:P.name,desc:P.description,active:C,builtin:N,metaChips:W,actions:H,onClick:()=>{typeof o.setCurrentPresetId=="function"&&o.setCurrentPresetId(P.id),p()}});v.appendChild(ee.el)}let x=se({label:"+ \u65B0\u5EFA\u9884\u8BBE",size:"small",variant:"primary",onClick:async()=>{let P=await we.prompt({title:"\u65B0\u5EFA\u9884\u8BBE",placeholder:"\u9884\u8BBE\u540D\uFF08\u5FC5\u586B\uFF09",validate:C=>C?null:"\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"});if(P)try{let C=o.createPreset({name:P});C?.id&&typeof o.setCurrentPresetId=="function"&&o.setCurrentPresetId(C.id),p()}catch(C){Wn.warn("createPreset \u5931\u8D25",{err:C}),await we.confirm({title:"\u521B\u5EFA\u5931\u8D25",message:String(C?.message||C),confirmText:"\u786E\u5B9A"})}}}),T=dr({heading:"\u9884\u8BBE\u9009\u62E9",icon:"\u{1F4CB}",actions:[x.el],content:[v]});b.push(T),h.appendChild(T.el);let E=g?m.find(P=>P.id===g):null;if(E){let P=null;try{P=a(E,{readonly:!1,onChange:N=>{if(!(!N||typeof N!="object"))try{o.updatePreset(E.id,N)}catch(W){Wn.warn("updatePreset \u5931\u8D25",{err:W})}},refresh:p})}catch(N){Wn.error("renderEditor \u5F02\u5E38",{err:N}),P=f("div",{text:`\u7F16\u8F91\u5668\u6E32\u67D3\u5F02\u5E38\uFF1A${N?.message||N}`,style:{color:"var(--yyt-danger, #f87171)",fontSize:"12px"}})}let C=dr({heading:`\u7F16\u8F91\u300C${E.name}\u300D`,icon:"\u270E",content:[P].filter(Boolean)});if(b.push(C),h.appendChild(C.el),typeof i=="function"){let N=null;try{N=i(E,{refresh:p})}catch(W){Wn.warn("renderExtras \u5F02\u5E38",{err:W})}if(N){let W=dr({heading:"\u9644\u52A0",icon:"\u{1F527}",content:[N]});b.push(W),h.appendChild(W.el)}}}else m.length>0&&h.appendChild(f("div",{text:"\u8BF7\u5728\u4E0A\u65B9\u5217\u8868\u9009\u62E9\u4E00\u4E2A\u9884\u8BBE\u4EE5\u7F16\u8F91",style:{fontSize:"12px",color:"var(--yyt-text-muted)",padding:"16px",textAlign:"center",border:"1px dashed var(--yyt-border, rgba(255,255,255,0.08))",borderRadius:"var(--yyt-radius-sm, 6px)"}}));let w=se({label:"\u2B06 \u5BFC\u5165",size:"small",variant:"ghost",onClick:async()=>{await Zv(o,p)}}),_=se({label:"\u2B07 \u5BFC\u51FA",size:"small",variant:"ghost",onClick:()=>{e0(o,r)}}),A=se({label:"\u6E05\u7A7A\u5168\u90E8",size:"small",variant:"ghost",onClick:async()=>{await we.confirm({title:"\u6E05\u7A7A\u6240\u6709\u9884\u8BBE",message:"\u6B64\u64CD\u4F5C\u4F1A\u5220\u9664\u6240\u6709\u7528\u6237\u9884\u8BBE\uFF08\u5185\u7F6E\u9884\u8BBE\u4E0D\u53D7\u5F71\u54CD\uFF09\uFF0C\u4E0D\u53EF\u64A4\u9500\u3002",confirmText:"\u6E05\u7A7A",danger:!0})&&typeof o.resetAll=="function"&&(o.resetAll(),p())}}),I=Rc({items:[w,_,A],align:"end",gap:"8px"});h.appendChild(I.el),y.innerHTML="",y.appendChild(h),y._yytPresetPanelCleanup=()=>{for(let P of b)try{P.destroy()}catch{}delete y._yytPresetPanelCleanup}},destroy(u){let y=My(u);if(y?._yytPresetPanelCleanup)try{y._yytPresetPanelCleanup()}catch{}},getStyles(){return""}}}async function Zv(t,e){if(typeof t.importPresets!="function"){await we.confirm({title:"\u4E0D\u652F\u6301\u5BFC\u5165",message:"\u5F53\u524D\u9884\u8BBE\u7C7B\u578B\u4E0D\u652F\u6301\u5BFC\u5165\u3002",confirmText:"\u786E\u5B9A"});return}let r=f("textarea",{className:"yyt-textarea",attrs:{placeholder:"\u7C98\u8D34\u5BFC\u51FA\u7684 JSON"},style:{width:"100%",minHeight:"180px",fontSize:"12px",fontFamily:"monospace"}}),n=we.custom({title:"\u5BFC\u5165\u9884\u8BBE",width:"520px",body:r,buttons:[{label:"\u53D6\u6D88",variant:"ghost",onClick:o=>o(null)},{label:"\u4ECE\u6587\u4EF6\u2026",variant:"ghost",onClick:()=>{let o=f("input",{attrs:{type:"file",accept:"application/json,.json"}});o.addEventListener("change",()=>{let a=o.files?.[0];if(!a)return;let i=new FileReader;i.onload=()=>{r.value=String(i.result||""),r.focus()},i.readAsText(a)}),o.click()}},{label:"\u5BFC\u5165",variant:"primary",onClick:async o=>{let a=r.value.trim();if(!a){o(null);return}let i;try{i=JSON.parse(a)}catch(l){await we.confirm({title:"JSON \u89E3\u6790\u5931\u8D25",message:String(l?.message||l),confirmText:"\u786E\u5B9A"});return}try{let l=t.importPresets(i);o(l)}catch(l){await we.confirm({title:"\u5BFC\u5165\u5931\u8D25",message:String(l?.message||l),confirmText:"\u786E\u5B9A"})}}}]});setTimeout(()=>r.focus(),0);let s=await n.result;s&&(s.added>0||s.imported>0)&&e()}function e0(t,e){if(typeof t.exportAll!="function"){we.confirm({title:"\u4E0D\u652F\u6301\u5BFC\u51FA",message:"\u5F53\u524D\u9884\u8BBE\u7C7B\u578B\u4E0D\u652F\u6301\u5BFC\u51FA\u3002",confirmText:"\u786E\u5B9A"});return}let r=t.exportAll(),n=JSON.stringify(r,null,2),s=f("textarea",{className:"yyt-textarea",style:{width:"100%",minHeight:"220px",fontSize:"12px",fontFamily:"monospace"}});s.value=n,s.readOnly=!0,we.custom({title:`\u5BFC\u51FA ${e||""} \u9884\u8BBE`,width:"600px",body:s,buttons:[{label:"\u5173\u95ED",variant:"ghost",onClick:o=>o(null)},{label:"\u590D\u5236\u5230\u526A\u8D34\u677F",variant:"ghost",onClick:async()=>{try{await navigator.clipboard.writeText(n)}catch{s.select();try{document.execCommand("copy")}catch{}}}},{label:"\u4E0B\u8F7D JSON",variant:"primary",onClick:()=>{try{let o=new Blob([n],{type:"application/json"}),a=URL.createObjectURL(o),i=f("a",{attrs:{href:a,download:`${e||"preset"}_${Date.now()}.json`}});document.body.appendChild(i),i.click(),setTimeout(()=>{try{document.body.removeChild(i)}catch{}try{URL.revokeObjectURL(a)}catch{}},100)}catch(o){Wn.warn("\u4E0B\u8F7D\u5931\u8D25",{err:o})}}}]})}var Wn,Uo=O(()=>{It();Z();Wn=$.createScope("PresetManagerBase")});var Ny={};he(Ny,{ApiPresetPanel:()=>Py,default:()=>s0});function r0(t,{onChange:e,readonly:r}){let n=f("div",{style:{display:"flex",flexDirection:"column",gap:"12px"}}),s=t.apiConfig||{};re(n,Wt({label:"\u63CF\u8FF0",control:Te({value:t.description||"",placeholder:"\u53EF\u9009 \u2014 \u5907\u6CE8\u7528\u9014",disabled:r,onChange:i=>e({description:i})})})),re(n,Ze({label:"\u4F7F\u7528\u4E3B API",hint:"\u5F00\u542F\u540E\u5FFD\u7565\u4E0B\u65B9 URL/Key/Model\uFF0C\u76F4\u63A5\u590D\u7528 SillyTavern \u4E3B\u8FDE\u63A5",checked:s.useMainApi!==!1,disabled:r,onChange:i=>e({apiConfig:{...s,useMainApi:i}})})),re(n,Ze({label:"\u6D41\u5F0F\u8F93\u51FA\uFF08stream\uFF09",hint:"\u9010\u5B57\u63A5\u6536\u54CD\u5E94",checked:s.stream===!0,disabled:r,onChange:i=>e({apiConfig:{...s,stream:i}})})),re(n,Wt({label:"API URL",control:Te({value:s.url||"",placeholder:"https://api.example.com/v1",disabled:r,onChange:i=>e({apiConfig:{...s,url:i}})})})),re(n,Wt({label:"API Key",control:Te({value:s.apiKey||"",placeholder:"sk-...",disabled:r,attrs:{type:"password"},onChange:i=>e({apiConfig:{...s,apiKey:i}})})})),re(n,Wt({label:"\u6A21\u578B",control:Te({value:s.model||"",placeholder:"gpt-4 / gemini-pro / claude-...",disabled:r,onChange:i=>e({apiConfig:{...s,model:i}})})}));let o=f("div",{style:{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:"10px"}});function a(i,l,d,c="1"){let u=f("div",{style:{display:"flex",flexDirection:"column",gap:"4px"}});u.appendChild(f("label",{text:i,style:{fontSize:"11px",color:"var(--yyt-text-secondary)",fontWeight:"600"}}));let y=f("input",{className:"yyt-input",attrs:{type:"number",step:c,disabled:r?"disabled":null},style:{padding:"6px 10px",fontSize:"12px"}});return y.value=String(s[l]??d),y.addEventListener("change",()=>{let p=Number(y.value);Number.isFinite(p)&&e({apiConfig:{...s,[l]:p}})}),u.appendChild(y),u}return o.appendChild(a("max_tokens","max_tokens",4096,"1")),o.appendChild(a("temperature","temperature",.7,"0.05")),o.appendChild(a("top_p","top_p",.9,"0.05")),re(n,o),n}function n0(t){let e=t.apiConfig||{},r=[];return e.useMainApi!==!1?r.push("\u4E3B API"):r.push(e.model||"\u81EA\u5B9A\u4E49"),t.starred&&r.push("\u2605"),r}var tn,t0,Py,s0,$y=O(()=>{It();ks();Z();Uo();tn=$.createScope("ApiPresetPanel"),t0={listPresets(){return Zr().map(t=>({id:t.name,name:t.name,description:t.description||"",apiConfig:t.apiConfig||{},starred:t.starred===!0,createdAt:t.createdAt,updatedAt:t.updatedAt}))},getPreset(t){if(!t)return null;let e=jn(t);return e?{id:e.name,...e,description:e.description||""}:null},getCurrentPresetId(){return vc()||""},setCurrentPresetId(t){if(!t)return!1;try{return!!ii(t)}catch(e){return tn.warn("switchToPreset \u5931\u8D25",{err:e}),!1}},createPreset(t){let e=String(t?.name||"").trim();if(!e)return tn.warn("createPreset: name \u7F3A\u5931"),null;let r=oi({name:e,description:t?.description||"",apiConfig:t?.apiConfig||{}});return r?.success?{id:r.preset.name,...r.preset,description:r.preset.description||""}:(tn.warn("createPreset \u5931\u8D25",{msg:r?.message}),null)},updatePreset(t,e){if(!t)return null;let r=bc(t,e);return r?.success?{id:r.preset.name,...r.preset,description:r.preset.description||""}:(tn.warn("updatePreset \u5931\u8D25",{id:t,msg:r?.message}),null)},deletePreset(t){if(!t)return!1;try{let e=ai(t);return!!(e?.success??e===!0)}catch(e){return tn.warn("deletePreset \u5931\u8D25",{err:e}),!1}},duplicatePreset(t,e={}){if(!t)return null;let r=e.nameSuffix||"_\u526F\u672C",n=`${t}${r}`;try{let s=wc(t,n);return s?.success?{id:s.preset.name,...s.preset,description:s.preset.description||""}:null}catch(s){return tn.warn("duplicatePreset \u5931\u8D25",{err:s}),null}},renamePreset(t,e){if(!t||!e)return null;try{let r=xc(t,e);return r?.success?{id:r.preset?.name||e,...r.preset,description:r.preset?.description||""}:null}catch(r){return tn.warn("renamePreset \u5931\u8D25",{err:r}),null}},exportAll(){let t=Sc();try{return{version:1,exportedAt:Date.now(),presets:JSON.parse(t)}}catch{return{version:1,exportedAt:Date.now(),presets:[]}}},importPresets(t){if(!t||typeof t!="object")return{added:0};let e=Array.isArray(t.presets)?t.presets:[t],r=JSON.stringify(e);return{added:Tc(r,{overwrite:!1})?.imported||0}},resetAll(){let t=Zr();for(let e of t)try{ai(e.name)}catch{}}};Py=en({id:"apiPresetPanel",kind:"api",panelTitle:"API \u9884\u8BBE",panelHint:'\u7BA1\u7406\u591A\u7EC4 API \u8FDE\u63A5\u914D\u7F6E\u3002\u70B9\u51FB"\u52A0\u8F7D"\u6FC0\u6D3B\u67D0\u4E2A\u9884\u8BBE\u4F5C\u4E3A\u5F53\u524D API\uFF1B\u5176\u4ED6\u5DE5\u5177\u53EF\u5728\u914D\u7F6E\u9762\u677F\u4E2D\u6309\u9884\u8BBE\u540D\u5F15\u7528\u3002',store:t0,renderEditor:r0,renderListItemMeta:n0,hasSwitchToButton:!0,onSwitchTo:t=>{try{ii(t)}catch(e){tn.warn("switchToPreset",{err:e})}}}),s0=Py});function $c(){return`wb_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`}function nn(){let t=Fe.get(Nc);return!t||typeof t!="object"?{}:t}function di(t){Fe.set(Nc,t)}function qn(t){return typeof t=="string"&&t.startsWith(o0)}function Ly(t){return qn(t)&&ci.find(e=>e.id===t)||null}function Lc(t){if(!Array.isArray(t)){ci=[];return}ci=t.map(e=>rn({...e,id:String(e?.id||"")})).filter(e=>qn(e.id))}function rn(t={}){let e=String(t.id||$c()),r=Array.isArray(t.bookList)?t.bookList.map(n=>({bookName:String(n?.bookName||""),enabled:n?.enabled!==!1,entryOverrides:n?.entryOverrides&&typeof n.entryOverrides=="object"?n.entryOverrides:{}})).filter(n=>n.bookName):[];return{id:e,name:String(t.name||"").trim()||"\u672A\u547D\u540D\u9884\u8BBE",description:String(t.description||""),bindingMode:t.bindingMode===wr.CUSTOM?wr.CUSTOM:wr.CHARACTER_CARD,includeDisabled:t.includeDisabled===!0,bookList:r,createdAt:Number.isFinite(t.createdAt)?t.createdAt:Date.now(),updatedAt:Number.isFinite(t.updatedAt)?t.updatedAt:Date.now()}}function a0(){let t=nn(),e=new Set,r=[];for(let s of ci){let o=t[s.id];o?(r.push(rn(o)),e.add(s.id)):r.push(s)}let n=Object.values(t).map(rn).filter(s=>!e.has(s.id)).sort((s,o)=>o.updatedAt-s.updatedAt);return r.push(...n),r}function Wo(t){if(!t)return null;let e=nn();return e[t]?rn(e[t]):qn(t)?Ly(t):null}function Oc(){let t=Fe.get(jo);return typeof t=="string"&&t?t:""}function i0(){let t=Oc();return t?Wo(t):null}function l0(t){if(t&&qn(t))return Fe.set(jo,t),q.emit(G.PRESET_ACTIVATED,{kind:"worldbook",id:t}),!0;let e=nn();return t&&!e[t]?(Hn.warn(`setCurrentPresetId \u627E\u4E0D\u5230\u9884\u8BBE: ${t}`),!1):(Fe.set(jo,t||""),q.emit(G.PRESET_ACTIVATED,{kind:"worldbook",id:t}),!0)}function ui(t={}){let e=rn({...t,id:$c(),createdAt:Date.now(),updatedAt:Date.now()}),r=nn();return r[e.id]=e,di(r),q.emit(G.PRESET_CREATED,{kind:"worldbook",id:e.id}),Hn.info(`\u521B\u5EFA\u9884\u8BBE: ${e.id} (${e.name})`),e}function Oy(t,e={},{silent:r=!1}={}){if(!t)return null;let n=nn(),s=n[t];if(!s&&qn(t)&&(s=Ly(t)),!s)return Hn.warn(`updatePreset \u627E\u4E0D\u5230\u9884\u8BBE: ${t}`),null;let o=rn({...s,...e,id:t,createdAt:s.createdAt,updatedAt:Date.now()});return n[t]=o,di(n),r||q.emit(G.PRESET_UPDATED,{kind:"worldbook",id:t}),o}function c0(t){if(!t)return!1;if(qn(t))return Hn.warn(`\u62D2\u7EDD\u5220\u9664\u5185\u7F6E\u9884\u8BBE: ${t}`),!1;let e=nn();return e[t]?(delete e[t],di(e),Oc()===t&&Fe.set(jo,""),q.emit(G.PRESET_DELETED,{kind:"worldbook",id:t}),Hn.info(`\u5220\u9664\u9884\u8BBE: ${t}`),!0):!1}function d0(t,{nameSuffix:e=" \u526F\u672C"}={}){let r=Wo(t);return r?ui({...r,id:void 0,name:`${r.name}${e}`}):null}function u0(t,e){return qn(t)?(Hn.warn(`\u62D2\u7EDD\u91CD\u547D\u540D\u5185\u7F6E\u9884\u8BBE: ${t}`),null):Oy(t,{name:String(e||"").trim()||"\u672A\u547D\u540D\u9884\u8BBE"})}function p0(){return{version:1,exportedAt:Date.now(),presets:Object.values(nn()).map(rn)}}function y0(t){if(!t||typeof t!="object")return{added:0,skipped:0};let e=Array.isArray(t.presets)?t.presets:[],r=nn(),n=0,s=0;for(let o of e){let a=rn({...o,id:$c(),createdAt:Date.now(),updatedAt:Date.now()});r[a.id]=a,n+=1}return di(r),n>0&&q.emit(G.PRESET_IMPORTED,{kind:"worldbook",count:n}),{added:n,skipped:s}}function f0(){Fe.set(Nc,{}),Fe.set(jo,""),Hn.info("\u5DF2\u6E05\u7A7A\u6240\u6709\u4E16\u754C\u4E66\u9884\u8BBE")}var Hn,Nc,jo,wr,o0,ci,vt,Rs=O(()=>{Je();nt();Z();Hn=$.createScope("WorldbookPresetStore"),Nc="worldbook_presets",jo="worldbook_current_preset",wr=Object.freeze({CHARACTER_CARD:"character_card",CUSTOM:"custom"});o0="builtin_worldbook_",ci=[];vt={listPresets:a0,getPreset:Wo,getCurrentPresetId:Oc,getCurrentPreset:i0,setCurrentPresetId:l0,createPreset:ui,updatePreset:Oy,deletePreset:c0,duplicatePreset:d0,renamePreset:u0,exportAll:p0,importPresets:y0,resetAll:f0,BINDING_MODES:wr}});function sn(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window}function pi(){return sn()?.SillyTavern||null}function Le(t){return t==null?"":String(t).trim()}function g0(t){if(!t)return"";let e=[t.content,t.mes,t.message,t.text,t?.data?.content];for(let r of e)if(typeof r=="string"&&r.trim())return r.trim();return""}function h0(t){let e=String(t?.role||"").trim().toLowerCase();return e==="assistant"||e==="ai"?"assistant":e==="system"?"system":e==="user"||t?.is_user===!0?"user":t?.is_system===!0?"system":"assistant"}function By(t=""){let e=String(t||"").trim();if(!e)return"empty";let r=0;for(let n=0;n<e.length;n+=1)r=(r<<5)-r+e.charCodeAt(n),r|=0;return`fp_${Math.abs(r).toString(36)}`}function zy(t={}){let e=Le(t.chatId)||"chat_default",r=Le(t.messageId)||"latest";return`${e}::${r}`}function Ky(t={}){let e=zy(t),r=Le(t.effectiveSwipeId)||"swipe:current",n=Le(t.assistantContentFingerprint)||"empty";return`${e}::${r}::${n}`}function b0(t={}){let e=Ky(t),r=Le(t.eventType)||"MANUAL",n=Le(t.traceId)||Fy("manual");return`${e}::${r}::${n}`}function Fy(t="trace"){return`${t}_${Date.now()}_${Math.random().toString(36).slice(2,8)}`}function Uy(){let t=pi();try{let e=t?.getContext?.()||null;if(Array.isArray(e?.chat))return e.chat}catch{}return Array.isArray(t?.chat)?t.chat:[]}function jy(t=[]){let e=[],r=null,n=null;return t.forEach((s,o)=>{let a=h0(s),i=g0(s);if(!i)return;let l=Le(s?.messageId??s?.message_id??s?.id??s?.mid??s?.mesid??s?.chat_index??o),d=Le(s?.swipe_id??s?.swipeId??s?.swipe??""),c={role:a,content:i,sourceId:l,swipeId:d,raw:s,index:o};e.push(c),a==="user"&&(r=c),a==="assistant"&&(n=c)}),{messages:e,lastUserMessage:r,lastAiMessage:n}}function x0(t,e,r){return Le(e?.chatId??e?.chat_id??t?.chatId??t?.chat_id??t?.this_chid??r?.id??"chat_default")||"chat_default"}async function Dc(){let t=pi();if(!t)return null;try{let e=t.this_chid,r=t.characters||[];if(e>=0&&e<r.length){let n=r[e];return{id:e,name:n?.name||"",description:n?.description||"",personality:n?.personality||"",scenario:n?.scenario||"",firstMes:n?.first_mes||"",mesExample:n?.mes_example||""}}}catch(e){m0.error("\u83B7\u53D6\u89D2\u8272\u4FE1\u606F\u5931\u8D25:",e)}return null}function w0(t="",e=null){let r=String(t||""),n=e?.YouYouToolkit_toolOutputs;return n&&typeof n=="object"&&Object.values(n).forEach(s=>{let o=String(s?.blockText||s?.content||"").trim();o&&r.includes(o)&&(r=r.replace(o,"").trimEnd())}),r.trim()}function v0(t,e={}){let r=Array.isArray(t?.messages)?t.messages:[],n=Le(e.messageId),s=Le(e.swipeId);if(!n)return t?.lastAiMessage||null;let o=r.filter(i=>i.role==="assistant"),a=o.find(i=>i.sourceId!==n?!1:s?Le(i.swipeId)===s:!0);return a||o.find(i=>i.sourceId===n)||null}function Wy({api:t,stContext:e,character:r,conversation:n,targetAssistantMessage:s,runSource:o="MANUAL"}={}){let a=n?.messages||[],i=n?.lastUserMessage||null,l=Le(s?.sourceId)||"",d=Le(s?.swipeId)||"swipe:current",c=s?.content||"",u=w0(c,s?.raw||null),y=By(c),p=By(u),m=x0(t,e,r),g=Fy(String(o||"manual").toLowerCase()),h=zy({chatId:m,messageId:l}),b=Ky({chatId:m,messageId:l,effectiveSwipeId:d,assistantContentFingerprint:p});return{startedAt:Date.now(),runSource:o,traceId:g,chatId:m,messageId:l,confirmedAssistantMessageId:l,slotBindingKey:h,slotRevisionKey:b,slotTransactionId:b0({chatId:m,messageId:l,effectiveSwipeId:d,assistantContentFingerprint:p,eventType:o,traceId:g}),executionKey:b,lastAiMessage:c,assistantContentFingerprint:y,assistantBaseText:u,assistantBaseFingerprint:p,lastAiMessageSwipeId:d,confirmedAssistantSwipeId:d,effectiveSwipeId:d,sourceMessageId:l,sourceSwipeId:d,lastUserMessage:i?.content||"",userMessage:i?.content||"",targetAssistantMessage:s,chatMessages:a,characterCard:r,chatHistory:a,input:{userMessage:i?.content||"",lastAiMessage:c,assistantBaseText:u,extractedContent:"",previousToolOutput:"",context:{character:r?.name||"",chatLength:a.length||0}},config:{},status:"pending"}}async function Gn({runSource:t="MANUAL"}={}){let e=pi(),r=e?.getContext?.()||null,n=await Dc(),s=Uy(),o=jy(s),a=o?.lastAiMessage||null;return Wy({api:e,stContext:r,character:n,conversation:o,targetAssistantMessage:a,runSource:t})}async function Yn({messageId:t,swipeId:e="",runSource:r="AUTO"}={}){let n=pi(),s=n?.getContext?.()||null,o=await Dc(),a=Uy(),i=jy(a),l=v0(i,{messageId:t,swipeId:e});return Wy({api:n,stContext:s,character:o,conversation:i,targetAssistantMessage:l,runSource:r})}var m0,Vn=O(()=>{Z();m0=$.createScope("ExecutionContext")});function Ho(){try{if(typeof TavernHelper<"u"&&TavernHelper)return TavernHelper}catch{}return sn()?.TavernHelper||null}function Hy(){try{if(typeof SillyTavern<"u"&&SillyTavern)return SillyTavern}catch{}return sn()?.SillyTavern||null}function Ms(t){return Array.isArray(t)?Array.from(new Set(t.map(e=>String(e||"").trim()).filter(Boolean))):[]}function Bc(t){if(Array.isArray(t))return t.map(e=>typeof e=="string"?e:e&&typeof e=="object"?e.name||e.id||e.title||JSON.stringify(e):String(e??""));if(t&&typeof t=="object"){let e={};return Object.keys(t).forEach(r=>{let n=t[r];Array.isArray(n)?e[r]=n.map(s=>typeof s=="string"?s:s&&typeof s=="object"?s.name||s.id||s.title||"[object]":String(s??"")):n&&typeof n=="object"?e[r]="[object]":e[r]=n}),e}return t}function T0(t={}){let e=typeof t.content=="string"?t.content.trim():"";if(!e)return"";let r=[t.comment,t.key,t.keysecondary,t.text].map(n=>String(n||"").trim()).find(Boolean);return r&&r!==e?`## ${r}
${e}`:e}function yi(){return Array.isArray(zc)?[...zc]:[]}async function fi(t){if(t||(t=Ho()),!t||typeof t.getCharLorebooks!="function")return[];try{let e=await Promise.resolve(t.getCharLorebooks({type:"all"}));return Ms([e?.primary,e?.secondary,...Array.isArray(e?.additional)?e.additional:[]])}catch(e){return Jn.warn("\u83B7\u53D6\u89D2\u8272\u7ED1\u5B9A\u4E16\u754C\u4E66\u5931\u8D25:",e),[]}}async function _0(t,e){if(t&&typeof t.getLorebooks=="function")try{let r=Ms(await Promise.resolve(t.getLorebooks()));if(r.length>0)return r}catch(r){Jn.warn("\u83B7\u53D6\u5168\u90E8\u4E16\u754C\u4E66\u5217\u8868\u5931\u8D25:",r)}if(e&&typeof e.getWorldBooks=="function")try{let r=await Promise.resolve(e.getWorldBooks()),n=Ms(Array.isArray(r)?r.map(s=>s?.name??s):[]);if(n.length>0)return n}catch(r){Jn.warn("\u4ECE SillyTavern \u83B7\u53D6\u4E16\u754C\u4E66\u5217\u8868\u5931\u8D25:",r)}return[]}async function qo(){let t=Ho(),e=Hy(),r={checkedAt:Date.now(),hasGlobalTavernHelper:(()=>{try{return typeof TavernHelper<"u"&&!!TavernHelper}catch{return!1}})(),hasParentTavernHelper:!!sn()?.TavernHelper,hasGlobalSillyTavern:(()=>{try{return typeof SillyTavern<"u"&&!!SillyTavern}catch{return!1}})(),hasParentSillyTavern:!!sn()?.SillyTavern,helperKeys:t?Object.keys(t).sort():[],stKeys:e?Object.keys(e).sort():[],getLorebooksType:typeof t?.getLorebooks,getCharLorebooksType:typeof t?.getCharLorebooks,getLorebookEntriesType:typeof t?.getLorebookEntries,getWorldBooksType:typeof e?.getWorldBooks,characterWorldbooks:[],allWorldbooks:[],combinedWorldbooks:[],rawResults:{},errors:[]};try{r.rawResults.getLorebooks=t&&typeof t.getLorebooks=="function"?Bc(await Promise.resolve(t.getLorebooks())):"[unavailable]"}catch(a){r.errors.push(`getLorebooks: ${a?.message||a}`)}try{r.rawResults.getCharLorebooks=t&&typeof t.getCharLorebooks=="function"?Bc(await Promise.resolve(t.getCharLorebooks({type:"all"}))):"[unavailable]"}catch(a){r.errors.push(`getCharLorebooks: ${a?.message||a}`)}try{r.rawResults.getWorldBooks=e&&typeof e.getWorldBooks=="function"?Bc(await Promise.resolve(e.getWorldBooks())):"[unavailable]"}catch(a){r.errors.push(`getWorldBooks: ${a?.message||a}`)}let n=await fi(t),s=await _0(t,e),o=Ms([...n,...s]);return r.characterWorldbooks=[...n],r.allWorldbooks=[...s],r.combinedWorldbooks=[...o],S0=r,zc=o,[...o]}async function mi(t){let e="";if(typeof t=="string"?e=t:t&&typeof t=="object"&&(e=t?.worldbooks?.presetId||""),!e)return"";let r=Wo(e);if(!r)return Jn.warn(`buildSelectedWorldbookContent: \u9884\u8BBE\u4E0D\u5B58\u5728 ${e}`),"";let n=r.includeDisabled===!0,s=[];if(r.bindingMode==="character_card"){let l=Ho(),d=Hy(),c=await fi(l),u=new Map((r.bookList||[]).map(y=>[String(y.bookName||""),y]));for(let y of Ms(c)){let p=u.get(y);p&&p.enabled===!1||s.push(y)}}else s=(r.bookList||[]).filter(l=>l&&l.bookName&&l.enabled!==!1).map(l=>l.bookName);if(s=Ms(s),s.length===0)return"";let o=Ho();if(!o||typeof o.getLorebookEntries!="function")return Jn.warn("TavernHelper.getLorebookEntries \u4E0D\u53EF\u7528\uFF0C\u65E0\u6CD5\u8BFB\u53D6\u4E16\u754C\u4E66\u5185\u5BB9\u3002"),"";let a=new Map((r.bookList||[]).map(l=>[l.bookName,l.entryOverrides||{}])),i=[];for(let l of s)try{let d=await o.getLorebookEntries(l),c=Array.isArray(d)?d:[],u=a.get(l)||{},p=c.filter(m=>n||m?.enabled!==!1&&!m?.disable).filter(m=>{let g=u[String(m?.uid??"")];return g&&typeof g.enabled=="boolean"?g.enabled:!0}).map(T0).filter(Boolean).join(`

`);p&&i.push(`[\u4E16\u754C\u4E66\uFF1A${l}]
${p}`)}catch(d){Jn.warn(`\u8BFB\u53D6\u4E16\u754C\u4E66\u5931\u8D25: ${l}`,d)}return i.join(`

---

`)}async function qy(t){if(!t)return[];let e=Ho();if(!e||typeof e.getLorebookEntries!="function")return[];try{let r=await e.getLorebookEntries(t);return Array.isArray(r)?r:[]}catch(r){return Jn.warn(`getEntriesForBook \u5931\u8D25: ${t}`,r),[]}}var Jn,zc,S0,Go=O(()=>{Vn();Z();Rs();Jn=$.createScope("ToolWorldbookService"),zc=[],S0=null});function Gy(t){if(!t)return"";let e=String(t).trim();return e=e.replace(/([a-z0-9])([A-Z])/g,"$1_$2"),e.toUpperCase()}function gi(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window}function tr(){try{return gi()?.SillyTavern||null}catch{return null}}function on(t){try{return(t||tr())?.getContext?.()||null}catch{return null}}function Kc(t,e){if(!t)return null;let r=typeof t?.on=="function"||typeof t?.addListener=="function",n=typeof t?.off=="function"||typeof t?.removeListener=="function";return!r||!n?null:{source:e,eventSource:t,capabilities:{on:typeof t?.on=="function",off:typeof t?.off=="function",addListener:typeof t?.addListener=="function",removeListener:typeof t?.removeListener=="function"}}}function E0(){let t=gi(),e=tr(),r=on(e),s=[Kc(e?.eventSource,"SillyTavern.eventSource"),Kc(r?.eventSource,"SillyTavern.getContext().eventSource"),Kc(t?.eventSource,"topWindow.eventSource")].filter(Boolean)[0]||null,o=e?.eventTypes||e?.event_types||r?.eventTypes||r?.event_types||t?.eventTypes||t?.event_types||{};return{topWindow:t,api:e,context:r,eventSource:s?.eventSource||null,eventTypes:o,source:s?.source||"unavailable",capabilities:s?.capabilities||null,hasBridge:!!s?.eventSource}}var Ht,Pe,A0,Yy,Fc,et,Or=O(()=>{Z();Ht=$.createScope("HostEvents"),Pe=Object.freeze({APP_READY:"APP_READY",MESSAGE_SENT:"MESSAGE_SENT",MESSAGE_RECEIVED:"MESSAGE_RECEIVED",MESSAGE_UPDATED:"MESSAGE_UPDATED",MESSAGE_DELETED:"MESSAGE_DELETED",MESSAGE_EDITED:"MESSAGE_EDITED",MESSAGE_SWIPED:"MESSAGE_SWIPED",USER_MESSAGE_RENDERED:"USER_MESSAGE_RENDERED",CHARACTER_MESSAGE_RENDERED:"CHARACTER_MESSAGE_RENDERED",IMPERSONATE_READY:"IMPERSONATE_READY",GENERATION_STARTED:"GENERATION_STARTED",GENERATION_STOPPED:"GENERATION_STOPPED",GENERATION_ENDED:"GENERATION_ENDED",GENERATION_AFTER_COMMANDS:"GENERATION_AFTER_COMMANDS",CHAT_CHANGED:"CHAT_CHANGED",CHAT_CREATED:"CHAT_CREATED",CHAT_DELETED:"CHAT_DELETED",CHARACTER_PAGE_LOADED:"CHARACTER_PAGE_LOADED",CHARACTER_EDITOR_OPENED:"CHARACTER_EDITOR_OPENED",CHARACTER_EDITED:"CHARACTER_EDITED",WORLDINFO_UPDATED:"WORLDINFO_UPDATED"});A0=1500,Yy=20,Fc=class{constructor(){this._bridge=null,this._pending=[],this._initAttempts=0,this._retryTimer=null,this._readyResolvers=[],this._initialized=!1,this._disposed=!1}subscribe(e,r,n={}){if(!e||typeof r!="function")return Ht.warn("subscribe \u65E0\u6548\u53C2\u6570",{eventKey:e,handlerType:typeof r}),()=>{};if(this._disposed)return Ht.warn("subscribe \u5728 dispose \u4E4B\u540E\u88AB\u8C03\u7528",{eventKey:e}),()=>{};let s={key:Gy(e),rawKey:e,handler:r,options:n,attached:!1,_hostName:"",_hostUnsubscribe:null,_disposed:!1};return this._pending.push(s),this._ensureInitialized(),this._bridge?.hasBridge&&this._attachEntry(s),()=>{if(s._disposed)return;s._disposed=!0;let o=this._pending.indexOf(s);if(o>=0&&this._pending.splice(o,1),s.attached&&typeof s._hostUnsubscribe=="function")try{s._hostUnsubscribe()}catch(a){Ht.warn("\u53D6\u6D88\u5BBF\u4E3B\u8BA2\u9605\u5931\u8D25",{event:s._hostName,error:a})}}}async emit(e,...r){if(this._ensureInitialized(),!this._bridge?.hasBridge)return Ht.debug("emit \u65F6\u5BBF\u4E3B\u6865\u672A\u5C31\u7EEA\uFF0C\u8DF3\u8FC7",{eventKey:e}),!1;let n=this._resolveHostEventName(e);if(!n)return!1;let{eventSource:s}=this._bridge;try{if(typeof s?.emit=="function")return await s.emit(n,...r),!0;if(typeof s?.dispatch=="function")return await s.dispatch(n,...r),!0}catch(o){Ht.warn("emit \u629B\u9519",{eventKey:e,hostName:n,error:o})}return!1}ready({timeoutMs:e=1e4}={}){return this._ensureInitialized(),this._bridge?.hasBridge?Promise.resolve(!0):new Promise(r=>{let n=!1,s=a=>{n||(n=!0,r(a))},o=e>0?setTimeout(()=>s(!1),e):null;this._readyResolvers.push(a=>{o&&clearTimeout(o),s(a)})})}describe(){this._ensureInitialized();let e=this._bridge?.eventTypes||{};return{initialized:this._initialized,source:this._bridge?.source||"unavailable",hasBridge:!!this._bridge?.hasBridge,initAttempts:this._initAttempts,retryScheduled:!!this._retryTimer,pendingCount:this._pending.filter(r=>!r.attached).length,attachedCount:this._pending.filter(r=>r.attached).length,availableEvents:Object.keys(e).slice(0,100)}}reinit(){if(this._disposed)return!1;for(let e of this._pending){if(e.attached&&typeof e._hostUnsubscribe=="function")try{e._hostUnsubscribe()}catch{}e.attached=!1,e._hostUnsubscribe=null,e._hostName=""}return this._bridge=null,this._initialized=!1,this._initAttempts=0,this._retryTimer&&(clearTimeout(this._retryTimer),this._retryTimer=null),this._ensureInitialized()}dispose(){this._retryTimer&&(clearTimeout(this._retryTimer),this._retryTimer=null);for(let e of this._pending){if(e.attached&&typeof e._hostUnsubscribe=="function")try{e._hostUnsubscribe()}catch{}e._disposed=!0}this._pending=[],this._readyResolvers=[],this._bridge=null,this._initialized=!1,this._disposed=!0}_ensureInitialized(){if(this._disposed)return!1;if(this._initialized&&this._bridge?.hasBridge)return!0;this._initAttempts+=1;let e=E0();if(this._bridge=e,this._initialized=!0,!e.hasBridge)return Ht.debug(`\u5BBF\u4E3B\u6865\u672A\u5C31\u7EEA (attempt ${this._initAttempts})`,{source:e.source}),this._scheduleRetry(),!1;Ht.info("\u5BBF\u4E3B\u6865\u5DF2\u5C31\u7EEA",{source:e.source,eventTypesCount:Object.keys(e.eventTypes).length});for(let n of this._pending)!n.attached&&!n._disposed&&this._attachEntry(n);let r=this._readyResolvers.slice();this._readyResolvers=[];for(let n of r)try{n(!0)}catch{}return!0}_scheduleRetry(){if(!this._retryTimer){if(this._initAttempts>=Yy){Ht.warn(`\u5DF2\u8FBE\u6700\u5927\u91CD\u8BD5\u6B21\u6570 (${Yy})\uFF0C\u505C\u6B62\u91CD\u8BD5`);let e=this._readyResolvers.slice();this._readyResolvers=[];for(let r of e)try{r(!1)}catch{}return}this._retryTimer=setTimeout(()=>{this._retryTimer=null,this._initialized=!1,this._ensureInitialized()},A0)}}_resolveHostEventName(e){let r=Gy(e),n=this._bridge?.eventTypes||{};if(n[r])return n[r];let s=r.toLowerCase();if(n[s])return n[s];let o=String(e).trim();return o&&o===o.toLowerCase()?o:s}_attachEntry(e){if(!this._bridge?.hasBridge||e.attached||e._disposed)return;let r=this._resolveHostEventName(e.rawKey);if(!r){Ht.warn("\u65E0\u6CD5\u89E3\u6790\u5BBF\u4E3B\u4E8B\u4EF6\u540D",{rawKey:e.rawKey});return}let{eventSource:n}=this._bridge,s=typeof n?.on=="function"?n.on.bind(n):typeof n?.addListener=="function"?n.addListener.bind(n):null,o=typeof n?.off=="function"?n.off.bind(n):typeof n?.removeListener=="function"?n.removeListener.bind(n):null;if(!s||!o){Ht.warn("\u5BBF\u4E3B eventSource \u7F3A\u5C11 on/off \u65B9\u6CD5");return}try{s(r,e.handler),e.attached=!0,e._hostName=r,e._hostUnsubscribe=()=>{try{o(r,e.handler)}catch(a){Ht.warn("\u53D6\u6D88\u5BBF\u4E3B\u8BA2\u9605\u5931\u8D25",{event:r,error:a})}},Ht.debug(`\u7ED1\u5B9A\u5BBF\u4E3B\u4E8B\u4EF6: "${r}" (key=${e.key})`)}catch(a){Ht.error(`\u7ED1\u5B9A\u5BBF\u4E3B\u4E8B\u4EF6\u5931\u8D25: "${r}"`,{error:a})}}},et=new Fc});var Jy={};he(Jy,{WorldbookPresetPanel:()=>Yo,default:()=>$0});function C0(t){return t===wr.CUSTOM?"\u81EA\u5B9A\u4E49":"\u8DDF\u968F\u89D2\u8272\u5361"}function k0(t,e,r){let n=[...t.bookList],s=n.findIndex(o=>o.bookName===e);s>=0?n[s]={...n[s],enabled:r}:n.push({bookName:e,enabled:r,entryOverrides:{}}),vt.updatePreset(t.id,{bookList:n})}function I0(t,e){let r=t.bookList.filter(n=>n.bookName!==e);vt.updatePreset(t.id,{bookList:r})}async function R0(t,e){let r=yi();if(!r.length)try{r=await qo()}catch{}let n=new Set(t.bookList.map(c=>c.bookName)),s=r.filter(c=>!n.has(c));if(!s.length){await we.confirm({title:"\u6CA1\u6709\u53EF\u6DFB\u52A0\u7684\u4E16\u754C\u4E66",message:"\u5BBF\u4E3B\u672A\u63D0\u4F9B\u66F4\u591A\u53EF\u7528\u4E16\u754C\u4E66\uFF0C\u6216\u7F13\u5B58\u5185\u5168\u90E8\u5DF2\u52A0\u5165\u6B64\u9884\u8BBE\u3002",confirmText:"\u786E\u5B9A"});return}let o=f("div",{style:{display:"flex",flexDirection:"column",gap:"8px"}}),a=f("input",{className:"yyt-input",attrs:{type:"text",placeholder:`\u641C\u7D22 ${s.length} \u672C\u4E16\u754C\u4E66\u2026`,autocomplete:"off"},style:{padding:"7px 10px",fontSize:"12px"}});o.appendChild(a);let i=f("div",{style:{display:"flex",flexDirection:"column",gap:"4px",maxHeight:"320px",overflowY:"auto"}}),l=new Set,d=[];for(let c of s){let u=f("label",{style:{display:"flex",alignItems:"center",gap:"8px",padding:"8px 10px",cursor:"pointer",borderRadius:"var(--yyt-radius-sm, 6px)",background:"var(--yyt-surface-2, rgba(255,255,255,0.03))",fontSize:"12px"}}),y=f("input",{attrs:{type:"checkbox",value:c}});y.addEventListener("change",()=>{y.checked?l.add(c):l.delete(c)}),u.appendChild(y),u.appendChild(f("span",{text:c,style:{color:"var(--yyt-text)"}})),i.appendChild(u),d.push({el:u,search:c.toLowerCase()})}o.appendChild(i),a.addEventListener("input",()=>{let c=a.value.trim().toLowerCase();for(let u of d)u.el.style.display=!c||u.search.includes(c)?"":"none"}),we.custom({title:`\u6DFB\u52A0\u4E16\u754C\u4E66\uFF08${s.length} \u9879\u53EF\u9009\uFF09`,width:"480px",body:o,buttons:[{label:"\u53D6\u6D88",variant:"ghost",onClick:c=>c(null)},{label:"\u5168\u9009\u53EF\u89C1",variant:"ghost",onClick:()=>{for(let c of i.querySelectorAll("input[type=checkbox]")){let u=c.closest("label");(!u||u.style.display!=="none")&&(c.checked=!0,l.add(c.value))}}},{label:"\u6DFB\u52A0\u9009\u4E2D",variant:"primary",onClick:c=>{let u=Array.from(l);if(!u.length){c(null);return}let y=u.map(m=>({bookName:m,enabled:!0,entryOverrides:{}})),p=[...t.bookList,...y];vt.updatePreset(t.id,{bookList:p}),c(u.length)}}]}).result.then(c=>{c&&e&&e()})}function M0(t,{onChange:e,readonly:r,refresh:n}){let s=f("div",{style:{display:"flex",flexDirection:"column",gap:"12px"}});re(s,Wt({label:"\u63CF\u8FF0",control:Te({value:t.description,placeholder:"\u53EF\u9009 \u2014 \u5907\u6CE8\u7528\u9014",disabled:r,onChange:c=>e({description:c})})})),re(s,Wt({label:"\u7ED1\u5B9A\u6A21\u5F0F",hint:"\u8DDF\u968F\u89D2\u8272\u5361 = \u6CE8\u5165\u5F53\u524D\u89D2\u8272\u7ED1\u5B9A\u7684\u4E16\u754C\u4E66\uFF1B\u81EA\u5B9A\u4E49 = \u7528\u4E0B\u65B9\u624B\u52A8\u9009\u62E9\u7684\u5217\u8868",control:Me({value:t.bindingMode,disabled:r,options:[{value:wr.CHARACTER_CARD,label:"\u8DDF\u968F\u89D2\u8272\u5361\uFF08\u52A8\u6001\uFF09"},{value:wr.CUSTOM,label:"\u81EA\u5B9A\u4E49\uFF08\u56FA\u5B9A\u5217\u8868\uFF09"}],onChange:c=>{e({bindingMode:c}),n&&n()}})})),re(s,Ze({label:"\u5305\u542B\u7981\u7528\u8BCD\u6761",hint:"\u5F00\u542F\u540E\uFF1A\u6E90\u4E16\u754C\u4E66\u4E2D\u5DF2\u7981\u7528\u7684\u8BCD\u6761\u53EF\u88AB\u672C\u9884\u8BBE\u5F3A\u5236\u542F\u7528\u5E76\u6CE8\u5165",checked:t.includeDisabled,disabled:r,onChange:c=>e({includeDisabled:c})}));let o=t.bindingMode===wr.CHARACTER_CARD,a=f("div",{style:{display:"flex",flexDirection:"column"}}),i=f("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"6px",gap:"8px"}});i.appendChild(f("div",{style:{display:"flex",flexDirection:"column",gap:"2px"}},f("div",{text:o?"\u968F\u89D2\u8272\u5361\u6CE8\u5165\u7684\u4E16\u754C\u4E66":"\u9009\u4E2D\u7684\u4E16\u754C\u4E66",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}}),f("div",{text:o?"\u4EE5\u4E0B\u6765\u81EA\u5F53\u524D\u89D2\u8272\u5361\u7684\u4E16\u754C\u4E66\u5C06\u88AB\u81EA\u52A8\u6CE8\u5165\uFF0C\u5217\u8868\u968F\u89D2\u8272\u5361\u53D8\u52A8\u81EA\u52A8\u66F4\u65B0":'\u672C\u9884\u8BBE\u56FA\u5B9A\u6CE8\u5165\u4E0B\u5217\u4E16\u754C\u4E66\uFF1B\u70B9\u51FB"+ \u6DFB\u52A0"\u4ECE\u53EF\u7528\u5217\u8868\u591A\u9009',style:{fontSize:"11px",color:"var(--yyt-text-muted)",lineHeight:"1.5"}})));let l=f("div",{style:{display:"flex",gap:"6px"}});!o&&!r&&l.appendChild(se({label:"+ \u6DFB\u52A0",size:"small",onClick:()=>R0(t,n)}).el),o||l.appendChild(se({label:"\u{1F504} \u5237\u65B0",size:"small",variant:"ghost",onClick:async()=>{try{await qo()}catch(c){Uc.warn("\u5237\u65B0\u5931\u8D25",{e:c})}n&&n()}}).el),i.appendChild(l),re(a,i);let d=[];if(o){let c=f("div",{style:{display:"flex",flexDirection:"column",gap:"4px"}});c.appendChild(f("div",{text:"\u6B63\u5728\u83B7\u53D6\u89D2\u8272\u5361\u7ED1\u5B9A\u7684\u4E16\u754C\u4E66\u2026",style:{padding:"14px 0",color:"var(--yyt-text-muted)",fontSize:"12px"}})),fi().then(u=>{if(c.innerHTML="",!u.length)c.appendChild(f("div",{style:{padding:"14px 0",color:"var(--yyt-text-muted)",fontSize:"12px"},text:'\u5F53\u524D\u89D2\u8272\u5361\u672A\u7ED1\u5B9A\u4E16\u754C\u4E66 \u2014 \u5207\u6362\u5230"\u81EA\u5B9A\u4E49"\u53EF\u4EE5\u624B\u52A8\u9009\u62E9\u4EFB\u610F\u4E16\u754C\u4E66\u3002'}));else for(let y of u)c.appendChild(f("div",{style:{padding:"8px 10px",borderRadius:"var(--yyt-radius-sm, 6px)",background:"var(--yyt-surface-2, rgba(255,255,255,0.03))",fontSize:"12px",display:"flex",alignItems:"center",gap:"8px",opacity:"0.7"}},f("span",{text:"\u{1F4D6}",style:{fontSize:"11px"}}),f("span",{text:y,style:{flex:"1",color:"var(--yyt-text)"}}),f("span",{text:"\u968F\u89D2\u8272\u5361\u6CE8\u5165",style:{fontSize:"11px",color:"var(--yyt-text-muted)"}})))}).catch(u=>{Uc.warn("\u83B7\u53D6\u89D2\u8272\u5361\u4E16\u754C\u4E66\u5931\u8D25",u),c.innerHTML="",c.appendChild(f("div",{style:{padding:"14px 0",color:"var(--yyt-danger, #f87171)",fontSize:"12px"},text:"\u83B7\u53D6\u89D2\u8272\u5361\u4E16\u754C\u4E66\u5931\u8D25"}))}),d=[c]}else t.bookList.length?d=t.bookList.map(c=>{let u=Object.keys(c.entryOverrides||{}).filter(m=>{let g=c.entryOverrides[m];return g&&typeof g.enabled=="boolean"}).length,y=f("div",{style:{display:"flex",flexDirection:"column"}}),p=Ac({name:c.bookName,desc:c.enabled===!1?"\u5DF2\u7981\u7528":`\u5DF2\u542F\u7528 \xB7 \u6574\u672C\u6CE8\u5165${u?` \xB7 ${u} \u6761 override`:""}`,actions:[se({label:"\u25B8 \u8BCD\u6761",size:"small",variant:"ghost",title:"\u5C55\u5F00/\u6536\u8D77\u8BCD\u6761\u7EA7 override",onClick:()=>P0(y,t,c,r,n)}),Ze({checked:c.enabled!==!1,disabled:r,onChange:m=>k0(t,c.bookName,m)}),...r?[]:[se({label:"\xD7",size:"small",variant:"ghost",title:"\u4ECE\u9884\u8BBE\u79FB\u9664",onClick:()=>{I0(t,c.bookName),n&&n()}})]]});return p?.el&&re(y,p.el),y}):d=[f("div",{style:{padding:"14px 0",color:"var(--yyt-text-muted)",fontSize:"12px"},text:'\u70B9\u51FB\u53F3\u4E0A\u89D2"+ \u6DFB\u52A0"\u9009\u62E9\u4E16\u754C\u4E66\u52A0\u5165\u6B64\u9884\u8BBE\u3002'})];for(let c of d)c?.el?re(a,c.el):c instanceof Node&&re(a,c);return re(s,a),s}function P0(t,e,r,n,s){let o=t.querySelector(".yyt-wb-entry-panel");if(o){o.remove();let l=t.querySelector('[title="\u5C55\u5F00/\u6536\u8D77\u8BCD\u6761\u7EA7 override"]');l&&(l.textContent="\u25B8 \u8BCD\u6761");return}let a=t.querySelector('[title="\u5C55\u5F00/\u6536\u8D77\u8BCD\u6761\u7EA7 override"]');a&&(a.textContent="\u25BE \u8BCD\u6761");let i=f("div",{className:"yyt-wb-entry-panel",style:{marginLeft:"18px",marginTop:"4px",padding:"8px 10px",background:"var(--yyt-surface-2, rgba(255,255,255,0.03))",borderRadius:"var(--yyt-radius-sm, 6px)",border:"1px solid var(--yyt-border, rgba(255,255,255,0.06))",fontSize:"12px",display:"flex",flexDirection:"column",gap:"4px"}});i.appendChild(f("div",{text:"\u52A0\u8F7D\u4E2D\u2026",style:{color:"var(--yyt-text-muted)",padding:"4px 0"}})),t.appendChild(i),qy(r.bookName).then(l=>{if(!l.length){i.innerHTML="",i.appendChild(f("div",{text:"\u8BE5\u4E16\u754C\u4E66\u65E0\u8BCD\u6761",style:{color:"var(--yyt-text-muted)",padding:"4px 0"}}));return}let d=r.entryOverrides||{};i.innerHTML="";let c=f("input",{className:"yyt-input",attrs:{type:"text",placeholder:`\u641C\u7D22 ${l.length} \u4E2A\u8BCD\u6761\u2026`,autocomplete:"off"},style:{padding:"5px 8px",fontSize:"11px",marginBottom:"4px",flexShrink:"0"}});i.appendChild(c);let u=f("div",{style:{display:"flex",flexDirection:"column",gap:"2px",height:"260px",overflowY:"scroll",overscrollBehavior:"contain",WebkitOverflowScrolling:"touch"}});u.addEventListener("wheel",m=>{let g=m.deltaY;if(g===0)return;let h=u.scrollTop+u.clientHeight<u.scrollHeight-.5,b=u.scrollTop>.5;(g>0&&h||g<0&&b)&&(m.preventDefault(),m.stopPropagation(),u.scrollTop+=g)},{passive:!1});let y=e.includeDisabled===!0,p=[];for(let m of l){let g=String(m.uid??""),h=m.comment||m.key||m.name||"",b=String(Array.isArray(h)?h[0]:h).trim()||`\u6761\u76EE ${m.uid}`,v=m.enabled===!1||m.disable===!0,x=d[g],T=x&&typeof x.enabled=="boolean",E=v&&!T&&!y,w=f("div",{style:{display:"flex",alignItems:"center",gap:"8px",padding:"5px 8px",borderRadius:"4px",background:T?"rgba(123,183,255,0.08)":"transparent",opacity:E?"0.4":"1"}}),_=C=>{w.style.background=C?"rgba(123,183,255,0.08)":"transparent",P.style.color=C?"var(--yyt-accent)":"var(--yyt-text)",C?A||(A=I(),w.appendChild(A)):(A&&(A.remove(),A=null),w.style.opacity=v?"0.4":"1")},A=null,I=()=>{let C=f("span",{text:"\u2715",style:{cursor:"pointer",color:"var(--yyt-text-muted)",fontSize:"10px",flexShrink:"0"},attrs:{title:"\u6E05\u9664 override"}});return C.addEventListener("click",N=>{if(N.stopPropagation(),n)return;let W=vt.getPreset(e.id);if(!W)return;let H=W.bookList.find(ee=>ee.bookName===r.bookName);H&&(H.entryOverrides=H.entryOverrides||{},delete H.entryOverrides[g],vt.updatePreset(e.id,{bookList:[...W.bookList]},{silent:!0}),A=null,_(!1))}),C};w.appendChild(Ze({checked:T?x.enabled:!v,disabled:n||E,onChange:C=>{let N=vt.getPreset(e.id);if(!N)return;let W=N.bookList.find(te=>te.bookName===r.bookName);if(!W)return;W.entryOverrides=W.entryOverrides||{};let H=!v;C===H?delete W.entryOverrides[g]:W.entryOverrides[g]={enabled:C};let ee=C!==H;vt.updatePreset(e.id,{bookList:[...N.bookList]},{silent:!0}),_(ee),w.style.opacity=E?"0.4":"1"}}).el);let P=f("span",{style:{flex:"1",minWidth:"0",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",color:T?"var(--yyt-accent)":"var(--yyt-text)",fontSize:"11px"},text:b+(E?" (\u6E90\u7981\u7528)":"")});w.appendChild(P),T&&(A=I(),w.appendChild(A)),u.appendChild(w),p.push({el:w,search:b.toLowerCase()})}i.appendChild(u),c.addEventListener("input",()=>{let m=c.value.trim().toLowerCase();for(let g of p)g.el.style.display=!m||g.search.includes(m)?"":"none"})}).catch(l=>{Uc.warn("\u52A0\u8F7D\u8BCD\u6761\u5931\u8D25",l),i.innerHTML="",i.appendChild(f("div",{text:`\u52A0\u8F7D\u5931\u8D25\uFF1A${l?.message||l}`,style:{color:"var(--yyt-danger, #f87171)",padding:"4px 0"}}))})}function N0(t){let e=[`${C0(t.bindingMode)}`,`${t.bookList.length} \u672C`];return t.includeDisabled&&e.push("\u542B\u7981\u7528"),e}var Uc,Yo,jc,Vy,$0,Qy=O(()=>{It();Rs();Go();Or();Fo();Z();Uo();Uc=$.createScope("WorldbookPresetPanel");Yo=en({id:"worldbookPresetPanel",kind:"worldbook",panelTitle:"\u4E16\u754C\u4E66\u9884\u8BBE",panelHint:"\u7BA1\u7406\u4E16\u754C\u4E66\u6CE8\u5165\u9884\u8BBE\u3002\u5DE5\u5177\u914D\u7F6E\u4E2D\u901A\u8FC7\u9884\u8BBE ID \u5F15\u7528\uFF0C\u53EF\u7ED1\u5B9A\u89D2\u8272\u5361\uFF08\u52A8\u6001\uFF09\u6216\u56FA\u5B9A\u5217\u8868\u3002",store:vt,renderEditor:M0,renderListItemMeta:N0}),jc=null,Vy=Yo.renderTo;Yo.renderTo=function(t){jc=t,Vy.call(this,t)};et.subscribe(Pe.CHAT_CHANGED,()=>{if(!jc)return;let t=vt.getCurrentPreset();!t||t.bindingMode!==wr.CHARACTER_CARD||Vy.call(Yo,jc)});$0=Yo});var Jc={};he(Jc,{MESSAGE_MACROS:()=>wf,addTagRule:()=>df,createRuleTemplate:()=>of,default:()=>D0,deleteRulePreset:()=>hf,deleteRuleTemplate:()=>lf,deleteTagRule:()=>pf,escapeRegex:()=>Qn,exportRulesConfig:()=>bf,extractComplexTag:()=>Zy,extractCurlyBraceTag:()=>Yc,extractHtmlFormatTag:()=>ef,extractSimpleTag:()=>Gc,extractTagContent:()=>Dr,generateTagSuggestions:()=>rf,getAllRulePresets:()=>mf,getAllRuleTemplates:()=>nf,getContentBlacklist:()=>Ns,getRuleTemplate:()=>sf,getTagRules:()=>Ps,importRulesConfig:()=>xf,isValidTagName:()=>qc,loadRulePreset:()=>gf,saveRulesAsPreset:()=>ff,scanTextForTags:()=>tf,setContentBlacklist:()=>yf,setTagRules:()=>cf,shouldSkipContent:()=>Hc,testRegex:()=>bi,updateRuleTemplate:()=>af,updateTagRule:()=>uf});function L0(){return{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"},ruleTemplates:[...Wc],tagRules:[],contentBlacklist:[],tagRulePresets:{}}}function qt(){return j.get(Xy,L0())}function Sr(t){j.set(Xy,t)}function hi(){let t=qt();return St=t.ruleTemplates||[...Wc],Ge=t.tagRules||[],Lt=t.contentBlacklist||[],{ruleTemplates:St,tagRules:Ge,contentBlacklist:Lt}}function Qn(t){return typeof t!="string"?"":t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function Hc(t,e){if(!e||e.length===0||!t||typeof t!="string")return!1;let r=t.toLowerCase();return e.some(n=>{let s=n.trim().toLowerCase();return s&&r.includes(s)})}function qc(t){return!t||typeof t!="string"?!1:/^[a-zA-Z][a-zA-Z0-9_-]*$/.test(t)&&!O0.includes(t.toLowerCase())}function Gc(t,e){if(!t||!e)return[];let r=[],n=Qn(e),s=new RegExp(`<${n}>([\\s\\S]*?)<\\/${n}>`,"gi");[...t.matchAll(s)].forEach(l=>{l[1]&&r.push(l[1].trim())});let a=(t.match(new RegExp(`<${n}>`,"gi"))||[]).length,i=(t.match(new RegExp(`<\\/${n}>`,"gi"))||[]).length;return a>i&&vr.warn(`\u53D1\u73B0 ${a-i} \u4E2A\u672A\u95ED\u5408\u7684 <${e}> \u6807\u7B7E`),r}function Yc(t,e){if(!t||!e)return[];let r=[],n=Qn(e),s=new RegExp(`\\{${n}\\|`,"gi"),o;for(;(o=s.exec(t))!==null;){let a=o.index,i=a+o[0].length,l=1,d=i;for(;d<t.length&&l>0;)t[d]==="{"?l++:t[d]==="}"&&l--,d++;if(l===0){let c=t.substring(i,d-1);c.trim()&&r.push(c.trim())}s.lastIndex=a+1}return r}function Zy(t,e){if(!t||!e)return[];let r=e.split(",");if(r.length!==2)return vr.error(`\u590D\u6742\u6807\u7B7E\u914D\u7F6E\u683C\u5F0F\u9519\u8BEF\uFF0C\u5E94\u8BE5\u5305\u542B\u4E00\u4E2A\u9017\u53F7: ${e}`),[];let n=r[0].trim(),s=r[1].trim(),o=s.match(/<\/(\w+)>/);if(!o)return vr.error(`\u65E0\u6CD5\u89E3\u6790\u7ED3\u675F\u6807\u7B7E: ${s}`),[];let a=o[1],i=new RegExp(`${Qn(n)}([\\s\\S]*?)<\\/${a}>`,"gi"),l=[];return[...t.matchAll(i)].forEach(c=>{c[1]&&l.push(c[1].trim())}),l}function ef(t,e){if(!t||!e)return[];let r=e.match(/<(\w+)(?:\s[^>]*)?>/);if(!r)return vr.error(`\u65E0\u6CD5\u89E3\u6790HTML\u683C\u5F0F\u6807\u7B7E: ${e}`),[];let n=r[1],s=[],o=new RegExp(`<${n}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${n}>`,"gi");[...t.matchAll(o)].forEach(d=>{d[1]&&s.push(d[1].trim())});let i=(t.match(new RegExp(`<${n}(?:\\s[^>]*)?>`,"gi"))||[]).length,l=(t.match(new RegExp(`<\\/${n}>`,"gi"))||[]).length;return i>l&&vr.warn(`\u53D1\u73B0 ${i-l} \u4E2A\u672A\u95ED\u5408\u7684 <${n}> \u6807\u7B7E`),s}function Dr(t,e,r=[]){if(!t)return"";if(!e||e.length===0)return t;let n=e.filter(c=>c.type==="exclude"&&c.enabled),s=e.filter(c=>(c.type==="include"||c.type==="regex_include")&&c.enabled),o=e.filter(c=>c.type==="regex_exclude"&&c.enabled),a=t;for(let c of n)try{let u=new RegExp(`<${Qn(c.value)}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${Qn(c.value)}>`,"gi");a=a.replace(u,"")}catch(u){vr.error("Error applying block exclusion rule:",{rule:c,error:u})}let i=[];if(s.length>0)for(let c of s){let u=[];try{if(c.type==="include")u.push(...Gc(a,c.value)),u.push(...Yc(a,c.value));else if(c.type==="regex_include"){let y=new RegExp(c.value,"gi");[...a.matchAll(y)].forEach(m=>{m[1]&&u.push(m[1])})}}catch(y){vr.error("Error applying inclusion rule:",{rule:c,error:y})}u.forEach(y=>i.push(y.trim()))}else i.push(a);let l=[];for(let c of i){for(let u of o)try{let y=new RegExp(u.value,"gi");c=c.replace(y,"")}catch(y){vr.error("Error applying cleanup rule:",{rule:u,error:y})}Hc(c,r)||l.push(c)}return l.join(`

`).replace(/\n\s*\n\s*\n/g,`

`).replace(/^\s+|\s+$/g,"").trim()}async function tf(t,e={}){let r=performance.now(),{chunkSize:n=5e4,maxTags:s=100,timeoutMs:o=5e3}=e,a=new Set,i=/<(?:\/|)([a-zA-Z0-9_-]+)(?:[^>]*)>|\{([a-zA-Z0-9_-]+)(?:\||})/g,l=0,d=0;for(let u=0;u<t.length;u+=n){let y=t.slice(u,Math.min(u+n,t.length));if(d++,l+=y.length,performance.now()-r>o){vr.warn(`Tag scanning timed out after ${o}ms`);break}let p;for(;(p=i.exec(y))!==null&&a.size<s;){let m=(p[1]||p[2]).toLowerCase();qc(m)&&a.add(m)}if(a.size>=s)break;d%5===0&&await new Promise(m=>setTimeout(m,0))}let c=performance.now();return{tags:Array.from(a).sort(),stats:{processingTimeMs:Math.round(c-r),processedChars:l,totalChars:t.length,chunkCount:d,tagsFound:a.size}}}function rf(t,e=25){let r=t.tags.slice(0,e);return{suggestions:r,stats:{totalFound:t.stats.tagsFound,finalCount:r.length}}}function nf(){return St.length===0&&hi(),St}function sf(t){return St.find(e=>e.id===t)}function of(t){let e={id:`rule-${Date.now()}`,name:t.name||"\u65B0\u89C4\u5219",description:t.description||"",type:t.type||"include",value:t.value||"",enabled:t.enabled!==!1,createdAt:new Date().toISOString()};return St.push(e),Vc(),{success:!0,template:e,message:"\u89C4\u5219\u6A21\u677F\u521B\u5EFA\u6210\u529F"}}function af(t,e){let r=St.findIndex(n=>n.id===t);return r===-1?{success:!1,message:"\u89C4\u5219\u6A21\u677F\u4E0D\u5B58\u5728"}:(St[r]={...St[r],...e,updatedAt:new Date().toISOString()},Vc(),{success:!0,template:St[r],message:"\u89C4\u5219\u6A21\u677F\u66F4\u65B0\u6210\u529F"})}function lf(t){let e=St.findIndex(r=>r.id===t);return e===-1?{success:!1,message:"\u89C4\u5219\u6A21\u677F\u4E0D\u5B58\u5728"}:(St.splice(e,1),Vc(),{success:!0,message:"\u89C4\u5219\u6A21\u677F\u5DF2\u5220\u9664"})}function Vc(){let t=qt();t.ruleTemplates=St,Sr(t)}function Ps(){return Ge||hi(),Ge}function cf(t){Ge=t||[];let e=qt();e.tagRules=Ge,Sr(e)}function df(t){let e={id:`tag-${Date.now()}`,type:t.type||"include",value:t.value||"",enabled:t.enabled!==!1};Ge.push(e);let r=qt();return r.tagRules=Ge,Sr(r),{success:!0,rule:e,message:"\u89C4\u5219\u6DFB\u52A0\u6210\u529F"}}function uf(t,e){if(t<0||t>=Ge.length)return{success:!1,message:"\u89C4\u5219\u7D22\u5F15\u65E0\u6548"};Ge[t]={...Ge[t],...e};let r=qt();return r.tagRules=Ge,Sr(r),{success:!0,rule:Ge[t],message:"\u89C4\u5219\u66F4\u65B0\u6210\u529F"}}function pf(t){if(t<0||t>=Ge.length)return{success:!1,message:"\u89C4\u5219\u7D22\u5F15\u65E0\u6548"};Ge.splice(t,1);let e=qt();return e.tagRules=Ge,Sr(e),{success:!0,message:"\u89C4\u5219\u5DF2\u5220\u9664"}}function Ns(){return Lt||hi(),Lt}function yf(t){Lt=t||[];let e=qt();e.contentBlacklist=Lt,Sr(e)}function ff(t,e=""){if(!t||!t.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let r=qt();r.tagRulePresets||(r.tagRulePresets={});let n=`preset-${Date.now()}`;return r.tagRulePresets[n]={id:n,name:t.trim(),description:e.trim(),rules:JSON.parse(JSON.stringify(Ge)),blacklist:JSON.parse(JSON.stringify(Lt)),createdAt:new Date().toISOString()},Sr(r),{success:!0,preset:r.tagRulePresets[n],message:"\u9884\u8BBE\u4FDD\u5B58\u6210\u529F"}}function mf(){let e=qt().tagRulePresets||{};return Object.values(e)}function gf(t){let e=qt(),n=(e.tagRulePresets||{})[t];return n?(Ge=JSON.parse(JSON.stringify(n.rules||[])),Lt=JSON.parse(JSON.stringify(n.blacklist||[])),e.tagRules=Ge,e.contentBlacklist=Lt,Sr(e),{success:!0,preset:n,message:"\u9884\u8BBE\u52A0\u8F7D\u6210\u529F"}):{success:!1,message:"\u9884\u8BBE\u4E0D\u5B58\u5728"}}function hf(t){let e=qt(),r=e.tagRulePresets||{};return r[t]?(delete r[t],e.tagRulePresets=r,Sr(e),{success:!0,message:"\u9884\u8BBE\u5DF2\u5220\u9664"}):{success:!1,message:"\u9884\u8BBE\u4E0D\u5B58\u5728"}}function bf(){return JSON.stringify({tagRules:Ge,contentBlacklist:Lt,ruleTemplates:St,tagRulePresets:qt().tagRulePresets||{}},null,2)}function xf(t,e={overwrite:!0}){try{let r=JSON.parse(t);if(e.overwrite)Ge=r.tagRules||[],Lt=r.contentBlacklist||[],St=r.ruleTemplates||Wc;else if(r.tagRules&&Ge.push(...r.tagRules),r.contentBlacklist){let s=new Set(Lt.map(o=>o.toLowerCase()));r.contentBlacklist.forEach(o=>{s.has(o.toLowerCase())||Lt.push(o)})}let n=qt();return n.tagRules=Ge,n.contentBlacklist=Lt,n.ruleTemplates=St,r.tagRulePresets&&(n.tagRulePresets={...n.tagRulePresets||{},...r.tagRulePresets}),Sr(n),{success:!0,message:"\u914D\u7F6E\u5BFC\u5165\u6210\u529F"}}catch(r){return vr.error("\u89C4\u5219\u914D\u7F6E\u5BFC\u5165\u5931\u8D25",{error:r}),{success:!1,message:`\u5BFC\u5165\u5931\u8D25: ${r.message}`}}}function bi(t,e,r="g",n=0){try{if(!t||typeof t!="string")return{success:!1,error:"\u6B63\u5219\u8868\u8FBE\u5F0F\u4E0D\u80FD\u4E3A\u7A7A",matches:[]};let s=new RegExp(t,r),o=[];if(r.includes("g")){let a;for(;(a=s.exec(e))!==null;)a.length>1?o.push({fullMatch:a[0],groups:a.slice(1),index:a.index,extracted:a[n]||a[1]||a[0]}):o.push({fullMatch:a[0],groups:[],index:a.index,extracted:a[0]})}else{let a=s.exec(e);a&&o.push({fullMatch:a[0],groups:a.length>1?a.slice(1):[],index:a.index,extracted:a.length>1?a[n]||a[1]:a[0]})}return{success:!0,matches:o,count:o.length,extracted:o.map(a=>a.extracted)}}catch(s){return{success:!1,error:s.message,matches:[]}}}var vr,Xy,O0,Wc,St,Ge,Lt,wf,D0,Xn=O(()=>{Je();Z();vr=$.createScope("RegexExtractor"),Xy="settings";O0=["font","span","div","p","br","hr","img","a","b","i","u","s","em","strong","small","big","sub","sup","h1","h2","h3","h4","h5","h6","table","tr","td","th","tbody","thead","tfoot","ul","ol","li","form","input","button","select","option","textarea","label","script","style","meta","link","title","head","body","html"],Wc=[{id:"exclude-thinking",name:"\u6392\u9664\u601D\u8003\u6807\u7B7E",description:"\u79FB\u9664<thinking>\u6807\u7B7E\u5757",type:"exclude",value:"thinking",enabled:!0},{id:"include-content",name:"\u63D0\u53D6\u5185\u5BB9\u6807\u7B7E",description:"\u63D0\u53D6<content>\u6807\u7B7E\u5185\u5BB9",type:"include",value:"content",enabled:!0},{id:"regex-exclude-cot",name:"\u6392\u9664\u5C0FCoT",description:"\u79FB\u9664HTML\u6CE8\u91CA",type:"regex_exclude",value:"<!--[\\s\\S]*?-->",enabled:!1},{id:"regex-include-details",name:"\u63D0\u53D6details\u6807\u7B7E",description:"\u63D0\u53D6<details>\u6807\u7B7E\u5185\u5BB9",type:"regex_include",value:"<details[^>]*>([\\s\\S]*?)</details>",enabled:!1}],St=[],Ge=[],Lt=[];wf={lastMessage:{macro:"{{lastMessage}}",description:"\u6700\u540E\u4E00\u6761\u6D88\u606F"},lastCharMessage:{macro:"{{lastCharMessage}}",description:"\u6700\u540E\u4E00\u6761\u89D2\u8272\u6D88\u606F"},lastUserMessage:{macro:"{{lastUserMessage}}",description:"\u6700\u540E\u4E00\u6761\u7528\u6237\u6D88\u606F"},char:{macro:"{{char}}",description:"\u89D2\u8272\u540D\u79F0"},user:{macro:"{{user}}",description:"\u7528\u6237\u540D\u79F0"},input:{macro:"{{input}}",description:"\u5F53\u524D\u8F93\u5165\u6846\u5185\u5BB9"}};hi();D0={extractTagContent:Dr,extractSimpleTag:Gc,extractCurlyBraceTag:Yc,extractComplexTag:Zy,extractHtmlFormatTag:ef,escapeRegex:Qn,shouldSkipContent:Hc,isValidTagName:qc,scanTextForTags:tf,generateTagSuggestions:rf,getAllRuleTemplates:nf,getRuleTemplate:sf,createRuleTemplate:of,updateRuleTemplate:af,deleteRuleTemplate:lf,getTagRules:Ps,setTagRules:cf,addTagRule:df,updateTagRule:uf,deleteTagRule:pf,getContentBlacklist:Ns,setContentBlacklist:yf,saveRulesAsPreset:ff,getAllRulePresets:mf,loadRulePreset:gf,deleteRulePreset:hf,exportRulesConfig:bf,importRulesConfig:xf,testRegex:bi,MESSAGE_MACROS:wf}});var kf={};he(kf,{createDefaultToolDefinition:()=>Zn,default:()=>F0,deleteTool:()=>Ls,deleteToolPreset:()=>Ef,exportTools:()=>Os,getAllTools:()=>Tr,getCurrentToolPreset:()=>Af,getTool:()=>_r,getToolPresets:()=>wi,importTools:()=>Ds,normalizeToolDefinitionToRuntimeConfig:()=>Jo,resetTools:()=>Bs,saveTool:()=>$s,saveToolPreset:()=>_f,setCurrentToolPreset:()=>Cf,setToolEnabled:()=>vi});function B0(t={}){return!t||typeof t!="object"?{}:Object.fromEntries(Object.entries(t).map(([e,r])=>[e,Zn({...r||{},id:e})]))}function Vo(t){return Array.isArray(t)?t.map(e=>String(e||"").trim()).filter(Boolean):[]}function Qc(t,e){let r=parseInt(t,10);return Number.isFinite(r)&&r>0?r:e}function vf(t,e){let r=parseInt(t,10);return Number.isFinite(r)&&r>=0?r:e}function Sf(t={}){return{settleMs:vf(t?.settleMs,1200),cooldownMs:vf(t?.cooldownMs,5e3)}}function Tf(t={}){return{enabled:t?.enabled===!0,selected:Vo(t?.selected),presetId:typeof t?.presetId=="string"?t.presetId:""}}function z0(t=[]){let e=Array.isArray(t)?t.map(r=>({role:String(r?.role||"user").trim().toUpperCase(),content:String(r?.content||"").trim()})).filter(r=>r.content):[];return e.length===0?"":e.length===1?e[0].content:e.map(r=>`\u3010${r.role||"USER"}\u3011
${r.content}`).join(`

`)}function K0(t,e={}){let r=typeof e?.promptTemplate=="string"?e.promptTemplate.trim():"";if(r)return r;let n=z0(e?.config?.messages||[]);return n||`\u8BF7\u57FA\u4E8E\u6700\u8FD1\u7684 AI \u56DE\u590D\u4E3A\u5DE5\u5177\u201C${e?.name||t}\u201D\u751F\u6210\u7ED3\u6784\u5316\u8F93\u51FA\u3002`}function Zn(t={}){let e=new Date().toISOString(),r=t?.config||{};return{...rr,...t,id:t?.id||rr.id,icon:t?.icon||rr.icon,order:Number.isFinite(t?.order)?t.order:rr.order,promptTemplate:typeof t?.promptTemplate=="string"?t.promptTemplate:rr.promptTemplate,extractTags:Vo(t?.extractTags),config:{execution:{...rr.config.execution,...r.execution||{},timeout:Qc(r?.execution?.timeout,rr.config.execution.timeout),retries:Math.max(0,parseInt(r?.execution?.retries,10)||rr.config.execution.retries)},api:{...rr.config.api,...r.api||{}},messages:Array.isArray(r?.messages)?r.messages:[],context:{...rr.config.context,...r.context||{},depth:Qc(r?.context?.depth,rr.config.context.depth),includeTags:Vo(r?.context?.includeTags),excludeTags:Vo(r?.context?.excludeTags)},automation:Sf(r?.automation),worldbooks:Tf(r?.worldbooks)},enabled:t?.enabled!==!1,metadata:{...rr.metadata,...t?.metadata||{},createdAt:t?.metadata?.createdAt||e,updatedAt:t?.metadata?.updatedAt||e}}}function Jo(t,e={},r={}){let n=Zn({...e,id:t||e?.id||""}),s=Vo(n?.extractTags?.length?n.extractTags:n?.config?.context?.includeTags),o=String(e?.output?.apiPreset||n?.config?.api?.preset||"").trim(),a=K0(t,n),i=typeof e?.output?.mode=="string"&&e.output.mode.trim()?e.output.mode.trim():r.defaultOutputMode||"follow_ai";return{id:n.id||t,name:n.name||t,icon:n.icon||"fa-screwdriver-wrench",description:n.description||"",enabled:n.enabled!==!1,order:Number.isFinite(n.order)?n.order:100,bypass:{enabled:n?.config?.api?.useBypass===!0&&!!n?.config?.api?.bypassPreset,presetId:n?.config?.api?.bypassPreset||""},output:{mode:i,apiPreset:o,overwrite:!0,enabled:!0},automation:Sf(n?.config?.automation),worldbooks:Tf(n?.config?.worldbooks),extraction:{enabled:!0,maxMessages:Qc(n?.config?.context?.depth,5),selectors:s,regexPresetId:typeof n?.config?.extraction?.regexPresetId=="string"?n.config.extraction.regexPresetId:"",writebackTag:typeof n?.config?.extraction?.writebackTag=="string"?n.config.extraction.writebackTag:""},promptTemplate:a,runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},apiPreset:o,extractTags:s,isCustom:!0,category:n.category||"utility",metadata:{...n.metadata||{}}}}function Tr(){let t=$e.get(Qe.TOOLS),e=B0(t);return t&&JSON.stringify(t)!==JSON.stringify(e)&&$e.set(Qe.TOOLS,e),{...xi,...e}}function _r(t){return Tr()[t]||null}function $s(t,e){if(!t||!e)return!1;let r=$e.get(Qe.TOOLS)||{},n=!r[t]&&!xi[t],s=Zn({...r[t]||{},...e,id:t,metadata:{...r[t]?.metadata||{},...e.metadata||{},createdAt:r[t]?.metadata?.createdAt||e?.metadata?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString()}});return r[t]=s,$e.set(Qe.TOOLS,r),q.emit(n?G.TOOL_REGISTERED:G.TOOL_UPDATED,{toolId:t,tool:s}),!0}function Ls(t){let e=$e.get(Qe.TOOLS)||{};return!e[t]&&!xi[t]||xi[t]?!1:(delete e[t],$e.set(Qe.TOOLS,e),q.emit(G.TOOL_UNREGISTERED,{toolId:t}),!0)}function wi(){return $e.get(Qe.PRESETS)||{}}function _f(t,e){if(!t||!e)return!1;let r=wi(),n=!r[t];return r[t]={...e,name:t,updatedAt:new Date().toISOString()},$e.set(Qe.PRESETS,r),q.emit(n?G.PRESET_CREATED:G.PRESET_UPDATED,{type:"tool",presetName:t,preset:r[t]}),!0}function Ef(t){let e=wi();return e[t]?(delete e[t],$e.set(Qe.PRESETS,e),q.emit(G.PRESET_DELETED,{type:"tool",presetName:t}),!0):!1}function Af(){return $e.get(Qe.CURRENT_PRESET)||""}function Cf(t){return $e.set(Qe.CURRENT_PRESET,t||""),q.emit(G.PRESET_ACTIVATED,{type:"tool",presetName:t}),!0}function vi(t,e){let r=_r(t);if(!r)return!1;let n=$e.get(Qe.TOOLS)||{};return n[t]=Zn({...r,id:t,enabled:e,metadata:{...r?.metadata||{},createdAt:r?.metadata?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString()}}),$e.set(Qe.TOOLS,n),q.emit(e?G.TOOL_ENABLED:G.TOOL_DISABLED,{toolId:t,enabled:e}),!0}function Os(){let t=$e.get(Qe.TOOLS)||{},e=$e.get(Qe.PRESETS)||{};return JSON.stringify({version:"1.0.0",exportedAt:new Date().toISOString(),tools:t,presets:e},null,2)}function Ds(t,e=!1){try{let r=typeof e=="object"?!!e?.overwrite:!!e,n=JSON.parse(t);if(!n||typeof n!="object")return{success:!1,toolsImported:0,presetsImported:0,message:"\u65E0\u6548\u7684JSON\u683C\u5F0F"};let s=r?{}:$e.get(Qe.TOOLS)||{},o=r?{}:$e.get(Qe.PRESETS)||{},a=0,i=0;if(n.tools&&typeof n.tools=="object"){for(let[l,d]of Object.entries(n.tools))!d||typeof d!="object"||(s[l]=Zn({...d,id:l}),a+=1);$e.set(Qe.TOOLS,s)}if(n.presets&&typeof n.presets=="object"){for(let[l,d]of Object.entries(n.presets))!d||typeof d!="object"||(o[l]={...d,name:l,updatedAt:new Date().toISOString()},i+=1);$e.set(Qe.PRESETS,o)}return{success:!0,toolsImported:a,presetsImported:i,message:`\u6210\u529F\u5BFC\u5165 ${a} \u4E2A\u5DE5\u5177\u548C ${i} \u4E2A\u9884\u8BBE`}}catch(r){return log.error("\u5DE5\u5177\u5BFC\u5165\u5931\u8D25",{error:r}),{success:!1,toolsImported:0,presetsImported:0,message:`\u5BFC\u5165\u5931\u8D25: ${r.message}`}}}function Bs(){$e.remove(Qe.TOOLS),$e.remove(Qe.PRESETS),$e.remove(Qe.CURRENT_PRESET)}var rr,xi,Qe,F0,Qo=O(()=>{Je();nt();rr={id:"",name:"",description:"",icon:"fa-screwdriver-wrench",order:100,category:"utility",promptTemplate:"",extractTags:[],config:{execution:{timeout:6e4,retries:3},api:{preset:"",useBypass:!1,bypassPreset:""},messages:[],context:{depth:3,includeTags:[],excludeTags:[]},automation:{settleMs:1200,cooldownMs:5e3},worldbooks:{enabled:!1,selected:[]}},enabled:!0,metadata:{createdAt:null,updatedAt:null,author:"",version:"1.0.0"}},xi={},Qe={TOOLS:"tools",PRESETS:"tool_presets",CURRENT_PRESET:"current_tool_preset"};F0={getAllTools:Tr,getTool:_r,saveTool:$s,deleteTool:Ls,setToolEnabled:vi,exportTools:Os,importTools:Ds,resetTools:Bs,getToolPresets:wi,saveToolPreset:_f,deleteToolPreset:Ef,getCurrentToolPreset:Af,setCurrentToolPreset:Cf,createDefaultToolDefinition:Zn,normalizeToolDefinitionToRuntimeConfig:Jo}});var sd={};he(sd,{TOOL_CATEGORIES:()=>If,TOOL_REGISTRY:()=>zs,appendToolRuntimeHistory:()=>Ff,clearToolApiPreset:()=>Bf,default:()=>V0,ensureToolRuntimeConfig:()=>Ks,getAllDefaultToolConfigs:()=>jf,getAllToolApiBindings:()=>zf,getAllToolFullConfigs:()=>ea,getEnabledTools:()=>Wf,getToolApiPreset:()=>rd,getToolBaseConfig:()=>Si,getToolConfig:()=>Zo,getToolFullConfig:()=>xe,getToolList:()=>$f,getToolSubTabs:()=>Lf,getToolWindowState:()=>qf,hasTool:()=>td,onPresetDeleted:()=>Kf,patchToolRuntime:()=>ln,registerTool:()=>Pf,resetToolConfig:()=>Uf,resetToolRegistry:()=>Of,saveToolConfig:()=>Ue,saveToolWindowState:()=>Hf,setToolApiPreset:()=>Df,setToolApiPresetConfig:()=>q0,setToolBypassConfig:()=>G0,setToolOutputMode:()=>H0,setToolPromptTemplate:()=>Y0,unregisterTool:()=>Nf,updateToolRuntime:()=>nd});function es(t={}){let e=Array.isArray(t?.recentWritebackHistory)?t.recentWritebackHistory.filter(Boolean):[];return{lastRunAt:Number.isFinite(t?.lastRunAt)?t.lastRunAt:0,lastStatus:typeof t?.lastStatus=="string"?t.lastStatus:"idle",lastError:typeof t?.lastError=="string"?t.lastError:"",lastDurationMs:Number.isFinite(t?.lastDurationMs)?t.lastDurationMs:0,successCount:Number.isFinite(t?.successCount)?t.successCount:0,errorCount:Number.isFinite(t?.errorCount)?t.errorCount:0,lastMessageKey:typeof t?.lastMessageKey=="string"?t.lastMessageKey:"",lastExecutionKey:typeof t?.lastExecutionKey=="string"?t.lastExecutionKey:"",lastExecutionPath:typeof t?.lastExecutionPath=="string"?t.lastExecutionPath:"",lastWritebackStatus:typeof t?.lastWritebackStatus=="string"?t.lastWritebackStatus:"",lastFailureStage:typeof t?.lastFailureStage=="string"?t.lastFailureStage:"",lastSlotBindingKey:typeof t?.lastSlotBindingKey=="string"?t.lastSlotBindingKey:"",lastSlotRevisionKey:typeof t?.lastSlotRevisionKey=="string"?t.lastSlotRevisionKey:"",lastSlotTransactionId:typeof t?.lastSlotTransactionId=="string"?t.lastSlotTransactionId:"",lastSourceMessageId:typeof t?.lastSourceMessageId=="string"?t.lastSourceMessageId:"",lastSourceSwipeId:typeof t?.lastSourceSwipeId=="string"?t.lastSourceSwipeId:"",lastContentCommitted:t?.lastContentCommitted===!0,lastHostCommitApplied:t?.lastHostCommitApplied===!0,lastRefreshRequested:t?.lastRefreshRequested===!0,lastRefreshConfirmed:t?.lastRefreshConfirmed===!0,lastPreferredCommitMethod:typeof t?.lastPreferredCommitMethod=="string"?t.lastPreferredCommitMethod:"",lastAppliedCommitMethod:typeof t?.lastAppliedCommitMethod=="string"?t.lastAppliedCommitMethod:"",lastRefreshMethodCount:Number.isFinite(t?.lastRefreshMethodCount)?t.lastRefreshMethodCount:0,lastRefreshMethods:Array.isArray(t?.lastRefreshMethods)?t.lastRefreshMethods.filter(Boolean):[],lastRefreshConfirmChecks:Number.isFinite(t?.lastRefreshConfirmChecks)?t.lastRefreshConfirmChecks:0,lastRefreshConfirmedBy:typeof t?.lastRefreshConfirmedBy=="string"?t.lastRefreshConfirmedBy:"",lastTraceId:typeof t?.lastTraceId=="string"?t.lastTraceId:"",lastAutoRunAt:Number.isFinite(t?.lastAutoRunAt)?t.lastAutoRunAt:0,lastAutoStatus:typeof t?.lastAutoStatus=="string"?t.lastAutoStatus:"idle",lastAutoMessageId:typeof t?.lastAutoMessageId=="string"?t.lastAutoMessageId:"",lastAutoSwipeId:typeof t?.lastAutoSwipeId=="string"?t.lastAutoSwipeId:"",lastAutoRevisionKey:typeof t?.lastAutoRevisionKey=="string"?t.lastAutoRevisionKey:"",lastAutoWritebackStatus:typeof t?.lastAutoWritebackStatus=="string"?t.lastAutoWritebackStatus:"",lastAutoRefreshConfirmed:t?.lastAutoRefreshConfirmed===!0,lastAutoSkipReason:typeof t?.lastAutoSkipReason=="string"?t.lastAutoSkipReason:"",recentWritebackHistory:e}}function U0(t,e=10){let r=Number.isFinite(e)?Math.max(1,Math.min(50,Math.floor(e))):10;return Array.isArray(t)?t.length<=r?t:t.slice(t.length-r):[]}function Rf(){let t=Tr()||{};return Object.entries(t).filter(([e])=>!Xo[e]).map(([e,r])=>[e,r||{}])}function Xc(t={}){return t?.toolKind==="script"?"script":t?.toolKind==="ai"?"ai":t?.output?.mode==="local_transform"||t?.processor?.type?"script":"ai"}function Mf(){let t=Array.isArray(zs.tools?.subTabs)?zs.tools.subTabs.map((r,n)=>({...r,order:Number.isFinite(r?.order)?r.order:n,toolKind:Xc(r),toolGroupLabel:Xc(r)==="script"?"\u811A\u672C\u5DE5\u5177":"AI \u5DE5\u5177"})):[],e=Rf().map(([r,n],s)=>{let o=Jo(r,n),a=Xc(o);return{id:r,name:o.name||r,icon:o.icon||"fa-screwdriver-wrench",component:"GenericToolConfigPanel",order:Number.isFinite(o.order)?o.order:100+s,isCustom:!0,description:o.description||"",toolKind:a,toolGroupLabel:a==="script"?"\u811A\u672C\u5DE5\u5177":"AI \u5DE5\u5177"}});return[...t,...e].sort((r,n)=>(r.order??0)-(n.order??0))}function j0(t,e={}){let r=Jo(t,e,{defaultOutputMode:"follow_ai"});return{...r,runtime:es(r.runtime)}}function ed(t){let e=Xo[t];if(e)return{...e,output:{...e.output||{}},bypass:{...e.bypass||{}},worldbooks:{...e.worldbooks||{},selected:Array.isArray(e?.worldbooks?.selected)?[...e.worldbooks.selected]:[]},extraction:{...e.extraction||{}},processor:{...e.processor||{},options:{...e?.processor?.options||{}}},runtime:es(e.runtime),extractTags:Array.isArray(e.extractTags)?[...e.extractTags]:[]};let n=(Tr()||{})[t]||null;return n?j0(t,n):Zo(t)}function Si(t){let e=ed(t);return e?{...e,output:{...e.output||{}},automation:{...e.automation||{}},bypass:{...e.bypass||{}},worldbooks:{...e.worldbooks||{},selected:Array.isArray(e?.worldbooks?.selected)?[...e.worldbooks.selected]:[]},extraction:{...e.extraction||{},selectors:Array.isArray(e?.extraction?.selectors)?[...e.extraction.selectors]:[]},processor:{...e.processor||{},options:{...e?.processor?.options||{}}},runtime:{...e.runtime||{}},extractTags:Array.isArray(e.extractTags)?[...e.extractTags]:[]}:null}function W0(t,e={},r=""){if(!t)return null;let n={...t,...e,id:t.id||e.id};n.output={...t.output||{},...e.output||{}},n.automation={settleMs:Number.isFinite(e?.automation?.settleMs)?e.automation.settleMs:Number.isFinite(t?.automation?.settleMs)?t.automation.settleMs:1200,cooldownMs:Number.isFinite(e?.automation?.cooldownMs)?e.automation.cooldownMs:Number.isFinite(t?.automation?.cooldownMs)?t.automation.cooldownMs:5e3},n.bypass={...t.bypass||{},...e.bypass||{}},n.worldbooks={...t.worldbooks||{},...e.worldbooks||{},selected:Array.isArray(e?.worldbooks?.selected)?[...e.worldbooks.selected]:Array.isArray(t?.worldbooks?.selected)?[...t.worldbooks.selected]:[]},n.runtime=es({...t.runtime||{},...e.runtime||{}}),n.extraction={...t.extraction||{},...e.extraction||{}},n.processor={...t.processor||{},...e.processor||{},options:{...t?.processor?.options||{},...e?.processor?.options||{}}};let s=e?.output?.apiPreset||e?.apiPreset||n.output?.apiPreset||n.apiPreset||r||"";return n.output={...n.output||{},apiPreset:s},n.apiPreset=s,t.isCustom?n.enabled=t.enabled!==!1:typeof e.enabled=="boolean"?n.enabled=e.enabled:n.enabled=t.enabled!==!1,n}function Pf(t,e){if(!t||typeof t!="string")return yt.error("\u5DE5\u5177ID\u65E0\u6548"),!1;if(!e||typeof e!="object")return yt.error("\u5DE5\u5177\u914D\u7F6E\u65E0\u6548"),!1;let r=["name","icon","component"];for(let n of r)if(!e[n])return yt.error(` \u5DE5\u5177\u7F3A\u5C11\u5FC5\u9700\u5B57\u6BB5: ${n}`),!1;return Er[t]={id:t,...e,order:e.order??Object.keys(Er).length},yt.log(` \u5DE5\u5177\u5DF2\u6CE8\u518C: ${t}`),!0}function Nf(t){return Er[t]?(delete Er[t],yt.log(` \u5DE5\u5177\u5DF2\u6CE8\u9500: ${t}`),!0):(yt.warn(` \u5DE5\u5177\u4E0D\u5B58\u5728: ${t}`),!1)}function $f(t=!0){let e=Object.values(Er).map(r=>r.id==="tools"?{...r,subTabs:Mf()}:r);return t?e.sort((r,n)=>(r.order??0)-(n.order??0)):e}function Zo(t){return t==="tools"&&Er[t]?{...Er[t],subTabs:Mf()}:Er[t]||null}function td(t){return!!Er[t]}function Lf(t){let e=Zo(t);return!e||!e.hasSubTabs?[]:e.subTabs||[]}function Of(){Er={...zs},yt.log("\u5DE5\u5177\u6CE8\u518C\u8868\u5DF2\u91CD\u7F6E")}function Df(t,e){if(!td(t))return yt.warn(` \u5DE5\u5177\u4E0D\u5B58\u5728: ${t}`),!1;let r=j.get(nr)||{};return r[t]=e||"",j.set(nr,r),yt.log(` \u5DE5\u5177 "${t}" \u7ED1\u5B9A\u5230\u9884\u8BBE "${e||"\u5F53\u524D\u914D\u7F6E"}"`),!0}function rd(t){return(j.get(nr)||{})[t]||""}function Bf(t){let e=j.get(nr)||{};delete e[t],j.set(nr,e),yt.log(` \u5DE5\u5177 "${t}" \u7684API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u6E05\u9664`)}function zf(){return j.get(nr)||{}}function Kf(t){let e=j.get(nr)||{},r=!1;for(let n in e)e[n]===t&&(e[n]="",r=!0,yt.log(` \u5DE5\u5177 "${n}" \u7684API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u6E05\u9664\uFF08\u9884\u8BBE\u88AB\u5220\u9664\uFF09`));r&&j.set(nr,e)}function xe(t){let e=ed(t);if(!e)return Zo(t);let n=(j.get(an)||{})[t]||{},s=rd(t),o=W0({...e,id:t},n,s);return yt.debug(`[PRESET] getToolFullConfig ${t}`,{base_extraction:JSON.parse(JSON.stringify(e.extraction||{})),base_worldbooks:JSON.parse(JSON.stringify(e.worldbooks||{})),user_extraction:JSON.parse(JSON.stringify(n.extraction||{})),user_worldbooks:JSON.parse(JSON.stringify(n.worldbooks||{})),merged_extraction:JSON.parse(JSON.stringify(o.extraction||{})),merged_worldbooks:JSON.parse(JSON.stringify(o.worldbooks||{}))}),o}function Ks(t){if(!t)return!1;let e=ed(t);if(!e)return!1;let r=j.get(an)||{};if(r[t])return!0;let n={promptTemplate:e.promptTemplate||"",enabled:e.enabled!==!1,extractTags:Array.isArray(e.extractTags)?[...e.extractTags]:[],apiPreset:e.apiPreset||"",output:{...e.output||{}},automation:{...e.automation||{}},bypass:{...e.bypass||{}},worldbooks:{...e.worldbooks||{},selected:Array.isArray(e?.worldbooks?.selected)?[...e.worldbooks.selected]:[]},extraction:{...e.extraction||{},selectors:Array.isArray(e?.extraction?.selectors)?[...e.extraction.selectors]:[]},processor:{...e.processor||{},options:{...e?.processor?.options||{}}},runtime:{...e.runtime||{}}};r[t]=n,j.set(an,r);let s=j.get(nr)||{};return s[t]=n.output?.apiPreset||n.apiPreset||"",j.set(nr,s),q.emit(G.TOOL_UPDATED,{toolId:t,config:n}),!0}function Ue(t,e,r={}){if(!t||!xe(t))return yt.warn("\u5DE5\u5177\u4E0D\u5B58\u5728:",t),!1;let{emitEvent:n=!0}=r,s=j.get(an)||{},o=j.get(nr)||{},a=e?.output?.apiPreset??e?.apiPreset??"",i=["promptTemplate","enabled","extractTags","apiPreset","output","automation","bypass","worldbooks","extraction","processor","runtime"];return s[t]={},i.forEach(l=>{if(e[l]!==void 0){if(l==="output"&&e.output){s[t][l]={...e.output,apiPreset:a};return}if(l==="apiPreset"){s[t][l]=a;return}s[t][l]=e[l]}}),s[t].apiPreset===void 0&&(s[t].apiPreset=a),!s[t].output&&e.output!==void 0&&(s[t].output={...e.output||{},apiPreset:a}),j.set(an,s),o[t]=a,j.set(nr,o),yt.debug(`[PRESET] saveToolConfig ${t}`,{input_extraction:JSON.parse(JSON.stringify(e.extraction||{})),input_worldbooks:JSON.parse(JSON.stringify(e.worldbooks||{})),saved_extraction:JSON.parse(JSON.stringify(s[t].extraction||{})),saved_worldbooks:JSON.parse(JSON.stringify(s[t].worldbooks||{})),verify_storage:JSON.parse(JSON.stringify((j.get(an)||{})[t]?.extraction||{}))}),n&&q.emit(G.TOOL_UPDATED,{toolId:t,config:s[t]}),yt.log(` \u5DE5\u5177\u914D\u7F6E\u5DF2\u4FDD\u5B58: ${t}`),!0}function H0(t,e){let r=xe(t);return r?Ue(t,{...r,output:{...r.output,mode:e}}):!1}function q0(t,e){let r=xe(t);return r?Ue(t,{...r,apiPreset:e,output:{...r.output,apiPreset:e}}):!1}function G0(t,e){let r=xe(t);return r?Ue(t,{...r,bypass:{...r.bypass,...e}}):!1}function Y0(t,e){let r=xe(t);return r?Ue(t,{...r,promptTemplate:e}):!1}function ln(t,e,r={}){let n=xe(t);if(!n)return!1;let{touchLastRunAt:s=!1,emitEvent:o=!1,emitRuntimeEvent:a=!0}=r,i=es({...n.runtime||{},...e||{}});s&&(i.lastRunAt=Date.now());let l=Ue(t,{...n,runtime:i},{emitEvent:o});return l&&a&&q.emit(G.TOOL_RUNTIME_UPDATED,{toolId:t,runtime:i,previousRuntime:es(n.runtime||{})}),l}function Ff(t,e,r={},n={}){let s=xe(t);if(!s)return!1;let{limit:o=10,emitEvent:a=!1,emitRuntimeEvent:i=!0}=n,l=es(s.runtime||{}),d=es(s.runtime||{}),c="recentWritebackHistory",u={id:r?.id||`hist_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,at:r?.at||Date.now(),...r};l[c]=U0([...Array.isArray(l[c])?l[c]:[],u],o),u?.traceId&&(l.lastTraceId=u.traceId);let y=Ue(t,{...s,runtime:l},{emitEvent:a});return y&&i&&q.emit(G.TOOL_RUNTIME_UPDATED,{toolId:t,runtime:l,previousRuntime:d,historyType:e,historyEntry:u}),y}function nd(t,e,r={}){let{touchLastRunAt:n=!0,emitEvent:s=!1,emitRuntimeEvent:o=!0}=r;return ln(t,e,{touchLastRunAt:n,emitEvent:s,emitRuntimeEvent:o})}function Uf(t){if(!t||!Xo[t])return yt.warn("\u5DE5\u5177\u4E0D\u5B58\u5728:",t),!1;let e=j.get(an)||{};return delete e[t],j.set(an,e),q.emit(G.TOOL_UPDATED,{toolId:t,config:null}),yt.log(` \u5DE5\u5177\u914D\u7F6E\u5DF2\u91CD\u7F6E: ${t}`),!0}function jf(){return{...Xo}}function ea(){let t=new Set([...Object.keys(Xo),...Rf().map(([e])=>e)]);return Array.from(t).map(e=>xe(e)).filter(Boolean)}function Wf(){return ea().filter(t=>t&&t.enabled)}function Hf(t,e){let r=j.get(Zc)||{};r[t]={...e,updatedAt:Date.now()},j.set(Zc,r)}function qf(t){return(j.get(Zc)||{})[t]||null}var yt,an,nr,Zc,Xo,zs,If,Er,V0,Ar=O(()=>{Je();nt();Z();Qo();yt=$.createScope("ToolRegistry"),an="tool_configs",nr="tool_api_bindings",Zc="tool_window_states";Xo={summaryTool:{id:"summaryTool",name:"\u6458\u8981\u5DE5\u5177",icon:"fa-file-lines",description:"\u751F\u6210\u5267\u60C5\u6458\u8981\u5757",enabled:!0,order:3,bypass:{enabled:!1,presetId:""},output:{mode:"follow_ai",apiPreset:"",overwrite:!0,enabled:!0},automation:{settleMs:1200,cooldownMs:5e3},worldbooks:{enabled:!1,selected:[]},extraction:{enabled:!0,maxMessages:5,regexPresetId:"builtin_regex_summary"},promptTemplate:`\u8BF7\u6839\u636E\u4EE5\u4E0BAI\u56DE\u590D\u751F\u6210\u6458\u8981\u5757\uFF1A

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
</youyou>`,runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},apiPreset:"",extractTags:[]},escapeTransformTool:{id:"escapeTransformTool",name:"\u8F6C\u4E49\u5904\u7406",icon:"fa-quote-left",description:"\u5BF9\u63D0\u53D6\u5185\u5BB9\u6267\u884C\u672C\u5730\u8F6C\u4E49\u6216\u53BB\u8F6C\u4E49",enabled:!0,order:6,output:{mode:"local_transform",apiPreset:"",overwrite:!0,enabled:!0,autoTrigger:!0},extraction:{enabled:!0,maxMessages:5,selectors:[]},processor:{type:"escape_transform",direction:"escape",options:{doubleQuote:!0,singleQuote:!1,newline:!1}},runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},extractTags:[]},punctuationTransformTool:{id:"punctuationTransformTool",name:"\u4E2D\u6587\u6807\u70B9\u66FF\u6362",icon:"fa-language",description:"\u5C06\u82F1\u6587\u6807\u70B9\u6309\u52FE\u9009\u9879\u66FF\u6362\u4E3A\u4E2D\u6587\u6807\u70B9",enabled:!0,order:7,output:{mode:"local_transform",apiPreset:"",overwrite:!0,enabled:!0,autoTrigger:!0},extraction:{enabled:!0,maxMessages:5,selectors:[]},processor:{type:"punctuation_transform",direction:"en_to_zh",options:{comma:!0,period:!0,exclamation:!0,question:!0,semicolon:!1,colon:!1,leftParen:!1,rightParen:!1}},runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},extractTags:[]}},zs={presetManagement:{id:"presetManagement",name:"\u9884\u8BBE\u7BA1\u7406",icon:"fa-bookmark",hasSubTabs:!0,description:"\u7EDF\u4E00\u7BA1\u7406 API / \u6B63\u5219 / \u4E16\u754C\u4E66 / \u8868\u683C\u6A21\u677F\u9884\u8BBE",order:0,subTabs:[{id:"apiPresets",name:"API \u9884\u8BBE",icon:"fa-database",component:"ApiPresetPanel",presetKind:"api"},{id:"regexPresets",name:"\u6B63\u5219\u63D0\u53D6",icon:"fa-filter",component:"RegexExtractPanel",presetKind:"regex"},{id:"worldbookPresets",name:"\u4E16\u754C\u4E66",icon:"fa-book-atlas",component:"WorldbookPresetPanel",presetKind:"worldbook"},{id:"tableTemplates",name:"\u8868\u683C\u6A21\u677F",icon:"fa-table-list",component:"TableTemplatePanel",presetKind:"table"}]},tools:{id:"tools",name:"\u5DE5\u5177",icon:"fa-tools",hasSubTabs:!0,description:"\u5DE5\u5177\u96C6\u5408",order:4,subTabs:[{id:"summaryTool",name:"\u6458\u8981\u5DE5\u5177",icon:"fa-file-lines",component:"SummaryToolPanel",toolKind:"ai"},{id:"statusBlock",name:"\u4E3B\u89D2\u72B6\u6001\u680F",icon:"fa-user-check",component:"StatusBlockPanel",toolKind:"ai"},{id:"youyouReview",name:"\u5C0F\u5E7D\u70B9\u8BC4",icon:"fa-comment-dots",component:"YouyouReviewPanel",toolKind:"ai"},{id:"escapeTransformTool",name:"\u8F6C\u4E49\u5904\u7406",icon:"fa-quote-left",component:"EscapeTransformToolPanel",toolKind:"script"},{id:"punctuationTransformTool",name:"\u4E2D\u6587\u6807\u70B9\u66FF\u6362",icon:"fa-language",component:"PunctuationTransformToolPanel",toolKind:"script"}]},tableWorkbench:{id:"tableWorkbench",name:"\u586B\u8868\u5DE5\u4F5C\u53F0",icon:"fa-table-cells",hasSubTabs:!1,description:"\u7ED3\u6784\u5316\u586B\u8868\u4E0E\u72B6\u6001\u9884\u89C8\u5DE5\u4F5C\u53F0",component:"TableWorkbenchPanel",order:5},bypass:{id:"bypass",name:"Ai\u6307\u4EE4\u9884\u8BBE",icon:"fa-shield-halved",hasSubTabs:!1,description:"\u7BA1\u7406 Ai \u6307\u4EE4\u9884\u8BBE",component:"BypassPanel",order:6},settings:{id:"settings",name:"\u8BBE\u7F6E",icon:"fa-cog",hasSubTabs:!1,description:"\u5168\u5C40\u8BBE\u7F6E",component:"SettingsPanel",order:7},logger:{id:"logger",name:"\u65E5\u5FD7",icon:"fa-terminal",hasSubTabs:!1,description:"\u67E5\u770B\u63D2\u4EF6\u8FD0\u884C\u65E5\u5FD7\uFF0C\u652F\u6301\u8FC7\u6EE4\u4E0E\u5BFC\u51FA",component:"LoggerPanel",order:8}},If={api:{name:"API\u5DE5\u5177",icon:"fa-plug",order:0},prompt:{name:"\u63D0\u793A\u8BCD\u5DE5\u5177",icon:"fa-file-alt",order:1},utility:{name:"\u5B9E\u7528\u5DE5\u5177",icon:"fa-wrench",order:2}},Er={...zs};V0={TOOL_REGISTRY:zs,TOOL_CATEGORIES:If,registerTool:Pf,unregisterTool:Nf,getToolList:$f,getToolConfig:Zo,hasTool:td,getToolSubTabs:Lf,resetToolRegistry:Of,setToolApiPreset:Df,getToolApiPreset:rd,clearToolApiPreset:Bf,getAllToolApiBindings:zf,onPresetDeleted:Kf,saveToolWindowState:Hf,getToolWindowState:qf,getToolBaseConfig:Si,ensureToolRuntimeConfig:Ks,getToolFullConfig:xe,patchToolRuntime:ln,appendToolRuntimeHistory:Ff,saveToolConfig:Ue,resetToolConfig:Uf,getAllDefaultToolConfigs:jf,getAllToolFullConfigs:ea,getEnabledTools:Wf}});function Ei(){return`rgx_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`}function Jf(){return`r_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,6)}`}function id(t={}){let e=Object.values(ur).includes(t.type)?t.type:ur.INCLUDE;return{id:String(t.id||Jf()),name:String(t.name||"").trim(),description:String(t.description||""),type:e,value:String(t.value||""),enabled:t.enabled!==!1}}function Cr(t={}){return{id:String(t.id||Ei()),name:String(t.name||"").trim()||"\u672A\u547D\u540D\u9884\u8BBE",description:String(t.description||""),rules:Array.isArray(t.rules)?t.rules.map(id):[],blacklist:Array.isArray(t.blacklist)?t.blacklist.map(e=>String(e||"").trim()).filter(Boolean):[],createdAt:Number.isFinite(t.createdAt)?t.createdAt:Date.now(),updatedAt:Number.isFinite(t.updatedAt)?t.updatedAt:Date.now()}}function Br(){let t=Fe.get(ad);return!t||typeof t!="object"?{}:t}function ta(t){Fe.set(ad,t)}function ts(t){return typeof t=="string"&&t.startsWith(J0)}function Qf(t){return ts(t)&&Ti.find(e=>e.id===t)||null}function ld(t){if(!Array.isArray(t)){Ti=[];return}Ti=t.map(e=>Cr({...e,id:String(e?.id||"")})).filter(e=>ts(e.id))}function Us(){if(Vf)return;Vf=!0;let t=j.get(Gf)||{};if(t[Yf]===!0)return;let e=Br(),r=Object.keys(e).length>0,n=0,s={...e},o=t.tagRulePresets||{};for(let a of Object.values(o)){let i=Cr({id:Ei(),name:a.name||"\u5DF2\u8FC1\u79FB\u9884\u8BBE",description:a.description||"",rules:a.rules||[],blacklist:a.blacklist||[],createdAt:typeof a.createdAt=="string"&&Date.parse(a.createdAt)||Date.now(),updatedAt:Date.now()});s[i.id]=i,n+=1}if(!r&&n===0){let a=Array.isArray(t.tagRules)?t.tagRules:[],i=Array.isArray(t.contentBlacklist)?t.contentBlacklist:[];if(a.length||i.length){let l=Cr({name:"\u9ED8\u8BA4\u89C4\u5219\u96C6\uFF08\u8FC1\u79FB\uFF09",description:"\u4ECE\u8001\u7248\u672C\u7684\u5F53\u524D\u89C4\u5219\u8FC1\u79FB\u800C\u6765",rules:a,blacklist:i});s[l.id]=l,Fe.set(Fs,l.id),n+=1}}n>0&&(ta(s),cn.info(`\u5DF2\u4ECE\u8001\u6570\u636E\u8FC1\u79FB ${n} \u4E2A\u6B63\u5219\u9884\u8BBE`)),j.set(Gf,{...t,[Yf]:!0})}function Q0(){Us();let t=Br(),e=new Set,r=[];for(let s of Ti){let o=t[s.id];o?(r.push(Cr(o)),e.add(s.id)):r.push(s)}let n=Object.values(t).map(Cr).filter(s=>!e.has(s.id)).sort((s,o)=>o.updatedAt-s.updatedAt);return r.push(...n),r}function zr(t){if(!t)return null;Us();let e=Br();return e[t]?Cr(e[t]):ts(t)?Qf(t):null}function Ai(){Us();let t=Fe.get(Fs);return typeof t=="string"&&t?t:""}function Xf(){let t=Ai();return t?zr(t):null}function X0(t){if(t&&ts(t))return Fe.set(Fs,t),_i(),q.emit(G.PRESET_ACTIVATED,{kind:"regex",id:t}),!0;let e=Br();return t&&!e[t]?(cn.warn(`setCurrentPresetId \u627E\u4E0D\u5230\u9884\u8BBE: ${t}`),!1):(Fe.set(Fs,t||""),_i(),q.emit(G.PRESET_ACTIVATED,{kind:"regex",id:t}),!0)}function Ci(t={}){Us();let e=Cr({...t,id:Ei(),createdAt:Date.now(),updatedAt:Date.now()}),r=Br();return r[e.id]=e,ta(r),q.emit(G.PRESET_CREATED,{kind:"regex",id:e.id}),cn.info(`\u521B\u5EFA\u9884\u8BBE: ${e.id} (${e.name})`),e}function rs(t,e={}){if(!t)return null;let r=Br(),n=r[t];if(!n&&ts(t)&&(n=Qf(t)),!n)return null;let s=Cr({...n,...e,id:t,createdAt:n.createdAt,updatedAt:Date.now()});return r[t]=s,ta(r),Ai()===t&&od(s),q.emit(G.PRESET_UPDATED,{kind:"regex",id:t}),s}function Z0(t){if(!t)return!1;if(ts(t))return cn.warn(`\u62D2\u7EDD\u5220\u9664\u5185\u7F6E\u9884\u8BBE: ${t}`),!1;let e=Br();return e[t]?(delete e[t],ta(e),Ai()===t&&(Fe.set(Fs,""),_i()),q.emit(G.PRESET_DELETED,{kind:"regex",id:t}),cn.info(`\u5220\u9664\u9884\u8BBE: ${t}`),!0):!1}function eS(t,{nameSuffix:e=" \u526F\u672C"}={}){let r=zr(t);return r?Ci({...r,id:void 0,name:`${r.name}${e}`}):null}function tS(t,e){return ts(t)?(cn.warn(`\u62D2\u7EDD\u91CD\u547D\u540D\u5185\u7F6E\u9884\u8BBE: ${t}`),null):rs(t,{name:String(e||"").trim()||"\u672A\u547D\u540D\u9884\u8BBE"})}function rS(t,e={}){let r=zr(t);if(!r)return null;let n=id({...e,id:Jf()}),s=[...r.rules,n];return rs(t,{rules:s})}function nS(t,e,r={}){let n=zr(t);if(!n)return null;let s=n.rules.map(o=>o.id===e?id({...o,...r,id:o.id}):o);return rs(t,{rules:s})}function sS(t,e){let r=zr(t);if(!r)return null;let n=r.rules.filter(s=>s.id!==e);return rs(t,{rules:n})}function oS(t,e,r){let n=zr(t);if(!n)return null;let s=n.rules.findIndex(i=>i.id===e);if(s<0)return null;let o=r==="up"?s-1:s+1;if(o<0||o>=n.rules.length)return null;let a=[...n.rules];return[a[s],a[o]]=[a[o],a[s]],rs(t,{rules:a})}function aS(t,e){let r=Array.isArray(e)?e.map(n=>String(n||"").trim()).filter(Boolean):[];return rs(t,{blacklist:Array.from(new Set(r))})}function iS(){return Us(),{version:1,exportedAt:Date.now(),presets:Object.values(Br()).map(Cr)}}function lS(t){if(Us(),!t||typeof t!="object")return{added:0};let e=Array.isArray(t.presets)?t.presets:[],r=Br(),n=0;for(let s of e){let o=Cr({...s,id:Ei(),createdAt:Date.now(),updatedAt:Date.now()});r[o.id]=o,n+=1}return n>0&&(ta(r),q.emit(G.PRESET_IMPORTED,{kind:"regex",count:n})),{added:n}}function cS(){Fe.set(ad,{}),Fe.set(Fs,""),_i(),cn.info("\u5DF2\u6E05\u7A7A\u6240\u6709\u6B63\u5219\u9884\u8BBE")}async function od(t){if(t)try{let e=await Promise.resolve().then(()=>(Xn(),Jc));typeof e.setCurrentRules=="function"&&e.setCurrentRules(JSON.parse(JSON.stringify(t.rules||[]))),typeof e.setContentBlacklist=="function"&&e.setContentBlacklist(JSON.parse(JSON.stringify(t.blacklist||[])))}catch(e){cn.warn("\u540C\u6B65\u5230 regex-extractor \u5931\u8D25",{error:e})}}function _i(){let t=Xf();return od(t||{rules:[],blacklist:[]})}async function dS(t){if(!t)return[];try{let e=await Promise.resolve().then(()=>(Ar(),sd));return(typeof e.getToolList=="function"?e.getToolList(!1):[]).filter(n=>(typeof e.getToolFullConfig=="function"?e.getToolFullConfig(n.id):null)?.extraction?.regexPresetId===t).map(n=>n.id)}catch{return[]}}var cn,ad,Fs,Gf,Yf,ur,J0,Ti,Vf,Oe,dn=O(()=>{Je();nt();Z();cn=$.createScope("RegexPresetStore"),ad="regex_presets",Fs="regex_current_preset",Gf="settings",Yf="regex_presets_migrated",ur=Object.freeze({INCLUDE:"include",EXCLUDE:"exclude",REGEX_INCLUDE:"regex_include",REGEX_EXCLUDE:"regex_exclude"});J0="builtin_regex_",Ti=[];Vf=!1;Oe={listPresets:Q0,getPreset:zr,getCurrentPresetId:Ai,getCurrentPreset:Xf,setCurrentPresetId:X0,createPreset:Ci,updatePreset:rs,deletePreset:Z0,duplicatePreset:eS,renamePreset:tS,addRule:rS,updateRule:nS,deleteRule:sS,moveRule:oS,setBlacklist:aS,exportAll:iS,importPresets:lS,resetAll:cS,findLinkedTools:dS,RULE_TYPES:ur}});var rm={};he(rm,{RegexExtractPanel:()=>tm,default:()=>hS});function pS(t,e,r,n,s,o){let a=f("div",{style:{display:"grid",gridTemplateColumns:"auto auto minmax(140px, 1fr) 200px minmax(120px, 2fr) auto",gap:"10px",alignItems:"center",padding:"10px 0",borderTop:r===0?"none":"1px solid var(--yyt-border)",opacity:e.enabled===!1?"0.55":"1"},attrs:{draggable:o?null:"true","data-rule-id":e.id}}),i=f("div",{style:{cursor:o?"default":"grab",padding:"4px",color:"var(--yyt-text-muted)",fontSize:"14px",userSelect:"none"},text:"\u22EE\u22EE",title:o?"\u5185\u7F6E\u9884\u8BBE\u4E0D\u53EF\u91CD\u6392":"\u62D6\u52A8\u6392\u5E8F"});a.appendChild(i);let l=f("div",{style:{display:"flex",flexDirection:"column",gap:"2px"}}),d=se({label:"\u25B2",size:"small",variant:"ghost",title:"\u4E0A\u79FB",disabled:o||r===0,style:{padding:"0 6px",minHeight:"auto",fontSize:"9px"},onClick:()=>{Oe.moveRule(t.id,e.id,"up"),s()}}),c=se({label:"\u25BC",size:"small",variant:"ghost",title:"\u4E0B\u79FB",disabled:o||r===n-1,style:{padding:"0 6px",minHeight:"auto",fontSize:"9px"},onClick:()=>{Oe.moveRule(t.id,e.id,"down"),s()}});l.appendChild(d.el),l.appendChild(c.el),a.appendChild(l);let u=f("div",{style:{display:"flex",flexDirection:"column",gap:"2px",minWidth:"0"}}),y=Te({value:e.name||"",placeholder:"\u89C4\u5219\u540D\uFF08\u53EF\u9009\uFF09",disabled:o,style:{fontSize:"12px",padding:"6px 10px"},onChange:v=>Oe.updateRule(t.id,e.id,{name:v})});u.appendChild(y.el),e.description&&u.appendChild(f("div",{text:e.description,style:{fontSize:"10px",color:"var(--yyt-text-muted)"}})),a.appendChild(u);let p=Me({value:e.type,disabled:o,options:uS,style:{fontSize:"11px",padding:"6px 10px"},onChange:v=>{Oe.updateRule(t.id,e.id,{type:v}),s()}});a.appendChild(p.el);let m=e.type===ur.REGEX_INCLUDE||e.type===ur.REGEX_EXCLUDE,g=Te({value:e.value||"",placeholder:m?"\u6B63\u5219\u8868\u8FBE\u5F0F...":"\u6807\u7B7E\u540D\uFF08\u5982 content\uFF09",disabled:o,style:{fontSize:"12px",padding:"6px 10px",fontFamily:"ui-monospace, monospace"},onChange:v=>Oe.updateRule(t.id,e.id,{value:v})});a.appendChild(g.el);let h=f("div",{style:{display:"flex",gap:"6px",alignItems:"center"}}),b=Ze({checked:e.enabled!==!1,disabled:o,style:{padding:"0",border:"none",background:"transparent"},onChange:v=>{Oe.updateRule(t.id,e.id,{enabled:v}),s()}});return h.appendChild(b.el),o||h.appendChild(se({label:"\xD7",size:"small",variant:"ghost",title:"\u5220\u9664\u89C4\u5219",onClick:()=>{Oe.deleteRule(t.id,e.id),s()}}).el),a.appendChild(h),a}function yS(t,e,r){let n=null;t.addEventListener("dragstart",s=>{let o=s.target;if(!(o instanceof HTMLElement))return;let a=o.closest("[data-rule-id]");if(a){n=a.getAttribute("data-rule-id"),a.style.opacity="0.4";try{s.dataTransfer.effectAllowed="move",s.dataTransfer.setData("text/plain",n)}catch{}}}),t.addEventListener("dragend",s=>{let o=s.target;o instanceof HTMLElement&&(o.style.opacity=""),n=null}),t.addEventListener("dragover",s=>{if(n){s.preventDefault();try{s.dataTransfer.dropEffect="move"}catch{}}}),t.addEventListener("drop",s=>{if(s.preventDefault(),!n)return;let o=s.target instanceof HTMLElement?s.target.closest("[data-rule-id]"):null;if(!o)return;let a=o.getAttribute("data-rule-id");if(!a||a===n)return;let i=Oe.getPreset(e.id);if(!i)return;let l=i.rules.findIndex(y=>y.id===n),d=i.rules.findIndex(y=>y.id===a);if(l<0||d<0)return;let c=[...i.rules],[u]=c.splice(l,1);c.splice(d,0,u),Oe.updatePreset(e.id,{rules:c}),r()})}function fS(t,{onChange:e,readonly:r,refresh:n}){let s=f("div",{style:{display:"flex",flexDirection:"column",gap:"14px"}});re(s,Wt({label:"\u63CF\u8FF0",control:Te({value:t.description,placeholder:"\u53EF\u9009 \u2014 \u5907\u6CE8\u7528\u9014",disabled:r,onChange:i=>e({description:i})})}));let o=f("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"6px"}},f("div",{text:"\u63D0\u53D6\u89C4\u5219\uFF08\u6309\u987A\u5E8F\u5E94\u7528\uFF09",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}}),r?f("span",{text:"\u5185\u7F6E\u9884\u8BBE\u53EA\u8BFB",style:{fontSize:"11px",color:"var(--yyt-text-muted)"}}):se({label:"+ \u65B0\u589E\u89C4\u5219",size:"small",onClick:()=>{Oe.addRule(t.id,{type:ur.INCLUDE,value:"",enabled:!0}),n&&n()}}).el);re(s,o);let a=f("div");if(t.rules.length){for(let i=0;i<t.rules.length;i++)a.appendChild(pS(t,t.rules[i],i,t.rules.length,n,r));r||yS(a,t,n)}else a.appendChild(f("div",{style:{padding:"14px 0",color:"var(--yyt-text-muted)",fontSize:"12px"},text:'\u5C1A\u65E0\u89C4\u5219\u3002\u70B9\u51FB\u53F3\u4E0A\u89D2"+ \u65B0\u589E\u89C4\u5219"\u5F00\u59CB\u6DFB\u52A0\u3002'}));if(re(s,a),re(s,f("div",{text:"\u5185\u5BB9\u9ED1\u540D\u5355",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)",marginTop:"6px",marginBottom:"4px"}})),re(s,f("div",{text:"\u63D0\u53D6\u51FA\u7684\u5185\u5BB9\u5757\u82E5\u5305\u542B\u4EFB\u4E00\u5173\u952E\u8BCD\u5219\u8DF3\u8FC7\u8BE5\u5757\uFF08\u4E0D\u533A\u5206\u5927\u5C0F\u5199\uFF09\u3002",style:{fontSize:"11px",color:"var(--yyt-text-muted)",marginBottom:"6px"}})),r)re(s,f("div",{style:{fontSize:"12px",color:"var(--yyt-text-muted)"},text:t.blacklist.length?t.blacklist.join("\u3001"):"\uFF08\u7A7A\uFF09"}));else{let i=Pc({values:t.blacklist,placeholder:"\u8F93\u5165\u5173\u952E\u8BCD\u56DE\u8F66\u6DFB\u52A0",chipVariant:"danger",onChange:l=>Oe.setBlacklist(t.id,l)});re(s,i.el)}return s}function mS(t){if(!t)return null;let e=f("div",{style:{display:"flex",flexDirection:"column",gap:"8px"}});re(e,f("div",{text:"\u6D4B\u8BD5\u63D0\u53D6",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}}));let r=em.get(t.id)||{input:"",output:""};em.set(t.id,r);let n=f("textarea",{className:"yyt-textarea",attrs:{rows:"5",placeholder:"\u7C98\u8D34\u6D4B\u8BD5\u6587\u672C\uFF08\u5982 AI \u56DE\u590D\u539F\u6587\uFF09..."},style:{width:"100%",resize:"vertical",fontFamily:"ui-monospace, monospace",fontSize:"12px"}});n.value=r.input,n.addEventListener("input",()=>{r.input=n.value}),re(e,n);let s=f("div",{style:{padding:"10px",background:"var(--yyt-bg-base)",border:"1px solid var(--yyt-border)",borderRadius:"var(--yyt-radius-sm)",fontFamily:"ui-monospace, monospace",fontSize:"11px",lineHeight:"1.6",color:"var(--yyt-text-muted)",maxHeight:"200px",overflowY:"auto",whiteSpace:"pre-wrap",wordBreak:"break-all",minHeight:"50px"}});s.textContent=r.output||'// \u70B9\u51FB"\u8FD0\u884C\u6D4B\u8BD5"\u770B\u63D0\u53D6\u7ED3\u679C';let o=se({label:"\u25B6 \u8FD0\u884C\u6D4B\u8BD5",size:"small",variant:"primary",onClick:()=>{let a=n.value;if(!a.trim()){r.output="// \u6D4B\u8BD5\u8F93\u5165\u4E3A\u7A7A",s.textContent=r.output,s.style.color="var(--yyt-text-muted)";return}try{let i=Dr(a,t.rules||[],t.blacklist||[]);r.output=i||"// \u6CA1\u6709\u63D0\u53D6\u5230\u5185\u5BB9",s.textContent=r.output,s.style.color=i?"var(--yyt-text)":"var(--yyt-text-muted)"}catch(i){r.output=`// \u6D4B\u8BD5\u51FA\u9519\uFF1A${i?.message||i}`,s.textContent=r.output,s.style.color="var(--yyt-danger, #f87171)"}}});return re(e,o.el),re(e,s),e}function gS(t){let e=t.rules.filter(r=>r.enabled!==!1).length;return[`${t.rules.length} \u89C4\u5219\uFF08${e} \u542F\u7528\uFF09`,`${t.blacklist.length} \u9ED1\u540D\u5355`]}var tR,uS,em,tm,hS,nm=O(()=>{It();dn();Xn();Z();Uo();tR=$.createScope("RegexExtractPanel"),uS=[{value:ur.INCLUDE,label:"include \u2014 \u63D0\u53D6\u6807\u7B7E"},{value:ur.EXCLUDE,label:"exclude \u2014 \u6392\u9664\u6807\u7B7E"},{value:ur.REGEX_INCLUDE,label:"regex_include \u2014 \u6B63\u5219\u63D0\u53D6"},{value:ur.REGEX_EXCLUDE,label:"regex_exclude \u2014 \u6B63\u5219\u6392\u9664"}],em=new Map;tm=en({id:"regexExtractPanel",kind:"regex",panelTitle:"\u6B63\u5219\u63D0\u53D6\u9884\u8BBE",panelHint:"\u7BA1\u7406\u591A\u4E2A\u63D0\u53D6\u89C4\u5219\u96C6\uFF0C\u5DE5\u5177\u914D\u7F6E\u4E2D\u901A\u8FC7\u9884\u8BBE ID \u5F15\u7528\u3002\u89C4\u5219\u6309\u987A\u5E8F\u5E94\u7528\uFF0C\u53EF\u62D6\u62FD\u6392\u5E8F\u3002",store:Oe,renderEditor:fS,renderExtras:mS,renderListItemMeta:gS}),hS=tm});function Ne(t){return t==null?"":String(t).trim()}function sm(t="table"){let e=Ne(t)||"table",r=Date.now().toString(36),n=Math.random().toString(36).slice(2,8);return`${e}_${r}_${n}`}function cd(t="table"){return sm(t)}function Kr(t="row"){return sm(t)}function pr(t,e=0){return Ne(t)||`table_${Number.isFinite(e)?e+1:1}`}function ra(t,e=0){return Ne(t)||`row_${Number.isFinite(e)?e+1:1}`}function fe(t){if(t!==void 0)try{return JSON.parse(JSON.stringify(t))}catch{return t}}function js(t={}){return{chatId:Ne(t.chatId),sourceMessageId:Ne(t.sourceMessageId||t.messageId),sourceSwipeId:Ne(t.sourceSwipeId||t.effectiveSwipeId),effectiveSwipeId:Ne(t.effectiveSwipeId||t.sourceSwipeId),slotBindingKey:Ne(t.slotBindingKey),slotRevisionKey:Ne(t.slotRevisionKey),slotTransactionId:Ne(t.slotTransactionId),traceId:Ne(t.traceId),resolvedAt:Number.isFinite(t.resolvedAt)?t.resolvedAt:Date.now()}}function dd(t={}){return{resolvedAt:Number.isFinite(t.resolvedAt)?t.resolvedAt:Date.now(),runSource:Ne(t.runSource)||ft.MANUAL,traceId:Ne(t.traceId),chatId:Ne(t.chatId),sourceMessageId:Ne(t.sourceMessageId||t.messageId),sourceSwipeId:Ne(t.sourceSwipeId||t.effectiveSwipeId),effectiveSwipeId:Ne(t.effectiveSwipeId||t.sourceSwipeId)||"swipe:current",slotBindingKey:Ne(t.slotBindingKey),slotRevisionKey:Ne(t.slotRevisionKey),slotTransactionId:Ne(t.slotTransactionId),assistantContentFingerprint:Ne(t.assistantContentFingerprint),assistantBaseFingerprint:Ne(t.assistantBaseFingerprint),assistantText:String(t.assistantText||""),assistantBaseText:String(t.assistantBaseText||""),targetMessageIndex:Number.isFinite(t.targetMessageIndex)?t.targetMessageIndex:-1}}function kr(t){return!t||typeof t!="object"?null:{chatId:Ne(t.chatId),slotBindingKey:Ne(t.slotBindingKey),slotRevisionKey:Ne(t.slotRevisionKey),sourceMessageId:Ne(t.sourceMessageId),sourceSwipeId:Ne(t.sourceSwipeId),tables:Array.isArray(t.tables)?fe(t.tables):[],updatedAt:Number.isFinite(t.updatedAt)?t.updatedAt:0,meta:t.meta&&typeof t.meta=="object"?fe(t.meta):{}}}function na(t={},e={}){let r=dd(t),n=e.meta&&typeof e.meta=="object"?fe(e.meta):{};return{chatId:r.chatId,slotBindingKey:r.slotBindingKey,slotRevisionKey:r.slotRevisionKey,sourceMessageId:r.sourceMessageId,sourceSwipeId:r.sourceSwipeId||r.effectiveSwipeId,tables:Array.isArray(e.tables)?fe(e.tables):[],updatedAt:Number.isFinite(e.updatedAt)?e.updatedAt:Date.now(),meta:{sourceKind:n.sourceKind||Gt.EMPTY,...n}}}function ki(t){return!t||typeof t!="object"?{lastResolvedTarget:null,lastCommittedTarget:null,updatedAt:0}:{lastResolvedTarget:t.lastResolvedTarget?js(t.lastResolvedTarget):null,lastCommittedTarget:t.lastCommittedTarget?js(t.lastCommittedTarget):null,updatedAt:Number.isFinite(t.updatedAt)?t.updatedAt:0}}function De(t){if(t==null)return Ot;let e=String(t).trim();return e===""?Ot:e}function sa(t,e){let r=Ne(t),n=De(e);return`${r}::${n}`}function am(){return{rows:[],cols:[],cells:[],indexColumn:!1}}function im(t,e){return`${Number.isFinite(t)?t:-1}:${Number.isFinite(e)?e:-1}`}var un,pn,ft,Rt,ns,Gt,Ws,bS,Ot,st,om,rR,nR,We=O(()=>{un="YouYouToolkit_tableState",pn="YouYouToolkit_tableBindings",ft=Object.freeze({MANUAL:"MANUAL_TABLE",AUTO:"AUTO_TABLE"}),Rt=Object.freeze({ENABLED:"enabled",SELECTED:"selected",CURRENT:"current"}),ns=Object.freeze({EXACT:"exact",BINDING_FALLBACK:"binding_fallback",HISTORY:"history",TEMPLATE:"template",EMPTY:"empty"}),Gt=Object.freeze({EXACT:"exact",BINDING:"binding",HISTORY:"history",TEMPLATE:"template",EMPTY:"empty"}),Ws=Object.freeze({INSERT_ROW:"insertRow",UPDATE_ROW:"updateRow",DELETE_ROW:"deleteRow"}),bS=Object.freeze({CELL:"cell",ROW:"row",COLUMN:"column",INDEX_COLUMN:"index_column"});Ot="";st=Object.freeze({INHERIT_GLOBAL:"inherit_global",CHAT_OVERRIDE:"chat_override",PRESET_LINK:"preset_link"}),om=8,rR=Object.freeze({NOTE:"note",INIT_NODE:"initNode",INSERT_NODE:"insertNode",UPDATE_NODE:"updateNode",DELETE_NODE:"deleteNode"}),nR=Object.freeze({INHERIT_GLOBAL:-1,DISABLED:0})});function Ii(t,e=""){return t==null?e:String(t).trim()||e}function xS(t,e=!1){return t==null?e:t===!0}function Ri(t={},e=0){return pr(t?.id||t?.key,e)}function oa(t={},e={}){let r=t&&typeof t=="object"?t:{},n=e&&typeof e=="object"?e:{},s=Ii(r.mode||r.runScope||n.mode||n.runScope,Rt.ENABLED),o=Array.isArray(r.selectedTableIds)?r.selectedTableIds.map(i=>Ii(i,"")).filter(Boolean):Array.isArray(n.selectedTableIds)?n.selectedTableIds.map(i=>Ii(i,"")).filter(Boolean):[],a=Ii(r.activeTableId||n.activeTableId,"");return{mode:Object.values(Rt).includes(s)?s:Rt.ENABLED,selectedTableIds:o,activeTableId:a}}function lm(t={},e=[]){let r=oa(t,t?.scope||{}),n=Array.isArray(e)?e:[],s=n.map((c,u)=>Ri(c,u)),o=new Set(s),a=r.mode,i=!1;a===Rt.CURRENT?(!r.activeTableId||!o.has(r.activeTableId))&&(a=Rt.ENABLED,i=!0):a===Rt.SELECTED&&r.selectedTableIds.filter(u=>o.has(u)).length===0&&(a=Rt.ENABLED,i=!0);let l=[];a===Rt.CURRENT?l=r.activeTableId?[r.activeTableId]:[]:a===Rt.SELECTED?l=r.selectedTableIds.filter(c=>o.has(c)):l=n.map((c,u)=>({table:c,id:Ri(c,u)})).filter(({table:c})=>xS(c?.enabled,!0)).map(({id:c})=>c);let d=new Set(l);return{...r,mode:a,requestedMode:r.mode,staleScope:i,allTableIds:s,allowedTableIds:l,allowedIdSet:d,includes(c={},u=-1){return d.has(Ri(c,u))},filterTables(c=[]){return(Array.isArray(c)?c:[]).filter((y,p)=>d.has(Ri(y,p)))},toJSON(){return{mode:a,requestedMode:r.mode,staleScope:i,selectedTableIds:fe(r.selectedTableIds),activeTableId:r.activeTableId,allowedTableIds:[...l]}}}}var Mi=O(()=>{We()});function Yt(t,e=""){return t==null?e:String(t).trim()||e}function ud(){let t=globalThis.window||globalThis;return Yt(t?.TavernHelper?.getCurrentChatId?.()||t?.Silvy?.getCurrentChatId?.()||t?.chat_metadata?.chat_id||t?.this_chid||t?.name1,"default_chat")}function wS(t,e=!1){return t===!0}function vS(t={}){let e=t&&typeof t=="object"?t:{};return{enabled:wS(e.enabled,!1),targetBook:Yt(e.targetBook,""),entryComment:Yt(e.entryComment,"YYT-\u586B\u8868\u6570\u636E")}}function pd(t={},e={}){let r=t&&typeof t=="object"?t:{},n=oa(r.scope,{mode:r.runScope||e.runScope||Rt.ENABLED,selectedTableIds:r.selectedTableIds||e.selectedTableIds||[],activeTableId:r.activeTableId||e.activeTableId||""});return{chatId:Yt(r.chatId,Yt(e.chatId,ud())),templateId:Yt(r.templateId,Yt(e.templateId,Mt)),enabledTableIds:Array.isArray(r.enabledTableIds)?r.enabledTableIds.map(s=>Yt(s,"")).filter(Boolean):[],focusedTableId:Yt(r.focusedTableId,n.activeTableId),scope:n,worldbookSync:vS(r.worldbookSync),seedNote:Yt(r.seedNote,""),updatedAt:Yt(r.updatedAt,new Date().toISOString())}}function um(){let t=cm.get(dm,{});return t&&typeof t=="object"&&!Array.isArray(t)?t:{}}function yd(t=ud()){let e=Yt(t,"default_chat"),r=um();return pd(r[e],{chatId:e})}function pm(t={},e=ud()){let r=Yt(e,"default_chat"),n=um(),s=pd({...n[r],...t||{},chatId:r,updatedAt:new Date().toISOString()},{chatId:r});return cm.set(dm,{...n,[r]:s}),{success:!0,guide:s}}function ym(t={},e=null){let r=pd(e||yd(),{templateId:t.activeTemplate,runScope:t.runScope,selectedTableIds:t.scope?.selectedTableIds,activeTableId:t.scope?.activeTableId}),n={...t,activeTemplate:r.templateId||t.activeTemplate,runScope:r.scope.mode,scope:r.scope};return r.worldbookSync&&r.worldbookSync.targetBook&&(n.worldbookSync={...t.worldbookSync||{},...r.worldbookSync}),n}var cm,dm,fm=O(()=>{Je();sr();We();Mi();cm=j.namespace("tableWorkbenchGuides"),dm="guides"});function pe(t,e,r="",n=Ni){return{key:t,title:e,description:r,type:n,required:!1}}function yn({id:t,name:e,note:r,aiInstructions:n,columns:s}){return{id:t,name:e,note:r,enabled:!0,aiInstructions:{init:n?.init||"",create:n?.create||"",update:n?.update||"",delete:n?.delete||""},columns:s,rows:[]}}var Be,Pi,fd,mm,SS,Ni,gm,Mt,md,Hs,hm=O(()=>{Be=Object.freeze({IDLE:"idle",RUNNING:"running",SUCCESS:"success",ERROR:"error",ABORTED:"aborted",SKIPPED:"skipped"}),Pi=Object.freeze({INCREMENTAL:"incremental",FULL:"full"}),fd=`\u8BF7\u6839\u636E\u5F53\u524D\u5BF9\u8BDD\u4E0E\u5F53\u524D\u8868\u683C\u57FA\u5E95\uFF0C\u5BF9\u7ED3\u6784\u5316 tables \u6570\u636E\u505A\u589E\u91CF\u66F4\u65B0\u3002

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
{{toolContentMacro}}`,mm=`\u8F93\u51FA\u8981\u6C42 \u2014 \u7528 <tableEdit>...</tableEdit> \u589E\u91CF DSL\uFF1A

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
\u4F46\u5E94\u8BE5\u5C3D\u91CF\u4F18\u5148\u7528 DSL\uFF08\u6D41\u91CF\u5C0F\u3001\u4E0D\u5F71\u54CD\u9501\u5B57\u6BB5\uFF09\u3002`,SS=Object.freeze([{value:"text",label:"\u6587\u672C"},{value:"number",label:"\u6570\u5B57"},{value:"boolean",label:"\u5E03\u5C14"},{value:"date",label:"\u65E5\u671F"},{value:"json",label:"JSON"}]),Ni="text",gm=Object.freeze(SS.map(t=>Object.freeze({...t}))),Mt="default_story_state",md="\u9ED8\u8BA4\u5267\u60C5\u72B6\u6001\u6A21\u677F";Hs=Object.freeze([yn({id:"default_global_state",name:"\u5168\u5C40\u6570\u636E\u8868",note:"\u8BB0\u5F55\u5F53\u524D\u4E3B\u89D2\u6240\u5728\u5730\u70B9\u53CA\u65F6\u95F4\u76F8\u5173\u53C2\u6570\u3002\u6B64\u8868\u901A\u5E38\u6709\u4E14\u4EC5\u6709\u4E00\u884C\u3002",aiInstructions:{init:"\u63D2\u5165\u4E00\u6761\u5173\u4E8E\u5F53\u524D\u4E16\u754C\u72B6\u6001\u7684\u8BB0\u5F55\u3002",create:"\u901A\u5E38\u7981\u6B62\u65B0\u589E\uFF1B\u9664\u975E\u8868\u4E3A\u7A7A\u4E14\u9700\u8981\u521D\u59CB\u5316\u3002",update:"\u5F53\u5730\u70B9\u6216\u65F6\u95F4\u53D1\u751F\u53D8\u5316\u65F6\u66F4\u65B0\u6B64\u8868\uFF1B\u6BCF\u8F6E\u5E94\u6839\u636E\u5267\u60C5\u66F4\u65B0\u65F6\u95F4\u76F8\u5173\u5B57\u6BB5\u3002",delete:"\u7981\u6B62\u5220\u9664\u3002"},columns:[pe("location","\u4E3B\u89D2\u5F53\u524D\u6240\u5728\u5730\u70B9","\u4E3B\u89D2\u5F53\u524D\u6240\u5728\u7684\u5177\u4F53\u573A\u666F\u540D\u79F0\u3002"),pe("current_time","\u5F53\u524D\u65F6\u95F4","\u6E38\u620F\u4E16\u754C\u7684\u5F53\u524D\u65F6\u95F4\uFF1B\u5982\u5267\u60C5\u6CA1\u6709\u660E\u786E\u65F6\u95F4\uFF0C\u53EF\u6839\u636E\u4E16\u754C\u89C2\u7ED9\u51FA\u5408\u7406\u65F6\u95F4\u3002"),pe("previous_scene_time","\u4E0A\u8F6E\u573A\u666F\u65F6\u95F4","\u4E0A\u4E00\u8F6E\u4EA4\u4E92\u7ED3\u675F\u65F6\u7684\u65F6\u95F4\u3002"),pe("elapsed_time","\u7ECF\u8FC7\u7684\u65F6\u95F4","\u6839\u636E\u5F53\u524D\u4E0E\u4E0A\u8F6E\u65F6\u95F4\u8BA1\u7B97\u51FA\u7684\u6587\u672C\u63CF\u8FF0\u3002")]}),yn({id:"default_protagonist_profile",name:"\u4E3B\u89D2\u4FE1\u606F",note:"\u8BB0\u5F55\u4E3B\u89D2\u7684\u6838\u5FC3\u8EAB\u4EFD\u4FE1\u606F\u3002\u6B64\u8868\u901A\u5E38\u6709\u4E14\u4EC5\u6709\u4E00\u884C\u3002",aiInstructions:{init:"\u521D\u59CB\u5316\u65F6\u63D2\u5165\u4E3B\u89D2\u7684\u552F\u4E00\u6761\u76EE\u3002",create:"\u7981\u6B62\u65B0\u589E\u591A\u540D\u4E3B\u89D2\uFF1B\u9664\u975E\u8868\u4E3A\u7A7A\u4E14\u9700\u8981\u521D\u59CB\u5316\u3002",update:"\u5F53\u4E3B\u89D2\u8EAB\u4EFD\u3001\u5916\u8C8C\u3001\u7ECF\u5386\u6216\u6027\u683C\u6709\u660E\u786E\u53D8\u5316\u65F6\u66F4\u65B0\u3002",delete:"\u7981\u6B62\u5220\u9664\u3002"},columns:[pe("name","\u4EBA\u7269\u540D\u79F0","\u4E3B\u89D2\u7684\u540D\u5B57\u3002"),pe("gender_age","\u6027\u522B/\u5E74\u9F84","\u4E3B\u89D2\u7684\u6027\u522B\u4E0E\u5E74\u9F84\u3002"),pe("appearance","\u5916\u8C8C\u7279\u5F81","\u5BF9\u4E3B\u89D2\u5916\u8C8C\u7684\u5BA2\u89C2\u6587\u5B57\u63CF\u5199\u3002"),pe("identity","\u804C\u4E1A/\u8EAB\u4EFD","\u4E3B\u89D2\u5728\u793E\u4F1A\u6216\u5267\u60C5\u4E2D\u7684\u4E3B\u8981\u8EAB\u4EFD\u3002"),pe("history","\u8FC7\u5F80\u7ECF\u5386","\u4E3B\u89D2\u80CC\u666F\u6545\u4E8B\u4E0E\u5173\u952E\u7ECF\u5386\uFF0C\u968F\u5267\u60C5\u589E\u91CF\u66F4\u65B0\u3002"),pe("personality","\u6027\u683C\u7279\u70B9","\u5BF9\u4E3B\u89D2\u6838\u5FC3\u6027\u683C\u7684\u6982\u62EC\u3002")]}),yn({id:"default_important_characters",name:"\u91CD\u8981\u89D2\u8272\u8868",note:"\u8BB0\u5F55\u5173\u952E NPC \u6216\u91CD\u8981\u89D2\u8272\u7684\u4FE1\u606F\u548C\u52A8\u6001\u72B6\u6001\u3002",aiInstructions:{init:"\u521D\u59CB\u5316\u65F6\u4E3A\u5F53\u524D\u5728\u573A\u7684\u91CD\u8981\u4EBA\u7269\u5206\u522B\u63D2\u5165\u6761\u76EE\u3002",create:"\u5267\u60C5\u4E2D\u6709\u672A\u8BB0\u5F55\u7684\u91CD\u8981\u4EBA\u7269\u767B\u573A\u65F6\u65B0\u589E\u3002",update:"\u5DF2\u6709\u89D2\u8272\u7684\u72B6\u6001\u3001\u5173\u7CFB\u3001\u60F3\u6CD5\u3001\u7ECF\u5386\u6216\u6301\u6709\u7269\u53D8\u5316\u65F6\u66F4\u65B0\u3002",delete:'\u901A\u5E38\u7981\u6B62\u5220\u9664\uFF1B\u89D2\u8272\u79BB\u573A\u65F6\u4F18\u5148\u66F4\u65B0"\u662F\u5426\u79BB\u573A"\u3002'},columns:[pe("name","\u59D3\u540D","\u89D2\u8272\u59D3\u540D\u3002"),pe("gender_age","\u6027\u522B/\u5E74\u9F84","\u89D2\u8272\u7684\u6027\u522B\u4E0E\u5E74\u9F84\u3002"),pe("summary","\u4E00\u53E5\u8BDD\u4ECB\u7ECD","\u7528\u7B80\u77ED\u6587\u5B57\u6982\u62EC\u89D2\u8272\u8EAB\u4EFD\u80CC\u666F\u3002"),pe("appearance","\u5916\u8C8C\u7279\u5F81","\u5BF9\u89D2\u8272\u5916\u8C8C\u548C\u5F53\u524D\u8863\u7740\u7684\u5BA2\u89C2\u63CF\u5199\u3002"),pe("important_items","\u6301\u6709\u7684\u91CD\u8981\u7269\u54C1","\u89D2\u8272\u62E5\u6709\u7684\u5173\u952E\u7269\u54C1\uFF0C\u7528\u5206\u53F7\u5206\u9694\u3002"),pe("offstage","\u662F\u5426\u79BB\u573A",'\u5224\u65AD\u8BE5\u89D2\u8272\u5F53\u524D\u662F\u5426\u5DF2\u7ECF\u79BB\u573A\uFF0C\u586B\u5199"\u662F"\u6216"\u5426"\u3002',"boolean"),pe("history","\u8FC7\u5F80\u7ECF\u5386","\u89D2\u8272\u80CC\u666F\u4E0E\u5173\u952E\u4E8B\u4EF6\uFF0C\u968F\u5267\u60C5\u589E\u91CF\u66F4\u65B0\u3002")]}),yn({id:"default_protagonist_skills",name:"\u4E3B\u89D2\u6280\u80FD\u8868",note:"\u8BB0\u5F55\u4E3B\u89D2\u83B7\u5F97\u7684\u6280\u80FD\u3001\u80FD\u529B\u6216\u9636\u6BB5\u6027\u6210\u957F\u3002",aiInstructions:{init:"\u521D\u59CB\u5316\u65F6\u6839\u636E\u8BBE\u5B9A\u6DFB\u52A0\u4E3B\u89D2\u7684\u521D\u59CB\u6280\u80FD\u3002",create:"\u4E3B\u89D2\u83B7\u5F97\u65B0\u6280\u80FD\u6216\u65B0\u80FD\u529B\u65F6\u65B0\u589E\u3002",update:"\u5DF2\u6709\u6280\u80FD\u5347\u7EA7\u3001\u964D\u7EA7\u6216\u6548\u679C\u53D8\u5316\u65F6\u66F4\u65B0\u3002",delete:"\u6280\u80FD\u88AB\u5267\u60C5\u5265\u593A\u3001\u66FF\u6362\u6216\u5931\u6548\u65F6\u5220\u9664\u3002"},columns:[pe("skill_name","\u6280\u80FD\u540D\u79F0","\u6280\u80FD\u6216\u80FD\u529B\u540D\u79F0\u3002"),pe("skill_type","\u6280\u80FD\u7C7B\u578B","\u6280\u80FD\u7C7B\u522B\uFF0C\u4F8B\u5982\u4E3B\u52A8\u3001\u88AB\u52A8\u3001\u5929\u8D4B\u7B49\u3002"),pe("level","\u7B49\u7EA7/\u9636\u6BB5","\u6280\u80FD\u5F53\u524D\u7B49\u7EA7\u3001\u719F\u7EC3\u5EA6\u6216\u9636\u6BB5\u3002"),pe("effect","\u6548\u679C\u63CF\u8FF0","\u6280\u80FD\u5728\u5F53\u524D\u9636\u6BB5\u4E0B\u7684\u5177\u4F53\u6548\u679C\u3002")]}),yn({id:"default_inventory",name:"\u80CC\u5305\u7269\u54C1\u8868",note:"\u8BB0\u5F55\u4E3B\u89D2\u62E5\u6709\u7684\u7269\u54C1\u3001\u88C5\u5907\u6216\u6D88\u8017\u54C1\u3002",aiInstructions:{init:"\u521D\u59CB\u5316\u65F6\u6839\u636E\u5267\u60C5\u4E0E\u8BBE\u5B9A\u6DFB\u52A0\u4E3B\u89D2\u7684\u521D\u59CB\u643A\u5E26\u7269\u54C1\u3002",create:"\u4E3B\u89D2\u83B7\u5F97\u80CC\u5305\u4E2D\u6CA1\u6709\u7684\u5168\u65B0\u7269\u54C1\u65F6\u65B0\u589E\u3002",update:"\u5DF2\u6709\u7269\u54C1\u6570\u91CF\u3001\u72B6\u6001\u6216\u63CF\u8FF0\u53D8\u5316\u65F6\u66F4\u65B0\u3002",delete:"\u7269\u54C1\u88AB\u5B8C\u5168\u6D88\u8017\u3001\u4E22\u5F03\u6216\u6467\u6BC1\u65F6\u5220\u9664\u3002"},columns:[pe("item_name","\u7269\u54C1\u540D\u79F0","\u7269\u54C1\u540D\u79F0\u3002"),pe("quantity","\u6570\u91CF","\u62E5\u6709\u6570\u91CF\u3002","number"),pe("description","\u63CF\u8FF0/\u6548\u679C","\u7269\u54C1\u529F\u80FD\u3001\u6548\u679C\u6216\u80CC\u666F\u63CF\u8FF0\u3002"),pe("category","\u7C7B\u522B","\u7269\u54C1\u7C7B\u522B\uFF0C\u4F8B\u5982\u6B66\u5668\u3001\u6D88\u8017\u54C1\u3001\u6742\u7269\u7B49\u3002")]}),yn({id:"default_quests_events",name:"\u4EFB\u52A1\u4E0E\u4E8B\u4EF6\u8868",note:"\u8BB0\u5F55\u5F53\u524D\u6B63\u5728\u8FDB\u884C\u6216\u9700\u8981\u6301\u7EED\u8FFD\u8E2A\u7684\u4EFB\u52A1\u4E0E\u4E8B\u4EF6\u3002",aiInstructions:{init:"\u521D\u59CB\u5316\u65F6\u6839\u636E\u5267\u60C5\u4E0E\u8BBE\u5B9A\u6DFB\u52A0\u4E3B\u8981\u4EFB\u52A1\u6216\u5173\u952E\u4E8B\u4EF6\u3002",create:"\u4E3B\u89D2\u63A5\u53D6\u3001\u89E6\u53D1\u6216\u53D1\u73B0\u65B0\u7684\u4EFB\u52A1\u4E0E\u4E8B\u4EF6\u65F6\u65B0\u589E\u3002",update:"\u4EFB\u52A1\u53D6\u5F97\u5173\u952E\u8FDB\u5C55\u3001\u76EE\u6807\u53D8\u5316\u6216\u65F6\u9650\u53D8\u5316\u65F6\u66F4\u65B0\u3002",delete:"\u4EFB\u52A1\u5B8C\u6210\u3001\u5931\u8D25\u3001\u8FC7\u671F\u6216\u4E0D\u518D\u9700\u8981\u8FFD\u8E2A\u65F6\u5220\u9664\u3002"},columns:[pe("quest_name","\u4EFB\u52A1\u540D\u79F0","\u4EFB\u52A1\u6216\u4E8B\u4EF6\u6807\u9898\u3002"),pe("quest_type","\u4EFB\u52A1\u7C7B\u578B","\u4E3B\u7EBF\u3001\u652F\u7EBF\u3001\u4E2A\u4EBA\u3001\u7A81\u53D1\u4E8B\u4EF6\u7B49\u3002"),pe("issuer","\u53D1\u5E03\u8005","\u53D1\u5E03\u4EFB\u52A1\u6216\u89E6\u53D1\u4E8B\u4EF6\u7684\u89D2\u8272\u3001\u5730\u70B9\u6216\u52BF\u529B\u3002"),pe("detail","\u8BE6\u7EC6\u63CF\u8FF0","\u4EFB\u52A1\u76EE\u6807\u3001\u4E8B\u4EF6\u80CC\u666F\u548C\u8981\u6C42\u3002"),pe("progress","\u5F53\u524D\u8FDB\u5EA6","\u5BF9\u5B8C\u6210\u5EA6\u6216\u5F53\u524D\u9636\u6BB5\u7684\u7B80\u8981\u63CF\u8FF0\u3002"),pe("deadline","\u4EFB\u52A1\u65F6\u9650","\u5B8C\u6210\u4EFB\u52A1\u7684\u5269\u4F59\u65F6\u95F4\u6216\u622A\u6B62\u6761\u4EF6\u3002"),pe("reward","\u5956\u52B1","\u5B8C\u6210\u540E\u53EF\u80FD\u83B7\u5F97\u7684\u5956\u52B1\u3002"),pe("penalty","\u60E9\u7F5A","\u5931\u8D25\u6216\u9519\u8FC7\u540E\u7684\u540E\u679C\u3002")]}),yn({id:"default_memo_log",name:"\u7EAA\u8981\u8868",note:"\u8BB0\u5F55\u6BCF\u8F6E\u6216\u5173\u952E\u7247\u6BB5\u53D1\u751F\u7684\u4E8B\u4EF6\u7EAA\u8981\uFF0C\u7528\u4E8E\u540E\u7EED\u56DE\u987E\u3002",aiInstructions:{init:"\u6545\u4E8B\u521D\u59CB\u5316\u65F6\u63D2\u5165\u4E00\u6761\u8BB0\u5F55\uFF0C\u7528\u4E8E\u8BB0\u5F55\u521D\u59CB\u5316\u5267\u60C5\u3002",create:"\u6BCF\u8F6E\u4EA4\u4E92\u7ED3\u675F\u540E\uFF0C\u82E5\u53D1\u751F\u4E86\u503C\u5F97\u8BB0\u5F55\u7684\u65B0\u4E8B\u4EF6\uFF0C\u5219\u63D2\u5165\u4E00\u6761\u65B0\u7EAA\u8981\u3002",update:"\u901A\u5E38\u7981\u6B62\u66F4\u65B0\u5386\u53F2\u7EAA\u8981\uFF1B\u53EA\u6709\u660E\u663E\u4E8B\u5B9E\u9519\u8BEF\u65F6\u624D\u4FEE\u6B63\u3002",delete:"\u7981\u6B62\u5220\u9664\u3002"},columns:[pe("time_span","\u65F6\u95F4\u8DE8\u5EA6","\u672C\u8F6E\u4E8B\u4EF6\u53D1\u751F\u7684\u65F6\u95F4\u8303\u56F4\u3002"),pe("location","\u5730\u70B9","\u672C\u8F6E\u4E8B\u4EF6\u53D1\u751F\u5730\u70B9\u3002"),pe("memo","\u7EAA\u8981","\u4EE5\u7B2C\u4E09\u65B9\u89C6\u89D2\u5BA2\u89C2\u8BB0\u5F55\u672C\u8F6E\u53D1\u751F\u7684\u4E8B\u5B9E\u3002"),pe("summary","\u6982\u89C8","\u4E00\u53E5\u8BDD\u6982\u62EC\u7EAA\u8981\u5185\u5BB9\u3002"),pe("index_code","\u7F16\u7801\u7D22\u5F15","\u7528\u4E8E\u540E\u7EED\u68C0\u7D22\u7684\u7B80\u77ED\u7F16\u7801\u3002")]}),yn({id:"default_options",name:"\u9009\u9879\u8868",note:"\u8BB0\u5F55\u6BCF\u8F6E\u4E3B\u89D2\u53EF\u4EE5\u91C7\u53D6\u7684\u884C\u52A8\u9009\u9879\u3002\u6B64\u8868\u901A\u5E38\u6709\u4E14\u4EC5\u6709\u4E00\u884C\u3002\u6240\u6709\u9009\u9879\u4F7F\u7528\u7B2C\u4E09\u4EBA\u79F0\uFF0C\u4E0D\u4EE3\u66FF\u4E3B\u89D2\u53D1\u8A00\uFF0C\u5E76\u7D27\u6263\u5F53\u524D\u5267\u60C5\u3002",aiInstructions:{init:"\u521D\u59CB\u5316\u65F6\u751F\u6210\u56DB\u4E2A\u521D\u59CB\u884C\u52A8\u9009\u9879\u3002",create:"\u901A\u5E38\u7981\u6B62\u65B0\u589E\uFF1B\u9664\u975E\u8868\u4E3A\u7A7A\u4E14\u9700\u8981\u521D\u59CB\u5316\u3002",update:"\u6BCF\u8F6E\u4EA4\u4E92\u540E\u6839\u636E\u5F53\u524D\u5267\u60C5\u751F\u6210\u65B0\u7684\u56DB\u4E2A\u9009\u9879\u5E76\u8986\u76D6\u539F\u6709\u5185\u5BB9\u3002",delete:"\u7981\u6B62\u5220\u9664\u3002"},columns:[pe("option_1","\u9009\u9879\u4E00","\u504F\u5411\u7B56\u7565\u3001\u63A8\u8FDB\u5267\u60C5\u6216\u89E3\u51B3\u5F53\u524D\u95EE\u9898\u7684\u884C\u52A8\u3002"),pe("option_2","\u9009\u9879\u4E8C","\u504F\u5411\u8C28\u614E\u89C2\u5BDF\u3001\u6536\u96C6\u4FE1\u606F\u6216\u4FDD\u6301\u4E2D\u7ACB\u7684\u884C\u52A8\u3002"),pe("option_3","\u9009\u9879\u4E09","\u504F\u5411\u5E2E\u52A9\u3001\u4FDD\u62A4\u3001\u6C9F\u901A\u6216\u5B89\u629A\u7684\u884C\u52A8\u3002"),pe("option_4","\u9009\u9879\u56DB","\u504F\u5411\u5192\u9669\u3001\u8BD5\u63A2\u3001\u6539\u53D8\u5C40\u52BF\u6216\u5173\u7CFB\u4E92\u52A8\u7684\u884C\u52A8\u3002")]})])});function TS(t,e=""){return t==null?e:String(t).trim()||e}function fn(t){if(t==null)return"";if(typeof t=="string")return t;try{return JSON.stringify(t,null,2)}catch{return String(t)}}function aa(t,e="col"){return TS(t,"").toLowerCase().replace(/[^a-z0-9]+/g,"_").replace(/^_+|_+$/g,"")||e}function mn(t,e=new Set){let r=aa(t,"col"),n=r,s=2;for(;e.has(n);)n=`${r}_${s}`,s+=1;return e.add(n),n}var gd=O(()=>{});function U(t,e=""){return t==null?e:String(t).trim()||e}function Fr(t,e=!1){return t==null?e:t===!0}function _S(t){if(!Array.isArray(t)||t.length!==1)return!1;let e=t[0]&&typeof t[0]=="object"?t[0]:null;if(!e)return!1;let r=U(e.name||e.title,""),n=U(e.note||e.description,""),s=Array.isArray(e.columns)?e.columns:[],o=Array.isArray(e.rows)?e.rows:[];if(r&&!["\u88681","\u8868\u683C 1","\u8868\u683C1"].includes(r)||n||s.length!==1||o.length>1)return!1;let a=s[0]&&typeof s[0]=="object"?s[0]:{},i=U(a.key||a.id,""),l=U(a.title||a.name||a.label,"");if(U(a.description||a.note,"")||i&&i!=="col_1"||l&&!["\u52171","col_1"].includes(l))return!1;if(o.length===0)return!0;let c=o[0]&&typeof o[0]=="object"?o[0]:{},u=U(c.name||c.title||c.label,""),y=c.cells&&typeof c.cells=="object"&&!Array.isArray(c.cells)?c.cells:{},p=Array.isArray(c.values)?c.values:[],m=Object.values(y).some(g=>U(g,""))||p.some(g=>U(g,""));return(!u||u==="\u884C1")&&!m}function ES(t,{seedDefaultWhenMissing:e=!1}={}){return _S(t)?fe(Hs):Array.isArray(t)?fe(t):t&&typeof t=="object"?AS(t):e?fe(Hs):[]}function xd(t=""){let e=[],r=U(t,""),n=/-\s*列\d+\s*[:：]\s*([^\n\-–—]+?)\s*[-–—]\s*([^\n]+)/g,s;for(;s=n.exec(r);)e.push({title:U(s[1],""),description:U(s[2],"")});return e}function AS(t={}){let e=t&&typeof t=="object"?t:{};return Object.keys(e).filter(n=>n.startsWith("sheet_")&&e[n]&&typeof e[n]=="object").map((n,s)=>({key:n,table:e[n],fallbackOrder:s})).sort((n,s)=>{let o=Number.isFinite(n.table.orderNo)?n.table.orderNo:n.fallbackOrder,a=Number.isFinite(s.table.orderNo)?s.table.orderNo:s.fallbackOrder;return o-a}).map(({key:n,table:s},o)=>{let a=s.sourceData&&typeof s.sourceData=="object"?s.sourceData:{},i=Array.isArray(s.content)?s.content:[],l=Array.isArray(i[0])?i[0]:[],d=xd(a.note),c=new Set,u=l.slice(1).map((p,m)=>{let g=d[m]||{},h=U(p||g.title,`\u5217${m+1}`);return{key:mn(h||`col_${m+1}`,c),title:h,description:U(g.description,""),type:Ni,required:!1}}),y=i.slice(1).map((p,m)=>{let g=Array.isArray(p)?p:[],h={};return u.forEach((b,v)=>{h[b.key]=fn(g[v+1])}),{name:U(g[0],`\u884C${m+1}`),cells:h}});return{id:U(s.uid||n,`sheet_${o+1}`),name:U(s.name,`\u8868${o+1}`),note:U(a.note,""),enabled:s.enabled!==!1,aiInstructions:{init:U(a.initNode,""),create:U(a.insertNode,""),update:U(a.updateNode,""),delete:U(a.deleteNode,"")},columns:u,rows:y}})}function CS(t=[]){let e=[],r=0;return t.forEach(n=>{let s=n&&typeof n=="object"?n:{},o=s.cells&&typeof s.cells=="object"&&!Array.isArray(s.cells)?s.cells:null,a=Array.isArray(s.cells)?s.cells:Array.isArray(s.values)?s.values:null;o&&Object.keys(o).forEach(i=>{e.includes(i)||e.push(i)}),a&&a.length>r&&(r=a.length)}),e.length>0?e.map(n=>({key:n,title:String(n)})):r>0?Array.from({length:r},(n,s)=>({key:`col_${s+1}`,title:`\u5217${s+1}`})):[]}function wd(t,e=Ni){let r=U(t,e);return gm.some(n=>n.value===r)?r:e}function kS(t={},e=0,r=new Set){let n=t&&typeof t=="object"?t:{},s=U(n.title||n.name||n.label,`\u5217${e+1}`),o=U(n.key||n.id,""),a=mn(o||s||`col_${e+1}`,r),i=[o,U(n.title,""),U(n.name,""),U(n.label,"")].filter(Boolean);return{key:a,title:s,description:U(n.description||n.note,""),type:wd(n.type),required:n.required===!0,sourceKeys:i}}function IS(t={},e={},r=0){let n=t.cells&&typeof t.cells=="object"&&!Array.isArray(t.cells)?t.cells:null,s=Array.isArray(t.cells)?t.cells:Array.isArray(t.values)?t.values:null;if(n){let o=[...Array.isArray(e.sourceKeys)?e.sourceKeys:[],e.key,e.title].filter(Boolean);for(let a of o)if(n[a]!==void 0)return fn(n[a])}return s&&s[r]!==void 0?fn(s[r]):""}function RS(t={},e=[],r=0){let n=t&&typeof t=="object"?t:{},s={};return e.forEach((o,a)=>{s[o.key]=IS(n,o,a)}),{id:ra(n.id||n.rowId,r),name:U(n.name||n.title||n.label,`\u884C${r+1}`),cells:s}}function MS(t={}){let e=t&&typeof t=="object"?t:{};return{init:U(e.init,""),create:U(e.create,""),update:U(e.update,""),delete:U(e.delete,"")}}function PS(t={},e=""){let r=t&&typeof t=="object"?t:{},n=U(r.presetId,U(e,""));return{enabled:r.enabled===!0,presetId:n}}function NS(t={},e=""){let r=t&&typeof t=="object"?t:{};return{enabled:Fr(r.enabled,!1),entryName:U(r.entryName,e),entryType:r.entryType==="keyword"?"keyword":"constant",splitByRow:Fr(r.splitByRow,!1),keywords:U(r.keywords,""),injectionTemplate:U(r.injectionTemplate,""),preventRecursion:Fr(r.preventRecursion,!0),entryPlacement:{position:U(r.entryPlacement?.position||r.placement?.position,"before_character_definition"),depth:Number.isFinite(Number(r.entryPlacement?.depth??r.placement?.depth))?Math.floor(Number(r.entryPlacement?.depth??r.placement?.depth)):2,order:Number.isFinite(Number(r.entryPlacement?.order??r.placement?.order))?Math.floor(Number(r.entryPlacement?.order??r.placement?.order)):0},extraIndexPlacement:{position:U(r.extraIndexPlacement?.position,"before_character_definition"),depth:Number.isFinite(Number(r.extraIndexPlacement?.depth))?Math.floor(Number(r.extraIndexPlacement?.depth)):2,order:Number.isFinite(Number(r.extraIndexPlacement?.order))?Math.floor(Number(r.extraIndexPlacement?.order)):0}}}function $S(t={},e=0){let r=t&&typeof t=="object"?t:{},n=new Set,o=(Array.isArray(r.columns)&&r.columns.length>0?r.columns:CS(Array.isArray(r.rows)?r.rows:[])).map((l,d)=>kS(l,d,n)),a=Array.isArray(r.rows)?r.rows.map((l,d)=>RS(l,o,d)):[],i=U(r.name||r.title,`\u8868${e+1}`);return{id:pr(r.id||r.key,e),name:i,note:U(r.note||r.description,""),enabled:r.enabled!==!1,aiInstructions:MS(r.aiInstructions),exportConfig:NS(r.exportConfig,i),columns:o.map(l=>({key:l.key,title:l.title,description:U(l.description,""),type:wd(l.type),required:l.required===!0})),rows:a}}function bm(t={}){let e=t&&typeof t=="object"?t:{},r=Array.isArray(e.lastErrorDetails)?e.lastErrorDetails.map(s=>U(s,"")).filter(Boolean):[],n=e.lastValidationSummary&&typeof e.lastValidationSummary=="object"?{errorCount:Number.isFinite(e.lastValidationSummary.errorCount)?e.lastValidationSummary.errorCount:0,warningCount:Number.isFinite(e.lastValidationSummary.warningCount)?e.lastValidationSummary.warningCount:0}:{errorCount:0,warningCount:0};return{lastStatus:U(e.lastStatus,Be.IDLE),lastRunAt:Number.isFinite(e.lastRunAt)?e.lastRunAt:0,lastDurationMs:Number.isFinite(e.lastDurationMs)?e.lastDurationMs:0,lastError:U(e.lastError,""),lastErrorDetails:r,lastValidationSummary:n,successCount:Number.isFinite(e.successCount)?e.successCount:0,errorCount:Number.isFinite(e.errorCount)?e.errorCount:0,lastSourceMessageId:U(e.lastSourceMessageId,""),lastSlotRevisionKey:U(e.lastSlotRevisionKey,""),lastLoadMode:U(e.lastLoadMode,""),lastFillMode:U(e.lastFillMode,""),lastMirrorApplied:e.lastMirrorApplied===!0,lastResolvedFromMessageId:U(e.lastResolvedFromMessageId,""),lastResolvedFromRevisionKey:U(e.lastResolvedFromRevisionKey,""),lastSourceKind:U(e.lastSourceKind,""),lastScopeMode:U(e.lastScopeMode,""),lastAutoRunAt:Number.isFinite(e.lastAutoRunAt)?e.lastAutoRunAt:0,lastAutoStatus:U(e.lastAutoStatus,Be.IDLE),lastAutoMessageId:U(e.lastAutoMessageId,""),lastAutoRevisionKey:U(e.lastAutoRevisionKey,""),lastAutoSkipReason:U(e.lastAutoSkipReason,"")}}function LS(t={}){let e=t&&typeof t=="object"?t:{};return(Array.isArray(e.tables)?e.tables:[]).map((n,s)=>$S(n,s))}function xm(t="",e={},r={}){let n=wd(e?.type),s=String(t??"").trim(),o=U(r?.label,`${U(r?.tableName,"\u8868\u683C")} / ${U(r?.rowName,"\u884C")} / ${U(e?.title||e?.key,"\u5355\u5143\u683C")}`),a=[],i=[];if(e?.required===!0&&!s&&a.push(`${o} \u4E3A\u5FC5\u586B\uFF0C\u5F53\u524D\u4E3A\u7A7A\u3002`),!s)return{valid:a.length===0,errors:a,warnings:i};if(n==="number"&&!Number.isFinite(Number(s))&&a.push(`${o} \u9700\u8981\u586B\u5199\u6570\u5B57\u3002`),n==="boolean"&&!["true","false","1","0","yes","no"].includes(s.toLowerCase())&&a.push(`${o} \u9700\u8981\u586B\u5199\u5E03\u5C14\u503C\uFF08true / false\uFF09\u3002`),n==="date"&&Number.isNaN(Date.parse(s))&&a.push(`${o} \u9700\u8981\u586B\u5199\u53EF\u89E3\u6790\u7684\u65E5\u671F\u3002`),n==="json")try{JSON.parse(s)}catch(l){a.push(`${o} \u9700\u8981\u586B\u5199\u5408\u6CD5 JSON\uFF1A${l?.message||"\u89E3\u6790\u5931\u8D25"}`)}return{valid:a.length===0,errors:a,warnings:i}}function OS(t={}){let r=LS(t&&typeof t=="object"?t:{}),n=[];return r.forEach((s,o)=>{let a=U(s?.name,`\u8868${o+1}`),i=Array.isArray(s?.columns)?s.columns:[],l=Array.isArray(s?.rows)?s.rows:[];a||n.push(`\u8868 ${o+1} \u7F3A\u5C11\u540D\u79F0\u3002`),i.length===0&&n.push(`${a} \u81F3\u5C11\u9700\u8981\u4E00\u5217\u3002`);let d=new Set;i.forEach((c,u)=>{let y=U(c?.key,""),p=U(c?.title,`\u5217${u+1}`);if(!y){n.push(`${a} / ${p} \u7F3A\u5C11\u5185\u90E8\u540D\u3002`);return}if(d.has(y)){n.push(`${a} \u4E2D\u5B58\u5728\u91CD\u590D\u5217\u5185\u90E8\u540D\uFF1A${y}`);return}d.add(y)}),l.forEach((c,u)=>{let y=U(c?.name,`\u884C${u+1}`),p=c?.cells&&typeof c.cells=="object"&&!Array.isArray(c.cells)?c.cells:{};i.forEach((m,g)=>{let h=U(m?.key,""),b=U(m?.title||h,`\u5217${g+1}`),v=h?fn(p[h]):"",x=xm(v,m,{label:`${a} / ${y} / ${b}`,tableName:a,rowName:y});n.push(...x.errors)})})}),{valid:n.length===0,errors:n,tables:r}}function qs({severity:t="error",message:e="",tableIndex:r=-1,tableName:n="",columnIndex:s=-1,columnKey:o="",rowIndex:a=-1,rowName:i="",cellKey:l=""}={}){return{severity:t,message:U(e,t==="warning"?"\u5B58\u5728\u8B66\u544A\u3002":"\u5B58\u5728\u9519\u8BEF\u3002"),tableIndex:r,tableName:U(n,""),columnIndex:s,columnKey:U(o,""),rowIndex:a,rowName:U(i,""),cellKey:U(l,"")}}function $i(t={}){let e=OS(t),r=[];if(!e.valid)return{...e,warnings:[],issues:r,summary:{errorCount:e.errors.length,warningCount:0}};let n=Array.isArray(e.tables)?e.tables:[];n.forEach((a,i)=>{let l=U(a?.name,`\u8868${i+1}`),d=Array.isArray(a?.columns)?a.columns:[],c=Array.isArray(a?.rows)?a.rows:[],u=new Set;l||r.push(qs({severity:"error",message:`\u8868 ${i+1} \u7F3A\u5C11\u540D\u79F0\u3002`,tableIndex:i,tableName:l})),d.forEach((y,p)=>{let m=U(y?.key,""),g=U(y?.title,`\u5217${p+1}`);m||r.push(qs({severity:"error",message:`${l} / ${g} \u7F3A\u5C11\u5185\u90E8\u540D\u3002`,tableIndex:i,tableName:l,columnIndex:p,columnKey:m,cellKey:m})),m&&(u.has(m)&&r.push(qs({severity:"error",message:`${l} \u4E2D\u5B58\u5728\u91CD\u590D\u5217\u5185\u90E8\u540D\uFF1A${m}`,tableIndex:i,tableName:l,columnIndex:p,columnKey:m,cellKey:m})),u.add(m))}),c.forEach((y,p)=>{let m=U(y?.name,`\u884C${p+1}`),g=y?.cells&&typeof y.cells=="object"&&!Array.isArray(y.cells)?y.cells:{};Object.keys(g).forEach(b=>{d.some(v=>U(v?.key,"")===b)||r.push(qs({severity:"warning",message:`${l} / ${m} \u5305\u542B\u672A\u5B9A\u4E49\u5217 ${b}\uFF0C\u4FDD\u5B58\u540E\u4F1A\u88AB\u5FFD\u7565\u3002`,tableIndex:i,tableName:l,rowIndex:p,rowName:m,cellKey:b}))}),d.forEach((b,v)=>{let x=U(b?.key,""),T=U(b?.title||x,`\u5217${v+1}`),E=x?fn(g[x]):"",w=xm(E,b,{label:`${l} / ${m} / ${T}`,tableName:l,rowName:m});w.errors.forEach(_=>{r.push(qs({severity:"error",message:_,tableIndex:i,tableName:l,columnIndex:v,columnKey:x,rowIndex:p,rowName:m,cellKey:x}))}),w.warnings.forEach(_=>{r.push(qs({severity:"warning",message:_,tableIndex:i,tableName:l,columnIndex:v,columnKey:x,rowIndex:p,rowName:m,cellKey:x}))})})})});let s=r.filter(a=>a.severity!=="warning").map(a=>a.message),o=r.filter(a=>a.severity==="warning").map(a=>a.message);return{valid:s.length===0,errors:s,warnings:o,issues:r,tables:n,summary:{errorCount:s.length,warningCount:o.length}}}function wm(){return{tables:fe(Hs),promptTemplate:fd,apiPreset:"",promptPreset:"",bypass:{enabled:!1,presetId:""},activeTemplate:Mt,autoUpdateEnabled:!1,autoUpdateTrigger:"assistantMessage",runScope:Rt.ENABLED,scope:{mode:Rt.ENABLED,selectedTableIds:[],activeTableId:""},fillMode:Pi.INCREMENTAL,contextDepth:8,contextRoles:"all",contextExtractTags:[],contextUseGlobalRules:!1,worldbooks:{enabled:!1,selected:[]},sendLatestRows:-1,mirrorToMessage:!1,mirrorTag:"yyt-table-workbench",worldbookSync:{enabled:!1,injectionMode:"character_card",targetBook:"",entryComment:"YYT-\u586B\u8868\u6570\u636E"},wrapperConfig:{enabled:!0,wrapperTag:"\u6700\u65B0\u6570\u636E\u4E0E\u8BB0\u5F55",wrapperHint:"\u4EE5\u4E0B\u662F\u5728\u8FD9\u4E2A\u65F6\u95F4\u70B9\uFF0C\u5F53\u524D\u573A\u666F\u4E0B\u5267\u60C5\u76F8\u5173\u7684\u6700\u65B0\u6570\u636E\u4E0E\u8BB0\u5F55\uFF0C\u4F60\u5728\u8FDB\u884C\u5267\u60C5\u5206\u6790\u65F6\u5FC5\u987B\u4EE5\u6B64\u6700\u65B0\u7684\u6570\u636E\u4E3A\u51C6\uFF0C\u4EE5\u4E0B\u6570\u636E\u4E0E\u8BB0\u5F55\u7684\u4F18\u5148\u7EA7\u9AD8\u4E8E\u5176\u4ED6\u4EFB\u4F55\u80CC\u666F\u8BBE\u5B9A\uFF1A",wrapperPlacement:{position:"before_character_definition",depth:2,order:0}},tableEnabledOverrides:{},runtime:bm()}}function or(t={}){let e=wm(),r=t&&typeof t=="object"?t:{},n=r.bypass?r.bypass:r.bypassPresetId?{presetId:r.bypassPresetId,enabled:!!r.bypassPresetId}:void 0,s=PS(n,r.promptPreset),o=ES(r.tables,{seedDefaultWhenMissing:!Object.prototype.hasOwnProperty.call(r,"tables")}),a=r.scope&&typeof r.scope=="object"?r.scope:{},i=typeof r.runScope=="string"&&r.runScope?{...a,mode:r.runScope}:a,l=oa(i,{mode:r.runScope,selectedTableIds:r.selectedTableIds,activeTableId:r.activeTableId}),d=Fr(r.autoUpdateEnabled!==void 0?r.autoUpdateEnabled:r.automation?.enabled,e.autoUpdateEnabled);return{tables:o,promptTemplate:U(r.promptTemplate,e.promptTemplate),apiPreset:U(r.apiPreset,""),promptPreset:s.presetId,bypass:s,activeTemplate:U(r.activeTemplate,e.activeTemplate),autoUpdateEnabled:d,autoUpdateTrigger:U(r.autoUpdateTrigger,e.autoUpdateTrigger),runScope:l.mode,scope:l,fillMode:r.fillMode===Pi.FULL?Pi.FULL:e.fillMode,contextDepth:Number.isFinite(Number(r.contextDepth))&&Number(r.contextDepth)>0?Math.floor(Number(r.contextDepth)):e.contextDepth,contextRoles:r.contextRoles==="assistant_only"?"assistant_only":"all",contextExtractTags:Array.isArray(r.contextExtractTags)?r.contextExtractTags.filter(c=>typeof c=="string"&&c.trim()):typeof r.contextExtractTags=="string"&&r.contextExtractTags.trim()?r.contextExtractTags.split(`
`).map(c=>c.trim()).filter(Boolean):[],contextUseGlobalRules:Fr(r.contextUseGlobalRules??r.contextUseExtractRules??r.contextUseExcludeRules,!1),extraction:{regexPresetId:U(r.extraction?.regexPresetId,"")},worldbooks:{enabled:Fr(r.worldbooks?.enabled,!1),selected:Array.isArray(r.worldbooks?.selected)?r.worldbooks.selected.filter(c=>typeof c=="string"&&c.trim()):[],presetId:U(r.worldbooks?.presetId,"")},sendLatestRows:Number.isFinite(Number(r.sendLatestRows))?Math.floor(Number(r.sendLatestRows)):-1,mirrorToMessage:Fr(r.mirrorToMessage,e.mirrorToMessage),mirrorTag:U(r.mirrorTag,e.mirrorTag),worldbookSync:{enabled:Fr(r.worldbookSync?.enabled,!1),injectionMode:["character_card","auto_create","target_book"].includes(r.worldbookSync?.injectionMode)?r.worldbookSync.injectionMode:"character_card",targetBook:U(r.worldbookSync?.targetBook,""),entryComment:U(r.worldbookSync?.entryComment,e.worldbookSync.entryComment)},wrapperConfig:(()=>{let c=r.worldbookSync?.wrapperConfig,u=r.wrapperConfig,y=c&&!u?c:u||{};return{enabled:Fr(y.enabled,e.wrapperConfig.enabled),wrapperTag:U(y.wrapperTag,e.wrapperConfig.wrapperTag),wrapperHint:U(y.wrapperHint,e.wrapperConfig.wrapperHint),wrapperPlacement:{position:U(y.wrapperPlacement?.position,e.wrapperConfig.wrapperPlacement.position),depth:Number.isFinite(Number(y.wrapperPlacement?.depth))?Math.floor(Number(y.wrapperPlacement?.depth)):e.wrapperConfig.wrapperPlacement.depth,order:Number.isFinite(Number(y.wrapperPlacement?.order))?Math.floor(Number(y.wrapperPlacement?.order)):e.wrapperConfig.wrapperPlacement.order}}})(),tableEnabledOverrides:r.tableEnabledOverrides&&typeof r.tableEnabledOverrides=="object"&&!Array.isArray(r.tableEnabledOverrides)?Object.fromEntries(Object.entries(r.tableEnabledOverrides).filter(([c,u])=>typeof c=="string"&&c&&typeof u=="boolean")):{},runtime:bm({...e.runtime,...r.runtime||{}})}}function vd(t={}){let e=or(t),r=[];return Array.isArray(e.tables)||r.push("\u8868\u5B9A\u4E49\u5FC5\u987B\u662F JSON \u6570\u7EC4\u3002"),e.promptTemplate||r.push("\u586B\u8868 Prompt \u4E0D\u80FD\u4E3A\u7A7A\u3002"),e.mirrorTag||r.push("\u6B63\u6587\u955C\u50CF\u6807\u7B7E\u4E0D\u80FD\u4E3A\u7A7A\u3002"),{valid:r.length===0,errors:r,config:e}}function Ee(){let t=hd.get(bd,wm()),e=or(t),r=yd();return{...ym(e,r),guide:r}}function DS(t){let r=(Array.isArray(t?.tables)?t.tables:[]).map(n=>({...n,rows:[]}));return{...t,tables:r}}function ot(t={}){let e=Ee(),r=or({...e,...t||{},runtime:t?.runtime===void 0?e.runtime:t.runtime}),n=vd(r);if(!n.valid)return{success:!1,error:n.errors.join(`
`),errors:n.errors,config:n.config};let s=DS(n.config);return hd.set(bd,s),pm({templateId:n.config.activeTemplate,scope:n.config.scope,worldbookSync:n.config.worldbookSync}),{success:!0,config:n.config}}function vm(t={}){let e=Ee(),r=or({...e,runtime:{...e.runtime,...t||{}}});return hd.set(bd,r),r.runtime}function BS(t={},e={}){let r=or(t),n=U(r.promptTemplate,fd);return e.skipResponseContract?n.trim():`${n}

${mm}`.trim()}function Sm(t={},e={}){let r=or(t);return{id:"tableWorkbench",name:"\u586B\u8868\u5DE5\u4F5C\u53F0",promptTemplate:BS(r,e),bypass:{enabled:r.bypass?.enabled===!0,presetId:r.bypass?.presetId||r.promptPreset||""}}}var hd,bd,sr=O(()=>{Je();We();Gs();Mi();fm();hm();gd();hd=j.namespace("tableWorkbench"),bd="config"});function Td(){return Sd||(Sd=$.createScope("TableIsolation")),Sd}var Tm,_m,Sd,_d,ye,Ur=O(()=>{Je();Z();We();Tm="tableEngine.isolation",_m=Object.freeze({enabled:!1,key:Ot});_d=class{constructor(){this._cache=null,this._subscribers=new Set}getState(){if(this._cache)return this._cache;let e=j.get(Tm,null);return this._cache=this._normalize(e),this._cache}isEnabled(){return this.getState().enabled===!0}getKey(){let e=this.getState();return e.enabled?e.key||Ot:Ot}getConfiguredKey(){return this.getState().key}setEnabled(e){let r=this._normalize({...this.getState(),enabled:!!e});this._commit(r,{reason:"enabled"})}setKey(e){let r=this._normalize({...this.getState(),key:e});this._commit(r,{reason:"key"})}updateState(e={}){let r=this.getState(),n=this._normalize({enabled:e.enabled!==void 0?!!e.enabled:r.enabled,key:e.key!==void 0?e.key:r.key});this._commit(n,{reason:"patch"})}reset(){this._commit({..._m},{reason:"reset"})}getScopeKey(e){return sa(e,this.getKey())}subscribe(e){return typeof e!="function"?()=>{}:(this._subscribers.add(e),()=>this._subscribers.delete(e))}_normalize(e){return!e||typeof e!="object"?{..._m}:{enabled:e.enabled===!0,key:De(e.key)}}_commit(e,r={}){let n=this.getState();if(n.enabled===e.enabled&&n.key===e.key)return;this._cache=e;try{j.set(Tm,e)}catch(o){Td().error("isolation \u72B6\u6001\u843D\u76D8\u5931\u8D25",o)}Td().info("isolation \u72B6\u6001\u53D8\u5316",{prev:n,next:e,reason:r.reason||""});let s={...e,prev:n,reason:r.reason||""};for(let o of this._subscribers)try{o(s)}catch(a){Td().error("isolation \u8BA2\u9605\u8005\u56DE\u8C03\u5F02\u5E38",a)}}},ye=new _d});var Em={};he(Em,{AuthorityProvider:()=>Li,default:()=>KS});var Ys,Ed,zS,hn,Li,KS,Am=O(()=>{Z();Js();Ys=$.createScope("AuthorityProvider"),Ed="third-party/youyou-toolkit",zS="YouYou Toolkit",hn="main",Li=class{constructor({extensionVersion:e="1.0.149"}={}){this.kind=Vs.AUTHORITY,this._client=null,this._extensionVersion=e,this._initialized=!1}async init(){let e=Oi();if(!e)return Ys.error("\u672A\u68C0\u6D4B\u5230 window.STAuthority.AuthoritySDK"),!1;try{return this._client=await e.init({extensionId:Ed,displayName:zS,version:this._extensionVersion,installType:"local",declaredPermissions:{sql:{private:!0}}}),this._initialized=!0,Ys.info("AuthorityProvider \u521D\u59CB\u5316\u6210\u529F",{extensionId:Ed}),!0}catch(r){return Ys.error("AuthorityProvider \u521D\u59CB\u5316\u5931\u8D25",{error:r?.message||r}),this._initialized=!1,!1}}async dispose(){this._client=null,this._initialized=!1}async migrate({migrations:e,database:r=hn,tableName:n}={}){this._ensureReady();let s={database:r,migrations:e};n&&(s.tableName=n);let o=await this._client.sql.migrate(s);return{applied:o?.applied||[],skipped:o?.skipped||[],tableName:o?.tableName,latestId:o?.latestId}}async query({statement:e,params:r=[],database:n=hn,page:s=void 0}={}){this._ensureReady();let o={database:n,statement:e,params:r};s&&(o.page=s);let a=await this._client.sql.query(o);return{columns:a.columns||[],rows:a.rows||[],rowCount:a.rowCount??(a.rows?.length||0),page:a.page}}async execute({statement:e,params:r=[],database:n=hn}={}){this._ensureReady();let s=await this._client.sql.exec({database:n,statement:e,params:r});return{rowsAffected:s.rowsAffected??0,lastInsertRowid:s.lastInsertRowid??null}}async batch({statements:e,database:r=hn}={}){this._ensureReady();let n=(e||[]).map(o=>({mode:o.mode||(/^\s*SELECT/i.test(o.statement)?"query":"exec"),statement:o.statement,params:o.params||[]}));return{results:(await this._client.sql.batch({database:r,statements:n}))?.results||[]}}async transaction({statements:e,database:r=hn}={}){this._ensureReady();let n=(e||[]).map(o=>({mode:o.mode||(/^\s*SELECT/i.test(o.statement)?"query":"exec"),statement:o.statement,params:o.params||[]})),s=await this._client.sql.transaction({database:r,statements:n});return{committed:!!s?.committed,results:s?.results||[]}}async paginate({statement:e,params:r=[],database:n=hn,page:s={}}={}){return this._ensureReady(),this.query({statement:e,params:r,database:n,page:s})}async pageAll({statement:e,params:r=[],database:n=hn,pageSize:s=200,maxPages:o}={}){this._ensureReady();let a=await this._client.sql.pageAll({database:n,statement:e,params:r},{pageSize:s,maxPages:o});return{columns:a.columns||[],rows:a.rows||[],rowCount:a.rowCount??(a.rows?.length||0)}}async backup(){return Ys.warn("backup() \u6682\u672A\u5B9E\u73B0\uFF0CAuthorityProvider \u8D70 Authority \u5185\u7F6E\u5907\u4EFD"),{kind:"authority",timestamp:Date.now()}}async export(){return Ys.warn("export() \u6682\u672A\u5B9E\u73B0\uFF0CAuthorityProvider \u8D70 Authority \u5185\u7F6E\u5BFC\u51FA"),{kind:"authority",timestamp:Date.now()}}async import(){Ys.warn("import() \u6682\u672A\u5B9E\u73B0\uFF0CAuthorityProvider \u8D70 Authority \u5185\u7F6E\u5BFC\u5165")}describe(){return{kind:this.kind,initialized:this._initialized,extensionId:Ed,database:hn,hasClient:!!this._client}}_ensureReady(){if(!this._initialized||!this._client)throw new Error("AuthorityProvider \u5C1A\u672A\u521D\u59CB\u5316")}},KS=Li});var km={};he(km,{FallbackProvider:()=>Di,default:()=>YS});function FS(t){let e=[],r=0,n="";for(let s of t)s==="("?r+=1:s===")"&&(r-=1),s===","&&r===0?(n.trim()&&e.push(n),n=""):n+=s;return n.trim()&&e.push(n),e}function US(t){let e=t.match(/^\s*CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?(\w+)\s*\(([\s\S]+)\)\s*$/i);if(!e)return null;let r=e[1],n=e[2],s=FS(n),o=[],a=[];for(let i of s){let l=i.trim(),d=l.match(/^PRIMARY\s+KEY\s*\(([^)]+)\)$/i);if(d){a=d[1].split(",").map(u=>u.trim());continue}let c=l.match(/^(\w+)\s+(\w+)/);c&&(o.push({name:c[1],type:c[2].toUpperCase(),raw:l}),/PRIMARY\s+KEY/i.test(l)&&!a.length&&(a=[c[1]]))}return{name:r,columns:o,pkCols:a}}function jS(t){let e=t.match(/^\s*INSERT\s+(?:OR\s+REPLACE\s+)?INTO\s+(\w+)(?:\s*\(([^)]+)\))?\s+VALUES\s*\(([^)]+)\)\s*$/i);if(!e)return null;let r=e[1],n=e[2]?e[2].split(",").map(o=>o.trim()):null,s=(e[3].match(/\?/g)||[]).length;return{name:r,cols:n,paramCount:s}}function kd(t){let e=t.split(/\s+AND\s+/i),r=[];for(let n of e){let s=n.match(/^\s*(\w+)\s*(=|!=|<>|>=|<=|>|<)\s*\?\s*$/);if(s){let a=s[2]==="<>"?"!=":s[2];r.push({col:s[1],op:a,placeholder:!0});continue}let o=n.match(/^\s*(\w+)\s+IS\s+(NOT\s+)?NULL\s*$/i);if(o){r.push({col:o[1],op:o[2]?"IS NOT NULL":"IS NULL",placeholder:!1});continue}throw new Error(`FallbackProvider \u4E0D\u652F\u6301\u7684 WHERE \u5B50\u53E5: "${n}"`)}return r}function WS(t){let e=t.match(/^\s*SELECT\s+([\s\S]+?)\s+FROM\s+(\w+)([\s\S]*)$/i);if(!e)return null;let r=e[1].trim(),n=e[2],s=e[3],o=s.match(/\bWHERE\s+([\s\S]+?)(?=\bORDER\s+BY\b|\bLIMIT\b|\bOFFSET\b|$)/i),a=s.match(/\bORDER\s+BY\s+(\w+)\s*(ASC|DESC)?/i),i=s.match(/\bLIMIT\s+(\d+)/i),l=s.match(/\bOFFSET\s+(\d+)/i);return{name:n,cols:r==="*"?null:r.split(",").map(d=>d.trim()),where:o?kd(o[1].trim()):null,orderBy:a?{col:a[1],dir:(a[2]||"ASC").toUpperCase()}:null,limit:i?parseInt(i[1],10):null,offset:l?parseInt(l[1],10):null}}function HS(t){let e=t.match(/^\s*UPDATE\s+(\w+)\s+SET\s+([\s\S]+?)(?:\s+WHERE\s+([\s\S]+))?\s*$/i);if(!e)return null;let r=e[1],n=e[2],s=e[3],o=n.split(",").map(a=>{let i=a.trim().match(/^(\w+)\s*=\s*\?$/);if(!i)throw new Error(`FallbackProvider \u4E0D\u652F\u6301\u7684 SET \u5B50\u53E5: "${a}"`);return i[1]});return{name:r,setCols:o,where:s?kd(s.trim()):null}}function qS(t){let e=t.match(/^\s*DELETE\s+FROM\s+(\w+)(?:\s+WHERE\s+([\s\S]+))?\s*$/i);return e?{name:e[1],where:e[2]?kd(e[2].trim()):null}:null}function Cd(t,e){return t===e?!0:t==null?e==null:e==null?!1:typeof t=="number"||typeof e=="number"?Number(t)===Number(e):String(t)===String(e)}function ia(t,e){return t===e?0:t==null?-1:e==null?1:typeof t=="number"&&typeof e=="number"?t-e:String(t)<String(e)?-1:1}function GS(t,e,r){let n=t[e.col];if(e.op==="IS NULL")return n==null;if(e.op==="IS NOT NULL")return n!=null;let s=r.shift();switch(e.op){case"=":return Cd(n,s);case"!=":return!Cd(n,s);case">":return ia(n,s)>0;case"<":return ia(n,s)<0;case">=":return ia(n,s)>=0;case"<=":return ia(n,s)<=0;default:return!1}}function Ad(t,e,r){if(!e||!e.length)return!0;let n=Array.isArray(r)?[...r]:[];for(let s of e)if(!GS(t,s,n))return!1;return!0}var Qs,Cm,Di,YS,Im=O(()=>{Z();Je();Js();Qs=$.createScope("FallbackProvider"),Cm="provider_fallback_v1";Di=class{constructor(){this.kind=Vs.FALLBACK,this._tables=new Map,this._migrations=new Set,this._initialized=!1,this._dirty=!1,this._saveTimer=null}async init(){try{let e=$e.get(Cm)||{};this._migrations=new Set(Array.isArray(e.migrations)?e.migrations:[]),this._tables=new Map;for(let[r,n]of Object.entries(e.tables||{}))this._tables.set(r,{schema:n.schema||{name:r,columns:[],pkCols:[]},rows:Array.isArray(n.rows)?n.rows:[]});return this._initialized=!0,Qs.info("FallbackProvider \u521D\u59CB\u5316\u5B8C\u6210",{tables:this._tables.size,migrations:this._migrations.size}),!0}catch(e){return Qs.error("FallbackProvider \u521D\u59CB\u5316\u5931\u8D25",{error:e?.message||e}),this._initialized=!1,!1}}async dispose(){this._flushSave(!0),this._tables.clear(),this._migrations.clear(),this._initialized=!1}async migrate({migrations:e}={}){this._ensureReady();let r=[],n=[];for(let s of e||[]){if(!s?.id||!s?.statement)continue;if(this._migrations.has(s.id)){n.push(s.id);continue}let o=s.statement.trim();if(/^CREATE\s+TABLE/i.test(o)){let a=US(o);if(!a)throw new Error(`\u65E0\u6CD5\u89E3\u6790 CREATE TABLE: ${o}`);this._tables.has(a.name)||this._tables.set(a.name,{schema:a,rows:[]})}else if(!/^CREATE\s+(UNIQUE\s+)?INDEX/i.test(o))if(/^DROP\s+TABLE/i.test(o)){let a=o.match(/^DROP\s+TABLE\s+(?:IF\s+EXISTS\s+)?(\w+)/i);a&&this._tables.delete(a[1])}else/^ALTER\s+TABLE/i.test(o)?Qs.warn("FallbackProvider \u4E0D\u652F\u6301 ALTER TABLE\uFF0C\u8DF3\u8FC7",{id:s.id}):Qs.warn("FallbackProvider \u8DF3\u8FC7\u672A\u8BC6\u522B DDL",{id:s.id,statement:o});this._migrations.add(s.id),r.push(s.id)}return this._markDirty(),{applied:r,skipped:n}}async query({statement:e,params:r=[]}={}){this._ensureReady();let n=WS(e);if(!n)throw new Error(`\u65E0\u6CD5\u89E3\u6790 SELECT: ${e}`);let s=this._tables.get(n.name);if(!s)return{columns:n.cols||[],rows:[],rowCount:0};let o=s.rows.filter(l=>Ad(l,n.where,r));if(n.orderBy){let l=n.orderBy.dir==="DESC"?-1:1;o=[...o].sort((d,c)=>ia(d[n.orderBy.col],c[n.orderBy.col])*l)}n.offset&&(o=o.slice(n.offset)),Number.isFinite(n.limit)&&(o=o.slice(0,n.limit));let a,i=o;return n.cols?(i=o.map(l=>{let d={};for(let c of n.cols)d[c]=l[c]===void 0?null:l[c];return d}),a=n.cols):a=s.schema?.columns?.map(l=>l.name)||(i[0]?Object.keys(i[0]):[]),{columns:a,rows:i,rowCount:i.length}}async execute({statement:e,params:r=[]}={}){this._ensureReady();let n=String(e||"").trim(),s=n.split(/\s+/)[0].toUpperCase(),o;if(s==="INSERT")o=this._doInsert(n,r);else if(s==="UPDATE")o=this._doUpdate(n,r);else if(s==="DELETE")o=this._doDelete(n,r);else throw new Error(`FallbackProvider \u4E0D\u652F\u6301\u7684 execute \u8BED\u53E5: ${e}`);return o}_doInsert(e,r){let n=jS(e);if(!n)throw new Error(`\u65E0\u6CD5\u89E3\u6790 INSERT: ${e}`);let s=this._tables.get(n.name);if(!s)throw new Error(`\u8868\u4E0D\u5B58\u5728: ${n.name}`);let o=n.cols||(s.schema.columns||[]).map(d=>d.name);if(!o.length)throw new Error(`\u8868 ${n.name} \u65E0\u5217\u5B9A\u4E49`);if(r.length!==o.length)throw new Error(`INSERT \u53C2\u6570\u6570\u91CF\u4E0D\u5339\u914D (\u671F\u671B ${o.length}, \u5B9E\u9645 ${r.length})`);let a={};for(let d=0;d<o.length;d+=1)a[o[d]]=r[d];let i=s.schema?.pkCols||[],l=/^INSERT\s+OR\s+REPLACE/i.test(e);if(i.length){let d=s.rows.findIndex(c=>i.every(u=>Cd(c[u],a[u])));if(d>=0){if(l)return s.rows[d]=a,this._markDirty(),{rowsAffected:1,lastInsertRowid:d+1};throw new Error(`PRIMARY KEY \u51B2\u7A81 (${i.join(",")})`)}}return s.rows.push(a),this._markDirty(),{rowsAffected:1,lastInsertRowid:s.rows.length}}_doUpdate(e,r){let n=HS(e);if(!n)throw new Error(`\u65E0\u6CD5\u89E3\u6790 UPDATE: ${e}`);let s=this._tables.get(n.name);if(!s)return{rowsAffected:0,lastInsertRowid:null};let o=n.setCols.length;if(r.length<o)throw new Error(`UPDATE \u53C2\u6570\u4E0D\u8DB3 (SET \u9700\u8981 ${o}, \u5B9E\u9645 ${r.length})`);let a=r.slice(0,o),i=r.slice(o),l=0;for(let d of s.rows)if(Ad(d,n.where,i)){for(let c=0;c<o;c+=1)d[n.setCols[c]]=a[c];l+=1}return l>0&&this._markDirty(),{rowsAffected:l,lastInsertRowid:null}}_doDelete(e,r){let n=qS(e);if(!n)throw new Error(`\u65E0\u6CD5\u89E3\u6790 DELETE: ${e}`);let s=this._tables.get(n.name);if(!s)return{rowsAffected:0,lastInsertRowid:null};let o=s.rows.length;s.rows=s.rows.filter(i=>!Ad(i,n.where,r));let a=o-s.rows.length;return a>0&&this._markDirty(),{rowsAffected:a,lastInsertRowid:null}}async batch({statements:e}={}){this._ensureReady();let r=[];for(let n of e||[])if(String(n.statement||"").trim().split(/\s+/)[0].toUpperCase()==="SELECT"){let o=await this.query(n);r.push({kind:"query",...o})}else{let o=await this.execute(n);r.push({kind:"exec",...o})}return{results:r}}async transaction({statements:e}={}){this._ensureReady();let r=this._snapshot();try{let{results:n}=await this.batch({statements:e});return this._flushSave(!0),{committed:!0,results:n}}catch(n){throw this._restore(r),Qs.warn("FallbackProvider \u4E8B\u52A1\u56DE\u6EDA",{error:n?.message||n}),n}}async paginate({statement:e,params:r=[],page:n={}}={}){this._ensureReady();let s=Number.isFinite(n?.limit)?n.limit:50,o=Number.isFinite(n?.offset)?n.offset:0,a=`${e} LIMIT ${s} OFFSET ${o}`;return this.query({statement:a,params:r})}async backup(){return this._ensureReady(),this._snapshot()}async export(){return this.backup()}async import(e){this._ensureReady(),this._restore(e||{}),this._markDirty(),this._flushSave(!0)}describe(){return{kind:this.kind,initialized:this._initialized,tables:this._tables.size,migrations:this._migrations.size,tableNames:[...this._tables.keys()]}}_snapshot(){let e={};for(let[r,n]of this._tables)e[r]={schema:n.schema,rows:JSON.parse(JSON.stringify(n.rows))};return{migrations:[...this._migrations],tables:e}}_restore(e){this._migrations=new Set(Array.isArray(e?.migrations)?e.migrations:[]),this._tables=new Map;for(let[r,n]of Object.entries(e?.tables||{}))this._tables.set(r,{schema:n.schema||{name:r,columns:[],pkCols:[]},rows:Array.isArray(n.rows)?n.rows:[]})}_markDirty(){this._dirty=!0,this._saveTimer&&clearTimeout(this._saveTimer),this._saveTimer=setTimeout(()=>this._flushSave(!1),300)}_flushSave(e){if(this._saveTimer&&(clearTimeout(this._saveTimer),this._saveTimer=null),!(!this._dirty&&!e))try{$e.set(Cm,this._snapshot()),this._dirty=!1}catch(r){Qs.error("FallbackProvider \u6301\u4E45\u5316\u5931\u8D25",{error:r?.message||r})}}_ensureReady(){if(!this._initialized)throw new Error("FallbackProvider \u5C1A\u672A\u521D\u59CB\u5316")}},YS=Di});var Rm={};he(Rm,{PROVIDER_KIND:()=>Vs,createProvider:()=>VS,detectAuthoritySdk:()=>Oi,disposeToolDataProvider:()=>JS,getCurrentProvider:()=>Xs,getToolDataProvider:()=>ca});function Oi(){if(typeof window>"u")return null;try{let t=window.STAuthority?.AuthoritySDK;if(t)return t}catch{}try{if(window.parent&&window.parent!==window){let t=window.parent.STAuthority?.AuthoritySDK;if(t)return t}}catch{}return null}async function Rd({preferAuthority:t=!0,extensionVersion:e="1.0.149"}={}){if(t&&Oi()){let{AuthorityProvider:n}=await Promise.resolve().then(()=>(Am(),Em));return new n({extensionVersion:e})}let{FallbackProvider:r}=await Promise.resolve().then(()=>(Im(),km));return new r}async function ca(t={}){return os||la||(la=(async()=>{let e=await Rd({preferAuthority:!0,...t}),r=await e.init();if(!r&&e.kind===Vs.AUTHORITY){Id.warn("AuthorityProvider \u521D\u59CB\u5316\u5931\u8D25\uFF0C\u964D\u7EA7\u5230 FallbackProvider");try{await e.dispose()}catch{}e=await Rd({preferAuthority:!1}),r=await e.init()}return r?Id.info(`Provider \u521D\u59CB\u5316\u5B8C\u6210: kind=${e.kind}`):Id.error(`Provider \u5168\u90E8\u521D\u59CB\u5316\u5931\u8D25 (kind=${e.kind})`),os=e,e})(),la)}function Xs(){return os}async function VS(t={}){let e=await Rd(t);return await e.init(),e}async function JS(){if(os){try{await os.dispose()}catch{}os=null}la=null}var Id,Vs,os,la,Js=O(()=>{Z();Id=$.createScope("ToolDataProvider"),Vs=Object.freeze({AUTHORITY:"authority",FALLBACK:"fallback"}),os=null,la=null});var Dd={};he(Dd,{clearChatScopeConfig:()=>Wm,clearLockEntry:()=>zm,clearScopeLocks:()=>Fm,clearSheetLocks:()=>Km,clearSlot:()=>Om,commitSlotTables:()=>Fi,default:()=>XS,deleteRowsBySheet:()=>$m,deleteSheetsBySlot:()=>Ki,ensureTableDataReady:()=>at,getChatScopeConfig:()=>Um,getCurrentTableDataProvider:()=>Pm,getLocksForSheet:()=>Dm,getRowsBySheet:()=>Od,getSheetsBySlot:()=>$d,loadSlotTables:()=>Lm,setChatScopeConfig:()=>jm,setLockEntry:()=>Bm,upsertSheetMeta:()=>Nd,upsertSheetRows:()=>Ld});function Pd(){return Md||(Md=$.createScope("TableDataService")),Md}async function at(){return Mm?Xs():da||(da=(async()=>{try{let t=await ca();if(!t)return Pd().error("Provider \u4E0D\u53EF\u7528\uFF0C\u8DF3\u8FC7 migration"),null;let e=await t.migrate({migrations:[...QS]});return Mm=!0,Pd().info("\u8868\u683C\u6570\u636E migration \u5B8C\u6210",{kind:t.kind,applied:e?.applied?.length||0,skipped:e?.skipped?.length||0}),t}catch(t){return Pd().error("table-data-service migration \u5931\u8D25",t),null}finally{da=null}})(),da)}function Pm(){return Xs()}function Nm(){return Date.now()}function Bi(t){try{return JSON.stringify(t)}catch{return"{}"}}function zi(t,e=null){if(typeof t!="string")return e;try{return JSON.parse(t)}catch{return e}}function bn(t={}){return{chatId:String(t.chatId??"").trim(),messageId:String(t.messageId??"").trim(),swipeId:String(t.swipeId??"0").trim()||"0",isolationKey:De(t.isolationKey)}}function xn(t){return t&&t.chatId&&t.messageId}async function Nd(t,e){let r=await at();if(!r)return!1;let n=bn(t);return!xn(n)||!e?.uid?!1:(await r.execute({statement:`INSERT INTO table_sheets
      (chat_id, message_id, swipe_id, isolation_key, sheet_uid, name, columns_json, meta_json, order_no, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,params:[n.chatId,n.messageId,n.swipeId,n.isolationKey,String(e.uid),String(e.name??e.uid),Bi(Array.isArray(e.columns)?e.columns:[]),Bi(e.meta||e.sourceData||{}),Number.isFinite(e.orderNo)?e.orderNo:0,Nm()]}),!0)}async function $d(t){let e=await at();if(!e)return[];let r=bn(t);return xn(r)?((await e.query({statement:`SELECT * FROM table_sheets
      WHERE chat_id = ? AND message_id = ? AND swipe_id = ? AND isolation_key = ?
      ORDER BY order_no ASC`,params:[r.chatId,r.messageId,r.swipeId,r.isolationKey]}))?.rows||[]).map(s=>({uid:s.sheet_uid,name:s.name,columns:zi(s.columns_json,[]),meta:zi(s.meta_json,{}),orderNo:s.order_no||0,updatedAt:s.updated_at||0})):[]}async function Ki(t){let e=await at();if(!e)return 0;let r=bn(t);return xn(r)&&(await e.execute({statement:`DELETE FROM table_sheets
      WHERE chat_id = ? AND message_id = ? AND swipe_id = ? AND isolation_key = ?`,params:[r.chatId,r.messageId,r.swipeId,r.isolationKey]}))?.rowsAffected||0}async function Ld(t,e,r){let n=await at();if(!n)return!1;let s=bn(t);if(!xn(s)||!e||!Array.isArray(r))return!1;if(await n.execute({statement:`DELETE FROM table_rows
      WHERE chat_id = ? AND message_id = ? AND swipe_id = ? AND isolation_key = ? AND sheet_uid = ?`,params:[s.chatId,s.messageId,s.swipeId,s.isolationKey,String(e)]}),r.length===0)return!0;let o=r.map((a,i)=>({statement:`INSERT INTO table_rows
      (chat_id, message_id, swipe_id, isolation_key, sheet_uid, row_index, row_id, row_name, cells_json)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,params:[s.chatId,s.messageId,s.swipeId,s.isolationKey,String(e),i,String(a?.id??""),String(a?.name??""),Bi(a?.cells||{})]}));return typeof n.transaction=="function"?await n.transaction({statements:o}):await n.batch({statements:o}),!0}async function Od(t,e){let r=await at();if(!r)return[];let n=bn(t);return!xn(n)||!e?[]:((await r.query({statement:`SELECT * FROM table_rows
      WHERE chat_id = ? AND message_id = ? AND swipe_id = ? AND isolation_key = ? AND sheet_uid = ?
      ORDER BY row_index ASC`,params:[n.chatId,n.messageId,n.swipeId,n.isolationKey,String(e)]}))?.rows||[]).map(o=>({id:o.row_id||"",name:o.row_name||"",cells:zi(o.cells_json,{}),rowIndex:o.row_index}))}async function $m(t,e){let r=await at();if(!r)return 0;let n=bn(t);return!xn(n)||!e?0:(await r.execute({statement:`DELETE FROM table_rows
      WHERE chat_id = ? AND message_id = ? AND swipe_id = ? AND isolation_key = ? AND sheet_uid = ?`,params:[n.chatId,n.messageId,n.swipeId,n.isolationKey,String(e)]}))?.rowsAffected||0}async function Lm(t){let e=await $d(t);if(e.length===0)return[];let r=[];for(let n of e){let s=await Od(t,n.uid);r.push({id:n.uid,uid:n.uid,name:n.name,columns:n.columns,rows:s,meta:n.meta,orderNo:n.orderNo,updatedAt:n.updatedAt})}return r}async function Fi(t,e){let r=await at();if(!r)return!1;let n=bn(t);if(!xn(n)||!Array.isArray(e))return!1;await Ki(n),await r.execute({statement:`DELETE FROM table_rows
      WHERE chat_id = ? AND message_id = ? AND swipe_id = ? AND isolation_key = ?`,params:[n.chatId,n.messageId,n.swipeId,n.isolationKey]});for(let s=0;s<e.length;s++){let o=e[s],a=String(o?.uid||o?.id||`sheet_${s+1}`);await Nd(n,{uid:a,name:o?.name||a,columns:o?.columns||[],meta:o?.meta||{},orderNo:Number.isFinite(o?.orderNo)?o.orderNo:s}),await Ld(n,a,Array.isArray(o?.rows)?o.rows:[])}return!0}async function Om(t){let e=await at();if(!e)return!1;let r=bn(t);return xn(r)?(await Ki(r),await e.execute({statement:`DELETE FROM table_rows
      WHERE chat_id = ? AND message_id = ? AND swipe_id = ? AND isolation_key = ?`,params:[r.chatId,r.messageId,r.swipeId,r.isolationKey]}),!0):!1}async function Dm(t,e){let r=await at();if(!r)return[];let n=String(t?.chatId??"").trim(),s=De(t?.isolationKey);return!n||!e?[]:((await r.query({statement:`SELECT lock_type, target FROM table_locks
      WHERE chat_id = ? AND isolation_key = ? AND sheet_uid = ?`,params:[n,s,String(e)]}))?.rows||[]).map(a=>({lockType:a.lock_type,target:a.target||""}))}async function Bm(t,e,r,n=""){let s=await at();if(!s)return!1;let o=String(t?.chatId??"").trim(),a=De(t?.isolationKey);return!o||!e||!r?!1:(await s.execute({statement:"INSERT INTO table_locks (chat_id, isolation_key, sheet_uid, lock_type, target) VALUES (?, ?, ?, ?, ?)",params:[o,a,String(e),String(r),String(n)]}),!0)}async function zm(t,e,r,n=""){let s=await at();if(!s)return!1;let o=String(t?.chatId??"").trim(),a=De(t?.isolationKey);return!o||!e||!r?!1:(await s.execute({statement:`DELETE FROM table_locks
      WHERE chat_id = ? AND isolation_key = ? AND sheet_uid = ? AND lock_type = ? AND target = ?`,params:[o,a,String(e),String(r),String(n)]}),!0)}async function Km(t,e){let r=await at();if(!r)return!1;let n=String(t?.chatId??"").trim(),s=De(t?.isolationKey);return!n||!e?!1:(await r.execute({statement:`DELETE FROM table_locks
      WHERE chat_id = ? AND isolation_key = ? AND sheet_uid = ?`,params:[n,s,String(e)]}),!0)}async function Fm(t){let e=await at();if(!e)return!1;let r=String(t?.chatId??"").trim(),n=De(t?.isolationKey);return r?(await e.execute({statement:"DELETE FROM table_locks WHERE chat_id = ? AND isolation_key = ?",params:[r,n]}),!0):!1}async function Um(t){let e=await at();if(!e)return null;let r=String(t??"").trim();if(!r)return null;let s=(await e.query({statement:"SELECT scoped_config_json FROM table_chat_scope WHERE chat_id = ?",params:[r]}))?.rows?.[0];return s?zi(s.scoped_config_json,null):null}async function jm(t,e){let r=await at();if(!r)return!1;let n=String(t??"").trim();return n?(await r.execute({statement:"INSERT INTO table_chat_scope (chat_id, scoped_config_json, updated_at) VALUES (?, ?, ?)",params:[n,Bi(e||{}),Nm()]}),!0):!1}async function Wm(t){let e=await at();if(!e)return!1;let r=String(t??"").trim();return r?(await e.execute({statement:"DELETE FROM table_chat_scope WHERE chat_id = ?",params:[r]}),!0):!1}var Md,QS,Mm,da,XS,Ui=O(()=>{Z();Js();We();QS=Object.freeze([{id:"table_engine_v1__sheets",statement:`
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
    `.replace(/\s+/g," ").trim()}]),Mm=!1,da=null;XS={ensureTableDataReady:at,getCurrentTableDataProvider:Pm,upsertSheetMeta:Nd,getSheetsBySlot:$d,deleteSheetsBySlot:Ki,upsertSheetRows:Ld,getRowsBySheet:Od,deleteRowsBySheet:$m,loadSlotTables:Lm,commitSlotTables:Fi,clearSlot:Om,getLocksForSheet:Dm,setLockEntry:Bm,clearLockEntry:zm,clearSheetLocks:Km,clearScopeLocks:Fm,getChatScopeConfig:Um,setChatScopeConfig:jm,clearChatScopeConfig:Wm}});function Wr(){return Bd||(Bd=$.createScope("TableChatScope")),Bd}function Ir(){let t=globalThis.window||globalThis,e=t?.TavernHelper?.getCurrentChatId?.()||t?.Silvy?.getCurrentChatId?.()||t?.chat_metadata?.chat_id||t?.this_chid||t?.name1;return String(e??"").trim()||"default_chat"}function Wi(){return new Date().toISOString()}function Zs(t){return t!==null&&typeof t=="object"&&!Array.isArray(t)}function jr(t){let e=Kd.get(zd,{}),n=(Zs(e)?e:{})[t];return qm(n)}function as(t,e){let r=Kd.get(zd,{}),n=Zs(r)?r:{};n[t]=e,Kd.set(zd,n),eT(t,e).catch(()=>{})}async function eT(t,e){try{let r=await Promise.resolve().then(()=>(Ui(),Dd));await r.ensureTableDataReady(),await r.setChatScopeConfig(t,e||{})}catch(r){Wr().warn("chat-scope SQL \u955C\u50CF\u5931\u8D25\uFF08\u4E0D\u5F71\u54CD\u4E3B\u6D41\u7A0B\uFF09",{error:r?.message||String(r)})}}function Hm(){return{template:{},templateArchives:{}}}function qm(t){return Zs(t)?{template:Zs(t.template)?t.template:{},templateArchives:Zs(t.templateArchives)?t.templateArchives:{}}:Hm()}function ji(t){return Zs(t)?{mode:tT.has(t.mode)?t.mode:st.INHERIT_GLOBAL,presetName:typeof t.presetName=="string"?t.presetName:"",templateStr:typeof t.templateStr=="string"?t.templateStr:"",guideData:t.guideData!==void 0?fe(t.guideData):null,updatedAt:typeof t.updatedAt=="string"?t.updatedAt:Wi(),source:typeof t.source=="string"?t.source:"ui"}:null}function rT(t){let e=[t.mode||"",t.presetName||"",t.templateStr||""],r=5381,n=e.join("||");for(let s=0;s<n.length;s++)r=(r<<5)+r+n.charCodeAt(s),r|=0;return String(r)}var ZS,zd,Bd,Kd,tT,Fd,Rr,Gm=O(()=>{Je();Z();We();Ur();ZS="tableChatScope",zd="chats";Kd=j.namespace(ZS);tT=new Set(Object.values(st));Fd=class{getScopedConfig(e=Ir()){return jr(e)}setScopedConfig(e,r=Ir()){let n=qm(e);return as(r,n),n}getTemplateScope(e,r=Ir()){let n=De(e===void 0?ye.getKey():e),s=jr(r);return ji(s.template[n])||null}setTemplateScope(e,r,n=Ir()){let s=De(r===void 0?ye.getKey():r),o=ji({...e,updatedAt:Wi()});if(!o)return Wr().warn("setTemplateScope \u6536\u5230\u65E0\u6548 state",e),null;let a=jr(n);return a.template[s]=o,as(n,a),Wr().info("\u6A21\u677F\u4F5C\u7528\u57DF\u5DF2\u66F4\u65B0",{chatId:n,isolationKey:s,mode:o.mode}),o}clearTemplateScope(e,r=Ir()){let n=De(e===void 0?ye.getKey():e),s=jr(r);s.template[n]!==void 0&&(delete s.template[n],as(r,s),Wr().info("\u6A21\u677F\u4F5C\u7528\u57DF\u5DF2\u6E05\u9664",{chatId:r,isolationKey:n}))}archiveCurrentTemplate(e,r=Ir()){let n=De(e===void 0?ye.getKey():e),s=jr(r),o=ji(s.template[n]);if(!o)return null;let a=rT(o),i=Array.isArray(s.templateArchives[n])?s.templateArchives[n]:[];if(i.length>0&&i[0].fingerprint===a)return null;let l={fingerprint:a,state:fe(o),archivedAt:Wi()},d=[l,...i].slice(0,om);return s.templateArchives[n]=d,as(r,s),Wr().info("\u6A21\u677F\u5DF2\u5F52\u6863",{chatId:r,isolationKey:n,archiveCount:d.length}),l}listTemplateArchives(e,r=Ir()){let n=De(e===void 0?ye.getKey():e),s=jr(r);return(Array.isArray(s.templateArchives[n])?s.templateArchives[n]:[]).map(a=>fe(a))}restoreTemplateArchive(e,r,n=Ir()){let s=De(r===void 0?ye.getKey():r),o=jr(n),a=Array.isArray(o.templateArchives[s])?o.templateArchives[s]:[],i=a[e];if(!i)return Wr().warn("restoreTemplateArchive: \u627E\u4E0D\u5230 archive",{index:e,available:a.length}),null;this.archiveCurrentTemplate(s,n);let l=ji({...i.state,source:"restore",updatedAt:Wi()});if(!l)return null;let d=jr(n);return d.template[s]=l,as(n,d),Wr().info("\u6A21\u677F\u5DF2\u6062\u590D",{chatId:n,isolationKey:s,fromArchiveIndex:e}),l}clearTemplateArchives(e,r=Ir()){let n=De(e===void 0?ye.getKey():e),s=jr(r);Array.isArray(s.templateArchives[n])&&(delete s.templateArchives[n],as(r,s),Wr().info("\u6A21\u677F\u5F52\u6863\u5DF2\u6E05\u7A7A",{chatId:r,isolationKey:n}))}resetChat(e=Ir()){as(e,Hm()),Wr().warn("\u5DF2\u91CD\u7F6E chat \u7684 ScopedConfig",{chatId:e})}},Rr=new Fd});var Ym,Vm=O(()=>{We();Ym=Object.freeze({formatId:"youyou",displayName:"YouYou \u539F\u751F (tables \u6570\u7EC4)",detect(t){return!t||typeof t!="object"||Array.isArray(t)?!1:Array.isArray(t.tables)},parse(t){if(!t||typeof t!="object")throw new Error("youyou-importer: raw \u4E0D\u662F\u5BF9\u8C61");return{tables:Array.isArray(t.tables)?fe(t.tables):[],name:typeof t.name=="string"?t.name:"",description:typeof t.description=="string"?t.description:"",promptTemplate:typeof t.promptTemplate=="string"?t.promptTemplate:""}}})});function Mr(t,e=""){return t==null?e:String(t).trim()||e}function Jm(t){return t&&typeof t=="object"&&Array.isArray(t.content)}function Qm(t){return!t||typeof t!="object"?null:t.tables&&typeof t.tables=="object"&&!Array.isArray(t.tables)&&Object.keys(t.tables).filter(n=>n.startsWith("sheet_")&&Jm(t.tables[n])).length>0?t.tables:Object.keys(t).filter(r=>r.startsWith("sheet_")&&Jm(t[r])).length>0?t:null}function nT(t){return!t||typeof t!="object"?[]:Object.keys(t).filter(r=>r.startsWith("sheet_")&&t[r]&&typeof t[r]=="object").map((r,n)=>({key:r,table:t[r],fallbackOrder:n})).sort((r,n)=>{let s=Number.isFinite(r.table.orderNo)?r.table.orderNo:r.fallbackOrder,o=Number.isFinite(n.table.orderNo)?n.table.orderNo:n.fallbackOrder;return s-o}).map(({key:r,table:n},s)=>{let o=n.sourceData&&typeof n.sourceData=="object"?n.sourceData:{},a=Array.isArray(n.content)?n.content:[],i=Array.isArray(a[0])?a[0]:[],l=xd(o.note),d=new Set,c=i.slice(1).map((y,p)=>{let m=l[p]||{},g=Mr(y||m.title,`\u5217${p+1}`);return{key:mn(g||`col_${p+1}`,d),title:g,description:Mr(m.description,""),type:"text",required:!1}}),u=a.slice(1).map((y,p)=>{let m=Array.isArray(y)?y:[],g={};return c.forEach((h,b)=>{g[h.key]=fn(m[b+1])}),{name:Mr(m[0],`\u884C${p+1}`),cells:g}});return{id:Mr(n.uid||r,`sheet_${s+1}`),name:Mr(n.name,`\u8868${s+1}`),note:Mr(o.note,""),enabled:n.enabled!==!1,aiInstructions:{init:Mr(o.initNode,""),create:Mr(o.insertNode,""),update:Mr(o.updateNode,""),delete:Mr(o.deleteNode,"")},columns:c,rows:u}})}var Xm,Zm=O(()=>{We();sr();Xm=Object.freeze({formatId:"shujuku",displayName:"shujuku \u6570\u636E\u5E93\u683C\u5F0F (sheet_x)",detect(t){return!t||typeof t!="object"||Array.isArray(t)?!1:Qm(t)!==null},parse(t){let e=Qm(t);if(!e)throw new Error("shujuku-importer: \u672A\u627E\u5230 sheet_xxx \u5165\u53E3");return{tables:nT(e),name:typeof t.name=="string"?t.name:"",description:typeof t.description=="string"?t.description:""}}})});var eg,tg=O(()=>{eg=Object.freeze({formatId:"youyou",displayName:"YouYou \u539F\u751F (.json)",fileExtension:".json",mimeType:"application/json",serialize(t){return{version:1,exportedAt:new Date().toISOString(),templates:Array.isArray(t)?t:[]}}})});function ua(){return Ud||(Ud=$.createScope("TemplateAdapter")),Ud}function rg(t){if(t==null)return null;for(let e of sT){let r=!1;try{r=e.detect(t)}catch(n){ua().warn(`importer ${e.formatId} detect \u629B\u9519`,n);continue}if(r)try{let n=e.parse(t);if(n&&Array.isArray(n.tables))return ua().debug("\u9002\u914D\u5668\u547D\u4E2D",{formatId:e.formatId,displayName:e.displayName,tableCount:n.tables.length,firstTableName:n.tables[0]?.name||""}),{...n,formatId:e.formatId};ua().warn(`importer ${e.formatId} parse \u8FD4\u56DE\u65E0\u6548\u7ED3\u6784`,{hasResult:!!n,hasTablesArray:Array.isArray(n?.tables)})}catch(n){ua().warn(`importer ${e.formatId} parse \u629B\u9519\uFF0C\u5C1D\u8BD5\u4E0B\u4E00\u4E2A`,n)}}return ua().warn("importTemplateAuto: \u65E0\u9002\u914D\u5668\u547D\u4E2D",{isObject:t&&typeof t=="object",isArray:Array.isArray(t),keys:t&&typeof t=="object"?Object.keys(t).slice(0,10):[]}),null}var Ud,sT,n5,ng=O(()=>{Z();Vm();Zm();tg();sT=Object.freeze([Ym,Xm]),n5=Object.freeze([eg])});function Dt(){return jd||(jd=$.createScope("TableTemplate")),jd}function mt(t,e=""){return t==null?e:String(t).trim()||e}function sg(t="template"){return`${t}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`}function to(t={}){let e=rg(t),r=[],n="",s="",o="",a="";e?(r=e.tables,n=e.formatId||"",s=e.name||"",o=e.description||"",a=e.promptTemplate||""):t&&typeof t=="object"&&Dt().warn("normalizeTemplate: \u65E0\u9002\u914D\u5668\u547D\u4E2D\uFF0C\u6309\u7A7A\u6A21\u677F\u5904\u7406",{keys:Object.keys(t).slice(0,10)});let i=$i({tables:r});return{id:mt(t?.id,sg()),name:mt(t?.name||s,"\u672A\u547D\u540D\u6A21\u677F"),description:mt(t?.description||o,""),tables:i.tables||r,promptTemplate:mt(t?.promptTemplate||a,""),sourceFormat:n,createdAt:mt(t?.createdAt,new Date().toISOString()),updatedAt:mt(t?.updatedAt,new Date().toISOString())}}function og(){pa=null}function ag(){return[to({id:Mt,name:md,description:"\u5305\u542B\u5168\u5C40\u6570\u636E\u3001\u4E3B\u89D2\u3001\u91CD\u8981\u89D2\u8272\u3001\u6280\u80FD\u3001\u80CC\u5305\u3001\u4EFB\u52A1\u3001\u7EAA\u8981\u548C\u9009\u9879\u8868\u3002",tables:fe(Hs)})]}function is(){let t=eo.get(Wd,[]);return Array.isArray(t)?t.map(to):[]}function vn(){if(pa)return pa;let t=ag(),e=is(),r=new Map(e.map(o=>[o.id,o])),n=t.map(o=>r.has(o.id)?r.get(o.id):o),s=new Set(t.map(o=>o.id));for(let o of e)s.has(o.id)||n.push(o);return pa=Object.freeze(n),pa}function ss(t){let e=mt(t,"");return vn().find(r=>r.id===e)||null}function gn(t={}){let e=new Date().toISOString(),r=to({...t,id:mt(t.id,sg()),updatedAt:e,createdAt:mt(t.createdAt,e)}),s=is().filter(o=>o.id!==r.id);return s.push(r),eo.set(Wd,s),og(),{success:!0,template:r}}function qd(t){let e=mt(t,"");if(!e||e===Mt)return{success:!1,error:"\u5185\u7F6E\u6A21\u677F\u4E0D\u80FD\u5220\u9664\u3002"};let r=is().filter(n=>n.id!==e);return eo.set(Wd,r),og(),oT()===e&&Gd(Mt),{success:!0}}function ig(t,e){let r=mt(t,"");if(!r||r===Mt)return{success:!1,error:"\u5185\u7F6E\u6A21\u677F\u4E0D\u80FD\u91CD\u547D\u540D\u3002"};let n=mt(e,"");if(!n)return{success:!1,error:"\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A\u3002"};let s=ss(r);return s?gn({...s,name:n}):{success:!1,error:"\u6A21\u677F\u4E0D\u5B58\u5728\u3002"}}function Hi(){return{version:1,exportedAt:new Date().toISOString(),templates:is()}}function lg(t,{overwrite:e=!1}={}){let r;if(Array.isArray(t))r=t;else if(t&&typeof t=="object")Array.isArray(t.templates)?r=t.templates:t.template&&typeof t.template=="object"?r=[t.template]:r=[t];else return{success:!1,imported:0,skipped:0,errors:["\u65E0\u6548\u7684\u5BFC\u5165\u6570\u636E\u683C\u5F0F\u3002"]};Dt().info("importTemplates \u5F00\u59CB",{rawListCount:r.length,overwrite:e});let n=new Set(is().map(i=>i.id)),s=0,o=0,a=[];for(let i of r)try{let l=to(i);if(Dt().info("importTemplates \u5355\u6761",{id:l.id,name:l.name,tableCount:Array.isArray(l.tables)?l.tables.length:0,firstTableName:l.tables?.[0]?.name||""}),!e&&n.has(l.id)){o++;continue}gn(l),n.add(l.id),s++}catch(l){a.push(mt(l?.message,"\u672A\u77E5\u9519\u8BEF")),Dt().error("importTemplates \u5355\u6761\u5931\u8D25",l)}return Dt().info("importTemplates \u5B8C\u6210",{imported:s,skipped:o,errorCount:a.length}),{success:!0,imported:s,skipped:o,errors:a}}function oT(){let t=eo.get(Hd,""),e=mt(t,Mt);return ss(e)?e:Mt}function Gd(t){let e=mt(t,Mt);return eo.set(Hd,e),Dt().info("\u5168\u5C40\u6FC0\u6D3B\u6A21\u677F\u5DF2\u5207\u6362",{templateId:e}),e}function wn(){let t=eo.get(Hd,""),e=mt(t,Mt),r=ss(e);return r||ag()[0]}function aT(t){try{return JSON.stringify(t)}catch(e){return Dt().error("templateToString \u5931\u8D25",e),""}}function iT(t){if(!t||typeof t!="string")return null;try{let e=JSON.parse(t);return to(e)}catch(e){return Dt().warn("templateFromString \u53CD\u5E8F\u5217\u5316\u5931\u8D25",e),null}}function ro({chatId:t,isolationKey:e}={}){let r=e===void 0?ye.getKey():e,n=Rr.getTemplateScope(r,t);if(!n||n.mode===st.INHERIT_GLOBAL){let o=wn();return Dt().debug("resolveActiveTemplate: inherit_global",{chatId:t,isolationKey:r,templateId:o?.id||"",templateName:o?.name||"",tableCount:Array.isArray(o?.tables)?o.tables.length:0,firstTableName:o?.tables?.[0]?.name||""}),{template:o,mode:st.INHERIT_GLOBAL,source:{templateId:o?.id||""}}}if(n.mode===st.CHAT_OVERRIDE){let o=iT(n.templateStr);if(o)return{template:o,mode:st.CHAT_OVERRIDE,source:{}};Dt().warn("chat_override templateStr \u53CD\u5E8F\u5217\u5316\u5931\u8D25\uFF0C\u964D\u7EA7\u5230 inherit_global");let a=wn();return{template:a,mode:st.INHERIT_GLOBAL,source:{templateId:a?.id||"",fallback:!0}}}if(n.mode===st.PRESET_LINK){let o=n.presetName||"",a=vn(),i=a.find(d=>d.name===o)||a.find(d=>d.id===o);if(i)return{template:i,mode:st.PRESET_LINK,source:{presetName:o,templateId:i.id}};Dt().warn("preset_link \u6307\u5411\u7684\u5168\u5C40\u9884\u8BBE\u4E0D\u5B58\u5728\uFF0C\u964D\u7EA7\u5230 inherit_global",{presetName:o});let l=wn();return{template:l,mode:st.INHERIT_GLOBAL,source:{templateId:l?.id||"",presetName:o,fallback:!0}}}let s=wn();return{template:s,mode:st.INHERIT_GLOBAL,source:{templateId:s?.id||"",unknownMode:n.mode}}}function cg(t,e={}){if(!t||typeof t!="object")return{success:!1,error:"\u6A21\u677F\u4E0D\u80FD\u4E3A\u7A7A"};let r=to(t),n=e.isolationKey===void 0?ye.getKey():e.isolationKey;Rr.archiveCurrentTemplate(n,e.chatId);let s=Rr.setTemplateScope({mode:st.CHAT_OVERRIDE,templateStr:aT(r),source:e.source||"ui"},n,e.chatId);return Dt().info("applyTemplateAsChatOverride",{chatId:e.chatId,isolationKey:n,templateName:r.name}),{success:!0,scopeState:s}}function dg(t,e={}){let r=mt(t,"");if(!r)return{success:!1,error:"presetName \u4E0D\u80FD\u4E3A\u7A7A"};let n=vn(),s=n.find(i=>i.name===r)||n.find(i=>i.id===r);if(!s)return{success:!1,error:"\u627E\u4E0D\u5230\u6307\u5B9A\u7684\u5168\u5C40\u9884\u8BBE"};let o=e.isolationKey===void 0?ye.getKey():e.isolationKey;Rr.archiveCurrentTemplate(o,e.chatId);let a=Rr.setTemplateScope({mode:st.PRESET_LINK,presetName:s.name,source:e.source||"ui"},o,e.chatId);return Dt().info("linkPresetToChat",{chatId:e.chatId,isolationKey:o,presetName:s.name}),{success:!0,scopeState:a}}function ug(t={}){let e=t.isolationKey===void 0?ye.getKey():t.isolationKey;return t.archive!==!1&&Rr.archiveCurrentTemplate(e,t.chatId),Rr.clearTemplateScope(e,t.chatId),Dt().info("resetChatTemplateScope",{chatId:t.chatId,isolationKey:e}),{success:!0}}function pg(t={}){let e=t.isolationKey===void 0?ye.getKey():t.isolationKey;return Rr.listTemplateArchives(e,t.chatId)}function yg(t,e={}){let r=e.isolationKey===void 0?ye.getKey():e.isolationKey,n=Rr.restoreTemplateArchive(t,r,e.chatId);return n?{success:!0,scopeState:n}:{success:!1,error:"\u5F52\u6863\u4E0D\u5B58\u5728"}}var eo,Wd,Hd,jd,pa,Gs=O(()=>{Je();Z();sr();We();Gm();Ur();ng();eo=j.namespace("tableWorkbenchTemplates"),Wd="templates",Hd="activeId";pa=null});var gg={};he(gg,{TableTemplatePanel:()=>mg,default:()=>pT});function Yd(t){return t===Mt}function dT(t,{onChange:e,readonly:r}){let n=f("div",{style:{display:"flex",flexDirection:"column",gap:"12px"}});re(n,Wt({label:"\u63CF\u8FF0",control:Te({value:t.description||"",placeholder:"\u53EF\u9009 \u2014 \u5907\u6CE8\u7528\u9014",disabled:r,onChange:a=>e({description:a})})})),re(n,f("div",{text:"\u586B\u8868\u63D0\u793A\u8BCD\u6A21\u677F",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}})),re(n,f("div",{text:"\u53EF\u4F7F\u7528\u5B8F\uFF1A{{tableData}} {{lastUserMessage}} {{lastAiMessage}} {{toolWorldbookContent}} \u7B49\u3002\u7559\u7A7A\u4F7F\u7528\u9ED8\u8BA4\u6A21\u677F\u3002",style:{fontSize:"11px",color:"var(--yyt-text-muted)",lineHeight:"1.6",marginBottom:"4px"}}));let s=f("textarea",{className:"yyt-textarea",attrs:{rows:"8",placeholder:"\u53EF\u9009 \u2014 \u81EA\u5B9A\u4E49\u586B\u8868\u63D0\u793A\u8BCD",disabled:r?"disabled":null},style:{width:"100%",resize:"vertical",fontFamily:"ui-monospace, monospace",fontSize:"12px"}});s.value=t.promptTemplate||"",s.addEventListener("change",()=>{r||e({promptTemplate:s.value})}),re(n,s),re(n,f("div",{text:`\u8868\u683C\u7ED3\u6784\uFF08${(t.tables||[]).length} \u5F20\u8868\uFF09`,style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)",marginTop:"6px"}})),re(n,f("div",{text:"\u672C\u9762\u677F\u53EA\u5C55\u793A\u8868\u7ED3\u6784 JSON\u3002\u590D\u6742 schema \u7F16\u8F91\uFF08\u589E\u5220\u8868\u3001\u5217\u5B9A\u4E49\u3001\u9ED8\u8BA4\u884C\uFF09\u5C06\u5728\u586B\u8868\u5DE5\u4F5C\u53F0\u4E2D\u63D0\u4F9B\u3002",style:{fontSize:"11px",color:"var(--yyt-text-muted)",lineHeight:"1.6",marginBottom:"4px"}}));let o=f("pre",{style:{padding:"10px 12px",background:"var(--yyt-bg-base)",border:"1px solid var(--yyt-border)",borderRadius:"var(--yyt-radius-sm, 6px)",fontFamily:"ui-monospace, monospace",fontSize:"11px",lineHeight:"1.6",color:"var(--yyt-text-secondary)",maxHeight:"260px",overflow:"auto",whiteSpace:"pre",margin:"0"}});try{o.textContent=JSON.stringify(t.tables||[],null,2)}catch{o.textContent="// \u65E0\u6CD5\u5E8F\u5217\u5316"}return re(n,o),n}function uT(t){let r=[`${(t.tables||[]).length} \u5F20\u8868`];return t.promptTemplate&&r.push("\u81EA\u5B9A\u4E49\u6A21\u677F"),r}var lT,fg,cT,mg,pT,hg=O(()=>{It();Gs();sr();Z();Uo();lT=$.createScope("TableTemplatePanel"),fg="";cT={listPresets(){return vn().map(t=>({id:Yd(t.id)?`builtin_table_${t.id}`:t.id,name:t.name,description:t.description||"",promptTemplate:t.promptTemplate||"",tables:t.tables||[],_rawId:t.id,createdAt:t.createdAt,updatedAt:t.updatedAt}))},getPreset(t){if(!t)return null;let e=t.startsWith("builtin_table_")?t.slice(14):t,r=ss(e);return r?{id:Yd(r.id)?`builtin_table_${r.id}`:r.id,name:r.name,description:r.description||"",promptTemplate:r.promptTemplate||"",tables:r.tables||[],_rawId:r.id,createdAt:r.createdAt,updatedAt:r.updatedAt}:null},getCurrentPresetId(){return fg||""},setCurrentPresetId(t){return fg=t||"",!0},createPreset(t){let e=String(t?.name||"").trim()||"\u65B0\u5EFA\u6A21\u677F",r=gn({name:e,description:t?.description||"",promptTemplate:t?.promptTemplate||"",tables:Array.isArray(t?.tables)?t.tables:[]});return r?.success?{id:r.template.id,...r.template,_rawId:r.template.id}:null},updatePreset(t,e){if(!t)return null;let r=t.startsWith("builtin_table_")?t.slice(14):t;if(Yd(r))return lT.warn("\u62D2\u7EDD\u4FEE\u6539\u5185\u7F6E\u8868\u683C\u6A21\u677F"),null;let n=ss(r);if(!n)return null;let s=gn({...n,...e,id:r});return s?.success?{id:s.template.id,...s.template,_rawId:s.template.id}:null},deletePreset(t){if(!t)return!1;let e=t.startsWith("builtin_table_")?t.slice(14):t;return!!qd(e)?.success},duplicatePreset(t,e={}){let r=this.getPreset(t);if(!r)return null;let n=e.nameSuffix||" \u526F\u672C";return this.createPreset({name:`${r.name}${n}`,description:r.description,promptTemplate:r.promptTemplate,tables:r.tables})},renamePreset(t,e){if(!t||!e)return null;let r=t.startsWith("builtin_table_")?t.slice(14):t,n=ig(r,e);return n?.success?this.getPreset(n.template?.id||r):null},exportAll(){return Hi()},importPresets(t){let e=lg(t,{overwrite:!1});return{added:e?.imported||0,skipped:e?.skipped||0}},resetAll(){let t=is();for(let e of t)try{qd(e.id)}catch{}}};mg=en({id:"tableTemplatePanel",kind:"table",panelTitle:"\u8868\u683C\u6A21\u677F",panelHint:"\u7BA1\u7406\u586B\u8868\u5DE5\u4F5C\u53F0\u7684\u8868\u683C\u7ED3\u6784\u6A21\u677F\u3002\u5728\u586B\u8868\u9762\u677F\u9876\u90E8\u5DE5\u5177\u680F\u53EF\u5FEB\u901F\u52A0\u8F7D/\u4FDD\u5B58\u5F53\u524D\u6A21\u677F\u3002",store:cT,renderEditor:dT,renderListItemMeta:uT}),pT=mg});var xg={};he(xg,{ToolManagePanel:()=>bg,default:()=>yT});var Vt,bg,yT,wg=O(()=>{pt();Z();Qo();Ar();Vt=$.createScope("ToolManagePanel"),bg={id:"toolManagePanel",_removeDialog(t){if(!t?.length)return;let e=t.find("#yyt-tool-dialog-overlay");jt(e,"yytToolManageDialogSelect"),e.remove()},_getToolkitWindow(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window},_openToolConfig(t){if(!t)return;let r=this._getToolkitWindow()?.YouYouToolkit||window.YouYouToolkit;if(!r){Vt.warn("\u672A\u627E\u5230\u5DE5\u5177\u7BB1\u5B9E\u4F8B\uFF0C\u65E0\u6CD5\u8DF3\u8F6C\u5230\u5DE5\u5177\u914D\u7F6E",null,{toast:!0});return}r.switchMainTab("tools"),r.switchSubTab("tools",t)},render(t){let e=Tr(),r=Object.entries(e),n=r.filter(([,s])=>s?.enabled!==!1).length;return`
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
              <div class="yyt-stat-value" style="color: var(--yyt-success);">${n}</div>
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
    `},_renderToolList(t){let e=Object.entries(t);return e.length?`<div class="yyt-list-table">${e.map(([n,s])=>`
      <div class="yyt-list-row ${s.enabled?"yyt-tool-item-enabled":"yyt-tool-item-disabled"}" data-tool-id="${n}">
        <div class="yyt-list-row-icon" style="background: var(--yyt-accent-soft); color: var(--yyt-accent);">
          <i class="fa-solid fa-wrench"></i>
        </div>
        <div class="yyt-list-row-main">
          <div class="yyt-list-row-name">
            ${be(s.name)}
            <span class="yyt-badge" style="background: var(--yyt-accent-soft); color: var(--yyt-accent); margin-left: 6px;">${be(s.category)}</span>
          </div>
          <div class="yyt-list-row-desc">${be(s.description)}</div>
        </div>
        <span class="yyt-status-dot ${s.enabled?"yyt-status-dot-on":"yyt-status-dot-off"}"></span>
        <label class="yyt-toggle yyt-small yyt-tool-toggle">
          <input type="checkbox" ${s.enabled?"checked":""}>
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
      `},bindEvents(t,e){let r=ue();!r||!Ke(t)||(t.off(".yytToolManage"),this._bindToolEvents(t,r),this._bindFileEvents(t,r))},_bindToolEvents(t,e){t.on("change.yytToolManage",".yyt-tool-toggle input",r=>{let n=e(r.currentTarget).closest(".yyt-list-row"),s=n.data("tool-id"),o=e(r.currentTarget).is(":checked");vi(s,o),n.toggleClass("yyt-tool-item-enabled",o).toggleClass("yyt-tool-item-disabled",!o),n.find(".yyt-status-dot").toggleClass("yyt-status-dot-on",o).toggleClass("yyt-status-dot-off",!o),Vt.info(o?"\u5DE5\u5177\u5DF2\u542F\u7528":"\u5DE5\u5177\u5DF2\u7981\u7528",null,{toast:!0})}),t.on("click.yytToolManage","#yyt-add-tool",()=>{this._showToolEditDialog(t,e,null)}),t.on("click.yytToolManage",'.yyt-list-row [data-action="config"]',r=>{let n=e(r.currentTarget).closest(".yyt-list-row").data("tool-id");this._openToolConfig(n)}),t.on("click.yytToolManage",'.yyt-list-row [data-action="edit"]',r=>{let n=e(r.currentTarget).closest(".yyt-list-row").data("tool-id");this._showToolEditDialog(t,e,n)}),t.on("click.yytToolManage",'.yyt-list-row [data-action="delete"]',async r=>{let n=e(r.currentTarget).closest(".yyt-list-row").data("tool-id"),s=_r(n);if(!n||!s||!await Lr("\u5220\u9664\u5DE5\u5177",`\u786E\u5B9A\u8981\u5220\u9664\u5DE5\u5177"${s.name}"\u5417\uFF1F`,{danger:!0}))return;if(!Ls(n)){Vt.error("\u5220\u9664\u5931\u8D25",null,{toast:!0});return}this.renderTo(t),Vt.info("\u5DE5\u5177\u5DF2\u5220\u9664",null,{toast:"success"})})},_bindFileEvents(t,e){t.on("click.yytToolManage","#yyt-import-tools",()=>{t.find("#yyt-import-tools-file").click()}),t.on("change.yytToolManage","#yyt-import-tools-file",async r=>{let n=r.target.files[0];if(n){try{let s=await Lo(n),o=Ds(s,{overwrite:!1});o.success?Vt.info(o.message,null,{toast:"success"}):Vt.error(o.message,null,{toast:!0}),o.success&&this.renderTo(t)}catch(s){Vt.error(`\u5BFC\u5165\u5931\u8D25: ${s.message}`,null,{toast:!0})}e(r.target).val("")}}),t.on("click.yytToolManage","#yyt-export-tools",()=>{try{let r=Os();$o(r,`youyou_toolkit_tools_${Date.now()}.json`),Vt.info("\u5DE5\u5177\u5DF2\u5BFC\u51FA",null,{toast:"success"})}catch(r){Vt.error(`\u5BFC\u51FA\u5931\u8D25: ${r.message}`,null,{toast:!0})}}),t.on("click.yytToolManage","#yyt-reset-tools",async()=>{await Lr("\u91CD\u7F6E\u5DE5\u5177","\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u5DE5\u5177\u5417\uFF1F",{danger:!0})&&(Bs(),this.renderTo(t),Vt.info("\u5DE5\u5177\u5DF2\u91CD\u7F6E",null,{toast:!0}))})},_showToolEditDialog(t,e,r){let n=r?_r(r):null,s=!!n,o=`
      <div class="yyt-dialog-overlay" id="yyt-tool-dialog-overlay">
        <div class="yyt-dialog yyt-dialog-wide">
          <div class="yyt-dialog-header">
            <span class="yyt-dialog-title">${s?"\u7F16\u8F91\u5DE5\u5177":"\u65B0\u5EFA\u5DE5\u5177"}</span>
            <button class="yyt-dialog-close" id="yyt-tool-dialog-close">
              <i class="fa-solid fa-times"></i>
            </button>
          </div>
          <div class="yyt-dialog-body">
            <div class="yyt-form-row">
              <div class="yyt-form-group yyt-flex-1">
                <label>\u5DE5\u5177\u540D\u79F0</label>
                <input type="text" class="yyt-input" id="yyt-tool-name"
                       value="${n?be(n.name):""}" placeholder="\u5DE5\u5177\u540D\u79F0">
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
                     value="${n?be(n.description||""):""}" placeholder="\u5DE5\u5177\u63CF\u8FF0">
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
    `;this._removeDialog(t),t.append(o);let a=t.find("#yyt-tool-dialog-overlay"),i=a.find("#yyt-tool-name"),l=a.find("#yyt-tool-category"),d=a.find("#yyt-tool-desc"),c=a.find("#yyt-tool-timeout"),u=a.find("#yyt-tool-retries");xr(a,{namespace:"yytToolManageDialogSelect",selectors:["#yyt-tool-category"]});let y=()=>{jt(a,"yytToolManageDialogSelect"),a.remove()};a.find("#yyt-tool-dialog-close, #yyt-tool-dialog-cancel").on("click",y),a.on("click",function(p){p.target===this&&y()}),a.find("#yyt-tool-dialog-save").on("click",()=>{let p=i.val().trim(),m=l.val(),g=d.val().trim(),h=parseInt(c.val())||6e4,b=parseInt(u.val())||3;if(!p){Vt.warn("\u8BF7\u8F93\u5165\u5DE5\u5177\u540D\u79F0",null,{toast:!0}),i.trigger("focus").trigger("select");return}let v=r||`tool_${Date.now()}`;if(!$s(v,{name:p,category:m,description:g,promptTemplate:n?.promptTemplate||"",extractTags:Array.isArray(n?.extractTags)?n.extractTags:[],config:{execution:{timeout:h,retries:b},api:n?.config?.api||{preset:"",useBypass:!1,bypassPreset:""},messages:Array.isArray(n?.config?.messages)?n.config.messages:[],context:{depth:n?.config?.context?.depth||3,includeTags:Array.isArray(n?.config?.context?.includeTags)?n.config.context.includeTags:[],excludeTags:Array.isArray(n?.config?.context?.excludeTags)?n.config.context.excludeTags:[]},worldbooks:{enabled:n?.config?.worldbooks?.enabled===!0,selected:Array.isArray(n?.config?.worldbooks?.selected)?n.config.worldbooks.selected:[]}},enabled:n?.enabled!==!1})){Vt.error(s?"\u5DE5\u5177\u66F4\u65B0\u5931\u8D25":"\u5DE5\u5177\u521B\u5EFA\u5931\u8D25",null,{toast:!0});return}Ks(v),y(),this.renderTo(t),Vt.info(s?"\u5DE5\u5177\u5DF2\u66F4\u65B0":"\u5DE5\u5177\u5DF2\u521B\u5EFA",null,{toast:"success"}),s||this._openToolConfig(v)})},destroy(t){!ue()||!Ke(t)||(this._removeDialog(t),t.off(".yytToolManage"))},getStyles(){return`
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
    `},renderTo(t){let e=this.render({});t.html(e),this.bindEvents(t,{})}},yT=bg});var Sg={};he(Sg,{BypassManager:()=>Gi,DEFAULT_BYPASS_PRESETS:()=>qr,addMessage:()=>kT,buildBypassMessages:()=>NT,bypassManager:()=>ve,createPreset:()=>vT,default:()=>$T,deleteMessage:()=>RT,deletePreset:()=>TT,duplicatePreset:()=>_T,exportPresets:()=>MT,getAllPresets:()=>xT,getDefaultPresetId:()=>ET,getEnabledMessages:()=>CT,getPreset:()=>wT,getPresetList:()=>ya,importPresets:()=>PT,setDefaultPresetId:()=>AT,updateMessage:()=>IT,updatePreset:()=>ST});function vg(t){let e=String(t||"").trim().toLowerCase();return e==="system"?"SYSTEM":e==="assistant"||e==="ai"?"assistant":"USER"}function gT(t){return t&&typeof t=="object"&&typeof t.content=="string"&&!t.name&&!Array.isArray(t.messages)}function hT(t){return String(t||"").replace(/\$0/g,"{{toolContentMacro}}").replace(/\$1/g,"{{rawRecentMessagesText}}").replace(/\$4/g,"{{toolWorldbookContent}}").replace(/\$8/g,"{{userMessage}}").replace(/\$C/g,"{{characterCard}}")}function bT(t,e,r){let n=t.mainSlot||(t.isMain?"A":t.isMain2?"B":"");return{id:typeof t.id=="string"&&t.id.trim()?t.id.trim():`${r}_msg_${e+1}`,role:vg(t.role),content:hT(t.content),enabled:t.enabled!==!1,deletable:t.deletable!==!1,...n?{mainSlot:n,isMain:n==="A",isMain2:n==="B"}:{}}}var qi,Hr,no,Vd,fT,qr,mT,Gi,ve,xT,ya,wT,vT,ST,TT,_T,ET,AT,CT,kT,IT,RT,MT,PT,NT,$T,so=O(()=>{Je();nt();Z();qi=$.createScope("BypassManager"),Hr="bypass_presets",no="default_bypass_preset",Vd="current_bypass_preset",fT=Object.freeze([{id:"table_fill_default_msg_1",role:"SYSTEM",content:"\u4F60\u662F\u4E00\u4E2A\u52A9\u624B\uFF0C\u8D1F\u8D23\u542C\u4ECE\u7528\u6237\u7684\u6307\u4EE4\u5B8C\u6210\u4F60\u7684\u5DE5\u4F5C",enabled:!0,deletable:!0},{id:"table_fill_default_msg_2",role:"assistant",content:"\u6536\u5230\uFF0C\u6211\u5C06\u5145\u5206\u63CF\u7ED8\u7528\u6237\u7684\u610F\u5FD7\uFF0C\u6BEB\u4E0D\u5077\u61D2\uFF0C\u5E76\u4E14\u6211\u4E00\u5B9A\u4F1A\u9075\u7167\u7528\u6237\u7684\u8981\u6C42",enabled:!0,deletable:!0},{id:"table_fill_default_msg_3",role:"USER",content:`\u4EE5\u4E0B\u662F\u4F60\u53EF\u80FD\u9700\u8981\u7528\u5230\u7684\u80CC\u666F\u8BBE\u5B9A\uFF0C\u6CE8\u610F\u4F60\u53EA\u9700\u8981\u5176\u4E2D\u5173\u4E8E\u5267\u60C5\u4EE5\u53CA\u4EBA\u8BBE\u65B9\u9762\u7684\u6570\u636E\uFF0C\u4E0D\u9700\u8981\u601D\u8003\u91CC\u8FB9\u9664\u6B64\u4E4B\u5916\u7684\u4EFB\u4F55\u683C\u5F0F\u6216\u8005\u601D\u7EF4\u94FE\u65B9\u9762\u7684\u8981\u6C42\uFF1A
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

{{userMessage}}`,enabled:!0,deletable:!1,mainSlot:"B",isMain2:!0},{id:"table_fill_default_msg_8",role:"assistant",content:"\u6536\u5230\u6307\u4EE4\uFF0C\u6211\u5C06\u4E00\u6B65\u4E00\u6B65\u5F00\u59CB\u601D\u8003\uFF0C\u5E76\u5B8C\u6210\u586B\u8868\uFF0C\u9996\u5148\u6211\u8981\u5206\u6790\u5F53\u524D\u8F6E\u6B21\u7684\u5267\u60C5\u53D8\u5316\u3002",enabled:!0,deletable:!0}]),qr={table_workbench_fill_default:{id:"table_workbench_fill_default",name:"\u9ED8\u8BA4\u586B\u8868 Ai \u6307\u4EE4\u9884\u8BBE",description:"\u7528\u4E8E\u586B\u8868\u5DE5\u4F5C\u53F0\u7684\u5185\u7F6E Ai \u6307\u4EE4\u9884\u8BBE\uFF0C\u53EF\u590D\u5236\u540E\u6309\u9700\u7F16\u8F91\u3002",enabled:!0,messages:fT.map(t=>({...t})),createdAt:0,updatedAt:0}},mT=new Set(["\u6807\u51C6\u7834\u9650\u8BCD","\u589E\u5F3A\u7834\u9650"]);Gi=class{constructor(){this._cache=null,this._migrated=!1,this.debugMode=!1}getAllPresets(){if(this._migrateLegacyData(),this._cache)return this._cache;let e=j.get(Hr,{});return this._cache={...qr,...e},this._cache}getPresetList(){let e=this.getAllPresets();return Object.values(e).sort((r,n)=>(n.updatedAt||0)-(r.updatedAt||0))}getPreset(e){return e&&this.getAllPresets()[e]||null}presetExists(e){return!!this.getPreset(e)}createPreset(e){let{id:r,name:n,description:s,messages:o}=e;if(!r||typeof r!="string"||!r.trim())return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};if(!n||typeof n!="string"||!n.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let a=r.trim();if(this.presetExists(a))return{success:!1,message:`\u9884\u8BBE "${a}" \u5DF2\u5B58\u5728`};let i={id:a,name:n.trim(),description:s||"",enabled:!0,messages:o||[],createdAt:Date.now(),updatedAt:Date.now()};return this._savePreset(a,i),q.emit(G.BYPASS_PRESET_CREATED,{presetId:a,preset:i}),qi.info(`\u9884\u8BBE\u5DF2\u521B\u5EFA: ${a}`),{success:!0,message:`\u9884\u8BBE "${n}" \u521B\u5EFA\u6210\u529F`,preset:i}}updatePreset(e,r){if(!e)return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};let n=this.getPreset(e);if(!n)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};if(r.id&&r.id!==e)return{success:!1,message:"\u4E0D\u5141\u8BB8\u4FEE\u6539\u9884\u8BBEID"};let s={...n,...r,id:e,updatedAt:Date.now()};return this._savePreset(e,s),q.emit(G.BYPASS_PRESET_UPDATED,{presetId:e,preset:s}),qi.info(`\u9884\u8BBE\u5DF2\u66F4\u65B0: ${e}`),{success:!0,message:`\u9884\u8BBE "${n.name}" \u66F4\u65B0\u6210\u529F`,preset:s}}deletePreset(e){if(!e)return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};if(qr[e])return{success:!1,message:"\u4E0D\u5141\u8BB8\u5220\u9664\u9ED8\u8BA4\u9884\u8BBE"};let r=this.getPreset(e);if(!r)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let n=j.get(Hr,{});return delete n[e],j.set(Hr,n),this._cache=null,this.getDefaultPresetId()===e&&this.setDefaultPresetId(null),q.emit(G.BYPASS_PRESET_DELETED,{presetId:e}),qi.info(`\u9884\u8BBE\u5DF2\u5220\u9664: ${e}`),{success:!0,message:`\u9884\u8BBE "${r.name}" \u5DF2\u5220\u9664`}}duplicatePreset(e,r,n){let s=this.getPreset(e);if(!s)return{success:!1,message:`\u6E90\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};if((!r||!r.trim())&&(r=`${e}_copy_${Date.now()}`),this.presetExists(r))return{success:!1,message:`\u9884\u8BBE "${r}" \u5DF2\u5B58\u5728`};let o={...JSON.parse(JSON.stringify(s)),id:r.trim(),name:n||`${s.name} (\u526F\u672C)`,createdAt:Date.now(),updatedAt:Date.now()};return this._savePreset(r.trim(),o),q.emit(G.BYPASS_PRESET_CREATED,{presetId:r,preset:o}),{success:!0,message:`\u9884\u8BBE\u5DF2\u590D\u5236\u4E3A "${o.name}"`,preset:o}}addMessage(e,r){let n=this.getPreset(e);if(!n)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let s={id:`msg_${Date.now()}`,role:vg(r.role||"SYSTEM"),content:r.content||"",enabled:r.enabled!==!1,deletable:r.deletable!==!1,...r.mainSlot?{mainSlot:r.mainSlot}:{}},o=[...n.messages||[],s];return this.updatePreset(e,{messages:o})}updateMessage(e,r,n){let s=this.getPreset(e);if(!s)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let o=s.messages||[],a=o.findIndex(l=>l.id===r);if(a===-1)return{success:!1,message:`\u6D88\u606F "${r}" \u4E0D\u5B58\u5728`};let i=[...o];return i[a]={...i[a],...n},this.updatePreset(e,{messages:i})}deleteMessage(e,r){let n=this.getPreset(e);if(!n)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let s=n.messages||[],o=s.find(i=>i.id===r);if(!o)return{success:!1,message:`\u6D88\u606F "${r}" \u4E0D\u5B58\u5728`};if(o.deletable===!1)return{success:!1,message:"\u8BE5\u6D88\u606F\u4E0D\u53EF\u5220\u9664"};let a=s.filter(i=>i.id!==r);return this.updatePreset(e,{messages:a})}getEnabledMessages(e){let r=this.getPreset(e);return!r||!r.enabled?[]:(r.messages||[]).filter(n=>n.enabled!==!1)}getDefaultPresetId(){this._migrateLegacyData();let e=j.get(no,null);return e==="undefined"||e==="null"||e===""?(j.remove(no),null):e}setDefaultPresetId(e){return e&&!this.presetExists(e)?!1:(j.set(no,e),q.emit(G.BYPASS_PRESET_ACTIVATED,{presetId:e}),qi.info(`\u9ED8\u8BA4\u9884\u8BBE\u5DF2\u8BBE\u7F6E: ${e}`),!0)}getDefaultPreset(){let e=this.getDefaultPresetId();return e?this.getPreset(e):null}exportPresets(e=null){if(e){let n=this.getPreset(e);if(!n)throw new Error(`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`);return JSON.stringify(n,null,2)}let r=this.getAllPresets();return JSON.stringify({version:"1.0.0",exportedAt:new Date().toISOString(),presets:Object.values(r)},null,2)}importPresets(e,r={}){let{overwrite:n=!1,name:s=""}=r,o;try{o=JSON.parse(e)}catch{return{success:!1,message:"JSON\u89E3\u6790\u5931\u8D25",imported:0}}let a=j.get(Hr,{}),l=Array.isArray(o)&&o.every(gT)?[{id:this._generatePresetId(s||"\u5BFC\u5165\u586B\u8868\u6307\u4EE4\u9884\u8BBE",a),name:s||"\u5BFC\u5165\u586B\u8868\u6307\u4EE4\u9884\u8BBE",description:"\u7531\u5916\u90E8\u586B\u8868\u63D0\u793A\u8BCD\u7EC4\u5BFC\u5165\u3002",enabled:!0,messages:o}]:Array.isArray(o)?o:o.presets?o.presets:[o];if(l.length===0)return{success:!1,message:"\u6CA1\u6709\u627E\u5230\u6709\u6548\u7684\u9884\u8BBE\u6570\u636E",imported:0};let d=0;for(let c of l){let u=this._normalizePreset(c?.id,c,a);u&&(qr[u.id]&&!n||!n&&a[u.id]||(a[u.id]={...u,updatedAt:Date.now()},d++))}return d>0&&(j.set(Hr,a),this._cache=null),{success:!0,message:`\u6210\u529F\u5BFC\u5165 ${d} \u4E2A\u9884\u8BBE`,imported:d}}getToolBypassPreset(e){if(!e?.bypass?.enabled)return null;let r=e?.bypass?.presetId;return r?this.getPreset(r):this.getDefaultPreset()}buildBypassMessages(e){let r=this.getToolBypassPreset(e);return r?this.getEnabledMessages(r.id):[]}_savePreset(e,r){let n=j.get(Hr,{});n[e]=r,j.set(Hr,n),this._cache=null}_migrateLegacyData(){if(this._migrated)return;let e=j.get(Hr,{}),r={},n=!1,s=Array.isArray(e)?e.map((o,a)=>[o?.id||o?.name||`legacy_${a}`,o]):Object.entries(e||{});for(let[o,a]of s){let i=this._normalizePreset(o,a,r);if(!i){n=!0;continue}r[i.id]=i,(!e?.[i.id]||e?.[i.id]?.id!==i.id)&&(n=!0)}n&&j.set(Hr,r),this._migrateDefaultPreset(r),this._cache=null,this._migrated=!0}_normalizePreset(e,r,n={}){if(!r||typeof r!="object")return null;let s=typeof r.name=="string"?r.name.trim():"",o=typeof r.id=="string"?r.id.trim():"",a=typeof e=="string"?e.trim():"";if(!s&&a&&a!=="undefined"&&a!=="null"&&(s=a),this._isLegacySamplePreset(s,o)||(!o&&a&&a!=="undefined"&&a!=="null"&&(o=a),!o&&s&&s!=="undefined"&&s!=="null"&&(o=this._generatePresetId(s,n)),!s||!o||o==="undefined"||s==="undefined"))return null;let l=Array.isArray(r.messages)?r.messages.filter(d=>d&&typeof d=="object").map((d,c)=>bT(d,c,o)):[];return{...r,id:o,name:s,description:typeof r.description=="string"?r.description:"",enabled:r.enabled!==!1,messages:l,createdAt:r.createdAt||Date.now(),updatedAt:r.updatedAt||Date.now()}}_migrateDefaultPreset(e){let r=j.get(no,null),n=j.get(Vd,null),s=r??n;(s==="undefined"||s==="null"||s==="")&&(s=null),s&&!e[s]&&(s=Object.values(e).find(a=>a.name===s)?.id||null),s?j.set(no,s):j.remove(no),j.has(Vd)&&j.remove(Vd)}_isLegacySamplePreset(e,r=""){return e?r==="standard"||r==="enhanced"||r==="jailbreak"||mT.has(e)?!0:/^增强破限（副本）(?:\s*\(\d+\))?$/.test(e):!1}_generatePresetId(e,r={}){let n=String(e).trim().toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g,"_").replace(/^_+|_+$/g,"")||`bypass_${Date.now()}`,s=n,o=1;for(;r[s];)s=`${n}_${o++}`;return s}},ve=new Gi,xT=()=>ve.getAllPresets(),ya=()=>ve.getPresetList(),wT=t=>ve.getPreset(t),vT=t=>ve.createPreset(t),ST=(t,e)=>ve.updatePreset(t,e),TT=t=>ve.deletePreset(t),_T=(t,e,r)=>ve.duplicatePreset(t,e,r),ET=()=>ve.getDefaultPresetId(),AT=t=>ve.setDefaultPresetId(t),CT=t=>ve.getEnabledMessages(t),kT=(t,e)=>ve.addMessage(t,e),IT=(t,e,r)=>ve.updateMessage(t,e,r),RT=(t,e)=>ve.deleteMessage(t,e),MT=t=>ve.exportPresets(t),PT=(t,e)=>ve.importPresets(t,e),NT=t=>ve.buildBypassMessages(t),$T=ve});var Tg={};he(Tg,{DEFAULT_SETTINGS:()=>fa,SettingsService:()=>Vi,default:()=>LT,settingsService:()=>Tt});var fa,Yi,Vi,Tt,LT,oo=O(()=>{Je();nt();fa={executor:{maxConcurrent:3,maxRetries:2,retryDelayMs:5e3,requestTimeoutMs:9e4,queueStrategy:"fifo"},automation:{settleMs:1200,cooldownMs:5e3,maxConcurrentSlots:1},debug:{enableDebugLog:!1,saveExecutionHistory:!0,showRuntimeBadge:!0},ui:{compactMode:!1,animationEnabled:!0,theme:"dark-blue",startupScreenDismissed:!1}},Yi="settings_v2",Vi=class{constructor(){this._cache=null}getSettings(){if(this._cache)return this._cache;let e=j.get(Yi,{}),r=this._migrateLegacy(e);return this._cache=this._mergeWithDefaults(r.settings),r.changed&&j.set(Yi,this._cache),this._cache}saveSettings(e){this._cache=this._mergeWithDefaults(e),j.set(Yi,this._cache),q.emit(G.SETTINGS_UPDATED,{settings:this._cache})}updateSettings(e){let r=this.getSettings(),n=this._deepMerge(r,e);this.saveSettings(n)}getExecutorSettings(){return this.getSettings().executor}updateExecutorSettings(e){this.updateSettings({executor:e})}getAutomationSettings(){return this.getSettings().automation}updateAutomationSettings(e){this.updateSettings({automation:e})}getDebugSettings(){return this.getSettings().debug}updateDebugSettings(e){this.updateSettings({debug:e})}getUiSettings(){return this.getSettings().ui}updateUiSettings(e){this.updateSettings({ui:e})}resetSettings(){this._cache=JSON.parse(JSON.stringify(fa)),j.set(Yi,this._cache),q.emit(G.SETTINGS_UPDATED,{settings:this._cache,reset:!0})}get(e,r=null){let n=this.getSettings(),s=e.split("."),o=n;for(let a of s)if(o&&typeof o=="object"&&a in o)o=o[a];else return r;return o}set(e,r){let n=JSON.parse(JSON.stringify(this.getSettings())),s=e.split("."),o=n;for(let a=0;a<s.length-1;a+=1){let i=s[a];i in o||(o[i]={}),o=o[i]}o[s[s.length-1]]=r,this.saveSettings(n)}_migrateLegacy(e){if(!e||typeof e!="object")return{settings:{},changed:!1};let r=!1,n=JSON.parse(JSON.stringify(e));return n.automation&&Object.prototype.hasOwnProperty.call(n.automation,"enabled")&&(delete n.automation.enabled,r=!0),{settings:n,changed:r}}_mergeWithDefaults(e){return this._deepMerge(JSON.parse(JSON.stringify(fa)),e)}_deepMerge(e,r){let n={...e};for(let s in r)r[s]&&typeof r[s]=="object"&&!Array.isArray(r[s])?n[s]=this._deepMerge(e[s]||{},r[s]):n[s]=r[s];return n}},Tt=new Vi,LT=Tt});var Eg={};he(Eg,{ContextInjector:()=>Xi,DEFAULT_INJECTION_OPTIONS:()=>_g,WRITEBACK_METHODS:()=>yr,WRITEBACK_RESULT_STATUS:()=>Qi,contextInjector:()=>Jt,default:()=>BT});function Jd(t){return typeof t=="number"&&Number.isFinite(t)?String(t):typeof t=="string"&&t.trim()?t.trim():""}function ls(t,e){let r=String(e||"").trim();return r?Array.isArray(t)?(t.includes(r)||t.push(r),t):[r]:t}function Ji(t={}){if(t?.signal?.aborted)return"\u5DE5\u5177\u7ED3\u679C\u5DF2\u53D6\u6D88\uFF0C\u8DF3\u8FC7\u5199\u56DE";if(typeof t?.shouldAbortWriteback=="function")try{if(t.shouldAbortWriteback()===!0)return"\u5DE5\u5177\u7ED3\u679C\u5DF2\u8FC7\u671F\uFF0C\u8DF3\u8FC7\u5199\u56DE"}catch{return"\u5DE5\u5177\u7ED3\u679C\u5DF2\u8FC7\u671F\uFF0C\u8DF3\u8FC7\u5199\u56DE"}return""}var _t,Bt,ao,_g,Qi,yr,OT,DT,Xi,Jt,BT,cs=O(()=>{nt();Z();Or();_t=$.createScope("ContextInjector"),Bt="YouYouToolkit_toolOutputs",ao="YouYouToolkit_injectedContext",_g={overwrite:!0,enabled:!0};Qi={SUCCESS:"success",FAILED:"failed"},yr={NONE:"none",LOCAL_ONLY:"local_only",SET_CHAT_MESSAGES:"setChatMessages",SET_CHAT_MESSAGE:"setChatMessage"},OT=60,DT=3;Xi=class{constructor(){this.debugMode=!1}async inject(e,r,n={}){return(await this.injectDetailed(e,r,n)).success}async injectDetailed(e,r,n={}){let s={..._g,...n},o=this._createWritebackResult(e,s);if(!e||r===void 0||r===null)return _t.error("\u6CE8\u5165\u5931\u8D25: \u53C2\u6570\u65E0\u6548"),o.error="\u6CE8\u5165\u5931\u8D25: \u53C2\u6570\u65E0\u6548",o;if(!Jd(s.sourceMessageId))return _t.error("\u6CE8\u5165\u5931\u8D25: \u7F3A\u5C11 sourceMessageId"),o.error="\u6CE8\u5165\u5931\u8D25: \u7F3A\u5C11 sourceMessageId",o;if(s?.signal?.aborted)return o.error="\u5DE5\u5177\u7ED3\u679C\u5DF2\u53D6\u6D88\uFF0C\u8DF3\u8FC7\u5199\u56DE",o;if(typeof s?.shouldAbortWriteback=="function")try{if(s.shouldAbortWriteback()===!0)return o.error="\u5DE5\u5177\u7ED3\u679C\u5DF2\u8FC7\u671F\uFF0C\u8DF3\u8FC7\u5199\u56DE",o}catch{return o.error="\u5DE5\u5177\u7ED3\u679C\u5DF2\u8FC7\u671F\uFF0C\u8DF3\u8FC7\u5199\u56DE",o}let a=o.chatId,i={toolId:e,content:String(r),updatedAt:Date.now(),sourceMessageId:s.sourceMessageId||null,sourceSwipeId:s.sourceSwipeId||s.effectiveSwipeId||null,options:s};q.emit(G.TOOL_CONTEXT_INJECTED,{toolId:e,chatId:a,content:i.content,sourceMessageId:i.sourceMessageId,sourceSwipeId:i.sourceSwipeId,effectiveSwipeId:i.sourceSwipeId,slotBindingKey:s.slotBindingKey||"",slotRevisionKey:s.slotRevisionKey||"",slotTransactionId:s.slotTransactionId||"",traceId:s.traceId||"",sessionKey:s.sessionKey||"",options:s});let l=await this._insertToolOutputToBoundAssistantSlot(e,i,s,o);return l.success&&_t.info(`\u6CE8\u5165\u6210\u529F: ${e} -> ${a}`,{inserted:l}),l}getAggregatedContext(e){return this.getLatestMessageInjectedContext()}getLatestMessageInjectedContext(e=null){try{let{chat:r}=this._getChatRuntime(),n=this._findAssistantMessageIndex(r,e);if(n<0)return"";let s=r[n]||{},o=s[ao];if(typeof o=="string"&&o.trim())return o.trim();let a=s[Bt];return a&&typeof a=="object"?this._buildMessageInjectedContext(a).trim():""}catch(r){return _t.warn("\u8BFB\u53D6\u6700\u65B0 AI \u6D88\u606F injectedContext \u5931\u8D25",{error:r}),""}}_getLatestAssistantMessageOutputs(){try{let{chat:e}=this._getChatRuntime(),r=this._findAssistantMessageIndex(e,null);if(r<0)return{};let s=(e[r]||{})[Bt];return s&&typeof s=="object"?s:{}}catch(e){return _t.warn("\u8BFB\u53D6\u6700\u65B0 AI \u6D88\u606F\u4E0A\u4E0B\u6587\u5931\u8D25",{error:e}),{}}}getToolContext(e,r){if(!r)return null;try{let{chat:n}=this._getChatRuntime(),s=this._findAssistantMessageIndex(n,null);return s<0?null:n[s]?.[Bt]?.[r]||null}catch{return null}}getAllToolContexts(e){return this._getLatestAssistantMessageOutputs()}async clearToolContext(e,r){if(!r)return!1;try{let{api:n,context:s,chat:o}=this._getChatRuntime(),a=this._findAssistantMessageIndex(o,null);if(a<0)return!1;let i=o[a],l=i?.[Bt];if(!l||!l[r])return!1;delete l[r],i[Bt]=l,i[ao]=this._buildMessageInjectedContext(l);let d=s?.saveChat||n?.saveChat||null;return typeof d=="function"&&await d.call(s||n),q.emit(G.TOOL_CONTEXT_CLEARED,{chatId:e||this._getCurrentChatId(),toolId:r}),!0}catch(n){return _t.warn("\u6E05\u9664\u5DE5\u5177\u4E0A\u4E0B\u6587\u5931\u8D25",{error:n}),!1}}async clearAllContext(e){try{let{api:r,context:n,chat:s}=this._getChatRuntime(),o=this._findAssistantMessageIndex(s,null);if(o<0)return!1;let a=s[o];delete a[Bt],delete a[ao];let i=n?.saveChat||r?.saveChat||null;return typeof i=="function"&&await i.call(n||r),q.emit(G.TOOL_CONTEXT_CLEARED,{chatId:e||this._getCurrentChatId(),allTools:!0}),!0}catch(r){return _t.warn("\u6E05\u9664\u6240\u6709\u5DE5\u5177\u4E0A\u4E0B\u6587\u5931\u8D25",{error:r}),!1}}clearAllChatsContexts(){_t.info("\u6E05\u9664\u6240\u6709\u4E0A\u4E0B\u6587")}hasToolContext(e,r){return!!this.getToolContext(e,r)}getContextSummary(e){let r=this._getLatestAssistantMessageOutputs(),n=Object.entries(r).map(([s,o])=>({toolId:s,updatedAt:o.updatedAt,contentLength:o.content?.length||0}));return{chatId:e||this._getCurrentChatId(),tools:n,totalCount:n.length}}exportContext(e){return{chatId:e||this._getCurrentChatId(),contexts:this._getLatestAssistantMessageOutputs(),exportedAt:Date.now()}}importContext(e,r={}){return!1}_getChatRuntime(){try{let e=typeof window.parent<"u"&&window.parent!==window?window.parent:window,r=e.SillyTavern||null,n=r?.getContext?.()||null,s=Array.isArray(n?.chat)?n.chat:[],o=Array.isArray(r?.chat)?r.chat:[],a=s.length?s:o;return{topWindow:e,api:r,context:n,chat:a,contextChat:s,apiChat:o}}catch{return{topWindow:null,api:null,context:null,chat:[],contextChat:[],apiChat:[]}}}_createWritebackResult(e,r={}){let n=yr.SET_CHAT_MESSAGES;return{success:!1,toolId:e,chatId:this._getCurrentChatId(),traceId:r.traceId||"",sessionKey:r.sessionKey||"",sourceMessageId:r.sourceMessageId||null,sourceSwipeId:r.sourceSwipeId||r.effectiveSwipeId||null,effectiveSwipeId:r.effectiveSwipeId||r.sourceSwipeId||null,slotBindingKey:r.slotBindingKey||"",slotRevisionKey:r.slotRevisionKey||"",slotTransactionId:r.slotTransactionId||"",messageIndex:-1,textField:"",blockIdentity:null,hostUpdateMethod:yr.NONE,commit:{preferredMethod:n,attemptedMethods:[],appliedMethod:yr.NONE,fallbackUsed:!1,contentCommitted:!1,hostCommitApplied:!1},refresh:{requestMethods:[],requested:!1,confirmChecks:0,confirmed:!1,confirmedBy:"",eventSource:"",eventName:""},contentCommitted:!1,hostCommitApplied:!1,refreshRequested:!1,refreshConfirmed:!1,writebackStatus:Qi.FAILED,replacedExistingBlock:!1,insertedNewBlock:!1,conflictDetected:!1,conflictReason:"",preservedOtherToolBlocks:!0,error:"",errors:[],steps:{foundTargetMessage:!1,contentCommitted:!1,localTextApplied:!1,runtimeSynced:!1,hostSetChatMessages:!1,hostSetChatMessage:!1,refreshForceSetChatMessage:!1,saveChatDebounced:!1,saveChat:!1,refreshRequested:!1,notifiedMessageUpdated:!1,verifiedAfterWrite:!1,refreshConfirmed:!1},verification:{textIncludesContent:!1,mirrorStored:!1,refreshConfirmed:!1}}}async _wait(e){await new Promise(r=>setTimeout(r,e))}_collectWritebackVerification(e,r,n,s,o,a=null){let i=e?.contextChat?.[n]||e?.apiChat?.[n]||r?.[n]||a||null,l=this._getWritableMessageField(i).text||"",d=i?.[Bt]?.[s],c=o?l.includes(o):!0,u=!!(d&&String(d.content||"").trim()===o);return{latestMessage:i,latestText:l,textIncludesContent:c,mirrorStored:u}}async _confirmRefresh(e,r,n,s,o,a=null){let i=1,l=this._collectWritebackVerification(e,r,n,s,o,a);for(let d=0;d<DT;d+=1){if(l.textIncludesContent&&l.mirrorStored)return{...l,refreshConfirmed:!0,confirmChecks:i,confirmedBy:"text_and_mirror_present"};await this._wait(OT),i+=1,l=this._collectWritebackVerification(e,r,n,s,o,a)}return{...l,refreshConfirmed:l.textIncludesContent&&l.mirrorStored,confirmChecks:i,confirmedBy:l.textIncludesContent&&l.mirrorStored?"text_and_mirror_present":""}}async _requestAssistantMessageRefresh(e,r,n,s={},o=null){let a=o||this._createWritebackResult("",s),{api:i,context:l}=e||{},d=e?.topWindow||(typeof window.parent<"u"&&window.parent!==window?window.parent:window),c=d?.TavernHelper?.setChatMessages||l?.setChatMessages||i?.setChatMessages||d?.setChatMessages||null;a.commit.preferredMethod=typeof c=="function"?yr.SET_CHAT_MESSAGES:yr.LOCAL_ONLY;let u=!1,y=Ji(s);if(y)return a.error=y,a;if(typeof c=="function"){ls(a.commit.attemptedMethods,yr.SET_CHAT_MESSAGES);try{let p=Ji(s);if(p)return a.error=p,a;let m=Jd(s.sourceMessageId)||r;await c([{message_id:m,message:n}],{refresh:"affected"}),a.steps.hostSetChatMessages=!0,a.hostUpdateMethod=yr.SET_CHAT_MESSAGES,a.hostCommitApplied=!0,a.commit.appliedMethod=yr.SET_CHAT_MESSAGES,a.commit.hostCommitApplied=!0,u=!0}catch(p){_t.error("setChatMessages \u5199\u56DE\u5931\u8D25\uFF0C\u56DE\u9000\u672C\u5730\u540C\u6B65",{error:p}),a.errors.push(`setChatMessages: ${p?.message||String(p)}`)}}return u&&(a.refreshRequested=!0,ls(a.refresh.requestMethods,a.hostUpdateMethod)),u||(ls(a.commit.attemptedMethods,yr.LOCAL_ONLY),a.commit.appliedMethod=yr.LOCAL_ONLY,a.commit.fallbackUsed=!0,a.hostUpdateMethod=a.commit.appliedMethod),a}_inferBlockType(e){let r=String(e||"").trim();if(!r)return"empty";let n=r.match(/^<([a-zA-Z0-9_-]+)(?:\s[^>]*)?>[\s\S]*<\/\1>$/);return n?.[1]?n[1]:"plain_text"}_stripExactStoredBlock(e,r,n=""){let s=String(e||""),o=String(r||"").trim(),a=String(n||"").trim();return o?s.includes(o)?a?{text:s.replace(o,a).trimEnd(),removed:!0,replaced:!0}:{text:s.replace(o,"").trimEnd(),removed:!0,replaced:!1}:{text:s,removed:!1,replaced:!1}:{text:s,removed:!1,replaced:!1}}_syncMessageToRuntimeChats(e,r,n){let{contextChat:s,apiChat:o}=e||{},a=i=>{!Array.isArray(i)||r<0||r>=i.length||i[r]!==n&&(i[r]={...i[r]||{},...n})};a(s),a(o)}_notifyMessageUpdated(e,r,n={}){if(n.skipNotify===!0)return{emitted:!1,source:"skipped_by_caller",eventName:""};try{let s=et.describe(),o=e?.topWindow||gi();return s.hasBridge?(et.emit(Pe.MESSAGE_UPDATED,r),typeof o?.requestAnimationFrame=="function"?o.requestAnimationFrame(()=>{et.emit(Pe.MESSAGE_UPDATED,r)}):typeof o?.setTimeout=="function"&&o.setTimeout(()=>{et.emit(Pe.MESSAGE_UPDATED,r)},30),{emitted:!0,source:s.source||"unavailable",eventName:Pe.MESSAGE_UPDATED}):{emitted:!1,source:s.source||"unavailable",eventName:Pe.MESSAGE_UPDATED}}catch(s){return _t.warn("\u89E6\u53D1\u6D88\u606F\u5237\u65B0\u4E8B\u4EF6\u5931\u8D25",{error:s}),{emitted:!1,source:"error",eventName:"",error:s?.message||String(s)}}}_isAssistantMessage(e){if(!e||e.is_user||e.is_system)return!1;let r=String(e.role||"").toLowerCase();return r==="assistant"||r==="ai"||!r}_findAssistantMessageIndex(e,r){let n=Array.isArray(e)?e:[];if(!n.length)return-1;let s=r!=null&&r!=="",o=(a,i)=>{if(!this._isAssistantMessage(a)||r==null||r==="")return!1;let l=String(r).trim();return l?[a.message_id,a.id,a.messageId,a.mes_id,i].map(c=>c==null?"":String(c).trim()).includes(l):!1};for(let a=n.length-1;a>=0;a-=1)if(o(n[a],a))return a;if(s)return-1;for(let a=n.length-1;a>=0;a-=1)if(this._isAssistantMessage(n[a]))return a;return-1}_buildMessageInjectedContext(e){let n=Object.entries(e&&typeof e=="object"?e:{}).filter(([,o])=>o?.blockType!=="full_message").sort(([,o],[,a])=>(o?.updatedAt||0)-(a?.updatedAt||0));if(!n.length)return"";let s=["[\u5DE5\u5177\u4E0A\u4E0B\u6587\u6CE8\u5165]",""];for(let[o,a]of n)s.push(`[${o}]`),s.push(a?.content||""),s.push("");return s.join(`
`)}_getWritableMessageField(e){let r=["mes","message","content","text"];for(let n of r)if(typeof e?.[n]=="string")return{key:n,text:e[n]};return{key:"mes",text:""}}_applyMessageText(e,r,n={}){let s=e&&typeof e=="object"?e:{},o=["mes","message","content","text"],a=!1;if(o.forEach(i=>{typeof s[i]=="string"&&(s[i]=r,a=!0)}),a||(s.mes=r,s.message=r),Array.isArray(s.swipes)){let i=Number.parseInt(Jd(n?.sourceSwipeId||n?.effectiveSwipeId),10),l=Number.isInteger(i)?i:Number.isInteger(s.swipe_id)?s.swipe_id:Number.isInteger(s.swipeId)?s.swipeId:0;l>=0&&l<s.swipes.length&&(s.swipes[l]=r,s.swipe_id=l,s.swipeId=l)}return s}_stripExistingToolOutput(e,r=[]){let n=String(e||"");return(Array.isArray(r)?r:[]).forEach(o=>{let a=String(o||"").trim();if(!a)return;if(a.startsWith("regex:")){try{let c=new RegExp(a.slice(6).trim(),"gis");n=n.replace(c,"")}catch(c){_t.warn("\u79FB\u9664\u65E7\u5DE5\u5177\u8F93\u51FA\u65F6\u6B63\u5219\u65E0\u6548",{value:a,error:c})}return}let i=a.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),l=new RegExp(`<${i}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${i}>\\s*`,"gi"),d=new RegExp(`\\{${i}\\|[\\s\\S]*?\\}\\s*`,"gi");n=n.replace(l,""),n=n.replace(d,"")}),n.trimEnd()}_stripPreviousStoredToolContent(e,r){let n=String(e||""),s=String(r||"").trim();return s?n.replace(s,"").trimEnd():n.trimEnd()}async _insertToolOutputToBoundAssistantSlot(e,r,n={},s=null){let o=s||this._createWritebackResult(e,n);try{let a=this._getChatRuntime(),{context:i,chat:l}=a;if(!Array.isArray(l)||!l.length)return _t.error("\u672A\u627E\u5230\u804A\u5929\u6D88\u606F\uFF0C\u65E0\u6CD5\u63D2\u5165\u5DE5\u5177\u8F93\u51FA"),o.error="\u672A\u627E\u5230\u804A\u5929\u6D88\u606F\uFF0C\u65E0\u6CD5\u63D2\u5165\u5DE5\u5177\u8F93\u51FA",o;let d=this._findAssistantMessageIndex(l,n.sourceMessageId);if(d<0)return _t.error("\u672A\u627E\u5230\u53EF\u5199\u5165\u7684\u6700\u65B0 AI \u56DE\u590D\u6D88\u606F"),o.error="\u672A\u627E\u5230\u53EF\u5199\u5165\u7684\u6700\u65B0 AI \u56DE\u590D\u6D88\u606F",o;if(n?.signal?.aborted)return o.error="\u5DE5\u5177\u7ED3\u679C\u5DF2\u53D6\u6D88\uFF0C\u8DF3\u8FC7\u5199\u56DE",o;if(typeof n?.shouldAbortWriteback=="function")try{if(n.shouldAbortWriteback()===!0)return o.error="\u5DE5\u5177\u7ED3\u679C\u5DF2\u8FC7\u671F\uFF0C\u8DF3\u8FC7\u5199\u56DE",o}catch{return o.error="\u5DE5\u5177\u7ED3\u679C\u5DF2\u8FC7\u671F\uFF0C\u8DF3\u8FC7\u5199\u56DE",o}o.messageIndex=d,o.steps.foundTargetMessage=!0;let c=l[d],{key:u,text:y}=this._getWritableMessageField(c);o.textField=u;let p=c[Bt]&&typeof c[Bt]=="object"?c[Bt]:{},m=p?.[e]||{},g=m?.content||"",h=m?.blockText||g||"",b=Object.entries(p).filter(([L])=>L!==e).map(([,L])=>L||{}),v=String(r.content||"").trim(),x=n.replaceFullMessage===!0,T=x?"full_message":this._inferBlockType(v),E={toolId:e,messageId:n.sourceMessageId||c?.message_id||c?.messageId||d,blockType:T,insertedAt:r.updatedAt,replaceable:n.overwrite!==!1};o.blockIdentity=E;let w=n.overwrite===!1||x?{text:String(y||""),removed:!1,replaced:!1}:this._stripExactStoredBlock(y,h,v),_=w.text,A="";!x&&n.overwrite!==!1&&h&&!w.removed&&(A="previous_block_not_found");let I=n.overwrite===!1||w.replaced||x?_:this._stripExistingToolOutput(_,n.extractionSelectors),P=I!==_;_=I;let C=n.overwrite===!1||w.replaced||x?_:this._stripPreviousStoredToolContent(_,g),N=C!==_;_=C,o.replacedExistingBlock=x||w.removed||P||N;let W=n.overwrite===!1?String(y||""):_,H=x?v:w.replaced?_.trim():[W.trimEnd(),v].filter(Boolean).join(`

`).trim();o.insertedNewBlock=!!v;let ee=b.every(L=>{if(L?.blockType==="full_message")return!0;let ne=String(L?.blockText||L?.content||"").trim();return ne?H.includes(ne):!0});o.preservedOtherToolBlocks=ee,ee?A&&(o.conflictDetected=!0,o.conflictReason=A):(o.conflictDetected=!0,o.conflictReason="other_tool_block_removed");let te={...p,[e]:{toolId:e,content:v,blockText:v,blockType:T,blockIdentity:E,updatedAt:r.updatedAt,sourceMessageId:r.sourceMessageId||null}},z=Ji(n);if(z)return o.error=z,o;c[u]=H,this._applyMessageText(c,H,n),c[Bt]=te,c[ao]=this._buildMessageInjectedContext(te),o.contentCommitted=!0,o.commit.contentCommitted=!0,o.steps.contentCommitted=!0,o.steps.localTextApplied=!0,this._syncMessageToRuntimeChats(a,d,c),o.steps.runtimeSynced=!0;let J=Ji(n);if(J)return o.error=J,o;await this._requestAssistantMessageRefresh(a,d,H,n,o);let de=i?.saveChat||a?.api?.saveChat||null,Q=i?.saveChatDebounced||a?.api?.saveChatDebounced||null;typeof Q=="function"&&(Q.call(i||api),o.steps.saveChatDebounced=!0,o.refreshRequested=!0,ls(o.refresh.requestMethods,"saveChatDebounced")),typeof de=="function"&&(await de.call(i||api),o.steps.saveChat=!0,o.refreshRequested=!0,ls(o.refresh.requestMethods,"saveChat"));let He=this._notifyMessageUpdated(a,d,n);o.steps.notifiedMessageUpdated=He?.emitted===!0,o.refresh.eventSource=He?.source||"",o.refresh.eventName=He?.eventName||"",He?.error&&o.errors.push(`MESSAGE_UPDATED: ${He.error}`);let Ce=String(r.content||"").trim();(o.steps.hostSetChatMessages||o.steps.hostSetChatMessage)&&(o.refreshRequested=!0,ls(o.refresh.requestMethods,o.hostUpdateMethod)),o.steps.notifiedMessageUpdated&&(o.refreshRequested=!0,ls(o.refresh.requestMethods,`MESSAGE_UPDATED:${o.refresh.eventName||"MESSAGE_UPDATED"}`)),o.steps.refreshRequested=o.refreshRequested,o.refresh.requested=o.refreshRequested;let ze=await this._confirmRefresh(a,l,d,e,Ce,c);return o.verification.textIncludesContent=ze.textIncludesContent,o.verification.mirrorStored=ze.mirrorStored,o.verification.refreshConfirmed=ze.refreshConfirmed,o.steps.verifiedAfterWrite=o.verification.textIncludesContent&&o.verification.mirrorStored,o.refreshConfirmed=o.verification.refreshConfirmed&&o.refreshRequested,o.refresh.confirmChecks=Number(ze.confirmChecks)||0,o.refresh.confirmedBy=ze.confirmedBy||"",o.refresh.confirmed=o.refreshConfirmed,o.steps.refreshConfirmed=o.refreshConfirmed,o.success=o.steps.localTextApplied&&o.steps.runtimeSynced&&o.steps.verifiedAfterWrite&&o.refreshConfirmed,o.writebackStatus=o.success?Qi.SUCCESS:Qi.FAILED,!o.success&&!o.error&&(o.error=o.refreshRequested?"\u5DE5\u5177\u7ED3\u679C\u5DF2\u63D0\u4EA4\uFF0C\u4F46\u5BBF\u4E3B\u5237\u65B0\u786E\u8BA4\u672A\u901A\u8FC7":"\u5DE5\u5177\u7ED3\u679C\u5DF2\u5C1D\u8BD5\u5199\u56DE\uFF0C\u4F46\u6700\u7EC8\u6821\u9A8C\u672A\u901A\u8FC7"),o.conflictDetected&&!o.error&&(o.error=`\u5DE5\u5177\u7ED3\u679C\u5DF2\u5199\u56DE\uFF0C\u4F46\u68C0\u6D4B\u5230\u5757\u51B2\u7A81\uFF1A${o.conflictReason}`),_t.info(`\u5DF2\u5C06\u5DE5\u5177\u8F93\u51FA\u5199\u5165\u7ED1\u5B9A assistant \u69FD\u4F4D: ${e} -> #${d}`),o}catch(a){return _t.error("\u63D2\u5165\u6700\u65B0 AI \u56DE\u590D\u539F\u6587\u5931\u8D25",{error:a}),o.error=a?.message||String(a),o.errors.push(o.error),o}}getAssistantMessageSnapshot(e=null){try{let r=this._getChatRuntime(),{chat:n}=r,s=this._findAssistantMessageIndex(n,e);if(s<0)return null;let o=n[s]||null,a=this._getWritableMessageField(o).text||"",i=o?.[Bt]&&typeof o[Bt]=="object"?o[Bt]:{},l=Object.values(i).reduce((d,c)=>{let u=String(c?.blockText||c?.content||"").trim();return!u||!d.includes(u)?d:d.replace(u,"").trimEnd()},String(a||"")).trim();return{messageIndex:s,message:o,messageText:a,baseText:l,toolOutputs:i,injectedContext:typeof o?.[ao]=="string"?o[ao]:this._buildMessageInjectedContext(i)}}catch(r){return _t.warn("\u8BFB\u53D6 assistant \u6D88\u606F\u5FEB\u7167\u5931\u8D25",{error:r}),null}}_getCurrentChatId(){try{let e=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(e.SillyTavern?.getContext){let r=e.SillyTavern.getContext(),s=[r?.chatId,r?.chat_id,r?.chat_filename,r?.chatMetadata?.chatId,r?.chatMetadata?.chat_id,r?.chatMetadata?.file_name,r?.chatMetadata?.name,e.SillyTavern?.chatId,e.SillyTavern?.chat_id,e.SillyTavern?.chat_filename].find(a=>typeof a=="string"&&a.trim());if(s)return s;let o=e.SillyTavern?.this_chid;if(o!=null)return`chat_char_${o}`}return"chat_default"}catch{return"chat_default"}}},Jt=new Xi,BT=Jt});var Cg={};he(Cg,{BUILTIN_VARIABLES:()=>Ag,VariableResolver:()=>Zi,default:()=>zT,variableResolver:()=>ar});var ma,Ag,Zi,ar,zT,el=O(()=>{nt();Z();ma=$.createScope("VariableResolver"),Ag={lastUserMessage:{name:"lastUserMessage",description:"\u6700\u65B0\u7528\u6237\u6D88\u606F",category:"chat"},lastAiMessage:{name:"lastAiMessage",description:"\u6700\u65B0AI\u56DE\u590D",category:"chat"},chatHistory:{name:"chatHistory",description:"\u6700\u8FD1\u804A\u5929\u8BB0\u5F55",category:"chat"},characterCard:{name:"characterCard",description:"\u5F53\u524D\u89D2\u8272\u5361\u5185\u5BB9",category:"character"},toolName:{name:"toolName",description:"\u5DE5\u5177\u540D\u79F0",category:"tool"},toolId:{name:"toolId",description:"\u5DE5\u5177ID",category:"tool"},toolPromptMacro:{name:"toolPromptMacro",description:"\u5F53\u524D\u5DE5\u5177\u6A21\u677F\u63D0\u793A\u8BCD\u5B8F",category:"tool"},toolContentMacro:{name:"toolContentMacro",description:"\u5F53\u524D\u5DE5\u5177\u5904\u7406\u540E\u7684\u5185\u5BB9\u5B8F",category:"tool"},toolWorldbookContent:{name:"toolWorldbookContent",description:"\u5F53\u524D\u5DE5\u5177\u9009\u62E9\u7684\u4E16\u754C\u4E66\u6CE8\u5165\u5185\u5BB9",category:"tool"},injectedContext:{name:"injectedContext",description:"\u5DF2\u6CE8\u5165\u7684\u5DE5\u5177\u4E0A\u4E0B\u6587",category:"context"},extractedContent:{name:"extractedContent",description:"\u5DE5\u5177\u63D0\u53D6\u5185\u5BB9",category:"context"},recentMessagesText:{name:"recentMessagesText",description:"\u6700\u8FD1\u6D88\u606F\u6B63\u6587",category:"context"},rawRecentMessagesText:{name:"rawRecentMessagesText",description:"\u6700\u8FD1\u6D88\u606F\u539F\u6587",category:"context"},userMessage:{name:"userMessage",description:"\u5F53\u524D\u7528\u6237\u6D88\u606F",category:"chat"},previousToolOutput:{name:"previousToolOutput",description:"\u4E0A\u4E00\u6B21\u5DE5\u5177\u8F93\u51FA",category:"context"}},Zi=class{constructor(){this.customVariables=new Map,this.variableHandlers=new Map,this.debugMode=!1,this._registerDefaultHandlers()}resolveTemplate(e,r){if(typeof e!="string")return e;let n=e;return n=this._resolveBuiltinVariables(n,r),n=this._resolveCustomVariables(n,r),n=this._resolveRegexVariables(n,r),n}resolveObject(e,r){if(!e||typeof e!="object")return e;if(Array.isArray(e))return e.map(s=>this.resolveObject(s,r));let n={};for(let[s,o]of Object.entries(e))typeof o=="string"?n[s]=this.resolveTemplate(o,r):typeof o=="object"&&o!==null?n[s]=this.resolveObject(o,r):n[s]=o;return n}buildToolContext(e){return{lastUserMessage:e.lastUserMessage||"",lastAiMessage:e.lastAiMessage||"",chatHistory:e.chatHistory||[],characterCard:e.characterCard||null,characterName:e.characterCard?.name||"",toolName:e.toolName||"",toolId:e.toolId||"",toolPromptMacro:e.toolPromptMacro||"",toolContentMacro:e.toolContentMacro||"",toolWorldbookContent:e.toolWorldbookContent||"",injectedContext:e.injectedContext||"",extractedContent:e.extractedContent||"",recentMessagesText:e.recentMessagesText||"",rawRecentMessagesText:e.rawRecentMessagesText||"",userMessage:e.userMessage||"",previousToolOutput:e.previousToolOutput||"",regexResults:e.regexResults||{},raw:e,timestamp:Date.now()}}registerVariable(e,r){e&&(this.customVariables.set(e,r),ma.info(`\u6CE8\u518C\u81EA\u5B9A\u4E49\u53D8\u91CF: ${e}`))}unregisterVariable(e){this.customVariables.delete(e),ma.info(`\u6CE8\u9500\u81EA\u5B9A\u4E49\u53D8\u91CF: ${e}`)}registerHandler(e,r){!e||typeof r!="function"||(this.variableHandlers.set(e,r),ma.info(`\u6CE8\u518C\u53D8\u91CF\u5904\u7406\u5668: ${e}`))}getAvailableVariables(){let e=[];for(let[,r]of Object.entries(Ag))e.push({name:`{{${r.name}}}`,description:r.description,category:r.category,type:"builtin"});for(let[r,n]of this.customVariables)e.push({name:`{{${r}}}`,description:typeof n=="function"?"\u81EA\u5B9A\u4E49\u51FD\u6570\u53D8\u91CF":"\u81EA\u5B9A\u4E49\u9759\u6001\u53D8\u91CF",category:"custom",type:"custom"});return e}getVariableHelp(){let e=["\u53EF\u7528\u53D8\u91CF\uFF1A",""],r={chat:"\u804A\u5929\u76F8\u5173",character:"\u89D2\u8272\u76F8\u5173",tool:"\u5DE5\u5177\u76F8\u5173",context:"\u4E0A\u4E0B\u6587\u76F8\u5173",custom:"\u81EA\u5B9A\u4E49\u53D8\u91CF"},n={};for(let s of this.getAvailableVariables())n[s.category]||(n[s.category]=[]),n[s.category].push(s);for(let[s,o]of Object.entries(r))if(n[s]&&n[s].length>0){e.push(`\u3010${o}\u3011`);for(let a of n[s])e.push(`  ${a.name} - ${a.description}`);e.push("")}return e.push("\u3010\u6B63\u5219\u63D0\u53D6\u3011"),e.push("  {{regex.xxx}} - \u4F7F\u7528\u6B63\u5219\u63D0\u53D6\u7ED3\u679C\uFF0Cxxx\u4E3A\u6355\u83B7\u7EC4\u540D"),e.join(`
`)}_registerDefaultHandlers(){this.registerHandler("regex",(e,r)=>(r.regexResults||r.raw?.regexResults||{})[e]||"")}_resolveBuiltinVariables(e,r){let n=e;return n=n.replace(/\{\{lastUserMessage\}\}/gi,r.lastUserMessage||r.raw?.lastUserMessage||""),n=n.replace(/\{\{lastAiMessage\}\}/gi,r.lastAiMessage||r.raw?.lastAiMessage||""),n=n.replace(/\{\{chatHistory\}\}/gi,()=>{let s=r.chatHistory||r.raw?.chatHistory||[];return this._formatChatHistory(s)}),n=n.replace(/\{\{characterCard\}\}/gi,()=>{let s=r.characterCard||r.raw?.characterCard;return s?this._formatCharacterCard(s):""}),n=n.replace(/\{\{toolName\}\}/gi,r.toolName||r.raw?.toolName||""),n=n.replace(/\{\{toolId\}\}/gi,r.toolId||r.raw?.toolId||""),n=n.replace(/\{\{toolPromptMacro\}\}/gi,r.toolPromptMacro||r.raw?.toolPromptMacro||""),n=n.replace(/\{\{toolContentMacro\}\}/gi,r.toolContentMacro||r.raw?.toolContentMacro||""),n=n.replace(/\{\{toolWorldbookContent\}\}/gi,r.toolWorldbookContent||r.raw?.toolWorldbookContent||""),n=n.replace(/\{\{injectedContext\}\}/gi,r.injectedContext||r.raw?.injectedContext||""),n=n.replace(/\{\{extractedContent\}\}/gi,r.extractedContent||r.raw?.extractedContent||""),n=n.replace(/\{\{recentMessagesText\}\}/gi,r.recentMessagesText||r.raw?.recentMessagesText||""),n=n.replace(/\{\{rawRecentMessagesText\}\}/gi,r.rawRecentMessagesText||r.raw?.rawRecentMessagesText||""),n=n.replace(/\{\{userMessage\}\}/gi,r.userMessage||r.raw?.userMessage||""),n=n.replace(/\{\{previousToolOutput\}\}/gi,r.previousToolOutput||r.raw?.previousToolOutput||""),n}_resolveCustomVariables(e,r){let n=e;for(let[s,o]of this.customVariables){let a=new RegExp(`\\{\\{${this._escapeRegex(s)}\\}\\}`,"gi");typeof o=="function"?n=n.replace(a,()=>{try{return o(r)}catch(i){return ma.error(`\u53D8\u91CF\u5904\u7406\u9519\u8BEF ${s}:`,i),""}}):n=n.replace(a,String(o))}return n}_resolveRegexVariables(e,r){let n=e;for(let[s,o]of this.variableHandlers){let a=new RegExp(`\\{\\{${s}\\.([^}]+)\\}\\}`,"gi");n=n.replace(a,(i,l)=>{try{return o(l,r)}catch(d){return ma.error(`\u53D8\u91CF\u5904\u7406\u9519\u8BEF ${s}.${l}:`,d),""}})}return n}_formatChatHistory(e){return!Array.isArray(e)||e.length===0?"":e.map(r=>{let n=r.role||"unknown",s=r.content||r.mes||"";return`[${n}]: ${s}`}).join(`

`)}_formatCharacterCard(e){if(!e)return"";let r=[];return e.name&&r.push(`\u59D3\u540D: ${e.name}`),e.description&&r.push(`\u63CF\u8FF0: ${e.description}`),e.personality&&r.push(`\u6027\u683C: ${e.personality}`),e.scenario&&r.push(`\u573A\u666F: ${e.scenario}`),r.join(`

`)}_escapeRegex(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}},ar=new Zi,zT=ar});var Rg={};he(Rg,{DEFAULT_PROMPT_TEMPLATE:()=>Ig,ToolPromptService:()=>tl,default:()=>KT,toolPromptService:()=>ds});var kg,Ig,tl,ds,KT,rl=O(()=>{nt();so();el();Go();Z();kg=$.createScope("ToolPromptService"),Ig="\u8BF7\u5904\u7406\u4EE5\u4E0BAI\u56DE\u590D\u5185\u5BB9\uFF1A",tl=class{constructor(){this.debugMode=!1}async _buildVariableContext(e,r={}){let n=this._getPromptTemplate(e),s=String(r?.toolWorldbookContent||r?.input?.toolWorldbookContent||await mi(e)).trim(),o=ar.buildToolContext({...r,toolName:e?.name||r?.toolName||"",toolId:e?.id||r?.toolId||"",toolWorldbookContent:s}),a=ar.resolveTemplate(n,o).trim(),i=String(r?.toolContentMacro||r?.input?.toolContentMacro||"").trim();return ar.buildToolContext({...r,toolName:e?.name||r?.toolName||"",toolId:e?.id||r?.toolId||"",toolPromptMacro:a,toolContentMacro:i,toolWorldbookContent:s})}async buildToolMessages(e,r){if(!e)return kg.error("\u6784\u5EFA\u5931\u8D25: \u5DE5\u5177\u914D\u7F6E\u4E3A\u7A7A"),[];let n=[],s=await this._buildVariableContext(e,r),o=Array.isArray(e.promptMessages)?e.promptMessages:[],a=this._getBypassMessages(e),i=a?.some(l=>l.mainSlot==="A"||l.mainSlot==="B"||l.isMain||l.isMain2);if(a&&a.length>0)for(let l of a)l.enabled!==!1&&n.push({role:this._normalizeRole(l.role),content:ar.resolveTemplate(l.content||"",s)});if(!i&&o.length>0)for(let l of o){let d=ar.resolveTemplate(l?.content||"",s).trim();d&&n.push({role:this._normalizeRole(l?.role),content:d})}else if(!i&&!a?.length){let l=this._buildUserContent(this._getPromptTemplate(e),s);l&&n.push({role:"user",content:l})}return kg.debug(`\u6784\u5EFA\u6D88\u606F: ${n.length} \u6761`),n}async buildPromptText(e,r){let n=await this._buildVariableContext(e,r),s=Array.isArray(e?.promptMessages)?e.promptMessages:[];return s.length>0?s.map(o=>ar.resolveTemplate(o?.content||"",n).trim()).filter(Boolean).join(`

`):n.toolPromptMacro||""}getToolPromptTemplate(e){return this._getPromptTemplate(e)}_getPromptTemplate(e){return e.promptTemplate&&typeof e.promptTemplate=="string"?e.promptTemplate:Ig}_getBypassMessages(e){return e.bypass?.enabled?ve.buildBypassMessages(e):[]}_buildUserContent(e,r){return!e||!e.trim()?"":ar.resolveTemplate(e,r).trim()}_normalizeRole(e){if(!e)return"user";switch(String(e).toLowerCase()){case"system":return"system";case"assistant":return"assistant";case"user":default:return"user"}}setDebugMode(e){this.debugMode=e}},ds=new tl,KT=ds});var Pg={};he(Pg,{LEGACY_OUTPUT_MODES:()=>FT,OUTPUT_MODES:()=>Qt,TOOL_FAILURE_STAGES:()=>lt,TOOL_RUNTIME_STATUS:()=>UT,TOOL_WRITEBACK_STATUS:()=>Xe,ToolOutputService:()=>nl,default:()=>jT,toolOutputService:()=>Xt});function Mg(t){if(t?.signal?.aborted)return{aborted:!0,stale:!1,reason:"cancelled_before_host_commit"};if(typeof t?.shouldAbortWriteback=="function")try{return t.shouldAbortWriteback()||!1}catch{return{aborted:!0,stale:!0,reason:"stale_base_changed"}}return!1}function io(t=[],e="",r=null){return{request:{built:Array.isArray(t)&&t.length>0,messageCount:Array.isArray(t)?t.length:0},extract:{completed:!0,hasOutput:!!String(e||"").trim()},writeback:{attempted:!!r,contentCommitted:!!r?.contentCommitted,hostCommitApplied:!!r?.hostCommitApplied,writebackStatus:r?.writebackStatus||"",preferredCommitMethod:r?.commit?.preferredMethod||"",appliedCommitMethod:r?.commit?.appliedMethod||"",fallbackUsed:!!r?.commit?.fallbackUsed},refresh:{requested:!!r?.refreshRequested,confirmed:!!r?.refreshConfirmed,requestMethods:Array.isArray(r?.refresh?.requestMethods)?[...r.refresh.requestMethods]:[],confirmChecks:Number(r?.refresh?.confirmChecks)||0,confirmedBy:r?.refresh?.confirmedBy||""}}}var Sn,Qt,FT,UT,lt,Xe,nl,Xt,jT,ga=O(()=>{nt();oo();Z();cs();rl();Xn();dn();Cs();Sn=$.createScope("ToolOutputService"),Qt={FOLLOW_AI:"follow_ai",POST_RESPONSE_API:"post_response_api",LOCAL_TRANSFORM:"local_transform"},FT={inline:"follow_ai"},UT={IDLE:"idle",RUNNING:"running",SUCCESS:"success",ERROR:"error"},lt={BUILD_MESSAGES:"build_messages",SEND_API_REQUEST:"send_api_request",EXTRACT_OUTPUT:"extract_output",INJECT_CONTEXT:"inject_context",COMPATIBILITY_EXECUTE:"compatibility_execute",UNKNOWN:"unknown"},Xe={SUCCESS:"success",FAILED:"failed",SKIPPED_EMPTY_OUTPUT:"skipped_empty_output",NOT_APPLICABLE:"not_applicable"};nl=class{constructor(){this.debugMode=!1,this._apiConnection=null}shouldRunPostResponse(e){return!e||!e.enabled||!e.output?.enabled?!1:e.output?.mode===Qt.POST_RESPONSE_API}shouldRunLocalTransform(e){return!e||!e.enabled||!e.output?.enabled?!1:e.output?.mode===Qt.LOCAL_TRANSFORM||!!e.processor?.type}shouldRunFollowAi(e){if(!e||!e.enabled||!e.output?.enabled)return!1;let r=e.output?.mode;return r===Qt.FOLLOW_AI||r==="inline"}shouldRunInline(e){return this.shouldRunFollowAi(e)}async runToolPostResponse(e,r){let n=Date.now(),s=e.id,o=r?.traceId||`trace_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,a=r?.sessionKey||"",i=r?.executionKey||"",l=this._getExtractionSelectors(e),d=e?.extraction?.writebackTag?.trim(),c=d?[d]:l,u=e.output?.apiPreset||e.apiPreset||"",y="",p=Xe.NOT_APPLICABLE,m=null,g=[],h="";Sn.info(`\u5F00\u59CB\u6267\u884C\u5DE5\u5177: ${s}`),q.emit(G.TOOL_EXECUTION_STARTED,{toolId:s,traceId:o,sessionKey:a,mode:Qt.POST_RESPONSE_API});try{if(y=lt.BUILD_MESSAGES,g=await this._buildToolMessages(e,r),!g||g.length===0)throw new Error("\u672A\u6784\u5EFA\u51FA\u53EF\u53D1\u9001\u7684\u5DE5\u5177\u8BF7\u6C42\u6D88\u606F\uFF0C\u8BF7\u68C0\u67E5\u63D0\u793A\u8BCD\u6A21\u677F\u6216\u7834\u9650\u8BCD\u914D\u7F6E\u662F\u5426\u4E3A\u7A7A\u3002");Sn.debug(`\u6784\u5EFA\u4E86 ${g.length} \u6761\u6D88\u606F`);let b=Mg(r);if(b){let w=Date.now()-n;return{success:!1,toolId:s,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88",duration:w,meta:{traceId:o,sessionKey:a,executionKey:i,sourceMessageId:r?.sourceMessageId||r?.confirmedAssistantMessageId||r?.messageId||"",sourceSwipeId:r?.sourceSwipeId||r?.confirmedAssistantSwipeId||r?.effectiveSwipeId||"",slotRevisionKey:r?.slotRevisionKey||"",selectors:l,apiPreset:u,writebackStatus:p,failureStage:y,writebackDetails:m,aborted:b.aborted===!0,stale:b.stale===!0,abortReason:b.reason||"",phases:io(g,h,m)}}}let v=await this._getRequestTimeout();y=lt.SEND_API_REQUEST;let x=await this._sendApiRequest(u,g,{timeoutMs:v,signal:r.signal});y=lt.EXTRACT_OUTPUT,h=this._extractOutputContent(x,e);let T=Mg(r);if(T){let w=Date.now()-n;return{success:!1,toolId:s,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88",duration:w,meta:{traceId:o,sessionKey:a,executionKey:i,sourceMessageId:r?.sourceMessageId||r?.confirmedAssistantMessageId||r?.messageId||"",sourceSwipeId:r?.sourceSwipeId||r?.confirmedAssistantSwipeId||r?.effectiveSwipeId||"",slotRevisionKey:r?.slotRevisionKey||"",selectors:l,apiPreset:u,writebackStatus:p,failureStage:y,writebackDetails:m,aborted:T.aborted===!0,stale:T.stale===!0,abortReason:T.reason||"",phases:io(g,h,m)}}}if(h){if(y=lt.INJECT_CONTEXT,m=await Jt.injectDetailed(s,h,{overwrite:e.output?.overwrite!==!1,sourceMessageId:r.sourceMessageId||r.confirmedAssistantMessageId||r.messageId||"",sourceSwipeId:r.sourceSwipeId||r.confirmedAssistantSwipeId||r.effectiveSwipeId||"",effectiveSwipeId:r.effectiveSwipeId||r.confirmedAssistantSwipeId||"",slotBindingKey:r.slotBindingKey||"",slotRevisionKey:r.slotRevisionKey||"",slotTransactionId:r.slotTransactionId||"",extractionSelectors:c,traceId:o,sessionKey:a,signal:r.signal,shouldAbortWriteback:r.shouldAbortWriteback,isAutoRun:r.isAutoRun===!0,skipNotify:r.skipNotify===!0}),!m?.success)throw p=Xe.FAILED,new Error(m?.error||"\u5DE5\u5177\u7ED3\u679C\u5DF2\u751F\u6210\uFF0C\u4F46\u5199\u5165\u4E0A\u4E0B\u6587/\u4E16\u754C\u4E66\u5931\u8D25");p=Xe.SUCCESS}else p=Xe.SKIPPED_EMPTY_OUTPUT;y="";let E=Date.now()-n;return q.emit(G.TOOL_EXECUTED,{toolId:s,traceId:o,sessionKey:a,success:!0,duration:E,mode:Qt.POST_RESPONSE_API}),Sn.info(`\u5DE5\u5177\u6267\u884C\u6210\u529F: ${s}, \u8017\u65F6 ${E}ms`),{success:!0,toolId:s,output:h,duration:E,meta:{traceId:o,sessionKey:a,executionKey:i,slotBindingKey:r?.slotBindingKey||"",slotTransactionId:r?.slotTransactionId||"",generationAction:r?.generationAction||"",generationActionSource:r?.generationActionSource||"",rawGenerationType:r?.rawGenerationType||"",normalizedGenerationType:r?.normalizedGenerationType||"",generationMessageBindingSource:r?.generationMessageBindingSource||"",sourceMessageId:r?.sourceMessageId||r?.confirmedAssistantMessageId||r?.messageId||"",sourceSwipeId:r?.sourceSwipeId||r?.confirmedAssistantSwipeId||r?.effectiveSwipeId||"",confirmedAssistantSwipeId:r?.confirmedAssistantSwipeId||"",effectiveSwipeId:r?.effectiveSwipeId||"",slotRevisionKey:r?.slotRevisionKey||"",messageCount:g.length,selectors:l,apiPreset:u,writebackStatus:p,failureStage:"",writebackDetails:m,phases:io(g,h,m)}}}catch(b){let v=Date.now()-n,x=y||lt.UNKNOWN,T=p||Xe.NOT_APPLICABLE;return Sn.error(`\u5DE5\u5177\u6267\u884C\u5931\u8D25: ${s}`,{error:b}),q.emit(G.TOOL_EXECUTION_FAILED,{toolId:s,traceId:o,sessionKey:a,error:b.message||String(b),duration:v}),{success:!1,toolId:s,error:b.message||String(b),duration:v,meta:{traceId:o,sessionKey:a,executionKey:i,slotBindingKey:r?.slotBindingKey||"",slotTransactionId:r?.slotTransactionId||"",generationAction:r?.generationAction||"",generationActionSource:r?.generationActionSource||"",rawGenerationType:r?.rawGenerationType||"",normalizedGenerationType:r?.normalizedGenerationType||"",generationMessageBindingSource:r?.generationMessageBindingSource||"",sourceMessageId:r?.sourceMessageId||r?.confirmedAssistantMessageId||r?.messageId||"",sourceSwipeId:r?.sourceSwipeId||r?.confirmedAssistantSwipeId||r?.effectiveSwipeId||"",confirmedAssistantSwipeId:r?.confirmedAssistantSwipeId||"",effectiveSwipeId:r?.effectiveSwipeId||"",slotRevisionKey:r?.slotRevisionKey||"",messageCount:g.length,selectors:l,apiPreset:u,writebackStatus:T,failureStage:x,writebackDetails:m,phases:io(g,h,m)}}}}async runToolFollowAiManual(e,r){let n=Date.now(),s=e.id,o=r?.traceId||`trace_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,a=r?.sessionKey||"",i=r?.executionKey||"",l=e.output?.apiPreset||e.apiPreset||"",d=this._getExtractionSelectors(e),c=e?.extraction?.writebackTag?.trim(),u=c?[c]:d,y="",p=Xe.NOT_APPLICABLE,m=null,g=[],h="";q.emit(G.TOOL_EXECUTION_STARTED,{toolId:s,traceId:o,sessionKey:a,mode:Qt.FOLLOW_AI});try{if(y=lt.BUILD_MESSAGES,g=await this._buildToolMessages(e,r),!g||g.length===0)throw new Error("\u672A\u6784\u5EFA\u51FA\u53EF\u53D1\u9001\u7684\u5DE5\u5177\u8BF7\u6C42\u6D88\u606F\uFF0C\u8BF7\u68C0\u67E5\u63D0\u793A\u8BCD\u6A21\u677F\u6216\u7834\u9650\u8BCD\u914D\u7F6E\u662F\u5426\u4E3A\u7A7A\u3002");let b=await this._getRequestTimeout();y=lt.SEND_API_REQUEST;let v=await this._sendApiRequest(l,g,{timeoutMs:b,signal:r.signal});if(y=lt.EXTRACT_OUTPUT,h=this._extractOutputContent(v,e),h){if(y=lt.INJECT_CONTEXT,m=await Jt.injectDetailed(s,h,{overwrite:e.output?.overwrite!==!1,sourceMessageId:r.sourceMessageId||r.confirmedAssistantMessageId||r.messageId||"",sourceSwipeId:r.sourceSwipeId||r.confirmedAssistantSwipeId||r.effectiveSwipeId||"",effectiveSwipeId:r.effectiveSwipeId||r.confirmedAssistantSwipeId||"",slotBindingKey:r.slotBindingKey||"",slotRevisionKey:r.slotRevisionKey||"",slotTransactionId:r.slotTransactionId||"",extractionSelectors:u,traceId:o,sessionKey:a}),!m?.success)throw p=Xe.FAILED,new Error(m?.error||"\u5DE5\u5177\u7ED3\u679C\u5DF2\u751F\u6210\uFF0C\u4F46\u5199\u5165\u4E0A\u4E0B\u6587/\u4E16\u754C\u4E66\u5931\u8D25");p=Xe.SUCCESS}else p=Xe.SKIPPED_EMPTY_OUTPUT;y="";let x=Date.now()-n;return q.emit(G.TOOL_EXECUTED,{toolId:s,traceId:o,sessionKey:a,success:!0,duration:x,mode:Qt.FOLLOW_AI}),{success:!0,toolId:s,output:h,duration:x,meta:{traceId:o,sessionKey:a,executionKey:i,slotBindingKey:r?.slotBindingKey||"",slotTransactionId:r?.slotTransactionId||"",sourceMessageId:r?.sourceMessageId||r?.confirmedAssistantMessageId||r?.messageId||"",sourceSwipeId:r?.sourceSwipeId||r?.confirmedAssistantSwipeId||r?.effectiveSwipeId||"",confirmedAssistantSwipeId:r?.confirmedAssistantSwipeId||"",effectiveSwipeId:r?.effectiveSwipeId||"",slotRevisionKey:r?.slotRevisionKey||"",messageCount:g.length,selectors:d,apiPreset:l,writebackStatus:p,failureStage:"",writebackDetails:m,phases:io(g,h,m)}}}catch(b){let v=Date.now()-n,x=y||lt.UNKNOWN,T=p||Xe.NOT_APPLICABLE;return q.emit(G.TOOL_EXECUTION_FAILED,{toolId:s,traceId:o,sessionKey:a,error:b.message||String(b),duration:v,mode:Qt.FOLLOW_AI}),{success:!1,toolId:s,error:b.message||String(b),duration:v,meta:{traceId:o,sessionKey:a,executionKey:i,slotBindingKey:r?.slotBindingKey||"",slotTransactionId:r?.slotTransactionId||"",sourceMessageId:r?.sourceMessageId||r?.confirmedAssistantMessageId||r?.messageId||"",sourceSwipeId:r?.sourceSwipeId||r?.confirmedAssistantSwipeId||r?.effectiveSwipeId||"",confirmedAssistantSwipeId:r?.confirmedAssistantSwipeId||"",effectiveSwipeId:r?.effectiveSwipeId||"",slotRevisionKey:r?.slotRevisionKey||"",messageCount:g.length,selectors:d,apiPreset:l,writebackStatus:T,failureStage:x,writebackDetails:m,phases:io(g,h,m)}}}}async runToolInline(e,r){return this.runToolFollowAiManual(e,r)}async previewExtraction(e,r){return{success:!0,...this.getExtractionSnapshot(e,r)}}getExtractionSnapshot(e,r){let n=this._buildRecentMessageExtractionEntries(e,r),s=this._joinMessageBlocks(n,"rawText"),o=this._joinMessageBlocks(n,"filteredText"),a=this._joinMessageBlocks(n,"extractedText",{skipEmpty:!0}),i=(Array.isArray(n)?n:[]).map(d=>String(d?.extractedText||"").trim()).filter(Boolean).join(`

`),l=Array.isArray(n)&&n.length>0?n[n.length-1]:null;return{sourceText:s,filteredSourceText:o,extractedText:a,extractedRawText:i,messageEntries:n,primaryEntry:l,selectors:this._getExtractionSelectors(e),maxMessages:e?.extraction?.maxMessages||5}}async _buildToolMessages(e,r){let n=this._buildRecentMessageExtractionEntries(e,r),s=this._joinMessageBlocks(n,"rawText"),o=this._joinMessageBlocks(n,"filteredText"),a=this._joinMessageBlocks(n,"extractedText",{skipEmpty:!0}),i={...r,rawRecentMessagesText:s,recentMessagesText:o,extractedContent:a,toolContentMacro:this._buildToolContentMacro(n),toolName:e.name,toolId:e.id};return ds.buildToolMessages(e,i)}_normalizeRole(e){if(!e)return"user";let r=String(e).toLowerCase();return r==="system"?"system":r==="assistant"?"assistant":"user"}setApiConnection(e){this._apiConnection=e}async _sendApiRequest(e,r,n={}){if(!this._apiConnection)throw new Error("API\u8FDE\u63A5\u6A21\u5757\u672A\u914D\u7F6E");let{timeoutMs:s=9e4,signal:o}=n,a=null;if(e){if(!Do(e))throw new Error(`\u672A\u627E\u5230 API \u9884\u8BBE\u201C${e}\u201D\uFF0C\u8BF7\u91CD\u65B0\u9009\u62E9\u6216\u4FDD\u5B58\u540E\u518D\u6267\u884C`);a=Oo(e)}else a=Oo();let i=ri(a||{});if(!i.valid&&!a?.useMainApi)throw new Error(`API\u914D\u7F6E\u65E0\u6548\uFF1A${i.errors.join("\uFF0C")}\u3002\u8BF7\u5148\u5B8C\u5584\u81EA\u5B9A\u4E49API\u914D\u7F6E\uFF0C\u6216\u542F\u7528\u201C\u4F7F\u7528SillyTavern\u4E3BAPI\u201D`);if(this._apiConnection.sendApiRequest)return await this._apiConnection.sendApiRequest(r,{timeoutMs:s,apiConfig:a},o);throw new Error("\u6CA1\u6709\u53EF\u7528\u7684API\u53D1\u9001\u65B9\u6CD5")}async _getRequestTimeout(){return Tt.getSettings().executor?.requestTimeoutMs||9e4}_extractOutputContent(e,r){if(!e)return"";if(typeof e=="string")return this._applyOutputExtractionSelectors(e,r);if(typeof e=="object"){if(e.choices&&e.choices[0]?.message?.content)return this._applyOutputExtractionSelectors(e.choices[0].message.content,r);if(e.content)return this._applyOutputExtractionSelectors(e.content,r);if(e.text)return this._applyOutputExtractionSelectors(e.text,r);if(e.message)return this._applyOutputExtractionSelectors(e.message,r);try{return this._applyOutputExtractionSelectors(JSON.stringify(e,null,2),r)}catch{return this._applyOutputExtractionSelectors(String(e),r)}}return this._applyOutputExtractionSelectors(String(e),r)}_applyOutputExtractionSelectors(e,r){let n=typeof e=="string"?e:String(e||""),s=this._getExtractionSelectors(r);if(!s.length)return n.trim();let o=[];for(let a of s){let i=String(a||"").trim();if(!i)continue;if(i.startsWith("regex:")){let d=i.slice(6).trim();if(!d)continue;try{let c=new RegExp(d,"gi");[...n.matchAll(c)].forEach(y=>{let p=String(y?.[0]||"").trim();p&&o.push(p)})}catch(c){Sn.warn("\u5DE5\u5177\u8F93\u51FA\u6B63\u5219\u63D0\u53D6\u5931\u8D25\uFF0C\u8DF3\u8FC7\u8BE5\u89C4\u5219",{selector:i,error:c})}continue}let l=i.replace(/^<|>$/g,"").trim();if(l)try{let d=new RegExp(`<${l}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${l}>`,"gi");(n.match(d)||[]).forEach(u=>{let y=String(u||"").trim();y&&o.push(y)})}catch(d){Sn.warn("\u5DE5\u5177\u8F93\u51FA\u6807\u7B7E\u63D0\u53D6\u5931\u8D25\uFF0C\u8DF3\u8FC7\u8BE5\u89C4\u5219",{selector:i,error:d})}}return o.length>0?o.join(`

`).trim():n.trim()}_resolveExtractionContext(e){let r=e?.extraction?.regexPresetId;if(!r)return{rules:[],blacklist:[]};try{let n=zr(r);if(!n)return{rules:[],blacklist:[]};let s=Array.isArray(n.rules)?n.rules.filter(a=>a&&a.enabled!==!1&&a.value).map(a=>({id:a.id,type:a.type,value:a.value,enabled:!0})):[],o=Array.isArray(n.blacklist)?n.blacklist.map(a=>String(a||"").trim()).filter(Boolean):[];return{rules:s,blacklist:o}}catch(n){return Sn.warn("_resolveExtractionContext \u5F02\u5E38",{error:n}),{rules:[],blacklist:[]}}}_getExtractionSelectors(e){let{rules:r}=this._resolveExtractionContext(e),n=[];for(let s of r){let o=String(s.value||"").trim();o&&(s.type==="include"?n.push(o):s.type==="regex_include"&&n.push(`regex:${o}`))}return n}_applyExtractionSelectors(e,r){return this._applyExtractionSelectorsInternal(e,r,{strict:!1})}_applyExtractionSelectorsInternal(e,r,n={}){let s=typeof e=="string"?e:String(e||""),{rules:o,blacklist:a}=this._resolveExtractionContext(r),{strict:i=!1}=n;if(!o.length)return s.trim();let l=Dr(s,o,a||[]);return i?(l||"").trim():l||s.trim()}_extractToolContent(e,r){let n=typeof r=="string"?r:String(r||""),{rules:s}=this._resolveExtractionContext(e);return s.length?this._applyExtractionSelectorsInternal(n,e,{strict:!0}):n.trim()}_applyGlobalContextRules(e){let r=typeof e=="string"?e:String(e||"");if(!r.trim())return"";try{let n=Ps()||[],s=Ns()||[];return!Array.isArray(n)||n.length===0?r.trim():Dr(r,n,s)||r.trim()}catch(n){return Sn.warn("\u5E94\u7528\u5168\u5C40\u6B63\u6587\u63D0\u53D6\u89C4\u5219\u5931\u8D25\uFF0C\u56DE\u9000\u539F\u59CB\u6587\u672C",{error:n}),r.trim()}}_getMessageText(e){if(!e)return"";let r=[e.content,e.mes,e.message,e.text,e?.data?.content];for(let n of r)if(typeof n=="string"&&n.trim())return n.trim();return""}_collectRecentAssistantMessages(e,r){return this._collectRecentAssistantMessageEntries(e,r).map(n=>n.text).filter(Boolean).join(`

`)}_collectRecentAssistantMessageEntries(e,r){let n=Math.max(1,parseInt(e?.extraction?.maxMessages,10)||5),s=Array.isArray(r?.chatMessages)?r.chatMessages:[],o=[];for(let i=s.length-1;i>=0&&o.length<n;i-=1){let l=s[i],d=String(l?.role||"").toLowerCase(),c=d==="assistant"||d==="ai"||!l?.is_user&&!l?.is_system&&!d,u=this._getMessageText(l);c&&u&&o.unshift({text:u,message:l,chatIndex:i})}if(o.length>0)return o;let a=r?.lastAiMessage||r?.input?.lastAiMessage||"";return a?[{text:a,message:null,chatIndex:-1}]:[]}_buildRecentMessageExtractionEntries(e,r){return this._collectRecentAssistantMessageEntries(e,r).map((s,o)=>{let a=s.text||"",i=this._applyGlobalContextRules(a),l=this._extractToolContent(e,a);return{...s,order:o+1,rawText:a,filteredText:i,extractedText:l,fullMessageText:a}})}_joinMessageBlocks(e,r,n={}){let s=Array.isArray(e)?e:[],{skipEmpty:o=!1}=n;return s.map(i=>{let l=String(i?.[r]||"").trim();return o&&!l?"":`${`\u3010\u7B2C ${i?.order||0} \u6761 AI \u6D88\u606F\u3011`}
${l||"(\u7A7A)"}`}).filter(Boolean).join(`

--------------------------------

`)}_buildToolContentMacro(e){return(Array.isArray(e)?e:[]).map(s=>{let o=`\u3010\u7B2C ${s?.order||0} \u6761 AI \u6D88\u606F\u3011`,a=String(s?.filteredText||"").trim()||"(\u7A7A)",i=String(s?.extractedText||"").trim()||"(\u7A7A)";return`${o}
\u6B63\u6587\uFF1A
${a}

\u5DE5\u5177\uFF1A
${i}`}).filter(Boolean).join(`

--------------------------------

`).trim()}filterPostResponseTools(e){return Array.isArray(e)?e.filter(r=>this.shouldRunPostResponse(r)):[]}filterAutoPostResponseTools(e){return Array.isArray(e)?e.filter(r=>this.shouldRunPostResponse(r)):[]}filterInlineTools(e){return Array.isArray(e)?e.filter(r=>this.shouldRunInline(r)):[]}setDebugMode(e){this.debugMode=e}},Xt=new nl,jT=Xt});function $g(t={}){return!t||typeof t!="object"?{}:Object.entries(t).reduce((e,[r,n])=>(e[r]=n===!0,e),{})}function qT(t,e={}){let r=e?.direction==="unescape"?"unescape":"escape",n=$g(e?.options);return WT.reduce((s,o)=>n[o.key]!==!0?s:r==="unescape"?s.replace(o.escaped,o.unescaped):s.replace(o.plain,o.replacement),String(t||""))}function GT(t,e={}){if((e?.direction||"en_to_zh")!=="en_to_zh")return String(t||"");let n=$g(e?.options);return HT.reduce((s,o)=>n[o.key]!==!0?s:s.replace(o.from,o.to),String(t||""))}function YT(t,e){let r=t?.processor||{},n=r?.type||"",s=String(e||"");switch(n){case Ng.ESCAPE_TRANSFORM:return qT(s,r);case Ng.PUNCTUATION_TRANSFORM:return GT(s,r);default:return s}}function VT(t,e,r){let n=String(t||""),s=String(e||"").trim(),o=String(r||"").trim();return!n.trim()||!s?{nextMessageText:"",replaced:!1}:n.includes(s)?{nextMessageText:n.replace(s,o).trim(),replaced:!0}:{nextMessageText:"",replaced:!1}}async function sl(t,e={}){let r=Xt.getExtractionSnapshot(t,e),n=r?.primaryEntry||null,s=String(n?.fullMessageText||e?.lastAiMessage||"").trim(),o=String(n?.extractedText||r?.extractedRawText||r?.extractedText||"").trim(),a=Array.isArray(r?.selectors)?r.selectors:[],i=e?.traceId||`trace_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,l=e?.sessionKey||"";if(!o||!s)return{success:!1,error:"\u672A\u63D0\u53D6\u5230\u53EF\u5904\u7406\u5185\u5BB9\uFF0C\u8BF7\u5148\u68C0\u67E5\u6807\u7B7E\u6216\u6B63\u5219\u89C4\u5219",meta:{traceId:i,sessionKey:l,selectors:a,writebackStatus:Xe.NOT_APPLICABLE,failureStage:lt.EXTRACT_OUTPUT,extraction:r}};let d=String(YT(t,o)||"").trim(),c=VT(s,o,d),u=c.replaced?c.nextMessageText:d,y=null,p=Xe.NOT_APPLICABLE;if(u){if(y=await Jt.injectDetailed(t.id,u,{overwrite:!0,sourceMessageId:e?.sourceMessageId||e?.confirmedAssistantMessageId||e?.messageId||"",sourceSwipeId:e?.sourceSwipeId||e?.confirmedAssistantSwipeId||e?.effectiveSwipeId||"",effectiveSwipeId:e?.effectiveSwipeId||e?.confirmedAssistantSwipeId||"",slotBindingKey:e?.slotBindingKey||"",slotRevisionKey:e?.slotRevisionKey||"",slotTransactionId:e?.slotTransactionId||"",extractionSelectors:[],replaceFullMessage:c.replaced,traceId:i,sessionKey:l,skipNotify:e?.skipNotify===!0}),!y?.success)return{success:!1,error:y?.error||"\u672C\u5730\u5904\u7406\u5B8C\u6210\uFF0C\u4F46\u5199\u56DE\u5931\u8D25",meta:{traceId:i,sessionKey:l,selectors:a,writebackStatus:Xe.FAILED,failureStage:lt.INJECT_CONTEXT,writebackDetails:y,extraction:r}};p=Xe.SUCCESS}else p=Xe.SKIPPED_EMPTY_OUTPUT;return{success:!0,output:d,writebackState:u?{committed:y?.contentCommitted===!0}:null,meta:{traceId:i,sessionKey:l,selectors:a,writebackStatus:p,failureStage:"",writebackDetails:y,extraction:r}}}var WT,HT,Ng,Qd=O(()=>{ga();cs();WT=[{key:"newline",plain:/\r\n|\r|\n/g,escaped:/\\n/g,replacement:"\\n",unescaped:`
`},{key:"doubleQuote",plain:/"/g,escaped:/\\"/g,replacement:'\\"',unescaped:'"'},{key:"singleQuote",plain:/'/g,escaped:/\\'/g,replacement:"\\'",unescaped:"'"}],HT=[{key:"comma",from:/,/g,to:"\uFF0C"},{key:"period",from:/\./g,to:"\u3002"},{key:"exclamation",from:/!/g,to:"\uFF01"},{key:"question",from:/\?/g,to:"\uFF1F"},{key:"semicolon",from:/;/g,to:"\uFF1B"},{key:"colon",from:/:/g,to:"\uFF1A"},{key:"leftParen",from:/\(/g,to:"\uFF08"},{key:"rightParen",from:/\)/g,to:"\uFF09"}],Ng={ESCAPE_TRANSFORM:"escape_transform",PUNCTUATION_TRANSFORM:"punctuation_transform"}});var eu={};he(eu,{abortAllTasks:()=>e_,abortTask:()=>ZT,buildToolMessages:()=>Dg,clearExecutionHistory:()=>o_,createExecutionContext:()=>c_,createResult:()=>ol,enhanceMessagesWithBypass:()=>d_,executeBatch:()=>XT,executeTool:()=>Og,executeToolWithConfig:()=>Bg,executeToolsBatch:()=>y_,executorState:()=>Ye,extractFailed:()=>l_,extractSuccessful:()=>i_,generateTaskId:()=>us,getExecutionHistory:()=>s_,getExecutorStatus:()=>n_,getScheduler:()=>lo,mergeResults:()=>a_,pauseExecutor:()=>t_,resumeExecutor:()=>r_,setMaxConcurrent:()=>QT});function ol(t,e,r,n,s,o,a=0){return{success:r,taskId:t,toolId:e,data:n,error:s,duration:o,retries:a,timestamp:Date.now(),metadata:{}}}function us(){return`task_${Date.now()}_${Math.random().toString(36).substr(2,9)}`}function JT(t,e={}){return{id:us(),toolId:t,options:e,status:"pending",createdAt:Date.now(),startedAt:null,completedAt:null,retries:0,maxRetries:e.maxRetries||3}}function lo(){return ha||(ha=new Xd(Ye.maxConcurrent)),ha}function QT(t){Ye.maxConcurrent=Math.max(1,Math.min(10,t)),ha&&(ha.maxConcurrent=Ye.maxConcurrent)}async function Og(t,e={},r){let n=lo(),s=JT(t,e);for(;Ye.isPaused;)await new Promise(o=>setTimeout(o,100));try{let o=await n.enqueue(async a=>{if(a.aborted)throw new DOMException("\u4EFB\u52A1\u5DF2\u4E2D\u6B62","AbortError");if(typeof r=="function")return await r(a,e);throw new Error("\u6267\u884C\u5668\u5FC5\u987B\u662F\u4E00\u4E2A\u51FD\u6570")},s);return Lg(o),o}catch(o){Zd.error(`executeTool \u5F02\u5E38 (toolId=${t})`,{error:o});let a=ol(s.id,t,!1,null,o,Date.now()-s.createdAt,s.retries);return Lg(a),a}}async function XT(t,e={}){let{failFast:r=!1,concurrency:n=Ye.maxConcurrent}=e,s=[],o=lo(),a=o.maxConcurrent;o.maxConcurrent=n;try{let i=t.map(({toolId:l,options:d,executor:c})=>Og(l,d,c));if(r)for(let l of i){let d=await l;if(s.push(d),!d.success){o.abortAll();break}}else{let l=await Promise.allSettled(i);for(let d of l)d.status==="fulfilled"?s.push(d.value):s.push(ol(us(),"unknown",!1,null,d.reason,0,0))}}finally{o.maxConcurrent=a}return s}function ZT(t){return lo().abort(t)}function e_(){lo().abortAll(),Ye.executionQueue=[]}function t_(){Ye.isPaused=!0}function r_(){Ye.isPaused=!1}function n_(){return{...lo().getStatus(),isPaused:Ye.isPaused,activeControllers:Ye.activeControllers.size,historyCount:Ye.executionHistory.length}}function Lg(t){Ye.executionHistory.push(t),Ye.executionHistory.length>100&&Ye.executionHistory.shift()}function s_(t={}){let e=[...Ye.executionHistory];return t.toolId&&(e=e.filter(r=>r.toolId===t.toolId)),t.success!==void 0&&(e=e.filter(r=>r.success===t.success)),t.limit&&(e=e.slice(-t.limit)),e}function o_(){Ye.executionHistory=[]}function a_(t){let e={success:!0,data:[],errors:[],totalDuration:0,successCount:0,failureCount:0};for(let r of t)e.totalDuration+=r.duration,r.success?(e.successCount++,r.data!==void 0&&r.data!==null&&e.data.push(r.data)):(e.success=!1,e.failureCount++,r.error&&e.errors.push({taskId:r.taskId,toolId:r.toolId,error:r.error.message||String(r.error)}));return e}function i_(t){return t.filter(e=>e.success).map(e=>e.data)}function l_(t){return t.filter(e=>!e.success).map(e=>({taskId:e.taskId,toolId:e.toolId,error:e.error}))}function c_(t={}){return{taskId:us(),startTime:Date.now(),signal:t.signal||null,apiConfig:t.apiConfig||null,bypassMessages:t.bypassMessages||[],context:t.context||{},metadata:t.metadata||{}}}function d_(t,e){return!e||e.length===0?t:[...e,...t]}function u_(t){return t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function Dg(t,e){let r=[],n=t.promptTemplate||"",s={"{{userMessage}}":e.input?.userMessage||"","{{lastAiMessage}}":e.input?.lastAiMessage||"","{{extractedContent}}":e.input?.extractedContent||"","{{previousToolOutput}}":e.input?.previousToolOutput||"","{{context}}":JSON.stringify(e.input?.context||{}),"{{pg}}":e.input?.context?.pg||"1","{{time}}":e.input?.context?.time||"","{{scene}}":e.input?.context?.scene||"","{{plot}}":e.input?.context?.plot||"","{{mq}}":e.input?.context?.mq||"\u2160","{{mqStatus}}":e.input?.context?.mqStatus||"\u8FDB\u884C\u4E2D","{{sq}}":e.input?.context?.sq||"1","{{sqStatus}}":e.input?.context?.sqStatus||"\u8FDB\u884C\u4E2D","{{latestSq}}":e.input?.context?.latestSq||"1","{{completed}}":e.input?.context?.completed||"\u65E0","{{defined}}":e.input?.context?.defined||"","{{status}}":e.input?.context?.status||"","{{seeds}}":e.input?.context?.seeds||"","{{name}}":e.input?.context?.name||"","{{location}}":e.input?.context?.location||"","{{condition}}":e.input?.context?.condition||"","{{equipment}}":e.input?.context?.equipment||"","{{skills}}":e.input?.context?.skills||""};for(let[o,a]of Object.entries(s))n=n.replace(new RegExp(u_(o),"g"),a);return r.push({role:"USER",content:n}),r}async function Bg(t,e,r={}){let n=xe(t);if(!n)return{success:!1,taskId:us(),toolId:t,error:"\u5DE5\u5177\u914D\u7F6E\u4E0D\u5B58\u5728",duration:0};if(!n.enabled)return{success:!1,taskId:us(),toolId:t,error:"\u5DE5\u5177\u672A\u542F\u7528",duration:0};let s=Date.now(),o=us();try{q.emit(G.TOOL_EXECUTION_STARTED,{toolId:t,taskId:o,context:e});let a=Dg(n,e);if(typeof r.callApi=="function"){let i=n.output?.apiPreset||n.apiPreset||"",l=i?{preset:i}:null,d=await r.callApi(a,l,r.signal),c=d;n.outputMode==="separate"&&n.extractTags?.length>0&&(c=p_(d,n.extractTags));let u={success:!0,taskId:o,toolId:t,data:c,duration:Date.now()-s};return q.emit(G.TOOL_EXECUTED,{toolId:t,taskId:o,result:u}),u}else return{success:!0,taskId:o,toolId:t,data:{messages:a,config:{apiPreset:n.output?.apiPreset||n.apiPreset||"",outputMode:n.outputMode,extractTags:n.extractTags}},duration:Date.now()-s,needsExecution:!0}}catch(a){Zd.error(`executeToolWithConfig \u5F02\u5E38 (toolId=${t})`,{error:a});let i={success:!1,taskId:o,toolId:t,error:a.message||String(a),duration:Date.now()-s};return q.emit(G.TOOL_EXECUTION_FAILED,{toolId:t,taskId:o,error:a}),i}}function p_(t,e){let r={};for(let n of e){let s=new RegExp(`<${n}[^>]*>([\\s\\S]*?)<\\/${n}>`,"gi"),o=t.match(s);o&&(r[n]=o.map(a=>{let i=a.match(new RegExp(`<${n}[^>]*>([\\s\\S]*?)<\\/${n}>`,"i"));return i?i[1].trim():""}))}return r}async function y_(t,e,r={}){let n=[];for(let s of t){let o=xe(s);if(o&&o.enabled){let a=await Bg(s,e,r);n.push(a)}}return n}var Zd,Ye,Xd,ha,tu=O(()=>{Ar();nt();Z();Zd=$.createScope("ToolExecutor"),Ye={activeControllers:new Map,executionQueue:[],runningCount:0,maxConcurrent:3,executionHistory:[],isPaused:!1};Xd=class{constructor(e=3){this.maxConcurrent=e,this.queue=[],this.running=new Map,this.isProcessing=!1}enqueue(e,r){return new Promise((n,s)=>{this.queue.push({executor:e,task:r,resolve:n,reject:s}),this.process()})}async process(){if(!this.isProcessing){for(this.isProcessing=!0;this.queue.length>0&&this.running.size<this.maxConcurrent;){let e=this.queue.shift();if(!e)continue;let{executor:r,task:n,resolve:s,reject:o}=e,a=new AbortController;n.abortController=a,n.status="running",n.startedAt=Date.now(),this.running.set(n.id,n),Ye.activeControllers.set(n.id,a),this.executeTask(r,n,a.signal).then(i=>{n.status="completed",n.completedAt=Date.now(),s(i)}).catch(i=>{n.status=i.name==="AbortError"?"aborted":"failed",n.completedAt=Date.now(),o(i)}).finally(()=>{this.running.delete(n.id),Ye.activeControllers.delete(n.id),Ye.runningCount=this.running.size})}this.isProcessing=!1}}async executeTask(e,r,n){let s=Date.now(),o=null;for(let a=0;a<=r.maxRetries;a++){if(n.aborted)throw new DOMException("\u4EFB\u52A1\u5DF2\u4E2D\u6B62","AbortError");try{let i=await e(n);return ol(r.id,r.toolId,!0,i,null,Date.now()-s,a)}catch(i){if(o=i,i.name==="AbortError")throw i;a===r.maxRetries&&Zd.error(`\u4EFB\u52A1\u6267\u884C\u5931\u8D25 (toolId=${r.toolId}, ${a+1}\u6B21\u91CD\u8BD5)`,{error:i}),a<r.maxRetries&&(await this.delay(1e3*(a+1)),r.retries=a+1)}}throw o}delay(e){return new Promise(r=>setTimeout(r,e))}abort(e){let r=Ye.activeControllers.get(e);return r?(r.abort(),!0):!1}abortAll(){for(let e of Ye.activeControllers.values())e.abort();Ye.activeControllers.clear(),this.queue=[],this.running.clear()}getStatus(){return{pending:this.queue.length,running:this.running.size,maxConcurrent:this.maxConcurrent}}},ha=null});async function f_(){return ru||(ru=Promise.resolve().then(()=>(tu(),eu))),ru}async function m_(t,e,r){return r&&t.output?.mode===Qt.POST_RESPONSE_API?Xt.runToolPostResponse(t,e):r&&t.output?.mode===Qt.FOLLOW_AI?Xt.runToolFollowAiManual(t,e):(await f_()).executeToolWithConfig(t.id,e)}function g_(t,e){return e?.runSource==="MANUAL"?t.output?.mode==="local_transform"||t.processor?.type?ps.MANUAL_LOCAL_TRANSFORM:t.output?.mode===Qt.POST_RESPONSE_API?ps.MANUAL_POST_RESPONSE_API:ps.MANUAL_COMPATIBILITY:ps.MANUAL_POST_RESPONSE_API}function al(t,e){try{nd(t,e)}catch(r){co.warn("\u66F4\u65B0\u5DE5\u5177\u8FD0\u884C\u65F6\u72B6\u6001\u5931\u8D25:",{toolId:t,error:r})}}async function h_(t,e){let r=Date.now(),n=t.id,s=`yyt-tool-run-${n}`,o=g_(t,e),a=e?.executionKey||"";al(n,{lastStatus:"running",lastError:"",lastDurationMs:0,lastTraceId:e?.traceId||"",lastMessageKey:e?.messageId||"",lastExecutionKey:a,lastExecutionPath:o,lastWritebackStatus:"",lastFailureStage:"",lastSlotBindingKey:e?.slotBindingKey||"",lastSlotRevisionKey:e?.slotRevisionKey||"",lastSlotTransactionId:e?.slotTransactionId||"",lastSourceMessageId:e?.sourceMessageId||e?.messageId||"",lastSourceSwipeId:e?.sourceSwipeId||e?.effectiveSwipeId||"",lastContentCommitted:!1,lastHostCommitApplied:!1,lastRefreshRequested:!1,lastRefreshConfirmed:!1,lastPreferredCommitMethod:"",lastAppliedCommitMethod:"",lastRefreshMethodCount:0,lastRefreshMethods:[],lastRefreshConfirmChecks:0,lastRefreshConfirmedBy:""}),co.info(`\u6B63\u5728\u624B\u52A8\u6267\u884C ${t.name}`,null,{topNotice:{sticky:!0,noticeId:s}});try{let i=o===ps.MANUAL_LOCAL_TRANSFORM?await sl(t,e):await m_(t,e,!0),l=Date.now()-r;if(i?.success){let y=xe(n),p=i?.meta?.writebackDetails||{};return al(n,{lastStatus:"success",lastError:"",lastDurationMs:l,lastTraceId:e?.traceId||"",successCount:(y?.runtime?.successCount||0)+1,lastMessageKey:e?.messageId||"",lastExecutionKey:a,lastExecutionPath:o,lastWritebackStatus:i?.meta?.writebackStatus||Xe.NOT_APPLICABLE,lastFailureStage:i?.meta?.failureStage||"",lastSlotBindingKey:e?.slotBindingKey||"",lastSlotRevisionKey:e?.slotRevisionKey||"",lastSlotTransactionId:e?.slotTransactionId||"",lastSourceMessageId:e?.sourceMessageId||e?.messageId||"",lastSourceSwipeId:e?.sourceSwipeId||e?.effectiveSwipeId||"",lastContentCommitted:!!p.contentCommitted,lastHostCommitApplied:!!p.hostCommitApplied,lastRefreshRequested:!!p.refreshRequested,lastRefreshConfirmed:!!p.refreshConfirmed,lastPreferredCommitMethod:p?.commit?.preferredMethod||"",lastAppliedCommitMethod:p?.commit?.appliedMethod||"",lastRefreshMethodCount:Array.isArray(p?.refresh?.requestMethods)?p.refresh.requestMethods.length:0,lastRefreshMethods:Array.isArray(p?.refresh?.requestMethods)?[...p.refresh.requestMethods]:[],lastRefreshConfirmChecks:Number(p?.refresh?.confirmChecks)||0,lastRefreshConfirmedBy:p?.refresh?.confirmedBy||""}),co.info(`${t.name} \u624B\u52A8\u6267\u884C\u5B8C\u6210`,null,{toast:"success",topNotice:{duration:3200,noticeId:s}}),{success:!0,duration:l,result:i}}let d=xe(n),c=i?.error||"\u5DE5\u5177\u6267\u884C\u5931\u8D25",u=i?.meta?.writebackDetails||{};return al(n,{lastStatus:"error",lastError:c,lastDurationMs:l,lastTraceId:e?.traceId||"",errorCount:(d?.runtime?.errorCount||0)+1,lastMessageKey:e?.messageId||"",lastExecutionKey:a,lastExecutionPath:o,lastWritebackStatus:i?.meta?.writebackStatus||Xe.NOT_APPLICABLE,lastFailureStage:i?.meta?.failureStage||(o===ps.MANUAL_COMPATIBILITY?lt.COMPATIBILITY_EXECUTE:lt.UNKNOWN),lastSlotBindingKey:e?.slotBindingKey||"",lastSlotRevisionKey:e?.slotRevisionKey||"",lastSlotTransactionId:e?.slotTransactionId||"",lastSourceMessageId:e?.sourceMessageId||e?.messageId||"",lastSourceSwipeId:e?.sourceSwipeId||e?.effectiveSwipeId||"",lastContentCommitted:!!u.contentCommitted,lastHostCommitApplied:!!u.hostCommitApplied,lastRefreshRequested:!!u.refreshRequested,lastRefreshConfirmed:!!u.refreshConfirmed,lastPreferredCommitMethod:u?.commit?.preferredMethod||"",lastAppliedCommitMethod:u?.commit?.appliedMethod||"",lastRefreshMethodCount:Array.isArray(u?.refresh?.requestMethods)?u.refresh.requestMethods.length:0,lastRefreshMethods:Array.isArray(u?.refresh?.requestMethods)?[...u.refresh.requestMethods]:[],lastRefreshConfirmChecks:Number(u?.refresh?.confirmChecks)||0,lastRefreshConfirmedBy:u?.refresh?.confirmedBy||""}),co.error(`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${c}`,null,{toast:!0,topNotice:{sticky:!0,noticeId:s}}),{success:!1,duration:l,error:c,result:i}}catch(i){let l=Date.now()-r,d=xe(n),c=i?.message||String(i);throw al(n,{lastStatus:"error",lastError:c,lastDurationMs:l,lastTraceId:e?.traceId||"",errorCount:(d?.runtime?.errorCount||0)+1,lastMessageKey:e?.messageId||"",lastExecutionKey:a,lastExecutionPath:o,lastWritebackStatus:Xe.NOT_APPLICABLE,lastFailureStage:o===ps.MANUAL_COMPATIBILITY?lt.COMPATIBILITY_EXECUTE:lt.UNKNOWN,lastSlotBindingKey:e?.slotBindingKey||"",lastSlotRevisionKey:e?.slotRevisionKey||"",lastSlotTransactionId:e?.slotTransactionId||"",lastSourceMessageId:e?.sourceMessageId||e?.messageId||"",lastSourceSwipeId:e?.sourceSwipeId||e?.effectiveSwipeId||"",lastContentCommitted:!1,lastHostCommitApplied:!1,lastRefreshRequested:!1,lastRefreshConfirmed:!1,lastPreferredCommitMethod:"",lastAppliedCommitMethod:"",lastRefreshMethodCount:0,lastRefreshMethods:[],lastRefreshConfirmChecks:0,lastRefreshConfirmedBy:""}),co.error(`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${c}`,null,{toast:!0,topNotice:{sticky:!0,noticeId:s}}),i}}async function il(t){if(!t)return{success:!1,error:"\u7F3A\u5C11\u5DE5\u5177ID"};let e=xe(t);if(!e)return{success:!1,error:"\u5DE5\u5177\u4E0D\u5B58\u5728"};if(!e.enabled)return ln(t,{lastMessageKey:"",lastExecutionKey:"",lastExecutionPath:"",lastWritebackStatus:Xe.NOT_APPLICABLE,lastFailureStage:"",lastContentCommitted:!1,lastHostCommitApplied:!1,lastRefreshRequested:!1,lastRefreshConfirmed:!1,lastPreferredCommitMethod:"",lastAppliedCommitMethod:"",lastRefreshMethodCount:0,lastRefreshMethods:[],lastRefreshConfirmChecks:0,lastRefreshConfirmedBy:""},{touchLastRunAt:!1,emitEvent:!1}),co.warn(`${e.name} \u672A\u542F\u7528\uFF0C\u65E0\u6CD5\u624B\u52A8\u6267\u884C`,null,{topNotice:{duration:2800,noticeId:`yyt-tool-run-${t}`}}),{success:!1,error:"\u5DE5\u5177\u672A\u542F\u7528"};let r=await Gn({runSource:"MANUAL"});return h_(e,r)}async function ll(t){if(!t)return{success:!1,error:"\u7F3A\u5C11\u5DE5\u5177ID"};let e=xe(t);if(!e)return{success:!1,error:"\u5DE5\u5177\u4E0D\u5B58\u5728"};let r=await Gn({runSource:"MANUAL_PREVIEW"});return Xt.previewExtraction(e,r)}var co,ps,ru,nu=O(()=>{Ar();ga();Vn();Qd();Z();co=$.createScope("ToolTrigger"),ps={MANUAL_POST_RESPONSE_API:"manual_post_response_api",MANUAL_LOCAL_TRANSFORM:"manual_local_transform",MANUAL_COMPATIBILITY:"manual_compatibility"},ru=null});var Kg={};he(Kg,{TOOL_CONFIG_PANEL_STYLES:()=>su,createToolConfigPanel:()=>_n,default:()=>A_});function zg(t){return t?t.length!==void 0&&typeof t.get=="function"?t.get(0):t:null}function b_(t){if(!Number.isFinite(t)||t<=0)return"\u4ECE\u672A";let e=Date.now()-t;if(e<6e4)return`${Math.floor(e/1e3)} \u79D2\u524D`;if(e<36e5)return`${Math.floor(e/6e4)} \u5206\u949F\u524D`;if(e<864e5)return`${Math.floor(e/36e5)} \u5C0F\u65F6\u524D`;try{return new Date(t).toLocaleString()}catch{return"\u672A\u77E5"}}function x_(t){if(!t)return null;let e=t.closest(".yyt-popup-body");if(!e)return Pr.warn("pinToolPanelHeight: \u627E\u4E0D\u5230 .yyt-popup-body \u7956\u5148"),null;let r=()=>{let s=t.querySelector(".yyt-tool-panel");if(!s)return;let o=e.getBoundingClientRect(),a=s.getBoundingClientRect(),i=o.bottom-a.top-8;i>100?s.style.height=`${i}px`:Pr.warn(`pinToolPanelHeight: \u8BA1\u7B97\u9AD8\u5EA6\u5F02\u5E38 h=${i}`)};if(r(),requestAnimationFrame(()=>requestAnimationFrame(r)),typeof ResizeObserver>"u")return null;let n=new ResizeObserver(()=>r());return n.observe(e),()=>{try{n.disconnect()}catch{}}}function w_(t){if(!t)return;let e=t.querySelector(".yyt-tool-panel-hero"),r=t.querySelector(".yyt-tool-panel-scroll");if(!e||!r)return;let n=()=>{r.scrollTop>0?e.classList.add("yyt-tool-panel-hero--compact"):e.classList.remove("yyt-tool-panel-hero--compact")};n(),r.addEventListener("scroll",n,{passive:!0})}function _n(t={}){let{id:e,toolId:r,postResponseHint:n,previewDialogId:s,previewTitle:o="\u6D4B\u8BD5\u63D0\u53D6\u7ED3\u679C"}=t;return{id:e,toolId:r,renderTo(a){let i=zg(a);if(!i)return;if(i._yytToolPanelCleanup)try{i._yytToolPanelCleanup()}catch{}let l=()=>this.renderTo(a),d=xe(r);if(!d){i.innerHTML='<div class="yyt-empty-state-small">\u5DE5\u5177\u914D\u7F6E\u52A0\u8F7D\u5931\u8D25</div>';return}let c=f("div",{className:"yyt-tool-panel",dataset:{toolId:r}}),u=[];c.appendChild(v_(d,r,l,n));let y=f("div",{className:"yyt-tool-panel-scroll"});y.appendChild(S_(d));let p=T_(d,r,l);u.push(p),y.appendChild(p.el);let m=__(d,r,l,a,s,o);u.push(m),y.appendChild(m.el),c.appendChild(y),i.innerHTML="",i.appendChild(c);let g=x_(i);w_(i),i._yytToolPanelCleanup=()=>{for(let h of u)try{h.destroy()}catch{}if(typeof g=="function")try{g()}catch{}delete i._yytToolPanelCleanup}},destroy(a){let i=zg(a);if(i?._yytToolPanelCleanup)try{i._yytToolPanelCleanup()}catch{}},getStyles(){return su}}}function v_(t,e,r,n){let s=f("div",{className:"yyt-tool-panel-hero"}),o=f("div",{className:"yyt-tool-panel-hero-row1"});o.appendChild(f("div",{className:"yyt-tool-panel-hero-icon",text:"\u{1F527}"})),o.appendChild(f("div",{className:"yyt-tool-panel-hero-name",text:t.name||e}));let a=f("div",{className:"yyt-tool-panel-hero-actions"});a.appendChild(se({label:"\u25B6 \u7ACB\u5373\u6267\u884C\u4E00\u6B21",size:"small",onClick:async()=>{try{await il(e),Pr.info("\u5DF2\u89E6\u53D1\u624B\u52A8\u6267\u884C",null,{toast:"success"})}catch(m){Pr.error(`\u6267\u884C\u5931\u8D25\uFF1A${m?.message||m}`,null,{toast:!0})}}}).el),a.appendChild(se({label:"\u{1F4BE} \u4FDD\u5B58\u914D\u7F6E",size:"small",variant:"primary",onClick:()=>{Pr.info("\u914D\u7F6E\u5DF2\u4FDD\u5B58",null,{toast:"success"}),r()}}).el),o.appendChild(a),s.appendChild(o),t.description&&s.appendChild(f("div",{className:"yyt-tool-panel-hero-desc",text:t.description}));let i=f("div",{className:"yyt-tool-panel-hero-chips"}),d=(t.output?.mode||"follow_ai")==="post_response_api"?"\u989D\u5916 AI \u89E3\u6790\uFF08\u81EA\u52A8\uFF09":"\u968F AI \u8F93\u51FA\uFF08\u624B\u52A8\uFF09";i.appendChild(f("span",{className:"yyt-tool-hero-chip mode",text:d}));let c=t.output?.apiPreset||t.apiPreset||"";c&&i.appendChild(f("span",{className:"yyt-tool-hero-chip preset",text:`API: ${c}`}));let u=t.extraction?.regexPresetId||"";if(u){let m=Oe.getPreset(u);i.appendChild(f("span",{className:"yyt-tool-hero-chip preset",text:`\u6B63\u5219: ${m?m.name:"\u5DF2\u5220\u9664"}`}))}else i.appendChild(f("span",{className:"yyt-tool-hero-chip",text:"\u6B63\u5219: \u672A\u7ED1\u5B9A",style:{opacity:"0.6"}}));let y=t.worldbooks?.presetId||"";if(y){let m=vt.getPreset(y);m&&i.appendChild(f("span",{className:"yyt-tool-hero-chip preset",text:`\u4E16\u754C\u4E66: ${m.name}`}))}let p=t.runtime?.lastStatus;if(p){let m=p==="success"?"status-success":p==="failed"?"status-failed":"";i.appendChild(f("span",{className:`yyt-tool-hero-chip ${m}`,text:`\u4E0A\u6B21\u6267\u884C \xB7 ${p}`}))}return s.appendChild(i),s}function S_(t){let e=f("div",{className:"yyt-tool-runtime-row"}),r=t.runtime||{},n=(a,i,l="")=>{let d=f("div",{className:"yyt-tool-runtime-stat"});return d.appendChild(f("span",{className:"yyt-tool-runtime-stat-label",text:a})),d.appendChild(f("span",{className:`yyt-tool-runtime-stat-value ${l}`,text:i})),d},s=r.lastStatus==="success"?"\u2713 \u4E0A\u6B21\u6210\u529F":r.lastStatus==="failed"?"\u2717 \u4E0A\u6B21\u5931\u8D25":r.lastStatus==="idle"?"\u5F85\u547D":r.lastStatus||"\u5F85\u547D",o=r.lastStatus==="success"?"success":r.lastStatus==="failed"?"error":"muted";return e.appendChild(n("\u72B6\u6001",s,o)),e.appendChild(n("\u6700\u8FD1\u8FD0\u884C",b_(r.lastRunAt),"muted")),e.appendChild(n("\u6210\u529F",String(r.successCount||0),"success")),e.appendChild(n("\u5931\u8D25",String(r.errorCount||0),r.errorCount?"error":"muted")),e}function T_(t,e,r){let n=f("div",{style:{display:"flex",flexDirection:"column"}});n.appendChild(ba({label:"\u8F93\u51FA\u6A21\u5F0F",hint:"\u51B3\u5B9A\u6267\u884C\u8DEF\u5F84 + \u81EA\u52A8/\u624B\u52A8",control:Me({value:t.output?.mode||"follow_ai",options:[{value:"follow_ai",label:"follow_ai \u2014 \u968F AI \u8F93\u51FA\uFF08\u624B\u52A8\u89E6\u53D1\uFF09"},{value:"post_response_api",label:"post_response_api \u2014 \u989D\u5916 AI \u89E3\u6790\uFF08\u81EA\u52A8\uFF09"}],onChange:l=>{let d=xe(e)||{};Ue(e,{...d,output:{...d.output||{},mode:l,enabled:l==="post_response_api"}}),r()}})}));let s=(()=>{try{return Zr()||[]}catch{return[]}})();n.appendChild(ba({label:"API \u9884\u8BBE",hint:"\u989D\u5916 AI \u89E3\u6790\u65F6\u4F7F\u7528",control:Me({value:t.output?.apiPreset||t.apiPreset||"",options:[{value:"",label:"\u2014\u2014 \u8DDF\u968F\u5F53\u524D\u4E3B API \u2014\u2014"},...s.map(l=>({value:l.name,label:l.name}))],onChange:l=>{let d=xe(e)||{};Ue(e,{...d,apiPreset:l,output:{...d.output||{},apiPreset:l}}),r()}})}));let o=(()=>{try{return ya()||[]}catch{return[]}})();n.appendChild(ba({label:"Ai \u6307\u4EE4\u9884\u8BBE",hint:'\u9644\u52A0\u5728 system/user \u524D\u7684\u6307\u4EE4\uFF1B\u9009"\u65E0"\u5373\u4E0D\u542F\u7528',control:Me({value:t.bypass?.enabled&&t.bypass?.presetId||"",options:[{value:"",label:"\u2014\u2014 \u65E0 \u2014\u2014"},...o.map(l=>({value:l.id,label:`${l.name}${l.isDefault?" [\u9ED8\u8BA4]":""}`}))],onChange:l=>{let d=xe(e)||{};Ue(e,{...d,bypass:{enabled:!!l,presetId:l||""}}),r()}})}));let a=Oe.listPresets();n.appendChild(ba({label:"\u6B63\u5219\u63D0\u53D6\u9884\u8BBE",hint:"\u51B3\u5B9A\u4ECE AI \u56DE\u590D\u4E2D\u5982\u4F55\u62BD\u53D6",control:Me({value:t.extraction?.regexPresetId||"",options:[{value:"",label:"\u2014\u2014 \u65E0\uFF08\u4E0D\u8FDB\u884C\u63D0\u53D6\uFF09 \u2014\u2014"},...a.map(l=>({value:l.id,label:l.name}))],onChange:l=>{let d=xe(e)||{},c={...d.extraction||{},regexPresetId:l};if(l){let u=Oe.getPreset(l);Pr.info(`\u5DF2\u7ED1\u5B9A\u6B63\u5219\u9884\u8BBE\uFF1A${u?.name||l}`,null,{toast:"success"})}else Pr.info("\u5DF2\u89E3\u7ED1\u6B63\u5219\u9884\u8BBE\uFF0C\u5DE5\u5177\u5C06\u4E0D\u8FDB\u884C\u5185\u5BB9\u63D0\u53D6",null,{toast:"success"});Ue(e,{...d,extraction:c}),r()}})}));let i=vt.listPresets();return n.appendChild(ba({label:"\u4E16\u754C\u4E66\u9884\u8BBE",hint:"\u6CE8\u5165\u5230 prompt \u7684 {{toolWorldbookContent}}",control:Me({value:t.worldbooks?.presetId||"",options:[{value:"",label:"\u2014\u2014 \u65E0\uFF08\u4FDD\u7559\u5DE5\u5177\u539F\u6709\u4E16\u754C\u4E66\u8BBE\u7F6E\uFF09 \u2014\u2014"},...i.map(l=>({value:l.id,label:l.name}))],onChange:l=>{let d=xe(e)||{},c={...d.worldbooks||{},presetId:l};if(l){let u=vt.getPreset(l);Pr.info(`\u5DF2\u7ED1\u5B9A\u4E16\u754C\u4E66\u9884\u8BBE\uFF1A${u?.name||l}`,null,{toast:"success"})}else Pr.info("\u5DF2\u89E3\u7ED1\u4E16\u754C\u4E66\u9884\u8BBE\uFF0C\u5DE5\u5177\u4E0D\u518D\u6CE8\u5165\u4E16\u754C\u4E66\u5185\u5BB9",null,{toast:"success"});Ue(e,{...d,worldbooks:c}),r()}})})),dr({heading:"\u7ED1\u5B9A",icon:"\u{1F517}",content:[n]})}function ba({label:t,hint:e,control:r}){let n=f("div",{className:"yyt-tool-binding-row"}),s=f("div",{className:"yyt-tool-binding-label"});return s.appendChild(f("span",{className:"yyt-tool-binding-label-text",text:t})),e&&s.appendChild(f("span",{className:"yyt-tool-binding-label-hint",text:e})),n.appendChild(s),r.el.classList.add("small"),Object.assign(r.el.style,{padding:"7px 10px",fontSize:"12px"}),n.appendChild(r.el),n.appendChild(f("div",{className:"yyt-tool-binding-meta"})),n}function __(t,e,r,n,s,o){let a=f("div",{style:{display:"flex",flexDirection:"column"}});a.appendChild(f("div",{style:{marginBottom:"8px",display:"flex",alignItems:"center",gap:"10px"}},f("div",{style:{flex:"1"}},f("div",{text:"\u63D0\u793A\u8BCD\u6A21\u677F",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}}),f("div",{text:"\u7528 {{macro}} \u5F15\u7528\u4E0A\u4E0B\u6587\u3002\u6A21\u677F\u5185\u5BB9\u4F1A\u4F5C\u4E3A\u53D1\u7ED9\u989D\u5916 AI \u7684 user \u6D88\u606F\u3002",style:{fontSize:"11px",color:"var(--yyt-text-muted)",lineHeight:"1.6"}})),se({label:"\u{1F504} \u91CD\u7F6E\u4E3A\u9ED8\u8BA4",size:"small",variant:"ghost",onClick:()=>{if(!window.confirm("\u7528\u5DE5\u5177\u9ED8\u8BA4\u6A21\u677F\u8986\u76D6\u5F53\u524D\u6A21\u677F\uFF1F"))return;let b=Si(e)||{},v=xe(e)||{};Ue(e,{...v,promptTemplate:b.promptTemplate||""}),r()}}).el));let i=f("textarea",{className:"yyt-textarea yyt-code-textarea",attrs:{rows:"10",placeholder:"\u8F93\u5165\u63D0\u793A\u8BCD\u6A21\u677F..."},style:{width:"100%",resize:"vertical",fontFamily:"ui-monospace, monospace",fontSize:"12px",lineHeight:"1.7"}});i.value=t.promptTemplate||"",i.addEventListener("change",()=>{let b=xe(e)||{};Ue(e,{...b,promptTemplate:i.value})}),a.appendChild(i),a.appendChild(f("div",{className:"yyt-macro-inline",html:"\u53EF\u7528\u5B8F\uFF1A<code>{{toolPromptMacro}}</code> <code>{{toolContentMacro}}</code> <code>{{toolWorldbookContent}}</code> <code>{{lastAiMessage}}</code> <code>{{recentMessagesText}}</code> <code>{{rawRecentMessagesText}}</code> <code>{{userMessage}}</code> <code>{{toolName}}</code> <code>{{toolId}}</code>"})),a.appendChild(f("hr",{className:"yyt-zone-divider"})),a.appendChild(f("div",{style:{marginBottom:"8px"}},f("div",{text:"\u63D0\u53D6\u914D\u7F6E",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}}),f("div",{text:'\u4ECE AI \u56DE\u590D\u4E2D\u62BD\u53D6\u5E76\u5199\u56DE\u3002\u5B8C\u6574\u89C4\u5219\u7531"\u6B63\u5219\u63D0\u53D6\u9884\u8BBE"\u51B3\u5B9A\uFF0C\u8FD9\u91CC\u53EA\u914D\u7F6E\u5DE5\u5177\u53C2\u6570\u3002',style:{fontSize:"11px",color:"var(--yyt-text-muted)",lineHeight:"1.6"}})));let l=f("div",{style:{display:"grid",gridTemplateColumns:"1fr auto",gap:"12px",alignItems:"end",marginBottom:"12px"}}),d=f("div",{className:"yyt-form-group",style:{margin:0}});d.appendChild(f("label",{text:"\u6700\u5927\u63D0\u53D6 AI \u6D88\u606F\u6570",style:{fontSize:"12px",fontWeight:"600",color:"var(--yyt-text-secondary, rgba(255,255,255,0.55))"}}));let c=f("input",{className:"yyt-input",attrs:{type:"number",min:"1",max:"50"},style:{padding:"7px 10px",fontSize:"12px"}});c.value=String(Number(t.extraction?.maxMessages)||5),c.addEventListener("change",()=>{let b=xe(e)||{};Ue(e,{...b,extraction:{...b.extraction||{},maxMessages:Math.max(1,parseInt(c.value,10)||5)}})}),d.appendChild(c),l.appendChild(d);let u=f("div",{className:"yyt-form-group",style:{margin:0}});u.appendChild(f("label",{html:"&nbsp;",style:{fontSize:"12px"}})),u.appendChild(se({label:"\u{1F50D} \u6D4B\u8BD5\u63D0\u53D6",onClick:async()=>{try{let b=await ll(e);E_(n,b,s,o)}catch(b){Pr.error(`\u6D4B\u8BD5\u63D0\u53D6\u5931\u8D25\uFF1A${b?.message||b}`,null,{toast:!0})}}}).el),l.appendChild(u),a.appendChild(l);let y=f("div",{className:"yyt-form-group",style:{margin:0}});y.appendChild(f("label",{html:'\u5199\u56DE\u6807\u7B7E <span style="font-size:10px;color:var(--yyt-text-muted);font-weight:500;">\uFF08\u591A\u6807\u7B7E\u63D0\u53D6\u65F6\u6307\u5B9A\u552F\u4E00\u5199\u56DE\u6807\u7B7E\uFF1B\u7559\u7A7A\u5219\u63D0\u53D6\u9996\u4E2A\uFF09</span>',style:{fontSize:"12px",fontWeight:"600",color:"var(--yyt-text-secondary, rgba(255,255,255,0.55))"}}));let p=`yyt-writeback-dl-${e}-${Math.random().toString(36).slice(2,6)}`,m=f("datalist",{attrs:{id:p}}),g=(()=>{let b=new Set,v=[];function x(E){if(E)for(let w of E.rules||[]){if(w?.enabled===!1||w?.type!=="include")continue;let _=String(w.value||"").trim();!_||b.has(_)||(b.add(_),v.push(_))}}let T=t.extraction?.regexPresetId;if(T)x(Oe.getPreset(T));else for(let E of Oe.listPresets())x(E);return v})();for(let b of g)m.appendChild(f("option",{attrs:{value:b}}));let h=f("input",{className:"yyt-input",attrs:{type:"text",placeholder:"\u5982 status / content\uFF08\u6765\u81EA\u6B63\u5219\u9884\u8BBE\u7684 include \u6807\u7B7E\uFF09",list:p,autocomplete:"off"},style:{padding:"7px 10px",fontSize:"12px"}});return h.value=t.extraction?.writebackTag||"",h.addEventListener("change",()=>{let b=xe(e)||{};Ue(e,{...b,extraction:{...b.extraction||{},writebackTag:h.value.trim()}})}),y.appendChild(h),y.appendChild(m),a.appendChild(y),dr({heading:"\u914D\u7F6E",icon:"\u2699",content:[a]})}function E_(t,e,r,n){if(!ue()||!Ke(t))return;let o=`${zn}-${r||"extraction-preview"}`,a=Array.isArray(e?.messageEntries)?e.messageEntries:[],i=a.length>0?`
      <div class="yyt-form-group">
        <label>\u9010\u6761\u6D88\u606F\u9884\u89C8</label>
        <div class="yyt-preview-message-list">
          ${a.map((l,d)=>{let c=d===a.length-1?"\u6700\u65B0\u6D88\u606F":`\u6700\u8FD1\u7684\u7B2C ${a.length-d} \u6761\u6D88\u606F`;return`
              <div class="yyt-preview-message-item">
                <div class="yyt-preview-message-title">${Tn(c)}</div>
                <div><label>\u539F\u6587</label><pre class="yyt-preview-box yyt-preview-pre">${Tn(l.rawText||"\u65E0\u53EF\u7528\u6D88\u606F")}</pre></div>
                <div><label>\u6B63\u6587\u63D0\u53D6</label><pre class="yyt-preview-box yyt-preview-pre">${Tn(l.filteredText||"\u6B63\u6587\u89C4\u5219\u672A\u547D\u4E2D")}</pre></div>
                <div><label>\u5DE5\u5177\u6807\u7B7E\u63D0\u53D6</label><pre class="yyt-preview-box yyt-preview-pre">${Tn(l.extractedText||"\u672A\u63D0\u53D6\u5230\u5185\u5BB9")}</pre></div>
              </div>
            `}).join("")}
        </div>
      </div>
    `:"";t.append(Po({id:o,title:n,width:"720px",wide:!0,body:`
      <div class="yyt-form-group">
        <label>\u63D0\u53D6\u89C4\u5219</label>
        <div class="yyt-preview-box">${Tn((e?.selectors||[]).join(`
`)||"\u65E0")}</div>
      </div>
      <div class="yyt-form-group">
        <label>\u539F\u59CB\u5185\u5BB9\u6C47\u603B</label>
        <pre class="yyt-preview-box yyt-preview-pre">${Tn(e?.sourceText||"\u65E0\u53EF\u7528\u6D88\u606F")}</pre>
      </div>
      <div class="yyt-form-group">
        <label>\u6B63\u6587\u63D0\u53D6\u6C47\u603B</label>
        <pre class="yyt-preview-box yyt-preview-pre">${Tn(e?.filteredSourceText||"\u6B63\u6587\u89C4\u5219\u672A\u547D\u4E2D")}</pre>
      </div>
      <div class="yyt-form-group">
        <label>\u5DE5\u5177\u6807\u7B7E\u63D0\u53D6\u6C47\u603B</label>
        <pre class="yyt-preview-box yyt-preview-pre">${Tn(e?.extractedText||"\u672A\u63D0\u53D6\u5230\u5185\u5BB9")}</pre>
      </div>
      ${i}
    `})),No(t,o,{onSave:l=>l()}),t.find(`#${o}-save`).text("\u5173\u95ED"),t.find(`#${o}-cancel`).remove()}function Tn(t){return t==null?"":String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var Pr,su,A_,uo=O(()=>{It();pt();pt();Ar();ks();so();nu();Z();dn();Rs();Pr=$.createScope("ToolConfigPanel"),su=`
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
`;A_=_n});var Ug={};he(Ug,{SummaryToolPanel:()=>Fg,default:()=>C_});var Fg,C_,jg=O(()=>{uo();Fg=_n({id:"summaryToolPanel",toolId:"summaryTool",postResponseHint:"\u70B9\u51FB\u201C\u7ACB\u5373\u6267\u884C\u4E00\u6B21\u201D\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u8FDB\u884C\u6458\u8981\u89E3\u6790\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 boo_FM
\u6216 regex:<boo_FM>([\\s\\S]*?)</boo_FM>`,previewDialogId:"summary-extraction-preview",defaultInjectionOrder:1e4,lorebookLogTag:"SummaryToolPanel"}),C_=Fg});var Hg={};he(Hg,{StatusBlockPanel:()=>Wg,default:()=>k_});var Wg,k_,qg=O(()=>{uo();Wg=_n({id:"statusBlockPanel",toolId:"statusBlock",postResponseHint:"\u70B9\u51FB\u201C\u7ACB\u5373\u6267\u884C\u4E00\u6B21\u201D\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u751F\u6210\u4E3B\u89D2\u72B6\u6001\u680F\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 status_block
\u6216 regex:<status_block>([\\s\\S]*?)</status_block>`,previewDialogId:"status-extraction-preview",defaultInjectionOrder:10001,lorebookLogTag:"StatusBlockPanel"}),k_=Wg});var Yg={};he(Yg,{YouyouReviewPanel:()=>Gg,default:()=>I_});var Gg,I_,Vg=O(()=>{uo();Gg=_n({id:"youyouReviewPanel",toolId:"youyouReview",postResponseHint:"\u70B9\u51FB\u201C\u7ACB\u5373\u6267\u884C\u4E00\u6B21\u201D\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u5728\u672B\u5C3E\u751F\u6210\u5C0F\u5E7D\u70B9\u8BC4\u4E0E\u5267\u60C5\u94A9\u5B50\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 youyou
\u6216 regex:<youyou>([\\s\\S]*?)</youyou>`,previewDialogId:"youyou-review-extraction-preview",previewTitle:"\u5C0F\u5E7D\u70B9\u8BC4\u63D0\u53D6\u9884\u89C8"}),I_=Gg});function Jg(t){return t?t.length!==void 0&&typeof t.get=="function"?t.get(0):t:null}function R_(t){if(!Number.isFinite(t)||t<=0)return"\u4ECE\u672A";let e=Date.now()-t;if(e<6e4)return`${Math.floor(e/1e3)} \u79D2\u524D`;if(e<36e5)return`${Math.floor(e/6e4)} \u5206\u949F\u524D`;if(e<864e5)return`${Math.floor(e/36e5)} \u5C0F\u65F6\u524D`;try{return new Date(t).toLocaleString()}catch{return"\u672A\u77E5"}}function En(t){return t==null?"":String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function cl(t={}){let{id:e,toolId:r,previewDialogId:n,previewTitle:s="\u6D4B\u8BD5\u63D0\u53D6\u7ED3\u679C",processorDirections:o=[],processorOptions:a=[],heroHint:i=""}=t;return{id:e,toolId:r,renderTo(l){let d=Jg(l);if(!d)return;if(d._yytLocalToolPanelCleanup)try{d._yytLocalToolPanelCleanup()}catch{}let c=()=>this.renderTo(l),u=xe(r);if(!u){d.innerHTML='<div class="yyt-empty-state-small">\u5DE5\u5177\u914D\u7F6E\u52A0\u8F7D\u5931\u8D25</div>';return}let y=f("div",{className:"yyt-tool-panel",dataset:{toolId:r}}),p=[];y.appendChild(M_(u,r,c,o,i)),y.appendChild(P_(u));let m=N_(u,r,c);p.push(m),y.appendChild(m.el);let g=$_(u,r,c,l,o,a,n,s);p.push(g),y.appendChild(g.el),d.innerHTML="",d.appendChild(y),d._yytLocalToolPanelCleanup=()=>{for(let h of p)try{h.destroy()}catch{}delete d._yytLocalToolPanelCleanup}},destroy(l){let d=Jg(l);if(d?._yytLocalToolPanelCleanup)try{d._yytLocalToolPanelCleanup()}catch{}},getStyles(){return""}}}function M_(t,e,r,n,s){let o=f("div",{className:"yyt-tool-panel-hero"}),a=f("div",{className:"yyt-tool-panel-hero-row1"});a.appendChild(f("div",{className:"yyt-tool-panel-hero-icon",text:"\u2699"})),a.appendChild(f("div",{className:"yyt-tool-panel-hero-name",text:t.name||e}));let i=f("div",{className:"yyt-tool-panel-hero-actions"});i.appendChild(se({label:"\u25B6 \u7ACB\u5373\u6267\u884C\u4E00\u6B21",size:"small",onClick:async()=>{try{await il(e),po.info("\u5DF2\u89E6\u53D1\u624B\u52A8\u6267\u884C",null,{toast:"success"})}catch(g){po.error(`\u6267\u884C\u5931\u8D25\uFF1A${g?.message||g}`,null,{toast:!0})}}}).el),i.appendChild(se({label:"\u{1F4BE} \u4FDD\u5B58\u914D\u7F6E",size:"small",variant:"primary",onClick:()=>{po.info("\u914D\u7F6E\u5DF2\u4FDD\u5B58",null,{toast:"success"}),r()}}).el),a.appendChild(i),o.appendChild(a),t.description&&o.appendChild(f("div",{className:"yyt-tool-panel-hero-desc",text:t.description})),s&&o.appendChild(f("div",{className:"yyt-tool-panel-hero-desc",text:s}));let l=f("div",{className:"yyt-tool-panel-hero-chips"}),d=t.output?.autoTrigger!==!1;l.appendChild(f("span",{className:"yyt-tool-hero-chip mode",text:`\u672C\u5730\u811A\u672C\uFF08${d?"\u81EA\u52A8":"\u624B\u52A8"}\uFF09`}));let c=t.processor?.direction||n[0]?.key||"",u=n.find(g=>g.key===c)?.label||c;u&&l.appendChild(f("span",{className:"yyt-tool-hero-chip preset",text:`\u65B9\u5411: ${u}`}));let y=t.output?.overwrite!==!1;l.appendChild(f("span",{className:"yyt-tool-hero-chip preset",text:`\u5199\u56DE: ${y?"\u8986\u76D6":"\u8FFD\u52A0"}`}));let p=t.extraction?.regexPresetId||"";if(p){let g=Oe.getPreset(p);g&&l.appendChild(f("span",{className:"yyt-tool-hero-chip preset",text:`\u6B63\u5219: ${g.name}`}))}let m=t.runtime?.lastStatus;if(m){let g=m==="success"?"status-success":m==="failed"?"status-failed":"";l.appendChild(f("span",{className:`yyt-tool-hero-chip ${g}`,text:`\u4E0A\u6B21\u6267\u884C \xB7 ${m}`}))}return o.appendChild(l),o}function P_(t){let e=f("div",{className:"yyt-tool-runtime-row"}),r=t.runtime||{},n=(a,i,l="")=>{let d=f("div",{className:"yyt-tool-runtime-stat"});return d.appendChild(f("span",{className:"yyt-tool-runtime-stat-label",text:a})),d.appendChild(f("span",{className:`yyt-tool-runtime-stat-value ${l}`,text:i})),d},s=r.lastStatus==="success"?"\u2713 \u4E0A\u6B21\u6210\u529F":r.lastStatus==="failed"?"\u2717 \u4E0A\u6B21\u5931\u8D25":"\u5F85\u547D",o=r.lastStatus==="success"?"success":r.lastStatus==="failed"?"error":"muted";return e.appendChild(n("\u72B6\u6001",s,o)),e.appendChild(n("\u6700\u8FD1\u8FD0\u884C",R_(r.lastRunAt),"muted")),e.appendChild(n("\u6210\u529F",String(r.successCount||0),"success")),e.appendChild(n("\u5931\u8D25",String(r.errorCount||0),r.errorCount?"error":"muted")),e}function N_(t,e,r){let n=f("div",{style:{display:"flex",flexDirection:"column"}}),s=Oe.listPresets();return n.appendChild(ou({label:"\u6B63\u5219\u63D0\u53D6\u9884\u8BBE",hint:"\u51B3\u5B9A\u4ECE AI \u56DE\u590D\u4E2D\u5982\u4F55\u62BD\u53D6\u8981\u672C\u5730\u5904\u7406\u7684\u6587\u672C",control:Me({value:t.extraction?.regexPresetId||"",options:[{value:"",label:"\u2014\u2014 \u65E0\uFF08\u4E0D\u8FDB\u884C\u63D0\u53D6\uFF09 \u2014\u2014"},...s.map(o=>({value:o.id,label:o.name}))],onChange:o=>{let a=xe(e)||{},i={...a.extraction||{},regexPresetId:o};if(o){let l=Oe.getPreset(o);po.info(`\u5DF2\u7ED1\u5B9A\u6B63\u5219\u9884\u8BBE\uFF1A${l?.name||o}`,null,{toast:"success"})}else po.info("\u5DF2\u89E3\u7ED1\u6B63\u5219\u9884\u8BBE\uFF0C\u5DE5\u5177\u5C06\u4E0D\u8FDB\u884C\u5185\u5BB9\u63D0\u53D6",null,{toast:"success"});Ue(e,{...a,extraction:i}),r()}})})),n.appendChild(ou({label:"\u5199\u56DE\u65B9\u5F0F",hint:"\u5904\u7406\u540E\u7684\u7ED3\u679C\u5982\u4F55\u56DE\u5199\u5230 AI \u6D88\u606F",control:Me({value:t.output?.overwrite!==!1?"replace":"append",options:[{value:"replace",label:"\u8986\u76D6\u539F\u5DE5\u5177\u5757"},{value:"append",label:"\u8FFD\u52A0\u5230\u672B\u5C3E"}],onChange:o=>{let a=xe(e)||{};Ue(e,{...a,output:{...a.output||{},overwrite:o==="replace",enabled:!0,mode:"local_transform"}}),r()}})})),n.appendChild(ou({label:"\u81EA\u52A8\u89E6\u53D1",hint:"\u6536\u5230 AI \u56DE\u590D\u540E\u662F\u5426\u81EA\u52A8\u6267\u884C\u6B64\u811A\u672C",control:Me({value:t.output?.autoTrigger!==!1?"auto":"manual",options:[{value:"auto",label:"\u81EA\u52A8\uFF08\u6536\u5230\u56DE\u590D\u5373\u6267\u884C\uFF09"},{value:"manual",label:"\u624B\u52A8\uFF08\u4EC5\u70B9\u51FB\u6309\u94AE\u6267\u884C\uFF09"}],onChange:o=>{let a=xe(e)||{};Ue(e,{...a,output:{...a.output||{},autoTrigger:o==="auto",enabled:!0,mode:"local_transform"}}),r()}})})),dr({heading:"\u7ED1\u5B9A",icon:"\u{1F517}",content:[n]})}function ou({label:t,hint:e,control:r}){let n=f("div",{className:"yyt-tool-binding-row"}),s=f("div",{className:"yyt-tool-binding-label"});return s.appendChild(f("span",{className:"yyt-tool-binding-label-text",text:t})),e&&s.appendChild(f("span",{className:"yyt-tool-binding-label-hint",text:e})),n.appendChild(s),Object.assign(r.el.style,{padding:"7px 10px",fontSize:"12px"}),n.appendChild(r.el),n.appendChild(f("div",{className:"yyt-tool-binding-meta"})),n}function $_(t,e,r,n,s,o,a,i){let l=f("div",{style:{display:"flex",flexDirection:"column"}});l.appendChild(f("div",{style:{marginBottom:"10px"}},f("div",{text:"\u6267\u884C\u65B9\u5411",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}}),f("div",{text:"\u51B3\u5B9A\u672C\u5730\u811A\u672C\u8FD0\u884C\u54EA\u4E2A\u53D8\u6362\u8DEF\u5F84\u3002",style:{fontSize:"11px",color:"var(--yyt-text-muted)",lineHeight:"1.6"}})));let d=t.processor?.direction||s[0]?.key||"",c=Me({value:d,options:s.map(g=>({value:g.key,label:g.description?`${g.label} \u2014 ${g.description}`:g.label})),style:{padding:"7px 10px",fontSize:"12px"},onChange:g=>{let h=xe(e)||{};Ue(e,{...h,processor:{...h.processor||{},direction:g}}),r()}});if(l.appendChild(c.el),l.appendChild(f("hr",{className:"yyt-zone-divider"})),o.length>0){l.appendChild(f("div",{style:{marginBottom:"10px"}},f("div",{text:"\u5904\u7406\u9879",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}}),f("div",{text:"\u52FE\u9009\u8981\u5305\u542B\u5728\u672C\u6B21\u53D8\u6362\u4E2D\u7684\u9879\u76EE\u3002",style:{fontSize:"11px",color:"var(--yyt-text-muted)",lineHeight:"1.6"}})));let g=f("div",{style:{display:"flex",flexDirection:"column"}}),h=t.processor?.options||{};for(let b of o){let v=Ze({label:b.label,hint:b.description||"",checked:h[b.key]===!0,onChange:x=>{let T=xe(e)||{};Ue(e,{...T,processor:{...T.processor||{},options:{...T.processor?.options||{},[b.key]:x}}})}});g.appendChild(v.el)}l.appendChild(g),l.appendChild(f("hr",{className:"yyt-zone-divider"}))}l.appendChild(f("div",{style:{marginBottom:"10px"}},f("div",{text:"\u63D0\u53D6\u914D\u7F6E",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}}),f("div",{text:'\u4ECE AI \u56DE\u590D\u4E2D\u62BD\u53D6\u8981\u672C\u5730\u5904\u7406\u7684\u6587\u672C\u3002\u5B8C\u6574\u89C4\u5219\u7531"\u6B63\u5219\u63D0\u53D6\u9884\u8BBE"\u51B3\u5B9A\uFF0C\u8FD9\u91CC\u53EA\u914D\u7F6E\u5DE5\u5177\u53C2\u6570\u3002',style:{fontSize:"11px",color:"var(--yyt-text-muted)",lineHeight:"1.6"}})));let u=f("div",{style:{display:"grid",gridTemplateColumns:"1fr auto",gap:"12px",alignItems:"end"}}),y=f("div",{className:"yyt-form-group",style:{margin:0}});y.appendChild(f("label",{text:"\u6700\u5927\u63D0\u53D6 AI \u6D88\u606F\u6570",style:{fontSize:"12px",fontWeight:"600",color:"var(--yyt-text-secondary, rgba(255,255,255,0.55))"}}));let p=f("input",{className:"yyt-input",attrs:{type:"number",min:"1",max:"50"},style:{padding:"7px 10px",fontSize:"12px"}});p.value=String(Number(t.extraction?.maxMessages)||5),p.addEventListener("change",()=>{let g=xe(e)||{};Ue(e,{...g,extraction:{...g.extraction||{},maxMessages:Math.max(1,parseInt(p.value,10)||5)}})}),y.appendChild(p),u.appendChild(y);let m=f("div",{className:"yyt-form-group",style:{margin:0}});return m.appendChild(f("label",{html:"&nbsp;",style:{fontSize:"12px"}})),m.appendChild(se({label:"\u{1F50D} \u6D4B\u8BD5\u63D0\u53D6",onClick:async()=>{try{let g=await ll(e);L_(n,g,a,i)}catch(g){po.error(`\u6D4B\u8BD5\u63D0\u53D6\u5931\u8D25\uFF1A${g?.message||g}`,null,{toast:!0})}}}).el),u.appendChild(m),l.appendChild(u),dr({heading:"\u914D\u7F6E",icon:"\u2699",content:[l]})}function L_(t,e,r,n){if(!ue()||!Ke(t))return;let o=`${zn}-${r||"extraction-preview"}`,a=Array.isArray(e?.messageEntries)?e.messageEntries:[],i=a.length>0?`
      <div class="yyt-form-group">
        <label>\u9010\u6761\u6D88\u606F\u9884\u89C8</label>
        <div class="yyt-preview-message-list">
          ${a.map((l,d)=>{let c=d===a.length-1?"\u6700\u65B0\u6D88\u606F":`\u6700\u8FD1\u7684\u7B2C ${a.length-d} \u6761\u6D88\u606F`;return`
              <div class="yyt-preview-message-item">
                <div class="yyt-preview-message-title">${En(c)}</div>
                <div><label>\u539F\u6587</label><pre class="yyt-preview-box yyt-preview-pre">${En(l.rawText||"\u65E0\u53EF\u7528\u6D88\u606F")}</pre></div>
                <div><label>\u6B63\u6587\u63D0\u53D6</label><pre class="yyt-preview-box yyt-preview-pre">${En(l.filteredText||"\u6B63\u6587\u89C4\u5219\u672A\u547D\u4E2D")}</pre></div>
                <div><label>\u5DE5\u5177\u6807\u7B7E\u63D0\u53D6</label><pre class="yyt-preview-box yyt-preview-pre">${En(l.extractedText||"\u672A\u63D0\u53D6\u5230\u5185\u5BB9")}</pre></div>
              </div>
            `}).join("")}
        </div>
      </div>
    `:"";t.append(Po({id:o,title:n,width:"720px",wide:!0,body:`
      <div class="yyt-form-group">
        <label>\u63D0\u53D6\u89C4\u5219</label>
        <div class="yyt-preview-box">${En((e?.selectors||[]).join(`
`)||"\u65E0")}</div>
      </div>
      <div class="yyt-form-group">
        <label>\u539F\u59CB\u5185\u5BB9\u6C47\u603B</label>
        <pre class="yyt-preview-box yyt-preview-pre">${En(e?.sourceText||"\u65E0\u53EF\u7528\u6D88\u606F")}</pre>
      </div>
      <div class="yyt-form-group">
        <label>\u6B63\u6587\u63D0\u53D6\u6C47\u603B</label>
        <pre class="yyt-preview-box yyt-preview-pre">${En(e?.filteredSourceText||"\u6B63\u6587\u89C4\u5219\u672A\u547D\u4E2D")}</pre>
      </div>
      <div class="yyt-form-group">
        <label>\u5DE5\u5177\u6807\u7B7E\u63D0\u53D6\u6C47\u603B</label>
        <pre class="yyt-preview-box yyt-preview-pre">${En(e?.extractedText||"\u672A\u63D0\u53D6\u5230\u5185\u5BB9")}</pre>
      </div>
      ${i}
    `})),No(t,o,{onSave:l=>l()}),t.find(`#${o}-save`).text("\u5173\u95ED"),t.find(`#${o}-cancel`).remove()}var po,au=O(()=>{It();pt();Ar();nu();Z();uo();dn();po=$.createScope("LocalTransformToolPanel")});var Xg={};he(Xg,{EscapeTransformToolPanel:()=>Qg,default:()=>O_});var Qg,O_,Zg=O(()=>{au();Qg=cl({id:"escapeTransformToolPanel",toolId:"escapeTransformTool",previewDialogId:"escape-transform-extraction-preview",previewTitle:"\u8F6C\u4E49\u5904\u7406\u63D0\u53D6\u9884\u89C8",heroHint:"\u4ECE\u6700\u8FD1 AI \u6D88\u606F\u63D0\u53D6\u6587\u672C\u540E\uFF0C\u5728\u672C\u5730\u6267\u884C\u8F6C\u4E49\u6216\u53BB\u8F6C\u4E49\uFF0C\u518D\u6309\u6240\u9009\u65B9\u5F0F\u5199\u56DE\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\u6216\u6B63\u5219\uFF0C\u4F8B\u5982\uFF1A
content
regex:<content>([\\s\\S]*?)</content>`,processorDirections:[{key:"escape",label:"\u8F6C\u4E49",description:"\u628A\u539F\u59CB\u5B57\u7B26\u8F6C\u6362\u6210\u8F6C\u4E49\u5E8F\u5217\u3002"},{key:"unescape",label:"\u53BB\u8F6C\u4E49",description:"\u628A\u8F6C\u4E49\u5E8F\u5217\u8FD8\u539F\u6210\u539F\u59CB\u5B57\u7B26\u3002"}],processorOptions:[{key:"doubleQuote",label:"\u53CC\u5F15\u53F7",description:'\u5904\u7406 " \u4E0E \\"\u3002'},{key:"singleQuote",label:"\u5355\u5F15\u53F7",description:"\u5904\u7406 ' \u4E0E \\'\u3002"},{key:"newline",label:"\u6362\u884C\u7B26",description:"\u5904\u7406\u6362\u884C\u4E0E \\n\u3002"}]}),O_=Qg});var th={};he(th,{PunctuationTransformToolPanel:()=>eh,default:()=>D_});var eh,D_,rh=O(()=>{au();eh=cl({id:"punctuationTransformToolPanel",toolId:"punctuationTransformTool",previewDialogId:"punctuation-transform-extraction-preview",previewTitle:"\u4E2D\u6587\u6807\u70B9\u66FF\u6362\u63D0\u53D6\u9884\u89C8",heroHint:"\u4ECE\u6700\u8FD1 AI \u6D88\u606F\u63D0\u53D6\u6587\u672C\u540E\uFF0C\u5728\u672C\u5730\u628A\u82F1\u6587\u6807\u70B9\u66FF\u6362\u6210\u4E2D\u6587\u6807\u70B9\uFF0C\u518D\u6309\u6240\u9009\u65B9\u5F0F\u5199\u56DE\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\u6216\u6B63\u5219\uFF0C\u4F8B\u5982\uFF1A
content
regex:<content>([\\s\\S]*?)</content>`,processorDirections:[{key:"en_to_zh",label:"\u82F1\u6587\u8F6C\u4E2D\u6587",description:"\u6309\u52FE\u9009\u9879\u628A\u82F1\u6587\u6807\u70B9\u66FF\u6362\u4E3A\u4E2D\u6587\u6807\u70B9\u3002"}],processorOptions:[{key:"comma",label:"\u9017\u53F7 ,",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u9017\u53F7\u3002"},{key:"period",label:"\u53E5\u53F7 .",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u53E5\u53F7\u3002"},{key:"exclamation",label:"\u611F\u53F9\u53F7 !",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u611F\u53F9\u53F7\u3002"},{key:"question",label:"\u95EE\u53F7 ?",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u95EE\u53F7\u3002"},{key:"semicolon",label:"\u5206\u53F7 ;",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u5206\u53F7\u3002"},{key:"colon",label:"\u5192\u53F7 :",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u5192\u53F7\u3002"},{key:"leftParen",label:"\u5DE6\u62EC\u53F7 (",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u5DE6\u62EC\u53F7\u3002"},{key:"rightParen",label:"\u53F3\u62EC\u53F7 )",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u53F3\u62EC\u53F7\u3002"}]}),D_=eh});var sh={};he(sh,{BypassPanel:()=>nh,default:()=>B_});var gt,nh,B_,oh=O(()=>{nt();so();pt();Z();gt=$.createScope("BypassPanel"),nh={id:"bypassPanel",_getActivePresetId(t){return t.find(".yyt-bypass-editor-content").data("presetId")||null},render(t){let e=ve.getPresetList(),r=ve.getDefaultPresetId();return`
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
            ${e.map(n=>this._renderPresetItem(n,n.id===r)).join("")}
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
    `},_renderPresetItem(t,e){let r=qr&&qr[t.id];return`
      <div class="yyt-bypass-preset-item ${e?"yyt-default":""}" data-preset-id="${t.id}">
        <div class="yyt-bypass-preset-info">
          <span class="yyt-bypass-preset-name">${be(t.name)}</span>
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
      `;let e=ve.getDefaultPresetId()===t.id,r=qr&&qr[t.id];return`
      <div class="yyt-bypass-editor-content" data-preset-id="${t.id}">
        <div class="yyt-bypass-editor-header">
          <div class="yyt-bypass-editor-title">
            <input type="text" class="yyt-input yyt-bypass-name-input" 
                   value="${be(t.name)}" placeholder="\u9884\u8BBE\u540D\u79F0">
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
                 value="${be(t.description||"")}" placeholder="\u9884\u8BBE\u63CF\u8FF0\uFF08\u53EF\u9009\uFF09">
        </div>

        <div class="yyt-bypass-messages-header">
          <span>\u6D88\u606F\u5217\u8868</span>
          <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="yyt-bypass-add-message">
            <i class="fa-solid fa-plus"></i> \u6DFB\u52A0\u6D88\u606F
          </button>
        </div>

        <div class="yyt-bypass-messages">
          ${(t.messages||[]).map((n,s)=>this._renderMessageItem(n,s)).join("")}
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
                  placeholder="\u8F93\u5165\u6D88\u606F\u5185\u5BB9...">${be(t.content||"")}</textarea>
      </div>
    `},bindEvents(t,e){let r=ue();!r||!Ke(t)||(t.off(".yytBypass"),this._bindPresetListEvents(t,r),this._bindEditorEvents(t,r),this._bindFileEvents(t,r),xr(t,{namespace:"yytBypassSelect",selectors:[".yyt-bypass-role-select"]}))},_bindPresetListEvents(t,e){t.on("click.yytBypass",".yyt-bypass-preset-item",r=>{if(e(r.target).closest(".yyt-bypass-quick-delete").length)return;let n=e(r.currentTarget).data("presetId");this._selectPreset(t,e,n)}),t.on("click.yytBypass",".yyt-bypass-quick-delete",async r=>{r.stopPropagation();let n=e(r.currentTarget).data("presetId");if(!n||!await Lr("\u5220\u9664\u9884\u8BBE","\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u4E2A\u9884\u8BBE\u5417\uFF1F",{danger:!0}))return;let o=ve.deletePreset(n);o.success?(t.find(".yyt-bypass-editor-content").data("presetId")===n&&t.find(".yyt-bypass-editor").html(`
            <div class="yyt-bypass-empty">
              <i class="fa-solid fa-shield-halved"></i>
              <p>\u9009\u62E9\u6216\u521B\u5EFA Ai \u6307\u4EE4\u9884\u8BBE</p>
            </div>
          `),this._refreshPresetList(t,e),gt.info("\u9884\u8BBE\u5DF2\u5220\u9664",null,{toast:"success"})):gt.error(o?.message||"\u5220\u9664\u9884\u8BBE\u5931\u8D25",null,{toast:!0})}),t.on("click.yytBypass","#yyt-bypass-add",()=>{this._createNewPreset(t,e)})},_bindEditorEvents(t,e){t.on("click.yytBypass","#yyt-bypass-save",()=>{this._saveCurrentPreset(t,e)}),t.on("click.yytBypass","#yyt-bypass-delete",()=>{this._deleteCurrentPreset(t,e)}),t.on("click.yytBypass","#yyt-bypass-duplicate",()=>{this._duplicateCurrentPreset(t,e)}),t.on("click.yytBypass","#yyt-bypass-set-default",()=>{this._setAsDefault(t,e)}),t.on("click.yytBypass","#yyt-bypass-add-message",()=>{this._addMessage(t,e)}),t.on("click.yytBypass",".yyt-bypass-move-up",r=>{let n=e(r.currentTarget).closest(".yyt-bypass-message"),s=n.prev(".yyt-bypass-message");s.length&&(s.before(n),this._refreshMessageIndices(t,e))}),t.on("click.yytBypass",".yyt-bypass-move-down",r=>{let n=e(r.currentTarget).closest(".yyt-bypass-message"),s=n.next(".yyt-bypass-message");s.length&&(s.after(n),this._refreshMessageIndices(t,e))}),t.on("click.yytBypass",".yyt-bypass-insert-message",r=>{let n=e(r.currentTarget).closest(".yyt-bypass-message");this._insertMessageAfter(t,e,n)}),t.on("click.yytBypass",".yyt-bypass-delete-message",r=>{e(r.currentTarget).closest(".yyt-bypass-message").remove(),this._refreshMessageIndices(t,e)}),t.on("change.yytBypass",".yyt-bypass-message-enabled",r=>{e(r.currentTarget).closest(".yyt-bypass-message").toggleClass("yyt-disabled",!e(r.currentTarget).is(":checked"))})},_bindFileEvents(t,e){t.on("click.yytBypass","#yyt-bypass-import",()=>{t.find("#yyt-bypass-import-file").click()}),t.on("change.yytBypass","#yyt-bypass-import-file",async r=>{let n=r.target.files[0];if(n){try{let s=await Lo(n),o=ve.importPresets(s);o.success?gt.info(o.message,null,{toast:"success"}):gt.error(o.message,null,{toast:!0}),o.success&&this.renderTo(t)}catch(s){gt.error(`\u5BFC\u5165\u5931\u8D25: ${s.message}`,null,{toast:!0})}e(r.target).val("")}}),t.on("click.yytBypass","#yyt-bypass-export",()=>{try{let r=ve.exportPresets();$o(r,`bypass_presets_${Date.now()}.json`),gt.info("\u9884\u8BBE\u5DF2\u5BFC\u51FA",null,{toast:"success"})}catch(r){gt.error(`\u5BFC\u51FA\u5931\u8D25: ${r.message}`,null,{toast:!0})}})},_selectPreset(t,e,r){let n=ve.getPreset(r);n&&(t.find(".yyt-bypass-preset-item").removeClass("yyt-active"),t.find(`.yyt-bypass-preset-item[data-preset-id="${r}"]`).addClass("yyt-active"),t.find(".yyt-bypass-editor").html(this._renderEditor(n)),xr(t,{namespace:"yytBypassSelect",selectors:[".yyt-bypass-role-select"]}))},_createNewPreset(t,e){let r=`bypass_${Date.now()}`,n=ve.createPreset({id:r,name:"\u65B0 Ai \u6307\u4EE4\u9884\u8BBE",description:"",messages:[]});n.success?(this.renderTo(t),this._selectPreset(t,e,r),gt.info("\u9884\u8BBE\u5DF2\u521B\u5EFA",null,{toast:"success"})):gt.error(n?.message||"\u521B\u5EFA\u9884\u8BBE\u5931\u8D25",null,{toast:!0})},_saveCurrentPreset(t,e){let r=t.find(".yyt-bypass-editor-content"),n=r.data("presetId");if(!n)return;let s=r.find(".yyt-bypass-name-input").val().trim(),o=r.find(".yyt-bypass-description-input").val().trim();if(!s){gt.warn("\u8BF7\u8F93\u5165\u9884\u8BBE\u540D\u79F0",null,{toast:!0}),r.find(".yyt-bypass-name-input").trigger("focus").trigger("select");return}let a=[];r.find(".yyt-bypass-message").each(function(){let l=e(this);a.push({id:l.data("messageId"),role:l.find(".yyt-bypass-role-select").val(),content:l.find(".yyt-bypass-message-content").val(),enabled:l.find(".yyt-bypass-message-enabled").is(":checked"),deletable:String(l.data("deletable"))!=="false"})});let i=ve.updatePreset(n,{name:s,description:o,messages:a});i.success?(gt.info("\u9884\u8BBE\u5DF2\u4FDD\u5B58",null,{toast:"success"}),this._refreshPresetList(t,e)):gt.error(i?.message||"\u4FDD\u5B58\u9884\u8BBE\u5931\u8D25",null,{toast:!0})},async _deleteCurrentPreset(t,e){let n=t.find(".yyt-bypass-editor-content").data("presetId");if(!n||!await Lr("\u5220\u9664\u9884\u8BBE","\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u4E2A\u9884\u8BBE\u5417\uFF1F",{danger:!0}))return;let o=ve.deletePreset(n);o.success?(this.renderTo(t),gt.info("\u9884\u8BBE\u5DF2\u5220\u9664",null,{toast:"success"})):gt.error(o?.message||"\u5220\u9664\u9884\u8BBE\u5931\u8D25",null,{toast:!0})},_duplicateCurrentPreset(t,e){let n=t.find(".yyt-bypass-editor-content").data("presetId");if(!n)return;let s=`bypass_${Date.now()}`,o=ve.duplicatePreset(n,s);o.success?(this.renderTo(t),this._selectPreset(t,e,s),gt.info("\u9884\u8BBE\u5DF2\u590D\u5236",null,{toast:"success"})):gt.error(o?.message||"\u590D\u5236\u9884\u8BBE\u5931\u8D25",null,{toast:!0})},_setAsDefault(t,e){let n=t.find(".yyt-bypass-editor-content").data("presetId");if(!n)return;ve.setDefaultPresetId(n),this._refreshPresetList(t,e);let s=ve.getPreset(n);s&&t.find(".yyt-bypass-editor").html(this._renderEditor(s)),gt.info("\u5DF2\u8BBE\u4E3A\u9ED8\u8BA4\u9884\u8BBE",null,{toast:"success"})},_addMessage(t,e){let r=t.find(".yyt-bypass-messages"),n={id:`msg_${Date.now()}`,role:"SYSTEM",content:"",enabled:!0,deletable:!0},s=r.find(".yyt-bypass-message").length;r.append(this._renderMessageItem(n,s))},_insertMessageAfter(t,e,r){let n=t.find(".yyt-bypass-messages"),s={id:`msg_${Date.now()}`,role:"SYSTEM",content:"",enabled:!0,deletable:!0},o=this._renderMessageItem(s,0),a=e(o);r.after(a),this._refreshMessageIndices(t,e)},_refreshMessageIndices(t,e){t.find(".yyt-bypass-message").each(function(r){e(this).attr("data-message-index",r)})},_refreshPresetList(t,e){let r=ve.getPresetList(),n=ve.getDefaultPresetId(),s=this._getActivePresetId(t);t.find(".yyt-bypass-preset-list").html(r.map(o=>this._renderPresetItem(o,o.id===n)).join("")),s&&t.find(`.yyt-bypass-preset-item[data-preset-id="${s}"]`).addClass("yyt-active")},destroy(t){!ue()||!Ke(t)||(jt(t,"yytBypassSelect"),t.off(".yytBypass"))},getStyles(){return`
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
    `},renderTo(t){let e=this.render({});t.html(e),this.bindEvents(t,{})}},B_=nh});var du={};he(du,{SettingsPanel:()=>wa,applyTheme:()=>dh,applyUiPreferences:()=>lu,default:()=>H_});function lh(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window}function va(){return lh()?.document||document}function ch(t=va()){return t?.documentElement||document.documentElement}function dh(t,e=va()){let r=ch(e),n={...z_,...ah[t]||ah["dark-blue"]};Object.entries(n).forEach(([s,o])=>{r.style.setProperty(s,o)}),r.setAttribute("data-yyt-theme",t)}function lu(t={},e=va()){let r=ch(e),{theme:n="dark-blue",compactMode:s=!1,animationEnabled:o=!0}=t||{};dh(n,e),r.classList.toggle("yyt-compact-mode",!!s),r.classList.toggle("yyt-no-animation",!o)}function K_(){let t=new Map;return{add(e){return e?._id&&t.set(e._id,e),e},getControl(e){return t.get(e)||null},destroy(){for(let e of t.values())try{e.destroy?.()}catch{}t.clear()}}}function cu(t){return f("i",{className:`fa-solid ${t}`})}function F_(t,e,r,n){let s=f("div",{className:"yyt-settings-hero"}),o=f("div",{className:"yyt-settings-hero-row1"});o.appendChild(f("div",{className:"yyt-settings-hero-icon"},[cu("fa-sliders")])),o.appendChild(f("div",{className:"yyt-settings-hero-name",text:"\u5168\u5C40\u8BBE\u7F6E"}));let a=f("div",{className:"yyt-settings-hero-actions"});a.appendChild(se({label:"\u91CD\u7F6E\u4E3A\u9ED8\u8BA4",size:"small",icon:"\u21A9",onClick:r}).el),a.appendChild(se({label:"\u4FDD\u5B58\u8BBE\u7F6E",size:"small",variant:"primary",icon:"\u2713",onClick:n}).el),o.appendChild(a),s.appendChild(o),s.appendChild(f("div",{className:"yyt-settings-hero-desc",text:"\u7BA1\u7406\u6267\u884C\u5668\u3001\u81EA\u52A8\u5316\u3001\u8C03\u8BD5\u4E0E\u5916\u89C2\u504F\u597D\u3002"}));let i=t.ui||{},l=t.debug||{},d={"dark-blue":"\u6DF1\u84DD","dark-purple":"\u6DF1\u7D2B","dark-green":"\u6DF1\u7EFF",light:"\u6D45\u8272"}[i.theme]||"\u9ED8\u8BA4",c=f("div",{className:"yyt-settings-hero-chips"});return c.appendChild(f("span",{className:"yyt-settings-chip mode",text:`\u4E3B\u9898 ${d}`})),c.appendChild(f("span",{className:"yyt-settings-chip preset",text:`\u65E5\u5FD7 ${l.enableDebugLog?"DEBUG":"INFO"}`})),c.appendChild(f("span",{className:"yyt-settings-chip",text:`\u52A8\u753B ${i.animationEnabled===!1?"\u5173\u95ED":"\u5F00\u542F"}`})),c.appendChild(f("span",{className:"yyt-settings-chip",text:`\u7D27\u51D1 ${i.compactMode?"\u5F00":"\u5173"}`})),s.appendChild(c),s}function An({icon:t,title:e,action:r=null},n=[]){let s=f("div",{className:"yyt-settings-section"}),o=f("div",{className:"yyt-settings-section-heading"});if(t){let a=f("span",{className:"yyt-settings-section-icon"});a.appendChild(cu(t)),o.appendChild(a)}if(o.appendChild(f("span",{text:e})),r){let a=f("span",{className:"yyt-settings-section-action"});a.appendChild(r),o.appendChild(a)}s.appendChild(o);for(let a of n)a&&s.appendChild(a?.el?a.el:a);return s}function dl({label:t,hint:e,control:r}){let n=f("div",{className:"yyt-settings-row"}),s=f("div",{className:"yyt-settings-row-label"});return s.appendChild(f("span",{className:"yyt-settings-row-label-text",text:t})),e&&s.appendChild(f("span",{className:"yyt-settings-row-label-hint",text:e})),n.appendChild(s),n.appendChild(r?.el?r.el:r),n}function ih({label:t,hint:e,leftLabel:r,leftControl:n,rightLabel:s,rightControl:o}){let a=f("div",{className:"yyt-settings-row-double"}),i=f("div",{className:"yyt-settings-row-label"});i.appendChild(f("span",{className:"yyt-settings-row-label-text",text:t})),e&&i.appendChild(f("span",{className:"yyt-settings-row-label-hint",text:e})),a.appendChild(i);let l=f("div",{className:"yyt-settings-row-double-cell"});r&&l.appendChild(f("span",{className:"yyt-settings-row-double-cell-label",text:r})),l.appendChild(n?.el?n.el:n),a.appendChild(l);let d=f("div",{className:"yyt-settings-row-double-cell"});return s&&d.appendChild(f("span",{className:"yyt-settings-row-double-cell-label",text:s})),d.appendChild(o?.el?o.el:o),a.appendChild(d),a}function xa({title:t,desc:e,control:r}){let n=f("div",{className:"yyt-settings-toggle-row"}),s=f("div",{className:"yyt-settings-toggle-info"});return s.appendChild(f("div",{className:"yyt-settings-toggle-title",text:t})),e&&s.appendChild(f("div",{className:"yyt-settings-toggle-desc",text:e})),n.appendChild(s),n.appendChild(r?.el?r.el:r),n}function ul(t){return f("div",{className:"yyt-settings-hint-note",html:t})}function U_(t){let e=t?.hostBinding||{},r=f("div",{className:"yyt-settings-stat-row"}),n=(s,o,a="")=>{let i=f("div",{className:"yyt-settings-stat"});return i.appendChild(f("span",{className:"yyt-settings-stat-label",text:s})),i.appendChild(f("span",{className:`yyt-settings-stat-value ${a}`.trim(),text:o})),i};return r.appendChild(n("\u670D\u52A1",t?.enabled?"\u8FD0\u884C\u4E2D":"\u672A\u542F\u7528",t?.enabled?"success":"error")),r.appendChild(n("\u76D1\u542C",e.initialized?"\u5DF2\u7ED1\u5B9A":"\u672A\u7ED1\u5B9A",e.initialized?"success":"error")),r.appendChild(n("\u5F85\u5904\u7406",String(t?.pendingTimerCount||0),t?.pendingTimerCount?"":"muted")),r.appendChild(n("\u6392\u961F\u69FD\u4F4D",String(t?.queuedSlotCount||0),t?.queuedSlotCount?"":"muted")),r}function j_(t){if(!t.length)return f("div",{className:"yyt-settings-hint-note",text:"\u6682\u65E0\u81EA\u52A8\u5316\u4E8B\u52A1\u8BB0\u5F55\u3002"});let e=f("div",{className:"yyt-runtime-list"});for(let r of t.slice(0,5)){let n=f("div",{className:"yyt-runtime-list-row"});n.appendChild(f("span",{className:"yyt-runtime-event",text:r?.sourceEvent||"UNKNOWN_EVENT"}));let s=r?.phase||"unknown",o="";s==="completed"||r?.verdict==="success"?o="success":(s==="failed"||r?.error)&&(o="error"),n.appendChild(f("span",{className:`yyt-runtime-phase ${o}`.trim(),text:s}));let a=[r?.messageId||"no_message_id",r?.verdict||r?.error||r?.generationKey||""].filter(Boolean).join(" \xB7 ");n.appendChild(f("span",{className:"yyt-runtime-main",text:a||"\u65E0\u989D\u5916\u4FE1\u606F"})),e.appendChild(n)}return e}function W_(){let t=ar.getAvailableVariables(),e=f("div",{className:"yyt-macro-list"});for(let r of t){let n=f("div",{className:"yyt-macro-row"});n.appendChild(f("code",{text:r.name})),n.appendChild(f("span",{text:r.description})),e.appendChild(n)}return e}function yo(t,e,r,{min:n,max:s,step:o}={}){let a={};return n!=null&&(a.min=String(n)),s!=null&&(a.max=String(s)),o!=null&&(a.step=String(o)),t.add(Te({id:e,type:"number",value:String(r),attrs:a}))}var iu,z_,ah,wa,H_,uu=O(()=>{oo();Z();el();pt();It();iu=$.createScope("SettingsPanel"),z_={"--yyt-accent":"#7bb7ff","--yyt-accent-glow":"rgba(123, 183, 255, 0.4)","--yyt-accent-soft":"rgba(123, 183, 255, 0.15)","--yyt-accent-strong":"#a5d4ff","--yyt-on-accent":"#0a0d13","--yyt-bg-base":"#0a0d13","--yyt-surface":"#0f1219","--yyt-surface-2":"#151a24","--yyt-surface-3":"#1c2231","--yyt-surface-hover":"#1c2231","--yyt-surface-active":"#232b3e","--yyt-border":"rgba(255, 255, 255, 0.06)","--yyt-border-soft":"rgba(255, 255, 255, 0.04)","--yyt-border-strong":"rgba(255, 255, 255, 0.12)","--yyt-text":"rgba(255, 255, 255, 0.92)","--yyt-text-secondary":"rgba(255, 255, 255, 0.55)","--yyt-text-muted":"rgba(255, 255, 255, 0.35)","--yyt-focus-ring":"0 0 0 2px rgba(123, 183, 255, 1), 0 0 0 4px rgba(123, 183, 255, 0.15)","--yyt-control-bg":"#0f1219","--yyt-control-bg-hover":"#151a24","--yyt-control-bg-active":"#1c2231","--yyt-control-bg-strong":"#151a24","--yyt-control-bg-focus":"#151a24","--yyt-control-border":"rgba(255, 255, 255, 0.08)","--yyt-control-border-hover":"rgba(255, 255, 255, 0.14)","--yyt-control-border-focus":"rgba(123, 183, 255, 0.5)","--yyt-control-shadow":"none","--yyt-control-shadow-hover":"none","--yyt-control-shadow-focus":"none","--yyt-control-shadow-active":"none","--yyt-select-surface":"#151a24","--yyt-select-option-bg":"#1c2231","--yyt-select-option-hover-bg":"#232b3e","--yyt-select-option-selected-bg":"#2a3450","--yyt-select-option-border":"rgba(123, 183, 255, 0.15)","--yyt-select-option-selected-border":"rgba(123, 183, 255, 0.3)","--yyt-select-dropdown-shadow":"0 8px 24px rgba(0, 0, 0, 0.4)","--yyt-select-arrow-color":"rgba(255, 255, 255, 0.4)"},ah={"dark-blue":{"--yyt-on-accent":"#0a0d13"},"dark-purple":{"--yyt-accent":"#a78bfa","--yyt-accent-glow":"rgba(167, 139, 250, 0.4)","--yyt-accent-soft":"rgba(167, 139, 250, 0.15)","--yyt-accent-strong":"#c4b5fd","--yyt-bg-base":"#0d0a14","--yyt-surface":"#12101c","--yyt-surface-2":"#1a1726","--yyt-surface-3":"#221e32","--yyt-surface-hover":"#221e32","--yyt-surface-active":"#2a2540","--yyt-on-accent":"#0d0a14","--yyt-control-bg":"#12101c","--yyt-control-bg-hover":"#1a1726","--yyt-control-bg-active":"#221e32","--yyt-control-bg-strong":"#1a1726","--yyt-control-bg-focus":"#1a1726","--yyt-control-border-focus":"rgba(167, 139, 250, 0.5)","--yyt-select-surface":"#1a1726","--yyt-select-option-bg":"#221e32","--yyt-select-option-hover-bg":"#2a2540","--yyt-select-option-selected-bg":"#332d50","--yyt-select-option-border":"rgba(167, 139, 250, 0.15)","--yyt-select-option-selected-border":"rgba(167, 139, 250, 0.3)","--yyt-focus-ring":"0 0 0 2px rgba(167, 139, 250, 1), 0 0 0 4px rgba(167, 139, 250, 0.15)"},"dark-green":{"--yyt-accent":"#4ade80","--yyt-accent-glow":"rgba(74, 222, 128, 0.4)","--yyt-accent-soft":"rgba(74, 222, 128, 0.15)","--yyt-accent-strong":"#86efac","--yyt-bg-base":"#0a120d","--yyt-surface":"#0f1912","--yyt-surface-2":"#151f1a","--yyt-surface-3":"#1c2824","--yyt-surface-hover":"#1c2824","--yyt-surface-active":"#233530","--yyt-on-accent":"#0a120d","--yyt-control-bg":"#0f1912","--yyt-control-bg-hover":"#151f1a","--yyt-control-bg-active":"#1c2824","--yyt-control-bg-strong":"#151f1a","--yyt-control-bg-focus":"#151f1a","--yyt-control-border-focus":"rgba(74, 222, 128, 0.5)","--yyt-select-surface":"#151f1a","--yyt-select-option-bg":"#1c2824","--yyt-select-option-hover-bg":"#233530","--yyt-select-option-selected-bg":"#2a4038","--yyt-select-option-border":"rgba(74, 222, 128, 0.15)","--yyt-select-option-selected-border":"rgba(74, 222, 128, 0.3)","--yyt-focus-ring":"0 0 0 2px rgba(74, 222, 128, 1), 0 0 0 4px rgba(74, 222, 128, 0.15)"},light:{"--yyt-accent":"#3b82f6","--yyt-accent-glow":"rgba(59, 130, 246, 0.3)","--yyt-accent-soft":"rgba(59, 130, 246, 0.1)","--yyt-accent-strong":"#93c5fd","--yyt-bg-base":"#f5f7fa","--yyt-surface":"#edf0f5","--yyt-surface-2":"#e4e8ef","--yyt-surface-3":"#dbe0e9","--yyt-surface-hover":"#dbe0e9","--yyt-surface-active":"#d1d7e2","--yyt-text":"rgba(15, 23, 42, 0.92)","--yyt-text-secondary":"rgba(15, 23, 42, 0.55)","--yyt-text-muted":"rgba(15, 23, 42, 0.35)","--yyt-border":"rgba(15, 23, 42, 0.08)","--yyt-border-soft":"rgba(15, 23, 42, 0.04)","--yyt-border-strong":"rgba(15, 23, 42, 0.14)","--yyt-focus-ring":"0 0 0 2px rgba(59, 130, 246, 1), 0 0 0 4px rgba(59, 130, 246, 0.12)","--yyt-on-accent":"#ffffff","--yyt-control-bg":"#edf0f5","--yyt-control-bg-hover":"#e4e8ef","--yyt-control-bg-active":"#dbe0e9","--yyt-control-bg-strong":"#e4e8ef","--yyt-control-bg-focus":"#e4e8ef","--yyt-control-border":"rgba(15, 23, 42, 0.1)","--yyt-control-border-hover":"rgba(15, 23, 42, 0.18)","--yyt-control-border-focus":"rgba(59, 130, 246, 0.5)","--yyt-control-shadow":"none","--yyt-control-shadow-hover":"none","--yyt-control-shadow-focus":"none","--yyt-control-shadow-active":"none","--yyt-select-surface":"#e4e8ef","--yyt-select-option-bg":"#edf0f5","--yyt-select-option-hover-bg":"#dbe0e9","--yyt-select-option-selected-bg":"#dbeafe","--yyt-select-option-border":"rgba(59, 130, 246, 0.12)","--yyt-select-option-selected-border":"rgba(59, 130, 246, 0.3)","--yyt-select-dropdown-shadow":"0 8px 24px rgba(15, 23, 42, 0.1)","--yyt-select-arrow-color":"rgba(15, 23, 42, 0.4)"}};wa={id:"settingsPanel",_instance:null,_getAutomationRuntime(){try{return lh()?.YouYouToolkit?.getAutomationRuntime?.()||null}catch{return null}},renderTo(t){if(!ue()||!t?.length)return;let r=Tt.getSettings(),n=r.executor||{},s=r.automation||{},o=r.debug||{},a=r.ui||{},i=this._getAutomationRuntime(),l=Array.isArray(i?.recentTransactions)?i.recentTransactions.slice().reverse():[],d=i?.hostBinding||{},c=K_(),u=async()=>{await Lr("\u91CD\u7F6E\u8BBE\u7F6E","\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u8BBE\u7F6E\u4E3A\u9ED8\u8BA4\u503C\u5417\uFF1F",{danger:!0})&&(Tt.resetSettings(),lu(fa.ui,va()),wa.renderTo(t),iu.info("\u8BBE\u7F6E\u5DF2\u91CD\u7F6E",null,{toast:"success"}))},y=()=>{wa._saveFromControls(c,t)},p=f("div",{className:"yyt-settings-panel"});p.appendChild(F_(r,i,u,y));let m=new Map,g=f("div",{className:"yyt-settings-tabs"}),h=[{id:"executor",label:"\u6267\u884C\u5668",icon:"fa-microchip"},{id:"debug",label:"\u8C03\u8BD5",icon:"fa-bug"},{id:"ui",label:"\u5916\u89C2",icon:"fa-palette"}],b=new Map,v=C=>{for(let[N,W]of b)W.classList.toggle("yyt-active",N===C);for(let[N,W]of m)W.classList.toggle("yyt-active",N===C)};for(let C of h){let N=f("button",{className:"yyt-settings-tab"+(C.id==="executor"?" yyt-active":""),attrs:{type:"button"}});N.appendChild(cu(C.icon)),N.appendChild(f("span",{text:C.label})),N.addEventListener("click",()=>v(C.id)),g.appendChild(N),b.set(C.id,N)}p.appendChild(g);let x=f("div",{className:"yyt-settings-scroll"}),T=f("div",{className:"yyt-settings-body"});x.appendChild(T);let E=f("div",{className:"yyt-settings-tab-pane yyt-active"});E.appendChild(An({icon:"fa-gauge-high",title:"\u6267\u884C\u9650\u5236"},[dl({label:"\u6700\u5927\u5E76\u53D1\u6570",hint:"\u540C\u65F6\u6267\u884C\u7684\u5DE5\u5177\u6570\u91CF\u4E0A\u9650\uFF081 ~ 10\uFF09",control:yo(c,"maxConcurrent",n.maxConcurrent??3,{min:1,max:10})}),dl({label:"\u961F\u5217\u5904\u7406\u65B9\u5F0F",hint:"\u51B3\u5B9A\u5F85\u6267\u884C\u5DE5\u5177\u7684\u6392\u961F\u987A\u5E8F",control:c.add(Me({id:"queueStrategy",options:[{value:"fifo",label:"FIFO (\u5148\u8FDB\u5148\u51FA)"},{value:"lifo",label:"LIFO (\u540E\u8FDB\u5148\u51FA)"},{value:"priority",label:"\u4F18\u5148\u7EA7\u6392\u5E8F"}],value:n.queueStrategy||"fifo"}))})])),E.appendChild(An({icon:"fa-rotate-right",title:"\u91CD\u8BD5\u4E0E\u8D85\u65F6"},[ih({label:"\u91CD\u8BD5\u7B56\u7565",hint:"\u5931\u8D25\u540E\u81EA\u52A8\u91CD\u8BD5\u7684\u6B21\u6570\u4E0E\u95F4\u9694",leftLabel:"\u6B21\u6570",leftControl:yo(c,"maxRetries",n.maxRetries??2,{min:0,max:10}),rightLabel:"\u95F4\u9694 ms",rightControl:yo(c,"retryDelayMs",n.retryDelayMs??5e3,{min:1e3,max:6e4,step:1e3})}),dl({label:"\u8BF7\u6C42\u8D85\u65F6\u65F6\u95F4 (ms)",hint:"\u5355\u4E2A\u8BF7\u6C42\u8D85\u8FC7\u8BE5\u65F6\u957F\u5C06\u81EA\u52A8\u4E2D\u65AD",control:yo(c,"requestTimeoutMs",n.requestTimeoutMs??9e4,{min:1e4,max:3e5,step:1e4})})])),E.appendChild(An({icon:"fa-bolt",title:"\u81EA\u52A8\u89E6\u53D1"},[ul("\u7531\u5404\u5DE5\u5177\u7684 <code>output_mode</code> \u51B3\u5B9A\u54EA\u4E9B\u5DE5\u5177\u81EA\u52A8\u89E6\u53D1\u3002\u8FD9\u91CC\u53EA\u63A7\u5236\u5168\u5C40\u8282\u6D41\u65F6\u95F4\u3002"),ih({label:"\u8282\u6D41\u53C2\u6570",hint:"\u7B49\u5F85\u7A33\u5B9A\u540E\u89E6\u53D1\uFF0C\u89E6\u53D1\u540E\u518D\u51B7\u5374",leftLabel:"\u7A33\u5B9A ms",leftControl:yo(c,"automationSettleMs",s.settleMs??1200,{min:0,max:1e4,step:100}),rightLabel:"\u51B7\u5374 ms",rightControl:yo(c,"automationCooldownMs",s.cooldownMs??5e3,{min:0,max:6e4,step:100})})]));let w=[U_(i)],_=Array.isArray(d.eventBindings)&&d.eventBindings.length>0?d.eventBindings.join(" / "):"\u6682\u65E0\u4E8B\u4EF6\u7ED1\u5B9A";w.push(ul(`\u4E8B\u4EF6\u6E90: <code>${d.source||"unavailable"}</code>\uFF1B\u4E8B\u4EF6: <code>${_}</code>`)),d.lastError&&w.push(ul(`\u6700\u8FD1\u9519\u8BEF: <code>${d.lastError}</code>`)),w.push(j_(l)),E.appendChild(An({icon:"fa-magnifying-glass-chart",title:"\u81EA\u52A8\u89E6\u53D1\u8BCA\u65AD"},w)),T.appendChild(E),m.set("executor",E);let A=f("div",{className:"yyt-settings-tab-pane"});A.appendChild(An({icon:"fa-terminal",title:"\u65E5\u5FD7\u4E0E\u5386\u53F2"},[xa({title:"\u542F\u7528\u8C03\u8BD5\u65E5\u5FD7",desc:"\u5F00\u542F\u540E Logger \u9762\u677F\u5C06\u8BB0\u5F55 DEBUG \u7EA7\u522B\u65E5\u5FD7\uFF0C\u5173\u95ED\u4EC5\u8BB0\u5F55 INFO \u53CA\u4EE5\u4E0A",control:c.add(Ze({id:"enableDebugLog",checked:o.enableDebugLog}))}),xa({title:"\u4FDD\u5B58\u6267\u884C\u5386\u53F2",desc:"\u8BB0\u5F55\u5DE5\u5177\u6267\u884C\u5386\u53F2\uFF0C\u4FBF\u4E8E\u95EE\u9898\u6392\u67E5",control:c.add(Ze({id:"saveExecutionHistory",checked:o.saveExecutionHistory}))})])),A.appendChild(An({icon:"fa-eye",title:"\u663E\u793A\u8F85\u52A9"},[xa({title:"\u663E\u793A\u8FD0\u884C\u72B6\u6001\u5FBD\u7AE0",desc:"\u5728\u5DE5\u5177\u5361\u7247\u4E0A\u663E\u793A\u8FD0\u884C\u72B6\u6001\u6307\u793A\u5668",control:c.add(Ze({id:"showRuntimeBadge",checked:o.showRuntimeBadge}))})])),T.appendChild(A),m.set("debug",A);let I=f("div",{className:"yyt-settings-tab-pane"});I.appendChild(An({icon:"fa-palette",title:"\u4E3B\u9898\u4E0E\u52A8\u6548"},[dl({label:"\u4E3B\u9898",hint:"\u5207\u6362\u540E\u4FDD\u5B58\u5373\u53EF\u5E94\u7528\u5230\u5168\u5C40\u754C\u9762",control:c.add(Me({id:"theme",options:[{value:"dark-blue",label:"\u6DF1\u84DD"},{value:"dark-purple",label:"\u6DF1\u7D2B"},{value:"dark-green",label:"\u6DF1\u7EFF"},{value:"light",label:"\u6D45\u8272"}],value:a.theme||"dark-blue"}))}),xa({title:"\u7D27\u51D1\u6A21\u5F0F",desc:"\u51CF\u5C11\u5361\u7247\u95F4\u8DDD\uFF0C\u663E\u793A\u66F4\u591A\u5185\u5BB9",control:c.add(Ze({id:"compactMode",checked:a.compactMode}))}),xa({title:"\u542F\u7528\u52A8\u753B\u6548\u679C",desc:"\u754C\u9762\u8FC7\u6E21\u548C\u4EA4\u4E92\u52A8\u753B",control:c.add(Ze({id:"animationEnabled",checked:a.animationEnabled}))})])),I.appendChild(An({icon:"fa-code",title:"\u6A21\u677F\u5B8F\u8BF4\u660E"},[ul("\u5DE5\u5177\u6A21\u677F\u91CC\u53EF\u76F4\u63A5\u4F7F\u7528\u4E0B\u9762\u8FD9\u4E9B\u5B8F\u3002\u4E16\u754C\u4E66\u5185\u5BB9\u53EA\u6709\u5728\u6A21\u677F\u91CC\u663E\u5F0F\u5199\u5165 <code>{{toolWorldbookContent}}</code> \u65F6\u624D\u4F1A\u6CE8\u5165\u3002"),W_()])),T.appendChild(I),m.set("ui",I),p.appendChild(x),t.empty().append(p),this._instance={root:c,_tabPanels:m};let P=Tt.getDebugSettings();$.setLevel(P.enableDebugLog?_e.DEBUG:_e.INFO)},_saveFromControls(t,e){let r=o=>{let a=t.getControl(o);return a?a.get():null},n=[{id:"maxConcurrent",min:1,max:10,label:"\u6700\u5927\u5E76\u53D1\u6570"},{id:"maxRetries",min:0,max:10,label:"\u6700\u5927\u91CD\u8BD5\u6B21\u6570"},{id:"retryDelayMs",min:1e3,max:6e4,label:"\u91CD\u8BD5\u95F4\u9694"},{id:"requestTimeoutMs",min:1e4,max:3e5,label:"\u8BF7\u6C42\u8D85\u65F6\u65F6\u95F4"},{id:"automationSettleMs",min:0,max:1e4,label:"\u7B49\u5F85\u7A33\u5B9A\u65F6\u95F4"},{id:"automationCooldownMs",min:0,max:6e4,label:"\u81EA\u52A8\u5316\u51B7\u5374\u65F6\u95F4"}];for(let o of n){let a=r(o.id),i=parseInt(a,10);if(isNaN(i)||i<o.min||i>o.max){iu.warn(`${o.label} \u987B\u5728 ${o.min} ~ ${o.max} \u4E4B\u95F4`,null,{toast:!0});let l=t.getControl(o.id);l?.focus&&l.focus(),l?.select&&l.select();return}}let s={executor:{maxConcurrent:parseInt(r("maxConcurrent"),10)||3,maxRetries:parseInt(r("maxRetries"),10)||2,retryDelayMs:parseInt(r("retryDelayMs"),10)||5e3,requestTimeoutMs:parseInt(r("requestTimeoutMs"),10)||9e4,queueStrategy:r("queueStrategy")||"fifo"},automation:{settleMs:parseInt(r("automationSettleMs"),10)||1200,cooldownMs:parseInt(r("automationCooldownMs"),10)||5e3,maxConcurrentSlots:Tt.getSettings()?.automation?.maxConcurrentSlots||1},debug:{enableDebugLog:!!r("enableDebugLog"),saveExecutionHistory:!!r("saveExecutionHistory"),showRuntimeBadge:!!r("showRuntimeBadge")},ui:{theme:r("theme")||"dark-blue",compactMode:!!r("compactMode"),animationEnabled:!!r("animationEnabled")}};Tt.saveSettings(s),$.setLevel(s.debug.enableDebugLog?_e.DEBUG:_e.INFO),lu(s.ui,va()),iu.info("\u8BBE\u7F6E\u5DF2\u4FDD\u5B58",null,{toast:"success"}),wa.renderTo(e)},render(){return""},getStyles(){return""},bindEvents(){},destroy(t){if(this._instance?.root)try{this._instance.root.destroy()}catch{}this._instance=null,ue()&&t?.length&&t.empty()}},H_=wa});function q_(t={},e=-1){return[t?.sourceId,t?.messageId,t?.message_id,t?.id,t?.mid,t?.mesid,t?.mes_id,t?.chat_index,t?.index,e].map(r=>Le(r))}function G_(t=[],e=""){let r=Le(e);if(!r||!Array.isArray(t))return-1;for(let n=t.length-1;n>=0;n-=1){let s=t[n];if(q_(s,n).includes(r))return n}return-1}function Sa(t={},e={}){let r=Le(t?.sourceMessageId||t?.confirmedAssistantMessageId||t?.messageId);if(!r)return null;let n=dd({resolvedAt:Date.now(),runSource:e.runSource||t?.runSource||ft.MANUAL,traceId:t?.traceId||"",chatId:t?.chatId||"",sourceMessageId:r,sourceSwipeId:t?.sourceSwipeId||t?.effectiveSwipeId||"",effectiveSwipeId:t?.effectiveSwipeId||t?.sourceSwipeId||"swipe:current",slotBindingKey:t?.slotBindingKey||"",slotRevisionKey:t?.slotRevisionKey||"",slotTransactionId:t?.slotTransactionId||"",assistantContentFingerprint:t?.assistantContentFingerprint||"",assistantBaseFingerprint:t?.assistantBaseFingerprint||"",assistantText:t?.lastAiMessage||"",assistantBaseText:t?.assistantBaseText||"",targetMessageIndex:G_(t?.chatMessages||t?.chatHistory||[],r)});return!n.slotBindingKey||!n.slotRevisionKey?null:n}async function Ta({runSource:t=ft.MANUAL}={}){let e=await Gn({runSource:t});return Sa(e,{runSource:t})}async function Y_({messageId:t,swipeId:e="",runSource:r=ft.AUTO}={}){let n=await Yn({messageId:t,swipeId:e,runSource:r});return Sa(n,{runSource:r})}async function uh(t=null,e={}){let r=t||null;if(typeof e.resolveTarget=="function")return await e.resolveTarget(r);let n=Le(e.runSource||r?.runSource)||ft.MANUAL,s=Le(e.messageId||r?.sourceMessageId),o=Le(e.swipeId||r?.sourceSwipeId||r?.effectiveSwipeId);return e.useMessageTarget===!0||n===ft.AUTO?s?Y_({messageId:s,swipeId:o,runSource:n}):null:Ta({runSource:n})}function ph(t,e){let r=t||null,n=e||null;return!r||!n?{valid:!1,reason:"missing_target_snapshot"}:Le(r.sourceMessageId)!==Le(n.sourceMessageId)?{valid:!1,reason:"source_message_changed"}:Le(r.sourceSwipeId||r.effectiveSwipeId)!==Le(n.sourceSwipeId||n.effectiveSwipeId)?{valid:!1,reason:"source_swipe_changed"}:Le(r.slotRevisionKey)!==Le(n.slotRevisionKey)?{valid:!1,reason:"slot_revision_changed"}:{valid:!0,reason:"ok"}}var _a=O(()=>{Vn();We()});function Gr(t,e=""){return t==null?e:String(t).trim()||e}function V_(t){if(!t||t?.is_user===!0||t?.is_system===!0)return!1;let e=String(t?.role||"").trim().toLowerCase();return e==="assistant"||e==="ai"||!e}function J_(t){return!t||typeof t!="object"||Array.isArray(t)?!1:!!(Array.isArray(t.tables)||typeof t.chatId=="string"&&t.chatId.length>0||typeof t.slotBindingKey=="string"&&t.slotBindingKey.length>0)}function yh(t,e){if(!t)return null;let r=t[un];if(!r)return null;let n=De(e);return J_(r)?n===Ot?r:null:r[n]||null}function Ea({loadMode:t=ns.EMPTY,mergeBaseOnly:e=!1,state:r=null,sourceKind:n=Gt.EMPTY,resolvedFromMessageId:s="",resolvedFromRevisionKey:o=""}={}){let a=kr(r)||null;return{loadMode:t,mergeBaseOnly:e,state:a,sourceKind:n,resolvedFromMessageId:Gr(s,a?.sourceMessageId||""),resolvedFromRevisionKey:Gr(o,a?.slotRevisionKey||"")}}function pu(t,e={}){let r=kr(t);return r?kr({...r,meta:{...r.meta||{},...e||{}}}):null}function fh({runtime:t,targetSnapshot:e,currentMessageIndex:r=-1,templateTables:n=[],isolationKey:s}={}){let o=Array.isArray(t?.chat)?t.chat:[],a=Gr(e?.slotRevisionKey,""),i=Gr(e?.slotBindingKey,""),l=De(s===void 0?"":s);if(r>=0&&r<o.length){let d=yh(o[r],l),c=kr(d);if(c&&Gr(c.slotRevisionKey,"")===a)return Ea({loadMode:ns.EXACT,mergeBaseOnly:!1,state:pu(c,{sourceKind:Gt.EXACT,isolationKey:l,resolvedFromMessageId:c.sourceMessageId,resolvedFromRevisionKey:c.slotRevisionKey}),sourceKind:Gt.EXACT,resolvedFromMessageId:c.sourceMessageId,resolvedFromRevisionKey:c.slotRevisionKey});if(c&&Gr(c.slotBindingKey,"")===i){let u=pu({...c,slotRevisionKey:a||c.slotRevisionKey,sourceSwipeId:Gr(e?.sourceSwipeId||e?.effectiveSwipeId,c.sourceSwipeId),meta:{...c.meta||{},sourceKind:Gt.BINDING,mergeBaseOnly:!0,fallbackFromBinding:!0,isolationKey:l,fallbackFromRevisionKey:Gr(c.slotRevisionKey,""),requestedRevisionKey:a,resolvedFromMessageId:c.sourceMessageId,resolvedFromRevisionKey:c.slotRevisionKey}});return Ea({loadMode:ns.BINDING_FALLBACK,mergeBaseOnly:!0,state:u,sourceKind:Gt.BINDING,resolvedFromMessageId:c.sourceMessageId,resolvedFromRevisionKey:c.slotRevisionKey})}}if(r>0)for(let d=r-1;d>=0;d-=1){let c=o[d];if(!V_(c))continue;let u=yh(c,l),y=kr(u);if(!y||!Array.isArray(y.tables)||y.tables.length===0)continue;let p=pu({...y,slotBindingKey:i||y.slotBindingKey,slotRevisionKey:a||y.slotRevisionKey,sourceSwipeId:Gr(e?.sourceSwipeId||e?.effectiveSwipeId,y.sourceSwipeId),meta:{...y.meta||{},sourceKind:Gt.HISTORY,mergeBaseOnly:!0,reconstructedFromHistory:!0,isolationKey:l,resolvedFromMessageId:y.sourceMessageId,resolvedFromRevisionKey:y.slotRevisionKey}});return Ea({loadMode:ns.HISTORY,mergeBaseOnly:!0,state:p,sourceKind:Gt.HISTORY,resolvedFromMessageId:y.sourceMessageId,resolvedFromRevisionKey:y.slotRevisionKey})}return Array.isArray(n)&&n.length>0?Ea({loadMode:ns.TEMPLATE,mergeBaseOnly:!1,state:na(e,{tables:fe(n),meta:{fromTemplate:!0,isolationKey:l,sourceKind:Gt.TEMPLATE,resolvedFromMessageId:"",resolvedFromRevisionKey:""}}),sourceKind:Gt.TEMPLATE}):Ea({loadMode:ns.EMPTY,mergeBaseOnly:!1,state:na(e,{meta:{isolationKey:l,sourceKind:Gt.EMPTY,resolvedFromMessageId:"",resolvedFromRevisionKey:""}}),sourceKind:Gt.EMPTY})}var mh=O(()=>{We()});function gh(){return yu||(yu=$.createScope("TableStateMirror")),yu}async function Q_(t,e,r){try{await at(),await Fi({chatId:t?.chatId,messageId:t?.sourceMessageId,swipeId:t?.sourceSwipeId||t?.effectiveSwipeId,isolationKey:e},Array.isArray(r)?r:[]),gh().info("slot \u5DF2\u955C\u50CF\u5230 SQL",{chatId:t?.chatId,messageId:t?.sourceMessageId,tableCount:r?.length||0})}catch(n){gh().warn("SQL \u955C\u50CF\u5931\u8D25\uFF08\u4E0D\u5F71\u54CD\u4E3B\u6D41\u7A0B\uFF09",{error:n?.message||String(n)})}}function hh(t){return t==null?"":String(t).trim()}function X_(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window}function mu(){try{let t=X_(),e=t?.SillyTavern||null,r=e?.getContext?.()||null,n=Array.isArray(r?.chat)?r.chat:[],s=Array.isArray(e?.chat)?e.chat:[],o=n.length?n:s;return{topWindow:t,api:e,context:r,chat:o,contextChat:n,apiChat:s}}catch{return{topWindow:null,api:null,context:null,chat:[],contextChat:[],apiChat:[]}}}function Z_(t){if(!t||t?.is_user===!0||t?.is_system===!0)return!1;let e=String(t?.role||"").trim().toLowerCase();return e==="assistant"||e==="ai"||!e}function eE(t=[],e=""){let r=hh(e);if(!Array.isArray(t)||!r)return-1;for(let n=t.length-1;n>=0;n-=1){let s=t[n];if(!Z_(s))continue;if([s?.sourceId,s?.message_id,s?.messageId,s?.id,s?.mes_id,s?.mid,s?.mesid,s?.chat_index,s?.index,n].map(a=>hh(a)).includes(r))return n}return-1}function yl(t){let e=mu(),r=eE(e.chat,t?.sourceMessageId);return r<0?{runtime:e,messageIndex:r,message:null}:{runtime:e,messageIndex:r,message:e.chat[r]||null}}function fl(t,e,r){let n=s=>{!Array.isArray(s)||e<0||e>=s.length||(s[e]={...s[e]||{},...r})};n(t?.contextChat),n(t?.apiChat)}async function ml(t){let e=t?.context||null,r=t?.api||null,n=e?.saveChatDebounced||r?.saveChatDebounced||null,s=e?.saveChat||r?.saveChat||null;typeof n=="function"&&n.call(e||r),typeof s=="function"&&await s.call(e||r)}function Ca(t){return!t||typeof t!="object"||Array.isArray(t)?!1:!!(Array.isArray(t.tables)||typeof t.chatId=="string"&&t.chatId.length>0||typeof t.slotBindingKey=="string"&&t.slotBindingKey.length>0)}function ys(t){return!t||typeof t!="object"||Array.isArray(t)?!1:"lastResolvedTarget"in t||"lastCommittedTarget"in t}function Aa(t,e,r,n){if(!t)return null;let s=t[e];if(!s)return null;let o=De(r);return typeof n=="function"&&n(s)?o===Ot?s:null:s[o]||null}function fu(t,e,r,n,s){if(!t)return;let o=De(r),a=t[e];if(typeof s=="function"&&s(a)){let i={[Ot]:a};i[o]=n,t[e]=i}else a&&typeof a=="object"&&!Array.isArray(a)?t[e]={...a,[o]:n}:t[e]={[o]:n}}function pl(t,e,r,n){if(!t)return!1;let s=De(r),o=t[e];if(!o)return!1;if(typeof n=="function"&&n(o))return s===Ot?(delete t[e],!0):!1;if(o&&typeof o=="object"&&!Array.isArray(o)){if(o[s]===void 0)return!1;let a={...o};return delete a[s],Object.keys(a).length===0?delete t[e]:t[e]=a,!0}return!1}function gl(t,e={}){let{message:r}=yl(t),n=e.isolationKey===void 0?ye.getKey():e.isolationKey,s=Aa(r,un,n,Ca);return kr(s)}function bh(t,e={}){let{runtime:r,messageIndex:n}=yl(t);return fh({runtime:r,targetSnapshot:t,currentMessageIndex:n,templateTables:Array.isArray(e.templateTables)?e.templateTables:[],isolationKey:e.isolationKey===void 0?ye.getKey():e.isolationKey})}async function xh(t,e={}){let{runtime:r,messageIndex:n,message:s}=yl(t);if(!s||n<0)return{success:!1,error:"target_message_not_found"};let o=e.isolationKey===void 0?ye.getKey():e.isolationKey,a=Aa(s,pn,o,ys),i={...ki(a),lastResolvedTarget:js(t),updatedAt:Date.now()};return fu(s,pn,o,i,ys),fl(r,n,s),await ml(r),{success:!0,bindings:i}}async function fo(t,e,r={}){let n=r.skipFreshValidation===!0?t:await uh(t,r),s=r.skipFreshValidation===!0?{valid:!0,reason:"skipped"}:ph(t,n);if(!s.valid)return{success:!1,error:"target_changed_before_commit",validation:s};let o=n||t,{runtime:a,messageIndex:i,message:l}=yl(o);if(!l||i<0)return{success:!1,error:"target_message_not_found",validation:s};let d=r.isolationKey===void 0?ye.getKey():r.isolationKey,c=na(o),u={...c.meta||{},...e.meta||{},...r.locks?{locks:r.locks}:{},...r.previousSnapshot?{previousSnapshot:r.previousSnapshot}:{},isolationKey:d},y=kr({...c,...e,meta:u,slotBindingKey:o.slotBindingKey,slotRevisionKey:o.slotRevisionKey,sourceMessageId:o.sourceMessageId,sourceSwipeId:o.sourceSwipeId||o.effectiveSwipeId,updatedAt:Date.now()}),p=Aa(l,pn,d,ys),m={...ki(p),lastResolvedTarget:js(o),lastCommittedTarget:js(o),updatedAt:Date.now()};return fu(l,un,d,y,Ca),fu(l,pn,d,m,ys),fl(a,i,l),await ml(a),Q_(o,d,y?.tables||[]).catch(()=>{}),{success:!0,state:y,bindings:m,validation:s,messageIndex:i,sourceMessageId:o.sourceMessageId,slotRevisionKey:o.slotRevisionKey}}function fs(t=null,e={}){let r=Jt.getAssistantMessageSnapshot(t);if(!r?.message)return null;let n=e.isolationKey===void 0?ye.getKey():e.isolationKey;return{...r,tableState:kr(Aa(r.message,un,n,Ca)),tableBindings:ki(Aa(r.message,pn,n,ys))}}async function wh(t,e={}){let r=mu();if(!Array.isArray(r.chat)||t<0||t>=r.chat.length)return{success:!1,error:"invalid_message_index",messageIndex:t};let n=r.chat[t];if(!n)return{success:!1,error:"message_not_found",messageIndex:t};let s=e.isolationKey===void 0?ye.getKey():e.isolationKey,o=pl(n,un,s,Ca),a=e.clearBindings===!1?!1:pl(n,pn,s,ys);return(o||a)&&(fl(r,t,n),await ml(r)),{success:!0,cleared:o||a,messageIndex:t,isolationKey:s}}async function vh(t={}){let e=mu(),r=Number.isFinite(t.fromMessageIndex)?t.fromMessageIndex:0,n=Number.isFinite(t.toMessageIndex)?t.toMessageIndex:(e.chat?.length||0)-1,s=t.isolationKey===void 0?ye.getKey():t.isolationKey,o=0;for(let a=r;a<=n;a++){let i=e.chat[a];if(!i)continue;let l=pl(i,un,s,Ca),d=pl(i,pn,s,ys);(l||d)&&(fl(e,a,i),o++)}return o>0&&await ml(e),{success:!0,touched:o,from:r,to:n,isolationKey:s}}var yu,ms=O(()=>{cs();We();Ur();mh();_a();Ui();Z()});function Th(t){let e=new Set;if(!Array.isArray(t))return e;for(let r of t){let n=r?.order;Number.isFinite(n)&&e.add(Math.floor(n))}return e}function ka(t,e=5e4,r=1,n=99999){for(let s=e;s<=n;s++)if(!t.has(s))return t.add(s),s;for(let s=r;s<e;s++)if(!t.has(s))return t.add(s),s;return Sh.warn("\u65E0\u53EF\u7528 order \u69FD\u4F4D"),t.add(e),e}function _h(t,e,r=5e4,n=1,s=99999){let o=s-e+1;for(let a=r;a<=o;a++){let i=!0;for(let l=0;l<e;l++)if(t.has(a+l)){i=!1;break}if(i){for(let l=0;l<e;l++)t.add(a+l);return a}}for(let a=n;a<r&&a<=o;a++){let i=!0;for(let l=0;l<e;l++)if(t.has(a+l)){i=!1;break}if(i){for(let l=0;l<e;l++)t.add(a+l);return a}}Sh.warn(`\u65E0\u6CD5\u5206\u914D ${e} \u4E2A\u8FDE\u7EED order \u69FD\u4F4D`);for(let a=0;a<e;a++)t.add(r+a);return r}var Sh,Eh=O(()=>{Z();Sh=$.createScope("TableWBOrder")});function hl(t,e="before_character_definition"){let r=String(t||"").trim().toLowerCase();return r==="at_depth_as_system"||r==="system"?"at_depth_as_system":r==="before_char"||r==="before_character"||r==="before_character_definition"||r==="0"?"before_character_definition":r==="after_char"||r==="after_character"||r==="after_character_definition"||r==="1"?"after_character_definition":e}function gs(t,e){if(!e)return t;let r={...t,position:e.position};return e.position==="at_depth_as_system"?r.depth=e.depth:delete r.depth,r}var lM,cM,Ah=O(()=>{lM=Object.freeze(["at_depth_as_system","before_character_definition","after_character_definition"]);cM=Object.freeze({position:"before_character_definition",depth:2,order:5e4})});function hu(t,e=""){return t==null?e:String(t).trim()||e}function nE(t){return hu(t,"default_chat").replace(/[\[\]=]/g,"_")}function Rh(){let t=globalThis.window||globalThis;return hu(t?.TavernHelper?.getCurrentChatId?.()||t?.Silvy?.getCurrentChatId?.()||t?.chat_metadata?.chat_id||t?.this_chid||t?.name1,"default_chat")}function bu(){try{if(typeof TavernHelper<"u"&&TavernHelper)return TavernHelper}catch{}return sn()?.TavernHelper||null}function sE(t){return String(t??"").replace(/\|/g,"\uFF5C").replace(/\n/g," ")}function gu(t){let e=Array.isArray(t.columns)?t.columns:[],r=Array.isArray(t.rows)?t.rows:[];if(r.length===0)return"";let n=e.map(l=>l.key),s=e.map(l=>l.title||l.key),o=`| ${s.join(" | ")} |`,a=`| ${s.map(()=>"---").join(" | ")} |`,i=r.map(l=>{let d=l.cells||{};return`| ${n.map(c=>sE(d[c])).join(" | ")} |`});return`# ${t.name||"\u672A\u547D\u540D\u8868"}

${o}
${a}
${i.join(`
`)}`}function oE(t,e){if(!Array.isArray(t)||t.length===0)return[];let r=new Map;if(Array.isArray(e))for(let n of e){let s=n?.id||n?.key;s&&r.set(s,n)}return t.map(n=>{let s=n?.id?r.get(n.id):null;return{...n,exportConfig:n?.exportConfig||s?.exportConfig||{enabled:!1},enabled:n?.enabled!==!1}})}function bl(t){return`${Ih}${tE}${nE(t)}${rE}-`}function aE(t){return`${Ih}[${hu(t,"default_chat")}]-`}function xu(t,e){if(!t||typeof t!="string")return!1;let r=bl(e);if(t.startsWith(r))return!0;let n=aE(e);return!!t.startsWith(n)}function Ch(t,e){let r=bl(t),n=String(e||"").trim();return n?`${r}${n}`:`${r}\u586B\u8868\u6570\u636E`}function kh(t,e,r){return`${bl(t)}Wrapper-${r}`}function iE(t,e){return t?t.content!==e.content||t.enabled!==e.enabled||t.type!==e.type||t.position!==e.position||t.prevent_recursion!==e.prevent_recursion||t.order!==e.order:!0}async function hs(t,e,r,n,s,o,a){let i=r.find(l=>l.comment===n);return i&&a&&!xu(i.comment,a)?(fr.warn(`upsert \u8DF3\u8FC7\uFF1A\u73B0\u6709\u6761\u76EE comment "${n}" \u4E0D\u5C5E\u4E8E\u5F53\u524D chat`,{chatId:a}),{action:"skipped",comment:n,reason:"cross_chat_collision"}):i&&i.uid?iE(i,s)?(await Promise.resolve(t.setLorebookEntries(e,[{uid:i.uid,...s}])),fr.info(`\u4E16\u754C\u4E66\u6761\u76EE\u5DF2\u66F4\u65B0\uFF1A${n}`),{action:"updated",comment:n}):(o.add(i.order||0),{action:"skipped",comment:n}):typeof t.createLorebookEntries=="function"?(await Promise.resolve(t.createLorebookEntries(e,[{comment:n,keys:[],...s}])),fr.info(`\u4E16\u754C\u4E66\u6761\u76EE\u5DF2\u521B\u5EFA\uFF1A${n}`),{action:"created",comment:n}):{action:"failed",comment:n,error:"createLorebookEntries \u4E0D\u53EF\u7528"}}async function Mh(t){let e=t?.worldbookSync,r=e?.injectionMode||"character_card",n=bu();if(r==="target_book"){let s=String(e?.targetBook||"").trim();return s?{targetBook:s}:{error:"no_target_book"}}if(r==="character_card"){if(n){if(typeof n.getCurrentCharPrimaryLorebook=="function"){let s=await Promise.resolve(n.getCurrentCharPrimaryLorebook());if(s)return{targetBook:String(s)}}if(typeof n.getCharLorebooks=="function"){let s=await Promise.resolve(n.getCharLorebooks());if(s?.primary)return{targetBook:String(s.primary)}}}return{error:"no_character_lorebook"}}if(r==="auto_create"){if(n){if(typeof n.getOrCreateChatWorldbook=="function")try{let s=await Promise.resolve(n.getOrCreateChatWorldbook("current"));if(s)return{targetBook:String(s)}}catch(s){fr.warn("getOrCreateChatWorldbook \u5931\u8D25",s)}if(typeof n.getOrCreateChatLorebook=="function")try{let s=await Promise.resolve(n.getOrCreateChatLorebook());if(s)return{targetBook:String(s)}}catch(s){fr.warn("getOrCreateChatLorebook \u5931\u8D25",s)}}return{error:"chat_worldbook_unavailable"}}return{error:"unknown_injection_mode"}}async function Ph(t,e){if(!e?.worldbookSync?.enabled)return{skipped:!0,reason:"disabled"};let n=await Mh(e);if(n.error)return{skipped:!0,reason:n.error};let s=n.targetBook,o=bu();if(!o)return{success:!1,error:"TavernHelper \u4E0D\u53EF\u7528"};if(typeof o.getLorebookEntries!="function")return{success:!1,error:"getLorebookEntries \u4E0D\u53EF\u7528"};if(typeof o.setLorebookEntries!="function"&&typeof o.createLorebookEntries!="function")return{success:!1,error:"\u4E16\u754C\u4E66\u5199\u5165 API \u4E0D\u53EF\u7528"};let a=Rh(),i=bl(a),l=Array.isArray(e?.tables)?e.tables:[],c=oE(t,l).filter(p=>p&&p.enabled!==!1&&Array.isArray(p.rows)&&p.rows.length>0);if(c.length===0)return{skipped:!0,reason:"empty_tables"};let u=e?.wrapperConfig||{},y=u.enabled!==!1;try{let p=await Promise.resolve(o.getLorebookEntries(s));Array.isArray(p)||(p=[]);let m=Th(p),g=[],h=c.filter(_=>_.exportConfig?.enabled===!0),b=c.filter(_=>_.exportConfig?.enabled!==!0),v="";if(b.length>0&&(v=b.map(_=>gu(_)).join(`

`)),y&&(v||h.length>0)){let _=u.wrapperTag||"\u6700\u65B0\u6570\u636E\u4E0E\u8BB0\u5F55",A=u.wrapperHint||"",I=u.wrapperPlacement||{},P=I.order||5e4,C=_h(m,3,P,1,99999),N=hl(I.position,"before_character_definition"),W=Number.isFinite(I.depth)?I.depth:2,H=`<${_}>
${A}`;g.push(await hs(o,s,p,kh(a,_,"Start"),gs({content:H,enabled:!0,type:"constant",order:C,prevent_recursion:!0},{position:N,depth:W}),m,a)),v&&g.push(await hs(o,s,p,`${i}\u5168\u5C40\u6570\u636E`,gs({content:v,enabled:!0,type:"constant",order:C+1,prevent_recursion:!0},{position:N,depth:W}),m,a)),g.push(await hs(o,s,p,kh(a,_,"End"),gs({content:`</${_}>`,enabled:!0,type:"constant",order:C+2,prevent_recursion:!0},{position:N,depth:W}),m,a))}else if(v){let _=ka(m,5e4,1,99999);g.push(await hs(o,s,p,`${i}\u5168\u5C40\u6570\u636E`,{content:v,enabled:!0,type:"constant",position:"before_character_definition",order:_,prevent_recursion:!0},m,a))}for(let _ of h){let A=_.exportConfig||{},I=A.entryName||_.name||"\u672A\u547D\u540D\u8868",P=A.entryType==="keyword"?"keyword":"constant",C=A.entryPlacement||{},N=hl(C.position,"before_character_definition"),W=H=>Array.isArray(H.rows)&&H.rows.length>0&&Array.isArray(H.columns)&&H.columns.length>0?A.injectionTemplate?lE(A.injectionTemplate,H):gu(H):"";if(A.splitByRow){A.extraIndexPlacement?.position&&A.extraIndexPlacement.position!==C.position&&fr.info(`splitByRow \u6A21\u5F0F\u4E0B extraIndexPlacement \u4E0D\u751F\u6548 [${I}]`);let H=Array.isArray(_.rows)?_.rows:[];for(let ee=0;ee<H.length;ee++){let te=H[ee]?.name||`${I}-\u884C${ee+1}`,z=Ch(a,te),J={..._,name:te,rows:[H[ee]]},de=W(J);if(!de)continue;let Q=ka(m,C.order||5e4,1,99999);g.push(await hs(o,s,p,z,gs({content:de,enabled:!0,type:P,order:Q,prevent_recursion:A.preventRecursion!==!1},{position:N,depth:C.depth||2}),m,a))}}else{let H=Ch(a,I),ee=W(_);if(!ee)continue;let te=ka(m,C.order||5e4,1,99999);g.push(await hs(o,s,p,H,gs({content:ee,enabled:!0,type:P,order:te,prevent_recursion:A.preventRecursion!==!1},{position:N,depth:C.depth||2}),m,a));let z=A.extraIndexPlacement;if(z&&z.position&&z.position!==C.position){let J=hl(z.position,"before_character_definition"),de=`${H}-extra`,Q=ka(m,z.order||5e4,1,99999);g.push(await hs(o,s,p,de,gs({content:ee,enabled:!0,type:P,order:Q,prevent_recursion:A.preventRecursion!==!1},{position:J,depth:z.depth||2}),m,a))}}}let x=new Set(g.map(_=>_.comment).filter(Boolean)),T=p.filter(_=>!_.comment||!xu(_.comment,a)?!1:!x.has(_.comment));if(T.length>0){let _=T.map(A=>A.uid).filter(Boolean);_.length>0&&typeof o.deleteLorebookEntries=="function"&&(await Promise.resolve(o.deleteLorebookEntries(s,_)),fr.info(`\u5DF2\u6E05\u7406 ${_.length} \u4E2A\u65E7\u4E16\u754C\u4E66\u6761\u76EE [${a}]`))}let E=g.filter(_=>_.action==="created").length,w=g.filter(_=>_.action==="updated").length;return fr.info(`\u4E16\u754C\u4E66\u540C\u6B65\u5B8C\u6210 [${a}]\uFF1A${E} \u521B\u5EFA, ${w} \u66F4\u65B0, ${T.length} \u6E05\u7406`),{success:!0,results:g,stats:{created:E,updated:w,cleaned:T.length},targetBook:s,chatId:a}}catch(p){return fr.warn("\u4E16\u754C\u4E66\u540C\u6B65\u5931\u8D25:",p),{success:!1,error:p?.message||"\u4E16\u754C\u4E66\u540C\u6B65\u5931\u8D25"}}}async function Nh(t){let e=await Mh(t);if(e.error)return{success:!1,error:e.error};let r=e.targetBook,n=bu();if(!n||typeof n.getLorebookEntries!="function")return{success:!1,error:"TavernHelper \u4E0D\u53EF\u7528"};let s=Rh();try{let o=await Promise.resolve(n.getLorebookEntries(r));if(!Array.isArray(o))return{success:!0,cleaned:0};let a=o.filter(l=>l.comment&&xu(l.comment,s));if(a.length===0)return{success:!0,cleaned:0,targetBook:r};let i=a.map(l=>l.uid).filter(Boolean);return i.length>0&&typeof n.deleteLorebookEntries=="function"&&(await Promise.resolve(n.deleteLorebookEntries(r,i)),fr.info(`\u5DF2\u6E05\u9664 ${i.length} \u4E2A\u4E16\u754C\u4E66\u6761\u76EE [${s}]`)),{success:!0,cleaned:i.length,targetBook:r}}catch(o){return fr.warn("\u6E05\u9664\u4E16\u754C\u4E66\u6761\u76EE\u5931\u8D25:",o),{success:!1,error:o?.message||"\u6E05\u9664\u5931\u8D25"}}}function lE(t,e){let r=t;r=r.replace(/\{\{tableName\}\}/g,e.name||"\u672A\u547D\u540D\u8868"),r.includes("{{tableContent}}")&&(r=r.replace(/\{\{tableContent\}\}/g,gu(e)));let n=Array.isArray(e.columns)?e.columns:[],o=(Array.isArray(e.rows)?e.rows:[])[0];if(o)for(let a of n){let i=a?.key;if(!i)continue;let l=`{{${i}}}`;if(!r.includes(l))continue;let d=String(o.cells?.[i]??"");r=r.split(l).join(d)}return r}var fr,Ih,tE,rE,wu=O(()=>{Vn();Z();Eh();Ah();fr=$.createScope("TableWorldbookSync"),Ih="YYT-",tE="[YY:chatId=",rE="]"});function xl(t,e=""){return t==null?e:String(t).trim()||e}function dE(t={}){return{tables:Array.isArray(t?.tables)?fe(t.tables):[]}}function uE(t={},e={}){let r=xl(e.mirrorTag,"yyt-table-workbench"),n=dE(t);return[`<${r}>`,"[\u586B\u8868\u5DE5\u4F5C\u53F0]","```json",JSON.stringify(n,null,2),"```",`</${r}>`].join(`
`)}async function $h({targetSnapshot:t,nextTables:e,config:r,loadResult:n=null,diff:s=null,fillMode:o="",skipNotify:a=!1}={}){let i=or(r),l=await fo(t,{tables:Array.isArray(e)?fe(e):[],meta:{lastLoadMode:xl(n?.loadMode,""),lastFillMode:xl(o),mergeBaseOnly:!1,updatedBy:xl(t?.runSource,"MANUAL_TABLE")}});if(!l?.success)return{success:!1,error:l?.error||"table_state_commit_failed",commitResult:l,mirrorResult:null,warning:""};let d=null,c=null,u="";if(i.mirrorToMessage){let y=uE(l.state,{mirrorTag:i.mirrorTag});d=await Jt.injectDetailed(cE,y,{overwrite:!0,extractionSelectors:[i.mirrorTag],sourceMessageId:l.sourceMessageId,sourceSwipeId:t?.sourceSwipeId||t?.effectiveSwipeId,effectiveSwipeId:t?.effectiveSwipeId||t?.sourceSwipeId,slotBindingKey:t?.slotBindingKey,slotRevisionKey:t?.slotRevisionKey,slotTransactionId:t?.slotTransactionId,traceId:t?.traceId,skipNotify:a}),d?.success||(u=d?.error||"\u6B63\u6587\u955C\u50CF\u5199\u56DE\u5931\u8D25")}return i.worldbookSync?.enabled&&(c=await Ph(Array.isArray(e)?e:[],i),c&&!c.success&&!c.skipped&&(u=u?`${u}; ${c.error}`:c.error||"\u4E16\u754C\u4E66\u540C\u6B65\u5931\u8D25")),{success:!0,state:l.state,bindings:l.bindings,diff:s,fillMode:o,commitResult:l,mirrorResult:d,worldbookSyncResult:c,warning:u}}var cE,Lh=O(()=>{cs();We();ms();sr();wu();cE="tableWorkbenchMirror"});function pE(t){return typeof t!="string"||!t?t:t.replace(/[“”「」『』＂]/g,'"')}function vu(t,e){for(let r=e;r<t.length;r++)if(!/\s/.test(t[r]))return{char:t[r],index:r};return{char:"",index:-1}}function Bh(t){return!!t&&(t==='"'||t==="{"||t==="["||t==="-"||/\d/.test(t)||t==="t"||t==="f"||t==="n")}function yE(t,e,r,n){let s=vu(t,e+1),o=s.char;if(!o)return r!=="key";if(r==="key")return o===":";if(o==="}"||o==="]")return!0;if(o!==",")return!1;let a=vu(t,s.index+1).char;return a?n==="object"?a==='"'||a==="}":n==="array"?a==="]"||Bh(a):Bh(a)||a==="}"||a==="]":!0}function fE(t){if(typeof t!="string")return{success:!1,result:t,error:"not a string"};let e="",r=!1,n=!1,s=null,o=[],a=()=>o.length?o[o.length-1]:null,i=()=>{let l=a();l&&(l.expecting="commaOrEnd")};for(let l=0;l<t.length;l++){let d=t[l];if(n){e+=d,n=!1;continue}if(r){if(d==="\\"){e+=d,n=!0;continue}if(d==='"'){let c=a();yE(t,l,s,c?.type||null)?(e+=d,r=!1,s==="key"&&c?.type==="object"?c.expecting="colon":i(),s=null):e+='\\"';continue}e+=d;continue}if(d==='"'){e+=d,r=!0;let c=a();s=c&&c.type==="object"&&(c.expecting==="key"||c.expecting==="keyOrEnd")?"key":"value";continue}if(d==="{"){e+=d,o.push({type:"object",expecting:"keyOrEnd"});continue}if(d==="["){e+=d,o.push({type:"array",expecting:"valueOrEnd"});continue}if(d===":"){e+=d;let c=a();c?.type==="object"&&(c.expecting="value");continue}if(d===","){e+=d;let c=a();c?.type==="object"&&(c.expecting="key"),c?.type==="array"&&(c.expecting="value");continue}if(d==="}"||d==="]"){e+=d,o.pop(),i();continue}e+=d}return{success:!0,result:e,error:null}}function mE(t){if(typeof t!="string"||!t)return t;let e="",r=!1,n=!1;for(let s=0;s<t.length;s++){let o=t[s];if(n){e+=o,n=!1;continue}if(o==="\\"){e+=o,r&&(n=!0);continue}if(o==='"'){e+=o,r=!r;continue}if(r){if(o===`
`){e+="\\n";continue}if(o==="\r"){e+="\\r";continue}if(o==="	"){e+="\\t";continue}if(o==="\0"){e+="\\u0000";continue}}e+=o}return e}function gE(t){if(typeof t!="string"||!t)return t;let e="",r=!1,n=!1;for(let s=0;s<t.length;s++){let o=t[s];if(n){e+=o,n=!1;continue}if(o==="\\"){e+=o,r&&(n=!0);continue}if(o==='"'){e+=o,r=!r;continue}if(!r&&o===","){let a=vu(t,s+1).char;if(a==="}"||a==="]")continue}e+=o}return e}function hE(t){return typeof t!="string"||!t?t:t.replace(/([{,]\s*)(-?\d+)(\s*:)/g,'$1"$2"$3')}function Ia(t){if(typeof t!="string")return{success:!1,result:t,layersApplied:[],error:"Input is not a string"};let e=[],r=t,n=pE(r);n!==r&&e.push("normalizeQuotes"),r=n;let s=fE(r);if(!s.success)return{success:!1,result:r,layersApplied:e,error:s.error};s.result!==r&&e.push("escapeUnescapedQuotes"),r=s.result;let o=mE(r);o!==r&&e.push("sanitizeControlChars"),r=o;let a=gE(r);a!==r&&e.push("removeTrailingCommas"),r=a;let i=hE(r);return i!==r&&e.push("fixNumericKeys"),r=i,{success:!0,result:r,layersApplied:e,error:null}}function bE(t,e=","){if(typeof t!="string"||!t)return[];let r=[],n="",s=!1,o=!1,a=0,i=0,l=0;for(let d=0;d<t.length;d++){let c=t[d];if(o){n+=c,o=!1;continue}if(c==="\\"){n+=c,s&&(o=!0);continue}if(c==='"'){n+=c,s=!s;continue}if(!s){if(c==="{")a++;else if(c==="}")a=Math.max(0,a-1);else if(c==="[")i++;else if(c==="]")i=Math.max(0,i-1);else if(c==="(")l++;else if(c===")")l=Math.max(0,l-1);else if(c===e&&a===0&&i===0&&l===0){n.trim()&&r.push(n.trim()),n="";continue}}n+=c}return n.trim()&&r.push(n.trim()),r}function xE(t,e=":"){if(typeof t!="string"||!t)return-1;let r=!1,n=!1,s=0,o=0,a=0;for(let i=0;i<t.length;i++){let l=t[i];if(n){n=!1;continue}if(l==="\\"){r&&(n=!0);continue}if(l==='"'){r=!r;continue}if(!r){if(l==="{")s++;else if(l==="}")s=Math.max(0,s-1);else if(l==="[")o++;else if(l==="]")o=Math.max(0,o-1);else if(l==="(")a++;else if(l===")")a=Math.max(0,a-1);else if(l===e&&s===0&&o===0&&a===0)return i}}return-1}function Su(t){if(typeof t!="string")return{success:!0,value:t,error:null};let e=t.trim();if(!e)return{success:!1,value:null,error:"Empty value"};let n=`[${e.startsWith("'")&&e.endsWith("'")?`"${e.slice(1,-1).replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\r/g,"\\r").replace(/\n/g,"\\n").replace(/\t/g,"\\t")}"`:e}]`;try{return{success:!0,value:JSON.parse(n)[0],error:null}}catch(s){let o=Ia(n);if(o.success)try{return{success:!0,value:JSON.parse(o.result)[0],error:null}}catch{}return{success:!1,value:null,error:s?.message||"Failed to parse loose value"}}}function wE(t){let e=typeof t=="string"?t.trim():"";if(!e)return null;if(/^-?\d+$/.test(e))return e;let r=Su(e);return r.success&&(typeof r.value=="string"||typeof r.value=="number")?String(r.value):e.replace(/^["']|["']$/g,"")}function zh(t){if(typeof t!="string")return{success:!1,result:null,recoveredKeys:[],error:"not a string"};let e=t.trim();if(!e.startsWith("{")||!e.endsWith("}"))return{success:!1,result:null,recoveredKeys:[],error:"not an object literal"};let r=e.slice(1,-1).trim();if(!r)return{success:!0,result:{},recoveredKeys:[],error:null};let n=bE(r,",").filter(Boolean);if(!n.length)return{success:!1,result:null,recoveredKeys:[],error:"no segments"};let s={},o=0;for(let i of n){let l=xE(i,":");if(l!==-1){let c=wE(i.slice(0,l)),u=Su(i.slice(l+1));if(!c||!u.success)return{success:!1,result:null,recoveredKeys:Object.keys(s),error:`Failed segment: ${i}`};s[c]=u.value;let y=parseInt(c,10);!isNaN(y)&&String(y)===c&&(o=Math.max(o,y+1));continue}let d=Su(i);if(!d.success)return{success:!1,result:null,recoveredKeys:Object.keys(s),error:`Failed value: ${i}`};for(;Object.prototype.hasOwnProperty.call(s,String(o));)o++;s[String(o)]=d.value,o++}let a=Object.keys(s).sort((i,l)=>parseInt(i,10)-parseInt(l,10));return a.length?{success:!0,result:s,recoveredKeys:a,error:null}:{success:!1,result:null,recoveredKeys:[],error:"no keys recovered"}}function vE(t){if(typeof t!="string")return"";let e=t.trim();return e=e.replace(/'\s*\+\s*'/g,""),e.startsWith("'")&&e.endsWith("'")&&(e=e.slice(1,-1)),e=e.replace(/\\n/g,`
`),e=e.replace(/\\\\"/g,'\\"'),e=e.replace(/：/g,":"),e}function SE(t){let e=vE(t);if(!e)return[];let r=[];Oh.lastIndex=0;let n;for(;(n=Oh.exec(e))!==null;){let i=n[1];i&&i.trim()&&r.push(i)}if(r.length)return r;let s=i=>/(insertRow|updateRow|deleteRow)\s*\(/.test(i),o=/<!--([\s\S]*?)-->/g,a=[];for(;(n=o.exec(e))!==null;)s(n[1])&&a.push(n[1]);return a}function TE(t){let e=t.split(/\r?\n/),r=[],n="",s=!1;for(let a of e){let i=a.trim();if(!i||(!s&&i.includes("//")&&!i.includes('"//')&&!i.includes("'//")&&(i=i.split("//")[0].trim()),!i))continue;if(/^(insertRow|updateRow|deleteRow)\s*\(/.test(i)&&!s?(n&&r.push(n),n=i):n+=(n?" ":"")+i,n){let d=(n.match(/\{/g)||[]).length,c=(n.match(/\}/g)||[]).length;s=d>c}}n&&r.push(n);let o=[];for(let a of r){let i=/(?:^|;\s*)((?:insertRow|deleteRow|updateRow)\s*\()/g,l=[],d;for(;(d=i.exec(a))!==null;)l.push(d.index+(d[0].length-d[1].length));if(l.length<=1)o.push(a.replace(/;\s*$/,""));else for(let c=0;c<l.length;c++){let u=l[c],y=c+1<l.length?l[c+1]:a.length,p=a.substring(u,y).replace(/;\s*$/,"").trim();p&&o.push(p)}}return o}function _E(t){try{let e=t;if(e.match(/\)\s*;?\s*\/\/.*$/)&&(e=e.replace(/\/\/.*$/,"").trim()),!e)return null;let r=e.match(/^(insertRow|deleteRow|updateRow)\s*\((.*)\);?$/);if(!r)return null;let n=r[1],s=r[2],o=s.indexOf("{");if(o===-1)return{command:n,args:JSON.parse(`[${s}]`),line:e};let a=s.substring(0,o).trim(),i=s.substring(o),l=JSON.parse(`[${a.replace(/,$/,"")}]`);try{return{command:n,args:[...l,JSON.parse(i)],line:e}}catch{}let d=zh(i);if(d.success)return{command:n,args:[...l,d.result],line:e};let c=Ia(i);if(!c.success)return null;try{return{command:n,args:[...l,JSON.parse(c.result)],line:e}}catch{}let u=zh(c.result);return u.success?{command:n,args:[...l,u.result],line:e}:null}catch{return null}}function EE(t){if(!t)return null;let{command:e,args:r}=t;if(e==="insertRow"){let n=typeof r[0]=="number"?r[0]:0,s=typeof r[1]=="object"&&r[1]!==null?r[1]:{};return{op:e,tableIndex:n,data:s}}if(e==="deleteRow"){let n=typeof r[0]=="number"?r[0]:0,s=typeof r[1]=="number"?r[1]:0;return{op:e,tableIndex:n,rowIndex:s}}if(e==="updateRow"){let n=typeof r[0]=="number"?r[0]:0,s=typeof r[1]=="number"?r[1]:0,o=typeof r[2]=="object"&&r[2]!==null?r[2]:{};return{op:e,tableIndex:n,rowIndex:s,data:o}}return null}function Tu(t){let e=SE(t);if(!e.length)return null;let r=[],n=[];for(let s of e){let o=s.replace(/<!--|-->/g,"").trim();if(!o)continue;let a=TE(o);for(let i of a){let l=_E(i),d=EE(l);d?r.push(d):i&&/^(insertRow|updateRow|deleteRow)/.test(i)&&n.push(i.slice(0,200))}}if(n.length>0)try{console.warn("[TableJsonSanitizer] parseIncrementalEdits: %d \u6761\u6307\u4EE4\u89E3\u6790\u5931\u8D25",n.length,n)}catch{}return r.length?r:null}function _u(t){Dh.lastIndex=0;let e;for(;(e=Dh.exec(t))!==null;){let m=e[1].trim();if(m)try{return JSON.parse(m)}catch{let h=Ia(m);if(h.success)try{return JSON.parse(h.result)}catch{}}}let r=t.trim();try{return JSON.parse(r)}catch{}let n=Ia(r);if(n.success)try{return JSON.parse(n.result)}catch{}let s=r.indexOf("{"),o=r.indexOf("["),a=-1,i="",l="";if(s!==-1&&(o===-1||s<o)?(a=s,i="{",l="}"):o!==-1&&(a=o,i="[",l="]"),a===-1)return null;let d=0,c=-1,u=!1,y=!1;for(let m=a;m<r.length;m++){let g=r[m];if(y){y=!1;continue}if(g==="\\"&&u){y=!0;continue}if(g==='"'){u=!u;continue}if(!u){if(g===i)d++;else if(g===l&&(d--,d===0)){c=m;break}}}if(c===-1)return null;let p=r.substring(a,c+1);try{return JSON.parse(p)}catch{let g=Ia(p);if(g.success)try{return JSON.parse(g.result)}catch{}}return null}function Kh(t){if(!t||typeof t!="string")return{mode:"empty",edits:null,tables:null};let e=Tu(t);if(e)return{mode:"incremental",edits:e,tables:null};let r=_u(t);if(r){let n=null;if(Array.isArray(r))n=r;else if(r&&Array.isArray(r.tables))n=r.tables;else if(r&&typeof r=="object"){for(let s of Object.values(r))if(Array.isArray(s)){n=s;break}}if(Array.isArray(n))return{mode:"full",edits:null,tables:n}}return{mode:"empty",edits:null,tables:null}}var Oh,Dh,wl=O(()=>{Oh=/<tableEdit>([\s\S]*?)<\/tableEdit>/gi,Dh=/```(?:json)?\s*([\s\S]*?)```/gi});var AE,CE,Fh,Uh=O(()=>{wl();AE=/<tableEdit>[\s\S]*?<\/tableEdit>/i,CE=/(insertRow|updateRow|deleteRow)\s*\(/,Fh=Object.freeze({formatId:"dsl",displayName:"<tableEdit> DSL \u589E\u91CF\u534F\u8BAE",detect(t){return!t||typeof t!="string"?!1:AE.test(t)||CE.test(t)},parse(t){let e=Tu(t);return!Array.isArray(e)||e.length===0?null:{mode:"incremental",edits:e,tables:null}}})});function Wh(t){if(typeof t!="string")return t;let e=t.trim();return e.startsWith("'")&&e.endsWith("'")||e.startsWith('"')&&e.endsWith('"')?e.slice(1,-1).replace(/''/g,"'").replace(/\\'/g,"'"):e}function Eu(t){let e=String(t||"").match(/(\d+)$/);return e?parseInt(e[1],10):0}function Hh(t){let e=String(t||"").match(/row_id\s*=\s*(\d+)/i);return e?parseInt(e[1],10):-1}function kE(t){let e=t.match(/INSERT\s+INTO\s+(\S+)\s*\(([^)]*)\)\s*VALUES\s*\(([^)]*)\)/i);if(!e)return null;let r=e[1],n=e[2],s=e[3],o=n.split(",").map(l=>l.trim()),a=s.split(",").map(l=>Wh(l.trim())),i={};return o.forEach((l,d)=>{l!=="row_id"&&a[d]!==void 0&&(i[l]=a[d])}),{op:"insertRow",tableIndex:Eu(r),data:i}}function IE(t){let e=t.match(/UPDATE\s+(\S+)\s+SET\s+([\s\S]+?)\s+WHERE\s+([\s\S]+?);?$/i);if(!e)return null;let r=e[1],n=e[2],s=e[3],o={},a=n.split(/,(?![^()]*\))/);for(let i of a){let l=i.indexOf("=");if(l<0)continue;let d=i.slice(0,l).trim(),c=Wh(i.slice(l+1).trim());d&&d!=="row_id"&&(o[d]=c)}return{op:"updateRow",tableIndex:Eu(r),rowIndex:Hh(s),data:o}}function RE(t){let e=t.match(/DELETE\s+FROM\s+(\S+)\s+WHERE\s+([\s\S]+?);?$/i);return e?{op:"deleteRow",tableIndex:Eu(e[1]),rowIndex:Hh(e[2])}:null}function ME(t){let e=[];jh.lastIndex=0;let r;for(;(r=jh.exec(t))!==null;){let n=r[0].trim(),s=null;/^INSERT/i.test(n)?s=kE(n):/^UPDATE/i.test(n)?s=IE(n):/^DELETE/i.test(n)&&(s=RE(n)),s&&e.push(s)}return e}var Ra,jh,qh,Gh=O(()=>{Ra=/<sql>([\s\S]*?)<\/sql>/gi,jh=/(INSERT\s+INTO\s+\S+[\s\S]*?;)|(UPDATE\s+\S+\s+SET[\s\S]*?;)|(DELETE\s+FROM\s+\S+[\s\S]*?;)/gi;qh=Object.freeze({formatId:"sql",displayName:"SQL \u534F\u8BAE\uFF08INSERT/UPDATE/DELETE\uFF09",detect(t){return!t||typeof t!="string"?!1:Ra.test(t)?(Ra.lastIndex=0,!0):(Ra.lastIndex=0,/\b(INSERT\s+INTO|UPDATE\s+\S+\s+SET|DELETE\s+FROM)\b/i.test(t))},parse(t){let e="";Ra.lastIndex=0;let r,n=[];for(;(r=Ra.exec(t))!==null;)n.push(r[1]);n.length>0?e=n.join(`
`):e=t;let s=ME(e);return!Array.isArray(s)||s.length===0?null:{mode:"incremental",edits:s,tables:null}}})});var Yh,Vh=O(()=>{wl();Yh=Object.freeze({formatId:"full-json",displayName:"JSON envelope \u5168\u91CF\u534F\u8BAE",detect(t){return!t||typeof t!="string"?!1:/```json/i.test(t)||/\{[\s\S]*?"tables"\s*:/i.test(t)},parse(t){let e=_u(t);if(!e)return null;let r=null;if(Array.isArray(e))r=e;else if(e&&Array.isArray(e.tables))r=e.tables;else if(e&&typeof e=="object"){for(let n of Object.values(e))if(Array.isArray(n)){r=n;break}}return!Array.isArray(r)||r.length===0?null:{mode:"full",edits:null,tables:r}}})});function vl(){return Au||(Au=$.createScope("AiProtocolAdapter")),Au}function Jh(t){if(!t||typeof t!="string")return null;for(let e of PE){let r=!1;try{r=e.detect(t)}catch(n){vl().warn(`adapter ${e.formatId} detect \u629B\u9519`,n);continue}if(r)try{let n=e.parse(t);if(n&&(n.mode==="incremental"||n.mode==="full")&&(n.mode==="incremental"&&Array.isArray(n.edits)&&n.edits.length>0||n.mode==="full"&&Array.isArray(n.tables)&&n.tables.length>0))return vl().info("AI \u534F\u8BAE\u9002\u914D\u5668\u547D\u4E2D",{formatId:e.formatId,mode:n.mode,editsCount:n.edits?.length,tablesCount:n.tables?.length}),{...n,rawFormat:e.formatId}}catch(n){vl().warn(`adapter ${e.formatId} parse \u629B\u9519\uFF0C\u5C1D\u8BD5\u4E0B\u4E00\u4E2A`,n)}}return vl().warn("parseAiResponseAuto: \u65E0\u9002\u914D\u5668\u547D\u4E2D",{responseLength:t.length}),null}var Au,PE,Qh=O(()=>{Z();Uh();Gh();Vh();PE=Object.freeze([Fh,qh,Yh])});function NE(t,e){let r=new Map;Array.isArray(t)&&t.forEach((o,a)=>{o&&typeof o=="object"&&r.set(o.name||`__row_${a}`,o)});let n=new Map;Array.isArray(e)&&e.forEach((o,a)=>{o&&typeof o=="object"&&n.set(o.name||`__row_${a}`,o)});let s={};for(let[o,a]of n){let i=r.get(o);if(i){s[o]={};let l=new Set([...Object.keys(i.cells||{}),...Object.keys(a.cells||{})]);for(let d of l){let c=String((i.cells&&i.cells[d])??""),u=String((a.cells&&a.cells[d])??"");s[o][d]=c===u?"unchanged":"updated"}s[o].__rowStatus="kept"}else{if(s[o]={},a.cells&&typeof a.cells=="object")for(let l of Object.keys(a.cells))s[o][l]="new";s[o].__rowStatus="new"}}for(let[o]of r)n.has(o)||(s[o]={__rowStatus:"deleted"});return s}function Xh(t,e){let r=Array.isArray(t)?fe(t):[],n=Array.isArray(e)?fe(e):[],s={},o=Math.max(r.length,n.length);for(let a=0;a<o;a++){let i=r[a],l=n[a];!i&&l?(s[a]={},Array.isArray(l.rows)&&l.rows.forEach(d=>{let c=d.name||`__row_${l.rows.indexOf(d)}`;s[a][c]={__rowStatus:"new"}})):i&&!l?(s[a]={},Array.isArray(i.rows)&&i.rows.forEach(d=>{let c=d.name||`__row_${i.rows.indexOf(d)}`;s[a][c]={__rowStatus:"deleted"}})):i&&l&&(s[a]=NE(i.rows,l.rows))}return s}var Zh=O(()=>{We()});function $E(){return{mode:"native",async buildRequest(t={},e={}){if(typeof t.buildRequest!="function")throw new Error("table_provider_missing_build_request");return t.buildRequest(e)},async sendRequest(t={},e=null,r={}){if(typeof t.sendRequest!="function")throw new Error("table_provider_missing_send_request");return t.sendRequest(e?.messages||[],r.config||{},r.abortSignal||null)},parseResponse(t={},e=""){if(typeof t.parseResponse!="function")throw new Error("table_provider_missing_parse_response");return t.parseResponse(e)}}}function eb(){return $E()}var tb=O(()=>{});function OE(){return Cu||(Cu=$.createScope("TableLock")),Cu}function bs(t){return t!==null&&typeof t=="object"&&!Array.isArray(t)}function sb(){let t=nb.get(rb,{});return bs(t)?t:{}}function DE(t){nb.set(rb,t)}function Ma(t){let e=sb();return bs(e[t])?e[t]:{}}function ku(t,e){let r=sb();r[t]=e,DE(r),BE(t,e).catch(()=>{})}async function BE(t,e){try{let{chatKey:r,isolationKey:n}=(()=>{let o=String(t||"").indexOf("::");return o===-1?{chatKey:String(t||""),isolationKey:""}:{chatKey:t.slice(0,o),isolationKey:t.slice(o+2)}})();if(!r)return;let s=await Promise.resolve().then(()=>(Ui(),Dd));await s.ensureTableDataReady(),await s.clearScopeLocks({chatId:r,isolationKey:n});for(let[o,a]of Object.entries(e||{})){if(!bs(a))continue;let i={chatId:r,isolationKey:n};if(Array.isArray(a.rows))for(let l of a.rows)Number.isFinite(l)&&await s.setLockEntry(i,o,"row",String(l));if(Array.isArray(a.cols))for(let l of a.cols)typeof l=="string"&&l&&await s.setLockEntry(i,o,"column",l);if(Array.isArray(a.cells))for(let l of a.cells)typeof l=="string"&&l.includes(":")&&await s.setLockEntry(i,o,"cell",l);a.indexColumn===!0&&await s.setLockEntry(i,o,"index_column","")}}catch(r){OE().warn("lock-service SQL \u955C\u50CF\u5931\u8D25\uFF08\u4E0D\u5F71\u54CD\u4E3B\u6D41\u7A0B\uFF09",{error:r?.message||String(r)})}}function Pa(t){let e=am();return bs(t)&&(Array.isArray(t.rows)&&(e.rows=Array.from(new Set(t.rows.filter(r=>Number.isFinite(r)).map(r=>Math.floor(r)))),e.rows.sort((r,n)=>r-n)),Array.isArray(t.cols)&&(e.cols=Array.from(new Set(t.cols.filter(r=>typeof r=="string"&&r.length>0)))),Array.isArray(t.cells)&&(e.cells=Array.from(new Set(t.cells.filter(r=>typeof r=="string"&&r.includes(":"))))),e.indexColumn=t.indexColumn===!0),e}function Na(t){if(typeof t=="string")return t;if(bs(t)){if(typeof t.scopeKey=="string"&&t.scopeKey.includes("::"))return t.scopeKey;if(t.chatId!==void 0){let e=t.isolationKey!==void 0?t.isolationKey:ye.getKey();return sa(t.chatId,e)}}return sa("",ye.getKey())}function zE(t,e){let r=Ma(t),n={};if(!Array.isArray(e))return n;for(let s=0;s<e.length;s++){let o=e[s];if(!o)continue;let a=o.uid||o.id||"";a&&r[a]&&(n[s]=Pa(r[a]))}return n}function mo(t,e){let r=Na(t),n=Ma(r);return Pa(n[e])}function Sl(t,e,r,n=!0){if(!e||!Number.isFinite(r))return!1;let s=Na(t),o=Ma(s),a=Pa(o[e]),i=Math.floor(r),l=a.rows.includes(i);if(n&&!l)a.rows.push(i),a.rows.sort((d,c)=>d-c);else if(!n&&l)a.rows=a.rows.filter(d=>d!==i);else return!1;return o[e]=a,ku(s,o),!0}function Tl(t,e,r,n=!0){if(!e||!r)return!1;let s=Na(t),o=Ma(s),a=Pa(o[e]),i=a.cols.includes(r);if(n&&!i)a.cols.push(r);else if(!n&&i)a.cols=a.cols.filter(l=>l!==r);else return!1;return o[e]=a,ku(s,o),!0}function _l(t,e,r,n,s=!0){if(!e||!n||!Number.isFinite(r))return!1;let o=Na(t),a=Ma(o),i=Pa(a[e]),l=im(r,-1)==="-1:-1"?`${r}:${n}`:`${r}:${n}`,d=`${Math.floor(r)}:${n}`,c=i.cells.includes(d);if(s&&!c)i.cells.push(d);else if(!s&&c)i.cells=i.cells.filter(u=>u!==d);else return!1;return a[e]=i,ku(o,a),!0}function ob(t,e=[]){let r=Na(t);return zE(r,e)}function ab(t,e,r,n){if(!bs(t))return!1;let s=t[e];if(!s)return!1;if(Number.isFinite(r)&&s.rows.includes(r)||typeof n=="string"&&n.length>0&&s.cols.includes(n))return!0;if(Number.isFinite(r)&&typeof n=="string"&&n.length>0){let o=`${r}:${n}`;if(s.cells.includes(o))return!0}return!1}function Iu(t,e,r){if(!bs(t))return!1;let n=t[e];return n?Number.isFinite(r)&&n.rows.includes(r):!1}var LE,rb,Cu,nb,El=O(()=>{Je();Z();We();Ur();LE="tableLocks",rb="scopes";nb=j.namespace(LE)});function KE(){return Ru||(Ru=$.createScope("TableAutoSchedule")),Ru}function lb(t,e,r){let n=De(e||Ot);return`${String(t||"")}::${n}::${String(r||"")}`}function FE(t,e,r){if(!r)return null;let n=ib.get(lb(t,e,r),null);return n&&typeof n=="object"?n:null}function UE(t,e,r,n){if(!r)return;let s=Number.isFinite(n)?n:-1;ib.set(lb(t,e,r),{lastMessageIndex:s,lastUpdatedAt:new Date().toISOString()})}function cb(t,e,r=[],n){for(let s of r)UE(t,e,s,n)}function db({chatId:t,isolationKey:e,currentMessageIndex:r,scopeTables:n=[]}){let s=new Set,o={};for(let a of n){let i=a?.id||a?.uid||"";if(!i)continue;if(a?.enabled===!1){o[i]="disabled";continue}let l=a?.updateConfig?.updateFrequency;if(!Number.isFinite(l)||l===-1){s.add(i);continue}if(l===0){o[i]="frequency_zero";continue}if(l>=1){let d=FE(t,e,i);if(!d||!Number.isFinite(d.lastMessageIndex)){s.add(i);continue}let c=r-d.lastMessageIndex;c>=l?s.add(i):o[i]=`frequency_not_met (${c}/${l})`}else s.add(i)}return KE().info("buildAutoSchedulePlan",{chatId:t,isolationKey:e,currentMessageIndex:r,shouldUpdateCount:s.size,skipReasonsCount:Object.keys(o).length,shouldUpdateTables:[...s],skipReasons:o}),{shouldUpdate:s,skipReasons:o}}var ib,Ru,ub=O(()=>{Je();Z();We();ib=j.namespace("tableAutoSchedule")});function jE(t){let e=Jh(t);return e&&(e.mode==="incremental"||e.mode==="full")?e:Kh(t)}function Ie(){return $.createScope("TableUpdate")}function HE(t,e){return new Promise(r=>{if(e?.aborted){r(!1);return}let n,s=()=>{clearTimeout(n);try{e?.removeEventListener?.("abort",s)}catch{}r(!1)};n=setTimeout(()=>{try{e?.removeEventListener?.("abort",s)}catch{}r(!0)},t);try{e?.addEventListener?.("abort",s)}catch{}})}function oe(t,e=""){return t==null?e:String(t).trim()||e}function pb(t=[],e=8,r="all"){if(!Array.isArray(t)||t.length===0)return"";let n=r==="assistant_only"?t.filter(s=>s?.role==="assistant"):t;return n.slice(Math.max(n.length-e,0)).map(s=>`[${oe(s?.role,"unknown")}] ${String(s?.content||"").trim()}`).filter(Boolean).join(`

`)}function yb(t,{extractTags:e=[],useGlobalRules:r=!1,regexPresetId:n=""}={}){if(!t)return t;let s=Array.isArray(e)&&e.length>0,o=typeof n=="string"&&n.trim().length>0;if(!s&&!r&&!o)return t;try{let a=[],i=[];if(o)try{let l=Oe.getPreset(n);if(l){let d=Array.isArray(l.rules)?l.rules.filter(c=>c&&c.enabled!==!1&&c.value):[];a.push(...d),Array.isArray(l.blacklist)&&i.push(...l.blacklist.map(c=>String(c||"").trim()).filter(Boolean))}else Ie().warn("applyContextExtractionRules: \u627E\u4E0D\u5230\u6B63\u5219\u9884\u8BBE",{regexPresetId:n})}catch(l){Ie().warn("applyContextExtractionRules: \u52A0\u8F7D\u6B63\u5219\u9884\u8BBE\u5931\u8D25",l)}if(s&&a.push(...e.map(l=>{let d=String(l||"").trim();return d.startsWith("regex:")?{type:"regex_include",value:d.slice(6).trim(),enabled:!0}:{type:"include",value:d,enabled:!0}}).filter(l=>l.value)),r){let l=Ps()||[];a=[...a,...l.filter(d=>d?.enabled)],i=[...i,...Ns()||[]]}return a.length===0&&i.length===0?t:Dr(t,a,i)||t}catch(a){return Ie().warn("applyContextExtractionRules \u5931\u8D25\uFF0C\u56DE\u9000\u539F\u59CB\u6587\u672C",a),t}}function qE(t=[],e=-1){return!Number.isFinite(e)||e<0?t:t.map(r=>{let n=Array.isArray(r?.rows)?r.rows:[];return e===0||n.length<=e?r:{...r,rows:n.slice(n.length-e)}})}function GE(t=[]){return!Array.isArray(t)||t.length===0?"":t.map((e,r)=>{let n=e?.aiInstructions&&typeof e.aiInstructions=="object"?e.aiInstructions:{},s=Array.isArray(e?.columns)?e.columns:[],o=[`\u8868 ${r}: ${oe(e?.name,`\u8868${r+1}`)}`,`\u8868\u683C\u8BF4\u660E: ${oe(e?.note,"\u65E0")}`,`\u521D\u59CB\u5316\u8BF4\u660E: ${oe(n.init,"\u65E0")}`,`\u65B0\u589E\u8BF4\u660E: ${oe(n.create,"\u65E0")}`,`\u66F4\u65B0\u8BF4\u660E: ${oe(n.update,"\u65E0")}`,`\u5220\u9664\u8BF4\u660E: ${oe(n.delete,"\u65E0")}`,"\u5B57\u6BB5\uFF08\u8BF7\u7528\u5217\u7D22\u5F15\u4F5C\u4E3A data key\uFF09:"];return s.forEach((a,i)=>{o.push(`- [${i}]: ${oe(a?.title||a?.key,"\u672A\u547D\u540D\u5B57\u6BB5")} \u2014 ${oe(a?.description,"\u65E0")}`)}),o.join(`
`)}).join(`

`)}function YE(t,e=[]){if(!t||!Array.isArray(e)||e.length===0)return"";let r=e.map((s,o)=>{let a=oe(s?.name,`\u8868${o+1}`),i=t.includes(s,o);return`\u8868 ${o}: ${a} - ${i?"\u5141\u8BB8\u7F16\u8F91":"\u53EA\u8BFB\uFF0C\u7981\u6B62\u4FEE\u6539"}`});return e.some((s,o)=>!t.includes(s,o))&&(r.push(""),r.push('\u3010\u91CD\u8981\u7EA6\u675F\u3011\u6807\u8BB0\u4E3A"\u53EA\u8BFB"\u7684\u8868\u683C\uFF0C\u4F60\u5FC5\u987B\u5728\u8F93\u51FA\u4E2D\u539F\u6837\u4FDD\u7559\u5176\u6240\u6709\u884C\u6570\u636E\uFF0C\u4E0D\u5F97\u65B0\u589E\u3001\u4FEE\u6539\u6216\u5220\u9664\u4EFB\u4F55\u884C\u3002'),r.push("\u5168\u91CF\u8F93\u51FA\u65F6\uFF0C\u53EA\u8BFB\u8868\u683C\u7684 rows \u5FC5\u987B\u4E0E\u8F93\u5165\u4E2D\u7684\u5B8C\u5168\u4E00\u81F4\u3002")),r.join(`
`)}function gb(t={},e=0,r=[]){let n=t&&typeof t=="object"?t:{},s=n.cells&&typeof n.cells=="object"&&!Array.isArray(n.cells)?n.cells:{},o={},a=Array.isArray(r)?r.map(l=>oe(l?.key,"")).filter(Boolean):[];return new Set([...Object.keys(s),...a]).forEach(l=>{o[l]=oe(s[l],"")}),{...n,id:ra(n.id||n.rowId,e),name:oe(n.name,""),cells:o}}function ws(t={},e=0){let r=t&&typeof t=="object"?t:{},n=Array.isArray(r.columns)?fe(r.columns):[],s=Array.isArray(r.rows)?r.rows.map((o,a)=>gb(o,a,n)):[];return{...r,id:pr(r.id||r.key,e),rows:s}}function $r(t=[]){return Array.isArray(t)?t.map((e,r)=>ws(e,r)):[]}function VE(t=[],e=[],r){let n=$r(t),s=$r(e);if(!r)return s;let o=new Map(s.map((u,y)=>[pr(u?.id||u?.key,y),u])),a=n.map((u,y)=>({table:u,tableIndex:y,id:pr(u?.id||u?.key,y)})).filter(({table:u,tableIndex:y})=>r.includes(u,y)),i=new Set,l=new Map;for(let u=0;u<s.length;u++){let y=s[u],p=pr(y?.id||y?.key,u);o.has(p)&&(l.set(p,y),i.add(p))}let d=0,c=s.filter((u,y)=>{let p=pr(u?.id||u?.key,y);return!i.has(p)});return n.map((u,y)=>{let p=pr(u?.id||u?.key,y);if(!r.includes(u,y))return ws(u,y);let m=l.get(p);if(m)return ws(m,y);let g=c[d];return g?(d++,ws({...g,id:u.id||g.id},y)):ws(u,y)})}function JE(t=[],e=[],r,n={}){if(!Array.isArray(t)||!r)return{edits:[],stats:{total:0,passed:0,droppedByScope:0,droppedByLock:0}};let s=$r(e),o=[],a=0,i=0;for(let l of t){let d=Number.isFinite(l?.tableIndex)?l.tableIndex:-1;if(d<0||d>=s.length){a++;continue}let c=s[d];if(!r.includes(c,d)){a++;continue}if(l.op===Ws.INSERT_ROW){o.push(l);continue}let u=Number.isFinite(l?.rowIndex)?l.rowIndex:-1;if(u<0||u>=(Array.isArray(c?.rows)?c.rows.length:0)){a++;continue}if(l.op===Ws.DELETE_ROW){if(Iu(n,d,u)){i++;continue}o.push(l);continue}o.push(l)}return{edits:o,stats:{total:t.length,passed:o.length,droppedByScope:a,droppedByLock:i}}}function QE(t=[],e){let r=$r(t);return e?r.map((n,s)=>{let o=Array.isArray(n?.columns)?n.columns:[];return e.includes(n,s)?{...ws(n,s),scopeEditable:!0,scopeStatus:"editable"}:{...ws(n,s),scopeEditable:!1,scopeStatus:"readonly",rows:Array.isArray(n?.rows)?n.rows.map((a,i)=>gb(a,i,o)):[]}}):r}function XE(t,e,r){return{target:{sourceMessageId:oe(t?.sourceMessageId),sourceSwipeId:oe(t?.sourceSwipeId||t?.effectiveSwipeId),slotBindingKey:oe(t?.slotBindingKey),slotRevisionKey:oe(t?.slotRevisionKey),slotTransactionId:oe(t?.slotTransactionId)},loadMode:oe(e?.loadMode),mergeBaseOnly:e?.mergeBaseOnly===!0,resolvedFromMessageId:oe(e?.resolvedFromMessageId),resolvedFromRevisionKey:oe(e?.resolvedFromRevisionKey),sourceKind:oe(e?.sourceKind||e?.state?.meta?.sourceKind),scope:typeof r?.toJSON=="function"?r.toJSON():null,tables:QE(e?.state?.tables,r)}}function fb(){return ZE}function mb(t,e){if(!t||typeof t!="string")return{key:t,source:"fallback"};if(!Array.isArray(e)||e.length===0)return{key:t,source:"fallback"};for(let n of e)if(n?.key===t)return{key:t,source:"direct"};if(/^\d+$/.test(t)){let n=parseInt(t,10);if(n>=0&&n<e.length&&e[n]?.key)return{key:e[n].key,source:"index"}}let r=t.match(/^col(?:_(\d+))?$/i);if(r){let n=r[1]?parseInt(r[1],10)-1:0;if(n>=0&&n<e.length&&e[n]?.key)return{key:e[n].key,source:"col_n"}}return{key:t,source:"fallback"}}function eA(t,e,r,n=null){let s=$r(t||[]),o=r||{},a={direct:0,index:0,col_n:0,fallback:0},i={},l={};if(Array.isArray(e))for(let d of e){let c=Number.isFinite(d?.tableIndex)?d.tableIndex:-1;i[c]=(i[c]||0)+1,l[d?.op||"unknown"]=(l[d?.op||"unknown"]||0)+1}Ie().info("applyIncrementalEdits \u603B\u89C8",{totalEdits:e?.length||0,tableCount:s.length,editsByTable:i,editsByOp:l});for(let d of e){let c=d.tableIndex;if(c<0||c>=s.length)continue;let u=s[c];if(!u||!Array.isArray(u.rows)||n&&!n.includes(u,c))continue;if(d.op===Ws.INSERT_ROW){let p={id:Kr("row"),name:"",cells:{}};if(d.data&&typeof d.data=="object"){p.name=oe(d.data.name,"");let g=Array.isArray(u.columns)?u.columns:[];for(let[h,b]of Object.entries(d.data)){if(h==="name")continue;let{key:v,source:x}=mb(h,g);p.cells[v]=oe(b),a[x]=(a[x]||0)+1}}Object.keys(p.cells).length===0&&!p.name&&Ie().warn("applyIncrementalEdits: \u63D2\u5165\u7A7A\u884C\uFF08data \u89E3\u6790\u4E3A\u7A7A\uFF09",{tableIndex:c,tableName:u.name,editDataKeys:d.data?Object.keys(d.data):[],editDataPreview:JSON.stringify(d.data||{}).slice(0,200)}),u.rows.push(p);continue}let y=d.rowIndex;if(!(y<0||y>=u.rows.length)){if(d.op===Ws.DELETE_ROW){if(Iu(o,c,y))continue;u.rows.splice(y,1);continue}if(d.op===Ws.UPDATE_ROW){let p=u.rows[y];if(!p)continue;if(p.id=ra(p.id||p.rowId,y),p.cells=p.cells||{},d.data&&typeof d.data=="object"){let m=Array.isArray(u.columns)?u.columns:[];for(let[g,h]of Object.entries(d.data)){if(g==="name")continue;let{key:b,source:v}=mb(g,m);ab(o,c,y,b)||(p.cells[b]=oe(h),a[v]=(a[v]||0)+1)}d.data.name!==void 0&&(p.name=oe(d.data.name,p.name))}}}}return Object.values(a).some(d=>d>0)&&Ie().info("\u5217 key \u89E3\u6790\u7EDF\u8BA1",a),$r(s)}async function tA({executionContext:t,targetSnapshot:e,loadResult:r,config:n,assistantSnapshot:s,fillMode:o,runScope:a}={}){let i=or(n),l=o==="incremental"||!o&&i.fillMode!=="full",d=Sm(i,{skipResponseContract:l}),c=XE(e,r,a),u=Array.isArray(s?.tableState?.tables)?$r(s.tableState.tables):[],y=t?.chatHistory||t?.chatMessages||[],{contextDepth:p,contextRoles:m,contextExtractTags:g,contextUseGlobalRules:h,sendLatestRows:b}=i,v=i?.extraction?.regexPresetId||"",x=pb(y,p,m),T=pb(y,p,"all"),E=yb(x,{extractTags:g,useGlobalRules:h,regexPresetId:v}),w=yb(T,{extractTags:g,useGlobalRules:h,regexPresetId:v}),_=await mi({worldbooks:i.worldbooks}),A=qE(c.tables,b),I={...c,tables:A},P={...t,toolName:"\u586B\u8868\u5DE5\u4F5C\u53F0",toolId:"tableWorkbench",lastAiMessage:t?.assistantBaseText||t?.lastAiMessage||"",recentMessagesText:E,rawRecentMessagesText:w,toolWorldbookContent:_,tableGuidance:GE(i.tables),tableScopeGuidance:YE(a,c.tables),injectedContext:s?.injectedContext||Jt.getLatestMessageInjectedContext(e?.sourceMessageId),toolContentMacro:JSON.stringify(I,null,2),extractedContent:JSON.stringify(I,null,2),previousToolOutput:JSON.stringify(u,null,2)},C=await ds.buildToolMessages(d,P),N=await ds.buildPromptText(d,P);if(l&&(N+=fb(),Array.isArray(C)&&C.length>0)){let H=C[C.length-1];H&&typeof H.content=="string"&&(H.content+=fb())}if(!Array.isArray(C)||C.length===0)throw new Error("\u586B\u8868\u8BF7\u6C42\u6D88\u606F\u6784\u5EFA\u5931\u8D25\u3002");let W=i.apiPreset||"";try{let H=Array.isArray(c?.tables)?c.tables:[],ee=H.filter(te=>te?.scopeEditable!==!1).map(te=>oe(te?.updateConfig?.apiPreset,"")).filter(Boolean);ee.length>0&&ee.every(te=>te===ee[0])&&(W=ee[0],Ie().info("L3: \u8868\u7EA7 API \u9884\u8BBE\u751F\u6548",{preset:W,affectedTables:H.filter(te=>te?.scopeEditable!==!1).map(te=>te?.name||te?.id)}))}catch(H){Ie().warn("L3 \u8868\u7EA7 API \u9884\u8BBE\u89E3\u6790\u5931\u8D25\uFF0C\u7528\u5168\u5C40",H)}return{toolConfig:d,context:P,requestPayload:c,promptText:N,messages:C,fillMode:l?"incremental":"full",effectiveApiPreset:W,runScope:typeof a?.toJSON=="function"?a.toJSON():null}}async function rA(t,e={},r=null){let n=or(e),s=oe(e?._effectiveApiPreset||n.apiPreset,"");if(s){if(!Do(s))throw new Error(`API \u9884\u8BBE\u4E0D\u5B58\u5728: ${s}`);return Fn(s,t,{},r)}return Bo(t,{},r)}function Yr({status:t=Be.IDLE,targetSnapshot:e=null,skipReason:r="",startedAt:n=Date.now(),error:s=""}={}){return{lastAutoRunAt:n,lastAutoStatus:oe(t,Be.IDLE),lastAutoMessageId:oe(e?.sourceMessageId,""),lastAutoRevisionKey:oe(e?.slotRevisionKey,""),lastAutoSkipReason:oe(r,""),...s?{lastError:s,lastErrorDetails:[s]}:{}}}function Nr(t={},e=ft.MANUAL){let r=t&&typeof t=="object"?t:{};return Object.keys(r).length?vm(r):null}function xs({targetSnapshot:t=null,startedAt:e=Date.now(),status:r="idle",skipReason:n="",warning:s="",writeback:o=null,aborted:a=!1,stale:i=!1,abortReason:l="",error:d=""}={}){return{isAutoRun:!0,status:r,startedAt:e,targetSnapshot:t,sourceMessageId:oe(t?.sourceMessageId,""),sourceSwipeId:oe(t?.sourceSwipeId||t?.effectiveSwipeId,""),slotRevisionKey:oe(t?.slotRevisionKey,""),writebackStatus:o?.success===!0?"success":s?"warning":"",refreshConfirmed:o?.mirrorResult?.refreshConfirmed===!0,warning:oe(s,""),skipReason:oe(n,""),aborted:a===!0,stale:i===!0,abortReason:oe(l,""),error:oe(d,"")}}function Cl(t=null){if(t?.signal?.aborted)return{aborted:!0,stale:!1,reason:"cancelled_before_host_commit"};if(typeof t?.shouldAbortWriteback=="function")try{return t.shouldAbortWriteback()||!1}catch{return{aborted:!0,stale:!0,reason:"stale_base_changed"}}return!1}async function $a(t=null,e={}){return bb({configInput:t,runSource:ft.MANUAL,clearBeforeUpdate:e?.clearBeforeUpdate===!0,executionContextBuilder:()=>Gn({runSource:ft.MANUAL}),targetResolver:r=>Sa(r,{runSource:ft.MANUAL})})}async function hb({messageId:t,swipeId:e="",sourceEvent:r="AUTO_TABLE",configInput:n=null,signal:s=null,shouldAbortWriteback:o=null}={}){return bb({configInput:n,runSource:ft.AUTO,autoMeta:{sourceEvent:r,messageId:oe(t,""),swipeId:oe(e,""),signal:s,shouldAbortWriteback:o},executionContextBuilder:()=>Yn({messageId:t,swipeId:e,runSource:ft.AUTO}),targetResolver:a=>Sa(a,{runSource:ft.AUTO})})}async function bb({configInput:t=null,runSource:e=ft.MANUAL,executionContextBuilder:r,targetResolver:n,autoMeta:s=null,clearBeforeUpdate:o=!1}={}){let a=or(t||Ee()),i=vd(a),l=$i({tables:Array.isArray(a.tables)?a.tables:[]}),d=e===ft.AUTO,c=Date.now();if(Ie().info(`\u5F00\u59CB\u586B\u8868 [${e}]`,{isAutoRun:d,fillMode:a.fillMode}),!i.valid||!l.valid){let g=[...i.errors,...l.errors];return Ie().error("\u914D\u7F6E\u6821\u9A8C\u5931\u8D25",{errors:g}),Nr({lastStatus:Be.ERROR,lastRunAt:c,lastDurationMs:0,lastError:g[0]||"\u586B\u8868\u914D\u7F6E\u65E0\u6548\u3002",lastErrorDetails:g,lastValidationSummary:l.summary||{errorCount:g.length,warningCount:0},errorCount:Number(a?.runtime?.errorCount)||0,...d?Yr({status:Be.ERROR,startedAt:c,skipReason:"invalid_config",error:g[0]||"\u586B\u8868\u914D\u7F6E\u65E0\u6548\u3002"}):{}},e),{success:!1,error:g.join(`
`),errors:g,...d?{meta:xs({startedAt:c,status:Be.ERROR,skipReason:"invalid_config",error:g[0]||"\u586B\u8868\u914D\u7F6E\u65E0\u6548\u3002"})}:{}}}let u=a.runtime||{},y=Array.isArray(a.tables)?a.tables:[];try{let h=ro({})?.template?.tables;if(Array.isArray(h)&&h.length>0){let b=a.tableEnabledOverrides&&typeof a.tableEnabledOverrides=="object"?a.tableEnabledOverrides:{};if(y=h.map(x=>{let T=x?.id,E=T&&Object.prototype.hasOwnProperty.call(b,T)?b[T]:void 0,w=E!==void 0?E:x.enabled!==!1;return{...x,enabled:w}}),d){let x=Number.isFinite(targetSnapshot?.targetMessageIndex)?targetSnapshot.targetMessageIndex:-1,T=db({chatId:targetSnapshot?.chatId||"",isolationKey:ye.getKey?ye.getKey():"",currentMessageIndex:x,scopeTables:y});y=y.map(E=>{let w=E?.id||E?.uid||"";return w&&!T.shouldUpdate.has(w)?{...E,enabled:!1}:E})}let v=y.filter(x=>x.enabled===!1).map(x=>x?.name||x?.id);v.length>0&&Ie().info("scopeTables: \u7528\u6237\u7981\u7528\u4E86\u90E8\u5206\u8868",{disabledCount:v.length,disabledNames:v})}}catch{}let p=lm(a.scope||a,y);if(Ie().info("runScope \u5DF2\u89E3\u6790",{mode:p.mode,requestedMode:p.requestedMode,staleScope:p.staleScope,scopeTablesCount:Array.isArray(y)?y.length:0,allowedTableIds:p.allowedTableIds,allTableIds:p.allTableIds,scopeTablesEnabled:Array.isArray(y)?y.map(g=>({id:g?.id,name:g?.name,enabled:g?.enabled})):[]}),p.staleScope&&Ie().warn("runScope: \u68C0\u6D4B\u5230 stale scope\uFF08activeTableId/selectedTableIds \u4E0D\u5728\u5F53\u524D tables \u8303\u56F4\u5185\uFF09\uFF0C\u5DF2\u81EA\u52A8 fallback \u5230 enabled",{requestedMode:p.requestedMode,requestedActiveTableId:p.activeTableId,requestedSelectedTableIds:p.selectedTableIds}),(p.mode==="current"||p.mode==="selected")&&p.allowedTableIds.length===0){let g=p.mode==="current"?"\u672A\u6307\u5B9A\u5F53\u524D\u8868\u683C\uFF0C\u65E0\u6CD5\u6267\u884C\u3002":"\u672A\u9009\u62E9\u4EFB\u4F55\u8868\u683C\uFF0C\u65E0\u6CD5\u6267\u884C\u3002";return Ie().warn(g,{mode:p.mode}),Nr({lastStatus:Be.ERROR,lastRunAt:c,lastDurationMs:0,lastError:g,lastErrorDetails:[g]},e),{success:!1,error:g,errors:[g]}}let m=null;Nr({lastStatus:Be.RUNNING,lastError:"",lastErrorDetails:[],lastValidationSummary:l.summary||{errorCount:0,warningCount:0},lastScopeMode:oe(p.mode,""),...d?Yr({status:Be.RUNNING,startedAt:c,skipReason:""}):{}},e);try{if(typeof r!="function")throw new Error("table_update_missing_execution_context_builder");if(typeof n!="function")throw new Error("table_update_missing_target_resolver");let g=await r();Ie().info("\u6267\u884C\u4E0A\u4E0B\u6587\u5DF2\u6784\u5EFA");let h=n(g);if(!h)throw new Error("\u5F53\u524D\u6CA1\u6709\u53EF\u7528\u7684 assistant \u76EE\u6807\u697C\u5C42\u3002");m=h,Ie().info("\u76EE\u6807\u6D88\u606F\u5DF2\u89E3\u6790",{sourceMessageId:h.sourceMessageId,slotRevisionKey:h.slotRevisionKey}),d&&Nr(Yr({status:Be.RUNNING,targetSnapshot:h,startedAt:c,skipReason:""}),e);let b=oe(a.autoUpdateTrigger,"assistantMessage");if(d&&(!a.autoUpdateEnabled||b!=="assistantMessage")){let Q=a.autoUpdateEnabled?"auto_trigger_not_assistant_message":"auto_update_disabled";return Nr(Yr({status:Be.SKIPPED,targetSnapshot:h,startedAt:c,skipReason:Q}),e),{success:!1,skipped:!0,reason:Q,targetSnapshot:h,meta:xs({targetSnapshot:h,startedAt:c,status:Be.SKIPPED,skipReason:Q})}}if(d){let Q=Cl(s);if(Q)return Nr(Yr({status:Be.ABORTED,targetSnapshot:h,startedAt:c,skipReason:Q.reason,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88"}),e),{success:!1,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88",targetSnapshot:h,meta:xs({targetSnapshot:h,startedAt:c,status:Be.ABORTED,skipReason:Q.reason,aborted:Q.aborted===!0,stale:Q.stale===!0,abortReason:Q.reason,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88"})}}let v=await xh(h);if(!v?.success)throw new Error(v?.error||"\u76EE\u6807\u89E3\u6790\u8BB0\u5F55\u5931\u8D25");if(o&&Number.isFinite(h?.targetMessageIndex)&&h.targetMessageIndex>=0){Ie().info("clearBeforeUpdate \u542F\u7528\uFF0C\u6E05\u7A7A\u76EE\u6807\u697C\u5C42\u6570\u636E",{targetMessageIndex:h.targetMessageIndex});try{let Q=await wh(h.targetMessageIndex);Ie().info("clearBeforeUpdate \u5B8C\u6210",Q)}catch(Q){Ie().error("clearBeforeUpdate \u5931\u8D25",Q)}}let x=fs(h.sourceMessageId),T=Array.isArray(y)&&y.length>0?y:a.tables;Ie().info("templateTables \u6765\u6E90",{usingActiveTemplate:y!==(Array.isArray(a.tables)?a.tables:[]),tableCount:Array.isArray(T)?T.length:0,firstTableName:T?.[0]?.name||"",firstTableId:T?.[0]?.id||""});let E=bh(h,{templateTables:T}),w=$r(E?.state?.tables||[]),_=eb(),A=s?.signal||g?.signal||null;Ie().info("\u72B6\u6001\u5DF2\u52A0\u8F7D",{loadMode:E?.loadMode,sourceKind:E?.sourceKind,tableCount:w.length});let I=await _.buildRequest({buildRequest:tA},{executionContext:g,targetSnapshot:h,loadResult:E,config:a,assistantSnapshot:x,runScope:p});Ie().info("\u8BF7\u6C42\u5DF2\u6784\u5EFA",{messageCount:I?.messages?.length,fillMode:I?.fillMode});let P="",C=null,N=null;for(let Q=1;Q<=Al;Q++){if(A?.aborted)throw new Error("\u8BF7\u6C42\u5DF2\u53D6\u6D88");try{if(P=await _.sendRequest({sendRequest:rA},I,{config:{...a,_effectiveApiPreset:I?.effectiveApiPreset||""},abortSignal:A}),Ie().info("API \u54CD\u5E94\u5DF2\u6536\u5230",{attempt:Q,responseLength:P?.length||0}),C=_.parseResponse({parseResponse:jE},P),Ie().info("\u54CD\u5E94\u5DF2\u89E3\u6790",{attempt:Q,mode:C?.mode,hasEdits:!!C?.edits,hasTables:!!C?.tables,rawFormat:C?.rawFormat}),!(C?.mode==="incremental"&&Array.isArray(C.edits)&&C.edits.length>0||C?.mode==="full"&&C?.tables))throw new Error("AI \u54CD\u5E94\u4E2D\u672A\u627E\u5230\u6709\u6548\u7684 <tableEdit> \u6807\u7B7E\u6216\u8868\u683C JSON");N=null;break}catch(He){if(N=He,Ie().warn(`\u586B\u8868 attempt ${Q}/${Al} \u5931\u8D25`,{error:He?.message||String(He)}),Q<Al&&!await HE(WE,A))throw new Error("\u8BF7\u6C42\u5DF2\u53D6\u6D88\uFF08\u91CD\u8BD5\u7B49\u5F85\u671F\u95F4\uFF09")}}if(N)throw new Error(`\u586B\u8868\u5931\u8D25\uFF08${Al} \u6B21\u91CD\u8BD5\u540E\u4ECD\u5931\u8D25\uFF09: ${N?.message||String(N)}`);let W,H=null,ee=I.fillMode||"full",te=null;if(C.mode==="incremental"&&C.edits){let Q=ob(E?.state,w),He=JE(C.edits,w,p,Q);te=He.stats,W=eA(w,He.edits,Q,p),ee="incremental",(te.droppedByScope>0||te.droppedByLock>0)&&Ie().info("scope \u8FC7\u6EE4",te)}else if(C.mode==="full"&&C.tables){let Q=$r(C.tables);W=VE(w,Q,p),ee="full"}else W=$r(w);if(H=Xh(w,W),Ie().info("\u5DEE\u5F02\u5DF2\u8BA1\u7B97",{fillMode:ee}),d){let Q=Cl(s);if(Q)return Nr(Yr({status:Be.ABORTED,targetSnapshot:h,startedAt:c,skipReason:Q.reason,error:"\u5199\u56DE\u524D\u5DF2\u53D6\u6D88"}),e),{success:!1,error:"\u5199\u56DE\u524D\u5DF2\u53D6\u6D88",targetSnapshot:h,meta:xs({targetSnapshot:h,startedAt:c,status:Be.ABORTED,aborted:Q.aborted===!0,stale:Q.stale===!0,abortReason:Q.reason,error:"\u5199\u56DE\u524D\u5DF2\u53D6\u6D88"})}}let z=await $h({targetSnapshot:h,nextTables:W,config:a,loadResult:E,diff:H,fillMode:ee,skipNotify:d});if(d){let Q=Cl(s);if(Q)return Nr(Yr({status:Be.ABORTED,targetSnapshot:h,startedAt:c,skipReason:Q.reason,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88"}),e),{success:!1,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88",targetSnapshot:h,loadResult:E,request:I,responseText:P,parsed:C,fillMode:ee,diff:H,previousTables:w,nextTables:W,runScope:p,state:z?.state,bindings:z?.bindings,mirrorResult:z?.mirrorResult,warning:z?.warning||"",meta:xs({targetSnapshot:h,startedAt:c,status:Be.ABORTED,warning:z?.warning||"",writeback:z,aborted:Q.aborted===!0,stale:Q.stale===!0,abortReason:Q.reason,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88"})}}if(!z?.success)throw new Error(z?.error||"\u7ED3\u6784\u5316\u5199\u56DE\u5931\u8D25");if(d)try{let Q=Number.isFinite(h?.targetMessageIndex)?h.targetMessageIndex:-1,He=y.filter(Ce=>Ce?.enabled!==!1&&(Ce?.id||Ce?.uid)).map(Ce=>Ce.id||Ce.uid);He.length>0&&Q>=0&&cb(h?.chatId||"",ye.getKey?ye.getKey():"",He,Q)}catch(Q){Ie().warn("recordTablesUpdated \u5931\u8D25\uFF08\u4E0D\u5F71\u54CD\u4E3B\u6D41\u7A0B\uFF09",Q)}let J=Date.now()-c;Ie().info(`\u586B\u8868\u5B8C\u6210 [${ee}] ${J}ms`,{success:!0,writebackSuccess:z?.success,mirrorSuccess:z?.mirrorResult?.success});let de={lastStatus:Be.SUCCESS,lastRunAt:Date.now(),lastDurationMs:J,lastError:"",lastErrorDetails:[],lastValidationSummary:l.summary||{errorCount:0,warningCount:0},successCount:(Number(u.successCount)||0)+1,errorCount:Number(u.errorCount)||0,lastSourceMessageId:oe(h.sourceMessageId),lastSlotRevisionKey:oe(h.slotRevisionKey),lastLoadMode:oe(E.loadMode),lastMirrorApplied:z?.mirrorResult?.success===!0,lastResolvedFromMessageId:oe(E?.resolvedFromMessageId),lastResolvedFromRevisionKey:oe(E?.resolvedFromRevisionKey),lastSourceKind:oe(E?.sourceKind||E?.state?.meta?.sourceKind),lastScopeMode:oe(p.mode,""),lastFillMode:ee,...d?Yr({status:Be.SUCCESS,targetSnapshot:h,startedAt:c,skipReason:""}):{}};return Nr(de,e),{success:!0,targetSnapshot:h,loadResult:E,request:I,responseText:P,parsed:C,fillMode:ee,diff:H,previousTables:w,nextTables:W,runScope:p,scopeStats:te,state:z.state,bindings:z.bindings,mirrorResult:z.mirrorResult,warning:z.warning||"",...d?{meta:xs({targetSnapshot:h,startedAt:c,status:Be.SUCCESS,warning:z.warning||"",writeback:z})}:{}}}catch(g){let h=Date.now()-c;Ie().error(`\u586B\u8868\u5931\u8D25 ${h}ms: ${g?.message||g}`,{stack:g?.stack});let b=d?Cl(s):!1,v=g?.name==="AbortError"||g?.message==="\u8BF7\u6C42\u5DF2\u53D6\u6D88"||b?.aborted===!0||b?.stale===!0,x=v?Be.ABORTED:Be.ERROR,T={lastStatus:x,lastRunAt:Date.now(),lastDurationMs:h,lastError:g?.message||String(g),lastErrorDetails:[g?.message||String(g)],lastValidationSummary:l.summary||{errorCount:0,warningCount:0},successCount:Number(u.successCount)||0,errorCount:v?Number(u.errorCount)||0:(Number(u.errorCount)||0)+1,lastScopeMode:oe(p.mode,""),...d?Yr({status:x,targetSnapshot:m,startedAt:c,skipReason:v?b?.reason||"cancelled_before_host_commit":"",error:g?.message||String(g)}):{}};return Nr(T,e),{success:!1,error:g?.message||String(g),errors:[g?.message||String(g)],...d?{meta:xs({targetSnapshot:m,startedAt:c,status:x,skipReason:v?b?.reason||"cancelled_before_host_commit":"",aborted:v,stale:b?.stale===!0,abortReason:v?b?.reason||"cancelled_before_host_commit":"",error:g?.message||String(g)})}:{}}}}var Al,WE,ZE,kl=O(()=>{Vn();cs();Cs();rl();Z();We();_a();ms();sr();Lh();wl();Qh();Zh();Mi();tb();El();Gs();Go();Xn();dn();ub();Ur();Al=3,WE=5e3;ZE=`

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

\u53EA\u8FD4\u56DE <tableEdit> \u6807\u7B7E\uFF0C\u4E0D\u8981\u9644\u52A0\u5176\u4ED6\u5185\u5BB9\u3002`});var vb={};he(vb,{WindowManager:()=>Il,closeWindow:()=>wb,createWindow:()=>Mu,windowManager:()=>Et});function oA(){if(Et.stylesInjected)return;Et.stylesInjected=!0;let t=`
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
  `,e=er(),r=e.createElement("style");r.id=sA+"_styles",r.textContent=t,(e.head||e.documentElement).appendChild(r)}function Mu(t){let{id:e,title:r="\u7A97\u53E3",content:n="",width:s=900,height:o=700,modal:a=!1,resizable:i=!0,maximizable:l=!0,startMaximized:d=!1,rememberState:c=!0,onClose:u,onReady:y}=t;oA();let p=er(),m=p.defaultView||window.parent||window,g=window.jQuery||window.parent?.jQuery;if(!g)return nA.error("jQuery not available"),null;if(Et.isOpen(e))return Et.bringToFront(e),Et.getWindow(e);let h=m.innerWidth||1200,b=m.innerHeight||800,v=h<=1100,x=null,T=!1;c&&(x=Et.getState(e),x&&!v&&(T=!0));let E,w;T&&x.width&&x.height?(E=Math.max(400,Math.min(x.width,h-40)),w=Math.max(300,Math.min(x.height,b-40))):(E=Math.max(400,Math.min(s,h-40)),w=Math.max(300,Math.min(o,b-40)));let _=Math.max(20,Math.min((h-E)/2,h-E-20)),A=Math.max(20,Math.min((b-w)/2,b-w-20)),I=l&&!v,P=`
    <div class="yyt-window" id="${e}" style="left:${_}px; top:${A}px; width:${E}px; height:${w}px;">
      <div class="yyt-window-header">
        <div class="yyt-window-title">
          <i class="fa-solid fa-window-maximize"></i>
          <span>${aA(r)}</span>
        </div>
        <div class="yyt-window-controls">
          ${I?'<button class="yyt-window-btn maximize" title="\u6700\u5927\u5316/\u8FD8\u539F"><i class="fa-solid fa-expand"></i></button>':""}
          <button class="yyt-window-btn close" title="\u5173\u95ED"><i class="fa-solid fa-times"></i></button>
        </div>
      </div>
      <div class="yyt-window-body">${n}</div>
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
  `,C=null;a&&(C=g(`<div class="yyt-window-overlay" data-for="${e}"></div>`),g(p.body).append(C));let N=g(P);g(p.body).append(N),Et.register(e,N),N.on("mousedown",()=>Et.bringToFront(e));let W=!1,H={left:_,top:A,width:E,height:w},ee=()=>{H={left:parseInt(N.css("left")),top:parseInt(N.css("top")),width:N.width(),height:N.height()},N.addClass("maximized"),N.find(".yyt-window-btn.maximize i").removeClass("fa-expand").addClass("fa-compress"),W=!0},te=()=>{N.removeClass("maximized"),N.css({left:H.left+"px",top:H.top+"px",width:H.width+"px",height:H.height+"px"}),N.find(".yyt-window-btn.maximize i").removeClass("fa-compress").addClass("fa-expand"),W=!1};N.find(".yyt-window-btn.maximize").on("click",()=>{W?te():ee()}),(v&&l||T&&x.isMaximized&&l||d&&l)&&ee(),N.find(".yyt-window-btn.close").on("click",()=>{if(c&&l){let Ce={width:W?H.width:N.width(),height:W?H.height:N.height(),isMaximized:W};Et.saveState(e,Ce)}u&&u(),C&&C.remove(),N.remove(),Et.unregister(e),g(p).off(".yytWindowDrag"+e),g(p).off(".yytWindowResize"+e)}),C&&C.on("click",Ce=>{Ce.target,C[0]});let z=!1,J,de,Q,He;if(N.find(".yyt-window-header").on("mousedown",Ce=>{g(Ce.target).closest(".yyt-window-controls").length||W||(z=!0,J=Ce.clientX,de=Ce.clientY,Q=parseInt(N.css("left")),He=parseInt(N.css("top")),g(p.body).css("user-select","none"))}),g(p).on("mousemove.yytWindowDrag"+e,Ce=>{if(!z)return;let ze=Ce.clientX-J,L=Ce.clientY-de;N.css({left:Math.max(0,Q+ze)+"px",top:Math.max(0,He+L)+"px"})}),g(p).on("mouseup.yytWindowDrag"+e,()=>{z&&(z=!1,g(p.body).css("user-select",""))}),i){let Ce=!1,ze="",L,ne,X,ce,rt,Nt;N.find(".yyt-window-resize-handle").on("mousedown",function(lr){W||(Ce=!0,ze="",g(this).hasClass("se")?ze="se":g(this).hasClass("e")?ze="e":g(this).hasClass("s")?ze="s":g(this).hasClass("w")?ze="w":g(this).hasClass("n")?ze="n":g(this).hasClass("nw")?ze="nw":g(this).hasClass("ne")?ze="ne":g(this).hasClass("sw")&&(ze="sw"),L=lr.clientX,ne=lr.clientY,X=N.width(),ce=N.height(),rt=parseInt(N.css("left")),Nt=parseInt(N.css("top")),g(p.body).css("user-select","none"),lr.stopPropagation())}),g(p).on("mousemove.yytWindowResize"+e,lr=>{if(!Ce)return;let $n=lr.clientX-L,Ln=lr.clientY-ne,_s=400,Ja=300,Mo=X,Jr=ce,On=rt,Qa=Nt;if(ze.includes("e")&&(Mo=Math.max(_s,X+$n)),ze.includes("s")&&(Jr=Math.max(Ja,ce+Ln)),ze.includes("w")){let Dn=X-$n;Dn>=_s&&(Mo=Dn,On=rt+$n)}if(ze.includes("n")){let Dn=ce-Ln;Dn>=Ja&&(Jr=Dn,Qa=Nt+Ln)}N.css({width:Mo+"px",height:Jr+"px",left:On+"px",top:Qa+"px"})}),g(p).on("mouseup.yytWindowResize"+e,()=>{Ce&&(Ce=!1,g(p.body).css("user-select",""))})}return N.on("remove",()=>{g(p).off(".yytWindowDrag"+e),g(p).off(".yytWindowResize"+e)}),y&&setTimeout(()=>y(N),50),N}function wb(t){let e=Et.getWindow(t);if(e){let r=window.jQuery||window.parent?.jQuery;if(r){let n=er();r(`.yyt-window-overlay[data-for="${t}"]`).remove(),r(n).off(".yytWindowDrag"+t),r(n).off(".yytWindowResize"+t)}e.remove(),Et.unregister(t)}}function aA(t){return typeof t!="string"?"":t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}var nA,sA,xb,Il,Et,Pu=O(()=>{Je();Z();pt();nA=$.createScope("WindowManager"),sA="youyou_toolkit_window_manager",xb="window_states",Il=class{constructor(){this.windows=new Map,this.baseZIndex=1e4,this.topZIndex=1e4,this.stylesInjected=!1}register(e,r){this.topZIndex++,this.windows.set(e,{$el:r,zIndex:this.topZIndex}),r.css("z-index",this.topZIndex)}unregister(e){this.windows.delete(e)}bringToFront(e){let r=this.windows.get(e);r&&(this.topZIndex++,r.zIndex=this.topZIndex,r.$el.css("z-index",this.topZIndex))}getWindow(e){return this.windows.get(e)?.$el||null}isOpen(e){return this.windows.has(e)}closeAll(){this.windows.forEach((e,r)=>{e.$el&&e.$el.remove()}),this.windows.clear()}saveState(e,r){let n=this.loadStates();n[e]={...r,updatedAt:Date.now()},ti.set(xb,n)}loadStates(){return ti.get(xb)||{}}getState(e){return this.loadStates()[e]||null}},Et=new Il});function Lu(){return{addedTables:[],deletedTables:[],renamedTables:[],movedTables:[],patchedAiInstructions:[],patchedColumns:[],patchedRows:[],patchedExportConfig:[],patchedLocks:[],patchedWorkbenchConfig:[]}}function Ou(t,e=""){return{protocolVersion:vs,mode:go,baseFingerprint:t||"",summary:"",warnings:[],operations:[],currentTableId:String(e||"")}}function Du(){let t=0,e=!1;return{createRunGuard(){let r=t;return{isCancelled:()=>e,isStale:()=>!e&&r!==t}},invalidate(){t+=1},cancel(){e=!0,t+=1},reset(){e=!1,t+=1}}}function zt(t){return t===void 0?t:JSON.parse(JSON.stringify(t))}function iA(t){try{return JSON.stringify(t)}catch{return""}}async function Oa(t){if(!t||!Array.isArray(t.tables))return"empty";let e=t.tables.map(i=>({id:i.id||"",name:i.name||"",note:i.note||"",enabled:i.enabled,columns:Array.isArray(i.columns)?i.columns.map(l=>({key:l.key||"",title:l.title||"",type:l.type||""})):[],aiInstructions:i.aiInstructions||{},exportConfig:i.exportConfig||{}})),r=iA(e),s=new TextEncoder().encode(r),o=await crypto.subtle.digest("SHA-256",s);return`yyt-fp:${Array.from(new Uint8Array(o)).slice(0,8).map(i=>i.toString(16).padStart(2,"0")).join("")}`}function Ml(t,e){let r=Number(t);if(!Number.isFinite(r))return e;let n=Math.floor(r);return n>0?n:e}function Eb(t,e){let r=Number(t);if(!Number.isFinite(r))return e;let n=Math.floor(r);return n>=0?n:e}function Cn(t){return String(t??"").trim()}var tt,vs,go,La,Nu,Rl,$u,Sb,Tb,_b,ho,bP,Pl=O(()=>{tt=Object.freeze({ADD_TABLE:"add_table",RENAME_TABLE:"rename_table",DELETE_TABLE:"delete_table",MOVE_TABLE:"move_table",PATCH_AI_INSTRUCTIONS:"patch_table_ai_instructions",PATCH_COLUMNS:"patch_table_columns",PATCH_ROWS:"patch_table_rows",PATCH_EXPORT_CONFIG:"patch_table_export_config",PATCH_LOCKS:"patch_table_locks",PATCH_WORKBENCH_CONFIG:"patch_workbench_config"}),vs=1,go="modify_current_workbench_incremental",La="assistantDraft",Nu=Object.freeze(["note","init","create","update","delete"]),Rl=new Set(Nu),$u=Object.freeze(["contextDepth","contextRoles","sendLatestRows","runScope","mirrorToMessage","mirrorTag","fillMode","autoUpdateEnabled","autoUpdateTrigger"]),Sb=new Set($u),Tb=3,_b=1,ho=Object.freeze({MAX_ROUNDS:"max_rounds",EMPTY_OPERATIONS:"empty_operations",REPEATED_FINGERPRINT:"repeated_working_fingerprint",REPAIR_RETRY_CAPPED:"repair_retry_capped"}),bP=Object.freeze({CANCELLED:"cancelled",STALE:"stale"})});function Bu(t){return!!t&&typeof t=="object"&&!Array.isArray(t)}function At(t,e){if(!Bu(t))throw new Error(`${e} \u5FC5\u987B\u662F\u5BF9\u8C61`)}function Kt(t,e){let r=String(t??"").trim();if(!r)throw new Error(`${e} \u5FC5\u987B\u662F\u975E\u7A7A\u5B57\u7B26\u4E32`);return r}function bo(t,e){let r=t.tables.find(n=>n.id===e);if(!r)throw new Error(`\u627E\u4E0D\u5230\u76EE\u6807\u8868: ${e}`);return r}function Ab(t){return new Set((t.columns||[]).map(e=>e.key).filter(Boolean))}function Cb(){return{init:"",create:"",update:"",delete:""}}function lA(t){let e=La,r=new RegExp(`<${e}>([\\s\\S]*?)<\\/${e}>`,"g"),n=Array.from(String(t||"").matchAll(r));if(!n.length)throw new Error(`AI \u54CD\u5E94\u4E2D\u672A\u627E\u5230 <${e}> \u6807\u7B7E`);return String(n[n.length-1][1]||"").trim()}function kb(t){let e=lA(t),r;try{r=JSON.parse(e)}catch(n){throw new Error(`assistant draft JSON \u89E3\u6790\u5931\u8D25: ${n?.message||"\u672A\u77E5\u9519\u8BEF"}`)}return cA(r)}function cA(t){if(At(t,"assistant draft"),t.protocolVersion!==vs)throw new Error(`assistant draft.protocolVersion \u5FC5\u987B\u4E3A ${vs}`);if(t.mode!==go)throw new Error(`assistant draft.mode \u975E\u6CD5: ${t.mode}`);if(typeof t.baseFingerprint!="string"||!t.baseFingerprint.trim())throw new Error("assistant draft.baseFingerprint \u7F3A\u5931");if(typeof t.summary!="string")throw new Error("assistant draft.summary \u5FC5\u987B\u662F\u5B57\u7B26\u4E32");if(!Array.isArray(t.warnings))throw new Error("assistant draft.warnings \u5FC5\u987B\u662F\u6570\u7EC4");if(!Array.isArray(t.operations))throw new Error("assistant draft.operations \u5FC5\u987B\u662F\u6570\u7EC4");let e=new Set(Object.values(tt));return t.operations.forEach((r,n)=>{At(r,`operations[${n}]`);let s=String(r.op||"");if(!e.has(s))throw new Error(`operations[${n}] \u5305\u542B\u4E0D\u652F\u6301\u7684\u64CD\u4F5C: ${s}`);if((s.startsWith("patch_table_")||s===tt.MOVE_TABLE)&&Kt(r.tableId,`${s}.tableId`),s===tt.RENAME_TABLE&&Kt(r.newName,`${s}.newName`),s===tt.ADD_TABLE&&(Kt(r.name,`${s}.name`),!Array.isArray(r.columns)||r.columns.length===0))throw new Error(`${s} \u81F3\u5C11\u9700\u8981\u4E00\u4E2A column`);s.startsWith("patch_table_")&&s!==tt.PATCH_LOCKS&&At(r.patch,`${s}.patch`)}),{protocolVersion:vs,mode:go,baseFingerprint:String(t.baseFingerprint||""),summary:String(t.summary||""),warnings:(t.warnings||[]).map(r=>String(r??"")),operations:zt(t.operations),currentTableId:String(t.currentTableId||"")}}function dA(t,e,r){let n=Kt(e.name,"add_table.name");if(!Array.isArray(e.columns)||e.columns.length===0)throw new Error("add_table \u81F3\u5C11\u9700\u8981\u4E00\u4E2A column");let s=new Set,o=e.columns.map((d,c)=>{let u=Kt(d.title||d.name,`add_table.columns[${c}].title`);return{key:mn(aa(u,`col_${c+1}`),s),title:u,description:String(d.description??""),type:String(d.type||"text"),required:!!d.required}}),a=e.aiInstructions&&typeof e.aiInstructions=="object"?{note:String(e.aiInstructions.note??e.note??""),init:String(e.aiInstructions.init??""),create:String(e.aiInstructions.create??""),update:String(e.aiInstructions.update??""),delete:String(e.aiInstructions.delete??"")}:{note:String(e.note??""),...Cb()},i={id:cd("table"),name:n,note:a.note,enabled:!0,aiInstructions:{init:a.init,create:a.create,update:a.update,delete:a.delete},columns:o,rows:[],exportConfig:{enabled:!1,entryName:n,entryType:"constant",splitByRow:!1,keywords:"",injectionTemplate:"",preventRecursion:!0,entryPlacement:{position:"before_character_definition",depth:2,order:0}}},l=String(e.insertAfterTableId||"").trim();if(l){let d=t.tables.findIndex(c=>c.id===l);if(d===-1)throw new Error(`add_table \u7684 insertAfterTableId \u4E0D\u5B58\u5728: ${l}`);t.tables.splice(d+1,0,i)}else t.tables.push(i);return r.addedTables.push({tableId:i.id,name:n}),i.id}function uA(t,e,r){let n=bo(t,e.tableId),s=n.name,o=Kt(e.newName,"rename_table.newName");n.name=o,r.renamedTables.push({tableId:e.tableId,beforeName:s,afterName:o})}function pA(t,e,r,n){let s=t.tables.findIndex(a=>a.id===e.tableId);if(s===-1)throw new Error(`\u627E\u4E0D\u5230\u76EE\u6807\u8868: ${e.tableId}`);let o=t.tables[s];r.deletedTables.push({tableId:e.tableId,name:o.name}),n.push({type:"delete_table",label:`\u5220\u9664\u8868: ${o.name}`}),t.tables.splice(s,1)}function yA(t,e,r){let n=t.tables.findIndex(u=>u.id===e.tableId);if(n===-1)throw new Error(`\u627E\u4E0D\u5230\u76EE\u6807\u8868: ${e.tableId}`);if(+!!e.beforeTableId+ +!!e.afterTableId!==1)throw new Error("move_table \u5FC5\u987B\u4E14\u53EA\u80FD\u63D0\u4F9B beforeTableId \u6216 afterTableId \u4E4B\u4E00");let o=e.beforeTableId||e.afterTableId;if(t.tables.findIndex(u=>u.id===o)===-1)throw new Error(`move_table \u951A\u70B9\u4E0D\u5B58\u5728: ${o}`);if(o===e.tableId)throw new Error("move_table \u4E0D\u80FD\u4EE5\u81EA\u8EAB\u4E3A\u951A\u70B9");let[i]=t.tables.splice(n,1),l=t.tables.findIndex(u=>u.id===o),d=e.beforeTableId?l:l+1;t.tables.splice(d,0,i);let c=t.tables.indexOf(i);r.movedTables.push({tableId:e.tableId,name:i.name,fromIndex:n,toIndex:c})}function fA(t,e,r){let n=bo(t,e.tableId);At(e.patch,`${e.op}.patch`);let s=[];Object.keys(e.patch).forEach(o=>{if(!Rl.has(o))throw new Error(`patch_table_ai_instructions.patch \u5305\u542B\u672A\u77E5\u5B57\u6BB5: ${o}`)}),(!n.aiInstructions||typeof n.aiInstructions!="object")&&(n.aiInstructions=Cb()),"note"in e.patch&&(n.note=String(e.patch.note??""),s.push("note")),["init","create","update","delete"].forEach(o=>{o in e.patch&&(n.aiInstructions[o]=String(e.patch[o]??""),s.push(o))}),s.length&&r.patchedAiInstructions.push({tableId:e.tableId,name:n.name,keys:s})}function mA(t,e,r,n){let s=bo(t,e.tableId);At(e.patch,`${e.op}.patch`);let o=new Set(["renameColumns","addColumns","deleteColumns"]);Object.keys(e.patch).forEach(p=>{if(!o.has(p))throw new Error(`patch_table_columns.patch \u5305\u542B\u672A\u77E5\u5B57\u6BB5: ${p}`)});let a=[],i=[];(Array.isArray(e.patch.renameColumns)?e.patch.renameColumns:[]).forEach((p,m)=>{At(p,`renameColumns[${m}]`);let g=Kt(p.columnKey,`renameColumns[${m}].columnKey`),h=s.columns.find(v=>v.key===g);if(!h)throw new Error(`renameColumns[${m}] \u6307\u5411\u4E0D\u5B58\u5728\u7684\u5217: ${g}`);let b=Kt(p.newTitle,`renameColumns[${m}].newTitle`);a.push(`\u5217\u6539\u540D: ${h.title} -> ${b}`),h.title=b}),(Array.isArray(e.patch.deleteColumns)?e.patch.deleteColumns:[]).map((p,m)=>{let g=Kt(p,`deleteColumns[${m}]`);if(!s.columns.some(h=>h.key===g))throw new Error(`deleteColumns[${m}] \u6307\u5411\u4E0D\u5B58\u5728\u7684\u5217: ${g}`);return g}).forEach(p=>{s.columns=s.columns.filter(m=>m.key!==p),(s.rows||[]).forEach(m=>{m.cells&&p in m.cells&&delete m.cells[p]}),a.push(`\u5220\u9664\u5217: ${p}`),i.push(`\u5220\u9664\u5217: ${s.name}.${p}`)});let u=Array.isArray(e.patch.addColumns)?e.patch.addColumns:[],y=Ab(s);u.forEach((p,m)=>{At(p,`addColumns[${m}]`);let g=Kt(p.title||p.name,`addColumns[${m}].title`),h=mn(aa(g,`col_${s.columns.length+1}`),y);s.columns.push({key:h,title:g,description:String(p.description??""),type:String(p.type||"text"),required:!!p.required}),(s.rows||[]).forEach(b=>{b.cells&&(b.cells[h]="")}),a.push(`\u65B0\u589E\u5217: ${g} (${h})`)}),a.length&&r.patchedColumns.push({tableId:e.tableId,name:s.name,changes:a}),i.forEach(p=>{n.push({type:"patch_table_columns",label:p})})}function gA(t,e,r){let n=bo(t,e.tableId);At(e.patch,`${e.op}.patch`);let s=new Set(["updateCells","addRows","deleteRowIds"]);Object.keys(e.patch).forEach(u=>{if(!s.has(u))throw new Error(`patch_table_rows.patch \u5305\u542B\u672A\u77E5\u5B57\u6BB5: ${u}`)});let o=[],a=(n.columns||[]).map(u=>u.key);Array.isArray(n.rows)||(n.rows=[]),(Array.isArray(e.patch.updateCells)?e.patch.updateCells:[]).forEach((u,y)=>{At(u,`updateCells[${y}]`);let p=Kt(u.rowId,`updateCells[${y}].rowId`),m=Kt(u.columnKey,`updateCells[${y}].columnKey`),g=n.rows.find(h=>h.id===p);if(!g)throw new Error(`updateCells[${y}] \u6307\u5411\u4E0D\u5B58\u5728\u7684\u884C: ${p}`);if(!a.includes(m))throw new Error(`updateCells[${y}] \u6307\u5411\u4E0D\u5B58\u5728\u7684\u5217: ${m}`);g.cells||(g.cells={}),g.cells[m]=zt(u.value??""),o.push(`\u6539\u5355\u5143\u683C: ${p}.${m}`)}),(Array.isArray(e.patch.addRows)?e.patch.addRows:[]).forEach((u,y)=>{if(At(u,`addRows[${y}]`),!u.cells||typeof u.cells!="object")throw new Error(`addRows[${y}].cells \u5FC5\u987B\u662F\u5BF9\u8C61`);Object.keys(u.cells).forEach(m=>{if(!a.includes(m))throw new Error(`addRows[${y}] \u5305\u542B\u672A\u77E5\u5217: ${m}`)});let p={id:Kr("row"),name:`\u884C${n.rows.length+1}`,cells:{}};a.forEach(m=>{p.cells[m]=m in u.cells?zt(u.cells[m]):""}),n.rows.push(p),o.push(`\u65B0\u589E\u884C: ${p.id}`)});let d=Array.isArray(e.patch.deleteRowIds)?e.patch.deleteRowIds:[],c=new Set(d.map(u=>String(u)));if(c.size){let u=n.rows.length;n.rows=n.rows.filter(p=>!c.has(p.id));let y=u-n.rows.length;y>0&&o.push(`\u5220\u9664 ${y} \u884C`)}o.length&&r.patchedRows.push({tableId:e.tableId,name:n.name,changes:o})}function hA(t,e,r){let n=bo(t,e.tableId);At(e.patch,`${e.op}.patch`),(!n.exportConfig||typeof n.exportConfig!="object")&&(n.exportConfig={enabled:!1,entryName:n.name,entryType:"constant"});let s=new Set(["enabled","entryName","entryType","splitByRow","keywords","injectionTemplate","preventRecursion"]);Object.keys(e.patch).forEach(a=>{if(!s.has(a))throw new Error(`patch_table_export_config.patch \u5305\u542B\u672A\u77E5\u5B57\u6BB5: ${a}`)}),Object.entries(e.patch).forEach(([a,i])=>{if(a==="entryType"&&!["constant","keyword"].includes(i))throw new Error(`patch_table_export_config.entryType \u5FC5\u987B\u4E3A constant \u6216 keyword\uFF0C\u6536\u5230: ${i}`);n.exportConfig[a]=zt(i)});let o=Object.keys(e.patch);r.patchedExportConfig.push({tableId:e.tableId,name:n.name,keys:o})}function bA(t,e,r){At(e.patch,`${e.op}.patch`);let n=new Set(["rows","columns","cells"]);Object.keys(e.patch).forEach(d=>{if(!n.has(d))throw new Error(`patch_table_locks.patch \u5305\u542B\u672A\u77E5\u5B57\u6BB5: ${d}`)});let s=bo(t,e.tableId),o=[],a={tableId:e.tableId,name:s.name,rows:[],columns:[],cells:[]},i=Array.isArray(s.rows)?s.rows.length:0,l=Ab(s);return(Array.isArray(e.patch.rows)?e.patch.rows:[]).forEach((d,c)=>{if(At(d,`rows[${c}]`),typeof d.rowIndex!="number"||d.rowIndex<0||d.rowIndex>=i)throw new Error(`rows[${c}].rowIndex \u8D8A\u754C`);if(typeof d.locked!="boolean")throw new Error(`rows[${c}].locked \u5FC5\u987B\u662F\u5E03\u5C14\u503C`);a.rows.push({rowIndex:d.rowIndex,locked:d.locked}),o.push(`${d.locked?"\u9501\u5B9A":"\u89E3\u9501"}\u7B2C${d.rowIndex}\u884C`)}),(Array.isArray(e.patch.columns)?e.patch.columns:[]).forEach((d,c)=>{At(d,`columns[${c}]`);let u=Kt(d.columnKey,`columns[${c}].columnKey`);if(!l.has(u))throw new Error(`columns[${c}] \u6307\u5411\u4E0D\u5B58\u5728\u7684\u5217: ${u}`);if(typeof d.locked!="boolean")throw new Error(`columns[${c}].locked \u5FC5\u987B\u662F\u5E03\u5C14\u503C`);a.columns.push({columnKey:u,locked:d.locked}),o.push(`${d.locked?"\u9501\u5B9A":"\u89E3\u9501"}\u5217: ${u}`)}),(Array.isArray(e.patch.cells)?e.patch.cells:[]).forEach((d,c)=>{if(At(d,`cells[${c}]`),typeof d.rowIndex!="number"||d.rowIndex<0||d.rowIndex>=i)throw new Error(`cells[${c}].rowIndex \u8D8A\u754C`);let u=Kt(d.columnKey,`cells[${c}].columnKey`);if(!l.has(u))throw new Error(`cells[${c}] \u6307\u5411\u4E0D\u5B58\u5728\u7684\u5217: ${u}`);if(typeof d.locked!="boolean")throw new Error(`cells[${c}].locked \u5FC5\u987B\u662F\u5E03\u5C14\u503C`);a.cells.push({rowIndex:d.rowIndex,columnKey:u,locked:d.locked}),o.push(`${d.locked?"\u9501\u5B9A":"\u89E3\u9501"}\u5355\u5143\u683C: \u884C${d.rowIndex}.${u}`)}),o.length&&r.patchedLocks.push({tableId:e.tableId,name:s.name,changes:o}),a}function xA(t,e,r,n){At(e.patch,`${e.op}.patch`);let s=[];Object.keys(e.patch).forEach(o=>{if(!Sb.has(o))throw new Error(`patch_workbench_config.patch \u5305\u542B\u672A\u77E5\u5B57\u6BB5: ${o}`);t[o]=zt(e.patch[o]),s.push(o)}),s.length&&(r.patchedWorkbenchConfig.push({keys:s}),n.push({type:"patch_workbench_config",label:`\u4FEE\u6539\u5DE5\u4F5C\u53F0\u914D\u7F6E: ${s.join(", ")}`}))}function zu({config:t,draft:e}){if(!Bu(t))throw new Error("\u7F3A\u5C11 config");if(!Bu(e)||!Array.isArray(e.operations))throw new Error("\u7F3A\u5C11\u5408\u6CD5 draft.operations");let r=zt(t),n=Lu(),s=[],o=[],a=t.scope?.activeTableId||"";return e.operations.forEach(i=>{let l=String(i.op||"");switch(l){case tt.ADD_TABLE:{a=dA(r,i,n);break}case tt.RENAME_TABLE:uA(r,i,n);break;case tt.DELETE_TABLE:pA(r,i,n,s);break;case tt.MOVE_TABLE:yA(r,i,n);break;case tt.PATCH_AI_INSTRUCTIONS:fA(r,i,n);break;case tt.PATCH_COLUMNS:mA(r,i,n,s);break;case tt.PATCH_ROWS:gA(r,i,n);break;case tt.PATCH_EXPORT_CONFIG:hA(r,i,n);break;case tt.PATCH_LOCKS:{let d=bA(r,i,n);(d.rows.length||d.columns.length||d.cells.length)&&o.push(d);break}case tt.PATCH_WORKBENCH_CONFIG:xA(r,i,n,s);break;default:throw new Error(`\u4E0D\u652F\u6301\u7684\u64CD\u4F5C: ${l}`)}}),a&&!r.tables.some(i=>i.id===a)&&(a=r.tables[0]?.id||""),{candidateConfig:r,diff:n,highRiskItems:s,lockChanges:o,focusTableId:a}}function Ib({baselineConfig:t,candidateConfig:e}){let r=Lu(),n=[],s=Array.isArray(t?.tables)?t.tables:[],o=Array.isArray(e?.tables)?e.tables:[],a=new Set(s.map(c=>c.id)),i=new Set(o.map(c=>c.id));o.forEach(c=>{a.has(c.id)||r.addedTables.push({tableId:c.id,name:c.name})}),s.forEach(c=>{i.has(c.id)||(r.deletedTables.push({tableId:c.id,name:c.name}),n.push({type:"delete_table",label:`\u5220\u9664\u8868: ${c.name}`}))}),s.forEach(c=>{let u=o.find(v=>v.id===c.id);if(!u)return;c.name!==u.name&&r.renamedTables.push({tableId:c.id,beforeName:c.name,afterName:u.name});let y=(c.columns||[]).map(v=>v.key).sort().join(","),p=(u.columns||[]).map(v=>v.key).sort().join(",");y!==p&&(r.patchedColumns.push({tableId:c.id,name:u.name,changes:["\u5217\u7ED3\u6784\u53D8\u66F4"]}),n.push({type:"patch_table_columns",label:`\u5217\u7ED3\u6784\u53D8\u66F4: ${u.name}`}));let g=Nu.filter(v=>JSON.stringify(c.aiInstructions?.[v])!==JSON.stringify(u.aiInstructions?.[v]));g.length&&r.patchedAiInstructions.push({tableId:c.id,name:u.name,keys:g});let b=["enabled","entryName","entryType","splitByRow","keywords","injectionTemplate","preventRecursion"].filter(v=>JSON.stringify(c.exportConfig?.[v])!==JSON.stringify(u.exportConfig?.[v]));b.length&&r.patchedExportConfig.push({tableId:c.id,name:u.name,keys:b})});let d=$u.filter(c=>JSON.stringify(t?.[c])!==JSON.stringify(e?.[c]));return d.length&&(r.patchedWorkbenchConfig.push({keys:d}),n.push({type:"patch_workbench_config",label:`\u5DE5\u4F5C\u53F0\u914D\u7F6E\u53D8\u66F4: ${d.join(", ")}`})),{diff:r,highRiskItems:n}}var Ku=O(()=>{Pl();We();gd()});function wA(){return["\u4F60\u662F youyou_Toolkit \u586B\u8868\u5DE5\u4F5C\u53F0\u7684\u6539\u8868\u52A9\u624B\u3002",`\u4F60\u53EA\u80FD\u8F93\u51FA\u4E00\u4E2A\u88AB <${La}> \u548C </${La}> \u5305\u88F9\u7684 JSON \u5BF9\u8C61\uFF0C\u4E0D\u80FD\u8F93\u51FA\u89E3\u91CA\u6587\u672C\u3002`,`\u4E25\u683C\u4F7F\u7528 protocolVersion=${vs}\u3001mode="${go}"\u3002`,"","\u9876\u5C42 JSON \u5FC5\u987B\u5305\u542B: protocolVersion, mode, baseFingerprint, summary, warnings, operations, currentTableId\u3002","warnings \u5FC5\u987B\u662F\u5B57\u7B26\u4E32\u6570\u7EC4\uFF1B\u6CA1\u6709\u5219\u8F93\u51FA\u7A7A\u6570\u7EC4\u3002","","\u53EA\u5141\u8BB8\u4EE5\u4E0B 10 \u79CD\u64CD\u4F5C:",...Object.values(tt).map(t=>`  - ${t}`),"",'\u6BCF\u4E2A operations[i] \u5FC5\u987B\u4F7F\u7528 "op" \u5B57\u6BB5\u8868\u793A\u64CD\u4F5C\u540D\uFF1B\u7981\u6B62\u4F7F\u7528 type/operation/action \u7B49\u522B\u540D\u3002',"","--- add_table ---","\u5FC5\u987B\u63D0\u4F9B\u975E\u7A7A name \u548C\u81F3\u5C11\u4E00\u4E2A columns \u9879\u3002","\u6BCF\u4E2A column \u81F3\u5C11\u6709 title \u5B57\u6BB5\u3002","\u5E94\u5C3D\u91CF\u540C\u65F6\u63D0\u4F9B aiInstructions\uFF08init/create/update/delete\uFF09\u8BA9\u65B0\u8868\u7ACB\u523B\u53EF\u7528\u3002","\u4E0D\u8981\u751F\u6210 tableId\uFF0C\u672C\u5730\u4F1A\u81EA\u52A8\u751F\u6210\u3002",'\u5982\u679C\u7528\u6237\u53EA\u8BF4"\u65B0\u589E\u67D0\u67D0\u8868"\u4F46\u6CA1\u7ED9\u8868\u5934\uFF0C\u6839\u636E\u8868\u540D\u8BED\u4E49\u751F\u6210\u5408\u7406\u901A\u7528\u7684 columns\u3002',"\u9ED8\u8BA4\u4F18\u5148 add_table + \u5B8C\u6574 aiInstructions\uFF1B\u9664\u975E\u7528\u6237\u660E\u786E\u8981\u6C42 DDL \u6216\u5B57\u6BB5\u7C7B\u578B\u7EA6\u675F\uFF0C\u5426\u5219\u4E0D\u8981\u8F93\u51FA patch_table_columns \u6765\u8865\u5217\u3002","","--- patch_table_ai_instructions ---",`\u53EA\u5141\u8BB8 patch: { ${[...Rl].join(", ")} }\u3002`,"","--- patch_table_columns ---","patch \u53EA\u5141\u8BB8: renameColumns[], addColumns[], deleteColumns[]\u3002","renameColumns \u4E2D\u7528 columnKey\uFF08\u4E0D\u662F title\uFF09\u5B9A\u4F4D\u5217\uFF0C\u63D0\u4F9B newTitle\u3002","addColumns \u4E2D\u6BCF\u4E2A\u9879\u81F3\u5C11\u6709 title\u3002","deleteColumns \u4E2D\u662F columnKey \u5B57\u7B26\u4E32\u6570\u7EC4\u3002","","--- patch_table_rows ---","patch \u53EA\u5141\u8BB8: updateCells[], addRows[], deleteRowIds[]\u3002","updateCells \u7528 rowId\uFF08\u4E0D\u662F\u884C\u53F7\uFF09\u5B9A\u4F4D\u884C\uFF0C\u7528 columnKey \u5B9A\u4F4D\u5217\uFF0C\u63D0\u4F9B value\u3002","addRows \u4E2D\u6BCF\u4E2A\u9879\u6709 cells: { [columnKey]: value }\u3002","deleteRowIds \u662F rowId \u5B57\u7B26\u4E32\u6570\u7EC4\u3002","","--- patch_table_export_config ---","patch \u53EA\u5141\u8BB8: enabled, entryName, entryType, splitByRow, keywords, injectionTemplate, preventRecursion\u3002","","--- patch_table_locks ---","patch \u53EA\u5141\u8BB8: rows[], columns[], cells[]\u3002","rows \u4E2D\u7528 rowIndex(0-based) + locked(boolean)\u3002","columns \u4E2D\u7528 columnKey + locked(boolean)\u3002","cells \u4E2D\u7528 rowIndex + columnKey + locked(boolean)\u3002","","--- patch_workbench_config ---","patch \u53EA\u5141\u8BB8: contextDepth, contextRoles, sendLatestRows, runScope, mirrorToMessage, mirrorTag, fillMode, autoUpdateEnabled, autoUpdateTrigger\u3002","","--- \u901A\u7528\u89C4\u5219 ---","\u5982\u679C\u9700\u6C42\u4FE1\u606F\u4E0D\u8DB3\u6216\u65E0\u6CD5\u751F\u6210\u5408\u6CD5\u64CD\u4F5C\uFF0C\u8FD4\u56DE\u7A7A operations\uFF0Csummary \u8BF4\u660E\u539F\u56E0\uFF0Cwarnings \u5199\u660E\u539F\u56E0\u3002\u4E0D\u8981\u8F93\u51FA\u8FFD\u95EE\u6587\u672C\u3002","\u4E25\u683C\u7981\u6B62\u4EFB\u4F55\u76F4\u63A5\u4FDD\u5B58\u884C\u4E3A\u3002","patch \u5BF9\u8C61\u53EA\u80FD\u586B\u5199\u5F53\u524D\u7ED3\u6784\u91CC\u771F\u5B9E\u5B58\u5728\u7684 tableId\u3001columnKey\u3001rowId\uFF1B\u4E0D\u8981\u731C\u6D4B\u672A\u77E5\u5B57\u6BB5\u3002","move_table \u53EA\u80FD\u63D0\u4F9B beforeTableId \u6216 afterTableId \u4E4B\u4E00\u3002","","=== \u6570\u636E\u6A21\u578B\u8BED\u4E49 ===","","\u8868\u683C (table) \u9876\u5C42\u5B57\u6BB5:","  id: \u53EA\u8BFB\uFF0C\u7531\u7CFB\u7EDF\u81EA\u52A8\u751F\u6210\u7684\u552F\u4E00\u6807\u8BC6\u7B26\u3002","  name: \u8868\u7684\u663E\u793A\u540D\u79F0\uFF08\u4E2D\u6587\uFF09\u3002","  note: \u8868\u7684\u7528\u9014\u63CF\u8FF0\uFF08\u7B49\u540C aiInstructions.note\uFF09\u3002","  enabled: boolean\uFF0C\u8BE5\u8868\u662F\u5426\u53C2\u4E0E\u81EA\u52A8\u586B\u8868\u3002","  columns[]: \u5217\u5B9A\u4E49\u6570\u7EC4\u3002","  rows[]: \u884C\u6570\u636E\u6570\u7EC4\u3002","  aiInstructions{}: AI \u64CD\u4F5C\u6307\u4EE4\u96C6\u3002","  exportConfig{}: \u4E16\u754C\u4E66\u6CE8\u5165\u5BFC\u51FA\u914D\u7F6E\u3002","","\u5217 (column) \u5B57\u6BB5:","  key: \u53EA\u8BFB\uFF0C\u7CFB\u7EDF\u4ECE title \u81EA\u52A8\u6D3E\u751F\u7684\u552F\u4E00\u6807\u8BC6\uFF08\u4E2D\u6587 title \u53EF\u80FD\u751F\u6210 col_1 \u683C\u5F0F\uFF09\u3002","  title: \u5217\u6807\u9898\uFF08\u9762\u5411\u7528\u6237\u7684\u663E\u793A\u540D\uFF09\u3002","  description: \u5217\u8BF4\u660E\u3002","  type: \u5217\u7C7B\u578B\u679A\u4E3E \u2014 text | number | boolean | date | json\uFF0C\u9ED8\u8BA4 text\u3002","  required: boolean\uFF0C\u8BE5\u5217\u662F\u5426\u5FC5\u586B\u3002","","\u884C (row) \u5B57\u6BB5:","  id: \u53EA\u8BFB\uFF0C\u7CFB\u7EDF\u81EA\u52A8\u751F\u6210\u7684\u552F\u4E00\u6807\u8BC6\u7B26\uFF08\u4E0D\u900F\u660E\u5B57\u7B26\u4E32\uFF0C\u975E\u6570\u5B57\u7D22\u5F15\uFF09\u3002",'  name: \u884C\u6807\u8BC6\uFF08\u5982"\u884C1"\uFF09\u3002',"  cells: { [columnKey]: string }\uFF0C\u6240\u6709\u503C\u90FD\u662F\u5B57\u7B26\u4E32\u3002","","aiInstructions \u5B57\u6BB5\u8BED\u4E49:","  note: \u8868\u7528\u9014\u63CF\u8FF0\uFF08\u5F71\u54CD AI \u5BF9\u8868\u7684\u7406\u89E3\uFF09\u3002","  init: \u521D\u59CB\u5316\u6307\u4EE4 \u2014 \u9996\u6B21\u586B\u5145\u65F6\u5982\u4F55\u751F\u6210\u884C\u3002","  create: \u65B0\u589E\u884C\u6307\u4EE4 \u2014 \u4EC0\u4E48\u6761\u4EF6\u4E0B\u65B0\u589E\u4E00\u884C\u3001\u683C\u5F0F\u8981\u6C42\u3002","  update: \u66F4\u65B0\u884C\u6307\u4EE4 \u2014 \u4EC0\u4E48\u6761\u4EF6\u4E0B\u4FEE\u6539\u5DF2\u6709\u884C\u3001\u54EA\u4E9B\u5217\u53EF\u6539\u3002","  delete: \u5220\u9664\u884C\u6307\u4EE4 \u2014 \u4EC0\u4E48\u6761\u4EF6\u4E0B\u5220\u9664\u884C\u3002","","exportConfig \u5B57\u6BB5\u8BED\u4E49:","  enabled: boolean\uFF0C\u662F\u5426\u5C06\u8BE5\u8868\u6570\u636E\u5199\u5165\u4E16\u754C\u4E66\u6761\u76EE\u3002","  entryName: \u4E16\u754C\u4E66\u6761\u76EE\u540D\u79F0\u3002","  entryType: \u6761\u76EE\u7C7B\u578B\u679A\u4E3E \u2014 constant | keyword\u3002","  splitByRow: boolean\uFF0C\u662F\u5426\u6BCF\u884C\u751F\u6210\u72EC\u7ACB\u6761\u76EE\u3002","  keywords: \u89E6\u53D1\u5173\u952E\u8BCD\u3002","  injectionTemplate: \u6CE8\u5165\u6A21\u677F\uFF08\u652F\u6301 {{columnKey}} \u53D8\u91CF\uFF09\u3002","  preventRecursion: boolean\uFF0C\u9ED8\u8BA4 true\uFF0C\u9632\u6B62\u9012\u5F52\u6CE8\u5165\u3002","","\u5DE5\u4F5C\u53F0\u914D\u7F6E\u5B57\u6BB5\u503C\u57DF:","  contextDepth: 0-50\uFF0C\u5411\u524D\u8BFB\u53D6\u7684\u6D88\u606F\u6761\u6570\u3002",'  contextRoles: "all" | "assistant_only"\uFF0C\u8BFB\u53D6\u54EA\u4E9B\u89D2\u8272\u7684\u6D88\u606F\u3002',"  sendLatestRows: \u53D1\u9001\u7ED9 AI \u7684\u6700\u65B0 N \u884C\u6570\u636E\uFF080=\u5168\u90E8\uFF09\u3002",'  runScope: "enabled" | "selected" | "current"\uFF0C\u81EA\u52A8\u586B\u8868\u8303\u56F4\u3002','  fillMode: "incremental" | "full"\uFF0C\u589E\u91CF\u6216\u5168\u91CF\u586B\u5145\u6A21\u5F0F\u3002',"  mirrorToMessage: boolean\uFF0C\u662F\u5426\u5C06\u6570\u636E\u955C\u50CF\u5199\u56DE\u6D88\u606F\u3002","  mirrorTag: \u955C\u50CF\u6807\u7B7E\u540D\u3002","  autoUpdateEnabled: boolean\uFF0C\u662F\u5426\u542F\u7528\u81EA\u52A8\u586B\u8868\u3002","  autoUpdateTrigger: \u81EA\u52A8\u89E6\u53D1\u6761\u4EF6\u3002","","=== \u64CD\u4F5C\u793A\u4F8B ===","","\u793A\u4F8B 1 \u2014 add_table\uFF08\u65B0\u589E\u8868\uFF0C\u542B\u5B8C\u6574\u7ED3\u6784\u548C AI \u6307\u4EE4\uFF09:","{",'  "op": "add_table",','  "name": "\u6218\u5229\u54C1\u8868",','  "columns": [','    { "title": "\u7269\u54C1\u540D", "type": "text", "required": true },','    { "title": "\u7A00\u6709\u5EA6", "type": "text" },','    { "title": "\u6570\u91CF", "type": "number" }',"  ],",'  "aiInstructions": {','    "note": "\u8BB0\u5F55\u89D2\u8272\u83B7\u5F97\u7684\u6218\u5229\u54C1",','    "init": "\u6839\u636E\u5267\u60C5\u5185\u5BB9\u521D\u59CB\u5316\u89D2\u8272\u5DF2\u6709\u7684\u7269\u54C1",','    "create": "\u5F53\u89D2\u8272\u83B7\u5F97\u65B0\u7269\u54C1\u65F6\u65B0\u589E\u884C",','    "update": "\u5F53\u7269\u54C1\u6570\u91CF\u6216\u7A00\u6709\u5EA6\u53D8\u5316\u65F6\u66F4\u65B0\u5BF9\u5E94\u884C",','    "delete": "\u5F53\u7269\u54C1\u88AB\u6D88\u8017\u6216\u4E22\u5931\u65F6\u5220\u9664\u5BF9\u5E94\u884C"',"  }","}","","\u793A\u4F8B 2 \u2014 patch_table_ai_instructions:","{",'  "op": "patch_table_ai_instructions",','  "tableId": "table_abc123",','  "patch": { "create": "\u5F53\u65B0\u89D2\u8272\u767B\u573A\u6216\u65B0\u7269\u54C1\u83B7\u5F97\u65F6\u65B0\u589E\u884C", "note": "\u8BB0\u5F55\u89D2\u8272\u7269\u54C1\u548C\u6218\u5229\u54C1" }',"}","","\u793A\u4F8B 3 \u2014 patch_table_columns:","{",'  "op": "patch_table_columns",','  "tableId": "table_abc123",','  "patch": {','    "renameColumns": [{ "columnKey": "col_1", "newTitle": "\u7269\u54C1\u540D\u79F0" }],','    "addColumns": [{ "title": "\u6765\u6E90", "type": "text" }],','    "deleteColumns": ["col_5"]',"  }","}","","=== \u6CE8\u610F\u4E8B\u9879 ===","- columnKey \u4ECE title \u81EA\u52A8\u6D3E\u751F\uFF0C\u4E2D\u6587 title \u7684 key \u901A\u5E38\u4E0D\u662F\u4E2D\u6587\uFF08\u5982 col_1\u3001col_2\uFF09\u3002\u5B9A\u4F4D\u5217\u65F6\u52A1\u5FC5\u7528 userPrompt \u4E2D\u63D0\u4F9B\u7684 column.key \u503C\u3002",'- rowId \u662F\u4E0D\u900F\u660E\u5B57\u7B26\u4E32\uFF08\u5982 "row_x7k9m2"\uFF09\uFF0C\u4E0D\u53EF\u7528\u884C\u53F7\u4EE3\u66FF\u3002','- cells \u4E2D\u6240\u6709\u503C\u90FD\u662F\u5B57\u7B26\u4E32\u7C7B\u578B\uFF0C\u6570\u5B57\u4E5F\u5199\u4F5C "42"\u3002',"- exportConfig.preventRecursion \u9ED8\u8BA4\u5E94\u4E3A true\u3002","- add_table \u4E0D\u8981\u751F\u6210 tableId\uFF0C\u672C\u5730\u81EA\u52A8\u751F\u6210\u3002","- \u6CE8\u5165\u6A21\u677F injectionTemplate \u4E2D\u7528 {{columnKey}} \u5F15\u7528\u5217\u503C\u3002"].join(`
`)}function vA(t,e,r){let n=t.config,s=t.currentTableId||"",o=Array.isArray(n?.tables)?n.tables:[],a=o.find(d=>d.id===s)||null,i=o.map(d=>({tableId:d.id,name:d.name,note:d.note||"",enabled:d.enabled,columns:(d.columns||[]).map(c=>({key:c.key,title:c.title,type:c.type||"text"})),aiInstructions:d.aiInstructions||{},exportConfig:d.exportConfig||{},rowCount:Array.isArray(d.rows)?d.rows.length:0,rows:r?.[d.id]||void 0})),l={userRequest:Cn(t.userRequest),baseFingerprint:e,currentTableId:s,currentTable:a?{tableId:a.id,name:a.name,note:a.note||"",columns:(a.columns||[]).map(d=>({key:d.key,title:d.title,type:d.type||"text"})),aiInstructions:a.aiInstructions||{},exportConfig:a.exportConfig||{},rowCount:Array.isArray(a.rows)?a.rows.length:0,rowIds:(a.rows||[]).map(d=>d.id),rows:r?.[a.id]||void 0}:null,allTables:i,workbenchConfig:{contextDepth:n.contextDepth,contextRoles:n.contextRoles,sendLatestRows:n.sendLatestRows,runScope:n.runScope||n.scope?.mode,fillMode:n.fillMode,autoUpdateEnabled:n.autoUpdateEnabled,mirrorToMessage:n.mirrorToMessage}};try{return JSON.stringify(l,null,0)}catch{return"{}"}}function SA({userRequest:t,round:e,maxRounds:r,repairReason:n}){let s=[Cn(t)];return e>1&&s.push(`\u8865\u5145\u8BF4\u660E\uFF1A\u5F53\u524D\u662F\u7B2C ${e}/${r} \u8F6E\uFF0C\u8F93\u5165\u6570\u636E\u5DF2\u7ECF\u5305\u542B\u524D\u9762\u8F6E\u6B21\u4EA7\u751F\u7684\u8349\u7A3F\u7ED3\u679C\u3002\u8BF7\u53EA\u7EE7\u7EED\u672A\u5B8C\u6210\u7684\u6539\u52A8\uFF1B\u5982\u679C\u5DF2\u7ECF\u65E0\u9700\u7EE7\u7EED\u4FEE\u6539\uFF0C\u8BF7\u8FD4\u56DE\u7A7A operations\u3002`),n&&s.push(`\u4FEE\u590D\u8981\u6C42\uFF1A\u4E0A\u4E00\u8F6E\u8349\u7A3F\u672A\u901A\u8FC7\u672C\u5730\u6821\u9A8C\uFF0C\u539F\u56E0\u662F\uFF1A${n}\u3002\u8BF7\u4FEE\u590D\u8349\u7A3F\u5E76\u7EE7\u7EED\u5B8C\u6210\u9700\u6C42\uFF0C\u4ECD\u7136\u53EA\u80FD\u8F93\u51FA\u5408\u6CD5 draft JSON\u3002`),s.filter(Boolean).join(`

`)}async function TA(t,e){let r=t.config,n=Cn(t.userRequest);if(!n)throw new Error("\u8BF7\u8F93\u5165\u6539\u8868\u9700\u6C42");let s=await Oa(r),o=[{role:"system",content:wA()},...(t.priorTurns||[]).flatMap(c=>{let u=[];return c.user&&u.push({role:"user",content:c.user}),c.assistant&&u.push({role:"assistant",content:c.assistant}),u}),{role:"user",content:vA(t,s,t.dataContext)}],a=Cn(t.apiPreset||r?.apiPreset),i=await Fn(a||"",o,{},e);if(!i)throw new Error("AI \u672A\u8FD4\u56DE\u6709\u6548\u5185\u5BB9");let l;try{l=kb(i)}catch(c){throw kn.error("draft \u89E3\u6790\u5931\u8D25",{userRequest:n,error:c?.message,aiRawText:i}),c}if(l.baseFingerprint!==s)throw new Error("AI \u8FD4\u56DE\u7684 baseFingerprint \u4E0E\u5F53\u524D\u7ED3\u6784\u4E0D\u4E00\u81F4");let d=zu({config:r,draft:l});return{draft:l,aiRawText:i,messages:o,compileResult:d,originalBaseFingerprint:s}}async function Rb(t){let e=t.config,r=Cn(t.userRequest);if(!r)throw new Error("\u8BF7\u8F93\u5165\u6539\u8868\u9700\u6C42");let n=Ml(t.maxRounds,Tb),s=Eb(t.maxRepairRetries,_b),o=zt(e),a=await Oa(o),i=[],l=_A(t.priorTurns),d=zt(o),c=a,u=ho.MAX_ROUNDS,y=0,p="",m=null,g=null;function h(){let T=t.guard;if(T?.isCancelled?.())throw new Ss("cancelled");if(T?.isStale?.())throw new Ss("stale")}function b(){if(g){try{g.abort()}catch{}g=null}}e:for(let T=1;T<=n;T+=1){let E="";for(;;){h(),b(),g=new AbortController;let w=SA({userRequest:r,round:T,maxRounds:n,repairReason:E});try{let _=[...l,...i.map(W=>({user:W.userRequest,assistant:W.aiRawText}))],A=await TA({config:d,currentTableId:t.currentTableId,userRequest:w,priorTurns:_,apiPreset:t.apiPreset,dataContext:t.dataContext},g.signal);h(),m=A;let I=A.draft.operations.length>0,P=I?zt(A.compileResult.candidateConfig):zt(d),C=I?await Oa(P):c,N={round:T,userRequest:w,draft:A.draft,aiRawText:A.aiRawText,messages:A.messages,perRoundCompileResult:A.compileResult,workingFingerprint:C};if(i.push(N),t.onRoundComplete?.({round:zt(N),rounds:zt(i),maxRounds:n}),!I){u=ho.EMPTY_OPERATIONS;break e}if(d=P,C===c){u=ho.REPEATED_FINGERPRINT;break e}if(c=C,p="",T===n){u=ho.MAX_ROUNDS;break e}break}catch(_){if(h(),_ instanceof Ss)throw _;if(p=_?.message||"\u672A\u77E5\u9519\u8BEF",y>=s){u=ho.REPAIR_RETRY_CAPPED;break e}y+=1,E=p}}}b();let v=i.length>0?i[i.length-1].perRoundCompileResult:zu({config:d,draft:Ou(a)}),x={originalBaseFingerprint:a,finalWorkingFingerprint:c,stopReason:u,roundsExecuted:i.length,maxRounds:n,repairRetriesUsed:y,maxRepairRetries:s,lastErrorMessage:p};return{draft:m?.draft||Ou(a,t.currentTableId),aiRawText:m?.aiRawText||"",messages:m?.messages||[],compileResult:v,originalBaseFingerprint:a,rounds:i,session:x,targetSnapshot:t.targetSnapshot||null}}function _A(t){return Array.isArray(t)?t.map(e=>({user:Cn(e?.user),assistant:Cn(e?.assistant)})).filter(e=>e.user||e.assistant):[]}async function Mb(t){try{let e=await Oa(Ee()),r=t.originalBaseFingerprint||t.draft?.baseFingerprint||"";if(!r||e!==r)return kn.warn("applyAssistantResult: fingerprint \u4E0D\u5339\u914D\uFF0C\u8349\u7A3F\u5DF2\u8FC7\u671F"),!1;let n=ot(t.compileResult.candidateConfig);if(n&&typeof n=="object"&&n.success===!1)return kn.error("applyAssistantResult: saveTableWorkbenchConfig \u5931\u8D25",n),!1;if(t.compileResult.lockChanges?.length){let l={chatId:"",isolationKey:ye.isEnabled()?ye.getKey():""};t.compileResult.lockChanges.forEach(d=>{d.rows?.forEach(c=>{Sl(l,d.tableId,c.rowIndex,c.locked)}),d.columns?.forEach(c=>{Tl(l,d.tableId,c.columnKey,c.locked)}),d.cells?.forEach(c=>{_l(l,d.tableId,c.rowIndex,c.columnKey,c.locked)})})}let s=t.rounds||[],o=t.compileResult?.diff?.patchedRows?.length>0;return(s.some(i=>i.draft?.operations?.some(l=>l.op===tt.PATCH_ROWS))||o)&&t.targetSnapshot&&await EA(t),kn.info("applyAssistantResult: \u8349\u7A3F\u5DF2\u5E94\u7528",{tables:t.compileResult.candidateConfig?.tables?.length}),!0}catch(e){return kn.error("applyAssistantResult \u5F02\u5E38",e),!1}}async function EA(t){let e=t.targetSnapshot,r=[];for(let n of t.rounds||[]){let s=(n.draft?.operations||[]).filter(o=>o.op===tt.PATCH_ROWS);r.push(...s)}if(!r.length){let n=(t.draft?.operations||[]).filter(s=>s.op===tt.PATCH_ROWS);r.push(...n)}if(r.length)try{let n=gl(e);if(!n?.tables?.length){kn.info("applyRowPatchesToBoundState: boundState \u4E3A\u7A7A\uFF0C\u8DF3\u8FC7\u884C\u6570\u636E\u5E94\u7528");return}let s=fe(n.tables);for(let o of r){let a=s.find(l=>l.id===o.tableId);if(!a)continue;Array.isArray(a.rows)||(a.rows=[]);let i=o.patch;if(i.updateCells?.length)for(let l of i.updateCells){let d=a.rows.find(c=>c.id===l.rowId);d&&l.columnKey&&(d.cells=d.cells||{},d.cells[l.columnKey]=String(l.value??""))}if(i.addRows?.length){let l=new Set((a.columns||[]).map(d=>d.key));for(let d of i.addRows){let c=Kr("row"),u={};for(let[y,p]of Object.entries(d.cells||{}))l.has(y)&&(u[y]=String(p??""));a.rows.push({id:c,name:d.name||c,cells:u})}}if(i.deleteRowIds?.length){let l=new Set(i.deleteRowIds);a.rows=a.rows.filter(d=>!l.has(d.id))}}await fo(e,{...n,tables:s},{skipFreshValidation:!0}),kn.info("applyRowPatchesToBoundState: \u884C\u6570\u636E\u5DF2\u5E94\u7528\u5230 boundState",{ops:r.length})}catch(n){kn.error("applyRowPatchesToBoundState \u5931\u8D25",n)}}var kn,Ss,Pb=O(()=>{Cs();Z();sr();ms();We();El();Ur();Ku();Pl();kn=$.createScope("TableAssistant");Ss=class extends Error{constructor(e){super(e==="cancelled"?"\u6539\u8868\u52A9\u624B\u4F1A\u8BDD\u5DF2\u53D6\u6D88":"\u6539\u8868\u52A9\u624B\u4F1A\u8BDD\u5DF2\u8FC7\u671F"),this.name="AssistantSessionStoppedError",this.stopReason=e}}});function AA(){try{if(window.parent&&window.parent!==window&&window.parent.document)return window.parent.document}catch{}return document}function $l(){return`turn_${Date.now()}_${Math.random().toString(36).slice(2,8)}`}function ct(t){let e=document.createElement("div");return e.textContent=String(t??""),e.innerHTML}function CA(){let t=Ee(),e=t?.scope?.activeTableId||"",r=(t?.tables||[]).find(n=>n.id===e);return!e||!r?"\u5F53\u524D\u672A\u9009\u4E2D\u8868":`${r.name} (${e})`}function $b(t){if(!t)return"";let e=[];t.addedTables?.length&&e.push(`\u65B0\u589E${t.addedTables.length}\u8868`),t.deletedTables?.length&&e.push(`\u5220\u9664${t.deletedTables.length}\u8868`),t.renamedTables?.length&&e.push(`\u91CD\u547D\u540D${t.renamedTables.length}\u8868`),t.movedTables?.length&&e.push(`\u79FB\u52A8${t.movedTables.length}\u8868`);let r=(t.patchedAiInstructions?.length||0)+(t.patchedColumns?.length||0)+(t.patchedRows?.length||0)+(t.patchedExportConfig?.length||0)+(t.patchedLocks?.length||0)+(t.patchedWorkbenchConfig?.length||0);return r&&e.push(`\u4FEE\u6539${r}\u5904`),e.length?e.join(" \xB7 "):"\u65E0\u53D8\u66F4"}function Lb(t){if(!t)return"";let e=[],r=n=>n.length?`<ul>${n.map(s=>`<li>${ct(s)}</li>`).join("")}</ul>`:'<div class="yyt-assistant-hint">\u65E0</div>';return t.addedTables?.length&&e.push(`<div><strong>\u65B0\u589E\u8868</strong>${r(t.addedTables.map(n=>`${n.name} [${n.tableId}]`))}</div>`),t.deletedTables?.length&&e.push(`<div><strong>\u5220\u9664\u8868</strong>${r(t.deletedTables.map(n=>`${n.name} [${n.tableId}]`))}</div>`),t.renamedTables?.length&&e.push(`<div><strong>\u91CD\u547D\u540D</strong>${r(t.renamedTables.map(n=>`${n.beforeName} -> ${n.afterName}`))}</div>`),t.patchedAiInstructions?.length&&e.push(`<div><strong>AI \u6307\u4EE4\u53D8\u66F4</strong>${r(t.patchedAiInstructions.map(n=>`${n.name}: ${n.keys.join(", ")}`))}</div>`),t.patchedColumns?.length&&e.push(`<div><strong>\u5217\u7ED3\u6784\u53D8\u66F4</strong>${r(t.patchedColumns.map(n=>`${n.name}: ${n.changes.join("\uFF1B")}`))}</div>`),t.patchedRows?.length&&e.push(`<div><strong>\u884C\u6570\u636E\u53D8\u66F4</strong>${r(t.patchedRows.map(n=>`${n.name}: ${n.changes.join("\uFF1B")}`))}</div>`),t.patchedExportConfig?.length&&e.push(`<div><strong>\u5BFC\u51FA\u914D\u7F6E\u53D8\u66F4</strong>${r(t.patchedExportConfig.map(n=>`${n.name}: ${n.keys.join(", ")}`))}</div>`),t.patchedLocks?.length&&e.push(`<div><strong>\u9501\u53D8\u66F4</strong>${r(t.patchedLocks.map(n=>`${n.name}: ${n.changes.join("\uFF1B")}`))}</div>`),t.patchedWorkbenchConfig?.length&&e.push(`<div><strong>\u5DE5\u4F5C\u53F0\u914D\u7F6E\u53D8\u66F4</strong>${r(t.patchedWorkbenchConfig.map(n=>n.keys.join(", ")))}</div>`),e.join("")}function kA(t){let e=t.compileResult?.highRiskItems||[];return e.length?e.map((r,n)=>{let s=t.riskConfirmations?.[String(n)]!==!1;return`<label class="yyt-assistant-risk-item"><input type="checkbox" class="yyt-assistant-risk-cb" data-turn-id="${ct(t.id)}" data-risk-idx="${n}" ${s?"checked":""}><span>${ct(r.label)}</span></label>`}).join(""):'<div class="yyt-assistant-hint">\u65E0\u9AD8\u98CE\u9669\u64CD\u4F5C</div>'}function IA(){return dt.length?dt.map((t,e)=>{let r=e===dt.length-1;if(t.type==="user")return`<div class="yyt-assistant-bubble yyt-assistant-bubble-user"><div class="yyt-assistant-label">\u4F60</div><div class="yyt-assistant-content">${ct(t.content)}</div></div>`;if(t.type==="error")return`<div class="yyt-assistant-bubble yyt-assistant-bubble-error"><div class="yyt-assistant-label" style="color:#ff8888;">\u6267\u884C\u9519\u8BEF</div><div class="yyt-assistant-content">${ct(t.errorMessage)}</div></div>`;if(t.type==="assistant"){let n=t.draft,s=t.compileResult,o=n?.summary||"\uFF08\u65E0\u6458\u8981\uFF09",a=n?.warnings||[],i=$b(s?.diff),l=!!t.isFinal,d=s?.highRiskItems?.length||0,c=d===0||t.riskConfirmations&&s.highRiskItems.every((g,h)=>t.riskConfirmations[String(h)]!==!1),u=r&&l,y=t.expanded||!1,p=t.sessionInfo||"",m='<div class="yyt-assistant-bubble yyt-assistant-bubble-ai">';if(m+=`<div class="yyt-assistant-label">AI \u52A9\u624B${p?` \xB7 ${ct(p)}`:""}</div>`,m+=`<div class="yyt-assistant-content">${ct(o)}</div>`,m+=`<div class="yyt-assistant-toggle" data-turn-id="${ct(t.id)}">${y?"\u25BC":"\u25B6"} \u8BE6\u60C5 (${ct(i)})</div>`,m+=`<div class="yyt-assistant-detail" data-turn-id="${ct(t.id)}" style="display:${y?"block":"none"};">`,a.length&&(m+=`<div><strong>\u8B66\u544A</strong><ul>${a.map(g=>`<li>${ct(g)}</li>`).join("")}</ul></div>`),m+=Lb(s?.diff),l&&d>0?m+=`<div><strong>\u9AD8\u98CE\u9669\u786E\u8BA4</strong><div class="yyt-assistant-risk-list">${kA(t)}</div></div>`:d>0&&(m+=`<div><strong>\u9AD8\u98CE\u9669\u9879</strong><ul>${s.highRiskItems.map(g=>`<li>${ct(g.label)}</li>`).join("")}</ul></div>`),l&&t.cumulativeDiff){let g=$b(t.cumulativeDiff);g&&g!=="\u65E0\u53D8\u66F4"&&(m+=`<div class="yyt-assistant-cumulative"><strong>\u7D2F\u79EF\u53D8\u66F4</strong> ${ct(g)}`,m+=`<div class="yyt-assistant-cumulative-detail">${Lb(t.cumulativeDiff)}</div>`,m+="</div>")}return m+="</div>",u&&(m+=`<button class="yyt-btn yyt-btn-primary yyt-btn-small yyt-assistant-apply-btn" type="button" data-turn-id="${ct(t.id)}" ${c?"":"disabled"}>\u5E94\u7528\u5230\u5DE5\u4F5C\u53F0</button>`),m+="</div>",m}return""}).join(""):'<div class="yyt-assistant-empty">AI \u6539\u8868\u52A9\u624B\u5DF2\u5C31\u7EEA\u3002\u8F93\u5165\u4FEE\u6539\u9700\u6C42\u540E\u53D1\u9001\u3002</div>'}function RA(){let t=[];try{t=hc()||[]}catch{}return[{value:"",label:"\u8DDF\u968F\u586B\u8868\u5DE5\u4F5C\u53F0"},...t.map(e=>({value:e,label:e}))]}function MA(){return RA().map(t=>`<option value="${ct(t.value)}" ${String(t.value)===qu?"selected":""}>${ct(t.label)}</option>`).join("")}function PA(){let t=xo||!vo.trim();return`
    <div id="yyt-assistant-panel" class="yyt-assistant-panel">
      <div class="yyt-assistant-header">
        <div>
          <div class="yyt-assistant-title">AI \u6539\u8868\u52A9\u624B</div>
          <div class="yyt-assistant-hint">\u5F53\u524D\u8868\uFF1A${ct(CA())}</div>
        </div>
        <button class="yyt-btn yyt-btn-secondary yyt-btn-small" type="button" data-action="close-assistant">\u5173\u95ED</button>
      </div>
      <div class="yyt-assistant-chat">
        ${IA()}
      </div>
      <div class="yyt-assistant-footer">
        <div id="yyt-assistant-control-slot" class="yyt-assistant-controls">
          <label class="yyt-assistant-inline-field" for="yyt-assistant-preset">
            <span>API \u9884\u8BBE</span>
            <select class="yyt-select yyt-assistant-preset-select" id="yyt-assistant-preset">${MA()}</select>
          </label>
          <label class="yyt-assistant-inline-field" for="yyt-assistant-max-rounds">
            <span>\u6700\u5927\u8F6E\u6B21</span>
            <input class="yyt-input yyt-assistant-rounds-input" id="yyt-assistant-max-rounds" type="number" min="1" value="${ct(Hu)}">
          </label>
        </div>
        <textarea class="yyt-textarea yyt-assistant-textarea" id="yyt-assistant-input" placeholder="\u4F8B\u5982\uFF1A\u65B0\u589E\u4E00\u5F20\u6218\u5229\u54C1\u8868\uFF0C\u5173\u95ED\u80CC\u5305\u7269\u54C1\u8868\u7684\u72EC\u7ACB\u5BFC\u51FA\u3002">${ct(vo)}</textarea>
        <div class="yyt-assistant-actions">
          <button class="yyt-btn yyt-btn-primary" id="yyt-assistant-send" type="button" ${t?"disabled":""}>${xo?"\u751F\u6210\u4E2D...":"\u53D1\u9001"}</button>
          <button class="yyt-btn yyt-btn-small" id="yyt-assistant-stop" type="button" ${xo?"":"disabled"}>\u505C\u6B62</button>
        </div>
      </div>
    </div>
  `}function Gu(){return Fu?Fu.querySelector("#"+Nb):AA().getElementById(Nb)}function wo(){let t=Gu();t&&(t.innerHTML=PA(),NA())}function NA(){let t=Gu();t&&(t.querySelector("#yyt-assistant-input")?.addEventListener("input",e=>{vo=e.target.value||"";let r=t.querySelector("#yyt-assistant-send");r&&(r.disabled=xo||!vo.trim())}),t.querySelector("#yyt-assistant-preset")?.addEventListener("change",e=>{qu=e.target.value||""}),t.querySelector("#yyt-assistant-max-rounds")?.addEventListener("input",e=>{Hu=e.target.value||String(Wu)}),t.querySelector("#yyt-assistant-send")?.addEventListener("click",$A),t.querySelector("#yyt-assistant-stop")?.addEventListener("click",LA),t.querySelector('[data-action="close-assistant"]')?.addEventListener("click",OA),t.querySelectorAll(".yyt-assistant-toggle").forEach(e=>{e.addEventListener("click",()=>{let r=e.getAttribute("data-turn-id"),n=dt.find(s=>s.id===r&&s.type==="assistant");n&&(n.expanded=!n.expanded,wo())})}),t.querySelectorAll(".yyt-assistant-risk-cb").forEach(e=>{e.addEventListener("change",()=>{let r=e.getAttribute("data-turn-id"),n=Number(e.getAttribute("data-risk-idx")),s=dt.find(a=>a.id===r&&a.type==="assistant");if(!s)return;s.riskConfirmations||(s.riskConfirmations={}),s.riskConfirmations[String(n)]=e.checked;let o=t.querySelector(`.yyt-assistant-apply-btn[data-turn-id="${r}"]`);if(o){let a=(s.compileResult?.highRiskItems||[]).every((i,l)=>s.riskConfirmations[String(l)]!==!1);o.disabled=!a}})}),t.querySelectorAll(".yyt-assistant-apply-btn").forEach(e=>{e.addEventListener("click",async()=>{let r=e.getAttribute("data-turn-id"),n=dt.find(a=>a.id===r&&a.type==="assistant");if(!n?.result)return;let s=n.compileResult?.highRiskItems||[],o=s.every((a,i)=>n.riskConfirmations?.[String(i)]!==!1);if(s.length&&!o){Vr.warn("\u8BF7\u5148\u786E\u8BA4\u6240\u6709\u9AD8\u98CE\u9669\u9879",null,{toast:"warning"});return}try{if(await Mb(n.result)){Vr.info("assistant \u8349\u7A3F\u5DF2\u5E94\u7528\u5230\u5DE5\u4F5C\u53F0",null,{toast:"success"});let i=n.compileResult?.focusTableId;if(i)try{let l=Ee();l&&(!l.scope||l.scope.activeTableId!==i)&&(l.scope={...l.scope||{},activeTableId:i},ot(l))}catch{}typeof Uu=="function"&&Uu(),wo()}else Vr.warn("\u5F53\u524D\u7ED3\u6784\u5DF2\u53D8\u5316\uFF0Cassistant \u8349\u7A3F\u5DF2\u5931\u6548\uFF0C\u8BF7\u91CD\u65B0\u751F\u6210\u3002",null,{toast:"warning"})}catch(a){Vr.error("\u5E94\u7528\u5931\u8D25",a,{toast:"error"})}})}))}async function $A(){let t=vo.trim();if(!t)return;let e=Ee(),r=e?.scope?.activeTableId||"";if(!r){Vr.warn("\u8BF7\u5148\u9009\u4E2D\u4E00\u4E2A\u8868\u540E\u518D\u4F7F\u7528 AI \u6539\u8868\u52A9\u624B",null,{toast:"warning"});return}let n=DA(),s={type:"user",id:$l(),content:t};dt.push(s),vo="",xo=!0;let o=Nl+1;Ll=Du(),Nl=o,wo();let a=e,i=null,l=null;try{if(i=await Ta(),i){let d=gl(i);if(d?.tables?.length){l={};for(let c of d.tables)Array.isArray(c.rows)&&c.rows.length&&(l[c.id]=c.rows.map(u=>({rowId:u.id,name:u.name||"",cells:u.cells||{}})));Object.keys(l).length||(l=null)}}}catch(d){Vr.warn("\u52A0\u8F7D\u884C\u6570\u636E\u4E0A\u4E0B\u6587\u5931\u8D25\uFF0C\u5C06\u4EC5\u4F7F\u7528 schema \u4E0A\u4E0B\u6587",d)}try{let d=await Rb({config:fe(e),currentTableId:r,userRequest:t,priorTurns:n,apiPreset:qu,maxRounds:Ml(Hu,Wu),guard:Ll.createRunGuard(),dataContext:l,targetSnapshot:i,onRoundComplete:y=>{if(o!==Nl)return;let p={type:"assistant",id:$l(),draft:y.round.draft,aiRawText:y.round.aiRawText,compileResult:y.round.perRoundCompileResult,sessionInfo:`\u7B2C ${y.round.round}/${y.maxRounds} \u8F6E`,isFinal:!1,expanded:!1,riskConfirmations:{}};dt.push(p),wo()}});if(o!==Nl)return;let c={type:"assistant",id:$l(),draft:d.draft,aiRawText:d.aiRawText,compileResult:d.compileResult,sessionInfo:d.session?`${d.session.roundsExecuted}\u8F6E \xB7 ${d.session.stopReason}`:"",isFinal:!0,expanded:!1,riskConfirmations:{},result:d};try{let y=Ib({baselineConfig:a,candidateConfig:d.compileResult.candidateConfig});c.cumulativeDiff=y.diff}catch(y){Vr.warn("buildCumulativeDiff \u5931\u8D25\uFF0C\u8DF3\u8FC7\u7D2F\u79EF\u6458\u8981",y)}let u=dt.findLastIndex(y=>y.type==="assistant"&&!y.isFinal);u>=0?dt[u]=c:dt.push(c)}catch(d){if(d instanceof Ss){Vr.warn(d.message,null,{toast:"warning"});return}dt.push({type:"error",id:$l(),errorMessage:d?.message||"\u751F\u6210\u5931\u8D25"}),Vr.error("\u6539\u8868\u52A9\u624B\u6267\u884C\u5931\u8D25",d,{toast:"error"})}finally{xo=!1,wo()}}function LA(){Ll&&Ll.cancel()}function OA(){Ob=!1;let t=Gu();t&&(t.style.display="none"),typeof ju=="function"&&ju()}function DA(){let t=[];for(let e=0;e<dt.length;e++){let r=dt[e];if(r.type==="user"){let n;for(let s=e+1;s<dt.length&&dt[s].type!=="user";s++)dt[s].type==="assistant"&&dt[s].isFinal&&(n=dt[s].aiRawText);t.push({user:r.content,assistant:n})}}return t}function Db(t,e,r){e&&(Fu=e),typeof t=="function"&&(Uu=t),ju=r||null,Ob=!0,wo()}function Bb(){return`
    /* inline mode (fallback, when not docked) */
    #yyt-assistant-host:not(.yyt-assistant-dock) { margin-top: 12px; }
    /* shared panel styles */
    .yyt-assistant-panel {
      border: 1px solid var(--yyt-border-strong);
      border-radius: var(--yyt-radius-lg);
      background: var(--yyt-surface);
      color: var(--yyt-text);
      overflow: hidden;
    }
    .yyt-assistant-header {
      display: flex; justify-content: space-between; align-items: center;
      padding: 10px 12px;
      background: var(--yyt-surface-2);
      border-bottom: 1px solid var(--yyt-border-strong);
    }
    .yyt-assistant-title { font-weight: 600; color: var(--yyt-text); }
    .yyt-assistant-hint { font-size: 12px; color: var(--yyt-text-secondary); margin-top: 2px; }
    .yyt-assistant-chat {
      max-height: 340px; overflow-y: auto;
      padding: 12px; display: flex; flex-direction: column; gap: 10px;
      background: var(--yyt-bg-base);
    }
    .yyt-assistant-empty {
      text-align: center; padding: 32px 16px; color: var(--yyt-text-muted); font-size: 13px;
      border: 1px dashed var(--yyt-border-strong); border-radius: var(--yyt-radius);
      background: var(--yyt-surface);
    }
    .yyt-assistant-bubble { padding: 10px 12px; border-radius: var(--yyt-radius); max-width: 92%; word-break: break-word; }
    .yyt-assistant-bubble-user {
      align-self: flex-end;
      background: var(--yyt-accent-soft);
      border: 1px solid var(--yyt-border-focus);
    }
    .yyt-assistant-bubble-ai {
      align-self: flex-start;
      background: var(--yyt-surface-2);
      border: 1px solid var(--yyt-border-strong);
    }
    .yyt-assistant-bubble-error {
      align-self: flex-start;
      background: var(--yyt-danger-soft);
      border: 1px solid color-mix(in srgb, var(--yyt-danger) 36%, transparent);
    }
    .yyt-assistant-label { font-size: 11px; font-weight: 600; color: var(--yyt-text-secondary); margin-bottom: 4px; }
    .yyt-assistant-content { font-size: 13px; line-height: 1.6; white-space: pre-wrap; color: var(--yyt-text); }
    .yyt-assistant-toggle {
      font-size: 12px; color: var(--yyt-text-muted); cursor: pointer; margin-top: 6px;
      padding: 4px 0; user-select: none;
    }
    .yyt-assistant-toggle:hover { color: var(--yyt-text-secondary); }
    .yyt-assistant-detail {
      font-size: 12px; line-height: 1.5; margin-top: 6px;
      padding: 8px; border-radius: var(--yyt-radius-sm);
      background: var(--yyt-surface);
      border: 1px solid var(--yyt-border);
    }
    .yyt-assistant-detail ul { margin: 4px 0; padding-left: 16px; }
    .yyt-assistant-detail li { margin: 2px 0; }
    .yyt-assistant-risk-list { display: flex; flex-direction: column; gap: 4px; }
    #yyt-assistant-host .yyt-assistant-risk-item {
      display: flex; align-items: center; gap: 6px; font-size: 12px; cursor: pointer;
      color: var(--yyt-text);
    }
    #yyt-assistant-host input[type="checkbox"] {
      accent-color: var(--yyt-accent);
    }
    .yyt-assistant-apply-btn { margin-top: 8px; }
    .yyt-assistant-footer {
      padding: 10px 12px;
      border-top: 1px solid var(--yyt-border-strong);
      background: var(--yyt-surface-2);
    }
    .yyt-assistant-controls {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
      margin-bottom: 8px;
    }
    .yyt-assistant-inline-field {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      color: var(--yyt-text-secondary);
      font-size: 12px;
      white-space: nowrap;
    }
    #yyt-assistant-host .yyt-assistant-preset-select {
      width: 160px;
      min-height: 32px;
      padding-top: 6px;
      padding-bottom: 6px;
    }
    #yyt-assistant-host .yyt-assistant-rounds-input {
      width: 64px;
      min-height: 32px;
      padding: 6px 8px;
      text-align: center;
    }
    #yyt-assistant-host .yyt-assistant-textarea {
      width: 100%; min-height: 68px; resize: vertical; box-sizing: border-box;
      padding: 8px; line-height: 1.5;
      background: var(--yyt-control-bg) !important;
      color: var(--yyt-text) !important;
      -webkit-text-fill-color: var(--yyt-text) !important;
    }
    #yyt-assistant-host .yyt-assistant-textarea::placeholder { color: var(--yyt-text-muted); }
    .yyt-assistant-actions { margin-top: 8px; }
    .yyt-assistant-cumulative {
      margin-top: 8px; padding: 8px; border-radius: var(--yyt-radius-sm);
      background: var(--yyt-surface); border: 1px dashed var(--yyt-border-strong);
      font-size: 12px;
    }
    .yyt-assistant-cumulative strong { color: var(--yyt-text-secondary); }
    .yyt-assistant-cumulative-detail { margin-top: 4px; }
  `}var Vr,Nb,Wu,Fu,Uu,ju,Ob,xo,vo,Hu,qu,Ll,dt,Nl,zb=O(()=>{Z();Pb();sr();ms();_a();Ku();We();Pl();ks();Vr=$.createScope("TableAssistantUI");Nb="yyt-assistant-host",Wu=3,Fu=null,Uu=null,ju=null,Ob=!1,xo=!1,vo="",Hu=String(Wu),qu="",Ll=null,dt=[],Nl=0});function ie(){return Vu||(Vu=$.createScope("TableDataEditor")),Vu}function Re(){M.isDirty=!0;try{M._refs.saveBtn?.setDisabled(!1),M._refs.dirtyBadge&&(M._refs.dirtyBadge.style.display="inline-flex")}catch{}}function Ub(){M.isDirty=!1;try{M._refs.saveBtn?.setDisabled(!0),M._refs.dirtyBadge&&(M._refs.dirtyBadge.style.display="none")}catch{}}function ht(){let t=Array.isArray(M.tempData)?M.tempData:[],e=M.currentTableIndex;return e>=0&&e<t.length?t[e]:null}function zA(){if(!Ju)try{let t=window.parent&&window.parent.document?window.parent.document:document,e=t.head||t.documentElement;if(e.querySelector("#yyt-tde-styles")){Ju=!0;return}let r=t.createElement("style");r.id="yyt-tde-styles",r.textContent=BA,e.appendChild(r),Ju=!0}catch(t){ie().warn("\u6CE8\u5165\u6570\u636E\u7F16\u8F91\u5668\u6837\u5F0F\u5931\u8D25",t)}}function Xu(){let t=[],e=null,r=!1,n=M._afterSaveGlobalAt&&Date.now()-M._afterSaveGlobalAt<5*60*1e3;try{let s=fs(null);ie().info("loadEditorData snapshot",{hasSnapshot:!!s,messageId:s?.message?.message_id??s?.sourceMessageId,chatId:s?.chatId,isolationKey:s?.tableState?.meta?.isolationKey,hasTableState:!!s?.tableState,tableStateTablesLen:Array.isArray(s?.tableState?.tables)?s.tableState.tables.length:null,firstTableNameInSlot:s?.tableState?.tables?.[0]?.name,afterSaveGlobalRecent:n}),!n&&Array.isArray(s?.tableState?.tables)&&s.tableState.tables.length>0&&(t=s.tableState.tables),e=s?{chatId:s.chatId||"",sourceMessageId:s.sourceMessageId||s.message?.message_id||"",sourceSwipeId:s.sourceSwipeId||"",effectiveSwipeId:s.effectiveSwipeId||"",slotBindingKey:s.slotBindingKey||"",slotRevisionKey:s.slotRevisionKey||"",slotTransactionId:s.slotTransactionId||"",traceId:s.traceId||"",targetMessageIndex:s.targetMessageIndex??-1}:null}catch(s){ie().warn("loadEditorData \u5F02\u5E38",s)}if(t.length===0)try{let o=ro({})?.template?.tables;Array.isArray(o)&&o.length>0&&(t=fe(o),r=!0)}catch(s){ie().warn("\u4ECE\u6A21\u677F fallback \u5931\u8D25",s)}M.tempData=fe(t)||[],M.targetSnapshot=e,M.isDirty=!1,M.isFromTemplate=r,M._pendingMirrorTag=null,M._pendingWrapperConfig=null,M.currentTableIndex>=M.tempData.length?M.currentTableIndex=M.tempData.length>0?0:-1:M.currentTableIndex<0&&M.tempData.length>0&&(M.currentTableIndex=0)}function KA(){let t=f("div",{className:"yyt-tde-toolbar"}),e=f("div",{className:"yyt-tde-toolbar-left"}),r=f("div",{className:"yyt-tde-mode-switch"}),n=[{key:"data",label:"\u6570\u636E\u7F16\u8F91"},{key:"schema",label:"\u7ED3\u6784\u914D\u7F6E"},{key:"global",label:"\u5168\u5C40\u6CE8\u5165"}];for(let u of n){let y=se({label:u.label,variant:M.mode===u.key?"primary":"ghost",size:"small",onClick:()=>{M.mode!==u.key&&(M.mode=u.key,Ve())}});r.appendChild(y.el)}e.appendChild(r);let s=f("span",{className:"yyt-tde-dirty-badge",text:"\u672A\u4FDD\u5B58"});M.isDirty&&(s.style.display="inline-flex"),e.appendChild(s),M._refs.dirtyBadge=s;let o=f("div",{className:"yyt-tde-actions"}),a=se({label:"\u91CD\u65B0\u52A0\u8F7D",icon:"\u21BB",size:"small",onClick:JA}),i=se({label:"\u4FDD\u5B58\u5230 chat",icon:"\u{1F4BE}",size:"small",disabled:!M.isDirty,title:"\u4FDD\u5B58\u5230\u5F53\u524D\u6D88\u606F\u7684 slot",onClick:QA});M._refs.saveBtn=i;let l=se({label:"\u4FDD\u5B58\u5230\u5168\u5C40",icon:"\u{1F310}",size:"small",title:"\u4FDD\u5B58\u5230\u5168\u5C40\u6FC0\u6D3B\u6A21\u677F\uFF08\u5F71\u54CD\u6240\u6709 chat \u540E\u7EED\u586B\u8868\uFF09",onClick:XA});M._refs.saveGlobalBtn=l;let d=se({label:"\u7ACB\u5373\u586B\u8868",icon:"\u25B6",variant:"primary",size:"small",onClick:ZA}),c=se({label:"AI \u6539\u8868\u52A9\u624B",icon:"\u2726",size:"small",variant:M._assistantOpen?"primary":"ghost",title:"\u7528\u81EA\u7136\u8BED\u8A00\u4FEE\u6539\u8868\u7ED3\u6784\u3001AI \u6307\u4EE4\u548C\u914D\u7F6E",onClick:VA});return o.appendChild(a.el),o.appendChild(i.el),o.appendChild(l.el),o.appendChild(d.el),o.appendChild(c.el),t.appendChild(e),t.appendChild(o),t}function FA(){let t=f("div",{className:"yyt-tde-sidebar"}),e=M.tempData||[];t.appendChild(f("div",{className:"yyt-tde-sidebar-label",text:`\u8868\u683C\u5217\u8868 (${e.length})`}));let r=f("div",{className:"yyt-tde-sheet-list"});return e.length===0?r.appendChild(f("div",{text:"\u6682\u65E0\u8868",style:{padding:"8px 10px",fontSize:"11px",color:"var(--tde-text-muted)"}})):e.forEach((n,s)=>{let o=s===M.currentTableIndex,a=n?.name||`\u8868 ${s+1}`,i=Array.isArray(n?.rows)?n.rows.length:0,l=f("div",{className:`yyt-tde-sheet-row${o?" active":""}`}),d=f("div",{className:"yyt-tde-sheet-pick"});d.appendChild(f("span",{className:"yyt-tde-sheet-idx",text:`[${s}]`})),d.appendChild(f("span",{className:"yyt-tde-sheet-name",text:a})),d.appendChild(f("span",{className:"yyt-tde-sheet-count",text:String(i)})),d.addEventListener("click",()=>{M.currentTableIndex!==s&&(M.currentTableIndex=s,Ve())}),l.appendChild(d);let c=f("div",{className:"yyt-tde-sheet-actions"});c.appendChild(se({label:"\u2191",size:"small",variant:"ghost",disabled:s===0,title:"\u4E0A\u79FB",onClick:()=>Fb(s,-1)}).el),c.appendChild(se({label:"\u2193",size:"small",variant:"ghost",disabled:s===e.length-1,title:"\u4E0B\u79FB",onClick:()=>Fb(s,1)}).el),c.appendChild(se({label:"\xD7",size:"small",variant:"danger",title:"\u5220\u9664\u6B64\u8868",onClick:()=>eC(s)}).el),l.appendChild(c),r.appendChild(l)}),t.appendChild(r),t.appendChild(se({label:"+ \u6DFB\u52A0\u65B0\u8868",size:"small",variant:"ghost",onClick:tC}).el),t}function UA(){let t=f("main",{className:"yyt-tde-main"}),e=M.tempData||[];if(M.mode==="global")return t.appendChild(HA()),t;if(e.length===0)return t.appendChild(f("div",{className:"yyt-tde-empty",html:'\u5F53\u524D slot \u6CA1\u6709\u8868\u6570\u636E\uFF0C\u6A21\u677F\u4E5F\u672A\u914D\u7F6E\u8868\u3002<br>\u8BF7\u5148\u5728\u5DE5\u4F5C\u53F0\u70B9"\u7ACB\u5373\u586B\u8868"\u8BA9 AI \u521D\u59CB\u5316\uFF0C\u6216\u5230\u300C\u9884\u8BBE\u7BA1\u7406 \u2192 \u8868\u683C\u6A21\u677F\u300D\u914D\u7F6E\u6A21\u677F\u3002'})),t;let r=ht();return r?(M.mode==="data"?t.appendChild(jA(r)):M.mode==="schema"&&t.appendChild(WA(r)),t):(t.appendChild(f("div",{className:"yyt-tde-empty",text:"\u8BF7\u4ECE\u5DE6\u4FA7\u9009\u62E9\u4E00\u5F20\u8868\u3002"})),t)}function jA(t){let e=f("div"),r=Array.isArray(t?.columns)?t.columns:[],n=Array.isArray(t?.rows)?t.rows:[],s=M.targetSnapshot?.chatId||"",o=t?.uid||t?.id||"",a={cols:{},rows:{},cells:{},indexCol:!1};try{a=mo({chatId:s,isolationKey:ye.getKey()},o)||a}catch{}let i=a?.rows||{},l=a?.cells||{};M.isFromTemplate&&e.appendChild(f("div",{className:"yyt-tde-schema-hint",html:'\u5F53\u524D\u663E\u793A<b>\u6A21\u677F\u9ED8\u8BA4\u7ED3\u6784</b>\uFF08slot \u5C1A\u65E0\u6570\u636E\uFF09\u3002\u76F4\u63A5\u6DFB\u52A0\u884C\u6216\u7F16\u8F91\u4F1A\u521B\u5EFA slot \u6570\u636E\uFF1B\u6216\u5DE5\u4F5C\u53F0\u70B9"\u7ACB\u5373\u586B\u8868"\u8BA9 AI \u586B\u3002'}));let d=f("div",{className:"yyt-tde-card-grid"});n.forEach((u,y)=>{let p=u?.cells||{},m=!!i[y],g=f("article",{className:`yyt-tde-card${m?" yyt-tde-row-locked":""}`}),h=f("header",{className:"yyt-tde-card-header"});h.appendChild(f("span",{className:"yyt-tde-card-index",text:`#${y+1}`}));let b=f("div",{className:"yyt-tde-card-name-slot"}),v=Te({value:u?.name||"",placeholder:"\u884C\u540D",disabled:m,onInput:E=>{let w=ht();w?.rows?.[y]&&(w.rows[y].name=E,Re())}});b.appendChild(v.el),h.appendChild(b);let x=f("div",{className:"yyt-tde-card-actions"});x.appendChild(se({label:m?"\u{1F512}":"\u{1F513}",size:"small",variant:m?"danger":"ghost",title:m?"\u5DF2\u9501\u5B9A\u6B64\u884C\uFF08\u70B9\u51FB\u89E3\u9501\uFF09":"\u9501\u5B9A\u6B64\u884C\uFF08AI \u4E0D\u4F1A\u6539\uFF09",onClick:()=>rC(o,y)}).el),x.appendChild(se({label:"\u{1F5D1}",size:"small",variant:"danger",disabled:m,title:"\u5220\u9664\u884C",onClick:()=>sC(y)}).el),h.appendChild(x),g.appendChild(h);let T=f("div",{className:"yyt-tde-card-body"});r.length===0?T.appendChild(f("div",{text:"\u8BE5\u8868\u6CA1\u6709\u5217\u5B9A\u4E49",style:{padding:"8px",color:"var(--tde-text-muted)",fontSize:"12px"}})):r.forEach(E=>{let w=E?.key||"",_=E?.title||w,A=p[w],I=A==null||A==="",P=I?"\uFF08\u7A7A\uFF09":String(A),C=!!l[`${y}::${w}`],N=f("div",{className:`yyt-tde-field${C?" yyt-tde-cell-locked":""}`}),W=f("div",{className:"yyt-tde-field-label"});W.appendChild(f("span",{text:_})),W.appendChild(se({label:C?"\u{1F512}":"\u{1F513}",size:"small",variant:C?"danger":"ghost",title:C?"\u5DF2\u9501\u5B9A\u6B64\u5355\u5143\u683C":"\u9501\u5B9A\u6B64\u5355\u5143\u683C\uFF08AI \u4E0D\u4F1A\u6539\uFF09",onClick:()=>nC(o,y,w)}).el),N.appendChild(W);let H=f("div",{className:`yyt-tde-field-cell${I?" yyt-tde-field-cell--empty":""}${C?" yyt-tde-cell-locked-bg":""}`,text:P,attrs:{contenteditable:C?"false":"true"}});H.addEventListener("input",()=>{let ee=ht();ee?.rows?.[y]&&(ee.rows[y].cells||(ee.rows[y].cells={}),ee.rows[y].cells[w]=H.textContent,Re())}),N.appendChild(H),T.appendChild(N)}),g.appendChild(T),d.appendChild(g)});let c=f("div",{className:"yyt-tde-card-add"});return c.appendChild(se({label:"+ \u6DFB\u52A0\u884C",variant:"ghost",onClick:oC}).el),d.appendChild(c),e.appendChild(d),e}function WA(t){let e=f("div"),r=Array.isArray(t?.columns)?t.columns:[],n=t?.sourceData||{},s=t?.aiInstructions||{},o=t?.updateConfig||{},a=M.targetSnapshot?.chatId||"",i=t?.uid||t?.id||"",l={cols:{},rows:{},cells:{},indexCol:!1};try{l=mo({chatId:a,isolationKey:ye.getKey()},i)||l}catch{}let d=l?.cols||{},c=f("div",{className:"yyt-tde-schema-section"});c.appendChild(f("div",{className:"yyt-tde-schema-heading",text:"\u57FA\u7840\u4FE1\u606F"}));let u=f("div",{className:"yyt-tde-schema-row"});u.appendChild(f("div",{className:"yyt-tde-schema-key",text:"\u8868\u540D"}));let y=f("div",{className:"yyt-tde-schema-value"});y.appendChild(Te({value:t?.name||"",onInput:A=>{let I=ht();I&&(I.name=A,Re())}}).el),u.appendChild(y),c.appendChild(u);let p=f("div",{className:"yyt-tde-schema-row"});p.appendChild(f("div",{className:"yyt-tde-schema-key",text:"UID"})),p.appendChild(f("code",{text:t?.uid||t?.id||"",style:{fontSize:"11px",color:"var(--tde-accent)"}})),c.appendChild(p);let m=f("div",{className:"yyt-tde-schema-row",style:{alignItems:"flex-start"}});m.appendChild(f("div",{className:"yyt-tde-schema-key",text:"\u8868\u8BF4\u660E"}));let g=f("div",{className:"yyt-tde-schema-value"});g.appendChild(Da({value:t?.note||n?.note||"",placeholder:"\u8868\u7528\u9014\u8BF4\u660E + \u5217\u6CE8\u91CA",onInput:A=>{let I=ht();I&&(I.note=A,Re())}})),m.appendChild(g),c.appendChild(m),e.appendChild(c);let h=f("div",{className:"yyt-tde-schema-section"});h.appendChild(f("div",{className:"yyt-tde-schema-heading",text:"AI \u64CD\u4F5C\u8BF4\u660E (sourceData)"}));let b=[{key:"init",label:"\u521D\u59CB\u5316 (init)",placeholder:"\u8868\u4E3A\u7A7A\u65F6 AI \u5E94\u8BE5\u63D2\u5165\u4EC0\u4E48",legacy:"initNode"},{key:"create",label:"\u65B0\u589E (insert)",placeholder:"\u4EC0\u4E48\u60C5\u51B5\u4E0B AI \u5E94\u8BE5\u65B0\u589E\u884C",legacy:"insertNode"},{key:"update",label:"\u66F4\u65B0 (update)",placeholder:"\u4EC0\u4E48\u60C5\u51B5\u4E0B AI \u5E94\u8BE5\u66F4\u65B0\u884C",legacy:"updateNode"},{key:"delete",label:"\u5220\u9664 (delete)",placeholder:"\u4EC0\u4E48\u60C5\u51B5\u4E0B AI \u5E94\u8BE5\u5220\u9664\u884C",legacy:"deleteNode"}];for(let A of b){let I=f("div",{className:"yyt-tde-schema-row",style:{alignItems:"flex-start"}});I.appendChild(f("div",{className:"yyt-tde-schema-key",text:A.label}));let P=f("div",{className:"yyt-tde-schema-value"});P.appendChild(Da({value:s?.[A.key]||n?.[A.legacy]||"",placeholder:A.placeholder,onInput:C=>{let N=ht();N&&(N.aiInstructions=N.aiInstructions||{},N.aiInstructions[A.key]=C,Re())}})),I.appendChild(P),h.appendChild(I)}e.appendChild(h);let v=f("div",{className:"yyt-tde-schema-section"});v.appendChild(f("div",{className:"yyt-tde-schema-heading",text:"\u66F4\u65B0\u914D\u7F6E (updateConfig)"})),v.appendChild(f("div",{className:"yyt-tde-hint",style:{marginBottom:"8px",fontSize:"11px",color:"var(--tde-text-muted)"},html:"<strong>\u8BF4\u660E</strong>\uFF1A\u8FD9\u91CC\u914D\u7F6E AI \u586B\u8868\u65F6\u8FD9\u5F20\u8868\u7684\u884C\u4E3A\uFF08\u9891\u7387\u3001\u4E0A\u4E0B\u6587\u6DF1\u5EA6\u3001token \u8282\u7701\uFF09\u3002\u8DDF\u300C\u4E16\u754C\u4E66\u6CE8\u5165\u300D\u662F\u4E24\u4EF6\u4E8B\uFF1A\u4E16\u754C\u4E66\u662F\u628A\u8868\u6570\u636E\u585E\u8FDB prompt \u7ED9\u4E3B AI \u770B\uFF08\u5408\u5E76\u6761\u76EE / \u72EC\u7ACB\u6761\u76EE\u5728<strong>\u5168\u5C40\u6CE8\u5165</strong> tab \u914D\uFF09\uFF0C\u8FD9\u91CC\u662F\u63A7\u5236<strong>\u586B\u8868\u65F6\u673A</strong>\uFF08\u591A\u4E45\u586B\u4E00\u6B21\u3001\u8DF3\u8FC7\u51E0\u5C42\u7B49\uFF09\u3002-1 = \u6CBF\u7528\u5168\u5C40\uFF0C0 = \u7981\u7528\u5355\u8868\u3002"}));let x=f("div",{className:"yyt-tde-uc-grid"}),T=[{key:"contextDepth",label:"\u4E0A\u4E0B\u6587\u6DF1\u5EA6 (contextDepth)",hint:"-1 = \u6CBF\u7528\u5168\u5C40\uFF0C0 = \u7981\u7528\uFF0CN = \u6700\u8FD1 N \u6761\u6D88\u606F"},{key:"updateFrequency",label:"\u66F4\u65B0\u9891\u7387 (updateFrequency)",hint:"-1 = \u6CBF\u7528\u5168\u5C40\uFF0C0 = \u7981\u7528\u81EA\u52A8\u586B\u8868\uFF0CN = \u6BCF N \u6761\u6D88\u606F\u89E6\u53D1\u4E00\u6B21"},{key:"batchSize",label:"\u6279\u6B21\u5927\u5C0F (batchSize)",hint:"-1 = \u6CBF\u7528\u5168\u5C40\uFF0CN = \u5355\u6B21\u6700\u591A\u5904\u7406 N \u5F20\u8868"},{key:"skipFloors",label:"\u8DF3\u8FC7\u697C\u5C42 (skipFloors)",hint:"-1 = \u6CBF\u7528\u5168\u5C40\uFF0CN = \u8DF3\u8FC7\u6700\u8FD1 N \u5C42"},{key:"sendLatestRows",label:"\u53D1\u9001\u6700\u65B0 N \u884C (sendLatestRows)",hint:"-1 = \u5168\u90E8\u53D1\u9001\uFF0C0 = \u6CBF\u7528\u5168\u5C40\uFF0CN = \u4EC5\u53D1\u9001\u6700\u65B0 N \u884C\uFF08\u5927\u8868 token \u8282\u7701\uFF09"}];for(let A of T){let I=f("div",{className:"yyt-tde-uc-cell"});I.appendChild(f("label",{text:A.label})),I.appendChild(Te({type:"number",value:Number.isFinite(o?.[A.key])?String(o[A.key]):"-1",onInput:P=>{let C=ht();if(!C)return;C.updateConfig=C.updateConfig||{};let N=Number(P);C.updateConfig[A.key]=Number.isFinite(N)?N:-1,Re()}}).el),I.appendChild(f("span",{className:"yyt-tde-hint",text:A.hint})),x.appendChild(I)}let E=f("div",{className:"yyt-tde-uc-cell"});E.appendChild(f("label",{text:"\u5206\u7EC4 ID (groupId)"})),E.appendChild(Te({value:o?.groupId||"",placeholder:"\u540C\u7EC4 ID \u7684\u8868\u4F1A\u5408\u5E76\u89E6\u53D1",onInput:A=>{let I=ht();I&&(I.updateConfig=I.updateConfig||{},I.updateConfig.groupId=A,Re())}}).el),E.appendChild(f("span",{className:"yyt-tde-hint",text:"\u540C\u7EC4\u540C\u65F6\u89E6\u53D1\uFF0C\u8DE8\u7EC4\u5E76\u884C\uFF08\u7559\u7A7A = \u72EC\u7ACB\u89E6\u53D1\uFF09"})),x.appendChild(E);let w=f("div",{className:"yyt-tde-uc-cell yyt-tde-uc-cell-wide"});w.appendChild(f("label",{text:"\u8868\u7EA7 API \u9884\u8BBE\u8986\u76D6"})),w.appendChild(Te({value:o?.apiPreset||"",placeholder:"\u7559\u7A7A = \u6CBF\u7528\u5168\u5C40\uFF0C\u586B\u9884\u8BBE\u540D = \u8FD9\u5F20\u8868\u7528\u8FD9\u4E2A",onInput:A=>{let I=ht();I&&(I.updateConfig=I.updateConfig||{},I.updateConfig.apiPreset=A,Re())}}).el),w.appendChild(f("span",{className:"yyt-tde-hint",text:"\u4F8B\uFF1A\u89D2\u8272\u8868\u7528 Claude\u3001\u7EAA\u8981\u8868\u7528 GPT"})),x.appendChild(w),v.appendChild(x),e.appendChild(v);let _=f("div",{className:"yyt-tde-schema-section"});return _.appendChild(f("div",{className:"yyt-tde-schema-heading",text:`\u5B57\u6BB5\u5B9A\u4E49 (${r.length})`})),r.length===0?_.appendChild(f("div",{text:"\u65E0\u5B57\u6BB5",style:{color:"var(--tde-text-muted)",fontSize:"12px",padding:"8px 0"}})):r.forEach((A,I)=>{let P=A?.key||"",C=P?!!d[P]:!1,N=f("div",{className:`yyt-tde-schema-field${C?" locked":""}`}),W=f("div",{className:"yyt-tde-schema-field-head"});W.appendChild(f("span",{className:"yyt-tde-schema-idx",text:`[${I}]`}));let H=f("div",{className:"yyt-tde-field-input-title"});H.appendChild(Te({value:A?.title||A?.key||"",placeholder:"\u5B57\u6BB5\u6807\u9898",onInput:J=>{let de=ht();de?.columns?.[I]&&(de.columns[I].title=J,Re())}}).el),W.appendChild(H);let ee=f("div",{className:"yyt-tde-field-input-key"}),te=Te({value:A?.key||"",placeholder:"key",style:{fontFamily:"monospace"},onInput:J=>{let de=ht();de?.columns?.[I]&&(de.columns[I].key=J,Re())}});ee.appendChild(te.el),W.appendChild(ee);let z=f("div",{className:"yyt-tde-field-input-type"});z.appendChild(Me({value:A?.type||"text",options:["text","number","boolean","date","json"].map(J=>({value:J,label:J})),onChange:J=>{let de=ht();de?.columns?.[I]&&(de.columns[I].type=J,Re())}}).el),W.appendChild(z),W.appendChild(se({label:C?"\u{1F512}":"\u{1F513}",size:"small",variant:C?"danger":"ghost",title:C?"\u5DF2\u9501\u5B9A\uFF1AAI \u4E0D\u4F1A\u6539\u8FD9\u5217\u3002\u70B9\u51FB\u89E3\u9501":"\u9501\u5B9A\u6B64\u5217\uFF1AAI \u6C38\u4E0D\u4FEE\u6539",onClick:()=>aC(i,P)}).el),W.appendChild(se({label:"\u{1F5D1}",size:"small",variant:"danger",title:"\u5220\u9664\u6B64\u5B57\u6BB5",onClick:()=>iC(I)}).el),N.appendChild(W),N.appendChild(Da({value:A?.description||"",placeholder:"\u5B57\u6BB5\u63CF\u8FF0",minHeight:"32px",onInput:J=>{let de=ht();de?.columns?.[I]&&(de.columns[I].description=J,Re())}})),_.appendChild(N)}),_.appendChild(se({label:"+ \u6DFB\u52A0\u5B57\u6BB5",variant:"ghost",onClick:lC}).el),e.appendChild(_),e}function HA(){let t=f("div"),e=Array.isArray(M.tempData)?M.tempData:[];if(t.appendChild(f("div",{className:"yyt-tde-schema-hint",style:{background:"rgba(74,158,255,0.08)",borderColor:"rgba(74,158,255,0.3)"},html:"<strong>\u5168\u5C40\u6CE8\u5165\u914D\u7F6E</strong> \u2014 Wrapper \u5305\u88F9\u914D\u7F6E\uFF08\u5305\u4F4F\u6240\u6709\u672A\u542F\u7528\u72EC\u7ACB\u6CE8\u5165\u7684\u8868\uFF09+ \u6BCF\u5F20\u8868\u7684 exportConfig\u3002"})),e.length===0)return t.appendChild(f("div",{className:"yyt-tde-empty",text:"\u65E0\u8868\u683C\u53EF\u914D\u7F6E\u3002\u8BF7\u5148\u6DFB\u52A0\u8868\u683C\u3002"})),t;let r="yyt-table-workbench";try{r=Ee()?.mirrorTag||r}catch{}let n=f("div",{className:"yyt-tde-schema-section"});n.appendChild(f("div",{className:"yyt-tde-schema-heading",text:"\u5199\u56DE\u6B63\u6587\u6807\u7B7E"}));let s=f("div",{className:"yyt-tde-uc-grid"}),o=f("div",{className:"yyt-tde-uc-cell yyt-tde-uc-cell-wide"});o.appendChild(f("label",{text:"mirrorTag"})),o.appendChild(Te({value:r,placeholder:"\u9ED8\u8BA4: yyt-table-workbench",onInput:T=>{M._pendingMirrorTag=T,Re()}}).el),o.appendChild(f("span",{className:"yyt-tde-hint",text:"\u5F00\u542F\u5199\u56DE\u6B63\u6587\u65F6\uFF0C\u7528\u6B64 XML \u6807\u7B7E\u5305\u88F9\u8868\u683C\u6570\u636E\u6CE8\u5165\u5230 assistant \u6D88\u606F"})),s.appendChild(o),n.appendChild(s),t.appendChild(n);let a={enabled:!0,wrapperTag:"\u6700\u65B0\u6570\u636E\u4E0E\u8BB0\u5F55",wrapperHint:"",wrapperPlacement:{position:"before_character_definition",depth:2,order:0}};try{let T=Ee();if(T?.wrapperConfig){let E=T.wrapperConfig;a={enabled:E.enabled!==!1,wrapperTag:E.wrapperTag||a.wrapperTag,wrapperHint:E.wrapperHint??a.wrapperHint,wrapperPlacement:{...E.wrapperPlacement||a.wrapperPlacement}}}}catch{}M._pendingWrapperConfig||(M._pendingWrapperConfig={...a,wrapperPlacement:{...a.wrapperPlacement}});let i=f("div",{className:"yyt-tde-schema-section"}),l=f("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"10px"}});l.appendChild(f("div",{className:"yyt-tde-schema-heading",style:{marginBottom:"0"},text:"Wrapper \u5305\u88F9\u914D\u7F6E"})),l.appendChild(Ze({label:"\u542F\u7528",checked:M._pendingWrapperConfig.enabled!==!1,style:{padding:"0",border:"none",background:"none"},onChange:T=>{M._pendingWrapperConfig.enabled=T,Re(),Ve()}}).el),i.appendChild(l);let d=M._pendingWrapperConfig.enabled!==!1,c=f("div",{className:d?"":"yyt-tde-disabled-section"}),u=f("div",{className:"yyt-tde-schema-row"});u.appendChild(f("div",{className:"yyt-tde-schema-key",text:"\u6807\u7B7E\u540D"}));let y=f("div",{className:"yyt-tde-schema-value"});y.appendChild(Te({value:M._pendingWrapperConfig.wrapperTag||"",placeholder:"\u9ED8\u8BA4: \u6700\u65B0\u6570\u636E\u4E0E\u8BB0\u5F55",onInput:T=>{M._pendingWrapperConfig.wrapperTag=T,Re()}}).el),u.appendChild(y),c.appendChild(u);let p=f("div",{className:"yyt-tde-schema-row",style:{alignItems:"flex-start"}});p.appendChild(f("div",{className:"yyt-tde-schema-key",text:"\u63D0\u793A\u6587"}));let m=f("div",{className:"yyt-tde-schema-value"});m.appendChild(Da({value:M._pendingWrapperConfig.wrapperHint||"",placeholder:"\u53EF\u9009\uFF0C\u6CE8\u5165\u5728 wrapper \u5F00\u59CB\u6807\u7B7E\u4E4B\u540E",onInput:T=>{M._pendingWrapperConfig.wrapperHint=T,Re()}})),p.appendChild(m),c.appendChild(p);let g=M._pendingWrapperConfig.wrapperPlacement||{},h=f("div",{className:"yyt-tde-schema-row"});h.appendChild(f("div",{className:"yyt-tde-schema-key",text:"\u6CE8\u5165\u4F4D\u7F6E"}));let b=f("div",{className:"yyt-tde-schema-value"});b.appendChild(Me({value:g.position||"before_character_definition",options:[{value:"before_character_definition",label:"\u89D2\u8272\u5B9A\u4E49\u4E4B\u524D"},{value:"after_character_definition",label:"\u89D2\u8272\u5B9A\u4E49\u4E4B\u540E"},{value:"before_authors_note",label:"\u4F5C\u8005\u6CE8\u91CA\u4E4B\u524D"},{value:"after_authors_note",label:"\u4F5C\u8005\u6CE8\u91CA\u4E4B\u540E"}],onChange:T=>{M._pendingWrapperConfig.wrapperPlacement||(M._pendingWrapperConfig.wrapperPlacement={}),M._pendingWrapperConfig.wrapperPlacement.position=T,Re()}}).el),h.appendChild(b),c.appendChild(h);let v=f("div",{className:"yyt-tde-schema-row"});v.appendChild(f("div",{className:"yyt-tde-schema-key",text:"\u6DF1\u5EA6 / \u987A\u5E8F"}));let x=f("div",{className:"yyt-tde-schema-value",style:{display:"flex",gap:"12px",alignItems:"center"}});return x.appendChild(f("label",{text:"\u6DF1\u5EA6",style:{fontSize:"11px",color:"var(--tde-text-secondary)",fontWeight:"600",whiteSpace:"nowrap"}})),x.appendChild(Te({type:"number",value:String(g.depth??2),style:{width:"56px"},onInput:T=>{M._pendingWrapperConfig.wrapperPlacement||(M._pendingWrapperConfig.wrapperPlacement={}),M._pendingWrapperConfig.wrapperPlacement.depth=Number(T)||0,Re()}}).el),x.appendChild(f("label",{text:"\u987A\u5E8F",style:{fontSize:"11px",color:"var(--tde-text-secondary)",fontWeight:"600",whiteSpace:"nowrap",marginLeft:"4px"}})),x.appendChild(Te({type:"number",value:String(g.order??0),style:{width:"56px"},onInput:T=>{M._pendingWrapperConfig.wrapperPlacement||(M._pendingWrapperConfig.wrapperPlacement={}),M._pendingWrapperConfig.wrapperPlacement.order=Number(T)||0,Re()}}).el),v.appendChild(x),c.appendChild(v),i.appendChild(c),t.appendChild(i),e.forEach((T,E)=>{t.appendChild(qA(T,E))}),t}function qA(t,e){let r=t?.exportConfig||{},n=r.entryPlacement||{},s=r.extraIndexPlacement||{},o=r.enabled===!0,a=f("div",{className:"yyt-tde-global-card"}),i=f("div",{className:"yyt-tde-global-card-head"});i.appendChild(f("span",{className:"yyt-tde-global-card-name",text:t?.name||`\u8868 ${e+1}`}));let l=Ze({label:"\u542F\u7528\u72EC\u7ACB\u6CE8\u5165",checked:o,onChange:y=>{let p=M.tempData?.[e];p&&(p.exportConfig=p.exportConfig||{},p.exportConfig.enabled=y,Re(),Ve())}});i.appendChild(l.el),a.appendChild(i);let d=f("div",{className:`yyt-tde-global-card-body${o?"":" yyt-tde-disabled-section"}`}),c=f("div",{className:"yyt-tde-uc-grid"});c.appendChild(In({label:"\u6761\u76EE\u540D (entryName)",control:Te({value:r.entryName||t?.name||"",onInput:y=>So(e,"entryName",y)})})),c.appendChild(In({label:"\u6761\u76EE\u7C7B\u578B (entryType)",control:Me({value:r.entryType||"constant",options:[{value:"constant",label:"constant (\u5E38\u9A7B)"},{value:"keyword",label:"keyword (\u5173\u952E\u8BCD\u89E6\u53D1)"}],onChange:y=>So(e,"entryType",y)})})),c.appendChild(In({label:"\u89E6\u53D1\u5173\u952E\u8BCD (keywords)",wide:!0,control:Te({value:r.keywords||"",placeholder:"\u7528\u9017\u53F7\u6216\u6362\u884C\u5206\u9694",onInput:y=>So(e,"keywords",y)})})),c.appendChild(In({label:"\u6309\u884C\u62C6\u5206 (splitByRow)",control:Me({value:r.splitByRow?"true":"false",options:[{value:"false",label:"\u5426\uFF08\u6574\u5F20\u8868\u4E00\u4E2A\u6761\u76EE\uFF09"},{value:"true",label:"\u662F\uFF08\u6BCF\u884C\u4E00\u4E2A\u6761\u76EE\uFF09"}],onChange:y=>So(e,"splitByRow",y==="true")})})),c.appendChild(In({label:"\u9632\u9012\u5F52 (preventRecursion)",hint:"\u9632\u6B62\u4E16\u754C\u4E66\u6761\u76EE\u4E4B\u95F4\u4E92\u76F8\u89E6\u53D1\u6CE8\u5165\uFF08\u63A8\u8350\u4FDD\u6301\u5F00\u542F\uFF09",control:Me({value:r.preventRecursion===!1?"false":"true",options:[{value:"true",label:"\u662F"},{value:"false",label:"\u5426"}],onChange:y=>So(e,"preventRecursion",y!=="false")})}));let u=f("div",{className:"yyt-tde-uc-cell yyt-tde-uc-cell-wide"});return u.appendChild(f("label",{text:"\u6CE8\u5165\u6A21\u677F (injectionTemplate)"})),u.appendChild(Da({value:r.injectionTemplate||"",placeholder:"\u4F8B\uFF1A\u4EE5\u4E0B\u662F {{tableName}} \u7684\u6700\u65B0\u6570\u636E\uFF1A{{tableContent}}",onInput:y=>So(e,"injectionTemplate",y)})),c.appendChild(u),d.appendChild(c),d.appendChild(f("div",{className:"yyt-tde-schema-heading",style:{marginTop:"12px"},text:"\u6761\u76EE\u4F4D\u7F6E (entryPlacement)"})),d.appendChild(Kb(e,"entryPlacement",n)),d.appendChild(f("div",{className:"yyt-tde-schema-heading",style:{marginTop:"12px"},text:"\u989D\u5916\u7D22\u5F15\u4F4D\u7F6E (extraIndexPlacement\uFF0C\u53EF\u9009)"})),d.appendChild(Kb(e,"extraIndexPlacement",s)),a.appendChild(d),a}function Kb(t,e,r){let n=f("div",{className:"yyt-tde-uc-grid"}),s=["before_character_definition","after_character_definition","before_authors_note","after_authors_note"];return n.appendChild(In({label:"position",control:Me({value:r.position||"before_character_definition",options:s.map(o=>({value:o,label:o})),onChange:o=>Qu(t,e,"position",o)})})),n.appendChild(In({label:"depth",control:Te({type:"number",value:Number.isFinite(r.depth)?String(r.depth):"2",onInput:o=>Qu(t,e,"depth",Number(o)||0)})})),n.appendChild(In({label:"order",control:Te({type:"number",value:Number.isFinite(r.order)?String(r.order):"0",onInput:o=>Qu(t,e,"order",Number(o)||0)})})),n}function In({label:t,control:e,wide:r=!1,hint:n=null}){let s=f("div",{className:`yyt-tde-uc-cell${r?" yyt-tde-uc-cell-wide":""}`});return s.appendChild(f("label",{text:t})),s.appendChild(e.el),n&&s.appendChild(f("span",{className:"yyt-tde-hint",text:n})),s}function Da({value:t="",placeholder:e="",minHeight:r="60px",onInput:n=null}={}){let s=f("textarea",{className:"yyt-textarea",attrs:{placeholder:e},style:{minHeight:r}});return s.value=t,typeof n=="function"&&s.addEventListener("input",()=>n(s.value)),s}function So(t,e,r){let n=M.tempData?.[t];n&&(n.exportConfig=n.exportConfig||{},n.exportConfig[e]=r,Re())}function Qu(t,e,r,n){let s=M.tempData?.[t];s&&(s.exportConfig=s.exportConfig||{},s.exportConfig[e]=s.exportConfig[e]||{},s.exportConfig[e][r]=n,Re())}function GA(){let t=f("div",{className:"yyt-tde"});t.appendChild(KA());let e=f("div",{className:"yyt-tde-content"});M.mode!=="global"&&e.appendChild(FA()),e.appendChild(UA());let r=f("div",{attrs:{id:"yyt-assistant-host"},className:"yyt-assistant-dock"});return r.style.display=M._assistantOpen?"flex":"none",e.appendChild(r),t.appendChild(e),t}function Ve(){if(!M.$window)return;let t=M.$window.find(".yyt-window-body");if(!t||!t.length)return;let e=t[0],r=e.querySelector(".yyt-tde-main"),n=e.querySelector(".yyt-tde-sidebar"),s=r?r.scrollTop:0,o=n?n.scrollTop:0;e.innerHTML="",e.appendChild(GA());let a=e.querySelector(".yyt-tde-main"),i=e.querySelector(".yyt-tde-sidebar");if(a&&(a.scrollTop=s),i&&(i.scrollTop=o),YA(),M._assistantOpen){let l=e.querySelector(".yyt-tde-content"),d=l?.querySelector("#yyt-assistant-host");l&&d&&(d.style.display="flex",Db(()=>Ve(),l,()=>{M._assistantOpen=!1,Ve()}))}}function YA(){let t=M.$window?.[0]?.ownerDocument||document;if(!t)return;let e=t.getElementById("yyt-assistant-styles");e||(e=t.createElement("style"),e.id="yyt-assistant-styles",(t.head||t.documentElement).appendChild(e)),e.textContent=Bb()}function VA(){try{M._assistantOpen=!M._assistantOpen,Ve()}catch(t){ie().error("toggleAssistant \u5F02\u5E38",t)}}function JA(){if(M.isDirty&&!window.confirm("\u6709\u672A\u4FDD\u5B58\u4FEE\u6539\uFF0C\u91CD\u65B0\u52A0\u8F7D\u5C06\u4E22\u5F03\uFF0C\u786E\u5B9A\uFF1F"))return;let t=M.tempData?.[0];ie().info("reload \u89E6\u53D1",{before:{tableCount:M.tempData?.length,firstName:t?.name,firstAiInit:t?.aiInstructions?.init?.slice(0,50),firstUcFreq:t?.updateConfig?.updateFrequency},targetSnapshot:{messageId:M.targetSnapshot?.sourceMessageId,isFromTemplate:M.isFromTemplate}}),Xu();let e=M.tempData?.[0];ie().info("reload \u5B8C\u6210",{after:{tableCount:M.tempData?.length,firstName:e?.name,firstAiInit:e?.aiInstructions?.init?.slice(0,50),firstUcFreq:e?.updateConfig?.updateFrequency,isFromTemplate:M.isFromTemplate}}),Ve(),ie().info("\u5DF2\u91CD\u65B0\u52A0\u8F7D",null,{toast:"success"})}async function QA(){if(!M.isDirty){ie().info("\u6CA1\u6709\u4FEE\u6539",null,{toast:!0});return}try{let t=M.targetSnapshot;if(t?.sourceMessageId||(t=await Ta()),!t?.sourceMessageId){ie().error("\u65E0\u6CD5\u5B9A\u4F4D\u5F53\u524D\u6D88\u606F\uFF08\u627E\u4E0D\u5230 assistant \u6D88\u606F\uFF09",null,{toast:!0});return}let e=await fo(t,{tables:fe(M.tempData)||[],meta:{source:"data-editor-manual-save"}},{skipFreshValidation:!0});ie().info("save-chat commitBoundState \u7ED3\u679C",{success:e?.success,error:e?.error,commitMessageId:e?.sourceMessageId,commitSlotRevisionKey:e?.slotRevisionKey,stateTablesLen:Array.isArray(e?.state?.tables)?e.state.tables.length:null,firstTableInState:e?.state?.tables?.[0]?.name,firstAiInitInState:e?.state?.tables?.[0]?.aiInstructions?.init?.slice(0,50)}),e?.success?(Ub(),M.targetSnapshot={chatId:e.state?.chatId||t.chatId,sourceMessageId:e.sourceMessageId,sourceSwipeId:e.state?.sourceSwipeId||t.sourceSwipeId,effectiveSwipeId:t.effectiveSwipeId,slotBindingKey:e.state?.slotBindingKey||t.slotBindingKey,slotRevisionKey:e.slotRevisionKey,slotTransactionId:t.slotTransactionId,traceId:t.traceId,targetMessageIndex:e.messageIndex??t.targetMessageIndex},Array.isArray(e?.state?.tables)&&(M.tempData=fe(e.state.tables)||[],M.isFromTemplate=!1),M._afterSaveGlobalAt=0,ie().info("\u5DF2\u4FDD\u5B58\u5230 chat",null,{toast:"success"}),Ve()):ie().error(`\u4FDD\u5B58\u5931\u8D25\uFF1A${e?.error||"\u672A\u77E5"}`,null,{toast:!0})}catch(t){ie().error("\u4FDD\u5B58\u5F02\u5E38",t),ie().error(`\u4FDD\u5B58\u5F02\u5E38\uFF1A${t?.message||t}`,null,{toast:!0})}}async function XA(){if(!Array.isArray(M.tempData)||M.tempData.length===0){ie().info("\u6CA1\u6709\u53EF\u4FDD\u5B58\u7684\u6570\u636E",null,{toast:!0});return}if(window.confirm("\u4FDD\u5B58\u5230\u300C\u5168\u5C40\u6FC0\u6D3B\u6A21\u677F\u300D\u4F1A\u5F71\u54CD\u540E\u7EED\u6240\u6709 chat \u7684\u65B0\u586B\u8868\uFF08\u5DF2\u6709 slot \u6570\u636E\u4E0D\u53D7\u5F71\u54CD\uFF09\u3002\u7EE7\u7EED\uFF1F"))try{let t=wn();if(!t?.id){ie().error("\u6CA1\u6709\u53EF\u7528\u7684\u5168\u5C40\u6FC0\u6D3B\u6A21\u677F",null,{toast:!0});return}let e=(M.tempData||[]).map(n=>({id:n?.id||n?.uid,name:n?.name||"",note:n?.note||"",enabled:n?.enabled!==!1,aiInstructions:n?.aiInstructions||{},updateConfig:n?.updateConfig||{},exportConfig:n?.exportConfig||{},columns:Array.isArray(n?.columns)?fe(n.columns):[],rows:[]})),r=gn({...t,tables:e});if(r?.success){let n=typeof M._pendingMirrorTag=="string"&&M._pendingMirrorTag.trim(),s=!!M._pendingWrapperConfig;if(n||s)try{let a={...Ee()};n&&(a.mirrorTag=M._pendingMirrorTag.trim()),s&&(a.wrapperConfig=M._pendingWrapperConfig),ot(a)}catch(o){ie().warn("\u4FDD\u5B58 workbench config \u5931\u8D25",o)}M._pendingMirrorTag=null,M._pendingWrapperConfig=null,Ub(),Array.isArray(r?.template?.tables)&&(M.tempData=fe(r.template.tables)||[],M.isFromTemplate=!0,M._afterSaveGlobalAt=Date.now()),ie().info(`\u5DF2\u4FDD\u5B58\u5230\u5168\u5C40\u6A21\u677F\u300C${t.name}\u300D`,null,{toast:"success"}),ie().info("\u4FDD\u5B58\u5230\u5168\u5C40\u6A21\u677F\u6210\u529F",{templateId:t.id,name:t.name,tableCount:e.length}),Ve()}else ie().error(`\u4FDD\u5B58\u5931\u8D25\uFF1A${r?.error||"\u672A\u77E5"}`,null,{toast:!0})}catch(t){ie().error("\u4FDD\u5B58\u5230\u5168\u5C40\u6A21\u677F\u5F02\u5E38",t),ie().error(`\u4FDD\u5B58\u5F02\u5E38\uFF1A${t?.message||t}`,null,{toast:!0})}}async function ZA(){if(!(M.isDirty&&!window.confirm("\u6709\u672A\u4FDD\u5B58\u4FEE\u6539\uFF0C\u7ACB\u5373\u586B\u8868\u4F1A\u5148\u4E22\u5F03\u8FD9\u4E9B\u4FEE\u6539\uFF0C\u786E\u5B9A\uFF1F")))try{let t=await $a();t?.success?(ie().info("\u586B\u8868\u5B8C\u6210",null,{toast:"success"}),Xu(),Ve()):ie().error(`\u586B\u8868\u5931\u8D25\uFF1A${t?.error||"\u672A\u77E5"}`,null,{toast:!0})}catch(t){ie().error("\u7ACB\u5373\u586B\u8868\u5F02\u5E38",t),ie().error(`\u5F02\u5E38\uFF1A${t?.message||t}`,null,{toast:!0})}}function Fb(t,e){if(!Array.isArray(M.tempData))return;let r=M.tempData,n=t+e;n<0||n>=r.length||([r[t],r[n]]=[r[n],r[t]],M.currentTableIndex===t?M.currentTableIndex=n:M.currentTableIndex===n&&(M.currentTableIndex=t),Re(),Ve())}function eC(t){if(!Array.isArray(M.tempData)||!M.tempData[t])return;let e=M.tempData[t];window.confirm(`\u5220\u9664\u8868\u300C${e.name||`\u8868 ${t+1}`}\u300D\uFF1F\u6B64\u64CD\u4F5C\u4E0D\u53EF\u64A4\u9500\u3002`)&&(M.tempData.splice(t,1),M.currentTableIndex>=M.tempData.length&&(M.currentTableIndex=Math.max(0,M.tempData.length-1)),Re(),Ve())}function tC(){let t=window.prompt("\u65B0\u8868\u540D\uFF1A",`\u8868 ${(M.tempData?.length||0)+1}`);if(!t||!t.trim())return;M.tempData=Array.isArray(M.tempData)?M.tempData:[];let e=new Set(M.tempData.map(s=>s?.id).filter(Boolean)),r=M.tempData.length+1,n=`sheet_${Date.now().toString(36)}_${r}`;for(;e.has(n);)r++,n=`sheet_${Date.now().toString(36)}_${r}`;M.tempData.push({id:n,name:t.trim(),enabled:!0,note:"",aiInstructions:{init:"",create:"",update:"",delete:""},updateConfig:{},exportConfig:{enabled:!1},columns:[{key:"col_1",title:"\u5B57\u6BB51",description:"",type:"text",required:!1}],rows:[]}),M.currentTableIndex=M.tempData.length-1,Re(),Ve()}function rC(t,e){if(!(!t||!Number.isFinite(e)))try{let r={chatId:M.targetSnapshot?.chatId||"",isolationKey:ye.getKey()},n=mo(r,t)||{rows:{}},s=!!(n.rows&&n.rows[e]);Sl(r,t,e,!s),ie().info(s?`\u5DF2\u89E3\u9501\u884C #${e+1}`:`\u5DF2\u9501\u5B9A\u884C #${e+1}\uFF08AI \u4E0D\u4F1A\u6539\u8FD9\u884C\uFF09`,null,{toast:"success"}),ie().info("row-lock toggled",{sheetUid:t,rowIndex:e,locked:!s}),Ve()}catch(r){ie().error("row-lock \u5F02\u5E38",r),ie().error(`\u9501\u5B9A\u5931\u8D25\uFF1A${r?.message||r}`,null,{toast:!0})}}function nC(t,e,r){if(!(!t||!Number.isFinite(e)||!r))try{let n={chatId:M.targetSnapshot?.chatId||"",isolationKey:ye.getKey()},s=mo(n,t)||{cells:{}},o=`${e}::${r}`,a=!!(s.cells&&s.cells[o]);_l(n,t,e,r,!a),ie().info(a?`\u5DF2\u89E3\u9501 [${e}][${r}]`:`\u5DF2\u9501\u5B9A [${e}][${r}]`,null,{toast:"success"}),ie().info("cell-lock toggled",{sheetUid:t,rowIndex:e,colKey:r,locked:!a}),Ve()}catch(n){ie().error("cell-lock \u5F02\u5E38",n),ie().error(`\u9501\u5B9A\u5931\u8D25\uFF1A${n?.message||n}`,null,{toast:!0})}}function sC(t){if(!Number.isFinite(t)||!window.confirm(`\u786E\u5B9A\u5220\u9664\u7B2C ${t+1} \u884C\uFF1F`))return;let e=ht();e?.rows&&(e.rows.splice(t,1),Re(),Ve())}function oC(){let t=ht();t&&(Array.isArray(t.rows)||(t.rows=[]),t.rows.push({id:Kr("row"),name:"",cells:{}}),Re(),Ve())}function aC(t,e){if(!t||!e){ie().error("\u5217\u9501\u5B9A\u5931\u8D25\uFF1A\u7F3A\u5C11 sheetUid \u6216 colKey",null,{toast:!0});return}try{let n={chatId:M.targetSnapshot?.chatId||"",isolationKey:ye.getKey()},s=mo(n,t)||{cols:{}},o=!!(s.cols&&s.cols[e]);Tl(n,t,e,!o),ie().info(o?`\u5DF2\u89E3\u9501 ${e}`:`\u5DF2\u9501\u5B9A ${e}\uFF08AI \u4E0D\u4F1A\u6539\u8FD9\u5217\uFF09`,null,{toast:"success"}),ie().info("field-lock toggled",{sheetUid:t,colKey:e,locked:!o}),Ve()}catch(r){ie().error("field-lock \u5F02\u5E38",r),ie().error(`\u9501\u5B9A\u5931\u8D25\uFF1A${r?.message||r}`,null,{toast:!0})}}function iC(t){let e=ht();e?.columns?.[t]&&window.confirm(`\u5220\u9664\u5B57\u6BB5\u300C${e.columns[t].title||e.columns[t].key}\u300D\uFF1F\u6B64\u64CD\u4F5C\u4E0D\u4F1A\u81EA\u52A8\u6E05\u7406\u884C\u6570\u636E\u3002`)&&(e.columns.splice(t,1),Re(),Ve())}function lC(){let t=ht();if(!t)return;t.columns=Array.isArray(t.columns)?t.columns:[];let e=new Set(t.columns.map(n=>n?.key).filter(Boolean)),r=t.columns.length+1;for(;e.has(`col_${r}`);)r++;t.columns.push({key:`col_${r}`,title:`\u5B57\u6BB5${r}`,description:"",type:"text",required:!1}),Re(),Ve()}function Zu(t={}){if(ie().info("openTableDataEditor \u8C03\u7528",{options:t}),zA(),!(window.jQuery||window.parent?.jQuery)){let n="jQuery \u4E0D\u53EF\u7528\uFF08window.jQuery \u548C window.parent.jQuery \u90FD\u662F undefined\uFF09";ie().error(n);try{ie().error(`\u6570\u636E\u7F16\u8F91\u5668\u6253\u5F00\u5931\u8D25\uFF1A${n}`,null,{toast:!0})}catch{}return null}try{let n=Et.getState(Yu);if(n){let s=Number(n.width),o=Number(n.height),a=Number.isFinite(s)&&s<800||Number.isFinite(o)&&o<500;(n.isMaximized||a)&&(ie().info("\u68C0\u6D4B\u5230\u4E0D\u5408\u7406 saved state\uFF0C\u91CD\u7F6E\u4E3A\u9ED8\u8BA4\u5C3A\u5BF8",{isMaximized:n.isMaximized,savedW:s,savedH:o}),Et.saveState(Yu,{width:1200,height:800,isMaximized:!1,x:void 0,y:void 0}))}}catch(n){ie().warn("saved state sanity check \u5F02\u5E38",n)}if(M.$window&&M.$window.length&&er().body.contains(M.$window[0])){if(t.focusTableUid){let s=(M.tempData||[]).findIndex(o=>(o?.uid||o?.id)===t.focusTableUid);s>=0&&(M.currentTableIndex=s)}return t.focusMode&&["data","schema","global"].includes(t.focusMode)&&(M.mode=t.focusMode),t.openAssistant&&!M._assistantOpen&&(M._assistantOpen=!0),Ve(),M.$window}if(Xu(),t.focusTableUid){let s=(M.tempData||[]).findIndex(o=>(o?.uid||o?.id)===t.focusTableUid);s>=0&&(M.currentTableIndex=s)}t.focusMode&&["data","schema","global"].includes(t.focusMode)&&(M.mode=t.focusMode),t.openAssistant&&(M._assistantOpen=!0);let r;try{r=Mu({id:Yu,title:"\u586B\u8868\u6570\u636E\u7F16\u8F91\u5668",content:'<div class="yyt-tde-placeholder"></div>',width:1200,height:800,modal:!1,resizable:!0,maximizable:!0,rememberState:!0,onReady:n=>{M.$window=n,Ve()},onClose:()=>{M.isDirty&&ie().warn("\u6570\u636E\u7F16\u8F91\u5668\u5173\u95ED\u65F6\u6709\u672A\u4FDD\u5B58\u4FEE\u6539"),M.$window=null,M._assistantOpen=!1,M._refs={saveBtn:null,saveGlobalBtn:null,dirtyBadge:null}}})}catch(n){ie().error("createWindow \u629B\u9519",n);try{ie().error(`\u521B\u5EFA\u7A97\u53E3\u5931\u8D25\uFF1A${n?.message||n}`,null,{toast:!0})}catch{}return null}return r}var Yu,Vu,M,BA,Ju,jb=O(()=>{Pu();pt();Z();ms();_a();kl();Gs();sr();We();Ur();El();It();zb();Yu="yyt-table-data-editor";M={$window:null,mode:"data",tempData:null,currentTableIndex:-1,isDirty:!1,isFromTemplate:!1,_pendingMirrorTag:null,_pendingWrapperConfig:null,targetSnapshot:null,_afterSaveGlobalAt:0,_assistantOpen:!1,_refs:{saveBtn:null,saveGlobalBtn:null,dirtyBadge:null}};BA=`
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

/* assistant dock */
.yyt-assistant-dock {
  flex: 0 0 400px;
  display: none;
  flex-direction: column;
  border-left: 1px solid var(--tde-hairline-strong);
  background: var(--tde-surface-1);
  overflow: hidden;
}
.yyt-assistant-dock .yyt-assistant-panel {
  display: flex; flex-direction: column;
  height: 100%; border: none; border-radius: 0;
}
.yyt-assistant-dock .yyt-assistant-chat {
  flex: 1; min-height: 0; max-height: none;
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
`,Ju=!1});function F(){return ep||(ep=$.createScope("TableWorkbenchView")),ep}async function cC(){try{let t=await ca();if(!t)return Ft.kind=null,Ft.lastError="Provider \u4E0D\u53EF\u7528",Ft;if(Ft.kind=t.kind,typeof t.query=="function"){let e=await t.query({statement:"SELECT COUNT(*) as c FROM table_sheets"}),r=await t.query({statement:"SELECT COUNT(*) as c FROM table_rows"});Ft.sheetCount=e?.rows?.[0]?.c??0,Ft.rowCount=r?.rows?.[0]?.c??0}Ft.lastError=null,Ft.lastRefreshAt=Date.now(),F().info("Provider stats \u5DF2\u5237\u65B0",{...Ft})}catch(t){Ft.lastError=t?.message||String(t),F().warn("Provider stats \u5237\u65B0\u5931\u8D25",t)}return Ft}function dC(){if(!Ft.kind){let t=Xs();t?.kind&&(Ft.kind=t.kind)}return Ft}function Se(t){return String(t??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Hb(t){if(!Number.isFinite(t)||t<=0)return"\u4ECE\u672A";let e=Date.now()-t;if(e<6e4)return`${Math.floor(e/1e3)} \u79D2\u524D`;if(e<36e5)return`${Math.floor(e/6e4)} \u5206\u949F\u524D`;if(e<864e5)return`${Math.floor(e/36e5)} \u5C0F\u65F6\u524D`;try{return new Date(t).toLocaleString()}catch{return"\u672A\u77E5"}}function Gb(t){let{config:e,activeTemplate:r,isolationKey:n,tablesPreview:s,templateArchives:o=[],providerStats:a={}}=t,i=e?.runtime||{},l=i.lastStatus==="success"?"\u2713 \u4E0A\u6B21\u6210\u529F":i.lastStatus==="failed"?"\u2717 \u4E0A\u6B21\u5931\u8D25":i.lastStatus==="running"?"\u8FD0\u884C\u4E2D":"\u5F85\u547D",d=i.lastStatus==="success"?"success":i.lastStatus==="failed"?"error":"muted",c=e?.automation?.enabled?"\u81EA\u52A8":"\u624B\u52A8",u=e?.apiPreset||"\u8DDF\u968F\u4E3B API",y=e?.bypassPresetId?"\u5DF2\u7ED1\u5B9A":"\u65E0",p=Array.isArray(o)?o.length:0;return`
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
          ${r?.mode&&r.mode!==st.INHERIT_GLOBAL?`<button class="yyt-tww-btn yyt-tww-btn-small" data-action="reset-template-scope" title="\u672C chat \u5F53\u524D\u662F\u300C${r.mode===st.CHAT_OVERRIDE?"chat \u4E13\u5C5E":"\u94FE\u63A5\u9884\u8BBE"}\u300D\u6A21\u5F0F\uFF0C\u70B9\u51FB\u6062\u590D\u4E3A\u300C\u7EE7\u627F\u5168\u5C40\u300D"><i class="fa-solid fa-rotate-right"></i> \u6062\u590D\u7EE7\u627F</button>`:""}
          <button class="yyt-tww-btn yyt-tww-btn-small yyt-tww-btn-danger" data-action="reset-chat-data" title="\u6E05\u7A7A\u5F53\u524D\u804A\u5929\u6240\u6709\u697C\u5C42\u7684\u8868\u683C\u6570\u636E\uFF0C\u8BA9\u6A21\u677F\u5207\u6362\u540E\u4ECE\u5934\u5F00\u59CB"><i class="fa-solid fa-trash-can"></i> \u6E05\u7A7A chat \u6570\u636E</button>
        </div>
      </div>
      <div class="yyt-tww-hero-desc">\u4ECE\u5BF9\u8BDD\u5185\u5BB9\u63D0\u53D6\u7ED3\u6784\u5316\u6570\u636E\uFF0C\u81EA\u52A8\u7EF4\u62A4\u8868\u683C\u72B6\u6001\u3002</div>
      <div class="yyt-tww-hero-chips">
        <span class="yyt-tww-chip mode">\u6A21\u5F0F ${Se(c)}</span>
        <span class="yyt-tww-chip preset">\u6A21\u677F: ${Se(r?.template?.name||"\u9ED8\u8BA4")}</span>
        ${(()=>{let m=r?.mode;if(m===st.CHAT_OVERRIDE)return'<span class="yyt-tww-chip preset" title="\u672C chat \u7528\u4E86\u72EC\u7ACB\u6A21\u677F\u526F\u672C\uFF08\u4FEE\u6539\u4E0D\u5F71\u54CD\u5168\u5C40\uFF09\u3002\u53EF\u5728\u300C\u91CD\u7F6E\u8303\u56F4\u300D\u6309\u94AE\u65C1\u7684\u83DC\u5355\u6062\u590D\u7EE7\u627F\u5168\u5C40\u3002">\u4F5C\u7528\u57DF: chat \u4E13\u5C5E</span>';if(m===st.PRESET_LINK){let g=r?.source?.presetName||"";return`<span class="yyt-tww-chip preset" title="\u672C chat \u94FE\u63A5\u5230\u5168\u5C40\u9884\u8BBE ${Se(g)}\uFF0C\u8DDF\u968F\u8BE5\u9884\u8BBE\u53D8\u5316\u3002">\u4F5C\u7528\u57DF: \u94FE\u63A5 ${Se(g)}</span>`}return'<span class="yyt-tww-chip preset" title="\u672C chat \u8DDF\u968F\u5168\u5C40\u6FC0\u6D3B\u6A21\u677F\u3002">\u4F5C\u7528\u57DF: \u7EE7\u627F\u5168\u5C40</span>'})()}
        <span class="yyt-tww-chip preset">API: ${Se(u)}</span>
        <span class="yyt-tww-chip preset">\u6307\u4EE4: ${Se(y)}</span>
        ${(()=>{let m=e?.runScope||e?.scope?.mode||"enabled";return m==="enabled"?'<span class="yyt-tww-chip preset">\u8303\u56F4: \u6240\u6709\u542F\u7528\u8868</span>':`<button class="yyt-tww-chip status-failed" data-action="reset-run-scope" title="\u5F53\u524D AI \u53EA\u4F1A\u586B\u90E8\u5206\u8868\uFF0C\u70B9\u51FB\u91CD\u7F6E\u4E3A\u300C\u6240\u6709\u542F\u7528\u8868\u300D" style="border:0;cursor:pointer;">\u8303\u56F4: ${Se(m==="current"?"\u26A0\uFE0F \u4EC5\u5F53\u524D\u8868":"\u4EC5\u9009\u4E2D\u8868")} \u2014 \u70B9\u6B64\u91CD\u7F6E</button>`})()}
        ${(()=>{let m=a?.kind,g=a?.sheetCount,h=a?.rowCount,b=g!==null&&h!==null?` \u2014 ${g} \u8868 ${h} \u884C`:"";return m==="authority"?`<span class="yyt-tww-chip status-success" title="\u6570\u636E\u6301\u4E45\u5316\u5230\u771F\u540E\u7AEF SQLite\uFF08ST-Delegation-of-authority \u63D0\u4F9B\uFF09">\u2713 \u771F\u540E\u7AEF SQLite${Se(b)}</span>`:m==="fallback"?`<span class="yyt-tww-chip preset" title="\u6570\u636E\u6301\u4E45\u5316\u5230 localStorage\uFF08\u672A\u88C5 ST-Delegation-of-authority\uFF09">\u2139 Fallback (localStorage)${Se(b)}</span>`:'<span class="yyt-tww-chip" title="Provider \u8FD8\u672A\u521D\u59CB\u5316\uFF08\u61D2\u52A0\u8F7D\uFF09">Provider \u52A0\u8F7D\u4E2D...</span>'})()}
        ${n?`<span class="yyt-tww-chip">\u9694\u79BB: ${Se(n)}</span>`:""}
        <span class="yyt-tww-chip status-${d==="success"?"success":d==="error"?"failed":""}">${Se(l)}</span>
        <span class="yyt-tww-chip yyt-tww-chip-toggle" data-action="toggle-chips" title="\u5C55\u5F00/\u6536\u8D77">\u25B8</span>
      </div>
    </div>

    <!-- v1.0.209 #3 \u4FEE\u590D\uFF1Ahero \u63D0\u5230\u6EDA\u52A8\u533A\u5916\u9762\uFF08\u540C .yyt-tww \u76F4\u63A5\u5B50\uFF09\uFF0C\u4E0B\u9762\u6240\u6709\u5185\u5BB9\u5305\u8FDB .yyt-tww-scroll \u5355\u4E00\u6EDA\u52A8\u5BB9\u5668\u3002
         hero \u7269\u7406\u4E0A\u5C31\u4E0D\u5728\u6EDA\u52A8\u533A\u5185 \u2192 \u4E0D\u4F1A\u88AB\u6EDA\u8D70\u3002JS \u76D1\u542C scrollTop > 0 \u5207\u6362 compact \u6001\u538B\u7F29 hero\u3002 -->
    <div class="yyt-tww-scroll">

    <!-- \u6A21\u677F\u5F52\u6863\u5217\u8868\uFF08\u9ED8\u8BA4\u9690\u85CF\uFF0Chero \u6309\u94AE toggle\uFF09 -->
    <div class="yyt-tww-archives" data-archives-panel style="display:none;">
      ${fC(o)}
    </div>

    <!-- Runtime stats -->
    <div class="yyt-tww-stat-row">
      <div class="yyt-tww-stat">
        <span class="yyt-tww-stat-label">\u72B6\u6001</span>
        <span class="yyt-tww-stat-value ${d}">${Se(l)}</span>
      </div>
      <div class="yyt-tww-stat">
        <span class="yyt-tww-stat-label">\u6700\u8FD1\u8FD0\u884C</span>
        <span class="yyt-tww-stat-value muted">${Se(Hb(i.lastRunAt))}</span>
      </div>
      <div class="yyt-tww-stat">
        <span class="yyt-tww-stat-label">\u6210\u529F</span>
        <span class="yyt-tww-stat-value success">${Se(i.successCount||0)}</span>
      </div>
      <div class="yyt-tww-stat">
        <span class="yyt-tww-stat-label">\u5931\u8D25</span>
        <span class="yyt-tww-stat-value ${i.errorCount?"error":"muted"}">${Se(i.errorCount||0)}</span>
      </div>
    </div>

    <!-- Body sections -->
    <div class="yyt-tww-body">

      <section class="yyt-tww-section" data-section="bindings">
        <div class="yyt-tww-section-heading">
          <span class="yyt-tww-section-icon"><i class="fa-solid fa-link"></i></span>
          \u7ED1\u5B9A
        </div>
        ${uC(t)}
      </section>

      <section class="yyt-tww-section" data-section="behavior">
        <div class="yyt-tww-section-heading">
          <span class="yyt-tww-section-icon"><i class="fa-solid fa-arrows-rotate"></i></span>
          \u586B\u8868\u884C\u4E3A
        </div>
        ${pC(t)}
      </section>

      <section class="yyt-tww-section" data-section="overview">
        <div class="yyt-tww-section-heading">
          <span class="yyt-tww-section-icon"><i class="fa-solid fa-table-cells"></i></span>
          \u8868\u683C\u6982\u89C8
          <span class="yyt-tww-section-action">
            <button class="yyt-tww-btn yyt-tww-btn-small" data-action="open-editor"><i class="fa-solid fa-table-cells"></i> \u6253\u5F00\u6570\u636E\u7F16\u8F91\u5668</button>
          </span>
        </div>
        ${mC(t.tablesPreview)}
      </section>

    </div>

    </div>
  </div>
  `}function uC(t){let{config:e,allTemplates:r,apiPresets:n,bypassPresets:s,regexPresets:o,worldbookPresets:a,activeTemplate:i}=t,l=r.map(x=>`<option value="${Se(x.id)}" ${i?.source?.templateId===x.id?"selected":""}>${Se(x.name)}</option>`).join(""),d=e?.autoUpdateEnabled===!0?"auto":"manual",c=e?.apiPreset||"",u='<option value="">\u2014\u2014 \u8DDF\u968F\u4E3B API \u2014\u2014</option>'+n.map(x=>`<option value="${Se(x.name)}" ${x.name===c?"selected":""}>${Se(x.name)}</option>`).join(""),y=e?.bypass?.presetId||"",p='<option value="">\u2014\u2014 \u65E0 \u2014\u2014</option>'+s.map(x=>`<option value="${Se(x.id)}" ${x.id===y?"selected":""}>${Se(x.name)}${x.isDefault?" [\u9ED8\u8BA4]":""}</option>`).join(""),m=e?.extraction?.regexPresetId||"",g='<option value="">\u2014\u2014 \u65E0\uFF08\u4E0D\u8FDB\u884C\u63D0\u53D6\uFF09 \u2014\u2014</option>'+o.map(x=>`<option value="${Se(x.id)}" ${x.id===m?"selected":""}>${Se(x.name)}</option>`).join(""),h=e?.worldbooks?.presetId||"",b='<option value="">\u2014\u2014 \u65E0 \u2014\u2014</option>'+a.map(x=>`<option value="${Se(x.id)}" ${x.id===h?"selected":""}>${Se(x.name)}</option>`).join(""),v=e?.runScope||"enabled";return`
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
      <select class="yyt-select yyt-tww-ctrl" data-binding="regexPreset">${g}</select>
      <div class="yyt-tww-row-meta"><a data-link="regex">\u7BA1\u7406\u2026</a></div>
    </div>

    <div class="yyt-tww-row">
      <div class="yyt-tww-row-label">
        <span class="yyt-tww-row-label-text">\u4E16\u754C\u4E66\u9884\u8BBE</span>
        <span class="yyt-tww-row-label-hint">\u6CE8\u5165\u5230 prompt \u7684 {{toolWorldbookContent}}</span>
      </div>
      <select class="yyt-select yyt-tww-ctrl" data-binding="worldbookPreset">${b}</select>
      <div class="yyt-tww-row-meta"><a data-link="worldbook">\u7BA1\u7406\u2026</a></div>
    </div>

    <div class="yyt-tww-row">
      <div class="yyt-tww-row-label">
        <span class="yyt-tww-row-label-text">\u4F5C\u7528\u57DF</span>
        <span class="yyt-tww-row-label-hint">\u6570\u636E\u72B6\u6001\u7ED1\u5B9A\u7684\u8303\u56F4</span>
      </div>
      <select class="yyt-select yyt-tww-ctrl" data-binding="runScope">
        <option value="current" ${v==="current"?"selected":""}>\u4EC5\u5F53\u524D\u6D3B\u52A8\u8868</option>
        <option value="selected" ${v==="selected"?"selected":""}>\u5F53\u524D\u9009\u4E2D\u8868</option>
        <option value="enabled" ${v==="enabled"?"selected":""}>\u6240\u6709\u542F\u7528\u7684\u8868</option>
      </select>
      <div class="yyt-tww-row-meta"></div>
    </div>
  `}function pC(t){let{config:e}=t,r=e?.fillMode||"incremental",n=Number(e?.contextDepth)||3,s=e?.worldbookSync?.enabled===!0,o=e?.mirrorToMessage===!0;return`
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
      <input class="yyt-input yyt-tww-ctrl" type="number" min="1" max="50" data-binding="contextDepth" value="${Se(n)}">
      <div class="yyt-tww-row-meta"></div>
    </div>

    <div class="yyt-tww-toggle-row">
      <div class="yyt-tww-toggle-info">
        <div class="yyt-tww-toggle-title">\u540C\u6B65\u5230\u4E16\u754C\u4E66</div>
        <div class="yyt-tww-toggle-desc">\u628A\u8868\u683C\u5E8F\u5217\u5316\u4E3A\u4E16\u754C\u4E66\u6761\u76EE\u8BA9\u4E3B\u6A21\u578B\u5728\u751F\u6210\u65F6\u770B\u5230\u3002</div>
      </div>
      <div class="yyt-tww-toggle ${s?"on":""}" data-toggle="worldbookSync"></div>
    </div>

    ${yC(t)}

    <div class="yyt-tww-toggle-row">
      <div class="yyt-tww-toggle-info">
        <div class="yyt-tww-toggle-title">\u5199\u56DE\u6B63\u6587\u955C\u50CF</div>
        <div class="yyt-tww-toggle-desc">\u5728\u52A9\u624B\u6D88\u606F\u672B\u5C3E\u955C\u50CF\u5199\u5165 markdown \u65B9\u4FBF\u624B\u52A8\u67E5\u9605\u3002</div>
      </div>
      <div class="yyt-tww-toggle ${o?"on":""}" data-toggle="mirrorToMessage"></div>
    </div>
  `}function yC(t){let e=t?.config?.worldbookSync||{};if(!(e.enabled===!0))return"";let n=e.injectionMode||"character_card",s=String(e.targetBook||""),o=t?.chatOpen===!0,a=n==="target_book"?`
    <div class="yyt-tww-sub-row">
      <label>\u76EE\u6807\u4E16\u754C\u4E66</label>
      <button class="yyt-btn yyt-btn-small" data-action="pick-target-book">${s?Se(s):"\u9009\u62E9\u4E16\u754C\u4E66..."}</button>
      <div class="yyt-tww-sub-meta">${o?"":'<span style="color:var(--tww-warning);">\u8BF7\u5148\u6253\u5F00\u804A\u5929</span>'}</div>
    </div>
  `:"";return`
    <div class="yyt-tww-sub-zone" data-sub-zone="worldbookSync">
      <div class="yyt-tww-sub-row">
        <label>\u6CE8\u5165\u6A21\u5F0F</label>
        <select class="yyt-select yyt-tww-ctrl" data-binding="worldbookInjectionMode">
          <option value="character_card" ${n==="character_card"?"selected":""}>\u89D2\u8272\u5361\u7ED1\u5B9A\u4E16\u754C\u4E66</option>
          <option value="auto_create" ${n==="auto_create"?"selected":""}>\u81EA\u52A8\u521B\u5EFA\u4E16\u754C\u4E66</option>
          <option value="target_book" ${n==="target_book"?"selected":""}>\u6307\u5B9A\u76EE\u6807\u4E16\u754C\u4E66</option>
        </select>
        <div class="yyt-tww-sub-meta">${{character_card:"\u81EA\u52A8\u6CE8\u5165\u5230\u89D2\u8272\u5361\u7ED1\u5B9A\u7684\u4E16\u754C\u4E66",auto_create:"\u9996\u6B21\u586B\u8868\u65F6\u81EA\u52A8\u521B\u5EFA\u5E76\u7ED1\u5B9A\u804A\u5929\u4E16\u754C\u4E66",target_book:"\u624B\u52A8\u9009\u62E9\u8981\u6CE8\u5165\u7684\u76EE\u6807\u4E16\u754C\u4E66"}[n]||""}</div>
      </div>

      ${a}

      <div class="yyt-tww-sub-row">
        <label>\u6E05\u7406</label>
        <button class="yyt-btn yyt-btn-small" data-action="clear-worldbook-entries" ${o?"":"disabled"}>\u6E05\u9664\u5F53\u524D\u804A\u5929\u7684\u6CE8\u5165\u6761\u76EE</button>
        <div class="yyt-tww-sub-meta">\u5220\u9664\u5F53\u524D\u804A\u5929\u540C\u6B65\u5199\u5165\u7684\u6240\u6709\u4E16\u754C\u4E66\u6761\u76EE</div>
      </div>
    </div>
  `}function fC(t=[]){return!Array.isArray(t)||t.length===0?'<div class="yyt-tww-empty">\u5F53\u524D chat \xD7 isolationKey \u6682\u65E0\u5F52\u6863\uFF08\u4EC5\u5728\u5207\u6362\u6A21\u677F\u65F6\u81EA\u52A8\u5F52\u6863\u5F53\u524D\u72B6\u6001\uFF09</div>':`
    <div class="yyt-tww-archives-header">\u6A21\u677F\u5F52\u6863\u5386\u53F2 (${t.length}/8)</div>
    <div class="yyt-tww-archives-list">
      ${t.map((e,r)=>{let n=e?.state||{},s=n.mode||"unknown",o=e?.archivedAt?new Date(e.archivedAt).toLocaleString():"\u672A\u77E5\u65F6\u95F4",a=n.presetName||"",i=s==="preset_link"?`\u9884\u8BBE\u94FE\u63A5: ${Se(a)}`:s==="chat_override"?"chat \u7EA7\u8986\u76D6\u6A21\u677F":s==="inherit_global"?"\u7EE7\u627F\u5168\u5C40":Se(s);return`
          <div class="yyt-tww-archive-item" data-archive-index="${r}">
            <div class="yyt-tww-archive-meta">
              <span class="yyt-tww-archive-time">${Se(o)}</span>
              <span class="yyt-tww-archive-mode">${i}</span>
            </div>
            <button class="yyt-tww-btn yyt-tww-btn-small" data-action="restore-archive" data-archive-index="${r}" title="\u6062\u590D\u6B64\u5F52\u6863\uFF08\u6062\u590D\u524D\u81EA\u52A8\u5F52\u6863\u5F53\u524D\u72B6\u6001\uFF09">\u6062\u590D</button>
          </div>
        `}).join("")}
    </div>
  `}function mC(t){return!Array.isArray(t)||t.length===0?'<div class="yyt-tww-empty">\u5F53\u524D slot \u6682\u65E0\u8868\u6570\u636E\u3002\u8BF7\u5148"\u7ACB\u5373\u586B\u8868"\u6216\u5728\u6570\u636E\u7F16\u8F91\u5668\u4E2D\u521D\u59CB\u5316\u3002</div>':`
    <div class="yyt-tww-table-grid">
      ${t.map((e,r)=>`
        <div class="yyt-tww-table-card${e.enabled===!1?" yyt-tww-table-card-disabled":""}" data-table-index="${r}" data-table-id="${Se(e.id||"")}">
          <div class="yyt-tww-table-card-header">
            <label class="yyt-tww-table-card-toggle" title="${e.enabled===!1?"\u5DF2\u7981\u7528 \u2014 AI \u4E0D\u4F1A\u586B\u8FD9\u5F20\u8868":"\u5DF2\u542F\u7528 \u2014 AI \u4F1A\u586B\u8FD9\u5F20\u8868"}">
              <input type="checkbox" data-action="toggle-table-enabled" data-table-id="${Se(e.id||"")}" ${e.enabled===!1?"":"checked"} />
              <span class="yyt-tww-table-card-toggle-slider"></span>
            </label>
            <span class="yyt-tww-table-card-name">${Se(e.name||`\u8868 ${r+1}`)}</span>
            <i class="fa-solid fa-arrow-right yyt-tww-table-card-arrow"></i>
          </div>
          <div class="yyt-tww-table-card-stats">
            <span><b>${Se(e.rowCount||0)}</b> \u884C</span>
            <span><b>${Se(e.colCount||0)}</b> \u5B57\u6BB5</span>
            ${e.updatedHint?`<span>${Se(e.updatedHint)}</span>`:""}
          </div>
        </div>
      `).join("")}
    </div>
  `}function Yb(){let t=(()=>{try{return Ee()}catch{return{}}})(),e=(()=>{try{return vn()||[]}catch{return[]}})(),r=(()=>{try{return ro({})}catch{return null}})(),n=(()=>{try{return Zr()||[]}catch{return[]}})(),s=(()=>{try{return ya()||[]}catch{return[]}})(),o=(()=>{try{return Oe.listPresets()||[]}catch{return[]}})(),a=(()=>{try{return vt.listPresets()||[]}catch{return[]}})(),i=(()=>{try{return ye.getKey()}catch{return""}})(),l=gC(),d=hC(),c=bC(),u=null,y=0;try{let b=fs(null);Array.isArray(b?.tableState?.tables)&&b.tableState.tables.length>0&&(u=b.tableState.tables,y=Number(b.tableState.updatedAt)||0)}catch{}let p=u||r?.template?.tables||t?.tables||[],m=t?.tableEnabledOverrides&&typeof t.tableEnabledOverrides=="object"?t.tableEnabledOverrides:{},g=p.map(b=>{let v=b?.id||"",x=v&&Object.prototype.hasOwnProperty.call(m,v)?m[v]:void 0;return{id:v,name:b?.name||"",enabled:x!==void 0?x:b?.enabled!==!1,rowCount:Array.isArray(b?.rows)?b.rows.length:0,colCount:Array.isArray(b?.columns)?b.columns.length:0,updatedHint:u&&y>0?Hb(y):""}}),h=(()=>{try{return pg()||[]}catch{return[]}})();return{config:t,activeTemplate:r,allTemplates:e,apiPresets:n,bypassPresets:s,regexPresets:o,worldbookPresets:a,availableWorldbooks:l,boundLorebook:d,chatOpen:c,isolationKey:i,tablesPreview:g,templateArchives:h,providerStats:dC()}}function gC(){try{let t=globalThis.window||globalThis,e=t?.TavernHelper||t?.parent?.TavernHelper;if(!e)return[];if(typeof e.getLorebooks=="function"){let r=e.getLorebooks();if(Array.isArray(r))return r}if(typeof e.getLorebookList=="function"){let r=e.getLorebookList();if(Array.isArray(r))return r}}catch(t){F().warn("loadAvailableWorldbooks \u5931\u8D25",t)}return[]}function hC(){try{let t=globalThis.window||globalThis,e=t?.TavernHelper||t?.parent?.TavernHelper;if(e){if(typeof e.getCurrentCharPrimaryLorebook=="function"){let n=e.getCurrentCharPrimaryLorebook();if(typeof n=="string"&&n)return n}if(typeof e.getCharLorebooks=="function")try{let n=e.getCharLorebooks();if(n?.primary)return String(n.primary)}catch{}if(typeof e.getChatLorebook=="function")try{let n=e.getChatLorebook();if(typeof n=="string"&&n)return n}catch{}}let r=t?.SillyTavern?.getContext?.()||t?.parent?.SillyTavern?.getContext?.();if(r){let n=r.characters?.[r.characterId],s=n?.data?.character_book?.name||n?.data?.extensions?.world||n?.world;if(typeof s=="string"&&s)return s}}catch(t){F().warn("loadCharacterBoundLorebook \u5931\u8D25",t)}return""}function bC(){try{let t=globalThis.window||globalThis,e=t?.TavernHelper||t?.parent?.TavernHelper;if(e&&typeof e.getCurrentChatId=="function"){let n=e.getCurrentChatId();return!!(n&&String(n).trim()&&String(n).trim()!=="default_chat")}let r=t?.SillyTavern?.getContext?.()||t?.parent?.SillyTavern?.getContext?.();if(r){let n=r.chat;if(Array.isArray(n)&&n.length>0||r.chatId)return!0}}catch{}return!1}function tp(t,e){let r=window.jQuery||window.parent?.jQuery;if(!r||!t||!t.on){F().warn("bindWorkbenchEvents: jQuery \u6216 $container \u4E0D\u53EF\u7528");return}t.off(".tww"),Wb||(Wb=!0,cC().then(()=>{typeof e=="function"&&e()}).catch(()=>{})),t.on("click.tww",'[data-action="run-now"]',async()=>{try{let s=await $a();s?.success?F().info("\u586B\u8868\u5B8C\u6210",null,{toast:"success"}):F().error(`\u586B\u8868\u5931\u8D25\uFF1A${s?.error||"\u672A\u77E5"}`,null,{toast:!0}),typeof e=="function"&&e()}catch(s){F().error("\u7ACB\u5373\u586B\u8868\u5F02\u5E38",s),F().error(`\u5F02\u5E38\uFF1A${s?.message||s}`,null,{toast:!0})}}),t.on("click.tww",'[data-action="run-clear"]',async()=>{if(window.confirm("\u91CD\u586B\u4F1A\u6E05\u7A7A\u5F53\u524D\u6D88\u606F\u697C\u5C42\u7684\u8868\u683C\u6570\u636E\u5E76\u91CD\u65B0\u751F\u6210\uFF0C\u786E\u5B9A\uFF1F"))try{let s=await $a(null,{clearBeforeUpdate:!0});s?.success?F().info("\u91CD\u586B\u5B8C\u6210",null,{toast:"success"}):F().error(`\u91CD\u586B\u5931\u8D25\uFF1A${s?.error||"\u672A\u77E5"}`,null,{toast:!0}),typeof e=="function"&&e()}catch(s){F().error("\u91CD\u586B\u5F02\u5E38",s),F().error(`\u5F02\u5E38\uFF1A${s?.message||s}`,null,{toast:!0})}}),t.on("click.tww",'[data-action="reset-run-scope"]',()=>{try{let s=Ee();ot({...s,runScope:"enabled",scope:{...s.scope||{},mode:"enabled",activeTableId:"",selectedTableIds:[]}}),F().info("\u5DF2\u91CD\u7F6E\u8303\u56F4\u4E3A\u300C\u6240\u6709\u542F\u7528\u8868\u300D",null,{toast:"success"}),F().info("\u7528\u6237\u91CD\u7F6E runScope \u4E3A enabled"),typeof e=="function"&&e()}catch(s){F().error("\u91CD\u7F6E\u8303\u56F4\u5F02\u5E38",s),F().error(`\u91CD\u7F6E\u5931\u8D25\uFF1A${s?.message||s}`,null,{toast:!0})}}),t.on("click.tww",'[data-action="toggle-chips"]',function(){let s=t.find(".yyt-tww-hero-chips")[0];if(!s)return;let o=s.classList.toggle("yyt-tww-hero-chips-expanded");this.textContent=o?"\u25BE":"\u25B8"}),t.on("click.tww",'[data-action="export-templates"]',()=>{try{let s=Hi(),o=JSON.stringify(s,null,2),a=new Blob([o],{type:"application/json"}),i=URL.createObjectURL(a),l=document.createElement("a");l.href=i,l.download=`youyou-table-templates-${Date.now()}.json`,document.body.appendChild(l),l.click(),document.body.removeChild(l),URL.revokeObjectURL(i);let d=Array.isArray(s?.templates)?s.templates.length:0;F().info(`\u5DF2\u5BFC\u51FA ${d} \u4E2A\u6A21\u677F\u5230\u4E0B\u8F7D\u6587\u4EF6\u5939`,null,{toast:"success"}),F().info("export-templates \u5B8C\u6210",{count:d})}catch(s){F().error("export-templates \u5F02\u5E38",s),F().error(`\u5BFC\u51FA\u5931\u8D25\uFF1A${s?.message||s}`,null,{toast:!0})}}),t.on("click.tww",'[data-action="reset-template-scope"]',()=>{if(window.confirm("\u6062\u590D\u672C chat \u7684\u6A21\u677F\u4F5C\u7528\u57DF\u5230\u300C\u7EE7\u627F\u5168\u5C40\u300D\uFF1F\u5F53\u524D\u72B6\u6001\u4F1A\u5148\u81EA\u52A8\u5F52\u6863\uFF0C\u53EF\u5728\u300C\u5F52\u6863\u300D\u4E2D\u6062\u590D\u3002"))try{let s=ug({archive:!0});s?.success?(F().info("\u5DF2\u6062\u590D\u4E3A\u7EE7\u627F\u5168\u5C40",null,{toast:"success"}),F().info("reset-template-scope \u5B8C\u6210"),typeof e=="function"&&e()):F().error(`\u6062\u590D\u5931\u8D25\uFF1A${s?.error||"\u672A\u77E5"}`,null,{toast:!0})}catch(s){F().error("reset-template-scope \u5F02\u5E38",s),F().error(`\u5F02\u5E38\uFF1A${s?.message||s}`,null,{toast:!0})}}),t.on("click.tww",'[data-action="chat-template-override"]',()=>{if(window.confirm(`\u628A\u5F53\u524D\u6FC0\u6D3B\u6A21\u677F\u6DF1\u62F7\u8D1D\u4E3A\u672C chat \u7684\u72EC\u7ACB\u526F\u672C\uFF1F
\u4E4B\u540E\u4FEE\u6539\u4E0D\u5F71\u54CD\u5168\u5C40\u6A21\u677F\u3002\u64CD\u4F5C\u524D\u81EA\u52A8\u5F52\u6863\u5F53\u524D\u72B6\u6001\u3002`))try{let s=wn();if(!s){F().error("\u6CA1\u6709\u53EF\u7528\u7684\u5168\u5C40\u6FC0\u6D3B\u6A21\u677F",null,{toast:!0});return}let o=cg(s,{source:"workbench-chat-override"});o?.success?(F().info(`\u5DF2\u8BBE\u4E3A chat \u4E13\u5C5E\uFF1A${s.name}`,null,{toast:"success"}),F().info("chat-template-override \u5B8C\u6210",{templateId:s.id,name:s.name}),typeof e=="function"&&e()):F().error(`\u8BBE\u7F6E\u5931\u8D25\uFF1A${o?.error||"\u672A\u77E5"}`,null,{toast:!0})}catch(s){F().error("chat-template-override \u5F02\u5E38",s),F().error(`\u5F02\u5E38\uFF1A${s?.message||s}`,null,{toast:!0})}}),t.on("click.tww",'[data-action="chat-template-link"]',()=>{let s=(()=>{try{return vn()||[]}catch{return[]}})();if(s.length===0){F().info("\u6CA1\u6709\u53EF\u7528\u7684\u6A21\u677F",null,{toast:!0});return}let o=s.map((d,c)=>`${c+1}. ${d.name}`).join(`
`),a=window.prompt(`\u94FE\u63A5\u5230\u54EA\u4E2A\u5168\u5C40\u9884\u8BBE\uFF1F\u8F93\u5165\u7F16\u53F7\uFF081-${s.length}\uFF09\uFF1A

${o}`,"1");if(!a)return;let i=parseInt(a,10)-1;if(!Number.isFinite(i)||i<0||i>=s.length){F().error("\u7F16\u53F7\u65E0\u6548",null,{toast:!0});return}let l=s[i];try{let d=dg(l.name,{source:"workbench-link-preset"});d?.success?(F().info(`\u5DF2\u94FE\u63A5\u5230\u9884\u8BBE\uFF1A${l.name}`,null,{toast:"success"}),F().info("chat-template-link \u5B8C\u6210",{presetName:l.name}),typeof e=="function"&&e()):F().error(`\u94FE\u63A5\u5931\u8D25\uFF1A${d?.error||"\u672A\u77E5"}`,null,{toast:!0})}catch(d){F().error("chat-template-link \u5F02\u5E38",d),F().error(`\u5F02\u5E38\uFF1A${d?.message||d}`,null,{toast:!0})}}),t.on("click.tww",'[data-action="reset-chat-data"]',async()=>{if(window.confirm("\u5C06\u6E05\u7A7A\u5F53\u524D\u804A\u5929\u6240\u6709\u697C\u5C42\u7684\u8868\u683C\u6570\u636E\uFF08\u4E0D\u5F71\u54CD\u6A21\u677F/\u914D\u7F6E\uFF09\u3002\u4E0B\u6B21\u586B\u8868\u4F1A\u6309\u5F53\u524D\u6FC0\u6D3B\u6A21\u677F\u4ECE\u5934\u5F00\u59CB\u3002\u786E\u5B9A\uFF1F"))try{let s=await vh();s?.success?(F().info(`\u5DF2\u6E05\u7A7A ${s.touched||0} \u6761\u6D88\u606F\u7684\u8868\u683C\u6570\u636E`,null,{toast:"success"}),F().info("\u6E05\u7A7A chat \u6570\u636E\u5B8C\u6210",s)):F().error("\u6E05\u7A7A\u5931\u8D25",null,{toast:!0}),typeof e=="function"&&e()}catch(s){F().error("\u6E05\u7A7A chat \u6570\u636E\u5F02\u5E38",s),F().error(`\u5F02\u5E38\uFF1A${s?.message||s}`,null,{toast:!0})}}),t.on("click.tww",'[data-action="open-editor"]',s=>{s.preventDefault(),F().info("open-editor button clicked");try{let o=Zu();F().info("openTableDataEditor \u8C03\u7528\u5B8C\u6210",{hasReturn:!!o})}catch(o){F().error("\u6253\u5F00\u6570\u636E\u7F16\u8F91\u5668\u5F02\u5E38",o),F().error(`\u6253\u5F00\u5931\u8D25\uFF1A${o?.message||o}`,null,{toast:!0})}}),t.on("click.tww","[data-table-index]",function(s){if(r(s.target).closest('[data-action="toggle-table-enabled"]').length>0||r(s.target).is("label, label *"))return;s.preventDefault();let o=Number(r(this).attr("data-table-index"));if(!(!Number.isFinite(o)||o<0))try{let i=fs(null)?.tableState?.tables?.[o],l=Zu({focusTableUid:i?.uid||i?.id||""})}catch(a){F().error("\u6253\u5F00\u6570\u636E\u7F16\u8F91\u5668\u5F02\u5E38",a),F().error(`\u6253\u5F00\u5931\u8D25\uFF1A${a?.message||a}`,null,{toast:!0})}}),t.on("click.tww",'[data-action="toggle-archives"]',function(s){s.preventDefault();let o=t.find("[data-archives-panel]").first();o.length&&(o.css("display")==="none"?o.css("display","block"):o.css("display","none"))}),t.on("click.tww",'[data-action="restore-archive"]',async function(s){s.stopPropagation();let o=Number(r(this).attr("data-archive-index"));if(!(!Number.isFinite(o)||o<0)&&window.confirm(`\u6062\u590D\u5F52\u6863 #${o}\uFF1F\u6062\u590D\u524D\u4F1A\u81EA\u52A8\u5F52\u6863\u5F53\u524D\u72B6\u6001\uFF0C\u53EF\u518D\u6B21\u6062\u590D\u56DE\u6765\u3002`))try{let a=yg(o);a?.success?(F().info("\u5DF2\u6062\u590D\u5F52\u6863",null,{toast:"success"}),F().info("restoreChatTemplateArchive \u6210\u529F",{index:o,scopeState:a.scopeState})):F().error(`\u6062\u590D\u5931\u8D25\uFF1A${a?.error||"\u672A\u77E5"}`,null,{toast:!0}),typeof e=="function"&&e()}catch(a){F().error("\u6062\u590D\u5F52\u6863\u5F02\u5E38",a),F().error(`\u5F02\u5E38\uFF1A${a?.message||a}`,null,{toast:!0})}}),t.on("change.tww",'[data-action="toggle-table-enabled"]',function(s){s.stopPropagation();let o=r(this).attr("data-table-id"),a=r(this).is(":checked");if(o)try{let i=Ee(),l={...i.tableEnabledOverrides||{}};l[o]=a,ot({...i,tableEnabledOverrides:l}),F().info(a?`\u5DF2\u542F\u7528 ${o}`:`\u5DF2\u7981\u7528 ${o}`,null,{toast:"success"}),F().info("toggle \u5355\u8868\u6FC0\u6D3B",{tableId:o,enabled:a}),typeof e=="function"&&e()}catch(i){F().error("toggle \u5355\u8868\u6FC0\u6D3B\u5F02\u5E38",i),F().error(`\u5207\u6362\u5931\u8D25\uFF1A${i?.message||i}`,null,{toast:!0})}}),t.on("change.tww",'[data-binding="template"]',function(){let s=r(this).val();try{Gd(s);let o=Ee();ot({...o,activeTemplate:s}),F().info("\u6A21\u677F\u5DF2\u5207\u6362",null,{toast:"success"}),typeof e=="function"&&e()}catch(o){F().error("\u5207\u6362\u6A21\u677F\u5F02\u5E38",o),F().error(`\u5207\u6362\u5931\u8D25\uFF1A${o?.message||o}`,null,{toast:!0})}}),t.on("change.tww",'[data-binding="triggerMode"]',function(){let s=r(this).val();try{let o=Ee();ot({...o,autoUpdateEnabled:s==="auto"}),F().info(s==="auto"?"\u5DF2\u5207\u6362\u4E3A\u81EA\u52A8\u6A21\u5F0F":"\u5DF2\u5207\u6362\u4E3A\u624B\u52A8\u6A21\u5F0F",null,{toast:"success"}),typeof e=="function"&&e()}catch(o){F().error("\u5207\u6362\u89E6\u53D1\u6A21\u5F0F\u5F02\u5E38",o),F().error(`\u5207\u6362\u5931\u8D25\uFF1A${o?.message||o}`,null,{toast:!0})}});let n=[{sel:'[data-binding="apiPreset"]',key:"apiPreset"},{sel:'[data-binding="runScope"]',key:"runScope"},{sel:'[data-binding="fillMode"]',key:"fillMode"}];for(let{sel:s,key:o}of n)t.on("change.tww",s,function(){let a=r(this).val();try{let i=Ee(),l={...i,[o]:a};o==="runScope"&&(l.scope={...i.scope||{},mode:a,...a==="enabled"?{activeTableId:"",selectedTableIds:[]}:{}}),ot(l),F().info("\u5DF2\u4FDD\u5B58",null,{toast:"success"})}catch(i){F().error(`\u4FDD\u5B58 ${o} \u5F02\u5E38`,i),F().error(`\u4FDD\u5B58\u5931\u8D25\uFF1A${i?.message||i}`,null,{toast:!0})}});t.on("change.tww",'[data-binding="bypassPreset"]',function(){let s=r(this).val();try{let o=Ee();ot({...o,bypass:{...o.bypass||{},presetId:s,enabled:!!s}}),F().info("Ai \u6307\u4EE4\u9884\u8BBE\u5DF2\u4FDD\u5B58",null,{toast:"success"})}catch(o){F().error("\u4FDD\u5B58 bypass \u5F02\u5E38",o),F().error(`\u4FDD\u5B58\u5931\u8D25\uFF1A${o?.message||o}`,null,{toast:!0})}}),t.on("change.tww",'[data-binding="regexPreset"]',function(){let s=r(this).val();try{let o=Ee();ot({...o,extraction:{...o.extraction||{},regexPresetId:s}}),F().info("\u6B63\u5219\u9884\u8BBE\u5DF2\u66F4\u65B0",null,{toast:"success"})}catch(o){F().error("\u4FDD\u5B58 regexPreset \u5F02\u5E38",o),F().error(`\u4FDD\u5B58\u5931\u8D25\uFF1A${o?.message||o}`,null,{toast:!0})}}),t.on("change.tww",'[data-binding="worldbookPreset"]',function(){let s=r(this).val();try{let o=Ee();ot({...o,worldbooks:{...o.worldbooks||{},presetId:s}}),F().info("\u4E16\u754C\u4E66\u9884\u8BBE\u5DF2\u66F4\u65B0",null,{toast:"success"})}catch(o){F().error("\u4FDD\u5B58 worldbookPreset \u5F02\u5E38",o),F().error(`\u4FDD\u5B58\u5931\u8D25\uFF1A${o?.message||o}`,null,{toast:!0})}}),t.on("change.tww",'[data-binding="contextDepth"]',function(){let s=Math.max(1,parseInt(r(this).val(),10)||3);try{let o=Ee();ot({...o,contextDepth:s}),F().info("\u5DF2\u4FDD\u5B58",null,{toast:"success"})}catch(o){F().error("\u4FDD\u5B58 contextDepth \u5F02\u5E38",o),F().error(`\u4FDD\u5B58\u5931\u8D25\uFF1A${o?.message||o}`,null,{toast:!0})}}),t.on("click.tww",'[data-toggle="worldbookSync"]',function(){let s=r(this),o=s.hasClass("on"),a=!o;s.toggleClass("on",a);try{let i=Ee();ot({...i,worldbookSync:{...i.worldbookSync||{},enabled:a}}),F().info(a?"\u5DF2\u542F\u7528\u4E16\u754C\u4E66\u540C\u6B65":"\u5DF2\u505C\u7528\u4E16\u754C\u4E66\u540C\u6B65",null,{toast:"success"}),typeof e=="function"&&e()}catch(i){s.toggleClass("on",o),F().error("toggle worldbookSync \u5F02\u5E38",i),F().error(`\u4FDD\u5B58\u5931\u8D25\uFF1A${i?.message||i}`,null,{toast:!0})}}),t.on("change.tww",'[data-binding="worldbookInjectionMode"]',function(){let s=r(this).val();try{let o=Ee();ot({...o,worldbookSync:{...o.worldbookSync||{},injectionMode:s}}),F().info("\u5DF2\u5207\u6362\u6CE8\u5165\u6A21\u5F0F",null,{toast:"success"}),typeof e=="function"&&e()}catch(o){F().error("\u4FDD\u5B58 injectionMode \u5F02\u5E38",o)}}),t.on("click.tww",'[data-action="pick-target-book"]',async function(){let s=yi();if(!s.length)try{s=await qo()}catch{}if(!s.length){await we.confirm({title:"\u6CA1\u6709\u53EF\u7528\u7684\u4E16\u754C\u4E66",message:"\u5BBF\u4E3B\u672A\u63D0\u4F9B\u53EF\u7528\u4E16\u754C\u4E66\u3002",confirmText:"\u786E\u5B9A"});return}let a=Ee()?.worldbookSync?.targetBook||"",i=document.createElement("div");i.style.cssText="display:flex;flex-direction:column;gap:8px;";let l=document.createElement("input");l.className="yyt-input",l.placeholder=`\u641C\u7D22 ${s.length} \u672C\u4E16\u754C\u4E66\u2026`,l.style.cssText="padding:7px 10px;font-size:12px;",i.appendChild(l);let d=document.createElement("div");d.style.cssText="display:flex;flex-direction:column;gap:4px;max-height:320px;overflow-y:auto;";let c=a,u=[];for(let p of s){let m=document.createElement("label");m.style.cssText="display:flex;align-items:center;gap:8px;padding:8px 10px;cursor:pointer;border-radius:6px;background:var(--yyt-surface-2,rgba(255,255,255,0.03));font-size:12px;";let g=document.createElement("input");g.type="radio",g.name="targetBookPick",g.value=p,p===a&&(g.checked=!0),g.addEventListener("change",()=>{c=p}),m.appendChild(g);let h=document.createElement("span");h.textContent=p,h.style.color="var(--yyt-text)",m.appendChild(h),d.appendChild(m),u.push({el:m,search:p.toLowerCase()})}i.appendChild(d),l.addEventListener("input",()=>{let p=l.value.trim().toLowerCase();for(let m of u)m.el.style.display=!p||m.search.includes(p)?"":"none"});let y=await we.custom({title:`\u9009\u62E9\u76EE\u6807\u4E16\u754C\u4E66\uFF08${s.length} \u672C\uFF09`,width:"480px",body:i,buttons:[{label:"\u53D6\u6D88",variant:"ghost",onClick:p=>p(null)},{label:"\u9009\u62E9",variant:"primary",onClick:p=>p(c)}]}).result;if(y&&typeof y=="string")try{let p=Ee();ot({...p,worldbookSync:{...p.worldbookSync||{},targetBook:y}}),F().info(`\u76EE\u6807\u4E16\u754C\u4E66\u5DF2\u8BBE\u4E3A: ${y}`,null,{toast:"success"}),typeof e=="function"&&e()}catch(p){F().error("\u4FDD\u5B58 targetBook \u5F02\u5E38",p)}}),t.on("click.tww",'[data-action="clear-worldbook-entries"]',async function(){try{let s=Ee(),o=await Nh(s);if(o.success)F().info(`\u5DF2\u6E05\u9664 ${o.cleaned||0} \u4E2A\u4E16\u754C\u4E66\u6761\u76EE`,null,{toast:"success"});else{let a={no_target_book:"\u672A\u9009\u62E9\u76EE\u6807\u4E16\u754C\u4E66",no_character_lorebook:"\u5F53\u524D\u89D2\u8272\u5361\u672A\u7ED1\u5B9A\u4E16\u754C\u4E66",chat_worldbook_unavailable:"\u804A\u5929\u4E16\u754C\u4E66\u4E0D\u53EF\u7528"};F().warn(`\u6E05\u9664\u5931\u8D25: ${a[o.error]||o.error}`,null,{toast:!0})}}catch(s){F().error("\u6E05\u9664\u4E16\u754C\u4E66\u6761\u76EE\u5F02\u5E38",s),F().error(`\u6E05\u9664\u5931\u8D25: ${s?.message||s}`,null,{toast:!0})}}),t.on("click.tww",'[data-toggle="mirrorToMessage"]',function(){let s=r(this),o=s.hasClass("on"),a=!o;s.toggleClass("on",a);try{let i=Ee();ot({...i,mirrorToMessage:a}),F().info(a?"\u5DF2\u542F\u7528\u6B63\u6587\u955C\u50CF":"\u5DF2\u505C\u7528\u6B63\u6587\u955C\u50CF",null,{toast:"success"})}catch(i){s.toggleClass("on",o),F().error("toggle mirrorToMessage \u5F02\u5E38",i),F().error(`\u4FDD\u5B58\u5931\u8D25\uFF1A${i?.message||i}`,null,{toast:!0})}}),t.on("click.tww","[data-link]",function(s){s.preventDefault(),F().info("\u8DF3\u8F6C\u5230\u9884\u8BBE\u7BA1\u7406\u9762\u677F\uFF08\u5F85\u63A5\u5165\uFF09",null,{toast:!0})})}var ep,Ft,Wb,qb,Vb=O(()=>{Z();Js();sr();Gs();We();Ur();kl();ms();jb();We();wu();Go();Fo();ks();so();dn();Rs();Ft={kind:null,sheetCount:null,rowCount:null,lastError:null,lastRefreshAt:0},Wb=!1;qb=`
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
`});var Zb={};he(Zb,{TableWorkbenchPanel:()=>Xb,default:()=>wC});function xC(){if(!rp)try{let t=window.parent&&window.parent.document?window.parent.document:document,e=t.head||t.documentElement;if(e.querySelector("#yyt-tww-styles")){rp=!0;return}let r=t.createElement("style");r.id="yyt-tww-styles",r.textContent=qb,e.appendChild(r),rp=!0}catch(t){Ba.warn("\u6CE8\u5165\u5DE5\u4F5C\u53F0\u6837\u5F0F\u5931\u8D25",t)}}function Jb(t){let e=t?.[0];if(!e)return;let r=e.closest(".yyt-popup-body");if(!r){Ba.warn("pinWorkbenchHeight: \u627E\u4E0D\u5230 .yyt-popup-body \u7956\u5148");return}let n=()=>{let o=e.querySelector(".yyt-tww");if(!o)return;let a=r.getBoundingClientRect(),i=e.getBoundingClientRect(),l=a.bottom-i.top-8;l>100?o.style.height=`${l}px`:Ba.warn(`pinWorkbenchHeight: \u8BA1\u7B97\u9AD8\u5EA6\u5F02\u5E38 h=${l}, popupBottom=${a.bottom}, tabTop=${i.top}`)};if(n(),requestAnimationFrame(()=>requestAnimationFrame(n)),typeof ResizeObserver>"u"||e.__yytwwROTarget===r&&e.__yytwwRO)return;if(e.__yytwwRO)try{e.__yytwwRO.disconnect()}catch{}let s=new ResizeObserver(()=>n());s.observe(r),e.__yytwwRO=s,e.__yytwwROTarget=r}function Qb(t){let e=t?.[0];if(!e)return;let r=e.querySelector(".yyt-tww-hero"),n=e.querySelector(".yyt-tww-scroll");if(!r||!n)return;let s=()=>{n.scrollTop>0?r.classList.add("yyt-tww-hero--compact"):r.classList.remove("yyt-tww-hero--compact")};s(),n.addEventListener("scroll",s,{passive:!0})}var Ba,rp,Xb,wC,ex=O(()=>{pt();Z();Vb();Ba=$.createScope("TableWorkbenchPanel"),rp=!1;Xb={id:"tableWorkbenchPanel",render(){xC();try{let t=Yb();return Gb(t)}catch(t){return Ba.error("\u6E32\u67D3\u5DE5\u4F5C\u53F0 UI \u5F02\u5E38",t),`<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5DE5\u4F5C\u53F0\u6E32\u67D3\u5931\u8D25\uFF1A${t?.message||t}</span></div>`}},bindEvents(t){if(!ue()||!Ke(t))return;let r=this,n=()=>{try{let s=t[0]?.querySelector(".yyt-tww-scroll"),o=s?s.scrollTop:0;if(t.html(r.render()),tp(t,n),Jb(t),Qb(t),o>0){let a=t[0]?.querySelector(".yyt-tww-scroll");a&&(a.scrollTop=o)}}catch(s){Ba.error("refresh \u5F02\u5E38",s)}};tp(t,n),Jb(t),Qb(t)},renderTo(t){!ue()||!Ke(t)||(t.html(this.render()),this.bindEvents(t))}},wC=Xb});var rx={};he(rx,{LoggerPanel:()=>tx,default:()=>EC});function TC(t){switch(t){case _e.DEBUG:return"yyt-log-debug";case _e.INFO:return"yyt-log-info";case _e.WARN:return"yyt-log-warn";case _e.ERROR:return"yyt-log-error";default:return""}}function _C(t){let e=new Date(t),r=n=>String(n).padStart(2,"0");return`${r(e.getHours())}:${r(e.getMinutes())}:${r(e.getSeconds())}.${String(e.getMilliseconds()).padStart(3,"0")}`}var vC,SC,tx,EC,nx=O(()=>{Z();nt();pt();vC="yyt-logger-panel",SC=[{level:null,label:"\u5168\u90E8",icon:"fa-list"},{level:_e.DEBUG,label:"DEBUG",icon:"fa-bug"},{level:_e.INFO,label:"INFO",icon:"fa-circle-info"},{level:_e.WARN,label:"WARN",icon:"fa-triangle-exclamation"},{level:_e.ERROR,label:"ERROR",icon:"fa-circle-exclamation"}];tx={id:"loggerPanel",render(){let t=$.getStats();return`
      <div class="yyt-logger-panel" id="${vC}">
        <div class="yyt-logger-toolbar">
          <div class="yyt-logger-filter-btns" data-yyt-log-filter-group>
            ${SC.map((e,r)=>`<button class="yyt-log-filter-btn ${r===0?"yyt-active":""}" data-level="${e.level??""}">
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
    `},bindEvents(t){let e=ue();if(!e||!Ke(t))return;let r=this,n=null,s=!1,o=[],a=t.find("[data-yyt-log-list]"),i=t.find("[data-yyt-log-search]"),l=t.find("[data-yyt-log-autoscroll]"),d=t.find("[data-yyt-log-pause]");function c(p){if(!p.length){a.html('<div class="yyt-logger-empty">\u6682\u65E0\u5339\u914D\u7684\u65E5\u5FD7\u8BB0\u5F55</div>');return}a.html(p.map(m=>`
        <div class="yyt-log-entry ${TC(m.level)}" data-log-id="${m.id}">
          <span class="yyt-log-time">${_C(m.timestamp)}</span>
          <span class="yyt-log-level">${$.levelLabel(m.level)}</span>
          <span class="yyt-log-scope">${be(m.scope)}</span>
          <span class="yyt-log-msg">${be(m.message)}</span>
          ${m.data!==void 0?`<span class="yyt-log-data">${be(typeof m.data=="object"?JSON.stringify(m.data):String(m.data))}</span>`:""}
        </div>
      `).join(""))}function u(){let p=i.val()?.trim()||"",{entries:m}=$.getEntries({level:n,search:p||void 0,limit:500});c(m),l.is(":checked")&&requestAnimationFrame(()=>{a[0].scrollTop=a[0].scrollHeight})}function y(){if(s||!o.length)return;let p=o;o=[],u()}this._onLogEntry=p=>{if(s||n!==null&&p.level<n)return;let m=i.val()?.trim().toLowerCase()||"";if(m){let g=p.scope.toLowerCase().includes(m),h=p.message.toLowerCase().includes(m);if(!g&&!h)return}o.push(p),o.length>=50?y():this._flushTimer||(this._flushTimer=setTimeout(()=>{this._flushTimer=null,y(),r._updateStats(t)},250))},q.on("logger:entry",this._onLogEntry),t.on("click.yytLogger","[data-yyt-log-filter-group] .yyt-log-filter-btn",p=>{t.find("[data-yyt-log-filter-group] .yyt-log-filter-btn").removeClass("yyt-active"),e(p.currentTarget).addClass("yyt-active");let m=e(p.currentTarget).data("level");n=m===""?null:m,u(),r._updateStats(t)}),i.on("input.yytLogger",()=>{u()}),t.on("click.yytLogger","[data-yyt-log-pause]",()=>{s=!s,d.toggleClass("yyt-active",s),d.html(s?'<i class="fa-solid fa-play"></i> \u7EE7\u7EED':'<i class="fa-solid fa-pause"></i> \u6682\u505C'),s||(o=[],u(),r._updateStats(t))}),t.on("click.yytLogger","[data-yyt-log-clear]",()=>{$.clear(),a.html('<div class="yyt-logger-empty">\u65E5\u5FD7\u5DF2\u6E05\u9664</div>'),r._updateStats(t)}),t.on("click.yytLogger","[data-yyt-log-export]",()=>{let{entries:p}=$.getEntries({limit:1e4}),m=JSON.stringify(p.map(v=>({time:new Date(v.timestamp).toISOString(),level:$.levelLabel(v.level),scope:v.scope,message:v.message,data:v.data})),null,2),g=new Blob([m],{type:"application/json"}),h=URL.createObjectURL(g),b=document.createElement("a");b.href=h,b.download=`yyt-logs-${new Date().toISOString().replace(/[:.]/g,"-")}.json`,b.click(),URL.revokeObjectURL(h)}),u()},_updateStats(t){if(!ue()||!Ke(t))return;let r=$.getStats(),n=t.find(".yyt-logger-stats");n.length&&n.html(`
      <span class="yyt-logger-stat">\u5171 <strong>${r.total}</strong> \u6761</span>
      ${["ERROR","WARN","INFO","DEBUG"].map(s=>`<span class="yyt-logger-stat yyt-log-${s.toLowerCase()}">${s}: <strong>${r.byLevel[s]||0}</strong></span>`).join("")}
    `)},destroy(t){let e=ue();this._onLogEntry&&(q.off("logger:entry",this._onLogEntry),this._onLogEntry=null),this._flushTimer&&(clearTimeout(this._flushTimer),this._flushTimer=null),!(!e||!Ke(t))&&t.off(".yytLogger")},getStyles(){return`
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
    `}},EC=tx});var px={};he(px,{MAIN_TAB_RENDERERS:()=>hp,PanelState:()=>lc,SCRIPT_ID:()=>zn,SUB_TAB_RENDERERS:()=>bp,UIManager:()=>Ko,bindDialogEvents:()=>No,closeActiveCustomSelectDropdown:()=>hr,closeCustomSelectDropdown:()=>pc,createDialogHtml:()=>Po,default:()=>CC,destroyEnhancedCustomSelects:()=>jt,downloadJson:()=>$o,enhanceNativeSelects:()=>xr,escapeHtml:()=>be,fillFormWithConfig:()=>pv,getAllStyles:()=>ux,getFormApiConfig:()=>uv,getJQuery:()=>ue,getTargetDocument:()=>er,initUI:()=>ix,isContainerValid:()=>Ke,normalizeCustomSelectOptions:()=>sy,openCustomSelectDropdown:()=>ry,readFileContent:()=>Lo,registerComponents:()=>np,renderApiPanel:()=>sp,renderBypassPanel:()=>yp,renderCustomSelectControl:()=>oy,renderEscapeTransformToolPanel:()=>up,renderLoggerPanel:()=>gp,renderMainTab:()=>cx,renderPunctuationTransformToolPanel:()=>pp,renderRegexPanel:()=>ap,renderSettingsPanel:()=>fp,renderStatusBlockPanel:()=>cp,renderSubTabComponent:()=>dx,renderSummaryToolPanel:()=>lp,renderTableTemplatePanel:()=>ip,renderTableWorkbenchPanel:()=>mp,renderToolPanel:()=>lx,renderWorldbookPresetPanel:()=>op,renderYouyouReviewPanel:()=>dp,repositionActiveCustomSelectDropdown:()=>dc,resetJQueryCache:()=>nv,showConfirm:()=>Lr,showPrompt:()=>yv,showToast:()=>Za,showTopNotice:()=>uc,toggleCustomSelectDropdown:()=>ny,uiManager:()=>cr,withButtonLoading:()=>fv});async function ox(t){if(!Ol.has(t)){let e=sx[t];if(typeof e!="function")throw new Error(`unknown_panel:${t}`);Ol.set(t,e().then(r=>{let n=r?.[t]||r?.default;if(!n?.id)throw new Error(`invalid_panel:${t}`);return n}).catch(r=>{throw Ol.delete(t),r}))}return Ol.get(t)}function ax(t,e=null){let r=e?.message?`\uFF1A${be(e.message)}`:"";return`<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>${be(t)}${r}</span></div>`}async function np(){let t=await Promise.allSettled(Object.keys(sx).map(async r=>{let n=await ox(r);return cr.register(n.id,n),n.id})),e=t.filter(r=>r.status==="rejected");e.length&&e.forEach(r=>za.error("\u7EC4\u4EF6\u6CE8\u518C\u5931\u8D25",r.reason)),za.log(`\u7EC4\u4EF6\u6CE8\u518C\u5B8C\u6210\uFF0C\u6210\u529F ${t.length-e.length} \u4E2A\uFF0C\u5931\u8D25 ${e.length} \u4E2A`)}async function ix(t={}){let{autoInjectStyles:e=!0,targetDocument:r,...n}=t;cr.init(n),await np(),e&&cr.injectStyles(r),za.log("\u6A21\u5757\u521D\u59CB\u5316\u5B8C\u6210")}async function AC(t){let e=await ox(t);return cr.getComponent(e.id)||cr.register(e.id,e),e}async function Ut(t,e,r={}){let n=await AC(t);cr.render(n.id,e,r)}function sp(t){return Ut("ApiPresetPanel",t)}function op(t){return Ut("WorldbookPresetPanel",t)}function ap(t){return Ut("RegexExtractPanel",t)}function ip(t){return Ut("TableTemplatePanel",t)}function lx(t){return Ut("ToolManagePanel",t)}function lp(t){return Ut("SummaryToolPanel",t)}function cp(t){return Ut("StatusBlockPanel",t)}function dp(t){return Ut("YouyouReviewPanel",t)}function up(t){return Ut("EscapeTransformToolPanel",t)}function pp(t){return Ut("PunctuationTransformToolPanel",t)}function yp(t){return Ut("BypassPanel",t)}function fp(t){return Ut("SettingsPanel",t)}function mp(t){return Ut("TableWorkbenchPanel",t)}function gp(t){return Ut("LoggerPanel",t)}async function cx(t,e){let r=hp[t];if(!r)return!1;try{await r.render(e)}catch(n){za.error(r.failMessage,n),e.html(ax(r.failMessage,n))}return!0}async function dx(t,e){let r=bp[t];if(!r)return null;try{await r.render(e)}catch(n){za.error(r.failMessage,n),e.html(ax(r.failMessage,n))}return t}function ux(){return cr.getAllStyles()}var za,sx,Ol,hp,bp,CC,yx=O(()=>{Z();_c();pt();pt();_c();za=$.createScope("UI"),sx=Object.freeze({ApiPresetPanel:()=>Promise.resolve().then(()=>($y(),Ny)),WorldbookPresetPanel:()=>Promise.resolve().then(()=>(Qy(),Jy)),RegexExtractPanel:()=>Promise.resolve().then(()=>(nm(),rm)),TableTemplatePanel:()=>Promise.resolve().then(()=>(hg(),gg)),ToolManagePanel:()=>Promise.resolve().then(()=>(wg(),xg)),SummaryToolPanel:()=>Promise.resolve().then(()=>(jg(),Ug)),StatusBlockPanel:()=>Promise.resolve().then(()=>(qg(),Hg)),YouyouReviewPanel:()=>Promise.resolve().then(()=>(Vg(),Yg)),EscapeTransformToolPanel:()=>Promise.resolve().then(()=>(Zg(),Xg)),PunctuationTransformToolPanel:()=>Promise.resolve().then(()=>(rh(),th)),BypassPanel:()=>Promise.resolve().then(()=>(oh(),sh)),SettingsPanel:()=>Promise.resolve().then(()=>(uu(),du)),TableWorkbenchPanel:()=>Promise.resolve().then(()=>(ex(),Zb)),LoggerPanel:()=>Promise.resolve().then(()=>(nx(),rx))}),Ol=new Map;hp=Object.freeze({tableWorkbench:{render:t=>mp(t),failMessage:"\u586B\u8868\u5DE5\u4F5C\u53F0\u52A0\u8F7D\u5931\u8D25"},bypass:{render:t=>yp(t),failMessage:"Ai\u6307\u4EE4\u9884\u8BBE\u9762\u677F\u52A0\u8F7D\u5931\u8D25"},settings:{render:t=>fp(t),failMessage:"\u8BBE\u7F6E\u9762\u677F\u52A0\u8F7D\u5931\u8D25"},logger:{render:t=>gp(t),failMessage:"\u65E5\u5FD7\u9762\u677F\u52A0\u8F7D\u5931\u8D25"}}),bp=Object.freeze({ApiPresetPanel:{render:t=>sp(t),failMessage:"API \u9884\u8BBE\u9762\u677F\u52A0\u8F7D\u5931\u8D25"},RegexExtractPanel:{render:t=>ap(t),failMessage:"\u6B63\u5219\u63D0\u53D6\u9762\u677F\u52A0\u8F7D\u5931\u8D25"},WorldbookPresetPanel:{render:t=>op(t),failMessage:"\u4E16\u754C\u4E66\u9884\u8BBE\u9762\u677F\u52A0\u8F7D\u5931\u8D25"},TableTemplatePanel:{render:t=>ip(t),failMessage:"\u8868\u683C\u6A21\u677F\u9762\u677F\u52A0\u8F7D\u5931\u8D25"},SummaryToolPanel:{render:t=>lp(t),failMessage:"\u6458\u8981\u5DE5\u5177\u52A0\u8F7D\u5931\u8D25"},StatusBlockPanel:{render:t=>cp(t),failMessage:"\u4E3B\u89D2\u72B6\u6001\u680F\u52A0\u8F7D\u5931\u8D25"},YouyouReviewPanel:{render:t=>dp(t),failMessage:"\u5C0F\u5E7D\u70B9\u8BC4\u52A0\u8F7D\u5931\u8D25"},EscapeTransformToolPanel:{render:t=>up(t),failMessage:"\u8F6C\u4E49\u5904\u7406\u5DE5\u5177\u52A0\u8F7D\u5931\u8D25"},PunctuationTransformToolPanel:{render:t=>pp(t),failMessage:"\u4E2D\u6587\u6807\u70B9\u66FF\u6362\u5DE5\u5177\u52A0\u8F7D\u5931\u8D25"}});CC={uiManager:cr,registerComponents:np,initUI:ix,renderApiPanel:sp,renderWorldbookPresetPanel:op,renderRegexPanel:ap,renderTableTemplatePanel:ip,renderToolPanel:lx,renderSummaryToolPanel:lp,renderStatusBlockPanel:cp,renderYouyouReviewPanel:dp,renderEscapeTransformToolPanel:up,renderPunctuationTransformToolPanel:pp,renderBypassPanel:yp,renderSettingsPanel:fp,renderTableWorkbenchPanel:mp,renderLoggerPanel:gp,MAIN_TAB_RENDERERS:hp,SUB_TAB_RENDERERS:bp,renderMainTab:cx,renderSubTabComponent:dx,getAllStyles:ux}});var xx={};he(xx,{TX_PHASE:()=>ir,ToolAutomationService:()=>Bl,Transaction:()=>Dl,default:()=>PC,toolAutomationService:()=>bx});function Ae(t){return t==null?"":String(t).trim()}function fx(t){let e=on(t);return Ae(e?.chatId??e?.chat_id??t?.chatId??t?.chat_id??t?.chat_filename??t?.this_chid??"chat_default")||"chat_default"}function xp(t){let e=on(t);return Array.isArray(e?.chat)?e.chat:Array.isArray(t?.chat)?t.chat:[]}function hx(t){if(!t||t?.is_user===!0||t?.is_system===!0)return!1;let e=String(t?.role||"").trim().toLowerCase();return e==="user"||e==="system"?!1:e==="assistant"||e==="ai"||!e}function kC(t,e){let r=Ae(e);if(!r)return null;let n=xp(t);for(let s=n.length-1;s>=0;s-=1){let o=n[s];if([o?.messageId,o?.message_id,o?.id,o?.mid,o?.mesid,o?.chat_index,s].map(i=>Ae(i)).includes(r))return o||null}return null}function mx(t){let e=xp(t);if(!Array.isArray(e)||e.length===0)return null;let r=e.length-1,n=e[r]||null;if(!hx(n))return null;let s=Ae(n?.messageId??n?.message_id??n?.id??n?.mid??n?.mesid??n?.chat_index??r);return s?{messageId:s,swipeId:Ae(n?.swipeId??n?.swipe_id??n?.swipe??n?.swipeIndex),message:n}:null}function MC(){let t=Date.now().toString(36),e=Math.random().toString(36).slice(2,8);return`tx_${t}_${e}`}var it,gx,IC,RC,ir,Dl,Bl,bx,PC,wx=O(()=>{oo();Z();Or();Ar();ga();Qd();Vn();kl();sr();it=$.createScope("ToolAutomation");gx=1e4,IC=15e3,RC=800;ir=Object.freeze({RECEIVED:"received",CONFIRMED:"confirmed",CONTEXT_BUILT:"context_built",REQUEST_STARTED:"request_started",REQUEST_FINISHED:"request_finished",WRITEBACK_STARTED:"writeback_started",WRITEBACK_COMMITTED:"writeback_committed",REFRESH_CONFIRMED:"refresh_confirmed",SKIPPED:"skipped",FAILED:"failed"}),Dl=class{constructor({chatId:e,messageId:r,swipeId:n,sourceEvent:s,generationKey:o}){this.traceId=MC(),this.chatId=e||"",this.messageId=r||"",this.swipeId=n||"",this.sourceEvent=s||"",this.generationKey=o||"",this.phase=ir.RECEIVED,this.createdAt=Date.now(),this.updatedAt=Date.now(),this.verdict="",this.error=null,this.toolResults=[],this.writebackState=null,this.refreshState=null}transition(e,r={}){return this.phase=e,this.updatedAt=Date.now(),Object.assign(this,r),this}toSnapshot(){return{...this}}},Bl=class{constructor(){this._stopCallbacks=[],this._pendingTimers=new Map,this._recentlyProcessedSlots=new Map,this._ownWriteMessageIds=new Map,this._slotQueues=new Map,this._activeTransactions=new Map,this._isProcessing=!1,this._currentChatId="",this.debugMode=!1,this._transactionHistory=[],this._maxHistorySize=30,this._hostBindingStatus={initialized:!1,initAttempts:0,lastInitAt:0,lastInitResult:"idle",source:"unavailable",hasEventSource:!1,hasEventTypes:!1,eventBindings:[],retryScheduled:!1,retryDelayMs:0,lastError:""},this._messageReceivedThrottleUntil=0}setDebugMode(e){this.debugMode=e===!0}init(e={}){this.stop(),this._hostBindingStatus.lastInitAt=Date.now(),this._hostBindingStatus.initAttempts=(this._hostBindingStatus.initAttempts||0)+1;let r=tr();this._currentChatId=fx(r);let n=(s,...o)=>{let a=tr(),{messageId:i,swipeId:l}=this._extractIdentitiesFromArgs(o);if(it.debug(`\u6536\u5230\u5BBF\u4E3B\u4E8B\u4EF6 "${s}"`,{messageId:i,swipeId:l,argCount:o.length}),s===Pe.MESSAGE_RECEIVED){let g=Date.now();if(g<this._messageReceivedThrottleUntil){it.debug(`MESSAGE_RECEIVED \u5728\u8282\u6D41\u7A97\u53E3\u5185\uFF0C\u8DF3\u8FC7\uFF08\u5269\u4F59 ${this._messageReceivedThrottleUntil-g}ms\uFF09`);return}this._messageReceivedThrottleUntil=g+this._getSettleMs()+5e3}let d=null,c=i,u=l;if(c&&(d=kC(a,c)),!d){let g=mx(a);g?.messageId&&(d=g.message,c=g.messageId,u=g.swipeId||u)}if(!c||!d){it.debug(`\u4E8B\u4EF6 "${s}" \u65E0 assistant \u76EE\u6807\uFF0C\u8DF3\u8FC7`);return}if(!hx(d)){it.debug(`\u4E8B\u4EF6 "${s}" \u547D\u4E2D\u975E assistant \u6D88\u606F\uFF0C\u8DF3\u8FC7`,{messageId:c});return}let y=String(d.content||d.mes||"").trim();if(!y||y.length<5){it.debug(`\u4E8B\u4EF6 "${s}" \u6D88\u606F\u8FC7\u77ED\uFF08${y.length} \u5B57\u7B26\uFF09\uFF0C\u8DF3\u8FC7`);return}if(this._isProcessing){it.debug(`\u4E8B\u4EF6 "${s}" \u6B63\u5728\u5904\u7406\u4E2D\uFF0C\u8DF3\u8FC7`);return}if(this._isOwnWrite(c)){it.debug(`\u4E8B\u4EF6 "${s}" \u547D\u4E2D own-write \u9ED1\u540D\u5355\uFF0C\u8DF3\u8FC7`,{messageId:c});return}let p=Ae(d?.swipeId??d?.swipe_id??d?.swipe??d?.swipeIndex);p&&(u=p);let m=`${c}::${u}`;if(this._isRecentlyProcessed(m)){it.debug(`\u4E8B\u4EF6 "${s}" slot \u5DF2\u8FD1\u671F\u5904\u7406\u8FC7\uFF0C\u8DF3\u8FC7`,{slotKey:m});return}this._scheduleMessageProcessing(c,u,{settleMs:this._getSettleMs(),sourceEvent:s}),it.info(`\u4E8B\u4EF6 "${s}" \u901A\u8FC7\u6240\u6709\u5B88\u536B\uFF0C\u5DF2\u8C03\u5EA6\u5904\u7406`,{targetMessageId:c,targetSwipeId:u,throttleUntil:this._messageReceivedThrottleUntil,isProcessing:this._isProcessing})};return this._stopCallbacks.push(et.subscribe(Pe.MESSAGE_SENT,()=>{it.debug("MESSAGE_SENT \u2192 \u6E05\u7406\u8C03\u5EA6\u961F\u5217"),this._pendingTimers.forEach(s=>clearTimeout(s)),this._pendingTimers.clear()})),this._stopCallbacks.push(et.subscribe(Pe.MESSAGE_RECEIVED,(...s)=>{n(Pe.MESSAGE_RECEIVED,...s)})),this._stopCallbacks.push(et.subscribe(Pe.GENERATION_STOPPED,()=>{it.info("GENERATION_STOPPED \u2192 \u53D6\u6D88\u6240\u6709\u6D3B\u8DC3\u4E8B\u52A1"),this._cancelActiveTransactions("generation_stopped"),this._pendingTimers.forEach(s=>clearTimeout(s)),this._pendingTimers.clear(),this._isProcessing=!1})),this._stopCallbacks.push(et.subscribe(Pe.CHAT_CHANGED,()=>{this._resetForChatChange()})),this._stopCallbacks.push(et.subscribe(Pe.MESSAGE_DELETED,s=>{this._clearMessageState(Ae(s))})),this._refreshHostBindingStatus(),this._seedKnownSlots(),it.info("\u81EA\u52A8\u5316\u670D\u52A1\u5DF2\u521D\u59CB\u5316",{chatId:this._currentChatId,source:this._hostBindingStatus.source}),!0}_seedKnownSlots(){try{let e=tr(),r=mx(e);if(!r?.messageId)return;let n=`${Ae(r.messageId)}::${Ae(r.swipeId)}`;this._recentlyProcessedSlots.set(n,Number.MAX_SAFE_INTEGER),it.debug(`\u5DF2\u5C06\u5F53\u524D\u6700\u65B0 slot "${n}" \u9884\u6807\u8BB0\u4E3A\u5DF2\u77E5\uFF0C\u8DF3\u8FC7 MESSAGE_RECEIVED \u91CD\u653E`)}catch(e){it.warn("_seedKnownSlots \u5931\u8D25",{error:e})}}_refreshHostBindingStatus(){let e=et.describe(),r=[Pe.MESSAGE_SENT,Pe.MESSAGE_RECEIVED,Pe.GENERATION_STOPPED,Pe.CHAT_CHANGED,Pe.MESSAGE_DELETED];this._hostBindingStatus={...this._hostBindingStatus,initialized:!!e.hasBridge,lastInitResult:e.hasBridge?"ready":e.retryScheduled?"pending_retry":"pending",source:e.source,hasEventSource:!!e.hasBridge,hasEventTypes:Array.isArray(e.availableEvents)&&e.availableEvents.length>0,eventBindings:r.map(n=>`subscribed: ${n}`),retryScheduled:!!e.retryScheduled,retryDelayMs:0,lastError:""}}stop(){this._stopCallbacks.forEach(e=>{try{e()}catch(r){it.warn("\u505C\u6B62\u56DE\u8C03\u5931\u8D25",{error:r})}}),this._stopCallbacks=[],this._pendingTimers.forEach(e=>clearTimeout(e)),this._pendingTimers.clear(),this._slotQueues.clear(),this._recentlyProcessedSlots.clear(),this._ownWriteMessageIds.clear(),this._cancelActiveTransactions("service_stopped"),this._activeTransactions.clear(),this._isProcessing=!1,this._hostBindingStatus={initialized:!1,initAttempts:0,lastInitAt:0,lastInitResult:"idle",source:"unavailable",hasEventSource:!1,hasEventTypes:!1,eventBindings:[],retryScheduled:!1,retryDelayMs:0,lastError:""}}isEnabled(){return!0}getRuntimeSnapshot(){return this._pruneRecentSlots(),this._pruneOwnWrites(),this._refreshHostBindingStatus(),{currentChatId:this._currentChatId,enabled:!0,isProcessing:this._isProcessing,pendingTimerCount:this._pendingTimers.size,queuedSlotCount:this._slotQueues.size,recentlyProcessedSlotCount:this._recentlyProcessedSlots.size,ownWriteMessageIdCount:this._ownWriteMessageIds.size,activeTransactionCount:this._activeTransactions.size,recentTransactions:this._transactionHistory.slice(-10).map(e=>e.toSnapshot()),hostBinding:{...this._hostBindingStatus,eventBindings:Array.isArray(this._hostBindingStatus?.eventBindings)?[...this._hostBindingStatus.eventBindings]:[]},settings:this._getAutomationSettings()}}async processCurrentAssistantMessage(e={}){let r=await Yn({messageId:"",swipeId:"",runSource:"AUTO"}),n=Ae(r?.sourceMessageId||r?.messageId);return n?this.processAssistantMessage(n,{force:e.force===!0,swipeId:Ae(r?.sourceSwipeId),sourceEvent:e.sourceEvent||"MANUAL_CURRENT_ASSISTANT"}):{success:!1,error:"\u672A\u627E\u5230\u5F53\u524D assistant \u697C\u5C42"}}async processAssistantMessage(e,{force:r=!1,swipeId:n="",sourceEvent:s="AUTO"}={}){let o=new Dl({chatId:this._currentChatId,messageId:e,swipeId:n,sourceEvent:s});try{if(!e)return this._skipTransaction(o,"missing_message_id");o.transition(ir.CONFIRMED);let a=await Yn({messageId:e,swipeId:n,runSource:"AUTO"}),i=a?.targetAssistantMessage||null;if(!i||!a?.sourceMessageId)return this._skipTransaction(o,"assistant_message_not_found");let l=String(i.content||i.mes||"").trim();if(!l||l.length<5)return this._skipTransaction(o,"assistant_message_too_short");o.transition(ir.CONTEXT_BUILT);let d=`${Ae(a.sourceMessageId)}::${Ae(a.sourceSwipeId||n)}`;if(o.generationKey=d,!r&&this._isRecentlyProcessed(d))return this._skipTransaction(o,"duplicate_slot",{slotKey:d});let c=ea(),u=Xt.filterAutoPostResponseTools(c),p=[...c.filter(h=>Xt.shouldRunLocalTransform(h)&&h.output?.autoTrigger!==!1),...u],m=Ee(),g=m?.autoUpdateEnabled===!0&&Ae(m?.autoUpdateTrigger||"assistantMessage")==="assistantMessage";return!p.length&&!g?this._skipTransaction(o,"no_auto_tools",{tools:p}):(o.slotKey=d,o.slotRevisionKey=a.slotRevisionKey||"",o.sourceMessageId=a.sourceMessageId||e,o.sourceSwipeId=a.sourceSwipeId||n||"",this._enqueueSlot(d,async()=>{if(!r&&this._isRecentlyProcessed(d))return this._skipTransaction(o,"duplicate_slot_after_queue",{slotKey:d});this._isProcessing=!0,this._markSlotProcessed(d),o.transition(ir.REQUEST_STARTED);let h=new AbortController;this._registerActiveTransaction(o,{controller:h,slotKey:d,sourceMessageId:a.sourceMessageId||e,sourceSwipeId:a.sourceSwipeId||n||""});try{let{results:b,hasWriteback:v}=await this._executeAutoTools(p,a,h,o,{slotKey:d,messageId:e,swipeId:n}),{tableResult:x,hasWriteback:T}=await this._executeAutoTableUpdate(a,h,o,{shouldRunTableAuto:g,tableWorkbenchConfig:m,messageId:e,swipeId:n,sourceEvent:s}),E=v||T;o.transition(ir.REQUEST_FINISHED,{toolResults:b,tableResult:x}),E&&(o.transition(ir.WRITEBACK_STARTED),o.writebackState={messageId:a.sourceMessageId,swipeId:a.sourceSwipeId,hasOutput:!0},this._messageReceivedThrottleUntil=Date.now()+IC),this._markSlotProcessed(d);let w=b.every(C=>C?.success!==!1),_=!g||!!x?.success||x?.skipped===!0||x?.meta?.aborted===!0||x?.meta?.stale===!0,A=w&&_,I=b.some(C=>C?.meta?.aborted===!0||C?.meta?.stale===!0||C?.error==="\u8BF7\u6C42\u5DF2\u53D6\u6D88")||x?.meta?.aborted===!0||x?.meta?.stale===!0;A&&o.transition(ir.WRITEBACK_COMMITTED);let P=A?ir.REFRESH_CONFIRMED:ir.FAILED;return o.transition(P,{verdict:I?"aborted":A?"success":"partial_failure"}),this._recordTransaction(o),this._updateAutoRuntimeForResults(p,a,o,b),{success:A,traceId:o.traceId,slotKey:d,sourceEvent:s,messageId:a.sourceMessageId||e,phase:o.phase,results:b,tableResult:x}}finally{this._unregisterActiveTransaction(o.traceId),this._isProcessing=!1}}))}catch(a){return o.transition(ir.FAILED,{error:a?.message||String(a)}),this._recordTransaction(o),this._unregisterActiveTransaction(o.traceId),this._isProcessing=!1,it.error("processAssistantMessage \u5F02\u5E38",{error:a}),{success:!1,traceId:o.traceId,error:o.error,phase:o.phase}}}_extractIdentitiesFromArgs(e){let r="",n="";for(let s of e)if(s!=null){if(typeof s=="number"&&Number.isFinite(s)&&!r){r=Ae(s);continue}if(typeof s=="string"){let o=Ae(s);!r&&/^\d+$/.test(o)&&(r=o);continue}typeof s=="object"&&(r||(r=Ae(s.messageId??s.message_id??s.id??s.mid??s.mesid??s.chat_index??s.message?.messageId??s.message?.message_id??s.message?.id??s.message?.mid??s.message?.mesid??s.message?.chat_index??s.data?.messageId??s.data?.message_id??s.data?.id??s.data?.mid??s.data?.mesid??s.data?.chat_index??s.target?.messageId??s.target?.message_id??s.target?.id??s.target?.mid??s.target?.mesid??s.target?.chat_index)),n||(n=Ae(s.swipeId??s.swipe_id??s.swipe??s.swipeIndex??s.currentSwipe??s.message?.swipeId??s.message?.swipe_id??s.message?.swipe??s.data?.swipeId??s.data?.swipe_id??s.data?.swipe??s.target?.swipeId??s.target?.swipe_id??s.target?.swipe)))}return{messageId:r,swipeId:n}}_scheduleMessageProcessing(e,r="",n={}){let s=n.settleMs??this._getSettleMs(),o=`msg::${Ae(e)}::${Ae(r)}`,a=this._pendingTimers.get(o);a&&clearTimeout(a);let i=setTimeout(()=>{this._pendingTimers.delete(o),this.processAssistantMessage(e,{swipeId:r,sourceEvent:n.sourceEvent||"AUTO"}).catch(l=>{it.error("\u8C03\u5EA6\u6267\u884C\u5931\u8D25",{messageId:e,error:l})})},Math.max(0,s));this._pendingTimers.set(o,i),it.info("\u5DF2\u8C03\u5EA6\u6D88\u606F\u5904\u7406",{timerKey:o,settleMs:s,sourceEvent:n.sourceEvent})}cancelAutomation(e={}){let r=e.reason||"manual_cancel",n=Ae(e.messageId),s=Ae(e.slotKey),o=Ae(e.traceId),a=0;for(let[i,l]of this._pendingTimers){let d=n&&i.includes(`::${n}::`),c=s&&i.includes(s);(d||c||!n&&!s&&!o)&&(clearTimeout(l),this._pendingTimers.delete(i),a+=1)}return a+=this._cancelActiveTransactions(r,{messageId:n,slotKey:s,traceId:o}),{success:a>0,cancelledCount:a,reason:r}}_isRecentlyProcessed(e){if(!e)return!1;this._pruneRecentSlots();let r=this._recentlyProcessedSlots.get(e);return r?Date.now()-r<this._getDedupeWindowMs():!1}_markSlotProcessed(e){e&&(this._recentlyProcessedSlots.set(e,Date.now()),this._pruneRecentSlots())}_pruneRecentSlots(){let e=Date.now()-this._getDedupeWindowMs();for(let[r,n]of this._recentlyProcessedSlots)(!Number.isFinite(n)||n<e)&&this._recentlyProcessedSlots.delete(r)}async _executeAutoTools(e,r,n,s,{slotKey:o,messageId:a,swipeId:i}){let l=[],d=!1,c=r.lastAiMessage,u=r.assistantBaseText;for(let y of e){let p={...r,signal:n.signal,isAutoRun:!0,abortMeta:{traceId:s.traceId,slotKey:o,sourceMessageId:r.sourceMessageId||a,sourceSwipeId:r.sourceSwipeId||i||""},shouldAbortWriteback:()=>this._shouldAbortAutoWriteback({traceId:s.traceId}),skipNotify:!0,lastAiMessage:c,assistantBaseText:u,input:{...r.input||{},lastAiMessage:c,assistantBaseText:u}},g=Xt.shouldRunLocalTransform(y)?await sl(y,p):await Xt.runToolPostResponse(y,p);if(l.push(g),g?.writebackState||g?.output){d=!0,this._markOwnWrite(r.sourceMessageId||a);let h=this._readCurrentMessageText(r.sourceMessageId||a);if(h){c=h,u=h;let b=Number(r.sourceMessageId||a);Array.isArray(r.chatMessages)&&r.chatMessages[b]&&(r.chatMessages[b].content=h,r.chatMessages[b].mes=h)}}}return{results:l,hasWriteback:d}}async _executeAutoTableUpdate(e,r,n,{shouldRunTableAuto:s,tableWorkbenchConfig:o,messageId:a,swipeId:i,sourceEvent:l}){if(!s)return{tableResult:null,hasWriteback:!1};let d=await hb({messageId:e.sourceMessageId||a,swipeId:e.sourceSwipeId||i||"",sourceEvent:l,configInput:o,signal:r.signal,shouldAbortWriteback:()=>this._shouldAbortAutoWriteback({traceId:n.traceId})}),c=!!(d?.state||d?.mirrorResult?.success===!0);return c&&this._markOwnWrite(e.sourceMessageId||a),{tableResult:d,hasWriteback:c}}_readCurrentMessageText(e){let r=tr(),n=xp(r),s=Number(e);if(!Number.isFinite(s)||s<0||s>=n.length)return"";let o=n[s];return String(o?.mes||o?.content||"").trim()}_markOwnWrite(e){let r=Ae(e);r&&(this._ownWriteMessageIds.set(r,Date.now()),this._pruneOwnWrites())}_isOwnWrite(e){let r=Ae(e);if(!r)return!1;this._pruneOwnWrites();let n=this._ownWriteMessageIds.get(r);return n?Date.now()-n<gx:!1}_pruneOwnWrites(){let e=Date.now()-gx;for(let[r,n]of this._ownWriteMessageIds)(!Number.isFinite(n)||n<e)&&this._ownWriteMessageIds.delete(r)}_recordTransaction(e){this._transactionHistory.push(e),this._transactionHistory.length>this._maxHistorySize&&(this._transactionHistory=this._transactionHistory.slice(-this._maxHistorySize)),it.debug(`\u4E8B\u52A1 [${e.traceId}] \u2192 ${e.phase}`,{messageId:e.messageId,generationKey:e.generationKey,verdict:e.verdict,sourceEvent:e.sourceEvent,error:e.error})}_skipTransaction(e,r,n={}){return e.transition(ir.SKIPPED,{verdict:r,...n}),this._recordTransaction(e),Array.isArray(n?.tools)&&n.tools.length>0&&this._updateAutoRuntimeForSkip(n.tools,e,r,n),{success:!1,skipped:!0,reason:r,traceId:e.traceId,...n}}_enqueueSlot(e,r){let s=(this._slotQueues.get(e)||Promise.resolve()).catch(()=>{}).then(r).finally(()=>{this._slotQueues.get(e)===s&&this._slotQueues.delete(e)});return this._slotQueues.set(e,s),s}_registerActiveTransaction(e,r={}){e?.traceId&&this._activeTransactions.set(e.traceId,{traceId:e.traceId,generationKey:r.generationKey||e.generationKey||"",slotKey:r.slotKey||e.slotKey||"",sourceMessageId:r.sourceMessageId||e.sourceMessageId||"",sourceSwipeId:r.sourceSwipeId||e.sourceSwipeId||"",slotRevisionKey:r.slotRevisionKey||e.slotRevisionKey||"",assistantBaseFingerprint:r.assistantBaseFingerprint||"",assistantBaseText:r.assistantBaseText||"",controller:r.controller||null,cancelled:!1,cancelReason:""})}_unregisterActiveTransaction(e){e&&this._activeTransactions.delete(e)}_cancelActiveTransactions(e="manual_cancel",r={}){let n=Ae(r.messageId),s=Ae(r.slotKey),o=Ae(r.traceId),a=0;for(let[i,l]of this._activeTransactions){let d=o&&i===o,c=n&&Ae(l?.sourceMessageId)===n,u=s&&Ae(l?.slotKey)===s;if(!(!d&&!c&&!u&&!(!o&&!n&&!s))){l.cancelled=!0,l.cancelReason=e;try{l?.controller?.abort?.()}catch{}a+=1}}return a}_shouldAbortAutoWriteback(e={}){let r=Ae(e.traceId);if(r){let n=this._activeTransactions.get(r);if(!n||n.cancelled)return{aborted:!0,reason:"cancelled_before_host_commit"}}return!1}_updateAutoRuntimeForSkip(e,r,n,s={}){e.forEach(o=>{o?.id&&ln(o.id,{lastAutoRunAt:Date.now(),lastAutoStatus:"skipped",lastAutoMessageId:r?.sourceMessageId||r?.messageId||"",lastAutoSwipeId:r?.sourceSwipeId||r?.swipeId||"",lastAutoRevisionKey:r?.slotRevisionKey||s?.slotRevisionKey||"",lastAutoWritebackStatus:"",lastAutoRefreshConfirmed:!1,lastAutoSkipReason:n||""},{touchLastRunAt:!1,emitEvent:!1,emitRuntimeEvent:!0})})}_updateAutoRuntimeForResults(e,r,n,s=[]){e.forEach((o,a)=>{if(!o?.id)return;let i=s[a]||{},l=i?.meta?.writebackDetails||{},d=i?.meta?.aborted===!0||i?.meta?.stale===!0?"aborted":i?.success===!1?"failed":"success",c=i?.meta?.aborted===!0?i?.meta?.abortReason||(i?.meta?.stale===!0?"stale_base_changed":"cancelled_before_host_commit"):"";ln(o.id,{lastAutoRunAt:Date.now(),lastAutoStatus:d,lastAutoMessageId:r?.sourceMessageId||n?.sourceMessageId||n?.messageId||"",lastAutoSwipeId:r?.sourceSwipeId||n?.sourceSwipeId||n?.swipeId||"",lastAutoRevisionKey:r?.slotRevisionKey||n?.slotRevisionKey||"",lastAutoWritebackStatus:i?.meta?.writebackStatus||"",lastAutoRefreshConfirmed:!!l.refreshConfirmed,lastAutoSkipReason:c},{touchLastRunAt:!1,emitEvent:!1,emitRuntimeEvent:!0})})}_resetForChatChange(){let e=tr(),r=fx(e);it.info("\u804A\u5929\u5207\u6362",{from:this._currentChatId,to:r}),this._currentChatId=r,this._pendingTimers.forEach(n=>clearTimeout(n)),this._pendingTimers.clear(),this._slotQueues.clear(),this._recentlyProcessedSlots.clear(),this._ownWriteMessageIds.clear(),this._cancelActiveTransactions("chat_changed"),this._activeTransactions.clear(),this._isProcessing=!1,this._messageReceivedThrottleUntil=0,this._seedKnownSlots()}_clearMessageState(e){if(e){for(let[r,n]of this._pendingTimers)(r.includes(`::${e}::`)||r.startsWith(`msg::${e}::`))&&(clearTimeout(n),this._pendingTimers.delete(r));for(let r of this._recentlyProcessedSlots.keys())r.startsWith(`${e}::`)&&this._recentlyProcessedSlots.delete(r);this._ownWriteMessageIds.delete(Ae(e)),this._seedKnownSlots()}}_getAutomationSettings(){let e=Tt.getSettings()?.automation||{},r=Number.isFinite(e.settleMs)?e.settleMs:RC;return{settleMs:r,dedupeWindowMs:Number.isFinite(e.dedupeWindowMs)?e.dedupeWindowMs:Math.max(5e3,r+600)}}_getSettleMs(){return this._getAutomationSettings().settleMs}_getDedupeWindowMs(){return this._getAutomationSettings().dedupeWindowMs}},bx=new Bl,PC=bx});var _x={};he(_x,{BUILTIN_REGEX_PRESETS:()=>Kl,BUILTIN_WORLDBOOK_PRESETS:()=>wp,MIGRATION_BACKUP_KEY:()=>Sx,MIGRATION_DONE_KEY:()=>zl,default:()=>OC,ensurePresetSystem:()=>Tx,registerBuiltinPresets:()=>vp,runMigrationOnce:()=>Sp});function NC(t){if(!Array.isArray(t)||t.length===0)return null;let e=t.map(r=>String(r||"").trim()).filter(Boolean).sort().join("|");if(!e)return null;for(let r of Kl)if(r.rules.filter(s=>s.type==="include"&&s.enabled!==!1).map(s=>s.value).sort().join("|")===e)return r.id;return null}function vp(){try{typeof ld=="function"&&ld(Kl),typeof Lc=="function"&&Lc(wp),Rn.info("\u5185\u7F6E\u9884\u8BBE\u5DF2\u6CE8\u518C",{regex:Kl.length,worldbook:wp.length})}catch(t){Rn.error("\u6CE8\u518C\u5185\u7F6E\u9884\u8BBE\u5931\u8D25",{error:t})}}function $C(t){let e=new Set,r=[];for(let n of Array.isArray(t)?t:[]){let s=String(n||"").trim();if(!(!s||e.has(s)))if(e.add(s),s.startsWith("regex:")){let o=s.slice(6).trim();o&&r.push({type:"regex_include",value:o,enabled:!0,name:"",description:""})}else r.push({type:"include",value:s,enabled:!0,name:"",description:""})}return r}function LC(t,e,r){let n=JSON.parse(JSON.stringify(r||{})),s=!1,o=n.extraction||{};if(!o.regexPresetId){let i=Array.isArray(o.selectors)?o.selectors:[];if(i.length>0){let l=NC(i);if(l)o.regexPresetId=l,s=!0,Rn.info(`\u5DE5\u5177 ${t} \u7ED1\u5B9A\u5185\u7F6E\u6B63\u5219\u9884\u8BBE: ${l}`);else{let d=Ci({name:`${e||t}_\u8FC1\u79FB_\u6B63\u5219`,description:`\u81EA\u8001\u7248\u672C selectors \u81EA\u52A8\u8FC1\u79FB\uFF08${i.length} \u9879\uFF09`,rules:$C(i),blacklist:[]});d?.id&&(o.regexPresetId=d.id,s=!0,Rn.info(`\u5DE5\u5177 ${t} \u521B\u5EFA\u8FC1\u79FB\u6B63\u5219\u9884\u8BBE: ${d.id}`))}n.extraction=o}}let a=n.worldbooks||{};if(!a.presetId&&a.enabled===!0&&Array.isArray(a.selected)&&a.selected.length>0){let i=ui({name:`${e||t}_\u8FC1\u79FB_\u4E16\u754C\u4E66`,description:`\u81EA\u8001\u7248\u672C worldbooks.selected \u81EA\u52A8\u8FC1\u79FB\uFF08${a.selected.length} \u672C\uFF09`,bindingMode:"custom",includeDisabled:!1,bookList:a.selected.map(l=>({bookName:String(l||""),enabled:!0,entryOverrides:{}})).filter(l=>l.bookName)});i?.id&&(a.presetId=i.id,s=!0,Rn.info(`\u5DE5\u5177 ${t} \u521B\u5EFA\u8FC1\u79FB\u4E16\u754C\u4E66\u9884\u8BBE: ${i.id}`)),n.worldbooks=a}return s?n:null}function Sp(){try{if(Fe.get(zl)===!0)return{skipped:!0,reason:"already_done"};let t=j.get(vx)||{};if(!t||typeof t!="object")return Rn.info("\u65E0\u5DE5\u5177\u914D\u7F6E\u9700\u8981\u8FC1\u79FB"),Fe.set(zl,!0),{skipped:!0,reason:"no_configs"};Fe.set(Sx,{ts:Date.now(),version:"v45",snapshot:t});let e=0,r={...t};for(let[n,s]of Object.entries(t)){if(!s||typeof s!="object")continue;let o=LC(n,s.name,s);o&&(r[n]=o,e+=1)}return e>0&&j.set(vx,r),Fe.set(zl,!0),Rn.info("\u8FC1\u79FB\u5B8C\u6210",{migratedCount:e,total:Object.keys(t).length}),{skipped:!1,migratedCount:e,total:Object.keys(t).length}}catch(t){return Rn.error("\u8FC1\u79FB\u5931\u8D25\uFF0C\u5DF2 abort\uFF0C\u8001\u5B57\u6BB5\u4FDD\u7559",{error:t}),{skipped:!1,error:t?.message||String(t),aborted:!0}}}function Tx(){return vp(),Sp()}var Rn,zl,Sx,vx,Kl,wp,OC,Ex=O(()=>{Je();Z();dn();Rs();Rn=$.createScope("PresetBootstrap"),zl="migration_v45_done",Sx="migration_v45_backup",vx="tool_configs",Kl=[{id:"builtin_regex_summary",name:"\u5185\u7F6E \xB7 \u603B\u7ED3\u63D0\u53D6",description:"\u63D0\u53D6 <boo_FM> \u6807\u7B7E\u5185\u5BB9\uFF08\u5BF9\u5E94\u5185\u7F6E\u300C\u8BB0\u5FC6\u538B\u7F29\u300D\u5DE5\u5177\uFF09",rules:[{id:"r_builtin_summary_1",type:"include",value:"boo_FM",enabled:!0,name:"\u603B\u7ED3\u6807\u7B7E",description:""}],blacklist:[]},{id:"builtin_regex_status_block",name:"\u5185\u7F6E \xB7 \u72B6\u6001\u680F\u63D0\u53D6",description:"\u63D0\u53D6 <status_block> \u6807\u7B7E\u5185\u5BB9\uFF08\u5BF9\u5E94\u5185\u7F6E\u300C\u72B6\u6001\u680F\u300D\u5DE5\u5177\uFF09",rules:[{id:"r_builtin_status_1",type:"include",value:"status_block",enabled:!0,name:"\u72B6\u6001\u6807\u7B7E",description:""}],blacklist:[]},{id:"builtin_regex_youyou",name:"\u5185\u7F6E \xB7 \u4F18\u4F18\u9510\u8BC4\u63D0\u53D6",description:"\u63D0\u53D6 <youyou> \u6807\u7B7E\u5185\u5BB9\uFF08\u5BF9\u5E94\u5185\u7F6E\u300C\u4F18\u4F18\u9510\u8BC4\u300D\u5DE5\u5177\uFF09",rules:[{id:"r_builtin_youyou_1",type:"include",value:"youyou",enabled:!0,name:"\u4F18\u4F18\u6807\u7B7E",description:""}],blacklist:[]}],wp=[];OC={registerBuiltinPresets:vp,runMigrationOnce:Sp,ensurePresetSystem:Tx}});var B,To,Ax,Tp,_o=O(()=>{B="yyt-fab-v1",To="__yytFloatingBallCleanup_v1",Ax="floatingBall",Tp="position"});function Cx(){return`
    #${B} {
      position: fixed !important;
      z-index: 9998 !important;
      width: 52px; height: 52px;
      font-family: 'Microsoft YaHei', 'PingFang SC', sans-serif;
      user-select: none; -webkit-user-select: none; touch-action: auto;
      transform: translateZ(0);
      animation: ${B}-pop 0.22s cubic-bezier(0.34, 1.3, 0.64, 1) both;
    }
    #${B}.is-hidden { display: none !important; }

    @keyframes ${B}-pop {
      from { opacity: 0; transform: scale(0.5); }
      to   { opacity: 1; transform: scale(1); }
    }
    @keyframes ${B}-spin {
      from { transform: rotate(0deg); }
      to   { transform: rotate(360deg); }
    }
    @keyframes ${B}-twinkle {
      0%, 100% { opacity: 0.2; transform: scale(0.7); }
      50%      { opacity: 1;   transform: scale(1.15); }
    }

    #${B} .orb {
      position: absolute; top: 0; left: 0;
      width: 52px; height: 52px; border-radius: 14px; cursor: pointer; z-index: 2;
      background: linear-gradient(180deg, rgba(36, 36, 36, 0.88), rgba(8, 8, 8, 0.92));
      backdrop-filter: blur(18px) saturate(135%) brightness(0.78);
      -webkit-backdrop-filter: blur(18px) saturate(135%) brightness(0.78);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.48), 0 0 18px rgba(123, 183, 255, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.13);
      display: flex; align-items: center; justify-content: center;
      transition: background 0.2s, box-shadow 0.2s, transform 0.2s;
      border: none; padding: 0; color: var(--yyt-text, #f2f2f2);
      -webkit-tap-highlight-color: transparent;
    }
    #${B} .orb:hover {
      background: linear-gradient(180deg, rgba(58, 58, 58, 0.92), rgba(14, 14, 14, 0.95));
      box-shadow: 0 8px 30px rgba(123, 183, 255, 0.28), 0 6px 26px rgba(0, 0, 0, 0.52), inset 0 1px 0 rgba(255, 255, 255, 0.16);
      transform: scale(1.08);
    }
    #${B} .orb-emoji { transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); display: block; }
    #${B} .orb:hover .orb-emoji { transform: scale(1.16); }
    #${B}.is-open .orb-emoji { transform: rotate(18deg) scale(1.1); }

    #${B} .orb-badge {
      position: absolute; top: -5px; right: -5px; min-width: 20px; height: 20px;
      background: var(--yyt-accent, #7bb7ff); color: #0a0d13;
      font-size: 11px; font-weight: 800; border-radius: 10px;
      display: flex; align-items: center; justify-content: center;
      padding: 0 5px; box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
      opacity: 0; transform: scale(0);
      transition: all 0.2s cubic-bezier(0.22, 1, 0.36, 1);
      font-family: 'Consolas', 'Monaco', monospace; pointer-events: none;
    }
    #${B} .orb-badge.has-count { opacity: 1; transform: scale(1); }

    /* \u2500\u2500\u2500 \u624B\u673A\u5916\u58F3 \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
    #${B} .menu {
      position: absolute; width: 300px; pointer-events: none;
      transform: scale(0.92) translateY(-4px); opacity: 0;
      transition: transform 0.22s cubic-bezier(0.34, 1.3, 0.64, 1), opacity 0.18s ease;
      will-change: opacity, transform;
    }
    @media (max-width: 768px) {
      #${B} .menu { width: min(280px, calc(100vw - 28px)); }
    }
    #${B}.is-open .menu { pointer-events: all; transform: scale(1) translateY(0); opacity: 1; }
    #${B}.is-open-up .menu { transform: scale(0.92) translateY(4px); }
    #${B}.is-open.is-open-up .menu { transform: scale(1) translateY(0); }

    #${B} .menu-shell {
      position: relative;
      border-radius: 36px;
      padding: 8px;
      background: linear-gradient(160deg, #2c2c2e 0%, #1a1a1c 50%, #0a0a0c 100%);
      box-shadow:
        0 20px 50px rgba(0, 0, 0, 0.7),
        0 0 0 1px rgba(255, 255, 255, 0.06),
        inset 0 0 0 1px rgba(255, 255, 255, 0.04),
        inset 0 2px 0 rgba(255, 255, 255, 0.08);
      isolation: isolate;
      transform: translateZ(0);
    }

    /* \u7269\u7406\u6309\u952E\u63CF\u8FB9 (\u53F3\u4E0A\u7535\u6E90\u3001\u5DE6\u4E0A\u97F3\u91CF) */
    #${B} .menu-shell::before {
      content: '';
      position: absolute; right: -2px; top: 84px;
      width: 3px; height: 56px;
      background: linear-gradient(90deg, #2a2a2c, #1a1a1c);
      border-radius: 0 2px 2px 0;
    }
    #${B} .menu-shell::after {
      content: '';
      position: absolute; left: -2px; top: 70px;
      width: 3px; height: 32px;
      background: linear-gradient(270deg, #2a2a2c, #1a1a1c);
      border-radius: 2px 0 0 2px;
      box-shadow: 0 44px 0 0 #1a1a1c, 0 44px 0 1px rgba(0,0,0,0.4);
    }

    /* \u5C4F\u5E55\u533A\u57DF (\u9ED1\u8272\u73BB\u7483\uFF0C\u5706\u89D2\u5185\u5D4C) */
    #${B} .phone-screen {
      position: relative;
      border-radius: 30px;
      background: linear-gradient(180deg, #0d0e12 0%, #14151a 100%);
      overflow: hidden;
      min-height: 380px;
      max-height: 70vh;
      display: flex; flex-direction: column;
    }

    /* notch (\u52A8\u6001\u5C9B\u98CE\u683C) */
    #${B} .phone-notch {
      position: absolute; top: 8px; left: 50%; transform: translateX(-50%);
      width: 70px; height: 18px;
      background: #000;
      border-radius: 12px;
      z-index: 3;
      box-shadow: inset 0 0 0 0.5px rgba(255,255,255,0.04);
    }
    #${B} .phone-notch::after {
      content: ''; position: absolute;
      right: 8px; top: 50%; transform: translateY(-50%);
      width: 4px; height: 4px; border-radius: 50%;
      background: radial-gradient(circle, #1a3a4a 30%, #0a1a2a 100%);
      box-shadow: 0 0 2px rgba(123,183,255,0.4);
    }

    /* \u72B6\u6001\u680F */
    #${B} .phone-statusbar {
      display: flex; justify-content: space-between; align-items: center;
      padding: 14px 22px 8px 22px;
      font-size: 11px; font-weight: 600;
      color: rgba(255,255,255,0.85);
      letter-spacing: 0.02em;
      flex-shrink: 0;
    }
    #${B} .phone-statusbar-left { display: flex; align-items: center; gap: 4px; }
    #${B} .phone-statusbar-right { display: flex; align-items: center; gap: 5px; }
    #${B} .phone-signal {
      display: inline-flex; align-items: flex-end; gap: 1.5px;
    }
    #${B} .phone-signal span {
      width: 2.5px; background: rgba(255,255,255,0.85); border-radius: 0.5px;
    }
    #${B} .phone-signal span:nth-child(1) { height: 3px; }
    #${B} .phone-signal span:nth-child(2) { height: 5px; }
    #${B} .phone-signal span:nth-child(3) { height: 7px; }
    #${B} .phone-signal span:nth-child(4) { height: 9px; }
    #${B} .phone-battery {
      width: 22px; height: 11px; border: 1px solid rgba(255,255,255,0.5);
      border-radius: 3px; padding: 1px; position: relative;
    }
    #${B} .phone-battery::after {
      content: ''; position: absolute; right: -3px; top: 3px;
      width: 1.5px; height: 4px; background: rgba(255,255,255,0.5);
      border-radius: 0 1px 1px 0;
    }
    #${B} .phone-battery-fill {
      height: 100%; background: rgba(255,255,255,0.85); border-radius: 1.5px;
    }

    /* \u5E94\u7528\u533A\u57DF */
    #${B} .phone-content {
      flex: 1;
      padding: 14px 14px 6px 14px;
      overflow-y: auto;
      overscroll-behavior: contain;
      scrollbar-width: none;
    }
    #${B} .phone-content::-webkit-scrollbar { display: none; }

    /* \u62D6\u62FD\u6293\u624B (\u4EE3\u66FF\u9876\u90E8 menu-head) */
    #${B} .phone-drag-handle {
      position: absolute; top: 0; left: 0; right: 0; height: 32px;
      cursor: grab; z-index: 4; -webkit-tap-highlight-color: transparent;
    }
    #${B} .phone-drag-handle:active { cursor: grabbing; }

    /* \u5173\u95ED\u6309\u94AE (\u53F3\u4E0A\u89D2\u5706\u5F62) */
    #${B} .menu-close {
      position: absolute; top: 36px; right: 16px;
      width: 22px; height: 22px; border-radius: 50%;
      background: rgba(255,255,255,0.08); border: none;
      color: rgba(255,255,255,0.55); font-size: 11px; padding: 0;
      cursor: pointer; z-index: 5;
      display: flex; align-items: center; justify-content: center;
      transition: all 0.15s;
    }
    #${B} .menu-close:hover {
      background: rgba(255,255,255,0.16); color: #fff; transform: scale(1.08);
    }

    /* \u5206\u7EC4\u6807\u9898 (\u8F7B\u91CF\u5316) */
    #${B} .phone-group-title {
      font-size: 10.5px; font-weight: 600;
      color: rgba(255,255,255,0.45);
      padding: 8px 6px 6px 6px; letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    /* \u56FE\u6807\u7F51\u683C */
    #${B} .phone-icon-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px 8px;
      padding: 4px 4px 14px 4px;
    }

    /* \u5355\u4E2A APP \u56FE\u6807 */
    #${B} .phone-app {
      display: flex; flex-direction: column; align-items: center; gap: 5px;
      cursor: pointer; -webkit-tap-highlight-color: transparent;
      transition: transform 0.15s;
    }
    #${B} .phone-app:active { transform: scale(0.92); }
    #${B} .phone-app.is-disabled { opacity: 0.4; cursor: not-allowed; filter: grayscale(0.6); }

    #${B} .phone-app-icon {
      position: relative;
      width: 48px; height: 48px;
      border-radius: 12px;
      display: flex; align-items: center; justify-content: center;
      font-size: 22px; line-height: 1;
      background: linear-gradient(140deg, #3a3d4a 0%, #1f2128 100%);
      box-shadow: 0 4px 12px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1);
      transition: all 0.2s ease;
      color: #fff;
    }
    #${B} .phone-app:hover .phone-app-icon {
      transform: translateY(-2px);
      box-shadow: 0 8px 18px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.15);
    }

    /* on \u6001: \u84DD\u8272\u53D1\u5149 */
    #${B} .phone-app.is-on .phone-app-icon {
      background: linear-gradient(140deg, #5b9bd9 0%, #3a6db5 100%);
      box-shadow:
        0 4px 16px rgba(123, 183, 255, 0.45),
        0 0 0 1px rgba(123, 183, 255, 0.3),
        inset 0 1px 0 rgba(255,255,255,0.2);
    }
    #${B} .phone-app.is-on .phone-app-icon::after {
      content: ''; position: absolute; inset: 0; border-radius: 12px;
      background: linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 50%);
      pointer-events: none;
    }

    #${B} .phone-app.is-missing .phone-app-icon { opacity: 0.5; }

    /* APP \u5185\u90E8\u56FE\u6807 (SVG \u6216 emoji) */
    #${B} .phone-app-icon svg { width: 24px; height: 24px; }

    /* badge \u7EA2\u70B9 */
    #${B} .phone-app-badge {
      position: absolute; top: -4px; right: -4px;
      min-width: 16px; height: 16px; padding: 0 4px;
      border-radius: 8px; background: #ff453a; color: #fff;
      font-size: 9.5px; font-weight: 700;
      display: flex; align-items: center; justify-content: center;
      line-height: 1; box-shadow: 0 1px 3px rgba(0,0,0,0.5);
      border: 1.5px solid #14151a;
    }

    /* APP \u6587\u5B57\u6807\u7B7E */
    #${B} .phone-app-label {
      font-size: 10.5px; line-height: 1.2;
      color: rgba(255,255,255,0.85);
      text-align: center; max-width: 60px;
      overflow: hidden; text-overflow: ellipsis;
      white-space: nowrap;
      text-shadow: 0 1px 2px rgba(0,0,0,0.4);
    }
    #${B} .phone-app.is-on .phone-app-label { color: #fff; font-weight: 600; }

    /* \u7A7A\u72B6\u6001 */
    #${B} .phone-empty {
      padding: 32px 16px; text-align: center; font-size: 11.5px;
      color: rgba(255,255,255,0.4);
    }

    /* dock \u533A */
    #${B} .phone-dock {
      margin: 4px 12px 8px 12px;
      padding: 10px 12px;
      background: rgba(255,255,255,0.06);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-radius: 22px;
      display: flex; justify-content: space-around; align-items: center;
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.08);
      flex-shrink: 0;
    }
    #${B} .phone-dock .phone-app-icon {
      width: 44px; height: 44px;
    }
    #${B} .phone-dock .phone-app-label { display: none; }

    /* home indicator */
    #${B} .phone-home-indicator {
      display: flex; justify-content: center; align-items: center;
      padding: 6px 0 8px 0;
      flex-shrink: 0;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
    }
    #${B} .phone-home-indicator::before {
      content: ''; display: block;
      width: 100px; height: 4px; border-radius: 2px;
      background: rgba(255,255,255,0.32);
      transition: background 0.15s, transform 0.15s;
    }
    #${B} .phone-home-indicator:hover::before {
      background: rgba(255,255,255,0.5);
    }
    #${B} .phone-home-indicator:active::before {
      transform: scaleX(0.85);
    }

    /* \u2500\u2500\u2500 Phase A1: App \u63A5\u7BA1 + \u89C6\u56FE\u6808 \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

    /* App \u63A5\u7BA1\u671F\u95F4\u7684 phoneContent \u5E03\u5C40\uFF08\u8986\u76D6\u9ED8\u8BA4 padding/scroll\uFF09 */
    #${B} .phone-content.is-app-active {
      padding: 0;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    /* App \u9876\u90E8 bar */
    #${B} .phone-app-topbar {
      display: flex; align-items: center;
      height: 40px; min-height: 40px;
      padding: 0 8px; gap: 6px;
      background: rgba(255, 255, 255, 0.03);
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
      flex-shrink: 0;
      position: relative;
      z-index: 2;
    }
    #${B} .phone-app-topbar-back {
      width: 30px; height: 30px;
      border-radius: 8px;
      background: transparent; border: none;
      display: flex; align-items: center; justify-content: center;
      cursor: pointer;
      color: rgba(255, 255, 255, 0.85);
      padding: 0;
      -webkit-tap-highlight-color: transparent;
      transition: background 0.15s, color 0.15s;
    }
    #${B} .phone-app-topbar-back:hover {
      background: rgba(255, 255, 255, 0.08);
      color: #fff;
    }
    #${B} .phone-app-topbar-back:active {
      background: rgba(255, 255, 255, 0.14);
    }
    #${B} .phone-app-topbar-title {
      flex: 1;
      text-align: center;
      font-size: 13px;
      font-weight: 600;
      color: rgba(255, 255, 255, 0.92);
      padding-right: 30px; /* \u4E0E\u5DE6\u4FA7\u8FD4\u56DE\u6309\u94AE\u7B49\u5BBD\uFF0C\u8BA9\u6807\u9898\u5C45\u4E2D */
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      letter-spacing: 0.01em;
    }

    /* App \u89C6\u56FE\u5BB9\u5668 */
    #${B} .phone-app-view {
      flex: 1;
      min-height: 0;
      overflow-y: auto;
      overscroll-behavior: contain;
      scrollbar-width: none;
      position: relative;
      will-change: transform, opacity;
    }
    #${B} .phone-app-view::-webkit-scrollbar { display: none; }

    /* \u52A8\u753B */
    @keyframes ${B}-app-push-in {
      from { opacity: 0; transform: translateX(60%); }
      to   { opacity: 1; transform: translateX(0); }
    }
    @keyframes ${B}-app-pop-out {
      from { opacity: 1; transform: translateX(0); }
      to   { opacity: 0; transform: translateX(60%); }
    }
    #${B} .phone-app-view.is-pushing-in {
      animation: ${B}-app-push-in 240ms cubic-bezier(0.4, 0, 0.2, 1) both;
    }
    #${B} .phone-app-view.is-popping-out {
      animation: ${B}-app-pop-out 220ms cubic-bezier(0.4, 0, 0.2, 1) both;
    }
  `}var kx=O(()=>{_o()});function Ix(t){let r=(t||document).createElement("div");return r.id=B,r.innerHTML=`
    <button class="orb" id="${B}-orb" type="button" aria-label="YouYou \u5DE5\u5177\u7BB1\u6D6E\u7403">
      <svg class="orb-emoji" viewBox="0 0 24 24" width="30" height="30" aria-hidden="true">
        <defs>
          <linearGradient id="${B}-wand-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#ffffff" stop-opacity="0.95"/>
            <stop offset="100%" stop-color="#7bb7ff" stop-opacity="0.95"/>
          </linearGradient>
          <linearGradient id="${B}-handle-grad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#8a96b0"/>
            <stop offset="100%" stop-color="#d8e0ee"/>
          </linearGradient>
          <filter id="${B}-soft-glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="0.9" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        <line x1="5.5" y1="18.5" x2="14" y2="10" stroke="url(#${B}-handle-grad)" stroke-width="2.1" stroke-linecap="round"/>

        <g filter="url(#${B}-soft-glow)" style="transform-origin:15.5px 8.5px; animation: ${B}-spin 18s linear infinite;">
          <path d="M15.5 4 L16.5 7.5 L20 8.5 L16.5 9.5 L15.5 13 L14.5 9.5 L11 8.5 L14.5 7.5 Z"
                fill="url(#${B}-wand-grad)"/>
        </g>

        <circle cx="19.5" cy="5"  r="0.95" fill="#ffffff" opacity="0.85"
                style="animation: ${B}-twinkle 2.6s ease-in-out infinite;"/>
        <circle cx="20"   cy="13" r="0.7"  fill="#7bb7ff" opacity="0.85"
                style="animation: ${B}-twinkle 2.2s ease-in-out infinite 0.8s;"/>
        <circle cx="11"   cy="6"  r="0.6"  fill="#ffffff" opacity="0.7"
                style="animation: ${B}-twinkle 3.1s ease-in-out infinite 1.4s;"/>
      </svg>
      <span class="orb-badge" id="${B}-orb-badge">0</span>
    </button>

    <div class="menu" id="${B}-menu">
      <div class="menu-shell">
        <div class="phone-screen">
          <div class="phone-notch"></div>
          <div class="phone-drag-handle" id="${B}-drag-handle"></div>

          <div class="phone-statusbar">
            <div class="phone-statusbar-left">
              <span class="phone-time" id="${B}-time">9:41</span>
            </div>
            <div class="phone-statusbar-right">
              <div class="phone-signal" aria-hidden="true">
                <span></span><span></span><span></span><span></span>
              </div>
              <div class="phone-battery" aria-hidden="true">
                <div class="phone-battery-fill" style="width: 78%;"></div>
              </div>
            </div>
          </div>

          <button class="menu-close" id="${B}-close" type="button" aria-label="\u5173\u95ED\u83DC\u5355">\u2715</button>

          <div class="phone-content" id="${B}-content"></div>
          <div class="phone-dock" id="${B}-dock"></div>
          <div class="phone-home-indicator" aria-hidden="true"></div>
        </div>
      </div>
    </div>
  `,{root:r,orb:r.querySelector(`#${B}-orb`),menu:r.querySelector(`#${B}-menu`),phoneScreen:r.querySelector(".phone-screen"),phoneContent:r.querySelector(`#${B}-content`),phoneDock:r.querySelector(`#${B}-dock`),phoneTime:r.querySelector(`#${B}-time`),dragHandle:r.querySelector(`#${B}-drag-handle`),menuClose:r.querySelector(`#${B}-close`),badge:r.querySelector(`#${B}-orb-badge`)}}function Rx(t,e,r){let n=t||document;if(n.getElementById(e))return null;let s=n.createElement("style");return s.id=e,s.textContent=r,(n.head||n.documentElement).appendChild(s),s}function Mx(t){let e=t||document;[B,`${B}-style`].forEach(r=>{let n=e.getElementById(r);n&&typeof n.remove=="function"&&n.remove()})}function Px(){let t=[];function e(n,s,o,a){if(!(!n||typeof n.addEventListener!="function"))try{n.addEventListener(s,o,a),t.push({target:n,event:s,handler:o,options:a})}catch{}}function r(){for(;t.length;){let{target:n,event:s,handler:o,options:a}=t.pop();try{n.removeEventListener(s,o,a)}catch{}}}return{on:e,removeAll:r}}function Nx(t){let e=t||window;return e.innerWidth<=768?{x:e.innerWidth-52-12,y:e.innerHeight-52-80}:{x:40,y:160}}function _p(t,e){let r=e||window;return{x:Math.max(4,Math.min(Number.isFinite(t?.x)?t.x:0,r.innerWidth-52-2)),y:Math.max(4,Math.min(Number.isFinite(t?.y)?t.y:0,r.innerHeight-52-2))}}function $x(t){let e=t instanceof Date?t:new Date,r=e.getHours(),n=String(e.getMinutes()).padStart(2,"0");return`${r}:${n}`}var Lx=O(()=>{_o()});function Dx({root:t,orb:e,menuHead:r,targetDocument:n,targetWindow:s,on:o,savePosition:a,onTapWhenNotDragged:i,onDragMove:l}){let d=n||document,c=s||window,u=!1,y=!1,p=!1,m=0,g=0,h=0,b=0;function v(w,_,A){u=!0,y=!1,p=!!A,h=w,b=_;let I=t.getBoundingClientRect();m=w-I.left,g=_-I.top,t.style.transition="none"}function x(w,_){if(!u)return!1;if(!y){if(Math.hypot(w-h,_-b)<=5)return!1;y=!0}let A=Math.max(4,Math.min(w-m,c.innerWidth-52-2)),I=Math.max(4,Math.min(_-g,c.innerHeight-52-2));if(t.style.left=`${A}px`,t.style.top=`${I}px`,typeof l=="function")try{l({x:A,y:I})}catch{}return!0}function T(){if(u&&(u=!1,t.style.transition="",y&&typeof a=="function"))try{a({x:parseInt(t.style.left,10)||0,y:parseInt(t.style.top,10)||0})}catch{}}[{target:e,tapToggles:!0},{target:r,tapToggles:!1}].forEach(({target:w,tapToggles:_})=>{o(w,"mousedown",A=>{A.target?.closest?.(".menu-close")||(v(A.clientX,A.clientY,_),A.preventDefault())}),o(w,"touchstart",A=>{if(A.target?.closest?.(".menu-close"))return;let I=A.touches?.[0];I&&v(I.clientX,I.clientY,_)},{passive:!1})}),o(d,"mousemove",w=>x(w.clientX,w.clientY)),o(d,"mouseup",()=>T()),o(d,"touchmove",w=>{if(!u)return;let _=w.touches?.[0];_&&x(_.clientX,_.clientY)&&w.preventDefault()},{passive:!1}),o(d,"touchend",w=>{if(!u)return;let _=y,A=p;if(T(),!_&&A&&typeof i=="function"&&i(),p=!1,w.cancelable)try{w.preventDefault()}catch{}},{passive:!1});try{let w=c.parent?.document;w&&w!==d&&(o(w,"mousemove",_=>x(_.clientX,_.clientY)),o(w,"mouseup",()=>T()))}catch{}return o(e,"click",()=>{if(y){y=!1;return}typeof i=="function"&&i()}),{isDragging:()=>u,consumeDragMoved:()=>{let w=y;return y=!1,w}}}var Bx=O(()=>{_o()});function Kx({root:t,menu:e,targetWindow:r,onOpen:n,onClose:s}){let o=r||window,a=!1;function i(){let u=parseInt(t.style.left,10)||0,y=parseInt(t.style.top,10)||0;u<o.innerWidth/2?(e.style.left="0",e.style.right="auto"):(e.style.left="auto",e.style.right="0"),o.innerHeight-y-64<480&&y>480/2?(e.style.top="auto",e.style.bottom=`${56}px`,t.classList.add("is-open-up"),e.style.transformOrigin=u<o.innerWidth/2?"bottom left":"bottom right"):(e.style.top=`${56}px`,e.style.bottom="auto",t.classList.remove("is-open-up"),e.style.transformOrigin=u<o.innerWidth/2?"top left":"top right")}function l(){if(!a&&(a=!0,i(),t.classList.add("is-open"),typeof n=="function"))try{n()}catch{}}function d(){if(a&&(a=!1,t.classList.remove("is-open","is-open-up"),typeof s=="function"))try{s()}catch{}}function c(){a?d():l()}return{open:l,close:d,toggle:c,isOpen:()=>a,updateDirection:i}}function Ep(t){let e=[],r=[];for(let a of t)if(!(!a||typeof a!="object")){if(typeof a.visible=="function")try{if(!a.visible())continue}catch{continue}a.dock===!0?e.push(a):r.push(a)}e.sort((a,i)=>(a.order??100)-(i.order??100));let n=new Map,s=[];for(let a of r){let i=String(a.group||"_default");n.has(i)?a.groupTitle&&!n.get(i).groupTitle&&(n.get(i).groupTitle=a.groupTitle):(n.set(i,{groupId:i,groupTitle:a.groupTitle||(i==="_default"?"":i),items:[]}),s.push(i)),n.get(i).items.push(a)}for(let a of n.values())a.items.sort((i,l)=>(i.order??100)-(l.order??100));return{screenGroups:s.map(a=>n.get(a)),dockItems:e}}function Ka(t){return String(t??"").replace(/[&<>"']/g,e=>BC[e])}function Fx(t,{groupTitle:e},r){let n=t.createDocumentFragment();if(e){let o=t.createElement("div");o.className="phone-group-title",o.textContent=e,n.appendChild(o)}let s=t.createElement("div");return s.className="phone-icon-grid",r.forEach(o=>s.appendChild(o)),n.appendChild(s),n}function Ap(t,e="\u6682\u65E0\u83DC\u5355\u9879"){let r=t.createElement("div");return r.className="phone-empty",r.textContent=e,r}var BC,Cp=O(()=>{_o();BC={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}});function Ux({onChange:t,onRefresh:e}){let r=new Map;function n(){if(typeof t=="function")try{t()}catch{}}function s(p){if(typeof e=="function")try{e(p)}catch{}}function o(p){return!p||typeof p!="object"?"\u9879\u5FC5\u987B\u662F\u5BF9\u8C61":!p.id||typeof p.id!="string"?"\u9879\u5FC5\u987B\u5305\u542B\u5B57\u7B26\u4E32 id":!p.label||typeof p.label!="string"?"\u9879\u5FC5\u987B\u5305\u542B\u5B57\u7B26\u4E32 label":p.kind&&!["toggle","button","slider","labelValue","custom","app"].includes(p.kind)?`\u672A\u77E5 kind: ${p.kind}`:p.kind==="custom"&&typeof p.render!="function"?"kind=custom \u5FC5\u987B\u63D0\u4F9B render \u51FD\u6570":null}function a(p){let m=o(p);if(m)throw new Error(`[FloatingBall] registerItem \u5931\u8D25: ${m}`);if(r.has(p.id)){let g=r.get(p.id);if(typeof g.destroy=="function")try{g.destroy()}catch{}}return r.set(p.id,{kind:"toggle",order:100,dock:!1,...p}),n(),()=>i(p.id)}function i(p){let m=r.get(p);if(!m)return!1;if(typeof m.destroy=="function")try{m.destroy()}catch{}return r.delete(p),n(),!0}function l(p,m){let g=r.get(p);return g?(r.set(p,{...g,...m}),n(),!0):!1}function d(p){if(p===void 0)for(let m of r.keys())s(m);else s(p)}function c(){return Array.from(r.values())}function u(p){return r.get(p)||null}function y(){for(let p of r.values())if(typeof p.destroy=="function")try{p.destroy()}catch{}r.clear()}return{registerItem:a,unregisterItem:i,updateItem:l,refresh:d,getAll:c,getItem:u,destroyAll:y}}function kp(){let t=Promise.resolve();function e(r){return t=t.catch(()=>{}).then(async()=>await r()),t}return{run:e}}function zC(t){return t&&Array.from(String(t))[0]||"\xB7"}function Fl(t,e,r){let n={...r,item:e};switch(e.kind){case"custom":return WC(t,e,n);case"app":case"slider":case"labelValue":case"button":case"toggle":default:return KC(t,e,n)}}function KC(t,e,r){let n=t.createElement("div");n.className="phone-app",n.setAttribute("data-id",e.id),n.setAttribute("data-kind",e.kind||"toggle"),e.radioGroup&&n.setAttribute("data-radio-group",e.radioGroup);let s=jC(e),o=Ka(e.label);n.innerHTML=`
    <div class="phone-app-icon" ${e.iconColor?`style="background: ${Ka(e.iconColor)}"`:""}>
      ${s}
      <span class="phone-app-badge" style="display:none;"></span>
    </div>
    <div class="phone-app-label">${o}</div>
  `;let a=n.querySelector(".phone-app-icon"),i=n.querySelector(".phone-app-badge"),l=n.querySelector(".phone-app-label");function d(){let c="off";if(typeof e.getState=="function")try{c=e.getState()||"off"}catch{c="off"}else e.kind==="button"&&(c="off");if((e.kind==="toggle"||typeof e.getState=="function")&&(n.classList.toggle("is-on",c==="on"),n.classList.toggle("is-missing",c==="missing")),e.kind==="labelValue"){let y="";if(typeof e.value=="function")try{y=e.value()}catch{y=""}else e.value!==void 0&&(y=e.value);y!==""&&y!=null?l.textContent=`${e.label} \xB7 ${y}`:l.textContent=e.label}HC(e,i);let u=typeof e.disabled=="function"?UC(e.disabled,!1):!!e.disabled;n.classList.toggle("is-disabled",u)}return n.addEventListener("click",c=>{if(!n.classList.contains("is-disabled")){if(c.stopPropagation(),typeof e.onClick!="function"&&e.kind==="slider"){if(typeof e.onChange=="function"){let u=Number.isFinite(e.step)?Number(e.step):1,y=FC(e),p=Number.isFinite(e.max)?Number(e.max):100,m=Number.isFinite(e.min)?Number(e.min):0,g=y+u;g>p&&(g=m),r.mutex.run(async()=>{try{await e.onChange({...r,value:g})}catch(h){r.logger?.error?.(`\u9879 ${e.id} onChange \u5F02\u5E38: ${h?.message||h}`,h)}finally{d()}})}return}typeof e.onClick=="function"?r.mutex.run(async()=>{try{await e.onClick(r)}catch(u){r.logger?.error?.(`\u9879 ${e.id} onClick \u5F02\u5E38: ${u?.message||u}`,u)}finally{d()}}):r.logger?.warn?.(`\u9879 ${e.id} (${e.kind}) \u672A\u63D0\u4F9B onClick`)}}),d(),{el:n,sync:d}}function FC(t){if(typeof t.value=="function")try{return Number(t.value())||0}catch{return 0}return Number.isFinite(t.value)?Number(t.value):0}function UC(t,e){try{return!!t()}catch{return e}}function jC(t){if(typeof t.icon=="string"&&t.icon.trim()){let e=t.icon.trim();return e.startsWith("<svg")||e.startsWith("<SVG")?e:Ka(e)}return Ka(zC(t.label))}function WC(t,e,r){let n=t.createElement("div");n.className="phone-app phone-app-custom",n.setAttribute("data-id",e.id);let s=null;try{s=e.render(r)}catch(a){r.logger?.error?.(`custom \u9879 ${e.id} render \u5F02\u5E38: ${a?.message||a}`,a),s=t.createTextNode(`[\u6E32\u67D3\u5931\u8D25: ${e.id}]`)}s&&typeof s.nodeType=="number"?n.appendChild(s):s!=null&&(n.innerHTML=String(s));function o(){if(typeof e.onSync=="function")try{e.onSync({...r,container:n})}catch{}}return{el:n,sync:o}}function HC(t,e){if(!e)return;if(typeof t.badge!="function"){e.style.display="none";return}let r=null;try{r=t.badge()}catch{r=null}if(r==null||r===""||r===0||r==="0"){e.style.display="none",e.textContent="";return}e.style.display="",e.textContent=String(r)}var jx=O(()=>{Cp()});function Hx({targetDoc:t,mountPoint:e,mutex:r,storage:n,logger:s,closeMenu:o,onAppOpened:a,onAppClosed:i}){if(!t)throw new Error("createAppController: targetDoc \u5FC5\u586B");if(!e)throw new Error("createAppController: mountPoint \u5FC5\u586B");if(!r||typeof r.run!="function")throw new Error("createAppController: mutex \u5FC5\u586B");let l=new Map,d=[],c=null,u=null,y=null,p=null;function m(L){return s&&typeof s.createScope=="function"?s.createScope(`App:${L}`):s}function g(L){return n&&typeof n.namespace=="function"?n.namespace(`apps:${L}`):n}function h(L){return{appId:L,pushView:z,popView:J,replaceView:de,closeApp:te,closeMenu:()=>{try{o?.()}catch{}},storage:g(L),logger:m(L),get isOpen(){return c===L},getStackDepth:()=>d.length}}function b(){u||(u=t.createElement("div"),u.className=qC,y=t.createElement("button"),y.type="button",y.className=GC,y.setAttribute("aria-label","\u8FD4\u56DE"),y.innerHTML=QC,y.addEventListener("click",L=>{L.stopPropagation(),J()}),p=t.createElement("div"),p.className=YC,u.appendChild(y),u.appendChild(p))}function v(L){if(!u||!p||!y)return;let ne=l.get(c),X=L&&L.title||ne&&(ne.title||ne.label)||"";p.textContent=X;let ce=L&&typeof L.showBackButton=="boolean"?L.showBackButton:d.length>1;y.style.visibility=ce?"visible":"hidden"}function x(L,ne){let X=null;try{X=L.render(ne)}catch(rt){s?.error?.(`view ${L?.id||"?"} render \u5F02\u5E38: ${rt?.message||rt}`,rt);let Nt=t.createElement("div");Nt.style.cssText="padding:24px;color:#ff6b6b;font-size:12px;",Nt.textContent=`[\u6E32\u67D3\u5931\u8D25: ${L?.id||"unknown"}]`,X=Nt}if(!X||typeof X.nodeType!="number"){let rt=t.createElement("div");rt.style.cssText="padding:24px;color:rgba(255,255,255,0.6);font-size:12px;",rt.textContent=`[render \u672A\u8FD4\u56DE DOM Node: ${L?.id||"unknown"}]`,X=rt}let ce=t.createElement("div");return ce.className=VC,L?.id&&ce.setAttribute("data-view-id",String(L.id)),ce.appendChild(X),ce}function T(L){return new Promise(ne=>{let X=!1,ce=()=>{X||(X=!0,L.removeEventListener("animationend",rt),ne())},rt=()=>ce();L.addEventListener("animationend",rt),setTimeout(ce,400)})}async function E(L){L.classList.add(Wx),await T(L),L.classList.remove(Wx)}async function w(L){L.classList.add(JC),await T(L)}function _(L,ne){if(typeof L?.onLeave=="function")try{L.onLeave(ne)}catch(X){s?.error?.(`view ${L?.id} onLeave \u5F02\u5E38: ${X?.message||X}`,X)}}function A(L,ne){if(typeof L?.onEnter=="function")try{L.onEnter(ne)}catch(X){s?.error?.(`view ${L?.id} onEnter \u5F02\u5E38: ${X?.message||X}`,X)}}function I(L){if(typeof L?.destroy=="function")try{L.destroy()}catch(ne){s?.error?.(`view ${L?.id} destroy \u5F02\u5E38: ${ne?.message||ne}`,ne)}}function P(L){L&&L.parentNode&&L.parentNode.removeChild(L)}function C(L){return!L||typeof L!="object"?"App \u5FC5\u987B\u662F\u5BF9\u8C61":!L.id||typeof L.id!="string"?"App \u5FC5\u987B\u5305\u542B\u5B57\u7B26\u4E32 id":!L.label||typeof L.label!="string"?"App \u5FC5\u987B\u5305\u542B\u5B57\u7B26\u4E32 label":!L.rootView||typeof L.rootView!="object"?"App \u5FC5\u987B\u5305\u542B rootView \u5BF9\u8C61":typeof L.rootView.render!="function"?"rootView.render \u5FC5\u987B\u662F\u51FD\u6570":null}function N(L){let ne=C(L);if(ne)throw new Error(`[FloatingBall] registerApp \u5931\u8D25: ${ne}`);l.has(L.id)&&c===L.id&&te(),l.set(L.id,{...L}),s?.log?.(`App \u5DF2\u6CE8\u518C: ${L.id}`)}function W(L){return l.has(L)?(c===L&&te(),l.delete(L),s?.log?.(`App \u5DF2\u5378\u8F7D: ${L}`),!0):!1}function H(L){return r.run(async()=>{let ne=l.get(L);if(!ne)return s?.warn?.(`openApp: \u627E\u4E0D\u5230 App ${L}`),!1;if(c===L)return!0;for(c&&await ee(),c=L;e.firstChild;)e.removeChild(e.firstChild);e.classList.add(Ip),b(),e.appendChild(u);let X=h(L);if(typeof ne.onOpen=="function")try{ne.onOpen(X)}catch(Nt){s?.error?.(`App ${L} onOpen \u5F02\u5E38: ${Nt?.message||Nt}`,Nt)}let ce=ne.rootView,rt=x(ce,X);e.appendChild(rt),d.push({view:ce,container:rt}),v(ce),await E(rt),A(ce,X);try{a?.(L)}catch{}return s?.log?.(`App \u6253\u5F00: ${L}`),!0})}async function ee(){if(!c)return;let L=c,ne=l.get(L),X=h(L);for(;d.length>0;){let ce=d.pop();_(ce.view,X),I(ce.view),P(ce.container)}if(ne&&typeof ne.onClose=="function")try{ne.onClose(X)}catch(ce){s?.error?.(`App ${L} onClose \u5F02\u5E38: ${ce?.message||ce}`,ce)}u&&P(u),e.classList.remove(Ip),c=null;try{i?.(L)}catch{}s?.log?.(`App \u5173\u95ED: ${L}`)}function te(){return r.run(async()=>c?(await ee(),!0):!1)}function z(L){return r.run(async()=>{if(!c)return s?.warn?.("pushView: \u5F53\u524D\u65E0\u6D3B\u8DC3 App"),!1;if(!L||typeof L.render!="function")return s?.warn?.("pushView: view.render \u5FC5\u987B\u662F\u51FD\u6570"),!1;let ne=h(c),X=d[d.length-1];X&&(_(X.view,ne),I(X.view),P(X.container));let ce=x(L,ne);return e.appendChild(ce),d.push({view:L,container:ce}),v(L),await E(ce),A(L,ne),!0})}function J(){return r.run(async()=>{if(!c)return s?.warn?.("popView: \u5F53\u524D\u65E0\u6D3B\u8DC3 App"),!1;if(d.length<=1)return await ee(),!0;let L=h(c),ne=d[d.length-1];ne.container&&await w(ne.container),_(ne.view,L),I(ne.view),P(ne.container),d.pop();let X=d[d.length-1],ce=x(X.view,L);return e.appendChild(ce),X.container=ce,v(X.view),A(X.view,L),!0})}function de(L){return r.run(async()=>{if(!c)return s?.warn?.("replaceView: \u5F53\u524D\u65E0\u6D3B\u8DC3 App"),!1;if(!L||typeof L.render!="function")return s?.warn?.("replaceView: view.render \u5FC5\u987B\u662F\u51FD\u6570"),!1;let ne=h(c),X=d[d.length-1];X&&(_(X.view,ne),I(X.view),P(X.container),d.pop());let ce=x(L,ne);return e.appendChild(ce),d.push({view:L,container:ce}),v(L),A(L,ne),!0})}function Q(){return c!==null}function He(){return d.length}function Ce(){return c?l.get(c):null}function ze(){if(c){let L=c,ne=l.get(L),X=h(L);for(;d.length>0;){let ce=d.pop();_(ce.view,X),I(ce.view),P(ce.container)}if(ne&&typeof ne.onClose=="function")try{ne.onClose(X)}catch{}u&&P(u),e.classList.remove(Ip),c=null}l.clear(),u=null,y=null,p=null}return{registerApp:N,unregisterApp:W,openApp:H,closeApp:te,pushView:z,popView:J,replaceView:de,hasActiveApp:Q,getStackDepth:He,getActiveApp:Ce,destroyAll:ze}}var qC,GC,YC,VC,Wx,JC,Ip,QC,qx=O(()=>{qC="phone-app-topbar",GC="phone-app-topbar-back",YC="phone-app-topbar-title",VC="phone-app-view",Wx="is-pushing-in",JC="is-popping-out",Ip="is-app-active",QC=`
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
    <path d="M15 18 L9 12 L15 6" stroke="currentColor" stroke-width="2"
          stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  </svg>
`});function Rp(){let t=Math.random().toString(36).slice(2,10);return`${Date.now().toString(36)}-${t}`}function Gx({name:t,avatar:e,description:r}={}){let n=Date.now();return{id:`friend-${Rp()}`,name:t??"\u672A\u547D\u540D",avatar:e??"",description:r??"",globalPrompt:"",relations:{},source:"manual",createdAt:n,updatedAt:n}}function Yx({name:t}={}){let e=Date.now();return{id:`group-${Rp()}`,name:t??"\u672A\u547D\u540D\u7FA4",atmosphere:"",memberIds:[],perMemberPrompt:{},triggerSources:{userMessage:!1,heartbeat:{enabled:!1,intervalSec:600},tavernEvents:[]},mergeStrategy:"compound",injectConfig:{enabled:!1,timing:"one-shot",formatTemplate:"",formatExplanation:"",windowSize:20},rateLimitConfig:{perMinute:3,dailyLimit:null},phase1Config:{promptTemplate:"",parseRegex:""},heartbeatTemplate:"",failureConfig:{maxRetries:2},createdAt:e,updatedAt:e}}function Co({groupId:t,sender:e,content:r,type:n=Eo.TEXT,replyTo:s=null}={}){return{id:`msg-${Rp()}`,groupId:t??"",chatId:"",sender:e??Ao,content:r??"",timestamp:Date.now(),type:n,replyTo:s}}var Ul,Fa,Ua,Mn,Eo,Ao,Pn=O(()=>{Ul="qq",Fa="friends",Ua="groups",Mn="messagesByChat",Eo={TEXT:"text",IMAGE:"image",VOICE:"voice",REDPACKET:"redpacket",SYSTEM:"system"},Ao="user"});function jl(){try{let t=tr(),e=on(t),r=[e?.chatId,e?.chat_id,e?.chat_filename,e?.chatMetadata?.chatId,e?.chatMetadata?.chat_id,e?.chatMetadata?.file_name,e?.chatMetadata?.name,t?.chatId,t?.chat_id,t?.chat_filename];for(let s of r){let o=typeof s=="string"?s.trim():"";if(o)return o}let n=t?.this_chid;if(n!=null&&String(n).trim()!=="")return`chat_char_${String(n).trim()}`}catch{}return"default_chat"}function Mp(t){return Array.isArray(t)?t:[]}function ja(t){return t&&typeof t=="object"&&!Array.isArray(t)?t:{}}function Vx({storage:t,logger:e}={}){if(!t||typeof t.get!="function"||typeof t.set!="function")throw new Error("createQQStorage: storage \u5FC5\u586B");let r=e||{log(){},warn(){},error(){}};function n(){return Mp(t.get(Fa,[]))}function s(b){return n().find(v=>v&&v.id===b)||null}function o(b){if(!b||!b.id)return r.warn?.("addFriend: \u7F3A\u5C11 id"),null;let v=n();return v.some(x=>x&&x.id===b.id)?(r.warn?.(`addFriend: \u91CD\u590D id ${b.id}`),null):(v.push(b),t.set(Fa,v),b)}function a(b,v){let x=n(),T=x.findIndex(w=>w&&w.id===b);if(T<0)return null;let E={...x[T],...v,id:x[T].id,updatedAt:Date.now()};return x[T]=E,t.set(Fa,x),E}function i(b){let v=n(),x=v.filter(T=>T&&T.id!==b);return x.length===v.length?!1:(t.set(Fa,x),!0)}function l(){return Mp(t.get(Ua,[]))}function d(b){return l().find(v=>v&&v.id===b)||null}function c(b){if(!b||!b.id)return r.warn?.("addGroup: \u7F3A\u5C11 id"),null;let v=l();return v.some(x=>x&&x.id===b.id)?(r.warn?.(`addGroup: \u91CD\u590D id ${b.id}`),null):(v.push(b),t.set(Ua,v),b)}function u(b,v){let x=l(),T=x.findIndex(w=>w&&w.id===b);if(T<0)return null;let E={...x[T],...v,id:x[T].id,updatedAt:Date.now()};return x[T]=E,t.set(Ua,x),E}function y(b){let v=l(),x=v.filter(w=>w&&w.id!==b);if(x.length===v.length)return!1;t.set(Ua,x);let T=ja(t.get(Mn,{})),E=!1;for(let w of Object.keys(T))T[w]&&Object.prototype.hasOwnProperty.call(T[w],b)&&(delete T[w][b],E=!0);return E&&t.set(Mn,T),!0}function p(){return jl()}function m(b){let v=jl(),x=ja(t.get(Mn,{})),T=ja(x[v]);return Mp(T[b])}function g(b,v){if(!b)return r.warn?.("appendMessage: \u7F3A\u5C11 groupId"),null;if(!v||!v.id)return r.warn?.("appendMessage: \u7F3A\u5C11 message.id"),null;let x=jl(),T=ja(t.get(Mn,{}));T[x]||(T[x]={}),Array.isArray(T[x][b])||(T[x][b]=[]);let E={...v,groupId:b,chatId:x};return T[x][b].push(E),t.set(Mn,T),E}function h(b){let v=jl(),x=ja(t.get(Mn,{}));return x[v]&&Object.prototype.hasOwnProperty.call(x[v],b)?(delete x[v][b],t.set(Mn,x),!0):!1}return{listFriends:n,getFriend:s,addFriend:o,updateFriend:a,removeFriend:i,listGroups:l,getGroup:d,addGroup:c,updateGroup:u,removeGroup:y,getCurrentChatId:p,listMessages:m,appendMessage:g,clearMessages:h}}var Jx=O(()=>{Pn();Or()});var Wl,Hl,ql,ko,Gl,Wa,Yl,Vl,Ts=O(()=>{Wl=`\u4F60\u662F\u7FA4\u804A\u573A\u666F\u8C03\u5EA6\u5458\u3002\u57FA\u4E8E\u4EE5\u4E0B\u4FE1\u606F\uFF0C\u5224\u65AD\u5728\u672C\u8F6E\u7528\u6237\u6D88\u606F\u540E\u5E94\u5F53\u8BA9\u54EA\u4E9B NPC \u53D1\u8A00\u3002

\u7FA4\u6C1B\u56F4\uFF1A{{atmosphere}}

\u7FA4\u6210\u5458\u5217\u8868\uFF08id: \u540D\u5B57 \u2014 \u63CF\u8FF0\uFF09\uFF1A
{{members}}

\u6700\u8FD1\u804A\u5929\u8BB0\u5F55\uFF08\u6700\u591A 20 \u6761\uFF09\uFF1A
{{recentMessages}}

\u7528\u6237\u5F53\u524D\u6D88\u606F\uFF1A{{userMessage}}

\u8BF7\u7528 <call>friendId</call> \u6807\u6CE8\u672C\u8F6E\u8981\u53D1\u8A00\u7684 NPC\uFF0C\u53EF\u6807\u591A\u4E2A\u8868\u793A\u6309\u987A\u5E8F\u53D1\u8A00\uFF1B\u5982\u679C\u672C\u8F6E\u65E0\u4EBA\u53D1\u8A00\u5219\u4E0D\u8F93\u51FA\u4EFB\u4F55 <call>\u3002`,Hl="<call>([^<]+)</call>",ql=`\u4F60\u6B63\u5728\u626E\u6F14\u7FA4\u804A\u4E2D\u7684 NPC\u300C{{selfName}}\u300D\u3002

\u4EBA\u7269\u8BBE\u5B9A\uFF1A{{selfDescription}}

\u7FA4\u6C1B\u56F4\uFF1A{{atmosphere}}

\u6700\u8FD1\u804A\u5929\u8BB0\u5F55\uFF1A
{{recentMessages}}

\u8BF7\u4EE5\u300C{{selfName}}\u300D\u7684\u8EAB\u4EFD\u56DE\u590D\u4E00\u53E5\u8BDD\uFF08\u4E0D\u8981\u5E26\u89D2\u8272\u540D\u524D\u7F00\uFF0C\u76F4\u63A5\u8F93\u51FA\u5BF9\u767D\uFF09\u3002`,ko="qq:messages-appended",Gl="qq:phase-state",Wa="idle",Yl="thinking",Vl="error"});function Qx({qqStorage:t,logger:e,targetDoc:r}){let n=r||globalThis.document||document;return new Promise(s=>{let o=n.createElement("div");o.className="yyt-qq-friend-create-body";let a=n.createElement("div");a.className="yyt-form-row";let i=n.createElement("div");i.className="yyt-form-label",i.textContent="\u540D\u5B57";let l=n.createElement("input");l.type="text",l.className="yyt-input",l.placeholder="\u597D\u53CB\u540D\u5B57\uFF08\u5FC5\u586B\uFF0C\u6700\u591A 30 \u5B57\uFF09",l.maxLength=30,a.appendChild(i),a.appendChild(l),o.appendChild(a);let d=n.createElement("div");d.className="yyt-form-row";let c=n.createElement("div");c.className="yyt-form-label",c.textContent="\u63CF\u8FF0\uFF08\u4EBA\u8BBE\uFF09";let u=n.createElement("textarea");u.className="yyt-input",u.placeholder="\u7B80\u77ED\u63CF\u8FF0\u8FD9\u4E2A NPC \u7684\u6027\u683C / \u8BF4\u8BDD\u98CE\u683C / \u80CC\u666F",u.rows=4,u.style.resize="vertical",u.style.minHeight="80px",d.appendChild(c),d.appendChild(u),o.appendChild(d);let y=n.createElement("div");y.style.color="var(--yyt-danger, #f87171)",y.style.fontSize="12px",y.style.marginTop="6px",y.style.minHeight="14px",o.appendChild(y),we.custom({title:"\u65B0\u5EFA\u597D\u53CB",body:o,width:"420px",buttons:[{label:"\u53D6\u6D88",variant:"ghost",onClick:m=>m(null)},{label:"\u521B\u5EFA",variant:"primary",onClick:m=>{let g=String(l.value||"").trim(),h=String(u.value||"").trim();if(!g){y.textContent="\u540D\u5B57\u4E0D\u80FD\u4E3A\u7A7A",l.focus();return}try{let b=t.addFriend(Gx({name:g,description:h}));if(!b){y.textContent="\u521B\u5EFA\u5931\u8D25",e?.warn?.("[QQ FriendCreate] addFriend \u8FD4\u56DE\u7A7A");return}m(b)}catch(b){y.textContent=b?.message||"\u521B\u5EFA\u5F02\u5E38",e?.error?.(`[QQ FriendCreate] \u5F02\u5E38: ${b?.message||b}`,b)}}}],onMounted:()=>{try{l.focus()}catch{}}}).result.then(m=>s(m||null))})}var Xx=O(()=>{It();Pn()});function Zx(t,{label:e,value:r,rows:n,placeholder:s,onChange:o}){let a=t.createElement("div");a.className="yyt-form-row";let i=t.createElement("div");i.className="yyt-form-label",i.textContent=e,a.appendChild(i);let l=t.createElement("textarea");return l.className="yyt-input",l.rows=n||3,l.placeholder=s||"",l.value=String(r??""),l.style.resize="vertical",l.addEventListener("input",()=>o?.(l.value)),a.appendChild(l),{row:a,input:l}}function Pp(t,{label:e,value:r,placeholder:n,type:s,onChange:o}){let a=t.createElement("div");a.className="yyt-form-row";let i=t.createElement("div");i.className="yyt-form-label",i.textContent=e,a.appendChild(i);let l=t.createElement("input");return l.type=s||"text",l.className="yyt-input",l.placeholder=n||"",l.value=String(r??""),l.addEventListener("input",()=>o?.(l.value)),a.appendChild(l),{row:a,input:l}}function XC(t,{label:e,hint:r,checked:n,onChange:s}){let o=t.createElement("div");o.className="yyt-form-row",o.style.flexDirection="row",o.style.alignItems="center",o.style.justifyContent="space-between",o.style.gap="12px";let a=t.createElement("div");a.style.flex="1";let i=t.createElement("div");if(i.className="yyt-form-label",i.style.marginBottom="2px",i.textContent=e,a.appendChild(i),r){let d=t.createElement("div");d.style.cssText="font-size:11px;color:var(--yyt-text-secondary,#9aa0a8);line-height:1.4;",d.textContent=r,a.appendChild(d)}o.appendChild(a);let l=t.createElement("input");return l.type="checkbox",l.className="yyt-checkbox",l.checked=!!n,l.style.cssText="width:18px;height:18px;cursor:pointer;flex-shrink:0;",l.addEventListener("change",()=>s?.(l.checked)),o.appendChild(l),{row:o,input:l}}function Ha(t,e){let r=t.createElement("div");return r.style.cssText="font-size:12px;font-weight:600;color:var(--yyt-text-secondary,#9aa0a8);margin:8px 0 2px;text-transform:uppercase;letter-spacing:0.5px;",r.textContent=e,r}function ZC(t){let e=t.createElement("div");return e.style.cssText="color:var(--yyt-danger,#f87171);font-size:11.5px;margin-top:4px;min-height:14px;",e}function ew(t){try{return new RegExp(String(t||""),"g"),!0}catch{return!1}}async function e1({doc:t,friend:e,currentValue:r}){return new Promise(n=>{let s=t.createElement("div"),o=t.createElement("div");o.style.cssText="font-size:11.5px;color:var(--yyt-text-secondary,#9aa0a8);margin-bottom:8px;line-height:1.5;",o.textContent=`\u4E3A\u300C${e.name}\u300D\u7F16\u8F91\u4E13\u5C5E Phase 2 prompt\uFF08\u4E0D\u586B\u5219\u7528\u9ED8\u8BA4\u6A21\u677F\uFF09\u3002\u53EF\u7528\u5360\u4F4D\uFF1A{{atmosphere}} {{selfName}} {{selfDescription}} {{recentMessages}}`,s.appendChild(o);let a=t.createElement("textarea");a.className="yyt-input",a.rows=12,a.style.resize="vertical",a.style.minHeight="220px",a.style.fontFamily='ui-monospace, "SF Mono", Consolas, monospace',a.style.fontSize="12.5px",a.value=String(r||""),a.placeholder=ql,s.appendChild(a),we.custom({title:`\u4E13\u5C5E prompt - ${e.name}`,body:s,width:"560px",wide:!0,buttons:[{label:"\u6E05\u7A7A",variant:"ghost",onClick:()=>{a.value=""}},{label:"\u53D6\u6D88",variant:"ghost",onClick:l=>l({cancelled:!0})},{label:"\u4FDD\u5B58",variant:"primary",onClick:l=>l({cancelled:!1,value:a.value})}]}).result.then(l=>{!l||l.cancelled?n({cancelled:!0}):n({cancelled:!1,value:String(l.value||"")})})})}function tw({group:t,qqStorage:e,logger:r,targetDoc:n}){let s=n||globalThis.document||document;return new Promise(o=>{let a={atmosphere:String(t.atmosphere||""),userMessageEnabled:!!t?.triggerSources?.userMessage,phase1Prompt:String(t?.phase1Config?.promptTemplate||""),phase1Regex:String(t?.phase1Config?.parseRegex||""),perMinute:Number.isFinite(t?.rateLimitConfig?.perMinute)?t.rateLimitConfig.perMinute:6,maxRetries:Number.isFinite(t?.failureConfig?.maxRetries)?t.failureConfig.maxRetries:1,memberIds:Array.isArray(t.memberIds)?[...t.memberIds]:[],perMemberPrompt:{...t?.perMemberPrompt||{}}},i=null,l=s.createElement("div");l.style.cssText="display:flex;flex-direction:column;gap:10px;max-height:70vh;overflow-y:auto;padding-right:4px;",l.appendChild(Ha(s,"\u89E6\u53D1"));let d=XC(s,{label:"\u7528\u6237\u6D88\u606F\u89E6\u53D1",hint:"\u5728 ST \u4E3B\u804A\u5929\u6846\u53D1\u6D88\u606F\u65F6\uFF0C\u89E6\u53D1\u8BE5\u7FA4\u7684 Phase 1+2 \u94FE\u8DEF",checked:a.userMessageEnabled,onChange:A=>{a.userMessageEnabled=A}});l.appendChild(d.row),l.appendChild(Ha(s,"\u57FA\u672C"));let c=Zx(s,{label:"\u7FA4\u6C1B\u56F4",value:a.atmosphere,rows:3,placeholder:"\u63CF\u8FF0\u8FD9\u4E2A\u7FA4\u7684\u6C1B\u56F4/\u4E3B\u9898/\u80CC\u666F\uFF08\u5582\u7ED9 Phase 1 \u548C Phase 2\uFF09",onChange:A=>{a.atmosphere=A}});l.appendChild(c.row),l.appendChild(Ha(s,"Phase 1 \u2014 \u4E3B AI \u9009 NPC"));let u=Zx(s,{label:"Phase 1 prompt \u6A21\u677F\uFF08\u7559\u7A7A\u5219\u7528\u9ED8\u8BA4\uFF09",value:a.phase1Prompt,rows:8,placeholder:Wl,onChange:A=>{a.phase1Prompt=A}});u.input.style.fontFamily='ui-monospace, "SF Mono", Consolas, monospace',u.input.style.fontSize="12.5px",l.appendChild(u.row);let y=Pp(s,{label:"Phase 1 \u89E3\u6790\u6B63\u5219\uFF08\u9996\u4E2A\u6355\u83B7\u7EC4 = friend id\uFF09",value:a.phase1Regex,placeholder:Hl,onChange:A=>{a.phase1Regex=A,m()}});y.input.style.fontFamily='ui-monospace, "SF Mono", Consolas, monospace',l.appendChild(y.row);let p=ZC(s);l.appendChild(p);function m(){let A=String(a.phase1Regex||"");if(!A){p.textContent="",y.input.style.borderColor="",i&&(i.disabled=!1);return}ew(A)?(p.textContent="",y.input.style.borderColor="",i&&(i.disabled=!1)):(p.textContent="\u6B63\u5219\u8BED\u6CD5\u9519\u8BEF",y.input.style.borderColor="var(--yyt-danger,#f87171)",i&&(i.disabled=!0))}l.appendChild(Ha(s,"\u901F\u7387\u4E0E\u91CD\u8BD5"));let g=Pp(s,{label:"\u901F\u7387\u9650\u5236\uFF08\u6BCF\u5206\u949F\u6700\u591A\u89E6\u53D1\u6B21\u6570\uFF09",value:String(a.perMinute),placeholder:"3",type:"number",onChange:A=>{let I=parseInt(A,10);a.perMinute=Number.isFinite(I)&&I>0?I:1}});g.input.min="1",g.input.step="1",l.appendChild(g.row);let h=Pp(s,{label:"\u5931\u8D25\u91CD\u8BD5\u6B21\u6570",value:String(a.maxRetries),placeholder:"1",type:"number",onChange:A=>{let I=parseInt(A,10);a.maxRetries=Number.isFinite(I)&&I>=0?I:0}});h.input.min="0",h.input.step="1",l.appendChild(h.row),l.appendChild(Ha(s,"\u6210\u5458\u7BA1\u7406"));let b=s.createElement("div");b.style.cssText="display:flex;flex-direction:column;gap:6px;",l.appendChild(b);let v=s.createElement("div");v.style.cssText="font-size:11.5px;color:var(--yyt-text-secondary,#9aa0a8);",b.appendChild(v);let x=s.createElement("div");x.style.cssText="display:flex;flex-direction:column;gap:4px;max-height:280px;overflow-y:auto;padding:4px 2px;border:1px solid rgba(255,255,255,0.06);border-radius:6px;",b.appendChild(x);let T=s.createElement("div");T.style.cssText="display:flex;gap:6px;margin-top:4px;",b.appendChild(T);let E=s.createElement("button");E.type="button",E.className="yyt-btn yyt-btn-secondary",E.textContent="+ \u65B0\u5EFA\u597D\u53CB",E.style.fontSize="12px",T.appendChild(E);function w(){let A=e.listFriends();if(v.textContent=A.length===0?'\u5C1A\u65E0\u597D\u53CB\uFF0C\u70B9\u51FB "+ \u65B0\u5EFA\u597D\u53CB" \u6DFB\u52A0':`\u5171 ${A.length} \u4E2A\u597D\u53CB\uFF0C\u5DF2\u52A0\u5165 ${a.memberIds.length}`,x.innerHTML="",A.length===0){let I=s.createElement("div");I.style.cssText="padding:14px 4px;color:var(--yyt-text-secondary,#9aa0a8);font-size:12px;text-align:center;",I.textContent="\u6682\u65E0\u597D\u53CB",x.appendChild(I);return}for(let I of A){let P=a.memberIds.includes(I.id),C=s.createElement("div");C.style.cssText="display:flex;align-items:center;gap:8px;padding:6px 8px;border-radius:6px;background:rgba(255,255,255,0.03);";let N=s.createElement("input");N.type="checkbox",N.checked=P,N.style.cssText="width:16px;height:16px;cursor:pointer;flex-shrink:0;",N.addEventListener("change",()=>{N.checked?a.memberIds.includes(I.id)||a.memberIds.push(I.id):a.memberIds=a.memberIds.filter(J=>J!==I.id),v.textContent=`\u5171 ${A.length} \u4E2A\u597D\u53CB\uFF0C\u5DF2\u52A0\u5165 ${a.memberIds.length}`}),C.appendChild(N);let W=s.createElement("div");W.style.cssText="flex:1;min-width:0;";let H=s.createElement("div");H.style.cssText="font-size:13px;color:var(--yyt-text,#f2f2f2);",H.textContent=I.name||"\u672A\u547D\u540D",W.appendChild(H);let ee=s.createElement("div");ee.style.cssText="font-size:11px;color:var(--yyt-text-secondary,#9aa0a8);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;",ee.textContent=String(I.description||"").slice(0,60),W.appendChild(ee),C.appendChild(W);let te=s.createElement("button");te.type="button",te.className="yyt-btn yyt-btn-secondary",te.style.cssText="font-size:11px;padding:3px 8px;flex-shrink:0;";let z=!!a.perMemberPrompt[I.id];te.textContent=z?"\u7F16\u8F91\u4E13\u5C5E prompt \u25CF":"\u7F16\u8F91\u4E13\u5C5E prompt",te.title=z?"\u5DF2\u8BBE\u7F6E\u4E13\u5C5E prompt":"\u4F7F\u7528\u9ED8\u8BA4 Phase 2 prompt",te.addEventListener("click",async()=>{let J=await e1({doc:s,friend:I,currentValue:a.perMemberPrompt[I.id]||""});if(J.cancelled)return;let de=String(J.value||"").trim();de?a.perMemberPrompt[I.id]=de:delete a.perMemberPrompt[I.id];let Q=!!a.perMemberPrompt[I.id];te.textContent=Q?"\u7F16\u8F91\u4E13\u5C5E prompt \u25CF":"\u7F16\u8F91\u4E13\u5C5E prompt",te.title=Q?"\u5DF2\u8BBE\u7F6E\u4E13\u5C5E prompt":"\u4F7F\u7528\u9ED8\u8BA4 Phase 2 prompt"}),C.appendChild(te),x.appendChild(C)}}E.addEventListener("click",async()=>{let A=await Qx({qqStorage:e,logger:r,targetDoc:s});A&&(a.memberIds.includes(A.id)||a.memberIds.push(A.id),w())}),w(),we.custom({title:`${t.name} - \u7FA4\u914D\u7F6E`,body:l,width:"560px",wide:!0,buttons:[{label:"\u53D6\u6D88",variant:"ghost",onClick:A=>A({updated:!1})},{label:"\u4FDD\u5B58",variant:"primary",onClick:A=>{try{if(a.phase1Regex&&!ew(a.phase1Regex)){r?.warn?.("[QQ GroupConfig] \u6B63\u5219\u975E\u6CD5\uFF0C\u62D2\u7EDD\u4FDD\u5B58");return}let I={atmosphere:String(a.atmosphere||""),triggerSources:{...t.triggerSources||{},userMessage:!!a.userMessageEnabled},phase1Config:{promptTemplate:String(a.phase1Prompt||""),parseRegex:String(a.phase1Regex||"")},rateLimitConfig:{...t.rateLimitConfig||{},perMinute:Number.isFinite(a.perMinute)&&a.perMinute>0?a.perMinute:6},failureConfig:{...t.failureConfig||{},maxRetries:Number.isFinite(a.maxRetries)&&a.maxRetries>=0?a.maxRetries:1},memberIds:[...a.memberIds],perMemberPrompt:{...a.perMemberPrompt}};e.updateGroup(t.id,I),A({updated:!0})}catch(I){r?.error?.(`[QQ GroupConfig] \u4FDD\u5B58\u5F02\u5E38: ${I?.message||I}`,I)}}}],onMounted:({overlay:A})=>{try{let I=A.querySelectorAll(".yyt-dialog-footer .yyt-btn");i=I[I.length-1]||null,m()}catch{}}}).result.then(A=>o(A||{updated:!1}))})}var rw=O(()=>{It();Ts();Xx()});function t1(t){if(!t||!Number.isFinite(t))return"";let e=new Date(t),r=new Date,n=e.getFullYear()===r.getFullYear()&&e.getMonth()===r.getMonth()&&e.getDate()===r.getDate(),s=o=>String(o).padStart(2,"0");return n?`${s(e.getHours())}:${s(e.getMinutes())}`:`${s(e.getMonth()+1)}-${s(e.getDate())} ${s(e.getHours())}:${s(e.getMinutes())}`}function r1(t){let e=String(t||"").trim();return e?Array.from(e)[0]:"?"}function n1(t,e){return t.type==="system"?{label:"",kind:"system"}:t.sender===Ao?{label:"\u6211",kind:"self"}:{label:e.getFriend?.(t.sender)?.name||"\u672A\u77E5",kind:"other"}}function nw(t,e,r){let n=n1(e,r),s=t.createElement("div");if(s.className="yyt-qq-chat-msg",n.kind==="self"?s.classList.add("is-self"):n.kind==="system"?s.classList.add("is-system"):s.classList.add("is-other"),n.kind!=="system"){let l=t.createElement("div");l.className="yyt-qq-chat-msg-avatar",l.textContent=r1(n.label),s.appendChild(l)}let o=t.createElement("div");if(o.className="yyt-qq-chat-msg-body",n.kind==="other"&&n.label){let l=t.createElement("div");l.className="yyt-qq-chat-msg-sender",l.textContent=n.label,o.appendChild(l)}let a=t.createElement("div");a.className="yyt-qq-chat-msg-bubble",a.textContent=String(e.content||""),o.appendChild(a);let i=t.createElement("div");return i.className="yyt-qq-chat-msg-time",i.textContent=t1(e.timestamp),o.appendChild(i),s.appendChild(o),s}function s1(t,e,r){let n=t.createElement("div");n.style.cssText="display:flex;flex-direction:column;gap:8px;min-width:260px;";let s=Array.isArray(e.memberIds)?e.memberIds:[],o=r.listFriends();if(o.length===0){let d=t.createElement("div");return d.style.cssText="padding:14px 4px;color:var(--yyt-text-secondary,#9aa0a8);font-size:12.5px;line-height:1.6;text-align:center;",d.textContent='\u5C1A\u65E0\u597D\u53CB\u3002\u70B9\u51FB\u53F3\u4E0A\u89D2 "\u2699 \u914D\u7F6E" \u6DFB\u52A0\u597D\u53CB\u5E76\u52A0\u5165\u7FA4\u3002',n.appendChild(d),n}let a=t.createElement("div");a.style.cssText="font-size:11.5px;color:var(--yyt-text-secondary,#9aa0a8);",a.textContent=`\u5DF2\u6DFB\u52A0 ${s.length} / ${o.length}`,n.appendChild(a);let i=t.createElement("div");i.style.cssText="display:flex;flex-direction:column;gap:4px;max-height:320px;overflow-y:auto;";for(let d of o){let c=s.includes(d.id),u=t.createElement("div");u.style.cssText="display:flex;align-items:center;gap:8px;padding:6px 8px;border-radius:6px;background:rgba(255,255,255,0.04);";let y=t.createElement("span");y.style.cssText=`width:8px;height:8px;border-radius:50%;background:${c?"#4ade80":"rgba(255,255,255,0.2)"};`,u.appendChild(y);let p=t.createElement("span");p.style.cssText="font-size:12.5px;color:var(--yyt-text,#f2f2f2);",p.textContent=d.name||"\u672A\u547D\u540D",u.appendChild(p),i.appendChild(u)}n.appendChild(i);let l=t.createElement("div");return l.style.cssText="font-size:11px;color:var(--yyt-text-secondary,#9aa0a8);line-height:1.5;",l.textContent="\u6210\u5458\u52FE\u9009 UI \u5C06\u5728 Phase C/D \u52A0\u5165\u3002",n.appendChild(l),n}function Np({groupId:t,qqStorage:e,logger:r,targetDoc:n}){let s=null,o=null,a=null,i=null,l=null,d=null,c=null,u=null,y=null,p=null,m=null,g=null,h=null,b=null;function v(){s&&(s.scrollTop=s.scrollHeight)}function x(E,w){if(!s)return;let _=s.querySelector(".yyt-qq-chat-empty");_&&_.parentNode===s&&s.removeChild(_),s.appendChild(nw(E,w,e)),v()}function T(E,w){let _=E===Yl;p&&(_?(p.style.display="",p.classList.remove("is-error"),p.textContent="AI \u601D\u8003\u4E2D\u2026"):E===Vl?(p.style.display="",p.classList.add("is-error"),p.textContent=`AI \u54CD\u5E94\u5931\u8D25${w?`\uFF1A${w}`:""}`,setTimeout(()=>{p&&(p.style.display="none",p.classList.remove("is-error"))},4e3)):(p.style.display="none",p.classList.remove("is-error"))),o&&(o.disabled=_,o.classList.toggle("is-disabled",_)),a&&(a.disabled=_,a.classList.toggle("is-disabled",_))}return{id:`qq-chat:${t}`,get title(){return e.getGroup(t)?.name||"\u7FA4\u804A"},render(E){b=E;let w=n||globalThis.document||document,_=e.getGroup(t),A=w.createElement("div");if(A.className="yyt-qq-chat",!_){let z=w.createElement("div");z.className="yyt-qq-empty";let J=w.createElement("div");J.className="yyt-qq-empty-title",J.textContent="\u7FA4\u4E0D\u5B58\u5728",z.appendChild(J);let de=w.createElement("div");return de.textContent="\u6B63\u5728\u8FD4\u56DE\u2026\u2026",z.appendChild(de),A.appendChild(z),r?.error?.(`chatView \u627E\u4E0D\u5230 groupId=${t}`),setTimeout(()=>{try{E.popView()}catch{}},50),A}let I=w.createElement("div");I.className="yyt-qq-group-info-bar";let P=w.createElement("div");P.className="yyt-qq-group-info-meta";let C=w.createElement("div");C.className="yyt-qq-group-info-name",C.textContent=_.name,P.appendChild(C);let N=w.createElement("div");N.className="yyt-qq-group-info-count";let W=Array.isArray(_.memberIds)?_.memberIds.length:0;N.textContent=`${W} \u6210\u5458`,P.appendChild(N),I.appendChild(P),c=w.createElement("button"),c.type="button",c.className="yyt-qq-group-info-btn",c.textContent="\u6210\u5458",d=z=>{z.stopPropagation();try{let J=e.getGroup(t)||_,de=s1(w,J,e);we.custom({title:`${J.name} - \u6210\u5458`,body:de,buttons:[{label:"\u5173\u95ED",variant:"primary",onClick:Q=>Q(null)}]})}catch(J){r?.error?.(`\u6253\u5F00\u6210\u5458\u5F39\u7A97\u5F02\u5E38: ${J?.message||J}`,J)}},c.addEventListener("click",d),I.appendChild(c),u=w.createElement("button"),u.type="button",u.className="yyt-qq-group-info-btn",u.textContent="\u2699 \u914D\u7F6E",u.title="\u7FA4\u914D\u7F6E\uFF08\u89E6\u53D1 / prompt / \u6210\u5458\uFF09",y=async z=>{z.stopPropagation();try{let J=e.getGroup(t)||_;(await tw({group:J,qqStorage:e,logger:r,targetDoc:w}))?.updated&&b?.isOpen&&b.replaceView(Np({groupId:t,qqStorage:e,logger:r,targetDoc:n}))}catch(J){r?.error?.(`\u6253\u5F00\u7FA4\u914D\u7F6E\u5F39\u7A97\u5F02\u5E38: ${J?.message||J}`,J)}},u.addEventListener("click",y),I.appendChild(u),p=w.createElement("div"),p.className="yyt-qq-thinking-pill",p.style.display="none",p.textContent="AI \u601D\u8003\u4E2D\u2026",I.appendChild(p),A.appendChild(I),s=w.createElement("div"),s.className="yyt-qq-chat-stream";let H=e.listMessages(t);if(H.length===0){let z=w.createElement("div");z.className="yyt-qq-chat-empty",z.textContent="\u6D88\u606F\u6D41\u4E3A\u7A7A\u3002\u5728\u4E0B\u65B9\u8F93\u5165\u5E76\u53D1\u9001\u6D88\u606F\u5F00\u59CB\u5427\uFF5E",s.appendChild(z)}else for(let z of H)s.appendChild(nw(w,z,e));A.appendChild(s);let ee=w.createElement("div");ee.className="yyt-qq-chat-input-bar",o=w.createElement("textarea"),o.className="yyt-qq-chat-input",o.rows=1,o.placeholder="\u8F93\u5165\u6D88\u606F\uFF0C\u56DE\u8F66\u53D1\u9001\uFF0CShift+Enter \u6362\u884C",ee.appendChild(o),a=w.createElement("button"),a.type="button",a.className="yyt-qq-chat-send-btn",a.textContent="\u53D1\u9001",ee.appendChild(a),A.appendChild(ee);let te=()=>{if(!o)return;let z=o.value,J=String(z??"").trim();if(J)try{let de=Co({groupId:t,sender:Ao,content:J}),Q=e.appendMessage(t,de);if(!Q){r?.warn?.("appendMessage \u5931\u8D25");return}e.updateGroup(t,{updatedAt:Date.now()}),x(w,Q),o.value="",o.focus()}catch(de){r?.error?.(`\u53D1\u9001\u6D88\u606F\u5F02\u5E38: ${de?.message||de}`,de)}};l=z=>{z.stopPropagation(),te()},a.addEventListener("click",l),i=z=>{z.key==="Enter"&&!z.shiftKey&&!z.isComposing&&(z.preventDefault(),z.stopPropagation(),te())},o.addEventListener("keydown",i);try{if(m){try{m()}catch{}m=null}m=et.subscribe(Pe.CHAT_CHANGED,()=>{try{if(!E?.isOpen)return;E.popView()}catch(z){r?.warn?.(`CHAT_CHANGED popView \u5931\u8D25: ${z?.message||z}`)}})}catch(z){r?.warn?.(`\u8BA2\u9605 CHAT_CHANGED \u5931\u8D25: ${z?.message||z}`)}try{if(g){try{g()}catch{}g=null}g=q.on(ko,z=>{if(!(!z||z.groupId!==t)&&E?.isOpen)try{x(w,z.message)}catch(J){r?.warn?.(`qq:messages-appended \u5904\u7406\u5931\u8D25: ${J?.message||J}`)}})}catch(z){r?.warn?.(`\u8BA2\u9605 qq:messages-appended \u5931\u8D25: ${z?.message||z}`)}try{if(h){try{h()}catch{}h=null}h=q.on(Gl,z=>{if(!E?.isOpen)return;let J=z?.groupId;J&&J!==t||T(z?.status,z?.error)})}catch(z){r?.warn?.(`\u8BA2\u9605 qq:phase-state \u5931\u8D25: ${z?.message||z}`)}return A},onEnter(){v();try{o?.focus()}catch{}},destroy(){try{a&&l&&a.removeEventListener("click",l),o&&i&&o.removeEventListener("keydown",i),c&&d&&c.removeEventListener("click",d),u&&y&&u.removeEventListener("click",y)}catch{}if(m){try{m()}catch{}m=null}if(g){try{g()}catch{}g=null}if(h){try{h()}catch{}h=null}s=null,o=null,a=null,c=null,u=null,p=null,i=null,l=null,d=null,y=null,b=null}}}var sw=O(()=>{It();Or();nt();Pn();rw();Ts()});function ow(t){if(!t||!Number.isFinite(t))return"";let e=new Date(t),r=new Date,n=e.getFullYear()===r.getFullYear()&&e.getMonth()===r.getMonth()&&e.getDate()===r.getDate(),s=o=>String(o).padStart(2,"0");return n?`${s(e.getHours())}:${s(e.getMinutes())}`:e.getFullYear()===r.getFullYear()?`${s(e.getMonth()+1)}-${s(e.getDate())}`:`${String(e.getFullYear()).slice(2)}-${s(e.getMonth()+1)}-${s(e.getDate())}`}function o1(t){let e=String(t||"").trim();return e?Array.from(e)[0]:"?"}function Ql({qqStorage:t,logger:e,targetDoc:r}){let n=null;return{id:"qq-home",title:"QQ",render(s){let o=r||globalThis.document||document,a=o.createElement("div");a.className="yyt-qq-home";let i=o.createElement("div");i.className="yyt-qq-home-list",a.appendChild(i);let l=t.listGroups().slice().sort((c,u)=>(u.updatedAt||0)-(c.updatedAt||0));if(l.length===0){let c=o.createElement("div");c.className="yyt-qq-empty";let u=o.createElement("div");u.className="yyt-qq-empty-title",u.textContent="\u8FD8\u6CA1\u6709\u7FA4",c.appendChild(u);let y=o.createElement("div");y.textContent="\u70B9\u51FB\u53F3\u4E0B\u89D2 + \u65B0\u5EFA\u4E00\u4E2A\u7FA4",c.appendChild(y),i.appendChild(c)}else for(let c of l)i.appendChild(a1(o,c,t,s));let d=o.createElement("button");d.type="button",d.className="yyt-qq-home-new-btn",d.setAttribute("aria-label","\u65B0\u5EFA\u7FA4"),d.textContent="+",d.addEventListener("click",async c=>{c.stopPropagation();try{let u=await we.prompt({title:"\u65B0\u5EFA\u7FA4",placeholder:"\u7FA4\u540D",confirmText:"\u521B\u5EFA",validate:p=>{let m=String(p||"").trim();return m?m.length>30?"\u7FA4\u540D\u6700\u591A 30 \u5B57":null:"\u7FA4\u540D\u4E0D\u80FD\u4E3A\u7A7A"}});if(!u)return;if(!t.addGroup(Yx({name:u}))){e?.warn?.("\u65B0\u5EFA\u7FA4\u5931\u8D25");return}s.replaceView(Ql({qqStorage:t,logger:e,targetDoc:r}))}catch(u){e?.error?.(`\u65B0\u5EFA\u7FA4\u5F02\u5E38: ${u?.message||u}`,u)}}),a.appendChild(d);try{if(n){try{n()}catch{}n=null}n=et.subscribe(Pe.CHAT_CHANGED,()=>{try{if(!s?.isOpen)return;s.replaceView(Ql({qqStorage:t,logger:e,targetDoc:r}))}catch(c){e?.warn?.(`CHAT_CHANGED replaceView \u5931\u8D25: ${c?.message||c}`)}})}catch(c){e?.warn?.(`\u8BA2\u9605 CHAT_CHANGED \u5931\u8D25: ${c?.message||c}`)}return a},destroy(){if(n){try{n()}catch{}n=null}}}}function a1(t,e,r,n){let s=t.createElement("div");s.className="yyt-qq-home-item",s.setAttribute("data-group-id",e.id);let o=t.createElement("div");o.className="yyt-qq-home-item-avatar",o.textContent=o1(e.name),s.appendChild(o);let a=t.createElement("div");a.className="yyt-qq-home-item-body";let i=t.createElement("div");i.className="yyt-qq-home-item-row";let l=t.createElement("div");l.className="yyt-qq-home-item-name";let d=Array.isArray(e.memberIds)?e.memberIds.length:0;l.textContent=d>0?e.name:`${e.name} (0 \u6210\u5458)`,i.appendChild(l);let c=t.createElement("div");c.className="yyt-qq-home-item-time",i.appendChild(c),a.appendChild(i);let u=t.createElement("div");u.className="yyt-qq-home-item-preview",a.appendChild(u);let y=r.listMessages(e.id),p=y[y.length-1]||null;if(p){c.textContent=ow(p.timestamp||e.updatedAt);let m=p.sender==="user"?"\u6211":r.getFriend?.(p.sender)?.name||"?";u.textContent=`${m}\uFF1A${String(p.content||"")}`}else c.textContent=ow(e.updatedAt),u.classList.add("is-empty"),u.textContent="\u6682\u65E0\u6D88\u606F";return s.appendChild(a),s.addEventListener("click",m=>{m.stopPropagation();try{n.pushView(Np({groupId:e.id,qqStorage:r,logger:n.logger,targetDoc:t}))}catch(g){n.logger?.error?.(`\u8FDB\u5165\u7FA4\u804A\u5931\u8D25: ${g?.message||g}`,g)}}),s}var aw=O(()=>{It();Or();Pn();sw()});function iw(t){if(!t)return null;let e=t,r=e.querySelector(`style[${$p}]`);if(r)return r;let n=e.createElement("style");return n.setAttribute($p,"1"),n.textContent=i1,(e.head||e.documentElement).appendChild(n),n}function lw(t){if(!t)return!1;let e=t.querySelector(`style[${$p}]`);return e&&e.parentNode?(e.parentNode.removeChild(e),!0):!1}var $p,i1,Lp=O(()=>{$p="data-yyt-qq-styles",i1=`
/* \u2500\u2500\u2500 \u901A\u7528 \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.yyt-qq-empty {
  padding: 40px 16px;
  text-align: center;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.42);
  line-height: 1.6;
}
.yyt-qq-empty-title {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.65);
  margin-bottom: 6px;
}

/* \u2500\u2500\u2500 \u4E3B\u9875\uFF1A\u7FA4\u5217\u8868 \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.yyt-qq-home {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
}
.yyt-qq-home-list {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  overscroll-behavior: contain;
  scrollbar-width: none;
  padding: 6px 0 80px 0;
}
.yyt-qq-home-list::-webkit-scrollbar { display: none; }

.yyt-qq-home-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: background 0.12s;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
}
.yyt-qq-home-item:hover {
  background: rgba(255, 255, 255, 0.04);
}
.yyt-qq-home-item:active {
  background: rgba(255, 255, 255, 0.07);
}

.yyt-qq-home-item-avatar {
  flex-shrink: 0;
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: linear-gradient(140deg, #4a90d9 0%, #2c5fa1 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  font-weight: 600;
  color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.12);
}

.yyt-qq-home-item-body {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 3px;
}
.yyt-qq-home-item-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px;
}
.yyt-qq-home-item-name {
  font-size: 13px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.92);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.yyt-qq-home-item-time {
  flex-shrink: 0;
  font-size: 10.5px;
  color: rgba(255, 255, 255, 0.4);
  font-family: 'Consolas', 'Monaco', monospace;
}
.yyt-qq-home-item-preview {
  font-size: 11.5px;
  color: rgba(255, 255, 255, 0.5);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 1.4;
}
.yyt-qq-home-item-preview.is-empty {
  font-style: italic;
  color: rgba(255, 255, 255, 0.32);
}

/* "\u65B0\u5EFA\u7FA4" \u6D6E\u52A8\u6309\u94AE */
.yyt-qq-home-new-btn {
  position: absolute;
  right: 14px;
  bottom: 16px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  background: linear-gradient(140deg, #5b9bd9 0%, #3a6db5 100%);
  color: #fff;
  font-size: 24px;
  font-weight: 300;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 18px rgba(91, 155, 217, 0.4), 0 0 0 1px rgba(123, 183, 255, 0.3),
              inset 0 1px 0 rgba(255, 255, 255, 0.18);
  transition: transform 0.15s, box-shadow 0.15s;
  -webkit-tap-highlight-color: transparent;
  z-index: 3;
}
.yyt-qq-home-new-btn:hover {
  transform: translateY(-1px) scale(1.04);
  box-shadow: 0 8px 22px rgba(91, 155, 217, 0.5), 0 0 0 1px rgba(123, 183, 255, 0.4),
              inset 0 1px 0 rgba(255, 255, 255, 0.22);
}
.yyt-qq-home-new-btn:active {
  transform: scale(0.94);
}

/* \u2500\u2500\u2500 \u7FA4\u804A\u9875 \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.yyt-qq-chat {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
  background: linear-gradient(180deg, #0d0e12 0%, #0a0b0f 100%);
}

/* \u9876\u90E8\u7FA4\u4FE1\u606F\u6761\uFF08\u7FA4\u540D + "\u6210\u5458" \u6309\u94AE\uFF09 */
.yyt-qq-group-info-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 8px 14px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  flex-shrink: 0;
  background: rgba(255, 255, 255, 0.02);
}
.yyt-qq-group-info-meta {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.yyt-qq-group-info-name {
  font-size: 12.5px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.yyt-qq-group-info-count {
  font-size: 10.5px;
  color: rgba(255, 255, 255, 0.45);
}
.yyt-qq-group-info-btn {
  flex-shrink: 0;
  padding: 5px 11px;
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.78);
  font-size: 11px;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: background 0.12s, color 0.12s;
}
.yyt-qq-group-info-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}
.yyt-qq-group-info-btn:active {
  background: rgba(255, 255, 255, 0.14);
}

/* \u6D88\u606F\u6D41 */
.yyt-qq-chat-stream {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  overscroll-behavior: contain;
  scrollbar-width: none;
  padding: 10px 12px 12px 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.yyt-qq-chat-stream::-webkit-scrollbar { display: none; }

.yyt-qq-chat-empty {
  margin: auto;
  text-align: center;
  font-size: 11.5px;
  color: rgba(255, 255, 255, 0.35);
  padding: 32px 16px;
  line-height: 1.6;
}

/* \u5355\u6761\u6D88\u606F */
.yyt-qq-chat-msg {
  display: flex;
  gap: 8px;
  max-width: 100%;
}
.yyt-qq-chat-msg.is-self {
  flex-direction: row-reverse;
}
.yyt-qq-chat-msg.is-system {
  justify-content: center;
}

.yyt-qq-chat-msg-avatar {
  flex-shrink: 0;
  width: 30px;
  height: 30px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(140deg, #6a6f7a 0%, #3a3d44 100%);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.35);
}
.yyt-qq-chat-msg.is-self .yyt-qq-chat-msg-avatar {
  background: linear-gradient(140deg, #4a90d9 0%, #2c5fa1 100%);
}

.yyt-qq-chat-msg-body {
  display: flex;
  flex-direction: column;
  gap: 3px;
  max-width: calc(100% - 50px);
  min-width: 0;
}
.yyt-qq-chat-msg.is-self .yyt-qq-chat-msg-body {
  align-items: flex-end;
}

.yyt-qq-chat-msg-sender {
  font-size: 10.5px;
  color: rgba(255, 255, 255, 0.45);
  padding: 0 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
}

.yyt-qq-chat-msg-bubble {
  padding: 7px 11px;
  border-radius: 12px;
  font-size: 12.5px;
  line-height: 1.45;
  word-wrap: break-word;
  word-break: break-word;
  white-space: pre-wrap;
  background: rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.92);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.04);
  max-width: 100%;
}
.yyt-qq-chat-msg.is-self .yyt-qq-chat-msg-bubble {
  background: linear-gradient(140deg, #4a90d9 0%, #2c5fa1 100%);
  color: #fff;
  box-shadow: 0 1px 5px rgba(74, 144, 217, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.12);
}

.yyt-qq-chat-msg.is-system .yyt-qq-chat-msg-bubble {
  background: transparent;
  box-shadow: none;
  color: rgba(255, 255, 255, 0.4);
  font-size: 11px;
  font-style: italic;
  padding: 4px 12px;
}

.yyt-qq-chat-msg-time {
  font-size: 10px;
  color: rgba(255, 255, 255, 0.32);
  padding: 0 4px;
  font-family: 'Consolas', 'Monaco', monospace;
}

/* \u8F93\u5165\u680F */
.yyt-qq-chat-input-bar {
  display: flex;
  align-items: flex-end;
  gap: 8px;
  padding: 8px 10px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  background: rgba(255, 255, 255, 0.02);
  flex-shrink: 0;
}
.yyt-qq-chat-input {
  flex: 1;
  min-width: 0;
  resize: none;
  min-height: 34px;
  max-height: 96px;
  padding: 8px 11px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.04);
  color: rgba(255, 255, 255, 0.92);
  font-size: 12.5px;
  line-height: 1.4;
  font-family: inherit;
  outline: none;
  transition: border-color 0.12s, background 0.12s;
}
.yyt-qq-chat-input::placeholder {
  color: rgba(255, 255, 255, 0.32);
}
.yyt-qq-chat-input:focus {
  border-color: rgba(123, 183, 255, 0.45);
  background: rgba(255, 255, 255, 0.06);
}
.yyt-qq-chat-send-btn {
  flex-shrink: 0;
  height: 34px;
  padding: 0 14px;
  border-radius: 10px;
  border: none;
  background: linear-gradient(140deg, #5b9bd9 0%, #3a6db5 100%);
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: transform 0.1s, box-shadow 0.12s, opacity 0.12s;
  box-shadow: 0 2px 6px rgba(91, 155, 217, 0.3);
}
.yyt-qq-chat-send-btn:hover {
  box-shadow: 0 3px 10px rgba(91, 155, 217, 0.4);
}
.yyt-qq-chat-send-btn:active {
  transform: scale(0.95);
}
.yyt-qq-chat-send-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  box-shadow: none;
}

/* Phase C1: thinking pill + disabled input */
.yyt-qq-thinking-pill {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 10px;
  border-radius: 10px;
  background: rgba(91, 155, 217, 0.18);
  color: #b3d1f0;
  font-size: 11px;
  font-weight: 500;
  margin-left: 6px;
  animation: yyt-qq-thinking-pulse 1.4s ease-in-out infinite;
  white-space: nowrap;
  max-width: 60%;
  overflow: hidden;
  text-overflow: ellipsis;
}
.yyt-qq-thinking-pill.is-error {
  background: rgba(248, 113, 113, 0.18);
  color: #f87171;
  animation: none;
}
@keyframes yyt-qq-thinking-pulse {
  0%, 100% { opacity: 0.6; }
  50%      { opacity: 1.0; }
}
.yyt-qq-chat-input.is-disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}
.yyt-qq-chat-send-btn.is-disabled {
  opacity: 0.4;
  cursor: not-allowed;
  box-shadow: none;
}
`});function l1(t,e){return new Promise(r=>{if(e?.aborted){r(!1);return}let n=setTimeout(()=>r(!0),t),s=()=>{clearTimeout(n),r(!1)};e?.addEventListener?.("abort",s,{once:!0})})}async function Xl({messages:t,options:e={},abortSignal:r,maxRetries:n=1,presetName:s="",logger:o,label:a="callAI"}){let i=null;for(let l=0;l<=n;l++){if(r?.aborted)throw new DOMException("Aborted","AbortError");try{return await Fn(s,t,e,r)}catch(d){if(i=d,d?.name==="AbortError")throw d;if(l<n){if(o?.warn?.(`${a} \u7B2C ${l+1} \u6B21\u5931\u8D25: ${d?.message||d}; ${3e3}ms \u540E\u91CD\u8BD5`),!await l1(3e3,r))throw new DOMException("Aborted","AbortError")}else o?.error?.(`${a} \u91CD\u8BD5 ${n} \u6B21\u540E\u4ECD\u5931\u8D25: ${d?.message||d}`,d)}}throw i||new Error(`${a} failed without error`)}var Nn,Zl=O(()=>{Cs();Ts();Nn=class extends Error{constructor(e="ChatId changed during phase chain"){super(e),this.name="ChatIdChangedError"}}});function c1(t){return String(t??"").replace(/\$/g,"$$$$")}function d1(t,e){let r=String(t||"");for(let[n,s]of Object.entries(e)){let o=new RegExp(`\\{\\{\\s*${n}\\s*\\}\\}`,"g");r=r.replace(o,c1(s))}return r}function u1(t,e){let r=Array.isArray(t?.memberIds)?t.memberIds:[],n=[];for(let s of r){let o=e.getFriend?.(s);if(!o)continue;let a=String(o.name||"").trim()||"(\u672A\u547D\u540D)",i=String(o.description||"").trim()||"(\u65E0\u63CF\u8FF0)";n.push(`${o.id}: ${a} \u2014 ${i}`)}return n.length>0?n.join(`
`):"(\u6682\u65E0\u6210\u5458)"}function p1(t,e){let n=(e.listMessages(t.id)||[]).slice(-20);return n.length===0?"(\u6682\u65E0\u804A\u5929\u8BB0\u5F55)":n.map(o=>{let a;if(o.sender==="user")a="\u6211";else if(o.type==="system")a="\u7CFB\u7EDF";else{let i=e.getFriend?.(o.sender);a=i?.name?i.name:o.sender||"?"}return`[${a}]: ${String(o.content||"")}`}).join(`
`)}function dw({qqStorage:t,logger:e}){async function r(n,s,o){if(!n)throw new Error("phase1.run: group \u5FC5\u586B");let a=n?.phase1Config?.promptTemplate||Wl,i=n?.phase1Config?.parseRegex||Hl,l=Number.isFinite(n?.failureConfig?.maxRetries)?n.failureConfig.maxRetries:1,d=d1(a,{atmosphere:String(n.atmosphere||"(\u672A\u8BBE\u7F6E)"),members:u1(n,t),recentMessages:p1(n,t),userMessage:String(s||"")});e?.info?.(`[Phase1] group=${n.id} prompt \u957F\u5EA6=${d.length}`);let c=await Xl({messages:[{role:"user",content:d}],options:{},abortSignal:o,maxRetries:l,logger:e,label:`Phase1[${n.id}]`}),u=String(c||""),y=bi(i,u,"g",1);if(!y.success)return e?.warn?.(`[Phase1] \u6B63\u5219\u89E3\u6790\u5931\u8D25: ${y.error}; \u89C6\u4E3A\u65E0 NPC \u53D1\u8A00`),{npcIds:[],rawOutput:u};let p=(y.matches||[]).map(m=>String(m?.groups?.[0]||"").trim()).filter(m=>m.length>0);return e?.info?.(`[Phase1] \u89E3\u6790\u51FA ${p.length} \u4E2A NPC: ${p.join(", ")}`),{npcIds:p,rawOutput:u}}return{run:r}}var uw=O(()=>{Xn();Zl();Ts()});function y1(t){return String(t??"").replace(/\$/g,"$$$$")}function f1(t,e){let r=String(t||"");for(let[n,s]of Object.entries(e)){let o=new RegExp(`\\{\\{\\s*${n}\\s*\\}\\}`,"g");r=r.replace(o,y1(s))}return r}function m1(t,e){let n=(e.listMessages(t)||[]).slice(-20);return n.length===0?"(\u6682\u65E0\u804A\u5929\u8BB0\u5F55)":n.map(o=>{let a;if(o.sender==="user")a="\u6211";else if(o.type===Eo.SYSTEM)a="\u7CFB\u7EDF";else{let i=e.getFriend?.(o.sender);a=i?.name?i.name:o.sender||"?"}return`[${a}]: ${String(o.content||"")}`}).join(`
`)}function pw({qqStorage:t,logger:e,eventBus:r}){async function n(s,o,a,i){if(!s)throw new Error("phase2.runOne: group \u5FC5\u586B");if(!o)throw new Error("phase2.runOne: npcId \u5FC5\u586B");let l=t.getFriend?.(o);if(!l)return e?.warn?.(`[Phase2] npc=${o} \u4E0D\u5B58\u5728\uFF0C\u8DF3\u8FC7`),null;let d=s?.perMemberPrompt&&s.perMemberPrompt[o]||ql,c=Number.isFinite(s?.failureConfig?.maxRetries)?s.failureConfig.maxRetries:1,u=f1(d,{atmosphere:String(s.atmosphere||"(\u672A\u8BBE\u7F6E)"),selfName:String(l.name||"(\u672A\u547D\u540D)"),selfDescription:String(l.description||"(\u65E0\u63CF\u8FF0)"),recentMessages:m1(s.id,t)});e?.info?.(`[Phase2] group=${s.id} npc=${o}(${l.name}) prompt \u957F\u5EA6=${u.length}`);let y=await Xl({messages:[{role:"user",content:u}],options:{},abortSignal:i,maxRetries:c,logger:e,label:`Phase2[${s.id}/${o}]`}),p=String(y||"").trim();if(!p)return e?.warn?.(`[Phase2] npc=${o} \u54CD\u5E94\u4E3A\u7A7A\uFF0C\u8DF3\u8FC7 append`),null;let m=t.getCurrentChatId?.();if(a&&m&&m!==a)throw new Nn(`chatId \u5DF2\u4ECE ${a} \u5207\u6362\u5230 ${m}\uFF0C\u4E2D\u65AD Phase 2`);let g=t.appendMessage(s.id,Co({groupId:s.id,sender:o,content:p,type:Eo.TEXT}));if(g)try{r?.emit?.(ko,{groupId:s.id,message:g})}catch(h){e?.warn?.(`[Phase2] eventBus.emit \u5931\u8D25: ${h?.message||h}`)}return g||null}return{runOne:n}}var yw=O(()=>{Zl();Ts();Pn()});function mw(){let t=tr(),e=on(t);return Array.isArray(e?.chat)?e.chat:Array.isArray(t?.chat)?t.chat:[]}function fw(t){let e=Number(t);if(!Number.isFinite(e)||e<0)return"";let r=mw();if(e>=r.length)return"";let n=r[e];return n?String(n.mes||n.content||n.message||"").trim():""}function g1(t,e){if(!t||typeof t!="object")return"";for(let r of e){let n=t[r];if(typeof n=="string"&&n.trim())return n.trim()}return""}function gw(t){if(typeof t=="number"||typeof t=="string"){let r=fw(t);if(r)return r}if(t&&typeof t=="object"){let r=g1(t,["mes","message","content","text","message_text"]);if(r)return r;let n=t.message_id??t.messageId??t.id??t.index;if(n!=null){let s=fw(n);if(s)return s}}let e=mw();for(let r=e.length-1;r>=0;r--){let n=e[r];if(!n)continue;if(n.is_user===!0||String(n.role||"").toLowerCase()==="user"||String(n.name||"").toLowerCase()==="user")return String(n.mes||n.content||"").trim()}return""}var hw=O(()=>{Or()});function bw({qqStorage:t,logger:e,eventBus:r}){if(!t)throw new Error("orchestrator: qqStorage \u5FC5\u586B");if(!r)throw new Error("orchestrator: eventBus \u5FC5\u586B");let n=dw({qqStorage:t,logger:e}),s=pw({qqStorage:t,logger:e,eventBus:r}),o=null,a=new Map,i=null,l=null,d=!1;function c(x,T,E={}){try{r.emit(Gl,{status:x,groupId:T||null,...E})}catch(w){e?.warn?.(`[QQOrchestrator] emit phase-state \u5931\u8D25: ${w?.message||w}`)}}function u(x,T){let E=Number.isFinite(T)&&T>0?T:6,w=Date.now(),A=(a.get(x)||[]).filter(I=>w-I<h1);return A.length>=E?(a.set(x,A),!1):(A.push(w),a.set(x,A),!0)}function y(x,T,E){try{let w=t.getCurrentChatId?.();if(E&&w&&w!==E){e?.info?.(`[QQOrchestrator] chatId \u5DF2\u5207\u6362 (${E} \u2192 ${w})\uFF0C\u8DF3\u8FC7 system \u5931\u8D25\u6D88\u606F\u5199\u5165`);return}let _=t.appendMessage(x,Co({groupId:x,sender:Ao,content:`[\u7CFB\u7EDF] AI \u54CD\u5E94\u5931\u8D25\uFF1A${T}`,type:Eo.SYSTEM}));if(_)try{r.emit(ko,{groupId:x,message:_})}catch{}}catch(w){e?.warn?.(`[QQOrchestrator] \u5199 system \u5931\u8D25\u6D88\u606F\u5F02\u5E38: ${w?.message||w}`)}}async function p(x,T){let E=new AbortController;o={groupId:x.id,abortController:E};let w=t.getCurrentChatId?.()||"";c(Yl,x.id),e?.info?.(`[QQOrchestrator] \u542F\u52A8 Phase \u94FE\u8DEF: group=${x.id} chatId=${w}`);try{let{npcIds:_}=await n.run(x,T,E.signal);if(!Array.isArray(_)||_.length===0){e?.info?.("[QQOrchestrator] Phase 1 \u672A\u9009\u51FA NPC\uFF0C\u6B63\u5E38\u9000\u51FA"),c(Wa,x.id);return}for(let A of _){if(E.signal.aborted){e?.info?.("[QQOrchestrator] Phase 2 \u4E2D\u9014\u88AB abort\uFF0C\u505C\u6B62\u4E32\u884C");break}let I=t.getCurrentChatId?.();if(w&&I&&I!==w)throw new Nn(`chatId \u5207\u6362 ${w} \u2192 ${I}`);try{await s.runOne(x,A,w,E.signal)}catch(P){if(P?.name==="AbortError"||P instanceof Nn)throw P;e?.warn?.(`[QQOrchestrator] Phase 2 npc=${A} \u5931\u8D25: ${P?.message||P}`)}}c(Wa,x.id),e?.info?.(`[QQOrchestrator] Phase \u94FE\u8DEF\u5B8C\u6210: group=${x.id}`)}catch(_){_?.name==="AbortError"?(e?.info?.(`[QQOrchestrator] Phase \u94FE\u8DEF aborted (group=${x.id})`),c(Wa,x.id)):_ instanceof Nn?(e?.info?.(`[QQOrchestrator] Phase \u94FE\u8DEF chatId \u53D8\u5316\u4E2D\u65AD (group=${x.id}): ${_.message}`),c(Wa,x.id)):(e?.error?.(`[QQOrchestrator] Phase \u94FE\u8DEF\u5931\u8D25 (group=${x.id}): ${_?.message||_}`,_),y(x.id,String(_?.message||_),w),c(Vl,x.id,{error:String(_?.message||_)}))}finally{o=null}}function m(x){try{if(o){e?.info?.(`[QQOrchestrator] \u5DF2\u6709 Phase \u94FE\u8DEF\u5728\u8DD1 (group=${o.groupId})\uFF0C\u672C\u6B21 USER_MESSAGE_RENDERED \u8DF3\u8FC7`);return}let T=gw(x);if(!T){e?.warn?.(`[QQOrchestrator] USER_MESSAGE_RENDERED \u63D0\u53D6\u4E0D\u5230\u5185\u5BB9\uFF0Cpayload=${JSON.stringify(x)?.slice(0,200)}`);return}let E=(t.listGroups()||[]).filter(w=>w?.triggerSources?.userMessage===!0);if(E.length===0)return;for(let w of E){if(o)break;let _=w?.rateLimitConfig?.perMinute;if(!u(w.id,_)){e?.info?.(`[QQOrchestrator] group=${w.id} \u547D\u4E2D\u9891\u7387\u9650\u5236\uFF08perMinute=${_}\uFF09\uFF0C\u8DF3\u8FC7`);continue}p(w,T).catch(A=>{e?.error?.(`[QQOrchestrator] runChain unhandled: ${A?.message||A}`,A)});break}}catch(T){e?.error?.(`[QQOrchestrator] handleUserMessage \u5F02\u5E38: ${T?.message||T}`,T)}}function g(){if(o){e?.info?.(`[QQOrchestrator] CHAT_CHANGED \u2192 abort \u5F53\u524D\u94FE\u8DEF (group=${o.groupId})`);try{o.abortController.abort()}catch{}}a.clear()}function h(){if(!d){try{i=et.subscribe(Pe.USER_MESSAGE_RENDERED,m)}catch(x){e?.error?.(`[QQOrchestrator] \u8BA2\u9605 USER_MESSAGE_RENDERED \u5931\u8D25: ${x?.message||x}`,x)}try{l=et.subscribe(Pe.CHAT_CHANGED,g)}catch(x){e?.error?.(`[QQOrchestrator] \u8BA2\u9605 CHAT_CHANGED \u5931\u8D25: ${x?.message||x}`,x)}d=!0,e?.info?.("[QQOrchestrator] installed")}}function b(){if(d){try{i&&i()}catch{}try{l&&l()}catch{}if(i=null,l=null,o){try{o.abortController.abort()}catch{}o=null}a.clear(),d=!1,e?.info?.("[QQOrchestrator] uninstalled")}}function v(){return o!==null}return{install:h,uninstall:b,isRunning:v}}var h1,xw=O(()=>{Or();Zl();uw();yw();hw();Pn();Ts();h1=60*1e3});function ww({floatingBall:t,parentStorage:e,parentLogger:r,targetDoc:n}){if(!t||typeof t.registerApp!="function")throw new Error("registerQQApp: floatingBall \u5FC5\u586B\u4E14\u9700\u652F\u6301 registerApp");if(!e||typeof e.namespace!="function")throw new Error("registerQQApp: parentStorage \u5FC5\u586B");let s=r?.createScope?.(`App:${Ul}`)||r||{log(){},warn(){},error(){}},o=e.namespace("apps").namespace(Ul),a=Vx({storage:o,logger:s});if(n)try{iw(n)}catch(u){s?.warn?.(`\u6CE8\u5165 QQ \u6837\u5F0F\u5931\u8D25: ${u?.message||u}`)}let i=Ql({qqStorage:a,logger:s,targetDoc:n}),l=bw({qqStorage:a,logger:s,eventBus:q});try{l.install()}catch(u){s?.error?.(`orchestrator.install \u5931\u8D25: ${u?.message||u}`,u)}let d=t.registerApp({id:Ul,label:"QQ",icon:b1,iconColor:"linear-gradient(140deg, #4a90d9 0%, #2c5fa1 100%)",title:"QQ",group:"apps",groupTitle:"\u5E94\u7528",order:30,rootView:i});return{unregister:()=>{try{l.uninstall()}catch(u){s?.warn?.(`orchestrator.uninstall \u5931\u8D25: ${u?.message||u}`)}try{d?.()}catch{}},qqStorage:a,orchestrator:l}}var b1,vw=O(()=>{Jx();aw();Lp();Pn();xw();nt();b1=`
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
    <path d="M12 2.4c-3.7 0-6.7 2.7-6.7 7 0 1.4.4 2.7 1 3.9-.4.9-1 1.8-1.6 2.5-.4.4-.2 1.1.4 1.2 1.7.2 3.1-.2 4.1-.8.9.3 1.8.4 2.8.4s1.9-.1 2.8-.4c1 .6 2.4 1 4.1.8.6-.1.8-.8.4-1.2-.6-.7-1.2-1.6-1.6-2.5.6-1.2 1-2.5 1-3.9 0-4.3-3-7-6.7-7Z"
          fill="#fff" stroke="none"/>
    <circle cx="9.5" cy="9.5" r="1.1" fill="#1a3a5a"/>
    <circle cx="14.5" cy="9.5" r="1.1" fill="#1a3a5a"/>
  </svg>
`});var Rw={};he(Rw,{default:()=>W1,floatingBall:()=>zp});function Tw(){return{inited:!1,destroyed:!1,root:null,orb:null,menu:null,phoneScreen:null,phoneContent:null,phoneDock:null,phoneTime:null,dragHandle:null,menuClose:null,badge:null,styleEl:null,targetDoc:null,targetWin:null,cleanupRegistry:null,dragController:null,menuController:null,itemRegistry:null,appController:null,mutex:null,itemElCache:new Map,unsubscribers:[],openPopupRef:null,timeTimer:null}}function _w(){R=Tw()}function Ew(){return{storage:Ga,logger:Ct,closeMenu:()=>R.menuController?.close?.(),refresh:t=>R.itemRegistry?.refresh?.(t),mutex:R.mutex,get isOpen(){return!!R.menuController?.isOpen?.()}}}function ec(){if(!R.phoneContent||!R.phoneDock)return;if(R.appController?.hasActiveApp?.()){x1();return}R.itemElCache.forEach(({destroy:s})=>{if(typeof s=="function")try{s()}catch{}}),R.itemElCache.clear(),R.phoneContent.innerHTML="",R.phoneDock.innerHTML="";let t=R.itemRegistry.getAll(),{screenGroups:e,dockItems:r}=Ep(t),n=Ew();e.length===0&&r.length===0?R.phoneContent.appendChild(Ap(R.targetDoc,"\u6682\u65E0\u83DC\u5355\u9879")):e.length===0?R.phoneContent.appendChild(Ap(R.targetDoc,"\u6240\u6709\u9879\u90FD\u5728 Dock")):e.forEach(s=>{let o=[];s.items.forEach(i=>{let{el:l,sync:d}=Fl(R.targetDoc,i,n);R.itemElCache.set(i.id,{el:l,sync:d,destroy:i.destroy}),o.push(l)});let a=Fx(R.targetDoc,{groupTitle:s.groupTitle},o);R.phoneContent.appendChild(a)}),r.forEach(s=>{let{el:o,sync:a}=Fl(R.targetDoc,s,n);R.itemElCache.set(s.id,{el:o,sync:a,destroy:s.destroy}),R.phoneDock.appendChild(o)})}function x1(){let t=R.itemRegistry.getAll(),{dockItems:e}=Ep(t),r=new Set(e.map(s=>s.id));for(let s of r){let o=R.itemElCache.get(s);if(o?.destroy)try{o.destroy()}catch{}R.itemElCache.delete(s)}R.phoneDock.innerHTML="";let n=Ew();e.forEach(s=>{let{el:o,sync:a}=Fl(R.targetDoc,s,n);R.itemElCache.set(s.id,{el:o,sync:a,destroy:s.destroy}),R.phoneDock.appendChild(o)})}function Aw(t){let e=R.itemElCache.get(t);if(e?.sync)try{e.sync()}catch(r){Ct.error(`\u9879 ${t} sync \u5F02\u5E38: ${r?.message||r}`,r)}Dp()}function qa(){R.itemElCache.forEach((t,e)=>{Aw(e)})}function Dp(){if(!R.badge)return;let t=0,e=R.itemRegistry.getAll();for(let r of e)if(typeof r.badge=="function")try{let n=r.badge();typeof n=="number"&&n>0?t+=n:typeof n=="string"&&n&&n!=="0"&&(t+=1)}catch{}t>0?(R.badge.textContent=t>99?"99+":String(t),R.badge.classList.add("has-count")):(R.badge.textContent="0",R.badge.classList.remove("has-count"))}function tc(){R.phoneTime&&(R.phoneTime.textContent=$x())}function w1(){tc();let t=new Date,e=(60-t.getSeconds())*1e3-t.getMilliseconds();R.timeTimer=setTimeout(function(){tc(),R.timeTimer=setInterval(tc,6e4)},Math.max(500,e))}function v1(){R.timeTimer!=null&&(clearTimeout(R.timeTimer),clearInterval(R.timeTimer),R.timeTimer=null)}function Sw(t){R.root&&(R.root.style.left=`${t.x}px`,R.root.style.top=`${t.y}px`)}function S1(t){try{Ga.set(Tp,{x:t.x,y:t.y})}catch(e){Ct.warn(`\u4F4D\u7F6E\u6301\u4E45\u5316\u5931\u8D25: ${e?.message||e}`)}}function E1(){let t=R.itemRegistry;t.registerItem({id:"open-main-ui",label:"\u4E3B\u9762\u677F",group:"shortcuts",kind:"button",order:10,dock:!0,icon:T1,iconColor:"linear-gradient(140deg, #7bb7ff 0%, #4a7ec6 100%)",onClick:e=>{if(typeof R.openPopupRef=="function")try{R.openPopupRef()}catch(r){Ct.error(`\u6253\u5F00\u4E3B\u9762\u677F\u5931\u8D25: ${r?.message||r}`,r)}else Ct.warn("openPopup \u672A\u63D0\u4F9B");e.closeMenu()}}),t.registerItem({id:"compact-mode",label:"\u7D27\u51D1\u6A21\u5F0F",group:"preferences",groupTitle:"\u504F\u597D",kind:"toggle",order:10,icon:_1,iconColor:"linear-gradient(140deg, #3a3d4a 0%, #1f2128 100%)",getState:()=>{try{return Tt.getUiSettings()?.compactMode?"on":"off"}catch{return"off"}},onClick:async()=>{try{let e=Tt.getUiSettings()?.compactMode===!0;Tt.updateUiSettings({compactMode:!e})}catch(e){Ct.error(`\u5207\u6362\u7D27\u51D1\u6A21\u5F0F\u5931\u8D25: ${e?.message||e}`,e)}}})}function A1(){let t=()=>{R.itemRegistry?.refresh?.("compact-mode")},e=q.on(G.SETTINGS_UPDATED,t);R.unsubscribers.push(()=>{typeof e=="function"&&e()})}function C1(){kw({id:"demo-hello",label:"Demo",icon:"\u{1F44B}",iconColor:"linear-gradient(140deg, #ff9966 0%, #ff5e62 100%)",title:"Hello",group:"apps",groupTitle:"\u5E94\u7528",order:50,rootView:{id:"home",title:"\u9996\u9875",render:t=>k1(t)}});try{ww({floatingBall:zp,parentStorage:Ga,parentLogger:Ct,targetDoc:R.targetDoc})}catch(t){Ct.error(`registerQQApp \u5931\u8D25: ${t?.message||t}`,t)}}function k1(t){let e=R.targetDoc,r=e.createElement("div");r.style.cssText="padding:20px;color:rgba(255,255,255,0.85);";let n=e.createElement("p");n.textContent="\u8FD9\u662F Phase A1 demo App\u3002\u7528\u6765\u9A8C\u8BC1\u6D6E\u7403 App \u89C6\u56FE\u6808\u57FA\u7840\u8BBE\u65BD\u3002",n.style.cssText="margin:0 0 16px 0;font-size:12px;line-height:1.6;",r.appendChild(n);let s=e.createElement("button");s.type="button",s.textContent="\u524D\u5F80\u8BE6\u60C5 \u2192",s.style.cssText="padding:10px 18px;border-radius:10px;background:linear-gradient(140deg,#5b9bd9,#3a6db5);color:#fff;border:none;cursor:pointer;font-size:12px;font-weight:600;box-shadow:0 4px 12px rgba(91,155,217,0.3);",s.addEventListener("click",()=>{t.pushView({id:"detail",title:"\u8BE6\u60C5",render:()=>I1(t)})}),r.appendChild(s);let o=e.createElement("p");return o.textContent="\u70B9\u51FB\u5E95\u90E8 home indicator \u6216\u9876\u90E8 \u2190 \u53EF\u9000\u6808\u3002",o.style.cssText="margin:16px 0 0 0;font-size:11px;color:rgba(255,255,255,0.5);line-height:1.5;",r.appendChild(o),r}function I1(t){let e=R.targetDoc,r=e.createElement("div");r.style.cssText="padding:20px;color:rgba(255,255,255,0.85);";let n=e.createElement("p");n.textContent="\u8FD9\u662F\u8BE6\u60C5\u89C6\u56FE\uFF0C\u4ECE\u9996\u9875 push \u8FDB\u6765\u3002",n.style.cssText="margin:0 0 12px 0;font-size:12px;line-height:1.6;",r.appendChild(n);let s=e.createElement("p");s.textContent=`\u5F53\u524D\u6808\u6DF1\u5EA6: ${t.getStackDepth()}`,s.style.cssText="margin:0 0 16px 0;font-size:11px;color:rgba(255,255,255,0.5);",r.appendChild(s);let o=e.createElement("button");return o.type="button",o.textContent="\u5173\u95ED\u6574\u4E2A App",o.style.cssText="padding:8px 14px;border-radius:8px;background:rgba(255,255,255,0.08);color:#fff;border:1px solid rgba(255,255,255,0.15);cursor:pointer;font-size:11px;",o.addEventListener("click",()=>t.closeApp()),r.appendChild(o),r}function Bp(){if(!(!R.inited&&!R.root)){v1();try{R.appController?.destroyAll?.()}catch{}R.itemElCache.forEach(({destroy:t})=>{if(typeof t=="function")try{t()}catch{}}),R.itemElCache.clear(),R.unsubscribers.forEach(t=>{try{t()}catch{}});try{R.itemRegistry?.destroyAll?.()}catch{}try{R.cleanupRegistry?.removeAll?.()}catch{}R.root&&typeof R.root.remove=="function"&&R.root.remove(),R.styleEl&&typeof R.styleEl.remove=="function"&&R.styleEl.remove();try{lw(R.targetDoc)}catch{}try{R.targetWin&&R.targetWin[To]===Bp&&delete R.targetWin[To]}catch{}_w(),R.destroyed=!0,Ct.log("\u6D6E\u7403\u5DF2\u9500\u6BC1")}}function R1(t={}){let e=t.targetDocument||document,r=t.targetWindow||window;try{if(typeof r[To]=="function")try{r[To]()}catch{}}catch{}Mx(e),_w(),R.targetDoc=e,R.targetWin=r,R.openPopupRef=typeof t.openPopup=="function"?t.openPopup:null,R.styleEl=Rx(e,`${B}-style`,Cx());let n=Ix(e);R.root=n.root,R.orb=n.orb,R.menu=n.menu,R.phoneScreen=n.phoneScreen,R.phoneContent=n.phoneContent,R.phoneDock=n.phoneDock,R.phoneTime=n.phoneTime,R.dragHandle=n.dragHandle,R.menuClose=n.menuClose,R.badge=n.badge;let s=Ga.get(Tp,null),o=s&&Number.isFinite(s.x)&&Number.isFinite(s.y)?_p(s,r):Nx(r);Sw(o),(e.body||e.documentElement).appendChild(R.root),R.cleanupRegistry=Px(),R.mutex=kp(),R.menuController=Kx({root:R.root,menu:R.menu,targetWindow:r,onOpen:()=>{ec(),qa(),tc()},onClose:()=>{}}),R.dragController=Dx({root:R.root,orb:R.orb,menuHead:R.dragHandle,targetDocument:e,targetWindow:r,on:R.cleanupRegistry.on,savePosition:S1,onTapWhenNotDragged:()=>R.menuController.toggle(),onDragMove:()=>{R.menuController.isOpen()&&R.menuController.updateDirection()}}),R.itemRegistry=Ux({onChange:()=>{R.menuController.isOpen()&&(ec(),qa()),Dp()},onRefresh:i=>{i==null?qa():Aw(i)}}),R.appController=Hx({targetDoc:e,mountPoint:R.phoneContent,mutex:kp(),storage:Ga,logger:Ct,closeMenu:()=>R.menuController?.close?.(),onAppClosed:()=>{R.menuController?.isOpen?.()&&(ec(),qa())}}),R.cleanupRegistry.on(e,"click",i=>{R.menuController.isOpen()&&(R.dragController.isDragging()||R.root.contains(i.target)||R.menuController.close())}),R.cleanupRegistry.on(R.menuClose,"click",i=>{i.stopPropagation(),R.menuController.close()}),R.cleanupRegistry.on(r,"resize",()=>{if(!R.root)return;let i={x:parseInt(R.root.style.left,10)||0,y:parseInt(R.root.style.top,10)||0},l=_p(i,r);Sw(l),R.menuController.isOpen()&&R.menuController.updateDirection()});let a=R.phoneScreen?.querySelector?.(".phone-home-indicator");a&&R.cleanupRegistry.on(a,"click",i=>{R.appController?.hasActiveApp?.()&&(i.stopPropagation(),R.appController.popView())}),E1(),R.inited=!0,C1(),A1(),Dp(),w1();try{r[To]=Bp}catch{}Ct.log("\u6D6E\u7403\u5DF2\u521D\u59CB\u5316")}function Cw(){return R.inited===!0&&!!R.root}function Pt(t){return Cw()?!0:(Ct.warn(`\u6D6E\u7403\u672A\u5C31\u7EEA\uFF0C${t} \u88AB\u5FFD\u7565`),!1)}function M1(t){return Pt("registerItem")?R.itemRegistry.registerItem(t):()=>{}}function P1(t){return Pt("unregisterItem")?R.itemRegistry.unregisterItem(t):!1}function N1(t,e){if(!Pt("updateItem"))return!1;let r=R.itemRegistry.updateItem(t,e);return r&&R.menuController.isOpen()&&(ec(),qa()),r}function $1(t){Pt("refresh")&&R.itemRegistry.refresh(t)}function L1(t){Pt("setVisible")&&R.root.classList.toggle("is-hidden",!t)}function O1(){Pt("openMenu")&&R.menuController.open()}function D1(){Pt("closeMenu")&&R.menuController.close()}function B1(t){Pt("toggleMenu")&&(t===!0?R.menuController.open():t===!1?R.menuController.close():R.menuController.toggle())}function kw(t){if(!Pt("registerApp"))return()=>{};if(!t||!t.id)return Ct.warn("registerApp: \u7F3A\u5C11 id"),()=>{};try{R.appController.registerApp(t)}catch(r){return Ct.error(`registerApp \u5931\u8D25: ${r?.message||r}`,r),()=>{}}let e={id:t.id,label:t.label,kind:"app",icon:t.icon,iconColor:t.iconColor,group:t.group||"apps",groupTitle:t.groupTitle||"\u5E94\u7528",order:typeof t.order=="number"?t.order:100,badge:t.badge,visible:t.visible,onClick:async()=>{try{await R.appController?.openApp?.(t.id)}catch(r){Ct.error(`openApp ${t.id} \u5931\u8D25: ${r?.message||r}`,r)}}};try{R.itemRegistry.registerItem(e)}catch(r){Ct.error(`\u5408\u6210 App icon \u5931\u8D25: ${r?.message||r}`,r);try{R.appController.unregisterApp(t.id)}catch{}return()=>{}}return()=>Iw(t.id)}function Iw(t){if(!Pt("unregisterApp"))return!1;let e=!1;try{e=!!R.appController?.unregisterApp?.(t)}catch{}let r=R.itemRegistry.unregisterItem(t);return e||r}function z1(t){return Pt("openApp")?(R.menuController.isOpen()||R.menuController.open(),R.appController.openApp(t)):!1}function K1(){return Pt("closeApp")?R.appController.closeApp():!1}function F1(t){return Pt("pushView")?R.appController.pushView(t):!1}function U1(){return Pt("popView")?R.appController.popView():!1}function j1(t){return Pt("replaceView")?R.appController.replaceView(t):!1}var Ct,Ga,R,T1,_1,zp,W1,Mw=O(()=>{Je();Z();nt();oo();_o();kx();Lx();Bx();Cp();jx();qx();vw();Lp();Ct=$.createScope("FloatingBall"),Ga=j.namespace(Ax),R=Tw();T1=`
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
    <line x1="6" y1="18" x2="14" y2="10" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
    <path d="M15.5 4 L16.5 7.5 L20 8.5 L16.5 9.5 L15.5 13 L14.5 9.5 L11 8.5 L14.5 7.5 Z" fill="#fff"/>
  </svg>
`,_1=`
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
    <path d="M13 2 L4 14 L11 14 L10 22 L20 9 L13 9 Z" fill="currentColor" stroke="none"/>
  </svg>
`;zp={init:R1,destroy:Bp,isReady:Cw,registerItem:M1,unregisterItem:P1,updateItem:N1,refresh:$1,setVisible:L1,openMenu:O1,closeMenu:D1,toggleMenu:B1,registerApp:kw,unregisterApp:Iw,openApp:z1,closeApp:K1,pushView:F1,popView:U1,replaceView:j1},W1=zp});var Fp={};he(Fp,{confirmDeleteTool:()=>J1,confirmResetTools:()=>Z1,getAllTools:()=>Tr,getTool:()=>_r,showExportToolsDialog:()=>Q1,showImportToolsDialog:()=>X1,showToolEditDialog:()=>V1});async function V1(t=null){let e=t?_r(t):null,r=!!e,n=Te({value:e?.name||"",placeholder:"\u5DE5\u5177\u540D\u79F0"}),s=Me({value:e?.category||"utility",options:Y1}),o=Te({value:e?.description||"",placeholder:"\u5DE5\u5177\u63CF\u8FF0"}),a=f("input",{className:"yyt-input",attrs:{type:"number",min:"1000"},style:{padding:"7px 10px",fontSize:"12px"}});a.value=String(e?.config?.execution?.timeout||6e4);let i=f("input",{className:"yyt-input",attrs:{type:"number",min:"0",max:"10"},style:{padding:"7px 10px",fontSize:"12px"}});i.value=String(e?.config?.execution?.retries??3);function l(p,m,g=""){let h=f("div",{className:"yyt-form-group",style:{margin:"0 0 12px 0"}});return h.appendChild(f("label",{text:p,style:{fontSize:"12px",fontWeight:"600",color:"var(--yyt-text-secondary, rgba(255,255,255,0.55))",display:"block",marginBottom:"4px"}})),h.appendChild(m),g&&h.appendChild(f("div",{text:g,style:{fontSize:"11px",color:"var(--yyt-text-muted)",marginTop:"4px"}})),h}let d=f("div",{style:{display:"flex",flexDirection:"column"}}),c=f("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px"}});c.appendChild(l("\u5DE5\u5177\u540D\u79F0",n.el)),c.appendChild(l("\u5206\u7C7B",s.el)),d.appendChild(c),d.appendChild(l("\u63CF\u8FF0",o.el));let u=f("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px"}});u.appendChild(l("\u8D85\u65F6\u65F6\u95F4 (ms)",a)),u.appendChild(l("\u91CD\u8BD5\u6B21\u6570",i)),d.appendChild(u);let y=we.custom({title:r?`\u7F16\u8F91\u5DE5\u5177\u300C${e.name}\u300D`:"\u65B0\u5EFA\u5DE5\u5177",width:"480px",body:d,buttons:[{label:"\u53D6\u6D88",variant:"ghost",onClick:p=>p(null)},{label:r?"\u4FDD\u5B58":"\u521B\u5EFA",variant:"primary",onClick:p=>{let m=String(n.get()||"").trim();if(!m){n.el.focus();return}let g=t||`tool_${Date.now()}`;if(!$s(g,{name:m,category:s.get(),description:String(o.get()||"").trim(),promptTemplate:e?.promptTemplate||"",extractTags:Array.isArray(e?.extractTags)?e.extractTags:[],config:{execution:{timeout:Math.max(1e3,parseInt(a.value,10)||6e4),retries:Math.max(0,parseInt(i.value,10)||3)},api:e?.config?.api||{preset:"",useBypass:!1,bypassPreset:""},messages:Array.isArray(e?.config?.messages)?e.config.messages:[],context:{depth:e?.config?.context?.depth||3,includeTags:Array.isArray(e?.config?.context?.includeTags)?e.config.context.includeTags:[],excludeTags:Array.isArray(e?.config?.context?.excludeTags)?e.config.context.excludeTags:[]},worldbooks:{enabled:e?.config?.worldbooks?.enabled===!0,selected:Array.isArray(e?.config?.worldbooks?.selected)?e.config.worldbooks.selected:[]}},enabled:e?.enabled!==!1})){Kp.warn("saveTool \u5931\u8D25",{id:g});return}try{Ks(g)}catch(b){Kp.warn("ensureToolRuntimeConfig \u5F02\u5E38",{err:b})}p(g)}}]});return setTimeout(()=>n.el.focus(),0),y.result}async function J1(t){let e=_r(t);return!e||!await we.confirm({title:"\u5220\u9664\u5DE5\u5177",message:`\u786E\u5B9A\u5220\u9664\u5DE5\u5177\u300C${e.name}\u300D\uFF1F\u6B64\u64CD\u4F5C\u4E0D\u53EF\u64A4\u9500\u3002`,confirmText:"\u5220\u9664",danger:!0})?!1:Ls(t)}function Q1(){let t;try{t=Os()}catch(r){we.confirm({title:"\u5BFC\u51FA\u5931\u8D25",message:String(r?.message||r),confirmText:"\u786E\u5B9A"});return}let e=f("textarea",{className:"yyt-textarea",style:{width:"100%",minHeight:"220px",fontSize:"12px",fontFamily:"monospace"}});e.value=t,e.readOnly=!0,we.custom({title:"\u5BFC\u51FA\u5DE5\u5177 JSON",width:"600px",body:e,buttons:[{label:"\u5173\u95ED",variant:"ghost",onClick:r=>r(null)},{label:"\u590D\u5236\u5230\u526A\u8D34\u677F",variant:"ghost",onClick:async()=>{try{await navigator.clipboard.writeText(t)}catch{e.select();try{document.execCommand("copy")}catch{}}}},{label:"\u4E0B\u8F7D JSON",variant:"primary",onClick:()=>{try{let r=new Blob([t],{type:"application/json"}),n=URL.createObjectURL(r),s=f("a",{attrs:{href:n,download:`youyou_tools_${Date.now()}.json`}});document.body.appendChild(s),s.click(),setTimeout(()=>{try{document.body.removeChild(s)}catch{}try{URL.revokeObjectURL(n)}catch{}},100)}catch(r){Kp.warn("\u4E0B\u8F7D\u5931\u8D25",{err:r})}}}]})}async function X1(){let t=f("textarea",{className:"yyt-textarea",attrs:{placeholder:"\u7C98\u8D34 YouYou Toolkit \u5DE5\u5177 JSON"},style:{width:"100%",minHeight:"200px",fontSize:"12px",fontFamily:"monospace"}}),e=f("label",{style:{display:"flex",alignItems:"center",gap:"6px",fontSize:"12px",color:"var(--yyt-text-secondary)",marginTop:"8px"}}),r=f("input",{attrs:{type:"checkbox"}});e.appendChild(r),e.appendChild(f("span",{text:"\u8986\u76D6\u6A21\u5F0F\uFF08\u6E05\u7A7A\u5DF2\u6709\u5DE5\u5177\u540E\u518D\u5BFC\u5165\uFF1B\u4E0D\u52FE\u9009\u5219\u5408\u5E76\uFF09"}));let n=f("div");n.appendChild(t),n.appendChild(e),n.appendChild(f("div",{style:{display:"flex",gap:"6px",marginTop:"8px"}},se({label:"\u{1F4C1} \u4ECE\u6587\u4EF6\u2026",size:"small",variant:"ghost",onClick:()=>{let o=f("input",{attrs:{type:"file",accept:"application/json,.json"}});o.addEventListener("change",()=>{let a=o.files?.[0];if(!a)return;let i=new FileReader;i.onload=()=>{t.value=String(i.result||""),t.focus()},i.readAsText(a)}),o.click()}}).el));let s=we.custom({title:"\u5BFC\u5165\u5DE5\u5177 JSON",width:"520px",body:n,buttons:[{label:"\u53D6\u6D88",variant:"ghost",onClick:o=>o(null)},{label:"\u5BFC\u5165",variant:"primary",onClick:async o=>{let a=t.value.trim();if(!a){o(null);return}try{let i=Ds(a,{overwrite:r.checked});o(i)}catch(i){await we.confirm({title:"\u5BFC\u5165\u5931\u8D25",message:String(i?.message||i),confirmText:"\u786E\u5B9A"})}}}]});return setTimeout(()=>t.focus(),0),s.result}async function Z1(){return await we.confirm({title:"\u91CD\u7F6E\u6240\u6709\u5DE5\u5177",message:"\u6B64\u64CD\u4F5C\u4F1A\u5220\u9664\u6240\u6709\u81EA\u5B9A\u4E49\u5DE5\u5177\u4E0E\u9884\u8BBE\uFF0C\u4E0D\u53EF\u64A4\u9500\u3002\u5185\u7F6E\u5DE5\u5177\u4E0D\u53D7\u5F71\u54CD\u3002",confirmText:"\u91CD\u7F6E",danger:!0})?(Bs(),!0):!1}var Kp,Y1,Up=O(()=>{Fo();It();Qo();Ar();Z();Kp=$.createScope("ToolActions"),Y1=[{value:"api",label:"API"},{value:"prompt",label:"Prompt"},{value:"utility",label:"Utility"}]});Z();var qp=`/**\r
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
  background: var(--yyt-select-option-bg) !important;\r
  background-color: var(--yyt-select-option-bg) !important;\r
  color: var(--yyt-text) !important;\r
}\r
\r
.yyt-select option:hover {\r
  background: var(--yyt-select-option-hover-bg) !important;\r
  background-color: var(--yyt-select-option-hover-bg) !important;\r
  color: var(--yyt-text) !important;\r
}\r
\r
.yyt-select option:checked,\r
.yyt-select option[selected] {\r
  background: var(--yyt-select-option-selected-bg) !important;\r
  background-color: var(--yyt-select-option-selected-bg) !important;\r
  color: var(--yyt-text) !important;\r
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
  overflow: hidden;\r
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
  min-width: 0;\r
  height: 100%;\r
  overflow-x: hidden;\r
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
  min-width: 0;\r
  display: grid;\r
  grid-template-columns: minmax(230px, var(--yyt-shell-sidebar-width)) minmax(0, 1fr);\r
  gap: 16px;\r
  overflow: hidden;\r
}\r
\r
.yyt-shell-sidebar {\r
  min-height: 0;\r
  min-width: 0;\r
  overflow-x: hidden;\r
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
  min-width: 0;\r
  display: flex;\r
  flex-direction: column;\r
  gap: 14px;\r
  overflow: hidden;\r
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
  background: rgba(255, 255, 255, 0.06);\r
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
\r
/* ============================================================\r
   Settings Panel \u2014 v3.0\uFF08\u5BF9\u6807\u586B\u8868\u5DE5\u4F5C\u53F0 .yyt-tww-* / \u5DE5\u5177\u914D\u7F6E\u9762\u677F\uFF09\r
   ============================================================ */\r
\r
.yyt-settings-panel {\r
  display: flex;\r
  flex-direction: column;\r
  height: 100%;\r
  overflow: hidden;\r
  background: transparent;\r
}\r
\r
/* \u2500\u2500 Hero\uFF1A\u586B\u8868\u5DE5\u4F5C\u53F0\u540C\u6B3E\uFF08surface bg + actions \u5728\u53F3\uFF09 \u2500\u2500 */\r
.yyt-settings-hero {\r
  flex-shrink: 0;\r
  padding: 14px 18px;\r
  border-bottom: 1px solid var(--yyt-border);\r
  background: var(--yyt-surface);\r
  display: flex;\r
  flex-direction: column;\r
  gap: 8px;\r
}\r
\r
.yyt-settings-hero-row1 {\r
  display: flex;\r
  align-items: center;\r
  gap: 12px;\r
}\r
\r
.yyt-settings-hero-icon {\r
  width: 30px;\r
  height: 30px;\r
  border-radius: var(--yyt-radius-sm);\r
  background: var(--yyt-accent-soft);\r
  color: var(--yyt-accent);\r
  display: inline-flex;\r
  align-items: center;\r
  justify-content: center;\r
  font-size: 14px;\r
  flex-shrink: 0;\r
}\r
\r
.yyt-settings-hero-name {\r
  flex: 1;\r
  font-size: 15px;\r
  font-weight: 700;\r
  color: var(--yyt-text);\r
  min-width: 0;\r
}\r
\r
.yyt-settings-hero-actions {\r
  display: flex;\r
  gap: 8px;\r
  flex-shrink: 0;\r
}\r
\r
.yyt-settings-hero-desc {\r
  font-size: 12px;\r
  color: var(--yyt-text-muted);\r
  padding-left: 42px;\r
  line-height: 1.6;\r
}\r
\r
.yyt-settings-hero-chips {\r
  display: flex;\r
  gap: 6px;\r
  flex-wrap: wrap;\r
  padding-left: 42px;\r
}\r
\r
.yyt-settings-chip {\r
  display: inline-flex;\r
  align-items: center;\r
  gap: 5px;\r
  padding: 2px 8px;\r
  border-radius: 999px;\r
  font-size: 10px;\r
  font-weight: 600;\r
  letter-spacing: 0.3px;\r
  background: var(--yyt-surface-2);\r
  color: var(--yyt-text-muted);\r
}\r
\r
.yyt-settings-chip.mode {\r
  background: rgba(167, 139, 250, 0.12);\r
  color: #a78bfa;\r
}\r
\r
.yyt-settings-chip.preset {\r
  background: var(--yyt-accent-soft);\r
  color: var(--yyt-accent);\r
}\r
\r
/* \u2500\u2500 Tabs\uFF1Aunderline \u98CE\u683C \u2500\u2500 */\r
.yyt-settings-tabs {\r
  flex-shrink: 0;\r
  display: flex;\r
  gap: 0;\r
  padding: 0 18px;\r
  background: var(--yyt-surface);\r
  border-bottom: 1px solid var(--yyt-border);\r
}\r
\r
.yyt-settings-tab {\r
  position: relative;\r
  padding: 11px 14px;\r
  background: transparent;\r
  border: none;\r
  color: var(--yyt-text-secondary);\r
  font: inherit;\r
  font-size: 12px;\r
  font-weight: 600;\r
  cursor: pointer;\r
  display: inline-flex;\r
  align-items: center;\r
  gap: 6px;\r
  transition: color 0.12s ease;\r
  font-family: inherit;\r
}\r
\r
.yyt-settings-tab:hover {\r
  color: var(--yyt-text);\r
}\r
\r
.yyt-settings-tab.yyt-active {\r
  color: var(--yyt-accent);\r
}\r
\r
.yyt-settings-tab.yyt-active::after {\r
  content: '';\r
  position: absolute;\r
  left: 14px;\r
  right: 14px;\r
  bottom: -1px;\r
  height: 2px;\r
  background: var(--yyt-accent);\r
  border-radius: 2px 2px 0 0;\r
}\r
\r
/* \u2500\u2500 Scroll area \u2500\u2500 */\r
.yyt-settings-scroll {\r
  flex: 1;\r
  min-height: 0;\r
  overflow-y: auto;\r
}\r
\r
.yyt-settings-body {\r
  padding: 0 18px 22px;\r
}\r
\r
.yyt-settings-tab-pane {\r
  display: none;\r
  flex-direction: column;\r
}\r
\r
.yyt-settings-tab-pane.yyt-active {\r
  display: flex;\r
}\r
\r
/* \u2500\u2500 Section\uFF08\u5BF9\u6807 .yyt-tww-section\uFF09 \u2500\u2500 */\r
.yyt-settings-section {\r
  padding-top: 22px;\r
}\r
\r
.yyt-settings-tab-pane > .yyt-settings-section:first-child {\r
  padding-top: 18px;\r
}\r
\r
.yyt-settings-section + .yyt-settings-section {\r
  margin-top: 22px;\r
  border-top: 1px solid var(--yyt-border);\r
}\r
\r
.yyt-settings-section-heading {\r
  display: flex;\r
  align-items: center;\r
  gap: 8px;\r
  margin-bottom: 12px;\r
  font-size: 12px;\r
  font-weight: 700;\r
  color: var(--yyt-text);\r
  text-transform: uppercase;\r
  letter-spacing: 0.3px;\r
}\r
\r
.yyt-settings-section-icon {\r
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
.yyt-settings-section-action {\r
  margin-left: auto;\r
  display: flex;\r
  gap: 6px;\r
}\r
\r
/* \u2500\u2500 Stat Row\uFF08\u5BF9\u6807 .yyt-tww-stat-row \u7684 4 \u5217\u7AD6\u7EBF\uFF09 \u2500\u2500 */\r
.yyt-settings-stat-row {\r
  display: grid;\r
  grid-template-columns: repeat(4, 1fr);\r
  margin-bottom: 12px;\r
  padding: 4px 0;\r
}\r
\r
.yyt-settings-stat {\r
  display: flex;\r
  flex-direction: column;\r
  gap: 3px;\r
  border-left: 1px solid var(--yyt-border);\r
  padding-left: 14px;\r
}\r
\r
.yyt-settings-stat:first-child {\r
  border-left: none;\r
  padding-left: 0;\r
}\r
\r
.yyt-settings-stat-label {\r
  font-size: 10px;\r
  font-weight: 700;\r
  color: var(--yyt-text-muted);\r
  text-transform: uppercase;\r
  letter-spacing: 0.4px;\r
}\r
\r
.yyt-settings-stat-value {\r
  font-size: 13px;\r
  font-weight: 600;\r
  color: var(--yyt-text);\r
  font-variant-numeric: tabular-nums;\r
}\r
\r
.yyt-settings-stat-value.success { color: var(--yyt-success); }\r
.yyt-settings-stat-value.error { color: var(--yyt-error); }\r
.yyt-settings-stat-value.muted { color: var(--yyt-text-muted); }\r
\r
/* \u2500\u2500 Row\uFF08\u5BF9\u6807 .yyt-tww-row\uFF09 \u2500\u2500 */\r
.yyt-settings-row {\r
  display: grid;\r
  grid-template-columns: 200px 1fr;\r
  gap: 12px;\r
  align-items: center;\r
  padding: 10px 0;\r
}\r
\r
.yyt-settings-row + .yyt-settings-row,\r
.yyt-settings-row + .yyt-settings-toggle-row,\r
.yyt-settings-toggle-row + .yyt-settings-row,\r
.yyt-settings-toggle-row + .yyt-settings-toggle-row,\r
.yyt-settings-row + .yyt-settings-row-double,\r
.yyt-settings-row-double + .yyt-settings-row,\r
.yyt-settings-row-double + .yyt-settings-row-double,\r
.yyt-settings-row-double + .yyt-settings-toggle-row,\r
.yyt-settings-toggle-row + .yyt-settings-row-double {\r
  border-top: 1px dashed rgba(255, 255, 255, 0.08);\r
}\r
\r
.yyt-settings-row-label {\r
  display: flex;\r
  flex-direction: column;\r
  gap: 2px;\r
  min-width: 0;\r
}\r
\r
.yyt-settings-row-label-text {\r
  font-size: 12px;\r
  font-weight: 600;\r
  color: var(--yyt-text-secondary);\r
}\r
\r
.yyt-settings-row-label-hint {\r
  font-size: 10px;\r
  color: var(--yyt-text-muted);\r
}\r
\r
/* \u2500\u2500 Row Double\uFF08label + \u53CC\u8F93\u5165\u6846\u6A2A\u6392\uFF09 \u2500\u2500 */\r
.yyt-settings-row-double {\r
  display: grid;\r
  grid-template-columns: 200px 1fr 1fr;\r
  gap: 12px;\r
  align-items: center;\r
  padding: 10px 0;\r
}\r
\r
.yyt-settings-row-double-cell {\r
  display: flex;\r
  align-items: center;\r
  gap: 10px;\r
}\r
\r
.yyt-settings-row-double-cell-label {\r
  font-size: 11px;\r
  color: var(--yyt-text-muted);\r
  white-space: nowrap;\r
}\r
\r
/* \u2500\u2500 Toggle Row\uFF08\u5BF9\u6807 .yyt-tww-toggle-row\uFF09 \u2500\u2500 */\r
.yyt-settings-toggle-row {\r
  display: flex;\r
  align-items: center;\r
  justify-content: space-between;\r
  padding: 12px 0;\r
  gap: 16px;\r
}\r
\r
.yyt-settings-toggle-info {\r
  flex: 1;\r
  min-width: 0;\r
}\r
\r
.yyt-settings-toggle-title {\r
  font-size: 12px;\r
  font-weight: 600;\r
  color: var(--yyt-text-secondary);\r
}\r
\r
.yyt-settings-toggle-desc {\r
  font-size: 10px;\r
  color: var(--yyt-text-muted);\r
  margin-top: 2px;\r
}\r
\r
/* settings panel \u5185\u7684 toggle \u63A7\u4EF6\u56DE\u5230\u7D27\u51D1\u5C3A\u5BF8\uFF08\u8986\u76D6 main.css \u9ED8\u8BA4 52\xD730\uFF09 */\r
.yyt-settings-toggle-row > .yyt-toggle {\r
  width: 34px;\r
  height: 18px;\r
  align-self: center;\r
}\r
\r
.yyt-settings-toggle-row > .yyt-toggle .yyt-toggle-slider {\r
  box-shadow: none;\r
}\r
\r
.yyt-settings-toggle-row > .yyt-toggle .yyt-toggle-slider::before {\r
  width: 14px;\r
  height: 14px;\r
  left: 1px;\r
  bottom: 1px;\r
}\r
\r
.yyt-settings-toggle-row > .yyt-toggle input:checked + .yyt-toggle-slider::before {\r
  transform: translateX(16px);\r
}\r
\r
/* settings \u63A7\u4EF6\u7EDF\u4E00\u7D27\u51D1\u5C3A\u5BF8\uFF08\u5BF9\u6807 .yyt-tww-ctrl\uFF09 */\r
.yyt-settings-row > .yyt-input,\r
.yyt-settings-row > .yyt-select,\r
.yyt-settings-row-double-cell > .yyt-input,\r
.yyt-settings-row-double-cell > .yyt-select {\r
  min-height: 32px;\r
  padding: 6px 10px;\r
  font-size: 12px;\r
  width: 100%;\r
}\r
\r
.yyt-settings-row-double-cell > .yyt-input {\r
  flex: 1;\r
}\r
\r
.yyt-settings-row > select.yyt-select,\r
.yyt-settings-row-double-cell > select.yyt-select {\r
  padding-right: 28px;\r
  background-size: 10px;\r
  background-position: right 10px center;\r
}\r
\r
/* \u2500\u2500 Hint Note \u2500\u2500 */\r
.yyt-settings-hint-note {\r
  font-size: 11px;\r
  color: var(--yyt-text-muted);\r
  line-height: 1.6;\r
  padding: 8px 0 10px;\r
  margin: 0;\r
  border-bottom: 1px dashed rgba(255, 255, 255, 0.08);\r
}\r
\r
.yyt-settings-hint-note:last-child {\r
  border-bottom: none;\r
}\r
\r
.yyt-settings-hint-note code {\r
  color: var(--yyt-accent-strong);\r
  background: var(--yyt-surface-2);\r
  padding: 1px 5px;\r
  border-radius: 3px;\r
  font-size: 10px;\r
}\r
\r
/* \u2500\u2500 Runtime List\uFF08\u81EA\u52A8\u89E6\u53D1\u8BCA\u65AD\u4E8B\u52A1\u8BB0\u5F55\uFF09 \u2500\u2500 */\r
.yyt-runtime-list {\r
  display: flex;\r
  flex-direction: column;\r
  margin-top: 8px;\r
}\r
\r
.yyt-runtime-list-row {\r
  display: grid;\r
  grid-template-columns: minmax(120px, 180px) minmax(60px, 90px) minmax(110px, 1fr);\r
  gap: 12px;\r
  padding: 8px 0;\r
  border-top: 1px dashed rgba(255, 255, 255, 0.08);\r
  font-size: 11px;\r
  align-items: baseline;\r
}\r
\r
.yyt-runtime-list-row:first-child {\r
  border-top: 1px solid var(--yyt-border);\r
}\r
\r
.yyt-runtime-event {\r
  color: var(--yyt-accent);\r
  font-weight: 600;\r
  font-variant-numeric: tabular-nums;\r
}\r
\r
.yyt-runtime-phase {\r
  display: inline-flex;\r
  align-items: center;\r
  gap: 4px;\r
  padding: 1px 7px;\r
  border-radius: 4px;\r
  background: var(--yyt-surface-2);\r
  color: var(--yyt-text-secondary);\r
  font-size: 10px;\r
  font-weight: 600;\r
  width: fit-content;\r
}\r
\r
.yyt-runtime-phase.success {\r
  background: rgba(74, 222, 128, 0.12);\r
  color: var(--yyt-success);\r
}\r
\r
.yyt-runtime-phase.error {\r
  background: rgba(239, 68, 68, 0.12);\r
  color: var(--yyt-error);\r
}\r
\r
.yyt-runtime-main {\r
  color: var(--yyt-text-muted);\r
  word-break: break-word;\r
}\r
\r
/* \u2500\u2500 Macro List\uFF08\u6A21\u677F\u5B8F\u8BF4\u660E\uFF09 \u2500\u2500 */\r
.yyt-macro-list {\r
  display: flex;\r
  flex-direction: column;\r
  margin-top: 8px;\r
}\r
\r
.yyt-macro-row {\r
  display: grid;\r
  grid-template-columns: minmax(180px, 220px) 1fr;\r
  gap: 12px;\r
  padding: 8px 0;\r
  border-top: 1px dashed rgba(255, 255, 255, 0.08);\r
  align-items: baseline;\r
}\r
\r
.yyt-macro-row:first-child {\r
  border-top: 1px solid var(--yyt-border);\r
}\r
\r
.yyt-macro-row code {\r
  color: var(--yyt-accent-strong);\r
  font-family: ui-monospace, Consolas, monospace;\r
  font-size: 11px;\r
  font-weight: 700;\r
  word-break: break-word;\r
}\r
\r
.yyt-macro-row span {\r
  color: var(--yyt-text-secondary);\r
  font-size: 12px;\r
}\r
`;pt();function Pw(t,e={}){let{constants:r,topLevelWindow:n,modules:s}=t,{SCRIPT_ID:o,SCRIPT_VERSION:a,MENU_ITEM_ID:i,MENU_CONTAINER_ID:l}=r,d=null,c=!1,u=$.createScope("Bootstrap");$.setToastHandler((T,E,w)=>{if(w.toast&&Za(w.toast===!0?T:w.toast,E,w.duration),w.topNotice){let _=typeof w.topNotice=="object"?w.topNotice:{};uc(T,E,_)}});function y(...T){u.log(T.join(" "))}function p(...T){u.error(T.join(" "))}async function m(){return d||(d=(async()=>{try{s.storageModule=await Promise.resolve().then(()=>(Je(),iy)),s.apiConnectionModule=await Promise.resolve().then(()=>(Cs(),py)),s.presetManagerModule=await Promise.resolve().then(()=>(ks(),gy)),s.uiModule=await Promise.resolve().then(()=>(yx(),px)),s.regexExtractorModule=await Promise.resolve().then(()=>(Xn(),Jc)),s.toolManagerModule=await Promise.resolve().then(()=>(Qo(),kf)),s.toolExecutorModule=await Promise.resolve().then(()=>(tu(),eu)),s.windowManagerModule=await Promise.resolve().then(()=>(Pu(),vb)),s.toolRegistryModule=await Promise.resolve().then(()=>(Ar(),sd)),s.settingsServiceModule=await Promise.resolve().then(()=>(oo(),Tg)),s.bypassManagerModule=await Promise.resolve().then(()=>(so(),Sg)),s.variableResolverModule=await Promise.resolve().then(()=>(el(),Cg)),s.contextInjectorModule=await Promise.resolve().then(()=>(cs(),Eg)),s.toolPromptServiceModule=await Promise.resolve().then(()=>(rl(),Rg)),s.toolOutputServiceModule=await Promise.resolve().then(()=>(ga(),Pg)),s.toolAutomationServiceModule=await Promise.resolve().then(()=>(wx(),xx)),s.toolDataProviderModule=await Promise.resolve().then(()=>(Js(),Rm)),s.presetBootstrapModule=await Promise.resolve().then(()=>(Ex(),_x)),s.floatingBallModule=await Promise.resolve().then(()=>(Mw(),Rw));try{s.toolDataProviderModule.getToolDataProvider({extensionVersion:a}).then(T=>{u.log(`Provider \u5C31\u7EEA: ${T.kind}`)}).catch(T=>{u.error(`Provider \u521D\u59CB\u5316\u5F02\u5E38: ${T?.message||T}`)})}catch(T){u.error(`Provider \u542F\u52A8\u5F02\u5E38: ${T?.message||T}`)}return s.toolOutputServiceModule?.toolOutputService&&s.apiConnectionModule&&s.toolOutputServiceModule.toolOutputService.setApiConnection(s.apiConnectionModule),!0}catch(T){return d=null,p("\u6A21\u5757\u52A0\u8F7D\u5931\u8D25\uFF0C\u4F7F\u7528\u5185\u7F6E\u529F\u80FD:",T),p("\u5DF2\u52A0\u8F7D\u6A21\u5757:",Object.keys(s).filter(E=>s[E])),!1}})(),d)}function g(){let T=`${o}-styles`,E=n.document||document;if(E.getElementById(T))return;let w=E.createElement("style");w.id=T,w.textContent=qp,(E.head||E.documentElement).appendChild(w),y("\u6837\u5F0F\u5DF2\u6CE8\u5165")}function h(){let T=n.document||document;if(s.uiModule?.getAllStyles){let E=`${o}-ui-styles`;if(!T.getElementById(E)){let w=T.createElement("style");w.id=E,w.textContent=s.uiModule.getAllStyles(),(T.head||T.documentElement).appendChild(w)}}}async function b(){try{let{applyUiPreferences:T}=await Promise.resolve().then(()=>(uu(),du));if(s.settingsServiceModule?.settingsService){let E=s.settingsServiceModule.settingsService.getUiSettings();if(E&&E.theme){let w=n.document||document;T(E,w),y(`\u4E3B\u9898\u5DF2\u5E94\u7528: ${E.theme}`)}}}catch(T){y("\u4E3B\u9898\u52A0\u8F7D\u5931\u8D25:",T)}}function v(){let T=n.jQuery||window.jQuery;if(!T){p("jQuery \u672A\u627E\u5230\uFF0C\u5EF6\u8FDF\u91CD\u8BD5..."),setTimeout(v,1e3);return}let E=n.document||document,w=T("#extensionsMenu",E);if(!w.length){y("\u9B54\u68D2\u83DC\u5355\u672A\u627E\u5230\uFF0C\u5EF6\u8FDF\u91CD\u8BD5..."),setTimeout(v,2e3);return}if(T(`#${l}`,w).length>0){y("\u83DC\u5355\u9879\u5DF2\u5B58\u5728");return}let A=T(`<div class="extension_container interactable" id="${l}" tabindex="0"></div>`),I=`
      <div class="list-group-item flex-container flexGap5 interactable" id="${i}" title="\u6253\u5F00 YouYou \u5DE5\u5177\u7BB1">
        <div class="fa-fw fa-solid fa-wand-magic-sparkles extensionsMenuExtensionButton"></div>
        <span>YouYou \u5DE5\u5177\u7BB1</span>
      </div>
    `,P=T(I);P.on("click",function(N){N.stopPropagation(),y("\u83DC\u5355\u9879\u88AB\u70B9\u51FB");let W=T("#extensionsMenuButton",E);W.length&&w.is(":visible")&&W.trigger("click"),typeof e.openPopup=="function"&&e.openPopup()}),A.append(P),w.append(A),y("\u83DC\u5355\u9879\u5DF2\u6DFB\u52A0\u5230\u9B54\u68D2\u533A")}async function x(){y(`\u521D\u59CB\u5316\u5F00\u59CB... \u7248\u672C: ${a}`),await g();let T=await m();if(y(T?"\u6240\u6709\u6A21\u5757\u52A0\u8F7D\u6210\u529F":"\u90E8\u5206\u6A21\u5757\u52A0\u8F7D\u5931\u8D25\uFF0C\u4F7F\u7528\u53EF\u7528\u529F\u80FD"),!c&&s.uiModule?.initUI)try{await s.uiModule.initUI({services:s,autoInjectStyles:!1,targetDocument:n.document||document}),c=!0,y("UI \u88C5\u914D\u4E2D\u5FC3\u5DF2\u521D\u59CB\u5316")}catch(w){p("UI \u6A21\u5757\u521D\u59CB\u5316\u5931\u8D25:",w)}if(s.uiModule&&(h(),await b()),s.presetBootstrapModule?.ensurePresetSystem)try{let w=s.presetBootstrapModule.ensurePresetSystem();w?.aborted?y(`\u9884\u8BBE\u7CFB\u7EDF\u8FC1\u79FB\u5931\u8D25\u5DF2 abort\uFF0C\u8001\u5B57\u6BB5\u4FDD\u7559: ${w.error}`):w?.skipped?y(`\u9884\u8BBE\u7CFB\u7EDF\u5DF2\u5C31\u7EEA\uFF08${w.reason}\uFF09`):y(`\u9884\u8BBE\u7CFB\u7EDF\u8FC1\u79FB\u5B8C\u6210\uFF08${w.migratedCount}/${w.total} \u5DE5\u5177\uFF09`)}catch(w){p("\u9884\u8BBE\u7CFB\u7EDF\u521D\u59CB\u5316\u5F02\u5E38:",w)}if(s.toolAutomationServiceModule?.toolAutomationService){let w=s.toolAutomationServiceModule.toolAutomationService.init();y(w?"\u81EA\u52A8\u5316\u751F\u547D\u5468\u671F\u670D\u52A1\u5DF2\u521D\u59CB\u5316":"\u81EA\u52A8\u5316\u751F\u547D\u5468\u671F\u670D\u52A1\u521D\u59CB\u5316\u672A\u5B8C\u6210\uFF0C\u7B49\u5F85\u5BBF\u4E3B\u4E8B\u4EF6\u6E90\u91CD\u8BD5")}let E=n.document||document;if(E.readyState==="loading"?E.addEventListener("DOMContentLoaded",()=>{setTimeout(v,1e3)}):setTimeout(v,1e3),s.floatingBallModule?.floatingBall)try{s.floatingBallModule.floatingBall.init({targetDocument:n.document||document,targetWindow:n||window,openPopup:e.openPopup})}catch(w){p("\u6D6E\u7403\u521D\u59CB\u5316\u5931\u8D25:",w)}y("\u521D\u59CB\u5316\u5B8C\u6210")}return{loadModules:m,injectStyles:g,addMenuItem:v,init:x,log:y,logError:p}}nt();pt();pt();Z();var Ro=$.createScope("PromptEditor"),H1="youyou_toolkit_prompt_editor",q1={system:"System Prompt (\u7CFB\u7EDF\u63D0\u793A\u8BCD)",ai:"AI Prompt (AI\u6307\u4EE4\u63D0\u793A\u8BCD)",user:"User Prompt (\u7528\u6237\u63D0\u793A\u8BCD)"},G1={system:"fa-server",ai:"fa-robot",user:"fa-user"},Ya=[{id:"system_1",type:"system",role:"SYSTEM",mainSlot:"",content:"",deletable:!1,expanded:!0},{id:"ai_1",type:"ai",role:"USER",mainSlot:"A",content:"",deletable:!1,expanded:!0,isMain:!0},{id:"user_1",type:"user",role:"USER",mainSlot:"B",content:"",deletable:!1,expanded:!0,isMain2:!0}],rc=class{constructor(e={}){this.containerId=e.containerId||H1,this.segments=e.segments||[...Ya],this.onChange=e.onChange||null,this.editable=e.editable!==!1,this.showMainSlot=e.showMainSlot!==!1,this.$container=null,this.$=null}init(e){if(this.$=window.jQuery||window.parent?.jQuery,!this.$){Ro.error("jQuery not available");return}this.$container=e,this.render(),this.bindEvents()}setSegments(e){this.segments=e&&Array.isArray(e)?[...e]:[...Ya],this.$container&&(this.render(),this.bindEvents())}getSegments(){return this.segments.map(e=>({...e,content:this.getSegmentContent(e.id)}))}getSegmentContent(e){return this.$container&&this.$container.find(`[data-segment-id="${e}"] .yyt-prompt-textarea`).val()||""}render(){if(!this.$container)return;let e=`
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
    `;this.$container.html(e)}renderSegment(e){let r=q1[e.type]||e.type,n=G1[e.type]||"fa-file",s=e.mainSlot==="A"||e.isMain,o=e.mainSlot==="B"||e.isMain2,a=s?"var(--yyt-accent, #7bb7ff)":o?"#ffb74d":"",i=this.showMainSlot&&e.mainSlot?`<span class="yyt-prompt-slot-badge">mainSlot: ${e.mainSlot}</span>`:"",l=`<span class="yyt-prompt-role-badge">role: ${e.role||"USER"}</span>`;return`
      <div class="yyt-prompt-segment ${e.expanded?"yyt-expanded":""} ${s?"yyt-main-a":""} ${o?"yyt-main-b":""}" 
           data-segment-id="${e.id}" 
           data-segment-type="${e.type}"
           style="${a?`border-left: 3px solid ${a};`:""}">
        <div class="yyt-prompt-segment-header">
          <div class="yyt-prompt-segment-info">
            <i class="fa-solid ${n}"></i>
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
    `}bindEvents(){this.$container&&(jt(this.$container,"yytPromptEditorSelect"),this.$container.off(".yytPromptEditor"),this.$container.on("click.yytPromptEditor",".yyt-prompt-toggle",e=>{this.$(e.currentTarget).closest(".yyt-prompt-segment").toggleClass("yyt-expanded"),this.$(e.currentTarget).find("i").toggleClass("fa-chevron-up fa-chevron-down")}),this.$container.on("click.yytPromptEditor",".yyt-prompt-delete",e=>{let r=this.$(e.currentTarget).closest(".yyt-prompt-segment").data("segment-id");this.deleteSegment(r)}),this.$container.on("change.yytPromptEditor",".yyt-prompt-role",e=>{let r=this.$(e.currentTarget).closest(".yyt-prompt-segment").data("segment-id"),n=this.$(e.currentTarget).val();this.updateSegmentMeta(r,{role:n})}),this.$container.on("change.yytPromptEditor",".yyt-prompt-main-slot",e=>{let r=this.$(e.currentTarget).closest(".yyt-prompt-segment").data("segment-id"),n=this.$(e.currentTarget).val();this.updateSegmentMeta(r,{mainSlot:n})}),this.$container.on("input.yytPromptEditor",".yyt-prompt-textarea",e=>{this.onChange&&this.onChange(this.getSegments())}),this.$container.on("click.yytPromptEditor",`#${this.containerId}-add-segment`,()=>{this.addSegment()}),this.$container.on("click.yytPromptEditor",`#${this.containerId}-import-prompt`,()=>{this.importPrompt()}),this.$container.on("click.yytPromptEditor",`#${this.containerId}-export-prompt`,()=>{this.exportPrompt()}),xr(this.$container,{namespace:"yytPromptEditorSelect",selectors:[".yyt-prompt-role",".yyt-prompt-main-slot"]}))}addSegment(e=null){let r=`segment_${Date.now()}`,n=e||{id:r,type:"user",role:"USER",mainSlot:"",content:"",deletable:!0,expanded:!0};n.id||(n.id=r),this.segments.push(n),this.render(),this.bindEvents(),this.onChange&&this.onChange(this.getSegments())}deleteSegment(e){let r=this.segments.findIndex(s=>s.id===e);if(r===-1)return;if(this.segments[r].deletable===!1){Ro.warn("\u8BE5\u6BB5\u843D\u4E0D\u53EF\u5220\u9664");return}this.segments.splice(r,1),this.render(),this.bindEvents(),this.onChange&&this.onChange(this.getSegments())}updateSegmentMeta(e,r){let n=this.segments.find(s=>s.id===e);n&&(Object.assign(n,r),this.onChange&&this.onChange(this.getSegments()))}importPrompt(){let e=document.createElement("input");e.type="file",e.accept=".json",e.onchange=r=>{let n=r.target.files[0];if(!n)return;let s=new FileReader;s.onload=o=>{try{let a=JSON.parse(o.target.result);Array.isArray(a)?(this.setSegments(a),Ro.log("\u63D0\u793A\u8BCD\u5BFC\u5165\u6210\u529F")):Ro.error("\u65E0\u6548\u7684\u63D0\u793A\u8BCD\u683C\u5F0F")}catch(a){Ro.error("\u5BFC\u5165\u5931\u8D25:",a)}},s.readAsText(n)},e.click()}exportPrompt(){let e=this.getSegments(),r=JSON.stringify(e,null,2),n=new Blob([r],{type:"application/json"}),s=URL.createObjectURL(n),o=document.createElement("a");o.href=s,o.download=`prompt_group_${Date.now()}.json`,o.click(),URL.revokeObjectURL(s),Ro.log("\u63D0\u793A\u8BCD\u5DF2\u5BFC\u51FA")}destroy(){this.$container&&(jt(this.$container,"yytPromptEditorSelect"),this.$container.off(".yytPromptEditor"))}escapeHtml(e){return typeof e!="string"?"":e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}};function Nw(){return`
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
  `}function $w(t){return t.filter(e=>e.content&&e.content.trim()).map(e=>({role:e.role,content:e.content,deletable:e.deletable,mainSlot:e.mainSlot}))}function Lw(t){return Array.isArray(t)?t.map((e,r)=>({id:`segment_${r}_${Date.now()}`,type:e.role==="SYSTEM"?"system":e.role==="assistant"?"ai":"user",role:e.role,mainSlot:e.mainSlot||"",content:e.content||"",deletable:e.deletable!==!1,expanded:!0,isMain:e.mainSlot==="A"||e.isMain,isMain2:e.mainSlot==="B"||e.isMain2})):[...Ya]}Z();function Ow(t){let{constants:e,topLevelWindow:r,modules:n,caches:s,uiState:o}=t,{SCRIPT_ID:a,SCRIPT_VERSION:i,POPUP_ID:l}=e,d=$.createScope("PopupShell"),c={cleanup:null},u={cleanups:[]},y={cleanups:[]},p={current:null};function m(){return!!o.sidebarCollapsed}function g(){o.sidebarCollapsed=!o.sidebarCollapsed;let S=o.currentPopup;if(!S)return;let k=S.querySelector(".yyt-shell-sidebar"),D=S.querySelector(".yyt-shell-workspace"),K=S.querySelector(".yyt-sidebar-toggle i");k&&k.classList.toggle("yyt-collapsed",o.sidebarCollapsed),D&&D.classList.toggle("yyt-sidebar-collapsed",o.sidebarCollapsed),K&&(K.className=o.sidebarCollapsed?"fa-solid fa-angles-right":"fa-solid fa-angles-left"),X()}function h(...S){d.log(S.join(" "))}function b(...S){d.error(S.join(" "))}function v(S){return typeof S!="string"?"":S.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function x(){return r.jQuery||window.jQuery}function T(){return r.document||document}function E(S){if(!S)return"\u672A\u9009\u62E9\u9875\u9762";let k=n.toolRegistryModule?.getToolConfig(S);if(!k)return S;if(!k.hasSubTabs)return k.name||S;let D=_(S),K=k.subTabs?.find(Y=>Y.id===D);return K?.name?`${k.name} / ${K.name}`:k.name||S}function w(S){if(!S)return"\u8BF7\u9009\u62E9\u5DE6\u4FA7\u5BFC\u822A\u4E2D\u7684\u9875\u9762\u8FDB\u884C\u914D\u7F6E\u6216\u6392\u67E5\u3002";let k=n.toolRegistryModule?.getToolConfig(S);if(!k)return"\u5F53\u524D\u9875\u9762\u63CF\u8FF0\u6682\u4E0D\u53EF\u7528\u3002";if(!k.hasSubTabs)return k.description||"\u5728\u8FD9\u91CC\u7BA1\u7406\u5F53\u524D\u9875\u9762\u7684\u914D\u7F6E\u548C\u64CD\u4F5C\u3002";let D=_(S);return k.subTabs?.find(Y=>Y.id===D)?.description||k.description||"\u5728\u8FD9\u91CC\u7BA1\u7406\u5F53\u524D\u5DE5\u5177\u7684\u6A21\u677F\u3001\u914D\u7F6E\u4E0E\u8C03\u8BD5\u80FD\u529B\u3002"}function _(S,k=""){let D=n.toolRegistryModule?.getToolConfig(S);if(!D?.hasSubTabs||!Array.isArray(D.subTabs)||D.subTabs.length===0)return"";let K=String(k||o.currentSubTab[S]||"").trim(),V=K&&D.subTabs.some(me=>me?.id===K)?K:D.subTabs[0]?.id||"";return V&&o.currentSubTab[S]!==V&&(o.currentSubTab[S]=V),V}function A(){let S=o.currentPopup;if(!S)return;let k=E(o.currentMainTab),D=w(o.currentMainTab),K=S.querySelector(".yyt-popup-active-label");K&&(K.textContent=`\u5F53\u524D\uFF1A${k}`);let Y=S.querySelector(".yyt-shell-breadcrumb");Y&&(Y.textContent=k);let V=S.querySelector(".yyt-shell-main-title");V&&(V.textContent=k);let me=S.querySelector(".yyt-shell-main-description");me&&(me.textContent=D)}function I(){typeof c.cleanup=="function"&&(c.cleanup(),c.cleanup=null)}function P(){Array.isArray(u.cleanups)&&(u.cleanups.forEach(S=>{typeof S=="function"&&S()}),u.cleanups=[])}function C(){Array.isArray(y.cleanups)&&(y.cleanups.forEach(S=>{typeof S=="function"&&S()}),y.cleanups=[])}function N(S,k){if(!S||!k)return!1;let D=S.jquery?S[0]:S,K=k.jquery?k[0]:k;return!!(D&&K&&D===K)}function W(S={}){let{container:k=null}=S,D=p.current;if(D&&!(k&&!N(D.container,k))){try{typeof D.destroy=="function"&&D.destroy(D.container)}catch(K){b("\u9500\u6BC1\u52A8\u6001\u9762\u677F host \u5931\u8D25",K)}n.uiModule?.uiManager?.destroyContainerInstance&&n.uiModule.uiManager.destroyContainerInstance(D.container),p.current=null}}function H(S,k={}){p.current={key:k.key||"",container:S,destroy:typeof k.destroy=="function"?k.destroy:null}}function ee(){let S=x();if(!S||!o.currentPopup)return;let k=n.toolRegistryModule?.getToolList()||[],D=S(o.currentPopup).find(".yyt-main-nav");if(!D.length)return;let K=k.map(V=>`
      <div class="yyt-main-nav-item ${V.id===o.currentMainTab?"active":""}" data-tab="${V.id}">
        <div class="yyt-main-nav-icon">
          <i class="fa-solid ${v(V.icon||"fa-file")}"></i>
        </div>
        <div class="yyt-main-nav-copy">
          <span class="yyt-main-nav-name">${v(V.name||V.id)}</span>
          <span class="yyt-main-nav-desc">${v(V.description||"\u8FDB\u5165\u6B64\u9875\u9762\u8FDB\u884C\u914D\u7F6E\u3001\u67E5\u770B\u6216\u7EF4\u62A4\u3002")}</span>
        </div>
      </div>
    `).join("");D.html(K),S(o.currentPopup).find(".yyt-main-nav-item").on("click",function(){let me=S(this).data("tab");me&&$n(me)});let Y=S(o.currentPopup).find(".yyt-shell-sidebar-hint");Y.length&&Y.text(`${k.length} tabs`)}function te(){let S=x();if(!S||!o.currentPopup)return;let k=n.toolRegistryModule?.getToolList()||[],D=n.toolRegistryModule?.getToolConfig("tools"),K=Array.isArray(D?.subTabs)?D.subTabs:[],Y=K.filter(ge=>ge?.isCustom).length,V=K.filter(ge=>!ge?.isCustom).length,le=S(o.currentPopup).find(".yyt-shell-sidebar-stats");le.length&&(le.find(".yyt-shell-sidebar-stat").eq(0).find(".yyt-shell-sidebar-stat-value").text(String(k.length)),le.find(".yyt-shell-sidebar-stat").eq(1).find(".yyt-shell-sidebar-stat-value").text(String(V)),le.find(".yyt-shell-sidebar-stat").eq(2).find(".yyt-shell-sidebar-stat-value").text(String(Y)))}function z(){let S=n.toolRegistryModule?.getToolList()||[];return S.length?(S.some(k=>k.id===o.currentMainTab)||(o.currentMainTab=S[0].id),o.currentMainTab):null}async function J(S={}){let{rebuildNavigation:k=!1,reRenderSubNav:D=!1}=S,K=x();if(!K||!o.currentPopup)return;W();let Y=z();if(!Y)return;k&&(ee(),te());let V=n.toolRegistryModule?.getToolConfig(Y),me=!!V?.hasSubTabs,le=K(o.currentPopup).find(".yyt-sub-nav"),ge=K(o.currentPopup).find(".yyt-content-inner");if(k&&ge.length){let qe=new Set(ge.find(".yyt-tab-content").map((ke,bt)=>K(bt).data("tab")).get());(n.toolRegistryModule?.getToolList()||[]).forEach(ke=>{qe.has(ke.id)||ge.append(`<div class="yyt-tab-content" data-tab="${v(ke.id)}"></div>`)}),ge.find(".yyt-tab-content").each((ke,bt)=>{let Zt=K(bt).data("tab");(n.toolRegistryModule?.getToolList()||[]).some(gr=>gr.id===Zt)||K(bt).remove()})}K(o.currentPopup).find(".yyt-main-nav-item").removeClass("active"),K(o.currentPopup).find(`.yyt-main-nav-item[data-tab="${Y}"]`).addClass("active"),K(o.currentPopup).find(".yyt-tab-content").removeClass("active"),K(o.currentPopup).find(`.yyt-tab-content[data-tab="${Y}"]`).addClass("active"),me?(le.show(),(D||k)&&_s(Y,V.subTabs)):le.hide(),await Jr(Y),A(),X()}function de(){if(!o.currentPopup)return;P();let S=()=>{if(o.currentMainTab==="presetManagement"){J();return}o.currentMainTab==="tools"&&J({reRenderSubNav:!0})},k=()=>{o.currentMainTab==="tools"?J({rebuildNavigation:!0,reRenderSubNav:!0}):te()},D=()=>{o.currentMainTab==="tools"&&J({rebuildNavigation:!1,reRenderSubNav:!1})},K=()=>{(o.currentMainTab==="bypass"||o.currentMainTab==="tools")&&J({reRenderSubNav:o.currentMainTab==="tools"})};[G.PRESET_CREATED,G.PRESET_UPDATED,G.PRESET_DELETED].forEach(Y=>{u.cleanups.push(q.on(Y,S))}),[G.TOOL_REGISTERED,G.TOOL_UPDATED,G.TOOL_UNREGISTERED].forEach(Y=>{u.cleanups.push(q.on(Y,k))}),u.cleanups.push(q.on(G.TOOL_RUNTIME_UPDATED,D)),[G.BYPASS_PRESET_CREATED,G.BYPASS_PRESET_UPDATED,G.BYPASS_PRESET_DELETED].forEach(Y=>{u.cleanups.push(q.on(Y,K))})}function Q(S){return!!S?.closest?.(["input","textarea","select","button","a","label","summary","details",'[contenteditable="true"]',".yyt-dialog",".yyt-select-dropdown",".yyt-select-portal-layer"].join(","))}function He(S){let k=S?.closest?.(["textarea",".yyt-preview-pre",".yyt-select-dropdown",".yyt-select-portal-layer",".yyt-dialog-body",".yyt-worldbook-list",".yyt-tool-panel",".yyt-panel-section"].join(","));return k?k.scrollHeight>k.clientHeight+2||k.scrollWidth>k.clientWidth+2:!1}function Ce(S,k){return k?.closest?.(".yyt-scrollable-surface")===S}function ze(S,k){if(!S||!k)return null;let D=k.closest?.([".yyt-worldbook-list",".yyt-select-dropdown",".yyt-select-portal-layer",".yyt-dialog-body",".yyt-preview-pre",".yyt-tool-panel",".yyt-panel-section"].join(","));return D&&(D.classList?.contains("yyt-select-portal-layer")||S.contains(D))&&(D.scrollHeight>D.clientHeight+2||D.scrollWidth>D.clientWidth+2)?D:[k.closest?.(".yyt-tool-list"),k.closest?.(".yyt-settings-content"),k.closest?.(".yyt-sub-content"),k.closest?.(".yyt-tab-content.active"),S].filter(Boolean).find(Y=>Y!==S&&!S.contains(Y)?!1:Y.scrollHeight>Y.clientHeight+2||Y.scrollWidth>Y.clientWidth+2)||S}function L({mainTab:S=null,includeSubContent:k=!1}={}){let D=o.currentPopup;if(!D)return;let K=D.querySelector(".yyt-content");K&&(K.scrollTop=0,K.scrollLeft=0);let Y=S?`.yyt-tab-content[data-tab="${S}"]`:".yyt-tab-content.active",V=D.querySelector(Y);if(V&&(V.scrollTop=0,V.scrollLeft=0),!k)return;(V?.querySelectorAll(".yyt-sub-content")||[]).forEach(le=>{le.scrollTop=0,le.scrollLeft=0})}function ne(S){let k=T();if(!S||!k)return;S.classList.add("yyt-scrollable-surface");let D=!1,K=!1,Y=0,V=0,me=0,le=0,ge=!1,qe=!1,ke=()=>{D=!1,K=!1,S.classList.remove("yyt-scroll-dragging")},bt=ae=>{ae.button===0&&(Q(ae.target)||Ce(S,ae.target)&&(ge=S.scrollWidth>S.clientWidth+2,qe=S.scrollHeight>S.clientHeight+2,!(!ge&&!qe)&&(ae.stopPropagation(),D=!0,K=!1,Y=ae.clientX,V=ae.clientY,me=S.scrollLeft,le=S.scrollTop)))},Zt=ae=>{if(!D)return;let kt=ae.clientX-Y,ut=ae.clientY-V;!(Math.abs(kt)>4||Math.abs(ut)>4)&&!K||(K=!0,S.classList.add("yyt-scroll-dragging"),ge&&(S.scrollLeft=me-kt),qe&&(S.scrollTop=le-ut),ae.preventDefault())},gr=()=>{ke()},Qr=ae=>{if(ae.ctrlKey||He(ae.target)||!S.classList.contains("yyt-content")&&!Ce(S,ae.target))return;let ut=ze(S,ae.target);!ut||ut!==S&&!S.contains(ut)||!(ut.scrollHeight>ut.clientHeight+2||ut.scrollWidth>ut.clientWidth+2)||(Math.abs(ae.deltaY)>0&&(ut.scrollTop+=ae.deltaY),Math.abs(ae.deltaX)>0&&(ut.scrollLeft+=ae.deltaX),ae.preventDefault(),ae.stopPropagation())},xt=ae=>{K&&ae.preventDefault()};S.addEventListener("mousedown",bt),S.addEventListener("wheel",Qr,{passive:!1}),S.addEventListener("dragstart",xt),k.addEventListener("mousemove",Zt),k.addEventListener("mouseup",gr),y.cleanups.push(()=>{ke(),S.classList.remove("yyt-scrollable-surface"),S.removeEventListener("mousedown",bt),S.removeEventListener("wheel",Qr),S.removeEventListener("dragstart",xt),k.removeEventListener("mousemove",Zt),k.removeEventListener("mouseup",gr)})}function X(){let S=o.currentPopup;if(!S)return;C();let k=[...S.querySelectorAll(".yyt-shell-sidebar .yyt-main-nav"),...S.querySelectorAll(".yyt-sub-nav"),...S.querySelectorAll(".yyt-content"),...S.querySelectorAll(".yyt-settings-content"),...S.querySelectorAll(".yyt-tool-list")];[...new Set(k)].forEach(ne)}function ce(S){return`
      <div class="yyt-startup-screen" data-yyt-startup-screen>
        <div class="yyt-startup-screen-inner">
          <div class="yyt-startup-screen-kicker">Welcome</div>
          <div class="yyt-startup-screen-title">YouYou \u5DE5\u5177\u7BB1</div>
          <div class="yyt-startup-screen-desc">\u96C6\u4E2D\u7BA1\u7406 API \u9884\u8BBE\u3001\u81EA\u5B9A\u4E49\u5DE5\u5177\u3001\u63D0\u53D6\u89C4\u5219\u3001Ai\u6307\u4EE4\u9884\u8BBE\u4E0E\u8BCA\u65AD\u6D41\u7A0B\u3002\u6BCF\u6B21\u5237\u65B0\u540E\u90FD\u4F1A\u91CD\u65B0\u663E\u793A\uFF0C\u4FBF\u4E8E\u5FEB\u901F\u56DE\u5230\u4ECB\u7ECD\u5165\u53E3\u3002</div>
          <div class="yyt-startup-screen-modules">
            ${(S||[]).slice(0,6).map(D=>`
      <div class="yyt-startup-module-chip">
        <i class="fa-solid ${v(D.icon||"fa-file")}"></i>
        <span>${v(D.name||D.id)}</span>
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
    `}function rt(S){let k=x();if(!k||!o.currentPopup||o.startupScreenDismissed)return;let D=k(o.currentPopup).find(".yyt-popup-body"),K=D.find(".yyt-popup-shell");!D.length||!K.length||D.find("[data-yyt-startup-screen]").length||(K.attr("data-yyt-startup-visible","true"),D.prepend(ce(S)),D.find(".yyt-startup-enter").on("click",()=>{D.find("[data-yyt-startup-screen]").remove(),K.removeAttr("data-yyt-startup-visible"),o.startupScreenDismissed=!0,X()}))}function Nt(){let S=T(),k=o.currentPopup,D=k?.querySelector(".yyt-popup-header");if(!k||!D||!S)return;let K=!1,Y=0,V=0,me=0,le=0,ge="",qe=()=>({width:r.innerWidth||S.documentElement?.clientWidth||window.innerWidth||0,height:r.innerHeight||S.documentElement?.clientHeight||window.innerHeight||0}),ke=(xt,ae,kt)=>Math.min(Math.max(xt,ae),kt),bt=()=>{K&&(K=!1,k.classList.remove("yyt-popup-dragging"),S.body.style.userSelect=ge)},Zt=xt=>{if(!K||!o.currentPopup)return;let ae=xt.clientX-Y,kt=xt.clientY-V,{width:ut,height:oc}=qe(),Yw=k.offsetWidth||0,Vw=k.offsetHeight||0,Jw=Math.max(0,ut-Yw),Qw=Math.max(0,oc-Vw);k.style.left=`${ke(me+ae,0,Jw)}px`,k.style.top=`${ke(le+kt,0,Qw)}px`,k.style.transform="none",k.style.right="auto",k.style.bottom="auto"},gr=()=>{bt()},Qr=xt=>{if(xt.button!==0||xt.target?.closest(".yyt-popup-close"))return;K=!0,Y=xt.clientX,V=xt.clientY;let ae=k.getBoundingClientRect();me=ae.left,le=ae.top,k.style.left=`${ae.left}px`,k.style.top=`${ae.top}px`,k.style.transform="none",k.style.right="auto",k.style.bottom="auto",k.classList.add("yyt-popup-dragging"),ge=S.body.style.userSelect||"",S.body.style.userSelect="none",xt.preventDefault()};D.addEventListener("mousedown",Qr),S.addEventListener("mousemove",Zt),S.addEventListener("mouseup",gr),c.cleanup=()=>{bt(),D.removeEventListener("mousedown",Qr),S.removeEventListener("mousemove",Zt),S.removeEventListener("mouseup",gr)}}function lr(){W(),I(),P(),C();let S=x();if(S&&o.currentPopup){let k=S(o.currentPopup);jt(k,"yytPopupToolConfigSelect"),jt(k,"yytPromptEditorSelect")}o.currentPopup&&(o.currentPopup.remove(),o.currentPopup=null),o.currentOverlay&&(o.currentOverlay.remove(),o.currentOverlay=null),h("\u5F39\u7A97\u5DF2\u5173\u95ED")}function $n(S){W(),o.currentMainTab=S;let k=x();if(!k||!o.currentPopup)return;L({mainTab:S,includeSubContent:!0}),k(o.currentPopup).find(".yyt-main-nav-item").removeClass("active"),k(o.currentPopup).find(`.yyt-main-nav-item[data-tab="${S}"]`).addClass("active");let D=n.toolRegistryModule?.getToolConfig(S);D?.hasSubTabs?(k(o.currentPopup).find(".yyt-sub-nav").show(),_s(S,D.subTabs)):k(o.currentPopup).find(".yyt-sub-nav").hide(),k(o.currentPopup).find(".yyt-tab-content").removeClass("active"),k(o.currentPopup).find(`.yyt-tab-content[data-tab="${S}"]`).addClass("active"),Jr(S),A(),X()}function Ln(S,k){W(),o.currentSubTab[S]=k;let D=x();!D||!o.currentPopup||(L({mainTab:S,includeSubContent:!0}),D(o.currentPopup).find(".yyt-sub-nav-item").removeClass("active"),D(o.currentPopup).find(`.yyt-sub-nav-item[data-subtab="${k}"]`).addClass("active"),On(S,k),A(),X())}function _s(S,k){let D=x();if(!D||!o.currentPopup||!k)return;let K=_(S,o.currentSubTab[S]||k[0]?.id),V=(S==="tools"?[{key:"ai",title:"AI \u5DE5\u5177",items:k.filter(le=>!le?.isCustom&&(le?.toolKind||"ai")!=="script")},{key:"script",title:"\u811A\u672C\u5DE5\u5177",items:k.filter(le=>!le?.isCustom&&le?.toolKind==="script")},{key:"custom",title:"\u81EA\u5B9A\u4E49\u5DE5\u5177",items:k.filter(le=>le?.isCustom===!0)}].filter(le=>le.items.length>0):[{key:"default",title:"",items:k}]).map(le=>{let ge=le.title?`<div class="yyt-sub-nav-group-title">${v(le.title)}</div>`:"",qe=le.items.map(ke=>{let bt=ke?.isCustom===!0,Zt=S==="tools"&&bt?`<div class="yyt-sub-nav-item-actions">
               <button type="button" class="yyt-sub-nav-item-action" data-action="edit" data-subtab="${ke.id}" title="\u7F16\u8F91"><i class="fa-solid fa-pen"></i></button>
               <button type="button" class="yyt-sub-nav-item-action" data-action="delete" data-subtab="${ke.id}" title="\u5220\u9664"><i class="fa-solid fa-trash"></i></button>
             </div>`:"";return`
        <div class="yyt-sub-nav-item ${ke.id===K?"active":""}" data-subtab="${ke.id}" data-tool-name="${v((ke.name||ke.id).toLowerCase())}">
          <i class="fa-solid ${ke.icon||"fa-file"}"></i>
          <span class="yyt-sub-nav-item-label">${v(ke.name||ke.id)}</span>
          ${Zt}
        </div>
      `}).join("");return`
        <div class="yyt-sub-nav-group yyt-sub-nav-group-${le.key}">
          ${ge}
          <div class="yyt-sub-nav-group-items">
            ${qe}
          </div>
        </div>
      `}).join(""),me=S==="tools"?`<div class="yyt-sub-nav-toolbar">
           <button type="button" class="yyt-sub-nav-toolbar-btn" data-tool-action="add" title="\u65B0\u5EFA\u81EA\u5B9A\u4E49\u5DE5\u5177"><i class="fa-solid fa-plus"></i><span>\u65B0\u5EFA</span></button>
           <button type="button" class="yyt-sub-nav-toolbar-btn" data-tool-action="import" title="\u4ECE JSON \u5BFC\u5165\u5DE5\u5177"><i class="fa-solid fa-file-import"></i></button>
           <button type="button" class="yyt-sub-nav-toolbar-btn" data-tool-action="export" title="\u5BFC\u51FA\u5DE5\u5177 JSON"><i class="fa-solid fa-file-export"></i></button>
         </div>
         <div class="yyt-sub-nav-filter-wrap">
           <input type="text" class="yyt-sub-nav-filter" placeholder="\u7B5B\u9009\u5DE5\u5177\u2026" autocomplete="off">
         </div>`:"";D(o.currentPopup).find(".yyt-sub-nav").html(me+V),D(o.currentPopup).find(".yyt-sub-nav-item").on("click",function(ge){if(ge.target.closest&&ge.target.closest(".yyt-sub-nav-item-action"))return;let qe=D(this).data("subtab");Ln(S,qe)}),S==="tools"&&Mo(S),X()}function Ja(S){if(!o.currentPopup)return;let k=x();if(!k)return;let D=String(S||"").trim().toLowerCase();k(o.currentPopup).find(".yyt-sub-nav-item").each(function(){let Y=String(k(this).data("tool-name")||"");k(this).toggle(!D||Y.includes(D))}),k(o.currentPopup).find(".yyt-sub-nav-group").each(function(){let Y=k(this).find(".yyt-sub-nav-item:visible").length>0;k(this).toggle(Y)})}function Mo(S){let k=x();if(!k||!o.currentPopup)return;let D=k(o.currentPopup).find(".yyt-sub-nav");D.find(".yyt-sub-nav-filter").off("input.yytFilter").on("input.yytFilter",function(){Ja(this.value)}),D.find(".yyt-sub-nav-toolbar-btn").off("click.yytToolAction").on("click.yytToolAction",async function(K){K.preventDefault(),K.stopPropagation();let Y=k(this).data("tool-action");try{let V=await Promise.resolve().then(()=>(Up(),Fp));if(Y==="add"){let me=await V.showToolEditDialog(null);me&&(o.currentSubTab[S]=me,Ln(S,me))}else Y==="import"?await V.showImportToolsDialog():Y==="export"&&V.showExportToolsDialog()}catch(V){b("\u5DE5\u5177\u64CD\u4F5C\u5931\u8D25",V)}}),D.find(".yyt-sub-nav-item-action").off("click.yytItemAction").on("click.yytItemAction",async function(K){K.preventDefault(),K.stopPropagation();let Y=k(this).data("action"),V=String(k(this).data("subtab")||"");if(V)try{let me=await Promise.resolve().then(()=>(Up(),Fp));Y==="edit"?await me.showToolEditDialog(V):Y==="delete"&&await me.confirmDeleteTool(V)&&o.currentSubTab[S]===V&&(o.currentSubTab[S]="")}catch(me){b("\u5DE5\u5177\u884C\u5185\u64CD\u4F5C\u5931\u8D25",me)}})}async function Jr(S){let k=x();if(!k||!o.currentPopup)return;let D=k(o.currentPopup).find(`.yyt-tab-content[data-tab="${S}"]`);if(!D.length)return;if(n.toolRegistryModule?.getToolConfig(S)?.hasSubTabs){let V=_(S);V?await On(S,V):D.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5B50 tab \u914D\u7F6E\u52A0\u8F7D\u5931\u8D25</span></div>'),X();return}await n.uiModule?.renderMainTab?.(S,D)||Dn(S,D),X()}async function On(S,k){let D=x();if(!D||!o.currentPopup)return;let K=D(o.currentPopup).find(`.yyt-tab-content[data-tab="${S}"]`);if(!K.length)return;let Y=n.toolRegistryModule?.getToolConfig(S);if(Y?.hasSubTabs){let me=_(S,k),le=Y.subTabs?.find(bt=>bt.id===me),ge=K.find(".yyt-sub-content");if(ge.length||(K.html('<div class="yyt-sub-content"></div>'),ge=K.find(".yyt-sub-content")),!le){ge.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5F53\u524D\u5B50\u9875\u9762\u4E0D\u5B58\u5728\u6216\u5DF2\u5931\u6548</span></div>'),L({mainTab:S,includeSubContent:!0}),X();return}let qe=le.component;if(qe==="GenericToolConfigPanel"){await Qa(le,ge),L({mainTab:S,includeSubContent:!0}),X();return}W({container:ge});let ke=await n.uiModule?.renderSubTabComponent?.(qe,ge);ke?H(ge,{key:ke}):ge.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-tools"></i><span>\u529F\u80FD\u5F00\u53D1\u4E2D...</span></div>'),L({mainTab:S,includeSubContent:!0}),X();return}let V=K.find(".yyt-sub-content");if(V.length){switch(W({container:V}),k){case"config":zw(S,V);break;case"prompts":await Kw(S,V);break;case"presets":Fw(S,V);break;default:V.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-tools"></i><span>\u529F\u80FD\u5F00\u53D1\u4E2D...</span></div>')}L({mainTab:S,includeSubContent:!0}),X()}}async function Qa(S,k){if(!(!x()||!k?.length||!S?.id)){W({container:k});try{let K=s.dynamicToolPanelCache.get(S.id);if(!K){let me=(await Promise.resolve().then(()=>(uo(),Kg)))?.createToolConfigPanel;if(typeof me!="function")throw new Error("\u901A\u7528\u5DE5\u5177\u9762\u677F\u5DE5\u5382\u4E0D\u53EF\u7528");K=()=>me({id:`${S.id}Panel`,toolId:S.id,postResponseHint:`\u70B9\u51FB\u201C\u7ACB\u5373\u6267\u884C\u4E00\u6B21\u201D\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u6267\u884C\u201C${S.name||S.id}\u201D\u3002`,extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 custom_tag
\u6216 regex:<custom_tag>([\\s\\S]*?)</custom_tag>`,previewDialogId:`${S.id}-extraction-preview`,previewTitle:`${S.name||S.id} \u63D0\u53D6\u9884\u89C8`}),s.dynamicToolPanelCache.set(S.id,K)}let Y=K();Y.renderTo(k),H(k,{key:S.id,destroy:typeof Y?.destroy=="function"?V=>Y.destroy(V):null}),X()}catch(K){p.current=null,b("\u81EA\u5B9A\u4E49\u5DE5\u5177\u9762\u677F\u52A0\u8F7D\u5931\u8D25:",K),k.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u81EA\u5B9A\u4E49\u5DE5\u5177\u9762\u677F\u52A0\u8F7D\u5931\u8D25</span></div>')}}}function Dn(S,k){if(!x())return;let K=n.toolRegistryModule?.getToolConfig(S);if(!K){k.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5DE5\u5177\u914D\u7F6E\u4E0D\u5B58\u5728</span></div>');return}let Y=o.currentSubTab[S]||K.subTabs?.[0]?.id||"config";k.html(`
      <div class="yyt-tool-window">
        <div class="yyt-sub-content" data-subtab="${Y}">
          <!-- \u5B50\u5185\u5BB9\u5C06\u5728\u6B64\u6E32\u67D3 -->
        </div>
      </div>
    `),On(S,Y)}function zw(S,k){if(!x())return;let K=n.toolManagerModule?.getTool(S),Y=n.presetManagerModule?.getAllPresets()||[],V=n.toolRegistryModule?.getToolApiPreset(S)||"",me=Y.map(le=>`<option value="${v(le.name)}" ${le.name===V?"selected":""}>${v(le.name)}</option>`).join("");k.html(`
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
              ${me}
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
              <input type="number" class="yyt-input" id="yyt-tool-timeout" value="${K?.config?.execution?.timeout||6e4}">
            </div>
            <div class="yyt-form-group yyt-flex-1">
              <label>\u91CD\u8BD5\u6B21\u6570</label>
              <input type="number" class="yyt-input" id="yyt-tool-retries" value="${K?.config?.execution?.retries||3}">
            </div>
          </div>
        </div>
      </div>
    `),xr(k,{namespace:"yytPopupToolConfigSelect",selectors:["#yyt-tool-api-preset"]}),k.find("#yyt-save-tool-preset").on("click",function(){let ge=k.find("#yyt-tool-api-preset").val();n.toolRegistryModule?.setToolApiPreset(S,ge),d.info("API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u4FDD\u5B58",null,{toast:"success"})})}async function Kw(S,k){if(!x()){k.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u63D0\u793A\u8BCD\u7F16\u8F91\u5668\u6A21\u5757\u672A\u52A0\u8F7D</span></div>');return}let Y=n.toolManagerModule?.getTool(S)?.config?.messages||[],V=Lw(Y)||Ya,me=new rc({containerId:`yyt-prompt-editor-${S}`,segments:V,onChange:ge=>{let qe=$w(ge);h("\u63D0\u793A\u8BCD\u5DF2\u66F4\u65B0:",qe.length,"\u6761\u6D88\u606F")}});k.html(`<div id="yyt-prompt-editor-${S}" class="yyt-prompt-editor-container"></div>`),me.init(k.find(`#yyt-prompt-editor-${S}`));let le=Nw();if(le){let ge="yyt-prompt-editor-styles",qe=r.document||document;if(!qe.getElementById(ge)){let ke=qe.createElement("style");ke.id=ge,ke.textContent=le,(qe.head||qe.documentElement).appendChild(ke)}}}function Fw(S,k){x()&&k.html(`
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
    `)}function Uw(){return`
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
      </div>`}function jw(S,k,D){let K=m(),Y=S.map(V=>`
      <div class="yyt-main-nav-item ${V.id===o.currentMainTab?"active":""}" data-tab="${V.id}">
        <div class="yyt-main-nav-icon">
          <i class="fa-solid ${v(V.icon||"fa-file")}"></i>
        </div>
        <div class="yyt-main-nav-copy">
          <span class="yyt-main-nav-name">${v(V.name||V.id)}</span>
          <span class="yyt-main-nav-desc">${v(V.description||"\u8FDB\u5165\u6B64\u9875\u9762\u8FDB\u884C\u914D\u7F6E\u3001\u67E5\u770B\u6216\u7EF4\u62A4\u3002")}</span>
        </div>
      </div>
    `).join("");return`
      <aside class="yyt-shell-sidebar${K?" yyt-collapsed":""}">
        <div class="yyt-shell-sidebar-card">
          <div class="yyt-shell-sidebar-title-row">
            <span class="yyt-shell-sidebar-title">\u9875\u9762\u5BFC\u822A</span>
            <span class="yyt-shell-sidebar-hint">${S.length} tabs</span>
            <button class="yyt-sidebar-toggle" title="${K?"\u5C55\u5F00\u4FA7\u680F":"\u6298\u53E0\u4FA7\u680F"}">
              <i class="fa-solid ${K?"fa-angles-right":"fa-angles-left"}"></i>
            </button>
          </div>
          <div class="yyt-main-nav">
            ${Y}
          </div>
          <div class="yyt-shell-sidebar-note">
            \u4FDD\u5B58\u540E\uFF0C\u624B\u52A8\u6267\u884C\u4E0E\u5199\u56DE\u94FE\u90FD\u4F1A\u4EE5\u6700\u65B0\u914D\u7F6E\u4E3A\u51C6\u3002
          </div>
          <div class="yyt-shell-sidebar-stats">
            <div class="yyt-shell-sidebar-stat">
              <span class="yyt-shell-sidebar-stat-value">${S.length}</span>
              <span class="yyt-shell-sidebar-stat-label">\u4E3B\u9875\u9762</span>
            </div>
            <div class="yyt-shell-sidebar-stat">
              <span class="yyt-shell-sidebar-stat-value">${k}</span>
              <span class="yyt-shell-sidebar-stat-label">\u9ED8\u8BA4\u5DE5\u5177</span>
            </div>
            <div class="yyt-shell-sidebar-stat">
              <span class="yyt-shell-sidebar-stat-value">${D}</span>
              <span class="yyt-shell-sidebar-stat-label">\u81EA\u5B9A\u4E49\u5DE5\u5177</span>
            </div>
          </div>
        </div>
      </aside>`}function Ww(S,k){return`
      <div class="yyt-shell-main-header">
        <div class="yyt-shell-main-heading-block">
          <div class="yyt-shell-main-title">${v(S)}</div>
          <div class="yyt-shell-main-description">${v(k)}</div>
        </div>
        <div class="yyt-shell-main-actions">
          <div class="yyt-shell-main-meta">
            <i class="fa-solid fa-circle-info"></i>
            <span>\u4FDD\u5B58\u540E\u6267\u884C\u94FE\u4F1A\u7ACB\u5373\u4F7F\u7528\u6700\u65B0\u914D\u7F6E</span>
          </div>
        </div>
      </div>`}function Hw(S,k){return S.map(D=>`
      <div class="yyt-tab-content ${D.id===k?"active":""}" data-tab="${D.id}">
      </div>
    `).join("")}function qw(S){return`
      <div class="yyt-popup-footer">
        <div class="yyt-popup-footer-left">
          <div class="yyt-popup-status-cluster">
            <div class="yyt-popup-status">
              <i class="fa-solid fa-compass"></i>
              <span class="yyt-popup-active-label">\u5F53\u524D\uFF1A${v(S)}</span>
            </div>
            <div class="yyt-popup-footer-note">
              API\u3001\u5DE5\u5177\u3001\u63D0\u53D6\u4E0E\u8BCA\u65AD\u7EDF\u4E00\u5165\u53E3\u3002
            </div>
          </div>
        </div>
      </div>`}async function Gw(){if(o.currentPopup){h("\u5F39\u7A97\u5DF2\u5B58\u5728");return}let S=t?.services?.loadModules;typeof S=="function"&&await S();let k=x(),D=T();if(!k){b("jQuery \u672A\u627E\u5230\uFF0C\u65E0\u6CD5\u521B\u5EFA\u5F39\u7A97");return}let K=n.toolRegistryModule?.getToolList()||[];if(!K.length){b("\u5DE5\u5177\u5217\u8868\u4E3A\u7A7A\uFF0C\u65E0\u6CD5\u521B\u5EFA\u5F39\u7A97");return}K.some(ae=>ae.id===o.currentMainTab)||(o.currentMainTab=K[0].id);let Y=n.toolRegistryModule?.getToolConfig("tools"),V=Array.isArray(Y?.subTabs)?Y.subTabs:[],me=V.filter(ae=>ae?.isCustom).length,le=V.filter(ae=>!ae?.isCustom).length,ge=E(o.currentMainTab),qe=w(o.currentMainTab);o.currentOverlay=D.createElement("div"),o.currentOverlay.className="yyt-popup-overlay",o.currentOverlay.addEventListener("click",ae=>{ae.target===o.currentOverlay&&lr()}),D.body.appendChild(o.currentOverlay);let ke=m(),bt=`
      <div class="yyt-popup" id="${l}">
        ${Uw()}
        <div class="yyt-popup-body">
          <div class="yyt-popup-shell">
            <div class="yyt-shell-workspace${ke?" yyt-sidebar-collapsed":""}">
              ${jw(K,le,me)}
              <section class="yyt-shell-main">
                ${Ww(ge,qe)}
                <div class="yyt-sub-nav" style="display: none;"></div>
                <div class="yyt-content-frame">
                  <div class="yyt-content">
                    <div class="yyt-content-inner">
                      ${Hw(K,o.currentMainTab)}
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
        ${qw(ge)}
      </div>
    `,Zt=D.createElement("div");Zt.innerHTML=bt,o.currentPopup=Zt.firstElementChild,D.body.appendChild(o.currentPopup),k(o.currentPopup).find(".yyt-popup-close").on("click",lr),k(o.currentPopup).find(".yyt-sidebar-toggle").on("click",g);let gr=ae=>{ae.key==="Escape"&&(D.querySelector(".yyt-dialog-overlay")||D.querySelector(".yyt-twb-editor-drawer.is-open")||(ae.stopPropagation(),lr()))},Qr=ae=>{if(!(ae.ctrlKey||ae.metaKey)||ae.key!=="s"||!o.currentPopup)return;ae.preventDefault(),ae.stopPropagation();let kt=k(o.currentPopup),ut=kt.find("#yyt-bypass-save:visible").first()||kt.find(`#${a}-save-api-config:visible`).first()||kt.find("#yyt-save-tool-preset:visible").first()||kt.find('[data-twb-action="save"]:visible').first();ut?.length&&ut.trigger("click")};D.addEventListener("keydown",gr),D.addEventListener("keydown",Qr),u.cleanups.push(()=>{D.removeEventListener("keydown",gr),D.removeEventListener("keydown",Qr)}),de(),k(o.currentPopup).find(".yyt-main-nav-item").on("click",function(){let kt=k(this).data("tab");kt&&$n(kt)}),Nt(),Jr(o.currentMainTab);let xt=n.toolRegistryModule?.getToolConfig(o.currentMainTab);xt?.hasSubTabs&&(k(o.currentPopup).find(".yyt-sub-nav").show(),_s(o.currentMainTab,xt.subTabs)),A(),rt(K),X(),h("\u5F39\u7A97\u5DF2\u6253\u5F00")}return{openPopup:Gw,closePopup:lr,switchMainTab:$n,switchSubTab:Ln,renderTabContent:Jr,renderSubTabContent:On}}function Dw(t,e={}){let{constants:r,modules:n}=t,{SCRIPT_ID:s,SCRIPT_VERSION:o}=r,{init:a,loadModules:i,addMenuItem:l,popupShell:d}=e;return{version:o,id:s,init:a,openPopup:d?.openPopup,closePopup:d?.closePopup,switchMainTab:d?.switchMainTab,switchSubTab:d?.switchSubTab,addMenuItem:l,getStorage:()=>n.storageModule,getApiConnection:()=>n.apiConnectionModule,getPresetManager:()=>n.presetManagerModule,getUi:()=>n.uiModule,getUiModule:()=>n.uiModule,getRegexExtractor:()=>n.regexExtractorModule,getToolManager:()=>n.toolManagerModule,getToolExecutor:()=>n.toolExecutorModule,getWindowManager:()=>n.windowManagerModule,getToolRegistry:()=>n.toolRegistryModule,getSettingsService:()=>n.settingsServiceModule,getBypassManager:()=>n.bypassManagerModule,getVariableResolver:()=>n.variableResolverModule,getContextInjector:()=>n.contextInjectorModule,getToolPromptService:()=>n.toolPromptServiceModule,getToolOutputService:()=>n.toolOutputServiceModule,getToolAutomationService:()=>n.toolAutomationServiceModule,getDataProvider:()=>n.toolDataProviderModule?.getCurrentProvider?.()||null,get floatingBall(){let c=n.floatingBallModule?.floatingBall;return c?{isReady:()=>c.isReady?.()||!1,registerItem:u=>c.registerItem?.(u),unregisterItem:u=>c.unregisterItem?.(u),updateItem:(u,y)=>c.updateItem?.(u,y),refresh:u=>c.refresh?.(u),setVisible:u=>c.setVisible?.(u),openMenu:()=>c.openMenu?.(),closeMenu:()=>c.closeMenu?.(),toggleMenu:u=>c.toggleMenu?.(u)}:null},async getDataProviderAsync(){return await i(),n.toolDataProviderModule?.getToolDataProvider?.()||null},async getApiConfig(){return await i(),n.apiConnectionModule?.getApiConfig?.()||null},async saveApiConfig(c){return await i(),n.apiConnectionModule?(n.apiConnectionModule.updateApiConfig(c),!0):!1},async getPresets(){return await i(),n.presetManagerModule?n.presetManagerModule.getAllPresets():[]},async sendApiRequest(c,u){if(await i(),n.apiConnectionModule)return n.apiConnectionModule.sendApiRequest(c,u);throw new Error("API\u6A21\u5757\u672A\u52A0\u8F7D")},async testApiConnection(){return await i(),n.apiConnectionModule?n.apiConnectionModule.testApiConnection():{success:!1,message:"API\u6A21\u5757\u672A\u52A0\u8F7D"}},registerTool(c,u){return n.toolRegistryModule?.registerTool(c,u)||!1},unregisterTool(c){return n.toolRegistryModule?.unregisterTool(c)||!1},getToolList(){return n.toolRegistryModule?.getToolList()||[]},createWindow(c){return n.windowManagerModule?.createWindow(c)||null},closeWindow(c){n.windowManagerModule?.closeWindow(c)},startAutomation(){return n.toolAutomationServiceModule?.toolAutomationService?.init?.()||!1},stopAutomation(){n.toolAutomationServiceModule?.toolAutomationService?.stop?.()},getAutomationRuntime(){return n.toolAutomationServiceModule?.toolAutomationService?.getRuntimeSnapshot?.()||null},cancelAutomation(c={}){return n.toolAutomationServiceModule?.toolAutomationService?.cancelAutomation?.(c)||{success:!1,error:"\u81EA\u52A8\u5316\u670D\u52A1\u672A\u52A0\u8F7D"}},async processCurrentAssistantMessage(c={}){return n.toolAutomationServiceModule?.toolAutomationService?.processCurrentAssistantMessage?.(c)||{success:!1,error:"\u81EA\u52A8\u5316\u670D\u52A1\u672A\u52A0\u8F7D"}}}}var nc="youyou_toolkit",ek="1.0.258",tk=`${nc}-menu-item`,rk=`${nc}-menu-container`,nk=`${nc}-popup`,sk=typeof window.parent<"u"?window.parent:window,sc={constants:{SCRIPT_ID:nc,SCRIPT_VERSION:ek,MENU_ITEM_ID:tk,MENU_CONTAINER_ID:rk,POPUP_ID:nk},topLevelWindow:sk,modules:{storageModule:null,apiConnectionModule:null,uiModule:null,presetManagerModule:null,regexExtractorModule:null,toolManagerModule:null,toolExecutorModule:null,toolTriggerModule:null,windowManagerModule:null,toolRegistryModule:null,settingsServiceModule:null,bypassManagerModule:null,variableResolverModule:null,contextInjectorModule:null,toolPromptServiceModule:null,toolOutputServiceModule:null,toolAutomationServiceModule:null,toolDataProviderModule:null,floatingBallModule:null},caches:{dynamicToolPanelCache:new Map},services:{loadModules:null},uiState:{currentPopup:null,currentOverlay:null,currentMainTab:"presetManagement",currentSubTab:{},startupScreenDismissed:!1}},Bw=Ow(sc),Va=Pw(sc,{openPopup:Bw.openPopup});sc.services.loadModules=Va.loadModules;var jp=Dw(sc,{init:Va.init,loadModules:Va.loadModules,addMenuItem:Va.addMenuItem,popupShell:Bw});if(typeof window<"u"&&(window.YouYouToolkit=jp,typeof window.parent<"u"&&window.parent!==window))try{window.parent.YouYouToolkit=jp}catch{}var BL=jp;Va.init();Promise.resolve().then(()=>(Z(),Hp)).then(({logger:t})=>{t.createScope("Bootstrap").log("\u6A21\u5757\u52A0\u8F7D\u5B8C\u6210")});export{BL as default};
