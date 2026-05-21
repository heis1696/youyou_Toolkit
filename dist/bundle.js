var Dx=Object.defineProperty;var O=(t,e)=>()=>(t&&(e=t(t=0)),e);var ue=(t,e)=>{for(var r in e)Dx(t,r,{get:e[r],enumerable:!0})};var F,Rl,G,at=O(()=>{F={STORAGE_CHANGED:"storage:changed",STORAGE_CLEARED:"storage:cleared",PRESET_CREATED:"preset:created",PRESET_UPDATED:"preset:updated",PRESET_DELETED:"preset:deleted",PRESET_ACTIVATED:"preset:activated",PRESET_IMPORTED:"preset:imported",PRESET_EXPORTED:"preset:exported",API_CONFIG_UPDATED:"api:configUpdated",API_REQUEST_START:"api:requestStart",API_REQUEST_SUCCESS:"api:requestSuccess",API_REQUEST_ERROR:"api:requestError",API_CONNECTION_TESTED:"api:connectionTested",TOOL_REGISTERED:"tool:registered",TOOL_UNREGISTERED:"tool:unregistered",TOOL_UPDATED:"tool:updated",TOOL_RUNTIME_UPDATED:"tool:runtimeUpdated",TOOL_ENABLED:"tool:enabled",TOOL_DISABLED:"tool:disabled",TOOL_EXECUTING:"tool:executing",TOOL_EXECUTED:"tool:executed",TOOL_ERROR:"tool:error",TOOL_EXECUTION_STARTED:"tool:executionStarted",TOOL_EXECUTION_FAILED:"tool:executionFailed",REGEX_RULE_ADDED:"regex:ruleAdded",REGEX_RULE_UPDATED:"regex:ruleUpdated",REGEX_RULE_DELETED:"regex:ruleDeleted",REGEX_RULES_CLEARED:"regex:rulesCleared",REGEX_PRESET_LOADED:"regex:presetLoaded",REGEX_EXTRACTED:"regex:extracted",UI_INITIALIZED:"ui:initialized",UI_RENDER_REQUESTED:"ui:renderRequested",UI_TAB_CHANGED:"ui:tabChanged",UI_SUBTAB_CHANGED:"ui:subTabChanged",UI_POPUP_OPENED:"ui:popupOpened",UI_POPUP_CLOSED:"ui:popupClosed",UI_WINDOW_CREATED:"ui:windowCreated",UI_WINDOW_CLOSED:"ui:windowClosed",APP_INITIALIZING:"app:initializing",APP_INITIALIZED:"app:initialized",APP_ERROR:"app:error",SETTINGS_UPDATED:"settings:updated",TOOL_CONTEXT_INJECTED:"tool:contextInjected",TOOL_CONTEXT_CLEARED:"tool:contextCleared",BYPASS_PRESET_CREATED:"bypass:presetCreated",BYPASS_PRESET_UPDATED:"bypass:presetUpdated",BYPASS_PRESET_DELETED:"bypass:presetDeleted",BYPASS_PRESET_ACTIVATED:"bypass:presetActivated",TOOL_OUTPUT_MODE_CHANGED:"tool:outputModeChanged"},Rl=class{constructor(){this.listeners=new Map,this.onceCallbacks=new Map,this.history=[],this.maxHistorySize=100,this.debugMode=!1}on(e,r,n={}){if(!e||typeof r!="function")return console.warn("[EventBus] \u65E0\u6548\u7684\u4E8B\u4EF6\u6216\u56DE\u8C03"),()=>{};let{priority:s=0}=n;this.listeners.has(e)||this.listeners.set(e,new Set);let o={callback:r,priority:s};return this.listeners.get(e).add(o),this.debugMode&&console.log(`[EventBus] \u8BA2\u9605: ${e}`),()=>this.off(e,r)}off(e,r){let n=this.listeners.get(e);if(n){for(let s of n)if(s.callback===r){n.delete(s);break}this.debugMode&&console.log(`[EventBus] \u53D6\u6D88\u8BA2\u9605: ${e}`)}}emit(e,r){this.debugMode&&console.log(`[EventBus] \u53D1\u5E03: ${e}`,r),this._addToHistory(e,r);let n=this.listeners.get(e);if(!n||n.size===0)return;let s=Array.from(n).sort((o,a)=>a.priority-o.priority);for(let{callback:o}of s)try{o(r)}catch(a){console.error(`[EventBus] \u4E8B\u4EF6\u5904\u7406\u9519\u8BEF (${e}):`,a)}}once(e,r){let n=s=>{this.off(e,n),r(s)};return this.on(e,n)}wait(e,r=0){return new Promise((n,s)=>{let o=null,a=this.once(e,i=>{o&&clearTimeout(o),n(i)});r>0&&(o=setTimeout(()=>{a(),s(new Error(`\u7B49\u5F85\u4E8B\u4EF6\u8D85\u65F6: ${e}`))},r))})}hasListeners(e){let r=this.listeners.get(e);return r&&r.size>0}listenerCount(e){let r=this.listeners.get(e);return r?r.size:0}removeAllListeners(e){e?this.listeners.delete(e):this.listeners.clear()}setDebugMode(e){this.debugMode=e}_addToHistory(e,r){this.history.push({event:e,data:r,timestamp:Date.now()}),this.history.length>this.maxHistorySize&&this.history.shift()}getHistory(e){return e?this.history.filter(r=>r.event===e):[...this.history]}clearHistory(){this.history=[]}},G=new Rl});var ip={};ue(ip,{LOG_LEVEL:()=>he,LoggerService:()=>$a,default:()=>Bx,logger:()=>I});var he,ap,$a,I,Bx,Y=O(()=>{at();he=Object.freeze({DEBUG:0,INFO:1,WARN:2,ERROR:3}),ap=Object.freeze({[he.DEBUG]:"DEBUG",[he.INFO]:"INFO",[he.WARN]:"WARN",[he.ERROR]:"ERROR"}),$a=class{constructor(){this._entries=[],this._maxSize=2e3,this._nextId=1,this._minLevel=he.INFO,this._eventKey="logger:entry",this._statsEventKey="logger:statsChanged",this._pendingFlush=!1,this._toastHandler=null}_write(e,r,n,s,o){let a={id:this._nextId++,timestamp:Date.now(),level:e,scope:r,message:n,data:s};if(this._entries.push(a),this._entries.length>this._maxSize&&this._entries.shift(),this._forwardToConsole(a),this._toastHandler&&o)try{this._toastHandler(this.levelToToastType(e),n,o)}catch{}this._pendingFlush||(this._pendingFlush=!0,queueMicrotask(()=>{this._pendingFlush=!1,this._emitEntry(a)}))}_forwardToConsole(e){let r=`[${e.scope}]`;switch(e.level){case he.DEBUG:console.debug(r,e.message,e.data??"");break;case he.INFO:console.log(r,e.message,e.data??"");break;case he.WARN:console.warn(r,e.message,e.data??"");break;case he.ERROR:console.error(r,e.message,e.data??"");break}}_emitEntry(e){try{G?.emit(this._eventKey,e)}catch{}}debug(e,r,n,s){he.DEBUG<this._minLevel||this._write(he.DEBUG,e,r,n,s)}info(e,r,n,s){he.INFO<this._minLevel||this._write(he.INFO,e,r,n,s)}log(e,r,n,s){this.info(e,r,n,s)}warn(e,r,n,s){he.WARN<this._minLevel||this._write(he.WARN,e,r,n,s)}error(e,r,n,s){he.ERROR<this._minLevel||this._write(he.ERROR,e,r,n,s)}createScope(e){return{debug:(r,n,s)=>this.debug(e,r,n,s),info:(r,n,s)=>this.info(e,r,n,s),log:(r,n,s)=>this.log(e,r,n,s),warn:(r,n,s)=>this.warn(e,r,n,s),error:(r,n,s)=>this.error(e,r,n,s)}}setToastHandler(e){this._toastHandler=e}levelToToastType(e){switch(e){case he.WARN:return"warning";case he.ERROR:return"error";default:return"info"}}getEntries(e={}){let{level:r,scope:n,search:s,limit:o=500,offset:a=0}=e,i=this._entries;if(r!=null&&(i=i.filter(d=>d.level>=r)),n&&(i=i.filter(d=>d.scope===n)),s){let d=s.toLowerCase();i=i.filter(c=>c.scope.toLowerCase().includes(d)||c.message.toLowerCase().includes(d))}let l=i.length;return i=i.slice(a,a+o),{entries:i,total:l}}getStats(){let e={total:this._entries.length,byLevel:{DEBUG:0,INFO:0,WARN:0,ERROR:0},byScope:{}};for(let r of this._entries){let n=ap[r.level]||"UNKNOWN";e.byLevel[n]=(e.byLevel[n]||0)+1,e.byScope[r.scope]=(e.byScope[r.scope]||0)+1}return e}setLevel(e){this._minLevel=e}getLevel(){return this._minLevel}setMaxSize(e){this._maxSize=Math.max(100,Math.min(1e4,e))}clear(){this._entries=[],this._nextId=1}levelLabel(e){return ap[e]||"UNKNOWN"}},I=new $a,Bx=I});function qt(){return typeof window.parent<"u"&&window.parent!==window&&window.parent.document?window.parent.document:document}function pe(t){return typeof t!="string"?"":t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function Oa(t,e,r=3e3){e||(e=t==="error"?"\u64CD\u4F5C\u5931\u8D25":"\u64CD\u4F5C\u5B8C\u6210");let n=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(n.toastr){n.toastr[t](e,"YouYou \u5DE5\u5177\u7BB1",{timeOut:r,progressBar:!0});return}jx(t,e,r),Kx.log(`[${t.toUpperCase()}] ${e}`)}function Ol(t,e,r={}){e||(e=t==="error"?"\u64CD\u4F5C\u5931\u8D25":"\u64CD\u4F5C\u5B8C\u6210");let{duration:n=3500,sticky:s=!1,noticeId:o=""}=r,a=qt();if(!a?.body){Oa(t,e,n);return}let i="yyt-top-notice-container",l="yyt-top-notice-styles",d=a.getElementById(i);if(d||(d=a.createElement("div"),d.id=i,d.style.cssText=`
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
    `,a.head.appendChild(h)}if(o){let h=d.querySelector(`[data-notice-id="${o}"]`);h&&h.remove()}let c={success:"\u2713",error:"!",warning:"\u2022",info:"i"},u=a.createElement("div");u.className=`yyt-top-notice yyt-top-notice--${t||"info"}`,o&&(u.dataset.noticeId=o);let y=a.createElement("span");y.className="yyt-top-notice__icon",y.textContent=c[t]||c.info;let p=a.createElement("div");p.className="yyt-top-notice__content",p.textContent=e;let g=a.createElement("button");g.className="yyt-top-notice__close",g.type="button",g.setAttribute("aria-label","\u5173\u95ED\u901A\u77E5"),g.textContent="\xD7";let m=()=>{u.style.animation="yyt-top-notice-out 0.18s ease forwards",setTimeout(()=>u.remove(),180)};g.addEventListener("click",m),u.appendChild(y),u.appendChild(p),u.appendChild(g),d.appendChild(u),s||setTimeout(m,n)}function jx(t,e,r){let n=qt();if(!n)return;let s=n.getElementById("yyt-fallback-toast");s&&s.remove();let o={success:{bg:"rgba(74, 222, 128, 0.9)",border:"#22c55e"},error:{bg:"rgba(248, 113, 113, 0.9)",border:"#ef4444"},warning:{bg:"rgba(251, 191, 36, 0.9)",border:"#f59e0b"},info:{bg:"rgba(123, 183, 255, 0.9)",border:"#7bb7ff"}},a=o[t]||o.info,i=n.createElement("div");i.id="yyt-fallback-toast",i.style.cssText=`
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
  `,i.textContent=e,n.body.appendChild(i),setTimeout(()=>{i.style.animation="yyt-toast-out 0.3s ease forwards",setTimeout(()=>{i.remove()},300)},r)}function se(){if(Rn)return Rn;if(typeof window.parent<"u"&&window.parent!==window)try{if(window.parent.jQuery)return Rn=window.parent.jQuery,Rn}catch{}return window.jQuery&&(Rn=window.jQuery),Rn}function Ux(){Rn=null}function $e(t){if(!t||t.length===0)return!1;let e=t[0];if(!e||e.nodeType!==1)return!1;let r=e.ownerDocument||document;return e.isConnected?r?.documentElement?.contains?r.documentElement.contains(e):!0:!1}function Hr(...t){return t.flat(1/0).flatMap(e=>String(e||"").split(/\s+/)).map(e=>e.trim()).filter(Boolean).join(" ")}function gs(t={}){return Object.entries(t).filter(([,e])=>e!=null&&e!==!1).map(([e,r])=>r===!0?e:`${e}="${pe(String(r))}"`).join(" ")}function pp(t=[],e="",r=""){let n=String(e??""),s=t.find(o=>o.value===n)||t.find(o=>o.disabled!==!0)||null;return s||{value:n,label:r||n||"\u8BF7\u9009\u62E9",disabled:!1}}function Fx(t=""){return String(t||"").split(/\s+/).map(e=>e.trim()).filter(e=>e&&e!=="yyt-select"&&e!=="yyt-native-select-bridge")}function cp(t,e){let r=se();if(!r||!e?.length)return null;let n=e.attr("id")?`#${e.attr("id")}`:e.attr("data-yyt-select-key")?`[data-yyt-select-key="${e.attr("data-yyt-select-key")}"]`:"";if(!n)return null;let o=t.find("[data-yyt-custom-select]").filter((a,i)=>String(r(i).attr("data-yyt-select-target")||"")===n);return o.length?o.first():null}function yp(t){let e=t?.[0];return e?.ownerDocument?e.ownerDocument:typeof window.parent<"u"&&window.parent!==window&&window.parent.document?window.parent.document:document}function Wx(t){if(!se()||!$e(t))return null;let r=t.find("[data-yyt-custom-select]");return r.length?r:null}function fp(t,e){if(!se()||!e?.length)return null;let n=e.find("[data-yyt-select-native]").first();if(n.length)return n;let s=String(e.attr("data-yyt-select-target")||"").trim();if(!s)return null;let o=t.find(s).first();return o.length?o:null}function gp(t=null){return t?.jquery&&t[0]?.ownerDocument?t[0].ownerDocument:t?.ownerDocument?t.ownerDocument:t?.nodeType===9?t:qt()}function ur(t=null){let e=gp(t),r=dp.get(e);return r||(r={targetDoc:e,layer:null,activeRoot:null,activeDropdown:null,placeholder:null,cleanup:null},dp.set(e,r)),r}function Hx(t=null){let e=gp(t);if(!e?.body)return null;let r=ur(e);if(r.layer&&r.layer.isConnected)return r.layer;let n=e.getElementById(up);return n||(n=e.createElement("div"),n.id=up,n.className="yyt-select-portal-layer",e.body.appendChild(n)),r.layer=n,n}function La(t){if(!se()||!t?.length)return null;let r=t.find("[data-yyt-select-trigger]").first();return r.length?r:t.find(".yyt-select-trigger").first()}function mp(t){let e=se();if(!e||!t?.length)return null;let r=ur(t);if(r.activeRoot===t[0]&&r.activeDropdown)return e(r.activeDropdown);let n=t.find("[data-yyt-select-dropdown]").first();return n.length?n:t.find(".yyt-select-dropdown").first()}function Gx(t){t&&(t.classList.remove("yyt-floating-open"),t.removeAttribute("data-yyt-floating"),t.removeAttribute("data-yyt-floating-placement"),t.style.position="",t.style.top="",t.style.left="",t.style.right="",t.style.width="",t.style.minWidth="",t.style.maxWidth="",t.style.maxHeight="",t.style.visibility="",t.style.zIndex="")}function hp(t,e=null){if(!t)return!1;let r=ur(e||t);return r.activeRoot?.contains?.(t)||r.activeDropdown?.contains?.(t)?!0:!!t.closest?.("[data-yyt-custom-select], .yyt-select-portal-layer")}function qx(t){if(!t?.targetDoc||typeof t.cleanup=="function")return;let e=t.targetDoc,r=e.defaultView||window,n=i=>{!t.activeRoot||!t.activeDropdown||hp(i.target,e)||dr(e)},s=i=>{if(i.key!=="Escape")return;let l=t.activeRoot;dr(e);let d=se();d&&l&&La(d(l))?.trigger("focus")},o=()=>{$l(e)},a=()=>{$l(e)};e.addEventListener("mousedown",n,!0),e.addEventListener("keydown",s,!0),r.addEventListener("resize",o),e.addEventListener("scroll",a,!0),t.cleanup=()=>{e.removeEventListener("mousedown",n,!0),e.removeEventListener("keydown",s,!0),r.removeEventListener("resize",o),e.removeEventListener("scroll",a,!0)}}function Yx(t){typeof t?.cleanup=="function"&&t.cleanup(),t&&(t.cleanup=null)}function Nl(t){let e=se();if(!e||!t?.activeRoot||!t?.activeDropdown)return;let r=t.targetDoc;if(!r?.body?.contains?.(t.activeRoot)){dr(r);return}let n=e(t.activeRoot),s=La(n),o=t.activeDropdown,a=r?.defaultView||window;if(!s?.length||!o?.isConnected||!n[0]?.isConnected){dr(r);return}let i=s[0].getBoundingClientRect(),l=a.innerWidth||r.documentElement?.clientWidth||0,d=a.innerHeight||r.documentElement?.clientHeight||0,c=12,u=8,y=Math.max(0,d-i.bottom-c-u),p=Math.max(0,i.top-c-u),g=y<220&&p>y,h=Math.max(120,Math.floor((g?p:y)||0));o.setAttribute("data-yyt-floating","true"),o.setAttribute("data-yyt-floating-placement",g?"top":"bottom"),o.classList.add("yyt-floating-open");let b=Math.ceil(i.width),w=Math.max(b,Math.floor(l-c*2)),S=o.style.width,_=o.style.minWidth,k=o.style.maxWidth,v=o.style.visibility;o.style.width="max-content",o.style.minWidth=`${b}px`,o.style.maxWidth=`${w}px`,o.style.visibility="hidden";let C=Math.ceil(o.scrollWidth||o.getBoundingClientRect().width||b),R=Math.max(b,Math.min(w,C)),L=Math.min(o.scrollHeight||h,h);o.style.width=S,o.style.minWidth=_,o.style.maxWidth=k,o.style.visibility=v;let N=Math.round(i.left);N+R>l-c&&(N=Math.max(c,Math.round(l-c-R))),N=Math.max(c,N);let E=Math.round(g?i.top-u-L:i.bottom+u);E=Math.max(c,Math.min(E,Math.round(d-c-L))),o.style.position="fixed",o.style.top=`${E}px`,o.style.left=`${N}px`,o.style.right="auto",o.style.width=`${R}px`,o.style.minWidth=`${b}px`,o.style.maxWidth=`${w}px`,o.style.maxHeight=`${Math.floor(h)}px`,o.style.visibility="",o.style.zIndex="10050"}function dr(t=null){let e=se(),r=ur(t);if(!e||!r?.activeRoot)return;let n=r.activeRoot,s=r.activeDropdown,o=r.placeholder,a=e(n),i=La(a);s&&(Gx(s),o?.parentNode?o.parentNode.insertBefore(s,o):n?.isConnected?n.appendChild(s):s.remove()),o?.parentNode?.removeChild(o),a.removeClass("yyt-open"),i?.attr("aria-expanded","false"),r.activeRoot=null,r.activeDropdown=null,r.placeholder=null,Yx(r)}function $l(t=null){let e=ur(t);!e?.activeRoot||!e?.activeDropdown||Nl(e)}function bp(t){if(!se()||!t?.length)return;let r=t.first(),n=La(r),s=mp(r);if(!n?.length||!s?.length||n.prop("disabled"))return;let o=ur(r);if(o.activeRoot===r[0]){Nl(o);return}dr(r);let a=Hx(r);if(!a)return;let i=s[0],l=o.targetDoc.createComment("yyt-select-dropdown-placeholder");i.parentNode?.insertBefore(l,i),a.appendChild(i),o.activeRoot=r[0],o.activeDropdown=i,o.placeholder=l,r.addClass("yyt-open"),n.attr("aria-expanded","true"),qx(o),Nl(o)}function Vx(t,e){let r=se();if(!r||!e?.length)return null;let n=e.closest("[data-yyt-custom-select]");if(n.length)return n.first();let s=ur(e);if(s.activeRoot&&s.activeDropdown?.contains?.(e[0])){let o=r(s.activeRoot);return t.has(s.activeRoot).length?o:null}return null}function Ll(t){let e=ur(t);t?.length&&e.activeRoot&&e.activeRoot!==t[0]||dr(t)}function xp(t){let e=ur(t);if(t?.length&&e.activeRoot===t[0]){dr(t);return}bp(t)}function Ml(t,e,r=null){let n=se();if(!n||!e?.length)return;let s=r||fp(t,e);if(!s?.length)return;let o=Array.isArray(s.data("yytCustomSelectOptions"))?s.data("yytCustomSelectOptions"):[],a=pp(o,s.val(),e.attr("data-yyt-select-placeholder")||""),i=String(a.value??""),l=String(a.label??""),d=s.is(":disabled");e.find(".yyt-select-value").text(l).attr("data-value",i).data("value",i);let c=mp(e);(c?.length?c.find("[data-yyt-select-option]"):e.find("[data-yyt-select-option]")).each((p,g)=>{let m=n(g),h=String(m.attr("data-value")||"")===i;m.toggleClass("yyt-selected",h).attr("aria-selected",String(h))});let y=e.find("[data-yyt-select-trigger]").first();y.prop("disabled",d),d&&(Ll(e),e.removeClass("yyt-open"),y.attr("aria-expanded","false"))}function wp(t=[]){return Array.isArray(t)?t.map(e=>{if(e&&typeof e=="object"&&!Array.isArray(e)){let n=String(e.value??""),s=String(e.label??e.text??e.name??n);return{value:n,label:s,disabled:e.disabled===!0}}let r=String(e??"");return{value:r,label:r,disabled:!1}}):[]}function vp(t={}){let{selectedValue:e="",options:r=[],placeholder:n="\u8BF7\u9009\u62E9",disabled:s=!1,includeNative:o=!0,nativeTag:a="input",nativeType:i="hidden",rootAttributes:l={},nativeAttributes:d={},triggerAttributes:c={},dropdownAttributes:u={},optionAttributes:y={},optionClass:p="",optionTextClass:g=""}=t,m=wp(r),h=pp(m,e,n),b=s===!0||m.length===0,w=gs({...l,class:Hr("yyt-custom-select",l.class),"data-yyt-custom-select":l["data-yyt-custom-select"]??"true","data-yyt-select-placeholder":n}),S=gs({type:"button",...c,class:Hr("yyt-select-trigger",c.class),"data-yyt-select-trigger":c["data-yyt-select-trigger"]??"true","aria-haspopup":c["aria-haspopup"]??"listbox","aria-expanded":c["aria-expanded"]??"false",disabled:b?!0:c.disabled}),_=gs({...u,class:Hr("yyt-select-dropdown",u.class),"data-yyt-select-dropdown":u["data-yyt-select-dropdown"]??"true",role:u.role??"listbox"}),k=o?(()=>{let v={...d,class:Hr(d.class),"data-yyt-select-native":d["data-yyt-select-native"]??"true",disabled:b?!0:d.disabled};return a==="select"?`<select ${gs(v)}>${m.map(L=>`
            <option value="${pe(L.value)}" ${L.value===String(h.value??"")?"selected":""} ${L.disabled?"disabled":""}>${pe(L.label)}</option>
          `).join("")}</select>`:`<input ${gs({type:i,value:h.value,...v})}>`})():"";return`
    <div ${w}>
      ${k}
      <button ${S}>
        <span class="${pe(Hr("yyt-select-value"))}" data-value="${pe(h.value)}">${pe(h.label)}</span>
        <i class="fa-solid fa-chevron-down yyt-select-arrow"></i>
      </button>
      <div ${_}>
        ${m.map(v=>{let C=v.value===String(h.value??"");return`
            <button ${gs({type:"button",...y,class:Hr("yyt-select-option",p,y.class,C?"yyt-selected":""),"data-yyt-select-option":y["data-yyt-select-option"]??"true","data-value":v.value,role:y.role??"option","aria-selected":C?"true":"false",disabled:v.disabled?!0:y.disabled})}>
              <span class="${pe(Hr("yyt-option-text",g))}">${pe(v.label)}</span>
            </button>
          `}).join("")}
      </div>
    </div>
  `}function Lt(t,e="yytCustomSelect"){let r=se();if(!r||!$e(t))return;let n=yp(t),s=ur(n);s.activeRoot&&t.has(s.activeRoot).length&&dr(n),t.off(`.${e}`),r(n).off(`click.${e}`),r(n).off(`mousedown.${e}`),t.find('[data-yyt-enhanced-select="true"]').remove(),t.find(".yyt-native-select-bridge").each((o,a)=>{let i=r(a),l=i.attr("data-yyt-original-style");l!==void 0&&l?i.attr("style",l):i.removeAttr("style"),i.removeClass("yyt-native-select-bridge").removeAttr("data-yyt-original-style").removeAttr("data-yyt-select-key").removeData("yytCustomSelectOptions")})}function pr(t,e={}){let r=se();if(!r||!$e(t))return;let{namespace:n="yytCustomSelect",selectors:s=[]}=e,o=Array.isArray(s)?s.filter(Boolean):[s].filter(Boolean);if(o.length===0)return;Lt(t,n);let a=o.join(", "),i=yp(t);t.find(a).each((l,d)=>{let c=r(d),u=String(c.attr("id")||"").trim(),y=u||`yyt-select-${Date.now()}-${l}`,p=u?`#${u}`:`[data-yyt-select-key="${y}"]`,g=`${y}-dropdown`,m=Fx(c.attr("class")),h=c.attr("style"),b=c.find("option").map((_,k)=>{let v=r(k);return{value:String(v.attr("value")??v.val()??""),label:v.text(),disabled:v.is(":disabled")}}).get();c.attr("data-yyt-original-style",h??"").attr("data-yyt-select-key",y).addClass("yyt-native-select-bridge").css("display","none").data("yytCustomSelectOptions",b);let w=vp({includeNative:!1,selectedValue:c.val(),options:b,disabled:c.is(":disabled"),placeholder:b[0]?.label||"\u8BF7\u9009\u62E9",rootAttributes:{class:Hr(m),style:h||void 0,"data-yyt-enhanced-select":"true","data-yyt-select-target":p},triggerAttributes:{id:`${y}-trigger`,"aria-controls":g},dropdownAttributes:{id:g}});c.after(w);let S=cp(t,c);Ml(t,S,c)}),t.on(`click.${n}`,"[data-yyt-select-trigger]",l=>{l.preventDefault(),l.stopPropagation();let d=r(l.currentTarget);if(d.prop("disabled"))return;let c=d.closest("[data-yyt-custom-select]");xp(c)}),t.on(`change.${n}`,a,l=>{let d=r(l.currentTarget),c=d.find("option").map((y,p)=>{let g=r(p);return{value:String(g.attr("value")??g.val()??""),label:g.text(),disabled:g.is(":disabled")}}).get();d.data("yytCustomSelectOptions",c);let u=cp(t,d);Ml(t,u,d)}),r(i).off(`click.${n}`).on(`click.${n}`,l=>{if(hp(l.target,i))return;let d=Wx(t);d?.length&&(dr(i),d.filter(".yyt-open").removeClass("yyt-open").find("[data-yyt-select-trigger]").attr("aria-expanded","false"))}),r(i).off(`mousedown.${n}`,".yyt-select-portal-layer [data-yyt-select-option]").on(`mousedown.${n}`,".yyt-select-portal-layer [data-yyt-select-option]",l=>{l.preventDefault(),l.stopPropagation();let d=r(l.currentTarget);if(d.prop("disabled"))return;let c=Vx(t,d);if(!c?.length)return;let u=fp(t,c);if(!u?.length)return;let y=String(d.attr("data-value")||"");u.val(y).trigger("change"),Ml(t,c,u),Ll(c)})}function Jx(t,e=Mn){if(!se()||!$e(t))return{url:"",apiKey:"",model:"",useMainApi:!0,stream:!1,max_tokens:4096,temperature:.7,top_p:.9};let n=t.find(`#${e}-model`).val()?.trim()||"",s=t.find(`#${e}-model-select`);return s.is(":visible")&&(n=s.val()||n),{url:t.find(`#${e}-api-url`).val()?.trim()||"",apiKey:t.find(`#${e}-api-key`).val()||"",model:n,useMainApi:t.find(`#${e}-use-main-api`).is(":checked"),stream:t.find(`#${e}-stream`).is(":checked"),max_tokens:parseInt(t.find(`#${e}-max-tokens`).val())||4096,temperature:parseFloat(t.find(`#${e}-temperature`).val())??.7,top_p:parseFloat(t.find(`#${e}-top-p`).val())??.9}}function Xx(t,e,r=Mn){if(!se()||!$e(t)||!e)return;t.find(`#${r}-api-url`).val(e.url||""),t.find(`#${r}-api-key`).val(e.apiKey||""),t.find(`#${r}-model`).val(e.model||""),t.find(`#${r}-stream`).prop("checked",e.stream===!0),t.find(`#${r}-max-tokens`).val(e.max_tokens||4096),t.find(`#${r}-temperature`).val(e.temperature??.7),t.find(`#${r}-top-p`).val(e.top_p??.9);let s=e.useMainApi??!0;t.find(`#${r}-use-main-api`).prop("checked",s);let a=t.find(`#${r}-custom-api-fields`);s?a.addClass("yyt-disabled").find("input, button, select").prop("disabled",!0):a.removeClass("yyt-disabled").find("input, button, select").prop("disabled",!1),t.find(`#${r}-model`).show(),t.find(`#${r}-model-select`).hide()}function xo(t){let{id:e,title:r,body:n,width:s="380px",wide:o=!1,dialogClass:a="",bodyClass:i="",footerClass:l=""}=t;return`
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
  `}function wo(t,e,r={}){if(!se())return()=>{};let s=t.find(`#${e}-overlay`),o=()=>{s.remove(),a?.removeEventListener("keydown",i),r.onClose&&r.onClose()};s.find(`#${e}-close, #${e}-cancel`).on("click",o),s.on("click",function(l){l.target===this&&o()}),s.find(`#${e}-save`).on("click",function(){r.onSave&&r.onSave(o)});let a=s[0]?.ownerDocument||document,i=l=>{l.key==="Escape"&&(l.stopPropagation(),o())};return a.addEventListener("keydown",i),o}function kr(t,e,r={}){let{confirmText:n="\u786E\u5B9A",cancelText:s="\u53D6\u6D88",danger:o=!1,width:a="380px"}=r,i=se(),l=qt();if(!i||!l?.body)return Promise.resolve(!1);let d=`yyt-confirm-${++Sp}`;return new Promise(c=>{let u=!1,y=h=>{u||(u=!0,m.remove(),p?.focus(),c(h))},p=l.activeElement,g=`
      <div class="yyt-dialog-overlay" id="${d}-overlay">
        <div class="yyt-dialog" style="${a!=="380px"?`width: ${a};`:""} max-height: calc(100vh - 32px);">
          <div class="yyt-dialog-header">
            <span class="yyt-dialog-title">${pe(t)}</span>
            <button class="yyt-dialog-close" id="${d}-close">
              <i class="fa-solid fa-times"></i>
            </button>
          </div>
          <div class="yyt-dialog-body">
            <div style="color: var(--yyt-text-secondary); font-size: 13px; line-height: 1.6;">${pe(e)}</div>
          </div>
          <div class="yyt-dialog-footer">
            <button class="yyt-btn yyt-btn-secondary" id="${d}-cancel">${pe(s)}</button>
            <button class="yyt-btn ${o?"yyt-btn-danger":"yyt-btn-primary"}" id="${d}-confirm">${pe(n)}</button>
          </div>
        </div>
      </div>`,m=i(g).appendTo(l.body);m.find(`#${d}-confirm`).on("click",()=>y(!0)),m.find(`#${d}-cancel, #${d}-close`).on("click",()=>y(!1)),m.on("click",function(h){h.target===this&&y(!1)}),m.on("keydown",h=>{h.key==="Escape"&&(h.stopPropagation(),y(!1)),h.key==="Enter"&&(h.stopPropagation(),y(!0))}),m.find(`#${d}-${o?"cancel":"confirm"}`).trigger("focus")})}function Qx(t,e,r={}){let{defaultValue:n="",placeholder:s="",confirmText:o="\u786E\u5B9A",cancelText:a="\u53D6\u6D88",width:i="380px"}=r,l=se(),d=qt();if(!l||!d?.body)return Promise.resolve(null);let c=`yyt-prompt-${++Sp}`;return new Promise(u=>{let y=!1,p=S=>{y||(y=!0,h.remove(),g?.focus(),u(S))},g=d.activeElement,m=`
      <div class="yyt-dialog-overlay" id="${c}-overlay">
        <div class="yyt-dialog" style="${i!=="380px"?`width: ${i};`:""} max-height: calc(100vh - 32px);">
          <div class="yyt-dialog-header">
            <span class="yyt-dialog-title">${pe(t)}</span>
            <button class="yyt-dialog-close" id="${c}-close">
              <i class="fa-solid fa-times"></i>
            </button>
          </div>
          <div class="yyt-dialog-body">
            ${e?`<div style="color: var(--yyt-text-secondary); font-size: 13px; line-height: 1.6;">${pe(e)}</div>`:""}
            <input class="yyt-input" id="${c}-input" type="text" value="${pe(n)}" placeholder="${pe(s)}" />
          </div>
          <div class="yyt-dialog-footer">
            <button class="yyt-btn yyt-btn-secondary" id="${c}-cancel">${pe(a)}</button>
            <button class="yyt-btn yyt-btn-primary" id="${c}-confirm">${pe(o)}</button>
          </div>
        </div>
      </div>`,h=l(m).appendTo(d.body),b=h.find(`#${c}-input`),w=()=>{let S=b.val().trim();p(S||null)};h.find(`#${c}-confirm`).on("click",w),h.find(`#${c}-cancel, #${c}-close`).on("click",()=>p(null)),h.on("click",function(S){S.target===this&&p(null)}),b.on("keydown",S=>{S.key==="Enter"&&(S.stopPropagation(),w())}),h.on("keydown",S=>{S.key==="Escape"&&(S.stopPropagation(),p(null))}),b.trigger("focus").trigger("select")})}function Zx(t,e,r){if(t.prop("disabled")&&t.data("yytLoading"))return Promise.resolve();let n=t.html(),s=t.outerWidth();if(t.prop("disabled",!0).data("yytLoading",!0),t.css("min-width",s+"px"),r)t.html(`<i class="fa-solid fa-spinner fa-spin" style="margin-right:4px"></i>${pe(r)}`);else{let o=t.find("i.fa-solid, i.fa-regular").first();o.length?(o.data("yytOriginalClass",o.attr("class")),o.attr("class","fa-solid fa-spinner fa-spin")):t.html(`<i class="fa-solid fa-spinner fa-spin" style="margin-right:4px"></i>${n}`)}return Promise.resolve().then(()=>e()).finally(()=>{if(r)t.html(n);else{let o=t.find("i.fa-spinner"),a=o.data("yytOriginalClass");a?o.attr("class",a).removeData("yytOriginalClass"):t.html(n)}t.prop("disabled",!1).removeData("yytLoading").css("min-width","")})}function vo(t,e){let r=new Blob([t],{type:"application/json"}),n=URL.createObjectURL(r),s=document.createElement("a");s.href=n,s.download=e,s.click(),URL.revokeObjectURL(n)}function So(t){return new Promise((e,r)=>{let n=new FileReader;n.onload=s=>e(s.target.result),n.onerror=s=>r(new Error("\u6587\u4EF6\u8BFB\u53D6\u5931\u8D25")),n.readAsText(t)})}var Kx,Mn,Pl,Rn,dp,up,Sp,lt=O(()=>{Y();Kx=I.createScope("UIUtils"),Mn="youyou_toolkit",Pl=class{constructor(e={}){this._state={...e}}get(e){return this._state[e]}set(e,r){return this._state[e]=r,this}reset(e={}){return this._state={...e},this}toJSON(){return{...this._state}}};Rn=null;dp=new WeakMap,up="yyt-select-portal-layer";Sp=0});var Tp={};ue(Tp,{StorageService:()=>Pn,default:()=>nw,getStorage:()=>ew,loadSettings:()=>tw,presetStorage:()=>Oe,saveSettings:()=>rw,storage:()=>j,toolStorage:()=>Ce,windowStorage:()=>Da});function ew(){let t=j;return t._getStorage(),t._storage}function tw(){return j.get("settings",{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}})}function rw(t){j.set("settings",t)}var Dl,Pn,j,Ce,Oe,Da,nw,We=O(()=>{Y();Dl=I.createScope("StorageService"),Pn=class t{constructor(e="youyou_toolkit"){this.namespaceKey=e,this._storage=null,this._cache=new Map}_getStorage(){if(this._storage)return this._storage;try{let e=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(e.SillyTavern?.getContext){let r=e.SillyTavern.getContext();if(r?.extensionSettings)return r.extensionSettings[this.namespaceKey]||(r.extensionSettings[this.namespaceKey]={}),this._storage={_target:r.extensionSettings[this.namespaceKey],getItem:n=>{let s=r.extensionSettings[this.namespaceKey][n];return typeof s=="string"?s:s?JSON.stringify(s):null},setItem:(n,s)=>{r.extensionSettings[this.namespaceKey][n]=s,this._saveSettings(r)},removeItem:n=>{delete r.extensionSettings[this.namespaceKey][n],this._saveSettings(r)},_isTavern:!0},this._storage}}catch{Dl.warn("SillyTavern\u5B58\u50A8\u4E0D\u53EF\u7528\uFF0C\u4F7F\u7528localStorage")}return this._storage={getItem:e=>{try{return localStorage.getItem(e)}catch{return null}},setItem:(e,r)=>{try{localStorage.setItem(e,r)}catch(n){Dl.error("localStorage\u5199\u5165\u5931\u8D25:",n)}},removeItem:e=>{try{localStorage.removeItem(e)}catch{}},_isTavern:!1},this._storage}_saveSettings(e){if(typeof e.saveSettings=="function")try{e.saveSettings()}catch{}else if(typeof e.saveSettingsDebounced=="function")try{e.saveSettingsDebounced()}catch{}}get(e,r=null){let n=`${this.namespaceKey}:${e}`;if(this._cache.has(n))return this._cache.get(n);let s=this._getStorage(),o=this._getFullKey(e),a=s.getItem(o);if(a===null)return r;try{let i=JSON.parse(a);return this._cache.set(n,i),i}catch{return a}}set(e,r){let n=this._getStorage(),s=this._getFullKey(e),o=`${this.namespaceKey}:${e}`;this._cache.set(o,r);try{n.setItem(s,JSON.stringify(r))}catch(a){Dl.error("\u5B58\u50A8\u5931\u8D25:",a)}}remove(e){let r=this._getStorage(),n=this._getFullKey(e),s=`${this.namespaceKey}:${e}`;this._cache.delete(s),r.removeItem(n)}has(e){let r=this._getStorage(),n=this._getFullKey(e);return r.getItem(n)!==null}clear(){if(this._getStorage()._isTavern){let r=typeof window.parent<"u"?window.parent:window;if(r.SillyTavern?.getContext){let n=r.SillyTavern.getContext();n?.extensionSettings?.[this.namespaceKey]&&(n.extensionSettings[this.namespaceKey]={},this._saveSettings(n))}}else{let r=`${this.namespaceKey}_`,n=[];for(let s=0;s<localStorage.length;s++){let o=localStorage.key(s);o&&o.startsWith(r)&&n.push(o)}n.forEach(s=>localStorage.removeItem(s))}this._cache.clear()}_getFullKey(e){return this._getStorage()._isTavern?e:`${this.namespaceKey}_${e}`}namespace(e){return new t(`${this.namespaceKey}:${e}`)}getMultiple(e){let r={};return e.forEach(n=>{r[n]=this.get(n)}),r}setMultiple(e){Object.entries(e).forEach(([r,n])=>{this.set(r,n)})}exportAll(){let e=this._getStorage(),r={};if(e._isTavern){let n=typeof window.parent<"u"?window.parent:window;if(n.SillyTavern?.getContext){let o=n.SillyTavern.getContext()?.extensionSettings?.[this.namespaceKey]||{};Object.entries(o).forEach(([a,i])=>{r[a]=typeof i=="string"?JSON.parse(i):i})}}else{let n=`${this.namespaceKey}_`;for(let s=0;s<localStorage.length;s++){let o=localStorage.key(s);if(o&&o.startsWith(n)){let a=o.slice(n.length);try{r[a]=JSON.parse(localStorage.getItem(o))}catch{r[a]=localStorage.getItem(o)}}}}return r}},j=new Pn("youyou_toolkit"),Ce=new Pn("youyou_toolkit:tools"),Oe=new Pn("youyou_toolkit:presets"),Da=new Pn("youyou_toolkit:windows");nw=j});var kp={};ue(kp,{API_STATUS:()=>dw,fetchAvailableModels:()=>xw,getApiConfig:()=>ms,getEffectiveApiConfig:()=>To,hasEffectiveApiPreset:()=>_o,sendApiRequest:()=>Ao,sendWithPreset:()=>Eo,testApiConnection:()=>bw,updateApiConfig:()=>pw,validateApiConfig:()=>Ba});function iw(){return{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,stream:!1,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}}}function zl(){return j.get(_p,iw())}function lw(t){j.set(_p,t)}function Ep(){return j.get(ow,[])}function cw(){return j.get(aw,"")}function Bl(t,e={}){let r=new Error(t);return r.allowDirectFallback=e.allowDirectFallback===!0,r}function Ap(t,e="chat_completions"){let r=String(t||"").trim();if(!r)return"";let n=null;try{n=new URL(r)}catch{return r}let s=n.pathname.replace(/\/+$/,""),o=s;return e==="chat_completions"?!/\/chat\/completions$/i.test(s)&&!/\/completions$/i.test(s)&&(o=`${s||""}/chat/completions`):e==="models"&&(/\/chat\/completions$/i.test(s)?o=s.replace(/\/chat\/completions$/i,"/models"):/\/completions$/i.test(s)?o=s.replace(/\/completions$/i,"/models"):/\/models$/i.test(s)||(o=`${s||""}/models`)),n.pathname=o.replace(/\/+/g,"/"),n.toString()}function uw(t){let e=String(t||"").trim();if(!e)return"";try{let r=new URL(e);return r.pathname=r.pathname.replace(/\/chat\/completions$/i,"").replace(/\/completions$/i,"").replace(/\/models$/i,"").replace(/\/+$/,"")||"/",r.toString().replace(/\/$/,"")}catch{return e.replace(/\/chat\/completions$/i,"").replace(/\/completions$/i,"").replace(/\/models$/i,"").replace(/\/+$/,"")}}function ms(){return zl().apiConfig||{}}function pw(t){let e=zl();e.apiConfig={...e.apiConfig,...t},lw(e)}function Ba(t){let e=[];if(t.useMainApi)return{valid:!0,errors:[]};if(!t.url||!t.url.trim())e.push("API URL \u4E0D\u80FD\u4E3A\u7A7A");else try{new URL(t.url)}catch{e.push("API URL \u683C\u5F0F\u65E0\u6548")}return(!t.model||!t.model.trim())&&e.push("\u6A21\u578B\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"),{valid:e.length===0,errors:e}}function To(t=""){let e=zl(),r=t||cw()||"";if(r){let s=Ep().find(o=>o.name===r);if(s&&s.apiConfig)return{...s.apiConfig,presetName:s.name}}return e.apiConfig||{}}function _o(t=""){return t?Ep().some(r=>r?.name===t):!1}async function Eo(t,e,r={},n=null){let s=To(t);return await Ao(e,{...r,apiConfig:s},n)}function Cp(t,e={}){let r=e.apiConfig||ms();return{messages:t,model:r.model||"gpt-3.5-turbo",max_tokens:r.max_tokens||4096,temperature:r.temperature??.7,top_p:r.top_p??.9,stream:r.stream??!1,...e.extraParams}}function Kl(t){let e="";if(t?.choices&&t.choices[0]?.message?.content)e=t.choices[0].message.content;else if(t?.content)e=t.content;else if(t?.text)e=t.text;else if(t?.response)e=t.response;else throw new Error(`\u65E0\u6CD5\u89E3\u6790API\u54CD\u5E94\u683C\u5F0F: ${JSON.stringify(t).slice(0,200)}`);return String(e||"").trim()}async function Ao(t,e={},r=null){let n=e.apiConfig||ms(),s=n.useMainApi,o=Ba(n);if(!o.valid&&!s)throw new Error(`API\u914D\u7F6E\u65E0\u6548: ${o.errors.join(", ")}`);return s?await yw(t,e,r):await fw(t,n,e,r)}async function yw(t,e,r){let n=typeof window.parent<"u"?window.parent:window;if(!n.TavernHelper?.generateRaw)throw new Error("TavernHelper.generateRaw \u4E0D\u53EF\u7528\u3002\u8BF7\u68C0\u67E5SillyTavern\u7248\u672C\u3002");try{let s=await n.TavernHelper.generateRaw({ordered_prompts:t,should_stream:e.apiConfig?.stream??ms().stream??!1,...e.extraParams});if(typeof s!="string")throw new Error("\u4E3BAPI\u8FD4\u56DE\u4E86\u975E\u9884\u671F\u7684\u54CD\u5E94\u7C7B\u578B");return s.trim()}catch(s){throw s.name==="AbortError"?s:new Error(`\u4E3BAPI\u8BF7\u6C42\u5931\u8D25: ${s.message}`)}}async function fw(t,e,r,n){let s=typeof window.parent<"u"?window.parent:window;if(s.TavernHelper?.generateRaw)try{return await gw(t,e,r,n,s)}catch(o){let a=String(o?.message||o||"");if(o?.name==="AbortError"||n?.aborted||a.includes("\u505C\u6B62\u6309\u94AE")||a.includes("stop button")||a.includes("Clicked stop")||a==="\u8BF7\u6C42\u5DF2\u53D6\u6D88")throw o;sw.warn("TavernHelper \u81EA\u5B9A\u4E49\u8BF7\u6C42\u5931\u8D25\uFF0C\u56DE\u9000\u5230\u540E\u5907\u94FE\u8DEF:",o)}if(s.SillyTavern?.getRequestHeaders)try{return await mw(t,e,r,n,s)}catch(o){if(!o?.allowDirectFallback)throw o}return await hw(t,e,r,n)}async function gw(t,e,r,n,s){if(n?.aborted)throw new DOMException("\u8BF7\u6C42\u5DF2\u53D6\u6D88","AbortError");let o=await s.TavernHelper.generateRaw({ordered_prompts:t,should_stream:e.stream??!1,max_chat_history:0,custom_api:{apiurl:uw(e.url),key:e.apiKey||"",model:e.model||"gpt-3.5-turbo",max_tokens:e.max_tokens||4096,temperature:e.temperature??.7,top_p:e.top_p??.9},...r.extraParams||{}});return typeof o=="string"?o.trim():Kl(o)}async function mw(t,e,r,n,s){let o=String(e.url||"").trim(),a={...Cp(t,{apiConfig:e,...r}),chat_completion_source:"custom",reverse_proxy:o,proxy_password:"",custom_url:o,custom_include_headers:e.apiKey?`Authorization: Bearer ${e.apiKey}`:""},i={...typeof s.SillyTavern?.getRequestHeaders=="function"?s.SillyTavern.getRequestHeaders():{},"Content-Type":"application/json"},l=null;try{l=await fetch("/api/backends/chat-completions/generate",{method:"POST",headers:i,body:JSON.stringify(a),signal:n})}catch(u){throw u?.name==="AbortError"?u:Bl(`\u9152\u9986\u540E\u7AEF\u8F6C\u53D1\u8BF7\u6C42\u4E0D\u53EF\u7528\uFF0C\u5DF2\u5C1D\u8BD5\u56DE\u9000\u5230\u6D4F\u89C8\u5668\u76F4\u8FDE\u3002\u539F\u59CB\u9519\u8BEF: ${u.message}`,{allowDirectFallback:!0})}let d=await l.text().catch(()=>"");if(!l.ok){let u=[404,405,501,502].includes(l.status);throw Bl(`\u9152\u9986\u540E\u7AEF\u8F6C\u53D1\u8BF7\u6C42\u5931\u8D25 (${l.status}): ${d||"Unknown error"}`,{allowDirectFallback:u})}let c=null;try{c=d?JSON.parse(d):{}}catch{let y=String(d||"").replace(/\s+/g," ").trim().slice(0,120);throw Bl(`\u9152\u9986\u540E\u7AEF\u8FD4\u56DE\u4E86\u975EJSON\u5185\u5BB9\u3002\u54CD\u5E94\u7247\u6BB5: ${y||"(\u7A7A\u54CD\u5E94)"}`)}return Kl(c)}async function hw(t,e,r,n){let s=Cp(t,{apiConfig:e,...r}),o=Ap(e.url,"chat_completions"),a={"Content-Type":"application/json"};e.apiKey&&(a.Authorization=`Bearer ${e.apiKey}`);let i=await fetch(o,{method:"POST",headers:a,body:JSON.stringify(s),signal:n}),l=await i.text().catch(()=>"");if(!i.ok){let c=l||"Unknown error";throw new Error(`API\u8BF7\u6C42\u5931\u8D25 (${i.status}): ${c}`)}let d=null;try{d=l?JSON.parse(l):{}}catch{let u=String(l||"").replace(/\s+/g," ").trim().slice(0,120);throw new Error(`\u81EA\u5B9A\u4E49API\u8FD4\u56DE\u7684\u4E0D\u662FJSON\uFF0C\u53EF\u80FD\u662FURL\u914D\u7F6E\u9519\u8BEF\u3001\u53EA\u586B\u5199\u4E86\u7AD9\u70B9\u9996\u9875/\u57FA\u7840\u8DEF\u5F84\u3001\u6216\u8BF7\u6C42\u88AB\u91CD\u5B9A\u5411\u3002\u5F53\u524D\u4F1A\u81EA\u52A8\u5C1D\u8BD5\u8865\u5168 chat/completions \u7AEF\u70B9\uFF1B\u82E5\u4ECD\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5API URL\uFF0C\u6216\u6539\u4E3A\u542F\u7528\u201C\u4F7F\u7528SillyTavern\u4E3BAPI\u201D\u3002\u54CD\u5E94\u7247\u6BB5: ${u||"(\u7A7A\u54CD\u5E94)"}`)}return Kl(d)}async function bw(t=null){let e=t||ms(),r=Date.now();try{await Ao([{role:"user",content:'Hello, this is a connection test. Please respond with "OK".'}],{apiConfig:e});let s=Date.now()-r;return{success:!0,message:`\u8FDE\u63A5\u6210\u529F (\u5EF6\u8FDF: ${s}ms)`,latency:s}}catch(n){return{success:!1,message:`\u8FDE\u63A5\u5931\u8D25: ${n.message}`,latency:Date.now()-r}}}async function xw(t=null){let e=t||ms();return e.useMainApi?await ww():await vw(e)}async function ww(){let t=typeof window.parent<"u"?window.parent:window;try{if(t.SillyTavern?.getContext){let e=t.SillyTavern.getContext();if(e.settings?.api_server)return[e.settings.api_server]}return["gpt-4","gpt-4-turbo","gpt-3.5-turbo","claude-3-opus","claude-3-sonnet"]}catch{return["gpt-4","gpt-3.5-turbo"]}}async function vw(t){if(!t.url||!t.apiKey)return[];try{let e=Ap(t.url,"models"),r=await fetch(e,{method:"GET",headers:{Authorization:`Bearer ${t.apiKey}`}});if(!r.ok)return[];let n=await r.json();return n.data&&Array.isArray(n.data)?n.data.map(s=>s.id||s.name).filter(Boolean).sort():[]}catch{return[]}}var sw,_p,ow,aw,dw,Co=O(()=>{We();Y();sw=I.createScope("ApiConnection"),_p="settings",ow="api_presets",aw="current_preset";dw={IDLE:"idle",CONNECTING:"connecting",SUCCESS:"success",ERROR:"error"}});var Pp={};ue(Pp,{createPreset:()=>ja,createPresetFromCurrentConfig:()=>kw,deletePreset:()=>Ua,duplicatePreset:()=>Wl,exportPresets:()=>Gl,generateUniquePresetName:()=>Rw,getActiveConfig:()=>Cw,getActivePresetName:()=>Hl,getAllPresets:()=>Gr,getPreset:()=>$n,getPresetNames:()=>jl,getStarredPresets:()=>Aw,importPresets:()=>ql,presetExists:()=>ko,renamePreset:()=>Fl,switchToPreset:()=>Fa,togglePresetStar:()=>Ew,updatePreset:()=>Ul,validatePreset:()=>Iw});function _w(){return{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}}}function Mp(){return j.get(Tw,_w())}function At(){return j.get(Ip,[])}function Nn(t){j.set(Ip,t)}function Ka(){return j.get(Rp,"")}function za(t){j.set(Rp,t||"")}function Gr(){return At()}function jl(){return At().map(e=>e.name)}function $n(t){return!t||typeof t!="string"?null:At().find(r=>r.name===t)||null}function ko(t){return!t||typeof t!="string"?!1:At().some(r=>r.name===t)}function ja(t){let{name:e,description:r,apiConfig:n}=t;if(!e||typeof e!="string"||!e.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let s=e.trim();if(ko(s))return{success:!1,message:`\u9884\u8BBE "${s}" \u5DF2\u5B58\u5728`};let o={name:s,description:r||"",apiConfig:{url:n?.url||"",apiKey:n?.apiKey||"",model:n?.model||"",useMainApi:n?.useMainApi??!0,stream:n?.stream??!1,max_tokens:n?.max_tokens||4096,temperature:n?.temperature??.7,top_p:n?.top_p??.9},createdAt:Date.now(),updatedAt:Date.now()},a=At();return a.push(o),Nn(a),{success:!0,message:`\u9884\u8BBE "${s}" \u521B\u5EFA\u6210\u529F`,preset:o}}function Ul(t,e){if(!t||typeof t!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let r=At(),n=r.findIndex(a=>a.name===t);if(n===-1)return{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if(e.name&&e.name!==t)return{success:!1,message:"\u4E0D\u652F\u6301\u4FEE\u6539\u9884\u8BBE\u540D\u79F0\uFF0C\u8BF7\u521B\u5EFA\u65B0\u9884\u8BBE"};let s=r[n],o={...s,...e,name:s.name,updatedAt:Date.now()};return e.apiConfig&&(o.apiConfig={...s.apiConfig,...e.apiConfig}),r[n]=o,Nn(r),{success:!0,message:`\u9884\u8BBE "${t}" \u66F4\u65B0\u6210\u529F`,preset:o}}function Ua(t){if(!t||typeof t!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let e=At(),r=e.findIndex(n=>n.name===t);return r===-1?{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`}:(e.splice(r,1),Nn(e),Ka()===t&&za(""),{success:!0,message:`\u9884\u8BBE "${t}" \u5DF2\u5220\u9664`})}function Fl(t,e){if(!t||typeof t!="string")return{success:!1,message:"\u539F\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};if(!e||typeof e!="string"||!e.trim())return{success:!1,message:"\u65B0\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let r=e.trim();if(!ko(t))return{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if(ko(r))return{success:!1,message:`\u9884\u8BBE "${r}" \u5DF2\u5B58\u5728`};let n=At(),s=n.find(o=>o.name===t);return s&&(s.name=r,s.updatedAt=Date.now(),Nn(n),Ka()===t&&za(r)),{success:!0,message:`\u9884\u8BBE\u5DF2\u91CD\u547D\u540D\u4E3A "${r}"`}}function Wl(t,e){if(!t||typeof t!="string")return{success:!1,message:"\u6E90\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};if(!e||typeof e!="string"||!e.trim())return{success:!1,message:"\u76EE\u6807\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let r=e.trim(),n=$n(t);if(!n)return{success:!1,message:`\u6E90\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if(ko(r))return{success:!1,message:`\u9884\u8BBE "${r}" \u5DF2\u5B58\u5728`};let s={...JSON.parse(JSON.stringify(n)),name:r,createdAt:Date.now(),updatedAt:Date.now()},o=At();return o.push(s),Nn(o),{success:!0,message:`\u9884\u8BBE\u5DF2\u590D\u5236\u4E3A "${r}"`,preset:s}}function Ew(t){if(!t||typeof t!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let e=At(),r=e.find(n=>n.name===t);return r?(r.starred=!r.starred,r.updatedAt=Date.now(),Nn(e),{success:!0,message:r.starred?`\u5DF2\u5C06 "${t}" \u6DFB\u52A0\u5230\u9884\u89C8\u5217\u8868`:`\u5DF2\u5C06 "${t}" \u4ECE\u9884\u89C8\u5217\u8868\u79FB\u9664`,starred:r.starred}):{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`}}function Aw(){return At().filter(e=>e.starred===!0)}function Fa(t){if(!t)return za(""),{success:!0,message:"\u5DF2\u5207\u6362\u5230\u5F53\u524DAPI\u914D\u7F6E"};let e=$n(t);return e?(za(t),{success:!0,message:`\u5DF2\u5207\u6362\u5230\u9884\u8BBE "${t}"`,apiConfig:e.apiConfig}):{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`}}function Hl(){return Ka()}function Cw(){let t=Ka();if(t){let r=$n(t);if(r)return{presetName:t,apiConfig:r.apiConfig}}return{presetName:"",apiConfig:Mp().apiConfig||{}}}function Gl(t=null){if(t){let r=$n(t);if(!r)throw new Error(`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`);return JSON.stringify(r,null,2)}let e=At();return JSON.stringify(e,null,2)}function ql(t,e={overwrite:!1}){let r;try{r=JSON.parse(t)}catch(a){return Sw.error("\u9884\u8BBE\u5BFC\u5165\u5931\u8D25: JSON\u89E3\u6790\u9519\u8BEF",{error:a}),{success:!1,message:"JSON\u89E3\u6790\u5931\u8D25",imported:0}}let n=Array.isArray(r)?r:[r];if(n.length===0)return{success:!1,message:"\u6CA1\u6709\u627E\u5230\u6709\u6548\u7684\u9884\u8BBE\u6570\u636E",imported:0};let s=At(),o=0;for(let a of n){if(!a.name||typeof a.name!="string"||!a.apiConfig||typeof a.apiConfig!="object")continue;let i=s.findIndex(l=>l.name===a.name);i>=0?e.overwrite&&(a.updatedAt=Date.now(),s[i]=a,o++):(a.createdAt=a.createdAt||Date.now(),a.updatedAt=Date.now(),s.push(a),o++)}return o>0&&Nn(s),{success:!0,message:`\u6210\u529F\u5BFC\u5165 ${o} \u4E2A\u9884\u8BBE`,imported:o}}function kw(t,e=""){let r=Mp();return ja({name:t,description:e,apiConfig:r.apiConfig})}function Iw(t){let e=[];return(!t.name||typeof t.name!="string"||!t.name.trim())&&e.push("\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"),(!t.apiConfig||typeof t.apiConfig!="object")&&e.push("\u7F3A\u5C11API\u914D\u7F6E"),{valid:e.length===0,errors:e}}function Rw(t){(!t||typeof t!="string")&&(t="\u65B0\u9884\u8BBE");let e=At(),r=new Set(e.map(s=>s.name));if(!r.has(t))return t;let n=1;for(;r.has(`${t} (${n})`);)n++;return`${t} (${n})`}var Sw,Tw,Ip,Rp,hs=O(()=>{We();Y();Sw=I.createScope("PresetManager"),Tw="settings",Ip="api_presets",Rp="current_preset"});var bs,Io,tr,Yl=O(()=>{at();lt();Y();bs=I.createScope("UIManager"),Io=class{constructor(){this.components=new Map,this.activeInstances=new Map,this.dependencies={},this.currentTab="main",this.currentSubTab={},this.initialized=!1}init(e={}){this.initialized||(this.dependencies=e.services||{},this._subscribeEvents(),this.initialized=!0,G.emit(F.UI_INITIALIZED),bs.log("\u521D\u59CB\u5316\u5B8C\u6210"))}register(e,r){return!e||!r?(bs.warn("\u65E0\u6548\u7684\u7EC4\u4EF6\u6CE8\u518C"),!1):(this.components.set(e,{id:e,...r,render:r.render||(()=>""),bindEvents:r.bindEvents||(()=>{}),destroy:r.destroy||(()=>{}),getStyles:r.getStyles||(()=>"")}),!0)}unregister(e){this.destroyInstance(e),this.components.delete(e)}getComponent(e){return this.components.get(e)}render(e,r,n={}){let s=se();if(!s){bs.error("jQuery\u4E0D\u53EF\u7528");return}let o=this.components.get(e);if(!o){bs.error(`\u7EC4\u4EF6\u4E0D\u5B58\u5728: ${e}`);let i;typeof r=="string"?i=s(r):r&&r.jquery?i=r:r&&(i=s(r)),i?.length&&i.html(`<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u7EC4\u4EF6\u672A\u6CE8\u518C\uFF1A${e}</span></div>`);return}let a;if(typeof r=="string"?a=s(r):r&&r.jquery?a=r:r&&(a=s(r)),!$e(a)){bs.warn("\u5BB9\u5668\u4E0D\u5B58\u5728");return}this.activeInstances.forEach((i,l)=>{i?.container?.length&&a.length&&i.container[0]===a[0]&&l!==e&&this.destroyInstance(l)}),this.destroyInstance(e);try{if(typeof o.renderTo=="function")o.renderTo(a,{...n,dependencies:this.dependencies});else{let i=o.render({...n,dependencies:this.dependencies});a.html(i),o.bindEvents(a,this.dependencies)}}catch(i){bs.error(`\u7EC4\u4EF6\u6E32\u67D3\u5931\u8D25: ${e}`,i),a.html(`<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u7EC4\u4EF6\u6E32\u67D3\u5931\u8D25\uFF1A${e}${i?.message?` - ${i.message}`:""}</span></div>`);return}this.activeInstances.set(e,{container:a,component:o,props:n}),G.emit(F.UI_RENDER_REQUESTED,{componentId:e})}destroyInstance(e){let r=this.activeInstances.get(e);r&&(r.component.destroy(r.container),this.activeInstances.delete(e))}destroyContainerInstance(e){let r=se();if(!r||!e)return;let n;if(typeof e=="string"?n=r(e):e?.jquery?n=e:n=r(e),!n?.length)return;let s=[];this.activeInstances.forEach((o,a)=>{o?.container?.length&&o.container[0]===n[0]&&s.push(a)}),s.forEach(o=>this.destroyInstance(o))}switchTab(e){let r=this.currentTab;this.currentTab=e,G.emit(F.UI_TAB_CHANGED,{tabId:e,oldTab:r})}getCurrentTab(){return this.currentTab}switchSubTab(e,r){this.currentSubTab[e]=r,G.emit(F.UI_SUBTAB_CHANGED,{mainTab:e,subTab:r})}getCurrentSubTab(e){return this.currentSubTab[e]||""}getAllStyles(){let e="";return this.components.forEach((r,n)=>{r.getStyles&&(e+=r.getStyles())}),e}injectStyles(e=document){let r="yyt-component-styles";if(e.getElementById(r))return;let n=e.createElement("style");n.id=r,n.textContent=this.getAllStyles(),(e.head||e.documentElement).appendChild(n)}setDependency(e,r){this.dependencies[e]=r}getDependency(e){return this.dependencies[e]}_subscribeEvents(){G.on(F.PRESET_UPDATED,()=>{}),G.on(F.TOOL_UPDATED,()=>{})}},tr=new Io});function f(t,e={},...r){let n=document.createElement(t);if(e.className&&(n.className=e.className),e.text!==void 0&&e.text!==null&&(n.textContent=String(e.text)),e.html!==void 0&&e.html!==null&&(n.innerHTML=String(e.html)),e.attrs)for(let[s,o]of Object.entries(e.attrs))o==null||o===!1||n.setAttribute(s,o===!0?"":String(o));if(e.style&&Object.assign(n.style,e.style),e.dataset)for(let[s,o]of Object.entries(e.dataset))n.dataset[s]=String(o);for(let s of r)V(n,s);return n}function V(t,e){if(!(e==null||e===!1)){if(Array.isArray(e)){for(let r of e)V(t,r);return}if(typeof e=="string"||typeof e=="number"){t.appendChild(document.createTextNode(String(e)));return}if(e instanceof Node){t.appendChild(e);return}if(e&&e.el instanceof Node){t.appendChild(e.el);return}}}function Np(){let t=new Map;return{on(e,r){return!e||typeof r!="function"?()=>{}:(t.has(e)||t.set(e,new Set),t.get(e).add(r),()=>this.off(e,r))},off(e,r){let n=t.get(e);n&&n.delete(r)},emit(e,...r){let n=t.get(e);if(n)for(let s of[...n])try{s(...r)}catch{}},clear(){t.clear()}}}function Vl(t,e){if(!t||!e)return null;if(t._id===e)return t;let r=t._children;if(!r)return null;let n=r instanceof Map?[...r.values()]:Array.isArray(r)?r:[];for(let s of n){let o=Vl(s,e);if(o)return o}return null}function De({id:t=null,kind:e="control",el:r=null,style:n=null,className:s=null,attrs:o=null}={}){if(r){if(n&&Object.assign(r.style,n),s){let i=String(s).trim().split(/\s+/).filter(Boolean);i.length&&r.classList.add(...i)}if(o)for(let[i,l]of Object.entries(o))l===!1||l==null||r.setAttribute(i,l===!0?"":String(l))}let a=Np();return{_id:t||null,_kind:e,_children:null,_emitter:a,on(i,l){return a.on(i,l)},off(i,l){a.off(i,l)},getControl(i){return Vl(this,i)},get(){},set(i){},destroy(){if(a.clear(),this._children){let i=this._children instanceof Map?[...this._children.values()]:Array.isArray(this._children)?this._children:[];for(let l of i)try{l?.destroy?.()}catch{}this._children instanceof Map?this._children.clear():Array.isArray(this._children)&&(this._children.length=0)}if(this.el?.parentNode)try{this.el.parentNode.removeChild(this.el)}catch{}}}}var mt=O(()=>{});function X(t={}){let{id:e=null,label:r="",icon:n=null,variant:s="default",size:o="normal",disabled:a=!1,title:i=null,onClick:l=null}=t,d=["yyt-btn"];s==="primary"?d.push("yyt-btn-primary"):s==="danger"?d.push("yyt-btn-danger"):s==="ghost"&&d.push("yyt-btn-secondary"),o==="small"&&d.push("yyt-btn-small");let c=f("button",{className:d.join(" "),attrs:{type:"button",disabled:a?"disabled":null,title:i}}),u=null;n&&(u=f("span",{className:"yyt-btn-icon-glyph",text:n}),c.appendChild(u));let y=f("span",{text:r});c.appendChild(y);let p={...De({id:e,kind:"button",el:c,style:t.style,className:t.className,attrs:t.attrs}),el:c,setLabel(g){y.textContent=String(g||"")},setIcon(g){u&&(u.textContent=String(g||""))},setDisabled(g){g?c.setAttribute("disabled","disabled"):c.removeAttribute("disabled")},isDisabled(){return c.hasAttribute("disabled")},get(){return y.textContent},set(g){this.setLabel(g)}};return c.addEventListener("click",g=>{if(!c.hasAttribute("disabled")){if(typeof l=="function")try{l(g,p)}catch(m){console.error("[button] onClick \u5F02\u5E38",m)}p._emitter.emit("click",g)}}),p}var $p=O(()=>{mt()});function me(t={}){let{id:e=null,placeholder:r="",value:n="",type:s="text",disabled:o=!1,maxLength:a=null,onInput:i=null,onChange:l=null}=t,d=f("input",{className:"yyt-input",attrs:{type:s,placeholder:r,disabled:o?"disabled":null,maxlength:a!=null?String(a):null}});d.value=n==null?"":String(n);let c={...De({id:e,kind:"textInput",el:d,style:t.style,className:t.className,attrs:t.attrs}),el:d,get(){return d.value},set(u,{silent:y=!1}={}){d.value=u==null?"":String(u),y||c._emitter.emit("change",d.value)},setPlaceholder(u){d.placeholder=u==null?"":String(u)},setDisabled(u){d.disabled=!!u},focus(){d.focus()},select(){d.select()}};return d.addEventListener("input",()=>{if(typeof i=="function")try{i(d.value,c)}catch(u){console.error("[textInput] onInput \u5F02\u5E38",u)}c._emitter.emit("input",d.value)}),d.addEventListener("change",()=>{if(typeof l=="function")try{l(d.value,c)}catch(u){console.error("[textInput] onChange \u5F02\u5E38",u)}c._emitter.emit("change",d.value)}),d.addEventListener("blur",()=>c._emitter.emit("blur",d.value)),c}var Op=O(()=>{mt()});function Ee(t={}){let{id:e=null,options:r=[],value:n="",placeholder:s=null,disabled:o=!1,onChange:a=null}=t,i=f("select",{className:"yyt-select",attrs:{disabled:o?"disabled":null}});function l(c,u){if(i.innerHTML="",s!==null){let y=f("option",{text:s,attrs:{value:"",disabled:"disabled",selected:u?null:"selected"}});i.appendChild(y)}for(let y of c){let p=f("option",{text:y.label??String(y.value),attrs:{value:String(y.value),selected:String(y.value)===String(u)?"selected":null,disabled:y.disabled?"disabled":null}});i.appendChild(p)}}l(r,n);let d={...De({id:e,kind:"select",el:i,style:t.style,className:t.className,attrs:t.attrs}),el:i,get(){return i.value},set(c,{silent:u=!1}={}){i.value=c==null?"":String(c),u||d._emitter.emit("change",i.value)},setOptions(c,u){l(c||[],u??i.value)},setDisabled(c){i.disabled=!!c}};return i.addEventListener("change",()=>{if(typeof a=="function")try{a(i.value,d)}catch(c){typeof console<"u"&&console.error&&console.error("[selectInput] onChange \u5F02\u5E38",c)}d._emitter.emit("change",i.value)}),d}var Lp=O(()=>{mt()});function Ye(t={}){let{id:e=null,label:r="",hint:n="",checked:s=!1,disabled:o=!1,onChange:a=null}=t,i=f("label",{className:"yyt-toggle-label"});r&&i.appendChild(f("span",{text:r})),n&&i.appendChild(f("span",{className:"yyt-toggle-hint",text:n}));let l=f("input",{attrs:{type:"checkbox",disabled:o?"disabled":null}});l.checked=!!s;let d=f("span",{className:"yyt-toggle-slider"}),c=f("label",{className:"yyt-toggle"});c.appendChild(l),c.appendChild(d);let u=f("div",{className:"yyt-toggle-row"});u.appendChild(i),u.appendChild(c),i.addEventListener("click",p=>{p.preventDefault(),!l.disabled&&(l.checked=!l.checked,l.dispatchEvent(new Event("change",{bubbles:!0})))});let y={...De({id:e,kind:"toggle",el:u,style:t.style,className:t.className,attrs:t.attrs}),el:u,get(){return!!l.checked},set(p,{silent:g=!1}={}){l.checked=!!p,g||y._emitter.emit("change",!!p)},setDisabled(p){l.disabled=!!p}};return l.addEventListener("change",()=>{let p=!!l.checked;if(typeof a=="function")try{a(p,y)}catch(g){console.error("[toggle] onChange \u5F02\u5E38",g)}y._emitter.emit("change",p)}),y}var Dp=O(()=>{mt()});var Bp=O(()=>{mt()});var zp=O(()=>{mt()});function Dt(t={}){let{id:e=null,label:r="",hint:n="",control:s=null,inline:o=!1}=t,a=f("div",{className:"yyt-form-group",style:o?{flexDirection:"row",alignItems:"center",gap:"12px"}:null});r&&a.appendChild(f("label",{text:r,style:o?{flex:"0 0 auto",minWidth:"120px"}:null}));let i=f("div",{style:o?{flex:"1",minWidth:"0"}:null});s&&V(i,s),a.appendChild(i),n&&a.appendChild(f("div",{className:"yyt-form-hint",text:n}));let l=s?[s]:[];return{...De({id:e,kind:"formRow",el:a,style:t.style,className:t.className,attrs:t.attrs}),el:a,_children:l,get(){return s?.get?.()},set(d,c){s?.set?.(d,c)},setControl(d){i.innerHTML="",l.length=0,d&&(V(i,d),l.push(d))}}}var Kp=O(()=>{mt()});function Jl(t={}){let{id:e=null,icon:r=null,name:n="",desc:s="",active:o=!1,disabled:a=!1,actions:i=[],onClick:l=null}=t,d=["yyt-list-row"];o&&d.push("yyt-list-row-active"),a&&d.push("yyt-list-row-disabled");let c=f("div",{className:d.join(" "),style:a?{opacity:"0.5",pointerEvents:"none"}:null});r&&c.appendChild(f("div",{className:"yyt-list-row-icon",text:r}));let u=f("div",{className:"yyt-list-row-main"}),y=f("div",{className:"yyt-list-row-name",text:n});u.appendChild(y);let p=null;s&&(p=f("div",{className:"yyt-list-row-desc",text:s}),u.appendChild(p)),c.appendChild(u);let g=null;if(i&&i.length){g=f("div",{className:"yyt-list-row-actions"});for(let h of i)V(g,h);c.appendChild(g)}typeof l=="function"&&(c.style.cursor="pointer",c.addEventListener("click",h=>{h.target.closest(".yyt-list-row-actions")||(l(h,m),m._emitter.emit("click",h))}));let m={...De({id:e,kind:"listRow",el:c,style:t.style,className:t.className,attrs:t.attrs}),el:c,_children:i||[],setName(h){y.textContent=h==null?"":String(h)},setDesc(h){if(p)p.textContent=h==null?"":String(h);else{if(!h)return;p=f("div",{className:"yyt-list-row-desc",text:h}),u.appendChild(p)}},setActive(h){h?c.classList.add("yyt-list-row-active"):c.classList.remove("yyt-list-row-active")},setDisabled(h){h?(c.classList.add("yyt-list-row-disabled"),c.style.opacity="0.5",c.style.pointerEvents="none"):(c.classList.remove("yyt-list-row-disabled"),c.style.opacity="",c.style.pointerEvents="")}};return m}var jp=O(()=>{mt()});function rr(t={}){let{id:e=null,heading:r="",icon:n=null,actions:s=[],content:o=[]}=t,a=f("div",{className:"yyt-flow-section"}),i=null,l=null,d=null;if(r||n||s&&s.length){if(i=f("div",{className:"yyt-flow-heading"}),n&&(l=f("span",{className:"yyt-flow-heading-icon"}),V(l,n),i.appendChild(l)),r&&i.appendChild(f("span",{text:r})),s&&s.length){d=f("div",{className:"yyt-flow-heading-action"});for(let p of s)V(d,p);i.appendChild(d)}a.appendChild(i)}let c=f("div",{className:"yyt-flow-content"}),u=[];for(let p of o||[])p&&(V(c,p),u.push(p));for(let p of s||[])p&&typeof p=="object"&&p.el&&u.push(p);return a.appendChild(c),{...De({id:e,kind:"flowSection",el:a,style:t.style,className:t.className,attrs:t.attrs}),el:a,_children:u,appendContent(p){p&&(V(c,p),p&&typeof p=="object"&&p.el&&u.push(p))},clearContent(){c.innerHTML="";let p=u.filter(g=>(s||[]).includes(g));u.length=0;for(let g of p)u.push(g)},setHeading(p){if(!i)return;let g=i.querySelector("span:not(.yyt-flow-heading-icon):not(.yyt-flow-heading-action)");g&&(g.textContent=p==null?"":String(p))},setIcon(p){l&&(l.textContent=p==null?"":String(p))}}}var Up=O(()=>{mt()});function Wa(){try{if(window.parent&&window.parent!==window&&window.parent.document)return window.parent.document}catch{}return document}function Xl({title:t,width:e,wide:r}){let n=`yyt-ctrl-dialog-${++Pw}`,s=f("div",{className:"yyt-dialog-overlay",attrs:{"data-dialog-id":n}}),o={};e&&e!=="380px"&&(o.width=e),o.maxHeight="calc(100vh - 32px)";let a=f("div",{className:`yyt-dialog${r?" yyt-dialog-wide":""}`,style:o}),i=f("div",{className:"yyt-dialog-header"});i.appendChild(f("span",{className:"yyt-dialog-title",text:t||""}));let l=f("button",{className:"yyt-dialog-close",attrs:{type:"button","aria-label":"close"},html:'<i class="fa-solid fa-times"></i>'});i.appendChild(l),a.appendChild(i);let d=f("div",{className:"yyt-dialog-body"});a.appendChild(d);let c=f("div",{className:"yyt-dialog-footer"});return a.appendChild(c),s.appendChild(a),{overlay:s,body:d,footer:c,closeBtn:l,id:n}}function Ql(t){let e=Wa();return e?.body?(e.body.appendChild(t),!0):!1}function Zl(t){if(t?.parentNode)try{t.parentNode.removeChild(t)}catch{}}function Nw(t={}){let{title:e="\u8BF7\u786E\u8BA4",message:r="",confirmText:n="\u786E\u5B9A",cancelText:s="\u53D6\u6D88",danger:o=!1,width:a="380px"}=t;return new Promise(i=>{let{overlay:l,body:d,footer:c,closeBtn:u}=Xl({title:e,width:a,wide:!1}),y=(Wa()||document).activeElement,p=f("div",{style:{color:"var(--yyt-text-secondary)",fontSize:"13px",lineHeight:"1.6"},text:r});d.appendChild(p);let g=f("button",{className:"yyt-btn yyt-btn-secondary",attrs:{type:"button"},text:s}),m=f("button",{className:`yyt-btn ${o?"yyt-btn-danger":"yyt-btn-primary"}`,attrs:{type:"button"},text:n});c.appendChild(g),c.appendChild(m);let h=!1,b=w=>{if(!h){h=!0,Zl(l);try{y?.focus()}catch{}i(w)}};if(m.addEventListener("click",()=>b(!0)),g.addEventListener("click",()=>b(!1)),u.addEventListener("click",()=>b(!1)),l.addEventListener("click",w=>{w.target===l&&b(!1)}),l.addEventListener("keydown",w=>{w.key==="Escape"?(w.stopPropagation(),b(!1)):w.key==="Enter"&&(w.stopPropagation(),b(!0))}),!Ql(l)){i(!1);return}(o?g:m).focus()})}function $w(t={}){let{title:e="\u8F93\u5165",message:r="",defaultValue:n="",placeholder:s="",confirmText:o="\u786E\u5B9A",cancelText:a="\u53D6\u6D88",validate:i=null,width:l="380px"}=t;return new Promise(d=>{let{overlay:c,body:u,footer:y,closeBtn:p}=Xl({title:e,width:l,wide:!1}),g=(Wa()||document).activeElement;r&&u.appendChild(f("div",{style:{color:"var(--yyt-text-secondary)",fontSize:"13px",lineHeight:"1.6",marginBottom:"8px"},text:r}));let m=f("input",{className:"yyt-input",attrs:{type:"text",placeholder:s}});m.value=String(n||""),u.appendChild(m);let h=f("div",{style:{color:"var(--yyt-danger, #f87171)",fontSize:"12px",marginTop:"6px",minHeight:"14px"}});u.appendChild(h);let b=f("button",{className:"yyt-btn yyt-btn-secondary",attrs:{type:"button"},text:a}),w=f("button",{className:"yyt-btn yyt-btn-primary",attrs:{type:"button"},text:o});y.appendChild(b),y.appendChild(w);let S=!1,_=v=>{if(!S){S=!0,Zl(c);try{g?.focus()}catch{}d(v)}},k=()=>{let v=m.value.trim();if(typeof i=="function"){let C=i(v);if(C){h.textContent=C,m.focus();return}}_(v||null)};if(w.addEventListener("click",k),b.addEventListener("click",()=>_(null)),p.addEventListener("click",()=>_(null)),c.addEventListener("click",v=>{v.target===c&&_(null)}),m.addEventListener("keydown",v=>{v.key==="Enter"&&(v.stopPropagation(),k())}),c.addEventListener("keydown",v=>{v.key==="Escape"&&(v.stopPropagation(),_(null))}),!Ql(c)){d(null);return}m.focus(),m.select()})}function Ow(t={}){let{title:e="",body:r=null,buttons:n=[],width:s="480px",wide:o=!1,onMounted:a=null}=t,{overlay:i,body:l,footer:d,closeBtn:c}=Xl({title:e,width:s,wide:o}),u=(Wa()||document).activeElement;r&&V(l,r);let y=!1,p,g=new Promise(h=>{p=h}),m=h=>{if(!y){y=!0,Zl(i);try{u?.focus()}catch{}p(h)}};for(let h of n){let b=h.variant==="primary"?"yyt-btn-primary":h.variant==="danger"?"yyt-btn-danger":"yyt-btn-secondary",w=f("button",{className:`yyt-btn ${b}`,attrs:{type:"button"},text:h.label||""});w.addEventListener("click",()=>{try{h.onClick?.(m,l)}catch(S){Mw.error("button onClick error",S),m(null)}}),d.appendChild(w)}if(c.addEventListener("click",()=>m(null)),i.addEventListener("click",h=>{h.target===i&&m(null)}),i.addEventListener("keydown",h=>{h.key==="Escape"&&(h.stopPropagation(),m(null))}),!Ql(i))p(null);else if(typeof a=="function")try{a({overlay:i,body:l,close:m})}catch{}return{el:i,body:l,close:m,result:g}}var Mw,Pw,ke,Ro=O(()=>{mt();Y();Mw=I.createScope("Dialog"),Pw=0;ke={confirm:Nw,prompt:$w,custom:Ow}});function ec(t={}){let{id:e=null,items:r=[],align:n="start",gap:s="8px",wrap:o=!0}=t,i=f("div",{className:"yyt-toolbar",style:{display:"flex",alignItems:"center",justifyContent:{start:"flex-start",end:"flex-end",center:"center","space-between":"space-between"}[n]||"flex-start",gap:s,flexWrap:o?"wrap":"nowrap"}}),l=[];for(let d of r)d&&(V(i,d),l.push(d));return{...De({id:e,kind:"toolbar",el:i,style:t.style,className:t.className,attrs:t.attrs}),el:i,_children:l,addItem(d){d&&(V(i,d),l.push(d))},clear(){for(;i.firstChild;)i.removeChild(i.firstChild);for(let d of l)try{d?.destroy?.()}catch{}l.length=0}}}var Fp=O(()=>{mt()});function tc(t={}){let{id:e=null,name:r="",desc:n="",active:s=!1,disabled:o=!1,builtin:a=!1,readonly:i=!1,metaChips:l=[],actions:d=[],onClick:c=null}=t,u=a||i,y=["yyt-list-row","yyt-preset-list-item"];s&&y.push("yyt-list-row-active"),o&&y.push("yyt-list-row-disabled"),u&&y.push("yyt-preset-list-item-readonly");let p=f("div",{className:y.join(" "),style:o?{opacity:"0.5",pointerEvents:"none"}:null}),g=f("span",{className:"yyt-preset-dot",style:{width:"8px",height:"8px",borderRadius:"50%",flexShrink:"0",marginRight:"8px",background:s?"var(--yyt-accent, #7bb7ff)":"transparent",border:s?"none":"1px solid var(--yyt-border, rgba(255,255,255,0.15))",transition:"background 0.15s ease"}});p.appendChild(g);let m=f("div",{className:"yyt-list-row-main",style:{flex:"1",minWidth:"0"}}),h=f("div",{style:{display:"flex",alignItems:"center",gap:"8px"}}),b=f("div",{className:"yyt-list-row-name",text:r,style:{fontWeight:"600"}});h.appendChild(b),a&&h.appendChild(f("span",{className:"yyt-preset-badge yyt-preset-badge-builtin",text:"\u5185\u7F6E",style:{fontSize:"10px",padding:"2px 6px",borderRadius:"999px",background:"var(--yyt-surface-3, rgba(255,255,255,0.06))",color:"var(--yyt-text-muted, rgba(255,255,255,0.5))",border:"1px solid var(--yyt-border, rgba(255,255,255,0.1))"}})),m.appendChild(h);let w=null;n&&(w=f("div",{className:"yyt-list-row-desc",text:n}),m.appendChild(w)),p.appendChild(m);let S=null;if(Array.isArray(l)&&l.length){S=f("div",{className:"yyt-preset-meta-chips",style:{display:"flex",gap:"6px",flexWrap:"wrap"}});for(let C of l)C&&S.appendChild(f("span",{className:"yyt-preset-meta-chip",text:String(C),style:{fontSize:"11px",padding:"2px 8px",borderRadius:"999px",background:"var(--yyt-surface-2, rgba(255,255,255,0.04))",color:"var(--yyt-text-secondary, rgba(255,255,255,0.6))",border:"1px solid var(--yyt-border-soft, rgba(255,255,255,0.04))"}}));p.appendChild(S)}let _=null,k=u?d.filter(C=>C?._kind!=="button"||!C._destructive):d;if(k&&k.length){_=f("div",{className:"yyt-list-row-actions"});for(let C of k)V(_,C);p.appendChild(_)}typeof c=="function"&&(p.style.cursor="pointer",p.addEventListener("click",C=>{C.target.closest(".yyt-list-row-actions")||(c(C,v),v._emitter.emit("click",C))}));let v={...De({id:e,kind:"presetListItem",el:p,style:t.style,className:t.className,attrs:t.attrs}),el:p,_children:d||[],setActive(C){C?p.classList.add("yyt-list-row-active"):p.classList.remove("yyt-list-row-active"),g.style.background=C?"var(--yyt-accent, #7bb7ff)":"transparent",g.style.border=C?"none":"1px solid var(--yyt-border, rgba(255,255,255,0.15))"},setName(C){b.textContent=C==null?"":String(C)},setDesc(C){if(w)w.textContent=C==null?"":String(C);else{if(!C)return;w=f("div",{className:"yyt-list-row-desc",text:C}),m.appendChild(w)}},setDisabled(C){C?(p.classList.add("yyt-list-row-disabled"),p.style.opacity="0.5",p.style.pointerEvents="none"):(p.classList.remove("yyt-list-row-disabled"),p.style.opacity="",p.style.pointerEvents="")}};return v}var Wp=O(()=>{mt()});function rc(t={}){let{id:e=null,values:r=[],placeholder:n="\u8F93\u5165\u540E\u56DE\u8F66\u6DFB\u52A0",suggestions:s=null,allowDuplicates:o=!1,maxChips:a=0,chipVariant:i="default",onChange:l=null,onAdd:d=null,onRemove:c=null}=t,u=s&&s.length?`yyt-chip-dl-${++Lw}`:null,y=f("div",{className:"yyt-chip-group",style:{display:"flex",flexWrap:"wrap",gap:"6px",padding:"6px 8px",borderRadius:"var(--yyt-radius-sm, 6px)",border:"1px solid var(--yyt-control-border, rgba(255,255,255,0.08))",background:"var(--yyt-control-bg, transparent)",minHeight:"36px",alignItems:"center"}}),p=[],g={type:"text",placeholder:n,autocomplete:"off"};u&&(g.list=u);let m=f("input",{className:"yyt-chip-input",attrs:g,style:{flex:"1 1 auto",minWidth:"120px",border:"none",outline:"none",background:"transparent",color:"var(--yyt-text, inherit)",fontSize:"12px",padding:"4px 0"}}),h=null;if(u){h=f("datalist",{attrs:{id:u}});for(let N of s)h.appendChild(f("option",{attrs:{value:String(N)}}));y.appendChild(h)}function b(){return i==="danger"?"rgba(248,113,113,0.12)":i==="soft"?"var(--yyt-surface-2, rgba(255,255,255,0.04))":"var(--yyt-accent-soft, rgba(123,183,255,0.15))"}function w(){return i==="danger"?"rgba(248,113,113,0.25)":"var(--yyt-border, rgba(255,255,255,0.1))"}function S(){return i==="danger"?"#f87171":"var(--yyt-text, inherit)"}function _(N){let E=f("span",{className:"yyt-chip",style:{display:"inline-flex",alignItems:"center",gap:"4px",padding:"3px 4px 3px 10px",borderRadius:"999px",background:b(),border:`1px solid ${w()}`,color:S(),fontSize:"11px",fontWeight:"500"}});E.appendChild(f("span",{text:N,style:{lineHeight:"1"}}));let P=f("button",{attrs:{type:"button","aria-label":"remove"},text:"\xD7",style:{border:"none",background:"transparent",color:"inherit",cursor:"pointer",padding:"0 4px",fontSize:"14px",lineHeight:"1",opacity:"0.7"}});return P.addEventListener("click",U=>{U.stopPropagation(),C(N)}),P.addEventListener("mouseenter",()=>{P.style.opacity="1"}),P.addEventListener("mouseleave",()=>{P.style.opacity="0.7"}),E.appendChild(P),E}function k(){let N=[];for(let E of y.children)E===m||E===h||N.push(E);for(let E of N)y.removeChild(E);for(let E of p)y.insertBefore(_(E),m)}function v(N){let E=String(N||"").trim();if(!E||!o&&p.includes(E)||a>0&&p.length>=a)return!1;p.push(E),k();try{d?.(E,p.slice())}catch(P){console.error("[chipGroup] onAdd \u5F02\u5E38",P)}try{l?.(p.slice())}catch(P){console.error("[chipGroup] onChange \u5F02\u5E38",P)}return L._emitter.emit("change",p.slice()),!0}function C(N){let E=p.indexOf(N);if(E<0)return!1;p.splice(E,1),k();try{c?.(N,p.slice())}catch(P){console.error("[chipGroup] onRemove \u5F02\u5E38",P)}try{l?.(p.slice())}catch(P){console.error("[chipGroup] onChange \u5F02\u5E38",P)}return L._emitter.emit("change",p.slice()),!0}function R(){if(p.length!==0){p=[],k();try{l?.([])}catch(N){console.error("[chipGroup] onChange \u5F02\u5E38",N)}L._emitter.emit("change",[])}}for(let N of r){let E=String(N||"").trim();E&&(!o&&p.includes(E)||p.push(E))}y.appendChild(m),k(),m.addEventListener("keydown",N=>{if(N.key==="Enter"||N.key===","){N.preventDefault();let E=m.value.trim();E&&v(E)&&(m.value="")}else N.key==="Backspace"&&!m.value&&p.length&&C(p[p.length-1])}),m.addEventListener("blur",()=>{let N=m.value.trim();N&&v(N)&&(m.value="")}),y.addEventListener("click",N=>{N.target===y&&m.focus()});let L={...De({id:e,kind:"chipGroup",el:y,style:t.style,className:t.className,attrs:t.attrs}),el:y,get(){return p.slice()},set(N){p=[];for(let E of Array.isArray(N)?N:[]){let P=String(E||"").trim();P&&(!o&&p.includes(P)||p.push(P))}k();try{l?.(p.slice())}catch(E){console.error("[chipGroup] onChange \u5F02\u5E38",E)}L._emitter.emit("change",p.slice())},addChip:v,removeChip:C,clear:R,setSuggestions(N){if(h){for(;h.firstChild;)h.removeChild(h.firstChild);for(let E of N||[])h.appendChild(f("option",{attrs:{value:String(E)}}))}}};return L}var Lw,Hp=O(()=>{mt();Lw=0});var Gp=O(()=>{mt()});var nr=O(()=>{$p();Op();Lp();Dp();Bp();zp();Kp();jp();Up();Ro();Fp();Wp();Hp();Gp();mt()});function qp(t){return t?t.length!==void 0&&typeof t.get=="function"?t.get(0):t:null}function Dw(t){return typeof t=="string"&&t.startsWith("builtin_")}function qr(t={}){let{id:e,kind:r="generic",panelTitle:n="\u9884\u8BBE\u7BA1\u7406",panelHint:s="",store:o,renderEditor:a,renderExtras:i=null,renderListItemMeta:l=null,hasSwitchToButton:d=!1,onSwitchTo:c=null}=t;if(!o||typeof o.listPresets!="function")throw new Error("createPresetManagerPanel: store \u7F3A\u5C11\u5FC5\u8981\u7684 listPresets \u65B9\u6CD5");if(typeof a!="function")throw new Error("createPresetManagerPanel: \u5FC5\u987B\u63D0\u4F9B renderEditor");return{id:e,kind:r,renderTo(u){let y=qp(u);if(!y)return;if(y._yytPresetPanelCleanup)try{y._yytPresetPanelCleanup()}catch{}let p=()=>this.renderTo(u),g=o.listPresets(),m=typeof o.getCurrentPresetId=="function"?o.getCurrentPresetId():"",h=f("div",{className:"yyt-preset-manager-panel",style:{display:"flex",flexDirection:"column",gap:"14px"}});if(n||s){let N=f("div",{style:{display:"flex",flexDirection:"column",gap:"4px"}});n&&N.appendChild(f("div",{text:n,style:{fontSize:"15px",fontWeight:"700",color:"var(--yyt-text)"}})),s&&N.appendChild(f("div",{text:s,style:{fontSize:"12px",color:"var(--yyt-text-secondary)",lineHeight:"1.6"}})),h.appendChild(N)}let b=[],w=f("div",{style:{display:"flex",flexDirection:"column"}});if(g.length===0)w.appendChild(f("div",{text:'\u6682\u65E0\u9884\u8BBE\u3002\u70B9\u51FB\u4E0B\u65B9"\u65B0\u5EFA"\u521B\u5EFA\u7B2C\u4E00\u4E2A\u9884\u8BBE\u3002',style:{fontSize:"12px",color:"var(--yyt-text-muted)",padding:"12px 0",textAlign:"center"}}));else for(let N of g){let E=N.id===m,P=Dw(N.id),U=typeof l=="function"?l(N)||[]:[],q=[];d&&typeof c=="function"&&q.push(X({label:E?"\u2713 \u5DF2\u52A0\u8F7D":"\u52A0\u8F7D",size:"small",variant:E?"ghost":"primary",disabled:E,onClick:ie=>{ie.stopPropagation();try{c(N.id)}catch(Q){On.warn("onSwitchTo \u5F02\u5E38",{err:Q})}p()}})),q.push(X({label:"\u590D\u5236",size:"small",variant:"ghost",title:"\u590D\u5236\u4E3A\u7528\u6237\u9884\u8BBE",onClick:async ie=>{ie.stopPropagation();try{let Q=o.duplicatePreset(N.id);Q?.id&&typeof o.setCurrentPresetId=="function"&&o.setCurrentPresetId(Q.id),p()}catch(Q){On.warn("duplicate \u5F02\u5E38",{err:Q})}}})),P||(q.push(X({label:"\u270E",size:"small",variant:"ghost",title:"\u91CD\u547D\u540D",onClick:async ie=>{ie.stopPropagation();let Q=await ke.prompt({title:"\u91CD\u547D\u540D\u9884\u8BBE",defaultValue:N.name,placeholder:"\u9884\u8BBE\u540D",validate:we=>we?null:"\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"});Q&&Q!==N.name&&(o.renamePreset(N.id,Q),p())}})),q.push(X({label:"\xD7",size:"small",variant:"ghost",title:"\u5220\u9664",onClick:async ie=>{ie.stopPropagation(),await ke.confirm({title:"\u5220\u9664\u9884\u8BBE",message:`\u786E\u8BA4\u5220\u9664\u300C${N.name}\u300D\uFF1F\u6B64\u64CD\u4F5C\u4E0D\u53EF\u64A4\u9500\u3002`,confirmText:"\u5220\u9664",danger:!0})&&(o.deletePreset(N.id),p())}})));let te=tc({id:N.id,name:N.name,desc:N.description,active:E,builtin:P,metaChips:U,actions:q,onClick:()=>{typeof o.setCurrentPresetId=="function"&&o.setCurrentPresetId(N.id),p()}});w.appendChild(te.el)}let S=X({label:"+ \u65B0\u5EFA\u9884\u8BBE",size:"small",variant:"primary",onClick:async()=>{let N=await ke.prompt({title:"\u65B0\u5EFA\u9884\u8BBE",placeholder:"\u9884\u8BBE\u540D\uFF08\u5FC5\u586B\uFF09",validate:E=>E?null:"\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"});if(N)try{let E=o.createPreset({name:N});E?.id&&typeof o.setCurrentPresetId=="function"&&o.setCurrentPresetId(E.id),p()}catch(E){On.warn("createPreset \u5931\u8D25",{err:E}),await ke.confirm({title:"\u521B\u5EFA\u5931\u8D25",message:String(E?.message||E),confirmText:"\u786E\u5B9A"})}}}),_=rr({heading:"\u9884\u8BBE\u9009\u62E9",icon:"\u{1F4CB}",actions:[S.el],content:[w]});b.push(_),h.appendChild(_.el);let k=m?g.find(N=>N.id===m):null;if(k){let N=null;try{N=a(k,{readonly:!1,onChange:P=>{if(!(!P||typeof P!="object"))try{o.updatePreset(k.id,P)}catch(U){On.warn("updatePreset \u5931\u8D25",{err:U})}},refresh:p})}catch(P){On.error("renderEditor \u5F02\u5E38",{err:P}),N=f("div",{text:`\u7F16\u8F91\u5668\u6E32\u67D3\u5F02\u5E38\uFF1A${P?.message||P}`,style:{color:"var(--yyt-danger, #f87171)",fontSize:"12px"}})}let E=rr({heading:`\u7F16\u8F91\u300C${k.name}\u300D`,icon:"\u270E",content:[N].filter(Boolean)});if(b.push(E),h.appendChild(E.el),typeof i=="function"){let P=null;try{P=i(k,{refresh:p})}catch(U){On.warn("renderExtras \u5F02\u5E38",{err:U})}if(P){let U=rr({heading:"\u9644\u52A0",icon:"\u{1F527}",content:[P]});b.push(U),h.appendChild(U.el)}}}else g.length>0&&h.appendChild(f("div",{text:"\u8BF7\u5728\u4E0A\u65B9\u5217\u8868\u9009\u62E9\u4E00\u4E2A\u9884\u8BBE\u4EE5\u7F16\u8F91",style:{fontSize:"12px",color:"var(--yyt-text-muted)",padding:"16px",textAlign:"center",border:"1px dashed var(--yyt-border, rgba(255,255,255,0.08))",borderRadius:"var(--yyt-radius-sm, 6px)"}}));let v=X({label:"\u2B06 \u5BFC\u5165",size:"small",variant:"ghost",onClick:async()=>{await Bw(o,p)}}),C=X({label:"\u2B07 \u5BFC\u51FA",size:"small",variant:"ghost",onClick:()=>{zw(o,r)}}),R=X({label:"\u6E05\u7A7A\u5168\u90E8",size:"small",variant:"ghost",onClick:async()=>{await ke.confirm({title:"\u6E05\u7A7A\u6240\u6709\u9884\u8BBE",message:"\u6B64\u64CD\u4F5C\u4F1A\u5220\u9664\u6240\u6709\u7528\u6237\u9884\u8BBE\uFF08\u5185\u7F6E\u9884\u8BBE\u4E0D\u53D7\u5F71\u54CD\uFF09\uFF0C\u4E0D\u53EF\u64A4\u9500\u3002",confirmText:"\u6E05\u7A7A",danger:!0})&&typeof o.resetAll=="function"&&(o.resetAll(),p())}}),L=ec({items:[v,C,R],align:"end",gap:"8px"});h.appendChild(L.el),y.innerHTML="",y.appendChild(h),y._yytPresetPanelCleanup=()=>{for(let N of b)try{N.destroy()}catch{}delete y._yytPresetPanelCleanup}},destroy(u){let y=qp(u);if(y?._yytPresetPanelCleanup)try{y._yytPresetPanelCleanup()}catch{}},getStyles(){return""}}}async function Bw(t,e){if(typeof t.importPresets!="function"){await ke.confirm({title:"\u4E0D\u652F\u6301\u5BFC\u5165",message:"\u5F53\u524D\u9884\u8BBE\u7C7B\u578B\u4E0D\u652F\u6301\u5BFC\u5165\u3002",confirmText:"\u786E\u5B9A"});return}let r=f("textarea",{className:"yyt-textarea",attrs:{placeholder:"\u7C98\u8D34\u5BFC\u51FA\u7684 JSON"},style:{width:"100%",minHeight:"180px",fontSize:"12px",fontFamily:"monospace"}}),n=ke.custom({title:"\u5BFC\u5165\u9884\u8BBE",width:"520px",body:r,buttons:[{label:"\u53D6\u6D88",variant:"ghost",onClick:o=>o(null)},{label:"\u4ECE\u6587\u4EF6\u2026",variant:"ghost",onClick:()=>{let o=f("input",{attrs:{type:"file",accept:"application/json,.json"}});o.addEventListener("change",()=>{let a=o.files?.[0];if(!a)return;let i=new FileReader;i.onload=()=>{r.value=String(i.result||""),r.focus()},i.readAsText(a)}),o.click()}},{label:"\u5BFC\u5165",variant:"primary",onClick:async o=>{let a=r.value.trim();if(!a){o(null);return}let i;try{i=JSON.parse(a)}catch(l){await ke.confirm({title:"JSON \u89E3\u6790\u5931\u8D25",message:String(l?.message||l),confirmText:"\u786E\u5B9A"});return}try{let l=t.importPresets(i);o(l)}catch(l){await ke.confirm({title:"\u5BFC\u5165\u5931\u8D25",message:String(l?.message||l),confirmText:"\u786E\u5B9A"})}}}]});setTimeout(()=>r.focus(),0);let s=await n.result;s&&(s.added>0||s.imported>0)&&e()}function zw(t,e){if(typeof t.exportAll!="function"){ke.confirm({title:"\u4E0D\u652F\u6301\u5BFC\u51FA",message:"\u5F53\u524D\u9884\u8BBE\u7C7B\u578B\u4E0D\u652F\u6301\u5BFC\u51FA\u3002",confirmText:"\u786E\u5B9A"});return}let r=t.exportAll(),n=JSON.stringify(r,null,2),s=f("textarea",{className:"yyt-textarea",style:{width:"100%",minHeight:"220px",fontSize:"12px",fontFamily:"monospace"}});s.value=n,s.readOnly=!0,ke.custom({title:`\u5BFC\u51FA ${e||""} \u9884\u8BBE`,width:"600px",body:s,buttons:[{label:"\u5173\u95ED",variant:"ghost",onClick:o=>o(null)},{label:"\u590D\u5236\u5230\u526A\u8D34\u677F",variant:"ghost",onClick:async()=>{try{await navigator.clipboard.writeText(n)}catch{s.select();try{document.execCommand("copy")}catch{}}}},{label:"\u4E0B\u8F7D JSON",variant:"primary",onClick:()=>{try{let o=new Blob([n],{type:"application/json"}),a=URL.createObjectURL(o),i=f("a",{attrs:{href:a,download:`${e||"preset"}_${Date.now()}.json`}});document.body.appendChild(i),i.click(),setTimeout(()=>{try{document.body.removeChild(i)}catch{}try{URL.revokeObjectURL(a)}catch{}},100)}catch(o){On.warn("\u4E0B\u8F7D\u5931\u8D25",{err:o})}}}]})}var On,Mo=O(()=>{nr();Y();On=I.createScope("PresetManagerBase")});var Vp={};ue(Vp,{ApiPresetPanel:()=>Yp,default:()=>Fw});function jw(t,{onChange:e,readonly:r}){let n=f("div",{style:{display:"flex",flexDirection:"column",gap:"12px"}}),s=t.apiConfig||{};V(n,Dt({label:"\u63CF\u8FF0",control:me({value:t.description||"",placeholder:"\u53EF\u9009 \u2014 \u5907\u6CE8\u7528\u9014",disabled:r,onChange:i=>e({description:i})})})),V(n,Ye({label:"\u4F7F\u7528\u4E3B API",hint:"\u5F00\u542F\u540E\u5FFD\u7565\u4E0B\u65B9 URL/Key/Model\uFF0C\u76F4\u63A5\u590D\u7528 SillyTavern \u4E3B\u8FDE\u63A5",checked:s.useMainApi!==!1,disabled:r,onChange:i=>e({apiConfig:{...s,useMainApi:i}})})),V(n,Ye({label:"\u6D41\u5F0F\u8F93\u51FA\uFF08stream\uFF09",hint:"\u9010\u5B57\u63A5\u6536\u54CD\u5E94",checked:s.stream===!0,disabled:r,onChange:i=>e({apiConfig:{...s,stream:i}})})),V(n,Dt({label:"API URL",control:me({value:s.url||"",placeholder:"https://api.example.com/v1",disabled:r,onChange:i=>e({apiConfig:{...s,url:i}})})})),V(n,Dt({label:"API Key",control:me({value:s.apiKey||"",placeholder:"sk-...",disabled:r,attrs:{type:"password"},onChange:i=>e({apiConfig:{...s,apiKey:i}})})})),V(n,Dt({label:"\u6A21\u578B",control:me({value:s.model||"",placeholder:"gpt-4 / gemini-pro / claude-...",disabled:r,onChange:i=>e({apiConfig:{...s,model:i}})})}));let o=f("div",{style:{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:"10px"}});function a(i,l,d,c="1"){let u=f("div",{style:{display:"flex",flexDirection:"column",gap:"4px"}});u.appendChild(f("label",{text:i,style:{fontSize:"11px",color:"var(--yyt-text-secondary)",fontWeight:"600"}}));let y=f("input",{className:"yyt-input",attrs:{type:"number",step:c,disabled:r?"disabled":null},style:{padding:"6px 10px",fontSize:"12px"}});return y.value=String(s[l]??d),y.addEventListener("change",()=>{let p=Number(y.value);Number.isFinite(p)&&e({apiConfig:{...s,[l]:p}})}),u.appendChild(y),u}return o.appendChild(a("max_tokens","max_tokens",4096,"1")),o.appendChild(a("temperature","temperature",.7,"0.05")),o.appendChild(a("top_p","top_p",.9,"0.05")),V(n,o),n}function Uw(t){let e=t.apiConfig||{},r=[];return e.useMainApi!==!1?r.push("\u4E3B API"):r.push(e.model||"\u81EA\u5B9A\u4E49"),t.starred&&r.push("\u2605"),r}var Yr,Kw,Yp,Fw,Jp=O(()=>{nr();hs();Y();Mo();Yr=I.createScope("ApiPresetPanel"),Kw={listPresets(){return Gr().map(t=>({id:t.name,name:t.name,description:t.description||"",apiConfig:t.apiConfig||{},starred:t.starred===!0,createdAt:t.createdAt,updatedAt:t.updatedAt}))},getPreset(t){if(!t)return null;let e=$n(t);return e?{id:e.name,...e,description:e.description||""}:null},getCurrentPresetId(){return Hl()||""},setCurrentPresetId(t){if(!t)return!1;try{return!!Fa(t)}catch(e){return Yr.warn("switchToPreset \u5931\u8D25",{err:e}),!1}},createPreset(t){let e=String(t?.name||"").trim();if(!e)return Yr.warn("createPreset: name \u7F3A\u5931"),null;let r=ja({name:e,description:t?.description||"",apiConfig:t?.apiConfig||{}});return r?.success?{id:r.preset.name,...r.preset,description:r.preset.description||""}:(Yr.warn("createPreset \u5931\u8D25",{msg:r?.message}),null)},updatePreset(t,e){if(!t)return null;let r=Ul(t,e);return r?.success?{id:r.preset.name,...r.preset,description:r.preset.description||""}:(Yr.warn("updatePreset \u5931\u8D25",{id:t,msg:r?.message}),null)},deletePreset(t){if(!t)return!1;try{let e=Ua(t);return!!(e?.success??e===!0)}catch(e){return Yr.warn("deletePreset \u5931\u8D25",{err:e}),!1}},duplicatePreset(t,e={}){if(!t)return null;let r=e.nameSuffix||"_\u526F\u672C",n=`${t}${r}`;try{let s=Wl(t,n);return s?.success?{id:s.preset.name,...s.preset,description:s.preset.description||""}:null}catch(s){return Yr.warn("duplicatePreset \u5931\u8D25",{err:s}),null}},renamePreset(t,e){if(!t||!e)return null;try{let r=Fl(t,e);return r?.success?{id:r.preset?.name||e,...r.preset,description:r.preset?.description||""}:null}catch(r){return Yr.warn("renamePreset \u5931\u8D25",{err:r}),null}},exportAll(){let t=Gl();try{return{version:1,exportedAt:Date.now(),presets:JSON.parse(t)}}catch{return{version:1,exportedAt:Date.now(),presets:[]}}},importPresets(t){if(!t||typeof t!="object")return{added:0};let e=Array.isArray(t.presets)?t.presets:[t],r=JSON.stringify(e);return{added:ql(r,{overwrite:!1})?.imported||0}},resetAll(){let t=Gr();for(let e of t)try{Ua(e.name)}catch{}}};Yp=qr({id:"apiPresetPanel",kind:"api",panelTitle:"API \u9884\u8BBE",panelHint:'\u7BA1\u7406\u591A\u7EC4 API \u8FDE\u63A5\u914D\u7F6E\u3002\u70B9\u51FB"\u52A0\u8F7D"\u6FC0\u6D3B\u67D0\u4E2A\u9884\u8BBE\u4F5C\u4E3A\u5F53\u524D API\uFF1B\u5176\u4ED6\u5DE5\u5177\u53EF\u5728\u914D\u7F6E\u9762\u677F\u4E2D\u6309\u9884\u8BBE\u540D\u5F15\u7528\u3002',store:Kw,renderEditor:jw,renderListItemMeta:Uw,hasSwitchToButton:!0,onSwitchTo:t=>{try{Fa(t)}catch(e){Yr.warn("switchToPreset",{err:e})}}}),Fw=Yp});function sc(){return`wb_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`}function Jr(){let t=Oe.get(nc);return!t||typeof t!="object"?{}:t}function Ga(t){Oe.set(nc,t)}function Dn(t){return typeof t=="string"&&t.startsWith(Ww)}function Xp(t){return Dn(t)&&Ha.find(e=>e.id===t)||null}function oc(t){if(!Array.isArray(t)){Ha=[];return}Ha=t.map(e=>Vr({...e,id:String(e?.id||"")})).filter(e=>Dn(e.id))}function Vr(t={}){let e=String(t.id||sc()),r=Array.isArray(t.bookList)?t.bookList.map(n=>({bookName:String(n?.bookName||""),enabled:n?.enabled!==!1,entryOverrides:n?.entryOverrides&&typeof n.entryOverrides=="object"?n.entryOverrides:{}})).filter(n=>n.bookName):[];return{id:e,name:String(t.name||"").trim()||"\u672A\u547D\u540D\u9884\u8BBE",description:String(t.description||""),bindingMode:t.bindingMode===yr.CUSTOM?yr.CUSTOM:yr.CHARACTER_CARD,includeDisabled:t.includeDisabled===!0,bookList:r,createdAt:Number.isFinite(t.createdAt)?t.createdAt:Date.now(),updatedAt:Number.isFinite(t.updatedAt)?t.updatedAt:Date.now()}}function Hw(){let t=Jr(),e=new Set,r=[];for(let s of Ha){let o=t[s.id];o?(r.push(Vr(o)),e.add(s.id)):r.push(s)}let n=Object.values(t).map(Vr).filter(s=>!e.has(s.id)).sort((s,o)=>o.updatedAt-s.updatedAt);return r.push(...n),r}function No(t){if(!t)return null;let e=Jr();return e[t]?Vr(e[t]):Dn(t)?Xp(t):null}function ac(){let t=Oe.get(Po);return typeof t=="string"&&t?t:""}function Gw(){let t=ac();return t?No(t):null}function qw(t){if(t&&Dn(t))return Oe.set(Po,t),G.emit(F.PRESET_ACTIVATED,{kind:"worldbook",id:t}),!0;let e=Jr();return t&&!e[t]?(Ln.warn(`setCurrentPresetId \u627E\u4E0D\u5230\u9884\u8BBE: ${t}`),!1):(Oe.set(Po,t||""),G.emit(F.PRESET_ACTIVATED,{kind:"worldbook",id:t}),!0)}function qa(t={}){let e=Vr({...t,id:sc(),createdAt:Date.now(),updatedAt:Date.now()}),r=Jr();return r[e.id]=e,Ga(r),G.emit(F.PRESET_CREATED,{kind:"worldbook",id:e.id}),Ln.info(`\u521B\u5EFA\u9884\u8BBE: ${e.id} (${e.name})`),e}function Qp(t,e={},{silent:r=!1}={}){if(!t)return null;let n=Jr(),s=n[t];if(!s&&Dn(t)&&(s=Xp(t)),!s)return Ln.warn(`updatePreset \u627E\u4E0D\u5230\u9884\u8BBE: ${t}`),null;let o=Vr({...s,...e,id:t,createdAt:s.createdAt,updatedAt:Date.now()});return n[t]=o,Ga(n),r||G.emit(F.PRESET_UPDATED,{kind:"worldbook",id:t}),o}function Yw(t){if(!t)return!1;if(Dn(t))return Ln.warn(`\u62D2\u7EDD\u5220\u9664\u5185\u7F6E\u9884\u8BBE: ${t}`),!1;let e=Jr();return e[t]?(delete e[t],Ga(e),ac()===t&&Oe.set(Po,""),G.emit(F.PRESET_DELETED,{kind:"worldbook",id:t}),Ln.info(`\u5220\u9664\u9884\u8BBE: ${t}`),!0):!1}function Vw(t,{nameSuffix:e=" \u526F\u672C"}={}){let r=No(t);return r?qa({...r,id:void 0,name:`${r.name}${e}`}):null}function Jw(t,e){return Dn(t)?(Ln.warn(`\u62D2\u7EDD\u91CD\u547D\u540D\u5185\u7F6E\u9884\u8BBE: ${t}`),null):Qp(t,{name:String(e||"").trim()||"\u672A\u547D\u540D\u9884\u8BBE"})}function Xw(){return{version:1,exportedAt:Date.now(),presets:Object.values(Jr()).map(Vr)}}function Qw(t){if(!t||typeof t!="object")return{added:0,skipped:0};let e=Array.isArray(t.presets)?t.presets:[],r=Jr(),n=0,s=0;for(let o of e){let a=Vr({...o,id:sc(),createdAt:Date.now(),updatedAt:Date.now()});r[a.id]=a,n+=1}return Ga(r),n>0&&G.emit(F.PRESET_IMPORTED,{kind:"worldbook",count:n}),{added:n,skipped:s}}function Zw(){Oe.set(nc,{}),Oe.set(Po,""),Ln.info("\u5DF2\u6E05\u7A7A\u6240\u6709\u4E16\u754C\u4E66\u9884\u8BBE")}var Ln,nc,Po,yr,Ww,Ha,ht,xs=O(()=>{We();at();Y();Ln=I.createScope("WorldbookPresetStore"),nc="worldbook_presets",Po="worldbook_current_preset",yr=Object.freeze({CHARACTER_CARD:"character_card",CUSTOM:"custom"});Ww="builtin_worldbook_",Ha=[];ht={listPresets:Hw,getPreset:No,getCurrentPresetId:ac,getCurrentPreset:Gw,setCurrentPresetId:qw,createPreset:qa,updatePreset:Qp,deletePreset:Yw,duplicatePreset:Vw,renamePreset:Jw,exportAll:Xw,importPresets:Qw,resetAll:Zw,BINDING_MODES:yr}});function Xr(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window}function Ya(){return Xr()?.SillyTavern||null}function Ie(t){return t==null?"":String(t).trim()}function tv(t){if(!t)return"";let e=[t.content,t.mes,t.message,t.text,t?.data?.content];for(let r of e)if(typeof r=="string"&&r.trim())return r.trim();return""}function rv(t){let e=String(t?.role||"").trim().toLowerCase();return e==="assistant"||e==="ai"?"assistant":e==="system"?"system":e==="user"||t?.is_user===!0?"user":t?.is_system===!0?"system":"assistant"}function ey(t=""){let e=String(t||"").trim();if(!e)return"empty";let r=0;for(let n=0;n<e.length;n+=1)r=(r<<5)-r+e.charCodeAt(n),r|=0;return`fp_${Math.abs(r).toString(36)}`}function ty(t={}){let e=Ie(t.chatId)||"chat_default",r=Ie(t.messageId)||"latest";return`${e}::${r}`}function ry(t={}){let e=ty(t),r=Ie(t.effectiveSwipeId)||"swipe:current",n=Ie(t.assistantContentFingerprint)||"empty";return`${e}::${r}::${n}`}function nv(t={}){let e=ry(t),r=Ie(t.eventType)||"MANUAL",n=Ie(t.traceId)||ny("manual");return`${e}::${r}::${n}`}function ny(t="trace"){return`${t}_${Date.now()}_${Math.random().toString(36).slice(2,8)}`}function sy(){let t=Ya();try{let e=t?.getContext?.()||null;if(Array.isArray(e?.chat))return e.chat}catch{}return Array.isArray(t?.chat)?t.chat:[]}function oy(t=[]){let e=[],r=null,n=null;return t.forEach((s,o)=>{let a=rv(s),i=tv(s);if(!i)return;let l=Ie(s?.messageId??s?.message_id??s?.id??s?.mid??s?.mesid??s?.chat_index??o),d=Ie(s?.swipe_id??s?.swipeId??s?.swipe??""),c={role:a,content:i,sourceId:l,swipeId:d,raw:s,index:o};e.push(c),a==="user"&&(r=c),a==="assistant"&&(n=c)}),{messages:e,lastUserMessage:r,lastAiMessage:n}}function sv(t,e,r){return Ie(e?.chatId??e?.chat_id??t?.chatId??t?.chat_id??t?.this_chid??r?.id??"chat_default")||"chat_default"}async function ic(){let t=Ya();if(!t)return null;try{let e=t.this_chid,r=t.characters||[];if(e>=0&&e<r.length){let n=r[e];return{id:e,name:n?.name||"",description:n?.description||"",personality:n?.personality||"",scenario:n?.scenario||"",firstMes:n?.first_mes||"",mesExample:n?.mes_example||""}}}catch(e){ev.error("\u83B7\u53D6\u89D2\u8272\u4FE1\u606F\u5931\u8D25:",e)}return null}function ov(t="",e=null){let r=String(t||""),n=e?.YouYouToolkit_toolOutputs;return n&&typeof n=="object"&&Object.values(n).forEach(s=>{let o=String(s?.blockText||s?.content||"").trim();o&&r.includes(o)&&(r=r.replace(o,"").trimEnd())}),r.trim()}function av(t,e={}){let r=Array.isArray(t?.messages)?t.messages:[],n=Ie(e.messageId),s=Ie(e.swipeId);if(!n)return t?.lastAiMessage||null;let o=r.filter(i=>i.role==="assistant"),a=o.find(i=>i.sourceId!==n?!1:s?Ie(i.swipeId)===s:!0);return a||o.find(i=>i.sourceId===n)||null}function ay({api:t,stContext:e,character:r,conversation:n,targetAssistantMessage:s,runSource:o="MANUAL"}={}){let a=n?.messages||[],i=n?.lastUserMessage||null,l=Ie(s?.sourceId)||"",d=Ie(s?.swipeId)||"swipe:current",c=s?.content||"",u=ov(c,s?.raw||null),y=ey(c),p=ey(u),g=sv(t,e,r),m=ny(String(o||"manual").toLowerCase()),h=ty({chatId:g,messageId:l}),b=ry({chatId:g,messageId:l,effectiveSwipeId:d,assistantContentFingerprint:p});return{startedAt:Date.now(),runSource:o,traceId:m,chatId:g,messageId:l,confirmedAssistantMessageId:l,slotBindingKey:h,slotRevisionKey:b,slotTransactionId:nv({chatId:g,messageId:l,effectiveSwipeId:d,assistantContentFingerprint:p,eventType:o,traceId:m}),executionKey:b,lastAiMessage:c,assistantContentFingerprint:y,assistantBaseText:u,assistantBaseFingerprint:p,lastAiMessageSwipeId:d,confirmedAssistantSwipeId:d,effectiveSwipeId:d,sourceMessageId:l,sourceSwipeId:d,lastUserMessage:i?.content||"",userMessage:i?.content||"",targetAssistantMessage:s,chatMessages:a,characterCard:r,chatHistory:a,input:{userMessage:i?.content||"",lastAiMessage:c,assistantBaseText:u,extractedContent:"",previousToolOutput:"",context:{character:r?.name||"",chatLength:a.length||0}},config:{},status:"pending"}}async function Bn({runSource:t="MANUAL"}={}){let e=Ya(),r=e?.getContext?.()||null,n=await ic(),s=sy(),o=oy(s),a=o?.lastAiMessage||null;return ay({api:e,stContext:r,character:n,conversation:o,targetAssistantMessage:a,runSource:t})}async function zn({messageId:t,swipeId:e="",runSource:r="AUTO"}={}){let n=Ya(),s=n?.getContext?.()||null,o=await ic(),a=sy(),i=oy(a),l=av(i,{messageId:t,swipeId:e});return ay({api:n,stContext:s,character:o,conversation:i,targetAssistantMessage:l,runSource:r})}var ev,Kn=O(()=>{Y();ev=I.createScope("ExecutionContext")});function $o(){try{if(typeof TavernHelper<"u"&&TavernHelper)return TavernHelper}catch{}return Xr()?.TavernHelper||null}function iy(){try{if(typeof SillyTavern<"u"&&SillyTavern)return SillyTavern}catch{}return Xr()?.SillyTavern||null}function ws(t){return Array.isArray(t)?Array.from(new Set(t.map(e=>String(e||"").trim()).filter(Boolean))):[]}function lc(t){if(Array.isArray(t))return t.map(e=>typeof e=="string"?e:e&&typeof e=="object"?e.name||e.id||e.title||JSON.stringify(e):String(e??""));if(t&&typeof t=="object"){let e={};return Object.keys(t).forEach(r=>{let n=t[r];Array.isArray(n)?e[r]=n.map(s=>typeof s=="string"?s:s&&typeof s=="object"?s.name||s.id||s.title||"[object]":String(s??"")):n&&typeof n=="object"?e[r]="[object]":e[r]=n}),e}return t}function lv(t={}){let e=typeof t.content=="string"?t.content.trim():"";if(!e)return"";let r=[t.comment,t.key,t.keysecondary,t.text].map(n=>String(n||"").trim()).find(Boolean);return r&&r!==e?`## ${r}
${e}`:e}function Va(){return Array.isArray(cc)?[...cc]:[]}async function Ja(t){if(t||(t=$o()),!t||typeof t.getCharLorebooks!="function")return[];try{let e=await Promise.resolve(t.getCharLorebooks({type:"all"}));return ws([e?.primary,e?.secondary,...Array.isArray(e?.additional)?e.additional:[]])}catch(e){return jn.warn("\u83B7\u53D6\u89D2\u8272\u7ED1\u5B9A\u4E16\u754C\u4E66\u5931\u8D25:",e),[]}}async function cv(t,e){if(t&&typeof t.getLorebooks=="function")try{let r=ws(await Promise.resolve(t.getLorebooks()));if(r.length>0)return r}catch(r){jn.warn("\u83B7\u53D6\u5168\u90E8\u4E16\u754C\u4E66\u5217\u8868\u5931\u8D25:",r)}if(e&&typeof e.getWorldBooks=="function")try{let r=await Promise.resolve(e.getWorldBooks()),n=ws(Array.isArray(r)?r.map(s=>s?.name??s):[]);if(n.length>0)return n}catch(r){jn.warn("\u4ECE SillyTavern \u83B7\u53D6\u4E16\u754C\u4E66\u5217\u8868\u5931\u8D25:",r)}return[]}async function Oo(){let t=$o(),e=iy(),r={checkedAt:Date.now(),hasGlobalTavernHelper:(()=>{try{return typeof TavernHelper<"u"&&!!TavernHelper}catch{return!1}})(),hasParentTavernHelper:!!Xr()?.TavernHelper,hasGlobalSillyTavern:(()=>{try{return typeof SillyTavern<"u"&&!!SillyTavern}catch{return!1}})(),hasParentSillyTavern:!!Xr()?.SillyTavern,helperKeys:t?Object.keys(t).sort():[],stKeys:e?Object.keys(e).sort():[],getLorebooksType:typeof t?.getLorebooks,getCharLorebooksType:typeof t?.getCharLorebooks,getLorebookEntriesType:typeof t?.getLorebookEntries,getWorldBooksType:typeof e?.getWorldBooks,characterWorldbooks:[],allWorldbooks:[],combinedWorldbooks:[],rawResults:{},errors:[]};try{r.rawResults.getLorebooks=t&&typeof t.getLorebooks=="function"?lc(await Promise.resolve(t.getLorebooks())):"[unavailable]"}catch(a){r.errors.push(`getLorebooks: ${a?.message||a}`)}try{r.rawResults.getCharLorebooks=t&&typeof t.getCharLorebooks=="function"?lc(await Promise.resolve(t.getCharLorebooks({type:"all"}))):"[unavailable]"}catch(a){r.errors.push(`getCharLorebooks: ${a?.message||a}`)}try{r.rawResults.getWorldBooks=e&&typeof e.getWorldBooks=="function"?lc(await Promise.resolve(e.getWorldBooks())):"[unavailable]"}catch(a){r.errors.push(`getWorldBooks: ${a?.message||a}`)}let n=await Ja(t),s=await cv(t,e),o=ws([...n,...s]);return r.characterWorldbooks=[...n],r.allWorldbooks=[...s],r.combinedWorldbooks=[...o],iv=r,cc=o,[...o]}async function Xa(t){let e="";if(typeof t=="string"?e=t:t&&typeof t=="object"&&(e=t?.worldbooks?.presetId||""),!e)return"";let r=No(e);if(!r)return jn.warn(`buildSelectedWorldbookContent: \u9884\u8BBE\u4E0D\u5B58\u5728 ${e}`),"";let n=r.includeDisabled===!0,s=[];if(r.bindingMode==="character_card"){let l=$o(),d=iy(),c=await Ja(l),u=new Map((r.bookList||[]).map(y=>[String(y.bookName||""),y]));for(let y of ws(c)){let p=u.get(y);p&&p.enabled===!1||s.push(y)}}else s=(r.bookList||[]).filter(l=>l&&l.bookName&&l.enabled!==!1).map(l=>l.bookName);if(s=ws(s),s.length===0)return"";let o=$o();if(!o||typeof o.getLorebookEntries!="function")return jn.warn("TavernHelper.getLorebookEntries \u4E0D\u53EF\u7528\uFF0C\u65E0\u6CD5\u8BFB\u53D6\u4E16\u754C\u4E66\u5185\u5BB9\u3002"),"";let a=new Map((r.bookList||[]).map(l=>[l.bookName,l.entryOverrides||{}])),i=[];for(let l of s)try{let d=await o.getLorebookEntries(l),c=Array.isArray(d)?d:[],u=a.get(l)||{},p=c.filter(g=>n||g?.enabled!==!1&&!g?.disable).filter(g=>{let m=u[String(g?.uid??"")];return m&&typeof m.enabled=="boolean"?m.enabled:!0}).map(lv).filter(Boolean).join(`

`);p&&i.push(`[\u4E16\u754C\u4E66\uFF1A${l}]
${p}`)}catch(d){jn.warn(`\u8BFB\u53D6\u4E16\u754C\u4E66\u5931\u8D25: ${l}`,d)}return i.join(`

---

`)}async function ly(t){if(!t)return[];let e=$o();if(!e||typeof e.getLorebookEntries!="function")return[];try{let r=await e.getLorebookEntries(t);return Array.isArray(r)?r:[]}catch(r){return jn.warn(`getEntriesForBook \u5931\u8D25: ${t}`,r),[]}}var jn,cc,iv,Lo=O(()=>{Kn();Y();xs();jn=I.createScope("ToolWorldbookService"),cc=[],iv=null});function cy(t){if(!t)return"";let e=String(t).trim();return e=e.replace(/([a-z0-9])([A-Z])/g,"$1_$2"),e.toUpperCase()}function Qa(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window}function Qr(){try{return Qa()?.SillyTavern||null}catch{return null}}function Za(t){try{return(t||Qr())?.getContext?.()||null}catch{return null}}function dc(t,e){if(!t)return null;let r=typeof t?.on=="function"||typeof t?.addListener=="function",n=typeof t?.off=="function"||typeof t?.removeListener=="function";return!r||!n?null:{source:e,eventSource:t,capabilities:{on:typeof t?.on=="function",off:typeof t?.off=="function",addListener:typeof t?.addListener=="function",removeListener:typeof t?.removeListener=="function"}}}function dv(){let t=Qa(),e=Qr(),r=Za(e),s=[dc(e?.eventSource,"SillyTavern.eventSource"),dc(r?.eventSource,"SillyTavern.getContext().eventSource"),dc(t?.eventSource,"topWindow.eventSource")].filter(Boolean)[0]||null,o=e?.eventTypes||e?.event_types||r?.eventTypes||r?.event_types||t?.eventTypes||t?.event_types||{};return{topWindow:t,api:e,context:r,eventSource:s?.eventSource||null,eventTypes:o,source:s?.source||"unavailable",capabilities:s?.capabilities||null,hasBridge:!!s?.eventSource}}var Bt,Ve,uv,dy,uc,Ct,ei=O(()=>{Y();Bt=I.createScope("HostEvents"),Ve=Object.freeze({APP_READY:"APP_READY",MESSAGE_SENT:"MESSAGE_SENT",MESSAGE_RECEIVED:"MESSAGE_RECEIVED",MESSAGE_UPDATED:"MESSAGE_UPDATED",MESSAGE_DELETED:"MESSAGE_DELETED",MESSAGE_EDITED:"MESSAGE_EDITED",MESSAGE_SWIPED:"MESSAGE_SWIPED",USER_MESSAGE_RENDERED:"USER_MESSAGE_RENDERED",CHARACTER_MESSAGE_RENDERED:"CHARACTER_MESSAGE_RENDERED",IMPERSONATE_READY:"IMPERSONATE_READY",GENERATION_STARTED:"GENERATION_STARTED",GENERATION_STOPPED:"GENERATION_STOPPED",GENERATION_ENDED:"GENERATION_ENDED",GENERATION_AFTER_COMMANDS:"GENERATION_AFTER_COMMANDS",CHAT_CHANGED:"CHAT_CHANGED",CHAT_CREATED:"CHAT_CREATED",CHAT_DELETED:"CHAT_DELETED",CHARACTER_PAGE_LOADED:"CHARACTER_PAGE_LOADED",CHARACTER_EDITOR_OPENED:"CHARACTER_EDITOR_OPENED",CHARACTER_EDITED:"CHARACTER_EDITED",WORLDINFO_UPDATED:"WORLDINFO_UPDATED"});uv=1500,dy=20,uc=class{constructor(){this._bridge=null,this._pending=[],this._initAttempts=0,this._retryTimer=null,this._readyResolvers=[],this._initialized=!1,this._disposed=!1}subscribe(e,r,n={}){if(!e||typeof r!="function")return Bt.warn("subscribe \u65E0\u6548\u53C2\u6570",{eventKey:e,handlerType:typeof r}),()=>{};if(this._disposed)return Bt.warn("subscribe \u5728 dispose \u4E4B\u540E\u88AB\u8C03\u7528",{eventKey:e}),()=>{};let s={key:cy(e),rawKey:e,handler:r,options:n,attached:!1,_hostName:"",_hostUnsubscribe:null,_disposed:!1};return this._pending.push(s),this._ensureInitialized(),this._bridge?.hasBridge&&this._attachEntry(s),()=>{if(s._disposed)return;s._disposed=!0;let o=this._pending.indexOf(s);if(o>=0&&this._pending.splice(o,1),s.attached&&typeof s._hostUnsubscribe=="function")try{s._hostUnsubscribe()}catch(a){Bt.warn("\u53D6\u6D88\u5BBF\u4E3B\u8BA2\u9605\u5931\u8D25",{event:s._hostName,error:a})}}}async emit(e,...r){if(this._ensureInitialized(),!this._bridge?.hasBridge)return Bt.debug("emit \u65F6\u5BBF\u4E3B\u6865\u672A\u5C31\u7EEA\uFF0C\u8DF3\u8FC7",{eventKey:e}),!1;let n=this._resolveHostEventName(e);if(!n)return!1;let{eventSource:s}=this._bridge;try{if(typeof s?.emit=="function")return await s.emit(n,...r),!0;if(typeof s?.dispatch=="function")return await s.dispatch(n,...r),!0}catch(o){Bt.warn("emit \u629B\u9519",{eventKey:e,hostName:n,error:o})}return!1}ready({timeoutMs:e=1e4}={}){return this._ensureInitialized(),this._bridge?.hasBridge?Promise.resolve(!0):new Promise(r=>{let n=!1,s=a=>{n||(n=!0,r(a))},o=e>0?setTimeout(()=>s(!1),e):null;this._readyResolvers.push(a=>{o&&clearTimeout(o),s(a)})})}describe(){this._ensureInitialized();let e=this._bridge?.eventTypes||{};return{initialized:this._initialized,source:this._bridge?.source||"unavailable",hasBridge:!!this._bridge?.hasBridge,initAttempts:this._initAttempts,retryScheduled:!!this._retryTimer,pendingCount:this._pending.filter(r=>!r.attached).length,attachedCount:this._pending.filter(r=>r.attached).length,availableEvents:Object.keys(e).slice(0,100)}}reinit(){if(this._disposed)return!1;for(let e of this._pending){if(e.attached&&typeof e._hostUnsubscribe=="function")try{e._hostUnsubscribe()}catch{}e.attached=!1,e._hostUnsubscribe=null,e._hostName=""}return this._bridge=null,this._initialized=!1,this._initAttempts=0,this._retryTimer&&(clearTimeout(this._retryTimer),this._retryTimer=null),this._ensureInitialized()}dispose(){this._retryTimer&&(clearTimeout(this._retryTimer),this._retryTimer=null);for(let e of this._pending){if(e.attached&&typeof e._hostUnsubscribe=="function")try{e._hostUnsubscribe()}catch{}e._disposed=!0}this._pending=[],this._readyResolvers=[],this._bridge=null,this._initialized=!1,this._disposed=!0}_ensureInitialized(){if(this._disposed)return!1;if(this._initialized&&this._bridge?.hasBridge)return!0;this._initAttempts+=1;let e=dv();if(this._bridge=e,this._initialized=!0,!e.hasBridge)return Bt.debug(`\u5BBF\u4E3B\u6865\u672A\u5C31\u7EEA (attempt ${this._initAttempts})`,{source:e.source}),this._scheduleRetry(),!1;Bt.info("\u5BBF\u4E3B\u6865\u5DF2\u5C31\u7EEA",{source:e.source,eventTypesCount:Object.keys(e.eventTypes).length});for(let n of this._pending)!n.attached&&!n._disposed&&this._attachEntry(n);let r=this._readyResolvers.slice();this._readyResolvers=[];for(let n of r)try{n(!0)}catch{}return!0}_scheduleRetry(){if(!this._retryTimer){if(this._initAttempts>=dy){Bt.warn(`\u5DF2\u8FBE\u6700\u5927\u91CD\u8BD5\u6B21\u6570 (${dy})\uFF0C\u505C\u6B62\u91CD\u8BD5`);let e=this._readyResolvers.slice();this._readyResolvers=[];for(let r of e)try{r(!1)}catch{}return}this._retryTimer=setTimeout(()=>{this._retryTimer=null,this._initialized=!1,this._ensureInitialized()},uv)}}_resolveHostEventName(e){let r=cy(e),n=this._bridge?.eventTypes||{};if(n[r])return n[r];let s=r.toLowerCase();if(n[s])return n[s];let o=String(e).trim();return o&&o===o.toLowerCase()?o:s}_attachEntry(e){if(!this._bridge?.hasBridge||e.attached||e._disposed)return;let r=this._resolveHostEventName(e.rawKey);if(!r){Bt.warn("\u65E0\u6CD5\u89E3\u6790\u5BBF\u4E3B\u4E8B\u4EF6\u540D",{rawKey:e.rawKey});return}let{eventSource:n}=this._bridge,s=typeof n?.on=="function"?n.on.bind(n):typeof n?.addListener=="function"?n.addListener.bind(n):null,o=typeof n?.off=="function"?n.off.bind(n):typeof n?.removeListener=="function"?n.removeListener.bind(n):null;if(!s||!o){Bt.warn("\u5BBF\u4E3B eventSource \u7F3A\u5C11 on/off \u65B9\u6CD5");return}try{s(r,e.handler),e.attached=!0,e._hostName=r,e._hostUnsubscribe=()=>{try{o(r,e.handler)}catch(a){Bt.warn("\u53D6\u6D88\u5BBF\u4E3B\u8BA2\u9605\u5931\u8D25",{event:r,error:a})}},Bt.debug(`\u7ED1\u5B9A\u5BBF\u4E3B\u4E8B\u4EF6: "${r}" (key=${e.key})`)}catch(a){Bt.error(`\u7ED1\u5B9A\u5BBF\u4E3B\u4E8B\u4EF6\u5931\u8D25: "${r}"`,{error:a})}}},Ct=new uc});var py={};ue(py,{WorldbookPresetPanel:()=>Do,default:()=>xv});function pv(t){return t===yr.CUSTOM?"\u81EA\u5B9A\u4E49":"\u8DDF\u968F\u89D2\u8272\u5361"}function yv(t,e,r){let n=[...t.bookList],s=n.findIndex(o=>o.bookName===e);s>=0?n[s]={...n[s],enabled:r}:n.push({bookName:e,enabled:r,entryOverrides:{}}),ht.updatePreset(t.id,{bookList:n})}function fv(t,e){let r=t.bookList.filter(n=>n.bookName!==e);ht.updatePreset(t.id,{bookList:r})}async function gv(t,e){let r=Va();if(!r.length)try{r=await Oo()}catch{}let n=new Set(t.bookList.map(c=>c.bookName)),s=r.filter(c=>!n.has(c));if(!s.length){await ke.confirm({title:"\u6CA1\u6709\u53EF\u6DFB\u52A0\u7684\u4E16\u754C\u4E66",message:"\u5BBF\u4E3B\u672A\u63D0\u4F9B\u66F4\u591A\u53EF\u7528\u4E16\u754C\u4E66\uFF0C\u6216\u7F13\u5B58\u5185\u5168\u90E8\u5DF2\u52A0\u5165\u6B64\u9884\u8BBE\u3002",confirmText:"\u786E\u5B9A"});return}let o=f("div",{style:{display:"flex",flexDirection:"column",gap:"8px"}}),a=f("input",{className:"yyt-input",attrs:{type:"text",placeholder:`\u641C\u7D22 ${s.length} \u672C\u4E16\u754C\u4E66\u2026`,autocomplete:"off"},style:{padding:"7px 10px",fontSize:"12px"}});o.appendChild(a);let i=f("div",{style:{display:"flex",flexDirection:"column",gap:"4px",maxHeight:"320px",overflowY:"auto"}}),l=new Set,d=[];for(let c of s){let u=f("label",{style:{display:"flex",alignItems:"center",gap:"8px",padding:"8px 10px",cursor:"pointer",borderRadius:"var(--yyt-radius-sm, 6px)",background:"var(--yyt-surface-2, rgba(255,255,255,0.03))",fontSize:"12px"}}),y=f("input",{attrs:{type:"checkbox",value:c}});y.addEventListener("change",()=>{y.checked?l.add(c):l.delete(c)}),u.appendChild(y),u.appendChild(f("span",{text:c,style:{color:"var(--yyt-text)"}})),i.appendChild(u),d.push({el:u,search:c.toLowerCase()})}o.appendChild(i),a.addEventListener("input",()=>{let c=a.value.trim().toLowerCase();for(let u of d)u.el.style.display=!c||u.search.includes(c)?"":"none"}),ke.custom({title:`\u6DFB\u52A0\u4E16\u754C\u4E66\uFF08${s.length} \u9879\u53EF\u9009\uFF09`,width:"480px",body:o,buttons:[{label:"\u53D6\u6D88",variant:"ghost",onClick:c=>c(null)},{label:"\u5168\u9009\u53EF\u89C1",variant:"ghost",onClick:()=>{for(let c of i.querySelectorAll("input[type=checkbox]")){let u=c.closest("label");(!u||u.style.display!=="none")&&(c.checked=!0,l.add(c.value))}}},{label:"\u6DFB\u52A0\u9009\u4E2D",variant:"primary",onClick:c=>{let u=Array.from(l);if(!u.length){c(null);return}let y=u.map(g=>({bookName:g,enabled:!0,entryOverrides:{}})),p=[...t.bookList,...y];ht.updatePreset(t.id,{bookList:p}),c(u.length)}}]}).result.then(c=>{c&&e&&e()})}function mv(t,{onChange:e,readonly:r,refresh:n}){let s=f("div",{style:{display:"flex",flexDirection:"column",gap:"12px"}});V(s,Dt({label:"\u63CF\u8FF0",control:me({value:t.description,placeholder:"\u53EF\u9009 \u2014 \u5907\u6CE8\u7528\u9014",disabled:r,onChange:c=>e({description:c})})})),V(s,Dt({label:"\u7ED1\u5B9A\u6A21\u5F0F",hint:"\u8DDF\u968F\u89D2\u8272\u5361 = \u6CE8\u5165\u5F53\u524D\u89D2\u8272\u7ED1\u5B9A\u7684\u4E16\u754C\u4E66\uFF1B\u81EA\u5B9A\u4E49 = \u7528\u4E0B\u65B9\u624B\u52A8\u9009\u62E9\u7684\u5217\u8868",control:Ee({value:t.bindingMode,disabled:r,options:[{value:yr.CHARACTER_CARD,label:"\u8DDF\u968F\u89D2\u8272\u5361\uFF08\u52A8\u6001\uFF09"},{value:yr.CUSTOM,label:"\u81EA\u5B9A\u4E49\uFF08\u56FA\u5B9A\u5217\u8868\uFF09"}],onChange:c=>{e({bindingMode:c}),n&&n()}})})),V(s,Ye({label:"\u5305\u542B\u7981\u7528\u8BCD\u6761",hint:"\u5F00\u542F\u540E\uFF1A\u6E90\u4E16\u754C\u4E66\u4E2D\u5DF2\u7981\u7528\u7684\u8BCD\u6761\u53EF\u88AB\u672C\u9884\u8BBE\u5F3A\u5236\u542F\u7528\u5E76\u6CE8\u5165",checked:t.includeDisabled,disabled:r,onChange:c=>e({includeDisabled:c})}));let o=t.bindingMode===yr.CHARACTER_CARD,a=f("div",{style:{display:"flex",flexDirection:"column"}}),i=f("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"6px",gap:"8px"}});i.appendChild(f("div",{style:{display:"flex",flexDirection:"column",gap:"2px"}},f("div",{text:o?"\u968F\u89D2\u8272\u5361\u6CE8\u5165\u7684\u4E16\u754C\u4E66":"\u9009\u4E2D\u7684\u4E16\u754C\u4E66",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}}),f("div",{text:o?"\u4EE5\u4E0B\u6765\u81EA\u5F53\u524D\u89D2\u8272\u5361\u7684\u4E16\u754C\u4E66\u5C06\u88AB\u81EA\u52A8\u6CE8\u5165\uFF0C\u5217\u8868\u968F\u89D2\u8272\u5361\u53D8\u52A8\u81EA\u52A8\u66F4\u65B0":'\u672C\u9884\u8BBE\u56FA\u5B9A\u6CE8\u5165\u4E0B\u5217\u4E16\u754C\u4E66\uFF1B\u70B9\u51FB"+ \u6DFB\u52A0"\u4ECE\u53EF\u7528\u5217\u8868\u591A\u9009',style:{fontSize:"11px",color:"var(--yyt-text-muted)",lineHeight:"1.5"}})));let l=f("div",{style:{display:"flex",gap:"6px"}});!o&&!r&&l.appendChild(X({label:"+ \u6DFB\u52A0",size:"small",onClick:()=>gv(t,n)}).el),o||l.appendChild(X({label:"\u{1F504} \u5237\u65B0",size:"small",variant:"ghost",onClick:async()=>{try{await Oo()}catch(c){pc.warn("\u5237\u65B0\u5931\u8D25",{e:c})}n&&n()}}).el),i.appendChild(l),V(a,i);let d=[];if(o){let c=f("div",{style:{display:"flex",flexDirection:"column",gap:"4px"}});c.appendChild(f("div",{text:"\u6B63\u5728\u83B7\u53D6\u89D2\u8272\u5361\u7ED1\u5B9A\u7684\u4E16\u754C\u4E66\u2026",style:{padding:"14px 0",color:"var(--yyt-text-muted)",fontSize:"12px"}})),Ja().then(u=>{if(c.innerHTML="",!u.length)c.appendChild(f("div",{style:{padding:"14px 0",color:"var(--yyt-text-muted)",fontSize:"12px"},text:'\u5F53\u524D\u89D2\u8272\u5361\u672A\u7ED1\u5B9A\u4E16\u754C\u4E66 \u2014 \u5207\u6362\u5230"\u81EA\u5B9A\u4E49"\u53EF\u4EE5\u624B\u52A8\u9009\u62E9\u4EFB\u610F\u4E16\u754C\u4E66\u3002'}));else for(let y of u)c.appendChild(f("div",{style:{padding:"8px 10px",borderRadius:"var(--yyt-radius-sm, 6px)",background:"var(--yyt-surface-2, rgba(255,255,255,0.03))",fontSize:"12px",display:"flex",alignItems:"center",gap:"8px",opacity:"0.7"}},f("span",{text:"\u{1F4D6}",style:{fontSize:"11px"}}),f("span",{text:y,style:{flex:"1",color:"var(--yyt-text)"}}),f("span",{text:"\u968F\u89D2\u8272\u5361\u6CE8\u5165",style:{fontSize:"11px",color:"var(--yyt-text-muted)"}})))}).catch(u=>{pc.warn("\u83B7\u53D6\u89D2\u8272\u5361\u4E16\u754C\u4E66\u5931\u8D25",u),c.innerHTML="",c.appendChild(f("div",{style:{padding:"14px 0",color:"var(--yyt-danger, #f87171)",fontSize:"12px"},text:"\u83B7\u53D6\u89D2\u8272\u5361\u4E16\u754C\u4E66\u5931\u8D25"}))}),d=[c]}else t.bookList.length?d=t.bookList.map(c=>{let u=Object.keys(c.entryOverrides||{}).filter(g=>{let m=c.entryOverrides[g];return m&&typeof m.enabled=="boolean"}).length,y=f("div",{style:{display:"flex",flexDirection:"column"}}),p=Jl({name:c.bookName,desc:c.enabled===!1?"\u5DF2\u7981\u7528":`\u5DF2\u542F\u7528 \xB7 \u6574\u672C\u6CE8\u5165${u?` \xB7 ${u} \u6761 override`:""}`,actions:[X({label:"\u25B8 \u8BCD\u6761",size:"small",variant:"ghost",title:"\u5C55\u5F00/\u6536\u8D77\u8BCD\u6761\u7EA7 override",onClick:()=>hv(y,t,c,r,n)}),Ye({checked:c.enabled!==!1,disabled:r,onChange:g=>yv(t,c.bookName,g)}),...r?[]:[X({label:"\xD7",size:"small",variant:"ghost",title:"\u4ECE\u9884\u8BBE\u79FB\u9664",onClick:()=>{fv(t,c.bookName),n&&n()}})]]});return p?.el&&V(y,p.el),y}):d=[f("div",{style:{padding:"14px 0",color:"var(--yyt-text-muted)",fontSize:"12px"},text:'\u70B9\u51FB\u53F3\u4E0A\u89D2"+ \u6DFB\u52A0"\u9009\u62E9\u4E16\u754C\u4E66\u52A0\u5165\u6B64\u9884\u8BBE\u3002'})];for(let c of d)c?.el?V(a,c.el):c instanceof Node&&V(a,c);return V(s,a),s}function hv(t,e,r,n,s){let o=t.querySelector(".yyt-wb-entry-panel");if(o){o.remove();let l=t.querySelector('[title="\u5C55\u5F00/\u6536\u8D77\u8BCD\u6761\u7EA7 override"]');l&&(l.textContent="\u25B8 \u8BCD\u6761");return}let a=t.querySelector('[title="\u5C55\u5F00/\u6536\u8D77\u8BCD\u6761\u7EA7 override"]');a&&(a.textContent="\u25BE \u8BCD\u6761");let i=f("div",{className:"yyt-wb-entry-panel",style:{marginLeft:"18px",marginTop:"4px",padding:"8px 10px",background:"var(--yyt-surface-2, rgba(255,255,255,0.03))",borderRadius:"var(--yyt-radius-sm, 6px)",border:"1px solid var(--yyt-border, rgba(255,255,255,0.06))",fontSize:"12px",display:"flex",flexDirection:"column",gap:"4px"}});i.appendChild(f("div",{text:"\u52A0\u8F7D\u4E2D\u2026",style:{color:"var(--yyt-text-muted)",padding:"4px 0"}})),t.appendChild(i),ly(r.bookName).then(l=>{if(!l.length){i.innerHTML="",i.appendChild(f("div",{text:"\u8BE5\u4E16\u754C\u4E66\u65E0\u8BCD\u6761",style:{color:"var(--yyt-text-muted)",padding:"4px 0"}}));return}let d=r.entryOverrides||{};i.innerHTML="";let c=f("input",{className:"yyt-input",attrs:{type:"text",placeholder:`\u641C\u7D22 ${l.length} \u4E2A\u8BCD\u6761\u2026`,autocomplete:"off"},style:{padding:"5px 8px",fontSize:"11px",marginBottom:"4px",flexShrink:"0"}});i.appendChild(c);let u=f("div",{style:{display:"flex",flexDirection:"column",gap:"2px",height:"260px",overflowY:"scroll",overscrollBehavior:"contain",WebkitOverflowScrolling:"touch"}});u.addEventListener("wheel",g=>{let m=g.deltaY;if(m===0)return;let h=u.scrollTop+u.clientHeight<u.scrollHeight-.5,b=u.scrollTop>.5;(m>0&&h||m<0&&b)&&(g.preventDefault(),g.stopPropagation(),u.scrollTop+=m)},{passive:!1});let y=e.includeDisabled===!0,p=[];for(let g of l){let m=String(g.uid??""),h=g.comment||g.key||g.name||"",b=String(Array.isArray(h)?h[0]:h).trim()||`\u6761\u76EE ${g.uid}`,w=g.enabled===!1||g.disable===!0,S=d[m],_=S&&typeof S.enabled=="boolean",k=w&&!_&&!y,v=f("div",{style:{display:"flex",alignItems:"center",gap:"8px",padding:"5px 8px",borderRadius:"4px",background:_?"rgba(123,183,255,0.08)":"transparent",opacity:k?"0.4":"1"}}),C=E=>{v.style.background=E?"rgba(123,183,255,0.08)":"transparent",N.style.color=E?"var(--yyt-accent)":"var(--yyt-text)",E?R||(R=L(),v.appendChild(R)):(R&&(R.remove(),R=null),v.style.opacity=w?"0.4":"1")},R=null,L=()=>{let E=f("span",{text:"\u2715",style:{cursor:"pointer",color:"var(--yyt-text-muted)",fontSize:"10px",flexShrink:"0"},attrs:{title:"\u6E05\u9664 override"}});return E.addEventListener("click",P=>{if(P.stopPropagation(),n)return;let U=ht.getPreset(e.id);if(!U)return;let q=U.bookList.find(te=>te.bookName===r.bookName);q&&(q.entryOverrides=q.entryOverrides||{},delete q.entryOverrides[m],ht.updatePreset(e.id,{bookList:[...U.bookList]},{silent:!0}),R=null,C(!1))}),E};v.appendChild(Ye({checked:_?S.enabled:!w,disabled:n||k,onChange:E=>{let P=ht.getPreset(e.id);if(!P)return;let U=P.bookList.find(ie=>ie.bookName===r.bookName);if(!U)return;U.entryOverrides=U.entryOverrides||{};let q=!w;E===q?delete U.entryOverrides[m]:U.entryOverrides[m]={enabled:E};let te=E!==q;ht.updatePreset(e.id,{bookList:[...P.bookList]},{silent:!0}),C(te),v.style.opacity=k?"0.4":"1"}}).el);let N=f("span",{style:{flex:"1",minWidth:"0",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",color:_?"var(--yyt-accent)":"var(--yyt-text)",fontSize:"11px"},text:b+(k?" (\u6E90\u7981\u7528)":"")});v.appendChild(N),_&&(R=L(),v.appendChild(R)),u.appendChild(v),p.push({el:v,search:b.toLowerCase()})}i.appendChild(u),c.addEventListener("input",()=>{let g=c.value.trim().toLowerCase();for(let m of p)m.el.style.display=!g||m.search.includes(g)?"":"none"})}).catch(l=>{pc.warn("\u52A0\u8F7D\u8BCD\u6761\u5931\u8D25",l),i.innerHTML="",i.appendChild(f("div",{text:`\u52A0\u8F7D\u5931\u8D25\uFF1A${l?.message||l}`,style:{color:"var(--yyt-danger, #f87171)",padding:"4px 0"}}))})}function bv(t){let e=[`${pv(t.bindingMode)}`,`${t.bookList.length} \u672C`];return t.includeDisabled&&e.push("\u542B\u7981\u7528"),e}var pc,Do,yc,uy,xv,yy=O(()=>{nr();xs();Lo();ei();Ro();Y();Mo();pc=I.createScope("WorldbookPresetPanel");Do=qr({id:"worldbookPresetPanel",kind:"worldbook",panelTitle:"\u4E16\u754C\u4E66\u9884\u8BBE",panelHint:"\u7BA1\u7406\u4E16\u754C\u4E66\u6CE8\u5165\u9884\u8BBE\u3002\u5DE5\u5177\u914D\u7F6E\u4E2D\u901A\u8FC7\u9884\u8BBE ID \u5F15\u7528\uFF0C\u53EF\u7ED1\u5B9A\u89D2\u8272\u5361\uFF08\u52A8\u6001\uFF09\u6216\u56FA\u5B9A\u5217\u8868\u3002",store:ht,renderEditor:mv,renderListItemMeta:bv}),yc=null,uy=Do.renderTo;Do.renderTo=function(t){yc=t,uy.call(this,t)};Ct.subscribe(Ve.CHAT_CHANGED,()=>{if(!yc)return;let t=ht.getCurrentPreset();!t||t.bindingMode!==yr.CHARACTER_CARD||uy.call(Do,yc)});xv=Do});var wc={};ue(wc,{MESSAGE_MACROS:()=>Ly,addTagRule:()=>Ey,createRuleTemplate:()=>vy,default:()=>Sv,deleteRulePreset:()=>Py,deleteRuleTemplate:()=>Ty,deleteTagRule:()=>Cy,escapeRegex:()=>Un,exportRulesConfig:()=>Ny,extractComplexTag:()=>gy,extractCurlyBraceTag:()=>bc,extractHtmlFormatTag:()=>my,extractSimpleTag:()=>hc,extractTagContent:()=>Ir,generateTagSuggestions:()=>by,getAllRulePresets:()=>Ry,getAllRuleTemplates:()=>xy,getContentBlacklist:()=>Ss,getRuleTemplate:()=>wy,getTagRules:()=>vs,importRulesConfig:()=>$y,isValidTagName:()=>mc,loadRulePreset:()=>My,saveRulesAsPreset:()=>Iy,scanTextForTags:()=>hy,setContentBlacklist:()=>ky,setTagRules:()=>_y,shouldSkipContent:()=>gc,testRegex:()=>Oy,updateRuleTemplate:()=>Sy,updateTagRule:()=>Ay});function wv(){return{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"},ruleTemplates:[...fc],tagRules:[],contentBlacklist:[],tagRulePresets:{}}}function zt(){return j.get(fy,wv())}function gr(t){j.set(fy,t)}function ti(){let t=zt();return bt=t.ruleTemplates||[...fc],je=t.tagRules||[],kt=t.contentBlacklist||[],{ruleTemplates:bt,tagRules:je,contentBlacklist:kt}}function Un(t){return typeof t!="string"?"":t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function gc(t,e){if(!e||e.length===0||!t||typeof t!="string")return!1;let r=t.toLowerCase();return e.some(n=>{let s=n.trim().toLowerCase();return s&&r.includes(s)})}function mc(t){return!t||typeof t!="string"?!1:/^[a-zA-Z][a-zA-Z0-9_-]*$/.test(t)&&!vv.includes(t.toLowerCase())}function hc(t,e){if(!t||!e)return[];let r=[],n=Un(e),s=new RegExp(`<${n}>([\\s\\S]*?)<\\/${n}>`,"gi");[...t.matchAll(s)].forEach(l=>{l[1]&&r.push(l[1].trim())});let a=(t.match(new RegExp(`<${n}>`,"gi"))||[]).length,i=(t.match(new RegExp(`<\\/${n}>`,"gi"))||[]).length;return a>i&&fr.warn(`\u53D1\u73B0 ${a-i} \u4E2A\u672A\u95ED\u5408\u7684 <${e}> \u6807\u7B7E`),r}function bc(t,e){if(!t||!e)return[];let r=[],n=Un(e),s=new RegExp(`\\{${n}\\|`,"gi"),o;for(;(o=s.exec(t))!==null;){let a=o.index,i=a+o[0].length,l=1,d=i;for(;d<t.length&&l>0;)t[d]==="{"?l++:t[d]==="}"&&l--,d++;if(l===0){let c=t.substring(i,d-1);c.trim()&&r.push(c.trim())}s.lastIndex=a+1}return r}function gy(t,e){if(!t||!e)return[];let r=e.split(",");if(r.length!==2)return fr.error(`\u590D\u6742\u6807\u7B7E\u914D\u7F6E\u683C\u5F0F\u9519\u8BEF\uFF0C\u5E94\u8BE5\u5305\u542B\u4E00\u4E2A\u9017\u53F7: ${e}`),[];let n=r[0].trim(),s=r[1].trim(),o=s.match(/<\/(\w+)>/);if(!o)return fr.error(`\u65E0\u6CD5\u89E3\u6790\u7ED3\u675F\u6807\u7B7E: ${s}`),[];let a=o[1],i=new RegExp(`${Un(n)}([\\s\\S]*?)<\\/${a}>`,"gi"),l=[];return[...t.matchAll(i)].forEach(c=>{c[1]&&l.push(c[1].trim())}),l}function my(t,e){if(!t||!e)return[];let r=e.match(/<(\w+)(?:\s[^>]*)?>/);if(!r)return fr.error(`\u65E0\u6CD5\u89E3\u6790HTML\u683C\u5F0F\u6807\u7B7E: ${e}`),[];let n=r[1],s=[],o=new RegExp(`<${n}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${n}>`,"gi");[...t.matchAll(o)].forEach(d=>{d[1]&&s.push(d[1].trim())});let i=(t.match(new RegExp(`<${n}(?:\\s[^>]*)?>`,"gi"))||[]).length,l=(t.match(new RegExp(`<\\/${n}>`,"gi"))||[]).length;return i>l&&fr.warn(`\u53D1\u73B0 ${i-l} \u4E2A\u672A\u95ED\u5408\u7684 <${n}> \u6807\u7B7E`),s}function Ir(t,e,r=[]){if(!t)return"";if(!e||e.length===0)return t;let n=e.filter(c=>c.type==="exclude"&&c.enabled),s=e.filter(c=>(c.type==="include"||c.type==="regex_include")&&c.enabled),o=e.filter(c=>c.type==="regex_exclude"&&c.enabled),a=t;for(let c of n)try{let u=new RegExp(`<${Un(c.value)}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${Un(c.value)}>`,"gi");a=a.replace(u,"")}catch(u){fr.error("Error applying block exclusion rule:",{rule:c,error:u})}let i=[];if(s.length>0)for(let c of s){let u=[];try{if(c.type==="include")u.push(...hc(a,c.value)),u.push(...bc(a,c.value));else if(c.type==="regex_include"){let y=new RegExp(c.value,"gi");[...a.matchAll(y)].forEach(g=>{g[1]&&u.push(g[1])})}}catch(y){fr.error("Error applying inclusion rule:",{rule:c,error:y})}u.forEach(y=>i.push(y.trim()))}else i.push(a);let l=[];for(let c of i){for(let u of o)try{let y=new RegExp(u.value,"gi");c=c.replace(y,"")}catch(y){fr.error("Error applying cleanup rule:",{rule:u,error:y})}gc(c,r)||l.push(c)}return l.join(`

`).replace(/\n\s*\n\s*\n/g,`

`).replace(/^\s+|\s+$/g,"").trim()}async function hy(t,e={}){let r=performance.now(),{chunkSize:n=5e4,maxTags:s=100,timeoutMs:o=5e3}=e,a=new Set,i=/<(?:\/|)([a-zA-Z0-9_-]+)(?:[^>]*)>|\{([a-zA-Z0-9_-]+)(?:\||})/g,l=0,d=0;for(let u=0;u<t.length;u+=n){let y=t.slice(u,Math.min(u+n,t.length));if(d++,l+=y.length,performance.now()-r>o){fr.warn(`Tag scanning timed out after ${o}ms`);break}let p;for(;(p=i.exec(y))!==null&&a.size<s;){let g=(p[1]||p[2]).toLowerCase();mc(g)&&a.add(g)}if(a.size>=s)break;d%5===0&&await new Promise(g=>setTimeout(g,0))}let c=performance.now();return{tags:Array.from(a).sort(),stats:{processingTimeMs:Math.round(c-r),processedChars:l,totalChars:t.length,chunkCount:d,tagsFound:a.size}}}function by(t,e=25){let r=t.tags.slice(0,e);return{suggestions:r,stats:{totalFound:t.stats.tagsFound,finalCount:r.length}}}function xy(){return bt.length===0&&ti(),bt}function wy(t){return bt.find(e=>e.id===t)}function vy(t){let e={id:`rule-${Date.now()}`,name:t.name||"\u65B0\u89C4\u5219",description:t.description||"",type:t.type||"include",value:t.value||"",enabled:t.enabled!==!1,createdAt:new Date().toISOString()};return bt.push(e),xc(),{success:!0,template:e,message:"\u89C4\u5219\u6A21\u677F\u521B\u5EFA\u6210\u529F"}}function Sy(t,e){let r=bt.findIndex(n=>n.id===t);return r===-1?{success:!1,message:"\u89C4\u5219\u6A21\u677F\u4E0D\u5B58\u5728"}:(bt[r]={...bt[r],...e,updatedAt:new Date().toISOString()},xc(),{success:!0,template:bt[r],message:"\u89C4\u5219\u6A21\u677F\u66F4\u65B0\u6210\u529F"})}function Ty(t){let e=bt.findIndex(r=>r.id===t);return e===-1?{success:!1,message:"\u89C4\u5219\u6A21\u677F\u4E0D\u5B58\u5728"}:(bt.splice(e,1),xc(),{success:!0,message:"\u89C4\u5219\u6A21\u677F\u5DF2\u5220\u9664"})}function xc(){let t=zt();t.ruleTemplates=bt,gr(t)}function vs(){return je||ti(),je}function _y(t){je=t||[];let e=zt();e.tagRules=je,gr(e)}function Ey(t){let e={id:`tag-${Date.now()}`,type:t.type||"include",value:t.value||"",enabled:t.enabled!==!1};je.push(e);let r=zt();return r.tagRules=je,gr(r),{success:!0,rule:e,message:"\u89C4\u5219\u6DFB\u52A0\u6210\u529F"}}function Ay(t,e){if(t<0||t>=je.length)return{success:!1,message:"\u89C4\u5219\u7D22\u5F15\u65E0\u6548"};je[t]={...je[t],...e};let r=zt();return r.tagRules=je,gr(r),{success:!0,rule:je[t],message:"\u89C4\u5219\u66F4\u65B0\u6210\u529F"}}function Cy(t){if(t<0||t>=je.length)return{success:!1,message:"\u89C4\u5219\u7D22\u5F15\u65E0\u6548"};je.splice(t,1);let e=zt();return e.tagRules=je,gr(e),{success:!0,message:"\u89C4\u5219\u5DF2\u5220\u9664"}}function Ss(){return kt||ti(),kt}function ky(t){kt=t||[];let e=zt();e.contentBlacklist=kt,gr(e)}function Iy(t,e=""){if(!t||!t.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let r=zt();r.tagRulePresets||(r.tagRulePresets={});let n=`preset-${Date.now()}`;return r.tagRulePresets[n]={id:n,name:t.trim(),description:e.trim(),rules:JSON.parse(JSON.stringify(je)),blacklist:JSON.parse(JSON.stringify(kt)),createdAt:new Date().toISOString()},gr(r),{success:!0,preset:r.tagRulePresets[n],message:"\u9884\u8BBE\u4FDD\u5B58\u6210\u529F"}}function Ry(){let e=zt().tagRulePresets||{};return Object.values(e)}function My(t){let e=zt(),n=(e.tagRulePresets||{})[t];return n?(je=JSON.parse(JSON.stringify(n.rules||[])),kt=JSON.parse(JSON.stringify(n.blacklist||[])),e.tagRules=je,e.contentBlacklist=kt,gr(e),{success:!0,preset:n,message:"\u9884\u8BBE\u52A0\u8F7D\u6210\u529F"}):{success:!1,message:"\u9884\u8BBE\u4E0D\u5B58\u5728"}}function Py(t){let e=zt(),r=e.tagRulePresets||{};return r[t]?(delete r[t],e.tagRulePresets=r,gr(e),{success:!0,message:"\u9884\u8BBE\u5DF2\u5220\u9664"}):{success:!1,message:"\u9884\u8BBE\u4E0D\u5B58\u5728"}}function Ny(){return JSON.stringify({tagRules:je,contentBlacklist:kt,ruleTemplates:bt,tagRulePresets:zt().tagRulePresets||{}},null,2)}function $y(t,e={overwrite:!0}){try{let r=JSON.parse(t);if(e.overwrite)je=r.tagRules||[],kt=r.contentBlacklist||[],bt=r.ruleTemplates||fc;else if(r.tagRules&&je.push(...r.tagRules),r.contentBlacklist){let s=new Set(kt.map(o=>o.toLowerCase()));r.contentBlacklist.forEach(o=>{s.has(o.toLowerCase())||kt.push(o)})}let n=zt();return n.tagRules=je,n.contentBlacklist=kt,n.ruleTemplates=bt,r.tagRulePresets&&(n.tagRulePresets={...n.tagRulePresets||{},...r.tagRulePresets}),gr(n),{success:!0,message:"\u914D\u7F6E\u5BFC\u5165\u6210\u529F"}}catch(r){return fr.error("\u89C4\u5219\u914D\u7F6E\u5BFC\u5165\u5931\u8D25",{error:r}),{success:!1,message:`\u5BFC\u5165\u5931\u8D25: ${r.message}`}}}function Oy(t,e,r="g",n=0){try{if(!t||typeof t!="string")return{success:!1,error:"\u6B63\u5219\u8868\u8FBE\u5F0F\u4E0D\u80FD\u4E3A\u7A7A",matches:[]};let s=new RegExp(t,r),o=[];if(r.includes("g")){let a;for(;(a=s.exec(e))!==null;)a.length>1?o.push({fullMatch:a[0],groups:a.slice(1),index:a.index,extracted:a[n]||a[1]||a[0]}):o.push({fullMatch:a[0],groups:[],index:a.index,extracted:a[0]})}else{let a=s.exec(e);a&&o.push({fullMatch:a[0],groups:a.length>1?a.slice(1):[],index:a.index,extracted:a.length>1?a[n]||a[1]:a[0]})}return{success:!0,matches:o,count:o.length,extracted:o.map(a=>a.extracted)}}catch(s){return{success:!1,error:s.message,matches:[]}}}var fr,fy,vv,fc,bt,je,kt,Ly,Sv,Ts=O(()=>{We();Y();fr=I.createScope("RegexExtractor"),fy="settings";vv=["font","span","div","p","br","hr","img","a","b","i","u","s","em","strong","small","big","sub","sup","h1","h2","h3","h4","h5","h6","table","tr","td","th","tbody","thead","tfoot","ul","ol","li","form","input","button","select","option","textarea","label","script","style","meta","link","title","head","body","html"],fc=[{id:"exclude-thinking",name:"\u6392\u9664\u601D\u8003\u6807\u7B7E",description:"\u79FB\u9664<thinking>\u6807\u7B7E\u5757",type:"exclude",value:"thinking",enabled:!0},{id:"include-content",name:"\u63D0\u53D6\u5185\u5BB9\u6807\u7B7E",description:"\u63D0\u53D6<content>\u6807\u7B7E\u5185\u5BB9",type:"include",value:"content",enabled:!0},{id:"regex-exclude-cot",name:"\u6392\u9664\u5C0FCoT",description:"\u79FB\u9664HTML\u6CE8\u91CA",type:"regex_exclude",value:"<!--[\\s\\S]*?-->",enabled:!1},{id:"regex-include-details",name:"\u63D0\u53D6details\u6807\u7B7E",description:"\u63D0\u53D6<details>\u6807\u7B7E\u5185\u5BB9",type:"regex_include",value:"<details[^>]*>([\\s\\S]*?)</details>",enabled:!1}],bt=[],je=[],kt=[];Ly={lastMessage:{macro:"{{lastMessage}}",description:"\u6700\u540E\u4E00\u6761\u6D88\u606F"},lastCharMessage:{macro:"{{lastCharMessage}}",description:"\u6700\u540E\u4E00\u6761\u89D2\u8272\u6D88\u606F"},lastUserMessage:{macro:"{{lastUserMessage}}",description:"\u6700\u540E\u4E00\u6761\u7528\u6237\u6D88\u606F"},char:{macro:"{{char}}",description:"\u89D2\u8272\u540D\u79F0"},user:{macro:"{{user}}",description:"\u7528\u6237\u540D\u79F0"},input:{macro:"{{input}}",description:"\u5F53\u524D\u8F93\u5165\u6846\u5185\u5BB9"}};ti();Sv={extractTagContent:Ir,extractSimpleTag:hc,extractCurlyBraceTag:bc,extractComplexTag:gy,extractHtmlFormatTag:my,escapeRegex:Un,shouldSkipContent:gc,isValidTagName:mc,scanTextForTags:hy,generateTagSuggestions:by,getAllRuleTemplates:xy,getRuleTemplate:wy,createRuleTemplate:vy,updateRuleTemplate:Sy,deleteRuleTemplate:Ty,getTagRules:vs,setTagRules:_y,addTagRule:Ey,updateTagRule:Ay,deleteTagRule:Cy,getContentBlacklist:Ss,setContentBlacklist:ky,saveRulesAsPreset:Iy,getAllRulePresets:Ry,loadRulePreset:My,deleteRulePreset:Py,exportRulesConfig:Ny,importRulesConfig:$y,testRegex:Oy,MESSAGE_MACROS:Ly}});var Wy={};ue(Wy,{createDefaultToolDefinition:()=>Fn,default:()=>Av,deleteTool:()=>Es,deleteToolPreset:()=>jy,exportTools:()=>As,getAllTools:()=>mr,getCurrentToolPreset:()=>Uy,getTool:()=>hr,getToolPresets:()=>ni,importTools:()=>Cs,normalizeToolDefinitionToRuntimeConfig:()=>zo,resetTools:()=>ks,saveTool:()=>_s,saveToolPreset:()=>Ky,setCurrentToolPreset:()=>Fy,setToolEnabled:()=>si});function Tv(t={}){return!t||typeof t!="object"?{}:Object.fromEntries(Object.entries(t).map(([e,r])=>[e,Fn({...r||{},id:e})]))}function Bo(t){return Array.isArray(t)?t.map(e=>String(e||"").trim()).filter(Boolean):[]}function vc(t,e){let r=parseInt(t,10);return Number.isFinite(r)&&r>0?r:e}function Dy(t,e){let r=parseInt(t,10);return Number.isFinite(r)&&r>=0?r:e}function By(t={}){return{settleMs:Dy(t?.settleMs,1200),cooldownMs:Dy(t?.cooldownMs,5e3)}}function zy(t={}){return{enabled:t?.enabled===!0,selected:Bo(t?.selected),presetId:typeof t?.presetId=="string"?t.presetId:""}}function _v(t=[]){let e=Array.isArray(t)?t.map(r=>({role:String(r?.role||"user").trim().toUpperCase(),content:String(r?.content||"").trim()})).filter(r=>r.content):[];return e.length===0?"":e.length===1?e[0].content:e.map(r=>`\u3010${r.role||"USER"}\u3011
${r.content}`).join(`

`)}function Ev(t,e={}){let r=typeof e?.promptTemplate=="string"?e.promptTemplate.trim():"";if(r)return r;let n=_v(e?.config?.messages||[]);return n||`\u8BF7\u57FA\u4E8E\u6700\u8FD1\u7684 AI \u56DE\u590D\u4E3A\u5DE5\u5177\u201C${e?.name||t}\u201D\u751F\u6210\u7ED3\u6784\u5316\u8F93\u51FA\u3002`}function Fn(t={}){let e=new Date().toISOString(),r=t?.config||{};return{...Yt,...t,id:t?.id||Yt.id,icon:t?.icon||Yt.icon,order:Number.isFinite(t?.order)?t.order:Yt.order,promptTemplate:typeof t?.promptTemplate=="string"?t.promptTemplate:Yt.promptTemplate,extractTags:Bo(t?.extractTags),config:{execution:{...Yt.config.execution,...r.execution||{},timeout:vc(r?.execution?.timeout,Yt.config.execution.timeout),retries:Math.max(0,parseInt(r?.execution?.retries,10)||Yt.config.execution.retries)},api:{...Yt.config.api,...r.api||{}},messages:Array.isArray(r?.messages)?r.messages:[],context:{...Yt.config.context,...r.context||{},depth:vc(r?.context?.depth,Yt.config.context.depth),includeTags:Bo(r?.context?.includeTags),excludeTags:Bo(r?.context?.excludeTags)},automation:By(r?.automation),worldbooks:zy(r?.worldbooks)},enabled:t?.enabled!==!1,metadata:{...Yt.metadata,...t?.metadata||{},createdAt:t?.metadata?.createdAt||e,updatedAt:t?.metadata?.updatedAt||e}}}function zo(t,e={},r={}){let n=Fn({...e,id:t||e?.id||""}),s=Bo(n?.extractTags?.length?n.extractTags:n?.config?.context?.includeTags),o=String(e?.output?.apiPreset||n?.config?.api?.preset||"").trim(),a=Ev(t,n),i=typeof e?.output?.mode=="string"&&e.output.mode.trim()?e.output.mode.trim():r.defaultOutputMode||"follow_ai";return{id:n.id||t,name:n.name||t,icon:n.icon||"fa-screwdriver-wrench",description:n.description||"",enabled:n.enabled!==!1,order:Number.isFinite(n.order)?n.order:100,bypass:{enabled:n?.config?.api?.useBypass===!0&&!!n?.config?.api?.bypassPreset,presetId:n?.config?.api?.bypassPreset||""},output:{mode:i,apiPreset:o,overwrite:!0,enabled:!0},automation:By(n?.config?.automation),worldbooks:zy(n?.config?.worldbooks),extraction:{enabled:!0,maxMessages:vc(n?.config?.context?.depth,5),selectors:s,regexPresetId:typeof n?.config?.extraction?.regexPresetId=="string"?n.config.extraction.regexPresetId:"",writebackTag:typeof n?.config?.extraction?.writebackTag=="string"?n.config.extraction.writebackTag:""},promptTemplate:a,runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},apiPreset:o,extractTags:s,isCustom:!0,category:n.category||"utility",metadata:{...n.metadata||{}}}}function mr(){let t=Ce.get(He.TOOLS),e=Tv(t);return t&&JSON.stringify(t)!==JSON.stringify(e)&&Ce.set(He.TOOLS,e),{...ri,...e}}function hr(t){return mr()[t]||null}function _s(t,e){if(!t||!e)return!1;let r=Ce.get(He.TOOLS)||{},n=!r[t]&&!ri[t],s=Fn({...r[t]||{},...e,id:t,metadata:{...r[t]?.metadata||{},...e.metadata||{},createdAt:r[t]?.metadata?.createdAt||e?.metadata?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString()}});return r[t]=s,Ce.set(He.TOOLS,r),G.emit(n?F.TOOL_REGISTERED:F.TOOL_UPDATED,{toolId:t,tool:s}),!0}function Es(t){let e=Ce.get(He.TOOLS)||{};return!e[t]&&!ri[t]||ri[t]?!1:(delete e[t],Ce.set(He.TOOLS,e),G.emit(F.TOOL_UNREGISTERED,{toolId:t}),!0)}function ni(){return Ce.get(He.PRESETS)||{}}function Ky(t,e){if(!t||!e)return!1;let r=ni(),n=!r[t];return r[t]={...e,name:t,updatedAt:new Date().toISOString()},Ce.set(He.PRESETS,r),G.emit(n?F.PRESET_CREATED:F.PRESET_UPDATED,{type:"tool",presetName:t,preset:r[t]}),!0}function jy(t){let e=ni();return e[t]?(delete e[t],Ce.set(He.PRESETS,e),G.emit(F.PRESET_DELETED,{type:"tool",presetName:t}),!0):!1}function Uy(){return Ce.get(He.CURRENT_PRESET)||""}function Fy(t){return Ce.set(He.CURRENT_PRESET,t||""),G.emit(F.PRESET_ACTIVATED,{type:"tool",presetName:t}),!0}function si(t,e){let r=hr(t);if(!r)return!1;let n=Ce.get(He.TOOLS)||{};return n[t]=Fn({...r,id:t,enabled:e,metadata:{...r?.metadata||{},createdAt:r?.metadata?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString()}}),Ce.set(He.TOOLS,n),G.emit(e?F.TOOL_ENABLED:F.TOOL_DISABLED,{toolId:t,enabled:e}),!0}function As(){let t=Ce.get(He.TOOLS)||{},e=Ce.get(He.PRESETS)||{};return JSON.stringify({version:"1.0.0",exportedAt:new Date().toISOString(),tools:t,presets:e},null,2)}function Cs(t,e=!1){try{let r=typeof e=="object"?!!e?.overwrite:!!e,n=JSON.parse(t);if(!n||typeof n!="object")return{success:!1,toolsImported:0,presetsImported:0,message:"\u65E0\u6548\u7684JSON\u683C\u5F0F"};let s=r?{}:Ce.get(He.TOOLS)||{},o=r?{}:Ce.get(He.PRESETS)||{},a=0,i=0;if(n.tools&&typeof n.tools=="object"){for(let[l,d]of Object.entries(n.tools))!d||typeof d!="object"||(s[l]=Fn({...d,id:l}),a+=1);Ce.set(He.TOOLS,s)}if(n.presets&&typeof n.presets=="object"){for(let[l,d]of Object.entries(n.presets))!d||typeof d!="object"||(o[l]={...d,name:l,updatedAt:new Date().toISOString()},i+=1);Ce.set(He.PRESETS,o)}return{success:!0,toolsImported:a,presetsImported:i,message:`\u6210\u529F\u5BFC\u5165 ${a} \u4E2A\u5DE5\u5177\u548C ${i} \u4E2A\u9884\u8BBE`}}catch(r){return log.error("\u5DE5\u5177\u5BFC\u5165\u5931\u8D25",{error:r}),{success:!1,toolsImported:0,presetsImported:0,message:`\u5BFC\u5165\u5931\u8D25: ${r.message}`}}}function ks(){Ce.remove(He.TOOLS),Ce.remove(He.PRESETS),Ce.remove(He.CURRENT_PRESET)}var Yt,ri,He,Av,Ko=O(()=>{We();at();Yt={id:"",name:"",description:"",icon:"fa-screwdriver-wrench",order:100,category:"utility",promptTemplate:"",extractTags:[],config:{execution:{timeout:6e4,retries:3},api:{preset:"",useBypass:!1,bypassPreset:""},messages:[],context:{depth:3,includeTags:[],excludeTags:[]},automation:{settleMs:1200,cooldownMs:5e3},worldbooks:{enabled:!1,selected:[]}},enabled:!0,metadata:{createdAt:null,updatedAt:null,author:"",version:"1.0.0"}},ri={},He={TOOLS:"tools",PRESETS:"tool_presets",CURRENT_PRESET:"current_tool_preset"};Av={getAllTools:mr,getTool:hr,saveTool:_s,deleteTool:Es,setToolEnabled:si,exportTools:As,importTools:Cs,resetTools:ks,getToolPresets:ni,saveToolPreset:Ky,deleteToolPreset:jy,getCurrentToolPreset:Uy,setCurrentToolPreset:Fy,createDefaultToolDefinition:Fn,normalizeToolDefinitionToRuntimeConfig:zo}});var kc={};ue(kc,{TOOL_CATEGORIES:()=>Hy,TOOL_REGISTRY:()=>Is,appendToolRuntimeHistory:()=>nf,clearToolApiPreset:()=>ef,default:()=>$v,ensureToolRuntimeConfig:()=>Rs,getAllDefaultToolConfigs:()=>of,getAllToolApiBindings:()=>tf,getAllToolFullConfigs:()=>Fo,getEnabledTools:()=>af,getToolApiPreset:()=>Ac,getToolBaseConfig:()=>oi,getToolConfig:()=>Uo,getToolFullConfig:()=>ye,getToolList:()=>Jy,getToolSubTabs:()=>Xy,getToolWindowState:()=>cf,hasTool:()=>Ec,onPresetDeleted:()=>rf,patchToolRuntime:()=>en,registerTool:()=>Yy,resetToolConfig:()=>sf,resetToolRegistry:()=>Qy,saveToolConfig:()=>Le,saveToolWindowState:()=>lf,setToolApiPreset:()=>Zy,setToolApiPresetConfig:()=>Mv,setToolBypassConfig:()=>Pv,setToolOutputMode:()=>Rv,setToolPromptTemplate:()=>Nv,unregisterTool:()=>Vy,updateToolRuntime:()=>Cc});function Wn(t={}){let e=Array.isArray(t?.recentWritebackHistory)?t.recentWritebackHistory.filter(Boolean):[];return{lastRunAt:Number.isFinite(t?.lastRunAt)?t.lastRunAt:0,lastStatus:typeof t?.lastStatus=="string"?t.lastStatus:"idle",lastError:typeof t?.lastError=="string"?t.lastError:"",lastDurationMs:Number.isFinite(t?.lastDurationMs)?t.lastDurationMs:0,successCount:Number.isFinite(t?.successCount)?t.successCount:0,errorCount:Number.isFinite(t?.errorCount)?t.errorCount:0,lastMessageKey:typeof t?.lastMessageKey=="string"?t.lastMessageKey:"",lastExecutionKey:typeof t?.lastExecutionKey=="string"?t.lastExecutionKey:"",lastExecutionPath:typeof t?.lastExecutionPath=="string"?t.lastExecutionPath:"",lastWritebackStatus:typeof t?.lastWritebackStatus=="string"?t.lastWritebackStatus:"",lastFailureStage:typeof t?.lastFailureStage=="string"?t.lastFailureStage:"",lastSlotBindingKey:typeof t?.lastSlotBindingKey=="string"?t.lastSlotBindingKey:"",lastSlotRevisionKey:typeof t?.lastSlotRevisionKey=="string"?t.lastSlotRevisionKey:"",lastSlotTransactionId:typeof t?.lastSlotTransactionId=="string"?t.lastSlotTransactionId:"",lastSourceMessageId:typeof t?.lastSourceMessageId=="string"?t.lastSourceMessageId:"",lastSourceSwipeId:typeof t?.lastSourceSwipeId=="string"?t.lastSourceSwipeId:"",lastContentCommitted:t?.lastContentCommitted===!0,lastHostCommitApplied:t?.lastHostCommitApplied===!0,lastRefreshRequested:t?.lastRefreshRequested===!0,lastRefreshConfirmed:t?.lastRefreshConfirmed===!0,lastPreferredCommitMethod:typeof t?.lastPreferredCommitMethod=="string"?t.lastPreferredCommitMethod:"",lastAppliedCommitMethod:typeof t?.lastAppliedCommitMethod=="string"?t.lastAppliedCommitMethod:"",lastRefreshMethodCount:Number.isFinite(t?.lastRefreshMethodCount)?t.lastRefreshMethodCount:0,lastRefreshMethods:Array.isArray(t?.lastRefreshMethods)?t.lastRefreshMethods.filter(Boolean):[],lastRefreshConfirmChecks:Number.isFinite(t?.lastRefreshConfirmChecks)?t.lastRefreshConfirmChecks:0,lastRefreshConfirmedBy:typeof t?.lastRefreshConfirmedBy=="string"?t.lastRefreshConfirmedBy:"",lastTraceId:typeof t?.lastTraceId=="string"?t.lastTraceId:"",lastAutoRunAt:Number.isFinite(t?.lastAutoRunAt)?t.lastAutoRunAt:0,lastAutoStatus:typeof t?.lastAutoStatus=="string"?t.lastAutoStatus:"idle",lastAutoMessageId:typeof t?.lastAutoMessageId=="string"?t.lastAutoMessageId:"",lastAutoSwipeId:typeof t?.lastAutoSwipeId=="string"?t.lastAutoSwipeId:"",lastAutoRevisionKey:typeof t?.lastAutoRevisionKey=="string"?t.lastAutoRevisionKey:"",lastAutoWritebackStatus:typeof t?.lastAutoWritebackStatus=="string"?t.lastAutoWritebackStatus:"",lastAutoRefreshConfirmed:t?.lastAutoRefreshConfirmed===!0,lastAutoSkipReason:typeof t?.lastAutoSkipReason=="string"?t.lastAutoSkipReason:"",recentWritebackHistory:e}}function Cv(t,e=10){let r=Number.isFinite(e)?Math.max(1,Math.min(50,Math.floor(e))):10;return Array.isArray(t)?t.length<=r?t:t.slice(t.length-r):[]}function Gy(){let t=mr()||{};return Object.entries(t).filter(([e])=>!jo[e]).map(([e,r])=>[e,r||{}])}function Sc(t={}){return t?.toolKind==="script"?"script":t?.toolKind==="ai"?"ai":t?.output?.mode==="local_transform"||t?.processor?.type?"script":"ai"}function qy(){let t=Array.isArray(Is.tools?.subTabs)?Is.tools.subTabs.map((r,n)=>({...r,order:Number.isFinite(r?.order)?r.order:n,toolKind:Sc(r),toolGroupLabel:Sc(r)==="script"?"\u811A\u672C\u5DE5\u5177":"AI \u5DE5\u5177"})):[],e=Gy().map(([r,n],s)=>{let o=zo(r,n),a=Sc(o);return{id:r,name:o.name||r,icon:o.icon||"fa-screwdriver-wrench",component:"GenericToolConfigPanel",order:Number.isFinite(o.order)?o.order:100+s,isCustom:!0,description:o.description||"",toolKind:a,toolGroupLabel:a==="script"?"\u811A\u672C\u5DE5\u5177":"AI \u5DE5\u5177"}});return[...t,...e].sort((r,n)=>(r.order??0)-(n.order??0))}function kv(t,e={}){let r=zo(t,e,{defaultOutputMode:"follow_ai"});return{...r,runtime:Wn(r.runtime)}}function _c(t){let e=jo[t];if(e)return{...e,output:{...e.output||{}},bypass:{...e.bypass||{}},worldbooks:{...e.worldbooks||{},selected:Array.isArray(e?.worldbooks?.selected)?[...e.worldbooks.selected]:[]},extraction:{...e.extraction||{}},processor:{...e.processor||{},options:{...e?.processor?.options||{}}},runtime:Wn(e.runtime),extractTags:Array.isArray(e.extractTags)?[...e.extractTags]:[]};let n=(mr()||{})[t]||null;return n?kv(t,n):Uo(t)}function oi(t){let e=_c(t);return e?{...e,output:{...e.output||{}},automation:{...e.automation||{}},bypass:{...e.bypass||{}},worldbooks:{...e.worldbooks||{},selected:Array.isArray(e?.worldbooks?.selected)?[...e.worldbooks.selected]:[]},extraction:{...e.extraction||{},selectors:Array.isArray(e?.extraction?.selectors)?[...e.extraction.selectors]:[]},processor:{...e.processor||{},options:{...e?.processor?.options||{}}},runtime:{...e.runtime||{}},extractTags:Array.isArray(e.extractTags)?[...e.extractTags]:[]}:null}function Iv(t,e={},r=""){if(!t)return null;let n={...t,...e,id:t.id||e.id};n.output={...t.output||{},...e.output||{}},n.automation={settleMs:Number.isFinite(e?.automation?.settleMs)?e.automation.settleMs:Number.isFinite(t?.automation?.settleMs)?t.automation.settleMs:1200,cooldownMs:Number.isFinite(e?.automation?.cooldownMs)?e.automation.cooldownMs:Number.isFinite(t?.automation?.cooldownMs)?t.automation.cooldownMs:5e3},n.bypass={...t.bypass||{},...e.bypass||{}},n.worldbooks={...t.worldbooks||{},...e.worldbooks||{},selected:Array.isArray(e?.worldbooks?.selected)?[...e.worldbooks.selected]:Array.isArray(t?.worldbooks?.selected)?[...t.worldbooks.selected]:[]},n.runtime=Wn({...t.runtime||{},...e.runtime||{}}),n.extraction={...t.extraction||{},...e.extraction||{}},n.processor={...t.processor||{},...e.processor||{},options:{...t?.processor?.options||{},...e?.processor?.options||{}}};let s=e?.output?.apiPreset||e?.apiPreset||n.output?.apiPreset||n.apiPreset||r||"";return n.output={...n.output||{},apiPreset:s},n.apiPreset=s,t.isCustom?n.enabled=t.enabled!==!1:typeof e.enabled=="boolean"?n.enabled=e.enabled:n.enabled=t.enabled!==!1,n}function Yy(t,e){if(!t||typeof t!="string")return ct.error("\u5DE5\u5177ID\u65E0\u6548"),!1;if(!e||typeof e!="object")return ct.error("\u5DE5\u5177\u914D\u7F6E\u65E0\u6548"),!1;let r=["name","icon","component"];for(let n of r)if(!e[n])return ct.error(` \u5DE5\u5177\u7F3A\u5C11\u5FC5\u9700\u5B57\u6BB5: ${n}`),!1;return br[t]={id:t,...e,order:e.order??Object.keys(br).length},ct.log(` \u5DE5\u5177\u5DF2\u6CE8\u518C: ${t}`),!0}function Vy(t){return br[t]?(delete br[t],ct.log(` \u5DE5\u5177\u5DF2\u6CE8\u9500: ${t}`),!0):(ct.warn(` \u5DE5\u5177\u4E0D\u5B58\u5728: ${t}`),!1)}function Jy(t=!0){let e=Object.values(br).map(r=>r.id==="tools"?{...r,subTabs:qy()}:r);return t?e.sort((r,n)=>(r.order??0)-(n.order??0)):e}function Uo(t){return t==="tools"&&br[t]?{...br[t],subTabs:qy()}:br[t]||null}function Ec(t){return!!br[t]}function Xy(t){let e=Uo(t);return!e||!e.hasSubTabs?[]:e.subTabs||[]}function Qy(){br={...Is},ct.log("\u5DE5\u5177\u6CE8\u518C\u8868\u5DF2\u91CD\u7F6E")}function Zy(t,e){if(!Ec(t))return ct.warn(` \u5DE5\u5177\u4E0D\u5B58\u5728: ${t}`),!1;let r=j.get(Vt)||{};return r[t]=e||"",j.set(Vt,r),ct.log(` \u5DE5\u5177 "${t}" \u7ED1\u5B9A\u5230\u9884\u8BBE "${e||"\u5F53\u524D\u914D\u7F6E"}"`),!0}function Ac(t){return(j.get(Vt)||{})[t]||""}function ef(t){let e=j.get(Vt)||{};delete e[t],j.set(Vt,e),ct.log(` \u5DE5\u5177 "${t}" \u7684API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u6E05\u9664`)}function tf(){return j.get(Vt)||{}}function rf(t){let e=j.get(Vt)||{},r=!1;for(let n in e)e[n]===t&&(e[n]="",r=!0,ct.log(` \u5DE5\u5177 "${n}" \u7684API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u6E05\u9664\uFF08\u9884\u8BBE\u88AB\u5220\u9664\uFF09`));r&&j.set(Vt,e)}function ye(t){let e=_c(t);if(!e)return Uo(t);let n=(j.get(Zr)||{})[t]||{},s=Ac(t),o=Iv({...e,id:t},n,s);return ct.debug(`[PRESET] getToolFullConfig ${t}`,{base_extraction:JSON.parse(JSON.stringify(e.extraction||{})),base_worldbooks:JSON.parse(JSON.stringify(e.worldbooks||{})),user_extraction:JSON.parse(JSON.stringify(n.extraction||{})),user_worldbooks:JSON.parse(JSON.stringify(n.worldbooks||{})),merged_extraction:JSON.parse(JSON.stringify(o.extraction||{})),merged_worldbooks:JSON.parse(JSON.stringify(o.worldbooks||{}))}),o}function Rs(t){if(!t)return!1;let e=_c(t);if(!e)return!1;let r=j.get(Zr)||{};if(r[t])return!0;let n={promptTemplate:e.promptTemplate||"",enabled:e.enabled!==!1,extractTags:Array.isArray(e.extractTags)?[...e.extractTags]:[],apiPreset:e.apiPreset||"",output:{...e.output||{}},automation:{...e.automation||{}},bypass:{...e.bypass||{}},worldbooks:{...e.worldbooks||{},selected:Array.isArray(e?.worldbooks?.selected)?[...e.worldbooks.selected]:[]},extraction:{...e.extraction||{},selectors:Array.isArray(e?.extraction?.selectors)?[...e.extraction.selectors]:[]},processor:{...e.processor||{},options:{...e?.processor?.options||{}}},runtime:{...e.runtime||{}}};r[t]=n,j.set(Zr,r);let s=j.get(Vt)||{};return s[t]=n.output?.apiPreset||n.apiPreset||"",j.set(Vt,s),G.emit(F.TOOL_UPDATED,{toolId:t,config:n}),!0}function Le(t,e,r={}){if(!t||!ye(t))return ct.warn("\u5DE5\u5177\u4E0D\u5B58\u5728:",t),!1;let{emitEvent:n=!0}=r,s=j.get(Zr)||{},o=j.get(Vt)||{},a=e?.output?.apiPreset??e?.apiPreset??"",i=["promptTemplate","enabled","extractTags","apiPreset","output","automation","bypass","worldbooks","extraction","processor","runtime"];return s[t]={},i.forEach(l=>{if(e[l]!==void 0){if(l==="output"&&e.output){s[t][l]={...e.output,apiPreset:a};return}if(l==="apiPreset"){s[t][l]=a;return}s[t][l]=e[l]}}),s[t].apiPreset===void 0&&(s[t].apiPreset=a),!s[t].output&&e.output!==void 0&&(s[t].output={...e.output||{},apiPreset:a}),j.set(Zr,s),o[t]=a,j.set(Vt,o),ct.debug(`[PRESET] saveToolConfig ${t}`,{input_extraction:JSON.parse(JSON.stringify(e.extraction||{})),input_worldbooks:JSON.parse(JSON.stringify(e.worldbooks||{})),saved_extraction:JSON.parse(JSON.stringify(s[t].extraction||{})),saved_worldbooks:JSON.parse(JSON.stringify(s[t].worldbooks||{})),verify_storage:JSON.parse(JSON.stringify((j.get(Zr)||{})[t]?.extraction||{}))}),n&&G.emit(F.TOOL_UPDATED,{toolId:t,config:s[t]}),ct.log(` \u5DE5\u5177\u914D\u7F6E\u5DF2\u4FDD\u5B58: ${t}`),!0}function Rv(t,e){let r=ye(t);return r?Le(t,{...r,output:{...r.output,mode:e}}):!1}function Mv(t,e){let r=ye(t);return r?Le(t,{...r,apiPreset:e,output:{...r.output,apiPreset:e}}):!1}function Pv(t,e){let r=ye(t);return r?Le(t,{...r,bypass:{...r.bypass,...e}}):!1}function Nv(t,e){let r=ye(t);return r?Le(t,{...r,promptTemplate:e}):!1}function en(t,e,r={}){let n=ye(t);if(!n)return!1;let{touchLastRunAt:s=!1,emitEvent:o=!1,emitRuntimeEvent:a=!0}=r,i=Wn({...n.runtime||{},...e||{}});s&&(i.lastRunAt=Date.now());let l=Le(t,{...n,runtime:i},{emitEvent:o});return l&&a&&G.emit(F.TOOL_RUNTIME_UPDATED,{toolId:t,runtime:i,previousRuntime:Wn(n.runtime||{})}),l}function nf(t,e,r={},n={}){let s=ye(t);if(!s)return!1;let{limit:o=10,emitEvent:a=!1,emitRuntimeEvent:i=!0}=n,l=Wn(s.runtime||{}),d=Wn(s.runtime||{}),c="recentWritebackHistory",u={id:r?.id||`hist_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,at:r?.at||Date.now(),...r};l[c]=Cv([...Array.isArray(l[c])?l[c]:[],u],o),u?.traceId&&(l.lastTraceId=u.traceId);let y=Le(t,{...s,runtime:l},{emitEvent:a});return y&&i&&G.emit(F.TOOL_RUNTIME_UPDATED,{toolId:t,runtime:l,previousRuntime:d,historyType:e,historyEntry:u}),y}function Cc(t,e,r={}){let{touchLastRunAt:n=!0,emitEvent:s=!1,emitRuntimeEvent:o=!0}=r;return en(t,e,{touchLastRunAt:n,emitEvent:s,emitRuntimeEvent:o})}function sf(t){if(!t||!jo[t])return ct.warn("\u5DE5\u5177\u4E0D\u5B58\u5728:",t),!1;let e=j.get(Zr)||{};return delete e[t],j.set(Zr,e),G.emit(F.TOOL_UPDATED,{toolId:t,config:null}),ct.log(` \u5DE5\u5177\u914D\u7F6E\u5DF2\u91CD\u7F6E: ${t}`),!0}function of(){return{...jo}}function Fo(){let t=new Set([...Object.keys(jo),...Gy().map(([e])=>e)]);return Array.from(t).map(e=>ye(e)).filter(Boolean)}function af(){return Fo().filter(t=>t&&t.enabled)}function lf(t,e){let r=j.get(Tc)||{};r[t]={...e,updatedAt:Date.now()},j.set(Tc,r)}function cf(t){return(j.get(Tc)||{})[t]||null}var ct,Zr,Vt,Tc,jo,Is,Hy,br,$v,xr=O(()=>{We();at();Y();Ko();ct=I.createScope("ToolRegistry"),Zr="tool_configs",Vt="tool_api_bindings",Tc="tool_window_states";jo={summaryTool:{id:"summaryTool",name:"\u6458\u8981\u5DE5\u5177",icon:"fa-file-lines",description:"\u751F\u6210\u5267\u60C5\u6458\u8981\u5757",enabled:!0,order:3,bypass:{enabled:!1,presetId:""},output:{mode:"follow_ai",apiPreset:"",overwrite:!0,enabled:!0},automation:{settleMs:1200,cooldownMs:5e3},worldbooks:{enabled:!1,selected:[]},extraction:{enabled:!0,maxMessages:5,regexPresetId:"builtin_regex_summary"},promptTemplate:`\u8BF7\u6839\u636E\u4EE5\u4E0BAI\u56DE\u590D\u751F\u6210\u6458\u8981\u5757\uFF1A

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
</youyou>`,runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},apiPreset:"",extractTags:[]},escapeTransformTool:{id:"escapeTransformTool",name:"\u8F6C\u4E49\u5904\u7406",icon:"fa-quote-left",description:"\u5BF9\u63D0\u53D6\u5185\u5BB9\u6267\u884C\u672C\u5730\u8F6C\u4E49\u6216\u53BB\u8F6C\u4E49",enabled:!0,order:6,output:{mode:"local_transform",apiPreset:"",overwrite:!0,enabled:!0,autoTrigger:!0},extraction:{enabled:!0,maxMessages:5,selectors:[]},processor:{type:"escape_transform",direction:"escape",options:{doubleQuote:!0,singleQuote:!1,newline:!1}},runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},extractTags:[]},punctuationTransformTool:{id:"punctuationTransformTool",name:"\u4E2D\u6587\u6807\u70B9\u66FF\u6362",icon:"fa-language",description:"\u5C06\u82F1\u6587\u6807\u70B9\u6309\u52FE\u9009\u9879\u66FF\u6362\u4E3A\u4E2D\u6587\u6807\u70B9",enabled:!0,order:7,output:{mode:"local_transform",apiPreset:"",overwrite:!0,enabled:!0,autoTrigger:!0},extraction:{enabled:!0,maxMessages:5,selectors:[]},processor:{type:"punctuation_transform",direction:"en_to_zh",options:{comma:!0,period:!0,exclamation:!0,question:!0,semicolon:!1,colon:!1,leftParen:!1,rightParen:!1}},runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},extractTags:[]}},Is={presetManagement:{id:"presetManagement",name:"\u9884\u8BBE\u7BA1\u7406",icon:"fa-bookmark",hasSubTabs:!0,description:"\u7EDF\u4E00\u7BA1\u7406 API / \u6B63\u5219 / \u4E16\u754C\u4E66 / \u8868\u683C\u6A21\u677F\u9884\u8BBE",order:0,subTabs:[{id:"apiPresets",name:"API \u9884\u8BBE",icon:"fa-database",component:"ApiPresetPanel",presetKind:"api"},{id:"regexPresets",name:"\u6B63\u5219\u63D0\u53D6",icon:"fa-filter",component:"RegexExtractPanel",presetKind:"regex"},{id:"worldbookPresets",name:"\u4E16\u754C\u4E66",icon:"fa-book-atlas",component:"WorldbookPresetPanel",presetKind:"worldbook"},{id:"tableTemplates",name:"\u8868\u683C\u6A21\u677F",icon:"fa-table-list",component:"TableTemplatePanel",presetKind:"table"}]},tools:{id:"tools",name:"\u5DE5\u5177",icon:"fa-tools",hasSubTabs:!0,description:"\u5DE5\u5177\u96C6\u5408",order:4,subTabs:[{id:"summaryTool",name:"\u6458\u8981\u5DE5\u5177",icon:"fa-file-lines",component:"SummaryToolPanel",toolKind:"ai"},{id:"statusBlock",name:"\u4E3B\u89D2\u72B6\u6001\u680F",icon:"fa-user-check",component:"StatusBlockPanel",toolKind:"ai"},{id:"youyouReview",name:"\u5C0F\u5E7D\u70B9\u8BC4",icon:"fa-comment-dots",component:"YouyouReviewPanel",toolKind:"ai"},{id:"escapeTransformTool",name:"\u8F6C\u4E49\u5904\u7406",icon:"fa-quote-left",component:"EscapeTransformToolPanel",toolKind:"script"},{id:"punctuationTransformTool",name:"\u4E2D\u6587\u6807\u70B9\u66FF\u6362",icon:"fa-language",component:"PunctuationTransformToolPanel",toolKind:"script"}]},tableWorkbench:{id:"tableWorkbench",name:"\u586B\u8868\u5DE5\u4F5C\u53F0",icon:"fa-table-cells",hasSubTabs:!1,description:"\u7ED3\u6784\u5316\u586B\u8868\u4E0E\u72B6\u6001\u9884\u89C8\u5DE5\u4F5C\u53F0",component:"TableWorkbenchPanel",order:5},bypass:{id:"bypass",name:"Ai\u6307\u4EE4\u9884\u8BBE",icon:"fa-shield-halved",hasSubTabs:!1,description:"\u7BA1\u7406 Ai \u6307\u4EE4\u9884\u8BBE",component:"BypassPanel",order:6},settings:{id:"settings",name:"\u8BBE\u7F6E",icon:"fa-cog",hasSubTabs:!1,description:"\u5168\u5C40\u8BBE\u7F6E",component:"SettingsPanel",order:7},logger:{id:"logger",name:"\u65E5\u5FD7",icon:"fa-terminal",hasSubTabs:!1,description:"\u67E5\u770B\u63D2\u4EF6\u8FD0\u884C\u65E5\u5FD7\uFF0C\u652F\u6301\u8FC7\u6EE4\u4E0E\u5BFC\u51FA",component:"LoggerPanel",order:8}},Hy={api:{name:"API\u5DE5\u5177",icon:"fa-plug",order:0},prompt:{name:"\u63D0\u793A\u8BCD\u5DE5\u5177",icon:"fa-file-alt",order:1},utility:{name:"\u5B9E\u7528\u5DE5\u5177",icon:"fa-wrench",order:2}},br={...Is};$v={TOOL_REGISTRY:Is,TOOL_CATEGORIES:Hy,registerTool:Yy,unregisterTool:Vy,getToolList:Jy,getToolConfig:Uo,hasTool:Ec,getToolSubTabs:Xy,resetToolRegistry:Qy,setToolApiPreset:Zy,getToolApiPreset:Ac,clearToolApiPreset:ef,getAllToolApiBindings:tf,onPresetDeleted:rf,saveToolWindowState:lf,getToolWindowState:cf,getToolBaseConfig:oi,ensureToolRuntimeConfig:Rs,getToolFullConfig:ye,patchToolRuntime:en,appendToolRuntimeHistory:nf,saveToolConfig:Le,resetToolConfig:sf,getAllDefaultToolConfigs:of,getAllToolFullConfigs:Fo,getEnabledTools:af}});function li(){return`rgx_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`}function yf(){return`r_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,6)}`}function Mc(t={}){let e=Object.values(sr).includes(t.type)?t.type:sr.INCLUDE;return{id:String(t.id||yf()),name:String(t.name||"").trim(),description:String(t.description||""),type:e,value:String(t.value||""),enabled:t.enabled!==!1}}function wr(t={}){return{id:String(t.id||li()),name:String(t.name||"").trim()||"\u672A\u547D\u540D\u9884\u8BBE",description:String(t.description||""),rules:Array.isArray(t.rules)?t.rules.map(Mc):[],blacklist:Array.isArray(t.blacklist)?t.blacklist.map(e=>String(e||"").trim()).filter(Boolean):[],createdAt:Number.isFinite(t.createdAt)?t.createdAt:Date.now(),updatedAt:Number.isFinite(t.updatedAt)?t.updatedAt:Date.now()}}function Rr(){let t=Oe.get(Rc);return!t||typeof t!="object"?{}:t}function Wo(t){Oe.set(Rc,t)}function Hn(t){return typeof t=="string"&&t.startsWith(Ov)}function ff(t){return Hn(t)&&ai.find(e=>e.id===t)||null}function Pc(t){if(!Array.isArray(t)){ai=[];return}ai=t.map(e=>wr({...e,id:String(e?.id||"")})).filter(e=>Hn(e.id))}function Ps(){if(pf)return;pf=!0;let t=j.get(df)||{};if(t[uf]===!0)return;let e=Rr(),r=Object.keys(e).length>0,n=0,s={...e},o=t.tagRulePresets||{};for(let a of Object.values(o)){let i=wr({id:li(),name:a.name||"\u5DF2\u8FC1\u79FB\u9884\u8BBE",description:a.description||"",rules:a.rules||[],blacklist:a.blacklist||[],createdAt:typeof a.createdAt=="string"&&Date.parse(a.createdAt)||Date.now(),updatedAt:Date.now()});s[i.id]=i,n+=1}if(!r&&n===0){let a=Array.isArray(t.tagRules)?t.tagRules:[],i=Array.isArray(t.contentBlacklist)?t.contentBlacklist:[];if(a.length||i.length){let l=wr({name:"\u9ED8\u8BA4\u89C4\u5219\u96C6\uFF08\u8FC1\u79FB\uFF09",description:"\u4ECE\u8001\u7248\u672C\u7684\u5F53\u524D\u89C4\u5219\u8FC1\u79FB\u800C\u6765",rules:a,blacklist:i});s[l.id]=l,Oe.set(Ms,l.id),n+=1}}n>0&&(Wo(s),tn.info(`\u5DF2\u4ECE\u8001\u6570\u636E\u8FC1\u79FB ${n} \u4E2A\u6B63\u5219\u9884\u8BBE`)),j.set(df,{...t,[uf]:!0})}function Lv(){Ps();let t=Rr(),e=new Set,r=[];for(let s of ai){let o=t[s.id];o?(r.push(wr(o)),e.add(s.id)):r.push(s)}let n=Object.values(t).map(wr).filter(s=>!e.has(s.id)).sort((s,o)=>o.updatedAt-s.updatedAt);return r.push(...n),r}function Mr(t){if(!t)return null;Ps();let e=Rr();return e[t]?wr(e[t]):Hn(t)?ff(t):null}function ci(){Ps();let t=Oe.get(Ms);return typeof t=="string"&&t?t:""}function gf(){let t=ci();return t?Mr(t):null}function Dv(t){if(t&&Hn(t))return Oe.set(Ms,t),ii(),G.emit(F.PRESET_ACTIVATED,{kind:"regex",id:t}),!0;let e=Rr();return t&&!e[t]?(tn.warn(`setCurrentPresetId \u627E\u4E0D\u5230\u9884\u8BBE: ${t}`),!1):(Oe.set(Ms,t||""),ii(),G.emit(F.PRESET_ACTIVATED,{kind:"regex",id:t}),!0)}function di(t={}){Ps();let e=wr({...t,id:li(),createdAt:Date.now(),updatedAt:Date.now()}),r=Rr();return r[e.id]=e,Wo(r),G.emit(F.PRESET_CREATED,{kind:"regex",id:e.id}),tn.info(`\u521B\u5EFA\u9884\u8BBE: ${e.id} (${e.name})`),e}function Gn(t,e={}){if(!t)return null;let r=Rr(),n=r[t];if(!n&&Hn(t)&&(n=ff(t)),!n)return null;let s=wr({...n,...e,id:t,createdAt:n.createdAt,updatedAt:Date.now()});return r[t]=s,Wo(r),ci()===t&&Ic(s),G.emit(F.PRESET_UPDATED,{kind:"regex",id:t}),s}function Bv(t){if(!t)return!1;if(Hn(t))return tn.warn(`\u62D2\u7EDD\u5220\u9664\u5185\u7F6E\u9884\u8BBE: ${t}`),!1;let e=Rr();return e[t]?(delete e[t],Wo(e),ci()===t&&(Oe.set(Ms,""),ii()),G.emit(F.PRESET_DELETED,{kind:"regex",id:t}),tn.info(`\u5220\u9664\u9884\u8BBE: ${t}`),!0):!1}function zv(t,{nameSuffix:e=" \u526F\u672C"}={}){let r=Mr(t);return r?di({...r,id:void 0,name:`${r.name}${e}`}):null}function Kv(t,e){return Hn(t)?(tn.warn(`\u62D2\u7EDD\u91CD\u547D\u540D\u5185\u7F6E\u9884\u8BBE: ${t}`),null):Gn(t,{name:String(e||"").trim()||"\u672A\u547D\u540D\u9884\u8BBE"})}function jv(t,e={}){let r=Mr(t);if(!r)return null;let n=Mc({...e,id:yf()}),s=[...r.rules,n];return Gn(t,{rules:s})}function Uv(t,e,r={}){let n=Mr(t);if(!n)return null;let s=n.rules.map(o=>o.id===e?Mc({...o,...r,id:o.id}):o);return Gn(t,{rules:s})}function Fv(t,e){let r=Mr(t);if(!r)return null;let n=r.rules.filter(s=>s.id!==e);return Gn(t,{rules:n})}function Wv(t,e,r){let n=Mr(t);if(!n)return null;let s=n.rules.findIndex(i=>i.id===e);if(s<0)return null;let o=r==="up"?s-1:s+1;if(o<0||o>=n.rules.length)return null;let a=[...n.rules];return[a[s],a[o]]=[a[o],a[s]],Gn(t,{rules:a})}function Hv(t,e){let r=Array.isArray(e)?e.map(n=>String(n||"").trim()).filter(Boolean):[];return Gn(t,{blacklist:Array.from(new Set(r))})}function Gv(){return Ps(),{version:1,exportedAt:Date.now(),presets:Object.values(Rr()).map(wr)}}function qv(t){if(Ps(),!t||typeof t!="object")return{added:0};let e=Array.isArray(t.presets)?t.presets:[],r=Rr(),n=0;for(let s of e){let o=wr({...s,id:li(),createdAt:Date.now(),updatedAt:Date.now()});r[o.id]=o,n+=1}return n>0&&(Wo(r),G.emit(F.PRESET_IMPORTED,{kind:"regex",count:n})),{added:n}}function Yv(){Oe.set(Rc,{}),Oe.set(Ms,""),ii(),tn.info("\u5DF2\u6E05\u7A7A\u6240\u6709\u6B63\u5219\u9884\u8BBE")}async function Ic(t){if(t)try{let e=await Promise.resolve().then(()=>(Ts(),wc));typeof e.setCurrentRules=="function"&&e.setCurrentRules(JSON.parse(JSON.stringify(t.rules||[]))),typeof e.setContentBlacklist=="function"&&e.setContentBlacklist(JSON.parse(JSON.stringify(t.blacklist||[])))}catch(e){tn.warn("\u540C\u6B65\u5230 regex-extractor \u5931\u8D25",{error:e})}}function ii(){let t=gf();return Ic(t||{rules:[],blacklist:[]})}async function Vv(t){if(!t)return[];try{let e=await Promise.resolve().then(()=>(xr(),kc));return(typeof e.getToolList=="function"?e.getToolList(!1):[]).filter(n=>(typeof e.getToolFullConfig=="function"?e.getToolFullConfig(n.id):null)?.extraction?.regexPresetId===t).map(n=>n.id)}catch{return[]}}var tn,Rc,Ms,df,uf,sr,Ov,ai,pf,Re,rn=O(()=>{We();at();Y();tn=I.createScope("RegexPresetStore"),Rc="regex_presets",Ms="regex_current_preset",df="settings",uf="regex_presets_migrated",sr=Object.freeze({INCLUDE:"include",EXCLUDE:"exclude",REGEX_INCLUDE:"regex_include",REGEX_EXCLUDE:"regex_exclude"});Ov="builtin_regex_",ai=[];pf=!1;Re={listPresets:Lv,getPreset:Mr,getCurrentPresetId:ci,getCurrentPreset:gf,setCurrentPresetId:Dv,createPreset:di,updatePreset:Gn,deletePreset:Bv,duplicatePreset:zv,renamePreset:Kv,addRule:jv,updateRule:Uv,deleteRule:Fv,moveRule:Wv,setBlacklist:Hv,exportAll:Gv,importPresets:qv,resetAll:Yv,findLinkedTools:Vv,RULE_TYPES:sr}});var xf={};ue(xf,{RegexExtractPanel:()=>bf,default:()=>r0});function Xv(t,e,r,n,s,o){let a=f("div",{style:{display:"grid",gridTemplateColumns:"auto auto minmax(140px, 1fr) 200px minmax(120px, 2fr) auto",gap:"10px",alignItems:"center",padding:"10px 0",borderTop:r===0?"none":"1px solid var(--yyt-border)",opacity:e.enabled===!1?"0.55":"1"},attrs:{draggable:o?null:"true","data-rule-id":e.id}}),i=f("div",{style:{cursor:o?"default":"grab",padding:"4px",color:"var(--yyt-text-muted)",fontSize:"14px",userSelect:"none"},text:"\u22EE\u22EE",title:o?"\u5185\u7F6E\u9884\u8BBE\u4E0D\u53EF\u91CD\u6392":"\u62D6\u52A8\u6392\u5E8F"});a.appendChild(i);let l=f("div",{style:{display:"flex",flexDirection:"column",gap:"2px"}}),d=X({label:"\u25B2",size:"small",variant:"ghost",title:"\u4E0A\u79FB",disabled:o||r===0,style:{padding:"0 6px",minHeight:"auto",fontSize:"9px"},onClick:()=>{Re.moveRule(t.id,e.id,"up"),s()}}),c=X({label:"\u25BC",size:"small",variant:"ghost",title:"\u4E0B\u79FB",disabled:o||r===n-1,style:{padding:"0 6px",minHeight:"auto",fontSize:"9px"},onClick:()=>{Re.moveRule(t.id,e.id,"down"),s()}});l.appendChild(d.el),l.appendChild(c.el),a.appendChild(l);let u=f("div",{style:{display:"flex",flexDirection:"column",gap:"2px",minWidth:"0"}}),y=me({value:e.name||"",placeholder:"\u89C4\u5219\u540D\uFF08\u53EF\u9009\uFF09",disabled:o,style:{fontSize:"12px",padding:"6px 10px"},onChange:w=>Re.updateRule(t.id,e.id,{name:w})});u.appendChild(y.el),e.description&&u.appendChild(f("div",{text:e.description,style:{fontSize:"10px",color:"var(--yyt-text-muted)"}})),a.appendChild(u);let p=Ee({value:e.type,disabled:o,options:Jv,style:{fontSize:"11px",padding:"6px 10px"},onChange:w=>{Re.updateRule(t.id,e.id,{type:w}),s()}});a.appendChild(p.el);let g=e.type===sr.REGEX_INCLUDE||e.type===sr.REGEX_EXCLUDE,m=me({value:e.value||"",placeholder:g?"\u6B63\u5219\u8868\u8FBE\u5F0F...":"\u6807\u7B7E\u540D\uFF08\u5982 content\uFF09",disabled:o,style:{fontSize:"12px",padding:"6px 10px",fontFamily:"ui-monospace, monospace"},onChange:w=>Re.updateRule(t.id,e.id,{value:w})});a.appendChild(m.el);let h=f("div",{style:{display:"flex",gap:"6px",alignItems:"center"}}),b=Ye({checked:e.enabled!==!1,disabled:o,style:{padding:"0",border:"none",background:"transparent"},onChange:w=>{Re.updateRule(t.id,e.id,{enabled:w}),s()}});return h.appendChild(b.el),o||h.appendChild(X({label:"\xD7",size:"small",variant:"ghost",title:"\u5220\u9664\u89C4\u5219",onClick:()=>{Re.deleteRule(t.id,e.id),s()}}).el),a.appendChild(h),a}function Qv(t,e,r){let n=null;t.addEventListener("dragstart",s=>{let o=s.target;if(!(o instanceof HTMLElement))return;let a=o.closest("[data-rule-id]");if(a){n=a.getAttribute("data-rule-id"),a.style.opacity="0.4";try{s.dataTransfer.effectAllowed="move",s.dataTransfer.setData("text/plain",n)}catch{}}}),t.addEventListener("dragend",s=>{let o=s.target;o instanceof HTMLElement&&(o.style.opacity=""),n=null}),t.addEventListener("dragover",s=>{if(n){s.preventDefault();try{s.dataTransfer.dropEffect="move"}catch{}}}),t.addEventListener("drop",s=>{if(s.preventDefault(),!n)return;let o=s.target instanceof HTMLElement?s.target.closest("[data-rule-id]"):null;if(!o)return;let a=o.getAttribute("data-rule-id");if(!a||a===n)return;let i=Re.getPreset(e.id);if(!i)return;let l=i.rules.findIndex(y=>y.id===n),d=i.rules.findIndex(y=>y.id===a);if(l<0||d<0)return;let c=[...i.rules],[u]=c.splice(l,1);c.splice(d,0,u),Re.updatePreset(e.id,{rules:c}),r()})}function Zv(t,{onChange:e,readonly:r,refresh:n}){let s=f("div",{style:{display:"flex",flexDirection:"column",gap:"14px"}});V(s,Dt({label:"\u63CF\u8FF0",control:me({value:t.description,placeholder:"\u53EF\u9009 \u2014 \u5907\u6CE8\u7528\u9014",disabled:r,onChange:i=>e({description:i})})}));let o=f("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"6px"}},f("div",{text:"\u63D0\u53D6\u89C4\u5219\uFF08\u6309\u987A\u5E8F\u5E94\u7528\uFF09",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}}),r?f("span",{text:"\u5185\u7F6E\u9884\u8BBE\u53EA\u8BFB",style:{fontSize:"11px",color:"var(--yyt-text-muted)"}}):X({label:"+ \u65B0\u589E\u89C4\u5219",size:"small",onClick:()=>{Re.addRule(t.id,{type:sr.INCLUDE,value:"",enabled:!0}),n&&n()}}).el);V(s,o);let a=f("div");if(t.rules.length){for(let i=0;i<t.rules.length;i++)a.appendChild(Xv(t,t.rules[i],i,t.rules.length,n,r));r||Qv(a,t,n)}else a.appendChild(f("div",{style:{padding:"14px 0",color:"var(--yyt-text-muted)",fontSize:"12px"},text:'\u5C1A\u65E0\u89C4\u5219\u3002\u70B9\u51FB\u53F3\u4E0A\u89D2"+ \u65B0\u589E\u89C4\u5219"\u5F00\u59CB\u6DFB\u52A0\u3002'}));if(V(s,a),V(s,f("div",{text:"\u5185\u5BB9\u9ED1\u540D\u5355",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)",marginTop:"6px",marginBottom:"4px"}})),V(s,f("div",{text:"\u63D0\u53D6\u51FA\u7684\u5185\u5BB9\u5757\u82E5\u5305\u542B\u4EFB\u4E00\u5173\u952E\u8BCD\u5219\u8DF3\u8FC7\u8BE5\u5757\uFF08\u4E0D\u533A\u5206\u5927\u5C0F\u5199\uFF09\u3002",style:{fontSize:"11px",color:"var(--yyt-text-muted)",marginBottom:"6px"}})),r)V(s,f("div",{style:{fontSize:"12px",color:"var(--yyt-text-muted)"},text:t.blacklist.length?t.blacklist.join("\u3001"):"\uFF08\u7A7A\uFF09"}));else{let i=rc({values:t.blacklist,placeholder:"\u8F93\u5165\u5173\u952E\u8BCD\u56DE\u8F66\u6DFB\u52A0",chipVariant:"danger",onChange:l=>Re.setBlacklist(t.id,l)});V(s,i.el)}return s}function e0(t){if(!t)return null;let e=f("div",{style:{display:"flex",flexDirection:"column",gap:"8px"}});V(e,f("div",{text:"\u6D4B\u8BD5\u63D0\u53D6",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}}));let r=hf.get(t.id)||{input:"",output:""};hf.set(t.id,r);let n=f("textarea",{className:"yyt-textarea",attrs:{rows:"5",placeholder:"\u7C98\u8D34\u6D4B\u8BD5\u6587\u672C\uFF08\u5982 AI \u56DE\u590D\u539F\u6587\uFF09..."},style:{width:"100%",resize:"vertical",fontFamily:"ui-monospace, monospace",fontSize:"12px"}});n.value=r.input,n.addEventListener("input",()=>{r.input=n.value}),V(e,n);let s=f("div",{style:{padding:"10px",background:"var(--yyt-bg-base)",border:"1px solid var(--yyt-border)",borderRadius:"var(--yyt-radius-sm)",fontFamily:"ui-monospace, monospace",fontSize:"11px",lineHeight:"1.6",color:"var(--yyt-text-muted)",maxHeight:"200px",overflowY:"auto",whiteSpace:"pre-wrap",wordBreak:"break-all",minHeight:"50px"}});s.textContent=r.output||'// \u70B9\u51FB"\u8FD0\u884C\u6D4B\u8BD5"\u770B\u63D0\u53D6\u7ED3\u679C';let o=X({label:"\u25B6 \u8FD0\u884C\u6D4B\u8BD5",size:"small",variant:"primary",onClick:()=>{let a=n.value;if(!a.trim()){r.output="// \u6D4B\u8BD5\u8F93\u5165\u4E3A\u7A7A",s.textContent=r.output,s.style.color="var(--yyt-text-muted)";return}try{let i=Ir(a,t.rules||[],t.blacklist||[]);r.output=i||"// \u6CA1\u6709\u63D0\u53D6\u5230\u5185\u5BB9",s.textContent=r.output,s.style.color=i?"var(--yyt-text)":"var(--yyt-text-muted)"}catch(i){r.output=`// \u6D4B\u8BD5\u51FA\u9519\uFF1A${i?.message||i}`,s.textContent=r.output,s.style.color="var(--yyt-danger, #f87171)"}}});return V(e,o.el),V(e,s),e}function t0(t){let e=t.rules.filter(r=>r.enabled!==!1).length;return[`${t.rules.length} \u89C4\u5219\uFF08${e} \u542F\u7528\uFF09`,`${t.blacklist.length} \u9ED1\u540D\u5355`]}var ok,Jv,hf,bf,r0,wf=O(()=>{nr();rn();Ts();Y();Mo();ok=I.createScope("RegexExtractPanel"),Jv=[{value:sr.INCLUDE,label:"include \u2014 \u63D0\u53D6\u6807\u7B7E"},{value:sr.EXCLUDE,label:"exclude \u2014 \u6392\u9664\u6807\u7B7E"},{value:sr.REGEX_INCLUDE,label:"regex_include \u2014 \u6B63\u5219\u63D0\u53D6"},{value:sr.REGEX_EXCLUDE,label:"regex_exclude \u2014 \u6B63\u5219\u6392\u9664"}],hf=new Map;bf=qr({id:"regexExtractPanel",kind:"regex",panelTitle:"\u6B63\u5219\u63D0\u53D6\u9884\u8BBE",panelHint:"\u7BA1\u7406\u591A\u4E2A\u63D0\u53D6\u89C4\u5219\u96C6\uFF0C\u5DE5\u5177\u914D\u7F6E\u4E2D\u901A\u8FC7\u9884\u8BBE ID \u5F15\u7528\u3002\u89C4\u5219\u6309\u987A\u5E8F\u5E94\u7528\uFF0C\u53EF\u62D6\u62FD\u6392\u5E8F\u3002",store:Re,renderEditor:Zv,renderExtras:e0,renderListItemMeta:t0}),r0=bf});function Ae(t){return t==null?"":String(t).trim()}function vf(t="table"){let e=Ae(t)||"table",r=Date.now().toString(36),n=Math.random().toString(36).slice(2,8);return`${e}_${r}_${n}`}function Nc(t="table"){return vf(t)}function Pr(t="row"){return vf(t)}function or(t,e=0){return Ae(t)||`table_${Number.isFinite(e)?e+1:1}`}function Ho(t,e=0){return Ae(t)||`row_${Number.isFinite(e)?e+1:1}`}function le(t){if(t!==void 0)try{return JSON.parse(JSON.stringify(t))}catch{return t}}function Ns(t={}){return{chatId:Ae(t.chatId),sourceMessageId:Ae(t.sourceMessageId||t.messageId),sourceSwipeId:Ae(t.sourceSwipeId||t.effectiveSwipeId),effectiveSwipeId:Ae(t.effectiveSwipeId||t.sourceSwipeId),slotBindingKey:Ae(t.slotBindingKey),slotRevisionKey:Ae(t.slotRevisionKey),slotTransactionId:Ae(t.slotTransactionId),traceId:Ae(t.traceId),resolvedAt:Number.isFinite(t.resolvedAt)?t.resolvedAt:Date.now()}}function $c(t={}){return{resolvedAt:Number.isFinite(t.resolvedAt)?t.resolvedAt:Date.now(),runSource:Ae(t.runSource)||dt.MANUAL,traceId:Ae(t.traceId),chatId:Ae(t.chatId),sourceMessageId:Ae(t.sourceMessageId||t.messageId),sourceSwipeId:Ae(t.sourceSwipeId||t.effectiveSwipeId),effectiveSwipeId:Ae(t.effectiveSwipeId||t.sourceSwipeId)||"swipe:current",slotBindingKey:Ae(t.slotBindingKey),slotRevisionKey:Ae(t.slotRevisionKey),slotTransactionId:Ae(t.slotTransactionId),assistantContentFingerprint:Ae(t.assistantContentFingerprint),assistantBaseFingerprint:Ae(t.assistantBaseFingerprint),assistantText:String(t.assistantText||""),assistantBaseText:String(t.assistantBaseText||""),targetMessageIndex:Number.isFinite(t.targetMessageIndex)?t.targetMessageIndex:-1}}function vr(t){return!t||typeof t!="object"?null:{chatId:Ae(t.chatId),slotBindingKey:Ae(t.slotBindingKey),slotRevisionKey:Ae(t.slotRevisionKey),sourceMessageId:Ae(t.sourceMessageId),sourceSwipeId:Ae(t.sourceSwipeId),tables:Array.isArray(t.tables)?le(t.tables):[],updatedAt:Number.isFinite(t.updatedAt)?t.updatedAt:0,meta:t.meta&&typeof t.meta=="object"?le(t.meta):{}}}function Go(t={},e={}){let r=$c(t),n=e.meta&&typeof e.meta=="object"?le(e.meta):{};return{chatId:r.chatId,slotBindingKey:r.slotBindingKey,slotRevisionKey:r.slotRevisionKey,sourceMessageId:r.sourceMessageId,sourceSwipeId:r.sourceSwipeId||r.effectiveSwipeId,tables:Array.isArray(e.tables)?le(e.tables):[],updatedAt:Number.isFinite(e.updatedAt)?e.updatedAt:Date.now(),meta:{sourceKind:n.sourceKind||Kt.EMPTY,...n}}}function ui(t){return!t||typeof t!="object"?{lastResolvedTarget:null,lastCommittedTarget:null,updatedAt:0}:{lastResolvedTarget:t.lastResolvedTarget?Ns(t.lastResolvedTarget):null,lastCommittedTarget:t.lastCommittedTarget?Ns(t.lastCommittedTarget):null,updatedAt:Number.isFinite(t.updatedAt)?t.updatedAt:0}}function Me(t){if(t==null)return It;let e=String(t).trim();return e===""?It:e}function qo(t,e){let r=Ae(t),n=Me(e);return`${r}::${n}`}function Tf(){return{rows:[],cols:[],cells:[],indexColumn:!1}}function _f(t,e){return`${Number.isFinite(t)?t:-1}:${Number.isFinite(e)?e:-1}`}var nn,sn,dt,_t,qn,Kt,$s,n0,It,Qe,Sf,ak,ik,Be=O(()=>{nn="YouYouToolkit_tableState",sn="YouYouToolkit_tableBindings",dt=Object.freeze({MANUAL:"MANUAL_TABLE",AUTO:"AUTO_TABLE"}),_t=Object.freeze({ENABLED:"enabled",SELECTED:"selected",CURRENT:"current"}),qn=Object.freeze({EXACT:"exact",BINDING_FALLBACK:"binding_fallback",HISTORY:"history",TEMPLATE:"template",EMPTY:"empty"}),Kt=Object.freeze({EXACT:"exact",BINDING:"binding",HISTORY:"history",TEMPLATE:"template",EMPTY:"empty"}),$s=Object.freeze({INSERT_ROW:"insertRow",UPDATE_ROW:"updateRow",DELETE_ROW:"deleteRow"}),n0=Object.freeze({CELL:"cell",ROW:"row",COLUMN:"column",INDEX_COLUMN:"index_column"});It="";Qe=Object.freeze({INHERIT_GLOBAL:"inherit_global",CHAT_OVERRIDE:"chat_override",PRESET_LINK:"preset_link"}),Sf=8,ak=Object.freeze({NOTE:"note",INIT_NODE:"initNode",INSERT_NODE:"insertNode",UPDATE_NODE:"updateNode",DELETE_NODE:"deleteNode"}),ik=Object.freeze({INHERIT_GLOBAL:-1,DISABLED:0})});function pi(t,e=""){return t==null?e:String(t).trim()||e}function s0(t,e=!1){return t==null?e:t===!0}function yi(t={},e=0){return or(t?.id||t?.key,e)}function Yo(t={},e={}){let r=t&&typeof t=="object"?t:{},n=e&&typeof e=="object"?e:{},s=pi(r.mode||r.runScope||n.mode||n.runScope,_t.ENABLED),o=Array.isArray(r.selectedTableIds)?r.selectedTableIds.map(i=>pi(i,"")).filter(Boolean):Array.isArray(n.selectedTableIds)?n.selectedTableIds.map(i=>pi(i,"")).filter(Boolean):[],a=pi(r.activeTableId||n.activeTableId,"");return{mode:Object.values(_t).includes(s)?s:_t.ENABLED,selectedTableIds:o,activeTableId:a}}function Ef(t={},e=[]){let r=Yo(t,t?.scope||{}),n=Array.isArray(e)?e:[],s=n.map((c,u)=>yi(c,u)),o=new Set(s),a=r.mode,i=!1;a===_t.CURRENT?(!r.activeTableId||!o.has(r.activeTableId))&&(a=_t.ENABLED,i=!0):a===_t.SELECTED&&r.selectedTableIds.filter(u=>o.has(u)).length===0&&(a=_t.ENABLED,i=!0);let l=[];a===_t.CURRENT?l=r.activeTableId?[r.activeTableId]:[]:a===_t.SELECTED?l=r.selectedTableIds.filter(c=>o.has(c)):l=n.map((c,u)=>({table:c,id:yi(c,u)})).filter(({table:c})=>s0(c?.enabled,!0)).map(({id:c})=>c);let d=new Set(l);return{...r,mode:a,requestedMode:r.mode,staleScope:i,allTableIds:s,allowedTableIds:l,allowedIdSet:d,includes(c={},u=-1){return d.has(yi(c,u))},filterTables(c=[]){return(Array.isArray(c)?c:[]).filter((y,p)=>d.has(yi(y,p)))},toJSON(){return{mode:a,requestedMode:r.mode,staleScope:i,selectedTableIds:le(r.selectedTableIds),activeTableId:r.activeTableId,allowedTableIds:[...l]}}}}var fi=O(()=>{Be()});function jt(t,e=""){return t==null?e:String(t).trim()||e}function Oc(){let t=globalThis.window||globalThis;return jt(t?.TavernHelper?.getCurrentChatId?.()||t?.Silvy?.getCurrentChatId?.()||t?.chat_metadata?.chat_id||t?.this_chid||t?.name1,"default_chat")}function o0(t,e=!1){return t===!0}function a0(t={}){let e=t&&typeof t=="object"?t:{};return{enabled:o0(e.enabled,!1),targetBook:jt(e.targetBook,""),entryComment:jt(e.entryComment,"YYT-\u586B\u8868\u6570\u636E")}}function Lc(t={},e={}){let r=t&&typeof t=="object"?t:{},n=Yo(r.scope,{mode:r.runScope||e.runScope||_t.ENABLED,selectedTableIds:r.selectedTableIds||e.selectedTableIds||[],activeTableId:r.activeTableId||e.activeTableId||""});return{chatId:jt(r.chatId,jt(e.chatId,Oc())),templateId:jt(r.templateId,jt(e.templateId,Et)),enabledTableIds:Array.isArray(r.enabledTableIds)?r.enabledTableIds.map(s=>jt(s,"")).filter(Boolean):[],focusedTableId:jt(r.focusedTableId,n.activeTableId),scope:n,worldbookSync:a0(r.worldbookSync),seedNote:jt(r.seedNote,""),updatedAt:jt(r.updatedAt,new Date().toISOString())}}function kf(){let t=Af.get(Cf,{});return t&&typeof t=="object"&&!Array.isArray(t)?t:{}}function Dc(t=Oc()){let e=jt(t,"default_chat"),r=kf();return Lc(r[e],{chatId:e})}function If(t={},e=Oc()){let r=jt(e,"default_chat"),n=kf(),s=Lc({...n[r],...t||{},chatId:r,updatedAt:new Date().toISOString()},{chatId:r});return Af.set(Cf,{...n,[r]:s}),{success:!0,guide:s}}function Rf(t={},e=null){let r=Lc(e||Dc(),{templateId:t.activeTemplate,runScope:t.runScope,selectedTableIds:t.scope?.selectedTableIds,activeTableId:t.scope?.activeTableId}),n={...t,activeTemplate:r.templateId||t.activeTemplate,runScope:r.scope.mode,scope:r.scope};return r.worldbookSync&&r.worldbookSync.targetBook&&(n.worldbookSync={...t.worldbookSync||{},...r.worldbookSync}),n}var Af,Cf,Mf=O(()=>{We();Jt();Be();fi();Af=j.namespace("tableWorkbenchGuides"),Cf="guides"});function oe(t,e,r="",n=mi){return{key:t,title:e,description:r,type:n,required:!1}}function on({id:t,name:e,note:r,aiInstructions:n,columns:s}){return{id:t,name:e,note:r,enabled:!0,aiInstructions:{init:n?.init||"",create:n?.create||"",update:n?.update||"",delete:n?.delete||""},columns:s,rows:[]}}var Ne,gi,Bc,Pf,i0,mi,Nf,Et,zc,Os,$f=O(()=>{Ne=Object.freeze({IDLE:"idle",RUNNING:"running",SUCCESS:"success",ERROR:"error",ABORTED:"aborted",SKIPPED:"skipped"}),gi=Object.freeze({INCREMENTAL:"incremental",FULL:"full"}),Bc=`\u8BF7\u6839\u636E\u5F53\u524D\u5BF9\u8BDD\u4E0E\u5F53\u524D\u8868\u683C\u57FA\u5E95\uFF0C\u5BF9\u7ED3\u6784\u5316 tables \u6570\u636E\u505A\u589E\u91CF\u66F4\u65B0\u3002

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
{{toolContentMacro}}`,Pf=`\u8F93\u51FA\u8981\u6C42 \u2014 \u7528 <tableEdit>...</tableEdit> \u589E\u91CF DSL\uFF1A

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
\u4F46\u5E94\u8BE5\u5C3D\u91CF\u4F18\u5148\u7528 DSL\uFF08\u6D41\u91CF\u5C0F\u3001\u4E0D\u5F71\u54CD\u9501\u5B57\u6BB5\uFF09\u3002`,i0=Object.freeze([{value:"text",label:"\u6587\u672C"},{value:"number",label:"\u6570\u5B57"},{value:"boolean",label:"\u5E03\u5C14"},{value:"date",label:"\u65E5\u671F"},{value:"json",label:"JSON"}]),mi="text",Nf=Object.freeze(i0.map(t=>Object.freeze({...t}))),Et="default_story_state",zc="\u9ED8\u8BA4\u5267\u60C5\u72B6\u6001\u6A21\u677F";Os=Object.freeze([on({id:"default_global_state",name:"\u5168\u5C40\u6570\u636E\u8868",note:"\u8BB0\u5F55\u5F53\u524D\u4E3B\u89D2\u6240\u5728\u5730\u70B9\u53CA\u65F6\u95F4\u76F8\u5173\u53C2\u6570\u3002\u6B64\u8868\u901A\u5E38\u6709\u4E14\u4EC5\u6709\u4E00\u884C\u3002",aiInstructions:{init:"\u63D2\u5165\u4E00\u6761\u5173\u4E8E\u5F53\u524D\u4E16\u754C\u72B6\u6001\u7684\u8BB0\u5F55\u3002",create:"\u901A\u5E38\u7981\u6B62\u65B0\u589E\uFF1B\u9664\u975E\u8868\u4E3A\u7A7A\u4E14\u9700\u8981\u521D\u59CB\u5316\u3002",update:"\u5F53\u5730\u70B9\u6216\u65F6\u95F4\u53D1\u751F\u53D8\u5316\u65F6\u66F4\u65B0\u6B64\u8868\uFF1B\u6BCF\u8F6E\u5E94\u6839\u636E\u5267\u60C5\u66F4\u65B0\u65F6\u95F4\u76F8\u5173\u5B57\u6BB5\u3002",delete:"\u7981\u6B62\u5220\u9664\u3002"},columns:[oe("location","\u4E3B\u89D2\u5F53\u524D\u6240\u5728\u5730\u70B9","\u4E3B\u89D2\u5F53\u524D\u6240\u5728\u7684\u5177\u4F53\u573A\u666F\u540D\u79F0\u3002"),oe("current_time","\u5F53\u524D\u65F6\u95F4","\u6E38\u620F\u4E16\u754C\u7684\u5F53\u524D\u65F6\u95F4\uFF1B\u5982\u5267\u60C5\u6CA1\u6709\u660E\u786E\u65F6\u95F4\uFF0C\u53EF\u6839\u636E\u4E16\u754C\u89C2\u7ED9\u51FA\u5408\u7406\u65F6\u95F4\u3002"),oe("previous_scene_time","\u4E0A\u8F6E\u573A\u666F\u65F6\u95F4","\u4E0A\u4E00\u8F6E\u4EA4\u4E92\u7ED3\u675F\u65F6\u7684\u65F6\u95F4\u3002"),oe("elapsed_time","\u7ECF\u8FC7\u7684\u65F6\u95F4","\u6839\u636E\u5F53\u524D\u4E0E\u4E0A\u8F6E\u65F6\u95F4\u8BA1\u7B97\u51FA\u7684\u6587\u672C\u63CF\u8FF0\u3002")]}),on({id:"default_protagonist_profile",name:"\u4E3B\u89D2\u4FE1\u606F",note:"\u8BB0\u5F55\u4E3B\u89D2\u7684\u6838\u5FC3\u8EAB\u4EFD\u4FE1\u606F\u3002\u6B64\u8868\u901A\u5E38\u6709\u4E14\u4EC5\u6709\u4E00\u884C\u3002",aiInstructions:{init:"\u521D\u59CB\u5316\u65F6\u63D2\u5165\u4E3B\u89D2\u7684\u552F\u4E00\u6761\u76EE\u3002",create:"\u7981\u6B62\u65B0\u589E\u591A\u540D\u4E3B\u89D2\uFF1B\u9664\u975E\u8868\u4E3A\u7A7A\u4E14\u9700\u8981\u521D\u59CB\u5316\u3002",update:"\u5F53\u4E3B\u89D2\u8EAB\u4EFD\u3001\u5916\u8C8C\u3001\u7ECF\u5386\u6216\u6027\u683C\u6709\u660E\u786E\u53D8\u5316\u65F6\u66F4\u65B0\u3002",delete:"\u7981\u6B62\u5220\u9664\u3002"},columns:[oe("name","\u4EBA\u7269\u540D\u79F0","\u4E3B\u89D2\u7684\u540D\u5B57\u3002"),oe("gender_age","\u6027\u522B/\u5E74\u9F84","\u4E3B\u89D2\u7684\u6027\u522B\u4E0E\u5E74\u9F84\u3002"),oe("appearance","\u5916\u8C8C\u7279\u5F81","\u5BF9\u4E3B\u89D2\u5916\u8C8C\u7684\u5BA2\u89C2\u6587\u5B57\u63CF\u5199\u3002"),oe("identity","\u804C\u4E1A/\u8EAB\u4EFD","\u4E3B\u89D2\u5728\u793E\u4F1A\u6216\u5267\u60C5\u4E2D\u7684\u4E3B\u8981\u8EAB\u4EFD\u3002"),oe("history","\u8FC7\u5F80\u7ECF\u5386","\u4E3B\u89D2\u80CC\u666F\u6545\u4E8B\u4E0E\u5173\u952E\u7ECF\u5386\uFF0C\u968F\u5267\u60C5\u589E\u91CF\u66F4\u65B0\u3002"),oe("personality","\u6027\u683C\u7279\u70B9","\u5BF9\u4E3B\u89D2\u6838\u5FC3\u6027\u683C\u7684\u6982\u62EC\u3002")]}),on({id:"default_important_characters",name:"\u91CD\u8981\u89D2\u8272\u8868",note:"\u8BB0\u5F55\u5173\u952E NPC \u6216\u91CD\u8981\u89D2\u8272\u7684\u4FE1\u606F\u548C\u52A8\u6001\u72B6\u6001\u3002",aiInstructions:{init:"\u521D\u59CB\u5316\u65F6\u4E3A\u5F53\u524D\u5728\u573A\u7684\u91CD\u8981\u4EBA\u7269\u5206\u522B\u63D2\u5165\u6761\u76EE\u3002",create:"\u5267\u60C5\u4E2D\u6709\u672A\u8BB0\u5F55\u7684\u91CD\u8981\u4EBA\u7269\u767B\u573A\u65F6\u65B0\u589E\u3002",update:"\u5DF2\u6709\u89D2\u8272\u7684\u72B6\u6001\u3001\u5173\u7CFB\u3001\u60F3\u6CD5\u3001\u7ECF\u5386\u6216\u6301\u6709\u7269\u53D8\u5316\u65F6\u66F4\u65B0\u3002",delete:'\u901A\u5E38\u7981\u6B62\u5220\u9664\uFF1B\u89D2\u8272\u79BB\u573A\u65F6\u4F18\u5148\u66F4\u65B0"\u662F\u5426\u79BB\u573A"\u3002'},columns:[oe("name","\u59D3\u540D","\u89D2\u8272\u59D3\u540D\u3002"),oe("gender_age","\u6027\u522B/\u5E74\u9F84","\u89D2\u8272\u7684\u6027\u522B\u4E0E\u5E74\u9F84\u3002"),oe("summary","\u4E00\u53E5\u8BDD\u4ECB\u7ECD","\u7528\u7B80\u77ED\u6587\u5B57\u6982\u62EC\u89D2\u8272\u8EAB\u4EFD\u80CC\u666F\u3002"),oe("appearance","\u5916\u8C8C\u7279\u5F81","\u5BF9\u89D2\u8272\u5916\u8C8C\u548C\u5F53\u524D\u8863\u7740\u7684\u5BA2\u89C2\u63CF\u5199\u3002"),oe("important_items","\u6301\u6709\u7684\u91CD\u8981\u7269\u54C1","\u89D2\u8272\u62E5\u6709\u7684\u5173\u952E\u7269\u54C1\uFF0C\u7528\u5206\u53F7\u5206\u9694\u3002"),oe("offstage","\u662F\u5426\u79BB\u573A",'\u5224\u65AD\u8BE5\u89D2\u8272\u5F53\u524D\u662F\u5426\u5DF2\u7ECF\u79BB\u573A\uFF0C\u586B\u5199"\u662F"\u6216"\u5426"\u3002',"boolean"),oe("history","\u8FC7\u5F80\u7ECF\u5386","\u89D2\u8272\u80CC\u666F\u4E0E\u5173\u952E\u4E8B\u4EF6\uFF0C\u968F\u5267\u60C5\u589E\u91CF\u66F4\u65B0\u3002")]}),on({id:"default_protagonist_skills",name:"\u4E3B\u89D2\u6280\u80FD\u8868",note:"\u8BB0\u5F55\u4E3B\u89D2\u83B7\u5F97\u7684\u6280\u80FD\u3001\u80FD\u529B\u6216\u9636\u6BB5\u6027\u6210\u957F\u3002",aiInstructions:{init:"\u521D\u59CB\u5316\u65F6\u6839\u636E\u8BBE\u5B9A\u6DFB\u52A0\u4E3B\u89D2\u7684\u521D\u59CB\u6280\u80FD\u3002",create:"\u4E3B\u89D2\u83B7\u5F97\u65B0\u6280\u80FD\u6216\u65B0\u80FD\u529B\u65F6\u65B0\u589E\u3002",update:"\u5DF2\u6709\u6280\u80FD\u5347\u7EA7\u3001\u964D\u7EA7\u6216\u6548\u679C\u53D8\u5316\u65F6\u66F4\u65B0\u3002",delete:"\u6280\u80FD\u88AB\u5267\u60C5\u5265\u593A\u3001\u66FF\u6362\u6216\u5931\u6548\u65F6\u5220\u9664\u3002"},columns:[oe("skill_name","\u6280\u80FD\u540D\u79F0","\u6280\u80FD\u6216\u80FD\u529B\u540D\u79F0\u3002"),oe("skill_type","\u6280\u80FD\u7C7B\u578B","\u6280\u80FD\u7C7B\u522B\uFF0C\u4F8B\u5982\u4E3B\u52A8\u3001\u88AB\u52A8\u3001\u5929\u8D4B\u7B49\u3002"),oe("level","\u7B49\u7EA7/\u9636\u6BB5","\u6280\u80FD\u5F53\u524D\u7B49\u7EA7\u3001\u719F\u7EC3\u5EA6\u6216\u9636\u6BB5\u3002"),oe("effect","\u6548\u679C\u63CF\u8FF0","\u6280\u80FD\u5728\u5F53\u524D\u9636\u6BB5\u4E0B\u7684\u5177\u4F53\u6548\u679C\u3002")]}),on({id:"default_inventory",name:"\u80CC\u5305\u7269\u54C1\u8868",note:"\u8BB0\u5F55\u4E3B\u89D2\u62E5\u6709\u7684\u7269\u54C1\u3001\u88C5\u5907\u6216\u6D88\u8017\u54C1\u3002",aiInstructions:{init:"\u521D\u59CB\u5316\u65F6\u6839\u636E\u5267\u60C5\u4E0E\u8BBE\u5B9A\u6DFB\u52A0\u4E3B\u89D2\u7684\u521D\u59CB\u643A\u5E26\u7269\u54C1\u3002",create:"\u4E3B\u89D2\u83B7\u5F97\u80CC\u5305\u4E2D\u6CA1\u6709\u7684\u5168\u65B0\u7269\u54C1\u65F6\u65B0\u589E\u3002",update:"\u5DF2\u6709\u7269\u54C1\u6570\u91CF\u3001\u72B6\u6001\u6216\u63CF\u8FF0\u53D8\u5316\u65F6\u66F4\u65B0\u3002",delete:"\u7269\u54C1\u88AB\u5B8C\u5168\u6D88\u8017\u3001\u4E22\u5F03\u6216\u6467\u6BC1\u65F6\u5220\u9664\u3002"},columns:[oe("item_name","\u7269\u54C1\u540D\u79F0","\u7269\u54C1\u540D\u79F0\u3002"),oe("quantity","\u6570\u91CF","\u62E5\u6709\u6570\u91CF\u3002","number"),oe("description","\u63CF\u8FF0/\u6548\u679C","\u7269\u54C1\u529F\u80FD\u3001\u6548\u679C\u6216\u80CC\u666F\u63CF\u8FF0\u3002"),oe("category","\u7C7B\u522B","\u7269\u54C1\u7C7B\u522B\uFF0C\u4F8B\u5982\u6B66\u5668\u3001\u6D88\u8017\u54C1\u3001\u6742\u7269\u7B49\u3002")]}),on({id:"default_quests_events",name:"\u4EFB\u52A1\u4E0E\u4E8B\u4EF6\u8868",note:"\u8BB0\u5F55\u5F53\u524D\u6B63\u5728\u8FDB\u884C\u6216\u9700\u8981\u6301\u7EED\u8FFD\u8E2A\u7684\u4EFB\u52A1\u4E0E\u4E8B\u4EF6\u3002",aiInstructions:{init:"\u521D\u59CB\u5316\u65F6\u6839\u636E\u5267\u60C5\u4E0E\u8BBE\u5B9A\u6DFB\u52A0\u4E3B\u8981\u4EFB\u52A1\u6216\u5173\u952E\u4E8B\u4EF6\u3002",create:"\u4E3B\u89D2\u63A5\u53D6\u3001\u89E6\u53D1\u6216\u53D1\u73B0\u65B0\u7684\u4EFB\u52A1\u4E0E\u4E8B\u4EF6\u65F6\u65B0\u589E\u3002",update:"\u4EFB\u52A1\u53D6\u5F97\u5173\u952E\u8FDB\u5C55\u3001\u76EE\u6807\u53D8\u5316\u6216\u65F6\u9650\u53D8\u5316\u65F6\u66F4\u65B0\u3002",delete:"\u4EFB\u52A1\u5B8C\u6210\u3001\u5931\u8D25\u3001\u8FC7\u671F\u6216\u4E0D\u518D\u9700\u8981\u8FFD\u8E2A\u65F6\u5220\u9664\u3002"},columns:[oe("quest_name","\u4EFB\u52A1\u540D\u79F0","\u4EFB\u52A1\u6216\u4E8B\u4EF6\u6807\u9898\u3002"),oe("quest_type","\u4EFB\u52A1\u7C7B\u578B","\u4E3B\u7EBF\u3001\u652F\u7EBF\u3001\u4E2A\u4EBA\u3001\u7A81\u53D1\u4E8B\u4EF6\u7B49\u3002"),oe("issuer","\u53D1\u5E03\u8005","\u53D1\u5E03\u4EFB\u52A1\u6216\u89E6\u53D1\u4E8B\u4EF6\u7684\u89D2\u8272\u3001\u5730\u70B9\u6216\u52BF\u529B\u3002"),oe("detail","\u8BE6\u7EC6\u63CF\u8FF0","\u4EFB\u52A1\u76EE\u6807\u3001\u4E8B\u4EF6\u80CC\u666F\u548C\u8981\u6C42\u3002"),oe("progress","\u5F53\u524D\u8FDB\u5EA6","\u5BF9\u5B8C\u6210\u5EA6\u6216\u5F53\u524D\u9636\u6BB5\u7684\u7B80\u8981\u63CF\u8FF0\u3002"),oe("deadline","\u4EFB\u52A1\u65F6\u9650","\u5B8C\u6210\u4EFB\u52A1\u7684\u5269\u4F59\u65F6\u95F4\u6216\u622A\u6B62\u6761\u4EF6\u3002"),oe("reward","\u5956\u52B1","\u5B8C\u6210\u540E\u53EF\u80FD\u83B7\u5F97\u7684\u5956\u52B1\u3002"),oe("penalty","\u60E9\u7F5A","\u5931\u8D25\u6216\u9519\u8FC7\u540E\u7684\u540E\u679C\u3002")]}),on({id:"default_memo_log",name:"\u7EAA\u8981\u8868",note:"\u8BB0\u5F55\u6BCF\u8F6E\u6216\u5173\u952E\u7247\u6BB5\u53D1\u751F\u7684\u4E8B\u4EF6\u7EAA\u8981\uFF0C\u7528\u4E8E\u540E\u7EED\u56DE\u987E\u3002",aiInstructions:{init:"\u6545\u4E8B\u521D\u59CB\u5316\u65F6\u63D2\u5165\u4E00\u6761\u8BB0\u5F55\uFF0C\u7528\u4E8E\u8BB0\u5F55\u521D\u59CB\u5316\u5267\u60C5\u3002",create:"\u6BCF\u8F6E\u4EA4\u4E92\u7ED3\u675F\u540E\uFF0C\u82E5\u53D1\u751F\u4E86\u503C\u5F97\u8BB0\u5F55\u7684\u65B0\u4E8B\u4EF6\uFF0C\u5219\u63D2\u5165\u4E00\u6761\u65B0\u7EAA\u8981\u3002",update:"\u901A\u5E38\u7981\u6B62\u66F4\u65B0\u5386\u53F2\u7EAA\u8981\uFF1B\u53EA\u6709\u660E\u663E\u4E8B\u5B9E\u9519\u8BEF\u65F6\u624D\u4FEE\u6B63\u3002",delete:"\u7981\u6B62\u5220\u9664\u3002"},columns:[oe("time_span","\u65F6\u95F4\u8DE8\u5EA6","\u672C\u8F6E\u4E8B\u4EF6\u53D1\u751F\u7684\u65F6\u95F4\u8303\u56F4\u3002"),oe("location","\u5730\u70B9","\u672C\u8F6E\u4E8B\u4EF6\u53D1\u751F\u5730\u70B9\u3002"),oe("memo","\u7EAA\u8981","\u4EE5\u7B2C\u4E09\u65B9\u89C6\u89D2\u5BA2\u89C2\u8BB0\u5F55\u672C\u8F6E\u53D1\u751F\u7684\u4E8B\u5B9E\u3002"),oe("summary","\u6982\u89C8","\u4E00\u53E5\u8BDD\u6982\u62EC\u7EAA\u8981\u5185\u5BB9\u3002"),oe("index_code","\u7F16\u7801\u7D22\u5F15","\u7528\u4E8E\u540E\u7EED\u68C0\u7D22\u7684\u7B80\u77ED\u7F16\u7801\u3002")]}),on({id:"default_options",name:"\u9009\u9879\u8868",note:"\u8BB0\u5F55\u6BCF\u8F6E\u4E3B\u89D2\u53EF\u4EE5\u91C7\u53D6\u7684\u884C\u52A8\u9009\u9879\u3002\u6B64\u8868\u901A\u5E38\u6709\u4E14\u4EC5\u6709\u4E00\u884C\u3002\u6240\u6709\u9009\u9879\u4F7F\u7528\u7B2C\u4E09\u4EBA\u79F0\uFF0C\u4E0D\u4EE3\u66FF\u4E3B\u89D2\u53D1\u8A00\uFF0C\u5E76\u7D27\u6263\u5F53\u524D\u5267\u60C5\u3002",aiInstructions:{init:"\u521D\u59CB\u5316\u65F6\u751F\u6210\u56DB\u4E2A\u521D\u59CB\u884C\u52A8\u9009\u9879\u3002",create:"\u901A\u5E38\u7981\u6B62\u65B0\u589E\uFF1B\u9664\u975E\u8868\u4E3A\u7A7A\u4E14\u9700\u8981\u521D\u59CB\u5316\u3002",update:"\u6BCF\u8F6E\u4EA4\u4E92\u540E\u6839\u636E\u5F53\u524D\u5267\u60C5\u751F\u6210\u65B0\u7684\u56DB\u4E2A\u9009\u9879\u5E76\u8986\u76D6\u539F\u6709\u5185\u5BB9\u3002",delete:"\u7981\u6B62\u5220\u9664\u3002"},columns:[oe("option_1","\u9009\u9879\u4E00","\u504F\u5411\u7B56\u7565\u3001\u63A8\u8FDB\u5267\u60C5\u6216\u89E3\u51B3\u5F53\u524D\u95EE\u9898\u7684\u884C\u52A8\u3002"),oe("option_2","\u9009\u9879\u4E8C","\u504F\u5411\u8C28\u614E\u89C2\u5BDF\u3001\u6536\u96C6\u4FE1\u606F\u6216\u4FDD\u6301\u4E2D\u7ACB\u7684\u884C\u52A8\u3002"),oe("option_3","\u9009\u9879\u4E09","\u504F\u5411\u5E2E\u52A9\u3001\u4FDD\u62A4\u3001\u6C9F\u901A\u6216\u5B89\u629A\u7684\u884C\u52A8\u3002"),oe("option_4","\u9009\u9879\u56DB","\u504F\u5411\u5192\u9669\u3001\u8BD5\u63A2\u3001\u6539\u53D8\u5C40\u52BF\u6216\u5173\u7CFB\u4E92\u52A8\u7684\u884C\u52A8\u3002")]})])});function l0(t,e=""){return t==null?e:String(t).trim()||e}function an(t){if(t==null)return"";if(typeof t=="string")return t;try{return JSON.stringify(t,null,2)}catch{return String(t)}}function Vo(t,e="col"){return l0(t,"").toLowerCase().replace(/[^a-z0-9]+/g,"_").replace(/^_+|_+$/g,"")||e}function ln(t,e=new Set){let r=Vo(t,"col"),n=r,s=2;for(;e.has(n);)n=`${r}_${s}`,s+=1;return e.add(n),n}var Kc=O(()=>{});function K(t,e=""){return t==null?e:String(t).trim()||e}function Nr(t,e=!1){return t==null?e:t===!0}function c0(t){if(!Array.isArray(t)||t.length!==1)return!1;let e=t[0]&&typeof t[0]=="object"?t[0]:null;if(!e)return!1;let r=K(e.name||e.title,""),n=K(e.note||e.description,""),s=Array.isArray(e.columns)?e.columns:[],o=Array.isArray(e.rows)?e.rows:[];if(r&&!["\u88681","\u8868\u683C 1","\u8868\u683C1"].includes(r)||n||s.length!==1||o.length>1)return!1;let a=s[0]&&typeof s[0]=="object"?s[0]:{},i=K(a.key||a.id,""),l=K(a.title||a.name||a.label,"");if(K(a.description||a.note,"")||i&&i!=="col_1"||l&&!["\u52171","col_1"].includes(l))return!1;if(o.length===0)return!0;let c=o[0]&&typeof o[0]=="object"?o[0]:{},u=K(c.name||c.title||c.label,""),y=c.cells&&typeof c.cells=="object"&&!Array.isArray(c.cells)?c.cells:{},p=Array.isArray(c.values)?c.values:[],g=Object.values(y).some(m=>K(m,""))||p.some(m=>K(m,""));return(!u||u==="\u884C1")&&!g}function d0(t,{seedDefaultWhenMissing:e=!1}={}){return c0(t)?le(Os):Array.isArray(t)?le(t):t&&typeof t=="object"?u0(t):e?le(Os):[]}function Fc(t=""){let e=[],r=K(t,""),n=/-\s*列\d+\s*[:：]\s*([^\n\-–—]+?)\s*[-–—]\s*([^\n]+)/g,s;for(;s=n.exec(r);)e.push({title:K(s[1],""),description:K(s[2],"")});return e}function u0(t={}){let e=t&&typeof t=="object"?t:{};return Object.keys(e).filter(n=>n.startsWith("sheet_")&&e[n]&&typeof e[n]=="object").map((n,s)=>({key:n,table:e[n],fallbackOrder:s})).sort((n,s)=>{let o=Number.isFinite(n.table.orderNo)?n.table.orderNo:n.fallbackOrder,a=Number.isFinite(s.table.orderNo)?s.table.orderNo:s.fallbackOrder;return o-a}).map(({key:n,table:s},o)=>{let a=s.sourceData&&typeof s.sourceData=="object"?s.sourceData:{},i=Array.isArray(s.content)?s.content:[],l=Array.isArray(i[0])?i[0]:[],d=Fc(a.note),c=new Set,u=l.slice(1).map((p,g)=>{let m=d[g]||{},h=K(p||m.title,`\u5217${g+1}`);return{key:ln(h||`col_${g+1}`,c),title:h,description:K(m.description,""),type:mi,required:!1}}),y=i.slice(1).map((p,g)=>{let m=Array.isArray(p)?p:[],h={};return u.forEach((b,w)=>{h[b.key]=an(m[w+1])}),{name:K(m[0],`\u884C${g+1}`),cells:h}});return{id:K(s.uid||n,`sheet_${o+1}`),name:K(s.name,`\u8868${o+1}`),note:K(a.note,""),enabled:s.enabled!==!1,aiInstructions:{init:K(a.initNode,""),create:K(a.insertNode,""),update:K(a.updateNode,""),delete:K(a.deleteNode,"")},columns:u,rows:y}})}function p0(t=[]){let e=[],r=0;return t.forEach(n=>{let s=n&&typeof n=="object"?n:{},o=s.cells&&typeof s.cells=="object"&&!Array.isArray(s.cells)?s.cells:null,a=Array.isArray(s.cells)?s.cells:Array.isArray(s.values)?s.values:null;o&&Object.keys(o).forEach(i=>{e.includes(i)||e.push(i)}),a&&a.length>r&&(r=a.length)}),e.length>0?e.map(n=>({key:n,title:String(n)})):r>0?Array.from({length:r},(n,s)=>({key:`col_${s+1}`,title:`\u5217${s+1}`})):[]}function Wc(t,e=mi){let r=K(t,e);return Nf.some(n=>n.value===r)?r:e}function y0(t={},e=0,r=new Set){let n=t&&typeof t=="object"?t:{},s=K(n.title||n.name||n.label,`\u5217${e+1}`),o=K(n.key||n.id,""),a=ln(o||s||`col_${e+1}`,r),i=[o,K(n.title,""),K(n.name,""),K(n.label,"")].filter(Boolean);return{key:a,title:s,description:K(n.description||n.note,""),type:Wc(n.type),required:n.required===!0,sourceKeys:i}}function f0(t={},e={},r=0){let n=t.cells&&typeof t.cells=="object"&&!Array.isArray(t.cells)?t.cells:null,s=Array.isArray(t.cells)?t.cells:Array.isArray(t.values)?t.values:null;if(n){let o=[...Array.isArray(e.sourceKeys)?e.sourceKeys:[],e.key,e.title].filter(Boolean);for(let a of o)if(n[a]!==void 0)return an(n[a])}return s&&s[r]!==void 0?an(s[r]):""}function g0(t={},e=[],r=0){let n=t&&typeof t=="object"?t:{},s={};return e.forEach((o,a)=>{s[o.key]=f0(n,o,a)}),{id:Ho(n.id||n.rowId,r),name:K(n.name||n.title||n.label,`\u884C${r+1}`),cells:s}}function m0(t={}){let e=t&&typeof t=="object"?t:{};return{init:K(e.init,""),create:K(e.create,""),update:K(e.update,""),delete:K(e.delete,"")}}function h0(t={},e=""){let r=t&&typeof t=="object"?t:{},n=K(r.presetId,K(e,""));return{enabled:r.enabled===!0,presetId:n}}function b0(t={},e=""){let r=t&&typeof t=="object"?t:{};return{enabled:Nr(r.enabled,!1),entryName:K(r.entryName,e),entryType:r.entryType==="keyword"?"keyword":"constant",splitByRow:Nr(r.splitByRow,!1),keywords:K(r.keywords,""),injectionTemplate:K(r.injectionTemplate,""),preventRecursion:Nr(r.preventRecursion,!0),entryPlacement:{position:K(r.entryPlacement?.position||r.placement?.position,"before_character_definition"),depth:Number.isFinite(Number(r.entryPlacement?.depth??r.placement?.depth))?Math.floor(Number(r.entryPlacement?.depth??r.placement?.depth)):2,order:Number.isFinite(Number(r.entryPlacement?.order??r.placement?.order))?Math.floor(Number(r.entryPlacement?.order??r.placement?.order)):0},extraIndexPlacement:{position:K(r.extraIndexPlacement?.position,"before_character_definition"),depth:Number.isFinite(Number(r.extraIndexPlacement?.depth))?Math.floor(Number(r.extraIndexPlacement?.depth)):2,order:Number.isFinite(Number(r.extraIndexPlacement?.order))?Math.floor(Number(r.extraIndexPlacement?.order)):0}}}function x0(t={},e=0){let r=t&&typeof t=="object"?t:{},n=new Set,o=(Array.isArray(r.columns)&&r.columns.length>0?r.columns:p0(Array.isArray(r.rows)?r.rows:[])).map((l,d)=>y0(l,d,n)),a=Array.isArray(r.rows)?r.rows.map((l,d)=>g0(l,o,d)):[],i=K(r.name||r.title,`\u8868${e+1}`);return{id:or(r.id||r.key,e),name:i,note:K(r.note||r.description,""),enabled:r.enabled!==!1,aiInstructions:m0(r.aiInstructions),exportConfig:b0(r.exportConfig,i),columns:o.map(l=>({key:l.key,title:l.title,description:K(l.description,""),type:Wc(l.type),required:l.required===!0})),rows:a}}function Of(t={}){let e=t&&typeof t=="object"?t:{},r=Array.isArray(e.lastErrorDetails)?e.lastErrorDetails.map(s=>K(s,"")).filter(Boolean):[],n=e.lastValidationSummary&&typeof e.lastValidationSummary=="object"?{errorCount:Number.isFinite(e.lastValidationSummary.errorCount)?e.lastValidationSummary.errorCount:0,warningCount:Number.isFinite(e.lastValidationSummary.warningCount)?e.lastValidationSummary.warningCount:0}:{errorCount:0,warningCount:0};return{lastStatus:K(e.lastStatus,Ne.IDLE),lastRunAt:Number.isFinite(e.lastRunAt)?e.lastRunAt:0,lastDurationMs:Number.isFinite(e.lastDurationMs)?e.lastDurationMs:0,lastError:K(e.lastError,""),lastErrorDetails:r,lastValidationSummary:n,successCount:Number.isFinite(e.successCount)?e.successCount:0,errorCount:Number.isFinite(e.errorCount)?e.errorCount:0,lastSourceMessageId:K(e.lastSourceMessageId,""),lastSlotRevisionKey:K(e.lastSlotRevisionKey,""),lastLoadMode:K(e.lastLoadMode,""),lastFillMode:K(e.lastFillMode,""),lastMirrorApplied:e.lastMirrorApplied===!0,lastResolvedFromMessageId:K(e.lastResolvedFromMessageId,""),lastResolvedFromRevisionKey:K(e.lastResolvedFromRevisionKey,""),lastSourceKind:K(e.lastSourceKind,""),lastScopeMode:K(e.lastScopeMode,""),lastAutoRunAt:Number.isFinite(e.lastAutoRunAt)?e.lastAutoRunAt:0,lastAutoStatus:K(e.lastAutoStatus,Ne.IDLE),lastAutoMessageId:K(e.lastAutoMessageId,""),lastAutoRevisionKey:K(e.lastAutoRevisionKey,""),lastAutoSkipReason:K(e.lastAutoSkipReason,"")}}function w0(t={}){let e=t&&typeof t=="object"?t:{};return(Array.isArray(e.tables)?e.tables:[]).map((n,s)=>x0(n,s))}function Lf(t="",e={},r={}){let n=Wc(e?.type),s=String(t??"").trim(),o=K(r?.label,`${K(r?.tableName,"\u8868\u683C")} / ${K(r?.rowName,"\u884C")} / ${K(e?.title||e?.key,"\u5355\u5143\u683C")}`),a=[],i=[];if(e?.required===!0&&!s&&a.push(`${o} \u4E3A\u5FC5\u586B\uFF0C\u5F53\u524D\u4E3A\u7A7A\u3002`),!s)return{valid:a.length===0,errors:a,warnings:i};if(n==="number"&&!Number.isFinite(Number(s))&&a.push(`${o} \u9700\u8981\u586B\u5199\u6570\u5B57\u3002`),n==="boolean"&&!["true","false","1","0","yes","no"].includes(s.toLowerCase())&&a.push(`${o} \u9700\u8981\u586B\u5199\u5E03\u5C14\u503C\uFF08true / false\uFF09\u3002`),n==="date"&&Number.isNaN(Date.parse(s))&&a.push(`${o} \u9700\u8981\u586B\u5199\u53EF\u89E3\u6790\u7684\u65E5\u671F\u3002`),n==="json")try{JSON.parse(s)}catch(l){a.push(`${o} \u9700\u8981\u586B\u5199\u5408\u6CD5 JSON\uFF1A${l?.message||"\u89E3\u6790\u5931\u8D25"}`)}return{valid:a.length===0,errors:a,warnings:i}}function v0(t={}){let r=w0(t&&typeof t=="object"?t:{}),n=[];return r.forEach((s,o)=>{let a=K(s?.name,`\u8868${o+1}`),i=Array.isArray(s?.columns)?s.columns:[],l=Array.isArray(s?.rows)?s.rows:[];a||n.push(`\u8868 ${o+1} \u7F3A\u5C11\u540D\u79F0\u3002`),i.length===0&&n.push(`${a} \u81F3\u5C11\u9700\u8981\u4E00\u5217\u3002`);let d=new Set;i.forEach((c,u)=>{let y=K(c?.key,""),p=K(c?.title,`\u5217${u+1}`);if(!y){n.push(`${a} / ${p} \u7F3A\u5C11\u5185\u90E8\u540D\u3002`);return}if(d.has(y)){n.push(`${a} \u4E2D\u5B58\u5728\u91CD\u590D\u5217\u5185\u90E8\u540D\uFF1A${y}`);return}d.add(y)}),l.forEach((c,u)=>{let y=K(c?.name,`\u884C${u+1}`),p=c?.cells&&typeof c.cells=="object"&&!Array.isArray(c.cells)?c.cells:{};i.forEach((g,m)=>{let h=K(g?.key,""),b=K(g?.title||h,`\u5217${m+1}`),w=h?an(p[h]):"",S=Lf(w,g,{label:`${a} / ${y} / ${b}`,tableName:a,rowName:y});n.push(...S.errors)})})}),{valid:n.length===0,errors:n,tables:r}}function Ls({severity:t="error",message:e="",tableIndex:r=-1,tableName:n="",columnIndex:s=-1,columnKey:o="",rowIndex:a=-1,rowName:i="",cellKey:l=""}={}){return{severity:t,message:K(e,t==="warning"?"\u5B58\u5728\u8B66\u544A\u3002":"\u5B58\u5728\u9519\u8BEF\u3002"),tableIndex:r,tableName:K(n,""),columnIndex:s,columnKey:K(o,""),rowIndex:a,rowName:K(i,""),cellKey:K(l,"")}}function hi(t={}){let e=v0(t),r=[];if(!e.valid)return{...e,warnings:[],issues:r,summary:{errorCount:e.errors.length,warningCount:0}};let n=Array.isArray(e.tables)?e.tables:[];n.forEach((a,i)=>{let l=K(a?.name,`\u8868${i+1}`),d=Array.isArray(a?.columns)?a.columns:[],c=Array.isArray(a?.rows)?a.rows:[],u=new Set;l||r.push(Ls({severity:"error",message:`\u8868 ${i+1} \u7F3A\u5C11\u540D\u79F0\u3002`,tableIndex:i,tableName:l})),d.forEach((y,p)=>{let g=K(y?.key,""),m=K(y?.title,`\u5217${p+1}`);g||r.push(Ls({severity:"error",message:`${l} / ${m} \u7F3A\u5C11\u5185\u90E8\u540D\u3002`,tableIndex:i,tableName:l,columnIndex:p,columnKey:g,cellKey:g})),g&&(u.has(g)&&r.push(Ls({severity:"error",message:`${l} \u4E2D\u5B58\u5728\u91CD\u590D\u5217\u5185\u90E8\u540D\uFF1A${g}`,tableIndex:i,tableName:l,columnIndex:p,columnKey:g,cellKey:g})),u.add(g))}),c.forEach((y,p)=>{let g=K(y?.name,`\u884C${p+1}`),m=y?.cells&&typeof y.cells=="object"&&!Array.isArray(y.cells)?y.cells:{};Object.keys(m).forEach(b=>{d.some(w=>K(w?.key,"")===b)||r.push(Ls({severity:"warning",message:`${l} / ${g} \u5305\u542B\u672A\u5B9A\u4E49\u5217 ${b}\uFF0C\u4FDD\u5B58\u540E\u4F1A\u88AB\u5FFD\u7565\u3002`,tableIndex:i,tableName:l,rowIndex:p,rowName:g,cellKey:b}))}),d.forEach((b,w)=>{let S=K(b?.key,""),_=K(b?.title||S,`\u5217${w+1}`),k=S?an(m[S]):"",v=Lf(k,b,{label:`${l} / ${g} / ${_}`,tableName:l,rowName:g});v.errors.forEach(C=>{r.push(Ls({severity:"error",message:C,tableIndex:i,tableName:l,columnIndex:w,columnKey:S,rowIndex:p,rowName:g,cellKey:S}))}),v.warnings.forEach(C=>{r.push(Ls({severity:"warning",message:C,tableIndex:i,tableName:l,columnIndex:w,columnKey:S,rowIndex:p,rowName:g,cellKey:S}))})})})});let s=r.filter(a=>a.severity!=="warning").map(a=>a.message),o=r.filter(a=>a.severity==="warning").map(a=>a.message);return{valid:s.length===0,errors:s,warnings:o,issues:r,tables:n,summary:{errorCount:s.length,warningCount:o.length}}}function Df(){return{tables:le(Os),promptTemplate:Bc,apiPreset:"",promptPreset:"",bypass:{enabled:!1,presetId:""},activeTemplate:Et,autoUpdateEnabled:!1,autoUpdateTrigger:"assistantMessage",runScope:_t.ENABLED,scope:{mode:_t.ENABLED,selectedTableIds:[],activeTableId:""},fillMode:gi.INCREMENTAL,contextDepth:8,contextRoles:"all",contextExtractTags:[],contextUseGlobalRules:!1,worldbooks:{enabled:!1,selected:[]},sendLatestRows:-1,mirrorToMessage:!1,mirrorTag:"yyt-table-workbench",worldbookSync:{enabled:!1,injectionMode:"character_card",targetBook:"",entryComment:"YYT-\u586B\u8868\u6570\u636E"},wrapperConfig:{enabled:!0,wrapperTag:"\u6700\u65B0\u6570\u636E\u4E0E\u8BB0\u5F55",wrapperHint:"\u4EE5\u4E0B\u662F\u5728\u8FD9\u4E2A\u65F6\u95F4\u70B9\uFF0C\u5F53\u524D\u573A\u666F\u4E0B\u5267\u60C5\u76F8\u5173\u7684\u6700\u65B0\u6570\u636E\u4E0E\u8BB0\u5F55\uFF0C\u4F60\u5728\u8FDB\u884C\u5267\u60C5\u5206\u6790\u65F6\u5FC5\u987B\u4EE5\u6B64\u6700\u65B0\u7684\u6570\u636E\u4E3A\u51C6\uFF0C\u4EE5\u4E0B\u6570\u636E\u4E0E\u8BB0\u5F55\u7684\u4F18\u5148\u7EA7\u9AD8\u4E8E\u5176\u4ED6\u4EFB\u4F55\u80CC\u666F\u8BBE\u5B9A\uFF1A",wrapperPlacement:{position:"before_character_definition",depth:2,order:0}},tableEnabledOverrides:{},runtime:Of()}}function Xt(t={}){let e=Df(),r=t&&typeof t=="object"?t:{},n=r.bypass?r.bypass:r.bypassPresetId?{presetId:r.bypassPresetId,enabled:!!r.bypassPresetId}:void 0,s=h0(n,r.promptPreset),o=d0(r.tables,{seedDefaultWhenMissing:!Object.prototype.hasOwnProperty.call(r,"tables")}),a=r.scope&&typeof r.scope=="object"?r.scope:{},i=typeof r.runScope=="string"&&r.runScope?{...a,mode:r.runScope}:a,l=Yo(i,{mode:r.runScope,selectedTableIds:r.selectedTableIds,activeTableId:r.activeTableId}),d=Nr(r.autoUpdateEnabled!==void 0?r.autoUpdateEnabled:r.automation?.enabled,e.autoUpdateEnabled);return{tables:o,promptTemplate:K(r.promptTemplate,e.promptTemplate),apiPreset:K(r.apiPreset,""),promptPreset:s.presetId,bypass:s,activeTemplate:K(r.activeTemplate,e.activeTemplate),autoUpdateEnabled:d,autoUpdateTrigger:K(r.autoUpdateTrigger,e.autoUpdateTrigger),runScope:l.mode,scope:l,fillMode:r.fillMode===gi.FULL?gi.FULL:e.fillMode,contextDepth:Number.isFinite(Number(r.contextDepth))&&Number(r.contextDepth)>0?Math.floor(Number(r.contextDepth)):e.contextDepth,contextRoles:r.contextRoles==="assistant_only"?"assistant_only":"all",contextExtractTags:Array.isArray(r.contextExtractTags)?r.contextExtractTags.filter(c=>typeof c=="string"&&c.trim()):typeof r.contextExtractTags=="string"&&r.contextExtractTags.trim()?r.contextExtractTags.split(`
`).map(c=>c.trim()).filter(Boolean):[],contextUseGlobalRules:Nr(r.contextUseGlobalRules??r.contextUseExtractRules??r.contextUseExcludeRules,!1),extraction:{regexPresetId:K(r.extraction?.regexPresetId,"")},worldbooks:{enabled:Nr(r.worldbooks?.enabled,!1),selected:Array.isArray(r.worldbooks?.selected)?r.worldbooks.selected.filter(c=>typeof c=="string"&&c.trim()):[],presetId:K(r.worldbooks?.presetId,"")},sendLatestRows:Number.isFinite(Number(r.sendLatestRows))?Math.floor(Number(r.sendLatestRows)):-1,mirrorToMessage:Nr(r.mirrorToMessage,e.mirrorToMessage),mirrorTag:K(r.mirrorTag,e.mirrorTag),worldbookSync:{enabled:Nr(r.worldbookSync?.enabled,!1),injectionMode:["character_card","auto_create","target_book"].includes(r.worldbookSync?.injectionMode)?r.worldbookSync.injectionMode:"character_card",targetBook:K(r.worldbookSync?.targetBook,""),entryComment:K(r.worldbookSync?.entryComment,e.worldbookSync.entryComment)},wrapperConfig:(()=>{let c=r.worldbookSync?.wrapperConfig,u=r.wrapperConfig,y=c&&!u?c:u||{};return{enabled:Nr(y.enabled,e.wrapperConfig.enabled),wrapperTag:K(y.wrapperTag,e.wrapperConfig.wrapperTag),wrapperHint:K(y.wrapperHint,e.wrapperConfig.wrapperHint),wrapperPlacement:{position:K(y.wrapperPlacement?.position,e.wrapperConfig.wrapperPlacement.position),depth:Number.isFinite(Number(y.wrapperPlacement?.depth))?Math.floor(Number(y.wrapperPlacement?.depth)):e.wrapperConfig.wrapperPlacement.depth,order:Number.isFinite(Number(y.wrapperPlacement?.order))?Math.floor(Number(y.wrapperPlacement?.order)):e.wrapperConfig.wrapperPlacement.order}}})(),tableEnabledOverrides:r.tableEnabledOverrides&&typeof r.tableEnabledOverrides=="object"&&!Array.isArray(r.tableEnabledOverrides)?Object.fromEntries(Object.entries(r.tableEnabledOverrides).filter(([c,u])=>typeof c=="string"&&c&&typeof u=="boolean")):{},runtime:Of({...e.runtime,...r.runtime||{}})}}function Hc(t={}){let e=Xt(t),r=[];return Array.isArray(e.tables)||r.push("\u8868\u5B9A\u4E49\u5FC5\u987B\u662F JSON \u6570\u7EC4\u3002"),e.promptTemplate||r.push("\u586B\u8868 Prompt \u4E0D\u80FD\u4E3A\u7A7A\u3002"),e.mirrorTag||r.push("\u6B63\u6587\u955C\u50CF\u6807\u7B7E\u4E0D\u80FD\u4E3A\u7A7A\u3002"),{valid:r.length===0,errors:r,config:e}}function be(){let t=jc.get(Uc,Df()),e=Xt(t),r=Dc();return{...Rf(e,r),guide:r}}function S0(t){let r=(Array.isArray(t?.tables)?t.tables:[]).map(n=>({...n,rows:[]}));return{...t,tables:r}}function Ze(t={}){let e=be(),r=Xt({...e,...t||{},runtime:t?.runtime===void 0?e.runtime:t.runtime}),n=Hc(r);if(!n.valid)return{success:!1,error:n.errors.join(`
`),errors:n.errors,config:n.config};let s=S0(n.config);return jc.set(Uc,s),If({templateId:n.config.activeTemplate,scope:n.config.scope,worldbookSync:n.config.worldbookSync}),{success:!0,config:n.config}}function Bf(t={}){let e=be(),r=Xt({...e,runtime:{...e.runtime,...t||{}}});return jc.set(Uc,r),r.runtime}function T0(t={},e={}){let r=Xt(t),n=K(r.promptTemplate,Bc);return e.skipResponseContract?n.trim():`${n}

${Pf}`.trim()}function zf(t={},e={}){let r=Xt(t);return{id:"tableWorkbench",name:"\u586B\u8868\u5DE5\u4F5C\u53F0",promptTemplate:T0(r,e),bypass:{enabled:r.bypass?.enabled===!0,presetId:r.bypass?.presetId||r.promptPreset||""}}}var jc,Uc,Jt=O(()=>{We();Be();Ds();fi();Mf();$f();Kc();jc=j.namespace("tableWorkbench"),Uc="config"});function qc(){return Gc||(Gc=I.createScope("TableIsolation")),Gc}var Kf,jf,Gc,Yc,ae,$r=O(()=>{We();Y();Be();Kf="tableEngine.isolation",jf=Object.freeze({enabled:!1,key:It});Yc=class{constructor(){this._cache=null,this._subscribers=new Set}getState(){if(this._cache)return this._cache;let e=j.get(Kf,null);return this._cache=this._normalize(e),this._cache}isEnabled(){return this.getState().enabled===!0}getKey(){let e=this.getState();return e.enabled?e.key||It:It}getConfiguredKey(){return this.getState().key}setEnabled(e){let r=this._normalize({...this.getState(),enabled:!!e});this._commit(r,{reason:"enabled"})}setKey(e){let r=this._normalize({...this.getState(),key:e});this._commit(r,{reason:"key"})}updateState(e={}){let r=this.getState(),n=this._normalize({enabled:e.enabled!==void 0?!!e.enabled:r.enabled,key:e.key!==void 0?e.key:r.key});this._commit(n,{reason:"patch"})}reset(){this._commit({...jf},{reason:"reset"})}getScopeKey(e){return qo(e,this.getKey())}subscribe(e){return typeof e!="function"?()=>{}:(this._subscribers.add(e),()=>this._subscribers.delete(e))}_normalize(e){return!e||typeof e!="object"?{...jf}:{enabled:e.enabled===!0,key:Me(e.key)}}_commit(e,r={}){let n=this.getState();if(n.enabled===e.enabled&&n.key===e.key)return;this._cache=e;try{j.set(Kf,e)}catch(o){qc().error("isolation \u72B6\u6001\u843D\u76D8\u5931\u8D25",o)}qc().info("isolation \u72B6\u6001\u53D8\u5316",{prev:n,next:e,reason:r.reason||""});let s={...e,prev:n,reason:r.reason||""};for(let o of this._subscribers)try{o(s)}catch(a){qc().error("isolation \u8BA2\u9605\u8005\u56DE\u8C03\u5F02\u5E38",a)}}},ae=new Yc});var Uf={};ue(Uf,{AuthorityProvider:()=>bi,default:()=>E0});var Bs,Vc,_0,dn,bi,E0,Ff=O(()=>{Y();Ks();Bs=I.createScope("AuthorityProvider"),Vc="third-party/youyou-toolkit",_0="YouYou Toolkit",dn="main",bi=class{constructor({extensionVersion:e="1.0.149"}={}){this.kind=zs.AUTHORITY,this._client=null,this._extensionVersion=e,this._initialized=!1}async init(){let e=xi();if(!e)return Bs.error("\u672A\u68C0\u6D4B\u5230 window.STAuthority.AuthoritySDK"),!1;try{return this._client=await e.init({extensionId:Vc,displayName:_0,version:this._extensionVersion,installType:"local",declaredPermissions:{sql:{private:!0}}}),this._initialized=!0,Bs.info("AuthorityProvider \u521D\u59CB\u5316\u6210\u529F",{extensionId:Vc}),!0}catch(r){return Bs.error("AuthorityProvider \u521D\u59CB\u5316\u5931\u8D25",{error:r?.message||r}),this._initialized=!1,!1}}async dispose(){this._client=null,this._initialized=!1}async migrate({migrations:e,database:r=dn,tableName:n}={}){this._ensureReady();let s={database:r,migrations:e};n&&(s.tableName=n);let o=await this._client.sql.migrate(s);return{applied:o?.applied||[],skipped:o?.skipped||[],tableName:o?.tableName,latestId:o?.latestId}}async query({statement:e,params:r=[],database:n=dn,page:s=void 0}={}){this._ensureReady();let o={database:n,statement:e,params:r};s&&(o.page=s);let a=await this._client.sql.query(o);return{columns:a.columns||[],rows:a.rows||[],rowCount:a.rowCount??(a.rows?.length||0),page:a.page}}async execute({statement:e,params:r=[],database:n=dn}={}){this._ensureReady();let s=await this._client.sql.exec({database:n,statement:e,params:r});return{rowsAffected:s.rowsAffected??0,lastInsertRowid:s.lastInsertRowid??null}}async batch({statements:e,database:r=dn}={}){this._ensureReady();let n=(e||[]).map(o=>({mode:o.mode||(/^\s*SELECT/i.test(o.statement)?"query":"exec"),statement:o.statement,params:o.params||[]}));return{results:(await this._client.sql.batch({database:r,statements:n}))?.results||[]}}async transaction({statements:e,database:r=dn}={}){this._ensureReady();let n=(e||[]).map(o=>({mode:o.mode||(/^\s*SELECT/i.test(o.statement)?"query":"exec"),statement:o.statement,params:o.params||[]})),s=await this._client.sql.transaction({database:r,statements:n});return{committed:!!s?.committed,results:s?.results||[]}}async paginate({statement:e,params:r=[],database:n=dn,page:s={}}={}){return this._ensureReady(),this.query({statement:e,params:r,database:n,page:s})}async pageAll({statement:e,params:r=[],database:n=dn,pageSize:s=200,maxPages:o}={}){this._ensureReady();let a=await this._client.sql.pageAll({database:n,statement:e,params:r},{pageSize:s,maxPages:o});return{columns:a.columns||[],rows:a.rows||[],rowCount:a.rowCount??(a.rows?.length||0)}}async backup(){return Bs.warn("backup() \u6682\u672A\u5B9E\u73B0\uFF0CAuthorityProvider \u8D70 Authority \u5185\u7F6E\u5907\u4EFD"),{kind:"authority",timestamp:Date.now()}}async export(){return Bs.warn("export() \u6682\u672A\u5B9E\u73B0\uFF0CAuthorityProvider \u8D70 Authority \u5185\u7F6E\u5BFC\u51FA"),{kind:"authority",timestamp:Date.now()}}async import(){Bs.warn("import() \u6682\u672A\u5B9E\u73B0\uFF0CAuthorityProvider \u8D70 Authority \u5185\u7F6E\u5BFC\u5165")}describe(){return{kind:this.kind,initialized:this._initialized,extensionId:Vc,database:dn,hasClient:!!this._client}}_ensureReady(){if(!this._initialized||!this._client)throw new Error("AuthorityProvider \u5C1A\u672A\u521D\u59CB\u5316")}},E0=bi});var Hf={};ue(Hf,{FallbackProvider:()=>wi,default:()=>N0});function A0(t){let e=[],r=0,n="";for(let s of t)s==="("?r+=1:s===")"&&(r-=1),s===","&&r===0?(n.trim()&&e.push(n),n=""):n+=s;return n.trim()&&e.push(n),e}function C0(t){let e=t.match(/^\s*CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?(\w+)\s*\(([\s\S]+)\)\s*$/i);if(!e)return null;let r=e[1],n=e[2],s=A0(n),o=[],a=[];for(let i of s){let l=i.trim(),d=l.match(/^PRIMARY\s+KEY\s*\(([^)]+)\)$/i);if(d){a=d[1].split(",").map(u=>u.trim());continue}let c=l.match(/^(\w+)\s+(\w+)/);c&&(o.push({name:c[1],type:c[2].toUpperCase(),raw:l}),/PRIMARY\s+KEY/i.test(l)&&!a.length&&(a=[c[1]]))}return{name:r,columns:o,pkCols:a}}function k0(t){let e=t.match(/^\s*INSERT\s+(?:OR\s+REPLACE\s+)?INTO\s+(\w+)(?:\s*\(([^)]+)\))?\s+VALUES\s*\(([^)]+)\)\s*$/i);if(!e)return null;let r=e[1],n=e[2]?e[2].split(",").map(o=>o.trim()):null,s=(e[3].match(/\?/g)||[]).length;return{name:r,cols:n,paramCount:s}}function Qc(t){let e=t.split(/\s+AND\s+/i),r=[];for(let n of e){let s=n.match(/^\s*(\w+)\s*(=|!=|<>|>=|<=|>|<)\s*\?\s*$/);if(s){let a=s[2]==="<>"?"!=":s[2];r.push({col:s[1],op:a,placeholder:!0});continue}let o=n.match(/^\s*(\w+)\s+IS\s+(NOT\s+)?NULL\s*$/i);if(o){r.push({col:o[1],op:o[2]?"IS NOT NULL":"IS NULL",placeholder:!1});continue}throw new Error(`FallbackProvider \u4E0D\u652F\u6301\u7684 WHERE \u5B50\u53E5: "${n}"`)}return r}function I0(t){let e=t.match(/^\s*SELECT\s+([\s\S]+?)\s+FROM\s+(\w+)([\s\S]*)$/i);if(!e)return null;let r=e[1].trim(),n=e[2],s=e[3],o=s.match(/\bWHERE\s+([\s\S]+?)(?=\bORDER\s+BY\b|\bLIMIT\b|\bOFFSET\b|$)/i),a=s.match(/\bORDER\s+BY\s+(\w+)\s*(ASC|DESC)?/i),i=s.match(/\bLIMIT\s+(\d+)/i),l=s.match(/\bOFFSET\s+(\d+)/i);return{name:n,cols:r==="*"?null:r.split(",").map(d=>d.trim()),where:o?Qc(o[1].trim()):null,orderBy:a?{col:a[1],dir:(a[2]||"ASC").toUpperCase()}:null,limit:i?parseInt(i[1],10):null,offset:l?parseInt(l[1],10):null}}function R0(t){let e=t.match(/^\s*UPDATE\s+(\w+)\s+SET\s+([\s\S]+?)(?:\s+WHERE\s+([\s\S]+))?\s*$/i);if(!e)return null;let r=e[1],n=e[2],s=e[3],o=n.split(",").map(a=>{let i=a.trim().match(/^(\w+)\s*=\s*\?$/);if(!i)throw new Error(`FallbackProvider \u4E0D\u652F\u6301\u7684 SET \u5B50\u53E5: "${a}"`);return i[1]});return{name:r,setCols:o,where:s?Qc(s.trim()):null}}function M0(t){let e=t.match(/^\s*DELETE\s+FROM\s+(\w+)(?:\s+WHERE\s+([\s\S]+))?\s*$/i);return e?{name:e[1],where:e[2]?Qc(e[2].trim()):null}:null}function Xc(t,e){return t===e?!0:t==null?e==null:e==null?!1:typeof t=="number"||typeof e=="number"?Number(t)===Number(e):String(t)===String(e)}function Jo(t,e){return t===e?0:t==null?-1:e==null?1:typeof t=="number"&&typeof e=="number"?t-e:String(t)<String(e)?-1:1}function P0(t,e,r){let n=t[e.col];if(e.op==="IS NULL")return n==null;if(e.op==="IS NOT NULL")return n!=null;let s=r.shift();switch(e.op){case"=":return Xc(n,s);case"!=":return!Xc(n,s);case">":return Jo(n,s)>0;case"<":return Jo(n,s)<0;case">=":return Jo(n,s)>=0;case"<=":return Jo(n,s)<=0;default:return!1}}function Jc(t,e,r){if(!e||!e.length)return!0;let n=Array.isArray(r)?[...r]:[];for(let s of e)if(!P0(t,s,n))return!1;return!0}var js,Wf,wi,N0,Gf=O(()=>{Y();We();Ks();js=I.createScope("FallbackProvider"),Wf="provider_fallback_v1";wi=class{constructor(){this.kind=zs.FALLBACK,this._tables=new Map,this._migrations=new Set,this._initialized=!1,this._dirty=!1,this._saveTimer=null}async init(){try{let e=Ce.get(Wf)||{};this._migrations=new Set(Array.isArray(e.migrations)?e.migrations:[]),this._tables=new Map;for(let[r,n]of Object.entries(e.tables||{}))this._tables.set(r,{schema:n.schema||{name:r,columns:[],pkCols:[]},rows:Array.isArray(n.rows)?n.rows:[]});return this._initialized=!0,js.info("FallbackProvider \u521D\u59CB\u5316\u5B8C\u6210",{tables:this._tables.size,migrations:this._migrations.size}),!0}catch(e){return js.error("FallbackProvider \u521D\u59CB\u5316\u5931\u8D25",{error:e?.message||e}),this._initialized=!1,!1}}async dispose(){this._flushSave(!0),this._tables.clear(),this._migrations.clear(),this._initialized=!1}async migrate({migrations:e}={}){this._ensureReady();let r=[],n=[];for(let s of e||[]){if(!s?.id||!s?.statement)continue;if(this._migrations.has(s.id)){n.push(s.id);continue}let o=s.statement.trim();if(/^CREATE\s+TABLE/i.test(o)){let a=C0(o);if(!a)throw new Error(`\u65E0\u6CD5\u89E3\u6790 CREATE TABLE: ${o}`);this._tables.has(a.name)||this._tables.set(a.name,{schema:a,rows:[]})}else if(!/^CREATE\s+(UNIQUE\s+)?INDEX/i.test(o))if(/^DROP\s+TABLE/i.test(o)){let a=o.match(/^DROP\s+TABLE\s+(?:IF\s+EXISTS\s+)?(\w+)/i);a&&this._tables.delete(a[1])}else/^ALTER\s+TABLE/i.test(o)?js.warn("FallbackProvider \u4E0D\u652F\u6301 ALTER TABLE\uFF0C\u8DF3\u8FC7",{id:s.id}):js.warn("FallbackProvider \u8DF3\u8FC7\u672A\u8BC6\u522B DDL",{id:s.id,statement:o});this._migrations.add(s.id),r.push(s.id)}return this._markDirty(),{applied:r,skipped:n}}async query({statement:e,params:r=[]}={}){this._ensureReady();let n=I0(e);if(!n)throw new Error(`\u65E0\u6CD5\u89E3\u6790 SELECT: ${e}`);let s=this._tables.get(n.name);if(!s)return{columns:n.cols||[],rows:[],rowCount:0};let o=s.rows.filter(l=>Jc(l,n.where,r));if(n.orderBy){let l=n.orderBy.dir==="DESC"?-1:1;o=[...o].sort((d,c)=>Jo(d[n.orderBy.col],c[n.orderBy.col])*l)}n.offset&&(o=o.slice(n.offset)),Number.isFinite(n.limit)&&(o=o.slice(0,n.limit));let a,i=o;return n.cols?(i=o.map(l=>{let d={};for(let c of n.cols)d[c]=l[c]===void 0?null:l[c];return d}),a=n.cols):a=s.schema?.columns?.map(l=>l.name)||(i[0]?Object.keys(i[0]):[]),{columns:a,rows:i,rowCount:i.length}}async execute({statement:e,params:r=[]}={}){this._ensureReady();let n=String(e||"").trim(),s=n.split(/\s+/)[0].toUpperCase(),o;if(s==="INSERT")o=this._doInsert(n,r);else if(s==="UPDATE")o=this._doUpdate(n,r);else if(s==="DELETE")o=this._doDelete(n,r);else throw new Error(`FallbackProvider \u4E0D\u652F\u6301\u7684 execute \u8BED\u53E5: ${e}`);return o}_doInsert(e,r){let n=k0(e);if(!n)throw new Error(`\u65E0\u6CD5\u89E3\u6790 INSERT: ${e}`);let s=this._tables.get(n.name);if(!s)throw new Error(`\u8868\u4E0D\u5B58\u5728: ${n.name}`);let o=n.cols||(s.schema.columns||[]).map(d=>d.name);if(!o.length)throw new Error(`\u8868 ${n.name} \u65E0\u5217\u5B9A\u4E49`);if(r.length!==o.length)throw new Error(`INSERT \u53C2\u6570\u6570\u91CF\u4E0D\u5339\u914D (\u671F\u671B ${o.length}, \u5B9E\u9645 ${r.length})`);let a={};for(let d=0;d<o.length;d+=1)a[o[d]]=r[d];let i=s.schema?.pkCols||[],l=/^INSERT\s+OR\s+REPLACE/i.test(e);if(i.length){let d=s.rows.findIndex(c=>i.every(u=>Xc(c[u],a[u])));if(d>=0){if(l)return s.rows[d]=a,this._markDirty(),{rowsAffected:1,lastInsertRowid:d+1};throw new Error(`PRIMARY KEY \u51B2\u7A81 (${i.join(",")})`)}}return s.rows.push(a),this._markDirty(),{rowsAffected:1,lastInsertRowid:s.rows.length}}_doUpdate(e,r){let n=R0(e);if(!n)throw new Error(`\u65E0\u6CD5\u89E3\u6790 UPDATE: ${e}`);let s=this._tables.get(n.name);if(!s)return{rowsAffected:0,lastInsertRowid:null};let o=n.setCols.length;if(r.length<o)throw new Error(`UPDATE \u53C2\u6570\u4E0D\u8DB3 (SET \u9700\u8981 ${o}, \u5B9E\u9645 ${r.length})`);let a=r.slice(0,o),i=r.slice(o),l=0;for(let d of s.rows)if(Jc(d,n.where,i)){for(let c=0;c<o;c+=1)d[n.setCols[c]]=a[c];l+=1}return l>0&&this._markDirty(),{rowsAffected:l,lastInsertRowid:null}}_doDelete(e,r){let n=M0(e);if(!n)throw new Error(`\u65E0\u6CD5\u89E3\u6790 DELETE: ${e}`);let s=this._tables.get(n.name);if(!s)return{rowsAffected:0,lastInsertRowid:null};let o=s.rows.length;s.rows=s.rows.filter(i=>!Jc(i,n.where,r));let a=o-s.rows.length;return a>0&&this._markDirty(),{rowsAffected:a,lastInsertRowid:null}}async batch({statements:e}={}){this._ensureReady();let r=[];for(let n of e||[])if(String(n.statement||"").trim().split(/\s+/)[0].toUpperCase()==="SELECT"){let o=await this.query(n);r.push({kind:"query",...o})}else{let o=await this.execute(n);r.push({kind:"exec",...o})}return{results:r}}async transaction({statements:e}={}){this._ensureReady();let r=this._snapshot();try{let{results:n}=await this.batch({statements:e});return this._flushSave(!0),{committed:!0,results:n}}catch(n){throw this._restore(r),js.warn("FallbackProvider \u4E8B\u52A1\u56DE\u6EDA",{error:n?.message||n}),n}}async paginate({statement:e,params:r=[],page:n={}}={}){this._ensureReady();let s=Number.isFinite(n?.limit)?n.limit:50,o=Number.isFinite(n?.offset)?n.offset:0,a=`${e} LIMIT ${s} OFFSET ${o}`;return this.query({statement:a,params:r})}async backup(){return this._ensureReady(),this._snapshot()}async export(){return this.backup()}async import(e){this._ensureReady(),this._restore(e||{}),this._markDirty(),this._flushSave(!0)}describe(){return{kind:this.kind,initialized:this._initialized,tables:this._tables.size,migrations:this._migrations.size,tableNames:[...this._tables.keys()]}}_snapshot(){let e={};for(let[r,n]of this._tables)e[r]={schema:n.schema,rows:JSON.parse(JSON.stringify(n.rows))};return{migrations:[...this._migrations],tables:e}}_restore(e){this._migrations=new Set(Array.isArray(e?.migrations)?e.migrations:[]),this._tables=new Map;for(let[r,n]of Object.entries(e?.tables||{}))this._tables.set(r,{schema:n.schema||{name:r,columns:[],pkCols:[]},rows:Array.isArray(n.rows)?n.rows:[]})}_markDirty(){this._dirty=!0,this._saveTimer&&clearTimeout(this._saveTimer),this._saveTimer=setTimeout(()=>this._flushSave(!1),300)}_flushSave(e){if(this._saveTimer&&(clearTimeout(this._saveTimer),this._saveTimer=null),!(!this._dirty&&!e))try{Ce.set(Wf,this._snapshot()),this._dirty=!1}catch(r){js.error("FallbackProvider \u6301\u4E45\u5316\u5931\u8D25",{error:r?.message||r})}}_ensureReady(){if(!this._initialized)throw new Error("FallbackProvider \u5C1A\u672A\u521D\u59CB\u5316")}},N0=wi});var qf={};ue(qf,{PROVIDER_KIND:()=>zs,createProvider:()=>$0,detectAuthoritySdk:()=>xi,disposeToolDataProvider:()=>O0,getCurrentProvider:()=>Us,getToolDataProvider:()=>Qo});function xi(){if(typeof window>"u")return null;try{let t=window.STAuthority?.AuthoritySDK;if(t)return t}catch{}try{if(window.parent&&window.parent!==window){let t=window.parent.STAuthority?.AuthoritySDK;if(t)return t}}catch{}return null}async function ed({preferAuthority:t=!0,extensionVersion:e="1.0.149"}={}){if(t&&xi()){let{AuthorityProvider:n}=await Promise.resolve().then(()=>(Ff(),Uf));return new n({extensionVersion:e})}let{FallbackProvider:r}=await Promise.resolve().then(()=>(Gf(),Hf));return new r}async function Qo(t={}){return Vn||Xo||(Xo=(async()=>{let e=await ed({preferAuthority:!0,...t}),r=await e.init();if(!r&&e.kind===zs.AUTHORITY){Zc.warn("AuthorityProvider \u521D\u59CB\u5316\u5931\u8D25\uFF0C\u964D\u7EA7\u5230 FallbackProvider");try{await e.dispose()}catch{}e=await ed({preferAuthority:!1}),r=await e.init()}return r?Zc.info(`Provider \u521D\u59CB\u5316\u5B8C\u6210: kind=${e.kind}`):Zc.error(`Provider \u5168\u90E8\u521D\u59CB\u5316\u5931\u8D25 (kind=${e.kind})`),Vn=e,e})(),Xo)}function Us(){return Vn}async function $0(t={}){let e=await ed(t);return await e.init(),e}async function O0(){if(Vn){try{await Vn.dispose()}catch{}Vn=null}Xo=null}var Zc,zs,Vn,Xo,Ks=O(()=>{Y();Zc=I.createScope("ToolDataProvider"),zs=Object.freeze({AUTHORITY:"authority",FALLBACK:"fallback"}),Vn=null,Xo=null});var id={};ue(id,{clearChatScopeConfig:()=>ig,clearLockEntry:()=>rg,clearScopeLocks:()=>sg,clearSheetLocks:()=>ng,clearSlot:()=>Zf,commitSlotTables:()=>_i,default:()=>D0,deleteRowsBySheet:()=>Xf,deleteSheetsBySlot:()=>Ti,ensureTableDataReady:()=>et,getChatScopeConfig:()=>og,getCurrentTableDataProvider:()=>Vf,getLocksForSheet:()=>eg,getRowsBySheet:()=>ad,getSheetsBySlot:()=>sd,loadSlotTables:()=>Qf,setChatScopeConfig:()=>ag,setLockEntry:()=>tg,upsertSheetMeta:()=>nd,upsertSheetRows:()=>od});function rd(){return td||(td=I.createScope("TableDataService")),td}async function et(){return Yf?Us():Zo||(Zo=(async()=>{try{let t=await Qo();if(!t)return rd().error("Provider \u4E0D\u53EF\u7528\uFF0C\u8DF3\u8FC7 migration"),null;let e=await t.migrate({migrations:[...L0]});return Yf=!0,rd().info("\u8868\u683C\u6570\u636E migration \u5B8C\u6210",{kind:t.kind,applied:e?.applied?.length||0,skipped:e?.skipped?.length||0}),t}catch(t){return rd().error("table-data-service migration \u5931\u8D25",t),null}finally{Zo=null}})(),Zo)}function Vf(){return Us()}function Jf(){return Date.now()}function vi(t){try{return JSON.stringify(t)}catch{return"{}"}}function Si(t,e=null){if(typeof t!="string")return e;try{return JSON.parse(t)}catch{return e}}function un(t={}){return{chatId:String(t.chatId??"").trim(),messageId:String(t.messageId??"").trim(),swipeId:String(t.swipeId??"0").trim()||"0",isolationKey:Me(t.isolationKey)}}function pn(t){return t&&t.chatId&&t.messageId}async function nd(t,e){let r=await et();if(!r)return!1;let n=un(t);return!pn(n)||!e?.uid?!1:(await r.execute({statement:`INSERT INTO table_sheets
      (chat_id, message_id, swipe_id, isolation_key, sheet_uid, name, columns_json, meta_json, order_no, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,params:[n.chatId,n.messageId,n.swipeId,n.isolationKey,String(e.uid),String(e.name??e.uid),vi(Array.isArray(e.columns)?e.columns:[]),vi(e.meta||e.sourceData||{}),Number.isFinite(e.orderNo)?e.orderNo:0,Jf()]}),!0)}async function sd(t){let e=await et();if(!e)return[];let r=un(t);return pn(r)?((await e.query({statement:`SELECT * FROM table_sheets
      WHERE chat_id = ? AND message_id = ? AND swipe_id = ? AND isolation_key = ?
      ORDER BY order_no ASC`,params:[r.chatId,r.messageId,r.swipeId,r.isolationKey]}))?.rows||[]).map(s=>({uid:s.sheet_uid,name:s.name,columns:Si(s.columns_json,[]),meta:Si(s.meta_json,{}),orderNo:s.order_no||0,updatedAt:s.updated_at||0})):[]}async function Ti(t){let e=await et();if(!e)return 0;let r=un(t);return pn(r)&&(await e.execute({statement:`DELETE FROM table_sheets
      WHERE chat_id = ? AND message_id = ? AND swipe_id = ? AND isolation_key = ?`,params:[r.chatId,r.messageId,r.swipeId,r.isolationKey]}))?.rowsAffected||0}async function od(t,e,r){let n=await et();if(!n)return!1;let s=un(t);if(!pn(s)||!e||!Array.isArray(r))return!1;if(await n.execute({statement:`DELETE FROM table_rows
      WHERE chat_id = ? AND message_id = ? AND swipe_id = ? AND isolation_key = ? AND sheet_uid = ?`,params:[s.chatId,s.messageId,s.swipeId,s.isolationKey,String(e)]}),r.length===0)return!0;let o=r.map((a,i)=>({statement:`INSERT INTO table_rows
      (chat_id, message_id, swipe_id, isolation_key, sheet_uid, row_index, row_id, row_name, cells_json)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,params:[s.chatId,s.messageId,s.swipeId,s.isolationKey,String(e),i,String(a?.id??""),String(a?.name??""),vi(a?.cells||{})]}));return typeof n.transaction=="function"?await n.transaction({statements:o}):await n.batch({statements:o}),!0}async function ad(t,e){let r=await et();if(!r)return[];let n=un(t);return!pn(n)||!e?[]:((await r.query({statement:`SELECT * FROM table_rows
      WHERE chat_id = ? AND message_id = ? AND swipe_id = ? AND isolation_key = ? AND sheet_uid = ?
      ORDER BY row_index ASC`,params:[n.chatId,n.messageId,n.swipeId,n.isolationKey,String(e)]}))?.rows||[]).map(o=>({id:o.row_id||"",name:o.row_name||"",cells:Si(o.cells_json,{}),rowIndex:o.row_index}))}async function Xf(t,e){let r=await et();if(!r)return 0;let n=un(t);return!pn(n)||!e?0:(await r.execute({statement:`DELETE FROM table_rows
      WHERE chat_id = ? AND message_id = ? AND swipe_id = ? AND isolation_key = ? AND sheet_uid = ?`,params:[n.chatId,n.messageId,n.swipeId,n.isolationKey,String(e)]}))?.rowsAffected||0}async function Qf(t){let e=await sd(t);if(e.length===0)return[];let r=[];for(let n of e){let s=await ad(t,n.uid);r.push({id:n.uid,uid:n.uid,name:n.name,columns:n.columns,rows:s,meta:n.meta,orderNo:n.orderNo,updatedAt:n.updatedAt})}return r}async function _i(t,e){let r=await et();if(!r)return!1;let n=un(t);if(!pn(n)||!Array.isArray(e))return!1;await Ti(n),await r.execute({statement:`DELETE FROM table_rows
      WHERE chat_id = ? AND message_id = ? AND swipe_id = ? AND isolation_key = ?`,params:[n.chatId,n.messageId,n.swipeId,n.isolationKey]});for(let s=0;s<e.length;s++){let o=e[s],a=String(o?.uid||o?.id||`sheet_${s+1}`);await nd(n,{uid:a,name:o?.name||a,columns:o?.columns||[],meta:o?.meta||{},orderNo:Number.isFinite(o?.orderNo)?o.orderNo:s}),await od(n,a,Array.isArray(o?.rows)?o.rows:[])}return!0}async function Zf(t){let e=await et();if(!e)return!1;let r=un(t);return pn(r)?(await Ti(r),await e.execute({statement:`DELETE FROM table_rows
      WHERE chat_id = ? AND message_id = ? AND swipe_id = ? AND isolation_key = ?`,params:[r.chatId,r.messageId,r.swipeId,r.isolationKey]}),!0):!1}async function eg(t,e){let r=await et();if(!r)return[];let n=String(t?.chatId??"").trim(),s=Me(t?.isolationKey);return!n||!e?[]:((await r.query({statement:`SELECT lock_type, target FROM table_locks
      WHERE chat_id = ? AND isolation_key = ? AND sheet_uid = ?`,params:[n,s,String(e)]}))?.rows||[]).map(a=>({lockType:a.lock_type,target:a.target||""}))}async function tg(t,e,r,n=""){let s=await et();if(!s)return!1;let o=String(t?.chatId??"").trim(),a=Me(t?.isolationKey);return!o||!e||!r?!1:(await s.execute({statement:"INSERT INTO table_locks (chat_id, isolation_key, sheet_uid, lock_type, target) VALUES (?, ?, ?, ?, ?)",params:[o,a,String(e),String(r),String(n)]}),!0)}async function rg(t,e,r,n=""){let s=await et();if(!s)return!1;let o=String(t?.chatId??"").trim(),a=Me(t?.isolationKey);return!o||!e||!r?!1:(await s.execute({statement:`DELETE FROM table_locks
      WHERE chat_id = ? AND isolation_key = ? AND sheet_uid = ? AND lock_type = ? AND target = ?`,params:[o,a,String(e),String(r),String(n)]}),!0)}async function ng(t,e){let r=await et();if(!r)return!1;let n=String(t?.chatId??"").trim(),s=Me(t?.isolationKey);return!n||!e?!1:(await r.execute({statement:`DELETE FROM table_locks
      WHERE chat_id = ? AND isolation_key = ? AND sheet_uid = ?`,params:[n,s,String(e)]}),!0)}async function sg(t){let e=await et();if(!e)return!1;let r=String(t?.chatId??"").trim(),n=Me(t?.isolationKey);return r?(await e.execute({statement:"DELETE FROM table_locks WHERE chat_id = ? AND isolation_key = ?",params:[r,n]}),!0):!1}async function og(t){let e=await et();if(!e)return null;let r=String(t??"").trim();if(!r)return null;let s=(await e.query({statement:"SELECT scoped_config_json FROM table_chat_scope WHERE chat_id = ?",params:[r]}))?.rows?.[0];return s?Si(s.scoped_config_json,null):null}async function ag(t,e){let r=await et();if(!r)return!1;let n=String(t??"").trim();return n?(await r.execute({statement:"INSERT INTO table_chat_scope (chat_id, scoped_config_json, updated_at) VALUES (?, ?, ?)",params:[n,vi(e||{}),Jf()]}),!0):!1}async function ig(t){let e=await et();if(!e)return!1;let r=String(t??"").trim();return r?(await e.execute({statement:"DELETE FROM table_chat_scope WHERE chat_id = ?",params:[r]}),!0):!1}var td,L0,Yf,Zo,D0,Ei=O(()=>{Y();Ks();Be();L0=Object.freeze([{id:"table_engine_v1__sheets",statement:`
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
    `.replace(/\s+/g," ").trim()}]),Yf=!1,Zo=null;D0={ensureTableDataReady:et,getCurrentTableDataProvider:Vf,upsertSheetMeta:nd,getSheetsBySlot:sd,deleteSheetsBySlot:Ti,upsertSheetRows:od,getRowsBySheet:ad,deleteRowsBySheet:Xf,loadSlotTables:Qf,commitSlotTables:_i,clearSlot:Zf,getLocksForSheet:eg,setLockEntry:tg,clearLockEntry:rg,clearSheetLocks:ng,clearScopeLocks:sg,getChatScopeConfig:og,setChatScopeConfig:ag,clearChatScopeConfig:ig}});function Lr(){return ld||(ld=I.createScope("TableChatScope")),ld}function Sr(){let t=globalThis.window||globalThis,e=t?.TavernHelper?.getCurrentChatId?.()||t?.Silvy?.getCurrentChatId?.()||t?.chat_metadata?.chat_id||t?.this_chid||t?.name1;return String(e??"").trim()||"default_chat"}function Ci(){return new Date().toISOString()}function Fs(t){return t!==null&&typeof t=="object"&&!Array.isArray(t)}function Or(t){let e=dd.get(cd,{}),n=(Fs(e)?e:{})[t];return cg(n)}function Jn(t,e){let r=dd.get(cd,{}),n=Fs(r)?r:{};n[t]=e,dd.set(cd,n),z0(t,e).catch(()=>{})}async function z0(t,e){try{let r=await Promise.resolve().then(()=>(Ei(),id));await r.ensureTableDataReady(),await r.setChatScopeConfig(t,e||{})}catch(r){Lr().warn("chat-scope SQL \u955C\u50CF\u5931\u8D25\uFF08\u4E0D\u5F71\u54CD\u4E3B\u6D41\u7A0B\uFF09",{error:r?.message||String(r)})}}function lg(){return{template:{},templateArchives:{}}}function cg(t){return Fs(t)?{template:Fs(t.template)?t.template:{},templateArchives:Fs(t.templateArchives)?t.templateArchives:{}}:lg()}function Ai(t){return Fs(t)?{mode:K0.has(t.mode)?t.mode:Qe.INHERIT_GLOBAL,presetName:typeof t.presetName=="string"?t.presetName:"",templateStr:typeof t.templateStr=="string"?t.templateStr:"",guideData:t.guideData!==void 0?le(t.guideData):null,updatedAt:typeof t.updatedAt=="string"?t.updatedAt:Ci(),source:typeof t.source=="string"?t.source:"ui"}:null}function j0(t){let e=[t.mode||"",t.presetName||"",t.templateStr||""],r=5381,n=e.join("||");for(let s=0;s<n.length;s++)r=(r<<5)+r+n.charCodeAt(s),r|=0;return String(r)}var B0,cd,ld,dd,K0,ud,Tr,dg=O(()=>{We();Y();Be();$r();B0="tableChatScope",cd="chats";dd=j.namespace(B0);K0=new Set(Object.values(Qe));ud=class{getScopedConfig(e=Sr()){return Or(e)}setScopedConfig(e,r=Sr()){let n=cg(e);return Jn(r,n),n}getTemplateScope(e,r=Sr()){let n=Me(e===void 0?ae.getKey():e),s=Or(r);return Ai(s.template[n])||null}setTemplateScope(e,r,n=Sr()){let s=Me(r===void 0?ae.getKey():r),o=Ai({...e,updatedAt:Ci()});if(!o)return Lr().warn("setTemplateScope \u6536\u5230\u65E0\u6548 state",e),null;let a=Or(n);return a.template[s]=o,Jn(n,a),Lr().info("\u6A21\u677F\u4F5C\u7528\u57DF\u5DF2\u66F4\u65B0",{chatId:n,isolationKey:s,mode:o.mode}),o}clearTemplateScope(e,r=Sr()){let n=Me(e===void 0?ae.getKey():e),s=Or(r);s.template[n]!==void 0&&(delete s.template[n],Jn(r,s),Lr().info("\u6A21\u677F\u4F5C\u7528\u57DF\u5DF2\u6E05\u9664",{chatId:r,isolationKey:n}))}archiveCurrentTemplate(e,r=Sr()){let n=Me(e===void 0?ae.getKey():e),s=Or(r),o=Ai(s.template[n]);if(!o)return null;let a=j0(o),i=Array.isArray(s.templateArchives[n])?s.templateArchives[n]:[];if(i.length>0&&i[0].fingerprint===a)return null;let l={fingerprint:a,state:le(o),archivedAt:Ci()},d=[l,...i].slice(0,Sf);return s.templateArchives[n]=d,Jn(r,s),Lr().info("\u6A21\u677F\u5DF2\u5F52\u6863",{chatId:r,isolationKey:n,archiveCount:d.length}),l}listTemplateArchives(e,r=Sr()){let n=Me(e===void 0?ae.getKey():e),s=Or(r);return(Array.isArray(s.templateArchives[n])?s.templateArchives[n]:[]).map(a=>le(a))}restoreTemplateArchive(e,r,n=Sr()){let s=Me(r===void 0?ae.getKey():r),o=Or(n),a=Array.isArray(o.templateArchives[s])?o.templateArchives[s]:[],i=a[e];if(!i)return Lr().warn("restoreTemplateArchive: \u627E\u4E0D\u5230 archive",{index:e,available:a.length}),null;this.archiveCurrentTemplate(s,n);let l=Ai({...i.state,source:"restore",updatedAt:Ci()});if(!l)return null;let d=Or(n);return d.template[s]=l,Jn(n,d),Lr().info("\u6A21\u677F\u5DF2\u6062\u590D",{chatId:n,isolationKey:s,fromArchiveIndex:e}),l}clearTemplateArchives(e,r=Sr()){let n=Me(e===void 0?ae.getKey():e),s=Or(r);Array.isArray(s.templateArchives[n])&&(delete s.templateArchives[n],Jn(r,s),Lr().info("\u6A21\u677F\u5F52\u6863\u5DF2\u6E05\u7A7A",{chatId:r,isolationKey:n}))}resetChat(e=Sr()){Jn(e,lg()),Lr().warn("\u5DF2\u91CD\u7F6E chat \u7684 ScopedConfig",{chatId:e})}},Tr=new ud});var ug,pg=O(()=>{Be();ug=Object.freeze({formatId:"youyou",displayName:"YouYou \u539F\u751F (tables \u6570\u7EC4)",detect(t){return!t||typeof t!="object"||Array.isArray(t)?!1:Array.isArray(t.tables)},parse(t){if(!t||typeof t!="object")throw new Error("youyou-importer: raw \u4E0D\u662F\u5BF9\u8C61");return{tables:Array.isArray(t.tables)?le(t.tables):[],name:typeof t.name=="string"?t.name:"",description:typeof t.description=="string"?t.description:"",promptTemplate:typeof t.promptTemplate=="string"?t.promptTemplate:""}}})});function _r(t,e=""){return t==null?e:String(t).trim()||e}function yg(t){return t&&typeof t=="object"&&Array.isArray(t.content)}function fg(t){return!t||typeof t!="object"?null:t.tables&&typeof t.tables=="object"&&!Array.isArray(t.tables)&&Object.keys(t.tables).filter(n=>n.startsWith("sheet_")&&yg(t.tables[n])).length>0?t.tables:Object.keys(t).filter(r=>r.startsWith("sheet_")&&yg(t[r])).length>0?t:null}function U0(t){return!t||typeof t!="object"?[]:Object.keys(t).filter(r=>r.startsWith("sheet_")&&t[r]&&typeof t[r]=="object").map((r,n)=>({key:r,table:t[r],fallbackOrder:n})).sort((r,n)=>{let s=Number.isFinite(r.table.orderNo)?r.table.orderNo:r.fallbackOrder,o=Number.isFinite(n.table.orderNo)?n.table.orderNo:n.fallbackOrder;return s-o}).map(({key:r,table:n},s)=>{let o=n.sourceData&&typeof n.sourceData=="object"?n.sourceData:{},a=Array.isArray(n.content)?n.content:[],i=Array.isArray(a[0])?a[0]:[],l=Fc(o.note),d=new Set,c=i.slice(1).map((y,p)=>{let g=l[p]||{},m=_r(y||g.title,`\u5217${p+1}`);return{key:ln(m||`col_${p+1}`,d),title:m,description:_r(g.description,""),type:"text",required:!1}}),u=a.slice(1).map((y,p)=>{let g=Array.isArray(y)?y:[],m={};return c.forEach((h,b)=>{m[h.key]=an(g[b+1])}),{name:_r(g[0],`\u884C${p+1}`),cells:m}});return{id:_r(n.uid||r,`sheet_${s+1}`),name:_r(n.name,`\u8868${s+1}`),note:_r(o.note,""),enabled:n.enabled!==!1,aiInstructions:{init:_r(o.initNode,""),create:_r(o.insertNode,""),update:_r(o.updateNode,""),delete:_r(o.deleteNode,"")},columns:c,rows:u}})}var gg,mg=O(()=>{Be();Jt();gg=Object.freeze({formatId:"shujuku",displayName:"shujuku \u6570\u636E\u5E93\u683C\u5F0F (sheet_x)",detect(t){return!t||typeof t!="object"||Array.isArray(t)?!1:fg(t)!==null},parse(t){let e=fg(t);if(!e)throw new Error("shujuku-importer: \u672A\u627E\u5230 sheet_xxx \u5165\u53E3");return{tables:U0(e),name:typeof t.name=="string"?t.name:"",description:typeof t.description=="string"?t.description:""}}})});var hg,bg=O(()=>{hg=Object.freeze({formatId:"youyou",displayName:"YouYou \u539F\u751F (.json)",fileExtension:".json",mimeType:"application/json",serialize(t){return{version:1,exportedAt:new Date().toISOString(),templates:Array.isArray(t)?t:[]}}})});function ea(){return pd||(pd=I.createScope("TemplateAdapter")),pd}function xg(t){if(t==null)return null;for(let e of F0){let r=!1;try{r=e.detect(t)}catch(n){ea().warn(`importer ${e.formatId} detect \u629B\u9519`,n);continue}if(r)try{let n=e.parse(t);if(n&&Array.isArray(n.tables))return ea().debug("\u9002\u914D\u5668\u547D\u4E2D",{formatId:e.formatId,displayName:e.displayName,tableCount:n.tables.length,firstTableName:n.tables[0]?.name||""}),{...n,formatId:e.formatId};ea().warn(`importer ${e.formatId} parse \u8FD4\u56DE\u65E0\u6548\u7ED3\u6784`,{hasResult:!!n,hasTablesArray:Array.isArray(n?.tables)})}catch(n){ea().warn(`importer ${e.formatId} parse \u629B\u9519\uFF0C\u5C1D\u8BD5\u4E0B\u4E00\u4E2A`,n)}}return ea().warn("importTemplateAuto: \u65E0\u9002\u914D\u5668\u547D\u4E2D",{isObject:t&&typeof t=="object",isArray:Array.isArray(t),keys:t&&typeof t=="object"?Object.keys(t).slice(0,10):[]}),null}var pd,F0,iI,wg=O(()=>{Y();pg();mg();bg();F0=Object.freeze([ug,gg]),iI=Object.freeze([hg])});function Rt(){return yd||(yd=I.createScope("TableTemplate")),yd}function ut(t,e=""){return t==null?e:String(t).trim()||e}function vg(t="template"){return`${t}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`}function Hs(t={}){let e=xg(t),r=[],n="",s="",o="",a="";e?(r=e.tables,n=e.formatId||"",s=e.name||"",o=e.description||"",a=e.promptTemplate||""):t&&typeof t=="object"&&Rt().warn("normalizeTemplate: \u65E0\u9002\u914D\u5668\u547D\u4E2D\uFF0C\u6309\u7A7A\u6A21\u677F\u5904\u7406",{keys:Object.keys(t).slice(0,10)});let i=hi({tables:r});return{id:ut(t?.id,vg()),name:ut(t?.name||s,"\u672A\u547D\u540D\u6A21\u677F"),description:ut(t?.description||o,""),tables:i.tables||r,promptTemplate:ut(t?.promptTemplate||a,""),sourceFormat:n,createdAt:ut(t?.createdAt,new Date().toISOString()),updatedAt:ut(t?.updatedAt,new Date().toISOString())}}function Sg(){ta=null}function Tg(){return[Hs({id:Et,name:zc,description:"\u5305\u542B\u5168\u5C40\u6570\u636E\u3001\u4E3B\u89D2\u3001\u91CD\u8981\u89D2\u8272\u3001\u6280\u80FD\u3001\u80CC\u5305\u3001\u4EFB\u52A1\u3001\u7EAA\u8981\u548C\u9009\u9879\u8868\u3002",tables:le(Os)})]}function Xn(){let t=Ws.get(fd,[]);return Array.isArray(t)?t.map(Hs):[]}function fn(){if(ta)return ta;let t=Tg(),e=Xn(),r=new Map(e.map(o=>[o.id,o])),n=t.map(o=>r.has(o.id)?r.get(o.id):o),s=new Set(t.map(o=>o.id));for(let o of e)s.has(o.id)||n.push(o);return ta=Object.freeze(n),ta}function Yn(t){let e=ut(t,"");return fn().find(r=>r.id===e)||null}function cn(t={}){let e=new Date().toISOString(),r=Hs({...t,id:ut(t.id,vg()),updatedAt:e,createdAt:ut(t.createdAt,e)}),s=Xn().filter(o=>o.id!==r.id);return s.push(r),Ws.set(fd,s),Sg(),{success:!0,template:r}}function md(t){let e=ut(t,"");if(!e||e===Et)return{success:!1,error:"\u5185\u7F6E\u6A21\u677F\u4E0D\u80FD\u5220\u9664\u3002"};let r=Xn().filter(n=>n.id!==e);return Ws.set(fd,r),Sg(),W0()===e&&hd(Et),{success:!0}}function _g(t,e){let r=ut(t,"");if(!r||r===Et)return{success:!1,error:"\u5185\u7F6E\u6A21\u677F\u4E0D\u80FD\u91CD\u547D\u540D\u3002"};let n=ut(e,"");if(!n)return{success:!1,error:"\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A\u3002"};let s=Yn(r);return s?cn({...s,name:n}):{success:!1,error:"\u6A21\u677F\u4E0D\u5B58\u5728\u3002"}}function ki(){return{version:1,exportedAt:new Date().toISOString(),templates:Xn()}}function Eg(t,{overwrite:e=!1}={}){let r;if(Array.isArray(t))r=t;else if(t&&typeof t=="object")Array.isArray(t.templates)?r=t.templates:t.template&&typeof t.template=="object"?r=[t.template]:r=[t];else return{success:!1,imported:0,skipped:0,errors:["\u65E0\u6548\u7684\u5BFC\u5165\u6570\u636E\u683C\u5F0F\u3002"]};Rt().info("importTemplates \u5F00\u59CB",{rawListCount:r.length,overwrite:e});let n=new Set(Xn().map(i=>i.id)),s=0,o=0,a=[];for(let i of r)try{let l=Hs(i);if(Rt().info("importTemplates \u5355\u6761",{id:l.id,name:l.name,tableCount:Array.isArray(l.tables)?l.tables.length:0,firstTableName:l.tables?.[0]?.name||""}),!e&&n.has(l.id)){o++;continue}cn(l),n.add(l.id),s++}catch(l){a.push(ut(l?.message,"\u672A\u77E5\u9519\u8BEF")),Rt().error("importTemplates \u5355\u6761\u5931\u8D25",l)}return Rt().info("importTemplates \u5B8C\u6210",{imported:s,skipped:o,errorCount:a.length}),{success:!0,imported:s,skipped:o,errors:a}}function W0(){let t=Ws.get(gd,""),e=ut(t,Et);return Yn(e)?e:Et}function hd(t){let e=ut(t,Et);return Ws.set(gd,e),Rt().info("\u5168\u5C40\u6FC0\u6D3B\u6A21\u677F\u5DF2\u5207\u6362",{templateId:e}),e}function yn(){let t=Ws.get(gd,""),e=ut(t,Et),r=Yn(e);return r||Tg()[0]}function H0(t){try{return JSON.stringify(t)}catch(e){return Rt().error("templateToString \u5931\u8D25",e),""}}function G0(t){if(!t||typeof t!="string")return null;try{let e=JSON.parse(t);return Hs(e)}catch(e){return Rt().warn("templateFromString \u53CD\u5E8F\u5217\u5316\u5931\u8D25",e),null}}function Gs({chatId:t,isolationKey:e}={}){let r=e===void 0?ae.getKey():e,n=Tr.getTemplateScope(r,t);if(!n||n.mode===Qe.INHERIT_GLOBAL){let o=yn();return Rt().debug("resolveActiveTemplate: inherit_global",{chatId:t,isolationKey:r,templateId:o?.id||"",templateName:o?.name||"",tableCount:Array.isArray(o?.tables)?o.tables.length:0,firstTableName:o?.tables?.[0]?.name||""}),{template:o,mode:Qe.INHERIT_GLOBAL,source:{templateId:o?.id||""}}}if(n.mode===Qe.CHAT_OVERRIDE){let o=G0(n.templateStr);if(o)return{template:o,mode:Qe.CHAT_OVERRIDE,source:{}};Rt().warn("chat_override templateStr \u53CD\u5E8F\u5217\u5316\u5931\u8D25\uFF0C\u964D\u7EA7\u5230 inherit_global");let a=yn();return{template:a,mode:Qe.INHERIT_GLOBAL,source:{templateId:a?.id||"",fallback:!0}}}if(n.mode===Qe.PRESET_LINK){let o=n.presetName||"",a=fn(),i=a.find(d=>d.name===o)||a.find(d=>d.id===o);if(i)return{template:i,mode:Qe.PRESET_LINK,source:{presetName:o,templateId:i.id}};Rt().warn("preset_link \u6307\u5411\u7684\u5168\u5C40\u9884\u8BBE\u4E0D\u5B58\u5728\uFF0C\u964D\u7EA7\u5230 inherit_global",{presetName:o});let l=yn();return{template:l,mode:Qe.INHERIT_GLOBAL,source:{templateId:l?.id||"",presetName:o,fallback:!0}}}let s=yn();return{template:s,mode:Qe.INHERIT_GLOBAL,source:{templateId:s?.id||"",unknownMode:n.mode}}}function Ag(t,e={}){if(!t||typeof t!="object")return{success:!1,error:"\u6A21\u677F\u4E0D\u80FD\u4E3A\u7A7A"};let r=Hs(t),n=e.isolationKey===void 0?ae.getKey():e.isolationKey;Tr.archiveCurrentTemplate(n,e.chatId);let s=Tr.setTemplateScope({mode:Qe.CHAT_OVERRIDE,templateStr:H0(r),source:e.source||"ui"},n,e.chatId);return Rt().info("applyTemplateAsChatOverride",{chatId:e.chatId,isolationKey:n,templateName:r.name}),{success:!0,scopeState:s}}function Cg(t,e={}){let r=ut(t,"");if(!r)return{success:!1,error:"presetName \u4E0D\u80FD\u4E3A\u7A7A"};let n=fn(),s=n.find(i=>i.name===r)||n.find(i=>i.id===r);if(!s)return{success:!1,error:"\u627E\u4E0D\u5230\u6307\u5B9A\u7684\u5168\u5C40\u9884\u8BBE"};let o=e.isolationKey===void 0?ae.getKey():e.isolationKey;Tr.archiveCurrentTemplate(o,e.chatId);let a=Tr.setTemplateScope({mode:Qe.PRESET_LINK,presetName:s.name,source:e.source||"ui"},o,e.chatId);return Rt().info("linkPresetToChat",{chatId:e.chatId,isolationKey:o,presetName:s.name}),{success:!0,scopeState:a}}function kg(t={}){let e=t.isolationKey===void 0?ae.getKey():t.isolationKey;return t.archive!==!1&&Tr.archiveCurrentTemplate(e,t.chatId),Tr.clearTemplateScope(e,t.chatId),Rt().info("resetChatTemplateScope",{chatId:t.chatId,isolationKey:e}),{success:!0}}function Ig(t={}){let e=t.isolationKey===void 0?ae.getKey():t.isolationKey;return Tr.listTemplateArchives(e,t.chatId)}function Rg(t,e={}){let r=e.isolationKey===void 0?ae.getKey():e.isolationKey,n=Tr.restoreTemplateArchive(t,r,e.chatId);return n?{success:!0,scopeState:n}:{success:!1,error:"\u5F52\u6863\u4E0D\u5B58\u5728"}}var Ws,fd,gd,yd,ta,Ds=O(()=>{We();Y();Jt();Be();dg();$r();wg();Ws=j.namespace("tableWorkbenchTemplates"),fd="templates",gd="activeId";ta=null});var Ng={};ue(Ng,{TableTemplatePanel:()=>Pg,default:()=>X0});function bd(t){return t===Et}function V0(t,{onChange:e,readonly:r}){let n=f("div",{style:{display:"flex",flexDirection:"column",gap:"12px"}});V(n,Dt({label:"\u63CF\u8FF0",control:me({value:t.description||"",placeholder:"\u53EF\u9009 \u2014 \u5907\u6CE8\u7528\u9014",disabled:r,onChange:a=>e({description:a})})})),V(n,f("div",{text:"\u586B\u8868\u63D0\u793A\u8BCD\u6A21\u677F",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}})),V(n,f("div",{text:"\u53EF\u4F7F\u7528\u5B8F\uFF1A{{tableData}} {{lastUserMessage}} {{lastAiMessage}} {{toolWorldbookContent}} \u7B49\u3002\u7559\u7A7A\u4F7F\u7528\u9ED8\u8BA4\u6A21\u677F\u3002",style:{fontSize:"11px",color:"var(--yyt-text-muted)",lineHeight:"1.6",marginBottom:"4px"}}));let s=f("textarea",{className:"yyt-textarea",attrs:{rows:"8",placeholder:"\u53EF\u9009 \u2014 \u81EA\u5B9A\u4E49\u586B\u8868\u63D0\u793A\u8BCD",disabled:r?"disabled":null},style:{width:"100%",resize:"vertical",fontFamily:"ui-monospace, monospace",fontSize:"12px"}});s.value=t.promptTemplate||"",s.addEventListener("change",()=>{r||e({promptTemplate:s.value})}),V(n,s),V(n,f("div",{text:`\u8868\u683C\u7ED3\u6784\uFF08${(t.tables||[]).length} \u5F20\u8868\uFF09`,style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)",marginTop:"6px"}})),V(n,f("div",{text:"\u672C\u9762\u677F\u53EA\u5C55\u793A\u8868\u7ED3\u6784 JSON\u3002\u590D\u6742 schema \u7F16\u8F91\uFF08\u589E\u5220\u8868\u3001\u5217\u5B9A\u4E49\u3001\u9ED8\u8BA4\u884C\uFF09\u5C06\u5728\u586B\u8868\u5DE5\u4F5C\u53F0\u4E2D\u63D0\u4F9B\u3002",style:{fontSize:"11px",color:"var(--yyt-text-muted)",lineHeight:"1.6",marginBottom:"4px"}}));let o=f("pre",{style:{padding:"10px 12px",background:"var(--yyt-bg-base)",border:"1px solid var(--yyt-border)",borderRadius:"var(--yyt-radius-sm, 6px)",fontFamily:"ui-monospace, monospace",fontSize:"11px",lineHeight:"1.6",color:"var(--yyt-text-secondary)",maxHeight:"260px",overflow:"auto",whiteSpace:"pre",margin:"0"}});try{o.textContent=JSON.stringify(t.tables||[],null,2)}catch{o.textContent="// \u65E0\u6CD5\u5E8F\u5217\u5316"}return V(n,o),n}function J0(t){let r=[`${(t.tables||[]).length} \u5F20\u8868`];return t.promptTemplate&&r.push("\u81EA\u5B9A\u4E49\u6A21\u677F"),r}var q0,Mg,Y0,Pg,X0,$g=O(()=>{nr();Ds();Jt();Y();Mo();q0=I.createScope("TableTemplatePanel"),Mg="";Y0={listPresets(){return fn().map(t=>({id:bd(t.id)?`builtin_table_${t.id}`:t.id,name:t.name,description:t.description||"",promptTemplate:t.promptTemplate||"",tables:t.tables||[],_rawId:t.id,createdAt:t.createdAt,updatedAt:t.updatedAt}))},getPreset(t){if(!t)return null;let e=t.startsWith("builtin_table_")?t.slice(14):t,r=Yn(e);return r?{id:bd(r.id)?`builtin_table_${r.id}`:r.id,name:r.name,description:r.description||"",promptTemplate:r.promptTemplate||"",tables:r.tables||[],_rawId:r.id,createdAt:r.createdAt,updatedAt:r.updatedAt}:null},getCurrentPresetId(){return Mg||""},setCurrentPresetId(t){return Mg=t||"",!0},createPreset(t){let e=String(t?.name||"").trim()||"\u65B0\u5EFA\u6A21\u677F",r=cn({name:e,description:t?.description||"",promptTemplate:t?.promptTemplate||"",tables:Array.isArray(t?.tables)?t.tables:[]});return r?.success?{id:r.template.id,...r.template,_rawId:r.template.id}:null},updatePreset(t,e){if(!t)return null;let r=t.startsWith("builtin_table_")?t.slice(14):t;if(bd(r))return q0.warn("\u62D2\u7EDD\u4FEE\u6539\u5185\u7F6E\u8868\u683C\u6A21\u677F"),null;let n=Yn(r);if(!n)return null;let s=cn({...n,...e,id:r});return s?.success?{id:s.template.id,...s.template,_rawId:s.template.id}:null},deletePreset(t){if(!t)return!1;let e=t.startsWith("builtin_table_")?t.slice(14):t;return!!md(e)?.success},duplicatePreset(t,e={}){let r=this.getPreset(t);if(!r)return null;let n=e.nameSuffix||" \u526F\u672C";return this.createPreset({name:`${r.name}${n}`,description:r.description,promptTemplate:r.promptTemplate,tables:r.tables})},renamePreset(t,e){if(!t||!e)return null;let r=t.startsWith("builtin_table_")?t.slice(14):t,n=_g(r,e);return n?.success?this.getPreset(n.template?.id||r):null},exportAll(){return ki()},importPresets(t){let e=Eg(t,{overwrite:!1});return{added:e?.imported||0,skipped:e?.skipped||0}},resetAll(){let t=Xn();for(let e of t)try{md(e.id)}catch{}}};Pg=qr({id:"tableTemplatePanel",kind:"table",panelTitle:"\u8868\u683C\u6A21\u677F",panelHint:"\u7BA1\u7406\u586B\u8868\u5DE5\u4F5C\u53F0\u7684\u8868\u683C\u7ED3\u6784\u6A21\u677F\u3002\u5728\u586B\u8868\u9762\u677F\u9876\u90E8\u5DE5\u5177\u680F\u53EF\u5FEB\u901F\u52A0\u8F7D/\u4FDD\u5B58\u5F53\u524D\u6A21\u677F\u3002",store:Y0,renderEditor:V0,renderListItemMeta:J0}),X0=Pg});var Lg={};ue(Lg,{ToolManagePanel:()=>Og,default:()=>Q0});var Ut,Og,Q0,Dg=O(()=>{lt();Y();Ko();xr();Ut=I.createScope("ToolManagePanel"),Og={id:"toolManagePanel",_removeDialog(t){if(!t?.length)return;let e=t.find("#yyt-tool-dialog-overlay");Lt(e,"yytToolManageDialogSelect"),e.remove()},_getToolkitWindow(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window},_openToolConfig(t){if(!t)return;let r=this._getToolkitWindow()?.YouYouToolkit||window.YouYouToolkit;if(!r){Ut.warn("\u672A\u627E\u5230\u5DE5\u5177\u7BB1\u5B9E\u4F8B\uFF0C\u65E0\u6CD5\u8DF3\u8F6C\u5230\u5DE5\u5177\u914D\u7F6E",null,{toast:!0});return}r.switchMainTab("tools"),r.switchSubTab("tools",t)},render(t){let e=mr(),r=Object.entries(e),n=r.filter(([,s])=>s?.enabled!==!1).length;return`
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
            ${pe(s.name)}
            <span class="yyt-badge" style="background: var(--yyt-accent-soft); color: var(--yyt-accent); margin-left: 6px;">${pe(s.category)}</span>
          </div>
          <div class="yyt-list-row-desc">${pe(s.description)}</div>
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
      `},bindEvents(t,e){let r=se();!r||!$e(t)||(t.off(".yytToolManage"),this._bindToolEvents(t,r),this._bindFileEvents(t,r))},_bindToolEvents(t,e){t.on("change.yytToolManage",".yyt-tool-toggle input",r=>{let n=e(r.currentTarget).closest(".yyt-list-row"),s=n.data("tool-id"),o=e(r.currentTarget).is(":checked");si(s,o),n.toggleClass("yyt-tool-item-enabled",o).toggleClass("yyt-tool-item-disabled",!o),n.find(".yyt-status-dot").toggleClass("yyt-status-dot-on",o).toggleClass("yyt-status-dot-off",!o),Ut.info(o?"\u5DE5\u5177\u5DF2\u542F\u7528":"\u5DE5\u5177\u5DF2\u7981\u7528",null,{toast:!0})}),t.on("click.yytToolManage","#yyt-add-tool",()=>{this._showToolEditDialog(t,e,null)}),t.on("click.yytToolManage",'.yyt-list-row [data-action="config"]',r=>{let n=e(r.currentTarget).closest(".yyt-list-row").data("tool-id");this._openToolConfig(n)}),t.on("click.yytToolManage",'.yyt-list-row [data-action="edit"]',r=>{let n=e(r.currentTarget).closest(".yyt-list-row").data("tool-id");this._showToolEditDialog(t,e,n)}),t.on("click.yytToolManage",'.yyt-list-row [data-action="delete"]',async r=>{let n=e(r.currentTarget).closest(".yyt-list-row").data("tool-id"),s=hr(n);if(!n||!s||!await kr("\u5220\u9664\u5DE5\u5177",`\u786E\u5B9A\u8981\u5220\u9664\u5DE5\u5177"${s.name}"\u5417\uFF1F`,{danger:!0}))return;if(!Es(n)){Ut.error("\u5220\u9664\u5931\u8D25",null,{toast:!0});return}this.renderTo(t),Ut.info("\u5DE5\u5177\u5DF2\u5220\u9664",null,{toast:"success"})})},_bindFileEvents(t,e){t.on("click.yytToolManage","#yyt-import-tools",()=>{t.find("#yyt-import-tools-file").click()}),t.on("change.yytToolManage","#yyt-import-tools-file",async r=>{let n=r.target.files[0];if(n){try{let s=await So(n),o=Cs(s,{overwrite:!1});o.success?Ut.info(o.message,null,{toast:"success"}):Ut.error(o.message,null,{toast:!0}),o.success&&this.renderTo(t)}catch(s){Ut.error(`\u5BFC\u5165\u5931\u8D25: ${s.message}`,null,{toast:!0})}e(r.target).val("")}}),t.on("click.yytToolManage","#yyt-export-tools",()=>{try{let r=As();vo(r,`youyou_toolkit_tools_${Date.now()}.json`),Ut.info("\u5DE5\u5177\u5DF2\u5BFC\u51FA",null,{toast:"success"})}catch(r){Ut.error(`\u5BFC\u51FA\u5931\u8D25: ${r.message}`,null,{toast:!0})}}),t.on("click.yytToolManage","#yyt-reset-tools",async()=>{await kr("\u91CD\u7F6E\u5DE5\u5177","\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u5DE5\u5177\u5417\uFF1F",{danger:!0})&&(ks(),this.renderTo(t),Ut.info("\u5DE5\u5177\u5DF2\u91CD\u7F6E",null,{toast:!0}))})},_showToolEditDialog(t,e,r){let n=r?hr(r):null,s=!!n,o=`
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
                       value="${n?pe(n.name):""}" placeholder="\u5DE5\u5177\u540D\u79F0">
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
                     value="${n?pe(n.description||""):""}" placeholder="\u5DE5\u5177\u63CF\u8FF0">
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
    `;this._removeDialog(t),t.append(o);let a=t.find("#yyt-tool-dialog-overlay"),i=a.find("#yyt-tool-name"),l=a.find("#yyt-tool-category"),d=a.find("#yyt-tool-desc"),c=a.find("#yyt-tool-timeout"),u=a.find("#yyt-tool-retries");pr(a,{namespace:"yytToolManageDialogSelect",selectors:["#yyt-tool-category"]});let y=()=>{Lt(a,"yytToolManageDialogSelect"),a.remove()};a.find("#yyt-tool-dialog-close, #yyt-tool-dialog-cancel").on("click",y),a.on("click",function(p){p.target===this&&y()}),a.find("#yyt-tool-dialog-save").on("click",()=>{let p=i.val().trim(),g=l.val(),m=d.val().trim(),h=parseInt(c.val())||6e4,b=parseInt(u.val())||3;if(!p){Ut.warn("\u8BF7\u8F93\u5165\u5DE5\u5177\u540D\u79F0",null,{toast:!0}),i.trigger("focus").trigger("select");return}let w=r||`tool_${Date.now()}`;if(!_s(w,{name:p,category:g,description:m,promptTemplate:n?.promptTemplate||"",extractTags:Array.isArray(n?.extractTags)?n.extractTags:[],config:{execution:{timeout:h,retries:b},api:n?.config?.api||{preset:"",useBypass:!1,bypassPreset:""},messages:Array.isArray(n?.config?.messages)?n.config.messages:[],context:{depth:n?.config?.context?.depth||3,includeTags:Array.isArray(n?.config?.context?.includeTags)?n.config.context.includeTags:[],excludeTags:Array.isArray(n?.config?.context?.excludeTags)?n.config.context.excludeTags:[]},worldbooks:{enabled:n?.config?.worldbooks?.enabled===!0,selected:Array.isArray(n?.config?.worldbooks?.selected)?n.config.worldbooks.selected:[]}},enabled:n?.enabled!==!1})){Ut.error(s?"\u5DE5\u5177\u66F4\u65B0\u5931\u8D25":"\u5DE5\u5177\u521B\u5EFA\u5931\u8D25",null,{toast:!0});return}Rs(w),y(),this.renderTo(t),Ut.info(s?"\u5DE5\u5177\u5DF2\u66F4\u65B0":"\u5DE5\u5177\u5DF2\u521B\u5EFA",null,{toast:"success"}),s||this._openToolConfig(w)})},destroy(t){!se()||!$e(t)||(this._removeDialog(t),t.off(".yytToolManage"))},getStyles(){return`
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
    `},renderTo(t){let e=this.render({});t.html(e),this.bindEvents(t,{})}},Q0=Og});var zg={};ue(zg,{BypassManager:()=>Ri,DEFAULT_BYPASS_PRESETS:()=>Br,addMessage:()=>yS,buildBypassMessages:()=>bS,bypassManager:()=>fe,createPreset:()=>aS,default:()=>xS,deleteMessage:()=>gS,deletePreset:()=>lS,duplicatePreset:()=>cS,exportPresets:()=>mS,getAllPresets:()=>sS,getDefaultPresetId:()=>dS,getEnabledMessages:()=>pS,getPreset:()=>oS,getPresetList:()=>ra,importPresets:()=>hS,setDefaultPresetId:()=>uS,updateMessage:()=>fS,updatePreset:()=>iS});function Bg(t){let e=String(t||"").trim().toLowerCase();return e==="system"?"SYSTEM":e==="assistant"||e==="ai"?"assistant":"USER"}function tS(t){return t&&typeof t=="object"&&typeof t.content=="string"&&!t.name&&!Array.isArray(t.messages)}function rS(t){return String(t||"").replace(/\$0/g,"{{toolContentMacro}}").replace(/\$1/g,"{{rawRecentMessagesText}}").replace(/\$4/g,"{{toolWorldbookContent}}").replace(/\$8/g,"{{userMessage}}").replace(/\$C/g,"{{characterCard}}")}function nS(t,e,r){let n=t.mainSlot||(t.isMain?"A":t.isMain2?"B":"");return{id:typeof t.id=="string"&&t.id.trim()?t.id.trim():`${r}_msg_${e+1}`,role:Bg(t.role),content:rS(t.content),enabled:t.enabled!==!1,deletable:t.deletable!==!1,...n?{mainSlot:n,isMain:n==="A",isMain2:n==="B"}:{}}}var Ii,Dr,qs,xd,Z0,Br,eS,Ri,fe,sS,ra,oS,aS,iS,lS,cS,dS,uS,pS,yS,fS,gS,mS,hS,bS,xS,Ys=O(()=>{We();at();Y();Ii=I.createScope("BypassManager"),Dr="bypass_presets",qs="default_bypass_preset",xd="current_bypass_preset",Z0=Object.freeze([{id:"table_fill_default_msg_1",role:"SYSTEM",content:"\u4F60\u662F\u4E00\u4E2A\u52A9\u624B\uFF0C\u8D1F\u8D23\u542C\u4ECE\u7528\u6237\u7684\u6307\u4EE4\u5B8C\u6210\u4F60\u7684\u5DE5\u4F5C",enabled:!0,deletable:!0},{id:"table_fill_default_msg_2",role:"assistant",content:"\u6536\u5230\uFF0C\u6211\u5C06\u5145\u5206\u63CF\u7ED8\u7528\u6237\u7684\u610F\u5FD7\uFF0C\u6BEB\u4E0D\u5077\u61D2\uFF0C\u5E76\u4E14\u6211\u4E00\u5B9A\u4F1A\u9075\u7167\u7528\u6237\u7684\u8981\u6C42",enabled:!0,deletable:!0},{id:"table_fill_default_msg_3",role:"USER",content:`\u4EE5\u4E0B\u662F\u4F60\u53EF\u80FD\u9700\u8981\u7528\u5230\u7684\u80CC\u666F\u8BBE\u5B9A\uFF0C\u6CE8\u610F\u4F60\u53EA\u9700\u8981\u5176\u4E2D\u5173\u4E8E\u5267\u60C5\u4EE5\u53CA\u4EBA\u8BBE\u65B9\u9762\u7684\u6570\u636E\uFF0C\u4E0D\u9700\u8981\u601D\u8003\u91CC\u8FB9\u9664\u6B64\u4E4B\u5916\u7684\u4EFB\u4F55\u683C\u5F0F\u6216\u8005\u601D\u7EF4\u94FE\u65B9\u9762\u7684\u8981\u6C42\uFF1A
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

{{userMessage}}`,enabled:!0,deletable:!1,mainSlot:"B",isMain2:!0},{id:"table_fill_default_msg_8",role:"assistant",content:"\u6536\u5230\u6307\u4EE4\uFF0C\u6211\u5C06\u4E00\u6B65\u4E00\u6B65\u5F00\u59CB\u601D\u8003\uFF0C\u5E76\u5B8C\u6210\u586B\u8868\uFF0C\u9996\u5148\u6211\u8981\u5206\u6790\u5F53\u524D\u8F6E\u6B21\u7684\u5267\u60C5\u53D8\u5316\u3002",enabled:!0,deletable:!0}]),Br={table_workbench_fill_default:{id:"table_workbench_fill_default",name:"\u9ED8\u8BA4\u586B\u8868 Ai \u6307\u4EE4\u9884\u8BBE",description:"\u7528\u4E8E\u586B\u8868\u5DE5\u4F5C\u53F0\u7684\u5185\u7F6E Ai \u6307\u4EE4\u9884\u8BBE\uFF0C\u53EF\u590D\u5236\u540E\u6309\u9700\u7F16\u8F91\u3002",enabled:!0,messages:Z0.map(t=>({...t})),createdAt:0,updatedAt:0}},eS=new Set(["\u6807\u51C6\u7834\u9650\u8BCD","\u589E\u5F3A\u7834\u9650"]);Ri=class{constructor(){this._cache=null,this._migrated=!1,this.debugMode=!1}getAllPresets(){if(this._migrateLegacyData(),this._cache)return this._cache;let e=j.get(Dr,{});return this._cache={...Br,...e},this._cache}getPresetList(){let e=this.getAllPresets();return Object.values(e).sort((r,n)=>(n.updatedAt||0)-(r.updatedAt||0))}getPreset(e){return e&&this.getAllPresets()[e]||null}presetExists(e){return!!this.getPreset(e)}createPreset(e){let{id:r,name:n,description:s,messages:o}=e;if(!r||typeof r!="string"||!r.trim())return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};if(!n||typeof n!="string"||!n.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let a=r.trim();if(this.presetExists(a))return{success:!1,message:`\u9884\u8BBE "${a}" \u5DF2\u5B58\u5728`};let i={id:a,name:n.trim(),description:s||"",enabled:!0,messages:o||[],createdAt:Date.now(),updatedAt:Date.now()};return this._savePreset(a,i),G.emit(F.BYPASS_PRESET_CREATED,{presetId:a,preset:i}),Ii.info(`\u9884\u8BBE\u5DF2\u521B\u5EFA: ${a}`),{success:!0,message:`\u9884\u8BBE "${n}" \u521B\u5EFA\u6210\u529F`,preset:i}}updatePreset(e,r){if(!e)return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};let n=this.getPreset(e);if(!n)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};if(r.id&&r.id!==e)return{success:!1,message:"\u4E0D\u5141\u8BB8\u4FEE\u6539\u9884\u8BBEID"};let s={...n,...r,id:e,updatedAt:Date.now()};return this._savePreset(e,s),G.emit(F.BYPASS_PRESET_UPDATED,{presetId:e,preset:s}),Ii.info(`\u9884\u8BBE\u5DF2\u66F4\u65B0: ${e}`),{success:!0,message:`\u9884\u8BBE "${n.name}" \u66F4\u65B0\u6210\u529F`,preset:s}}deletePreset(e){if(!e)return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};if(Br[e])return{success:!1,message:"\u4E0D\u5141\u8BB8\u5220\u9664\u9ED8\u8BA4\u9884\u8BBE"};let r=this.getPreset(e);if(!r)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let n=j.get(Dr,{});return delete n[e],j.set(Dr,n),this._cache=null,this.getDefaultPresetId()===e&&this.setDefaultPresetId(null),G.emit(F.BYPASS_PRESET_DELETED,{presetId:e}),Ii.info(`\u9884\u8BBE\u5DF2\u5220\u9664: ${e}`),{success:!0,message:`\u9884\u8BBE "${r.name}" \u5DF2\u5220\u9664`}}duplicatePreset(e,r,n){let s=this.getPreset(e);if(!s)return{success:!1,message:`\u6E90\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};if((!r||!r.trim())&&(r=`${e}_copy_${Date.now()}`),this.presetExists(r))return{success:!1,message:`\u9884\u8BBE "${r}" \u5DF2\u5B58\u5728`};let o={...JSON.parse(JSON.stringify(s)),id:r.trim(),name:n||`${s.name} (\u526F\u672C)`,createdAt:Date.now(),updatedAt:Date.now()};return this._savePreset(r.trim(),o),G.emit(F.BYPASS_PRESET_CREATED,{presetId:r,preset:o}),{success:!0,message:`\u9884\u8BBE\u5DF2\u590D\u5236\u4E3A "${o.name}"`,preset:o}}addMessage(e,r){let n=this.getPreset(e);if(!n)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let s={id:`msg_${Date.now()}`,role:Bg(r.role||"SYSTEM"),content:r.content||"",enabled:r.enabled!==!1,deletable:r.deletable!==!1,...r.mainSlot?{mainSlot:r.mainSlot}:{}},o=[...n.messages||[],s];return this.updatePreset(e,{messages:o})}updateMessage(e,r,n){let s=this.getPreset(e);if(!s)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let o=s.messages||[],a=o.findIndex(l=>l.id===r);if(a===-1)return{success:!1,message:`\u6D88\u606F "${r}" \u4E0D\u5B58\u5728`};let i=[...o];return i[a]={...i[a],...n},this.updatePreset(e,{messages:i})}deleteMessage(e,r){let n=this.getPreset(e);if(!n)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let s=n.messages||[],o=s.find(i=>i.id===r);if(!o)return{success:!1,message:`\u6D88\u606F "${r}" \u4E0D\u5B58\u5728`};if(o.deletable===!1)return{success:!1,message:"\u8BE5\u6D88\u606F\u4E0D\u53EF\u5220\u9664"};let a=s.filter(i=>i.id!==r);return this.updatePreset(e,{messages:a})}getEnabledMessages(e){let r=this.getPreset(e);return!r||!r.enabled?[]:(r.messages||[]).filter(n=>n.enabled!==!1)}getDefaultPresetId(){this._migrateLegacyData();let e=j.get(qs,null);return e==="undefined"||e==="null"||e===""?(j.remove(qs),null):e}setDefaultPresetId(e){return e&&!this.presetExists(e)?!1:(j.set(qs,e),G.emit(F.BYPASS_PRESET_ACTIVATED,{presetId:e}),Ii.info(`\u9ED8\u8BA4\u9884\u8BBE\u5DF2\u8BBE\u7F6E: ${e}`),!0)}getDefaultPreset(){let e=this.getDefaultPresetId();return e?this.getPreset(e):null}exportPresets(e=null){if(e){let n=this.getPreset(e);if(!n)throw new Error(`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`);return JSON.stringify(n,null,2)}let r=this.getAllPresets();return JSON.stringify({version:"1.0.0",exportedAt:new Date().toISOString(),presets:Object.values(r)},null,2)}importPresets(e,r={}){let{overwrite:n=!1,name:s=""}=r,o;try{o=JSON.parse(e)}catch{return{success:!1,message:"JSON\u89E3\u6790\u5931\u8D25",imported:0}}let a=j.get(Dr,{}),l=Array.isArray(o)&&o.every(tS)?[{id:this._generatePresetId(s||"\u5BFC\u5165\u586B\u8868\u6307\u4EE4\u9884\u8BBE",a),name:s||"\u5BFC\u5165\u586B\u8868\u6307\u4EE4\u9884\u8BBE",description:"\u7531\u5916\u90E8\u586B\u8868\u63D0\u793A\u8BCD\u7EC4\u5BFC\u5165\u3002",enabled:!0,messages:o}]:Array.isArray(o)?o:o.presets?o.presets:[o];if(l.length===0)return{success:!1,message:"\u6CA1\u6709\u627E\u5230\u6709\u6548\u7684\u9884\u8BBE\u6570\u636E",imported:0};let d=0;for(let c of l){let u=this._normalizePreset(c?.id,c,a);u&&(Br[u.id]&&!n||!n&&a[u.id]||(a[u.id]={...u,updatedAt:Date.now()},d++))}return d>0&&(j.set(Dr,a),this._cache=null),{success:!0,message:`\u6210\u529F\u5BFC\u5165 ${d} \u4E2A\u9884\u8BBE`,imported:d}}getToolBypassPreset(e){if(!e?.bypass?.enabled)return null;let r=e?.bypass?.presetId;return r?this.getPreset(r):this.getDefaultPreset()}buildBypassMessages(e){let r=this.getToolBypassPreset(e);return r?this.getEnabledMessages(r.id):[]}_savePreset(e,r){let n=j.get(Dr,{});n[e]=r,j.set(Dr,n),this._cache=null}_migrateLegacyData(){if(this._migrated)return;let e=j.get(Dr,{}),r={},n=!1,s=Array.isArray(e)?e.map((o,a)=>[o?.id||o?.name||`legacy_${a}`,o]):Object.entries(e||{});for(let[o,a]of s){let i=this._normalizePreset(o,a,r);if(!i){n=!0;continue}r[i.id]=i,(!e?.[i.id]||e?.[i.id]?.id!==i.id)&&(n=!0)}n&&j.set(Dr,r),this._migrateDefaultPreset(r),this._cache=null,this._migrated=!0}_normalizePreset(e,r,n={}){if(!r||typeof r!="object")return null;let s=typeof r.name=="string"?r.name.trim():"",o=typeof r.id=="string"?r.id.trim():"",a=typeof e=="string"?e.trim():"";if(!s&&a&&a!=="undefined"&&a!=="null"&&(s=a),this._isLegacySamplePreset(s,o)||(!o&&a&&a!=="undefined"&&a!=="null"&&(o=a),!o&&s&&s!=="undefined"&&s!=="null"&&(o=this._generatePresetId(s,n)),!s||!o||o==="undefined"||s==="undefined"))return null;let l=Array.isArray(r.messages)?r.messages.filter(d=>d&&typeof d=="object").map((d,c)=>nS(d,c,o)):[];return{...r,id:o,name:s,description:typeof r.description=="string"?r.description:"",enabled:r.enabled!==!1,messages:l,createdAt:r.createdAt||Date.now(),updatedAt:r.updatedAt||Date.now()}}_migrateDefaultPreset(e){let r=j.get(qs,null),n=j.get(xd,null),s=r??n;(s==="undefined"||s==="null"||s==="")&&(s=null),s&&!e[s]&&(s=Object.values(e).find(a=>a.name===s)?.id||null),s?j.set(qs,s):j.remove(qs),j.has(xd)&&j.remove(xd)}_isLegacySamplePreset(e,r=""){return e?r==="standard"||r==="enhanced"||r==="jailbreak"||eS.has(e)?!0:/^增强破限（副本）(?:\s*\(\d+\))?$/.test(e):!1}_generatePresetId(e,r={}){let n=String(e).trim().toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g,"_").replace(/^_+|_+$/g,"")||`bypass_${Date.now()}`,s=n,o=1;for(;r[s];)s=`${n}_${o++}`;return s}},fe=new Ri,sS=()=>fe.getAllPresets(),ra=()=>fe.getPresetList(),oS=t=>fe.getPreset(t),aS=t=>fe.createPreset(t),iS=(t,e)=>fe.updatePreset(t,e),lS=t=>fe.deletePreset(t),cS=(t,e,r)=>fe.duplicatePreset(t,e,r),dS=()=>fe.getDefaultPresetId(),uS=t=>fe.setDefaultPresetId(t),pS=t=>fe.getEnabledMessages(t),yS=(t,e)=>fe.addMessage(t,e),fS=(t,e,r)=>fe.updateMessage(t,e,r),gS=(t,e)=>fe.deleteMessage(t,e),mS=t=>fe.exportPresets(t),hS=(t,e)=>fe.importPresets(t,e),bS=t=>fe.buildBypassMessages(t),xS=fe});var Kg={};ue(Kg,{DEFAULT_SETTINGS:()=>na,SettingsService:()=>Pi,default:()=>wS,settingsService:()=>xt});var na,Mi,Pi,xt,wS,Vs=O(()=>{We();at();na={executor:{maxConcurrent:3,maxRetries:2,retryDelayMs:5e3,requestTimeoutMs:9e4,queueStrategy:"fifo"},automation:{settleMs:1200,cooldownMs:5e3,maxConcurrentSlots:1},debug:{enableDebugLog:!1,saveExecutionHistory:!0,showRuntimeBadge:!0},ui:{compactMode:!1,animationEnabled:!0,theme:"dark-blue",startupScreenDismissed:!1}},Mi="settings_v2",Pi=class{constructor(){this._cache=null}getSettings(){if(this._cache)return this._cache;let e=j.get(Mi,{}),r=this._migrateLegacy(e);return this._cache=this._mergeWithDefaults(r.settings),r.changed&&j.set(Mi,this._cache),this._cache}saveSettings(e){this._cache=this._mergeWithDefaults(e),j.set(Mi,this._cache),G.emit(F.SETTINGS_UPDATED,{settings:this._cache})}updateSettings(e){let r=this.getSettings(),n=this._deepMerge(r,e);this.saveSettings(n)}getExecutorSettings(){return this.getSettings().executor}updateExecutorSettings(e){this.updateSettings({executor:e})}getAutomationSettings(){return this.getSettings().automation}updateAutomationSettings(e){this.updateSettings({automation:e})}getDebugSettings(){return this.getSettings().debug}updateDebugSettings(e){this.updateSettings({debug:e})}getUiSettings(){return this.getSettings().ui}updateUiSettings(e){this.updateSettings({ui:e})}resetSettings(){this._cache=JSON.parse(JSON.stringify(na)),j.set(Mi,this._cache),G.emit(F.SETTINGS_UPDATED,{settings:this._cache,reset:!0})}get(e,r=null){let n=this.getSettings(),s=e.split("."),o=n;for(let a of s)if(o&&typeof o=="object"&&a in o)o=o[a];else return r;return o}set(e,r){let n=JSON.parse(JSON.stringify(this.getSettings())),s=e.split("."),o=n;for(let a=0;a<s.length-1;a+=1){let i=s[a];i in o||(o[i]={}),o=o[i]}o[s[s.length-1]]=r,this.saveSettings(n)}_migrateLegacy(e){if(!e||typeof e!="object")return{settings:{},changed:!1};let r=!1,n=JSON.parse(JSON.stringify(e));return n.automation&&Object.prototype.hasOwnProperty.call(n.automation,"enabled")&&(delete n.automation.enabled,r=!0),{settings:n,changed:r}}_mergeWithDefaults(e){return this._deepMerge(JSON.parse(JSON.stringify(na)),e)}_deepMerge(e,r){let n={...e};for(let s in r)r[s]&&typeof r[s]=="object"&&!Array.isArray(r[s])?n[s]=this._deepMerge(e[s]||{},r[s]):n[s]=r[s];return n}},xt=new Pi,wS=xt});var Ug={};ue(Ug,{ContextInjector:()=>Oi,DEFAULT_INJECTION_OPTIONS:()=>jg,WRITEBACK_METHODS:()=>ar,WRITEBACK_RESULT_STATUS:()=>$i,contextInjector:()=>Ft,default:()=>TS});function wd(t){return typeof t=="number"&&Number.isFinite(t)?String(t):typeof t=="string"&&t.trim()?t.trim():""}function Qn(t,e){let r=String(e||"").trim();return r?Array.isArray(t)?(t.includes(r)||t.push(r),t):[r]:t}function Ni(t={}){if(t?.signal?.aborted)return"\u5DE5\u5177\u7ED3\u679C\u5DF2\u53D6\u6D88\uFF0C\u8DF3\u8FC7\u5199\u56DE";if(typeof t?.shouldAbortWriteback=="function")try{if(t.shouldAbortWriteback()===!0)return"\u5DE5\u5177\u7ED3\u679C\u5DF2\u8FC7\u671F\uFF0C\u8DF3\u8FC7\u5199\u56DE"}catch{return"\u5DE5\u5177\u7ED3\u679C\u5DF2\u8FC7\u671F\uFF0C\u8DF3\u8FC7\u5199\u56DE"}return""}var wt,Mt,Js,jg,$i,ar,vS,SS,Oi,Ft,TS,Zn=O(()=>{at();Y();ei();wt=I.createScope("ContextInjector"),Mt="YouYouToolkit_toolOutputs",Js="YouYouToolkit_injectedContext",jg={overwrite:!0,enabled:!0};$i={SUCCESS:"success",FAILED:"failed"},ar={NONE:"none",LOCAL_ONLY:"local_only",SET_CHAT_MESSAGES:"setChatMessages",SET_CHAT_MESSAGE:"setChatMessage"},vS=60,SS=3;Oi=class{constructor(){this.debugMode=!1}async inject(e,r,n={}){return(await this.injectDetailed(e,r,n)).success}async injectDetailed(e,r,n={}){let s={...jg,...n},o=this._createWritebackResult(e,s);if(!e||r===void 0||r===null)return wt.error("\u6CE8\u5165\u5931\u8D25: \u53C2\u6570\u65E0\u6548"),o.error="\u6CE8\u5165\u5931\u8D25: \u53C2\u6570\u65E0\u6548",o;if(!wd(s.sourceMessageId))return wt.error("\u6CE8\u5165\u5931\u8D25: \u7F3A\u5C11 sourceMessageId"),o.error="\u6CE8\u5165\u5931\u8D25: \u7F3A\u5C11 sourceMessageId",o;if(s?.signal?.aborted)return o.error="\u5DE5\u5177\u7ED3\u679C\u5DF2\u53D6\u6D88\uFF0C\u8DF3\u8FC7\u5199\u56DE",o;if(typeof s?.shouldAbortWriteback=="function")try{if(s.shouldAbortWriteback()===!0)return o.error="\u5DE5\u5177\u7ED3\u679C\u5DF2\u8FC7\u671F\uFF0C\u8DF3\u8FC7\u5199\u56DE",o}catch{return o.error="\u5DE5\u5177\u7ED3\u679C\u5DF2\u8FC7\u671F\uFF0C\u8DF3\u8FC7\u5199\u56DE",o}let a=o.chatId,i={toolId:e,content:String(r),updatedAt:Date.now(),sourceMessageId:s.sourceMessageId||null,sourceSwipeId:s.sourceSwipeId||s.effectiveSwipeId||null,options:s};G.emit(F.TOOL_CONTEXT_INJECTED,{toolId:e,chatId:a,content:i.content,sourceMessageId:i.sourceMessageId,sourceSwipeId:i.sourceSwipeId,effectiveSwipeId:i.sourceSwipeId,slotBindingKey:s.slotBindingKey||"",slotRevisionKey:s.slotRevisionKey||"",slotTransactionId:s.slotTransactionId||"",traceId:s.traceId||"",sessionKey:s.sessionKey||"",options:s});let l=await this._insertToolOutputToBoundAssistantSlot(e,i,s,o);return l.success&&wt.info(`\u6CE8\u5165\u6210\u529F: ${e} -> ${a}`,{inserted:l}),l}getAggregatedContext(e){return this.getLatestMessageInjectedContext()}getLatestMessageInjectedContext(e=null){try{let{chat:r}=this._getChatRuntime(),n=this._findAssistantMessageIndex(r,e);if(n<0)return"";let s=r[n]||{},o=s[Js];if(typeof o=="string"&&o.trim())return o.trim();let a=s[Mt];return a&&typeof a=="object"?this._buildMessageInjectedContext(a).trim():""}catch(r){return wt.warn("\u8BFB\u53D6\u6700\u65B0 AI \u6D88\u606F injectedContext \u5931\u8D25",{error:r}),""}}_getLatestAssistantMessageOutputs(){try{let{chat:e}=this._getChatRuntime(),r=this._findAssistantMessageIndex(e,null);if(r<0)return{};let s=(e[r]||{})[Mt];return s&&typeof s=="object"?s:{}}catch(e){return wt.warn("\u8BFB\u53D6\u6700\u65B0 AI \u6D88\u606F\u4E0A\u4E0B\u6587\u5931\u8D25",{error:e}),{}}}getToolContext(e,r){if(!r)return null;try{let{chat:n}=this._getChatRuntime(),s=this._findAssistantMessageIndex(n,null);return s<0?null:n[s]?.[Mt]?.[r]||null}catch{return null}}getAllToolContexts(e){return this._getLatestAssistantMessageOutputs()}async clearToolContext(e,r){if(!r)return!1;try{let{api:n,context:s,chat:o}=this._getChatRuntime(),a=this._findAssistantMessageIndex(o,null);if(a<0)return!1;let i=o[a],l=i?.[Mt];if(!l||!l[r])return!1;delete l[r],i[Mt]=l,i[Js]=this._buildMessageInjectedContext(l);let d=s?.saveChat||n?.saveChat||null;return typeof d=="function"&&await d.call(s||n),G.emit(F.TOOL_CONTEXT_CLEARED,{chatId:e||this._getCurrentChatId(),toolId:r}),!0}catch(n){return wt.warn("\u6E05\u9664\u5DE5\u5177\u4E0A\u4E0B\u6587\u5931\u8D25",{error:n}),!1}}async clearAllContext(e){try{let{api:r,context:n,chat:s}=this._getChatRuntime(),o=this._findAssistantMessageIndex(s,null);if(o<0)return!1;let a=s[o];delete a[Mt],delete a[Js];let i=n?.saveChat||r?.saveChat||null;return typeof i=="function"&&await i.call(n||r),G.emit(F.TOOL_CONTEXT_CLEARED,{chatId:e||this._getCurrentChatId(),allTools:!0}),!0}catch(r){return wt.warn("\u6E05\u9664\u6240\u6709\u5DE5\u5177\u4E0A\u4E0B\u6587\u5931\u8D25",{error:r}),!1}}clearAllChatsContexts(){wt.info("\u6E05\u9664\u6240\u6709\u4E0A\u4E0B\u6587")}hasToolContext(e,r){return!!this.getToolContext(e,r)}getContextSummary(e){let r=this._getLatestAssistantMessageOutputs(),n=Object.entries(r).map(([s,o])=>({toolId:s,updatedAt:o.updatedAt,contentLength:o.content?.length||0}));return{chatId:e||this._getCurrentChatId(),tools:n,totalCount:n.length}}exportContext(e){return{chatId:e||this._getCurrentChatId(),contexts:this._getLatestAssistantMessageOutputs(),exportedAt:Date.now()}}importContext(e,r={}){return!1}_getChatRuntime(){try{let e=typeof window.parent<"u"&&window.parent!==window?window.parent:window,r=e.SillyTavern||null,n=r?.getContext?.()||null,s=Array.isArray(n?.chat)?n.chat:[],o=Array.isArray(r?.chat)?r.chat:[],a=s.length?s:o;return{topWindow:e,api:r,context:n,chat:a,contextChat:s,apiChat:o}}catch{return{topWindow:null,api:null,context:null,chat:[],contextChat:[],apiChat:[]}}}_createWritebackResult(e,r={}){let n=ar.SET_CHAT_MESSAGES;return{success:!1,toolId:e,chatId:this._getCurrentChatId(),traceId:r.traceId||"",sessionKey:r.sessionKey||"",sourceMessageId:r.sourceMessageId||null,sourceSwipeId:r.sourceSwipeId||r.effectiveSwipeId||null,effectiveSwipeId:r.effectiveSwipeId||r.sourceSwipeId||null,slotBindingKey:r.slotBindingKey||"",slotRevisionKey:r.slotRevisionKey||"",slotTransactionId:r.slotTransactionId||"",messageIndex:-1,textField:"",blockIdentity:null,hostUpdateMethod:ar.NONE,commit:{preferredMethod:n,attemptedMethods:[],appliedMethod:ar.NONE,fallbackUsed:!1,contentCommitted:!1,hostCommitApplied:!1},refresh:{requestMethods:[],requested:!1,confirmChecks:0,confirmed:!1,confirmedBy:"",eventSource:"",eventName:""},contentCommitted:!1,hostCommitApplied:!1,refreshRequested:!1,refreshConfirmed:!1,writebackStatus:$i.FAILED,replacedExistingBlock:!1,insertedNewBlock:!1,conflictDetected:!1,conflictReason:"",preservedOtherToolBlocks:!0,error:"",errors:[],steps:{foundTargetMessage:!1,contentCommitted:!1,localTextApplied:!1,runtimeSynced:!1,hostSetChatMessages:!1,hostSetChatMessage:!1,refreshForceSetChatMessage:!1,saveChatDebounced:!1,saveChat:!1,refreshRequested:!1,notifiedMessageUpdated:!1,verifiedAfterWrite:!1,refreshConfirmed:!1},verification:{textIncludesContent:!1,mirrorStored:!1,refreshConfirmed:!1}}}async _wait(e){await new Promise(r=>setTimeout(r,e))}_collectWritebackVerification(e,r,n,s,o,a=null){let i=e?.contextChat?.[n]||e?.apiChat?.[n]||r?.[n]||a||null,l=this._getWritableMessageField(i).text||"",d=i?.[Mt]?.[s],c=o?l.includes(o):!0,u=!!(d&&String(d.content||"").trim()===o);return{latestMessage:i,latestText:l,textIncludesContent:c,mirrorStored:u}}async _confirmRefresh(e,r,n,s,o,a=null){let i=1,l=this._collectWritebackVerification(e,r,n,s,o,a);for(let d=0;d<SS;d+=1){if(l.textIncludesContent&&l.mirrorStored)return{...l,refreshConfirmed:!0,confirmChecks:i,confirmedBy:"text_and_mirror_present"};await this._wait(vS),i+=1,l=this._collectWritebackVerification(e,r,n,s,o,a)}return{...l,refreshConfirmed:l.textIncludesContent&&l.mirrorStored,confirmChecks:i,confirmedBy:l.textIncludesContent&&l.mirrorStored?"text_and_mirror_present":""}}async _requestAssistantMessageRefresh(e,r,n,s={},o=null){let a=o||this._createWritebackResult("",s),{api:i,context:l}=e||{},d=e?.topWindow||(typeof window.parent<"u"&&window.parent!==window?window.parent:window),c=d?.TavernHelper?.setChatMessages||l?.setChatMessages||i?.setChatMessages||d?.setChatMessages||null;a.commit.preferredMethod=typeof c=="function"?ar.SET_CHAT_MESSAGES:ar.LOCAL_ONLY;let u=!1,y=Ni(s);if(y)return a.error=y,a;if(typeof c=="function"){Qn(a.commit.attemptedMethods,ar.SET_CHAT_MESSAGES);try{let p=Ni(s);if(p)return a.error=p,a;let g=wd(s.sourceMessageId)||r;await c([{message_id:g,message:n}],{refresh:"affected"}),a.steps.hostSetChatMessages=!0,a.hostUpdateMethod=ar.SET_CHAT_MESSAGES,a.hostCommitApplied=!0,a.commit.appliedMethod=ar.SET_CHAT_MESSAGES,a.commit.hostCommitApplied=!0,u=!0}catch(p){wt.error("setChatMessages \u5199\u56DE\u5931\u8D25\uFF0C\u56DE\u9000\u672C\u5730\u540C\u6B65",{error:p}),a.errors.push(`setChatMessages: ${p?.message||String(p)}`)}}return u&&(a.refreshRequested=!0,Qn(a.refresh.requestMethods,a.hostUpdateMethod)),u||(Qn(a.commit.attemptedMethods,ar.LOCAL_ONLY),a.commit.appliedMethod=ar.LOCAL_ONLY,a.commit.fallbackUsed=!0,a.hostUpdateMethod=a.commit.appliedMethod),a}_inferBlockType(e){let r=String(e||"").trim();if(!r)return"empty";let n=r.match(/^<([a-zA-Z0-9_-]+)(?:\s[^>]*)?>[\s\S]*<\/\1>$/);return n?.[1]?n[1]:"plain_text"}_stripExactStoredBlock(e,r,n=""){let s=String(e||""),o=String(r||"").trim(),a=String(n||"").trim();return o?s.includes(o)?a?{text:s.replace(o,a).trimEnd(),removed:!0,replaced:!0}:{text:s.replace(o,"").trimEnd(),removed:!0,replaced:!1}:{text:s,removed:!1,replaced:!1}:{text:s,removed:!1,replaced:!1}}_syncMessageToRuntimeChats(e,r,n){let{contextChat:s,apiChat:o}=e||{},a=i=>{!Array.isArray(i)||r<0||r>=i.length||i[r]!==n&&(i[r]={...i[r]||{},...n})};a(s),a(o)}_notifyMessageUpdated(e,r,n={}){if(n.skipNotify===!0)return{emitted:!1,source:"skipped_by_caller",eventName:""};try{let s=Ct.describe(),o=e?.topWindow||Qa();return s.hasBridge?(Ct.emit(Ve.MESSAGE_UPDATED,r),typeof o?.requestAnimationFrame=="function"?o.requestAnimationFrame(()=>{Ct.emit(Ve.MESSAGE_UPDATED,r)}):typeof o?.setTimeout=="function"&&o.setTimeout(()=>{Ct.emit(Ve.MESSAGE_UPDATED,r)},30),{emitted:!0,source:s.source||"unavailable",eventName:Ve.MESSAGE_UPDATED}):{emitted:!1,source:s.source||"unavailable",eventName:Ve.MESSAGE_UPDATED}}catch(s){return wt.warn("\u89E6\u53D1\u6D88\u606F\u5237\u65B0\u4E8B\u4EF6\u5931\u8D25",{error:s}),{emitted:!1,source:"error",eventName:"",error:s?.message||String(s)}}}_isAssistantMessage(e){if(!e||e.is_user||e.is_system)return!1;let r=String(e.role||"").toLowerCase();return r==="assistant"||r==="ai"||!r}_findAssistantMessageIndex(e,r){let n=Array.isArray(e)?e:[];if(!n.length)return-1;let s=r!=null&&r!=="",o=(a,i)=>{if(!this._isAssistantMessage(a)||r==null||r==="")return!1;let l=String(r).trim();return l?[a.message_id,a.id,a.messageId,a.mes_id,i].map(c=>c==null?"":String(c).trim()).includes(l):!1};for(let a=n.length-1;a>=0;a-=1)if(o(n[a],a))return a;if(s)return-1;for(let a=n.length-1;a>=0;a-=1)if(this._isAssistantMessage(n[a]))return a;return-1}_buildMessageInjectedContext(e){let n=Object.entries(e&&typeof e=="object"?e:{}).filter(([,o])=>o?.blockType!=="full_message").sort(([,o],[,a])=>(o?.updatedAt||0)-(a?.updatedAt||0));if(!n.length)return"";let s=["[\u5DE5\u5177\u4E0A\u4E0B\u6587\u6CE8\u5165]",""];for(let[o,a]of n)s.push(`[${o}]`),s.push(a?.content||""),s.push("");return s.join(`
`)}_getWritableMessageField(e){let r=["mes","message","content","text"];for(let n of r)if(typeof e?.[n]=="string")return{key:n,text:e[n]};return{key:"mes",text:""}}_applyMessageText(e,r,n={}){let s=e&&typeof e=="object"?e:{},o=["mes","message","content","text"],a=!1;if(o.forEach(i=>{typeof s[i]=="string"&&(s[i]=r,a=!0)}),a||(s.mes=r,s.message=r),Array.isArray(s.swipes)){let i=Number.parseInt(wd(n?.sourceSwipeId||n?.effectiveSwipeId),10),l=Number.isInteger(i)?i:Number.isInteger(s.swipe_id)?s.swipe_id:Number.isInteger(s.swipeId)?s.swipeId:0;l>=0&&l<s.swipes.length&&(s.swipes[l]=r,s.swipe_id=l,s.swipeId=l)}return s}_stripExistingToolOutput(e,r=[]){let n=String(e||"");return(Array.isArray(r)?r:[]).forEach(o=>{let a=String(o||"").trim();if(!a)return;if(a.startsWith("regex:")){try{let c=new RegExp(a.slice(6).trim(),"gis");n=n.replace(c,"")}catch(c){wt.warn("\u79FB\u9664\u65E7\u5DE5\u5177\u8F93\u51FA\u65F6\u6B63\u5219\u65E0\u6548",{value:a,error:c})}return}let i=a.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),l=new RegExp(`<${i}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${i}>\\s*`,"gi"),d=new RegExp(`\\{${i}\\|[\\s\\S]*?\\}\\s*`,"gi");n=n.replace(l,""),n=n.replace(d,"")}),n.trimEnd()}_stripPreviousStoredToolContent(e,r){let n=String(e||""),s=String(r||"").trim();return s?n.replace(s,"").trimEnd():n.trimEnd()}async _insertToolOutputToBoundAssistantSlot(e,r,n={},s=null){let o=s||this._createWritebackResult(e,n);try{let a=this._getChatRuntime(),{context:i,chat:l}=a;if(!Array.isArray(l)||!l.length)return wt.error("\u672A\u627E\u5230\u804A\u5929\u6D88\u606F\uFF0C\u65E0\u6CD5\u63D2\u5165\u5DE5\u5177\u8F93\u51FA"),o.error="\u672A\u627E\u5230\u804A\u5929\u6D88\u606F\uFF0C\u65E0\u6CD5\u63D2\u5165\u5DE5\u5177\u8F93\u51FA",o;let d=this._findAssistantMessageIndex(l,n.sourceMessageId);if(d<0)return wt.error("\u672A\u627E\u5230\u53EF\u5199\u5165\u7684\u6700\u65B0 AI \u56DE\u590D\u6D88\u606F"),o.error="\u672A\u627E\u5230\u53EF\u5199\u5165\u7684\u6700\u65B0 AI \u56DE\u590D\u6D88\u606F",o;if(n?.signal?.aborted)return o.error="\u5DE5\u5177\u7ED3\u679C\u5DF2\u53D6\u6D88\uFF0C\u8DF3\u8FC7\u5199\u56DE",o;if(typeof n?.shouldAbortWriteback=="function")try{if(n.shouldAbortWriteback()===!0)return o.error="\u5DE5\u5177\u7ED3\u679C\u5DF2\u8FC7\u671F\uFF0C\u8DF3\u8FC7\u5199\u56DE",o}catch{return o.error="\u5DE5\u5177\u7ED3\u679C\u5DF2\u8FC7\u671F\uFF0C\u8DF3\u8FC7\u5199\u56DE",o}o.messageIndex=d,o.steps.foundTargetMessage=!0;let c=l[d],{key:u,text:y}=this._getWritableMessageField(c);o.textField=u;let p=c[Mt]&&typeof c[Mt]=="object"?c[Mt]:{},g=p?.[e]||{},m=g?.content||"",h=g?.blockText||m||"",b=Object.entries(p).filter(([Xe])=>Xe!==e).map(([,Xe])=>Xe||{}),w=String(r.content||"").trim(),S=n.replaceFullMessage===!0,_=S?"full_message":this._inferBlockType(w),k={toolId:e,messageId:n.sourceMessageId||c?.message_id||c?.messageId||d,blockType:_,insertedAt:r.updatedAt,replaceable:n.overwrite!==!1};o.blockIdentity=k;let v=n.overwrite===!1||S?{text:String(y||""),removed:!1,replaced:!1}:this._stripExactStoredBlock(y,h,w),C=v.text,R="";!S&&n.overwrite!==!1&&h&&!v.removed&&(R="previous_block_not_found");let L=n.overwrite===!1||v.replaced||S?C:this._stripExistingToolOutput(C,n.extractionSelectors),N=L!==C;C=L;let E=n.overwrite===!1||v.replaced||S?C:this._stripPreviousStoredToolContent(C,m),P=E!==C;C=E,o.replacedExistingBlock=S||v.removed||N||P;let U=n.overwrite===!1?String(y||""):C,q=S?w:v.replaced?C.trim():[U.trimEnd(),w].filter(Boolean).join(`

`).trim();o.insertedNewBlock=!!w;let te=b.every(Xe=>{if(Xe?.blockType==="full_message")return!0;let En=String(Xe?.blockText||Xe?.content||"").trim();return En?q.includes(En):!0});o.preservedOtherToolBlocks=te,te?R&&(o.conflictDetected=!0,o.conflictReason=R):(o.conflictDetected=!0,o.conflictReason="other_tool_block_removed");let ie={...p,[e]:{toolId:e,content:w,blockText:w,blockType:_,blockIdentity:k,updatedAt:r.updatedAt,sourceMessageId:r.sourceMessageId||null}},Q=Ni(n);if(Q)return o.error=Q,o;c[u]=q,this._applyMessageText(c,q,n),c[Mt]=ie,c[Js]=this._buildMessageInjectedContext(ie),o.contentCommitted=!0,o.commit.contentCommitted=!0,o.steps.contentCommitted=!0,o.steps.localTextApplied=!0,this._syncMessageToRuntimeChats(a,d,c),o.steps.runtimeSynced=!0;let we=Ni(n);if(we)return o.error=we,o;await this._requestAssistantMessageRefresh(a,d,q,n,o);let Pe=i?.saveChat||a?.api?.saveChat||null,J=i?.saveChatDebounced||a?.api?.saveChatDebounced||null;typeof J=="function"&&(J.call(i||api),o.steps.saveChatDebounced=!0,o.refreshRequested=!0,Qn(o.refresh.requestMethods,"saveChatDebounced")),typeof Pe=="function"&&(await Pe.call(i||api),o.steps.saveChat=!0,o.refreshRequested=!0,Qn(o.refresh.requestMethods,"saveChat"));let qe=this._notifyMessageUpdated(a,d,n);o.steps.notifiedMessageUpdated=qe?.emitted===!0,o.refresh.eventSource=qe?.source||"",o.refresh.eventName=qe?.eventName||"",qe?.error&&o.errors.push(`MESSAGE_UPDATED: ${qe.error}`);let _e=String(r.content||"").trim();(o.steps.hostSetChatMessages||o.steps.hostSetChatMessage)&&(o.refreshRequested=!0,Qn(o.refresh.requestMethods,o.hostUpdateMethod)),o.steps.notifiedMessageUpdated&&(o.refreshRequested=!0,Qn(o.refresh.requestMethods,`MESSAGE_UPDATED:${o.refresh.eventName||"MESSAGE_UPDATED"}`)),o.steps.refreshRequested=o.refreshRequested,o.refresh.requested=o.refreshRequested;let ze=await this._confirmRefresh(a,l,d,e,_e,c);return o.verification.textIncludesContent=ze.textIncludesContent,o.verification.mirrorStored=ze.mirrorStored,o.verification.refreshConfirmed=ze.refreshConfirmed,o.steps.verifiedAfterWrite=o.verification.textIncludesContent&&o.verification.mirrorStored,o.refreshConfirmed=o.verification.refreshConfirmed&&o.refreshRequested,o.refresh.confirmChecks=Number(ze.confirmChecks)||0,o.refresh.confirmedBy=ze.confirmedBy||"",o.refresh.confirmed=o.refreshConfirmed,o.steps.refreshConfirmed=o.refreshConfirmed,o.success=o.steps.localTextApplied&&o.steps.runtimeSynced&&o.steps.verifiedAfterWrite&&o.refreshConfirmed,o.writebackStatus=o.success?$i.SUCCESS:$i.FAILED,!o.success&&!o.error&&(o.error=o.refreshRequested?"\u5DE5\u5177\u7ED3\u679C\u5DF2\u63D0\u4EA4\uFF0C\u4F46\u5BBF\u4E3B\u5237\u65B0\u786E\u8BA4\u672A\u901A\u8FC7":"\u5DE5\u5177\u7ED3\u679C\u5DF2\u5C1D\u8BD5\u5199\u56DE\uFF0C\u4F46\u6700\u7EC8\u6821\u9A8C\u672A\u901A\u8FC7"),o.conflictDetected&&!o.error&&(o.error=`\u5DE5\u5177\u7ED3\u679C\u5DF2\u5199\u56DE\uFF0C\u4F46\u68C0\u6D4B\u5230\u5757\u51B2\u7A81\uFF1A${o.conflictReason}`),wt.info(`\u5DF2\u5C06\u5DE5\u5177\u8F93\u51FA\u5199\u5165\u7ED1\u5B9A assistant \u69FD\u4F4D: ${e} -> #${d}`),o}catch(a){return wt.error("\u63D2\u5165\u6700\u65B0 AI \u56DE\u590D\u539F\u6587\u5931\u8D25",{error:a}),o.error=a?.message||String(a),o.errors.push(o.error),o}}getAssistantMessageSnapshot(e=null){try{let r=this._getChatRuntime(),{chat:n}=r,s=this._findAssistantMessageIndex(n,e);if(s<0)return null;let o=n[s]||null,a=this._getWritableMessageField(o).text||"",i=o?.[Mt]&&typeof o[Mt]=="object"?o[Mt]:{},l=Object.values(i).reduce((d,c)=>{let u=String(c?.blockText||c?.content||"").trim();return!u||!d.includes(u)?d:d.replace(u,"").trimEnd()},String(a||"")).trim();return{messageIndex:s,message:o,messageText:a,baseText:l,toolOutputs:i,injectedContext:typeof o?.[Js]=="string"?o[Js]:this._buildMessageInjectedContext(i)}}catch(r){return wt.warn("\u8BFB\u53D6 assistant \u6D88\u606F\u5FEB\u7167\u5931\u8D25",{error:r}),null}}_getCurrentChatId(){try{let e=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(e.SillyTavern?.getContext){let r=e.SillyTavern.getContext(),s=[r?.chatId,r?.chat_id,r?.chat_filename,r?.chatMetadata?.chatId,r?.chatMetadata?.chat_id,r?.chatMetadata?.file_name,r?.chatMetadata?.name,e.SillyTavern?.chatId,e.SillyTavern?.chat_id,e.SillyTavern?.chat_filename].find(a=>typeof a=="string"&&a.trim());if(s)return s;let o=e.SillyTavern?.this_chid;if(o!=null)return`chat_char_${o}`}return"chat_default"}catch{return"chat_default"}}},Ft=new Oi,TS=Ft});var Wg={};ue(Wg,{BUILTIN_VARIABLES:()=>Fg,VariableResolver:()=>Li,default:()=>_S,variableResolver:()=>Qt});var sa,Fg,Li,Qt,_S,Di=O(()=>{at();Y();sa=I.createScope("VariableResolver"),Fg={lastUserMessage:{name:"lastUserMessage",description:"\u6700\u65B0\u7528\u6237\u6D88\u606F",category:"chat"},lastAiMessage:{name:"lastAiMessage",description:"\u6700\u65B0AI\u56DE\u590D",category:"chat"},chatHistory:{name:"chatHistory",description:"\u6700\u8FD1\u804A\u5929\u8BB0\u5F55",category:"chat"},characterCard:{name:"characterCard",description:"\u5F53\u524D\u89D2\u8272\u5361\u5185\u5BB9",category:"character"},toolName:{name:"toolName",description:"\u5DE5\u5177\u540D\u79F0",category:"tool"},toolId:{name:"toolId",description:"\u5DE5\u5177ID",category:"tool"},toolPromptMacro:{name:"toolPromptMacro",description:"\u5F53\u524D\u5DE5\u5177\u6A21\u677F\u63D0\u793A\u8BCD\u5B8F",category:"tool"},toolContentMacro:{name:"toolContentMacro",description:"\u5F53\u524D\u5DE5\u5177\u5904\u7406\u540E\u7684\u5185\u5BB9\u5B8F",category:"tool"},toolWorldbookContent:{name:"toolWorldbookContent",description:"\u5F53\u524D\u5DE5\u5177\u9009\u62E9\u7684\u4E16\u754C\u4E66\u6CE8\u5165\u5185\u5BB9",category:"tool"},injectedContext:{name:"injectedContext",description:"\u5DF2\u6CE8\u5165\u7684\u5DE5\u5177\u4E0A\u4E0B\u6587",category:"context"},extractedContent:{name:"extractedContent",description:"\u5DE5\u5177\u63D0\u53D6\u5185\u5BB9",category:"context"},recentMessagesText:{name:"recentMessagesText",description:"\u6700\u8FD1\u6D88\u606F\u6B63\u6587",category:"context"},rawRecentMessagesText:{name:"rawRecentMessagesText",description:"\u6700\u8FD1\u6D88\u606F\u539F\u6587",category:"context"},userMessage:{name:"userMessage",description:"\u5F53\u524D\u7528\u6237\u6D88\u606F",category:"chat"},previousToolOutput:{name:"previousToolOutput",description:"\u4E0A\u4E00\u6B21\u5DE5\u5177\u8F93\u51FA",category:"context"}},Li=class{constructor(){this.customVariables=new Map,this.variableHandlers=new Map,this.debugMode=!1,this._registerDefaultHandlers()}resolveTemplate(e,r){if(typeof e!="string")return e;let n=e;return n=this._resolveBuiltinVariables(n,r),n=this._resolveCustomVariables(n,r),n=this._resolveRegexVariables(n,r),n}resolveObject(e,r){if(!e||typeof e!="object")return e;if(Array.isArray(e))return e.map(s=>this.resolveObject(s,r));let n={};for(let[s,o]of Object.entries(e))typeof o=="string"?n[s]=this.resolveTemplate(o,r):typeof o=="object"&&o!==null?n[s]=this.resolveObject(o,r):n[s]=o;return n}buildToolContext(e){return{lastUserMessage:e.lastUserMessage||"",lastAiMessage:e.lastAiMessage||"",chatHistory:e.chatHistory||[],characterCard:e.characterCard||null,characterName:e.characterCard?.name||"",toolName:e.toolName||"",toolId:e.toolId||"",toolPromptMacro:e.toolPromptMacro||"",toolContentMacro:e.toolContentMacro||"",toolWorldbookContent:e.toolWorldbookContent||"",injectedContext:e.injectedContext||"",extractedContent:e.extractedContent||"",recentMessagesText:e.recentMessagesText||"",rawRecentMessagesText:e.rawRecentMessagesText||"",userMessage:e.userMessage||"",previousToolOutput:e.previousToolOutput||"",regexResults:e.regexResults||{},raw:e,timestamp:Date.now()}}registerVariable(e,r){e&&(this.customVariables.set(e,r),sa.info(`\u6CE8\u518C\u81EA\u5B9A\u4E49\u53D8\u91CF: ${e}`))}unregisterVariable(e){this.customVariables.delete(e),sa.info(`\u6CE8\u9500\u81EA\u5B9A\u4E49\u53D8\u91CF: ${e}`)}registerHandler(e,r){!e||typeof r!="function"||(this.variableHandlers.set(e,r),sa.info(`\u6CE8\u518C\u53D8\u91CF\u5904\u7406\u5668: ${e}`))}getAvailableVariables(){let e=[];for(let[,r]of Object.entries(Fg))e.push({name:`{{${r.name}}}`,description:r.description,category:r.category,type:"builtin"});for(let[r,n]of this.customVariables)e.push({name:`{{${r}}}`,description:typeof n=="function"?"\u81EA\u5B9A\u4E49\u51FD\u6570\u53D8\u91CF":"\u81EA\u5B9A\u4E49\u9759\u6001\u53D8\u91CF",category:"custom",type:"custom"});return e}getVariableHelp(){let e=["\u53EF\u7528\u53D8\u91CF\uFF1A",""],r={chat:"\u804A\u5929\u76F8\u5173",character:"\u89D2\u8272\u76F8\u5173",tool:"\u5DE5\u5177\u76F8\u5173",context:"\u4E0A\u4E0B\u6587\u76F8\u5173",custom:"\u81EA\u5B9A\u4E49\u53D8\u91CF"},n={};for(let s of this.getAvailableVariables())n[s.category]||(n[s.category]=[]),n[s.category].push(s);for(let[s,o]of Object.entries(r))if(n[s]&&n[s].length>0){e.push(`\u3010${o}\u3011`);for(let a of n[s])e.push(`  ${a.name} - ${a.description}`);e.push("")}return e.push("\u3010\u6B63\u5219\u63D0\u53D6\u3011"),e.push("  {{regex.xxx}} - \u4F7F\u7528\u6B63\u5219\u63D0\u53D6\u7ED3\u679C\uFF0Cxxx\u4E3A\u6355\u83B7\u7EC4\u540D"),e.join(`
`)}_registerDefaultHandlers(){this.registerHandler("regex",(e,r)=>(r.regexResults||r.raw?.regexResults||{})[e]||"")}_resolveBuiltinVariables(e,r){let n=e;return n=n.replace(/\{\{lastUserMessage\}\}/gi,r.lastUserMessage||r.raw?.lastUserMessage||""),n=n.replace(/\{\{lastAiMessage\}\}/gi,r.lastAiMessage||r.raw?.lastAiMessage||""),n=n.replace(/\{\{chatHistory\}\}/gi,()=>{let s=r.chatHistory||r.raw?.chatHistory||[];return this._formatChatHistory(s)}),n=n.replace(/\{\{characterCard\}\}/gi,()=>{let s=r.characterCard||r.raw?.characterCard;return s?this._formatCharacterCard(s):""}),n=n.replace(/\{\{toolName\}\}/gi,r.toolName||r.raw?.toolName||""),n=n.replace(/\{\{toolId\}\}/gi,r.toolId||r.raw?.toolId||""),n=n.replace(/\{\{toolPromptMacro\}\}/gi,r.toolPromptMacro||r.raw?.toolPromptMacro||""),n=n.replace(/\{\{toolContentMacro\}\}/gi,r.toolContentMacro||r.raw?.toolContentMacro||""),n=n.replace(/\{\{toolWorldbookContent\}\}/gi,r.toolWorldbookContent||r.raw?.toolWorldbookContent||""),n=n.replace(/\{\{injectedContext\}\}/gi,r.injectedContext||r.raw?.injectedContext||""),n=n.replace(/\{\{extractedContent\}\}/gi,r.extractedContent||r.raw?.extractedContent||""),n=n.replace(/\{\{recentMessagesText\}\}/gi,r.recentMessagesText||r.raw?.recentMessagesText||""),n=n.replace(/\{\{rawRecentMessagesText\}\}/gi,r.rawRecentMessagesText||r.raw?.rawRecentMessagesText||""),n=n.replace(/\{\{userMessage\}\}/gi,r.userMessage||r.raw?.userMessage||""),n=n.replace(/\{\{previousToolOutput\}\}/gi,r.previousToolOutput||r.raw?.previousToolOutput||""),n}_resolveCustomVariables(e,r){let n=e;for(let[s,o]of this.customVariables){let a=new RegExp(`\\{\\{${this._escapeRegex(s)}\\}\\}`,"gi");typeof o=="function"?n=n.replace(a,()=>{try{return o(r)}catch(i){return sa.error(`\u53D8\u91CF\u5904\u7406\u9519\u8BEF ${s}:`,i),""}}):n=n.replace(a,String(o))}return n}_resolveRegexVariables(e,r){let n=e;for(let[s,o]of this.variableHandlers){let a=new RegExp(`\\{\\{${s}\\.([^}]+)\\}\\}`,"gi");n=n.replace(a,(i,l)=>{try{return o(l,r)}catch(d){return sa.error(`\u53D8\u91CF\u5904\u7406\u9519\u8BEF ${s}.${l}:`,d),""}})}return n}_formatChatHistory(e){return!Array.isArray(e)||e.length===0?"":e.map(r=>{let n=r.role||"unknown",s=r.content||r.mes||"";return`[${n}]: ${s}`}).join(`

`)}_formatCharacterCard(e){if(!e)return"";let r=[];return e.name&&r.push(`\u59D3\u540D: ${e.name}`),e.description&&r.push(`\u63CF\u8FF0: ${e.description}`),e.personality&&r.push(`\u6027\u683C: ${e.personality}`),e.scenario&&r.push(`\u573A\u666F: ${e.scenario}`),r.join(`

`)}_escapeRegex(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}},Qt=new Li,_S=Qt});var qg={};ue(qg,{DEFAULT_PROMPT_TEMPLATE:()=>Gg,ToolPromptService:()=>Bi,default:()=>ES,toolPromptService:()=>es});var Hg,Gg,Bi,es,ES,zi=O(()=>{at();Ys();Di();Lo();Y();Hg=I.createScope("ToolPromptService"),Gg="\u8BF7\u5904\u7406\u4EE5\u4E0BAI\u56DE\u590D\u5185\u5BB9\uFF1A",Bi=class{constructor(){this.debugMode=!1}async _buildVariableContext(e,r={}){let n=this._getPromptTemplate(e),s=String(r?.toolWorldbookContent||r?.input?.toolWorldbookContent||await Xa(e)).trim(),o=Qt.buildToolContext({...r,toolName:e?.name||r?.toolName||"",toolId:e?.id||r?.toolId||"",toolWorldbookContent:s}),a=Qt.resolveTemplate(n,o).trim(),i=String(r?.toolContentMacro||r?.input?.toolContentMacro||"").trim();return Qt.buildToolContext({...r,toolName:e?.name||r?.toolName||"",toolId:e?.id||r?.toolId||"",toolPromptMacro:a,toolContentMacro:i,toolWorldbookContent:s})}async buildToolMessages(e,r){if(!e)return Hg.error("\u6784\u5EFA\u5931\u8D25: \u5DE5\u5177\u914D\u7F6E\u4E3A\u7A7A"),[];let n=[],s=await this._buildVariableContext(e,r),o=Array.isArray(e.promptMessages)?e.promptMessages:[],a=this._getBypassMessages(e),i=a?.some(l=>l.mainSlot==="A"||l.mainSlot==="B"||l.isMain||l.isMain2);if(a&&a.length>0)for(let l of a)l.enabled!==!1&&n.push({role:this._normalizeRole(l.role),content:Qt.resolveTemplate(l.content||"",s)});if(!i&&o.length>0)for(let l of o){let d=Qt.resolveTemplate(l?.content||"",s).trim();d&&n.push({role:this._normalizeRole(l?.role),content:d})}else if(!i&&!a?.length){let l=this._buildUserContent(this._getPromptTemplate(e),s);l&&n.push({role:"user",content:l})}return Hg.debug(`\u6784\u5EFA\u6D88\u606F: ${n.length} \u6761`),n}async buildPromptText(e,r){let n=await this._buildVariableContext(e,r),s=Array.isArray(e?.promptMessages)?e.promptMessages:[];return s.length>0?s.map(o=>Qt.resolveTemplate(o?.content||"",n).trim()).filter(Boolean).join(`

`):n.toolPromptMacro||""}getToolPromptTemplate(e){return this._getPromptTemplate(e)}_getPromptTemplate(e){return e.promptTemplate&&typeof e.promptTemplate=="string"?e.promptTemplate:Gg}_getBypassMessages(e){return e.bypass?.enabled?fe.buildBypassMessages(e):[]}_buildUserContent(e,r){return!e||!e.trim()?"":Qt.resolveTemplate(e,r).trim()}_normalizeRole(e){if(!e)return"user";switch(String(e).toLowerCase()){case"system":return"system";case"assistant":return"assistant";case"user":default:return"user"}}setDebugMode(e){this.debugMode=e}},es=new Bi,ES=es});var Vg={};ue(Vg,{LEGACY_OUTPUT_MODES:()=>AS,OUTPUT_MODES:()=>Wt,TOOL_FAILURE_STAGES:()=>nt,TOOL_RUNTIME_STATUS:()=>CS,TOOL_WRITEBACK_STATUS:()=>Ge,ToolOutputService:()=>Ki,default:()=>kS,toolOutputService:()=>Ht});function Yg(t){if(t?.signal?.aborted)return{aborted:!0,stale:!1,reason:"cancelled_before_host_commit"};if(typeof t?.shouldAbortWriteback=="function")try{return t.shouldAbortWriteback()||!1}catch{return{aborted:!0,stale:!0,reason:"stale_base_changed"}}return!1}function Xs(t=[],e="",r=null){return{request:{built:Array.isArray(t)&&t.length>0,messageCount:Array.isArray(t)?t.length:0},extract:{completed:!0,hasOutput:!!String(e||"").trim()},writeback:{attempted:!!r,contentCommitted:!!r?.contentCommitted,hostCommitApplied:!!r?.hostCommitApplied,writebackStatus:r?.writebackStatus||"",preferredCommitMethod:r?.commit?.preferredMethod||"",appliedCommitMethod:r?.commit?.appliedMethod||"",fallbackUsed:!!r?.commit?.fallbackUsed},refresh:{requested:!!r?.refreshRequested,confirmed:!!r?.refreshConfirmed,requestMethods:Array.isArray(r?.refresh?.requestMethods)?[...r.refresh.requestMethods]:[],confirmChecks:Number(r?.refresh?.confirmChecks)||0,confirmedBy:r?.refresh?.confirmedBy||""}}}var gn,Wt,AS,CS,nt,Ge,Ki,Ht,kS,oa=O(()=>{at();Vs();Y();Zn();zi();Ts();rn();Co();gn=I.createScope("ToolOutputService"),Wt={FOLLOW_AI:"follow_ai",POST_RESPONSE_API:"post_response_api",LOCAL_TRANSFORM:"local_transform"},AS={inline:"follow_ai"},CS={IDLE:"idle",RUNNING:"running",SUCCESS:"success",ERROR:"error"},nt={BUILD_MESSAGES:"build_messages",SEND_API_REQUEST:"send_api_request",EXTRACT_OUTPUT:"extract_output",INJECT_CONTEXT:"inject_context",COMPATIBILITY_EXECUTE:"compatibility_execute",UNKNOWN:"unknown"},Ge={SUCCESS:"success",FAILED:"failed",SKIPPED_EMPTY_OUTPUT:"skipped_empty_output",NOT_APPLICABLE:"not_applicable"};Ki=class{constructor(){this.debugMode=!1,this._apiConnection=null}shouldRunPostResponse(e){return!e||!e.enabled||!e.output?.enabled?!1:e.output?.mode===Wt.POST_RESPONSE_API}shouldRunLocalTransform(e){return!e||!e.enabled||!e.output?.enabled?!1:e.output?.mode===Wt.LOCAL_TRANSFORM||!!e.processor?.type}shouldRunFollowAi(e){if(!e||!e.enabled||!e.output?.enabled)return!1;let r=e.output?.mode;return r===Wt.FOLLOW_AI||r==="inline"}shouldRunInline(e){return this.shouldRunFollowAi(e)}async runToolPostResponse(e,r){let n=Date.now(),s=e.id,o=r?.traceId||`trace_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,a=r?.sessionKey||"",i=r?.executionKey||"",l=this._getExtractionSelectors(e),d=e?.extraction?.writebackTag?.trim(),c=d?[d]:l,u=e.output?.apiPreset||e.apiPreset||"",y="",p=Ge.NOT_APPLICABLE,g=null,m=[],h="";gn.info(`\u5F00\u59CB\u6267\u884C\u5DE5\u5177: ${s}`),G.emit(F.TOOL_EXECUTION_STARTED,{toolId:s,traceId:o,sessionKey:a,mode:Wt.POST_RESPONSE_API});try{if(y=nt.BUILD_MESSAGES,m=await this._buildToolMessages(e,r),!m||m.length===0)throw new Error("\u672A\u6784\u5EFA\u51FA\u53EF\u53D1\u9001\u7684\u5DE5\u5177\u8BF7\u6C42\u6D88\u606F\uFF0C\u8BF7\u68C0\u67E5\u63D0\u793A\u8BCD\u6A21\u677F\u6216\u7834\u9650\u8BCD\u914D\u7F6E\u662F\u5426\u4E3A\u7A7A\u3002");gn.debug(`\u6784\u5EFA\u4E86 ${m.length} \u6761\u6D88\u606F`);let b=Yg(r);if(b){let v=Date.now()-n;return{success:!1,toolId:s,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88",duration:v,meta:{traceId:o,sessionKey:a,executionKey:i,sourceMessageId:r?.sourceMessageId||r?.confirmedAssistantMessageId||r?.messageId||"",sourceSwipeId:r?.sourceSwipeId||r?.confirmedAssistantSwipeId||r?.effectiveSwipeId||"",slotRevisionKey:r?.slotRevisionKey||"",selectors:l,apiPreset:u,writebackStatus:p,failureStage:y,writebackDetails:g,aborted:b.aborted===!0,stale:b.stale===!0,abortReason:b.reason||"",phases:Xs(m,h,g)}}}let w=await this._getRequestTimeout();y=nt.SEND_API_REQUEST;let S=await this._sendApiRequest(u,m,{timeoutMs:w,signal:r.signal});y=nt.EXTRACT_OUTPUT,h=this._extractOutputContent(S,e);let _=Yg(r);if(_){let v=Date.now()-n;return{success:!1,toolId:s,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88",duration:v,meta:{traceId:o,sessionKey:a,executionKey:i,sourceMessageId:r?.sourceMessageId||r?.confirmedAssistantMessageId||r?.messageId||"",sourceSwipeId:r?.sourceSwipeId||r?.confirmedAssistantSwipeId||r?.effectiveSwipeId||"",slotRevisionKey:r?.slotRevisionKey||"",selectors:l,apiPreset:u,writebackStatus:p,failureStage:y,writebackDetails:g,aborted:_.aborted===!0,stale:_.stale===!0,abortReason:_.reason||"",phases:Xs(m,h,g)}}}if(h){if(y=nt.INJECT_CONTEXT,g=await Ft.injectDetailed(s,h,{overwrite:e.output?.overwrite!==!1,sourceMessageId:r.sourceMessageId||r.confirmedAssistantMessageId||r.messageId||"",sourceSwipeId:r.sourceSwipeId||r.confirmedAssistantSwipeId||r.effectiveSwipeId||"",effectiveSwipeId:r.effectiveSwipeId||r.confirmedAssistantSwipeId||"",slotBindingKey:r.slotBindingKey||"",slotRevisionKey:r.slotRevisionKey||"",slotTransactionId:r.slotTransactionId||"",extractionSelectors:c,traceId:o,sessionKey:a,signal:r.signal,shouldAbortWriteback:r.shouldAbortWriteback,isAutoRun:r.isAutoRun===!0,skipNotify:r.skipNotify===!0}),!g?.success)throw p=Ge.FAILED,new Error(g?.error||"\u5DE5\u5177\u7ED3\u679C\u5DF2\u751F\u6210\uFF0C\u4F46\u5199\u5165\u4E0A\u4E0B\u6587/\u4E16\u754C\u4E66\u5931\u8D25");p=Ge.SUCCESS}else p=Ge.SKIPPED_EMPTY_OUTPUT;y="";let k=Date.now()-n;return G.emit(F.TOOL_EXECUTED,{toolId:s,traceId:o,sessionKey:a,success:!0,duration:k,mode:Wt.POST_RESPONSE_API}),gn.info(`\u5DE5\u5177\u6267\u884C\u6210\u529F: ${s}, \u8017\u65F6 ${k}ms`),{success:!0,toolId:s,output:h,duration:k,meta:{traceId:o,sessionKey:a,executionKey:i,slotBindingKey:r?.slotBindingKey||"",slotTransactionId:r?.slotTransactionId||"",generationAction:r?.generationAction||"",generationActionSource:r?.generationActionSource||"",rawGenerationType:r?.rawGenerationType||"",normalizedGenerationType:r?.normalizedGenerationType||"",generationMessageBindingSource:r?.generationMessageBindingSource||"",sourceMessageId:r?.sourceMessageId||r?.confirmedAssistantMessageId||r?.messageId||"",sourceSwipeId:r?.sourceSwipeId||r?.confirmedAssistantSwipeId||r?.effectiveSwipeId||"",confirmedAssistantSwipeId:r?.confirmedAssistantSwipeId||"",effectiveSwipeId:r?.effectiveSwipeId||"",slotRevisionKey:r?.slotRevisionKey||"",messageCount:m.length,selectors:l,apiPreset:u,writebackStatus:p,failureStage:"",writebackDetails:g,phases:Xs(m,h,g)}}}catch(b){let w=Date.now()-n,S=y||nt.UNKNOWN,_=p||Ge.NOT_APPLICABLE;return gn.error(`\u5DE5\u5177\u6267\u884C\u5931\u8D25: ${s}`,{error:b}),G.emit(F.TOOL_EXECUTION_FAILED,{toolId:s,traceId:o,sessionKey:a,error:b.message||String(b),duration:w}),{success:!1,toolId:s,error:b.message||String(b),duration:w,meta:{traceId:o,sessionKey:a,executionKey:i,slotBindingKey:r?.slotBindingKey||"",slotTransactionId:r?.slotTransactionId||"",generationAction:r?.generationAction||"",generationActionSource:r?.generationActionSource||"",rawGenerationType:r?.rawGenerationType||"",normalizedGenerationType:r?.normalizedGenerationType||"",generationMessageBindingSource:r?.generationMessageBindingSource||"",sourceMessageId:r?.sourceMessageId||r?.confirmedAssistantMessageId||r?.messageId||"",sourceSwipeId:r?.sourceSwipeId||r?.confirmedAssistantSwipeId||r?.effectiveSwipeId||"",confirmedAssistantSwipeId:r?.confirmedAssistantSwipeId||"",effectiveSwipeId:r?.effectiveSwipeId||"",slotRevisionKey:r?.slotRevisionKey||"",messageCount:m.length,selectors:l,apiPreset:u,writebackStatus:_,failureStage:S,writebackDetails:g,phases:Xs(m,h,g)}}}}async runToolFollowAiManual(e,r){let n=Date.now(),s=e.id,o=r?.traceId||`trace_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,a=r?.sessionKey||"",i=r?.executionKey||"",l=e.output?.apiPreset||e.apiPreset||"",d=this._getExtractionSelectors(e),c=e?.extraction?.writebackTag?.trim(),u=c?[c]:d,y="",p=Ge.NOT_APPLICABLE,g=null,m=[],h="";G.emit(F.TOOL_EXECUTION_STARTED,{toolId:s,traceId:o,sessionKey:a,mode:Wt.FOLLOW_AI});try{if(y=nt.BUILD_MESSAGES,m=await this._buildToolMessages(e,r),!m||m.length===0)throw new Error("\u672A\u6784\u5EFA\u51FA\u53EF\u53D1\u9001\u7684\u5DE5\u5177\u8BF7\u6C42\u6D88\u606F\uFF0C\u8BF7\u68C0\u67E5\u63D0\u793A\u8BCD\u6A21\u677F\u6216\u7834\u9650\u8BCD\u914D\u7F6E\u662F\u5426\u4E3A\u7A7A\u3002");let b=await this._getRequestTimeout();y=nt.SEND_API_REQUEST;let w=await this._sendApiRequest(l,m,{timeoutMs:b,signal:r.signal});if(y=nt.EXTRACT_OUTPUT,h=this._extractOutputContent(w,e),h){if(y=nt.INJECT_CONTEXT,g=await Ft.injectDetailed(s,h,{overwrite:e.output?.overwrite!==!1,sourceMessageId:r.sourceMessageId||r.confirmedAssistantMessageId||r.messageId||"",sourceSwipeId:r.sourceSwipeId||r.confirmedAssistantSwipeId||r.effectiveSwipeId||"",effectiveSwipeId:r.effectiveSwipeId||r.confirmedAssistantSwipeId||"",slotBindingKey:r.slotBindingKey||"",slotRevisionKey:r.slotRevisionKey||"",slotTransactionId:r.slotTransactionId||"",extractionSelectors:u,traceId:o,sessionKey:a}),!g?.success)throw p=Ge.FAILED,new Error(g?.error||"\u5DE5\u5177\u7ED3\u679C\u5DF2\u751F\u6210\uFF0C\u4F46\u5199\u5165\u4E0A\u4E0B\u6587/\u4E16\u754C\u4E66\u5931\u8D25");p=Ge.SUCCESS}else p=Ge.SKIPPED_EMPTY_OUTPUT;y="";let S=Date.now()-n;return G.emit(F.TOOL_EXECUTED,{toolId:s,traceId:o,sessionKey:a,success:!0,duration:S,mode:Wt.FOLLOW_AI}),{success:!0,toolId:s,output:h,duration:S,meta:{traceId:o,sessionKey:a,executionKey:i,slotBindingKey:r?.slotBindingKey||"",slotTransactionId:r?.slotTransactionId||"",sourceMessageId:r?.sourceMessageId||r?.confirmedAssistantMessageId||r?.messageId||"",sourceSwipeId:r?.sourceSwipeId||r?.confirmedAssistantSwipeId||r?.effectiveSwipeId||"",confirmedAssistantSwipeId:r?.confirmedAssistantSwipeId||"",effectiveSwipeId:r?.effectiveSwipeId||"",slotRevisionKey:r?.slotRevisionKey||"",messageCount:m.length,selectors:d,apiPreset:l,writebackStatus:p,failureStage:"",writebackDetails:g,phases:Xs(m,h,g)}}}catch(b){let w=Date.now()-n,S=y||nt.UNKNOWN,_=p||Ge.NOT_APPLICABLE;return G.emit(F.TOOL_EXECUTION_FAILED,{toolId:s,traceId:o,sessionKey:a,error:b.message||String(b),duration:w,mode:Wt.FOLLOW_AI}),{success:!1,toolId:s,error:b.message||String(b),duration:w,meta:{traceId:o,sessionKey:a,executionKey:i,slotBindingKey:r?.slotBindingKey||"",slotTransactionId:r?.slotTransactionId||"",sourceMessageId:r?.sourceMessageId||r?.confirmedAssistantMessageId||r?.messageId||"",sourceSwipeId:r?.sourceSwipeId||r?.confirmedAssistantSwipeId||r?.effectiveSwipeId||"",confirmedAssistantSwipeId:r?.confirmedAssistantSwipeId||"",effectiveSwipeId:r?.effectiveSwipeId||"",slotRevisionKey:r?.slotRevisionKey||"",messageCount:m.length,selectors:d,apiPreset:l,writebackStatus:_,failureStage:S,writebackDetails:g,phases:Xs(m,h,g)}}}}async runToolInline(e,r){return this.runToolFollowAiManual(e,r)}async previewExtraction(e,r){return{success:!0,...this.getExtractionSnapshot(e,r)}}getExtractionSnapshot(e,r){let n=this._buildRecentMessageExtractionEntries(e,r),s=this._joinMessageBlocks(n,"rawText"),o=this._joinMessageBlocks(n,"filteredText"),a=this._joinMessageBlocks(n,"extractedText",{skipEmpty:!0}),i=(Array.isArray(n)?n:[]).map(d=>String(d?.extractedText||"").trim()).filter(Boolean).join(`

`),l=Array.isArray(n)&&n.length>0?n[n.length-1]:null;return{sourceText:s,filteredSourceText:o,extractedText:a,extractedRawText:i,messageEntries:n,primaryEntry:l,selectors:this._getExtractionSelectors(e),maxMessages:e?.extraction?.maxMessages||5}}async _buildToolMessages(e,r){let n=this._buildRecentMessageExtractionEntries(e,r),s=this._joinMessageBlocks(n,"rawText"),o=this._joinMessageBlocks(n,"filteredText"),a=this._joinMessageBlocks(n,"extractedText",{skipEmpty:!0}),i={...r,rawRecentMessagesText:s,recentMessagesText:o,extractedContent:a,toolContentMacro:this._buildToolContentMacro(n),toolName:e.name,toolId:e.id};return es.buildToolMessages(e,i)}_normalizeRole(e){if(!e)return"user";let r=String(e).toLowerCase();return r==="system"?"system":r==="assistant"?"assistant":"user"}setApiConnection(e){this._apiConnection=e}async _sendApiRequest(e,r,n={}){if(!this._apiConnection)throw new Error("API\u8FDE\u63A5\u6A21\u5757\u672A\u914D\u7F6E");let{timeoutMs:s=9e4,signal:o}=n,a=null;if(e){if(!_o(e))throw new Error(`\u672A\u627E\u5230 API \u9884\u8BBE\u201C${e}\u201D\uFF0C\u8BF7\u91CD\u65B0\u9009\u62E9\u6216\u4FDD\u5B58\u540E\u518D\u6267\u884C`);a=To(e)}else a=To();let i=Ba(a||{});if(!i.valid&&!a?.useMainApi)throw new Error(`API\u914D\u7F6E\u65E0\u6548\uFF1A${i.errors.join("\uFF0C")}\u3002\u8BF7\u5148\u5B8C\u5584\u81EA\u5B9A\u4E49API\u914D\u7F6E\uFF0C\u6216\u542F\u7528\u201C\u4F7F\u7528SillyTavern\u4E3BAPI\u201D`);if(this._apiConnection.sendApiRequest)return await this._apiConnection.sendApiRequest(r,{timeoutMs:s,apiConfig:a},o);throw new Error("\u6CA1\u6709\u53EF\u7528\u7684API\u53D1\u9001\u65B9\u6CD5")}async _getRequestTimeout(){return xt.getSettings().executor?.requestTimeoutMs||9e4}_extractOutputContent(e,r){if(!e)return"";if(typeof e=="string")return this._applyOutputExtractionSelectors(e,r);if(typeof e=="object"){if(e.choices&&e.choices[0]?.message?.content)return this._applyOutputExtractionSelectors(e.choices[0].message.content,r);if(e.content)return this._applyOutputExtractionSelectors(e.content,r);if(e.text)return this._applyOutputExtractionSelectors(e.text,r);if(e.message)return this._applyOutputExtractionSelectors(e.message,r);try{return this._applyOutputExtractionSelectors(JSON.stringify(e,null,2),r)}catch{return this._applyOutputExtractionSelectors(String(e),r)}}return this._applyOutputExtractionSelectors(String(e),r)}_applyOutputExtractionSelectors(e,r){let n=typeof e=="string"?e:String(e||""),s=this._getExtractionSelectors(r);if(!s.length)return n.trim();let o=[];for(let a of s){let i=String(a||"").trim();if(!i)continue;if(i.startsWith("regex:")){let d=i.slice(6).trim();if(!d)continue;try{let c=new RegExp(d,"gi");[...n.matchAll(c)].forEach(y=>{let p=String(y?.[0]||"").trim();p&&o.push(p)})}catch(c){gn.warn("\u5DE5\u5177\u8F93\u51FA\u6B63\u5219\u63D0\u53D6\u5931\u8D25\uFF0C\u8DF3\u8FC7\u8BE5\u89C4\u5219",{selector:i,error:c})}continue}let l=i.replace(/^<|>$/g,"").trim();if(l)try{let d=new RegExp(`<${l}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${l}>`,"gi");(n.match(d)||[]).forEach(u=>{let y=String(u||"").trim();y&&o.push(y)})}catch(d){gn.warn("\u5DE5\u5177\u8F93\u51FA\u6807\u7B7E\u63D0\u53D6\u5931\u8D25\uFF0C\u8DF3\u8FC7\u8BE5\u89C4\u5219",{selector:i,error:d})}}return o.length>0?o.join(`

`).trim():n.trim()}_resolveExtractionContext(e){let r=e?.extraction?.regexPresetId;if(!r)return{rules:[],blacklist:[]};try{let n=Mr(r);if(!n)return{rules:[],blacklist:[]};let s=Array.isArray(n.rules)?n.rules.filter(a=>a&&a.enabled!==!1&&a.value).map(a=>({id:a.id,type:a.type,value:a.value,enabled:!0})):[],o=Array.isArray(n.blacklist)?n.blacklist.map(a=>String(a||"").trim()).filter(Boolean):[];return{rules:s,blacklist:o}}catch(n){return gn.warn("_resolveExtractionContext \u5F02\u5E38",{error:n}),{rules:[],blacklist:[]}}}_getExtractionSelectors(e){let{rules:r}=this._resolveExtractionContext(e),n=[];for(let s of r){let o=String(s.value||"").trim();o&&(s.type==="include"?n.push(o):s.type==="regex_include"&&n.push(`regex:${o}`))}return n}_applyExtractionSelectors(e,r){return this._applyExtractionSelectorsInternal(e,r,{strict:!1})}_applyExtractionSelectorsInternal(e,r,n={}){let s=typeof e=="string"?e:String(e||""),{rules:o,blacklist:a}=this._resolveExtractionContext(r),{strict:i=!1}=n;if(!o.length)return s.trim();let l=Ir(s,o,a||[]);return i?(l||"").trim():l||s.trim()}_extractToolContent(e,r){let n=typeof r=="string"?r:String(r||""),{rules:s}=this._resolveExtractionContext(e);return s.length?this._applyExtractionSelectorsInternal(n,e,{strict:!0}):n.trim()}_applyGlobalContextRules(e){let r=typeof e=="string"?e:String(e||"");if(!r.trim())return"";try{let n=vs()||[],s=Ss()||[];return!Array.isArray(n)||n.length===0?r.trim():Ir(r,n,s)||r.trim()}catch(n){return gn.warn("\u5E94\u7528\u5168\u5C40\u6B63\u6587\u63D0\u53D6\u89C4\u5219\u5931\u8D25\uFF0C\u56DE\u9000\u539F\u59CB\u6587\u672C",{error:n}),r.trim()}}_getMessageText(e){if(!e)return"";let r=[e.content,e.mes,e.message,e.text,e?.data?.content];for(let n of r)if(typeof n=="string"&&n.trim())return n.trim();return""}_collectRecentAssistantMessages(e,r){return this._collectRecentAssistantMessageEntries(e,r).map(n=>n.text).filter(Boolean).join(`

`)}_collectRecentAssistantMessageEntries(e,r){let n=Math.max(1,parseInt(e?.extraction?.maxMessages,10)||5),s=Array.isArray(r?.chatMessages)?r.chatMessages:[],o=[];for(let i=s.length-1;i>=0&&o.length<n;i-=1){let l=s[i],d=String(l?.role||"").toLowerCase(),c=d==="assistant"||d==="ai"||!l?.is_user&&!l?.is_system&&!d,u=this._getMessageText(l);c&&u&&o.unshift({text:u,message:l,chatIndex:i})}if(o.length>0)return o;let a=r?.lastAiMessage||r?.input?.lastAiMessage||"";return a?[{text:a,message:null,chatIndex:-1}]:[]}_buildRecentMessageExtractionEntries(e,r){return this._collectRecentAssistantMessageEntries(e,r).map((s,o)=>{let a=s.text||"",i=this._applyGlobalContextRules(a),l=this._extractToolContent(e,a);return{...s,order:o+1,rawText:a,filteredText:i,extractedText:l,fullMessageText:a}})}_joinMessageBlocks(e,r,n={}){let s=Array.isArray(e)?e:[],{skipEmpty:o=!1}=n;return s.map(i=>{let l=String(i?.[r]||"").trim();return o&&!l?"":`${`\u3010\u7B2C ${i?.order||0} \u6761 AI \u6D88\u606F\u3011`}
${l||"(\u7A7A)"}`}).filter(Boolean).join(`

--------------------------------

`)}_buildToolContentMacro(e){return(Array.isArray(e)?e:[]).map(s=>{let o=`\u3010\u7B2C ${s?.order||0} \u6761 AI \u6D88\u606F\u3011`,a=String(s?.filteredText||"").trim()||"(\u7A7A)",i=String(s?.extractedText||"").trim()||"(\u7A7A)";return`${o}
\u6B63\u6587\uFF1A
${a}

\u5DE5\u5177\uFF1A
${i}`}).filter(Boolean).join(`

--------------------------------

`).trim()}filterPostResponseTools(e){return Array.isArray(e)?e.filter(r=>this.shouldRunPostResponse(r)):[]}filterAutoPostResponseTools(e){return Array.isArray(e)?e.filter(r=>this.shouldRunPostResponse(r)):[]}filterInlineTools(e){return Array.isArray(e)?e.filter(r=>this.shouldRunInline(r)):[]}setDebugMode(e){this.debugMode=e}},Ht=new Ki,kS=Ht});function Xg(t={}){return!t||typeof t!="object"?{}:Object.entries(t).reduce((e,[r,n])=>(e[r]=n===!0,e),{})}function MS(t,e={}){let r=e?.direction==="unescape"?"unescape":"escape",n=Xg(e?.options);return IS.reduce((s,o)=>n[o.key]!==!0?s:r==="unescape"?s.replace(o.escaped,o.unescaped):s.replace(o.plain,o.replacement),String(t||""))}function PS(t,e={}){if((e?.direction||"en_to_zh")!=="en_to_zh")return String(t||"");let n=Xg(e?.options);return RS.reduce((s,o)=>n[o.key]!==!0?s:s.replace(o.from,o.to),String(t||""))}function NS(t,e){let r=t?.processor||{},n=r?.type||"",s=String(e||"");switch(n){case Jg.ESCAPE_TRANSFORM:return MS(s,r);case Jg.PUNCTUATION_TRANSFORM:return PS(s,r);default:return s}}function $S(t,e,r){let n=String(t||""),s=String(e||"").trim(),o=String(r||"").trim();return!n.trim()||!s?{nextMessageText:"",replaced:!1}:n.includes(s)?{nextMessageText:n.replace(s,o).trim(),replaced:!0}:{nextMessageText:"",replaced:!1}}async function ji(t,e={}){let r=Ht.getExtractionSnapshot(t,e),n=r?.primaryEntry||null,s=String(n?.fullMessageText||e?.lastAiMessage||"").trim(),o=String(n?.extractedText||r?.extractedRawText||r?.extractedText||"").trim(),a=Array.isArray(r?.selectors)?r.selectors:[],i=e?.traceId||`trace_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,l=e?.sessionKey||"";if(!o||!s)return{success:!1,error:"\u672A\u63D0\u53D6\u5230\u53EF\u5904\u7406\u5185\u5BB9\uFF0C\u8BF7\u5148\u68C0\u67E5\u6807\u7B7E\u6216\u6B63\u5219\u89C4\u5219",meta:{traceId:i,sessionKey:l,selectors:a,writebackStatus:Ge.NOT_APPLICABLE,failureStage:nt.EXTRACT_OUTPUT,extraction:r}};let d=String(NS(t,o)||"").trim(),c=$S(s,o,d),u=c.replaced?c.nextMessageText:d,y=null,p=Ge.NOT_APPLICABLE;if(u){if(y=await Ft.injectDetailed(t.id,u,{overwrite:!0,sourceMessageId:e?.sourceMessageId||e?.confirmedAssistantMessageId||e?.messageId||"",sourceSwipeId:e?.sourceSwipeId||e?.confirmedAssistantSwipeId||e?.effectiveSwipeId||"",effectiveSwipeId:e?.effectiveSwipeId||e?.confirmedAssistantSwipeId||"",slotBindingKey:e?.slotBindingKey||"",slotRevisionKey:e?.slotRevisionKey||"",slotTransactionId:e?.slotTransactionId||"",extractionSelectors:[],replaceFullMessage:c.replaced,traceId:i,sessionKey:l,skipNotify:e?.skipNotify===!0}),!y?.success)return{success:!1,error:y?.error||"\u672C\u5730\u5904\u7406\u5B8C\u6210\uFF0C\u4F46\u5199\u56DE\u5931\u8D25",meta:{traceId:i,sessionKey:l,selectors:a,writebackStatus:Ge.FAILED,failureStage:nt.INJECT_CONTEXT,writebackDetails:y,extraction:r}};p=Ge.SUCCESS}else p=Ge.SKIPPED_EMPTY_OUTPUT;return{success:!0,output:d,writebackState:u?{committed:y?.contentCommitted===!0}:null,meta:{traceId:i,sessionKey:l,selectors:a,writebackStatus:p,failureStage:"",writebackDetails:y,extraction:r}}}var IS,RS,Jg,vd=O(()=>{oa();Zn();IS=[{key:"newline",plain:/\r\n|\r|\n/g,escaped:/\\n/g,replacement:"\\n",unescaped:`
`},{key:"doubleQuote",plain:/"/g,escaped:/\\"/g,replacement:'\\"',unescaped:'"'},{key:"singleQuote",plain:/'/g,escaped:/\\'/g,replacement:"\\'",unescaped:"'"}],RS=[{key:"comma",from:/,/g,to:"\uFF0C"},{key:"period",from:/\./g,to:"\u3002"},{key:"exclamation",from:/!/g,to:"\uFF01"},{key:"question",from:/\?/g,to:"\uFF1F"},{key:"semicolon",from:/;/g,to:"\uFF1B"},{key:"colon",from:/:/g,to:"\uFF1A"},{key:"leftParen",from:/\(/g,to:"\uFF08"},{key:"rightParen",from:/\)/g,to:"\uFF09"}],Jg={ESCAPE_TRANSFORM:"escape_transform",PUNCTUATION_TRANSFORM:"punctuation_transform"}});var _d={};ue(_d,{abortAllTasks:()=>zS,abortTask:()=>BS,buildToolMessages:()=>em,clearExecutionHistory:()=>WS,createExecutionContext:()=>YS,createResult:()=>Ui,enhanceMessagesWithBypass:()=>VS,executeBatch:()=>DS,executeTool:()=>Zg,executeToolWithConfig:()=>tm,executeToolsBatch:()=>QS,executorState:()=>Ue,extractFailed:()=>qS,extractSuccessful:()=>GS,generateTaskId:()=>ts,getExecutionHistory:()=>FS,getExecutorStatus:()=>US,getScheduler:()=>Qs,mergeResults:()=>HS,pauseExecutor:()=>KS,resumeExecutor:()=>jS,setMaxConcurrent:()=>LS});function Ui(t,e,r,n,s,o,a=0){return{success:r,taskId:t,toolId:e,data:n,error:s,duration:o,retries:a,timestamp:Date.now(),metadata:{}}}function ts(){return`task_${Date.now()}_${Math.random().toString(36).substr(2,9)}`}function OS(t,e={}){return{id:ts(),toolId:t,options:e,status:"pending",createdAt:Date.now(),startedAt:null,completedAt:null,retries:0,maxRetries:e.maxRetries||3}}function Qs(){return aa||(aa=new Sd(Ue.maxConcurrent)),aa}function LS(t){Ue.maxConcurrent=Math.max(1,Math.min(10,t)),aa&&(aa.maxConcurrent=Ue.maxConcurrent)}async function Zg(t,e={},r){let n=Qs(),s=OS(t,e);for(;Ue.isPaused;)await new Promise(o=>setTimeout(o,100));try{let o=await n.enqueue(async a=>{if(a.aborted)throw new DOMException("\u4EFB\u52A1\u5DF2\u4E2D\u6B62","AbortError");if(typeof r=="function")return await r(a,e);throw new Error("\u6267\u884C\u5668\u5FC5\u987B\u662F\u4E00\u4E2A\u51FD\u6570")},s);return Qg(o),o}catch(o){Td.error(`executeTool \u5F02\u5E38 (toolId=${t})`,{error:o});let a=Ui(s.id,t,!1,null,o,Date.now()-s.createdAt,s.retries);return Qg(a),a}}async function DS(t,e={}){let{failFast:r=!1,concurrency:n=Ue.maxConcurrent}=e,s=[],o=Qs(),a=o.maxConcurrent;o.maxConcurrent=n;try{let i=t.map(({toolId:l,options:d,executor:c})=>Zg(l,d,c));if(r)for(let l of i){let d=await l;if(s.push(d),!d.success){o.abortAll();break}}else{let l=await Promise.allSettled(i);for(let d of l)d.status==="fulfilled"?s.push(d.value):s.push(Ui(ts(),"unknown",!1,null,d.reason,0,0))}}finally{o.maxConcurrent=a}return s}function BS(t){return Qs().abort(t)}function zS(){Qs().abortAll(),Ue.executionQueue=[]}function KS(){Ue.isPaused=!0}function jS(){Ue.isPaused=!1}function US(){return{...Qs().getStatus(),isPaused:Ue.isPaused,activeControllers:Ue.activeControllers.size,historyCount:Ue.executionHistory.length}}function Qg(t){Ue.executionHistory.push(t),Ue.executionHistory.length>100&&Ue.executionHistory.shift()}function FS(t={}){let e=[...Ue.executionHistory];return t.toolId&&(e=e.filter(r=>r.toolId===t.toolId)),t.success!==void 0&&(e=e.filter(r=>r.success===t.success)),t.limit&&(e=e.slice(-t.limit)),e}function WS(){Ue.executionHistory=[]}function HS(t){let e={success:!0,data:[],errors:[],totalDuration:0,successCount:0,failureCount:0};for(let r of t)e.totalDuration+=r.duration,r.success?(e.successCount++,r.data!==void 0&&r.data!==null&&e.data.push(r.data)):(e.success=!1,e.failureCount++,r.error&&e.errors.push({taskId:r.taskId,toolId:r.toolId,error:r.error.message||String(r.error)}));return e}function GS(t){return t.filter(e=>e.success).map(e=>e.data)}function qS(t){return t.filter(e=>!e.success).map(e=>({taskId:e.taskId,toolId:e.toolId,error:e.error}))}function YS(t={}){return{taskId:ts(),startTime:Date.now(),signal:t.signal||null,apiConfig:t.apiConfig||null,bypassMessages:t.bypassMessages||[],context:t.context||{},metadata:t.metadata||{}}}function VS(t,e){return!e||e.length===0?t:[...e,...t]}function JS(t){return t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function em(t,e){let r=[],n=t.promptTemplate||"",s={"{{userMessage}}":e.input?.userMessage||"","{{lastAiMessage}}":e.input?.lastAiMessage||"","{{extractedContent}}":e.input?.extractedContent||"","{{previousToolOutput}}":e.input?.previousToolOutput||"","{{context}}":JSON.stringify(e.input?.context||{}),"{{pg}}":e.input?.context?.pg||"1","{{time}}":e.input?.context?.time||"","{{scene}}":e.input?.context?.scene||"","{{plot}}":e.input?.context?.plot||"","{{mq}}":e.input?.context?.mq||"\u2160","{{mqStatus}}":e.input?.context?.mqStatus||"\u8FDB\u884C\u4E2D","{{sq}}":e.input?.context?.sq||"1","{{sqStatus}}":e.input?.context?.sqStatus||"\u8FDB\u884C\u4E2D","{{latestSq}}":e.input?.context?.latestSq||"1","{{completed}}":e.input?.context?.completed||"\u65E0","{{defined}}":e.input?.context?.defined||"","{{status}}":e.input?.context?.status||"","{{seeds}}":e.input?.context?.seeds||"","{{name}}":e.input?.context?.name||"","{{location}}":e.input?.context?.location||"","{{condition}}":e.input?.context?.condition||"","{{equipment}}":e.input?.context?.equipment||"","{{skills}}":e.input?.context?.skills||""};for(let[o,a]of Object.entries(s))n=n.replace(new RegExp(JS(o),"g"),a);return r.push({role:"USER",content:n}),r}async function tm(t,e,r={}){let n=ye(t);if(!n)return{success:!1,taskId:ts(),toolId:t,error:"\u5DE5\u5177\u914D\u7F6E\u4E0D\u5B58\u5728",duration:0};if(!n.enabled)return{success:!1,taskId:ts(),toolId:t,error:"\u5DE5\u5177\u672A\u542F\u7528",duration:0};let s=Date.now(),o=ts();try{G.emit(F.TOOL_EXECUTION_STARTED,{toolId:t,taskId:o,context:e});let a=em(n,e);if(typeof r.callApi=="function"){let i=n.output?.apiPreset||n.apiPreset||"",l=i?{preset:i}:null,d=await r.callApi(a,l,r.signal),c=d;n.outputMode==="separate"&&n.extractTags?.length>0&&(c=XS(d,n.extractTags));let u={success:!0,taskId:o,toolId:t,data:c,duration:Date.now()-s};return G.emit(F.TOOL_EXECUTED,{toolId:t,taskId:o,result:u}),u}else return{success:!0,taskId:o,toolId:t,data:{messages:a,config:{apiPreset:n.output?.apiPreset||n.apiPreset||"",outputMode:n.outputMode,extractTags:n.extractTags}},duration:Date.now()-s,needsExecution:!0}}catch(a){Td.error(`executeToolWithConfig \u5F02\u5E38 (toolId=${t})`,{error:a});let i={success:!1,taskId:o,toolId:t,error:a.message||String(a),duration:Date.now()-s};return G.emit(F.TOOL_EXECUTION_FAILED,{toolId:t,taskId:o,error:a}),i}}function XS(t,e){let r={};for(let n of e){let s=new RegExp(`<${n}[^>]*>([\\s\\S]*?)<\\/${n}>`,"gi"),o=t.match(s);o&&(r[n]=o.map(a=>{let i=a.match(new RegExp(`<${n}[^>]*>([\\s\\S]*?)<\\/${n}>`,"i"));return i?i[1].trim():""}))}return r}async function QS(t,e,r={}){let n=[];for(let s of t){let o=ye(s);if(o&&o.enabled){let a=await tm(s,e,r);n.push(a)}}return n}var Td,Ue,Sd,aa,Ed=O(()=>{xr();at();Y();Td=I.createScope("ToolExecutor"),Ue={activeControllers:new Map,executionQueue:[],runningCount:0,maxConcurrent:3,executionHistory:[],isPaused:!1};Sd=class{constructor(e=3){this.maxConcurrent=e,this.queue=[],this.running=new Map,this.isProcessing=!1}enqueue(e,r){return new Promise((n,s)=>{this.queue.push({executor:e,task:r,resolve:n,reject:s}),this.process()})}async process(){if(!this.isProcessing){for(this.isProcessing=!0;this.queue.length>0&&this.running.size<this.maxConcurrent;){let e=this.queue.shift();if(!e)continue;let{executor:r,task:n,resolve:s,reject:o}=e,a=new AbortController;n.abortController=a,n.status="running",n.startedAt=Date.now(),this.running.set(n.id,n),Ue.activeControllers.set(n.id,a),this.executeTask(r,n,a.signal).then(i=>{n.status="completed",n.completedAt=Date.now(),s(i)}).catch(i=>{n.status=i.name==="AbortError"?"aborted":"failed",n.completedAt=Date.now(),o(i)}).finally(()=>{this.running.delete(n.id),Ue.activeControllers.delete(n.id),Ue.runningCount=this.running.size})}this.isProcessing=!1}}async executeTask(e,r,n){let s=Date.now(),o=null;for(let a=0;a<=r.maxRetries;a++){if(n.aborted)throw new DOMException("\u4EFB\u52A1\u5DF2\u4E2D\u6B62","AbortError");try{let i=await e(n);return Ui(r.id,r.toolId,!0,i,null,Date.now()-s,a)}catch(i){if(o=i,i.name==="AbortError")throw i;a===r.maxRetries&&Td.error(`\u4EFB\u52A1\u6267\u884C\u5931\u8D25 (toolId=${r.toolId}, ${a+1}\u6B21\u91CD\u8BD5)`,{error:i}),a<r.maxRetries&&(await this.delay(1e3*(a+1)),r.retries=a+1)}}throw o}delay(e){return new Promise(r=>setTimeout(r,e))}abort(e){let r=Ue.activeControllers.get(e);return r?(r.abort(),!0):!1}abortAll(){for(let e of Ue.activeControllers.values())e.abort();Ue.activeControllers.clear(),this.queue=[],this.running.clear()}getStatus(){return{pending:this.queue.length,running:this.running.size,maxConcurrent:this.maxConcurrent}}},aa=null});async function ZS(){return Ad||(Ad=Promise.resolve().then(()=>(Ed(),_d))),Ad}async function eT(t,e,r){return r&&t.output?.mode===Wt.POST_RESPONSE_API?Ht.runToolPostResponse(t,e):r&&t.output?.mode===Wt.FOLLOW_AI?Ht.runToolFollowAiManual(t,e):(await ZS()).executeToolWithConfig(t.id,e)}function tT(t,e){return e?.runSource==="MANUAL"?t.output?.mode==="local_transform"||t.processor?.type?rs.MANUAL_LOCAL_TRANSFORM:t.output?.mode===Wt.POST_RESPONSE_API?rs.MANUAL_POST_RESPONSE_API:rs.MANUAL_COMPATIBILITY:rs.MANUAL_POST_RESPONSE_API}function Fi(t,e){try{Cc(t,e)}catch(r){Zs.warn("\u66F4\u65B0\u5DE5\u5177\u8FD0\u884C\u65F6\u72B6\u6001\u5931\u8D25:",{toolId:t,error:r})}}async function rT(t,e){let r=Date.now(),n=t.id,s=`yyt-tool-run-${n}`,o=tT(t,e),a=e?.executionKey||"";Fi(n,{lastStatus:"running",lastError:"",lastDurationMs:0,lastTraceId:e?.traceId||"",lastMessageKey:e?.messageId||"",lastExecutionKey:a,lastExecutionPath:o,lastWritebackStatus:"",lastFailureStage:"",lastSlotBindingKey:e?.slotBindingKey||"",lastSlotRevisionKey:e?.slotRevisionKey||"",lastSlotTransactionId:e?.slotTransactionId||"",lastSourceMessageId:e?.sourceMessageId||e?.messageId||"",lastSourceSwipeId:e?.sourceSwipeId||e?.effectiveSwipeId||"",lastContentCommitted:!1,lastHostCommitApplied:!1,lastRefreshRequested:!1,lastRefreshConfirmed:!1,lastPreferredCommitMethod:"",lastAppliedCommitMethod:"",lastRefreshMethodCount:0,lastRefreshMethods:[],lastRefreshConfirmChecks:0,lastRefreshConfirmedBy:""}),Zs.info(`\u6B63\u5728\u624B\u52A8\u6267\u884C ${t.name}`,null,{topNotice:{sticky:!0,noticeId:s}});try{let i=o===rs.MANUAL_LOCAL_TRANSFORM?await ji(t,e):await eT(t,e,!0),l=Date.now()-r;if(i?.success){let y=ye(n),p=i?.meta?.writebackDetails||{};return Fi(n,{lastStatus:"success",lastError:"",lastDurationMs:l,lastTraceId:e?.traceId||"",successCount:(y?.runtime?.successCount||0)+1,lastMessageKey:e?.messageId||"",lastExecutionKey:a,lastExecutionPath:o,lastWritebackStatus:i?.meta?.writebackStatus||Ge.NOT_APPLICABLE,lastFailureStage:i?.meta?.failureStage||"",lastSlotBindingKey:e?.slotBindingKey||"",lastSlotRevisionKey:e?.slotRevisionKey||"",lastSlotTransactionId:e?.slotTransactionId||"",lastSourceMessageId:e?.sourceMessageId||e?.messageId||"",lastSourceSwipeId:e?.sourceSwipeId||e?.effectiveSwipeId||"",lastContentCommitted:!!p.contentCommitted,lastHostCommitApplied:!!p.hostCommitApplied,lastRefreshRequested:!!p.refreshRequested,lastRefreshConfirmed:!!p.refreshConfirmed,lastPreferredCommitMethod:p?.commit?.preferredMethod||"",lastAppliedCommitMethod:p?.commit?.appliedMethod||"",lastRefreshMethodCount:Array.isArray(p?.refresh?.requestMethods)?p.refresh.requestMethods.length:0,lastRefreshMethods:Array.isArray(p?.refresh?.requestMethods)?[...p.refresh.requestMethods]:[],lastRefreshConfirmChecks:Number(p?.refresh?.confirmChecks)||0,lastRefreshConfirmedBy:p?.refresh?.confirmedBy||""}),Zs.info(`${t.name} \u624B\u52A8\u6267\u884C\u5B8C\u6210`,null,{toast:"success",topNotice:{duration:3200,noticeId:s}}),{success:!0,duration:l,result:i}}let d=ye(n),c=i?.error||"\u5DE5\u5177\u6267\u884C\u5931\u8D25",u=i?.meta?.writebackDetails||{};return Fi(n,{lastStatus:"error",lastError:c,lastDurationMs:l,lastTraceId:e?.traceId||"",errorCount:(d?.runtime?.errorCount||0)+1,lastMessageKey:e?.messageId||"",lastExecutionKey:a,lastExecutionPath:o,lastWritebackStatus:i?.meta?.writebackStatus||Ge.NOT_APPLICABLE,lastFailureStage:i?.meta?.failureStage||(o===rs.MANUAL_COMPATIBILITY?nt.COMPATIBILITY_EXECUTE:nt.UNKNOWN),lastSlotBindingKey:e?.slotBindingKey||"",lastSlotRevisionKey:e?.slotRevisionKey||"",lastSlotTransactionId:e?.slotTransactionId||"",lastSourceMessageId:e?.sourceMessageId||e?.messageId||"",lastSourceSwipeId:e?.sourceSwipeId||e?.effectiveSwipeId||"",lastContentCommitted:!!u.contentCommitted,lastHostCommitApplied:!!u.hostCommitApplied,lastRefreshRequested:!!u.refreshRequested,lastRefreshConfirmed:!!u.refreshConfirmed,lastPreferredCommitMethod:u?.commit?.preferredMethod||"",lastAppliedCommitMethod:u?.commit?.appliedMethod||"",lastRefreshMethodCount:Array.isArray(u?.refresh?.requestMethods)?u.refresh.requestMethods.length:0,lastRefreshMethods:Array.isArray(u?.refresh?.requestMethods)?[...u.refresh.requestMethods]:[],lastRefreshConfirmChecks:Number(u?.refresh?.confirmChecks)||0,lastRefreshConfirmedBy:u?.refresh?.confirmedBy||""}),Zs.error(`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${c}`,null,{toast:!0,topNotice:{sticky:!0,noticeId:s}}),{success:!1,duration:l,error:c,result:i}}catch(i){let l=Date.now()-r,d=ye(n),c=i?.message||String(i);throw Fi(n,{lastStatus:"error",lastError:c,lastDurationMs:l,lastTraceId:e?.traceId||"",errorCount:(d?.runtime?.errorCount||0)+1,lastMessageKey:e?.messageId||"",lastExecutionKey:a,lastExecutionPath:o,lastWritebackStatus:Ge.NOT_APPLICABLE,lastFailureStage:o===rs.MANUAL_COMPATIBILITY?nt.COMPATIBILITY_EXECUTE:nt.UNKNOWN,lastSlotBindingKey:e?.slotBindingKey||"",lastSlotRevisionKey:e?.slotRevisionKey||"",lastSlotTransactionId:e?.slotTransactionId||"",lastSourceMessageId:e?.sourceMessageId||e?.messageId||"",lastSourceSwipeId:e?.sourceSwipeId||e?.effectiveSwipeId||"",lastContentCommitted:!1,lastHostCommitApplied:!1,lastRefreshRequested:!1,lastRefreshConfirmed:!1,lastPreferredCommitMethod:"",lastAppliedCommitMethod:"",lastRefreshMethodCount:0,lastRefreshMethods:[],lastRefreshConfirmChecks:0,lastRefreshConfirmedBy:""}),Zs.error(`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${c}`,null,{toast:!0,topNotice:{sticky:!0,noticeId:s}}),i}}async function Wi(t){if(!t)return{success:!1,error:"\u7F3A\u5C11\u5DE5\u5177ID"};let e=ye(t);if(!e)return{success:!1,error:"\u5DE5\u5177\u4E0D\u5B58\u5728"};if(!e.enabled)return en(t,{lastMessageKey:"",lastExecutionKey:"",lastExecutionPath:"",lastWritebackStatus:Ge.NOT_APPLICABLE,lastFailureStage:"",lastContentCommitted:!1,lastHostCommitApplied:!1,lastRefreshRequested:!1,lastRefreshConfirmed:!1,lastPreferredCommitMethod:"",lastAppliedCommitMethod:"",lastRefreshMethodCount:0,lastRefreshMethods:[],lastRefreshConfirmChecks:0,lastRefreshConfirmedBy:""},{touchLastRunAt:!1,emitEvent:!1}),Zs.warn(`${e.name} \u672A\u542F\u7528\uFF0C\u65E0\u6CD5\u624B\u52A8\u6267\u884C`,null,{topNotice:{duration:2800,noticeId:`yyt-tool-run-${t}`}}),{success:!1,error:"\u5DE5\u5177\u672A\u542F\u7528"};let r=await Bn({runSource:"MANUAL"});return rT(e,r)}async function Hi(t){if(!t)return{success:!1,error:"\u7F3A\u5C11\u5DE5\u5177ID"};let e=ye(t);if(!e)return{success:!1,error:"\u5DE5\u5177\u4E0D\u5B58\u5728"};let r=await Bn({runSource:"MANUAL_PREVIEW"});return Ht.previewExtraction(e,r)}var Zs,rs,Ad,Cd=O(()=>{xr();oa();Kn();vd();Y();Zs=I.createScope("ToolTrigger"),rs={MANUAL_POST_RESPONSE_API:"manual_post_response_api",MANUAL_LOCAL_TRANSFORM:"manual_local_transform",MANUAL_COMPATIBILITY:"manual_compatibility"},Ad=null});var nm={};ue(nm,{TOOL_CONFIG_PANEL_STYLES:()=>kd,createToolConfigPanel:()=>hn,default:()=>uT});function rm(t){return t?t.length!==void 0&&typeof t.get=="function"?t.get(0):t:null}function nT(t){if(!Number.isFinite(t)||t<=0)return"\u4ECE\u672A";let e=Date.now()-t;if(e<6e4)return`${Math.floor(e/1e3)} \u79D2\u524D`;if(e<36e5)return`${Math.floor(e/6e4)} \u5206\u949F\u524D`;if(e<864e5)return`${Math.floor(e/36e5)} \u5C0F\u65F6\u524D`;try{return new Date(t).toLocaleString()}catch{return"\u672A\u77E5"}}function sT(t){if(!t)return null;let e=t.closest(".yyt-popup-body");if(!e)return Er.warn("pinToolPanelHeight: \u627E\u4E0D\u5230 .yyt-popup-body \u7956\u5148"),null;let r=()=>{let s=t.querySelector(".yyt-tool-panel");if(!s)return;let o=e.getBoundingClientRect(),a=s.getBoundingClientRect(),i=o.bottom-a.top-8;i>100?s.style.height=`${i}px`:Er.warn(`pinToolPanelHeight: \u8BA1\u7B97\u9AD8\u5EA6\u5F02\u5E38 h=${i}`)};if(r(),requestAnimationFrame(()=>requestAnimationFrame(r)),typeof ResizeObserver>"u")return null;let n=new ResizeObserver(()=>r());return n.observe(e),()=>{try{n.disconnect()}catch{}}}function oT(t){if(!t)return;let e=t.querySelector(".yyt-tool-panel-hero"),r=t.querySelector(".yyt-tool-panel-scroll");if(!e||!r)return;let n=()=>{r.scrollTop>0?e.classList.add("yyt-tool-panel-hero--compact"):e.classList.remove("yyt-tool-panel-hero--compact")};n(),r.addEventListener("scroll",n,{passive:!0})}function hn(t={}){let{id:e,toolId:r,postResponseHint:n,previewDialogId:s,previewTitle:o="\u6D4B\u8BD5\u63D0\u53D6\u7ED3\u679C"}=t;return{id:e,toolId:r,renderTo(a){let i=rm(a);if(!i)return;if(i._yytToolPanelCleanup)try{i._yytToolPanelCleanup()}catch{}let l=()=>this.renderTo(a),d=ye(r);if(!d){i.innerHTML='<div class="yyt-empty-state-small">\u5DE5\u5177\u914D\u7F6E\u52A0\u8F7D\u5931\u8D25</div>';return}let c=f("div",{className:"yyt-tool-panel",dataset:{toolId:r}}),u=[];c.appendChild(aT(d,r,l,n));let y=f("div",{className:"yyt-tool-panel-scroll"});y.appendChild(iT(d));let p=lT(d,r,l);u.push(p),y.appendChild(p.el);let g=cT(d,r,l,a,s,o);u.push(g),y.appendChild(g.el),c.appendChild(y),i.innerHTML="",i.appendChild(c);let m=sT(i);oT(i),i._yytToolPanelCleanup=()=>{for(let h of u)try{h.destroy()}catch{}if(typeof m=="function")try{m()}catch{}delete i._yytToolPanelCleanup}},destroy(a){let i=rm(a);if(i?._yytToolPanelCleanup)try{i._yytToolPanelCleanup()}catch{}},getStyles(){return kd}}}function aT(t,e,r,n){let s=f("div",{className:"yyt-tool-panel-hero"}),o=f("div",{className:"yyt-tool-panel-hero-row1"});o.appendChild(f("div",{className:"yyt-tool-panel-hero-icon",text:"\u{1F527}"})),o.appendChild(f("div",{className:"yyt-tool-panel-hero-name",text:t.name||e}));let a=f("div",{className:"yyt-tool-panel-hero-actions"});a.appendChild(X({label:"\u25B6 \u7ACB\u5373\u6267\u884C\u4E00\u6B21",size:"small",onClick:async()=>{try{await Wi(e),Er.info("\u5DF2\u89E6\u53D1\u624B\u52A8\u6267\u884C",null,{toast:"success"})}catch(g){Er.error(`\u6267\u884C\u5931\u8D25\uFF1A${g?.message||g}`,null,{toast:!0})}}}).el),a.appendChild(X({label:"\u{1F4BE} \u4FDD\u5B58\u914D\u7F6E",size:"small",variant:"primary",onClick:()=>{Er.info("\u914D\u7F6E\u5DF2\u4FDD\u5B58",null,{toast:"success"}),r()}}).el),o.appendChild(a),s.appendChild(o),t.description&&s.appendChild(f("div",{className:"yyt-tool-panel-hero-desc",text:t.description}));let i=f("div",{className:"yyt-tool-panel-hero-chips"}),d=(t.output?.mode||"follow_ai")==="post_response_api"?"\u989D\u5916 AI \u89E3\u6790\uFF08\u81EA\u52A8\uFF09":"\u968F AI \u8F93\u51FA\uFF08\u624B\u52A8\uFF09";i.appendChild(f("span",{className:"yyt-tool-hero-chip mode",text:d}));let c=t.output?.apiPreset||t.apiPreset||"";c&&i.appendChild(f("span",{className:"yyt-tool-hero-chip preset",text:`API: ${c}`}));let u=t.extraction?.regexPresetId||"";if(u){let g=Re.getPreset(u);i.appendChild(f("span",{className:"yyt-tool-hero-chip preset",text:`\u6B63\u5219: ${g?g.name:"\u5DF2\u5220\u9664"}`}))}else i.appendChild(f("span",{className:"yyt-tool-hero-chip",text:"\u6B63\u5219: \u672A\u7ED1\u5B9A",style:{opacity:"0.6"}}));let y=t.worldbooks?.presetId||"";if(y){let g=ht.getPreset(y);g&&i.appendChild(f("span",{className:"yyt-tool-hero-chip preset",text:`\u4E16\u754C\u4E66: ${g.name}`}))}let p=t.runtime?.lastStatus;if(p){let g=p==="success"?"status-success":p==="failed"?"status-failed":"";i.appendChild(f("span",{className:`yyt-tool-hero-chip ${g}`,text:`\u4E0A\u6B21\u6267\u884C \xB7 ${p}`}))}return s.appendChild(i),s}function iT(t){let e=f("div",{className:"yyt-tool-runtime-row"}),r=t.runtime||{},n=(a,i,l="")=>{let d=f("div",{className:"yyt-tool-runtime-stat"});return d.appendChild(f("span",{className:"yyt-tool-runtime-stat-label",text:a})),d.appendChild(f("span",{className:`yyt-tool-runtime-stat-value ${l}`,text:i})),d},s=r.lastStatus==="success"?"\u2713 \u4E0A\u6B21\u6210\u529F":r.lastStatus==="failed"?"\u2717 \u4E0A\u6B21\u5931\u8D25":r.lastStatus==="idle"?"\u5F85\u547D":r.lastStatus||"\u5F85\u547D",o=r.lastStatus==="success"?"success":r.lastStatus==="failed"?"error":"muted";return e.appendChild(n("\u72B6\u6001",s,o)),e.appendChild(n("\u6700\u8FD1\u8FD0\u884C",nT(r.lastRunAt),"muted")),e.appendChild(n("\u6210\u529F",String(r.successCount||0),"success")),e.appendChild(n("\u5931\u8D25",String(r.errorCount||0),r.errorCount?"error":"muted")),e}function lT(t,e,r){let n=f("div",{style:{display:"flex",flexDirection:"column"}});n.appendChild(ia({label:"\u8F93\u51FA\u6A21\u5F0F",hint:"\u51B3\u5B9A\u6267\u884C\u8DEF\u5F84 + \u81EA\u52A8/\u624B\u52A8",control:Ee({value:t.output?.mode||"follow_ai",options:[{value:"follow_ai",label:"follow_ai \u2014 \u968F AI \u8F93\u51FA\uFF08\u624B\u52A8\u89E6\u53D1\uFF09"},{value:"post_response_api",label:"post_response_api \u2014 \u989D\u5916 AI \u89E3\u6790\uFF08\u81EA\u52A8\uFF09"}],onChange:l=>{let d=ye(e)||{};Le(e,{...d,output:{...d.output||{},mode:l,enabled:l==="post_response_api"}}),r()}})}));let s=(()=>{try{return Gr()||[]}catch{return[]}})();n.appendChild(ia({label:"API \u9884\u8BBE",hint:"\u989D\u5916 AI \u89E3\u6790\u65F6\u4F7F\u7528",control:Ee({value:t.output?.apiPreset||t.apiPreset||"",options:[{value:"",label:"\u2014\u2014 \u8DDF\u968F\u5F53\u524D\u4E3B API \u2014\u2014"},...s.map(l=>({value:l.name,label:l.name}))],onChange:l=>{let d=ye(e)||{};Le(e,{...d,apiPreset:l,output:{...d.output||{},apiPreset:l}}),r()}})}));let o=(()=>{try{return ra()||[]}catch{return[]}})();n.appendChild(ia({label:"Ai \u6307\u4EE4\u9884\u8BBE",hint:'\u9644\u52A0\u5728 system/user \u524D\u7684\u6307\u4EE4\uFF1B\u9009"\u65E0"\u5373\u4E0D\u542F\u7528',control:Ee({value:t.bypass?.enabled&&t.bypass?.presetId||"",options:[{value:"",label:"\u2014\u2014 \u65E0 \u2014\u2014"},...o.map(l=>({value:l.id,label:`${l.name}${l.isDefault?" [\u9ED8\u8BA4]":""}`}))],onChange:l=>{let d=ye(e)||{};Le(e,{...d,bypass:{enabled:!!l,presetId:l||""}}),r()}})}));let a=Re.listPresets();n.appendChild(ia({label:"\u6B63\u5219\u63D0\u53D6\u9884\u8BBE",hint:"\u51B3\u5B9A\u4ECE AI \u56DE\u590D\u4E2D\u5982\u4F55\u62BD\u53D6",control:Ee({value:t.extraction?.regexPresetId||"",options:[{value:"",label:"\u2014\u2014 \u65E0\uFF08\u4E0D\u8FDB\u884C\u63D0\u53D6\uFF09 \u2014\u2014"},...a.map(l=>({value:l.id,label:l.name}))],onChange:l=>{let d=ye(e)||{},c={...d.extraction||{},regexPresetId:l};if(l){let u=Re.getPreset(l);Er.info(`\u5DF2\u7ED1\u5B9A\u6B63\u5219\u9884\u8BBE\uFF1A${u?.name||l}`,null,{toast:"success"})}else Er.info("\u5DF2\u89E3\u7ED1\u6B63\u5219\u9884\u8BBE\uFF0C\u5DE5\u5177\u5C06\u4E0D\u8FDB\u884C\u5185\u5BB9\u63D0\u53D6",null,{toast:"success"});Le(e,{...d,extraction:c}),r()}})}));let i=ht.listPresets();return n.appendChild(ia({label:"\u4E16\u754C\u4E66\u9884\u8BBE",hint:"\u6CE8\u5165\u5230 prompt \u7684 {{toolWorldbookContent}}",control:Ee({value:t.worldbooks?.presetId||"",options:[{value:"",label:"\u2014\u2014 \u65E0\uFF08\u4FDD\u7559\u5DE5\u5177\u539F\u6709\u4E16\u754C\u4E66\u8BBE\u7F6E\uFF09 \u2014\u2014"},...i.map(l=>({value:l.id,label:l.name}))],onChange:l=>{let d=ye(e)||{},c={...d.worldbooks||{},presetId:l};if(l){let u=ht.getPreset(l);Er.info(`\u5DF2\u7ED1\u5B9A\u4E16\u754C\u4E66\u9884\u8BBE\uFF1A${u?.name||l}`,null,{toast:"success"})}else Er.info("\u5DF2\u89E3\u7ED1\u4E16\u754C\u4E66\u9884\u8BBE\uFF0C\u5DE5\u5177\u4E0D\u518D\u6CE8\u5165\u4E16\u754C\u4E66\u5185\u5BB9",null,{toast:"success"});Le(e,{...d,worldbooks:c}),r()}})})),rr({heading:"\u7ED1\u5B9A",icon:"\u{1F517}",content:[n]})}function ia({label:t,hint:e,control:r}){let n=f("div",{className:"yyt-tool-binding-row"}),s=f("div",{className:"yyt-tool-binding-label"});return s.appendChild(f("span",{className:"yyt-tool-binding-label-text",text:t})),e&&s.appendChild(f("span",{className:"yyt-tool-binding-label-hint",text:e})),n.appendChild(s),r.el.classList.add("small"),Object.assign(r.el.style,{padding:"7px 10px",fontSize:"12px"}),n.appendChild(r.el),n.appendChild(f("div",{className:"yyt-tool-binding-meta"})),n}function cT(t,e,r,n,s,o){let a=f("div",{style:{display:"flex",flexDirection:"column"}});a.appendChild(f("div",{style:{marginBottom:"8px",display:"flex",alignItems:"center",gap:"10px"}},f("div",{style:{flex:"1"}},f("div",{text:"\u63D0\u793A\u8BCD\u6A21\u677F",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}}),f("div",{text:"\u7528 {{macro}} \u5F15\u7528\u4E0A\u4E0B\u6587\u3002\u6A21\u677F\u5185\u5BB9\u4F1A\u4F5C\u4E3A\u53D1\u7ED9\u989D\u5916 AI \u7684 user \u6D88\u606F\u3002",style:{fontSize:"11px",color:"var(--yyt-text-muted)",lineHeight:"1.6"}})),X({label:"\u{1F504} \u91CD\u7F6E\u4E3A\u9ED8\u8BA4",size:"small",variant:"ghost",onClick:()=>{if(!window.confirm("\u7528\u5DE5\u5177\u9ED8\u8BA4\u6A21\u677F\u8986\u76D6\u5F53\u524D\u6A21\u677F\uFF1F"))return;let b=oi(e)||{},w=ye(e)||{};Le(e,{...w,promptTemplate:b.promptTemplate||""}),r()}}).el));let i=f("textarea",{className:"yyt-textarea yyt-code-textarea",attrs:{rows:"10",placeholder:"\u8F93\u5165\u63D0\u793A\u8BCD\u6A21\u677F..."},style:{width:"100%",resize:"vertical",fontFamily:"ui-monospace, monospace",fontSize:"12px",lineHeight:"1.7"}});i.value=t.promptTemplate||"",i.addEventListener("change",()=>{let b=ye(e)||{};Le(e,{...b,promptTemplate:i.value})}),a.appendChild(i),a.appendChild(f("div",{className:"yyt-macro-inline",html:"\u53EF\u7528\u5B8F\uFF1A<code>{{toolPromptMacro}}</code> <code>{{toolContentMacro}}</code> <code>{{toolWorldbookContent}}</code> <code>{{lastAiMessage}}</code> <code>{{recentMessagesText}}</code> <code>{{rawRecentMessagesText}}</code> <code>{{userMessage}}</code> <code>{{toolName}}</code> <code>{{toolId}}</code>"})),a.appendChild(f("hr",{className:"yyt-zone-divider"})),a.appendChild(f("div",{style:{marginBottom:"8px"}},f("div",{text:"\u63D0\u53D6\u914D\u7F6E",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}}),f("div",{text:'\u4ECE AI \u56DE\u590D\u4E2D\u62BD\u53D6\u5E76\u5199\u56DE\u3002\u5B8C\u6574\u89C4\u5219\u7531"\u6B63\u5219\u63D0\u53D6\u9884\u8BBE"\u51B3\u5B9A\uFF0C\u8FD9\u91CC\u53EA\u914D\u7F6E\u5DE5\u5177\u53C2\u6570\u3002',style:{fontSize:"11px",color:"var(--yyt-text-muted)",lineHeight:"1.6"}})));let l=f("div",{style:{display:"grid",gridTemplateColumns:"1fr auto",gap:"12px",alignItems:"end",marginBottom:"12px"}}),d=f("div",{className:"yyt-form-group",style:{margin:0}});d.appendChild(f("label",{text:"\u6700\u5927\u63D0\u53D6 AI \u6D88\u606F\u6570",style:{fontSize:"12px",fontWeight:"600",color:"var(--yyt-text-secondary, rgba(255,255,255,0.55))"}}));let c=f("input",{className:"yyt-input",attrs:{type:"number",min:"1",max:"50"},style:{padding:"7px 10px",fontSize:"12px"}});c.value=String(Number(t.extraction?.maxMessages)||5),c.addEventListener("change",()=>{let b=ye(e)||{};Le(e,{...b,extraction:{...b.extraction||{},maxMessages:Math.max(1,parseInt(c.value,10)||5)}})}),d.appendChild(c),l.appendChild(d);let u=f("div",{className:"yyt-form-group",style:{margin:0}});u.appendChild(f("label",{html:"&nbsp;",style:{fontSize:"12px"}})),u.appendChild(X({label:"\u{1F50D} \u6D4B\u8BD5\u63D0\u53D6",onClick:async()=>{try{let b=await Hi(e);dT(n,b,s,o)}catch(b){Er.error(`\u6D4B\u8BD5\u63D0\u53D6\u5931\u8D25\uFF1A${b?.message||b}`,null,{toast:!0})}}}).el),l.appendChild(u),a.appendChild(l);let y=f("div",{className:"yyt-form-group",style:{margin:0}});y.appendChild(f("label",{html:'\u5199\u56DE\u6807\u7B7E <span style="font-size:10px;color:var(--yyt-text-muted);font-weight:500;">\uFF08\u591A\u6807\u7B7E\u63D0\u53D6\u65F6\u6307\u5B9A\u552F\u4E00\u5199\u56DE\u6807\u7B7E\uFF1B\u7559\u7A7A\u5219\u63D0\u53D6\u9996\u4E2A\uFF09</span>',style:{fontSize:"12px",fontWeight:"600",color:"var(--yyt-text-secondary, rgba(255,255,255,0.55))"}}));let p=`yyt-writeback-dl-${e}-${Math.random().toString(36).slice(2,6)}`,g=f("datalist",{attrs:{id:p}}),m=(()=>{let b=new Set,w=[];function S(k){if(k)for(let v of k.rules||[]){if(v?.enabled===!1||v?.type!=="include")continue;let C=String(v.value||"").trim();!C||b.has(C)||(b.add(C),w.push(C))}}let _=t.extraction?.regexPresetId;if(_)S(Re.getPreset(_));else for(let k of Re.listPresets())S(k);return w})();for(let b of m)g.appendChild(f("option",{attrs:{value:b}}));let h=f("input",{className:"yyt-input",attrs:{type:"text",placeholder:"\u5982 status / content\uFF08\u6765\u81EA\u6B63\u5219\u9884\u8BBE\u7684 include \u6807\u7B7E\uFF09",list:p,autocomplete:"off"},style:{padding:"7px 10px",fontSize:"12px"}});return h.value=t.extraction?.writebackTag||"",h.addEventListener("change",()=>{let b=ye(e)||{};Le(e,{...b,extraction:{...b.extraction||{},writebackTag:h.value.trim()}})}),y.appendChild(h),y.appendChild(g),a.appendChild(y),rr({heading:"\u914D\u7F6E",icon:"\u2699",content:[a]})}function dT(t,e,r,n){if(!se()||!$e(t))return;let o=`${Mn}-${r||"extraction-preview"}`,a=Array.isArray(e?.messageEntries)?e.messageEntries:[],i=a.length>0?`
      <div class="yyt-form-group">
        <label>\u9010\u6761\u6D88\u606F\u9884\u89C8</label>
        <div class="yyt-preview-message-list">
          ${a.map((l,d)=>{let c=d===a.length-1?"\u6700\u65B0\u6D88\u606F":`\u6700\u8FD1\u7684\u7B2C ${a.length-d} \u6761\u6D88\u606F`;return`
              <div class="yyt-preview-message-item">
                <div class="yyt-preview-message-title">${mn(c)}</div>
                <div><label>\u539F\u6587</label><pre class="yyt-preview-box yyt-preview-pre">${mn(l.rawText||"\u65E0\u53EF\u7528\u6D88\u606F")}</pre></div>
                <div><label>\u6B63\u6587\u63D0\u53D6</label><pre class="yyt-preview-box yyt-preview-pre">${mn(l.filteredText||"\u6B63\u6587\u89C4\u5219\u672A\u547D\u4E2D")}</pre></div>
                <div><label>\u5DE5\u5177\u6807\u7B7E\u63D0\u53D6</label><pre class="yyt-preview-box yyt-preview-pre">${mn(l.extractedText||"\u672A\u63D0\u53D6\u5230\u5185\u5BB9")}</pre></div>
              </div>
            `}).join("")}
        </div>
      </div>
    `:"";t.append(xo({id:o,title:n,width:"720px",wide:!0,body:`
      <div class="yyt-form-group">
        <label>\u63D0\u53D6\u89C4\u5219</label>
        <div class="yyt-preview-box">${mn((e?.selectors||[]).join(`
`)||"\u65E0")}</div>
      </div>
      <div class="yyt-form-group">
        <label>\u539F\u59CB\u5185\u5BB9\u6C47\u603B</label>
        <pre class="yyt-preview-box yyt-preview-pre">${mn(e?.sourceText||"\u65E0\u53EF\u7528\u6D88\u606F")}</pre>
      </div>
      <div class="yyt-form-group">
        <label>\u6B63\u6587\u63D0\u53D6\u6C47\u603B</label>
        <pre class="yyt-preview-box yyt-preview-pre">${mn(e?.filteredSourceText||"\u6B63\u6587\u89C4\u5219\u672A\u547D\u4E2D")}</pre>
      </div>
      <div class="yyt-form-group">
        <label>\u5DE5\u5177\u6807\u7B7E\u63D0\u53D6\u6C47\u603B</label>
        <pre class="yyt-preview-box yyt-preview-pre">${mn(e?.extractedText||"\u672A\u63D0\u53D6\u5230\u5185\u5BB9")}</pre>
      </div>
      ${i}
    `})),wo(t,o,{onSave:l=>l()}),t.find(`#${o}-save`).text("\u5173\u95ED"),t.find(`#${o}-cancel`).remove()}function mn(t){return t==null?"":String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var Er,kd,uT,eo=O(()=>{nr();lt();lt();xr();hs();Ys();Cd();Y();rn();xs();Er=I.createScope("ToolConfigPanel"),kd=`
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
`;uT=hn});var om={};ue(om,{SummaryToolPanel:()=>sm,default:()=>pT});var sm,pT,am=O(()=>{eo();sm=hn({id:"summaryToolPanel",toolId:"summaryTool",postResponseHint:"\u70B9\u51FB\u201C\u7ACB\u5373\u6267\u884C\u4E00\u6B21\u201D\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u8FDB\u884C\u6458\u8981\u89E3\u6790\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 boo_FM
\u6216 regex:<boo_FM>([\\s\\S]*?)</boo_FM>`,previewDialogId:"summary-extraction-preview",defaultInjectionOrder:1e4,lorebookLogTag:"SummaryToolPanel"}),pT=sm});var lm={};ue(lm,{StatusBlockPanel:()=>im,default:()=>yT});var im,yT,cm=O(()=>{eo();im=hn({id:"statusBlockPanel",toolId:"statusBlock",postResponseHint:"\u70B9\u51FB\u201C\u7ACB\u5373\u6267\u884C\u4E00\u6B21\u201D\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u751F\u6210\u4E3B\u89D2\u72B6\u6001\u680F\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 status_block
\u6216 regex:<status_block>([\\s\\S]*?)</status_block>`,previewDialogId:"status-extraction-preview",defaultInjectionOrder:10001,lorebookLogTag:"StatusBlockPanel"}),yT=im});var um={};ue(um,{YouyouReviewPanel:()=>dm,default:()=>fT});var dm,fT,pm=O(()=>{eo();dm=hn({id:"youyouReviewPanel",toolId:"youyouReview",postResponseHint:"\u70B9\u51FB\u201C\u7ACB\u5373\u6267\u884C\u4E00\u6B21\u201D\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u5728\u672B\u5C3E\u751F\u6210\u5C0F\u5E7D\u70B9\u8BC4\u4E0E\u5267\u60C5\u94A9\u5B50\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 youyou
\u6216 regex:<youyou>([\\s\\S]*?)</youyou>`,previewDialogId:"youyou-review-extraction-preview",previewTitle:"\u5C0F\u5E7D\u70B9\u8BC4\u63D0\u53D6\u9884\u89C8"}),fT=dm});function ym(t){return t?t.length!==void 0&&typeof t.get=="function"?t.get(0):t:null}function gT(t){if(!Number.isFinite(t)||t<=0)return"\u4ECE\u672A";let e=Date.now()-t;if(e<6e4)return`${Math.floor(e/1e3)} \u79D2\u524D`;if(e<36e5)return`${Math.floor(e/6e4)} \u5206\u949F\u524D`;if(e<864e5)return`${Math.floor(e/36e5)} \u5C0F\u65F6\u524D`;try{return new Date(t).toLocaleString()}catch{return"\u672A\u77E5"}}function bn(t){return t==null?"":String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Gi(t={}){let{id:e,toolId:r,previewDialogId:n,previewTitle:s="\u6D4B\u8BD5\u63D0\u53D6\u7ED3\u679C",processorDirections:o=[],processorOptions:a=[],heroHint:i=""}=t;return{id:e,toolId:r,renderTo(l){let d=ym(l);if(!d)return;if(d._yytLocalToolPanelCleanup)try{d._yytLocalToolPanelCleanup()}catch{}let c=()=>this.renderTo(l),u=ye(r);if(!u){d.innerHTML='<div class="yyt-empty-state-small">\u5DE5\u5177\u914D\u7F6E\u52A0\u8F7D\u5931\u8D25</div>';return}let y=f("div",{className:"yyt-tool-panel",dataset:{toolId:r}}),p=[];y.appendChild(mT(u,r,c,o,i)),y.appendChild(hT(u));let g=bT(u,r,c);p.push(g),y.appendChild(g.el);let m=xT(u,r,c,l,o,a,n,s);p.push(m),y.appendChild(m.el),d.innerHTML="",d.appendChild(y),d._yytLocalToolPanelCleanup=()=>{for(let h of p)try{h.destroy()}catch{}delete d._yytLocalToolPanelCleanup}},destroy(l){let d=ym(l);if(d?._yytLocalToolPanelCleanup)try{d._yytLocalToolPanelCleanup()}catch{}},getStyles(){return""}}}function mT(t,e,r,n,s){let o=f("div",{className:"yyt-tool-panel-hero"}),a=f("div",{className:"yyt-tool-panel-hero-row1"});a.appendChild(f("div",{className:"yyt-tool-panel-hero-icon",text:"\u2699"})),a.appendChild(f("div",{className:"yyt-tool-panel-hero-name",text:t.name||e}));let i=f("div",{className:"yyt-tool-panel-hero-actions"});i.appendChild(X({label:"\u25B6 \u7ACB\u5373\u6267\u884C\u4E00\u6B21",size:"small",onClick:async()=>{try{await Wi(e),to.info("\u5DF2\u89E6\u53D1\u624B\u52A8\u6267\u884C",null,{toast:"success"})}catch(m){to.error(`\u6267\u884C\u5931\u8D25\uFF1A${m?.message||m}`,null,{toast:!0})}}}).el),i.appendChild(X({label:"\u{1F4BE} \u4FDD\u5B58\u914D\u7F6E",size:"small",variant:"primary",onClick:()=>{to.info("\u914D\u7F6E\u5DF2\u4FDD\u5B58",null,{toast:"success"}),r()}}).el),a.appendChild(i),o.appendChild(a),t.description&&o.appendChild(f("div",{className:"yyt-tool-panel-hero-desc",text:t.description})),s&&o.appendChild(f("div",{className:"yyt-tool-panel-hero-desc",text:s}));let l=f("div",{className:"yyt-tool-panel-hero-chips"}),d=t.output?.autoTrigger!==!1;l.appendChild(f("span",{className:"yyt-tool-hero-chip mode",text:`\u672C\u5730\u811A\u672C\uFF08${d?"\u81EA\u52A8":"\u624B\u52A8"}\uFF09`}));let c=t.processor?.direction||n[0]?.key||"",u=n.find(m=>m.key===c)?.label||c;u&&l.appendChild(f("span",{className:"yyt-tool-hero-chip preset",text:`\u65B9\u5411: ${u}`}));let y=t.output?.overwrite!==!1;l.appendChild(f("span",{className:"yyt-tool-hero-chip preset",text:`\u5199\u56DE: ${y?"\u8986\u76D6":"\u8FFD\u52A0"}`}));let p=t.extraction?.regexPresetId||"";if(p){let m=Re.getPreset(p);m&&l.appendChild(f("span",{className:"yyt-tool-hero-chip preset",text:`\u6B63\u5219: ${m.name}`}))}let g=t.runtime?.lastStatus;if(g){let m=g==="success"?"status-success":g==="failed"?"status-failed":"";l.appendChild(f("span",{className:`yyt-tool-hero-chip ${m}`,text:`\u4E0A\u6B21\u6267\u884C \xB7 ${g}`}))}return o.appendChild(l),o}function hT(t){let e=f("div",{className:"yyt-tool-runtime-row"}),r=t.runtime||{},n=(a,i,l="")=>{let d=f("div",{className:"yyt-tool-runtime-stat"});return d.appendChild(f("span",{className:"yyt-tool-runtime-stat-label",text:a})),d.appendChild(f("span",{className:`yyt-tool-runtime-stat-value ${l}`,text:i})),d},s=r.lastStatus==="success"?"\u2713 \u4E0A\u6B21\u6210\u529F":r.lastStatus==="failed"?"\u2717 \u4E0A\u6B21\u5931\u8D25":"\u5F85\u547D",o=r.lastStatus==="success"?"success":r.lastStatus==="failed"?"error":"muted";return e.appendChild(n("\u72B6\u6001",s,o)),e.appendChild(n("\u6700\u8FD1\u8FD0\u884C",gT(r.lastRunAt),"muted")),e.appendChild(n("\u6210\u529F",String(r.successCount||0),"success")),e.appendChild(n("\u5931\u8D25",String(r.errorCount||0),r.errorCount?"error":"muted")),e}function bT(t,e,r){let n=f("div",{style:{display:"flex",flexDirection:"column"}}),s=Re.listPresets();return n.appendChild(Id({label:"\u6B63\u5219\u63D0\u53D6\u9884\u8BBE",hint:"\u51B3\u5B9A\u4ECE AI \u56DE\u590D\u4E2D\u5982\u4F55\u62BD\u53D6\u8981\u672C\u5730\u5904\u7406\u7684\u6587\u672C",control:Ee({value:t.extraction?.regexPresetId||"",options:[{value:"",label:"\u2014\u2014 \u65E0\uFF08\u4E0D\u8FDB\u884C\u63D0\u53D6\uFF09 \u2014\u2014"},...s.map(o=>({value:o.id,label:o.name}))],onChange:o=>{let a=ye(e)||{},i={...a.extraction||{},regexPresetId:o};if(o){let l=Re.getPreset(o);to.info(`\u5DF2\u7ED1\u5B9A\u6B63\u5219\u9884\u8BBE\uFF1A${l?.name||o}`,null,{toast:"success"})}else to.info("\u5DF2\u89E3\u7ED1\u6B63\u5219\u9884\u8BBE\uFF0C\u5DE5\u5177\u5C06\u4E0D\u8FDB\u884C\u5185\u5BB9\u63D0\u53D6",null,{toast:"success"});Le(e,{...a,extraction:i}),r()}})})),n.appendChild(Id({label:"\u5199\u56DE\u65B9\u5F0F",hint:"\u5904\u7406\u540E\u7684\u7ED3\u679C\u5982\u4F55\u56DE\u5199\u5230 AI \u6D88\u606F",control:Ee({value:t.output?.overwrite!==!1?"replace":"append",options:[{value:"replace",label:"\u8986\u76D6\u539F\u5DE5\u5177\u5757"},{value:"append",label:"\u8FFD\u52A0\u5230\u672B\u5C3E"}],onChange:o=>{let a=ye(e)||{};Le(e,{...a,output:{...a.output||{},overwrite:o==="replace",enabled:!0,mode:"local_transform"}}),r()}})})),n.appendChild(Id({label:"\u81EA\u52A8\u89E6\u53D1",hint:"\u6536\u5230 AI \u56DE\u590D\u540E\u662F\u5426\u81EA\u52A8\u6267\u884C\u6B64\u811A\u672C",control:Ee({value:t.output?.autoTrigger!==!1?"auto":"manual",options:[{value:"auto",label:"\u81EA\u52A8\uFF08\u6536\u5230\u56DE\u590D\u5373\u6267\u884C\uFF09"},{value:"manual",label:"\u624B\u52A8\uFF08\u4EC5\u70B9\u51FB\u6309\u94AE\u6267\u884C\uFF09"}],onChange:o=>{let a=ye(e)||{};Le(e,{...a,output:{...a.output||{},autoTrigger:o==="auto",enabled:!0,mode:"local_transform"}}),r()}})})),rr({heading:"\u7ED1\u5B9A",icon:"\u{1F517}",content:[n]})}function Id({label:t,hint:e,control:r}){let n=f("div",{className:"yyt-tool-binding-row"}),s=f("div",{className:"yyt-tool-binding-label"});return s.appendChild(f("span",{className:"yyt-tool-binding-label-text",text:t})),e&&s.appendChild(f("span",{className:"yyt-tool-binding-label-hint",text:e})),n.appendChild(s),Object.assign(r.el.style,{padding:"7px 10px",fontSize:"12px"}),n.appendChild(r.el),n.appendChild(f("div",{className:"yyt-tool-binding-meta"})),n}function xT(t,e,r,n,s,o,a,i){let l=f("div",{style:{display:"flex",flexDirection:"column"}});l.appendChild(f("div",{style:{marginBottom:"10px"}},f("div",{text:"\u6267\u884C\u65B9\u5411",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}}),f("div",{text:"\u51B3\u5B9A\u672C\u5730\u811A\u672C\u8FD0\u884C\u54EA\u4E2A\u53D8\u6362\u8DEF\u5F84\u3002",style:{fontSize:"11px",color:"var(--yyt-text-muted)",lineHeight:"1.6"}})));let d=t.processor?.direction||s[0]?.key||"",c=Ee({value:d,options:s.map(m=>({value:m.key,label:m.description?`${m.label} \u2014 ${m.description}`:m.label})),style:{padding:"7px 10px",fontSize:"12px"},onChange:m=>{let h=ye(e)||{};Le(e,{...h,processor:{...h.processor||{},direction:m}}),r()}});if(l.appendChild(c.el),l.appendChild(f("hr",{className:"yyt-zone-divider"})),o.length>0){l.appendChild(f("div",{style:{marginBottom:"10px"}},f("div",{text:"\u5904\u7406\u9879",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}}),f("div",{text:"\u52FE\u9009\u8981\u5305\u542B\u5728\u672C\u6B21\u53D8\u6362\u4E2D\u7684\u9879\u76EE\u3002",style:{fontSize:"11px",color:"var(--yyt-text-muted)",lineHeight:"1.6"}})));let m=f("div",{style:{display:"flex",flexDirection:"column"}}),h=t.processor?.options||{};for(let b of o){let w=Ye({label:b.label,hint:b.description||"",checked:h[b.key]===!0,onChange:S=>{let _=ye(e)||{};Le(e,{..._,processor:{..._.processor||{},options:{..._.processor?.options||{},[b.key]:S}}})}});m.appendChild(w.el)}l.appendChild(m),l.appendChild(f("hr",{className:"yyt-zone-divider"}))}l.appendChild(f("div",{style:{marginBottom:"10px"}},f("div",{text:"\u63D0\u53D6\u914D\u7F6E",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}}),f("div",{text:'\u4ECE AI \u56DE\u590D\u4E2D\u62BD\u53D6\u8981\u672C\u5730\u5904\u7406\u7684\u6587\u672C\u3002\u5B8C\u6574\u89C4\u5219\u7531"\u6B63\u5219\u63D0\u53D6\u9884\u8BBE"\u51B3\u5B9A\uFF0C\u8FD9\u91CC\u53EA\u914D\u7F6E\u5DE5\u5177\u53C2\u6570\u3002',style:{fontSize:"11px",color:"var(--yyt-text-muted)",lineHeight:"1.6"}})));let u=f("div",{style:{display:"grid",gridTemplateColumns:"1fr auto",gap:"12px",alignItems:"end"}}),y=f("div",{className:"yyt-form-group",style:{margin:0}});y.appendChild(f("label",{text:"\u6700\u5927\u63D0\u53D6 AI \u6D88\u606F\u6570",style:{fontSize:"12px",fontWeight:"600",color:"var(--yyt-text-secondary, rgba(255,255,255,0.55))"}}));let p=f("input",{className:"yyt-input",attrs:{type:"number",min:"1",max:"50"},style:{padding:"7px 10px",fontSize:"12px"}});p.value=String(Number(t.extraction?.maxMessages)||5),p.addEventListener("change",()=>{let m=ye(e)||{};Le(e,{...m,extraction:{...m.extraction||{},maxMessages:Math.max(1,parseInt(p.value,10)||5)}})}),y.appendChild(p),u.appendChild(y);let g=f("div",{className:"yyt-form-group",style:{margin:0}});return g.appendChild(f("label",{html:"&nbsp;",style:{fontSize:"12px"}})),g.appendChild(X({label:"\u{1F50D} \u6D4B\u8BD5\u63D0\u53D6",onClick:async()=>{try{let m=await Hi(e);wT(n,m,a,i)}catch(m){to.error(`\u6D4B\u8BD5\u63D0\u53D6\u5931\u8D25\uFF1A${m?.message||m}`,null,{toast:!0})}}}).el),u.appendChild(g),l.appendChild(u),rr({heading:"\u914D\u7F6E",icon:"\u2699",content:[l]})}function wT(t,e,r,n){if(!se()||!$e(t))return;let o=`${Mn}-${r||"extraction-preview"}`,a=Array.isArray(e?.messageEntries)?e.messageEntries:[],i=a.length>0?`
      <div class="yyt-form-group">
        <label>\u9010\u6761\u6D88\u606F\u9884\u89C8</label>
        <div class="yyt-preview-message-list">
          ${a.map((l,d)=>{let c=d===a.length-1?"\u6700\u65B0\u6D88\u606F":`\u6700\u8FD1\u7684\u7B2C ${a.length-d} \u6761\u6D88\u606F`;return`
              <div class="yyt-preview-message-item">
                <div class="yyt-preview-message-title">${bn(c)}</div>
                <div><label>\u539F\u6587</label><pre class="yyt-preview-box yyt-preview-pre">${bn(l.rawText||"\u65E0\u53EF\u7528\u6D88\u606F")}</pre></div>
                <div><label>\u6B63\u6587\u63D0\u53D6</label><pre class="yyt-preview-box yyt-preview-pre">${bn(l.filteredText||"\u6B63\u6587\u89C4\u5219\u672A\u547D\u4E2D")}</pre></div>
                <div><label>\u5DE5\u5177\u6807\u7B7E\u63D0\u53D6</label><pre class="yyt-preview-box yyt-preview-pre">${bn(l.extractedText||"\u672A\u63D0\u53D6\u5230\u5185\u5BB9")}</pre></div>
              </div>
            `}).join("")}
        </div>
      </div>
    `:"";t.append(xo({id:o,title:n,width:"720px",wide:!0,body:`
      <div class="yyt-form-group">
        <label>\u63D0\u53D6\u89C4\u5219</label>
        <div class="yyt-preview-box">${bn((e?.selectors||[]).join(`
`)||"\u65E0")}</div>
      </div>
      <div class="yyt-form-group">
        <label>\u539F\u59CB\u5185\u5BB9\u6C47\u603B</label>
        <pre class="yyt-preview-box yyt-preview-pre">${bn(e?.sourceText||"\u65E0\u53EF\u7528\u6D88\u606F")}</pre>
      </div>
      <div class="yyt-form-group">
        <label>\u6B63\u6587\u63D0\u53D6\u6C47\u603B</label>
        <pre class="yyt-preview-box yyt-preview-pre">${bn(e?.filteredSourceText||"\u6B63\u6587\u89C4\u5219\u672A\u547D\u4E2D")}</pre>
      </div>
      <div class="yyt-form-group">
        <label>\u5DE5\u5177\u6807\u7B7E\u63D0\u53D6\u6C47\u603B</label>
        <pre class="yyt-preview-box yyt-preview-pre">${bn(e?.extractedText||"\u672A\u63D0\u53D6\u5230\u5185\u5BB9")}</pre>
      </div>
      ${i}
    `})),wo(t,o,{onSave:l=>l()}),t.find(`#${o}-save`).text("\u5173\u95ED"),t.find(`#${o}-cancel`).remove()}var to,Rd=O(()=>{nr();lt();xr();Cd();Y();eo();rn();to=I.createScope("LocalTransformToolPanel")});var gm={};ue(gm,{EscapeTransformToolPanel:()=>fm,default:()=>vT});var fm,vT,mm=O(()=>{Rd();fm=Gi({id:"escapeTransformToolPanel",toolId:"escapeTransformTool",previewDialogId:"escape-transform-extraction-preview",previewTitle:"\u8F6C\u4E49\u5904\u7406\u63D0\u53D6\u9884\u89C8",heroHint:"\u4ECE\u6700\u8FD1 AI \u6D88\u606F\u63D0\u53D6\u6587\u672C\u540E\uFF0C\u5728\u672C\u5730\u6267\u884C\u8F6C\u4E49\u6216\u53BB\u8F6C\u4E49\uFF0C\u518D\u6309\u6240\u9009\u65B9\u5F0F\u5199\u56DE\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\u6216\u6B63\u5219\uFF0C\u4F8B\u5982\uFF1A
content
regex:<content>([\\s\\S]*?)</content>`,processorDirections:[{key:"escape",label:"\u8F6C\u4E49",description:"\u628A\u539F\u59CB\u5B57\u7B26\u8F6C\u6362\u6210\u8F6C\u4E49\u5E8F\u5217\u3002"},{key:"unescape",label:"\u53BB\u8F6C\u4E49",description:"\u628A\u8F6C\u4E49\u5E8F\u5217\u8FD8\u539F\u6210\u539F\u59CB\u5B57\u7B26\u3002"}],processorOptions:[{key:"doubleQuote",label:"\u53CC\u5F15\u53F7",description:'\u5904\u7406 " \u4E0E \\"\u3002'},{key:"singleQuote",label:"\u5355\u5F15\u53F7",description:"\u5904\u7406 ' \u4E0E \\'\u3002"},{key:"newline",label:"\u6362\u884C\u7B26",description:"\u5904\u7406\u6362\u884C\u4E0E \\n\u3002"}]}),vT=fm});var bm={};ue(bm,{PunctuationTransformToolPanel:()=>hm,default:()=>ST});var hm,ST,xm=O(()=>{Rd();hm=Gi({id:"punctuationTransformToolPanel",toolId:"punctuationTransformTool",previewDialogId:"punctuation-transform-extraction-preview",previewTitle:"\u4E2D\u6587\u6807\u70B9\u66FF\u6362\u63D0\u53D6\u9884\u89C8",heroHint:"\u4ECE\u6700\u8FD1 AI \u6D88\u606F\u63D0\u53D6\u6587\u672C\u540E\uFF0C\u5728\u672C\u5730\u628A\u82F1\u6587\u6807\u70B9\u66FF\u6362\u6210\u4E2D\u6587\u6807\u70B9\uFF0C\u518D\u6309\u6240\u9009\u65B9\u5F0F\u5199\u56DE\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\u6216\u6B63\u5219\uFF0C\u4F8B\u5982\uFF1A
content
regex:<content>([\\s\\S]*?)</content>`,processorDirections:[{key:"en_to_zh",label:"\u82F1\u6587\u8F6C\u4E2D\u6587",description:"\u6309\u52FE\u9009\u9879\u628A\u82F1\u6587\u6807\u70B9\u66FF\u6362\u4E3A\u4E2D\u6587\u6807\u70B9\u3002"}],processorOptions:[{key:"comma",label:"\u9017\u53F7 ,",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u9017\u53F7\u3002"},{key:"period",label:"\u53E5\u53F7 .",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u53E5\u53F7\u3002"},{key:"exclamation",label:"\u611F\u53F9\u53F7 !",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u611F\u53F9\u53F7\u3002"},{key:"question",label:"\u95EE\u53F7 ?",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u95EE\u53F7\u3002"},{key:"semicolon",label:"\u5206\u53F7 ;",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u5206\u53F7\u3002"},{key:"colon",label:"\u5192\u53F7 :",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u5192\u53F7\u3002"},{key:"leftParen",label:"\u5DE6\u62EC\u53F7 (",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u5DE6\u62EC\u53F7\u3002"},{key:"rightParen",label:"\u53F3\u62EC\u53F7 )",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u53F3\u62EC\u53F7\u3002"}]}),ST=hm});var vm={};ue(vm,{BypassPanel:()=>wm,default:()=>TT});var pt,wm,TT,Sm=O(()=>{at();Ys();lt();Y();pt=I.createScope("BypassPanel"),wm={id:"bypassPanel",_getActivePresetId(t){return t.find(".yyt-bypass-editor-content").data("presetId")||null},render(t){let e=fe.getPresetList(),r=fe.getDefaultPresetId();return`
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
    `},_renderPresetItem(t,e){let r=Br&&Br[t.id];return`
      <div class="yyt-bypass-preset-item ${e?"yyt-default":""}" data-preset-id="${t.id}">
        <div class="yyt-bypass-preset-info">
          <span class="yyt-bypass-preset-name">${pe(t.name)}</span>
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
      `;let e=fe.getDefaultPresetId()===t.id,r=Br&&Br[t.id];return`
      <div class="yyt-bypass-editor-content" data-preset-id="${t.id}">
        <div class="yyt-bypass-editor-header">
          <div class="yyt-bypass-editor-title">
            <input type="text" class="yyt-input yyt-bypass-name-input" 
                   value="${pe(t.name)}" placeholder="\u9884\u8BBE\u540D\u79F0">
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
                 value="${pe(t.description||"")}" placeholder="\u9884\u8BBE\u63CF\u8FF0\uFF08\u53EF\u9009\uFF09">
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
                  placeholder="\u8F93\u5165\u6D88\u606F\u5185\u5BB9...">${pe(t.content||"")}</textarea>
      </div>
    `},bindEvents(t,e){let r=se();!r||!$e(t)||(t.off(".yytBypass"),this._bindPresetListEvents(t,r),this._bindEditorEvents(t,r),this._bindFileEvents(t,r),pr(t,{namespace:"yytBypassSelect",selectors:[".yyt-bypass-role-select"]}))},_bindPresetListEvents(t,e){t.on("click.yytBypass",".yyt-bypass-preset-item",r=>{if(e(r.target).closest(".yyt-bypass-quick-delete").length)return;let n=e(r.currentTarget).data("presetId");this._selectPreset(t,e,n)}),t.on("click.yytBypass",".yyt-bypass-quick-delete",async r=>{r.stopPropagation();let n=e(r.currentTarget).data("presetId");if(!n||!await kr("\u5220\u9664\u9884\u8BBE","\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u4E2A\u9884\u8BBE\u5417\uFF1F",{danger:!0}))return;let o=fe.deletePreset(n);o.success?(t.find(".yyt-bypass-editor-content").data("presetId")===n&&t.find(".yyt-bypass-editor").html(`
            <div class="yyt-bypass-empty">
              <i class="fa-solid fa-shield-halved"></i>
              <p>\u9009\u62E9\u6216\u521B\u5EFA Ai \u6307\u4EE4\u9884\u8BBE</p>
            </div>
          `),this._refreshPresetList(t,e),pt.info("\u9884\u8BBE\u5DF2\u5220\u9664",null,{toast:"success"})):pt.error(o?.message||"\u5220\u9664\u9884\u8BBE\u5931\u8D25",null,{toast:!0})}),t.on("click.yytBypass","#yyt-bypass-add",()=>{this._createNewPreset(t,e)})},_bindEditorEvents(t,e){t.on("click.yytBypass","#yyt-bypass-save",()=>{this._saveCurrentPreset(t,e)}),t.on("click.yytBypass","#yyt-bypass-delete",()=>{this._deleteCurrentPreset(t,e)}),t.on("click.yytBypass","#yyt-bypass-duplicate",()=>{this._duplicateCurrentPreset(t,e)}),t.on("click.yytBypass","#yyt-bypass-set-default",()=>{this._setAsDefault(t,e)}),t.on("click.yytBypass","#yyt-bypass-add-message",()=>{this._addMessage(t,e)}),t.on("click.yytBypass",".yyt-bypass-move-up",r=>{let n=e(r.currentTarget).closest(".yyt-bypass-message"),s=n.prev(".yyt-bypass-message");s.length&&(s.before(n),this._refreshMessageIndices(t,e))}),t.on("click.yytBypass",".yyt-bypass-move-down",r=>{let n=e(r.currentTarget).closest(".yyt-bypass-message"),s=n.next(".yyt-bypass-message");s.length&&(s.after(n),this._refreshMessageIndices(t,e))}),t.on("click.yytBypass",".yyt-bypass-insert-message",r=>{let n=e(r.currentTarget).closest(".yyt-bypass-message");this._insertMessageAfter(t,e,n)}),t.on("click.yytBypass",".yyt-bypass-delete-message",r=>{e(r.currentTarget).closest(".yyt-bypass-message").remove(),this._refreshMessageIndices(t,e)}),t.on("change.yytBypass",".yyt-bypass-message-enabled",r=>{e(r.currentTarget).closest(".yyt-bypass-message").toggleClass("yyt-disabled",!e(r.currentTarget).is(":checked"))})},_bindFileEvents(t,e){t.on("click.yytBypass","#yyt-bypass-import",()=>{t.find("#yyt-bypass-import-file").click()}),t.on("change.yytBypass","#yyt-bypass-import-file",async r=>{let n=r.target.files[0];if(n){try{let s=await So(n),o=fe.importPresets(s);o.success?pt.info(o.message,null,{toast:"success"}):pt.error(o.message,null,{toast:!0}),o.success&&this.renderTo(t)}catch(s){pt.error(`\u5BFC\u5165\u5931\u8D25: ${s.message}`,null,{toast:!0})}e(r.target).val("")}}),t.on("click.yytBypass","#yyt-bypass-export",()=>{try{let r=fe.exportPresets();vo(r,`bypass_presets_${Date.now()}.json`),pt.info("\u9884\u8BBE\u5DF2\u5BFC\u51FA",null,{toast:"success"})}catch(r){pt.error(`\u5BFC\u51FA\u5931\u8D25: ${r.message}`,null,{toast:!0})}})},_selectPreset(t,e,r){let n=fe.getPreset(r);n&&(t.find(".yyt-bypass-preset-item").removeClass("yyt-active"),t.find(`.yyt-bypass-preset-item[data-preset-id="${r}"]`).addClass("yyt-active"),t.find(".yyt-bypass-editor").html(this._renderEditor(n)),pr(t,{namespace:"yytBypassSelect",selectors:[".yyt-bypass-role-select"]}))},_createNewPreset(t,e){let r=`bypass_${Date.now()}`,n=fe.createPreset({id:r,name:"\u65B0 Ai \u6307\u4EE4\u9884\u8BBE",description:"",messages:[]});n.success?(this.renderTo(t),this._selectPreset(t,e,r),pt.info("\u9884\u8BBE\u5DF2\u521B\u5EFA",null,{toast:"success"})):pt.error(n?.message||"\u521B\u5EFA\u9884\u8BBE\u5931\u8D25",null,{toast:!0})},_saveCurrentPreset(t,e){let r=t.find(".yyt-bypass-editor-content"),n=r.data("presetId");if(!n)return;let s=r.find(".yyt-bypass-name-input").val().trim(),o=r.find(".yyt-bypass-description-input").val().trim();if(!s){pt.warn("\u8BF7\u8F93\u5165\u9884\u8BBE\u540D\u79F0",null,{toast:!0}),r.find(".yyt-bypass-name-input").trigger("focus").trigger("select");return}let a=[];r.find(".yyt-bypass-message").each(function(){let l=e(this);a.push({id:l.data("messageId"),role:l.find(".yyt-bypass-role-select").val(),content:l.find(".yyt-bypass-message-content").val(),enabled:l.find(".yyt-bypass-message-enabled").is(":checked"),deletable:String(l.data("deletable"))!=="false"})});let i=fe.updatePreset(n,{name:s,description:o,messages:a});i.success?(pt.info("\u9884\u8BBE\u5DF2\u4FDD\u5B58",null,{toast:"success"}),this._refreshPresetList(t,e)):pt.error(i?.message||"\u4FDD\u5B58\u9884\u8BBE\u5931\u8D25",null,{toast:!0})},async _deleteCurrentPreset(t,e){let n=t.find(".yyt-bypass-editor-content").data("presetId");if(!n||!await kr("\u5220\u9664\u9884\u8BBE","\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u4E2A\u9884\u8BBE\u5417\uFF1F",{danger:!0}))return;let o=fe.deletePreset(n);o.success?(this.renderTo(t),pt.info("\u9884\u8BBE\u5DF2\u5220\u9664",null,{toast:"success"})):pt.error(o?.message||"\u5220\u9664\u9884\u8BBE\u5931\u8D25",null,{toast:!0})},_duplicateCurrentPreset(t,e){let n=t.find(".yyt-bypass-editor-content").data("presetId");if(!n)return;let s=`bypass_${Date.now()}`,o=fe.duplicatePreset(n,s);o.success?(this.renderTo(t),this._selectPreset(t,e,s),pt.info("\u9884\u8BBE\u5DF2\u590D\u5236",null,{toast:"success"})):pt.error(o?.message||"\u590D\u5236\u9884\u8BBE\u5931\u8D25",null,{toast:!0})},_setAsDefault(t,e){let n=t.find(".yyt-bypass-editor-content").data("presetId");if(!n)return;fe.setDefaultPresetId(n),this._refreshPresetList(t,e);let s=fe.getPreset(n);s&&t.find(".yyt-bypass-editor").html(this._renderEditor(s)),pt.info("\u5DF2\u8BBE\u4E3A\u9ED8\u8BA4\u9884\u8BBE",null,{toast:"success"})},_addMessage(t,e){let r=t.find(".yyt-bypass-messages"),n={id:`msg_${Date.now()}`,role:"SYSTEM",content:"",enabled:!0,deletable:!0},s=r.find(".yyt-bypass-message").length;r.append(this._renderMessageItem(n,s))},_insertMessageAfter(t,e,r){let n=t.find(".yyt-bypass-messages"),s={id:`msg_${Date.now()}`,role:"SYSTEM",content:"",enabled:!0,deletable:!0},o=this._renderMessageItem(s,0),a=e(o);r.after(a),this._refreshMessageIndices(t,e)},_refreshMessageIndices(t,e){t.find(".yyt-bypass-message").each(function(r){e(this).attr("data-message-index",r)})},_refreshPresetList(t,e){let r=fe.getPresetList(),n=fe.getDefaultPresetId(),s=this._getActivePresetId(t);t.find(".yyt-bypass-preset-list").html(r.map(o=>this._renderPresetItem(o,o.id===n)).join("")),s&&t.find(`.yyt-bypass-preset-item[data-preset-id="${s}"]`).addClass("yyt-active")},destroy(t){!se()||!$e(t)||(Lt(t,"yytBypassSelect"),t.off(".yytBypass"))},getStyles(){return`
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
    `},renderTo(t){let e=this.render({});t.html(e),this.bindEvents(t,{})}},TT=wm});var $d={};ue($d,{SettingsPanel:()=>ca,applyTheme:()=>Cm,applyUiPreferences:()=>Pd,default:()=>RT});function Em(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window}function da(){return Em()?.document||document}function Am(t=da()){return t?.documentElement||document.documentElement}function Cm(t,e=da()){let r=Am(e),n={..._T,...Tm[t]||Tm["dark-blue"]};Object.entries(n).forEach(([s,o])=>{r.style.setProperty(s,o)}),r.setAttribute("data-yyt-theme",t)}function Pd(t={},e=da()){let r=Am(e),{theme:n="dark-blue",compactMode:s=!1,animationEnabled:o=!0}=t||{};Cm(n,e),r.classList.toggle("yyt-compact-mode",!!s),r.classList.toggle("yyt-no-animation",!o)}function ET(){let t=new Map;return{add(e){return e?._id&&t.set(e._id,e),e},getControl(e){return t.get(e)||null},destroy(){for(let e of t.values())try{e.destroy?.()}catch{}t.clear()}}}function Nd(t){return f("i",{className:`fa-solid ${t}`})}function AT(t,e,r,n){let s=f("div",{className:"yyt-settings-hero"}),o=f("div",{className:"yyt-settings-hero-row1"});o.appendChild(f("div",{className:"yyt-settings-hero-icon"},[Nd("fa-sliders")])),o.appendChild(f("div",{className:"yyt-settings-hero-name",text:"\u5168\u5C40\u8BBE\u7F6E"}));let a=f("div",{className:"yyt-settings-hero-actions"});a.appendChild(X({label:"\u91CD\u7F6E\u4E3A\u9ED8\u8BA4",size:"small",icon:"\u21A9",onClick:r}).el),a.appendChild(X({label:"\u4FDD\u5B58\u8BBE\u7F6E",size:"small",variant:"primary",icon:"\u2713",onClick:n}).el),o.appendChild(a),s.appendChild(o),s.appendChild(f("div",{className:"yyt-settings-hero-desc",text:"\u7BA1\u7406\u6267\u884C\u5668\u3001\u81EA\u52A8\u5316\u3001\u8C03\u8BD5\u4E0E\u5916\u89C2\u504F\u597D\u3002"}));let i=t.ui||{},l=t.debug||{},d={"dark-blue":"\u6DF1\u84DD","dark-purple":"\u6DF1\u7D2B","dark-green":"\u6DF1\u7EFF",light:"\u6D45\u8272"}[i.theme]||"\u9ED8\u8BA4",c=f("div",{className:"yyt-settings-hero-chips"});return c.appendChild(f("span",{className:"yyt-settings-chip mode",text:`\u4E3B\u9898 ${d}`})),c.appendChild(f("span",{className:"yyt-settings-chip preset",text:`\u65E5\u5FD7 ${l.enableDebugLog?"DEBUG":"INFO"}`})),c.appendChild(f("span",{className:"yyt-settings-chip",text:`\u52A8\u753B ${i.animationEnabled===!1?"\u5173\u95ED":"\u5F00\u542F"}`})),c.appendChild(f("span",{className:"yyt-settings-chip",text:`\u7D27\u51D1 ${i.compactMode?"\u5F00":"\u5173"}`})),s.appendChild(c),s}function xn({icon:t,title:e,action:r=null},n=[]){let s=f("div",{className:"yyt-settings-section"}),o=f("div",{className:"yyt-settings-section-heading"});if(t){let a=f("span",{className:"yyt-settings-section-icon"});a.appendChild(Nd(t)),o.appendChild(a)}if(o.appendChild(f("span",{text:e})),r){let a=f("span",{className:"yyt-settings-section-action"});a.appendChild(r),o.appendChild(a)}s.appendChild(o);for(let a of n)a&&s.appendChild(a?.el?a.el:a);return s}function qi({label:t,hint:e,control:r}){let n=f("div",{className:"yyt-settings-row"}),s=f("div",{className:"yyt-settings-row-label"});return s.appendChild(f("span",{className:"yyt-settings-row-label-text",text:t})),e&&s.appendChild(f("span",{className:"yyt-settings-row-label-hint",text:e})),n.appendChild(s),n.appendChild(r?.el?r.el:r),n}function _m({label:t,hint:e,leftLabel:r,leftControl:n,rightLabel:s,rightControl:o}){let a=f("div",{className:"yyt-settings-row-double"}),i=f("div",{className:"yyt-settings-row-label"});i.appendChild(f("span",{className:"yyt-settings-row-label-text",text:t})),e&&i.appendChild(f("span",{className:"yyt-settings-row-label-hint",text:e})),a.appendChild(i);let l=f("div",{className:"yyt-settings-row-double-cell"});r&&l.appendChild(f("span",{className:"yyt-settings-row-double-cell-label",text:r})),l.appendChild(n?.el?n.el:n),a.appendChild(l);let d=f("div",{className:"yyt-settings-row-double-cell"});return s&&d.appendChild(f("span",{className:"yyt-settings-row-double-cell-label",text:s})),d.appendChild(o?.el?o.el:o),a.appendChild(d),a}function la({title:t,desc:e,control:r}){let n=f("div",{className:"yyt-settings-toggle-row"}),s=f("div",{className:"yyt-settings-toggle-info"});return s.appendChild(f("div",{className:"yyt-settings-toggle-title",text:t})),e&&s.appendChild(f("div",{className:"yyt-settings-toggle-desc",text:e})),n.appendChild(s),n.appendChild(r?.el?r.el:r),n}function Yi(t){return f("div",{className:"yyt-settings-hint-note",html:t})}function CT(t){let e=t?.hostBinding||{},r=f("div",{className:"yyt-settings-stat-row"}),n=(s,o,a="")=>{let i=f("div",{className:"yyt-settings-stat"});return i.appendChild(f("span",{className:"yyt-settings-stat-label",text:s})),i.appendChild(f("span",{className:`yyt-settings-stat-value ${a}`.trim(),text:o})),i};return r.appendChild(n("\u670D\u52A1",t?.enabled?"\u8FD0\u884C\u4E2D":"\u672A\u542F\u7528",t?.enabled?"success":"error")),r.appendChild(n("\u76D1\u542C",e.initialized?"\u5DF2\u7ED1\u5B9A":"\u672A\u7ED1\u5B9A",e.initialized?"success":"error")),r.appendChild(n("\u5F85\u5904\u7406",String(t?.pendingTimerCount||0),t?.pendingTimerCount?"":"muted")),r.appendChild(n("\u6392\u961F\u69FD\u4F4D",String(t?.queuedSlotCount||0),t?.queuedSlotCount?"":"muted")),r}function kT(t){if(!t.length)return f("div",{className:"yyt-settings-hint-note",text:"\u6682\u65E0\u81EA\u52A8\u5316\u4E8B\u52A1\u8BB0\u5F55\u3002"});let e=f("div",{className:"yyt-runtime-list"});for(let r of t.slice(0,5)){let n=f("div",{className:"yyt-runtime-list-row"});n.appendChild(f("span",{className:"yyt-runtime-event",text:r?.sourceEvent||"UNKNOWN_EVENT"}));let s=r?.phase||"unknown",o="";s==="completed"||r?.verdict==="success"?o="success":(s==="failed"||r?.error)&&(o="error"),n.appendChild(f("span",{className:`yyt-runtime-phase ${o}`.trim(),text:s}));let a=[r?.messageId||"no_message_id",r?.verdict||r?.error||r?.generationKey||""].filter(Boolean).join(" \xB7 ");n.appendChild(f("span",{className:"yyt-runtime-main",text:a||"\u65E0\u989D\u5916\u4FE1\u606F"})),e.appendChild(n)}return e}function IT(){let t=Qt.getAvailableVariables(),e=f("div",{className:"yyt-macro-list"});for(let r of t){let n=f("div",{className:"yyt-macro-row"});n.appendChild(f("code",{text:r.name})),n.appendChild(f("span",{text:r.description})),e.appendChild(n)}return e}function ro(t,e,r,{min:n,max:s,step:o}={}){let a={};return n!=null&&(a.min=String(n)),s!=null&&(a.max=String(s)),o!=null&&(a.step=String(o)),t.add(me({id:e,type:"number",value:String(r),attrs:a}))}var Md,_T,Tm,ca,RT,Od=O(()=>{Vs();Y();Di();lt();nr();Md=I.createScope("SettingsPanel"),_T={"--yyt-accent":"#7bb7ff","--yyt-accent-glow":"rgba(123, 183, 255, 0.4)","--yyt-accent-soft":"rgba(123, 183, 255, 0.15)","--yyt-accent-strong":"#a5d4ff","--yyt-on-accent":"#0a0d13","--yyt-bg-base":"#0a0d13","--yyt-surface":"#0f1219","--yyt-surface-2":"#151a24","--yyt-surface-3":"#1c2231","--yyt-surface-hover":"#1c2231","--yyt-surface-active":"#232b3e","--yyt-border":"rgba(255, 255, 255, 0.06)","--yyt-border-soft":"rgba(255, 255, 255, 0.04)","--yyt-border-strong":"rgba(255, 255, 255, 0.12)","--yyt-text":"rgba(255, 255, 255, 0.92)","--yyt-text-secondary":"rgba(255, 255, 255, 0.55)","--yyt-text-muted":"rgba(255, 255, 255, 0.35)","--yyt-focus-ring":"0 0 0 2px rgba(123, 183, 255, 1), 0 0 0 4px rgba(123, 183, 255, 0.15)","--yyt-control-bg":"#0f1219","--yyt-control-bg-hover":"#151a24","--yyt-control-bg-active":"#1c2231","--yyt-control-bg-strong":"#151a24","--yyt-control-bg-focus":"#151a24","--yyt-control-border":"rgba(255, 255, 255, 0.08)","--yyt-control-border-hover":"rgba(255, 255, 255, 0.14)","--yyt-control-border-focus":"rgba(123, 183, 255, 0.5)","--yyt-control-shadow":"none","--yyt-control-shadow-hover":"none","--yyt-control-shadow-focus":"none","--yyt-control-shadow-active":"none","--yyt-select-surface":"#151a24","--yyt-select-option-bg":"#1c2231","--yyt-select-option-hover-bg":"#232b3e","--yyt-select-option-selected-bg":"#2a3450","--yyt-select-option-border":"rgba(123, 183, 255, 0.15)","--yyt-select-option-selected-border":"rgba(123, 183, 255, 0.3)","--yyt-select-dropdown-shadow":"0 8px 24px rgba(0, 0, 0, 0.4)","--yyt-select-arrow-color":"rgba(255, 255, 255, 0.4)"},Tm={"dark-blue":{"--yyt-on-accent":"#0a0d13"},"dark-purple":{"--yyt-accent":"#a78bfa","--yyt-accent-glow":"rgba(167, 139, 250, 0.4)","--yyt-accent-soft":"rgba(167, 139, 250, 0.15)","--yyt-accent-strong":"#c4b5fd","--yyt-bg-base":"#0d0a14","--yyt-surface":"#12101c","--yyt-surface-2":"#1a1726","--yyt-surface-3":"#221e32","--yyt-surface-hover":"#221e32","--yyt-surface-active":"#2a2540","--yyt-on-accent":"#0d0a14","--yyt-control-bg":"#12101c","--yyt-control-bg-hover":"#1a1726","--yyt-control-bg-active":"#221e32","--yyt-control-bg-strong":"#1a1726","--yyt-control-bg-focus":"#1a1726","--yyt-control-border-focus":"rgba(167, 139, 250, 0.5)","--yyt-select-surface":"#1a1726","--yyt-select-option-bg":"#221e32","--yyt-select-option-hover-bg":"#2a2540","--yyt-select-option-selected-bg":"#332d50","--yyt-select-option-border":"rgba(167, 139, 250, 0.15)","--yyt-select-option-selected-border":"rgba(167, 139, 250, 0.3)","--yyt-focus-ring":"0 0 0 2px rgba(167, 139, 250, 1), 0 0 0 4px rgba(167, 139, 250, 0.15)"},"dark-green":{"--yyt-accent":"#4ade80","--yyt-accent-glow":"rgba(74, 222, 128, 0.4)","--yyt-accent-soft":"rgba(74, 222, 128, 0.15)","--yyt-accent-strong":"#86efac","--yyt-bg-base":"#0a120d","--yyt-surface":"#0f1912","--yyt-surface-2":"#151f1a","--yyt-surface-3":"#1c2824","--yyt-surface-hover":"#1c2824","--yyt-surface-active":"#233530","--yyt-on-accent":"#0a120d","--yyt-control-bg":"#0f1912","--yyt-control-bg-hover":"#151f1a","--yyt-control-bg-active":"#1c2824","--yyt-control-bg-strong":"#151f1a","--yyt-control-bg-focus":"#151f1a","--yyt-control-border-focus":"rgba(74, 222, 128, 0.5)","--yyt-select-surface":"#151f1a","--yyt-select-option-bg":"#1c2824","--yyt-select-option-hover-bg":"#233530","--yyt-select-option-selected-bg":"#2a4038","--yyt-select-option-border":"rgba(74, 222, 128, 0.15)","--yyt-select-option-selected-border":"rgba(74, 222, 128, 0.3)","--yyt-focus-ring":"0 0 0 2px rgba(74, 222, 128, 1), 0 0 0 4px rgba(74, 222, 128, 0.15)"},light:{"--yyt-accent":"#3b82f6","--yyt-accent-glow":"rgba(59, 130, 246, 0.3)","--yyt-accent-soft":"rgba(59, 130, 246, 0.1)","--yyt-accent-strong":"#93c5fd","--yyt-bg-base":"#f5f7fa","--yyt-surface":"#edf0f5","--yyt-surface-2":"#e4e8ef","--yyt-surface-3":"#dbe0e9","--yyt-surface-hover":"#dbe0e9","--yyt-surface-active":"#d1d7e2","--yyt-text":"rgba(15, 23, 42, 0.92)","--yyt-text-secondary":"rgba(15, 23, 42, 0.55)","--yyt-text-muted":"rgba(15, 23, 42, 0.35)","--yyt-border":"rgba(15, 23, 42, 0.08)","--yyt-border-soft":"rgba(15, 23, 42, 0.04)","--yyt-border-strong":"rgba(15, 23, 42, 0.14)","--yyt-focus-ring":"0 0 0 2px rgba(59, 130, 246, 1), 0 0 0 4px rgba(59, 130, 246, 0.12)","--yyt-on-accent":"#ffffff","--yyt-control-bg":"#edf0f5","--yyt-control-bg-hover":"#e4e8ef","--yyt-control-bg-active":"#dbe0e9","--yyt-control-bg-strong":"#e4e8ef","--yyt-control-bg-focus":"#e4e8ef","--yyt-control-border":"rgba(15, 23, 42, 0.1)","--yyt-control-border-hover":"rgba(15, 23, 42, 0.18)","--yyt-control-border-focus":"rgba(59, 130, 246, 0.5)","--yyt-control-shadow":"none","--yyt-control-shadow-hover":"none","--yyt-control-shadow-focus":"none","--yyt-control-shadow-active":"none","--yyt-select-surface":"#e4e8ef","--yyt-select-option-bg":"#edf0f5","--yyt-select-option-hover-bg":"#dbe0e9","--yyt-select-option-selected-bg":"#dbeafe","--yyt-select-option-border":"rgba(59, 130, 246, 0.12)","--yyt-select-option-selected-border":"rgba(59, 130, 246, 0.3)","--yyt-select-dropdown-shadow":"0 8px 24px rgba(15, 23, 42, 0.1)","--yyt-select-arrow-color":"rgba(15, 23, 42, 0.4)"}};ca={id:"settingsPanel",_instance:null,_getAutomationRuntime(){try{return Em()?.YouYouToolkit?.getAutomationRuntime?.()||null}catch{return null}},renderTo(t){if(!se()||!t?.length)return;let r=xt.getSettings(),n=r.executor||{},s=r.automation||{},o=r.debug||{},a=r.ui||{},i=this._getAutomationRuntime(),l=Array.isArray(i?.recentTransactions)?i.recentTransactions.slice().reverse():[],d=i?.hostBinding||{},c=ET(),u=async()=>{await kr("\u91CD\u7F6E\u8BBE\u7F6E","\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u8BBE\u7F6E\u4E3A\u9ED8\u8BA4\u503C\u5417\uFF1F",{danger:!0})&&(xt.resetSettings(),Pd(na.ui,da()),ca.renderTo(t),Md.info("\u8BBE\u7F6E\u5DF2\u91CD\u7F6E",null,{toast:"success"}))},y=()=>{ca._saveFromControls(c,t)},p=f("div",{className:"yyt-settings-panel"});p.appendChild(AT(r,i,u,y));let g=new Map,m=f("div",{className:"yyt-settings-tabs"}),h=[{id:"executor",label:"\u6267\u884C\u5668",icon:"fa-microchip"},{id:"debug",label:"\u8C03\u8BD5",icon:"fa-bug"},{id:"ui",label:"\u5916\u89C2",icon:"fa-palette"}],b=new Map,w=E=>{for(let[P,U]of b)U.classList.toggle("yyt-active",P===E);for(let[P,U]of g)U.classList.toggle("yyt-active",P===E)};for(let E of h){let P=f("button",{className:"yyt-settings-tab"+(E.id==="executor"?" yyt-active":""),attrs:{type:"button"}});P.appendChild(Nd(E.icon)),P.appendChild(f("span",{text:E.label})),P.addEventListener("click",()=>w(E.id)),m.appendChild(P),b.set(E.id,P)}p.appendChild(m);let S=f("div",{className:"yyt-settings-scroll"}),_=f("div",{className:"yyt-settings-body"});S.appendChild(_);let k=f("div",{className:"yyt-settings-tab-pane yyt-active"});k.appendChild(xn({icon:"fa-gauge-high",title:"\u6267\u884C\u9650\u5236"},[qi({label:"\u6700\u5927\u5E76\u53D1\u6570",hint:"\u540C\u65F6\u6267\u884C\u7684\u5DE5\u5177\u6570\u91CF\u4E0A\u9650\uFF081 ~ 10\uFF09",control:ro(c,"maxConcurrent",n.maxConcurrent??3,{min:1,max:10})}),qi({label:"\u961F\u5217\u5904\u7406\u65B9\u5F0F",hint:"\u51B3\u5B9A\u5F85\u6267\u884C\u5DE5\u5177\u7684\u6392\u961F\u987A\u5E8F",control:c.add(Ee({id:"queueStrategy",options:[{value:"fifo",label:"FIFO (\u5148\u8FDB\u5148\u51FA)"},{value:"lifo",label:"LIFO (\u540E\u8FDB\u5148\u51FA)"},{value:"priority",label:"\u4F18\u5148\u7EA7\u6392\u5E8F"}],value:n.queueStrategy||"fifo"}))})])),k.appendChild(xn({icon:"fa-rotate-right",title:"\u91CD\u8BD5\u4E0E\u8D85\u65F6"},[_m({label:"\u91CD\u8BD5\u7B56\u7565",hint:"\u5931\u8D25\u540E\u81EA\u52A8\u91CD\u8BD5\u7684\u6B21\u6570\u4E0E\u95F4\u9694",leftLabel:"\u6B21\u6570",leftControl:ro(c,"maxRetries",n.maxRetries??2,{min:0,max:10}),rightLabel:"\u95F4\u9694 ms",rightControl:ro(c,"retryDelayMs",n.retryDelayMs??5e3,{min:1e3,max:6e4,step:1e3})}),qi({label:"\u8BF7\u6C42\u8D85\u65F6\u65F6\u95F4 (ms)",hint:"\u5355\u4E2A\u8BF7\u6C42\u8D85\u8FC7\u8BE5\u65F6\u957F\u5C06\u81EA\u52A8\u4E2D\u65AD",control:ro(c,"requestTimeoutMs",n.requestTimeoutMs??9e4,{min:1e4,max:3e5,step:1e4})})])),k.appendChild(xn({icon:"fa-bolt",title:"\u81EA\u52A8\u89E6\u53D1"},[Yi("\u7531\u5404\u5DE5\u5177\u7684 <code>output_mode</code> \u51B3\u5B9A\u54EA\u4E9B\u5DE5\u5177\u81EA\u52A8\u89E6\u53D1\u3002\u8FD9\u91CC\u53EA\u63A7\u5236\u5168\u5C40\u8282\u6D41\u65F6\u95F4\u3002"),_m({label:"\u8282\u6D41\u53C2\u6570",hint:"\u7B49\u5F85\u7A33\u5B9A\u540E\u89E6\u53D1\uFF0C\u89E6\u53D1\u540E\u518D\u51B7\u5374",leftLabel:"\u7A33\u5B9A ms",leftControl:ro(c,"automationSettleMs",s.settleMs??1200,{min:0,max:1e4,step:100}),rightLabel:"\u51B7\u5374 ms",rightControl:ro(c,"automationCooldownMs",s.cooldownMs??5e3,{min:0,max:6e4,step:100})})]));let v=[CT(i)],C=Array.isArray(d.eventBindings)&&d.eventBindings.length>0?d.eventBindings.join(" / "):"\u6682\u65E0\u4E8B\u4EF6\u7ED1\u5B9A";v.push(Yi(`\u4E8B\u4EF6\u6E90: <code>${d.source||"unavailable"}</code>\uFF1B\u4E8B\u4EF6: <code>${C}</code>`)),d.lastError&&v.push(Yi(`\u6700\u8FD1\u9519\u8BEF: <code>${d.lastError}</code>`)),v.push(kT(l)),k.appendChild(xn({icon:"fa-magnifying-glass-chart",title:"\u81EA\u52A8\u89E6\u53D1\u8BCA\u65AD"},v)),_.appendChild(k),g.set("executor",k);let R=f("div",{className:"yyt-settings-tab-pane"});R.appendChild(xn({icon:"fa-terminal",title:"\u65E5\u5FD7\u4E0E\u5386\u53F2"},[la({title:"\u542F\u7528\u8C03\u8BD5\u65E5\u5FD7",desc:"\u5F00\u542F\u540E Logger \u9762\u677F\u5C06\u8BB0\u5F55 DEBUG \u7EA7\u522B\u65E5\u5FD7\uFF0C\u5173\u95ED\u4EC5\u8BB0\u5F55 INFO \u53CA\u4EE5\u4E0A",control:c.add(Ye({id:"enableDebugLog",checked:o.enableDebugLog}))}),la({title:"\u4FDD\u5B58\u6267\u884C\u5386\u53F2",desc:"\u8BB0\u5F55\u5DE5\u5177\u6267\u884C\u5386\u53F2\uFF0C\u4FBF\u4E8E\u95EE\u9898\u6392\u67E5",control:c.add(Ye({id:"saveExecutionHistory",checked:o.saveExecutionHistory}))})])),R.appendChild(xn({icon:"fa-eye",title:"\u663E\u793A\u8F85\u52A9"},[la({title:"\u663E\u793A\u8FD0\u884C\u72B6\u6001\u5FBD\u7AE0",desc:"\u5728\u5DE5\u5177\u5361\u7247\u4E0A\u663E\u793A\u8FD0\u884C\u72B6\u6001\u6307\u793A\u5668",control:c.add(Ye({id:"showRuntimeBadge",checked:o.showRuntimeBadge}))})])),_.appendChild(R),g.set("debug",R);let L=f("div",{className:"yyt-settings-tab-pane"});L.appendChild(xn({icon:"fa-palette",title:"\u4E3B\u9898\u4E0E\u52A8\u6548"},[qi({label:"\u4E3B\u9898",hint:"\u5207\u6362\u540E\u4FDD\u5B58\u5373\u53EF\u5E94\u7528\u5230\u5168\u5C40\u754C\u9762",control:c.add(Ee({id:"theme",options:[{value:"dark-blue",label:"\u6DF1\u84DD"},{value:"dark-purple",label:"\u6DF1\u7D2B"},{value:"dark-green",label:"\u6DF1\u7EFF"},{value:"light",label:"\u6D45\u8272"}],value:a.theme||"dark-blue"}))}),la({title:"\u7D27\u51D1\u6A21\u5F0F",desc:"\u51CF\u5C11\u5361\u7247\u95F4\u8DDD\uFF0C\u663E\u793A\u66F4\u591A\u5185\u5BB9",control:c.add(Ye({id:"compactMode",checked:a.compactMode}))}),la({title:"\u542F\u7528\u52A8\u753B\u6548\u679C",desc:"\u754C\u9762\u8FC7\u6E21\u548C\u4EA4\u4E92\u52A8\u753B",control:c.add(Ye({id:"animationEnabled",checked:a.animationEnabled}))})])),L.appendChild(xn({icon:"fa-code",title:"\u6A21\u677F\u5B8F\u8BF4\u660E"},[Yi("\u5DE5\u5177\u6A21\u677F\u91CC\u53EF\u76F4\u63A5\u4F7F\u7528\u4E0B\u9762\u8FD9\u4E9B\u5B8F\u3002\u4E16\u754C\u4E66\u5185\u5BB9\u53EA\u6709\u5728\u6A21\u677F\u91CC\u663E\u5F0F\u5199\u5165 <code>{{toolWorldbookContent}}</code> \u65F6\u624D\u4F1A\u6CE8\u5165\u3002"),IT()])),_.appendChild(L),g.set("ui",L),p.appendChild(S),t.empty().append(p),this._instance={root:c,_tabPanels:g};let N=xt.getDebugSettings();I.setLevel(N.enableDebugLog?he.DEBUG:he.INFO)},_saveFromControls(t,e){let r=o=>{let a=t.getControl(o);return a?a.get():null},n=[{id:"maxConcurrent",min:1,max:10,label:"\u6700\u5927\u5E76\u53D1\u6570"},{id:"maxRetries",min:0,max:10,label:"\u6700\u5927\u91CD\u8BD5\u6B21\u6570"},{id:"retryDelayMs",min:1e3,max:6e4,label:"\u91CD\u8BD5\u95F4\u9694"},{id:"requestTimeoutMs",min:1e4,max:3e5,label:"\u8BF7\u6C42\u8D85\u65F6\u65F6\u95F4"},{id:"automationSettleMs",min:0,max:1e4,label:"\u7B49\u5F85\u7A33\u5B9A\u65F6\u95F4"},{id:"automationCooldownMs",min:0,max:6e4,label:"\u81EA\u52A8\u5316\u51B7\u5374\u65F6\u95F4"}];for(let o of n){let a=r(o.id),i=parseInt(a,10);if(isNaN(i)||i<o.min||i>o.max){Md.warn(`${o.label} \u987B\u5728 ${o.min} ~ ${o.max} \u4E4B\u95F4`,null,{toast:!0});let l=t.getControl(o.id);l?.focus&&l.focus(),l?.select&&l.select();return}}let s={executor:{maxConcurrent:parseInt(r("maxConcurrent"),10)||3,maxRetries:parseInt(r("maxRetries"),10)||2,retryDelayMs:parseInt(r("retryDelayMs"),10)||5e3,requestTimeoutMs:parseInt(r("requestTimeoutMs"),10)||9e4,queueStrategy:r("queueStrategy")||"fifo"},automation:{settleMs:parseInt(r("automationSettleMs"),10)||1200,cooldownMs:parseInt(r("automationCooldownMs"),10)||5e3,maxConcurrentSlots:xt.getSettings()?.automation?.maxConcurrentSlots||1},debug:{enableDebugLog:!!r("enableDebugLog"),saveExecutionHistory:!!r("saveExecutionHistory"),showRuntimeBadge:!!r("showRuntimeBadge")},ui:{theme:r("theme")||"dark-blue",compactMode:!!r("compactMode"),animationEnabled:!!r("animationEnabled")}};xt.saveSettings(s),I.setLevel(s.debug.enableDebugLog?he.DEBUG:he.INFO),Pd(s.ui,da()),Md.info("\u8BBE\u7F6E\u5DF2\u4FDD\u5B58",null,{toast:"success"}),ca.renderTo(e)},render(){return""},getStyles(){return""},bindEvents(){},destroy(t){if(this._instance?.root)try{this._instance.root.destroy()}catch{}this._instance=null,se()&&t?.length&&t.empty()}},RT=ca});function MT(t={},e=-1){return[t?.sourceId,t?.messageId,t?.message_id,t?.id,t?.mid,t?.mesid,t?.mes_id,t?.chat_index,t?.index,e].map(r=>Ie(r))}function PT(t=[],e=""){let r=Ie(e);if(!r||!Array.isArray(t))return-1;for(let n=t.length-1;n>=0;n-=1){let s=t[n];if(MT(s,n).includes(r))return n}return-1}function ua(t={},e={}){let r=Ie(t?.sourceMessageId||t?.confirmedAssistantMessageId||t?.messageId);if(!r)return null;let n=$c({resolvedAt:Date.now(),runSource:e.runSource||t?.runSource||dt.MANUAL,traceId:t?.traceId||"",chatId:t?.chatId||"",sourceMessageId:r,sourceSwipeId:t?.sourceSwipeId||t?.effectiveSwipeId||"",effectiveSwipeId:t?.effectiveSwipeId||t?.sourceSwipeId||"swipe:current",slotBindingKey:t?.slotBindingKey||"",slotRevisionKey:t?.slotRevisionKey||"",slotTransactionId:t?.slotTransactionId||"",assistantContentFingerprint:t?.assistantContentFingerprint||"",assistantBaseFingerprint:t?.assistantBaseFingerprint||"",assistantText:t?.lastAiMessage||"",assistantBaseText:t?.assistantBaseText||"",targetMessageIndex:PT(t?.chatMessages||t?.chatHistory||[],r)});return!n.slotBindingKey||!n.slotRevisionKey?null:n}async function pa({runSource:t=dt.MANUAL}={}){let e=await Bn({runSource:t});return ua(e,{runSource:t})}async function NT({messageId:t,swipeId:e="",runSource:r=dt.AUTO}={}){let n=await zn({messageId:t,swipeId:e,runSource:r});return ua(n,{runSource:r})}async function km(t=null,e={}){let r=t||null;if(typeof e.resolveTarget=="function")return await e.resolveTarget(r);let n=Ie(e.runSource||r?.runSource)||dt.MANUAL,s=Ie(e.messageId||r?.sourceMessageId),o=Ie(e.swipeId||r?.sourceSwipeId||r?.effectiveSwipeId);return e.useMessageTarget===!0||n===dt.AUTO?s?NT({messageId:s,swipeId:o,runSource:n}):null:pa({runSource:n})}function Im(t,e){let r=t||null,n=e||null;return!r||!n?{valid:!1,reason:"missing_target_snapshot"}:Ie(r.sourceMessageId)!==Ie(n.sourceMessageId)?{valid:!1,reason:"source_message_changed"}:Ie(r.sourceSwipeId||r.effectiveSwipeId)!==Ie(n.sourceSwipeId||n.effectiveSwipeId)?{valid:!1,reason:"source_swipe_changed"}:Ie(r.slotRevisionKey)!==Ie(n.slotRevisionKey)?{valid:!1,reason:"slot_revision_changed"}:{valid:!0,reason:"ok"}}var ya=O(()=>{Kn();Be()});function zr(t,e=""){return t==null?e:String(t).trim()||e}function $T(t){if(!t||t?.is_user===!0||t?.is_system===!0)return!1;let e=String(t?.role||"").trim().toLowerCase();return e==="assistant"||e==="ai"||!e}function OT(t){return!t||typeof t!="object"||Array.isArray(t)?!1:!!(Array.isArray(t.tables)||typeof t.chatId=="string"&&t.chatId.length>0||typeof t.slotBindingKey=="string"&&t.slotBindingKey.length>0)}function Rm(t,e){if(!t)return null;let r=t[nn];if(!r)return null;let n=Me(e);return OT(r)?n===It?r:null:r[n]||null}function fa({loadMode:t=qn.EMPTY,mergeBaseOnly:e=!1,state:r=null,sourceKind:n=Kt.EMPTY,resolvedFromMessageId:s="",resolvedFromRevisionKey:o=""}={}){let a=vr(r)||null;return{loadMode:t,mergeBaseOnly:e,state:a,sourceKind:n,resolvedFromMessageId:zr(s,a?.sourceMessageId||""),resolvedFromRevisionKey:zr(o,a?.slotRevisionKey||"")}}function Ld(t,e={}){let r=vr(t);return r?vr({...r,meta:{...r.meta||{},...e||{}}}):null}function Mm({runtime:t,targetSnapshot:e,currentMessageIndex:r=-1,templateTables:n=[],isolationKey:s}={}){let o=Array.isArray(t?.chat)?t.chat:[],a=zr(e?.slotRevisionKey,""),i=zr(e?.slotBindingKey,""),l=Me(s===void 0?"":s);if(r>=0&&r<o.length){let d=Rm(o[r],l),c=vr(d);if(c&&zr(c.slotRevisionKey,"")===a)return fa({loadMode:qn.EXACT,mergeBaseOnly:!1,state:Ld(c,{sourceKind:Kt.EXACT,isolationKey:l,resolvedFromMessageId:c.sourceMessageId,resolvedFromRevisionKey:c.slotRevisionKey}),sourceKind:Kt.EXACT,resolvedFromMessageId:c.sourceMessageId,resolvedFromRevisionKey:c.slotRevisionKey});if(c&&zr(c.slotBindingKey,"")===i){let u=Ld({...c,slotRevisionKey:a||c.slotRevisionKey,sourceSwipeId:zr(e?.sourceSwipeId||e?.effectiveSwipeId,c.sourceSwipeId),meta:{...c.meta||{},sourceKind:Kt.BINDING,mergeBaseOnly:!0,fallbackFromBinding:!0,isolationKey:l,fallbackFromRevisionKey:zr(c.slotRevisionKey,""),requestedRevisionKey:a,resolvedFromMessageId:c.sourceMessageId,resolvedFromRevisionKey:c.slotRevisionKey}});return fa({loadMode:qn.BINDING_FALLBACK,mergeBaseOnly:!0,state:u,sourceKind:Kt.BINDING,resolvedFromMessageId:c.sourceMessageId,resolvedFromRevisionKey:c.slotRevisionKey})}}if(r>0)for(let d=r-1;d>=0;d-=1){let c=o[d];if(!$T(c))continue;let u=Rm(c,l),y=vr(u);if(!y||!Array.isArray(y.tables)||y.tables.length===0)continue;let p=Ld({...y,slotBindingKey:i||y.slotBindingKey,slotRevisionKey:a||y.slotRevisionKey,sourceSwipeId:zr(e?.sourceSwipeId||e?.effectiveSwipeId,y.sourceSwipeId),meta:{...y.meta||{},sourceKind:Kt.HISTORY,mergeBaseOnly:!0,reconstructedFromHistory:!0,isolationKey:l,resolvedFromMessageId:y.sourceMessageId,resolvedFromRevisionKey:y.slotRevisionKey}});return fa({loadMode:qn.HISTORY,mergeBaseOnly:!0,state:p,sourceKind:Kt.HISTORY,resolvedFromMessageId:y.sourceMessageId,resolvedFromRevisionKey:y.slotRevisionKey})}return Array.isArray(n)&&n.length>0?fa({loadMode:qn.TEMPLATE,mergeBaseOnly:!1,state:Go(e,{tables:le(n),meta:{fromTemplate:!0,isolationKey:l,sourceKind:Kt.TEMPLATE,resolvedFromMessageId:"",resolvedFromRevisionKey:""}}),sourceKind:Kt.TEMPLATE}):fa({loadMode:qn.EMPTY,mergeBaseOnly:!1,state:Go(e,{meta:{isolationKey:l,sourceKind:Kt.EMPTY,resolvedFromMessageId:"",resolvedFromRevisionKey:""}}),sourceKind:Kt.EMPTY})}var Pm=O(()=>{Be()});function Nm(){return Dd||(Dd=I.createScope("TableStateMirror")),Dd}async function LT(t,e,r){try{await et(),await _i({chatId:t?.chatId,messageId:t?.sourceMessageId,swipeId:t?.sourceSwipeId||t?.effectiveSwipeId,isolationKey:e},Array.isArray(r)?r:[]),Nm().info("slot \u5DF2\u955C\u50CF\u5230 SQL",{chatId:t?.chatId,messageId:t?.sourceMessageId,tableCount:r?.length||0})}catch(n){Nm().warn("SQL \u955C\u50CF\u5931\u8D25\uFF08\u4E0D\u5F71\u54CD\u4E3B\u6D41\u7A0B\uFF09",{error:n?.message||String(n)})}}function $m(t){return t==null?"":String(t).trim()}function DT(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window}function zd(){try{let t=DT(),e=t?.SillyTavern||null,r=e?.getContext?.()||null,n=Array.isArray(r?.chat)?r.chat:[],s=Array.isArray(e?.chat)?e.chat:[],o=n.length?n:s;return{topWindow:t,api:e,context:r,chat:o,contextChat:n,apiChat:s}}catch{return{topWindow:null,api:null,context:null,chat:[],contextChat:[],apiChat:[]}}}function BT(t){if(!t||t?.is_user===!0||t?.is_system===!0)return!1;let e=String(t?.role||"").trim().toLowerCase();return e==="assistant"||e==="ai"||!e}function zT(t=[],e=""){let r=$m(e);if(!Array.isArray(t)||!r)return-1;for(let n=t.length-1;n>=0;n-=1){let s=t[n];if(!BT(s))continue;if([s?.sourceId,s?.message_id,s?.messageId,s?.id,s?.mes_id,s?.mid,s?.mesid,s?.chat_index,s?.index,n].map(a=>$m(a)).includes(r))return n}return-1}function Ji(t){let e=zd(),r=zT(e.chat,t?.sourceMessageId);return r<0?{runtime:e,messageIndex:r,message:null}:{runtime:e,messageIndex:r,message:e.chat[r]||null}}function Xi(t,e,r){let n=s=>{!Array.isArray(s)||e<0||e>=s.length||(s[e]={...s[e]||{},...r})};n(t?.contextChat),n(t?.apiChat)}async function Qi(t){let e=t?.context||null,r=t?.api||null,n=e?.saveChatDebounced||r?.saveChatDebounced||null,s=e?.saveChat||r?.saveChat||null;typeof n=="function"&&n.call(e||r),typeof s=="function"&&await s.call(e||r)}function ma(t){return!t||typeof t!="object"||Array.isArray(t)?!1:!!(Array.isArray(t.tables)||typeof t.chatId=="string"&&t.chatId.length>0||typeof t.slotBindingKey=="string"&&t.slotBindingKey.length>0)}function ns(t){return!t||typeof t!="object"||Array.isArray(t)?!1:"lastResolvedTarget"in t||"lastCommittedTarget"in t}function ga(t,e,r,n){if(!t)return null;let s=t[e];if(!s)return null;let o=Me(r);return typeof n=="function"&&n(s)?o===It?s:null:s[o]||null}function Bd(t,e,r,n,s){if(!t)return;let o=Me(r),a=t[e];if(typeof s=="function"&&s(a)){let i={[It]:a};i[o]=n,t[e]=i}else a&&typeof a=="object"&&!Array.isArray(a)?t[e]={...a,[o]:n}:t[e]={[o]:n}}function Vi(t,e,r,n){if(!t)return!1;let s=Me(r),o=t[e];if(!o)return!1;if(typeof n=="function"&&n(o))return s===It?(delete t[e],!0):!1;if(o&&typeof o=="object"&&!Array.isArray(o)){if(o[s]===void 0)return!1;let a={...o};return delete a[s],Object.keys(a).length===0?delete t[e]:t[e]=a,!0}return!1}function Zi(t,e={}){let{message:r}=Ji(t),n=e.isolationKey===void 0?ae.getKey():e.isolationKey,s=ga(r,nn,n,ma);return vr(s)}function Om(t,e={}){let{runtime:r,messageIndex:n}=Ji(t);return Mm({runtime:r,targetSnapshot:t,currentMessageIndex:n,templateTables:Array.isArray(e.templateTables)?e.templateTables:[],isolationKey:e.isolationKey===void 0?ae.getKey():e.isolationKey})}async function Lm(t,e={}){let{runtime:r,messageIndex:n,message:s}=Ji(t);if(!s||n<0)return{success:!1,error:"target_message_not_found"};let o=e.isolationKey===void 0?ae.getKey():e.isolationKey,a=ga(s,sn,o,ns),i={...ui(a),lastResolvedTarget:Ns(t),updatedAt:Date.now()};return Bd(s,sn,o,i,ns),Xi(r,n,s),await Qi(r),{success:!0,bindings:i}}async function no(t,e,r={}){let n=r.skipFreshValidation===!0?t:await km(t,r),s=r.skipFreshValidation===!0?{valid:!0,reason:"skipped"}:Im(t,n);if(!s.valid)return{success:!1,error:"target_changed_before_commit",validation:s};let o=n||t,{runtime:a,messageIndex:i,message:l}=Ji(o);if(!l||i<0)return{success:!1,error:"target_message_not_found",validation:s};let d=r.isolationKey===void 0?ae.getKey():r.isolationKey,c=Go(o),u={...c.meta||{},...e.meta||{},...r.locks?{locks:r.locks}:{},...r.previousSnapshot?{previousSnapshot:r.previousSnapshot}:{},isolationKey:d},y=vr({...c,...e,meta:u,slotBindingKey:o.slotBindingKey,slotRevisionKey:o.slotRevisionKey,sourceMessageId:o.sourceMessageId,sourceSwipeId:o.sourceSwipeId||o.effectiveSwipeId,updatedAt:Date.now()}),p=ga(l,sn,d,ns),g={...ui(p),lastResolvedTarget:Ns(o),lastCommittedTarget:Ns(o),updatedAt:Date.now()};return Bd(l,nn,d,y,ma),Bd(l,sn,d,g,ns),Xi(a,i,l),await Qi(a),LT(o,d,y?.tables||[]).catch(()=>{}),{success:!0,state:y,bindings:g,validation:s,messageIndex:i,sourceMessageId:o.sourceMessageId,slotRevisionKey:o.slotRevisionKey}}function ss(t=null,e={}){let r=Ft.getAssistantMessageSnapshot(t);if(!r?.message)return null;let n=e.isolationKey===void 0?ae.getKey():e.isolationKey;return{...r,tableState:vr(ga(r.message,nn,n,ma)),tableBindings:ui(ga(r.message,sn,n,ns))}}async function Dm(t,e={}){let r=zd();if(!Array.isArray(r.chat)||t<0||t>=r.chat.length)return{success:!1,error:"invalid_message_index",messageIndex:t};let n=r.chat[t];if(!n)return{success:!1,error:"message_not_found",messageIndex:t};let s=e.isolationKey===void 0?ae.getKey():e.isolationKey,o=Vi(n,nn,s,ma),a=e.clearBindings===!1?!1:Vi(n,sn,s,ns);return(o||a)&&(Xi(r,t,n),await Qi(r)),{success:!0,cleared:o||a,messageIndex:t,isolationKey:s}}async function Bm(t={}){let e=zd(),r=Number.isFinite(t.fromMessageIndex)?t.fromMessageIndex:0,n=Number.isFinite(t.toMessageIndex)?t.toMessageIndex:(e.chat?.length||0)-1,s=t.isolationKey===void 0?ae.getKey():t.isolationKey,o=0;for(let a=r;a<=n;a++){let i=e.chat[a];if(!i)continue;let l=Vi(i,nn,s,ma),d=Vi(i,sn,s,ns);(l||d)&&(Xi(e,a,i),o++)}return o>0&&await Qi(e),{success:!0,touched:o,from:r,to:n,isolationKey:s}}var Dd,os=O(()=>{Zn();Be();$r();Pm();ya();Ei();Y()});function Km(t){let e=new Set;if(!Array.isArray(t))return e;for(let r of t){let n=r?.order;Number.isFinite(n)&&e.add(Math.floor(n))}return e}function ha(t,e=5e4,r=1,n=99999){for(let s=e;s<=n;s++)if(!t.has(s))return t.add(s),s;for(let s=r;s<e;s++)if(!t.has(s))return t.add(s),s;return zm.warn("\u65E0\u53EF\u7528 order \u69FD\u4F4D"),t.add(e),e}function jm(t,e,r=5e4,n=1,s=99999){let o=s-e+1;for(let a=r;a<=o;a++){let i=!0;for(let l=0;l<e;l++)if(t.has(a+l)){i=!1;break}if(i){for(let l=0;l<e;l++)t.add(a+l);return a}}for(let a=n;a<r&&a<=o;a++){let i=!0;for(let l=0;l<e;l++)if(t.has(a+l)){i=!1;break}if(i){for(let l=0;l<e;l++)t.add(a+l);return a}}zm.warn(`\u65E0\u6CD5\u5206\u914D ${e} \u4E2A\u8FDE\u7EED order \u69FD\u4F4D`);for(let a=0;a<e;a++)t.add(r+a);return r}var zm,Um=O(()=>{Y();zm=I.createScope("TableWBOrder")});function el(t,e="before_character_definition"){let r=String(t||"").trim().toLowerCase();return r==="at_depth_as_system"||r==="system"?"at_depth_as_system":r==="before_char"||r==="before_character"||r==="before_character_definition"||r==="0"?"before_character_definition":r==="after_char"||r==="after_character"||r==="after_character_definition"||r==="1"?"after_character_definition":e}function as(t,e){if(!e)return t;let r={...t,position:e.position};return e.position==="at_depth_as_system"?r.depth=e.depth:delete r.depth,r}var pM,yM,Fm=O(()=>{pM=Object.freeze(["at_depth_as_system","before_character_definition","after_character_definition"]);yM=Object.freeze({position:"before_character_definition",depth:2,order:5e4})});function jd(t,e=""){return t==null?e:String(t).trim()||e}function UT(t){return jd(t,"default_chat").replace(/[\[\]=]/g,"_")}function qm(){let t=globalThis.window||globalThis;return jd(t?.TavernHelper?.getCurrentChatId?.()||t?.Silvy?.getCurrentChatId?.()||t?.chat_metadata?.chat_id||t?.this_chid||t?.name1,"default_chat")}function Ud(){try{if(typeof TavernHelper<"u"&&TavernHelper)return TavernHelper}catch{}return Xr()?.TavernHelper||null}function FT(t){return String(t??"").replace(/\|/g,"\uFF5C").replace(/\n/g," ")}function Kd(t){let e=Array.isArray(t.columns)?t.columns:[],r=Array.isArray(t.rows)?t.rows:[];if(r.length===0)return"";let n=e.map(l=>l.key),s=e.map(l=>l.title||l.key),o=`| ${s.join(" | ")} |`,a=`| ${s.map(()=>"---").join(" | ")} |`,i=r.map(l=>{let d=l.cells||{};return`| ${n.map(c=>FT(d[c])).join(" | ")} |`});return`# ${t.name||"\u672A\u547D\u540D\u8868"}

${o}
${a}
${i.join(`
`)}`}function WT(t,e){if(!Array.isArray(t)||t.length===0)return[];let r=new Map;if(Array.isArray(e))for(let n of e){let s=n?.id||n?.key;s&&r.set(s,n)}return t.map(n=>{let s=n?.id?r.get(n.id):null;return{...n,exportConfig:n?.exportConfig||s?.exportConfig||{enabled:!1},enabled:n?.enabled!==!1}})}function tl(t){return`${Gm}${KT}${UT(t)}${jT}-`}function HT(t){return`${Gm}[${jd(t,"default_chat")}]-`}function Fd(t,e){if(!t||typeof t!="string")return!1;let r=tl(e);if(t.startsWith(r))return!0;let n=HT(e);return!!t.startsWith(n)}function Wm(t,e){let r=tl(t),n=String(e||"").trim();return n?`${r}${n}`:`${r}\u586B\u8868\u6570\u636E`}function Hm(t,e,r){return`${tl(t)}Wrapper-${r}`}function GT(t,e){return t?t.content!==e.content||t.enabled!==e.enabled||t.type!==e.type||t.position!==e.position||t.prevent_recursion!==e.prevent_recursion||t.order!==e.order:!0}async function is(t,e,r,n,s,o,a){let i=r.find(l=>l.comment===n);return i&&a&&!Fd(i.comment,a)?(ir.warn(`upsert \u8DF3\u8FC7\uFF1A\u73B0\u6709\u6761\u76EE comment "${n}" \u4E0D\u5C5E\u4E8E\u5F53\u524D chat`,{chatId:a}),{action:"skipped",comment:n,reason:"cross_chat_collision"}):i&&i.uid?GT(i,s)?(await Promise.resolve(t.setLorebookEntries(e,[{uid:i.uid,...s}])),ir.info(`\u4E16\u754C\u4E66\u6761\u76EE\u5DF2\u66F4\u65B0\uFF1A${n}`),{action:"updated",comment:n}):(o.add(i.order||0),{action:"skipped",comment:n}):typeof t.createLorebookEntries=="function"?(await Promise.resolve(t.createLorebookEntries(e,[{comment:n,keys:[],...s}])),ir.info(`\u4E16\u754C\u4E66\u6761\u76EE\u5DF2\u521B\u5EFA\uFF1A${n}`),{action:"created",comment:n}):{action:"failed",comment:n,error:"createLorebookEntries \u4E0D\u53EF\u7528"}}async function Ym(t){let e=t?.worldbookSync,r=e?.injectionMode||"character_card",n=Ud();if(r==="target_book"){let s=String(e?.targetBook||"").trim();return s?{targetBook:s}:{error:"no_target_book"}}if(r==="character_card"){if(n){if(typeof n.getCurrentCharPrimaryLorebook=="function"){let s=await Promise.resolve(n.getCurrentCharPrimaryLorebook());if(s)return{targetBook:String(s)}}if(typeof n.getCharLorebooks=="function"){let s=await Promise.resolve(n.getCharLorebooks());if(s?.primary)return{targetBook:String(s.primary)}}}return{error:"no_character_lorebook"}}if(r==="auto_create"){if(n){if(typeof n.getOrCreateChatWorldbook=="function")try{let s=await Promise.resolve(n.getOrCreateChatWorldbook("current"));if(s)return{targetBook:String(s)}}catch(s){ir.warn("getOrCreateChatWorldbook \u5931\u8D25",s)}if(typeof n.getOrCreateChatLorebook=="function")try{let s=await Promise.resolve(n.getOrCreateChatLorebook());if(s)return{targetBook:String(s)}}catch(s){ir.warn("getOrCreateChatLorebook \u5931\u8D25",s)}}return{error:"chat_worldbook_unavailable"}}return{error:"unknown_injection_mode"}}async function Vm(t,e){if(!e?.worldbookSync?.enabled)return{skipped:!0,reason:"disabled"};let n=await Ym(e);if(n.error)return{skipped:!0,reason:n.error};let s=n.targetBook,o=Ud();if(!o)return{success:!1,error:"TavernHelper \u4E0D\u53EF\u7528"};if(typeof o.getLorebookEntries!="function")return{success:!1,error:"getLorebookEntries \u4E0D\u53EF\u7528"};if(typeof o.setLorebookEntries!="function"&&typeof o.createLorebookEntries!="function")return{success:!1,error:"\u4E16\u754C\u4E66\u5199\u5165 API \u4E0D\u53EF\u7528"};let a=qm(),i=tl(a),l=Array.isArray(e?.tables)?e.tables:[],c=WT(t,l).filter(p=>p&&p.enabled!==!1&&Array.isArray(p.rows)&&p.rows.length>0);if(c.length===0)return{skipped:!0,reason:"empty_tables"};let u=e?.wrapperConfig||{},y=u.enabled!==!1;try{let p=await Promise.resolve(o.getLorebookEntries(s));Array.isArray(p)||(p=[]);let g=Km(p),m=[],h=c.filter(C=>C.exportConfig?.enabled===!0),b=c.filter(C=>C.exportConfig?.enabled!==!0),w="";if(b.length>0&&(w=b.map(C=>Kd(C)).join(`

`)),y&&(w||h.length>0)){let C=u.wrapperTag||"\u6700\u65B0\u6570\u636E\u4E0E\u8BB0\u5F55",R=u.wrapperHint||"",L=u.wrapperPlacement||{},N=L.order||5e4,E=jm(g,3,N,1,99999),P=el(L.position,"before_character_definition"),U=Number.isFinite(L.depth)?L.depth:2,q=`<${C}>
${R}`;m.push(await is(o,s,p,Hm(a,C,"Start"),as({content:q,enabled:!0,type:"constant",order:E,prevent_recursion:!0},{position:P,depth:U}),g,a)),w&&m.push(await is(o,s,p,`${i}\u5168\u5C40\u6570\u636E`,as({content:w,enabled:!0,type:"constant",order:E+1,prevent_recursion:!0},{position:P,depth:U}),g,a)),m.push(await is(o,s,p,Hm(a,C,"End"),as({content:`</${C}>`,enabled:!0,type:"constant",order:E+2,prevent_recursion:!0},{position:P,depth:U}),g,a))}else if(w){let C=ha(g,5e4,1,99999);m.push(await is(o,s,p,`${i}\u5168\u5C40\u6570\u636E`,{content:w,enabled:!0,type:"constant",position:"before_character_definition",order:C,prevent_recursion:!0},g,a))}for(let C of h){let R=C.exportConfig||{},L=R.entryName||C.name||"\u672A\u547D\u540D\u8868",N=R.entryType==="keyword"?"keyword":"constant",E=R.entryPlacement||{},P=el(E.position,"before_character_definition"),U=q=>Array.isArray(q.rows)&&q.rows.length>0&&Array.isArray(q.columns)&&q.columns.length>0?R.injectionTemplate?qT(R.injectionTemplate,q):Kd(q):"";if(R.splitByRow){R.extraIndexPlacement?.position&&R.extraIndexPlacement.position!==E.position&&ir.info(`splitByRow \u6A21\u5F0F\u4E0B extraIndexPlacement \u4E0D\u751F\u6548 [${L}]`);let q=Array.isArray(C.rows)?C.rows:[];for(let te=0;te<q.length;te++){let ie=q[te]?.name||`${L}-\u884C${te+1}`,Q=Wm(a,ie),we={...C,name:ie,rows:[q[te]]},Pe=U(we);if(!Pe)continue;let J=ha(g,E.order||5e4,1,99999);m.push(await is(o,s,p,Q,as({content:Pe,enabled:!0,type:N,order:J,prevent_recursion:R.preventRecursion!==!1},{position:P,depth:E.depth||2}),g,a))}}else{let q=Wm(a,L),te=U(C);if(!te)continue;let ie=ha(g,E.order||5e4,1,99999);m.push(await is(o,s,p,q,as({content:te,enabled:!0,type:N,order:ie,prevent_recursion:R.preventRecursion!==!1},{position:P,depth:E.depth||2}),g,a));let Q=R.extraIndexPlacement;if(Q&&Q.position&&Q.position!==E.position){let we=el(Q.position,"before_character_definition"),Pe=`${q}-extra`,J=ha(g,Q.order||5e4,1,99999);m.push(await is(o,s,p,Pe,as({content:te,enabled:!0,type:N,order:J,prevent_recursion:R.preventRecursion!==!1},{position:we,depth:Q.depth||2}),g,a))}}}let S=new Set(m.map(C=>C.comment).filter(Boolean)),_=p.filter(C=>!C.comment||!Fd(C.comment,a)?!1:!S.has(C.comment));if(_.length>0){let C=_.map(R=>R.uid).filter(Boolean);C.length>0&&typeof o.deleteLorebookEntries=="function"&&(await Promise.resolve(o.deleteLorebookEntries(s,C)),ir.info(`\u5DF2\u6E05\u7406 ${C.length} \u4E2A\u65E7\u4E16\u754C\u4E66\u6761\u76EE [${a}]`))}let k=m.filter(C=>C.action==="created").length,v=m.filter(C=>C.action==="updated").length;return ir.info(`\u4E16\u754C\u4E66\u540C\u6B65\u5B8C\u6210 [${a}]\uFF1A${k} \u521B\u5EFA, ${v} \u66F4\u65B0, ${_.length} \u6E05\u7406`),{success:!0,results:m,stats:{created:k,updated:v,cleaned:_.length},targetBook:s,chatId:a}}catch(p){return ir.warn("\u4E16\u754C\u4E66\u540C\u6B65\u5931\u8D25:",p),{success:!1,error:p?.message||"\u4E16\u754C\u4E66\u540C\u6B65\u5931\u8D25"}}}async function Jm(t){let e=await Ym(t);if(e.error)return{success:!1,error:e.error};let r=e.targetBook,n=Ud();if(!n||typeof n.getLorebookEntries!="function")return{success:!1,error:"TavernHelper \u4E0D\u53EF\u7528"};let s=qm();try{let o=await Promise.resolve(n.getLorebookEntries(r));if(!Array.isArray(o))return{success:!0,cleaned:0};let a=o.filter(l=>l.comment&&Fd(l.comment,s));if(a.length===0)return{success:!0,cleaned:0,targetBook:r};let i=a.map(l=>l.uid).filter(Boolean);return i.length>0&&typeof n.deleteLorebookEntries=="function"&&(await Promise.resolve(n.deleteLorebookEntries(r,i)),ir.info(`\u5DF2\u6E05\u9664 ${i.length} \u4E2A\u4E16\u754C\u4E66\u6761\u76EE [${s}]`)),{success:!0,cleaned:i.length,targetBook:r}}catch(o){return ir.warn("\u6E05\u9664\u4E16\u754C\u4E66\u6761\u76EE\u5931\u8D25:",o),{success:!1,error:o?.message||"\u6E05\u9664\u5931\u8D25"}}}function qT(t,e){let r=t;r=r.replace(/\{\{tableName\}\}/g,e.name||"\u672A\u547D\u540D\u8868"),r.includes("{{tableContent}}")&&(r=r.replace(/\{\{tableContent\}\}/g,Kd(e)));let n=Array.isArray(e.columns)?e.columns:[],o=(Array.isArray(e.rows)?e.rows:[])[0];if(o)for(let a of n){let i=a?.key;if(!i)continue;let l=`{{${i}}}`;if(!r.includes(l))continue;let d=String(o.cells?.[i]??"");r=r.split(l).join(d)}return r}var ir,Gm,KT,jT,Wd=O(()=>{Kn();Y();Um();Fm();ir=I.createScope("TableWorldbookSync"),Gm="YYT-",KT="[YY:chatId=",jT="]"});function rl(t,e=""){return t==null?e:String(t).trim()||e}function VT(t={}){return{tables:Array.isArray(t?.tables)?le(t.tables):[]}}function JT(t={},e={}){let r=rl(e.mirrorTag,"yyt-table-workbench"),n=VT(t);return[`<${r}>`,"[\u586B\u8868\u5DE5\u4F5C\u53F0]","```json",JSON.stringify(n,null,2),"```",`</${r}>`].join(`
`)}async function Xm({targetSnapshot:t,nextTables:e,config:r,loadResult:n=null,diff:s=null,fillMode:o="",skipNotify:a=!1}={}){let i=Xt(r),l=await no(t,{tables:Array.isArray(e)?le(e):[],meta:{lastLoadMode:rl(n?.loadMode,""),lastFillMode:rl(o),mergeBaseOnly:!1,updatedBy:rl(t?.runSource,"MANUAL_TABLE")}});if(!l?.success)return{success:!1,error:l?.error||"table_state_commit_failed",commitResult:l,mirrorResult:null,warning:""};let d=null,c=null,u="";if(i.mirrorToMessage){let y=JT(l.state,{mirrorTag:i.mirrorTag});d=await Ft.injectDetailed(YT,y,{overwrite:!0,extractionSelectors:[i.mirrorTag],sourceMessageId:l.sourceMessageId,sourceSwipeId:t?.sourceSwipeId||t?.effectiveSwipeId,effectiveSwipeId:t?.effectiveSwipeId||t?.sourceSwipeId,slotBindingKey:t?.slotBindingKey,slotRevisionKey:t?.slotRevisionKey,slotTransactionId:t?.slotTransactionId,traceId:t?.traceId,skipNotify:a}),d?.success||(u=d?.error||"\u6B63\u6587\u955C\u50CF\u5199\u56DE\u5931\u8D25")}return i.worldbookSync?.enabled&&(c=await Vm(Array.isArray(e)?e:[],i),c&&!c.success&&!c.skipped&&(u=u?`${u}; ${c.error}`:c.error||"\u4E16\u754C\u4E66\u540C\u6B65\u5931\u8D25")),{success:!0,state:l.state,bindings:l.bindings,diff:s,fillMode:o,commitResult:l,mirrorResult:d,worldbookSyncResult:c,warning:u}}var YT,Qm=O(()=>{Zn();Be();os();Jt();Wd();YT="tableWorkbenchMirror"});function XT(t){return typeof t!="string"||!t?t:t.replace(/[“”「」『』＂]/g,'"')}function Hd(t,e){for(let r=e;r<t.length;r++)if(!/\s/.test(t[r]))return{char:t[r],index:r};return{char:"",index:-1}}function th(t){return!!t&&(t==='"'||t==="{"||t==="["||t==="-"||/\d/.test(t)||t==="t"||t==="f"||t==="n")}function QT(t,e,r,n){let s=Hd(t,e+1),o=s.char;if(!o)return r!=="key";if(r==="key")return o===":";if(o==="}"||o==="]")return!0;if(o!==",")return!1;let a=Hd(t,s.index+1).char;return a?n==="object"?a==='"'||a==="}":n==="array"?a==="]"||th(a):th(a)||a==="}"||a==="]":!0}function ZT(t){if(typeof t!="string")return{success:!1,result:t,error:"not a string"};let e="",r=!1,n=!1,s=null,o=[],a=()=>o.length?o[o.length-1]:null,i=()=>{let l=a();l&&(l.expecting="commaOrEnd")};for(let l=0;l<t.length;l++){let d=t[l];if(n){e+=d,n=!1;continue}if(r){if(d==="\\"){e+=d,n=!0;continue}if(d==='"'){let c=a();QT(t,l,s,c?.type||null)?(e+=d,r=!1,s==="key"&&c?.type==="object"?c.expecting="colon":i(),s=null):e+='\\"';continue}e+=d;continue}if(d==='"'){e+=d,r=!0;let c=a();s=c&&c.type==="object"&&(c.expecting==="key"||c.expecting==="keyOrEnd")?"key":"value";continue}if(d==="{"){e+=d,o.push({type:"object",expecting:"keyOrEnd"});continue}if(d==="["){e+=d,o.push({type:"array",expecting:"valueOrEnd"});continue}if(d===":"){e+=d;let c=a();c?.type==="object"&&(c.expecting="value");continue}if(d===","){e+=d;let c=a();c?.type==="object"&&(c.expecting="key"),c?.type==="array"&&(c.expecting="value");continue}if(d==="}"||d==="]"){e+=d,o.pop(),i();continue}e+=d}return{success:!0,result:e,error:null}}function e_(t){if(typeof t!="string"||!t)return t;let e="",r=!1,n=!1;for(let s=0;s<t.length;s++){let o=t[s];if(n){e+=o,n=!1;continue}if(o==="\\"){e+=o,r&&(n=!0);continue}if(o==='"'){e+=o,r=!r;continue}if(r){if(o===`
`){e+="\\n";continue}if(o==="\r"){e+="\\r";continue}if(o==="	"){e+="\\t";continue}if(o==="\0"){e+="\\u0000";continue}}e+=o}return e}function t_(t){if(typeof t!="string"||!t)return t;let e="",r=!1,n=!1;for(let s=0;s<t.length;s++){let o=t[s];if(n){e+=o,n=!1;continue}if(o==="\\"){e+=o,r&&(n=!0);continue}if(o==='"'){e+=o,r=!r;continue}if(!r&&o===","){let a=Hd(t,s+1).char;if(a==="}"||a==="]")continue}e+=o}return e}function r_(t){return typeof t!="string"||!t?t:t.replace(/([{,]\s*)(-?\d+)(\s*:)/g,'$1"$2"$3')}function ba(t){if(typeof t!="string")return{success:!1,result:t,layersApplied:[],error:"Input is not a string"};let e=[],r=t,n=XT(r);n!==r&&e.push("normalizeQuotes"),r=n;let s=ZT(r);if(!s.success)return{success:!1,result:r,layersApplied:e,error:s.error};s.result!==r&&e.push("escapeUnescapedQuotes"),r=s.result;let o=e_(r);o!==r&&e.push("sanitizeControlChars"),r=o;let a=t_(r);a!==r&&e.push("removeTrailingCommas"),r=a;let i=r_(r);return i!==r&&e.push("fixNumericKeys"),r=i,{success:!0,result:r,layersApplied:e,error:null}}function n_(t,e=","){if(typeof t!="string"||!t)return[];let r=[],n="",s=!1,o=!1,a=0,i=0,l=0;for(let d=0;d<t.length;d++){let c=t[d];if(o){n+=c,o=!1;continue}if(c==="\\"){n+=c,s&&(o=!0);continue}if(c==='"'){n+=c,s=!s;continue}if(!s){if(c==="{")a++;else if(c==="}")a=Math.max(0,a-1);else if(c==="[")i++;else if(c==="]")i=Math.max(0,i-1);else if(c==="(")l++;else if(c===")")l=Math.max(0,l-1);else if(c===e&&a===0&&i===0&&l===0){n.trim()&&r.push(n.trim()),n="";continue}}n+=c}return n.trim()&&r.push(n.trim()),r}function s_(t,e=":"){if(typeof t!="string"||!t)return-1;let r=!1,n=!1,s=0,o=0,a=0;for(let i=0;i<t.length;i++){let l=t[i];if(n){n=!1;continue}if(l==="\\"){r&&(n=!0);continue}if(l==='"'){r=!r;continue}if(!r){if(l==="{")s++;else if(l==="}")s=Math.max(0,s-1);else if(l==="[")o++;else if(l==="]")o=Math.max(0,o-1);else if(l==="(")a++;else if(l===")")a=Math.max(0,a-1);else if(l===e&&s===0&&o===0&&a===0)return i}}return-1}function Gd(t){if(typeof t!="string")return{success:!0,value:t,error:null};let e=t.trim();if(!e)return{success:!1,value:null,error:"Empty value"};let n=`[${e.startsWith("'")&&e.endsWith("'")?`"${e.slice(1,-1).replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\r/g,"\\r").replace(/\n/g,"\\n").replace(/\t/g,"\\t")}"`:e}]`;try{return{success:!0,value:JSON.parse(n)[0],error:null}}catch(s){let o=ba(n);if(o.success)try{return{success:!0,value:JSON.parse(o.result)[0],error:null}}catch{}return{success:!1,value:null,error:s?.message||"Failed to parse loose value"}}}function o_(t){let e=typeof t=="string"?t.trim():"";if(!e)return null;if(/^-?\d+$/.test(e))return e;let r=Gd(e);return r.success&&(typeof r.value=="string"||typeof r.value=="number")?String(r.value):e.replace(/^["']|["']$/g,"")}function rh(t){if(typeof t!="string")return{success:!1,result:null,recoveredKeys:[],error:"not a string"};let e=t.trim();if(!e.startsWith("{")||!e.endsWith("}"))return{success:!1,result:null,recoveredKeys:[],error:"not an object literal"};let r=e.slice(1,-1).trim();if(!r)return{success:!0,result:{},recoveredKeys:[],error:null};let n=n_(r,",").filter(Boolean);if(!n.length)return{success:!1,result:null,recoveredKeys:[],error:"no segments"};let s={},o=0;for(let i of n){let l=s_(i,":");if(l!==-1){let c=o_(i.slice(0,l)),u=Gd(i.slice(l+1));if(!c||!u.success)return{success:!1,result:null,recoveredKeys:Object.keys(s),error:`Failed segment: ${i}`};s[c]=u.value;let y=parseInt(c,10);!isNaN(y)&&String(y)===c&&(o=Math.max(o,y+1));continue}let d=Gd(i);if(!d.success)return{success:!1,result:null,recoveredKeys:Object.keys(s),error:`Failed value: ${i}`};for(;Object.prototype.hasOwnProperty.call(s,String(o));)o++;s[String(o)]=d.value,o++}let a=Object.keys(s).sort((i,l)=>parseInt(i,10)-parseInt(l,10));return a.length?{success:!0,result:s,recoveredKeys:a,error:null}:{success:!1,result:null,recoveredKeys:[],error:"no keys recovered"}}function a_(t){if(typeof t!="string")return"";let e=t.trim();return e=e.replace(/'\s*\+\s*'/g,""),e.startsWith("'")&&e.endsWith("'")&&(e=e.slice(1,-1)),e=e.replace(/\\n/g,`
`),e=e.replace(/\\\\"/g,'\\"'),e=e.replace(/：/g,":"),e}function i_(t){let e=a_(t);if(!e)return[];let r=[];Zm.lastIndex=0;let n;for(;(n=Zm.exec(e))!==null;){let i=n[1];i&&i.trim()&&r.push(i)}if(r.length)return r;let s=i=>/(insertRow|updateRow|deleteRow)\s*\(/.test(i),o=/<!--([\s\S]*?)-->/g,a=[];for(;(n=o.exec(e))!==null;)s(n[1])&&a.push(n[1]);return a}function l_(t){let e=t.split(/\r?\n/),r=[],n="",s=!1;for(let a of e){let i=a.trim();if(!i||(!s&&i.includes("//")&&!i.includes('"//')&&!i.includes("'//")&&(i=i.split("//")[0].trim()),!i))continue;if(/^(insertRow|updateRow|deleteRow)\s*\(/.test(i)&&!s?(n&&r.push(n),n=i):n+=(n?" ":"")+i,n){let d=(n.match(/\{/g)||[]).length,c=(n.match(/\}/g)||[]).length;s=d>c}}n&&r.push(n);let o=[];for(let a of r){let i=/(?:^|;\s*)((?:insertRow|deleteRow|updateRow)\s*\()/g,l=[],d;for(;(d=i.exec(a))!==null;)l.push(d.index+(d[0].length-d[1].length));if(l.length<=1)o.push(a.replace(/;\s*$/,""));else for(let c=0;c<l.length;c++){let u=l[c],y=c+1<l.length?l[c+1]:a.length,p=a.substring(u,y).replace(/;\s*$/,"").trim();p&&o.push(p)}}return o}function c_(t){try{let e=t;if(e.match(/\)\s*;?\s*\/\/.*$/)&&(e=e.replace(/\/\/.*$/,"").trim()),!e)return null;let r=e.match(/^(insertRow|deleteRow|updateRow)\s*\((.*)\);?$/);if(!r)return null;let n=r[1],s=r[2],o=s.indexOf("{");if(o===-1)return{command:n,args:JSON.parse(`[${s}]`),line:e};let a=s.substring(0,o).trim(),i=s.substring(o),l=JSON.parse(`[${a.replace(/,$/,"")}]`);try{return{command:n,args:[...l,JSON.parse(i)],line:e}}catch{}let d=rh(i);if(d.success)return{command:n,args:[...l,d.result],line:e};let c=ba(i);if(!c.success)return null;try{return{command:n,args:[...l,JSON.parse(c.result)],line:e}}catch{}let u=rh(c.result);return u.success?{command:n,args:[...l,u.result],line:e}:null}catch{return null}}function d_(t){if(!t)return null;let{command:e,args:r}=t;if(e==="insertRow"){let n=typeof r[0]=="number"?r[0]:0,s=typeof r[1]=="object"&&r[1]!==null?r[1]:{};return{op:e,tableIndex:n,data:s}}if(e==="deleteRow"){let n=typeof r[0]=="number"?r[0]:0,s=typeof r[1]=="number"?r[1]:0;return{op:e,tableIndex:n,rowIndex:s}}if(e==="updateRow"){let n=typeof r[0]=="number"?r[0]:0,s=typeof r[1]=="number"?r[1]:0,o=typeof r[2]=="object"&&r[2]!==null?r[2]:{};return{op:e,tableIndex:n,rowIndex:s,data:o}}return null}function qd(t){let e=i_(t);if(!e.length)return null;let r=[],n=[];for(let s of e){let o=s.replace(/<!--|-->/g,"").trim();if(!o)continue;let a=l_(o);for(let i of a){let l=c_(i),d=d_(l);d?r.push(d):i&&/^(insertRow|updateRow|deleteRow)/.test(i)&&n.push(i.slice(0,200))}}if(n.length>0)try{console.warn("[TableJsonSanitizer] parseIncrementalEdits: %d \u6761\u6307\u4EE4\u89E3\u6790\u5931\u8D25",n.length,n)}catch{}return r.length?r:null}function Yd(t){eh.lastIndex=0;let e;for(;(e=eh.exec(t))!==null;){let g=e[1].trim();if(g)try{return JSON.parse(g)}catch{let h=ba(g);if(h.success)try{return JSON.parse(h.result)}catch{}}}let r=t.trim();try{return JSON.parse(r)}catch{}let n=ba(r);if(n.success)try{return JSON.parse(n.result)}catch{}let s=r.indexOf("{"),o=r.indexOf("["),a=-1,i="",l="";if(s!==-1&&(o===-1||s<o)?(a=s,i="{",l="}"):o!==-1&&(a=o,i="[",l="]"),a===-1)return null;let d=0,c=-1,u=!1,y=!1;for(let g=a;g<r.length;g++){let m=r[g];if(y){y=!1;continue}if(m==="\\"&&u){y=!0;continue}if(m==='"'){u=!u;continue}if(!u){if(m===i)d++;else if(m===l&&(d--,d===0)){c=g;break}}}if(c===-1)return null;let p=r.substring(a,c+1);try{return JSON.parse(p)}catch{let m=ba(p);if(m.success)try{return JSON.parse(m.result)}catch{}}return null}function nh(t){if(!t||typeof t!="string")return{mode:"empty",edits:null,tables:null};let e=qd(t);if(e)return{mode:"incremental",edits:e,tables:null};let r=Yd(t);if(r){let n=null;if(Array.isArray(r))n=r;else if(r&&Array.isArray(r.tables))n=r.tables;else if(r&&typeof r=="object"){for(let s of Object.values(r))if(Array.isArray(s)){n=s;break}}if(Array.isArray(n))return{mode:"full",edits:null,tables:n}}return{mode:"empty",edits:null,tables:null}}var Zm,eh,nl=O(()=>{Zm=/<tableEdit>([\s\S]*?)<\/tableEdit>/gi,eh=/```(?:json)?\s*([\s\S]*?)```/gi});var u_,p_,sh,oh=O(()=>{nl();u_=/<tableEdit>[\s\S]*?<\/tableEdit>/i,p_=/(insertRow|updateRow|deleteRow)\s*\(/,sh=Object.freeze({formatId:"dsl",displayName:"<tableEdit> DSL \u589E\u91CF\u534F\u8BAE",detect(t){return!t||typeof t!="string"?!1:u_.test(t)||p_.test(t)},parse(t){let e=qd(t);return!Array.isArray(e)||e.length===0?null:{mode:"incremental",edits:e,tables:null}}})});function ih(t){if(typeof t!="string")return t;let e=t.trim();return e.startsWith("'")&&e.endsWith("'")||e.startsWith('"')&&e.endsWith('"')?e.slice(1,-1).replace(/''/g,"'").replace(/\\'/g,"'"):e}function Vd(t){let e=String(t||"").match(/(\d+)$/);return e?parseInt(e[1],10):0}function lh(t){let e=String(t||"").match(/row_id\s*=\s*(\d+)/i);return e?parseInt(e[1],10):-1}function y_(t){let e=t.match(/INSERT\s+INTO\s+(\S+)\s*\(([^)]*)\)\s*VALUES\s*\(([^)]*)\)/i);if(!e)return null;let r=e[1],n=e[2],s=e[3],o=n.split(",").map(l=>l.trim()),a=s.split(",").map(l=>ih(l.trim())),i={};return o.forEach((l,d)=>{l!=="row_id"&&a[d]!==void 0&&(i[l]=a[d])}),{op:"insertRow",tableIndex:Vd(r),data:i}}function f_(t){let e=t.match(/UPDATE\s+(\S+)\s+SET\s+([\s\S]+?)\s+WHERE\s+([\s\S]+?);?$/i);if(!e)return null;let r=e[1],n=e[2],s=e[3],o={},a=n.split(/,(?![^()]*\))/);for(let i of a){let l=i.indexOf("=");if(l<0)continue;let d=i.slice(0,l).trim(),c=ih(i.slice(l+1).trim());d&&d!=="row_id"&&(o[d]=c)}return{op:"updateRow",tableIndex:Vd(r),rowIndex:lh(s),data:o}}function g_(t){let e=t.match(/DELETE\s+FROM\s+(\S+)\s+WHERE\s+([\s\S]+?);?$/i);return e?{op:"deleteRow",tableIndex:Vd(e[1]),rowIndex:lh(e[2])}:null}function m_(t){let e=[];ah.lastIndex=0;let r;for(;(r=ah.exec(t))!==null;){let n=r[0].trim(),s=null;/^INSERT/i.test(n)?s=y_(n):/^UPDATE/i.test(n)?s=f_(n):/^DELETE/i.test(n)&&(s=g_(n)),s&&e.push(s)}return e}var xa,ah,ch,dh=O(()=>{xa=/<sql>([\s\S]*?)<\/sql>/gi,ah=/(INSERT\s+INTO\s+\S+[\s\S]*?;)|(UPDATE\s+\S+\s+SET[\s\S]*?;)|(DELETE\s+FROM\s+\S+[\s\S]*?;)/gi;ch=Object.freeze({formatId:"sql",displayName:"SQL \u534F\u8BAE\uFF08INSERT/UPDATE/DELETE\uFF09",detect(t){return!t||typeof t!="string"?!1:xa.test(t)?(xa.lastIndex=0,!0):(xa.lastIndex=0,/\b(INSERT\s+INTO|UPDATE\s+\S+\s+SET|DELETE\s+FROM)\b/i.test(t))},parse(t){let e="";xa.lastIndex=0;let r,n=[];for(;(r=xa.exec(t))!==null;)n.push(r[1]);n.length>0?e=n.join(`
`):e=t;let s=m_(e);return!Array.isArray(s)||s.length===0?null:{mode:"incremental",edits:s,tables:null}}})});var uh,ph=O(()=>{nl();uh=Object.freeze({formatId:"full-json",displayName:"JSON envelope \u5168\u91CF\u534F\u8BAE",detect(t){return!t||typeof t!="string"?!1:/```json/i.test(t)||/\{[\s\S]*?"tables"\s*:/i.test(t)},parse(t){let e=Yd(t);if(!e)return null;let r=null;if(Array.isArray(e))r=e;else if(e&&Array.isArray(e.tables))r=e.tables;else if(e&&typeof e=="object"){for(let n of Object.values(e))if(Array.isArray(n)){r=n;break}}return!Array.isArray(r)||r.length===0?null:{mode:"full",edits:null,tables:r}}})});function sl(){return Jd||(Jd=I.createScope("AiProtocolAdapter")),Jd}function yh(t){if(!t||typeof t!="string")return null;for(let e of h_){let r=!1;try{r=e.detect(t)}catch(n){sl().warn(`adapter ${e.formatId} detect \u629B\u9519`,n);continue}if(r)try{let n=e.parse(t);if(n&&(n.mode==="incremental"||n.mode==="full")&&(n.mode==="incremental"&&Array.isArray(n.edits)&&n.edits.length>0||n.mode==="full"&&Array.isArray(n.tables)&&n.tables.length>0))return sl().info("AI \u534F\u8BAE\u9002\u914D\u5668\u547D\u4E2D",{formatId:e.formatId,mode:n.mode,editsCount:n.edits?.length,tablesCount:n.tables?.length}),{...n,rawFormat:e.formatId}}catch(n){sl().warn(`adapter ${e.formatId} parse \u629B\u9519\uFF0C\u5C1D\u8BD5\u4E0B\u4E00\u4E2A`,n)}}return sl().warn("parseAiResponseAuto: \u65E0\u9002\u914D\u5668\u547D\u4E2D",{responseLength:t.length}),null}var Jd,h_,fh=O(()=>{Y();oh();dh();ph();h_=Object.freeze([sh,ch,uh])});function b_(t,e){let r=new Map;Array.isArray(t)&&t.forEach((o,a)=>{o&&typeof o=="object"&&r.set(o.name||`__row_${a}`,o)});let n=new Map;Array.isArray(e)&&e.forEach((o,a)=>{o&&typeof o=="object"&&n.set(o.name||`__row_${a}`,o)});let s={};for(let[o,a]of n){let i=r.get(o);if(i){s[o]={};let l=new Set([...Object.keys(i.cells||{}),...Object.keys(a.cells||{})]);for(let d of l){let c=String((i.cells&&i.cells[d])??""),u=String((a.cells&&a.cells[d])??"");s[o][d]=c===u?"unchanged":"updated"}s[o].__rowStatus="kept"}else{if(s[o]={},a.cells&&typeof a.cells=="object")for(let l of Object.keys(a.cells))s[o][l]="new";s[o].__rowStatus="new"}}for(let[o]of r)n.has(o)||(s[o]={__rowStatus:"deleted"});return s}function gh(t,e){let r=Array.isArray(t)?le(t):[],n=Array.isArray(e)?le(e):[],s={},o=Math.max(r.length,n.length);for(let a=0;a<o;a++){let i=r[a],l=n[a];!i&&l?(s[a]={},Array.isArray(l.rows)&&l.rows.forEach(d=>{let c=d.name||`__row_${l.rows.indexOf(d)}`;s[a][c]={__rowStatus:"new"}})):i&&!l?(s[a]={},Array.isArray(i.rows)&&i.rows.forEach(d=>{let c=d.name||`__row_${i.rows.indexOf(d)}`;s[a][c]={__rowStatus:"deleted"}})):i&&l&&(s[a]=b_(i.rows,l.rows))}return s}var mh=O(()=>{Be()});function x_(){return{mode:"native",async buildRequest(t={},e={}){if(typeof t.buildRequest!="function")throw new Error("table_provider_missing_build_request");return t.buildRequest(e)},async sendRequest(t={},e=null,r={}){if(typeof t.sendRequest!="function")throw new Error("table_provider_missing_send_request");return t.sendRequest(e?.messages||[],r.config||{},r.abortSignal||null)},parseResponse(t={},e=""){if(typeof t.parseResponse!="function")throw new Error("table_provider_missing_parse_response");return t.parseResponse(e)}}}function hh(){return x_()}var bh=O(()=>{});function v_(){return Xd||(Xd=I.createScope("TableLock")),Xd}function ls(t){return t!==null&&typeof t=="object"&&!Array.isArray(t)}function vh(){let t=wh.get(xh,{});return ls(t)?t:{}}function S_(t){wh.set(xh,t)}function wa(t){let e=vh();return ls(e[t])?e[t]:{}}function Qd(t,e){let r=vh();r[t]=e,S_(r),T_(t,e).catch(()=>{})}async function T_(t,e){try{let{chatKey:r,isolationKey:n}=(()=>{let o=String(t||"").indexOf("::");return o===-1?{chatKey:String(t||""),isolationKey:""}:{chatKey:t.slice(0,o),isolationKey:t.slice(o+2)}})();if(!r)return;let s=await Promise.resolve().then(()=>(Ei(),id));await s.ensureTableDataReady(),await s.clearScopeLocks({chatId:r,isolationKey:n});for(let[o,a]of Object.entries(e||{})){if(!ls(a))continue;let i={chatId:r,isolationKey:n};if(Array.isArray(a.rows))for(let l of a.rows)Number.isFinite(l)&&await s.setLockEntry(i,o,"row",String(l));if(Array.isArray(a.cols))for(let l of a.cols)typeof l=="string"&&l&&await s.setLockEntry(i,o,"column",l);if(Array.isArray(a.cells))for(let l of a.cells)typeof l=="string"&&l.includes(":")&&await s.setLockEntry(i,o,"cell",l);a.indexColumn===!0&&await s.setLockEntry(i,o,"index_column","")}}catch(r){v_().warn("lock-service SQL \u955C\u50CF\u5931\u8D25\uFF08\u4E0D\u5F71\u54CD\u4E3B\u6D41\u7A0B\uFF09",{error:r?.message||String(r)})}}function va(t){let e=Tf();return ls(t)&&(Array.isArray(t.rows)&&(e.rows=Array.from(new Set(t.rows.filter(r=>Number.isFinite(r)).map(r=>Math.floor(r)))),e.rows.sort((r,n)=>r-n)),Array.isArray(t.cols)&&(e.cols=Array.from(new Set(t.cols.filter(r=>typeof r=="string"&&r.length>0)))),Array.isArray(t.cells)&&(e.cells=Array.from(new Set(t.cells.filter(r=>typeof r=="string"&&r.includes(":"))))),e.indexColumn=t.indexColumn===!0),e}function Sa(t){if(typeof t=="string")return t;if(ls(t)){if(typeof t.scopeKey=="string"&&t.scopeKey.includes("::"))return t.scopeKey;if(t.chatId!==void 0){let e=t.isolationKey!==void 0?t.isolationKey:ae.getKey();return qo(t.chatId,e)}}return qo("",ae.getKey())}function __(t,e){let r=wa(t),n={};if(!Array.isArray(e))return n;for(let s=0;s<e.length;s++){let o=e[s];if(!o)continue;let a=o.uid||o.id||"";a&&r[a]&&(n[s]=va(r[a]))}return n}function so(t,e){let r=Sa(t),n=wa(r);return va(n[e])}function ol(t,e,r,n=!0){if(!e||!Number.isFinite(r))return!1;let s=Sa(t),o=wa(s),a=va(o[e]),i=Math.floor(r),l=a.rows.includes(i);if(n&&!l)a.rows.push(i),a.rows.sort((d,c)=>d-c);else if(!n&&l)a.rows=a.rows.filter(d=>d!==i);else return!1;return o[e]=a,Qd(s,o),!0}function al(t,e,r,n=!0){if(!e||!r)return!1;let s=Sa(t),o=wa(s),a=va(o[e]),i=a.cols.includes(r);if(n&&!i)a.cols.push(r);else if(!n&&i)a.cols=a.cols.filter(l=>l!==r);else return!1;return o[e]=a,Qd(s,o),!0}function il(t,e,r,n,s=!0){if(!e||!n||!Number.isFinite(r))return!1;let o=Sa(t),a=wa(o),i=va(a[e]),l=_f(r,-1)==="-1:-1"?`${r}:${n}`:`${r}:${n}`,d=`${Math.floor(r)}:${n}`,c=i.cells.includes(d);if(s&&!c)i.cells.push(d);else if(!s&&c)i.cells=i.cells.filter(u=>u!==d);else return!1;return a[e]=i,Qd(o,a),!0}function Sh(t,e=[]){let r=Sa(t);return __(r,e)}function Th(t,e,r,n){if(!ls(t))return!1;let s=t[e];if(!s)return!1;if(Number.isFinite(r)&&s.rows.includes(r)||typeof n=="string"&&n.length>0&&s.cols.includes(n))return!0;if(Number.isFinite(r)&&typeof n=="string"&&n.length>0){let o=`${r}:${n}`;if(s.cells.includes(o))return!0}return!1}function Zd(t,e,r){if(!ls(t))return!1;let n=t[e];return n?Number.isFinite(r)&&n.rows.includes(r):!1}var w_,xh,Xd,wh,ll=O(()=>{We();Y();Be();$r();w_="tableLocks",xh="scopes";wh=j.namespace(w_)});function E_(){return eu||(eu=I.createScope("TableAutoSchedule")),eu}function Eh(t,e,r){let n=Me(e||It);return`${String(t||"")}::${n}::${String(r||"")}`}function A_(t,e,r){if(!r)return null;let n=_h.get(Eh(t,e,r),null);return n&&typeof n=="object"?n:null}function C_(t,e,r,n){if(!r)return;let s=Number.isFinite(n)?n:-1;_h.set(Eh(t,e,r),{lastMessageIndex:s,lastUpdatedAt:new Date().toISOString()})}function Ah(t,e,r=[],n){for(let s of r)C_(t,e,s,n)}function Ch({chatId:t,isolationKey:e,currentMessageIndex:r,scopeTables:n=[]}){let s=new Set,o={};for(let a of n){let i=a?.id||a?.uid||"";if(!i)continue;if(a?.enabled===!1){o[i]="disabled";continue}let l=a?.updateConfig?.updateFrequency;if(!Number.isFinite(l)||l===-1){s.add(i);continue}if(l===0){o[i]="frequency_zero";continue}if(l>=1){let d=A_(t,e,i);if(!d||!Number.isFinite(d.lastMessageIndex)){s.add(i);continue}let c=r-d.lastMessageIndex;c>=l?s.add(i):o[i]=`frequency_not_met (${c}/${l})`}else s.add(i)}return E_().info("buildAutoSchedulePlan",{chatId:t,isolationKey:e,currentMessageIndex:r,shouldUpdateCount:s.size,skipReasonsCount:Object.keys(o).length,shouldUpdateTables:[...s],skipReasons:o}),{shouldUpdate:s,skipReasons:o}}var _h,eu,kh=O(()=>{We();Y();Be();_h=j.namespace("tableAutoSchedule")});function k_(t){let e=yh(t);return e&&(e.mode==="incremental"||e.mode==="full")?e:nh(t)}function Se(){return I.createScope("TableUpdate")}function R_(t,e){return new Promise(r=>{if(e?.aborted){r(!1);return}let n,s=()=>{clearTimeout(n);try{e?.removeEventListener?.("abort",s)}catch{}r(!1)};n=setTimeout(()=>{try{e?.removeEventListener?.("abort",s)}catch{}r(!0)},t);try{e?.addEventListener?.("abort",s)}catch{}})}function Z(t,e=""){return t==null?e:String(t).trim()||e}function Ih(t=[],e=8,r="all"){if(!Array.isArray(t)||t.length===0)return"";let n=r==="assistant_only"?t.filter(s=>s?.role==="assistant"):t;return n.slice(Math.max(n.length-e,0)).map(s=>`[${Z(s?.role,"unknown")}] ${String(s?.content||"").trim()}`).filter(Boolean).join(`

`)}function Rh(t,{extractTags:e=[],useGlobalRules:r=!1,regexPresetId:n=""}={}){if(!t)return t;let s=Array.isArray(e)&&e.length>0,o=typeof n=="string"&&n.trim().length>0;if(!s&&!r&&!o)return t;try{let a=[],i=[];if(o)try{let l=Re.getPreset(n);if(l){let d=Array.isArray(l.rules)?l.rules.filter(c=>c&&c.enabled!==!1&&c.value):[];a.push(...d),Array.isArray(l.blacklist)&&i.push(...l.blacklist.map(c=>String(c||"").trim()).filter(Boolean))}else Se().warn("applyContextExtractionRules: \u627E\u4E0D\u5230\u6B63\u5219\u9884\u8BBE",{regexPresetId:n})}catch(l){Se().warn("applyContextExtractionRules: \u52A0\u8F7D\u6B63\u5219\u9884\u8BBE\u5931\u8D25",l)}if(s&&a.push(...e.map(l=>{let d=String(l||"").trim();return d.startsWith("regex:")?{type:"regex_include",value:d.slice(6).trim(),enabled:!0}:{type:"include",value:d,enabled:!0}}).filter(l=>l.value)),r){let l=vs()||[];a=[...a,...l.filter(d=>d?.enabled)],i=[...i,...Ss()||[]]}return a.length===0&&i.length===0?t:Ir(t,a,i)||t}catch(a){return Se().warn("applyContextExtractionRules \u5931\u8D25\uFF0C\u56DE\u9000\u539F\u59CB\u6587\u672C",a),t}}function M_(t=[],e=-1){return!Number.isFinite(e)||e<0?t:t.map(r=>{let n=Array.isArray(r?.rows)?r.rows:[];return e===0||n.length<=e?r:{...r,rows:n.slice(n.length-e)}})}function P_(t=[]){return!Array.isArray(t)||t.length===0?"":t.map((e,r)=>{let n=e?.aiInstructions&&typeof e.aiInstructions=="object"?e.aiInstructions:{},s=Array.isArray(e?.columns)?e.columns:[],o=[`\u8868 ${r}: ${Z(e?.name,`\u8868${r+1}`)}`,`\u8868\u683C\u8BF4\u660E: ${Z(e?.note,"\u65E0")}`,`\u521D\u59CB\u5316\u8BF4\u660E: ${Z(n.init,"\u65E0")}`,`\u65B0\u589E\u8BF4\u660E: ${Z(n.create,"\u65E0")}`,`\u66F4\u65B0\u8BF4\u660E: ${Z(n.update,"\u65E0")}`,`\u5220\u9664\u8BF4\u660E: ${Z(n.delete,"\u65E0")}`,"\u5B57\u6BB5\uFF08\u8BF7\u7528\u5217\u7D22\u5F15\u4F5C\u4E3A data key\uFF09:"];return s.forEach((a,i)=>{o.push(`- [${i}]: ${Z(a?.title||a?.key,"\u672A\u547D\u540D\u5B57\u6BB5")} \u2014 ${Z(a?.description,"\u65E0")}`)}),o.join(`
`)}).join(`

`)}function N_(t,e=[]){if(!t||!Array.isArray(e)||e.length===0)return"";let r=e.map((s,o)=>{let a=Z(s?.name,`\u8868${o+1}`),i=t.includes(s,o);return`\u8868 ${o}: ${a} - ${i?"\u5141\u8BB8\u7F16\u8F91":"\u53EA\u8BFB\uFF0C\u7981\u6B62\u4FEE\u6539"}`});return e.some((s,o)=>!t.includes(s,o))&&(r.push(""),r.push('\u3010\u91CD\u8981\u7EA6\u675F\u3011\u6807\u8BB0\u4E3A"\u53EA\u8BFB"\u7684\u8868\u683C\uFF0C\u4F60\u5FC5\u987B\u5728\u8F93\u51FA\u4E2D\u539F\u6837\u4FDD\u7559\u5176\u6240\u6709\u884C\u6570\u636E\uFF0C\u4E0D\u5F97\u65B0\u589E\u3001\u4FEE\u6539\u6216\u5220\u9664\u4EFB\u4F55\u884C\u3002'),r.push("\u5168\u91CF\u8F93\u51FA\u65F6\uFF0C\u53EA\u8BFB\u8868\u683C\u7684 rows \u5FC5\u987B\u4E0E\u8F93\u5165\u4E2D\u7684\u5B8C\u5168\u4E00\u81F4\u3002")),r.join(`
`)}function Nh(t={},e=0,r=[]){let n=t&&typeof t=="object"?t:{},s=n.cells&&typeof n.cells=="object"&&!Array.isArray(n.cells)?n.cells:{},o={},a=Array.isArray(r)?r.map(l=>Z(l?.key,"")).filter(Boolean):[];return new Set([...Object.keys(s),...a]).forEach(l=>{o[l]=Z(s[l],"")}),{...n,id:Ho(n.id||n.rowId,e),name:Z(n.name,""),cells:o}}function ds(t={},e=0){let r=t&&typeof t=="object"?t:{},n=Array.isArray(r.columns)?le(r.columns):[],s=Array.isArray(r.rows)?r.rows.map((o,a)=>Nh(o,a,n)):[];return{...r,id:or(r.id||r.key,e),rows:s}}function Cr(t=[]){return Array.isArray(t)?t.map((e,r)=>ds(e,r)):[]}function $_(t=[],e=[],r){let n=Cr(t),s=Cr(e);if(!r)return s;let o=new Map(s.map((u,y)=>[or(u?.id||u?.key,y),u])),a=n.map((u,y)=>({table:u,tableIndex:y,id:or(u?.id||u?.key,y)})).filter(({table:u,tableIndex:y})=>r.includes(u,y)),i=new Set,l=new Map;for(let u=0;u<s.length;u++){let y=s[u],p=or(y?.id||y?.key,u);o.has(p)&&(l.set(p,y),i.add(p))}let d=0,c=s.filter((u,y)=>{let p=or(u?.id||u?.key,y);return!i.has(p)});return n.map((u,y)=>{let p=or(u?.id||u?.key,y);if(!r.includes(u,y))return ds(u,y);let g=l.get(p);if(g)return ds(g,y);let m=c[d];return m?(d++,ds({...m,id:u.id||m.id},y)):ds(u,y)})}function O_(t=[],e=[],r,n={}){if(!Array.isArray(t)||!r)return{edits:[],stats:{total:0,passed:0,droppedByScope:0,droppedByLock:0}};let s=Cr(e),o=[],a=0,i=0;for(let l of t){let d=Number.isFinite(l?.tableIndex)?l.tableIndex:-1;if(d<0||d>=s.length){a++;continue}let c=s[d];if(!r.includes(c,d)){a++;continue}if(l.op===$s.INSERT_ROW){o.push(l);continue}let u=Number.isFinite(l?.rowIndex)?l.rowIndex:-1;if(u<0||u>=(Array.isArray(c?.rows)?c.rows.length:0)){a++;continue}if(l.op===$s.DELETE_ROW){if(Zd(n,d,u)){i++;continue}o.push(l);continue}o.push(l)}return{edits:o,stats:{total:t.length,passed:o.length,droppedByScope:a,droppedByLock:i}}}function L_(t=[],e){let r=Cr(t);return e?r.map((n,s)=>{let o=Array.isArray(n?.columns)?n.columns:[];return e.includes(n,s)?{...ds(n,s),scopeEditable:!0,scopeStatus:"editable"}:{...ds(n,s),scopeEditable:!1,scopeStatus:"readonly",rows:Array.isArray(n?.rows)?n.rows.map((a,i)=>Nh(a,i,o)):[]}}):r}function D_(t,e,r){return{target:{sourceMessageId:Z(t?.sourceMessageId),sourceSwipeId:Z(t?.sourceSwipeId||t?.effectiveSwipeId),slotBindingKey:Z(t?.slotBindingKey),slotRevisionKey:Z(t?.slotRevisionKey),slotTransactionId:Z(t?.slotTransactionId)},loadMode:Z(e?.loadMode),mergeBaseOnly:e?.mergeBaseOnly===!0,resolvedFromMessageId:Z(e?.resolvedFromMessageId),resolvedFromRevisionKey:Z(e?.resolvedFromRevisionKey),sourceKind:Z(e?.sourceKind||e?.state?.meta?.sourceKind),scope:typeof r?.toJSON=="function"?r.toJSON():null,tables:L_(e?.state?.tables,r)}}function Mh(){return B_}function Ph(t,e){if(!t||typeof t!="string")return{key:t,source:"fallback"};if(!Array.isArray(e)||e.length===0)return{key:t,source:"fallback"};for(let n of e)if(n?.key===t)return{key:t,source:"direct"};if(/^\d+$/.test(t)){let n=parseInt(t,10);if(n>=0&&n<e.length&&e[n]?.key)return{key:e[n].key,source:"index"}}let r=t.match(/^col(?:_(\d+))?$/i);if(r){let n=r[1]?parseInt(r[1],10)-1:0;if(n>=0&&n<e.length&&e[n]?.key)return{key:e[n].key,source:"col_n"}}return{key:t,source:"fallback"}}function z_(t,e,r,n=null){let s=Cr(t||[]),o=r||{},a={direct:0,index:0,col_n:0,fallback:0},i={},l={};if(Array.isArray(e))for(let d of e){let c=Number.isFinite(d?.tableIndex)?d.tableIndex:-1;i[c]=(i[c]||0)+1,l[d?.op||"unknown"]=(l[d?.op||"unknown"]||0)+1}Se().info("applyIncrementalEdits \u603B\u89C8",{totalEdits:e?.length||0,tableCount:s.length,editsByTable:i,editsByOp:l});for(let d of e){let c=d.tableIndex;if(c<0||c>=s.length)continue;let u=s[c];if(!u||!Array.isArray(u.rows)||n&&!n.includes(u,c))continue;if(d.op===$s.INSERT_ROW){let p={id:Pr("row"),name:"",cells:{}};if(d.data&&typeof d.data=="object"){p.name=Z(d.data.name,"");let m=Array.isArray(u.columns)?u.columns:[];for(let[h,b]of Object.entries(d.data)){if(h==="name")continue;let{key:w,source:S}=Ph(h,m);p.cells[w]=Z(b),a[S]=(a[S]||0)+1}}Object.keys(p.cells).length===0&&!p.name&&Se().warn("applyIncrementalEdits: \u63D2\u5165\u7A7A\u884C\uFF08data \u89E3\u6790\u4E3A\u7A7A\uFF09",{tableIndex:c,tableName:u.name,editDataKeys:d.data?Object.keys(d.data):[],editDataPreview:JSON.stringify(d.data||{}).slice(0,200)}),u.rows.push(p);continue}let y=d.rowIndex;if(!(y<0||y>=u.rows.length)){if(d.op===$s.DELETE_ROW){if(Zd(o,c,y))continue;u.rows.splice(y,1);continue}if(d.op===$s.UPDATE_ROW){let p=u.rows[y];if(!p)continue;if(p.id=Ho(p.id||p.rowId,y),p.cells=p.cells||{},d.data&&typeof d.data=="object"){let g=Array.isArray(u.columns)?u.columns:[];for(let[m,h]of Object.entries(d.data)){if(m==="name")continue;let{key:b,source:w}=Ph(m,g);Th(o,c,y,b)||(p.cells[b]=Z(h),a[w]=(a[w]||0)+1)}d.data.name!==void 0&&(p.name=Z(d.data.name,p.name))}}}}return Object.values(a).some(d=>d>0)&&Se().info("\u5217 key \u89E3\u6790\u7EDF\u8BA1",a),Cr(s)}async function K_({executionContext:t,targetSnapshot:e,loadResult:r,config:n,assistantSnapshot:s,fillMode:o,runScope:a}={}){let i=Xt(n),l=o==="incremental"||!o&&i.fillMode!=="full",d=zf(i,{skipResponseContract:l}),c=D_(e,r,a),u=Array.isArray(s?.tableState?.tables)?Cr(s.tableState.tables):[],y=t?.chatHistory||t?.chatMessages||[],{contextDepth:p,contextRoles:g,contextExtractTags:m,contextUseGlobalRules:h,sendLatestRows:b}=i,w=i?.extraction?.regexPresetId||"",S=Ih(y,p,g),_=Ih(y,p,"all"),k=Rh(S,{extractTags:m,useGlobalRules:h,regexPresetId:w}),v=Rh(_,{extractTags:m,useGlobalRules:h,regexPresetId:w}),C=await Xa({worldbooks:i.worldbooks}),R=M_(c.tables,b),L={...c,tables:R},N={...t,toolName:"\u586B\u8868\u5DE5\u4F5C\u53F0",toolId:"tableWorkbench",lastAiMessage:t?.assistantBaseText||t?.lastAiMessage||"",recentMessagesText:k,rawRecentMessagesText:v,toolWorldbookContent:C,tableGuidance:P_(i.tables),tableScopeGuidance:N_(a,c.tables),injectedContext:s?.injectedContext||Ft.getLatestMessageInjectedContext(e?.sourceMessageId),toolContentMacro:JSON.stringify(L,null,2),extractedContent:JSON.stringify(L,null,2),previousToolOutput:JSON.stringify(u,null,2)},E=await es.buildToolMessages(d,N),P=await es.buildPromptText(d,N);if(l&&(P+=Mh(),Array.isArray(E)&&E.length>0)){let q=E[E.length-1];q&&typeof q.content=="string"&&(q.content+=Mh())}if(!Array.isArray(E)||E.length===0)throw new Error("\u586B\u8868\u8BF7\u6C42\u6D88\u606F\u6784\u5EFA\u5931\u8D25\u3002");let U=i.apiPreset||"";try{let q=Array.isArray(c?.tables)?c.tables:[],te=q.filter(ie=>ie?.scopeEditable!==!1).map(ie=>Z(ie?.updateConfig?.apiPreset,"")).filter(Boolean);te.length>0&&te.every(ie=>ie===te[0])&&(U=te[0],Se().info("L3: \u8868\u7EA7 API \u9884\u8BBE\u751F\u6548",{preset:U,affectedTables:q.filter(ie=>ie?.scopeEditable!==!1).map(ie=>ie?.name||ie?.id)}))}catch(q){Se().warn("L3 \u8868\u7EA7 API \u9884\u8BBE\u89E3\u6790\u5931\u8D25\uFF0C\u7528\u5168\u5C40",q)}return{toolConfig:d,context:N,requestPayload:c,promptText:P,messages:E,fillMode:l?"incremental":"full",effectiveApiPreset:U,runScope:typeof a?.toJSON=="function"?a.toJSON():null}}async function j_(t,e={},r=null){let n=Xt(e),s=Z(e?._effectiveApiPreset||n.apiPreset,"");if(s){if(!_o(s))throw new Error(`API \u9884\u8BBE\u4E0D\u5B58\u5728: ${s}`);return Eo(s,t,{},r)}return Ao(t,{},r)}function Kr({status:t=Ne.IDLE,targetSnapshot:e=null,skipReason:r="",startedAt:n=Date.now(),error:s=""}={}){return{lastAutoRunAt:n,lastAutoStatus:Z(t,Ne.IDLE),lastAutoMessageId:Z(e?.sourceMessageId,""),lastAutoRevisionKey:Z(e?.slotRevisionKey,""),lastAutoSkipReason:Z(r,""),...s?{lastError:s,lastErrorDetails:[s]}:{}}}function Ar(t={},e=dt.MANUAL){let r=t&&typeof t=="object"?t:{};return Object.keys(r).length?Bf(r):null}function cs({targetSnapshot:t=null,startedAt:e=Date.now(),status:r="idle",skipReason:n="",warning:s="",writeback:o=null,aborted:a=!1,stale:i=!1,abortReason:l="",error:d=""}={}){return{isAutoRun:!0,status:r,startedAt:e,targetSnapshot:t,sourceMessageId:Z(t?.sourceMessageId,""),sourceSwipeId:Z(t?.sourceSwipeId||t?.effectiveSwipeId,""),slotRevisionKey:Z(t?.slotRevisionKey,""),writebackStatus:o?.success===!0?"success":s?"warning":"",refreshConfirmed:o?.mirrorResult?.refreshConfirmed===!0,warning:Z(s,""),skipReason:Z(n,""),aborted:a===!0,stale:i===!0,abortReason:Z(l,""),error:Z(d,"")}}function dl(t=null){if(t?.signal?.aborted)return{aborted:!0,stale:!1,reason:"cancelled_before_host_commit"};if(typeof t?.shouldAbortWriteback=="function")try{return t.shouldAbortWriteback()||!1}catch{return{aborted:!0,stale:!0,reason:"stale_base_changed"}}return!1}async function Ta(t=null,e={}){return Oh({configInput:t,runSource:dt.MANUAL,clearBeforeUpdate:e?.clearBeforeUpdate===!0,executionContextBuilder:()=>Bn({runSource:dt.MANUAL}),targetResolver:r=>ua(r,{runSource:dt.MANUAL})})}async function $h({messageId:t,swipeId:e="",sourceEvent:r="AUTO_TABLE",configInput:n=null,signal:s=null,shouldAbortWriteback:o=null}={}){return Oh({configInput:n,runSource:dt.AUTO,autoMeta:{sourceEvent:r,messageId:Z(t,""),swipeId:Z(e,""),signal:s,shouldAbortWriteback:o},executionContextBuilder:()=>zn({messageId:t,swipeId:e,runSource:dt.AUTO}),targetResolver:a=>ua(a,{runSource:dt.AUTO})})}async function Oh({configInput:t=null,runSource:e=dt.MANUAL,executionContextBuilder:r,targetResolver:n,autoMeta:s=null,clearBeforeUpdate:o=!1}={}){let a=Xt(t||be()),i=Hc(a),l=hi({tables:Array.isArray(a.tables)?a.tables:[]}),d=e===dt.AUTO,c=Date.now();if(Se().info(`\u5F00\u59CB\u586B\u8868 [${e}]`,{isAutoRun:d,fillMode:a.fillMode}),!i.valid||!l.valid){let m=[...i.errors,...l.errors];return Se().error("\u914D\u7F6E\u6821\u9A8C\u5931\u8D25",{errors:m}),Ar({lastStatus:Ne.ERROR,lastRunAt:c,lastDurationMs:0,lastError:m[0]||"\u586B\u8868\u914D\u7F6E\u65E0\u6548\u3002",lastErrorDetails:m,lastValidationSummary:l.summary||{errorCount:m.length,warningCount:0},errorCount:Number(a?.runtime?.errorCount)||0,...d?Kr({status:Ne.ERROR,startedAt:c,skipReason:"invalid_config",error:m[0]||"\u586B\u8868\u914D\u7F6E\u65E0\u6548\u3002"}):{}},e),{success:!1,error:m.join(`
`),errors:m,...d?{meta:cs({startedAt:c,status:Ne.ERROR,skipReason:"invalid_config",error:m[0]||"\u586B\u8868\u914D\u7F6E\u65E0\u6548\u3002"})}:{}}}let u=a.runtime||{},y=Array.isArray(a.tables)?a.tables:[];try{let h=Gs({})?.template?.tables;if(Array.isArray(h)&&h.length>0){let b=a.tableEnabledOverrides&&typeof a.tableEnabledOverrides=="object"?a.tableEnabledOverrides:{};if(y=h.map(S=>{let _=S?.id,k=_&&Object.prototype.hasOwnProperty.call(b,_)?b[_]:void 0,v=k!==void 0?k:S.enabled!==!1;return{...S,enabled:v}}),d){let S=Number.isFinite(targetSnapshot?.targetMessageIndex)?targetSnapshot.targetMessageIndex:-1,_=Ch({chatId:targetSnapshot?.chatId||"",isolationKey:ae.getKey?ae.getKey():"",currentMessageIndex:S,scopeTables:y});y=y.map(k=>{let v=k?.id||k?.uid||"";return v&&!_.shouldUpdate.has(v)?{...k,enabled:!1}:k})}let w=y.filter(S=>S.enabled===!1).map(S=>S?.name||S?.id);w.length>0&&Se().info("scopeTables: \u7528\u6237\u7981\u7528\u4E86\u90E8\u5206\u8868",{disabledCount:w.length,disabledNames:w})}}catch{}let p=Ef(a.scope||a,y);if(Se().info("runScope \u5DF2\u89E3\u6790",{mode:p.mode,requestedMode:p.requestedMode,staleScope:p.staleScope,scopeTablesCount:Array.isArray(y)?y.length:0,allowedTableIds:p.allowedTableIds,allTableIds:p.allTableIds,scopeTablesEnabled:Array.isArray(y)?y.map(m=>({id:m?.id,name:m?.name,enabled:m?.enabled})):[]}),p.staleScope&&Se().warn("runScope: \u68C0\u6D4B\u5230 stale scope\uFF08activeTableId/selectedTableIds \u4E0D\u5728\u5F53\u524D tables \u8303\u56F4\u5185\uFF09\uFF0C\u5DF2\u81EA\u52A8 fallback \u5230 enabled",{requestedMode:p.requestedMode,requestedActiveTableId:p.activeTableId,requestedSelectedTableIds:p.selectedTableIds}),(p.mode==="current"||p.mode==="selected")&&p.allowedTableIds.length===0){let m=p.mode==="current"?"\u672A\u6307\u5B9A\u5F53\u524D\u8868\u683C\uFF0C\u65E0\u6CD5\u6267\u884C\u3002":"\u672A\u9009\u62E9\u4EFB\u4F55\u8868\u683C\uFF0C\u65E0\u6CD5\u6267\u884C\u3002";return Se().warn(m,{mode:p.mode}),Ar({lastStatus:Ne.ERROR,lastRunAt:c,lastDurationMs:0,lastError:m,lastErrorDetails:[m]},e),{success:!1,error:m,errors:[m]}}let g=null;Ar({lastStatus:Ne.RUNNING,lastError:"",lastErrorDetails:[],lastValidationSummary:l.summary||{errorCount:0,warningCount:0},lastScopeMode:Z(p.mode,""),...d?Kr({status:Ne.RUNNING,startedAt:c,skipReason:""}):{}},e);try{if(typeof r!="function")throw new Error("table_update_missing_execution_context_builder");if(typeof n!="function")throw new Error("table_update_missing_target_resolver");let m=await r();Se().info("\u6267\u884C\u4E0A\u4E0B\u6587\u5DF2\u6784\u5EFA");let h=n(m);if(!h)throw new Error("\u5F53\u524D\u6CA1\u6709\u53EF\u7528\u7684 assistant \u76EE\u6807\u697C\u5C42\u3002");g=h,Se().info("\u76EE\u6807\u6D88\u606F\u5DF2\u89E3\u6790",{sourceMessageId:h.sourceMessageId,slotRevisionKey:h.slotRevisionKey}),d&&Ar(Kr({status:Ne.RUNNING,targetSnapshot:h,startedAt:c,skipReason:""}),e);let b=Z(a.autoUpdateTrigger,"assistantMessage");if(d&&(!a.autoUpdateEnabled||b!=="assistantMessage")){let J=a.autoUpdateEnabled?"auto_trigger_not_assistant_message":"auto_update_disabled";return Ar(Kr({status:Ne.SKIPPED,targetSnapshot:h,startedAt:c,skipReason:J}),e),{success:!1,skipped:!0,reason:J,targetSnapshot:h,meta:cs({targetSnapshot:h,startedAt:c,status:Ne.SKIPPED,skipReason:J})}}if(d){let J=dl(s);if(J)return Ar(Kr({status:Ne.ABORTED,targetSnapshot:h,startedAt:c,skipReason:J.reason,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88"}),e),{success:!1,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88",targetSnapshot:h,meta:cs({targetSnapshot:h,startedAt:c,status:Ne.ABORTED,skipReason:J.reason,aborted:J.aborted===!0,stale:J.stale===!0,abortReason:J.reason,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88"})}}let w=await Lm(h);if(!w?.success)throw new Error(w?.error||"\u76EE\u6807\u89E3\u6790\u8BB0\u5F55\u5931\u8D25");if(o&&Number.isFinite(h?.targetMessageIndex)&&h.targetMessageIndex>=0){Se().info("clearBeforeUpdate \u542F\u7528\uFF0C\u6E05\u7A7A\u76EE\u6807\u697C\u5C42\u6570\u636E",{targetMessageIndex:h.targetMessageIndex});try{let J=await Dm(h.targetMessageIndex);Se().info("clearBeforeUpdate \u5B8C\u6210",J)}catch(J){Se().error("clearBeforeUpdate \u5931\u8D25",J)}}let S=ss(h.sourceMessageId),_=Array.isArray(y)&&y.length>0?y:a.tables;Se().info("templateTables \u6765\u6E90",{usingActiveTemplate:y!==(Array.isArray(a.tables)?a.tables:[]),tableCount:Array.isArray(_)?_.length:0,firstTableName:_?.[0]?.name||"",firstTableId:_?.[0]?.id||""});let k=Om(h,{templateTables:_}),v=Cr(k?.state?.tables||[]),C=hh(),R=s?.signal||m?.signal||null;Se().info("\u72B6\u6001\u5DF2\u52A0\u8F7D",{loadMode:k?.loadMode,sourceKind:k?.sourceKind,tableCount:v.length});let L=await C.buildRequest({buildRequest:K_},{executionContext:m,targetSnapshot:h,loadResult:k,config:a,assistantSnapshot:S,runScope:p});Se().info("\u8BF7\u6C42\u5DF2\u6784\u5EFA",{messageCount:L?.messages?.length,fillMode:L?.fillMode});let N="",E=null,P=null;for(let J=1;J<=cl;J++){if(R?.aborted)throw new Error("\u8BF7\u6C42\u5DF2\u53D6\u6D88");try{if(N=await C.sendRequest({sendRequest:j_},L,{config:{...a,_effectiveApiPreset:L?.effectiveApiPreset||""},abortSignal:R}),Se().info("API \u54CD\u5E94\u5DF2\u6536\u5230",{attempt:J,responseLength:N?.length||0}),E=C.parseResponse({parseResponse:k_},N),Se().info("\u54CD\u5E94\u5DF2\u89E3\u6790",{attempt:J,mode:E?.mode,hasEdits:!!E?.edits,hasTables:!!E?.tables,rawFormat:E?.rawFormat}),!(E?.mode==="incremental"&&Array.isArray(E.edits)&&E.edits.length>0||E?.mode==="full"&&E?.tables))throw new Error("AI \u54CD\u5E94\u4E2D\u672A\u627E\u5230\u6709\u6548\u7684 <tableEdit> \u6807\u7B7E\u6216\u8868\u683C JSON");P=null;break}catch(qe){if(P=qe,Se().warn(`\u586B\u8868 attempt ${J}/${cl} \u5931\u8D25`,{error:qe?.message||String(qe)}),J<cl&&!await R_(I_,R))throw new Error("\u8BF7\u6C42\u5DF2\u53D6\u6D88\uFF08\u91CD\u8BD5\u7B49\u5F85\u671F\u95F4\uFF09")}}if(P)throw new Error(`\u586B\u8868\u5931\u8D25\uFF08${cl} \u6B21\u91CD\u8BD5\u540E\u4ECD\u5931\u8D25\uFF09: ${P?.message||String(P)}`);let U,q=null,te=L.fillMode||"full",ie=null;if(E.mode==="incremental"&&E.edits){let J=Sh(k?.state,v),qe=O_(E.edits,v,p,J);ie=qe.stats,U=z_(v,qe.edits,J,p),te="incremental",(ie.droppedByScope>0||ie.droppedByLock>0)&&Se().info("scope \u8FC7\u6EE4",ie)}else if(E.mode==="full"&&E.tables){let J=Cr(E.tables);U=$_(v,J,p),te="full"}else U=Cr(v);if(q=gh(v,U),Se().info("\u5DEE\u5F02\u5DF2\u8BA1\u7B97",{fillMode:te}),d){let J=dl(s);if(J)return Ar(Kr({status:Ne.ABORTED,targetSnapshot:h,startedAt:c,skipReason:J.reason,error:"\u5199\u56DE\u524D\u5DF2\u53D6\u6D88"}),e),{success:!1,error:"\u5199\u56DE\u524D\u5DF2\u53D6\u6D88",targetSnapshot:h,meta:cs({targetSnapshot:h,startedAt:c,status:Ne.ABORTED,aborted:J.aborted===!0,stale:J.stale===!0,abortReason:J.reason,error:"\u5199\u56DE\u524D\u5DF2\u53D6\u6D88"})}}let Q=await Xm({targetSnapshot:h,nextTables:U,config:a,loadResult:k,diff:q,fillMode:te,skipNotify:d});if(d){let J=dl(s);if(J)return Ar(Kr({status:Ne.ABORTED,targetSnapshot:h,startedAt:c,skipReason:J.reason,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88"}),e),{success:!1,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88",targetSnapshot:h,loadResult:k,request:L,responseText:N,parsed:E,fillMode:te,diff:q,previousTables:v,nextTables:U,runScope:p,state:Q?.state,bindings:Q?.bindings,mirrorResult:Q?.mirrorResult,warning:Q?.warning||"",meta:cs({targetSnapshot:h,startedAt:c,status:Ne.ABORTED,warning:Q?.warning||"",writeback:Q,aborted:J.aborted===!0,stale:J.stale===!0,abortReason:J.reason,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88"})}}if(!Q?.success)throw new Error(Q?.error||"\u7ED3\u6784\u5316\u5199\u56DE\u5931\u8D25");if(d)try{let J=Number.isFinite(h?.targetMessageIndex)?h.targetMessageIndex:-1,qe=y.filter(_e=>_e?.enabled!==!1&&(_e?.id||_e?.uid)).map(_e=>_e.id||_e.uid);qe.length>0&&J>=0&&Ah(h?.chatId||"",ae.getKey?ae.getKey():"",qe,J)}catch(J){Se().warn("recordTablesUpdated \u5931\u8D25\uFF08\u4E0D\u5F71\u54CD\u4E3B\u6D41\u7A0B\uFF09",J)}let we=Date.now()-c;Se().info(`\u586B\u8868\u5B8C\u6210 [${te}] ${we}ms`,{success:!0,writebackSuccess:Q?.success,mirrorSuccess:Q?.mirrorResult?.success});let Pe={lastStatus:Ne.SUCCESS,lastRunAt:Date.now(),lastDurationMs:we,lastError:"",lastErrorDetails:[],lastValidationSummary:l.summary||{errorCount:0,warningCount:0},successCount:(Number(u.successCount)||0)+1,errorCount:Number(u.errorCount)||0,lastSourceMessageId:Z(h.sourceMessageId),lastSlotRevisionKey:Z(h.slotRevisionKey),lastLoadMode:Z(k.loadMode),lastMirrorApplied:Q?.mirrorResult?.success===!0,lastResolvedFromMessageId:Z(k?.resolvedFromMessageId),lastResolvedFromRevisionKey:Z(k?.resolvedFromRevisionKey),lastSourceKind:Z(k?.sourceKind||k?.state?.meta?.sourceKind),lastScopeMode:Z(p.mode,""),lastFillMode:te,...d?Kr({status:Ne.SUCCESS,targetSnapshot:h,startedAt:c,skipReason:""}):{}};return Ar(Pe,e),{success:!0,targetSnapshot:h,loadResult:k,request:L,responseText:N,parsed:E,fillMode:te,diff:q,previousTables:v,nextTables:U,runScope:p,scopeStats:ie,state:Q.state,bindings:Q.bindings,mirrorResult:Q.mirrorResult,warning:Q.warning||"",...d?{meta:cs({targetSnapshot:h,startedAt:c,status:Ne.SUCCESS,warning:Q.warning||"",writeback:Q})}:{}}}catch(m){let h=Date.now()-c;Se().error(`\u586B\u8868\u5931\u8D25 ${h}ms: ${m?.message||m}`,{stack:m?.stack});let b=d?dl(s):!1,w=m?.name==="AbortError"||m?.message==="\u8BF7\u6C42\u5DF2\u53D6\u6D88"||b?.aborted===!0||b?.stale===!0,S=w?Ne.ABORTED:Ne.ERROR,_={lastStatus:S,lastRunAt:Date.now(),lastDurationMs:h,lastError:m?.message||String(m),lastErrorDetails:[m?.message||String(m)],lastValidationSummary:l.summary||{errorCount:0,warningCount:0},successCount:Number(u.successCount)||0,errorCount:w?Number(u.errorCount)||0:(Number(u.errorCount)||0)+1,lastScopeMode:Z(p.mode,""),...d?Kr({status:S,targetSnapshot:g,startedAt:c,skipReason:w?b?.reason||"cancelled_before_host_commit":"",error:m?.message||String(m)}):{}};return Ar(_,e),{success:!1,error:m?.message||String(m),errors:[m?.message||String(m)],...d?{meta:cs({targetSnapshot:g,startedAt:c,status:S,skipReason:w?b?.reason||"cancelled_before_host_commit":"",aborted:w,stale:b?.stale===!0,abortReason:w?b?.reason||"cancelled_before_host_commit":"",error:m?.message||String(m)})}:{}}}}var cl,I_,B_,ul=O(()=>{Kn();Zn();Co();zi();Y();Be();ya();os();Jt();Qm();nl();fh();mh();fi();bh();ll();Ds();Lo();Ts();rn();kh();$r();cl=3,I_=5e3;B_=`

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

\u53EA\u8FD4\u56DE <tableEdit> \u6807\u7B7E\uFF0C\u4E0D\u8981\u9644\u52A0\u5176\u4ED6\u5185\u5BB9\u3002`});var Bh={};ue(Bh,{WindowManager:()=>pl,closeWindow:()=>Dh,createWindow:()=>tu,windowManager:()=>vt});function W_(){if(vt.stylesInjected)return;vt.stylesInjected=!0;let t=`
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
  `,e=qt(),r=e.createElement("style");r.id=F_+"_styles",r.textContent=t,(e.head||e.documentElement).appendChild(r)}function tu(t){let{id:e,title:r="\u7A97\u53E3",content:n="",width:s=900,height:o=700,modal:a=!1,resizable:i=!0,maximizable:l=!0,startMaximized:d=!1,rememberState:c=!0,onClose:u,onReady:y}=t;W_();let p=qt(),g=p.defaultView||window.parent||window,m=window.jQuery||window.parent?.jQuery;if(!m)return U_.error("jQuery not available"),null;if(vt.isOpen(e))return vt.bringToFront(e),vt.getWindow(e);let h=g.innerWidth||1200,b=g.innerHeight||800,w=h<=1100,S=null,_=!1;c&&(S=vt.getState(e),S&&!w&&(_=!0));let k,v;_&&S.width&&S.height?(k=Math.max(400,Math.min(S.width,h-40)),v=Math.max(300,Math.min(S.height,b-40))):(k=Math.max(400,Math.min(s,h-40)),v=Math.max(300,Math.min(o,b-40)));let C=Math.max(20,Math.min((h-k)/2,h-k-20)),R=Math.max(20,Math.min((b-v)/2,b-v-20)),L=l&&!w,N=`
    <div class="yyt-window" id="${e}" style="left:${C}px; top:${R}px; width:${k}px; height:${v}px;">
      <div class="yyt-window-header">
        <div class="yyt-window-title">
          <i class="fa-solid fa-window-maximize"></i>
          <span>${H_(r)}</span>
        </div>
        <div class="yyt-window-controls">
          ${L?'<button class="yyt-window-btn maximize" title="\u6700\u5927\u5316/\u8FD8\u539F"><i class="fa-solid fa-expand"></i></button>':""}
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
  `,E=null;a&&(E=m(`<div class="yyt-window-overlay" data-for="${e}"></div>`),m(p.body).append(E));let P=m(N);m(p.body).append(P),vt.register(e,P),P.on("mousedown",()=>vt.bringToFront(e));let U=!1,q={left:C,top:R,width:k,height:v},te=()=>{q={left:parseInt(P.css("left")),top:parseInt(P.css("top")),width:P.width(),height:P.height()},P.addClass("maximized"),P.find(".yyt-window-btn.maximize i").removeClass("fa-expand").addClass("fa-compress"),U=!0},ie=()=>{P.removeClass("maximized"),P.css({left:q.left+"px",top:q.top+"px",width:q.width+"px",height:q.height+"px"}),P.find(".yyt-window-btn.maximize i").removeClass("fa-compress").addClass("fa-expand"),U=!1};P.find(".yyt-window-btn.maximize").on("click",()=>{U?ie():te()}),(w&&l||_&&S.isMaximized&&l||d&&l)&&te(),P.find(".yyt-window-btn.close").on("click",()=>{if(c&&l){let _e={width:U?q.width:P.width(),height:U?q.height:P.height(),isMaximized:U};vt.saveState(e,_e)}u&&u(),E&&E.remove(),P.remove(),vt.unregister(e),m(p).off(".yytWindowDrag"+e),m(p).off(".yytWindowResize"+e)}),E&&E.on("click",_e=>{_e.target,E[0]});let Q=!1,we,Pe,J,qe;if(P.find(".yyt-window-header").on("mousedown",_e=>{m(_e.target).closest(".yyt-window-controls").length||U||(Q=!0,we=_e.clientX,Pe=_e.clientY,J=parseInt(P.css("left")),qe=parseInt(P.css("top")),m(p.body).css("user-select","none"))}),m(p).on("mousemove.yytWindowDrag"+e,_e=>{if(!Q)return;let ze=_e.clientX-we,Xe=_e.clientY-Pe;P.css({left:Math.max(0,J+ze)+"px",top:Math.max(0,qe+Xe)+"px"})}),m(p).on("mouseup.yytWindowDrag"+e,()=>{Q&&(Q=!1,m(p.body).css("user-select",""))}),i){let _e=!1,ze="",Xe,En,rt,ys,mo,ho;P.find(".yyt-window-resize-handle").on("mousedown",function(er){U||(_e=!0,ze="",m(this).hasClass("se")?ze="se":m(this).hasClass("e")?ze="e":m(this).hasClass("s")?ze="s":m(this).hasClass("w")?ze="w":m(this).hasClass("n")?ze="n":m(this).hasClass("nw")?ze="nw":m(this).hasClass("ne")?ze="ne":m(this).hasClass("sw")&&(ze="sw"),Xe=er.clientX,En=er.clientY,rt=P.width(),ys=P.height(),mo=parseInt(P.css("left")),ho=parseInt(P.css("top")),m(p.body).css("user-select","none"),er.stopPropagation())}),m(p).on("mousemove.yytWindowResize"+e,er=>{if(!_e)return;let An=er.clientX-Xe,Cn=er.clientY-En,fs=400,Pa=300,bo=rt,Fr=ys,kn=mo,Na=ho;if(ze.includes("e")&&(bo=Math.max(fs,rt+An)),ze.includes("s")&&(Fr=Math.max(Pa,ys+Cn)),ze.includes("w")){let In=rt-An;In>=fs&&(bo=In,kn=mo+An)}if(ze.includes("n")){let In=ys-Cn;In>=Pa&&(Fr=In,Na=ho+Cn)}P.css({width:bo+"px",height:Fr+"px",left:kn+"px",top:Na+"px"})}),m(p).on("mouseup.yytWindowResize"+e,()=>{_e&&(_e=!1,m(p.body).css("user-select",""))})}return P.on("remove",()=>{m(p).off(".yytWindowDrag"+e),m(p).off(".yytWindowResize"+e)}),y&&setTimeout(()=>y(P),50),P}function Dh(t){let e=vt.getWindow(t);if(e){let r=window.jQuery||window.parent?.jQuery;if(r){let n=qt();r(`.yyt-window-overlay[data-for="${t}"]`).remove(),r(n).off(".yytWindowDrag"+t),r(n).off(".yytWindowResize"+t)}e.remove(),vt.unregister(t)}}function H_(t){return typeof t!="string"?"":t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}var U_,F_,Lh,pl,vt,ru=O(()=>{We();Y();lt();U_=I.createScope("WindowManager"),F_="youyou_toolkit_window_manager",Lh="window_states",pl=class{constructor(){this.windows=new Map,this.baseZIndex=1e4,this.topZIndex=1e4,this.stylesInjected=!1}register(e,r){this.topZIndex++,this.windows.set(e,{$el:r,zIndex:this.topZIndex}),r.css("z-index",this.topZIndex)}unregister(e){this.windows.delete(e)}bringToFront(e){let r=this.windows.get(e);r&&(this.topZIndex++,r.zIndex=this.topZIndex,r.$el.css("z-index",this.topZIndex))}getWindow(e){return this.windows.get(e)?.$el||null}isOpen(e){return this.windows.has(e)}closeAll(){this.windows.forEach((e,r)=>{e.$el&&e.$el.remove()}),this.windows.clear()}saveState(e,r){let n=this.loadStates();n[e]={...r,updatedAt:Date.now()},Da.set(Lh,n)}loadStates(){return Da.get(Lh)||{}}getState(e){return this.loadStates()[e]||null}},vt=new pl});function ou(){return{addedTables:[],deletedTables:[],renamedTables:[],movedTables:[],patchedAiInstructions:[],patchedColumns:[],patchedRows:[],patchedExportConfig:[],patchedLocks:[],patchedWorkbenchConfig:[]}}function au(t,e=""){return{protocolVersion:us,mode:oo,baseFingerprint:t||"",summary:"",warnings:[],operations:[],currentTableId:String(e||"")}}function iu(){let t=0,e=!1;return{createRunGuard(){let r=t;return{isCancelled:()=>e,isStale:()=>!e&&r!==t}},invalidate(){t+=1},cancel(){e=!0,t+=1},reset(){e=!1,t+=1}}}function Pt(t){return t===void 0?t:JSON.parse(JSON.stringify(t))}function G_(t){try{return JSON.stringify(t)}catch{return""}}async function Ea(t){if(!t||!Array.isArray(t.tables))return"empty";let e=t.tables.map(i=>({id:i.id||"",name:i.name||"",note:i.note||"",enabled:i.enabled,columns:Array.isArray(i.columns)?i.columns.map(l=>({key:l.key||"",title:l.title||"",type:l.type||""})):[],aiInstructions:i.aiInstructions||{},exportConfig:i.exportConfig||{}})),r=G_(e),s=new TextEncoder().encode(r),o=await crypto.subtle.digest("SHA-256",s);return`yyt-fp:${Array.from(new Uint8Array(o)).slice(0,8).map(i=>i.toString(16).padStart(2,"0")).join("")}`}function fl(t,e){let r=Number(t);if(!Number.isFinite(r))return e;let n=Math.floor(r);return n>0?n:e}function Uh(t,e){let r=Number(t);if(!Number.isFinite(r))return e;let n=Math.floor(r);return n>=0?n:e}function wn(t){return String(t??"").trim()}var Je,us,oo,_a,nu,yl,su,zh,Kh,jh,ao,SP,gl=O(()=>{Je=Object.freeze({ADD_TABLE:"add_table",RENAME_TABLE:"rename_table",DELETE_TABLE:"delete_table",MOVE_TABLE:"move_table",PATCH_AI_INSTRUCTIONS:"patch_table_ai_instructions",PATCH_COLUMNS:"patch_table_columns",PATCH_ROWS:"patch_table_rows",PATCH_EXPORT_CONFIG:"patch_table_export_config",PATCH_LOCKS:"patch_table_locks",PATCH_WORKBENCH_CONFIG:"patch_workbench_config"}),us=1,oo="modify_current_workbench_incremental",_a="assistantDraft",nu=Object.freeze(["note","init","create","update","delete"]),yl=new Set(nu),su=Object.freeze(["contextDepth","contextRoles","sendLatestRows","runScope","mirrorToMessage","mirrorTag","fillMode","autoUpdateEnabled","autoUpdateTrigger"]),zh=new Set(su),Kh=3,jh=1,ao=Object.freeze({MAX_ROUNDS:"max_rounds",EMPTY_OPERATIONS:"empty_operations",REPEATED_FINGERPRINT:"repeated_working_fingerprint",REPAIR_RETRY_CAPPED:"repair_retry_capped"}),SP=Object.freeze({CANCELLED:"cancelled",STALE:"stale"})});function lu(t){return!!t&&typeof t=="object"&&!Array.isArray(t)}function St(t,e){if(!lu(t))throw new Error(`${e} \u5FC5\u987B\u662F\u5BF9\u8C61`)}function Nt(t,e){let r=String(t??"").trim();if(!r)throw new Error(`${e} \u5FC5\u987B\u662F\u975E\u7A7A\u5B57\u7B26\u4E32`);return r}function io(t,e){let r=t.tables.find(n=>n.id===e);if(!r)throw new Error(`\u627E\u4E0D\u5230\u76EE\u6807\u8868: ${e}`);return r}function Fh(t){return new Set((t.columns||[]).map(e=>e.key).filter(Boolean))}function Wh(){return{init:"",create:"",update:"",delete:""}}function q_(t){let e=_a,r=new RegExp(`<${e}>([\\s\\S]*?)<\\/${e}>`,"g"),n=Array.from(String(t||"").matchAll(r));if(!n.length)throw new Error(`AI \u54CD\u5E94\u4E2D\u672A\u627E\u5230 <${e}> \u6807\u7B7E`);return String(n[n.length-1][1]||"").trim()}function Hh(t){let e=q_(t),r;try{r=JSON.parse(e)}catch(n){throw new Error(`assistant draft JSON \u89E3\u6790\u5931\u8D25: ${n?.message||"\u672A\u77E5\u9519\u8BEF"}`)}return Y_(r)}function Y_(t){if(St(t,"assistant draft"),t.protocolVersion!==us)throw new Error(`assistant draft.protocolVersion \u5FC5\u987B\u4E3A ${us}`);if(t.mode!==oo)throw new Error(`assistant draft.mode \u975E\u6CD5: ${t.mode}`);if(typeof t.baseFingerprint!="string"||!t.baseFingerprint.trim())throw new Error("assistant draft.baseFingerprint \u7F3A\u5931");if(typeof t.summary!="string")throw new Error("assistant draft.summary \u5FC5\u987B\u662F\u5B57\u7B26\u4E32");if(!Array.isArray(t.warnings))throw new Error("assistant draft.warnings \u5FC5\u987B\u662F\u6570\u7EC4");if(!Array.isArray(t.operations))throw new Error("assistant draft.operations \u5FC5\u987B\u662F\u6570\u7EC4");let e=new Set(Object.values(Je));return t.operations.forEach((r,n)=>{St(r,`operations[${n}]`);let s=String(r.op||"");if(!e.has(s))throw new Error(`operations[${n}] \u5305\u542B\u4E0D\u652F\u6301\u7684\u64CD\u4F5C: ${s}`);if((s.startsWith("patch_table_")||s===Je.MOVE_TABLE)&&Nt(r.tableId,`${s}.tableId`),s===Je.RENAME_TABLE&&Nt(r.newName,`${s}.newName`),s===Je.ADD_TABLE&&(Nt(r.name,`${s}.name`),!Array.isArray(r.columns)||r.columns.length===0))throw new Error(`${s} \u81F3\u5C11\u9700\u8981\u4E00\u4E2A column`);s.startsWith("patch_table_")&&s!==Je.PATCH_LOCKS&&St(r.patch,`${s}.patch`)}),{protocolVersion:us,mode:oo,baseFingerprint:String(t.baseFingerprint||""),summary:String(t.summary||""),warnings:(t.warnings||[]).map(r=>String(r??"")),operations:Pt(t.operations),currentTableId:String(t.currentTableId||"")}}function V_(t,e,r){let n=Nt(e.name,"add_table.name");if(!Array.isArray(e.columns)||e.columns.length===0)throw new Error("add_table \u81F3\u5C11\u9700\u8981\u4E00\u4E2A column");let s=new Set,o=e.columns.map((d,c)=>{let u=Nt(d.title||d.name,`add_table.columns[${c}].title`);return{key:ln(Vo(u,`col_${c+1}`),s),title:u,description:String(d.description??""),type:String(d.type||"text"),required:!!d.required}}),a=e.aiInstructions&&typeof e.aiInstructions=="object"?{note:String(e.aiInstructions.note??e.note??""),init:String(e.aiInstructions.init??""),create:String(e.aiInstructions.create??""),update:String(e.aiInstructions.update??""),delete:String(e.aiInstructions.delete??"")}:{note:String(e.note??""),...Wh()},i={id:Nc("table"),name:n,note:a.note,enabled:!0,aiInstructions:{init:a.init,create:a.create,update:a.update,delete:a.delete},columns:o,rows:[],exportConfig:{enabled:!1,entryName:n,entryType:"constant",splitByRow:!1,keywords:"",injectionTemplate:"",preventRecursion:!0,entryPlacement:{position:"before_character_definition",depth:2,order:0}}},l=String(e.insertAfterTableId||"").trim();if(l){let d=t.tables.findIndex(c=>c.id===l);if(d===-1)throw new Error(`add_table \u7684 insertAfterTableId \u4E0D\u5B58\u5728: ${l}`);t.tables.splice(d+1,0,i)}else t.tables.push(i);return r.addedTables.push({tableId:i.id,name:n}),i.id}function J_(t,e,r){let n=io(t,e.tableId),s=n.name,o=Nt(e.newName,"rename_table.newName");n.name=o,r.renamedTables.push({tableId:e.tableId,beforeName:s,afterName:o})}function X_(t,e,r,n){let s=t.tables.findIndex(a=>a.id===e.tableId);if(s===-1)throw new Error(`\u627E\u4E0D\u5230\u76EE\u6807\u8868: ${e.tableId}`);let o=t.tables[s];r.deletedTables.push({tableId:e.tableId,name:o.name}),n.push({type:"delete_table",label:`\u5220\u9664\u8868: ${o.name}`}),t.tables.splice(s,1)}function Q_(t,e,r){let n=t.tables.findIndex(u=>u.id===e.tableId);if(n===-1)throw new Error(`\u627E\u4E0D\u5230\u76EE\u6807\u8868: ${e.tableId}`);if(+!!e.beforeTableId+ +!!e.afterTableId!==1)throw new Error("move_table \u5FC5\u987B\u4E14\u53EA\u80FD\u63D0\u4F9B beforeTableId \u6216 afterTableId \u4E4B\u4E00");let o=e.beforeTableId||e.afterTableId;if(t.tables.findIndex(u=>u.id===o)===-1)throw new Error(`move_table \u951A\u70B9\u4E0D\u5B58\u5728: ${o}`);if(o===e.tableId)throw new Error("move_table \u4E0D\u80FD\u4EE5\u81EA\u8EAB\u4E3A\u951A\u70B9");let[i]=t.tables.splice(n,1),l=t.tables.findIndex(u=>u.id===o),d=e.beforeTableId?l:l+1;t.tables.splice(d,0,i);let c=t.tables.indexOf(i);r.movedTables.push({tableId:e.tableId,name:i.name,fromIndex:n,toIndex:c})}function Z_(t,e,r){let n=io(t,e.tableId);St(e.patch,`${e.op}.patch`);let s=[];Object.keys(e.patch).forEach(o=>{if(!yl.has(o))throw new Error(`patch_table_ai_instructions.patch \u5305\u542B\u672A\u77E5\u5B57\u6BB5: ${o}`)}),(!n.aiInstructions||typeof n.aiInstructions!="object")&&(n.aiInstructions=Wh()),"note"in e.patch&&(n.note=String(e.patch.note??""),s.push("note")),["init","create","update","delete"].forEach(o=>{o in e.patch&&(n.aiInstructions[o]=String(e.patch[o]??""),s.push(o))}),s.length&&r.patchedAiInstructions.push({tableId:e.tableId,name:n.name,keys:s})}function eE(t,e,r,n){let s=io(t,e.tableId);St(e.patch,`${e.op}.patch`);let o=new Set(["renameColumns","addColumns","deleteColumns"]);Object.keys(e.patch).forEach(p=>{if(!o.has(p))throw new Error(`patch_table_columns.patch \u5305\u542B\u672A\u77E5\u5B57\u6BB5: ${p}`)});let a=[],i=[];(Array.isArray(e.patch.renameColumns)?e.patch.renameColumns:[]).forEach((p,g)=>{St(p,`renameColumns[${g}]`);let m=Nt(p.columnKey,`renameColumns[${g}].columnKey`),h=s.columns.find(w=>w.key===m);if(!h)throw new Error(`renameColumns[${g}] \u6307\u5411\u4E0D\u5B58\u5728\u7684\u5217: ${m}`);let b=Nt(p.newTitle,`renameColumns[${g}].newTitle`);a.push(`\u5217\u6539\u540D: ${h.title} -> ${b}`),h.title=b}),(Array.isArray(e.patch.deleteColumns)?e.patch.deleteColumns:[]).map((p,g)=>{let m=Nt(p,`deleteColumns[${g}]`);if(!s.columns.some(h=>h.key===m))throw new Error(`deleteColumns[${g}] \u6307\u5411\u4E0D\u5B58\u5728\u7684\u5217: ${m}`);return m}).forEach(p=>{s.columns=s.columns.filter(g=>g.key!==p),(s.rows||[]).forEach(g=>{g.cells&&p in g.cells&&delete g.cells[p]}),a.push(`\u5220\u9664\u5217: ${p}`),i.push(`\u5220\u9664\u5217: ${s.name}.${p}`)});let u=Array.isArray(e.patch.addColumns)?e.patch.addColumns:[],y=Fh(s);u.forEach((p,g)=>{St(p,`addColumns[${g}]`);let m=Nt(p.title||p.name,`addColumns[${g}].title`),h=ln(Vo(m,`col_${s.columns.length+1}`),y);s.columns.push({key:h,title:m,description:String(p.description??""),type:String(p.type||"text"),required:!!p.required}),(s.rows||[]).forEach(b=>{b.cells&&(b.cells[h]="")}),a.push(`\u65B0\u589E\u5217: ${m} (${h})`)}),a.length&&r.patchedColumns.push({tableId:e.tableId,name:s.name,changes:a}),i.forEach(p=>{n.push({type:"patch_table_columns",label:p})})}function tE(t,e,r){let n=io(t,e.tableId);St(e.patch,`${e.op}.patch`);let s=new Set(["updateCells","addRows","deleteRowIds"]);Object.keys(e.patch).forEach(u=>{if(!s.has(u))throw new Error(`patch_table_rows.patch \u5305\u542B\u672A\u77E5\u5B57\u6BB5: ${u}`)});let o=[],a=(n.columns||[]).map(u=>u.key);Array.isArray(n.rows)||(n.rows=[]),(Array.isArray(e.patch.updateCells)?e.patch.updateCells:[]).forEach((u,y)=>{St(u,`updateCells[${y}]`);let p=Nt(u.rowId,`updateCells[${y}].rowId`),g=Nt(u.columnKey,`updateCells[${y}].columnKey`),m=n.rows.find(h=>h.id===p);if(!m)throw new Error(`updateCells[${y}] \u6307\u5411\u4E0D\u5B58\u5728\u7684\u884C: ${p}`);if(!a.includes(g))throw new Error(`updateCells[${y}] \u6307\u5411\u4E0D\u5B58\u5728\u7684\u5217: ${g}`);m.cells||(m.cells={}),m.cells[g]=Pt(u.value??""),o.push(`\u6539\u5355\u5143\u683C: ${p}.${g}`)}),(Array.isArray(e.patch.addRows)?e.patch.addRows:[]).forEach((u,y)=>{if(St(u,`addRows[${y}]`),!u.cells||typeof u.cells!="object")throw new Error(`addRows[${y}].cells \u5FC5\u987B\u662F\u5BF9\u8C61`);Object.keys(u.cells).forEach(g=>{if(!a.includes(g))throw new Error(`addRows[${y}] \u5305\u542B\u672A\u77E5\u5217: ${g}`)});let p={id:Pr("row"),name:`\u884C${n.rows.length+1}`,cells:{}};a.forEach(g=>{p.cells[g]=g in u.cells?Pt(u.cells[g]):""}),n.rows.push(p),o.push(`\u65B0\u589E\u884C: ${p.id}`)});let d=Array.isArray(e.patch.deleteRowIds)?e.patch.deleteRowIds:[],c=new Set(d.map(u=>String(u)));if(c.size){let u=n.rows.length;n.rows=n.rows.filter(p=>!c.has(p.id));let y=u-n.rows.length;y>0&&o.push(`\u5220\u9664 ${y} \u884C`)}o.length&&r.patchedRows.push({tableId:e.tableId,name:n.name,changes:o})}function rE(t,e,r){let n=io(t,e.tableId);St(e.patch,`${e.op}.patch`),(!n.exportConfig||typeof n.exportConfig!="object")&&(n.exportConfig={enabled:!1,entryName:n.name,entryType:"constant"});let s=new Set(["enabled","entryName","entryType","splitByRow","keywords","injectionTemplate","preventRecursion"]);Object.keys(e.patch).forEach(a=>{if(!s.has(a))throw new Error(`patch_table_export_config.patch \u5305\u542B\u672A\u77E5\u5B57\u6BB5: ${a}`)}),Object.entries(e.patch).forEach(([a,i])=>{if(a==="entryType"&&!["constant","keyword"].includes(i))throw new Error(`patch_table_export_config.entryType \u5FC5\u987B\u4E3A constant \u6216 keyword\uFF0C\u6536\u5230: ${i}`);n.exportConfig[a]=Pt(i)});let o=Object.keys(e.patch);r.patchedExportConfig.push({tableId:e.tableId,name:n.name,keys:o})}function nE(t,e,r){St(e.patch,`${e.op}.patch`);let n=new Set(["rows","columns","cells"]);Object.keys(e.patch).forEach(d=>{if(!n.has(d))throw new Error(`patch_table_locks.patch \u5305\u542B\u672A\u77E5\u5B57\u6BB5: ${d}`)});let s=io(t,e.tableId),o=[],a={tableId:e.tableId,name:s.name,rows:[],columns:[],cells:[]},i=Array.isArray(s.rows)?s.rows.length:0,l=Fh(s);return(Array.isArray(e.patch.rows)?e.patch.rows:[]).forEach((d,c)=>{if(St(d,`rows[${c}]`),typeof d.rowIndex!="number"||d.rowIndex<0||d.rowIndex>=i)throw new Error(`rows[${c}].rowIndex \u8D8A\u754C`);if(typeof d.locked!="boolean")throw new Error(`rows[${c}].locked \u5FC5\u987B\u662F\u5E03\u5C14\u503C`);a.rows.push({rowIndex:d.rowIndex,locked:d.locked}),o.push(`${d.locked?"\u9501\u5B9A":"\u89E3\u9501"}\u7B2C${d.rowIndex}\u884C`)}),(Array.isArray(e.patch.columns)?e.patch.columns:[]).forEach((d,c)=>{St(d,`columns[${c}]`);let u=Nt(d.columnKey,`columns[${c}].columnKey`);if(!l.has(u))throw new Error(`columns[${c}] \u6307\u5411\u4E0D\u5B58\u5728\u7684\u5217: ${u}`);if(typeof d.locked!="boolean")throw new Error(`columns[${c}].locked \u5FC5\u987B\u662F\u5E03\u5C14\u503C`);a.columns.push({columnKey:u,locked:d.locked}),o.push(`${d.locked?"\u9501\u5B9A":"\u89E3\u9501"}\u5217: ${u}`)}),(Array.isArray(e.patch.cells)?e.patch.cells:[]).forEach((d,c)=>{if(St(d,`cells[${c}]`),typeof d.rowIndex!="number"||d.rowIndex<0||d.rowIndex>=i)throw new Error(`cells[${c}].rowIndex \u8D8A\u754C`);let u=Nt(d.columnKey,`cells[${c}].columnKey`);if(!l.has(u))throw new Error(`cells[${c}] \u6307\u5411\u4E0D\u5B58\u5728\u7684\u5217: ${u}`);if(typeof d.locked!="boolean")throw new Error(`cells[${c}].locked \u5FC5\u987B\u662F\u5E03\u5C14\u503C`);a.cells.push({rowIndex:d.rowIndex,columnKey:u,locked:d.locked}),o.push(`${d.locked?"\u9501\u5B9A":"\u89E3\u9501"}\u5355\u5143\u683C: \u884C${d.rowIndex}.${u}`)}),o.length&&r.patchedLocks.push({tableId:e.tableId,name:s.name,changes:o}),a}function sE(t,e,r,n){St(e.patch,`${e.op}.patch`);let s=[];Object.keys(e.patch).forEach(o=>{if(!zh.has(o))throw new Error(`patch_workbench_config.patch \u5305\u542B\u672A\u77E5\u5B57\u6BB5: ${o}`);t[o]=Pt(e.patch[o]),s.push(o)}),s.length&&(r.patchedWorkbenchConfig.push({keys:s}),n.push({type:"patch_workbench_config",label:`\u4FEE\u6539\u5DE5\u4F5C\u53F0\u914D\u7F6E: ${s.join(", ")}`}))}function cu({config:t,draft:e}){if(!lu(t))throw new Error("\u7F3A\u5C11 config");if(!lu(e)||!Array.isArray(e.operations))throw new Error("\u7F3A\u5C11\u5408\u6CD5 draft.operations");let r=Pt(t),n=ou(),s=[],o=[],a=t.scope?.activeTableId||"";return e.operations.forEach(i=>{let l=String(i.op||"");switch(l){case Je.ADD_TABLE:{a=V_(r,i,n);break}case Je.RENAME_TABLE:J_(r,i,n);break;case Je.DELETE_TABLE:X_(r,i,n,s);break;case Je.MOVE_TABLE:Q_(r,i,n);break;case Je.PATCH_AI_INSTRUCTIONS:Z_(r,i,n);break;case Je.PATCH_COLUMNS:eE(r,i,n,s);break;case Je.PATCH_ROWS:tE(r,i,n);break;case Je.PATCH_EXPORT_CONFIG:rE(r,i,n);break;case Je.PATCH_LOCKS:{let d=nE(r,i,n);(d.rows.length||d.columns.length||d.cells.length)&&o.push(d);break}case Je.PATCH_WORKBENCH_CONFIG:sE(r,i,n,s);break;default:throw new Error(`\u4E0D\u652F\u6301\u7684\u64CD\u4F5C: ${l}`)}}),a&&!r.tables.some(i=>i.id===a)&&(a=r.tables[0]?.id||""),{candidateConfig:r,diff:n,highRiskItems:s,lockChanges:o,focusTableId:a}}function Gh({baselineConfig:t,candidateConfig:e}){let r=ou(),n=[],s=Array.isArray(t?.tables)?t.tables:[],o=Array.isArray(e?.tables)?e.tables:[],a=new Set(s.map(c=>c.id)),i=new Set(o.map(c=>c.id));o.forEach(c=>{a.has(c.id)||r.addedTables.push({tableId:c.id,name:c.name})}),s.forEach(c=>{i.has(c.id)||(r.deletedTables.push({tableId:c.id,name:c.name}),n.push({type:"delete_table",label:`\u5220\u9664\u8868: ${c.name}`}))}),s.forEach(c=>{let u=o.find(w=>w.id===c.id);if(!u)return;c.name!==u.name&&r.renamedTables.push({tableId:c.id,beforeName:c.name,afterName:u.name});let y=(c.columns||[]).map(w=>w.key).sort().join(","),p=(u.columns||[]).map(w=>w.key).sort().join(",");y!==p&&(r.patchedColumns.push({tableId:c.id,name:u.name,changes:["\u5217\u7ED3\u6784\u53D8\u66F4"]}),n.push({type:"patch_table_columns",label:`\u5217\u7ED3\u6784\u53D8\u66F4: ${u.name}`}));let m=nu.filter(w=>JSON.stringify(c.aiInstructions?.[w])!==JSON.stringify(u.aiInstructions?.[w]));m.length&&r.patchedAiInstructions.push({tableId:c.id,name:u.name,keys:m});let b=["enabled","entryName","entryType","splitByRow","keywords","injectionTemplate","preventRecursion"].filter(w=>JSON.stringify(c.exportConfig?.[w])!==JSON.stringify(u.exportConfig?.[w]));b.length&&r.patchedExportConfig.push({tableId:c.id,name:u.name,keys:b})});let d=su.filter(c=>JSON.stringify(t?.[c])!==JSON.stringify(e?.[c]));return d.length&&(r.patchedWorkbenchConfig.push({keys:d}),n.push({type:"patch_workbench_config",label:`\u5DE5\u4F5C\u53F0\u914D\u7F6E\u53D8\u66F4: ${d.join(", ")}`})),{diff:r,highRiskItems:n}}var du=O(()=>{gl();Be();Kc()});function oE(){return["\u4F60\u662F youyou_Toolkit \u586B\u8868\u5DE5\u4F5C\u53F0\u7684\u6539\u8868\u52A9\u624B\u3002",`\u4F60\u53EA\u80FD\u8F93\u51FA\u4E00\u4E2A\u88AB <${_a}> \u548C </${_a}> \u5305\u88F9\u7684 JSON \u5BF9\u8C61\uFF0C\u4E0D\u80FD\u8F93\u51FA\u89E3\u91CA\u6587\u672C\u3002`,`\u4E25\u683C\u4F7F\u7528 protocolVersion=${us}\u3001mode="${oo}"\u3002`,"","\u9876\u5C42 JSON \u5FC5\u987B\u5305\u542B: protocolVersion, mode, baseFingerprint, summary, warnings, operations, currentTableId\u3002","warnings \u5FC5\u987B\u662F\u5B57\u7B26\u4E32\u6570\u7EC4\uFF1B\u6CA1\u6709\u5219\u8F93\u51FA\u7A7A\u6570\u7EC4\u3002","","\u53EA\u5141\u8BB8\u4EE5\u4E0B 10 \u79CD\u64CD\u4F5C:",...Object.values(Je).map(t=>`  - ${t}`),"",'\u6BCF\u4E2A operations[i] \u5FC5\u987B\u4F7F\u7528 "op" \u5B57\u6BB5\u8868\u793A\u64CD\u4F5C\u540D\uFF1B\u7981\u6B62\u4F7F\u7528 type/operation/action \u7B49\u522B\u540D\u3002',"","--- add_table ---","\u5FC5\u987B\u63D0\u4F9B\u975E\u7A7A name \u548C\u81F3\u5C11\u4E00\u4E2A columns \u9879\u3002","\u6BCF\u4E2A column \u81F3\u5C11\u6709 title \u5B57\u6BB5\u3002","\u5E94\u5C3D\u91CF\u540C\u65F6\u63D0\u4F9B aiInstructions\uFF08init/create/update/delete\uFF09\u8BA9\u65B0\u8868\u7ACB\u523B\u53EF\u7528\u3002","\u4E0D\u8981\u751F\u6210 tableId\uFF0C\u672C\u5730\u4F1A\u81EA\u52A8\u751F\u6210\u3002",'\u5982\u679C\u7528\u6237\u53EA\u8BF4"\u65B0\u589E\u67D0\u67D0\u8868"\u4F46\u6CA1\u7ED9\u8868\u5934\uFF0C\u6839\u636E\u8868\u540D\u8BED\u4E49\u751F\u6210\u5408\u7406\u901A\u7528\u7684 columns\u3002',"\u9ED8\u8BA4\u4F18\u5148 add_table + \u5B8C\u6574 aiInstructions\uFF1B\u9664\u975E\u7528\u6237\u660E\u786E\u8981\u6C42 DDL \u6216\u5B57\u6BB5\u7C7B\u578B\u7EA6\u675F\uFF0C\u5426\u5219\u4E0D\u8981\u8F93\u51FA patch_table_columns \u6765\u8865\u5217\u3002","","--- patch_table_ai_instructions ---",`\u53EA\u5141\u8BB8 patch: { ${[...yl].join(", ")} }\u3002`,"","--- patch_table_columns ---","patch \u53EA\u5141\u8BB8: renameColumns[], addColumns[], deleteColumns[]\u3002","renameColumns \u4E2D\u7528 columnKey\uFF08\u4E0D\u662F title\uFF09\u5B9A\u4F4D\u5217\uFF0C\u63D0\u4F9B newTitle\u3002","addColumns \u4E2D\u6BCF\u4E2A\u9879\u81F3\u5C11\u6709 title\u3002","deleteColumns \u4E2D\u662F columnKey \u5B57\u7B26\u4E32\u6570\u7EC4\u3002","","--- patch_table_rows ---","patch \u53EA\u5141\u8BB8: updateCells[], addRows[], deleteRowIds[]\u3002","updateCells \u7528 rowId\uFF08\u4E0D\u662F\u884C\u53F7\uFF09\u5B9A\u4F4D\u884C\uFF0C\u7528 columnKey \u5B9A\u4F4D\u5217\uFF0C\u63D0\u4F9B value\u3002","addRows \u4E2D\u6BCF\u4E2A\u9879\u6709 cells: { [columnKey]: value }\u3002","deleteRowIds \u662F rowId \u5B57\u7B26\u4E32\u6570\u7EC4\u3002","","--- patch_table_export_config ---","patch \u53EA\u5141\u8BB8: enabled, entryName, entryType, splitByRow, keywords, injectionTemplate, preventRecursion\u3002","","--- patch_table_locks ---","patch \u53EA\u5141\u8BB8: rows[], columns[], cells[]\u3002","rows \u4E2D\u7528 rowIndex(0-based) + locked(boolean)\u3002","columns \u4E2D\u7528 columnKey + locked(boolean)\u3002","cells \u4E2D\u7528 rowIndex + columnKey + locked(boolean)\u3002","","--- patch_workbench_config ---","patch \u53EA\u5141\u8BB8: contextDepth, contextRoles, sendLatestRows, runScope, mirrorToMessage, mirrorTag, fillMode, autoUpdateEnabled, autoUpdateTrigger\u3002","","--- \u901A\u7528\u89C4\u5219 ---","\u5982\u679C\u9700\u6C42\u4FE1\u606F\u4E0D\u8DB3\u6216\u65E0\u6CD5\u751F\u6210\u5408\u6CD5\u64CD\u4F5C\uFF0C\u8FD4\u56DE\u7A7A operations\uFF0Csummary \u8BF4\u660E\u539F\u56E0\uFF0Cwarnings \u5199\u660E\u539F\u56E0\u3002\u4E0D\u8981\u8F93\u51FA\u8FFD\u95EE\u6587\u672C\u3002","\u4E25\u683C\u7981\u6B62\u4EFB\u4F55\u76F4\u63A5\u4FDD\u5B58\u884C\u4E3A\u3002","patch \u5BF9\u8C61\u53EA\u80FD\u586B\u5199\u5F53\u524D\u7ED3\u6784\u91CC\u771F\u5B9E\u5B58\u5728\u7684 tableId\u3001columnKey\u3001rowId\uFF1B\u4E0D\u8981\u731C\u6D4B\u672A\u77E5\u5B57\u6BB5\u3002","move_table \u53EA\u80FD\u63D0\u4F9B beforeTableId \u6216 afterTableId \u4E4B\u4E00\u3002","","=== \u6570\u636E\u6A21\u578B\u8BED\u4E49 ===","","\u8868\u683C (table) \u9876\u5C42\u5B57\u6BB5:","  id: \u53EA\u8BFB\uFF0C\u7531\u7CFB\u7EDF\u81EA\u52A8\u751F\u6210\u7684\u552F\u4E00\u6807\u8BC6\u7B26\u3002","  name: \u8868\u7684\u663E\u793A\u540D\u79F0\uFF08\u4E2D\u6587\uFF09\u3002","  note: \u8868\u7684\u7528\u9014\u63CF\u8FF0\uFF08\u7B49\u540C aiInstructions.note\uFF09\u3002","  enabled: boolean\uFF0C\u8BE5\u8868\u662F\u5426\u53C2\u4E0E\u81EA\u52A8\u586B\u8868\u3002","  columns[]: \u5217\u5B9A\u4E49\u6570\u7EC4\u3002","  rows[]: \u884C\u6570\u636E\u6570\u7EC4\u3002","  aiInstructions{}: AI \u64CD\u4F5C\u6307\u4EE4\u96C6\u3002","  exportConfig{}: \u4E16\u754C\u4E66\u6CE8\u5165\u5BFC\u51FA\u914D\u7F6E\u3002","","\u5217 (column) \u5B57\u6BB5:","  key: \u53EA\u8BFB\uFF0C\u7CFB\u7EDF\u4ECE title \u81EA\u52A8\u6D3E\u751F\u7684\u552F\u4E00\u6807\u8BC6\uFF08\u4E2D\u6587 title \u53EF\u80FD\u751F\u6210 col_1 \u683C\u5F0F\uFF09\u3002","  title: \u5217\u6807\u9898\uFF08\u9762\u5411\u7528\u6237\u7684\u663E\u793A\u540D\uFF09\u3002","  description: \u5217\u8BF4\u660E\u3002","  type: \u5217\u7C7B\u578B\u679A\u4E3E \u2014 text | number | boolean | date | json\uFF0C\u9ED8\u8BA4 text\u3002","  required: boolean\uFF0C\u8BE5\u5217\u662F\u5426\u5FC5\u586B\u3002","","\u884C (row) \u5B57\u6BB5:","  id: \u53EA\u8BFB\uFF0C\u7CFB\u7EDF\u81EA\u52A8\u751F\u6210\u7684\u552F\u4E00\u6807\u8BC6\u7B26\uFF08\u4E0D\u900F\u660E\u5B57\u7B26\u4E32\uFF0C\u975E\u6570\u5B57\u7D22\u5F15\uFF09\u3002",'  name: \u884C\u6807\u8BC6\uFF08\u5982"\u884C1"\uFF09\u3002',"  cells: { [columnKey]: string }\uFF0C\u6240\u6709\u503C\u90FD\u662F\u5B57\u7B26\u4E32\u3002","","aiInstructions \u5B57\u6BB5\u8BED\u4E49:","  note: \u8868\u7528\u9014\u63CF\u8FF0\uFF08\u5F71\u54CD AI \u5BF9\u8868\u7684\u7406\u89E3\uFF09\u3002","  init: \u521D\u59CB\u5316\u6307\u4EE4 \u2014 \u9996\u6B21\u586B\u5145\u65F6\u5982\u4F55\u751F\u6210\u884C\u3002","  create: \u65B0\u589E\u884C\u6307\u4EE4 \u2014 \u4EC0\u4E48\u6761\u4EF6\u4E0B\u65B0\u589E\u4E00\u884C\u3001\u683C\u5F0F\u8981\u6C42\u3002","  update: \u66F4\u65B0\u884C\u6307\u4EE4 \u2014 \u4EC0\u4E48\u6761\u4EF6\u4E0B\u4FEE\u6539\u5DF2\u6709\u884C\u3001\u54EA\u4E9B\u5217\u53EF\u6539\u3002","  delete: \u5220\u9664\u884C\u6307\u4EE4 \u2014 \u4EC0\u4E48\u6761\u4EF6\u4E0B\u5220\u9664\u884C\u3002","","exportConfig \u5B57\u6BB5\u8BED\u4E49:","  enabled: boolean\uFF0C\u662F\u5426\u5C06\u8BE5\u8868\u6570\u636E\u5199\u5165\u4E16\u754C\u4E66\u6761\u76EE\u3002","  entryName: \u4E16\u754C\u4E66\u6761\u76EE\u540D\u79F0\u3002","  entryType: \u6761\u76EE\u7C7B\u578B\u679A\u4E3E \u2014 constant | keyword\u3002","  splitByRow: boolean\uFF0C\u662F\u5426\u6BCF\u884C\u751F\u6210\u72EC\u7ACB\u6761\u76EE\u3002","  keywords: \u89E6\u53D1\u5173\u952E\u8BCD\u3002","  injectionTemplate: \u6CE8\u5165\u6A21\u677F\uFF08\u652F\u6301 {{columnKey}} \u53D8\u91CF\uFF09\u3002","  preventRecursion: boolean\uFF0C\u9ED8\u8BA4 true\uFF0C\u9632\u6B62\u9012\u5F52\u6CE8\u5165\u3002","","\u5DE5\u4F5C\u53F0\u914D\u7F6E\u5B57\u6BB5\u503C\u57DF:","  contextDepth: 0-50\uFF0C\u5411\u524D\u8BFB\u53D6\u7684\u6D88\u606F\u6761\u6570\u3002",'  contextRoles: "all" | "assistant_only"\uFF0C\u8BFB\u53D6\u54EA\u4E9B\u89D2\u8272\u7684\u6D88\u606F\u3002',"  sendLatestRows: \u53D1\u9001\u7ED9 AI \u7684\u6700\u65B0 N \u884C\u6570\u636E\uFF080=\u5168\u90E8\uFF09\u3002",'  runScope: "enabled" | "selected" | "current"\uFF0C\u81EA\u52A8\u586B\u8868\u8303\u56F4\u3002','  fillMode: "incremental" | "full"\uFF0C\u589E\u91CF\u6216\u5168\u91CF\u586B\u5145\u6A21\u5F0F\u3002',"  mirrorToMessage: boolean\uFF0C\u662F\u5426\u5C06\u6570\u636E\u955C\u50CF\u5199\u56DE\u6D88\u606F\u3002","  mirrorTag: \u955C\u50CF\u6807\u7B7E\u540D\u3002","  autoUpdateEnabled: boolean\uFF0C\u662F\u5426\u542F\u7528\u81EA\u52A8\u586B\u8868\u3002","  autoUpdateTrigger: \u81EA\u52A8\u89E6\u53D1\u6761\u4EF6\u3002","","=== \u64CD\u4F5C\u793A\u4F8B ===","","\u793A\u4F8B 1 \u2014 add_table\uFF08\u65B0\u589E\u8868\uFF0C\u542B\u5B8C\u6574\u7ED3\u6784\u548C AI \u6307\u4EE4\uFF09:","{",'  "op": "add_table",','  "name": "\u6218\u5229\u54C1\u8868",','  "columns": [','    { "title": "\u7269\u54C1\u540D", "type": "text", "required": true },','    { "title": "\u7A00\u6709\u5EA6", "type": "text" },','    { "title": "\u6570\u91CF", "type": "number" }',"  ],",'  "aiInstructions": {','    "note": "\u8BB0\u5F55\u89D2\u8272\u83B7\u5F97\u7684\u6218\u5229\u54C1",','    "init": "\u6839\u636E\u5267\u60C5\u5185\u5BB9\u521D\u59CB\u5316\u89D2\u8272\u5DF2\u6709\u7684\u7269\u54C1",','    "create": "\u5F53\u89D2\u8272\u83B7\u5F97\u65B0\u7269\u54C1\u65F6\u65B0\u589E\u884C",','    "update": "\u5F53\u7269\u54C1\u6570\u91CF\u6216\u7A00\u6709\u5EA6\u53D8\u5316\u65F6\u66F4\u65B0\u5BF9\u5E94\u884C",','    "delete": "\u5F53\u7269\u54C1\u88AB\u6D88\u8017\u6216\u4E22\u5931\u65F6\u5220\u9664\u5BF9\u5E94\u884C"',"  }","}","","\u793A\u4F8B 2 \u2014 patch_table_ai_instructions:","{",'  "op": "patch_table_ai_instructions",','  "tableId": "table_abc123",','  "patch": { "create": "\u5F53\u65B0\u89D2\u8272\u767B\u573A\u6216\u65B0\u7269\u54C1\u83B7\u5F97\u65F6\u65B0\u589E\u884C", "note": "\u8BB0\u5F55\u89D2\u8272\u7269\u54C1\u548C\u6218\u5229\u54C1" }',"}","","\u793A\u4F8B 3 \u2014 patch_table_columns:","{",'  "op": "patch_table_columns",','  "tableId": "table_abc123",','  "patch": {','    "renameColumns": [{ "columnKey": "col_1", "newTitle": "\u7269\u54C1\u540D\u79F0" }],','    "addColumns": [{ "title": "\u6765\u6E90", "type": "text" }],','    "deleteColumns": ["col_5"]',"  }","}","","=== \u6CE8\u610F\u4E8B\u9879 ===","- columnKey \u4ECE title \u81EA\u52A8\u6D3E\u751F\uFF0C\u4E2D\u6587 title \u7684 key \u901A\u5E38\u4E0D\u662F\u4E2D\u6587\uFF08\u5982 col_1\u3001col_2\uFF09\u3002\u5B9A\u4F4D\u5217\u65F6\u52A1\u5FC5\u7528 userPrompt \u4E2D\u63D0\u4F9B\u7684 column.key \u503C\u3002",'- rowId \u662F\u4E0D\u900F\u660E\u5B57\u7B26\u4E32\uFF08\u5982 "row_x7k9m2"\uFF09\uFF0C\u4E0D\u53EF\u7528\u884C\u53F7\u4EE3\u66FF\u3002','- cells \u4E2D\u6240\u6709\u503C\u90FD\u662F\u5B57\u7B26\u4E32\u7C7B\u578B\uFF0C\u6570\u5B57\u4E5F\u5199\u4F5C "42"\u3002',"- exportConfig.preventRecursion \u9ED8\u8BA4\u5E94\u4E3A true\u3002","- add_table \u4E0D\u8981\u751F\u6210 tableId\uFF0C\u672C\u5730\u81EA\u52A8\u751F\u6210\u3002","- \u6CE8\u5165\u6A21\u677F injectionTemplate \u4E2D\u7528 {{columnKey}} \u5F15\u7528\u5217\u503C\u3002"].join(`
`)}function aE(t,e,r){let n=t.config,s=t.currentTableId||"",o=Array.isArray(n?.tables)?n.tables:[],a=o.find(d=>d.id===s)||null,i=o.map(d=>({tableId:d.id,name:d.name,note:d.note||"",enabled:d.enabled,columns:(d.columns||[]).map(c=>({key:c.key,title:c.title,type:c.type||"text"})),aiInstructions:d.aiInstructions||{},exportConfig:d.exportConfig||{},rowCount:Array.isArray(d.rows)?d.rows.length:0,rows:r?.[d.id]||void 0})),l={userRequest:wn(t.userRequest),baseFingerprint:e,currentTableId:s,currentTable:a?{tableId:a.id,name:a.name,note:a.note||"",columns:(a.columns||[]).map(d=>({key:d.key,title:d.title,type:d.type||"text"})),aiInstructions:a.aiInstructions||{},exportConfig:a.exportConfig||{},rowCount:Array.isArray(a.rows)?a.rows.length:0,rowIds:(a.rows||[]).map(d=>d.id),rows:r?.[a.id]||void 0}:null,allTables:i,workbenchConfig:{contextDepth:n.contextDepth,contextRoles:n.contextRoles,sendLatestRows:n.sendLatestRows,runScope:n.runScope||n.scope?.mode,fillMode:n.fillMode,autoUpdateEnabled:n.autoUpdateEnabled,mirrorToMessage:n.mirrorToMessage}};try{return JSON.stringify(l,null,0)}catch{return"{}"}}function iE({userRequest:t,round:e,maxRounds:r,repairReason:n}){let s=[wn(t)];return e>1&&s.push(`\u8865\u5145\u8BF4\u660E\uFF1A\u5F53\u524D\u662F\u7B2C ${e}/${r} \u8F6E\uFF0C\u8F93\u5165\u6570\u636E\u5DF2\u7ECF\u5305\u542B\u524D\u9762\u8F6E\u6B21\u4EA7\u751F\u7684\u8349\u7A3F\u7ED3\u679C\u3002\u8BF7\u53EA\u7EE7\u7EED\u672A\u5B8C\u6210\u7684\u6539\u52A8\uFF1B\u5982\u679C\u5DF2\u7ECF\u65E0\u9700\u7EE7\u7EED\u4FEE\u6539\uFF0C\u8BF7\u8FD4\u56DE\u7A7A operations\u3002`),n&&s.push(`\u4FEE\u590D\u8981\u6C42\uFF1A\u4E0A\u4E00\u8F6E\u8349\u7A3F\u672A\u901A\u8FC7\u672C\u5730\u6821\u9A8C\uFF0C\u539F\u56E0\u662F\uFF1A${n}\u3002\u8BF7\u4FEE\u590D\u8349\u7A3F\u5E76\u7EE7\u7EED\u5B8C\u6210\u9700\u6C42\uFF0C\u4ECD\u7136\u53EA\u80FD\u8F93\u51FA\u5408\u6CD5 draft JSON\u3002`),s.filter(Boolean).join(`

`)}async function lE(t,e){let r=t.config,n=wn(t.userRequest);if(!n)throw new Error("\u8BF7\u8F93\u5165\u6539\u8868\u9700\u6C42");let s=await Ea(r),o=[{role:"system",content:oE()},...(t.priorTurns||[]).flatMap(c=>{let u=[];return c.user&&u.push({role:"user",content:c.user}),c.assistant&&u.push({role:"assistant",content:c.assistant}),u}),{role:"user",content:aE(t,s,t.dataContext)}],a=wn(t.apiPreset||r?.apiPreset),i=await Eo(a||"",o,{},e);if(!i)throw new Error("AI \u672A\u8FD4\u56DE\u6709\u6548\u5185\u5BB9");let l;try{l=Hh(i)}catch(c){throw vn.error("draft \u89E3\u6790\u5931\u8D25",{userRequest:n,error:c?.message,aiRawText:i}),c}if(l.baseFingerprint!==s)throw new Error("AI \u8FD4\u56DE\u7684 baseFingerprint \u4E0E\u5F53\u524D\u7ED3\u6784\u4E0D\u4E00\u81F4");let d=cu({config:r,draft:l});return{draft:l,aiRawText:i,messages:o,compileResult:d,originalBaseFingerprint:s}}async function qh(t){let e=t.config,r=wn(t.userRequest);if(!r)throw new Error("\u8BF7\u8F93\u5165\u6539\u8868\u9700\u6C42");let n=fl(t.maxRounds,Kh),s=Uh(t.maxRepairRetries,jh),o=Pt(e),a=await Ea(o),i=[],l=cE(t.priorTurns),d=Pt(o),c=a,u=ao.MAX_ROUNDS,y=0,p="",g=null,m=null;function h(){let _=t.guard;if(_?.isCancelled?.())throw new ps("cancelled");if(_?.isStale?.())throw new ps("stale")}function b(){if(m){try{m.abort()}catch{}m=null}}e:for(let _=1;_<=n;_+=1){let k="";for(;;){h(),b(),m=new AbortController;let v=iE({userRequest:r,round:_,maxRounds:n,repairReason:k});try{let C=[...l,...i.map(U=>({user:U.userRequest,assistant:U.aiRawText}))],R=await lE({config:d,currentTableId:t.currentTableId,userRequest:v,priorTurns:C,apiPreset:t.apiPreset,dataContext:t.dataContext},m.signal);h(),g=R;let L=R.draft.operations.length>0,N=L?Pt(R.compileResult.candidateConfig):Pt(d),E=L?await Ea(N):c,P={round:_,userRequest:v,draft:R.draft,aiRawText:R.aiRawText,messages:R.messages,perRoundCompileResult:R.compileResult,workingFingerprint:E};if(i.push(P),t.onRoundComplete?.({round:Pt(P),rounds:Pt(i),maxRounds:n}),!L){u=ao.EMPTY_OPERATIONS;break e}if(d=N,E===c){u=ao.REPEATED_FINGERPRINT;break e}if(c=E,p="",_===n){u=ao.MAX_ROUNDS;break e}break}catch(C){if(h(),C instanceof ps)throw C;if(p=C?.message||"\u672A\u77E5\u9519\u8BEF",y>=s){u=ao.REPAIR_RETRY_CAPPED;break e}y+=1,k=p}}}b();let w=i.length>0?i[i.length-1].perRoundCompileResult:cu({config:d,draft:au(a)}),S={originalBaseFingerprint:a,finalWorkingFingerprint:c,stopReason:u,roundsExecuted:i.length,maxRounds:n,repairRetriesUsed:y,maxRepairRetries:s,lastErrorMessage:p};return{draft:g?.draft||au(a,t.currentTableId),aiRawText:g?.aiRawText||"",messages:g?.messages||[],compileResult:w,originalBaseFingerprint:a,rounds:i,session:S,targetSnapshot:t.targetSnapshot||null}}function cE(t){return Array.isArray(t)?t.map(e=>({user:wn(e?.user),assistant:wn(e?.assistant)})).filter(e=>e.user||e.assistant):[]}async function Yh(t){try{let e=await Ea(be()),r=t.originalBaseFingerprint||t.draft?.baseFingerprint||"";if(!r||e!==r)return vn.warn("applyAssistantResult: fingerprint \u4E0D\u5339\u914D\uFF0C\u8349\u7A3F\u5DF2\u8FC7\u671F"),!1;let n=Ze(t.compileResult.candidateConfig);if(n&&typeof n=="object"&&n.success===!1)return vn.error("applyAssistantResult: saveTableWorkbenchConfig \u5931\u8D25",n),!1;if(t.compileResult.lockChanges?.length){let l={chatId:"",isolationKey:ae.isEnabled()?ae.getKey():""};t.compileResult.lockChanges.forEach(d=>{d.rows?.forEach(c=>{ol(l,d.tableId,c.rowIndex,c.locked)}),d.columns?.forEach(c=>{al(l,d.tableId,c.columnKey,c.locked)}),d.cells?.forEach(c=>{il(l,d.tableId,c.rowIndex,c.columnKey,c.locked)})})}let s=t.rounds||[],o=t.compileResult?.diff?.patchedRows?.length>0;return(s.some(i=>i.draft?.operations?.some(l=>l.op===Je.PATCH_ROWS))||o)&&t.targetSnapshot&&await dE(t),vn.info("applyAssistantResult: \u8349\u7A3F\u5DF2\u5E94\u7528",{tables:t.compileResult.candidateConfig?.tables?.length}),!0}catch(e){return vn.error("applyAssistantResult \u5F02\u5E38",e),!1}}async function dE(t){let e=t.targetSnapshot,r=[];for(let n of t.rounds||[]){let s=(n.draft?.operations||[]).filter(o=>o.op===Je.PATCH_ROWS);r.push(...s)}if(!r.length){let n=(t.draft?.operations||[]).filter(s=>s.op===Je.PATCH_ROWS);r.push(...n)}if(r.length)try{let n=Zi(e);if(!n?.tables?.length){vn.info("applyRowPatchesToBoundState: boundState \u4E3A\u7A7A\uFF0C\u8DF3\u8FC7\u884C\u6570\u636E\u5E94\u7528");return}let s=le(n.tables);for(let o of r){let a=s.find(l=>l.id===o.tableId);if(!a)continue;Array.isArray(a.rows)||(a.rows=[]);let i=o.patch;if(i.updateCells?.length)for(let l of i.updateCells){let d=a.rows.find(c=>c.id===l.rowId);d&&l.columnKey&&(d.cells=d.cells||{},d.cells[l.columnKey]=String(l.value??""))}if(i.addRows?.length){let l=new Set((a.columns||[]).map(d=>d.key));for(let d of i.addRows){let c=Pr("row"),u={};for(let[y,p]of Object.entries(d.cells||{}))l.has(y)&&(u[y]=String(p??""));a.rows.push({id:c,name:d.name||c,cells:u})}}if(i.deleteRowIds?.length){let l=new Set(i.deleteRowIds);a.rows=a.rows.filter(d=>!l.has(d.id))}}await no(e,{...n,tables:s},{skipFreshValidation:!0}),vn.info("applyRowPatchesToBoundState: \u884C\u6570\u636E\u5DF2\u5E94\u7528\u5230 boundState",{ops:r.length})}catch(n){vn.error("applyRowPatchesToBoundState \u5931\u8D25",n)}}var vn,ps,Vh=O(()=>{Co();Y();Jt();os();Be();ll();$r();du();gl();vn=I.createScope("TableAssistant");ps=class extends Error{constructor(e){super(e==="cancelled"?"\u6539\u8868\u52A9\u624B\u4F1A\u8BDD\u5DF2\u53D6\u6D88":"\u6539\u8868\u52A9\u624B\u4F1A\u8BDD\u5DF2\u8FC7\u671F"),this.name="AssistantSessionStoppedError",this.stopReason=e}}});function uE(){try{if(window.parent&&window.parent!==window&&window.parent.document)return window.parent.document}catch{}return document}function hl(){return`turn_${Date.now()}_${Math.random().toString(36).slice(2,8)}`}function st(t){let e=document.createElement("div");return e.textContent=String(t??""),e.innerHTML}function pE(){let t=be(),e=t?.scope?.activeTableId||"",r=(t?.tables||[]).find(n=>n.id===e);return!e||!r?"\u5F53\u524D\u672A\u9009\u4E2D\u8868":`${r.name} (${e})`}function Xh(t){if(!t)return"";let e=[];t.addedTables?.length&&e.push(`\u65B0\u589E${t.addedTables.length}\u8868`),t.deletedTables?.length&&e.push(`\u5220\u9664${t.deletedTables.length}\u8868`),t.renamedTables?.length&&e.push(`\u91CD\u547D\u540D${t.renamedTables.length}\u8868`),t.movedTables?.length&&e.push(`\u79FB\u52A8${t.movedTables.length}\u8868`);let r=(t.patchedAiInstructions?.length||0)+(t.patchedColumns?.length||0)+(t.patchedRows?.length||0)+(t.patchedExportConfig?.length||0)+(t.patchedLocks?.length||0)+(t.patchedWorkbenchConfig?.length||0);return r&&e.push(`\u4FEE\u6539${r}\u5904`),e.length?e.join(" \xB7 "):"\u65E0\u53D8\u66F4"}function Qh(t){if(!t)return"";let e=[],r=n=>n.length?`<ul>${n.map(s=>`<li>${st(s)}</li>`).join("")}</ul>`:'<div class="yyt-assistant-hint">\u65E0</div>';return t.addedTables?.length&&e.push(`<div><strong>\u65B0\u589E\u8868</strong>${r(t.addedTables.map(n=>`${n.name} [${n.tableId}]`))}</div>`),t.deletedTables?.length&&e.push(`<div><strong>\u5220\u9664\u8868</strong>${r(t.deletedTables.map(n=>`${n.name} [${n.tableId}]`))}</div>`),t.renamedTables?.length&&e.push(`<div><strong>\u91CD\u547D\u540D</strong>${r(t.renamedTables.map(n=>`${n.beforeName} -> ${n.afterName}`))}</div>`),t.patchedAiInstructions?.length&&e.push(`<div><strong>AI \u6307\u4EE4\u53D8\u66F4</strong>${r(t.patchedAiInstructions.map(n=>`${n.name}: ${n.keys.join(", ")}`))}</div>`),t.patchedColumns?.length&&e.push(`<div><strong>\u5217\u7ED3\u6784\u53D8\u66F4</strong>${r(t.patchedColumns.map(n=>`${n.name}: ${n.changes.join("\uFF1B")}`))}</div>`),t.patchedRows?.length&&e.push(`<div><strong>\u884C\u6570\u636E\u53D8\u66F4</strong>${r(t.patchedRows.map(n=>`${n.name}: ${n.changes.join("\uFF1B")}`))}</div>`),t.patchedExportConfig?.length&&e.push(`<div><strong>\u5BFC\u51FA\u914D\u7F6E\u53D8\u66F4</strong>${r(t.patchedExportConfig.map(n=>`${n.name}: ${n.keys.join(", ")}`))}</div>`),t.patchedLocks?.length&&e.push(`<div><strong>\u9501\u53D8\u66F4</strong>${r(t.patchedLocks.map(n=>`${n.name}: ${n.changes.join("\uFF1B")}`))}</div>`),t.patchedWorkbenchConfig?.length&&e.push(`<div><strong>\u5DE5\u4F5C\u53F0\u914D\u7F6E\u53D8\u66F4</strong>${r(t.patchedWorkbenchConfig.map(n=>n.keys.join(", ")))}</div>`),e.join("")}function yE(t){let e=t.compileResult?.highRiskItems||[];return e.length?e.map((r,n)=>{let s=t.riskConfirmations?.[String(n)]!==!1;return`<label class="yyt-assistant-risk-item"><input type="checkbox" class="yyt-assistant-risk-cb" data-turn-id="${st(t.id)}" data-risk-idx="${n}" ${s?"checked":""}><span>${st(r.label)}</span></label>`}).join(""):'<div class="yyt-assistant-hint">\u65E0\u9AD8\u98CE\u9669\u64CD\u4F5C</div>'}function fE(){return ot.length?ot.map((t,e)=>{let r=e===ot.length-1;if(t.type==="user")return`<div class="yyt-assistant-bubble yyt-assistant-bubble-user"><div class="yyt-assistant-label">\u4F60</div><div class="yyt-assistant-content">${st(t.content)}</div></div>`;if(t.type==="error")return`<div class="yyt-assistant-bubble yyt-assistant-bubble-error"><div class="yyt-assistant-label" style="color:#ff8888;">\u6267\u884C\u9519\u8BEF</div><div class="yyt-assistant-content">${st(t.errorMessage)}</div></div>`;if(t.type==="assistant"){let n=t.draft,s=t.compileResult,o=n?.summary||"\uFF08\u65E0\u6458\u8981\uFF09",a=n?.warnings||[],i=Xh(s?.diff),l=!!t.isFinal,d=s?.highRiskItems?.length||0,c=d===0||t.riskConfirmations&&s.highRiskItems.every((m,h)=>t.riskConfirmations[String(h)]!==!1),u=r&&l,y=t.expanded||!1,p=t.sessionInfo||"",g='<div class="yyt-assistant-bubble yyt-assistant-bubble-ai">';if(g+=`<div class="yyt-assistant-label">AI \u52A9\u624B${p?` \xB7 ${st(p)}`:""}</div>`,g+=`<div class="yyt-assistant-content">${st(o)}</div>`,g+=`<div class="yyt-assistant-toggle" data-turn-id="${st(t.id)}">${y?"\u25BC":"\u25B6"} \u8BE6\u60C5 (${st(i)})</div>`,g+=`<div class="yyt-assistant-detail" data-turn-id="${st(t.id)}" style="display:${y?"block":"none"};">`,a.length&&(g+=`<div><strong>\u8B66\u544A</strong><ul>${a.map(m=>`<li>${st(m)}</li>`).join("")}</ul></div>`),g+=Qh(s?.diff),l&&d>0?g+=`<div><strong>\u9AD8\u98CE\u9669\u786E\u8BA4</strong><div class="yyt-assistant-risk-list">${yE(t)}</div></div>`:d>0&&(g+=`<div><strong>\u9AD8\u98CE\u9669\u9879</strong><ul>${s.highRiskItems.map(m=>`<li>${st(m.label)}</li>`).join("")}</ul></div>`),l&&t.cumulativeDiff){let m=Xh(t.cumulativeDiff);m&&m!=="\u65E0\u53D8\u66F4"&&(g+=`<div class="yyt-assistant-cumulative"><strong>\u7D2F\u79EF\u53D8\u66F4</strong> ${st(m)}`,g+=`<div class="yyt-assistant-cumulative-detail">${Qh(t.cumulativeDiff)}</div>`,g+="</div>")}return g+="</div>",u&&(g+=`<button class="yyt-btn yyt-btn-primary yyt-btn-small yyt-assistant-apply-btn" type="button" data-turn-id="${st(t.id)}" ${c?"":"disabled"}>\u5E94\u7528\u5230\u5DE5\u4F5C\u53F0</button>`),g+="</div>",g}return""}).join(""):'<div class="yyt-assistant-empty">AI \u6539\u8868\u52A9\u624B\u5DF2\u5C31\u7EEA\u3002\u8F93\u5165\u4FEE\u6539\u9700\u6C42\u540E\u53D1\u9001\u3002</div>'}function gE(){let t=[];try{t=jl()||[]}catch{}return[{value:"",label:"\u8DDF\u968F\u586B\u8868\u5DE5\u4F5C\u53F0"},...t.map(e=>({value:e,label:e}))]}function mE(){return gE().map(t=>`<option value="${st(t.value)}" ${String(t.value)===mu?"selected":""}>${st(t.label)}</option>`).join("")}function hE(){let t=lo||!uo.trim();return`
    <div id="yyt-assistant-panel" class="yyt-assistant-panel">
      <div class="yyt-assistant-header">
        <div>
          <div class="yyt-assistant-title">AI \u6539\u8868\u52A9\u624B</div>
          <div class="yyt-assistant-hint">\u5F53\u524D\u8868\uFF1A${st(pE())}</div>
        </div>
        <button class="yyt-btn yyt-btn-secondary yyt-btn-small" type="button" data-action="close-assistant">\u5173\u95ED</button>
      </div>
      <div class="yyt-assistant-chat">
        ${fE()}
      </div>
      <div class="yyt-assistant-footer">
        <div id="yyt-assistant-control-slot" class="yyt-assistant-controls">
          <label class="yyt-assistant-inline-field" for="yyt-assistant-preset">
            <span>API \u9884\u8BBE</span>
            <select class="yyt-select yyt-assistant-preset-select" id="yyt-assistant-preset">${mE()}</select>
          </label>
          <label class="yyt-assistant-inline-field" for="yyt-assistant-max-rounds">
            <span>\u6700\u5927\u8F6E\u6B21</span>
            <input class="yyt-input yyt-assistant-rounds-input" id="yyt-assistant-max-rounds" type="number" min="1" value="${st(gu)}">
          </label>
        </div>
        <textarea class="yyt-textarea yyt-assistant-textarea" id="yyt-assistant-input" placeholder="\u4F8B\u5982\uFF1A\u65B0\u589E\u4E00\u5F20\u6218\u5229\u54C1\u8868\uFF0C\u5173\u95ED\u80CC\u5305\u7269\u54C1\u8868\u7684\u72EC\u7ACB\u5BFC\u51FA\u3002">${st(uo)}</textarea>
        <div class="yyt-assistant-actions">
          <button class="yyt-btn yyt-btn-primary" id="yyt-assistant-send" type="button" ${t?"disabled":""}>${lo?"\u751F\u6210\u4E2D...":"\u53D1\u9001"}</button>
          <button class="yyt-btn yyt-btn-small" id="yyt-assistant-stop" type="button" ${lo?"":"disabled"}>\u505C\u6B62</button>
        </div>
      </div>
    </div>
  `}function hu(){return uu?uu.querySelector("#"+Jh):uE().getElementById(Jh)}function co(){let t=hu();t&&(t.innerHTML=hE(),bE())}function bE(){let t=hu();t&&(t.querySelector("#yyt-assistant-input")?.addEventListener("input",e=>{uo=e.target.value||"";let r=t.querySelector("#yyt-assistant-send");r&&(r.disabled=lo||!uo.trim())}),t.querySelector("#yyt-assistant-preset")?.addEventListener("change",e=>{mu=e.target.value||""}),t.querySelector("#yyt-assistant-max-rounds")?.addEventListener("input",e=>{gu=e.target.value||String(fu)}),t.querySelector("#yyt-assistant-send")?.addEventListener("click",xE),t.querySelector("#yyt-assistant-stop")?.addEventListener("click",wE),t.querySelector('[data-action="close-assistant"]')?.addEventListener("click",vE),t.querySelectorAll(".yyt-assistant-toggle").forEach(e=>{e.addEventListener("click",()=>{let r=e.getAttribute("data-turn-id"),n=ot.find(s=>s.id===r&&s.type==="assistant");n&&(n.expanded=!n.expanded,co())})}),t.querySelectorAll(".yyt-assistant-risk-cb").forEach(e=>{e.addEventListener("change",()=>{let r=e.getAttribute("data-turn-id"),n=Number(e.getAttribute("data-risk-idx")),s=ot.find(a=>a.id===r&&a.type==="assistant");if(!s)return;s.riskConfirmations||(s.riskConfirmations={}),s.riskConfirmations[String(n)]=e.checked;let o=t.querySelector(`.yyt-assistant-apply-btn[data-turn-id="${r}"]`);if(o){let a=(s.compileResult?.highRiskItems||[]).every((i,l)=>s.riskConfirmations[String(l)]!==!1);o.disabled=!a}})}),t.querySelectorAll(".yyt-assistant-apply-btn").forEach(e=>{e.addEventListener("click",async()=>{let r=e.getAttribute("data-turn-id"),n=ot.find(a=>a.id===r&&a.type==="assistant");if(!n?.result)return;let s=n.compileResult?.highRiskItems||[],o=s.every((a,i)=>n.riskConfirmations?.[String(i)]!==!1);if(s.length&&!o){jr.warn("\u8BF7\u5148\u786E\u8BA4\u6240\u6709\u9AD8\u98CE\u9669\u9879",null,{toast:"warning"});return}try{if(await Yh(n.result)){jr.info("assistant \u8349\u7A3F\u5DF2\u5E94\u7528\u5230\u5DE5\u4F5C\u53F0",null,{toast:"success"});let i=n.compileResult?.focusTableId;if(i)try{let l=be();l&&(!l.scope||l.scope.activeTableId!==i)&&(l.scope={...l.scope||{},activeTableId:i},Ze(l))}catch{}typeof pu=="function"&&pu(),co()}else jr.warn("\u5F53\u524D\u7ED3\u6784\u5DF2\u53D8\u5316\uFF0Cassistant \u8349\u7A3F\u5DF2\u5931\u6548\uFF0C\u8BF7\u91CD\u65B0\u751F\u6210\u3002",null,{toast:"warning"})}catch(a){jr.error("\u5E94\u7528\u5931\u8D25",a,{toast:"error"})}})}))}async function xE(){let t=uo.trim();if(!t)return;let e=be(),r=e?.scope?.activeTableId||"";if(!r){jr.warn("\u8BF7\u5148\u9009\u4E2D\u4E00\u4E2A\u8868\u540E\u518D\u4F7F\u7528 AI \u6539\u8868\u52A9\u624B",null,{toast:"warning"});return}let n=SE(),s={type:"user",id:hl(),content:t};ot.push(s),uo="",lo=!0;let o=ml+1;bl=iu(),ml=o,co();let a=e,i=null,l=null;try{if(i=await pa(),i){let d=Zi(i);if(d?.tables?.length){l={};for(let c of d.tables)Array.isArray(c.rows)&&c.rows.length&&(l[c.id]=c.rows.map(u=>({rowId:u.id,name:u.name||"",cells:u.cells||{}})));Object.keys(l).length||(l=null)}}}catch(d){jr.warn("\u52A0\u8F7D\u884C\u6570\u636E\u4E0A\u4E0B\u6587\u5931\u8D25\uFF0C\u5C06\u4EC5\u4F7F\u7528 schema \u4E0A\u4E0B\u6587",d)}try{let d=await qh({config:le(e),currentTableId:r,userRequest:t,priorTurns:n,apiPreset:mu,maxRounds:fl(gu,fu),guard:bl.createRunGuard(),dataContext:l,targetSnapshot:i,onRoundComplete:y=>{if(o!==ml)return;let p={type:"assistant",id:hl(),draft:y.round.draft,aiRawText:y.round.aiRawText,compileResult:y.round.perRoundCompileResult,sessionInfo:`\u7B2C ${y.round.round}/${y.maxRounds} \u8F6E`,isFinal:!1,expanded:!1,riskConfirmations:{}};ot.push(p),co()}});if(o!==ml)return;let c={type:"assistant",id:hl(),draft:d.draft,aiRawText:d.aiRawText,compileResult:d.compileResult,sessionInfo:d.session?`${d.session.roundsExecuted}\u8F6E \xB7 ${d.session.stopReason}`:"",isFinal:!0,expanded:!1,riskConfirmations:{},result:d};try{let y=Gh({baselineConfig:a,candidateConfig:d.compileResult.candidateConfig});c.cumulativeDiff=y.diff}catch(y){jr.warn("buildCumulativeDiff \u5931\u8D25\uFF0C\u8DF3\u8FC7\u7D2F\u79EF\u6458\u8981",y)}let u=ot.findLastIndex(y=>y.type==="assistant"&&!y.isFinal);u>=0?ot[u]=c:ot.push(c)}catch(d){if(d instanceof ps){jr.warn(d.message,null,{toast:"warning"});return}ot.push({type:"error",id:hl(),errorMessage:d?.message||"\u751F\u6210\u5931\u8D25"}),jr.error("\u6539\u8868\u52A9\u624B\u6267\u884C\u5931\u8D25",d,{toast:"error"})}finally{lo=!1,co()}}function wE(){bl&&bl.cancel()}function vE(){Zh=!1;let t=hu();t&&(t.style.display="none"),typeof yu=="function"&&yu()}function SE(){let t=[];for(let e=0;e<ot.length;e++){let r=ot[e];if(r.type==="user"){let n;for(let s=e+1;s<ot.length&&ot[s].type!=="user";s++)ot[s].type==="assistant"&&ot[s].isFinal&&(n=ot[s].aiRawText);t.push({user:r.content,assistant:n})}}return t}function eb(t,e,r){e&&(uu=e),typeof t=="function"&&(pu=t),yu=r||null,Zh=!0,co()}function tb(){return`
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
  `}var jr,Jh,fu,uu,pu,yu,Zh,lo,uo,gu,mu,bl,ot,ml,rb=O(()=>{Y();Vh();Jt();os();ya();du();Be();gl();hs();jr=I.createScope("TableAssistantUI");Jh="yyt-assistant-host",fu=3,uu=null,pu=null,yu=null,Zh=!1,lo=!1,uo="",gu=String(fu),mu="",bl=null,ot=[],ml=0});function re(){return xu||(xu=I.createScope("TableDataEditor")),xu}function Te(){A.isDirty=!0;try{A._refs.saveBtn?.setDisabled(!1),A._refs.dirtyBadge&&(A._refs.dirtyBadge.style.display="inline-flex")}catch{}}function ob(){A.isDirty=!1;try{A._refs.saveBtn?.setDisabled(!0),A._refs.dirtyBadge&&(A._refs.dirtyBadge.style.display="none")}catch{}}function yt(){let t=Array.isArray(A.tempData)?A.tempData:[],e=A.currentTableIndex;return e>=0&&e<t.length?t[e]:null}function _E(){if(!wu)try{let t=window.parent&&window.parent.document?window.parent.document:document,e=t.head||t.documentElement;if(e.querySelector("#yyt-tde-styles")){wu=!0;return}let r=t.createElement("style");r.id="yyt-tde-styles",r.textContent=TE,e.appendChild(r),wu=!0}catch(t){re().warn("\u6CE8\u5165\u6570\u636E\u7F16\u8F91\u5668\u6837\u5F0F\u5931\u8D25",t)}}function Su(){let t=[],e=null,r=!1,n=A._afterSaveGlobalAt&&Date.now()-A._afterSaveGlobalAt<5*60*1e3;try{let s=ss(null);re().info("loadEditorData snapshot",{hasSnapshot:!!s,messageId:s?.message?.message_id??s?.sourceMessageId,chatId:s?.chatId,isolationKey:s?.tableState?.meta?.isolationKey,hasTableState:!!s?.tableState,tableStateTablesLen:Array.isArray(s?.tableState?.tables)?s.tableState.tables.length:null,firstTableNameInSlot:s?.tableState?.tables?.[0]?.name,afterSaveGlobalRecent:n}),!n&&Array.isArray(s?.tableState?.tables)&&s.tableState.tables.length>0&&(t=s.tableState.tables),e=s?{chatId:s.chatId||"",sourceMessageId:s.sourceMessageId||s.message?.message_id||"",sourceSwipeId:s.sourceSwipeId||"",effectiveSwipeId:s.effectiveSwipeId||"",slotBindingKey:s.slotBindingKey||"",slotRevisionKey:s.slotRevisionKey||"",slotTransactionId:s.slotTransactionId||"",traceId:s.traceId||"",targetMessageIndex:s.targetMessageIndex??-1}:null}catch(s){re().warn("loadEditorData \u5F02\u5E38",s)}if(t.length===0)try{let o=Gs({})?.template?.tables;Array.isArray(o)&&o.length>0&&(t=le(o),r=!0)}catch(s){re().warn("\u4ECE\u6A21\u677F fallback \u5931\u8D25",s)}A.tempData=le(t)||[],A.targetSnapshot=e,A.isDirty=!1,A.isFromTemplate=r,A._pendingMirrorTag=null,A._pendingWrapperConfig=null,A.currentTableIndex>=A.tempData.length?A.currentTableIndex=A.tempData.length>0?0:-1:A.currentTableIndex<0&&A.tempData.length>0&&(A.currentTableIndex=0)}function EE(){let t=f("div",{className:"yyt-tde-toolbar"}),e=f("div",{className:"yyt-tde-toolbar-left"}),r=f("div",{className:"yyt-tde-mode-switch"}),n=[{key:"data",label:"\u6570\u636E\u7F16\u8F91"},{key:"schema",label:"\u7ED3\u6784\u914D\u7F6E"},{key:"global",label:"\u5168\u5C40\u6CE8\u5165"}];for(let u of n){let y=X({label:u.label,variant:A.mode===u.key?"primary":"ghost",size:"small",onClick:()=>{A.mode!==u.key&&(A.mode=u.key,Fe())}});r.appendChild(y.el)}e.appendChild(r);let s=f("span",{className:"yyt-tde-dirty-badge",text:"\u672A\u4FDD\u5B58"});A.isDirty&&(s.style.display="inline-flex"),e.appendChild(s),A._refs.dirtyBadge=s;let o=f("div",{className:"yyt-tde-actions"}),a=X({label:"\u91CD\u65B0\u52A0\u8F7D",icon:"\u21BB",size:"small",onClick:OE}),i=X({label:"\u4FDD\u5B58\u5230 chat",icon:"\u{1F4BE}",size:"small",disabled:!A.isDirty,title:"\u4FDD\u5B58\u5230\u5F53\u524D\u6D88\u606F\u7684 slot",onClick:LE});A._refs.saveBtn=i;let l=X({label:"\u4FDD\u5B58\u5230\u5168\u5C40",icon:"\u{1F310}",size:"small",title:"\u4FDD\u5B58\u5230\u5168\u5C40\u6FC0\u6D3B\u6A21\u677F\uFF08\u5F71\u54CD\u6240\u6709 chat \u540E\u7EED\u586B\u8868\uFF09",onClick:DE});A._refs.saveGlobalBtn=l;let d=X({label:"\u7ACB\u5373\u586B\u8868",icon:"\u25B6",variant:"primary",size:"small",onClick:BE}),c=X({label:"AI \u6539\u8868\u52A9\u624B",icon:"\u2726",size:"small",variant:A._assistantOpen?"primary":"ghost",title:"\u7528\u81EA\u7136\u8BED\u8A00\u4FEE\u6539\u8868\u7ED3\u6784\u3001AI \u6307\u4EE4\u548C\u914D\u7F6E",onClick:$E});return o.appendChild(a.el),o.appendChild(i.el),o.appendChild(l.el),o.appendChild(d.el),o.appendChild(c.el),t.appendChild(e),t.appendChild(o),t}function AE(){let t=f("div",{className:"yyt-tde-sidebar"}),e=A.tempData||[];t.appendChild(f("div",{className:"yyt-tde-sidebar-label",text:`\u8868\u683C\u5217\u8868 (${e.length})`}));let r=f("div",{className:"yyt-tde-sheet-list"});return e.length===0?r.appendChild(f("div",{text:"\u6682\u65E0\u8868",style:{padding:"8px 10px",fontSize:"11px",color:"var(--tde-text-muted)"}})):e.forEach((n,s)=>{let o=s===A.currentTableIndex,a=n?.name||`\u8868 ${s+1}`,i=Array.isArray(n?.rows)?n.rows.length:0,l=f("div",{className:`yyt-tde-sheet-row${o?" active":""}`}),d=f("div",{className:"yyt-tde-sheet-pick"});d.appendChild(f("span",{className:"yyt-tde-sheet-idx",text:`[${s}]`})),d.appendChild(f("span",{className:"yyt-tde-sheet-name",text:a})),d.appendChild(f("span",{className:"yyt-tde-sheet-count",text:String(i)})),d.addEventListener("click",()=>{A.currentTableIndex!==s&&(A.currentTableIndex=s,Fe())}),l.appendChild(d);let c=f("div",{className:"yyt-tde-sheet-actions"});c.appendChild(X({label:"\u2191",size:"small",variant:"ghost",disabled:s===0,title:"\u4E0A\u79FB",onClick:()=>sb(s,-1)}).el),c.appendChild(X({label:"\u2193",size:"small",variant:"ghost",disabled:s===e.length-1,title:"\u4E0B\u79FB",onClick:()=>sb(s,1)}).el),c.appendChild(X({label:"\xD7",size:"small",variant:"danger",title:"\u5220\u9664\u6B64\u8868",onClick:()=>zE(s)}).el),l.appendChild(c),r.appendChild(l)}),t.appendChild(r),t.appendChild(X({label:"+ \u6DFB\u52A0\u65B0\u8868",size:"small",variant:"ghost",onClick:KE}).el),t}function CE(){let t=f("main",{className:"yyt-tde-main"}),e=A.tempData||[];if(A.mode==="global")return t.appendChild(RE()),t;if(e.length===0)return t.appendChild(f("div",{className:"yyt-tde-empty",html:'\u5F53\u524D slot \u6CA1\u6709\u8868\u6570\u636E\uFF0C\u6A21\u677F\u4E5F\u672A\u914D\u7F6E\u8868\u3002<br>\u8BF7\u5148\u5728\u5DE5\u4F5C\u53F0\u70B9"\u7ACB\u5373\u586B\u8868"\u8BA9 AI \u521D\u59CB\u5316\uFF0C\u6216\u5230\u300C\u9884\u8BBE\u7BA1\u7406 \u2192 \u8868\u683C\u6A21\u677F\u300D\u914D\u7F6E\u6A21\u677F\u3002'})),t;let r=yt();return r?(A.mode==="data"?t.appendChild(kE(r)):A.mode==="schema"&&t.appendChild(IE(r)),t):(t.appendChild(f("div",{className:"yyt-tde-empty",text:"\u8BF7\u4ECE\u5DE6\u4FA7\u9009\u62E9\u4E00\u5F20\u8868\u3002"})),t)}function kE(t){let e=f("div"),r=Array.isArray(t?.columns)?t.columns:[],n=Array.isArray(t?.rows)?t.rows:[],s=A.targetSnapshot?.chatId||"",o=t?.uid||t?.id||"",a={cols:{},rows:{},cells:{},indexCol:!1};try{a=so({chatId:s,isolationKey:ae.getKey()},o)||a}catch{}let i=a?.rows||{},l=a?.cells||{};A.isFromTemplate&&e.appendChild(f("div",{className:"yyt-tde-schema-hint",html:'\u5F53\u524D\u663E\u793A<b>\u6A21\u677F\u9ED8\u8BA4\u7ED3\u6784</b>\uFF08slot \u5C1A\u65E0\u6570\u636E\uFF09\u3002\u76F4\u63A5\u6DFB\u52A0\u884C\u6216\u7F16\u8F91\u4F1A\u521B\u5EFA slot \u6570\u636E\uFF1B\u6216\u5DE5\u4F5C\u53F0\u70B9"\u7ACB\u5373\u586B\u8868"\u8BA9 AI \u586B\u3002'}));let d=f("div",{className:"yyt-tde-card-grid"});n.forEach((u,y)=>{let p=u?.cells||{},g=!!i[y],m=f("article",{className:`yyt-tde-card${g?" yyt-tde-row-locked":""}`}),h=f("header",{className:"yyt-tde-card-header"});h.appendChild(f("span",{className:"yyt-tde-card-index",text:`#${y+1}`}));let b=f("div",{className:"yyt-tde-card-name-slot"}),w=me({value:u?.name||"",placeholder:"\u884C\u540D",disabled:g,onInput:k=>{let v=yt();v?.rows?.[y]&&(v.rows[y].name=k,Te())}});b.appendChild(w.el),h.appendChild(b);let S=f("div",{className:"yyt-tde-card-actions"});S.appendChild(X({label:g?"\u{1F512}":"\u{1F513}",size:"small",variant:g?"danger":"ghost",title:g?"\u5DF2\u9501\u5B9A\u6B64\u884C\uFF08\u70B9\u51FB\u89E3\u9501\uFF09":"\u9501\u5B9A\u6B64\u884C\uFF08AI \u4E0D\u4F1A\u6539\uFF09",onClick:()=>jE(o,y)}).el),S.appendChild(X({label:"\u{1F5D1}",size:"small",variant:"danger",disabled:g,title:"\u5220\u9664\u884C",onClick:()=>FE(y)}).el),h.appendChild(S),m.appendChild(h);let _=f("div",{className:"yyt-tde-card-body"});r.length===0?_.appendChild(f("div",{text:"\u8BE5\u8868\u6CA1\u6709\u5217\u5B9A\u4E49",style:{padding:"8px",color:"var(--tde-text-muted)",fontSize:"12px"}})):r.forEach(k=>{let v=k?.key||"",C=k?.title||v,R=p[v],L=R==null||R==="",N=L?"\uFF08\u7A7A\uFF09":String(R),E=!!l[`${y}::${v}`],P=f("div",{className:`yyt-tde-field${E?" yyt-tde-cell-locked":""}`}),U=f("div",{className:"yyt-tde-field-label"});U.appendChild(f("span",{text:C})),U.appendChild(X({label:E?"\u{1F512}":"\u{1F513}",size:"small",variant:E?"danger":"ghost",title:E?"\u5DF2\u9501\u5B9A\u6B64\u5355\u5143\u683C":"\u9501\u5B9A\u6B64\u5355\u5143\u683C\uFF08AI \u4E0D\u4F1A\u6539\uFF09",onClick:()=>UE(o,y,v)}).el),P.appendChild(U);let q=f("div",{className:`yyt-tde-field-cell${L?" yyt-tde-field-cell--empty":""}${E?" yyt-tde-cell-locked-bg":""}`,text:N,attrs:{contenteditable:E?"false":"true"}});q.addEventListener("input",()=>{let te=yt();te?.rows?.[y]&&(te.rows[y].cells||(te.rows[y].cells={}),te.rows[y].cells[v]=q.textContent,Te())}),P.appendChild(q),_.appendChild(P)}),m.appendChild(_),d.appendChild(m)});let c=f("div",{className:"yyt-tde-card-add"});return c.appendChild(X({label:"+ \u6DFB\u52A0\u884C",variant:"ghost",onClick:WE}).el),d.appendChild(c),e.appendChild(d),e}function IE(t){let e=f("div"),r=Array.isArray(t?.columns)?t.columns:[],n=t?.sourceData||{},s=t?.aiInstructions||{},o=t?.updateConfig||{},a=A.targetSnapshot?.chatId||"",i=t?.uid||t?.id||"",l={cols:{},rows:{},cells:{},indexCol:!1};try{l=so({chatId:a,isolationKey:ae.getKey()},i)||l}catch{}let d=l?.cols||{},c=f("div",{className:"yyt-tde-schema-section"});c.appendChild(f("div",{className:"yyt-tde-schema-heading",text:"\u57FA\u7840\u4FE1\u606F"}));let u=f("div",{className:"yyt-tde-schema-row"});u.appendChild(f("div",{className:"yyt-tde-schema-key",text:"\u8868\u540D"}));let y=f("div",{className:"yyt-tde-schema-value"});y.appendChild(me({value:t?.name||"",onInput:R=>{let L=yt();L&&(L.name=R,Te())}}).el),u.appendChild(y),c.appendChild(u);let p=f("div",{className:"yyt-tde-schema-row"});p.appendChild(f("div",{className:"yyt-tde-schema-key",text:"UID"})),p.appendChild(f("code",{text:t?.uid||t?.id||"",style:{fontSize:"11px",color:"var(--tde-accent)"}})),c.appendChild(p);let g=f("div",{className:"yyt-tde-schema-row",style:{alignItems:"flex-start"}});g.appendChild(f("div",{className:"yyt-tde-schema-key",text:"\u8868\u8BF4\u660E"}));let m=f("div",{className:"yyt-tde-schema-value"});m.appendChild(Aa({value:t?.note||n?.note||"",placeholder:"\u8868\u7528\u9014\u8BF4\u660E + \u5217\u6CE8\u91CA",onInput:R=>{let L=yt();L&&(L.note=R,Te())}})),g.appendChild(m),c.appendChild(g),e.appendChild(c);let h=f("div",{className:"yyt-tde-schema-section"});h.appendChild(f("div",{className:"yyt-tde-schema-heading",text:"AI \u64CD\u4F5C\u8BF4\u660E (sourceData)"}));let b=[{key:"init",label:"\u521D\u59CB\u5316 (init)",placeholder:"\u8868\u4E3A\u7A7A\u65F6 AI \u5E94\u8BE5\u63D2\u5165\u4EC0\u4E48",legacy:"initNode"},{key:"create",label:"\u65B0\u589E (insert)",placeholder:"\u4EC0\u4E48\u60C5\u51B5\u4E0B AI \u5E94\u8BE5\u65B0\u589E\u884C",legacy:"insertNode"},{key:"update",label:"\u66F4\u65B0 (update)",placeholder:"\u4EC0\u4E48\u60C5\u51B5\u4E0B AI \u5E94\u8BE5\u66F4\u65B0\u884C",legacy:"updateNode"},{key:"delete",label:"\u5220\u9664 (delete)",placeholder:"\u4EC0\u4E48\u60C5\u51B5\u4E0B AI \u5E94\u8BE5\u5220\u9664\u884C",legacy:"deleteNode"}];for(let R of b){let L=f("div",{className:"yyt-tde-schema-row",style:{alignItems:"flex-start"}});L.appendChild(f("div",{className:"yyt-tde-schema-key",text:R.label}));let N=f("div",{className:"yyt-tde-schema-value"});N.appendChild(Aa({value:s?.[R.key]||n?.[R.legacy]||"",placeholder:R.placeholder,onInput:E=>{let P=yt();P&&(P.aiInstructions=P.aiInstructions||{},P.aiInstructions[R.key]=E,Te())}})),L.appendChild(N),h.appendChild(L)}e.appendChild(h);let w=f("div",{className:"yyt-tde-schema-section"});w.appendChild(f("div",{className:"yyt-tde-schema-heading",text:"\u66F4\u65B0\u914D\u7F6E (updateConfig)"})),w.appendChild(f("div",{className:"yyt-tde-hint",style:{marginBottom:"8px",fontSize:"11px",color:"var(--tde-text-muted)"},html:"<strong>\u8BF4\u660E</strong>\uFF1A\u8FD9\u91CC\u914D\u7F6E AI \u586B\u8868\u65F6\u8FD9\u5F20\u8868\u7684\u884C\u4E3A\uFF08\u9891\u7387\u3001\u4E0A\u4E0B\u6587\u6DF1\u5EA6\u3001token \u8282\u7701\uFF09\u3002\u8DDF\u300C\u4E16\u754C\u4E66\u6CE8\u5165\u300D\u662F\u4E24\u4EF6\u4E8B\uFF1A\u4E16\u754C\u4E66\u662F\u628A\u8868\u6570\u636E\u585E\u8FDB prompt \u7ED9\u4E3B AI \u770B\uFF08\u5408\u5E76\u6761\u76EE / \u72EC\u7ACB\u6761\u76EE\u5728<strong>\u5168\u5C40\u6CE8\u5165</strong> tab \u914D\uFF09\uFF0C\u8FD9\u91CC\u662F\u63A7\u5236<strong>\u586B\u8868\u65F6\u673A</strong>\uFF08\u591A\u4E45\u586B\u4E00\u6B21\u3001\u8DF3\u8FC7\u51E0\u5C42\u7B49\uFF09\u3002-1 = \u6CBF\u7528\u5168\u5C40\uFF0C0 = \u7981\u7528\u5355\u8868\u3002"}));let S=f("div",{className:"yyt-tde-uc-grid"}),_=[{key:"contextDepth",label:"\u4E0A\u4E0B\u6587\u6DF1\u5EA6 (contextDepth)",hint:"-1 = \u6CBF\u7528\u5168\u5C40\uFF0C0 = \u7981\u7528\uFF0CN = \u6700\u8FD1 N \u6761\u6D88\u606F"},{key:"updateFrequency",label:"\u66F4\u65B0\u9891\u7387 (updateFrequency)",hint:"-1 = \u6CBF\u7528\u5168\u5C40\uFF0C0 = \u7981\u7528\u81EA\u52A8\u586B\u8868\uFF0CN = \u6BCF N \u6761\u6D88\u606F\u89E6\u53D1\u4E00\u6B21"},{key:"batchSize",label:"\u6279\u6B21\u5927\u5C0F (batchSize)",hint:"-1 = \u6CBF\u7528\u5168\u5C40\uFF0CN = \u5355\u6B21\u6700\u591A\u5904\u7406 N \u5F20\u8868"},{key:"skipFloors",label:"\u8DF3\u8FC7\u697C\u5C42 (skipFloors)",hint:"-1 = \u6CBF\u7528\u5168\u5C40\uFF0CN = \u8DF3\u8FC7\u6700\u8FD1 N \u5C42"},{key:"sendLatestRows",label:"\u53D1\u9001\u6700\u65B0 N \u884C (sendLatestRows)",hint:"-1 = \u5168\u90E8\u53D1\u9001\uFF0C0 = \u6CBF\u7528\u5168\u5C40\uFF0CN = \u4EC5\u53D1\u9001\u6700\u65B0 N \u884C\uFF08\u5927\u8868 token \u8282\u7701\uFF09"}];for(let R of _){let L=f("div",{className:"yyt-tde-uc-cell"});L.appendChild(f("label",{text:R.label})),L.appendChild(me({type:"number",value:Number.isFinite(o?.[R.key])?String(o[R.key]):"-1",onInput:N=>{let E=yt();if(!E)return;E.updateConfig=E.updateConfig||{};let P=Number(N);E.updateConfig[R.key]=Number.isFinite(P)?P:-1,Te()}}).el),L.appendChild(f("span",{className:"yyt-tde-hint",text:R.hint})),S.appendChild(L)}let k=f("div",{className:"yyt-tde-uc-cell"});k.appendChild(f("label",{text:"\u5206\u7EC4 ID (groupId)"})),k.appendChild(me({value:o?.groupId||"",placeholder:"\u540C\u7EC4 ID \u7684\u8868\u4F1A\u5408\u5E76\u89E6\u53D1",onInput:R=>{let L=yt();L&&(L.updateConfig=L.updateConfig||{},L.updateConfig.groupId=R,Te())}}).el),k.appendChild(f("span",{className:"yyt-tde-hint",text:"\u540C\u7EC4\u540C\u65F6\u89E6\u53D1\uFF0C\u8DE8\u7EC4\u5E76\u884C\uFF08\u7559\u7A7A = \u72EC\u7ACB\u89E6\u53D1\uFF09"})),S.appendChild(k);let v=f("div",{className:"yyt-tde-uc-cell yyt-tde-uc-cell-wide"});v.appendChild(f("label",{text:"\u8868\u7EA7 API \u9884\u8BBE\u8986\u76D6"})),v.appendChild(me({value:o?.apiPreset||"",placeholder:"\u7559\u7A7A = \u6CBF\u7528\u5168\u5C40\uFF0C\u586B\u9884\u8BBE\u540D = \u8FD9\u5F20\u8868\u7528\u8FD9\u4E2A",onInput:R=>{let L=yt();L&&(L.updateConfig=L.updateConfig||{},L.updateConfig.apiPreset=R,Te())}}).el),v.appendChild(f("span",{className:"yyt-tde-hint",text:"\u4F8B\uFF1A\u89D2\u8272\u8868\u7528 Claude\u3001\u7EAA\u8981\u8868\u7528 GPT"})),S.appendChild(v),w.appendChild(S),e.appendChild(w);let C=f("div",{className:"yyt-tde-schema-section"});return C.appendChild(f("div",{className:"yyt-tde-schema-heading",text:`\u5B57\u6BB5\u5B9A\u4E49 (${r.length})`})),r.length===0?C.appendChild(f("div",{text:"\u65E0\u5B57\u6BB5",style:{color:"var(--tde-text-muted)",fontSize:"12px",padding:"8px 0"}})):r.forEach((R,L)=>{let N=R?.key||"",E=N?!!d[N]:!1,P=f("div",{className:`yyt-tde-schema-field${E?" locked":""}`}),U=f("div",{className:"yyt-tde-schema-field-head"});U.appendChild(f("span",{className:"yyt-tde-schema-idx",text:`[${L}]`}));let q=f("div",{className:"yyt-tde-field-input-title"});q.appendChild(me({value:R?.title||R?.key||"",placeholder:"\u5B57\u6BB5\u6807\u9898",onInput:we=>{let Pe=yt();Pe?.columns?.[L]&&(Pe.columns[L].title=we,Te())}}).el),U.appendChild(q);let te=f("div",{className:"yyt-tde-field-input-key"}),ie=me({value:R?.key||"",placeholder:"key",style:{fontFamily:"monospace"},onInput:we=>{let Pe=yt();Pe?.columns?.[L]&&(Pe.columns[L].key=we,Te())}});te.appendChild(ie.el),U.appendChild(te);let Q=f("div",{className:"yyt-tde-field-input-type"});Q.appendChild(Ee({value:R?.type||"text",options:["text","number","boolean","date","json"].map(we=>({value:we,label:we})),onChange:we=>{let Pe=yt();Pe?.columns?.[L]&&(Pe.columns[L].type=we,Te())}}).el),U.appendChild(Q),U.appendChild(X({label:E?"\u{1F512}":"\u{1F513}",size:"small",variant:E?"danger":"ghost",title:E?"\u5DF2\u9501\u5B9A\uFF1AAI \u4E0D\u4F1A\u6539\u8FD9\u5217\u3002\u70B9\u51FB\u89E3\u9501":"\u9501\u5B9A\u6B64\u5217\uFF1AAI \u6C38\u4E0D\u4FEE\u6539",onClick:()=>HE(i,N)}).el),U.appendChild(X({label:"\u{1F5D1}",size:"small",variant:"danger",title:"\u5220\u9664\u6B64\u5B57\u6BB5",onClick:()=>GE(L)}).el),P.appendChild(U),P.appendChild(Aa({value:R?.description||"",placeholder:"\u5B57\u6BB5\u63CF\u8FF0",minHeight:"32px",onInput:we=>{let Pe=yt();Pe?.columns?.[L]&&(Pe.columns[L].description=we,Te())}})),C.appendChild(P)}),C.appendChild(X({label:"+ \u6DFB\u52A0\u5B57\u6BB5",variant:"ghost",onClick:qE}).el),e.appendChild(C),e}function RE(){let t=f("div"),e=Array.isArray(A.tempData)?A.tempData:[];if(t.appendChild(f("div",{className:"yyt-tde-schema-hint",style:{background:"rgba(74,158,255,0.08)",borderColor:"rgba(74,158,255,0.3)"},html:"<strong>\u5168\u5C40\u6CE8\u5165\u914D\u7F6E</strong> \u2014 Wrapper \u5305\u88F9\u914D\u7F6E\uFF08\u5305\u4F4F\u6240\u6709\u672A\u542F\u7528\u72EC\u7ACB\u6CE8\u5165\u7684\u8868\uFF09+ \u6BCF\u5F20\u8868\u7684 exportConfig\u3002"})),e.length===0)return t.appendChild(f("div",{className:"yyt-tde-empty",text:"\u65E0\u8868\u683C\u53EF\u914D\u7F6E\u3002\u8BF7\u5148\u6DFB\u52A0\u8868\u683C\u3002"})),t;let r="yyt-table-workbench";try{r=be()?.mirrorTag||r}catch{}let n=f("div",{className:"yyt-tde-schema-section"});n.appendChild(f("div",{className:"yyt-tde-schema-heading",text:"\u5199\u56DE\u6B63\u6587\u6807\u7B7E"}));let s=f("div",{className:"yyt-tde-uc-grid"}),o=f("div",{className:"yyt-tde-uc-cell yyt-tde-uc-cell-wide"});o.appendChild(f("label",{text:"mirrorTag"})),o.appendChild(me({value:r,placeholder:"\u9ED8\u8BA4: yyt-table-workbench",onInput:_=>{A._pendingMirrorTag=_,Te()}}).el),o.appendChild(f("span",{className:"yyt-tde-hint",text:"\u5F00\u542F\u5199\u56DE\u6B63\u6587\u65F6\uFF0C\u7528\u6B64 XML \u6807\u7B7E\u5305\u88F9\u8868\u683C\u6570\u636E\u6CE8\u5165\u5230 assistant \u6D88\u606F"})),s.appendChild(o),n.appendChild(s),t.appendChild(n);let a={enabled:!0,wrapperTag:"\u6700\u65B0\u6570\u636E\u4E0E\u8BB0\u5F55",wrapperHint:"",wrapperPlacement:{position:"before_character_definition",depth:2,order:0}};try{let _=be();if(_?.wrapperConfig){let k=_.wrapperConfig;a={enabled:k.enabled!==!1,wrapperTag:k.wrapperTag||a.wrapperTag,wrapperHint:k.wrapperHint??a.wrapperHint,wrapperPlacement:{...k.wrapperPlacement||a.wrapperPlacement}}}}catch{}A._pendingWrapperConfig||(A._pendingWrapperConfig={...a,wrapperPlacement:{...a.wrapperPlacement}});let i=f("div",{className:"yyt-tde-schema-section"}),l=f("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"10px"}});l.appendChild(f("div",{className:"yyt-tde-schema-heading",style:{marginBottom:"0"},text:"Wrapper \u5305\u88F9\u914D\u7F6E"})),l.appendChild(Ye({label:"\u542F\u7528",checked:A._pendingWrapperConfig.enabled!==!1,style:{padding:"0",border:"none",background:"none"},onChange:_=>{A._pendingWrapperConfig.enabled=_,Te(),Fe()}}).el),i.appendChild(l);let d=A._pendingWrapperConfig.enabled!==!1,c=f("div",{className:d?"":"yyt-tde-disabled-section"}),u=f("div",{className:"yyt-tde-schema-row"});u.appendChild(f("div",{className:"yyt-tde-schema-key",text:"\u6807\u7B7E\u540D"}));let y=f("div",{className:"yyt-tde-schema-value"});y.appendChild(me({value:A._pendingWrapperConfig.wrapperTag||"",placeholder:"\u9ED8\u8BA4: \u6700\u65B0\u6570\u636E\u4E0E\u8BB0\u5F55",onInput:_=>{A._pendingWrapperConfig.wrapperTag=_,Te()}}).el),u.appendChild(y),c.appendChild(u);let p=f("div",{className:"yyt-tde-schema-row",style:{alignItems:"flex-start"}});p.appendChild(f("div",{className:"yyt-tde-schema-key",text:"\u63D0\u793A\u6587"}));let g=f("div",{className:"yyt-tde-schema-value"});g.appendChild(Aa({value:A._pendingWrapperConfig.wrapperHint||"",placeholder:"\u53EF\u9009\uFF0C\u6CE8\u5165\u5728 wrapper \u5F00\u59CB\u6807\u7B7E\u4E4B\u540E",onInput:_=>{A._pendingWrapperConfig.wrapperHint=_,Te()}})),p.appendChild(g),c.appendChild(p);let m=A._pendingWrapperConfig.wrapperPlacement||{},h=f("div",{className:"yyt-tde-schema-row"});h.appendChild(f("div",{className:"yyt-tde-schema-key",text:"\u6CE8\u5165\u4F4D\u7F6E"}));let b=f("div",{className:"yyt-tde-schema-value"});b.appendChild(Ee({value:m.position||"before_character_definition",options:[{value:"before_character_definition",label:"\u89D2\u8272\u5B9A\u4E49\u4E4B\u524D"},{value:"after_character_definition",label:"\u89D2\u8272\u5B9A\u4E49\u4E4B\u540E"},{value:"before_authors_note",label:"\u4F5C\u8005\u6CE8\u91CA\u4E4B\u524D"},{value:"after_authors_note",label:"\u4F5C\u8005\u6CE8\u91CA\u4E4B\u540E"}],onChange:_=>{A._pendingWrapperConfig.wrapperPlacement||(A._pendingWrapperConfig.wrapperPlacement={}),A._pendingWrapperConfig.wrapperPlacement.position=_,Te()}}).el),h.appendChild(b),c.appendChild(h);let w=f("div",{className:"yyt-tde-schema-row"});w.appendChild(f("div",{className:"yyt-tde-schema-key",text:"\u6DF1\u5EA6 / \u987A\u5E8F"}));let S=f("div",{className:"yyt-tde-schema-value",style:{display:"flex",gap:"12px",alignItems:"center"}});return S.appendChild(f("label",{text:"\u6DF1\u5EA6",style:{fontSize:"11px",color:"var(--tde-text-secondary)",fontWeight:"600",whiteSpace:"nowrap"}})),S.appendChild(me({type:"number",value:String(m.depth??2),style:{width:"56px"},onInput:_=>{A._pendingWrapperConfig.wrapperPlacement||(A._pendingWrapperConfig.wrapperPlacement={}),A._pendingWrapperConfig.wrapperPlacement.depth=Number(_)||0,Te()}}).el),S.appendChild(f("label",{text:"\u987A\u5E8F",style:{fontSize:"11px",color:"var(--tde-text-secondary)",fontWeight:"600",whiteSpace:"nowrap",marginLeft:"4px"}})),S.appendChild(me({type:"number",value:String(m.order??0),style:{width:"56px"},onInput:_=>{A._pendingWrapperConfig.wrapperPlacement||(A._pendingWrapperConfig.wrapperPlacement={}),A._pendingWrapperConfig.wrapperPlacement.order=Number(_)||0,Te()}}).el),w.appendChild(S),c.appendChild(w),i.appendChild(c),t.appendChild(i),e.forEach((_,k)=>{t.appendChild(ME(_,k))}),t}function ME(t,e){let r=t?.exportConfig||{},n=r.entryPlacement||{},s=r.extraIndexPlacement||{},o=r.enabled===!0,a=f("div",{className:"yyt-tde-global-card"}),i=f("div",{className:"yyt-tde-global-card-head"});i.appendChild(f("span",{className:"yyt-tde-global-card-name",text:t?.name||`\u8868 ${e+1}`}));let l=Ye({label:"\u542F\u7528\u72EC\u7ACB\u6CE8\u5165",checked:o,onChange:y=>{let p=A.tempData?.[e];p&&(p.exportConfig=p.exportConfig||{},p.exportConfig.enabled=y,Te(),Fe())}});i.appendChild(l.el),a.appendChild(i);let d=f("div",{className:`yyt-tde-global-card-body${o?"":" yyt-tde-disabled-section"}`}),c=f("div",{className:"yyt-tde-uc-grid"});c.appendChild(Sn({label:"\u6761\u76EE\u540D (entryName)",control:me({value:r.entryName||t?.name||"",onInput:y=>po(e,"entryName",y)})})),c.appendChild(Sn({label:"\u6761\u76EE\u7C7B\u578B (entryType)",control:Ee({value:r.entryType||"constant",options:[{value:"constant",label:"constant (\u5E38\u9A7B)"},{value:"keyword",label:"keyword (\u5173\u952E\u8BCD\u89E6\u53D1)"}],onChange:y=>po(e,"entryType",y)})})),c.appendChild(Sn({label:"\u89E6\u53D1\u5173\u952E\u8BCD (keywords)",wide:!0,control:me({value:r.keywords||"",placeholder:"\u7528\u9017\u53F7\u6216\u6362\u884C\u5206\u9694",onInput:y=>po(e,"keywords",y)})})),c.appendChild(Sn({label:"\u6309\u884C\u62C6\u5206 (splitByRow)",control:Ee({value:r.splitByRow?"true":"false",options:[{value:"false",label:"\u5426\uFF08\u6574\u5F20\u8868\u4E00\u4E2A\u6761\u76EE\uFF09"},{value:"true",label:"\u662F\uFF08\u6BCF\u884C\u4E00\u4E2A\u6761\u76EE\uFF09"}],onChange:y=>po(e,"splitByRow",y==="true")})})),c.appendChild(Sn({label:"\u9632\u9012\u5F52 (preventRecursion)",hint:"\u9632\u6B62\u4E16\u754C\u4E66\u6761\u76EE\u4E4B\u95F4\u4E92\u76F8\u89E6\u53D1\u6CE8\u5165\uFF08\u63A8\u8350\u4FDD\u6301\u5F00\u542F\uFF09",control:Ee({value:r.preventRecursion===!1?"false":"true",options:[{value:"true",label:"\u662F"},{value:"false",label:"\u5426"}],onChange:y=>po(e,"preventRecursion",y!=="false")})}));let u=f("div",{className:"yyt-tde-uc-cell yyt-tde-uc-cell-wide"});return u.appendChild(f("label",{text:"\u6CE8\u5165\u6A21\u677F (injectionTemplate)"})),u.appendChild(Aa({value:r.injectionTemplate||"",placeholder:"\u4F8B\uFF1A\u4EE5\u4E0B\u662F {{tableName}} \u7684\u6700\u65B0\u6570\u636E\uFF1A{{tableContent}}",onInput:y=>po(e,"injectionTemplate",y)})),c.appendChild(u),d.appendChild(c),d.appendChild(f("div",{className:"yyt-tde-schema-heading",style:{marginTop:"12px"},text:"\u6761\u76EE\u4F4D\u7F6E (entryPlacement)"})),d.appendChild(nb(e,"entryPlacement",n)),d.appendChild(f("div",{className:"yyt-tde-schema-heading",style:{marginTop:"12px"},text:"\u989D\u5916\u7D22\u5F15\u4F4D\u7F6E (extraIndexPlacement\uFF0C\u53EF\u9009)"})),d.appendChild(nb(e,"extraIndexPlacement",s)),a.appendChild(d),a}function nb(t,e,r){let n=f("div",{className:"yyt-tde-uc-grid"}),s=["before_character_definition","after_character_definition","before_authors_note","after_authors_note"];return n.appendChild(Sn({label:"position",control:Ee({value:r.position||"before_character_definition",options:s.map(o=>({value:o,label:o})),onChange:o=>vu(t,e,"position",o)})})),n.appendChild(Sn({label:"depth",control:me({type:"number",value:Number.isFinite(r.depth)?String(r.depth):"2",onInput:o=>vu(t,e,"depth",Number(o)||0)})})),n.appendChild(Sn({label:"order",control:me({type:"number",value:Number.isFinite(r.order)?String(r.order):"0",onInput:o=>vu(t,e,"order",Number(o)||0)})})),n}function Sn({label:t,control:e,wide:r=!1,hint:n=null}){let s=f("div",{className:`yyt-tde-uc-cell${r?" yyt-tde-uc-cell-wide":""}`});return s.appendChild(f("label",{text:t})),s.appendChild(e.el),n&&s.appendChild(f("span",{className:"yyt-tde-hint",text:n})),s}function Aa({value:t="",placeholder:e="",minHeight:r="60px",onInput:n=null}={}){let s=f("textarea",{className:"yyt-textarea",attrs:{placeholder:e},style:{minHeight:r}});return s.value=t,typeof n=="function"&&s.addEventListener("input",()=>n(s.value)),s}function po(t,e,r){let n=A.tempData?.[t];n&&(n.exportConfig=n.exportConfig||{},n.exportConfig[e]=r,Te())}function vu(t,e,r,n){let s=A.tempData?.[t];s&&(s.exportConfig=s.exportConfig||{},s.exportConfig[e]=s.exportConfig[e]||{},s.exportConfig[e][r]=n,Te())}function PE(){let t=f("div",{className:"yyt-tde"});t.appendChild(EE());let e=f("div",{className:"yyt-tde-content"});A.mode!=="global"&&e.appendChild(AE()),e.appendChild(CE());let r=f("div",{attrs:{id:"yyt-assistant-host"},className:"yyt-assistant-dock"});return r.style.display=A._assistantOpen?"flex":"none",e.appendChild(r),t.appendChild(e),t}function Fe(){if(!A.$window)return;let t=A.$window.find(".yyt-window-body");if(!t||!t.length)return;let e=t[0],r=e.querySelector(".yyt-tde-main"),n=e.querySelector(".yyt-tde-sidebar"),s=r?r.scrollTop:0,o=n?n.scrollTop:0;e.innerHTML="",e.appendChild(PE());let a=e.querySelector(".yyt-tde-main"),i=e.querySelector(".yyt-tde-sidebar");if(a&&(a.scrollTop=s),i&&(i.scrollTop=o),NE(),A._assistantOpen){let l=e.querySelector(".yyt-tde-content"),d=l?.querySelector("#yyt-assistant-host");l&&d&&(d.style.display="flex",eb(()=>Fe(),l,()=>{A._assistantOpen=!1,Fe()}))}}function NE(){let t=A.$window?.[0]?.ownerDocument||document;if(!t)return;let e=t.getElementById("yyt-assistant-styles");e||(e=t.createElement("style"),e.id="yyt-assistant-styles",(t.head||t.documentElement).appendChild(e)),e.textContent=tb()}function $E(){try{A._assistantOpen=!A._assistantOpen,Fe()}catch(t){re().error("toggleAssistant \u5F02\u5E38",t)}}function OE(){if(A.isDirty&&!window.confirm("\u6709\u672A\u4FDD\u5B58\u4FEE\u6539\uFF0C\u91CD\u65B0\u52A0\u8F7D\u5C06\u4E22\u5F03\uFF0C\u786E\u5B9A\uFF1F"))return;let t=A.tempData?.[0];re().info("reload \u89E6\u53D1",{before:{tableCount:A.tempData?.length,firstName:t?.name,firstAiInit:t?.aiInstructions?.init?.slice(0,50),firstUcFreq:t?.updateConfig?.updateFrequency},targetSnapshot:{messageId:A.targetSnapshot?.sourceMessageId,isFromTemplate:A.isFromTemplate}}),Su();let e=A.tempData?.[0];re().info("reload \u5B8C\u6210",{after:{tableCount:A.tempData?.length,firstName:e?.name,firstAiInit:e?.aiInstructions?.init?.slice(0,50),firstUcFreq:e?.updateConfig?.updateFrequency,isFromTemplate:A.isFromTemplate}}),Fe(),re().info("\u5DF2\u91CD\u65B0\u52A0\u8F7D",null,{toast:"success"})}async function LE(){if(!A.isDirty){re().info("\u6CA1\u6709\u4FEE\u6539",null,{toast:!0});return}try{let t=A.targetSnapshot;if(t?.sourceMessageId||(t=await pa()),!t?.sourceMessageId){re().error("\u65E0\u6CD5\u5B9A\u4F4D\u5F53\u524D\u6D88\u606F\uFF08\u627E\u4E0D\u5230 assistant \u6D88\u606F\uFF09",null,{toast:!0});return}let e=await no(t,{tables:le(A.tempData)||[],meta:{source:"data-editor-manual-save"}},{skipFreshValidation:!0});re().info("save-chat commitBoundState \u7ED3\u679C",{success:e?.success,error:e?.error,commitMessageId:e?.sourceMessageId,commitSlotRevisionKey:e?.slotRevisionKey,stateTablesLen:Array.isArray(e?.state?.tables)?e.state.tables.length:null,firstTableInState:e?.state?.tables?.[0]?.name,firstAiInitInState:e?.state?.tables?.[0]?.aiInstructions?.init?.slice(0,50)}),e?.success?(ob(),A.targetSnapshot={chatId:e.state?.chatId||t.chatId,sourceMessageId:e.sourceMessageId,sourceSwipeId:e.state?.sourceSwipeId||t.sourceSwipeId,effectiveSwipeId:t.effectiveSwipeId,slotBindingKey:e.state?.slotBindingKey||t.slotBindingKey,slotRevisionKey:e.slotRevisionKey,slotTransactionId:t.slotTransactionId,traceId:t.traceId,targetMessageIndex:e.messageIndex??t.targetMessageIndex},Array.isArray(e?.state?.tables)&&(A.tempData=le(e.state.tables)||[],A.isFromTemplate=!1),A._afterSaveGlobalAt=0,re().info("\u5DF2\u4FDD\u5B58\u5230 chat",null,{toast:"success"}),Fe()):re().error(`\u4FDD\u5B58\u5931\u8D25\uFF1A${e?.error||"\u672A\u77E5"}`,null,{toast:!0})}catch(t){re().error("\u4FDD\u5B58\u5F02\u5E38",t),re().error(`\u4FDD\u5B58\u5F02\u5E38\uFF1A${t?.message||t}`,null,{toast:!0})}}async function DE(){if(!Array.isArray(A.tempData)||A.tempData.length===0){re().info("\u6CA1\u6709\u53EF\u4FDD\u5B58\u7684\u6570\u636E",null,{toast:!0});return}if(window.confirm("\u4FDD\u5B58\u5230\u300C\u5168\u5C40\u6FC0\u6D3B\u6A21\u677F\u300D\u4F1A\u5F71\u54CD\u540E\u7EED\u6240\u6709 chat \u7684\u65B0\u586B\u8868\uFF08\u5DF2\u6709 slot \u6570\u636E\u4E0D\u53D7\u5F71\u54CD\uFF09\u3002\u7EE7\u7EED\uFF1F"))try{let t=yn();if(!t?.id){re().error("\u6CA1\u6709\u53EF\u7528\u7684\u5168\u5C40\u6FC0\u6D3B\u6A21\u677F",null,{toast:!0});return}let e=(A.tempData||[]).map(n=>({id:n?.id||n?.uid,name:n?.name||"",note:n?.note||"",enabled:n?.enabled!==!1,aiInstructions:n?.aiInstructions||{},updateConfig:n?.updateConfig||{},exportConfig:n?.exportConfig||{},columns:Array.isArray(n?.columns)?le(n.columns):[],rows:[]})),r=cn({...t,tables:e});if(r?.success){let n=typeof A._pendingMirrorTag=="string"&&A._pendingMirrorTag.trim(),s=!!A._pendingWrapperConfig;if(n||s)try{let a={...be()};n&&(a.mirrorTag=A._pendingMirrorTag.trim()),s&&(a.wrapperConfig=A._pendingWrapperConfig),Ze(a)}catch(o){re().warn("\u4FDD\u5B58 workbench config \u5931\u8D25",o)}A._pendingMirrorTag=null,A._pendingWrapperConfig=null,ob(),Array.isArray(r?.template?.tables)&&(A.tempData=le(r.template.tables)||[],A.isFromTemplate=!0,A._afterSaveGlobalAt=Date.now()),re().info(`\u5DF2\u4FDD\u5B58\u5230\u5168\u5C40\u6A21\u677F\u300C${t.name}\u300D`,null,{toast:"success"}),re().info("\u4FDD\u5B58\u5230\u5168\u5C40\u6A21\u677F\u6210\u529F",{templateId:t.id,name:t.name,tableCount:e.length}),Fe()}else re().error(`\u4FDD\u5B58\u5931\u8D25\uFF1A${r?.error||"\u672A\u77E5"}`,null,{toast:!0})}catch(t){re().error("\u4FDD\u5B58\u5230\u5168\u5C40\u6A21\u677F\u5F02\u5E38",t),re().error(`\u4FDD\u5B58\u5F02\u5E38\uFF1A${t?.message||t}`,null,{toast:!0})}}async function BE(){if(!(A.isDirty&&!window.confirm("\u6709\u672A\u4FDD\u5B58\u4FEE\u6539\uFF0C\u7ACB\u5373\u586B\u8868\u4F1A\u5148\u4E22\u5F03\u8FD9\u4E9B\u4FEE\u6539\uFF0C\u786E\u5B9A\uFF1F")))try{let t=await Ta();t?.success?(re().info("\u586B\u8868\u5B8C\u6210",null,{toast:"success"}),Su(),Fe()):re().error(`\u586B\u8868\u5931\u8D25\uFF1A${t?.error||"\u672A\u77E5"}`,null,{toast:!0})}catch(t){re().error("\u7ACB\u5373\u586B\u8868\u5F02\u5E38",t),re().error(`\u5F02\u5E38\uFF1A${t?.message||t}`,null,{toast:!0})}}function sb(t,e){if(!Array.isArray(A.tempData))return;let r=A.tempData,n=t+e;n<0||n>=r.length||([r[t],r[n]]=[r[n],r[t]],A.currentTableIndex===t?A.currentTableIndex=n:A.currentTableIndex===n&&(A.currentTableIndex=t),Te(),Fe())}function zE(t){if(!Array.isArray(A.tempData)||!A.tempData[t])return;let e=A.tempData[t];window.confirm(`\u5220\u9664\u8868\u300C${e.name||`\u8868 ${t+1}`}\u300D\uFF1F\u6B64\u64CD\u4F5C\u4E0D\u53EF\u64A4\u9500\u3002`)&&(A.tempData.splice(t,1),A.currentTableIndex>=A.tempData.length&&(A.currentTableIndex=Math.max(0,A.tempData.length-1)),Te(),Fe())}function KE(){let t=window.prompt("\u65B0\u8868\u540D\uFF1A",`\u8868 ${(A.tempData?.length||0)+1}`);if(!t||!t.trim())return;A.tempData=Array.isArray(A.tempData)?A.tempData:[];let e=new Set(A.tempData.map(s=>s?.id).filter(Boolean)),r=A.tempData.length+1,n=`sheet_${Date.now().toString(36)}_${r}`;for(;e.has(n);)r++,n=`sheet_${Date.now().toString(36)}_${r}`;A.tempData.push({id:n,name:t.trim(),enabled:!0,note:"",aiInstructions:{init:"",create:"",update:"",delete:""},updateConfig:{},exportConfig:{enabled:!1},columns:[{key:"col_1",title:"\u5B57\u6BB51",description:"",type:"text",required:!1}],rows:[]}),A.currentTableIndex=A.tempData.length-1,Te(),Fe()}function jE(t,e){if(!(!t||!Number.isFinite(e)))try{let r={chatId:A.targetSnapshot?.chatId||"",isolationKey:ae.getKey()},n=so(r,t)||{rows:{}},s=!!(n.rows&&n.rows[e]);ol(r,t,e,!s),re().info(s?`\u5DF2\u89E3\u9501\u884C #${e+1}`:`\u5DF2\u9501\u5B9A\u884C #${e+1}\uFF08AI \u4E0D\u4F1A\u6539\u8FD9\u884C\uFF09`,null,{toast:"success"}),re().info("row-lock toggled",{sheetUid:t,rowIndex:e,locked:!s}),Fe()}catch(r){re().error("row-lock \u5F02\u5E38",r),re().error(`\u9501\u5B9A\u5931\u8D25\uFF1A${r?.message||r}`,null,{toast:!0})}}function UE(t,e,r){if(!(!t||!Number.isFinite(e)||!r))try{let n={chatId:A.targetSnapshot?.chatId||"",isolationKey:ae.getKey()},s=so(n,t)||{cells:{}},o=`${e}::${r}`,a=!!(s.cells&&s.cells[o]);il(n,t,e,r,!a),re().info(a?`\u5DF2\u89E3\u9501 [${e}][${r}]`:`\u5DF2\u9501\u5B9A [${e}][${r}]`,null,{toast:"success"}),re().info("cell-lock toggled",{sheetUid:t,rowIndex:e,colKey:r,locked:!a}),Fe()}catch(n){re().error("cell-lock \u5F02\u5E38",n),re().error(`\u9501\u5B9A\u5931\u8D25\uFF1A${n?.message||n}`,null,{toast:!0})}}function FE(t){if(!Number.isFinite(t)||!window.confirm(`\u786E\u5B9A\u5220\u9664\u7B2C ${t+1} \u884C\uFF1F`))return;let e=yt();e?.rows&&(e.rows.splice(t,1),Te(),Fe())}function WE(){let t=yt();t&&(Array.isArray(t.rows)||(t.rows=[]),t.rows.push({id:Pr("row"),name:"",cells:{}}),Te(),Fe())}function HE(t,e){if(!t||!e){re().error("\u5217\u9501\u5B9A\u5931\u8D25\uFF1A\u7F3A\u5C11 sheetUid \u6216 colKey",null,{toast:!0});return}try{let n={chatId:A.targetSnapshot?.chatId||"",isolationKey:ae.getKey()},s=so(n,t)||{cols:{}},o=!!(s.cols&&s.cols[e]);al(n,t,e,!o),re().info(o?`\u5DF2\u89E3\u9501 ${e}`:`\u5DF2\u9501\u5B9A ${e}\uFF08AI \u4E0D\u4F1A\u6539\u8FD9\u5217\uFF09`,null,{toast:"success"}),re().info("field-lock toggled",{sheetUid:t,colKey:e,locked:!o}),Fe()}catch(r){re().error("field-lock \u5F02\u5E38",r),re().error(`\u9501\u5B9A\u5931\u8D25\uFF1A${r?.message||r}`,null,{toast:!0})}}function GE(t){let e=yt();e?.columns?.[t]&&window.confirm(`\u5220\u9664\u5B57\u6BB5\u300C${e.columns[t].title||e.columns[t].key}\u300D\uFF1F\u6B64\u64CD\u4F5C\u4E0D\u4F1A\u81EA\u52A8\u6E05\u7406\u884C\u6570\u636E\u3002`)&&(e.columns.splice(t,1),Te(),Fe())}function qE(){let t=yt();if(!t)return;t.columns=Array.isArray(t.columns)?t.columns:[];let e=new Set(t.columns.map(n=>n?.key).filter(Boolean)),r=t.columns.length+1;for(;e.has(`col_${r}`);)r++;t.columns.push({key:`col_${r}`,title:`\u5B57\u6BB5${r}`,description:"",type:"text",required:!1}),Te(),Fe()}function Tu(t={}){if(re().info("openTableDataEditor \u8C03\u7528",{options:t}),_E(),!(window.jQuery||window.parent?.jQuery)){let n="jQuery \u4E0D\u53EF\u7528\uFF08window.jQuery \u548C window.parent.jQuery \u90FD\u662F undefined\uFF09";re().error(n);try{re().error(`\u6570\u636E\u7F16\u8F91\u5668\u6253\u5F00\u5931\u8D25\uFF1A${n}`,null,{toast:!0})}catch{}return null}try{let n=vt.getState(bu);if(n){let s=Number(n.width),o=Number(n.height),a=Number.isFinite(s)&&s<800||Number.isFinite(o)&&o<500;(n.isMaximized||a)&&(re().info("\u68C0\u6D4B\u5230\u4E0D\u5408\u7406 saved state\uFF0C\u91CD\u7F6E\u4E3A\u9ED8\u8BA4\u5C3A\u5BF8",{isMaximized:n.isMaximized,savedW:s,savedH:o}),vt.saveState(bu,{width:1200,height:800,isMaximized:!1,x:void 0,y:void 0}))}}catch(n){re().warn("saved state sanity check \u5F02\u5E38",n)}if(A.$window&&A.$window.length&&qt().body.contains(A.$window[0])){if(t.focusTableUid){let s=(A.tempData||[]).findIndex(o=>(o?.uid||o?.id)===t.focusTableUid);s>=0&&(A.currentTableIndex=s)}return t.focusMode&&["data","schema","global"].includes(t.focusMode)&&(A.mode=t.focusMode),t.openAssistant&&!A._assistantOpen&&(A._assistantOpen=!0),Fe(),A.$window}if(Su(),t.focusTableUid){let s=(A.tempData||[]).findIndex(o=>(o?.uid||o?.id)===t.focusTableUid);s>=0&&(A.currentTableIndex=s)}t.focusMode&&["data","schema","global"].includes(t.focusMode)&&(A.mode=t.focusMode),t.openAssistant&&(A._assistantOpen=!0);let r;try{r=tu({id:bu,title:"\u586B\u8868\u6570\u636E\u7F16\u8F91\u5668",content:'<div class="yyt-tde-placeholder"></div>',width:1200,height:800,modal:!1,resizable:!0,maximizable:!0,rememberState:!0,onReady:n=>{A.$window=n,Fe()},onClose:()=>{A.isDirty&&re().warn("\u6570\u636E\u7F16\u8F91\u5668\u5173\u95ED\u65F6\u6709\u672A\u4FDD\u5B58\u4FEE\u6539"),A.$window=null,A._assistantOpen=!1,A._refs={saveBtn:null,saveGlobalBtn:null,dirtyBadge:null}}})}catch(n){re().error("createWindow \u629B\u9519",n);try{re().error(`\u521B\u5EFA\u7A97\u53E3\u5931\u8D25\uFF1A${n?.message||n}`,null,{toast:!0})}catch{}return null}return r}var bu,xu,A,TE,wu,ab=O(()=>{ru();lt();Y();os();ya();ul();Ds();Jt();Be();$r();ll();nr();rb();bu="yyt-table-data-editor";A={$window:null,mode:"data",tempData:null,currentTableIndex:-1,isDirty:!1,isFromTemplate:!1,_pendingMirrorTag:null,_pendingWrapperConfig:null,targetSnapshot:null,_afterSaveGlobalAt:0,_assistantOpen:!1,_refs:{saveBtn:null,saveGlobalBtn:null,dirtyBadge:null}};TE=`
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
`,wu=!1});function z(){return _u||(_u=I.createScope("TableWorkbenchView")),_u}async function YE(){try{let t=await Qo();if(!t)return $t.kind=null,$t.lastError="Provider \u4E0D\u53EF\u7528",$t;if($t.kind=t.kind,typeof t.query=="function"){let e=await t.query({statement:"SELECT COUNT(*) as c FROM table_sheets"}),r=await t.query({statement:"SELECT COUNT(*) as c FROM table_rows"});$t.sheetCount=e?.rows?.[0]?.c??0,$t.rowCount=r?.rows?.[0]?.c??0}$t.lastError=null,$t.lastRefreshAt=Date.now(),z().info("Provider stats \u5DF2\u5237\u65B0",{...$t})}catch(t){$t.lastError=t?.message||String(t),z().warn("Provider stats \u5237\u65B0\u5931\u8D25",t)}return $t}function VE(){if(!$t.kind){let t=Us();t?.kind&&($t.kind=t.kind)}return $t}function ge(t){return String(t??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function lb(t){if(!Number.isFinite(t)||t<=0)return"\u4ECE\u672A";let e=Date.now()-t;if(e<6e4)return`${Math.floor(e/1e3)} \u79D2\u524D`;if(e<36e5)return`${Math.floor(e/6e4)} \u5206\u949F\u524D`;if(e<864e5)return`${Math.floor(e/36e5)} \u5C0F\u65F6\u524D`;try{return new Date(t).toLocaleString()}catch{return"\u672A\u77E5"}}function db(t){let{config:e,activeTemplate:r,isolationKey:n,tablesPreview:s,templateArchives:o=[],providerStats:a={}}=t,i=e?.runtime||{},l=i.lastStatus==="success"?"\u2713 \u4E0A\u6B21\u6210\u529F":i.lastStatus==="failed"?"\u2717 \u4E0A\u6B21\u5931\u8D25":i.lastStatus==="running"?"\u8FD0\u884C\u4E2D":"\u5F85\u547D",d=i.lastStatus==="success"?"success":i.lastStatus==="failed"?"error":"muted",c=e?.automation?.enabled?"\u81EA\u52A8":"\u624B\u52A8",u=e?.apiPreset||"\u8DDF\u968F\u4E3B API",y=e?.bypassPresetId?"\u5DF2\u7ED1\u5B9A":"\u65E0",p=Array.isArray(o)?o.length:0;return`
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
          ${r?.mode&&r.mode!==Qe.INHERIT_GLOBAL?`<button class="yyt-tww-btn yyt-tww-btn-small" data-action="reset-template-scope" title="\u672C chat \u5F53\u524D\u662F\u300C${r.mode===Qe.CHAT_OVERRIDE?"chat \u4E13\u5C5E":"\u94FE\u63A5\u9884\u8BBE"}\u300D\u6A21\u5F0F\uFF0C\u70B9\u51FB\u6062\u590D\u4E3A\u300C\u7EE7\u627F\u5168\u5C40\u300D"><i class="fa-solid fa-rotate-right"></i> \u6062\u590D\u7EE7\u627F</button>`:""}
          <button class="yyt-tww-btn yyt-tww-btn-small yyt-tww-btn-danger" data-action="reset-chat-data" title="\u6E05\u7A7A\u5F53\u524D\u804A\u5929\u6240\u6709\u697C\u5C42\u7684\u8868\u683C\u6570\u636E\uFF0C\u8BA9\u6A21\u677F\u5207\u6362\u540E\u4ECE\u5934\u5F00\u59CB"><i class="fa-solid fa-trash-can"></i> \u6E05\u7A7A chat \u6570\u636E</button>
        </div>
      </div>
      <div class="yyt-tww-hero-desc">\u4ECE\u5BF9\u8BDD\u5185\u5BB9\u63D0\u53D6\u7ED3\u6784\u5316\u6570\u636E\uFF0C\u81EA\u52A8\u7EF4\u62A4\u8868\u683C\u72B6\u6001\u3002</div>
      <div class="yyt-tww-hero-chips">
        <span class="yyt-tww-chip mode">\u6A21\u5F0F ${ge(c)}</span>
        <span class="yyt-tww-chip preset">\u6A21\u677F: ${ge(r?.template?.name||"\u9ED8\u8BA4")}</span>
        ${(()=>{let g=r?.mode;if(g===Qe.CHAT_OVERRIDE)return'<span class="yyt-tww-chip preset" title="\u672C chat \u7528\u4E86\u72EC\u7ACB\u6A21\u677F\u526F\u672C\uFF08\u4FEE\u6539\u4E0D\u5F71\u54CD\u5168\u5C40\uFF09\u3002\u53EF\u5728\u300C\u91CD\u7F6E\u8303\u56F4\u300D\u6309\u94AE\u65C1\u7684\u83DC\u5355\u6062\u590D\u7EE7\u627F\u5168\u5C40\u3002">\u4F5C\u7528\u57DF: chat \u4E13\u5C5E</span>';if(g===Qe.PRESET_LINK){let m=r?.source?.presetName||"";return`<span class="yyt-tww-chip preset" title="\u672C chat \u94FE\u63A5\u5230\u5168\u5C40\u9884\u8BBE ${ge(m)}\uFF0C\u8DDF\u968F\u8BE5\u9884\u8BBE\u53D8\u5316\u3002">\u4F5C\u7528\u57DF: \u94FE\u63A5 ${ge(m)}</span>`}return'<span class="yyt-tww-chip preset" title="\u672C chat \u8DDF\u968F\u5168\u5C40\u6FC0\u6D3B\u6A21\u677F\u3002">\u4F5C\u7528\u57DF: \u7EE7\u627F\u5168\u5C40</span>'})()}
        <span class="yyt-tww-chip preset">API: ${ge(u)}</span>
        <span class="yyt-tww-chip preset">\u6307\u4EE4: ${ge(y)}</span>
        ${(()=>{let g=e?.runScope||e?.scope?.mode||"enabled";return g==="enabled"?'<span class="yyt-tww-chip preset">\u8303\u56F4: \u6240\u6709\u542F\u7528\u8868</span>':`<button class="yyt-tww-chip status-failed" data-action="reset-run-scope" title="\u5F53\u524D AI \u53EA\u4F1A\u586B\u90E8\u5206\u8868\uFF0C\u70B9\u51FB\u91CD\u7F6E\u4E3A\u300C\u6240\u6709\u542F\u7528\u8868\u300D" style="border:0;cursor:pointer;">\u8303\u56F4: ${ge(g==="current"?"\u26A0\uFE0F \u4EC5\u5F53\u524D\u8868":"\u4EC5\u9009\u4E2D\u8868")} \u2014 \u70B9\u6B64\u91CD\u7F6E</button>`})()}
        ${(()=>{let g=a?.kind,m=a?.sheetCount,h=a?.rowCount,b=m!==null&&h!==null?` \u2014 ${m} \u8868 ${h} \u884C`:"";return g==="authority"?`<span class="yyt-tww-chip status-success" title="\u6570\u636E\u6301\u4E45\u5316\u5230\u771F\u540E\u7AEF SQLite\uFF08ST-Delegation-of-authority \u63D0\u4F9B\uFF09">\u2713 \u771F\u540E\u7AEF SQLite${ge(b)}</span>`:g==="fallback"?`<span class="yyt-tww-chip preset" title="\u6570\u636E\u6301\u4E45\u5316\u5230 localStorage\uFF08\u672A\u88C5 ST-Delegation-of-authority\uFF09">\u2139 Fallback (localStorage)${ge(b)}</span>`:'<span class="yyt-tww-chip" title="Provider \u8FD8\u672A\u521D\u59CB\u5316\uFF08\u61D2\u52A0\u8F7D\uFF09">Provider \u52A0\u8F7D\u4E2D...</span>'})()}
        ${n?`<span class="yyt-tww-chip">\u9694\u79BB: ${ge(n)}</span>`:""}
        <span class="yyt-tww-chip status-${d==="success"?"success":d==="error"?"failed":""}">${ge(l)}</span>
        <span class="yyt-tww-chip yyt-tww-chip-toggle" data-action="toggle-chips" title="\u5C55\u5F00/\u6536\u8D77">\u25B8</span>
      </div>
    </div>

    <!-- v1.0.209 #3 \u4FEE\u590D\uFF1Ahero \u63D0\u5230\u6EDA\u52A8\u533A\u5916\u9762\uFF08\u540C .yyt-tww \u76F4\u63A5\u5B50\uFF09\uFF0C\u4E0B\u9762\u6240\u6709\u5185\u5BB9\u5305\u8FDB .yyt-tww-scroll \u5355\u4E00\u6EDA\u52A8\u5BB9\u5668\u3002
         hero \u7269\u7406\u4E0A\u5C31\u4E0D\u5728\u6EDA\u52A8\u533A\u5185 \u2192 \u4E0D\u4F1A\u88AB\u6EDA\u8D70\u3002JS \u76D1\u542C scrollTop > 0 \u5207\u6362 compact \u6001\u538B\u7F29 hero\u3002 -->
    <div class="yyt-tww-scroll">

    <!-- \u6A21\u677F\u5F52\u6863\u5217\u8868\uFF08\u9ED8\u8BA4\u9690\u85CF\uFF0Chero \u6309\u94AE toggle\uFF09 -->
    <div class="yyt-tww-archives" data-archives-panel style="display:none;">
      ${ZE(o)}
    </div>

    <!-- Runtime stats -->
    <div class="yyt-tww-stat-row">
      <div class="yyt-tww-stat">
        <span class="yyt-tww-stat-label">\u72B6\u6001</span>
        <span class="yyt-tww-stat-value ${d}">${ge(l)}</span>
      </div>
      <div class="yyt-tww-stat">
        <span class="yyt-tww-stat-label">\u6700\u8FD1\u8FD0\u884C</span>
        <span class="yyt-tww-stat-value muted">${ge(lb(i.lastRunAt))}</span>
      </div>
      <div class="yyt-tww-stat">
        <span class="yyt-tww-stat-label">\u6210\u529F</span>
        <span class="yyt-tww-stat-value success">${ge(i.successCount||0)}</span>
      </div>
      <div class="yyt-tww-stat">
        <span class="yyt-tww-stat-label">\u5931\u8D25</span>
        <span class="yyt-tww-stat-value ${i.errorCount?"error":"muted"}">${ge(i.errorCount||0)}</span>
      </div>
    </div>

    <!-- Body sections -->
    <div class="yyt-tww-body">

      <section class="yyt-tww-section" data-section="bindings">
        <div class="yyt-tww-section-heading">
          <span class="yyt-tww-section-icon"><i class="fa-solid fa-link"></i></span>
          \u7ED1\u5B9A
        </div>
        ${JE(t)}
      </section>

      <section class="yyt-tww-section" data-section="behavior">
        <div class="yyt-tww-section-heading">
          <span class="yyt-tww-section-icon"><i class="fa-solid fa-arrows-rotate"></i></span>
          \u586B\u8868\u884C\u4E3A
        </div>
        ${XE(t)}
      </section>

      <section class="yyt-tww-section" data-section="overview">
        <div class="yyt-tww-section-heading">
          <span class="yyt-tww-section-icon"><i class="fa-solid fa-table-cells"></i></span>
          \u8868\u683C\u6982\u89C8
          <span class="yyt-tww-section-action">
            <button class="yyt-tww-btn yyt-tww-btn-small" data-action="open-editor"><i class="fa-solid fa-table-cells"></i> \u6253\u5F00\u6570\u636E\u7F16\u8F91\u5668</button>
          </span>
        </div>
        ${eA(t.tablesPreview)}
      </section>

    </div>

    </div>
  </div>
  `}function JE(t){let{config:e,allTemplates:r,apiPresets:n,bypassPresets:s,regexPresets:o,worldbookPresets:a,activeTemplate:i}=t,l=r.map(S=>`<option value="${ge(S.id)}" ${i?.source?.templateId===S.id?"selected":""}>${ge(S.name)}</option>`).join(""),d=e?.autoUpdateEnabled===!0?"auto":"manual",c=e?.apiPreset||"",u='<option value="">\u2014\u2014 \u8DDF\u968F\u4E3B API \u2014\u2014</option>'+n.map(S=>`<option value="${ge(S.name)}" ${S.name===c?"selected":""}>${ge(S.name)}</option>`).join(""),y=e?.bypass?.presetId||"",p='<option value="">\u2014\u2014 \u65E0 \u2014\u2014</option>'+s.map(S=>`<option value="${ge(S.id)}" ${S.id===y?"selected":""}>${ge(S.name)}${S.isDefault?" [\u9ED8\u8BA4]":""}</option>`).join(""),g=e?.extraction?.regexPresetId||"",m='<option value="">\u2014\u2014 \u65E0\uFF08\u4E0D\u8FDB\u884C\u63D0\u53D6\uFF09 \u2014\u2014</option>'+o.map(S=>`<option value="${ge(S.id)}" ${S.id===g?"selected":""}>${ge(S.name)}</option>`).join(""),h=e?.worldbooks?.presetId||"",b='<option value="">\u2014\u2014 \u65E0 \u2014\u2014</option>'+a.map(S=>`<option value="${ge(S.id)}" ${S.id===h?"selected":""}>${ge(S.name)}</option>`).join(""),w=e?.runScope||"enabled";return`
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
      <select class="yyt-select yyt-tww-ctrl" data-binding="worldbookPreset">${b}</select>
      <div class="yyt-tww-row-meta"><a data-link="worldbook">\u7BA1\u7406\u2026</a></div>
    </div>

    <div class="yyt-tww-row">
      <div class="yyt-tww-row-label">
        <span class="yyt-tww-row-label-text">\u4F5C\u7528\u57DF</span>
        <span class="yyt-tww-row-label-hint">\u6570\u636E\u72B6\u6001\u7ED1\u5B9A\u7684\u8303\u56F4</span>
      </div>
      <select class="yyt-select yyt-tww-ctrl" data-binding="runScope">
        <option value="current" ${w==="current"?"selected":""}>\u4EC5\u5F53\u524D\u6D3B\u52A8\u8868</option>
        <option value="selected" ${w==="selected"?"selected":""}>\u5F53\u524D\u9009\u4E2D\u8868</option>
        <option value="enabled" ${w==="enabled"?"selected":""}>\u6240\u6709\u542F\u7528\u7684\u8868</option>
      </select>
      <div class="yyt-tww-row-meta"></div>
    </div>
  `}function XE(t){let{config:e}=t,r=e?.fillMode||"incremental",n=Number(e?.contextDepth)||3,s=e?.worldbookSync?.enabled===!0,o=e?.mirrorToMessage===!0;return`
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
      <input class="yyt-input yyt-tww-ctrl" type="number" min="1" max="50" data-binding="contextDepth" value="${ge(n)}">
      <div class="yyt-tww-row-meta"></div>
    </div>

    <div class="yyt-tww-toggle-row">
      <div class="yyt-tww-toggle-info">
        <div class="yyt-tww-toggle-title">\u540C\u6B65\u5230\u4E16\u754C\u4E66</div>
        <div class="yyt-tww-toggle-desc">\u628A\u8868\u683C\u5E8F\u5217\u5316\u4E3A\u4E16\u754C\u4E66\u6761\u76EE\u8BA9\u4E3B\u6A21\u578B\u5728\u751F\u6210\u65F6\u770B\u5230\u3002</div>
      </div>
      <div class="yyt-tww-toggle ${s?"on":""}" data-toggle="worldbookSync"></div>
    </div>

    ${QE(t)}

    <div class="yyt-tww-toggle-row">
      <div class="yyt-tww-toggle-info">
        <div class="yyt-tww-toggle-title">\u5199\u56DE\u6B63\u6587\u955C\u50CF</div>
        <div class="yyt-tww-toggle-desc">\u5728\u52A9\u624B\u6D88\u606F\u672B\u5C3E\u955C\u50CF\u5199\u5165 markdown \u65B9\u4FBF\u624B\u52A8\u67E5\u9605\u3002</div>
      </div>
      <div class="yyt-tww-toggle ${o?"on":""}" data-toggle="mirrorToMessage"></div>
    </div>
  `}function QE(t){let e=t?.config?.worldbookSync||{};if(!(e.enabled===!0))return"";let n=e.injectionMode||"character_card",s=String(e.targetBook||""),o=t?.chatOpen===!0,a=n==="target_book"?`
    <div class="yyt-tww-sub-row">
      <label>\u76EE\u6807\u4E16\u754C\u4E66</label>
      <button class="yyt-btn yyt-btn-small" data-action="pick-target-book">${s?ge(s):"\u9009\u62E9\u4E16\u754C\u4E66..."}</button>
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
  `}function ZE(t=[]){return!Array.isArray(t)||t.length===0?'<div class="yyt-tww-empty">\u5F53\u524D chat \xD7 isolationKey \u6682\u65E0\u5F52\u6863\uFF08\u4EC5\u5728\u5207\u6362\u6A21\u677F\u65F6\u81EA\u52A8\u5F52\u6863\u5F53\u524D\u72B6\u6001\uFF09</div>':`
    <div class="yyt-tww-archives-header">\u6A21\u677F\u5F52\u6863\u5386\u53F2 (${t.length}/8)</div>
    <div class="yyt-tww-archives-list">
      ${t.map((e,r)=>{let n=e?.state||{},s=n.mode||"unknown",o=e?.archivedAt?new Date(e.archivedAt).toLocaleString():"\u672A\u77E5\u65F6\u95F4",a=n.presetName||"",i=s==="preset_link"?`\u9884\u8BBE\u94FE\u63A5: ${ge(a)}`:s==="chat_override"?"chat \u7EA7\u8986\u76D6\u6A21\u677F":s==="inherit_global"?"\u7EE7\u627F\u5168\u5C40":ge(s);return`
          <div class="yyt-tww-archive-item" data-archive-index="${r}">
            <div class="yyt-tww-archive-meta">
              <span class="yyt-tww-archive-time">${ge(o)}</span>
              <span class="yyt-tww-archive-mode">${i}</span>
            </div>
            <button class="yyt-tww-btn yyt-tww-btn-small" data-action="restore-archive" data-archive-index="${r}" title="\u6062\u590D\u6B64\u5F52\u6863\uFF08\u6062\u590D\u524D\u81EA\u52A8\u5F52\u6863\u5F53\u524D\u72B6\u6001\uFF09">\u6062\u590D</button>
          </div>
        `}).join("")}
    </div>
  `}function eA(t){return!Array.isArray(t)||t.length===0?'<div class="yyt-tww-empty">\u5F53\u524D slot \u6682\u65E0\u8868\u6570\u636E\u3002\u8BF7\u5148"\u7ACB\u5373\u586B\u8868"\u6216\u5728\u6570\u636E\u7F16\u8F91\u5668\u4E2D\u521D\u59CB\u5316\u3002</div>':`
    <div class="yyt-tww-table-grid">
      ${t.map((e,r)=>`
        <div class="yyt-tww-table-card${e.enabled===!1?" yyt-tww-table-card-disabled":""}" data-table-index="${r}" data-table-id="${ge(e.id||"")}">
          <div class="yyt-tww-table-card-header">
            <label class="yyt-tww-table-card-toggle" title="${e.enabled===!1?"\u5DF2\u7981\u7528 \u2014 AI \u4E0D\u4F1A\u586B\u8FD9\u5F20\u8868":"\u5DF2\u542F\u7528 \u2014 AI \u4F1A\u586B\u8FD9\u5F20\u8868"}">
              <input type="checkbox" data-action="toggle-table-enabled" data-table-id="${ge(e.id||"")}" ${e.enabled===!1?"":"checked"} />
              <span class="yyt-tww-table-card-toggle-slider"></span>
            </label>
            <span class="yyt-tww-table-card-name">${ge(e.name||`\u8868 ${r+1}`)}</span>
            <i class="fa-solid fa-arrow-right yyt-tww-table-card-arrow"></i>
          </div>
          <div class="yyt-tww-table-card-stats">
            <span><b>${ge(e.rowCount||0)}</b> \u884C</span>
            <span><b>${ge(e.colCount||0)}</b> \u5B57\u6BB5</span>
            ${e.updatedHint?`<span>${ge(e.updatedHint)}</span>`:""}
          </div>
        </div>
      `).join("")}
    </div>
  `}function ub(){let t=(()=>{try{return be()}catch{return{}}})(),e=(()=>{try{return fn()||[]}catch{return[]}})(),r=(()=>{try{return Gs({})}catch{return null}})(),n=(()=>{try{return Gr()||[]}catch{return[]}})(),s=(()=>{try{return ra()||[]}catch{return[]}})(),o=(()=>{try{return Re.listPresets()||[]}catch{return[]}})(),a=(()=>{try{return ht.listPresets()||[]}catch{return[]}})(),i=(()=>{try{return ae.getKey()}catch{return""}})(),l=tA(),d=rA(),c=nA(),u=null,y=0;try{let b=ss(null);Array.isArray(b?.tableState?.tables)&&b.tableState.tables.length>0&&(u=b.tableState.tables,y=Number(b.tableState.updatedAt)||0)}catch{}let p=u||r?.template?.tables||t?.tables||[],g=t?.tableEnabledOverrides&&typeof t.tableEnabledOverrides=="object"?t.tableEnabledOverrides:{},m=p.map(b=>{let w=b?.id||"",S=w&&Object.prototype.hasOwnProperty.call(g,w)?g[w]:void 0;return{id:w,name:b?.name||"",enabled:S!==void 0?S:b?.enabled!==!1,rowCount:Array.isArray(b?.rows)?b.rows.length:0,colCount:Array.isArray(b?.columns)?b.columns.length:0,updatedHint:u&&y>0?lb(y):""}}),h=(()=>{try{return Ig()||[]}catch{return[]}})();return{config:t,activeTemplate:r,allTemplates:e,apiPresets:n,bypassPresets:s,regexPresets:o,worldbookPresets:a,availableWorldbooks:l,boundLorebook:d,chatOpen:c,isolationKey:i,tablesPreview:m,templateArchives:h,providerStats:VE()}}function tA(){try{let t=globalThis.window||globalThis,e=t?.TavernHelper||t?.parent?.TavernHelper;if(!e)return[];if(typeof e.getLorebooks=="function"){let r=e.getLorebooks();if(Array.isArray(r))return r}if(typeof e.getLorebookList=="function"){let r=e.getLorebookList();if(Array.isArray(r))return r}}catch(t){z().warn("loadAvailableWorldbooks \u5931\u8D25",t)}return[]}function rA(){try{let t=globalThis.window||globalThis,e=t?.TavernHelper||t?.parent?.TavernHelper;if(e){if(typeof e.getCurrentCharPrimaryLorebook=="function"){let n=e.getCurrentCharPrimaryLorebook();if(typeof n=="string"&&n)return n}if(typeof e.getCharLorebooks=="function")try{let n=e.getCharLorebooks();if(n?.primary)return String(n.primary)}catch{}if(typeof e.getChatLorebook=="function")try{let n=e.getChatLorebook();if(typeof n=="string"&&n)return n}catch{}}let r=t?.SillyTavern?.getContext?.()||t?.parent?.SillyTavern?.getContext?.();if(r){let n=r.characters?.[r.characterId],s=n?.data?.character_book?.name||n?.data?.extensions?.world||n?.world;if(typeof s=="string"&&s)return s}}catch(t){z().warn("loadCharacterBoundLorebook \u5931\u8D25",t)}return""}function nA(){try{let t=globalThis.window||globalThis,e=t?.TavernHelper||t?.parent?.TavernHelper;if(e&&typeof e.getCurrentChatId=="function"){let n=e.getCurrentChatId();return!!(n&&String(n).trim()&&String(n).trim()!=="default_chat")}let r=t?.SillyTavern?.getContext?.()||t?.parent?.SillyTavern?.getContext?.();if(r){let n=r.chat;if(Array.isArray(n)&&n.length>0||r.chatId)return!0}}catch{}return!1}function Eu(t,e){let r=window.jQuery||window.parent?.jQuery;if(!r||!t||!t.on){z().warn("bindWorkbenchEvents: jQuery \u6216 $container \u4E0D\u53EF\u7528");return}t.off(".tww"),ib||(ib=!0,YE().then(()=>{typeof e=="function"&&e()}).catch(()=>{})),t.on("click.tww",'[data-action="run-now"]',async()=>{try{let s=await Ta();s?.success?z().info("\u586B\u8868\u5B8C\u6210",null,{toast:"success"}):z().error(`\u586B\u8868\u5931\u8D25\uFF1A${s?.error||"\u672A\u77E5"}`,null,{toast:!0}),typeof e=="function"&&e()}catch(s){z().error("\u7ACB\u5373\u586B\u8868\u5F02\u5E38",s),z().error(`\u5F02\u5E38\uFF1A${s?.message||s}`,null,{toast:!0})}}),t.on("click.tww",'[data-action="run-clear"]',async()=>{if(window.confirm("\u91CD\u586B\u4F1A\u6E05\u7A7A\u5F53\u524D\u6D88\u606F\u697C\u5C42\u7684\u8868\u683C\u6570\u636E\u5E76\u91CD\u65B0\u751F\u6210\uFF0C\u786E\u5B9A\uFF1F"))try{let s=await Ta(null,{clearBeforeUpdate:!0});s?.success?z().info("\u91CD\u586B\u5B8C\u6210",null,{toast:"success"}):z().error(`\u91CD\u586B\u5931\u8D25\uFF1A${s?.error||"\u672A\u77E5"}`,null,{toast:!0}),typeof e=="function"&&e()}catch(s){z().error("\u91CD\u586B\u5F02\u5E38",s),z().error(`\u5F02\u5E38\uFF1A${s?.message||s}`,null,{toast:!0})}}),t.on("click.tww",'[data-action="reset-run-scope"]',()=>{try{let s=be();Ze({...s,runScope:"enabled",scope:{...s.scope||{},mode:"enabled",activeTableId:"",selectedTableIds:[]}}),z().info("\u5DF2\u91CD\u7F6E\u8303\u56F4\u4E3A\u300C\u6240\u6709\u542F\u7528\u8868\u300D",null,{toast:"success"}),z().info("\u7528\u6237\u91CD\u7F6E runScope \u4E3A enabled"),typeof e=="function"&&e()}catch(s){z().error("\u91CD\u7F6E\u8303\u56F4\u5F02\u5E38",s),z().error(`\u91CD\u7F6E\u5931\u8D25\uFF1A${s?.message||s}`,null,{toast:!0})}}),t.on("click.tww",'[data-action="toggle-chips"]',function(){let s=t.find(".yyt-tww-hero-chips")[0];if(!s)return;let o=s.classList.toggle("yyt-tww-hero-chips-expanded");this.textContent=o?"\u25BE":"\u25B8"}),t.on("click.tww",'[data-action="export-templates"]',()=>{try{let s=ki(),o=JSON.stringify(s,null,2),a=new Blob([o],{type:"application/json"}),i=URL.createObjectURL(a),l=document.createElement("a");l.href=i,l.download=`youyou-table-templates-${Date.now()}.json`,document.body.appendChild(l),l.click(),document.body.removeChild(l),URL.revokeObjectURL(i);let d=Array.isArray(s?.templates)?s.templates.length:0;z().info(`\u5DF2\u5BFC\u51FA ${d} \u4E2A\u6A21\u677F\u5230\u4E0B\u8F7D\u6587\u4EF6\u5939`,null,{toast:"success"}),z().info("export-templates \u5B8C\u6210",{count:d})}catch(s){z().error("export-templates \u5F02\u5E38",s),z().error(`\u5BFC\u51FA\u5931\u8D25\uFF1A${s?.message||s}`,null,{toast:!0})}}),t.on("click.tww",'[data-action="reset-template-scope"]',()=>{if(window.confirm("\u6062\u590D\u672C chat \u7684\u6A21\u677F\u4F5C\u7528\u57DF\u5230\u300C\u7EE7\u627F\u5168\u5C40\u300D\uFF1F\u5F53\u524D\u72B6\u6001\u4F1A\u5148\u81EA\u52A8\u5F52\u6863\uFF0C\u53EF\u5728\u300C\u5F52\u6863\u300D\u4E2D\u6062\u590D\u3002"))try{let s=kg({archive:!0});s?.success?(z().info("\u5DF2\u6062\u590D\u4E3A\u7EE7\u627F\u5168\u5C40",null,{toast:"success"}),z().info("reset-template-scope \u5B8C\u6210"),typeof e=="function"&&e()):z().error(`\u6062\u590D\u5931\u8D25\uFF1A${s?.error||"\u672A\u77E5"}`,null,{toast:!0})}catch(s){z().error("reset-template-scope \u5F02\u5E38",s),z().error(`\u5F02\u5E38\uFF1A${s?.message||s}`,null,{toast:!0})}}),t.on("click.tww",'[data-action="chat-template-override"]',()=>{if(window.confirm(`\u628A\u5F53\u524D\u6FC0\u6D3B\u6A21\u677F\u6DF1\u62F7\u8D1D\u4E3A\u672C chat \u7684\u72EC\u7ACB\u526F\u672C\uFF1F
\u4E4B\u540E\u4FEE\u6539\u4E0D\u5F71\u54CD\u5168\u5C40\u6A21\u677F\u3002\u64CD\u4F5C\u524D\u81EA\u52A8\u5F52\u6863\u5F53\u524D\u72B6\u6001\u3002`))try{let s=yn();if(!s){z().error("\u6CA1\u6709\u53EF\u7528\u7684\u5168\u5C40\u6FC0\u6D3B\u6A21\u677F",null,{toast:!0});return}let o=Ag(s,{source:"workbench-chat-override"});o?.success?(z().info(`\u5DF2\u8BBE\u4E3A chat \u4E13\u5C5E\uFF1A${s.name}`,null,{toast:"success"}),z().info("chat-template-override \u5B8C\u6210",{templateId:s.id,name:s.name}),typeof e=="function"&&e()):z().error(`\u8BBE\u7F6E\u5931\u8D25\uFF1A${o?.error||"\u672A\u77E5"}`,null,{toast:!0})}catch(s){z().error("chat-template-override \u5F02\u5E38",s),z().error(`\u5F02\u5E38\uFF1A${s?.message||s}`,null,{toast:!0})}}),t.on("click.tww",'[data-action="chat-template-link"]',()=>{let s=(()=>{try{return fn()||[]}catch{return[]}})();if(s.length===0){z().info("\u6CA1\u6709\u53EF\u7528\u7684\u6A21\u677F",null,{toast:!0});return}let o=s.map((d,c)=>`${c+1}. ${d.name}`).join(`
`),a=window.prompt(`\u94FE\u63A5\u5230\u54EA\u4E2A\u5168\u5C40\u9884\u8BBE\uFF1F\u8F93\u5165\u7F16\u53F7\uFF081-${s.length}\uFF09\uFF1A

${o}`,"1");if(!a)return;let i=parseInt(a,10)-1;if(!Number.isFinite(i)||i<0||i>=s.length){z().error("\u7F16\u53F7\u65E0\u6548",null,{toast:!0});return}let l=s[i];try{let d=Cg(l.name,{source:"workbench-link-preset"});d?.success?(z().info(`\u5DF2\u94FE\u63A5\u5230\u9884\u8BBE\uFF1A${l.name}`,null,{toast:"success"}),z().info("chat-template-link \u5B8C\u6210",{presetName:l.name}),typeof e=="function"&&e()):z().error(`\u94FE\u63A5\u5931\u8D25\uFF1A${d?.error||"\u672A\u77E5"}`,null,{toast:!0})}catch(d){z().error("chat-template-link \u5F02\u5E38",d),z().error(`\u5F02\u5E38\uFF1A${d?.message||d}`,null,{toast:!0})}}),t.on("click.tww",'[data-action="reset-chat-data"]',async()=>{if(window.confirm("\u5C06\u6E05\u7A7A\u5F53\u524D\u804A\u5929\u6240\u6709\u697C\u5C42\u7684\u8868\u683C\u6570\u636E\uFF08\u4E0D\u5F71\u54CD\u6A21\u677F/\u914D\u7F6E\uFF09\u3002\u4E0B\u6B21\u586B\u8868\u4F1A\u6309\u5F53\u524D\u6FC0\u6D3B\u6A21\u677F\u4ECE\u5934\u5F00\u59CB\u3002\u786E\u5B9A\uFF1F"))try{let s=await Bm();s?.success?(z().info(`\u5DF2\u6E05\u7A7A ${s.touched||0} \u6761\u6D88\u606F\u7684\u8868\u683C\u6570\u636E`,null,{toast:"success"}),z().info("\u6E05\u7A7A chat \u6570\u636E\u5B8C\u6210",s)):z().error("\u6E05\u7A7A\u5931\u8D25",null,{toast:!0}),typeof e=="function"&&e()}catch(s){z().error("\u6E05\u7A7A chat \u6570\u636E\u5F02\u5E38",s),z().error(`\u5F02\u5E38\uFF1A${s?.message||s}`,null,{toast:!0})}}),t.on("click.tww",'[data-action="open-editor"]',s=>{s.preventDefault(),z().info("open-editor button clicked");try{let o=Tu();z().info("openTableDataEditor \u8C03\u7528\u5B8C\u6210",{hasReturn:!!o})}catch(o){z().error("\u6253\u5F00\u6570\u636E\u7F16\u8F91\u5668\u5F02\u5E38",o),z().error(`\u6253\u5F00\u5931\u8D25\uFF1A${o?.message||o}`,null,{toast:!0})}}),t.on("click.tww","[data-table-index]",function(s){if(r(s.target).closest('[data-action="toggle-table-enabled"]').length>0||r(s.target).is("label, label *"))return;s.preventDefault();let o=Number(r(this).attr("data-table-index"));if(!(!Number.isFinite(o)||o<0))try{let i=ss(null)?.tableState?.tables?.[o],l=Tu({focusTableUid:i?.uid||i?.id||""})}catch(a){z().error("\u6253\u5F00\u6570\u636E\u7F16\u8F91\u5668\u5F02\u5E38",a),z().error(`\u6253\u5F00\u5931\u8D25\uFF1A${a?.message||a}`,null,{toast:!0})}}),t.on("click.tww",'[data-action="toggle-archives"]',function(s){s.preventDefault();let o=t.find("[data-archives-panel]").first();o.length&&(o.css("display")==="none"?o.css("display","block"):o.css("display","none"))}),t.on("click.tww",'[data-action="restore-archive"]',async function(s){s.stopPropagation();let o=Number(r(this).attr("data-archive-index"));if(!(!Number.isFinite(o)||o<0)&&window.confirm(`\u6062\u590D\u5F52\u6863 #${o}\uFF1F\u6062\u590D\u524D\u4F1A\u81EA\u52A8\u5F52\u6863\u5F53\u524D\u72B6\u6001\uFF0C\u53EF\u518D\u6B21\u6062\u590D\u56DE\u6765\u3002`))try{let a=Rg(o);a?.success?(z().info("\u5DF2\u6062\u590D\u5F52\u6863",null,{toast:"success"}),z().info("restoreChatTemplateArchive \u6210\u529F",{index:o,scopeState:a.scopeState})):z().error(`\u6062\u590D\u5931\u8D25\uFF1A${a?.error||"\u672A\u77E5"}`,null,{toast:!0}),typeof e=="function"&&e()}catch(a){z().error("\u6062\u590D\u5F52\u6863\u5F02\u5E38",a),z().error(`\u5F02\u5E38\uFF1A${a?.message||a}`,null,{toast:!0})}}),t.on("change.tww",'[data-action="toggle-table-enabled"]',function(s){s.stopPropagation();let o=r(this).attr("data-table-id"),a=r(this).is(":checked");if(o)try{let i=be(),l={...i.tableEnabledOverrides||{}};l[o]=a,Ze({...i,tableEnabledOverrides:l}),z().info(a?`\u5DF2\u542F\u7528 ${o}`:`\u5DF2\u7981\u7528 ${o}`,null,{toast:"success"}),z().info("toggle \u5355\u8868\u6FC0\u6D3B",{tableId:o,enabled:a}),typeof e=="function"&&e()}catch(i){z().error("toggle \u5355\u8868\u6FC0\u6D3B\u5F02\u5E38",i),z().error(`\u5207\u6362\u5931\u8D25\uFF1A${i?.message||i}`,null,{toast:!0})}}),t.on("change.tww",'[data-binding="template"]',function(){let s=r(this).val();try{hd(s);let o=be();Ze({...o,activeTemplate:s}),z().info("\u6A21\u677F\u5DF2\u5207\u6362",null,{toast:"success"}),typeof e=="function"&&e()}catch(o){z().error("\u5207\u6362\u6A21\u677F\u5F02\u5E38",o),z().error(`\u5207\u6362\u5931\u8D25\uFF1A${o?.message||o}`,null,{toast:!0})}}),t.on("change.tww",'[data-binding="triggerMode"]',function(){let s=r(this).val();try{let o=be();Ze({...o,autoUpdateEnabled:s==="auto"}),z().info(s==="auto"?"\u5DF2\u5207\u6362\u4E3A\u81EA\u52A8\u6A21\u5F0F":"\u5DF2\u5207\u6362\u4E3A\u624B\u52A8\u6A21\u5F0F",null,{toast:"success"}),typeof e=="function"&&e()}catch(o){z().error("\u5207\u6362\u89E6\u53D1\u6A21\u5F0F\u5F02\u5E38",o),z().error(`\u5207\u6362\u5931\u8D25\uFF1A${o?.message||o}`,null,{toast:!0})}});let n=[{sel:'[data-binding="apiPreset"]',key:"apiPreset"},{sel:'[data-binding="runScope"]',key:"runScope"},{sel:'[data-binding="fillMode"]',key:"fillMode"}];for(let{sel:s,key:o}of n)t.on("change.tww",s,function(){let a=r(this).val();try{let i=be(),l={...i,[o]:a};o==="runScope"&&(l.scope={...i.scope||{},mode:a,...a==="enabled"?{activeTableId:"",selectedTableIds:[]}:{}}),Ze(l),z().info("\u5DF2\u4FDD\u5B58",null,{toast:"success"})}catch(i){z().error(`\u4FDD\u5B58 ${o} \u5F02\u5E38`,i),z().error(`\u4FDD\u5B58\u5931\u8D25\uFF1A${i?.message||i}`,null,{toast:!0})}});t.on("change.tww",'[data-binding="bypassPreset"]',function(){let s=r(this).val();try{let o=be();Ze({...o,bypass:{...o.bypass||{},presetId:s,enabled:!!s}}),z().info("Ai \u6307\u4EE4\u9884\u8BBE\u5DF2\u4FDD\u5B58",null,{toast:"success"})}catch(o){z().error("\u4FDD\u5B58 bypass \u5F02\u5E38",o),z().error(`\u4FDD\u5B58\u5931\u8D25\uFF1A${o?.message||o}`,null,{toast:!0})}}),t.on("change.tww",'[data-binding="regexPreset"]',function(){let s=r(this).val();try{let o=be();Ze({...o,extraction:{...o.extraction||{},regexPresetId:s}}),z().info("\u6B63\u5219\u9884\u8BBE\u5DF2\u66F4\u65B0",null,{toast:"success"})}catch(o){z().error("\u4FDD\u5B58 regexPreset \u5F02\u5E38",o),z().error(`\u4FDD\u5B58\u5931\u8D25\uFF1A${o?.message||o}`,null,{toast:!0})}}),t.on("change.tww",'[data-binding="worldbookPreset"]',function(){let s=r(this).val();try{let o=be();Ze({...o,worldbooks:{...o.worldbooks||{},presetId:s}}),z().info("\u4E16\u754C\u4E66\u9884\u8BBE\u5DF2\u66F4\u65B0",null,{toast:"success"})}catch(o){z().error("\u4FDD\u5B58 worldbookPreset \u5F02\u5E38",o),z().error(`\u4FDD\u5B58\u5931\u8D25\uFF1A${o?.message||o}`,null,{toast:!0})}}),t.on("change.tww",'[data-binding="contextDepth"]',function(){let s=Math.max(1,parseInt(r(this).val(),10)||3);try{let o=be();Ze({...o,contextDepth:s}),z().info("\u5DF2\u4FDD\u5B58",null,{toast:"success"})}catch(o){z().error("\u4FDD\u5B58 contextDepth \u5F02\u5E38",o),z().error(`\u4FDD\u5B58\u5931\u8D25\uFF1A${o?.message||o}`,null,{toast:!0})}}),t.on("click.tww",'[data-toggle="worldbookSync"]',function(){let s=r(this),o=s.hasClass("on"),a=!o;s.toggleClass("on",a);try{let i=be();Ze({...i,worldbookSync:{...i.worldbookSync||{},enabled:a}}),z().info(a?"\u5DF2\u542F\u7528\u4E16\u754C\u4E66\u540C\u6B65":"\u5DF2\u505C\u7528\u4E16\u754C\u4E66\u540C\u6B65",null,{toast:"success"}),typeof e=="function"&&e()}catch(i){s.toggleClass("on",o),z().error("toggle worldbookSync \u5F02\u5E38",i),z().error(`\u4FDD\u5B58\u5931\u8D25\uFF1A${i?.message||i}`,null,{toast:!0})}}),t.on("change.tww",'[data-binding="worldbookInjectionMode"]',function(){let s=r(this).val();try{let o=be();Ze({...o,worldbookSync:{...o.worldbookSync||{},injectionMode:s}}),z().info("\u5DF2\u5207\u6362\u6CE8\u5165\u6A21\u5F0F",null,{toast:"success"}),typeof e=="function"&&e()}catch(o){z().error("\u4FDD\u5B58 injectionMode \u5F02\u5E38",o)}}),t.on("click.tww",'[data-action="pick-target-book"]',async function(){let s=Va();if(!s.length)try{s=await Oo()}catch{}if(!s.length){await ke.confirm({title:"\u6CA1\u6709\u53EF\u7528\u7684\u4E16\u754C\u4E66",message:"\u5BBF\u4E3B\u672A\u63D0\u4F9B\u53EF\u7528\u4E16\u754C\u4E66\u3002",confirmText:"\u786E\u5B9A"});return}let a=be()?.worldbookSync?.targetBook||"",i=document.createElement("div");i.style.cssText="display:flex;flex-direction:column;gap:8px;";let l=document.createElement("input");l.className="yyt-input",l.placeholder=`\u641C\u7D22 ${s.length} \u672C\u4E16\u754C\u4E66\u2026`,l.style.cssText="padding:7px 10px;font-size:12px;",i.appendChild(l);let d=document.createElement("div");d.style.cssText="display:flex;flex-direction:column;gap:4px;max-height:320px;overflow-y:auto;";let c=a,u=[];for(let p of s){let g=document.createElement("label");g.style.cssText="display:flex;align-items:center;gap:8px;padding:8px 10px;cursor:pointer;border-radius:6px;background:var(--yyt-surface-2,rgba(255,255,255,0.03));font-size:12px;";let m=document.createElement("input");m.type="radio",m.name="targetBookPick",m.value=p,p===a&&(m.checked=!0),m.addEventListener("change",()=>{c=p}),g.appendChild(m);let h=document.createElement("span");h.textContent=p,h.style.color="var(--yyt-text)",g.appendChild(h),d.appendChild(g),u.push({el:g,search:p.toLowerCase()})}i.appendChild(d),l.addEventListener("input",()=>{let p=l.value.trim().toLowerCase();for(let g of u)g.el.style.display=!p||g.search.includes(p)?"":"none"});let y=await ke.custom({title:`\u9009\u62E9\u76EE\u6807\u4E16\u754C\u4E66\uFF08${s.length} \u672C\uFF09`,width:"480px",body:i,buttons:[{label:"\u53D6\u6D88",variant:"ghost",onClick:p=>p(null)},{label:"\u9009\u62E9",variant:"primary",onClick:p=>p(c)}]}).result;if(y&&typeof y=="string")try{let p=be();Ze({...p,worldbookSync:{...p.worldbookSync||{},targetBook:y}}),z().info(`\u76EE\u6807\u4E16\u754C\u4E66\u5DF2\u8BBE\u4E3A: ${y}`,null,{toast:"success"}),typeof e=="function"&&e()}catch(p){z().error("\u4FDD\u5B58 targetBook \u5F02\u5E38",p)}}),t.on("click.tww",'[data-action="clear-worldbook-entries"]',async function(){try{let s=be(),o=await Jm(s);if(o.success)z().info(`\u5DF2\u6E05\u9664 ${o.cleaned||0} \u4E2A\u4E16\u754C\u4E66\u6761\u76EE`,null,{toast:"success"});else{let a={no_target_book:"\u672A\u9009\u62E9\u76EE\u6807\u4E16\u754C\u4E66",no_character_lorebook:"\u5F53\u524D\u89D2\u8272\u5361\u672A\u7ED1\u5B9A\u4E16\u754C\u4E66",chat_worldbook_unavailable:"\u804A\u5929\u4E16\u754C\u4E66\u4E0D\u53EF\u7528"};z().warn(`\u6E05\u9664\u5931\u8D25: ${a[o.error]||o.error}`,null,{toast:!0})}}catch(s){z().error("\u6E05\u9664\u4E16\u754C\u4E66\u6761\u76EE\u5F02\u5E38",s),z().error(`\u6E05\u9664\u5931\u8D25: ${s?.message||s}`,null,{toast:!0})}}),t.on("click.tww",'[data-toggle="mirrorToMessage"]',function(){let s=r(this),o=s.hasClass("on"),a=!o;s.toggleClass("on",a);try{let i=be();Ze({...i,mirrorToMessage:a}),z().info(a?"\u5DF2\u542F\u7528\u6B63\u6587\u955C\u50CF":"\u5DF2\u505C\u7528\u6B63\u6587\u955C\u50CF",null,{toast:"success"})}catch(i){s.toggleClass("on",o),z().error("toggle mirrorToMessage \u5F02\u5E38",i),z().error(`\u4FDD\u5B58\u5931\u8D25\uFF1A${i?.message||i}`,null,{toast:!0})}}),t.on("click.tww","[data-link]",function(s){s.preventDefault(),z().info("\u8DF3\u8F6C\u5230\u9884\u8BBE\u7BA1\u7406\u9762\u677F\uFF08\u5F85\u63A5\u5165\uFF09",null,{toast:!0})})}var _u,$t,ib,cb,pb=O(()=>{Y();Ks();Jt();Ds();Be();$r();ul();os();ab();Be();Wd();Lo();Ro();hs();Ys();rn();xs();$t={kind:null,sheetCount:null,rowCount:null,lastError:null,lastRefreshAt:0},ib=!1;cb=`
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
`});var mb={};ue(mb,{TableWorkbenchPanel:()=>gb,default:()=>oA});function sA(){if(!Au)try{let t=window.parent&&window.parent.document?window.parent.document:document,e=t.head||t.documentElement;if(e.querySelector("#yyt-tww-styles")){Au=!0;return}let r=t.createElement("style");r.id="yyt-tww-styles",r.textContent=cb,e.appendChild(r),Au=!0}catch(t){Ca.warn("\u6CE8\u5165\u5DE5\u4F5C\u53F0\u6837\u5F0F\u5931\u8D25",t)}}function yb(t){let e=t?.[0];if(!e)return;let r=e.closest(".yyt-popup-body");if(!r){Ca.warn("pinWorkbenchHeight: \u627E\u4E0D\u5230 .yyt-popup-body \u7956\u5148");return}let n=()=>{let o=e.querySelector(".yyt-tww");if(!o)return;let a=r.getBoundingClientRect(),i=e.getBoundingClientRect(),l=a.bottom-i.top-8;l>100?o.style.height=`${l}px`:Ca.warn(`pinWorkbenchHeight: \u8BA1\u7B97\u9AD8\u5EA6\u5F02\u5E38 h=${l}, popupBottom=${a.bottom}, tabTop=${i.top}`)};if(n(),requestAnimationFrame(()=>requestAnimationFrame(n)),typeof ResizeObserver>"u"||e.__yytwwROTarget===r&&e.__yytwwRO)return;if(e.__yytwwRO)try{e.__yytwwRO.disconnect()}catch{}let s=new ResizeObserver(()=>n());s.observe(r),e.__yytwwRO=s,e.__yytwwROTarget=r}function fb(t){let e=t?.[0];if(!e)return;let r=e.querySelector(".yyt-tww-hero"),n=e.querySelector(".yyt-tww-scroll");if(!r||!n)return;let s=()=>{n.scrollTop>0?r.classList.add("yyt-tww-hero--compact"):r.classList.remove("yyt-tww-hero--compact")};s(),n.addEventListener("scroll",s,{passive:!0})}var Ca,Au,gb,oA,hb=O(()=>{lt();Y();pb();Ca=I.createScope("TableWorkbenchPanel"),Au=!1;gb={id:"tableWorkbenchPanel",render(){sA();try{let t=ub();return db(t)}catch(t){return Ca.error("\u6E32\u67D3\u5DE5\u4F5C\u53F0 UI \u5F02\u5E38",t),`<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5DE5\u4F5C\u53F0\u6E32\u67D3\u5931\u8D25\uFF1A${t?.message||t}</span></div>`}},bindEvents(t){if(!se()||!$e(t))return;let r=this,n=()=>{try{let s=t[0]?.querySelector(".yyt-tww-scroll"),o=s?s.scrollTop:0;if(t.html(r.render()),Eu(t,n),yb(t),fb(t),o>0){let a=t[0]?.querySelector(".yyt-tww-scroll");a&&(a.scrollTop=o)}}catch(s){Ca.error("refresh \u5F02\u5E38",s)}};Eu(t,n),yb(t),fb(t)},renderTo(t){!se()||!$e(t)||(t.html(this.render()),this.bindEvents(t))}},oA=gb});var xb={};ue(xb,{LoggerPanel:()=>bb,default:()=>dA});function lA(t){switch(t){case he.DEBUG:return"yyt-log-debug";case he.INFO:return"yyt-log-info";case he.WARN:return"yyt-log-warn";case he.ERROR:return"yyt-log-error";default:return""}}function cA(t){let e=new Date(t),r=n=>String(n).padStart(2,"0");return`${r(e.getHours())}:${r(e.getMinutes())}:${r(e.getSeconds())}.${String(e.getMilliseconds()).padStart(3,"0")}`}var aA,iA,bb,dA,wb=O(()=>{Y();at();lt();aA="yyt-logger-panel",iA=[{level:null,label:"\u5168\u90E8",icon:"fa-list"},{level:he.DEBUG,label:"DEBUG",icon:"fa-bug"},{level:he.INFO,label:"INFO",icon:"fa-circle-info"},{level:he.WARN,label:"WARN",icon:"fa-triangle-exclamation"},{level:he.ERROR,label:"ERROR",icon:"fa-circle-exclamation"}];bb={id:"loggerPanel",render(){let t=I.getStats();return`
      <div class="yyt-logger-panel" id="${aA}">
        <div class="yyt-logger-toolbar">
          <div class="yyt-logger-filter-btns" data-yyt-log-filter-group>
            ${iA.map((e,r)=>`<button class="yyt-log-filter-btn ${r===0?"yyt-active":""}" data-level="${e.level??""}">
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
    `},bindEvents(t){let e=se();if(!e||!$e(t))return;let r=this,n=null,s=!1,o=[],a=t.find("[data-yyt-log-list]"),i=t.find("[data-yyt-log-search]"),l=t.find("[data-yyt-log-autoscroll]"),d=t.find("[data-yyt-log-pause]");function c(p){if(!p.length){a.html('<div class="yyt-logger-empty">\u6682\u65E0\u5339\u914D\u7684\u65E5\u5FD7\u8BB0\u5F55</div>');return}a.html(p.map(g=>`
        <div class="yyt-log-entry ${lA(g.level)}" data-log-id="${g.id}">
          <span class="yyt-log-time">${cA(g.timestamp)}</span>
          <span class="yyt-log-level">${I.levelLabel(g.level)}</span>
          <span class="yyt-log-scope">${pe(g.scope)}</span>
          <span class="yyt-log-msg">${pe(g.message)}</span>
          ${g.data!==void 0?`<span class="yyt-log-data">${pe(typeof g.data=="object"?JSON.stringify(g.data):String(g.data))}</span>`:""}
        </div>
      `).join(""))}function u(){let p=i.val()?.trim()||"",{entries:g}=I.getEntries({level:n,search:p||void 0,limit:500});c(g),l.is(":checked")&&requestAnimationFrame(()=>{a[0].scrollTop=a[0].scrollHeight})}function y(){if(s||!o.length)return;let p=o;o=[],u()}this._onLogEntry=p=>{if(s||n!==null&&p.level<n)return;let g=i.val()?.trim().toLowerCase()||"";if(g){let m=p.scope.toLowerCase().includes(g),h=p.message.toLowerCase().includes(g);if(!m&&!h)return}o.push(p),o.length>=50?y():this._flushTimer||(this._flushTimer=setTimeout(()=>{this._flushTimer=null,y(),r._updateStats(t)},250))},G.on("logger:entry",this._onLogEntry),t.on("click.yytLogger","[data-yyt-log-filter-group] .yyt-log-filter-btn",p=>{t.find("[data-yyt-log-filter-group] .yyt-log-filter-btn").removeClass("yyt-active"),e(p.currentTarget).addClass("yyt-active");let g=e(p.currentTarget).data("level");n=g===""?null:g,u(),r._updateStats(t)}),i.on("input.yytLogger",()=>{u()}),t.on("click.yytLogger","[data-yyt-log-pause]",()=>{s=!s,d.toggleClass("yyt-active",s),d.html(s?'<i class="fa-solid fa-play"></i> \u7EE7\u7EED':'<i class="fa-solid fa-pause"></i> \u6682\u505C'),s||(o=[],u(),r._updateStats(t))}),t.on("click.yytLogger","[data-yyt-log-clear]",()=>{I.clear(),a.html('<div class="yyt-logger-empty">\u65E5\u5FD7\u5DF2\u6E05\u9664</div>'),r._updateStats(t)}),t.on("click.yytLogger","[data-yyt-log-export]",()=>{let{entries:p}=I.getEntries({limit:1e4}),g=JSON.stringify(p.map(w=>({time:new Date(w.timestamp).toISOString(),level:I.levelLabel(w.level),scope:w.scope,message:w.message,data:w.data})),null,2),m=new Blob([g],{type:"application/json"}),h=URL.createObjectURL(m),b=document.createElement("a");b.href=h,b.download=`yyt-logs-${new Date().toISOString().replace(/[:.]/g,"-")}.json`,b.click(),URL.revokeObjectURL(h)}),u()},_updateStats(t){if(!se()||!$e(t))return;let r=I.getStats(),n=t.find(".yyt-logger-stats");n.length&&n.html(`
      <span class="yyt-logger-stat">\u5171 <strong>${r.total}</strong> \u6761</span>
      ${["ERROR","WARN","INFO","DEBUG"].map(s=>`<span class="yyt-logger-stat yyt-log-${s.toLowerCase()}">${s}: <strong>${r.byLevel[s]||0}</strong></span>`).join("")}
    `)},destroy(t){let e=se();this._onLogEntry&&(G.off("logger:entry",this._onLogEntry),this._onLogEntry=null),this._flushTimer&&(clearTimeout(this._flushTimer),this._flushTimer=null),!(!e||!$e(t))&&t.off(".yytLogger")},getStyles(){return`
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
    `}},dA=bb});var Ib={};ue(Ib,{MAIN_TAB_RENDERERS:()=>ju,PanelState:()=>Pl,SCRIPT_ID:()=>Mn,SUB_TAB_RENDERERS:()=>Uu,UIManager:()=>Io,bindDialogEvents:()=>wo,closeActiveCustomSelectDropdown:()=>dr,closeCustomSelectDropdown:()=>Ll,createDialogHtml:()=>xo,default:()=>pA,destroyEnhancedCustomSelects:()=>Lt,downloadJson:()=>vo,enhanceNativeSelects:()=>pr,escapeHtml:()=>pe,fillFormWithConfig:()=>Xx,getAllStyles:()=>kb,getFormApiConfig:()=>Jx,getJQuery:()=>se,getTargetDocument:()=>qt,initUI:()=>_b,isContainerValid:()=>$e,normalizeCustomSelectOptions:()=>wp,openCustomSelectDropdown:()=>bp,readFileContent:()=>So,registerComponents:()=>Cu,renderApiPanel:()=>ku,renderBypassPanel:()=>Du,renderCustomSelectControl:()=>vp,renderEscapeTransformToolPanel:()=>Ou,renderLoggerPanel:()=>Ku,renderMainTab:()=>Ab,renderPunctuationTransformToolPanel:()=>Lu,renderRegexPanel:()=>Ru,renderSettingsPanel:()=>Bu,renderStatusBlockPanel:()=>Nu,renderSubTabComponent:()=>Cb,renderSummaryToolPanel:()=>Pu,renderTableTemplatePanel:()=>Mu,renderTableWorkbenchPanel:()=>zu,renderToolPanel:()=>Eb,renderWorldbookPresetPanel:()=>Iu,renderYouyouReviewPanel:()=>$u,repositionActiveCustomSelectDropdown:()=>$l,resetJQueryCache:()=>Ux,showConfirm:()=>kr,showPrompt:()=>Qx,showToast:()=>Oa,showTopNotice:()=>Ol,toggleCustomSelectDropdown:()=>xp,uiManager:()=>tr,withButtonLoading:()=>Zx});async function Sb(t){if(!xl.has(t)){let e=vb[t];if(typeof e!="function")throw new Error(`unknown_panel:${t}`);xl.set(t,e().then(r=>{let n=r?.[t]||r?.default;if(!n?.id)throw new Error(`invalid_panel:${t}`);return n}).catch(r=>{throw xl.delete(t),r}))}return xl.get(t)}function Tb(t,e=null){let r=e?.message?`\uFF1A${pe(e.message)}`:"";return`<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>${pe(t)}${r}</span></div>`}async function Cu(){let t=await Promise.allSettled(Object.keys(vb).map(async r=>{let n=await Sb(r);return tr.register(n.id,n),n.id})),e=t.filter(r=>r.status==="rejected");e.length&&e.forEach(r=>ka.error("\u7EC4\u4EF6\u6CE8\u518C\u5931\u8D25",r.reason)),ka.log(`\u7EC4\u4EF6\u6CE8\u518C\u5B8C\u6210\uFF0C\u6210\u529F ${t.length-e.length} \u4E2A\uFF0C\u5931\u8D25 ${e.length} \u4E2A`)}async function _b(t={}){let{autoInjectStyles:e=!0,targetDocument:r,...n}=t;tr.init(n),await Cu(),e&&tr.injectStyles(r),ka.log("\u6A21\u5757\u521D\u59CB\u5316\u5B8C\u6210")}async function uA(t){let e=await Sb(t);return tr.getComponent(e.id)||tr.register(e.id,e),e}async function Ot(t,e,r={}){let n=await uA(t);tr.render(n.id,e,r)}function ku(t){return Ot("ApiPresetPanel",t)}function Iu(t){return Ot("WorldbookPresetPanel",t)}function Ru(t){return Ot("RegexExtractPanel",t)}function Mu(t){return Ot("TableTemplatePanel",t)}function Eb(t){return Ot("ToolManagePanel",t)}function Pu(t){return Ot("SummaryToolPanel",t)}function Nu(t){return Ot("StatusBlockPanel",t)}function $u(t){return Ot("YouyouReviewPanel",t)}function Ou(t){return Ot("EscapeTransformToolPanel",t)}function Lu(t){return Ot("PunctuationTransformToolPanel",t)}function Du(t){return Ot("BypassPanel",t)}function Bu(t){return Ot("SettingsPanel",t)}function zu(t){return Ot("TableWorkbenchPanel",t)}function Ku(t){return Ot("LoggerPanel",t)}async function Ab(t,e){let r=ju[t];if(!r)return!1;try{await r.render(e)}catch(n){ka.error(r.failMessage,n),e.html(Tb(r.failMessage,n))}return!0}async function Cb(t,e){let r=Uu[t];if(!r)return null;try{await r.render(e)}catch(n){ka.error(r.failMessage,n),e.html(Tb(r.failMessage,n))}return t}function kb(){return tr.getAllStyles()}var ka,vb,xl,ju,Uu,pA,Rb=O(()=>{Y();Yl();lt();lt();Yl();ka=I.createScope("UI"),vb=Object.freeze({ApiPresetPanel:()=>Promise.resolve().then(()=>(Jp(),Vp)),WorldbookPresetPanel:()=>Promise.resolve().then(()=>(yy(),py)),RegexExtractPanel:()=>Promise.resolve().then(()=>(wf(),xf)),TableTemplatePanel:()=>Promise.resolve().then(()=>($g(),Ng)),ToolManagePanel:()=>Promise.resolve().then(()=>(Dg(),Lg)),SummaryToolPanel:()=>Promise.resolve().then(()=>(am(),om)),StatusBlockPanel:()=>Promise.resolve().then(()=>(cm(),lm)),YouyouReviewPanel:()=>Promise.resolve().then(()=>(pm(),um)),EscapeTransformToolPanel:()=>Promise.resolve().then(()=>(mm(),gm)),PunctuationTransformToolPanel:()=>Promise.resolve().then(()=>(xm(),bm)),BypassPanel:()=>Promise.resolve().then(()=>(Sm(),vm)),SettingsPanel:()=>Promise.resolve().then(()=>(Od(),$d)),TableWorkbenchPanel:()=>Promise.resolve().then(()=>(hb(),mb)),LoggerPanel:()=>Promise.resolve().then(()=>(wb(),xb))}),xl=new Map;ju=Object.freeze({tableWorkbench:{render:t=>zu(t),failMessage:"\u586B\u8868\u5DE5\u4F5C\u53F0\u52A0\u8F7D\u5931\u8D25"},bypass:{render:t=>Du(t),failMessage:"Ai\u6307\u4EE4\u9884\u8BBE\u9762\u677F\u52A0\u8F7D\u5931\u8D25"},settings:{render:t=>Bu(t),failMessage:"\u8BBE\u7F6E\u9762\u677F\u52A0\u8F7D\u5931\u8D25"},logger:{render:t=>Ku(t),failMessage:"\u65E5\u5FD7\u9762\u677F\u52A0\u8F7D\u5931\u8D25"}}),Uu=Object.freeze({ApiPresetPanel:{render:t=>ku(t),failMessage:"API \u9884\u8BBE\u9762\u677F\u52A0\u8F7D\u5931\u8D25"},RegexExtractPanel:{render:t=>Ru(t),failMessage:"\u6B63\u5219\u63D0\u53D6\u9762\u677F\u52A0\u8F7D\u5931\u8D25"},WorldbookPresetPanel:{render:t=>Iu(t),failMessage:"\u4E16\u754C\u4E66\u9884\u8BBE\u9762\u677F\u52A0\u8F7D\u5931\u8D25"},TableTemplatePanel:{render:t=>Mu(t),failMessage:"\u8868\u683C\u6A21\u677F\u9762\u677F\u52A0\u8F7D\u5931\u8D25"},SummaryToolPanel:{render:t=>Pu(t),failMessage:"\u6458\u8981\u5DE5\u5177\u52A0\u8F7D\u5931\u8D25"},StatusBlockPanel:{render:t=>Nu(t),failMessage:"\u4E3B\u89D2\u72B6\u6001\u680F\u52A0\u8F7D\u5931\u8D25"},YouyouReviewPanel:{render:t=>$u(t),failMessage:"\u5C0F\u5E7D\u70B9\u8BC4\u52A0\u8F7D\u5931\u8D25"},EscapeTransformToolPanel:{render:t=>Ou(t),failMessage:"\u8F6C\u4E49\u5904\u7406\u5DE5\u5177\u52A0\u8F7D\u5931\u8D25"},PunctuationTransformToolPanel:{render:t=>Lu(t),failMessage:"\u4E2D\u6587\u6807\u70B9\u66FF\u6362\u5DE5\u5177\u52A0\u8F7D\u5931\u8D25"}});pA={uiManager:tr,registerComponents:Cu,initUI:_b,renderApiPanel:ku,renderWorldbookPresetPanel:Iu,renderRegexPanel:Ru,renderTableTemplatePanel:Mu,renderToolPanel:Eb,renderSummaryToolPanel:Pu,renderStatusBlockPanel:Nu,renderYouyouReviewPanel:$u,renderEscapeTransformToolPanel:Ou,renderPunctuationTransformToolPanel:Lu,renderBypassPanel:Du,renderSettingsPanel:Bu,renderTableWorkbenchPanel:zu,renderLoggerPanel:Ku,MAIN_TAB_RENDERERS:ju,SUB_TAB_RENDERERS:Uu,renderMainTab:Ab,renderSubTabComponent:Cb,getAllStyles:kb}});var Lb={};ue(Lb,{TX_PHASE:()=>Zt,ToolAutomationService:()=>vl,Transaction:()=>wl,default:()=>hA,toolAutomationService:()=>Ob});function xe(t){return t==null?"":String(t).trim()}function Mb(t){let e=Za(t);return xe(e?.chatId??e?.chat_id??t?.chatId??t?.chat_id??t?.chat_filename??t?.this_chid??"chat_default")||"chat_default"}function Fu(t){let e=Za(t);return Array.isArray(e?.chat)?e.chat:Array.isArray(t?.chat)?t.chat:[]}function $b(t){if(!t||t?.is_user===!0||t?.is_system===!0)return!1;let e=String(t?.role||"").trim().toLowerCase();return e==="user"||e==="system"?!1:e==="assistant"||e==="ai"||!e}function yA(t,e){let r=xe(e);if(!r)return null;let n=Fu(t);for(let s=n.length-1;s>=0;s-=1){let o=n[s];if([o?.messageId,o?.message_id,o?.id,o?.mid,o?.mesid,o?.chat_index,s].map(i=>xe(i)).includes(r))return o||null}return null}function Pb(t){let e=Fu(t);if(!Array.isArray(e)||e.length===0)return null;let r=e.length-1,n=e[r]||null;if(!$b(n))return null;let s=xe(n?.messageId??n?.message_id??n?.id??n?.mid??n?.mesid??n?.chat_index??r);return s?{messageId:s,swipeId:xe(n?.swipeId??n?.swipe_id??n?.swipe??n?.swipeIndex),message:n}:null}function mA(){let t=Date.now().toString(36),e=Math.random().toString(36).slice(2,8);return`tx_${t}_${e}`}var tt,Nb,fA,gA,Zt,wl,vl,Ob,hA,Db=O(()=>{Vs();Y();ei();xr();oa();vd();Kn();ul();Jt();tt=I.createScope("ToolAutomation");Nb=1e4,fA=15e3,gA=800;Zt=Object.freeze({RECEIVED:"received",CONFIRMED:"confirmed",CONTEXT_BUILT:"context_built",REQUEST_STARTED:"request_started",REQUEST_FINISHED:"request_finished",WRITEBACK_STARTED:"writeback_started",WRITEBACK_COMMITTED:"writeback_committed",REFRESH_CONFIRMED:"refresh_confirmed",SKIPPED:"skipped",FAILED:"failed"}),wl=class{constructor({chatId:e,messageId:r,swipeId:n,sourceEvent:s,generationKey:o}){this.traceId=mA(),this.chatId=e||"",this.messageId=r||"",this.swipeId=n||"",this.sourceEvent=s||"",this.generationKey=o||"",this.phase=Zt.RECEIVED,this.createdAt=Date.now(),this.updatedAt=Date.now(),this.verdict="",this.error=null,this.toolResults=[],this.writebackState=null,this.refreshState=null}transition(e,r={}){return this.phase=e,this.updatedAt=Date.now(),Object.assign(this,r),this}toSnapshot(){return{...this}}},vl=class{constructor(){this._stopCallbacks=[],this._pendingTimers=new Map,this._recentlyProcessedSlots=new Map,this._ownWriteMessageIds=new Map,this._slotQueues=new Map,this._activeTransactions=new Map,this._isProcessing=!1,this._currentChatId="",this.debugMode=!1,this._transactionHistory=[],this._maxHistorySize=30,this._hostBindingStatus={initialized:!1,initAttempts:0,lastInitAt:0,lastInitResult:"idle",source:"unavailable",hasEventSource:!1,hasEventTypes:!1,eventBindings:[],retryScheduled:!1,retryDelayMs:0,lastError:""},this._messageReceivedThrottleUntil=0}setDebugMode(e){this.debugMode=e===!0}init(e={}){this.stop(),this._hostBindingStatus.lastInitAt=Date.now(),this._hostBindingStatus.initAttempts=(this._hostBindingStatus.initAttempts||0)+1;let r=Qr();this._currentChatId=Mb(r);let n=(s,...o)=>{let a=Qr(),{messageId:i,swipeId:l}=this._extractIdentitiesFromArgs(o);if(tt.debug(`\u6536\u5230\u5BBF\u4E3B\u4E8B\u4EF6 "${s}"`,{messageId:i,swipeId:l,argCount:o.length}),s===Ve.MESSAGE_RECEIVED){let m=Date.now();if(m<this._messageReceivedThrottleUntil){tt.debug(`MESSAGE_RECEIVED \u5728\u8282\u6D41\u7A97\u53E3\u5185\uFF0C\u8DF3\u8FC7\uFF08\u5269\u4F59 ${this._messageReceivedThrottleUntil-m}ms\uFF09`);return}this._messageReceivedThrottleUntil=m+this._getSettleMs()+5e3}let d=null,c=i,u=l;if(c&&(d=yA(a,c)),!d){let m=Pb(a);m?.messageId&&(d=m.message,c=m.messageId,u=m.swipeId||u)}if(!c||!d){tt.debug(`\u4E8B\u4EF6 "${s}" \u65E0 assistant \u76EE\u6807\uFF0C\u8DF3\u8FC7`);return}if(!$b(d)){tt.debug(`\u4E8B\u4EF6 "${s}" \u547D\u4E2D\u975E assistant \u6D88\u606F\uFF0C\u8DF3\u8FC7`,{messageId:c});return}let y=String(d.content||d.mes||"").trim();if(!y||y.length<5){tt.debug(`\u4E8B\u4EF6 "${s}" \u6D88\u606F\u8FC7\u77ED\uFF08${y.length} \u5B57\u7B26\uFF09\uFF0C\u8DF3\u8FC7`);return}if(this._isProcessing){tt.debug(`\u4E8B\u4EF6 "${s}" \u6B63\u5728\u5904\u7406\u4E2D\uFF0C\u8DF3\u8FC7`);return}if(this._isOwnWrite(c)){tt.debug(`\u4E8B\u4EF6 "${s}" \u547D\u4E2D own-write \u9ED1\u540D\u5355\uFF0C\u8DF3\u8FC7`,{messageId:c});return}let p=xe(d?.swipeId??d?.swipe_id??d?.swipe??d?.swipeIndex);p&&(u=p);let g=`${c}::${u}`;if(this._isRecentlyProcessed(g)){tt.debug(`\u4E8B\u4EF6 "${s}" slot \u5DF2\u8FD1\u671F\u5904\u7406\u8FC7\uFF0C\u8DF3\u8FC7`,{slotKey:g});return}this._scheduleMessageProcessing(c,u,{settleMs:this._getSettleMs(),sourceEvent:s}),tt.info(`\u4E8B\u4EF6 "${s}" \u901A\u8FC7\u6240\u6709\u5B88\u536B\uFF0C\u5DF2\u8C03\u5EA6\u5904\u7406`,{targetMessageId:c,targetSwipeId:u,throttleUntil:this._messageReceivedThrottleUntil,isProcessing:this._isProcessing})};return this._stopCallbacks.push(Ct.subscribe(Ve.MESSAGE_SENT,()=>{tt.debug("MESSAGE_SENT \u2192 \u6E05\u7406\u8C03\u5EA6\u961F\u5217"),this._pendingTimers.forEach(s=>clearTimeout(s)),this._pendingTimers.clear()})),this._stopCallbacks.push(Ct.subscribe(Ve.MESSAGE_RECEIVED,(...s)=>{n(Ve.MESSAGE_RECEIVED,...s)})),this._stopCallbacks.push(Ct.subscribe(Ve.GENERATION_STOPPED,()=>{tt.info("GENERATION_STOPPED \u2192 \u53D6\u6D88\u6240\u6709\u6D3B\u8DC3\u4E8B\u52A1"),this._cancelActiveTransactions("generation_stopped"),this._pendingTimers.forEach(s=>clearTimeout(s)),this._pendingTimers.clear(),this._isProcessing=!1})),this._stopCallbacks.push(Ct.subscribe(Ve.CHAT_CHANGED,()=>{this._resetForChatChange()})),this._stopCallbacks.push(Ct.subscribe(Ve.MESSAGE_DELETED,s=>{this._clearMessageState(xe(s))})),this._refreshHostBindingStatus(),this._seedKnownSlots(),tt.info("\u81EA\u52A8\u5316\u670D\u52A1\u5DF2\u521D\u59CB\u5316",{chatId:this._currentChatId,source:this._hostBindingStatus.source}),!0}_seedKnownSlots(){try{let e=Qr(),r=Pb(e);if(!r?.messageId)return;let n=`${xe(r.messageId)}::${xe(r.swipeId)}`;this._recentlyProcessedSlots.set(n,Number.MAX_SAFE_INTEGER),tt.debug(`\u5DF2\u5C06\u5F53\u524D\u6700\u65B0 slot "${n}" \u9884\u6807\u8BB0\u4E3A\u5DF2\u77E5\uFF0C\u8DF3\u8FC7 MESSAGE_RECEIVED \u91CD\u653E`)}catch(e){tt.warn("_seedKnownSlots \u5931\u8D25",{error:e})}}_refreshHostBindingStatus(){let e=Ct.describe(),r=[Ve.MESSAGE_SENT,Ve.MESSAGE_RECEIVED,Ve.GENERATION_STOPPED,Ve.CHAT_CHANGED,Ve.MESSAGE_DELETED];this._hostBindingStatus={...this._hostBindingStatus,initialized:!!e.hasBridge,lastInitResult:e.hasBridge?"ready":e.retryScheduled?"pending_retry":"pending",source:e.source,hasEventSource:!!e.hasBridge,hasEventTypes:Array.isArray(e.availableEvents)&&e.availableEvents.length>0,eventBindings:r.map(n=>`subscribed: ${n}`),retryScheduled:!!e.retryScheduled,retryDelayMs:0,lastError:""}}stop(){this._stopCallbacks.forEach(e=>{try{e()}catch(r){tt.warn("\u505C\u6B62\u56DE\u8C03\u5931\u8D25",{error:r})}}),this._stopCallbacks=[],this._pendingTimers.forEach(e=>clearTimeout(e)),this._pendingTimers.clear(),this._slotQueues.clear(),this._recentlyProcessedSlots.clear(),this._ownWriteMessageIds.clear(),this._cancelActiveTransactions("service_stopped"),this._activeTransactions.clear(),this._isProcessing=!1,this._hostBindingStatus={initialized:!1,initAttempts:0,lastInitAt:0,lastInitResult:"idle",source:"unavailable",hasEventSource:!1,hasEventTypes:!1,eventBindings:[],retryScheduled:!1,retryDelayMs:0,lastError:""}}isEnabled(){return!0}getRuntimeSnapshot(){return this._pruneRecentSlots(),this._pruneOwnWrites(),this._refreshHostBindingStatus(),{currentChatId:this._currentChatId,enabled:!0,isProcessing:this._isProcessing,pendingTimerCount:this._pendingTimers.size,queuedSlotCount:this._slotQueues.size,recentlyProcessedSlotCount:this._recentlyProcessedSlots.size,ownWriteMessageIdCount:this._ownWriteMessageIds.size,activeTransactionCount:this._activeTransactions.size,recentTransactions:this._transactionHistory.slice(-10).map(e=>e.toSnapshot()),hostBinding:{...this._hostBindingStatus,eventBindings:Array.isArray(this._hostBindingStatus?.eventBindings)?[...this._hostBindingStatus.eventBindings]:[]},settings:this._getAutomationSettings()}}async processCurrentAssistantMessage(e={}){let r=await zn({messageId:"",swipeId:"",runSource:"AUTO"}),n=xe(r?.sourceMessageId||r?.messageId);return n?this.processAssistantMessage(n,{force:e.force===!0,swipeId:xe(r?.sourceSwipeId),sourceEvent:e.sourceEvent||"MANUAL_CURRENT_ASSISTANT"}):{success:!1,error:"\u672A\u627E\u5230\u5F53\u524D assistant \u697C\u5C42"}}async processAssistantMessage(e,{force:r=!1,swipeId:n="",sourceEvent:s="AUTO"}={}){let o=new wl({chatId:this._currentChatId,messageId:e,swipeId:n,sourceEvent:s});try{if(!e)return this._skipTransaction(o,"missing_message_id");o.transition(Zt.CONFIRMED);let a=await zn({messageId:e,swipeId:n,runSource:"AUTO"}),i=a?.targetAssistantMessage||null;if(!i||!a?.sourceMessageId)return this._skipTransaction(o,"assistant_message_not_found");let l=String(i.content||i.mes||"").trim();if(!l||l.length<5)return this._skipTransaction(o,"assistant_message_too_short");o.transition(Zt.CONTEXT_BUILT);let d=`${xe(a.sourceMessageId)}::${xe(a.sourceSwipeId||n)}`;if(o.generationKey=d,!r&&this._isRecentlyProcessed(d))return this._skipTransaction(o,"duplicate_slot",{slotKey:d});let c=Fo(),u=Ht.filterAutoPostResponseTools(c),p=[...c.filter(h=>Ht.shouldRunLocalTransform(h)&&h.output?.autoTrigger!==!1),...u],g=be(),m=g?.autoUpdateEnabled===!0&&xe(g?.autoUpdateTrigger||"assistantMessage")==="assistantMessage";return!p.length&&!m?this._skipTransaction(o,"no_auto_tools",{tools:p}):(o.slotKey=d,o.slotRevisionKey=a.slotRevisionKey||"",o.sourceMessageId=a.sourceMessageId||e,o.sourceSwipeId=a.sourceSwipeId||n||"",this._enqueueSlot(d,async()=>{if(!r&&this._isRecentlyProcessed(d))return this._skipTransaction(o,"duplicate_slot_after_queue",{slotKey:d});this._isProcessing=!0,this._markSlotProcessed(d),o.transition(Zt.REQUEST_STARTED);let h=new AbortController;this._registerActiveTransaction(o,{controller:h,slotKey:d,sourceMessageId:a.sourceMessageId||e,sourceSwipeId:a.sourceSwipeId||n||""});try{let{results:b,hasWriteback:w}=await this._executeAutoTools(p,a,h,o,{slotKey:d,messageId:e,swipeId:n}),{tableResult:S,hasWriteback:_}=await this._executeAutoTableUpdate(a,h,o,{shouldRunTableAuto:m,tableWorkbenchConfig:g,messageId:e,swipeId:n,sourceEvent:s}),k=w||_;o.transition(Zt.REQUEST_FINISHED,{toolResults:b,tableResult:S}),k&&(o.transition(Zt.WRITEBACK_STARTED),o.writebackState={messageId:a.sourceMessageId,swipeId:a.sourceSwipeId,hasOutput:!0},this._messageReceivedThrottleUntil=Date.now()+fA),this._markSlotProcessed(d);let v=b.every(E=>E?.success!==!1),C=!m||!!S?.success||S?.skipped===!0||S?.meta?.aborted===!0||S?.meta?.stale===!0,R=v&&C,L=b.some(E=>E?.meta?.aborted===!0||E?.meta?.stale===!0||E?.error==="\u8BF7\u6C42\u5DF2\u53D6\u6D88")||S?.meta?.aborted===!0||S?.meta?.stale===!0;R&&o.transition(Zt.WRITEBACK_COMMITTED);let N=R?Zt.REFRESH_CONFIRMED:Zt.FAILED;return o.transition(N,{verdict:L?"aborted":R?"success":"partial_failure"}),this._recordTransaction(o),this._updateAutoRuntimeForResults(p,a,o,b),{success:R,traceId:o.traceId,slotKey:d,sourceEvent:s,messageId:a.sourceMessageId||e,phase:o.phase,results:b,tableResult:S}}finally{this._unregisterActiveTransaction(o.traceId),this._isProcessing=!1}}))}catch(a){return o.transition(Zt.FAILED,{error:a?.message||String(a)}),this._recordTransaction(o),this._unregisterActiveTransaction(o.traceId),this._isProcessing=!1,tt.error("processAssistantMessage \u5F02\u5E38",{error:a}),{success:!1,traceId:o.traceId,error:o.error,phase:o.phase}}}_extractIdentitiesFromArgs(e){let r="",n="";for(let s of e)if(s!=null){if(typeof s=="number"&&Number.isFinite(s)&&!r){r=xe(s);continue}if(typeof s=="string"){let o=xe(s);!r&&/^\d+$/.test(o)&&(r=o);continue}typeof s=="object"&&(r||(r=xe(s.messageId??s.message_id??s.id??s.mid??s.mesid??s.chat_index??s.message?.messageId??s.message?.message_id??s.message?.id??s.message?.mid??s.message?.mesid??s.message?.chat_index??s.data?.messageId??s.data?.message_id??s.data?.id??s.data?.mid??s.data?.mesid??s.data?.chat_index??s.target?.messageId??s.target?.message_id??s.target?.id??s.target?.mid??s.target?.mesid??s.target?.chat_index)),n||(n=xe(s.swipeId??s.swipe_id??s.swipe??s.swipeIndex??s.currentSwipe??s.message?.swipeId??s.message?.swipe_id??s.message?.swipe??s.data?.swipeId??s.data?.swipe_id??s.data?.swipe??s.target?.swipeId??s.target?.swipe_id??s.target?.swipe)))}return{messageId:r,swipeId:n}}_scheduleMessageProcessing(e,r="",n={}){let s=n.settleMs??this._getSettleMs(),o=`msg::${xe(e)}::${xe(r)}`,a=this._pendingTimers.get(o);a&&clearTimeout(a);let i=setTimeout(()=>{this._pendingTimers.delete(o),this.processAssistantMessage(e,{swipeId:r,sourceEvent:n.sourceEvent||"AUTO"}).catch(l=>{tt.error("\u8C03\u5EA6\u6267\u884C\u5931\u8D25",{messageId:e,error:l})})},Math.max(0,s));this._pendingTimers.set(o,i),tt.info("\u5DF2\u8C03\u5EA6\u6D88\u606F\u5904\u7406",{timerKey:o,settleMs:s,sourceEvent:n.sourceEvent})}cancelAutomation(e={}){let r=e.reason||"manual_cancel",n=xe(e.messageId),s=xe(e.slotKey),o=xe(e.traceId),a=0;for(let[i,l]of this._pendingTimers){let d=n&&i.includes(`::${n}::`),c=s&&i.includes(s);(d||c||!n&&!s&&!o)&&(clearTimeout(l),this._pendingTimers.delete(i),a+=1)}return a+=this._cancelActiveTransactions(r,{messageId:n,slotKey:s,traceId:o}),{success:a>0,cancelledCount:a,reason:r}}_isRecentlyProcessed(e){if(!e)return!1;this._pruneRecentSlots();let r=this._recentlyProcessedSlots.get(e);return r?Date.now()-r<this._getDedupeWindowMs():!1}_markSlotProcessed(e){e&&(this._recentlyProcessedSlots.set(e,Date.now()),this._pruneRecentSlots())}_pruneRecentSlots(){let e=Date.now()-this._getDedupeWindowMs();for(let[r,n]of this._recentlyProcessedSlots)(!Number.isFinite(n)||n<e)&&this._recentlyProcessedSlots.delete(r)}async _executeAutoTools(e,r,n,s,{slotKey:o,messageId:a,swipeId:i}){let l=[],d=!1,c=r.lastAiMessage,u=r.assistantBaseText;for(let y of e){let p={...r,signal:n.signal,isAutoRun:!0,abortMeta:{traceId:s.traceId,slotKey:o,sourceMessageId:r.sourceMessageId||a,sourceSwipeId:r.sourceSwipeId||i||""},shouldAbortWriteback:()=>this._shouldAbortAutoWriteback({traceId:s.traceId}),skipNotify:!0,lastAiMessage:c,assistantBaseText:u,input:{...r.input||{},lastAiMessage:c,assistantBaseText:u}},m=Ht.shouldRunLocalTransform(y)?await ji(y,p):await Ht.runToolPostResponse(y,p);if(l.push(m),m?.writebackState||m?.output){d=!0,this._markOwnWrite(r.sourceMessageId||a);let h=this._readCurrentMessageText(r.sourceMessageId||a);if(h){c=h,u=h;let b=Number(r.sourceMessageId||a);Array.isArray(r.chatMessages)&&r.chatMessages[b]&&(r.chatMessages[b].content=h,r.chatMessages[b].mes=h)}}}return{results:l,hasWriteback:d}}async _executeAutoTableUpdate(e,r,n,{shouldRunTableAuto:s,tableWorkbenchConfig:o,messageId:a,swipeId:i,sourceEvent:l}){if(!s)return{tableResult:null,hasWriteback:!1};let d=await $h({messageId:e.sourceMessageId||a,swipeId:e.sourceSwipeId||i||"",sourceEvent:l,configInput:o,signal:r.signal,shouldAbortWriteback:()=>this._shouldAbortAutoWriteback({traceId:n.traceId})}),c=!!(d?.state||d?.mirrorResult?.success===!0);return c&&this._markOwnWrite(e.sourceMessageId||a),{tableResult:d,hasWriteback:c}}_readCurrentMessageText(e){let r=Qr(),n=Fu(r),s=Number(e);if(!Number.isFinite(s)||s<0||s>=n.length)return"";let o=n[s];return String(o?.mes||o?.content||"").trim()}_markOwnWrite(e){let r=xe(e);r&&(this._ownWriteMessageIds.set(r,Date.now()),this._pruneOwnWrites())}_isOwnWrite(e){let r=xe(e);if(!r)return!1;this._pruneOwnWrites();let n=this._ownWriteMessageIds.get(r);return n?Date.now()-n<Nb:!1}_pruneOwnWrites(){let e=Date.now()-Nb;for(let[r,n]of this._ownWriteMessageIds)(!Number.isFinite(n)||n<e)&&this._ownWriteMessageIds.delete(r)}_recordTransaction(e){this._transactionHistory.push(e),this._transactionHistory.length>this._maxHistorySize&&(this._transactionHistory=this._transactionHistory.slice(-this._maxHistorySize)),tt.debug(`\u4E8B\u52A1 [${e.traceId}] \u2192 ${e.phase}`,{messageId:e.messageId,generationKey:e.generationKey,verdict:e.verdict,sourceEvent:e.sourceEvent,error:e.error})}_skipTransaction(e,r,n={}){return e.transition(Zt.SKIPPED,{verdict:r,...n}),this._recordTransaction(e),Array.isArray(n?.tools)&&n.tools.length>0&&this._updateAutoRuntimeForSkip(n.tools,e,r,n),{success:!1,skipped:!0,reason:r,traceId:e.traceId,...n}}_enqueueSlot(e,r){let s=(this._slotQueues.get(e)||Promise.resolve()).catch(()=>{}).then(r).finally(()=>{this._slotQueues.get(e)===s&&this._slotQueues.delete(e)});return this._slotQueues.set(e,s),s}_registerActiveTransaction(e,r={}){e?.traceId&&this._activeTransactions.set(e.traceId,{traceId:e.traceId,generationKey:r.generationKey||e.generationKey||"",slotKey:r.slotKey||e.slotKey||"",sourceMessageId:r.sourceMessageId||e.sourceMessageId||"",sourceSwipeId:r.sourceSwipeId||e.sourceSwipeId||"",slotRevisionKey:r.slotRevisionKey||e.slotRevisionKey||"",assistantBaseFingerprint:r.assistantBaseFingerprint||"",assistantBaseText:r.assistantBaseText||"",controller:r.controller||null,cancelled:!1,cancelReason:""})}_unregisterActiveTransaction(e){e&&this._activeTransactions.delete(e)}_cancelActiveTransactions(e="manual_cancel",r={}){let n=xe(r.messageId),s=xe(r.slotKey),o=xe(r.traceId),a=0;for(let[i,l]of this._activeTransactions){let d=o&&i===o,c=n&&xe(l?.sourceMessageId)===n,u=s&&xe(l?.slotKey)===s;if(!(!d&&!c&&!u&&!(!o&&!n&&!s))){l.cancelled=!0,l.cancelReason=e;try{l?.controller?.abort?.()}catch{}a+=1}}return a}_shouldAbortAutoWriteback(e={}){let r=xe(e.traceId);if(r){let n=this._activeTransactions.get(r);if(!n||n.cancelled)return{aborted:!0,reason:"cancelled_before_host_commit"}}return!1}_updateAutoRuntimeForSkip(e,r,n,s={}){e.forEach(o=>{o?.id&&en(o.id,{lastAutoRunAt:Date.now(),lastAutoStatus:"skipped",lastAutoMessageId:r?.sourceMessageId||r?.messageId||"",lastAutoSwipeId:r?.sourceSwipeId||r?.swipeId||"",lastAutoRevisionKey:r?.slotRevisionKey||s?.slotRevisionKey||"",lastAutoWritebackStatus:"",lastAutoRefreshConfirmed:!1,lastAutoSkipReason:n||""},{touchLastRunAt:!1,emitEvent:!1,emitRuntimeEvent:!0})})}_updateAutoRuntimeForResults(e,r,n,s=[]){e.forEach((o,a)=>{if(!o?.id)return;let i=s[a]||{},l=i?.meta?.writebackDetails||{},d=i?.meta?.aborted===!0||i?.meta?.stale===!0?"aborted":i?.success===!1?"failed":"success",c=i?.meta?.aborted===!0?i?.meta?.abortReason||(i?.meta?.stale===!0?"stale_base_changed":"cancelled_before_host_commit"):"";en(o.id,{lastAutoRunAt:Date.now(),lastAutoStatus:d,lastAutoMessageId:r?.sourceMessageId||n?.sourceMessageId||n?.messageId||"",lastAutoSwipeId:r?.sourceSwipeId||n?.sourceSwipeId||n?.swipeId||"",lastAutoRevisionKey:r?.slotRevisionKey||n?.slotRevisionKey||"",lastAutoWritebackStatus:i?.meta?.writebackStatus||"",lastAutoRefreshConfirmed:!!l.refreshConfirmed,lastAutoSkipReason:c},{touchLastRunAt:!1,emitEvent:!1,emitRuntimeEvent:!0})})}_resetForChatChange(){let e=Qr(),r=Mb(e);tt.info("\u804A\u5929\u5207\u6362",{from:this._currentChatId,to:r}),this._currentChatId=r,this._pendingTimers.forEach(n=>clearTimeout(n)),this._pendingTimers.clear(),this._slotQueues.clear(),this._recentlyProcessedSlots.clear(),this._ownWriteMessageIds.clear(),this._cancelActiveTransactions("chat_changed"),this._activeTransactions.clear(),this._isProcessing=!1,this._messageReceivedThrottleUntil=0,this._seedKnownSlots()}_clearMessageState(e){if(e){for(let[r,n]of this._pendingTimers)(r.includes(`::${e}::`)||r.startsWith(`msg::${e}::`))&&(clearTimeout(n),this._pendingTimers.delete(r));for(let r of this._recentlyProcessedSlots.keys())r.startsWith(`${e}::`)&&this._recentlyProcessedSlots.delete(r);this._ownWriteMessageIds.delete(xe(e)),this._seedKnownSlots()}}_getAutomationSettings(){let e=xt.getSettings()?.automation||{},r=Number.isFinite(e.settleMs)?e.settleMs:gA;return{settleMs:r,dedupeWindowMs:Number.isFinite(e.dedupeWindowMs)?e.dedupeWindowMs:Math.max(5e3,r+600)}}_getSettleMs(){return this._getAutomationSettings().settleMs}_getDedupeWindowMs(){return this._getAutomationSettings().dedupeWindowMs}},Ob=new vl,hA=Ob});var jb={};ue(jb,{BUILTIN_REGEX_PRESETS:()=>Tl,BUILTIN_WORLDBOOK_PRESETS:()=>Wu,MIGRATION_BACKUP_KEY:()=>zb,MIGRATION_DONE_KEY:()=>Sl,default:()=>vA,ensurePresetSystem:()=>Kb,registerBuiltinPresets:()=>Hu,runMigrationOnce:()=>Gu});function bA(t){if(!Array.isArray(t)||t.length===0)return null;let e=t.map(r=>String(r||"").trim()).filter(Boolean).sort().join("|");if(!e)return null;for(let r of Tl)if(r.rules.filter(s=>s.type==="include"&&s.enabled!==!1).map(s=>s.value).sort().join("|")===e)return r.id;return null}function Hu(){try{typeof Pc=="function"&&Pc(Tl),typeof oc=="function"&&oc(Wu),Tn.info("\u5185\u7F6E\u9884\u8BBE\u5DF2\u6CE8\u518C",{regex:Tl.length,worldbook:Wu.length})}catch(t){Tn.error("\u6CE8\u518C\u5185\u7F6E\u9884\u8BBE\u5931\u8D25",{error:t})}}function xA(t){let e=new Set,r=[];for(let n of Array.isArray(t)?t:[]){let s=String(n||"").trim();if(!(!s||e.has(s)))if(e.add(s),s.startsWith("regex:")){let o=s.slice(6).trim();o&&r.push({type:"regex_include",value:o,enabled:!0,name:"",description:""})}else r.push({type:"include",value:s,enabled:!0,name:"",description:""})}return r}function wA(t,e,r){let n=JSON.parse(JSON.stringify(r||{})),s=!1,o=n.extraction||{};if(!o.regexPresetId){let i=Array.isArray(o.selectors)?o.selectors:[];if(i.length>0){let l=bA(i);if(l)o.regexPresetId=l,s=!0,Tn.info(`\u5DE5\u5177 ${t} \u7ED1\u5B9A\u5185\u7F6E\u6B63\u5219\u9884\u8BBE: ${l}`);else{let d=di({name:`${e||t}_\u8FC1\u79FB_\u6B63\u5219`,description:`\u81EA\u8001\u7248\u672C selectors \u81EA\u52A8\u8FC1\u79FB\uFF08${i.length} \u9879\uFF09`,rules:xA(i),blacklist:[]});d?.id&&(o.regexPresetId=d.id,s=!0,Tn.info(`\u5DE5\u5177 ${t} \u521B\u5EFA\u8FC1\u79FB\u6B63\u5219\u9884\u8BBE: ${d.id}`))}n.extraction=o}}let a=n.worldbooks||{};if(!a.presetId&&a.enabled===!0&&Array.isArray(a.selected)&&a.selected.length>0){let i=qa({name:`${e||t}_\u8FC1\u79FB_\u4E16\u754C\u4E66`,description:`\u81EA\u8001\u7248\u672C worldbooks.selected \u81EA\u52A8\u8FC1\u79FB\uFF08${a.selected.length} \u672C\uFF09`,bindingMode:"custom",includeDisabled:!1,bookList:a.selected.map(l=>({bookName:String(l||""),enabled:!0,entryOverrides:{}})).filter(l=>l.bookName)});i?.id&&(a.presetId=i.id,s=!0,Tn.info(`\u5DE5\u5177 ${t} \u521B\u5EFA\u8FC1\u79FB\u4E16\u754C\u4E66\u9884\u8BBE: ${i.id}`)),n.worldbooks=a}return s?n:null}function Gu(){try{if(Oe.get(Sl)===!0)return{skipped:!0,reason:"already_done"};let t=j.get(Bb)||{};if(!t||typeof t!="object")return Tn.info("\u65E0\u5DE5\u5177\u914D\u7F6E\u9700\u8981\u8FC1\u79FB"),Oe.set(Sl,!0),{skipped:!0,reason:"no_configs"};Oe.set(zb,{ts:Date.now(),version:"v45",snapshot:t});let e=0,r={...t};for(let[n,s]of Object.entries(t)){if(!s||typeof s!="object")continue;let o=wA(n,s.name,s);o&&(r[n]=o,e+=1)}return e>0&&j.set(Bb,r),Oe.set(Sl,!0),Tn.info("\u8FC1\u79FB\u5B8C\u6210",{migratedCount:e,total:Object.keys(t).length}),{skipped:!1,migratedCount:e,total:Object.keys(t).length}}catch(t){return Tn.error("\u8FC1\u79FB\u5931\u8D25\uFF0C\u5DF2 abort\uFF0C\u8001\u5B57\u6BB5\u4FDD\u7559",{error:t}),{skipped:!1,error:t?.message||String(t),aborted:!0}}}function Kb(){return Hu(),Gu()}var Tn,Sl,zb,Bb,Tl,Wu,vA,Ub=O(()=>{We();Y();rn();xs();Tn=I.createScope("PresetBootstrap"),Sl="migration_v45_done",zb="migration_v45_backup",Bb="tool_configs",Tl=[{id:"builtin_regex_summary",name:"\u5185\u7F6E \xB7 \u603B\u7ED3\u63D0\u53D6",description:"\u63D0\u53D6 <boo_FM> \u6807\u7B7E\u5185\u5BB9\uFF08\u5BF9\u5E94\u5185\u7F6E\u300C\u8BB0\u5FC6\u538B\u7F29\u300D\u5DE5\u5177\uFF09",rules:[{id:"r_builtin_summary_1",type:"include",value:"boo_FM",enabled:!0,name:"\u603B\u7ED3\u6807\u7B7E",description:""}],blacklist:[]},{id:"builtin_regex_status_block",name:"\u5185\u7F6E \xB7 \u72B6\u6001\u680F\u63D0\u53D6",description:"\u63D0\u53D6 <status_block> \u6807\u7B7E\u5185\u5BB9\uFF08\u5BF9\u5E94\u5185\u7F6E\u300C\u72B6\u6001\u680F\u300D\u5DE5\u5177\uFF09",rules:[{id:"r_builtin_status_1",type:"include",value:"status_block",enabled:!0,name:"\u72B6\u6001\u6807\u7B7E",description:""}],blacklist:[]},{id:"builtin_regex_youyou",name:"\u5185\u7F6E \xB7 \u4F18\u4F18\u9510\u8BC4\u63D0\u53D6",description:"\u63D0\u53D6 <youyou> \u6807\u7B7E\u5185\u5BB9\uFF08\u5BF9\u5E94\u5185\u7F6E\u300C\u4F18\u4F18\u9510\u8BC4\u300D\u5DE5\u5177\uFF09",rules:[{id:"r_builtin_youyou_1",type:"include",value:"youyou",enabled:!0,name:"\u4F18\u4F18\u6807\u7B7E",description:""}],blacklist:[]}],Wu=[];vA={registerBuiltinPresets:Hu,runMigrationOnce:Gu,ensurePresetSystem:Kb}});var B,yo,Fb,qu,fo=O(()=>{B="yyt-fab-v1",yo="__yytFloatingBallCleanup_v1",Fb="floatingBall",qu="position"});function Wb(){return`
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
    }
    #${B} .phone-home-indicator::before {
      content: ''; display: block;
      width: 100px; height: 4px; border-radius: 2px;
      background: rgba(255,255,255,0.32);
    }
  `}var Hb=O(()=>{fo()});function Gb(t){let r=(t||document).createElement("div");return r.id=B,r.innerHTML=`
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
  `,{root:r,orb:r.querySelector(`#${B}-orb`),menu:r.querySelector(`#${B}-menu`),phoneScreen:r.querySelector(".phone-screen"),phoneContent:r.querySelector(`#${B}-content`),phoneDock:r.querySelector(`#${B}-dock`),phoneTime:r.querySelector(`#${B}-time`),dragHandle:r.querySelector(`#${B}-drag-handle`),menuClose:r.querySelector(`#${B}-close`),badge:r.querySelector(`#${B}-orb-badge`)}}function qb(t,e,r){let n=t||document;if(n.getElementById(e))return null;let s=n.createElement("style");return s.id=e,s.textContent=r,(n.head||n.documentElement).appendChild(s),s}function Yb(t){let e=t||document;[B,`${B}-style`].forEach(r=>{let n=e.getElementById(r);n&&typeof n.remove=="function"&&n.remove()})}function Vb(){let t=[];function e(n,s,o,a){if(!(!n||typeof n.addEventListener!="function"))try{n.addEventListener(s,o,a),t.push({target:n,event:s,handler:o,options:a})}catch{}}function r(){for(;t.length;){let{target:n,event:s,handler:o,options:a}=t.pop();try{n.removeEventListener(s,o,a)}catch{}}}return{on:e,removeAll:r}}function Jb(t){let e=t||window;return e.innerWidth<=768?{x:e.innerWidth-52-12,y:e.innerHeight-52-80}:{x:40,y:160}}function Yu(t,e){let r=e||window;return{x:Math.max(4,Math.min(Number.isFinite(t?.x)?t.x:0,r.innerWidth-52-2)),y:Math.max(4,Math.min(Number.isFinite(t?.y)?t.y:0,r.innerHeight-52-2))}}function Xb(t){let e=t instanceof Date?t:new Date,r=e.getHours(),n=String(e.getMinutes()).padStart(2,"0");return`${r}:${n}`}var Qb=O(()=>{fo()});function ex({root:t,orb:e,menuHead:r,targetDocument:n,targetWindow:s,on:o,savePosition:a,onTapWhenNotDragged:i,onDragMove:l}){let d=n||document,c=s||window,u=!1,y=!1,p=!1,g=0,m=0,h=0,b=0;function w(v,C,R){u=!0,y=!1,p=!!R,h=v,b=C;let L=t.getBoundingClientRect();g=v-L.left,m=C-L.top,t.style.transition="none"}function S(v,C){if(!u)return!1;if(!y){if(Math.hypot(v-h,C-b)<=5)return!1;y=!0}let R=Math.max(4,Math.min(v-g,c.innerWidth-52-2)),L=Math.max(4,Math.min(C-m,c.innerHeight-52-2));if(t.style.left=`${R}px`,t.style.top=`${L}px`,typeof l=="function")try{l({x:R,y:L})}catch{}return!0}function _(){if(u&&(u=!1,t.style.transition="",y&&typeof a=="function"))try{a({x:parseInt(t.style.left,10)||0,y:parseInt(t.style.top,10)||0})}catch{}}[{target:e,tapToggles:!0},{target:r,tapToggles:!1}].forEach(({target:v,tapToggles:C})=>{o(v,"mousedown",R=>{R.target?.closest?.(".menu-close")||(w(R.clientX,R.clientY,C),R.preventDefault())}),o(v,"touchstart",R=>{if(R.target?.closest?.(".menu-close"))return;let L=R.touches?.[0];L&&w(L.clientX,L.clientY,C)},{passive:!1})}),o(d,"mousemove",v=>S(v.clientX,v.clientY)),o(d,"mouseup",()=>_()),o(d,"touchmove",v=>{if(!u)return;let C=v.touches?.[0];C&&S(C.clientX,C.clientY)&&v.preventDefault()},{passive:!1}),o(d,"touchend",v=>{if(!u)return;let C=y,R=p;if(_(),!C&&R&&typeof i=="function"&&i(),p=!1,v.cancelable)try{v.preventDefault()}catch{}},{passive:!1});try{let v=c.parent?.document;v&&v!==d&&(o(v,"mousemove",C=>S(C.clientX,C.clientY)),o(v,"mouseup",()=>_()))}catch{}return o(e,"click",()=>{if(y){y=!1;return}typeof i=="function"&&i()}),{isDragging:()=>u,consumeDragMoved:()=>{let v=y;return y=!1,v}}}var tx=O(()=>{fo()});function nx({root:t,menu:e,targetWindow:r,onOpen:n,onClose:s}){let o=r||window,a=!1;function i(){let u=parseInt(t.style.left,10)||0,y=parseInt(t.style.top,10)||0;u<o.innerWidth/2?(e.style.left="0",e.style.right="auto"):(e.style.left="auto",e.style.right="0"),o.innerHeight-y-64<480&&y>480/2?(e.style.top="auto",e.style.bottom=`${56}px`,t.classList.add("is-open-up"),e.style.transformOrigin=u<o.innerWidth/2?"bottom left":"bottom right"):(e.style.top=`${56}px`,e.style.bottom="auto",t.classList.remove("is-open-up"),e.style.transformOrigin=u<o.innerWidth/2?"top left":"top right")}function l(){if(!a&&(a=!0,i(),t.classList.add("is-open"),typeof n=="function"))try{n()}catch{}}function d(){if(a&&(a=!1,t.classList.remove("is-open","is-open-up"),typeof s=="function"))try{s()}catch{}}function c(){a?d():l()}return{open:l,close:d,toggle:c,isOpen:()=>a,updateDirection:i}}function sx(t){let e=[],r=[];for(let a of t)if(!(!a||typeof a!="object")){if(typeof a.visible=="function")try{if(!a.visible())continue}catch{continue}a.dock===!0?e.push(a):r.push(a)}e.sort((a,i)=>(a.order??100)-(i.order??100));let n=new Map,s=[];for(let a of r){let i=String(a.group||"_default");n.has(i)?a.groupTitle&&!n.get(i).groupTitle&&(n.get(i).groupTitle=a.groupTitle):(n.set(i,{groupId:i,groupTitle:a.groupTitle||(i==="_default"?"":i),items:[]}),s.push(i)),n.get(i).items.push(a)}for(let a of n.values())a.items.sort((i,l)=>(i.order??100)-(l.order??100));return{screenGroups:s.map(a=>n.get(a)),dockItems:e}}function Ia(t){return String(t??"").replace(/[&<>"']/g,e=>TA[e])}function ox(t,{groupTitle:e},r){let n=t.createDocumentFragment();if(e){let o=t.createElement("div");o.className="phone-group-title",o.textContent=e,n.appendChild(o)}let s=t.createElement("div");return s.className="phone-icon-grid",r.forEach(o=>s.appendChild(o)),n.appendChild(s),n}function Vu(t,e="\u6682\u65E0\u83DC\u5355\u9879"){let r=t.createElement("div");return r.className="phone-empty",r.textContent=e,r}var TA,Ju=O(()=>{fo();TA={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}});function ax({onChange:t,onRefresh:e}){let r=new Map;function n(){if(typeof t=="function")try{t()}catch{}}function s(p){if(typeof e=="function")try{e(p)}catch{}}function o(p){return!p||typeof p!="object"?"\u9879\u5FC5\u987B\u662F\u5BF9\u8C61":!p.id||typeof p.id!="string"?"\u9879\u5FC5\u987B\u5305\u542B\u5B57\u7B26\u4E32 id":!p.label||typeof p.label!="string"?"\u9879\u5FC5\u987B\u5305\u542B\u5B57\u7B26\u4E32 label":p.kind&&!["toggle","button","slider","labelValue","custom"].includes(p.kind)?`\u672A\u77E5 kind: ${p.kind}`:p.kind==="custom"&&typeof p.render!="function"?"kind=custom \u5FC5\u987B\u63D0\u4F9B render \u51FD\u6570":null}function a(p){let g=o(p);if(g)throw new Error(`[FloatingBall] registerItem \u5931\u8D25: ${g}`);if(r.has(p.id)){let m=r.get(p.id);if(typeof m.destroy=="function")try{m.destroy()}catch{}}return r.set(p.id,{kind:"toggle",order:100,dock:!1,...p}),n(),()=>i(p.id)}function i(p){let g=r.get(p);if(!g)return!1;if(typeof g.destroy=="function")try{g.destroy()}catch{}return r.delete(p),n(),!0}function l(p,g){let m=r.get(p);return m?(r.set(p,{...m,...g}),n(),!0):!1}function d(p){if(p===void 0)for(let g of r.keys())s(g);else s(p)}function c(){return Array.from(r.values())}function u(p){return r.get(p)||null}function y(){for(let p of r.values())if(typeof p.destroy=="function")try{p.destroy()}catch{}r.clear()}return{registerItem:a,unregisterItem:i,updateItem:l,refresh:d,getAll:c,getItem:u,destroyAll:y}}function ix(){let t=Promise.resolve();function e(r){return t=t.catch(()=>{}).then(async()=>await r()),t}return{run:e}}function _A(t){return t&&Array.from(String(t))[0]||"\xB7"}function Xu(t,e,r){let n={...r,item:e};switch(e.kind){case"custom":return IA(t,e,n);case"slider":case"labelValue":case"button":case"toggle":default:return EA(t,e,n)}}function EA(t,e,r){let n=t.createElement("div");n.className="phone-app",n.setAttribute("data-id",e.id),n.setAttribute("data-kind",e.kind||"toggle"),e.radioGroup&&n.setAttribute("data-radio-group",e.radioGroup);let s=kA(e),o=Ia(e.label);n.innerHTML=`
    <div class="phone-app-icon" ${e.iconColor?`style="background: ${Ia(e.iconColor)}"`:""}>
      ${s}
      <span class="phone-app-badge" style="display:none;"></span>
    </div>
    <div class="phone-app-label">${o}</div>
  `;let a=n.querySelector(".phone-app-icon"),i=n.querySelector(".phone-app-badge"),l=n.querySelector(".phone-app-label");function d(){let c="off";if(typeof e.getState=="function")try{c=e.getState()||"off"}catch{c="off"}else e.kind==="button"&&(c="off");if((e.kind==="toggle"||typeof e.getState=="function")&&(n.classList.toggle("is-on",c==="on"),n.classList.toggle("is-missing",c==="missing")),e.kind==="labelValue"){let y="";if(typeof e.value=="function")try{y=e.value()}catch{y=""}else e.value!==void 0&&(y=e.value);y!==""&&y!=null?l.textContent=`${e.label} \xB7 ${y}`:l.textContent=e.label}RA(e,i);let u=typeof e.disabled=="function"?CA(e.disabled,!1):!!e.disabled;n.classList.toggle("is-disabled",u)}return n.addEventListener("click",c=>{if(!n.classList.contains("is-disabled")){if(c.stopPropagation(),typeof e.onClick!="function"&&e.kind==="slider"){if(typeof e.onChange=="function"){let u=Number.isFinite(e.step)?Number(e.step):1,y=AA(e),p=Number.isFinite(e.max)?Number(e.max):100,g=Number.isFinite(e.min)?Number(e.min):0,m=y+u;m>p&&(m=g),r.mutex.run(async()=>{try{await e.onChange({...r,value:m})}catch(h){r.logger?.error?.(`\u9879 ${e.id} onChange \u5F02\u5E38: ${h?.message||h}`,h)}finally{d()}})}return}typeof e.onClick=="function"?r.mutex.run(async()=>{try{await e.onClick(r)}catch(u){r.logger?.error?.(`\u9879 ${e.id} onClick \u5F02\u5E38: ${u?.message||u}`,u)}finally{d()}}):r.logger?.warn?.(`\u9879 ${e.id} (${e.kind}) \u672A\u63D0\u4F9B onClick`)}}),d(),{el:n,sync:d}}function AA(t){if(typeof t.value=="function")try{return Number(t.value())||0}catch{return 0}return Number.isFinite(t.value)?Number(t.value):0}function CA(t,e){try{return!!t()}catch{return e}}function kA(t){if(typeof t.icon=="string"&&t.icon.trim()){let e=t.icon.trim();return e.startsWith("<svg")||e.startsWith("<SVG")?e:Ia(e)}return Ia(_A(t.label))}function IA(t,e,r){let n=t.createElement("div");n.className="phone-app phone-app-custom",n.setAttribute("data-id",e.id);let s=null;try{s=e.render(r)}catch(a){r.logger?.error?.(`custom \u9879 ${e.id} render \u5F02\u5E38: ${a?.message||a}`,a),s=t.createTextNode(`[\u6E32\u67D3\u5931\u8D25: ${e.id}]`)}s instanceof Node?n.appendChild(s):s!=null&&(n.innerHTML=String(s));function o(){if(typeof e.onSync=="function")try{e.onSync({...r,container:n})}catch{}}return{el:n,sync:o}}function RA(t,e){if(!e)return;if(typeof t.badge!="function"){e.style.display="none";return}let r=null;try{r=t.badge()}catch{r=null}if(r==null||r===""||r===0||r==="0"){e.style.display="none",e.textContent="";return}e.style.display="",e.textContent=String(r)}var lx=O(()=>{Ju()});var gx={};ue(gx,{default:()=>YA,floatingBall:()=>fx});function dx(){return{inited:!1,destroyed:!1,root:null,orb:null,menu:null,phoneScreen:null,phoneContent:null,phoneDock:null,phoneTime:null,dragHandle:null,menuClose:null,badge:null,styleEl:null,targetDoc:null,targetWin:null,cleanupRegistry:null,dragController:null,menuController:null,itemRegistry:null,mutex:null,itemElCache:new Map,unsubscribers:[],openPopupRef:null,timeTimer:null}}function ux(){M=dx()}function MA(){return{storage:ep,logger:Ur,closeMenu:()=>M.menuController?.close?.(),refresh:t=>M.itemRegistry?.refresh?.(t),mutex:M.mutex,get isOpen(){return!!M.menuController?.isOpen?.()}}}function Qu(){if(!M.phoneContent||!M.phoneDock)return;M.itemElCache.forEach(({destroy:s})=>{if(typeof s=="function")try{s()}catch{}}),M.itemElCache.clear(),M.phoneContent.innerHTML="",M.phoneDock.innerHTML="";let t=M.itemRegistry.getAll(),{screenGroups:e,dockItems:r}=sx(t),n=MA();e.length===0&&r.length===0?M.phoneContent.appendChild(Vu(M.targetDoc,"\u6682\u65E0\u83DC\u5355\u9879")):e.length===0?M.phoneContent.appendChild(Vu(M.targetDoc,"\u6240\u6709\u9879\u90FD\u5728 Dock")):e.forEach(s=>{let o=[];s.items.forEach(i=>{let{el:l,sync:d}=Xu(M.targetDoc,i,n);M.itemElCache.set(i.id,{el:l,sync:d,destroy:i.destroy}),o.push(l)});let a=ox(M.targetDoc,{groupTitle:s.groupTitle},o);M.phoneContent.appendChild(a)}),r.forEach(s=>{let{el:o,sync:a}=Xu(M.targetDoc,s,n);M.itemElCache.set(s.id,{el:o,sync:a,destroy:s.destroy}),M.phoneDock.appendChild(o)})}function px(t){let e=M.itemElCache.get(t);if(e?.sync)try{e.sync()}catch(r){Ur.error(`\u9879 ${t} sync \u5F02\u5E38: ${r?.message||r}`,r)}Zu()}function _l(){M.itemElCache.forEach((t,e)=>{px(e)})}function Zu(){if(!M.badge)return;let t=0,e=M.itemRegistry.getAll();for(let r of e)if(typeof r.badge=="function")try{let n=r.badge();typeof n=="number"&&n>0?t+=n:typeof n=="string"&&n&&n!=="0"&&(t+=1)}catch{}t>0?(M.badge.textContent=t>99?"99+":String(t),M.badge.classList.add("has-count")):(M.badge.textContent="0",M.badge.classList.remove("has-count"))}function El(){M.phoneTime&&(M.phoneTime.textContent=Xb())}function PA(){El();let t=new Date,e=(60-t.getSeconds())*1e3-t.getMilliseconds();M.timeTimer=setTimeout(function(){El(),M.timeTimer=setInterval(El,6e4)},Math.max(500,e))}function NA(){M.timeTimer!=null&&(clearTimeout(M.timeTimer),clearInterval(M.timeTimer),M.timeTimer=null)}function cx(t){M.root&&(M.root.style.left=`${t.x}px`,M.root.style.top=`${t.y}px`)}function $A(t){try{ep.set(qu,{x:t.x,y:t.y})}catch(e){Ur.warn(`\u4F4D\u7F6E\u6301\u4E45\u5316\u5931\u8D25: ${e?.message||e}`)}}function DA(){let t=M.itemRegistry;t.registerItem({id:"open-main-ui",label:"\u4E3B\u9762\u677F",group:"shortcuts",kind:"button",order:10,dock:!0,icon:OA,iconColor:"linear-gradient(140deg, #7bb7ff 0%, #4a7ec6 100%)",onClick:e=>{if(typeof M.openPopupRef=="function")try{M.openPopupRef()}catch(r){Ur.error(`\u6253\u5F00\u4E3B\u9762\u677F\u5931\u8D25: ${r?.message||r}`,r)}else Ur.warn("openPopup \u672A\u63D0\u4F9B");e.closeMenu()}}),t.registerItem({id:"compact-mode",label:"\u7D27\u51D1\u6A21\u5F0F",group:"preferences",groupTitle:"\u504F\u597D",kind:"toggle",order:10,icon:LA,iconColor:"linear-gradient(140deg, #3a3d4a 0%, #1f2128 100%)",getState:()=>{try{return xt.getUiSettings()?.compactMode?"on":"off"}catch{return"off"}},onClick:async()=>{try{let e=xt.getUiSettings()?.compactMode===!0;xt.updateUiSettings({compactMode:!e})}catch(e){Ur.error(`\u5207\u6362\u7D27\u51D1\u6A21\u5F0F\u5931\u8D25: ${e?.message||e}`,e)}}})}function BA(){let t=()=>{M.itemRegistry?.refresh?.("compact-mode")},e=G.on(F.SETTINGS_UPDATED,t);M.unsubscribers.push(()=>{typeof e=="function"&&e()})}function tp(){if(!(!M.inited&&!M.root)){NA(),M.itemElCache.forEach(({destroy:t})=>{if(typeof t=="function")try{t()}catch{}}),M.itemElCache.clear(),M.unsubscribers.forEach(t=>{try{t()}catch{}});try{M.itemRegistry?.destroyAll?.()}catch{}try{M.cleanupRegistry?.removeAll?.()}catch{}M.root&&typeof M.root.remove=="function"&&M.root.remove(),M.styleEl&&typeof M.styleEl.remove=="function"&&M.styleEl.remove();try{M.targetWin&&M.targetWin[yo]===tp&&delete M.targetWin[yo]}catch{}ux(),M.destroyed=!0,Ur.log("\u6D6E\u7403\u5DF2\u9500\u6BC1")}}function zA(t={}){let e=t.targetDocument||document,r=t.targetWindow||window;try{if(typeof r[yo]=="function")try{r[yo]()}catch{}}catch{}Yb(e),ux(),M.targetDoc=e,M.targetWin=r,M.openPopupRef=typeof t.openPopup=="function"?t.openPopup:null,M.styleEl=qb(e,`${B}-style`,Wb());let n=Gb(e);M.root=n.root,M.orb=n.orb,M.menu=n.menu,M.phoneScreen=n.phoneScreen,M.phoneContent=n.phoneContent,M.phoneDock=n.phoneDock,M.phoneTime=n.phoneTime,M.dragHandle=n.dragHandle,M.menuClose=n.menuClose,M.badge=n.badge;let s=ep.get(qu,null),o=s&&Number.isFinite(s.x)&&Number.isFinite(s.y)?Yu(s,r):Jb(r);cx(o),(e.body||e.documentElement).appendChild(M.root),M.cleanupRegistry=Vb(),M.mutex=ix(),M.menuController=nx({root:M.root,menu:M.menu,targetWindow:r,onOpen:()=>{Qu(),_l(),El()},onClose:()=>{}}),M.dragController=ex({root:M.root,orb:M.orb,menuHead:M.dragHandle,targetDocument:e,targetWindow:r,on:M.cleanupRegistry.on,savePosition:$A,onTapWhenNotDragged:()=>M.menuController.toggle(),onDragMove:()=>{M.menuController.isOpen()&&M.menuController.updateDirection()}}),M.itemRegistry=ax({onChange:()=>{M.menuController.isOpen()&&(Qu(),_l()),Zu()},onRefresh:a=>{a==null?_l():px(a)}}),M.cleanupRegistry.on(e,"click",a=>{M.menuController.isOpen()&&(M.dragController.isDragging()||M.root.contains(a.target)||M.menuController.close())}),M.cleanupRegistry.on(M.menuClose,"click",a=>{a.stopPropagation(),M.menuController.close()}),M.cleanupRegistry.on(r,"resize",()=>{if(!M.root)return;let a={x:parseInt(M.root.style.left,10)||0,y:parseInt(M.root.style.top,10)||0},i=Yu(a,r);cx(i),M.menuController.isOpen()&&M.menuController.updateDirection()}),DA(),BA(),Zu(),PA();try{r[yo]=tp}catch{}M.inited=!0,Ur.log("\u6D6E\u7403\u5DF2\u521D\u59CB\u5316")}function yx(){return M.inited===!0&&!!M.root}function _n(t){return yx()?!0:(Ur.warn(`\u6D6E\u7403\u672A\u5C31\u7EEA\uFF0C${t} \u88AB\u5FFD\u7565`),!1)}function KA(t){return _n("registerItem")?M.itemRegistry.registerItem(t):()=>{}}function jA(t){return _n("unregisterItem")?M.itemRegistry.unregisterItem(t):!1}function UA(t,e){if(!_n("updateItem"))return!1;let r=M.itemRegistry.updateItem(t,e);return r&&M.menuController.isOpen()&&(Qu(),_l()),r}function FA(t){_n("refresh")&&M.itemRegistry.refresh(t)}function WA(t){_n("setVisible")&&M.root.classList.toggle("is-hidden",!t)}function HA(){_n("openMenu")&&M.menuController.open()}function GA(){_n("closeMenu")&&M.menuController.close()}function qA(t){_n("toggleMenu")&&(t===!0?M.menuController.open():t===!1?M.menuController.close():M.menuController.toggle())}var Ur,ep,M,OA,LA,fx,YA,mx=O(()=>{We();Y();at();Vs();fo();Hb();Qb();tx();Ju();lx();Ur=I.createScope("FloatingBall"),ep=j.namespace(Fb),M=dx();OA=`
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
    <line x1="6" y1="18" x2="14" y2="10" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
    <path d="M15.5 4 L16.5 7.5 L20 8.5 L16.5 9.5 L15.5 13 L14.5 9.5 L11 8.5 L14.5 7.5 Z" fill="#fff"/>
  </svg>
`,LA=`
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
    <path d="M13 2 L4 14 L11 14 L10 22 L20 9 L13 9 Z" fill="currentColor" stroke="none"/>
  </svg>
`;fx={init:zA,destroy:tp,isReady:yx,registerItem:KA,unregisterItem:jA,updateItem:UA,refresh:FA,setVisible:WA,openMenu:HA,closeMenu:GA,toggleMenu:qA},YA=fx});var np={};ue(np,{confirmDeleteTool:()=>eC,confirmResetTools:()=>nC,getAllTools:()=>mr,getTool:()=>hr,showExportToolsDialog:()=>tC,showImportToolsDialog:()=>rC,showToolEditDialog:()=>ZA});async function ZA(t=null){let e=t?hr(t):null,r=!!e,n=me({value:e?.name||"",placeholder:"\u5DE5\u5177\u540D\u79F0"}),s=Ee({value:e?.category||"utility",options:QA}),o=me({value:e?.description||"",placeholder:"\u5DE5\u5177\u63CF\u8FF0"}),a=f("input",{className:"yyt-input",attrs:{type:"number",min:"1000"},style:{padding:"7px 10px",fontSize:"12px"}});a.value=String(e?.config?.execution?.timeout||6e4);let i=f("input",{className:"yyt-input",attrs:{type:"number",min:"0",max:"10"},style:{padding:"7px 10px",fontSize:"12px"}});i.value=String(e?.config?.execution?.retries??3);function l(p,g,m=""){let h=f("div",{className:"yyt-form-group",style:{margin:"0 0 12px 0"}});return h.appendChild(f("label",{text:p,style:{fontSize:"12px",fontWeight:"600",color:"var(--yyt-text-secondary, rgba(255,255,255,0.55))",display:"block",marginBottom:"4px"}})),h.appendChild(g),m&&h.appendChild(f("div",{text:m,style:{fontSize:"11px",color:"var(--yyt-text-muted)",marginTop:"4px"}})),h}let d=f("div",{style:{display:"flex",flexDirection:"column"}}),c=f("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px"}});c.appendChild(l("\u5DE5\u5177\u540D\u79F0",n.el)),c.appendChild(l("\u5206\u7C7B",s.el)),d.appendChild(c),d.appendChild(l("\u63CF\u8FF0",o.el));let u=f("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px"}});u.appendChild(l("\u8D85\u65F6\u65F6\u95F4 (ms)",a)),u.appendChild(l("\u91CD\u8BD5\u6B21\u6570",i)),d.appendChild(u);let y=ke.custom({title:r?`\u7F16\u8F91\u5DE5\u5177\u300C${e.name}\u300D`:"\u65B0\u5EFA\u5DE5\u5177",width:"480px",body:d,buttons:[{label:"\u53D6\u6D88",variant:"ghost",onClick:p=>p(null)},{label:r?"\u4FDD\u5B58":"\u521B\u5EFA",variant:"primary",onClick:p=>{let g=String(n.get()||"").trim();if(!g){n.el.focus();return}let m=t||`tool_${Date.now()}`;if(!_s(m,{name:g,category:s.get(),description:String(o.get()||"").trim(),promptTemplate:e?.promptTemplate||"",extractTags:Array.isArray(e?.extractTags)?e.extractTags:[],config:{execution:{timeout:Math.max(1e3,parseInt(a.value,10)||6e4),retries:Math.max(0,parseInt(i.value,10)||3)},api:e?.config?.api||{preset:"",useBypass:!1,bypassPreset:""},messages:Array.isArray(e?.config?.messages)?e.config.messages:[],context:{depth:e?.config?.context?.depth||3,includeTags:Array.isArray(e?.config?.context?.includeTags)?e.config.context.includeTags:[],excludeTags:Array.isArray(e?.config?.context?.excludeTags)?e.config.context.excludeTags:[]},worldbooks:{enabled:e?.config?.worldbooks?.enabled===!0,selected:Array.isArray(e?.config?.worldbooks?.selected)?e.config.worldbooks.selected:[]}},enabled:e?.enabled!==!1})){rp.warn("saveTool \u5931\u8D25",{id:m});return}try{Rs(m)}catch(b){rp.warn("ensureToolRuntimeConfig \u5F02\u5E38",{err:b})}p(m)}}]});return setTimeout(()=>n.el.focus(),0),y.result}async function eC(t){let e=hr(t);return!e||!await ke.confirm({title:"\u5220\u9664\u5DE5\u5177",message:`\u786E\u5B9A\u5220\u9664\u5DE5\u5177\u300C${e.name}\u300D\uFF1F\u6B64\u64CD\u4F5C\u4E0D\u53EF\u64A4\u9500\u3002`,confirmText:"\u5220\u9664",danger:!0})?!1:Es(t)}function tC(){let t;try{t=As()}catch(r){ke.confirm({title:"\u5BFC\u51FA\u5931\u8D25",message:String(r?.message||r),confirmText:"\u786E\u5B9A"});return}let e=f("textarea",{className:"yyt-textarea",style:{width:"100%",minHeight:"220px",fontSize:"12px",fontFamily:"monospace"}});e.value=t,e.readOnly=!0,ke.custom({title:"\u5BFC\u51FA\u5DE5\u5177 JSON",width:"600px",body:e,buttons:[{label:"\u5173\u95ED",variant:"ghost",onClick:r=>r(null)},{label:"\u590D\u5236\u5230\u526A\u8D34\u677F",variant:"ghost",onClick:async()=>{try{await navigator.clipboard.writeText(t)}catch{e.select();try{document.execCommand("copy")}catch{}}}},{label:"\u4E0B\u8F7D JSON",variant:"primary",onClick:()=>{try{let r=new Blob([t],{type:"application/json"}),n=URL.createObjectURL(r),s=f("a",{attrs:{href:n,download:`youyou_tools_${Date.now()}.json`}});document.body.appendChild(s),s.click(),setTimeout(()=>{try{document.body.removeChild(s)}catch{}try{URL.revokeObjectURL(n)}catch{}},100)}catch(r){rp.warn("\u4E0B\u8F7D\u5931\u8D25",{err:r})}}}]})}async function rC(){let t=f("textarea",{className:"yyt-textarea",attrs:{placeholder:"\u7C98\u8D34 YouYou Toolkit \u5DE5\u5177 JSON"},style:{width:"100%",minHeight:"200px",fontSize:"12px",fontFamily:"monospace"}}),e=f("label",{style:{display:"flex",alignItems:"center",gap:"6px",fontSize:"12px",color:"var(--yyt-text-secondary)",marginTop:"8px"}}),r=f("input",{attrs:{type:"checkbox"}});e.appendChild(r),e.appendChild(f("span",{text:"\u8986\u76D6\u6A21\u5F0F\uFF08\u6E05\u7A7A\u5DF2\u6709\u5DE5\u5177\u540E\u518D\u5BFC\u5165\uFF1B\u4E0D\u52FE\u9009\u5219\u5408\u5E76\uFF09"}));let n=f("div");n.appendChild(t),n.appendChild(e),n.appendChild(f("div",{style:{display:"flex",gap:"6px",marginTop:"8px"}},X({label:"\u{1F4C1} \u4ECE\u6587\u4EF6\u2026",size:"small",variant:"ghost",onClick:()=>{let o=f("input",{attrs:{type:"file",accept:"application/json,.json"}});o.addEventListener("change",()=>{let a=o.files?.[0];if(!a)return;let i=new FileReader;i.onload=()=>{t.value=String(i.result||""),t.focus()},i.readAsText(a)}),o.click()}}).el));let s=ke.custom({title:"\u5BFC\u5165\u5DE5\u5177 JSON",width:"520px",body:n,buttons:[{label:"\u53D6\u6D88",variant:"ghost",onClick:o=>o(null)},{label:"\u5BFC\u5165",variant:"primary",onClick:async o=>{let a=t.value.trim();if(!a){o(null);return}try{let i=Cs(a,{overwrite:r.checked});o(i)}catch(i){await ke.confirm({title:"\u5BFC\u5165\u5931\u8D25",message:String(i?.message||i),confirmText:"\u786E\u5B9A"})}}}]});return setTimeout(()=>t.focus(),0),s.result}async function nC(){return await ke.confirm({title:"\u91CD\u7F6E\u6240\u6709\u5DE5\u5177",message:"\u6B64\u64CD\u4F5C\u4F1A\u5220\u9664\u6240\u6709\u81EA\u5B9A\u4E49\u5DE5\u5177\u4E0E\u9884\u8BBE\uFF0C\u4E0D\u53EF\u64A4\u9500\u3002\u5185\u7F6E\u5DE5\u5177\u4E0D\u53D7\u5F71\u54CD\u3002",confirmText:"\u91CD\u7F6E",danger:!0})?(ks(),!0):!1}var rp,QA,sp=O(()=>{Ro();nr();Ko();xr();Y();rp=I.createScope("ToolActions"),QA=[{value:"api",label:"API"},{value:"prompt",label:"Prompt"},{value:"utility",label:"Utility"}]});Y();var lp=`/**\r
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
`;lt();function hx(t,e={}){let{constants:r,topLevelWindow:n,modules:s}=t,{SCRIPT_ID:o,SCRIPT_VERSION:a,MENU_ITEM_ID:i,MENU_CONTAINER_ID:l}=r,d=null,c=!1,u=I.createScope("Bootstrap");I.setToastHandler((_,k,v)=>{if(v.toast&&Oa(v.toast===!0?_:v.toast,k,v.duration),v.topNotice){let C=typeof v.topNotice=="object"?v.topNotice:{};Ol(_,k,C)}});function y(..._){u.log(_.join(" "))}function p(..._){u.error(_.join(" "))}async function g(){return d||(d=(async()=>{try{s.storageModule=await Promise.resolve().then(()=>(We(),Tp)),s.apiConnectionModule=await Promise.resolve().then(()=>(Co(),kp)),s.presetManagerModule=await Promise.resolve().then(()=>(hs(),Pp)),s.uiModule=await Promise.resolve().then(()=>(Rb(),Ib)),s.regexExtractorModule=await Promise.resolve().then(()=>(Ts(),wc)),s.toolManagerModule=await Promise.resolve().then(()=>(Ko(),Wy)),s.toolExecutorModule=await Promise.resolve().then(()=>(Ed(),_d)),s.windowManagerModule=await Promise.resolve().then(()=>(ru(),Bh)),s.toolRegistryModule=await Promise.resolve().then(()=>(xr(),kc)),s.settingsServiceModule=await Promise.resolve().then(()=>(Vs(),Kg)),s.bypassManagerModule=await Promise.resolve().then(()=>(Ys(),zg)),s.variableResolverModule=await Promise.resolve().then(()=>(Di(),Wg)),s.contextInjectorModule=await Promise.resolve().then(()=>(Zn(),Ug)),s.toolPromptServiceModule=await Promise.resolve().then(()=>(zi(),qg)),s.toolOutputServiceModule=await Promise.resolve().then(()=>(oa(),Vg)),s.toolAutomationServiceModule=await Promise.resolve().then(()=>(Db(),Lb)),s.toolDataProviderModule=await Promise.resolve().then(()=>(Ks(),qf)),s.presetBootstrapModule=await Promise.resolve().then(()=>(Ub(),jb)),s.floatingBallModule=await Promise.resolve().then(()=>(mx(),gx));try{s.toolDataProviderModule.getToolDataProvider({extensionVersion:a}).then(_=>{u.log(`Provider \u5C31\u7EEA: ${_.kind}`)}).catch(_=>{u.error(`Provider \u521D\u59CB\u5316\u5F02\u5E38: ${_?.message||_}`)})}catch(_){u.error(`Provider \u542F\u52A8\u5F02\u5E38: ${_?.message||_}`)}return s.toolOutputServiceModule?.toolOutputService&&s.apiConnectionModule&&s.toolOutputServiceModule.toolOutputService.setApiConnection(s.apiConnectionModule),!0}catch(_){return d=null,p("\u6A21\u5757\u52A0\u8F7D\u5931\u8D25\uFF0C\u4F7F\u7528\u5185\u7F6E\u529F\u80FD:",_),p("\u5DF2\u52A0\u8F7D\u6A21\u5757:",Object.keys(s).filter(k=>s[k])),!1}})(),d)}function m(){let _=`${o}-styles`,k=n.document||document;if(k.getElementById(_))return;let v=k.createElement("style");v.id=_,v.textContent=lp,(k.head||k.documentElement).appendChild(v),y("\u6837\u5F0F\u5DF2\u6CE8\u5165")}function h(){let _=n.document||document;if(s.uiModule?.getAllStyles){let k=`${o}-ui-styles`;if(!_.getElementById(k)){let v=_.createElement("style");v.id=k,v.textContent=s.uiModule.getAllStyles(),(_.head||_.documentElement).appendChild(v)}}}async function b(){try{let{applyUiPreferences:_}=await Promise.resolve().then(()=>(Od(),$d));if(s.settingsServiceModule?.settingsService){let k=s.settingsServiceModule.settingsService.getUiSettings();if(k&&k.theme){let v=n.document||document;_(k,v),y(`\u4E3B\u9898\u5DF2\u5E94\u7528: ${k.theme}`)}}}catch(_){y("\u4E3B\u9898\u52A0\u8F7D\u5931\u8D25:",_)}}function w(){let _=n.jQuery||window.jQuery;if(!_){p("jQuery \u672A\u627E\u5230\uFF0C\u5EF6\u8FDF\u91CD\u8BD5..."),setTimeout(w,1e3);return}let k=n.document||document,v=_("#extensionsMenu",k);if(!v.length){y("\u9B54\u68D2\u83DC\u5355\u672A\u627E\u5230\uFF0C\u5EF6\u8FDF\u91CD\u8BD5..."),setTimeout(w,2e3);return}if(_(`#${l}`,v).length>0){y("\u83DC\u5355\u9879\u5DF2\u5B58\u5728");return}let R=_(`<div class="extension_container interactable" id="${l}" tabindex="0"></div>`),L=`
      <div class="list-group-item flex-container flexGap5 interactable" id="${i}" title="\u6253\u5F00 YouYou \u5DE5\u5177\u7BB1">
        <div class="fa-fw fa-solid fa-wand-magic-sparkles extensionsMenuExtensionButton"></div>
        <span>YouYou \u5DE5\u5177\u7BB1</span>
      </div>
    `,N=_(L);N.on("click",function(P){P.stopPropagation(),y("\u83DC\u5355\u9879\u88AB\u70B9\u51FB");let U=_("#extensionsMenuButton",k);U.length&&v.is(":visible")&&U.trigger("click"),typeof e.openPopup=="function"&&e.openPopup()}),R.append(N),v.append(R),y("\u83DC\u5355\u9879\u5DF2\u6DFB\u52A0\u5230\u9B54\u68D2\u533A")}async function S(){y(`\u521D\u59CB\u5316\u5F00\u59CB... \u7248\u672C: ${a}`),await m();let _=await g();if(y(_?"\u6240\u6709\u6A21\u5757\u52A0\u8F7D\u6210\u529F":"\u90E8\u5206\u6A21\u5757\u52A0\u8F7D\u5931\u8D25\uFF0C\u4F7F\u7528\u53EF\u7528\u529F\u80FD"),!c&&s.uiModule?.initUI)try{await s.uiModule.initUI({services:s,autoInjectStyles:!1,targetDocument:n.document||document}),c=!0,y("UI \u88C5\u914D\u4E2D\u5FC3\u5DF2\u521D\u59CB\u5316")}catch(v){p("UI \u6A21\u5757\u521D\u59CB\u5316\u5931\u8D25:",v)}if(s.uiModule&&(h(),await b()),s.presetBootstrapModule?.ensurePresetSystem)try{let v=s.presetBootstrapModule.ensurePresetSystem();v?.aborted?y(`\u9884\u8BBE\u7CFB\u7EDF\u8FC1\u79FB\u5931\u8D25\u5DF2 abort\uFF0C\u8001\u5B57\u6BB5\u4FDD\u7559: ${v.error}`):v?.skipped?y(`\u9884\u8BBE\u7CFB\u7EDF\u5DF2\u5C31\u7EEA\uFF08${v.reason}\uFF09`):y(`\u9884\u8BBE\u7CFB\u7EDF\u8FC1\u79FB\u5B8C\u6210\uFF08${v.migratedCount}/${v.total} \u5DE5\u5177\uFF09`)}catch(v){p("\u9884\u8BBE\u7CFB\u7EDF\u521D\u59CB\u5316\u5F02\u5E38:",v)}if(s.toolAutomationServiceModule?.toolAutomationService){let v=s.toolAutomationServiceModule.toolAutomationService.init();y(v?"\u81EA\u52A8\u5316\u751F\u547D\u5468\u671F\u670D\u52A1\u5DF2\u521D\u59CB\u5316":"\u81EA\u52A8\u5316\u751F\u547D\u5468\u671F\u670D\u52A1\u521D\u59CB\u5316\u672A\u5B8C\u6210\uFF0C\u7B49\u5F85\u5BBF\u4E3B\u4E8B\u4EF6\u6E90\u91CD\u8BD5")}let k=n.document||document;if(k.readyState==="loading"?k.addEventListener("DOMContentLoaded",()=>{setTimeout(w,1e3)}):setTimeout(w,1e3),s.floatingBallModule?.floatingBall)try{s.floatingBallModule.floatingBall.init({targetDocument:n.document||document,targetWindow:n||window,openPopup:e.openPopup})}catch(v){p("\u6D6E\u7403\u521D\u59CB\u5316\u5931\u8D25:",v)}y("\u521D\u59CB\u5316\u5B8C\u6210")}return{loadModules:g,injectStyles:m,addMenuItem:w,init:S,log:y,logError:p}}at();lt();lt();Y();var go=I.createScope("PromptEditor"),VA="youyou_toolkit_prompt_editor",JA={system:"System Prompt (\u7CFB\u7EDF\u63D0\u793A\u8BCD)",ai:"AI Prompt (AI\u6307\u4EE4\u63D0\u793A\u8BCD)",user:"User Prompt (\u7528\u6237\u63D0\u793A\u8BCD)"},XA={system:"fa-server",ai:"fa-robot",user:"fa-user"},Ra=[{id:"system_1",type:"system",role:"SYSTEM",mainSlot:"",content:"",deletable:!1,expanded:!0},{id:"ai_1",type:"ai",role:"USER",mainSlot:"A",content:"",deletable:!1,expanded:!0,isMain:!0},{id:"user_1",type:"user",role:"USER",mainSlot:"B",content:"",deletable:!1,expanded:!0,isMain2:!0}],Al=class{constructor(e={}){this.containerId=e.containerId||VA,this.segments=e.segments||[...Ra],this.onChange=e.onChange||null,this.editable=e.editable!==!1,this.showMainSlot=e.showMainSlot!==!1,this.$container=null,this.$=null}init(e){if(this.$=window.jQuery||window.parent?.jQuery,!this.$){go.error("jQuery not available");return}this.$container=e,this.render(),this.bindEvents()}setSegments(e){this.segments=e&&Array.isArray(e)?[...e]:[...Ra],this.$container&&(this.render(),this.bindEvents())}getSegments(){return this.segments.map(e=>({...e,content:this.getSegmentContent(e.id)}))}getSegmentContent(e){return this.$container&&this.$container.find(`[data-segment-id="${e}"] .yyt-prompt-textarea`).val()||""}render(){if(!this.$container)return;let e=`
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
    `;this.$container.html(e)}renderSegment(e){let r=JA[e.type]||e.type,n=XA[e.type]||"fa-file",s=e.mainSlot==="A"||e.isMain,o=e.mainSlot==="B"||e.isMain2,a=s?"var(--yyt-accent, #7bb7ff)":o?"#ffb74d":"",i=this.showMainSlot&&e.mainSlot?`<span class="yyt-prompt-slot-badge">mainSlot: ${e.mainSlot}</span>`:"",l=`<span class="yyt-prompt-role-badge">role: ${e.role||"USER"}</span>`;return`
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
    `}bindEvents(){this.$container&&(Lt(this.$container,"yytPromptEditorSelect"),this.$container.off(".yytPromptEditor"),this.$container.on("click.yytPromptEditor",".yyt-prompt-toggle",e=>{this.$(e.currentTarget).closest(".yyt-prompt-segment").toggleClass("yyt-expanded"),this.$(e.currentTarget).find("i").toggleClass("fa-chevron-up fa-chevron-down")}),this.$container.on("click.yytPromptEditor",".yyt-prompt-delete",e=>{let r=this.$(e.currentTarget).closest(".yyt-prompt-segment").data("segment-id");this.deleteSegment(r)}),this.$container.on("change.yytPromptEditor",".yyt-prompt-role",e=>{let r=this.$(e.currentTarget).closest(".yyt-prompt-segment").data("segment-id"),n=this.$(e.currentTarget).val();this.updateSegmentMeta(r,{role:n})}),this.$container.on("change.yytPromptEditor",".yyt-prompt-main-slot",e=>{let r=this.$(e.currentTarget).closest(".yyt-prompt-segment").data("segment-id"),n=this.$(e.currentTarget).val();this.updateSegmentMeta(r,{mainSlot:n})}),this.$container.on("input.yytPromptEditor",".yyt-prompt-textarea",e=>{this.onChange&&this.onChange(this.getSegments())}),this.$container.on("click.yytPromptEditor",`#${this.containerId}-add-segment`,()=>{this.addSegment()}),this.$container.on("click.yytPromptEditor",`#${this.containerId}-import-prompt`,()=>{this.importPrompt()}),this.$container.on("click.yytPromptEditor",`#${this.containerId}-export-prompt`,()=>{this.exportPrompt()}),pr(this.$container,{namespace:"yytPromptEditorSelect",selectors:[".yyt-prompt-role",".yyt-prompt-main-slot"]}))}addSegment(e=null){let r=`segment_${Date.now()}`,n=e||{id:r,type:"user",role:"USER",mainSlot:"",content:"",deletable:!0,expanded:!0};n.id||(n.id=r),this.segments.push(n),this.render(),this.bindEvents(),this.onChange&&this.onChange(this.getSegments())}deleteSegment(e){let r=this.segments.findIndex(s=>s.id===e);if(r===-1)return;if(this.segments[r].deletable===!1){go.warn("\u8BE5\u6BB5\u843D\u4E0D\u53EF\u5220\u9664");return}this.segments.splice(r,1),this.render(),this.bindEvents(),this.onChange&&this.onChange(this.getSegments())}updateSegmentMeta(e,r){let n=this.segments.find(s=>s.id===e);n&&(Object.assign(n,r),this.onChange&&this.onChange(this.getSegments()))}importPrompt(){let e=document.createElement("input");e.type="file",e.accept=".json",e.onchange=r=>{let n=r.target.files[0];if(!n)return;let s=new FileReader;s.onload=o=>{try{let a=JSON.parse(o.target.result);Array.isArray(a)?(this.setSegments(a),go.log("\u63D0\u793A\u8BCD\u5BFC\u5165\u6210\u529F")):go.error("\u65E0\u6548\u7684\u63D0\u793A\u8BCD\u683C\u5F0F")}catch(a){go.error("\u5BFC\u5165\u5931\u8D25:",a)}},s.readAsText(n)},e.click()}exportPrompt(){let e=this.getSegments(),r=JSON.stringify(e,null,2),n=new Blob([r],{type:"application/json"}),s=URL.createObjectURL(n),o=document.createElement("a");o.href=s,o.download=`prompt_group_${Date.now()}.json`,o.click(),URL.revokeObjectURL(s),go.log("\u63D0\u793A\u8BCD\u5DF2\u5BFC\u51FA")}destroy(){this.$container&&(Lt(this.$container,"yytPromptEditorSelect"),this.$container.off(".yytPromptEditor"))}escapeHtml(e){return typeof e!="string"?"":e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}};function bx(){return`
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
  `}function xx(t){return t.filter(e=>e.content&&e.content.trim()).map(e=>({role:e.role,content:e.content,deletable:e.deletable,mainSlot:e.mainSlot}))}function wx(t){return Array.isArray(t)?t.map((e,r)=>({id:`segment_${r}_${Date.now()}`,type:e.role==="SYSTEM"?"system":e.role==="assistant"?"ai":"user",role:e.role,mainSlot:e.mainSlot||"",content:e.content||"",deletable:e.deletable!==!1,expanded:!0,isMain:e.mainSlot==="A"||e.isMain,isMain2:e.mainSlot==="B"||e.isMain2})):[...Ra]}Y();function vx(t){let{constants:e,topLevelWindow:r,modules:n,caches:s,uiState:o}=t,{SCRIPT_ID:a,SCRIPT_VERSION:i,POPUP_ID:l}=e,d=I.createScope("PopupShell"),c={cleanup:null},u={cleanups:[]},y={cleanups:[]},p={current:null};function g(){return!!o.sidebarCollapsed}function m(){o.sidebarCollapsed=!o.sidebarCollapsed;let x=o.currentPopup;if(!x)return;let T=x.querySelector(".yyt-shell-sidebar"),$=x.querySelector(".yyt-shell-workspace"),D=x.querySelector(".yyt-sidebar-toggle i");T&&T.classList.toggle("yyt-collapsed",o.sidebarCollapsed),$&&$.classList.toggle("yyt-sidebar-collapsed",o.sidebarCollapsed),D&&(D.className=o.sidebarCollapsed?"fa-solid fa-angles-right":"fa-solid fa-angles-left"),rt()}function h(...x){d.log(x.join(" "))}function b(...x){d.error(x.join(" "))}function w(x){return typeof x!="string"?"":x.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function S(){return r.jQuery||window.jQuery}function _(){return r.document||document}function k(x){if(!x)return"\u672A\u9009\u62E9\u9875\u9762";let T=n.toolRegistryModule?.getToolConfig(x);if(!T)return x;if(!T.hasSubTabs)return T.name||x;let $=C(x),D=T.subTabs?.find(W=>W.id===$);return D?.name?`${T.name} / ${D.name}`:T.name||x}function v(x){if(!x)return"\u8BF7\u9009\u62E9\u5DE6\u4FA7\u5BFC\u822A\u4E2D\u7684\u9875\u9762\u8FDB\u884C\u914D\u7F6E\u6216\u6392\u67E5\u3002";let T=n.toolRegistryModule?.getToolConfig(x);if(!T)return"\u5F53\u524D\u9875\u9762\u63CF\u8FF0\u6682\u4E0D\u53EF\u7528\u3002";if(!T.hasSubTabs)return T.description||"\u5728\u8FD9\u91CC\u7BA1\u7406\u5F53\u524D\u9875\u9762\u7684\u914D\u7F6E\u548C\u64CD\u4F5C\u3002";let $=C(x);return T.subTabs?.find(W=>W.id===$)?.description||T.description||"\u5728\u8FD9\u91CC\u7BA1\u7406\u5F53\u524D\u5DE5\u5177\u7684\u6A21\u677F\u3001\u914D\u7F6E\u4E0E\u8C03\u8BD5\u80FD\u529B\u3002"}function C(x,T=""){let $=n.toolRegistryModule?.getToolConfig(x);if(!$?.hasSubTabs||!Array.isArray($.subTabs)||$.subTabs.length===0)return"";let D=String(T||o.currentSubTab[x]||"").trim(),H=D&&$.subTabs.some(ce=>ce?.id===D)?D:$.subTabs[0]?.id||"";return H&&o.currentSubTab[x]!==H&&(o.currentSubTab[x]=H),H}function R(){let x=o.currentPopup;if(!x)return;let T=k(o.currentMainTab),$=v(o.currentMainTab),D=x.querySelector(".yyt-popup-active-label");D&&(D.textContent=`\u5F53\u524D\uFF1A${T}`);let W=x.querySelector(".yyt-shell-breadcrumb");W&&(W.textContent=T);let H=x.querySelector(".yyt-shell-main-title");H&&(H.textContent=T);let ce=x.querySelector(".yyt-shell-main-description");ce&&(ce.textContent=$)}function L(){typeof c.cleanup=="function"&&(c.cleanup(),c.cleanup=null)}function N(){Array.isArray(u.cleanups)&&(u.cleanups.forEach(x=>{typeof x=="function"&&x()}),u.cleanups=[])}function E(){Array.isArray(y.cleanups)&&(y.cleanups.forEach(x=>{typeof x=="function"&&x()}),y.cleanups=[])}function P(x,T){if(!x||!T)return!1;let $=x.jquery?x[0]:x,D=T.jquery?T[0]:T;return!!($&&D&&$===D)}function U(x={}){let{container:T=null}=x,$=p.current;if($&&!(T&&!P($.container,T))){try{typeof $.destroy=="function"&&$.destroy($.container)}catch(D){b("\u9500\u6BC1\u52A8\u6001\u9762\u677F host \u5931\u8D25",D)}n.uiModule?.uiManager?.destroyContainerInstance&&n.uiModule.uiManager.destroyContainerInstance($.container),p.current=null}}function q(x,T={}){p.current={key:T.key||"",container:x,destroy:typeof T.destroy=="function"?T.destroy:null}}function te(){let x=S();if(!x||!o.currentPopup)return;let T=n.toolRegistryModule?.getToolList()||[],$=x(o.currentPopup).find(".yyt-main-nav");if(!$.length)return;let D=T.map(H=>`
      <div class="yyt-main-nav-item ${H.id===o.currentMainTab?"active":""}" data-tab="${H.id}">
        <div class="yyt-main-nav-icon">
          <i class="fa-solid ${w(H.icon||"fa-file")}"></i>
        </div>
        <div class="yyt-main-nav-copy">
          <span class="yyt-main-nav-name">${w(H.name||H.id)}</span>
          <span class="yyt-main-nav-desc">${w(H.description||"\u8FDB\u5165\u6B64\u9875\u9762\u8FDB\u884C\u914D\u7F6E\u3001\u67E5\u770B\u6216\u7EF4\u62A4\u3002")}</span>
        </div>
      </div>
    `).join("");$.html(D),x(o.currentPopup).find(".yyt-main-nav-item").on("click",function(){let ce=x(this).data("tab");ce&&An(ce)});let W=x(o.currentPopup).find(".yyt-shell-sidebar-hint");W.length&&W.text(`${T.length} tabs`)}function ie(){let x=S();if(!x||!o.currentPopup)return;let T=n.toolRegistryModule?.getToolList()||[],$=n.toolRegistryModule?.getToolConfig("tools"),D=Array.isArray($?.subTabs)?$.subTabs:[],W=D.filter(de=>de?.isCustom).length,H=D.filter(de=>!de?.isCustom).length,ne=x(o.currentPopup).find(".yyt-shell-sidebar-stats");ne.length&&(ne.find(".yyt-shell-sidebar-stat").eq(0).find(".yyt-shell-sidebar-stat-value").text(String(T.length)),ne.find(".yyt-shell-sidebar-stat").eq(1).find(".yyt-shell-sidebar-stat-value").text(String(H)),ne.find(".yyt-shell-sidebar-stat").eq(2).find(".yyt-shell-sidebar-stat-value").text(String(W)))}function Q(){let x=n.toolRegistryModule?.getToolList()||[];return x.length?(x.some(T=>T.id===o.currentMainTab)||(o.currentMainTab=x[0].id),o.currentMainTab):null}async function we(x={}){let{rebuildNavigation:T=!1,reRenderSubNav:$=!1}=x,D=S();if(!D||!o.currentPopup)return;U();let W=Q();if(!W)return;T&&(te(),ie());let H=n.toolRegistryModule?.getToolConfig(W),ce=!!H?.hasSubTabs,ne=D(o.currentPopup).find(".yyt-sub-nav"),de=D(o.currentPopup).find(".yyt-content-inner");if(T&&de.length){let Ke=new Set(de.find(".yyt-tab-content").map((ve,ft)=>D(ft).data("tab")).get());(n.toolRegistryModule?.getToolList()||[]).forEach(ve=>{Ke.has(ve.id)||de.append(`<div class="yyt-tab-content" data-tab="${w(ve.id)}"></div>`)}),de.find(".yyt-tab-content").each((ve,ft)=>{let Gt=D(ft).data("tab");(n.toolRegistryModule?.getToolList()||[]).some(cr=>cr.id===Gt)||D(ft).remove()})}D(o.currentPopup).find(".yyt-main-nav-item").removeClass("active"),D(o.currentPopup).find(`.yyt-main-nav-item[data-tab="${W}"]`).addClass("active"),D(o.currentPopup).find(".yyt-tab-content").removeClass("active"),D(o.currentPopup).find(`.yyt-tab-content[data-tab="${W}"]`).addClass("active"),ce?(ne.show(),($||T)&&fs(W,H.subTabs)):ne.hide(),await Fr(W),R(),rt()}function Pe(){if(!o.currentPopup)return;N();let x=()=>{if(o.currentMainTab==="presetManagement"){we();return}o.currentMainTab==="tools"&&we({reRenderSubNav:!0})},T=()=>{o.currentMainTab==="tools"?we({rebuildNavigation:!0,reRenderSubNav:!0}):ie()},$=()=>{o.currentMainTab==="tools"&&we({rebuildNavigation:!1,reRenderSubNav:!1})},D=()=>{(o.currentMainTab==="bypass"||o.currentMainTab==="tools")&&we({reRenderSubNav:o.currentMainTab==="tools"})};[F.PRESET_CREATED,F.PRESET_UPDATED,F.PRESET_DELETED].forEach(W=>{u.cleanups.push(G.on(W,x))}),[F.TOOL_REGISTERED,F.TOOL_UPDATED,F.TOOL_UNREGISTERED].forEach(W=>{u.cleanups.push(G.on(W,T))}),u.cleanups.push(G.on(F.TOOL_RUNTIME_UPDATED,$)),[F.BYPASS_PRESET_CREATED,F.BYPASS_PRESET_UPDATED,F.BYPASS_PRESET_DELETED].forEach(W=>{u.cleanups.push(G.on(W,D))})}function J(x){return!!x?.closest?.(["input","textarea","select","button","a","label","summary","details",'[contenteditable="true"]',".yyt-dialog",".yyt-select-dropdown",".yyt-select-portal-layer"].join(","))}function qe(x){let T=x?.closest?.(["textarea",".yyt-preview-pre",".yyt-select-dropdown",".yyt-select-portal-layer",".yyt-dialog-body",".yyt-worldbook-list",".yyt-tool-panel",".yyt-panel-section"].join(","));return T?T.scrollHeight>T.clientHeight+2||T.scrollWidth>T.clientWidth+2:!1}function _e(x,T){return T?.closest?.(".yyt-scrollable-surface")===x}function ze(x,T){if(!x||!T)return null;let $=T.closest?.([".yyt-worldbook-list",".yyt-select-dropdown",".yyt-select-portal-layer",".yyt-dialog-body",".yyt-preview-pre",".yyt-tool-panel",".yyt-panel-section"].join(","));return $&&($.classList?.contains("yyt-select-portal-layer")||x.contains($))&&($.scrollHeight>$.clientHeight+2||$.scrollWidth>$.clientWidth+2)?$:[T.closest?.(".yyt-tool-list"),T.closest?.(".yyt-settings-content"),T.closest?.(".yyt-sub-content"),T.closest?.(".yyt-tab-content.active"),x].filter(Boolean).find(W=>W!==x&&!x.contains(W)?!1:W.scrollHeight>W.clientHeight+2||W.scrollWidth>W.clientWidth+2)||x}function Xe({mainTab:x=null,includeSubContent:T=!1}={}){let $=o.currentPopup;if(!$)return;let D=$.querySelector(".yyt-content");D&&(D.scrollTop=0,D.scrollLeft=0);let W=x?`.yyt-tab-content[data-tab="${x}"]`:".yyt-tab-content.active",H=$.querySelector(W);if(H&&(H.scrollTop=0,H.scrollLeft=0),!T)return;(H?.querySelectorAll(".yyt-sub-content")||[]).forEach(ne=>{ne.scrollTop=0,ne.scrollLeft=0})}function En(x){let T=_();if(!x||!T)return;x.classList.add("yyt-scrollable-surface");let $=!1,D=!1,W=0,H=0,ce=0,ne=0,de=!1,Ke=!1,ve=()=>{$=!1,D=!1,x.classList.remove("yyt-scroll-dragging")},ft=ee=>{ee.button===0&&(J(ee.target)||_e(x,ee.target)&&(de=x.scrollWidth>x.clientWidth+2,Ke=x.scrollHeight>x.clientHeight+2,!(!de&&!Ke)&&(ee.stopPropagation(),$=!0,D=!1,W=ee.clientX,H=ee.clientY,ce=x.scrollLeft,ne=x.scrollTop)))},Gt=ee=>{if(!$)return;let Tt=ee.clientX-W,it=ee.clientY-H;!(Math.abs(Tt)>4||Math.abs(it)>4)&&!D||(D=!0,x.classList.add("yyt-scroll-dragging"),de&&(x.scrollLeft=ce-Tt),Ke&&(x.scrollTop=ne-it),ee.preventDefault())},cr=()=>{ve()},Wr=ee=>{if(ee.ctrlKey||qe(ee.target)||!x.classList.contains("yyt-content")&&!_e(x,ee.target))return;let it=ze(x,ee.target);!it||it!==x&&!x.contains(it)||!(it.scrollHeight>it.clientHeight+2||it.scrollWidth>it.clientWidth+2)||(Math.abs(ee.deltaY)>0&&(it.scrollTop+=ee.deltaY),Math.abs(ee.deltaX)>0&&(it.scrollLeft+=ee.deltaX),ee.preventDefault(),ee.stopPropagation())},gt=ee=>{D&&ee.preventDefault()};x.addEventListener("mousedown",ft),x.addEventListener("wheel",Wr,{passive:!1}),x.addEventListener("dragstart",gt),T.addEventListener("mousemove",Gt),T.addEventListener("mouseup",cr),y.cleanups.push(()=>{ve(),x.classList.remove("yyt-scrollable-surface"),x.removeEventListener("mousedown",ft),x.removeEventListener("wheel",Wr),x.removeEventListener("dragstart",gt),T.removeEventListener("mousemove",Gt),T.removeEventListener("mouseup",cr)})}function rt(){let x=o.currentPopup;if(!x)return;E();let T=[...x.querySelectorAll(".yyt-shell-sidebar .yyt-main-nav"),...x.querySelectorAll(".yyt-sub-nav"),...x.querySelectorAll(".yyt-content"),...x.querySelectorAll(".yyt-settings-content"),...x.querySelectorAll(".yyt-tool-list")];[...new Set(T)].forEach(En)}function ys(x){return`
      <div class="yyt-startup-screen" data-yyt-startup-screen>
        <div class="yyt-startup-screen-inner">
          <div class="yyt-startup-screen-kicker">Welcome</div>
          <div class="yyt-startup-screen-title">YouYou \u5DE5\u5177\u7BB1</div>
          <div class="yyt-startup-screen-desc">\u96C6\u4E2D\u7BA1\u7406 API \u9884\u8BBE\u3001\u81EA\u5B9A\u4E49\u5DE5\u5177\u3001\u63D0\u53D6\u89C4\u5219\u3001Ai\u6307\u4EE4\u9884\u8BBE\u4E0E\u8BCA\u65AD\u6D41\u7A0B\u3002\u6BCF\u6B21\u5237\u65B0\u540E\u90FD\u4F1A\u91CD\u65B0\u663E\u793A\uFF0C\u4FBF\u4E8E\u5FEB\u901F\u56DE\u5230\u4ECB\u7ECD\u5165\u53E3\u3002</div>
          <div class="yyt-startup-screen-modules">
            ${(x||[]).slice(0,6).map($=>`
      <div class="yyt-startup-module-chip">
        <i class="fa-solid ${w($.icon||"fa-file")}"></i>
        <span>${w($.name||$.id)}</span>
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
    `}function mo(x){let T=S();if(!T||!o.currentPopup||o.startupScreenDismissed)return;let $=T(o.currentPopup).find(".yyt-popup-body"),D=$.find(".yyt-popup-shell");!$.length||!D.length||$.find("[data-yyt-startup-screen]").length||(D.attr("data-yyt-startup-visible","true"),$.prepend(ys(x)),$.find(".yyt-startup-enter").on("click",()=>{$.find("[data-yyt-startup-screen]").remove(),D.removeAttr("data-yyt-startup-visible"),o.startupScreenDismissed=!0,rt()}))}function ho(){let x=_(),T=o.currentPopup,$=T?.querySelector(".yyt-popup-header");if(!T||!$||!x)return;let D=!1,W=0,H=0,ce=0,ne=0,de="",Ke=()=>({width:r.innerWidth||x.documentElement?.clientWidth||window.innerWidth||0,height:r.innerHeight||x.documentElement?.clientHeight||window.innerHeight||0}),ve=(gt,ee,Tt)=>Math.min(Math.max(gt,ee),Tt),ft=()=>{D&&(D=!1,T.classList.remove("yyt-popup-dragging"),x.body.style.userSelect=de)},Gt=gt=>{if(!D||!o.currentPopup)return;let ee=gt.clientX-W,Tt=gt.clientY-H,{width:it,height:Il}=Ke(),Nx=T.offsetWidth||0,$x=T.offsetHeight||0,Ox=Math.max(0,it-Nx),Lx=Math.max(0,Il-$x);T.style.left=`${ve(ce+ee,0,Ox)}px`,T.style.top=`${ve(ne+Tt,0,Lx)}px`,T.style.transform="none",T.style.right="auto",T.style.bottom="auto"},cr=()=>{ft()},Wr=gt=>{if(gt.button!==0||gt.target?.closest(".yyt-popup-close"))return;D=!0,W=gt.clientX,H=gt.clientY;let ee=T.getBoundingClientRect();ce=ee.left,ne=ee.top,T.style.left=`${ee.left}px`,T.style.top=`${ee.top}px`,T.style.transform="none",T.style.right="auto",T.style.bottom="auto",T.classList.add("yyt-popup-dragging"),de=x.body.style.userSelect||"",x.body.style.userSelect="none",gt.preventDefault()};$.addEventListener("mousedown",Wr),x.addEventListener("mousemove",Gt),x.addEventListener("mouseup",cr),c.cleanup=()=>{ft(),$.removeEventListener("mousedown",Wr),x.removeEventListener("mousemove",Gt),x.removeEventListener("mouseup",cr)}}function er(){U(),L(),N(),E();let x=S();if(x&&o.currentPopup){let T=x(o.currentPopup);Lt(T,"yytPopupToolConfigSelect"),Lt(T,"yytPromptEditorSelect")}o.currentPopup&&(o.currentPopup.remove(),o.currentPopup=null),o.currentOverlay&&(o.currentOverlay.remove(),o.currentOverlay=null),h("\u5F39\u7A97\u5DF2\u5173\u95ED")}function An(x){U(),o.currentMainTab=x;let T=S();if(!T||!o.currentPopup)return;Xe({mainTab:x,includeSubContent:!0}),T(o.currentPopup).find(".yyt-main-nav-item").removeClass("active"),T(o.currentPopup).find(`.yyt-main-nav-item[data-tab="${x}"]`).addClass("active");let $=n.toolRegistryModule?.getToolConfig(x);$?.hasSubTabs?(T(o.currentPopup).find(".yyt-sub-nav").show(),fs(x,$.subTabs)):T(o.currentPopup).find(".yyt-sub-nav").hide(),T(o.currentPopup).find(".yyt-tab-content").removeClass("active"),T(o.currentPopup).find(`.yyt-tab-content[data-tab="${x}"]`).addClass("active"),Fr(x),R(),rt()}function Cn(x,T){U(),o.currentSubTab[x]=T;let $=S();!$||!o.currentPopup||(Xe({mainTab:x,includeSubContent:!0}),$(o.currentPopup).find(".yyt-sub-nav-item").removeClass("active"),$(o.currentPopup).find(`.yyt-sub-nav-item[data-subtab="${T}"]`).addClass("active"),kn(x,T),R(),rt())}function fs(x,T){let $=S();if(!$||!o.currentPopup||!T)return;let D=C(x,o.currentSubTab[x]||T[0]?.id),H=(x==="tools"?[{key:"ai",title:"AI \u5DE5\u5177",items:T.filter(ne=>!ne?.isCustom&&(ne?.toolKind||"ai")!=="script")},{key:"script",title:"\u811A\u672C\u5DE5\u5177",items:T.filter(ne=>!ne?.isCustom&&ne?.toolKind==="script")},{key:"custom",title:"\u81EA\u5B9A\u4E49\u5DE5\u5177",items:T.filter(ne=>ne?.isCustom===!0)}].filter(ne=>ne.items.length>0):[{key:"default",title:"",items:T}]).map(ne=>{let de=ne.title?`<div class="yyt-sub-nav-group-title">${w(ne.title)}</div>`:"",Ke=ne.items.map(ve=>{let ft=ve?.isCustom===!0,Gt=x==="tools"&&ft?`<div class="yyt-sub-nav-item-actions">
               <button type="button" class="yyt-sub-nav-item-action" data-action="edit" data-subtab="${ve.id}" title="\u7F16\u8F91"><i class="fa-solid fa-pen"></i></button>
               <button type="button" class="yyt-sub-nav-item-action" data-action="delete" data-subtab="${ve.id}" title="\u5220\u9664"><i class="fa-solid fa-trash"></i></button>
             </div>`:"";return`
        <div class="yyt-sub-nav-item ${ve.id===D?"active":""}" data-subtab="${ve.id}" data-tool-name="${w((ve.name||ve.id).toLowerCase())}">
          <i class="fa-solid ${ve.icon||"fa-file"}"></i>
          <span class="yyt-sub-nav-item-label">${w(ve.name||ve.id)}</span>
          ${Gt}
        </div>
      `}).join("");return`
        <div class="yyt-sub-nav-group yyt-sub-nav-group-${ne.key}">
          ${de}
          <div class="yyt-sub-nav-group-items">
            ${Ke}
          </div>
        </div>
      `}).join(""),ce=x==="tools"?`<div class="yyt-sub-nav-toolbar">
           <button type="button" class="yyt-sub-nav-toolbar-btn" data-tool-action="add" title="\u65B0\u5EFA\u81EA\u5B9A\u4E49\u5DE5\u5177"><i class="fa-solid fa-plus"></i><span>\u65B0\u5EFA</span></button>
           <button type="button" class="yyt-sub-nav-toolbar-btn" data-tool-action="import" title="\u4ECE JSON \u5BFC\u5165\u5DE5\u5177"><i class="fa-solid fa-file-import"></i></button>
           <button type="button" class="yyt-sub-nav-toolbar-btn" data-tool-action="export" title="\u5BFC\u51FA\u5DE5\u5177 JSON"><i class="fa-solid fa-file-export"></i></button>
         </div>
         <div class="yyt-sub-nav-filter-wrap">
           <input type="text" class="yyt-sub-nav-filter" placeholder="\u7B5B\u9009\u5DE5\u5177\u2026" autocomplete="off">
         </div>`:"";$(o.currentPopup).find(".yyt-sub-nav").html(ce+H),$(o.currentPopup).find(".yyt-sub-nav-item").on("click",function(de){if(de.target.closest&&de.target.closest(".yyt-sub-nav-item-action"))return;let Ke=$(this).data("subtab");Cn(x,Ke)}),x==="tools"&&bo(x),rt()}function Pa(x){if(!o.currentPopup)return;let T=S();if(!T)return;let $=String(x||"").trim().toLowerCase();T(o.currentPopup).find(".yyt-sub-nav-item").each(function(){let W=String(T(this).data("tool-name")||"");T(this).toggle(!$||W.includes($))}),T(o.currentPopup).find(".yyt-sub-nav-group").each(function(){let W=T(this).find(".yyt-sub-nav-item:visible").length>0;T(this).toggle(W)})}function bo(x){let T=S();if(!T||!o.currentPopup)return;let $=T(o.currentPopup).find(".yyt-sub-nav");$.find(".yyt-sub-nav-filter").off("input.yytFilter").on("input.yytFilter",function(){Pa(this.value)}),$.find(".yyt-sub-nav-toolbar-btn").off("click.yytToolAction").on("click.yytToolAction",async function(D){D.preventDefault(),D.stopPropagation();let W=T(this).data("tool-action");try{let H=await Promise.resolve().then(()=>(sp(),np));if(W==="add"){let ce=await H.showToolEditDialog(null);ce&&(o.currentSubTab[x]=ce,Cn(x,ce))}else W==="import"?await H.showImportToolsDialog():W==="export"&&H.showExportToolsDialog()}catch(H){b("\u5DE5\u5177\u64CD\u4F5C\u5931\u8D25",H)}}),$.find(".yyt-sub-nav-item-action").off("click.yytItemAction").on("click.yytItemAction",async function(D){D.preventDefault(),D.stopPropagation();let W=T(this).data("action"),H=String(T(this).data("subtab")||"");if(H)try{let ce=await Promise.resolve().then(()=>(sp(),np));W==="edit"?await ce.showToolEditDialog(H):W==="delete"&&await ce.confirmDeleteTool(H)&&o.currentSubTab[x]===H&&(o.currentSubTab[x]="")}catch(ce){b("\u5DE5\u5177\u884C\u5185\u64CD\u4F5C\u5931\u8D25",ce)}})}async function Fr(x){let T=S();if(!T||!o.currentPopup)return;let $=T(o.currentPopup).find(`.yyt-tab-content[data-tab="${x}"]`);if(!$.length)return;if(n.toolRegistryModule?.getToolConfig(x)?.hasSubTabs){let H=C(x);H?await kn(x,H):$.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5B50 tab \u914D\u7F6E\u52A0\u8F7D\u5931\u8D25</span></div>'),rt();return}await n.uiModule?.renderMainTab?.(x,$)||In(x,$),rt()}async function kn(x,T){let $=S();if(!$||!o.currentPopup)return;let D=$(o.currentPopup).find(`.yyt-tab-content[data-tab="${x}"]`);if(!D.length)return;let W=n.toolRegistryModule?.getToolConfig(x);if(W?.hasSubTabs){let ce=C(x,T),ne=W.subTabs?.find(ft=>ft.id===ce),de=D.find(".yyt-sub-content");if(de.length||(D.html('<div class="yyt-sub-content"></div>'),de=D.find(".yyt-sub-content")),!ne){de.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5F53\u524D\u5B50\u9875\u9762\u4E0D\u5B58\u5728\u6216\u5DF2\u5931\u6548</span></div>'),Xe({mainTab:x,includeSubContent:!0}),rt();return}let Ke=ne.component;if(Ke==="GenericToolConfigPanel"){await Na(ne,de),Xe({mainTab:x,includeSubContent:!0}),rt();return}U({container:de});let ve=await n.uiModule?.renderSubTabComponent?.(Ke,de);ve?q(de,{key:ve}):de.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-tools"></i><span>\u529F\u80FD\u5F00\u53D1\u4E2D...</span></div>'),Xe({mainTab:x,includeSubContent:!0}),rt();return}let H=D.find(".yyt-sub-content");if(H.length){switch(U({container:H}),T){case"config":_x(x,H);break;case"prompts":await Ex(x,H);break;case"presets":Ax(x,H);break;default:H.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-tools"></i><span>\u529F\u80FD\u5F00\u53D1\u4E2D...</span></div>')}Xe({mainTab:x,includeSubContent:!0}),rt()}}async function Na(x,T){if(!(!S()||!T?.length||!x?.id)){U({container:T});try{let D=s.dynamicToolPanelCache.get(x.id);if(!D){let ce=(await Promise.resolve().then(()=>(eo(),nm)))?.createToolConfigPanel;if(typeof ce!="function")throw new Error("\u901A\u7528\u5DE5\u5177\u9762\u677F\u5DE5\u5382\u4E0D\u53EF\u7528");D=()=>ce({id:`${x.id}Panel`,toolId:x.id,postResponseHint:`\u70B9\u51FB\u201C\u7ACB\u5373\u6267\u884C\u4E00\u6B21\u201D\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u6267\u884C\u201C${x.name||x.id}\u201D\u3002`,extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 custom_tag
\u6216 regex:<custom_tag>([\\s\\S]*?)</custom_tag>`,previewDialogId:`${x.id}-extraction-preview`,previewTitle:`${x.name||x.id} \u63D0\u53D6\u9884\u89C8`}),s.dynamicToolPanelCache.set(x.id,D)}let W=D();W.renderTo(T),q(T,{key:x.id,destroy:typeof W?.destroy=="function"?H=>W.destroy(H):null}),rt()}catch(D){p.current=null,b("\u81EA\u5B9A\u4E49\u5DE5\u5177\u9762\u677F\u52A0\u8F7D\u5931\u8D25:",D),T.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u81EA\u5B9A\u4E49\u5DE5\u5177\u9762\u677F\u52A0\u8F7D\u5931\u8D25</span></div>')}}}function In(x,T){if(!S())return;let D=n.toolRegistryModule?.getToolConfig(x);if(!D){T.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5DE5\u5177\u914D\u7F6E\u4E0D\u5B58\u5728</span></div>');return}let W=o.currentSubTab[x]||D.subTabs?.[0]?.id||"config";T.html(`
      <div class="yyt-tool-window">
        <div class="yyt-sub-content" data-subtab="${W}">
          <!-- \u5B50\u5185\u5BB9\u5C06\u5728\u6B64\u6E32\u67D3 -->
        </div>
      </div>
    `),kn(x,W)}function _x(x,T){if(!S())return;let D=n.toolManagerModule?.getTool(x),W=n.presetManagerModule?.getAllPresets()||[],H=n.toolRegistryModule?.getToolApiPreset(x)||"",ce=W.map(ne=>`<option value="${w(ne.name)}" ${ne.name===H?"selected":""}>${w(ne.name)}</option>`).join("");T.html(`
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
              ${ce}
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
              <input type="number" class="yyt-input" id="yyt-tool-timeout" value="${D?.config?.execution?.timeout||6e4}">
            </div>
            <div class="yyt-form-group yyt-flex-1">
              <label>\u91CD\u8BD5\u6B21\u6570</label>
              <input type="number" class="yyt-input" id="yyt-tool-retries" value="${D?.config?.execution?.retries||3}">
            </div>
          </div>
        </div>
      </div>
    `),pr(T,{namespace:"yytPopupToolConfigSelect",selectors:["#yyt-tool-api-preset"]}),T.find("#yyt-save-tool-preset").on("click",function(){let de=T.find("#yyt-tool-api-preset").val();n.toolRegistryModule?.setToolApiPreset(x,de),d.info("API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u4FDD\u5B58",null,{toast:"success"})})}async function Ex(x,T){if(!S()){T.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u63D0\u793A\u8BCD\u7F16\u8F91\u5668\u6A21\u5757\u672A\u52A0\u8F7D</span></div>');return}let W=n.toolManagerModule?.getTool(x)?.config?.messages||[],H=wx(W)||Ra,ce=new Al({containerId:`yyt-prompt-editor-${x}`,segments:H,onChange:de=>{let Ke=xx(de);h("\u63D0\u793A\u8BCD\u5DF2\u66F4\u65B0:",Ke.length,"\u6761\u6D88\u606F")}});T.html(`<div id="yyt-prompt-editor-${x}" class="yyt-prompt-editor-container"></div>`),ce.init(T.find(`#yyt-prompt-editor-${x}`));let ne=bx();if(ne){let de="yyt-prompt-editor-styles",Ke=r.document||document;if(!Ke.getElementById(de)){let ve=Ke.createElement("style");ve.id=de,ve.textContent=ne,(Ke.head||Ke.documentElement).appendChild(ve)}}}function Ax(x,T){S()&&T.html(`
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
    `)}function Cx(){return`
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
      </div>`}function kx(x,T,$){let D=g(),W=x.map(H=>`
      <div class="yyt-main-nav-item ${H.id===o.currentMainTab?"active":""}" data-tab="${H.id}">
        <div class="yyt-main-nav-icon">
          <i class="fa-solid ${w(H.icon||"fa-file")}"></i>
        </div>
        <div class="yyt-main-nav-copy">
          <span class="yyt-main-nav-name">${w(H.name||H.id)}</span>
          <span class="yyt-main-nav-desc">${w(H.description||"\u8FDB\u5165\u6B64\u9875\u9762\u8FDB\u884C\u914D\u7F6E\u3001\u67E5\u770B\u6216\u7EF4\u62A4\u3002")}</span>
        </div>
      </div>
    `).join("");return`
      <aside class="yyt-shell-sidebar${D?" yyt-collapsed":""}">
        <div class="yyt-shell-sidebar-card">
          <div class="yyt-shell-sidebar-title-row">
            <span class="yyt-shell-sidebar-title">\u9875\u9762\u5BFC\u822A</span>
            <span class="yyt-shell-sidebar-hint">${x.length} tabs</span>
            <button class="yyt-sidebar-toggle" title="${D?"\u5C55\u5F00\u4FA7\u680F":"\u6298\u53E0\u4FA7\u680F"}">
              <i class="fa-solid ${D?"fa-angles-right":"fa-angles-left"}"></i>
            </button>
          </div>
          <div class="yyt-main-nav">
            ${W}
          </div>
          <div class="yyt-shell-sidebar-note">
            \u4FDD\u5B58\u540E\uFF0C\u624B\u52A8\u6267\u884C\u4E0E\u5199\u56DE\u94FE\u90FD\u4F1A\u4EE5\u6700\u65B0\u914D\u7F6E\u4E3A\u51C6\u3002
          </div>
          <div class="yyt-shell-sidebar-stats">
            <div class="yyt-shell-sidebar-stat">
              <span class="yyt-shell-sidebar-stat-value">${x.length}</span>
              <span class="yyt-shell-sidebar-stat-label">\u4E3B\u9875\u9762</span>
            </div>
            <div class="yyt-shell-sidebar-stat">
              <span class="yyt-shell-sidebar-stat-value">${T}</span>
              <span class="yyt-shell-sidebar-stat-label">\u9ED8\u8BA4\u5DE5\u5177</span>
            </div>
            <div class="yyt-shell-sidebar-stat">
              <span class="yyt-shell-sidebar-stat-value">${$}</span>
              <span class="yyt-shell-sidebar-stat-label">\u81EA\u5B9A\u4E49\u5DE5\u5177</span>
            </div>
          </div>
        </div>
      </aside>`}function Ix(x,T){return`
      <div class="yyt-shell-main-header">
        <div class="yyt-shell-main-heading-block">
          <div class="yyt-shell-main-title">${w(x)}</div>
          <div class="yyt-shell-main-description">${w(T)}</div>
        </div>
        <div class="yyt-shell-main-actions">
          <div class="yyt-shell-main-meta">
            <i class="fa-solid fa-circle-info"></i>
            <span>\u4FDD\u5B58\u540E\u6267\u884C\u94FE\u4F1A\u7ACB\u5373\u4F7F\u7528\u6700\u65B0\u914D\u7F6E</span>
          </div>
        </div>
      </div>`}function Rx(x,T){return x.map($=>`
      <div class="yyt-tab-content ${$.id===T?"active":""}" data-tab="${$.id}">
      </div>
    `).join("")}function Mx(x){return`
      <div class="yyt-popup-footer">
        <div class="yyt-popup-footer-left">
          <div class="yyt-popup-status-cluster">
            <div class="yyt-popup-status">
              <i class="fa-solid fa-compass"></i>
              <span class="yyt-popup-active-label">\u5F53\u524D\uFF1A${w(x)}</span>
            </div>
            <div class="yyt-popup-footer-note">
              API\u3001\u5DE5\u5177\u3001\u63D0\u53D6\u4E0E\u8BCA\u65AD\u7EDF\u4E00\u5165\u53E3\u3002
            </div>
          </div>
        </div>
      </div>`}async function Px(){if(o.currentPopup){h("\u5F39\u7A97\u5DF2\u5B58\u5728");return}let x=t?.services?.loadModules;typeof x=="function"&&await x();let T=S(),$=_();if(!T){b("jQuery \u672A\u627E\u5230\uFF0C\u65E0\u6CD5\u521B\u5EFA\u5F39\u7A97");return}let D=n.toolRegistryModule?.getToolList()||[];if(!D.length){b("\u5DE5\u5177\u5217\u8868\u4E3A\u7A7A\uFF0C\u65E0\u6CD5\u521B\u5EFA\u5F39\u7A97");return}D.some(ee=>ee.id===o.currentMainTab)||(o.currentMainTab=D[0].id);let W=n.toolRegistryModule?.getToolConfig("tools"),H=Array.isArray(W?.subTabs)?W.subTabs:[],ce=H.filter(ee=>ee?.isCustom).length,ne=H.filter(ee=>!ee?.isCustom).length,de=k(o.currentMainTab),Ke=v(o.currentMainTab);o.currentOverlay=$.createElement("div"),o.currentOverlay.className="yyt-popup-overlay",o.currentOverlay.addEventListener("click",ee=>{ee.target===o.currentOverlay&&er()}),$.body.appendChild(o.currentOverlay);let ve=g(),ft=`
      <div class="yyt-popup" id="${l}">
        ${Cx()}
        <div class="yyt-popup-body">
          <div class="yyt-popup-shell">
            <div class="yyt-shell-workspace${ve?" yyt-sidebar-collapsed":""}">
              ${kx(D,ne,ce)}
              <section class="yyt-shell-main">
                ${Ix(de,Ke)}
                <div class="yyt-sub-nav" style="display: none;"></div>
                <div class="yyt-content-frame">
                  <div class="yyt-content">
                    <div class="yyt-content-inner">
                      ${Rx(D,o.currentMainTab)}
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
        ${Mx(de)}
      </div>
    `,Gt=$.createElement("div");Gt.innerHTML=ft,o.currentPopup=Gt.firstElementChild,$.body.appendChild(o.currentPopup),T(o.currentPopup).find(".yyt-popup-close").on("click",er),T(o.currentPopup).find(".yyt-sidebar-toggle").on("click",m);let cr=ee=>{ee.key==="Escape"&&($.querySelector(".yyt-dialog-overlay")||$.querySelector(".yyt-twb-editor-drawer.is-open")||(ee.stopPropagation(),er()))},Wr=ee=>{if(!(ee.ctrlKey||ee.metaKey)||ee.key!=="s"||!o.currentPopup)return;ee.preventDefault(),ee.stopPropagation();let Tt=T(o.currentPopup),it=Tt.find("#yyt-bypass-save:visible").first()||Tt.find(`#${a}-save-api-config:visible`).first()||Tt.find("#yyt-save-tool-preset:visible").first()||Tt.find('[data-twb-action="save"]:visible').first();it?.length&&it.trigger("click")};$.addEventListener("keydown",cr),$.addEventListener("keydown",Wr),u.cleanups.push(()=>{$.removeEventListener("keydown",cr),$.removeEventListener("keydown",Wr)}),Pe(),T(o.currentPopup).find(".yyt-main-nav-item").on("click",function(){let Tt=T(this).data("tab");Tt&&An(Tt)}),ho(),Fr(o.currentMainTab);let gt=n.toolRegistryModule?.getToolConfig(o.currentMainTab);gt?.hasSubTabs&&(T(o.currentPopup).find(".yyt-sub-nav").show(),fs(o.currentMainTab,gt.subTabs)),R(),mo(D),rt(),h("\u5F39\u7A97\u5DF2\u6253\u5F00")}return{openPopup:Px,closePopup:er,switchMainTab:An,switchSubTab:Cn,renderTabContent:Fr,renderSubTabContent:kn}}function Sx(t,e={}){let{constants:r,modules:n}=t,{SCRIPT_ID:s,SCRIPT_VERSION:o}=r,{init:a,loadModules:i,addMenuItem:l,popupShell:d}=e;return{version:o,id:s,init:a,openPopup:d?.openPopup,closePopup:d?.closePopup,switchMainTab:d?.switchMainTab,switchSubTab:d?.switchSubTab,addMenuItem:l,getStorage:()=>n.storageModule,getApiConnection:()=>n.apiConnectionModule,getPresetManager:()=>n.presetManagerModule,getUi:()=>n.uiModule,getUiModule:()=>n.uiModule,getRegexExtractor:()=>n.regexExtractorModule,getToolManager:()=>n.toolManagerModule,getToolExecutor:()=>n.toolExecutorModule,getWindowManager:()=>n.windowManagerModule,getToolRegistry:()=>n.toolRegistryModule,getSettingsService:()=>n.settingsServiceModule,getBypassManager:()=>n.bypassManagerModule,getVariableResolver:()=>n.variableResolverModule,getContextInjector:()=>n.contextInjectorModule,getToolPromptService:()=>n.toolPromptServiceModule,getToolOutputService:()=>n.toolOutputServiceModule,getToolAutomationService:()=>n.toolAutomationServiceModule,getDataProvider:()=>n.toolDataProviderModule?.getCurrentProvider?.()||null,get floatingBall(){let c=n.floatingBallModule?.floatingBall;return c?{isReady:()=>c.isReady?.()||!1,registerItem:u=>c.registerItem?.(u),unregisterItem:u=>c.unregisterItem?.(u),updateItem:(u,y)=>c.updateItem?.(u,y),refresh:u=>c.refresh?.(u),setVisible:u=>c.setVisible?.(u),openMenu:()=>c.openMenu?.(),closeMenu:()=>c.closeMenu?.(),toggleMenu:u=>c.toggleMenu?.(u)}:null},async getDataProviderAsync(){return await i(),n.toolDataProviderModule?.getToolDataProvider?.()||null},async getApiConfig(){return await i(),n.apiConnectionModule?.getApiConfig?.()||null},async saveApiConfig(c){return await i(),n.apiConnectionModule?(n.apiConnectionModule.updateApiConfig(c),!0):!1},async getPresets(){return await i(),n.presetManagerModule?n.presetManagerModule.getAllPresets():[]},async sendApiRequest(c,u){if(await i(),n.apiConnectionModule)return n.apiConnectionModule.sendApiRequest(c,u);throw new Error("API\u6A21\u5757\u672A\u52A0\u8F7D")},async testApiConnection(){return await i(),n.apiConnectionModule?n.apiConnectionModule.testApiConnection():{success:!1,message:"API\u6A21\u5757\u672A\u52A0\u8F7D"}},registerTool(c,u){return n.toolRegistryModule?.registerTool(c,u)||!1},unregisterTool(c){return n.toolRegistryModule?.unregisterTool(c)||!1},getToolList(){return n.toolRegistryModule?.getToolList()||[]},createWindow(c){return n.windowManagerModule?.createWindow(c)||null},closeWindow(c){n.windowManagerModule?.closeWindow(c)},startAutomation(){return n.toolAutomationServiceModule?.toolAutomationService?.init?.()||!1},stopAutomation(){n.toolAutomationServiceModule?.toolAutomationService?.stop?.()},getAutomationRuntime(){return n.toolAutomationServiceModule?.toolAutomationService?.getRuntimeSnapshot?.()||null},cancelAutomation(c={}){return n.toolAutomationServiceModule?.toolAutomationService?.cancelAutomation?.(c)||{success:!1,error:"\u81EA\u52A8\u5316\u670D\u52A1\u672A\u52A0\u8F7D"}},async processCurrentAssistantMessage(c={}){return n.toolAutomationServiceModule?.toolAutomationService?.processCurrentAssistantMessage?.(c)||{success:!1,error:"\u81EA\u52A8\u5316\u670D\u52A1\u672A\u52A0\u8F7D"}}}}var Cl="youyou_toolkit",sC="1.0.252",oC=`${Cl}-menu-item`,aC=`${Cl}-menu-container`,iC=`${Cl}-popup`,lC=typeof window.parent<"u"?window.parent:window,kl={constants:{SCRIPT_ID:Cl,SCRIPT_VERSION:sC,MENU_ITEM_ID:oC,MENU_CONTAINER_ID:aC,POPUP_ID:iC},topLevelWindow:lC,modules:{storageModule:null,apiConnectionModule:null,uiModule:null,presetManagerModule:null,regexExtractorModule:null,toolManagerModule:null,toolExecutorModule:null,toolTriggerModule:null,windowManagerModule:null,toolRegistryModule:null,settingsServiceModule:null,bypassManagerModule:null,variableResolverModule:null,contextInjectorModule:null,toolPromptServiceModule:null,toolOutputServiceModule:null,toolAutomationServiceModule:null,toolDataProviderModule:null,floatingBallModule:null},caches:{dynamicToolPanelCache:new Map},services:{loadModules:null},uiState:{currentPopup:null,currentOverlay:null,currentMainTab:"presetManagement",currentSubTab:{},startupScreenDismissed:!1}},Tx=vx(kl),Ma=hx(kl,{openPopup:Tx.openPopup});kl.services.loadModules=Ma.loadModules;var op=Sx(kl,{init:Ma.init,loadModules:Ma.loadModules,addMenuItem:Ma.addMenuItem,popupShell:Tx});if(typeof window<"u"&&(window.YouYouToolkit=op,typeof window.parent<"u"&&window.parent!==window))try{window.parent.YouYouToolkit=op}catch{}var z5=op;Ma.init();Promise.resolve().then(()=>(Y(),ip)).then(({logger:t})=>{t.createScope("Bootstrap").log("\u6A21\u5757\u52A0\u8F7D\u5B8C\u6210")});export{z5 as default};
