var mw=Object.defineProperty;var O=(t,e)=>()=>(t&&(e=t(t=0)),e);var ge=(t,e)=>{for(var r in e)mw(t,r,{get:e[r],enumerable:!0})};var W,jl,G,ct=O(()=>{W={STORAGE_CHANGED:"storage:changed",STORAGE_CLEARED:"storage:cleared",PRESET_CREATED:"preset:created",PRESET_UPDATED:"preset:updated",PRESET_DELETED:"preset:deleted",PRESET_ACTIVATED:"preset:activated",PRESET_IMPORTED:"preset:imported",PRESET_EXPORTED:"preset:exported",API_CONFIG_UPDATED:"api:configUpdated",API_REQUEST_START:"api:requestStart",API_REQUEST_SUCCESS:"api:requestSuccess",API_REQUEST_ERROR:"api:requestError",API_CONNECTION_TESTED:"api:connectionTested",TOOL_REGISTERED:"tool:registered",TOOL_UNREGISTERED:"tool:unregistered",TOOL_UPDATED:"tool:updated",TOOL_RUNTIME_UPDATED:"tool:runtimeUpdated",TOOL_ENABLED:"tool:enabled",TOOL_DISABLED:"tool:disabled",TOOL_EXECUTING:"tool:executing",TOOL_EXECUTED:"tool:executed",TOOL_ERROR:"tool:error",TOOL_EXECUTION_STARTED:"tool:executionStarted",TOOL_EXECUTION_FAILED:"tool:executionFailed",REGEX_RULE_ADDED:"regex:ruleAdded",REGEX_RULE_UPDATED:"regex:ruleUpdated",REGEX_RULE_DELETED:"regex:ruleDeleted",REGEX_RULES_CLEARED:"regex:rulesCleared",REGEX_PRESET_LOADED:"regex:presetLoaded",REGEX_EXTRACTED:"regex:extracted",UI_INITIALIZED:"ui:initialized",UI_RENDER_REQUESTED:"ui:renderRequested",UI_TAB_CHANGED:"ui:tabChanged",UI_SUBTAB_CHANGED:"ui:subTabChanged",UI_POPUP_OPENED:"ui:popupOpened",UI_POPUP_CLOSED:"ui:popupClosed",UI_WINDOW_CREATED:"ui:windowCreated",UI_WINDOW_CLOSED:"ui:windowClosed",APP_INITIALIZING:"app:initializing",APP_INITIALIZED:"app:initialized",APP_ERROR:"app:error",SETTINGS_UPDATED:"settings:updated",TOOL_CONTEXT_INJECTED:"tool:contextInjected",TOOL_CONTEXT_CLEARED:"tool:contextCleared",BYPASS_PRESET_CREATED:"bypass:presetCreated",BYPASS_PRESET_UPDATED:"bypass:presetUpdated",BYPASS_PRESET_DELETED:"bypass:presetDeleted",BYPASS_PRESET_ACTIVATED:"bypass:presetActivated",TOOL_OUTPUT_MODE_CHANGED:"tool:outputModeChanged"},jl=class{constructor(){this.listeners=new Map,this.onceCallbacks=new Map,this.history=[],this.maxHistorySize=100,this.debugMode=!1}on(e,r,n={}){if(!e||typeof r!="function")return console.warn("[EventBus] \u65E0\u6548\u7684\u4E8B\u4EF6\u6216\u56DE\u8C03"),()=>{};let{priority:s=0}=n;this.listeners.has(e)||this.listeners.set(e,new Set);let o={callback:r,priority:s};return this.listeners.get(e).add(o),this.debugMode&&console.log(`[EventBus] \u8BA2\u9605: ${e}`),()=>this.off(e,r)}off(e,r){let n=this.listeners.get(e);if(n){for(let s of n)if(s.callback===r){n.delete(s);break}this.debugMode&&console.log(`[EventBus] \u53D6\u6D88\u8BA2\u9605: ${e}`)}}emit(e,r){this.debugMode&&console.log(`[EventBus] \u53D1\u5E03: ${e}`,r),this._addToHistory(e,r);let n=this.listeners.get(e);if(!n||n.size===0)return;let s=Array.from(n).sort((o,a)=>a.priority-o.priority);for(let{callback:o}of s)try{o(r)}catch(a){console.error(`[EventBus] \u4E8B\u4EF6\u5904\u7406\u9519\u8BEF (${e}):`,a)}}once(e,r){let n=s=>{this.off(e,n),r(s)};return this.on(e,n)}wait(e,r=0){return new Promise((n,s)=>{let o=null,a=this.once(e,i=>{o&&clearTimeout(o),n(i)});r>0&&(o=setTimeout(()=>{a(),s(new Error(`\u7B49\u5F85\u4E8B\u4EF6\u8D85\u65F6: ${e}`))},r))})}hasListeners(e){let r=this.listeners.get(e);return r&&r.size>0}listenerCount(e){let r=this.listeners.get(e);return r?r.size:0}removeAllListeners(e){e?this.listeners.delete(e):this.listeners.clear()}setDebugMode(e){this.debugMode=e}_addToHistory(e,r){this.history.push({event:e,data:r,timestamp:Date.now()}),this.history.length>this.maxHistorySize&&this.history.shift()}getHistory(e){return e?this.history.filter(r=>r.event===e):[...this.history]}clearHistory(){this.history=[]}},G=new jl});var Tp={};ge(Tp,{LOG_LEVEL:()=>Se,LoggerService:()=>Fa,default:()=>hw,logger:()=>N});var Se,Sp,Fa,N,hw,J=O(()=>{ct();Se=Object.freeze({DEBUG:0,INFO:1,WARN:2,ERROR:3}),Sp=Object.freeze({[Se.DEBUG]:"DEBUG",[Se.INFO]:"INFO",[Se.WARN]:"WARN",[Se.ERROR]:"ERROR"}),Fa=class{constructor(){this._entries=[],this._maxSize=2e3,this._nextId=1,this._minLevel=Se.INFO,this._eventKey="logger:entry",this._statsEventKey="logger:statsChanged",this._pendingFlush=!1,this._toastHandler=null}_write(e,r,n,s,o){let a={id:this._nextId++,timestamp:Date.now(),level:e,scope:r,message:n,data:s};if(this._entries.push(a),this._entries.length>this._maxSize&&this._entries.shift(),this._forwardToConsole(a),this._toastHandler&&o)try{this._toastHandler(this.levelToToastType(e),n,o)}catch{}this._pendingFlush||(this._pendingFlush=!0,queueMicrotask(()=>{this._pendingFlush=!1,this._emitEntry(a)}))}_forwardToConsole(e){let r=`[${e.scope}]`;switch(e.level){case Se.DEBUG:console.debug(r,e.message,e.data??"");break;case Se.INFO:console.log(r,e.message,e.data??"");break;case Se.WARN:console.warn(r,e.message,e.data??"");break;case Se.ERROR:console.error(r,e.message,e.data??"");break}}_emitEntry(e){try{G?.emit(this._eventKey,e)}catch{}}debug(e,r,n,s){Se.DEBUG<this._minLevel||this._write(Se.DEBUG,e,r,n,s)}info(e,r,n,s){Se.INFO<this._minLevel||this._write(Se.INFO,e,r,n,s)}log(e,r,n,s){this.info(e,r,n,s)}warn(e,r,n,s){Se.WARN<this._minLevel||this._write(Se.WARN,e,r,n,s)}error(e,r,n,s){Se.ERROR<this._minLevel||this._write(Se.ERROR,e,r,n,s)}createScope(e){return{debug:(r,n,s)=>this.debug(e,r,n,s),info:(r,n,s)=>this.info(e,r,n,s),log:(r,n,s)=>this.log(e,r,n,s),warn:(r,n,s)=>this.warn(e,r,n,s),error:(r,n,s)=>this.error(e,r,n,s)}}setToastHandler(e){this._toastHandler=e}levelToToastType(e){switch(e){case Se.WARN:return"warning";case Se.ERROR:return"error";default:return"info"}}getEntries(e={}){let{level:r,scope:n,search:s,limit:o=500,offset:a=0}=e,i=this._entries;if(r!=null&&(i=i.filter(d=>d.level>=r)),n&&(i=i.filter(d=>d.scope===n)),s){let d=s.toLowerCase();i=i.filter(c=>c.scope.toLowerCase().includes(d)||c.message.toLowerCase().includes(d))}let l=i.length;return i=i.slice(a,a+o),{entries:i,total:l}}getStats(){let e={total:this._entries.length,byLevel:{DEBUG:0,INFO:0,WARN:0,ERROR:0},byScope:{}};for(let r of this._entries){let n=Sp[r.level]||"UNKNOWN";e.byLevel[n]=(e.byLevel[n]||0)+1,e.byScope[r.scope]=(e.byScope[r.scope]||0)+1}return e}setLevel(e){this._minLevel=e}getLevel(){return this._minLevel}setMaxSize(e){this._maxSize=Math.max(100,Math.min(1e4,e))}clear(){this._entries=[],this._nextId=1}levelLabel(e){return Sp[e]||"UNKNOWN"}},N=new Fa,hw=N});function er(){return typeof window.parent<"u"&&window.parent!==window&&window.parent.document?window.parent.document:document}function me(t){return typeof t!="string"?"":t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function Wa(t,e,r=3e3){e||(e=t==="error"?"\u64CD\u4F5C\u5931\u8D25":"\u64CD\u4F5C\u5B8C\u6210");let n=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(n.toastr){n.toastr[t](e,"YouYou \u5DE5\u5177\u7BB1",{timeOut:r,progressBar:!0});return}ww(t,e,r),xw.log(`[${t.toUpperCase()}] ${e}`)}function ql(t,e,r={}){e||(e=t==="error"?"\u64CD\u4F5C\u5931\u8D25":"\u64CD\u4F5C\u5B8C\u6210");let{duration:n=3500,sticky:s=!1,noticeId:o=""}=r,a=er();if(!a?.body){Wa(t,e,n);return}let i="yyt-top-notice-container",l="yyt-top-notice-styles",d=a.getElementById(i);if(d||(d=a.createElement("div"),d.id=i,d.style.cssText=`
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
    `,a.head.appendChild(h)}if(o){let h=d.querySelector(`[data-notice-id="${o}"]`);h&&h.remove()}let c={success:"\u2713",error:"!",warning:"\u2022",info:"i"},u=a.createElement("div");u.className=`yyt-top-notice yyt-top-notice--${t||"info"}`,o&&(u.dataset.noticeId=o);let y=a.createElement("span");y.className="yyt-top-notice__icon",y.textContent=c[t]||c.info;let p=a.createElement("div");p.className="yyt-top-notice__content",p.textContent=e;let g=a.createElement("button");g.className="yyt-top-notice__close",g.type="button",g.setAttribute("aria-label","\u5173\u95ED\u901A\u77E5"),g.textContent="\xD7";let m=()=>{u.style.animation="yyt-top-notice-out 0.18s ease forwards",setTimeout(()=>u.remove(),180)};g.addEventListener("click",m),u.appendChild(y),u.appendChild(p),u.appendChild(g),d.appendChild(u),s||setTimeout(m,n)}function ww(t,e,r){let n=er();if(!n)return;let s=n.getElementById("yyt-fallback-toast");s&&s.remove();let o={success:{bg:"rgba(74, 222, 128, 0.9)",border:"#22c55e"},error:{bg:"rgba(248, 113, 113, 0.9)",border:"#ef4444"},warning:{bg:"rgba(251, 191, 36, 0.9)",border:"#f59e0b"},info:{bg:"rgba(123, 183, 255, 0.9)",border:"#7bb7ff"}},a=o[t]||o.info,i=n.createElement("div");i.id="yyt-fallback-toast",i.style.cssText=`
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
  `,i.textContent=e,n.body.appendChild(i),setTimeout(()=>{i.style.animation="yyt-toast-out 0.3s ease forwards",setTimeout(()=>{i.remove()},300)},r)}function ce(){if($n)return $n;if(typeof window.parent<"u"&&window.parent!==window)try{if(window.parent.jQuery)return $n=window.parent.jQuery,$n}catch{}return window.jQuery&&($n=window.jQuery),$n}function vw(){$n=null}function ze(t){if(!t||t.length===0)return!1;let e=t[0];if(!e||e.nodeType!==1)return!1;let r=e.ownerDocument||document;return e.isConnected?r?.documentElement?.contains?r.documentElement.contains(e):!0:!1}function Xr(...t){return t.flat(1/0).flatMap(e=>String(e||"").split(/\s+/)).map(e=>e.trim()).filter(Boolean).join(" ")}function bs(t={}){return Object.entries(t).filter(([,e])=>e!=null&&e!==!1).map(([e,r])=>r===!0?e:`${e}="${me(String(r))}"`).join(" ")}function kp(t=[],e="",r=""){let n=String(e??""),s=t.find(o=>o.value===n)||t.find(o=>o.disabled!==!0)||null;return s||{value:n,label:r||n||"\u8BF7\u9009\u62E9",disabled:!1}}function Sw(t=""){return String(t||"").split(/\s+/).map(e=>e.trim()).filter(e=>e&&e!=="yyt-select"&&e!=="yyt-native-select-bridge")}function Ep(t,e){let r=ce();if(!r||!e?.length)return null;let n=e.attr("id")?`#${e.attr("id")}`:e.attr("data-yyt-select-key")?`[data-yyt-select-key="${e.attr("data-yyt-select-key")}"]`:"";if(!n)return null;let o=t.find("[data-yyt-custom-select]").filter((a,i)=>String(r(i).attr("data-yyt-select-target")||"")===n);return o.length?o.first():null}function Ip(t){let e=t?.[0];return e?.ownerDocument?e.ownerDocument:typeof window.parent<"u"&&window.parent!==window&&window.parent.document?window.parent.document:document}function Tw(t){if(!ce()||!ze(t))return null;let r=t.find("[data-yyt-custom-select]");return r.length?r:null}function Rp(t,e){if(!ce()||!e?.length)return null;let n=e.find("[data-yyt-select-native]").first();if(n.length)return n;let s=String(e.attr("data-yyt-select-target")||"").trim();if(!s)return null;let o=t.find(s).first();return o.length?o:null}function Mp(t=null){return t?.jquery&&t[0]?.ownerDocument?t[0].ownerDocument:t?.ownerDocument?t.ownerDocument:t?.nodeType===9?t:er()}function hr(t=null){let e=Mp(t),r=Ap.get(e);return r||(r={targetDoc:e,layer:null,activeRoot:null,activeDropdown:null,placeholder:null,cleanup:null},Ap.set(e,r)),r}function _w(t=null){let e=Mp(t);if(!e?.body)return null;let r=hr(e);if(r.layer&&r.layer.isConnected)return r.layer;let n=e.getElementById(Cp);return n||(n=e.createElement("div"),n.id=Cp,n.className="yyt-select-portal-layer",e.body.appendChild(n)),r.layer=n,n}function Ha(t){if(!ce()||!t?.length)return null;let r=t.find("[data-yyt-select-trigger]").first();return r.length?r:t.find(".yyt-select-trigger").first()}function Pp(t){let e=ce();if(!e||!t?.length)return null;let r=hr(t);if(r.activeRoot===t[0]&&r.activeDropdown)return e(r.activeDropdown);let n=t.find("[data-yyt-select-dropdown]").first();return n.length?n:t.find(".yyt-select-dropdown").first()}function Ew(t){t&&(t.classList.remove("yyt-floating-open"),t.removeAttribute("data-yyt-floating"),t.removeAttribute("data-yyt-floating-placement"),t.style.position="",t.style.top="",t.style.left="",t.style.right="",t.style.width="",t.style.minWidth="",t.style.maxWidth="",t.style.maxHeight="",t.style.visibility="",t.style.zIndex="")}function Np(t,e=null){if(!t)return!1;let r=hr(e||t);return r.activeRoot?.contains?.(t)||r.activeDropdown?.contains?.(t)?!0:!!t.closest?.("[data-yyt-custom-select], .yyt-select-portal-layer")}function Aw(t){if(!t?.targetDoc||typeof t.cleanup=="function")return;let e=t.targetDoc,r=e.defaultView||window,n=i=>{!t.activeRoot||!t.activeDropdown||Np(i.target,e)||mr(e)},s=i=>{if(i.key!=="Escape")return;let l=t.activeRoot;mr(e);let d=ce();d&&l&&Ha(d(l))?.trigger("focus")},o=()=>{Hl(e)},a=()=>{Hl(e)};e.addEventListener("mousedown",n,!0),e.addEventListener("keydown",s,!0),r.addEventListener("resize",o),e.addEventListener("scroll",a,!0),t.cleanup=()=>{e.removeEventListener("mousedown",n,!0),e.removeEventListener("keydown",s,!0),r.removeEventListener("resize",o),e.removeEventListener("scroll",a,!0)}}function Cw(t){typeof t?.cleanup=="function"&&t.cleanup(),t&&(t.cleanup=null)}function Wl(t){let e=ce();if(!e||!t?.activeRoot||!t?.activeDropdown)return;let r=t.targetDoc;if(!r?.body?.contains?.(t.activeRoot)){mr(r);return}let n=e(t.activeRoot),s=Ha(n),o=t.activeDropdown,a=r?.defaultView||window;if(!s?.length||!o?.isConnected||!n[0]?.isConnected){mr(r);return}let i=s[0].getBoundingClientRect(),l=a.innerWidth||r.documentElement?.clientWidth||0,d=a.innerHeight||r.documentElement?.clientHeight||0,c=12,u=8,y=Math.max(0,d-i.bottom-c-u),p=Math.max(0,i.top-c-u),g=y<220&&p>y,h=Math.max(120,Math.floor((g?p:y)||0));o.setAttribute("data-yyt-floating","true"),o.setAttribute("data-yyt-floating-placement",g?"top":"bottom"),o.classList.add("yyt-floating-open");let b=Math.ceil(i.width),x=Math.max(b,Math.floor(l-c*2)),w=o.style.width,T=o.style.minWidth,I=o.style.maxWidth,S=o.style.visibility;o.style.width="max-content",o.style.minWidth=`${b}px`,o.style.maxWidth=`${x}px`,o.style.visibility="hidden";let A=Math.ceil(o.scrollWidth||o.getBoundingClientRect().width||b),P=Math.max(b,Math.min(x,A)),M=Math.min(o.scrollHeight||h,h);o.style.width=w,o.style.minWidth=T,o.style.maxWidth=I,o.style.visibility=S;let R=Math.round(i.left);R+P>l-c&&(R=Math.max(c,Math.round(l-c-P))),R=Math.max(c,R);let _=Math.round(g?i.top-u-M:i.bottom+u);_=Math.max(c,Math.min(_,Math.round(d-c-M))),o.style.position="fixed",o.style.top=`${_}px`,o.style.left=`${R}px`,o.style.right="auto",o.style.width=`${P}px`,o.style.minWidth=`${b}px`,o.style.maxWidth=`${x}px`,o.style.maxHeight=`${Math.floor(h)}px`,o.style.visibility="",o.style.zIndex="10050"}function mr(t=null){let e=ce(),r=hr(t);if(!e||!r?.activeRoot)return;let n=r.activeRoot,s=r.activeDropdown,o=r.placeholder,a=e(n),i=Ha(a);s&&(Ew(s),o?.parentNode?o.parentNode.insertBefore(s,o):n?.isConnected?n.appendChild(s):s.remove()),o?.parentNode?.removeChild(o),a.removeClass("yyt-open"),i?.attr("aria-expanded","false"),r.activeRoot=null,r.activeDropdown=null,r.placeholder=null,Cw(r)}function Hl(t=null){let e=hr(t);!e?.activeRoot||!e?.activeDropdown||Wl(e)}function $p(t){if(!ce()||!t?.length)return;let r=t.first(),n=Ha(r),s=Pp(r);if(!n?.length||!s?.length||n.prop("disabled"))return;let o=hr(r);if(o.activeRoot===r[0]){Wl(o);return}mr(r);let a=_w(r);if(!a)return;let i=s[0],l=o.targetDoc.createComment("yyt-select-dropdown-placeholder");i.parentNode?.insertBefore(l,i),a.appendChild(i),o.activeRoot=r[0],o.activeDropdown=i,o.placeholder=l,r.addClass("yyt-open"),n.attr("aria-expanded","true"),Aw(o),Wl(o)}function kw(t,e){let r=ce();if(!r||!e?.length)return null;let n=e.closest("[data-yyt-custom-select]");if(n.length)return n.first();let s=hr(e);if(s.activeRoot&&s.activeDropdown?.contains?.(e[0])){let o=r(s.activeRoot);return t.has(s.activeRoot).length?o:null}return null}function Gl(t){let e=hr(t);t?.length&&e.activeRoot&&e.activeRoot!==t[0]||mr(t)}function Lp(t){let e=hr(t);if(t?.length&&e.activeRoot===t[0]){mr(t);return}$p(t)}function Ul(t,e,r=null){let n=ce();if(!n||!e?.length)return;let s=r||Rp(t,e);if(!s?.length)return;let o=Array.isArray(s.data("yytCustomSelectOptions"))?s.data("yytCustomSelectOptions"):[],a=kp(o,s.val(),e.attr("data-yyt-select-placeholder")||""),i=String(a.value??""),l=String(a.label??""),d=s.is(":disabled");e.find(".yyt-select-value").text(l).attr("data-value",i).data("value",i);let c=Pp(e);(c?.length?c.find("[data-yyt-select-option]"):e.find("[data-yyt-select-option]")).each((p,g)=>{let m=n(g),h=String(m.attr("data-value")||"")===i;m.toggleClass("yyt-selected",h).attr("aria-selected",String(h))});let y=e.find("[data-yyt-select-trigger]").first();y.prop("disabled",d),d&&(Gl(e),e.removeClass("yyt-open"),y.attr("aria-expanded","false"))}function Op(t=[]){return Array.isArray(t)?t.map(e=>{if(e&&typeof e=="object"&&!Array.isArray(e)){let n=String(e.value??""),s=String(e.label??e.text??e.name??n);return{value:n,label:s,disabled:e.disabled===!0}}let r=String(e??"");return{value:r,label:r,disabled:!1}}):[]}function Dp(t={}){let{selectedValue:e="",options:r=[],placeholder:n="\u8BF7\u9009\u62E9",disabled:s=!1,includeNative:o=!0,nativeTag:a="input",nativeType:i="hidden",rootAttributes:l={},nativeAttributes:d={},triggerAttributes:c={},dropdownAttributes:u={},optionAttributes:y={},optionClass:p="",optionTextClass:g=""}=t,m=Op(r),h=kp(m,e,n),b=s===!0||m.length===0,x=bs({...l,class:Xr("yyt-custom-select",l.class),"data-yyt-custom-select":l["data-yyt-custom-select"]??"true","data-yyt-select-placeholder":n}),w=bs({type:"button",...c,class:Xr("yyt-select-trigger",c.class),"data-yyt-select-trigger":c["data-yyt-select-trigger"]??"true","aria-haspopup":c["aria-haspopup"]??"listbox","aria-expanded":c["aria-expanded"]??"false",disabled:b?!0:c.disabled}),T=bs({...u,class:Xr("yyt-select-dropdown",u.class),"data-yyt-select-dropdown":u["data-yyt-select-dropdown"]??"true",role:u.role??"listbox"}),I=o?(()=>{let S={...d,class:Xr(d.class),"data-yyt-select-native":d["data-yyt-select-native"]??"true",disabled:b?!0:d.disabled};return a==="select"?`<select ${bs(S)}>${m.map(M=>`
            <option value="${me(M.value)}" ${M.value===String(h.value??"")?"selected":""} ${M.disabled?"disabled":""}>${me(M.label)}</option>
          `).join("")}</select>`:`<input ${bs({type:i,value:h.value,...S})}>`})():"";return`
    <div ${x}>
      ${I}
      <button ${w}>
        <span class="${me(Xr("yyt-select-value"))}" data-value="${me(h.value)}">${me(h.label)}</span>
        <i class="fa-solid fa-chevron-down yyt-select-arrow"></i>
      </button>
      <div ${T}>
        ${m.map(S=>{let A=S.value===String(h.value??"");return`
            <button ${bs({type:"button",...y,class:Xr("yyt-select-option",p,y.class,A?"yyt-selected":""),"data-yyt-select-option":y["data-yyt-select-option"]??"true","data-value":S.value,role:y.role??"option","aria-selected":A?"true":"false",disabled:S.disabled?!0:y.disabled})}>
              <span class="${me(Xr("yyt-option-text",g))}">${me(S.label)}</span>
            </button>
          `}).join("")}
      </div>
    </div>
  `}function Ut(t,e="yytCustomSelect"){let r=ce();if(!r||!ze(t))return;let n=Ip(t),s=hr(n);s.activeRoot&&t.has(s.activeRoot).length&&mr(n),t.off(`.${e}`),r(n).off(`click.${e}`),r(n).off(`mousedown.${e}`),t.find('[data-yyt-enhanced-select="true"]').remove(),t.find(".yyt-native-select-bridge").each((o,a)=>{let i=r(a),l=i.attr("data-yyt-original-style");l!==void 0&&l?i.attr("style",l):i.removeAttr("style"),i.removeClass("yyt-native-select-bridge").removeAttr("data-yyt-original-style").removeAttr("data-yyt-select-key").removeData("yytCustomSelectOptions")})}function br(t,e={}){let r=ce();if(!r||!ze(t))return;let{namespace:n="yytCustomSelect",selectors:s=[]}=e,o=Array.isArray(s)?s.filter(Boolean):[s].filter(Boolean);if(o.length===0)return;Ut(t,n);let a=o.join(", "),i=Ip(t);t.find(a).each((l,d)=>{let c=r(d),u=String(c.attr("id")||"").trim(),y=u||`yyt-select-${Date.now()}-${l}`,p=u?`#${u}`:`[data-yyt-select-key="${y}"]`,g=`${y}-dropdown`,m=Sw(c.attr("class")),h=c.attr("style"),b=c.find("option").map((T,I)=>{let S=r(I);return{value:String(S.attr("value")??S.val()??""),label:S.text(),disabled:S.is(":disabled")}}).get();c.attr("data-yyt-original-style",h??"").attr("data-yyt-select-key",y).addClass("yyt-native-select-bridge").css("display","none").data("yytCustomSelectOptions",b);let x=Dp({includeNative:!1,selectedValue:c.val(),options:b,disabled:c.is(":disabled"),placeholder:b[0]?.label||"\u8BF7\u9009\u62E9",rootAttributes:{class:Xr(m),style:h||void 0,"data-yyt-enhanced-select":"true","data-yyt-select-target":p},triggerAttributes:{id:`${y}-trigger`,"aria-controls":g},dropdownAttributes:{id:g}});c.after(x);let w=Ep(t,c);Ul(t,w,c)}),t.on(`click.${n}`,"[data-yyt-select-trigger]",l=>{l.preventDefault(),l.stopPropagation();let d=r(l.currentTarget);if(d.prop("disabled"))return;let c=d.closest("[data-yyt-custom-select]");Lp(c)}),t.on(`change.${n}`,a,l=>{let d=r(l.currentTarget),c=d.find("option").map((y,p)=>{let g=r(p);return{value:String(g.attr("value")??g.val()??""),label:g.text(),disabled:g.is(":disabled")}}).get();d.data("yytCustomSelectOptions",c);let u=Ep(t,d);Ul(t,u,d)}),r(i).off(`click.${n}`).on(`click.${n}`,l=>{if(Np(l.target,i))return;let d=Tw(t);d?.length&&(mr(i),d.filter(".yyt-open").removeClass("yyt-open").find("[data-yyt-select-trigger]").attr("aria-expanded","false"))}),r(i).off(`mousedown.${n}`,".yyt-select-portal-layer [data-yyt-select-option]").on(`mousedown.${n}`,".yyt-select-portal-layer [data-yyt-select-option]",l=>{l.preventDefault(),l.stopPropagation();let d=r(l.currentTarget);if(d.prop("disabled"))return;let c=kw(t,d);if(!c?.length)return;let u=Rp(t,c);if(!u?.length)return;let y=String(d.attr("data-value")||"");u.val(y).trigger("change"),Ul(t,c,u),Gl(c)})}function Iw(t,e=Ln){if(!ce()||!ze(t))return{url:"",apiKey:"",model:"",useMainApi:!0,stream:!1,max_tokens:4096,temperature:.7,top_p:.9};let n=t.find(`#${e}-model`).val()?.trim()||"",s=t.find(`#${e}-model-select`);return s.is(":visible")&&(n=s.val()||n),{url:t.find(`#${e}-api-url`).val()?.trim()||"",apiKey:t.find(`#${e}-api-key`).val()||"",model:n,useMainApi:t.find(`#${e}-use-main-api`).is(":checked"),stream:t.find(`#${e}-stream`).is(":checked"),max_tokens:parseInt(t.find(`#${e}-max-tokens`).val())||4096,temperature:parseFloat(t.find(`#${e}-temperature`).val())??.7,top_p:parseFloat(t.find(`#${e}-top-p`).val())??.9}}function Rw(t,e,r=Ln){if(!ce()||!ze(t)||!e)return;t.find(`#${r}-api-url`).val(e.url||""),t.find(`#${r}-api-key`).val(e.apiKey||""),t.find(`#${r}-model`).val(e.model||""),t.find(`#${r}-stream`).prop("checked",e.stream===!0),t.find(`#${r}-max-tokens`).val(e.max_tokens||4096),t.find(`#${r}-temperature`).val(e.temperature??.7),t.find(`#${r}-top-p`).val(e.top_p??.9);let s=e.useMainApi??!0;t.find(`#${r}-use-main-api`).prop("checked",s);let a=t.find(`#${r}-custom-api-fields`);s?a.addClass("yyt-disabled").find("input, button, select").prop("disabled",!0):a.removeClass("yyt-disabled").find("input, button, select").prop("disabled",!1),t.find(`#${r}-model`).show(),t.find(`#${r}-model-select`).hide()}function vo(t){let{id:e,title:r,body:n,width:s="380px",wide:o=!1,dialogClass:a="",bodyClass:i="",footerClass:l=""}=t;return`
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
  `}function So(t,e,r={}){if(!ce())return()=>{};let s=t.find(`#${e}-overlay`),o=()=>{s.remove(),a?.removeEventListener("keydown",i),r.onClose&&r.onClose()};s.find(`#${e}-close, #${e}-cancel`).on("click",o),s.on("click",function(l){l.target===this&&o()}),s.find(`#${e}-save`).on("click",function(){r.onSave&&r.onSave(o)});let a=s[0]?.ownerDocument||document,i=l=>{l.key==="Escape"&&(l.stopPropagation(),o())};return a.addEventListener("keydown",i),o}function Lr(t,e,r={}){let{confirmText:n="\u786E\u5B9A",cancelText:s="\u53D6\u6D88",danger:o=!1,width:a="380px"}=r,i=ce(),l=er();if(!i||!l?.body)return Promise.resolve(!1);let d=`yyt-confirm-${++Bp}`;return new Promise(c=>{let u=!1,y=h=>{u||(u=!0,m.remove(),p?.focus(),c(h))},p=l.activeElement,g=`
      <div class="yyt-dialog-overlay" id="${d}-overlay">
        <div class="yyt-dialog" style="${a!=="380px"?`width: ${a};`:""} max-height: calc(100vh - 32px);">
          <div class="yyt-dialog-header">
            <span class="yyt-dialog-title">${me(t)}</span>
            <button class="yyt-dialog-close" id="${d}-close">
              <i class="fa-solid fa-times"></i>
            </button>
          </div>
          <div class="yyt-dialog-body">
            <div style="color: var(--yyt-text-secondary); font-size: 13px; line-height: 1.6;">${me(e)}</div>
          </div>
          <div class="yyt-dialog-footer">
            <button class="yyt-btn yyt-btn-secondary" id="${d}-cancel">${me(s)}</button>
            <button class="yyt-btn ${o?"yyt-btn-danger":"yyt-btn-primary"}" id="${d}-confirm">${me(n)}</button>
          </div>
        </div>
      </div>`,m=i(g).appendTo(l.body);m.find(`#${d}-confirm`).on("click",()=>y(!0)),m.find(`#${d}-cancel, #${d}-close`).on("click",()=>y(!1)),m.on("click",function(h){h.target===this&&y(!1)}),m.on("keydown",h=>{h.key==="Escape"&&(h.stopPropagation(),y(!1)),h.key==="Enter"&&(h.stopPropagation(),y(!0))}),m.find(`#${d}-${o?"cancel":"confirm"}`).trigger("focus")})}function Mw(t,e,r={}){let{defaultValue:n="",placeholder:s="",confirmText:o="\u786E\u5B9A",cancelText:a="\u53D6\u6D88",width:i="380px"}=r,l=ce(),d=er();if(!l||!d?.body)return Promise.resolve(null);let c=`yyt-prompt-${++Bp}`;return new Promise(u=>{let y=!1,p=w=>{y||(y=!0,h.remove(),g?.focus(),u(w))},g=d.activeElement,m=`
      <div class="yyt-dialog-overlay" id="${c}-overlay">
        <div class="yyt-dialog" style="${i!=="380px"?`width: ${i};`:""} max-height: calc(100vh - 32px);">
          <div class="yyt-dialog-header">
            <span class="yyt-dialog-title">${me(t)}</span>
            <button class="yyt-dialog-close" id="${c}-close">
              <i class="fa-solid fa-times"></i>
            </button>
          </div>
          <div class="yyt-dialog-body">
            ${e?`<div style="color: var(--yyt-text-secondary); font-size: 13px; line-height: 1.6;">${me(e)}</div>`:""}
            <input class="yyt-input" id="${c}-input" type="text" value="${me(n)}" placeholder="${me(s)}" />
          </div>
          <div class="yyt-dialog-footer">
            <button class="yyt-btn yyt-btn-secondary" id="${c}-cancel">${me(a)}</button>
            <button class="yyt-btn yyt-btn-primary" id="${c}-confirm">${me(o)}</button>
          </div>
        </div>
      </div>`,h=l(m).appendTo(d.body),b=h.find(`#${c}-input`),x=()=>{let w=b.val().trim();p(w||null)};h.find(`#${c}-confirm`).on("click",x),h.find(`#${c}-cancel, #${c}-close`).on("click",()=>p(null)),h.on("click",function(w){w.target===this&&p(null)}),b.on("keydown",w=>{w.key==="Enter"&&(w.stopPropagation(),x())}),h.on("keydown",w=>{w.key==="Escape"&&(w.stopPropagation(),p(null))}),b.trigger("focus").trigger("select")})}function Pw(t,e,r){if(t.prop("disabled")&&t.data("yytLoading"))return Promise.resolve();let n=t.html(),s=t.outerWidth();if(t.prop("disabled",!0).data("yytLoading",!0),t.css("min-width",s+"px"),r)t.html(`<i class="fa-solid fa-spinner fa-spin" style="margin-right:4px"></i>${me(r)}`);else{let o=t.find("i.fa-solid, i.fa-regular").first();o.length?(o.data("yytOriginalClass",o.attr("class")),o.attr("class","fa-solid fa-spinner fa-spin")):t.html(`<i class="fa-solid fa-spinner fa-spin" style="margin-right:4px"></i>${n}`)}return Promise.resolve().then(()=>e()).finally(()=>{if(r)t.html(n);else{let o=t.find("i.fa-spinner"),a=o.data("yytOriginalClass");a?o.attr("class",a).removeData("yytOriginalClass"):t.html(n)}t.prop("disabled",!1).removeData("yytLoading").css("min-width","")})}function To(t,e){let r=new Blob([t],{type:"application/json"}),n=URL.createObjectURL(r),s=document.createElement("a");s.href=n,s.download=e,s.click(),URL.revokeObjectURL(n)}function _o(t){return new Promise((e,r)=>{let n=new FileReader;n.onload=s=>e(s.target.result),n.onerror=s=>r(new Error("\u6587\u4EF6\u8BFB\u53D6\u5931\u8D25")),n.readAsText(t)})}var xw,Ln,Fl,$n,Ap,Cp,Bp,ut=O(()=>{J();xw=N.createScope("UIUtils"),Ln="youyou_toolkit",Fl=class{constructor(e={}){this._state={...e}}get(e){return this._state[e]}set(e,r){return this._state[e]=r,this}reset(e={}){return this._state={...e},this}toJSON(){return{...this._state}}};$n=null;Ap=new WeakMap,Cp="yyt-select-portal-layer";Bp=0});var zp={};ge(zp,{StorageService:()=>On,default:()=>Ow,getStorage:()=>Nw,loadSettings:()=>$w,presetStorage:()=>Ke,saveSettings:()=>Lw,storage:()=>U,toolStorage:()=>Ne,windowStorage:()=>qa});function Nw(){let t=U;return t._getStorage(),t._storage}function $w(){return U.get("settings",{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}})}function Lw(t){U.set("settings",t)}var Yl,On,U,Ne,Ke,qa,Ow,Ve=O(()=>{J();Yl=N.createScope("StorageService"),On=class t{constructor(e="youyou_toolkit"){this.namespaceKey=e,this._storage=null,this._cache=new Map}_getStorage(){if(this._storage)return this._storage;try{let e=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(e.SillyTavern?.getContext){let r=e.SillyTavern.getContext();if(r?.extensionSettings)return r.extensionSettings[this.namespaceKey]||(r.extensionSettings[this.namespaceKey]={}),this._storage={_target:r.extensionSettings[this.namespaceKey],getItem:n=>{let s=r.extensionSettings[this.namespaceKey][n];return typeof s=="string"?s:s?JSON.stringify(s):null},setItem:(n,s)=>{r.extensionSettings[this.namespaceKey][n]=s,this._saveSettings(r)},removeItem:n=>{delete r.extensionSettings[this.namespaceKey][n],this._saveSettings(r)},_isTavern:!0},this._storage}}catch{Yl.warn("SillyTavern\u5B58\u50A8\u4E0D\u53EF\u7528\uFF0C\u4F7F\u7528localStorage")}return this._storage={getItem:e=>{try{return localStorage.getItem(e)}catch{return null}},setItem:(e,r)=>{try{localStorage.setItem(e,r)}catch(n){Yl.error("localStorage\u5199\u5165\u5931\u8D25:",n)}},removeItem:e=>{try{localStorage.removeItem(e)}catch{}},_isTavern:!1},this._storage}_saveSettings(e){if(typeof e.saveSettings=="function")try{e.saveSettings()}catch{}else if(typeof e.saveSettingsDebounced=="function")try{e.saveSettingsDebounced()}catch{}}get(e,r=null){let n=`${this.namespaceKey}:${e}`;if(this._cache.has(n))return this._cache.get(n);let s=this._getStorage(),o=this._getFullKey(e),a=s.getItem(o);if(a===null)return r;try{let i=JSON.parse(a);return this._cache.set(n,i),i}catch{return a}}set(e,r){let n=this._getStorage(),s=this._getFullKey(e),o=`${this.namespaceKey}:${e}`;this._cache.set(o,r);try{n.setItem(s,JSON.stringify(r))}catch(a){Yl.error("\u5B58\u50A8\u5931\u8D25:",a)}}remove(e){let r=this._getStorage(),n=this._getFullKey(e),s=`${this.namespaceKey}:${e}`;this._cache.delete(s),r.removeItem(n)}has(e){let r=this._getStorage(),n=this._getFullKey(e);return r.getItem(n)!==null}clear(){if(this._getStorage()._isTavern){let r=typeof window.parent<"u"?window.parent:window;if(r.SillyTavern?.getContext){let n=r.SillyTavern.getContext();n?.extensionSettings?.[this.namespaceKey]&&(n.extensionSettings[this.namespaceKey]={},this._saveSettings(n))}}else{let r=`${this.namespaceKey}_`,n=[];for(let s=0;s<localStorage.length;s++){let o=localStorage.key(s);o&&o.startsWith(r)&&n.push(o)}n.forEach(s=>localStorage.removeItem(s))}this._cache.clear()}_getFullKey(e){return this._getStorage()._isTavern?e:`${this.namespaceKey}_${e}`}namespace(e){return new t(`${this.namespaceKey}:${e}`)}getMultiple(e){let r={};return e.forEach(n=>{r[n]=this.get(n)}),r}setMultiple(e){Object.entries(e).forEach(([r,n])=>{this.set(r,n)})}exportAll(){let e=this._getStorage(),r={};if(e._isTavern){let n=typeof window.parent<"u"?window.parent:window;if(n.SillyTavern?.getContext){let o=n.SillyTavern.getContext()?.extensionSettings?.[this.namespaceKey]||{};Object.entries(o).forEach(([a,i])=>{r[a]=typeof i=="string"?JSON.parse(i):i})}}else{let n=`${this.namespaceKey}_`;for(let s=0;s<localStorage.length;s++){let o=localStorage.key(s);if(o&&o.startsWith(n)){let a=o.slice(n.length);try{r[a]=JSON.parse(localStorage.getItem(o))}catch{r[a]=localStorage.getItem(o)}}}}return r}},U=new On("youyou_toolkit"),Ne=new On("youyou_toolkit:tools"),Ke=new On("youyou_toolkit:presets"),qa=new On("youyou_toolkit:windows");Ow=U});var Wp={};ge(Wp,{API_STATUS:()=>Fw,fetchAvailableModels:()=>Qw,getApiConfig:()=>xs,getEffectiveApiConfig:()=>Eo,hasEffectiveApiPreset:()=>Ao,sendApiRequest:()=>ko,sendWithPreset:()=>Co,testApiConnection:()=>Xw,updateApiConfig:()=>Hw,validateApiConfig:()=>Ga});function Kw(){return{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,stream:!1,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}}}function Jl(){return U.get(Kp,Kw())}function jw(t){U.set(Kp,t)}function jp(){return U.get(Bw,[])}function Uw(){return U.get(zw,"")}function Vl(t,e={}){let r=new Error(t);return r.allowDirectFallback=e.allowDirectFallback===!0,r}function Up(t,e="chat_completions"){let r=String(t||"").trim();if(!r)return"";let n=null;try{n=new URL(r)}catch{return r}let s=n.pathname.replace(/\/+$/,""),o=s;return e==="chat_completions"?!/\/chat\/completions$/i.test(s)&&!/\/completions$/i.test(s)&&(o=`${s||""}/chat/completions`):e==="models"&&(/\/chat\/completions$/i.test(s)?o=s.replace(/\/chat\/completions$/i,"/models"):/\/completions$/i.test(s)?o=s.replace(/\/completions$/i,"/models"):/\/models$/i.test(s)||(o=`${s||""}/models`)),n.pathname=o.replace(/\/+/g,"/"),n.toString()}function Ww(t){let e=String(t||"").trim();if(!e)return"";try{let r=new URL(e);return r.pathname=r.pathname.replace(/\/chat\/completions$/i,"").replace(/\/completions$/i,"").replace(/\/models$/i,"").replace(/\/+$/,"")||"/",r.toString().replace(/\/$/,"")}catch{return e.replace(/\/chat\/completions$/i,"").replace(/\/completions$/i,"").replace(/\/models$/i,"").replace(/\/+$/,"")}}function xs(){return Jl().apiConfig||{}}function Hw(t){let e=Jl();e.apiConfig={...e.apiConfig,...t},jw(e)}function Ga(t){let e=[];if(t.useMainApi)return{valid:!0,errors:[]};if(!t.url||!t.url.trim())e.push("API URL \u4E0D\u80FD\u4E3A\u7A7A");else try{new URL(t.url)}catch{e.push("API URL \u683C\u5F0F\u65E0\u6548")}return(!t.model||!t.model.trim())&&e.push("\u6A21\u578B\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"),{valid:e.length===0,errors:e}}function Eo(t=""){let e=Jl(),r=t||Uw()||"";if(r){let s=jp().find(o=>o.name===r);if(s&&s.apiConfig)return{...s.apiConfig,presetName:s.name}}return e.apiConfig||{}}function Ao(t=""){return t?jp().some(r=>r?.name===t):!1}async function Co(t,e,r={},n=null){let s=Eo(t);return await ko(e,{...r,apiConfig:s},n)}function Fp(t,e={}){let r=e.apiConfig||xs();return{messages:t,model:r.model||"gpt-3.5-turbo",max_tokens:r.max_tokens||4096,temperature:r.temperature??.7,top_p:r.top_p??.9,stream:r.stream??!1,...e.extraParams}}function Xl(t){let e="";if(t?.choices&&t.choices[0]?.message?.content)e=t.choices[0].message.content;else if(t?.content)e=t.content;else if(t?.text)e=t.text;else if(t?.response)e=t.response;else throw new Error(`\u65E0\u6CD5\u89E3\u6790API\u54CD\u5E94\u683C\u5F0F: ${JSON.stringify(t).slice(0,200)}`);return String(e||"").trim()}async function ko(t,e={},r=null){let n=e.apiConfig||xs(),s=n.useMainApi,o=Ga(n);if(!o.valid&&!s)throw new Error(`API\u914D\u7F6E\u65E0\u6548: ${o.errors.join(", ")}`);return s?await qw(t,e,r):await Gw(t,n,e,r)}async function qw(t,e,r){let n=typeof window.parent<"u"?window.parent:window;if(!n.TavernHelper?.generateRaw)throw new Error("TavernHelper.generateRaw \u4E0D\u53EF\u7528\u3002\u8BF7\u68C0\u67E5SillyTavern\u7248\u672C\u3002");try{let s=await n.TavernHelper.generateRaw({ordered_prompts:t,should_stream:e.apiConfig?.stream??xs().stream??!1,...e.extraParams});if(typeof s!="string")throw new Error("\u4E3BAPI\u8FD4\u56DE\u4E86\u975E\u9884\u671F\u7684\u54CD\u5E94\u7C7B\u578B");return s.trim()}catch(s){throw s.name==="AbortError"?s:new Error(`\u4E3BAPI\u8BF7\u6C42\u5931\u8D25: ${s.message}`)}}async function Gw(t,e,r,n){let s=typeof window.parent<"u"?window.parent:window;if(s.TavernHelper?.generateRaw)try{return await Yw(t,e,r,n,s)}catch(o){let a=String(o?.message||o||"");if(o?.name==="AbortError"||n?.aborted||a.includes("\u505C\u6B62\u6309\u94AE")||a.includes("stop button")||a.includes("Clicked stop")||a==="\u8BF7\u6C42\u5DF2\u53D6\u6D88")throw o;Dw.warn("TavernHelper \u81EA\u5B9A\u4E49\u8BF7\u6C42\u5931\u8D25\uFF0C\u56DE\u9000\u5230\u540E\u5907\u94FE\u8DEF:",o)}if(s.SillyTavern?.getRequestHeaders)try{return await Vw(t,e,r,n,s)}catch(o){if(!o?.allowDirectFallback)throw o}return await Jw(t,e,r,n)}async function Yw(t,e,r,n,s){if(n?.aborted)throw new DOMException("\u8BF7\u6C42\u5DF2\u53D6\u6D88","AbortError");let o=await s.TavernHelper.generateRaw({ordered_prompts:t,should_stream:e.stream??!1,max_chat_history:0,custom_api:{apiurl:Ww(e.url),key:e.apiKey||"",model:e.model||"gpt-3.5-turbo",max_tokens:e.max_tokens||4096,temperature:e.temperature??.7,top_p:e.top_p??.9},...r.extraParams||{}});return typeof o=="string"?o.trim():Xl(o)}async function Vw(t,e,r,n,s){let o=String(e.url||"").trim(),a={...Fp(t,{apiConfig:e,...r}),chat_completion_source:"custom",reverse_proxy:o,proxy_password:"",custom_url:o,custom_include_headers:e.apiKey?`Authorization: Bearer ${e.apiKey}`:""},i={...typeof s.SillyTavern?.getRequestHeaders=="function"?s.SillyTavern.getRequestHeaders():{},"Content-Type":"application/json"},l=null;try{l=await fetch("/api/backends/chat-completions/generate",{method:"POST",headers:i,body:JSON.stringify(a),signal:n})}catch(u){throw u?.name==="AbortError"?u:Vl(`\u9152\u9986\u540E\u7AEF\u8F6C\u53D1\u8BF7\u6C42\u4E0D\u53EF\u7528\uFF0C\u5DF2\u5C1D\u8BD5\u56DE\u9000\u5230\u6D4F\u89C8\u5668\u76F4\u8FDE\u3002\u539F\u59CB\u9519\u8BEF: ${u.message}`,{allowDirectFallback:!0})}let d=await l.text().catch(()=>"");if(!l.ok){let u=[404,405,501,502].includes(l.status);throw Vl(`\u9152\u9986\u540E\u7AEF\u8F6C\u53D1\u8BF7\u6C42\u5931\u8D25 (${l.status}): ${d||"Unknown error"}`,{allowDirectFallback:u})}let c=null;try{c=d?JSON.parse(d):{}}catch{let y=String(d||"").replace(/\s+/g," ").trim().slice(0,120);throw Vl(`\u9152\u9986\u540E\u7AEF\u8FD4\u56DE\u4E86\u975EJSON\u5185\u5BB9\u3002\u54CD\u5E94\u7247\u6BB5: ${y||"(\u7A7A\u54CD\u5E94)"}`)}return Xl(c)}async function Jw(t,e,r,n){let s=Fp(t,{apiConfig:e,...r}),o=Up(e.url,"chat_completions"),a={"Content-Type":"application/json"};e.apiKey&&(a.Authorization=`Bearer ${e.apiKey}`);let i=await fetch(o,{method:"POST",headers:a,body:JSON.stringify(s),signal:n}),l=await i.text().catch(()=>"");if(!i.ok){let c=l||"Unknown error";throw new Error(`API\u8BF7\u6C42\u5931\u8D25 (${i.status}): ${c}`)}let d=null;try{d=l?JSON.parse(l):{}}catch{let u=String(l||"").replace(/\s+/g," ").trim().slice(0,120);throw new Error(`\u81EA\u5B9A\u4E49API\u8FD4\u56DE\u7684\u4E0D\u662FJSON\uFF0C\u53EF\u80FD\u662FURL\u914D\u7F6E\u9519\u8BEF\u3001\u53EA\u586B\u5199\u4E86\u7AD9\u70B9\u9996\u9875/\u57FA\u7840\u8DEF\u5F84\u3001\u6216\u8BF7\u6C42\u88AB\u91CD\u5B9A\u5411\u3002\u5F53\u524D\u4F1A\u81EA\u52A8\u5C1D\u8BD5\u8865\u5168 chat/completions \u7AEF\u70B9\uFF1B\u82E5\u4ECD\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5API URL\uFF0C\u6216\u6539\u4E3A\u542F\u7528\u201C\u4F7F\u7528SillyTavern\u4E3BAPI\u201D\u3002\u54CD\u5E94\u7247\u6BB5: ${u||"(\u7A7A\u54CD\u5E94)"}`)}return Xl(d)}async function Xw(t=null){let e=t||xs(),r=Date.now();try{await ko([{role:"user",content:'Hello, this is a connection test. Please respond with "OK".'}],{apiConfig:e});let s=Date.now()-r;return{success:!0,message:`\u8FDE\u63A5\u6210\u529F (\u5EF6\u8FDF: ${s}ms)`,latency:s}}catch(n){return{success:!1,message:`\u8FDE\u63A5\u5931\u8D25: ${n.message}`,latency:Date.now()-r}}}async function Qw(t=null){let e=t||xs();return e.useMainApi?await Zw():await ev(e)}async function Zw(){let t=typeof window.parent<"u"?window.parent:window;try{if(t.SillyTavern?.getContext){let e=t.SillyTavern.getContext();if(e.settings?.api_server)return[e.settings.api_server]}return["gpt-4","gpt-4-turbo","gpt-3.5-turbo","claude-3-opus","claude-3-sonnet"]}catch{return["gpt-4","gpt-3.5-turbo"]}}async function ev(t){if(!t.url||!t.apiKey)return[];try{let e=Up(t.url,"models"),r=await fetch(e,{method:"GET",headers:{Authorization:`Bearer ${t.apiKey}`}});if(!r.ok)return[];let n=await r.json();return n.data&&Array.isArray(n.data)?n.data.map(s=>s.id||s.name).filter(Boolean).sort():[]}catch{return[]}}var Dw,Kp,Bw,zw,Fw,Io=O(()=>{Ve();J();Dw=N.createScope("ApiConnection"),Kp="settings",Bw="api_presets",zw="current_preset";Fw={IDLE:"idle",CONNECTING:"connecting",SUCCESS:"success",ERROR:"error"}});var Yp={};ge(Yp,{createPreset:()=>Ja,createPresetFromCurrentConfig:()=>iv,deletePreset:()=>Xa,duplicatePreset:()=>tc,exportPresets:()=>nc,generateUniquePresetName:()=>cv,getActiveConfig:()=>av,getActivePresetName:()=>rc,getAllPresets:()=>Qr,getPreset:()=>Bn,getPresetNames:()=>Ql,getStarredPresets:()=>ov,importPresets:()=>sc,presetExists:()=>Ro,renamePreset:()=>ec,switchToPreset:()=>Qa,togglePresetStar:()=>sv,updatePreset:()=>Zl,validatePreset:()=>lv});function nv(){return{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}}}function Gp(){return U.get(rv,nv())}function Pt(){return U.get(Hp,[])}function Dn(t){U.set(Hp,t)}function Va(){return U.get(qp,"")}function Ya(t){U.set(qp,t||"")}function Qr(){return Pt()}function Ql(){return Pt().map(e=>e.name)}function Bn(t){return!t||typeof t!="string"?null:Pt().find(r=>r.name===t)||null}function Ro(t){return!t||typeof t!="string"?!1:Pt().some(r=>r.name===t)}function Ja(t){let{name:e,description:r,apiConfig:n}=t;if(!e||typeof e!="string"||!e.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let s=e.trim();if(Ro(s))return{success:!1,message:`\u9884\u8BBE "${s}" \u5DF2\u5B58\u5728`};let o={name:s,description:r||"",apiConfig:{url:n?.url||"",apiKey:n?.apiKey||"",model:n?.model||"",useMainApi:n?.useMainApi??!0,stream:n?.stream??!1,max_tokens:n?.max_tokens||4096,temperature:n?.temperature??.7,top_p:n?.top_p??.9},createdAt:Date.now(),updatedAt:Date.now()},a=Pt();return a.push(o),Dn(a),{success:!0,message:`\u9884\u8BBE "${s}" \u521B\u5EFA\u6210\u529F`,preset:o}}function Zl(t,e){if(!t||typeof t!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let r=Pt(),n=r.findIndex(a=>a.name===t);if(n===-1)return{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if(e.name&&e.name!==t)return{success:!1,message:"\u4E0D\u652F\u6301\u4FEE\u6539\u9884\u8BBE\u540D\u79F0\uFF0C\u8BF7\u521B\u5EFA\u65B0\u9884\u8BBE"};let s=r[n],o={...s,...e,name:s.name,updatedAt:Date.now()};return e.apiConfig&&(o.apiConfig={...s.apiConfig,...e.apiConfig}),r[n]=o,Dn(r),{success:!0,message:`\u9884\u8BBE "${t}" \u66F4\u65B0\u6210\u529F`,preset:o}}function Xa(t){if(!t||typeof t!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let e=Pt(),r=e.findIndex(n=>n.name===t);return r===-1?{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`}:(e.splice(r,1),Dn(e),Va()===t&&Ya(""),{success:!0,message:`\u9884\u8BBE "${t}" \u5DF2\u5220\u9664`})}function ec(t,e){if(!t||typeof t!="string")return{success:!1,message:"\u539F\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};if(!e||typeof e!="string"||!e.trim())return{success:!1,message:"\u65B0\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let r=e.trim();if(!Ro(t))return{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if(Ro(r))return{success:!1,message:`\u9884\u8BBE "${r}" \u5DF2\u5B58\u5728`};let n=Pt(),s=n.find(o=>o.name===t);return s&&(s.name=r,s.updatedAt=Date.now(),Dn(n),Va()===t&&Ya(r)),{success:!0,message:`\u9884\u8BBE\u5DF2\u91CD\u547D\u540D\u4E3A "${r}"`}}function tc(t,e){if(!t||typeof t!="string")return{success:!1,message:"\u6E90\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};if(!e||typeof e!="string"||!e.trim())return{success:!1,message:"\u76EE\u6807\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let r=e.trim(),n=Bn(t);if(!n)return{success:!1,message:`\u6E90\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if(Ro(r))return{success:!1,message:`\u9884\u8BBE "${r}" \u5DF2\u5B58\u5728`};let s={...JSON.parse(JSON.stringify(n)),name:r,createdAt:Date.now(),updatedAt:Date.now()},o=Pt();return o.push(s),Dn(o),{success:!0,message:`\u9884\u8BBE\u5DF2\u590D\u5236\u4E3A "${r}"`,preset:s}}function sv(t){if(!t||typeof t!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let e=Pt(),r=e.find(n=>n.name===t);return r?(r.starred=!r.starred,r.updatedAt=Date.now(),Dn(e),{success:!0,message:r.starred?`\u5DF2\u5C06 "${t}" \u6DFB\u52A0\u5230\u9884\u89C8\u5217\u8868`:`\u5DF2\u5C06 "${t}" \u4ECE\u9884\u89C8\u5217\u8868\u79FB\u9664`,starred:r.starred}):{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`}}function ov(){return Pt().filter(e=>e.starred===!0)}function Qa(t){if(!t)return Ya(""),{success:!0,message:"\u5DF2\u5207\u6362\u5230\u5F53\u524DAPI\u914D\u7F6E"};let e=Bn(t);return e?(Ya(t),{success:!0,message:`\u5DF2\u5207\u6362\u5230\u9884\u8BBE "${t}"`,apiConfig:e.apiConfig}):{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`}}function rc(){return Va()}function av(){let t=Va();if(t){let r=Bn(t);if(r)return{presetName:t,apiConfig:r.apiConfig}}return{presetName:"",apiConfig:Gp().apiConfig||{}}}function nc(t=null){if(t){let r=Bn(t);if(!r)throw new Error(`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`);return JSON.stringify(r,null,2)}let e=Pt();return JSON.stringify(e,null,2)}function sc(t,e={overwrite:!1}){let r;try{r=JSON.parse(t)}catch(a){return tv.error("\u9884\u8BBE\u5BFC\u5165\u5931\u8D25: JSON\u89E3\u6790\u9519\u8BEF",{error:a}),{success:!1,message:"JSON\u89E3\u6790\u5931\u8D25",imported:0}}let n=Array.isArray(r)?r:[r];if(n.length===0)return{success:!1,message:"\u6CA1\u6709\u627E\u5230\u6709\u6548\u7684\u9884\u8BBE\u6570\u636E",imported:0};let s=Pt(),o=0;for(let a of n){if(!a.name||typeof a.name!="string"||!a.apiConfig||typeof a.apiConfig!="object")continue;let i=s.findIndex(l=>l.name===a.name);i>=0?e.overwrite&&(a.updatedAt=Date.now(),s[i]=a,o++):(a.createdAt=a.createdAt||Date.now(),a.updatedAt=Date.now(),s.push(a),o++)}return o>0&&Dn(s),{success:!0,message:`\u6210\u529F\u5BFC\u5165 ${o} \u4E2A\u9884\u8BBE`,imported:o}}function iv(t,e=""){let r=Gp();return Ja({name:t,description:e,apiConfig:r.apiConfig})}function lv(t){let e=[];return(!t.name||typeof t.name!="string"||!t.name.trim())&&e.push("\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"),(!t.apiConfig||typeof t.apiConfig!="object")&&e.push("\u7F3A\u5C11API\u914D\u7F6E"),{valid:e.length===0,errors:e}}function cv(t){(!t||typeof t!="string")&&(t="\u65B0\u9884\u8BBE");let e=Pt(),r=new Set(e.map(s=>s.name));if(!r.has(t))return t;let n=1;for(;r.has(`${t} (${n})`);)n++;return`${t} (${n})`}var tv,rv,Hp,qp,ws=O(()=>{Ve();J();tv=N.createScope("PresetManager"),rv="settings",Hp="api_presets",qp="current_preset"});var vs,Mo,lr,oc=O(()=>{ct();ut();J();vs=N.createScope("UIManager"),Mo=class{constructor(){this.components=new Map,this.activeInstances=new Map,this.dependencies={},this.currentTab="main",this.currentSubTab={},this.initialized=!1}init(e={}){this.initialized||(this.dependencies=e.services||{},this._subscribeEvents(),this.initialized=!0,G.emit(W.UI_INITIALIZED),vs.log("\u521D\u59CB\u5316\u5B8C\u6210"))}register(e,r){return!e||!r?(vs.warn("\u65E0\u6548\u7684\u7EC4\u4EF6\u6CE8\u518C"),!1):(this.components.set(e,{id:e,...r,render:r.render||(()=>""),bindEvents:r.bindEvents||(()=>{}),destroy:r.destroy||(()=>{}),getStyles:r.getStyles||(()=>"")}),!0)}unregister(e){this.destroyInstance(e),this.components.delete(e)}getComponent(e){return this.components.get(e)}render(e,r,n={}){let s=ce();if(!s){vs.error("jQuery\u4E0D\u53EF\u7528");return}let o=this.components.get(e);if(!o){vs.error(`\u7EC4\u4EF6\u4E0D\u5B58\u5728: ${e}`);let i;typeof r=="string"?i=s(r):r&&r.jquery?i=r:r&&(i=s(r)),i?.length&&i.html(`<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u7EC4\u4EF6\u672A\u6CE8\u518C\uFF1A${e}</span></div>`);return}let a;if(typeof r=="string"?a=s(r):r&&r.jquery?a=r:r&&(a=s(r)),!ze(a)){vs.warn("\u5BB9\u5668\u4E0D\u5B58\u5728");return}this.activeInstances.forEach((i,l)=>{i?.container?.length&&a.length&&i.container[0]===a[0]&&l!==e&&this.destroyInstance(l)}),this.destroyInstance(e);try{if(typeof o.renderTo=="function")o.renderTo(a,{...n,dependencies:this.dependencies});else{let i=o.render({...n,dependencies:this.dependencies});a.html(i),o.bindEvents(a,this.dependencies)}}catch(i){vs.error(`\u7EC4\u4EF6\u6E32\u67D3\u5931\u8D25: ${e}`,i),a.html(`<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u7EC4\u4EF6\u6E32\u67D3\u5931\u8D25\uFF1A${e}${i?.message?` - ${i.message}`:""}</span></div>`);return}this.activeInstances.set(e,{container:a,component:o,props:n}),G.emit(W.UI_RENDER_REQUESTED,{componentId:e})}destroyInstance(e){let r=this.activeInstances.get(e);r&&(r.component.destroy(r.container),this.activeInstances.delete(e))}destroyContainerInstance(e){let r=ce();if(!r||!e)return;let n;if(typeof e=="string"?n=r(e):e?.jquery?n=e:n=r(e),!n?.length)return;let s=[];this.activeInstances.forEach((o,a)=>{o?.container?.length&&o.container[0]===n[0]&&s.push(a)}),s.forEach(o=>this.destroyInstance(o))}switchTab(e){let r=this.currentTab;this.currentTab=e,G.emit(W.UI_TAB_CHANGED,{tabId:e,oldTab:r})}getCurrentTab(){return this.currentTab}switchSubTab(e,r){this.currentSubTab[e]=r,G.emit(W.UI_SUBTAB_CHANGED,{mainTab:e,subTab:r})}getCurrentSubTab(e){return this.currentSubTab[e]||""}getAllStyles(){let e="";return this.components.forEach((r,n)=>{r.getStyles&&(e+=r.getStyles())}),e}injectStyles(e=document){let r="yyt-component-styles";if(e.getElementById(r))return;let n=e.createElement("style");n.id=r,n.textContent=this.getAllStyles(),(e.head||e.documentElement).appendChild(n)}setDependency(e,r){this.dependencies[e]=r}getDependency(e){return this.dependencies[e]}_subscribeEvents(){G.on(W.PRESET_UPDATED,()=>{}),G.on(W.TOOL_UPDATED,()=>{})}},lr=new Mo});function f(t,e={},...r){let n=document.createElement(t);if(e.className&&(n.className=e.className),e.text!==void 0&&e.text!==null&&(n.textContent=String(e.text)),e.html!==void 0&&e.html!==null&&(n.innerHTML=String(e.html)),e.attrs)for(let[s,o]of Object.entries(e.attrs))o==null||o===!1||n.setAttribute(s,o===!0?"":String(o));if(e.style&&Object.assign(n.style,e.style),e.dataset)for(let[s,o]of Object.entries(e.dataset))n.dataset[s]=String(o);for(let s of r)Q(n,s);return n}function Q(t,e){if(!(e==null||e===!1)){if(Array.isArray(e)){for(let r of e)Q(t,r);return}if(typeof e=="string"||typeof e=="number"){t.appendChild(document.createTextNode(String(e)));return}if(e instanceof Node){t.appendChild(e);return}if(e&&e.el instanceof Node){t.appendChild(e.el);return}}}function Vp(){let t=new Map;return{on(e,r){return!e||typeof r!="function"?()=>{}:(t.has(e)||t.set(e,new Set),t.get(e).add(r),()=>this.off(e,r))},off(e,r){let n=t.get(e);n&&n.delete(r)},emit(e,...r){let n=t.get(e);if(n)for(let s of[...n])try{s(...r)}catch{}},clear(){t.clear()}}}function ac(t,e){if(!t||!e)return null;if(t._id===e)return t;let r=t._children;if(!r)return null;let n=r instanceof Map?[...r.values()]:Array.isArray(r)?r:[];for(let s of n){let o=ac(s,e);if(o)return o}return null}function Ue({id:t=null,kind:e="control",el:r=null,style:n=null,className:s=null,attrs:o=null}={}){if(r){if(n&&Object.assign(r.style,n),s){let i=String(s).trim().split(/\s+/).filter(Boolean);i.length&&r.classList.add(...i)}if(o)for(let[i,l]of Object.entries(o))l===!1||l==null||r.setAttribute(i,l===!0?"":String(l))}let a=Vp();return{_id:t||null,_kind:e,_children:null,_emitter:a,on(i,l){return a.on(i,l)},off(i,l){a.off(i,l)},getControl(i){return ac(this,i)},get(){},set(i){},destroy(){if(a.clear(),this._children){let i=this._children instanceof Map?[...this._children.values()]:Array.isArray(this._children)?this._children:[];for(let l of i)try{l?.destroy?.()}catch{}this._children instanceof Map?this._children.clear():Array.isArray(this._children)&&(this._children.length=0)}if(this.el?.parentNode)try{this.el.parentNode.removeChild(this.el)}catch{}}}}var xt=O(()=>{});function te(t={}){let{id:e=null,label:r="",icon:n=null,variant:s="default",size:o="normal",disabled:a=!1,title:i=null,onClick:l=null}=t,d=["yyt-btn"];s==="primary"?d.push("yyt-btn-primary"):s==="danger"?d.push("yyt-btn-danger"):s==="ghost"&&d.push("yyt-btn-secondary"),o==="small"&&d.push("yyt-btn-small");let c=f("button",{className:d.join(" "),attrs:{type:"button",disabled:a?"disabled":null,title:i}}),u=null;n&&(u=f("span",{className:"yyt-btn-icon-glyph",text:n}),c.appendChild(u));let y=f("span",{text:r});c.appendChild(y);let p={...Ue({id:e,kind:"button",el:c,style:t.style,className:t.className,attrs:t.attrs}),el:c,setLabel(g){y.textContent=String(g||"")},setIcon(g){u&&(u.textContent=String(g||""))},setDisabled(g){g?c.setAttribute("disabled","disabled"):c.removeAttribute("disabled")},isDisabled(){return c.hasAttribute("disabled")},get(){return y.textContent},set(g){this.setLabel(g)}};return c.addEventListener("click",g=>{if(!c.hasAttribute("disabled")){if(typeof l=="function")try{l(g,p)}catch(m){console.error("[button] onClick \u5F02\u5E38",m)}p._emitter.emit("click",g)}}),p}var Jp=O(()=>{xt()});function ve(t={}){let{id:e=null,placeholder:r="",value:n="",type:s="text",disabled:o=!1,maxLength:a=null,onInput:i=null,onChange:l=null}=t,d=f("input",{className:"yyt-input",attrs:{type:s,placeholder:r,disabled:o?"disabled":null,maxlength:a!=null?String(a):null}});d.value=n==null?"":String(n);let c={...Ue({id:e,kind:"textInput",el:d,style:t.style,className:t.className,attrs:t.attrs}),el:d,get(){return d.value},set(u,{silent:y=!1}={}){d.value=u==null?"":String(u),y||c._emitter.emit("change",d.value)},setPlaceholder(u){d.placeholder=u==null?"":String(u)},setDisabled(u){d.disabled=!!u},focus(){d.focus()},select(){d.select()}};return d.addEventListener("input",()=>{if(typeof i=="function")try{i(d.value,c)}catch(u){console.error("[textInput] onInput \u5F02\u5E38",u)}c._emitter.emit("input",d.value)}),d.addEventListener("change",()=>{if(typeof l=="function")try{l(d.value,c)}catch(u){console.error("[textInput] onChange \u5F02\u5E38",u)}c._emitter.emit("change",d.value)}),d.addEventListener("blur",()=>c._emitter.emit("blur",d.value)),c}var Xp=O(()=>{xt()});function Me(t={}){let{id:e=null,options:r=[],value:n="",placeholder:s=null,disabled:o=!1,onChange:a=null}=t,i=f("select",{className:"yyt-select",attrs:{disabled:o?"disabled":null}});function l(c,u){if(i.innerHTML="",s!==null){let y=f("option",{text:s,attrs:{value:"",disabled:"disabled",selected:u?null:"selected"}});i.appendChild(y)}for(let y of c){let p=f("option",{text:y.label??String(y.value),attrs:{value:String(y.value),selected:String(y.value)===String(u)?"selected":null,disabled:y.disabled?"disabled":null}});i.appendChild(p)}}l(r,n);let d={...Ue({id:e,kind:"select",el:i,style:t.style,className:t.className,attrs:t.attrs}),el:i,get(){return i.value},set(c,{silent:u=!1}={}){i.value=c==null?"":String(c),u||d._emitter.emit("change",i.value)},setOptions(c,u){l(c||[],u??i.value)},setDisabled(c){i.disabled=!!c}};return i.addEventListener("change",()=>{if(typeof a=="function")try{a(i.value,d)}catch(c){typeof console<"u"&&console.error&&console.error("[selectInput] onChange \u5F02\u5E38",c)}d._emitter.emit("change",i.value)}),d}var Qp=O(()=>{xt()});function Qe(t={}){let{id:e=null,label:r="",hint:n="",checked:s=!1,disabled:o=!1,onChange:a=null}=t,i=f("label",{className:"yyt-toggle-label"});r&&i.appendChild(f("span",{text:r})),n&&i.appendChild(f("span",{className:"yyt-toggle-hint",text:n}));let l=f("input",{attrs:{type:"checkbox",disabled:o?"disabled":null}});l.checked=!!s;let d=f("span",{className:"yyt-toggle-slider"}),c=f("label",{className:"yyt-toggle"});c.appendChild(l),c.appendChild(d);let u=f("div",{className:"yyt-toggle-row"});u.appendChild(i),u.appendChild(c),i.addEventListener("click",p=>{p.preventDefault(),!l.disabled&&(l.checked=!l.checked,l.dispatchEvent(new Event("change",{bubbles:!0})))});let y={...Ue({id:e,kind:"toggle",el:u,style:t.style,className:t.className,attrs:t.attrs}),el:u,get(){return!!l.checked},set(p,{silent:g=!1}={}){l.checked=!!p,g||y._emitter.emit("change",!!p)},setDisabled(p){l.disabled=!!p}};return l.addEventListener("change",()=>{let p=!!l.checked;if(typeof a=="function")try{a(p,y)}catch(g){console.error("[toggle] onChange \u5F02\u5E38",g)}y._emitter.emit("change",p)}),y}var Zp=O(()=>{xt()});var ey=O(()=>{xt()});var ty=O(()=>{xt()});function Ft(t={}){let{id:e=null,label:r="",hint:n="",control:s=null,inline:o=!1}=t,a=f("div",{className:"yyt-form-group",style:o?{flexDirection:"row",alignItems:"center",gap:"12px"}:null});r&&a.appendChild(f("label",{text:r,style:o?{flex:"0 0 auto",minWidth:"120px"}:null}));let i=f("div",{style:o?{flex:"1",minWidth:"0"}:null});s&&Q(i,s),a.appendChild(i),n&&a.appendChild(f("div",{className:"yyt-form-hint",text:n}));let l=s?[s]:[];return{...Ue({id:e,kind:"formRow",el:a,style:t.style,className:t.className,attrs:t.attrs}),el:a,_children:l,get(){return s?.get?.()},set(d,c){s?.set?.(d,c)},setControl(d){i.innerHTML="",l.length=0,d&&(Q(i,d),l.push(d))}}}var ry=O(()=>{xt()});function ic(t={}){let{id:e=null,icon:r=null,name:n="",desc:s="",active:o=!1,disabled:a=!1,actions:i=[],onClick:l=null}=t,d=["yyt-list-row"];o&&d.push("yyt-list-row-active"),a&&d.push("yyt-list-row-disabled");let c=f("div",{className:d.join(" "),style:a?{opacity:"0.5",pointerEvents:"none"}:null});r&&c.appendChild(f("div",{className:"yyt-list-row-icon",text:r}));let u=f("div",{className:"yyt-list-row-main"}),y=f("div",{className:"yyt-list-row-name",text:n});u.appendChild(y);let p=null;s&&(p=f("div",{className:"yyt-list-row-desc",text:s}),u.appendChild(p)),c.appendChild(u);let g=null;if(i&&i.length){g=f("div",{className:"yyt-list-row-actions"});for(let h of i)Q(g,h);c.appendChild(g)}typeof l=="function"&&(c.style.cursor="pointer",c.addEventListener("click",h=>{h.target.closest(".yyt-list-row-actions")||(l(h,m),m._emitter.emit("click",h))}));let m={...Ue({id:e,kind:"listRow",el:c,style:t.style,className:t.className,attrs:t.attrs}),el:c,_children:i||[],setName(h){y.textContent=h==null?"":String(h)},setDesc(h){if(p)p.textContent=h==null?"":String(h);else{if(!h)return;p=f("div",{className:"yyt-list-row-desc",text:h}),u.appendChild(p)}},setActive(h){h?c.classList.add("yyt-list-row-active"):c.classList.remove("yyt-list-row-active")},setDisabled(h){h?(c.classList.add("yyt-list-row-disabled"),c.style.opacity="0.5",c.style.pointerEvents="none"):(c.classList.remove("yyt-list-row-disabled"),c.style.opacity="",c.style.pointerEvents="")}};return m}var ny=O(()=>{xt()});function cr(t={}){let{id:e=null,heading:r="",icon:n=null,actions:s=[],content:o=[]}=t,a=f("div",{className:"yyt-flow-section"}),i=null,l=null,d=null;if(r||n||s&&s.length){if(i=f("div",{className:"yyt-flow-heading"}),n&&(l=f("span",{className:"yyt-flow-heading-icon"}),Q(l,n),i.appendChild(l)),r&&i.appendChild(f("span",{text:r})),s&&s.length){d=f("div",{className:"yyt-flow-heading-action"});for(let p of s)Q(d,p);i.appendChild(d)}a.appendChild(i)}let c=f("div",{className:"yyt-flow-content"}),u=[];for(let p of o||[])p&&(Q(c,p),u.push(p));for(let p of s||[])p&&typeof p=="object"&&p.el&&u.push(p);return a.appendChild(c),{...Ue({id:e,kind:"flowSection",el:a,style:t.style,className:t.className,attrs:t.attrs}),el:a,_children:u,appendContent(p){p&&(Q(c,p),p&&typeof p=="object"&&p.el&&u.push(p))},clearContent(){c.innerHTML="";let p=u.filter(g=>(s||[]).includes(g));u.length=0;for(let g of p)u.push(g)},setHeading(p){if(!i)return;let g=i.querySelector("span:not(.yyt-flow-heading-icon):not(.yyt-flow-heading-action)");g&&(g.textContent=p==null?"":String(p))},setIcon(p){l&&(l.textContent=p==null?"":String(p))}}}var sy=O(()=>{xt()});function Za(){try{if(window.parent&&window.parent!==window&&window.parent.document)return window.parent.document}catch{}return document}function lc({title:t,width:e,wide:r}){let n=`yyt-ctrl-dialog-${++uv}`,s=f("div",{className:"yyt-dialog-overlay",attrs:{"data-dialog-id":n}}),o={};e&&e!=="380px"&&(o.width=e),o.maxHeight="calc(100vh - 32px)";let a=f("div",{className:`yyt-dialog${r?" yyt-dialog-wide":""}`,style:o}),i=f("div",{className:"yyt-dialog-header"});i.appendChild(f("span",{className:"yyt-dialog-title",text:t||""}));let l=f("button",{className:"yyt-dialog-close",attrs:{type:"button","aria-label":"close"},html:'<i class="fa-solid fa-times"></i>'});i.appendChild(l),a.appendChild(i);let d=f("div",{className:"yyt-dialog-body"});a.appendChild(d);let c=f("div",{className:"yyt-dialog-footer"});return a.appendChild(c),s.appendChild(a),{overlay:s,body:d,footer:c,closeBtn:l,id:n}}function cc(t){let e=Za();return e?.body?(e.body.appendChild(t),!0):!1}function dc(t){if(t?.parentNode)try{t.parentNode.removeChild(t)}catch{}}function pv(t={}){let{title:e="\u8BF7\u786E\u8BA4",message:r="",confirmText:n="\u786E\u5B9A",cancelText:s="\u53D6\u6D88",danger:o=!1,width:a="380px"}=t;return new Promise(i=>{let{overlay:l,body:d,footer:c,closeBtn:u}=lc({title:e,width:a,wide:!1}),y=(Za()||document).activeElement,p=f("div",{style:{color:"var(--yyt-text-secondary)",fontSize:"13px",lineHeight:"1.6"},text:r});d.appendChild(p);let g=f("button",{className:"yyt-btn yyt-btn-secondary",attrs:{type:"button"},text:s}),m=f("button",{className:`yyt-btn ${o?"yyt-btn-danger":"yyt-btn-primary"}`,attrs:{type:"button"},text:n});c.appendChild(g),c.appendChild(m);let h=!1,b=x=>{if(!h){h=!0,dc(l);try{y?.focus()}catch{}i(x)}};if(m.addEventListener("click",()=>b(!0)),g.addEventListener("click",()=>b(!1)),u.addEventListener("click",()=>b(!1)),l.addEventListener("click",x=>{x.target===l&&b(!1)}),l.addEventListener("keydown",x=>{x.key==="Escape"?(x.stopPropagation(),b(!1)):x.key==="Enter"&&(x.stopPropagation(),b(!0))}),!cc(l)){i(!1);return}(o?g:m).focus()})}function yv(t={}){let{title:e="\u8F93\u5165",message:r="",defaultValue:n="",placeholder:s="",confirmText:o="\u786E\u5B9A",cancelText:a="\u53D6\u6D88",validate:i=null,width:l="380px"}=t;return new Promise(d=>{let{overlay:c,body:u,footer:y,closeBtn:p}=lc({title:e,width:l,wide:!1}),g=(Za()||document).activeElement;r&&u.appendChild(f("div",{style:{color:"var(--yyt-text-secondary)",fontSize:"13px",lineHeight:"1.6",marginBottom:"8px"},text:r}));let m=f("input",{className:"yyt-input",attrs:{type:"text",placeholder:s}});m.value=String(n||""),u.appendChild(m);let h=f("div",{style:{color:"var(--yyt-danger, #f87171)",fontSize:"12px",marginTop:"6px",minHeight:"14px"}});u.appendChild(h);let b=f("button",{className:"yyt-btn yyt-btn-secondary",attrs:{type:"button"},text:a}),x=f("button",{className:"yyt-btn yyt-btn-primary",attrs:{type:"button"},text:o});y.appendChild(b),y.appendChild(x);let w=!1,T=S=>{if(!w){w=!0,dc(c);try{g?.focus()}catch{}d(S)}},I=()=>{let S=m.value.trim();if(typeof i=="function"){let A=i(S);if(A){h.textContent=A,m.focus();return}}T(S||null)};if(x.addEventListener("click",I),b.addEventListener("click",()=>T(null)),p.addEventListener("click",()=>T(null)),c.addEventListener("click",S=>{S.target===c&&T(null)}),m.addEventListener("keydown",S=>{S.key==="Enter"&&(S.stopPropagation(),I())}),c.addEventListener("keydown",S=>{S.key==="Escape"&&(S.stopPropagation(),T(null))}),!cc(c)){d(null);return}m.focus(),m.select()})}function fv(t={}){let{title:e="",body:r=null,buttons:n=[],width:s="480px",wide:o=!1,onMounted:a=null}=t,{overlay:i,body:l,footer:d,closeBtn:c}=lc({title:e,width:s,wide:o}),u=(Za()||document).activeElement;r&&Q(l,r);let y=!1,p,g=new Promise(h=>{p=h}),m=h=>{if(!y){y=!0,dc(i);try{u?.focus()}catch{}p(h)}};for(let h of n){let b=h.variant==="primary"?"yyt-btn-primary":h.variant==="danger"?"yyt-btn-danger":"yyt-btn-secondary",x=f("button",{className:`yyt-btn ${b}`,attrs:{type:"button"},text:h.label||""});x.addEventListener("click",()=>{try{h.onClick?.(m,l)}catch(w){dv.error("button onClick error",w),m(null)}}),d.appendChild(x)}if(c.addEventListener("click",()=>m(null)),i.addEventListener("click",h=>{h.target===i&&m(null)}),i.addEventListener("keydown",h=>{h.key==="Escape"&&(h.stopPropagation(),m(null))}),!cc(i))p(null);else if(typeof a=="function")try{a({overlay:i,body:l,close:m})}catch{}return{el:i,body:l,close:m,result:g}}var dv,uv,Ee,Po=O(()=>{xt();J();dv=N.createScope("Dialog"),uv=0;Ee={confirm:pv,prompt:yv,custom:fv}});function uc(t={}){let{id:e=null,items:r=[],align:n="start",gap:s="8px",wrap:o=!0}=t,i=f("div",{className:"yyt-toolbar",style:{display:"flex",alignItems:"center",justifyContent:{start:"flex-start",end:"flex-end",center:"center","space-between":"space-between"}[n]||"flex-start",gap:s,flexWrap:o?"wrap":"nowrap"}}),l=[];for(let d of r)d&&(Q(i,d),l.push(d));return{...Ue({id:e,kind:"toolbar",el:i,style:t.style,className:t.className,attrs:t.attrs}),el:i,_children:l,addItem(d){d&&(Q(i,d),l.push(d))},clear(){for(;i.firstChild;)i.removeChild(i.firstChild);for(let d of l)try{d?.destroy?.()}catch{}l.length=0}}}var oy=O(()=>{xt()});function pc(t={}){let{id:e=null,name:r="",desc:n="",active:s=!1,disabled:o=!1,builtin:a=!1,readonly:i=!1,metaChips:l=[],actions:d=[],onClick:c=null}=t,u=a||i,y=["yyt-list-row","yyt-preset-list-item"];s&&y.push("yyt-list-row-active"),o&&y.push("yyt-list-row-disabled"),u&&y.push("yyt-preset-list-item-readonly");let p=f("div",{className:y.join(" "),style:o?{opacity:"0.5",pointerEvents:"none"}:null}),g=f("span",{className:"yyt-preset-dot",style:{width:"8px",height:"8px",borderRadius:"50%",flexShrink:"0",marginRight:"8px",background:s?"var(--yyt-accent, #7bb7ff)":"transparent",border:s?"none":"1px solid var(--yyt-border, rgba(255,255,255,0.15))",transition:"background 0.15s ease"}});p.appendChild(g);let m=f("div",{className:"yyt-list-row-main",style:{flex:"1",minWidth:"0"}}),h=f("div",{style:{display:"flex",alignItems:"center",gap:"8px"}}),b=f("div",{className:"yyt-list-row-name",text:r,style:{fontWeight:"600"}});h.appendChild(b),a&&h.appendChild(f("span",{className:"yyt-preset-badge yyt-preset-badge-builtin",text:"\u5185\u7F6E",style:{fontSize:"10px",padding:"2px 6px",borderRadius:"999px",background:"var(--yyt-surface-3, rgba(255,255,255,0.06))",color:"var(--yyt-text-muted, rgba(255,255,255,0.5))",border:"1px solid var(--yyt-border, rgba(255,255,255,0.1))"}})),m.appendChild(h);let x=null;n&&(x=f("div",{className:"yyt-list-row-desc",text:n}),m.appendChild(x)),p.appendChild(m);let w=null;if(Array.isArray(l)&&l.length){w=f("div",{className:"yyt-preset-meta-chips",style:{display:"flex",gap:"6px",flexWrap:"wrap"}});for(let A of l)A&&w.appendChild(f("span",{className:"yyt-preset-meta-chip",text:String(A),style:{fontSize:"11px",padding:"2px 8px",borderRadius:"999px",background:"var(--yyt-surface-2, rgba(255,255,255,0.04))",color:"var(--yyt-text-secondary, rgba(255,255,255,0.6))",border:"1px solid var(--yyt-border-soft, rgba(255,255,255,0.04))"}}));p.appendChild(w)}let T=null,I=u?d.filter(A=>A?._kind!=="button"||!A._destructive):d;if(I&&I.length){T=f("div",{className:"yyt-list-row-actions"});for(let A of I)Q(T,A);p.appendChild(T)}typeof c=="function"&&(p.style.cursor="pointer",p.addEventListener("click",A=>{A.target.closest(".yyt-list-row-actions")||(c(A,S),S._emitter.emit("click",A))}));let S={...Ue({id:e,kind:"presetListItem",el:p,style:t.style,className:t.className,attrs:t.attrs}),el:p,_children:d||[],setActive(A){A?p.classList.add("yyt-list-row-active"):p.classList.remove("yyt-list-row-active"),g.style.background=A?"var(--yyt-accent, #7bb7ff)":"transparent",g.style.border=A?"none":"1px solid var(--yyt-border, rgba(255,255,255,0.15))"},setName(A){b.textContent=A==null?"":String(A)},setDesc(A){if(x)x.textContent=A==null?"":String(A);else{if(!A)return;x=f("div",{className:"yyt-list-row-desc",text:A}),m.appendChild(x)}},setDisabled(A){A?(p.classList.add("yyt-list-row-disabled"),p.style.opacity="0.5",p.style.pointerEvents="none"):(p.classList.remove("yyt-list-row-disabled"),p.style.opacity="",p.style.pointerEvents="")}};return S}var ay=O(()=>{xt()});function yc(t={}){let{id:e=null,values:r=[],placeholder:n="\u8F93\u5165\u540E\u56DE\u8F66\u6DFB\u52A0",suggestions:s=null,allowDuplicates:o=!1,maxChips:a=0,chipVariant:i="default",onChange:l=null,onAdd:d=null,onRemove:c=null}=t,u=s&&s.length?`yyt-chip-dl-${++gv}`:null,y=f("div",{className:"yyt-chip-group",style:{display:"flex",flexWrap:"wrap",gap:"6px",padding:"6px 8px",borderRadius:"var(--yyt-radius-sm, 6px)",border:"1px solid var(--yyt-control-border, rgba(255,255,255,0.08))",background:"var(--yyt-control-bg, transparent)",minHeight:"36px",alignItems:"center"}}),p=[],g={type:"text",placeholder:n,autocomplete:"off"};u&&(g.list=u);let m=f("input",{className:"yyt-chip-input",attrs:g,style:{flex:"1 1 auto",minWidth:"120px",border:"none",outline:"none",background:"transparent",color:"var(--yyt-text, inherit)",fontSize:"12px",padding:"4px 0"}}),h=null;if(u){h=f("datalist",{attrs:{id:u}});for(let R of s)h.appendChild(f("option",{attrs:{value:String(R)}}));y.appendChild(h)}function b(){return i==="danger"?"rgba(248,113,113,0.12)":i==="soft"?"var(--yyt-surface-2, rgba(255,255,255,0.04))":"var(--yyt-accent-soft, rgba(123,183,255,0.15))"}function x(){return i==="danger"?"rgba(248,113,113,0.25)":"var(--yyt-border, rgba(255,255,255,0.1))"}function w(){return i==="danger"?"#f87171":"var(--yyt-text, inherit)"}function T(R){let _=f("span",{className:"yyt-chip",style:{display:"inline-flex",alignItems:"center",gap:"4px",padding:"3px 4px 3px 10px",borderRadius:"999px",background:b(),border:`1px solid ${x()}`,color:w(),fontSize:"11px",fontWeight:"500"}});_.appendChild(f("span",{text:R,style:{lineHeight:"1"}}));let $=f("button",{attrs:{type:"button","aria-label":"remove"},text:"\xD7",style:{border:"none",background:"transparent",color:"inherit",cursor:"pointer",padding:"0 4px",fontSize:"14px",lineHeight:"1",opacity:"0.7"}});return $.addEventListener("click",F=>{F.stopPropagation(),A(R)}),$.addEventListener("mouseenter",()=>{$.style.opacity="1"}),$.addEventListener("mouseleave",()=>{$.style.opacity="0.7"}),_.appendChild($),_}function I(){let R=[];for(let _ of y.children)_===m||_===h||R.push(_);for(let _ of R)y.removeChild(_);for(let _ of p)y.insertBefore(T(_),m)}function S(R){let _=String(R||"").trim();if(!_||!o&&p.includes(_)||a>0&&p.length>=a)return!1;p.push(_),I();try{d?.(_,p.slice())}catch($){console.error("[chipGroup] onAdd \u5F02\u5E38",$)}try{l?.(p.slice())}catch($){console.error("[chipGroup] onChange \u5F02\u5E38",$)}return M._emitter.emit("change",p.slice()),!0}function A(R){let _=p.indexOf(R);if(_<0)return!1;p.splice(_,1),I();try{c?.(R,p.slice())}catch($){console.error("[chipGroup] onRemove \u5F02\u5E38",$)}try{l?.(p.slice())}catch($){console.error("[chipGroup] onChange \u5F02\u5E38",$)}return M._emitter.emit("change",p.slice()),!0}function P(){if(p.length!==0){p=[],I();try{l?.([])}catch(R){console.error("[chipGroup] onChange \u5F02\u5E38",R)}M._emitter.emit("change",[])}}for(let R of r){let _=String(R||"").trim();_&&(!o&&p.includes(_)||p.push(_))}y.appendChild(m),I(),m.addEventListener("keydown",R=>{if(R.key==="Enter"||R.key===","){R.preventDefault();let _=m.value.trim();_&&S(_)&&(m.value="")}else R.key==="Backspace"&&!m.value&&p.length&&A(p[p.length-1])}),m.addEventListener("blur",()=>{let R=m.value.trim();R&&S(R)&&(m.value="")}),y.addEventListener("click",R=>{R.target===y&&m.focus()});let M={...Ue({id:e,kind:"chipGroup",el:y,style:t.style,className:t.className,attrs:t.attrs}),el:y,get(){return p.slice()},set(R){p=[];for(let _ of Array.isArray(R)?R:[]){let $=String(_||"").trim();$&&(!o&&p.includes($)||p.push($))}I();try{l?.(p.slice())}catch(_){console.error("[chipGroup] onChange \u5F02\u5E38",_)}M._emitter.emit("change",p.slice())},addChip:S,removeChip:A,clear:P,setSuggestions(R){if(h){for(;h.firstChild;)h.removeChild(h.firstChild);for(let _ of R||[])h.appendChild(f("option",{attrs:{value:String(_)}}))}}};return M}var gv,iy=O(()=>{xt();gv=0});var ly=O(()=>{xt()});var Wt=O(()=>{Jp();Xp();Qp();Zp();ey();ty();ry();ny();sy();Po();oy();ay();iy();ly();xt()});function cy(t){return t?t.length!==void 0&&typeof t.get=="function"?t.get(0):t:null}function mv(t){return typeof t=="string"&&t.startsWith("builtin_")}function Zr(t={}){let{id:e,kind:r="generic",panelTitle:n="\u9884\u8BBE\u7BA1\u7406",panelHint:s="",store:o,renderEditor:a,renderExtras:i=null,renderListItemMeta:l=null,hasSwitchToButton:d=!1,onSwitchTo:c=null}=t;if(!o||typeof o.listPresets!="function")throw new Error("createPresetManagerPanel: store \u7F3A\u5C11\u5FC5\u8981\u7684 listPresets \u65B9\u6CD5");if(typeof a!="function")throw new Error("createPresetManagerPanel: \u5FC5\u987B\u63D0\u4F9B renderEditor");return{id:e,kind:r,renderTo(u){let y=cy(u);if(!y)return;if(y._yytPresetPanelCleanup)try{y._yytPresetPanelCleanup()}catch{}let p=()=>this.renderTo(u),g=o.listPresets(),m=typeof o.getCurrentPresetId=="function"?o.getCurrentPresetId():"",h=f("div",{className:"yyt-preset-manager-panel",style:{display:"flex",flexDirection:"column",gap:"14px"}});if(n||s){let R=f("div",{style:{display:"flex",flexDirection:"column",gap:"4px"}});n&&R.appendChild(f("div",{text:n,style:{fontSize:"15px",fontWeight:"700",color:"var(--yyt-text)"}})),s&&R.appendChild(f("div",{text:s,style:{fontSize:"12px",color:"var(--yyt-text-secondary)",lineHeight:"1.6"}})),h.appendChild(R)}let b=[],x=f("div",{style:{display:"flex",flexDirection:"column"}});if(g.length===0)x.appendChild(f("div",{text:'\u6682\u65E0\u9884\u8BBE\u3002\u70B9\u51FB\u4E0B\u65B9"\u65B0\u5EFA"\u521B\u5EFA\u7B2C\u4E00\u4E2A\u9884\u8BBE\u3002',style:{fontSize:"12px",color:"var(--yyt-text-muted)",padding:"12px 0",textAlign:"center"}}));else for(let R of g){let _=R.id===m,$=mv(R.id),F=typeof l=="function"?l(R)||[]:[],Y=[];d&&typeof c=="function"&&Y.push(te({label:_?"\u2713 \u5DF2\u52A0\u8F7D":"\u52A0\u8F7D",size:"small",variant:_?"ghost":"primary",disabled:_,onClick:ie=>{ie.stopPropagation();try{c(R.id)}catch(Z){zn.warn("onSwitchTo \u5F02\u5E38",{err:Z})}p()}})),Y.push(te({label:"\u590D\u5236",size:"small",variant:"ghost",title:"\u590D\u5236\u4E3A\u7528\u6237\u9884\u8BBE",onClick:async ie=>{ie.stopPropagation();try{let Z=o.duplicatePreset(R.id);Z?.id&&typeof o.setCurrentPresetId=="function"&&o.setCurrentPresetId(Z.id),p()}catch(Z){zn.warn("duplicate \u5F02\u5E38",{err:Z})}}})),$||(Y.push(te({label:"\u270E",size:"small",variant:"ghost",title:"\u91CD\u547D\u540D",onClick:async ie=>{ie.stopPropagation();let Z=await Ee.prompt({title:"\u91CD\u547D\u540D\u9884\u8BBE",defaultValue:R.name,placeholder:"\u9884\u8BBE\u540D",validate:we=>we?null:"\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"});Z&&Z!==R.name&&(o.renamePreset(R.id,Z),p())}})),Y.push(te({label:"\xD7",size:"small",variant:"ghost",title:"\u5220\u9664",onClick:async ie=>{ie.stopPropagation(),await Ee.confirm({title:"\u5220\u9664\u9884\u8BBE",message:`\u786E\u8BA4\u5220\u9664\u300C${R.name}\u300D\uFF1F\u6B64\u64CD\u4F5C\u4E0D\u53EF\u64A4\u9500\u3002`,confirmText:"\u5220\u9664",danger:!0})&&(o.deletePreset(R.id),p())}})));let re=pc({id:R.id,name:R.name,desc:R.description,active:_,builtin:$,metaChips:F,actions:Y,onClick:()=>{typeof o.setCurrentPresetId=="function"&&o.setCurrentPresetId(R.id),p()}});x.appendChild(re.el)}let w=te({label:"+ \u65B0\u5EFA\u9884\u8BBE",size:"small",variant:"primary",onClick:async()=>{let R=await Ee.prompt({title:"\u65B0\u5EFA\u9884\u8BBE",placeholder:"\u9884\u8BBE\u540D\uFF08\u5FC5\u586B\uFF09",validate:_=>_?null:"\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"});if(R)try{let _=o.createPreset({name:R});_?.id&&typeof o.setCurrentPresetId=="function"&&o.setCurrentPresetId(_.id),p()}catch(_){zn.warn("createPreset \u5931\u8D25",{err:_}),await Ee.confirm({title:"\u521B\u5EFA\u5931\u8D25",message:String(_?.message||_),confirmText:"\u786E\u5B9A"})}}}),T=cr({heading:"\u9884\u8BBE\u9009\u62E9",icon:"\u{1F4CB}",actions:[w.el],content:[x]});b.push(T),h.appendChild(T.el);let I=m?g.find(R=>R.id===m):null;if(I){let R=null;try{R=a(I,{readonly:!1,onChange:$=>{if(!(!$||typeof $!="object"))try{o.updatePreset(I.id,$)}catch(F){zn.warn("updatePreset \u5931\u8D25",{err:F})}},refresh:p})}catch($){zn.error("renderEditor \u5F02\u5E38",{err:$}),R=f("div",{text:`\u7F16\u8F91\u5668\u6E32\u67D3\u5F02\u5E38\uFF1A${$?.message||$}`,style:{color:"var(--yyt-danger, #f87171)",fontSize:"12px"}})}let _=cr({heading:`\u7F16\u8F91\u300C${I.name}\u300D`,icon:"\u270E",content:[R].filter(Boolean)});if(b.push(_),h.appendChild(_.el),typeof i=="function"){let $=null;try{$=i(I,{refresh:p})}catch(F){zn.warn("renderExtras \u5F02\u5E38",{err:F})}if($){let F=cr({heading:"\u9644\u52A0",icon:"\u{1F527}",content:[$]});b.push(F),h.appendChild(F.el)}}}else g.length>0&&h.appendChild(f("div",{text:"\u8BF7\u5728\u4E0A\u65B9\u5217\u8868\u9009\u62E9\u4E00\u4E2A\u9884\u8BBE\u4EE5\u7F16\u8F91",style:{fontSize:"12px",color:"var(--yyt-text-muted)",padding:"16px",textAlign:"center",border:"1px dashed var(--yyt-border, rgba(255,255,255,0.08))",borderRadius:"var(--yyt-radius-sm, 6px)"}}));let S=te({label:"\u2B06 \u5BFC\u5165",size:"small",variant:"ghost",onClick:async()=>{await hv(o,p)}}),A=te({label:"\u2B07 \u5BFC\u51FA",size:"small",variant:"ghost",onClick:()=>{bv(o,r)}}),P=te({label:"\u6E05\u7A7A\u5168\u90E8",size:"small",variant:"ghost",onClick:async()=>{await Ee.confirm({title:"\u6E05\u7A7A\u6240\u6709\u9884\u8BBE",message:"\u6B64\u64CD\u4F5C\u4F1A\u5220\u9664\u6240\u6709\u7528\u6237\u9884\u8BBE\uFF08\u5185\u7F6E\u9884\u8BBE\u4E0D\u53D7\u5F71\u54CD\uFF09\uFF0C\u4E0D\u53EF\u64A4\u9500\u3002",confirmText:"\u6E05\u7A7A",danger:!0})&&typeof o.resetAll=="function"&&(o.resetAll(),p())}}),M=uc({items:[S,A,P],align:"end",gap:"8px"});h.appendChild(M.el),y.innerHTML="",y.appendChild(h),y._yytPresetPanelCleanup=()=>{for(let R of b)try{R.destroy()}catch{}delete y._yytPresetPanelCleanup}},destroy(u){let y=cy(u);if(y?._yytPresetPanelCleanup)try{y._yytPresetPanelCleanup()}catch{}},getStyles(){return""}}}async function hv(t,e){if(typeof t.importPresets!="function"){await Ee.confirm({title:"\u4E0D\u652F\u6301\u5BFC\u5165",message:"\u5F53\u524D\u9884\u8BBE\u7C7B\u578B\u4E0D\u652F\u6301\u5BFC\u5165\u3002",confirmText:"\u786E\u5B9A"});return}let r=f("textarea",{className:"yyt-textarea",attrs:{placeholder:"\u7C98\u8D34\u5BFC\u51FA\u7684 JSON"},style:{width:"100%",minHeight:"180px",fontSize:"12px",fontFamily:"monospace"}}),n=Ee.custom({title:"\u5BFC\u5165\u9884\u8BBE",width:"520px",body:r,buttons:[{label:"\u53D6\u6D88",variant:"ghost",onClick:o=>o(null)},{label:"\u4ECE\u6587\u4EF6\u2026",variant:"ghost",onClick:()=>{let o=f("input",{attrs:{type:"file",accept:"application/json,.json"}});o.addEventListener("change",()=>{let a=o.files?.[0];if(!a)return;let i=new FileReader;i.onload=()=>{r.value=String(i.result||""),r.focus()},i.readAsText(a)}),o.click()}},{label:"\u5BFC\u5165",variant:"primary",onClick:async o=>{let a=r.value.trim();if(!a){o(null);return}let i;try{i=JSON.parse(a)}catch(l){await Ee.confirm({title:"JSON \u89E3\u6790\u5931\u8D25",message:String(l?.message||l),confirmText:"\u786E\u5B9A"});return}try{let l=t.importPresets(i);o(l)}catch(l){await Ee.confirm({title:"\u5BFC\u5165\u5931\u8D25",message:String(l?.message||l),confirmText:"\u786E\u5B9A"})}}}]});setTimeout(()=>r.focus(),0);let s=await n.result;s&&(s.added>0||s.imported>0)&&e()}function bv(t,e){if(typeof t.exportAll!="function"){Ee.confirm({title:"\u4E0D\u652F\u6301\u5BFC\u51FA",message:"\u5F53\u524D\u9884\u8BBE\u7C7B\u578B\u4E0D\u652F\u6301\u5BFC\u51FA\u3002",confirmText:"\u786E\u5B9A"});return}let r=t.exportAll(),n=JSON.stringify(r,null,2),s=f("textarea",{className:"yyt-textarea",style:{width:"100%",minHeight:"220px",fontSize:"12px",fontFamily:"monospace"}});s.value=n,s.readOnly=!0,Ee.custom({title:`\u5BFC\u51FA ${e||""} \u9884\u8BBE`,width:"600px",body:s,buttons:[{label:"\u5173\u95ED",variant:"ghost",onClick:o=>o(null)},{label:"\u590D\u5236\u5230\u526A\u8D34\u677F",variant:"ghost",onClick:async()=>{try{await navigator.clipboard.writeText(n)}catch{s.select();try{document.execCommand("copy")}catch{}}}},{label:"\u4E0B\u8F7D JSON",variant:"primary",onClick:()=>{try{let o=new Blob([n],{type:"application/json"}),a=URL.createObjectURL(o),i=f("a",{attrs:{href:a,download:`${e||"preset"}_${Date.now()}.json`}});document.body.appendChild(i),i.click(),setTimeout(()=>{try{document.body.removeChild(i)}catch{}try{URL.revokeObjectURL(a)}catch{}},100)}catch(o){zn.warn("\u4E0B\u8F7D\u5931\u8D25",{err:o})}}}]})}var zn,No=O(()=>{Wt();J();zn=N.createScope("PresetManagerBase")});var uy={};ge(uy,{ApiPresetPanel:()=>dy,default:()=>Sv});function wv(t,{onChange:e,readonly:r}){let n=f("div",{style:{display:"flex",flexDirection:"column",gap:"12px"}}),s=t.apiConfig||{};Q(n,Ft({label:"\u63CF\u8FF0",control:ve({value:t.description||"",placeholder:"\u53EF\u9009 \u2014 \u5907\u6CE8\u7528\u9014",disabled:r,onChange:i=>e({description:i})})})),Q(n,Qe({label:"\u4F7F\u7528\u4E3B API",hint:"\u5F00\u542F\u540E\u5FFD\u7565\u4E0B\u65B9 URL/Key/Model\uFF0C\u76F4\u63A5\u590D\u7528 SillyTavern \u4E3B\u8FDE\u63A5",checked:s.useMainApi!==!1,disabled:r,onChange:i=>e({apiConfig:{...s,useMainApi:i}})})),Q(n,Qe({label:"\u6D41\u5F0F\u8F93\u51FA\uFF08stream\uFF09",hint:"\u9010\u5B57\u63A5\u6536\u54CD\u5E94",checked:s.stream===!0,disabled:r,onChange:i=>e({apiConfig:{...s,stream:i}})})),Q(n,Ft({label:"API URL",control:ve({value:s.url||"",placeholder:"https://api.example.com/v1",disabled:r,onChange:i=>e({apiConfig:{...s,url:i}})})})),Q(n,Ft({label:"API Key",control:ve({value:s.apiKey||"",placeholder:"sk-...",disabled:r,attrs:{type:"password"},onChange:i=>e({apiConfig:{...s,apiKey:i}})})})),Q(n,Ft({label:"\u6A21\u578B",control:ve({value:s.model||"",placeholder:"gpt-4 / gemini-pro / claude-...",disabled:r,onChange:i=>e({apiConfig:{...s,model:i}})})}));let o=f("div",{style:{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:"10px"}});function a(i,l,d,c="1"){let u=f("div",{style:{display:"flex",flexDirection:"column",gap:"4px"}});u.appendChild(f("label",{text:i,style:{fontSize:"11px",color:"var(--yyt-text-secondary)",fontWeight:"600"}}));let y=f("input",{className:"yyt-input",attrs:{type:"number",step:c,disabled:r?"disabled":null},style:{padding:"6px 10px",fontSize:"12px"}});return y.value=String(s[l]??d),y.addEventListener("change",()=>{let p=Number(y.value);Number.isFinite(p)&&e({apiConfig:{...s,[l]:p}})}),u.appendChild(y),u}return o.appendChild(a("max_tokens","max_tokens",4096,"1")),o.appendChild(a("temperature","temperature",.7,"0.05")),o.appendChild(a("top_p","top_p",.9,"0.05")),Q(n,o),n}function vv(t){let e=t.apiConfig||{},r=[];return e.useMainApi!==!1?r.push("\u4E3B API"):r.push(e.model||"\u81EA\u5B9A\u4E49"),t.starred&&r.push("\u2605"),r}var en,xv,dy,Sv,py=O(()=>{Wt();ws();J();No();en=N.createScope("ApiPresetPanel"),xv={listPresets(){return Qr().map(t=>({id:t.name,name:t.name,description:t.description||"",apiConfig:t.apiConfig||{},starred:t.starred===!0,createdAt:t.createdAt,updatedAt:t.updatedAt}))},getPreset(t){if(!t)return null;let e=Bn(t);return e?{id:e.name,...e,description:e.description||""}:null},getCurrentPresetId(){return rc()||""},setCurrentPresetId(t){if(!t)return!1;try{return!!Qa(t)}catch(e){return en.warn("switchToPreset \u5931\u8D25",{err:e}),!1}},createPreset(t){let e=String(t?.name||"").trim();if(!e)return en.warn("createPreset: name \u7F3A\u5931"),null;let r=Ja({name:e,description:t?.description||"",apiConfig:t?.apiConfig||{}});return r?.success?{id:r.preset.name,...r.preset,description:r.preset.description||""}:(en.warn("createPreset \u5931\u8D25",{msg:r?.message}),null)},updatePreset(t,e){if(!t)return null;let r=Zl(t,e);return r?.success?{id:r.preset.name,...r.preset,description:r.preset.description||""}:(en.warn("updatePreset \u5931\u8D25",{id:t,msg:r?.message}),null)},deletePreset(t){if(!t)return!1;try{let e=Xa(t);return!!(e?.success??e===!0)}catch(e){return en.warn("deletePreset \u5931\u8D25",{err:e}),!1}},duplicatePreset(t,e={}){if(!t)return null;let r=e.nameSuffix||"_\u526F\u672C",n=`${t}${r}`;try{let s=tc(t,n);return s?.success?{id:s.preset.name,...s.preset,description:s.preset.description||""}:null}catch(s){return en.warn("duplicatePreset \u5931\u8D25",{err:s}),null}},renamePreset(t,e){if(!t||!e)return null;try{let r=ec(t,e);return r?.success?{id:r.preset?.name||e,...r.preset,description:r.preset?.description||""}:null}catch(r){return en.warn("renamePreset \u5931\u8D25",{err:r}),null}},exportAll(){let t=nc();try{return{version:1,exportedAt:Date.now(),presets:JSON.parse(t)}}catch{return{version:1,exportedAt:Date.now(),presets:[]}}},importPresets(t){if(!t||typeof t!="object")return{added:0};let e=Array.isArray(t.presets)?t.presets:[t],r=JSON.stringify(e);return{added:sc(r,{overwrite:!1})?.imported||0}},resetAll(){let t=Qr();for(let e of t)try{Xa(e.name)}catch{}}};dy=Zr({id:"apiPresetPanel",kind:"api",panelTitle:"API \u9884\u8BBE",panelHint:'\u7BA1\u7406\u591A\u7EC4 API \u8FDE\u63A5\u914D\u7F6E\u3002\u70B9\u51FB"\u52A0\u8F7D"\u6FC0\u6D3B\u67D0\u4E2A\u9884\u8BBE\u4F5C\u4E3A\u5F53\u524D API\uFF1B\u5176\u4ED6\u5DE5\u5177\u53EF\u5728\u914D\u7F6E\u9762\u677F\u4E2D\u6309\u9884\u8BBE\u540D\u5F15\u7528\u3002',store:xv,renderEditor:wv,renderListItemMeta:vv,hasSwitchToButton:!0,onSwitchTo:t=>{try{Qa(t)}catch(e){en.warn("switchToPreset",{err:e})}}}),Sv=dy});function gc(){return`wb_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`}function rn(){let t=Ke.get(fc);return!t||typeof t!="object"?{}:t}function ti(t){Ke.set(fc,t)}function jn(t){return typeof t=="string"&&t.startsWith(Tv)}function yy(t){return jn(t)&&ei.find(e=>e.id===t)||null}function mc(t){if(!Array.isArray(t)){ei=[];return}ei=t.map(e=>tn({...e,id:String(e?.id||"")})).filter(e=>jn(e.id))}function tn(t={}){let e=String(t.id||gc()),r=Array.isArray(t.bookList)?t.bookList.map(n=>({bookName:String(n?.bookName||""),enabled:n?.enabled!==!1,entryOverrides:n?.entryOverrides&&typeof n.entryOverrides=="object"?n.entryOverrides:{}})).filter(n=>n.bookName):[];return{id:e,name:String(t.name||"").trim()||"\u672A\u547D\u540D\u9884\u8BBE",description:String(t.description||""),bindingMode:t.bindingMode===xr.CUSTOM?xr.CUSTOM:xr.CHARACTER_CARD,includeDisabled:t.includeDisabled===!0,bookList:r,createdAt:Number.isFinite(t.createdAt)?t.createdAt:Date.now(),updatedAt:Number.isFinite(t.updatedAt)?t.updatedAt:Date.now()}}function _v(){let t=rn(),e=new Set,r=[];for(let s of ei){let o=t[s.id];o?(r.push(tn(o)),e.add(s.id)):r.push(s)}let n=Object.values(t).map(tn).filter(s=>!e.has(s.id)).sort((s,o)=>o.updatedAt-s.updatedAt);return r.push(...n),r}function Lo(t){if(!t)return null;let e=rn();return e[t]?tn(e[t]):jn(t)?yy(t):null}function hc(){let t=Ke.get($o);return typeof t=="string"&&t?t:""}function Ev(){let t=hc();return t?Lo(t):null}function Av(t){if(t&&jn(t))return Ke.set($o,t),G.emit(W.PRESET_ACTIVATED,{kind:"worldbook",id:t}),!0;let e=rn();return t&&!e[t]?(Kn.warn(`setCurrentPresetId \u627E\u4E0D\u5230\u9884\u8BBE: ${t}`),!1):(Ke.set($o,t||""),G.emit(W.PRESET_ACTIVATED,{kind:"worldbook",id:t}),!0)}function ri(t={}){let e=tn({...t,id:gc(),createdAt:Date.now(),updatedAt:Date.now()}),r=rn();return r[e.id]=e,ti(r),G.emit(W.PRESET_CREATED,{kind:"worldbook",id:e.id}),Kn.info(`\u521B\u5EFA\u9884\u8BBE: ${e.id} (${e.name})`),e}function fy(t,e={},{silent:r=!1}={}){if(!t)return null;let n=rn(),s=n[t];if(!s&&jn(t)&&(s=yy(t)),!s)return Kn.warn(`updatePreset \u627E\u4E0D\u5230\u9884\u8BBE: ${t}`),null;let o=tn({...s,...e,id:t,createdAt:s.createdAt,updatedAt:Date.now()});return n[t]=o,ti(n),r||G.emit(W.PRESET_UPDATED,{kind:"worldbook",id:t}),o}function Cv(t){if(!t)return!1;if(jn(t))return Kn.warn(`\u62D2\u7EDD\u5220\u9664\u5185\u7F6E\u9884\u8BBE: ${t}`),!1;let e=rn();return e[t]?(delete e[t],ti(e),hc()===t&&Ke.set($o,""),G.emit(W.PRESET_DELETED,{kind:"worldbook",id:t}),Kn.info(`\u5220\u9664\u9884\u8BBE: ${t}`),!0):!1}function kv(t,{nameSuffix:e=" \u526F\u672C"}={}){let r=Lo(t);return r?ri({...r,id:void 0,name:`${r.name}${e}`}):null}function Iv(t,e){return jn(t)?(Kn.warn(`\u62D2\u7EDD\u91CD\u547D\u540D\u5185\u7F6E\u9884\u8BBE: ${t}`),null):fy(t,{name:String(e||"").trim()||"\u672A\u547D\u540D\u9884\u8BBE"})}function Rv(){return{version:1,exportedAt:Date.now(),presets:Object.values(rn()).map(tn)}}function Mv(t){if(!t||typeof t!="object")return{added:0,skipped:0};let e=Array.isArray(t.presets)?t.presets:[],r=rn(),n=0,s=0;for(let o of e){let a=tn({...o,id:gc(),createdAt:Date.now(),updatedAt:Date.now()});r[a.id]=a,n+=1}return ti(r),n>0&&G.emit(W.PRESET_IMPORTED,{kind:"worldbook",count:n}),{added:n,skipped:s}}function Pv(){Ke.set(fc,{}),Ke.set($o,""),Kn.info("\u5DF2\u6E05\u7A7A\u6240\u6709\u4E16\u754C\u4E66\u9884\u8BBE")}var Kn,fc,$o,xr,Tv,ei,wt,Ss=O(()=>{Ve();ct();J();Kn=N.createScope("WorldbookPresetStore"),fc="worldbook_presets",$o="worldbook_current_preset",xr=Object.freeze({CHARACTER_CARD:"character_card",CUSTOM:"custom"});Tv="builtin_worldbook_",ei=[];wt={listPresets:_v,getPreset:Lo,getCurrentPresetId:hc,getCurrentPreset:Ev,setCurrentPresetId:Av,createPreset:ri,updatePreset:fy,deletePreset:Cv,duplicatePreset:kv,renamePreset:Iv,exportAll:Rv,importPresets:Mv,resetAll:Pv,BINDING_MODES:xr}});function nn(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window}function ni(){return nn()?.SillyTavern||null}function $e(t){return t==null?"":String(t).trim()}function $v(t){if(!t)return"";let e=[t.content,t.mes,t.message,t.text,t?.data?.content];for(let r of e)if(typeof r=="string"&&r.trim())return r.trim();return""}function Lv(t){let e=String(t?.role||"").trim().toLowerCase();return e==="assistant"||e==="ai"?"assistant":e==="system"?"system":e==="user"||t?.is_user===!0?"user":t?.is_system===!0?"system":"assistant"}function my(t=""){let e=String(t||"").trim();if(!e)return"empty";let r=0;for(let n=0;n<e.length;n+=1)r=(r<<5)-r+e.charCodeAt(n),r|=0;return`fp_${Math.abs(r).toString(36)}`}function hy(t={}){let e=$e(t.chatId)||"chat_default",r=$e(t.messageId)||"latest";return`${e}::${r}`}function by(t={}){let e=hy(t),r=$e(t.effectiveSwipeId)||"swipe:current",n=$e(t.assistantContentFingerprint)||"empty";return`${e}::${r}::${n}`}function Ov(t={}){let e=by(t),r=$e(t.eventType)||"MANUAL",n=$e(t.traceId)||xy("manual");return`${e}::${r}::${n}`}function xy(t="trace"){return`${t}_${Date.now()}_${Math.random().toString(36).slice(2,8)}`}function wy(){let t=ni();try{let e=t?.getContext?.()||null;if(Array.isArray(e?.chat))return e.chat}catch{}return Array.isArray(t?.chat)?t.chat:[]}function vy(t=[]){let e=[],r=null,n=null;return t.forEach((s,o)=>{let a=Lv(s),i=$v(s);if(!i)return;let l=$e(s?.messageId??s?.message_id??s?.id??s?.mid??s?.mesid??s?.chat_index??o),d=$e(s?.swipe_id??s?.swipeId??s?.swipe??""),c={role:a,content:i,sourceId:l,swipeId:d,raw:s,index:o};e.push(c),a==="user"&&(r=c),a==="assistant"&&(n=c)}),{messages:e,lastUserMessage:r,lastAiMessage:n}}function Dv(t,e,r){return $e(e?.chatId??e?.chat_id??t?.chatId??t?.chat_id??t?.this_chid??r?.id??"chat_default")||"chat_default"}async function bc(){let t=ni();if(!t)return null;try{let e=t.this_chid,r=t.characters||[];if(e>=0&&e<r.length){let n=r[e];return{id:e,name:n?.name||"",description:n?.description||"",personality:n?.personality||"",scenario:n?.scenario||"",firstMes:n?.first_mes||"",mesExample:n?.mes_example||""}}}catch(e){Nv.error("\u83B7\u53D6\u89D2\u8272\u4FE1\u606F\u5931\u8D25:",e)}return null}function Bv(t="",e=null){let r=String(t||""),n=e?.YouYouToolkit_toolOutputs;return n&&typeof n=="object"&&Object.values(n).forEach(s=>{let o=String(s?.blockText||s?.content||"").trim();o&&r.includes(o)&&(r=r.replace(o,"").trimEnd())}),r.trim()}function zv(t,e={}){let r=Array.isArray(t?.messages)?t.messages:[],n=$e(e.messageId),s=$e(e.swipeId);if(!n)return t?.lastAiMessage||null;let o=r.filter(i=>i.role==="assistant"),a=o.find(i=>i.sourceId!==n?!1:s?$e(i.swipeId)===s:!0);return a||o.find(i=>i.sourceId===n)||null}function Sy({api:t,stContext:e,character:r,conversation:n,targetAssistantMessage:s,runSource:o="MANUAL"}={}){let a=n?.messages||[],i=n?.lastUserMessage||null,l=$e(s?.sourceId)||"",d=$e(s?.swipeId)||"swipe:current",c=s?.content||"",u=Bv(c,s?.raw||null),y=my(c),p=my(u),g=Dv(t,e,r),m=xy(String(o||"manual").toLowerCase()),h=hy({chatId:g,messageId:l}),b=by({chatId:g,messageId:l,effectiveSwipeId:d,assistantContentFingerprint:p});return{startedAt:Date.now(),runSource:o,traceId:m,chatId:g,messageId:l,confirmedAssistantMessageId:l,slotBindingKey:h,slotRevisionKey:b,slotTransactionId:Ov({chatId:g,messageId:l,effectiveSwipeId:d,assistantContentFingerprint:p,eventType:o,traceId:m}),executionKey:b,lastAiMessage:c,assistantContentFingerprint:y,assistantBaseText:u,assistantBaseFingerprint:p,lastAiMessageSwipeId:d,confirmedAssistantSwipeId:d,effectiveSwipeId:d,sourceMessageId:l,sourceSwipeId:d,lastUserMessage:i?.content||"",userMessage:i?.content||"",targetAssistantMessage:s,chatMessages:a,characterCard:r,chatHistory:a,input:{userMessage:i?.content||"",lastAiMessage:c,assistantBaseText:u,extractedContent:"",previousToolOutput:"",context:{character:r?.name||"",chatLength:a.length||0}},config:{},status:"pending"}}async function Un({runSource:t="MANUAL"}={}){let e=ni(),r=e?.getContext?.()||null,n=await bc(),s=wy(),o=vy(s),a=o?.lastAiMessage||null;return Sy({api:e,stContext:r,character:n,conversation:o,targetAssistantMessage:a,runSource:t})}async function Fn({messageId:t,swipeId:e="",runSource:r="AUTO"}={}){let n=ni(),s=n?.getContext?.()||null,o=await bc(),a=wy(),i=vy(a),l=zv(i,{messageId:t,swipeId:e});return Sy({api:n,stContext:s,character:o,conversation:i,targetAssistantMessage:l,runSource:r})}var Nv,Wn=O(()=>{J();Nv=N.createScope("ExecutionContext")});function Oo(){try{if(typeof TavernHelper<"u"&&TavernHelper)return TavernHelper}catch{}return nn()?.TavernHelper||null}function Ty(){try{if(typeof SillyTavern<"u"&&SillyTavern)return SillyTavern}catch{}return nn()?.SillyTavern||null}function Ts(t){return Array.isArray(t)?Array.from(new Set(t.map(e=>String(e||"").trim()).filter(Boolean))):[]}function xc(t){if(Array.isArray(t))return t.map(e=>typeof e=="string"?e:e&&typeof e=="object"?e.name||e.id||e.title||JSON.stringify(e):String(e??""));if(t&&typeof t=="object"){let e={};return Object.keys(t).forEach(r=>{let n=t[r];Array.isArray(n)?e[r]=n.map(s=>typeof s=="string"?s:s&&typeof s=="object"?s.name||s.id||s.title||"[object]":String(s??"")):n&&typeof n=="object"?e[r]="[object]":e[r]=n}),e}return t}function jv(t={}){let e=typeof t.content=="string"?t.content.trim():"";if(!e)return"";let r=[t.comment,t.key,t.keysecondary,t.text].map(n=>String(n||"").trim()).find(Boolean);return r&&r!==e?`## ${r}
${e}`:e}function si(){return Array.isArray(wc)?[...wc]:[]}async function oi(t){if(t||(t=Oo()),!t||typeof t.getCharLorebooks!="function")return[];try{let e=await Promise.resolve(t.getCharLorebooks({type:"all"}));return Ts([e?.primary,e?.secondary,...Array.isArray(e?.additional)?e.additional:[]])}catch(e){return Hn.warn("\u83B7\u53D6\u89D2\u8272\u7ED1\u5B9A\u4E16\u754C\u4E66\u5931\u8D25:",e),[]}}async function Uv(t,e){if(t&&typeof t.getLorebooks=="function")try{let r=Ts(await Promise.resolve(t.getLorebooks()));if(r.length>0)return r}catch(r){Hn.warn("\u83B7\u53D6\u5168\u90E8\u4E16\u754C\u4E66\u5217\u8868\u5931\u8D25:",r)}if(e&&typeof e.getWorldBooks=="function")try{let r=await Promise.resolve(e.getWorldBooks()),n=Ts(Array.isArray(r)?r.map(s=>s?.name??s):[]);if(n.length>0)return n}catch(r){Hn.warn("\u4ECE SillyTavern \u83B7\u53D6\u4E16\u754C\u4E66\u5217\u8868\u5931\u8D25:",r)}return[]}async function Do(){let t=Oo(),e=Ty(),r={checkedAt:Date.now(),hasGlobalTavernHelper:(()=>{try{return typeof TavernHelper<"u"&&!!TavernHelper}catch{return!1}})(),hasParentTavernHelper:!!nn()?.TavernHelper,hasGlobalSillyTavern:(()=>{try{return typeof SillyTavern<"u"&&!!SillyTavern}catch{return!1}})(),hasParentSillyTavern:!!nn()?.SillyTavern,helperKeys:t?Object.keys(t).sort():[],stKeys:e?Object.keys(e).sort():[],getLorebooksType:typeof t?.getLorebooks,getCharLorebooksType:typeof t?.getCharLorebooks,getLorebookEntriesType:typeof t?.getLorebookEntries,getWorldBooksType:typeof e?.getWorldBooks,characterWorldbooks:[],allWorldbooks:[],combinedWorldbooks:[],rawResults:{},errors:[]};try{r.rawResults.getLorebooks=t&&typeof t.getLorebooks=="function"?xc(await Promise.resolve(t.getLorebooks())):"[unavailable]"}catch(a){r.errors.push(`getLorebooks: ${a?.message||a}`)}try{r.rawResults.getCharLorebooks=t&&typeof t.getCharLorebooks=="function"?xc(await Promise.resolve(t.getCharLorebooks({type:"all"}))):"[unavailable]"}catch(a){r.errors.push(`getCharLorebooks: ${a?.message||a}`)}try{r.rawResults.getWorldBooks=e&&typeof e.getWorldBooks=="function"?xc(await Promise.resolve(e.getWorldBooks())):"[unavailable]"}catch(a){r.errors.push(`getWorldBooks: ${a?.message||a}`)}let n=await oi(t),s=await Uv(t,e),o=Ts([...n,...s]);return r.characterWorldbooks=[...n],r.allWorldbooks=[...s],r.combinedWorldbooks=[...o],Kv=r,wc=o,[...o]}async function ai(t){let e="";if(typeof t=="string"?e=t:t&&typeof t=="object"&&(e=t?.worldbooks?.presetId||""),!e)return"";let r=Lo(e);if(!r)return Hn.warn(`buildSelectedWorldbookContent: \u9884\u8BBE\u4E0D\u5B58\u5728 ${e}`),"";let n=r.includeDisabled===!0,s=[];if(r.bindingMode==="character_card"){let l=Oo(),d=Ty(),c=await oi(l),u=new Map((r.bookList||[]).map(y=>[String(y.bookName||""),y]));for(let y of Ts(c)){let p=u.get(y);p&&p.enabled===!1||s.push(y)}}else s=(r.bookList||[]).filter(l=>l&&l.bookName&&l.enabled!==!1).map(l=>l.bookName);if(s=Ts(s),s.length===0)return"";let o=Oo();if(!o||typeof o.getLorebookEntries!="function")return Hn.warn("TavernHelper.getLorebookEntries \u4E0D\u53EF\u7528\uFF0C\u65E0\u6CD5\u8BFB\u53D6\u4E16\u754C\u4E66\u5185\u5BB9\u3002"),"";let a=new Map((r.bookList||[]).map(l=>[l.bookName,l.entryOverrides||{}])),i=[];for(let l of s)try{let d=await o.getLorebookEntries(l),c=Array.isArray(d)?d:[],u=a.get(l)||{},p=c.filter(g=>n||g?.enabled!==!1&&!g?.disable).filter(g=>{let m=u[String(g?.uid??"")];return m&&typeof m.enabled=="boolean"?m.enabled:!0}).map(jv).filter(Boolean).join(`

`);p&&i.push(`[\u4E16\u754C\u4E66\uFF1A${l}]
${p}`)}catch(d){Hn.warn(`\u8BFB\u53D6\u4E16\u754C\u4E66\u5931\u8D25: ${l}`,d)}return i.join(`

---

`)}async function _y(t){if(!t)return[];let e=Oo();if(!e||typeof e.getLorebookEntries!="function")return[];try{let r=await e.getLorebookEntries(t);return Array.isArray(r)?r:[]}catch(r){return Hn.warn(`getEntriesForBook \u5931\u8D25: ${t}`,r),[]}}var Hn,wc,Kv,Bo=O(()=>{Wn();J();Ss();Hn=N.createScope("ToolWorldbookService"),wc=[],Kv=null});function Ey(t){if(!t)return"";let e=String(t).trim();return e=e.replace(/([a-z0-9])([A-Z])/g,"$1_$2"),e.toUpperCase()}function ii(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window}function wr(){try{return ii()?.SillyTavern||null}catch{return null}}function _s(t){try{return(t||wr())?.getContext?.()||null}catch{return null}}function vc(t,e){if(!t)return null;let r=typeof t?.on=="function"||typeof t?.addListener=="function",n=typeof t?.off=="function"||typeof t?.removeListener=="function";return!r||!n?null:{source:e,eventSource:t,capabilities:{on:typeof t?.on=="function",off:typeof t?.off=="function",addListener:typeof t?.addListener=="function",removeListener:typeof t?.removeListener=="function"}}}function Fv(){let t=ii(),e=wr(),r=_s(e),s=[vc(e?.eventSource,"SillyTavern.eventSource"),vc(r?.eventSource,"SillyTavern.getContext().eventSource"),vc(t?.eventSource,"topWindow.eventSource")].filter(Boolean)[0]||null,o=e?.eventTypes||e?.event_types||r?.eventTypes||r?.event_types||t?.eventTypes||t?.event_types||{};return{topWindow:t,api:e,context:r,eventSource:s?.eventSource||null,eventTypes:o,source:s?.source||"unavailable",capabilities:s?.capabilities||null,hasBridge:!!s?.eventSource}}var Ht,Ze,Wv,Ay,Sc,Nt,zo=O(()=>{J();Ht=N.createScope("HostEvents"),Ze=Object.freeze({APP_READY:"APP_READY",MESSAGE_SENT:"MESSAGE_SENT",MESSAGE_RECEIVED:"MESSAGE_RECEIVED",MESSAGE_UPDATED:"MESSAGE_UPDATED",MESSAGE_DELETED:"MESSAGE_DELETED",MESSAGE_EDITED:"MESSAGE_EDITED",MESSAGE_SWIPED:"MESSAGE_SWIPED",USER_MESSAGE_RENDERED:"USER_MESSAGE_RENDERED",CHARACTER_MESSAGE_RENDERED:"CHARACTER_MESSAGE_RENDERED",IMPERSONATE_READY:"IMPERSONATE_READY",GENERATION_STARTED:"GENERATION_STARTED",GENERATION_STOPPED:"GENERATION_STOPPED",GENERATION_ENDED:"GENERATION_ENDED",GENERATION_AFTER_COMMANDS:"GENERATION_AFTER_COMMANDS",CHAT_CHANGED:"CHAT_CHANGED",CHAT_CREATED:"CHAT_CREATED",CHAT_DELETED:"CHAT_DELETED",CHARACTER_PAGE_LOADED:"CHARACTER_PAGE_LOADED",CHARACTER_EDITOR_OPENED:"CHARACTER_EDITOR_OPENED",CHARACTER_EDITED:"CHARACTER_EDITED",WORLDINFO_UPDATED:"WORLDINFO_UPDATED"});Wv=1500,Ay=20,Sc=class{constructor(){this._bridge=null,this._pending=[],this._initAttempts=0,this._retryTimer=null,this._readyResolvers=[],this._initialized=!1,this._disposed=!1}subscribe(e,r,n={}){if(!e||typeof r!="function")return Ht.warn("subscribe \u65E0\u6548\u53C2\u6570",{eventKey:e,handlerType:typeof r}),()=>{};if(this._disposed)return Ht.warn("subscribe \u5728 dispose \u4E4B\u540E\u88AB\u8C03\u7528",{eventKey:e}),()=>{};let s={key:Ey(e),rawKey:e,handler:r,options:n,attached:!1,_hostName:"",_hostUnsubscribe:null,_disposed:!1};return this._pending.push(s),this._ensureInitialized(),this._bridge?.hasBridge&&this._attachEntry(s),()=>{if(s._disposed)return;s._disposed=!0;let o=this._pending.indexOf(s);if(o>=0&&this._pending.splice(o,1),s.attached&&typeof s._hostUnsubscribe=="function")try{s._hostUnsubscribe()}catch(a){Ht.warn("\u53D6\u6D88\u5BBF\u4E3B\u8BA2\u9605\u5931\u8D25",{event:s._hostName,error:a})}}}async emit(e,...r){if(this._ensureInitialized(),!this._bridge?.hasBridge)return Ht.debug("emit \u65F6\u5BBF\u4E3B\u6865\u672A\u5C31\u7EEA\uFF0C\u8DF3\u8FC7",{eventKey:e}),!1;let n=this._resolveHostEventName(e);if(!n)return!1;let{eventSource:s}=this._bridge;try{if(typeof s?.emit=="function")return await s.emit(n,...r),!0;if(typeof s?.dispatch=="function")return await s.dispatch(n,...r),!0}catch(o){Ht.warn("emit \u629B\u9519",{eventKey:e,hostName:n,error:o})}return!1}ready({timeoutMs:e=1e4}={}){return this._ensureInitialized(),this._bridge?.hasBridge?Promise.resolve(!0):new Promise(r=>{let n=!1,s=a=>{n||(n=!0,r(a))},o=e>0?setTimeout(()=>s(!1),e):null;this._readyResolvers.push(a=>{o&&clearTimeout(o),s(a)})})}describe(){this._ensureInitialized();let e=this._bridge?.eventTypes||{};return{initialized:this._initialized,source:this._bridge?.source||"unavailable",hasBridge:!!this._bridge?.hasBridge,initAttempts:this._initAttempts,retryScheduled:!!this._retryTimer,pendingCount:this._pending.filter(r=>!r.attached).length,attachedCount:this._pending.filter(r=>r.attached).length,availableEvents:Object.keys(e).slice(0,100)}}reinit(){if(this._disposed)return!1;for(let e of this._pending){if(e.attached&&typeof e._hostUnsubscribe=="function")try{e._hostUnsubscribe()}catch{}e.attached=!1,e._hostUnsubscribe=null,e._hostName=""}return this._bridge=null,this._initialized=!1,this._initAttempts=0,this._retryTimer&&(clearTimeout(this._retryTimer),this._retryTimer=null),this._ensureInitialized()}dispose(){this._retryTimer&&(clearTimeout(this._retryTimer),this._retryTimer=null);for(let e of this._pending){if(e.attached&&typeof e._hostUnsubscribe=="function")try{e._hostUnsubscribe()}catch{}e._disposed=!0}this._pending=[],this._readyResolvers=[],this._bridge=null,this._initialized=!1,this._disposed=!0}_ensureInitialized(){if(this._disposed)return!1;if(this._initialized&&this._bridge?.hasBridge)return!0;this._initAttempts+=1;let e=Fv();if(this._bridge=e,this._initialized=!0,!e.hasBridge)return Ht.debug(`\u5BBF\u4E3B\u6865\u672A\u5C31\u7EEA (attempt ${this._initAttempts})`,{source:e.source}),this._scheduleRetry(),!1;Ht.info("\u5BBF\u4E3B\u6865\u5DF2\u5C31\u7EEA",{source:e.source,eventTypesCount:Object.keys(e.eventTypes).length});for(let n of this._pending)!n.attached&&!n._disposed&&this._attachEntry(n);let r=this._readyResolvers.slice();this._readyResolvers=[];for(let n of r)try{n(!0)}catch{}return!0}_scheduleRetry(){if(!this._retryTimer){if(this._initAttempts>=Ay){Ht.warn(`\u5DF2\u8FBE\u6700\u5927\u91CD\u8BD5\u6B21\u6570 (${Ay})\uFF0C\u505C\u6B62\u91CD\u8BD5`);let e=this._readyResolvers.slice();this._readyResolvers=[];for(let r of e)try{r(!1)}catch{}return}this._retryTimer=setTimeout(()=>{this._retryTimer=null,this._initialized=!1,this._ensureInitialized()},Wv)}}_resolveHostEventName(e){let r=Ey(e),n=this._bridge?.eventTypes||{};if(n[r])return n[r];let s=r.toLowerCase();if(n[s])return n[s];let o=String(e).trim();return o&&o===o.toLowerCase()?o:s}_attachEntry(e){if(!this._bridge?.hasBridge||e.attached||e._disposed)return;let r=this._resolveHostEventName(e.rawKey);if(!r){Ht.warn("\u65E0\u6CD5\u89E3\u6790\u5BBF\u4E3B\u4E8B\u4EF6\u540D",{rawKey:e.rawKey});return}let{eventSource:n}=this._bridge,s=typeof n?.on=="function"?n.on.bind(n):typeof n?.addListener=="function"?n.addListener.bind(n):null,o=typeof n?.off=="function"?n.off.bind(n):typeof n?.removeListener=="function"?n.removeListener.bind(n):null;if(!s||!o){Ht.warn("\u5BBF\u4E3B eventSource \u7F3A\u5C11 on/off \u65B9\u6CD5");return}try{s(r,e.handler),e.attached=!0,e._hostName=r,e._hostUnsubscribe=()=>{try{o(r,e.handler)}catch(a){Ht.warn("\u53D6\u6D88\u5BBF\u4E3B\u8BA2\u9605\u5931\u8D25",{event:r,error:a})}},Ht.debug(`\u7ED1\u5B9A\u5BBF\u4E3B\u4E8B\u4EF6: "${r}" (key=${e.key})`)}catch(a){Ht.error(`\u7ED1\u5B9A\u5BBF\u4E3B\u4E8B\u4EF6\u5931\u8D25: "${r}"`,{error:a})}}},Nt=new Sc});var ky={};ge(ky,{WorldbookPresetPanel:()=>Ko,default:()=>Qv});function Hv(t){return t===xr.CUSTOM?"\u81EA\u5B9A\u4E49":"\u8DDF\u968F\u89D2\u8272\u5361"}function qv(t,e,r){let n=[...t.bookList],s=n.findIndex(o=>o.bookName===e);s>=0?n[s]={...n[s],enabled:r}:n.push({bookName:e,enabled:r,entryOverrides:{}}),wt.updatePreset(t.id,{bookList:n})}function Gv(t,e){let r=t.bookList.filter(n=>n.bookName!==e);wt.updatePreset(t.id,{bookList:r})}async function Yv(t,e){let r=si();if(!r.length)try{r=await Do()}catch{}let n=new Set(t.bookList.map(c=>c.bookName)),s=r.filter(c=>!n.has(c));if(!s.length){await Ee.confirm({title:"\u6CA1\u6709\u53EF\u6DFB\u52A0\u7684\u4E16\u754C\u4E66",message:"\u5BBF\u4E3B\u672A\u63D0\u4F9B\u66F4\u591A\u53EF\u7528\u4E16\u754C\u4E66\uFF0C\u6216\u7F13\u5B58\u5185\u5168\u90E8\u5DF2\u52A0\u5165\u6B64\u9884\u8BBE\u3002",confirmText:"\u786E\u5B9A"});return}let o=f("div",{style:{display:"flex",flexDirection:"column",gap:"8px"}}),a=f("input",{className:"yyt-input",attrs:{type:"text",placeholder:`\u641C\u7D22 ${s.length} \u672C\u4E16\u754C\u4E66\u2026`,autocomplete:"off"},style:{padding:"7px 10px",fontSize:"12px"}});o.appendChild(a);let i=f("div",{style:{display:"flex",flexDirection:"column",gap:"4px",maxHeight:"320px",overflowY:"auto"}}),l=new Set,d=[];for(let c of s){let u=f("label",{style:{display:"flex",alignItems:"center",gap:"8px",padding:"8px 10px",cursor:"pointer",borderRadius:"var(--yyt-radius-sm, 6px)",background:"var(--yyt-surface-2, rgba(255,255,255,0.03))",fontSize:"12px"}}),y=f("input",{attrs:{type:"checkbox",value:c}});y.addEventListener("change",()=>{y.checked?l.add(c):l.delete(c)}),u.appendChild(y),u.appendChild(f("span",{text:c,style:{color:"var(--yyt-text)"}})),i.appendChild(u),d.push({el:u,search:c.toLowerCase()})}o.appendChild(i),a.addEventListener("input",()=>{let c=a.value.trim().toLowerCase();for(let u of d)u.el.style.display=!c||u.search.includes(c)?"":"none"}),Ee.custom({title:`\u6DFB\u52A0\u4E16\u754C\u4E66\uFF08${s.length} \u9879\u53EF\u9009\uFF09`,width:"480px",body:o,buttons:[{label:"\u53D6\u6D88",variant:"ghost",onClick:c=>c(null)},{label:"\u5168\u9009\u53EF\u89C1",variant:"ghost",onClick:()=>{for(let c of i.querySelectorAll("input[type=checkbox]")){let u=c.closest("label");(!u||u.style.display!=="none")&&(c.checked=!0,l.add(c.value))}}},{label:"\u6DFB\u52A0\u9009\u4E2D",variant:"primary",onClick:c=>{let u=Array.from(l);if(!u.length){c(null);return}let y=u.map(g=>({bookName:g,enabled:!0,entryOverrides:{}})),p=[...t.bookList,...y];wt.updatePreset(t.id,{bookList:p}),c(u.length)}}]}).result.then(c=>{c&&e&&e()})}function Vv(t,{onChange:e,readonly:r,refresh:n}){let s=f("div",{style:{display:"flex",flexDirection:"column",gap:"12px"}});Q(s,Ft({label:"\u63CF\u8FF0",control:ve({value:t.description,placeholder:"\u53EF\u9009 \u2014 \u5907\u6CE8\u7528\u9014",disabled:r,onChange:c=>e({description:c})})})),Q(s,Ft({label:"\u7ED1\u5B9A\u6A21\u5F0F",hint:"\u8DDF\u968F\u89D2\u8272\u5361 = \u6CE8\u5165\u5F53\u524D\u89D2\u8272\u7ED1\u5B9A\u7684\u4E16\u754C\u4E66\uFF1B\u81EA\u5B9A\u4E49 = \u7528\u4E0B\u65B9\u624B\u52A8\u9009\u62E9\u7684\u5217\u8868",control:Me({value:t.bindingMode,disabled:r,options:[{value:xr.CHARACTER_CARD,label:"\u8DDF\u968F\u89D2\u8272\u5361\uFF08\u52A8\u6001\uFF09"},{value:xr.CUSTOM,label:"\u81EA\u5B9A\u4E49\uFF08\u56FA\u5B9A\u5217\u8868\uFF09"}],onChange:c=>{e({bindingMode:c}),n&&n()}})})),Q(s,Qe({label:"\u5305\u542B\u7981\u7528\u8BCD\u6761",hint:"\u5F00\u542F\u540E\uFF1A\u6E90\u4E16\u754C\u4E66\u4E2D\u5DF2\u7981\u7528\u7684\u8BCD\u6761\u53EF\u88AB\u672C\u9884\u8BBE\u5F3A\u5236\u542F\u7528\u5E76\u6CE8\u5165",checked:t.includeDisabled,disabled:r,onChange:c=>e({includeDisabled:c})}));let o=t.bindingMode===xr.CHARACTER_CARD,a=f("div",{style:{display:"flex",flexDirection:"column"}}),i=f("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"6px",gap:"8px"}});i.appendChild(f("div",{style:{display:"flex",flexDirection:"column",gap:"2px"}},f("div",{text:o?"\u968F\u89D2\u8272\u5361\u6CE8\u5165\u7684\u4E16\u754C\u4E66":"\u9009\u4E2D\u7684\u4E16\u754C\u4E66",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}}),f("div",{text:o?"\u4EE5\u4E0B\u6765\u81EA\u5F53\u524D\u89D2\u8272\u5361\u7684\u4E16\u754C\u4E66\u5C06\u88AB\u81EA\u52A8\u6CE8\u5165\uFF0C\u5217\u8868\u968F\u89D2\u8272\u5361\u53D8\u52A8\u81EA\u52A8\u66F4\u65B0":'\u672C\u9884\u8BBE\u56FA\u5B9A\u6CE8\u5165\u4E0B\u5217\u4E16\u754C\u4E66\uFF1B\u70B9\u51FB"+ \u6DFB\u52A0"\u4ECE\u53EF\u7528\u5217\u8868\u591A\u9009',style:{fontSize:"11px",color:"var(--yyt-text-muted)",lineHeight:"1.5"}})));let l=f("div",{style:{display:"flex",gap:"6px"}});!o&&!r&&l.appendChild(te({label:"+ \u6DFB\u52A0",size:"small",onClick:()=>Yv(t,n)}).el),o||l.appendChild(te({label:"\u{1F504} \u5237\u65B0",size:"small",variant:"ghost",onClick:async()=>{try{await Do()}catch(c){Tc.warn("\u5237\u65B0\u5931\u8D25",{e:c})}n&&n()}}).el),i.appendChild(l),Q(a,i);let d=[];if(o){let c=f("div",{style:{display:"flex",flexDirection:"column",gap:"4px"}});c.appendChild(f("div",{text:"\u6B63\u5728\u83B7\u53D6\u89D2\u8272\u5361\u7ED1\u5B9A\u7684\u4E16\u754C\u4E66\u2026",style:{padding:"14px 0",color:"var(--yyt-text-muted)",fontSize:"12px"}})),oi().then(u=>{if(c.innerHTML="",!u.length)c.appendChild(f("div",{style:{padding:"14px 0",color:"var(--yyt-text-muted)",fontSize:"12px"},text:'\u5F53\u524D\u89D2\u8272\u5361\u672A\u7ED1\u5B9A\u4E16\u754C\u4E66 \u2014 \u5207\u6362\u5230"\u81EA\u5B9A\u4E49"\u53EF\u4EE5\u624B\u52A8\u9009\u62E9\u4EFB\u610F\u4E16\u754C\u4E66\u3002'}));else for(let y of u)c.appendChild(f("div",{style:{padding:"8px 10px",borderRadius:"var(--yyt-radius-sm, 6px)",background:"var(--yyt-surface-2, rgba(255,255,255,0.03))",fontSize:"12px",display:"flex",alignItems:"center",gap:"8px",opacity:"0.7"}},f("span",{text:"\u{1F4D6}",style:{fontSize:"11px"}}),f("span",{text:y,style:{flex:"1",color:"var(--yyt-text)"}}),f("span",{text:"\u968F\u89D2\u8272\u5361\u6CE8\u5165",style:{fontSize:"11px",color:"var(--yyt-text-muted)"}})))}).catch(u=>{Tc.warn("\u83B7\u53D6\u89D2\u8272\u5361\u4E16\u754C\u4E66\u5931\u8D25",u),c.innerHTML="",c.appendChild(f("div",{style:{padding:"14px 0",color:"var(--yyt-danger, #f87171)",fontSize:"12px"},text:"\u83B7\u53D6\u89D2\u8272\u5361\u4E16\u754C\u4E66\u5931\u8D25"}))}),d=[c]}else t.bookList.length?d=t.bookList.map(c=>{let u=Object.keys(c.entryOverrides||{}).filter(g=>{let m=c.entryOverrides[g];return m&&typeof m.enabled=="boolean"}).length,y=f("div",{style:{display:"flex",flexDirection:"column"}}),p=ic({name:c.bookName,desc:c.enabled===!1?"\u5DF2\u7981\u7528":`\u5DF2\u542F\u7528 \xB7 \u6574\u672C\u6CE8\u5165${u?` \xB7 ${u} \u6761 override`:""}`,actions:[te({label:"\u25B8 \u8BCD\u6761",size:"small",variant:"ghost",title:"\u5C55\u5F00/\u6536\u8D77\u8BCD\u6761\u7EA7 override",onClick:()=>Jv(y,t,c,r,n)}),Qe({checked:c.enabled!==!1,disabled:r,onChange:g=>qv(t,c.bookName,g)}),...r?[]:[te({label:"\xD7",size:"small",variant:"ghost",title:"\u4ECE\u9884\u8BBE\u79FB\u9664",onClick:()=>{Gv(t,c.bookName),n&&n()}})]]});return p?.el&&Q(y,p.el),y}):d=[f("div",{style:{padding:"14px 0",color:"var(--yyt-text-muted)",fontSize:"12px"},text:'\u70B9\u51FB\u53F3\u4E0A\u89D2"+ \u6DFB\u52A0"\u9009\u62E9\u4E16\u754C\u4E66\u52A0\u5165\u6B64\u9884\u8BBE\u3002'})];for(let c of d)c?.el?Q(a,c.el):c instanceof Node&&Q(a,c);return Q(s,a),s}function Jv(t,e,r,n,s){let o=t.querySelector(".yyt-wb-entry-panel");if(o){o.remove();let l=t.querySelector('[title="\u5C55\u5F00/\u6536\u8D77\u8BCD\u6761\u7EA7 override"]');l&&(l.textContent="\u25B8 \u8BCD\u6761");return}let a=t.querySelector('[title="\u5C55\u5F00/\u6536\u8D77\u8BCD\u6761\u7EA7 override"]');a&&(a.textContent="\u25BE \u8BCD\u6761");let i=f("div",{className:"yyt-wb-entry-panel",style:{marginLeft:"18px",marginTop:"4px",padding:"8px 10px",background:"var(--yyt-surface-2, rgba(255,255,255,0.03))",borderRadius:"var(--yyt-radius-sm, 6px)",border:"1px solid var(--yyt-border, rgba(255,255,255,0.06))",fontSize:"12px",display:"flex",flexDirection:"column",gap:"4px"}});i.appendChild(f("div",{text:"\u52A0\u8F7D\u4E2D\u2026",style:{color:"var(--yyt-text-muted)",padding:"4px 0"}})),t.appendChild(i),_y(r.bookName).then(l=>{if(!l.length){i.innerHTML="",i.appendChild(f("div",{text:"\u8BE5\u4E16\u754C\u4E66\u65E0\u8BCD\u6761",style:{color:"var(--yyt-text-muted)",padding:"4px 0"}}));return}let d=r.entryOverrides||{};i.innerHTML="";let c=f("input",{className:"yyt-input",attrs:{type:"text",placeholder:`\u641C\u7D22 ${l.length} \u4E2A\u8BCD\u6761\u2026`,autocomplete:"off"},style:{padding:"5px 8px",fontSize:"11px",marginBottom:"4px",flexShrink:"0"}});i.appendChild(c);let u=f("div",{style:{display:"flex",flexDirection:"column",gap:"2px",height:"260px",overflowY:"scroll",overscrollBehavior:"contain",WebkitOverflowScrolling:"touch"}});u.addEventListener("wheel",g=>{let m=g.deltaY;if(m===0)return;let h=u.scrollTop+u.clientHeight<u.scrollHeight-.5,b=u.scrollTop>.5;(m>0&&h||m<0&&b)&&(g.preventDefault(),g.stopPropagation(),u.scrollTop+=m)},{passive:!1});let y=e.includeDisabled===!0,p=[];for(let g of l){let m=String(g.uid??""),h=g.comment||g.key||g.name||"",b=String(Array.isArray(h)?h[0]:h).trim()||`\u6761\u76EE ${g.uid}`,x=g.enabled===!1||g.disable===!0,w=d[m],T=w&&typeof w.enabled=="boolean",I=x&&!T&&!y,S=f("div",{style:{display:"flex",alignItems:"center",gap:"8px",padding:"5px 8px",borderRadius:"4px",background:T?"rgba(123,183,255,0.08)":"transparent",opacity:I?"0.4":"1"}}),A=_=>{S.style.background=_?"rgba(123,183,255,0.08)":"transparent",R.style.color=_?"var(--yyt-accent)":"var(--yyt-text)",_?P||(P=M(),S.appendChild(P)):(P&&(P.remove(),P=null),S.style.opacity=x?"0.4":"1")},P=null,M=()=>{let _=f("span",{text:"\u2715",style:{cursor:"pointer",color:"var(--yyt-text-muted)",fontSize:"10px",flexShrink:"0"},attrs:{title:"\u6E05\u9664 override"}});return _.addEventListener("click",$=>{if($.stopPropagation(),n)return;let F=wt.getPreset(e.id);if(!F)return;let Y=F.bookList.find(re=>re.bookName===r.bookName);Y&&(Y.entryOverrides=Y.entryOverrides||{},delete Y.entryOverrides[m],wt.updatePreset(e.id,{bookList:[...F.bookList]},{silent:!0}),P=null,A(!1))}),_};S.appendChild(Qe({checked:T?w.enabled:!x,disabled:n||I,onChange:_=>{let $=wt.getPreset(e.id);if(!$)return;let F=$.bookList.find(ie=>ie.bookName===r.bookName);if(!F)return;F.entryOverrides=F.entryOverrides||{};let Y=!x;_===Y?delete F.entryOverrides[m]:F.entryOverrides[m]={enabled:_};let re=_!==Y;wt.updatePreset(e.id,{bookList:[...$.bookList]},{silent:!0}),A(re),S.style.opacity=I?"0.4":"1"}}).el);let R=f("span",{style:{flex:"1",minWidth:"0",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",color:T?"var(--yyt-accent)":"var(--yyt-text)",fontSize:"11px"},text:b+(I?" (\u6E90\u7981\u7528)":"")});S.appendChild(R),T&&(P=M(),S.appendChild(P)),u.appendChild(S),p.push({el:S,search:b.toLowerCase()})}i.appendChild(u),c.addEventListener("input",()=>{let g=c.value.trim().toLowerCase();for(let m of p)m.el.style.display=!g||m.search.includes(g)?"":"none"})}).catch(l=>{Tc.warn("\u52A0\u8F7D\u8BCD\u6761\u5931\u8D25",l),i.innerHTML="",i.appendChild(f("div",{text:`\u52A0\u8F7D\u5931\u8D25\uFF1A${l?.message||l}`,style:{color:"var(--yyt-danger, #f87171)",padding:"4px 0"}}))})}function Xv(t){let e=[`${Hv(t.bindingMode)}`,`${t.bookList.length} \u672C`];return t.includeDisabled&&e.push("\u542B\u7981\u7528"),e}var Tc,Ko,_c,Cy,Qv,Iy=O(()=>{Wt();Ss();Bo();zo();Po();J();No();Tc=N.createScope("WorldbookPresetPanel");Ko=Zr({id:"worldbookPresetPanel",kind:"worldbook",panelTitle:"\u4E16\u754C\u4E66\u9884\u8BBE",panelHint:"\u7BA1\u7406\u4E16\u754C\u4E66\u6CE8\u5165\u9884\u8BBE\u3002\u5DE5\u5177\u914D\u7F6E\u4E2D\u901A\u8FC7\u9884\u8BBE ID \u5F15\u7528\uFF0C\u53EF\u7ED1\u5B9A\u89D2\u8272\u5361\uFF08\u52A8\u6001\uFF09\u6216\u56FA\u5B9A\u5217\u8868\u3002",store:wt,renderEditor:Vv,renderListItemMeta:Xv}),_c=null,Cy=Ko.renderTo;Ko.renderTo=function(t){_c=t,Cy.call(this,t)};Nt.subscribe(Ze.CHAT_CHANGED,()=>{if(!_c)return;let t=wt.getCurrentPreset();!t||t.bindingMode!==xr.CHARACTER_CARD||Cy.call(Ko,_c)});Qv=Ko});var Mc={};ge(Mc,{MESSAGE_MACROS:()=>Qy,addTagRule:()=>jy,createRuleTemplate:()=>Dy,default:()=>t0,deleteRulePreset:()=>Yy,deleteRuleTemplate:()=>zy,deleteTagRule:()=>Fy,escapeRegex:()=>qn,exportRulesConfig:()=>Vy,extractComplexTag:()=>My,extractCurlyBraceTag:()=>Ic,extractHtmlFormatTag:()=>Py,extractSimpleTag:()=>kc,extractTagContent:()=>Or,generateTagSuggestions:()=>$y,getAllRulePresets:()=>qy,getAllRuleTemplates:()=>Ly,getContentBlacklist:()=>As,getRuleTemplate:()=>Oy,getTagRules:()=>Es,importRulesConfig:()=>Jy,isValidTagName:()=>Cc,loadRulePreset:()=>Gy,saveRulesAsPreset:()=>Hy,scanTextForTags:()=>Ny,setContentBlacklist:()=>Wy,setTagRules:()=>Ky,shouldSkipContent:()=>Ac,testRegex:()=>Xy,updateRuleTemplate:()=>By,updateTagRule:()=>Uy});function Zv(){return{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"},ruleTemplates:[...Ec],tagRules:[],contentBlacklist:[],tagRulePresets:{}}}function qt(){return U.get(Ry,Zv())}function Sr(t){U.set(Ry,t)}function li(){let t=qt();return vt=t.ruleTemplates||[...Ec],qe=t.tagRules||[],$t=t.contentBlacklist||[],{ruleTemplates:vt,tagRules:qe,contentBlacklist:$t}}function qn(t){return typeof t!="string"?"":t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function Ac(t,e){if(!e||e.length===0||!t||typeof t!="string")return!1;let r=t.toLowerCase();return e.some(n=>{let s=n.trim().toLowerCase();return s&&r.includes(s)})}function Cc(t){return!t||typeof t!="string"?!1:/^[a-zA-Z][a-zA-Z0-9_-]*$/.test(t)&&!e0.includes(t.toLowerCase())}function kc(t,e){if(!t||!e)return[];let r=[],n=qn(e),s=new RegExp(`<${n}>([\\s\\S]*?)<\\/${n}>`,"gi");[...t.matchAll(s)].forEach(l=>{l[1]&&r.push(l[1].trim())});let a=(t.match(new RegExp(`<${n}>`,"gi"))||[]).length,i=(t.match(new RegExp(`<\\/${n}>`,"gi"))||[]).length;return a>i&&vr.warn(`\u53D1\u73B0 ${a-i} \u4E2A\u672A\u95ED\u5408\u7684 <${e}> \u6807\u7B7E`),r}function Ic(t,e){if(!t||!e)return[];let r=[],n=qn(e),s=new RegExp(`\\{${n}\\|`,"gi"),o;for(;(o=s.exec(t))!==null;){let a=o.index,i=a+o[0].length,l=1,d=i;for(;d<t.length&&l>0;)t[d]==="{"?l++:t[d]==="}"&&l--,d++;if(l===0){let c=t.substring(i,d-1);c.trim()&&r.push(c.trim())}s.lastIndex=a+1}return r}function My(t,e){if(!t||!e)return[];let r=e.split(",");if(r.length!==2)return vr.error(`\u590D\u6742\u6807\u7B7E\u914D\u7F6E\u683C\u5F0F\u9519\u8BEF\uFF0C\u5E94\u8BE5\u5305\u542B\u4E00\u4E2A\u9017\u53F7: ${e}`),[];let n=r[0].trim(),s=r[1].trim(),o=s.match(/<\/(\w+)>/);if(!o)return vr.error(`\u65E0\u6CD5\u89E3\u6790\u7ED3\u675F\u6807\u7B7E: ${s}`),[];let a=o[1],i=new RegExp(`${qn(n)}([\\s\\S]*?)<\\/${a}>`,"gi"),l=[];return[...t.matchAll(i)].forEach(c=>{c[1]&&l.push(c[1].trim())}),l}function Py(t,e){if(!t||!e)return[];let r=e.match(/<(\w+)(?:\s[^>]*)?>/);if(!r)return vr.error(`\u65E0\u6CD5\u89E3\u6790HTML\u683C\u5F0F\u6807\u7B7E: ${e}`),[];let n=r[1],s=[],o=new RegExp(`<${n}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${n}>`,"gi");[...t.matchAll(o)].forEach(d=>{d[1]&&s.push(d[1].trim())});let i=(t.match(new RegExp(`<${n}(?:\\s[^>]*)?>`,"gi"))||[]).length,l=(t.match(new RegExp(`<\\/${n}>`,"gi"))||[]).length;return i>l&&vr.warn(`\u53D1\u73B0 ${i-l} \u4E2A\u672A\u95ED\u5408\u7684 <${n}> \u6807\u7B7E`),s}function Or(t,e,r=[]){if(!t)return"";if(!e||e.length===0)return t;let n=e.filter(c=>c.type==="exclude"&&c.enabled),s=e.filter(c=>(c.type==="include"||c.type==="regex_include")&&c.enabled),o=e.filter(c=>c.type==="regex_exclude"&&c.enabled),a=t;for(let c of n)try{let u=new RegExp(`<${qn(c.value)}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${qn(c.value)}>`,"gi");a=a.replace(u,"")}catch(u){vr.error("Error applying block exclusion rule:",{rule:c,error:u})}let i=[];if(s.length>0)for(let c of s){let u=[];try{if(c.type==="include")u.push(...kc(a,c.value)),u.push(...Ic(a,c.value));else if(c.type==="regex_include"){let y=new RegExp(c.value,"gi");[...a.matchAll(y)].forEach(g=>{g[1]&&u.push(g[1])})}}catch(y){vr.error("Error applying inclusion rule:",{rule:c,error:y})}u.forEach(y=>i.push(y.trim()))}else i.push(a);let l=[];for(let c of i){for(let u of o)try{let y=new RegExp(u.value,"gi");c=c.replace(y,"")}catch(y){vr.error("Error applying cleanup rule:",{rule:u,error:y})}Ac(c,r)||l.push(c)}return l.join(`

`).replace(/\n\s*\n\s*\n/g,`

`).replace(/^\s+|\s+$/g,"").trim()}async function Ny(t,e={}){let r=performance.now(),{chunkSize:n=5e4,maxTags:s=100,timeoutMs:o=5e3}=e,a=new Set,i=/<(?:\/|)([a-zA-Z0-9_-]+)(?:[^>]*)>|\{([a-zA-Z0-9_-]+)(?:\||})/g,l=0,d=0;for(let u=0;u<t.length;u+=n){let y=t.slice(u,Math.min(u+n,t.length));if(d++,l+=y.length,performance.now()-r>o){vr.warn(`Tag scanning timed out after ${o}ms`);break}let p;for(;(p=i.exec(y))!==null&&a.size<s;){let g=(p[1]||p[2]).toLowerCase();Cc(g)&&a.add(g)}if(a.size>=s)break;d%5===0&&await new Promise(g=>setTimeout(g,0))}let c=performance.now();return{tags:Array.from(a).sort(),stats:{processingTimeMs:Math.round(c-r),processedChars:l,totalChars:t.length,chunkCount:d,tagsFound:a.size}}}function $y(t,e=25){let r=t.tags.slice(0,e);return{suggestions:r,stats:{totalFound:t.stats.tagsFound,finalCount:r.length}}}function Ly(){return vt.length===0&&li(),vt}function Oy(t){return vt.find(e=>e.id===t)}function Dy(t){let e={id:`rule-${Date.now()}`,name:t.name||"\u65B0\u89C4\u5219",description:t.description||"",type:t.type||"include",value:t.value||"",enabled:t.enabled!==!1,createdAt:new Date().toISOString()};return vt.push(e),Rc(),{success:!0,template:e,message:"\u89C4\u5219\u6A21\u677F\u521B\u5EFA\u6210\u529F"}}function By(t,e){let r=vt.findIndex(n=>n.id===t);return r===-1?{success:!1,message:"\u89C4\u5219\u6A21\u677F\u4E0D\u5B58\u5728"}:(vt[r]={...vt[r],...e,updatedAt:new Date().toISOString()},Rc(),{success:!0,template:vt[r],message:"\u89C4\u5219\u6A21\u677F\u66F4\u65B0\u6210\u529F"})}function zy(t){let e=vt.findIndex(r=>r.id===t);return e===-1?{success:!1,message:"\u89C4\u5219\u6A21\u677F\u4E0D\u5B58\u5728"}:(vt.splice(e,1),Rc(),{success:!0,message:"\u89C4\u5219\u6A21\u677F\u5DF2\u5220\u9664"})}function Rc(){let t=qt();t.ruleTemplates=vt,Sr(t)}function Es(){return qe||li(),qe}function Ky(t){qe=t||[];let e=qt();e.tagRules=qe,Sr(e)}function jy(t){let e={id:`tag-${Date.now()}`,type:t.type||"include",value:t.value||"",enabled:t.enabled!==!1};qe.push(e);let r=qt();return r.tagRules=qe,Sr(r),{success:!0,rule:e,message:"\u89C4\u5219\u6DFB\u52A0\u6210\u529F"}}function Uy(t,e){if(t<0||t>=qe.length)return{success:!1,message:"\u89C4\u5219\u7D22\u5F15\u65E0\u6548"};qe[t]={...qe[t],...e};let r=qt();return r.tagRules=qe,Sr(r),{success:!0,rule:qe[t],message:"\u89C4\u5219\u66F4\u65B0\u6210\u529F"}}function Fy(t){if(t<0||t>=qe.length)return{success:!1,message:"\u89C4\u5219\u7D22\u5F15\u65E0\u6548"};qe.splice(t,1);let e=qt();return e.tagRules=qe,Sr(e),{success:!0,message:"\u89C4\u5219\u5DF2\u5220\u9664"}}function As(){return $t||li(),$t}function Wy(t){$t=t||[];let e=qt();e.contentBlacklist=$t,Sr(e)}function Hy(t,e=""){if(!t||!t.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let r=qt();r.tagRulePresets||(r.tagRulePresets={});let n=`preset-${Date.now()}`;return r.tagRulePresets[n]={id:n,name:t.trim(),description:e.trim(),rules:JSON.parse(JSON.stringify(qe)),blacklist:JSON.parse(JSON.stringify($t)),createdAt:new Date().toISOString()},Sr(r),{success:!0,preset:r.tagRulePresets[n],message:"\u9884\u8BBE\u4FDD\u5B58\u6210\u529F"}}function qy(){let e=qt().tagRulePresets||{};return Object.values(e)}function Gy(t){let e=qt(),n=(e.tagRulePresets||{})[t];return n?(qe=JSON.parse(JSON.stringify(n.rules||[])),$t=JSON.parse(JSON.stringify(n.blacklist||[])),e.tagRules=qe,e.contentBlacklist=$t,Sr(e),{success:!0,preset:n,message:"\u9884\u8BBE\u52A0\u8F7D\u6210\u529F"}):{success:!1,message:"\u9884\u8BBE\u4E0D\u5B58\u5728"}}function Yy(t){let e=qt(),r=e.tagRulePresets||{};return r[t]?(delete r[t],e.tagRulePresets=r,Sr(e),{success:!0,message:"\u9884\u8BBE\u5DF2\u5220\u9664"}):{success:!1,message:"\u9884\u8BBE\u4E0D\u5B58\u5728"}}function Vy(){return JSON.stringify({tagRules:qe,contentBlacklist:$t,ruleTemplates:vt,tagRulePresets:qt().tagRulePresets||{}},null,2)}function Jy(t,e={overwrite:!0}){try{let r=JSON.parse(t);if(e.overwrite)qe=r.tagRules||[],$t=r.contentBlacklist||[],vt=r.ruleTemplates||Ec;else if(r.tagRules&&qe.push(...r.tagRules),r.contentBlacklist){let s=new Set($t.map(o=>o.toLowerCase()));r.contentBlacklist.forEach(o=>{s.has(o.toLowerCase())||$t.push(o)})}let n=qt();return n.tagRules=qe,n.contentBlacklist=$t,n.ruleTemplates=vt,r.tagRulePresets&&(n.tagRulePresets={...n.tagRulePresets||{},...r.tagRulePresets}),Sr(n),{success:!0,message:"\u914D\u7F6E\u5BFC\u5165\u6210\u529F"}}catch(r){return vr.error("\u89C4\u5219\u914D\u7F6E\u5BFC\u5165\u5931\u8D25",{error:r}),{success:!1,message:`\u5BFC\u5165\u5931\u8D25: ${r.message}`}}}function Xy(t,e,r="g",n=0){try{if(!t||typeof t!="string")return{success:!1,error:"\u6B63\u5219\u8868\u8FBE\u5F0F\u4E0D\u80FD\u4E3A\u7A7A",matches:[]};let s=new RegExp(t,r),o=[];if(r.includes("g")){let a;for(;(a=s.exec(e))!==null;)a.length>1?o.push({fullMatch:a[0],groups:a.slice(1),index:a.index,extracted:a[n]||a[1]||a[0]}):o.push({fullMatch:a[0],groups:[],index:a.index,extracted:a[0]})}else{let a=s.exec(e);a&&o.push({fullMatch:a[0],groups:a.length>1?a.slice(1):[],index:a.index,extracted:a.length>1?a[n]||a[1]:a[0]})}return{success:!0,matches:o,count:o.length,extracted:o.map(a=>a.extracted)}}catch(s){return{success:!1,error:s.message,matches:[]}}}var vr,Ry,e0,Ec,vt,qe,$t,Qy,t0,Cs=O(()=>{Ve();J();vr=N.createScope("RegexExtractor"),Ry="settings";e0=["font","span","div","p","br","hr","img","a","b","i","u","s","em","strong","small","big","sub","sup","h1","h2","h3","h4","h5","h6","table","tr","td","th","tbody","thead","tfoot","ul","ol","li","form","input","button","select","option","textarea","label","script","style","meta","link","title","head","body","html"],Ec=[{id:"exclude-thinking",name:"\u6392\u9664\u601D\u8003\u6807\u7B7E",description:"\u79FB\u9664<thinking>\u6807\u7B7E\u5757",type:"exclude",value:"thinking",enabled:!0},{id:"include-content",name:"\u63D0\u53D6\u5185\u5BB9\u6807\u7B7E",description:"\u63D0\u53D6<content>\u6807\u7B7E\u5185\u5BB9",type:"include",value:"content",enabled:!0},{id:"regex-exclude-cot",name:"\u6392\u9664\u5C0FCoT",description:"\u79FB\u9664HTML\u6CE8\u91CA",type:"regex_exclude",value:"<!--[\\s\\S]*?-->",enabled:!1},{id:"regex-include-details",name:"\u63D0\u53D6details\u6807\u7B7E",description:"\u63D0\u53D6<details>\u6807\u7B7E\u5185\u5BB9",type:"regex_include",value:"<details[^>]*>([\\s\\S]*?)</details>",enabled:!1}],vt=[],qe=[],$t=[];Qy={lastMessage:{macro:"{{lastMessage}}",description:"\u6700\u540E\u4E00\u6761\u6D88\u606F"},lastCharMessage:{macro:"{{lastCharMessage}}",description:"\u6700\u540E\u4E00\u6761\u89D2\u8272\u6D88\u606F"},lastUserMessage:{macro:"{{lastUserMessage}}",description:"\u6700\u540E\u4E00\u6761\u7528\u6237\u6D88\u606F"},char:{macro:"{{char}}",description:"\u89D2\u8272\u540D\u79F0"},user:{macro:"{{user}}",description:"\u7528\u6237\u540D\u79F0"},input:{macro:"{{input}}",description:"\u5F53\u524D\u8F93\u5165\u6846\u5185\u5BB9"}};li();t0={extractTagContent:Or,extractSimpleTag:kc,extractCurlyBraceTag:Ic,extractComplexTag:My,extractHtmlFormatTag:Py,escapeRegex:qn,shouldSkipContent:Ac,isValidTagName:Cc,scanTextForTags:Ny,generateTagSuggestions:$y,getAllRuleTemplates:Ly,getRuleTemplate:Oy,createRuleTemplate:Dy,updateRuleTemplate:By,deleteRuleTemplate:zy,getTagRules:Es,setTagRules:Ky,addTagRule:jy,updateTagRule:Uy,deleteTagRule:Fy,getContentBlacklist:As,setContentBlacklist:Wy,saveRulesAsPreset:Hy,getAllRulePresets:qy,loadRulePreset:Gy,deleteRulePreset:Yy,exportRulesConfig:Vy,importRulesConfig:Jy,testRegex:Xy,MESSAGE_MACROS:Qy}});var af={};ge(af,{createDefaultToolDefinition:()=>Gn,default:()=>o0,deleteTool:()=>Is,deleteToolPreset:()=>nf,exportTools:()=>Rs,getAllTools:()=>Tr,getCurrentToolPreset:()=>sf,getTool:()=>_r,getToolPresets:()=>di,importTools:()=>Ms,normalizeToolDefinitionToRuntimeConfig:()=>Uo,resetTools:()=>Ps,saveTool:()=>ks,saveToolPreset:()=>rf,setCurrentToolPreset:()=>of,setToolEnabled:()=>ui});function r0(t={}){return!t||typeof t!="object"?{}:Object.fromEntries(Object.entries(t).map(([e,r])=>[e,Gn({...r||{},id:e})]))}function jo(t){return Array.isArray(t)?t.map(e=>String(e||"").trim()).filter(Boolean):[]}function Pc(t,e){let r=parseInt(t,10);return Number.isFinite(r)&&r>0?r:e}function Zy(t,e){let r=parseInt(t,10);return Number.isFinite(r)&&r>=0?r:e}function ef(t={}){return{settleMs:Zy(t?.settleMs,1200),cooldownMs:Zy(t?.cooldownMs,5e3)}}function tf(t={}){return{enabled:t?.enabled===!0,selected:jo(t?.selected),presetId:typeof t?.presetId=="string"?t.presetId:""}}function n0(t=[]){let e=Array.isArray(t)?t.map(r=>({role:String(r?.role||"user").trim().toUpperCase(),content:String(r?.content||"").trim()})).filter(r=>r.content):[];return e.length===0?"":e.length===1?e[0].content:e.map(r=>`\u3010${r.role||"USER"}\u3011
${r.content}`).join(`

`)}function s0(t,e={}){let r=typeof e?.promptTemplate=="string"?e.promptTemplate.trim():"";if(r)return r;let n=n0(e?.config?.messages||[]);return n||`\u8BF7\u57FA\u4E8E\u6700\u8FD1\u7684 AI \u56DE\u590D\u4E3A\u5DE5\u5177\u201C${e?.name||t}\u201D\u751F\u6210\u7ED3\u6784\u5316\u8F93\u51FA\u3002`}function Gn(t={}){let e=new Date().toISOString(),r=t?.config||{};return{...tr,...t,id:t?.id||tr.id,icon:t?.icon||tr.icon,order:Number.isFinite(t?.order)?t.order:tr.order,promptTemplate:typeof t?.promptTemplate=="string"?t.promptTemplate:tr.promptTemplate,extractTags:jo(t?.extractTags),config:{execution:{...tr.config.execution,...r.execution||{},timeout:Pc(r?.execution?.timeout,tr.config.execution.timeout),retries:Math.max(0,parseInt(r?.execution?.retries,10)||tr.config.execution.retries)},api:{...tr.config.api,...r.api||{}},messages:Array.isArray(r?.messages)?r.messages:[],context:{...tr.config.context,...r.context||{},depth:Pc(r?.context?.depth,tr.config.context.depth),includeTags:jo(r?.context?.includeTags),excludeTags:jo(r?.context?.excludeTags)},automation:ef(r?.automation),worldbooks:tf(r?.worldbooks)},enabled:t?.enabled!==!1,metadata:{...tr.metadata,...t?.metadata||{},createdAt:t?.metadata?.createdAt||e,updatedAt:t?.metadata?.updatedAt||e}}}function Uo(t,e={},r={}){let n=Gn({...e,id:t||e?.id||""}),s=jo(n?.extractTags?.length?n.extractTags:n?.config?.context?.includeTags),o=String(e?.output?.apiPreset||n?.config?.api?.preset||"").trim(),a=s0(t,n),i=typeof e?.output?.mode=="string"&&e.output.mode.trim()?e.output.mode.trim():r.defaultOutputMode||"follow_ai";return{id:n.id||t,name:n.name||t,icon:n.icon||"fa-screwdriver-wrench",description:n.description||"",enabled:n.enabled!==!1,order:Number.isFinite(n.order)?n.order:100,bypass:{enabled:n?.config?.api?.useBypass===!0&&!!n?.config?.api?.bypassPreset,presetId:n?.config?.api?.bypassPreset||""},output:{mode:i,apiPreset:o,overwrite:!0,enabled:!0},automation:ef(n?.config?.automation),worldbooks:tf(n?.config?.worldbooks),extraction:{enabled:!0,maxMessages:Pc(n?.config?.context?.depth,5),selectors:s,regexPresetId:typeof n?.config?.extraction?.regexPresetId=="string"?n.config.extraction.regexPresetId:"",writebackTag:typeof n?.config?.extraction?.writebackTag=="string"?n.config.extraction.writebackTag:""},promptTemplate:a,runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},apiPreset:o,extractTags:s,isCustom:!0,category:n.category||"utility",metadata:{...n.metadata||{}}}}function Tr(){let t=Ne.get(Je.TOOLS),e=r0(t);return t&&JSON.stringify(t)!==JSON.stringify(e)&&Ne.set(Je.TOOLS,e),{...ci,...e}}function _r(t){return Tr()[t]||null}function ks(t,e){if(!t||!e)return!1;let r=Ne.get(Je.TOOLS)||{},n=!r[t]&&!ci[t],s=Gn({...r[t]||{},...e,id:t,metadata:{...r[t]?.metadata||{},...e.metadata||{},createdAt:r[t]?.metadata?.createdAt||e?.metadata?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString()}});return r[t]=s,Ne.set(Je.TOOLS,r),G.emit(n?W.TOOL_REGISTERED:W.TOOL_UPDATED,{toolId:t,tool:s}),!0}function Is(t){let e=Ne.get(Je.TOOLS)||{};return!e[t]&&!ci[t]||ci[t]?!1:(delete e[t],Ne.set(Je.TOOLS,e),G.emit(W.TOOL_UNREGISTERED,{toolId:t}),!0)}function di(){return Ne.get(Je.PRESETS)||{}}function rf(t,e){if(!t||!e)return!1;let r=di(),n=!r[t];return r[t]={...e,name:t,updatedAt:new Date().toISOString()},Ne.set(Je.PRESETS,r),G.emit(n?W.PRESET_CREATED:W.PRESET_UPDATED,{type:"tool",presetName:t,preset:r[t]}),!0}function nf(t){let e=di();return e[t]?(delete e[t],Ne.set(Je.PRESETS,e),G.emit(W.PRESET_DELETED,{type:"tool",presetName:t}),!0):!1}function sf(){return Ne.get(Je.CURRENT_PRESET)||""}function of(t){return Ne.set(Je.CURRENT_PRESET,t||""),G.emit(W.PRESET_ACTIVATED,{type:"tool",presetName:t}),!0}function ui(t,e){let r=_r(t);if(!r)return!1;let n=Ne.get(Je.TOOLS)||{};return n[t]=Gn({...r,id:t,enabled:e,metadata:{...r?.metadata||{},createdAt:r?.metadata?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString()}}),Ne.set(Je.TOOLS,n),G.emit(e?W.TOOL_ENABLED:W.TOOL_DISABLED,{toolId:t,enabled:e}),!0}function Rs(){let t=Ne.get(Je.TOOLS)||{},e=Ne.get(Je.PRESETS)||{};return JSON.stringify({version:"1.0.0",exportedAt:new Date().toISOString(),tools:t,presets:e},null,2)}function Ms(t,e=!1){try{let r=typeof e=="object"?!!e?.overwrite:!!e,n=JSON.parse(t);if(!n||typeof n!="object")return{success:!1,toolsImported:0,presetsImported:0,message:"\u65E0\u6548\u7684JSON\u683C\u5F0F"};let s=r?{}:Ne.get(Je.TOOLS)||{},o=r?{}:Ne.get(Je.PRESETS)||{},a=0,i=0;if(n.tools&&typeof n.tools=="object"){for(let[l,d]of Object.entries(n.tools))!d||typeof d!="object"||(s[l]=Gn({...d,id:l}),a+=1);Ne.set(Je.TOOLS,s)}if(n.presets&&typeof n.presets=="object"){for(let[l,d]of Object.entries(n.presets))!d||typeof d!="object"||(o[l]={...d,name:l,updatedAt:new Date().toISOString()},i+=1);Ne.set(Je.PRESETS,o)}return{success:!0,toolsImported:a,presetsImported:i,message:`\u6210\u529F\u5BFC\u5165 ${a} \u4E2A\u5DE5\u5177\u548C ${i} \u4E2A\u9884\u8BBE`}}catch(r){return log.error("\u5DE5\u5177\u5BFC\u5165\u5931\u8D25",{error:r}),{success:!1,toolsImported:0,presetsImported:0,message:`\u5BFC\u5165\u5931\u8D25: ${r.message}`}}}function Ps(){Ne.remove(Je.TOOLS),Ne.remove(Je.PRESETS),Ne.remove(Je.CURRENT_PRESET)}var tr,ci,Je,o0,Fo=O(()=>{Ve();ct();tr={id:"",name:"",description:"",icon:"fa-screwdriver-wrench",order:100,category:"utility",promptTemplate:"",extractTags:[],config:{execution:{timeout:6e4,retries:3},api:{preset:"",useBypass:!1,bypassPreset:""},messages:[],context:{depth:3,includeTags:[],excludeTags:[]},automation:{settleMs:1200,cooldownMs:5e3},worldbooks:{enabled:!1,selected:[]}},enabled:!0,metadata:{createdAt:null,updatedAt:null,author:"",version:"1.0.0"}},ci={},Je={TOOLS:"tools",PRESETS:"tool_presets",CURRENT_PRESET:"current_tool_preset"};o0={getAllTools:Tr,getTool:_r,saveTool:ks,deleteTool:Is,setToolEnabled:ui,exportTools:Rs,importTools:Ms,resetTools:Ps,getToolPresets:di,saveToolPreset:rf,deleteToolPreset:nf,getCurrentToolPreset:sf,setCurrentToolPreset:of,createDefaultToolDefinition:Gn,normalizeToolDefinitionToRuntimeConfig:Uo}});var zc={};ge(zc,{TOOL_CATEGORIES:()=>lf,TOOL_REGISTRY:()=>Ns,appendToolRuntimeHistory:()=>wf,clearToolApiPreset:()=>hf,default:()=>y0,ensureToolRuntimeConfig:()=>$s,getAllDefaultToolConfigs:()=>Sf,getAllToolApiBindings:()=>bf,getAllToolFullConfigs:()=>qo,getEnabledTools:()=>Tf,getToolApiPreset:()=>Dc,getToolBaseConfig:()=>pi,getToolConfig:()=>Ho,getToolFullConfig:()=>he,getToolList:()=>yf,getToolSubTabs:()=>ff,getToolWindowState:()=>Ef,hasTool:()=>Oc,onPresetDeleted:()=>xf,patchToolRuntime:()=>on,registerTool:()=>uf,resetToolConfig:()=>vf,resetToolRegistry:()=>gf,saveToolConfig:()=>je,saveToolWindowState:()=>_f,setToolApiPreset:()=>mf,setToolApiPresetConfig:()=>d0,setToolBypassConfig:()=>u0,setToolOutputMode:()=>c0,setToolPromptTemplate:()=>p0,unregisterTool:()=>pf,updateToolRuntime:()=>Bc});function Yn(t={}){let e=Array.isArray(t?.recentWritebackHistory)?t.recentWritebackHistory.filter(Boolean):[];return{lastRunAt:Number.isFinite(t?.lastRunAt)?t.lastRunAt:0,lastStatus:typeof t?.lastStatus=="string"?t.lastStatus:"idle",lastError:typeof t?.lastError=="string"?t.lastError:"",lastDurationMs:Number.isFinite(t?.lastDurationMs)?t.lastDurationMs:0,successCount:Number.isFinite(t?.successCount)?t.successCount:0,errorCount:Number.isFinite(t?.errorCount)?t.errorCount:0,lastMessageKey:typeof t?.lastMessageKey=="string"?t.lastMessageKey:"",lastExecutionKey:typeof t?.lastExecutionKey=="string"?t.lastExecutionKey:"",lastExecutionPath:typeof t?.lastExecutionPath=="string"?t.lastExecutionPath:"",lastWritebackStatus:typeof t?.lastWritebackStatus=="string"?t.lastWritebackStatus:"",lastFailureStage:typeof t?.lastFailureStage=="string"?t.lastFailureStage:"",lastSlotBindingKey:typeof t?.lastSlotBindingKey=="string"?t.lastSlotBindingKey:"",lastSlotRevisionKey:typeof t?.lastSlotRevisionKey=="string"?t.lastSlotRevisionKey:"",lastSlotTransactionId:typeof t?.lastSlotTransactionId=="string"?t.lastSlotTransactionId:"",lastSourceMessageId:typeof t?.lastSourceMessageId=="string"?t.lastSourceMessageId:"",lastSourceSwipeId:typeof t?.lastSourceSwipeId=="string"?t.lastSourceSwipeId:"",lastContentCommitted:t?.lastContentCommitted===!0,lastHostCommitApplied:t?.lastHostCommitApplied===!0,lastRefreshRequested:t?.lastRefreshRequested===!0,lastRefreshConfirmed:t?.lastRefreshConfirmed===!0,lastPreferredCommitMethod:typeof t?.lastPreferredCommitMethod=="string"?t.lastPreferredCommitMethod:"",lastAppliedCommitMethod:typeof t?.lastAppliedCommitMethod=="string"?t.lastAppliedCommitMethod:"",lastRefreshMethodCount:Number.isFinite(t?.lastRefreshMethodCount)?t.lastRefreshMethodCount:0,lastRefreshMethods:Array.isArray(t?.lastRefreshMethods)?t.lastRefreshMethods.filter(Boolean):[],lastRefreshConfirmChecks:Number.isFinite(t?.lastRefreshConfirmChecks)?t.lastRefreshConfirmChecks:0,lastRefreshConfirmedBy:typeof t?.lastRefreshConfirmedBy=="string"?t.lastRefreshConfirmedBy:"",lastTraceId:typeof t?.lastTraceId=="string"?t.lastTraceId:"",lastAutoRunAt:Number.isFinite(t?.lastAutoRunAt)?t.lastAutoRunAt:0,lastAutoStatus:typeof t?.lastAutoStatus=="string"?t.lastAutoStatus:"idle",lastAutoMessageId:typeof t?.lastAutoMessageId=="string"?t.lastAutoMessageId:"",lastAutoSwipeId:typeof t?.lastAutoSwipeId=="string"?t.lastAutoSwipeId:"",lastAutoRevisionKey:typeof t?.lastAutoRevisionKey=="string"?t.lastAutoRevisionKey:"",lastAutoWritebackStatus:typeof t?.lastAutoWritebackStatus=="string"?t.lastAutoWritebackStatus:"",lastAutoRefreshConfirmed:t?.lastAutoRefreshConfirmed===!0,lastAutoSkipReason:typeof t?.lastAutoSkipReason=="string"?t.lastAutoSkipReason:"",recentWritebackHistory:e}}function a0(t,e=10){let r=Number.isFinite(e)?Math.max(1,Math.min(50,Math.floor(e))):10;return Array.isArray(t)?t.length<=r?t:t.slice(t.length-r):[]}function cf(){let t=Tr()||{};return Object.entries(t).filter(([e])=>!Wo[e]).map(([e,r])=>[e,r||{}])}function Nc(t={}){return t?.toolKind==="script"?"script":t?.toolKind==="ai"?"ai":t?.output?.mode==="local_transform"||t?.processor?.type?"script":"ai"}function df(){let t=Array.isArray(Ns.tools?.subTabs)?Ns.tools.subTabs.map((r,n)=>({...r,order:Number.isFinite(r?.order)?r.order:n,toolKind:Nc(r),toolGroupLabel:Nc(r)==="script"?"\u811A\u672C\u5DE5\u5177":"AI \u5DE5\u5177"})):[],e=cf().map(([r,n],s)=>{let o=Uo(r,n),a=Nc(o);return{id:r,name:o.name||r,icon:o.icon||"fa-screwdriver-wrench",component:"GenericToolConfigPanel",order:Number.isFinite(o.order)?o.order:100+s,isCustom:!0,description:o.description||"",toolKind:a,toolGroupLabel:a==="script"?"\u811A\u672C\u5DE5\u5177":"AI \u5DE5\u5177"}});return[...t,...e].sort((r,n)=>(r.order??0)-(n.order??0))}function i0(t,e={}){let r=Uo(t,e,{defaultOutputMode:"follow_ai"});return{...r,runtime:Yn(r.runtime)}}function Lc(t){let e=Wo[t];if(e)return{...e,output:{...e.output||{}},bypass:{...e.bypass||{}},worldbooks:{...e.worldbooks||{},selected:Array.isArray(e?.worldbooks?.selected)?[...e.worldbooks.selected]:[]},extraction:{...e.extraction||{}},processor:{...e.processor||{},options:{...e?.processor?.options||{}}},runtime:Yn(e.runtime),extractTags:Array.isArray(e.extractTags)?[...e.extractTags]:[]};let n=(Tr()||{})[t]||null;return n?i0(t,n):Ho(t)}function pi(t){let e=Lc(t);return e?{...e,output:{...e.output||{}},automation:{...e.automation||{}},bypass:{...e.bypass||{}},worldbooks:{...e.worldbooks||{},selected:Array.isArray(e?.worldbooks?.selected)?[...e.worldbooks.selected]:[]},extraction:{...e.extraction||{},selectors:Array.isArray(e?.extraction?.selectors)?[...e.extraction.selectors]:[]},processor:{...e.processor||{},options:{...e?.processor?.options||{}}},runtime:{...e.runtime||{}},extractTags:Array.isArray(e.extractTags)?[...e.extractTags]:[]}:null}function l0(t,e={},r=""){if(!t)return null;let n={...t,...e,id:t.id||e.id};n.output={...t.output||{},...e.output||{}},n.automation={settleMs:Number.isFinite(e?.automation?.settleMs)?e.automation.settleMs:Number.isFinite(t?.automation?.settleMs)?t.automation.settleMs:1200,cooldownMs:Number.isFinite(e?.automation?.cooldownMs)?e.automation.cooldownMs:Number.isFinite(t?.automation?.cooldownMs)?t.automation.cooldownMs:5e3},n.bypass={...t.bypass||{},...e.bypass||{}},n.worldbooks={...t.worldbooks||{},...e.worldbooks||{},selected:Array.isArray(e?.worldbooks?.selected)?[...e.worldbooks.selected]:Array.isArray(t?.worldbooks?.selected)?[...t.worldbooks.selected]:[]},n.runtime=Yn({...t.runtime||{},...e.runtime||{}}),n.extraction={...t.extraction||{},...e.extraction||{}},n.processor={...t.processor||{},...e.processor||{},options:{...t?.processor?.options||{},...e?.processor?.options||{}}};let s=e?.output?.apiPreset||e?.apiPreset||n.output?.apiPreset||n.apiPreset||r||"";return n.output={...n.output||{},apiPreset:s},n.apiPreset=s,t.isCustom?n.enabled=t.enabled!==!1:typeof e.enabled=="boolean"?n.enabled=e.enabled:n.enabled=t.enabled!==!1,n}function uf(t,e){if(!t||typeof t!="string")return pt.error("\u5DE5\u5177ID\u65E0\u6548"),!1;if(!e||typeof e!="object")return pt.error("\u5DE5\u5177\u914D\u7F6E\u65E0\u6548"),!1;let r=["name","icon","component"];for(let n of r)if(!e[n])return pt.error(` \u5DE5\u5177\u7F3A\u5C11\u5FC5\u9700\u5B57\u6BB5: ${n}`),!1;return Er[t]={id:t,...e,order:e.order??Object.keys(Er).length},pt.log(` \u5DE5\u5177\u5DF2\u6CE8\u518C: ${t}`),!0}function pf(t){return Er[t]?(delete Er[t],pt.log(` \u5DE5\u5177\u5DF2\u6CE8\u9500: ${t}`),!0):(pt.warn(` \u5DE5\u5177\u4E0D\u5B58\u5728: ${t}`),!1)}function yf(t=!0){let e=Object.values(Er).map(r=>r.id==="tools"?{...r,subTabs:df()}:r);return t?e.sort((r,n)=>(r.order??0)-(n.order??0)):e}function Ho(t){return t==="tools"&&Er[t]?{...Er[t],subTabs:df()}:Er[t]||null}function Oc(t){return!!Er[t]}function ff(t){let e=Ho(t);return!e||!e.hasSubTabs?[]:e.subTabs||[]}function gf(){Er={...Ns},pt.log("\u5DE5\u5177\u6CE8\u518C\u8868\u5DF2\u91CD\u7F6E")}function mf(t,e){if(!Oc(t))return pt.warn(` \u5DE5\u5177\u4E0D\u5B58\u5728: ${t}`),!1;let r=U.get(rr)||{};return r[t]=e||"",U.set(rr,r),pt.log(` \u5DE5\u5177 "${t}" \u7ED1\u5B9A\u5230\u9884\u8BBE "${e||"\u5F53\u524D\u914D\u7F6E"}"`),!0}function Dc(t){return(U.get(rr)||{})[t]||""}function hf(t){let e=U.get(rr)||{};delete e[t],U.set(rr,e),pt.log(` \u5DE5\u5177 "${t}" \u7684API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u6E05\u9664`)}function bf(){return U.get(rr)||{}}function xf(t){let e=U.get(rr)||{},r=!1;for(let n in e)e[n]===t&&(e[n]="",r=!0,pt.log(` \u5DE5\u5177 "${n}" \u7684API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u6E05\u9664\uFF08\u9884\u8BBE\u88AB\u5220\u9664\uFF09`));r&&U.set(rr,e)}function he(t){let e=Lc(t);if(!e)return Ho(t);let n=(U.get(sn)||{})[t]||{},s=Dc(t),o=l0({...e,id:t},n,s);return pt.debug(`[PRESET] getToolFullConfig ${t}`,{base_extraction:JSON.parse(JSON.stringify(e.extraction||{})),base_worldbooks:JSON.parse(JSON.stringify(e.worldbooks||{})),user_extraction:JSON.parse(JSON.stringify(n.extraction||{})),user_worldbooks:JSON.parse(JSON.stringify(n.worldbooks||{})),merged_extraction:JSON.parse(JSON.stringify(o.extraction||{})),merged_worldbooks:JSON.parse(JSON.stringify(o.worldbooks||{}))}),o}function $s(t){if(!t)return!1;let e=Lc(t);if(!e)return!1;let r=U.get(sn)||{};if(r[t])return!0;let n={promptTemplate:e.promptTemplate||"",enabled:e.enabled!==!1,extractTags:Array.isArray(e.extractTags)?[...e.extractTags]:[],apiPreset:e.apiPreset||"",output:{...e.output||{}},automation:{...e.automation||{}},bypass:{...e.bypass||{}},worldbooks:{...e.worldbooks||{},selected:Array.isArray(e?.worldbooks?.selected)?[...e.worldbooks.selected]:[]},extraction:{...e.extraction||{},selectors:Array.isArray(e?.extraction?.selectors)?[...e.extraction.selectors]:[]},processor:{...e.processor||{},options:{...e?.processor?.options||{}}},runtime:{...e.runtime||{}}};r[t]=n,U.set(sn,r);let s=U.get(rr)||{};return s[t]=n.output?.apiPreset||n.apiPreset||"",U.set(rr,s),G.emit(W.TOOL_UPDATED,{toolId:t,config:n}),!0}function je(t,e,r={}){if(!t||!he(t))return pt.warn("\u5DE5\u5177\u4E0D\u5B58\u5728:",t),!1;let{emitEvent:n=!0}=r,s=U.get(sn)||{},o=U.get(rr)||{},a=e?.output?.apiPreset??e?.apiPreset??"",i=["promptTemplate","enabled","extractTags","apiPreset","output","automation","bypass","worldbooks","extraction","processor","runtime"];return s[t]={},i.forEach(l=>{if(e[l]!==void 0){if(l==="output"&&e.output){s[t][l]={...e.output,apiPreset:a};return}if(l==="apiPreset"){s[t][l]=a;return}s[t][l]=e[l]}}),s[t].apiPreset===void 0&&(s[t].apiPreset=a),!s[t].output&&e.output!==void 0&&(s[t].output={...e.output||{},apiPreset:a}),U.set(sn,s),o[t]=a,U.set(rr,o),pt.debug(`[PRESET] saveToolConfig ${t}`,{input_extraction:JSON.parse(JSON.stringify(e.extraction||{})),input_worldbooks:JSON.parse(JSON.stringify(e.worldbooks||{})),saved_extraction:JSON.parse(JSON.stringify(s[t].extraction||{})),saved_worldbooks:JSON.parse(JSON.stringify(s[t].worldbooks||{})),verify_storage:JSON.parse(JSON.stringify((U.get(sn)||{})[t]?.extraction||{}))}),n&&G.emit(W.TOOL_UPDATED,{toolId:t,config:s[t]}),pt.log(` \u5DE5\u5177\u914D\u7F6E\u5DF2\u4FDD\u5B58: ${t}`),!0}function c0(t,e){let r=he(t);return r?je(t,{...r,output:{...r.output,mode:e}}):!1}function d0(t,e){let r=he(t);return r?je(t,{...r,apiPreset:e,output:{...r.output,apiPreset:e}}):!1}function u0(t,e){let r=he(t);return r?je(t,{...r,bypass:{...r.bypass,...e}}):!1}function p0(t,e){let r=he(t);return r?je(t,{...r,promptTemplate:e}):!1}function on(t,e,r={}){let n=he(t);if(!n)return!1;let{touchLastRunAt:s=!1,emitEvent:o=!1,emitRuntimeEvent:a=!0}=r,i=Yn({...n.runtime||{},...e||{}});s&&(i.lastRunAt=Date.now());let l=je(t,{...n,runtime:i},{emitEvent:o});return l&&a&&G.emit(W.TOOL_RUNTIME_UPDATED,{toolId:t,runtime:i,previousRuntime:Yn(n.runtime||{})}),l}function wf(t,e,r={},n={}){let s=he(t);if(!s)return!1;let{limit:o=10,emitEvent:a=!1,emitRuntimeEvent:i=!0}=n,l=Yn(s.runtime||{}),d=Yn(s.runtime||{}),c="recentWritebackHistory",u={id:r?.id||`hist_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,at:r?.at||Date.now(),...r};l[c]=a0([...Array.isArray(l[c])?l[c]:[],u],o),u?.traceId&&(l.lastTraceId=u.traceId);let y=je(t,{...s,runtime:l},{emitEvent:a});return y&&i&&G.emit(W.TOOL_RUNTIME_UPDATED,{toolId:t,runtime:l,previousRuntime:d,historyType:e,historyEntry:u}),y}function Bc(t,e,r={}){let{touchLastRunAt:n=!0,emitEvent:s=!1,emitRuntimeEvent:o=!0}=r;return on(t,e,{touchLastRunAt:n,emitEvent:s,emitRuntimeEvent:o})}function vf(t){if(!t||!Wo[t])return pt.warn("\u5DE5\u5177\u4E0D\u5B58\u5728:",t),!1;let e=U.get(sn)||{};return delete e[t],U.set(sn,e),G.emit(W.TOOL_UPDATED,{toolId:t,config:null}),pt.log(` \u5DE5\u5177\u914D\u7F6E\u5DF2\u91CD\u7F6E: ${t}`),!0}function Sf(){return{...Wo}}function qo(){let t=new Set([...Object.keys(Wo),...cf().map(([e])=>e)]);return Array.from(t).map(e=>he(e)).filter(Boolean)}function Tf(){return qo().filter(t=>t&&t.enabled)}function _f(t,e){let r=U.get($c)||{};r[t]={...e,updatedAt:Date.now()},U.set($c,r)}function Ef(t){return(U.get($c)||{})[t]||null}var pt,sn,rr,$c,Wo,Ns,lf,Er,y0,Ar=O(()=>{Ve();ct();J();Fo();pt=N.createScope("ToolRegistry"),sn="tool_configs",rr="tool_api_bindings",$c="tool_window_states";Wo={summaryTool:{id:"summaryTool",name:"\u6458\u8981\u5DE5\u5177",icon:"fa-file-lines",description:"\u751F\u6210\u5267\u60C5\u6458\u8981\u5757",enabled:!0,order:3,bypass:{enabled:!1,presetId:""},output:{mode:"follow_ai",apiPreset:"",overwrite:!0,enabled:!0},automation:{settleMs:1200,cooldownMs:5e3},worldbooks:{enabled:!1,selected:[]},extraction:{enabled:!0,maxMessages:5,regexPresetId:"builtin_regex_summary"},promptTemplate:`\u8BF7\u6839\u636E\u4EE5\u4E0BAI\u56DE\u590D\u751F\u6210\u6458\u8981\u5757\uFF1A

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
</youyou>`,runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},apiPreset:"",extractTags:[]},escapeTransformTool:{id:"escapeTransformTool",name:"\u8F6C\u4E49\u5904\u7406",icon:"fa-quote-left",description:"\u5BF9\u63D0\u53D6\u5185\u5BB9\u6267\u884C\u672C\u5730\u8F6C\u4E49\u6216\u53BB\u8F6C\u4E49",enabled:!0,order:6,output:{mode:"local_transform",apiPreset:"",overwrite:!0,enabled:!0,autoTrigger:!0},extraction:{enabled:!0,maxMessages:5,selectors:[]},processor:{type:"escape_transform",direction:"escape",options:{doubleQuote:!0,singleQuote:!1,newline:!1}},runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},extractTags:[]},punctuationTransformTool:{id:"punctuationTransformTool",name:"\u4E2D\u6587\u6807\u70B9\u66FF\u6362",icon:"fa-language",description:"\u5C06\u82F1\u6587\u6807\u70B9\u6309\u52FE\u9009\u9879\u66FF\u6362\u4E3A\u4E2D\u6587\u6807\u70B9",enabled:!0,order:7,output:{mode:"local_transform",apiPreset:"",overwrite:!0,enabled:!0,autoTrigger:!0},extraction:{enabled:!0,maxMessages:5,selectors:[]},processor:{type:"punctuation_transform",direction:"en_to_zh",options:{comma:!0,period:!0,exclamation:!0,question:!0,semicolon:!1,colon:!1,leftParen:!1,rightParen:!1}},runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},extractTags:[]}},Ns={presetManagement:{id:"presetManagement",name:"\u9884\u8BBE\u7BA1\u7406",icon:"fa-bookmark",hasSubTabs:!0,description:"\u7EDF\u4E00\u7BA1\u7406 API / \u6B63\u5219 / \u4E16\u754C\u4E66 / \u8868\u683C\u6A21\u677F\u9884\u8BBE",order:0,subTabs:[{id:"apiPresets",name:"API \u9884\u8BBE",icon:"fa-database",component:"ApiPresetPanel",presetKind:"api"},{id:"regexPresets",name:"\u6B63\u5219\u63D0\u53D6",icon:"fa-filter",component:"RegexExtractPanel",presetKind:"regex"},{id:"worldbookPresets",name:"\u4E16\u754C\u4E66",icon:"fa-book-atlas",component:"WorldbookPresetPanel",presetKind:"worldbook"},{id:"tableTemplates",name:"\u8868\u683C\u6A21\u677F",icon:"fa-table-list",component:"TableTemplatePanel",presetKind:"table"}]},tools:{id:"tools",name:"\u5DE5\u5177",icon:"fa-tools",hasSubTabs:!0,description:"\u5DE5\u5177\u96C6\u5408",order:4,subTabs:[{id:"summaryTool",name:"\u6458\u8981\u5DE5\u5177",icon:"fa-file-lines",component:"SummaryToolPanel",toolKind:"ai"},{id:"statusBlock",name:"\u4E3B\u89D2\u72B6\u6001\u680F",icon:"fa-user-check",component:"StatusBlockPanel",toolKind:"ai"},{id:"youyouReview",name:"\u5C0F\u5E7D\u70B9\u8BC4",icon:"fa-comment-dots",component:"YouyouReviewPanel",toolKind:"ai"},{id:"escapeTransformTool",name:"\u8F6C\u4E49\u5904\u7406",icon:"fa-quote-left",component:"EscapeTransformToolPanel",toolKind:"script"},{id:"punctuationTransformTool",name:"\u4E2D\u6587\u6807\u70B9\u66FF\u6362",icon:"fa-language",component:"PunctuationTransformToolPanel",toolKind:"script"}]},tableWorkbench:{id:"tableWorkbench",name:"\u586B\u8868\u5DE5\u4F5C\u53F0",icon:"fa-table-cells",hasSubTabs:!1,description:"\u7ED3\u6784\u5316\u586B\u8868\u4E0E\u72B6\u6001\u9884\u89C8\u5DE5\u4F5C\u53F0",component:"TableWorkbenchPanel",order:5},bypass:{id:"bypass",name:"Ai\u6307\u4EE4\u9884\u8BBE",icon:"fa-shield-halved",hasSubTabs:!1,description:"\u7BA1\u7406 Ai \u6307\u4EE4\u9884\u8BBE",component:"BypassPanel",order:6},settings:{id:"settings",name:"\u8BBE\u7F6E",icon:"fa-cog",hasSubTabs:!1,description:"\u5168\u5C40\u8BBE\u7F6E",component:"SettingsPanel",order:7},logger:{id:"logger",name:"\u65E5\u5FD7",icon:"fa-terminal",hasSubTabs:!1,description:"\u67E5\u770B\u63D2\u4EF6\u8FD0\u884C\u65E5\u5FD7\uFF0C\u652F\u6301\u8FC7\u6EE4\u4E0E\u5BFC\u51FA",component:"LoggerPanel",order:8}},lf={api:{name:"API\u5DE5\u5177",icon:"fa-plug",order:0},prompt:{name:"\u63D0\u793A\u8BCD\u5DE5\u5177",icon:"fa-file-alt",order:1},utility:{name:"\u5B9E\u7528\u5DE5\u5177",icon:"fa-wrench",order:2}},Er={...Ns};y0={TOOL_REGISTRY:Ns,TOOL_CATEGORIES:lf,registerTool:uf,unregisterTool:pf,getToolList:yf,getToolConfig:Ho,hasTool:Oc,getToolSubTabs:ff,resetToolRegistry:gf,setToolApiPreset:mf,getToolApiPreset:Dc,clearToolApiPreset:hf,getAllToolApiBindings:bf,onPresetDeleted:xf,saveToolWindowState:_f,getToolWindowState:Ef,getToolBaseConfig:pi,ensureToolRuntimeConfig:$s,getToolFullConfig:he,patchToolRuntime:on,appendToolRuntimeHistory:wf,saveToolConfig:je,resetToolConfig:vf,getAllDefaultToolConfigs:Sf,getAllToolFullConfigs:qo,getEnabledTools:Tf}});function gi(){return`rgx_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`}function If(){return`r_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,6)}`}function Uc(t={}){let e=Object.values(dr).includes(t.type)?t.type:dr.INCLUDE;return{id:String(t.id||If()),name:String(t.name||"").trim(),description:String(t.description||""),type:e,value:String(t.value||""),enabled:t.enabled!==!1}}function Cr(t={}){return{id:String(t.id||gi()),name:String(t.name||"").trim()||"\u672A\u547D\u540D\u9884\u8BBE",description:String(t.description||""),rules:Array.isArray(t.rules)?t.rules.map(Uc):[],blacklist:Array.isArray(t.blacklist)?t.blacklist.map(e=>String(e||"").trim()).filter(Boolean):[],createdAt:Number.isFinite(t.createdAt)?t.createdAt:Date.now(),updatedAt:Number.isFinite(t.updatedAt)?t.updatedAt:Date.now()}}function Dr(){let t=Ke.get(jc);return!t||typeof t!="object"?{}:t}function Go(t){Ke.set(jc,t)}function Vn(t){return typeof t=="string"&&t.startsWith(f0)}function Rf(t){return Vn(t)&&yi.find(e=>e.id===t)||null}function Fc(t){if(!Array.isArray(t)){yi=[];return}yi=t.map(e=>Cr({...e,id:String(e?.id||"")})).filter(e=>Vn(e.id))}function Os(){if(kf)return;kf=!0;let t=U.get(Af)||{};if(t[Cf]===!0)return;let e=Dr(),r=Object.keys(e).length>0,n=0,s={...e},o=t.tagRulePresets||{};for(let a of Object.values(o)){let i=Cr({id:gi(),name:a.name||"\u5DF2\u8FC1\u79FB\u9884\u8BBE",description:a.description||"",rules:a.rules||[],blacklist:a.blacklist||[],createdAt:typeof a.createdAt=="string"&&Date.parse(a.createdAt)||Date.now(),updatedAt:Date.now()});s[i.id]=i,n+=1}if(!r&&n===0){let a=Array.isArray(t.tagRules)?t.tagRules:[],i=Array.isArray(t.contentBlacklist)?t.contentBlacklist:[];if(a.length||i.length){let l=Cr({name:"\u9ED8\u8BA4\u89C4\u5219\u96C6\uFF08\u8FC1\u79FB\uFF09",description:"\u4ECE\u8001\u7248\u672C\u7684\u5F53\u524D\u89C4\u5219\u8FC1\u79FB\u800C\u6765",rules:a,blacklist:i});s[l.id]=l,Ke.set(Ls,l.id),n+=1}}n>0&&(Go(s),an.info(`\u5DF2\u4ECE\u8001\u6570\u636E\u8FC1\u79FB ${n} \u4E2A\u6B63\u5219\u9884\u8BBE`)),U.set(Af,{...t,[Cf]:!0})}function g0(){Os();let t=Dr(),e=new Set,r=[];for(let s of yi){let o=t[s.id];o?(r.push(Cr(o)),e.add(s.id)):r.push(s)}let n=Object.values(t).map(Cr).filter(s=>!e.has(s.id)).sort((s,o)=>o.updatedAt-s.updatedAt);return r.push(...n),r}function Br(t){if(!t)return null;Os();let e=Dr();return e[t]?Cr(e[t]):Vn(t)?Rf(t):null}function mi(){Os();let t=Ke.get(Ls);return typeof t=="string"&&t?t:""}function Mf(){let t=mi();return t?Br(t):null}function m0(t){if(t&&Vn(t))return Ke.set(Ls,t),fi(),G.emit(W.PRESET_ACTIVATED,{kind:"regex",id:t}),!0;let e=Dr();return t&&!e[t]?(an.warn(`setCurrentPresetId \u627E\u4E0D\u5230\u9884\u8BBE: ${t}`),!1):(Ke.set(Ls,t||""),fi(),G.emit(W.PRESET_ACTIVATED,{kind:"regex",id:t}),!0)}function hi(t={}){Os();let e=Cr({...t,id:gi(),createdAt:Date.now(),updatedAt:Date.now()}),r=Dr();return r[e.id]=e,Go(r),G.emit(W.PRESET_CREATED,{kind:"regex",id:e.id}),an.info(`\u521B\u5EFA\u9884\u8BBE: ${e.id} (${e.name})`),e}function Jn(t,e={}){if(!t)return null;let r=Dr(),n=r[t];if(!n&&Vn(t)&&(n=Rf(t)),!n)return null;let s=Cr({...n,...e,id:t,createdAt:n.createdAt,updatedAt:Date.now()});return r[t]=s,Go(r),mi()===t&&Kc(s),G.emit(W.PRESET_UPDATED,{kind:"regex",id:t}),s}function h0(t){if(!t)return!1;if(Vn(t))return an.warn(`\u62D2\u7EDD\u5220\u9664\u5185\u7F6E\u9884\u8BBE: ${t}`),!1;let e=Dr();return e[t]?(delete e[t],Go(e),mi()===t&&(Ke.set(Ls,""),fi()),G.emit(W.PRESET_DELETED,{kind:"regex",id:t}),an.info(`\u5220\u9664\u9884\u8BBE: ${t}`),!0):!1}function b0(t,{nameSuffix:e=" \u526F\u672C"}={}){let r=Br(t);return r?hi({...r,id:void 0,name:`${r.name}${e}`}):null}function x0(t,e){return Vn(t)?(an.warn(`\u62D2\u7EDD\u91CD\u547D\u540D\u5185\u7F6E\u9884\u8BBE: ${t}`),null):Jn(t,{name:String(e||"").trim()||"\u672A\u547D\u540D\u9884\u8BBE"})}function w0(t,e={}){let r=Br(t);if(!r)return null;let n=Uc({...e,id:If()}),s=[...r.rules,n];return Jn(t,{rules:s})}function v0(t,e,r={}){let n=Br(t);if(!n)return null;let s=n.rules.map(o=>o.id===e?Uc({...o,...r,id:o.id}):o);return Jn(t,{rules:s})}function S0(t,e){let r=Br(t);if(!r)return null;let n=r.rules.filter(s=>s.id!==e);return Jn(t,{rules:n})}function T0(t,e,r){let n=Br(t);if(!n)return null;let s=n.rules.findIndex(i=>i.id===e);if(s<0)return null;let o=r==="up"?s-1:s+1;if(o<0||o>=n.rules.length)return null;let a=[...n.rules];return[a[s],a[o]]=[a[o],a[s]],Jn(t,{rules:a})}function _0(t,e){let r=Array.isArray(e)?e.map(n=>String(n||"").trim()).filter(Boolean):[];return Jn(t,{blacklist:Array.from(new Set(r))})}function E0(){return Os(),{version:1,exportedAt:Date.now(),presets:Object.values(Dr()).map(Cr)}}function A0(t){if(Os(),!t||typeof t!="object")return{added:0};let e=Array.isArray(t.presets)?t.presets:[],r=Dr(),n=0;for(let s of e){let o=Cr({...s,id:gi(),createdAt:Date.now(),updatedAt:Date.now()});r[o.id]=o,n+=1}return n>0&&(Go(r),G.emit(W.PRESET_IMPORTED,{kind:"regex",count:n})),{added:n}}function C0(){Ke.set(jc,{}),Ke.set(Ls,""),fi(),an.info("\u5DF2\u6E05\u7A7A\u6240\u6709\u6B63\u5219\u9884\u8BBE")}async function Kc(t){if(t)try{let e=await Promise.resolve().then(()=>(Cs(),Mc));typeof e.setCurrentRules=="function"&&e.setCurrentRules(JSON.parse(JSON.stringify(t.rules||[]))),typeof e.setContentBlacklist=="function"&&e.setContentBlacklist(JSON.parse(JSON.stringify(t.blacklist||[])))}catch(e){an.warn("\u540C\u6B65\u5230 regex-extractor \u5931\u8D25",{error:e})}}function fi(){let t=Mf();return Kc(t||{rules:[],blacklist:[]})}async function k0(t){if(!t)return[];try{let e=await Promise.resolve().then(()=>(Ar(),zc));return(typeof e.getToolList=="function"?e.getToolList(!1):[]).filter(n=>(typeof e.getToolFullConfig=="function"?e.getToolFullConfig(n.id):null)?.extraction?.regexPresetId===t).map(n=>n.id)}catch{return[]}}var an,jc,Ls,Af,Cf,dr,f0,yi,kf,Le,ln=O(()=>{Ve();ct();J();an=N.createScope("RegexPresetStore"),jc="regex_presets",Ls="regex_current_preset",Af="settings",Cf="regex_presets_migrated",dr=Object.freeze({INCLUDE:"include",EXCLUDE:"exclude",REGEX_INCLUDE:"regex_include",REGEX_EXCLUDE:"regex_exclude"});f0="builtin_regex_",yi=[];kf=!1;Le={listPresets:g0,getPreset:Br,getCurrentPresetId:mi,getCurrentPreset:Mf,setCurrentPresetId:m0,createPreset:hi,updatePreset:Jn,deletePreset:h0,duplicatePreset:b0,renamePreset:x0,addRule:w0,updateRule:v0,deleteRule:S0,moveRule:T0,setBlacklist:_0,exportAll:E0,importPresets:A0,resetAll:C0,findLinkedTools:k0,RULE_TYPES:dr}});var Lf={};ge(Lf,{RegexExtractPanel:()=>$f,default:()=>L0});function R0(t,e,r,n,s,o){let a=f("div",{style:{display:"grid",gridTemplateColumns:"auto auto minmax(140px, 1fr) 200px minmax(120px, 2fr) auto",gap:"10px",alignItems:"center",padding:"10px 0",borderTop:r===0?"none":"1px solid var(--yyt-border)",opacity:e.enabled===!1?"0.55":"1"},attrs:{draggable:o?null:"true","data-rule-id":e.id}}),i=f("div",{style:{cursor:o?"default":"grab",padding:"4px",color:"var(--yyt-text-muted)",fontSize:"14px",userSelect:"none"},text:"\u22EE\u22EE",title:o?"\u5185\u7F6E\u9884\u8BBE\u4E0D\u53EF\u91CD\u6392":"\u62D6\u52A8\u6392\u5E8F"});a.appendChild(i);let l=f("div",{style:{display:"flex",flexDirection:"column",gap:"2px"}}),d=te({label:"\u25B2",size:"small",variant:"ghost",title:"\u4E0A\u79FB",disabled:o||r===0,style:{padding:"0 6px",minHeight:"auto",fontSize:"9px"},onClick:()=>{Le.moveRule(t.id,e.id,"up"),s()}}),c=te({label:"\u25BC",size:"small",variant:"ghost",title:"\u4E0B\u79FB",disabled:o||r===n-1,style:{padding:"0 6px",minHeight:"auto",fontSize:"9px"},onClick:()=>{Le.moveRule(t.id,e.id,"down"),s()}});l.appendChild(d.el),l.appendChild(c.el),a.appendChild(l);let u=f("div",{style:{display:"flex",flexDirection:"column",gap:"2px",minWidth:"0"}}),y=ve({value:e.name||"",placeholder:"\u89C4\u5219\u540D\uFF08\u53EF\u9009\uFF09",disabled:o,style:{fontSize:"12px",padding:"6px 10px"},onChange:x=>Le.updateRule(t.id,e.id,{name:x})});u.appendChild(y.el),e.description&&u.appendChild(f("div",{text:e.description,style:{fontSize:"10px",color:"var(--yyt-text-muted)"}})),a.appendChild(u);let p=Me({value:e.type,disabled:o,options:I0,style:{fontSize:"11px",padding:"6px 10px"},onChange:x=>{Le.updateRule(t.id,e.id,{type:x}),s()}});a.appendChild(p.el);let g=e.type===dr.REGEX_INCLUDE||e.type===dr.REGEX_EXCLUDE,m=ve({value:e.value||"",placeholder:g?"\u6B63\u5219\u8868\u8FBE\u5F0F...":"\u6807\u7B7E\u540D\uFF08\u5982 content\uFF09",disabled:o,style:{fontSize:"12px",padding:"6px 10px",fontFamily:"ui-monospace, monospace"},onChange:x=>Le.updateRule(t.id,e.id,{value:x})});a.appendChild(m.el);let h=f("div",{style:{display:"flex",gap:"6px",alignItems:"center"}}),b=Qe({checked:e.enabled!==!1,disabled:o,style:{padding:"0",border:"none",background:"transparent"},onChange:x=>{Le.updateRule(t.id,e.id,{enabled:x}),s()}});return h.appendChild(b.el),o||h.appendChild(te({label:"\xD7",size:"small",variant:"ghost",title:"\u5220\u9664\u89C4\u5219",onClick:()=>{Le.deleteRule(t.id,e.id),s()}}).el),a.appendChild(h),a}function M0(t,e,r){let n=null;t.addEventListener("dragstart",s=>{let o=s.target;if(!(o instanceof HTMLElement))return;let a=o.closest("[data-rule-id]");if(a){n=a.getAttribute("data-rule-id"),a.style.opacity="0.4";try{s.dataTransfer.effectAllowed="move",s.dataTransfer.setData("text/plain",n)}catch{}}}),t.addEventListener("dragend",s=>{let o=s.target;o instanceof HTMLElement&&(o.style.opacity=""),n=null}),t.addEventListener("dragover",s=>{if(n){s.preventDefault();try{s.dataTransfer.dropEffect="move"}catch{}}}),t.addEventListener("drop",s=>{if(s.preventDefault(),!n)return;let o=s.target instanceof HTMLElement?s.target.closest("[data-rule-id]"):null;if(!o)return;let a=o.getAttribute("data-rule-id");if(!a||a===n)return;let i=Le.getPreset(e.id);if(!i)return;let l=i.rules.findIndex(y=>y.id===n),d=i.rules.findIndex(y=>y.id===a);if(l<0||d<0)return;let c=[...i.rules],[u]=c.splice(l,1);c.splice(d,0,u),Le.updatePreset(e.id,{rules:c}),r()})}function P0(t,{onChange:e,readonly:r,refresh:n}){let s=f("div",{style:{display:"flex",flexDirection:"column",gap:"14px"}});Q(s,Ft({label:"\u63CF\u8FF0",control:ve({value:t.description,placeholder:"\u53EF\u9009 \u2014 \u5907\u6CE8\u7528\u9014",disabled:r,onChange:i=>e({description:i})})}));let o=f("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"6px"}},f("div",{text:"\u63D0\u53D6\u89C4\u5219\uFF08\u6309\u987A\u5E8F\u5E94\u7528\uFF09",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}}),r?f("span",{text:"\u5185\u7F6E\u9884\u8BBE\u53EA\u8BFB",style:{fontSize:"11px",color:"var(--yyt-text-muted)"}}):te({label:"+ \u65B0\u589E\u89C4\u5219",size:"small",onClick:()=>{Le.addRule(t.id,{type:dr.INCLUDE,value:"",enabled:!0}),n&&n()}}).el);Q(s,o);let a=f("div");if(t.rules.length){for(let i=0;i<t.rules.length;i++)a.appendChild(R0(t,t.rules[i],i,t.rules.length,n,r));r||M0(a,t,n)}else a.appendChild(f("div",{style:{padding:"14px 0",color:"var(--yyt-text-muted)",fontSize:"12px"},text:'\u5C1A\u65E0\u89C4\u5219\u3002\u70B9\u51FB\u53F3\u4E0A\u89D2"+ \u65B0\u589E\u89C4\u5219"\u5F00\u59CB\u6DFB\u52A0\u3002'}));if(Q(s,a),Q(s,f("div",{text:"\u5185\u5BB9\u9ED1\u540D\u5355",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)",marginTop:"6px",marginBottom:"4px"}})),Q(s,f("div",{text:"\u63D0\u53D6\u51FA\u7684\u5185\u5BB9\u5757\u82E5\u5305\u542B\u4EFB\u4E00\u5173\u952E\u8BCD\u5219\u8DF3\u8FC7\u8BE5\u5757\uFF08\u4E0D\u533A\u5206\u5927\u5C0F\u5199\uFF09\u3002",style:{fontSize:"11px",color:"var(--yyt-text-muted)",marginBottom:"6px"}})),r)Q(s,f("div",{style:{fontSize:"12px",color:"var(--yyt-text-muted)"},text:t.blacklist.length?t.blacklist.join("\u3001"):"\uFF08\u7A7A\uFF09"}));else{let i=yc({values:t.blacklist,placeholder:"\u8F93\u5165\u5173\u952E\u8BCD\u56DE\u8F66\u6DFB\u52A0",chipVariant:"danger",onChange:l=>Le.setBlacklist(t.id,l)});Q(s,i.el)}return s}function N0(t){if(!t)return null;let e=f("div",{style:{display:"flex",flexDirection:"column",gap:"8px"}});Q(e,f("div",{text:"\u6D4B\u8BD5\u63D0\u53D6",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}}));let r=Nf.get(t.id)||{input:"",output:""};Nf.set(t.id,r);let n=f("textarea",{className:"yyt-textarea",attrs:{rows:"5",placeholder:"\u7C98\u8D34\u6D4B\u8BD5\u6587\u672C\uFF08\u5982 AI \u56DE\u590D\u539F\u6587\uFF09..."},style:{width:"100%",resize:"vertical",fontFamily:"ui-monospace, monospace",fontSize:"12px"}});n.value=r.input,n.addEventListener("input",()=>{r.input=n.value}),Q(e,n);let s=f("div",{style:{padding:"10px",background:"var(--yyt-bg-base)",border:"1px solid var(--yyt-border)",borderRadius:"var(--yyt-radius-sm)",fontFamily:"ui-monospace, monospace",fontSize:"11px",lineHeight:"1.6",color:"var(--yyt-text-muted)",maxHeight:"200px",overflowY:"auto",whiteSpace:"pre-wrap",wordBreak:"break-all",minHeight:"50px"}});s.textContent=r.output||'// \u70B9\u51FB"\u8FD0\u884C\u6D4B\u8BD5"\u770B\u63D0\u53D6\u7ED3\u679C';let o=te({label:"\u25B6 \u8FD0\u884C\u6D4B\u8BD5",size:"small",variant:"primary",onClick:()=>{let a=n.value;if(!a.trim()){r.output="// \u6D4B\u8BD5\u8F93\u5165\u4E3A\u7A7A",s.textContent=r.output,s.style.color="var(--yyt-text-muted)";return}try{let i=Or(a,t.rules||[],t.blacklist||[]);r.output=i||"// \u6CA1\u6709\u63D0\u53D6\u5230\u5185\u5BB9",s.textContent=r.output,s.style.color=i?"var(--yyt-text)":"var(--yyt-text-muted)"}catch(i){r.output=`// \u6D4B\u8BD5\u51FA\u9519\uFF1A${i?.message||i}`,s.textContent=r.output,s.style.color="var(--yyt-danger, #f87171)"}}});return Q(e,o.el),Q(e,s),e}function $0(t){let e=t.rules.filter(r=>r.enabled!==!1).length;return[`${t.rules.length} \u89C4\u5219\uFF08${e} \u542F\u7528\uFF09`,`${t.blacklist.length} \u9ED1\u540D\u5355`]}var iI,I0,Nf,$f,L0,Of=O(()=>{Wt();ln();Cs();J();No();iI=N.createScope("RegexExtractPanel"),I0=[{value:dr.INCLUDE,label:"include \u2014 \u63D0\u53D6\u6807\u7B7E"},{value:dr.EXCLUDE,label:"exclude \u2014 \u6392\u9664\u6807\u7B7E"},{value:dr.REGEX_INCLUDE,label:"regex_include \u2014 \u6B63\u5219\u63D0\u53D6"},{value:dr.REGEX_EXCLUDE,label:"regex_exclude \u2014 \u6B63\u5219\u6392\u9664"}],Nf=new Map;$f=Zr({id:"regexExtractPanel",kind:"regex",panelTitle:"\u6B63\u5219\u63D0\u53D6\u9884\u8BBE",panelHint:"\u7BA1\u7406\u591A\u4E2A\u63D0\u53D6\u89C4\u5219\u96C6\uFF0C\u5DE5\u5177\u914D\u7F6E\u4E2D\u901A\u8FC7\u9884\u8BBE ID \u5F15\u7528\u3002\u89C4\u5219\u6309\u987A\u5E8F\u5E94\u7528\uFF0C\u53EF\u62D6\u62FD\u6392\u5E8F\u3002",store:Le,renderEditor:P0,renderExtras:N0,renderListItemMeta:$0}),L0=$f});function Pe(t){return t==null?"":String(t).trim()}function Df(t="table"){let e=Pe(t)||"table",r=Date.now().toString(36),n=Math.random().toString(36).slice(2,8);return`${e}_${r}_${n}`}function Wc(t="table"){return Df(t)}function zr(t="row"){return Df(t)}function ur(t,e=0){return Pe(t)||`table_${Number.isFinite(e)?e+1:1}`}function Yo(t,e=0){return Pe(t)||`row_${Number.isFinite(e)?e+1:1}`}function pe(t){if(t!==void 0)try{return JSON.parse(JSON.stringify(t))}catch{return t}}function Ds(t={}){return{chatId:Pe(t.chatId),sourceMessageId:Pe(t.sourceMessageId||t.messageId),sourceSwipeId:Pe(t.sourceSwipeId||t.effectiveSwipeId),effectiveSwipeId:Pe(t.effectiveSwipeId||t.sourceSwipeId),slotBindingKey:Pe(t.slotBindingKey),slotRevisionKey:Pe(t.slotRevisionKey),slotTransactionId:Pe(t.slotTransactionId),traceId:Pe(t.traceId),resolvedAt:Number.isFinite(t.resolvedAt)?t.resolvedAt:Date.now()}}function Hc(t={}){return{resolvedAt:Number.isFinite(t.resolvedAt)?t.resolvedAt:Date.now(),runSource:Pe(t.runSource)||yt.MANUAL,traceId:Pe(t.traceId),chatId:Pe(t.chatId),sourceMessageId:Pe(t.sourceMessageId||t.messageId),sourceSwipeId:Pe(t.sourceSwipeId||t.effectiveSwipeId),effectiveSwipeId:Pe(t.effectiveSwipeId||t.sourceSwipeId)||"swipe:current",slotBindingKey:Pe(t.slotBindingKey),slotRevisionKey:Pe(t.slotRevisionKey),slotTransactionId:Pe(t.slotTransactionId),assistantContentFingerprint:Pe(t.assistantContentFingerprint),assistantBaseFingerprint:Pe(t.assistantBaseFingerprint),assistantText:String(t.assistantText||""),assistantBaseText:String(t.assistantBaseText||""),targetMessageIndex:Number.isFinite(t.targetMessageIndex)?t.targetMessageIndex:-1}}function kr(t){return!t||typeof t!="object"?null:{chatId:Pe(t.chatId),slotBindingKey:Pe(t.slotBindingKey),slotRevisionKey:Pe(t.slotRevisionKey),sourceMessageId:Pe(t.sourceMessageId),sourceSwipeId:Pe(t.sourceSwipeId),tables:Array.isArray(t.tables)?pe(t.tables):[],updatedAt:Number.isFinite(t.updatedAt)?t.updatedAt:0,meta:t.meta&&typeof t.meta=="object"?pe(t.meta):{}}}function Vo(t={},e={}){let r=Hc(t),n=e.meta&&typeof e.meta=="object"?pe(e.meta):{};return{chatId:r.chatId,slotBindingKey:r.slotBindingKey,slotRevisionKey:r.slotRevisionKey,sourceMessageId:r.sourceMessageId,sourceSwipeId:r.sourceSwipeId||r.effectiveSwipeId,tables:Array.isArray(e.tables)?pe(e.tables):[],updatedAt:Number.isFinite(e.updatedAt)?e.updatedAt:Date.now(),meta:{sourceKind:n.sourceKind||Gt.EMPTY,...n}}}function bi(t){return!t||typeof t!="object"?{lastResolvedTarget:null,lastCommittedTarget:null,updatedAt:0}:{lastResolvedTarget:t.lastResolvedTarget?Ds(t.lastResolvedTarget):null,lastCommittedTarget:t.lastCommittedTarget?Ds(t.lastCommittedTarget):null,updatedAt:Number.isFinite(t.updatedAt)?t.updatedAt:0}}function Oe(t){if(t==null)return Lt;let e=String(t).trim();return e===""?Lt:e}function Jo(t,e){let r=Pe(t),n=Oe(e);return`${r}::${n}`}function zf(){return{rows:[],cols:[],cells:[],indexColumn:!1}}function Kf(t,e){return`${Number.isFinite(t)?t:-1}:${Number.isFinite(e)?e:-1}`}var cn,dn,yt,kt,Xn,Gt,Bs,O0,Lt,rt,Bf,lI,cI,Fe=O(()=>{cn="YouYouToolkit_tableState",dn="YouYouToolkit_tableBindings",yt=Object.freeze({MANUAL:"MANUAL_TABLE",AUTO:"AUTO_TABLE"}),kt=Object.freeze({ENABLED:"enabled",SELECTED:"selected",CURRENT:"current"}),Xn=Object.freeze({EXACT:"exact",BINDING_FALLBACK:"binding_fallback",HISTORY:"history",TEMPLATE:"template",EMPTY:"empty"}),Gt=Object.freeze({EXACT:"exact",BINDING:"binding",HISTORY:"history",TEMPLATE:"template",EMPTY:"empty"}),Bs=Object.freeze({INSERT_ROW:"insertRow",UPDATE_ROW:"updateRow",DELETE_ROW:"deleteRow"}),O0=Object.freeze({CELL:"cell",ROW:"row",COLUMN:"column",INDEX_COLUMN:"index_column"});Lt="";rt=Object.freeze({INHERIT_GLOBAL:"inherit_global",CHAT_OVERRIDE:"chat_override",PRESET_LINK:"preset_link"}),Bf=8,lI=Object.freeze({NOTE:"note",INIT_NODE:"initNode",INSERT_NODE:"insertNode",UPDATE_NODE:"updateNode",DELETE_NODE:"deleteNode"}),cI=Object.freeze({INHERIT_GLOBAL:-1,DISABLED:0})});function xi(t,e=""){return t==null?e:String(t).trim()||e}function D0(t,e=!1){return t==null?e:t===!0}function wi(t={},e=0){return ur(t?.id||t?.key,e)}function Xo(t={},e={}){let r=t&&typeof t=="object"?t:{},n=e&&typeof e=="object"?e:{},s=xi(r.mode||r.runScope||n.mode||n.runScope,kt.ENABLED),o=Array.isArray(r.selectedTableIds)?r.selectedTableIds.map(i=>xi(i,"")).filter(Boolean):Array.isArray(n.selectedTableIds)?n.selectedTableIds.map(i=>xi(i,"")).filter(Boolean):[],a=xi(r.activeTableId||n.activeTableId,"");return{mode:Object.values(kt).includes(s)?s:kt.ENABLED,selectedTableIds:o,activeTableId:a}}function jf(t={},e=[]){let r=Xo(t,t?.scope||{}),n=Array.isArray(e)?e:[],s=n.map((c,u)=>wi(c,u)),o=new Set(s),a=r.mode,i=!1;a===kt.CURRENT?(!r.activeTableId||!o.has(r.activeTableId))&&(a=kt.ENABLED,i=!0):a===kt.SELECTED&&r.selectedTableIds.filter(u=>o.has(u)).length===0&&(a=kt.ENABLED,i=!0);let l=[];a===kt.CURRENT?l=r.activeTableId?[r.activeTableId]:[]:a===kt.SELECTED?l=r.selectedTableIds.filter(c=>o.has(c)):l=n.map((c,u)=>({table:c,id:wi(c,u)})).filter(({table:c})=>D0(c?.enabled,!0)).map(({id:c})=>c);let d=new Set(l);return{...r,mode:a,requestedMode:r.mode,staleScope:i,allTableIds:s,allowedTableIds:l,allowedIdSet:d,includes(c={},u=-1){return d.has(wi(c,u))},filterTables(c=[]){return(Array.isArray(c)?c:[]).filter((y,p)=>d.has(wi(y,p)))},toJSON(){return{mode:a,requestedMode:r.mode,staleScope:i,selectedTableIds:pe(r.selectedTableIds),activeTableId:r.activeTableId,allowedTableIds:[...l]}}}}var vi=O(()=>{Fe()});function Yt(t,e=""){return t==null?e:String(t).trim()||e}function qc(){let t=globalThis.window||globalThis;return Yt(t?.TavernHelper?.getCurrentChatId?.()||t?.Silvy?.getCurrentChatId?.()||t?.chat_metadata?.chat_id||t?.this_chid||t?.name1,"default_chat")}function B0(t,e=!1){return t===!0}function z0(t={}){let e=t&&typeof t=="object"?t:{};return{enabled:B0(e.enabled,!1),targetBook:Yt(e.targetBook,""),entryComment:Yt(e.entryComment,"YYT-\u586B\u8868\u6570\u636E")}}function Gc(t={},e={}){let r=t&&typeof t=="object"?t:{},n=Xo(r.scope,{mode:r.runScope||e.runScope||kt.ENABLED,selectedTableIds:r.selectedTableIds||e.selectedTableIds||[],activeTableId:r.activeTableId||e.activeTableId||""});return{chatId:Yt(r.chatId,Yt(e.chatId,qc())),templateId:Yt(r.templateId,Yt(e.templateId,It)),enabledTableIds:Array.isArray(r.enabledTableIds)?r.enabledTableIds.map(s=>Yt(s,"")).filter(Boolean):[],focusedTableId:Yt(r.focusedTableId,n.activeTableId),scope:n,worldbookSync:z0(r.worldbookSync),seedNote:Yt(r.seedNote,""),updatedAt:Yt(r.updatedAt,new Date().toISOString())}}function Wf(){let t=Uf.get(Ff,{});return t&&typeof t=="object"&&!Array.isArray(t)?t:{}}function Yc(t=qc()){let e=Yt(t,"default_chat"),r=Wf();return Gc(r[e],{chatId:e})}function Hf(t={},e=qc()){let r=Yt(e,"default_chat"),n=Wf(),s=Gc({...n[r],...t||{},chatId:r,updatedAt:new Date().toISOString()},{chatId:r});return Uf.set(Ff,{...n,[r]:s}),{success:!0,guide:s}}function qf(t={},e=null){let r=Gc(e||Yc(),{templateId:t.activeTemplate,runScope:t.runScope,selectedTableIds:t.scope?.selectedTableIds,activeTableId:t.scope?.activeTableId}),n={...t,activeTemplate:r.templateId||t.activeTemplate,runScope:r.scope.mode,scope:r.scope};return r.worldbookSync&&r.worldbookSync.targetBook&&(n.worldbookSync={...t.worldbookSync||{},...r.worldbookSync}),n}var Uf,Ff,Gf=O(()=>{Ve();nr();Fe();vi();Uf=U.namespace("tableWorkbenchGuides"),Ff="guides"});function de(t,e,r="",n=Ti){return{key:t,title:e,description:r,type:n,required:!1}}function un({id:t,name:e,note:r,aiInstructions:n,columns:s}){return{id:t,name:e,note:r,enabled:!0,aiInstructions:{init:n?.init||"",create:n?.create||"",update:n?.update||"",delete:n?.delete||""},columns:s,rows:[]}}var De,Si,Vc,Yf,K0,Ti,Vf,It,Jc,zs,Jf=O(()=>{De=Object.freeze({IDLE:"idle",RUNNING:"running",SUCCESS:"success",ERROR:"error",ABORTED:"aborted",SKIPPED:"skipped"}),Si=Object.freeze({INCREMENTAL:"incremental",FULL:"full"}),Vc=`\u8BF7\u6839\u636E\u5F53\u524D\u5BF9\u8BDD\u4E0E\u5F53\u524D\u8868\u683C\u57FA\u5E95\uFF0C\u5BF9\u7ED3\u6784\u5316 tables \u6570\u636E\u505A\u589E\u91CF\u66F4\u65B0\u3002

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
{{toolContentMacro}}`,Yf=`\u8F93\u51FA\u8981\u6C42 \u2014 \u7528 <tableEdit>...</tableEdit> \u589E\u91CF DSL\uFF1A

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
\u4F46\u5E94\u8BE5\u5C3D\u91CF\u4F18\u5148\u7528 DSL\uFF08\u6D41\u91CF\u5C0F\u3001\u4E0D\u5F71\u54CD\u9501\u5B57\u6BB5\uFF09\u3002`,K0=Object.freeze([{value:"text",label:"\u6587\u672C"},{value:"number",label:"\u6570\u5B57"},{value:"boolean",label:"\u5E03\u5C14"},{value:"date",label:"\u65E5\u671F"},{value:"json",label:"JSON"}]),Ti="text",Vf=Object.freeze(K0.map(t=>Object.freeze({...t}))),It="default_story_state",Jc="\u9ED8\u8BA4\u5267\u60C5\u72B6\u6001\u6A21\u677F";zs=Object.freeze([un({id:"default_global_state",name:"\u5168\u5C40\u6570\u636E\u8868",note:"\u8BB0\u5F55\u5F53\u524D\u4E3B\u89D2\u6240\u5728\u5730\u70B9\u53CA\u65F6\u95F4\u76F8\u5173\u53C2\u6570\u3002\u6B64\u8868\u901A\u5E38\u6709\u4E14\u4EC5\u6709\u4E00\u884C\u3002",aiInstructions:{init:"\u63D2\u5165\u4E00\u6761\u5173\u4E8E\u5F53\u524D\u4E16\u754C\u72B6\u6001\u7684\u8BB0\u5F55\u3002",create:"\u901A\u5E38\u7981\u6B62\u65B0\u589E\uFF1B\u9664\u975E\u8868\u4E3A\u7A7A\u4E14\u9700\u8981\u521D\u59CB\u5316\u3002",update:"\u5F53\u5730\u70B9\u6216\u65F6\u95F4\u53D1\u751F\u53D8\u5316\u65F6\u66F4\u65B0\u6B64\u8868\uFF1B\u6BCF\u8F6E\u5E94\u6839\u636E\u5267\u60C5\u66F4\u65B0\u65F6\u95F4\u76F8\u5173\u5B57\u6BB5\u3002",delete:"\u7981\u6B62\u5220\u9664\u3002"},columns:[de("location","\u4E3B\u89D2\u5F53\u524D\u6240\u5728\u5730\u70B9","\u4E3B\u89D2\u5F53\u524D\u6240\u5728\u7684\u5177\u4F53\u573A\u666F\u540D\u79F0\u3002"),de("current_time","\u5F53\u524D\u65F6\u95F4","\u6E38\u620F\u4E16\u754C\u7684\u5F53\u524D\u65F6\u95F4\uFF1B\u5982\u5267\u60C5\u6CA1\u6709\u660E\u786E\u65F6\u95F4\uFF0C\u53EF\u6839\u636E\u4E16\u754C\u89C2\u7ED9\u51FA\u5408\u7406\u65F6\u95F4\u3002"),de("previous_scene_time","\u4E0A\u8F6E\u573A\u666F\u65F6\u95F4","\u4E0A\u4E00\u8F6E\u4EA4\u4E92\u7ED3\u675F\u65F6\u7684\u65F6\u95F4\u3002"),de("elapsed_time","\u7ECF\u8FC7\u7684\u65F6\u95F4","\u6839\u636E\u5F53\u524D\u4E0E\u4E0A\u8F6E\u65F6\u95F4\u8BA1\u7B97\u51FA\u7684\u6587\u672C\u63CF\u8FF0\u3002")]}),un({id:"default_protagonist_profile",name:"\u4E3B\u89D2\u4FE1\u606F",note:"\u8BB0\u5F55\u4E3B\u89D2\u7684\u6838\u5FC3\u8EAB\u4EFD\u4FE1\u606F\u3002\u6B64\u8868\u901A\u5E38\u6709\u4E14\u4EC5\u6709\u4E00\u884C\u3002",aiInstructions:{init:"\u521D\u59CB\u5316\u65F6\u63D2\u5165\u4E3B\u89D2\u7684\u552F\u4E00\u6761\u76EE\u3002",create:"\u7981\u6B62\u65B0\u589E\u591A\u540D\u4E3B\u89D2\uFF1B\u9664\u975E\u8868\u4E3A\u7A7A\u4E14\u9700\u8981\u521D\u59CB\u5316\u3002",update:"\u5F53\u4E3B\u89D2\u8EAB\u4EFD\u3001\u5916\u8C8C\u3001\u7ECF\u5386\u6216\u6027\u683C\u6709\u660E\u786E\u53D8\u5316\u65F6\u66F4\u65B0\u3002",delete:"\u7981\u6B62\u5220\u9664\u3002"},columns:[de("name","\u4EBA\u7269\u540D\u79F0","\u4E3B\u89D2\u7684\u540D\u5B57\u3002"),de("gender_age","\u6027\u522B/\u5E74\u9F84","\u4E3B\u89D2\u7684\u6027\u522B\u4E0E\u5E74\u9F84\u3002"),de("appearance","\u5916\u8C8C\u7279\u5F81","\u5BF9\u4E3B\u89D2\u5916\u8C8C\u7684\u5BA2\u89C2\u6587\u5B57\u63CF\u5199\u3002"),de("identity","\u804C\u4E1A/\u8EAB\u4EFD","\u4E3B\u89D2\u5728\u793E\u4F1A\u6216\u5267\u60C5\u4E2D\u7684\u4E3B\u8981\u8EAB\u4EFD\u3002"),de("history","\u8FC7\u5F80\u7ECF\u5386","\u4E3B\u89D2\u80CC\u666F\u6545\u4E8B\u4E0E\u5173\u952E\u7ECF\u5386\uFF0C\u968F\u5267\u60C5\u589E\u91CF\u66F4\u65B0\u3002"),de("personality","\u6027\u683C\u7279\u70B9","\u5BF9\u4E3B\u89D2\u6838\u5FC3\u6027\u683C\u7684\u6982\u62EC\u3002")]}),un({id:"default_important_characters",name:"\u91CD\u8981\u89D2\u8272\u8868",note:"\u8BB0\u5F55\u5173\u952E NPC \u6216\u91CD\u8981\u89D2\u8272\u7684\u4FE1\u606F\u548C\u52A8\u6001\u72B6\u6001\u3002",aiInstructions:{init:"\u521D\u59CB\u5316\u65F6\u4E3A\u5F53\u524D\u5728\u573A\u7684\u91CD\u8981\u4EBA\u7269\u5206\u522B\u63D2\u5165\u6761\u76EE\u3002",create:"\u5267\u60C5\u4E2D\u6709\u672A\u8BB0\u5F55\u7684\u91CD\u8981\u4EBA\u7269\u767B\u573A\u65F6\u65B0\u589E\u3002",update:"\u5DF2\u6709\u89D2\u8272\u7684\u72B6\u6001\u3001\u5173\u7CFB\u3001\u60F3\u6CD5\u3001\u7ECF\u5386\u6216\u6301\u6709\u7269\u53D8\u5316\u65F6\u66F4\u65B0\u3002",delete:'\u901A\u5E38\u7981\u6B62\u5220\u9664\uFF1B\u89D2\u8272\u79BB\u573A\u65F6\u4F18\u5148\u66F4\u65B0"\u662F\u5426\u79BB\u573A"\u3002'},columns:[de("name","\u59D3\u540D","\u89D2\u8272\u59D3\u540D\u3002"),de("gender_age","\u6027\u522B/\u5E74\u9F84","\u89D2\u8272\u7684\u6027\u522B\u4E0E\u5E74\u9F84\u3002"),de("summary","\u4E00\u53E5\u8BDD\u4ECB\u7ECD","\u7528\u7B80\u77ED\u6587\u5B57\u6982\u62EC\u89D2\u8272\u8EAB\u4EFD\u80CC\u666F\u3002"),de("appearance","\u5916\u8C8C\u7279\u5F81","\u5BF9\u89D2\u8272\u5916\u8C8C\u548C\u5F53\u524D\u8863\u7740\u7684\u5BA2\u89C2\u63CF\u5199\u3002"),de("important_items","\u6301\u6709\u7684\u91CD\u8981\u7269\u54C1","\u89D2\u8272\u62E5\u6709\u7684\u5173\u952E\u7269\u54C1\uFF0C\u7528\u5206\u53F7\u5206\u9694\u3002"),de("offstage","\u662F\u5426\u79BB\u573A",'\u5224\u65AD\u8BE5\u89D2\u8272\u5F53\u524D\u662F\u5426\u5DF2\u7ECF\u79BB\u573A\uFF0C\u586B\u5199"\u662F"\u6216"\u5426"\u3002',"boolean"),de("history","\u8FC7\u5F80\u7ECF\u5386","\u89D2\u8272\u80CC\u666F\u4E0E\u5173\u952E\u4E8B\u4EF6\uFF0C\u968F\u5267\u60C5\u589E\u91CF\u66F4\u65B0\u3002")]}),un({id:"default_protagonist_skills",name:"\u4E3B\u89D2\u6280\u80FD\u8868",note:"\u8BB0\u5F55\u4E3B\u89D2\u83B7\u5F97\u7684\u6280\u80FD\u3001\u80FD\u529B\u6216\u9636\u6BB5\u6027\u6210\u957F\u3002",aiInstructions:{init:"\u521D\u59CB\u5316\u65F6\u6839\u636E\u8BBE\u5B9A\u6DFB\u52A0\u4E3B\u89D2\u7684\u521D\u59CB\u6280\u80FD\u3002",create:"\u4E3B\u89D2\u83B7\u5F97\u65B0\u6280\u80FD\u6216\u65B0\u80FD\u529B\u65F6\u65B0\u589E\u3002",update:"\u5DF2\u6709\u6280\u80FD\u5347\u7EA7\u3001\u964D\u7EA7\u6216\u6548\u679C\u53D8\u5316\u65F6\u66F4\u65B0\u3002",delete:"\u6280\u80FD\u88AB\u5267\u60C5\u5265\u593A\u3001\u66FF\u6362\u6216\u5931\u6548\u65F6\u5220\u9664\u3002"},columns:[de("skill_name","\u6280\u80FD\u540D\u79F0","\u6280\u80FD\u6216\u80FD\u529B\u540D\u79F0\u3002"),de("skill_type","\u6280\u80FD\u7C7B\u578B","\u6280\u80FD\u7C7B\u522B\uFF0C\u4F8B\u5982\u4E3B\u52A8\u3001\u88AB\u52A8\u3001\u5929\u8D4B\u7B49\u3002"),de("level","\u7B49\u7EA7/\u9636\u6BB5","\u6280\u80FD\u5F53\u524D\u7B49\u7EA7\u3001\u719F\u7EC3\u5EA6\u6216\u9636\u6BB5\u3002"),de("effect","\u6548\u679C\u63CF\u8FF0","\u6280\u80FD\u5728\u5F53\u524D\u9636\u6BB5\u4E0B\u7684\u5177\u4F53\u6548\u679C\u3002")]}),un({id:"default_inventory",name:"\u80CC\u5305\u7269\u54C1\u8868",note:"\u8BB0\u5F55\u4E3B\u89D2\u62E5\u6709\u7684\u7269\u54C1\u3001\u88C5\u5907\u6216\u6D88\u8017\u54C1\u3002",aiInstructions:{init:"\u521D\u59CB\u5316\u65F6\u6839\u636E\u5267\u60C5\u4E0E\u8BBE\u5B9A\u6DFB\u52A0\u4E3B\u89D2\u7684\u521D\u59CB\u643A\u5E26\u7269\u54C1\u3002",create:"\u4E3B\u89D2\u83B7\u5F97\u80CC\u5305\u4E2D\u6CA1\u6709\u7684\u5168\u65B0\u7269\u54C1\u65F6\u65B0\u589E\u3002",update:"\u5DF2\u6709\u7269\u54C1\u6570\u91CF\u3001\u72B6\u6001\u6216\u63CF\u8FF0\u53D8\u5316\u65F6\u66F4\u65B0\u3002",delete:"\u7269\u54C1\u88AB\u5B8C\u5168\u6D88\u8017\u3001\u4E22\u5F03\u6216\u6467\u6BC1\u65F6\u5220\u9664\u3002"},columns:[de("item_name","\u7269\u54C1\u540D\u79F0","\u7269\u54C1\u540D\u79F0\u3002"),de("quantity","\u6570\u91CF","\u62E5\u6709\u6570\u91CF\u3002","number"),de("description","\u63CF\u8FF0/\u6548\u679C","\u7269\u54C1\u529F\u80FD\u3001\u6548\u679C\u6216\u80CC\u666F\u63CF\u8FF0\u3002"),de("category","\u7C7B\u522B","\u7269\u54C1\u7C7B\u522B\uFF0C\u4F8B\u5982\u6B66\u5668\u3001\u6D88\u8017\u54C1\u3001\u6742\u7269\u7B49\u3002")]}),un({id:"default_quests_events",name:"\u4EFB\u52A1\u4E0E\u4E8B\u4EF6\u8868",note:"\u8BB0\u5F55\u5F53\u524D\u6B63\u5728\u8FDB\u884C\u6216\u9700\u8981\u6301\u7EED\u8FFD\u8E2A\u7684\u4EFB\u52A1\u4E0E\u4E8B\u4EF6\u3002",aiInstructions:{init:"\u521D\u59CB\u5316\u65F6\u6839\u636E\u5267\u60C5\u4E0E\u8BBE\u5B9A\u6DFB\u52A0\u4E3B\u8981\u4EFB\u52A1\u6216\u5173\u952E\u4E8B\u4EF6\u3002",create:"\u4E3B\u89D2\u63A5\u53D6\u3001\u89E6\u53D1\u6216\u53D1\u73B0\u65B0\u7684\u4EFB\u52A1\u4E0E\u4E8B\u4EF6\u65F6\u65B0\u589E\u3002",update:"\u4EFB\u52A1\u53D6\u5F97\u5173\u952E\u8FDB\u5C55\u3001\u76EE\u6807\u53D8\u5316\u6216\u65F6\u9650\u53D8\u5316\u65F6\u66F4\u65B0\u3002",delete:"\u4EFB\u52A1\u5B8C\u6210\u3001\u5931\u8D25\u3001\u8FC7\u671F\u6216\u4E0D\u518D\u9700\u8981\u8FFD\u8E2A\u65F6\u5220\u9664\u3002"},columns:[de("quest_name","\u4EFB\u52A1\u540D\u79F0","\u4EFB\u52A1\u6216\u4E8B\u4EF6\u6807\u9898\u3002"),de("quest_type","\u4EFB\u52A1\u7C7B\u578B","\u4E3B\u7EBF\u3001\u652F\u7EBF\u3001\u4E2A\u4EBA\u3001\u7A81\u53D1\u4E8B\u4EF6\u7B49\u3002"),de("issuer","\u53D1\u5E03\u8005","\u53D1\u5E03\u4EFB\u52A1\u6216\u89E6\u53D1\u4E8B\u4EF6\u7684\u89D2\u8272\u3001\u5730\u70B9\u6216\u52BF\u529B\u3002"),de("detail","\u8BE6\u7EC6\u63CF\u8FF0","\u4EFB\u52A1\u76EE\u6807\u3001\u4E8B\u4EF6\u80CC\u666F\u548C\u8981\u6C42\u3002"),de("progress","\u5F53\u524D\u8FDB\u5EA6","\u5BF9\u5B8C\u6210\u5EA6\u6216\u5F53\u524D\u9636\u6BB5\u7684\u7B80\u8981\u63CF\u8FF0\u3002"),de("deadline","\u4EFB\u52A1\u65F6\u9650","\u5B8C\u6210\u4EFB\u52A1\u7684\u5269\u4F59\u65F6\u95F4\u6216\u622A\u6B62\u6761\u4EF6\u3002"),de("reward","\u5956\u52B1","\u5B8C\u6210\u540E\u53EF\u80FD\u83B7\u5F97\u7684\u5956\u52B1\u3002"),de("penalty","\u60E9\u7F5A","\u5931\u8D25\u6216\u9519\u8FC7\u540E\u7684\u540E\u679C\u3002")]}),un({id:"default_memo_log",name:"\u7EAA\u8981\u8868",note:"\u8BB0\u5F55\u6BCF\u8F6E\u6216\u5173\u952E\u7247\u6BB5\u53D1\u751F\u7684\u4E8B\u4EF6\u7EAA\u8981\uFF0C\u7528\u4E8E\u540E\u7EED\u56DE\u987E\u3002",aiInstructions:{init:"\u6545\u4E8B\u521D\u59CB\u5316\u65F6\u63D2\u5165\u4E00\u6761\u8BB0\u5F55\uFF0C\u7528\u4E8E\u8BB0\u5F55\u521D\u59CB\u5316\u5267\u60C5\u3002",create:"\u6BCF\u8F6E\u4EA4\u4E92\u7ED3\u675F\u540E\uFF0C\u82E5\u53D1\u751F\u4E86\u503C\u5F97\u8BB0\u5F55\u7684\u65B0\u4E8B\u4EF6\uFF0C\u5219\u63D2\u5165\u4E00\u6761\u65B0\u7EAA\u8981\u3002",update:"\u901A\u5E38\u7981\u6B62\u66F4\u65B0\u5386\u53F2\u7EAA\u8981\uFF1B\u53EA\u6709\u660E\u663E\u4E8B\u5B9E\u9519\u8BEF\u65F6\u624D\u4FEE\u6B63\u3002",delete:"\u7981\u6B62\u5220\u9664\u3002"},columns:[de("time_span","\u65F6\u95F4\u8DE8\u5EA6","\u672C\u8F6E\u4E8B\u4EF6\u53D1\u751F\u7684\u65F6\u95F4\u8303\u56F4\u3002"),de("location","\u5730\u70B9","\u672C\u8F6E\u4E8B\u4EF6\u53D1\u751F\u5730\u70B9\u3002"),de("memo","\u7EAA\u8981","\u4EE5\u7B2C\u4E09\u65B9\u89C6\u89D2\u5BA2\u89C2\u8BB0\u5F55\u672C\u8F6E\u53D1\u751F\u7684\u4E8B\u5B9E\u3002"),de("summary","\u6982\u89C8","\u4E00\u53E5\u8BDD\u6982\u62EC\u7EAA\u8981\u5185\u5BB9\u3002"),de("index_code","\u7F16\u7801\u7D22\u5F15","\u7528\u4E8E\u540E\u7EED\u68C0\u7D22\u7684\u7B80\u77ED\u7F16\u7801\u3002")]}),un({id:"default_options",name:"\u9009\u9879\u8868",note:"\u8BB0\u5F55\u6BCF\u8F6E\u4E3B\u89D2\u53EF\u4EE5\u91C7\u53D6\u7684\u884C\u52A8\u9009\u9879\u3002\u6B64\u8868\u901A\u5E38\u6709\u4E14\u4EC5\u6709\u4E00\u884C\u3002\u6240\u6709\u9009\u9879\u4F7F\u7528\u7B2C\u4E09\u4EBA\u79F0\uFF0C\u4E0D\u4EE3\u66FF\u4E3B\u89D2\u53D1\u8A00\uFF0C\u5E76\u7D27\u6263\u5F53\u524D\u5267\u60C5\u3002",aiInstructions:{init:"\u521D\u59CB\u5316\u65F6\u751F\u6210\u56DB\u4E2A\u521D\u59CB\u884C\u52A8\u9009\u9879\u3002",create:"\u901A\u5E38\u7981\u6B62\u65B0\u589E\uFF1B\u9664\u975E\u8868\u4E3A\u7A7A\u4E14\u9700\u8981\u521D\u59CB\u5316\u3002",update:"\u6BCF\u8F6E\u4EA4\u4E92\u540E\u6839\u636E\u5F53\u524D\u5267\u60C5\u751F\u6210\u65B0\u7684\u56DB\u4E2A\u9009\u9879\u5E76\u8986\u76D6\u539F\u6709\u5185\u5BB9\u3002",delete:"\u7981\u6B62\u5220\u9664\u3002"},columns:[de("option_1","\u9009\u9879\u4E00","\u504F\u5411\u7B56\u7565\u3001\u63A8\u8FDB\u5267\u60C5\u6216\u89E3\u51B3\u5F53\u524D\u95EE\u9898\u7684\u884C\u52A8\u3002"),de("option_2","\u9009\u9879\u4E8C","\u504F\u5411\u8C28\u614E\u89C2\u5BDF\u3001\u6536\u96C6\u4FE1\u606F\u6216\u4FDD\u6301\u4E2D\u7ACB\u7684\u884C\u52A8\u3002"),de("option_3","\u9009\u9879\u4E09","\u504F\u5411\u5E2E\u52A9\u3001\u4FDD\u62A4\u3001\u6C9F\u901A\u6216\u5B89\u629A\u7684\u884C\u52A8\u3002"),de("option_4","\u9009\u9879\u56DB","\u504F\u5411\u5192\u9669\u3001\u8BD5\u63A2\u3001\u6539\u53D8\u5C40\u52BF\u6216\u5173\u7CFB\u4E92\u52A8\u7684\u884C\u52A8\u3002")]})])});function j0(t,e=""){return t==null?e:String(t).trim()||e}function pn(t){if(t==null)return"";if(typeof t=="string")return t;try{return JSON.stringify(t,null,2)}catch{return String(t)}}function Qo(t,e="col"){return j0(t,"").toLowerCase().replace(/[^a-z0-9]+/g,"_").replace(/^_+|_+$/g,"")||e}function yn(t,e=new Set){let r=Qo(t,"col"),n=r,s=2;for(;e.has(n);)n=`${r}_${s}`,s+=1;return e.add(n),n}var Xc=O(()=>{});function j(t,e=""){return t==null?e:String(t).trim()||e}function Kr(t,e=!1){return t==null?e:t===!0}function U0(t){if(!Array.isArray(t)||t.length!==1)return!1;let e=t[0]&&typeof t[0]=="object"?t[0]:null;if(!e)return!1;let r=j(e.name||e.title,""),n=j(e.note||e.description,""),s=Array.isArray(e.columns)?e.columns:[],o=Array.isArray(e.rows)?e.rows:[];if(r&&!["\u88681","\u8868\u683C 1","\u8868\u683C1"].includes(r)||n||s.length!==1||o.length>1)return!1;let a=s[0]&&typeof s[0]=="object"?s[0]:{},i=j(a.key||a.id,""),l=j(a.title||a.name||a.label,"");if(j(a.description||a.note,"")||i&&i!=="col_1"||l&&!["\u52171","col_1"].includes(l))return!1;if(o.length===0)return!0;let c=o[0]&&typeof o[0]=="object"?o[0]:{},u=j(c.name||c.title||c.label,""),y=c.cells&&typeof c.cells=="object"&&!Array.isArray(c.cells)?c.cells:{},p=Array.isArray(c.values)?c.values:[],g=Object.values(y).some(m=>j(m,""))||p.some(m=>j(m,""));return(!u||u==="\u884C1")&&!g}function F0(t,{seedDefaultWhenMissing:e=!1}={}){return U0(t)?pe(zs):Array.isArray(t)?pe(t):t&&typeof t=="object"?W0(t):e?pe(zs):[]}function ed(t=""){let e=[],r=j(t,""),n=/-\s*列\d+\s*[:：]\s*([^\n\-–—]+?)\s*[-–—]\s*([^\n]+)/g,s;for(;s=n.exec(r);)e.push({title:j(s[1],""),description:j(s[2],"")});return e}function W0(t={}){let e=t&&typeof t=="object"?t:{};return Object.keys(e).filter(n=>n.startsWith("sheet_")&&e[n]&&typeof e[n]=="object").map((n,s)=>({key:n,table:e[n],fallbackOrder:s})).sort((n,s)=>{let o=Number.isFinite(n.table.orderNo)?n.table.orderNo:n.fallbackOrder,a=Number.isFinite(s.table.orderNo)?s.table.orderNo:s.fallbackOrder;return o-a}).map(({key:n,table:s},o)=>{let a=s.sourceData&&typeof s.sourceData=="object"?s.sourceData:{},i=Array.isArray(s.content)?s.content:[],l=Array.isArray(i[0])?i[0]:[],d=ed(a.note),c=new Set,u=l.slice(1).map((p,g)=>{let m=d[g]||{},h=j(p||m.title,`\u5217${g+1}`);return{key:yn(h||`col_${g+1}`,c),title:h,description:j(m.description,""),type:Ti,required:!1}}),y=i.slice(1).map((p,g)=>{let m=Array.isArray(p)?p:[],h={};return u.forEach((b,x)=>{h[b.key]=pn(m[x+1])}),{name:j(m[0],`\u884C${g+1}`),cells:h}});return{id:j(s.uid||n,`sheet_${o+1}`),name:j(s.name,`\u8868${o+1}`),note:j(a.note,""),enabled:s.enabled!==!1,aiInstructions:{init:j(a.initNode,""),create:j(a.insertNode,""),update:j(a.updateNode,""),delete:j(a.deleteNode,"")},columns:u,rows:y}})}function H0(t=[]){let e=[],r=0;return t.forEach(n=>{let s=n&&typeof n=="object"?n:{},o=s.cells&&typeof s.cells=="object"&&!Array.isArray(s.cells)?s.cells:null,a=Array.isArray(s.cells)?s.cells:Array.isArray(s.values)?s.values:null;o&&Object.keys(o).forEach(i=>{e.includes(i)||e.push(i)}),a&&a.length>r&&(r=a.length)}),e.length>0?e.map(n=>({key:n,title:String(n)})):r>0?Array.from({length:r},(n,s)=>({key:`col_${s+1}`,title:`\u5217${s+1}`})):[]}function td(t,e=Ti){let r=j(t,e);return Vf.some(n=>n.value===r)?r:e}function q0(t={},e=0,r=new Set){let n=t&&typeof t=="object"?t:{},s=j(n.title||n.name||n.label,`\u5217${e+1}`),o=j(n.key||n.id,""),a=yn(o||s||`col_${e+1}`,r),i=[o,j(n.title,""),j(n.name,""),j(n.label,"")].filter(Boolean);return{key:a,title:s,description:j(n.description||n.note,""),type:td(n.type),required:n.required===!0,sourceKeys:i}}function G0(t={},e={},r=0){let n=t.cells&&typeof t.cells=="object"&&!Array.isArray(t.cells)?t.cells:null,s=Array.isArray(t.cells)?t.cells:Array.isArray(t.values)?t.values:null;if(n){let o=[...Array.isArray(e.sourceKeys)?e.sourceKeys:[],e.key,e.title].filter(Boolean);for(let a of o)if(n[a]!==void 0)return pn(n[a])}return s&&s[r]!==void 0?pn(s[r]):""}function Y0(t={},e=[],r=0){let n=t&&typeof t=="object"?t:{},s={};return e.forEach((o,a)=>{s[o.key]=G0(n,o,a)}),{id:Yo(n.id||n.rowId,r),name:j(n.name||n.title||n.label,`\u884C${r+1}`),cells:s}}function V0(t={}){let e=t&&typeof t=="object"?t:{};return{init:j(e.init,""),create:j(e.create,""),update:j(e.update,""),delete:j(e.delete,"")}}function J0(t={},e=""){let r=t&&typeof t=="object"?t:{},n=j(r.presetId,j(e,""));return{enabled:r.enabled===!0,presetId:n}}function X0(t={},e=""){let r=t&&typeof t=="object"?t:{};return{enabled:Kr(r.enabled,!1),entryName:j(r.entryName,e),entryType:r.entryType==="keyword"?"keyword":"constant",splitByRow:Kr(r.splitByRow,!1),keywords:j(r.keywords,""),injectionTemplate:j(r.injectionTemplate,""),preventRecursion:Kr(r.preventRecursion,!0),entryPlacement:{position:j(r.entryPlacement?.position||r.placement?.position,"before_character_definition"),depth:Number.isFinite(Number(r.entryPlacement?.depth??r.placement?.depth))?Math.floor(Number(r.entryPlacement?.depth??r.placement?.depth)):2,order:Number.isFinite(Number(r.entryPlacement?.order??r.placement?.order))?Math.floor(Number(r.entryPlacement?.order??r.placement?.order)):0},extraIndexPlacement:{position:j(r.extraIndexPlacement?.position,"before_character_definition"),depth:Number.isFinite(Number(r.extraIndexPlacement?.depth))?Math.floor(Number(r.extraIndexPlacement?.depth)):2,order:Number.isFinite(Number(r.extraIndexPlacement?.order))?Math.floor(Number(r.extraIndexPlacement?.order)):0}}}function Q0(t={},e=0){let r=t&&typeof t=="object"?t:{},n=new Set,o=(Array.isArray(r.columns)&&r.columns.length>0?r.columns:H0(Array.isArray(r.rows)?r.rows:[])).map((l,d)=>q0(l,d,n)),a=Array.isArray(r.rows)?r.rows.map((l,d)=>Y0(l,o,d)):[],i=j(r.name||r.title,`\u8868${e+1}`);return{id:ur(r.id||r.key,e),name:i,note:j(r.note||r.description,""),enabled:r.enabled!==!1,aiInstructions:V0(r.aiInstructions),exportConfig:X0(r.exportConfig,i),columns:o.map(l=>({key:l.key,title:l.title,description:j(l.description,""),type:td(l.type),required:l.required===!0})),rows:a}}function Xf(t={}){let e=t&&typeof t=="object"?t:{},r=Array.isArray(e.lastErrorDetails)?e.lastErrorDetails.map(s=>j(s,"")).filter(Boolean):[],n=e.lastValidationSummary&&typeof e.lastValidationSummary=="object"?{errorCount:Number.isFinite(e.lastValidationSummary.errorCount)?e.lastValidationSummary.errorCount:0,warningCount:Number.isFinite(e.lastValidationSummary.warningCount)?e.lastValidationSummary.warningCount:0}:{errorCount:0,warningCount:0};return{lastStatus:j(e.lastStatus,De.IDLE),lastRunAt:Number.isFinite(e.lastRunAt)?e.lastRunAt:0,lastDurationMs:Number.isFinite(e.lastDurationMs)?e.lastDurationMs:0,lastError:j(e.lastError,""),lastErrorDetails:r,lastValidationSummary:n,successCount:Number.isFinite(e.successCount)?e.successCount:0,errorCount:Number.isFinite(e.errorCount)?e.errorCount:0,lastSourceMessageId:j(e.lastSourceMessageId,""),lastSlotRevisionKey:j(e.lastSlotRevisionKey,""),lastLoadMode:j(e.lastLoadMode,""),lastFillMode:j(e.lastFillMode,""),lastMirrorApplied:e.lastMirrorApplied===!0,lastResolvedFromMessageId:j(e.lastResolvedFromMessageId,""),lastResolvedFromRevisionKey:j(e.lastResolvedFromRevisionKey,""),lastSourceKind:j(e.lastSourceKind,""),lastScopeMode:j(e.lastScopeMode,""),lastAutoRunAt:Number.isFinite(e.lastAutoRunAt)?e.lastAutoRunAt:0,lastAutoStatus:j(e.lastAutoStatus,De.IDLE),lastAutoMessageId:j(e.lastAutoMessageId,""),lastAutoRevisionKey:j(e.lastAutoRevisionKey,""),lastAutoSkipReason:j(e.lastAutoSkipReason,"")}}function Z0(t={}){let e=t&&typeof t=="object"?t:{};return(Array.isArray(e.tables)?e.tables:[]).map((n,s)=>Q0(n,s))}function Qf(t="",e={},r={}){let n=td(e?.type),s=String(t??"").trim(),o=j(r?.label,`${j(r?.tableName,"\u8868\u683C")} / ${j(r?.rowName,"\u884C")} / ${j(e?.title||e?.key,"\u5355\u5143\u683C")}`),a=[],i=[];if(e?.required===!0&&!s&&a.push(`${o} \u4E3A\u5FC5\u586B\uFF0C\u5F53\u524D\u4E3A\u7A7A\u3002`),!s)return{valid:a.length===0,errors:a,warnings:i};if(n==="number"&&!Number.isFinite(Number(s))&&a.push(`${o} \u9700\u8981\u586B\u5199\u6570\u5B57\u3002`),n==="boolean"&&!["true","false","1","0","yes","no"].includes(s.toLowerCase())&&a.push(`${o} \u9700\u8981\u586B\u5199\u5E03\u5C14\u503C\uFF08true / false\uFF09\u3002`),n==="date"&&Number.isNaN(Date.parse(s))&&a.push(`${o} \u9700\u8981\u586B\u5199\u53EF\u89E3\u6790\u7684\u65E5\u671F\u3002`),n==="json")try{JSON.parse(s)}catch(l){a.push(`${o} \u9700\u8981\u586B\u5199\u5408\u6CD5 JSON\uFF1A${l?.message||"\u89E3\u6790\u5931\u8D25"}`)}return{valid:a.length===0,errors:a,warnings:i}}function eS(t={}){let r=Z0(t&&typeof t=="object"?t:{}),n=[];return r.forEach((s,o)=>{let a=j(s?.name,`\u8868${o+1}`),i=Array.isArray(s?.columns)?s.columns:[],l=Array.isArray(s?.rows)?s.rows:[];a||n.push(`\u8868 ${o+1} \u7F3A\u5C11\u540D\u79F0\u3002`),i.length===0&&n.push(`${a} \u81F3\u5C11\u9700\u8981\u4E00\u5217\u3002`);let d=new Set;i.forEach((c,u)=>{let y=j(c?.key,""),p=j(c?.title,`\u5217${u+1}`);if(!y){n.push(`${a} / ${p} \u7F3A\u5C11\u5185\u90E8\u540D\u3002`);return}if(d.has(y)){n.push(`${a} \u4E2D\u5B58\u5728\u91CD\u590D\u5217\u5185\u90E8\u540D\uFF1A${y}`);return}d.add(y)}),l.forEach((c,u)=>{let y=j(c?.name,`\u884C${u+1}`),p=c?.cells&&typeof c.cells=="object"&&!Array.isArray(c.cells)?c.cells:{};i.forEach((g,m)=>{let h=j(g?.key,""),b=j(g?.title||h,`\u5217${m+1}`),x=h?pn(p[h]):"",w=Qf(x,g,{label:`${a} / ${y} / ${b}`,tableName:a,rowName:y});n.push(...w.errors)})})}),{valid:n.length===0,errors:n,tables:r}}function Ks({severity:t="error",message:e="",tableIndex:r=-1,tableName:n="",columnIndex:s=-1,columnKey:o="",rowIndex:a=-1,rowName:i="",cellKey:l=""}={}){return{severity:t,message:j(e,t==="warning"?"\u5B58\u5728\u8B66\u544A\u3002":"\u5B58\u5728\u9519\u8BEF\u3002"),tableIndex:r,tableName:j(n,""),columnIndex:s,columnKey:j(o,""),rowIndex:a,rowName:j(i,""),cellKey:j(l,"")}}function _i(t={}){let e=eS(t),r=[];if(!e.valid)return{...e,warnings:[],issues:r,summary:{errorCount:e.errors.length,warningCount:0}};let n=Array.isArray(e.tables)?e.tables:[];n.forEach((a,i)=>{let l=j(a?.name,`\u8868${i+1}`),d=Array.isArray(a?.columns)?a.columns:[],c=Array.isArray(a?.rows)?a.rows:[],u=new Set;l||r.push(Ks({severity:"error",message:`\u8868 ${i+1} \u7F3A\u5C11\u540D\u79F0\u3002`,tableIndex:i,tableName:l})),d.forEach((y,p)=>{let g=j(y?.key,""),m=j(y?.title,`\u5217${p+1}`);g||r.push(Ks({severity:"error",message:`${l} / ${m} \u7F3A\u5C11\u5185\u90E8\u540D\u3002`,tableIndex:i,tableName:l,columnIndex:p,columnKey:g,cellKey:g})),g&&(u.has(g)&&r.push(Ks({severity:"error",message:`${l} \u4E2D\u5B58\u5728\u91CD\u590D\u5217\u5185\u90E8\u540D\uFF1A${g}`,tableIndex:i,tableName:l,columnIndex:p,columnKey:g,cellKey:g})),u.add(g))}),c.forEach((y,p)=>{let g=j(y?.name,`\u884C${p+1}`),m=y?.cells&&typeof y.cells=="object"&&!Array.isArray(y.cells)?y.cells:{};Object.keys(m).forEach(b=>{d.some(x=>j(x?.key,"")===b)||r.push(Ks({severity:"warning",message:`${l} / ${g} \u5305\u542B\u672A\u5B9A\u4E49\u5217 ${b}\uFF0C\u4FDD\u5B58\u540E\u4F1A\u88AB\u5FFD\u7565\u3002`,tableIndex:i,tableName:l,rowIndex:p,rowName:g,cellKey:b}))}),d.forEach((b,x)=>{let w=j(b?.key,""),T=j(b?.title||w,`\u5217${x+1}`),I=w?pn(m[w]):"",S=Qf(I,b,{label:`${l} / ${g} / ${T}`,tableName:l,rowName:g});S.errors.forEach(A=>{r.push(Ks({severity:"error",message:A,tableIndex:i,tableName:l,columnIndex:x,columnKey:w,rowIndex:p,rowName:g,cellKey:w}))}),S.warnings.forEach(A=>{r.push(Ks({severity:"warning",message:A,tableIndex:i,tableName:l,columnIndex:x,columnKey:w,rowIndex:p,rowName:g,cellKey:w}))})})})});let s=r.filter(a=>a.severity!=="warning").map(a=>a.message),o=r.filter(a=>a.severity==="warning").map(a=>a.message);return{valid:s.length===0,errors:s,warnings:o,issues:r,tables:n,summary:{errorCount:s.length,warningCount:o.length}}}function Zf(){return{tables:pe(zs),promptTemplate:Vc,apiPreset:"",promptPreset:"",bypass:{enabled:!1,presetId:""},activeTemplate:It,autoUpdateEnabled:!1,autoUpdateTrigger:"assistantMessage",runScope:kt.ENABLED,scope:{mode:kt.ENABLED,selectedTableIds:[],activeTableId:""},fillMode:Si.INCREMENTAL,contextDepth:8,contextRoles:"all",contextExtractTags:[],contextUseGlobalRules:!1,worldbooks:{enabled:!1,selected:[]},sendLatestRows:-1,mirrorToMessage:!1,mirrorTag:"yyt-table-workbench",worldbookSync:{enabled:!1,injectionMode:"character_card",targetBook:"",entryComment:"YYT-\u586B\u8868\u6570\u636E"},wrapperConfig:{enabled:!0,wrapperTag:"\u6700\u65B0\u6570\u636E\u4E0E\u8BB0\u5F55",wrapperHint:"\u4EE5\u4E0B\u662F\u5728\u8FD9\u4E2A\u65F6\u95F4\u70B9\uFF0C\u5F53\u524D\u573A\u666F\u4E0B\u5267\u60C5\u76F8\u5173\u7684\u6700\u65B0\u6570\u636E\u4E0E\u8BB0\u5F55\uFF0C\u4F60\u5728\u8FDB\u884C\u5267\u60C5\u5206\u6790\u65F6\u5FC5\u987B\u4EE5\u6B64\u6700\u65B0\u7684\u6570\u636E\u4E3A\u51C6\uFF0C\u4EE5\u4E0B\u6570\u636E\u4E0E\u8BB0\u5F55\u7684\u4F18\u5148\u7EA7\u9AD8\u4E8E\u5176\u4ED6\u4EFB\u4F55\u80CC\u666F\u8BBE\u5B9A\uFF1A",wrapperPlacement:{position:"before_character_definition",depth:2,order:0}},tableEnabledOverrides:{},runtime:Xf()}}function sr(t={}){let e=Zf(),r=t&&typeof t=="object"?t:{},n=r.bypass?r.bypass:r.bypassPresetId?{presetId:r.bypassPresetId,enabled:!!r.bypassPresetId}:void 0,s=J0(n,r.promptPreset),o=F0(r.tables,{seedDefaultWhenMissing:!Object.prototype.hasOwnProperty.call(r,"tables")}),a=r.scope&&typeof r.scope=="object"?r.scope:{},i=typeof r.runScope=="string"&&r.runScope?{...a,mode:r.runScope}:a,l=Xo(i,{mode:r.runScope,selectedTableIds:r.selectedTableIds,activeTableId:r.activeTableId}),d=Kr(r.autoUpdateEnabled!==void 0?r.autoUpdateEnabled:r.automation?.enabled,e.autoUpdateEnabled);return{tables:o,promptTemplate:j(r.promptTemplate,e.promptTemplate),apiPreset:j(r.apiPreset,""),promptPreset:s.presetId,bypass:s,activeTemplate:j(r.activeTemplate,e.activeTemplate),autoUpdateEnabled:d,autoUpdateTrigger:j(r.autoUpdateTrigger,e.autoUpdateTrigger),runScope:l.mode,scope:l,fillMode:r.fillMode===Si.FULL?Si.FULL:e.fillMode,contextDepth:Number.isFinite(Number(r.contextDepth))&&Number(r.contextDepth)>0?Math.floor(Number(r.contextDepth)):e.contextDepth,contextRoles:r.contextRoles==="assistant_only"?"assistant_only":"all",contextExtractTags:Array.isArray(r.contextExtractTags)?r.contextExtractTags.filter(c=>typeof c=="string"&&c.trim()):typeof r.contextExtractTags=="string"&&r.contextExtractTags.trim()?r.contextExtractTags.split(`
`).map(c=>c.trim()).filter(Boolean):[],contextUseGlobalRules:Kr(r.contextUseGlobalRules??r.contextUseExtractRules??r.contextUseExcludeRules,!1),extraction:{regexPresetId:j(r.extraction?.regexPresetId,"")},worldbooks:{enabled:Kr(r.worldbooks?.enabled,!1),selected:Array.isArray(r.worldbooks?.selected)?r.worldbooks.selected.filter(c=>typeof c=="string"&&c.trim()):[],presetId:j(r.worldbooks?.presetId,"")},sendLatestRows:Number.isFinite(Number(r.sendLatestRows))?Math.floor(Number(r.sendLatestRows)):-1,mirrorToMessage:Kr(r.mirrorToMessage,e.mirrorToMessage),mirrorTag:j(r.mirrorTag,e.mirrorTag),worldbookSync:{enabled:Kr(r.worldbookSync?.enabled,!1),injectionMode:["character_card","auto_create","target_book"].includes(r.worldbookSync?.injectionMode)?r.worldbookSync.injectionMode:"character_card",targetBook:j(r.worldbookSync?.targetBook,""),entryComment:j(r.worldbookSync?.entryComment,e.worldbookSync.entryComment)},wrapperConfig:(()=>{let c=r.worldbookSync?.wrapperConfig,u=r.wrapperConfig,y=c&&!u?c:u||{};return{enabled:Kr(y.enabled,e.wrapperConfig.enabled),wrapperTag:j(y.wrapperTag,e.wrapperConfig.wrapperTag),wrapperHint:j(y.wrapperHint,e.wrapperConfig.wrapperHint),wrapperPlacement:{position:j(y.wrapperPlacement?.position,e.wrapperConfig.wrapperPlacement.position),depth:Number.isFinite(Number(y.wrapperPlacement?.depth))?Math.floor(Number(y.wrapperPlacement?.depth)):e.wrapperConfig.wrapperPlacement.depth,order:Number.isFinite(Number(y.wrapperPlacement?.order))?Math.floor(Number(y.wrapperPlacement?.order)):e.wrapperConfig.wrapperPlacement.order}}})(),tableEnabledOverrides:r.tableEnabledOverrides&&typeof r.tableEnabledOverrides=="object"&&!Array.isArray(r.tableEnabledOverrides)?Object.fromEntries(Object.entries(r.tableEnabledOverrides).filter(([c,u])=>typeof c=="string"&&c&&typeof u=="boolean")):{},runtime:Xf({...e.runtime,...r.runtime||{}})}}function rd(t={}){let e=sr(t),r=[];return Array.isArray(e.tables)||r.push("\u8868\u5B9A\u4E49\u5FC5\u987B\u662F JSON \u6570\u7EC4\u3002"),e.promptTemplate||r.push("\u586B\u8868 Prompt \u4E0D\u80FD\u4E3A\u7A7A\u3002"),e.mirrorTag||r.push("\u6B63\u6587\u955C\u50CF\u6807\u7B7E\u4E0D\u80FD\u4E3A\u7A7A\u3002"),{valid:r.length===0,errors:r,config:e}}function Te(){let t=Qc.get(Zc,Zf()),e=sr(t),r=Yc();return{...qf(e,r),guide:r}}function tS(t){let r=(Array.isArray(t?.tables)?t.tables:[]).map(n=>({...n,rows:[]}));return{...t,tables:r}}function nt(t={}){let e=Te(),r=sr({...e,...t||{},runtime:t?.runtime===void 0?e.runtime:t.runtime}),n=rd(r);if(!n.valid)return{success:!1,error:n.errors.join(`
`),errors:n.errors,config:n.config};let s=tS(n.config);return Qc.set(Zc,s),Hf({templateId:n.config.activeTemplate,scope:n.config.scope,worldbookSync:n.config.worldbookSync}),{success:!0,config:n.config}}function eg(t={}){let e=Te(),r=sr({...e,runtime:{...e.runtime,...t||{}}});return Qc.set(Zc,r),r.runtime}function rS(t={},e={}){let r=sr(t),n=j(r.promptTemplate,Vc);return e.skipResponseContract?n.trim():`${n}

${Yf}`.trim()}function tg(t={},e={}){let r=sr(t);return{id:"tableWorkbench",name:"\u586B\u8868\u5DE5\u4F5C\u53F0",promptTemplate:rS(r,e),bypass:{enabled:r.bypass?.enabled===!0,presetId:r.bypass?.presetId||r.promptPreset||""}}}var Qc,Zc,nr=O(()=>{Ve();Fe();js();vi();Gf();Jf();Xc();Qc=U.namespace("tableWorkbench"),Zc="config"});function sd(){return nd||(nd=N.createScope("TableIsolation")),nd}var rg,ng,nd,od,ue,jr=O(()=>{Ve();J();Fe();rg="tableEngine.isolation",ng=Object.freeze({enabled:!1,key:Lt});od=class{constructor(){this._cache=null,this._subscribers=new Set}getState(){if(this._cache)return this._cache;let e=U.get(rg,null);return this._cache=this._normalize(e),this._cache}isEnabled(){return this.getState().enabled===!0}getKey(){let e=this.getState();return e.enabled?e.key||Lt:Lt}getConfiguredKey(){return this.getState().key}setEnabled(e){let r=this._normalize({...this.getState(),enabled:!!e});this._commit(r,{reason:"enabled"})}setKey(e){let r=this._normalize({...this.getState(),key:e});this._commit(r,{reason:"key"})}updateState(e={}){let r=this.getState(),n=this._normalize({enabled:e.enabled!==void 0?!!e.enabled:r.enabled,key:e.key!==void 0?e.key:r.key});this._commit(n,{reason:"patch"})}reset(){this._commit({...ng},{reason:"reset"})}getScopeKey(e){return Jo(e,this.getKey())}subscribe(e){return typeof e!="function"?()=>{}:(this._subscribers.add(e),()=>this._subscribers.delete(e))}_normalize(e){return!e||typeof e!="object"?{...ng}:{enabled:e.enabled===!0,key:Oe(e.key)}}_commit(e,r={}){let n=this.getState();if(n.enabled===e.enabled&&n.key===e.key)return;this._cache=e;try{U.set(rg,e)}catch(o){sd().error("isolation \u72B6\u6001\u843D\u76D8\u5931\u8D25",o)}sd().info("isolation \u72B6\u6001\u53D8\u5316",{prev:n,next:e,reason:r.reason||""});let s={...e,prev:n,reason:r.reason||""};for(let o of this._subscribers)try{o(s)}catch(a){sd().error("isolation \u8BA2\u9605\u8005\u56DE\u8C03\u5F02\u5E38",a)}}},ue=new od});var sg={};ge(sg,{AuthorityProvider:()=>Ei,default:()=>sS});var Us,ad,nS,gn,Ei,sS,og=O(()=>{J();Ws();Us=N.createScope("AuthorityProvider"),ad="third-party/youyou-toolkit",nS="YouYou Toolkit",gn="main",Ei=class{constructor({extensionVersion:e="1.0.149"}={}){this.kind=Fs.AUTHORITY,this._client=null,this._extensionVersion=e,this._initialized=!1}async init(){let e=Ai();if(!e)return Us.error("\u672A\u68C0\u6D4B\u5230 window.STAuthority.AuthoritySDK"),!1;try{return this._client=await e.init({extensionId:ad,displayName:nS,version:this._extensionVersion,installType:"local",declaredPermissions:{sql:{private:!0}}}),this._initialized=!0,Us.info("AuthorityProvider \u521D\u59CB\u5316\u6210\u529F",{extensionId:ad}),!0}catch(r){return Us.error("AuthorityProvider \u521D\u59CB\u5316\u5931\u8D25",{error:r?.message||r}),this._initialized=!1,!1}}async dispose(){this._client=null,this._initialized=!1}async migrate({migrations:e,database:r=gn,tableName:n}={}){this._ensureReady();let s={database:r,migrations:e};n&&(s.tableName=n);let o=await this._client.sql.migrate(s);return{applied:o?.applied||[],skipped:o?.skipped||[],tableName:o?.tableName,latestId:o?.latestId}}async query({statement:e,params:r=[],database:n=gn,page:s=void 0}={}){this._ensureReady();let o={database:n,statement:e,params:r};s&&(o.page=s);let a=await this._client.sql.query(o);return{columns:a.columns||[],rows:a.rows||[],rowCount:a.rowCount??(a.rows?.length||0),page:a.page}}async execute({statement:e,params:r=[],database:n=gn}={}){this._ensureReady();let s=await this._client.sql.exec({database:n,statement:e,params:r});return{rowsAffected:s.rowsAffected??0,lastInsertRowid:s.lastInsertRowid??null}}async batch({statements:e,database:r=gn}={}){this._ensureReady();let n=(e||[]).map(o=>({mode:o.mode||(/^\s*SELECT/i.test(o.statement)?"query":"exec"),statement:o.statement,params:o.params||[]}));return{results:(await this._client.sql.batch({database:r,statements:n}))?.results||[]}}async transaction({statements:e,database:r=gn}={}){this._ensureReady();let n=(e||[]).map(o=>({mode:o.mode||(/^\s*SELECT/i.test(o.statement)?"query":"exec"),statement:o.statement,params:o.params||[]})),s=await this._client.sql.transaction({database:r,statements:n});return{committed:!!s?.committed,results:s?.results||[]}}async paginate({statement:e,params:r=[],database:n=gn,page:s={}}={}){return this._ensureReady(),this.query({statement:e,params:r,database:n,page:s})}async pageAll({statement:e,params:r=[],database:n=gn,pageSize:s=200,maxPages:o}={}){this._ensureReady();let a=await this._client.sql.pageAll({database:n,statement:e,params:r},{pageSize:s,maxPages:o});return{columns:a.columns||[],rows:a.rows||[],rowCount:a.rowCount??(a.rows?.length||0)}}async backup(){return Us.warn("backup() \u6682\u672A\u5B9E\u73B0\uFF0CAuthorityProvider \u8D70 Authority \u5185\u7F6E\u5907\u4EFD"),{kind:"authority",timestamp:Date.now()}}async export(){return Us.warn("export() \u6682\u672A\u5B9E\u73B0\uFF0CAuthorityProvider \u8D70 Authority \u5185\u7F6E\u5BFC\u51FA"),{kind:"authority",timestamp:Date.now()}}async import(){Us.warn("import() \u6682\u672A\u5B9E\u73B0\uFF0CAuthorityProvider \u8D70 Authority \u5185\u7F6E\u5BFC\u5165")}describe(){return{kind:this.kind,initialized:this._initialized,extensionId:ad,database:gn,hasClient:!!this._client}}_ensureReady(){if(!this._initialized||!this._client)throw new Error("AuthorityProvider \u5C1A\u672A\u521D\u59CB\u5316")}},sS=Ei});var ig={};ge(ig,{FallbackProvider:()=>Ci,default:()=>pS});function oS(t){let e=[],r=0,n="";for(let s of t)s==="("?r+=1:s===")"&&(r-=1),s===","&&r===0?(n.trim()&&e.push(n),n=""):n+=s;return n.trim()&&e.push(n),e}function aS(t){let e=t.match(/^\s*CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?(\w+)\s*\(([\s\S]+)\)\s*$/i);if(!e)return null;let r=e[1],n=e[2],s=oS(n),o=[],a=[];for(let i of s){let l=i.trim(),d=l.match(/^PRIMARY\s+KEY\s*\(([^)]+)\)$/i);if(d){a=d[1].split(",").map(u=>u.trim());continue}let c=l.match(/^(\w+)\s+(\w+)/);c&&(o.push({name:c[1],type:c[2].toUpperCase(),raw:l}),/PRIMARY\s+KEY/i.test(l)&&!a.length&&(a=[c[1]]))}return{name:r,columns:o,pkCols:a}}function iS(t){let e=t.match(/^\s*INSERT\s+(?:OR\s+REPLACE\s+)?INTO\s+(\w+)(?:\s*\(([^)]+)\))?\s+VALUES\s*\(([^)]+)\)\s*$/i);if(!e)return null;let r=e[1],n=e[2]?e[2].split(",").map(o=>o.trim()):null,s=(e[3].match(/\?/g)||[]).length;return{name:r,cols:n,paramCount:s}}function cd(t){let e=t.split(/\s+AND\s+/i),r=[];for(let n of e){let s=n.match(/^\s*(\w+)\s*(=|!=|<>|>=|<=|>|<)\s*\?\s*$/);if(s){let a=s[2]==="<>"?"!=":s[2];r.push({col:s[1],op:a,placeholder:!0});continue}let o=n.match(/^\s*(\w+)\s+IS\s+(NOT\s+)?NULL\s*$/i);if(o){r.push({col:o[1],op:o[2]?"IS NOT NULL":"IS NULL",placeholder:!1});continue}throw new Error(`FallbackProvider \u4E0D\u652F\u6301\u7684 WHERE \u5B50\u53E5: "${n}"`)}return r}function lS(t){let e=t.match(/^\s*SELECT\s+([\s\S]+?)\s+FROM\s+(\w+)([\s\S]*)$/i);if(!e)return null;let r=e[1].trim(),n=e[2],s=e[3],o=s.match(/\bWHERE\s+([\s\S]+?)(?=\bORDER\s+BY\b|\bLIMIT\b|\bOFFSET\b|$)/i),a=s.match(/\bORDER\s+BY\s+(\w+)\s*(ASC|DESC)?/i),i=s.match(/\bLIMIT\s+(\d+)/i),l=s.match(/\bOFFSET\s+(\d+)/i);return{name:n,cols:r==="*"?null:r.split(",").map(d=>d.trim()),where:o?cd(o[1].trim()):null,orderBy:a?{col:a[1],dir:(a[2]||"ASC").toUpperCase()}:null,limit:i?parseInt(i[1],10):null,offset:l?parseInt(l[1],10):null}}function cS(t){let e=t.match(/^\s*UPDATE\s+(\w+)\s+SET\s+([\s\S]+?)(?:\s+WHERE\s+([\s\S]+))?\s*$/i);if(!e)return null;let r=e[1],n=e[2],s=e[3],o=n.split(",").map(a=>{let i=a.trim().match(/^(\w+)\s*=\s*\?$/);if(!i)throw new Error(`FallbackProvider \u4E0D\u652F\u6301\u7684 SET \u5B50\u53E5: "${a}"`);return i[1]});return{name:r,setCols:o,where:s?cd(s.trim()):null}}function dS(t){let e=t.match(/^\s*DELETE\s+FROM\s+(\w+)(?:\s+WHERE\s+([\s\S]+))?\s*$/i);return e?{name:e[1],where:e[2]?cd(e[2].trim()):null}:null}function ld(t,e){return t===e?!0:t==null?e==null:e==null?!1:typeof t=="number"||typeof e=="number"?Number(t)===Number(e):String(t)===String(e)}function Zo(t,e){return t===e?0:t==null?-1:e==null?1:typeof t=="number"&&typeof e=="number"?t-e:String(t)<String(e)?-1:1}function uS(t,e,r){let n=t[e.col];if(e.op==="IS NULL")return n==null;if(e.op==="IS NOT NULL")return n!=null;let s=r.shift();switch(e.op){case"=":return ld(n,s);case"!=":return!ld(n,s);case">":return Zo(n,s)>0;case"<":return Zo(n,s)<0;case">=":return Zo(n,s)>=0;case"<=":return Zo(n,s)<=0;default:return!1}}function id(t,e,r){if(!e||!e.length)return!0;let n=Array.isArray(r)?[...r]:[];for(let s of e)if(!uS(t,s,n))return!1;return!0}var Hs,ag,Ci,pS,lg=O(()=>{J();Ve();Ws();Hs=N.createScope("FallbackProvider"),ag="provider_fallback_v1";Ci=class{constructor(){this.kind=Fs.FALLBACK,this._tables=new Map,this._migrations=new Set,this._initialized=!1,this._dirty=!1,this._saveTimer=null}async init(){try{let e=Ne.get(ag)||{};this._migrations=new Set(Array.isArray(e.migrations)?e.migrations:[]),this._tables=new Map;for(let[r,n]of Object.entries(e.tables||{}))this._tables.set(r,{schema:n.schema||{name:r,columns:[],pkCols:[]},rows:Array.isArray(n.rows)?n.rows:[]});return this._initialized=!0,Hs.info("FallbackProvider \u521D\u59CB\u5316\u5B8C\u6210",{tables:this._tables.size,migrations:this._migrations.size}),!0}catch(e){return Hs.error("FallbackProvider \u521D\u59CB\u5316\u5931\u8D25",{error:e?.message||e}),this._initialized=!1,!1}}async dispose(){this._flushSave(!0),this._tables.clear(),this._migrations.clear(),this._initialized=!1}async migrate({migrations:e}={}){this._ensureReady();let r=[],n=[];for(let s of e||[]){if(!s?.id||!s?.statement)continue;if(this._migrations.has(s.id)){n.push(s.id);continue}let o=s.statement.trim();if(/^CREATE\s+TABLE/i.test(o)){let a=aS(o);if(!a)throw new Error(`\u65E0\u6CD5\u89E3\u6790 CREATE TABLE: ${o}`);this._tables.has(a.name)||this._tables.set(a.name,{schema:a,rows:[]})}else if(!/^CREATE\s+(UNIQUE\s+)?INDEX/i.test(o))if(/^DROP\s+TABLE/i.test(o)){let a=o.match(/^DROP\s+TABLE\s+(?:IF\s+EXISTS\s+)?(\w+)/i);a&&this._tables.delete(a[1])}else/^ALTER\s+TABLE/i.test(o)?Hs.warn("FallbackProvider \u4E0D\u652F\u6301 ALTER TABLE\uFF0C\u8DF3\u8FC7",{id:s.id}):Hs.warn("FallbackProvider \u8DF3\u8FC7\u672A\u8BC6\u522B DDL",{id:s.id,statement:o});this._migrations.add(s.id),r.push(s.id)}return this._markDirty(),{applied:r,skipped:n}}async query({statement:e,params:r=[]}={}){this._ensureReady();let n=lS(e);if(!n)throw new Error(`\u65E0\u6CD5\u89E3\u6790 SELECT: ${e}`);let s=this._tables.get(n.name);if(!s)return{columns:n.cols||[],rows:[],rowCount:0};let o=s.rows.filter(l=>id(l,n.where,r));if(n.orderBy){let l=n.orderBy.dir==="DESC"?-1:1;o=[...o].sort((d,c)=>Zo(d[n.orderBy.col],c[n.orderBy.col])*l)}n.offset&&(o=o.slice(n.offset)),Number.isFinite(n.limit)&&(o=o.slice(0,n.limit));let a,i=o;return n.cols?(i=o.map(l=>{let d={};for(let c of n.cols)d[c]=l[c]===void 0?null:l[c];return d}),a=n.cols):a=s.schema?.columns?.map(l=>l.name)||(i[0]?Object.keys(i[0]):[]),{columns:a,rows:i,rowCount:i.length}}async execute({statement:e,params:r=[]}={}){this._ensureReady();let n=String(e||"").trim(),s=n.split(/\s+/)[0].toUpperCase(),o;if(s==="INSERT")o=this._doInsert(n,r);else if(s==="UPDATE")o=this._doUpdate(n,r);else if(s==="DELETE")o=this._doDelete(n,r);else throw new Error(`FallbackProvider \u4E0D\u652F\u6301\u7684 execute \u8BED\u53E5: ${e}`);return o}_doInsert(e,r){let n=iS(e);if(!n)throw new Error(`\u65E0\u6CD5\u89E3\u6790 INSERT: ${e}`);let s=this._tables.get(n.name);if(!s)throw new Error(`\u8868\u4E0D\u5B58\u5728: ${n.name}`);let o=n.cols||(s.schema.columns||[]).map(d=>d.name);if(!o.length)throw new Error(`\u8868 ${n.name} \u65E0\u5217\u5B9A\u4E49`);if(r.length!==o.length)throw new Error(`INSERT \u53C2\u6570\u6570\u91CF\u4E0D\u5339\u914D (\u671F\u671B ${o.length}, \u5B9E\u9645 ${r.length})`);let a={};for(let d=0;d<o.length;d+=1)a[o[d]]=r[d];let i=s.schema?.pkCols||[],l=/^INSERT\s+OR\s+REPLACE/i.test(e);if(i.length){let d=s.rows.findIndex(c=>i.every(u=>ld(c[u],a[u])));if(d>=0){if(l)return s.rows[d]=a,this._markDirty(),{rowsAffected:1,lastInsertRowid:d+1};throw new Error(`PRIMARY KEY \u51B2\u7A81 (${i.join(",")})`)}}return s.rows.push(a),this._markDirty(),{rowsAffected:1,lastInsertRowid:s.rows.length}}_doUpdate(e,r){let n=cS(e);if(!n)throw new Error(`\u65E0\u6CD5\u89E3\u6790 UPDATE: ${e}`);let s=this._tables.get(n.name);if(!s)return{rowsAffected:0,lastInsertRowid:null};let o=n.setCols.length;if(r.length<o)throw new Error(`UPDATE \u53C2\u6570\u4E0D\u8DB3 (SET \u9700\u8981 ${o}, \u5B9E\u9645 ${r.length})`);let a=r.slice(0,o),i=r.slice(o),l=0;for(let d of s.rows)if(id(d,n.where,i)){for(let c=0;c<o;c+=1)d[n.setCols[c]]=a[c];l+=1}return l>0&&this._markDirty(),{rowsAffected:l,lastInsertRowid:null}}_doDelete(e,r){let n=dS(e);if(!n)throw new Error(`\u65E0\u6CD5\u89E3\u6790 DELETE: ${e}`);let s=this._tables.get(n.name);if(!s)return{rowsAffected:0,lastInsertRowid:null};let o=s.rows.length;s.rows=s.rows.filter(i=>!id(i,n.where,r));let a=o-s.rows.length;return a>0&&this._markDirty(),{rowsAffected:a,lastInsertRowid:null}}async batch({statements:e}={}){this._ensureReady();let r=[];for(let n of e||[])if(String(n.statement||"").trim().split(/\s+/)[0].toUpperCase()==="SELECT"){let o=await this.query(n);r.push({kind:"query",...o})}else{let o=await this.execute(n);r.push({kind:"exec",...o})}return{results:r}}async transaction({statements:e}={}){this._ensureReady();let r=this._snapshot();try{let{results:n}=await this.batch({statements:e});return this._flushSave(!0),{committed:!0,results:n}}catch(n){throw this._restore(r),Hs.warn("FallbackProvider \u4E8B\u52A1\u56DE\u6EDA",{error:n?.message||n}),n}}async paginate({statement:e,params:r=[],page:n={}}={}){this._ensureReady();let s=Number.isFinite(n?.limit)?n.limit:50,o=Number.isFinite(n?.offset)?n.offset:0,a=`${e} LIMIT ${s} OFFSET ${o}`;return this.query({statement:a,params:r})}async backup(){return this._ensureReady(),this._snapshot()}async export(){return this.backup()}async import(e){this._ensureReady(),this._restore(e||{}),this._markDirty(),this._flushSave(!0)}describe(){return{kind:this.kind,initialized:this._initialized,tables:this._tables.size,migrations:this._migrations.size,tableNames:[...this._tables.keys()]}}_snapshot(){let e={};for(let[r,n]of this._tables)e[r]={schema:n.schema,rows:JSON.parse(JSON.stringify(n.rows))};return{migrations:[...this._migrations],tables:e}}_restore(e){this._migrations=new Set(Array.isArray(e?.migrations)?e.migrations:[]),this._tables=new Map;for(let[r,n]of Object.entries(e?.tables||{}))this._tables.set(r,{schema:n.schema||{name:r,columns:[],pkCols:[]},rows:Array.isArray(n.rows)?n.rows:[]})}_markDirty(){this._dirty=!0,this._saveTimer&&clearTimeout(this._saveTimer),this._saveTimer=setTimeout(()=>this._flushSave(!1),300)}_flushSave(e){if(this._saveTimer&&(clearTimeout(this._saveTimer),this._saveTimer=null),!(!this._dirty&&!e))try{Ne.set(ag,this._snapshot()),this._dirty=!1}catch(r){Hs.error("FallbackProvider \u6301\u4E45\u5316\u5931\u8D25",{error:r?.message||r})}}_ensureReady(){if(!this._initialized)throw new Error("FallbackProvider \u5C1A\u672A\u521D\u59CB\u5316")}},pS=Ci});var cg={};ge(cg,{PROVIDER_KIND:()=>Fs,createProvider:()=>yS,detectAuthoritySdk:()=>Ai,disposeToolDataProvider:()=>fS,getCurrentProvider:()=>qs,getToolDataProvider:()=>ta});function Ai(){if(typeof window>"u")return null;try{let t=window.STAuthority?.AuthoritySDK;if(t)return t}catch{}try{if(window.parent&&window.parent!==window){let t=window.parent.STAuthority?.AuthoritySDK;if(t)return t}}catch{}return null}async function ud({preferAuthority:t=!0,extensionVersion:e="1.0.149"}={}){if(t&&Ai()){let{AuthorityProvider:n}=await Promise.resolve().then(()=>(og(),sg));return new n({extensionVersion:e})}let{FallbackProvider:r}=await Promise.resolve().then(()=>(lg(),ig));return new r}async function ta(t={}){return Zn||ea||(ea=(async()=>{let e=await ud({preferAuthority:!0,...t}),r=await e.init();if(!r&&e.kind===Fs.AUTHORITY){dd.warn("AuthorityProvider \u521D\u59CB\u5316\u5931\u8D25\uFF0C\u964D\u7EA7\u5230 FallbackProvider");try{await e.dispose()}catch{}e=await ud({preferAuthority:!1}),r=await e.init()}return r?dd.info(`Provider \u521D\u59CB\u5316\u5B8C\u6210: kind=${e.kind}`):dd.error(`Provider \u5168\u90E8\u521D\u59CB\u5316\u5931\u8D25 (kind=${e.kind})`),Zn=e,e})(),ea)}function qs(){return Zn}async function yS(t={}){let e=await ud(t);return await e.init(),e}async function fS(){if(Zn){try{await Zn.dispose()}catch{}Zn=null}ea=null}var dd,Fs,Zn,ea,Ws=O(()=>{J();dd=N.createScope("ToolDataProvider"),Fs=Object.freeze({AUTHORITY:"authority",FALLBACK:"fallback"}),Zn=null,ea=null});var bd={};ge(bd,{clearChatScopeConfig:()=>Tg,clearLockEntry:()=>bg,clearScopeLocks:()=>wg,clearSheetLocks:()=>xg,clearSlot:()=>gg,commitSlotTables:()=>Mi,default:()=>mS,deleteRowsBySheet:()=>yg,deleteSheetsBySlot:()=>Ri,ensureTableDataReady:()=>st,getChatScopeConfig:()=>vg,getCurrentTableDataProvider:()=>ug,getLocksForSheet:()=>mg,getRowsBySheet:()=>hd,getSheetsBySlot:()=>gd,loadSlotTables:()=>fg,setChatScopeConfig:()=>Sg,setLockEntry:()=>hg,upsertSheetMeta:()=>fd,upsertSheetRows:()=>md});function yd(){return pd||(pd=N.createScope("TableDataService")),pd}async function st(){return dg?qs():ra||(ra=(async()=>{try{let t=await ta();if(!t)return yd().error("Provider \u4E0D\u53EF\u7528\uFF0C\u8DF3\u8FC7 migration"),null;let e=await t.migrate({migrations:[...gS]});return dg=!0,yd().info("\u8868\u683C\u6570\u636E migration \u5B8C\u6210",{kind:t.kind,applied:e?.applied?.length||0,skipped:e?.skipped?.length||0}),t}catch(t){return yd().error("table-data-service migration \u5931\u8D25",t),null}finally{ra=null}})(),ra)}function ug(){return qs()}function pg(){return Date.now()}function ki(t){try{return JSON.stringify(t)}catch{return"{}"}}function Ii(t,e=null){if(typeof t!="string")return e;try{return JSON.parse(t)}catch{return e}}function mn(t={}){return{chatId:String(t.chatId??"").trim(),messageId:String(t.messageId??"").trim(),swipeId:String(t.swipeId??"0").trim()||"0",isolationKey:Oe(t.isolationKey)}}function hn(t){return t&&t.chatId&&t.messageId}async function fd(t,e){let r=await st();if(!r)return!1;let n=mn(t);return!hn(n)||!e?.uid?!1:(await r.execute({statement:`INSERT INTO table_sheets
      (chat_id, message_id, swipe_id, isolation_key, sheet_uid, name, columns_json, meta_json, order_no, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,params:[n.chatId,n.messageId,n.swipeId,n.isolationKey,String(e.uid),String(e.name??e.uid),ki(Array.isArray(e.columns)?e.columns:[]),ki(e.meta||e.sourceData||{}),Number.isFinite(e.orderNo)?e.orderNo:0,pg()]}),!0)}async function gd(t){let e=await st();if(!e)return[];let r=mn(t);return hn(r)?((await e.query({statement:`SELECT * FROM table_sheets
      WHERE chat_id = ? AND message_id = ? AND swipe_id = ? AND isolation_key = ?
      ORDER BY order_no ASC`,params:[r.chatId,r.messageId,r.swipeId,r.isolationKey]}))?.rows||[]).map(s=>({uid:s.sheet_uid,name:s.name,columns:Ii(s.columns_json,[]),meta:Ii(s.meta_json,{}),orderNo:s.order_no||0,updatedAt:s.updated_at||0})):[]}async function Ri(t){let e=await st();if(!e)return 0;let r=mn(t);return hn(r)&&(await e.execute({statement:`DELETE FROM table_sheets
      WHERE chat_id = ? AND message_id = ? AND swipe_id = ? AND isolation_key = ?`,params:[r.chatId,r.messageId,r.swipeId,r.isolationKey]}))?.rowsAffected||0}async function md(t,e,r){let n=await st();if(!n)return!1;let s=mn(t);if(!hn(s)||!e||!Array.isArray(r))return!1;if(await n.execute({statement:`DELETE FROM table_rows
      WHERE chat_id = ? AND message_id = ? AND swipe_id = ? AND isolation_key = ? AND sheet_uid = ?`,params:[s.chatId,s.messageId,s.swipeId,s.isolationKey,String(e)]}),r.length===0)return!0;let o=r.map((a,i)=>({statement:`INSERT INTO table_rows
      (chat_id, message_id, swipe_id, isolation_key, sheet_uid, row_index, row_id, row_name, cells_json)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,params:[s.chatId,s.messageId,s.swipeId,s.isolationKey,String(e),i,String(a?.id??""),String(a?.name??""),ki(a?.cells||{})]}));return typeof n.transaction=="function"?await n.transaction({statements:o}):await n.batch({statements:o}),!0}async function hd(t,e){let r=await st();if(!r)return[];let n=mn(t);return!hn(n)||!e?[]:((await r.query({statement:`SELECT * FROM table_rows
      WHERE chat_id = ? AND message_id = ? AND swipe_id = ? AND isolation_key = ? AND sheet_uid = ?
      ORDER BY row_index ASC`,params:[n.chatId,n.messageId,n.swipeId,n.isolationKey,String(e)]}))?.rows||[]).map(o=>({id:o.row_id||"",name:o.row_name||"",cells:Ii(o.cells_json,{}),rowIndex:o.row_index}))}async function yg(t,e){let r=await st();if(!r)return 0;let n=mn(t);return!hn(n)||!e?0:(await r.execute({statement:`DELETE FROM table_rows
      WHERE chat_id = ? AND message_id = ? AND swipe_id = ? AND isolation_key = ? AND sheet_uid = ?`,params:[n.chatId,n.messageId,n.swipeId,n.isolationKey,String(e)]}))?.rowsAffected||0}async function fg(t){let e=await gd(t);if(e.length===0)return[];let r=[];for(let n of e){let s=await hd(t,n.uid);r.push({id:n.uid,uid:n.uid,name:n.name,columns:n.columns,rows:s,meta:n.meta,orderNo:n.orderNo,updatedAt:n.updatedAt})}return r}async function Mi(t,e){let r=await st();if(!r)return!1;let n=mn(t);if(!hn(n)||!Array.isArray(e))return!1;await Ri(n),await r.execute({statement:`DELETE FROM table_rows
      WHERE chat_id = ? AND message_id = ? AND swipe_id = ? AND isolation_key = ?`,params:[n.chatId,n.messageId,n.swipeId,n.isolationKey]});for(let s=0;s<e.length;s++){let o=e[s],a=String(o?.uid||o?.id||`sheet_${s+1}`);await fd(n,{uid:a,name:o?.name||a,columns:o?.columns||[],meta:o?.meta||{},orderNo:Number.isFinite(o?.orderNo)?o.orderNo:s}),await md(n,a,Array.isArray(o?.rows)?o.rows:[])}return!0}async function gg(t){let e=await st();if(!e)return!1;let r=mn(t);return hn(r)?(await Ri(r),await e.execute({statement:`DELETE FROM table_rows
      WHERE chat_id = ? AND message_id = ? AND swipe_id = ? AND isolation_key = ?`,params:[r.chatId,r.messageId,r.swipeId,r.isolationKey]}),!0):!1}async function mg(t,e){let r=await st();if(!r)return[];let n=String(t?.chatId??"").trim(),s=Oe(t?.isolationKey);return!n||!e?[]:((await r.query({statement:`SELECT lock_type, target FROM table_locks
      WHERE chat_id = ? AND isolation_key = ? AND sheet_uid = ?`,params:[n,s,String(e)]}))?.rows||[]).map(a=>({lockType:a.lock_type,target:a.target||""}))}async function hg(t,e,r,n=""){let s=await st();if(!s)return!1;let o=String(t?.chatId??"").trim(),a=Oe(t?.isolationKey);return!o||!e||!r?!1:(await s.execute({statement:"INSERT INTO table_locks (chat_id, isolation_key, sheet_uid, lock_type, target) VALUES (?, ?, ?, ?, ?)",params:[o,a,String(e),String(r),String(n)]}),!0)}async function bg(t,e,r,n=""){let s=await st();if(!s)return!1;let o=String(t?.chatId??"").trim(),a=Oe(t?.isolationKey);return!o||!e||!r?!1:(await s.execute({statement:`DELETE FROM table_locks
      WHERE chat_id = ? AND isolation_key = ? AND sheet_uid = ? AND lock_type = ? AND target = ?`,params:[o,a,String(e),String(r),String(n)]}),!0)}async function xg(t,e){let r=await st();if(!r)return!1;let n=String(t?.chatId??"").trim(),s=Oe(t?.isolationKey);return!n||!e?!1:(await r.execute({statement:`DELETE FROM table_locks
      WHERE chat_id = ? AND isolation_key = ? AND sheet_uid = ?`,params:[n,s,String(e)]}),!0)}async function wg(t){let e=await st();if(!e)return!1;let r=String(t?.chatId??"").trim(),n=Oe(t?.isolationKey);return r?(await e.execute({statement:"DELETE FROM table_locks WHERE chat_id = ? AND isolation_key = ?",params:[r,n]}),!0):!1}async function vg(t){let e=await st();if(!e)return null;let r=String(t??"").trim();if(!r)return null;let s=(await e.query({statement:"SELECT scoped_config_json FROM table_chat_scope WHERE chat_id = ?",params:[r]}))?.rows?.[0];return s?Ii(s.scoped_config_json,null):null}async function Sg(t,e){let r=await st();if(!r)return!1;let n=String(t??"").trim();return n?(await r.execute({statement:"INSERT INTO table_chat_scope (chat_id, scoped_config_json, updated_at) VALUES (?, ?, ?)",params:[n,ki(e||{}),pg()]}),!0):!1}async function Tg(t){let e=await st();if(!e)return!1;let r=String(t??"").trim();return r?(await e.execute({statement:"DELETE FROM table_chat_scope WHERE chat_id = ?",params:[r]}),!0):!1}var pd,gS,dg,ra,mS,Pi=O(()=>{J();Ws();Fe();gS=Object.freeze([{id:"table_engine_v1__sheets",statement:`
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
    `.replace(/\s+/g," ").trim()}]),dg=!1,ra=null;mS={ensureTableDataReady:st,getCurrentTableDataProvider:ug,upsertSheetMeta:fd,getSheetsBySlot:gd,deleteSheetsBySlot:Ri,upsertSheetRows:md,getRowsBySheet:hd,deleteRowsBySheet:yg,loadSlotTables:fg,commitSlotTables:Mi,clearSlot:gg,getLocksForSheet:mg,setLockEntry:hg,clearLockEntry:bg,clearSheetLocks:xg,clearScopeLocks:wg,getChatScopeConfig:vg,setChatScopeConfig:Sg,clearChatScopeConfig:Tg}});function Fr(){return xd||(xd=N.createScope("TableChatScope")),xd}function Ir(){let t=globalThis.window||globalThis,e=t?.TavernHelper?.getCurrentChatId?.()||t?.Silvy?.getCurrentChatId?.()||t?.chat_metadata?.chat_id||t?.this_chid||t?.name1;return String(e??"").trim()||"default_chat"}function $i(){return new Date().toISOString()}function Gs(t){return t!==null&&typeof t=="object"&&!Array.isArray(t)}function Ur(t){let e=vd.get(wd,{}),n=(Gs(e)?e:{})[t];return Eg(n)}function es(t,e){let r=vd.get(wd,{}),n=Gs(r)?r:{};n[t]=e,vd.set(wd,n),bS(t,e).catch(()=>{})}async function bS(t,e){try{let r=await Promise.resolve().then(()=>(Pi(),bd));await r.ensureTableDataReady(),await r.setChatScopeConfig(t,e||{})}catch(r){Fr().warn("chat-scope SQL \u955C\u50CF\u5931\u8D25\uFF08\u4E0D\u5F71\u54CD\u4E3B\u6D41\u7A0B\uFF09",{error:r?.message||String(r)})}}function _g(){return{template:{},templateArchives:{}}}function Eg(t){return Gs(t)?{template:Gs(t.template)?t.template:{},templateArchives:Gs(t.templateArchives)?t.templateArchives:{}}:_g()}function Ni(t){return Gs(t)?{mode:xS.has(t.mode)?t.mode:rt.INHERIT_GLOBAL,presetName:typeof t.presetName=="string"?t.presetName:"",templateStr:typeof t.templateStr=="string"?t.templateStr:"",guideData:t.guideData!==void 0?pe(t.guideData):null,updatedAt:typeof t.updatedAt=="string"?t.updatedAt:$i(),source:typeof t.source=="string"?t.source:"ui"}:null}function wS(t){let e=[t.mode||"",t.presetName||"",t.templateStr||""],r=5381,n=e.join("||");for(let s=0;s<n.length;s++)r=(r<<5)+r+n.charCodeAt(s),r|=0;return String(r)}var hS,wd,xd,vd,xS,Sd,Rr,Ag=O(()=>{Ve();J();Fe();jr();hS="tableChatScope",wd="chats";vd=U.namespace(hS);xS=new Set(Object.values(rt));Sd=class{getScopedConfig(e=Ir()){return Ur(e)}setScopedConfig(e,r=Ir()){let n=Eg(e);return es(r,n),n}getTemplateScope(e,r=Ir()){let n=Oe(e===void 0?ue.getKey():e),s=Ur(r);return Ni(s.template[n])||null}setTemplateScope(e,r,n=Ir()){let s=Oe(r===void 0?ue.getKey():r),o=Ni({...e,updatedAt:$i()});if(!o)return Fr().warn("setTemplateScope \u6536\u5230\u65E0\u6548 state",e),null;let a=Ur(n);return a.template[s]=o,es(n,a),Fr().info("\u6A21\u677F\u4F5C\u7528\u57DF\u5DF2\u66F4\u65B0",{chatId:n,isolationKey:s,mode:o.mode}),o}clearTemplateScope(e,r=Ir()){let n=Oe(e===void 0?ue.getKey():e),s=Ur(r);s.template[n]!==void 0&&(delete s.template[n],es(r,s),Fr().info("\u6A21\u677F\u4F5C\u7528\u57DF\u5DF2\u6E05\u9664",{chatId:r,isolationKey:n}))}archiveCurrentTemplate(e,r=Ir()){let n=Oe(e===void 0?ue.getKey():e),s=Ur(r),o=Ni(s.template[n]);if(!o)return null;let a=wS(o),i=Array.isArray(s.templateArchives[n])?s.templateArchives[n]:[];if(i.length>0&&i[0].fingerprint===a)return null;let l={fingerprint:a,state:pe(o),archivedAt:$i()},d=[l,...i].slice(0,Bf);return s.templateArchives[n]=d,es(r,s),Fr().info("\u6A21\u677F\u5DF2\u5F52\u6863",{chatId:r,isolationKey:n,archiveCount:d.length}),l}listTemplateArchives(e,r=Ir()){let n=Oe(e===void 0?ue.getKey():e),s=Ur(r);return(Array.isArray(s.templateArchives[n])?s.templateArchives[n]:[]).map(a=>pe(a))}restoreTemplateArchive(e,r,n=Ir()){let s=Oe(r===void 0?ue.getKey():r),o=Ur(n),a=Array.isArray(o.templateArchives[s])?o.templateArchives[s]:[],i=a[e];if(!i)return Fr().warn("restoreTemplateArchive: \u627E\u4E0D\u5230 archive",{index:e,available:a.length}),null;this.archiveCurrentTemplate(s,n);let l=Ni({...i.state,source:"restore",updatedAt:$i()});if(!l)return null;let d=Ur(n);return d.template[s]=l,es(n,d),Fr().info("\u6A21\u677F\u5DF2\u6062\u590D",{chatId:n,isolationKey:s,fromArchiveIndex:e}),l}clearTemplateArchives(e,r=Ir()){let n=Oe(e===void 0?ue.getKey():e),s=Ur(r);Array.isArray(s.templateArchives[n])&&(delete s.templateArchives[n],es(r,s),Fr().info("\u6A21\u677F\u5F52\u6863\u5DF2\u6E05\u7A7A",{chatId:r,isolationKey:n}))}resetChat(e=Ir()){es(e,_g()),Fr().warn("\u5DF2\u91CD\u7F6E chat \u7684 ScopedConfig",{chatId:e})}},Rr=new Sd});var Cg,kg=O(()=>{Fe();Cg=Object.freeze({formatId:"youyou",displayName:"YouYou \u539F\u751F (tables \u6570\u7EC4)",detect(t){return!t||typeof t!="object"||Array.isArray(t)?!1:Array.isArray(t.tables)},parse(t){if(!t||typeof t!="object")throw new Error("youyou-importer: raw \u4E0D\u662F\u5BF9\u8C61");return{tables:Array.isArray(t.tables)?pe(t.tables):[],name:typeof t.name=="string"?t.name:"",description:typeof t.description=="string"?t.description:"",promptTemplate:typeof t.promptTemplate=="string"?t.promptTemplate:""}}})});function Mr(t,e=""){return t==null?e:String(t).trim()||e}function Ig(t){return t&&typeof t=="object"&&Array.isArray(t.content)}function Rg(t){return!t||typeof t!="object"?null:t.tables&&typeof t.tables=="object"&&!Array.isArray(t.tables)&&Object.keys(t.tables).filter(n=>n.startsWith("sheet_")&&Ig(t.tables[n])).length>0?t.tables:Object.keys(t).filter(r=>r.startsWith("sheet_")&&Ig(t[r])).length>0?t:null}function vS(t){return!t||typeof t!="object"?[]:Object.keys(t).filter(r=>r.startsWith("sheet_")&&t[r]&&typeof t[r]=="object").map((r,n)=>({key:r,table:t[r],fallbackOrder:n})).sort((r,n)=>{let s=Number.isFinite(r.table.orderNo)?r.table.orderNo:r.fallbackOrder,o=Number.isFinite(n.table.orderNo)?n.table.orderNo:n.fallbackOrder;return s-o}).map(({key:r,table:n},s)=>{let o=n.sourceData&&typeof n.sourceData=="object"?n.sourceData:{},a=Array.isArray(n.content)?n.content:[],i=Array.isArray(a[0])?a[0]:[],l=ed(o.note),d=new Set,c=i.slice(1).map((y,p)=>{let g=l[p]||{},m=Mr(y||g.title,`\u5217${p+1}`);return{key:yn(m||`col_${p+1}`,d),title:m,description:Mr(g.description,""),type:"text",required:!1}}),u=a.slice(1).map((y,p)=>{let g=Array.isArray(y)?y:[],m={};return c.forEach((h,b)=>{m[h.key]=pn(g[b+1])}),{name:Mr(g[0],`\u884C${p+1}`),cells:m}});return{id:Mr(n.uid||r,`sheet_${s+1}`),name:Mr(n.name,`\u8868${s+1}`),note:Mr(o.note,""),enabled:n.enabled!==!1,aiInstructions:{init:Mr(o.initNode,""),create:Mr(o.insertNode,""),update:Mr(o.updateNode,""),delete:Mr(o.deleteNode,"")},columns:c,rows:u}})}var Mg,Pg=O(()=>{Fe();nr();Mg=Object.freeze({formatId:"shujuku",displayName:"shujuku \u6570\u636E\u5E93\u683C\u5F0F (sheet_x)",detect(t){return!t||typeof t!="object"||Array.isArray(t)?!1:Rg(t)!==null},parse(t){let e=Rg(t);if(!e)throw new Error("shujuku-importer: \u672A\u627E\u5230 sheet_xxx \u5165\u53E3");return{tables:vS(e),name:typeof t.name=="string"?t.name:"",description:typeof t.description=="string"?t.description:""}}})});var Ng,$g=O(()=>{Ng=Object.freeze({formatId:"youyou",displayName:"YouYou \u539F\u751F (.json)",fileExtension:".json",mimeType:"application/json",serialize(t){return{version:1,exportedAt:new Date().toISOString(),templates:Array.isArray(t)?t:[]}}})});function na(){return Td||(Td=N.createScope("TemplateAdapter")),Td}function Lg(t){if(t==null)return null;for(let e of SS){let r=!1;try{r=e.detect(t)}catch(n){na().warn(`importer ${e.formatId} detect \u629B\u9519`,n);continue}if(r)try{let n=e.parse(t);if(n&&Array.isArray(n.tables))return na().debug("\u9002\u914D\u5668\u547D\u4E2D",{formatId:e.formatId,displayName:e.displayName,tableCount:n.tables.length,firstTableName:n.tables[0]?.name||""}),{...n,formatId:e.formatId};na().warn(`importer ${e.formatId} parse \u8FD4\u56DE\u65E0\u6548\u7ED3\u6784`,{hasResult:!!n,hasTablesArray:Array.isArray(n?.tables)})}catch(n){na().warn(`importer ${e.formatId} parse \u629B\u9519\uFF0C\u5C1D\u8BD5\u4E0B\u4E00\u4E2A`,n)}}return na().warn("importTemplateAuto: \u65E0\u9002\u914D\u5668\u547D\u4E2D",{isObject:t&&typeof t=="object",isArray:Array.isArray(t),keys:t&&typeof t=="object"?Object.keys(t).slice(0,10):[]}),null}var Td,SS,c5,Og=O(()=>{J();kg();Pg();$g();SS=Object.freeze([Cg,Mg]),c5=Object.freeze([Ng])});function Ot(){return _d||(_d=N.createScope("TableTemplate")),_d}function ft(t,e=""){return t==null?e:String(t).trim()||e}function Dg(t="template"){return`${t}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`}function Vs(t={}){let e=Lg(t),r=[],n="",s="",o="",a="";e?(r=e.tables,n=e.formatId||"",s=e.name||"",o=e.description||"",a=e.promptTemplate||""):t&&typeof t=="object"&&Ot().warn("normalizeTemplate: \u65E0\u9002\u914D\u5668\u547D\u4E2D\uFF0C\u6309\u7A7A\u6A21\u677F\u5904\u7406",{keys:Object.keys(t).slice(0,10)});let i=_i({tables:r});return{id:ft(t?.id,Dg()),name:ft(t?.name||s,"\u672A\u547D\u540D\u6A21\u677F"),description:ft(t?.description||o,""),tables:i.tables||r,promptTemplate:ft(t?.promptTemplate||a,""),sourceFormat:n,createdAt:ft(t?.createdAt,new Date().toISOString()),updatedAt:ft(t?.updatedAt,new Date().toISOString())}}function Bg(){sa=null}function zg(){return[Vs({id:It,name:Jc,description:"\u5305\u542B\u5168\u5C40\u6570\u636E\u3001\u4E3B\u89D2\u3001\u91CD\u8981\u89D2\u8272\u3001\u6280\u80FD\u3001\u80CC\u5305\u3001\u4EFB\u52A1\u3001\u7EAA\u8981\u548C\u9009\u9879\u8868\u3002",tables:pe(zs)})]}function ts(){let t=Ys.get(Ed,[]);return Array.isArray(t)?t.map(Vs):[]}function xn(){if(sa)return sa;let t=zg(),e=ts(),r=new Map(e.map(o=>[o.id,o])),n=t.map(o=>r.has(o.id)?r.get(o.id):o),s=new Set(t.map(o=>o.id));for(let o of e)s.has(o.id)||n.push(o);return sa=Object.freeze(n),sa}function Qn(t){let e=ft(t,"");return xn().find(r=>r.id===e)||null}function fn(t={}){let e=new Date().toISOString(),r=Vs({...t,id:ft(t.id,Dg()),updatedAt:e,createdAt:ft(t.createdAt,e)}),s=ts().filter(o=>o.id!==r.id);return s.push(r),Ys.set(Ed,s),Bg(),{success:!0,template:r}}function Cd(t){let e=ft(t,"");if(!e||e===It)return{success:!1,error:"\u5185\u7F6E\u6A21\u677F\u4E0D\u80FD\u5220\u9664\u3002"};let r=ts().filter(n=>n.id!==e);return Ys.set(Ed,r),Bg(),TS()===e&&kd(It),{success:!0}}function Kg(t,e){let r=ft(t,"");if(!r||r===It)return{success:!1,error:"\u5185\u7F6E\u6A21\u677F\u4E0D\u80FD\u91CD\u547D\u540D\u3002"};let n=ft(e,"");if(!n)return{success:!1,error:"\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A\u3002"};let s=Qn(r);return s?fn({...s,name:n}):{success:!1,error:"\u6A21\u677F\u4E0D\u5B58\u5728\u3002"}}function Li(){return{version:1,exportedAt:new Date().toISOString(),templates:ts()}}function jg(t,{overwrite:e=!1}={}){let r;if(Array.isArray(t))r=t;else if(t&&typeof t=="object")Array.isArray(t.templates)?r=t.templates:t.template&&typeof t.template=="object"?r=[t.template]:r=[t];else return{success:!1,imported:0,skipped:0,errors:["\u65E0\u6548\u7684\u5BFC\u5165\u6570\u636E\u683C\u5F0F\u3002"]};Ot().info("importTemplates \u5F00\u59CB",{rawListCount:r.length,overwrite:e});let n=new Set(ts().map(i=>i.id)),s=0,o=0,a=[];for(let i of r)try{let l=Vs(i);if(Ot().info("importTemplates \u5355\u6761",{id:l.id,name:l.name,tableCount:Array.isArray(l.tables)?l.tables.length:0,firstTableName:l.tables?.[0]?.name||""}),!e&&n.has(l.id)){o++;continue}fn(l),n.add(l.id),s++}catch(l){a.push(ft(l?.message,"\u672A\u77E5\u9519\u8BEF")),Ot().error("importTemplates \u5355\u6761\u5931\u8D25",l)}return Ot().info("importTemplates \u5B8C\u6210",{imported:s,skipped:o,errorCount:a.length}),{success:!0,imported:s,skipped:o,errors:a}}function TS(){let t=Ys.get(Ad,""),e=ft(t,It);return Qn(e)?e:It}function kd(t){let e=ft(t,It);return Ys.set(Ad,e),Ot().info("\u5168\u5C40\u6FC0\u6D3B\u6A21\u677F\u5DF2\u5207\u6362",{templateId:e}),e}function bn(){let t=Ys.get(Ad,""),e=ft(t,It),r=Qn(e);return r||zg()[0]}function _S(t){try{return JSON.stringify(t)}catch(e){return Ot().error("templateToString \u5931\u8D25",e),""}}function ES(t){if(!t||typeof t!="string")return null;try{let e=JSON.parse(t);return Vs(e)}catch(e){return Ot().warn("templateFromString \u53CD\u5E8F\u5217\u5316\u5931\u8D25",e),null}}function Js({chatId:t,isolationKey:e}={}){let r=e===void 0?ue.getKey():e,n=Rr.getTemplateScope(r,t);if(!n||n.mode===rt.INHERIT_GLOBAL){let o=bn();return Ot().debug("resolveActiveTemplate: inherit_global",{chatId:t,isolationKey:r,templateId:o?.id||"",templateName:o?.name||"",tableCount:Array.isArray(o?.tables)?o.tables.length:0,firstTableName:o?.tables?.[0]?.name||""}),{template:o,mode:rt.INHERIT_GLOBAL,source:{templateId:o?.id||""}}}if(n.mode===rt.CHAT_OVERRIDE){let o=ES(n.templateStr);if(o)return{template:o,mode:rt.CHAT_OVERRIDE,source:{}};Ot().warn("chat_override templateStr \u53CD\u5E8F\u5217\u5316\u5931\u8D25\uFF0C\u964D\u7EA7\u5230 inherit_global");let a=bn();return{template:a,mode:rt.INHERIT_GLOBAL,source:{templateId:a?.id||"",fallback:!0}}}if(n.mode===rt.PRESET_LINK){let o=n.presetName||"",a=xn(),i=a.find(d=>d.name===o)||a.find(d=>d.id===o);if(i)return{template:i,mode:rt.PRESET_LINK,source:{presetName:o,templateId:i.id}};Ot().warn("preset_link \u6307\u5411\u7684\u5168\u5C40\u9884\u8BBE\u4E0D\u5B58\u5728\uFF0C\u964D\u7EA7\u5230 inherit_global",{presetName:o});let l=bn();return{template:l,mode:rt.INHERIT_GLOBAL,source:{templateId:l?.id||"",presetName:o,fallback:!0}}}let s=bn();return{template:s,mode:rt.INHERIT_GLOBAL,source:{templateId:s?.id||"",unknownMode:n.mode}}}function Ug(t,e={}){if(!t||typeof t!="object")return{success:!1,error:"\u6A21\u677F\u4E0D\u80FD\u4E3A\u7A7A"};let r=Vs(t),n=e.isolationKey===void 0?ue.getKey():e.isolationKey;Rr.archiveCurrentTemplate(n,e.chatId);let s=Rr.setTemplateScope({mode:rt.CHAT_OVERRIDE,templateStr:_S(r),source:e.source||"ui"},n,e.chatId);return Ot().info("applyTemplateAsChatOverride",{chatId:e.chatId,isolationKey:n,templateName:r.name}),{success:!0,scopeState:s}}function Fg(t,e={}){let r=ft(t,"");if(!r)return{success:!1,error:"presetName \u4E0D\u80FD\u4E3A\u7A7A"};let n=xn(),s=n.find(i=>i.name===r)||n.find(i=>i.id===r);if(!s)return{success:!1,error:"\u627E\u4E0D\u5230\u6307\u5B9A\u7684\u5168\u5C40\u9884\u8BBE"};let o=e.isolationKey===void 0?ue.getKey():e.isolationKey;Rr.archiveCurrentTemplate(o,e.chatId);let a=Rr.setTemplateScope({mode:rt.PRESET_LINK,presetName:s.name,source:e.source||"ui"},o,e.chatId);return Ot().info("linkPresetToChat",{chatId:e.chatId,isolationKey:o,presetName:s.name}),{success:!0,scopeState:a}}function Wg(t={}){let e=t.isolationKey===void 0?ue.getKey():t.isolationKey;return t.archive!==!1&&Rr.archiveCurrentTemplate(e,t.chatId),Rr.clearTemplateScope(e,t.chatId),Ot().info("resetChatTemplateScope",{chatId:t.chatId,isolationKey:e}),{success:!0}}function Hg(t={}){let e=t.isolationKey===void 0?ue.getKey():t.isolationKey;return Rr.listTemplateArchives(e,t.chatId)}function qg(t,e={}){let r=e.isolationKey===void 0?ue.getKey():e.isolationKey,n=Rr.restoreTemplateArchive(t,r,e.chatId);return n?{success:!0,scopeState:n}:{success:!1,error:"\u5F52\u6863\u4E0D\u5B58\u5728"}}var Ys,Ed,Ad,_d,sa,js=O(()=>{Ve();J();nr();Fe();Ag();jr();Og();Ys=U.namespace("tableWorkbenchTemplates"),Ed="templates",Ad="activeId";sa=null});var Vg={};ge(Vg,{TableTemplatePanel:()=>Yg,default:()=>RS});function Id(t){return t===It}function kS(t,{onChange:e,readonly:r}){let n=f("div",{style:{display:"flex",flexDirection:"column",gap:"12px"}});Q(n,Ft({label:"\u63CF\u8FF0",control:ve({value:t.description||"",placeholder:"\u53EF\u9009 \u2014 \u5907\u6CE8\u7528\u9014",disabled:r,onChange:a=>e({description:a})})})),Q(n,f("div",{text:"\u586B\u8868\u63D0\u793A\u8BCD\u6A21\u677F",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}})),Q(n,f("div",{text:"\u53EF\u4F7F\u7528\u5B8F\uFF1A{{tableData}} {{lastUserMessage}} {{lastAiMessage}} {{toolWorldbookContent}} \u7B49\u3002\u7559\u7A7A\u4F7F\u7528\u9ED8\u8BA4\u6A21\u677F\u3002",style:{fontSize:"11px",color:"var(--yyt-text-muted)",lineHeight:"1.6",marginBottom:"4px"}}));let s=f("textarea",{className:"yyt-textarea",attrs:{rows:"8",placeholder:"\u53EF\u9009 \u2014 \u81EA\u5B9A\u4E49\u586B\u8868\u63D0\u793A\u8BCD",disabled:r?"disabled":null},style:{width:"100%",resize:"vertical",fontFamily:"ui-monospace, monospace",fontSize:"12px"}});s.value=t.promptTemplate||"",s.addEventListener("change",()=>{r||e({promptTemplate:s.value})}),Q(n,s),Q(n,f("div",{text:`\u8868\u683C\u7ED3\u6784\uFF08${(t.tables||[]).length} \u5F20\u8868\uFF09`,style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)",marginTop:"6px"}})),Q(n,f("div",{text:"\u672C\u9762\u677F\u53EA\u5C55\u793A\u8868\u7ED3\u6784 JSON\u3002\u590D\u6742 schema \u7F16\u8F91\uFF08\u589E\u5220\u8868\u3001\u5217\u5B9A\u4E49\u3001\u9ED8\u8BA4\u884C\uFF09\u5C06\u5728\u586B\u8868\u5DE5\u4F5C\u53F0\u4E2D\u63D0\u4F9B\u3002",style:{fontSize:"11px",color:"var(--yyt-text-muted)",lineHeight:"1.6",marginBottom:"4px"}}));let o=f("pre",{style:{padding:"10px 12px",background:"var(--yyt-bg-base)",border:"1px solid var(--yyt-border)",borderRadius:"var(--yyt-radius-sm, 6px)",fontFamily:"ui-monospace, monospace",fontSize:"11px",lineHeight:"1.6",color:"var(--yyt-text-secondary)",maxHeight:"260px",overflow:"auto",whiteSpace:"pre",margin:"0"}});try{o.textContent=JSON.stringify(t.tables||[],null,2)}catch{o.textContent="// \u65E0\u6CD5\u5E8F\u5217\u5316"}return Q(n,o),n}function IS(t){let r=[`${(t.tables||[]).length} \u5F20\u8868`];return t.promptTemplate&&r.push("\u81EA\u5B9A\u4E49\u6A21\u677F"),r}var AS,Gg,CS,Yg,RS,Jg=O(()=>{Wt();js();nr();J();No();AS=N.createScope("TableTemplatePanel"),Gg="";CS={listPresets(){return xn().map(t=>({id:Id(t.id)?`builtin_table_${t.id}`:t.id,name:t.name,description:t.description||"",promptTemplate:t.promptTemplate||"",tables:t.tables||[],_rawId:t.id,createdAt:t.createdAt,updatedAt:t.updatedAt}))},getPreset(t){if(!t)return null;let e=t.startsWith("builtin_table_")?t.slice(14):t,r=Qn(e);return r?{id:Id(r.id)?`builtin_table_${r.id}`:r.id,name:r.name,description:r.description||"",promptTemplate:r.promptTemplate||"",tables:r.tables||[],_rawId:r.id,createdAt:r.createdAt,updatedAt:r.updatedAt}:null},getCurrentPresetId(){return Gg||""},setCurrentPresetId(t){return Gg=t||"",!0},createPreset(t){let e=String(t?.name||"").trim()||"\u65B0\u5EFA\u6A21\u677F",r=fn({name:e,description:t?.description||"",promptTemplate:t?.promptTemplate||"",tables:Array.isArray(t?.tables)?t.tables:[]});return r?.success?{id:r.template.id,...r.template,_rawId:r.template.id}:null},updatePreset(t,e){if(!t)return null;let r=t.startsWith("builtin_table_")?t.slice(14):t;if(Id(r))return AS.warn("\u62D2\u7EDD\u4FEE\u6539\u5185\u7F6E\u8868\u683C\u6A21\u677F"),null;let n=Qn(r);if(!n)return null;let s=fn({...n,...e,id:r});return s?.success?{id:s.template.id,...s.template,_rawId:s.template.id}:null},deletePreset(t){if(!t)return!1;let e=t.startsWith("builtin_table_")?t.slice(14):t;return!!Cd(e)?.success},duplicatePreset(t,e={}){let r=this.getPreset(t);if(!r)return null;let n=e.nameSuffix||" \u526F\u672C";return this.createPreset({name:`${r.name}${n}`,description:r.description,promptTemplate:r.promptTemplate,tables:r.tables})},renamePreset(t,e){if(!t||!e)return null;let r=t.startsWith("builtin_table_")?t.slice(14):t,n=Kg(r,e);return n?.success?this.getPreset(n.template?.id||r):null},exportAll(){return Li()},importPresets(t){let e=jg(t,{overwrite:!1});return{added:e?.imported||0,skipped:e?.skipped||0}},resetAll(){let t=ts();for(let e of t)try{Cd(e.id)}catch{}}};Yg=Zr({id:"tableTemplatePanel",kind:"table",panelTitle:"\u8868\u683C\u6A21\u677F",panelHint:"\u7BA1\u7406\u586B\u8868\u5DE5\u4F5C\u53F0\u7684\u8868\u683C\u7ED3\u6784\u6A21\u677F\u3002\u5728\u586B\u8868\u9762\u677F\u9876\u90E8\u5DE5\u5177\u680F\u53EF\u5FEB\u901F\u52A0\u8F7D/\u4FDD\u5B58\u5F53\u524D\u6A21\u677F\u3002",store:CS,renderEditor:kS,renderListItemMeta:IS}),RS=Yg});var Qg={};ge(Qg,{ToolManagePanel:()=>Xg,default:()=>MS});var Vt,Xg,MS,Zg=O(()=>{ut();J();Fo();Ar();Vt=N.createScope("ToolManagePanel"),Xg={id:"toolManagePanel",_removeDialog(t){if(!t?.length)return;let e=t.find("#yyt-tool-dialog-overlay");Ut(e,"yytToolManageDialogSelect"),e.remove()},_getToolkitWindow(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window},_openToolConfig(t){if(!t)return;let r=this._getToolkitWindow()?.YouYouToolkit||window.YouYouToolkit;if(!r){Vt.warn("\u672A\u627E\u5230\u5DE5\u5177\u7BB1\u5B9E\u4F8B\uFF0C\u65E0\u6CD5\u8DF3\u8F6C\u5230\u5DE5\u5177\u914D\u7F6E",null,{toast:!0});return}r.switchMainTab("tools"),r.switchSubTab("tools",t)},render(t){let e=Tr(),r=Object.entries(e),n=r.filter(([,s])=>s?.enabled!==!1).length;return`
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
            ${me(s.name)}
            <span class="yyt-badge" style="background: var(--yyt-accent-soft); color: var(--yyt-accent); margin-left: 6px;">${me(s.category)}</span>
          </div>
          <div class="yyt-list-row-desc">${me(s.description)}</div>
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
      `},bindEvents(t,e){let r=ce();!r||!ze(t)||(t.off(".yytToolManage"),this._bindToolEvents(t,r),this._bindFileEvents(t,r))},_bindToolEvents(t,e){t.on("change.yytToolManage",".yyt-tool-toggle input",r=>{let n=e(r.currentTarget).closest(".yyt-list-row"),s=n.data("tool-id"),o=e(r.currentTarget).is(":checked");ui(s,o),n.toggleClass("yyt-tool-item-enabled",o).toggleClass("yyt-tool-item-disabled",!o),n.find(".yyt-status-dot").toggleClass("yyt-status-dot-on",o).toggleClass("yyt-status-dot-off",!o),Vt.info(o?"\u5DE5\u5177\u5DF2\u542F\u7528":"\u5DE5\u5177\u5DF2\u7981\u7528",null,{toast:!0})}),t.on("click.yytToolManage","#yyt-add-tool",()=>{this._showToolEditDialog(t,e,null)}),t.on("click.yytToolManage",'.yyt-list-row [data-action="config"]',r=>{let n=e(r.currentTarget).closest(".yyt-list-row").data("tool-id");this._openToolConfig(n)}),t.on("click.yytToolManage",'.yyt-list-row [data-action="edit"]',r=>{let n=e(r.currentTarget).closest(".yyt-list-row").data("tool-id");this._showToolEditDialog(t,e,n)}),t.on("click.yytToolManage",'.yyt-list-row [data-action="delete"]',async r=>{let n=e(r.currentTarget).closest(".yyt-list-row").data("tool-id"),s=_r(n);if(!n||!s||!await Lr("\u5220\u9664\u5DE5\u5177",`\u786E\u5B9A\u8981\u5220\u9664\u5DE5\u5177"${s.name}"\u5417\uFF1F`,{danger:!0}))return;if(!Is(n)){Vt.error("\u5220\u9664\u5931\u8D25",null,{toast:!0});return}this.renderTo(t),Vt.info("\u5DE5\u5177\u5DF2\u5220\u9664",null,{toast:"success"})})},_bindFileEvents(t,e){t.on("click.yytToolManage","#yyt-import-tools",()=>{t.find("#yyt-import-tools-file").click()}),t.on("change.yytToolManage","#yyt-import-tools-file",async r=>{let n=r.target.files[0];if(n){try{let s=await _o(n),o=Ms(s,{overwrite:!1});o.success?Vt.info(o.message,null,{toast:"success"}):Vt.error(o.message,null,{toast:!0}),o.success&&this.renderTo(t)}catch(s){Vt.error(`\u5BFC\u5165\u5931\u8D25: ${s.message}`,null,{toast:!0})}e(r.target).val("")}}),t.on("click.yytToolManage","#yyt-export-tools",()=>{try{let r=Rs();To(r,`youyou_toolkit_tools_${Date.now()}.json`),Vt.info("\u5DE5\u5177\u5DF2\u5BFC\u51FA",null,{toast:"success"})}catch(r){Vt.error(`\u5BFC\u51FA\u5931\u8D25: ${r.message}`,null,{toast:!0})}}),t.on("click.yytToolManage","#yyt-reset-tools",async()=>{await Lr("\u91CD\u7F6E\u5DE5\u5177","\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u5DE5\u5177\u5417\uFF1F",{danger:!0})&&(Ps(),this.renderTo(t),Vt.info("\u5DE5\u5177\u5DF2\u91CD\u7F6E",null,{toast:!0}))})},_showToolEditDialog(t,e,r){let n=r?_r(r):null,s=!!n,o=`
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
                       value="${n?me(n.name):""}" placeholder="\u5DE5\u5177\u540D\u79F0">
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
                     value="${n?me(n.description||""):""}" placeholder="\u5DE5\u5177\u63CF\u8FF0">
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
    `;this._removeDialog(t),t.append(o);let a=t.find("#yyt-tool-dialog-overlay"),i=a.find("#yyt-tool-name"),l=a.find("#yyt-tool-category"),d=a.find("#yyt-tool-desc"),c=a.find("#yyt-tool-timeout"),u=a.find("#yyt-tool-retries");br(a,{namespace:"yytToolManageDialogSelect",selectors:["#yyt-tool-category"]});let y=()=>{Ut(a,"yytToolManageDialogSelect"),a.remove()};a.find("#yyt-tool-dialog-close, #yyt-tool-dialog-cancel").on("click",y),a.on("click",function(p){p.target===this&&y()}),a.find("#yyt-tool-dialog-save").on("click",()=>{let p=i.val().trim(),g=l.val(),m=d.val().trim(),h=parseInt(c.val())||6e4,b=parseInt(u.val())||3;if(!p){Vt.warn("\u8BF7\u8F93\u5165\u5DE5\u5177\u540D\u79F0",null,{toast:!0}),i.trigger("focus").trigger("select");return}let x=r||`tool_${Date.now()}`;if(!ks(x,{name:p,category:g,description:m,promptTemplate:n?.promptTemplate||"",extractTags:Array.isArray(n?.extractTags)?n.extractTags:[],config:{execution:{timeout:h,retries:b},api:n?.config?.api||{preset:"",useBypass:!1,bypassPreset:""},messages:Array.isArray(n?.config?.messages)?n.config.messages:[],context:{depth:n?.config?.context?.depth||3,includeTags:Array.isArray(n?.config?.context?.includeTags)?n.config.context.includeTags:[],excludeTags:Array.isArray(n?.config?.context?.excludeTags)?n.config.context.excludeTags:[]},worldbooks:{enabled:n?.config?.worldbooks?.enabled===!0,selected:Array.isArray(n?.config?.worldbooks?.selected)?n.config.worldbooks.selected:[]}},enabled:n?.enabled!==!1})){Vt.error(s?"\u5DE5\u5177\u66F4\u65B0\u5931\u8D25":"\u5DE5\u5177\u521B\u5EFA\u5931\u8D25",null,{toast:!0});return}$s(x),y(),this.renderTo(t),Vt.info(s?"\u5DE5\u5177\u5DF2\u66F4\u65B0":"\u5DE5\u5177\u5DF2\u521B\u5EFA",null,{toast:"success"}),s||this._openToolConfig(x)})},destroy(t){!ce()||!ze(t)||(this._removeDialog(t),t.off(".yytToolManage"))},getStyles(){return`
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
    `},renderTo(t){let e=this.render({});t.html(e),this.bindEvents(t,{})}},MS=Xg});var tm={};ge(tm,{BypassManager:()=>Di,DEFAULT_BYPASS_PRESETS:()=>Hr,addMessage:()=>qS,buildBypassMessages:()=>XS,bypassManager:()=>be,createPreset:()=>zS,default:()=>QS,deleteMessage:()=>YS,deletePreset:()=>jS,duplicatePreset:()=>US,exportPresets:()=>VS,getAllPresets:()=>DS,getDefaultPresetId:()=>FS,getEnabledMessages:()=>HS,getPreset:()=>BS,getPresetList:()=>oa,importPresets:()=>JS,setDefaultPresetId:()=>WS,updateMessage:()=>GS,updatePreset:()=>KS});function em(t){let e=String(t||"").trim().toLowerCase();return e==="system"?"SYSTEM":e==="assistant"||e==="ai"?"assistant":"USER"}function $S(t){return t&&typeof t=="object"&&typeof t.content=="string"&&!t.name&&!Array.isArray(t.messages)}function LS(t){return String(t||"").replace(/\$0/g,"{{toolContentMacro}}").replace(/\$1/g,"{{rawRecentMessagesText}}").replace(/\$4/g,"{{toolWorldbookContent}}").replace(/\$8/g,"{{userMessage}}").replace(/\$C/g,"{{characterCard}}")}function OS(t,e,r){let n=t.mainSlot||(t.isMain?"A":t.isMain2?"B":"");return{id:typeof t.id=="string"&&t.id.trim()?t.id.trim():`${r}_msg_${e+1}`,role:em(t.role),content:LS(t.content),enabled:t.enabled!==!1,deletable:t.deletable!==!1,...n?{mainSlot:n,isMain:n==="A",isMain2:n==="B"}:{}}}var Oi,Wr,Xs,Rd,PS,Hr,NS,Di,be,DS,oa,BS,zS,KS,jS,US,FS,WS,HS,qS,GS,YS,VS,JS,XS,QS,Qs=O(()=>{Ve();ct();J();Oi=N.createScope("BypassManager"),Wr="bypass_presets",Xs="default_bypass_preset",Rd="current_bypass_preset",PS=Object.freeze([{id:"table_fill_default_msg_1",role:"SYSTEM",content:"\u4F60\u662F\u4E00\u4E2A\u52A9\u624B\uFF0C\u8D1F\u8D23\u542C\u4ECE\u7528\u6237\u7684\u6307\u4EE4\u5B8C\u6210\u4F60\u7684\u5DE5\u4F5C",enabled:!0,deletable:!0},{id:"table_fill_default_msg_2",role:"assistant",content:"\u6536\u5230\uFF0C\u6211\u5C06\u5145\u5206\u63CF\u7ED8\u7528\u6237\u7684\u610F\u5FD7\uFF0C\u6BEB\u4E0D\u5077\u61D2\uFF0C\u5E76\u4E14\u6211\u4E00\u5B9A\u4F1A\u9075\u7167\u7528\u6237\u7684\u8981\u6C42",enabled:!0,deletable:!0},{id:"table_fill_default_msg_3",role:"USER",content:`\u4EE5\u4E0B\u662F\u4F60\u53EF\u80FD\u9700\u8981\u7528\u5230\u7684\u80CC\u666F\u8BBE\u5B9A\uFF0C\u6CE8\u610F\u4F60\u53EA\u9700\u8981\u5176\u4E2D\u5173\u4E8E\u5267\u60C5\u4EE5\u53CA\u4EBA\u8BBE\u65B9\u9762\u7684\u6570\u636E\uFF0C\u4E0D\u9700\u8981\u601D\u8003\u91CC\u8FB9\u9664\u6B64\u4E4B\u5916\u7684\u4EFB\u4F55\u683C\u5F0F\u6216\u8005\u601D\u7EF4\u94FE\u65B9\u9762\u7684\u8981\u6C42\uFF1A
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

{{userMessage}}`,enabled:!0,deletable:!1,mainSlot:"B",isMain2:!0},{id:"table_fill_default_msg_8",role:"assistant",content:"\u6536\u5230\u6307\u4EE4\uFF0C\u6211\u5C06\u4E00\u6B65\u4E00\u6B65\u5F00\u59CB\u601D\u8003\uFF0C\u5E76\u5B8C\u6210\u586B\u8868\uFF0C\u9996\u5148\u6211\u8981\u5206\u6790\u5F53\u524D\u8F6E\u6B21\u7684\u5267\u60C5\u53D8\u5316\u3002",enabled:!0,deletable:!0}]),Hr={table_workbench_fill_default:{id:"table_workbench_fill_default",name:"\u9ED8\u8BA4\u586B\u8868 Ai \u6307\u4EE4\u9884\u8BBE",description:"\u7528\u4E8E\u586B\u8868\u5DE5\u4F5C\u53F0\u7684\u5185\u7F6E Ai \u6307\u4EE4\u9884\u8BBE\uFF0C\u53EF\u590D\u5236\u540E\u6309\u9700\u7F16\u8F91\u3002",enabled:!0,messages:PS.map(t=>({...t})),createdAt:0,updatedAt:0}},NS=new Set(["\u6807\u51C6\u7834\u9650\u8BCD","\u589E\u5F3A\u7834\u9650"]);Di=class{constructor(){this._cache=null,this._migrated=!1,this.debugMode=!1}getAllPresets(){if(this._migrateLegacyData(),this._cache)return this._cache;let e=U.get(Wr,{});return this._cache={...Hr,...e},this._cache}getPresetList(){let e=this.getAllPresets();return Object.values(e).sort((r,n)=>(n.updatedAt||0)-(r.updatedAt||0))}getPreset(e){return e&&this.getAllPresets()[e]||null}presetExists(e){return!!this.getPreset(e)}createPreset(e){let{id:r,name:n,description:s,messages:o}=e;if(!r||typeof r!="string"||!r.trim())return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};if(!n||typeof n!="string"||!n.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let a=r.trim();if(this.presetExists(a))return{success:!1,message:`\u9884\u8BBE "${a}" \u5DF2\u5B58\u5728`};let i={id:a,name:n.trim(),description:s||"",enabled:!0,messages:o||[],createdAt:Date.now(),updatedAt:Date.now()};return this._savePreset(a,i),G.emit(W.BYPASS_PRESET_CREATED,{presetId:a,preset:i}),Oi.info(`\u9884\u8BBE\u5DF2\u521B\u5EFA: ${a}`),{success:!0,message:`\u9884\u8BBE "${n}" \u521B\u5EFA\u6210\u529F`,preset:i}}updatePreset(e,r){if(!e)return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};let n=this.getPreset(e);if(!n)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};if(r.id&&r.id!==e)return{success:!1,message:"\u4E0D\u5141\u8BB8\u4FEE\u6539\u9884\u8BBEID"};let s={...n,...r,id:e,updatedAt:Date.now()};return this._savePreset(e,s),G.emit(W.BYPASS_PRESET_UPDATED,{presetId:e,preset:s}),Oi.info(`\u9884\u8BBE\u5DF2\u66F4\u65B0: ${e}`),{success:!0,message:`\u9884\u8BBE "${n.name}" \u66F4\u65B0\u6210\u529F`,preset:s}}deletePreset(e){if(!e)return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};if(Hr[e])return{success:!1,message:"\u4E0D\u5141\u8BB8\u5220\u9664\u9ED8\u8BA4\u9884\u8BBE"};let r=this.getPreset(e);if(!r)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let n=U.get(Wr,{});return delete n[e],U.set(Wr,n),this._cache=null,this.getDefaultPresetId()===e&&this.setDefaultPresetId(null),G.emit(W.BYPASS_PRESET_DELETED,{presetId:e}),Oi.info(`\u9884\u8BBE\u5DF2\u5220\u9664: ${e}`),{success:!0,message:`\u9884\u8BBE "${r.name}" \u5DF2\u5220\u9664`}}duplicatePreset(e,r,n){let s=this.getPreset(e);if(!s)return{success:!1,message:`\u6E90\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};if((!r||!r.trim())&&(r=`${e}_copy_${Date.now()}`),this.presetExists(r))return{success:!1,message:`\u9884\u8BBE "${r}" \u5DF2\u5B58\u5728`};let o={...JSON.parse(JSON.stringify(s)),id:r.trim(),name:n||`${s.name} (\u526F\u672C)`,createdAt:Date.now(),updatedAt:Date.now()};return this._savePreset(r.trim(),o),G.emit(W.BYPASS_PRESET_CREATED,{presetId:r,preset:o}),{success:!0,message:`\u9884\u8BBE\u5DF2\u590D\u5236\u4E3A "${o.name}"`,preset:o}}addMessage(e,r){let n=this.getPreset(e);if(!n)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let s={id:`msg_${Date.now()}`,role:em(r.role||"SYSTEM"),content:r.content||"",enabled:r.enabled!==!1,deletable:r.deletable!==!1,...r.mainSlot?{mainSlot:r.mainSlot}:{}},o=[...n.messages||[],s];return this.updatePreset(e,{messages:o})}updateMessage(e,r,n){let s=this.getPreset(e);if(!s)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let o=s.messages||[],a=o.findIndex(l=>l.id===r);if(a===-1)return{success:!1,message:`\u6D88\u606F "${r}" \u4E0D\u5B58\u5728`};let i=[...o];return i[a]={...i[a],...n},this.updatePreset(e,{messages:i})}deleteMessage(e,r){let n=this.getPreset(e);if(!n)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let s=n.messages||[],o=s.find(i=>i.id===r);if(!o)return{success:!1,message:`\u6D88\u606F "${r}" \u4E0D\u5B58\u5728`};if(o.deletable===!1)return{success:!1,message:"\u8BE5\u6D88\u606F\u4E0D\u53EF\u5220\u9664"};let a=s.filter(i=>i.id!==r);return this.updatePreset(e,{messages:a})}getEnabledMessages(e){let r=this.getPreset(e);return!r||!r.enabled?[]:(r.messages||[]).filter(n=>n.enabled!==!1)}getDefaultPresetId(){this._migrateLegacyData();let e=U.get(Xs,null);return e==="undefined"||e==="null"||e===""?(U.remove(Xs),null):e}setDefaultPresetId(e){return e&&!this.presetExists(e)?!1:(U.set(Xs,e),G.emit(W.BYPASS_PRESET_ACTIVATED,{presetId:e}),Oi.info(`\u9ED8\u8BA4\u9884\u8BBE\u5DF2\u8BBE\u7F6E: ${e}`),!0)}getDefaultPreset(){let e=this.getDefaultPresetId();return e?this.getPreset(e):null}exportPresets(e=null){if(e){let n=this.getPreset(e);if(!n)throw new Error(`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`);return JSON.stringify(n,null,2)}let r=this.getAllPresets();return JSON.stringify({version:"1.0.0",exportedAt:new Date().toISOString(),presets:Object.values(r)},null,2)}importPresets(e,r={}){let{overwrite:n=!1,name:s=""}=r,o;try{o=JSON.parse(e)}catch{return{success:!1,message:"JSON\u89E3\u6790\u5931\u8D25",imported:0}}let a=U.get(Wr,{}),l=Array.isArray(o)&&o.every($S)?[{id:this._generatePresetId(s||"\u5BFC\u5165\u586B\u8868\u6307\u4EE4\u9884\u8BBE",a),name:s||"\u5BFC\u5165\u586B\u8868\u6307\u4EE4\u9884\u8BBE",description:"\u7531\u5916\u90E8\u586B\u8868\u63D0\u793A\u8BCD\u7EC4\u5BFC\u5165\u3002",enabled:!0,messages:o}]:Array.isArray(o)?o:o.presets?o.presets:[o];if(l.length===0)return{success:!1,message:"\u6CA1\u6709\u627E\u5230\u6709\u6548\u7684\u9884\u8BBE\u6570\u636E",imported:0};let d=0;for(let c of l){let u=this._normalizePreset(c?.id,c,a);u&&(Hr[u.id]&&!n||!n&&a[u.id]||(a[u.id]={...u,updatedAt:Date.now()},d++))}return d>0&&(U.set(Wr,a),this._cache=null),{success:!0,message:`\u6210\u529F\u5BFC\u5165 ${d} \u4E2A\u9884\u8BBE`,imported:d}}getToolBypassPreset(e){if(!e?.bypass?.enabled)return null;let r=e?.bypass?.presetId;return r?this.getPreset(r):this.getDefaultPreset()}buildBypassMessages(e){let r=this.getToolBypassPreset(e);return r?this.getEnabledMessages(r.id):[]}_savePreset(e,r){let n=U.get(Wr,{});n[e]=r,U.set(Wr,n),this._cache=null}_migrateLegacyData(){if(this._migrated)return;let e=U.get(Wr,{}),r={},n=!1,s=Array.isArray(e)?e.map((o,a)=>[o?.id||o?.name||`legacy_${a}`,o]):Object.entries(e||{});for(let[o,a]of s){let i=this._normalizePreset(o,a,r);if(!i){n=!0;continue}r[i.id]=i,(!e?.[i.id]||e?.[i.id]?.id!==i.id)&&(n=!0)}n&&U.set(Wr,r),this._migrateDefaultPreset(r),this._cache=null,this._migrated=!0}_normalizePreset(e,r,n={}){if(!r||typeof r!="object")return null;let s=typeof r.name=="string"?r.name.trim():"",o=typeof r.id=="string"?r.id.trim():"",a=typeof e=="string"?e.trim():"";if(!s&&a&&a!=="undefined"&&a!=="null"&&(s=a),this._isLegacySamplePreset(s,o)||(!o&&a&&a!=="undefined"&&a!=="null"&&(o=a),!o&&s&&s!=="undefined"&&s!=="null"&&(o=this._generatePresetId(s,n)),!s||!o||o==="undefined"||s==="undefined"))return null;let l=Array.isArray(r.messages)?r.messages.filter(d=>d&&typeof d=="object").map((d,c)=>OS(d,c,o)):[];return{...r,id:o,name:s,description:typeof r.description=="string"?r.description:"",enabled:r.enabled!==!1,messages:l,createdAt:r.createdAt||Date.now(),updatedAt:r.updatedAt||Date.now()}}_migrateDefaultPreset(e){let r=U.get(Xs,null),n=U.get(Rd,null),s=r??n;(s==="undefined"||s==="null"||s==="")&&(s=null),s&&!e[s]&&(s=Object.values(e).find(a=>a.name===s)?.id||null),s?U.set(Xs,s):U.remove(Xs),U.has(Rd)&&U.remove(Rd)}_isLegacySamplePreset(e,r=""){return e?r==="standard"||r==="enhanced"||r==="jailbreak"||NS.has(e)?!0:/^增强破限（副本）(?:\s*\(\d+\))?$/.test(e):!1}_generatePresetId(e,r={}){let n=String(e).trim().toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g,"_").replace(/^_+|_+$/g,"")||`bypass_${Date.now()}`,s=n,o=1;for(;r[s];)s=`${n}_${o++}`;return s}},be=new Di,DS=()=>be.getAllPresets(),oa=()=>be.getPresetList(),BS=t=>be.getPreset(t),zS=t=>be.createPreset(t),KS=(t,e)=>be.updatePreset(t,e),jS=t=>be.deletePreset(t),US=(t,e,r)=>be.duplicatePreset(t,e,r),FS=()=>be.getDefaultPresetId(),WS=t=>be.setDefaultPresetId(t),HS=t=>be.getEnabledMessages(t),qS=(t,e)=>be.addMessage(t,e),GS=(t,e,r)=>be.updateMessage(t,e,r),YS=(t,e)=>be.deleteMessage(t,e),VS=t=>be.exportPresets(t),JS=(t,e)=>be.importPresets(t,e),XS=t=>be.buildBypassMessages(t),QS=be});var rm={};ge(rm,{DEFAULT_SETTINGS:()=>aa,SettingsService:()=>zi,default:()=>ZS,settingsService:()=>St});var aa,Bi,zi,St,ZS,Zs=O(()=>{Ve();ct();aa={executor:{maxConcurrent:3,maxRetries:2,retryDelayMs:5e3,requestTimeoutMs:9e4,queueStrategy:"fifo"},automation:{settleMs:1200,cooldownMs:5e3,maxConcurrentSlots:1},debug:{enableDebugLog:!1,saveExecutionHistory:!0,showRuntimeBadge:!0},ui:{compactMode:!1,animationEnabled:!0,theme:"dark-blue",startupScreenDismissed:!1}},Bi="settings_v2",zi=class{constructor(){this._cache=null}getSettings(){if(this._cache)return this._cache;let e=U.get(Bi,{}),r=this._migrateLegacy(e);return this._cache=this._mergeWithDefaults(r.settings),r.changed&&U.set(Bi,this._cache),this._cache}saveSettings(e){this._cache=this._mergeWithDefaults(e),U.set(Bi,this._cache),G.emit(W.SETTINGS_UPDATED,{settings:this._cache})}updateSettings(e){let r=this.getSettings(),n=this._deepMerge(r,e);this.saveSettings(n)}getExecutorSettings(){return this.getSettings().executor}updateExecutorSettings(e){this.updateSettings({executor:e})}getAutomationSettings(){return this.getSettings().automation}updateAutomationSettings(e){this.updateSettings({automation:e})}getDebugSettings(){return this.getSettings().debug}updateDebugSettings(e){this.updateSettings({debug:e})}getUiSettings(){return this.getSettings().ui}updateUiSettings(e){this.updateSettings({ui:e})}resetSettings(){this._cache=JSON.parse(JSON.stringify(aa)),U.set(Bi,this._cache),G.emit(W.SETTINGS_UPDATED,{settings:this._cache,reset:!0})}get(e,r=null){let n=this.getSettings(),s=e.split("."),o=n;for(let a of s)if(o&&typeof o=="object"&&a in o)o=o[a];else return r;return o}set(e,r){let n=JSON.parse(JSON.stringify(this.getSettings())),s=e.split("."),o=n;for(let a=0;a<s.length-1;a+=1){let i=s[a];i in o||(o[i]={}),o=o[i]}o[s[s.length-1]]=r,this.saveSettings(n)}_migrateLegacy(e){if(!e||typeof e!="object")return{settings:{},changed:!1};let r=!1,n=JSON.parse(JSON.stringify(e));return n.automation&&Object.prototype.hasOwnProperty.call(n.automation,"enabled")&&(delete n.automation.enabled,r=!0),{settings:n,changed:r}}_mergeWithDefaults(e){return this._deepMerge(JSON.parse(JSON.stringify(aa)),e)}_deepMerge(e,r){let n={...e};for(let s in r)r[s]&&typeof r[s]=="object"&&!Array.isArray(r[s])?n[s]=this._deepMerge(e[s]||{},r[s]):n[s]=r[s];return n}},St=new zi,ZS=St});var sm={};ge(sm,{ContextInjector:()=>Ui,DEFAULT_INJECTION_OPTIONS:()=>nm,WRITEBACK_METHODS:()=>pr,WRITEBACK_RESULT_STATUS:()=>ji,contextInjector:()=>Jt,default:()=>rT});function Md(t){return typeof t=="number"&&Number.isFinite(t)?String(t):typeof t=="string"&&t.trim()?t.trim():""}function rs(t,e){let r=String(e||"").trim();return r?Array.isArray(t)?(t.includes(r)||t.push(r),t):[r]:t}function Ki(t={}){if(t?.signal?.aborted)return"\u5DE5\u5177\u7ED3\u679C\u5DF2\u53D6\u6D88\uFF0C\u8DF3\u8FC7\u5199\u56DE";if(typeof t?.shouldAbortWriteback=="function")try{if(t.shouldAbortWriteback()===!0)return"\u5DE5\u5177\u7ED3\u679C\u5DF2\u8FC7\u671F\uFF0C\u8DF3\u8FC7\u5199\u56DE"}catch{return"\u5DE5\u5177\u7ED3\u679C\u5DF2\u8FC7\u671F\uFF0C\u8DF3\u8FC7\u5199\u56DE"}return""}var Tt,Dt,eo,nm,ji,pr,eT,tT,Ui,Jt,rT,ns=O(()=>{ct();J();zo();Tt=N.createScope("ContextInjector"),Dt="YouYouToolkit_toolOutputs",eo="YouYouToolkit_injectedContext",nm={overwrite:!0,enabled:!0};ji={SUCCESS:"success",FAILED:"failed"},pr={NONE:"none",LOCAL_ONLY:"local_only",SET_CHAT_MESSAGES:"setChatMessages",SET_CHAT_MESSAGE:"setChatMessage"},eT=60,tT=3;Ui=class{constructor(){this.debugMode=!1}async inject(e,r,n={}){return(await this.injectDetailed(e,r,n)).success}async injectDetailed(e,r,n={}){let s={...nm,...n},o=this._createWritebackResult(e,s);if(!e||r===void 0||r===null)return Tt.error("\u6CE8\u5165\u5931\u8D25: \u53C2\u6570\u65E0\u6548"),o.error="\u6CE8\u5165\u5931\u8D25: \u53C2\u6570\u65E0\u6548",o;if(!Md(s.sourceMessageId))return Tt.error("\u6CE8\u5165\u5931\u8D25: \u7F3A\u5C11 sourceMessageId"),o.error="\u6CE8\u5165\u5931\u8D25: \u7F3A\u5C11 sourceMessageId",o;if(s?.signal?.aborted)return o.error="\u5DE5\u5177\u7ED3\u679C\u5DF2\u53D6\u6D88\uFF0C\u8DF3\u8FC7\u5199\u56DE",o;if(typeof s?.shouldAbortWriteback=="function")try{if(s.shouldAbortWriteback()===!0)return o.error="\u5DE5\u5177\u7ED3\u679C\u5DF2\u8FC7\u671F\uFF0C\u8DF3\u8FC7\u5199\u56DE",o}catch{return o.error="\u5DE5\u5177\u7ED3\u679C\u5DF2\u8FC7\u671F\uFF0C\u8DF3\u8FC7\u5199\u56DE",o}let a=o.chatId,i={toolId:e,content:String(r),updatedAt:Date.now(),sourceMessageId:s.sourceMessageId||null,sourceSwipeId:s.sourceSwipeId||s.effectiveSwipeId||null,options:s};G.emit(W.TOOL_CONTEXT_INJECTED,{toolId:e,chatId:a,content:i.content,sourceMessageId:i.sourceMessageId,sourceSwipeId:i.sourceSwipeId,effectiveSwipeId:i.sourceSwipeId,slotBindingKey:s.slotBindingKey||"",slotRevisionKey:s.slotRevisionKey||"",slotTransactionId:s.slotTransactionId||"",traceId:s.traceId||"",sessionKey:s.sessionKey||"",options:s});let l=await this._insertToolOutputToBoundAssistantSlot(e,i,s,o);return l.success&&Tt.info(`\u6CE8\u5165\u6210\u529F: ${e} -> ${a}`,{inserted:l}),l}getAggregatedContext(e){return this.getLatestMessageInjectedContext()}getLatestMessageInjectedContext(e=null){try{let{chat:r}=this._getChatRuntime(),n=this._findAssistantMessageIndex(r,e);if(n<0)return"";let s=r[n]||{},o=s[eo];if(typeof o=="string"&&o.trim())return o.trim();let a=s[Dt];return a&&typeof a=="object"?this._buildMessageInjectedContext(a).trim():""}catch(r){return Tt.warn("\u8BFB\u53D6\u6700\u65B0 AI \u6D88\u606F injectedContext \u5931\u8D25",{error:r}),""}}_getLatestAssistantMessageOutputs(){try{let{chat:e}=this._getChatRuntime(),r=this._findAssistantMessageIndex(e,null);if(r<0)return{};let s=(e[r]||{})[Dt];return s&&typeof s=="object"?s:{}}catch(e){return Tt.warn("\u8BFB\u53D6\u6700\u65B0 AI \u6D88\u606F\u4E0A\u4E0B\u6587\u5931\u8D25",{error:e}),{}}}getToolContext(e,r){if(!r)return null;try{let{chat:n}=this._getChatRuntime(),s=this._findAssistantMessageIndex(n,null);return s<0?null:n[s]?.[Dt]?.[r]||null}catch{return null}}getAllToolContexts(e){return this._getLatestAssistantMessageOutputs()}async clearToolContext(e,r){if(!r)return!1;try{let{api:n,context:s,chat:o}=this._getChatRuntime(),a=this._findAssistantMessageIndex(o,null);if(a<0)return!1;let i=o[a],l=i?.[Dt];if(!l||!l[r])return!1;delete l[r],i[Dt]=l,i[eo]=this._buildMessageInjectedContext(l);let d=s?.saveChat||n?.saveChat||null;return typeof d=="function"&&await d.call(s||n),G.emit(W.TOOL_CONTEXT_CLEARED,{chatId:e||this._getCurrentChatId(),toolId:r}),!0}catch(n){return Tt.warn("\u6E05\u9664\u5DE5\u5177\u4E0A\u4E0B\u6587\u5931\u8D25",{error:n}),!1}}async clearAllContext(e){try{let{api:r,context:n,chat:s}=this._getChatRuntime(),o=this._findAssistantMessageIndex(s,null);if(o<0)return!1;let a=s[o];delete a[Dt],delete a[eo];let i=n?.saveChat||r?.saveChat||null;return typeof i=="function"&&await i.call(n||r),G.emit(W.TOOL_CONTEXT_CLEARED,{chatId:e||this._getCurrentChatId(),allTools:!0}),!0}catch(r){return Tt.warn("\u6E05\u9664\u6240\u6709\u5DE5\u5177\u4E0A\u4E0B\u6587\u5931\u8D25",{error:r}),!1}}clearAllChatsContexts(){Tt.info("\u6E05\u9664\u6240\u6709\u4E0A\u4E0B\u6587")}hasToolContext(e,r){return!!this.getToolContext(e,r)}getContextSummary(e){let r=this._getLatestAssistantMessageOutputs(),n=Object.entries(r).map(([s,o])=>({toolId:s,updatedAt:o.updatedAt,contentLength:o.content?.length||0}));return{chatId:e||this._getCurrentChatId(),tools:n,totalCount:n.length}}exportContext(e){return{chatId:e||this._getCurrentChatId(),contexts:this._getLatestAssistantMessageOutputs(),exportedAt:Date.now()}}importContext(e,r={}){return!1}_getChatRuntime(){try{let e=typeof window.parent<"u"&&window.parent!==window?window.parent:window,r=e.SillyTavern||null,n=r?.getContext?.()||null,s=Array.isArray(n?.chat)?n.chat:[],o=Array.isArray(r?.chat)?r.chat:[],a=s.length?s:o;return{topWindow:e,api:r,context:n,chat:a,contextChat:s,apiChat:o}}catch{return{topWindow:null,api:null,context:null,chat:[],contextChat:[],apiChat:[]}}}_createWritebackResult(e,r={}){let n=pr.SET_CHAT_MESSAGES;return{success:!1,toolId:e,chatId:this._getCurrentChatId(),traceId:r.traceId||"",sessionKey:r.sessionKey||"",sourceMessageId:r.sourceMessageId||null,sourceSwipeId:r.sourceSwipeId||r.effectiveSwipeId||null,effectiveSwipeId:r.effectiveSwipeId||r.sourceSwipeId||null,slotBindingKey:r.slotBindingKey||"",slotRevisionKey:r.slotRevisionKey||"",slotTransactionId:r.slotTransactionId||"",messageIndex:-1,textField:"",blockIdentity:null,hostUpdateMethod:pr.NONE,commit:{preferredMethod:n,attemptedMethods:[],appliedMethod:pr.NONE,fallbackUsed:!1,contentCommitted:!1,hostCommitApplied:!1},refresh:{requestMethods:[],requested:!1,confirmChecks:0,confirmed:!1,confirmedBy:"",eventSource:"",eventName:""},contentCommitted:!1,hostCommitApplied:!1,refreshRequested:!1,refreshConfirmed:!1,writebackStatus:ji.FAILED,replacedExistingBlock:!1,insertedNewBlock:!1,conflictDetected:!1,conflictReason:"",preservedOtherToolBlocks:!0,error:"",errors:[],steps:{foundTargetMessage:!1,contentCommitted:!1,localTextApplied:!1,runtimeSynced:!1,hostSetChatMessages:!1,hostSetChatMessage:!1,refreshForceSetChatMessage:!1,saveChatDebounced:!1,saveChat:!1,refreshRequested:!1,notifiedMessageUpdated:!1,verifiedAfterWrite:!1,refreshConfirmed:!1},verification:{textIncludesContent:!1,mirrorStored:!1,refreshConfirmed:!1}}}async _wait(e){await new Promise(r=>setTimeout(r,e))}_collectWritebackVerification(e,r,n,s,o,a=null){let i=e?.contextChat?.[n]||e?.apiChat?.[n]||r?.[n]||a||null,l=this._getWritableMessageField(i).text||"",d=i?.[Dt]?.[s],c=o?l.includes(o):!0,u=!!(d&&String(d.content||"").trim()===o);return{latestMessage:i,latestText:l,textIncludesContent:c,mirrorStored:u}}async _confirmRefresh(e,r,n,s,o,a=null){let i=1,l=this._collectWritebackVerification(e,r,n,s,o,a);for(let d=0;d<tT;d+=1){if(l.textIncludesContent&&l.mirrorStored)return{...l,refreshConfirmed:!0,confirmChecks:i,confirmedBy:"text_and_mirror_present"};await this._wait(eT),i+=1,l=this._collectWritebackVerification(e,r,n,s,o,a)}return{...l,refreshConfirmed:l.textIncludesContent&&l.mirrorStored,confirmChecks:i,confirmedBy:l.textIncludesContent&&l.mirrorStored?"text_and_mirror_present":""}}async _requestAssistantMessageRefresh(e,r,n,s={},o=null){let a=o||this._createWritebackResult("",s),{api:i,context:l}=e||{},d=e?.topWindow||(typeof window.parent<"u"&&window.parent!==window?window.parent:window),c=d?.TavernHelper?.setChatMessages||l?.setChatMessages||i?.setChatMessages||d?.setChatMessages||null;a.commit.preferredMethod=typeof c=="function"?pr.SET_CHAT_MESSAGES:pr.LOCAL_ONLY;let u=!1,y=Ki(s);if(y)return a.error=y,a;if(typeof c=="function"){rs(a.commit.attemptedMethods,pr.SET_CHAT_MESSAGES);try{let p=Ki(s);if(p)return a.error=p,a;let g=Md(s.sourceMessageId)||r;await c([{message_id:g,message:n}],{refresh:"affected"}),a.steps.hostSetChatMessages=!0,a.hostUpdateMethod=pr.SET_CHAT_MESSAGES,a.hostCommitApplied=!0,a.commit.appliedMethod=pr.SET_CHAT_MESSAGES,a.commit.hostCommitApplied=!0,u=!0}catch(p){Tt.error("setChatMessages \u5199\u56DE\u5931\u8D25\uFF0C\u56DE\u9000\u672C\u5730\u540C\u6B65",{error:p}),a.errors.push(`setChatMessages: ${p?.message||String(p)}`)}}return u&&(a.refreshRequested=!0,rs(a.refresh.requestMethods,a.hostUpdateMethod)),u||(rs(a.commit.attemptedMethods,pr.LOCAL_ONLY),a.commit.appliedMethod=pr.LOCAL_ONLY,a.commit.fallbackUsed=!0,a.hostUpdateMethod=a.commit.appliedMethod),a}_inferBlockType(e){let r=String(e||"").trim();if(!r)return"empty";let n=r.match(/^<([a-zA-Z0-9_-]+)(?:\s[^>]*)?>[\s\S]*<\/\1>$/);return n?.[1]?n[1]:"plain_text"}_stripExactStoredBlock(e,r,n=""){let s=String(e||""),o=String(r||"").trim(),a=String(n||"").trim();return o?s.includes(o)?a?{text:s.replace(o,a).trimEnd(),removed:!0,replaced:!0}:{text:s.replace(o,"").trimEnd(),removed:!0,replaced:!1}:{text:s,removed:!1,replaced:!1}:{text:s,removed:!1,replaced:!1}}_syncMessageToRuntimeChats(e,r,n){let{contextChat:s,apiChat:o}=e||{},a=i=>{!Array.isArray(i)||r<0||r>=i.length||i[r]!==n&&(i[r]={...i[r]||{},...n})};a(s),a(o)}_notifyMessageUpdated(e,r,n={}){if(n.skipNotify===!0)return{emitted:!1,source:"skipped_by_caller",eventName:""};try{let s=Nt.describe(),o=e?.topWindow||ii();return s.hasBridge?(Nt.emit(Ze.MESSAGE_UPDATED,r),typeof o?.requestAnimationFrame=="function"?o.requestAnimationFrame(()=>{Nt.emit(Ze.MESSAGE_UPDATED,r)}):typeof o?.setTimeout=="function"&&o.setTimeout(()=>{Nt.emit(Ze.MESSAGE_UPDATED,r)},30),{emitted:!0,source:s.source||"unavailable",eventName:Ze.MESSAGE_UPDATED}):{emitted:!1,source:s.source||"unavailable",eventName:Ze.MESSAGE_UPDATED}}catch(s){return Tt.warn("\u89E6\u53D1\u6D88\u606F\u5237\u65B0\u4E8B\u4EF6\u5931\u8D25",{error:s}),{emitted:!1,source:"error",eventName:"",error:s?.message||String(s)}}}_isAssistantMessage(e){if(!e||e.is_user||e.is_system)return!1;let r=String(e.role||"").toLowerCase();return r==="assistant"||r==="ai"||!r}_findAssistantMessageIndex(e,r){let n=Array.isArray(e)?e:[];if(!n.length)return-1;let s=r!=null&&r!=="",o=(a,i)=>{if(!this._isAssistantMessage(a)||r==null||r==="")return!1;let l=String(r).trim();return l?[a.message_id,a.id,a.messageId,a.mes_id,i].map(c=>c==null?"":String(c).trim()).includes(l):!1};for(let a=n.length-1;a>=0;a-=1)if(o(n[a],a))return a;if(s)return-1;for(let a=n.length-1;a>=0;a-=1)if(this._isAssistantMessage(n[a]))return a;return-1}_buildMessageInjectedContext(e){let n=Object.entries(e&&typeof e=="object"?e:{}).filter(([,o])=>o?.blockType!=="full_message").sort(([,o],[,a])=>(o?.updatedAt||0)-(a?.updatedAt||0));if(!n.length)return"";let s=["[\u5DE5\u5177\u4E0A\u4E0B\u6587\u6CE8\u5165]",""];for(let[o,a]of n)s.push(`[${o}]`),s.push(a?.content||""),s.push("");return s.join(`
`)}_getWritableMessageField(e){let r=["mes","message","content","text"];for(let n of r)if(typeof e?.[n]=="string")return{key:n,text:e[n]};return{key:"mes",text:""}}_applyMessageText(e,r,n={}){let s=e&&typeof e=="object"?e:{},o=["mes","message","content","text"],a=!1;if(o.forEach(i=>{typeof s[i]=="string"&&(s[i]=r,a=!0)}),a||(s.mes=r,s.message=r),Array.isArray(s.swipes)){let i=Number.parseInt(Md(n?.sourceSwipeId||n?.effectiveSwipeId),10),l=Number.isInteger(i)?i:Number.isInteger(s.swipe_id)?s.swipe_id:Number.isInteger(s.swipeId)?s.swipeId:0;l>=0&&l<s.swipes.length&&(s.swipes[l]=r,s.swipe_id=l,s.swipeId=l)}return s}_stripExistingToolOutput(e,r=[]){let n=String(e||"");return(Array.isArray(r)?r:[]).forEach(o=>{let a=String(o||"").trim();if(!a)return;if(a.startsWith("regex:")){try{let c=new RegExp(a.slice(6).trim(),"gis");n=n.replace(c,"")}catch(c){Tt.warn("\u79FB\u9664\u65E7\u5DE5\u5177\u8F93\u51FA\u65F6\u6B63\u5219\u65E0\u6548",{value:a,error:c})}return}let i=a.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),l=new RegExp(`<${i}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${i}>\\s*`,"gi"),d=new RegExp(`\\{${i}\\|[\\s\\S]*?\\}\\s*`,"gi");n=n.replace(l,""),n=n.replace(d,"")}),n.trimEnd()}_stripPreviousStoredToolContent(e,r){let n=String(e||""),s=String(r||"").trim();return s?n.replace(s,"").trimEnd():n.trimEnd()}async _insertToolOutputToBoundAssistantSlot(e,r,n={},s=null){let o=s||this._createWritebackResult(e,n);try{let a=this._getChatRuntime(),{context:i,chat:l}=a;if(!Array.isArray(l)||!l.length)return Tt.error("\u672A\u627E\u5230\u804A\u5929\u6D88\u606F\uFF0C\u65E0\u6CD5\u63D2\u5165\u5DE5\u5177\u8F93\u51FA"),o.error="\u672A\u627E\u5230\u804A\u5929\u6D88\u606F\uFF0C\u65E0\u6CD5\u63D2\u5165\u5DE5\u5177\u8F93\u51FA",o;let d=this._findAssistantMessageIndex(l,n.sourceMessageId);if(d<0)return Tt.error("\u672A\u627E\u5230\u53EF\u5199\u5165\u7684\u6700\u65B0 AI \u56DE\u590D\u6D88\u606F"),o.error="\u672A\u627E\u5230\u53EF\u5199\u5165\u7684\u6700\u65B0 AI \u56DE\u590D\u6D88\u606F",o;if(n?.signal?.aborted)return o.error="\u5DE5\u5177\u7ED3\u679C\u5DF2\u53D6\u6D88\uFF0C\u8DF3\u8FC7\u5199\u56DE",o;if(typeof n?.shouldAbortWriteback=="function")try{if(n.shouldAbortWriteback()===!0)return o.error="\u5DE5\u5177\u7ED3\u679C\u5DF2\u8FC7\u671F\uFF0C\u8DF3\u8FC7\u5199\u56DE",o}catch{return o.error="\u5DE5\u5177\u7ED3\u679C\u5DF2\u8FC7\u671F\uFF0C\u8DF3\u8FC7\u5199\u56DE",o}o.messageIndex=d,o.steps.foundTargetMessage=!0;let c=l[d],{key:u,text:y}=this._getWritableMessageField(c);o.textField=u;let p=c[Dt]&&typeof c[Dt]=="object"?c[Dt]:{},g=p?.[e]||{},m=g?.content||"",h=g?.blockText||m||"",b=Object.entries(p).filter(([L])=>L!==e).map(([,L])=>L||{}),x=String(r.content||"").trim(),w=n.replaceFullMessage===!0,T=w?"full_message":this._inferBlockType(x),I={toolId:e,messageId:n.sourceMessageId||c?.message_id||c?.messageId||d,blockType:T,insertedAt:r.updatedAt,replaceable:n.overwrite!==!1};o.blockIdentity=I;let S=n.overwrite===!1||w?{text:String(y||""),removed:!1,replaced:!1}:this._stripExactStoredBlock(y,h,x),A=S.text,P="";!w&&n.overwrite!==!1&&h&&!S.removed&&(P="previous_block_not_found");let M=n.overwrite===!1||S.replaced||w?A:this._stripExistingToolOutput(A,n.extractionSelectors),R=M!==A;A=M;let _=n.overwrite===!1||S.replaced||w?A:this._stripPreviousStoredToolContent(A,m),$=_!==A;A=_,o.replacedExistingBlock=w||S.removed||R||$;let F=n.overwrite===!1?String(y||""):A,Y=w?x:S.replaced?A.trim():[F.trimEnd(),x].filter(Boolean).join(`

`).trim();o.insertedNewBlock=!!x;let re=b.every(L=>{if(L?.blockType==="full_message")return!0;let ee=String(L?.blockText||L?.content||"").trim();return ee?Y.includes(ee):!0});o.preservedOtherToolBlocks=re,re?P&&(o.conflictDetected=!0,o.conflictReason=P):(o.conflictDetected=!0,o.conflictReason="other_tool_block_removed");let ie={...p,[e]:{toolId:e,content:x,blockText:x,blockType:T,blockIdentity:I,updatedAt:r.updatedAt,sourceMessageId:r.sourceMessageId||null}},Z=Ki(n);if(Z)return o.error=Z,o;c[u]=Y,this._applyMessageText(c,Y,n),c[Dt]=ie,c[eo]=this._buildMessageInjectedContext(ie),o.contentCommitted=!0,o.commit.contentCommitted=!0,o.steps.contentCommitted=!0,o.steps.localTextApplied=!0,this._syncMessageToRuntimeChats(a,d,c),o.steps.runtimeSynced=!0;let we=Ki(n);if(we)return o.error=we,o;await this._requestAssistantMessageRefresh(a,d,Y,n,o);let Ie=i?.saveChat||a?.api?.saveChat||null,X=i?.saveChatDebounced||a?.api?.saveChatDebounced||null;typeof X=="function"&&(X.call(i||api),o.steps.saveChatDebounced=!0,o.refreshRequested=!0,rs(o.refresh.requestMethods,"saveChatDebounced")),typeof Ie=="function"&&(await Ie.call(i||api),o.steps.saveChat=!0,o.refreshRequested=!0,rs(o.refresh.requestMethods,"saveChat"));let We=this._notifyMessageUpdated(a,d,n);o.steps.notifiedMessageUpdated=We?.emitted===!0,o.refresh.eventSource=We?.source||"",o.refresh.eventName=We?.eventName||"",We?.error&&o.errors.push(`MESSAGE_UPDATED: ${We.error}`);let Ae=String(r.content||"").trim();(o.steps.hostSetChatMessages||o.steps.hostSetChatMessage)&&(o.refreshRequested=!0,rs(o.refresh.requestMethods,o.hostUpdateMethod)),o.steps.notifiedMessageUpdated&&(o.refreshRequested=!0,rs(o.refresh.requestMethods,`MESSAGE_UPDATED:${o.refresh.eventName||"MESSAGE_UPDATED"}`)),o.steps.refreshRequested=o.refreshRequested,o.refresh.requested=o.refreshRequested;let Be=await this._confirmRefresh(a,l,d,e,Ae,c);return o.verification.textIncludesContent=Be.textIncludesContent,o.verification.mirrorStored=Be.mirrorStored,o.verification.refreshConfirmed=Be.refreshConfirmed,o.steps.verifiedAfterWrite=o.verification.textIncludesContent&&o.verification.mirrorStored,o.refreshConfirmed=o.verification.refreshConfirmed&&o.refreshRequested,o.refresh.confirmChecks=Number(Be.confirmChecks)||0,o.refresh.confirmedBy=Be.confirmedBy||"",o.refresh.confirmed=o.refreshConfirmed,o.steps.refreshConfirmed=o.refreshConfirmed,o.success=o.steps.localTextApplied&&o.steps.runtimeSynced&&o.steps.verifiedAfterWrite&&o.refreshConfirmed,o.writebackStatus=o.success?ji.SUCCESS:ji.FAILED,!o.success&&!o.error&&(o.error=o.refreshRequested?"\u5DE5\u5177\u7ED3\u679C\u5DF2\u63D0\u4EA4\uFF0C\u4F46\u5BBF\u4E3B\u5237\u65B0\u786E\u8BA4\u672A\u901A\u8FC7":"\u5DE5\u5177\u7ED3\u679C\u5DF2\u5C1D\u8BD5\u5199\u56DE\uFF0C\u4F46\u6700\u7EC8\u6821\u9A8C\u672A\u901A\u8FC7"),o.conflictDetected&&!o.error&&(o.error=`\u5DE5\u5177\u7ED3\u679C\u5DF2\u5199\u56DE\uFF0C\u4F46\u68C0\u6D4B\u5230\u5757\u51B2\u7A81\uFF1A${o.conflictReason}`),Tt.info(`\u5DF2\u5C06\u5DE5\u5177\u8F93\u51FA\u5199\u5165\u7ED1\u5B9A assistant \u69FD\u4F4D: ${e} -> #${d}`),o}catch(a){return Tt.error("\u63D2\u5165\u6700\u65B0 AI \u56DE\u590D\u539F\u6587\u5931\u8D25",{error:a}),o.error=a?.message||String(a),o.errors.push(o.error),o}}getAssistantMessageSnapshot(e=null){try{let r=this._getChatRuntime(),{chat:n}=r,s=this._findAssistantMessageIndex(n,e);if(s<0)return null;let o=n[s]||null,a=this._getWritableMessageField(o).text||"",i=o?.[Dt]&&typeof o[Dt]=="object"?o[Dt]:{},l=Object.values(i).reduce((d,c)=>{let u=String(c?.blockText||c?.content||"").trim();return!u||!d.includes(u)?d:d.replace(u,"").trimEnd()},String(a||"")).trim();return{messageIndex:s,message:o,messageText:a,baseText:l,toolOutputs:i,injectedContext:typeof o?.[eo]=="string"?o[eo]:this._buildMessageInjectedContext(i)}}catch(r){return Tt.warn("\u8BFB\u53D6 assistant \u6D88\u606F\u5FEB\u7167\u5931\u8D25",{error:r}),null}}_getCurrentChatId(){try{let e=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(e.SillyTavern?.getContext){let r=e.SillyTavern.getContext(),s=[r?.chatId,r?.chat_id,r?.chat_filename,r?.chatMetadata?.chatId,r?.chatMetadata?.chat_id,r?.chatMetadata?.file_name,r?.chatMetadata?.name,e.SillyTavern?.chatId,e.SillyTavern?.chat_id,e.SillyTavern?.chat_filename].find(a=>typeof a=="string"&&a.trim());if(s)return s;let o=e.SillyTavern?.this_chid;if(o!=null)return`chat_char_${o}`}return"chat_default"}catch{return"chat_default"}}},Jt=new Ui,rT=Jt});var am={};ge(am,{BUILTIN_VARIABLES:()=>om,VariableResolver:()=>Fi,default:()=>nT,variableResolver:()=>or});var ia,om,Fi,or,nT,Wi=O(()=>{ct();J();ia=N.createScope("VariableResolver"),om={lastUserMessage:{name:"lastUserMessage",description:"\u6700\u65B0\u7528\u6237\u6D88\u606F",category:"chat"},lastAiMessage:{name:"lastAiMessage",description:"\u6700\u65B0AI\u56DE\u590D",category:"chat"},chatHistory:{name:"chatHistory",description:"\u6700\u8FD1\u804A\u5929\u8BB0\u5F55",category:"chat"},characterCard:{name:"characterCard",description:"\u5F53\u524D\u89D2\u8272\u5361\u5185\u5BB9",category:"character"},toolName:{name:"toolName",description:"\u5DE5\u5177\u540D\u79F0",category:"tool"},toolId:{name:"toolId",description:"\u5DE5\u5177ID",category:"tool"},toolPromptMacro:{name:"toolPromptMacro",description:"\u5F53\u524D\u5DE5\u5177\u6A21\u677F\u63D0\u793A\u8BCD\u5B8F",category:"tool"},toolContentMacro:{name:"toolContentMacro",description:"\u5F53\u524D\u5DE5\u5177\u5904\u7406\u540E\u7684\u5185\u5BB9\u5B8F",category:"tool"},toolWorldbookContent:{name:"toolWorldbookContent",description:"\u5F53\u524D\u5DE5\u5177\u9009\u62E9\u7684\u4E16\u754C\u4E66\u6CE8\u5165\u5185\u5BB9",category:"tool"},injectedContext:{name:"injectedContext",description:"\u5DF2\u6CE8\u5165\u7684\u5DE5\u5177\u4E0A\u4E0B\u6587",category:"context"},extractedContent:{name:"extractedContent",description:"\u5DE5\u5177\u63D0\u53D6\u5185\u5BB9",category:"context"},recentMessagesText:{name:"recentMessagesText",description:"\u6700\u8FD1\u6D88\u606F\u6B63\u6587",category:"context"},rawRecentMessagesText:{name:"rawRecentMessagesText",description:"\u6700\u8FD1\u6D88\u606F\u539F\u6587",category:"context"},userMessage:{name:"userMessage",description:"\u5F53\u524D\u7528\u6237\u6D88\u606F",category:"chat"},previousToolOutput:{name:"previousToolOutput",description:"\u4E0A\u4E00\u6B21\u5DE5\u5177\u8F93\u51FA",category:"context"}},Fi=class{constructor(){this.customVariables=new Map,this.variableHandlers=new Map,this.debugMode=!1,this._registerDefaultHandlers()}resolveTemplate(e,r){if(typeof e!="string")return e;let n=e;return n=this._resolveBuiltinVariables(n,r),n=this._resolveCustomVariables(n,r),n=this._resolveRegexVariables(n,r),n}resolveObject(e,r){if(!e||typeof e!="object")return e;if(Array.isArray(e))return e.map(s=>this.resolveObject(s,r));let n={};for(let[s,o]of Object.entries(e))typeof o=="string"?n[s]=this.resolveTemplate(o,r):typeof o=="object"&&o!==null?n[s]=this.resolveObject(o,r):n[s]=o;return n}buildToolContext(e){return{lastUserMessage:e.lastUserMessage||"",lastAiMessage:e.lastAiMessage||"",chatHistory:e.chatHistory||[],characterCard:e.characterCard||null,characterName:e.characterCard?.name||"",toolName:e.toolName||"",toolId:e.toolId||"",toolPromptMacro:e.toolPromptMacro||"",toolContentMacro:e.toolContentMacro||"",toolWorldbookContent:e.toolWorldbookContent||"",injectedContext:e.injectedContext||"",extractedContent:e.extractedContent||"",recentMessagesText:e.recentMessagesText||"",rawRecentMessagesText:e.rawRecentMessagesText||"",userMessage:e.userMessage||"",previousToolOutput:e.previousToolOutput||"",regexResults:e.regexResults||{},raw:e,timestamp:Date.now()}}registerVariable(e,r){e&&(this.customVariables.set(e,r),ia.info(`\u6CE8\u518C\u81EA\u5B9A\u4E49\u53D8\u91CF: ${e}`))}unregisterVariable(e){this.customVariables.delete(e),ia.info(`\u6CE8\u9500\u81EA\u5B9A\u4E49\u53D8\u91CF: ${e}`)}registerHandler(e,r){!e||typeof r!="function"||(this.variableHandlers.set(e,r),ia.info(`\u6CE8\u518C\u53D8\u91CF\u5904\u7406\u5668: ${e}`))}getAvailableVariables(){let e=[];for(let[,r]of Object.entries(om))e.push({name:`{{${r.name}}}`,description:r.description,category:r.category,type:"builtin"});for(let[r,n]of this.customVariables)e.push({name:`{{${r}}}`,description:typeof n=="function"?"\u81EA\u5B9A\u4E49\u51FD\u6570\u53D8\u91CF":"\u81EA\u5B9A\u4E49\u9759\u6001\u53D8\u91CF",category:"custom",type:"custom"});return e}getVariableHelp(){let e=["\u53EF\u7528\u53D8\u91CF\uFF1A",""],r={chat:"\u804A\u5929\u76F8\u5173",character:"\u89D2\u8272\u76F8\u5173",tool:"\u5DE5\u5177\u76F8\u5173",context:"\u4E0A\u4E0B\u6587\u76F8\u5173",custom:"\u81EA\u5B9A\u4E49\u53D8\u91CF"},n={};for(let s of this.getAvailableVariables())n[s.category]||(n[s.category]=[]),n[s.category].push(s);for(let[s,o]of Object.entries(r))if(n[s]&&n[s].length>0){e.push(`\u3010${o}\u3011`);for(let a of n[s])e.push(`  ${a.name} - ${a.description}`);e.push("")}return e.push("\u3010\u6B63\u5219\u63D0\u53D6\u3011"),e.push("  {{regex.xxx}} - \u4F7F\u7528\u6B63\u5219\u63D0\u53D6\u7ED3\u679C\uFF0Cxxx\u4E3A\u6355\u83B7\u7EC4\u540D"),e.join(`
`)}_registerDefaultHandlers(){this.registerHandler("regex",(e,r)=>(r.regexResults||r.raw?.regexResults||{})[e]||"")}_resolveBuiltinVariables(e,r){let n=e;return n=n.replace(/\{\{lastUserMessage\}\}/gi,r.lastUserMessage||r.raw?.lastUserMessage||""),n=n.replace(/\{\{lastAiMessage\}\}/gi,r.lastAiMessage||r.raw?.lastAiMessage||""),n=n.replace(/\{\{chatHistory\}\}/gi,()=>{let s=r.chatHistory||r.raw?.chatHistory||[];return this._formatChatHistory(s)}),n=n.replace(/\{\{characterCard\}\}/gi,()=>{let s=r.characterCard||r.raw?.characterCard;return s?this._formatCharacterCard(s):""}),n=n.replace(/\{\{toolName\}\}/gi,r.toolName||r.raw?.toolName||""),n=n.replace(/\{\{toolId\}\}/gi,r.toolId||r.raw?.toolId||""),n=n.replace(/\{\{toolPromptMacro\}\}/gi,r.toolPromptMacro||r.raw?.toolPromptMacro||""),n=n.replace(/\{\{toolContentMacro\}\}/gi,r.toolContentMacro||r.raw?.toolContentMacro||""),n=n.replace(/\{\{toolWorldbookContent\}\}/gi,r.toolWorldbookContent||r.raw?.toolWorldbookContent||""),n=n.replace(/\{\{injectedContext\}\}/gi,r.injectedContext||r.raw?.injectedContext||""),n=n.replace(/\{\{extractedContent\}\}/gi,r.extractedContent||r.raw?.extractedContent||""),n=n.replace(/\{\{recentMessagesText\}\}/gi,r.recentMessagesText||r.raw?.recentMessagesText||""),n=n.replace(/\{\{rawRecentMessagesText\}\}/gi,r.rawRecentMessagesText||r.raw?.rawRecentMessagesText||""),n=n.replace(/\{\{userMessage\}\}/gi,r.userMessage||r.raw?.userMessage||""),n=n.replace(/\{\{previousToolOutput\}\}/gi,r.previousToolOutput||r.raw?.previousToolOutput||""),n}_resolveCustomVariables(e,r){let n=e;for(let[s,o]of this.customVariables){let a=new RegExp(`\\{\\{${this._escapeRegex(s)}\\}\\}`,"gi");typeof o=="function"?n=n.replace(a,()=>{try{return o(r)}catch(i){return ia.error(`\u53D8\u91CF\u5904\u7406\u9519\u8BEF ${s}:`,i),""}}):n=n.replace(a,String(o))}return n}_resolveRegexVariables(e,r){let n=e;for(let[s,o]of this.variableHandlers){let a=new RegExp(`\\{\\{${s}\\.([^}]+)\\}\\}`,"gi");n=n.replace(a,(i,l)=>{try{return o(l,r)}catch(d){return ia.error(`\u53D8\u91CF\u5904\u7406\u9519\u8BEF ${s}.${l}:`,d),""}})}return n}_formatChatHistory(e){return!Array.isArray(e)||e.length===0?"":e.map(r=>{let n=r.role||"unknown",s=r.content||r.mes||"";return`[${n}]: ${s}`}).join(`

`)}_formatCharacterCard(e){if(!e)return"";let r=[];return e.name&&r.push(`\u59D3\u540D: ${e.name}`),e.description&&r.push(`\u63CF\u8FF0: ${e.description}`),e.personality&&r.push(`\u6027\u683C: ${e.personality}`),e.scenario&&r.push(`\u573A\u666F: ${e.scenario}`),r.join(`

`)}_escapeRegex(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}},or=new Fi,nT=or});var cm={};ge(cm,{DEFAULT_PROMPT_TEMPLATE:()=>lm,ToolPromptService:()=>Hi,default:()=>sT,toolPromptService:()=>ss});var im,lm,Hi,ss,sT,qi=O(()=>{ct();Qs();Wi();Bo();J();im=N.createScope("ToolPromptService"),lm="\u8BF7\u5904\u7406\u4EE5\u4E0BAI\u56DE\u590D\u5185\u5BB9\uFF1A",Hi=class{constructor(){this.debugMode=!1}async _buildVariableContext(e,r={}){let n=this._getPromptTemplate(e),s=String(r?.toolWorldbookContent||r?.input?.toolWorldbookContent||await ai(e)).trim(),o=or.buildToolContext({...r,toolName:e?.name||r?.toolName||"",toolId:e?.id||r?.toolId||"",toolWorldbookContent:s}),a=or.resolveTemplate(n,o).trim(),i=String(r?.toolContentMacro||r?.input?.toolContentMacro||"").trim();return or.buildToolContext({...r,toolName:e?.name||r?.toolName||"",toolId:e?.id||r?.toolId||"",toolPromptMacro:a,toolContentMacro:i,toolWorldbookContent:s})}async buildToolMessages(e,r){if(!e)return im.error("\u6784\u5EFA\u5931\u8D25: \u5DE5\u5177\u914D\u7F6E\u4E3A\u7A7A"),[];let n=[],s=await this._buildVariableContext(e,r),o=Array.isArray(e.promptMessages)?e.promptMessages:[],a=this._getBypassMessages(e),i=a?.some(l=>l.mainSlot==="A"||l.mainSlot==="B"||l.isMain||l.isMain2);if(a&&a.length>0)for(let l of a)l.enabled!==!1&&n.push({role:this._normalizeRole(l.role),content:or.resolveTemplate(l.content||"",s)});if(!i&&o.length>0)for(let l of o){let d=or.resolveTemplate(l?.content||"",s).trim();d&&n.push({role:this._normalizeRole(l?.role),content:d})}else if(!i&&!a?.length){let l=this._buildUserContent(this._getPromptTemplate(e),s);l&&n.push({role:"user",content:l})}return im.debug(`\u6784\u5EFA\u6D88\u606F: ${n.length} \u6761`),n}async buildPromptText(e,r){let n=await this._buildVariableContext(e,r),s=Array.isArray(e?.promptMessages)?e.promptMessages:[];return s.length>0?s.map(o=>or.resolveTemplate(o?.content||"",n).trim()).filter(Boolean).join(`

`):n.toolPromptMacro||""}getToolPromptTemplate(e){return this._getPromptTemplate(e)}_getPromptTemplate(e){return e.promptTemplate&&typeof e.promptTemplate=="string"?e.promptTemplate:lm}_getBypassMessages(e){return e.bypass?.enabled?be.buildBypassMessages(e):[]}_buildUserContent(e,r){return!e||!e.trim()?"":or.resolveTemplate(e,r).trim()}_normalizeRole(e){if(!e)return"user";switch(String(e).toLowerCase()){case"system":return"system";case"assistant":return"assistant";case"user":default:return"user"}}setDebugMode(e){this.debugMode=e}},ss=new Hi,sT=ss});var um={};ge(um,{LEGACY_OUTPUT_MODES:()=>oT,OUTPUT_MODES:()=>Xt,TOOL_FAILURE_STAGES:()=>at,TOOL_RUNTIME_STATUS:()=>aT,TOOL_WRITEBACK_STATUS:()=>Xe,ToolOutputService:()=>Gi,default:()=>iT,toolOutputService:()=>Qt});function dm(t){if(t?.signal?.aborted)return{aborted:!0,stale:!1,reason:"cancelled_before_host_commit"};if(typeof t?.shouldAbortWriteback=="function")try{return t.shouldAbortWriteback()||!1}catch{return{aborted:!0,stale:!0,reason:"stale_base_changed"}}return!1}function to(t=[],e="",r=null){return{request:{built:Array.isArray(t)&&t.length>0,messageCount:Array.isArray(t)?t.length:0},extract:{completed:!0,hasOutput:!!String(e||"").trim()},writeback:{attempted:!!r,contentCommitted:!!r?.contentCommitted,hostCommitApplied:!!r?.hostCommitApplied,writebackStatus:r?.writebackStatus||"",preferredCommitMethod:r?.commit?.preferredMethod||"",appliedCommitMethod:r?.commit?.appliedMethod||"",fallbackUsed:!!r?.commit?.fallbackUsed},refresh:{requested:!!r?.refreshRequested,confirmed:!!r?.refreshConfirmed,requestMethods:Array.isArray(r?.refresh?.requestMethods)?[...r.refresh.requestMethods]:[],confirmChecks:Number(r?.refresh?.confirmChecks)||0,confirmedBy:r?.refresh?.confirmedBy||""}}}var wn,Xt,oT,aT,at,Xe,Gi,Qt,iT,la=O(()=>{ct();Zs();J();ns();qi();Cs();ln();Io();wn=N.createScope("ToolOutputService"),Xt={FOLLOW_AI:"follow_ai",POST_RESPONSE_API:"post_response_api",LOCAL_TRANSFORM:"local_transform"},oT={inline:"follow_ai"},aT={IDLE:"idle",RUNNING:"running",SUCCESS:"success",ERROR:"error"},at={BUILD_MESSAGES:"build_messages",SEND_API_REQUEST:"send_api_request",EXTRACT_OUTPUT:"extract_output",INJECT_CONTEXT:"inject_context",COMPATIBILITY_EXECUTE:"compatibility_execute",UNKNOWN:"unknown"},Xe={SUCCESS:"success",FAILED:"failed",SKIPPED_EMPTY_OUTPUT:"skipped_empty_output",NOT_APPLICABLE:"not_applicable"};Gi=class{constructor(){this.debugMode=!1,this._apiConnection=null}shouldRunPostResponse(e){return!e||!e.enabled||!e.output?.enabled?!1:e.output?.mode===Xt.POST_RESPONSE_API}shouldRunLocalTransform(e){return!e||!e.enabled||!e.output?.enabled?!1:e.output?.mode===Xt.LOCAL_TRANSFORM||!!e.processor?.type}shouldRunFollowAi(e){if(!e||!e.enabled||!e.output?.enabled)return!1;let r=e.output?.mode;return r===Xt.FOLLOW_AI||r==="inline"}shouldRunInline(e){return this.shouldRunFollowAi(e)}async runToolPostResponse(e,r){let n=Date.now(),s=e.id,o=r?.traceId||`trace_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,a=r?.sessionKey||"",i=r?.executionKey||"",l=this._getExtractionSelectors(e),d=e?.extraction?.writebackTag?.trim(),c=d?[d]:l,u=e.output?.apiPreset||e.apiPreset||"",y="",p=Xe.NOT_APPLICABLE,g=null,m=[],h="";wn.info(`\u5F00\u59CB\u6267\u884C\u5DE5\u5177: ${s}`),G.emit(W.TOOL_EXECUTION_STARTED,{toolId:s,traceId:o,sessionKey:a,mode:Xt.POST_RESPONSE_API});try{if(y=at.BUILD_MESSAGES,m=await this._buildToolMessages(e,r),!m||m.length===0)throw new Error("\u672A\u6784\u5EFA\u51FA\u53EF\u53D1\u9001\u7684\u5DE5\u5177\u8BF7\u6C42\u6D88\u606F\uFF0C\u8BF7\u68C0\u67E5\u63D0\u793A\u8BCD\u6A21\u677F\u6216\u7834\u9650\u8BCD\u914D\u7F6E\u662F\u5426\u4E3A\u7A7A\u3002");wn.debug(`\u6784\u5EFA\u4E86 ${m.length} \u6761\u6D88\u606F`);let b=dm(r);if(b){let S=Date.now()-n;return{success:!1,toolId:s,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88",duration:S,meta:{traceId:o,sessionKey:a,executionKey:i,sourceMessageId:r?.sourceMessageId||r?.confirmedAssistantMessageId||r?.messageId||"",sourceSwipeId:r?.sourceSwipeId||r?.confirmedAssistantSwipeId||r?.effectiveSwipeId||"",slotRevisionKey:r?.slotRevisionKey||"",selectors:l,apiPreset:u,writebackStatus:p,failureStage:y,writebackDetails:g,aborted:b.aborted===!0,stale:b.stale===!0,abortReason:b.reason||"",phases:to(m,h,g)}}}let x=await this._getRequestTimeout();y=at.SEND_API_REQUEST;let w=await this._sendApiRequest(u,m,{timeoutMs:x,signal:r.signal});y=at.EXTRACT_OUTPUT,h=this._extractOutputContent(w,e);let T=dm(r);if(T){let S=Date.now()-n;return{success:!1,toolId:s,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88",duration:S,meta:{traceId:o,sessionKey:a,executionKey:i,sourceMessageId:r?.sourceMessageId||r?.confirmedAssistantMessageId||r?.messageId||"",sourceSwipeId:r?.sourceSwipeId||r?.confirmedAssistantSwipeId||r?.effectiveSwipeId||"",slotRevisionKey:r?.slotRevisionKey||"",selectors:l,apiPreset:u,writebackStatus:p,failureStage:y,writebackDetails:g,aborted:T.aborted===!0,stale:T.stale===!0,abortReason:T.reason||"",phases:to(m,h,g)}}}if(h){if(y=at.INJECT_CONTEXT,g=await Jt.injectDetailed(s,h,{overwrite:e.output?.overwrite!==!1,sourceMessageId:r.sourceMessageId||r.confirmedAssistantMessageId||r.messageId||"",sourceSwipeId:r.sourceSwipeId||r.confirmedAssistantSwipeId||r.effectiveSwipeId||"",effectiveSwipeId:r.effectiveSwipeId||r.confirmedAssistantSwipeId||"",slotBindingKey:r.slotBindingKey||"",slotRevisionKey:r.slotRevisionKey||"",slotTransactionId:r.slotTransactionId||"",extractionSelectors:c,traceId:o,sessionKey:a,signal:r.signal,shouldAbortWriteback:r.shouldAbortWriteback,isAutoRun:r.isAutoRun===!0,skipNotify:r.skipNotify===!0}),!g?.success)throw p=Xe.FAILED,new Error(g?.error||"\u5DE5\u5177\u7ED3\u679C\u5DF2\u751F\u6210\uFF0C\u4F46\u5199\u5165\u4E0A\u4E0B\u6587/\u4E16\u754C\u4E66\u5931\u8D25");p=Xe.SUCCESS}else p=Xe.SKIPPED_EMPTY_OUTPUT;y="";let I=Date.now()-n;return G.emit(W.TOOL_EXECUTED,{toolId:s,traceId:o,sessionKey:a,success:!0,duration:I,mode:Xt.POST_RESPONSE_API}),wn.info(`\u5DE5\u5177\u6267\u884C\u6210\u529F: ${s}, \u8017\u65F6 ${I}ms`),{success:!0,toolId:s,output:h,duration:I,meta:{traceId:o,sessionKey:a,executionKey:i,slotBindingKey:r?.slotBindingKey||"",slotTransactionId:r?.slotTransactionId||"",generationAction:r?.generationAction||"",generationActionSource:r?.generationActionSource||"",rawGenerationType:r?.rawGenerationType||"",normalizedGenerationType:r?.normalizedGenerationType||"",generationMessageBindingSource:r?.generationMessageBindingSource||"",sourceMessageId:r?.sourceMessageId||r?.confirmedAssistantMessageId||r?.messageId||"",sourceSwipeId:r?.sourceSwipeId||r?.confirmedAssistantSwipeId||r?.effectiveSwipeId||"",confirmedAssistantSwipeId:r?.confirmedAssistantSwipeId||"",effectiveSwipeId:r?.effectiveSwipeId||"",slotRevisionKey:r?.slotRevisionKey||"",messageCount:m.length,selectors:l,apiPreset:u,writebackStatus:p,failureStage:"",writebackDetails:g,phases:to(m,h,g)}}}catch(b){let x=Date.now()-n,w=y||at.UNKNOWN,T=p||Xe.NOT_APPLICABLE;return wn.error(`\u5DE5\u5177\u6267\u884C\u5931\u8D25: ${s}`,{error:b}),G.emit(W.TOOL_EXECUTION_FAILED,{toolId:s,traceId:o,sessionKey:a,error:b.message||String(b),duration:x}),{success:!1,toolId:s,error:b.message||String(b),duration:x,meta:{traceId:o,sessionKey:a,executionKey:i,slotBindingKey:r?.slotBindingKey||"",slotTransactionId:r?.slotTransactionId||"",generationAction:r?.generationAction||"",generationActionSource:r?.generationActionSource||"",rawGenerationType:r?.rawGenerationType||"",normalizedGenerationType:r?.normalizedGenerationType||"",generationMessageBindingSource:r?.generationMessageBindingSource||"",sourceMessageId:r?.sourceMessageId||r?.confirmedAssistantMessageId||r?.messageId||"",sourceSwipeId:r?.sourceSwipeId||r?.confirmedAssistantSwipeId||r?.effectiveSwipeId||"",confirmedAssistantSwipeId:r?.confirmedAssistantSwipeId||"",effectiveSwipeId:r?.effectiveSwipeId||"",slotRevisionKey:r?.slotRevisionKey||"",messageCount:m.length,selectors:l,apiPreset:u,writebackStatus:T,failureStage:w,writebackDetails:g,phases:to(m,h,g)}}}}async runToolFollowAiManual(e,r){let n=Date.now(),s=e.id,o=r?.traceId||`trace_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,a=r?.sessionKey||"",i=r?.executionKey||"",l=e.output?.apiPreset||e.apiPreset||"",d=this._getExtractionSelectors(e),c=e?.extraction?.writebackTag?.trim(),u=c?[c]:d,y="",p=Xe.NOT_APPLICABLE,g=null,m=[],h="";G.emit(W.TOOL_EXECUTION_STARTED,{toolId:s,traceId:o,sessionKey:a,mode:Xt.FOLLOW_AI});try{if(y=at.BUILD_MESSAGES,m=await this._buildToolMessages(e,r),!m||m.length===0)throw new Error("\u672A\u6784\u5EFA\u51FA\u53EF\u53D1\u9001\u7684\u5DE5\u5177\u8BF7\u6C42\u6D88\u606F\uFF0C\u8BF7\u68C0\u67E5\u63D0\u793A\u8BCD\u6A21\u677F\u6216\u7834\u9650\u8BCD\u914D\u7F6E\u662F\u5426\u4E3A\u7A7A\u3002");let b=await this._getRequestTimeout();y=at.SEND_API_REQUEST;let x=await this._sendApiRequest(l,m,{timeoutMs:b,signal:r.signal});if(y=at.EXTRACT_OUTPUT,h=this._extractOutputContent(x,e),h){if(y=at.INJECT_CONTEXT,g=await Jt.injectDetailed(s,h,{overwrite:e.output?.overwrite!==!1,sourceMessageId:r.sourceMessageId||r.confirmedAssistantMessageId||r.messageId||"",sourceSwipeId:r.sourceSwipeId||r.confirmedAssistantSwipeId||r.effectiveSwipeId||"",effectiveSwipeId:r.effectiveSwipeId||r.confirmedAssistantSwipeId||"",slotBindingKey:r.slotBindingKey||"",slotRevisionKey:r.slotRevisionKey||"",slotTransactionId:r.slotTransactionId||"",extractionSelectors:u,traceId:o,sessionKey:a}),!g?.success)throw p=Xe.FAILED,new Error(g?.error||"\u5DE5\u5177\u7ED3\u679C\u5DF2\u751F\u6210\uFF0C\u4F46\u5199\u5165\u4E0A\u4E0B\u6587/\u4E16\u754C\u4E66\u5931\u8D25");p=Xe.SUCCESS}else p=Xe.SKIPPED_EMPTY_OUTPUT;y="";let w=Date.now()-n;return G.emit(W.TOOL_EXECUTED,{toolId:s,traceId:o,sessionKey:a,success:!0,duration:w,mode:Xt.FOLLOW_AI}),{success:!0,toolId:s,output:h,duration:w,meta:{traceId:o,sessionKey:a,executionKey:i,slotBindingKey:r?.slotBindingKey||"",slotTransactionId:r?.slotTransactionId||"",sourceMessageId:r?.sourceMessageId||r?.confirmedAssistantMessageId||r?.messageId||"",sourceSwipeId:r?.sourceSwipeId||r?.confirmedAssistantSwipeId||r?.effectiveSwipeId||"",confirmedAssistantSwipeId:r?.confirmedAssistantSwipeId||"",effectiveSwipeId:r?.effectiveSwipeId||"",slotRevisionKey:r?.slotRevisionKey||"",messageCount:m.length,selectors:d,apiPreset:l,writebackStatus:p,failureStage:"",writebackDetails:g,phases:to(m,h,g)}}}catch(b){let x=Date.now()-n,w=y||at.UNKNOWN,T=p||Xe.NOT_APPLICABLE;return G.emit(W.TOOL_EXECUTION_FAILED,{toolId:s,traceId:o,sessionKey:a,error:b.message||String(b),duration:x,mode:Xt.FOLLOW_AI}),{success:!1,toolId:s,error:b.message||String(b),duration:x,meta:{traceId:o,sessionKey:a,executionKey:i,slotBindingKey:r?.slotBindingKey||"",slotTransactionId:r?.slotTransactionId||"",sourceMessageId:r?.sourceMessageId||r?.confirmedAssistantMessageId||r?.messageId||"",sourceSwipeId:r?.sourceSwipeId||r?.confirmedAssistantSwipeId||r?.effectiveSwipeId||"",confirmedAssistantSwipeId:r?.confirmedAssistantSwipeId||"",effectiveSwipeId:r?.effectiveSwipeId||"",slotRevisionKey:r?.slotRevisionKey||"",messageCount:m.length,selectors:d,apiPreset:l,writebackStatus:T,failureStage:w,writebackDetails:g,phases:to(m,h,g)}}}}async runToolInline(e,r){return this.runToolFollowAiManual(e,r)}async previewExtraction(e,r){return{success:!0,...this.getExtractionSnapshot(e,r)}}getExtractionSnapshot(e,r){let n=this._buildRecentMessageExtractionEntries(e,r),s=this._joinMessageBlocks(n,"rawText"),o=this._joinMessageBlocks(n,"filteredText"),a=this._joinMessageBlocks(n,"extractedText",{skipEmpty:!0}),i=(Array.isArray(n)?n:[]).map(d=>String(d?.extractedText||"").trim()).filter(Boolean).join(`

`),l=Array.isArray(n)&&n.length>0?n[n.length-1]:null;return{sourceText:s,filteredSourceText:o,extractedText:a,extractedRawText:i,messageEntries:n,primaryEntry:l,selectors:this._getExtractionSelectors(e),maxMessages:e?.extraction?.maxMessages||5}}async _buildToolMessages(e,r){let n=this._buildRecentMessageExtractionEntries(e,r),s=this._joinMessageBlocks(n,"rawText"),o=this._joinMessageBlocks(n,"filteredText"),a=this._joinMessageBlocks(n,"extractedText",{skipEmpty:!0}),i={...r,rawRecentMessagesText:s,recentMessagesText:o,extractedContent:a,toolContentMacro:this._buildToolContentMacro(n),toolName:e.name,toolId:e.id};return ss.buildToolMessages(e,i)}_normalizeRole(e){if(!e)return"user";let r=String(e).toLowerCase();return r==="system"?"system":r==="assistant"?"assistant":"user"}setApiConnection(e){this._apiConnection=e}async _sendApiRequest(e,r,n={}){if(!this._apiConnection)throw new Error("API\u8FDE\u63A5\u6A21\u5757\u672A\u914D\u7F6E");let{timeoutMs:s=9e4,signal:o}=n,a=null;if(e){if(!Ao(e))throw new Error(`\u672A\u627E\u5230 API \u9884\u8BBE\u201C${e}\u201D\uFF0C\u8BF7\u91CD\u65B0\u9009\u62E9\u6216\u4FDD\u5B58\u540E\u518D\u6267\u884C`);a=Eo(e)}else a=Eo();let i=Ga(a||{});if(!i.valid&&!a?.useMainApi)throw new Error(`API\u914D\u7F6E\u65E0\u6548\uFF1A${i.errors.join("\uFF0C")}\u3002\u8BF7\u5148\u5B8C\u5584\u81EA\u5B9A\u4E49API\u914D\u7F6E\uFF0C\u6216\u542F\u7528\u201C\u4F7F\u7528SillyTavern\u4E3BAPI\u201D`);if(this._apiConnection.sendApiRequest)return await this._apiConnection.sendApiRequest(r,{timeoutMs:s,apiConfig:a},o);throw new Error("\u6CA1\u6709\u53EF\u7528\u7684API\u53D1\u9001\u65B9\u6CD5")}async _getRequestTimeout(){return St.getSettings().executor?.requestTimeoutMs||9e4}_extractOutputContent(e,r){if(!e)return"";if(typeof e=="string")return this._applyOutputExtractionSelectors(e,r);if(typeof e=="object"){if(e.choices&&e.choices[0]?.message?.content)return this._applyOutputExtractionSelectors(e.choices[0].message.content,r);if(e.content)return this._applyOutputExtractionSelectors(e.content,r);if(e.text)return this._applyOutputExtractionSelectors(e.text,r);if(e.message)return this._applyOutputExtractionSelectors(e.message,r);try{return this._applyOutputExtractionSelectors(JSON.stringify(e,null,2),r)}catch{return this._applyOutputExtractionSelectors(String(e),r)}}return this._applyOutputExtractionSelectors(String(e),r)}_applyOutputExtractionSelectors(e,r){let n=typeof e=="string"?e:String(e||""),s=this._getExtractionSelectors(r);if(!s.length)return n.trim();let o=[];for(let a of s){let i=String(a||"").trim();if(!i)continue;if(i.startsWith("regex:")){let d=i.slice(6).trim();if(!d)continue;try{let c=new RegExp(d,"gi");[...n.matchAll(c)].forEach(y=>{let p=String(y?.[0]||"").trim();p&&o.push(p)})}catch(c){wn.warn("\u5DE5\u5177\u8F93\u51FA\u6B63\u5219\u63D0\u53D6\u5931\u8D25\uFF0C\u8DF3\u8FC7\u8BE5\u89C4\u5219",{selector:i,error:c})}continue}let l=i.replace(/^<|>$/g,"").trim();if(l)try{let d=new RegExp(`<${l}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${l}>`,"gi");(n.match(d)||[]).forEach(u=>{let y=String(u||"").trim();y&&o.push(y)})}catch(d){wn.warn("\u5DE5\u5177\u8F93\u51FA\u6807\u7B7E\u63D0\u53D6\u5931\u8D25\uFF0C\u8DF3\u8FC7\u8BE5\u89C4\u5219",{selector:i,error:d})}}return o.length>0?o.join(`

`).trim():n.trim()}_resolveExtractionContext(e){let r=e?.extraction?.regexPresetId;if(!r)return{rules:[],blacklist:[]};try{let n=Br(r);if(!n)return{rules:[],blacklist:[]};let s=Array.isArray(n.rules)?n.rules.filter(a=>a&&a.enabled!==!1&&a.value).map(a=>({id:a.id,type:a.type,value:a.value,enabled:!0})):[],o=Array.isArray(n.blacklist)?n.blacklist.map(a=>String(a||"").trim()).filter(Boolean):[];return{rules:s,blacklist:o}}catch(n){return wn.warn("_resolveExtractionContext \u5F02\u5E38",{error:n}),{rules:[],blacklist:[]}}}_getExtractionSelectors(e){let{rules:r}=this._resolveExtractionContext(e),n=[];for(let s of r){let o=String(s.value||"").trim();o&&(s.type==="include"?n.push(o):s.type==="regex_include"&&n.push(`regex:${o}`))}return n}_applyExtractionSelectors(e,r){return this._applyExtractionSelectorsInternal(e,r,{strict:!1})}_applyExtractionSelectorsInternal(e,r,n={}){let s=typeof e=="string"?e:String(e||""),{rules:o,blacklist:a}=this._resolveExtractionContext(r),{strict:i=!1}=n;if(!o.length)return s.trim();let l=Or(s,o,a||[]);return i?(l||"").trim():l||s.trim()}_extractToolContent(e,r){let n=typeof r=="string"?r:String(r||""),{rules:s}=this._resolveExtractionContext(e);return s.length?this._applyExtractionSelectorsInternal(n,e,{strict:!0}):n.trim()}_applyGlobalContextRules(e){let r=typeof e=="string"?e:String(e||"");if(!r.trim())return"";try{let n=Es()||[],s=As()||[];return!Array.isArray(n)||n.length===0?r.trim():Or(r,n,s)||r.trim()}catch(n){return wn.warn("\u5E94\u7528\u5168\u5C40\u6B63\u6587\u63D0\u53D6\u89C4\u5219\u5931\u8D25\uFF0C\u56DE\u9000\u539F\u59CB\u6587\u672C",{error:n}),r.trim()}}_getMessageText(e){if(!e)return"";let r=[e.content,e.mes,e.message,e.text,e?.data?.content];for(let n of r)if(typeof n=="string"&&n.trim())return n.trim();return""}_collectRecentAssistantMessages(e,r){return this._collectRecentAssistantMessageEntries(e,r).map(n=>n.text).filter(Boolean).join(`

`)}_collectRecentAssistantMessageEntries(e,r){let n=Math.max(1,parseInt(e?.extraction?.maxMessages,10)||5),s=Array.isArray(r?.chatMessages)?r.chatMessages:[],o=[];for(let i=s.length-1;i>=0&&o.length<n;i-=1){let l=s[i],d=String(l?.role||"").toLowerCase(),c=d==="assistant"||d==="ai"||!l?.is_user&&!l?.is_system&&!d,u=this._getMessageText(l);c&&u&&o.unshift({text:u,message:l,chatIndex:i})}if(o.length>0)return o;let a=r?.lastAiMessage||r?.input?.lastAiMessage||"";return a?[{text:a,message:null,chatIndex:-1}]:[]}_buildRecentMessageExtractionEntries(e,r){return this._collectRecentAssistantMessageEntries(e,r).map((s,o)=>{let a=s.text||"",i=this._applyGlobalContextRules(a),l=this._extractToolContent(e,a);return{...s,order:o+1,rawText:a,filteredText:i,extractedText:l,fullMessageText:a}})}_joinMessageBlocks(e,r,n={}){let s=Array.isArray(e)?e:[],{skipEmpty:o=!1}=n;return s.map(i=>{let l=String(i?.[r]||"").trim();return o&&!l?"":`${`\u3010\u7B2C ${i?.order||0} \u6761 AI \u6D88\u606F\u3011`}
${l||"(\u7A7A)"}`}).filter(Boolean).join(`

--------------------------------

`)}_buildToolContentMacro(e){return(Array.isArray(e)?e:[]).map(s=>{let o=`\u3010\u7B2C ${s?.order||0} \u6761 AI \u6D88\u606F\u3011`,a=String(s?.filteredText||"").trim()||"(\u7A7A)",i=String(s?.extractedText||"").trim()||"(\u7A7A)";return`${o}
\u6B63\u6587\uFF1A
${a}

\u5DE5\u5177\uFF1A
${i}`}).filter(Boolean).join(`

--------------------------------

`).trim()}filterPostResponseTools(e){return Array.isArray(e)?e.filter(r=>this.shouldRunPostResponse(r)):[]}filterAutoPostResponseTools(e){return Array.isArray(e)?e.filter(r=>this.shouldRunPostResponse(r)):[]}filterInlineTools(e){return Array.isArray(e)?e.filter(r=>this.shouldRunInline(r)):[]}setDebugMode(e){this.debugMode=e}},Qt=new Gi,iT=Qt});function ym(t={}){return!t||typeof t!="object"?{}:Object.entries(t).reduce((e,[r,n])=>(e[r]=n===!0,e),{})}function dT(t,e={}){let r=e?.direction==="unescape"?"unescape":"escape",n=ym(e?.options);return lT.reduce((s,o)=>n[o.key]!==!0?s:r==="unescape"?s.replace(o.escaped,o.unescaped):s.replace(o.plain,o.replacement),String(t||""))}function uT(t,e={}){if((e?.direction||"en_to_zh")!=="en_to_zh")return String(t||"");let n=ym(e?.options);return cT.reduce((s,o)=>n[o.key]!==!0?s:s.replace(o.from,o.to),String(t||""))}function pT(t,e){let r=t?.processor||{},n=r?.type||"",s=String(e||"");switch(n){case pm.ESCAPE_TRANSFORM:return dT(s,r);case pm.PUNCTUATION_TRANSFORM:return uT(s,r);default:return s}}function yT(t,e,r){let n=String(t||""),s=String(e||"").trim(),o=String(r||"").trim();return!n.trim()||!s?{nextMessageText:"",replaced:!1}:n.includes(s)?{nextMessageText:n.replace(s,o).trim(),replaced:!0}:{nextMessageText:"",replaced:!1}}async function Yi(t,e={}){let r=Qt.getExtractionSnapshot(t,e),n=r?.primaryEntry||null,s=String(n?.fullMessageText||e?.lastAiMessage||"").trim(),o=String(n?.extractedText||r?.extractedRawText||r?.extractedText||"").trim(),a=Array.isArray(r?.selectors)?r.selectors:[],i=e?.traceId||`trace_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,l=e?.sessionKey||"";if(!o||!s)return{success:!1,error:"\u672A\u63D0\u53D6\u5230\u53EF\u5904\u7406\u5185\u5BB9\uFF0C\u8BF7\u5148\u68C0\u67E5\u6807\u7B7E\u6216\u6B63\u5219\u89C4\u5219",meta:{traceId:i,sessionKey:l,selectors:a,writebackStatus:Xe.NOT_APPLICABLE,failureStage:at.EXTRACT_OUTPUT,extraction:r}};let d=String(pT(t,o)||"").trim(),c=yT(s,o,d),u=c.replaced?c.nextMessageText:d,y=null,p=Xe.NOT_APPLICABLE;if(u){if(y=await Jt.injectDetailed(t.id,u,{overwrite:!0,sourceMessageId:e?.sourceMessageId||e?.confirmedAssistantMessageId||e?.messageId||"",sourceSwipeId:e?.sourceSwipeId||e?.confirmedAssistantSwipeId||e?.effectiveSwipeId||"",effectiveSwipeId:e?.effectiveSwipeId||e?.confirmedAssistantSwipeId||"",slotBindingKey:e?.slotBindingKey||"",slotRevisionKey:e?.slotRevisionKey||"",slotTransactionId:e?.slotTransactionId||"",extractionSelectors:[],replaceFullMessage:c.replaced,traceId:i,sessionKey:l,skipNotify:e?.skipNotify===!0}),!y?.success)return{success:!1,error:y?.error||"\u672C\u5730\u5904\u7406\u5B8C\u6210\uFF0C\u4F46\u5199\u56DE\u5931\u8D25",meta:{traceId:i,sessionKey:l,selectors:a,writebackStatus:Xe.FAILED,failureStage:at.INJECT_CONTEXT,writebackDetails:y,extraction:r}};p=Xe.SUCCESS}else p=Xe.SKIPPED_EMPTY_OUTPUT;return{success:!0,output:d,writebackState:u?{committed:y?.contentCommitted===!0}:null,meta:{traceId:i,sessionKey:l,selectors:a,writebackStatus:p,failureStage:"",writebackDetails:y,extraction:r}}}var lT,cT,pm,Pd=O(()=>{la();ns();lT=[{key:"newline",plain:/\r\n|\r|\n/g,escaped:/\\n/g,replacement:"\\n",unescaped:`
`},{key:"doubleQuote",plain:/"/g,escaped:/\\"/g,replacement:'\\"',unescaped:'"'},{key:"singleQuote",plain:/'/g,escaped:/\\'/g,replacement:"\\'",unescaped:"'"}],cT=[{key:"comma",from:/,/g,to:"\uFF0C"},{key:"period",from:/\./g,to:"\u3002"},{key:"exclamation",from:/!/g,to:"\uFF01"},{key:"question",from:/\?/g,to:"\uFF1F"},{key:"semicolon",from:/;/g,to:"\uFF1B"},{key:"colon",from:/:/g,to:"\uFF1A"},{key:"leftParen",from:/\(/g,to:"\uFF08"},{key:"rightParen",from:/\)/g,to:"\uFF09"}],pm={ESCAPE_TRANSFORM:"escape_transform",PUNCTUATION_TRANSFORM:"punctuation_transform"}});var Ld={};ge(Ld,{abortAllTasks:()=>bT,abortTask:()=>hT,buildToolMessages:()=>mm,clearExecutionHistory:()=>TT,createExecutionContext:()=>CT,createResult:()=>Vi,enhanceMessagesWithBypass:()=>kT,executeBatch:()=>mT,executeTool:()=>gm,executeToolWithConfig:()=>hm,executeToolsBatch:()=>MT,executorState:()=>Ge,extractFailed:()=>AT,extractSuccessful:()=>ET,generateTaskId:()=>os,getExecutionHistory:()=>ST,getExecutorStatus:()=>vT,getScheduler:()=>ro,mergeResults:()=>_T,pauseExecutor:()=>xT,resumeExecutor:()=>wT,setMaxConcurrent:()=>gT});function Vi(t,e,r,n,s,o,a=0){return{success:r,taskId:t,toolId:e,data:n,error:s,duration:o,retries:a,timestamp:Date.now(),metadata:{}}}function os(){return`task_${Date.now()}_${Math.random().toString(36).substr(2,9)}`}function fT(t,e={}){return{id:os(),toolId:t,options:e,status:"pending",createdAt:Date.now(),startedAt:null,completedAt:null,retries:0,maxRetries:e.maxRetries||3}}function ro(){return ca||(ca=new Nd(Ge.maxConcurrent)),ca}function gT(t){Ge.maxConcurrent=Math.max(1,Math.min(10,t)),ca&&(ca.maxConcurrent=Ge.maxConcurrent)}async function gm(t,e={},r){let n=ro(),s=fT(t,e);for(;Ge.isPaused;)await new Promise(o=>setTimeout(o,100));try{let o=await n.enqueue(async a=>{if(a.aborted)throw new DOMException("\u4EFB\u52A1\u5DF2\u4E2D\u6B62","AbortError");if(typeof r=="function")return await r(a,e);throw new Error("\u6267\u884C\u5668\u5FC5\u987B\u662F\u4E00\u4E2A\u51FD\u6570")},s);return fm(o),o}catch(o){$d.error(`executeTool \u5F02\u5E38 (toolId=${t})`,{error:o});let a=Vi(s.id,t,!1,null,o,Date.now()-s.createdAt,s.retries);return fm(a),a}}async function mT(t,e={}){let{failFast:r=!1,concurrency:n=Ge.maxConcurrent}=e,s=[],o=ro(),a=o.maxConcurrent;o.maxConcurrent=n;try{let i=t.map(({toolId:l,options:d,executor:c})=>gm(l,d,c));if(r)for(let l of i){let d=await l;if(s.push(d),!d.success){o.abortAll();break}}else{let l=await Promise.allSettled(i);for(let d of l)d.status==="fulfilled"?s.push(d.value):s.push(Vi(os(),"unknown",!1,null,d.reason,0,0))}}finally{o.maxConcurrent=a}return s}function hT(t){return ro().abort(t)}function bT(){ro().abortAll(),Ge.executionQueue=[]}function xT(){Ge.isPaused=!0}function wT(){Ge.isPaused=!1}function vT(){return{...ro().getStatus(),isPaused:Ge.isPaused,activeControllers:Ge.activeControllers.size,historyCount:Ge.executionHistory.length}}function fm(t){Ge.executionHistory.push(t),Ge.executionHistory.length>100&&Ge.executionHistory.shift()}function ST(t={}){let e=[...Ge.executionHistory];return t.toolId&&(e=e.filter(r=>r.toolId===t.toolId)),t.success!==void 0&&(e=e.filter(r=>r.success===t.success)),t.limit&&(e=e.slice(-t.limit)),e}function TT(){Ge.executionHistory=[]}function _T(t){let e={success:!0,data:[],errors:[],totalDuration:0,successCount:0,failureCount:0};for(let r of t)e.totalDuration+=r.duration,r.success?(e.successCount++,r.data!==void 0&&r.data!==null&&e.data.push(r.data)):(e.success=!1,e.failureCount++,r.error&&e.errors.push({taskId:r.taskId,toolId:r.toolId,error:r.error.message||String(r.error)}));return e}function ET(t){return t.filter(e=>e.success).map(e=>e.data)}function AT(t){return t.filter(e=>!e.success).map(e=>({taskId:e.taskId,toolId:e.toolId,error:e.error}))}function CT(t={}){return{taskId:os(),startTime:Date.now(),signal:t.signal||null,apiConfig:t.apiConfig||null,bypassMessages:t.bypassMessages||[],context:t.context||{},metadata:t.metadata||{}}}function kT(t,e){return!e||e.length===0?t:[...e,...t]}function IT(t){return t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function mm(t,e){let r=[],n=t.promptTemplate||"",s={"{{userMessage}}":e.input?.userMessage||"","{{lastAiMessage}}":e.input?.lastAiMessage||"","{{extractedContent}}":e.input?.extractedContent||"","{{previousToolOutput}}":e.input?.previousToolOutput||"","{{context}}":JSON.stringify(e.input?.context||{}),"{{pg}}":e.input?.context?.pg||"1","{{time}}":e.input?.context?.time||"","{{scene}}":e.input?.context?.scene||"","{{plot}}":e.input?.context?.plot||"","{{mq}}":e.input?.context?.mq||"\u2160","{{mqStatus}}":e.input?.context?.mqStatus||"\u8FDB\u884C\u4E2D","{{sq}}":e.input?.context?.sq||"1","{{sqStatus}}":e.input?.context?.sqStatus||"\u8FDB\u884C\u4E2D","{{latestSq}}":e.input?.context?.latestSq||"1","{{completed}}":e.input?.context?.completed||"\u65E0","{{defined}}":e.input?.context?.defined||"","{{status}}":e.input?.context?.status||"","{{seeds}}":e.input?.context?.seeds||"","{{name}}":e.input?.context?.name||"","{{location}}":e.input?.context?.location||"","{{condition}}":e.input?.context?.condition||"","{{equipment}}":e.input?.context?.equipment||"","{{skills}}":e.input?.context?.skills||""};for(let[o,a]of Object.entries(s))n=n.replace(new RegExp(IT(o),"g"),a);return r.push({role:"USER",content:n}),r}async function hm(t,e,r={}){let n=he(t);if(!n)return{success:!1,taskId:os(),toolId:t,error:"\u5DE5\u5177\u914D\u7F6E\u4E0D\u5B58\u5728",duration:0};if(!n.enabled)return{success:!1,taskId:os(),toolId:t,error:"\u5DE5\u5177\u672A\u542F\u7528",duration:0};let s=Date.now(),o=os();try{G.emit(W.TOOL_EXECUTION_STARTED,{toolId:t,taskId:o,context:e});let a=mm(n,e);if(typeof r.callApi=="function"){let i=n.output?.apiPreset||n.apiPreset||"",l=i?{preset:i}:null,d=await r.callApi(a,l,r.signal),c=d;n.outputMode==="separate"&&n.extractTags?.length>0&&(c=RT(d,n.extractTags));let u={success:!0,taskId:o,toolId:t,data:c,duration:Date.now()-s};return G.emit(W.TOOL_EXECUTED,{toolId:t,taskId:o,result:u}),u}else return{success:!0,taskId:o,toolId:t,data:{messages:a,config:{apiPreset:n.output?.apiPreset||n.apiPreset||"",outputMode:n.outputMode,extractTags:n.extractTags}},duration:Date.now()-s,needsExecution:!0}}catch(a){$d.error(`executeToolWithConfig \u5F02\u5E38 (toolId=${t})`,{error:a});let i={success:!1,taskId:o,toolId:t,error:a.message||String(a),duration:Date.now()-s};return G.emit(W.TOOL_EXECUTION_FAILED,{toolId:t,taskId:o,error:a}),i}}function RT(t,e){let r={};for(let n of e){let s=new RegExp(`<${n}[^>]*>([\\s\\S]*?)<\\/${n}>`,"gi"),o=t.match(s);o&&(r[n]=o.map(a=>{let i=a.match(new RegExp(`<${n}[^>]*>([\\s\\S]*?)<\\/${n}>`,"i"));return i?i[1].trim():""}))}return r}async function MT(t,e,r={}){let n=[];for(let s of t){let o=he(s);if(o&&o.enabled){let a=await hm(s,e,r);n.push(a)}}return n}var $d,Ge,Nd,ca,Od=O(()=>{Ar();ct();J();$d=N.createScope("ToolExecutor"),Ge={activeControllers:new Map,executionQueue:[],runningCount:0,maxConcurrent:3,executionHistory:[],isPaused:!1};Nd=class{constructor(e=3){this.maxConcurrent=e,this.queue=[],this.running=new Map,this.isProcessing=!1}enqueue(e,r){return new Promise((n,s)=>{this.queue.push({executor:e,task:r,resolve:n,reject:s}),this.process()})}async process(){if(!this.isProcessing){for(this.isProcessing=!0;this.queue.length>0&&this.running.size<this.maxConcurrent;){let e=this.queue.shift();if(!e)continue;let{executor:r,task:n,resolve:s,reject:o}=e,a=new AbortController;n.abortController=a,n.status="running",n.startedAt=Date.now(),this.running.set(n.id,n),Ge.activeControllers.set(n.id,a),this.executeTask(r,n,a.signal).then(i=>{n.status="completed",n.completedAt=Date.now(),s(i)}).catch(i=>{n.status=i.name==="AbortError"?"aborted":"failed",n.completedAt=Date.now(),o(i)}).finally(()=>{this.running.delete(n.id),Ge.activeControllers.delete(n.id),Ge.runningCount=this.running.size})}this.isProcessing=!1}}async executeTask(e,r,n){let s=Date.now(),o=null;for(let a=0;a<=r.maxRetries;a++){if(n.aborted)throw new DOMException("\u4EFB\u52A1\u5DF2\u4E2D\u6B62","AbortError");try{let i=await e(n);return Vi(r.id,r.toolId,!0,i,null,Date.now()-s,a)}catch(i){if(o=i,i.name==="AbortError")throw i;a===r.maxRetries&&$d.error(`\u4EFB\u52A1\u6267\u884C\u5931\u8D25 (toolId=${r.toolId}, ${a+1}\u6B21\u91CD\u8BD5)`,{error:i}),a<r.maxRetries&&(await this.delay(1e3*(a+1)),r.retries=a+1)}}throw o}delay(e){return new Promise(r=>setTimeout(r,e))}abort(e){let r=Ge.activeControllers.get(e);return r?(r.abort(),!0):!1}abortAll(){for(let e of Ge.activeControllers.values())e.abort();Ge.activeControllers.clear(),this.queue=[],this.running.clear()}getStatus(){return{pending:this.queue.length,running:this.running.size,maxConcurrent:this.maxConcurrent}}},ca=null});async function PT(){return Dd||(Dd=Promise.resolve().then(()=>(Od(),Ld))),Dd}async function NT(t,e,r){return r&&t.output?.mode===Xt.POST_RESPONSE_API?Qt.runToolPostResponse(t,e):r&&t.output?.mode===Xt.FOLLOW_AI?Qt.runToolFollowAiManual(t,e):(await PT()).executeToolWithConfig(t.id,e)}function $T(t,e){return e?.runSource==="MANUAL"?t.output?.mode==="local_transform"||t.processor?.type?as.MANUAL_LOCAL_TRANSFORM:t.output?.mode===Xt.POST_RESPONSE_API?as.MANUAL_POST_RESPONSE_API:as.MANUAL_COMPATIBILITY:as.MANUAL_POST_RESPONSE_API}function Ji(t,e){try{Bc(t,e)}catch(r){no.warn("\u66F4\u65B0\u5DE5\u5177\u8FD0\u884C\u65F6\u72B6\u6001\u5931\u8D25:",{toolId:t,error:r})}}async function LT(t,e){let r=Date.now(),n=t.id,s=`yyt-tool-run-${n}`,o=$T(t,e),a=e?.executionKey||"";Ji(n,{lastStatus:"running",lastError:"",lastDurationMs:0,lastTraceId:e?.traceId||"",lastMessageKey:e?.messageId||"",lastExecutionKey:a,lastExecutionPath:o,lastWritebackStatus:"",lastFailureStage:"",lastSlotBindingKey:e?.slotBindingKey||"",lastSlotRevisionKey:e?.slotRevisionKey||"",lastSlotTransactionId:e?.slotTransactionId||"",lastSourceMessageId:e?.sourceMessageId||e?.messageId||"",lastSourceSwipeId:e?.sourceSwipeId||e?.effectiveSwipeId||"",lastContentCommitted:!1,lastHostCommitApplied:!1,lastRefreshRequested:!1,lastRefreshConfirmed:!1,lastPreferredCommitMethod:"",lastAppliedCommitMethod:"",lastRefreshMethodCount:0,lastRefreshMethods:[],lastRefreshConfirmChecks:0,lastRefreshConfirmedBy:""}),no.info(`\u6B63\u5728\u624B\u52A8\u6267\u884C ${t.name}`,null,{topNotice:{sticky:!0,noticeId:s}});try{let i=o===as.MANUAL_LOCAL_TRANSFORM?await Yi(t,e):await NT(t,e,!0),l=Date.now()-r;if(i?.success){let y=he(n),p=i?.meta?.writebackDetails||{};return Ji(n,{lastStatus:"success",lastError:"",lastDurationMs:l,lastTraceId:e?.traceId||"",successCount:(y?.runtime?.successCount||0)+1,lastMessageKey:e?.messageId||"",lastExecutionKey:a,lastExecutionPath:o,lastWritebackStatus:i?.meta?.writebackStatus||Xe.NOT_APPLICABLE,lastFailureStage:i?.meta?.failureStage||"",lastSlotBindingKey:e?.slotBindingKey||"",lastSlotRevisionKey:e?.slotRevisionKey||"",lastSlotTransactionId:e?.slotTransactionId||"",lastSourceMessageId:e?.sourceMessageId||e?.messageId||"",lastSourceSwipeId:e?.sourceSwipeId||e?.effectiveSwipeId||"",lastContentCommitted:!!p.contentCommitted,lastHostCommitApplied:!!p.hostCommitApplied,lastRefreshRequested:!!p.refreshRequested,lastRefreshConfirmed:!!p.refreshConfirmed,lastPreferredCommitMethod:p?.commit?.preferredMethod||"",lastAppliedCommitMethod:p?.commit?.appliedMethod||"",lastRefreshMethodCount:Array.isArray(p?.refresh?.requestMethods)?p.refresh.requestMethods.length:0,lastRefreshMethods:Array.isArray(p?.refresh?.requestMethods)?[...p.refresh.requestMethods]:[],lastRefreshConfirmChecks:Number(p?.refresh?.confirmChecks)||0,lastRefreshConfirmedBy:p?.refresh?.confirmedBy||""}),no.info(`${t.name} \u624B\u52A8\u6267\u884C\u5B8C\u6210`,null,{toast:"success",topNotice:{duration:3200,noticeId:s}}),{success:!0,duration:l,result:i}}let d=he(n),c=i?.error||"\u5DE5\u5177\u6267\u884C\u5931\u8D25",u=i?.meta?.writebackDetails||{};return Ji(n,{lastStatus:"error",lastError:c,lastDurationMs:l,lastTraceId:e?.traceId||"",errorCount:(d?.runtime?.errorCount||0)+1,lastMessageKey:e?.messageId||"",lastExecutionKey:a,lastExecutionPath:o,lastWritebackStatus:i?.meta?.writebackStatus||Xe.NOT_APPLICABLE,lastFailureStage:i?.meta?.failureStage||(o===as.MANUAL_COMPATIBILITY?at.COMPATIBILITY_EXECUTE:at.UNKNOWN),lastSlotBindingKey:e?.slotBindingKey||"",lastSlotRevisionKey:e?.slotRevisionKey||"",lastSlotTransactionId:e?.slotTransactionId||"",lastSourceMessageId:e?.sourceMessageId||e?.messageId||"",lastSourceSwipeId:e?.sourceSwipeId||e?.effectiveSwipeId||"",lastContentCommitted:!!u.contentCommitted,lastHostCommitApplied:!!u.hostCommitApplied,lastRefreshRequested:!!u.refreshRequested,lastRefreshConfirmed:!!u.refreshConfirmed,lastPreferredCommitMethod:u?.commit?.preferredMethod||"",lastAppliedCommitMethod:u?.commit?.appliedMethod||"",lastRefreshMethodCount:Array.isArray(u?.refresh?.requestMethods)?u.refresh.requestMethods.length:0,lastRefreshMethods:Array.isArray(u?.refresh?.requestMethods)?[...u.refresh.requestMethods]:[],lastRefreshConfirmChecks:Number(u?.refresh?.confirmChecks)||0,lastRefreshConfirmedBy:u?.refresh?.confirmedBy||""}),no.error(`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${c}`,null,{toast:!0,topNotice:{sticky:!0,noticeId:s}}),{success:!1,duration:l,error:c,result:i}}catch(i){let l=Date.now()-r,d=he(n),c=i?.message||String(i);throw Ji(n,{lastStatus:"error",lastError:c,lastDurationMs:l,lastTraceId:e?.traceId||"",errorCount:(d?.runtime?.errorCount||0)+1,lastMessageKey:e?.messageId||"",lastExecutionKey:a,lastExecutionPath:o,lastWritebackStatus:Xe.NOT_APPLICABLE,lastFailureStage:o===as.MANUAL_COMPATIBILITY?at.COMPATIBILITY_EXECUTE:at.UNKNOWN,lastSlotBindingKey:e?.slotBindingKey||"",lastSlotRevisionKey:e?.slotRevisionKey||"",lastSlotTransactionId:e?.slotTransactionId||"",lastSourceMessageId:e?.sourceMessageId||e?.messageId||"",lastSourceSwipeId:e?.sourceSwipeId||e?.effectiveSwipeId||"",lastContentCommitted:!1,lastHostCommitApplied:!1,lastRefreshRequested:!1,lastRefreshConfirmed:!1,lastPreferredCommitMethod:"",lastAppliedCommitMethod:"",lastRefreshMethodCount:0,lastRefreshMethods:[],lastRefreshConfirmChecks:0,lastRefreshConfirmedBy:""}),no.error(`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${c}`,null,{toast:!0,topNotice:{sticky:!0,noticeId:s}}),i}}async function Xi(t){if(!t)return{success:!1,error:"\u7F3A\u5C11\u5DE5\u5177ID"};let e=he(t);if(!e)return{success:!1,error:"\u5DE5\u5177\u4E0D\u5B58\u5728"};if(!e.enabled)return on(t,{lastMessageKey:"",lastExecutionKey:"",lastExecutionPath:"",lastWritebackStatus:Xe.NOT_APPLICABLE,lastFailureStage:"",lastContentCommitted:!1,lastHostCommitApplied:!1,lastRefreshRequested:!1,lastRefreshConfirmed:!1,lastPreferredCommitMethod:"",lastAppliedCommitMethod:"",lastRefreshMethodCount:0,lastRefreshMethods:[],lastRefreshConfirmChecks:0,lastRefreshConfirmedBy:""},{touchLastRunAt:!1,emitEvent:!1}),no.warn(`${e.name} \u672A\u542F\u7528\uFF0C\u65E0\u6CD5\u624B\u52A8\u6267\u884C`,null,{topNotice:{duration:2800,noticeId:`yyt-tool-run-${t}`}}),{success:!1,error:"\u5DE5\u5177\u672A\u542F\u7528"};let r=await Un({runSource:"MANUAL"});return LT(e,r)}async function Qi(t){if(!t)return{success:!1,error:"\u7F3A\u5C11\u5DE5\u5177ID"};let e=he(t);if(!e)return{success:!1,error:"\u5DE5\u5177\u4E0D\u5B58\u5728"};let r=await Un({runSource:"MANUAL_PREVIEW"});return Qt.previewExtraction(e,r)}var no,as,Dd,Bd=O(()=>{Ar();la();Wn();Pd();J();no=N.createScope("ToolTrigger"),as={MANUAL_POST_RESPONSE_API:"manual_post_response_api",MANUAL_LOCAL_TRANSFORM:"manual_local_transform",MANUAL_COMPATIBILITY:"manual_compatibility"},Dd=null});var xm={};ge(xm,{TOOL_CONFIG_PANEL_STYLES:()=>zd,createToolConfigPanel:()=>Sn,default:()=>WT});function bm(t){return t?t.length!==void 0&&typeof t.get=="function"?t.get(0):t:null}function OT(t){if(!Number.isFinite(t)||t<=0)return"\u4ECE\u672A";let e=Date.now()-t;if(e<6e4)return`${Math.floor(e/1e3)} \u79D2\u524D`;if(e<36e5)return`${Math.floor(e/6e4)} \u5206\u949F\u524D`;if(e<864e5)return`${Math.floor(e/36e5)} \u5C0F\u65F6\u524D`;try{return new Date(t).toLocaleString()}catch{return"\u672A\u77E5"}}function DT(t){if(!t)return null;let e=t.closest(".yyt-popup-body");if(!e)return Pr.warn("pinToolPanelHeight: \u627E\u4E0D\u5230 .yyt-popup-body \u7956\u5148"),null;let r=()=>{let s=t.querySelector(".yyt-tool-panel");if(!s)return;let o=e.getBoundingClientRect(),a=s.getBoundingClientRect(),i=o.bottom-a.top-8;i>100?s.style.height=`${i}px`:Pr.warn(`pinToolPanelHeight: \u8BA1\u7B97\u9AD8\u5EA6\u5F02\u5E38 h=${i}`)};if(r(),requestAnimationFrame(()=>requestAnimationFrame(r)),typeof ResizeObserver>"u")return null;let n=new ResizeObserver(()=>r());return n.observe(e),()=>{try{n.disconnect()}catch{}}}function BT(t){if(!t)return;let e=t.querySelector(".yyt-tool-panel-hero"),r=t.querySelector(".yyt-tool-panel-scroll");if(!e||!r)return;let n=()=>{r.scrollTop>0?e.classList.add("yyt-tool-panel-hero--compact"):e.classList.remove("yyt-tool-panel-hero--compact")};n(),r.addEventListener("scroll",n,{passive:!0})}function Sn(t={}){let{id:e,toolId:r,postResponseHint:n,previewDialogId:s,previewTitle:o="\u6D4B\u8BD5\u63D0\u53D6\u7ED3\u679C"}=t;return{id:e,toolId:r,renderTo(a){let i=bm(a);if(!i)return;if(i._yytToolPanelCleanup)try{i._yytToolPanelCleanup()}catch{}let l=()=>this.renderTo(a),d=he(r);if(!d){i.innerHTML='<div class="yyt-empty-state-small">\u5DE5\u5177\u914D\u7F6E\u52A0\u8F7D\u5931\u8D25</div>';return}let c=f("div",{className:"yyt-tool-panel",dataset:{toolId:r}}),u=[];c.appendChild(zT(d,r,l,n));let y=f("div",{className:"yyt-tool-panel-scroll"});y.appendChild(KT(d));let p=jT(d,r,l);u.push(p),y.appendChild(p.el);let g=UT(d,r,l,a,s,o);u.push(g),y.appendChild(g.el),c.appendChild(y),i.innerHTML="",i.appendChild(c);let m=DT(i);BT(i),i._yytToolPanelCleanup=()=>{for(let h of u)try{h.destroy()}catch{}if(typeof m=="function")try{m()}catch{}delete i._yytToolPanelCleanup}},destroy(a){let i=bm(a);if(i?._yytToolPanelCleanup)try{i._yytToolPanelCleanup()}catch{}},getStyles(){return zd}}}function zT(t,e,r,n){let s=f("div",{className:"yyt-tool-panel-hero"}),o=f("div",{className:"yyt-tool-panel-hero-row1"});o.appendChild(f("div",{className:"yyt-tool-panel-hero-icon",text:"\u{1F527}"})),o.appendChild(f("div",{className:"yyt-tool-panel-hero-name",text:t.name||e}));let a=f("div",{className:"yyt-tool-panel-hero-actions"});a.appendChild(te({label:"\u25B6 \u7ACB\u5373\u6267\u884C\u4E00\u6B21",size:"small",onClick:async()=>{try{await Xi(e),Pr.info("\u5DF2\u89E6\u53D1\u624B\u52A8\u6267\u884C",null,{toast:"success"})}catch(g){Pr.error(`\u6267\u884C\u5931\u8D25\uFF1A${g?.message||g}`,null,{toast:!0})}}}).el),a.appendChild(te({label:"\u{1F4BE} \u4FDD\u5B58\u914D\u7F6E",size:"small",variant:"primary",onClick:()=>{Pr.info("\u914D\u7F6E\u5DF2\u4FDD\u5B58",null,{toast:"success"}),r()}}).el),o.appendChild(a),s.appendChild(o),t.description&&s.appendChild(f("div",{className:"yyt-tool-panel-hero-desc",text:t.description}));let i=f("div",{className:"yyt-tool-panel-hero-chips"}),d=(t.output?.mode||"follow_ai")==="post_response_api"?"\u989D\u5916 AI \u89E3\u6790\uFF08\u81EA\u52A8\uFF09":"\u968F AI \u8F93\u51FA\uFF08\u624B\u52A8\uFF09";i.appendChild(f("span",{className:"yyt-tool-hero-chip mode",text:d}));let c=t.output?.apiPreset||t.apiPreset||"";c&&i.appendChild(f("span",{className:"yyt-tool-hero-chip preset",text:`API: ${c}`}));let u=t.extraction?.regexPresetId||"";if(u){let g=Le.getPreset(u);i.appendChild(f("span",{className:"yyt-tool-hero-chip preset",text:`\u6B63\u5219: ${g?g.name:"\u5DF2\u5220\u9664"}`}))}else i.appendChild(f("span",{className:"yyt-tool-hero-chip",text:"\u6B63\u5219: \u672A\u7ED1\u5B9A",style:{opacity:"0.6"}}));let y=t.worldbooks?.presetId||"";if(y){let g=wt.getPreset(y);g&&i.appendChild(f("span",{className:"yyt-tool-hero-chip preset",text:`\u4E16\u754C\u4E66: ${g.name}`}))}let p=t.runtime?.lastStatus;if(p){let g=p==="success"?"status-success":p==="failed"?"status-failed":"";i.appendChild(f("span",{className:`yyt-tool-hero-chip ${g}`,text:`\u4E0A\u6B21\u6267\u884C \xB7 ${p}`}))}return s.appendChild(i),s}function KT(t){let e=f("div",{className:"yyt-tool-runtime-row"}),r=t.runtime||{},n=(a,i,l="")=>{let d=f("div",{className:"yyt-tool-runtime-stat"});return d.appendChild(f("span",{className:"yyt-tool-runtime-stat-label",text:a})),d.appendChild(f("span",{className:`yyt-tool-runtime-stat-value ${l}`,text:i})),d},s=r.lastStatus==="success"?"\u2713 \u4E0A\u6B21\u6210\u529F":r.lastStatus==="failed"?"\u2717 \u4E0A\u6B21\u5931\u8D25":r.lastStatus==="idle"?"\u5F85\u547D":r.lastStatus||"\u5F85\u547D",o=r.lastStatus==="success"?"success":r.lastStatus==="failed"?"error":"muted";return e.appendChild(n("\u72B6\u6001",s,o)),e.appendChild(n("\u6700\u8FD1\u8FD0\u884C",OT(r.lastRunAt),"muted")),e.appendChild(n("\u6210\u529F",String(r.successCount||0),"success")),e.appendChild(n("\u5931\u8D25",String(r.errorCount||0),r.errorCount?"error":"muted")),e}function jT(t,e,r){let n=f("div",{style:{display:"flex",flexDirection:"column"}});n.appendChild(da({label:"\u8F93\u51FA\u6A21\u5F0F",hint:"\u51B3\u5B9A\u6267\u884C\u8DEF\u5F84 + \u81EA\u52A8/\u624B\u52A8",control:Me({value:t.output?.mode||"follow_ai",options:[{value:"follow_ai",label:"follow_ai \u2014 \u968F AI \u8F93\u51FA\uFF08\u624B\u52A8\u89E6\u53D1\uFF09"},{value:"post_response_api",label:"post_response_api \u2014 \u989D\u5916 AI \u89E3\u6790\uFF08\u81EA\u52A8\uFF09"}],onChange:l=>{let d=he(e)||{};je(e,{...d,output:{...d.output||{},mode:l,enabled:l==="post_response_api"}}),r()}})}));let s=(()=>{try{return Qr()||[]}catch{return[]}})();n.appendChild(da({label:"API \u9884\u8BBE",hint:"\u989D\u5916 AI \u89E3\u6790\u65F6\u4F7F\u7528",control:Me({value:t.output?.apiPreset||t.apiPreset||"",options:[{value:"",label:"\u2014\u2014 \u8DDF\u968F\u5F53\u524D\u4E3B API \u2014\u2014"},...s.map(l=>({value:l.name,label:l.name}))],onChange:l=>{let d=he(e)||{};je(e,{...d,apiPreset:l,output:{...d.output||{},apiPreset:l}}),r()}})}));let o=(()=>{try{return oa()||[]}catch{return[]}})();n.appendChild(da({label:"Ai \u6307\u4EE4\u9884\u8BBE",hint:'\u9644\u52A0\u5728 system/user \u524D\u7684\u6307\u4EE4\uFF1B\u9009"\u65E0"\u5373\u4E0D\u542F\u7528',control:Me({value:t.bypass?.enabled&&t.bypass?.presetId||"",options:[{value:"",label:"\u2014\u2014 \u65E0 \u2014\u2014"},...o.map(l=>({value:l.id,label:`${l.name}${l.isDefault?" [\u9ED8\u8BA4]":""}`}))],onChange:l=>{let d=he(e)||{};je(e,{...d,bypass:{enabled:!!l,presetId:l||""}}),r()}})}));let a=Le.listPresets();n.appendChild(da({label:"\u6B63\u5219\u63D0\u53D6\u9884\u8BBE",hint:"\u51B3\u5B9A\u4ECE AI \u56DE\u590D\u4E2D\u5982\u4F55\u62BD\u53D6",control:Me({value:t.extraction?.regexPresetId||"",options:[{value:"",label:"\u2014\u2014 \u65E0\uFF08\u4E0D\u8FDB\u884C\u63D0\u53D6\uFF09 \u2014\u2014"},...a.map(l=>({value:l.id,label:l.name}))],onChange:l=>{let d=he(e)||{},c={...d.extraction||{},regexPresetId:l};if(l){let u=Le.getPreset(l);Pr.info(`\u5DF2\u7ED1\u5B9A\u6B63\u5219\u9884\u8BBE\uFF1A${u?.name||l}`,null,{toast:"success"})}else Pr.info("\u5DF2\u89E3\u7ED1\u6B63\u5219\u9884\u8BBE\uFF0C\u5DE5\u5177\u5C06\u4E0D\u8FDB\u884C\u5185\u5BB9\u63D0\u53D6",null,{toast:"success"});je(e,{...d,extraction:c}),r()}})}));let i=wt.listPresets();return n.appendChild(da({label:"\u4E16\u754C\u4E66\u9884\u8BBE",hint:"\u6CE8\u5165\u5230 prompt \u7684 {{toolWorldbookContent}}",control:Me({value:t.worldbooks?.presetId||"",options:[{value:"",label:"\u2014\u2014 \u65E0\uFF08\u4FDD\u7559\u5DE5\u5177\u539F\u6709\u4E16\u754C\u4E66\u8BBE\u7F6E\uFF09 \u2014\u2014"},...i.map(l=>({value:l.id,label:l.name}))],onChange:l=>{let d=he(e)||{},c={...d.worldbooks||{},presetId:l};if(l){let u=wt.getPreset(l);Pr.info(`\u5DF2\u7ED1\u5B9A\u4E16\u754C\u4E66\u9884\u8BBE\uFF1A${u?.name||l}`,null,{toast:"success"})}else Pr.info("\u5DF2\u89E3\u7ED1\u4E16\u754C\u4E66\u9884\u8BBE\uFF0C\u5DE5\u5177\u4E0D\u518D\u6CE8\u5165\u4E16\u754C\u4E66\u5185\u5BB9",null,{toast:"success"});je(e,{...d,worldbooks:c}),r()}})})),cr({heading:"\u7ED1\u5B9A",icon:"\u{1F517}",content:[n]})}function da({label:t,hint:e,control:r}){let n=f("div",{className:"yyt-tool-binding-row"}),s=f("div",{className:"yyt-tool-binding-label"});return s.appendChild(f("span",{className:"yyt-tool-binding-label-text",text:t})),e&&s.appendChild(f("span",{className:"yyt-tool-binding-label-hint",text:e})),n.appendChild(s),r.el.classList.add("small"),Object.assign(r.el.style,{padding:"7px 10px",fontSize:"12px"}),n.appendChild(r.el),n.appendChild(f("div",{className:"yyt-tool-binding-meta"})),n}function UT(t,e,r,n,s,o){let a=f("div",{style:{display:"flex",flexDirection:"column"}});a.appendChild(f("div",{style:{marginBottom:"8px",display:"flex",alignItems:"center",gap:"10px"}},f("div",{style:{flex:"1"}},f("div",{text:"\u63D0\u793A\u8BCD\u6A21\u677F",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}}),f("div",{text:"\u7528 {{macro}} \u5F15\u7528\u4E0A\u4E0B\u6587\u3002\u6A21\u677F\u5185\u5BB9\u4F1A\u4F5C\u4E3A\u53D1\u7ED9\u989D\u5916 AI \u7684 user \u6D88\u606F\u3002",style:{fontSize:"11px",color:"var(--yyt-text-muted)",lineHeight:"1.6"}})),te({label:"\u{1F504} \u91CD\u7F6E\u4E3A\u9ED8\u8BA4",size:"small",variant:"ghost",onClick:()=>{if(!window.confirm("\u7528\u5DE5\u5177\u9ED8\u8BA4\u6A21\u677F\u8986\u76D6\u5F53\u524D\u6A21\u677F\uFF1F"))return;let b=pi(e)||{},x=he(e)||{};je(e,{...x,promptTemplate:b.promptTemplate||""}),r()}}).el));let i=f("textarea",{className:"yyt-textarea yyt-code-textarea",attrs:{rows:"10",placeholder:"\u8F93\u5165\u63D0\u793A\u8BCD\u6A21\u677F..."},style:{width:"100%",resize:"vertical",fontFamily:"ui-monospace, monospace",fontSize:"12px",lineHeight:"1.7"}});i.value=t.promptTemplate||"",i.addEventListener("change",()=>{let b=he(e)||{};je(e,{...b,promptTemplate:i.value})}),a.appendChild(i),a.appendChild(f("div",{className:"yyt-macro-inline",html:"\u53EF\u7528\u5B8F\uFF1A<code>{{toolPromptMacro}}</code> <code>{{toolContentMacro}}</code> <code>{{toolWorldbookContent}}</code> <code>{{lastAiMessage}}</code> <code>{{recentMessagesText}}</code> <code>{{rawRecentMessagesText}}</code> <code>{{userMessage}}</code> <code>{{toolName}}</code> <code>{{toolId}}</code>"})),a.appendChild(f("hr",{className:"yyt-zone-divider"})),a.appendChild(f("div",{style:{marginBottom:"8px"}},f("div",{text:"\u63D0\u53D6\u914D\u7F6E",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}}),f("div",{text:'\u4ECE AI \u56DE\u590D\u4E2D\u62BD\u53D6\u5E76\u5199\u56DE\u3002\u5B8C\u6574\u89C4\u5219\u7531"\u6B63\u5219\u63D0\u53D6\u9884\u8BBE"\u51B3\u5B9A\uFF0C\u8FD9\u91CC\u53EA\u914D\u7F6E\u5DE5\u5177\u53C2\u6570\u3002',style:{fontSize:"11px",color:"var(--yyt-text-muted)",lineHeight:"1.6"}})));let l=f("div",{style:{display:"grid",gridTemplateColumns:"1fr auto",gap:"12px",alignItems:"end",marginBottom:"12px"}}),d=f("div",{className:"yyt-form-group",style:{margin:0}});d.appendChild(f("label",{text:"\u6700\u5927\u63D0\u53D6 AI \u6D88\u606F\u6570",style:{fontSize:"12px",fontWeight:"600",color:"var(--yyt-text-secondary, rgba(255,255,255,0.55))"}}));let c=f("input",{className:"yyt-input",attrs:{type:"number",min:"1",max:"50"},style:{padding:"7px 10px",fontSize:"12px"}});c.value=String(Number(t.extraction?.maxMessages)||5),c.addEventListener("change",()=>{let b=he(e)||{};je(e,{...b,extraction:{...b.extraction||{},maxMessages:Math.max(1,parseInt(c.value,10)||5)}})}),d.appendChild(c),l.appendChild(d);let u=f("div",{className:"yyt-form-group",style:{margin:0}});u.appendChild(f("label",{html:"&nbsp;",style:{fontSize:"12px"}})),u.appendChild(te({label:"\u{1F50D} \u6D4B\u8BD5\u63D0\u53D6",onClick:async()=>{try{let b=await Qi(e);FT(n,b,s,o)}catch(b){Pr.error(`\u6D4B\u8BD5\u63D0\u53D6\u5931\u8D25\uFF1A${b?.message||b}`,null,{toast:!0})}}}).el),l.appendChild(u),a.appendChild(l);let y=f("div",{className:"yyt-form-group",style:{margin:0}});y.appendChild(f("label",{html:'\u5199\u56DE\u6807\u7B7E <span style="font-size:10px;color:var(--yyt-text-muted);font-weight:500;">\uFF08\u591A\u6807\u7B7E\u63D0\u53D6\u65F6\u6307\u5B9A\u552F\u4E00\u5199\u56DE\u6807\u7B7E\uFF1B\u7559\u7A7A\u5219\u63D0\u53D6\u9996\u4E2A\uFF09</span>',style:{fontSize:"12px",fontWeight:"600",color:"var(--yyt-text-secondary, rgba(255,255,255,0.55))"}}));let p=`yyt-writeback-dl-${e}-${Math.random().toString(36).slice(2,6)}`,g=f("datalist",{attrs:{id:p}}),m=(()=>{let b=new Set,x=[];function w(I){if(I)for(let S of I.rules||[]){if(S?.enabled===!1||S?.type!=="include")continue;let A=String(S.value||"").trim();!A||b.has(A)||(b.add(A),x.push(A))}}let T=t.extraction?.regexPresetId;if(T)w(Le.getPreset(T));else for(let I of Le.listPresets())w(I);return x})();for(let b of m)g.appendChild(f("option",{attrs:{value:b}}));let h=f("input",{className:"yyt-input",attrs:{type:"text",placeholder:"\u5982 status / content\uFF08\u6765\u81EA\u6B63\u5219\u9884\u8BBE\u7684 include \u6807\u7B7E\uFF09",list:p,autocomplete:"off"},style:{padding:"7px 10px",fontSize:"12px"}});return h.value=t.extraction?.writebackTag||"",h.addEventListener("change",()=>{let b=he(e)||{};je(e,{...b,extraction:{...b.extraction||{},writebackTag:h.value.trim()}})}),y.appendChild(h),y.appendChild(g),a.appendChild(y),cr({heading:"\u914D\u7F6E",icon:"\u2699",content:[a]})}function FT(t,e,r,n){if(!ce()||!ze(t))return;let o=`${Ln}-${r||"extraction-preview"}`,a=Array.isArray(e?.messageEntries)?e.messageEntries:[],i=a.length>0?`
      <div class="yyt-form-group">
        <label>\u9010\u6761\u6D88\u606F\u9884\u89C8</label>
        <div class="yyt-preview-message-list">
          ${a.map((l,d)=>{let c=d===a.length-1?"\u6700\u65B0\u6D88\u606F":`\u6700\u8FD1\u7684\u7B2C ${a.length-d} \u6761\u6D88\u606F`;return`
              <div class="yyt-preview-message-item">
                <div class="yyt-preview-message-title">${vn(c)}</div>
                <div><label>\u539F\u6587</label><pre class="yyt-preview-box yyt-preview-pre">${vn(l.rawText||"\u65E0\u53EF\u7528\u6D88\u606F")}</pre></div>
                <div><label>\u6B63\u6587\u63D0\u53D6</label><pre class="yyt-preview-box yyt-preview-pre">${vn(l.filteredText||"\u6B63\u6587\u89C4\u5219\u672A\u547D\u4E2D")}</pre></div>
                <div><label>\u5DE5\u5177\u6807\u7B7E\u63D0\u53D6</label><pre class="yyt-preview-box yyt-preview-pre">${vn(l.extractedText||"\u672A\u63D0\u53D6\u5230\u5185\u5BB9")}</pre></div>
              </div>
            `}).join("")}
        </div>
      </div>
    `:"";t.append(vo({id:o,title:n,width:"720px",wide:!0,body:`
      <div class="yyt-form-group">
        <label>\u63D0\u53D6\u89C4\u5219</label>
        <div class="yyt-preview-box">${vn((e?.selectors||[]).join(`
`)||"\u65E0")}</div>
      </div>
      <div class="yyt-form-group">
        <label>\u539F\u59CB\u5185\u5BB9\u6C47\u603B</label>
        <pre class="yyt-preview-box yyt-preview-pre">${vn(e?.sourceText||"\u65E0\u53EF\u7528\u6D88\u606F")}</pre>
      </div>
      <div class="yyt-form-group">
        <label>\u6B63\u6587\u63D0\u53D6\u6C47\u603B</label>
        <pre class="yyt-preview-box yyt-preview-pre">${vn(e?.filteredSourceText||"\u6B63\u6587\u89C4\u5219\u672A\u547D\u4E2D")}</pre>
      </div>
      <div class="yyt-form-group">
        <label>\u5DE5\u5177\u6807\u7B7E\u63D0\u53D6\u6C47\u603B</label>
        <pre class="yyt-preview-box yyt-preview-pre">${vn(e?.extractedText||"\u672A\u63D0\u53D6\u5230\u5185\u5BB9")}</pre>
      </div>
      ${i}
    `})),So(t,o,{onSave:l=>l()}),t.find(`#${o}-save`).text("\u5173\u95ED"),t.find(`#${o}-cancel`).remove()}function vn(t){return t==null?"":String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var Pr,zd,WT,so=O(()=>{Wt();ut();ut();Ar();ws();Qs();Bd();J();ln();Ss();Pr=N.createScope("ToolConfigPanel"),zd=`
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
`;WT=Sn});var vm={};ge(vm,{SummaryToolPanel:()=>wm,default:()=>HT});var wm,HT,Sm=O(()=>{so();wm=Sn({id:"summaryToolPanel",toolId:"summaryTool",postResponseHint:"\u70B9\u51FB\u201C\u7ACB\u5373\u6267\u884C\u4E00\u6B21\u201D\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u8FDB\u884C\u6458\u8981\u89E3\u6790\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 boo_FM
\u6216 regex:<boo_FM>([\\s\\S]*?)</boo_FM>`,previewDialogId:"summary-extraction-preview",defaultInjectionOrder:1e4,lorebookLogTag:"SummaryToolPanel"}),HT=wm});var _m={};ge(_m,{StatusBlockPanel:()=>Tm,default:()=>qT});var Tm,qT,Em=O(()=>{so();Tm=Sn({id:"statusBlockPanel",toolId:"statusBlock",postResponseHint:"\u70B9\u51FB\u201C\u7ACB\u5373\u6267\u884C\u4E00\u6B21\u201D\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u751F\u6210\u4E3B\u89D2\u72B6\u6001\u680F\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 status_block
\u6216 regex:<status_block>([\\s\\S]*?)</status_block>`,previewDialogId:"status-extraction-preview",defaultInjectionOrder:10001,lorebookLogTag:"StatusBlockPanel"}),qT=Tm});var Cm={};ge(Cm,{YouyouReviewPanel:()=>Am,default:()=>GT});var Am,GT,km=O(()=>{so();Am=Sn({id:"youyouReviewPanel",toolId:"youyouReview",postResponseHint:"\u70B9\u51FB\u201C\u7ACB\u5373\u6267\u884C\u4E00\u6B21\u201D\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u5728\u672B\u5C3E\u751F\u6210\u5C0F\u5E7D\u70B9\u8BC4\u4E0E\u5267\u60C5\u94A9\u5B50\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 youyou
\u6216 regex:<youyou>([\\s\\S]*?)</youyou>`,previewDialogId:"youyou-review-extraction-preview",previewTitle:"\u5C0F\u5E7D\u70B9\u8BC4\u63D0\u53D6\u9884\u89C8"}),GT=Am});function Im(t){return t?t.length!==void 0&&typeof t.get=="function"?t.get(0):t:null}function YT(t){if(!Number.isFinite(t)||t<=0)return"\u4ECE\u672A";let e=Date.now()-t;if(e<6e4)return`${Math.floor(e/1e3)} \u79D2\u524D`;if(e<36e5)return`${Math.floor(e/6e4)} \u5206\u949F\u524D`;if(e<864e5)return`${Math.floor(e/36e5)} \u5C0F\u65F6\u524D`;try{return new Date(t).toLocaleString()}catch{return"\u672A\u77E5"}}function Tn(t){return t==null?"":String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Zi(t={}){let{id:e,toolId:r,previewDialogId:n,previewTitle:s="\u6D4B\u8BD5\u63D0\u53D6\u7ED3\u679C",processorDirections:o=[],processorOptions:a=[],heroHint:i=""}=t;return{id:e,toolId:r,renderTo(l){let d=Im(l);if(!d)return;if(d._yytLocalToolPanelCleanup)try{d._yytLocalToolPanelCleanup()}catch{}let c=()=>this.renderTo(l),u=he(r);if(!u){d.innerHTML='<div class="yyt-empty-state-small">\u5DE5\u5177\u914D\u7F6E\u52A0\u8F7D\u5931\u8D25</div>';return}let y=f("div",{className:"yyt-tool-panel",dataset:{toolId:r}}),p=[];y.appendChild(VT(u,r,c,o,i)),y.appendChild(JT(u));let g=XT(u,r,c);p.push(g),y.appendChild(g.el);let m=QT(u,r,c,l,o,a,n,s);p.push(m),y.appendChild(m.el),d.innerHTML="",d.appendChild(y),d._yytLocalToolPanelCleanup=()=>{for(let h of p)try{h.destroy()}catch{}delete d._yytLocalToolPanelCleanup}},destroy(l){let d=Im(l);if(d?._yytLocalToolPanelCleanup)try{d._yytLocalToolPanelCleanup()}catch{}},getStyles(){return""}}}function VT(t,e,r,n,s){let o=f("div",{className:"yyt-tool-panel-hero"}),a=f("div",{className:"yyt-tool-panel-hero-row1"});a.appendChild(f("div",{className:"yyt-tool-panel-hero-icon",text:"\u2699"})),a.appendChild(f("div",{className:"yyt-tool-panel-hero-name",text:t.name||e}));let i=f("div",{className:"yyt-tool-panel-hero-actions"});i.appendChild(te({label:"\u25B6 \u7ACB\u5373\u6267\u884C\u4E00\u6B21",size:"small",onClick:async()=>{try{await Xi(e),oo.info("\u5DF2\u89E6\u53D1\u624B\u52A8\u6267\u884C",null,{toast:"success"})}catch(m){oo.error(`\u6267\u884C\u5931\u8D25\uFF1A${m?.message||m}`,null,{toast:!0})}}}).el),i.appendChild(te({label:"\u{1F4BE} \u4FDD\u5B58\u914D\u7F6E",size:"small",variant:"primary",onClick:()=>{oo.info("\u914D\u7F6E\u5DF2\u4FDD\u5B58",null,{toast:"success"}),r()}}).el),a.appendChild(i),o.appendChild(a),t.description&&o.appendChild(f("div",{className:"yyt-tool-panel-hero-desc",text:t.description})),s&&o.appendChild(f("div",{className:"yyt-tool-panel-hero-desc",text:s}));let l=f("div",{className:"yyt-tool-panel-hero-chips"}),d=t.output?.autoTrigger!==!1;l.appendChild(f("span",{className:"yyt-tool-hero-chip mode",text:`\u672C\u5730\u811A\u672C\uFF08${d?"\u81EA\u52A8":"\u624B\u52A8"}\uFF09`}));let c=t.processor?.direction||n[0]?.key||"",u=n.find(m=>m.key===c)?.label||c;u&&l.appendChild(f("span",{className:"yyt-tool-hero-chip preset",text:`\u65B9\u5411: ${u}`}));let y=t.output?.overwrite!==!1;l.appendChild(f("span",{className:"yyt-tool-hero-chip preset",text:`\u5199\u56DE: ${y?"\u8986\u76D6":"\u8FFD\u52A0"}`}));let p=t.extraction?.regexPresetId||"";if(p){let m=Le.getPreset(p);m&&l.appendChild(f("span",{className:"yyt-tool-hero-chip preset",text:`\u6B63\u5219: ${m.name}`}))}let g=t.runtime?.lastStatus;if(g){let m=g==="success"?"status-success":g==="failed"?"status-failed":"";l.appendChild(f("span",{className:`yyt-tool-hero-chip ${m}`,text:`\u4E0A\u6B21\u6267\u884C \xB7 ${g}`}))}return o.appendChild(l),o}function JT(t){let e=f("div",{className:"yyt-tool-runtime-row"}),r=t.runtime||{},n=(a,i,l="")=>{let d=f("div",{className:"yyt-tool-runtime-stat"});return d.appendChild(f("span",{className:"yyt-tool-runtime-stat-label",text:a})),d.appendChild(f("span",{className:`yyt-tool-runtime-stat-value ${l}`,text:i})),d},s=r.lastStatus==="success"?"\u2713 \u4E0A\u6B21\u6210\u529F":r.lastStatus==="failed"?"\u2717 \u4E0A\u6B21\u5931\u8D25":"\u5F85\u547D",o=r.lastStatus==="success"?"success":r.lastStatus==="failed"?"error":"muted";return e.appendChild(n("\u72B6\u6001",s,o)),e.appendChild(n("\u6700\u8FD1\u8FD0\u884C",YT(r.lastRunAt),"muted")),e.appendChild(n("\u6210\u529F",String(r.successCount||0),"success")),e.appendChild(n("\u5931\u8D25",String(r.errorCount||0),r.errorCount?"error":"muted")),e}function XT(t,e,r){let n=f("div",{style:{display:"flex",flexDirection:"column"}}),s=Le.listPresets();return n.appendChild(Kd({label:"\u6B63\u5219\u63D0\u53D6\u9884\u8BBE",hint:"\u51B3\u5B9A\u4ECE AI \u56DE\u590D\u4E2D\u5982\u4F55\u62BD\u53D6\u8981\u672C\u5730\u5904\u7406\u7684\u6587\u672C",control:Me({value:t.extraction?.regexPresetId||"",options:[{value:"",label:"\u2014\u2014 \u65E0\uFF08\u4E0D\u8FDB\u884C\u63D0\u53D6\uFF09 \u2014\u2014"},...s.map(o=>({value:o.id,label:o.name}))],onChange:o=>{let a=he(e)||{},i={...a.extraction||{},regexPresetId:o};if(o){let l=Le.getPreset(o);oo.info(`\u5DF2\u7ED1\u5B9A\u6B63\u5219\u9884\u8BBE\uFF1A${l?.name||o}`,null,{toast:"success"})}else oo.info("\u5DF2\u89E3\u7ED1\u6B63\u5219\u9884\u8BBE\uFF0C\u5DE5\u5177\u5C06\u4E0D\u8FDB\u884C\u5185\u5BB9\u63D0\u53D6",null,{toast:"success"});je(e,{...a,extraction:i}),r()}})})),n.appendChild(Kd({label:"\u5199\u56DE\u65B9\u5F0F",hint:"\u5904\u7406\u540E\u7684\u7ED3\u679C\u5982\u4F55\u56DE\u5199\u5230 AI \u6D88\u606F",control:Me({value:t.output?.overwrite!==!1?"replace":"append",options:[{value:"replace",label:"\u8986\u76D6\u539F\u5DE5\u5177\u5757"},{value:"append",label:"\u8FFD\u52A0\u5230\u672B\u5C3E"}],onChange:o=>{let a=he(e)||{};je(e,{...a,output:{...a.output||{},overwrite:o==="replace",enabled:!0,mode:"local_transform"}}),r()}})})),n.appendChild(Kd({label:"\u81EA\u52A8\u89E6\u53D1",hint:"\u6536\u5230 AI \u56DE\u590D\u540E\u662F\u5426\u81EA\u52A8\u6267\u884C\u6B64\u811A\u672C",control:Me({value:t.output?.autoTrigger!==!1?"auto":"manual",options:[{value:"auto",label:"\u81EA\u52A8\uFF08\u6536\u5230\u56DE\u590D\u5373\u6267\u884C\uFF09"},{value:"manual",label:"\u624B\u52A8\uFF08\u4EC5\u70B9\u51FB\u6309\u94AE\u6267\u884C\uFF09"}],onChange:o=>{let a=he(e)||{};je(e,{...a,output:{...a.output||{},autoTrigger:o==="auto",enabled:!0,mode:"local_transform"}}),r()}})})),cr({heading:"\u7ED1\u5B9A",icon:"\u{1F517}",content:[n]})}function Kd({label:t,hint:e,control:r}){let n=f("div",{className:"yyt-tool-binding-row"}),s=f("div",{className:"yyt-tool-binding-label"});return s.appendChild(f("span",{className:"yyt-tool-binding-label-text",text:t})),e&&s.appendChild(f("span",{className:"yyt-tool-binding-label-hint",text:e})),n.appendChild(s),Object.assign(r.el.style,{padding:"7px 10px",fontSize:"12px"}),n.appendChild(r.el),n.appendChild(f("div",{className:"yyt-tool-binding-meta"})),n}function QT(t,e,r,n,s,o,a,i){let l=f("div",{style:{display:"flex",flexDirection:"column"}});l.appendChild(f("div",{style:{marginBottom:"10px"}},f("div",{text:"\u6267\u884C\u65B9\u5411",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}}),f("div",{text:"\u51B3\u5B9A\u672C\u5730\u811A\u672C\u8FD0\u884C\u54EA\u4E2A\u53D8\u6362\u8DEF\u5F84\u3002",style:{fontSize:"11px",color:"var(--yyt-text-muted)",lineHeight:"1.6"}})));let d=t.processor?.direction||s[0]?.key||"",c=Me({value:d,options:s.map(m=>({value:m.key,label:m.description?`${m.label} \u2014 ${m.description}`:m.label})),style:{padding:"7px 10px",fontSize:"12px"},onChange:m=>{let h=he(e)||{};je(e,{...h,processor:{...h.processor||{},direction:m}}),r()}});if(l.appendChild(c.el),l.appendChild(f("hr",{className:"yyt-zone-divider"})),o.length>0){l.appendChild(f("div",{style:{marginBottom:"10px"}},f("div",{text:"\u5904\u7406\u9879",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}}),f("div",{text:"\u52FE\u9009\u8981\u5305\u542B\u5728\u672C\u6B21\u53D8\u6362\u4E2D\u7684\u9879\u76EE\u3002",style:{fontSize:"11px",color:"var(--yyt-text-muted)",lineHeight:"1.6"}})));let m=f("div",{style:{display:"flex",flexDirection:"column"}}),h=t.processor?.options||{};for(let b of o){let x=Qe({label:b.label,hint:b.description||"",checked:h[b.key]===!0,onChange:w=>{let T=he(e)||{};je(e,{...T,processor:{...T.processor||{},options:{...T.processor?.options||{},[b.key]:w}}})}});m.appendChild(x.el)}l.appendChild(m),l.appendChild(f("hr",{className:"yyt-zone-divider"}))}l.appendChild(f("div",{style:{marginBottom:"10px"}},f("div",{text:"\u63D0\u53D6\u914D\u7F6E",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}}),f("div",{text:'\u4ECE AI \u56DE\u590D\u4E2D\u62BD\u53D6\u8981\u672C\u5730\u5904\u7406\u7684\u6587\u672C\u3002\u5B8C\u6574\u89C4\u5219\u7531"\u6B63\u5219\u63D0\u53D6\u9884\u8BBE"\u51B3\u5B9A\uFF0C\u8FD9\u91CC\u53EA\u914D\u7F6E\u5DE5\u5177\u53C2\u6570\u3002',style:{fontSize:"11px",color:"var(--yyt-text-muted)",lineHeight:"1.6"}})));let u=f("div",{style:{display:"grid",gridTemplateColumns:"1fr auto",gap:"12px",alignItems:"end"}}),y=f("div",{className:"yyt-form-group",style:{margin:0}});y.appendChild(f("label",{text:"\u6700\u5927\u63D0\u53D6 AI \u6D88\u606F\u6570",style:{fontSize:"12px",fontWeight:"600",color:"var(--yyt-text-secondary, rgba(255,255,255,0.55))"}}));let p=f("input",{className:"yyt-input",attrs:{type:"number",min:"1",max:"50"},style:{padding:"7px 10px",fontSize:"12px"}});p.value=String(Number(t.extraction?.maxMessages)||5),p.addEventListener("change",()=>{let m=he(e)||{};je(e,{...m,extraction:{...m.extraction||{},maxMessages:Math.max(1,parseInt(p.value,10)||5)}})}),y.appendChild(p),u.appendChild(y);let g=f("div",{className:"yyt-form-group",style:{margin:0}});return g.appendChild(f("label",{html:"&nbsp;",style:{fontSize:"12px"}})),g.appendChild(te({label:"\u{1F50D} \u6D4B\u8BD5\u63D0\u53D6",onClick:async()=>{try{let m=await Qi(e);ZT(n,m,a,i)}catch(m){oo.error(`\u6D4B\u8BD5\u63D0\u53D6\u5931\u8D25\uFF1A${m?.message||m}`,null,{toast:!0})}}}).el),u.appendChild(g),l.appendChild(u),cr({heading:"\u914D\u7F6E",icon:"\u2699",content:[l]})}function ZT(t,e,r,n){if(!ce()||!ze(t))return;let o=`${Ln}-${r||"extraction-preview"}`,a=Array.isArray(e?.messageEntries)?e.messageEntries:[],i=a.length>0?`
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
    `:"";t.append(vo({id:o,title:n,width:"720px",wide:!0,body:`
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
    `})),So(t,o,{onSave:l=>l()}),t.find(`#${o}-save`).text("\u5173\u95ED"),t.find(`#${o}-cancel`).remove()}var oo,jd=O(()=>{Wt();ut();Ar();Bd();J();so();ln();oo=N.createScope("LocalTransformToolPanel")});var Mm={};ge(Mm,{EscapeTransformToolPanel:()=>Rm,default:()=>e_});var Rm,e_,Pm=O(()=>{jd();Rm=Zi({id:"escapeTransformToolPanel",toolId:"escapeTransformTool",previewDialogId:"escape-transform-extraction-preview",previewTitle:"\u8F6C\u4E49\u5904\u7406\u63D0\u53D6\u9884\u89C8",heroHint:"\u4ECE\u6700\u8FD1 AI \u6D88\u606F\u63D0\u53D6\u6587\u672C\u540E\uFF0C\u5728\u672C\u5730\u6267\u884C\u8F6C\u4E49\u6216\u53BB\u8F6C\u4E49\uFF0C\u518D\u6309\u6240\u9009\u65B9\u5F0F\u5199\u56DE\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\u6216\u6B63\u5219\uFF0C\u4F8B\u5982\uFF1A
content
regex:<content>([\\s\\S]*?)</content>`,processorDirections:[{key:"escape",label:"\u8F6C\u4E49",description:"\u628A\u539F\u59CB\u5B57\u7B26\u8F6C\u6362\u6210\u8F6C\u4E49\u5E8F\u5217\u3002"},{key:"unescape",label:"\u53BB\u8F6C\u4E49",description:"\u628A\u8F6C\u4E49\u5E8F\u5217\u8FD8\u539F\u6210\u539F\u59CB\u5B57\u7B26\u3002"}],processorOptions:[{key:"doubleQuote",label:"\u53CC\u5F15\u53F7",description:'\u5904\u7406 " \u4E0E \\"\u3002'},{key:"singleQuote",label:"\u5355\u5F15\u53F7",description:"\u5904\u7406 ' \u4E0E \\'\u3002"},{key:"newline",label:"\u6362\u884C\u7B26",description:"\u5904\u7406\u6362\u884C\u4E0E \\n\u3002"}]}),e_=Rm});var $m={};ge($m,{PunctuationTransformToolPanel:()=>Nm,default:()=>t_});var Nm,t_,Lm=O(()=>{jd();Nm=Zi({id:"punctuationTransformToolPanel",toolId:"punctuationTransformTool",previewDialogId:"punctuation-transform-extraction-preview",previewTitle:"\u4E2D\u6587\u6807\u70B9\u66FF\u6362\u63D0\u53D6\u9884\u89C8",heroHint:"\u4ECE\u6700\u8FD1 AI \u6D88\u606F\u63D0\u53D6\u6587\u672C\u540E\uFF0C\u5728\u672C\u5730\u628A\u82F1\u6587\u6807\u70B9\u66FF\u6362\u6210\u4E2D\u6587\u6807\u70B9\uFF0C\u518D\u6309\u6240\u9009\u65B9\u5F0F\u5199\u56DE\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\u6216\u6B63\u5219\uFF0C\u4F8B\u5982\uFF1A
content
regex:<content>([\\s\\S]*?)</content>`,processorDirections:[{key:"en_to_zh",label:"\u82F1\u6587\u8F6C\u4E2D\u6587",description:"\u6309\u52FE\u9009\u9879\u628A\u82F1\u6587\u6807\u70B9\u66FF\u6362\u4E3A\u4E2D\u6587\u6807\u70B9\u3002"}],processorOptions:[{key:"comma",label:"\u9017\u53F7 ,",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u9017\u53F7\u3002"},{key:"period",label:"\u53E5\u53F7 .",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u53E5\u53F7\u3002"},{key:"exclamation",label:"\u611F\u53F9\u53F7 !",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u611F\u53F9\u53F7\u3002"},{key:"question",label:"\u95EE\u53F7 ?",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u95EE\u53F7\u3002"},{key:"semicolon",label:"\u5206\u53F7 ;",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u5206\u53F7\u3002"},{key:"colon",label:"\u5192\u53F7 :",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u5192\u53F7\u3002"},{key:"leftParen",label:"\u5DE6\u62EC\u53F7 (",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u5DE6\u62EC\u53F7\u3002"},{key:"rightParen",label:"\u53F3\u62EC\u53F7 )",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u53F3\u62EC\u53F7\u3002"}]}),t_=Nm});var Dm={};ge(Dm,{BypassPanel:()=>Om,default:()=>r_});var gt,Om,r_,Bm=O(()=>{ct();Qs();ut();J();gt=N.createScope("BypassPanel"),Om={id:"bypassPanel",_getActivePresetId(t){return t.find(".yyt-bypass-editor-content").data("presetId")||null},render(t){let e=be.getPresetList(),r=be.getDefaultPresetId();return`
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
    `},_renderPresetItem(t,e){let r=Hr&&Hr[t.id];return`
      <div class="yyt-bypass-preset-item ${e?"yyt-default":""}" data-preset-id="${t.id}">
        <div class="yyt-bypass-preset-info">
          <span class="yyt-bypass-preset-name">${me(t.name)}</span>
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
      `;let e=be.getDefaultPresetId()===t.id,r=Hr&&Hr[t.id];return`
      <div class="yyt-bypass-editor-content" data-preset-id="${t.id}">
        <div class="yyt-bypass-editor-header">
          <div class="yyt-bypass-editor-title">
            <input type="text" class="yyt-input yyt-bypass-name-input" 
                   value="${me(t.name)}" placeholder="\u9884\u8BBE\u540D\u79F0">
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
                 value="${me(t.description||"")}" placeholder="\u9884\u8BBE\u63CF\u8FF0\uFF08\u53EF\u9009\uFF09">
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
                  placeholder="\u8F93\u5165\u6D88\u606F\u5185\u5BB9...">${me(t.content||"")}</textarea>
      </div>
    `},bindEvents(t,e){let r=ce();!r||!ze(t)||(t.off(".yytBypass"),this._bindPresetListEvents(t,r),this._bindEditorEvents(t,r),this._bindFileEvents(t,r),br(t,{namespace:"yytBypassSelect",selectors:[".yyt-bypass-role-select"]}))},_bindPresetListEvents(t,e){t.on("click.yytBypass",".yyt-bypass-preset-item",r=>{if(e(r.target).closest(".yyt-bypass-quick-delete").length)return;let n=e(r.currentTarget).data("presetId");this._selectPreset(t,e,n)}),t.on("click.yytBypass",".yyt-bypass-quick-delete",async r=>{r.stopPropagation();let n=e(r.currentTarget).data("presetId");if(!n||!await Lr("\u5220\u9664\u9884\u8BBE","\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u4E2A\u9884\u8BBE\u5417\uFF1F",{danger:!0}))return;let o=be.deletePreset(n);o.success?(t.find(".yyt-bypass-editor-content").data("presetId")===n&&t.find(".yyt-bypass-editor").html(`
            <div class="yyt-bypass-empty">
              <i class="fa-solid fa-shield-halved"></i>
              <p>\u9009\u62E9\u6216\u521B\u5EFA Ai \u6307\u4EE4\u9884\u8BBE</p>
            </div>
          `),this._refreshPresetList(t,e),gt.info("\u9884\u8BBE\u5DF2\u5220\u9664",null,{toast:"success"})):gt.error(o?.message||"\u5220\u9664\u9884\u8BBE\u5931\u8D25",null,{toast:!0})}),t.on("click.yytBypass","#yyt-bypass-add",()=>{this._createNewPreset(t,e)})},_bindEditorEvents(t,e){t.on("click.yytBypass","#yyt-bypass-save",()=>{this._saveCurrentPreset(t,e)}),t.on("click.yytBypass","#yyt-bypass-delete",()=>{this._deleteCurrentPreset(t,e)}),t.on("click.yytBypass","#yyt-bypass-duplicate",()=>{this._duplicateCurrentPreset(t,e)}),t.on("click.yytBypass","#yyt-bypass-set-default",()=>{this._setAsDefault(t,e)}),t.on("click.yytBypass","#yyt-bypass-add-message",()=>{this._addMessage(t,e)}),t.on("click.yytBypass",".yyt-bypass-move-up",r=>{let n=e(r.currentTarget).closest(".yyt-bypass-message"),s=n.prev(".yyt-bypass-message");s.length&&(s.before(n),this._refreshMessageIndices(t,e))}),t.on("click.yytBypass",".yyt-bypass-move-down",r=>{let n=e(r.currentTarget).closest(".yyt-bypass-message"),s=n.next(".yyt-bypass-message");s.length&&(s.after(n),this._refreshMessageIndices(t,e))}),t.on("click.yytBypass",".yyt-bypass-insert-message",r=>{let n=e(r.currentTarget).closest(".yyt-bypass-message");this._insertMessageAfter(t,e,n)}),t.on("click.yytBypass",".yyt-bypass-delete-message",r=>{e(r.currentTarget).closest(".yyt-bypass-message").remove(),this._refreshMessageIndices(t,e)}),t.on("change.yytBypass",".yyt-bypass-message-enabled",r=>{e(r.currentTarget).closest(".yyt-bypass-message").toggleClass("yyt-disabled",!e(r.currentTarget).is(":checked"))})},_bindFileEvents(t,e){t.on("click.yytBypass","#yyt-bypass-import",()=>{t.find("#yyt-bypass-import-file").click()}),t.on("change.yytBypass","#yyt-bypass-import-file",async r=>{let n=r.target.files[0];if(n){try{let s=await _o(n),o=be.importPresets(s);o.success?gt.info(o.message,null,{toast:"success"}):gt.error(o.message,null,{toast:!0}),o.success&&this.renderTo(t)}catch(s){gt.error(`\u5BFC\u5165\u5931\u8D25: ${s.message}`,null,{toast:!0})}e(r.target).val("")}}),t.on("click.yytBypass","#yyt-bypass-export",()=>{try{let r=be.exportPresets();To(r,`bypass_presets_${Date.now()}.json`),gt.info("\u9884\u8BBE\u5DF2\u5BFC\u51FA",null,{toast:"success"})}catch(r){gt.error(`\u5BFC\u51FA\u5931\u8D25: ${r.message}`,null,{toast:!0})}})},_selectPreset(t,e,r){let n=be.getPreset(r);n&&(t.find(".yyt-bypass-preset-item").removeClass("yyt-active"),t.find(`.yyt-bypass-preset-item[data-preset-id="${r}"]`).addClass("yyt-active"),t.find(".yyt-bypass-editor").html(this._renderEditor(n)),br(t,{namespace:"yytBypassSelect",selectors:[".yyt-bypass-role-select"]}))},_createNewPreset(t,e){let r=`bypass_${Date.now()}`,n=be.createPreset({id:r,name:"\u65B0 Ai \u6307\u4EE4\u9884\u8BBE",description:"",messages:[]});n.success?(this.renderTo(t),this._selectPreset(t,e,r),gt.info("\u9884\u8BBE\u5DF2\u521B\u5EFA",null,{toast:"success"})):gt.error(n?.message||"\u521B\u5EFA\u9884\u8BBE\u5931\u8D25",null,{toast:!0})},_saveCurrentPreset(t,e){let r=t.find(".yyt-bypass-editor-content"),n=r.data("presetId");if(!n)return;let s=r.find(".yyt-bypass-name-input").val().trim(),o=r.find(".yyt-bypass-description-input").val().trim();if(!s){gt.warn("\u8BF7\u8F93\u5165\u9884\u8BBE\u540D\u79F0",null,{toast:!0}),r.find(".yyt-bypass-name-input").trigger("focus").trigger("select");return}let a=[];r.find(".yyt-bypass-message").each(function(){let l=e(this);a.push({id:l.data("messageId"),role:l.find(".yyt-bypass-role-select").val(),content:l.find(".yyt-bypass-message-content").val(),enabled:l.find(".yyt-bypass-message-enabled").is(":checked"),deletable:String(l.data("deletable"))!=="false"})});let i=be.updatePreset(n,{name:s,description:o,messages:a});i.success?(gt.info("\u9884\u8BBE\u5DF2\u4FDD\u5B58",null,{toast:"success"}),this._refreshPresetList(t,e)):gt.error(i?.message||"\u4FDD\u5B58\u9884\u8BBE\u5931\u8D25",null,{toast:!0})},async _deleteCurrentPreset(t,e){let n=t.find(".yyt-bypass-editor-content").data("presetId");if(!n||!await Lr("\u5220\u9664\u9884\u8BBE","\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u4E2A\u9884\u8BBE\u5417\uFF1F",{danger:!0}))return;let o=be.deletePreset(n);o.success?(this.renderTo(t),gt.info("\u9884\u8BBE\u5DF2\u5220\u9664",null,{toast:"success"})):gt.error(o?.message||"\u5220\u9664\u9884\u8BBE\u5931\u8D25",null,{toast:!0})},_duplicateCurrentPreset(t,e){let n=t.find(".yyt-bypass-editor-content").data("presetId");if(!n)return;let s=`bypass_${Date.now()}`,o=be.duplicatePreset(n,s);o.success?(this.renderTo(t),this._selectPreset(t,e,s),gt.info("\u9884\u8BBE\u5DF2\u590D\u5236",null,{toast:"success"})):gt.error(o?.message||"\u590D\u5236\u9884\u8BBE\u5931\u8D25",null,{toast:!0})},_setAsDefault(t,e){let n=t.find(".yyt-bypass-editor-content").data("presetId");if(!n)return;be.setDefaultPresetId(n),this._refreshPresetList(t,e);let s=be.getPreset(n);s&&t.find(".yyt-bypass-editor").html(this._renderEditor(s)),gt.info("\u5DF2\u8BBE\u4E3A\u9ED8\u8BA4\u9884\u8BBE",null,{toast:"success"})},_addMessage(t,e){let r=t.find(".yyt-bypass-messages"),n={id:`msg_${Date.now()}`,role:"SYSTEM",content:"",enabled:!0,deletable:!0},s=r.find(".yyt-bypass-message").length;r.append(this._renderMessageItem(n,s))},_insertMessageAfter(t,e,r){let n=t.find(".yyt-bypass-messages"),s={id:`msg_${Date.now()}`,role:"SYSTEM",content:"",enabled:!0,deletable:!0},o=this._renderMessageItem(s,0),a=e(o);r.after(a),this._refreshMessageIndices(t,e)},_refreshMessageIndices(t,e){t.find(".yyt-bypass-message").each(function(r){e(this).attr("data-message-index",r)})},_refreshPresetList(t,e){let r=be.getPresetList(),n=be.getDefaultPresetId(),s=this._getActivePresetId(t);t.find(".yyt-bypass-preset-list").html(r.map(o=>this._renderPresetItem(o,o.id===n)).join("")),s&&t.find(`.yyt-bypass-preset-item[data-preset-id="${s}"]`).addClass("yyt-active")},destroy(t){!ce()||!ze(t)||(Ut(t,"yytBypassSelect"),t.off(".yytBypass"))},getStyles(){return`
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
    `},renderTo(t){let e=this.render({});t.html(e),this.bindEvents(t,{})}},r_=Om});var Hd={};ge(Hd,{SettingsPanel:()=>pa,applyTheme:()=>Fm,applyUiPreferences:()=>Fd,default:()=>c_});function jm(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window}function ya(){return jm()?.document||document}function Um(t=ya()){return t?.documentElement||document.documentElement}function Fm(t,e=ya()){let r=Um(e),n={...n_,...zm[t]||zm["dark-blue"]};Object.entries(n).forEach(([s,o])=>{r.style.setProperty(s,o)}),r.setAttribute("data-yyt-theme",t)}function Fd(t={},e=ya()){let r=Um(e),{theme:n="dark-blue",compactMode:s=!1,animationEnabled:o=!0}=t||{};Fm(n,e),r.classList.toggle("yyt-compact-mode",!!s),r.classList.toggle("yyt-no-animation",!o)}function s_(){let t=new Map;return{add(e){return e?._id&&t.set(e._id,e),e},getControl(e){return t.get(e)||null},destroy(){for(let e of t.values())try{e.destroy?.()}catch{}t.clear()}}}function Wd(t){return f("i",{className:`fa-solid ${t}`})}function o_(t,e,r,n){let s=f("div",{className:"yyt-settings-hero"}),o=f("div",{className:"yyt-settings-hero-row1"});o.appendChild(f("div",{className:"yyt-settings-hero-icon"},[Wd("fa-sliders")])),o.appendChild(f("div",{className:"yyt-settings-hero-name",text:"\u5168\u5C40\u8BBE\u7F6E"}));let a=f("div",{className:"yyt-settings-hero-actions"});a.appendChild(te({label:"\u91CD\u7F6E\u4E3A\u9ED8\u8BA4",size:"small",icon:"\u21A9",onClick:r}).el),a.appendChild(te({label:"\u4FDD\u5B58\u8BBE\u7F6E",size:"small",variant:"primary",icon:"\u2713",onClick:n}).el),o.appendChild(a),s.appendChild(o),s.appendChild(f("div",{className:"yyt-settings-hero-desc",text:"\u7BA1\u7406\u6267\u884C\u5668\u3001\u81EA\u52A8\u5316\u3001\u8C03\u8BD5\u4E0E\u5916\u89C2\u504F\u597D\u3002"}));let i=t.ui||{},l=t.debug||{},d={"dark-blue":"\u6DF1\u84DD","dark-purple":"\u6DF1\u7D2B","dark-green":"\u6DF1\u7EFF",light:"\u6D45\u8272"}[i.theme]||"\u9ED8\u8BA4",c=f("div",{className:"yyt-settings-hero-chips"});return c.appendChild(f("span",{className:"yyt-settings-chip mode",text:`\u4E3B\u9898 ${d}`})),c.appendChild(f("span",{className:"yyt-settings-chip preset",text:`\u65E5\u5FD7 ${l.enableDebugLog?"DEBUG":"INFO"}`})),c.appendChild(f("span",{className:"yyt-settings-chip",text:`\u52A8\u753B ${i.animationEnabled===!1?"\u5173\u95ED":"\u5F00\u542F"}`})),c.appendChild(f("span",{className:"yyt-settings-chip",text:`\u7D27\u51D1 ${i.compactMode?"\u5F00":"\u5173"}`})),s.appendChild(c),s}function _n({icon:t,title:e,action:r=null},n=[]){let s=f("div",{className:"yyt-settings-section"}),o=f("div",{className:"yyt-settings-section-heading"});if(t){let a=f("span",{className:"yyt-settings-section-icon"});a.appendChild(Wd(t)),o.appendChild(a)}if(o.appendChild(f("span",{text:e})),r){let a=f("span",{className:"yyt-settings-section-action"});a.appendChild(r),o.appendChild(a)}s.appendChild(o);for(let a of n)a&&s.appendChild(a?.el?a.el:a);return s}function el({label:t,hint:e,control:r}){let n=f("div",{className:"yyt-settings-row"}),s=f("div",{className:"yyt-settings-row-label"});return s.appendChild(f("span",{className:"yyt-settings-row-label-text",text:t})),e&&s.appendChild(f("span",{className:"yyt-settings-row-label-hint",text:e})),n.appendChild(s),n.appendChild(r?.el?r.el:r),n}function Km({label:t,hint:e,leftLabel:r,leftControl:n,rightLabel:s,rightControl:o}){let a=f("div",{className:"yyt-settings-row-double"}),i=f("div",{className:"yyt-settings-row-label"});i.appendChild(f("span",{className:"yyt-settings-row-label-text",text:t})),e&&i.appendChild(f("span",{className:"yyt-settings-row-label-hint",text:e})),a.appendChild(i);let l=f("div",{className:"yyt-settings-row-double-cell"});r&&l.appendChild(f("span",{className:"yyt-settings-row-double-cell-label",text:r})),l.appendChild(n?.el?n.el:n),a.appendChild(l);let d=f("div",{className:"yyt-settings-row-double-cell"});return s&&d.appendChild(f("span",{className:"yyt-settings-row-double-cell-label",text:s})),d.appendChild(o?.el?o.el:o),a.appendChild(d),a}function ua({title:t,desc:e,control:r}){let n=f("div",{className:"yyt-settings-toggle-row"}),s=f("div",{className:"yyt-settings-toggle-info"});return s.appendChild(f("div",{className:"yyt-settings-toggle-title",text:t})),e&&s.appendChild(f("div",{className:"yyt-settings-toggle-desc",text:e})),n.appendChild(s),n.appendChild(r?.el?r.el:r),n}function tl(t){return f("div",{className:"yyt-settings-hint-note",html:t})}function a_(t){let e=t?.hostBinding||{},r=f("div",{className:"yyt-settings-stat-row"}),n=(s,o,a="")=>{let i=f("div",{className:"yyt-settings-stat"});return i.appendChild(f("span",{className:"yyt-settings-stat-label",text:s})),i.appendChild(f("span",{className:`yyt-settings-stat-value ${a}`.trim(),text:o})),i};return r.appendChild(n("\u670D\u52A1",t?.enabled?"\u8FD0\u884C\u4E2D":"\u672A\u542F\u7528",t?.enabled?"success":"error")),r.appendChild(n("\u76D1\u542C",e.initialized?"\u5DF2\u7ED1\u5B9A":"\u672A\u7ED1\u5B9A",e.initialized?"success":"error")),r.appendChild(n("\u5F85\u5904\u7406",String(t?.pendingTimerCount||0),t?.pendingTimerCount?"":"muted")),r.appendChild(n("\u6392\u961F\u69FD\u4F4D",String(t?.queuedSlotCount||0),t?.queuedSlotCount?"":"muted")),r}function i_(t){if(!t.length)return f("div",{className:"yyt-settings-hint-note",text:"\u6682\u65E0\u81EA\u52A8\u5316\u4E8B\u52A1\u8BB0\u5F55\u3002"});let e=f("div",{className:"yyt-runtime-list"});for(let r of t.slice(0,5)){let n=f("div",{className:"yyt-runtime-list-row"});n.appendChild(f("span",{className:"yyt-runtime-event",text:r?.sourceEvent||"UNKNOWN_EVENT"}));let s=r?.phase||"unknown",o="";s==="completed"||r?.verdict==="success"?o="success":(s==="failed"||r?.error)&&(o="error"),n.appendChild(f("span",{className:`yyt-runtime-phase ${o}`.trim(),text:s}));let a=[r?.messageId||"no_message_id",r?.verdict||r?.error||r?.generationKey||""].filter(Boolean).join(" \xB7 ");n.appendChild(f("span",{className:"yyt-runtime-main",text:a||"\u65E0\u989D\u5916\u4FE1\u606F"})),e.appendChild(n)}return e}function l_(){let t=or.getAvailableVariables(),e=f("div",{className:"yyt-macro-list"});for(let r of t){let n=f("div",{className:"yyt-macro-row"});n.appendChild(f("code",{text:r.name})),n.appendChild(f("span",{text:r.description})),e.appendChild(n)}return e}function ao(t,e,r,{min:n,max:s,step:o}={}){let a={};return n!=null&&(a.min=String(n)),s!=null&&(a.max=String(s)),o!=null&&(a.step=String(o)),t.add(ve({id:e,type:"number",value:String(r),attrs:a}))}var Ud,n_,zm,pa,c_,qd=O(()=>{Zs();J();Wi();ut();Wt();Ud=N.createScope("SettingsPanel"),n_={"--yyt-accent":"#7bb7ff","--yyt-accent-glow":"rgba(123, 183, 255, 0.4)","--yyt-accent-soft":"rgba(123, 183, 255, 0.15)","--yyt-accent-strong":"#a5d4ff","--yyt-on-accent":"#0a0d13","--yyt-bg-base":"#0a0d13","--yyt-surface":"#0f1219","--yyt-surface-2":"#151a24","--yyt-surface-3":"#1c2231","--yyt-surface-hover":"#1c2231","--yyt-surface-active":"#232b3e","--yyt-border":"rgba(255, 255, 255, 0.06)","--yyt-border-soft":"rgba(255, 255, 255, 0.04)","--yyt-border-strong":"rgba(255, 255, 255, 0.12)","--yyt-text":"rgba(255, 255, 255, 0.92)","--yyt-text-secondary":"rgba(255, 255, 255, 0.55)","--yyt-text-muted":"rgba(255, 255, 255, 0.35)","--yyt-focus-ring":"0 0 0 2px rgba(123, 183, 255, 1), 0 0 0 4px rgba(123, 183, 255, 0.15)","--yyt-control-bg":"#0f1219","--yyt-control-bg-hover":"#151a24","--yyt-control-bg-active":"#1c2231","--yyt-control-bg-strong":"#151a24","--yyt-control-bg-focus":"#151a24","--yyt-control-border":"rgba(255, 255, 255, 0.08)","--yyt-control-border-hover":"rgba(255, 255, 255, 0.14)","--yyt-control-border-focus":"rgba(123, 183, 255, 0.5)","--yyt-control-shadow":"none","--yyt-control-shadow-hover":"none","--yyt-control-shadow-focus":"none","--yyt-control-shadow-active":"none","--yyt-select-surface":"#151a24","--yyt-select-option-bg":"#1c2231","--yyt-select-option-hover-bg":"#232b3e","--yyt-select-option-selected-bg":"#2a3450","--yyt-select-option-border":"rgba(123, 183, 255, 0.15)","--yyt-select-option-selected-border":"rgba(123, 183, 255, 0.3)","--yyt-select-dropdown-shadow":"0 8px 24px rgba(0, 0, 0, 0.4)","--yyt-select-arrow-color":"rgba(255, 255, 255, 0.4)"},zm={"dark-blue":{"--yyt-on-accent":"#0a0d13"},"dark-purple":{"--yyt-accent":"#a78bfa","--yyt-accent-glow":"rgba(167, 139, 250, 0.4)","--yyt-accent-soft":"rgba(167, 139, 250, 0.15)","--yyt-accent-strong":"#c4b5fd","--yyt-bg-base":"#0d0a14","--yyt-surface":"#12101c","--yyt-surface-2":"#1a1726","--yyt-surface-3":"#221e32","--yyt-surface-hover":"#221e32","--yyt-surface-active":"#2a2540","--yyt-on-accent":"#0d0a14","--yyt-control-bg":"#12101c","--yyt-control-bg-hover":"#1a1726","--yyt-control-bg-active":"#221e32","--yyt-control-bg-strong":"#1a1726","--yyt-control-bg-focus":"#1a1726","--yyt-control-border-focus":"rgba(167, 139, 250, 0.5)","--yyt-select-surface":"#1a1726","--yyt-select-option-bg":"#221e32","--yyt-select-option-hover-bg":"#2a2540","--yyt-select-option-selected-bg":"#332d50","--yyt-select-option-border":"rgba(167, 139, 250, 0.15)","--yyt-select-option-selected-border":"rgba(167, 139, 250, 0.3)","--yyt-focus-ring":"0 0 0 2px rgba(167, 139, 250, 1), 0 0 0 4px rgba(167, 139, 250, 0.15)"},"dark-green":{"--yyt-accent":"#4ade80","--yyt-accent-glow":"rgba(74, 222, 128, 0.4)","--yyt-accent-soft":"rgba(74, 222, 128, 0.15)","--yyt-accent-strong":"#86efac","--yyt-bg-base":"#0a120d","--yyt-surface":"#0f1912","--yyt-surface-2":"#151f1a","--yyt-surface-3":"#1c2824","--yyt-surface-hover":"#1c2824","--yyt-surface-active":"#233530","--yyt-on-accent":"#0a120d","--yyt-control-bg":"#0f1912","--yyt-control-bg-hover":"#151f1a","--yyt-control-bg-active":"#1c2824","--yyt-control-bg-strong":"#151f1a","--yyt-control-bg-focus":"#151f1a","--yyt-control-border-focus":"rgba(74, 222, 128, 0.5)","--yyt-select-surface":"#151f1a","--yyt-select-option-bg":"#1c2824","--yyt-select-option-hover-bg":"#233530","--yyt-select-option-selected-bg":"#2a4038","--yyt-select-option-border":"rgba(74, 222, 128, 0.15)","--yyt-select-option-selected-border":"rgba(74, 222, 128, 0.3)","--yyt-focus-ring":"0 0 0 2px rgba(74, 222, 128, 1), 0 0 0 4px rgba(74, 222, 128, 0.15)"},light:{"--yyt-accent":"#3b82f6","--yyt-accent-glow":"rgba(59, 130, 246, 0.3)","--yyt-accent-soft":"rgba(59, 130, 246, 0.1)","--yyt-accent-strong":"#93c5fd","--yyt-bg-base":"#f5f7fa","--yyt-surface":"#edf0f5","--yyt-surface-2":"#e4e8ef","--yyt-surface-3":"#dbe0e9","--yyt-surface-hover":"#dbe0e9","--yyt-surface-active":"#d1d7e2","--yyt-text":"rgba(15, 23, 42, 0.92)","--yyt-text-secondary":"rgba(15, 23, 42, 0.55)","--yyt-text-muted":"rgba(15, 23, 42, 0.35)","--yyt-border":"rgba(15, 23, 42, 0.08)","--yyt-border-soft":"rgba(15, 23, 42, 0.04)","--yyt-border-strong":"rgba(15, 23, 42, 0.14)","--yyt-focus-ring":"0 0 0 2px rgba(59, 130, 246, 1), 0 0 0 4px rgba(59, 130, 246, 0.12)","--yyt-on-accent":"#ffffff","--yyt-control-bg":"#edf0f5","--yyt-control-bg-hover":"#e4e8ef","--yyt-control-bg-active":"#dbe0e9","--yyt-control-bg-strong":"#e4e8ef","--yyt-control-bg-focus":"#e4e8ef","--yyt-control-border":"rgba(15, 23, 42, 0.1)","--yyt-control-border-hover":"rgba(15, 23, 42, 0.18)","--yyt-control-border-focus":"rgba(59, 130, 246, 0.5)","--yyt-control-shadow":"none","--yyt-control-shadow-hover":"none","--yyt-control-shadow-focus":"none","--yyt-control-shadow-active":"none","--yyt-select-surface":"#e4e8ef","--yyt-select-option-bg":"#edf0f5","--yyt-select-option-hover-bg":"#dbe0e9","--yyt-select-option-selected-bg":"#dbeafe","--yyt-select-option-border":"rgba(59, 130, 246, 0.12)","--yyt-select-option-selected-border":"rgba(59, 130, 246, 0.3)","--yyt-select-dropdown-shadow":"0 8px 24px rgba(15, 23, 42, 0.1)","--yyt-select-arrow-color":"rgba(15, 23, 42, 0.4)"}};pa={id:"settingsPanel",_instance:null,_getAutomationRuntime(){try{return jm()?.YouYouToolkit?.getAutomationRuntime?.()||null}catch{return null}},renderTo(t){if(!ce()||!t?.length)return;let r=St.getSettings(),n=r.executor||{},s=r.automation||{},o=r.debug||{},a=r.ui||{},i=this._getAutomationRuntime(),l=Array.isArray(i?.recentTransactions)?i.recentTransactions.slice().reverse():[],d=i?.hostBinding||{},c=s_(),u=async()=>{await Lr("\u91CD\u7F6E\u8BBE\u7F6E","\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u8BBE\u7F6E\u4E3A\u9ED8\u8BA4\u503C\u5417\uFF1F",{danger:!0})&&(St.resetSettings(),Fd(aa.ui,ya()),pa.renderTo(t),Ud.info("\u8BBE\u7F6E\u5DF2\u91CD\u7F6E",null,{toast:"success"}))},y=()=>{pa._saveFromControls(c,t)},p=f("div",{className:"yyt-settings-panel"});p.appendChild(o_(r,i,u,y));let g=new Map,m=f("div",{className:"yyt-settings-tabs"}),h=[{id:"executor",label:"\u6267\u884C\u5668",icon:"fa-microchip"},{id:"debug",label:"\u8C03\u8BD5",icon:"fa-bug"},{id:"ui",label:"\u5916\u89C2",icon:"fa-palette"}],b=new Map,x=_=>{for(let[$,F]of b)F.classList.toggle("yyt-active",$===_);for(let[$,F]of g)F.classList.toggle("yyt-active",$===_)};for(let _ of h){let $=f("button",{className:"yyt-settings-tab"+(_.id==="executor"?" yyt-active":""),attrs:{type:"button"}});$.appendChild(Wd(_.icon)),$.appendChild(f("span",{text:_.label})),$.addEventListener("click",()=>x(_.id)),m.appendChild($),b.set(_.id,$)}p.appendChild(m);let w=f("div",{className:"yyt-settings-scroll"}),T=f("div",{className:"yyt-settings-body"});w.appendChild(T);let I=f("div",{className:"yyt-settings-tab-pane yyt-active"});I.appendChild(_n({icon:"fa-gauge-high",title:"\u6267\u884C\u9650\u5236"},[el({label:"\u6700\u5927\u5E76\u53D1\u6570",hint:"\u540C\u65F6\u6267\u884C\u7684\u5DE5\u5177\u6570\u91CF\u4E0A\u9650\uFF081 ~ 10\uFF09",control:ao(c,"maxConcurrent",n.maxConcurrent??3,{min:1,max:10})}),el({label:"\u961F\u5217\u5904\u7406\u65B9\u5F0F",hint:"\u51B3\u5B9A\u5F85\u6267\u884C\u5DE5\u5177\u7684\u6392\u961F\u987A\u5E8F",control:c.add(Me({id:"queueStrategy",options:[{value:"fifo",label:"FIFO (\u5148\u8FDB\u5148\u51FA)"},{value:"lifo",label:"LIFO (\u540E\u8FDB\u5148\u51FA)"},{value:"priority",label:"\u4F18\u5148\u7EA7\u6392\u5E8F"}],value:n.queueStrategy||"fifo"}))})])),I.appendChild(_n({icon:"fa-rotate-right",title:"\u91CD\u8BD5\u4E0E\u8D85\u65F6"},[Km({label:"\u91CD\u8BD5\u7B56\u7565",hint:"\u5931\u8D25\u540E\u81EA\u52A8\u91CD\u8BD5\u7684\u6B21\u6570\u4E0E\u95F4\u9694",leftLabel:"\u6B21\u6570",leftControl:ao(c,"maxRetries",n.maxRetries??2,{min:0,max:10}),rightLabel:"\u95F4\u9694 ms",rightControl:ao(c,"retryDelayMs",n.retryDelayMs??5e3,{min:1e3,max:6e4,step:1e3})}),el({label:"\u8BF7\u6C42\u8D85\u65F6\u65F6\u95F4 (ms)",hint:"\u5355\u4E2A\u8BF7\u6C42\u8D85\u8FC7\u8BE5\u65F6\u957F\u5C06\u81EA\u52A8\u4E2D\u65AD",control:ao(c,"requestTimeoutMs",n.requestTimeoutMs??9e4,{min:1e4,max:3e5,step:1e4})})])),I.appendChild(_n({icon:"fa-bolt",title:"\u81EA\u52A8\u89E6\u53D1"},[tl("\u7531\u5404\u5DE5\u5177\u7684 <code>output_mode</code> \u51B3\u5B9A\u54EA\u4E9B\u5DE5\u5177\u81EA\u52A8\u89E6\u53D1\u3002\u8FD9\u91CC\u53EA\u63A7\u5236\u5168\u5C40\u8282\u6D41\u65F6\u95F4\u3002"),Km({label:"\u8282\u6D41\u53C2\u6570",hint:"\u7B49\u5F85\u7A33\u5B9A\u540E\u89E6\u53D1\uFF0C\u89E6\u53D1\u540E\u518D\u51B7\u5374",leftLabel:"\u7A33\u5B9A ms",leftControl:ao(c,"automationSettleMs",s.settleMs??1200,{min:0,max:1e4,step:100}),rightLabel:"\u51B7\u5374 ms",rightControl:ao(c,"automationCooldownMs",s.cooldownMs??5e3,{min:0,max:6e4,step:100})})]));let S=[a_(i)],A=Array.isArray(d.eventBindings)&&d.eventBindings.length>0?d.eventBindings.join(" / "):"\u6682\u65E0\u4E8B\u4EF6\u7ED1\u5B9A";S.push(tl(`\u4E8B\u4EF6\u6E90: <code>${d.source||"unavailable"}</code>\uFF1B\u4E8B\u4EF6: <code>${A}</code>`)),d.lastError&&S.push(tl(`\u6700\u8FD1\u9519\u8BEF: <code>${d.lastError}</code>`)),S.push(i_(l)),I.appendChild(_n({icon:"fa-magnifying-glass-chart",title:"\u81EA\u52A8\u89E6\u53D1\u8BCA\u65AD"},S)),T.appendChild(I),g.set("executor",I);let P=f("div",{className:"yyt-settings-tab-pane"});P.appendChild(_n({icon:"fa-terminal",title:"\u65E5\u5FD7\u4E0E\u5386\u53F2"},[ua({title:"\u542F\u7528\u8C03\u8BD5\u65E5\u5FD7",desc:"\u5F00\u542F\u540E Logger \u9762\u677F\u5C06\u8BB0\u5F55 DEBUG \u7EA7\u522B\u65E5\u5FD7\uFF0C\u5173\u95ED\u4EC5\u8BB0\u5F55 INFO \u53CA\u4EE5\u4E0A",control:c.add(Qe({id:"enableDebugLog",checked:o.enableDebugLog}))}),ua({title:"\u4FDD\u5B58\u6267\u884C\u5386\u53F2",desc:"\u8BB0\u5F55\u5DE5\u5177\u6267\u884C\u5386\u53F2\uFF0C\u4FBF\u4E8E\u95EE\u9898\u6392\u67E5",control:c.add(Qe({id:"saveExecutionHistory",checked:o.saveExecutionHistory}))})])),P.appendChild(_n({icon:"fa-eye",title:"\u663E\u793A\u8F85\u52A9"},[ua({title:"\u663E\u793A\u8FD0\u884C\u72B6\u6001\u5FBD\u7AE0",desc:"\u5728\u5DE5\u5177\u5361\u7247\u4E0A\u663E\u793A\u8FD0\u884C\u72B6\u6001\u6307\u793A\u5668",control:c.add(Qe({id:"showRuntimeBadge",checked:o.showRuntimeBadge}))})])),T.appendChild(P),g.set("debug",P);let M=f("div",{className:"yyt-settings-tab-pane"});M.appendChild(_n({icon:"fa-palette",title:"\u4E3B\u9898\u4E0E\u52A8\u6548"},[el({label:"\u4E3B\u9898",hint:"\u5207\u6362\u540E\u4FDD\u5B58\u5373\u53EF\u5E94\u7528\u5230\u5168\u5C40\u754C\u9762",control:c.add(Me({id:"theme",options:[{value:"dark-blue",label:"\u6DF1\u84DD"},{value:"dark-purple",label:"\u6DF1\u7D2B"},{value:"dark-green",label:"\u6DF1\u7EFF"},{value:"light",label:"\u6D45\u8272"}],value:a.theme||"dark-blue"}))}),ua({title:"\u7D27\u51D1\u6A21\u5F0F",desc:"\u51CF\u5C11\u5361\u7247\u95F4\u8DDD\uFF0C\u663E\u793A\u66F4\u591A\u5185\u5BB9",control:c.add(Qe({id:"compactMode",checked:a.compactMode}))}),ua({title:"\u542F\u7528\u52A8\u753B\u6548\u679C",desc:"\u754C\u9762\u8FC7\u6E21\u548C\u4EA4\u4E92\u52A8\u753B",control:c.add(Qe({id:"animationEnabled",checked:a.animationEnabled}))})])),M.appendChild(_n({icon:"fa-code",title:"\u6A21\u677F\u5B8F\u8BF4\u660E"},[tl("\u5DE5\u5177\u6A21\u677F\u91CC\u53EF\u76F4\u63A5\u4F7F\u7528\u4E0B\u9762\u8FD9\u4E9B\u5B8F\u3002\u4E16\u754C\u4E66\u5185\u5BB9\u53EA\u6709\u5728\u6A21\u677F\u91CC\u663E\u5F0F\u5199\u5165 <code>{{toolWorldbookContent}}</code> \u65F6\u624D\u4F1A\u6CE8\u5165\u3002"),l_()])),T.appendChild(M),g.set("ui",M),p.appendChild(w),t.empty().append(p),this._instance={root:c,_tabPanels:g};let R=St.getDebugSettings();N.setLevel(R.enableDebugLog?Se.DEBUG:Se.INFO)},_saveFromControls(t,e){let r=o=>{let a=t.getControl(o);return a?a.get():null},n=[{id:"maxConcurrent",min:1,max:10,label:"\u6700\u5927\u5E76\u53D1\u6570"},{id:"maxRetries",min:0,max:10,label:"\u6700\u5927\u91CD\u8BD5\u6B21\u6570"},{id:"retryDelayMs",min:1e3,max:6e4,label:"\u91CD\u8BD5\u95F4\u9694"},{id:"requestTimeoutMs",min:1e4,max:3e5,label:"\u8BF7\u6C42\u8D85\u65F6\u65F6\u95F4"},{id:"automationSettleMs",min:0,max:1e4,label:"\u7B49\u5F85\u7A33\u5B9A\u65F6\u95F4"},{id:"automationCooldownMs",min:0,max:6e4,label:"\u81EA\u52A8\u5316\u51B7\u5374\u65F6\u95F4"}];for(let o of n){let a=r(o.id),i=parseInt(a,10);if(isNaN(i)||i<o.min||i>o.max){Ud.warn(`${o.label} \u987B\u5728 ${o.min} ~ ${o.max} \u4E4B\u95F4`,null,{toast:!0});let l=t.getControl(o.id);l?.focus&&l.focus(),l?.select&&l.select();return}}let s={executor:{maxConcurrent:parseInt(r("maxConcurrent"),10)||3,maxRetries:parseInt(r("maxRetries"),10)||2,retryDelayMs:parseInt(r("retryDelayMs"),10)||5e3,requestTimeoutMs:parseInt(r("requestTimeoutMs"),10)||9e4,queueStrategy:r("queueStrategy")||"fifo"},automation:{settleMs:parseInt(r("automationSettleMs"),10)||1200,cooldownMs:parseInt(r("automationCooldownMs"),10)||5e3,maxConcurrentSlots:St.getSettings()?.automation?.maxConcurrentSlots||1},debug:{enableDebugLog:!!r("enableDebugLog"),saveExecutionHistory:!!r("saveExecutionHistory"),showRuntimeBadge:!!r("showRuntimeBadge")},ui:{theme:r("theme")||"dark-blue",compactMode:!!r("compactMode"),animationEnabled:!!r("animationEnabled")}};St.saveSettings(s),N.setLevel(s.debug.enableDebugLog?Se.DEBUG:Se.INFO),Fd(s.ui,ya()),Ud.info("\u8BBE\u7F6E\u5DF2\u4FDD\u5B58",null,{toast:"success"}),pa.renderTo(e)},render(){return""},getStyles(){return""},bindEvents(){},destroy(t){if(this._instance?.root)try{this._instance.root.destroy()}catch{}this._instance=null,ce()&&t?.length&&t.empty()}},c_=pa});function d_(t={},e=-1){return[t?.sourceId,t?.messageId,t?.message_id,t?.id,t?.mid,t?.mesid,t?.mes_id,t?.chat_index,t?.index,e].map(r=>$e(r))}function u_(t=[],e=""){let r=$e(e);if(!r||!Array.isArray(t))return-1;for(let n=t.length-1;n>=0;n-=1){let s=t[n];if(d_(s,n).includes(r))return n}return-1}function fa(t={},e={}){let r=$e(t?.sourceMessageId||t?.confirmedAssistantMessageId||t?.messageId);if(!r)return null;let n=Hc({resolvedAt:Date.now(),runSource:e.runSource||t?.runSource||yt.MANUAL,traceId:t?.traceId||"",chatId:t?.chatId||"",sourceMessageId:r,sourceSwipeId:t?.sourceSwipeId||t?.effectiveSwipeId||"",effectiveSwipeId:t?.effectiveSwipeId||t?.sourceSwipeId||"swipe:current",slotBindingKey:t?.slotBindingKey||"",slotRevisionKey:t?.slotRevisionKey||"",slotTransactionId:t?.slotTransactionId||"",assistantContentFingerprint:t?.assistantContentFingerprint||"",assistantBaseFingerprint:t?.assistantBaseFingerprint||"",assistantText:t?.lastAiMessage||"",assistantBaseText:t?.assistantBaseText||"",targetMessageIndex:u_(t?.chatMessages||t?.chatHistory||[],r)});return!n.slotBindingKey||!n.slotRevisionKey?null:n}async function ga({runSource:t=yt.MANUAL}={}){let e=await Un({runSource:t});return fa(e,{runSource:t})}async function p_({messageId:t,swipeId:e="",runSource:r=yt.AUTO}={}){let n=await Fn({messageId:t,swipeId:e,runSource:r});return fa(n,{runSource:r})}async function Wm(t=null,e={}){let r=t||null;if(typeof e.resolveTarget=="function")return await e.resolveTarget(r);let n=$e(e.runSource||r?.runSource)||yt.MANUAL,s=$e(e.messageId||r?.sourceMessageId),o=$e(e.swipeId||r?.sourceSwipeId||r?.effectiveSwipeId);return e.useMessageTarget===!0||n===yt.AUTO?s?p_({messageId:s,swipeId:o,runSource:n}):null:ga({runSource:n})}function Hm(t,e){let r=t||null,n=e||null;return!r||!n?{valid:!1,reason:"missing_target_snapshot"}:$e(r.sourceMessageId)!==$e(n.sourceMessageId)?{valid:!1,reason:"source_message_changed"}:$e(r.sourceSwipeId||r.effectiveSwipeId)!==$e(n.sourceSwipeId||n.effectiveSwipeId)?{valid:!1,reason:"source_swipe_changed"}:$e(r.slotRevisionKey)!==$e(n.slotRevisionKey)?{valid:!1,reason:"slot_revision_changed"}:{valid:!0,reason:"ok"}}var ma=O(()=>{Wn();Fe()});function qr(t,e=""){return t==null?e:String(t).trim()||e}function y_(t){if(!t||t?.is_user===!0||t?.is_system===!0)return!1;let e=String(t?.role||"").trim().toLowerCase();return e==="assistant"||e==="ai"||!e}function f_(t){return!t||typeof t!="object"||Array.isArray(t)?!1:!!(Array.isArray(t.tables)||typeof t.chatId=="string"&&t.chatId.length>0||typeof t.slotBindingKey=="string"&&t.slotBindingKey.length>0)}function qm(t,e){if(!t)return null;let r=t[cn];if(!r)return null;let n=Oe(e);return f_(r)?n===Lt?r:null:r[n]||null}function ha({loadMode:t=Xn.EMPTY,mergeBaseOnly:e=!1,state:r=null,sourceKind:n=Gt.EMPTY,resolvedFromMessageId:s="",resolvedFromRevisionKey:o=""}={}){let a=kr(r)||null;return{loadMode:t,mergeBaseOnly:e,state:a,sourceKind:n,resolvedFromMessageId:qr(s,a?.sourceMessageId||""),resolvedFromRevisionKey:qr(o,a?.slotRevisionKey||"")}}function Gd(t,e={}){let r=kr(t);return r?kr({...r,meta:{...r.meta||{},...e||{}}}):null}function Gm({runtime:t,targetSnapshot:e,currentMessageIndex:r=-1,templateTables:n=[],isolationKey:s}={}){let o=Array.isArray(t?.chat)?t.chat:[],a=qr(e?.slotRevisionKey,""),i=qr(e?.slotBindingKey,""),l=Oe(s===void 0?"":s);if(r>=0&&r<o.length){let d=qm(o[r],l),c=kr(d);if(c&&qr(c.slotRevisionKey,"")===a)return ha({loadMode:Xn.EXACT,mergeBaseOnly:!1,state:Gd(c,{sourceKind:Gt.EXACT,isolationKey:l,resolvedFromMessageId:c.sourceMessageId,resolvedFromRevisionKey:c.slotRevisionKey}),sourceKind:Gt.EXACT,resolvedFromMessageId:c.sourceMessageId,resolvedFromRevisionKey:c.slotRevisionKey});if(c&&qr(c.slotBindingKey,"")===i){let u=Gd({...c,slotRevisionKey:a||c.slotRevisionKey,sourceSwipeId:qr(e?.sourceSwipeId||e?.effectiveSwipeId,c.sourceSwipeId),meta:{...c.meta||{},sourceKind:Gt.BINDING,mergeBaseOnly:!0,fallbackFromBinding:!0,isolationKey:l,fallbackFromRevisionKey:qr(c.slotRevisionKey,""),requestedRevisionKey:a,resolvedFromMessageId:c.sourceMessageId,resolvedFromRevisionKey:c.slotRevisionKey}});return ha({loadMode:Xn.BINDING_FALLBACK,mergeBaseOnly:!0,state:u,sourceKind:Gt.BINDING,resolvedFromMessageId:c.sourceMessageId,resolvedFromRevisionKey:c.slotRevisionKey})}}if(r>0)for(let d=r-1;d>=0;d-=1){let c=o[d];if(!y_(c))continue;let u=qm(c,l),y=kr(u);if(!y||!Array.isArray(y.tables)||y.tables.length===0)continue;let p=Gd({...y,slotBindingKey:i||y.slotBindingKey,slotRevisionKey:a||y.slotRevisionKey,sourceSwipeId:qr(e?.sourceSwipeId||e?.effectiveSwipeId,y.sourceSwipeId),meta:{...y.meta||{},sourceKind:Gt.HISTORY,mergeBaseOnly:!0,reconstructedFromHistory:!0,isolationKey:l,resolvedFromMessageId:y.sourceMessageId,resolvedFromRevisionKey:y.slotRevisionKey}});return ha({loadMode:Xn.HISTORY,mergeBaseOnly:!0,state:p,sourceKind:Gt.HISTORY,resolvedFromMessageId:y.sourceMessageId,resolvedFromRevisionKey:y.slotRevisionKey})}return Array.isArray(n)&&n.length>0?ha({loadMode:Xn.TEMPLATE,mergeBaseOnly:!1,state:Vo(e,{tables:pe(n),meta:{fromTemplate:!0,isolationKey:l,sourceKind:Gt.TEMPLATE,resolvedFromMessageId:"",resolvedFromRevisionKey:""}}),sourceKind:Gt.TEMPLATE}):ha({loadMode:Xn.EMPTY,mergeBaseOnly:!1,state:Vo(e,{meta:{isolationKey:l,sourceKind:Gt.EMPTY,resolvedFromMessageId:"",resolvedFromRevisionKey:""}}),sourceKind:Gt.EMPTY})}var Ym=O(()=>{Fe()});function Vm(){return Yd||(Yd=N.createScope("TableStateMirror")),Yd}async function g_(t,e,r){try{await st(),await Mi({chatId:t?.chatId,messageId:t?.sourceMessageId,swipeId:t?.sourceSwipeId||t?.effectiveSwipeId,isolationKey:e},Array.isArray(r)?r:[]),Vm().info("slot \u5DF2\u955C\u50CF\u5230 SQL",{chatId:t?.chatId,messageId:t?.sourceMessageId,tableCount:r?.length||0})}catch(n){Vm().warn("SQL \u955C\u50CF\u5931\u8D25\uFF08\u4E0D\u5F71\u54CD\u4E3B\u6D41\u7A0B\uFF09",{error:n?.message||String(n)})}}function Jm(t){return t==null?"":String(t).trim()}function m_(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window}function Jd(){try{let t=m_(),e=t?.SillyTavern||null,r=e?.getContext?.()||null,n=Array.isArray(r?.chat)?r.chat:[],s=Array.isArray(e?.chat)?e.chat:[],o=n.length?n:s;return{topWindow:t,api:e,context:r,chat:o,contextChat:n,apiChat:s}}catch{return{topWindow:null,api:null,context:null,chat:[],contextChat:[],apiChat:[]}}}function h_(t){if(!t||t?.is_user===!0||t?.is_system===!0)return!1;let e=String(t?.role||"").trim().toLowerCase();return e==="assistant"||e==="ai"||!e}function b_(t=[],e=""){let r=Jm(e);if(!Array.isArray(t)||!r)return-1;for(let n=t.length-1;n>=0;n-=1){let s=t[n];if(!h_(s))continue;if([s?.sourceId,s?.message_id,s?.messageId,s?.id,s?.mes_id,s?.mid,s?.mesid,s?.chat_index,s?.index,n].map(a=>Jm(a)).includes(r))return n}return-1}function nl(t){let e=Jd(),r=b_(e.chat,t?.sourceMessageId);return r<0?{runtime:e,messageIndex:r,message:null}:{runtime:e,messageIndex:r,message:e.chat[r]||null}}function sl(t,e,r){let n=s=>{!Array.isArray(s)||e<0||e>=s.length||(s[e]={...s[e]||{},...r})};n(t?.contextChat),n(t?.apiChat)}async function ol(t){let e=t?.context||null,r=t?.api||null,n=e?.saveChatDebounced||r?.saveChatDebounced||null,s=e?.saveChat||r?.saveChat||null;typeof n=="function"&&n.call(e||r),typeof s=="function"&&await s.call(e||r)}function xa(t){return!t||typeof t!="object"||Array.isArray(t)?!1:!!(Array.isArray(t.tables)||typeof t.chatId=="string"&&t.chatId.length>0||typeof t.slotBindingKey=="string"&&t.slotBindingKey.length>0)}function is(t){return!t||typeof t!="object"||Array.isArray(t)?!1:"lastResolvedTarget"in t||"lastCommittedTarget"in t}function ba(t,e,r,n){if(!t)return null;let s=t[e];if(!s)return null;let o=Oe(r);return typeof n=="function"&&n(s)?o===Lt?s:null:s[o]||null}function Vd(t,e,r,n,s){if(!t)return;let o=Oe(r),a=t[e];if(typeof s=="function"&&s(a)){let i={[Lt]:a};i[o]=n,t[e]=i}else a&&typeof a=="object"&&!Array.isArray(a)?t[e]={...a,[o]:n}:t[e]={[o]:n}}function rl(t,e,r,n){if(!t)return!1;let s=Oe(r),o=t[e];if(!o)return!1;if(typeof n=="function"&&n(o))return s===Lt?(delete t[e],!0):!1;if(o&&typeof o=="object"&&!Array.isArray(o)){if(o[s]===void 0)return!1;let a={...o};return delete a[s],Object.keys(a).length===0?delete t[e]:t[e]=a,!0}return!1}function al(t,e={}){let{message:r}=nl(t),n=e.isolationKey===void 0?ue.getKey():e.isolationKey,s=ba(r,cn,n,xa);return kr(s)}function Xm(t,e={}){let{runtime:r,messageIndex:n}=nl(t);return Gm({runtime:r,targetSnapshot:t,currentMessageIndex:n,templateTables:Array.isArray(e.templateTables)?e.templateTables:[],isolationKey:e.isolationKey===void 0?ue.getKey():e.isolationKey})}async function Qm(t,e={}){let{runtime:r,messageIndex:n,message:s}=nl(t);if(!s||n<0)return{success:!1,error:"target_message_not_found"};let o=e.isolationKey===void 0?ue.getKey():e.isolationKey,a=ba(s,dn,o,is),i={...bi(a),lastResolvedTarget:Ds(t),updatedAt:Date.now()};return Vd(s,dn,o,i,is),sl(r,n,s),await ol(r),{success:!0,bindings:i}}async function io(t,e,r={}){let n=r.skipFreshValidation===!0?t:await Wm(t,r),s=r.skipFreshValidation===!0?{valid:!0,reason:"skipped"}:Hm(t,n);if(!s.valid)return{success:!1,error:"target_changed_before_commit",validation:s};let o=n||t,{runtime:a,messageIndex:i,message:l}=nl(o);if(!l||i<0)return{success:!1,error:"target_message_not_found",validation:s};let d=r.isolationKey===void 0?ue.getKey():r.isolationKey,c=Vo(o),u={...c.meta||{},...e.meta||{},...r.locks?{locks:r.locks}:{},...r.previousSnapshot?{previousSnapshot:r.previousSnapshot}:{},isolationKey:d},y=kr({...c,...e,meta:u,slotBindingKey:o.slotBindingKey,slotRevisionKey:o.slotRevisionKey,sourceMessageId:o.sourceMessageId,sourceSwipeId:o.sourceSwipeId||o.effectiveSwipeId,updatedAt:Date.now()}),p=ba(l,dn,d,is),g={...bi(p),lastResolvedTarget:Ds(o),lastCommittedTarget:Ds(o),updatedAt:Date.now()};return Vd(l,cn,d,y,xa),Vd(l,dn,d,g,is),sl(a,i,l),await ol(a),g_(o,d,y?.tables||[]).catch(()=>{}),{success:!0,state:y,bindings:g,validation:s,messageIndex:i,sourceMessageId:o.sourceMessageId,slotRevisionKey:o.slotRevisionKey}}function ls(t=null,e={}){let r=Jt.getAssistantMessageSnapshot(t);if(!r?.message)return null;let n=e.isolationKey===void 0?ue.getKey():e.isolationKey;return{...r,tableState:kr(ba(r.message,cn,n,xa)),tableBindings:bi(ba(r.message,dn,n,is))}}async function Zm(t,e={}){let r=Jd();if(!Array.isArray(r.chat)||t<0||t>=r.chat.length)return{success:!1,error:"invalid_message_index",messageIndex:t};let n=r.chat[t];if(!n)return{success:!1,error:"message_not_found",messageIndex:t};let s=e.isolationKey===void 0?ue.getKey():e.isolationKey,o=rl(n,cn,s,xa),a=e.clearBindings===!1?!1:rl(n,dn,s,is);return(o||a)&&(sl(r,t,n),await ol(r)),{success:!0,cleared:o||a,messageIndex:t,isolationKey:s}}async function eh(t={}){let e=Jd(),r=Number.isFinite(t.fromMessageIndex)?t.fromMessageIndex:0,n=Number.isFinite(t.toMessageIndex)?t.toMessageIndex:(e.chat?.length||0)-1,s=t.isolationKey===void 0?ue.getKey():t.isolationKey,o=0;for(let a=r;a<=n;a++){let i=e.chat[a];if(!i)continue;let l=rl(i,cn,s,xa),d=rl(i,dn,s,is);(l||d)&&(sl(e,a,i),o++)}return o>0&&await ol(e),{success:!0,touched:o,from:r,to:n,isolationKey:s}}var Yd,cs=O(()=>{ns();Fe();jr();Ym();ma();Pi();J()});function rh(t){let e=new Set;if(!Array.isArray(t))return e;for(let r of t){let n=r?.order;Number.isFinite(n)&&e.add(Math.floor(n))}return e}function wa(t,e=5e4,r=1,n=99999){for(let s=e;s<=n;s++)if(!t.has(s))return t.add(s),s;for(let s=r;s<e;s++)if(!t.has(s))return t.add(s),s;return th.warn("\u65E0\u53EF\u7528 order \u69FD\u4F4D"),t.add(e),e}function nh(t,e,r=5e4,n=1,s=99999){let o=s-e+1;for(let a=r;a<=o;a++){let i=!0;for(let l=0;l<e;l++)if(t.has(a+l)){i=!1;break}if(i){for(let l=0;l<e;l++)t.add(a+l);return a}}for(let a=n;a<r&&a<=o;a++){let i=!0;for(let l=0;l<e;l++)if(t.has(a+l)){i=!1;break}if(i){for(let l=0;l<e;l++)t.add(a+l);return a}}th.warn(`\u65E0\u6CD5\u5206\u914D ${e} \u4E2A\u8FDE\u7EED order \u69FD\u4F4D`);for(let a=0;a<e;a++)t.add(r+a);return r}var th,sh=O(()=>{J();th=N.createScope("TableWBOrder")});function il(t,e="before_character_definition"){let r=String(t||"").trim().toLowerCase();return r==="at_depth_as_system"||r==="system"?"at_depth_as_system":r==="before_char"||r==="before_character"||r==="before_character_definition"||r==="0"?"before_character_definition":r==="after_char"||r==="after_character"||r==="after_character_definition"||r==="1"?"after_character_definition":e}function ds(t,e){if(!e)return t;let r={...t,position:e.position};return e.position==="at_depth_as_system"?r.depth=e.depth:delete r.depth,r}var f2,g2,oh=O(()=>{f2=Object.freeze(["at_depth_as_system","before_character_definition","after_character_definition"]);g2=Object.freeze({position:"before_character_definition",depth:2,order:5e4})});function Qd(t,e=""){return t==null?e:String(t).trim()||e}function v_(t){return Qd(t,"default_chat").replace(/[\[\]=]/g,"_")}function ch(){let t=globalThis.window||globalThis;return Qd(t?.TavernHelper?.getCurrentChatId?.()||t?.Silvy?.getCurrentChatId?.()||t?.chat_metadata?.chat_id||t?.this_chid||t?.name1,"default_chat")}function Zd(){try{if(typeof TavernHelper<"u"&&TavernHelper)return TavernHelper}catch{}return nn()?.TavernHelper||null}function S_(t){return String(t??"").replace(/\|/g,"\uFF5C").replace(/\n/g," ")}function Xd(t){let e=Array.isArray(t.columns)?t.columns:[],r=Array.isArray(t.rows)?t.rows:[];if(r.length===0)return"";let n=e.map(l=>l.key),s=e.map(l=>l.title||l.key),o=`| ${s.join(" | ")} |`,a=`| ${s.map(()=>"---").join(" | ")} |`,i=r.map(l=>{let d=l.cells||{};return`| ${n.map(c=>S_(d[c])).join(" | ")} |`});return`# ${t.name||"\u672A\u547D\u540D\u8868"}

${o}
${a}
${i.join(`
`)}`}function T_(t,e){if(!Array.isArray(t)||t.length===0)return[];let r=new Map;if(Array.isArray(e))for(let n of e){let s=n?.id||n?.key;s&&r.set(s,n)}return t.map(n=>{let s=n?.id?r.get(n.id):null;return{...n,exportConfig:n?.exportConfig||s?.exportConfig||{enabled:!1},enabled:n?.enabled!==!1}})}function ll(t){return`${lh}${x_}${v_(t)}${w_}-`}function __(t){return`${lh}[${Qd(t,"default_chat")}]-`}function eu(t,e){if(!t||typeof t!="string")return!1;let r=ll(e);if(t.startsWith(r))return!0;let n=__(e);return!!t.startsWith(n)}function ah(t,e){let r=ll(t),n=String(e||"").trim();return n?`${r}${n}`:`${r}\u586B\u8868\u6570\u636E`}function ih(t,e,r){return`${ll(t)}Wrapper-${r}`}function E_(t,e){return t?t.content!==e.content||t.enabled!==e.enabled||t.type!==e.type||t.position!==e.position||t.prevent_recursion!==e.prevent_recursion||t.order!==e.order:!0}async function us(t,e,r,n,s,o,a){let i=r.find(l=>l.comment===n);return i&&a&&!eu(i.comment,a)?(yr.warn(`upsert \u8DF3\u8FC7\uFF1A\u73B0\u6709\u6761\u76EE comment "${n}" \u4E0D\u5C5E\u4E8E\u5F53\u524D chat`,{chatId:a}),{action:"skipped",comment:n,reason:"cross_chat_collision"}):i&&i.uid?E_(i,s)?(await Promise.resolve(t.setLorebookEntries(e,[{uid:i.uid,...s}])),yr.info(`\u4E16\u754C\u4E66\u6761\u76EE\u5DF2\u66F4\u65B0\uFF1A${n}`),{action:"updated",comment:n}):(o.add(i.order||0),{action:"skipped",comment:n}):typeof t.createLorebookEntries=="function"?(await Promise.resolve(t.createLorebookEntries(e,[{comment:n,keys:[],...s}])),yr.info(`\u4E16\u754C\u4E66\u6761\u76EE\u5DF2\u521B\u5EFA\uFF1A${n}`),{action:"created",comment:n}):{action:"failed",comment:n,error:"createLorebookEntries \u4E0D\u53EF\u7528"}}async function dh(t){let e=t?.worldbookSync,r=e?.injectionMode||"character_card",n=Zd();if(r==="target_book"){let s=String(e?.targetBook||"").trim();return s?{targetBook:s}:{error:"no_target_book"}}if(r==="character_card"){if(n){if(typeof n.getCurrentCharPrimaryLorebook=="function"){let s=await Promise.resolve(n.getCurrentCharPrimaryLorebook());if(s)return{targetBook:String(s)}}if(typeof n.getCharLorebooks=="function"){let s=await Promise.resolve(n.getCharLorebooks());if(s?.primary)return{targetBook:String(s.primary)}}}return{error:"no_character_lorebook"}}if(r==="auto_create"){if(n){if(typeof n.getOrCreateChatWorldbook=="function")try{let s=await Promise.resolve(n.getOrCreateChatWorldbook("current"));if(s)return{targetBook:String(s)}}catch(s){yr.warn("getOrCreateChatWorldbook \u5931\u8D25",s)}if(typeof n.getOrCreateChatLorebook=="function")try{let s=await Promise.resolve(n.getOrCreateChatLorebook());if(s)return{targetBook:String(s)}}catch(s){yr.warn("getOrCreateChatLorebook \u5931\u8D25",s)}}return{error:"chat_worldbook_unavailable"}}return{error:"unknown_injection_mode"}}async function uh(t,e){if(!e?.worldbookSync?.enabled)return{skipped:!0,reason:"disabled"};let n=await dh(e);if(n.error)return{skipped:!0,reason:n.error};let s=n.targetBook,o=Zd();if(!o)return{success:!1,error:"TavernHelper \u4E0D\u53EF\u7528"};if(typeof o.getLorebookEntries!="function")return{success:!1,error:"getLorebookEntries \u4E0D\u53EF\u7528"};if(typeof o.setLorebookEntries!="function"&&typeof o.createLorebookEntries!="function")return{success:!1,error:"\u4E16\u754C\u4E66\u5199\u5165 API \u4E0D\u53EF\u7528"};let a=ch(),i=ll(a),l=Array.isArray(e?.tables)?e.tables:[],c=T_(t,l).filter(p=>p&&p.enabled!==!1&&Array.isArray(p.rows)&&p.rows.length>0);if(c.length===0)return{skipped:!0,reason:"empty_tables"};let u=e?.wrapperConfig||{},y=u.enabled!==!1;try{let p=await Promise.resolve(o.getLorebookEntries(s));Array.isArray(p)||(p=[]);let g=rh(p),m=[],h=c.filter(A=>A.exportConfig?.enabled===!0),b=c.filter(A=>A.exportConfig?.enabled!==!0),x="";if(b.length>0&&(x=b.map(A=>Xd(A)).join(`

`)),y&&(x||h.length>0)){let A=u.wrapperTag||"\u6700\u65B0\u6570\u636E\u4E0E\u8BB0\u5F55",P=u.wrapperHint||"",M=u.wrapperPlacement||{},R=M.order||5e4,_=nh(g,3,R,1,99999),$=il(M.position,"before_character_definition"),F=Number.isFinite(M.depth)?M.depth:2,Y=`<${A}>
${P}`;m.push(await us(o,s,p,ih(a,A,"Start"),ds({content:Y,enabled:!0,type:"constant",order:_,prevent_recursion:!0},{position:$,depth:F}),g,a)),x&&m.push(await us(o,s,p,`${i}\u5168\u5C40\u6570\u636E`,ds({content:x,enabled:!0,type:"constant",order:_+1,prevent_recursion:!0},{position:$,depth:F}),g,a)),m.push(await us(o,s,p,ih(a,A,"End"),ds({content:`</${A}>`,enabled:!0,type:"constant",order:_+2,prevent_recursion:!0},{position:$,depth:F}),g,a))}else if(x){let A=wa(g,5e4,1,99999);m.push(await us(o,s,p,`${i}\u5168\u5C40\u6570\u636E`,{content:x,enabled:!0,type:"constant",position:"before_character_definition",order:A,prevent_recursion:!0},g,a))}for(let A of h){let P=A.exportConfig||{},M=P.entryName||A.name||"\u672A\u547D\u540D\u8868",R=P.entryType==="keyword"?"keyword":"constant",_=P.entryPlacement||{},$=il(_.position,"before_character_definition"),F=Y=>Array.isArray(Y.rows)&&Y.rows.length>0&&Array.isArray(Y.columns)&&Y.columns.length>0?P.injectionTemplate?A_(P.injectionTemplate,Y):Xd(Y):"";if(P.splitByRow){P.extraIndexPlacement?.position&&P.extraIndexPlacement.position!==_.position&&yr.info(`splitByRow \u6A21\u5F0F\u4E0B extraIndexPlacement \u4E0D\u751F\u6548 [${M}]`);let Y=Array.isArray(A.rows)?A.rows:[];for(let re=0;re<Y.length;re++){let ie=Y[re]?.name||`${M}-\u884C${re+1}`,Z=ah(a,ie),we={...A,name:ie,rows:[Y[re]]},Ie=F(we);if(!Ie)continue;let X=wa(g,_.order||5e4,1,99999);m.push(await us(o,s,p,Z,ds({content:Ie,enabled:!0,type:R,order:X,prevent_recursion:P.preventRecursion!==!1},{position:$,depth:_.depth||2}),g,a))}}else{let Y=ah(a,M),re=F(A);if(!re)continue;let ie=wa(g,_.order||5e4,1,99999);m.push(await us(o,s,p,Y,ds({content:re,enabled:!0,type:R,order:ie,prevent_recursion:P.preventRecursion!==!1},{position:$,depth:_.depth||2}),g,a));let Z=P.extraIndexPlacement;if(Z&&Z.position&&Z.position!==_.position){let we=il(Z.position,"before_character_definition"),Ie=`${Y}-extra`,X=wa(g,Z.order||5e4,1,99999);m.push(await us(o,s,p,Ie,ds({content:re,enabled:!0,type:R,order:X,prevent_recursion:P.preventRecursion!==!1},{position:we,depth:Z.depth||2}),g,a))}}}let w=new Set(m.map(A=>A.comment).filter(Boolean)),T=p.filter(A=>!A.comment||!eu(A.comment,a)?!1:!w.has(A.comment));if(T.length>0){let A=T.map(P=>P.uid).filter(Boolean);A.length>0&&typeof o.deleteLorebookEntries=="function"&&(await Promise.resolve(o.deleteLorebookEntries(s,A)),yr.info(`\u5DF2\u6E05\u7406 ${A.length} \u4E2A\u65E7\u4E16\u754C\u4E66\u6761\u76EE [${a}]`))}let I=m.filter(A=>A.action==="created").length,S=m.filter(A=>A.action==="updated").length;return yr.info(`\u4E16\u754C\u4E66\u540C\u6B65\u5B8C\u6210 [${a}]\uFF1A${I} \u521B\u5EFA, ${S} \u66F4\u65B0, ${T.length} \u6E05\u7406`),{success:!0,results:m,stats:{created:I,updated:S,cleaned:T.length},targetBook:s,chatId:a}}catch(p){return yr.warn("\u4E16\u754C\u4E66\u540C\u6B65\u5931\u8D25:",p),{success:!1,error:p?.message||"\u4E16\u754C\u4E66\u540C\u6B65\u5931\u8D25"}}}async function ph(t){let e=await dh(t);if(e.error)return{success:!1,error:e.error};let r=e.targetBook,n=Zd();if(!n||typeof n.getLorebookEntries!="function")return{success:!1,error:"TavernHelper \u4E0D\u53EF\u7528"};let s=ch();try{let o=await Promise.resolve(n.getLorebookEntries(r));if(!Array.isArray(o))return{success:!0,cleaned:0};let a=o.filter(l=>l.comment&&eu(l.comment,s));if(a.length===0)return{success:!0,cleaned:0,targetBook:r};let i=a.map(l=>l.uid).filter(Boolean);return i.length>0&&typeof n.deleteLorebookEntries=="function"&&(await Promise.resolve(n.deleteLorebookEntries(r,i)),yr.info(`\u5DF2\u6E05\u9664 ${i.length} \u4E2A\u4E16\u754C\u4E66\u6761\u76EE [${s}]`)),{success:!0,cleaned:i.length,targetBook:r}}catch(o){return yr.warn("\u6E05\u9664\u4E16\u754C\u4E66\u6761\u76EE\u5931\u8D25:",o),{success:!1,error:o?.message||"\u6E05\u9664\u5931\u8D25"}}}function A_(t,e){let r=t;r=r.replace(/\{\{tableName\}\}/g,e.name||"\u672A\u547D\u540D\u8868"),r.includes("{{tableContent}}")&&(r=r.replace(/\{\{tableContent\}\}/g,Xd(e)));let n=Array.isArray(e.columns)?e.columns:[],o=(Array.isArray(e.rows)?e.rows:[])[0];if(o)for(let a of n){let i=a?.key;if(!i)continue;let l=`{{${i}}}`;if(!r.includes(l))continue;let d=String(o.cells?.[i]??"");r=r.split(l).join(d)}return r}var yr,lh,x_,w_,tu=O(()=>{Wn();J();sh();oh();yr=N.createScope("TableWorldbookSync"),lh="YYT-",x_="[YY:chatId=",w_="]"});function cl(t,e=""){return t==null?e:String(t).trim()||e}function k_(t={}){return{tables:Array.isArray(t?.tables)?pe(t.tables):[]}}function I_(t={},e={}){let r=cl(e.mirrorTag,"yyt-table-workbench"),n=k_(t);return[`<${r}>`,"[\u586B\u8868\u5DE5\u4F5C\u53F0]","```json",JSON.stringify(n,null,2),"```",`</${r}>`].join(`
`)}async function yh({targetSnapshot:t,nextTables:e,config:r,loadResult:n=null,diff:s=null,fillMode:o="",skipNotify:a=!1}={}){let i=sr(r),l=await io(t,{tables:Array.isArray(e)?pe(e):[],meta:{lastLoadMode:cl(n?.loadMode,""),lastFillMode:cl(o),mergeBaseOnly:!1,updatedBy:cl(t?.runSource,"MANUAL_TABLE")}});if(!l?.success)return{success:!1,error:l?.error||"table_state_commit_failed",commitResult:l,mirrorResult:null,warning:""};let d=null,c=null,u="";if(i.mirrorToMessage){let y=I_(l.state,{mirrorTag:i.mirrorTag});d=await Jt.injectDetailed(C_,y,{overwrite:!0,extractionSelectors:[i.mirrorTag],sourceMessageId:l.sourceMessageId,sourceSwipeId:t?.sourceSwipeId||t?.effectiveSwipeId,effectiveSwipeId:t?.effectiveSwipeId||t?.sourceSwipeId,slotBindingKey:t?.slotBindingKey,slotRevisionKey:t?.slotRevisionKey,slotTransactionId:t?.slotTransactionId,traceId:t?.traceId,skipNotify:a}),d?.success||(u=d?.error||"\u6B63\u6587\u955C\u50CF\u5199\u56DE\u5931\u8D25")}return i.worldbookSync?.enabled&&(c=await uh(Array.isArray(e)?e:[],i),c&&!c.success&&!c.skipped&&(u=u?`${u}; ${c.error}`:c.error||"\u4E16\u754C\u4E66\u540C\u6B65\u5931\u8D25")),{success:!0,state:l.state,bindings:l.bindings,diff:s,fillMode:o,commitResult:l,mirrorResult:d,worldbookSyncResult:c,warning:u}}var C_,fh=O(()=>{ns();Fe();cs();nr();tu();C_="tableWorkbenchMirror"});function R_(t){return typeof t!="string"||!t?t:t.replace(/[“”「」『』＂]/g,'"')}function ru(t,e){for(let r=e;r<t.length;r++)if(!/\s/.test(t[r]))return{char:t[r],index:r};return{char:"",index:-1}}function hh(t){return!!t&&(t==='"'||t==="{"||t==="["||t==="-"||/\d/.test(t)||t==="t"||t==="f"||t==="n")}function M_(t,e,r,n){let s=ru(t,e+1),o=s.char;if(!o)return r!=="key";if(r==="key")return o===":";if(o==="}"||o==="]")return!0;if(o!==",")return!1;let a=ru(t,s.index+1).char;return a?n==="object"?a==='"'||a==="}":n==="array"?a==="]"||hh(a):hh(a)||a==="}"||a==="]":!0}function P_(t){if(typeof t!="string")return{success:!1,result:t,error:"not a string"};let e="",r=!1,n=!1,s=null,o=[],a=()=>o.length?o[o.length-1]:null,i=()=>{let l=a();l&&(l.expecting="commaOrEnd")};for(let l=0;l<t.length;l++){let d=t[l];if(n){e+=d,n=!1;continue}if(r){if(d==="\\"){e+=d,n=!0;continue}if(d==='"'){let c=a();M_(t,l,s,c?.type||null)?(e+=d,r=!1,s==="key"&&c?.type==="object"?c.expecting="colon":i(),s=null):e+='\\"';continue}e+=d;continue}if(d==='"'){e+=d,r=!0;let c=a();s=c&&c.type==="object"&&(c.expecting==="key"||c.expecting==="keyOrEnd")?"key":"value";continue}if(d==="{"){e+=d,o.push({type:"object",expecting:"keyOrEnd"});continue}if(d==="["){e+=d,o.push({type:"array",expecting:"valueOrEnd"});continue}if(d===":"){e+=d;let c=a();c?.type==="object"&&(c.expecting="value");continue}if(d===","){e+=d;let c=a();c?.type==="object"&&(c.expecting="key"),c?.type==="array"&&(c.expecting="value");continue}if(d==="}"||d==="]"){e+=d,o.pop(),i();continue}e+=d}return{success:!0,result:e,error:null}}function N_(t){if(typeof t!="string"||!t)return t;let e="",r=!1,n=!1;for(let s=0;s<t.length;s++){let o=t[s];if(n){e+=o,n=!1;continue}if(o==="\\"){e+=o,r&&(n=!0);continue}if(o==='"'){e+=o,r=!r;continue}if(r){if(o===`
`){e+="\\n";continue}if(o==="\r"){e+="\\r";continue}if(o==="	"){e+="\\t";continue}if(o==="\0"){e+="\\u0000";continue}}e+=o}return e}function $_(t){if(typeof t!="string"||!t)return t;let e="",r=!1,n=!1;for(let s=0;s<t.length;s++){let o=t[s];if(n){e+=o,n=!1;continue}if(o==="\\"){e+=o,r&&(n=!0);continue}if(o==='"'){e+=o,r=!r;continue}if(!r&&o===","){let a=ru(t,s+1).char;if(a==="}"||a==="]")continue}e+=o}return e}function L_(t){return typeof t!="string"||!t?t:t.replace(/([{,]\s*)(-?\d+)(\s*:)/g,'$1"$2"$3')}function va(t){if(typeof t!="string")return{success:!1,result:t,layersApplied:[],error:"Input is not a string"};let e=[],r=t,n=R_(r);n!==r&&e.push("normalizeQuotes"),r=n;let s=P_(r);if(!s.success)return{success:!1,result:r,layersApplied:e,error:s.error};s.result!==r&&e.push("escapeUnescapedQuotes"),r=s.result;let o=N_(r);o!==r&&e.push("sanitizeControlChars"),r=o;let a=$_(r);a!==r&&e.push("removeTrailingCommas"),r=a;let i=L_(r);return i!==r&&e.push("fixNumericKeys"),r=i,{success:!0,result:r,layersApplied:e,error:null}}function O_(t,e=","){if(typeof t!="string"||!t)return[];let r=[],n="",s=!1,o=!1,a=0,i=0,l=0;for(let d=0;d<t.length;d++){let c=t[d];if(o){n+=c,o=!1;continue}if(c==="\\"){n+=c,s&&(o=!0);continue}if(c==='"'){n+=c,s=!s;continue}if(!s){if(c==="{")a++;else if(c==="}")a=Math.max(0,a-1);else if(c==="[")i++;else if(c==="]")i=Math.max(0,i-1);else if(c==="(")l++;else if(c===")")l=Math.max(0,l-1);else if(c===e&&a===0&&i===0&&l===0){n.trim()&&r.push(n.trim()),n="";continue}}n+=c}return n.trim()&&r.push(n.trim()),r}function D_(t,e=":"){if(typeof t!="string"||!t)return-1;let r=!1,n=!1,s=0,o=0,a=0;for(let i=0;i<t.length;i++){let l=t[i];if(n){n=!1;continue}if(l==="\\"){r&&(n=!0);continue}if(l==='"'){r=!r;continue}if(!r){if(l==="{")s++;else if(l==="}")s=Math.max(0,s-1);else if(l==="[")o++;else if(l==="]")o=Math.max(0,o-1);else if(l==="(")a++;else if(l===")")a=Math.max(0,a-1);else if(l===e&&s===0&&o===0&&a===0)return i}}return-1}function nu(t){if(typeof t!="string")return{success:!0,value:t,error:null};let e=t.trim();if(!e)return{success:!1,value:null,error:"Empty value"};let n=`[${e.startsWith("'")&&e.endsWith("'")?`"${e.slice(1,-1).replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\r/g,"\\r").replace(/\n/g,"\\n").replace(/\t/g,"\\t")}"`:e}]`;try{return{success:!0,value:JSON.parse(n)[0],error:null}}catch(s){let o=va(n);if(o.success)try{return{success:!0,value:JSON.parse(o.result)[0],error:null}}catch{}return{success:!1,value:null,error:s?.message||"Failed to parse loose value"}}}function B_(t){let e=typeof t=="string"?t.trim():"";if(!e)return null;if(/^-?\d+$/.test(e))return e;let r=nu(e);return r.success&&(typeof r.value=="string"||typeof r.value=="number")?String(r.value):e.replace(/^["']|["']$/g,"")}function bh(t){if(typeof t!="string")return{success:!1,result:null,recoveredKeys:[],error:"not a string"};let e=t.trim();if(!e.startsWith("{")||!e.endsWith("}"))return{success:!1,result:null,recoveredKeys:[],error:"not an object literal"};let r=e.slice(1,-1).trim();if(!r)return{success:!0,result:{},recoveredKeys:[],error:null};let n=O_(r,",").filter(Boolean);if(!n.length)return{success:!1,result:null,recoveredKeys:[],error:"no segments"};let s={},o=0;for(let i of n){let l=D_(i,":");if(l!==-1){let c=B_(i.slice(0,l)),u=nu(i.slice(l+1));if(!c||!u.success)return{success:!1,result:null,recoveredKeys:Object.keys(s),error:`Failed segment: ${i}`};s[c]=u.value;let y=parseInt(c,10);!isNaN(y)&&String(y)===c&&(o=Math.max(o,y+1));continue}let d=nu(i);if(!d.success)return{success:!1,result:null,recoveredKeys:Object.keys(s),error:`Failed value: ${i}`};for(;Object.prototype.hasOwnProperty.call(s,String(o));)o++;s[String(o)]=d.value,o++}let a=Object.keys(s).sort((i,l)=>parseInt(i,10)-parseInt(l,10));return a.length?{success:!0,result:s,recoveredKeys:a,error:null}:{success:!1,result:null,recoveredKeys:[],error:"no keys recovered"}}function z_(t){if(typeof t!="string")return"";let e=t.trim();return e=e.replace(/'\s*\+\s*'/g,""),e.startsWith("'")&&e.endsWith("'")&&(e=e.slice(1,-1)),e=e.replace(/\\n/g,`
`),e=e.replace(/\\\\"/g,'\\"'),e=e.replace(/：/g,":"),e}function K_(t){let e=z_(t);if(!e)return[];let r=[];gh.lastIndex=0;let n;for(;(n=gh.exec(e))!==null;){let i=n[1];i&&i.trim()&&r.push(i)}if(r.length)return r;let s=i=>/(insertRow|updateRow|deleteRow)\s*\(/.test(i),o=/<!--([\s\S]*?)-->/g,a=[];for(;(n=o.exec(e))!==null;)s(n[1])&&a.push(n[1]);return a}function j_(t){let e=t.split(/\r?\n/),r=[],n="",s=!1;for(let a of e){let i=a.trim();if(!i||(!s&&i.includes("//")&&!i.includes('"//')&&!i.includes("'//")&&(i=i.split("//")[0].trim()),!i))continue;if(/^(insertRow|updateRow|deleteRow)\s*\(/.test(i)&&!s?(n&&r.push(n),n=i):n+=(n?" ":"")+i,n){let d=(n.match(/\{/g)||[]).length,c=(n.match(/\}/g)||[]).length;s=d>c}}n&&r.push(n);let o=[];for(let a of r){let i=/(?:^|;\s*)((?:insertRow|deleteRow|updateRow)\s*\()/g,l=[],d;for(;(d=i.exec(a))!==null;)l.push(d.index+(d[0].length-d[1].length));if(l.length<=1)o.push(a.replace(/;\s*$/,""));else for(let c=0;c<l.length;c++){let u=l[c],y=c+1<l.length?l[c+1]:a.length,p=a.substring(u,y).replace(/;\s*$/,"").trim();p&&o.push(p)}}return o}function U_(t){try{let e=t;if(e.match(/\)\s*;?\s*\/\/.*$/)&&(e=e.replace(/\/\/.*$/,"").trim()),!e)return null;let r=e.match(/^(insertRow|deleteRow|updateRow)\s*\((.*)\);?$/);if(!r)return null;let n=r[1],s=r[2],o=s.indexOf("{");if(o===-1)return{command:n,args:JSON.parse(`[${s}]`),line:e};let a=s.substring(0,o).trim(),i=s.substring(o),l=JSON.parse(`[${a.replace(/,$/,"")}]`);try{return{command:n,args:[...l,JSON.parse(i)],line:e}}catch{}let d=bh(i);if(d.success)return{command:n,args:[...l,d.result],line:e};let c=va(i);if(!c.success)return null;try{return{command:n,args:[...l,JSON.parse(c.result)],line:e}}catch{}let u=bh(c.result);return u.success?{command:n,args:[...l,u.result],line:e}:null}catch{return null}}function F_(t){if(!t)return null;let{command:e,args:r}=t;if(e==="insertRow"){let n=typeof r[0]=="number"?r[0]:0,s=typeof r[1]=="object"&&r[1]!==null?r[1]:{};return{op:e,tableIndex:n,data:s}}if(e==="deleteRow"){let n=typeof r[0]=="number"?r[0]:0,s=typeof r[1]=="number"?r[1]:0;return{op:e,tableIndex:n,rowIndex:s}}if(e==="updateRow"){let n=typeof r[0]=="number"?r[0]:0,s=typeof r[1]=="number"?r[1]:0,o=typeof r[2]=="object"&&r[2]!==null?r[2]:{};return{op:e,tableIndex:n,rowIndex:s,data:o}}return null}function su(t){let e=K_(t);if(!e.length)return null;let r=[],n=[];for(let s of e){let o=s.replace(/<!--|-->/g,"").trim();if(!o)continue;let a=j_(o);for(let i of a){let l=U_(i),d=F_(l);d?r.push(d):i&&/^(insertRow|updateRow|deleteRow)/.test(i)&&n.push(i.slice(0,200))}}if(n.length>0)try{console.warn("[TableJsonSanitizer] parseIncrementalEdits: %d \u6761\u6307\u4EE4\u89E3\u6790\u5931\u8D25",n.length,n)}catch{}return r.length?r:null}function ou(t){mh.lastIndex=0;let e;for(;(e=mh.exec(t))!==null;){let g=e[1].trim();if(g)try{return JSON.parse(g)}catch{let h=va(g);if(h.success)try{return JSON.parse(h.result)}catch{}}}let r=t.trim();try{return JSON.parse(r)}catch{}let n=va(r);if(n.success)try{return JSON.parse(n.result)}catch{}let s=r.indexOf("{"),o=r.indexOf("["),a=-1,i="",l="";if(s!==-1&&(o===-1||s<o)?(a=s,i="{",l="}"):o!==-1&&(a=o,i="[",l="]"),a===-1)return null;let d=0,c=-1,u=!1,y=!1;for(let g=a;g<r.length;g++){let m=r[g];if(y){y=!1;continue}if(m==="\\"&&u){y=!0;continue}if(m==='"'){u=!u;continue}if(!u){if(m===i)d++;else if(m===l&&(d--,d===0)){c=g;break}}}if(c===-1)return null;let p=r.substring(a,c+1);try{return JSON.parse(p)}catch{let m=va(p);if(m.success)try{return JSON.parse(m.result)}catch{}}return null}function xh(t){if(!t||typeof t!="string")return{mode:"empty",edits:null,tables:null};let e=su(t);if(e)return{mode:"incremental",edits:e,tables:null};let r=ou(t);if(r){let n=null;if(Array.isArray(r))n=r;else if(r&&Array.isArray(r.tables))n=r.tables;else if(r&&typeof r=="object"){for(let s of Object.values(r))if(Array.isArray(s)){n=s;break}}if(Array.isArray(n))return{mode:"full",edits:null,tables:n}}return{mode:"empty",edits:null,tables:null}}var gh,mh,dl=O(()=>{gh=/<tableEdit>([\s\S]*?)<\/tableEdit>/gi,mh=/```(?:json)?\s*([\s\S]*?)```/gi});var W_,H_,wh,vh=O(()=>{dl();W_=/<tableEdit>[\s\S]*?<\/tableEdit>/i,H_=/(insertRow|updateRow|deleteRow)\s*\(/,wh=Object.freeze({formatId:"dsl",displayName:"<tableEdit> DSL \u589E\u91CF\u534F\u8BAE",detect(t){return!t||typeof t!="string"?!1:W_.test(t)||H_.test(t)},parse(t){let e=su(t);return!Array.isArray(e)||e.length===0?null:{mode:"incremental",edits:e,tables:null}}})});function Th(t){if(typeof t!="string")return t;let e=t.trim();return e.startsWith("'")&&e.endsWith("'")||e.startsWith('"')&&e.endsWith('"')?e.slice(1,-1).replace(/''/g,"'").replace(/\\'/g,"'"):e}function au(t){let e=String(t||"").match(/(\d+)$/);return e?parseInt(e[1],10):0}function _h(t){let e=String(t||"").match(/row_id\s*=\s*(\d+)/i);return e?parseInt(e[1],10):-1}function q_(t){let e=t.match(/INSERT\s+INTO\s+(\S+)\s*\(([^)]*)\)\s*VALUES\s*\(([^)]*)\)/i);if(!e)return null;let r=e[1],n=e[2],s=e[3],o=n.split(",").map(l=>l.trim()),a=s.split(",").map(l=>Th(l.trim())),i={};return o.forEach((l,d)=>{l!=="row_id"&&a[d]!==void 0&&(i[l]=a[d])}),{op:"insertRow",tableIndex:au(r),data:i}}function G_(t){let e=t.match(/UPDATE\s+(\S+)\s+SET\s+([\s\S]+?)\s+WHERE\s+([\s\S]+?);?$/i);if(!e)return null;let r=e[1],n=e[2],s=e[3],o={},a=n.split(/,(?![^()]*\))/);for(let i of a){let l=i.indexOf("=");if(l<0)continue;let d=i.slice(0,l).trim(),c=Th(i.slice(l+1).trim());d&&d!=="row_id"&&(o[d]=c)}return{op:"updateRow",tableIndex:au(r),rowIndex:_h(s),data:o}}function Y_(t){let e=t.match(/DELETE\s+FROM\s+(\S+)\s+WHERE\s+([\s\S]+?);?$/i);return e?{op:"deleteRow",tableIndex:au(e[1]),rowIndex:_h(e[2])}:null}function V_(t){let e=[];Sh.lastIndex=0;let r;for(;(r=Sh.exec(t))!==null;){let n=r[0].trim(),s=null;/^INSERT/i.test(n)?s=q_(n):/^UPDATE/i.test(n)?s=G_(n):/^DELETE/i.test(n)&&(s=Y_(n)),s&&e.push(s)}return e}var Sa,Sh,Eh,Ah=O(()=>{Sa=/<sql>([\s\S]*?)<\/sql>/gi,Sh=/(INSERT\s+INTO\s+\S+[\s\S]*?;)|(UPDATE\s+\S+\s+SET[\s\S]*?;)|(DELETE\s+FROM\s+\S+[\s\S]*?;)/gi;Eh=Object.freeze({formatId:"sql",displayName:"SQL \u534F\u8BAE\uFF08INSERT/UPDATE/DELETE\uFF09",detect(t){return!t||typeof t!="string"?!1:Sa.test(t)?(Sa.lastIndex=0,!0):(Sa.lastIndex=0,/\b(INSERT\s+INTO|UPDATE\s+\S+\s+SET|DELETE\s+FROM)\b/i.test(t))},parse(t){let e="";Sa.lastIndex=0;let r,n=[];for(;(r=Sa.exec(t))!==null;)n.push(r[1]);n.length>0?e=n.join(`
`):e=t;let s=V_(e);return!Array.isArray(s)||s.length===0?null:{mode:"incremental",edits:s,tables:null}}})});var Ch,kh=O(()=>{dl();Ch=Object.freeze({formatId:"full-json",displayName:"JSON envelope \u5168\u91CF\u534F\u8BAE",detect(t){return!t||typeof t!="string"?!1:/```json/i.test(t)||/\{[\s\S]*?"tables"\s*:/i.test(t)},parse(t){let e=ou(t);if(!e)return null;let r=null;if(Array.isArray(e))r=e;else if(e&&Array.isArray(e.tables))r=e.tables;else if(e&&typeof e=="object"){for(let n of Object.values(e))if(Array.isArray(n)){r=n;break}}return!Array.isArray(r)||r.length===0?null:{mode:"full",edits:null,tables:r}}})});function ul(){return iu||(iu=N.createScope("AiProtocolAdapter")),iu}function Ih(t){if(!t||typeof t!="string")return null;for(let e of J_){let r=!1;try{r=e.detect(t)}catch(n){ul().warn(`adapter ${e.formatId} detect \u629B\u9519`,n);continue}if(r)try{let n=e.parse(t);if(n&&(n.mode==="incremental"||n.mode==="full")&&(n.mode==="incremental"&&Array.isArray(n.edits)&&n.edits.length>0||n.mode==="full"&&Array.isArray(n.tables)&&n.tables.length>0))return ul().info("AI \u534F\u8BAE\u9002\u914D\u5668\u547D\u4E2D",{formatId:e.formatId,mode:n.mode,editsCount:n.edits?.length,tablesCount:n.tables?.length}),{...n,rawFormat:e.formatId}}catch(n){ul().warn(`adapter ${e.formatId} parse \u629B\u9519\uFF0C\u5C1D\u8BD5\u4E0B\u4E00\u4E2A`,n)}}return ul().warn("parseAiResponseAuto: \u65E0\u9002\u914D\u5668\u547D\u4E2D",{responseLength:t.length}),null}var iu,J_,Rh=O(()=>{J();vh();Ah();kh();J_=Object.freeze([wh,Eh,Ch])});function X_(t,e){let r=new Map;Array.isArray(t)&&t.forEach((o,a)=>{o&&typeof o=="object"&&r.set(o.name||`__row_${a}`,o)});let n=new Map;Array.isArray(e)&&e.forEach((o,a)=>{o&&typeof o=="object"&&n.set(o.name||`__row_${a}`,o)});let s={};for(let[o,a]of n){let i=r.get(o);if(i){s[o]={};let l=new Set([...Object.keys(i.cells||{}),...Object.keys(a.cells||{})]);for(let d of l){let c=String((i.cells&&i.cells[d])??""),u=String((a.cells&&a.cells[d])??"");s[o][d]=c===u?"unchanged":"updated"}s[o].__rowStatus="kept"}else{if(s[o]={},a.cells&&typeof a.cells=="object")for(let l of Object.keys(a.cells))s[o][l]="new";s[o].__rowStatus="new"}}for(let[o]of r)n.has(o)||(s[o]={__rowStatus:"deleted"});return s}function Mh(t,e){let r=Array.isArray(t)?pe(t):[],n=Array.isArray(e)?pe(e):[],s={},o=Math.max(r.length,n.length);for(let a=0;a<o;a++){let i=r[a],l=n[a];!i&&l?(s[a]={},Array.isArray(l.rows)&&l.rows.forEach(d=>{let c=d.name||`__row_${l.rows.indexOf(d)}`;s[a][c]={__rowStatus:"new"}})):i&&!l?(s[a]={},Array.isArray(i.rows)&&i.rows.forEach(d=>{let c=d.name||`__row_${i.rows.indexOf(d)}`;s[a][c]={__rowStatus:"deleted"}})):i&&l&&(s[a]=X_(i.rows,l.rows))}return s}var Ph=O(()=>{Fe()});function Q_(){return{mode:"native",async buildRequest(t={},e={}){if(typeof t.buildRequest!="function")throw new Error("table_provider_missing_build_request");return t.buildRequest(e)},async sendRequest(t={},e=null,r={}){if(typeof t.sendRequest!="function")throw new Error("table_provider_missing_send_request");return t.sendRequest(e?.messages||[],r.config||{},r.abortSignal||null)},parseResponse(t={},e=""){if(typeof t.parseResponse!="function")throw new Error("table_provider_missing_parse_response");return t.parseResponse(e)}}}function Nh(){return Q_()}var $h=O(()=>{});function eE(){return lu||(lu=N.createScope("TableLock")),lu}function ps(t){return t!==null&&typeof t=="object"&&!Array.isArray(t)}function Dh(){let t=Oh.get(Lh,{});return ps(t)?t:{}}function tE(t){Oh.set(Lh,t)}function Ta(t){let e=Dh();return ps(e[t])?e[t]:{}}function cu(t,e){let r=Dh();r[t]=e,tE(r),rE(t,e).catch(()=>{})}async function rE(t,e){try{let{chatKey:r,isolationKey:n}=(()=>{let o=String(t||"").indexOf("::");return o===-1?{chatKey:String(t||""),isolationKey:""}:{chatKey:t.slice(0,o),isolationKey:t.slice(o+2)}})();if(!r)return;let s=await Promise.resolve().then(()=>(Pi(),bd));await s.ensureTableDataReady(),await s.clearScopeLocks({chatId:r,isolationKey:n});for(let[o,a]of Object.entries(e||{})){if(!ps(a))continue;let i={chatId:r,isolationKey:n};if(Array.isArray(a.rows))for(let l of a.rows)Number.isFinite(l)&&await s.setLockEntry(i,o,"row",String(l));if(Array.isArray(a.cols))for(let l of a.cols)typeof l=="string"&&l&&await s.setLockEntry(i,o,"column",l);if(Array.isArray(a.cells))for(let l of a.cells)typeof l=="string"&&l.includes(":")&&await s.setLockEntry(i,o,"cell",l);a.indexColumn===!0&&await s.setLockEntry(i,o,"index_column","")}}catch(r){eE().warn("lock-service SQL \u955C\u50CF\u5931\u8D25\uFF08\u4E0D\u5F71\u54CD\u4E3B\u6D41\u7A0B\uFF09",{error:r?.message||String(r)})}}function _a(t){let e=zf();return ps(t)&&(Array.isArray(t.rows)&&(e.rows=Array.from(new Set(t.rows.filter(r=>Number.isFinite(r)).map(r=>Math.floor(r)))),e.rows.sort((r,n)=>r-n)),Array.isArray(t.cols)&&(e.cols=Array.from(new Set(t.cols.filter(r=>typeof r=="string"&&r.length>0)))),Array.isArray(t.cells)&&(e.cells=Array.from(new Set(t.cells.filter(r=>typeof r=="string"&&r.includes(":"))))),e.indexColumn=t.indexColumn===!0),e}function Ea(t){if(typeof t=="string")return t;if(ps(t)){if(typeof t.scopeKey=="string"&&t.scopeKey.includes("::"))return t.scopeKey;if(t.chatId!==void 0){let e=t.isolationKey!==void 0?t.isolationKey:ue.getKey();return Jo(t.chatId,e)}}return Jo("",ue.getKey())}function nE(t,e){let r=Ta(t),n={};if(!Array.isArray(e))return n;for(let s=0;s<e.length;s++){let o=e[s];if(!o)continue;let a=o.uid||o.id||"";a&&r[a]&&(n[s]=_a(r[a]))}return n}function lo(t,e){let r=Ea(t),n=Ta(r);return _a(n[e])}function pl(t,e,r,n=!0){if(!e||!Number.isFinite(r))return!1;let s=Ea(t),o=Ta(s),a=_a(o[e]),i=Math.floor(r),l=a.rows.includes(i);if(n&&!l)a.rows.push(i),a.rows.sort((d,c)=>d-c);else if(!n&&l)a.rows=a.rows.filter(d=>d!==i);else return!1;return o[e]=a,cu(s,o),!0}function yl(t,e,r,n=!0){if(!e||!r)return!1;let s=Ea(t),o=Ta(s),a=_a(o[e]),i=a.cols.includes(r);if(n&&!i)a.cols.push(r);else if(!n&&i)a.cols=a.cols.filter(l=>l!==r);else return!1;return o[e]=a,cu(s,o),!0}function fl(t,e,r,n,s=!0){if(!e||!n||!Number.isFinite(r))return!1;let o=Ea(t),a=Ta(o),i=_a(a[e]),l=Kf(r,-1)==="-1:-1"?`${r}:${n}`:`${r}:${n}`,d=`${Math.floor(r)}:${n}`,c=i.cells.includes(d);if(s&&!c)i.cells.push(d);else if(!s&&c)i.cells=i.cells.filter(u=>u!==d);else return!1;return a[e]=i,cu(o,a),!0}function Bh(t,e=[]){let r=Ea(t);return nE(r,e)}function zh(t,e,r,n){if(!ps(t))return!1;let s=t[e];if(!s)return!1;if(Number.isFinite(r)&&s.rows.includes(r)||typeof n=="string"&&n.length>0&&s.cols.includes(n))return!0;if(Number.isFinite(r)&&typeof n=="string"&&n.length>0){let o=`${r}:${n}`;if(s.cells.includes(o))return!0}return!1}function du(t,e,r){if(!ps(t))return!1;let n=t[e];return n?Number.isFinite(r)&&n.rows.includes(r):!1}var Z_,Lh,lu,Oh,gl=O(()=>{Ve();J();Fe();jr();Z_="tableLocks",Lh="scopes";Oh=U.namespace(Z_)});function sE(){return uu||(uu=N.createScope("TableAutoSchedule")),uu}function jh(t,e,r){let n=Oe(e||Lt);return`${String(t||"")}::${n}::${String(r||"")}`}function oE(t,e,r){if(!r)return null;let n=Kh.get(jh(t,e,r),null);return n&&typeof n=="object"?n:null}function aE(t,e,r,n){if(!r)return;let s=Number.isFinite(n)?n:-1;Kh.set(jh(t,e,r),{lastMessageIndex:s,lastUpdatedAt:new Date().toISOString()})}function Uh(t,e,r=[],n){for(let s of r)aE(t,e,s,n)}function Fh({chatId:t,isolationKey:e,currentMessageIndex:r,scopeTables:n=[]}){let s=new Set,o={};for(let a of n){let i=a?.id||a?.uid||"";if(!i)continue;if(a?.enabled===!1){o[i]="disabled";continue}let l=a?.updateConfig?.updateFrequency;if(!Number.isFinite(l)||l===-1){s.add(i);continue}if(l===0){o[i]="frequency_zero";continue}if(l>=1){let d=oE(t,e,i);if(!d||!Number.isFinite(d.lastMessageIndex)){s.add(i);continue}let c=r-d.lastMessageIndex;c>=l?s.add(i):o[i]=`frequency_not_met (${c}/${l})`}else s.add(i)}return sE().info("buildAutoSchedulePlan",{chatId:t,isolationKey:e,currentMessageIndex:r,shouldUpdateCount:s.size,skipReasonsCount:Object.keys(o).length,shouldUpdateTables:[...s],skipReasons:o}),{shouldUpdate:s,skipReasons:o}}var Kh,uu,Wh=O(()=>{Ve();J();Fe();Kh=U.namespace("tableAutoSchedule")});function iE(t){let e=Ih(t);return e&&(e.mode==="incremental"||e.mode==="full")?e:xh(t)}function ke(){return N.createScope("TableUpdate")}function cE(t,e){return new Promise(r=>{if(e?.aborted){r(!1);return}let n,s=()=>{clearTimeout(n);try{e?.removeEventListener?.("abort",s)}catch{}r(!1)};n=setTimeout(()=>{try{e?.removeEventListener?.("abort",s)}catch{}r(!0)},t);try{e?.addEventListener?.("abort",s)}catch{}})}function ne(t,e=""){return t==null?e:String(t).trim()||e}function Hh(t=[],e=8,r="all"){if(!Array.isArray(t)||t.length===0)return"";let n=r==="assistant_only"?t.filter(s=>s?.role==="assistant"):t;return n.slice(Math.max(n.length-e,0)).map(s=>`[${ne(s?.role,"unknown")}] ${String(s?.content||"").trim()}`).filter(Boolean).join(`

`)}function qh(t,{extractTags:e=[],useGlobalRules:r=!1,regexPresetId:n=""}={}){if(!t)return t;let s=Array.isArray(e)&&e.length>0,o=typeof n=="string"&&n.trim().length>0;if(!s&&!r&&!o)return t;try{let a=[],i=[];if(o)try{let l=Le.getPreset(n);if(l){let d=Array.isArray(l.rules)?l.rules.filter(c=>c&&c.enabled!==!1&&c.value):[];a.push(...d),Array.isArray(l.blacklist)&&i.push(...l.blacklist.map(c=>String(c||"").trim()).filter(Boolean))}else ke().warn("applyContextExtractionRules: \u627E\u4E0D\u5230\u6B63\u5219\u9884\u8BBE",{regexPresetId:n})}catch(l){ke().warn("applyContextExtractionRules: \u52A0\u8F7D\u6B63\u5219\u9884\u8BBE\u5931\u8D25",l)}if(s&&a.push(...e.map(l=>{let d=String(l||"").trim();return d.startsWith("regex:")?{type:"regex_include",value:d.slice(6).trim(),enabled:!0}:{type:"include",value:d,enabled:!0}}).filter(l=>l.value)),r){let l=Es()||[];a=[...a,...l.filter(d=>d?.enabled)],i=[...i,...As()||[]]}return a.length===0&&i.length===0?t:Or(t,a,i)||t}catch(a){return ke().warn("applyContextExtractionRules \u5931\u8D25\uFF0C\u56DE\u9000\u539F\u59CB\u6587\u672C",a),t}}function dE(t=[],e=-1){return!Number.isFinite(e)||e<0?t:t.map(r=>{let n=Array.isArray(r?.rows)?r.rows:[];return e===0||n.length<=e?r:{...r,rows:n.slice(n.length-e)}})}function uE(t=[]){return!Array.isArray(t)||t.length===0?"":t.map((e,r)=>{let n=e?.aiInstructions&&typeof e.aiInstructions=="object"?e.aiInstructions:{},s=Array.isArray(e?.columns)?e.columns:[],o=[`\u8868 ${r}: ${ne(e?.name,`\u8868${r+1}`)}`,`\u8868\u683C\u8BF4\u660E: ${ne(e?.note,"\u65E0")}`,`\u521D\u59CB\u5316\u8BF4\u660E: ${ne(n.init,"\u65E0")}`,`\u65B0\u589E\u8BF4\u660E: ${ne(n.create,"\u65E0")}`,`\u66F4\u65B0\u8BF4\u660E: ${ne(n.update,"\u65E0")}`,`\u5220\u9664\u8BF4\u660E: ${ne(n.delete,"\u65E0")}`,"\u5B57\u6BB5\uFF08\u8BF7\u7528\u5217\u7D22\u5F15\u4F5C\u4E3A data key\uFF09:"];return s.forEach((a,i)=>{o.push(`- [${i}]: ${ne(a?.title||a?.key,"\u672A\u547D\u540D\u5B57\u6BB5")} \u2014 ${ne(a?.description,"\u65E0")}`)}),o.join(`
`)}).join(`

`)}function pE(t,e=[]){if(!t||!Array.isArray(e)||e.length===0)return"";let r=e.map((s,o)=>{let a=ne(s?.name,`\u8868${o+1}`),i=t.includes(s,o);return`\u8868 ${o}: ${a} - ${i?"\u5141\u8BB8\u7F16\u8F91":"\u53EA\u8BFB\uFF0C\u7981\u6B62\u4FEE\u6539"}`});return e.some((s,o)=>!t.includes(s,o))&&(r.push(""),r.push('\u3010\u91CD\u8981\u7EA6\u675F\u3011\u6807\u8BB0\u4E3A"\u53EA\u8BFB"\u7684\u8868\u683C\uFF0C\u4F60\u5FC5\u987B\u5728\u8F93\u51FA\u4E2D\u539F\u6837\u4FDD\u7559\u5176\u6240\u6709\u884C\u6570\u636E\uFF0C\u4E0D\u5F97\u65B0\u589E\u3001\u4FEE\u6539\u6216\u5220\u9664\u4EFB\u4F55\u884C\u3002'),r.push("\u5168\u91CF\u8F93\u51FA\u65F6\uFF0C\u53EA\u8BFB\u8868\u683C\u7684 rows \u5FC5\u987B\u4E0E\u8F93\u5165\u4E2D\u7684\u5B8C\u5168\u4E00\u81F4\u3002")),r.join(`
`)}function Vh(t={},e=0,r=[]){let n=t&&typeof t=="object"?t:{},s=n.cells&&typeof n.cells=="object"&&!Array.isArray(n.cells)?n.cells:{},o={},a=Array.isArray(r)?r.map(l=>ne(l?.key,"")).filter(Boolean):[];return new Set([...Object.keys(s),...a]).forEach(l=>{o[l]=ne(s[l],"")}),{...n,id:Yo(n.id||n.rowId,e),name:ne(n.name,""),cells:o}}function fs(t={},e=0){let r=t&&typeof t=="object"?t:{},n=Array.isArray(r.columns)?pe(r.columns):[],s=Array.isArray(r.rows)?r.rows.map((o,a)=>Vh(o,a,n)):[];return{...r,id:ur(r.id||r.key,e),rows:s}}function $r(t=[]){return Array.isArray(t)?t.map((e,r)=>fs(e,r)):[]}function yE(t=[],e=[],r){let n=$r(t),s=$r(e);if(!r)return s;let o=new Map(s.map((u,y)=>[ur(u?.id||u?.key,y),u])),a=n.map((u,y)=>({table:u,tableIndex:y,id:ur(u?.id||u?.key,y)})).filter(({table:u,tableIndex:y})=>r.includes(u,y)),i=new Set,l=new Map;for(let u=0;u<s.length;u++){let y=s[u],p=ur(y?.id||y?.key,u);o.has(p)&&(l.set(p,y),i.add(p))}let d=0,c=s.filter((u,y)=>{let p=ur(u?.id||u?.key,y);return!i.has(p)});return n.map((u,y)=>{let p=ur(u?.id||u?.key,y);if(!r.includes(u,y))return fs(u,y);let g=l.get(p);if(g)return fs(g,y);let m=c[d];return m?(d++,fs({...m,id:u.id||m.id},y)):fs(u,y)})}function fE(t=[],e=[],r,n={}){if(!Array.isArray(t)||!r)return{edits:[],stats:{total:0,passed:0,droppedByScope:0,droppedByLock:0}};let s=$r(e),o=[],a=0,i=0;for(let l of t){let d=Number.isFinite(l?.tableIndex)?l.tableIndex:-1;if(d<0||d>=s.length){a++;continue}let c=s[d];if(!r.includes(c,d)){a++;continue}if(l.op===Bs.INSERT_ROW){o.push(l);continue}let u=Number.isFinite(l?.rowIndex)?l.rowIndex:-1;if(u<0||u>=(Array.isArray(c?.rows)?c.rows.length:0)){a++;continue}if(l.op===Bs.DELETE_ROW){if(du(n,d,u)){i++;continue}o.push(l);continue}o.push(l)}return{edits:o,stats:{total:t.length,passed:o.length,droppedByScope:a,droppedByLock:i}}}function gE(t=[],e){let r=$r(t);return e?r.map((n,s)=>{let o=Array.isArray(n?.columns)?n.columns:[];return e.includes(n,s)?{...fs(n,s),scopeEditable:!0,scopeStatus:"editable"}:{...fs(n,s),scopeEditable:!1,scopeStatus:"readonly",rows:Array.isArray(n?.rows)?n.rows.map((a,i)=>Vh(a,i,o)):[]}}):r}function mE(t,e,r){return{target:{sourceMessageId:ne(t?.sourceMessageId),sourceSwipeId:ne(t?.sourceSwipeId||t?.effectiveSwipeId),slotBindingKey:ne(t?.slotBindingKey),slotRevisionKey:ne(t?.slotRevisionKey),slotTransactionId:ne(t?.slotTransactionId)},loadMode:ne(e?.loadMode),mergeBaseOnly:e?.mergeBaseOnly===!0,resolvedFromMessageId:ne(e?.resolvedFromMessageId),resolvedFromRevisionKey:ne(e?.resolvedFromRevisionKey),sourceKind:ne(e?.sourceKind||e?.state?.meta?.sourceKind),scope:typeof r?.toJSON=="function"?r.toJSON():null,tables:gE(e?.state?.tables,r)}}function Gh(){return hE}function Yh(t,e){if(!t||typeof t!="string")return{key:t,source:"fallback"};if(!Array.isArray(e)||e.length===0)return{key:t,source:"fallback"};for(let n of e)if(n?.key===t)return{key:t,source:"direct"};if(/^\d+$/.test(t)){let n=parseInt(t,10);if(n>=0&&n<e.length&&e[n]?.key)return{key:e[n].key,source:"index"}}let r=t.match(/^col(?:_(\d+))?$/i);if(r){let n=r[1]?parseInt(r[1],10)-1:0;if(n>=0&&n<e.length&&e[n]?.key)return{key:e[n].key,source:"col_n"}}return{key:t,source:"fallback"}}function bE(t,e,r,n=null){let s=$r(t||[]),o=r||{},a={direct:0,index:0,col_n:0,fallback:0},i={},l={};if(Array.isArray(e))for(let d of e){let c=Number.isFinite(d?.tableIndex)?d.tableIndex:-1;i[c]=(i[c]||0)+1,l[d?.op||"unknown"]=(l[d?.op||"unknown"]||0)+1}ke().info("applyIncrementalEdits \u603B\u89C8",{totalEdits:e?.length||0,tableCount:s.length,editsByTable:i,editsByOp:l});for(let d of e){let c=d.tableIndex;if(c<0||c>=s.length)continue;let u=s[c];if(!u||!Array.isArray(u.rows)||n&&!n.includes(u,c))continue;if(d.op===Bs.INSERT_ROW){let p={id:zr("row"),name:"",cells:{}};if(d.data&&typeof d.data=="object"){p.name=ne(d.data.name,"");let m=Array.isArray(u.columns)?u.columns:[];for(let[h,b]of Object.entries(d.data)){if(h==="name")continue;let{key:x,source:w}=Yh(h,m);p.cells[x]=ne(b),a[w]=(a[w]||0)+1}}Object.keys(p.cells).length===0&&!p.name&&ke().warn("applyIncrementalEdits: \u63D2\u5165\u7A7A\u884C\uFF08data \u89E3\u6790\u4E3A\u7A7A\uFF09",{tableIndex:c,tableName:u.name,editDataKeys:d.data?Object.keys(d.data):[],editDataPreview:JSON.stringify(d.data||{}).slice(0,200)}),u.rows.push(p);continue}let y=d.rowIndex;if(!(y<0||y>=u.rows.length)){if(d.op===Bs.DELETE_ROW){if(du(o,c,y))continue;u.rows.splice(y,1);continue}if(d.op===Bs.UPDATE_ROW){let p=u.rows[y];if(!p)continue;if(p.id=Yo(p.id||p.rowId,y),p.cells=p.cells||{},d.data&&typeof d.data=="object"){let g=Array.isArray(u.columns)?u.columns:[];for(let[m,h]of Object.entries(d.data)){if(m==="name")continue;let{key:b,source:x}=Yh(m,g);zh(o,c,y,b)||(p.cells[b]=ne(h),a[x]=(a[x]||0)+1)}d.data.name!==void 0&&(p.name=ne(d.data.name,p.name))}}}}return Object.values(a).some(d=>d>0)&&ke().info("\u5217 key \u89E3\u6790\u7EDF\u8BA1",a),$r(s)}async function xE({executionContext:t,targetSnapshot:e,loadResult:r,config:n,assistantSnapshot:s,fillMode:o,runScope:a}={}){let i=sr(n),l=o==="incremental"||!o&&i.fillMode!=="full",d=tg(i,{skipResponseContract:l}),c=mE(e,r,a),u=Array.isArray(s?.tableState?.tables)?$r(s.tableState.tables):[],y=t?.chatHistory||t?.chatMessages||[],{contextDepth:p,contextRoles:g,contextExtractTags:m,contextUseGlobalRules:h,sendLatestRows:b}=i,x=i?.extraction?.regexPresetId||"",w=Hh(y,p,g),T=Hh(y,p,"all"),I=qh(w,{extractTags:m,useGlobalRules:h,regexPresetId:x}),S=qh(T,{extractTags:m,useGlobalRules:h,regexPresetId:x}),A=await ai({worldbooks:i.worldbooks}),P=dE(c.tables,b),M={...c,tables:P},R={...t,toolName:"\u586B\u8868\u5DE5\u4F5C\u53F0",toolId:"tableWorkbench",lastAiMessage:t?.assistantBaseText||t?.lastAiMessage||"",recentMessagesText:I,rawRecentMessagesText:S,toolWorldbookContent:A,tableGuidance:uE(i.tables),tableScopeGuidance:pE(a,c.tables),injectedContext:s?.injectedContext||Jt.getLatestMessageInjectedContext(e?.sourceMessageId),toolContentMacro:JSON.stringify(M,null,2),extractedContent:JSON.stringify(M,null,2),previousToolOutput:JSON.stringify(u,null,2)},_=await ss.buildToolMessages(d,R),$=await ss.buildPromptText(d,R);if(l&&($+=Gh(),Array.isArray(_)&&_.length>0)){let Y=_[_.length-1];Y&&typeof Y.content=="string"&&(Y.content+=Gh())}if(!Array.isArray(_)||_.length===0)throw new Error("\u586B\u8868\u8BF7\u6C42\u6D88\u606F\u6784\u5EFA\u5931\u8D25\u3002");let F=i.apiPreset||"";try{let Y=Array.isArray(c?.tables)?c.tables:[],re=Y.filter(ie=>ie?.scopeEditable!==!1).map(ie=>ne(ie?.updateConfig?.apiPreset,"")).filter(Boolean);re.length>0&&re.every(ie=>ie===re[0])&&(F=re[0],ke().info("L3: \u8868\u7EA7 API \u9884\u8BBE\u751F\u6548",{preset:F,affectedTables:Y.filter(ie=>ie?.scopeEditable!==!1).map(ie=>ie?.name||ie?.id)}))}catch(Y){ke().warn("L3 \u8868\u7EA7 API \u9884\u8BBE\u89E3\u6790\u5931\u8D25\uFF0C\u7528\u5168\u5C40",Y)}return{toolConfig:d,context:R,requestPayload:c,promptText:$,messages:_,fillMode:l?"incremental":"full",effectiveApiPreset:F,runScope:typeof a?.toJSON=="function"?a.toJSON():null}}async function wE(t,e={},r=null){let n=sr(e),s=ne(e?._effectiveApiPreset||n.apiPreset,"");if(s){if(!Ao(s))throw new Error(`API \u9884\u8BBE\u4E0D\u5B58\u5728: ${s}`);return Co(s,t,{},r)}return ko(t,{},r)}function Gr({status:t=De.IDLE,targetSnapshot:e=null,skipReason:r="",startedAt:n=Date.now(),error:s=""}={}){return{lastAutoRunAt:n,lastAutoStatus:ne(t,De.IDLE),lastAutoMessageId:ne(e?.sourceMessageId,""),lastAutoRevisionKey:ne(e?.slotRevisionKey,""),lastAutoSkipReason:ne(r,""),...s?{lastError:s,lastErrorDetails:[s]}:{}}}function Nr(t={},e=yt.MANUAL){let r=t&&typeof t=="object"?t:{};return Object.keys(r).length?eg(r):null}function ys({targetSnapshot:t=null,startedAt:e=Date.now(),status:r="idle",skipReason:n="",warning:s="",writeback:o=null,aborted:a=!1,stale:i=!1,abortReason:l="",error:d=""}={}){return{isAutoRun:!0,status:r,startedAt:e,targetSnapshot:t,sourceMessageId:ne(t?.sourceMessageId,""),sourceSwipeId:ne(t?.sourceSwipeId||t?.effectiveSwipeId,""),slotRevisionKey:ne(t?.slotRevisionKey,""),writebackStatus:o?.success===!0?"success":s?"warning":"",refreshConfirmed:o?.mirrorResult?.refreshConfirmed===!0,warning:ne(s,""),skipReason:ne(n,""),aborted:a===!0,stale:i===!0,abortReason:ne(l,""),error:ne(d,"")}}function hl(t=null){if(t?.signal?.aborted)return{aborted:!0,stale:!1,reason:"cancelled_before_host_commit"};if(typeof t?.shouldAbortWriteback=="function")try{return t.shouldAbortWriteback()||!1}catch{return{aborted:!0,stale:!0,reason:"stale_base_changed"}}return!1}async function Aa(t=null,e={}){return Xh({configInput:t,runSource:yt.MANUAL,clearBeforeUpdate:e?.clearBeforeUpdate===!0,executionContextBuilder:()=>Un({runSource:yt.MANUAL}),targetResolver:r=>fa(r,{runSource:yt.MANUAL})})}async function Jh({messageId:t,swipeId:e="",sourceEvent:r="AUTO_TABLE",configInput:n=null,signal:s=null,shouldAbortWriteback:o=null}={}){return Xh({configInput:n,runSource:yt.AUTO,autoMeta:{sourceEvent:r,messageId:ne(t,""),swipeId:ne(e,""),signal:s,shouldAbortWriteback:o},executionContextBuilder:()=>Fn({messageId:t,swipeId:e,runSource:yt.AUTO}),targetResolver:a=>fa(a,{runSource:yt.AUTO})})}async function Xh({configInput:t=null,runSource:e=yt.MANUAL,executionContextBuilder:r,targetResolver:n,autoMeta:s=null,clearBeforeUpdate:o=!1}={}){let a=sr(t||Te()),i=rd(a),l=_i({tables:Array.isArray(a.tables)?a.tables:[]}),d=e===yt.AUTO,c=Date.now();if(ke().info(`\u5F00\u59CB\u586B\u8868 [${e}]`,{isAutoRun:d,fillMode:a.fillMode}),!i.valid||!l.valid){let m=[...i.errors,...l.errors];return ke().error("\u914D\u7F6E\u6821\u9A8C\u5931\u8D25",{errors:m}),Nr({lastStatus:De.ERROR,lastRunAt:c,lastDurationMs:0,lastError:m[0]||"\u586B\u8868\u914D\u7F6E\u65E0\u6548\u3002",lastErrorDetails:m,lastValidationSummary:l.summary||{errorCount:m.length,warningCount:0},errorCount:Number(a?.runtime?.errorCount)||0,...d?Gr({status:De.ERROR,startedAt:c,skipReason:"invalid_config",error:m[0]||"\u586B\u8868\u914D\u7F6E\u65E0\u6548\u3002"}):{}},e),{success:!1,error:m.join(`
`),errors:m,...d?{meta:ys({startedAt:c,status:De.ERROR,skipReason:"invalid_config",error:m[0]||"\u586B\u8868\u914D\u7F6E\u65E0\u6548\u3002"})}:{}}}let u=a.runtime||{},y=Array.isArray(a.tables)?a.tables:[];try{let h=Js({})?.template?.tables;if(Array.isArray(h)&&h.length>0){let b=a.tableEnabledOverrides&&typeof a.tableEnabledOverrides=="object"?a.tableEnabledOverrides:{};if(y=h.map(w=>{let T=w?.id,I=T&&Object.prototype.hasOwnProperty.call(b,T)?b[T]:void 0,S=I!==void 0?I:w.enabled!==!1;return{...w,enabled:S}}),d){let w=Number.isFinite(targetSnapshot?.targetMessageIndex)?targetSnapshot.targetMessageIndex:-1,T=Fh({chatId:targetSnapshot?.chatId||"",isolationKey:ue.getKey?ue.getKey():"",currentMessageIndex:w,scopeTables:y});y=y.map(I=>{let S=I?.id||I?.uid||"";return S&&!T.shouldUpdate.has(S)?{...I,enabled:!1}:I})}let x=y.filter(w=>w.enabled===!1).map(w=>w?.name||w?.id);x.length>0&&ke().info("scopeTables: \u7528\u6237\u7981\u7528\u4E86\u90E8\u5206\u8868",{disabledCount:x.length,disabledNames:x})}}catch{}let p=jf(a.scope||a,y);if(ke().info("runScope \u5DF2\u89E3\u6790",{mode:p.mode,requestedMode:p.requestedMode,staleScope:p.staleScope,scopeTablesCount:Array.isArray(y)?y.length:0,allowedTableIds:p.allowedTableIds,allTableIds:p.allTableIds,scopeTablesEnabled:Array.isArray(y)?y.map(m=>({id:m?.id,name:m?.name,enabled:m?.enabled})):[]}),p.staleScope&&ke().warn("runScope: \u68C0\u6D4B\u5230 stale scope\uFF08activeTableId/selectedTableIds \u4E0D\u5728\u5F53\u524D tables \u8303\u56F4\u5185\uFF09\uFF0C\u5DF2\u81EA\u52A8 fallback \u5230 enabled",{requestedMode:p.requestedMode,requestedActiveTableId:p.activeTableId,requestedSelectedTableIds:p.selectedTableIds}),(p.mode==="current"||p.mode==="selected")&&p.allowedTableIds.length===0){let m=p.mode==="current"?"\u672A\u6307\u5B9A\u5F53\u524D\u8868\u683C\uFF0C\u65E0\u6CD5\u6267\u884C\u3002":"\u672A\u9009\u62E9\u4EFB\u4F55\u8868\u683C\uFF0C\u65E0\u6CD5\u6267\u884C\u3002";return ke().warn(m,{mode:p.mode}),Nr({lastStatus:De.ERROR,lastRunAt:c,lastDurationMs:0,lastError:m,lastErrorDetails:[m]},e),{success:!1,error:m,errors:[m]}}let g=null;Nr({lastStatus:De.RUNNING,lastError:"",lastErrorDetails:[],lastValidationSummary:l.summary||{errorCount:0,warningCount:0},lastScopeMode:ne(p.mode,""),...d?Gr({status:De.RUNNING,startedAt:c,skipReason:""}):{}},e);try{if(typeof r!="function")throw new Error("table_update_missing_execution_context_builder");if(typeof n!="function")throw new Error("table_update_missing_target_resolver");let m=await r();ke().info("\u6267\u884C\u4E0A\u4E0B\u6587\u5DF2\u6784\u5EFA");let h=n(m);if(!h)throw new Error("\u5F53\u524D\u6CA1\u6709\u53EF\u7528\u7684 assistant \u76EE\u6807\u697C\u5C42\u3002");g=h,ke().info("\u76EE\u6807\u6D88\u606F\u5DF2\u89E3\u6790",{sourceMessageId:h.sourceMessageId,slotRevisionKey:h.slotRevisionKey}),d&&Nr(Gr({status:De.RUNNING,targetSnapshot:h,startedAt:c,skipReason:""}),e);let b=ne(a.autoUpdateTrigger,"assistantMessage");if(d&&(!a.autoUpdateEnabled||b!=="assistantMessage")){let X=a.autoUpdateEnabled?"auto_trigger_not_assistant_message":"auto_update_disabled";return Nr(Gr({status:De.SKIPPED,targetSnapshot:h,startedAt:c,skipReason:X}),e),{success:!1,skipped:!0,reason:X,targetSnapshot:h,meta:ys({targetSnapshot:h,startedAt:c,status:De.SKIPPED,skipReason:X})}}if(d){let X=hl(s);if(X)return Nr(Gr({status:De.ABORTED,targetSnapshot:h,startedAt:c,skipReason:X.reason,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88"}),e),{success:!1,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88",targetSnapshot:h,meta:ys({targetSnapshot:h,startedAt:c,status:De.ABORTED,skipReason:X.reason,aborted:X.aborted===!0,stale:X.stale===!0,abortReason:X.reason,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88"})}}let x=await Qm(h);if(!x?.success)throw new Error(x?.error||"\u76EE\u6807\u89E3\u6790\u8BB0\u5F55\u5931\u8D25");if(o&&Number.isFinite(h?.targetMessageIndex)&&h.targetMessageIndex>=0){ke().info("clearBeforeUpdate \u542F\u7528\uFF0C\u6E05\u7A7A\u76EE\u6807\u697C\u5C42\u6570\u636E",{targetMessageIndex:h.targetMessageIndex});try{let X=await Zm(h.targetMessageIndex);ke().info("clearBeforeUpdate \u5B8C\u6210",X)}catch(X){ke().error("clearBeforeUpdate \u5931\u8D25",X)}}let w=ls(h.sourceMessageId),T=Array.isArray(y)&&y.length>0?y:a.tables;ke().info("templateTables \u6765\u6E90",{usingActiveTemplate:y!==(Array.isArray(a.tables)?a.tables:[]),tableCount:Array.isArray(T)?T.length:0,firstTableName:T?.[0]?.name||"",firstTableId:T?.[0]?.id||""});let I=Xm(h,{templateTables:T}),S=$r(I?.state?.tables||[]),A=Nh(),P=s?.signal||m?.signal||null;ke().info("\u72B6\u6001\u5DF2\u52A0\u8F7D",{loadMode:I?.loadMode,sourceKind:I?.sourceKind,tableCount:S.length});let M=await A.buildRequest({buildRequest:xE},{executionContext:m,targetSnapshot:h,loadResult:I,config:a,assistantSnapshot:w,runScope:p});ke().info("\u8BF7\u6C42\u5DF2\u6784\u5EFA",{messageCount:M?.messages?.length,fillMode:M?.fillMode});let R="",_=null,$=null;for(let X=1;X<=ml;X++){if(P?.aborted)throw new Error("\u8BF7\u6C42\u5DF2\u53D6\u6D88");try{if(R=await A.sendRequest({sendRequest:wE},M,{config:{...a,_effectiveApiPreset:M?.effectiveApiPreset||""},abortSignal:P}),ke().info("API \u54CD\u5E94\u5DF2\u6536\u5230",{attempt:X,responseLength:R?.length||0}),_=A.parseResponse({parseResponse:iE},R),ke().info("\u54CD\u5E94\u5DF2\u89E3\u6790",{attempt:X,mode:_?.mode,hasEdits:!!_?.edits,hasTables:!!_?.tables,rawFormat:_?.rawFormat}),!(_?.mode==="incremental"&&Array.isArray(_.edits)&&_.edits.length>0||_?.mode==="full"&&_?.tables))throw new Error("AI \u54CD\u5E94\u4E2D\u672A\u627E\u5230\u6709\u6548\u7684 <tableEdit> \u6807\u7B7E\u6216\u8868\u683C JSON");$=null;break}catch(We){if($=We,ke().warn(`\u586B\u8868 attempt ${X}/${ml} \u5931\u8D25`,{error:We?.message||String(We)}),X<ml&&!await cE(lE,P))throw new Error("\u8BF7\u6C42\u5DF2\u53D6\u6D88\uFF08\u91CD\u8BD5\u7B49\u5F85\u671F\u95F4\uFF09")}}if($)throw new Error(`\u586B\u8868\u5931\u8D25\uFF08${ml} \u6B21\u91CD\u8BD5\u540E\u4ECD\u5931\u8D25\uFF09: ${$?.message||String($)}`);let F,Y=null,re=M.fillMode||"full",ie=null;if(_.mode==="incremental"&&_.edits){let X=Bh(I?.state,S),We=fE(_.edits,S,p,X);ie=We.stats,F=bE(S,We.edits,X,p),re="incremental",(ie.droppedByScope>0||ie.droppedByLock>0)&&ke().info("scope \u8FC7\u6EE4",ie)}else if(_.mode==="full"&&_.tables){let X=$r(_.tables);F=yE(S,X,p),re="full"}else F=$r(S);if(Y=Mh(S,F),ke().info("\u5DEE\u5F02\u5DF2\u8BA1\u7B97",{fillMode:re}),d){let X=hl(s);if(X)return Nr(Gr({status:De.ABORTED,targetSnapshot:h,startedAt:c,skipReason:X.reason,error:"\u5199\u56DE\u524D\u5DF2\u53D6\u6D88"}),e),{success:!1,error:"\u5199\u56DE\u524D\u5DF2\u53D6\u6D88",targetSnapshot:h,meta:ys({targetSnapshot:h,startedAt:c,status:De.ABORTED,aborted:X.aborted===!0,stale:X.stale===!0,abortReason:X.reason,error:"\u5199\u56DE\u524D\u5DF2\u53D6\u6D88"})}}let Z=await yh({targetSnapshot:h,nextTables:F,config:a,loadResult:I,diff:Y,fillMode:re,skipNotify:d});if(d){let X=hl(s);if(X)return Nr(Gr({status:De.ABORTED,targetSnapshot:h,startedAt:c,skipReason:X.reason,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88"}),e),{success:!1,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88",targetSnapshot:h,loadResult:I,request:M,responseText:R,parsed:_,fillMode:re,diff:Y,previousTables:S,nextTables:F,runScope:p,state:Z?.state,bindings:Z?.bindings,mirrorResult:Z?.mirrorResult,warning:Z?.warning||"",meta:ys({targetSnapshot:h,startedAt:c,status:De.ABORTED,warning:Z?.warning||"",writeback:Z,aborted:X.aborted===!0,stale:X.stale===!0,abortReason:X.reason,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88"})}}if(!Z?.success)throw new Error(Z?.error||"\u7ED3\u6784\u5316\u5199\u56DE\u5931\u8D25");if(d)try{let X=Number.isFinite(h?.targetMessageIndex)?h.targetMessageIndex:-1,We=y.filter(Ae=>Ae?.enabled!==!1&&(Ae?.id||Ae?.uid)).map(Ae=>Ae.id||Ae.uid);We.length>0&&X>=0&&Uh(h?.chatId||"",ue.getKey?ue.getKey():"",We,X)}catch(X){ke().warn("recordTablesUpdated \u5931\u8D25\uFF08\u4E0D\u5F71\u54CD\u4E3B\u6D41\u7A0B\uFF09",X)}let we=Date.now()-c;ke().info(`\u586B\u8868\u5B8C\u6210 [${re}] ${we}ms`,{success:!0,writebackSuccess:Z?.success,mirrorSuccess:Z?.mirrorResult?.success});let Ie={lastStatus:De.SUCCESS,lastRunAt:Date.now(),lastDurationMs:we,lastError:"",lastErrorDetails:[],lastValidationSummary:l.summary||{errorCount:0,warningCount:0},successCount:(Number(u.successCount)||0)+1,errorCount:Number(u.errorCount)||0,lastSourceMessageId:ne(h.sourceMessageId),lastSlotRevisionKey:ne(h.slotRevisionKey),lastLoadMode:ne(I.loadMode),lastMirrorApplied:Z?.mirrorResult?.success===!0,lastResolvedFromMessageId:ne(I?.resolvedFromMessageId),lastResolvedFromRevisionKey:ne(I?.resolvedFromRevisionKey),lastSourceKind:ne(I?.sourceKind||I?.state?.meta?.sourceKind),lastScopeMode:ne(p.mode,""),lastFillMode:re,...d?Gr({status:De.SUCCESS,targetSnapshot:h,startedAt:c,skipReason:""}):{}};return Nr(Ie,e),{success:!0,targetSnapshot:h,loadResult:I,request:M,responseText:R,parsed:_,fillMode:re,diff:Y,previousTables:S,nextTables:F,runScope:p,scopeStats:ie,state:Z.state,bindings:Z.bindings,mirrorResult:Z.mirrorResult,warning:Z.warning||"",...d?{meta:ys({targetSnapshot:h,startedAt:c,status:De.SUCCESS,warning:Z.warning||"",writeback:Z})}:{}}}catch(m){let h=Date.now()-c;ke().error(`\u586B\u8868\u5931\u8D25 ${h}ms: ${m?.message||m}`,{stack:m?.stack});let b=d?hl(s):!1,x=m?.name==="AbortError"||m?.message==="\u8BF7\u6C42\u5DF2\u53D6\u6D88"||b?.aborted===!0||b?.stale===!0,w=x?De.ABORTED:De.ERROR,T={lastStatus:w,lastRunAt:Date.now(),lastDurationMs:h,lastError:m?.message||String(m),lastErrorDetails:[m?.message||String(m)],lastValidationSummary:l.summary||{errorCount:0,warningCount:0},successCount:Number(u.successCount)||0,errorCount:x?Number(u.errorCount)||0:(Number(u.errorCount)||0)+1,lastScopeMode:ne(p.mode,""),...d?Gr({status:w,targetSnapshot:g,startedAt:c,skipReason:x?b?.reason||"cancelled_before_host_commit":"",error:m?.message||String(m)}):{}};return Nr(T,e),{success:!1,error:m?.message||String(m),errors:[m?.message||String(m)],...d?{meta:ys({targetSnapshot:g,startedAt:c,status:w,skipReason:x?b?.reason||"cancelled_before_host_commit":"",aborted:x,stale:b?.stale===!0,abortReason:x?b?.reason||"cancelled_before_host_commit":"",error:m?.message||String(m)})}:{}}}}var ml,lE,hE,bl=O(()=>{Wn();ns();Io();qi();J();Fe();ma();cs();nr();fh();dl();Rh();Ph();vi();$h();gl();js();Bo();Cs();ln();Wh();jr();ml=3,lE=5e3;hE=`

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

\u53EA\u8FD4\u56DE <tableEdit> \u6807\u7B7E\uFF0C\u4E0D\u8981\u9644\u52A0\u5176\u4ED6\u5185\u5BB9\u3002`});var eb={};ge(eb,{WindowManager:()=>xl,closeWindow:()=>Zh,createWindow:()=>pu,windowManager:()=>_t});function TE(){if(_t.stylesInjected)return;_t.stylesInjected=!0;let t=`
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
  `,e=er(),r=e.createElement("style");r.id=SE+"_styles",r.textContent=t,(e.head||e.documentElement).appendChild(r)}function pu(t){let{id:e,title:r="\u7A97\u53E3",content:n="",width:s=900,height:o=700,modal:a=!1,resizable:i=!0,maximizable:l=!0,startMaximized:d=!1,rememberState:c=!0,onClose:u,onReady:y}=t;TE();let p=er(),g=p.defaultView||window.parent||window,m=window.jQuery||window.parent?.jQuery;if(!m)return vE.error("jQuery not available"),null;if(_t.isOpen(e))return _t.bringToFront(e),_t.getWindow(e);let h=g.innerWidth||1200,b=g.innerHeight||800,x=h<=1100,w=null,T=!1;c&&(w=_t.getState(e),w&&!x&&(T=!0));let I,S;T&&w.width&&w.height?(I=Math.max(400,Math.min(w.width,h-40)),S=Math.max(300,Math.min(w.height,b-40))):(I=Math.max(400,Math.min(s,h-40)),S=Math.max(300,Math.min(o,b-40)));let A=Math.max(20,Math.min((h-I)/2,h-I-20)),P=Math.max(20,Math.min((b-S)/2,b-S-20)),M=l&&!x,R=`
    <div class="yyt-window" id="${e}" style="left:${A}px; top:${P}px; width:${I}px; height:${S}px;">
      <div class="yyt-window-header">
        <div class="yyt-window-title">
          <i class="fa-solid fa-window-maximize"></i>
          <span>${_E(r)}</span>
        </div>
        <div class="yyt-window-controls">
          ${M?'<button class="yyt-window-btn maximize" title="\u6700\u5927\u5316/\u8FD8\u539F"><i class="fa-solid fa-expand"></i></button>':""}
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
  `,_=null;a&&(_=m(`<div class="yyt-window-overlay" data-for="${e}"></div>`),m(p.body).append(_));let $=m(R);m(p.body).append($),_t.register(e,$),$.on("mousedown",()=>_t.bringToFront(e));let F=!1,Y={left:A,top:P,width:I,height:S},re=()=>{Y={left:parseInt($.css("left")),top:parseInt($.css("top")),width:$.width(),height:$.height()},$.addClass("maximized"),$.find(".yyt-window-btn.maximize i").removeClass("fa-expand").addClass("fa-compress"),F=!0},ie=()=>{$.removeClass("maximized"),$.css({left:Y.left+"px",top:Y.top+"px",width:Y.width+"px",height:Y.height+"px"}),$.find(".yyt-window-btn.maximize i").removeClass("fa-compress").addClass("fa-expand"),F=!1};$.find(".yyt-window-btn.maximize").on("click",()=>{F?ie():re()}),(x&&l||T&&w.isMaximized&&l||d&&l)&&re(),$.find(".yyt-window-btn.close").on("click",()=>{if(c&&l){let Ae={width:F?Y.width:$.width(),height:F?Y.height:$.height(),isMaximized:F};_t.saveState(e,Ae)}u&&u(),_&&_.remove(),$.remove(),_t.unregister(e),m(p).off(".yytWindowDrag"+e),m(p).off(".yytWindowResize"+e)}),_&&_.on("click",Ae=>{Ae.target,_[0]});let Z=!1,we,Ie,X,We;if($.find(".yyt-window-header").on("mousedown",Ae=>{m(Ae.target).closest(".yyt-window-controls").length||F||(Z=!0,we=Ae.clientX,Ie=Ae.clientY,X=parseInt($.css("left")),We=parseInt($.css("top")),m(p.body).css("user-select","none"))}),m(p).on("mousemove.yytWindowDrag"+e,Ae=>{if(!Z)return;let Be=Ae.clientX-we,L=Ae.clientY-Ie;$.css({left:Math.max(0,X+Be)+"px",top:Math.max(0,We+L)+"px"})}),m(p).on("mouseup.yytWindowDrag"+e,()=>{Z&&(Z=!1,m(p.body).css("user-select",""))}),i){let Ae=!1,Be="",L,ee,V,le,tt,Mt;$.find(".yyt-window-resize-handle").on("mousedown",function(ir){F||(Ae=!0,Be="",m(this).hasClass("se")?Be="se":m(this).hasClass("e")?Be="e":m(this).hasClass("s")?Be="s":m(this).hasClass("w")?Be="w":m(this).hasClass("n")?Be="n":m(this).hasClass("nw")?Be="nw":m(this).hasClass("ne")?Be="ne":m(this).hasClass("sw")&&(Be="sw"),L=ir.clientX,ee=ir.clientY,V=$.width(),le=$.height(),tt=parseInt($.css("left")),Mt=parseInt($.css("top")),m(p.body).css("user-select","none"),ir.stopPropagation())}),m(p).on("mousemove.yytWindowResize"+e,ir=>{if(!Ae)return;let Rn=ir.clientX-L,Mn=ir.clientY-ee,hs=400,ja=300,wo=V,Vr=le,Pn=tt,Ua=Mt;if(Be.includes("e")&&(wo=Math.max(hs,V+Rn)),Be.includes("s")&&(Vr=Math.max(ja,le+Mn)),Be.includes("w")){let Nn=V-Rn;Nn>=hs&&(wo=Nn,Pn=tt+Rn)}if(Be.includes("n")){let Nn=le-Mn;Nn>=ja&&(Vr=Nn,Ua=Mt+Mn)}$.css({width:wo+"px",height:Vr+"px",left:Pn+"px",top:Ua+"px"})}),m(p).on("mouseup.yytWindowResize"+e,()=>{Ae&&(Ae=!1,m(p.body).css("user-select",""))})}return $.on("remove",()=>{m(p).off(".yytWindowDrag"+e),m(p).off(".yytWindowResize"+e)}),y&&setTimeout(()=>y($),50),$}function Zh(t){let e=_t.getWindow(t);if(e){let r=window.jQuery||window.parent?.jQuery;if(r){let n=er();r(`.yyt-window-overlay[data-for="${t}"]`).remove(),r(n).off(".yytWindowDrag"+t),r(n).off(".yytWindowResize"+t)}e.remove(),_t.unregister(t)}}function _E(t){return typeof t!="string"?"":t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}var vE,SE,Qh,xl,_t,yu=O(()=>{Ve();J();ut();vE=N.createScope("WindowManager"),SE="youyou_toolkit_window_manager",Qh="window_states",xl=class{constructor(){this.windows=new Map,this.baseZIndex=1e4,this.topZIndex=1e4,this.stylesInjected=!1}register(e,r){this.topZIndex++,this.windows.set(e,{$el:r,zIndex:this.topZIndex}),r.css("z-index",this.topZIndex)}unregister(e){this.windows.delete(e)}bringToFront(e){let r=this.windows.get(e);r&&(this.topZIndex++,r.zIndex=this.topZIndex,r.$el.css("z-index",this.topZIndex))}getWindow(e){return this.windows.get(e)?.$el||null}isOpen(e){return this.windows.has(e)}closeAll(){this.windows.forEach((e,r)=>{e.$el&&e.$el.remove()}),this.windows.clear()}saveState(e,r){let n=this.loadStates();n[e]={...r,updatedAt:Date.now()},qa.set(Qh,n)}loadStates(){return qa.get(Qh)||{}}getState(e){return this.loadStates()[e]||null}},_t=new xl});function mu(){return{addedTables:[],deletedTables:[],renamedTables:[],movedTables:[],patchedAiInstructions:[],patchedColumns:[],patchedRows:[],patchedExportConfig:[],patchedLocks:[],patchedWorkbenchConfig:[]}}function hu(t,e=""){return{protocolVersion:gs,mode:co,baseFingerprint:t||"",summary:"",warnings:[],operations:[],currentTableId:String(e||"")}}function bu(){let t=0,e=!1;return{createRunGuard(){let r=t;return{isCancelled:()=>e,isStale:()=>!e&&r!==t}},invalidate(){t+=1},cancel(){e=!0,t+=1},reset(){e=!1,t+=1}}}function Bt(t){return t===void 0?t:JSON.parse(JSON.stringify(t))}function EE(t){try{return JSON.stringify(t)}catch{return""}}async function ka(t){if(!t||!Array.isArray(t.tables))return"empty";let e=t.tables.map(i=>({id:i.id||"",name:i.name||"",note:i.note||"",enabled:i.enabled,columns:Array.isArray(i.columns)?i.columns.map(l=>({key:l.key||"",title:l.title||"",type:l.type||""})):[],aiInstructions:i.aiInstructions||{},exportConfig:i.exportConfig||{}})),r=EE(e),s=new TextEncoder().encode(r),o=await crypto.subtle.digest("SHA-256",s);return`yyt-fp:${Array.from(new Uint8Array(o)).slice(0,8).map(i=>i.toString(16).padStart(2,"0")).join("")}`}function vl(t,e){let r=Number(t);if(!Number.isFinite(r))return e;let n=Math.floor(r);return n>0?n:e}function sb(t,e){let r=Number(t);if(!Number.isFinite(r))return e;let n=Math.floor(r);return n>=0?n:e}function En(t){return String(t??"").trim()}var et,gs,co,Ca,fu,wl,gu,tb,rb,nb,uo,_M,Sl=O(()=>{et=Object.freeze({ADD_TABLE:"add_table",RENAME_TABLE:"rename_table",DELETE_TABLE:"delete_table",MOVE_TABLE:"move_table",PATCH_AI_INSTRUCTIONS:"patch_table_ai_instructions",PATCH_COLUMNS:"patch_table_columns",PATCH_ROWS:"patch_table_rows",PATCH_EXPORT_CONFIG:"patch_table_export_config",PATCH_LOCKS:"patch_table_locks",PATCH_WORKBENCH_CONFIG:"patch_workbench_config"}),gs=1,co="modify_current_workbench_incremental",Ca="assistantDraft",fu=Object.freeze(["note","init","create","update","delete"]),wl=new Set(fu),gu=Object.freeze(["contextDepth","contextRoles","sendLatestRows","runScope","mirrorToMessage","mirrorTag","fillMode","autoUpdateEnabled","autoUpdateTrigger"]),tb=new Set(gu),rb=3,nb=1,uo=Object.freeze({MAX_ROUNDS:"max_rounds",EMPTY_OPERATIONS:"empty_operations",REPEATED_FINGERPRINT:"repeated_working_fingerprint",REPAIR_RETRY_CAPPED:"repair_retry_capped"}),_M=Object.freeze({CANCELLED:"cancelled",STALE:"stale"})});function xu(t){return!!t&&typeof t=="object"&&!Array.isArray(t)}function Et(t,e){if(!xu(t))throw new Error(`${e} \u5FC5\u987B\u662F\u5BF9\u8C61`)}function zt(t,e){let r=String(t??"").trim();if(!r)throw new Error(`${e} \u5FC5\u987B\u662F\u975E\u7A7A\u5B57\u7B26\u4E32`);return r}function po(t,e){let r=t.tables.find(n=>n.id===e);if(!r)throw new Error(`\u627E\u4E0D\u5230\u76EE\u6807\u8868: ${e}`);return r}function ob(t){return new Set((t.columns||[]).map(e=>e.key).filter(Boolean))}function ab(){return{init:"",create:"",update:"",delete:""}}function AE(t){let e=Ca,r=new RegExp(`<${e}>([\\s\\S]*?)<\\/${e}>`,"g"),n=Array.from(String(t||"").matchAll(r));if(!n.length)throw new Error(`AI \u54CD\u5E94\u4E2D\u672A\u627E\u5230 <${e}> \u6807\u7B7E`);return String(n[n.length-1][1]||"").trim()}function ib(t){let e=AE(t),r;try{r=JSON.parse(e)}catch(n){throw new Error(`assistant draft JSON \u89E3\u6790\u5931\u8D25: ${n?.message||"\u672A\u77E5\u9519\u8BEF"}`)}return CE(r)}function CE(t){if(Et(t,"assistant draft"),t.protocolVersion!==gs)throw new Error(`assistant draft.protocolVersion \u5FC5\u987B\u4E3A ${gs}`);if(t.mode!==co)throw new Error(`assistant draft.mode \u975E\u6CD5: ${t.mode}`);if(typeof t.baseFingerprint!="string"||!t.baseFingerprint.trim())throw new Error("assistant draft.baseFingerprint \u7F3A\u5931");if(typeof t.summary!="string")throw new Error("assistant draft.summary \u5FC5\u987B\u662F\u5B57\u7B26\u4E32");if(!Array.isArray(t.warnings))throw new Error("assistant draft.warnings \u5FC5\u987B\u662F\u6570\u7EC4");if(!Array.isArray(t.operations))throw new Error("assistant draft.operations \u5FC5\u987B\u662F\u6570\u7EC4");let e=new Set(Object.values(et));return t.operations.forEach((r,n)=>{Et(r,`operations[${n}]`);let s=String(r.op||"");if(!e.has(s))throw new Error(`operations[${n}] \u5305\u542B\u4E0D\u652F\u6301\u7684\u64CD\u4F5C: ${s}`);if((s.startsWith("patch_table_")||s===et.MOVE_TABLE)&&zt(r.tableId,`${s}.tableId`),s===et.RENAME_TABLE&&zt(r.newName,`${s}.newName`),s===et.ADD_TABLE&&(zt(r.name,`${s}.name`),!Array.isArray(r.columns)||r.columns.length===0))throw new Error(`${s} \u81F3\u5C11\u9700\u8981\u4E00\u4E2A column`);s.startsWith("patch_table_")&&s!==et.PATCH_LOCKS&&Et(r.patch,`${s}.patch`)}),{protocolVersion:gs,mode:co,baseFingerprint:String(t.baseFingerprint||""),summary:String(t.summary||""),warnings:(t.warnings||[]).map(r=>String(r??"")),operations:Bt(t.operations),currentTableId:String(t.currentTableId||"")}}function kE(t,e,r){let n=zt(e.name,"add_table.name");if(!Array.isArray(e.columns)||e.columns.length===0)throw new Error("add_table \u81F3\u5C11\u9700\u8981\u4E00\u4E2A column");let s=new Set,o=e.columns.map((d,c)=>{let u=zt(d.title||d.name,`add_table.columns[${c}].title`);return{key:yn(Qo(u,`col_${c+1}`),s),title:u,description:String(d.description??""),type:String(d.type||"text"),required:!!d.required}}),a=e.aiInstructions&&typeof e.aiInstructions=="object"?{note:String(e.aiInstructions.note??e.note??""),init:String(e.aiInstructions.init??""),create:String(e.aiInstructions.create??""),update:String(e.aiInstructions.update??""),delete:String(e.aiInstructions.delete??"")}:{note:String(e.note??""),...ab()},i={id:Wc("table"),name:n,note:a.note,enabled:!0,aiInstructions:{init:a.init,create:a.create,update:a.update,delete:a.delete},columns:o,rows:[],exportConfig:{enabled:!1,entryName:n,entryType:"constant",splitByRow:!1,keywords:"",injectionTemplate:"",preventRecursion:!0,entryPlacement:{position:"before_character_definition",depth:2,order:0}}},l=String(e.insertAfterTableId||"").trim();if(l){let d=t.tables.findIndex(c=>c.id===l);if(d===-1)throw new Error(`add_table \u7684 insertAfterTableId \u4E0D\u5B58\u5728: ${l}`);t.tables.splice(d+1,0,i)}else t.tables.push(i);return r.addedTables.push({tableId:i.id,name:n}),i.id}function IE(t,e,r){let n=po(t,e.tableId),s=n.name,o=zt(e.newName,"rename_table.newName");n.name=o,r.renamedTables.push({tableId:e.tableId,beforeName:s,afterName:o})}function RE(t,e,r,n){let s=t.tables.findIndex(a=>a.id===e.tableId);if(s===-1)throw new Error(`\u627E\u4E0D\u5230\u76EE\u6807\u8868: ${e.tableId}`);let o=t.tables[s];r.deletedTables.push({tableId:e.tableId,name:o.name}),n.push({type:"delete_table",label:`\u5220\u9664\u8868: ${o.name}`}),t.tables.splice(s,1)}function ME(t,e,r){let n=t.tables.findIndex(u=>u.id===e.tableId);if(n===-1)throw new Error(`\u627E\u4E0D\u5230\u76EE\u6807\u8868: ${e.tableId}`);if(+!!e.beforeTableId+ +!!e.afterTableId!==1)throw new Error("move_table \u5FC5\u987B\u4E14\u53EA\u80FD\u63D0\u4F9B beforeTableId \u6216 afterTableId \u4E4B\u4E00");let o=e.beforeTableId||e.afterTableId;if(t.tables.findIndex(u=>u.id===o)===-1)throw new Error(`move_table \u951A\u70B9\u4E0D\u5B58\u5728: ${o}`);if(o===e.tableId)throw new Error("move_table \u4E0D\u80FD\u4EE5\u81EA\u8EAB\u4E3A\u951A\u70B9");let[i]=t.tables.splice(n,1),l=t.tables.findIndex(u=>u.id===o),d=e.beforeTableId?l:l+1;t.tables.splice(d,0,i);let c=t.tables.indexOf(i);r.movedTables.push({tableId:e.tableId,name:i.name,fromIndex:n,toIndex:c})}function PE(t,e,r){let n=po(t,e.tableId);Et(e.patch,`${e.op}.patch`);let s=[];Object.keys(e.patch).forEach(o=>{if(!wl.has(o))throw new Error(`patch_table_ai_instructions.patch \u5305\u542B\u672A\u77E5\u5B57\u6BB5: ${o}`)}),(!n.aiInstructions||typeof n.aiInstructions!="object")&&(n.aiInstructions=ab()),"note"in e.patch&&(n.note=String(e.patch.note??""),s.push("note")),["init","create","update","delete"].forEach(o=>{o in e.patch&&(n.aiInstructions[o]=String(e.patch[o]??""),s.push(o))}),s.length&&r.patchedAiInstructions.push({tableId:e.tableId,name:n.name,keys:s})}function NE(t,e,r,n){let s=po(t,e.tableId);Et(e.patch,`${e.op}.patch`);let o=new Set(["renameColumns","addColumns","deleteColumns"]);Object.keys(e.patch).forEach(p=>{if(!o.has(p))throw new Error(`patch_table_columns.patch \u5305\u542B\u672A\u77E5\u5B57\u6BB5: ${p}`)});let a=[],i=[];(Array.isArray(e.patch.renameColumns)?e.patch.renameColumns:[]).forEach((p,g)=>{Et(p,`renameColumns[${g}]`);let m=zt(p.columnKey,`renameColumns[${g}].columnKey`),h=s.columns.find(x=>x.key===m);if(!h)throw new Error(`renameColumns[${g}] \u6307\u5411\u4E0D\u5B58\u5728\u7684\u5217: ${m}`);let b=zt(p.newTitle,`renameColumns[${g}].newTitle`);a.push(`\u5217\u6539\u540D: ${h.title} -> ${b}`),h.title=b}),(Array.isArray(e.patch.deleteColumns)?e.patch.deleteColumns:[]).map((p,g)=>{let m=zt(p,`deleteColumns[${g}]`);if(!s.columns.some(h=>h.key===m))throw new Error(`deleteColumns[${g}] \u6307\u5411\u4E0D\u5B58\u5728\u7684\u5217: ${m}`);return m}).forEach(p=>{s.columns=s.columns.filter(g=>g.key!==p),(s.rows||[]).forEach(g=>{g.cells&&p in g.cells&&delete g.cells[p]}),a.push(`\u5220\u9664\u5217: ${p}`),i.push(`\u5220\u9664\u5217: ${s.name}.${p}`)});let u=Array.isArray(e.patch.addColumns)?e.patch.addColumns:[],y=ob(s);u.forEach((p,g)=>{Et(p,`addColumns[${g}]`);let m=zt(p.title||p.name,`addColumns[${g}].title`),h=yn(Qo(m,`col_${s.columns.length+1}`),y);s.columns.push({key:h,title:m,description:String(p.description??""),type:String(p.type||"text"),required:!!p.required}),(s.rows||[]).forEach(b=>{b.cells&&(b.cells[h]="")}),a.push(`\u65B0\u589E\u5217: ${m} (${h})`)}),a.length&&r.patchedColumns.push({tableId:e.tableId,name:s.name,changes:a}),i.forEach(p=>{n.push({type:"patch_table_columns",label:p})})}function $E(t,e,r){let n=po(t,e.tableId);Et(e.patch,`${e.op}.patch`);let s=new Set(["updateCells","addRows","deleteRowIds"]);Object.keys(e.patch).forEach(u=>{if(!s.has(u))throw new Error(`patch_table_rows.patch \u5305\u542B\u672A\u77E5\u5B57\u6BB5: ${u}`)});let o=[],a=(n.columns||[]).map(u=>u.key);Array.isArray(n.rows)||(n.rows=[]),(Array.isArray(e.patch.updateCells)?e.patch.updateCells:[]).forEach((u,y)=>{Et(u,`updateCells[${y}]`);let p=zt(u.rowId,`updateCells[${y}].rowId`),g=zt(u.columnKey,`updateCells[${y}].columnKey`),m=n.rows.find(h=>h.id===p);if(!m)throw new Error(`updateCells[${y}] \u6307\u5411\u4E0D\u5B58\u5728\u7684\u884C: ${p}`);if(!a.includes(g))throw new Error(`updateCells[${y}] \u6307\u5411\u4E0D\u5B58\u5728\u7684\u5217: ${g}`);m.cells||(m.cells={}),m.cells[g]=Bt(u.value??""),o.push(`\u6539\u5355\u5143\u683C: ${p}.${g}`)}),(Array.isArray(e.patch.addRows)?e.patch.addRows:[]).forEach((u,y)=>{if(Et(u,`addRows[${y}]`),!u.cells||typeof u.cells!="object")throw new Error(`addRows[${y}].cells \u5FC5\u987B\u662F\u5BF9\u8C61`);Object.keys(u.cells).forEach(g=>{if(!a.includes(g))throw new Error(`addRows[${y}] \u5305\u542B\u672A\u77E5\u5217: ${g}`)});let p={id:zr("row"),name:`\u884C${n.rows.length+1}`,cells:{}};a.forEach(g=>{p.cells[g]=g in u.cells?Bt(u.cells[g]):""}),n.rows.push(p),o.push(`\u65B0\u589E\u884C: ${p.id}`)});let d=Array.isArray(e.patch.deleteRowIds)?e.patch.deleteRowIds:[],c=new Set(d.map(u=>String(u)));if(c.size){let u=n.rows.length;n.rows=n.rows.filter(p=>!c.has(p.id));let y=u-n.rows.length;y>0&&o.push(`\u5220\u9664 ${y} \u884C`)}o.length&&r.patchedRows.push({tableId:e.tableId,name:n.name,changes:o})}function LE(t,e,r){let n=po(t,e.tableId);Et(e.patch,`${e.op}.patch`),(!n.exportConfig||typeof n.exportConfig!="object")&&(n.exportConfig={enabled:!1,entryName:n.name,entryType:"constant"});let s=new Set(["enabled","entryName","entryType","splitByRow","keywords","injectionTemplate","preventRecursion"]);Object.keys(e.patch).forEach(a=>{if(!s.has(a))throw new Error(`patch_table_export_config.patch \u5305\u542B\u672A\u77E5\u5B57\u6BB5: ${a}`)}),Object.entries(e.patch).forEach(([a,i])=>{if(a==="entryType"&&!["constant","keyword"].includes(i))throw new Error(`patch_table_export_config.entryType \u5FC5\u987B\u4E3A constant \u6216 keyword\uFF0C\u6536\u5230: ${i}`);n.exportConfig[a]=Bt(i)});let o=Object.keys(e.patch);r.patchedExportConfig.push({tableId:e.tableId,name:n.name,keys:o})}function OE(t,e,r){Et(e.patch,`${e.op}.patch`);let n=new Set(["rows","columns","cells"]);Object.keys(e.patch).forEach(d=>{if(!n.has(d))throw new Error(`patch_table_locks.patch \u5305\u542B\u672A\u77E5\u5B57\u6BB5: ${d}`)});let s=po(t,e.tableId),o=[],a={tableId:e.tableId,name:s.name,rows:[],columns:[],cells:[]},i=Array.isArray(s.rows)?s.rows.length:0,l=ob(s);return(Array.isArray(e.patch.rows)?e.patch.rows:[]).forEach((d,c)=>{if(Et(d,`rows[${c}]`),typeof d.rowIndex!="number"||d.rowIndex<0||d.rowIndex>=i)throw new Error(`rows[${c}].rowIndex \u8D8A\u754C`);if(typeof d.locked!="boolean")throw new Error(`rows[${c}].locked \u5FC5\u987B\u662F\u5E03\u5C14\u503C`);a.rows.push({rowIndex:d.rowIndex,locked:d.locked}),o.push(`${d.locked?"\u9501\u5B9A":"\u89E3\u9501"}\u7B2C${d.rowIndex}\u884C`)}),(Array.isArray(e.patch.columns)?e.patch.columns:[]).forEach((d,c)=>{Et(d,`columns[${c}]`);let u=zt(d.columnKey,`columns[${c}].columnKey`);if(!l.has(u))throw new Error(`columns[${c}] \u6307\u5411\u4E0D\u5B58\u5728\u7684\u5217: ${u}`);if(typeof d.locked!="boolean")throw new Error(`columns[${c}].locked \u5FC5\u987B\u662F\u5E03\u5C14\u503C`);a.columns.push({columnKey:u,locked:d.locked}),o.push(`${d.locked?"\u9501\u5B9A":"\u89E3\u9501"}\u5217: ${u}`)}),(Array.isArray(e.patch.cells)?e.patch.cells:[]).forEach((d,c)=>{if(Et(d,`cells[${c}]`),typeof d.rowIndex!="number"||d.rowIndex<0||d.rowIndex>=i)throw new Error(`cells[${c}].rowIndex \u8D8A\u754C`);let u=zt(d.columnKey,`cells[${c}].columnKey`);if(!l.has(u))throw new Error(`cells[${c}] \u6307\u5411\u4E0D\u5B58\u5728\u7684\u5217: ${u}`);if(typeof d.locked!="boolean")throw new Error(`cells[${c}].locked \u5FC5\u987B\u662F\u5E03\u5C14\u503C`);a.cells.push({rowIndex:d.rowIndex,columnKey:u,locked:d.locked}),o.push(`${d.locked?"\u9501\u5B9A":"\u89E3\u9501"}\u5355\u5143\u683C: \u884C${d.rowIndex}.${u}`)}),o.length&&r.patchedLocks.push({tableId:e.tableId,name:s.name,changes:o}),a}function DE(t,e,r,n){Et(e.patch,`${e.op}.patch`);let s=[];Object.keys(e.patch).forEach(o=>{if(!tb.has(o))throw new Error(`patch_workbench_config.patch \u5305\u542B\u672A\u77E5\u5B57\u6BB5: ${o}`);t[o]=Bt(e.patch[o]),s.push(o)}),s.length&&(r.patchedWorkbenchConfig.push({keys:s}),n.push({type:"patch_workbench_config",label:`\u4FEE\u6539\u5DE5\u4F5C\u53F0\u914D\u7F6E: ${s.join(", ")}`}))}function wu({config:t,draft:e}){if(!xu(t))throw new Error("\u7F3A\u5C11 config");if(!xu(e)||!Array.isArray(e.operations))throw new Error("\u7F3A\u5C11\u5408\u6CD5 draft.operations");let r=Bt(t),n=mu(),s=[],o=[],a=t.scope?.activeTableId||"";return e.operations.forEach(i=>{let l=String(i.op||"");switch(l){case et.ADD_TABLE:{a=kE(r,i,n);break}case et.RENAME_TABLE:IE(r,i,n);break;case et.DELETE_TABLE:RE(r,i,n,s);break;case et.MOVE_TABLE:ME(r,i,n);break;case et.PATCH_AI_INSTRUCTIONS:PE(r,i,n);break;case et.PATCH_COLUMNS:NE(r,i,n,s);break;case et.PATCH_ROWS:$E(r,i,n);break;case et.PATCH_EXPORT_CONFIG:LE(r,i,n);break;case et.PATCH_LOCKS:{let d=OE(r,i,n);(d.rows.length||d.columns.length||d.cells.length)&&o.push(d);break}case et.PATCH_WORKBENCH_CONFIG:DE(r,i,n,s);break;default:throw new Error(`\u4E0D\u652F\u6301\u7684\u64CD\u4F5C: ${l}`)}}),a&&!r.tables.some(i=>i.id===a)&&(a=r.tables[0]?.id||""),{candidateConfig:r,diff:n,highRiskItems:s,lockChanges:o,focusTableId:a}}function lb({baselineConfig:t,candidateConfig:e}){let r=mu(),n=[],s=Array.isArray(t?.tables)?t.tables:[],o=Array.isArray(e?.tables)?e.tables:[],a=new Set(s.map(c=>c.id)),i=new Set(o.map(c=>c.id));o.forEach(c=>{a.has(c.id)||r.addedTables.push({tableId:c.id,name:c.name})}),s.forEach(c=>{i.has(c.id)||(r.deletedTables.push({tableId:c.id,name:c.name}),n.push({type:"delete_table",label:`\u5220\u9664\u8868: ${c.name}`}))}),s.forEach(c=>{let u=o.find(x=>x.id===c.id);if(!u)return;c.name!==u.name&&r.renamedTables.push({tableId:c.id,beforeName:c.name,afterName:u.name});let y=(c.columns||[]).map(x=>x.key).sort().join(","),p=(u.columns||[]).map(x=>x.key).sort().join(",");y!==p&&(r.patchedColumns.push({tableId:c.id,name:u.name,changes:["\u5217\u7ED3\u6784\u53D8\u66F4"]}),n.push({type:"patch_table_columns",label:`\u5217\u7ED3\u6784\u53D8\u66F4: ${u.name}`}));let m=fu.filter(x=>JSON.stringify(c.aiInstructions?.[x])!==JSON.stringify(u.aiInstructions?.[x]));m.length&&r.patchedAiInstructions.push({tableId:c.id,name:u.name,keys:m});let b=["enabled","entryName","entryType","splitByRow","keywords","injectionTemplate","preventRecursion"].filter(x=>JSON.stringify(c.exportConfig?.[x])!==JSON.stringify(u.exportConfig?.[x]));b.length&&r.patchedExportConfig.push({tableId:c.id,name:u.name,keys:b})});let d=gu.filter(c=>JSON.stringify(t?.[c])!==JSON.stringify(e?.[c]));return d.length&&(r.patchedWorkbenchConfig.push({keys:d}),n.push({type:"patch_workbench_config",label:`\u5DE5\u4F5C\u53F0\u914D\u7F6E\u53D8\u66F4: ${d.join(", ")}`})),{diff:r,highRiskItems:n}}var vu=O(()=>{Sl();Fe();Xc()});function BE(){return["\u4F60\u662F youyou_Toolkit \u586B\u8868\u5DE5\u4F5C\u53F0\u7684\u6539\u8868\u52A9\u624B\u3002",`\u4F60\u53EA\u80FD\u8F93\u51FA\u4E00\u4E2A\u88AB <${Ca}> \u548C </${Ca}> \u5305\u88F9\u7684 JSON \u5BF9\u8C61\uFF0C\u4E0D\u80FD\u8F93\u51FA\u89E3\u91CA\u6587\u672C\u3002`,`\u4E25\u683C\u4F7F\u7528 protocolVersion=${gs}\u3001mode="${co}"\u3002`,"","\u9876\u5C42 JSON \u5FC5\u987B\u5305\u542B: protocolVersion, mode, baseFingerprint, summary, warnings, operations, currentTableId\u3002","warnings \u5FC5\u987B\u662F\u5B57\u7B26\u4E32\u6570\u7EC4\uFF1B\u6CA1\u6709\u5219\u8F93\u51FA\u7A7A\u6570\u7EC4\u3002","","\u53EA\u5141\u8BB8\u4EE5\u4E0B 10 \u79CD\u64CD\u4F5C:",...Object.values(et).map(t=>`  - ${t}`),"",'\u6BCF\u4E2A operations[i] \u5FC5\u987B\u4F7F\u7528 "op" \u5B57\u6BB5\u8868\u793A\u64CD\u4F5C\u540D\uFF1B\u7981\u6B62\u4F7F\u7528 type/operation/action \u7B49\u522B\u540D\u3002',"","--- add_table ---","\u5FC5\u987B\u63D0\u4F9B\u975E\u7A7A name \u548C\u81F3\u5C11\u4E00\u4E2A columns \u9879\u3002","\u6BCF\u4E2A column \u81F3\u5C11\u6709 title \u5B57\u6BB5\u3002","\u5E94\u5C3D\u91CF\u540C\u65F6\u63D0\u4F9B aiInstructions\uFF08init/create/update/delete\uFF09\u8BA9\u65B0\u8868\u7ACB\u523B\u53EF\u7528\u3002","\u4E0D\u8981\u751F\u6210 tableId\uFF0C\u672C\u5730\u4F1A\u81EA\u52A8\u751F\u6210\u3002",'\u5982\u679C\u7528\u6237\u53EA\u8BF4"\u65B0\u589E\u67D0\u67D0\u8868"\u4F46\u6CA1\u7ED9\u8868\u5934\uFF0C\u6839\u636E\u8868\u540D\u8BED\u4E49\u751F\u6210\u5408\u7406\u901A\u7528\u7684 columns\u3002',"\u9ED8\u8BA4\u4F18\u5148 add_table + \u5B8C\u6574 aiInstructions\uFF1B\u9664\u975E\u7528\u6237\u660E\u786E\u8981\u6C42 DDL \u6216\u5B57\u6BB5\u7C7B\u578B\u7EA6\u675F\uFF0C\u5426\u5219\u4E0D\u8981\u8F93\u51FA patch_table_columns \u6765\u8865\u5217\u3002","","--- patch_table_ai_instructions ---",`\u53EA\u5141\u8BB8 patch: { ${[...wl].join(", ")} }\u3002`,"","--- patch_table_columns ---","patch \u53EA\u5141\u8BB8: renameColumns[], addColumns[], deleteColumns[]\u3002","renameColumns \u4E2D\u7528 columnKey\uFF08\u4E0D\u662F title\uFF09\u5B9A\u4F4D\u5217\uFF0C\u63D0\u4F9B newTitle\u3002","addColumns \u4E2D\u6BCF\u4E2A\u9879\u81F3\u5C11\u6709 title\u3002","deleteColumns \u4E2D\u662F columnKey \u5B57\u7B26\u4E32\u6570\u7EC4\u3002","","--- patch_table_rows ---","patch \u53EA\u5141\u8BB8: updateCells[], addRows[], deleteRowIds[]\u3002","updateCells \u7528 rowId\uFF08\u4E0D\u662F\u884C\u53F7\uFF09\u5B9A\u4F4D\u884C\uFF0C\u7528 columnKey \u5B9A\u4F4D\u5217\uFF0C\u63D0\u4F9B value\u3002","addRows \u4E2D\u6BCF\u4E2A\u9879\u6709 cells: { [columnKey]: value }\u3002","deleteRowIds \u662F rowId \u5B57\u7B26\u4E32\u6570\u7EC4\u3002","","--- patch_table_export_config ---","patch \u53EA\u5141\u8BB8: enabled, entryName, entryType, splitByRow, keywords, injectionTemplate, preventRecursion\u3002","","--- patch_table_locks ---","patch \u53EA\u5141\u8BB8: rows[], columns[], cells[]\u3002","rows \u4E2D\u7528 rowIndex(0-based) + locked(boolean)\u3002","columns \u4E2D\u7528 columnKey + locked(boolean)\u3002","cells \u4E2D\u7528 rowIndex + columnKey + locked(boolean)\u3002","","--- patch_workbench_config ---","patch \u53EA\u5141\u8BB8: contextDepth, contextRoles, sendLatestRows, runScope, mirrorToMessage, mirrorTag, fillMode, autoUpdateEnabled, autoUpdateTrigger\u3002","","--- \u901A\u7528\u89C4\u5219 ---","\u5982\u679C\u9700\u6C42\u4FE1\u606F\u4E0D\u8DB3\u6216\u65E0\u6CD5\u751F\u6210\u5408\u6CD5\u64CD\u4F5C\uFF0C\u8FD4\u56DE\u7A7A operations\uFF0Csummary \u8BF4\u660E\u539F\u56E0\uFF0Cwarnings \u5199\u660E\u539F\u56E0\u3002\u4E0D\u8981\u8F93\u51FA\u8FFD\u95EE\u6587\u672C\u3002","\u4E25\u683C\u7981\u6B62\u4EFB\u4F55\u76F4\u63A5\u4FDD\u5B58\u884C\u4E3A\u3002","patch \u5BF9\u8C61\u53EA\u80FD\u586B\u5199\u5F53\u524D\u7ED3\u6784\u91CC\u771F\u5B9E\u5B58\u5728\u7684 tableId\u3001columnKey\u3001rowId\uFF1B\u4E0D\u8981\u731C\u6D4B\u672A\u77E5\u5B57\u6BB5\u3002","move_table \u53EA\u80FD\u63D0\u4F9B beforeTableId \u6216 afterTableId \u4E4B\u4E00\u3002","","=== \u6570\u636E\u6A21\u578B\u8BED\u4E49 ===","","\u8868\u683C (table) \u9876\u5C42\u5B57\u6BB5:","  id: \u53EA\u8BFB\uFF0C\u7531\u7CFB\u7EDF\u81EA\u52A8\u751F\u6210\u7684\u552F\u4E00\u6807\u8BC6\u7B26\u3002","  name: \u8868\u7684\u663E\u793A\u540D\u79F0\uFF08\u4E2D\u6587\uFF09\u3002","  note: \u8868\u7684\u7528\u9014\u63CF\u8FF0\uFF08\u7B49\u540C aiInstructions.note\uFF09\u3002","  enabled: boolean\uFF0C\u8BE5\u8868\u662F\u5426\u53C2\u4E0E\u81EA\u52A8\u586B\u8868\u3002","  columns[]: \u5217\u5B9A\u4E49\u6570\u7EC4\u3002","  rows[]: \u884C\u6570\u636E\u6570\u7EC4\u3002","  aiInstructions{}: AI \u64CD\u4F5C\u6307\u4EE4\u96C6\u3002","  exportConfig{}: \u4E16\u754C\u4E66\u6CE8\u5165\u5BFC\u51FA\u914D\u7F6E\u3002","","\u5217 (column) \u5B57\u6BB5:","  key: \u53EA\u8BFB\uFF0C\u7CFB\u7EDF\u4ECE title \u81EA\u52A8\u6D3E\u751F\u7684\u552F\u4E00\u6807\u8BC6\uFF08\u4E2D\u6587 title \u53EF\u80FD\u751F\u6210 col_1 \u683C\u5F0F\uFF09\u3002","  title: \u5217\u6807\u9898\uFF08\u9762\u5411\u7528\u6237\u7684\u663E\u793A\u540D\uFF09\u3002","  description: \u5217\u8BF4\u660E\u3002","  type: \u5217\u7C7B\u578B\u679A\u4E3E \u2014 text | number | boolean | date | json\uFF0C\u9ED8\u8BA4 text\u3002","  required: boolean\uFF0C\u8BE5\u5217\u662F\u5426\u5FC5\u586B\u3002","","\u884C (row) \u5B57\u6BB5:","  id: \u53EA\u8BFB\uFF0C\u7CFB\u7EDF\u81EA\u52A8\u751F\u6210\u7684\u552F\u4E00\u6807\u8BC6\u7B26\uFF08\u4E0D\u900F\u660E\u5B57\u7B26\u4E32\uFF0C\u975E\u6570\u5B57\u7D22\u5F15\uFF09\u3002",'  name: \u884C\u6807\u8BC6\uFF08\u5982"\u884C1"\uFF09\u3002',"  cells: { [columnKey]: string }\uFF0C\u6240\u6709\u503C\u90FD\u662F\u5B57\u7B26\u4E32\u3002","","aiInstructions \u5B57\u6BB5\u8BED\u4E49:","  note: \u8868\u7528\u9014\u63CF\u8FF0\uFF08\u5F71\u54CD AI \u5BF9\u8868\u7684\u7406\u89E3\uFF09\u3002","  init: \u521D\u59CB\u5316\u6307\u4EE4 \u2014 \u9996\u6B21\u586B\u5145\u65F6\u5982\u4F55\u751F\u6210\u884C\u3002","  create: \u65B0\u589E\u884C\u6307\u4EE4 \u2014 \u4EC0\u4E48\u6761\u4EF6\u4E0B\u65B0\u589E\u4E00\u884C\u3001\u683C\u5F0F\u8981\u6C42\u3002","  update: \u66F4\u65B0\u884C\u6307\u4EE4 \u2014 \u4EC0\u4E48\u6761\u4EF6\u4E0B\u4FEE\u6539\u5DF2\u6709\u884C\u3001\u54EA\u4E9B\u5217\u53EF\u6539\u3002","  delete: \u5220\u9664\u884C\u6307\u4EE4 \u2014 \u4EC0\u4E48\u6761\u4EF6\u4E0B\u5220\u9664\u884C\u3002","","exportConfig \u5B57\u6BB5\u8BED\u4E49:","  enabled: boolean\uFF0C\u662F\u5426\u5C06\u8BE5\u8868\u6570\u636E\u5199\u5165\u4E16\u754C\u4E66\u6761\u76EE\u3002","  entryName: \u4E16\u754C\u4E66\u6761\u76EE\u540D\u79F0\u3002","  entryType: \u6761\u76EE\u7C7B\u578B\u679A\u4E3E \u2014 constant | keyword\u3002","  splitByRow: boolean\uFF0C\u662F\u5426\u6BCF\u884C\u751F\u6210\u72EC\u7ACB\u6761\u76EE\u3002","  keywords: \u89E6\u53D1\u5173\u952E\u8BCD\u3002","  injectionTemplate: \u6CE8\u5165\u6A21\u677F\uFF08\u652F\u6301 {{columnKey}} \u53D8\u91CF\uFF09\u3002","  preventRecursion: boolean\uFF0C\u9ED8\u8BA4 true\uFF0C\u9632\u6B62\u9012\u5F52\u6CE8\u5165\u3002","","\u5DE5\u4F5C\u53F0\u914D\u7F6E\u5B57\u6BB5\u503C\u57DF:","  contextDepth: 0-50\uFF0C\u5411\u524D\u8BFB\u53D6\u7684\u6D88\u606F\u6761\u6570\u3002",'  contextRoles: "all" | "assistant_only"\uFF0C\u8BFB\u53D6\u54EA\u4E9B\u89D2\u8272\u7684\u6D88\u606F\u3002',"  sendLatestRows: \u53D1\u9001\u7ED9 AI \u7684\u6700\u65B0 N \u884C\u6570\u636E\uFF080=\u5168\u90E8\uFF09\u3002",'  runScope: "enabled" | "selected" | "current"\uFF0C\u81EA\u52A8\u586B\u8868\u8303\u56F4\u3002','  fillMode: "incremental" | "full"\uFF0C\u589E\u91CF\u6216\u5168\u91CF\u586B\u5145\u6A21\u5F0F\u3002',"  mirrorToMessage: boolean\uFF0C\u662F\u5426\u5C06\u6570\u636E\u955C\u50CF\u5199\u56DE\u6D88\u606F\u3002","  mirrorTag: \u955C\u50CF\u6807\u7B7E\u540D\u3002","  autoUpdateEnabled: boolean\uFF0C\u662F\u5426\u542F\u7528\u81EA\u52A8\u586B\u8868\u3002","  autoUpdateTrigger: \u81EA\u52A8\u89E6\u53D1\u6761\u4EF6\u3002","","=== \u64CD\u4F5C\u793A\u4F8B ===","","\u793A\u4F8B 1 \u2014 add_table\uFF08\u65B0\u589E\u8868\uFF0C\u542B\u5B8C\u6574\u7ED3\u6784\u548C AI \u6307\u4EE4\uFF09:","{",'  "op": "add_table",','  "name": "\u6218\u5229\u54C1\u8868",','  "columns": [','    { "title": "\u7269\u54C1\u540D", "type": "text", "required": true },','    { "title": "\u7A00\u6709\u5EA6", "type": "text" },','    { "title": "\u6570\u91CF", "type": "number" }',"  ],",'  "aiInstructions": {','    "note": "\u8BB0\u5F55\u89D2\u8272\u83B7\u5F97\u7684\u6218\u5229\u54C1",','    "init": "\u6839\u636E\u5267\u60C5\u5185\u5BB9\u521D\u59CB\u5316\u89D2\u8272\u5DF2\u6709\u7684\u7269\u54C1",','    "create": "\u5F53\u89D2\u8272\u83B7\u5F97\u65B0\u7269\u54C1\u65F6\u65B0\u589E\u884C",','    "update": "\u5F53\u7269\u54C1\u6570\u91CF\u6216\u7A00\u6709\u5EA6\u53D8\u5316\u65F6\u66F4\u65B0\u5BF9\u5E94\u884C",','    "delete": "\u5F53\u7269\u54C1\u88AB\u6D88\u8017\u6216\u4E22\u5931\u65F6\u5220\u9664\u5BF9\u5E94\u884C"',"  }","}","","\u793A\u4F8B 2 \u2014 patch_table_ai_instructions:","{",'  "op": "patch_table_ai_instructions",','  "tableId": "table_abc123",','  "patch": { "create": "\u5F53\u65B0\u89D2\u8272\u767B\u573A\u6216\u65B0\u7269\u54C1\u83B7\u5F97\u65F6\u65B0\u589E\u884C", "note": "\u8BB0\u5F55\u89D2\u8272\u7269\u54C1\u548C\u6218\u5229\u54C1" }',"}","","\u793A\u4F8B 3 \u2014 patch_table_columns:","{",'  "op": "patch_table_columns",','  "tableId": "table_abc123",','  "patch": {','    "renameColumns": [{ "columnKey": "col_1", "newTitle": "\u7269\u54C1\u540D\u79F0" }],','    "addColumns": [{ "title": "\u6765\u6E90", "type": "text" }],','    "deleteColumns": ["col_5"]',"  }","}","","=== \u6CE8\u610F\u4E8B\u9879 ===","- columnKey \u4ECE title \u81EA\u52A8\u6D3E\u751F\uFF0C\u4E2D\u6587 title \u7684 key \u901A\u5E38\u4E0D\u662F\u4E2D\u6587\uFF08\u5982 col_1\u3001col_2\uFF09\u3002\u5B9A\u4F4D\u5217\u65F6\u52A1\u5FC5\u7528 userPrompt \u4E2D\u63D0\u4F9B\u7684 column.key \u503C\u3002",'- rowId \u662F\u4E0D\u900F\u660E\u5B57\u7B26\u4E32\uFF08\u5982 "row_x7k9m2"\uFF09\uFF0C\u4E0D\u53EF\u7528\u884C\u53F7\u4EE3\u66FF\u3002','- cells \u4E2D\u6240\u6709\u503C\u90FD\u662F\u5B57\u7B26\u4E32\u7C7B\u578B\uFF0C\u6570\u5B57\u4E5F\u5199\u4F5C "42"\u3002',"- exportConfig.preventRecursion \u9ED8\u8BA4\u5E94\u4E3A true\u3002","- add_table \u4E0D\u8981\u751F\u6210 tableId\uFF0C\u672C\u5730\u81EA\u52A8\u751F\u6210\u3002","- \u6CE8\u5165\u6A21\u677F injectionTemplate \u4E2D\u7528 {{columnKey}} \u5F15\u7528\u5217\u503C\u3002"].join(`
`)}function zE(t,e,r){let n=t.config,s=t.currentTableId||"",o=Array.isArray(n?.tables)?n.tables:[],a=o.find(d=>d.id===s)||null,i=o.map(d=>({tableId:d.id,name:d.name,note:d.note||"",enabled:d.enabled,columns:(d.columns||[]).map(c=>({key:c.key,title:c.title,type:c.type||"text"})),aiInstructions:d.aiInstructions||{},exportConfig:d.exportConfig||{},rowCount:Array.isArray(d.rows)?d.rows.length:0,rows:r?.[d.id]||void 0})),l={userRequest:En(t.userRequest),baseFingerprint:e,currentTableId:s,currentTable:a?{tableId:a.id,name:a.name,note:a.note||"",columns:(a.columns||[]).map(d=>({key:d.key,title:d.title,type:d.type||"text"})),aiInstructions:a.aiInstructions||{},exportConfig:a.exportConfig||{},rowCount:Array.isArray(a.rows)?a.rows.length:0,rowIds:(a.rows||[]).map(d=>d.id),rows:r?.[a.id]||void 0}:null,allTables:i,workbenchConfig:{contextDepth:n.contextDepth,contextRoles:n.contextRoles,sendLatestRows:n.sendLatestRows,runScope:n.runScope||n.scope?.mode,fillMode:n.fillMode,autoUpdateEnabled:n.autoUpdateEnabled,mirrorToMessage:n.mirrorToMessage}};try{return JSON.stringify(l,null,0)}catch{return"{}"}}function KE({userRequest:t,round:e,maxRounds:r,repairReason:n}){let s=[En(t)];return e>1&&s.push(`\u8865\u5145\u8BF4\u660E\uFF1A\u5F53\u524D\u662F\u7B2C ${e}/${r} \u8F6E\uFF0C\u8F93\u5165\u6570\u636E\u5DF2\u7ECF\u5305\u542B\u524D\u9762\u8F6E\u6B21\u4EA7\u751F\u7684\u8349\u7A3F\u7ED3\u679C\u3002\u8BF7\u53EA\u7EE7\u7EED\u672A\u5B8C\u6210\u7684\u6539\u52A8\uFF1B\u5982\u679C\u5DF2\u7ECF\u65E0\u9700\u7EE7\u7EED\u4FEE\u6539\uFF0C\u8BF7\u8FD4\u56DE\u7A7A operations\u3002`),n&&s.push(`\u4FEE\u590D\u8981\u6C42\uFF1A\u4E0A\u4E00\u8F6E\u8349\u7A3F\u672A\u901A\u8FC7\u672C\u5730\u6821\u9A8C\uFF0C\u539F\u56E0\u662F\uFF1A${n}\u3002\u8BF7\u4FEE\u590D\u8349\u7A3F\u5E76\u7EE7\u7EED\u5B8C\u6210\u9700\u6C42\uFF0C\u4ECD\u7136\u53EA\u80FD\u8F93\u51FA\u5408\u6CD5 draft JSON\u3002`),s.filter(Boolean).join(`

`)}async function jE(t,e){let r=t.config,n=En(t.userRequest);if(!n)throw new Error("\u8BF7\u8F93\u5165\u6539\u8868\u9700\u6C42");let s=await ka(r),o=[{role:"system",content:BE()},...(t.priorTurns||[]).flatMap(c=>{let u=[];return c.user&&u.push({role:"user",content:c.user}),c.assistant&&u.push({role:"assistant",content:c.assistant}),u}),{role:"user",content:zE(t,s,t.dataContext)}],a=En(t.apiPreset||r?.apiPreset),i=await Co(a||"",o,{},e);if(!i)throw new Error("AI \u672A\u8FD4\u56DE\u6709\u6548\u5185\u5BB9");let l;try{l=ib(i)}catch(c){throw An.error("draft \u89E3\u6790\u5931\u8D25",{userRequest:n,error:c?.message,aiRawText:i}),c}if(l.baseFingerprint!==s)throw new Error("AI \u8FD4\u56DE\u7684 baseFingerprint \u4E0E\u5F53\u524D\u7ED3\u6784\u4E0D\u4E00\u81F4");let d=wu({config:r,draft:l});return{draft:l,aiRawText:i,messages:o,compileResult:d,originalBaseFingerprint:s}}async function cb(t){let e=t.config,r=En(t.userRequest);if(!r)throw new Error("\u8BF7\u8F93\u5165\u6539\u8868\u9700\u6C42");let n=vl(t.maxRounds,rb),s=sb(t.maxRepairRetries,nb),o=Bt(e),a=await ka(o),i=[],l=UE(t.priorTurns),d=Bt(o),c=a,u=uo.MAX_ROUNDS,y=0,p="",g=null,m=null;function h(){let T=t.guard;if(T?.isCancelled?.())throw new ms("cancelled");if(T?.isStale?.())throw new ms("stale")}function b(){if(m){try{m.abort()}catch{}m=null}}e:for(let T=1;T<=n;T+=1){let I="";for(;;){h(),b(),m=new AbortController;let S=KE({userRequest:r,round:T,maxRounds:n,repairReason:I});try{let A=[...l,...i.map(F=>({user:F.userRequest,assistant:F.aiRawText}))],P=await jE({config:d,currentTableId:t.currentTableId,userRequest:S,priorTurns:A,apiPreset:t.apiPreset,dataContext:t.dataContext},m.signal);h(),g=P;let M=P.draft.operations.length>0,R=M?Bt(P.compileResult.candidateConfig):Bt(d),_=M?await ka(R):c,$={round:T,userRequest:S,draft:P.draft,aiRawText:P.aiRawText,messages:P.messages,perRoundCompileResult:P.compileResult,workingFingerprint:_};if(i.push($),t.onRoundComplete?.({round:Bt($),rounds:Bt(i),maxRounds:n}),!M){u=uo.EMPTY_OPERATIONS;break e}if(d=R,_===c){u=uo.REPEATED_FINGERPRINT;break e}if(c=_,p="",T===n){u=uo.MAX_ROUNDS;break e}break}catch(A){if(h(),A instanceof ms)throw A;if(p=A?.message||"\u672A\u77E5\u9519\u8BEF",y>=s){u=uo.REPAIR_RETRY_CAPPED;break e}y+=1,I=p}}}b();let x=i.length>0?i[i.length-1].perRoundCompileResult:wu({config:d,draft:hu(a)}),w={originalBaseFingerprint:a,finalWorkingFingerprint:c,stopReason:u,roundsExecuted:i.length,maxRounds:n,repairRetriesUsed:y,maxRepairRetries:s,lastErrorMessage:p};return{draft:g?.draft||hu(a,t.currentTableId),aiRawText:g?.aiRawText||"",messages:g?.messages||[],compileResult:x,originalBaseFingerprint:a,rounds:i,session:w,targetSnapshot:t.targetSnapshot||null}}function UE(t){return Array.isArray(t)?t.map(e=>({user:En(e?.user),assistant:En(e?.assistant)})).filter(e=>e.user||e.assistant):[]}async function db(t){try{let e=await ka(Te()),r=t.originalBaseFingerprint||t.draft?.baseFingerprint||"";if(!r||e!==r)return An.warn("applyAssistantResult: fingerprint \u4E0D\u5339\u914D\uFF0C\u8349\u7A3F\u5DF2\u8FC7\u671F"),!1;let n=nt(t.compileResult.candidateConfig);if(n&&typeof n=="object"&&n.success===!1)return An.error("applyAssistantResult: saveTableWorkbenchConfig \u5931\u8D25",n),!1;if(t.compileResult.lockChanges?.length){let l={chatId:"",isolationKey:ue.isEnabled()?ue.getKey():""};t.compileResult.lockChanges.forEach(d=>{d.rows?.forEach(c=>{pl(l,d.tableId,c.rowIndex,c.locked)}),d.columns?.forEach(c=>{yl(l,d.tableId,c.columnKey,c.locked)}),d.cells?.forEach(c=>{fl(l,d.tableId,c.rowIndex,c.columnKey,c.locked)})})}let s=t.rounds||[],o=t.compileResult?.diff?.patchedRows?.length>0;return(s.some(i=>i.draft?.operations?.some(l=>l.op===et.PATCH_ROWS))||o)&&t.targetSnapshot&&await FE(t),An.info("applyAssistantResult: \u8349\u7A3F\u5DF2\u5E94\u7528",{tables:t.compileResult.candidateConfig?.tables?.length}),!0}catch(e){return An.error("applyAssistantResult \u5F02\u5E38",e),!1}}async function FE(t){let e=t.targetSnapshot,r=[];for(let n of t.rounds||[]){let s=(n.draft?.operations||[]).filter(o=>o.op===et.PATCH_ROWS);r.push(...s)}if(!r.length){let n=(t.draft?.operations||[]).filter(s=>s.op===et.PATCH_ROWS);r.push(...n)}if(r.length)try{let n=al(e);if(!n?.tables?.length){An.info("applyRowPatchesToBoundState: boundState \u4E3A\u7A7A\uFF0C\u8DF3\u8FC7\u884C\u6570\u636E\u5E94\u7528");return}let s=pe(n.tables);for(let o of r){let a=s.find(l=>l.id===o.tableId);if(!a)continue;Array.isArray(a.rows)||(a.rows=[]);let i=o.patch;if(i.updateCells?.length)for(let l of i.updateCells){let d=a.rows.find(c=>c.id===l.rowId);d&&l.columnKey&&(d.cells=d.cells||{},d.cells[l.columnKey]=String(l.value??""))}if(i.addRows?.length){let l=new Set((a.columns||[]).map(d=>d.key));for(let d of i.addRows){let c=zr("row"),u={};for(let[y,p]of Object.entries(d.cells||{}))l.has(y)&&(u[y]=String(p??""));a.rows.push({id:c,name:d.name||c,cells:u})}}if(i.deleteRowIds?.length){let l=new Set(i.deleteRowIds);a.rows=a.rows.filter(d=>!l.has(d.id))}}await io(e,{...n,tables:s},{skipFreshValidation:!0}),An.info("applyRowPatchesToBoundState: \u884C\u6570\u636E\u5DF2\u5E94\u7528\u5230 boundState",{ops:r.length})}catch(n){An.error("applyRowPatchesToBoundState \u5931\u8D25",n)}}var An,ms,ub=O(()=>{Io();J();nr();cs();Fe();gl();jr();vu();Sl();An=N.createScope("TableAssistant");ms=class extends Error{constructor(e){super(e==="cancelled"?"\u6539\u8868\u52A9\u624B\u4F1A\u8BDD\u5DF2\u53D6\u6D88":"\u6539\u8868\u52A9\u624B\u4F1A\u8BDD\u5DF2\u8FC7\u671F"),this.name="AssistantSessionStoppedError",this.stopReason=e}}});function WE(){try{if(window.parent&&window.parent!==window&&window.parent.document)return window.parent.document}catch{}return document}function _l(){return`turn_${Date.now()}_${Math.random().toString(36).slice(2,8)}`}function it(t){let e=document.createElement("div");return e.textContent=String(t??""),e.innerHTML}function HE(){let t=Te(),e=t?.scope?.activeTableId||"",r=(t?.tables||[]).find(n=>n.id===e);return!e||!r?"\u5F53\u524D\u672A\u9009\u4E2D\u8868":`${r.name} (${e})`}function yb(t){if(!t)return"";let e=[];t.addedTables?.length&&e.push(`\u65B0\u589E${t.addedTables.length}\u8868`),t.deletedTables?.length&&e.push(`\u5220\u9664${t.deletedTables.length}\u8868`),t.renamedTables?.length&&e.push(`\u91CD\u547D\u540D${t.renamedTables.length}\u8868`),t.movedTables?.length&&e.push(`\u79FB\u52A8${t.movedTables.length}\u8868`);let r=(t.patchedAiInstructions?.length||0)+(t.patchedColumns?.length||0)+(t.patchedRows?.length||0)+(t.patchedExportConfig?.length||0)+(t.patchedLocks?.length||0)+(t.patchedWorkbenchConfig?.length||0);return r&&e.push(`\u4FEE\u6539${r}\u5904`),e.length?e.join(" \xB7 "):"\u65E0\u53D8\u66F4"}function fb(t){if(!t)return"";let e=[],r=n=>n.length?`<ul>${n.map(s=>`<li>${it(s)}</li>`).join("")}</ul>`:'<div class="yyt-assistant-hint">\u65E0</div>';return t.addedTables?.length&&e.push(`<div><strong>\u65B0\u589E\u8868</strong>${r(t.addedTables.map(n=>`${n.name} [${n.tableId}]`))}</div>`),t.deletedTables?.length&&e.push(`<div><strong>\u5220\u9664\u8868</strong>${r(t.deletedTables.map(n=>`${n.name} [${n.tableId}]`))}</div>`),t.renamedTables?.length&&e.push(`<div><strong>\u91CD\u547D\u540D</strong>${r(t.renamedTables.map(n=>`${n.beforeName} -> ${n.afterName}`))}</div>`),t.patchedAiInstructions?.length&&e.push(`<div><strong>AI \u6307\u4EE4\u53D8\u66F4</strong>${r(t.patchedAiInstructions.map(n=>`${n.name}: ${n.keys.join(", ")}`))}</div>`),t.patchedColumns?.length&&e.push(`<div><strong>\u5217\u7ED3\u6784\u53D8\u66F4</strong>${r(t.patchedColumns.map(n=>`${n.name}: ${n.changes.join("\uFF1B")}`))}</div>`),t.patchedRows?.length&&e.push(`<div><strong>\u884C\u6570\u636E\u53D8\u66F4</strong>${r(t.patchedRows.map(n=>`${n.name}: ${n.changes.join("\uFF1B")}`))}</div>`),t.patchedExportConfig?.length&&e.push(`<div><strong>\u5BFC\u51FA\u914D\u7F6E\u53D8\u66F4</strong>${r(t.patchedExportConfig.map(n=>`${n.name}: ${n.keys.join(", ")}`))}</div>`),t.patchedLocks?.length&&e.push(`<div><strong>\u9501\u53D8\u66F4</strong>${r(t.patchedLocks.map(n=>`${n.name}: ${n.changes.join("\uFF1B")}`))}</div>`),t.patchedWorkbenchConfig?.length&&e.push(`<div><strong>\u5DE5\u4F5C\u53F0\u914D\u7F6E\u53D8\u66F4</strong>${r(t.patchedWorkbenchConfig.map(n=>n.keys.join(", ")))}</div>`),e.join("")}function qE(t){let e=t.compileResult?.highRiskItems||[];return e.length?e.map((r,n)=>{let s=t.riskConfirmations?.[String(n)]!==!1;return`<label class="yyt-assistant-risk-item"><input type="checkbox" class="yyt-assistant-risk-cb" data-turn-id="${it(t.id)}" data-risk-idx="${n}" ${s?"checked":""}><span>${it(r.label)}</span></label>`}).join(""):'<div class="yyt-assistant-hint">\u65E0\u9AD8\u98CE\u9669\u64CD\u4F5C</div>'}function GE(){return lt.length?lt.map((t,e)=>{let r=e===lt.length-1;if(t.type==="user")return`<div class="yyt-assistant-bubble yyt-assistant-bubble-user"><div class="yyt-assistant-label">\u4F60</div><div class="yyt-assistant-content">${it(t.content)}</div></div>`;if(t.type==="error")return`<div class="yyt-assistant-bubble yyt-assistant-bubble-error"><div class="yyt-assistant-label" style="color:#ff8888;">\u6267\u884C\u9519\u8BEF</div><div class="yyt-assistant-content">${it(t.errorMessage)}</div></div>`;if(t.type==="assistant"){let n=t.draft,s=t.compileResult,o=n?.summary||"\uFF08\u65E0\u6458\u8981\uFF09",a=n?.warnings||[],i=yb(s?.diff),l=!!t.isFinal,d=s?.highRiskItems?.length||0,c=d===0||t.riskConfirmations&&s.highRiskItems.every((m,h)=>t.riskConfirmations[String(h)]!==!1),u=r&&l,y=t.expanded||!1,p=t.sessionInfo||"",g='<div class="yyt-assistant-bubble yyt-assistant-bubble-ai">';if(g+=`<div class="yyt-assistant-label">AI \u52A9\u624B${p?` \xB7 ${it(p)}`:""}</div>`,g+=`<div class="yyt-assistant-content">${it(o)}</div>`,g+=`<div class="yyt-assistant-toggle" data-turn-id="${it(t.id)}">${y?"\u25BC":"\u25B6"} \u8BE6\u60C5 (${it(i)})</div>`,g+=`<div class="yyt-assistant-detail" data-turn-id="${it(t.id)}" style="display:${y?"block":"none"};">`,a.length&&(g+=`<div><strong>\u8B66\u544A</strong><ul>${a.map(m=>`<li>${it(m)}</li>`).join("")}</ul></div>`),g+=fb(s?.diff),l&&d>0?g+=`<div><strong>\u9AD8\u98CE\u9669\u786E\u8BA4</strong><div class="yyt-assistant-risk-list">${qE(t)}</div></div>`:d>0&&(g+=`<div><strong>\u9AD8\u98CE\u9669\u9879</strong><ul>${s.highRiskItems.map(m=>`<li>${it(m.label)}</li>`).join("")}</ul></div>`),l&&t.cumulativeDiff){let m=yb(t.cumulativeDiff);m&&m!=="\u65E0\u53D8\u66F4"&&(g+=`<div class="yyt-assistant-cumulative"><strong>\u7D2F\u79EF\u53D8\u66F4</strong> ${it(m)}`,g+=`<div class="yyt-assistant-cumulative-detail">${fb(t.cumulativeDiff)}</div>`,g+="</div>")}return g+="</div>",u&&(g+=`<button class="yyt-btn yyt-btn-primary yyt-btn-small yyt-assistant-apply-btn" type="button" data-turn-id="${it(t.id)}" ${c?"":"disabled"}>\u5E94\u7528\u5230\u5DE5\u4F5C\u53F0</button>`),g+="</div>",g}return""}).join(""):'<div class="yyt-assistant-empty">AI \u6539\u8868\u52A9\u624B\u5DF2\u5C31\u7EEA\u3002\u8F93\u5165\u4FEE\u6539\u9700\u6C42\u540E\u53D1\u9001\u3002</div>'}function YE(){let t=[];try{t=Ql()||[]}catch{}return[{value:"",label:"\u8DDF\u968F\u586B\u8868\u5DE5\u4F5C\u53F0"},...t.map(e=>({value:e,label:e}))]}function VE(){return YE().map(t=>`<option value="${it(t.value)}" ${String(t.value)===Cu?"selected":""}>${it(t.label)}</option>`).join("")}function JE(){let t=yo||!go.trim();return`
    <div id="yyt-assistant-panel" class="yyt-assistant-panel">
      <div class="yyt-assistant-header">
        <div>
          <div class="yyt-assistant-title">AI \u6539\u8868\u52A9\u624B</div>
          <div class="yyt-assistant-hint">\u5F53\u524D\u8868\uFF1A${it(HE())}</div>
        </div>
        <button class="yyt-btn yyt-btn-secondary yyt-btn-small" type="button" data-action="close-assistant">\u5173\u95ED</button>
      </div>
      <div class="yyt-assistant-chat">
        ${GE()}
      </div>
      <div class="yyt-assistant-footer">
        <div id="yyt-assistant-control-slot" class="yyt-assistant-controls">
          <label class="yyt-assistant-inline-field" for="yyt-assistant-preset">
            <span>API \u9884\u8BBE</span>
            <select class="yyt-select yyt-assistant-preset-select" id="yyt-assistant-preset">${VE()}</select>
          </label>
          <label class="yyt-assistant-inline-field" for="yyt-assistant-max-rounds">
            <span>\u6700\u5927\u8F6E\u6B21</span>
            <input class="yyt-input yyt-assistant-rounds-input" id="yyt-assistant-max-rounds" type="number" min="1" value="${it(Au)}">
          </label>
        </div>
        <textarea class="yyt-textarea yyt-assistant-textarea" id="yyt-assistant-input" placeholder="\u4F8B\u5982\uFF1A\u65B0\u589E\u4E00\u5F20\u6218\u5229\u54C1\u8868\uFF0C\u5173\u95ED\u80CC\u5305\u7269\u54C1\u8868\u7684\u72EC\u7ACB\u5BFC\u51FA\u3002">${it(go)}</textarea>
        <div class="yyt-assistant-actions">
          <button class="yyt-btn yyt-btn-primary" id="yyt-assistant-send" type="button" ${t?"disabled":""}>${yo?"\u751F\u6210\u4E2D...":"\u53D1\u9001"}</button>
          <button class="yyt-btn yyt-btn-small" id="yyt-assistant-stop" type="button" ${yo?"":"disabled"}>\u505C\u6B62</button>
        </div>
      </div>
    </div>
  `}function ku(){return Su?Su.querySelector("#"+pb):WE().getElementById(pb)}function fo(){let t=ku();t&&(t.innerHTML=JE(),XE())}function XE(){let t=ku();t&&(t.querySelector("#yyt-assistant-input")?.addEventListener("input",e=>{go=e.target.value||"";let r=t.querySelector("#yyt-assistant-send");r&&(r.disabled=yo||!go.trim())}),t.querySelector("#yyt-assistant-preset")?.addEventListener("change",e=>{Cu=e.target.value||""}),t.querySelector("#yyt-assistant-max-rounds")?.addEventListener("input",e=>{Au=e.target.value||String(Eu)}),t.querySelector("#yyt-assistant-send")?.addEventListener("click",QE),t.querySelector("#yyt-assistant-stop")?.addEventListener("click",ZE),t.querySelector('[data-action="close-assistant"]')?.addEventListener("click",eA),t.querySelectorAll(".yyt-assistant-toggle").forEach(e=>{e.addEventListener("click",()=>{let r=e.getAttribute("data-turn-id"),n=lt.find(s=>s.id===r&&s.type==="assistant");n&&(n.expanded=!n.expanded,fo())})}),t.querySelectorAll(".yyt-assistant-risk-cb").forEach(e=>{e.addEventListener("change",()=>{let r=e.getAttribute("data-turn-id"),n=Number(e.getAttribute("data-risk-idx")),s=lt.find(a=>a.id===r&&a.type==="assistant");if(!s)return;s.riskConfirmations||(s.riskConfirmations={}),s.riskConfirmations[String(n)]=e.checked;let o=t.querySelector(`.yyt-assistant-apply-btn[data-turn-id="${r}"]`);if(o){let a=(s.compileResult?.highRiskItems||[]).every((i,l)=>s.riskConfirmations[String(l)]!==!1);o.disabled=!a}})}),t.querySelectorAll(".yyt-assistant-apply-btn").forEach(e=>{e.addEventListener("click",async()=>{let r=e.getAttribute("data-turn-id"),n=lt.find(a=>a.id===r&&a.type==="assistant");if(!n?.result)return;let s=n.compileResult?.highRiskItems||[],o=s.every((a,i)=>n.riskConfirmations?.[String(i)]!==!1);if(s.length&&!o){Yr.warn("\u8BF7\u5148\u786E\u8BA4\u6240\u6709\u9AD8\u98CE\u9669\u9879",null,{toast:"warning"});return}try{if(await db(n.result)){Yr.info("assistant \u8349\u7A3F\u5DF2\u5E94\u7528\u5230\u5DE5\u4F5C\u53F0",null,{toast:"success"});let i=n.compileResult?.focusTableId;if(i)try{let l=Te();l&&(!l.scope||l.scope.activeTableId!==i)&&(l.scope={...l.scope||{},activeTableId:i},nt(l))}catch{}typeof Tu=="function"&&Tu(),fo()}else Yr.warn("\u5F53\u524D\u7ED3\u6784\u5DF2\u53D8\u5316\uFF0Cassistant \u8349\u7A3F\u5DF2\u5931\u6548\uFF0C\u8BF7\u91CD\u65B0\u751F\u6210\u3002",null,{toast:"warning"})}catch(a){Yr.error("\u5E94\u7528\u5931\u8D25",a,{toast:"error"})}})}))}async function QE(){let t=go.trim();if(!t)return;let e=Te(),r=e?.scope?.activeTableId||"";if(!r){Yr.warn("\u8BF7\u5148\u9009\u4E2D\u4E00\u4E2A\u8868\u540E\u518D\u4F7F\u7528 AI \u6539\u8868\u52A9\u624B",null,{toast:"warning"});return}let n=tA(),s={type:"user",id:_l(),content:t};lt.push(s),go="",yo=!0;let o=Tl+1;El=bu(),Tl=o,fo();let a=e,i=null,l=null;try{if(i=await ga(),i){let d=al(i);if(d?.tables?.length){l={};for(let c of d.tables)Array.isArray(c.rows)&&c.rows.length&&(l[c.id]=c.rows.map(u=>({rowId:u.id,name:u.name||"",cells:u.cells||{}})));Object.keys(l).length||(l=null)}}}catch(d){Yr.warn("\u52A0\u8F7D\u884C\u6570\u636E\u4E0A\u4E0B\u6587\u5931\u8D25\uFF0C\u5C06\u4EC5\u4F7F\u7528 schema \u4E0A\u4E0B\u6587",d)}try{let d=await cb({config:pe(e),currentTableId:r,userRequest:t,priorTurns:n,apiPreset:Cu,maxRounds:vl(Au,Eu),guard:El.createRunGuard(),dataContext:l,targetSnapshot:i,onRoundComplete:y=>{if(o!==Tl)return;let p={type:"assistant",id:_l(),draft:y.round.draft,aiRawText:y.round.aiRawText,compileResult:y.round.perRoundCompileResult,sessionInfo:`\u7B2C ${y.round.round}/${y.maxRounds} \u8F6E`,isFinal:!1,expanded:!1,riskConfirmations:{}};lt.push(p),fo()}});if(o!==Tl)return;let c={type:"assistant",id:_l(),draft:d.draft,aiRawText:d.aiRawText,compileResult:d.compileResult,sessionInfo:d.session?`${d.session.roundsExecuted}\u8F6E \xB7 ${d.session.stopReason}`:"",isFinal:!0,expanded:!1,riskConfirmations:{},result:d};try{let y=lb({baselineConfig:a,candidateConfig:d.compileResult.candidateConfig});c.cumulativeDiff=y.diff}catch(y){Yr.warn("buildCumulativeDiff \u5931\u8D25\uFF0C\u8DF3\u8FC7\u7D2F\u79EF\u6458\u8981",y)}let u=lt.findLastIndex(y=>y.type==="assistant"&&!y.isFinal);u>=0?lt[u]=c:lt.push(c)}catch(d){if(d instanceof ms){Yr.warn(d.message,null,{toast:"warning"});return}lt.push({type:"error",id:_l(),errorMessage:d?.message||"\u751F\u6210\u5931\u8D25"}),Yr.error("\u6539\u8868\u52A9\u624B\u6267\u884C\u5931\u8D25",d,{toast:"error"})}finally{yo=!1,fo()}}function ZE(){El&&El.cancel()}function eA(){gb=!1;let t=ku();t&&(t.style.display="none"),typeof _u=="function"&&_u()}function tA(){let t=[];for(let e=0;e<lt.length;e++){let r=lt[e];if(r.type==="user"){let n;for(let s=e+1;s<lt.length&&lt[s].type!=="user";s++)lt[s].type==="assistant"&&lt[s].isFinal&&(n=lt[s].aiRawText);t.push({user:r.content,assistant:n})}}return t}function mb(t,e,r){e&&(Su=e),typeof t=="function"&&(Tu=t),_u=r||null,gb=!0,fo()}function hb(){return`
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
  `}var Yr,pb,Eu,Su,Tu,_u,gb,yo,go,Au,Cu,El,lt,Tl,bb=O(()=>{J();ub();nr();cs();ma();vu();Fe();Sl();ws();Yr=N.createScope("TableAssistantUI");pb="yyt-assistant-host",Eu=3,Su=null,Tu=null,_u=null,gb=!1,yo=!1,go="",Au=String(Eu),Cu="",El=null,lt=[],Tl=0});function oe(){return Ru||(Ru=N.createScope("TableDataEditor")),Ru}function Re(){k.isDirty=!0;try{k._refs.saveBtn?.setDisabled(!1),k._refs.dirtyBadge&&(k._refs.dirtyBadge.style.display="inline-flex")}catch{}}function vb(){k.isDirty=!1;try{k._refs.saveBtn?.setDisabled(!0),k._refs.dirtyBadge&&(k._refs.dirtyBadge.style.display="none")}catch{}}function mt(){let t=Array.isArray(k.tempData)?k.tempData:[],e=k.currentTableIndex;return e>=0&&e<t.length?t[e]:null}function nA(){if(!Mu)try{let t=window.parent&&window.parent.document?window.parent.document:document,e=t.head||t.documentElement;if(e.querySelector("#yyt-tde-styles")){Mu=!0;return}let r=t.createElement("style");r.id="yyt-tde-styles",r.textContent=rA,e.appendChild(r),Mu=!0}catch(t){oe().warn("\u6CE8\u5165\u6570\u636E\u7F16\u8F91\u5668\u6837\u5F0F\u5931\u8D25",t)}}function Nu(){let t=[],e=null,r=!1,n=k._afterSaveGlobalAt&&Date.now()-k._afterSaveGlobalAt<5*60*1e3;try{let s=ls(null);oe().info("loadEditorData snapshot",{hasSnapshot:!!s,messageId:s?.message?.message_id??s?.sourceMessageId,chatId:s?.chatId,isolationKey:s?.tableState?.meta?.isolationKey,hasTableState:!!s?.tableState,tableStateTablesLen:Array.isArray(s?.tableState?.tables)?s.tableState.tables.length:null,firstTableNameInSlot:s?.tableState?.tables?.[0]?.name,afterSaveGlobalRecent:n}),!n&&Array.isArray(s?.tableState?.tables)&&s.tableState.tables.length>0&&(t=s.tableState.tables),e=s?{chatId:s.chatId||"",sourceMessageId:s.sourceMessageId||s.message?.message_id||"",sourceSwipeId:s.sourceSwipeId||"",effectiveSwipeId:s.effectiveSwipeId||"",slotBindingKey:s.slotBindingKey||"",slotRevisionKey:s.slotRevisionKey||"",slotTransactionId:s.slotTransactionId||"",traceId:s.traceId||"",targetMessageIndex:s.targetMessageIndex??-1}:null}catch(s){oe().warn("loadEditorData \u5F02\u5E38",s)}if(t.length===0)try{let o=Js({})?.template?.tables;Array.isArray(o)&&o.length>0&&(t=pe(o),r=!0)}catch(s){oe().warn("\u4ECE\u6A21\u677F fallback \u5931\u8D25",s)}k.tempData=pe(t)||[],k.targetSnapshot=e,k.isDirty=!1,k.isFromTemplate=r,k._pendingMirrorTag=null,k._pendingWrapperConfig=null,k.currentTableIndex>=k.tempData.length?k.currentTableIndex=k.tempData.length>0?0:-1:k.currentTableIndex<0&&k.tempData.length>0&&(k.currentTableIndex=0)}function sA(){let t=f("div",{className:"yyt-tde-toolbar"}),e=f("div",{className:"yyt-tde-toolbar-left"}),r=f("div",{className:"yyt-tde-mode-switch"}),n=[{key:"data",label:"\u6570\u636E\u7F16\u8F91"},{key:"schema",label:"\u7ED3\u6784\u914D\u7F6E"},{key:"global",label:"\u5168\u5C40\u6CE8\u5165"}];for(let u of n){let y=te({label:u.label,variant:k.mode===u.key?"primary":"ghost",size:"small",onClick:()=>{k.mode!==u.key&&(k.mode=u.key,Ye())}});r.appendChild(y.el)}e.appendChild(r);let s=f("span",{className:"yyt-tde-dirty-badge",text:"\u672A\u4FDD\u5B58"});k.isDirty&&(s.style.display="inline-flex"),e.appendChild(s),k._refs.dirtyBadge=s;let o=f("div",{className:"yyt-tde-actions"}),a=te({label:"\u91CD\u65B0\u52A0\u8F7D",icon:"\u21BB",size:"small",onClick:fA}),i=te({label:"\u4FDD\u5B58\u5230 chat",icon:"\u{1F4BE}",size:"small",disabled:!k.isDirty,title:"\u4FDD\u5B58\u5230\u5F53\u524D\u6D88\u606F\u7684 slot",onClick:gA});k._refs.saveBtn=i;let l=te({label:"\u4FDD\u5B58\u5230\u5168\u5C40",icon:"\u{1F310}",size:"small",title:"\u4FDD\u5B58\u5230\u5168\u5C40\u6FC0\u6D3B\u6A21\u677F\uFF08\u5F71\u54CD\u6240\u6709 chat \u540E\u7EED\u586B\u8868\uFF09",onClick:mA});k._refs.saveGlobalBtn=l;let d=te({label:"\u7ACB\u5373\u586B\u8868",icon:"\u25B6",variant:"primary",size:"small",onClick:hA}),c=te({label:"AI \u6539\u8868\u52A9\u624B",icon:"\u2726",size:"small",variant:k._assistantOpen?"primary":"ghost",title:"\u7528\u81EA\u7136\u8BED\u8A00\u4FEE\u6539\u8868\u7ED3\u6784\u3001AI \u6307\u4EE4\u548C\u914D\u7F6E",onClick:yA});return o.appendChild(a.el),o.appendChild(i.el),o.appendChild(l.el),o.appendChild(d.el),o.appendChild(c.el),t.appendChild(e),t.appendChild(o),t}function oA(){let t=f("div",{className:"yyt-tde-sidebar"}),e=k.tempData||[];t.appendChild(f("div",{className:"yyt-tde-sidebar-label",text:`\u8868\u683C\u5217\u8868 (${e.length})`}));let r=f("div",{className:"yyt-tde-sheet-list"});return e.length===0?r.appendChild(f("div",{text:"\u6682\u65E0\u8868",style:{padding:"8px 10px",fontSize:"11px",color:"var(--tde-text-muted)"}})):e.forEach((n,s)=>{let o=s===k.currentTableIndex,a=n?.name||`\u8868 ${s+1}`,i=Array.isArray(n?.rows)?n.rows.length:0,l=f("div",{className:`yyt-tde-sheet-row${o?" active":""}`}),d=f("div",{className:"yyt-tde-sheet-pick"});d.appendChild(f("span",{className:"yyt-tde-sheet-idx",text:`[${s}]`})),d.appendChild(f("span",{className:"yyt-tde-sheet-name",text:a})),d.appendChild(f("span",{className:"yyt-tde-sheet-count",text:String(i)})),d.addEventListener("click",()=>{k.currentTableIndex!==s&&(k.currentTableIndex=s,Ye())}),l.appendChild(d);let c=f("div",{className:"yyt-tde-sheet-actions"});c.appendChild(te({label:"\u2191",size:"small",variant:"ghost",disabled:s===0,title:"\u4E0A\u79FB",onClick:()=>wb(s,-1)}).el),c.appendChild(te({label:"\u2193",size:"small",variant:"ghost",disabled:s===e.length-1,title:"\u4E0B\u79FB",onClick:()=>wb(s,1)}).el),c.appendChild(te({label:"\xD7",size:"small",variant:"danger",title:"\u5220\u9664\u6B64\u8868",onClick:()=>bA(s)}).el),l.appendChild(c),r.appendChild(l)}),t.appendChild(r),t.appendChild(te({label:"+ \u6DFB\u52A0\u65B0\u8868",size:"small",variant:"ghost",onClick:xA}).el),t}function aA(){let t=f("main",{className:"yyt-tde-main"}),e=k.tempData||[];if(k.mode==="global")return t.appendChild(cA()),t;if(e.length===0)return t.appendChild(f("div",{className:"yyt-tde-empty",html:'\u5F53\u524D slot \u6CA1\u6709\u8868\u6570\u636E\uFF0C\u6A21\u677F\u4E5F\u672A\u914D\u7F6E\u8868\u3002<br>\u8BF7\u5148\u5728\u5DE5\u4F5C\u53F0\u70B9"\u7ACB\u5373\u586B\u8868"\u8BA9 AI \u521D\u59CB\u5316\uFF0C\u6216\u5230\u300C\u9884\u8BBE\u7BA1\u7406 \u2192 \u8868\u683C\u6A21\u677F\u300D\u914D\u7F6E\u6A21\u677F\u3002'})),t;let r=mt();return r?(k.mode==="data"?t.appendChild(iA(r)):k.mode==="schema"&&t.appendChild(lA(r)),t):(t.appendChild(f("div",{className:"yyt-tde-empty",text:"\u8BF7\u4ECE\u5DE6\u4FA7\u9009\u62E9\u4E00\u5F20\u8868\u3002"})),t)}function iA(t){let e=f("div"),r=Array.isArray(t?.columns)?t.columns:[],n=Array.isArray(t?.rows)?t.rows:[],s=k.targetSnapshot?.chatId||"",o=t?.uid||t?.id||"",a={cols:{},rows:{},cells:{},indexCol:!1};try{a=lo({chatId:s,isolationKey:ue.getKey()},o)||a}catch{}let i=a?.rows||{},l=a?.cells||{};k.isFromTemplate&&e.appendChild(f("div",{className:"yyt-tde-schema-hint",html:'\u5F53\u524D\u663E\u793A<b>\u6A21\u677F\u9ED8\u8BA4\u7ED3\u6784</b>\uFF08slot \u5C1A\u65E0\u6570\u636E\uFF09\u3002\u76F4\u63A5\u6DFB\u52A0\u884C\u6216\u7F16\u8F91\u4F1A\u521B\u5EFA slot \u6570\u636E\uFF1B\u6216\u5DE5\u4F5C\u53F0\u70B9"\u7ACB\u5373\u586B\u8868"\u8BA9 AI \u586B\u3002'}));let d=f("div",{className:"yyt-tde-card-grid"});n.forEach((u,y)=>{let p=u?.cells||{},g=!!i[y],m=f("article",{className:`yyt-tde-card${g?" yyt-tde-row-locked":""}`}),h=f("header",{className:"yyt-tde-card-header"});h.appendChild(f("span",{className:"yyt-tde-card-index",text:`#${y+1}`}));let b=f("div",{className:"yyt-tde-card-name-slot"}),x=ve({value:u?.name||"",placeholder:"\u884C\u540D",disabled:g,onInput:I=>{let S=mt();S?.rows?.[y]&&(S.rows[y].name=I,Re())}});b.appendChild(x.el),h.appendChild(b);let w=f("div",{className:"yyt-tde-card-actions"});w.appendChild(te({label:g?"\u{1F512}":"\u{1F513}",size:"small",variant:g?"danger":"ghost",title:g?"\u5DF2\u9501\u5B9A\u6B64\u884C\uFF08\u70B9\u51FB\u89E3\u9501\uFF09":"\u9501\u5B9A\u6B64\u884C\uFF08AI \u4E0D\u4F1A\u6539\uFF09",onClick:()=>wA(o,y)}).el),w.appendChild(te({label:"\u{1F5D1}",size:"small",variant:"danger",disabled:g,title:"\u5220\u9664\u884C",onClick:()=>SA(y)}).el),h.appendChild(w),m.appendChild(h);let T=f("div",{className:"yyt-tde-card-body"});r.length===0?T.appendChild(f("div",{text:"\u8BE5\u8868\u6CA1\u6709\u5217\u5B9A\u4E49",style:{padding:"8px",color:"var(--tde-text-muted)",fontSize:"12px"}})):r.forEach(I=>{let S=I?.key||"",A=I?.title||S,P=p[S],M=P==null||P==="",R=M?"\uFF08\u7A7A\uFF09":String(P),_=!!l[`${y}::${S}`],$=f("div",{className:`yyt-tde-field${_?" yyt-tde-cell-locked":""}`}),F=f("div",{className:"yyt-tde-field-label"});F.appendChild(f("span",{text:A})),F.appendChild(te({label:_?"\u{1F512}":"\u{1F513}",size:"small",variant:_?"danger":"ghost",title:_?"\u5DF2\u9501\u5B9A\u6B64\u5355\u5143\u683C":"\u9501\u5B9A\u6B64\u5355\u5143\u683C\uFF08AI \u4E0D\u4F1A\u6539\uFF09",onClick:()=>vA(o,y,S)}).el),$.appendChild(F);let Y=f("div",{className:`yyt-tde-field-cell${M?" yyt-tde-field-cell--empty":""}${_?" yyt-tde-cell-locked-bg":""}`,text:R,attrs:{contenteditable:_?"false":"true"}});Y.addEventListener("input",()=>{let re=mt();re?.rows?.[y]&&(re.rows[y].cells||(re.rows[y].cells={}),re.rows[y].cells[S]=Y.textContent,Re())}),$.appendChild(Y),T.appendChild($)}),m.appendChild(T),d.appendChild(m)});let c=f("div",{className:"yyt-tde-card-add"});return c.appendChild(te({label:"+ \u6DFB\u52A0\u884C",variant:"ghost",onClick:TA}).el),d.appendChild(c),e.appendChild(d),e}function lA(t){let e=f("div"),r=Array.isArray(t?.columns)?t.columns:[],n=t?.sourceData||{},s=t?.aiInstructions||{},o=t?.updateConfig||{},a=k.targetSnapshot?.chatId||"",i=t?.uid||t?.id||"",l={cols:{},rows:{},cells:{},indexCol:!1};try{l=lo({chatId:a,isolationKey:ue.getKey()},i)||l}catch{}let d=l?.cols||{},c=f("div",{className:"yyt-tde-schema-section"});c.appendChild(f("div",{className:"yyt-tde-schema-heading",text:"\u57FA\u7840\u4FE1\u606F"}));let u=f("div",{className:"yyt-tde-schema-row"});u.appendChild(f("div",{className:"yyt-tde-schema-key",text:"\u8868\u540D"}));let y=f("div",{className:"yyt-tde-schema-value"});y.appendChild(ve({value:t?.name||"",onInput:P=>{let M=mt();M&&(M.name=P,Re())}}).el),u.appendChild(y),c.appendChild(u);let p=f("div",{className:"yyt-tde-schema-row"});p.appendChild(f("div",{className:"yyt-tde-schema-key",text:"UID"})),p.appendChild(f("code",{text:t?.uid||t?.id||"",style:{fontSize:"11px",color:"var(--tde-accent)"}})),c.appendChild(p);let g=f("div",{className:"yyt-tde-schema-row",style:{alignItems:"flex-start"}});g.appendChild(f("div",{className:"yyt-tde-schema-key",text:"\u8868\u8BF4\u660E"}));let m=f("div",{className:"yyt-tde-schema-value"});m.appendChild(Ia({value:t?.note||n?.note||"",placeholder:"\u8868\u7528\u9014\u8BF4\u660E + \u5217\u6CE8\u91CA",onInput:P=>{let M=mt();M&&(M.note=P,Re())}})),g.appendChild(m),c.appendChild(g),e.appendChild(c);let h=f("div",{className:"yyt-tde-schema-section"});h.appendChild(f("div",{className:"yyt-tde-schema-heading",text:"AI \u64CD\u4F5C\u8BF4\u660E (sourceData)"}));let b=[{key:"init",label:"\u521D\u59CB\u5316 (init)",placeholder:"\u8868\u4E3A\u7A7A\u65F6 AI \u5E94\u8BE5\u63D2\u5165\u4EC0\u4E48",legacy:"initNode"},{key:"create",label:"\u65B0\u589E (insert)",placeholder:"\u4EC0\u4E48\u60C5\u51B5\u4E0B AI \u5E94\u8BE5\u65B0\u589E\u884C",legacy:"insertNode"},{key:"update",label:"\u66F4\u65B0 (update)",placeholder:"\u4EC0\u4E48\u60C5\u51B5\u4E0B AI \u5E94\u8BE5\u66F4\u65B0\u884C",legacy:"updateNode"},{key:"delete",label:"\u5220\u9664 (delete)",placeholder:"\u4EC0\u4E48\u60C5\u51B5\u4E0B AI \u5E94\u8BE5\u5220\u9664\u884C",legacy:"deleteNode"}];for(let P of b){let M=f("div",{className:"yyt-tde-schema-row",style:{alignItems:"flex-start"}});M.appendChild(f("div",{className:"yyt-tde-schema-key",text:P.label}));let R=f("div",{className:"yyt-tde-schema-value"});R.appendChild(Ia({value:s?.[P.key]||n?.[P.legacy]||"",placeholder:P.placeholder,onInput:_=>{let $=mt();$&&($.aiInstructions=$.aiInstructions||{},$.aiInstructions[P.key]=_,Re())}})),M.appendChild(R),h.appendChild(M)}e.appendChild(h);let x=f("div",{className:"yyt-tde-schema-section"});x.appendChild(f("div",{className:"yyt-tde-schema-heading",text:"\u66F4\u65B0\u914D\u7F6E (updateConfig)"})),x.appendChild(f("div",{className:"yyt-tde-hint",style:{marginBottom:"8px",fontSize:"11px",color:"var(--tde-text-muted)"},html:"<strong>\u8BF4\u660E</strong>\uFF1A\u8FD9\u91CC\u914D\u7F6E AI \u586B\u8868\u65F6\u8FD9\u5F20\u8868\u7684\u884C\u4E3A\uFF08\u9891\u7387\u3001\u4E0A\u4E0B\u6587\u6DF1\u5EA6\u3001token \u8282\u7701\uFF09\u3002\u8DDF\u300C\u4E16\u754C\u4E66\u6CE8\u5165\u300D\u662F\u4E24\u4EF6\u4E8B\uFF1A\u4E16\u754C\u4E66\u662F\u628A\u8868\u6570\u636E\u585E\u8FDB prompt \u7ED9\u4E3B AI \u770B\uFF08\u5408\u5E76\u6761\u76EE / \u72EC\u7ACB\u6761\u76EE\u5728<strong>\u5168\u5C40\u6CE8\u5165</strong> tab \u914D\uFF09\uFF0C\u8FD9\u91CC\u662F\u63A7\u5236<strong>\u586B\u8868\u65F6\u673A</strong>\uFF08\u591A\u4E45\u586B\u4E00\u6B21\u3001\u8DF3\u8FC7\u51E0\u5C42\u7B49\uFF09\u3002-1 = \u6CBF\u7528\u5168\u5C40\uFF0C0 = \u7981\u7528\u5355\u8868\u3002"}));let w=f("div",{className:"yyt-tde-uc-grid"}),T=[{key:"contextDepth",label:"\u4E0A\u4E0B\u6587\u6DF1\u5EA6 (contextDepth)",hint:"-1 = \u6CBF\u7528\u5168\u5C40\uFF0C0 = \u7981\u7528\uFF0CN = \u6700\u8FD1 N \u6761\u6D88\u606F"},{key:"updateFrequency",label:"\u66F4\u65B0\u9891\u7387 (updateFrequency)",hint:"-1 = \u6CBF\u7528\u5168\u5C40\uFF0C0 = \u7981\u7528\u81EA\u52A8\u586B\u8868\uFF0CN = \u6BCF N \u6761\u6D88\u606F\u89E6\u53D1\u4E00\u6B21"},{key:"batchSize",label:"\u6279\u6B21\u5927\u5C0F (batchSize)",hint:"-1 = \u6CBF\u7528\u5168\u5C40\uFF0CN = \u5355\u6B21\u6700\u591A\u5904\u7406 N \u5F20\u8868"},{key:"skipFloors",label:"\u8DF3\u8FC7\u697C\u5C42 (skipFloors)",hint:"-1 = \u6CBF\u7528\u5168\u5C40\uFF0CN = \u8DF3\u8FC7\u6700\u8FD1 N \u5C42"},{key:"sendLatestRows",label:"\u53D1\u9001\u6700\u65B0 N \u884C (sendLatestRows)",hint:"-1 = \u5168\u90E8\u53D1\u9001\uFF0C0 = \u6CBF\u7528\u5168\u5C40\uFF0CN = \u4EC5\u53D1\u9001\u6700\u65B0 N \u884C\uFF08\u5927\u8868 token \u8282\u7701\uFF09"}];for(let P of T){let M=f("div",{className:"yyt-tde-uc-cell"});M.appendChild(f("label",{text:P.label})),M.appendChild(ve({type:"number",value:Number.isFinite(o?.[P.key])?String(o[P.key]):"-1",onInput:R=>{let _=mt();if(!_)return;_.updateConfig=_.updateConfig||{};let $=Number(R);_.updateConfig[P.key]=Number.isFinite($)?$:-1,Re()}}).el),M.appendChild(f("span",{className:"yyt-tde-hint",text:P.hint})),w.appendChild(M)}let I=f("div",{className:"yyt-tde-uc-cell"});I.appendChild(f("label",{text:"\u5206\u7EC4 ID (groupId)"})),I.appendChild(ve({value:o?.groupId||"",placeholder:"\u540C\u7EC4 ID \u7684\u8868\u4F1A\u5408\u5E76\u89E6\u53D1",onInput:P=>{let M=mt();M&&(M.updateConfig=M.updateConfig||{},M.updateConfig.groupId=P,Re())}}).el),I.appendChild(f("span",{className:"yyt-tde-hint",text:"\u540C\u7EC4\u540C\u65F6\u89E6\u53D1\uFF0C\u8DE8\u7EC4\u5E76\u884C\uFF08\u7559\u7A7A = \u72EC\u7ACB\u89E6\u53D1\uFF09"})),w.appendChild(I);let S=f("div",{className:"yyt-tde-uc-cell yyt-tde-uc-cell-wide"});S.appendChild(f("label",{text:"\u8868\u7EA7 API \u9884\u8BBE\u8986\u76D6"})),S.appendChild(ve({value:o?.apiPreset||"",placeholder:"\u7559\u7A7A = \u6CBF\u7528\u5168\u5C40\uFF0C\u586B\u9884\u8BBE\u540D = \u8FD9\u5F20\u8868\u7528\u8FD9\u4E2A",onInput:P=>{let M=mt();M&&(M.updateConfig=M.updateConfig||{},M.updateConfig.apiPreset=P,Re())}}).el),S.appendChild(f("span",{className:"yyt-tde-hint",text:"\u4F8B\uFF1A\u89D2\u8272\u8868\u7528 Claude\u3001\u7EAA\u8981\u8868\u7528 GPT"})),w.appendChild(S),x.appendChild(w),e.appendChild(x);let A=f("div",{className:"yyt-tde-schema-section"});return A.appendChild(f("div",{className:"yyt-tde-schema-heading",text:`\u5B57\u6BB5\u5B9A\u4E49 (${r.length})`})),r.length===0?A.appendChild(f("div",{text:"\u65E0\u5B57\u6BB5",style:{color:"var(--tde-text-muted)",fontSize:"12px",padding:"8px 0"}})):r.forEach((P,M)=>{let R=P?.key||"",_=R?!!d[R]:!1,$=f("div",{className:`yyt-tde-schema-field${_?" locked":""}`}),F=f("div",{className:"yyt-tde-schema-field-head"});F.appendChild(f("span",{className:"yyt-tde-schema-idx",text:`[${M}]`}));let Y=f("div",{className:"yyt-tde-field-input-title"});Y.appendChild(ve({value:P?.title||P?.key||"",placeholder:"\u5B57\u6BB5\u6807\u9898",onInput:we=>{let Ie=mt();Ie?.columns?.[M]&&(Ie.columns[M].title=we,Re())}}).el),F.appendChild(Y);let re=f("div",{className:"yyt-tde-field-input-key"}),ie=ve({value:P?.key||"",placeholder:"key",style:{fontFamily:"monospace"},onInput:we=>{let Ie=mt();Ie?.columns?.[M]&&(Ie.columns[M].key=we,Re())}});re.appendChild(ie.el),F.appendChild(re);let Z=f("div",{className:"yyt-tde-field-input-type"});Z.appendChild(Me({value:P?.type||"text",options:["text","number","boolean","date","json"].map(we=>({value:we,label:we})),onChange:we=>{let Ie=mt();Ie?.columns?.[M]&&(Ie.columns[M].type=we,Re())}}).el),F.appendChild(Z),F.appendChild(te({label:_?"\u{1F512}":"\u{1F513}",size:"small",variant:_?"danger":"ghost",title:_?"\u5DF2\u9501\u5B9A\uFF1AAI \u4E0D\u4F1A\u6539\u8FD9\u5217\u3002\u70B9\u51FB\u89E3\u9501":"\u9501\u5B9A\u6B64\u5217\uFF1AAI \u6C38\u4E0D\u4FEE\u6539",onClick:()=>_A(i,R)}).el),F.appendChild(te({label:"\u{1F5D1}",size:"small",variant:"danger",title:"\u5220\u9664\u6B64\u5B57\u6BB5",onClick:()=>EA(M)}).el),$.appendChild(F),$.appendChild(Ia({value:P?.description||"",placeholder:"\u5B57\u6BB5\u63CF\u8FF0",minHeight:"32px",onInput:we=>{let Ie=mt();Ie?.columns?.[M]&&(Ie.columns[M].description=we,Re())}})),A.appendChild($)}),A.appendChild(te({label:"+ \u6DFB\u52A0\u5B57\u6BB5",variant:"ghost",onClick:AA}).el),e.appendChild(A),e}function cA(){let t=f("div"),e=Array.isArray(k.tempData)?k.tempData:[];if(t.appendChild(f("div",{className:"yyt-tde-schema-hint",style:{background:"rgba(74,158,255,0.08)",borderColor:"rgba(74,158,255,0.3)"},html:"<strong>\u5168\u5C40\u6CE8\u5165\u914D\u7F6E</strong> \u2014 Wrapper \u5305\u88F9\u914D\u7F6E\uFF08\u5305\u4F4F\u6240\u6709\u672A\u542F\u7528\u72EC\u7ACB\u6CE8\u5165\u7684\u8868\uFF09+ \u6BCF\u5F20\u8868\u7684 exportConfig\u3002"})),e.length===0)return t.appendChild(f("div",{className:"yyt-tde-empty",text:"\u65E0\u8868\u683C\u53EF\u914D\u7F6E\u3002\u8BF7\u5148\u6DFB\u52A0\u8868\u683C\u3002"})),t;let r="yyt-table-workbench";try{r=Te()?.mirrorTag||r}catch{}let n=f("div",{className:"yyt-tde-schema-section"});n.appendChild(f("div",{className:"yyt-tde-schema-heading",text:"\u5199\u56DE\u6B63\u6587\u6807\u7B7E"}));let s=f("div",{className:"yyt-tde-uc-grid"}),o=f("div",{className:"yyt-tde-uc-cell yyt-tde-uc-cell-wide"});o.appendChild(f("label",{text:"mirrorTag"})),o.appendChild(ve({value:r,placeholder:"\u9ED8\u8BA4: yyt-table-workbench",onInput:T=>{k._pendingMirrorTag=T,Re()}}).el),o.appendChild(f("span",{className:"yyt-tde-hint",text:"\u5F00\u542F\u5199\u56DE\u6B63\u6587\u65F6\uFF0C\u7528\u6B64 XML \u6807\u7B7E\u5305\u88F9\u8868\u683C\u6570\u636E\u6CE8\u5165\u5230 assistant \u6D88\u606F"})),s.appendChild(o),n.appendChild(s),t.appendChild(n);let a={enabled:!0,wrapperTag:"\u6700\u65B0\u6570\u636E\u4E0E\u8BB0\u5F55",wrapperHint:"",wrapperPlacement:{position:"before_character_definition",depth:2,order:0}};try{let T=Te();if(T?.wrapperConfig){let I=T.wrapperConfig;a={enabled:I.enabled!==!1,wrapperTag:I.wrapperTag||a.wrapperTag,wrapperHint:I.wrapperHint??a.wrapperHint,wrapperPlacement:{...I.wrapperPlacement||a.wrapperPlacement}}}}catch{}k._pendingWrapperConfig||(k._pendingWrapperConfig={...a,wrapperPlacement:{...a.wrapperPlacement}});let i=f("div",{className:"yyt-tde-schema-section"}),l=f("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"10px"}});l.appendChild(f("div",{className:"yyt-tde-schema-heading",style:{marginBottom:"0"},text:"Wrapper \u5305\u88F9\u914D\u7F6E"})),l.appendChild(Qe({label:"\u542F\u7528",checked:k._pendingWrapperConfig.enabled!==!1,style:{padding:"0",border:"none",background:"none"},onChange:T=>{k._pendingWrapperConfig.enabled=T,Re(),Ye()}}).el),i.appendChild(l);let d=k._pendingWrapperConfig.enabled!==!1,c=f("div",{className:d?"":"yyt-tde-disabled-section"}),u=f("div",{className:"yyt-tde-schema-row"});u.appendChild(f("div",{className:"yyt-tde-schema-key",text:"\u6807\u7B7E\u540D"}));let y=f("div",{className:"yyt-tde-schema-value"});y.appendChild(ve({value:k._pendingWrapperConfig.wrapperTag||"",placeholder:"\u9ED8\u8BA4: \u6700\u65B0\u6570\u636E\u4E0E\u8BB0\u5F55",onInput:T=>{k._pendingWrapperConfig.wrapperTag=T,Re()}}).el),u.appendChild(y),c.appendChild(u);let p=f("div",{className:"yyt-tde-schema-row",style:{alignItems:"flex-start"}});p.appendChild(f("div",{className:"yyt-tde-schema-key",text:"\u63D0\u793A\u6587"}));let g=f("div",{className:"yyt-tde-schema-value"});g.appendChild(Ia({value:k._pendingWrapperConfig.wrapperHint||"",placeholder:"\u53EF\u9009\uFF0C\u6CE8\u5165\u5728 wrapper \u5F00\u59CB\u6807\u7B7E\u4E4B\u540E",onInput:T=>{k._pendingWrapperConfig.wrapperHint=T,Re()}})),p.appendChild(g),c.appendChild(p);let m=k._pendingWrapperConfig.wrapperPlacement||{},h=f("div",{className:"yyt-tde-schema-row"});h.appendChild(f("div",{className:"yyt-tde-schema-key",text:"\u6CE8\u5165\u4F4D\u7F6E"}));let b=f("div",{className:"yyt-tde-schema-value"});b.appendChild(Me({value:m.position||"before_character_definition",options:[{value:"before_character_definition",label:"\u89D2\u8272\u5B9A\u4E49\u4E4B\u524D"},{value:"after_character_definition",label:"\u89D2\u8272\u5B9A\u4E49\u4E4B\u540E"},{value:"before_authors_note",label:"\u4F5C\u8005\u6CE8\u91CA\u4E4B\u524D"},{value:"after_authors_note",label:"\u4F5C\u8005\u6CE8\u91CA\u4E4B\u540E"}],onChange:T=>{k._pendingWrapperConfig.wrapperPlacement||(k._pendingWrapperConfig.wrapperPlacement={}),k._pendingWrapperConfig.wrapperPlacement.position=T,Re()}}).el),h.appendChild(b),c.appendChild(h);let x=f("div",{className:"yyt-tde-schema-row"});x.appendChild(f("div",{className:"yyt-tde-schema-key",text:"\u6DF1\u5EA6 / \u987A\u5E8F"}));let w=f("div",{className:"yyt-tde-schema-value",style:{display:"flex",gap:"12px",alignItems:"center"}});return w.appendChild(f("label",{text:"\u6DF1\u5EA6",style:{fontSize:"11px",color:"var(--tde-text-secondary)",fontWeight:"600",whiteSpace:"nowrap"}})),w.appendChild(ve({type:"number",value:String(m.depth??2),style:{width:"56px"},onInput:T=>{k._pendingWrapperConfig.wrapperPlacement||(k._pendingWrapperConfig.wrapperPlacement={}),k._pendingWrapperConfig.wrapperPlacement.depth=Number(T)||0,Re()}}).el),w.appendChild(f("label",{text:"\u987A\u5E8F",style:{fontSize:"11px",color:"var(--tde-text-secondary)",fontWeight:"600",whiteSpace:"nowrap",marginLeft:"4px"}})),w.appendChild(ve({type:"number",value:String(m.order??0),style:{width:"56px"},onInput:T=>{k._pendingWrapperConfig.wrapperPlacement||(k._pendingWrapperConfig.wrapperPlacement={}),k._pendingWrapperConfig.wrapperPlacement.order=Number(T)||0,Re()}}).el),x.appendChild(w),c.appendChild(x),i.appendChild(c),t.appendChild(i),e.forEach((T,I)=>{t.appendChild(dA(T,I))}),t}function dA(t,e){let r=t?.exportConfig||{},n=r.entryPlacement||{},s=r.extraIndexPlacement||{},o=r.enabled===!0,a=f("div",{className:"yyt-tde-global-card"}),i=f("div",{className:"yyt-tde-global-card-head"});i.appendChild(f("span",{className:"yyt-tde-global-card-name",text:t?.name||`\u8868 ${e+1}`}));let l=Qe({label:"\u542F\u7528\u72EC\u7ACB\u6CE8\u5165",checked:o,onChange:y=>{let p=k.tempData?.[e];p&&(p.exportConfig=p.exportConfig||{},p.exportConfig.enabled=y,Re(),Ye())}});i.appendChild(l.el),a.appendChild(i);let d=f("div",{className:`yyt-tde-global-card-body${o?"":" yyt-tde-disabled-section"}`}),c=f("div",{className:"yyt-tde-uc-grid"});c.appendChild(Cn({label:"\u6761\u76EE\u540D (entryName)",control:ve({value:r.entryName||t?.name||"",onInput:y=>mo(e,"entryName",y)})})),c.appendChild(Cn({label:"\u6761\u76EE\u7C7B\u578B (entryType)",control:Me({value:r.entryType||"constant",options:[{value:"constant",label:"constant (\u5E38\u9A7B)"},{value:"keyword",label:"keyword (\u5173\u952E\u8BCD\u89E6\u53D1)"}],onChange:y=>mo(e,"entryType",y)})})),c.appendChild(Cn({label:"\u89E6\u53D1\u5173\u952E\u8BCD (keywords)",wide:!0,control:ve({value:r.keywords||"",placeholder:"\u7528\u9017\u53F7\u6216\u6362\u884C\u5206\u9694",onInput:y=>mo(e,"keywords",y)})})),c.appendChild(Cn({label:"\u6309\u884C\u62C6\u5206 (splitByRow)",control:Me({value:r.splitByRow?"true":"false",options:[{value:"false",label:"\u5426\uFF08\u6574\u5F20\u8868\u4E00\u4E2A\u6761\u76EE\uFF09"},{value:"true",label:"\u662F\uFF08\u6BCF\u884C\u4E00\u4E2A\u6761\u76EE\uFF09"}],onChange:y=>mo(e,"splitByRow",y==="true")})})),c.appendChild(Cn({label:"\u9632\u9012\u5F52 (preventRecursion)",hint:"\u9632\u6B62\u4E16\u754C\u4E66\u6761\u76EE\u4E4B\u95F4\u4E92\u76F8\u89E6\u53D1\u6CE8\u5165\uFF08\u63A8\u8350\u4FDD\u6301\u5F00\u542F\uFF09",control:Me({value:r.preventRecursion===!1?"false":"true",options:[{value:"true",label:"\u662F"},{value:"false",label:"\u5426"}],onChange:y=>mo(e,"preventRecursion",y!=="false")})}));let u=f("div",{className:"yyt-tde-uc-cell yyt-tde-uc-cell-wide"});return u.appendChild(f("label",{text:"\u6CE8\u5165\u6A21\u677F (injectionTemplate)"})),u.appendChild(Ia({value:r.injectionTemplate||"",placeholder:"\u4F8B\uFF1A\u4EE5\u4E0B\u662F {{tableName}} \u7684\u6700\u65B0\u6570\u636E\uFF1A{{tableContent}}",onInput:y=>mo(e,"injectionTemplate",y)})),c.appendChild(u),d.appendChild(c),d.appendChild(f("div",{className:"yyt-tde-schema-heading",style:{marginTop:"12px"},text:"\u6761\u76EE\u4F4D\u7F6E (entryPlacement)"})),d.appendChild(xb(e,"entryPlacement",n)),d.appendChild(f("div",{className:"yyt-tde-schema-heading",style:{marginTop:"12px"},text:"\u989D\u5916\u7D22\u5F15\u4F4D\u7F6E (extraIndexPlacement\uFF0C\u53EF\u9009)"})),d.appendChild(xb(e,"extraIndexPlacement",s)),a.appendChild(d),a}function xb(t,e,r){let n=f("div",{className:"yyt-tde-uc-grid"}),s=["before_character_definition","after_character_definition","before_authors_note","after_authors_note"];return n.appendChild(Cn({label:"position",control:Me({value:r.position||"before_character_definition",options:s.map(o=>({value:o,label:o})),onChange:o=>Pu(t,e,"position",o)})})),n.appendChild(Cn({label:"depth",control:ve({type:"number",value:Number.isFinite(r.depth)?String(r.depth):"2",onInput:o=>Pu(t,e,"depth",Number(o)||0)})})),n.appendChild(Cn({label:"order",control:ve({type:"number",value:Number.isFinite(r.order)?String(r.order):"0",onInput:o=>Pu(t,e,"order",Number(o)||0)})})),n}function Cn({label:t,control:e,wide:r=!1,hint:n=null}){let s=f("div",{className:`yyt-tde-uc-cell${r?" yyt-tde-uc-cell-wide":""}`});return s.appendChild(f("label",{text:t})),s.appendChild(e.el),n&&s.appendChild(f("span",{className:"yyt-tde-hint",text:n})),s}function Ia({value:t="",placeholder:e="",minHeight:r="60px",onInput:n=null}={}){let s=f("textarea",{className:"yyt-textarea",attrs:{placeholder:e},style:{minHeight:r}});return s.value=t,typeof n=="function"&&s.addEventListener("input",()=>n(s.value)),s}function mo(t,e,r){let n=k.tempData?.[t];n&&(n.exportConfig=n.exportConfig||{},n.exportConfig[e]=r,Re())}function Pu(t,e,r,n){let s=k.tempData?.[t];s&&(s.exportConfig=s.exportConfig||{},s.exportConfig[e]=s.exportConfig[e]||{},s.exportConfig[e][r]=n,Re())}function uA(){let t=f("div",{className:"yyt-tde"});t.appendChild(sA());let e=f("div",{className:"yyt-tde-content"});k.mode!=="global"&&e.appendChild(oA()),e.appendChild(aA());let r=f("div",{attrs:{id:"yyt-assistant-host"},className:"yyt-assistant-dock"});return r.style.display=k._assistantOpen?"flex":"none",e.appendChild(r),t.appendChild(e),t}function Ye(){if(!k.$window)return;let t=k.$window.find(".yyt-window-body");if(!t||!t.length)return;let e=t[0],r=e.querySelector(".yyt-tde-main"),n=e.querySelector(".yyt-tde-sidebar"),s=r?r.scrollTop:0,o=n?n.scrollTop:0;e.innerHTML="",e.appendChild(uA());let a=e.querySelector(".yyt-tde-main"),i=e.querySelector(".yyt-tde-sidebar");if(a&&(a.scrollTop=s),i&&(i.scrollTop=o),pA(),k._assistantOpen){let l=e.querySelector(".yyt-tde-content"),d=l?.querySelector("#yyt-assistant-host");l&&d&&(d.style.display="flex",mb(()=>Ye(),l,()=>{k._assistantOpen=!1,Ye()}))}}function pA(){let t=k.$window?.[0]?.ownerDocument||document;if(!t)return;let e=t.getElementById("yyt-assistant-styles");e||(e=t.createElement("style"),e.id="yyt-assistant-styles",(t.head||t.documentElement).appendChild(e)),e.textContent=hb()}function yA(){try{k._assistantOpen=!k._assistantOpen,Ye()}catch(t){oe().error("toggleAssistant \u5F02\u5E38",t)}}function fA(){if(k.isDirty&&!window.confirm("\u6709\u672A\u4FDD\u5B58\u4FEE\u6539\uFF0C\u91CD\u65B0\u52A0\u8F7D\u5C06\u4E22\u5F03\uFF0C\u786E\u5B9A\uFF1F"))return;let t=k.tempData?.[0];oe().info("reload \u89E6\u53D1",{before:{tableCount:k.tempData?.length,firstName:t?.name,firstAiInit:t?.aiInstructions?.init?.slice(0,50),firstUcFreq:t?.updateConfig?.updateFrequency},targetSnapshot:{messageId:k.targetSnapshot?.sourceMessageId,isFromTemplate:k.isFromTemplate}}),Nu();let e=k.tempData?.[0];oe().info("reload \u5B8C\u6210",{after:{tableCount:k.tempData?.length,firstName:e?.name,firstAiInit:e?.aiInstructions?.init?.slice(0,50),firstUcFreq:e?.updateConfig?.updateFrequency,isFromTemplate:k.isFromTemplate}}),Ye(),oe().info("\u5DF2\u91CD\u65B0\u52A0\u8F7D",null,{toast:"success"})}async function gA(){if(!k.isDirty){oe().info("\u6CA1\u6709\u4FEE\u6539",null,{toast:!0});return}try{let t=k.targetSnapshot;if(t?.sourceMessageId||(t=await ga()),!t?.sourceMessageId){oe().error("\u65E0\u6CD5\u5B9A\u4F4D\u5F53\u524D\u6D88\u606F\uFF08\u627E\u4E0D\u5230 assistant \u6D88\u606F\uFF09",null,{toast:!0});return}let e=await io(t,{tables:pe(k.tempData)||[],meta:{source:"data-editor-manual-save"}},{skipFreshValidation:!0});oe().info("save-chat commitBoundState \u7ED3\u679C",{success:e?.success,error:e?.error,commitMessageId:e?.sourceMessageId,commitSlotRevisionKey:e?.slotRevisionKey,stateTablesLen:Array.isArray(e?.state?.tables)?e.state.tables.length:null,firstTableInState:e?.state?.tables?.[0]?.name,firstAiInitInState:e?.state?.tables?.[0]?.aiInstructions?.init?.slice(0,50)}),e?.success?(vb(),k.targetSnapshot={chatId:e.state?.chatId||t.chatId,sourceMessageId:e.sourceMessageId,sourceSwipeId:e.state?.sourceSwipeId||t.sourceSwipeId,effectiveSwipeId:t.effectiveSwipeId,slotBindingKey:e.state?.slotBindingKey||t.slotBindingKey,slotRevisionKey:e.slotRevisionKey,slotTransactionId:t.slotTransactionId,traceId:t.traceId,targetMessageIndex:e.messageIndex??t.targetMessageIndex},Array.isArray(e?.state?.tables)&&(k.tempData=pe(e.state.tables)||[],k.isFromTemplate=!1),k._afterSaveGlobalAt=0,oe().info("\u5DF2\u4FDD\u5B58\u5230 chat",null,{toast:"success"}),Ye()):oe().error(`\u4FDD\u5B58\u5931\u8D25\uFF1A${e?.error||"\u672A\u77E5"}`,null,{toast:!0})}catch(t){oe().error("\u4FDD\u5B58\u5F02\u5E38",t),oe().error(`\u4FDD\u5B58\u5F02\u5E38\uFF1A${t?.message||t}`,null,{toast:!0})}}async function mA(){if(!Array.isArray(k.tempData)||k.tempData.length===0){oe().info("\u6CA1\u6709\u53EF\u4FDD\u5B58\u7684\u6570\u636E",null,{toast:!0});return}if(window.confirm("\u4FDD\u5B58\u5230\u300C\u5168\u5C40\u6FC0\u6D3B\u6A21\u677F\u300D\u4F1A\u5F71\u54CD\u540E\u7EED\u6240\u6709 chat \u7684\u65B0\u586B\u8868\uFF08\u5DF2\u6709 slot \u6570\u636E\u4E0D\u53D7\u5F71\u54CD\uFF09\u3002\u7EE7\u7EED\uFF1F"))try{let t=bn();if(!t?.id){oe().error("\u6CA1\u6709\u53EF\u7528\u7684\u5168\u5C40\u6FC0\u6D3B\u6A21\u677F",null,{toast:!0});return}let e=(k.tempData||[]).map(n=>({id:n?.id||n?.uid,name:n?.name||"",note:n?.note||"",enabled:n?.enabled!==!1,aiInstructions:n?.aiInstructions||{},updateConfig:n?.updateConfig||{},exportConfig:n?.exportConfig||{},columns:Array.isArray(n?.columns)?pe(n.columns):[],rows:[]})),r=fn({...t,tables:e});if(r?.success){let n=typeof k._pendingMirrorTag=="string"&&k._pendingMirrorTag.trim(),s=!!k._pendingWrapperConfig;if(n||s)try{let a={...Te()};n&&(a.mirrorTag=k._pendingMirrorTag.trim()),s&&(a.wrapperConfig=k._pendingWrapperConfig),nt(a)}catch(o){oe().warn("\u4FDD\u5B58 workbench config \u5931\u8D25",o)}k._pendingMirrorTag=null,k._pendingWrapperConfig=null,vb(),Array.isArray(r?.template?.tables)&&(k.tempData=pe(r.template.tables)||[],k.isFromTemplate=!0,k._afterSaveGlobalAt=Date.now()),oe().info(`\u5DF2\u4FDD\u5B58\u5230\u5168\u5C40\u6A21\u677F\u300C${t.name}\u300D`,null,{toast:"success"}),oe().info("\u4FDD\u5B58\u5230\u5168\u5C40\u6A21\u677F\u6210\u529F",{templateId:t.id,name:t.name,tableCount:e.length}),Ye()}else oe().error(`\u4FDD\u5B58\u5931\u8D25\uFF1A${r?.error||"\u672A\u77E5"}`,null,{toast:!0})}catch(t){oe().error("\u4FDD\u5B58\u5230\u5168\u5C40\u6A21\u677F\u5F02\u5E38",t),oe().error(`\u4FDD\u5B58\u5F02\u5E38\uFF1A${t?.message||t}`,null,{toast:!0})}}async function hA(){if(!(k.isDirty&&!window.confirm("\u6709\u672A\u4FDD\u5B58\u4FEE\u6539\uFF0C\u7ACB\u5373\u586B\u8868\u4F1A\u5148\u4E22\u5F03\u8FD9\u4E9B\u4FEE\u6539\uFF0C\u786E\u5B9A\uFF1F")))try{let t=await Aa();t?.success?(oe().info("\u586B\u8868\u5B8C\u6210",null,{toast:"success"}),Nu(),Ye()):oe().error(`\u586B\u8868\u5931\u8D25\uFF1A${t?.error||"\u672A\u77E5"}`,null,{toast:!0})}catch(t){oe().error("\u7ACB\u5373\u586B\u8868\u5F02\u5E38",t),oe().error(`\u5F02\u5E38\uFF1A${t?.message||t}`,null,{toast:!0})}}function wb(t,e){if(!Array.isArray(k.tempData))return;let r=k.tempData,n=t+e;n<0||n>=r.length||([r[t],r[n]]=[r[n],r[t]],k.currentTableIndex===t?k.currentTableIndex=n:k.currentTableIndex===n&&(k.currentTableIndex=t),Re(),Ye())}function bA(t){if(!Array.isArray(k.tempData)||!k.tempData[t])return;let e=k.tempData[t];window.confirm(`\u5220\u9664\u8868\u300C${e.name||`\u8868 ${t+1}`}\u300D\uFF1F\u6B64\u64CD\u4F5C\u4E0D\u53EF\u64A4\u9500\u3002`)&&(k.tempData.splice(t,1),k.currentTableIndex>=k.tempData.length&&(k.currentTableIndex=Math.max(0,k.tempData.length-1)),Re(),Ye())}function xA(){let t=window.prompt("\u65B0\u8868\u540D\uFF1A",`\u8868 ${(k.tempData?.length||0)+1}`);if(!t||!t.trim())return;k.tempData=Array.isArray(k.tempData)?k.tempData:[];let e=new Set(k.tempData.map(s=>s?.id).filter(Boolean)),r=k.tempData.length+1,n=`sheet_${Date.now().toString(36)}_${r}`;for(;e.has(n);)r++,n=`sheet_${Date.now().toString(36)}_${r}`;k.tempData.push({id:n,name:t.trim(),enabled:!0,note:"",aiInstructions:{init:"",create:"",update:"",delete:""},updateConfig:{},exportConfig:{enabled:!1},columns:[{key:"col_1",title:"\u5B57\u6BB51",description:"",type:"text",required:!1}],rows:[]}),k.currentTableIndex=k.tempData.length-1,Re(),Ye()}function wA(t,e){if(!(!t||!Number.isFinite(e)))try{let r={chatId:k.targetSnapshot?.chatId||"",isolationKey:ue.getKey()},n=lo(r,t)||{rows:{}},s=!!(n.rows&&n.rows[e]);pl(r,t,e,!s),oe().info(s?`\u5DF2\u89E3\u9501\u884C #${e+1}`:`\u5DF2\u9501\u5B9A\u884C #${e+1}\uFF08AI \u4E0D\u4F1A\u6539\u8FD9\u884C\uFF09`,null,{toast:"success"}),oe().info("row-lock toggled",{sheetUid:t,rowIndex:e,locked:!s}),Ye()}catch(r){oe().error("row-lock \u5F02\u5E38",r),oe().error(`\u9501\u5B9A\u5931\u8D25\uFF1A${r?.message||r}`,null,{toast:!0})}}function vA(t,e,r){if(!(!t||!Number.isFinite(e)||!r))try{let n={chatId:k.targetSnapshot?.chatId||"",isolationKey:ue.getKey()},s=lo(n,t)||{cells:{}},o=`${e}::${r}`,a=!!(s.cells&&s.cells[o]);fl(n,t,e,r,!a),oe().info(a?`\u5DF2\u89E3\u9501 [${e}][${r}]`:`\u5DF2\u9501\u5B9A [${e}][${r}]`,null,{toast:"success"}),oe().info("cell-lock toggled",{sheetUid:t,rowIndex:e,colKey:r,locked:!a}),Ye()}catch(n){oe().error("cell-lock \u5F02\u5E38",n),oe().error(`\u9501\u5B9A\u5931\u8D25\uFF1A${n?.message||n}`,null,{toast:!0})}}function SA(t){if(!Number.isFinite(t)||!window.confirm(`\u786E\u5B9A\u5220\u9664\u7B2C ${t+1} \u884C\uFF1F`))return;let e=mt();e?.rows&&(e.rows.splice(t,1),Re(),Ye())}function TA(){let t=mt();t&&(Array.isArray(t.rows)||(t.rows=[]),t.rows.push({id:zr("row"),name:"",cells:{}}),Re(),Ye())}function _A(t,e){if(!t||!e){oe().error("\u5217\u9501\u5B9A\u5931\u8D25\uFF1A\u7F3A\u5C11 sheetUid \u6216 colKey",null,{toast:!0});return}try{let n={chatId:k.targetSnapshot?.chatId||"",isolationKey:ue.getKey()},s=lo(n,t)||{cols:{}},o=!!(s.cols&&s.cols[e]);yl(n,t,e,!o),oe().info(o?`\u5DF2\u89E3\u9501 ${e}`:`\u5DF2\u9501\u5B9A ${e}\uFF08AI \u4E0D\u4F1A\u6539\u8FD9\u5217\uFF09`,null,{toast:"success"}),oe().info("field-lock toggled",{sheetUid:t,colKey:e,locked:!o}),Ye()}catch(r){oe().error("field-lock \u5F02\u5E38",r),oe().error(`\u9501\u5B9A\u5931\u8D25\uFF1A${r?.message||r}`,null,{toast:!0})}}function EA(t){let e=mt();e?.columns?.[t]&&window.confirm(`\u5220\u9664\u5B57\u6BB5\u300C${e.columns[t].title||e.columns[t].key}\u300D\uFF1F\u6B64\u64CD\u4F5C\u4E0D\u4F1A\u81EA\u52A8\u6E05\u7406\u884C\u6570\u636E\u3002`)&&(e.columns.splice(t,1),Re(),Ye())}function AA(){let t=mt();if(!t)return;t.columns=Array.isArray(t.columns)?t.columns:[];let e=new Set(t.columns.map(n=>n?.key).filter(Boolean)),r=t.columns.length+1;for(;e.has(`col_${r}`);)r++;t.columns.push({key:`col_${r}`,title:`\u5B57\u6BB5${r}`,description:"",type:"text",required:!1}),Re(),Ye()}function $u(t={}){if(oe().info("openTableDataEditor \u8C03\u7528",{options:t}),nA(),!(window.jQuery||window.parent?.jQuery)){let n="jQuery \u4E0D\u53EF\u7528\uFF08window.jQuery \u548C window.parent.jQuery \u90FD\u662F undefined\uFF09";oe().error(n);try{oe().error(`\u6570\u636E\u7F16\u8F91\u5668\u6253\u5F00\u5931\u8D25\uFF1A${n}`,null,{toast:!0})}catch{}return null}try{let n=_t.getState(Iu);if(n){let s=Number(n.width),o=Number(n.height),a=Number.isFinite(s)&&s<800||Number.isFinite(o)&&o<500;(n.isMaximized||a)&&(oe().info("\u68C0\u6D4B\u5230\u4E0D\u5408\u7406 saved state\uFF0C\u91CD\u7F6E\u4E3A\u9ED8\u8BA4\u5C3A\u5BF8",{isMaximized:n.isMaximized,savedW:s,savedH:o}),_t.saveState(Iu,{width:1200,height:800,isMaximized:!1,x:void 0,y:void 0}))}}catch(n){oe().warn("saved state sanity check \u5F02\u5E38",n)}if(k.$window&&k.$window.length&&er().body.contains(k.$window[0])){if(t.focusTableUid){let s=(k.tempData||[]).findIndex(o=>(o?.uid||o?.id)===t.focusTableUid);s>=0&&(k.currentTableIndex=s)}return t.focusMode&&["data","schema","global"].includes(t.focusMode)&&(k.mode=t.focusMode),t.openAssistant&&!k._assistantOpen&&(k._assistantOpen=!0),Ye(),k.$window}if(Nu(),t.focusTableUid){let s=(k.tempData||[]).findIndex(o=>(o?.uid||o?.id)===t.focusTableUid);s>=0&&(k.currentTableIndex=s)}t.focusMode&&["data","schema","global"].includes(t.focusMode)&&(k.mode=t.focusMode),t.openAssistant&&(k._assistantOpen=!0);let r;try{r=pu({id:Iu,title:"\u586B\u8868\u6570\u636E\u7F16\u8F91\u5668",content:'<div class="yyt-tde-placeholder"></div>',width:1200,height:800,modal:!1,resizable:!0,maximizable:!0,rememberState:!0,onReady:n=>{k.$window=n,Ye()},onClose:()=>{k.isDirty&&oe().warn("\u6570\u636E\u7F16\u8F91\u5668\u5173\u95ED\u65F6\u6709\u672A\u4FDD\u5B58\u4FEE\u6539"),k.$window=null,k._assistantOpen=!1,k._refs={saveBtn:null,saveGlobalBtn:null,dirtyBadge:null}}})}catch(n){oe().error("createWindow \u629B\u9519",n);try{oe().error(`\u521B\u5EFA\u7A97\u53E3\u5931\u8D25\uFF1A${n?.message||n}`,null,{toast:!0})}catch{}return null}return r}var Iu,Ru,k,rA,Mu,Sb=O(()=>{yu();ut();J();cs();ma();bl();js();nr();Fe();jr();gl();Wt();bb();Iu="yyt-table-data-editor";k={$window:null,mode:"data",tempData:null,currentTableIndex:-1,isDirty:!1,isFromTemplate:!1,_pendingMirrorTag:null,_pendingWrapperConfig:null,targetSnapshot:null,_afterSaveGlobalAt:0,_assistantOpen:!1,_refs:{saveBtn:null,saveGlobalBtn:null,dirtyBadge:null}};rA=`
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
`,Mu=!1});function K(){return Lu||(Lu=N.createScope("TableWorkbenchView")),Lu}async function CA(){try{let t=await ta();if(!t)return Kt.kind=null,Kt.lastError="Provider \u4E0D\u53EF\u7528",Kt;if(Kt.kind=t.kind,typeof t.query=="function"){let e=await t.query({statement:"SELECT COUNT(*) as c FROM table_sheets"}),r=await t.query({statement:"SELECT COUNT(*) as c FROM table_rows"});Kt.sheetCount=e?.rows?.[0]?.c??0,Kt.rowCount=r?.rows?.[0]?.c??0}Kt.lastError=null,Kt.lastRefreshAt=Date.now(),K().info("Provider stats \u5DF2\u5237\u65B0",{...Kt})}catch(t){Kt.lastError=t?.message||String(t),K().warn("Provider stats \u5237\u65B0\u5931\u8D25",t)}return Kt}function kA(){if(!Kt.kind){let t=qs();t?.kind&&(Kt.kind=t.kind)}return Kt}function xe(t){return String(t??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function _b(t){if(!Number.isFinite(t)||t<=0)return"\u4ECE\u672A";let e=Date.now()-t;if(e<6e4)return`${Math.floor(e/1e3)} \u79D2\u524D`;if(e<36e5)return`${Math.floor(e/6e4)} \u5206\u949F\u524D`;if(e<864e5)return`${Math.floor(e/36e5)} \u5C0F\u65F6\u524D`;try{return new Date(t).toLocaleString()}catch{return"\u672A\u77E5"}}function Ab(t){let{config:e,activeTemplate:r,isolationKey:n,tablesPreview:s,templateArchives:o=[],providerStats:a={}}=t,i=e?.runtime||{},l=i.lastStatus==="success"?"\u2713 \u4E0A\u6B21\u6210\u529F":i.lastStatus==="failed"?"\u2717 \u4E0A\u6B21\u5931\u8D25":i.lastStatus==="running"?"\u8FD0\u884C\u4E2D":"\u5F85\u547D",d=i.lastStatus==="success"?"success":i.lastStatus==="failed"?"error":"muted",c=e?.automation?.enabled?"\u81EA\u52A8":"\u624B\u52A8",u=e?.apiPreset||"\u8DDF\u968F\u4E3B API",y=e?.bypassPresetId?"\u5DF2\u7ED1\u5B9A":"\u65E0",p=Array.isArray(o)?o.length:0;return`
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
          ${r?.mode&&r.mode!==rt.INHERIT_GLOBAL?`<button class="yyt-tww-btn yyt-tww-btn-small" data-action="reset-template-scope" title="\u672C chat \u5F53\u524D\u662F\u300C${r.mode===rt.CHAT_OVERRIDE?"chat \u4E13\u5C5E":"\u94FE\u63A5\u9884\u8BBE"}\u300D\u6A21\u5F0F\uFF0C\u70B9\u51FB\u6062\u590D\u4E3A\u300C\u7EE7\u627F\u5168\u5C40\u300D"><i class="fa-solid fa-rotate-right"></i> \u6062\u590D\u7EE7\u627F</button>`:""}
          <button class="yyt-tww-btn yyt-tww-btn-small yyt-tww-btn-danger" data-action="reset-chat-data" title="\u6E05\u7A7A\u5F53\u524D\u804A\u5929\u6240\u6709\u697C\u5C42\u7684\u8868\u683C\u6570\u636E\uFF0C\u8BA9\u6A21\u677F\u5207\u6362\u540E\u4ECE\u5934\u5F00\u59CB"><i class="fa-solid fa-trash-can"></i> \u6E05\u7A7A chat \u6570\u636E</button>
        </div>
      </div>
      <div class="yyt-tww-hero-desc">\u4ECE\u5BF9\u8BDD\u5185\u5BB9\u63D0\u53D6\u7ED3\u6784\u5316\u6570\u636E\uFF0C\u81EA\u52A8\u7EF4\u62A4\u8868\u683C\u72B6\u6001\u3002</div>
      <div class="yyt-tww-hero-chips">
        <span class="yyt-tww-chip mode">\u6A21\u5F0F ${xe(c)}</span>
        <span class="yyt-tww-chip preset">\u6A21\u677F: ${xe(r?.template?.name||"\u9ED8\u8BA4")}</span>
        ${(()=>{let g=r?.mode;if(g===rt.CHAT_OVERRIDE)return'<span class="yyt-tww-chip preset" title="\u672C chat \u7528\u4E86\u72EC\u7ACB\u6A21\u677F\u526F\u672C\uFF08\u4FEE\u6539\u4E0D\u5F71\u54CD\u5168\u5C40\uFF09\u3002\u53EF\u5728\u300C\u91CD\u7F6E\u8303\u56F4\u300D\u6309\u94AE\u65C1\u7684\u83DC\u5355\u6062\u590D\u7EE7\u627F\u5168\u5C40\u3002">\u4F5C\u7528\u57DF: chat \u4E13\u5C5E</span>';if(g===rt.PRESET_LINK){let m=r?.source?.presetName||"";return`<span class="yyt-tww-chip preset" title="\u672C chat \u94FE\u63A5\u5230\u5168\u5C40\u9884\u8BBE ${xe(m)}\uFF0C\u8DDF\u968F\u8BE5\u9884\u8BBE\u53D8\u5316\u3002">\u4F5C\u7528\u57DF: \u94FE\u63A5 ${xe(m)}</span>`}return'<span class="yyt-tww-chip preset" title="\u672C chat \u8DDF\u968F\u5168\u5C40\u6FC0\u6D3B\u6A21\u677F\u3002">\u4F5C\u7528\u57DF: \u7EE7\u627F\u5168\u5C40</span>'})()}
        <span class="yyt-tww-chip preset">API: ${xe(u)}</span>
        <span class="yyt-tww-chip preset">\u6307\u4EE4: ${xe(y)}</span>
        ${(()=>{let g=e?.runScope||e?.scope?.mode||"enabled";return g==="enabled"?'<span class="yyt-tww-chip preset">\u8303\u56F4: \u6240\u6709\u542F\u7528\u8868</span>':`<button class="yyt-tww-chip status-failed" data-action="reset-run-scope" title="\u5F53\u524D AI \u53EA\u4F1A\u586B\u90E8\u5206\u8868\uFF0C\u70B9\u51FB\u91CD\u7F6E\u4E3A\u300C\u6240\u6709\u542F\u7528\u8868\u300D" style="border:0;cursor:pointer;">\u8303\u56F4: ${xe(g==="current"?"\u26A0\uFE0F \u4EC5\u5F53\u524D\u8868":"\u4EC5\u9009\u4E2D\u8868")} \u2014 \u70B9\u6B64\u91CD\u7F6E</button>`})()}
        ${(()=>{let g=a?.kind,m=a?.sheetCount,h=a?.rowCount,b=m!==null&&h!==null?` \u2014 ${m} \u8868 ${h} \u884C`:"";return g==="authority"?`<span class="yyt-tww-chip status-success" title="\u6570\u636E\u6301\u4E45\u5316\u5230\u771F\u540E\u7AEF SQLite\uFF08ST-Delegation-of-authority \u63D0\u4F9B\uFF09">\u2713 \u771F\u540E\u7AEF SQLite${xe(b)}</span>`:g==="fallback"?`<span class="yyt-tww-chip preset" title="\u6570\u636E\u6301\u4E45\u5316\u5230 localStorage\uFF08\u672A\u88C5 ST-Delegation-of-authority\uFF09">\u2139 Fallback (localStorage)${xe(b)}</span>`:'<span class="yyt-tww-chip" title="Provider \u8FD8\u672A\u521D\u59CB\u5316\uFF08\u61D2\u52A0\u8F7D\uFF09">Provider \u52A0\u8F7D\u4E2D...</span>'})()}
        ${n?`<span class="yyt-tww-chip">\u9694\u79BB: ${xe(n)}</span>`:""}
        <span class="yyt-tww-chip status-${d==="success"?"success":d==="error"?"failed":""}">${xe(l)}</span>
        <span class="yyt-tww-chip yyt-tww-chip-toggle" data-action="toggle-chips" title="\u5C55\u5F00/\u6536\u8D77">\u25B8</span>
      </div>
    </div>

    <!-- v1.0.209 #3 \u4FEE\u590D\uFF1Ahero \u63D0\u5230\u6EDA\u52A8\u533A\u5916\u9762\uFF08\u540C .yyt-tww \u76F4\u63A5\u5B50\uFF09\uFF0C\u4E0B\u9762\u6240\u6709\u5185\u5BB9\u5305\u8FDB .yyt-tww-scroll \u5355\u4E00\u6EDA\u52A8\u5BB9\u5668\u3002
         hero \u7269\u7406\u4E0A\u5C31\u4E0D\u5728\u6EDA\u52A8\u533A\u5185 \u2192 \u4E0D\u4F1A\u88AB\u6EDA\u8D70\u3002JS \u76D1\u542C scrollTop > 0 \u5207\u6362 compact \u6001\u538B\u7F29 hero\u3002 -->
    <div class="yyt-tww-scroll">

    <!-- \u6A21\u677F\u5F52\u6863\u5217\u8868\uFF08\u9ED8\u8BA4\u9690\u85CF\uFF0Chero \u6309\u94AE toggle\uFF09 -->
    <div class="yyt-tww-archives" data-archives-panel style="display:none;">
      ${PA(o)}
    </div>

    <!-- Runtime stats -->
    <div class="yyt-tww-stat-row">
      <div class="yyt-tww-stat">
        <span class="yyt-tww-stat-label">\u72B6\u6001</span>
        <span class="yyt-tww-stat-value ${d}">${xe(l)}</span>
      </div>
      <div class="yyt-tww-stat">
        <span class="yyt-tww-stat-label">\u6700\u8FD1\u8FD0\u884C</span>
        <span class="yyt-tww-stat-value muted">${xe(_b(i.lastRunAt))}</span>
      </div>
      <div class="yyt-tww-stat">
        <span class="yyt-tww-stat-label">\u6210\u529F</span>
        <span class="yyt-tww-stat-value success">${xe(i.successCount||0)}</span>
      </div>
      <div class="yyt-tww-stat">
        <span class="yyt-tww-stat-label">\u5931\u8D25</span>
        <span class="yyt-tww-stat-value ${i.errorCount?"error":"muted"}">${xe(i.errorCount||0)}</span>
      </div>
    </div>

    <!-- Body sections -->
    <div class="yyt-tww-body">

      <section class="yyt-tww-section" data-section="bindings">
        <div class="yyt-tww-section-heading">
          <span class="yyt-tww-section-icon"><i class="fa-solid fa-link"></i></span>
          \u7ED1\u5B9A
        </div>
        ${IA(t)}
      </section>

      <section class="yyt-tww-section" data-section="behavior">
        <div class="yyt-tww-section-heading">
          <span class="yyt-tww-section-icon"><i class="fa-solid fa-arrows-rotate"></i></span>
          \u586B\u8868\u884C\u4E3A
        </div>
        ${RA(t)}
      </section>

      <section class="yyt-tww-section" data-section="overview">
        <div class="yyt-tww-section-heading">
          <span class="yyt-tww-section-icon"><i class="fa-solid fa-table-cells"></i></span>
          \u8868\u683C\u6982\u89C8
          <span class="yyt-tww-section-action">
            <button class="yyt-tww-btn yyt-tww-btn-small" data-action="open-editor"><i class="fa-solid fa-table-cells"></i> \u6253\u5F00\u6570\u636E\u7F16\u8F91\u5668</button>
          </span>
        </div>
        ${NA(t.tablesPreview)}
      </section>

    </div>

    </div>
  </div>
  `}function IA(t){let{config:e,allTemplates:r,apiPresets:n,bypassPresets:s,regexPresets:o,worldbookPresets:a,activeTemplate:i}=t,l=r.map(w=>`<option value="${xe(w.id)}" ${i?.source?.templateId===w.id?"selected":""}>${xe(w.name)}</option>`).join(""),d=e?.autoUpdateEnabled===!0?"auto":"manual",c=e?.apiPreset||"",u='<option value="">\u2014\u2014 \u8DDF\u968F\u4E3B API \u2014\u2014</option>'+n.map(w=>`<option value="${xe(w.name)}" ${w.name===c?"selected":""}>${xe(w.name)}</option>`).join(""),y=e?.bypass?.presetId||"",p='<option value="">\u2014\u2014 \u65E0 \u2014\u2014</option>'+s.map(w=>`<option value="${xe(w.id)}" ${w.id===y?"selected":""}>${xe(w.name)}${w.isDefault?" [\u9ED8\u8BA4]":""}</option>`).join(""),g=e?.extraction?.regexPresetId||"",m='<option value="">\u2014\u2014 \u65E0\uFF08\u4E0D\u8FDB\u884C\u63D0\u53D6\uFF09 \u2014\u2014</option>'+o.map(w=>`<option value="${xe(w.id)}" ${w.id===g?"selected":""}>${xe(w.name)}</option>`).join(""),h=e?.worldbooks?.presetId||"",b='<option value="">\u2014\u2014 \u65E0 \u2014\u2014</option>'+a.map(w=>`<option value="${xe(w.id)}" ${w.id===h?"selected":""}>${xe(w.name)}</option>`).join(""),x=e?.runScope||"enabled";return`
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
        <option value="current" ${x==="current"?"selected":""}>\u4EC5\u5F53\u524D\u6D3B\u52A8\u8868</option>
        <option value="selected" ${x==="selected"?"selected":""}>\u5F53\u524D\u9009\u4E2D\u8868</option>
        <option value="enabled" ${x==="enabled"?"selected":""}>\u6240\u6709\u542F\u7528\u7684\u8868</option>
      </select>
      <div class="yyt-tww-row-meta"></div>
    </div>
  `}function RA(t){let{config:e}=t,r=e?.fillMode||"incremental",n=Number(e?.contextDepth)||3,s=e?.worldbookSync?.enabled===!0,o=e?.mirrorToMessage===!0;return`
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
      <input class="yyt-input yyt-tww-ctrl" type="number" min="1" max="50" data-binding="contextDepth" value="${xe(n)}">
      <div class="yyt-tww-row-meta"></div>
    </div>

    <div class="yyt-tww-toggle-row">
      <div class="yyt-tww-toggle-info">
        <div class="yyt-tww-toggle-title">\u540C\u6B65\u5230\u4E16\u754C\u4E66</div>
        <div class="yyt-tww-toggle-desc">\u628A\u8868\u683C\u5E8F\u5217\u5316\u4E3A\u4E16\u754C\u4E66\u6761\u76EE\u8BA9\u4E3B\u6A21\u578B\u5728\u751F\u6210\u65F6\u770B\u5230\u3002</div>
      </div>
      <div class="yyt-tww-toggle ${s?"on":""}" data-toggle="worldbookSync"></div>
    </div>

    ${MA(t)}

    <div class="yyt-tww-toggle-row">
      <div class="yyt-tww-toggle-info">
        <div class="yyt-tww-toggle-title">\u5199\u56DE\u6B63\u6587\u955C\u50CF</div>
        <div class="yyt-tww-toggle-desc">\u5728\u52A9\u624B\u6D88\u606F\u672B\u5C3E\u955C\u50CF\u5199\u5165 markdown \u65B9\u4FBF\u624B\u52A8\u67E5\u9605\u3002</div>
      </div>
      <div class="yyt-tww-toggle ${o?"on":""}" data-toggle="mirrorToMessage"></div>
    </div>
  `}function MA(t){let e=t?.config?.worldbookSync||{};if(!(e.enabled===!0))return"";let n=e.injectionMode||"character_card",s=String(e.targetBook||""),o=t?.chatOpen===!0,a=n==="target_book"?`
    <div class="yyt-tww-sub-row">
      <label>\u76EE\u6807\u4E16\u754C\u4E66</label>
      <button class="yyt-btn yyt-btn-small" data-action="pick-target-book">${s?xe(s):"\u9009\u62E9\u4E16\u754C\u4E66..."}</button>
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
  `}function PA(t=[]){return!Array.isArray(t)||t.length===0?'<div class="yyt-tww-empty">\u5F53\u524D chat \xD7 isolationKey \u6682\u65E0\u5F52\u6863\uFF08\u4EC5\u5728\u5207\u6362\u6A21\u677F\u65F6\u81EA\u52A8\u5F52\u6863\u5F53\u524D\u72B6\u6001\uFF09</div>':`
    <div class="yyt-tww-archives-header">\u6A21\u677F\u5F52\u6863\u5386\u53F2 (${t.length}/8)</div>
    <div class="yyt-tww-archives-list">
      ${t.map((e,r)=>{let n=e?.state||{},s=n.mode||"unknown",o=e?.archivedAt?new Date(e.archivedAt).toLocaleString():"\u672A\u77E5\u65F6\u95F4",a=n.presetName||"",i=s==="preset_link"?`\u9884\u8BBE\u94FE\u63A5: ${xe(a)}`:s==="chat_override"?"chat \u7EA7\u8986\u76D6\u6A21\u677F":s==="inherit_global"?"\u7EE7\u627F\u5168\u5C40":xe(s);return`
          <div class="yyt-tww-archive-item" data-archive-index="${r}">
            <div class="yyt-tww-archive-meta">
              <span class="yyt-tww-archive-time">${xe(o)}</span>
              <span class="yyt-tww-archive-mode">${i}</span>
            </div>
            <button class="yyt-tww-btn yyt-tww-btn-small" data-action="restore-archive" data-archive-index="${r}" title="\u6062\u590D\u6B64\u5F52\u6863\uFF08\u6062\u590D\u524D\u81EA\u52A8\u5F52\u6863\u5F53\u524D\u72B6\u6001\uFF09">\u6062\u590D</button>
          </div>
        `}).join("")}
    </div>
  `}function NA(t){return!Array.isArray(t)||t.length===0?'<div class="yyt-tww-empty">\u5F53\u524D slot \u6682\u65E0\u8868\u6570\u636E\u3002\u8BF7\u5148"\u7ACB\u5373\u586B\u8868"\u6216\u5728\u6570\u636E\u7F16\u8F91\u5668\u4E2D\u521D\u59CB\u5316\u3002</div>':`
    <div class="yyt-tww-table-grid">
      ${t.map((e,r)=>`
        <div class="yyt-tww-table-card${e.enabled===!1?" yyt-tww-table-card-disabled":""}" data-table-index="${r}" data-table-id="${xe(e.id||"")}">
          <div class="yyt-tww-table-card-header">
            <label class="yyt-tww-table-card-toggle" title="${e.enabled===!1?"\u5DF2\u7981\u7528 \u2014 AI \u4E0D\u4F1A\u586B\u8FD9\u5F20\u8868":"\u5DF2\u542F\u7528 \u2014 AI \u4F1A\u586B\u8FD9\u5F20\u8868"}">
              <input type="checkbox" data-action="toggle-table-enabled" data-table-id="${xe(e.id||"")}" ${e.enabled===!1?"":"checked"} />
              <span class="yyt-tww-table-card-toggle-slider"></span>
            </label>
            <span class="yyt-tww-table-card-name">${xe(e.name||`\u8868 ${r+1}`)}</span>
            <i class="fa-solid fa-arrow-right yyt-tww-table-card-arrow"></i>
          </div>
          <div class="yyt-tww-table-card-stats">
            <span><b>${xe(e.rowCount||0)}</b> \u884C</span>
            <span><b>${xe(e.colCount||0)}</b> \u5B57\u6BB5</span>
            ${e.updatedHint?`<span>${xe(e.updatedHint)}</span>`:""}
          </div>
        </div>
      `).join("")}
    </div>
  `}function Cb(){let t=(()=>{try{return Te()}catch{return{}}})(),e=(()=>{try{return xn()||[]}catch{return[]}})(),r=(()=>{try{return Js({})}catch{return null}})(),n=(()=>{try{return Qr()||[]}catch{return[]}})(),s=(()=>{try{return oa()||[]}catch{return[]}})(),o=(()=>{try{return Le.listPresets()||[]}catch{return[]}})(),a=(()=>{try{return wt.listPresets()||[]}catch{return[]}})(),i=(()=>{try{return ue.getKey()}catch{return""}})(),l=$A(),d=LA(),c=OA(),u=null,y=0;try{let b=ls(null);Array.isArray(b?.tableState?.tables)&&b.tableState.tables.length>0&&(u=b.tableState.tables,y=Number(b.tableState.updatedAt)||0)}catch{}let p=u||r?.template?.tables||t?.tables||[],g=t?.tableEnabledOverrides&&typeof t.tableEnabledOverrides=="object"?t.tableEnabledOverrides:{},m=p.map(b=>{let x=b?.id||"",w=x&&Object.prototype.hasOwnProperty.call(g,x)?g[x]:void 0;return{id:x,name:b?.name||"",enabled:w!==void 0?w:b?.enabled!==!1,rowCount:Array.isArray(b?.rows)?b.rows.length:0,colCount:Array.isArray(b?.columns)?b.columns.length:0,updatedHint:u&&y>0?_b(y):""}}),h=(()=>{try{return Hg()||[]}catch{return[]}})();return{config:t,activeTemplate:r,allTemplates:e,apiPresets:n,bypassPresets:s,regexPresets:o,worldbookPresets:a,availableWorldbooks:l,boundLorebook:d,chatOpen:c,isolationKey:i,tablesPreview:m,templateArchives:h,providerStats:kA()}}function $A(){try{let t=globalThis.window||globalThis,e=t?.TavernHelper||t?.parent?.TavernHelper;if(!e)return[];if(typeof e.getLorebooks=="function"){let r=e.getLorebooks();if(Array.isArray(r))return r}if(typeof e.getLorebookList=="function"){let r=e.getLorebookList();if(Array.isArray(r))return r}}catch(t){K().warn("loadAvailableWorldbooks \u5931\u8D25",t)}return[]}function LA(){try{let t=globalThis.window||globalThis,e=t?.TavernHelper||t?.parent?.TavernHelper;if(e){if(typeof e.getCurrentCharPrimaryLorebook=="function"){let n=e.getCurrentCharPrimaryLorebook();if(typeof n=="string"&&n)return n}if(typeof e.getCharLorebooks=="function")try{let n=e.getCharLorebooks();if(n?.primary)return String(n.primary)}catch{}if(typeof e.getChatLorebook=="function")try{let n=e.getChatLorebook();if(typeof n=="string"&&n)return n}catch{}}let r=t?.SillyTavern?.getContext?.()||t?.parent?.SillyTavern?.getContext?.();if(r){let n=r.characters?.[r.characterId],s=n?.data?.character_book?.name||n?.data?.extensions?.world||n?.world;if(typeof s=="string"&&s)return s}}catch(t){K().warn("loadCharacterBoundLorebook \u5931\u8D25",t)}return""}function OA(){try{let t=globalThis.window||globalThis,e=t?.TavernHelper||t?.parent?.TavernHelper;if(e&&typeof e.getCurrentChatId=="function"){let n=e.getCurrentChatId();return!!(n&&String(n).trim()&&String(n).trim()!=="default_chat")}let r=t?.SillyTavern?.getContext?.()||t?.parent?.SillyTavern?.getContext?.();if(r){let n=r.chat;if(Array.isArray(n)&&n.length>0||r.chatId)return!0}}catch{}return!1}function Ou(t,e){let r=window.jQuery||window.parent?.jQuery;if(!r||!t||!t.on){K().warn("bindWorkbenchEvents: jQuery \u6216 $container \u4E0D\u53EF\u7528");return}t.off(".tww"),Tb||(Tb=!0,CA().then(()=>{typeof e=="function"&&e()}).catch(()=>{})),t.on("click.tww",'[data-action="run-now"]',async()=>{try{let s=await Aa();s?.success?K().info("\u586B\u8868\u5B8C\u6210",null,{toast:"success"}):K().error(`\u586B\u8868\u5931\u8D25\uFF1A${s?.error||"\u672A\u77E5"}`,null,{toast:!0}),typeof e=="function"&&e()}catch(s){K().error("\u7ACB\u5373\u586B\u8868\u5F02\u5E38",s),K().error(`\u5F02\u5E38\uFF1A${s?.message||s}`,null,{toast:!0})}}),t.on("click.tww",'[data-action="run-clear"]',async()=>{if(window.confirm("\u91CD\u586B\u4F1A\u6E05\u7A7A\u5F53\u524D\u6D88\u606F\u697C\u5C42\u7684\u8868\u683C\u6570\u636E\u5E76\u91CD\u65B0\u751F\u6210\uFF0C\u786E\u5B9A\uFF1F"))try{let s=await Aa(null,{clearBeforeUpdate:!0});s?.success?K().info("\u91CD\u586B\u5B8C\u6210",null,{toast:"success"}):K().error(`\u91CD\u586B\u5931\u8D25\uFF1A${s?.error||"\u672A\u77E5"}`,null,{toast:!0}),typeof e=="function"&&e()}catch(s){K().error("\u91CD\u586B\u5F02\u5E38",s),K().error(`\u5F02\u5E38\uFF1A${s?.message||s}`,null,{toast:!0})}}),t.on("click.tww",'[data-action="reset-run-scope"]',()=>{try{let s=Te();nt({...s,runScope:"enabled",scope:{...s.scope||{},mode:"enabled",activeTableId:"",selectedTableIds:[]}}),K().info("\u5DF2\u91CD\u7F6E\u8303\u56F4\u4E3A\u300C\u6240\u6709\u542F\u7528\u8868\u300D",null,{toast:"success"}),K().info("\u7528\u6237\u91CD\u7F6E runScope \u4E3A enabled"),typeof e=="function"&&e()}catch(s){K().error("\u91CD\u7F6E\u8303\u56F4\u5F02\u5E38",s),K().error(`\u91CD\u7F6E\u5931\u8D25\uFF1A${s?.message||s}`,null,{toast:!0})}}),t.on("click.tww",'[data-action="toggle-chips"]',function(){let s=t.find(".yyt-tww-hero-chips")[0];if(!s)return;let o=s.classList.toggle("yyt-tww-hero-chips-expanded");this.textContent=o?"\u25BE":"\u25B8"}),t.on("click.tww",'[data-action="export-templates"]',()=>{try{let s=Li(),o=JSON.stringify(s,null,2),a=new Blob([o],{type:"application/json"}),i=URL.createObjectURL(a),l=document.createElement("a");l.href=i,l.download=`youyou-table-templates-${Date.now()}.json`,document.body.appendChild(l),l.click(),document.body.removeChild(l),URL.revokeObjectURL(i);let d=Array.isArray(s?.templates)?s.templates.length:0;K().info(`\u5DF2\u5BFC\u51FA ${d} \u4E2A\u6A21\u677F\u5230\u4E0B\u8F7D\u6587\u4EF6\u5939`,null,{toast:"success"}),K().info("export-templates \u5B8C\u6210",{count:d})}catch(s){K().error("export-templates \u5F02\u5E38",s),K().error(`\u5BFC\u51FA\u5931\u8D25\uFF1A${s?.message||s}`,null,{toast:!0})}}),t.on("click.tww",'[data-action="reset-template-scope"]',()=>{if(window.confirm("\u6062\u590D\u672C chat \u7684\u6A21\u677F\u4F5C\u7528\u57DF\u5230\u300C\u7EE7\u627F\u5168\u5C40\u300D\uFF1F\u5F53\u524D\u72B6\u6001\u4F1A\u5148\u81EA\u52A8\u5F52\u6863\uFF0C\u53EF\u5728\u300C\u5F52\u6863\u300D\u4E2D\u6062\u590D\u3002"))try{let s=Wg({archive:!0});s?.success?(K().info("\u5DF2\u6062\u590D\u4E3A\u7EE7\u627F\u5168\u5C40",null,{toast:"success"}),K().info("reset-template-scope \u5B8C\u6210"),typeof e=="function"&&e()):K().error(`\u6062\u590D\u5931\u8D25\uFF1A${s?.error||"\u672A\u77E5"}`,null,{toast:!0})}catch(s){K().error("reset-template-scope \u5F02\u5E38",s),K().error(`\u5F02\u5E38\uFF1A${s?.message||s}`,null,{toast:!0})}}),t.on("click.tww",'[data-action="chat-template-override"]',()=>{if(window.confirm(`\u628A\u5F53\u524D\u6FC0\u6D3B\u6A21\u677F\u6DF1\u62F7\u8D1D\u4E3A\u672C chat \u7684\u72EC\u7ACB\u526F\u672C\uFF1F
\u4E4B\u540E\u4FEE\u6539\u4E0D\u5F71\u54CD\u5168\u5C40\u6A21\u677F\u3002\u64CD\u4F5C\u524D\u81EA\u52A8\u5F52\u6863\u5F53\u524D\u72B6\u6001\u3002`))try{let s=bn();if(!s){K().error("\u6CA1\u6709\u53EF\u7528\u7684\u5168\u5C40\u6FC0\u6D3B\u6A21\u677F",null,{toast:!0});return}let o=Ug(s,{source:"workbench-chat-override"});o?.success?(K().info(`\u5DF2\u8BBE\u4E3A chat \u4E13\u5C5E\uFF1A${s.name}`,null,{toast:"success"}),K().info("chat-template-override \u5B8C\u6210",{templateId:s.id,name:s.name}),typeof e=="function"&&e()):K().error(`\u8BBE\u7F6E\u5931\u8D25\uFF1A${o?.error||"\u672A\u77E5"}`,null,{toast:!0})}catch(s){K().error("chat-template-override \u5F02\u5E38",s),K().error(`\u5F02\u5E38\uFF1A${s?.message||s}`,null,{toast:!0})}}),t.on("click.tww",'[data-action="chat-template-link"]',()=>{let s=(()=>{try{return xn()||[]}catch{return[]}})();if(s.length===0){K().info("\u6CA1\u6709\u53EF\u7528\u7684\u6A21\u677F",null,{toast:!0});return}let o=s.map((d,c)=>`${c+1}. ${d.name}`).join(`
`),a=window.prompt(`\u94FE\u63A5\u5230\u54EA\u4E2A\u5168\u5C40\u9884\u8BBE\uFF1F\u8F93\u5165\u7F16\u53F7\uFF081-${s.length}\uFF09\uFF1A

${o}`,"1");if(!a)return;let i=parseInt(a,10)-1;if(!Number.isFinite(i)||i<0||i>=s.length){K().error("\u7F16\u53F7\u65E0\u6548",null,{toast:!0});return}let l=s[i];try{let d=Fg(l.name,{source:"workbench-link-preset"});d?.success?(K().info(`\u5DF2\u94FE\u63A5\u5230\u9884\u8BBE\uFF1A${l.name}`,null,{toast:"success"}),K().info("chat-template-link \u5B8C\u6210",{presetName:l.name}),typeof e=="function"&&e()):K().error(`\u94FE\u63A5\u5931\u8D25\uFF1A${d?.error||"\u672A\u77E5"}`,null,{toast:!0})}catch(d){K().error("chat-template-link \u5F02\u5E38",d),K().error(`\u5F02\u5E38\uFF1A${d?.message||d}`,null,{toast:!0})}}),t.on("click.tww",'[data-action="reset-chat-data"]',async()=>{if(window.confirm("\u5C06\u6E05\u7A7A\u5F53\u524D\u804A\u5929\u6240\u6709\u697C\u5C42\u7684\u8868\u683C\u6570\u636E\uFF08\u4E0D\u5F71\u54CD\u6A21\u677F/\u914D\u7F6E\uFF09\u3002\u4E0B\u6B21\u586B\u8868\u4F1A\u6309\u5F53\u524D\u6FC0\u6D3B\u6A21\u677F\u4ECE\u5934\u5F00\u59CB\u3002\u786E\u5B9A\uFF1F"))try{let s=await eh();s?.success?(K().info(`\u5DF2\u6E05\u7A7A ${s.touched||0} \u6761\u6D88\u606F\u7684\u8868\u683C\u6570\u636E`,null,{toast:"success"}),K().info("\u6E05\u7A7A chat \u6570\u636E\u5B8C\u6210",s)):K().error("\u6E05\u7A7A\u5931\u8D25",null,{toast:!0}),typeof e=="function"&&e()}catch(s){K().error("\u6E05\u7A7A chat \u6570\u636E\u5F02\u5E38",s),K().error(`\u5F02\u5E38\uFF1A${s?.message||s}`,null,{toast:!0})}}),t.on("click.tww",'[data-action="open-editor"]',s=>{s.preventDefault(),K().info("open-editor button clicked");try{let o=$u();K().info("openTableDataEditor \u8C03\u7528\u5B8C\u6210",{hasReturn:!!o})}catch(o){K().error("\u6253\u5F00\u6570\u636E\u7F16\u8F91\u5668\u5F02\u5E38",o),K().error(`\u6253\u5F00\u5931\u8D25\uFF1A${o?.message||o}`,null,{toast:!0})}}),t.on("click.tww","[data-table-index]",function(s){if(r(s.target).closest('[data-action="toggle-table-enabled"]').length>0||r(s.target).is("label, label *"))return;s.preventDefault();let o=Number(r(this).attr("data-table-index"));if(!(!Number.isFinite(o)||o<0))try{let i=ls(null)?.tableState?.tables?.[o],l=$u({focusTableUid:i?.uid||i?.id||""})}catch(a){K().error("\u6253\u5F00\u6570\u636E\u7F16\u8F91\u5668\u5F02\u5E38",a),K().error(`\u6253\u5F00\u5931\u8D25\uFF1A${a?.message||a}`,null,{toast:!0})}}),t.on("click.tww",'[data-action="toggle-archives"]',function(s){s.preventDefault();let o=t.find("[data-archives-panel]").first();o.length&&(o.css("display")==="none"?o.css("display","block"):o.css("display","none"))}),t.on("click.tww",'[data-action="restore-archive"]',async function(s){s.stopPropagation();let o=Number(r(this).attr("data-archive-index"));if(!(!Number.isFinite(o)||o<0)&&window.confirm(`\u6062\u590D\u5F52\u6863 #${o}\uFF1F\u6062\u590D\u524D\u4F1A\u81EA\u52A8\u5F52\u6863\u5F53\u524D\u72B6\u6001\uFF0C\u53EF\u518D\u6B21\u6062\u590D\u56DE\u6765\u3002`))try{let a=qg(o);a?.success?(K().info("\u5DF2\u6062\u590D\u5F52\u6863",null,{toast:"success"}),K().info("restoreChatTemplateArchive \u6210\u529F",{index:o,scopeState:a.scopeState})):K().error(`\u6062\u590D\u5931\u8D25\uFF1A${a?.error||"\u672A\u77E5"}`,null,{toast:!0}),typeof e=="function"&&e()}catch(a){K().error("\u6062\u590D\u5F52\u6863\u5F02\u5E38",a),K().error(`\u5F02\u5E38\uFF1A${a?.message||a}`,null,{toast:!0})}}),t.on("change.tww",'[data-action="toggle-table-enabled"]',function(s){s.stopPropagation();let o=r(this).attr("data-table-id"),a=r(this).is(":checked");if(o)try{let i=Te(),l={...i.tableEnabledOverrides||{}};l[o]=a,nt({...i,tableEnabledOverrides:l}),K().info(a?`\u5DF2\u542F\u7528 ${o}`:`\u5DF2\u7981\u7528 ${o}`,null,{toast:"success"}),K().info("toggle \u5355\u8868\u6FC0\u6D3B",{tableId:o,enabled:a}),typeof e=="function"&&e()}catch(i){K().error("toggle \u5355\u8868\u6FC0\u6D3B\u5F02\u5E38",i),K().error(`\u5207\u6362\u5931\u8D25\uFF1A${i?.message||i}`,null,{toast:!0})}}),t.on("change.tww",'[data-binding="template"]',function(){let s=r(this).val();try{kd(s);let o=Te();nt({...o,activeTemplate:s}),K().info("\u6A21\u677F\u5DF2\u5207\u6362",null,{toast:"success"}),typeof e=="function"&&e()}catch(o){K().error("\u5207\u6362\u6A21\u677F\u5F02\u5E38",o),K().error(`\u5207\u6362\u5931\u8D25\uFF1A${o?.message||o}`,null,{toast:!0})}}),t.on("change.tww",'[data-binding="triggerMode"]',function(){let s=r(this).val();try{let o=Te();nt({...o,autoUpdateEnabled:s==="auto"}),K().info(s==="auto"?"\u5DF2\u5207\u6362\u4E3A\u81EA\u52A8\u6A21\u5F0F":"\u5DF2\u5207\u6362\u4E3A\u624B\u52A8\u6A21\u5F0F",null,{toast:"success"}),typeof e=="function"&&e()}catch(o){K().error("\u5207\u6362\u89E6\u53D1\u6A21\u5F0F\u5F02\u5E38",o),K().error(`\u5207\u6362\u5931\u8D25\uFF1A${o?.message||o}`,null,{toast:!0})}});let n=[{sel:'[data-binding="apiPreset"]',key:"apiPreset"},{sel:'[data-binding="runScope"]',key:"runScope"},{sel:'[data-binding="fillMode"]',key:"fillMode"}];for(let{sel:s,key:o}of n)t.on("change.tww",s,function(){let a=r(this).val();try{let i=Te(),l={...i,[o]:a};o==="runScope"&&(l.scope={...i.scope||{},mode:a,...a==="enabled"?{activeTableId:"",selectedTableIds:[]}:{}}),nt(l),K().info("\u5DF2\u4FDD\u5B58",null,{toast:"success"})}catch(i){K().error(`\u4FDD\u5B58 ${o} \u5F02\u5E38`,i),K().error(`\u4FDD\u5B58\u5931\u8D25\uFF1A${i?.message||i}`,null,{toast:!0})}});t.on("change.tww",'[data-binding="bypassPreset"]',function(){let s=r(this).val();try{let o=Te();nt({...o,bypass:{...o.bypass||{},presetId:s,enabled:!!s}}),K().info("Ai \u6307\u4EE4\u9884\u8BBE\u5DF2\u4FDD\u5B58",null,{toast:"success"})}catch(o){K().error("\u4FDD\u5B58 bypass \u5F02\u5E38",o),K().error(`\u4FDD\u5B58\u5931\u8D25\uFF1A${o?.message||o}`,null,{toast:!0})}}),t.on("change.tww",'[data-binding="regexPreset"]',function(){let s=r(this).val();try{let o=Te();nt({...o,extraction:{...o.extraction||{},regexPresetId:s}}),K().info("\u6B63\u5219\u9884\u8BBE\u5DF2\u66F4\u65B0",null,{toast:"success"})}catch(o){K().error("\u4FDD\u5B58 regexPreset \u5F02\u5E38",o),K().error(`\u4FDD\u5B58\u5931\u8D25\uFF1A${o?.message||o}`,null,{toast:!0})}}),t.on("change.tww",'[data-binding="worldbookPreset"]',function(){let s=r(this).val();try{let o=Te();nt({...o,worldbooks:{...o.worldbooks||{},presetId:s}}),K().info("\u4E16\u754C\u4E66\u9884\u8BBE\u5DF2\u66F4\u65B0",null,{toast:"success"})}catch(o){K().error("\u4FDD\u5B58 worldbookPreset \u5F02\u5E38",o),K().error(`\u4FDD\u5B58\u5931\u8D25\uFF1A${o?.message||o}`,null,{toast:!0})}}),t.on("change.tww",'[data-binding="contextDepth"]',function(){let s=Math.max(1,parseInt(r(this).val(),10)||3);try{let o=Te();nt({...o,contextDepth:s}),K().info("\u5DF2\u4FDD\u5B58",null,{toast:"success"})}catch(o){K().error("\u4FDD\u5B58 contextDepth \u5F02\u5E38",o),K().error(`\u4FDD\u5B58\u5931\u8D25\uFF1A${o?.message||o}`,null,{toast:!0})}}),t.on("click.tww",'[data-toggle="worldbookSync"]',function(){let s=r(this),o=s.hasClass("on"),a=!o;s.toggleClass("on",a);try{let i=Te();nt({...i,worldbookSync:{...i.worldbookSync||{},enabled:a}}),K().info(a?"\u5DF2\u542F\u7528\u4E16\u754C\u4E66\u540C\u6B65":"\u5DF2\u505C\u7528\u4E16\u754C\u4E66\u540C\u6B65",null,{toast:"success"}),typeof e=="function"&&e()}catch(i){s.toggleClass("on",o),K().error("toggle worldbookSync \u5F02\u5E38",i),K().error(`\u4FDD\u5B58\u5931\u8D25\uFF1A${i?.message||i}`,null,{toast:!0})}}),t.on("change.tww",'[data-binding="worldbookInjectionMode"]',function(){let s=r(this).val();try{let o=Te();nt({...o,worldbookSync:{...o.worldbookSync||{},injectionMode:s}}),K().info("\u5DF2\u5207\u6362\u6CE8\u5165\u6A21\u5F0F",null,{toast:"success"}),typeof e=="function"&&e()}catch(o){K().error("\u4FDD\u5B58 injectionMode \u5F02\u5E38",o)}}),t.on("click.tww",'[data-action="pick-target-book"]',async function(){let s=si();if(!s.length)try{s=await Do()}catch{}if(!s.length){await Ee.confirm({title:"\u6CA1\u6709\u53EF\u7528\u7684\u4E16\u754C\u4E66",message:"\u5BBF\u4E3B\u672A\u63D0\u4F9B\u53EF\u7528\u4E16\u754C\u4E66\u3002",confirmText:"\u786E\u5B9A"});return}let a=Te()?.worldbookSync?.targetBook||"",i=document.createElement("div");i.style.cssText="display:flex;flex-direction:column;gap:8px;";let l=document.createElement("input");l.className="yyt-input",l.placeholder=`\u641C\u7D22 ${s.length} \u672C\u4E16\u754C\u4E66\u2026`,l.style.cssText="padding:7px 10px;font-size:12px;",i.appendChild(l);let d=document.createElement("div");d.style.cssText="display:flex;flex-direction:column;gap:4px;max-height:320px;overflow-y:auto;";let c=a,u=[];for(let p of s){let g=document.createElement("label");g.style.cssText="display:flex;align-items:center;gap:8px;padding:8px 10px;cursor:pointer;border-radius:6px;background:var(--yyt-surface-2,rgba(255,255,255,0.03));font-size:12px;";let m=document.createElement("input");m.type="radio",m.name="targetBookPick",m.value=p,p===a&&(m.checked=!0),m.addEventListener("change",()=>{c=p}),g.appendChild(m);let h=document.createElement("span");h.textContent=p,h.style.color="var(--yyt-text)",g.appendChild(h),d.appendChild(g),u.push({el:g,search:p.toLowerCase()})}i.appendChild(d),l.addEventListener("input",()=>{let p=l.value.trim().toLowerCase();for(let g of u)g.el.style.display=!p||g.search.includes(p)?"":"none"});let y=await Ee.custom({title:`\u9009\u62E9\u76EE\u6807\u4E16\u754C\u4E66\uFF08${s.length} \u672C\uFF09`,width:"480px",body:i,buttons:[{label:"\u53D6\u6D88",variant:"ghost",onClick:p=>p(null)},{label:"\u9009\u62E9",variant:"primary",onClick:p=>p(c)}]}).result;if(y&&typeof y=="string")try{let p=Te();nt({...p,worldbookSync:{...p.worldbookSync||{},targetBook:y}}),K().info(`\u76EE\u6807\u4E16\u754C\u4E66\u5DF2\u8BBE\u4E3A: ${y}`,null,{toast:"success"}),typeof e=="function"&&e()}catch(p){K().error("\u4FDD\u5B58 targetBook \u5F02\u5E38",p)}}),t.on("click.tww",'[data-action="clear-worldbook-entries"]',async function(){try{let s=Te(),o=await ph(s);if(o.success)K().info(`\u5DF2\u6E05\u9664 ${o.cleaned||0} \u4E2A\u4E16\u754C\u4E66\u6761\u76EE`,null,{toast:"success"});else{let a={no_target_book:"\u672A\u9009\u62E9\u76EE\u6807\u4E16\u754C\u4E66",no_character_lorebook:"\u5F53\u524D\u89D2\u8272\u5361\u672A\u7ED1\u5B9A\u4E16\u754C\u4E66",chat_worldbook_unavailable:"\u804A\u5929\u4E16\u754C\u4E66\u4E0D\u53EF\u7528"};K().warn(`\u6E05\u9664\u5931\u8D25: ${a[o.error]||o.error}`,null,{toast:!0})}}catch(s){K().error("\u6E05\u9664\u4E16\u754C\u4E66\u6761\u76EE\u5F02\u5E38",s),K().error(`\u6E05\u9664\u5931\u8D25: ${s?.message||s}`,null,{toast:!0})}}),t.on("click.tww",'[data-toggle="mirrorToMessage"]',function(){let s=r(this),o=s.hasClass("on"),a=!o;s.toggleClass("on",a);try{let i=Te();nt({...i,mirrorToMessage:a}),K().info(a?"\u5DF2\u542F\u7528\u6B63\u6587\u955C\u50CF":"\u5DF2\u505C\u7528\u6B63\u6587\u955C\u50CF",null,{toast:"success"})}catch(i){s.toggleClass("on",o),K().error("toggle mirrorToMessage \u5F02\u5E38",i),K().error(`\u4FDD\u5B58\u5931\u8D25\uFF1A${i?.message||i}`,null,{toast:!0})}}),t.on("click.tww","[data-link]",function(s){s.preventDefault(),K().info("\u8DF3\u8F6C\u5230\u9884\u8BBE\u7BA1\u7406\u9762\u677F\uFF08\u5F85\u63A5\u5165\uFF09",null,{toast:!0})})}var Lu,Kt,Tb,Eb,kb=O(()=>{J();Ws();nr();js();Fe();jr();bl();cs();Sb();Fe();tu();Bo();Po();ws();Qs();ln();Ss();Kt={kind:null,sheetCount:null,rowCount:null,lastError:null,lastRefreshAt:0},Tb=!1;Eb=`
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
`});var Pb={};ge(Pb,{TableWorkbenchPanel:()=>Mb,default:()=>BA});function DA(){if(!Du)try{let t=window.parent&&window.parent.document?window.parent.document:document,e=t.head||t.documentElement;if(e.querySelector("#yyt-tww-styles")){Du=!0;return}let r=t.createElement("style");r.id="yyt-tww-styles",r.textContent=Eb,e.appendChild(r),Du=!0}catch(t){Ra.warn("\u6CE8\u5165\u5DE5\u4F5C\u53F0\u6837\u5F0F\u5931\u8D25",t)}}function Ib(t){let e=t?.[0];if(!e)return;let r=e.closest(".yyt-popup-body");if(!r){Ra.warn("pinWorkbenchHeight: \u627E\u4E0D\u5230 .yyt-popup-body \u7956\u5148");return}let n=()=>{let o=e.querySelector(".yyt-tww");if(!o)return;let a=r.getBoundingClientRect(),i=e.getBoundingClientRect(),l=a.bottom-i.top-8;l>100?o.style.height=`${l}px`:Ra.warn(`pinWorkbenchHeight: \u8BA1\u7B97\u9AD8\u5EA6\u5F02\u5E38 h=${l}, popupBottom=${a.bottom}, tabTop=${i.top}`)};if(n(),requestAnimationFrame(()=>requestAnimationFrame(n)),typeof ResizeObserver>"u"||e.__yytwwROTarget===r&&e.__yytwwRO)return;if(e.__yytwwRO)try{e.__yytwwRO.disconnect()}catch{}let s=new ResizeObserver(()=>n());s.observe(r),e.__yytwwRO=s,e.__yytwwROTarget=r}function Rb(t){let e=t?.[0];if(!e)return;let r=e.querySelector(".yyt-tww-hero"),n=e.querySelector(".yyt-tww-scroll");if(!r||!n)return;let s=()=>{n.scrollTop>0?r.classList.add("yyt-tww-hero--compact"):r.classList.remove("yyt-tww-hero--compact")};s(),n.addEventListener("scroll",s,{passive:!0})}var Ra,Du,Mb,BA,Nb=O(()=>{ut();J();kb();Ra=N.createScope("TableWorkbenchPanel"),Du=!1;Mb={id:"tableWorkbenchPanel",render(){DA();try{let t=Cb();return Ab(t)}catch(t){return Ra.error("\u6E32\u67D3\u5DE5\u4F5C\u53F0 UI \u5F02\u5E38",t),`<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5DE5\u4F5C\u53F0\u6E32\u67D3\u5931\u8D25\uFF1A${t?.message||t}</span></div>`}},bindEvents(t){if(!ce()||!ze(t))return;let r=this,n=()=>{try{let s=t[0]?.querySelector(".yyt-tww-scroll"),o=s?s.scrollTop:0;if(t.html(r.render()),Ou(t,n),Ib(t),Rb(t),o>0){let a=t[0]?.querySelector(".yyt-tww-scroll");a&&(a.scrollTop=o)}}catch(s){Ra.error("refresh \u5F02\u5E38",s)}};Ou(t,n),Ib(t),Rb(t)},renderTo(t){!ce()||!ze(t)||(t.html(this.render()),this.bindEvents(t))}},BA=Mb});var Lb={};ge(Lb,{LoggerPanel:()=>$b,default:()=>FA});function jA(t){switch(t){case Se.DEBUG:return"yyt-log-debug";case Se.INFO:return"yyt-log-info";case Se.WARN:return"yyt-log-warn";case Se.ERROR:return"yyt-log-error";default:return""}}function UA(t){let e=new Date(t),r=n=>String(n).padStart(2,"0");return`${r(e.getHours())}:${r(e.getMinutes())}:${r(e.getSeconds())}.${String(e.getMilliseconds()).padStart(3,"0")}`}var zA,KA,$b,FA,Ob=O(()=>{J();ct();ut();zA="yyt-logger-panel",KA=[{level:null,label:"\u5168\u90E8",icon:"fa-list"},{level:Se.DEBUG,label:"DEBUG",icon:"fa-bug"},{level:Se.INFO,label:"INFO",icon:"fa-circle-info"},{level:Se.WARN,label:"WARN",icon:"fa-triangle-exclamation"},{level:Se.ERROR,label:"ERROR",icon:"fa-circle-exclamation"}];$b={id:"loggerPanel",render(){let t=N.getStats();return`
      <div class="yyt-logger-panel" id="${zA}">
        <div class="yyt-logger-toolbar">
          <div class="yyt-logger-filter-btns" data-yyt-log-filter-group>
            ${KA.map((e,r)=>`<button class="yyt-log-filter-btn ${r===0?"yyt-active":""}" data-level="${e.level??""}">
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
    `},bindEvents(t){let e=ce();if(!e||!ze(t))return;let r=this,n=null,s=!1,o=[],a=t.find("[data-yyt-log-list]"),i=t.find("[data-yyt-log-search]"),l=t.find("[data-yyt-log-autoscroll]"),d=t.find("[data-yyt-log-pause]");function c(p){if(!p.length){a.html('<div class="yyt-logger-empty">\u6682\u65E0\u5339\u914D\u7684\u65E5\u5FD7\u8BB0\u5F55</div>');return}a.html(p.map(g=>`
        <div class="yyt-log-entry ${jA(g.level)}" data-log-id="${g.id}">
          <span class="yyt-log-time">${UA(g.timestamp)}</span>
          <span class="yyt-log-level">${N.levelLabel(g.level)}</span>
          <span class="yyt-log-scope">${me(g.scope)}</span>
          <span class="yyt-log-msg">${me(g.message)}</span>
          ${g.data!==void 0?`<span class="yyt-log-data">${me(typeof g.data=="object"?JSON.stringify(g.data):String(g.data))}</span>`:""}
        </div>
      `).join(""))}function u(){let p=i.val()?.trim()||"",{entries:g}=N.getEntries({level:n,search:p||void 0,limit:500});c(g),l.is(":checked")&&requestAnimationFrame(()=>{a[0].scrollTop=a[0].scrollHeight})}function y(){if(s||!o.length)return;let p=o;o=[],u()}this._onLogEntry=p=>{if(s||n!==null&&p.level<n)return;let g=i.val()?.trim().toLowerCase()||"";if(g){let m=p.scope.toLowerCase().includes(g),h=p.message.toLowerCase().includes(g);if(!m&&!h)return}o.push(p),o.length>=50?y():this._flushTimer||(this._flushTimer=setTimeout(()=>{this._flushTimer=null,y(),r._updateStats(t)},250))},G.on("logger:entry",this._onLogEntry),t.on("click.yytLogger","[data-yyt-log-filter-group] .yyt-log-filter-btn",p=>{t.find("[data-yyt-log-filter-group] .yyt-log-filter-btn").removeClass("yyt-active"),e(p.currentTarget).addClass("yyt-active");let g=e(p.currentTarget).data("level");n=g===""?null:g,u(),r._updateStats(t)}),i.on("input.yytLogger",()=>{u()}),t.on("click.yytLogger","[data-yyt-log-pause]",()=>{s=!s,d.toggleClass("yyt-active",s),d.html(s?'<i class="fa-solid fa-play"></i> \u7EE7\u7EED':'<i class="fa-solid fa-pause"></i> \u6682\u505C'),s||(o=[],u(),r._updateStats(t))}),t.on("click.yytLogger","[data-yyt-log-clear]",()=>{N.clear(),a.html('<div class="yyt-logger-empty">\u65E5\u5FD7\u5DF2\u6E05\u9664</div>'),r._updateStats(t)}),t.on("click.yytLogger","[data-yyt-log-export]",()=>{let{entries:p}=N.getEntries({limit:1e4}),g=JSON.stringify(p.map(x=>({time:new Date(x.timestamp).toISOString(),level:N.levelLabel(x.level),scope:x.scope,message:x.message,data:x.data})),null,2),m=new Blob([g],{type:"application/json"}),h=URL.createObjectURL(m),b=document.createElement("a");b.href=h,b.download=`yyt-logs-${new Date().toISOString().replace(/[:.]/g,"-")}.json`,b.click(),URL.revokeObjectURL(h)}),u()},_updateStats(t){if(!ce()||!ze(t))return;let r=N.getStats(),n=t.find(".yyt-logger-stats");n.length&&n.html(`
      <span class="yyt-logger-stat">\u5171 <strong>${r.total}</strong> \u6761</span>
      ${["ERROR","WARN","INFO","DEBUG"].map(s=>`<span class="yyt-logger-stat yyt-log-${s.toLowerCase()}">${s}: <strong>${r.byLevel[s]||0}</strong></span>`).join("")}
    `)},destroy(t){let e=ce();this._onLogEntry&&(G.off("logger:entry",this._onLogEntry),this._onLogEntry=null),this._flushTimer&&(clearTimeout(this._flushTimer),this._flushTimer=null),!(!e||!ze(t))&&t.off(".yytLogger")},getStyles(){return`
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
    `}},FA=$b});var Hb={};ge(Hb,{MAIN_TAB_RENDERERS:()=>Qu,PanelState:()=>Fl,SCRIPT_ID:()=>Ln,SUB_TAB_RENDERERS:()=>Zu,UIManager:()=>Mo,bindDialogEvents:()=>So,closeActiveCustomSelectDropdown:()=>mr,closeCustomSelectDropdown:()=>Gl,createDialogHtml:()=>vo,default:()=>HA,destroyEnhancedCustomSelects:()=>Ut,downloadJson:()=>To,enhanceNativeSelects:()=>br,escapeHtml:()=>me,fillFormWithConfig:()=>Rw,getAllStyles:()=>Wb,getFormApiConfig:()=>Iw,getJQuery:()=>ce,getTargetDocument:()=>er,initUI:()=>Kb,isContainerValid:()=>ze,normalizeCustomSelectOptions:()=>Op,openCustomSelectDropdown:()=>$p,readFileContent:()=>_o,registerComponents:()=>Bu,renderApiPanel:()=>zu,renderBypassPanel:()=>Yu,renderCustomSelectControl:()=>Dp,renderEscapeTransformToolPanel:()=>qu,renderLoggerPanel:()=>Xu,renderMainTab:()=>Ub,renderPunctuationTransformToolPanel:()=>Gu,renderRegexPanel:()=>ju,renderSettingsPanel:()=>Vu,renderStatusBlockPanel:()=>Wu,renderSubTabComponent:()=>Fb,renderSummaryToolPanel:()=>Fu,renderTableTemplatePanel:()=>Uu,renderTableWorkbenchPanel:()=>Ju,renderToolPanel:()=>jb,renderWorldbookPresetPanel:()=>Ku,renderYouyouReviewPanel:()=>Hu,repositionActiveCustomSelectDropdown:()=>Hl,resetJQueryCache:()=>vw,showConfirm:()=>Lr,showPrompt:()=>Mw,showToast:()=>Wa,showTopNotice:()=>ql,toggleCustomSelectDropdown:()=>Lp,uiManager:()=>lr,withButtonLoading:()=>Pw});async function Bb(t){if(!Al.has(t)){let e=Db[t];if(typeof e!="function")throw new Error(`unknown_panel:${t}`);Al.set(t,e().then(r=>{let n=r?.[t]||r?.default;if(!n?.id)throw new Error(`invalid_panel:${t}`);return n}).catch(r=>{throw Al.delete(t),r}))}return Al.get(t)}function zb(t,e=null){let r=e?.message?`\uFF1A${me(e.message)}`:"";return`<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>${me(t)}${r}</span></div>`}async function Bu(){let t=await Promise.allSettled(Object.keys(Db).map(async r=>{let n=await Bb(r);return lr.register(n.id,n),n.id})),e=t.filter(r=>r.status==="rejected");e.length&&e.forEach(r=>Ma.error("\u7EC4\u4EF6\u6CE8\u518C\u5931\u8D25",r.reason)),Ma.log(`\u7EC4\u4EF6\u6CE8\u518C\u5B8C\u6210\uFF0C\u6210\u529F ${t.length-e.length} \u4E2A\uFF0C\u5931\u8D25 ${e.length} \u4E2A`)}async function Kb(t={}){let{autoInjectStyles:e=!0,targetDocument:r,...n}=t;lr.init(n),await Bu(),e&&lr.injectStyles(r),Ma.log("\u6A21\u5757\u521D\u59CB\u5316\u5B8C\u6210")}async function WA(t){let e=await Bb(t);return lr.getComponent(e.id)||lr.register(e.id,e),e}async function jt(t,e,r={}){let n=await WA(t);lr.render(n.id,e,r)}function zu(t){return jt("ApiPresetPanel",t)}function Ku(t){return jt("WorldbookPresetPanel",t)}function ju(t){return jt("RegexExtractPanel",t)}function Uu(t){return jt("TableTemplatePanel",t)}function jb(t){return jt("ToolManagePanel",t)}function Fu(t){return jt("SummaryToolPanel",t)}function Wu(t){return jt("StatusBlockPanel",t)}function Hu(t){return jt("YouyouReviewPanel",t)}function qu(t){return jt("EscapeTransformToolPanel",t)}function Gu(t){return jt("PunctuationTransformToolPanel",t)}function Yu(t){return jt("BypassPanel",t)}function Vu(t){return jt("SettingsPanel",t)}function Ju(t){return jt("TableWorkbenchPanel",t)}function Xu(t){return jt("LoggerPanel",t)}async function Ub(t,e){let r=Qu[t];if(!r)return!1;try{await r.render(e)}catch(n){Ma.error(r.failMessage,n),e.html(zb(r.failMessage,n))}return!0}async function Fb(t,e){let r=Zu[t];if(!r)return null;try{await r.render(e)}catch(n){Ma.error(r.failMessage,n),e.html(zb(r.failMessage,n))}return t}function Wb(){return lr.getAllStyles()}var Ma,Db,Al,Qu,Zu,HA,qb=O(()=>{J();oc();ut();ut();oc();Ma=N.createScope("UI"),Db=Object.freeze({ApiPresetPanel:()=>Promise.resolve().then(()=>(py(),uy)),WorldbookPresetPanel:()=>Promise.resolve().then(()=>(Iy(),ky)),RegexExtractPanel:()=>Promise.resolve().then(()=>(Of(),Lf)),TableTemplatePanel:()=>Promise.resolve().then(()=>(Jg(),Vg)),ToolManagePanel:()=>Promise.resolve().then(()=>(Zg(),Qg)),SummaryToolPanel:()=>Promise.resolve().then(()=>(Sm(),vm)),StatusBlockPanel:()=>Promise.resolve().then(()=>(Em(),_m)),YouyouReviewPanel:()=>Promise.resolve().then(()=>(km(),Cm)),EscapeTransformToolPanel:()=>Promise.resolve().then(()=>(Pm(),Mm)),PunctuationTransformToolPanel:()=>Promise.resolve().then(()=>(Lm(),$m)),BypassPanel:()=>Promise.resolve().then(()=>(Bm(),Dm)),SettingsPanel:()=>Promise.resolve().then(()=>(qd(),Hd)),TableWorkbenchPanel:()=>Promise.resolve().then(()=>(Nb(),Pb)),LoggerPanel:()=>Promise.resolve().then(()=>(Ob(),Lb))}),Al=new Map;Qu=Object.freeze({tableWorkbench:{render:t=>Ju(t),failMessage:"\u586B\u8868\u5DE5\u4F5C\u53F0\u52A0\u8F7D\u5931\u8D25"},bypass:{render:t=>Yu(t),failMessage:"Ai\u6307\u4EE4\u9884\u8BBE\u9762\u677F\u52A0\u8F7D\u5931\u8D25"},settings:{render:t=>Vu(t),failMessage:"\u8BBE\u7F6E\u9762\u677F\u52A0\u8F7D\u5931\u8D25"},logger:{render:t=>Xu(t),failMessage:"\u65E5\u5FD7\u9762\u677F\u52A0\u8F7D\u5931\u8D25"}}),Zu=Object.freeze({ApiPresetPanel:{render:t=>zu(t),failMessage:"API \u9884\u8BBE\u9762\u677F\u52A0\u8F7D\u5931\u8D25"},RegexExtractPanel:{render:t=>ju(t),failMessage:"\u6B63\u5219\u63D0\u53D6\u9762\u677F\u52A0\u8F7D\u5931\u8D25"},WorldbookPresetPanel:{render:t=>Ku(t),failMessage:"\u4E16\u754C\u4E66\u9884\u8BBE\u9762\u677F\u52A0\u8F7D\u5931\u8D25"},TableTemplatePanel:{render:t=>Uu(t),failMessage:"\u8868\u683C\u6A21\u677F\u9762\u677F\u52A0\u8F7D\u5931\u8D25"},SummaryToolPanel:{render:t=>Fu(t),failMessage:"\u6458\u8981\u5DE5\u5177\u52A0\u8F7D\u5931\u8D25"},StatusBlockPanel:{render:t=>Wu(t),failMessage:"\u4E3B\u89D2\u72B6\u6001\u680F\u52A0\u8F7D\u5931\u8D25"},YouyouReviewPanel:{render:t=>Hu(t),failMessage:"\u5C0F\u5E7D\u70B9\u8BC4\u52A0\u8F7D\u5931\u8D25"},EscapeTransformToolPanel:{render:t=>qu(t),failMessage:"\u8F6C\u4E49\u5904\u7406\u5DE5\u5177\u52A0\u8F7D\u5931\u8D25"},PunctuationTransformToolPanel:{render:t=>Gu(t),failMessage:"\u4E2D\u6587\u6807\u70B9\u66FF\u6362\u5DE5\u5177\u52A0\u8F7D\u5931\u8D25"}});HA={uiManager:lr,registerComponents:Bu,initUI:Kb,renderApiPanel:zu,renderWorldbookPresetPanel:Ku,renderRegexPanel:ju,renderTableTemplatePanel:Uu,renderToolPanel:jb,renderSummaryToolPanel:Fu,renderStatusBlockPanel:Wu,renderYouyouReviewPanel:Hu,renderEscapeTransformToolPanel:qu,renderPunctuationTransformToolPanel:Gu,renderBypassPanel:Yu,renderSettingsPanel:Vu,renderTableWorkbenchPanel:Ju,renderLoggerPanel:Xu,MAIN_TAB_RENDERERS:Qu,SUB_TAB_RENDERERS:Zu,renderMainTab:Ub,renderSubTabComponent:Fb,getAllStyles:Wb}});var Qb={};ge(Qb,{TX_PHASE:()=>ar,ToolAutomationService:()=>kl,Transaction:()=>Cl,default:()=>JA,toolAutomationService:()=>Xb});function _e(t){return t==null?"":String(t).trim()}function Gb(t){let e=_s(t);return _e(e?.chatId??e?.chat_id??t?.chatId??t?.chat_id??t?.chat_filename??t?.this_chid??"chat_default")||"chat_default"}function ep(t){let e=_s(t);return Array.isArray(e?.chat)?e.chat:Array.isArray(t?.chat)?t.chat:[]}function Jb(t){if(!t||t?.is_user===!0||t?.is_system===!0)return!1;let e=String(t?.role||"").trim().toLowerCase();return e==="user"||e==="system"?!1:e==="assistant"||e==="ai"||!e}function qA(t,e){let r=_e(e);if(!r)return null;let n=ep(t);for(let s=n.length-1;s>=0;s-=1){let o=n[s];if([o?.messageId,o?.message_id,o?.id,o?.mid,o?.mesid,o?.chat_index,s].map(i=>_e(i)).includes(r))return o||null}return null}function Yb(t){let e=ep(t);if(!Array.isArray(e)||e.length===0)return null;let r=e.length-1,n=e[r]||null;if(!Jb(n))return null;let s=_e(n?.messageId??n?.message_id??n?.id??n?.mid??n?.mesid??n?.chat_index??r);return s?{messageId:s,swipeId:_e(n?.swipeId??n?.swipe_id??n?.swipe??n?.swipeIndex),message:n}:null}function VA(){let t=Date.now().toString(36),e=Math.random().toString(36).slice(2,8);return`tx_${t}_${e}`}var ot,Vb,GA,YA,ar,Cl,kl,Xb,JA,Zb=O(()=>{Zs();J();zo();Ar();la();Pd();Wn();bl();nr();ot=N.createScope("ToolAutomation");Vb=1e4,GA=15e3,YA=800;ar=Object.freeze({RECEIVED:"received",CONFIRMED:"confirmed",CONTEXT_BUILT:"context_built",REQUEST_STARTED:"request_started",REQUEST_FINISHED:"request_finished",WRITEBACK_STARTED:"writeback_started",WRITEBACK_COMMITTED:"writeback_committed",REFRESH_CONFIRMED:"refresh_confirmed",SKIPPED:"skipped",FAILED:"failed"}),Cl=class{constructor({chatId:e,messageId:r,swipeId:n,sourceEvent:s,generationKey:o}){this.traceId=VA(),this.chatId=e||"",this.messageId=r||"",this.swipeId=n||"",this.sourceEvent=s||"",this.generationKey=o||"",this.phase=ar.RECEIVED,this.createdAt=Date.now(),this.updatedAt=Date.now(),this.verdict="",this.error=null,this.toolResults=[],this.writebackState=null,this.refreshState=null}transition(e,r={}){return this.phase=e,this.updatedAt=Date.now(),Object.assign(this,r),this}toSnapshot(){return{...this}}},kl=class{constructor(){this._stopCallbacks=[],this._pendingTimers=new Map,this._recentlyProcessedSlots=new Map,this._ownWriteMessageIds=new Map,this._slotQueues=new Map,this._activeTransactions=new Map,this._isProcessing=!1,this._currentChatId="",this.debugMode=!1,this._transactionHistory=[],this._maxHistorySize=30,this._hostBindingStatus={initialized:!1,initAttempts:0,lastInitAt:0,lastInitResult:"idle",source:"unavailable",hasEventSource:!1,hasEventTypes:!1,eventBindings:[],retryScheduled:!1,retryDelayMs:0,lastError:""},this._messageReceivedThrottleUntil=0}setDebugMode(e){this.debugMode=e===!0}init(e={}){this.stop(),this._hostBindingStatus.lastInitAt=Date.now(),this._hostBindingStatus.initAttempts=(this._hostBindingStatus.initAttempts||0)+1;let r=wr();this._currentChatId=Gb(r);let n=(s,...o)=>{let a=wr(),{messageId:i,swipeId:l}=this._extractIdentitiesFromArgs(o);if(ot.debug(`\u6536\u5230\u5BBF\u4E3B\u4E8B\u4EF6 "${s}"`,{messageId:i,swipeId:l,argCount:o.length}),s===Ze.MESSAGE_RECEIVED){let m=Date.now();if(m<this._messageReceivedThrottleUntil){ot.debug(`MESSAGE_RECEIVED \u5728\u8282\u6D41\u7A97\u53E3\u5185\uFF0C\u8DF3\u8FC7\uFF08\u5269\u4F59 ${this._messageReceivedThrottleUntil-m}ms\uFF09`);return}this._messageReceivedThrottleUntil=m+this._getSettleMs()+5e3}let d=null,c=i,u=l;if(c&&(d=qA(a,c)),!d){let m=Yb(a);m?.messageId&&(d=m.message,c=m.messageId,u=m.swipeId||u)}if(!c||!d){ot.debug(`\u4E8B\u4EF6 "${s}" \u65E0 assistant \u76EE\u6807\uFF0C\u8DF3\u8FC7`);return}if(!Jb(d)){ot.debug(`\u4E8B\u4EF6 "${s}" \u547D\u4E2D\u975E assistant \u6D88\u606F\uFF0C\u8DF3\u8FC7`,{messageId:c});return}let y=String(d.content||d.mes||"").trim();if(!y||y.length<5){ot.debug(`\u4E8B\u4EF6 "${s}" \u6D88\u606F\u8FC7\u77ED\uFF08${y.length} \u5B57\u7B26\uFF09\uFF0C\u8DF3\u8FC7`);return}if(this._isProcessing){ot.debug(`\u4E8B\u4EF6 "${s}" \u6B63\u5728\u5904\u7406\u4E2D\uFF0C\u8DF3\u8FC7`);return}if(this._isOwnWrite(c)){ot.debug(`\u4E8B\u4EF6 "${s}" \u547D\u4E2D own-write \u9ED1\u540D\u5355\uFF0C\u8DF3\u8FC7`,{messageId:c});return}let p=_e(d?.swipeId??d?.swipe_id??d?.swipe??d?.swipeIndex);p&&(u=p);let g=`${c}::${u}`;if(this._isRecentlyProcessed(g)){ot.debug(`\u4E8B\u4EF6 "${s}" slot \u5DF2\u8FD1\u671F\u5904\u7406\u8FC7\uFF0C\u8DF3\u8FC7`,{slotKey:g});return}this._scheduleMessageProcessing(c,u,{settleMs:this._getSettleMs(),sourceEvent:s}),ot.info(`\u4E8B\u4EF6 "${s}" \u901A\u8FC7\u6240\u6709\u5B88\u536B\uFF0C\u5DF2\u8C03\u5EA6\u5904\u7406`,{targetMessageId:c,targetSwipeId:u,throttleUntil:this._messageReceivedThrottleUntil,isProcessing:this._isProcessing})};return this._stopCallbacks.push(Nt.subscribe(Ze.MESSAGE_SENT,()=>{ot.debug("MESSAGE_SENT \u2192 \u6E05\u7406\u8C03\u5EA6\u961F\u5217"),this._pendingTimers.forEach(s=>clearTimeout(s)),this._pendingTimers.clear()})),this._stopCallbacks.push(Nt.subscribe(Ze.MESSAGE_RECEIVED,(...s)=>{n(Ze.MESSAGE_RECEIVED,...s)})),this._stopCallbacks.push(Nt.subscribe(Ze.GENERATION_STOPPED,()=>{ot.info("GENERATION_STOPPED \u2192 \u53D6\u6D88\u6240\u6709\u6D3B\u8DC3\u4E8B\u52A1"),this._cancelActiveTransactions("generation_stopped"),this._pendingTimers.forEach(s=>clearTimeout(s)),this._pendingTimers.clear(),this._isProcessing=!1})),this._stopCallbacks.push(Nt.subscribe(Ze.CHAT_CHANGED,()=>{this._resetForChatChange()})),this._stopCallbacks.push(Nt.subscribe(Ze.MESSAGE_DELETED,s=>{this._clearMessageState(_e(s))})),this._refreshHostBindingStatus(),this._seedKnownSlots(),ot.info("\u81EA\u52A8\u5316\u670D\u52A1\u5DF2\u521D\u59CB\u5316",{chatId:this._currentChatId,source:this._hostBindingStatus.source}),!0}_seedKnownSlots(){try{let e=wr(),r=Yb(e);if(!r?.messageId)return;let n=`${_e(r.messageId)}::${_e(r.swipeId)}`;this._recentlyProcessedSlots.set(n,Number.MAX_SAFE_INTEGER),ot.debug(`\u5DF2\u5C06\u5F53\u524D\u6700\u65B0 slot "${n}" \u9884\u6807\u8BB0\u4E3A\u5DF2\u77E5\uFF0C\u8DF3\u8FC7 MESSAGE_RECEIVED \u91CD\u653E`)}catch(e){ot.warn("_seedKnownSlots \u5931\u8D25",{error:e})}}_refreshHostBindingStatus(){let e=Nt.describe(),r=[Ze.MESSAGE_SENT,Ze.MESSAGE_RECEIVED,Ze.GENERATION_STOPPED,Ze.CHAT_CHANGED,Ze.MESSAGE_DELETED];this._hostBindingStatus={...this._hostBindingStatus,initialized:!!e.hasBridge,lastInitResult:e.hasBridge?"ready":e.retryScheduled?"pending_retry":"pending",source:e.source,hasEventSource:!!e.hasBridge,hasEventTypes:Array.isArray(e.availableEvents)&&e.availableEvents.length>0,eventBindings:r.map(n=>`subscribed: ${n}`),retryScheduled:!!e.retryScheduled,retryDelayMs:0,lastError:""}}stop(){this._stopCallbacks.forEach(e=>{try{e()}catch(r){ot.warn("\u505C\u6B62\u56DE\u8C03\u5931\u8D25",{error:r})}}),this._stopCallbacks=[],this._pendingTimers.forEach(e=>clearTimeout(e)),this._pendingTimers.clear(),this._slotQueues.clear(),this._recentlyProcessedSlots.clear(),this._ownWriteMessageIds.clear(),this._cancelActiveTransactions("service_stopped"),this._activeTransactions.clear(),this._isProcessing=!1,this._hostBindingStatus={initialized:!1,initAttempts:0,lastInitAt:0,lastInitResult:"idle",source:"unavailable",hasEventSource:!1,hasEventTypes:!1,eventBindings:[],retryScheduled:!1,retryDelayMs:0,lastError:""}}isEnabled(){return!0}getRuntimeSnapshot(){return this._pruneRecentSlots(),this._pruneOwnWrites(),this._refreshHostBindingStatus(),{currentChatId:this._currentChatId,enabled:!0,isProcessing:this._isProcessing,pendingTimerCount:this._pendingTimers.size,queuedSlotCount:this._slotQueues.size,recentlyProcessedSlotCount:this._recentlyProcessedSlots.size,ownWriteMessageIdCount:this._ownWriteMessageIds.size,activeTransactionCount:this._activeTransactions.size,recentTransactions:this._transactionHistory.slice(-10).map(e=>e.toSnapshot()),hostBinding:{...this._hostBindingStatus,eventBindings:Array.isArray(this._hostBindingStatus?.eventBindings)?[...this._hostBindingStatus.eventBindings]:[]},settings:this._getAutomationSettings()}}async processCurrentAssistantMessage(e={}){let r=await Fn({messageId:"",swipeId:"",runSource:"AUTO"}),n=_e(r?.sourceMessageId||r?.messageId);return n?this.processAssistantMessage(n,{force:e.force===!0,swipeId:_e(r?.sourceSwipeId),sourceEvent:e.sourceEvent||"MANUAL_CURRENT_ASSISTANT"}):{success:!1,error:"\u672A\u627E\u5230\u5F53\u524D assistant \u697C\u5C42"}}async processAssistantMessage(e,{force:r=!1,swipeId:n="",sourceEvent:s="AUTO"}={}){let o=new Cl({chatId:this._currentChatId,messageId:e,swipeId:n,sourceEvent:s});try{if(!e)return this._skipTransaction(o,"missing_message_id");o.transition(ar.CONFIRMED);let a=await Fn({messageId:e,swipeId:n,runSource:"AUTO"}),i=a?.targetAssistantMessage||null;if(!i||!a?.sourceMessageId)return this._skipTransaction(o,"assistant_message_not_found");let l=String(i.content||i.mes||"").trim();if(!l||l.length<5)return this._skipTransaction(o,"assistant_message_too_short");o.transition(ar.CONTEXT_BUILT);let d=`${_e(a.sourceMessageId)}::${_e(a.sourceSwipeId||n)}`;if(o.generationKey=d,!r&&this._isRecentlyProcessed(d))return this._skipTransaction(o,"duplicate_slot",{slotKey:d});let c=qo(),u=Qt.filterAutoPostResponseTools(c),p=[...c.filter(h=>Qt.shouldRunLocalTransform(h)&&h.output?.autoTrigger!==!1),...u],g=Te(),m=g?.autoUpdateEnabled===!0&&_e(g?.autoUpdateTrigger||"assistantMessage")==="assistantMessage";return!p.length&&!m?this._skipTransaction(o,"no_auto_tools",{tools:p}):(o.slotKey=d,o.slotRevisionKey=a.slotRevisionKey||"",o.sourceMessageId=a.sourceMessageId||e,o.sourceSwipeId=a.sourceSwipeId||n||"",this._enqueueSlot(d,async()=>{if(!r&&this._isRecentlyProcessed(d))return this._skipTransaction(o,"duplicate_slot_after_queue",{slotKey:d});this._isProcessing=!0,this._markSlotProcessed(d),o.transition(ar.REQUEST_STARTED);let h=new AbortController;this._registerActiveTransaction(o,{controller:h,slotKey:d,sourceMessageId:a.sourceMessageId||e,sourceSwipeId:a.sourceSwipeId||n||""});try{let{results:b,hasWriteback:x}=await this._executeAutoTools(p,a,h,o,{slotKey:d,messageId:e,swipeId:n}),{tableResult:w,hasWriteback:T}=await this._executeAutoTableUpdate(a,h,o,{shouldRunTableAuto:m,tableWorkbenchConfig:g,messageId:e,swipeId:n,sourceEvent:s}),I=x||T;o.transition(ar.REQUEST_FINISHED,{toolResults:b,tableResult:w}),I&&(o.transition(ar.WRITEBACK_STARTED),o.writebackState={messageId:a.sourceMessageId,swipeId:a.sourceSwipeId,hasOutput:!0},this._messageReceivedThrottleUntil=Date.now()+GA),this._markSlotProcessed(d);let S=b.every(_=>_?.success!==!1),A=!m||!!w?.success||w?.skipped===!0||w?.meta?.aborted===!0||w?.meta?.stale===!0,P=S&&A,M=b.some(_=>_?.meta?.aborted===!0||_?.meta?.stale===!0||_?.error==="\u8BF7\u6C42\u5DF2\u53D6\u6D88")||w?.meta?.aborted===!0||w?.meta?.stale===!0;P&&o.transition(ar.WRITEBACK_COMMITTED);let R=P?ar.REFRESH_CONFIRMED:ar.FAILED;return o.transition(R,{verdict:M?"aborted":P?"success":"partial_failure"}),this._recordTransaction(o),this._updateAutoRuntimeForResults(p,a,o,b),{success:P,traceId:o.traceId,slotKey:d,sourceEvent:s,messageId:a.sourceMessageId||e,phase:o.phase,results:b,tableResult:w}}finally{this._unregisterActiveTransaction(o.traceId),this._isProcessing=!1}}))}catch(a){return o.transition(ar.FAILED,{error:a?.message||String(a)}),this._recordTransaction(o),this._unregisterActiveTransaction(o.traceId),this._isProcessing=!1,ot.error("processAssistantMessage \u5F02\u5E38",{error:a}),{success:!1,traceId:o.traceId,error:o.error,phase:o.phase}}}_extractIdentitiesFromArgs(e){let r="",n="";for(let s of e)if(s!=null){if(typeof s=="number"&&Number.isFinite(s)&&!r){r=_e(s);continue}if(typeof s=="string"){let o=_e(s);!r&&/^\d+$/.test(o)&&(r=o);continue}typeof s=="object"&&(r||(r=_e(s.messageId??s.message_id??s.id??s.mid??s.mesid??s.chat_index??s.message?.messageId??s.message?.message_id??s.message?.id??s.message?.mid??s.message?.mesid??s.message?.chat_index??s.data?.messageId??s.data?.message_id??s.data?.id??s.data?.mid??s.data?.mesid??s.data?.chat_index??s.target?.messageId??s.target?.message_id??s.target?.id??s.target?.mid??s.target?.mesid??s.target?.chat_index)),n||(n=_e(s.swipeId??s.swipe_id??s.swipe??s.swipeIndex??s.currentSwipe??s.message?.swipeId??s.message?.swipe_id??s.message?.swipe??s.data?.swipeId??s.data?.swipe_id??s.data?.swipe??s.target?.swipeId??s.target?.swipe_id??s.target?.swipe)))}return{messageId:r,swipeId:n}}_scheduleMessageProcessing(e,r="",n={}){let s=n.settleMs??this._getSettleMs(),o=`msg::${_e(e)}::${_e(r)}`,a=this._pendingTimers.get(o);a&&clearTimeout(a);let i=setTimeout(()=>{this._pendingTimers.delete(o),this.processAssistantMessage(e,{swipeId:r,sourceEvent:n.sourceEvent||"AUTO"}).catch(l=>{ot.error("\u8C03\u5EA6\u6267\u884C\u5931\u8D25",{messageId:e,error:l})})},Math.max(0,s));this._pendingTimers.set(o,i),ot.info("\u5DF2\u8C03\u5EA6\u6D88\u606F\u5904\u7406",{timerKey:o,settleMs:s,sourceEvent:n.sourceEvent})}cancelAutomation(e={}){let r=e.reason||"manual_cancel",n=_e(e.messageId),s=_e(e.slotKey),o=_e(e.traceId),a=0;for(let[i,l]of this._pendingTimers){let d=n&&i.includes(`::${n}::`),c=s&&i.includes(s);(d||c||!n&&!s&&!o)&&(clearTimeout(l),this._pendingTimers.delete(i),a+=1)}return a+=this._cancelActiveTransactions(r,{messageId:n,slotKey:s,traceId:o}),{success:a>0,cancelledCount:a,reason:r}}_isRecentlyProcessed(e){if(!e)return!1;this._pruneRecentSlots();let r=this._recentlyProcessedSlots.get(e);return r?Date.now()-r<this._getDedupeWindowMs():!1}_markSlotProcessed(e){e&&(this._recentlyProcessedSlots.set(e,Date.now()),this._pruneRecentSlots())}_pruneRecentSlots(){let e=Date.now()-this._getDedupeWindowMs();for(let[r,n]of this._recentlyProcessedSlots)(!Number.isFinite(n)||n<e)&&this._recentlyProcessedSlots.delete(r)}async _executeAutoTools(e,r,n,s,{slotKey:o,messageId:a,swipeId:i}){let l=[],d=!1,c=r.lastAiMessage,u=r.assistantBaseText;for(let y of e){let p={...r,signal:n.signal,isAutoRun:!0,abortMeta:{traceId:s.traceId,slotKey:o,sourceMessageId:r.sourceMessageId||a,sourceSwipeId:r.sourceSwipeId||i||""},shouldAbortWriteback:()=>this._shouldAbortAutoWriteback({traceId:s.traceId}),skipNotify:!0,lastAiMessage:c,assistantBaseText:u,input:{...r.input||{},lastAiMessage:c,assistantBaseText:u}},m=Qt.shouldRunLocalTransform(y)?await Yi(y,p):await Qt.runToolPostResponse(y,p);if(l.push(m),m?.writebackState||m?.output){d=!0,this._markOwnWrite(r.sourceMessageId||a);let h=this._readCurrentMessageText(r.sourceMessageId||a);if(h){c=h,u=h;let b=Number(r.sourceMessageId||a);Array.isArray(r.chatMessages)&&r.chatMessages[b]&&(r.chatMessages[b].content=h,r.chatMessages[b].mes=h)}}}return{results:l,hasWriteback:d}}async _executeAutoTableUpdate(e,r,n,{shouldRunTableAuto:s,tableWorkbenchConfig:o,messageId:a,swipeId:i,sourceEvent:l}){if(!s)return{tableResult:null,hasWriteback:!1};let d=await Jh({messageId:e.sourceMessageId||a,swipeId:e.sourceSwipeId||i||"",sourceEvent:l,configInput:o,signal:r.signal,shouldAbortWriteback:()=>this._shouldAbortAutoWriteback({traceId:n.traceId})}),c=!!(d?.state||d?.mirrorResult?.success===!0);return c&&this._markOwnWrite(e.sourceMessageId||a),{tableResult:d,hasWriteback:c}}_readCurrentMessageText(e){let r=wr(),n=ep(r),s=Number(e);if(!Number.isFinite(s)||s<0||s>=n.length)return"";let o=n[s];return String(o?.mes||o?.content||"").trim()}_markOwnWrite(e){let r=_e(e);r&&(this._ownWriteMessageIds.set(r,Date.now()),this._pruneOwnWrites())}_isOwnWrite(e){let r=_e(e);if(!r)return!1;this._pruneOwnWrites();let n=this._ownWriteMessageIds.get(r);return n?Date.now()-n<Vb:!1}_pruneOwnWrites(){let e=Date.now()-Vb;for(let[r,n]of this._ownWriteMessageIds)(!Number.isFinite(n)||n<e)&&this._ownWriteMessageIds.delete(r)}_recordTransaction(e){this._transactionHistory.push(e),this._transactionHistory.length>this._maxHistorySize&&(this._transactionHistory=this._transactionHistory.slice(-this._maxHistorySize)),ot.debug(`\u4E8B\u52A1 [${e.traceId}] \u2192 ${e.phase}`,{messageId:e.messageId,generationKey:e.generationKey,verdict:e.verdict,sourceEvent:e.sourceEvent,error:e.error})}_skipTransaction(e,r,n={}){return e.transition(ar.SKIPPED,{verdict:r,...n}),this._recordTransaction(e),Array.isArray(n?.tools)&&n.tools.length>0&&this._updateAutoRuntimeForSkip(n.tools,e,r,n),{success:!1,skipped:!0,reason:r,traceId:e.traceId,...n}}_enqueueSlot(e,r){let s=(this._slotQueues.get(e)||Promise.resolve()).catch(()=>{}).then(r).finally(()=>{this._slotQueues.get(e)===s&&this._slotQueues.delete(e)});return this._slotQueues.set(e,s),s}_registerActiveTransaction(e,r={}){e?.traceId&&this._activeTransactions.set(e.traceId,{traceId:e.traceId,generationKey:r.generationKey||e.generationKey||"",slotKey:r.slotKey||e.slotKey||"",sourceMessageId:r.sourceMessageId||e.sourceMessageId||"",sourceSwipeId:r.sourceSwipeId||e.sourceSwipeId||"",slotRevisionKey:r.slotRevisionKey||e.slotRevisionKey||"",assistantBaseFingerprint:r.assistantBaseFingerprint||"",assistantBaseText:r.assistantBaseText||"",controller:r.controller||null,cancelled:!1,cancelReason:""})}_unregisterActiveTransaction(e){e&&this._activeTransactions.delete(e)}_cancelActiveTransactions(e="manual_cancel",r={}){let n=_e(r.messageId),s=_e(r.slotKey),o=_e(r.traceId),a=0;for(let[i,l]of this._activeTransactions){let d=o&&i===o,c=n&&_e(l?.sourceMessageId)===n,u=s&&_e(l?.slotKey)===s;if(!(!d&&!c&&!u&&!(!o&&!n&&!s))){l.cancelled=!0,l.cancelReason=e;try{l?.controller?.abort?.()}catch{}a+=1}}return a}_shouldAbortAutoWriteback(e={}){let r=_e(e.traceId);if(r){let n=this._activeTransactions.get(r);if(!n||n.cancelled)return{aborted:!0,reason:"cancelled_before_host_commit"}}return!1}_updateAutoRuntimeForSkip(e,r,n,s={}){e.forEach(o=>{o?.id&&on(o.id,{lastAutoRunAt:Date.now(),lastAutoStatus:"skipped",lastAutoMessageId:r?.sourceMessageId||r?.messageId||"",lastAutoSwipeId:r?.sourceSwipeId||r?.swipeId||"",lastAutoRevisionKey:r?.slotRevisionKey||s?.slotRevisionKey||"",lastAutoWritebackStatus:"",lastAutoRefreshConfirmed:!1,lastAutoSkipReason:n||""},{touchLastRunAt:!1,emitEvent:!1,emitRuntimeEvent:!0})})}_updateAutoRuntimeForResults(e,r,n,s=[]){e.forEach((o,a)=>{if(!o?.id)return;let i=s[a]||{},l=i?.meta?.writebackDetails||{},d=i?.meta?.aborted===!0||i?.meta?.stale===!0?"aborted":i?.success===!1?"failed":"success",c=i?.meta?.aborted===!0?i?.meta?.abortReason||(i?.meta?.stale===!0?"stale_base_changed":"cancelled_before_host_commit"):"";on(o.id,{lastAutoRunAt:Date.now(),lastAutoStatus:d,lastAutoMessageId:r?.sourceMessageId||n?.sourceMessageId||n?.messageId||"",lastAutoSwipeId:r?.sourceSwipeId||n?.sourceSwipeId||n?.swipeId||"",lastAutoRevisionKey:r?.slotRevisionKey||n?.slotRevisionKey||"",lastAutoWritebackStatus:i?.meta?.writebackStatus||"",lastAutoRefreshConfirmed:!!l.refreshConfirmed,lastAutoSkipReason:c},{touchLastRunAt:!1,emitEvent:!1,emitRuntimeEvent:!0})})}_resetForChatChange(){let e=wr(),r=Gb(e);ot.info("\u804A\u5929\u5207\u6362",{from:this._currentChatId,to:r}),this._currentChatId=r,this._pendingTimers.forEach(n=>clearTimeout(n)),this._pendingTimers.clear(),this._slotQueues.clear(),this._recentlyProcessedSlots.clear(),this._ownWriteMessageIds.clear(),this._cancelActiveTransactions("chat_changed"),this._activeTransactions.clear(),this._isProcessing=!1,this._messageReceivedThrottleUntil=0,this._seedKnownSlots()}_clearMessageState(e){if(e){for(let[r,n]of this._pendingTimers)(r.includes(`::${e}::`)||r.startsWith(`msg::${e}::`))&&(clearTimeout(n),this._pendingTimers.delete(r));for(let r of this._recentlyProcessedSlots.keys())r.startsWith(`${e}::`)&&this._recentlyProcessedSlots.delete(r);this._ownWriteMessageIds.delete(_e(e)),this._seedKnownSlots()}}_getAutomationSettings(){let e=St.getSettings()?.automation||{},r=Number.isFinite(e.settleMs)?e.settleMs:YA;return{settleMs:r,dedupeWindowMs:Number.isFinite(e.dedupeWindowMs)?e.dedupeWindowMs:Math.max(5e3,r+600)}}_getSettleMs(){return this._getAutomationSettings().settleMs}_getDedupeWindowMs(){return this._getAutomationSettings().dedupeWindowMs}},Xb=new kl,JA=Xb});var nx={};ge(nx,{BUILTIN_REGEX_PRESETS:()=>Rl,BUILTIN_WORLDBOOK_PRESETS:()=>tp,MIGRATION_BACKUP_KEY:()=>tx,MIGRATION_DONE_KEY:()=>Il,default:()=>eC,ensurePresetSystem:()=>rx,registerBuiltinPresets:()=>rp,runMigrationOnce:()=>np});function XA(t){if(!Array.isArray(t)||t.length===0)return null;let e=t.map(r=>String(r||"").trim()).filter(Boolean).sort().join("|");if(!e)return null;for(let r of Rl)if(r.rules.filter(s=>s.type==="include"&&s.enabled!==!1).map(s=>s.value).sort().join("|")===e)return r.id;return null}function rp(){try{typeof Fc=="function"&&Fc(Rl),typeof mc=="function"&&mc(tp),kn.info("\u5185\u7F6E\u9884\u8BBE\u5DF2\u6CE8\u518C",{regex:Rl.length,worldbook:tp.length})}catch(t){kn.error("\u6CE8\u518C\u5185\u7F6E\u9884\u8BBE\u5931\u8D25",{error:t})}}function QA(t){let e=new Set,r=[];for(let n of Array.isArray(t)?t:[]){let s=String(n||"").trim();if(!(!s||e.has(s)))if(e.add(s),s.startsWith("regex:")){let o=s.slice(6).trim();o&&r.push({type:"regex_include",value:o,enabled:!0,name:"",description:""})}else r.push({type:"include",value:s,enabled:!0,name:"",description:""})}return r}function ZA(t,e,r){let n=JSON.parse(JSON.stringify(r||{})),s=!1,o=n.extraction||{};if(!o.regexPresetId){let i=Array.isArray(o.selectors)?o.selectors:[];if(i.length>0){let l=XA(i);if(l)o.regexPresetId=l,s=!0,kn.info(`\u5DE5\u5177 ${t} \u7ED1\u5B9A\u5185\u7F6E\u6B63\u5219\u9884\u8BBE: ${l}`);else{let d=hi({name:`${e||t}_\u8FC1\u79FB_\u6B63\u5219`,description:`\u81EA\u8001\u7248\u672C selectors \u81EA\u52A8\u8FC1\u79FB\uFF08${i.length} \u9879\uFF09`,rules:QA(i),blacklist:[]});d?.id&&(o.regexPresetId=d.id,s=!0,kn.info(`\u5DE5\u5177 ${t} \u521B\u5EFA\u8FC1\u79FB\u6B63\u5219\u9884\u8BBE: ${d.id}`))}n.extraction=o}}let a=n.worldbooks||{};if(!a.presetId&&a.enabled===!0&&Array.isArray(a.selected)&&a.selected.length>0){let i=ri({name:`${e||t}_\u8FC1\u79FB_\u4E16\u754C\u4E66`,description:`\u81EA\u8001\u7248\u672C worldbooks.selected \u81EA\u52A8\u8FC1\u79FB\uFF08${a.selected.length} \u672C\uFF09`,bindingMode:"custom",includeDisabled:!1,bookList:a.selected.map(l=>({bookName:String(l||""),enabled:!0,entryOverrides:{}})).filter(l=>l.bookName)});i?.id&&(a.presetId=i.id,s=!0,kn.info(`\u5DE5\u5177 ${t} \u521B\u5EFA\u8FC1\u79FB\u4E16\u754C\u4E66\u9884\u8BBE: ${i.id}`)),n.worldbooks=a}return s?n:null}function np(){try{if(Ke.get(Il)===!0)return{skipped:!0,reason:"already_done"};let t=U.get(ex)||{};if(!t||typeof t!="object")return kn.info("\u65E0\u5DE5\u5177\u914D\u7F6E\u9700\u8981\u8FC1\u79FB"),Ke.set(Il,!0),{skipped:!0,reason:"no_configs"};Ke.set(tx,{ts:Date.now(),version:"v45",snapshot:t});let e=0,r={...t};for(let[n,s]of Object.entries(t)){if(!s||typeof s!="object")continue;let o=ZA(n,s.name,s);o&&(r[n]=o,e+=1)}return e>0&&U.set(ex,r),Ke.set(Il,!0),kn.info("\u8FC1\u79FB\u5B8C\u6210",{migratedCount:e,total:Object.keys(t).length}),{skipped:!1,migratedCount:e,total:Object.keys(t).length}}catch(t){return kn.error("\u8FC1\u79FB\u5931\u8D25\uFF0C\u5DF2 abort\uFF0C\u8001\u5B57\u6BB5\u4FDD\u7559",{error:t}),{skipped:!1,error:t?.message||String(t),aborted:!0}}}function rx(){return rp(),np()}var kn,Il,tx,ex,Rl,tp,eC,sx=O(()=>{Ve();J();ln();Ss();kn=N.createScope("PresetBootstrap"),Il="migration_v45_done",tx="migration_v45_backup",ex="tool_configs",Rl=[{id:"builtin_regex_summary",name:"\u5185\u7F6E \xB7 \u603B\u7ED3\u63D0\u53D6",description:"\u63D0\u53D6 <boo_FM> \u6807\u7B7E\u5185\u5BB9\uFF08\u5BF9\u5E94\u5185\u7F6E\u300C\u8BB0\u5FC6\u538B\u7F29\u300D\u5DE5\u5177\uFF09",rules:[{id:"r_builtin_summary_1",type:"include",value:"boo_FM",enabled:!0,name:"\u603B\u7ED3\u6807\u7B7E",description:""}],blacklist:[]},{id:"builtin_regex_status_block",name:"\u5185\u7F6E \xB7 \u72B6\u6001\u680F\u63D0\u53D6",description:"\u63D0\u53D6 <status_block> \u6807\u7B7E\u5185\u5BB9\uFF08\u5BF9\u5E94\u5185\u7F6E\u300C\u72B6\u6001\u680F\u300D\u5DE5\u5177\uFF09",rules:[{id:"r_builtin_status_1",type:"include",value:"status_block",enabled:!0,name:"\u72B6\u6001\u6807\u7B7E",description:""}],blacklist:[]},{id:"builtin_regex_youyou",name:"\u5185\u7F6E \xB7 \u4F18\u4F18\u9510\u8BC4\u63D0\u53D6",description:"\u63D0\u53D6 <youyou> \u6807\u7B7E\u5185\u5BB9\uFF08\u5BF9\u5E94\u5185\u7F6E\u300C\u4F18\u4F18\u9510\u8BC4\u300D\u5DE5\u5177\uFF09",rules:[{id:"r_builtin_youyou_1",type:"include",value:"youyou",enabled:!0,name:"\u4F18\u4F18\u6807\u7B7E",description:""}],blacklist:[]}],tp=[];eC={registerBuiltinPresets:rp,runMigrationOnce:np,ensurePresetSystem:rx}});var B,ho,ox,sp,bo=O(()=>{B="yyt-fab-v1",ho="__yytFloatingBallCleanup_v1",ox="floatingBall",sp="position"});function ax(){return`
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
  `}var ix=O(()=>{bo()});function lx(t){let r=(t||document).createElement("div");return r.id=B,r.innerHTML=`
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
  `,{root:r,orb:r.querySelector(`#${B}-orb`),menu:r.querySelector(`#${B}-menu`),phoneScreen:r.querySelector(".phone-screen"),phoneContent:r.querySelector(`#${B}-content`),phoneDock:r.querySelector(`#${B}-dock`),phoneTime:r.querySelector(`#${B}-time`),dragHandle:r.querySelector(`#${B}-drag-handle`),menuClose:r.querySelector(`#${B}-close`),badge:r.querySelector(`#${B}-orb-badge`)}}function cx(t,e,r){let n=t||document;if(n.getElementById(e))return null;let s=n.createElement("style");return s.id=e,s.textContent=r,(n.head||n.documentElement).appendChild(s),s}function dx(t){let e=t||document;[B,`${B}-style`].forEach(r=>{let n=e.getElementById(r);n&&typeof n.remove=="function"&&n.remove()})}function ux(){let t=[];function e(n,s,o,a){if(!(!n||typeof n.addEventListener!="function"))try{n.addEventListener(s,o,a),t.push({target:n,event:s,handler:o,options:a})}catch{}}function r(){for(;t.length;){let{target:n,event:s,handler:o,options:a}=t.pop();try{n.removeEventListener(s,o,a)}catch{}}}return{on:e,removeAll:r}}function px(t){let e=t||window;return e.innerWidth<=768?{x:e.innerWidth-52-12,y:e.innerHeight-52-80}:{x:40,y:160}}function op(t,e){let r=e||window;return{x:Math.max(4,Math.min(Number.isFinite(t?.x)?t.x:0,r.innerWidth-52-2)),y:Math.max(4,Math.min(Number.isFinite(t?.y)?t.y:0,r.innerHeight-52-2))}}function yx(t){let e=t instanceof Date?t:new Date,r=e.getHours(),n=String(e.getMinutes()).padStart(2,"0");return`${r}:${n}`}var fx=O(()=>{bo()});function mx({root:t,orb:e,menuHead:r,targetDocument:n,targetWindow:s,on:o,savePosition:a,onTapWhenNotDragged:i,onDragMove:l}){let d=n||document,c=s||window,u=!1,y=!1,p=!1,g=0,m=0,h=0,b=0;function x(S,A,P){u=!0,y=!1,p=!!P,h=S,b=A;let M=t.getBoundingClientRect();g=S-M.left,m=A-M.top,t.style.transition="none"}function w(S,A){if(!u)return!1;if(!y){if(Math.hypot(S-h,A-b)<=5)return!1;y=!0}let P=Math.max(4,Math.min(S-g,c.innerWidth-52-2)),M=Math.max(4,Math.min(A-m,c.innerHeight-52-2));if(t.style.left=`${P}px`,t.style.top=`${M}px`,typeof l=="function")try{l({x:P,y:M})}catch{}return!0}function T(){if(u&&(u=!1,t.style.transition="",y&&typeof a=="function"))try{a({x:parseInt(t.style.left,10)||0,y:parseInt(t.style.top,10)||0})}catch{}}[{target:e,tapToggles:!0},{target:r,tapToggles:!1}].forEach(({target:S,tapToggles:A})=>{o(S,"mousedown",P=>{P.target?.closest?.(".menu-close")||(x(P.clientX,P.clientY,A),P.preventDefault())}),o(S,"touchstart",P=>{if(P.target?.closest?.(".menu-close"))return;let M=P.touches?.[0];M&&x(M.clientX,M.clientY,A)},{passive:!1})}),o(d,"mousemove",S=>w(S.clientX,S.clientY)),o(d,"mouseup",()=>T()),o(d,"touchmove",S=>{if(!u)return;let A=S.touches?.[0];A&&w(A.clientX,A.clientY)&&S.preventDefault()},{passive:!1}),o(d,"touchend",S=>{if(!u)return;let A=y,P=p;if(T(),!A&&P&&typeof i=="function"&&i(),p=!1,S.cancelable)try{S.preventDefault()}catch{}},{passive:!1});try{let S=c.parent?.document;S&&S!==d&&(o(S,"mousemove",A=>w(A.clientX,A.clientY)),o(S,"mouseup",()=>T()))}catch{}return o(e,"click",()=>{if(y){y=!1;return}typeof i=="function"&&i()}),{isDragging:()=>u,consumeDragMoved:()=>{let S=y;return y=!1,S}}}var hx=O(()=>{bo()});function xx({root:t,menu:e,targetWindow:r,onOpen:n,onClose:s}){let o=r||window,a=!1;function i(){let u=parseInt(t.style.left,10)||0,y=parseInt(t.style.top,10)||0;u<o.innerWidth/2?(e.style.left="0",e.style.right="auto"):(e.style.left="auto",e.style.right="0"),o.innerHeight-y-64<480&&y>480/2?(e.style.top="auto",e.style.bottom=`${56}px`,t.classList.add("is-open-up"),e.style.transformOrigin=u<o.innerWidth/2?"bottom left":"bottom right"):(e.style.top=`${56}px`,e.style.bottom="auto",t.classList.remove("is-open-up"),e.style.transformOrigin=u<o.innerWidth/2?"top left":"top right")}function l(){if(!a&&(a=!0,i(),t.classList.add("is-open"),typeof n=="function"))try{n()}catch{}}function d(){if(a&&(a=!1,t.classList.remove("is-open","is-open-up"),typeof s=="function"))try{s()}catch{}}function c(){a?d():l()}return{open:l,close:d,toggle:c,isOpen:()=>a,updateDirection:i}}function ap(t){let e=[],r=[];for(let a of t)if(!(!a||typeof a!="object")){if(typeof a.visible=="function")try{if(!a.visible())continue}catch{continue}a.dock===!0?e.push(a):r.push(a)}e.sort((a,i)=>(a.order??100)-(i.order??100));let n=new Map,s=[];for(let a of r){let i=String(a.group||"_default");n.has(i)?a.groupTitle&&!n.get(i).groupTitle&&(n.get(i).groupTitle=a.groupTitle):(n.set(i,{groupId:i,groupTitle:a.groupTitle||(i==="_default"?"":i),items:[]}),s.push(i)),n.get(i).items.push(a)}for(let a of n.values())a.items.sort((i,l)=>(i.order??100)-(l.order??100));return{screenGroups:s.map(a=>n.get(a)),dockItems:e}}function Pa(t){return String(t??"").replace(/[&<>"']/g,e=>rC[e])}function wx(t,{groupTitle:e},r){let n=t.createDocumentFragment();if(e){let o=t.createElement("div");o.className="phone-group-title",o.textContent=e,n.appendChild(o)}let s=t.createElement("div");return s.className="phone-icon-grid",r.forEach(o=>s.appendChild(o)),n.appendChild(s),n}function ip(t,e="\u6682\u65E0\u83DC\u5355\u9879"){let r=t.createElement("div");return r.className="phone-empty",r.textContent=e,r}var rC,lp=O(()=>{bo();rC={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}});function vx({onChange:t,onRefresh:e}){let r=new Map;function n(){if(typeof t=="function")try{t()}catch{}}function s(p){if(typeof e=="function")try{e(p)}catch{}}function o(p){return!p||typeof p!="object"?"\u9879\u5FC5\u987B\u662F\u5BF9\u8C61":!p.id||typeof p.id!="string"?"\u9879\u5FC5\u987B\u5305\u542B\u5B57\u7B26\u4E32 id":!p.label||typeof p.label!="string"?"\u9879\u5FC5\u987B\u5305\u542B\u5B57\u7B26\u4E32 label":p.kind&&!["toggle","button","slider","labelValue","custom","app"].includes(p.kind)?`\u672A\u77E5 kind: ${p.kind}`:p.kind==="custom"&&typeof p.render!="function"?"kind=custom \u5FC5\u987B\u63D0\u4F9B render \u51FD\u6570":null}function a(p){let g=o(p);if(g)throw new Error(`[FloatingBall] registerItem \u5931\u8D25: ${g}`);if(r.has(p.id)){let m=r.get(p.id);if(typeof m.destroy=="function")try{m.destroy()}catch{}}return r.set(p.id,{kind:"toggle",order:100,dock:!1,...p}),n(),()=>i(p.id)}function i(p){let g=r.get(p);if(!g)return!1;if(typeof g.destroy=="function")try{g.destroy()}catch{}return r.delete(p),n(),!0}function l(p,g){let m=r.get(p);return m?(r.set(p,{...m,...g}),n(),!0):!1}function d(p){if(p===void 0)for(let g of r.keys())s(g);else s(p)}function c(){return Array.from(r.values())}function u(p){return r.get(p)||null}function y(){for(let p of r.values())if(typeof p.destroy=="function")try{p.destroy()}catch{}r.clear()}return{registerItem:a,unregisterItem:i,updateItem:l,refresh:d,getAll:c,getItem:u,destroyAll:y}}function cp(){let t=Promise.resolve();function e(r){return t=t.catch(()=>{}).then(async()=>await r()),t}return{run:e}}function nC(t){return t&&Array.from(String(t))[0]||"\xB7"}function Ml(t,e,r){let n={...r,item:e};switch(e.kind){case"custom":return lC(t,e,n);case"app":case"slider":case"labelValue":case"button":case"toggle":default:return sC(t,e,n)}}function sC(t,e,r){let n=t.createElement("div");n.className="phone-app",n.setAttribute("data-id",e.id),n.setAttribute("data-kind",e.kind||"toggle"),e.radioGroup&&n.setAttribute("data-radio-group",e.radioGroup);let s=iC(e),o=Pa(e.label);n.innerHTML=`
    <div class="phone-app-icon" ${e.iconColor?`style="background: ${Pa(e.iconColor)}"`:""}>
      ${s}
      <span class="phone-app-badge" style="display:none;"></span>
    </div>
    <div class="phone-app-label">${o}</div>
  `;let a=n.querySelector(".phone-app-icon"),i=n.querySelector(".phone-app-badge"),l=n.querySelector(".phone-app-label");function d(){let c="off";if(typeof e.getState=="function")try{c=e.getState()||"off"}catch{c="off"}else e.kind==="button"&&(c="off");if((e.kind==="toggle"||typeof e.getState=="function")&&(n.classList.toggle("is-on",c==="on"),n.classList.toggle("is-missing",c==="missing")),e.kind==="labelValue"){let y="";if(typeof e.value=="function")try{y=e.value()}catch{y=""}else e.value!==void 0&&(y=e.value);y!==""&&y!=null?l.textContent=`${e.label} \xB7 ${y}`:l.textContent=e.label}cC(e,i);let u=typeof e.disabled=="function"?aC(e.disabled,!1):!!e.disabled;n.classList.toggle("is-disabled",u)}return n.addEventListener("click",c=>{if(!n.classList.contains("is-disabled")){if(c.stopPropagation(),typeof e.onClick!="function"&&e.kind==="slider"){if(typeof e.onChange=="function"){let u=Number.isFinite(e.step)?Number(e.step):1,y=oC(e),p=Number.isFinite(e.max)?Number(e.max):100,g=Number.isFinite(e.min)?Number(e.min):0,m=y+u;m>p&&(m=g),r.mutex.run(async()=>{try{await e.onChange({...r,value:m})}catch(h){r.logger?.error?.(`\u9879 ${e.id} onChange \u5F02\u5E38: ${h?.message||h}`,h)}finally{d()}})}return}typeof e.onClick=="function"?r.mutex.run(async()=>{try{await e.onClick(r)}catch(u){r.logger?.error?.(`\u9879 ${e.id} onClick \u5F02\u5E38: ${u?.message||u}`,u)}finally{d()}}):r.logger?.warn?.(`\u9879 ${e.id} (${e.kind}) \u672A\u63D0\u4F9B onClick`)}}),d(),{el:n,sync:d}}function oC(t){if(typeof t.value=="function")try{return Number(t.value())||0}catch{return 0}return Number.isFinite(t.value)?Number(t.value):0}function aC(t,e){try{return!!t()}catch{return e}}function iC(t){if(typeof t.icon=="string"&&t.icon.trim()){let e=t.icon.trim();return e.startsWith("<svg")||e.startsWith("<SVG")?e:Pa(e)}return Pa(nC(t.label))}function lC(t,e,r){let n=t.createElement("div");n.className="phone-app phone-app-custom",n.setAttribute("data-id",e.id);let s=null;try{s=e.render(r)}catch(a){r.logger?.error?.(`custom \u9879 ${e.id} render \u5F02\u5E38: ${a?.message||a}`,a),s=t.createTextNode(`[\u6E32\u67D3\u5931\u8D25: ${e.id}]`)}s&&typeof s.nodeType=="number"?n.appendChild(s):s!=null&&(n.innerHTML=String(s));function o(){if(typeof e.onSync=="function")try{e.onSync({...r,container:n})}catch{}}return{el:n,sync:o}}function cC(t,e){if(!e)return;if(typeof t.badge!="function"){e.style.display="none";return}let r=null;try{r=t.badge()}catch{r=null}if(r==null||r===""||r===0||r==="0"){e.style.display="none",e.textContent="";return}e.style.display="",e.textContent=String(r)}var Sx=O(()=>{lp()});function _x({targetDoc:t,mountPoint:e,mutex:r,storage:n,logger:s,closeMenu:o,onAppOpened:a,onAppClosed:i}){if(!t)throw new Error("createAppController: targetDoc \u5FC5\u586B");if(!e)throw new Error("createAppController: mountPoint \u5FC5\u586B");if(!r||typeof r.run!="function")throw new Error("createAppController: mutex \u5FC5\u586B");let l=new Map,d=[],c=null,u=null,y=null,p=null;function g(L){return s&&typeof s.createScope=="function"?s.createScope(`App:${L}`):s}function m(L){return n&&typeof n.namespace=="function"?n.namespace(`apps:${L}`):n}function h(L){return{appId:L,pushView:Z,popView:we,replaceView:Ie,closeApp:ie,closeMenu:()=>{try{o?.()}catch{}},storage:m(L),logger:g(L),get isOpen(){return c===L},getStackDepth:()=>d.length}}function b(){u||(u=t.createElement("div"),u.className=dC,y=t.createElement("button"),y.type="button",y.className=uC,y.setAttribute("aria-label","\u8FD4\u56DE"),y.innerHTML=gC,y.addEventListener("click",L=>{L.stopPropagation(),we()}),p=t.createElement("div"),p.className=pC,u.appendChild(y),u.appendChild(p))}function x(L){if(!u||!p||!y)return;let ee=l.get(c),V=L&&L.title||ee&&(ee.title||ee.label)||"";p.textContent=V;let le=L&&typeof L.showBackButton=="boolean"?L.showBackButton:d.length>1;y.style.visibility=le?"visible":"hidden"}function w(L,ee){let V=null;try{V=L.render(ee)}catch(tt){s?.error?.(`view ${L?.id||"?"} render \u5F02\u5E38: ${tt?.message||tt}`,tt);let Mt=t.createElement("div");Mt.style.cssText="padding:24px;color:#ff6b6b;font-size:12px;",Mt.textContent=`[\u6E32\u67D3\u5931\u8D25: ${L?.id||"unknown"}]`,V=Mt}if(!V||typeof V.nodeType!="number"){let tt=t.createElement("div");tt.style.cssText="padding:24px;color:rgba(255,255,255,0.6);font-size:12px;",tt.textContent=`[render \u672A\u8FD4\u56DE DOM Node: ${L?.id||"unknown"}]`,V=tt}let le=t.createElement("div");return le.className=yC,L?.id&&le.setAttribute("data-view-id",String(L.id)),le.appendChild(V),le}function T(L){return new Promise(ee=>{let V=!1,le=()=>{V||(V=!0,L.removeEventListener("animationend",tt),ee())},tt=()=>le();L.addEventListener("animationend",tt),setTimeout(le,400)})}async function I(L){L.classList.add(Tx),await T(L),L.classList.remove(Tx)}async function S(L){L.classList.add(fC),await T(L)}function A(L,ee){if(typeof L?.onLeave=="function")try{L.onLeave(ee)}catch(V){s?.error?.(`view ${L?.id} onLeave \u5F02\u5E38: ${V?.message||V}`,V)}}function P(L,ee){if(typeof L?.onEnter=="function")try{L.onEnter(ee)}catch(V){s?.error?.(`view ${L?.id} onEnter \u5F02\u5E38: ${V?.message||V}`,V)}}function M(L){if(typeof L?.destroy=="function")try{L.destroy()}catch(ee){s?.error?.(`view ${L?.id} destroy \u5F02\u5E38: ${ee?.message||ee}`,ee)}}function R(L){L&&L.parentNode&&L.parentNode.removeChild(L)}function _(L){return!L||typeof L!="object"?"App \u5FC5\u987B\u662F\u5BF9\u8C61":!L.id||typeof L.id!="string"?"App \u5FC5\u987B\u5305\u542B\u5B57\u7B26\u4E32 id":!L.label||typeof L.label!="string"?"App \u5FC5\u987B\u5305\u542B\u5B57\u7B26\u4E32 label":!L.rootView||typeof L.rootView!="object"?"App \u5FC5\u987B\u5305\u542B rootView \u5BF9\u8C61":typeof L.rootView.render!="function"?"rootView.render \u5FC5\u987B\u662F\u51FD\u6570":null}function $(L){let ee=_(L);if(ee)throw new Error(`[FloatingBall] registerApp \u5931\u8D25: ${ee}`);l.has(L.id)&&c===L.id&&ie(),l.set(L.id,{...L}),s?.log?.(`App \u5DF2\u6CE8\u518C: ${L.id}`)}function F(L){return l.has(L)?(c===L&&ie(),l.delete(L),s?.log?.(`App \u5DF2\u5378\u8F7D: ${L}`),!0):!1}function Y(L){return r.run(async()=>{let ee=l.get(L);if(!ee)return s?.warn?.(`openApp: \u627E\u4E0D\u5230 App ${L}`),!1;if(c===L)return!0;for(c&&await re(),c=L;e.firstChild;)e.removeChild(e.firstChild);e.classList.add(dp),b(),e.appendChild(u);let V=h(L);if(typeof ee.onOpen=="function")try{ee.onOpen(V)}catch(Mt){s?.error?.(`App ${L} onOpen \u5F02\u5E38: ${Mt?.message||Mt}`,Mt)}let le=ee.rootView,tt=w(le,V);e.appendChild(tt),d.push({view:le,container:tt}),x(le),await I(tt),P(le,V);try{a?.(L)}catch{}return s?.log?.(`App \u6253\u5F00: ${L}`),!0})}async function re(){if(!c)return;let L=c,ee=l.get(L),V=h(L);for(;d.length>0;){let le=d.pop();A(le.view,V),M(le.view),R(le.container)}if(ee&&typeof ee.onClose=="function")try{ee.onClose(V)}catch(le){s?.error?.(`App ${L} onClose \u5F02\u5E38: ${le?.message||le}`,le)}u&&R(u),e.classList.remove(dp),c=null;try{i?.(L)}catch{}s?.log?.(`App \u5173\u95ED: ${L}`)}function ie(){return r.run(async()=>c?(await re(),!0):!1)}function Z(L){return r.run(async()=>{if(!c)return s?.warn?.("pushView: \u5F53\u524D\u65E0\u6D3B\u8DC3 App"),!1;if(!L||typeof L.render!="function")return s?.warn?.("pushView: view.render \u5FC5\u987B\u662F\u51FD\u6570"),!1;let ee=h(c),V=d[d.length-1];V&&(A(V.view,ee),M(V.view),R(V.container));let le=w(L,ee);return e.appendChild(le),d.push({view:L,container:le}),x(L),await I(le),P(L,ee),!0})}function we(){return r.run(async()=>{if(!c)return s?.warn?.("popView: \u5F53\u524D\u65E0\u6D3B\u8DC3 App"),!1;if(d.length<=1)return await re(),!0;let L=h(c),ee=d[d.length-1];ee.container&&await S(ee.container),A(ee.view,L),M(ee.view),R(ee.container),d.pop();let V=d[d.length-1],le=w(V.view,L);return e.appendChild(le),V.container=le,x(V.view),P(V.view,L),!0})}function Ie(L){return r.run(async()=>{if(!c)return s?.warn?.("replaceView: \u5F53\u524D\u65E0\u6D3B\u8DC3 App"),!1;if(!L||typeof L.render!="function")return s?.warn?.("replaceView: view.render \u5FC5\u987B\u662F\u51FD\u6570"),!1;let ee=h(c),V=d[d.length-1];V&&(A(V.view,ee),M(V.view),R(V.container),d.pop());let le=w(L,ee);return e.appendChild(le),d.push({view:L,container:le}),x(L),P(L,ee),!0})}function X(){return c!==null}function We(){return d.length}function Ae(){return c?l.get(c):null}function Be(){if(c){let L=c,ee=l.get(L),V=h(L);for(;d.length>0;){let le=d.pop();A(le.view,V),M(le.view),R(le.container)}if(ee&&typeof ee.onClose=="function")try{ee.onClose(V)}catch{}u&&R(u),e.classList.remove(dp),c=null}l.clear(),u=null,y=null,p=null}return{registerApp:$,unregisterApp:F,openApp:Y,closeApp:ie,pushView:Z,popView:we,replaceView:Ie,hasActiveApp:X,getStackDepth:We,getActiveApp:Ae,destroyAll:Be}}var dC,uC,pC,yC,Tx,fC,dp,gC,Ex=O(()=>{dC="phone-app-topbar",uC="phone-app-topbar-back",pC="phone-app-topbar-title",yC="phone-app-view",Tx="is-pushing-in",fC="is-popping-out",dp="is-app-active",gC=`
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
    <path d="M15 18 L9 12 L15 6" stroke="currentColor" stroke-width="2"
          stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  </svg>
`});function Ax(){let t=Math.random().toString(36).slice(2,10);return`${Date.now().toString(36)}-${t}`}function Cx({name:t}={}){let e=Date.now();return{id:`group-${Ax()}`,name:t??"\u672A\u547D\u540D\u7FA4",atmosphere:"",memberIds:[],perMemberPrompt:{},triggerSources:{userMessage:!1,heartbeat:{enabled:!1,intervalSec:600},tavernEvents:[]},mergeStrategy:"compound",injectConfig:{enabled:!1,timing:"one-shot",formatTemplate:"",formatExplanation:"",windowSize:20},rateLimitConfig:{perMinute:3,dailyLimit:null},phase1Config:{promptTemplate:"",parseRegex:""},heartbeatTemplate:"",failureConfig:{maxRetries:2},createdAt:e,updatedAt:e}}function kx({groupId:t,sender:e,content:r,type:n=mC.TEXT,replyTo:s=null}={}){return{id:`msg-${Ax()}`,groupId:t??"",chatId:"",sender:e??Nl,content:r??"",timestamp:Date.now(),type:n,replyTo:s}}var Pl,Na,$a,In,mC,Nl,La=O(()=>{Pl="qq",Na="friends",$a="groups",In="messagesByChat",mC={TEXT:"text",IMAGE:"image",VOICE:"voice",REDPACKET:"redpacket",SYSTEM:"system"},Nl="user"});function $l(){try{let t=wr(),e=_s(t),r=[e?.chatId,e?.chat_id,e?.chat_filename,e?.chatMetadata?.chatId,e?.chatMetadata?.chat_id,e?.chatMetadata?.file_name,e?.chatMetadata?.name,t?.chatId,t?.chat_id,t?.chat_filename];for(let s of r){let o=typeof s=="string"?s.trim():"";if(o)return o}let n=t?.this_chid;if(n!=null&&String(n).trim()!=="")return`chat_char_${String(n).trim()}`}catch{}return"default_chat"}function up(t){return Array.isArray(t)?t:[]}function Oa(t){return t&&typeof t=="object"&&!Array.isArray(t)?t:{}}function Ix({storage:t,logger:e}={}){if(!t||typeof t.get!="function"||typeof t.set!="function")throw new Error("createQQStorage: storage \u5FC5\u586B");let r=e||{log(){},warn(){},error(){}};function n(){return up(t.get(Na,[]))}function s(b){return n().find(x=>x&&x.id===b)||null}function o(b){if(!b||!b.id)return r.warn?.("addFriend: \u7F3A\u5C11 id"),null;let x=n();return x.some(w=>w&&w.id===b.id)?(r.warn?.(`addFriend: \u91CD\u590D id ${b.id}`),null):(x.push(b),t.set(Na,x),b)}function a(b,x){let w=n(),T=w.findIndex(S=>S&&S.id===b);if(T<0)return null;let I={...w[T],...x,id:w[T].id,updatedAt:Date.now()};return w[T]=I,t.set(Na,w),I}function i(b){let x=n(),w=x.filter(T=>T&&T.id!==b);return w.length===x.length?!1:(t.set(Na,w),!0)}function l(){return up(t.get($a,[]))}function d(b){return l().find(x=>x&&x.id===b)||null}function c(b){if(!b||!b.id)return r.warn?.("addGroup: \u7F3A\u5C11 id"),null;let x=l();return x.some(w=>w&&w.id===b.id)?(r.warn?.(`addGroup: \u91CD\u590D id ${b.id}`),null):(x.push(b),t.set($a,x),b)}function u(b,x){let w=l(),T=w.findIndex(S=>S&&S.id===b);if(T<0)return null;let I={...w[T],...x,id:w[T].id,updatedAt:Date.now()};return w[T]=I,t.set($a,w),I}function y(b){let x=l(),w=x.filter(S=>S&&S.id!==b);if(w.length===x.length)return!1;t.set($a,w);let T=Oa(t.get(In,{})),I=!1;for(let S of Object.keys(T))T[S]&&Object.prototype.hasOwnProperty.call(T[S],b)&&(delete T[S][b],I=!0);return I&&t.set(In,T),!0}function p(){return $l()}function g(b){let x=$l(),w=Oa(t.get(In,{})),T=Oa(w[x]);return up(T[b])}function m(b,x){if(!b)return r.warn?.("appendMessage: \u7F3A\u5C11 groupId"),null;if(!x||!x.id)return r.warn?.("appendMessage: \u7F3A\u5C11 message.id"),null;let w=$l(),T=Oa(t.get(In,{}));T[w]||(T[w]={}),Array.isArray(T[w][b])||(T[w][b]=[]);let I={...x,groupId:b,chatId:w};return T[w][b].push(I),t.set(In,T),I}function h(b){let x=$l(),w=Oa(t.get(In,{}));return w[x]&&Object.prototype.hasOwnProperty.call(w[x],b)?(delete w[x][b],t.set(In,w),!0):!1}return{listFriends:n,getFriend:s,addFriend:o,updateFriend:a,removeFriend:i,listGroups:l,getGroup:d,addGroup:c,updateGroup:u,removeGroup:y,getCurrentChatId:p,listMessages:g,appendMessage:m,clearMessages:h}}var Rx=O(()=>{La();zo()});function hC(t){if(!t||!Number.isFinite(t))return"";let e=new Date(t),r=new Date,n=e.getFullYear()===r.getFullYear()&&e.getMonth()===r.getMonth()&&e.getDate()===r.getDate(),s=o=>String(o).padStart(2,"0");return n?`${s(e.getHours())}:${s(e.getMinutes())}`:`${s(e.getMonth()+1)}-${s(e.getDate())} ${s(e.getHours())}:${s(e.getMinutes())}`}function bC(t){let e=String(t||"").trim();return e?Array.from(e)[0]:"?"}function xC(t,e){return t.type==="system"?{label:"",kind:"system"}:t.sender===Nl?{label:"\u6211",kind:"self"}:{label:e.getFriend?.(t.sender)?.name||"\u672A\u77E5",kind:"other"}}function Mx(t,e,r){let n=xC(e,r),s=t.createElement("div");if(s.className="yyt-qq-chat-msg",n.kind==="self"?s.classList.add("is-self"):n.kind==="system"?s.classList.add("is-system"):s.classList.add("is-other"),n.kind!=="system"){let l=t.createElement("div");l.className="yyt-qq-chat-msg-avatar",l.textContent=bC(n.label),s.appendChild(l)}let o=t.createElement("div");if(o.className="yyt-qq-chat-msg-body",n.kind==="other"&&n.label){let l=t.createElement("div");l.className="yyt-qq-chat-msg-sender",l.textContent=n.label,o.appendChild(l)}let a=t.createElement("div");a.className="yyt-qq-chat-msg-bubble",a.textContent=String(e.content||""),o.appendChild(a);let i=t.createElement("div");return i.className="yyt-qq-chat-msg-time",i.textContent=hC(e.timestamp),o.appendChild(i),s.appendChild(o),s}function wC(t,e,r){let n=t.createElement("div");n.style.cssText="display:flex;flex-direction:column;gap:8px;min-width:260px;";let s=Array.isArray(e.memberIds)?e.memberIds:[],o=r.listFriends();if(o.length===0){let d=t.createElement("div");return d.style.cssText="padding:14px 4px;color:var(--yyt-text-secondary,#9aa0a8);font-size:12.5px;line-height:1.6;text-align:center;",d.textContent="\u5C1A\u65E0\u597D\u53CB\u3002B \u9636\u6BB5\u6682\u4E0D\u652F\u6301\u65B0\u5EFA\u597D\u53CB\uFF0C\u8BF7\u7B49\u5F85\u540E\u7EED\u7248\u672C\u3002",n.appendChild(d),n}let a=t.createElement("div");a.style.cssText="font-size:11.5px;color:var(--yyt-text-secondary,#9aa0a8);",a.textContent=`\u5DF2\u6DFB\u52A0 ${s.length} / ${o.length}`,n.appendChild(a);let i=t.createElement("div");i.style.cssText="display:flex;flex-direction:column;gap:4px;max-height:320px;overflow-y:auto;";for(let d of o){let c=s.includes(d.id),u=t.createElement("div");u.style.cssText="display:flex;align-items:center;gap:8px;padding:6px 8px;border-radius:6px;background:rgba(255,255,255,0.04);";let y=t.createElement("span");y.style.cssText=`width:8px;height:8px;border-radius:50%;background:${c?"#4ade80":"rgba(255,255,255,0.2)"};`,u.appendChild(y);let p=t.createElement("span");p.style.cssText="font-size:12.5px;color:var(--yyt-text,#f2f2f2);",p.textContent=d.name||"\u672A\u547D\u540D",u.appendChild(p),i.appendChild(u)}n.appendChild(i);let l=t.createElement("div");return l.style.cssText="font-size:11px;color:var(--yyt-text-secondary,#9aa0a8);line-height:1.5;",l.textContent="\u6210\u5458\u52FE\u9009 UI \u5C06\u5728 Phase C/D \u52A0\u5165\u3002",n.appendChild(l),n}function Px({groupId:t,qqStorage:e,logger:r,targetDoc:n}){let s=null,o=null,a=null,i=null,l=null,d=null,c=null;function u(){s&&(s.scrollTop=s.scrollHeight)}function y(p,g){if(!s)return;let m=s.querySelector(".yyt-qq-chat-empty");m&&m.parentNode===s&&s.removeChild(m),s.appendChild(Mx(p,g,e)),u()}return{id:`qq-chat:${t}`,get title(){return e.getGroup(t)?.name||"\u7FA4\u804A"},render(p){let g=n||globalThis.document||document,m=e.getGroup(t),h=g.createElement("div");if(h.className="yyt-qq-chat",!m){let M=g.createElement("div");M.className="yyt-qq-empty";let R=g.createElement("div");R.className="yyt-qq-empty-title",R.textContent="\u7FA4\u4E0D\u5B58\u5728",M.appendChild(R);let _=g.createElement("div");return _.textContent="\u6B63\u5728\u8FD4\u56DE\u2026\u2026",M.appendChild(_),h.appendChild(M),r?.error?.(`chatView \u627E\u4E0D\u5230 groupId=${t}`),setTimeout(()=>{try{p.popView()}catch{}},50),h}let b=g.createElement("div");b.className="yyt-qq-group-info-bar";let x=g.createElement("div");x.className="yyt-qq-group-info-meta";let w=g.createElement("div");w.className="yyt-qq-group-info-name",w.textContent=m.name,x.appendChild(w);let T=g.createElement("div");T.className="yyt-qq-group-info-count";let I=Array.isArray(m.memberIds)?m.memberIds.length:0;T.textContent=`${I} \u6210\u5458`,x.appendChild(T),b.appendChild(x),c=g.createElement("button"),c.type="button",c.className="yyt-qq-group-info-btn",c.textContent="\u6210\u5458",d=M=>{M.stopPropagation();try{let R=e.getGroup(t)||m,_=wC(g,R,e);Ee.custom({title:`${R.name} - \u6210\u5458`,body:_,buttons:[{label:"\u5173\u95ED",variant:"primary",onClick:$=>$(null)}]})}catch(R){r?.error?.(`\u6253\u5F00\u6210\u5458\u5F39\u7A97\u5F02\u5E38: ${R?.message||R}`,R)}},c.addEventListener("click",d),b.appendChild(c),h.appendChild(b),s=g.createElement("div"),s.className="yyt-qq-chat-stream";let S=e.listMessages(t);if(S.length===0){let M=g.createElement("div");M.className="yyt-qq-chat-empty",M.textContent="\u6D88\u606F\u6D41\u4E3A\u7A7A\u3002\u5728\u4E0B\u65B9\u8F93\u5165\u5E76\u53D1\u9001\u6D88\u606F\u5F00\u59CB\u5427\uFF5E",s.appendChild(M)}else for(let M of S)s.appendChild(Mx(g,M,e));h.appendChild(s);let A=g.createElement("div");A.className="yyt-qq-chat-input-bar",o=g.createElement("textarea"),o.className="yyt-qq-chat-input",o.rows=1,o.placeholder="\u8F93\u5165\u6D88\u606F\uFF0C\u56DE\u8F66\u53D1\u9001\uFF0CShift+Enter \u6362\u884C",A.appendChild(o),a=g.createElement("button"),a.type="button",a.className="yyt-qq-chat-send-btn",a.textContent="\u53D1\u9001",A.appendChild(a),h.appendChild(A);let P=()=>{if(!o)return;let M=o.value,R=String(M??"").trim();if(R)try{let _=kx({groupId:t,sender:Nl,content:R}),$=e.appendMessage(t,_);if(!$){r?.warn?.("appendMessage \u5931\u8D25");return}e.updateGroup(t,{updatedAt:Date.now()}),y(g,$),o.value="",o.focus()}catch(_){r?.error?.(`\u53D1\u9001\u6D88\u606F\u5F02\u5E38: ${_?.message||_}`,_)}};return l=M=>{M.stopPropagation(),P()},a.addEventListener("click",l),i=M=>{M.key==="Enter"&&!M.shiftKey&&!M.isComposing&&(M.preventDefault(),M.stopPropagation(),P())},o.addEventListener("keydown",i),h},onEnter(){u();try{o?.focus()}catch{}},destroy(){try{a&&l&&a.removeEventListener("click",l),o&&i&&o.removeEventListener("keydown",i),c&&d&&c.removeEventListener("click",d)}catch{}s=null,o=null,a=null,c=null,i=null,l=null,d=null}}}var Nx=O(()=>{Wt();La()});function $x(t){if(!t||!Number.isFinite(t))return"";let e=new Date(t),r=new Date,n=e.getFullYear()===r.getFullYear()&&e.getMonth()===r.getMonth()&&e.getDate()===r.getDate(),s=o=>String(o).padStart(2,"0");return n?`${s(e.getHours())}:${s(e.getMinutes())}`:e.getFullYear()===r.getFullYear()?`${s(e.getMonth()+1)}-${s(e.getDate())}`:`${String(e.getFullYear()).slice(2)}-${s(e.getMonth()+1)}-${s(e.getDate())}`}function vC(t){let e=String(t||"").trim();return e?Array.from(e)[0]:"?"}function pp({qqStorage:t,logger:e,targetDoc:r}){return{id:"qq-home",title:"QQ",render(n){let s=r||globalThis.document||document,o=s.createElement("div");o.className="yyt-qq-home";let a=s.createElement("div");a.className="yyt-qq-home-list",o.appendChild(a);let i=t.listGroups().slice().sort((d,c)=>(c.updatedAt||0)-(d.updatedAt||0));if(i.length===0){let d=s.createElement("div");d.className="yyt-qq-empty";let c=s.createElement("div");c.className="yyt-qq-empty-title",c.textContent="\u8FD8\u6CA1\u6709\u7FA4",d.appendChild(c);let u=s.createElement("div");u.textContent="\u70B9\u51FB\u53F3\u4E0B\u89D2 + \u65B0\u5EFA\u4E00\u4E2A\u7FA4",d.appendChild(u),a.appendChild(d)}else for(let d of i)a.appendChild(SC(s,d,t,n));let l=s.createElement("button");return l.type="button",l.className="yyt-qq-home-new-btn",l.setAttribute("aria-label","\u65B0\u5EFA\u7FA4"),l.textContent="+",l.addEventListener("click",async d=>{d.stopPropagation();try{let c=await Ee.prompt({title:"\u65B0\u5EFA\u7FA4",placeholder:"\u7FA4\u540D",confirmText:"\u521B\u5EFA",validate:y=>{let p=String(y||"").trim();return p?p.length>30?"\u7FA4\u540D\u6700\u591A 30 \u5B57":null:"\u7FA4\u540D\u4E0D\u80FD\u4E3A\u7A7A"}});if(!c)return;if(!t.addGroup(Cx({name:c}))){e?.warn?.("\u65B0\u5EFA\u7FA4\u5931\u8D25");return}n.replaceView(pp({qqStorage:t,logger:e,targetDoc:r}))}catch(c){e?.error?.(`\u65B0\u5EFA\u7FA4\u5F02\u5E38: ${c?.message||c}`,c)}}),o.appendChild(l),o}}}function SC(t,e,r,n){let s=t.createElement("div");s.className="yyt-qq-home-item",s.setAttribute("data-group-id",e.id);let o=t.createElement("div");o.className="yyt-qq-home-item-avatar",o.textContent=vC(e.name),s.appendChild(o);let a=t.createElement("div");a.className="yyt-qq-home-item-body";let i=t.createElement("div");i.className="yyt-qq-home-item-row";let l=t.createElement("div");l.className="yyt-qq-home-item-name";let d=Array.isArray(e.memberIds)?e.memberIds.length:0;l.textContent=d>0?e.name:`${e.name} (0 \u6210\u5458)`,i.appendChild(l);let c=t.createElement("div");c.className="yyt-qq-home-item-time",i.appendChild(c),a.appendChild(i);let u=t.createElement("div");u.className="yyt-qq-home-item-preview",a.appendChild(u);let y=r.listMessages(e.id),p=y[y.length-1]||null;if(p){c.textContent=$x(p.timestamp||e.updatedAt);let g=p.sender==="user"?"\u6211":r.getFriend?.(p.sender)?.name||"?";u.textContent=`${g}\uFF1A${String(p.content||"")}`}else c.textContent=$x(e.updatedAt),u.classList.add("is-empty"),u.textContent="\u6682\u65E0\u6D88\u606F";return s.appendChild(a),s.addEventListener("click",g=>{g.stopPropagation();try{n.pushView(Px({groupId:e.id,qqStorage:r,logger:n.logger,targetDoc:t}))}catch(m){n.logger?.error?.(`\u8FDB\u5165\u7FA4\u804A\u5931\u8D25: ${m?.message||m}`,m)}}),s}var Lx=O(()=>{Wt();La();Nx()});function Ox(t){if(!t)return null;let e=t,r=e.querySelector(`style[${yp}]`);if(r)return r;let n=e.createElement("style");return n.setAttribute(yp,"1"),n.textContent=TC,(e.head||e.documentElement).appendChild(n),n}function Dx(t){if(!t)return!1;let e=t.querySelector(`style[${yp}]`);return e&&e.parentNode?(e.parentNode.removeChild(e),!0):!1}var yp,TC,fp=O(()=>{yp="data-yyt-qq-styles",TC=`
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
`});function Bx({floatingBall:t,parentStorage:e,parentLogger:r,targetDoc:n}){if(!t||typeof t.registerApp!="function")throw new Error("registerQQApp: floatingBall \u5FC5\u586B\u4E14\u9700\u652F\u6301 registerApp");if(!e||typeof e.namespace!="function")throw new Error("registerQQApp: parentStorage \u5FC5\u586B");let s=r?.createScope?.(`App:${Pl}`)||r||{log(){},warn(){},error(){}},o=e.namespace("apps").namespace(Pl),a=Ix({storage:o,logger:s});if(n)try{Ox(n)}catch(d){s?.warn?.(`\u6CE8\u5165 QQ \u6837\u5F0F\u5931\u8D25: ${d?.message||d}`)}let i=pp({qqStorage:a,logger:s,targetDoc:n});return{unregister:t.registerApp({id:Pl,label:"QQ",icon:_C,iconColor:"linear-gradient(140deg, #4a90d9 0%, #2c5fa1 100%)",title:"QQ",group:"apps",groupTitle:"\u5E94\u7528",order:30,rootView:i}),qqStorage:a}}var _C,zx=O(()=>{Rx();Lx();fp();La();_C=`
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
    <path d="M12 2.4c-3.7 0-6.7 2.7-6.7 7 0 1.4.4 2.7 1 3.9-.4.9-1 1.8-1.6 2.5-.4.4-.2 1.1.4 1.2 1.7.2 3.1-.2 4.1-.8.9.3 1.8.4 2.8.4s1.9-.1 2.8-.4c1 .6 2.4 1 4.1.8.6-.1.8-.8.4-1.2-.6-.7-1.2-1.6-1.6-2.5.6-1.2 1-2.5 1-3.9 0-4.3-3-7-6.7-7Z"
          fill="#fff" stroke="none"/>
    <circle cx="9.5" cy="9.5" r="1.1" fill="#1a3a5a"/>
    <circle cx="14.5" cy="9.5" r="1.1" fill="#1a3a5a"/>
  </svg>
`});var Yx={};ge(Yx,{default:()=>JC,floatingBall:()=>hp});function jx(){return{inited:!1,destroyed:!1,root:null,orb:null,menu:null,phoneScreen:null,phoneContent:null,phoneDock:null,phoneTime:null,dragHandle:null,menuClose:null,badge:null,styleEl:null,targetDoc:null,targetWin:null,cleanupRegistry:null,dragController:null,menuController:null,itemRegistry:null,appController:null,mutex:null,itemElCache:new Map,unsubscribers:[],openPopupRef:null,timeTimer:null}}function Ux(){C=jx()}function Fx(){return{storage:Ba,logger:At,closeMenu:()=>C.menuController?.close?.(),refresh:t=>C.itemRegistry?.refresh?.(t),mutex:C.mutex,get isOpen(){return!!C.menuController?.isOpen?.()}}}function Ll(){if(!C.phoneContent||!C.phoneDock)return;if(C.appController?.hasActiveApp?.()){EC();return}C.itemElCache.forEach(({destroy:s})=>{if(typeof s=="function")try{s()}catch{}}),C.itemElCache.clear(),C.phoneContent.innerHTML="",C.phoneDock.innerHTML="";let t=C.itemRegistry.getAll(),{screenGroups:e,dockItems:r}=ap(t),n=Fx();e.length===0&&r.length===0?C.phoneContent.appendChild(ip(C.targetDoc,"\u6682\u65E0\u83DC\u5355\u9879")):e.length===0?C.phoneContent.appendChild(ip(C.targetDoc,"\u6240\u6709\u9879\u90FD\u5728 Dock")):e.forEach(s=>{let o=[];s.items.forEach(i=>{let{el:l,sync:d}=Ml(C.targetDoc,i,n);C.itemElCache.set(i.id,{el:l,sync:d,destroy:i.destroy}),o.push(l)});let a=wx(C.targetDoc,{groupTitle:s.groupTitle},o);C.phoneContent.appendChild(a)}),r.forEach(s=>{let{el:o,sync:a}=Ml(C.targetDoc,s,n);C.itemElCache.set(s.id,{el:o,sync:a,destroy:s.destroy}),C.phoneDock.appendChild(o)})}function EC(){let t=C.itemRegistry.getAll(),{dockItems:e}=ap(t),r=new Set(e.map(s=>s.id));for(let s of r){let o=C.itemElCache.get(s);if(o?.destroy)try{o.destroy()}catch{}C.itemElCache.delete(s)}C.phoneDock.innerHTML="";let n=Fx();e.forEach(s=>{let{el:o,sync:a}=Ml(C.targetDoc,s,n);C.itemElCache.set(s.id,{el:o,sync:a,destroy:s.destroy}),C.phoneDock.appendChild(o)})}function Wx(t){let e=C.itemElCache.get(t);if(e?.sync)try{e.sync()}catch(r){At.error(`\u9879 ${t} sync \u5F02\u5E38: ${r?.message||r}`,r)}gp()}function Da(){C.itemElCache.forEach((t,e)=>{Wx(e)})}function gp(){if(!C.badge)return;let t=0,e=C.itemRegistry.getAll();for(let r of e)if(typeof r.badge=="function")try{let n=r.badge();typeof n=="number"&&n>0?t+=n:typeof n=="string"&&n&&n!=="0"&&(t+=1)}catch{}t>0?(C.badge.textContent=t>99?"99+":String(t),C.badge.classList.add("has-count")):(C.badge.textContent="0",C.badge.classList.remove("has-count"))}function Ol(){C.phoneTime&&(C.phoneTime.textContent=yx())}function AC(){Ol();let t=new Date,e=(60-t.getSeconds())*1e3-t.getMilliseconds();C.timeTimer=setTimeout(function(){Ol(),C.timeTimer=setInterval(Ol,6e4)},Math.max(500,e))}function CC(){C.timeTimer!=null&&(clearTimeout(C.timeTimer),clearInterval(C.timeTimer),C.timeTimer=null)}function Kx(t){C.root&&(C.root.style.left=`${t.x}px`,C.root.style.top=`${t.y}px`)}function kC(t){try{Ba.set(sp,{x:t.x,y:t.y})}catch(e){At.warn(`\u4F4D\u7F6E\u6301\u4E45\u5316\u5931\u8D25: ${e?.message||e}`)}}function MC(){let t=C.itemRegistry;t.registerItem({id:"open-main-ui",label:"\u4E3B\u9762\u677F",group:"shortcuts",kind:"button",order:10,dock:!0,icon:IC,iconColor:"linear-gradient(140deg, #7bb7ff 0%, #4a7ec6 100%)",onClick:e=>{if(typeof C.openPopupRef=="function")try{C.openPopupRef()}catch(r){At.error(`\u6253\u5F00\u4E3B\u9762\u677F\u5931\u8D25: ${r?.message||r}`,r)}else At.warn("openPopup \u672A\u63D0\u4F9B");e.closeMenu()}}),t.registerItem({id:"compact-mode",label:"\u7D27\u51D1\u6A21\u5F0F",group:"preferences",groupTitle:"\u504F\u597D",kind:"toggle",order:10,icon:RC,iconColor:"linear-gradient(140deg, #3a3d4a 0%, #1f2128 100%)",getState:()=>{try{return St.getUiSettings()?.compactMode?"on":"off"}catch{return"off"}},onClick:async()=>{try{let e=St.getUiSettings()?.compactMode===!0;St.updateUiSettings({compactMode:!e})}catch(e){At.error(`\u5207\u6362\u7D27\u51D1\u6A21\u5F0F\u5931\u8D25: ${e?.message||e}`,e)}}})}function PC(){let t=()=>{C.itemRegistry?.refresh?.("compact-mode")},e=G.on(W.SETTINGS_UPDATED,t);C.unsubscribers.push(()=>{typeof e=="function"&&e()})}function NC(){qx({id:"demo-hello",label:"Demo",icon:"\u{1F44B}",iconColor:"linear-gradient(140deg, #ff9966 0%, #ff5e62 100%)",title:"Hello",group:"apps",groupTitle:"\u5E94\u7528",order:50,rootView:{id:"home",title:"\u9996\u9875",render:t=>$C(t)}});try{Bx({floatingBall:hp,parentStorage:Ba,parentLogger:At,targetDoc:C.targetDoc})}catch(t){At.error(`registerQQApp \u5931\u8D25: ${t?.message||t}`,t)}}function $C(t){let e=C.targetDoc,r=e.createElement("div");r.style.cssText="padding:20px;color:rgba(255,255,255,0.85);";let n=e.createElement("p");n.textContent="\u8FD9\u662F Phase A1 demo App\u3002\u7528\u6765\u9A8C\u8BC1\u6D6E\u7403 App \u89C6\u56FE\u6808\u57FA\u7840\u8BBE\u65BD\u3002",n.style.cssText="margin:0 0 16px 0;font-size:12px;line-height:1.6;",r.appendChild(n);let s=e.createElement("button");s.type="button",s.textContent="\u524D\u5F80\u8BE6\u60C5 \u2192",s.style.cssText="padding:10px 18px;border-radius:10px;background:linear-gradient(140deg,#5b9bd9,#3a6db5);color:#fff;border:none;cursor:pointer;font-size:12px;font-weight:600;box-shadow:0 4px 12px rgba(91,155,217,0.3);",s.addEventListener("click",()=>{t.pushView({id:"detail",title:"\u8BE6\u60C5",render:()=>LC(t)})}),r.appendChild(s);let o=e.createElement("p");return o.textContent="\u70B9\u51FB\u5E95\u90E8 home indicator \u6216\u9876\u90E8 \u2190 \u53EF\u9000\u6808\u3002",o.style.cssText="margin:16px 0 0 0;font-size:11px;color:rgba(255,255,255,0.5);line-height:1.5;",r.appendChild(o),r}function LC(t){let e=C.targetDoc,r=e.createElement("div");r.style.cssText="padding:20px;color:rgba(255,255,255,0.85);";let n=e.createElement("p");n.textContent="\u8FD9\u662F\u8BE6\u60C5\u89C6\u56FE\uFF0C\u4ECE\u9996\u9875 push \u8FDB\u6765\u3002",n.style.cssText="margin:0 0 12px 0;font-size:12px;line-height:1.6;",r.appendChild(n);let s=e.createElement("p");s.textContent=`\u5F53\u524D\u6808\u6DF1\u5EA6: ${t.getStackDepth()}`,s.style.cssText="margin:0 0 16px 0;font-size:11px;color:rgba(255,255,255,0.5);",r.appendChild(s);let o=e.createElement("button");return o.type="button",o.textContent="\u5173\u95ED\u6574\u4E2A App",o.style.cssText="padding:8px 14px;border-radius:8px;background:rgba(255,255,255,0.08);color:#fff;border:1px solid rgba(255,255,255,0.15);cursor:pointer;font-size:11px;",o.addEventListener("click",()=>t.closeApp()),r.appendChild(o),r}function mp(){if(!(!C.inited&&!C.root)){CC();try{C.appController?.destroyAll?.()}catch{}C.itemElCache.forEach(({destroy:t})=>{if(typeof t=="function")try{t()}catch{}}),C.itemElCache.clear(),C.unsubscribers.forEach(t=>{try{t()}catch{}});try{C.itemRegistry?.destroyAll?.()}catch{}try{C.cleanupRegistry?.removeAll?.()}catch{}C.root&&typeof C.root.remove=="function"&&C.root.remove(),C.styleEl&&typeof C.styleEl.remove=="function"&&C.styleEl.remove();try{Dx(C.targetDoc)}catch{}try{C.targetWin&&C.targetWin[ho]===mp&&delete C.targetWin[ho]}catch{}Ux(),C.destroyed=!0,At.log("\u6D6E\u7403\u5DF2\u9500\u6BC1")}}function OC(t={}){let e=t.targetDocument||document,r=t.targetWindow||window;try{if(typeof r[ho]=="function")try{r[ho]()}catch{}}catch{}dx(e),Ux(),C.targetDoc=e,C.targetWin=r,C.openPopupRef=typeof t.openPopup=="function"?t.openPopup:null,C.styleEl=cx(e,`${B}-style`,ax());let n=lx(e);C.root=n.root,C.orb=n.orb,C.menu=n.menu,C.phoneScreen=n.phoneScreen,C.phoneContent=n.phoneContent,C.phoneDock=n.phoneDock,C.phoneTime=n.phoneTime,C.dragHandle=n.dragHandle,C.menuClose=n.menuClose,C.badge=n.badge;let s=Ba.get(sp,null),o=s&&Number.isFinite(s.x)&&Number.isFinite(s.y)?op(s,r):px(r);Kx(o),(e.body||e.documentElement).appendChild(C.root),C.cleanupRegistry=ux(),C.mutex=cp(),C.menuController=xx({root:C.root,menu:C.menu,targetWindow:r,onOpen:()=>{Ll(),Da(),Ol()},onClose:()=>{}}),C.dragController=mx({root:C.root,orb:C.orb,menuHead:C.dragHandle,targetDocument:e,targetWindow:r,on:C.cleanupRegistry.on,savePosition:kC,onTapWhenNotDragged:()=>C.menuController.toggle(),onDragMove:()=>{C.menuController.isOpen()&&C.menuController.updateDirection()}}),C.itemRegistry=vx({onChange:()=>{C.menuController.isOpen()&&(Ll(),Da()),gp()},onRefresh:i=>{i==null?Da():Wx(i)}}),C.appController=_x({targetDoc:e,mountPoint:C.phoneContent,mutex:cp(),storage:Ba,logger:At,closeMenu:()=>C.menuController?.close?.(),onAppClosed:()=>{C.menuController?.isOpen?.()&&(Ll(),Da())}}),C.cleanupRegistry.on(e,"click",i=>{C.menuController.isOpen()&&(C.dragController.isDragging()||C.root.contains(i.target)||C.menuController.close())}),C.cleanupRegistry.on(C.menuClose,"click",i=>{i.stopPropagation(),C.menuController.close()}),C.cleanupRegistry.on(r,"resize",()=>{if(!C.root)return;let i={x:parseInt(C.root.style.left,10)||0,y:parseInt(C.root.style.top,10)||0},l=op(i,r);Kx(l),C.menuController.isOpen()&&C.menuController.updateDirection()});let a=C.phoneScreen?.querySelector?.(".phone-home-indicator");a&&C.cleanupRegistry.on(a,"click",i=>{C.appController?.hasActiveApp?.()&&(i.stopPropagation(),C.appController.popView())}),MC(),C.inited=!0,NC(),PC(),gp(),AC();try{r[ho]=mp}catch{}At.log("\u6D6E\u7403\u5DF2\u521D\u59CB\u5316")}function Hx(){return C.inited===!0&&!!C.root}function Rt(t){return Hx()?!0:(At.warn(`\u6D6E\u7403\u672A\u5C31\u7EEA\uFF0C${t} \u88AB\u5FFD\u7565`),!1)}function DC(t){return Rt("registerItem")?C.itemRegistry.registerItem(t):()=>{}}function BC(t){return Rt("unregisterItem")?C.itemRegistry.unregisterItem(t):!1}function zC(t,e){if(!Rt("updateItem"))return!1;let r=C.itemRegistry.updateItem(t,e);return r&&C.menuController.isOpen()&&(Ll(),Da()),r}function KC(t){Rt("refresh")&&C.itemRegistry.refresh(t)}function jC(t){Rt("setVisible")&&C.root.classList.toggle("is-hidden",!t)}function UC(){Rt("openMenu")&&C.menuController.open()}function FC(){Rt("closeMenu")&&C.menuController.close()}function WC(t){Rt("toggleMenu")&&(t===!0?C.menuController.open():t===!1?C.menuController.close():C.menuController.toggle())}function qx(t){if(!Rt("registerApp"))return()=>{};if(!t||!t.id)return At.warn("registerApp: \u7F3A\u5C11 id"),()=>{};try{C.appController.registerApp(t)}catch(r){return At.error(`registerApp \u5931\u8D25: ${r?.message||r}`,r),()=>{}}let e={id:t.id,label:t.label,kind:"app",icon:t.icon,iconColor:t.iconColor,group:t.group||"apps",groupTitle:t.groupTitle||"\u5E94\u7528",order:typeof t.order=="number"?t.order:100,badge:t.badge,visible:t.visible,onClick:async()=>{try{await C.appController?.openApp?.(t.id)}catch(r){At.error(`openApp ${t.id} \u5931\u8D25: ${r?.message||r}`,r)}}};try{C.itemRegistry.registerItem(e)}catch(r){At.error(`\u5408\u6210 App icon \u5931\u8D25: ${r?.message||r}`,r);try{C.appController.unregisterApp(t.id)}catch{}return()=>{}}return()=>Gx(t.id)}function Gx(t){if(!Rt("unregisterApp"))return!1;let e=!1;try{e=!!C.appController?.unregisterApp?.(t)}catch{}let r=C.itemRegistry.unregisterItem(t);return e||r}function HC(t){return Rt("openApp")?(C.menuController.isOpen()||C.menuController.open(),C.appController.openApp(t)):!1}function qC(){return Rt("closeApp")?C.appController.closeApp():!1}function GC(t){return Rt("pushView")?C.appController.pushView(t):!1}function YC(){return Rt("popView")?C.appController.popView():!1}function VC(t){return Rt("replaceView")?C.appController.replaceView(t):!1}var At,Ba,C,IC,RC,hp,JC,Vx=O(()=>{Ve();J();ct();Zs();bo();ix();fx();hx();lp();Sx();Ex();zx();fp();At=N.createScope("FloatingBall"),Ba=U.namespace(ox),C=jx();IC=`
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
    <line x1="6" y1="18" x2="14" y2="10" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
    <path d="M15.5 4 L16.5 7.5 L20 8.5 L16.5 9.5 L15.5 13 L14.5 9.5 L11 8.5 L14.5 7.5 Z" fill="#fff"/>
  </svg>
`,RC=`
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
    <path d="M13 2 L4 14 L11 14 L10 22 L20 9 L13 9 Z" fill="currentColor" stroke="none"/>
  </svg>
`;hp={init:OC,destroy:mp,isReady:Hx,registerItem:DC,unregisterItem:BC,updateItem:zC,refresh:KC,setVisible:jC,openMenu:UC,closeMenu:FC,toggleMenu:WC,registerApp:qx,unregisterApp:Gx,openApp:HC,closeApp:qC,pushView:GC,popView:YC,replaceView:VC},JC=hp});var xp={};ge(xp,{confirmDeleteTool:()=>r1,confirmResetTools:()=>o1,getAllTools:()=>Tr,getTool:()=>_r,showExportToolsDialog:()=>n1,showImportToolsDialog:()=>s1,showToolEditDialog:()=>t1});async function t1(t=null){let e=t?_r(t):null,r=!!e,n=ve({value:e?.name||"",placeholder:"\u5DE5\u5177\u540D\u79F0"}),s=Me({value:e?.category||"utility",options:e1}),o=ve({value:e?.description||"",placeholder:"\u5DE5\u5177\u63CF\u8FF0"}),a=f("input",{className:"yyt-input",attrs:{type:"number",min:"1000"},style:{padding:"7px 10px",fontSize:"12px"}});a.value=String(e?.config?.execution?.timeout||6e4);let i=f("input",{className:"yyt-input",attrs:{type:"number",min:"0",max:"10"},style:{padding:"7px 10px",fontSize:"12px"}});i.value=String(e?.config?.execution?.retries??3);function l(p,g,m=""){let h=f("div",{className:"yyt-form-group",style:{margin:"0 0 12px 0"}});return h.appendChild(f("label",{text:p,style:{fontSize:"12px",fontWeight:"600",color:"var(--yyt-text-secondary, rgba(255,255,255,0.55))",display:"block",marginBottom:"4px"}})),h.appendChild(g),m&&h.appendChild(f("div",{text:m,style:{fontSize:"11px",color:"var(--yyt-text-muted)",marginTop:"4px"}})),h}let d=f("div",{style:{display:"flex",flexDirection:"column"}}),c=f("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px"}});c.appendChild(l("\u5DE5\u5177\u540D\u79F0",n.el)),c.appendChild(l("\u5206\u7C7B",s.el)),d.appendChild(c),d.appendChild(l("\u63CF\u8FF0",o.el));let u=f("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px"}});u.appendChild(l("\u8D85\u65F6\u65F6\u95F4 (ms)",a)),u.appendChild(l("\u91CD\u8BD5\u6B21\u6570",i)),d.appendChild(u);let y=Ee.custom({title:r?`\u7F16\u8F91\u5DE5\u5177\u300C${e.name}\u300D`:"\u65B0\u5EFA\u5DE5\u5177",width:"480px",body:d,buttons:[{label:"\u53D6\u6D88",variant:"ghost",onClick:p=>p(null)},{label:r?"\u4FDD\u5B58":"\u521B\u5EFA",variant:"primary",onClick:p=>{let g=String(n.get()||"").trim();if(!g){n.el.focus();return}let m=t||`tool_${Date.now()}`;if(!ks(m,{name:g,category:s.get(),description:String(o.get()||"").trim(),promptTemplate:e?.promptTemplate||"",extractTags:Array.isArray(e?.extractTags)?e.extractTags:[],config:{execution:{timeout:Math.max(1e3,parseInt(a.value,10)||6e4),retries:Math.max(0,parseInt(i.value,10)||3)},api:e?.config?.api||{preset:"",useBypass:!1,bypassPreset:""},messages:Array.isArray(e?.config?.messages)?e.config.messages:[],context:{depth:e?.config?.context?.depth||3,includeTags:Array.isArray(e?.config?.context?.includeTags)?e.config.context.includeTags:[],excludeTags:Array.isArray(e?.config?.context?.excludeTags)?e.config.context.excludeTags:[]},worldbooks:{enabled:e?.config?.worldbooks?.enabled===!0,selected:Array.isArray(e?.config?.worldbooks?.selected)?e.config.worldbooks.selected:[]}},enabled:e?.enabled!==!1})){bp.warn("saveTool \u5931\u8D25",{id:m});return}try{$s(m)}catch(b){bp.warn("ensureToolRuntimeConfig \u5F02\u5E38",{err:b})}p(m)}}]});return setTimeout(()=>n.el.focus(),0),y.result}async function r1(t){let e=_r(t);return!e||!await Ee.confirm({title:"\u5220\u9664\u5DE5\u5177",message:`\u786E\u5B9A\u5220\u9664\u5DE5\u5177\u300C${e.name}\u300D\uFF1F\u6B64\u64CD\u4F5C\u4E0D\u53EF\u64A4\u9500\u3002`,confirmText:"\u5220\u9664",danger:!0})?!1:Is(t)}function n1(){let t;try{t=Rs()}catch(r){Ee.confirm({title:"\u5BFC\u51FA\u5931\u8D25",message:String(r?.message||r),confirmText:"\u786E\u5B9A"});return}let e=f("textarea",{className:"yyt-textarea",style:{width:"100%",minHeight:"220px",fontSize:"12px",fontFamily:"monospace"}});e.value=t,e.readOnly=!0,Ee.custom({title:"\u5BFC\u51FA\u5DE5\u5177 JSON",width:"600px",body:e,buttons:[{label:"\u5173\u95ED",variant:"ghost",onClick:r=>r(null)},{label:"\u590D\u5236\u5230\u526A\u8D34\u677F",variant:"ghost",onClick:async()=>{try{await navigator.clipboard.writeText(t)}catch{e.select();try{document.execCommand("copy")}catch{}}}},{label:"\u4E0B\u8F7D JSON",variant:"primary",onClick:()=>{try{let r=new Blob([t],{type:"application/json"}),n=URL.createObjectURL(r),s=f("a",{attrs:{href:n,download:`youyou_tools_${Date.now()}.json`}});document.body.appendChild(s),s.click(),setTimeout(()=>{try{document.body.removeChild(s)}catch{}try{URL.revokeObjectURL(n)}catch{}},100)}catch(r){bp.warn("\u4E0B\u8F7D\u5931\u8D25",{err:r})}}}]})}async function s1(){let t=f("textarea",{className:"yyt-textarea",attrs:{placeholder:"\u7C98\u8D34 YouYou Toolkit \u5DE5\u5177 JSON"},style:{width:"100%",minHeight:"200px",fontSize:"12px",fontFamily:"monospace"}}),e=f("label",{style:{display:"flex",alignItems:"center",gap:"6px",fontSize:"12px",color:"var(--yyt-text-secondary)",marginTop:"8px"}}),r=f("input",{attrs:{type:"checkbox"}});e.appendChild(r),e.appendChild(f("span",{text:"\u8986\u76D6\u6A21\u5F0F\uFF08\u6E05\u7A7A\u5DF2\u6709\u5DE5\u5177\u540E\u518D\u5BFC\u5165\uFF1B\u4E0D\u52FE\u9009\u5219\u5408\u5E76\uFF09"}));let n=f("div");n.appendChild(t),n.appendChild(e),n.appendChild(f("div",{style:{display:"flex",gap:"6px",marginTop:"8px"}},te({label:"\u{1F4C1} \u4ECE\u6587\u4EF6\u2026",size:"small",variant:"ghost",onClick:()=>{let o=f("input",{attrs:{type:"file",accept:"application/json,.json"}});o.addEventListener("change",()=>{let a=o.files?.[0];if(!a)return;let i=new FileReader;i.onload=()=>{t.value=String(i.result||""),t.focus()},i.readAsText(a)}),o.click()}}).el));let s=Ee.custom({title:"\u5BFC\u5165\u5DE5\u5177 JSON",width:"520px",body:n,buttons:[{label:"\u53D6\u6D88",variant:"ghost",onClick:o=>o(null)},{label:"\u5BFC\u5165",variant:"primary",onClick:async o=>{let a=t.value.trim();if(!a){o(null);return}try{let i=Ms(a,{overwrite:r.checked});o(i)}catch(i){await Ee.confirm({title:"\u5BFC\u5165\u5931\u8D25",message:String(i?.message||i),confirmText:"\u786E\u5B9A"})}}}]});return setTimeout(()=>t.focus(),0),s.result}async function o1(){return await Ee.confirm({title:"\u91CD\u7F6E\u6240\u6709\u5DE5\u5177",message:"\u6B64\u64CD\u4F5C\u4F1A\u5220\u9664\u6240\u6709\u81EA\u5B9A\u4E49\u5DE5\u5177\u4E0E\u9884\u8BBE\uFF0C\u4E0D\u53EF\u64A4\u9500\u3002\u5185\u7F6E\u5DE5\u5177\u4E0D\u53D7\u5F71\u54CD\u3002",confirmText:"\u91CD\u7F6E",danger:!0})?(Ps(),!0):!1}var bp,e1,wp=O(()=>{Po();Wt();Fo();Ar();J();bp=N.createScope("ToolActions"),e1=[{value:"api",label:"API"},{value:"prompt",label:"Prompt"},{value:"utility",label:"Utility"}]});J();var _p=`/**\r
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
`;ut();function Jx(t,e={}){let{constants:r,topLevelWindow:n,modules:s}=t,{SCRIPT_ID:o,SCRIPT_VERSION:a,MENU_ITEM_ID:i,MENU_CONTAINER_ID:l}=r,d=null,c=!1,u=N.createScope("Bootstrap");N.setToastHandler((T,I,S)=>{if(S.toast&&Wa(S.toast===!0?T:S.toast,I,S.duration),S.topNotice){let A=typeof S.topNotice=="object"?S.topNotice:{};ql(T,I,A)}});function y(...T){u.log(T.join(" "))}function p(...T){u.error(T.join(" "))}async function g(){return d||(d=(async()=>{try{s.storageModule=await Promise.resolve().then(()=>(Ve(),zp)),s.apiConnectionModule=await Promise.resolve().then(()=>(Io(),Wp)),s.presetManagerModule=await Promise.resolve().then(()=>(ws(),Yp)),s.uiModule=await Promise.resolve().then(()=>(qb(),Hb)),s.regexExtractorModule=await Promise.resolve().then(()=>(Cs(),Mc)),s.toolManagerModule=await Promise.resolve().then(()=>(Fo(),af)),s.toolExecutorModule=await Promise.resolve().then(()=>(Od(),Ld)),s.windowManagerModule=await Promise.resolve().then(()=>(yu(),eb)),s.toolRegistryModule=await Promise.resolve().then(()=>(Ar(),zc)),s.settingsServiceModule=await Promise.resolve().then(()=>(Zs(),rm)),s.bypassManagerModule=await Promise.resolve().then(()=>(Qs(),tm)),s.variableResolverModule=await Promise.resolve().then(()=>(Wi(),am)),s.contextInjectorModule=await Promise.resolve().then(()=>(ns(),sm)),s.toolPromptServiceModule=await Promise.resolve().then(()=>(qi(),cm)),s.toolOutputServiceModule=await Promise.resolve().then(()=>(la(),um)),s.toolAutomationServiceModule=await Promise.resolve().then(()=>(Zb(),Qb)),s.toolDataProviderModule=await Promise.resolve().then(()=>(Ws(),cg)),s.presetBootstrapModule=await Promise.resolve().then(()=>(sx(),nx)),s.floatingBallModule=await Promise.resolve().then(()=>(Vx(),Yx));try{s.toolDataProviderModule.getToolDataProvider({extensionVersion:a}).then(T=>{u.log(`Provider \u5C31\u7EEA: ${T.kind}`)}).catch(T=>{u.error(`Provider \u521D\u59CB\u5316\u5F02\u5E38: ${T?.message||T}`)})}catch(T){u.error(`Provider \u542F\u52A8\u5F02\u5E38: ${T?.message||T}`)}return s.toolOutputServiceModule?.toolOutputService&&s.apiConnectionModule&&s.toolOutputServiceModule.toolOutputService.setApiConnection(s.apiConnectionModule),!0}catch(T){return d=null,p("\u6A21\u5757\u52A0\u8F7D\u5931\u8D25\uFF0C\u4F7F\u7528\u5185\u7F6E\u529F\u80FD:",T),p("\u5DF2\u52A0\u8F7D\u6A21\u5757:",Object.keys(s).filter(I=>s[I])),!1}})(),d)}function m(){let T=`${o}-styles`,I=n.document||document;if(I.getElementById(T))return;let S=I.createElement("style");S.id=T,S.textContent=_p,(I.head||I.documentElement).appendChild(S),y("\u6837\u5F0F\u5DF2\u6CE8\u5165")}function h(){let T=n.document||document;if(s.uiModule?.getAllStyles){let I=`${o}-ui-styles`;if(!T.getElementById(I)){let S=T.createElement("style");S.id=I,S.textContent=s.uiModule.getAllStyles(),(T.head||T.documentElement).appendChild(S)}}}async function b(){try{let{applyUiPreferences:T}=await Promise.resolve().then(()=>(qd(),Hd));if(s.settingsServiceModule?.settingsService){let I=s.settingsServiceModule.settingsService.getUiSettings();if(I&&I.theme){let S=n.document||document;T(I,S),y(`\u4E3B\u9898\u5DF2\u5E94\u7528: ${I.theme}`)}}}catch(T){y("\u4E3B\u9898\u52A0\u8F7D\u5931\u8D25:",T)}}function x(){let T=n.jQuery||window.jQuery;if(!T){p("jQuery \u672A\u627E\u5230\uFF0C\u5EF6\u8FDF\u91CD\u8BD5..."),setTimeout(x,1e3);return}let I=n.document||document,S=T("#extensionsMenu",I);if(!S.length){y("\u9B54\u68D2\u83DC\u5355\u672A\u627E\u5230\uFF0C\u5EF6\u8FDF\u91CD\u8BD5..."),setTimeout(x,2e3);return}if(T(`#${l}`,S).length>0){y("\u83DC\u5355\u9879\u5DF2\u5B58\u5728");return}let P=T(`<div class="extension_container interactable" id="${l}" tabindex="0"></div>`),M=`
      <div class="list-group-item flex-container flexGap5 interactable" id="${i}" title="\u6253\u5F00 YouYou \u5DE5\u5177\u7BB1">
        <div class="fa-fw fa-solid fa-wand-magic-sparkles extensionsMenuExtensionButton"></div>
        <span>YouYou \u5DE5\u5177\u7BB1</span>
      </div>
    `,R=T(M);R.on("click",function($){$.stopPropagation(),y("\u83DC\u5355\u9879\u88AB\u70B9\u51FB");let F=T("#extensionsMenuButton",I);F.length&&S.is(":visible")&&F.trigger("click"),typeof e.openPopup=="function"&&e.openPopup()}),P.append(R),S.append(P),y("\u83DC\u5355\u9879\u5DF2\u6DFB\u52A0\u5230\u9B54\u68D2\u533A")}async function w(){y(`\u521D\u59CB\u5316\u5F00\u59CB... \u7248\u672C: ${a}`),await m();let T=await g();if(y(T?"\u6240\u6709\u6A21\u5757\u52A0\u8F7D\u6210\u529F":"\u90E8\u5206\u6A21\u5757\u52A0\u8F7D\u5931\u8D25\uFF0C\u4F7F\u7528\u53EF\u7528\u529F\u80FD"),!c&&s.uiModule?.initUI)try{await s.uiModule.initUI({services:s,autoInjectStyles:!1,targetDocument:n.document||document}),c=!0,y("UI \u88C5\u914D\u4E2D\u5FC3\u5DF2\u521D\u59CB\u5316")}catch(S){p("UI \u6A21\u5757\u521D\u59CB\u5316\u5931\u8D25:",S)}if(s.uiModule&&(h(),await b()),s.presetBootstrapModule?.ensurePresetSystem)try{let S=s.presetBootstrapModule.ensurePresetSystem();S?.aborted?y(`\u9884\u8BBE\u7CFB\u7EDF\u8FC1\u79FB\u5931\u8D25\u5DF2 abort\uFF0C\u8001\u5B57\u6BB5\u4FDD\u7559: ${S.error}`):S?.skipped?y(`\u9884\u8BBE\u7CFB\u7EDF\u5DF2\u5C31\u7EEA\uFF08${S.reason}\uFF09`):y(`\u9884\u8BBE\u7CFB\u7EDF\u8FC1\u79FB\u5B8C\u6210\uFF08${S.migratedCount}/${S.total} \u5DE5\u5177\uFF09`)}catch(S){p("\u9884\u8BBE\u7CFB\u7EDF\u521D\u59CB\u5316\u5F02\u5E38:",S)}if(s.toolAutomationServiceModule?.toolAutomationService){let S=s.toolAutomationServiceModule.toolAutomationService.init();y(S?"\u81EA\u52A8\u5316\u751F\u547D\u5468\u671F\u670D\u52A1\u5DF2\u521D\u59CB\u5316":"\u81EA\u52A8\u5316\u751F\u547D\u5468\u671F\u670D\u52A1\u521D\u59CB\u5316\u672A\u5B8C\u6210\uFF0C\u7B49\u5F85\u5BBF\u4E3B\u4E8B\u4EF6\u6E90\u91CD\u8BD5")}let I=n.document||document;if(I.readyState==="loading"?I.addEventListener("DOMContentLoaded",()=>{setTimeout(x,1e3)}):setTimeout(x,1e3),s.floatingBallModule?.floatingBall)try{s.floatingBallModule.floatingBall.init({targetDocument:n.document||document,targetWindow:n||window,openPopup:e.openPopup})}catch(S){p("\u6D6E\u7403\u521D\u59CB\u5316\u5931\u8D25:",S)}y("\u521D\u59CB\u5316\u5B8C\u6210")}return{loadModules:g,injectStyles:m,addMenuItem:x,init:w,log:y,logError:p}}ct();ut();ut();J();var xo=N.createScope("PromptEditor"),XC="youyou_toolkit_prompt_editor",QC={system:"System Prompt (\u7CFB\u7EDF\u63D0\u793A\u8BCD)",ai:"AI Prompt (AI\u6307\u4EE4\u63D0\u793A\u8BCD)",user:"User Prompt (\u7528\u6237\u63D0\u793A\u8BCD)"},ZC={system:"fa-server",ai:"fa-robot",user:"fa-user"},za=[{id:"system_1",type:"system",role:"SYSTEM",mainSlot:"",content:"",deletable:!1,expanded:!0},{id:"ai_1",type:"ai",role:"USER",mainSlot:"A",content:"",deletable:!1,expanded:!0,isMain:!0},{id:"user_1",type:"user",role:"USER",mainSlot:"B",content:"",deletable:!1,expanded:!0,isMain2:!0}],Dl=class{constructor(e={}){this.containerId=e.containerId||XC,this.segments=e.segments||[...za],this.onChange=e.onChange||null,this.editable=e.editable!==!1,this.showMainSlot=e.showMainSlot!==!1,this.$container=null,this.$=null}init(e){if(this.$=window.jQuery||window.parent?.jQuery,!this.$){xo.error("jQuery not available");return}this.$container=e,this.render(),this.bindEvents()}setSegments(e){this.segments=e&&Array.isArray(e)?[...e]:[...za],this.$container&&(this.render(),this.bindEvents())}getSegments(){return this.segments.map(e=>({...e,content:this.getSegmentContent(e.id)}))}getSegmentContent(e){return this.$container&&this.$container.find(`[data-segment-id="${e}"] .yyt-prompt-textarea`).val()||""}render(){if(!this.$container)return;let e=`
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
    `;this.$container.html(e)}renderSegment(e){let r=QC[e.type]||e.type,n=ZC[e.type]||"fa-file",s=e.mainSlot==="A"||e.isMain,o=e.mainSlot==="B"||e.isMain2,a=s?"var(--yyt-accent, #7bb7ff)":o?"#ffb74d":"",i=this.showMainSlot&&e.mainSlot?`<span class="yyt-prompt-slot-badge">mainSlot: ${e.mainSlot}</span>`:"",l=`<span class="yyt-prompt-role-badge">role: ${e.role||"USER"}</span>`;return`
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
    `}bindEvents(){this.$container&&(Ut(this.$container,"yytPromptEditorSelect"),this.$container.off(".yytPromptEditor"),this.$container.on("click.yytPromptEditor",".yyt-prompt-toggle",e=>{this.$(e.currentTarget).closest(".yyt-prompt-segment").toggleClass("yyt-expanded"),this.$(e.currentTarget).find("i").toggleClass("fa-chevron-up fa-chevron-down")}),this.$container.on("click.yytPromptEditor",".yyt-prompt-delete",e=>{let r=this.$(e.currentTarget).closest(".yyt-prompt-segment").data("segment-id");this.deleteSegment(r)}),this.$container.on("change.yytPromptEditor",".yyt-prompt-role",e=>{let r=this.$(e.currentTarget).closest(".yyt-prompt-segment").data("segment-id"),n=this.$(e.currentTarget).val();this.updateSegmentMeta(r,{role:n})}),this.$container.on("change.yytPromptEditor",".yyt-prompt-main-slot",e=>{let r=this.$(e.currentTarget).closest(".yyt-prompt-segment").data("segment-id"),n=this.$(e.currentTarget).val();this.updateSegmentMeta(r,{mainSlot:n})}),this.$container.on("input.yytPromptEditor",".yyt-prompt-textarea",e=>{this.onChange&&this.onChange(this.getSegments())}),this.$container.on("click.yytPromptEditor",`#${this.containerId}-add-segment`,()=>{this.addSegment()}),this.$container.on("click.yytPromptEditor",`#${this.containerId}-import-prompt`,()=>{this.importPrompt()}),this.$container.on("click.yytPromptEditor",`#${this.containerId}-export-prompt`,()=>{this.exportPrompt()}),br(this.$container,{namespace:"yytPromptEditorSelect",selectors:[".yyt-prompt-role",".yyt-prompt-main-slot"]}))}addSegment(e=null){let r=`segment_${Date.now()}`,n=e||{id:r,type:"user",role:"USER",mainSlot:"",content:"",deletable:!0,expanded:!0};n.id||(n.id=r),this.segments.push(n),this.render(),this.bindEvents(),this.onChange&&this.onChange(this.getSegments())}deleteSegment(e){let r=this.segments.findIndex(s=>s.id===e);if(r===-1)return;if(this.segments[r].deletable===!1){xo.warn("\u8BE5\u6BB5\u843D\u4E0D\u53EF\u5220\u9664");return}this.segments.splice(r,1),this.render(),this.bindEvents(),this.onChange&&this.onChange(this.getSegments())}updateSegmentMeta(e,r){let n=this.segments.find(s=>s.id===e);n&&(Object.assign(n,r),this.onChange&&this.onChange(this.getSegments()))}importPrompt(){let e=document.createElement("input");e.type="file",e.accept=".json",e.onchange=r=>{let n=r.target.files[0];if(!n)return;let s=new FileReader;s.onload=o=>{try{let a=JSON.parse(o.target.result);Array.isArray(a)?(this.setSegments(a),xo.log("\u63D0\u793A\u8BCD\u5BFC\u5165\u6210\u529F")):xo.error("\u65E0\u6548\u7684\u63D0\u793A\u8BCD\u683C\u5F0F")}catch(a){xo.error("\u5BFC\u5165\u5931\u8D25:",a)}},s.readAsText(n)},e.click()}exportPrompt(){let e=this.getSegments(),r=JSON.stringify(e,null,2),n=new Blob([r],{type:"application/json"}),s=URL.createObjectURL(n),o=document.createElement("a");o.href=s,o.download=`prompt_group_${Date.now()}.json`,o.click(),URL.revokeObjectURL(s),xo.log("\u63D0\u793A\u8BCD\u5DF2\u5BFC\u51FA")}destroy(){this.$container&&(Ut(this.$container,"yytPromptEditorSelect"),this.$container.off(".yytPromptEditor"))}escapeHtml(e){return typeof e!="string"?"":e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}};function Xx(){return`
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
  `}function Qx(t){return t.filter(e=>e.content&&e.content.trim()).map(e=>({role:e.role,content:e.content,deletable:e.deletable,mainSlot:e.mainSlot}))}function Zx(t){return Array.isArray(t)?t.map((e,r)=>({id:`segment_${r}_${Date.now()}`,type:e.role==="SYSTEM"?"system":e.role==="assistant"?"ai":"user",role:e.role,mainSlot:e.mainSlot||"",content:e.content||"",deletable:e.deletable!==!1,expanded:!0,isMain:e.mainSlot==="A"||e.isMain,isMain2:e.mainSlot==="B"||e.isMain2})):[...za]}J();function ew(t){let{constants:e,topLevelWindow:r,modules:n,caches:s,uiState:o}=t,{SCRIPT_ID:a,SCRIPT_VERSION:i,POPUP_ID:l}=e,d=N.createScope("PopupShell"),c={cleanup:null},u={cleanups:[]},y={cleanups:[]},p={current:null};function g(){return!!o.sidebarCollapsed}function m(){o.sidebarCollapsed=!o.sidebarCollapsed;let v=o.currentPopup;if(!v)return;let E=v.querySelector(".yyt-shell-sidebar"),D=v.querySelector(".yyt-shell-workspace"),z=v.querySelector(".yyt-sidebar-toggle i");E&&E.classList.toggle("yyt-collapsed",o.sidebarCollapsed),D&&D.classList.toggle("yyt-sidebar-collapsed",o.sidebarCollapsed),z&&(z.className=o.sidebarCollapsed?"fa-solid fa-angles-right":"fa-solid fa-angles-left"),V()}function h(...v){d.log(v.join(" "))}function b(...v){d.error(v.join(" "))}function x(v){return typeof v!="string"?"":v.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function w(){return r.jQuery||window.jQuery}function T(){return r.document||document}function I(v){if(!v)return"\u672A\u9009\u62E9\u9875\u9762";let E=n.toolRegistryModule?.getToolConfig(v);if(!E)return v;if(!E.hasSubTabs)return E.name||v;let D=A(v),z=E.subTabs?.find(H=>H.id===D);return z?.name?`${E.name} / ${z.name}`:E.name||v}function S(v){if(!v)return"\u8BF7\u9009\u62E9\u5DE6\u4FA7\u5BFC\u822A\u4E2D\u7684\u9875\u9762\u8FDB\u884C\u914D\u7F6E\u6216\u6392\u67E5\u3002";let E=n.toolRegistryModule?.getToolConfig(v);if(!E)return"\u5F53\u524D\u9875\u9762\u63CF\u8FF0\u6682\u4E0D\u53EF\u7528\u3002";if(!E.hasSubTabs)return E.description||"\u5728\u8FD9\u91CC\u7BA1\u7406\u5F53\u524D\u9875\u9762\u7684\u914D\u7F6E\u548C\u64CD\u4F5C\u3002";let D=A(v);return E.subTabs?.find(H=>H.id===D)?.description||E.description||"\u5728\u8FD9\u91CC\u7BA1\u7406\u5F53\u524D\u5DE5\u5177\u7684\u6A21\u677F\u3001\u914D\u7F6E\u4E0E\u8C03\u8BD5\u80FD\u529B\u3002"}function A(v,E=""){let D=n.toolRegistryModule?.getToolConfig(v);if(!D?.hasSubTabs||!Array.isArray(D.subTabs)||D.subTabs.length===0)return"";let z=String(E||o.currentSubTab[v]||"").trim(),q=z&&D.subTabs.some(ye=>ye?.id===z)?z:D.subTabs[0]?.id||"";return q&&o.currentSubTab[v]!==q&&(o.currentSubTab[v]=q),q}function P(){let v=o.currentPopup;if(!v)return;let E=I(o.currentMainTab),D=S(o.currentMainTab),z=v.querySelector(".yyt-popup-active-label");z&&(z.textContent=`\u5F53\u524D\uFF1A${E}`);let H=v.querySelector(".yyt-shell-breadcrumb");H&&(H.textContent=E);let q=v.querySelector(".yyt-shell-main-title");q&&(q.textContent=E);let ye=v.querySelector(".yyt-shell-main-description");ye&&(ye.textContent=D)}function M(){typeof c.cleanup=="function"&&(c.cleanup(),c.cleanup=null)}function R(){Array.isArray(u.cleanups)&&(u.cleanups.forEach(v=>{typeof v=="function"&&v()}),u.cleanups=[])}function _(){Array.isArray(y.cleanups)&&(y.cleanups.forEach(v=>{typeof v=="function"&&v()}),y.cleanups=[])}function $(v,E){if(!v||!E)return!1;let D=v.jquery?v[0]:v,z=E.jquery?E[0]:E;return!!(D&&z&&D===z)}function F(v={}){let{container:E=null}=v,D=p.current;if(D&&!(E&&!$(D.container,E))){try{typeof D.destroy=="function"&&D.destroy(D.container)}catch(z){b("\u9500\u6BC1\u52A8\u6001\u9762\u677F host \u5931\u8D25",z)}n.uiModule?.uiManager?.destroyContainerInstance&&n.uiModule.uiManager.destroyContainerInstance(D.container),p.current=null}}function Y(v,E={}){p.current={key:E.key||"",container:v,destroy:typeof E.destroy=="function"?E.destroy:null}}function re(){let v=w();if(!v||!o.currentPopup)return;let E=n.toolRegistryModule?.getToolList()||[],D=v(o.currentPopup).find(".yyt-main-nav");if(!D.length)return;let z=E.map(q=>`
      <div class="yyt-main-nav-item ${q.id===o.currentMainTab?"active":""}" data-tab="${q.id}">
        <div class="yyt-main-nav-icon">
          <i class="fa-solid ${x(q.icon||"fa-file")}"></i>
        </div>
        <div class="yyt-main-nav-copy">
          <span class="yyt-main-nav-name">${x(q.name||q.id)}</span>
          <span class="yyt-main-nav-desc">${x(q.description||"\u8FDB\u5165\u6B64\u9875\u9762\u8FDB\u884C\u914D\u7F6E\u3001\u67E5\u770B\u6216\u7EF4\u62A4\u3002")}</span>
        </div>
      </div>
    `).join("");D.html(z),v(o.currentPopup).find(".yyt-main-nav-item").on("click",function(){let ye=v(this).data("tab");ye&&Rn(ye)});let H=v(o.currentPopup).find(".yyt-shell-sidebar-hint");H.length&&H.text(`${E.length} tabs`)}function ie(){let v=w();if(!v||!o.currentPopup)return;let E=n.toolRegistryModule?.getToolList()||[],D=n.toolRegistryModule?.getToolConfig("tools"),z=Array.isArray(D?.subTabs)?D.subTabs:[],H=z.filter(fe=>fe?.isCustom).length,q=z.filter(fe=>!fe?.isCustom).length,ae=v(o.currentPopup).find(".yyt-shell-sidebar-stats");ae.length&&(ae.find(".yyt-shell-sidebar-stat").eq(0).find(".yyt-shell-sidebar-stat-value").text(String(E.length)),ae.find(".yyt-shell-sidebar-stat").eq(1).find(".yyt-shell-sidebar-stat-value").text(String(q)),ae.find(".yyt-shell-sidebar-stat").eq(2).find(".yyt-shell-sidebar-stat-value").text(String(H)))}function Z(){let v=n.toolRegistryModule?.getToolList()||[];return v.length?(v.some(E=>E.id===o.currentMainTab)||(o.currentMainTab=v[0].id),o.currentMainTab):null}async function we(v={}){let{rebuildNavigation:E=!1,reRenderSubNav:D=!1}=v,z=w();if(!z||!o.currentPopup)return;F();let H=Z();if(!H)return;E&&(re(),ie());let q=n.toolRegistryModule?.getToolConfig(H),ye=!!q?.hasSubTabs,ae=z(o.currentPopup).find(".yyt-sub-nav"),fe=z(o.currentPopup).find(".yyt-content-inner");if(E&&fe.length){let He=new Set(fe.find(".yyt-tab-content").map((Ce,ht)=>z(ht).data("tab")).get());(n.toolRegistryModule?.getToolList()||[]).forEach(Ce=>{He.has(Ce.id)||fe.append(`<div class="yyt-tab-content" data-tab="${x(Ce.id)}"></div>`)}),fe.find(".yyt-tab-content").each((Ce,ht)=>{let Zt=z(ht).data("tab");(n.toolRegistryModule?.getToolList()||[]).some(gr=>gr.id===Zt)||z(ht).remove()})}z(o.currentPopup).find(".yyt-main-nav-item").removeClass("active"),z(o.currentPopup).find(`.yyt-main-nav-item[data-tab="${H}"]`).addClass("active"),z(o.currentPopup).find(".yyt-tab-content").removeClass("active"),z(o.currentPopup).find(`.yyt-tab-content[data-tab="${H}"]`).addClass("active"),ye?(ae.show(),(D||E)&&hs(H,q.subTabs)):ae.hide(),await Vr(H),P(),V()}function Ie(){if(!o.currentPopup)return;R();let v=()=>{if(o.currentMainTab==="presetManagement"){we();return}o.currentMainTab==="tools"&&we({reRenderSubNav:!0})},E=()=>{o.currentMainTab==="tools"?we({rebuildNavigation:!0,reRenderSubNav:!0}):ie()},D=()=>{o.currentMainTab==="tools"&&we({rebuildNavigation:!1,reRenderSubNav:!1})},z=()=>{(o.currentMainTab==="bypass"||o.currentMainTab==="tools")&&we({reRenderSubNav:o.currentMainTab==="tools"})};[W.PRESET_CREATED,W.PRESET_UPDATED,W.PRESET_DELETED].forEach(H=>{u.cleanups.push(G.on(H,v))}),[W.TOOL_REGISTERED,W.TOOL_UPDATED,W.TOOL_UNREGISTERED].forEach(H=>{u.cleanups.push(G.on(H,E))}),u.cleanups.push(G.on(W.TOOL_RUNTIME_UPDATED,D)),[W.BYPASS_PRESET_CREATED,W.BYPASS_PRESET_UPDATED,W.BYPASS_PRESET_DELETED].forEach(H=>{u.cleanups.push(G.on(H,z))})}function X(v){return!!v?.closest?.(["input","textarea","select","button","a","label","summary","details",'[contenteditable="true"]',".yyt-dialog",".yyt-select-dropdown",".yyt-select-portal-layer"].join(","))}function We(v){let E=v?.closest?.(["textarea",".yyt-preview-pre",".yyt-select-dropdown",".yyt-select-portal-layer",".yyt-dialog-body",".yyt-worldbook-list",".yyt-tool-panel",".yyt-panel-section"].join(","));return E?E.scrollHeight>E.clientHeight+2||E.scrollWidth>E.clientWidth+2:!1}function Ae(v,E){return E?.closest?.(".yyt-scrollable-surface")===v}function Be(v,E){if(!v||!E)return null;let D=E.closest?.([".yyt-worldbook-list",".yyt-select-dropdown",".yyt-select-portal-layer",".yyt-dialog-body",".yyt-preview-pre",".yyt-tool-panel",".yyt-panel-section"].join(","));return D&&(D.classList?.contains("yyt-select-portal-layer")||v.contains(D))&&(D.scrollHeight>D.clientHeight+2||D.scrollWidth>D.clientWidth+2)?D:[E.closest?.(".yyt-tool-list"),E.closest?.(".yyt-settings-content"),E.closest?.(".yyt-sub-content"),E.closest?.(".yyt-tab-content.active"),v].filter(Boolean).find(H=>H!==v&&!v.contains(H)?!1:H.scrollHeight>H.clientHeight+2||H.scrollWidth>H.clientWidth+2)||v}function L({mainTab:v=null,includeSubContent:E=!1}={}){let D=o.currentPopup;if(!D)return;let z=D.querySelector(".yyt-content");z&&(z.scrollTop=0,z.scrollLeft=0);let H=v?`.yyt-tab-content[data-tab="${v}"]`:".yyt-tab-content.active",q=D.querySelector(H);if(q&&(q.scrollTop=0,q.scrollLeft=0),!E)return;(q?.querySelectorAll(".yyt-sub-content")||[]).forEach(ae=>{ae.scrollTop=0,ae.scrollLeft=0})}function ee(v){let E=T();if(!v||!E)return;v.classList.add("yyt-scrollable-surface");let D=!1,z=!1,H=0,q=0,ye=0,ae=0,fe=!1,He=!1,Ce=()=>{D=!1,z=!1,v.classList.remove("yyt-scroll-dragging")},ht=se=>{se.button===0&&(X(se.target)||Ae(v,se.target)&&(fe=v.scrollWidth>v.clientWidth+2,He=v.scrollHeight>v.clientHeight+2,!(!fe&&!He)&&(se.stopPropagation(),D=!0,z=!1,H=se.clientX,q=se.clientY,ye=v.scrollLeft,ae=v.scrollTop)))},Zt=se=>{if(!D)return;let Ct=se.clientX-H,dt=se.clientY-q;!(Math.abs(Ct)>4||Math.abs(dt)>4)&&!z||(z=!0,v.classList.add("yyt-scroll-dragging"),fe&&(v.scrollLeft=ye-Ct),He&&(v.scrollTop=ae-dt),se.preventDefault())},gr=()=>{Ce()},Jr=se=>{if(se.ctrlKey||We(se.target)||!v.classList.contains("yyt-content")&&!Ae(v,se.target))return;let dt=Be(v,se.target);!dt||dt!==v&&!v.contains(dt)||!(dt.scrollHeight>dt.clientHeight+2||dt.scrollWidth>dt.clientWidth+2)||(Math.abs(se.deltaY)>0&&(dt.scrollTop+=se.deltaY),Math.abs(se.deltaX)>0&&(dt.scrollLeft+=se.deltaX),se.preventDefault(),se.stopPropagation())},bt=se=>{z&&se.preventDefault()};v.addEventListener("mousedown",ht),v.addEventListener("wheel",Jr,{passive:!1}),v.addEventListener("dragstart",bt),E.addEventListener("mousemove",Zt),E.addEventListener("mouseup",gr),y.cleanups.push(()=>{Ce(),v.classList.remove("yyt-scrollable-surface"),v.removeEventListener("mousedown",ht),v.removeEventListener("wheel",Jr),v.removeEventListener("dragstart",bt),E.removeEventListener("mousemove",Zt),E.removeEventListener("mouseup",gr)})}function V(){let v=o.currentPopup;if(!v)return;_();let E=[...v.querySelectorAll(".yyt-shell-sidebar .yyt-main-nav"),...v.querySelectorAll(".yyt-sub-nav"),...v.querySelectorAll(".yyt-content"),...v.querySelectorAll(".yyt-settings-content"),...v.querySelectorAll(".yyt-tool-list")];[...new Set(E)].forEach(ee)}function le(v){return`
      <div class="yyt-startup-screen" data-yyt-startup-screen>
        <div class="yyt-startup-screen-inner">
          <div class="yyt-startup-screen-kicker">Welcome</div>
          <div class="yyt-startup-screen-title">YouYou \u5DE5\u5177\u7BB1</div>
          <div class="yyt-startup-screen-desc">\u96C6\u4E2D\u7BA1\u7406 API \u9884\u8BBE\u3001\u81EA\u5B9A\u4E49\u5DE5\u5177\u3001\u63D0\u53D6\u89C4\u5219\u3001Ai\u6307\u4EE4\u9884\u8BBE\u4E0E\u8BCA\u65AD\u6D41\u7A0B\u3002\u6BCF\u6B21\u5237\u65B0\u540E\u90FD\u4F1A\u91CD\u65B0\u663E\u793A\uFF0C\u4FBF\u4E8E\u5FEB\u901F\u56DE\u5230\u4ECB\u7ECD\u5165\u53E3\u3002</div>
          <div class="yyt-startup-screen-modules">
            ${(v||[]).slice(0,6).map(D=>`
      <div class="yyt-startup-module-chip">
        <i class="fa-solid ${x(D.icon||"fa-file")}"></i>
        <span>${x(D.name||D.id)}</span>
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
    `}function tt(v){let E=w();if(!E||!o.currentPopup||o.startupScreenDismissed)return;let D=E(o.currentPopup).find(".yyt-popup-body"),z=D.find(".yyt-popup-shell");!D.length||!z.length||D.find("[data-yyt-startup-screen]").length||(z.attr("data-yyt-startup-visible","true"),D.prepend(le(v)),D.find(".yyt-startup-enter").on("click",()=>{D.find("[data-yyt-startup-screen]").remove(),z.removeAttr("data-yyt-startup-visible"),o.startupScreenDismissed=!0,V()}))}function Mt(){let v=T(),E=o.currentPopup,D=E?.querySelector(".yyt-popup-header");if(!E||!D||!v)return;let z=!1,H=0,q=0,ye=0,ae=0,fe="",He=()=>({width:r.innerWidth||v.documentElement?.clientWidth||window.innerWidth||0,height:r.innerHeight||v.documentElement?.clientHeight||window.innerHeight||0}),Ce=(bt,se,Ct)=>Math.min(Math.max(bt,se),Ct),ht=()=>{z&&(z=!1,E.classList.remove("yyt-popup-dragging"),v.body.style.userSelect=fe)},Zt=bt=>{if(!z||!o.currentPopup)return;let se=bt.clientX-H,Ct=bt.clientY-q,{width:dt,height:Kl}=He(),pw=E.offsetWidth||0,yw=E.offsetHeight||0,fw=Math.max(0,dt-pw),gw=Math.max(0,Kl-yw);E.style.left=`${Ce(ye+se,0,fw)}px`,E.style.top=`${Ce(ae+Ct,0,gw)}px`,E.style.transform="none",E.style.right="auto",E.style.bottom="auto"},gr=()=>{ht()},Jr=bt=>{if(bt.button!==0||bt.target?.closest(".yyt-popup-close"))return;z=!0,H=bt.clientX,q=bt.clientY;let se=E.getBoundingClientRect();ye=se.left,ae=se.top,E.style.left=`${se.left}px`,E.style.top=`${se.top}px`,E.style.transform="none",E.style.right="auto",E.style.bottom="auto",E.classList.add("yyt-popup-dragging"),fe=v.body.style.userSelect||"",v.body.style.userSelect="none",bt.preventDefault()};D.addEventListener("mousedown",Jr),v.addEventListener("mousemove",Zt),v.addEventListener("mouseup",gr),c.cleanup=()=>{ht(),D.removeEventListener("mousedown",Jr),v.removeEventListener("mousemove",Zt),v.removeEventListener("mouseup",gr)}}function ir(){F(),M(),R(),_();let v=w();if(v&&o.currentPopup){let E=v(o.currentPopup);Ut(E,"yytPopupToolConfigSelect"),Ut(E,"yytPromptEditorSelect")}o.currentPopup&&(o.currentPopup.remove(),o.currentPopup=null),o.currentOverlay&&(o.currentOverlay.remove(),o.currentOverlay=null),h("\u5F39\u7A97\u5DF2\u5173\u95ED")}function Rn(v){F(),o.currentMainTab=v;let E=w();if(!E||!o.currentPopup)return;L({mainTab:v,includeSubContent:!0}),E(o.currentPopup).find(".yyt-main-nav-item").removeClass("active"),E(o.currentPopup).find(`.yyt-main-nav-item[data-tab="${v}"]`).addClass("active");let D=n.toolRegistryModule?.getToolConfig(v);D?.hasSubTabs?(E(o.currentPopup).find(".yyt-sub-nav").show(),hs(v,D.subTabs)):E(o.currentPopup).find(".yyt-sub-nav").hide(),E(o.currentPopup).find(".yyt-tab-content").removeClass("active"),E(o.currentPopup).find(`.yyt-tab-content[data-tab="${v}"]`).addClass("active"),Vr(v),P(),V()}function Mn(v,E){F(),o.currentSubTab[v]=E;let D=w();!D||!o.currentPopup||(L({mainTab:v,includeSubContent:!0}),D(o.currentPopup).find(".yyt-sub-nav-item").removeClass("active"),D(o.currentPopup).find(`.yyt-sub-nav-item[data-subtab="${E}"]`).addClass("active"),Pn(v,E),P(),V())}function hs(v,E){let D=w();if(!D||!o.currentPopup||!E)return;let z=A(v,o.currentSubTab[v]||E[0]?.id),q=(v==="tools"?[{key:"ai",title:"AI \u5DE5\u5177",items:E.filter(ae=>!ae?.isCustom&&(ae?.toolKind||"ai")!=="script")},{key:"script",title:"\u811A\u672C\u5DE5\u5177",items:E.filter(ae=>!ae?.isCustom&&ae?.toolKind==="script")},{key:"custom",title:"\u81EA\u5B9A\u4E49\u5DE5\u5177",items:E.filter(ae=>ae?.isCustom===!0)}].filter(ae=>ae.items.length>0):[{key:"default",title:"",items:E}]).map(ae=>{let fe=ae.title?`<div class="yyt-sub-nav-group-title">${x(ae.title)}</div>`:"",He=ae.items.map(Ce=>{let ht=Ce?.isCustom===!0,Zt=v==="tools"&&ht?`<div class="yyt-sub-nav-item-actions">
               <button type="button" class="yyt-sub-nav-item-action" data-action="edit" data-subtab="${Ce.id}" title="\u7F16\u8F91"><i class="fa-solid fa-pen"></i></button>
               <button type="button" class="yyt-sub-nav-item-action" data-action="delete" data-subtab="${Ce.id}" title="\u5220\u9664"><i class="fa-solid fa-trash"></i></button>
             </div>`:"";return`
        <div class="yyt-sub-nav-item ${Ce.id===z?"active":""}" data-subtab="${Ce.id}" data-tool-name="${x((Ce.name||Ce.id).toLowerCase())}">
          <i class="fa-solid ${Ce.icon||"fa-file"}"></i>
          <span class="yyt-sub-nav-item-label">${x(Ce.name||Ce.id)}</span>
          ${Zt}
        </div>
      `}).join("");return`
        <div class="yyt-sub-nav-group yyt-sub-nav-group-${ae.key}">
          ${fe}
          <div class="yyt-sub-nav-group-items">
            ${He}
          </div>
        </div>
      `}).join(""),ye=v==="tools"?`<div class="yyt-sub-nav-toolbar">
           <button type="button" class="yyt-sub-nav-toolbar-btn" data-tool-action="add" title="\u65B0\u5EFA\u81EA\u5B9A\u4E49\u5DE5\u5177"><i class="fa-solid fa-plus"></i><span>\u65B0\u5EFA</span></button>
           <button type="button" class="yyt-sub-nav-toolbar-btn" data-tool-action="import" title="\u4ECE JSON \u5BFC\u5165\u5DE5\u5177"><i class="fa-solid fa-file-import"></i></button>
           <button type="button" class="yyt-sub-nav-toolbar-btn" data-tool-action="export" title="\u5BFC\u51FA\u5DE5\u5177 JSON"><i class="fa-solid fa-file-export"></i></button>
         </div>
         <div class="yyt-sub-nav-filter-wrap">
           <input type="text" class="yyt-sub-nav-filter" placeholder="\u7B5B\u9009\u5DE5\u5177\u2026" autocomplete="off">
         </div>`:"";D(o.currentPopup).find(".yyt-sub-nav").html(ye+q),D(o.currentPopup).find(".yyt-sub-nav-item").on("click",function(fe){if(fe.target.closest&&fe.target.closest(".yyt-sub-nav-item-action"))return;let He=D(this).data("subtab");Mn(v,He)}),v==="tools"&&wo(v),V()}function ja(v){if(!o.currentPopup)return;let E=w();if(!E)return;let D=String(v||"").trim().toLowerCase();E(o.currentPopup).find(".yyt-sub-nav-item").each(function(){let H=String(E(this).data("tool-name")||"");E(this).toggle(!D||H.includes(D))}),E(o.currentPopup).find(".yyt-sub-nav-group").each(function(){let H=E(this).find(".yyt-sub-nav-item:visible").length>0;E(this).toggle(H)})}function wo(v){let E=w();if(!E||!o.currentPopup)return;let D=E(o.currentPopup).find(".yyt-sub-nav");D.find(".yyt-sub-nav-filter").off("input.yytFilter").on("input.yytFilter",function(){ja(this.value)}),D.find(".yyt-sub-nav-toolbar-btn").off("click.yytToolAction").on("click.yytToolAction",async function(z){z.preventDefault(),z.stopPropagation();let H=E(this).data("tool-action");try{let q=await Promise.resolve().then(()=>(wp(),xp));if(H==="add"){let ye=await q.showToolEditDialog(null);ye&&(o.currentSubTab[v]=ye,Mn(v,ye))}else H==="import"?await q.showImportToolsDialog():H==="export"&&q.showExportToolsDialog()}catch(q){b("\u5DE5\u5177\u64CD\u4F5C\u5931\u8D25",q)}}),D.find(".yyt-sub-nav-item-action").off("click.yytItemAction").on("click.yytItemAction",async function(z){z.preventDefault(),z.stopPropagation();let H=E(this).data("action"),q=String(E(this).data("subtab")||"");if(q)try{let ye=await Promise.resolve().then(()=>(wp(),xp));H==="edit"?await ye.showToolEditDialog(q):H==="delete"&&await ye.confirmDeleteTool(q)&&o.currentSubTab[v]===q&&(o.currentSubTab[v]="")}catch(ye){b("\u5DE5\u5177\u884C\u5185\u64CD\u4F5C\u5931\u8D25",ye)}})}async function Vr(v){let E=w();if(!E||!o.currentPopup)return;let D=E(o.currentPopup).find(`.yyt-tab-content[data-tab="${v}"]`);if(!D.length)return;if(n.toolRegistryModule?.getToolConfig(v)?.hasSubTabs){let q=A(v);q?await Pn(v,q):D.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5B50 tab \u914D\u7F6E\u52A0\u8F7D\u5931\u8D25</span></div>'),V();return}await n.uiModule?.renderMainTab?.(v,D)||Nn(v,D),V()}async function Pn(v,E){let D=w();if(!D||!o.currentPopup)return;let z=D(o.currentPopup).find(`.yyt-tab-content[data-tab="${v}"]`);if(!z.length)return;let H=n.toolRegistryModule?.getToolConfig(v);if(H?.hasSubTabs){let ye=A(v,E),ae=H.subTabs?.find(ht=>ht.id===ye),fe=z.find(".yyt-sub-content");if(fe.length||(z.html('<div class="yyt-sub-content"></div>'),fe=z.find(".yyt-sub-content")),!ae){fe.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5F53\u524D\u5B50\u9875\u9762\u4E0D\u5B58\u5728\u6216\u5DF2\u5931\u6548</span></div>'),L({mainTab:v,includeSubContent:!0}),V();return}let He=ae.component;if(He==="GenericToolConfigPanel"){await Ua(ae,fe),L({mainTab:v,includeSubContent:!0}),V();return}F({container:fe});let Ce=await n.uiModule?.renderSubTabComponent?.(He,fe);Ce?Y(fe,{key:Ce}):fe.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-tools"></i><span>\u529F\u80FD\u5F00\u53D1\u4E2D...</span></div>'),L({mainTab:v,includeSubContent:!0}),V();return}let q=z.find(".yyt-sub-content");if(q.length){switch(F({container:q}),E){case"config":nw(v,q);break;case"prompts":await sw(v,q);break;case"presets":ow(v,q);break;default:q.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-tools"></i><span>\u529F\u80FD\u5F00\u53D1\u4E2D...</span></div>')}L({mainTab:v,includeSubContent:!0}),V()}}async function Ua(v,E){if(!(!w()||!E?.length||!v?.id)){F({container:E});try{let z=s.dynamicToolPanelCache.get(v.id);if(!z){let ye=(await Promise.resolve().then(()=>(so(),xm)))?.createToolConfigPanel;if(typeof ye!="function")throw new Error("\u901A\u7528\u5DE5\u5177\u9762\u677F\u5DE5\u5382\u4E0D\u53EF\u7528");z=()=>ye({id:`${v.id}Panel`,toolId:v.id,postResponseHint:`\u70B9\u51FB\u201C\u7ACB\u5373\u6267\u884C\u4E00\u6B21\u201D\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u6267\u884C\u201C${v.name||v.id}\u201D\u3002`,extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 custom_tag
\u6216 regex:<custom_tag>([\\s\\S]*?)</custom_tag>`,previewDialogId:`${v.id}-extraction-preview`,previewTitle:`${v.name||v.id} \u63D0\u53D6\u9884\u89C8`}),s.dynamicToolPanelCache.set(v.id,z)}let H=z();H.renderTo(E),Y(E,{key:v.id,destroy:typeof H?.destroy=="function"?q=>H.destroy(q):null}),V()}catch(z){p.current=null,b("\u81EA\u5B9A\u4E49\u5DE5\u5177\u9762\u677F\u52A0\u8F7D\u5931\u8D25:",z),E.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u81EA\u5B9A\u4E49\u5DE5\u5177\u9762\u677F\u52A0\u8F7D\u5931\u8D25</span></div>')}}}function Nn(v,E){if(!w())return;let z=n.toolRegistryModule?.getToolConfig(v);if(!z){E.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5DE5\u5177\u914D\u7F6E\u4E0D\u5B58\u5728</span></div>');return}let H=o.currentSubTab[v]||z.subTabs?.[0]?.id||"config";E.html(`
      <div class="yyt-tool-window">
        <div class="yyt-sub-content" data-subtab="${H}">
          <!-- \u5B50\u5185\u5BB9\u5C06\u5728\u6B64\u6E32\u67D3 -->
        </div>
      </div>
    `),Pn(v,H)}function nw(v,E){if(!w())return;let z=n.toolManagerModule?.getTool(v),H=n.presetManagerModule?.getAllPresets()||[],q=n.toolRegistryModule?.getToolApiPreset(v)||"",ye=H.map(ae=>`<option value="${x(ae.name)}" ${ae.name===q?"selected":""}>${x(ae.name)}</option>`).join("");E.html(`
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
              ${ye}
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
              <input type="number" class="yyt-input" id="yyt-tool-timeout" value="${z?.config?.execution?.timeout||6e4}">
            </div>
            <div class="yyt-form-group yyt-flex-1">
              <label>\u91CD\u8BD5\u6B21\u6570</label>
              <input type="number" class="yyt-input" id="yyt-tool-retries" value="${z?.config?.execution?.retries||3}">
            </div>
          </div>
        </div>
      </div>
    `),br(E,{namespace:"yytPopupToolConfigSelect",selectors:["#yyt-tool-api-preset"]}),E.find("#yyt-save-tool-preset").on("click",function(){let fe=E.find("#yyt-tool-api-preset").val();n.toolRegistryModule?.setToolApiPreset(v,fe),d.info("API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u4FDD\u5B58",null,{toast:"success"})})}async function sw(v,E){if(!w()){E.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u63D0\u793A\u8BCD\u7F16\u8F91\u5668\u6A21\u5757\u672A\u52A0\u8F7D</span></div>');return}let H=n.toolManagerModule?.getTool(v)?.config?.messages||[],q=Zx(H)||za,ye=new Dl({containerId:`yyt-prompt-editor-${v}`,segments:q,onChange:fe=>{let He=Qx(fe);h("\u63D0\u793A\u8BCD\u5DF2\u66F4\u65B0:",He.length,"\u6761\u6D88\u606F")}});E.html(`<div id="yyt-prompt-editor-${v}" class="yyt-prompt-editor-container"></div>`),ye.init(E.find(`#yyt-prompt-editor-${v}`));let ae=Xx();if(ae){let fe="yyt-prompt-editor-styles",He=r.document||document;if(!He.getElementById(fe)){let Ce=He.createElement("style");Ce.id=fe,Ce.textContent=ae,(He.head||He.documentElement).appendChild(Ce)}}}function ow(v,E){w()&&E.html(`
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
    `)}function aw(){return`
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
      </div>`}function iw(v,E,D){let z=g(),H=v.map(q=>`
      <div class="yyt-main-nav-item ${q.id===o.currentMainTab?"active":""}" data-tab="${q.id}">
        <div class="yyt-main-nav-icon">
          <i class="fa-solid ${x(q.icon||"fa-file")}"></i>
        </div>
        <div class="yyt-main-nav-copy">
          <span class="yyt-main-nav-name">${x(q.name||q.id)}</span>
          <span class="yyt-main-nav-desc">${x(q.description||"\u8FDB\u5165\u6B64\u9875\u9762\u8FDB\u884C\u914D\u7F6E\u3001\u67E5\u770B\u6216\u7EF4\u62A4\u3002")}</span>
        </div>
      </div>
    `).join("");return`
      <aside class="yyt-shell-sidebar${z?" yyt-collapsed":""}">
        <div class="yyt-shell-sidebar-card">
          <div class="yyt-shell-sidebar-title-row">
            <span class="yyt-shell-sidebar-title">\u9875\u9762\u5BFC\u822A</span>
            <span class="yyt-shell-sidebar-hint">${v.length} tabs</span>
            <button class="yyt-sidebar-toggle" title="${z?"\u5C55\u5F00\u4FA7\u680F":"\u6298\u53E0\u4FA7\u680F"}">
              <i class="fa-solid ${z?"fa-angles-right":"fa-angles-left"}"></i>
            </button>
          </div>
          <div class="yyt-main-nav">
            ${H}
          </div>
          <div class="yyt-shell-sidebar-note">
            \u4FDD\u5B58\u540E\uFF0C\u624B\u52A8\u6267\u884C\u4E0E\u5199\u56DE\u94FE\u90FD\u4F1A\u4EE5\u6700\u65B0\u914D\u7F6E\u4E3A\u51C6\u3002
          </div>
          <div class="yyt-shell-sidebar-stats">
            <div class="yyt-shell-sidebar-stat">
              <span class="yyt-shell-sidebar-stat-value">${v.length}</span>
              <span class="yyt-shell-sidebar-stat-label">\u4E3B\u9875\u9762</span>
            </div>
            <div class="yyt-shell-sidebar-stat">
              <span class="yyt-shell-sidebar-stat-value">${E}</span>
              <span class="yyt-shell-sidebar-stat-label">\u9ED8\u8BA4\u5DE5\u5177</span>
            </div>
            <div class="yyt-shell-sidebar-stat">
              <span class="yyt-shell-sidebar-stat-value">${D}</span>
              <span class="yyt-shell-sidebar-stat-label">\u81EA\u5B9A\u4E49\u5DE5\u5177</span>
            </div>
          </div>
        </div>
      </aside>`}function lw(v,E){return`
      <div class="yyt-shell-main-header">
        <div class="yyt-shell-main-heading-block">
          <div class="yyt-shell-main-title">${x(v)}</div>
          <div class="yyt-shell-main-description">${x(E)}</div>
        </div>
        <div class="yyt-shell-main-actions">
          <div class="yyt-shell-main-meta">
            <i class="fa-solid fa-circle-info"></i>
            <span>\u4FDD\u5B58\u540E\u6267\u884C\u94FE\u4F1A\u7ACB\u5373\u4F7F\u7528\u6700\u65B0\u914D\u7F6E</span>
          </div>
        </div>
      </div>`}function cw(v,E){return v.map(D=>`
      <div class="yyt-tab-content ${D.id===E?"active":""}" data-tab="${D.id}">
      </div>
    `).join("")}function dw(v){return`
      <div class="yyt-popup-footer">
        <div class="yyt-popup-footer-left">
          <div class="yyt-popup-status-cluster">
            <div class="yyt-popup-status">
              <i class="fa-solid fa-compass"></i>
              <span class="yyt-popup-active-label">\u5F53\u524D\uFF1A${x(v)}</span>
            </div>
            <div class="yyt-popup-footer-note">
              API\u3001\u5DE5\u5177\u3001\u63D0\u53D6\u4E0E\u8BCA\u65AD\u7EDF\u4E00\u5165\u53E3\u3002
            </div>
          </div>
        </div>
      </div>`}async function uw(){if(o.currentPopup){h("\u5F39\u7A97\u5DF2\u5B58\u5728");return}let v=t?.services?.loadModules;typeof v=="function"&&await v();let E=w(),D=T();if(!E){b("jQuery \u672A\u627E\u5230\uFF0C\u65E0\u6CD5\u521B\u5EFA\u5F39\u7A97");return}let z=n.toolRegistryModule?.getToolList()||[];if(!z.length){b("\u5DE5\u5177\u5217\u8868\u4E3A\u7A7A\uFF0C\u65E0\u6CD5\u521B\u5EFA\u5F39\u7A97");return}z.some(se=>se.id===o.currentMainTab)||(o.currentMainTab=z[0].id);let H=n.toolRegistryModule?.getToolConfig("tools"),q=Array.isArray(H?.subTabs)?H.subTabs:[],ye=q.filter(se=>se?.isCustom).length,ae=q.filter(se=>!se?.isCustom).length,fe=I(o.currentMainTab),He=S(o.currentMainTab);o.currentOverlay=D.createElement("div"),o.currentOverlay.className="yyt-popup-overlay",o.currentOverlay.addEventListener("click",se=>{se.target===o.currentOverlay&&ir()}),D.body.appendChild(o.currentOverlay);let Ce=g(),ht=`
      <div class="yyt-popup" id="${l}">
        ${aw()}
        <div class="yyt-popup-body">
          <div class="yyt-popup-shell">
            <div class="yyt-shell-workspace${Ce?" yyt-sidebar-collapsed":""}">
              ${iw(z,ae,ye)}
              <section class="yyt-shell-main">
                ${lw(fe,He)}
                <div class="yyt-sub-nav" style="display: none;"></div>
                <div class="yyt-content-frame">
                  <div class="yyt-content">
                    <div class="yyt-content-inner">
                      ${cw(z,o.currentMainTab)}
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
        ${dw(fe)}
      </div>
    `,Zt=D.createElement("div");Zt.innerHTML=ht,o.currentPopup=Zt.firstElementChild,D.body.appendChild(o.currentPopup),E(o.currentPopup).find(".yyt-popup-close").on("click",ir),E(o.currentPopup).find(".yyt-sidebar-toggle").on("click",m);let gr=se=>{se.key==="Escape"&&(D.querySelector(".yyt-dialog-overlay")||D.querySelector(".yyt-twb-editor-drawer.is-open")||(se.stopPropagation(),ir()))},Jr=se=>{if(!(se.ctrlKey||se.metaKey)||se.key!=="s"||!o.currentPopup)return;se.preventDefault(),se.stopPropagation();let Ct=E(o.currentPopup),dt=Ct.find("#yyt-bypass-save:visible").first()||Ct.find(`#${a}-save-api-config:visible`).first()||Ct.find("#yyt-save-tool-preset:visible").first()||Ct.find('[data-twb-action="save"]:visible').first();dt?.length&&dt.trigger("click")};D.addEventListener("keydown",gr),D.addEventListener("keydown",Jr),u.cleanups.push(()=>{D.removeEventListener("keydown",gr),D.removeEventListener("keydown",Jr)}),Ie(),E(o.currentPopup).find(".yyt-main-nav-item").on("click",function(){let Ct=E(this).data("tab");Ct&&Rn(Ct)}),Mt(),Vr(o.currentMainTab);let bt=n.toolRegistryModule?.getToolConfig(o.currentMainTab);bt?.hasSubTabs&&(E(o.currentPopup).find(".yyt-sub-nav").show(),hs(o.currentMainTab,bt.subTabs)),P(),tt(z),V(),h("\u5F39\u7A97\u5DF2\u6253\u5F00")}return{openPopup:uw,closePopup:ir,switchMainTab:Rn,switchSubTab:Mn,renderTabContent:Vr,renderSubTabContent:Pn}}function tw(t,e={}){let{constants:r,modules:n}=t,{SCRIPT_ID:s,SCRIPT_VERSION:o}=r,{init:a,loadModules:i,addMenuItem:l,popupShell:d}=e;return{version:o,id:s,init:a,openPopup:d?.openPopup,closePopup:d?.closePopup,switchMainTab:d?.switchMainTab,switchSubTab:d?.switchSubTab,addMenuItem:l,getStorage:()=>n.storageModule,getApiConnection:()=>n.apiConnectionModule,getPresetManager:()=>n.presetManagerModule,getUi:()=>n.uiModule,getUiModule:()=>n.uiModule,getRegexExtractor:()=>n.regexExtractorModule,getToolManager:()=>n.toolManagerModule,getToolExecutor:()=>n.toolExecutorModule,getWindowManager:()=>n.windowManagerModule,getToolRegistry:()=>n.toolRegistryModule,getSettingsService:()=>n.settingsServiceModule,getBypassManager:()=>n.bypassManagerModule,getVariableResolver:()=>n.variableResolverModule,getContextInjector:()=>n.contextInjectorModule,getToolPromptService:()=>n.toolPromptServiceModule,getToolOutputService:()=>n.toolOutputServiceModule,getToolAutomationService:()=>n.toolAutomationServiceModule,getDataProvider:()=>n.toolDataProviderModule?.getCurrentProvider?.()||null,get floatingBall(){let c=n.floatingBallModule?.floatingBall;return c?{isReady:()=>c.isReady?.()||!1,registerItem:u=>c.registerItem?.(u),unregisterItem:u=>c.unregisterItem?.(u),updateItem:(u,y)=>c.updateItem?.(u,y),refresh:u=>c.refresh?.(u),setVisible:u=>c.setVisible?.(u),openMenu:()=>c.openMenu?.(),closeMenu:()=>c.closeMenu?.(),toggleMenu:u=>c.toggleMenu?.(u)}:null},async getDataProviderAsync(){return await i(),n.toolDataProviderModule?.getToolDataProvider?.()||null},async getApiConfig(){return await i(),n.apiConnectionModule?.getApiConfig?.()||null},async saveApiConfig(c){return await i(),n.apiConnectionModule?(n.apiConnectionModule.updateApiConfig(c),!0):!1},async getPresets(){return await i(),n.presetManagerModule?n.presetManagerModule.getAllPresets():[]},async sendApiRequest(c,u){if(await i(),n.apiConnectionModule)return n.apiConnectionModule.sendApiRequest(c,u);throw new Error("API\u6A21\u5757\u672A\u52A0\u8F7D")},async testApiConnection(){return await i(),n.apiConnectionModule?n.apiConnectionModule.testApiConnection():{success:!1,message:"API\u6A21\u5757\u672A\u52A0\u8F7D"}},registerTool(c,u){return n.toolRegistryModule?.registerTool(c,u)||!1},unregisterTool(c){return n.toolRegistryModule?.unregisterTool(c)||!1},getToolList(){return n.toolRegistryModule?.getToolList()||[]},createWindow(c){return n.windowManagerModule?.createWindow(c)||null},closeWindow(c){n.windowManagerModule?.closeWindow(c)},startAutomation(){return n.toolAutomationServiceModule?.toolAutomationService?.init?.()||!1},stopAutomation(){n.toolAutomationServiceModule?.toolAutomationService?.stop?.()},getAutomationRuntime(){return n.toolAutomationServiceModule?.toolAutomationService?.getRuntimeSnapshot?.()||null},cancelAutomation(c={}){return n.toolAutomationServiceModule?.toolAutomationService?.cancelAutomation?.(c)||{success:!1,error:"\u81EA\u52A8\u5316\u670D\u52A1\u672A\u52A0\u8F7D"}},async processCurrentAssistantMessage(c={}){return n.toolAutomationServiceModule?.toolAutomationService?.processCurrentAssistantMessage?.(c)||{success:!1,error:"\u81EA\u52A8\u5316\u670D\u52A1\u672A\u52A0\u8F7D"}}}}var Bl="youyou_toolkit",a1="1.0.256",i1=`${Bl}-menu-item`,l1=`${Bl}-menu-container`,c1=`${Bl}-popup`,d1=typeof window.parent<"u"?window.parent:window,zl={constants:{SCRIPT_ID:Bl,SCRIPT_VERSION:a1,MENU_ITEM_ID:i1,MENU_CONTAINER_ID:l1,POPUP_ID:c1},topLevelWindow:d1,modules:{storageModule:null,apiConnectionModule:null,uiModule:null,presetManagerModule:null,regexExtractorModule:null,toolManagerModule:null,toolExecutorModule:null,toolTriggerModule:null,windowManagerModule:null,toolRegistryModule:null,settingsServiceModule:null,bypassManagerModule:null,variableResolverModule:null,contextInjectorModule:null,toolPromptServiceModule:null,toolOutputServiceModule:null,toolAutomationServiceModule:null,toolDataProviderModule:null,floatingBallModule:null},caches:{dynamicToolPanelCache:new Map},services:{loadModules:null},uiState:{currentPopup:null,currentOverlay:null,currentMainTab:"presetManagement",currentSubTab:{},startupScreenDismissed:!1}},rw=ew(zl),Ka=Jx(zl,{openPopup:rw.openPopup});zl.services.loadModules=Ka.loadModules;var vp=tw(zl,{init:Ka.init,loadModules:Ka.loadModules,addMenuItem:Ka.addMenuItem,popupShell:rw});if(typeof window<"u"&&(window.YouYouToolkit=vp,typeof window.parent<"u"&&window.parent!==window))try{window.parent.YouYouToolkit=vp}catch{}var l$=vp;Ka.init();Promise.resolve().then(()=>(J(),Tp)).then(({logger:t})=>{t.createScope("Bootstrap").log("\u6A21\u5757\u52A0\u8F7D\u5B8C\u6210")});export{l$ as default};
