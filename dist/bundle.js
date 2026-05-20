var Nb=Object.defineProperty;var N=(t,e)=>()=>(t&&(e=t(t=0)),e);var le=(t,e)=>{for(var r in e)Nb(t,r,{get:e[r],enumerable:!0})};var j,yl,W,ot=N(()=>{j={STORAGE_CHANGED:"storage:changed",STORAGE_CLEARED:"storage:cleared",PRESET_CREATED:"preset:created",PRESET_UPDATED:"preset:updated",PRESET_DELETED:"preset:deleted",PRESET_ACTIVATED:"preset:activated",PRESET_IMPORTED:"preset:imported",PRESET_EXPORTED:"preset:exported",API_CONFIG_UPDATED:"api:configUpdated",API_REQUEST_START:"api:requestStart",API_REQUEST_SUCCESS:"api:requestSuccess",API_REQUEST_ERROR:"api:requestError",API_CONNECTION_TESTED:"api:connectionTested",TOOL_REGISTERED:"tool:registered",TOOL_UNREGISTERED:"tool:unregistered",TOOL_UPDATED:"tool:updated",TOOL_RUNTIME_UPDATED:"tool:runtimeUpdated",TOOL_ENABLED:"tool:enabled",TOOL_DISABLED:"tool:disabled",TOOL_EXECUTING:"tool:executing",TOOL_EXECUTED:"tool:executed",TOOL_ERROR:"tool:error",TOOL_EXECUTION_STARTED:"tool:executionStarted",TOOL_EXECUTION_FAILED:"tool:executionFailed",REGEX_RULE_ADDED:"regex:ruleAdded",REGEX_RULE_UPDATED:"regex:ruleUpdated",REGEX_RULE_DELETED:"regex:ruleDeleted",REGEX_RULES_CLEARED:"regex:rulesCleared",REGEX_PRESET_LOADED:"regex:presetLoaded",REGEX_EXTRACTED:"regex:extracted",UI_INITIALIZED:"ui:initialized",UI_RENDER_REQUESTED:"ui:renderRequested",UI_TAB_CHANGED:"ui:tabChanged",UI_SUBTAB_CHANGED:"ui:subTabChanged",UI_POPUP_OPENED:"ui:popupOpened",UI_POPUP_CLOSED:"ui:popupClosed",UI_WINDOW_CREATED:"ui:windowCreated",UI_WINDOW_CLOSED:"ui:windowClosed",APP_INITIALIZING:"app:initializing",APP_INITIALIZED:"app:initialized",APP_ERROR:"app:error",SETTINGS_UPDATED:"settings:updated",TOOL_CONTEXT_INJECTED:"tool:contextInjected",TOOL_CONTEXT_CLEARED:"tool:contextCleared",BYPASS_PRESET_CREATED:"bypass:presetCreated",BYPASS_PRESET_UPDATED:"bypass:presetUpdated",BYPASS_PRESET_DELETED:"bypass:presetDeleted",BYPASS_PRESET_ACTIVATED:"bypass:presetActivated",TOOL_OUTPUT_MODE_CHANGED:"tool:outputModeChanged"},yl=class{constructor(){this.listeners=new Map,this.onceCallbacks=new Map,this.history=[],this.maxHistorySize=100,this.debugMode=!1}on(e,r,s={}){if(!e||typeof r!="function")return console.warn("[EventBus] \u65E0\u6548\u7684\u4E8B\u4EF6\u6216\u56DE\u8C03"),()=>{};let{priority:n=0}=s;this.listeners.has(e)||this.listeners.set(e,new Set);let o={callback:r,priority:n};return this.listeners.get(e).add(o),this.debugMode&&console.log(`[EventBus] \u8BA2\u9605: ${e}`),()=>this.off(e,r)}off(e,r){let s=this.listeners.get(e);if(s){for(let n of s)if(n.callback===r){s.delete(n);break}this.debugMode&&console.log(`[EventBus] \u53D6\u6D88\u8BA2\u9605: ${e}`)}}emit(e,r){this.debugMode&&console.log(`[EventBus] \u53D1\u5E03: ${e}`,r),this._addToHistory(e,r);let s=this.listeners.get(e);if(!s||s.size===0)return;let n=Array.from(s).sort((o,a)=>a.priority-o.priority);for(let{callback:o}of n)try{o(r)}catch(a){console.error(`[EventBus] \u4E8B\u4EF6\u5904\u7406\u9519\u8BEF (${e}):`,a)}}once(e,r){let s=n=>{this.off(e,s),r(n)};return this.on(e,s)}wait(e,r=0){return new Promise((s,n)=>{let o=null,a=this.once(e,i=>{o&&clearTimeout(o),s(i)});r>0&&(o=setTimeout(()=>{a(),n(new Error(`\u7B49\u5F85\u4E8B\u4EF6\u8D85\u65F6: ${e}`))},r))})}hasListeners(e){let r=this.listeners.get(e);return r&&r.size>0}listenerCount(e){let r=this.listeners.get(e);return r?r.size:0}removeAllListeners(e){e?this.listeners.delete(e):this.listeners.clear()}setDebugMode(e){this.debugMode=e}_addToHistory(e,r){this.history.push({event:e,data:r,timestamp:Date.now()}),this.history.length>this.maxHistorySize&&this.history.shift()}getHistory(e){return e?this.history.filter(r=>r.event===e):[...this.history]}clearHistory(){this.history=[]}},W=new yl});var Pu={};le(Pu,{LOG_LEVEL:()=>fe,LoggerService:()=>ma,default:()=>$b,logger:()=>C});var fe,Mu,ma,C,$b,H=N(()=>{ot();fe=Object.freeze({DEBUG:0,INFO:1,WARN:2,ERROR:3}),Mu=Object.freeze({[fe.DEBUG]:"DEBUG",[fe.INFO]:"INFO",[fe.WARN]:"WARN",[fe.ERROR]:"ERROR"}),ma=class{constructor(){this._entries=[],this._maxSize=2e3,this._nextId=1,this._minLevel=fe.INFO,this._eventKey="logger:entry",this._statsEventKey="logger:statsChanged",this._pendingFlush=!1,this._toastHandler=null}_write(e,r,s,n,o){let a={id:this._nextId++,timestamp:Date.now(),level:e,scope:r,message:s,data:n};if(this._entries.push(a),this._entries.length>this._maxSize&&this._entries.shift(),this._forwardToConsole(a),this._toastHandler&&o)try{this._toastHandler(this.levelToToastType(e),s,o)}catch{}this._pendingFlush||(this._pendingFlush=!0,queueMicrotask(()=>{this._pendingFlush=!1,this._emitEntry(a)}))}_forwardToConsole(e){let r=`[${e.scope}]`;switch(e.level){case fe.DEBUG:console.debug(r,e.message,e.data??"");break;case fe.INFO:console.log(r,e.message,e.data??"");break;case fe.WARN:console.warn(r,e.message,e.data??"");break;case fe.ERROR:console.error(r,e.message,e.data??"");break}}_emitEntry(e){try{W?.emit(this._eventKey,e)}catch{}}debug(e,r,s,n){fe.DEBUG<this._minLevel||this._write(fe.DEBUG,e,r,s,n)}info(e,r,s,n){fe.INFO<this._minLevel||this._write(fe.INFO,e,r,s,n)}log(e,r,s,n){this.info(e,r,s,n)}warn(e,r,s,n){fe.WARN<this._minLevel||this._write(fe.WARN,e,r,s,n)}error(e,r,s,n){fe.ERROR<this._minLevel||this._write(fe.ERROR,e,r,s,n)}createScope(e){return{debug:(r,s,n)=>this.debug(e,r,s,n),info:(r,s,n)=>this.info(e,r,s,n),log:(r,s,n)=>this.log(e,r,s,n),warn:(r,s,n)=>this.warn(e,r,s,n),error:(r,s,n)=>this.error(e,r,s,n)}}setToastHandler(e){this._toastHandler=e}levelToToastType(e){switch(e){case fe.WARN:return"warning";case fe.ERROR:return"error";default:return"info"}}getEntries(e={}){let{level:r,scope:s,search:n,limit:o=500,offset:a=0}=e,i=this._entries;if(r!=null&&(i=i.filter(c=>c.level>=r)),s&&(i=i.filter(c=>c.scope===s)),n){let c=n.toLowerCase();i=i.filter(d=>d.scope.toLowerCase().includes(c)||d.message.toLowerCase().includes(c))}let l=i.length;return i=i.slice(a,a+o),{entries:i,total:l}}getStats(){let e={total:this._entries.length,byLevel:{DEBUG:0,INFO:0,WARN:0,ERROR:0},byScope:{}};for(let r of this._entries){let s=Mu[r.level]||"UNKNOWN";e.byLevel[s]=(e.byLevel[s]||0)+1,e.byScope[r.scope]=(e.byScope[r.scope]||0)+1}return e}setLevel(e){this._minLevel=e}getLevel(){return this._minLevel}setMaxSize(e){this._maxSize=Math.max(100,Math.min(1e4,e))}clear(){this._entries=[],this._nextId=1}levelLabel(e){return Mu[e]||"UNKNOWN"}},C=new ma,$b=C});function Wt(){return typeof window.parent<"u"&&window.parent!==window&&window.parent.document?window.parent.document:document}function ce(t){return typeof t!="string"?"":t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function ha(t,e,r=3e3){e||(e=t==="error"?"\u64CD\u4F5C\u5931\u8D25":"\u64CD\u4F5C\u5B8C\u6210");let s=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(s.toastr){s.toastr[t](e,"YouYou \u5DE5\u5177\u7BB1",{timeOut:r,progressBar:!0});return}Lb(t,e,r),Db.log(`[${t.toUpperCase()}] ${e}`)}function bl(t,e,r={}){e||(e=t==="error"?"\u64CD\u4F5C\u5931\u8D25":"\u64CD\u4F5C\u5B8C\u6210");let{duration:s=3500,sticky:n=!1,noticeId:o=""}=r,a=Wt();if(!a?.body){ha(t,e,s);return}let i="yyt-top-notice-container",l="yyt-top-notice-styles",c=a.getElementById(i);if(c||(c=a.createElement("div"),c.id=i,c.style.cssText=`
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
    `,a.body.appendChild(c)),!a.getElementById(l)){let h=a.createElement("style");h.id=l,h.textContent=`
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
    `,a.head.appendChild(h)}if(o){let h=c.querySelector(`[data-notice-id="${o}"]`);h&&h.remove()}let d={success:"\u2713",error:"!",warning:"\u2022",info:"i"},u=a.createElement("div");u.className=`yyt-top-notice yyt-top-notice--${t||"info"}`,o&&(u.dataset.noticeId=o);let y=a.createElement("span");y.className="yyt-top-notice__icon",y.textContent=d[t]||d.info;let p=a.createElement("div");p.className="yyt-top-notice__content",p.textContent=e;let g=a.createElement("button");g.className="yyt-top-notice__close",g.type="button",g.setAttribute("aria-label","\u5173\u95ED\u901A\u77E5"),g.textContent="\xD7";let m=()=>{u.style.animation="yyt-top-notice-out 0.18s ease forwards",setTimeout(()=>u.remove(),180)};g.addEventListener("click",m),u.appendChild(y),u.appendChild(p),u.appendChild(g),c.appendChild(u),n||setTimeout(m,s)}function Lb(t,e,r){let s=Wt();if(!s)return;let n=s.getElementById("yyt-fallback-toast");n&&n.remove();let o={success:{bg:"rgba(74, 222, 128, 0.9)",border:"#22c55e"},error:{bg:"rgba(248, 113, 113, 0.9)",border:"#ef4444"},warning:{bg:"rgba(251, 191, 36, 0.9)",border:"#f59e0b"},info:{bg:"rgba(123, 183, 255, 0.9)",border:"#7bb7ff"}},a=o[t]||o.info,i=s.createElement("div");i.id="yyt-fallback-toast",i.style.cssText=`
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
  `,i.textContent=e,s.body.appendChild(i),setTimeout(()=>{i.style.animation="yyt-toast-out 0.3s ease forwards",setTimeout(()=>{i.remove()},300)},r)}function re(){if(xs)return xs;if(typeof window.parent<"u"&&window.parent!==window)try{if(window.parent.jQuery)return xs=window.parent.jQuery,xs}catch{}return window.jQuery&&(xs=window.jQuery),xs}function Bb(){xs=null}function ke(t){if(!t||t.length===0)return!1;let e=t[0];if(!e||e.nodeType!==1)return!1;let r=e.ownerDocument||document;return e.isConnected?r?.documentElement?.contains?r.documentElement.contains(e):!0:!1}function Br(...t){return t.flat(1/0).flatMap(e=>String(e||"").split(/\s+/)).map(e=>e.trim()).filter(Boolean).join(" ")}function nn(t={}){return Object.entries(t).filter(([,e])=>e!=null&&e!==!1).map(([e,r])=>r===!0?e:`${e}="${ce(String(r))}"`).join(" ")}function Lu(t=[],e="",r=""){let s=String(e??""),n=t.find(o=>o.value===s)||t.find(o=>o.disabled!==!0)||null;return n||{value:s,label:r||s||"\u8BF7\u9009\u62E9",disabled:!1}}function zb(t=""){return String(t||"").split(/\s+/).map(e=>e.trim()).filter(e=>e&&e!=="yyt-select"&&e!=="yyt-native-select-bridge")}function $u(t,e){let r=re();if(!r||!e?.length)return null;let s=e.attr("id")?`#${e.attr("id")}`:e.attr("data-yyt-select-key")?`[data-yyt-select-key="${e.attr("data-yyt-select-key")}"]`:"";if(!s)return null;let o=t.find("[data-yyt-custom-select]").filter((a,i)=>String(r(i).attr("data-yyt-select-target")||"")===s);return o.length?o.first():null}function Bu(t){let e=t?.[0];return e?.ownerDocument?e.ownerDocument:typeof window.parent<"u"&&window.parent!==window&&window.parent.document?window.parent.document:document}function Kb(t){if(!re()||!ke(t))return null;let r=t.find("[data-yyt-custom-select]");return r.length?r:null}function zu(t,e){if(!re()||!e?.length)return null;let s=e.find("[data-yyt-select-native]").first();if(s.length)return s;let n=String(e.attr("data-yyt-select-target")||"").trim();if(!n)return null;let o=t.find(n).first();return o.length?o:null}function Ku(t=null){return t?.jquery&&t[0]?.ownerDocument?t[0].ownerDocument:t?.ownerDocument?t.ownerDocument:t?.nodeType===9?t:Wt()}function ir(t=null){let e=Ku(t),r=Ou.get(e);return r||(r={targetDoc:e,layer:null,activeRoot:null,activeDropdown:null,placeholder:null,cleanup:null},Ou.set(e,r)),r}function Ub(t=null){let e=Ku(t);if(!e?.body)return null;let r=ir(e);if(r.layer&&r.layer.isConnected)return r.layer;let s=e.getElementById(Du);return s||(s=e.createElement("div"),s.id=Du,s.className="yyt-select-portal-layer",e.body.appendChild(s)),r.layer=s,s}function ba(t){if(!re()||!t?.length)return null;let r=t.find("[data-yyt-select-trigger]").first();return r.length?r:t.find(".yyt-select-trigger").first()}function Uu(t){let e=re();if(!e||!t?.length)return null;let r=ir(t);if(r.activeRoot===t[0]&&r.activeDropdown)return e(r.activeDropdown);let s=t.find("[data-yyt-select-dropdown]").first();return s.length?s:t.find(".yyt-select-dropdown").first()}function jb(t){t&&(t.classList.remove("yyt-floating-open"),t.removeAttribute("data-yyt-floating"),t.removeAttribute("data-yyt-floating-placement"),t.style.position="",t.style.top="",t.style.left="",t.style.right="",t.style.width="",t.style.minWidth="",t.style.maxWidth="",t.style.maxHeight="",t.style.visibility="",t.style.zIndex="")}function ju(t,e=null){if(!t)return!1;let r=ir(e||t);return r.activeRoot?.contains?.(t)||r.activeDropdown?.contains?.(t)?!0:!!t.closest?.("[data-yyt-custom-select], .yyt-select-portal-layer")}function Fb(t){if(!t?.targetDoc||typeof t.cleanup=="function")return;let e=t.targetDoc,r=e.defaultView||window,s=i=>{!t.activeRoot||!t.activeDropdown||ju(i.target,e)||ar(e)},n=i=>{if(i.key!=="Escape")return;let l=t.activeRoot;ar(e);let c=re();c&&l&&ba(c(l))?.trigger("focus")},o=()=>{hl(e)},a=()=>{hl(e)};e.addEventListener("mousedown",s,!0),e.addEventListener("keydown",n,!0),r.addEventListener("resize",o),e.addEventListener("scroll",a,!0),t.cleanup=()=>{e.removeEventListener("mousedown",s,!0),e.removeEventListener("keydown",n,!0),r.removeEventListener("resize",o),e.removeEventListener("scroll",a,!0)}}function Wb(t){typeof t?.cleanup=="function"&&t.cleanup(),t&&(t.cleanup=null)}function ml(t){let e=re();if(!e||!t?.activeRoot||!t?.activeDropdown)return;let r=t.targetDoc;if(!r?.body?.contains?.(t.activeRoot)){ar(r);return}let s=e(t.activeRoot),n=ba(s),o=t.activeDropdown,a=r?.defaultView||window;if(!n?.length||!o?.isConnected||!s[0]?.isConnected){ar(r);return}let i=n[0].getBoundingClientRect(),l=a.innerWidth||r.documentElement?.clientWidth||0,c=a.innerHeight||r.documentElement?.clientHeight||0,d=12,u=8,y=Math.max(0,c-i.bottom-d-u),p=Math.max(0,i.top-d-u),g=y<220&&p>y,h=Math.max(120,Math.floor((g?p:y)||0));o.setAttribute("data-yyt-floating","true"),o.setAttribute("data-yyt-floating-placement",g?"top":"bottom"),o.classList.add("yyt-floating-open");let x=Math.ceil(i.width),v=Math.max(x,Math.floor(l-d*2)),T=o.style.width,A=o.style.minWidth,E=o.style.maxWidth,w=o.style.visibility;o.style.width="max-content",o.style.minWidth=`${x}px`,o.style.maxWidth=`${v}px`,o.style.visibility="hidden";let P=Math.ceil(o.scrollWidth||o.getBoundingClientRect().width||x),$=Math.max(x,Math.min(v,P)),B=Math.min(o.scrollHeight||h,h);o.style.width=T,o.style.minWidth=A,o.style.maxWidth=E,o.style.visibility=w;let R=Math.round(i.left);R+$>l-d&&(R=Math.max(d,Math.round(l-d-$))),R=Math.max(d,R);let _=Math.round(g?i.top-u-B:i.bottom+u);_=Math.max(d,Math.min(_,Math.round(c-d-B))),o.style.position="fixed",o.style.top=`${_}px`,o.style.left=`${R}px`,o.style.right="auto",o.style.width=`${$}px`,o.style.minWidth=`${x}px`,o.style.maxWidth=`${v}px`,o.style.maxHeight=`${Math.floor(h)}px`,o.style.visibility="",o.style.zIndex="10050"}function ar(t=null){let e=re(),r=ir(t);if(!e||!r?.activeRoot)return;let s=r.activeRoot,n=r.activeDropdown,o=r.placeholder,a=e(s),i=ba(a);n&&(jb(n),o?.parentNode?o.parentNode.insertBefore(n,o):s?.isConnected?s.appendChild(n):n.remove()),o?.parentNode?.removeChild(o),a.removeClass("yyt-open"),i?.attr("aria-expanded","false"),r.activeRoot=null,r.activeDropdown=null,r.placeholder=null,Wb(r)}function hl(t=null){let e=ir(t);!e?.activeRoot||!e?.activeDropdown||ml(e)}function Fu(t){if(!re()||!t?.length)return;let r=t.first(),s=ba(r),n=Uu(r);if(!s?.length||!n?.length||s.prop("disabled"))return;let o=ir(r);if(o.activeRoot===r[0]){ml(o);return}ar(r);let a=Ub(r);if(!a)return;let i=n[0],l=o.targetDoc.createComment("yyt-select-dropdown-placeholder");i.parentNode?.insertBefore(l,i),a.appendChild(i),o.activeRoot=r[0],o.activeDropdown=i,o.placeholder=l,r.addClass("yyt-open"),s.attr("aria-expanded","true"),Fb(o),ml(o)}function Hb(t,e){let r=re();if(!r||!e?.length)return null;let s=e.closest("[data-yyt-custom-select]");if(s.length)return s.first();let n=ir(e);if(n.activeRoot&&n.activeDropdown?.contains?.(e[0])){let o=r(n.activeRoot);return t.has(n.activeRoot).length?o:null}return null}function xl(t){let e=ir(t);t?.length&&e.activeRoot&&e.activeRoot!==t[0]||ar(t)}function Wu(t){let e=ir(t);if(t?.length&&e.activeRoot===t[0]){ar(t);return}Fu(t)}function fl(t,e,r=null){let s=re();if(!s||!e?.length)return;let n=r||zu(t,e);if(!n?.length)return;let o=Array.isArray(n.data("yytCustomSelectOptions"))?n.data("yytCustomSelectOptions"):[],a=Lu(o,n.val(),e.attr("data-yyt-select-placeholder")||""),i=String(a.value??""),l=String(a.label??""),c=n.is(":disabled");e.find(".yyt-select-value").text(l).attr("data-value",i).data("value",i);let d=Uu(e);(d?.length?d.find("[data-yyt-select-option]"):e.find("[data-yyt-select-option]")).each((p,g)=>{let m=s(g),h=String(m.attr("data-value")||"")===i;m.toggleClass("yyt-selected",h).attr("aria-selected",String(h))});let y=e.find("[data-yyt-select-trigger]").first();y.prop("disabled",c),c&&(xl(e),e.removeClass("yyt-open"),y.attr("aria-expanded","false"))}function Hu(t=[]){return Array.isArray(t)?t.map(e=>{if(e&&typeof e=="object"&&!Array.isArray(e)){let s=String(e.value??""),n=String(e.label??e.text??e.name??s);return{value:s,label:n,disabled:e.disabled===!0}}let r=String(e??"");return{value:r,label:r,disabled:!1}}):[]}function Gu(t={}){let{selectedValue:e="",options:r=[],placeholder:s="\u8BF7\u9009\u62E9",disabled:n=!1,includeNative:o=!0,nativeTag:a="input",nativeType:i="hidden",rootAttributes:l={},nativeAttributes:c={},triggerAttributes:d={},dropdownAttributes:u={},optionAttributes:y={},optionClass:p="",optionTextClass:g=""}=t,m=Hu(r),h=Lu(m,e,s),x=n===!0||m.length===0,v=nn({...l,class:Br("yyt-custom-select",l.class),"data-yyt-custom-select":l["data-yyt-custom-select"]??"true","data-yyt-select-placeholder":s}),T=nn({type:"button",...d,class:Br("yyt-select-trigger",d.class),"data-yyt-select-trigger":d["data-yyt-select-trigger"]??"true","aria-haspopup":d["aria-haspopup"]??"listbox","aria-expanded":d["aria-expanded"]??"false",disabled:x?!0:d.disabled}),A=nn({...u,class:Br("yyt-select-dropdown",u.class),"data-yyt-select-dropdown":u["data-yyt-select-dropdown"]??"true",role:u.role??"listbox"}),E=o?(()=>{let w={...c,class:Br(c.class),"data-yyt-select-native":c["data-yyt-select-native"]??"true",disabled:x?!0:c.disabled};return a==="select"?`<select ${nn(w)}>${m.map(B=>`
            <option value="${ce(B.value)}" ${B.value===String(h.value??"")?"selected":""} ${B.disabled?"disabled":""}>${ce(B.label)}</option>
          `).join("")}</select>`:`<input ${nn({type:i,value:h.value,...w})}>`})():"";return`
    <div ${v}>
      ${E}
      <button ${T}>
        <span class="${ce(Br("yyt-select-value"))}" data-value="${ce(h.value)}">${ce(h.label)}</span>
        <i class="fa-solid fa-chevron-down yyt-select-arrow"></i>
      </button>
      <div ${A}>
        ${m.map(w=>{let P=w.value===String(h.value??"");return`
            <button ${nn({type:"button",...y,class:Br("yyt-select-option",p,y.class,P?"yyt-selected":""),"data-yyt-select-option":y["data-yyt-select-option"]??"true","data-value":w.value,role:y.role??"option","aria-selected":P?"true":"false",disabled:w.disabled?!0:y.disabled})}>
              <span class="${ce(Br("yyt-option-text",g))}">${ce(w.label)}</span>
            </button>
          `}).join("")}
      </div>
    </div>
  `}function Nt(t,e="yytCustomSelect"){let r=re();if(!r||!ke(t))return;let s=Bu(t),n=ir(s);n.activeRoot&&t.has(n.activeRoot).length&&ar(s),t.off(`.${e}`),r(s).off(`click.${e}`),r(s).off(`mousedown.${e}`),t.find('[data-yyt-enhanced-select="true"]').remove(),t.find(".yyt-native-select-bridge").each((o,a)=>{let i=r(a),l=i.attr("data-yyt-original-style");l!==void 0&&l?i.attr("style",l):i.removeAttr("style"),i.removeClass("yyt-native-select-bridge").removeAttr("data-yyt-original-style").removeAttr("data-yyt-select-key").removeData("yytCustomSelectOptions")})}function lr(t,e={}){let r=re();if(!r||!ke(t))return;let{namespace:s="yytCustomSelect",selectors:n=[]}=e,o=Array.isArray(n)?n.filter(Boolean):[n].filter(Boolean);if(o.length===0)return;Nt(t,s);let a=o.join(", "),i=Bu(t);t.find(a).each((l,c)=>{let d=r(c),u=String(d.attr("id")||"").trim(),y=u||`yyt-select-${Date.now()}-${l}`,p=u?`#${u}`:`[data-yyt-select-key="${y}"]`,g=`${y}-dropdown`,m=zb(d.attr("class")),h=d.attr("style"),x=d.find("option").map((A,E)=>{let w=r(E);return{value:String(w.attr("value")??w.val()??""),label:w.text(),disabled:w.is(":disabled")}}).get();d.attr("data-yyt-original-style",h??"").attr("data-yyt-select-key",y).addClass("yyt-native-select-bridge").css("display","none").data("yytCustomSelectOptions",x);let v=Gu({includeNative:!1,selectedValue:d.val(),options:x,disabled:d.is(":disabled"),placeholder:x[0]?.label||"\u8BF7\u9009\u62E9",rootAttributes:{class:Br(m),style:h||void 0,"data-yyt-enhanced-select":"true","data-yyt-select-target":p},triggerAttributes:{id:`${y}-trigger`,"aria-controls":g},dropdownAttributes:{id:g}});d.after(v);let T=$u(t,d);fl(t,T,d)}),t.on(`click.${s}`,"[data-yyt-select-trigger]",l=>{l.preventDefault(),l.stopPropagation();let c=r(l.currentTarget);if(c.prop("disabled"))return;let d=c.closest("[data-yyt-custom-select]");Wu(d)}),t.on(`change.${s}`,a,l=>{let c=r(l.currentTarget),d=c.find("option").map((y,p)=>{let g=r(p);return{value:String(g.attr("value")??g.val()??""),label:g.text(),disabled:g.is(":disabled")}}).get();c.data("yytCustomSelectOptions",d);let u=$u(t,c);fl(t,u,c)}),r(i).off(`click.${s}`).on(`click.${s}`,l=>{if(ju(l.target,i))return;let c=Kb(t);c?.length&&(ar(i),c.filter(".yyt-open").removeClass("yyt-open").find("[data-yyt-select-trigger]").attr("aria-expanded","false"))}),r(i).off(`mousedown.${s}`,".yyt-select-portal-layer [data-yyt-select-option]").on(`mousedown.${s}`,".yyt-select-portal-layer [data-yyt-select-option]",l=>{l.preventDefault(),l.stopPropagation();let c=r(l.currentTarget);if(c.prop("disabled"))return;let d=Hb(t,c);if(!d?.length)return;let u=zu(t,d);if(!u?.length)return;let y=String(c.attr("data-value")||"");u.val(y).trigger("change"),fl(t,d,u),xl(d)})}function Gb(t,e=ws){if(!re()||!ke(t))return{url:"",apiKey:"",model:"",useMainApi:!0,stream:!1,max_tokens:4096,temperature:.7,top_p:.9};let s=t.find(`#${e}-model`).val()?.trim()||"",n=t.find(`#${e}-model-select`);return n.is(":visible")&&(s=n.val()||s),{url:t.find(`#${e}-api-url`).val()?.trim()||"",apiKey:t.find(`#${e}-api-key`).val()||"",model:s,useMainApi:t.find(`#${e}-use-main-api`).is(":checked"),stream:t.find(`#${e}-stream`).is(":checked"),max_tokens:parseInt(t.find(`#${e}-max-tokens`).val())||4096,temperature:parseFloat(t.find(`#${e}-temperature`).val())??.7,top_p:parseFloat(t.find(`#${e}-top-p`).val())??.9}}function qb(t,e,r=ws){if(!re()||!ke(t)||!e)return;t.find(`#${r}-api-url`).val(e.url||""),t.find(`#${r}-api-key`).val(e.apiKey||""),t.find(`#${r}-model`).val(e.model||""),t.find(`#${r}-stream`).prop("checked",e.stream===!0),t.find(`#${r}-max-tokens`).val(e.max_tokens||4096),t.find(`#${r}-temperature`).val(e.temperature??.7),t.find(`#${r}-top-p`).val(e.top_p??.9);let n=e.useMainApi??!0;t.find(`#${r}-use-main-api`).prop("checked",n);let a=t.find(`#${r}-custom-api-fields`);n?a.addClass("yyt-disabled").find("input, button, select").prop("disabled",!0):a.removeClass("yyt-disabled").find("input, button, select").prop("disabled",!1),t.find(`#${r}-model`).show(),t.find(`#${r}-model-select`).hide()}function oo(t){let{id:e,title:r,body:s,width:n="380px",wide:o=!1,dialogClass:a="",bodyClass:i="",footerClass:l=""}=t;return`
    <div class="yyt-dialog-overlay" id="${e}-overlay">
      <div class="yyt-dialog ${o?"yyt-dialog-wide":""} ${a}" style="${n!=="380px"?`width: ${n};`:""} max-height: calc(100vh - 32px);">
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
  `}function ao(t,e,r={}){if(!re())return()=>{};let n=t.find(`#${e}-overlay`),o=()=>{n.remove(),a?.removeEventListener("keydown",i),r.onClose&&r.onClose()};n.find(`#${e}-close, #${e}-cancel`).on("click",o),n.on("click",function(l){l.target===this&&o()}),n.find(`#${e}-save`).on("click",function(){r.onSave&&r.onSave(o)});let a=n[0]?.ownerDocument||document,i=l=>{l.key==="Escape"&&(l.stopPropagation(),o())};return a.addEventListener("keydown",i),o}function _r(t,e,r={}){let{confirmText:s="\u786E\u5B9A",cancelText:n="\u53D6\u6D88",danger:o=!1,width:a="380px"}=r,i=re(),l=Wt();if(!i||!l?.body)return Promise.resolve(!1);let c=`yyt-confirm-${++qu}`;return new Promise(d=>{let u=!1,y=h=>{u||(u=!0,m.remove(),p?.focus(),d(h))},p=l.activeElement,g=`
      <div class="yyt-dialog-overlay" id="${c}-overlay">
        <div class="yyt-dialog" style="${a!=="380px"?`width: ${a};`:""} max-height: calc(100vh - 32px);">
          <div class="yyt-dialog-header">
            <span class="yyt-dialog-title">${ce(t)}</span>
            <button class="yyt-dialog-close" id="${c}-close">
              <i class="fa-solid fa-times"></i>
            </button>
          </div>
          <div class="yyt-dialog-body">
            <div style="color: var(--yyt-text-secondary); font-size: 13px; line-height: 1.6;">${ce(e)}</div>
          </div>
          <div class="yyt-dialog-footer">
            <button class="yyt-btn yyt-btn-secondary" id="${c}-cancel">${ce(n)}</button>
            <button class="yyt-btn ${o?"yyt-btn-danger":"yyt-btn-primary"}" id="${c}-confirm">${ce(s)}</button>
          </div>
        </div>
      </div>`,m=i(g).appendTo(l.body);m.find(`#${c}-confirm`).on("click",()=>y(!0)),m.find(`#${c}-cancel, #${c}-close`).on("click",()=>y(!1)),m.on("click",function(h){h.target===this&&y(!1)}),m.on("keydown",h=>{h.key==="Escape"&&(h.stopPropagation(),y(!1)),h.key==="Enter"&&(h.stopPropagation(),y(!0))}),m.find(`#${c}-${o?"cancel":"confirm"}`).trigger("focus")})}function Yb(t,e,r={}){let{defaultValue:s="",placeholder:n="",confirmText:o="\u786E\u5B9A",cancelText:a="\u53D6\u6D88",width:i="380px"}=r,l=re(),c=Wt();if(!l||!c?.body)return Promise.resolve(null);let d=`yyt-prompt-${++qu}`;return new Promise(u=>{let y=!1,p=T=>{y||(y=!0,h.remove(),g?.focus(),u(T))},g=c.activeElement,m=`
      <div class="yyt-dialog-overlay" id="${d}-overlay">
        <div class="yyt-dialog" style="${i!=="380px"?`width: ${i};`:""} max-height: calc(100vh - 32px);">
          <div class="yyt-dialog-header">
            <span class="yyt-dialog-title">${ce(t)}</span>
            <button class="yyt-dialog-close" id="${d}-close">
              <i class="fa-solid fa-times"></i>
            </button>
          </div>
          <div class="yyt-dialog-body">
            ${e?`<div style="color: var(--yyt-text-secondary); font-size: 13px; line-height: 1.6;">${ce(e)}</div>`:""}
            <input class="yyt-input" id="${d}-input" type="text" value="${ce(s)}" placeholder="${ce(n)}" />
          </div>
          <div class="yyt-dialog-footer">
            <button class="yyt-btn yyt-btn-secondary" id="${d}-cancel">${ce(a)}</button>
            <button class="yyt-btn yyt-btn-primary" id="${d}-confirm">${ce(o)}</button>
          </div>
        </div>
      </div>`,h=l(m).appendTo(c.body),x=h.find(`#${d}-input`),v=()=>{let T=x.val().trim();p(T||null)};h.find(`#${d}-confirm`).on("click",v),h.find(`#${d}-cancel, #${d}-close`).on("click",()=>p(null)),h.on("click",function(T){T.target===this&&p(null)}),x.on("keydown",T=>{T.key==="Enter"&&(T.stopPropagation(),v())}),h.on("keydown",T=>{T.key==="Escape"&&(T.stopPropagation(),p(null))}),x.trigger("focus").trigger("select")})}function Vb(t,e,r){if(t.prop("disabled")&&t.data("yytLoading"))return Promise.resolve();let s=t.html(),n=t.outerWidth();if(t.prop("disabled",!0).data("yytLoading",!0),t.css("min-width",n+"px"),r)t.html(`<i class="fa-solid fa-spinner fa-spin" style="margin-right:4px"></i>${ce(r)}`);else{let o=t.find("i.fa-solid, i.fa-regular").first();o.length?(o.data("yytOriginalClass",o.attr("class")),o.attr("class","fa-solid fa-spinner fa-spin")):t.html(`<i class="fa-solid fa-spinner fa-spin" style="margin-right:4px"></i>${s}`)}return Promise.resolve().then(()=>e()).finally(()=>{if(r)t.html(s);else{let o=t.find("i.fa-spinner"),a=o.data("yytOriginalClass");a?o.attr("class",a).removeData("yytOriginalClass"):t.html(s)}t.prop("disabled",!1).removeData("yytLoading").css("min-width","")})}function io(t,e){let r=new Blob([t],{type:"application/json"}),s=URL.createObjectURL(r),n=document.createElement("a");n.href=s,n.download=e,n.click(),URL.revokeObjectURL(s)}function lo(t){return new Promise((e,r)=>{let s=new FileReader;s.onload=n=>e(n.target.result),s.onerror=n=>r(new Error("\u6587\u4EF6\u8BFB\u53D6\u5931\u8D25")),s.readAsText(t)})}var Db,ws,gl,xs,Ou,Du,qu,at=N(()=>{H();Db=C.createScope("UIUtils"),ws="youyou_toolkit",gl=class{constructor(e={}){this._state={...e}}get(e){return this._state[e]}set(e,r){return this._state[e]=r,this}reset(e={}){return this._state={...e},this}toJSON(){return{...this._state}}};xs=null;Ou=new WeakMap,Du="yyt-select-portal-layer";qu=0});var Yu={};le(Yu,{StorageService:()=>vs,default:()=>Zb,getStorage:()=>Jb,loadSettings:()=>Xb,presetStorage:()=>Re,saveSettings:()=>Qb,storage:()=>z,toolStorage:()=>Se,windowStorage:()=>xa});function Jb(){let t=z;return t._getStorage(),t._storage}function Xb(){return z.get("settings",{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}})}function Qb(t){z.set("settings",t)}var wl,vs,z,Se,Re,xa,Zb,He=N(()=>{H();wl=C.createScope("StorageService"),vs=class t{constructor(e="youyou_toolkit"){this.namespaceKey=e,this._storage=null,this._cache=new Map}_getStorage(){if(this._storage)return this._storage;try{let e=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(e.SillyTavern?.getContext){let r=e.SillyTavern.getContext();if(r?.extensionSettings)return r.extensionSettings[this.namespaceKey]||(r.extensionSettings[this.namespaceKey]={}),this._storage={_target:r.extensionSettings[this.namespaceKey],getItem:s=>{let n=r.extensionSettings[this.namespaceKey][s];return typeof n=="string"?n:n?JSON.stringify(n):null},setItem:(s,n)=>{r.extensionSettings[this.namespaceKey][s]=n,this._saveSettings(r)},removeItem:s=>{delete r.extensionSettings[this.namespaceKey][s],this._saveSettings(r)},_isTavern:!0},this._storage}}catch{wl.warn("SillyTavern\u5B58\u50A8\u4E0D\u53EF\u7528\uFF0C\u4F7F\u7528localStorage")}return this._storage={getItem:e=>{try{return localStorage.getItem(e)}catch{return null}},setItem:(e,r)=>{try{localStorage.setItem(e,r)}catch(s){wl.error("localStorage\u5199\u5165\u5931\u8D25:",s)}},removeItem:e=>{try{localStorage.removeItem(e)}catch{}},_isTavern:!1},this._storage}_saveSettings(e){if(typeof e.saveSettings=="function")try{e.saveSettings()}catch{}else if(typeof e.saveSettingsDebounced=="function")try{e.saveSettingsDebounced()}catch{}}get(e,r=null){let s=`${this.namespaceKey}:${e}`;if(this._cache.has(s))return this._cache.get(s);let n=this._getStorage(),o=this._getFullKey(e),a=n.getItem(o);if(a===null)return r;try{let i=JSON.parse(a);return this._cache.set(s,i),i}catch{return a}}set(e,r){let s=this._getStorage(),n=this._getFullKey(e),o=`${this.namespaceKey}:${e}`;this._cache.set(o,r);try{s.setItem(n,JSON.stringify(r))}catch(a){wl.error("\u5B58\u50A8\u5931\u8D25:",a)}}remove(e){let r=this._getStorage(),s=this._getFullKey(e),n=`${this.namespaceKey}:${e}`;this._cache.delete(n),r.removeItem(s)}has(e){let r=this._getStorage(),s=this._getFullKey(e);return r.getItem(s)!==null}clear(){if(this._getStorage()._isTavern){let r=typeof window.parent<"u"?window.parent:window;if(r.SillyTavern?.getContext){let s=r.SillyTavern.getContext();s?.extensionSettings?.[this.namespaceKey]&&(s.extensionSettings[this.namespaceKey]={},this._saveSettings(s))}}else{let r=`${this.namespaceKey}_`,s=[];for(let n=0;n<localStorage.length;n++){let o=localStorage.key(n);o&&o.startsWith(r)&&s.push(o)}s.forEach(n=>localStorage.removeItem(n))}this._cache.clear()}_getFullKey(e){return this._getStorage()._isTavern?e:`${this.namespaceKey}_${e}`}namespace(e){return new t(`${this.namespaceKey}:${e}`)}getMultiple(e){let r={};return e.forEach(s=>{r[s]=this.get(s)}),r}setMultiple(e){Object.entries(e).forEach(([r,s])=>{this.set(r,s)})}exportAll(){let e=this._getStorage(),r={};if(e._isTavern){let s=typeof window.parent<"u"?window.parent:window;if(s.SillyTavern?.getContext){let o=s.SillyTavern.getContext()?.extensionSettings?.[this.namespaceKey]||{};Object.entries(o).forEach(([a,i])=>{r[a]=typeof i=="string"?JSON.parse(i):i})}}else{let s=`${this.namespaceKey}_`;for(let n=0;n<localStorage.length;n++){let o=localStorage.key(n);if(o&&o.startsWith(s)){let a=o.slice(s.length);try{r[a]=JSON.parse(localStorage.getItem(o))}catch{r[a]=localStorage.getItem(o)}}}}return r}},z=new vs("youyou_toolkit"),Se=new vs("youyou_toolkit:tools"),Re=new vs("youyou_toolkit:presets"),xa=new vs("youyou_toolkit:windows");Zb=z});var Zu={};le(Zu,{API_STATUS:()=>ax,fetchAvailableModels:()=>gx,getApiConfig:()=>on,getEffectiveApiConfig:()=>co,hasEffectiveApiPreset:()=>uo,sendApiRequest:()=>yo,sendWithPreset:()=>po,testApiConnection:()=>fx,updateApiConfig:()=>lx,validateApiConfig:()=>wa});function sx(){return{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,stream:!1,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}}}function Tl(){return z.get(Vu,sx())}function nx(t){z.set(Vu,t)}function Ju(){return z.get(tx,[])}function ox(){return z.get(rx,"")}function vl(t,e={}){let r=new Error(t);return r.allowDirectFallback=e.allowDirectFallback===!0,r}function Xu(t,e="chat_completions"){let r=String(t||"").trim();if(!r)return"";let s=null;try{s=new URL(r)}catch{return r}let n=s.pathname.replace(/\/+$/,""),o=n;return e==="chat_completions"?!/\/chat\/completions$/i.test(n)&&!/\/completions$/i.test(n)&&(o=`${n||""}/chat/completions`):e==="models"&&(/\/chat\/completions$/i.test(n)?o=n.replace(/\/chat\/completions$/i,"/models"):/\/completions$/i.test(n)?o=n.replace(/\/completions$/i,"/models"):/\/models$/i.test(n)||(o=`${n||""}/models`)),s.pathname=o.replace(/\/+/g,"/"),s.toString()}function ix(t){let e=String(t||"").trim();if(!e)return"";try{let r=new URL(e);return r.pathname=r.pathname.replace(/\/chat\/completions$/i,"").replace(/\/completions$/i,"").replace(/\/models$/i,"").replace(/\/+$/,"")||"/",r.toString().replace(/\/$/,"")}catch{return e.replace(/\/chat\/completions$/i,"").replace(/\/completions$/i,"").replace(/\/models$/i,"").replace(/\/+$/,"")}}function on(){return Tl().apiConfig||{}}function lx(t){let e=Tl();e.apiConfig={...e.apiConfig,...t},nx(e)}function wa(t){let e=[];if(t.useMainApi)return{valid:!0,errors:[]};if(!t.url||!t.url.trim())e.push("API URL \u4E0D\u80FD\u4E3A\u7A7A");else try{new URL(t.url)}catch{e.push("API URL \u683C\u5F0F\u65E0\u6548")}return(!t.model||!t.model.trim())&&e.push("\u6A21\u578B\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"),{valid:e.length===0,errors:e}}function co(t=""){let e=Tl(),r=t||ox()||"";if(r){let n=Ju().find(o=>o.name===r);if(n&&n.apiConfig)return{...n.apiConfig,presetName:n.name}}return e.apiConfig||{}}function uo(t=""){return t?Ju().some(r=>r?.name===t):!1}async function po(t,e,r={},s=null){let n=co(t);return await yo(e,{...r,apiConfig:n},s)}function Qu(t,e={}){let r=e.apiConfig||on();return{messages:t,model:r.model||"gpt-3.5-turbo",max_tokens:r.max_tokens||4096,temperature:r.temperature??.7,top_p:r.top_p??.9,stream:r.stream??!1,...e.extraParams}}function Sl(t){let e="";if(t?.choices&&t.choices[0]?.message?.content)e=t.choices[0].message.content;else if(t?.content)e=t.content;else if(t?.text)e=t.text;else if(t?.response)e=t.response;else throw new Error(`\u65E0\u6CD5\u89E3\u6790API\u54CD\u5E94\u683C\u5F0F: ${JSON.stringify(t).slice(0,200)}`);return String(e||"").trim()}async function yo(t,e={},r=null){let s=e.apiConfig||on(),n=s.useMainApi,o=wa(s);if(!o.valid&&!n)throw new Error(`API\u914D\u7F6E\u65E0\u6548: ${o.errors.join(", ")}`);return n?await cx(t,e,r):await dx(t,s,e,r)}async function cx(t,e,r){let s=typeof window.parent<"u"?window.parent:window;if(!s.TavernHelper?.generateRaw)throw new Error("TavernHelper.generateRaw \u4E0D\u53EF\u7528\u3002\u8BF7\u68C0\u67E5SillyTavern\u7248\u672C\u3002");try{let n=await s.TavernHelper.generateRaw({ordered_prompts:t,should_stream:e.apiConfig?.stream??on().stream??!1,...e.extraParams});if(typeof n!="string")throw new Error("\u4E3BAPI\u8FD4\u56DE\u4E86\u975E\u9884\u671F\u7684\u54CD\u5E94\u7C7B\u578B");return n.trim()}catch(n){throw n.name==="AbortError"?n:new Error(`\u4E3BAPI\u8BF7\u6C42\u5931\u8D25: ${n.message}`)}}async function dx(t,e,r,s){let n=typeof window.parent<"u"?window.parent:window;if(n.TavernHelper?.generateRaw)try{return await ux(t,e,r,s,n)}catch(o){let a=String(o?.message||o||"");if(o?.name==="AbortError"||s?.aborted||a.includes("\u505C\u6B62\u6309\u94AE")||a.includes("stop button")||a.includes("Clicked stop")||a==="\u8BF7\u6C42\u5DF2\u53D6\u6D88")throw o;ex.warn("TavernHelper \u81EA\u5B9A\u4E49\u8BF7\u6C42\u5931\u8D25\uFF0C\u56DE\u9000\u5230\u540E\u5907\u94FE\u8DEF:",o)}if(n.SillyTavern?.getRequestHeaders)try{return await px(t,e,r,s,n)}catch(o){if(!o?.allowDirectFallback)throw o}return await yx(t,e,r,s)}async function ux(t,e,r,s,n){if(s?.aborted)throw new DOMException("\u8BF7\u6C42\u5DF2\u53D6\u6D88","AbortError");let o=await n.TavernHelper.generateRaw({ordered_prompts:t,should_stream:e.stream??!1,max_chat_history:0,custom_api:{apiurl:ix(e.url),key:e.apiKey||"",model:e.model||"gpt-3.5-turbo",max_tokens:e.max_tokens||4096,temperature:e.temperature??.7,top_p:e.top_p??.9},...r.extraParams||{}});return typeof o=="string"?o.trim():Sl(o)}async function px(t,e,r,s,n){let o=String(e.url||"").trim(),a={...Qu(t,{apiConfig:e,...r}),chat_completion_source:"custom",reverse_proxy:o,proxy_password:"",custom_url:o,custom_include_headers:e.apiKey?`Authorization: Bearer ${e.apiKey}`:""},i={...typeof n.SillyTavern?.getRequestHeaders=="function"?n.SillyTavern.getRequestHeaders():{},"Content-Type":"application/json"},l=null;try{l=await fetch("/api/backends/chat-completions/generate",{method:"POST",headers:i,body:JSON.stringify(a),signal:s})}catch(u){throw u?.name==="AbortError"?u:vl(`\u9152\u9986\u540E\u7AEF\u8F6C\u53D1\u8BF7\u6C42\u4E0D\u53EF\u7528\uFF0C\u5DF2\u5C1D\u8BD5\u56DE\u9000\u5230\u6D4F\u89C8\u5668\u76F4\u8FDE\u3002\u539F\u59CB\u9519\u8BEF: ${u.message}`,{allowDirectFallback:!0})}let c=await l.text().catch(()=>"");if(!l.ok){let u=[404,405,501,502].includes(l.status);throw vl(`\u9152\u9986\u540E\u7AEF\u8F6C\u53D1\u8BF7\u6C42\u5931\u8D25 (${l.status}): ${c||"Unknown error"}`,{allowDirectFallback:u})}let d=null;try{d=c?JSON.parse(c):{}}catch{let y=String(c||"").replace(/\s+/g," ").trim().slice(0,120);throw vl(`\u9152\u9986\u540E\u7AEF\u8FD4\u56DE\u4E86\u975EJSON\u5185\u5BB9\u3002\u54CD\u5E94\u7247\u6BB5: ${y||"(\u7A7A\u54CD\u5E94)"}`)}return Sl(d)}async function yx(t,e,r,s){let n=Qu(t,{apiConfig:e,...r}),o=Xu(e.url,"chat_completions"),a={"Content-Type":"application/json"};e.apiKey&&(a.Authorization=`Bearer ${e.apiKey}`);let i=await fetch(o,{method:"POST",headers:a,body:JSON.stringify(n),signal:s}),l=await i.text().catch(()=>"");if(!i.ok){let d=l||"Unknown error";throw new Error(`API\u8BF7\u6C42\u5931\u8D25 (${i.status}): ${d}`)}let c=null;try{c=l?JSON.parse(l):{}}catch{let u=String(l||"").replace(/\s+/g," ").trim().slice(0,120);throw new Error(`\u81EA\u5B9A\u4E49API\u8FD4\u56DE\u7684\u4E0D\u662FJSON\uFF0C\u53EF\u80FD\u662FURL\u914D\u7F6E\u9519\u8BEF\u3001\u53EA\u586B\u5199\u4E86\u7AD9\u70B9\u9996\u9875/\u57FA\u7840\u8DEF\u5F84\u3001\u6216\u8BF7\u6C42\u88AB\u91CD\u5B9A\u5411\u3002\u5F53\u524D\u4F1A\u81EA\u52A8\u5C1D\u8BD5\u8865\u5168 chat/completions \u7AEF\u70B9\uFF1B\u82E5\u4ECD\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5API URL\uFF0C\u6216\u6539\u4E3A\u542F\u7528\u201C\u4F7F\u7528SillyTavern\u4E3BAPI\u201D\u3002\u54CD\u5E94\u7247\u6BB5: ${u||"(\u7A7A\u54CD\u5E94)"}`)}return Sl(c)}async function fx(t=null){let e=t||on(),r=Date.now();try{await yo([{role:"user",content:'Hello, this is a connection test. Please respond with "OK".'}],{apiConfig:e});let n=Date.now()-r;return{success:!0,message:`\u8FDE\u63A5\u6210\u529F (\u5EF6\u8FDF: ${n}ms)`,latency:n}}catch(s){return{success:!1,message:`\u8FDE\u63A5\u5931\u8D25: ${s.message}`,latency:Date.now()-r}}}async function gx(t=null){let e=t||on();return e.useMainApi?await mx():await hx(e)}async function mx(){let t=typeof window.parent<"u"?window.parent:window;try{if(t.SillyTavern?.getContext){let e=t.SillyTavern.getContext();if(e.settings?.api_server)return[e.settings.api_server]}return["gpt-4","gpt-4-turbo","gpt-3.5-turbo","claude-3-opus","claude-3-sonnet"]}catch{return["gpt-4","gpt-3.5-turbo"]}}async function hx(t){if(!t.url||!t.apiKey)return[];try{let e=Xu(t.url,"models"),r=await fetch(e,{method:"GET",headers:{Authorization:`Bearer ${t.apiKey}`}});if(!r.ok)return[];let s=await r.json();return s.data&&Array.isArray(s.data)?s.data.map(n=>n.id||n.name).filter(Boolean).sort():[]}catch{return[]}}var ex,Vu,tx,rx,ax,fo=N(()=>{He();H();ex=C.createScope("ApiConnection"),Vu="settings",tx="api_presets",rx="current_preset";ax={IDLE:"idle",CONNECTING:"connecting",SUCCESS:"success",ERROR:"error"}});var sp={};le(sp,{createPreset:()=>Sa,createPresetFromCurrentConfig:()=>_x,deletePreset:()=>_a,duplicatePreset:()=>Cl,exportPresets:()=>kl,generateUniquePresetName:()=>Ex,getActiveConfig:()=>Sx,getActivePresetName:()=>Il,getAllPresets:()=>zr,getPreset:()=>Ss,getPresetNames:()=>_l,getStarredPresets:()=>Tx,importPresets:()=>Rl,presetExists:()=>go,renamePreset:()=>El,switchToPreset:()=>Aa,togglePresetStar:()=>vx,updatePreset:()=>Al,validatePreset:()=>Ax});function wx(){return{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}}}function rp(){return z.get(xx,wx())}function St(){return z.get(ep,[])}function Ts(t){z.set(ep,t)}function Ta(){return z.get(tp,"")}function va(t){z.set(tp,t||"")}function zr(){return St()}function _l(){return St().map(e=>e.name)}function Ss(t){return!t||typeof t!="string"?null:St().find(r=>r.name===t)||null}function go(t){return!t||typeof t!="string"?!1:St().some(r=>r.name===t)}function Sa(t){let{name:e,description:r,apiConfig:s}=t;if(!e||typeof e!="string"||!e.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let n=e.trim();if(go(n))return{success:!1,message:`\u9884\u8BBE "${n}" \u5DF2\u5B58\u5728`};let o={name:n,description:r||"",apiConfig:{url:s?.url||"",apiKey:s?.apiKey||"",model:s?.model||"",useMainApi:s?.useMainApi??!0,stream:s?.stream??!1,max_tokens:s?.max_tokens||4096,temperature:s?.temperature??.7,top_p:s?.top_p??.9},createdAt:Date.now(),updatedAt:Date.now()},a=St();return a.push(o),Ts(a),{success:!0,message:`\u9884\u8BBE "${n}" \u521B\u5EFA\u6210\u529F`,preset:o}}function Al(t,e){if(!t||typeof t!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let r=St(),s=r.findIndex(a=>a.name===t);if(s===-1)return{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if(e.name&&e.name!==t)return{success:!1,message:"\u4E0D\u652F\u6301\u4FEE\u6539\u9884\u8BBE\u540D\u79F0\uFF0C\u8BF7\u521B\u5EFA\u65B0\u9884\u8BBE"};let n=r[s],o={...n,...e,name:n.name,updatedAt:Date.now()};return e.apiConfig&&(o.apiConfig={...n.apiConfig,...e.apiConfig}),r[s]=o,Ts(r),{success:!0,message:`\u9884\u8BBE "${t}" \u66F4\u65B0\u6210\u529F`,preset:o}}function _a(t){if(!t||typeof t!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let e=St(),r=e.findIndex(s=>s.name===t);return r===-1?{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`}:(e.splice(r,1),Ts(e),Ta()===t&&va(""),{success:!0,message:`\u9884\u8BBE "${t}" \u5DF2\u5220\u9664`})}function El(t,e){if(!t||typeof t!="string")return{success:!1,message:"\u539F\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};if(!e||typeof e!="string"||!e.trim())return{success:!1,message:"\u65B0\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let r=e.trim();if(!go(t))return{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if(go(r))return{success:!1,message:`\u9884\u8BBE "${r}" \u5DF2\u5B58\u5728`};let s=St(),n=s.find(o=>o.name===t);return n&&(n.name=r,n.updatedAt=Date.now(),Ts(s),Ta()===t&&va(r)),{success:!0,message:`\u9884\u8BBE\u5DF2\u91CD\u547D\u540D\u4E3A "${r}"`}}function Cl(t,e){if(!t||typeof t!="string")return{success:!1,message:"\u6E90\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};if(!e||typeof e!="string"||!e.trim())return{success:!1,message:"\u76EE\u6807\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let r=e.trim(),s=Ss(t);if(!s)return{success:!1,message:`\u6E90\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if(go(r))return{success:!1,message:`\u9884\u8BBE "${r}" \u5DF2\u5B58\u5728`};let n={...JSON.parse(JSON.stringify(s)),name:r,createdAt:Date.now(),updatedAt:Date.now()},o=St();return o.push(n),Ts(o),{success:!0,message:`\u9884\u8BBE\u5DF2\u590D\u5236\u4E3A "${r}"`,preset:n}}function vx(t){if(!t||typeof t!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let e=St(),r=e.find(s=>s.name===t);return r?(r.starred=!r.starred,r.updatedAt=Date.now(),Ts(e),{success:!0,message:r.starred?`\u5DF2\u5C06 "${t}" \u6DFB\u52A0\u5230\u9884\u89C8\u5217\u8868`:`\u5DF2\u5C06 "${t}" \u4ECE\u9884\u89C8\u5217\u8868\u79FB\u9664`,starred:r.starred}):{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`}}function Tx(){return St().filter(e=>e.starred===!0)}function Aa(t){if(!t)return va(""),{success:!0,message:"\u5DF2\u5207\u6362\u5230\u5F53\u524DAPI\u914D\u7F6E"};let e=Ss(t);return e?(va(t),{success:!0,message:`\u5DF2\u5207\u6362\u5230\u9884\u8BBE "${t}"`,apiConfig:e.apiConfig}):{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`}}function Il(){return Ta()}function Sx(){let t=Ta();if(t){let r=Ss(t);if(r)return{presetName:t,apiConfig:r.apiConfig}}return{presetName:"",apiConfig:rp().apiConfig||{}}}function kl(t=null){if(t){let r=Ss(t);if(!r)throw new Error(`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`);return JSON.stringify(r,null,2)}let e=St();return JSON.stringify(e,null,2)}function Rl(t,e={overwrite:!1}){let r;try{r=JSON.parse(t)}catch(a){return bx.error("\u9884\u8BBE\u5BFC\u5165\u5931\u8D25: JSON\u89E3\u6790\u9519\u8BEF",{error:a}),{success:!1,message:"JSON\u89E3\u6790\u5931\u8D25",imported:0}}let s=Array.isArray(r)?r:[r];if(s.length===0)return{success:!1,message:"\u6CA1\u6709\u627E\u5230\u6709\u6548\u7684\u9884\u8BBE\u6570\u636E",imported:0};let n=St(),o=0;for(let a of s){if(!a.name||typeof a.name!="string"||!a.apiConfig||typeof a.apiConfig!="object")continue;let i=n.findIndex(l=>l.name===a.name);i>=0?e.overwrite&&(a.updatedAt=Date.now(),n[i]=a,o++):(a.createdAt=a.createdAt||Date.now(),a.updatedAt=Date.now(),n.push(a),o++)}return o>0&&Ts(n),{success:!0,message:`\u6210\u529F\u5BFC\u5165 ${o} \u4E2A\u9884\u8BBE`,imported:o}}function _x(t,e=""){let r=rp();return Sa({name:t,description:e,apiConfig:r.apiConfig})}function Ax(t){let e=[];return(!t.name||typeof t.name!="string"||!t.name.trim())&&e.push("\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"),(!t.apiConfig||typeof t.apiConfig!="object")&&e.push("\u7F3A\u5C11API\u914D\u7F6E"),{valid:e.length===0,errors:e}}function Ex(t){(!t||typeof t!="string")&&(t="\u65B0\u9884\u8BBE");let e=St(),r=new Set(e.map(n=>n.name));if(!r.has(t))return t;let s=1;for(;r.has(`${t} (${s})`);)s++;return`${t} (${s})`}var bx,xx,ep,tp,an=N(()=>{He();H();bx=C.createScope("PresetManager"),xx="settings",ep="api_presets",tp="current_preset"});var ln,mo,Zt,Ml=N(()=>{ot();at();H();ln=C.createScope("UIManager"),mo=class{constructor(){this.components=new Map,this.activeInstances=new Map,this.dependencies={},this.currentTab="main",this.currentSubTab={},this.initialized=!1}init(e={}){this.initialized||(this.dependencies=e.services||{},this._subscribeEvents(),this.initialized=!0,W.emit(j.UI_INITIALIZED),ln.log("\u521D\u59CB\u5316\u5B8C\u6210"))}register(e,r){return!e||!r?(ln.warn("\u65E0\u6548\u7684\u7EC4\u4EF6\u6CE8\u518C"),!1):(this.components.set(e,{id:e,...r,render:r.render||(()=>""),bindEvents:r.bindEvents||(()=>{}),destroy:r.destroy||(()=>{}),getStyles:r.getStyles||(()=>"")}),!0)}unregister(e){this.destroyInstance(e),this.components.delete(e)}getComponent(e){return this.components.get(e)}render(e,r,s={}){let n=re();if(!n){ln.error("jQuery\u4E0D\u53EF\u7528");return}let o=this.components.get(e);if(!o){ln.error(`\u7EC4\u4EF6\u4E0D\u5B58\u5728: ${e}`);let i;typeof r=="string"?i=n(r):r&&r.jquery?i=r:r&&(i=n(r)),i?.length&&i.html(`<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u7EC4\u4EF6\u672A\u6CE8\u518C\uFF1A${e}</span></div>`);return}let a;if(typeof r=="string"?a=n(r):r&&r.jquery?a=r:r&&(a=n(r)),!ke(a)){ln.warn("\u5BB9\u5668\u4E0D\u5B58\u5728");return}this.activeInstances.forEach((i,l)=>{i?.container?.length&&a.length&&i.container[0]===a[0]&&l!==e&&this.destroyInstance(l)}),this.destroyInstance(e);try{if(typeof o.renderTo=="function")o.renderTo(a,{...s,dependencies:this.dependencies});else{let i=o.render({...s,dependencies:this.dependencies});a.html(i),o.bindEvents(a,this.dependencies)}}catch(i){ln.error(`\u7EC4\u4EF6\u6E32\u67D3\u5931\u8D25: ${e}`,i),a.html(`<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u7EC4\u4EF6\u6E32\u67D3\u5931\u8D25\uFF1A${e}${i?.message?` - ${i.message}`:""}</span></div>`);return}this.activeInstances.set(e,{container:a,component:o,props:s}),W.emit(j.UI_RENDER_REQUESTED,{componentId:e})}destroyInstance(e){let r=this.activeInstances.get(e);r&&(r.component.destroy(r.container),this.activeInstances.delete(e))}destroyContainerInstance(e){let r=re();if(!r||!e)return;let s;if(typeof e=="string"?s=r(e):e?.jquery?s=e:s=r(e),!s?.length)return;let n=[];this.activeInstances.forEach((o,a)=>{o?.container?.length&&o.container[0]===s[0]&&n.push(a)}),n.forEach(o=>this.destroyInstance(o))}switchTab(e){let r=this.currentTab;this.currentTab=e,W.emit(j.UI_TAB_CHANGED,{tabId:e,oldTab:r})}getCurrentTab(){return this.currentTab}switchSubTab(e,r){this.currentSubTab[e]=r,W.emit(j.UI_SUBTAB_CHANGED,{mainTab:e,subTab:r})}getCurrentSubTab(e){return this.currentSubTab[e]||""}getAllStyles(){let e="";return this.components.forEach((r,s)=>{r.getStyles&&(e+=r.getStyles())}),e}injectStyles(e=document){let r="yyt-component-styles";if(e.getElementById(r))return;let s=e.createElement("style");s.id=r,s.textContent=this.getAllStyles(),(e.head||e.documentElement).appendChild(s)}setDependency(e,r){this.dependencies[e]=r}getDependency(e){return this.dependencies[e]}_subscribeEvents(){W.on(j.PRESET_UPDATED,()=>{}),W.on(j.TOOL_UPDATED,()=>{})}},Zt=new mo});function f(t,e={},...r){let s=document.createElement(t);if(e.className&&(s.className=e.className),e.text!==void 0&&e.text!==null&&(s.textContent=String(e.text)),e.html!==void 0&&e.html!==null&&(s.innerHTML=String(e.html)),e.attrs)for(let[n,o]of Object.entries(e.attrs))o==null||o===!1||s.setAttribute(n,o===!0?"":String(o));if(e.style&&Object.assign(s.style,e.style),e.dataset)for(let[n,o]of Object.entries(e.dataset))s.dataset[n]=String(o);for(let n of r)G(s,n);return s}function G(t,e){if(!(e==null||e===!1)){if(Array.isArray(e)){for(let r of e)G(t,r);return}if(typeof e=="string"||typeof e=="number"){t.appendChild(document.createTextNode(String(e)));return}if(e instanceof Node){t.appendChild(e);return}if(e&&e.el instanceof Node){t.appendChild(e.el);return}}}function np(){let t=new Map;return{on(e,r){return!e||typeof r!="function"?()=>{}:(t.has(e)||t.set(e,new Set),t.get(e).add(r),()=>this.off(e,r))},off(e,r){let s=t.get(e);s&&s.delete(r)},emit(e,...r){let s=t.get(e);if(s)for(let n of[...s])try{n(...r)}catch{}},clear(){t.clear()}}}function Pl(t,e){if(!t||!e)return null;if(t._id===e)return t;let r=t._children;if(!r)return null;let s=r instanceof Map?[...r.values()]:Array.isArray(r)?r:[];for(let n of s){let o=Pl(n,e);if(o)return o}return null}function Pe({id:t=null,kind:e="control",el:r=null,style:s=null,className:n=null,attrs:o=null}={}){if(r){if(s&&Object.assign(r.style,s),n){let i=String(n).trim().split(/\s+/).filter(Boolean);i.length&&r.classList.add(...i)}if(o)for(let[i,l]of Object.entries(o))l===!1||l==null||r.setAttribute(i,l===!0?"":String(l))}let a=np();return{_id:t||null,_kind:e,_children:null,_emitter:a,on(i,l){return a.on(i,l)},off(i,l){a.off(i,l)},getControl(i){return Pl(this,i)},get(){},set(i){},destroy(){if(a.clear(),this._children){let i=this._children instanceof Map?[...this._children.values()]:Array.isArray(this._children)?this._children:[];for(let l of i)try{l?.destroy?.()}catch{}this._children instanceof Map?this._children.clear():Array.isArray(this._children)&&(this._children.length=0)}if(this.el?.parentNode)try{this.el.parentNode.removeChild(this.el)}catch{}}}}var ft=N(()=>{});function q(t={}){let{id:e=null,label:r="",icon:s=null,variant:n="default",size:o="normal",disabled:a=!1,title:i=null,onClick:l=null}=t,c=["yyt-btn"];n==="primary"?c.push("yyt-btn-primary"):n==="danger"?c.push("yyt-btn-danger"):n==="ghost"&&c.push("yyt-btn-secondary"),o==="small"&&c.push("yyt-btn-small");let d=f("button",{className:c.join(" "),attrs:{type:"button",disabled:a?"disabled":null,title:i}}),u=null;s&&(u=f("span",{className:"yyt-btn-icon-glyph",text:s}),d.appendChild(u));let y=f("span",{text:r});d.appendChild(y);let p={...Pe({id:e,kind:"button",el:d,style:t.style,className:t.className,attrs:t.attrs}),el:d,setLabel(g){y.textContent=String(g||"")},setIcon(g){u&&(u.textContent=String(g||""))},setDisabled(g){g?d.setAttribute("disabled","disabled"):d.removeAttribute("disabled")},isDisabled(){return d.hasAttribute("disabled")},get(){return y.textContent},set(g){this.setLabel(g)}};return d.addEventListener("click",g=>{if(!d.hasAttribute("disabled")){if(typeof l=="function")try{l(g,p)}catch(m){console.error("[button] onClick \u5F02\u5E38",m)}p._emitter.emit("click",g)}}),p}var op=N(()=>{ft()});function ge(t={}){let{id:e=null,placeholder:r="",value:s="",type:n="text",disabled:o=!1,maxLength:a=null,onInput:i=null,onChange:l=null}=t,c=f("input",{className:"yyt-input",attrs:{type:n,placeholder:r,disabled:o?"disabled":null,maxlength:a!=null?String(a):null}});c.value=s==null?"":String(s);let d={...Pe({id:e,kind:"textInput",el:c,style:t.style,className:t.className,attrs:t.attrs}),el:c,get(){return c.value},set(u,{silent:y=!1}={}){c.value=u==null?"":String(u),y||d._emitter.emit("change",c.value)},setPlaceholder(u){c.placeholder=u==null?"":String(u)},setDisabled(u){c.disabled=!!u},focus(){c.focus()},select(){c.select()}};return c.addEventListener("input",()=>{if(typeof i=="function")try{i(c.value,d)}catch(u){console.error("[textInput] onInput \u5F02\u5E38",u)}d._emitter.emit("input",c.value)}),c.addEventListener("change",()=>{if(typeof l=="function")try{l(c.value,d)}catch(u){console.error("[textInput] onChange \u5F02\u5E38",u)}d._emitter.emit("change",c.value)}),c.addEventListener("blur",()=>d._emitter.emit("blur",c.value)),d}var ap=N(()=>{ft()});function _e(t={}){let{id:e=null,options:r=[],value:s="",placeholder:n=null,disabled:o=!1,onChange:a=null}=t,i=f("select",{className:"yyt-select",attrs:{disabled:o?"disabled":null}});function l(d,u){if(i.innerHTML="",n!==null){let y=f("option",{text:n,attrs:{value:"",disabled:"disabled",selected:u?null:"selected"}});i.appendChild(y)}for(let y of d){let p=f("option",{text:y.label??String(y.value),attrs:{value:String(y.value),selected:String(y.value)===String(u)?"selected":null,disabled:y.disabled?"disabled":null}});i.appendChild(p)}}l(r,s);let c={...Pe({id:e,kind:"select",el:i,style:t.style,className:t.className,attrs:t.attrs}),el:i,get(){return i.value},set(d,{silent:u=!1}={}){i.value=d==null?"":String(d),u||c._emitter.emit("change",i.value)},setOptions(d,u){l(d||[],u??i.value)},setDisabled(d){i.disabled=!!d}};return i.addEventListener("change",()=>{if(typeof a=="function")try{a(i.value,c)}catch(d){typeof console<"u"&&console.error&&console.error("[selectInput] onChange \u5F02\u5E38",d)}c._emitter.emit("change",i.value)}),c}var ip=N(()=>{ft()});function Ye(t={}){let{id:e=null,label:r="",hint:s="",checked:n=!1,disabled:o=!1,onChange:a=null}=t,i=f("label",{className:"yyt-toggle-label"});r&&i.appendChild(f("span",{text:r})),s&&i.appendChild(f("span",{className:"yyt-toggle-hint",text:s}));let l=f("input",{attrs:{type:"checkbox",disabled:o?"disabled":null}});l.checked=!!n;let c=f("span",{className:"yyt-toggle-slider"}),d=f("label",{className:"yyt-toggle"});d.appendChild(l),d.appendChild(c);let u=f("div",{className:"yyt-toggle-row"});u.appendChild(i),u.appendChild(d),i.addEventListener("click",p=>{p.preventDefault(),!l.disabled&&(l.checked=!l.checked,l.dispatchEvent(new Event("change",{bubbles:!0})))});let y={...Pe({id:e,kind:"toggle",el:u,style:t.style,className:t.className,attrs:t.attrs}),el:u,get(){return!!l.checked},set(p,{silent:g=!1}={}){l.checked=!!p,g||y._emitter.emit("change",!!p)},setDisabled(p){l.disabled=!!p}};return l.addEventListener("change",()=>{let p=!!l.checked;if(typeof a=="function")try{a(p,y)}catch(g){console.error("[toggle] onChange \u5F02\u5E38",g)}y._emitter.emit("change",p)}),y}var lp=N(()=>{ft()});var cp=N(()=>{ft()});var dp=N(()=>{ft()});function $t(t={}){let{id:e=null,label:r="",hint:s="",control:n=null,inline:o=!1}=t,a=f("div",{className:"yyt-form-group",style:o?{flexDirection:"row",alignItems:"center",gap:"12px"}:null});r&&a.appendChild(f("label",{text:r,style:o?{flex:"0 0 auto",minWidth:"120px"}:null}));let i=f("div",{style:o?{flex:"1",minWidth:"0"}:null});n&&G(i,n),a.appendChild(i),s&&a.appendChild(f("div",{className:"yyt-form-hint",text:s}));let l=n?[n]:[];return{...Pe({id:e,kind:"formRow",el:a,style:t.style,className:t.className,attrs:t.attrs}),el:a,_children:l,get(){return n?.get?.()},set(c,d){n?.set?.(c,d)},setControl(c){i.innerHTML="",l.length=0,c&&(G(i,c),l.push(c))}}}var up=N(()=>{ft()});function Nl(t={}){let{id:e=null,icon:r=null,name:s="",desc:n="",active:o=!1,disabled:a=!1,actions:i=[],onClick:l=null}=t,c=["yyt-list-row"];o&&c.push("yyt-list-row-active"),a&&c.push("yyt-list-row-disabled");let d=f("div",{className:c.join(" "),style:a?{opacity:"0.5",pointerEvents:"none"}:null});r&&d.appendChild(f("div",{className:"yyt-list-row-icon",text:r}));let u=f("div",{className:"yyt-list-row-main"}),y=f("div",{className:"yyt-list-row-name",text:s});u.appendChild(y);let p=null;n&&(p=f("div",{className:"yyt-list-row-desc",text:n}),u.appendChild(p)),d.appendChild(u);let g=null;if(i&&i.length){g=f("div",{className:"yyt-list-row-actions"});for(let h of i)G(g,h);d.appendChild(g)}typeof l=="function"&&(d.style.cursor="pointer",d.addEventListener("click",h=>{h.target.closest(".yyt-list-row-actions")||(l(h,m),m._emitter.emit("click",h))}));let m={...Pe({id:e,kind:"listRow",el:d,style:t.style,className:t.className,attrs:t.attrs}),el:d,_children:i||[],setName(h){y.textContent=h==null?"":String(h)},setDesc(h){if(p)p.textContent=h==null?"":String(h);else{if(!h)return;p=f("div",{className:"yyt-list-row-desc",text:h}),u.appendChild(p)}},setActive(h){h?d.classList.add("yyt-list-row-active"):d.classList.remove("yyt-list-row-active")},setDisabled(h){h?(d.classList.add("yyt-list-row-disabled"),d.style.opacity="0.5",d.style.pointerEvents="none"):(d.classList.remove("yyt-list-row-disabled"),d.style.opacity="",d.style.pointerEvents="")}};return m}var pp=N(()=>{ft()});function er(t={}){let{id:e=null,heading:r="",icon:s=null,actions:n=[],content:o=[]}=t,a=f("div",{className:"yyt-flow-section"}),i=null,l=null,c=null;if(r||s||n&&n.length){if(i=f("div",{className:"yyt-flow-heading"}),s&&(l=f("span",{className:"yyt-flow-heading-icon"}),G(l,s),i.appendChild(l)),r&&i.appendChild(f("span",{text:r})),n&&n.length){c=f("div",{className:"yyt-flow-heading-action"});for(let p of n)G(c,p);i.appendChild(c)}a.appendChild(i)}let d=f("div",{className:"yyt-flow-content"}),u=[];for(let p of o||[])p&&(G(d,p),u.push(p));for(let p of n||[])p&&typeof p=="object"&&p.el&&u.push(p);return a.appendChild(d),{...Pe({id:e,kind:"flowSection",el:a,style:t.style,className:t.className,attrs:t.attrs}),el:a,_children:u,appendContent(p){p&&(G(d,p),p&&typeof p=="object"&&p.el&&u.push(p))},clearContent(){d.innerHTML="";let p=u.filter(g=>(n||[]).includes(g));u.length=0;for(let g of p)u.push(g)},setHeading(p){if(!i)return;let g=i.querySelector("span:not(.yyt-flow-heading-icon):not(.yyt-flow-heading-action)");g&&(g.textContent=p==null?"":String(p))},setIcon(p){l&&(l.textContent=p==null?"":String(p))}}}var yp=N(()=>{ft()});function Ea(){try{if(window.parent&&window.parent!==window&&window.parent.document)return window.parent.document}catch{}return document}function $l({title:t,width:e,wide:r}){let s=`yyt-ctrl-dialog-${++Ix}`,n=f("div",{className:"yyt-dialog-overlay",attrs:{"data-dialog-id":s}}),o={};e&&e!=="380px"&&(o.width=e),o.maxHeight="calc(100vh - 32px)";let a=f("div",{className:`yyt-dialog${r?" yyt-dialog-wide":""}`,style:o}),i=f("div",{className:"yyt-dialog-header"});i.appendChild(f("span",{className:"yyt-dialog-title",text:t||""}));let l=f("button",{className:"yyt-dialog-close",attrs:{type:"button","aria-label":"close"},html:'<i class="fa-solid fa-times"></i>'});i.appendChild(l),a.appendChild(i);let c=f("div",{className:"yyt-dialog-body"});a.appendChild(c);let d=f("div",{className:"yyt-dialog-footer"});return a.appendChild(d),n.appendChild(a),{overlay:n,body:c,footer:d,closeBtn:l,id:s}}function Ol(t){let e=Ea();return e?.body?(e.body.appendChild(t),!0):!1}function Dl(t){if(t?.parentNode)try{t.parentNode.removeChild(t)}catch{}}function kx(t={}){let{title:e="\u8BF7\u786E\u8BA4",message:r="",confirmText:s="\u786E\u5B9A",cancelText:n="\u53D6\u6D88",danger:o=!1,width:a="380px"}=t;return new Promise(i=>{let{overlay:l,body:c,footer:d,closeBtn:u}=$l({title:e,width:a,wide:!1}),y=(Ea()||document).activeElement,p=f("div",{style:{color:"var(--yyt-text-secondary)",fontSize:"13px",lineHeight:"1.6"},text:r});c.appendChild(p);let g=f("button",{className:"yyt-btn yyt-btn-secondary",attrs:{type:"button"},text:n}),m=f("button",{className:`yyt-btn ${o?"yyt-btn-danger":"yyt-btn-primary"}`,attrs:{type:"button"},text:s});d.appendChild(g),d.appendChild(m);let h=!1,x=v=>{if(!h){h=!0,Dl(l);try{y?.focus()}catch{}i(v)}};if(m.addEventListener("click",()=>x(!0)),g.addEventListener("click",()=>x(!1)),u.addEventListener("click",()=>x(!1)),l.addEventListener("click",v=>{v.target===l&&x(!1)}),l.addEventListener("keydown",v=>{v.key==="Escape"?(v.stopPropagation(),x(!1)):v.key==="Enter"&&(v.stopPropagation(),x(!0))}),!Ol(l)){i(!1);return}(o?g:m).focus()})}function Rx(t={}){let{title:e="\u8F93\u5165",message:r="",defaultValue:s="",placeholder:n="",confirmText:o="\u786E\u5B9A",cancelText:a="\u53D6\u6D88",validate:i=null,width:l="380px"}=t;return new Promise(c=>{let{overlay:d,body:u,footer:y,closeBtn:p}=$l({title:e,width:l,wide:!1}),g=(Ea()||document).activeElement;r&&u.appendChild(f("div",{style:{color:"var(--yyt-text-secondary)",fontSize:"13px",lineHeight:"1.6",marginBottom:"8px"},text:r}));let m=f("input",{className:"yyt-input",attrs:{type:"text",placeholder:n}});m.value=String(s||""),u.appendChild(m);let h=f("div",{style:{color:"var(--yyt-danger, #f87171)",fontSize:"12px",marginTop:"6px",minHeight:"14px"}});u.appendChild(h);let x=f("button",{className:"yyt-btn yyt-btn-secondary",attrs:{type:"button"},text:a}),v=f("button",{className:"yyt-btn yyt-btn-primary",attrs:{type:"button"},text:o});y.appendChild(x),y.appendChild(v);let T=!1,A=w=>{if(!T){T=!0,Dl(d);try{g?.focus()}catch{}c(w)}},E=()=>{let w=m.value.trim();if(typeof i=="function"){let P=i(w);if(P){h.textContent=P,m.focus();return}}A(w||null)};if(v.addEventListener("click",E),x.addEventListener("click",()=>A(null)),p.addEventListener("click",()=>A(null)),d.addEventListener("click",w=>{w.target===d&&A(null)}),m.addEventListener("keydown",w=>{w.key==="Enter"&&(w.stopPropagation(),E())}),d.addEventListener("keydown",w=>{w.key==="Escape"&&(w.stopPropagation(),A(null))}),!Ol(d)){c(null);return}m.focus(),m.select()})}function Mx(t={}){let{title:e="",body:r=null,buttons:s=[],width:n="480px",wide:o=!1,onMounted:a=null}=t,{overlay:i,body:l,footer:c,closeBtn:d}=$l({title:e,width:n,wide:o}),u=(Ea()||document).activeElement;r&&G(l,r);let y=!1,p,g=new Promise(h=>{p=h}),m=h=>{if(!y){y=!0,Dl(i);try{u?.focus()}catch{}p(h)}};for(let h of s){let x=h.variant==="primary"?"yyt-btn-primary":h.variant==="danger"?"yyt-btn-danger":"yyt-btn-secondary",v=f("button",{className:`yyt-btn ${x}`,attrs:{type:"button"},text:h.label||""});v.addEventListener("click",()=>{try{h.onClick?.(m,l)}catch(T){Cx.error("button onClick error",T),m(null)}}),c.appendChild(v)}if(d.addEventListener("click",()=>m(null)),i.addEventListener("click",h=>{h.target===i&&m(null)}),i.addEventListener("keydown",h=>{h.key==="Escape"&&(h.stopPropagation(),m(null))}),!Ol(i))p(null);else if(typeof a=="function")try{a({overlay:i,body:l,close:m})}catch{}return{el:i,body:l,close:m,result:g}}var Cx,Ix,Ne,Ca=N(()=>{ft();H();Cx=C.createScope("Dialog"),Ix=0;Ne={confirm:kx,prompt:Rx,custom:Mx}});function Ll(t={}){let{id:e=null,items:r=[],align:s="start",gap:n="8px",wrap:o=!0}=t,i=f("div",{className:"yyt-toolbar",style:{display:"flex",alignItems:"center",justifyContent:{start:"flex-start",end:"flex-end",center:"center","space-between":"space-between"}[s]||"flex-start",gap:n,flexWrap:o?"wrap":"nowrap"}}),l=[];for(let c of r)c&&(G(i,c),l.push(c));return{...Pe({id:e,kind:"toolbar",el:i,style:t.style,className:t.className,attrs:t.attrs}),el:i,_children:l,addItem(c){c&&(G(i,c),l.push(c))},clear(){for(;i.firstChild;)i.removeChild(i.firstChild);for(let c of l)try{c?.destroy?.()}catch{}l.length=0}}}var fp=N(()=>{ft()});function Bl(t={}){let{id:e=null,name:r="",desc:s="",active:n=!1,disabled:o=!1,builtin:a=!1,readonly:i=!1,metaChips:l=[],actions:c=[],onClick:d=null}=t,u=a||i,y=["yyt-list-row","yyt-preset-list-item"];n&&y.push("yyt-list-row-active"),o&&y.push("yyt-list-row-disabled"),u&&y.push("yyt-preset-list-item-readonly");let p=f("div",{className:y.join(" "),style:o?{opacity:"0.5",pointerEvents:"none"}:null}),g=f("span",{className:"yyt-preset-dot",style:{width:"8px",height:"8px",borderRadius:"50%",flexShrink:"0",marginRight:"8px",background:n?"var(--yyt-accent, #7bb7ff)":"transparent",border:n?"none":"1px solid var(--yyt-border, rgba(255,255,255,0.15))",transition:"background 0.15s ease"}});p.appendChild(g);let m=f("div",{className:"yyt-list-row-main",style:{flex:"1",minWidth:"0"}}),h=f("div",{style:{display:"flex",alignItems:"center",gap:"8px"}}),x=f("div",{className:"yyt-list-row-name",text:r,style:{fontWeight:"600"}});h.appendChild(x),a&&h.appendChild(f("span",{className:"yyt-preset-badge yyt-preset-badge-builtin",text:"\u5185\u7F6E",style:{fontSize:"10px",padding:"2px 6px",borderRadius:"999px",background:"var(--yyt-surface-3, rgba(255,255,255,0.06))",color:"var(--yyt-text-muted, rgba(255,255,255,0.5))",border:"1px solid var(--yyt-border, rgba(255,255,255,0.1))"}})),m.appendChild(h);let v=null;s&&(v=f("div",{className:"yyt-list-row-desc",text:s}),m.appendChild(v)),p.appendChild(m);let T=null;if(Array.isArray(l)&&l.length){T=f("div",{className:"yyt-preset-meta-chips",style:{display:"flex",gap:"6px",flexWrap:"wrap"}});for(let P of l)P&&T.appendChild(f("span",{className:"yyt-preset-meta-chip",text:String(P),style:{fontSize:"11px",padding:"2px 8px",borderRadius:"999px",background:"var(--yyt-surface-2, rgba(255,255,255,0.04))",color:"var(--yyt-text-secondary, rgba(255,255,255,0.6))",border:"1px solid var(--yyt-border-soft, rgba(255,255,255,0.04))"}}));p.appendChild(T)}let A=null,E=u?c.filter(P=>P?._kind!=="button"||!P._destructive):c;if(E&&E.length){A=f("div",{className:"yyt-list-row-actions"});for(let P of E)G(A,P);p.appendChild(A)}typeof d=="function"&&(p.style.cursor="pointer",p.addEventListener("click",P=>{P.target.closest(".yyt-list-row-actions")||(d(P,w),w._emitter.emit("click",P))}));let w={...Pe({id:e,kind:"presetListItem",el:p,style:t.style,className:t.className,attrs:t.attrs}),el:p,_children:c||[],setActive(P){P?p.classList.add("yyt-list-row-active"):p.classList.remove("yyt-list-row-active"),g.style.background=P?"var(--yyt-accent, #7bb7ff)":"transparent",g.style.border=P?"none":"1px solid var(--yyt-border, rgba(255,255,255,0.15))"},setName(P){x.textContent=P==null?"":String(P)},setDesc(P){if(v)v.textContent=P==null?"":String(P);else{if(!P)return;v=f("div",{className:"yyt-list-row-desc",text:P}),m.appendChild(v)}},setDisabled(P){P?(p.classList.add("yyt-list-row-disabled"),p.style.opacity="0.5",p.style.pointerEvents="none"):(p.classList.remove("yyt-list-row-disabled"),p.style.opacity="",p.style.pointerEvents="")}};return w}var gp=N(()=>{ft()});function zl(t={}){let{id:e=null,values:r=[],placeholder:s="\u8F93\u5165\u540E\u56DE\u8F66\u6DFB\u52A0",suggestions:n=null,allowDuplicates:o=!1,maxChips:a=0,chipVariant:i="default",onChange:l=null,onAdd:c=null,onRemove:d=null}=t,u=n&&n.length?`yyt-chip-dl-${++Px}`:null,y=f("div",{className:"yyt-chip-group",style:{display:"flex",flexWrap:"wrap",gap:"6px",padding:"6px 8px",borderRadius:"var(--yyt-radius-sm, 6px)",border:"1px solid var(--yyt-control-border, rgba(255,255,255,0.08))",background:"var(--yyt-control-bg, transparent)",minHeight:"36px",alignItems:"center"}}),p=[],g={type:"text",placeholder:s,autocomplete:"off"};u&&(g.list=u);let m=f("input",{className:"yyt-chip-input",attrs:g,style:{flex:"1 1 auto",minWidth:"120px",border:"none",outline:"none",background:"transparent",color:"var(--yyt-text, inherit)",fontSize:"12px",padding:"4px 0"}}),h=null;if(u){h=f("datalist",{attrs:{id:u}});for(let R of n)h.appendChild(f("option",{attrs:{value:String(R)}}));y.appendChild(h)}function x(){return i==="danger"?"rgba(248,113,113,0.12)":i==="soft"?"var(--yyt-surface-2, rgba(255,255,255,0.04))":"var(--yyt-accent-soft, rgba(123,183,255,0.15))"}function v(){return i==="danger"?"rgba(248,113,113,0.25)":"var(--yyt-border, rgba(255,255,255,0.1))"}function T(){return i==="danger"?"#f87171":"var(--yyt-text, inherit)"}function A(R){let _=f("span",{className:"yyt-chip",style:{display:"inline-flex",alignItems:"center",gap:"4px",padding:"3px 4px 3px 10px",borderRadius:"999px",background:x(),border:`1px solid ${v()}`,color:T(),fontSize:"11px",fontWeight:"500"}});_.appendChild(f("span",{text:R,style:{lineHeight:"1"}}));let k=f("button",{attrs:{type:"button","aria-label":"remove"},text:"\xD7",style:{border:"none",background:"transparent",color:"inherit",cursor:"pointer",padding:"0 4px",fontSize:"14px",lineHeight:"1",opacity:"0.7"}});return k.addEventListener("click",K=>{K.stopPropagation(),P(R)}),k.addEventListener("mouseenter",()=>{k.style.opacity="1"}),k.addEventListener("mouseleave",()=>{k.style.opacity="0.7"}),_.appendChild(k),_}function E(){let R=[];for(let _ of y.children)_===m||_===h||R.push(_);for(let _ of R)y.removeChild(_);for(let _ of p)y.insertBefore(A(_),m)}function w(R){let _=String(R||"").trim();if(!_||!o&&p.includes(_)||a>0&&p.length>=a)return!1;p.push(_),E();try{c?.(_,p.slice())}catch(k){console.error("[chipGroup] onAdd \u5F02\u5E38",k)}try{l?.(p.slice())}catch(k){console.error("[chipGroup] onChange \u5F02\u5E38",k)}return B._emitter.emit("change",p.slice()),!0}function P(R){let _=p.indexOf(R);if(_<0)return!1;p.splice(_,1),E();try{d?.(R,p.slice())}catch(k){console.error("[chipGroup] onRemove \u5F02\u5E38",k)}try{l?.(p.slice())}catch(k){console.error("[chipGroup] onChange \u5F02\u5E38",k)}return B._emitter.emit("change",p.slice()),!0}function $(){if(p.length!==0){p=[],E();try{l?.([])}catch(R){console.error("[chipGroup] onChange \u5F02\u5E38",R)}B._emitter.emit("change",[])}}for(let R of r){let _=String(R||"").trim();_&&(!o&&p.includes(_)||p.push(_))}y.appendChild(m),E(),m.addEventListener("keydown",R=>{if(R.key==="Enter"||R.key===","){R.preventDefault();let _=m.value.trim();_&&w(_)&&(m.value="")}else R.key==="Backspace"&&!m.value&&p.length&&P(p[p.length-1])}),m.addEventListener("blur",()=>{let R=m.value.trim();R&&w(R)&&(m.value="")}),y.addEventListener("click",R=>{R.target===y&&m.focus()});let B={...Pe({id:e,kind:"chipGroup",el:y,style:t.style,className:t.className,attrs:t.attrs}),el:y,get(){return p.slice()},set(R){p=[];for(let _ of Array.isArray(R)?R:[]){let k=String(_||"").trim();k&&(!o&&p.includes(k)||p.push(k))}E();try{l?.(p.slice())}catch(_){console.error("[chipGroup] onChange \u5F02\u5E38",_)}B._emitter.emit("change",p.slice())},addChip:w,removeChip:P,clear:$,setSuggestions(R){if(h){for(;h.firstChild;)h.removeChild(h.firstChild);for(let _ of R||[])h.appendChild(f("option",{attrs:{value:String(_)}}))}}};return B}var Px,mp=N(()=>{ft();Px=0});var hp=N(()=>{ft()});var tr=N(()=>{op();ap();ip();lp();cp();dp();up();pp();yp();Ca();fp();gp();mp();hp();ft()});function bp(t){return t?t.length!==void 0&&typeof t.get=="function"?t.get(0):t:null}function Nx(t){return typeof t=="string"&&t.startsWith("builtin_")}function Kr(t={}){let{id:e,kind:r="generic",panelTitle:s="\u9884\u8BBE\u7BA1\u7406",panelHint:n="",store:o,renderEditor:a,renderExtras:i=null,renderListItemMeta:l=null,hasSwitchToButton:c=!1,onSwitchTo:d=null}=t;if(!o||typeof o.listPresets!="function")throw new Error("createPresetManagerPanel: store \u7F3A\u5C11\u5FC5\u8981\u7684 listPresets \u65B9\u6CD5");if(typeof a!="function")throw new Error("createPresetManagerPanel: \u5FC5\u987B\u63D0\u4F9B renderEditor");return{id:e,kind:r,renderTo(u){let y=bp(u);if(!y)return;if(y._yytPresetPanelCleanup)try{y._yytPresetPanelCleanup()}catch{}let p=()=>this.renderTo(u),g=o.listPresets(),m=typeof o.getCurrentPresetId=="function"?o.getCurrentPresetId():"",h=f("div",{className:"yyt-preset-manager-panel",style:{display:"flex",flexDirection:"column",gap:"14px"}});if(s||n){let R=f("div",{style:{display:"flex",flexDirection:"column",gap:"4px"}});s&&R.appendChild(f("div",{text:s,style:{fontSize:"15px",fontWeight:"700",color:"var(--yyt-text)"}})),n&&R.appendChild(f("div",{text:n,style:{fontSize:"12px",color:"var(--yyt-text-secondary)",lineHeight:"1.6"}})),h.appendChild(R)}let x=[],v=f("div",{style:{display:"flex",flexDirection:"column"}});if(g.length===0)v.appendChild(f("div",{text:'\u6682\u65E0\u9884\u8BBE\u3002\u70B9\u51FB\u4E0B\u65B9"\u65B0\u5EFA"\u521B\u5EFA\u7B2C\u4E00\u4E2A\u9884\u8BBE\u3002',style:{fontSize:"12px",color:"var(--yyt-text-muted)",padding:"12px 0",textAlign:"center"}}));else for(let R of g){let _=R.id===m,k=Nx(R.id),K=typeof l=="function"?l(R)||[]:[],Y=[];c&&typeof d=="function"&&Y.push(q({label:_?"\u2713 \u5DF2\u52A0\u8F7D":"\u52A0\u8F7D",size:"small",variant:_?"ghost":"primary",disabled:_,onClick:pe=>{pe.stopPropagation();try{d(R.id)}catch(te){_s.warn("onSwitchTo \u5F02\u5E38",{err:te})}p()}})),Y.push(q({label:"\u590D\u5236",size:"small",variant:"ghost",title:"\u590D\u5236\u4E3A\u7528\u6237\u9884\u8BBE",onClick:async pe=>{pe.stopPropagation();try{let te=o.duplicatePreset(R.id);te?.id&&typeof o.setCurrentPresetId=="function"&&o.setCurrentPresetId(te.id),p()}catch(te){_s.warn("duplicate \u5F02\u5E38",{err:te})}}})),k||(Y.push(q({label:"\u270E",size:"small",variant:"ghost",title:"\u91CD\u547D\u540D",onClick:async pe=>{pe.stopPropagation();let te=await Ne.prompt({title:"\u91CD\u547D\u540D\u9884\u8BBE",defaultValue:R.name,placeholder:"\u9884\u8BBE\u540D",validate:Te=>Te?null:"\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"});te&&te!==R.name&&(o.renamePreset(R.id,te),p())}})),Y.push(q({label:"\xD7",size:"small",variant:"ghost",title:"\u5220\u9664",onClick:async pe=>{pe.stopPropagation(),await Ne.confirm({title:"\u5220\u9664\u9884\u8BBE",message:`\u786E\u8BA4\u5220\u9664\u300C${R.name}\u300D\uFF1F\u6B64\u64CD\u4F5C\u4E0D\u53EF\u64A4\u9500\u3002`,confirmText:"\u5220\u9664",danger:!0})&&(o.deletePreset(R.id),p())}})));let ue=Bl({id:R.id,name:R.name,desc:R.description,active:_,builtin:k,metaChips:K,actions:Y,onClick:()=>{typeof o.setCurrentPresetId=="function"&&o.setCurrentPresetId(R.id),p()}});v.appendChild(ue.el)}let T=q({label:"+ \u65B0\u5EFA\u9884\u8BBE",size:"small",variant:"primary",onClick:async()=>{let R=await Ne.prompt({title:"\u65B0\u5EFA\u9884\u8BBE",placeholder:"\u9884\u8BBE\u540D\uFF08\u5FC5\u586B\uFF09",validate:_=>_?null:"\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"});if(R)try{let _=o.createPreset({name:R});_?.id&&typeof o.setCurrentPresetId=="function"&&o.setCurrentPresetId(_.id),p()}catch(_){_s.warn("createPreset \u5931\u8D25",{err:_}),await Ne.confirm({title:"\u521B\u5EFA\u5931\u8D25",message:String(_?.message||_),confirmText:"\u786E\u5B9A"})}}}),A=er({heading:"\u9884\u8BBE\u9009\u62E9",icon:"\u{1F4CB}",actions:[T.el],content:[v]});x.push(A),h.appendChild(A.el);let E=m?g.find(R=>R.id===m):null;if(E){let R=null;try{R=a(E,{readonly:!1,onChange:k=>{if(!(!k||typeof k!="object"))try{o.updatePreset(E.id,k)}catch(K){_s.warn("updatePreset \u5931\u8D25",{err:K})}},refresh:p})}catch(k){_s.error("renderEditor \u5F02\u5E38",{err:k}),R=f("div",{text:`\u7F16\u8F91\u5668\u6E32\u67D3\u5F02\u5E38\uFF1A${k?.message||k}`,style:{color:"var(--yyt-danger, #f87171)",fontSize:"12px"}})}let _=er({heading:`\u7F16\u8F91\u300C${E.name}\u300D`,icon:"\u270E",content:[R].filter(Boolean)});if(x.push(_),h.appendChild(_.el),typeof i=="function"){let k=null;try{k=i(E,{refresh:p})}catch(K){_s.warn("renderExtras \u5F02\u5E38",{err:K})}if(k){let K=er({heading:"\u9644\u52A0",icon:"\u{1F527}",content:[k]});x.push(K),h.appendChild(K.el)}}}else g.length>0&&h.appendChild(f("div",{text:"\u8BF7\u5728\u4E0A\u65B9\u5217\u8868\u9009\u62E9\u4E00\u4E2A\u9884\u8BBE\u4EE5\u7F16\u8F91",style:{fontSize:"12px",color:"var(--yyt-text-muted)",padding:"16px",textAlign:"center",border:"1px dashed var(--yyt-border, rgba(255,255,255,0.08))",borderRadius:"var(--yyt-radius-sm, 6px)"}}));let w=q({label:"\u2B06 \u5BFC\u5165",size:"small",variant:"ghost",onClick:async()=>{await $x(o,p)}}),P=q({label:"\u2B07 \u5BFC\u51FA",size:"small",variant:"ghost",onClick:()=>{Ox(o,r)}}),$=q({label:"\u6E05\u7A7A\u5168\u90E8",size:"small",variant:"ghost",onClick:async()=>{await Ne.confirm({title:"\u6E05\u7A7A\u6240\u6709\u9884\u8BBE",message:"\u6B64\u64CD\u4F5C\u4F1A\u5220\u9664\u6240\u6709\u7528\u6237\u9884\u8BBE\uFF08\u5185\u7F6E\u9884\u8BBE\u4E0D\u53D7\u5F71\u54CD\uFF09\uFF0C\u4E0D\u53EF\u64A4\u9500\u3002",confirmText:"\u6E05\u7A7A",danger:!0})&&typeof o.resetAll=="function"&&(o.resetAll(),p())}}),B=Ll({items:[w,P,$],align:"end",gap:"8px"});h.appendChild(B.el),y.innerHTML="",y.appendChild(h),y._yytPresetPanelCleanup=()=>{for(let R of x)try{R.destroy()}catch{}delete y._yytPresetPanelCleanup}},destroy(u){let y=bp(u);if(y?._yytPresetPanelCleanup)try{y._yytPresetPanelCleanup()}catch{}},getStyles(){return""}}}async function $x(t,e){if(typeof t.importPresets!="function"){await Ne.confirm({title:"\u4E0D\u652F\u6301\u5BFC\u5165",message:"\u5F53\u524D\u9884\u8BBE\u7C7B\u578B\u4E0D\u652F\u6301\u5BFC\u5165\u3002",confirmText:"\u786E\u5B9A"});return}let r=f("textarea",{className:"yyt-textarea",attrs:{placeholder:"\u7C98\u8D34\u5BFC\u51FA\u7684 JSON"},style:{width:"100%",minHeight:"180px",fontSize:"12px",fontFamily:"monospace"}}),s=Ne.custom({title:"\u5BFC\u5165\u9884\u8BBE",width:"520px",body:r,buttons:[{label:"\u53D6\u6D88",variant:"ghost",onClick:o=>o(null)},{label:"\u4ECE\u6587\u4EF6\u2026",variant:"ghost",onClick:()=>{let o=f("input",{attrs:{type:"file",accept:"application/json,.json"}});o.addEventListener("change",()=>{let a=o.files?.[0];if(!a)return;let i=new FileReader;i.onload=()=>{r.value=String(i.result||""),r.focus()},i.readAsText(a)}),o.click()}},{label:"\u5BFC\u5165",variant:"primary",onClick:async o=>{let a=r.value.trim();if(!a){o(null);return}let i;try{i=JSON.parse(a)}catch(l){await Ne.confirm({title:"JSON \u89E3\u6790\u5931\u8D25",message:String(l?.message||l),confirmText:"\u786E\u5B9A"});return}try{let l=t.importPresets(i);o(l)}catch(l){await Ne.confirm({title:"\u5BFC\u5165\u5931\u8D25",message:String(l?.message||l),confirmText:"\u786E\u5B9A"})}}}]});setTimeout(()=>r.focus(),0);let n=await s.result;n&&(n.added>0||n.imported>0)&&e()}function Ox(t,e){if(typeof t.exportAll!="function"){Ne.confirm({title:"\u4E0D\u652F\u6301\u5BFC\u51FA",message:"\u5F53\u524D\u9884\u8BBE\u7C7B\u578B\u4E0D\u652F\u6301\u5BFC\u51FA\u3002",confirmText:"\u786E\u5B9A"});return}let r=t.exportAll(),s=JSON.stringify(r,null,2),n=f("textarea",{className:"yyt-textarea",style:{width:"100%",minHeight:"220px",fontSize:"12px",fontFamily:"monospace"}});n.value=s,n.readOnly=!0,Ne.custom({title:`\u5BFC\u51FA ${e||""} \u9884\u8BBE`,width:"600px",body:n,buttons:[{label:"\u5173\u95ED",variant:"ghost",onClick:o=>o(null)},{label:"\u590D\u5236\u5230\u526A\u8D34\u677F",variant:"ghost",onClick:async()=>{try{await navigator.clipboard.writeText(s)}catch{n.select();try{document.execCommand("copy")}catch{}}}},{label:"\u4E0B\u8F7D JSON",variant:"primary",onClick:()=>{try{let o=new Blob([s],{type:"application/json"}),a=URL.createObjectURL(o),i=f("a",{attrs:{href:a,download:`${e||"preset"}_${Date.now()}.json`}});document.body.appendChild(i),i.click(),setTimeout(()=>{try{document.body.removeChild(i)}catch{}try{URL.revokeObjectURL(a)}catch{}},100)}catch(o){_s.warn("\u4E0B\u8F7D\u5931\u8D25",{err:o})}}}]})}var _s,ho=N(()=>{tr();H();_s=C.createScope("PresetManagerBase")});var wp={};le(wp,{ApiPresetPanel:()=>xp,default:()=>zx});function Lx(t,{onChange:e,readonly:r}){let s=f("div",{style:{display:"flex",flexDirection:"column",gap:"12px"}}),n=t.apiConfig||{};G(s,$t({label:"\u63CF\u8FF0",control:ge({value:t.description||"",placeholder:"\u53EF\u9009 \u2014 \u5907\u6CE8\u7528\u9014",disabled:r,onChange:i=>e({description:i})})})),G(s,Ye({label:"\u4F7F\u7528\u4E3B API",hint:"\u5F00\u542F\u540E\u5FFD\u7565\u4E0B\u65B9 URL/Key/Model\uFF0C\u76F4\u63A5\u590D\u7528 SillyTavern \u4E3B\u8FDE\u63A5",checked:n.useMainApi!==!1,disabled:r,onChange:i=>e({apiConfig:{...n,useMainApi:i}})})),G(s,Ye({label:"\u6D41\u5F0F\u8F93\u51FA\uFF08stream\uFF09",hint:"\u9010\u5B57\u63A5\u6536\u54CD\u5E94",checked:n.stream===!0,disabled:r,onChange:i=>e({apiConfig:{...n,stream:i}})})),G(s,$t({label:"API URL",control:ge({value:n.url||"",placeholder:"https://api.example.com/v1",disabled:r,onChange:i=>e({apiConfig:{...n,url:i}})})})),G(s,$t({label:"API Key",control:ge({value:n.apiKey||"",placeholder:"sk-...",disabled:r,attrs:{type:"password"},onChange:i=>e({apiConfig:{...n,apiKey:i}})})})),G(s,$t({label:"\u6A21\u578B",control:ge({value:n.model||"",placeholder:"gpt-4 / gemini-pro / claude-...",disabled:r,onChange:i=>e({apiConfig:{...n,model:i}})})}));let o=f("div",{style:{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:"10px"}});function a(i,l,c,d="1"){let u=f("div",{style:{display:"flex",flexDirection:"column",gap:"4px"}});u.appendChild(f("label",{text:i,style:{fontSize:"11px",color:"var(--yyt-text-secondary)",fontWeight:"600"}}));let y=f("input",{className:"yyt-input",attrs:{type:"number",step:d,disabled:r?"disabled":null},style:{padding:"6px 10px",fontSize:"12px"}});return y.value=String(n[l]??c),y.addEventListener("change",()=>{let p=Number(y.value);Number.isFinite(p)&&e({apiConfig:{...n,[l]:p}})}),u.appendChild(y),u}return o.appendChild(a("max_tokens","max_tokens",4096,"1")),o.appendChild(a("temperature","temperature",.7,"0.05")),o.appendChild(a("top_p","top_p",.9,"0.05")),G(s,o),s}function Bx(t){let e=t.apiConfig||{},r=[];return e.useMainApi!==!1?r.push("\u4E3B API"):r.push(e.model||"\u81EA\u5B9A\u4E49"),t.starred&&r.push("\u2605"),r}var Ur,Dx,xp,zx,vp=N(()=>{tr();an();H();ho();Ur=C.createScope("ApiPresetPanel"),Dx={listPresets(){return zr().map(t=>({id:t.name,name:t.name,description:t.description||"",apiConfig:t.apiConfig||{},starred:t.starred===!0,createdAt:t.createdAt,updatedAt:t.updatedAt}))},getPreset(t){if(!t)return null;let e=Ss(t);return e?{id:e.name,...e,description:e.description||""}:null},getCurrentPresetId(){return Il()||""},setCurrentPresetId(t){if(!t)return!1;try{return!!Aa(t)}catch(e){return Ur.warn("switchToPreset \u5931\u8D25",{err:e}),!1}},createPreset(t){let e=String(t?.name||"").trim();if(!e)return Ur.warn("createPreset: name \u7F3A\u5931"),null;let r=Sa({name:e,description:t?.description||"",apiConfig:t?.apiConfig||{}});return r?.success?{id:r.preset.name,...r.preset,description:r.preset.description||""}:(Ur.warn("createPreset \u5931\u8D25",{msg:r?.message}),null)},updatePreset(t,e){if(!t)return null;let r=Al(t,e);return r?.success?{id:r.preset.name,...r.preset,description:r.preset.description||""}:(Ur.warn("updatePreset \u5931\u8D25",{id:t,msg:r?.message}),null)},deletePreset(t){if(!t)return!1;try{let e=_a(t);return!!(e?.success??e===!0)}catch(e){return Ur.warn("deletePreset \u5931\u8D25",{err:e}),!1}},duplicatePreset(t,e={}){if(!t)return null;let r=e.nameSuffix||"_\u526F\u672C",s=`${t}${r}`;try{let n=Cl(t,s);return n?.success?{id:n.preset.name,...n.preset,description:n.preset.description||""}:null}catch(n){return Ur.warn("duplicatePreset \u5931\u8D25",{err:n}),null}},renamePreset(t,e){if(!t||!e)return null;try{let r=El(t,e);return r?.success?{id:r.preset?.name||e,...r.preset,description:r.preset?.description||""}:null}catch(r){return Ur.warn("renamePreset \u5931\u8D25",{err:r}),null}},exportAll(){let t=kl();try{return{version:1,exportedAt:Date.now(),presets:JSON.parse(t)}}catch{return{version:1,exportedAt:Date.now(),presets:[]}}},importPresets(t){if(!t||typeof t!="object")return{added:0};let e=Array.isArray(t.presets)?t.presets:[t],r=JSON.stringify(e);return{added:Rl(r,{overwrite:!1})?.imported||0}},resetAll(){let t=zr();for(let e of t)try{_a(e.name)}catch{}}};xp=Kr({id:"apiPresetPanel",kind:"api",panelTitle:"API \u9884\u8BBE",panelHint:'\u7BA1\u7406\u591A\u7EC4 API \u8FDE\u63A5\u914D\u7F6E\u3002\u70B9\u51FB"\u52A0\u8F7D"\u6FC0\u6D3B\u67D0\u4E2A\u9884\u8BBE\u4F5C\u4E3A\u5F53\u524D API\uFF1B\u5176\u4ED6\u5DE5\u5177\u53EF\u5728\u914D\u7F6E\u9762\u677F\u4E2D\u6309\u9884\u8BBE\u540D\u5F15\u7528\u3002',store:Dx,renderEditor:Lx,renderListItemMeta:Bx,hasSwitchToButton:!0,onSwitchTo:t=>{try{Aa(t)}catch(e){Ur.warn("switchToPreset",{err:e})}}}),zx=xp});function Ul(){return`wb_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`}function Fr(){let t=Re.get(Kl);return!t||typeof t!="object"?{}:t}function ka(t){Re.set(Kl,t)}function Es(t){return typeof t=="string"&&t.startsWith(Kx)}function Tp(t){return Es(t)&&Ia.find(e=>e.id===t)||null}function jl(t){if(!Array.isArray(t)){Ia=[];return}Ia=t.map(e=>jr({...e,id:String(e?.id||"")})).filter(e=>Es(e.id))}function jr(t={}){let e=String(t.id||Ul()),r=Array.isArray(t.bookList)?t.bookList.map(s=>({bookName:String(s?.bookName||""),enabled:s?.enabled!==!1,entryOverrides:s?.entryOverrides&&typeof s.entryOverrides=="object"?s.entryOverrides:{}})).filter(s=>s.bookName):[];return{id:e,name:String(t.name||"").trim()||"\u672A\u547D\u540D\u9884\u8BBE",description:String(t.description||""),bindingMode:t.bindingMode===cr.CUSTOM?cr.CUSTOM:cr.CHARACTER_CARD,includeDisabled:t.includeDisabled===!0,bookList:r,createdAt:Number.isFinite(t.createdAt)?t.createdAt:Date.now(),updatedAt:Number.isFinite(t.updatedAt)?t.updatedAt:Date.now()}}function Ux(){let t=Fr(),e=new Set,r=[];for(let n of Ia){let o=t[n.id];o?(r.push(jr(o)),e.add(n.id)):r.push(n)}let s=Object.values(t).map(jr).filter(n=>!e.has(n.id)).sort((n,o)=>o.updatedAt-n.updatedAt);return r.push(...s),r}function xo(t){if(!t)return null;let e=Fr();return e[t]?jr(e[t]):Es(t)?Tp(t):null}function Fl(){let t=Re.get(bo);return typeof t=="string"&&t?t:""}function jx(){let t=Fl();return t?xo(t):null}function Fx(t){if(t&&Es(t))return Re.set(bo,t),W.emit(j.PRESET_ACTIVATED,{kind:"worldbook",id:t}),!0;let e=Fr();return t&&!e[t]?(As.warn(`setCurrentPresetId \u627E\u4E0D\u5230\u9884\u8BBE: ${t}`),!1):(Re.set(bo,t||""),W.emit(j.PRESET_ACTIVATED,{kind:"worldbook",id:t}),!0)}function Ra(t={}){let e=jr({...t,id:Ul(),createdAt:Date.now(),updatedAt:Date.now()}),r=Fr();return r[e.id]=e,ka(r),W.emit(j.PRESET_CREATED,{kind:"worldbook",id:e.id}),As.info(`\u521B\u5EFA\u9884\u8BBE: ${e.id} (${e.name})`),e}function Sp(t,e={},{silent:r=!1}={}){if(!t)return null;let s=Fr(),n=s[t];if(!n&&Es(t)&&(n=Tp(t)),!n)return As.warn(`updatePreset \u627E\u4E0D\u5230\u9884\u8BBE: ${t}`),null;let o=jr({...n,...e,id:t,createdAt:n.createdAt,updatedAt:Date.now()});return s[t]=o,ka(s),r||W.emit(j.PRESET_UPDATED,{kind:"worldbook",id:t}),o}function Wx(t){if(!t)return!1;if(Es(t))return As.warn(`\u62D2\u7EDD\u5220\u9664\u5185\u7F6E\u9884\u8BBE: ${t}`),!1;let e=Fr();return e[t]?(delete e[t],ka(e),Fl()===t&&Re.set(bo,""),W.emit(j.PRESET_DELETED,{kind:"worldbook",id:t}),As.info(`\u5220\u9664\u9884\u8BBE: ${t}`),!0):!1}function Hx(t,{nameSuffix:e=" \u526F\u672C"}={}){let r=xo(t);return r?Ra({...r,id:void 0,name:`${r.name}${e}`}):null}function Gx(t,e){return Es(t)?(As.warn(`\u62D2\u7EDD\u91CD\u547D\u540D\u5185\u7F6E\u9884\u8BBE: ${t}`),null):Sp(t,{name:String(e||"").trim()||"\u672A\u547D\u540D\u9884\u8BBE"})}function qx(){return{version:1,exportedAt:Date.now(),presets:Object.values(Fr()).map(jr)}}function Yx(t){if(!t||typeof t!="object")return{added:0,skipped:0};let e=Array.isArray(t.presets)?t.presets:[],r=Fr(),s=0,n=0;for(let o of e){let a=jr({...o,id:Ul(),createdAt:Date.now(),updatedAt:Date.now()});r[a.id]=a,s+=1}return ka(r),s>0&&W.emit(j.PRESET_IMPORTED,{kind:"worldbook",count:s}),{added:s,skipped:n}}function Vx(){Re.set(Kl,{}),Re.set(bo,""),As.info("\u5DF2\u6E05\u7A7A\u6240\u6709\u4E16\u754C\u4E66\u9884\u8BBE")}var As,Kl,bo,cr,Kx,Ia,gt,cn=N(()=>{He();ot();H();As=C.createScope("WorldbookPresetStore"),Kl="worldbook_presets",bo="worldbook_current_preset",cr=Object.freeze({CHARACTER_CARD:"character_card",CUSTOM:"custom"});Kx="builtin_worldbook_",Ia=[];gt={listPresets:Ux,getPreset:xo,getCurrentPresetId:Fl,getCurrentPreset:jx,setCurrentPresetId:Fx,createPreset:Ra,updatePreset:Sp,deletePreset:Wx,duplicatePreset:Hx,renamePreset:Gx,exportAll:qx,importPresets:Yx,resetAll:Vx,BINDING_MODES:cr}});function Wr(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window}function Ma(){return Wr()?.SillyTavern||null}function Ae(t){return t==null?"":String(t).trim()}function Xx(t){if(!t)return"";let e=[t.content,t.mes,t.message,t.text,t?.data?.content];for(let r of e)if(typeof r=="string"&&r.trim())return r.trim();return""}function Qx(t){let e=String(t?.role||"").trim().toLowerCase();return e==="assistant"||e==="ai"?"assistant":e==="system"?"system":e==="user"||t?.is_user===!0?"user":t?.is_system===!0?"system":"assistant"}function Ap(t=""){let e=String(t||"").trim();if(!e)return"empty";let r=0;for(let s=0;s<e.length;s+=1)r=(r<<5)-r+e.charCodeAt(s),r|=0;return`fp_${Math.abs(r).toString(36)}`}function Ep(t={}){let e=Ae(t.chatId)||"chat_default",r=Ae(t.messageId)||"latest";return`${e}::${r}`}function Cp(t={}){let e=Ep(t),r=Ae(t.effectiveSwipeId)||"swipe:current",s=Ae(t.assistantContentFingerprint)||"empty";return`${e}::${r}::${s}`}function Zx(t={}){let e=Cp(t),r=Ae(t.eventType)||"MANUAL",s=Ae(t.traceId)||Ip("manual");return`${e}::${r}::${s}`}function Ip(t="trace"){return`${t}_${Date.now()}_${Math.random().toString(36).slice(2,8)}`}function kp(){let t=Ma();try{let e=t?.getContext?.()||null;if(Array.isArray(e?.chat))return e.chat}catch{}return Array.isArray(t?.chat)?t.chat:[]}function Rp(t=[]){let e=[],r=null,s=null;return t.forEach((n,o)=>{let a=Qx(n),i=Xx(n);if(!i)return;let l=Ae(n?.messageId??n?.message_id??n?.id??n?.mid??n?.mesid??n?.chat_index??o),c=Ae(n?.swipe_id??n?.swipeId??n?.swipe??""),d={role:a,content:i,sourceId:l,swipeId:c,raw:n,index:o};e.push(d),a==="user"&&(r=d),a==="assistant"&&(s=d)}),{messages:e,lastUserMessage:r,lastAiMessage:s}}function ew(t,e,r){return Ae(e?.chatId??e?.chat_id??t?.chatId??t?.chat_id??t?.this_chid??r?.id??"chat_default")||"chat_default"}async function Wl(){let t=Ma();if(!t)return null;try{let e=t.this_chid,r=t.characters||[];if(e>=0&&e<r.length){let s=r[e];return{id:e,name:s?.name||"",description:s?.description||"",personality:s?.personality||"",scenario:s?.scenario||"",firstMes:s?.first_mes||"",mesExample:s?.mes_example||""}}}catch(e){Jx.error("\u83B7\u53D6\u89D2\u8272\u4FE1\u606F\u5931\u8D25:",e)}return null}function tw(t="",e=null){let r=String(t||""),s=e?.YouYouToolkit_toolOutputs;return s&&typeof s=="object"&&Object.values(s).forEach(n=>{let o=String(n?.blockText||n?.content||"").trim();o&&r.includes(o)&&(r=r.replace(o,"").trimEnd())}),r.trim()}function rw(t,e={}){let r=Array.isArray(t?.messages)?t.messages:[],s=Ae(e.messageId),n=Ae(e.swipeId);if(!s)return t?.lastAiMessage||null;let o=r.filter(i=>i.role==="assistant"),a=o.find(i=>i.sourceId!==s?!1:n?Ae(i.swipeId)===n:!0);return a||o.find(i=>i.sourceId===s)||null}function Mp({api:t,stContext:e,character:r,conversation:s,targetAssistantMessage:n,runSource:o="MANUAL"}={}){let a=s?.messages||[],i=s?.lastUserMessage||null,l=Ae(n?.sourceId)||"",c=Ae(n?.swipeId)||"swipe:current",d=n?.content||"",u=tw(d,n?.raw||null),y=Ap(d),p=Ap(u),g=ew(t,e,r),m=Ip(String(o||"manual").toLowerCase()),h=Ep({chatId:g,messageId:l}),x=Cp({chatId:g,messageId:l,effectiveSwipeId:c,assistantContentFingerprint:p});return{startedAt:Date.now(),runSource:o,traceId:m,chatId:g,messageId:l,confirmedAssistantMessageId:l,slotBindingKey:h,slotRevisionKey:x,slotTransactionId:Zx({chatId:g,messageId:l,effectiveSwipeId:c,assistantContentFingerprint:p,eventType:o,traceId:m}),executionKey:x,lastAiMessage:d,assistantContentFingerprint:y,assistantBaseText:u,assistantBaseFingerprint:p,lastAiMessageSwipeId:c,confirmedAssistantSwipeId:c,effectiveSwipeId:c,sourceMessageId:l,sourceSwipeId:c,lastUserMessage:i?.content||"",userMessage:i?.content||"",targetAssistantMessage:n,chatMessages:a,characterCard:r,chatHistory:a,input:{userMessage:i?.content||"",lastAiMessage:d,assistantBaseText:u,extractedContent:"",previousToolOutput:"",context:{character:r?.name||"",chatLength:a.length||0}},config:{},status:"pending"}}async function Cs({runSource:t="MANUAL"}={}){let e=Ma(),r=e?.getContext?.()||null,s=await Wl(),n=kp(),o=Rp(n),a=o?.lastAiMessage||null;return Mp({api:e,stContext:r,character:s,conversation:o,targetAssistantMessage:a,runSource:t})}async function Is({messageId:t,swipeId:e="",runSource:r="AUTO"}={}){let s=Ma(),n=s?.getContext?.()||null,o=await Wl(),a=kp(),i=Rp(a),l=rw(i,{messageId:t,swipeId:e});return Mp({api:s,stContext:n,character:o,conversation:i,targetAssistantMessage:l,runSource:r})}var Jx,ks=N(()=>{H();Jx=C.createScope("ExecutionContext")});function wo(){try{if(typeof TavernHelper<"u"&&TavernHelper)return TavernHelper}catch{}return Wr()?.TavernHelper||null}function Pp(){try{if(typeof SillyTavern<"u"&&SillyTavern)return SillyTavern}catch{}return Wr()?.SillyTavern||null}function dn(t){return Array.isArray(t)?Array.from(new Set(t.map(e=>String(e||"").trim()).filter(Boolean))):[]}function Hl(t){if(Array.isArray(t))return t.map(e=>typeof e=="string"?e:e&&typeof e=="object"?e.name||e.id||e.title||JSON.stringify(e):String(e??""));if(t&&typeof t=="object"){let e={};return Object.keys(t).forEach(r=>{let s=t[r];Array.isArray(s)?e[r]=s.map(n=>typeof n=="string"?n:n&&typeof n=="object"?n.name||n.id||n.title||"[object]":String(n??"")):s&&typeof s=="object"?e[r]="[object]":e[r]=s}),e}return t}function nw(t={}){let e=typeof t.content=="string"?t.content.trim():"";if(!e)return"";let r=[t.comment,t.key,t.keysecondary,t.text].map(s=>String(s||"").trim()).find(Boolean);return r&&r!==e?`## ${r}
${e}`:e}function Np(){return Array.isArray(Gl)?[...Gl]:[]}async function Pa(t){if(t||(t=wo()),!t||typeof t.getCharLorebooks!="function")return[];try{let e=await Promise.resolve(t.getCharLorebooks({type:"all"}));return dn([e?.primary,e?.secondary,...Array.isArray(e?.additional)?e.additional:[]])}catch(e){return Rs.warn("\u83B7\u53D6\u89D2\u8272\u7ED1\u5B9A\u4E16\u754C\u4E66\u5931\u8D25:",e),[]}}async function ow(t,e){if(t&&typeof t.getLorebooks=="function")try{let r=dn(await Promise.resolve(t.getLorebooks()));if(r.length>0)return r}catch(r){Rs.warn("\u83B7\u53D6\u5168\u90E8\u4E16\u754C\u4E66\u5217\u8868\u5931\u8D25:",r)}if(e&&typeof e.getWorldBooks=="function")try{let r=await Promise.resolve(e.getWorldBooks()),s=dn(Array.isArray(r)?r.map(n=>n?.name??n):[]);if(s.length>0)return s}catch(r){Rs.warn("\u4ECE SillyTavern \u83B7\u53D6\u4E16\u754C\u4E66\u5217\u8868\u5931\u8D25:",r)}return[]}async function ql(){let t=wo(),e=Pp(),r={checkedAt:Date.now(),hasGlobalTavernHelper:(()=>{try{return typeof TavernHelper<"u"&&!!TavernHelper}catch{return!1}})(),hasParentTavernHelper:!!Wr()?.TavernHelper,hasGlobalSillyTavern:(()=>{try{return typeof SillyTavern<"u"&&!!SillyTavern}catch{return!1}})(),hasParentSillyTavern:!!Wr()?.SillyTavern,helperKeys:t?Object.keys(t).sort():[],stKeys:e?Object.keys(e).sort():[],getLorebooksType:typeof t?.getLorebooks,getCharLorebooksType:typeof t?.getCharLorebooks,getLorebookEntriesType:typeof t?.getLorebookEntries,getWorldBooksType:typeof e?.getWorldBooks,characterWorldbooks:[],allWorldbooks:[],combinedWorldbooks:[],rawResults:{},errors:[]};try{r.rawResults.getLorebooks=t&&typeof t.getLorebooks=="function"?Hl(await Promise.resolve(t.getLorebooks())):"[unavailable]"}catch(a){r.errors.push(`getLorebooks: ${a?.message||a}`)}try{r.rawResults.getCharLorebooks=t&&typeof t.getCharLorebooks=="function"?Hl(await Promise.resolve(t.getCharLorebooks({type:"all"}))):"[unavailable]"}catch(a){r.errors.push(`getCharLorebooks: ${a?.message||a}`)}try{r.rawResults.getWorldBooks=e&&typeof e.getWorldBooks=="function"?Hl(await Promise.resolve(e.getWorldBooks())):"[unavailable]"}catch(a){r.errors.push(`getWorldBooks: ${a?.message||a}`)}let s=await Pa(t),n=await ow(t,e),o=dn([...s,...n]);return r.characterWorldbooks=[...s],r.allWorldbooks=[...n],r.combinedWorldbooks=[...o],sw=r,Gl=o,[...o]}async function Na(t){let e="";if(typeof t=="string"?e=t:t&&typeof t=="object"&&(e=t?.worldbooks?.presetId||""),!e)return"";let r=xo(e);if(!r)return Rs.warn(`buildSelectedWorldbookContent: \u9884\u8BBE\u4E0D\u5B58\u5728 ${e}`),"";let s=r.includeDisabled===!0,n=[];if(r.bindingMode==="character_card"){let l=wo(),c=Pp(),d=await Pa(l),u=new Map((r.bookList||[]).map(y=>[String(y.bookName||""),y]));for(let y of dn(d)){let p=u.get(y);p&&p.enabled===!1||n.push(y)}}else n=(r.bookList||[]).filter(l=>l&&l.bookName&&l.enabled!==!1).map(l=>l.bookName);if(n=dn(n),n.length===0)return"";let o=wo();if(!o||typeof o.getLorebookEntries!="function")return Rs.warn("TavernHelper.getLorebookEntries \u4E0D\u53EF\u7528\uFF0C\u65E0\u6CD5\u8BFB\u53D6\u4E16\u754C\u4E66\u5185\u5BB9\u3002"),"";let a=new Map((r.bookList||[]).map(l=>[l.bookName,l.entryOverrides||{}])),i=[];for(let l of n)try{let c=await o.getLorebookEntries(l),d=Array.isArray(c)?c:[],u=a.get(l)||{},p=d.filter(g=>s||g?.enabled!==!1&&!g?.disable).filter(g=>{let m=u[String(g?.uid??"")];return m&&typeof m.enabled=="boolean"?m.enabled:!0}).map(nw).filter(Boolean).join(`

`);p&&i.push(`[\u4E16\u754C\u4E66\uFF1A${l}]
${p}`)}catch(c){Rs.warn(`\u8BFB\u53D6\u4E16\u754C\u4E66\u5931\u8D25: ${l}`,c)}return i.join(`

---

`)}async function $p(t){if(!t)return[];let e=wo();if(!e||typeof e.getLorebookEntries!="function")return[];try{let r=await e.getLorebookEntries(t);return Array.isArray(r)?r:[]}catch(r){return Rs.warn(`getEntriesForBook \u5931\u8D25: ${t}`,r),[]}}var Rs,Gl,sw,$a=N(()=>{ks();H();cn();Rs=C.createScope("ToolWorldbookService"),Gl=[],sw=null});function Op(t){if(!t)return"";let e=String(t).trim();return e=e.replace(/([a-z0-9])([A-Z])/g,"$1_$2"),e.toUpperCase()}function Oa(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window}function Hr(){try{return Oa()?.SillyTavern||null}catch{return null}}function Da(t){try{return(t||Hr())?.getContext?.()||null}catch{return null}}function Yl(t,e){if(!t)return null;let r=typeof t?.on=="function"||typeof t?.addListener=="function",s=typeof t?.off=="function"||typeof t?.removeListener=="function";return!r||!s?null:{source:e,eventSource:t,capabilities:{on:typeof t?.on=="function",off:typeof t?.off=="function",addListener:typeof t?.addListener=="function",removeListener:typeof t?.removeListener=="function"}}}function aw(){let t=Oa(),e=Hr(),r=Da(e),n=[Yl(e?.eventSource,"SillyTavern.eventSource"),Yl(r?.eventSource,"SillyTavern.getContext().eventSource"),Yl(t?.eventSource,"topWindow.eventSource")].filter(Boolean)[0]||null,o=e?.eventTypes||e?.event_types||r?.eventTypes||r?.event_types||t?.eventTypes||t?.event_types||{};return{topWindow:t,api:e,context:r,eventSource:n?.eventSource||null,eventTypes:o,source:n?.source||"unavailable",capabilities:n?.capabilities||null,hasBridge:!!n?.eventSource}}var Ot,Ge,iw,Dp,Vl,_t,La=N(()=>{H();Ot=C.createScope("HostEvents"),Ge=Object.freeze({APP_READY:"APP_READY",MESSAGE_SENT:"MESSAGE_SENT",MESSAGE_RECEIVED:"MESSAGE_RECEIVED",MESSAGE_UPDATED:"MESSAGE_UPDATED",MESSAGE_DELETED:"MESSAGE_DELETED",MESSAGE_EDITED:"MESSAGE_EDITED",MESSAGE_SWIPED:"MESSAGE_SWIPED",USER_MESSAGE_RENDERED:"USER_MESSAGE_RENDERED",CHARACTER_MESSAGE_RENDERED:"CHARACTER_MESSAGE_RENDERED",IMPERSONATE_READY:"IMPERSONATE_READY",GENERATION_STARTED:"GENERATION_STARTED",GENERATION_STOPPED:"GENERATION_STOPPED",GENERATION_ENDED:"GENERATION_ENDED",GENERATION_AFTER_COMMANDS:"GENERATION_AFTER_COMMANDS",CHAT_CHANGED:"CHAT_CHANGED",CHAT_CREATED:"CHAT_CREATED",CHAT_DELETED:"CHAT_DELETED",CHARACTER_PAGE_LOADED:"CHARACTER_PAGE_LOADED",CHARACTER_EDITOR_OPENED:"CHARACTER_EDITOR_OPENED",CHARACTER_EDITED:"CHARACTER_EDITED",WORLDINFO_UPDATED:"WORLDINFO_UPDATED"});iw=1500,Dp=20,Vl=class{constructor(){this._bridge=null,this._pending=[],this._initAttempts=0,this._retryTimer=null,this._readyResolvers=[],this._initialized=!1,this._disposed=!1}subscribe(e,r,s={}){if(!e||typeof r!="function")return Ot.warn("subscribe \u65E0\u6548\u53C2\u6570",{eventKey:e,handlerType:typeof r}),()=>{};if(this._disposed)return Ot.warn("subscribe \u5728 dispose \u4E4B\u540E\u88AB\u8C03\u7528",{eventKey:e}),()=>{};let n={key:Op(e),rawKey:e,handler:r,options:s,attached:!1,_hostName:"",_hostUnsubscribe:null,_disposed:!1};return this._pending.push(n),this._ensureInitialized(),this._bridge?.hasBridge&&this._attachEntry(n),()=>{if(n._disposed)return;n._disposed=!0;let o=this._pending.indexOf(n);if(o>=0&&this._pending.splice(o,1),n.attached&&typeof n._hostUnsubscribe=="function")try{n._hostUnsubscribe()}catch(a){Ot.warn("\u53D6\u6D88\u5BBF\u4E3B\u8BA2\u9605\u5931\u8D25",{event:n._hostName,error:a})}}}async emit(e,...r){if(this._ensureInitialized(),!this._bridge?.hasBridge)return Ot.debug("emit \u65F6\u5BBF\u4E3B\u6865\u672A\u5C31\u7EEA\uFF0C\u8DF3\u8FC7",{eventKey:e}),!1;let s=this._resolveHostEventName(e);if(!s)return!1;let{eventSource:n}=this._bridge;try{if(typeof n?.emit=="function")return await n.emit(s,...r),!0;if(typeof n?.dispatch=="function")return await n.dispatch(s,...r),!0}catch(o){Ot.warn("emit \u629B\u9519",{eventKey:e,hostName:s,error:o})}return!1}ready({timeoutMs:e=1e4}={}){return this._ensureInitialized(),this._bridge?.hasBridge?Promise.resolve(!0):new Promise(r=>{let s=!1,n=a=>{s||(s=!0,r(a))},o=e>0?setTimeout(()=>n(!1),e):null;this._readyResolvers.push(a=>{o&&clearTimeout(o),n(a)})})}describe(){this._ensureInitialized();let e=this._bridge?.eventTypes||{};return{initialized:this._initialized,source:this._bridge?.source||"unavailable",hasBridge:!!this._bridge?.hasBridge,initAttempts:this._initAttempts,retryScheduled:!!this._retryTimer,pendingCount:this._pending.filter(r=>!r.attached).length,attachedCount:this._pending.filter(r=>r.attached).length,availableEvents:Object.keys(e).slice(0,100)}}reinit(){if(this._disposed)return!1;for(let e of this._pending){if(e.attached&&typeof e._hostUnsubscribe=="function")try{e._hostUnsubscribe()}catch{}e.attached=!1,e._hostUnsubscribe=null,e._hostName=""}return this._bridge=null,this._initialized=!1,this._initAttempts=0,this._retryTimer&&(clearTimeout(this._retryTimer),this._retryTimer=null),this._ensureInitialized()}dispose(){this._retryTimer&&(clearTimeout(this._retryTimer),this._retryTimer=null);for(let e of this._pending){if(e.attached&&typeof e._hostUnsubscribe=="function")try{e._hostUnsubscribe()}catch{}e._disposed=!0}this._pending=[],this._readyResolvers=[],this._bridge=null,this._initialized=!1,this._disposed=!0}_ensureInitialized(){if(this._disposed)return!1;if(this._initialized&&this._bridge?.hasBridge)return!0;this._initAttempts+=1;let e=aw();if(this._bridge=e,this._initialized=!0,!e.hasBridge)return Ot.debug(`\u5BBF\u4E3B\u6865\u672A\u5C31\u7EEA (attempt ${this._initAttempts})`,{source:e.source}),this._scheduleRetry(),!1;Ot.info("\u5BBF\u4E3B\u6865\u5DF2\u5C31\u7EEA",{source:e.source,eventTypesCount:Object.keys(e.eventTypes).length});for(let s of this._pending)!s.attached&&!s._disposed&&this._attachEntry(s);let r=this._readyResolvers.slice();this._readyResolvers=[];for(let s of r)try{s(!0)}catch{}return!0}_scheduleRetry(){if(!this._retryTimer){if(this._initAttempts>=Dp){Ot.warn(`\u5DF2\u8FBE\u6700\u5927\u91CD\u8BD5\u6B21\u6570 (${Dp})\uFF0C\u505C\u6B62\u91CD\u8BD5`);let e=this._readyResolvers.slice();this._readyResolvers=[];for(let r of e)try{r(!1)}catch{}return}this._retryTimer=setTimeout(()=>{this._retryTimer=null,this._initialized=!1,this._ensureInitialized()},iw)}}_resolveHostEventName(e){let r=Op(e),s=this._bridge?.eventTypes||{};if(s[r])return s[r];let n=r.toLowerCase();if(s[n])return s[n];let o=String(e).trim();return o&&o===o.toLowerCase()?o:n}_attachEntry(e){if(!this._bridge?.hasBridge||e.attached||e._disposed)return;let r=this._resolveHostEventName(e.rawKey);if(!r){Ot.warn("\u65E0\u6CD5\u89E3\u6790\u5BBF\u4E3B\u4E8B\u4EF6\u540D",{rawKey:e.rawKey});return}let{eventSource:s}=this._bridge,n=typeof s?.on=="function"?s.on.bind(s):typeof s?.addListener=="function"?s.addListener.bind(s):null,o=typeof s?.off=="function"?s.off.bind(s):typeof s?.removeListener=="function"?s.removeListener.bind(s):null;if(!n||!o){Ot.warn("\u5BBF\u4E3B eventSource \u7F3A\u5C11 on/off \u65B9\u6CD5");return}try{n(r,e.handler),e.attached=!0,e._hostName=r,e._hostUnsubscribe=()=>{try{o(r,e.handler)}catch(a){Ot.warn("\u53D6\u6D88\u5BBF\u4E3B\u8BA2\u9605\u5931\u8D25",{event:r,error:a})}},Ot.debug(`\u7ED1\u5B9A\u5BBF\u4E3B\u4E8B\u4EF6: "${r}" (key=${e.key})`)}catch(a){Ot.error(`\u7ED1\u5B9A\u5BBF\u4E3B\u4E8B\u4EF6\u5931\u8D25: "${r}"`,{error:a})}}},_t=new Vl});var Bp={};le(Bp,{WorldbookPresetPanel:()=>vo,default:()=>gw});function lw(t){return t===cr.CUSTOM?"\u81EA\u5B9A\u4E49":"\u8DDF\u968F\u89D2\u8272\u5361"}function cw(t,e,r){let s=[...t.bookList],n=s.findIndex(o=>o.bookName===e);n>=0?s[n]={...s[n],enabled:r}:s.push({bookName:e,enabled:r,entryOverrides:{}}),gt.updatePreset(t.id,{bookList:s})}function dw(t,e){let r=t.bookList.filter(s=>s.bookName!==e);gt.updatePreset(t.id,{bookList:r})}async function uw(t,e){let r=Np();if(!r.length)try{r=await ql()}catch{}let s=new Set(t.bookList.map(d=>d.bookName)),n=r.filter(d=>!s.has(d));if(!n.length){await Ne.confirm({title:"\u6CA1\u6709\u53EF\u6DFB\u52A0\u7684\u4E16\u754C\u4E66",message:"\u5BBF\u4E3B\u672A\u63D0\u4F9B\u66F4\u591A\u53EF\u7528\u4E16\u754C\u4E66\uFF0C\u6216\u7F13\u5B58\u5185\u5168\u90E8\u5DF2\u52A0\u5165\u6B64\u9884\u8BBE\u3002",confirmText:"\u786E\u5B9A"});return}let o=f("div",{style:{display:"flex",flexDirection:"column",gap:"8px"}}),a=f("input",{className:"yyt-input",attrs:{type:"text",placeholder:`\u641C\u7D22 ${n.length} \u672C\u4E16\u754C\u4E66\u2026`,autocomplete:"off"},style:{padding:"7px 10px",fontSize:"12px"}});o.appendChild(a);let i=f("div",{style:{display:"flex",flexDirection:"column",gap:"4px",maxHeight:"320px",overflowY:"auto"}}),l=new Set,c=[];for(let d of n){let u=f("label",{style:{display:"flex",alignItems:"center",gap:"8px",padding:"8px 10px",cursor:"pointer",borderRadius:"var(--yyt-radius-sm, 6px)",background:"var(--yyt-surface-2, rgba(255,255,255,0.03))",fontSize:"12px"}}),y=f("input",{attrs:{type:"checkbox",value:d}});y.addEventListener("change",()=>{y.checked?l.add(d):l.delete(d)}),u.appendChild(y),u.appendChild(f("span",{text:d,style:{color:"var(--yyt-text)"}})),i.appendChild(u),c.push({el:u,search:d.toLowerCase()})}o.appendChild(i),a.addEventListener("input",()=>{let d=a.value.trim().toLowerCase();for(let u of c)u.el.style.display=!d||u.search.includes(d)?"":"none"}),Ne.custom({title:`\u6DFB\u52A0\u4E16\u754C\u4E66\uFF08${n.length} \u9879\u53EF\u9009\uFF09`,width:"480px",body:o,buttons:[{label:"\u53D6\u6D88",variant:"ghost",onClick:d=>d(null)},{label:"\u5168\u9009\u53EF\u89C1",variant:"ghost",onClick:()=>{for(let d of i.querySelectorAll("input[type=checkbox]")){let u=d.closest("label");(!u||u.style.display!=="none")&&(d.checked=!0,l.add(d.value))}}},{label:"\u6DFB\u52A0\u9009\u4E2D",variant:"primary",onClick:d=>{let u=Array.from(l);if(!u.length){d(null);return}let y=u.map(g=>({bookName:g,enabled:!0,entryOverrides:{}})),p=[...t.bookList,...y];gt.updatePreset(t.id,{bookList:p}),d(u.length)}}]}).result.then(d=>{d&&e&&e()})}function pw(t,{onChange:e,readonly:r,refresh:s}){let n=f("div",{style:{display:"flex",flexDirection:"column",gap:"12px"}});G(n,$t({label:"\u63CF\u8FF0",control:ge({value:t.description,placeholder:"\u53EF\u9009 \u2014 \u5907\u6CE8\u7528\u9014",disabled:r,onChange:d=>e({description:d})})})),G(n,$t({label:"\u7ED1\u5B9A\u6A21\u5F0F",hint:"\u8DDF\u968F\u89D2\u8272\u5361 = \u6CE8\u5165\u5F53\u524D\u89D2\u8272\u7ED1\u5B9A\u7684\u4E16\u754C\u4E66\uFF1B\u81EA\u5B9A\u4E49 = \u7528\u4E0B\u65B9\u624B\u52A8\u9009\u62E9\u7684\u5217\u8868",control:_e({value:t.bindingMode,disabled:r,options:[{value:cr.CHARACTER_CARD,label:"\u8DDF\u968F\u89D2\u8272\u5361\uFF08\u52A8\u6001\uFF09"},{value:cr.CUSTOM,label:"\u81EA\u5B9A\u4E49\uFF08\u56FA\u5B9A\u5217\u8868\uFF09"}],onChange:d=>{e({bindingMode:d}),s&&s()}})})),G(n,Ye({label:"\u5305\u542B\u7981\u7528\u8BCD\u6761",hint:"\u5F00\u542F\u540E\uFF1A\u6E90\u4E16\u754C\u4E66\u4E2D\u5DF2\u7981\u7528\u7684\u8BCD\u6761\u53EF\u88AB\u672C\u9884\u8BBE\u5F3A\u5236\u542F\u7528\u5E76\u6CE8\u5165",checked:t.includeDisabled,disabled:r,onChange:d=>e({includeDisabled:d})}));let o=t.bindingMode===cr.CHARACTER_CARD,a=f("div",{style:{display:"flex",flexDirection:"column"}}),i=f("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"6px",gap:"8px"}});i.appendChild(f("div",{style:{display:"flex",flexDirection:"column",gap:"2px"}},f("div",{text:o?"\u968F\u89D2\u8272\u5361\u6CE8\u5165\u7684\u4E16\u754C\u4E66":"\u9009\u4E2D\u7684\u4E16\u754C\u4E66",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}}),f("div",{text:o?"\u4EE5\u4E0B\u6765\u81EA\u5F53\u524D\u89D2\u8272\u5361\u7684\u4E16\u754C\u4E66\u5C06\u88AB\u81EA\u52A8\u6CE8\u5165\uFF0C\u5217\u8868\u968F\u89D2\u8272\u5361\u53D8\u52A8\u81EA\u52A8\u66F4\u65B0":'\u672C\u9884\u8BBE\u56FA\u5B9A\u6CE8\u5165\u4E0B\u5217\u4E16\u754C\u4E66\uFF1B\u70B9\u51FB"+ \u6DFB\u52A0"\u4ECE\u53EF\u7528\u5217\u8868\u591A\u9009',style:{fontSize:"11px",color:"var(--yyt-text-muted)",lineHeight:"1.5"}})));let l=f("div",{style:{display:"flex",gap:"6px"}});!o&&!r&&l.appendChild(q({label:"+ \u6DFB\u52A0",size:"small",onClick:()=>uw(t,s)}).el),o||l.appendChild(q({label:"\u{1F504} \u5237\u65B0",size:"small",variant:"ghost",onClick:async()=>{try{await ql()}catch(d){Jl.warn("\u5237\u65B0\u5931\u8D25",{e:d})}s&&s()}}).el),i.appendChild(l),G(a,i);let c=[];if(o){let d=f("div",{style:{display:"flex",flexDirection:"column",gap:"4px"}});d.appendChild(f("div",{text:"\u6B63\u5728\u83B7\u53D6\u89D2\u8272\u5361\u7ED1\u5B9A\u7684\u4E16\u754C\u4E66\u2026",style:{padding:"14px 0",color:"var(--yyt-text-muted)",fontSize:"12px"}})),Pa().then(u=>{if(d.innerHTML="",!u.length)d.appendChild(f("div",{style:{padding:"14px 0",color:"var(--yyt-text-muted)",fontSize:"12px"},text:'\u5F53\u524D\u89D2\u8272\u5361\u672A\u7ED1\u5B9A\u4E16\u754C\u4E66 \u2014 \u5207\u6362\u5230"\u81EA\u5B9A\u4E49"\u53EF\u4EE5\u624B\u52A8\u9009\u62E9\u4EFB\u610F\u4E16\u754C\u4E66\u3002'}));else for(let y of u)d.appendChild(f("div",{style:{padding:"8px 10px",borderRadius:"var(--yyt-radius-sm, 6px)",background:"var(--yyt-surface-2, rgba(255,255,255,0.03))",fontSize:"12px",display:"flex",alignItems:"center",gap:"8px",opacity:"0.7"}},f("span",{text:"\u{1F4D6}",style:{fontSize:"11px"}}),f("span",{text:y,style:{flex:"1",color:"var(--yyt-text)"}}),f("span",{text:"\u968F\u89D2\u8272\u5361\u6CE8\u5165",style:{fontSize:"11px",color:"var(--yyt-text-muted)"}})))}).catch(u=>{Jl.warn("\u83B7\u53D6\u89D2\u8272\u5361\u4E16\u754C\u4E66\u5931\u8D25",u),d.innerHTML="",d.appendChild(f("div",{style:{padding:"14px 0",color:"var(--yyt-danger, #f87171)",fontSize:"12px"},text:"\u83B7\u53D6\u89D2\u8272\u5361\u4E16\u754C\u4E66\u5931\u8D25"}))}),c=[d]}else t.bookList.length?c=t.bookList.map(d=>{let u=Object.keys(d.entryOverrides||{}).filter(g=>{let m=d.entryOverrides[g];return m&&typeof m.enabled=="boolean"}).length,y=f("div",{style:{display:"flex",flexDirection:"column"}}),p=Nl({name:d.bookName,desc:d.enabled===!1?"\u5DF2\u7981\u7528":`\u5DF2\u542F\u7528 \xB7 \u6574\u672C\u6CE8\u5165${u?` \xB7 ${u} \u6761 override`:""}`,actions:[q({label:"\u25B8 \u8BCD\u6761",size:"small",variant:"ghost",title:"\u5C55\u5F00/\u6536\u8D77\u8BCD\u6761\u7EA7 override",onClick:()=>yw(y,t,d,r,s)}),Ye({checked:d.enabled!==!1,disabled:r,onChange:g=>cw(t,d.bookName,g)}),...r?[]:[q({label:"\xD7",size:"small",variant:"ghost",title:"\u4ECE\u9884\u8BBE\u79FB\u9664",onClick:()=>{dw(t,d.bookName),s&&s()}})]]});return p?.el&&G(y,p.el),y}):c=[f("div",{style:{padding:"14px 0",color:"var(--yyt-text-muted)",fontSize:"12px"},text:'\u70B9\u51FB\u53F3\u4E0A\u89D2"+ \u6DFB\u52A0"\u9009\u62E9\u4E16\u754C\u4E66\u52A0\u5165\u6B64\u9884\u8BBE\u3002'})];for(let d of c)d?.el?G(a,d.el):d instanceof Node&&G(a,d);return G(n,a),n}function yw(t,e,r,s,n){let o=t.querySelector(".yyt-wb-entry-panel");if(o){o.remove();let l=t.querySelector('[title="\u5C55\u5F00/\u6536\u8D77\u8BCD\u6761\u7EA7 override"]');l&&(l.textContent="\u25B8 \u8BCD\u6761");return}let a=t.querySelector('[title="\u5C55\u5F00/\u6536\u8D77\u8BCD\u6761\u7EA7 override"]');a&&(a.textContent="\u25BE \u8BCD\u6761");let i=f("div",{className:"yyt-wb-entry-panel",style:{marginLeft:"18px",marginTop:"4px",padding:"8px 10px",background:"var(--yyt-surface-2, rgba(255,255,255,0.03))",borderRadius:"var(--yyt-radius-sm, 6px)",border:"1px solid var(--yyt-border, rgba(255,255,255,0.06))",fontSize:"12px",display:"flex",flexDirection:"column",gap:"4px"}});i.appendChild(f("div",{text:"\u52A0\u8F7D\u4E2D\u2026",style:{color:"var(--yyt-text-muted)",padding:"4px 0"}})),t.appendChild(i),$p(r.bookName).then(l=>{if(!l.length){i.innerHTML="",i.appendChild(f("div",{text:"\u8BE5\u4E16\u754C\u4E66\u65E0\u8BCD\u6761",style:{color:"var(--yyt-text-muted)",padding:"4px 0"}}));return}let c=r.entryOverrides||{};i.innerHTML="";let d=f("input",{className:"yyt-input",attrs:{type:"text",placeholder:`\u641C\u7D22 ${l.length} \u4E2A\u8BCD\u6761\u2026`,autocomplete:"off"},style:{padding:"5px 8px",fontSize:"11px",marginBottom:"4px",flexShrink:"0"}});i.appendChild(d);let u=f("div",{style:{display:"flex",flexDirection:"column",gap:"2px",height:"260px",overflowY:"scroll",overscrollBehavior:"contain",WebkitOverflowScrolling:"touch"}});u.addEventListener("wheel",g=>{let m=g.deltaY;if(m===0)return;let h=u.scrollTop+u.clientHeight<u.scrollHeight-.5,x=u.scrollTop>.5;(m>0&&h||m<0&&x)&&(g.preventDefault(),g.stopPropagation(),u.scrollTop+=m)},{passive:!1});let y=e.includeDisabled===!0,p=[];for(let g of l){let m=String(g.uid??""),h=g.comment||g.key||g.name||"",x=String(Array.isArray(h)?h[0]:h).trim()||`\u6761\u76EE ${g.uid}`,v=g.enabled===!1||g.disable===!0,T=c[m],A=T&&typeof T.enabled=="boolean",E=v&&!A&&!y,w=f("div",{style:{display:"flex",alignItems:"center",gap:"8px",padding:"5px 8px",borderRadius:"4px",background:A?"rgba(123,183,255,0.08)":"transparent",opacity:E?"0.4":"1"}}),P=_=>{w.style.background=_?"rgba(123,183,255,0.08)":"transparent",R.style.color=_?"var(--yyt-accent)":"var(--yyt-text)",_?$||($=B(),w.appendChild($)):($&&($.remove(),$=null),w.style.opacity=v?"0.4":"1")},$=null,B=()=>{let _=f("span",{text:"\u2715",style:{cursor:"pointer",color:"var(--yyt-text-muted)",fontSize:"10px",flexShrink:"0"},attrs:{title:"\u6E05\u9664 override"}});return _.addEventListener("click",k=>{if(k.stopPropagation(),s)return;let K=gt.getPreset(e.id);if(!K)return;let Y=K.bookList.find(ue=>ue.bookName===r.bookName);Y&&(Y.entryOverrides=Y.entryOverrides||{},delete Y.entryOverrides[m],gt.updatePreset(e.id,{bookList:[...K.bookList]},{silent:!0}),$=null,P(!1))}),_};w.appendChild(Ye({checked:A?T.enabled:!v,disabled:s||E,onChange:_=>{let k=gt.getPreset(e.id);if(!k)return;let K=k.bookList.find(pe=>pe.bookName===r.bookName);if(!K)return;K.entryOverrides=K.entryOverrides||{};let Y=!v;_===Y?delete K.entryOverrides[m]:K.entryOverrides[m]={enabled:_};let ue=_!==Y;gt.updatePreset(e.id,{bookList:[...k.bookList]},{silent:!0}),P(ue),w.style.opacity=E?"0.4":"1"}}).el);let R=f("span",{style:{flex:"1",minWidth:"0",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",color:A?"var(--yyt-accent)":"var(--yyt-text)",fontSize:"11px"},text:x+(E?" (\u6E90\u7981\u7528)":"")});w.appendChild(R),A&&($=B(),w.appendChild($)),u.appendChild(w),p.push({el:w,search:x.toLowerCase()})}i.appendChild(u),d.addEventListener("input",()=>{let g=d.value.trim().toLowerCase();for(let m of p)m.el.style.display=!g||m.search.includes(g)?"":"none"})}).catch(l=>{Jl.warn("\u52A0\u8F7D\u8BCD\u6761\u5931\u8D25",l),i.innerHTML="",i.appendChild(f("div",{text:`\u52A0\u8F7D\u5931\u8D25\uFF1A${l?.message||l}`,style:{color:"var(--yyt-danger, #f87171)",padding:"4px 0"}}))})}function fw(t){let e=[`${lw(t.bindingMode)}`,`${t.bookList.length} \u672C`];return t.includeDisabled&&e.push("\u542B\u7981\u7528"),e}var Jl,vo,Xl,Lp,gw,zp=N(()=>{tr();cn();$a();La();Ca();H();ho();Jl=C.createScope("WorldbookPresetPanel");vo=Kr({id:"worldbookPresetPanel",kind:"worldbook",panelTitle:"\u4E16\u754C\u4E66\u9884\u8BBE",panelHint:"\u7BA1\u7406\u4E16\u754C\u4E66\u6CE8\u5165\u9884\u8BBE\u3002\u5DE5\u5177\u914D\u7F6E\u4E2D\u901A\u8FC7\u9884\u8BBE ID \u5F15\u7528\uFF0C\u53EF\u7ED1\u5B9A\u89D2\u8272\u5361\uFF08\u52A8\u6001\uFF09\u6216\u56FA\u5B9A\u5217\u8868\u3002",store:gt,renderEditor:pw,renderListItemMeta:fw}),Xl=null,Lp=vo.renderTo;vo.renderTo=function(t){Xl=t,Lp.call(this,t)};_t.subscribe(Ge.CHAT_CHANGED,()=>{if(!Xl)return;let t=gt.getCurrentPreset();!t||t.bindingMode!==cr.CHARACTER_CARD||Lp.call(vo,Xl)});gw=vo});var nc={};le(nc,{MESSAGE_MACROS:()=>ly,addTagRule:()=>Xp,createRuleTemplate:()=>qp,default:()=>bw,deleteRulePreset:()=>ny,deleteRuleTemplate:()=>Vp,deleteTagRule:()=>Zp,escapeRegex:()=>Ms,exportRulesConfig:()=>oy,extractComplexTag:()=>Up,extractCurlyBraceTag:()=>rc,extractHtmlFormatTag:()=>jp,extractSimpleTag:()=>tc,extractTagContent:()=>Ar,generateTagSuggestions:()=>Wp,getAllRulePresets:()=>ry,getAllRuleTemplates:()=>Hp,getContentBlacklist:()=>pn,getRuleTemplate:()=>Gp,getTagRules:()=>un,importRulesConfig:()=>ay,isValidTagName:()=>ec,loadRulePreset:()=>sy,saveRulesAsPreset:()=>ty,scanTextForTags:()=>Fp,setContentBlacklist:()=>ey,setTagRules:()=>Jp,shouldSkipContent:()=>Zl,testRegex:()=>iy,updateRuleTemplate:()=>Yp,updateTagRule:()=>Qp});function mw(){return{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"},ruleTemplates:[...Ql],tagRules:[],contentBlacklist:[],tagRulePresets:{}}}function Dt(){return z.get(Kp,mw())}function ur(t){z.set(Kp,t)}function Ba(){let t=Dt();return mt=t.ruleTemplates||[...Ql],De=t.tagRules||[],At=t.contentBlacklist||[],{ruleTemplates:mt,tagRules:De,contentBlacklist:At}}function Ms(t){return typeof t!="string"?"":t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function Zl(t,e){if(!e||e.length===0||!t||typeof t!="string")return!1;let r=t.toLowerCase();return e.some(s=>{let n=s.trim().toLowerCase();return n&&r.includes(n)})}function ec(t){return!t||typeof t!="string"?!1:/^[a-zA-Z][a-zA-Z0-9_-]*$/.test(t)&&!hw.includes(t.toLowerCase())}function tc(t,e){if(!t||!e)return[];let r=[],s=Ms(e),n=new RegExp(`<${s}>([\\s\\S]*?)<\\/${s}>`,"gi");[...t.matchAll(n)].forEach(l=>{l[1]&&r.push(l[1].trim())});let a=(t.match(new RegExp(`<${s}>`,"gi"))||[]).length,i=(t.match(new RegExp(`<\\/${s}>`,"gi"))||[]).length;return a>i&&dr.warn(`\u53D1\u73B0 ${a-i} \u4E2A\u672A\u95ED\u5408\u7684 <${e}> \u6807\u7B7E`),r}function rc(t,e){if(!t||!e)return[];let r=[],s=Ms(e),n=new RegExp(`\\{${s}\\|`,"gi"),o;for(;(o=n.exec(t))!==null;){let a=o.index,i=a+o[0].length,l=1,c=i;for(;c<t.length&&l>0;)t[c]==="{"?l++:t[c]==="}"&&l--,c++;if(l===0){let d=t.substring(i,c-1);d.trim()&&r.push(d.trim())}n.lastIndex=a+1}return r}function Up(t,e){if(!t||!e)return[];let r=e.split(",");if(r.length!==2)return dr.error(`\u590D\u6742\u6807\u7B7E\u914D\u7F6E\u683C\u5F0F\u9519\u8BEF\uFF0C\u5E94\u8BE5\u5305\u542B\u4E00\u4E2A\u9017\u53F7: ${e}`),[];let s=r[0].trim(),n=r[1].trim(),o=n.match(/<\/(\w+)>/);if(!o)return dr.error(`\u65E0\u6CD5\u89E3\u6790\u7ED3\u675F\u6807\u7B7E: ${n}`),[];let a=o[1],i=new RegExp(`${Ms(s)}([\\s\\S]*?)<\\/${a}>`,"gi"),l=[];return[...t.matchAll(i)].forEach(d=>{d[1]&&l.push(d[1].trim())}),l}function jp(t,e){if(!t||!e)return[];let r=e.match(/<(\w+)(?:\s[^>]*)?>/);if(!r)return dr.error(`\u65E0\u6CD5\u89E3\u6790HTML\u683C\u5F0F\u6807\u7B7E: ${e}`),[];let s=r[1],n=[],o=new RegExp(`<${s}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${s}>`,"gi");[...t.matchAll(o)].forEach(c=>{c[1]&&n.push(c[1].trim())});let i=(t.match(new RegExp(`<${s}(?:\\s[^>]*)?>`,"gi"))||[]).length,l=(t.match(new RegExp(`<\\/${s}>`,"gi"))||[]).length;return i>l&&dr.warn(`\u53D1\u73B0 ${i-l} \u4E2A\u672A\u95ED\u5408\u7684 <${s}> \u6807\u7B7E`),n}function Ar(t,e,r=[]){if(!t)return"";if(!e||e.length===0)return t;let s=e.filter(d=>d.type==="exclude"&&d.enabled),n=e.filter(d=>(d.type==="include"||d.type==="regex_include")&&d.enabled),o=e.filter(d=>d.type==="regex_exclude"&&d.enabled),a=t;for(let d of s)try{let u=new RegExp(`<${Ms(d.value)}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${Ms(d.value)}>`,"gi");a=a.replace(u,"")}catch(u){dr.error("Error applying block exclusion rule:",{rule:d,error:u})}let i=[];if(n.length>0)for(let d of n){let u=[];try{if(d.type==="include")u.push(...tc(a,d.value)),u.push(...rc(a,d.value));else if(d.type==="regex_include"){let y=new RegExp(d.value,"gi");[...a.matchAll(y)].forEach(g=>{g[1]&&u.push(g[1])})}}catch(y){dr.error("Error applying inclusion rule:",{rule:d,error:y})}u.forEach(y=>i.push(y.trim()))}else i.push(a);let l=[];for(let d of i){for(let u of o)try{let y=new RegExp(u.value,"gi");d=d.replace(y,"")}catch(y){dr.error("Error applying cleanup rule:",{rule:u,error:y})}Zl(d,r)||l.push(d)}return l.join(`

`).replace(/\n\s*\n\s*\n/g,`

`).replace(/^\s+|\s+$/g,"").trim()}async function Fp(t,e={}){let r=performance.now(),{chunkSize:s=5e4,maxTags:n=100,timeoutMs:o=5e3}=e,a=new Set,i=/<(?:\/|)([a-zA-Z0-9_-]+)(?:[^>]*)>|\{([a-zA-Z0-9_-]+)(?:\||})/g,l=0,c=0;for(let u=0;u<t.length;u+=s){let y=t.slice(u,Math.min(u+s,t.length));if(c++,l+=y.length,performance.now()-r>o){dr.warn(`Tag scanning timed out after ${o}ms`);break}let p;for(;(p=i.exec(y))!==null&&a.size<n;){let g=(p[1]||p[2]).toLowerCase();ec(g)&&a.add(g)}if(a.size>=n)break;c%5===0&&await new Promise(g=>setTimeout(g,0))}let d=performance.now();return{tags:Array.from(a).sort(),stats:{processingTimeMs:Math.round(d-r),processedChars:l,totalChars:t.length,chunkCount:c,tagsFound:a.size}}}function Wp(t,e=25){let r=t.tags.slice(0,e);return{suggestions:r,stats:{totalFound:t.stats.tagsFound,finalCount:r.length}}}function Hp(){return mt.length===0&&Ba(),mt}function Gp(t){return mt.find(e=>e.id===t)}function qp(t){let e={id:`rule-${Date.now()}`,name:t.name||"\u65B0\u89C4\u5219",description:t.description||"",type:t.type||"include",value:t.value||"",enabled:t.enabled!==!1,createdAt:new Date().toISOString()};return mt.push(e),sc(),{success:!0,template:e,message:"\u89C4\u5219\u6A21\u677F\u521B\u5EFA\u6210\u529F"}}function Yp(t,e){let r=mt.findIndex(s=>s.id===t);return r===-1?{success:!1,message:"\u89C4\u5219\u6A21\u677F\u4E0D\u5B58\u5728"}:(mt[r]={...mt[r],...e,updatedAt:new Date().toISOString()},sc(),{success:!0,template:mt[r],message:"\u89C4\u5219\u6A21\u677F\u66F4\u65B0\u6210\u529F"})}function Vp(t){let e=mt.findIndex(r=>r.id===t);return e===-1?{success:!1,message:"\u89C4\u5219\u6A21\u677F\u4E0D\u5B58\u5728"}:(mt.splice(e,1),sc(),{success:!0,message:"\u89C4\u5219\u6A21\u677F\u5DF2\u5220\u9664"})}function sc(){let t=Dt();t.ruleTemplates=mt,ur(t)}function un(){return De||Ba(),De}function Jp(t){De=t||[];let e=Dt();e.tagRules=De,ur(e)}function Xp(t){let e={id:`tag-${Date.now()}`,type:t.type||"include",value:t.value||"",enabled:t.enabled!==!1};De.push(e);let r=Dt();return r.tagRules=De,ur(r),{success:!0,rule:e,message:"\u89C4\u5219\u6DFB\u52A0\u6210\u529F"}}function Qp(t,e){if(t<0||t>=De.length)return{success:!1,message:"\u89C4\u5219\u7D22\u5F15\u65E0\u6548"};De[t]={...De[t],...e};let r=Dt();return r.tagRules=De,ur(r),{success:!0,rule:De[t],message:"\u89C4\u5219\u66F4\u65B0\u6210\u529F"}}function Zp(t){if(t<0||t>=De.length)return{success:!1,message:"\u89C4\u5219\u7D22\u5F15\u65E0\u6548"};De.splice(t,1);let e=Dt();return e.tagRules=De,ur(e),{success:!0,message:"\u89C4\u5219\u5DF2\u5220\u9664"}}function pn(){return At||Ba(),At}function ey(t){At=t||[];let e=Dt();e.contentBlacklist=At,ur(e)}function ty(t,e=""){if(!t||!t.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let r=Dt();r.tagRulePresets||(r.tagRulePresets={});let s=`preset-${Date.now()}`;return r.tagRulePresets[s]={id:s,name:t.trim(),description:e.trim(),rules:JSON.parse(JSON.stringify(De)),blacklist:JSON.parse(JSON.stringify(At)),createdAt:new Date().toISOString()},ur(r),{success:!0,preset:r.tagRulePresets[s],message:"\u9884\u8BBE\u4FDD\u5B58\u6210\u529F"}}function ry(){let e=Dt().tagRulePresets||{};return Object.values(e)}function sy(t){let e=Dt(),s=(e.tagRulePresets||{})[t];return s?(De=JSON.parse(JSON.stringify(s.rules||[])),At=JSON.parse(JSON.stringify(s.blacklist||[])),e.tagRules=De,e.contentBlacklist=At,ur(e),{success:!0,preset:s,message:"\u9884\u8BBE\u52A0\u8F7D\u6210\u529F"}):{success:!1,message:"\u9884\u8BBE\u4E0D\u5B58\u5728"}}function ny(t){let e=Dt(),r=e.tagRulePresets||{};return r[t]?(delete r[t],e.tagRulePresets=r,ur(e),{success:!0,message:"\u9884\u8BBE\u5DF2\u5220\u9664"}):{success:!1,message:"\u9884\u8BBE\u4E0D\u5B58\u5728"}}function oy(){return JSON.stringify({tagRules:De,contentBlacklist:At,ruleTemplates:mt,tagRulePresets:Dt().tagRulePresets||{}},null,2)}function ay(t,e={overwrite:!0}){try{let r=JSON.parse(t);if(e.overwrite)De=r.tagRules||[],At=r.contentBlacklist||[],mt=r.ruleTemplates||Ql;else if(r.tagRules&&De.push(...r.tagRules),r.contentBlacklist){let n=new Set(At.map(o=>o.toLowerCase()));r.contentBlacklist.forEach(o=>{n.has(o.toLowerCase())||At.push(o)})}let s=Dt();return s.tagRules=De,s.contentBlacklist=At,s.ruleTemplates=mt,r.tagRulePresets&&(s.tagRulePresets={...s.tagRulePresets||{},...r.tagRulePresets}),ur(s),{success:!0,message:"\u914D\u7F6E\u5BFC\u5165\u6210\u529F"}}catch(r){return dr.error("\u89C4\u5219\u914D\u7F6E\u5BFC\u5165\u5931\u8D25",{error:r}),{success:!1,message:`\u5BFC\u5165\u5931\u8D25: ${r.message}`}}}function iy(t,e,r="g",s=0){try{if(!t||typeof t!="string")return{success:!1,error:"\u6B63\u5219\u8868\u8FBE\u5F0F\u4E0D\u80FD\u4E3A\u7A7A",matches:[]};let n=new RegExp(t,r),o=[];if(r.includes("g")){let a;for(;(a=n.exec(e))!==null;)a.length>1?o.push({fullMatch:a[0],groups:a.slice(1),index:a.index,extracted:a[s]||a[1]||a[0]}):o.push({fullMatch:a[0],groups:[],index:a.index,extracted:a[0]})}else{let a=n.exec(e);a&&o.push({fullMatch:a[0],groups:a.length>1?a.slice(1):[],index:a.index,extracted:a.length>1?a[s]||a[1]:a[0]})}return{success:!0,matches:o,count:o.length,extracted:o.map(a=>a.extracted)}}catch(n){return{success:!1,error:n.message,matches:[]}}}var dr,Kp,hw,Ql,mt,De,At,ly,bw,yn=N(()=>{He();H();dr=C.createScope("RegexExtractor"),Kp="settings";hw=["font","span","div","p","br","hr","img","a","b","i","u","s","em","strong","small","big","sub","sup","h1","h2","h3","h4","h5","h6","table","tr","td","th","tbody","thead","tfoot","ul","ol","li","form","input","button","select","option","textarea","label","script","style","meta","link","title","head","body","html"],Ql=[{id:"exclude-thinking",name:"\u6392\u9664\u601D\u8003\u6807\u7B7E",description:"\u79FB\u9664<thinking>\u6807\u7B7E\u5757",type:"exclude",value:"thinking",enabled:!0},{id:"include-content",name:"\u63D0\u53D6\u5185\u5BB9\u6807\u7B7E",description:"\u63D0\u53D6<content>\u6807\u7B7E\u5185\u5BB9",type:"include",value:"content",enabled:!0},{id:"regex-exclude-cot",name:"\u6392\u9664\u5C0FCoT",description:"\u79FB\u9664HTML\u6CE8\u91CA",type:"regex_exclude",value:"<!--[\\s\\S]*?-->",enabled:!1},{id:"regex-include-details",name:"\u63D0\u53D6details\u6807\u7B7E",description:"\u63D0\u53D6<details>\u6807\u7B7E\u5185\u5BB9",type:"regex_include",value:"<details[^>]*>([\\s\\S]*?)</details>",enabled:!1}],mt=[],De=[],At=[];ly={lastMessage:{macro:"{{lastMessage}}",description:"\u6700\u540E\u4E00\u6761\u6D88\u606F"},lastCharMessage:{macro:"{{lastCharMessage}}",description:"\u6700\u540E\u4E00\u6761\u89D2\u8272\u6D88\u606F"},lastUserMessage:{macro:"{{lastUserMessage}}",description:"\u6700\u540E\u4E00\u6761\u7528\u6237\u6D88\u606F"},char:{macro:"{{char}}",description:"\u89D2\u8272\u540D\u79F0"},user:{macro:"{{user}}",description:"\u7528\u6237\u540D\u79F0"},input:{macro:"{{input}}",description:"\u5F53\u524D\u8F93\u5165\u6846\u5185\u5BB9"}};Ba();bw={extractTagContent:Ar,extractSimpleTag:tc,extractCurlyBraceTag:rc,extractComplexTag:Up,extractHtmlFormatTag:jp,escapeRegex:Ms,shouldSkipContent:Zl,isValidTagName:ec,scanTextForTags:Fp,generateTagSuggestions:Wp,getAllRuleTemplates:Hp,getRuleTemplate:Gp,createRuleTemplate:qp,updateRuleTemplate:Yp,deleteRuleTemplate:Vp,getTagRules:un,setTagRules:Jp,addTagRule:Xp,updateTagRule:Qp,deleteTagRule:Zp,getContentBlacklist:pn,setContentBlacklist:ey,saveRulesAsPreset:ty,getAllRulePresets:ry,loadRulePreset:sy,deleteRulePreset:ny,exportRulesConfig:oy,importRulesConfig:ay,testRegex:iy,MESSAGE_MACROS:ly}});var my={};le(my,{createDefaultToolDefinition:()=>Ps,default:()=>Tw,deleteTool:()=>gn,deleteToolPreset:()=>yy,exportTools:()=>mn,getAllTools:()=>pr,getCurrentToolPreset:()=>fy,getTool:()=>yr,getToolPresets:()=>Ka,importTools:()=>hn,normalizeToolDefinitionToRuntimeConfig:()=>So,resetTools:()=>bn,saveTool:()=>fn,saveToolPreset:()=>py,setCurrentToolPreset:()=>gy,setToolEnabled:()=>Ua});function xw(t={}){return!t||typeof t!="object"?{}:Object.fromEntries(Object.entries(t).map(([e,r])=>[e,Ps({...r||{},id:e})]))}function To(t){return Array.isArray(t)?t.map(e=>String(e||"").trim()).filter(Boolean):[]}function oc(t,e){let r=parseInt(t,10);return Number.isFinite(r)&&r>0?r:e}function cy(t,e){let r=parseInt(t,10);return Number.isFinite(r)&&r>=0?r:e}function dy(t={}){return{settleMs:cy(t?.settleMs,1200),cooldownMs:cy(t?.cooldownMs,5e3)}}function uy(t={}){return{enabled:t?.enabled===!0,selected:To(t?.selected),presetId:typeof t?.presetId=="string"?t.presetId:""}}function ww(t=[]){let e=Array.isArray(t)?t.map(r=>({role:String(r?.role||"user").trim().toUpperCase(),content:String(r?.content||"").trim()})).filter(r=>r.content):[];return e.length===0?"":e.length===1?e[0].content:e.map(r=>`\u3010${r.role||"USER"}\u3011
${r.content}`).join(`

`)}function vw(t,e={}){let r=typeof e?.promptTemplate=="string"?e.promptTemplate.trim():"";if(r)return r;let s=ww(e?.config?.messages||[]);return s||`\u8BF7\u57FA\u4E8E\u6700\u8FD1\u7684 AI \u56DE\u590D\u4E3A\u5DE5\u5177\u201C${e?.name||t}\u201D\u751F\u6210\u7ED3\u6784\u5316\u8F93\u51FA\u3002`}function Ps(t={}){let e=new Date().toISOString(),r=t?.config||{};return{...Ht,...t,id:t?.id||Ht.id,icon:t?.icon||Ht.icon,order:Number.isFinite(t?.order)?t.order:Ht.order,promptTemplate:typeof t?.promptTemplate=="string"?t.promptTemplate:Ht.promptTemplate,extractTags:To(t?.extractTags),config:{execution:{...Ht.config.execution,...r.execution||{},timeout:oc(r?.execution?.timeout,Ht.config.execution.timeout),retries:Math.max(0,parseInt(r?.execution?.retries,10)||Ht.config.execution.retries)},api:{...Ht.config.api,...r.api||{}},messages:Array.isArray(r?.messages)?r.messages:[],context:{...Ht.config.context,...r.context||{},depth:oc(r?.context?.depth,Ht.config.context.depth),includeTags:To(r?.context?.includeTags),excludeTags:To(r?.context?.excludeTags)},automation:dy(r?.automation),worldbooks:uy(r?.worldbooks)},enabled:t?.enabled!==!1,metadata:{...Ht.metadata,...t?.metadata||{},createdAt:t?.metadata?.createdAt||e,updatedAt:t?.metadata?.updatedAt||e}}}function So(t,e={},r={}){let s=Ps({...e,id:t||e?.id||""}),n=To(s?.extractTags?.length?s.extractTags:s?.config?.context?.includeTags),o=String(e?.output?.apiPreset||s?.config?.api?.preset||"").trim(),a=vw(t,s),i=typeof e?.output?.mode=="string"&&e.output.mode.trim()?e.output.mode.trim():r.defaultOutputMode||"follow_ai";return{id:s.id||t,name:s.name||t,icon:s.icon||"fa-screwdriver-wrench",description:s.description||"",enabled:s.enabled!==!1,order:Number.isFinite(s.order)?s.order:100,bypass:{enabled:s?.config?.api?.useBypass===!0&&!!s?.config?.api?.bypassPreset,presetId:s?.config?.api?.bypassPreset||""},output:{mode:i,apiPreset:o,overwrite:!0,enabled:!0},automation:dy(s?.config?.automation),worldbooks:uy(s?.config?.worldbooks),extraction:{enabled:!0,maxMessages:oc(s?.config?.context?.depth,5),selectors:n,regexPresetId:typeof s?.config?.extraction?.regexPresetId=="string"?s.config.extraction.regexPresetId:"",writebackTag:typeof s?.config?.extraction?.writebackTag=="string"?s.config.extraction.writebackTag:""},promptTemplate:a,runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},apiPreset:o,extractTags:n,isCustom:!0,category:s.category||"utility",metadata:{...s.metadata||{}}}}function pr(){let t=Se.get(Ke.TOOLS),e=xw(t);return t&&JSON.stringify(t)!==JSON.stringify(e)&&Se.set(Ke.TOOLS,e),{...za,...e}}function yr(t){return pr()[t]||null}function fn(t,e){if(!t||!e)return!1;let r=Se.get(Ke.TOOLS)||{},s=!r[t]&&!za[t],n=Ps({...r[t]||{},...e,id:t,metadata:{...r[t]?.metadata||{},...e.metadata||{},createdAt:r[t]?.metadata?.createdAt||e?.metadata?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString()}});return r[t]=n,Se.set(Ke.TOOLS,r),W.emit(s?j.TOOL_REGISTERED:j.TOOL_UPDATED,{toolId:t,tool:n}),!0}function gn(t){let e=Se.get(Ke.TOOLS)||{};return!e[t]&&!za[t]||za[t]?!1:(delete e[t],Se.set(Ke.TOOLS,e),W.emit(j.TOOL_UNREGISTERED,{toolId:t}),!0)}function Ka(){return Se.get(Ke.PRESETS)||{}}function py(t,e){if(!t||!e)return!1;let r=Ka(),s=!r[t];return r[t]={...e,name:t,updatedAt:new Date().toISOString()},Se.set(Ke.PRESETS,r),W.emit(s?j.PRESET_CREATED:j.PRESET_UPDATED,{type:"tool",presetName:t,preset:r[t]}),!0}function yy(t){let e=Ka();return e[t]?(delete e[t],Se.set(Ke.PRESETS,e),W.emit(j.PRESET_DELETED,{type:"tool",presetName:t}),!0):!1}function fy(){return Se.get(Ke.CURRENT_PRESET)||""}function gy(t){return Se.set(Ke.CURRENT_PRESET,t||""),W.emit(j.PRESET_ACTIVATED,{type:"tool",presetName:t}),!0}function Ua(t,e){let r=yr(t);if(!r)return!1;let s=Se.get(Ke.TOOLS)||{};return s[t]=Ps({...r,id:t,enabled:e,metadata:{...r?.metadata||{},createdAt:r?.metadata?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString()}}),Se.set(Ke.TOOLS,s),W.emit(e?j.TOOL_ENABLED:j.TOOL_DISABLED,{toolId:t,enabled:e}),!0}function mn(){let t=Se.get(Ke.TOOLS)||{},e=Se.get(Ke.PRESETS)||{};return JSON.stringify({version:"1.0.0",exportedAt:new Date().toISOString(),tools:t,presets:e},null,2)}function hn(t,e=!1){try{let r=typeof e=="object"?!!e?.overwrite:!!e,s=JSON.parse(t);if(!s||typeof s!="object")return{success:!1,toolsImported:0,presetsImported:0,message:"\u65E0\u6548\u7684JSON\u683C\u5F0F"};let n=r?{}:Se.get(Ke.TOOLS)||{},o=r?{}:Se.get(Ke.PRESETS)||{},a=0,i=0;if(s.tools&&typeof s.tools=="object"){for(let[l,c]of Object.entries(s.tools))!c||typeof c!="object"||(n[l]=Ps({...c,id:l}),a+=1);Se.set(Ke.TOOLS,n)}if(s.presets&&typeof s.presets=="object"){for(let[l,c]of Object.entries(s.presets))!c||typeof c!="object"||(o[l]={...c,name:l,updatedAt:new Date().toISOString()},i+=1);Se.set(Ke.PRESETS,o)}return{success:!0,toolsImported:a,presetsImported:i,message:`\u6210\u529F\u5BFC\u5165 ${a} \u4E2A\u5DE5\u5177\u548C ${i} \u4E2A\u9884\u8BBE`}}catch(r){return log.error("\u5DE5\u5177\u5BFC\u5165\u5931\u8D25",{error:r}),{success:!1,toolsImported:0,presetsImported:0,message:`\u5BFC\u5165\u5931\u8D25: ${r.message}`}}}function bn(){Se.remove(Ke.TOOLS),Se.remove(Ke.PRESETS),Se.remove(Ke.CURRENT_PRESET)}var Ht,za,Ke,Tw,_o=N(()=>{He();ot();Ht={id:"",name:"",description:"",icon:"fa-screwdriver-wrench",order:100,category:"utility",promptTemplate:"",extractTags:[],config:{execution:{timeout:6e4,retries:3},api:{preset:"",useBypass:!1,bypassPreset:""},messages:[],context:{depth:3,includeTags:[],excludeTags:[]},automation:{settleMs:1200,cooldownMs:5e3},worldbooks:{enabled:!1,selected:[]}},enabled:!0,metadata:{createdAt:null,updatedAt:null,author:"",version:"1.0.0"}},za={},Ke={TOOLS:"tools",PRESETS:"tool_presets",CURRENT_PRESET:"current_tool_preset"};Tw={getAllTools:pr,getTool:yr,saveTool:fn,deleteTool:gn,setToolEnabled:Ua,exportTools:mn,importTools:hn,resetTools:bn,getToolPresets:Ka,saveToolPreset:py,deleteToolPreset:yy,getCurrentToolPreset:fy,setCurrentToolPreset:gy,createDefaultToolDefinition:Ps,normalizeToolDefinitionToRuntimeConfig:So}});var pc={};le(pc,{TOOL_CATEGORIES:()=>hy,TOOL_REGISTRY:()=>xn,appendToolRuntimeHistory:()=>ky,clearToolApiPreset:()=>Ey,default:()=>Rw,ensureToolRuntimeConfig:()=>wn,getAllDefaultToolConfigs:()=>My,getAllToolApiBindings:()=>Cy,getAllToolFullConfigs:()=>Co,getEnabledTools:()=>Py,getToolApiPreset:()=>dc,getToolBaseConfig:()=>ja,getToolConfig:()=>Eo,getToolFullConfig:()=>de,getToolList:()=>Ty,getToolSubTabs:()=>Sy,getToolWindowState:()=>$y,hasTool:()=>cc,onPresetDeleted:()=>Iy,patchToolRuntime:()=>qr,registerTool:()=>wy,resetToolConfig:()=>Ry,resetToolRegistry:()=>_y,saveToolConfig:()=>Me,saveToolWindowState:()=>Ny,setToolApiPreset:()=>Ay,setToolApiPresetConfig:()=>Cw,setToolBypassConfig:()=>Iw,setToolOutputMode:()=>Ew,setToolPromptTemplate:()=>kw,unregisterTool:()=>vy,updateToolRuntime:()=>uc});function Ns(t={}){let e=Array.isArray(t?.recentWritebackHistory)?t.recentWritebackHistory.filter(Boolean):[];return{lastRunAt:Number.isFinite(t?.lastRunAt)?t.lastRunAt:0,lastStatus:typeof t?.lastStatus=="string"?t.lastStatus:"idle",lastError:typeof t?.lastError=="string"?t.lastError:"",lastDurationMs:Number.isFinite(t?.lastDurationMs)?t.lastDurationMs:0,successCount:Number.isFinite(t?.successCount)?t.successCount:0,errorCount:Number.isFinite(t?.errorCount)?t.errorCount:0,lastMessageKey:typeof t?.lastMessageKey=="string"?t.lastMessageKey:"",lastExecutionKey:typeof t?.lastExecutionKey=="string"?t.lastExecutionKey:"",lastExecutionPath:typeof t?.lastExecutionPath=="string"?t.lastExecutionPath:"",lastWritebackStatus:typeof t?.lastWritebackStatus=="string"?t.lastWritebackStatus:"",lastFailureStage:typeof t?.lastFailureStage=="string"?t.lastFailureStage:"",lastSlotBindingKey:typeof t?.lastSlotBindingKey=="string"?t.lastSlotBindingKey:"",lastSlotRevisionKey:typeof t?.lastSlotRevisionKey=="string"?t.lastSlotRevisionKey:"",lastSlotTransactionId:typeof t?.lastSlotTransactionId=="string"?t.lastSlotTransactionId:"",lastSourceMessageId:typeof t?.lastSourceMessageId=="string"?t.lastSourceMessageId:"",lastSourceSwipeId:typeof t?.lastSourceSwipeId=="string"?t.lastSourceSwipeId:"",lastContentCommitted:t?.lastContentCommitted===!0,lastHostCommitApplied:t?.lastHostCommitApplied===!0,lastRefreshRequested:t?.lastRefreshRequested===!0,lastRefreshConfirmed:t?.lastRefreshConfirmed===!0,lastPreferredCommitMethod:typeof t?.lastPreferredCommitMethod=="string"?t.lastPreferredCommitMethod:"",lastAppliedCommitMethod:typeof t?.lastAppliedCommitMethod=="string"?t.lastAppliedCommitMethod:"",lastRefreshMethodCount:Number.isFinite(t?.lastRefreshMethodCount)?t.lastRefreshMethodCount:0,lastRefreshMethods:Array.isArray(t?.lastRefreshMethods)?t.lastRefreshMethods.filter(Boolean):[],lastRefreshConfirmChecks:Number.isFinite(t?.lastRefreshConfirmChecks)?t.lastRefreshConfirmChecks:0,lastRefreshConfirmedBy:typeof t?.lastRefreshConfirmedBy=="string"?t.lastRefreshConfirmedBy:"",lastTraceId:typeof t?.lastTraceId=="string"?t.lastTraceId:"",lastAutoRunAt:Number.isFinite(t?.lastAutoRunAt)?t.lastAutoRunAt:0,lastAutoStatus:typeof t?.lastAutoStatus=="string"?t.lastAutoStatus:"idle",lastAutoMessageId:typeof t?.lastAutoMessageId=="string"?t.lastAutoMessageId:"",lastAutoSwipeId:typeof t?.lastAutoSwipeId=="string"?t.lastAutoSwipeId:"",lastAutoRevisionKey:typeof t?.lastAutoRevisionKey=="string"?t.lastAutoRevisionKey:"",lastAutoWritebackStatus:typeof t?.lastAutoWritebackStatus=="string"?t.lastAutoWritebackStatus:"",lastAutoRefreshConfirmed:t?.lastAutoRefreshConfirmed===!0,lastAutoSkipReason:typeof t?.lastAutoSkipReason=="string"?t.lastAutoSkipReason:"",recentWritebackHistory:e}}function Sw(t,e=10){let r=Number.isFinite(e)?Math.max(1,Math.min(50,Math.floor(e))):10;return Array.isArray(t)?t.length<=r?t:t.slice(t.length-r):[]}function by(){let t=pr()||{};return Object.entries(t).filter(([e])=>!Ao[e]).map(([e,r])=>[e,r||{}])}function ac(t={}){return t?.toolKind==="script"?"script":t?.toolKind==="ai"?"ai":t?.output?.mode==="local_transform"||t?.processor?.type?"script":"ai"}function xy(){let t=Array.isArray(xn.tools?.subTabs)?xn.tools.subTabs.map((r,s)=>({...r,order:Number.isFinite(r?.order)?r.order:s,toolKind:ac(r),toolGroupLabel:ac(r)==="script"?"\u811A\u672C\u5DE5\u5177":"AI \u5DE5\u5177"})):[],e=by().map(([r,s],n)=>{let o=So(r,s),a=ac(o);return{id:r,name:o.name||r,icon:o.icon||"fa-screwdriver-wrench",component:"GenericToolConfigPanel",order:Number.isFinite(o.order)?o.order:100+n,isCustom:!0,description:o.description||"",toolKind:a,toolGroupLabel:a==="script"?"\u811A\u672C\u5DE5\u5177":"AI \u5DE5\u5177"}});return[...t,...e].sort((r,s)=>(r.order??0)-(s.order??0))}function _w(t,e={}){let r=So(t,e,{defaultOutputMode:"follow_ai"});return{...r,runtime:Ns(r.runtime)}}function lc(t){let e=Ao[t];if(e)return{...e,output:{...e.output||{}},bypass:{...e.bypass||{}},worldbooks:{...e.worldbooks||{},selected:Array.isArray(e?.worldbooks?.selected)?[...e.worldbooks.selected]:[]},extraction:{...e.extraction||{}},processor:{...e.processor||{},options:{...e?.processor?.options||{}}},runtime:Ns(e.runtime),extractTags:Array.isArray(e.extractTags)?[...e.extractTags]:[]};let s=(pr()||{})[t]||null;return s?_w(t,s):Eo(t)}function ja(t){let e=lc(t);return e?{...e,output:{...e.output||{}},automation:{...e.automation||{}},bypass:{...e.bypass||{}},worldbooks:{...e.worldbooks||{},selected:Array.isArray(e?.worldbooks?.selected)?[...e.worldbooks.selected]:[]},extraction:{...e.extraction||{},selectors:Array.isArray(e?.extraction?.selectors)?[...e.extraction.selectors]:[]},processor:{...e.processor||{},options:{...e?.processor?.options||{}}},runtime:{...e.runtime||{}},extractTags:Array.isArray(e.extractTags)?[...e.extractTags]:[]}:null}function Aw(t,e={},r=""){if(!t)return null;let s={...t,...e,id:t.id||e.id};s.output={...t.output||{},...e.output||{}},s.automation={settleMs:Number.isFinite(e?.automation?.settleMs)?e.automation.settleMs:Number.isFinite(t?.automation?.settleMs)?t.automation.settleMs:1200,cooldownMs:Number.isFinite(e?.automation?.cooldownMs)?e.automation.cooldownMs:Number.isFinite(t?.automation?.cooldownMs)?t.automation.cooldownMs:5e3},s.bypass={...t.bypass||{},...e.bypass||{}},s.worldbooks={...t.worldbooks||{},...e.worldbooks||{},selected:Array.isArray(e?.worldbooks?.selected)?[...e.worldbooks.selected]:Array.isArray(t?.worldbooks?.selected)?[...t.worldbooks.selected]:[]},s.runtime=Ns({...t.runtime||{},...e.runtime||{}}),s.extraction={...t.extraction||{},...e.extraction||{}},s.processor={...t.processor||{},...e.processor||{},options:{...t?.processor?.options||{},...e?.processor?.options||{}}};let n=e?.output?.apiPreset||e?.apiPreset||s.output?.apiPreset||s.apiPreset||r||"";return s.output={...s.output||{},apiPreset:n},s.apiPreset=n,t.isCustom?s.enabled=t.enabled!==!1:typeof e.enabled=="boolean"?s.enabled=e.enabled:s.enabled=t.enabled!==!1,s}function wy(t,e){if(!t||typeof t!="string")return it.error("\u5DE5\u5177ID\u65E0\u6548"),!1;if(!e||typeof e!="object")return it.error("\u5DE5\u5177\u914D\u7F6E\u65E0\u6548"),!1;let r=["name","icon","component"];for(let s of r)if(!e[s])return it.error(` \u5DE5\u5177\u7F3A\u5C11\u5FC5\u9700\u5B57\u6BB5: ${s}`),!1;return fr[t]={id:t,...e,order:e.order??Object.keys(fr).length},it.log(` \u5DE5\u5177\u5DF2\u6CE8\u518C: ${t}`),!0}function vy(t){return fr[t]?(delete fr[t],it.log(` \u5DE5\u5177\u5DF2\u6CE8\u9500: ${t}`),!0):(it.warn(` \u5DE5\u5177\u4E0D\u5B58\u5728: ${t}`),!1)}function Ty(t=!0){let e=Object.values(fr).map(r=>r.id==="tools"?{...r,subTabs:xy()}:r);return t?e.sort((r,s)=>(r.order??0)-(s.order??0)):e}function Eo(t){return t==="tools"&&fr[t]?{...fr[t],subTabs:xy()}:fr[t]||null}function cc(t){return!!fr[t]}function Sy(t){let e=Eo(t);return!e||!e.hasSubTabs?[]:e.subTabs||[]}function _y(){fr={...xn},it.log("\u5DE5\u5177\u6CE8\u518C\u8868\u5DF2\u91CD\u7F6E")}function Ay(t,e){if(!cc(t))return it.warn(` \u5DE5\u5177\u4E0D\u5B58\u5728: ${t}`),!1;let r=z.get(Gt)||{};return r[t]=e||"",z.set(Gt,r),it.log(` \u5DE5\u5177 "${t}" \u7ED1\u5B9A\u5230\u9884\u8BBE "${e||"\u5F53\u524D\u914D\u7F6E"}"`),!0}function dc(t){return(z.get(Gt)||{})[t]||""}function Ey(t){let e=z.get(Gt)||{};delete e[t],z.set(Gt,e),it.log(` \u5DE5\u5177 "${t}" \u7684API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u6E05\u9664`)}function Cy(){return z.get(Gt)||{}}function Iy(t){let e=z.get(Gt)||{},r=!1;for(let s in e)e[s]===t&&(e[s]="",r=!0,it.log(` \u5DE5\u5177 "${s}" \u7684API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u6E05\u9664\uFF08\u9884\u8BBE\u88AB\u5220\u9664\uFF09`));r&&z.set(Gt,e)}function de(t){let e=lc(t);if(!e)return Eo(t);let s=(z.get(Gr)||{})[t]||{},n=dc(t),o=Aw({...e,id:t},s,n);return it.debug(`[PRESET] getToolFullConfig ${t}`,{base_extraction:JSON.parse(JSON.stringify(e.extraction||{})),base_worldbooks:JSON.parse(JSON.stringify(e.worldbooks||{})),user_extraction:JSON.parse(JSON.stringify(s.extraction||{})),user_worldbooks:JSON.parse(JSON.stringify(s.worldbooks||{})),merged_extraction:JSON.parse(JSON.stringify(o.extraction||{})),merged_worldbooks:JSON.parse(JSON.stringify(o.worldbooks||{}))}),o}function wn(t){if(!t)return!1;let e=lc(t);if(!e)return!1;let r=z.get(Gr)||{};if(r[t])return!0;let s={promptTemplate:e.promptTemplate||"",enabled:e.enabled!==!1,extractTags:Array.isArray(e.extractTags)?[...e.extractTags]:[],apiPreset:e.apiPreset||"",output:{...e.output||{}},automation:{...e.automation||{}},bypass:{...e.bypass||{}},worldbooks:{...e.worldbooks||{},selected:Array.isArray(e?.worldbooks?.selected)?[...e.worldbooks.selected]:[]},extraction:{...e.extraction||{},selectors:Array.isArray(e?.extraction?.selectors)?[...e.extraction.selectors]:[]},processor:{...e.processor||{},options:{...e?.processor?.options||{}}},runtime:{...e.runtime||{}}};r[t]=s,z.set(Gr,r);let n=z.get(Gt)||{};return n[t]=s.output?.apiPreset||s.apiPreset||"",z.set(Gt,n),W.emit(j.TOOL_UPDATED,{toolId:t,config:s}),!0}function Me(t,e,r={}){if(!t||!de(t))return it.warn("\u5DE5\u5177\u4E0D\u5B58\u5728:",t),!1;let{emitEvent:s=!0}=r,n=z.get(Gr)||{},o=z.get(Gt)||{},a=e?.output?.apiPreset??e?.apiPreset??"",i=["promptTemplate","enabled","extractTags","apiPreset","output","automation","bypass","worldbooks","extraction","processor","runtime"];return n[t]={},i.forEach(l=>{if(e[l]!==void 0){if(l==="output"&&e.output){n[t][l]={...e.output,apiPreset:a};return}if(l==="apiPreset"){n[t][l]=a;return}n[t][l]=e[l]}}),n[t].apiPreset===void 0&&(n[t].apiPreset=a),!n[t].output&&e.output!==void 0&&(n[t].output={...e.output||{},apiPreset:a}),z.set(Gr,n),o[t]=a,z.set(Gt,o),it.debug(`[PRESET] saveToolConfig ${t}`,{input_extraction:JSON.parse(JSON.stringify(e.extraction||{})),input_worldbooks:JSON.parse(JSON.stringify(e.worldbooks||{})),saved_extraction:JSON.parse(JSON.stringify(n[t].extraction||{})),saved_worldbooks:JSON.parse(JSON.stringify(n[t].worldbooks||{})),verify_storage:JSON.parse(JSON.stringify((z.get(Gr)||{})[t]?.extraction||{}))}),s&&W.emit(j.TOOL_UPDATED,{toolId:t,config:n[t]}),it.log(` \u5DE5\u5177\u914D\u7F6E\u5DF2\u4FDD\u5B58: ${t}`),!0}function Ew(t,e){let r=de(t);return r?Me(t,{...r,output:{...r.output,mode:e}}):!1}function Cw(t,e){let r=de(t);return r?Me(t,{...r,apiPreset:e,output:{...r.output,apiPreset:e}}):!1}function Iw(t,e){let r=de(t);return r?Me(t,{...r,bypass:{...r.bypass,...e}}):!1}function kw(t,e){let r=de(t);return r?Me(t,{...r,promptTemplate:e}):!1}function qr(t,e,r={}){let s=de(t);if(!s)return!1;let{touchLastRunAt:n=!1,emitEvent:o=!1,emitRuntimeEvent:a=!0}=r,i=Ns({...s.runtime||{},...e||{}});n&&(i.lastRunAt=Date.now());let l=Me(t,{...s,runtime:i},{emitEvent:o});return l&&a&&W.emit(j.TOOL_RUNTIME_UPDATED,{toolId:t,runtime:i,previousRuntime:Ns(s.runtime||{})}),l}function ky(t,e,r={},s={}){let n=de(t);if(!n)return!1;let{limit:o=10,emitEvent:a=!1,emitRuntimeEvent:i=!0}=s,l=Ns(n.runtime||{}),c=Ns(n.runtime||{}),d="recentWritebackHistory",u={id:r?.id||`hist_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,at:r?.at||Date.now(),...r};l[d]=Sw([...Array.isArray(l[d])?l[d]:[],u],o),u?.traceId&&(l.lastTraceId=u.traceId);let y=Me(t,{...n,runtime:l},{emitEvent:a});return y&&i&&W.emit(j.TOOL_RUNTIME_UPDATED,{toolId:t,runtime:l,previousRuntime:c,historyType:e,historyEntry:u}),y}function uc(t,e,r={}){let{touchLastRunAt:s=!0,emitEvent:n=!1,emitRuntimeEvent:o=!0}=r;return qr(t,e,{touchLastRunAt:s,emitEvent:n,emitRuntimeEvent:o})}function Ry(t){if(!t||!Ao[t])return it.warn("\u5DE5\u5177\u4E0D\u5B58\u5728:",t),!1;let e=z.get(Gr)||{};return delete e[t],z.set(Gr,e),W.emit(j.TOOL_UPDATED,{toolId:t,config:null}),it.log(` \u5DE5\u5177\u914D\u7F6E\u5DF2\u91CD\u7F6E: ${t}`),!0}function My(){return{...Ao}}function Co(){let t=new Set([...Object.keys(Ao),...by().map(([e])=>e)]);return Array.from(t).map(e=>de(e)).filter(Boolean)}function Py(){return Co().filter(t=>t&&t.enabled)}function Ny(t,e){let r=z.get(ic)||{};r[t]={...e,updatedAt:Date.now()},z.set(ic,r)}function $y(t){return(z.get(ic)||{})[t]||null}var it,Gr,Gt,ic,Ao,xn,hy,fr,Rw,gr=N(()=>{He();ot();H();_o();it=C.createScope("ToolRegistry"),Gr="tool_configs",Gt="tool_api_bindings",ic="tool_window_states";Ao={summaryTool:{id:"summaryTool",name:"\u6458\u8981\u5DE5\u5177",icon:"fa-file-lines",description:"\u751F\u6210\u5267\u60C5\u6458\u8981\u5757",enabled:!0,order:3,bypass:{enabled:!1,presetId:""},output:{mode:"follow_ai",apiPreset:"",overwrite:!0,enabled:!0},automation:{settleMs:1200,cooldownMs:5e3},worldbooks:{enabled:!1,selected:[]},extraction:{enabled:!0,maxMessages:5,regexPresetId:"builtin_regex_summary"},promptTemplate:`\u8BF7\u6839\u636E\u4EE5\u4E0BAI\u56DE\u590D\u751F\u6210\u6458\u8981\u5757\uFF1A

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
</youyou>`,runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},apiPreset:"",extractTags:[]},escapeTransformTool:{id:"escapeTransformTool",name:"\u8F6C\u4E49\u5904\u7406",icon:"fa-quote-left",description:"\u5BF9\u63D0\u53D6\u5185\u5BB9\u6267\u884C\u672C\u5730\u8F6C\u4E49\u6216\u53BB\u8F6C\u4E49",enabled:!0,order:6,output:{mode:"local_transform",apiPreset:"",overwrite:!0,enabled:!0,autoTrigger:!0},extraction:{enabled:!0,maxMessages:5,selectors:[]},processor:{type:"escape_transform",direction:"escape",options:{doubleQuote:!0,singleQuote:!1,newline:!1}},runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},extractTags:[]},punctuationTransformTool:{id:"punctuationTransformTool",name:"\u4E2D\u6587\u6807\u70B9\u66FF\u6362",icon:"fa-language",description:"\u5C06\u82F1\u6587\u6807\u70B9\u6309\u52FE\u9009\u9879\u66FF\u6362\u4E3A\u4E2D\u6587\u6807\u70B9",enabled:!0,order:7,output:{mode:"local_transform",apiPreset:"",overwrite:!0,enabled:!0,autoTrigger:!0},extraction:{enabled:!0,maxMessages:5,selectors:[]},processor:{type:"punctuation_transform",direction:"en_to_zh",options:{comma:!0,period:!0,exclamation:!0,question:!0,semicolon:!1,colon:!1,leftParen:!1,rightParen:!1}},runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},extractTags:[]}},xn={presetManagement:{id:"presetManagement",name:"\u9884\u8BBE\u7BA1\u7406",icon:"fa-bookmark",hasSubTabs:!0,description:"\u7EDF\u4E00\u7BA1\u7406 API / \u6B63\u5219 / \u4E16\u754C\u4E66 / \u8868\u683C\u6A21\u677F\u9884\u8BBE",order:0,subTabs:[{id:"apiPresets",name:"API \u9884\u8BBE",icon:"fa-database",component:"ApiPresetPanel",presetKind:"api"},{id:"regexPresets",name:"\u6B63\u5219\u63D0\u53D6",icon:"fa-filter",component:"RegexExtractPanel",presetKind:"regex"},{id:"worldbookPresets",name:"\u4E16\u754C\u4E66",icon:"fa-book-atlas",component:"WorldbookPresetPanel",presetKind:"worldbook"},{id:"tableTemplates",name:"\u8868\u683C\u6A21\u677F",icon:"fa-table-list",component:"TableTemplatePanel",presetKind:"table"}]},tools:{id:"tools",name:"\u5DE5\u5177",icon:"fa-tools",hasSubTabs:!0,description:"\u5DE5\u5177\u96C6\u5408",order:4,subTabs:[{id:"summaryTool",name:"\u6458\u8981\u5DE5\u5177",icon:"fa-file-lines",component:"SummaryToolPanel",toolKind:"ai"},{id:"statusBlock",name:"\u4E3B\u89D2\u72B6\u6001\u680F",icon:"fa-user-check",component:"StatusBlockPanel",toolKind:"ai"},{id:"youyouReview",name:"\u5C0F\u5E7D\u70B9\u8BC4",icon:"fa-comment-dots",component:"YouyouReviewPanel",toolKind:"ai"},{id:"escapeTransformTool",name:"\u8F6C\u4E49\u5904\u7406",icon:"fa-quote-left",component:"EscapeTransformToolPanel",toolKind:"script"},{id:"punctuationTransformTool",name:"\u4E2D\u6587\u6807\u70B9\u66FF\u6362",icon:"fa-language",component:"PunctuationTransformToolPanel",toolKind:"script"}]},tableWorkbench:{id:"tableWorkbench",name:"\u586B\u8868\u5DE5\u4F5C\u53F0",icon:"fa-table-cells",hasSubTabs:!1,description:"\u7ED3\u6784\u5316\u586B\u8868\u4E0E\u72B6\u6001\u9884\u89C8\u5DE5\u4F5C\u53F0",component:"TableWorkbenchPanel",order:5},bypass:{id:"bypass",name:"Ai\u6307\u4EE4\u9884\u8BBE",icon:"fa-shield-halved",hasSubTabs:!1,description:"\u7BA1\u7406 Ai \u6307\u4EE4\u9884\u8BBE",component:"BypassPanel",order:6},settings:{id:"settings",name:"\u8BBE\u7F6E",icon:"fa-cog",hasSubTabs:!1,description:"\u5168\u5C40\u8BBE\u7F6E",component:"SettingsPanel",order:7},logger:{id:"logger",name:"\u65E5\u5FD7",icon:"fa-terminal",hasSubTabs:!1,description:"\u67E5\u770B\u63D2\u4EF6\u8FD0\u884C\u65E5\u5FD7\uFF0C\u652F\u6301\u8FC7\u6EE4\u4E0E\u5BFC\u51FA",component:"LoggerPanel",order:8}},hy={api:{name:"API\u5DE5\u5177",icon:"fa-plug",order:0},prompt:{name:"\u63D0\u793A\u8BCD\u5DE5\u5177",icon:"fa-file-alt",order:1},utility:{name:"\u5B9E\u7528\u5DE5\u5177",icon:"fa-wrench",order:2}},fr={...xn};Rw={TOOL_REGISTRY:xn,TOOL_CATEGORIES:hy,registerTool:wy,unregisterTool:vy,getToolList:Ty,getToolConfig:Eo,hasTool:cc,getToolSubTabs:Sy,resetToolRegistry:_y,setToolApiPreset:Ay,getToolApiPreset:dc,clearToolApiPreset:Ey,getAllToolApiBindings:Cy,onPresetDeleted:Iy,saveToolWindowState:Ny,getToolWindowState:$y,getToolBaseConfig:ja,ensureToolRuntimeConfig:wn,getToolFullConfig:de,patchToolRuntime:qr,appendToolRuntimeHistory:ky,saveToolConfig:Me,resetToolConfig:Ry,getAllDefaultToolConfigs:My,getAllToolFullConfigs:Co,getEnabledTools:Py}});function Ha(){return`rgx_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`}function By(){return`r_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,6)}`}function gc(t={}){let e=Object.values(rr).includes(t.type)?t.type:rr.INCLUDE;return{id:String(t.id||By()),name:String(t.name||"").trim(),description:String(t.description||""),type:e,value:String(t.value||""),enabled:t.enabled!==!1}}function mr(t={}){return{id:String(t.id||Ha()),name:String(t.name||"").trim()||"\u672A\u547D\u540D\u9884\u8BBE",description:String(t.description||""),rules:Array.isArray(t.rules)?t.rules.map(gc):[],blacklist:Array.isArray(t.blacklist)?t.blacklist.map(e=>String(e||"").trim()).filter(Boolean):[],createdAt:Number.isFinite(t.createdAt)?t.createdAt:Date.now(),updatedAt:Number.isFinite(t.updatedAt)?t.updatedAt:Date.now()}}function Er(){let t=Re.get(fc);return!t||typeof t!="object"?{}:t}function Io(t){Re.set(fc,t)}function $s(t){return typeof t=="string"&&t.startsWith(Mw)}function zy(t){return $s(t)&&Fa.find(e=>e.id===t)||null}function mc(t){if(!Array.isArray(t)){Fa=[];return}Fa=t.map(e=>mr({...e,id:String(e?.id||"")})).filter(e=>$s(e.id))}function Tn(){if(Ly)return;Ly=!0;let t=z.get(Oy)||{};if(t[Dy]===!0)return;let e=Er(),r=Object.keys(e).length>0,s=0,n={...e},o=t.tagRulePresets||{};for(let a of Object.values(o)){let i=mr({id:Ha(),name:a.name||"\u5DF2\u8FC1\u79FB\u9884\u8BBE",description:a.description||"",rules:a.rules||[],blacklist:a.blacklist||[],createdAt:typeof a.createdAt=="string"&&Date.parse(a.createdAt)||Date.now(),updatedAt:Date.now()});n[i.id]=i,s+=1}if(!r&&s===0){let a=Array.isArray(t.tagRules)?t.tagRules:[],i=Array.isArray(t.contentBlacklist)?t.contentBlacklist:[];if(a.length||i.length){let l=mr({name:"\u9ED8\u8BA4\u89C4\u5219\u96C6\uFF08\u8FC1\u79FB\uFF09",description:"\u4ECE\u8001\u7248\u672C\u7684\u5F53\u524D\u89C4\u5219\u8FC1\u79FB\u800C\u6765",rules:a,blacklist:i});n[l.id]=l,Re.set(vn,l.id),s+=1}}s>0&&(Io(n),Yr.info(`\u5DF2\u4ECE\u8001\u6570\u636E\u8FC1\u79FB ${s} \u4E2A\u6B63\u5219\u9884\u8BBE`)),z.set(Oy,{...t,[Dy]:!0})}function Pw(){Tn();let t=Er(),e=new Set,r=[];for(let n of Fa){let o=t[n.id];o?(r.push(mr(o)),e.add(n.id)):r.push(n)}let s=Object.values(t).map(mr).filter(n=>!e.has(n.id)).sort((n,o)=>o.updatedAt-n.updatedAt);return r.push(...s),r}function Cr(t){if(!t)return null;Tn();let e=Er();return e[t]?mr(e[t]):$s(t)?zy(t):null}function Ga(){Tn();let t=Re.get(vn);return typeof t=="string"&&t?t:""}function Ky(){let t=Ga();return t?Cr(t):null}function Nw(t){if(t&&$s(t))return Re.set(vn,t),Wa(),W.emit(j.PRESET_ACTIVATED,{kind:"regex",id:t}),!0;let e=Er();return t&&!e[t]?(Yr.warn(`setCurrentPresetId \u627E\u4E0D\u5230\u9884\u8BBE: ${t}`),!1):(Re.set(vn,t||""),Wa(),W.emit(j.PRESET_ACTIVATED,{kind:"regex",id:t}),!0)}function qa(t={}){Tn();let e=mr({...t,id:Ha(),createdAt:Date.now(),updatedAt:Date.now()}),r=Er();return r[e.id]=e,Io(r),W.emit(j.PRESET_CREATED,{kind:"regex",id:e.id}),Yr.info(`\u521B\u5EFA\u9884\u8BBE: ${e.id} (${e.name})`),e}function Os(t,e={}){if(!t)return null;let r=Er(),s=r[t];if(!s&&$s(t)&&(s=zy(t)),!s)return null;let n=mr({...s,...e,id:t,createdAt:s.createdAt,updatedAt:Date.now()});return r[t]=n,Io(r),Ga()===t&&yc(n),W.emit(j.PRESET_UPDATED,{kind:"regex",id:t}),n}function $w(t){if(!t)return!1;if($s(t))return Yr.warn(`\u62D2\u7EDD\u5220\u9664\u5185\u7F6E\u9884\u8BBE: ${t}`),!1;let e=Er();return e[t]?(delete e[t],Io(e),Ga()===t&&(Re.set(vn,""),Wa()),W.emit(j.PRESET_DELETED,{kind:"regex",id:t}),Yr.info(`\u5220\u9664\u9884\u8BBE: ${t}`),!0):!1}function Ow(t,{nameSuffix:e=" \u526F\u672C"}={}){let r=Cr(t);return r?qa({...r,id:void 0,name:`${r.name}${e}`}):null}function Dw(t,e){return $s(t)?(Yr.warn(`\u62D2\u7EDD\u91CD\u547D\u540D\u5185\u7F6E\u9884\u8BBE: ${t}`),null):Os(t,{name:String(e||"").trim()||"\u672A\u547D\u540D\u9884\u8BBE"})}function Lw(t,e={}){let r=Cr(t);if(!r)return null;let s=gc({...e,id:By()}),n=[...r.rules,s];return Os(t,{rules:n})}function Bw(t,e,r={}){let s=Cr(t);if(!s)return null;let n=s.rules.map(o=>o.id===e?gc({...o,...r,id:o.id}):o);return Os(t,{rules:n})}function zw(t,e){let r=Cr(t);if(!r)return null;let s=r.rules.filter(n=>n.id!==e);return Os(t,{rules:s})}function Kw(t,e,r){let s=Cr(t);if(!s)return null;let n=s.rules.findIndex(i=>i.id===e);if(n<0)return null;let o=r==="up"?n-1:n+1;if(o<0||o>=s.rules.length)return null;let a=[...s.rules];return[a[n],a[o]]=[a[o],a[n]],Os(t,{rules:a})}function Uw(t,e){let r=Array.isArray(e)?e.map(s=>String(s||"").trim()).filter(Boolean):[];return Os(t,{blacklist:Array.from(new Set(r))})}function jw(){return Tn(),{version:1,exportedAt:Date.now(),presets:Object.values(Er()).map(mr)}}function Fw(t){if(Tn(),!t||typeof t!="object")return{added:0};let e=Array.isArray(t.presets)?t.presets:[],r=Er(),s=0;for(let n of e){let o=mr({...n,id:Ha(),createdAt:Date.now(),updatedAt:Date.now()});r[o.id]=o,s+=1}return s>0&&(Io(r),W.emit(j.PRESET_IMPORTED,{kind:"regex",count:s})),{added:s}}function Ww(){Re.set(fc,{}),Re.set(vn,""),Wa(),Yr.info("\u5DF2\u6E05\u7A7A\u6240\u6709\u6B63\u5219\u9884\u8BBE")}async function yc(t){if(t)try{let e=await Promise.resolve().then(()=>(yn(),nc));typeof e.setCurrentRules=="function"&&e.setCurrentRules(JSON.parse(JSON.stringify(t.rules||[]))),typeof e.setContentBlacklist=="function"&&e.setContentBlacklist(JSON.parse(JSON.stringify(t.blacklist||[])))}catch(e){Yr.warn("\u540C\u6B65\u5230 regex-extractor \u5931\u8D25",{error:e})}}function Wa(){let t=Ky();return yc(t||{rules:[],blacklist:[]})}async function Hw(t){if(!t)return[];try{let e=await Promise.resolve().then(()=>(gr(),pc));return(typeof e.getToolList=="function"?e.getToolList(!1):[]).filter(s=>(typeof e.getToolFullConfig=="function"?e.getToolFullConfig(s.id):null)?.extraction?.regexPresetId===t).map(s=>s.id)}catch{return[]}}var Yr,fc,vn,Oy,Dy,rr,Mw,Fa,Ly,Ee,Vr=N(()=>{He();ot();H();Yr=C.createScope("RegexPresetStore"),fc="regex_presets",vn="regex_current_preset",Oy="settings",Dy="regex_presets_migrated",rr=Object.freeze({INCLUDE:"include",EXCLUDE:"exclude",REGEX_INCLUDE:"regex_include",REGEX_EXCLUDE:"regex_exclude"});Mw="builtin_regex_",Fa=[];Ly=!1;Ee={listPresets:Pw,getPreset:Cr,getCurrentPresetId:Ga,getCurrentPreset:Ky,setCurrentPresetId:Nw,createPreset:qa,updatePreset:Os,deletePreset:$w,duplicatePreset:Ow,renamePreset:Dw,addRule:Lw,updateRule:Bw,deleteRule:zw,moveRule:Kw,setBlacklist:Uw,exportAll:jw,importPresets:Fw,resetAll:Ww,findLinkedTools:Hw,RULE_TYPES:rr}});var Wy={};le(Wy,{RegexExtractPanel:()=>Fy,default:()=>Qw});function qw(t,e,r,s,n,o){let a=f("div",{style:{display:"grid",gridTemplateColumns:"auto auto minmax(140px, 1fr) 200px minmax(120px, 2fr) auto",gap:"10px",alignItems:"center",padding:"10px 0",borderTop:r===0?"none":"1px solid var(--yyt-border)",opacity:e.enabled===!1?"0.55":"1"},attrs:{draggable:o?null:"true","data-rule-id":e.id}}),i=f("div",{style:{cursor:o?"default":"grab",padding:"4px",color:"var(--yyt-text-muted)",fontSize:"14px",userSelect:"none"},text:"\u22EE\u22EE",title:o?"\u5185\u7F6E\u9884\u8BBE\u4E0D\u53EF\u91CD\u6392":"\u62D6\u52A8\u6392\u5E8F"});a.appendChild(i);let l=f("div",{style:{display:"flex",flexDirection:"column",gap:"2px"}}),c=q({label:"\u25B2",size:"small",variant:"ghost",title:"\u4E0A\u79FB",disabled:o||r===0,style:{padding:"0 6px",minHeight:"auto",fontSize:"9px"},onClick:()=>{Ee.moveRule(t.id,e.id,"up"),n()}}),d=q({label:"\u25BC",size:"small",variant:"ghost",title:"\u4E0B\u79FB",disabled:o||r===s-1,style:{padding:"0 6px",minHeight:"auto",fontSize:"9px"},onClick:()=>{Ee.moveRule(t.id,e.id,"down"),n()}});l.appendChild(c.el),l.appendChild(d.el),a.appendChild(l);let u=f("div",{style:{display:"flex",flexDirection:"column",gap:"2px",minWidth:"0"}}),y=ge({value:e.name||"",placeholder:"\u89C4\u5219\u540D\uFF08\u53EF\u9009\uFF09",disabled:o,style:{fontSize:"12px",padding:"6px 10px"},onChange:v=>Ee.updateRule(t.id,e.id,{name:v})});u.appendChild(y.el),e.description&&u.appendChild(f("div",{text:e.description,style:{fontSize:"10px",color:"var(--yyt-text-muted)"}})),a.appendChild(u);let p=_e({value:e.type,disabled:o,options:Gw,style:{fontSize:"11px",padding:"6px 10px"},onChange:v=>{Ee.updateRule(t.id,e.id,{type:v}),n()}});a.appendChild(p.el);let g=e.type===rr.REGEX_INCLUDE||e.type===rr.REGEX_EXCLUDE,m=ge({value:e.value||"",placeholder:g?"\u6B63\u5219\u8868\u8FBE\u5F0F...":"\u6807\u7B7E\u540D\uFF08\u5982 content\uFF09",disabled:o,style:{fontSize:"12px",padding:"6px 10px",fontFamily:"ui-monospace, monospace"},onChange:v=>Ee.updateRule(t.id,e.id,{value:v})});a.appendChild(m.el);let h=f("div",{style:{display:"flex",gap:"6px",alignItems:"center"}}),x=Ye({checked:e.enabled!==!1,disabled:o,style:{padding:"0",border:"none",background:"transparent"},onChange:v=>{Ee.updateRule(t.id,e.id,{enabled:v}),n()}});return h.appendChild(x.el),o||h.appendChild(q({label:"\xD7",size:"small",variant:"ghost",title:"\u5220\u9664\u89C4\u5219",onClick:()=>{Ee.deleteRule(t.id,e.id),n()}}).el),a.appendChild(h),a}function Yw(t,e,r){let s=null;t.addEventListener("dragstart",n=>{let o=n.target;if(!(o instanceof HTMLElement))return;let a=o.closest("[data-rule-id]");if(a){s=a.getAttribute("data-rule-id"),a.style.opacity="0.4";try{n.dataTransfer.effectAllowed="move",n.dataTransfer.setData("text/plain",s)}catch{}}}),t.addEventListener("dragend",n=>{let o=n.target;o instanceof HTMLElement&&(o.style.opacity=""),s=null}),t.addEventListener("dragover",n=>{if(s){n.preventDefault();try{n.dataTransfer.dropEffect="move"}catch{}}}),t.addEventListener("drop",n=>{if(n.preventDefault(),!s)return;let o=n.target instanceof HTMLElement?n.target.closest("[data-rule-id]"):null;if(!o)return;let a=o.getAttribute("data-rule-id");if(!a||a===s)return;let i=Ee.getPreset(e.id);if(!i)return;let l=i.rules.findIndex(y=>y.id===s),c=i.rules.findIndex(y=>y.id===a);if(l<0||c<0)return;let d=[...i.rules],[u]=d.splice(l,1);d.splice(c,0,u),Ee.updatePreset(e.id,{rules:d}),r()})}function Vw(t,{onChange:e,readonly:r,refresh:s}){let n=f("div",{style:{display:"flex",flexDirection:"column",gap:"14px"}});G(n,$t({label:"\u63CF\u8FF0",control:ge({value:t.description,placeholder:"\u53EF\u9009 \u2014 \u5907\u6CE8\u7528\u9014",disabled:r,onChange:i=>e({description:i})})}));let o=f("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"6px"}},f("div",{text:"\u63D0\u53D6\u89C4\u5219\uFF08\u6309\u987A\u5E8F\u5E94\u7528\uFF09",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}}),r?f("span",{text:"\u5185\u7F6E\u9884\u8BBE\u53EA\u8BFB",style:{fontSize:"11px",color:"var(--yyt-text-muted)"}}):q({label:"+ \u65B0\u589E\u89C4\u5219",size:"small",onClick:()=>{Ee.addRule(t.id,{type:rr.INCLUDE,value:"",enabled:!0}),s&&s()}}).el);G(n,o);let a=f("div");if(t.rules.length){for(let i=0;i<t.rules.length;i++)a.appendChild(qw(t,t.rules[i],i,t.rules.length,s,r));r||Yw(a,t,s)}else a.appendChild(f("div",{style:{padding:"14px 0",color:"var(--yyt-text-muted)",fontSize:"12px"},text:'\u5C1A\u65E0\u89C4\u5219\u3002\u70B9\u51FB\u53F3\u4E0A\u89D2"+ \u65B0\u589E\u89C4\u5219"\u5F00\u59CB\u6DFB\u52A0\u3002'}));if(G(n,a),G(n,f("div",{text:"\u5185\u5BB9\u9ED1\u540D\u5355",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)",marginTop:"6px",marginBottom:"4px"}})),G(n,f("div",{text:"\u63D0\u53D6\u51FA\u7684\u5185\u5BB9\u5757\u82E5\u5305\u542B\u4EFB\u4E00\u5173\u952E\u8BCD\u5219\u8DF3\u8FC7\u8BE5\u5757\uFF08\u4E0D\u533A\u5206\u5927\u5C0F\u5199\uFF09\u3002",style:{fontSize:"11px",color:"var(--yyt-text-muted)",marginBottom:"6px"}})),r)G(n,f("div",{style:{fontSize:"12px",color:"var(--yyt-text-muted)"},text:t.blacklist.length?t.blacklist.join("\u3001"):"\uFF08\u7A7A\uFF09"}));else{let i=zl({values:t.blacklist,placeholder:"\u8F93\u5165\u5173\u952E\u8BCD\u56DE\u8F66\u6DFB\u52A0",chipVariant:"danger",onChange:l=>Ee.setBlacklist(t.id,l)});G(n,i.el)}return n}function Jw(t){if(!t)return null;let e=f("div",{style:{display:"flex",flexDirection:"column",gap:"8px"}});G(e,f("div",{text:"\u6D4B\u8BD5\u63D0\u53D6",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}}));let r=jy.get(t.id)||{input:"",output:""};jy.set(t.id,r);let s=f("textarea",{className:"yyt-textarea",attrs:{rows:"5",placeholder:"\u7C98\u8D34\u6D4B\u8BD5\u6587\u672C\uFF08\u5982 AI \u56DE\u590D\u539F\u6587\uFF09..."},style:{width:"100%",resize:"vertical",fontFamily:"ui-monospace, monospace",fontSize:"12px"}});s.value=r.input,s.addEventListener("input",()=>{r.input=s.value}),G(e,s);let n=f("div",{style:{padding:"10px",background:"var(--yyt-bg-base)",border:"1px solid var(--yyt-border)",borderRadius:"var(--yyt-radius-sm)",fontFamily:"ui-monospace, monospace",fontSize:"11px",lineHeight:"1.6",color:"var(--yyt-text-muted)",maxHeight:"200px",overflowY:"auto",whiteSpace:"pre-wrap",wordBreak:"break-all",minHeight:"50px"}});n.textContent=r.output||'// \u70B9\u51FB"\u8FD0\u884C\u6D4B\u8BD5"\u770B\u63D0\u53D6\u7ED3\u679C';let o=q({label:"\u25B6 \u8FD0\u884C\u6D4B\u8BD5",size:"small",variant:"primary",onClick:()=>{let a=s.value;if(!a.trim()){r.output="// \u6D4B\u8BD5\u8F93\u5165\u4E3A\u7A7A",n.textContent=r.output,n.style.color="var(--yyt-text-muted)";return}try{let i=Ar(a,t.rules||[],t.blacklist||[]);r.output=i||"// \u6CA1\u6709\u63D0\u53D6\u5230\u5185\u5BB9",n.textContent=r.output,n.style.color=i?"var(--yyt-text)":"var(--yyt-text-muted)"}catch(i){r.output=`// \u6D4B\u8BD5\u51FA\u9519\uFF1A${i?.message||i}`,n.textContent=r.output,n.style.color="var(--yyt-danger, #f87171)"}}});return G(e,o.el),G(e,n),e}function Xw(t){let e=t.rules.filter(r=>r.enabled!==!1).length;return[`${t.rules.length} \u89C4\u5219\uFF08${e} \u542F\u7528\uFF09`,`${t.blacklist.length} \u9ED1\u540D\u5355`]}var OC,Gw,jy,Fy,Qw,Hy=N(()=>{tr();Vr();yn();H();ho();OC=C.createScope("RegexExtractPanel"),Gw=[{value:rr.INCLUDE,label:"include \u2014 \u63D0\u53D6\u6807\u7B7E"},{value:rr.EXCLUDE,label:"exclude \u2014 \u6392\u9664\u6807\u7B7E"},{value:rr.REGEX_INCLUDE,label:"regex_include \u2014 \u6B63\u5219\u63D0\u53D6"},{value:rr.REGEX_EXCLUDE,label:"regex_exclude \u2014 \u6B63\u5219\u6392\u9664"}],jy=new Map;Fy=Kr({id:"regexExtractPanel",kind:"regex",panelTitle:"\u6B63\u5219\u63D0\u53D6\u9884\u8BBE",panelHint:"\u7BA1\u7406\u591A\u4E2A\u63D0\u53D6\u89C4\u5219\u96C6\uFF0C\u5DE5\u5177\u914D\u7F6E\u4E2D\u901A\u8FC7\u9884\u8BBE ID \u5F15\u7528\u3002\u89C4\u5219\u6309\u987A\u5E8F\u5E94\u7528\uFF0C\u53EF\u62D6\u62FD\u6392\u5E8F\u3002",store:Ee,renderEditor:Vw,renderExtras:Jw,renderListItemMeta:Xw}),Qw=Fy});function ve(t){return t==null?"":String(t).trim()}function Gy(t="table"){let e=ve(t)||"table",r=Date.now().toString(36),s=Math.random().toString(36).slice(2,8);return`${e}_${r}_${s}`}function hc(t="table"){return Gy(t)}function Bs(t="row"){return Gy(t)}function sr(t,e=0){return ve(t)||`table_${Number.isFinite(e)?e+1:1}`}function ko(t,e=0){return ve(t)||`row_${Number.isFinite(e)?e+1:1}`}function oe(t){if(t!==void 0)try{return JSON.parse(JSON.stringify(t))}catch{return t}}function Sn(t={}){return{chatId:ve(t.chatId),sourceMessageId:ve(t.sourceMessageId||t.messageId),sourceSwipeId:ve(t.sourceSwipeId||t.effectiveSwipeId),effectiveSwipeId:ve(t.effectiveSwipeId||t.sourceSwipeId),slotBindingKey:ve(t.slotBindingKey),slotRevisionKey:ve(t.slotRevisionKey),slotTransactionId:ve(t.slotTransactionId),traceId:ve(t.traceId),resolvedAt:Number.isFinite(t.resolvedAt)?t.resolvedAt:Date.now()}}function bc(t={}){return{resolvedAt:Number.isFinite(t.resolvedAt)?t.resolvedAt:Date.now(),runSource:ve(t.runSource)||lt.MANUAL,traceId:ve(t.traceId),chatId:ve(t.chatId),sourceMessageId:ve(t.sourceMessageId||t.messageId),sourceSwipeId:ve(t.sourceSwipeId||t.effectiveSwipeId),effectiveSwipeId:ve(t.effectiveSwipeId||t.sourceSwipeId)||"swipe:current",slotBindingKey:ve(t.slotBindingKey),slotRevisionKey:ve(t.slotRevisionKey),slotTransactionId:ve(t.slotTransactionId),assistantContentFingerprint:ve(t.assistantContentFingerprint),assistantBaseFingerprint:ve(t.assistantBaseFingerprint),assistantText:String(t.assistantText||""),assistantBaseText:String(t.assistantBaseText||""),targetMessageIndex:Number.isFinite(t.targetMessageIndex)?t.targetMessageIndex:-1}}function Ir(t){return!t||typeof t!="object"?null:{chatId:ve(t.chatId),slotBindingKey:ve(t.slotBindingKey),slotRevisionKey:ve(t.slotRevisionKey),sourceMessageId:ve(t.sourceMessageId),sourceSwipeId:ve(t.sourceSwipeId),tables:Array.isArray(t.tables)?oe(t.tables):[],updatedAt:Number.isFinite(t.updatedAt)?t.updatedAt:0,meta:t.meta&&typeof t.meta=="object"?oe(t.meta):{}}}function Ro(t={},e={}){let r=bc(t),s=e.meta&&typeof e.meta=="object"?oe(e.meta):{};return{chatId:r.chatId,slotBindingKey:r.slotBindingKey,slotRevisionKey:r.slotRevisionKey,sourceMessageId:r.sourceMessageId,sourceSwipeId:r.sourceSwipeId||r.effectiveSwipeId,tables:Array.isArray(e.tables)?oe(e.tables):[],updatedAt:Number.isFinite(e.updatedAt)?e.updatedAt:Date.now(),meta:{sourceKind:s.sourceKind||Lt.EMPTY,...s}}}function Ya(t){return!t||typeof t!="object"?{lastResolvedTarget:null,lastCommittedTarget:null,updatedAt:0}:{lastResolvedTarget:t.lastResolvedTarget?Sn(t.lastResolvedTarget):null,lastCommittedTarget:t.lastCommittedTarget?Sn(t.lastCommittedTarget):null,updatedAt:Number.isFinite(t.updatedAt)?t.updatedAt:0}}function Ce(t){if(t==null)return Et;let e=String(t).trim();return e===""?Et:e}function Mo(t,e){let r=ve(t),s=Ce(e);return`${r}::${s}`}function Yy(){return{rows:[],cols:[],cells:[],indexColumn:!1}}function Vy(t,e){return`${Number.isFinite(t)?t:-1}:${Number.isFinite(e)?e:-1}`}var Ds,Jr,lt,vt,Ls,Lt,_n,Zw,Et,Ve,qy,DC,LC,Le=N(()=>{Ds="YouYouToolkit_tableState",Jr="YouYouToolkit_tableBindings",lt=Object.freeze({MANUAL:"MANUAL_TABLE",AUTO:"AUTO_TABLE"}),vt=Object.freeze({ENABLED:"enabled",SELECTED:"selected",CURRENT:"current"}),Ls=Object.freeze({EXACT:"exact",BINDING_FALLBACK:"binding_fallback",HISTORY:"history",TEMPLATE:"template",EMPTY:"empty"}),Lt=Object.freeze({EXACT:"exact",BINDING:"binding",HISTORY:"history",TEMPLATE:"template",EMPTY:"empty"}),_n=Object.freeze({INSERT_ROW:"insertRow",UPDATE_ROW:"updateRow",DELETE_ROW:"deleteRow"}),Zw=Object.freeze({CELL:"cell",ROW:"row",COLUMN:"column",INDEX_COLUMN:"index_column"});Et="";Ve=Object.freeze({INHERIT_GLOBAL:"inherit_global",CHAT_OVERRIDE:"chat_override",PRESET_LINK:"preset_link"}),qy=8,DC=Object.freeze({NOTE:"note",INIT_NODE:"initNode",INSERT_NODE:"insertNode",UPDATE_NODE:"updateNode",DELETE_NODE:"deleteNode"}),LC=Object.freeze({INHERIT_GLOBAL:-1,DISABLED:0})});function Va(t,e=""){return t==null?e:String(t).trim()||e}function ev(t,e=!1){return t==null?e:t===!0}function Ja(t={},e=0){return sr(t?.id||t?.key,e)}function Po(t={},e={}){let r=t&&typeof t=="object"?t:{},s=e&&typeof e=="object"?e:{},n=Va(r.mode||r.runScope||s.mode||s.runScope,vt.ENABLED),o=Array.isArray(r.selectedTableIds)?r.selectedTableIds.map(i=>Va(i,"")).filter(Boolean):Array.isArray(s.selectedTableIds)?s.selectedTableIds.map(i=>Va(i,"")).filter(Boolean):[],a=Va(r.activeTableId||s.activeTableId,"");return{mode:Object.values(vt).includes(n)?n:vt.ENABLED,selectedTableIds:o,activeTableId:a}}function Jy(t={},e=[]){let r=Po(t,t?.scope||{}),s=Array.isArray(e)?e:[],n=s.map((d,u)=>Ja(d,u)),o=new Set(n),a=r.mode,i=!1;a===vt.CURRENT?(!r.activeTableId||!o.has(r.activeTableId))&&(a=vt.ENABLED,i=!0):a===vt.SELECTED&&r.selectedTableIds.filter(u=>o.has(u)).length===0&&(a=vt.ENABLED,i=!0);let l=[];a===vt.CURRENT?l=r.activeTableId?[r.activeTableId]:[]:a===vt.SELECTED?l=r.selectedTableIds.filter(d=>o.has(d)):l=s.map((d,u)=>({table:d,id:Ja(d,u)})).filter(({table:d})=>ev(d?.enabled,!0)).map(({id:d})=>d);let c=new Set(l);return{...r,mode:a,requestedMode:r.mode,staleScope:i,allTableIds:n,allowedTableIds:l,allowedIdSet:c,includes(d={},u=-1){return c.has(Ja(d,u))},filterTables(d=[]){return(Array.isArray(d)?d:[]).filter((y,p)=>c.has(Ja(y,p)))},toJSON(){return{mode:a,requestedMode:r.mode,staleScope:i,selectedTableIds:oe(r.selectedTableIds),activeTableId:r.activeTableId,allowedTableIds:[...l]}}}}var Xa=N(()=>{Le()});function Bt(t,e=""){return t==null?e:String(t).trim()||e}function xc(){let t=globalThis.window||globalThis;return Bt(t?.TavernHelper?.getCurrentChatId?.()||t?.Silvy?.getCurrentChatId?.()||t?.chat_metadata?.chat_id||t?.this_chid||t?.name1,"default_chat")}function tv(t,e=!1){return t===!0}function rv(t={}){let e=t&&typeof t=="object"?t:{};return{enabled:tv(e.enabled,!1),targetBook:Bt(e.targetBook,""),entryComment:Bt(e.entryComment,"YYT-\u586B\u8868\u6570\u636E")}}function wc(t={},e={}){let r=t&&typeof t=="object"?t:{},s=Po(r.scope,{mode:r.runScope||e.runScope||vt.ENABLED,selectedTableIds:r.selectedTableIds||e.selectedTableIds||[],activeTableId:r.activeTableId||e.activeTableId||""});return{chatId:Bt(r.chatId,Bt(e.chatId,xc())),templateId:Bt(r.templateId,Bt(e.templateId,Tt)),enabledTableIds:Array.isArray(r.enabledTableIds)?r.enabledTableIds.map(n=>Bt(n,"")).filter(Boolean):[],focusedTableId:Bt(r.focusedTableId,s.activeTableId),scope:s,worldbookSync:rv(r.worldbookSync),seedNote:Bt(r.seedNote,""),updatedAt:Bt(r.updatedAt,new Date().toISOString())}}function Zy(){let t=Xy.get(Qy,{});return t&&typeof t=="object"&&!Array.isArray(t)?t:{}}function vc(t=xc()){let e=Bt(t,"default_chat"),r=Zy();return wc(r[e],{chatId:e})}function ef(t={},e=xc()){let r=Bt(e,"default_chat"),s=Zy(),n=wc({...s[r],...t||{},chatId:r,updatedAt:new Date().toISOString()},{chatId:r});return Xy.set(Qy,{...s,[r]:n}),{success:!0,guide:n}}function tf(t={},e=null){let r=wc(e||vc(),{templateId:t.activeTemplate,runScope:t.runScope,selectedTableIds:t.scope?.selectedTableIds,activeTableId:t.scope?.activeTableId}),s={...t,activeTemplate:r.templateId||t.activeTemplate,runScope:r.scope.mode,scope:r.scope};return r.worldbookSync&&r.worldbookSync.targetBook&&(s.worldbookSync={...t.worldbookSync||{},...r.worldbookSync}),s}var Xy,Qy,rf=N(()=>{He();qt();Le();Xa();Xy=z.namespace("tableWorkbenchGuides"),Qy="guides"});function se(t,e,r="",s=Za){return{key:t,title:e,description:r,type:s,required:!1}}function Xr({id:t,name:e,note:r,aiInstructions:s,columns:n}){return{id:t,name:e,note:r,enabled:!0,aiInstructions:{init:s?.init||"",create:s?.create||"",update:s?.update||"",delete:s?.delete||""},columns:n,rows:[]}}var Ie,Qa,Tc,sf,sv,Za,nf,Tt,Sc,An,of=N(()=>{Ie=Object.freeze({IDLE:"idle",RUNNING:"running",SUCCESS:"success",ERROR:"error",ABORTED:"aborted",SKIPPED:"skipped"}),Qa=Object.freeze({INCREMENTAL:"incremental",FULL:"full"}),Tc=`\u8BF7\u6839\u636E\u5F53\u524D\u5BF9\u8BDD\u4E0E\u5F53\u524D\u8868\u683C\u57FA\u5E95\uFF0C\u5BF9\u7ED3\u6784\u5316 tables \u6570\u636E\u505A\u589E\u91CF\u66F4\u65B0\u3002

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
{{toolContentMacro}}`,sf=`\u8F93\u51FA\u8981\u6C42 \u2014 \u7528 <tableEdit>...</tableEdit> \u589E\u91CF DSL\uFF1A

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
\u4F46\u5E94\u8BE5\u5C3D\u91CF\u4F18\u5148\u7528 DSL\uFF08\u6D41\u91CF\u5C0F\u3001\u4E0D\u5F71\u54CD\u9501\u5B57\u6BB5\uFF09\u3002`,sv=Object.freeze([{value:"text",label:"\u6587\u672C"},{value:"number",label:"\u6570\u5B57"},{value:"boolean",label:"\u5E03\u5C14"},{value:"date",label:"\u65E5\u671F"},{value:"json",label:"JSON"}]),Za="text",nf=Object.freeze(sv.map(t=>Object.freeze({...t}))),Tt="default_story_state",Sc="\u9ED8\u8BA4\u5267\u60C5\u72B6\u6001\u6A21\u677F";An=Object.freeze([Xr({id:"default_global_state",name:"\u5168\u5C40\u6570\u636E\u8868",note:"\u8BB0\u5F55\u5F53\u524D\u4E3B\u89D2\u6240\u5728\u5730\u70B9\u53CA\u65F6\u95F4\u76F8\u5173\u53C2\u6570\u3002\u6B64\u8868\u901A\u5E38\u6709\u4E14\u4EC5\u6709\u4E00\u884C\u3002",aiInstructions:{init:"\u63D2\u5165\u4E00\u6761\u5173\u4E8E\u5F53\u524D\u4E16\u754C\u72B6\u6001\u7684\u8BB0\u5F55\u3002",create:"\u901A\u5E38\u7981\u6B62\u65B0\u589E\uFF1B\u9664\u975E\u8868\u4E3A\u7A7A\u4E14\u9700\u8981\u521D\u59CB\u5316\u3002",update:"\u5F53\u5730\u70B9\u6216\u65F6\u95F4\u53D1\u751F\u53D8\u5316\u65F6\u66F4\u65B0\u6B64\u8868\uFF1B\u6BCF\u8F6E\u5E94\u6839\u636E\u5267\u60C5\u66F4\u65B0\u65F6\u95F4\u76F8\u5173\u5B57\u6BB5\u3002",delete:"\u7981\u6B62\u5220\u9664\u3002"},columns:[se("location","\u4E3B\u89D2\u5F53\u524D\u6240\u5728\u5730\u70B9","\u4E3B\u89D2\u5F53\u524D\u6240\u5728\u7684\u5177\u4F53\u573A\u666F\u540D\u79F0\u3002"),se("current_time","\u5F53\u524D\u65F6\u95F4","\u6E38\u620F\u4E16\u754C\u7684\u5F53\u524D\u65F6\u95F4\uFF1B\u5982\u5267\u60C5\u6CA1\u6709\u660E\u786E\u65F6\u95F4\uFF0C\u53EF\u6839\u636E\u4E16\u754C\u89C2\u7ED9\u51FA\u5408\u7406\u65F6\u95F4\u3002"),se("previous_scene_time","\u4E0A\u8F6E\u573A\u666F\u65F6\u95F4","\u4E0A\u4E00\u8F6E\u4EA4\u4E92\u7ED3\u675F\u65F6\u7684\u65F6\u95F4\u3002"),se("elapsed_time","\u7ECF\u8FC7\u7684\u65F6\u95F4","\u6839\u636E\u5F53\u524D\u4E0E\u4E0A\u8F6E\u65F6\u95F4\u8BA1\u7B97\u51FA\u7684\u6587\u672C\u63CF\u8FF0\u3002")]}),Xr({id:"default_protagonist_profile",name:"\u4E3B\u89D2\u4FE1\u606F",note:"\u8BB0\u5F55\u4E3B\u89D2\u7684\u6838\u5FC3\u8EAB\u4EFD\u4FE1\u606F\u3002\u6B64\u8868\u901A\u5E38\u6709\u4E14\u4EC5\u6709\u4E00\u884C\u3002",aiInstructions:{init:"\u521D\u59CB\u5316\u65F6\u63D2\u5165\u4E3B\u89D2\u7684\u552F\u4E00\u6761\u76EE\u3002",create:"\u7981\u6B62\u65B0\u589E\u591A\u540D\u4E3B\u89D2\uFF1B\u9664\u975E\u8868\u4E3A\u7A7A\u4E14\u9700\u8981\u521D\u59CB\u5316\u3002",update:"\u5F53\u4E3B\u89D2\u8EAB\u4EFD\u3001\u5916\u8C8C\u3001\u7ECF\u5386\u6216\u6027\u683C\u6709\u660E\u786E\u53D8\u5316\u65F6\u66F4\u65B0\u3002",delete:"\u7981\u6B62\u5220\u9664\u3002"},columns:[se("name","\u4EBA\u7269\u540D\u79F0","\u4E3B\u89D2\u7684\u540D\u5B57\u3002"),se("gender_age","\u6027\u522B/\u5E74\u9F84","\u4E3B\u89D2\u7684\u6027\u522B\u4E0E\u5E74\u9F84\u3002"),se("appearance","\u5916\u8C8C\u7279\u5F81","\u5BF9\u4E3B\u89D2\u5916\u8C8C\u7684\u5BA2\u89C2\u6587\u5B57\u63CF\u5199\u3002"),se("identity","\u804C\u4E1A/\u8EAB\u4EFD","\u4E3B\u89D2\u5728\u793E\u4F1A\u6216\u5267\u60C5\u4E2D\u7684\u4E3B\u8981\u8EAB\u4EFD\u3002"),se("history","\u8FC7\u5F80\u7ECF\u5386","\u4E3B\u89D2\u80CC\u666F\u6545\u4E8B\u4E0E\u5173\u952E\u7ECF\u5386\uFF0C\u968F\u5267\u60C5\u589E\u91CF\u66F4\u65B0\u3002"),se("personality","\u6027\u683C\u7279\u70B9","\u5BF9\u4E3B\u89D2\u6838\u5FC3\u6027\u683C\u7684\u6982\u62EC\u3002")]}),Xr({id:"default_important_characters",name:"\u91CD\u8981\u89D2\u8272\u8868",note:"\u8BB0\u5F55\u5173\u952E NPC \u6216\u91CD\u8981\u89D2\u8272\u7684\u4FE1\u606F\u548C\u52A8\u6001\u72B6\u6001\u3002",aiInstructions:{init:"\u521D\u59CB\u5316\u65F6\u4E3A\u5F53\u524D\u5728\u573A\u7684\u91CD\u8981\u4EBA\u7269\u5206\u522B\u63D2\u5165\u6761\u76EE\u3002",create:"\u5267\u60C5\u4E2D\u6709\u672A\u8BB0\u5F55\u7684\u91CD\u8981\u4EBA\u7269\u767B\u573A\u65F6\u65B0\u589E\u3002",update:"\u5DF2\u6709\u89D2\u8272\u7684\u72B6\u6001\u3001\u5173\u7CFB\u3001\u60F3\u6CD5\u3001\u7ECF\u5386\u6216\u6301\u6709\u7269\u53D8\u5316\u65F6\u66F4\u65B0\u3002",delete:'\u901A\u5E38\u7981\u6B62\u5220\u9664\uFF1B\u89D2\u8272\u79BB\u573A\u65F6\u4F18\u5148\u66F4\u65B0"\u662F\u5426\u79BB\u573A"\u3002'},columns:[se("name","\u59D3\u540D","\u89D2\u8272\u59D3\u540D\u3002"),se("gender_age","\u6027\u522B/\u5E74\u9F84","\u89D2\u8272\u7684\u6027\u522B\u4E0E\u5E74\u9F84\u3002"),se("summary","\u4E00\u53E5\u8BDD\u4ECB\u7ECD","\u7528\u7B80\u77ED\u6587\u5B57\u6982\u62EC\u89D2\u8272\u8EAB\u4EFD\u80CC\u666F\u3002"),se("appearance","\u5916\u8C8C\u7279\u5F81","\u5BF9\u89D2\u8272\u5916\u8C8C\u548C\u5F53\u524D\u8863\u7740\u7684\u5BA2\u89C2\u63CF\u5199\u3002"),se("important_items","\u6301\u6709\u7684\u91CD\u8981\u7269\u54C1","\u89D2\u8272\u62E5\u6709\u7684\u5173\u952E\u7269\u54C1\uFF0C\u7528\u5206\u53F7\u5206\u9694\u3002"),se("offstage","\u662F\u5426\u79BB\u573A",'\u5224\u65AD\u8BE5\u89D2\u8272\u5F53\u524D\u662F\u5426\u5DF2\u7ECF\u79BB\u573A\uFF0C\u586B\u5199"\u662F"\u6216"\u5426"\u3002',"boolean"),se("history","\u8FC7\u5F80\u7ECF\u5386","\u89D2\u8272\u80CC\u666F\u4E0E\u5173\u952E\u4E8B\u4EF6\uFF0C\u968F\u5267\u60C5\u589E\u91CF\u66F4\u65B0\u3002")]}),Xr({id:"default_protagonist_skills",name:"\u4E3B\u89D2\u6280\u80FD\u8868",note:"\u8BB0\u5F55\u4E3B\u89D2\u83B7\u5F97\u7684\u6280\u80FD\u3001\u80FD\u529B\u6216\u9636\u6BB5\u6027\u6210\u957F\u3002",aiInstructions:{init:"\u521D\u59CB\u5316\u65F6\u6839\u636E\u8BBE\u5B9A\u6DFB\u52A0\u4E3B\u89D2\u7684\u521D\u59CB\u6280\u80FD\u3002",create:"\u4E3B\u89D2\u83B7\u5F97\u65B0\u6280\u80FD\u6216\u65B0\u80FD\u529B\u65F6\u65B0\u589E\u3002",update:"\u5DF2\u6709\u6280\u80FD\u5347\u7EA7\u3001\u964D\u7EA7\u6216\u6548\u679C\u53D8\u5316\u65F6\u66F4\u65B0\u3002",delete:"\u6280\u80FD\u88AB\u5267\u60C5\u5265\u593A\u3001\u66FF\u6362\u6216\u5931\u6548\u65F6\u5220\u9664\u3002"},columns:[se("skill_name","\u6280\u80FD\u540D\u79F0","\u6280\u80FD\u6216\u80FD\u529B\u540D\u79F0\u3002"),se("skill_type","\u6280\u80FD\u7C7B\u578B","\u6280\u80FD\u7C7B\u522B\uFF0C\u4F8B\u5982\u4E3B\u52A8\u3001\u88AB\u52A8\u3001\u5929\u8D4B\u7B49\u3002"),se("level","\u7B49\u7EA7/\u9636\u6BB5","\u6280\u80FD\u5F53\u524D\u7B49\u7EA7\u3001\u719F\u7EC3\u5EA6\u6216\u9636\u6BB5\u3002"),se("effect","\u6548\u679C\u63CF\u8FF0","\u6280\u80FD\u5728\u5F53\u524D\u9636\u6BB5\u4E0B\u7684\u5177\u4F53\u6548\u679C\u3002")]}),Xr({id:"default_inventory",name:"\u80CC\u5305\u7269\u54C1\u8868",note:"\u8BB0\u5F55\u4E3B\u89D2\u62E5\u6709\u7684\u7269\u54C1\u3001\u88C5\u5907\u6216\u6D88\u8017\u54C1\u3002",aiInstructions:{init:"\u521D\u59CB\u5316\u65F6\u6839\u636E\u5267\u60C5\u4E0E\u8BBE\u5B9A\u6DFB\u52A0\u4E3B\u89D2\u7684\u521D\u59CB\u643A\u5E26\u7269\u54C1\u3002",create:"\u4E3B\u89D2\u83B7\u5F97\u80CC\u5305\u4E2D\u6CA1\u6709\u7684\u5168\u65B0\u7269\u54C1\u65F6\u65B0\u589E\u3002",update:"\u5DF2\u6709\u7269\u54C1\u6570\u91CF\u3001\u72B6\u6001\u6216\u63CF\u8FF0\u53D8\u5316\u65F6\u66F4\u65B0\u3002",delete:"\u7269\u54C1\u88AB\u5B8C\u5168\u6D88\u8017\u3001\u4E22\u5F03\u6216\u6467\u6BC1\u65F6\u5220\u9664\u3002"},columns:[se("item_name","\u7269\u54C1\u540D\u79F0","\u7269\u54C1\u540D\u79F0\u3002"),se("quantity","\u6570\u91CF","\u62E5\u6709\u6570\u91CF\u3002","number"),se("description","\u63CF\u8FF0/\u6548\u679C","\u7269\u54C1\u529F\u80FD\u3001\u6548\u679C\u6216\u80CC\u666F\u63CF\u8FF0\u3002"),se("category","\u7C7B\u522B","\u7269\u54C1\u7C7B\u522B\uFF0C\u4F8B\u5982\u6B66\u5668\u3001\u6D88\u8017\u54C1\u3001\u6742\u7269\u7B49\u3002")]}),Xr({id:"default_quests_events",name:"\u4EFB\u52A1\u4E0E\u4E8B\u4EF6\u8868",note:"\u8BB0\u5F55\u5F53\u524D\u6B63\u5728\u8FDB\u884C\u6216\u9700\u8981\u6301\u7EED\u8FFD\u8E2A\u7684\u4EFB\u52A1\u4E0E\u4E8B\u4EF6\u3002",aiInstructions:{init:"\u521D\u59CB\u5316\u65F6\u6839\u636E\u5267\u60C5\u4E0E\u8BBE\u5B9A\u6DFB\u52A0\u4E3B\u8981\u4EFB\u52A1\u6216\u5173\u952E\u4E8B\u4EF6\u3002",create:"\u4E3B\u89D2\u63A5\u53D6\u3001\u89E6\u53D1\u6216\u53D1\u73B0\u65B0\u7684\u4EFB\u52A1\u4E0E\u4E8B\u4EF6\u65F6\u65B0\u589E\u3002",update:"\u4EFB\u52A1\u53D6\u5F97\u5173\u952E\u8FDB\u5C55\u3001\u76EE\u6807\u53D8\u5316\u6216\u65F6\u9650\u53D8\u5316\u65F6\u66F4\u65B0\u3002",delete:"\u4EFB\u52A1\u5B8C\u6210\u3001\u5931\u8D25\u3001\u8FC7\u671F\u6216\u4E0D\u518D\u9700\u8981\u8FFD\u8E2A\u65F6\u5220\u9664\u3002"},columns:[se("quest_name","\u4EFB\u52A1\u540D\u79F0","\u4EFB\u52A1\u6216\u4E8B\u4EF6\u6807\u9898\u3002"),se("quest_type","\u4EFB\u52A1\u7C7B\u578B","\u4E3B\u7EBF\u3001\u652F\u7EBF\u3001\u4E2A\u4EBA\u3001\u7A81\u53D1\u4E8B\u4EF6\u7B49\u3002"),se("issuer","\u53D1\u5E03\u8005","\u53D1\u5E03\u4EFB\u52A1\u6216\u89E6\u53D1\u4E8B\u4EF6\u7684\u89D2\u8272\u3001\u5730\u70B9\u6216\u52BF\u529B\u3002"),se("detail","\u8BE6\u7EC6\u63CF\u8FF0","\u4EFB\u52A1\u76EE\u6807\u3001\u4E8B\u4EF6\u80CC\u666F\u548C\u8981\u6C42\u3002"),se("progress","\u5F53\u524D\u8FDB\u5EA6","\u5BF9\u5B8C\u6210\u5EA6\u6216\u5F53\u524D\u9636\u6BB5\u7684\u7B80\u8981\u63CF\u8FF0\u3002"),se("deadline","\u4EFB\u52A1\u65F6\u9650","\u5B8C\u6210\u4EFB\u52A1\u7684\u5269\u4F59\u65F6\u95F4\u6216\u622A\u6B62\u6761\u4EF6\u3002"),se("reward","\u5956\u52B1","\u5B8C\u6210\u540E\u53EF\u80FD\u83B7\u5F97\u7684\u5956\u52B1\u3002"),se("penalty","\u60E9\u7F5A","\u5931\u8D25\u6216\u9519\u8FC7\u540E\u7684\u540E\u679C\u3002")]}),Xr({id:"default_memo_log",name:"\u7EAA\u8981\u8868",note:"\u8BB0\u5F55\u6BCF\u8F6E\u6216\u5173\u952E\u7247\u6BB5\u53D1\u751F\u7684\u4E8B\u4EF6\u7EAA\u8981\uFF0C\u7528\u4E8E\u540E\u7EED\u56DE\u987E\u3002",aiInstructions:{init:"\u6545\u4E8B\u521D\u59CB\u5316\u65F6\u63D2\u5165\u4E00\u6761\u8BB0\u5F55\uFF0C\u7528\u4E8E\u8BB0\u5F55\u521D\u59CB\u5316\u5267\u60C5\u3002",create:"\u6BCF\u8F6E\u4EA4\u4E92\u7ED3\u675F\u540E\uFF0C\u82E5\u53D1\u751F\u4E86\u503C\u5F97\u8BB0\u5F55\u7684\u65B0\u4E8B\u4EF6\uFF0C\u5219\u63D2\u5165\u4E00\u6761\u65B0\u7EAA\u8981\u3002",update:"\u901A\u5E38\u7981\u6B62\u66F4\u65B0\u5386\u53F2\u7EAA\u8981\uFF1B\u53EA\u6709\u660E\u663E\u4E8B\u5B9E\u9519\u8BEF\u65F6\u624D\u4FEE\u6B63\u3002",delete:"\u7981\u6B62\u5220\u9664\u3002"},columns:[se("time_span","\u65F6\u95F4\u8DE8\u5EA6","\u672C\u8F6E\u4E8B\u4EF6\u53D1\u751F\u7684\u65F6\u95F4\u8303\u56F4\u3002"),se("location","\u5730\u70B9","\u672C\u8F6E\u4E8B\u4EF6\u53D1\u751F\u5730\u70B9\u3002"),se("memo","\u7EAA\u8981","\u4EE5\u7B2C\u4E09\u65B9\u89C6\u89D2\u5BA2\u89C2\u8BB0\u5F55\u672C\u8F6E\u53D1\u751F\u7684\u4E8B\u5B9E\u3002"),se("summary","\u6982\u89C8","\u4E00\u53E5\u8BDD\u6982\u62EC\u7EAA\u8981\u5185\u5BB9\u3002"),se("index_code","\u7F16\u7801\u7D22\u5F15","\u7528\u4E8E\u540E\u7EED\u68C0\u7D22\u7684\u7B80\u77ED\u7F16\u7801\u3002")]}),Xr({id:"default_options",name:"\u9009\u9879\u8868",note:"\u8BB0\u5F55\u6BCF\u8F6E\u4E3B\u89D2\u53EF\u4EE5\u91C7\u53D6\u7684\u884C\u52A8\u9009\u9879\u3002\u6B64\u8868\u901A\u5E38\u6709\u4E14\u4EC5\u6709\u4E00\u884C\u3002\u6240\u6709\u9009\u9879\u4F7F\u7528\u7B2C\u4E09\u4EBA\u79F0\uFF0C\u4E0D\u4EE3\u66FF\u4E3B\u89D2\u53D1\u8A00\uFF0C\u5E76\u7D27\u6263\u5F53\u524D\u5267\u60C5\u3002",aiInstructions:{init:"\u521D\u59CB\u5316\u65F6\u751F\u6210\u56DB\u4E2A\u521D\u59CB\u884C\u52A8\u9009\u9879\u3002",create:"\u901A\u5E38\u7981\u6B62\u65B0\u589E\uFF1B\u9664\u975E\u8868\u4E3A\u7A7A\u4E14\u9700\u8981\u521D\u59CB\u5316\u3002",update:"\u6BCF\u8F6E\u4EA4\u4E92\u540E\u6839\u636E\u5F53\u524D\u5267\u60C5\u751F\u6210\u65B0\u7684\u56DB\u4E2A\u9009\u9879\u5E76\u8986\u76D6\u539F\u6709\u5185\u5BB9\u3002",delete:"\u7981\u6B62\u5220\u9664\u3002"},columns:[se("option_1","\u9009\u9879\u4E00","\u504F\u5411\u7B56\u7565\u3001\u63A8\u8FDB\u5267\u60C5\u6216\u89E3\u51B3\u5F53\u524D\u95EE\u9898\u7684\u884C\u52A8\u3002"),se("option_2","\u9009\u9879\u4E8C","\u504F\u5411\u8C28\u614E\u89C2\u5BDF\u3001\u6536\u96C6\u4FE1\u606F\u6216\u4FDD\u6301\u4E2D\u7ACB\u7684\u884C\u52A8\u3002"),se("option_3","\u9009\u9879\u4E09","\u504F\u5411\u5E2E\u52A9\u3001\u4FDD\u62A4\u3001\u6C9F\u901A\u6216\u5B89\u629A\u7684\u884C\u52A8\u3002"),se("option_4","\u9009\u9879\u56DB","\u504F\u5411\u5192\u9669\u3001\u8BD5\u63A2\u3001\u6539\u53D8\u5C40\u52BF\u6216\u5173\u7CFB\u4E92\u52A8\u7684\u884C\u52A8\u3002")]})])});function nv(t,e=""){return t==null?e:String(t).trim()||e}function Qr(t){if(t==null)return"";if(typeof t=="string")return t;try{return JSON.stringify(t,null,2)}catch{return String(t)}}function No(t,e="col"){return nv(t,"").toLowerCase().replace(/[^a-z0-9]+/g,"_").replace(/^_+|_+$/g,"")||e}function Zr(t,e=new Set){let r=No(t,"col"),s=r,n=2;for(;e.has(s);)s=`${r}_${n}`,n+=1;return e.add(s),s}var _c=N(()=>{});function D(t,e=""){return t==null?e:String(t).trim()||e}function hr(t,e=!1){return t==null?e:t===!0}function ov(t){if(!Array.isArray(t)||t.length!==1)return!1;let e=t[0]&&typeof t[0]=="object"?t[0]:null;if(!e)return!1;let r=D(e.name||e.title,""),s=D(e.note||e.description,""),n=Array.isArray(e.columns)?e.columns:[],o=Array.isArray(e.rows)?e.rows:[];if(r&&!["\u88681","\u8868\u683C 1","\u8868\u683C1"].includes(r)||s||n.length!==1||o.length>1)return!1;let a=n[0]&&typeof n[0]=="object"?n[0]:{},i=D(a.key||a.id,""),l=D(a.title||a.name||a.label,"");if(D(a.description||a.note,"")||i&&i!=="col_1"||l&&!["\u52171","col_1"].includes(l))return!1;if(o.length===0)return!0;let d=o[0]&&typeof o[0]=="object"?o[0]:{},u=D(d.name||d.title||d.label,""),y=d.cells&&typeof d.cells=="object"&&!Array.isArray(d.cells)?d.cells:{},p=Array.isArray(d.values)?d.values:[],g=Object.values(y).some(m=>D(m,""))||p.some(m=>D(m,""));return(!u||u==="\u884C1")&&!g}function av(t,{seedDefaultWhenMissing:e=!1}={}){return ov(t)?oe(An):Array.isArray(t)?oe(t):t&&typeof t=="object"?iv(t):e?oe(An):[]}function Cc(t=""){let e=[],r=D(t,""),s=/-\s*列\d+\s*[:：]\s*([^\n\-–—]+?)\s*[-–—]\s*([^\n]+)/g,n;for(;n=s.exec(r);)e.push({title:D(n[1],""),description:D(n[2],"")});return e}function iv(t={}){let e=t&&typeof t=="object"?t:{};return Object.keys(e).filter(s=>s.startsWith("sheet_")&&e[s]&&typeof e[s]=="object").map((s,n)=>({key:s,table:e[s],fallbackOrder:n})).sort((s,n)=>{let o=Number.isFinite(s.table.orderNo)?s.table.orderNo:s.fallbackOrder,a=Number.isFinite(n.table.orderNo)?n.table.orderNo:n.fallbackOrder;return o-a}).map(({key:s,table:n},o)=>{let a=n.sourceData&&typeof n.sourceData=="object"?n.sourceData:{},i=Array.isArray(n.content)?n.content:[],l=Array.isArray(i[0])?i[0]:[],c=Cc(a.note),d=new Set,u=l.slice(1).map((p,g)=>{let m=c[g]||{},h=D(p||m.title,`\u5217${g+1}`);return{key:Zr(h||`col_${g+1}`,d),title:h,description:D(m.description,""),type:Za,required:!1}}),y=i.slice(1).map((p,g)=>{let m=Array.isArray(p)?p:[],h={};return u.forEach((x,v)=>{h[x.key]=Qr(m[v+1])}),{name:D(m[0],`\u884C${g+1}`),cells:h}});return{id:D(n.uid||s,`sheet_${o+1}`),name:D(n.name,`\u8868${o+1}`),note:D(a.note,""),enabled:n.enabled!==!1,aiInstructions:{init:D(a.initNode,""),create:D(a.insertNode,""),update:D(a.updateNode,""),delete:D(a.deleteNode,"")},columns:u,rows:y}})}function lv(t=[]){let e=[],r=0;return t.forEach(s=>{let n=s&&typeof s=="object"?s:{},o=n.cells&&typeof n.cells=="object"&&!Array.isArray(n.cells)?n.cells:null,a=Array.isArray(n.cells)?n.cells:Array.isArray(n.values)?n.values:null;o&&Object.keys(o).forEach(i=>{e.includes(i)||e.push(i)}),a&&a.length>r&&(r=a.length)}),e.length>0?e.map(s=>({key:s,title:String(s)})):r>0?Array.from({length:r},(s,n)=>({key:`col_${n+1}`,title:`\u5217${n+1}`})):[]}function Ic(t,e=Za){let r=D(t,e);return nf.some(s=>s.value===r)?r:e}function cv(t={},e=0,r=new Set){let s=t&&typeof t=="object"?t:{},n=D(s.title||s.name||s.label,`\u5217${e+1}`),o=D(s.key||s.id,""),a=Zr(o||n||`col_${e+1}`,r),i=[o,D(s.title,""),D(s.name,""),D(s.label,"")].filter(Boolean);return{key:a,title:n,description:D(s.description||s.note,""),type:Ic(s.type),required:s.required===!0,sourceKeys:i}}function dv(t={},e={},r=0){let s=t.cells&&typeof t.cells=="object"&&!Array.isArray(t.cells)?t.cells:null,n=Array.isArray(t.cells)?t.cells:Array.isArray(t.values)?t.values:null;if(s){let o=[...Array.isArray(e.sourceKeys)?e.sourceKeys:[],e.key,e.title].filter(Boolean);for(let a of o)if(s[a]!==void 0)return Qr(s[a])}return n&&n[r]!==void 0?Qr(n[r]):""}function uv(t={},e=[],r=0){let s=t&&typeof t=="object"?t:{},n={};return e.forEach((o,a)=>{n[o.key]=dv(s,o,a)}),{id:ko(s.id||s.rowId,r),name:D(s.name||s.title||s.label,`\u884C${r+1}`),cells:n}}function pv(t={}){let e=t&&typeof t=="object"?t:{};return{init:D(e.init,""),create:D(e.create,""),update:D(e.update,""),delete:D(e.delete,"")}}function yv(t={},e=""){let r=t&&typeof t=="object"?t:{},s=D(r.presetId,D(e,""));return{enabled:r.enabled===!0,presetId:s}}function fv(t={},e=""){let r=t&&typeof t=="object"?t:{};return{enabled:hr(r.enabled,!1),entryName:D(r.entryName,e),entryType:r.entryType==="keyword"?"keyword":"constant",splitByRow:hr(r.splitByRow,!1),keywords:D(r.keywords,""),injectionTemplate:D(r.injectionTemplate,""),preventRecursion:hr(r.preventRecursion,!0),entryPlacement:{position:D(r.entryPlacement?.position||r.placement?.position,"before_character_definition"),depth:Number.isFinite(Number(r.entryPlacement?.depth??r.placement?.depth))?Math.floor(Number(r.entryPlacement?.depth??r.placement?.depth)):2,order:Number.isFinite(Number(r.entryPlacement?.order??r.placement?.order))?Math.floor(Number(r.entryPlacement?.order??r.placement?.order)):0}}}function gv(t={},e=0){let r=t&&typeof t=="object"?t:{},s=new Set,o=(Array.isArray(r.columns)&&r.columns.length>0?r.columns:lv(Array.isArray(r.rows)?r.rows:[])).map((l,c)=>cv(l,c,s)),a=Array.isArray(r.rows)?r.rows.map((l,c)=>uv(l,o,c)):[],i=D(r.name||r.title,`\u8868${e+1}`);return{id:sr(r.id||r.key,e),name:i,note:D(r.note||r.description,""),enabled:r.enabled!==!1,aiInstructions:pv(r.aiInstructions),exportConfig:fv(r.exportConfig,i),columns:o.map(l=>({key:l.key,title:l.title,description:D(l.description,""),type:Ic(l.type),required:l.required===!0})),rows:a}}function af(t={}){let e=t&&typeof t=="object"?t:{},r=Array.isArray(e.lastErrorDetails)?e.lastErrorDetails.map(n=>D(n,"")).filter(Boolean):[],s=e.lastValidationSummary&&typeof e.lastValidationSummary=="object"?{errorCount:Number.isFinite(e.lastValidationSummary.errorCount)?e.lastValidationSummary.errorCount:0,warningCount:Number.isFinite(e.lastValidationSummary.warningCount)?e.lastValidationSummary.warningCount:0}:{errorCount:0,warningCount:0};return{lastStatus:D(e.lastStatus,Ie.IDLE),lastRunAt:Number.isFinite(e.lastRunAt)?e.lastRunAt:0,lastDurationMs:Number.isFinite(e.lastDurationMs)?e.lastDurationMs:0,lastError:D(e.lastError,""),lastErrorDetails:r,lastValidationSummary:s,successCount:Number.isFinite(e.successCount)?e.successCount:0,errorCount:Number.isFinite(e.errorCount)?e.errorCount:0,lastSourceMessageId:D(e.lastSourceMessageId,""),lastSlotRevisionKey:D(e.lastSlotRevisionKey,""),lastLoadMode:D(e.lastLoadMode,""),lastFillMode:D(e.lastFillMode,""),lastMirrorApplied:e.lastMirrorApplied===!0,lastResolvedFromMessageId:D(e.lastResolvedFromMessageId,""),lastResolvedFromRevisionKey:D(e.lastResolvedFromRevisionKey,""),lastSourceKind:D(e.lastSourceKind,""),lastScopeMode:D(e.lastScopeMode,""),lastAutoRunAt:Number.isFinite(e.lastAutoRunAt)?e.lastAutoRunAt:0,lastAutoStatus:D(e.lastAutoStatus,Ie.IDLE),lastAutoMessageId:D(e.lastAutoMessageId,""),lastAutoRevisionKey:D(e.lastAutoRevisionKey,""),lastAutoSkipReason:D(e.lastAutoSkipReason,"")}}function mv(t={}){let e=t&&typeof t=="object"?t:{};return(Array.isArray(e.tables)?e.tables:[]).map((s,n)=>gv(s,n))}function lf(t="",e={},r={}){let s=Ic(e?.type),n=String(t??"").trim(),o=D(r?.label,`${D(r?.tableName,"\u8868\u683C")} / ${D(r?.rowName,"\u884C")} / ${D(e?.title||e?.key,"\u5355\u5143\u683C")}`),a=[],i=[];if(e?.required===!0&&!n&&a.push(`${o} \u4E3A\u5FC5\u586B\uFF0C\u5F53\u524D\u4E3A\u7A7A\u3002`),!n)return{valid:a.length===0,errors:a,warnings:i};if(s==="number"&&!Number.isFinite(Number(n))&&a.push(`${o} \u9700\u8981\u586B\u5199\u6570\u5B57\u3002`),s==="boolean"&&!["true","false","1","0","yes","no"].includes(n.toLowerCase())&&a.push(`${o} \u9700\u8981\u586B\u5199\u5E03\u5C14\u503C\uFF08true / false\uFF09\u3002`),s==="date"&&Number.isNaN(Date.parse(n))&&a.push(`${o} \u9700\u8981\u586B\u5199\u53EF\u89E3\u6790\u7684\u65E5\u671F\u3002`),s==="json")try{JSON.parse(n)}catch(l){a.push(`${o} \u9700\u8981\u586B\u5199\u5408\u6CD5 JSON\uFF1A${l?.message||"\u89E3\u6790\u5931\u8D25"}`)}return{valid:a.length===0,errors:a,warnings:i}}function hv(t={}){let r=mv(t&&typeof t=="object"?t:{}),s=[];return r.forEach((n,o)=>{let a=D(n?.name,`\u8868${o+1}`),i=Array.isArray(n?.columns)?n.columns:[],l=Array.isArray(n?.rows)?n.rows:[];a||s.push(`\u8868 ${o+1} \u7F3A\u5C11\u540D\u79F0\u3002`),i.length===0&&s.push(`${a} \u81F3\u5C11\u9700\u8981\u4E00\u5217\u3002`);let c=new Set;i.forEach((d,u)=>{let y=D(d?.key,""),p=D(d?.title,`\u5217${u+1}`);if(!y){s.push(`${a} / ${p} \u7F3A\u5C11\u5185\u90E8\u540D\u3002`);return}if(c.has(y)){s.push(`${a} \u4E2D\u5B58\u5728\u91CD\u590D\u5217\u5185\u90E8\u540D\uFF1A${y}`);return}c.add(y)}),l.forEach((d,u)=>{let y=D(d?.name,`\u884C${u+1}`),p=d?.cells&&typeof d.cells=="object"&&!Array.isArray(d.cells)?d.cells:{};i.forEach((g,m)=>{let h=D(g?.key,""),x=D(g?.title||h,`\u5217${m+1}`),v=h?Qr(p[h]):"",T=lf(v,g,{label:`${a} / ${y} / ${x}`,tableName:a,rowName:y});s.push(...T.errors)})})}),{valid:s.length===0,errors:s,tables:r}}function En({severity:t="error",message:e="",tableIndex:r=-1,tableName:s="",columnIndex:n=-1,columnKey:o="",rowIndex:a=-1,rowName:i="",cellKey:l=""}={}){return{severity:t,message:D(e,t==="warning"?"\u5B58\u5728\u8B66\u544A\u3002":"\u5B58\u5728\u9519\u8BEF\u3002"),tableIndex:r,tableName:D(s,""),columnIndex:n,columnKey:D(o,""),rowIndex:a,rowName:D(i,""),cellKey:D(l,"")}}function ei(t={}){let e=hv(t),r=[];if(!e.valid)return{...e,warnings:[],issues:r,summary:{errorCount:e.errors.length,warningCount:0}};let s=Array.isArray(e.tables)?e.tables:[];s.forEach((a,i)=>{let l=D(a?.name,`\u8868${i+1}`),c=Array.isArray(a?.columns)?a.columns:[],d=Array.isArray(a?.rows)?a.rows:[],u=new Set;l||r.push(En({severity:"error",message:`\u8868 ${i+1} \u7F3A\u5C11\u540D\u79F0\u3002`,tableIndex:i,tableName:l})),c.forEach((y,p)=>{let g=D(y?.key,""),m=D(y?.title,`\u5217${p+1}`);g||r.push(En({severity:"error",message:`${l} / ${m} \u7F3A\u5C11\u5185\u90E8\u540D\u3002`,tableIndex:i,tableName:l,columnIndex:p,columnKey:g,cellKey:g})),g&&(u.has(g)&&r.push(En({severity:"error",message:`${l} \u4E2D\u5B58\u5728\u91CD\u590D\u5217\u5185\u90E8\u540D\uFF1A${g}`,tableIndex:i,tableName:l,columnIndex:p,columnKey:g,cellKey:g})),u.add(g))}),d.forEach((y,p)=>{let g=D(y?.name,`\u884C${p+1}`),m=y?.cells&&typeof y.cells=="object"&&!Array.isArray(y.cells)?y.cells:{};Object.keys(m).forEach(x=>{c.some(v=>D(v?.key,"")===x)||r.push(En({severity:"warning",message:`${l} / ${g} \u5305\u542B\u672A\u5B9A\u4E49\u5217 ${x}\uFF0C\u4FDD\u5B58\u540E\u4F1A\u88AB\u5FFD\u7565\u3002`,tableIndex:i,tableName:l,rowIndex:p,rowName:g,cellKey:x}))}),c.forEach((x,v)=>{let T=D(x?.key,""),A=D(x?.title||T,`\u5217${v+1}`),E=T?Qr(m[T]):"",w=lf(E,x,{label:`${l} / ${g} / ${A}`,tableName:l,rowName:g});w.errors.forEach(P=>{r.push(En({severity:"error",message:P,tableIndex:i,tableName:l,columnIndex:v,columnKey:T,rowIndex:p,rowName:g,cellKey:T}))}),w.warnings.forEach(P=>{r.push(En({severity:"warning",message:P,tableIndex:i,tableName:l,columnIndex:v,columnKey:T,rowIndex:p,rowName:g,cellKey:T}))})})})});let n=r.filter(a=>a.severity!=="warning").map(a=>a.message),o=r.filter(a=>a.severity==="warning").map(a=>a.message);return{valid:n.length===0,errors:n,warnings:o,issues:r,tables:s,summary:{errorCount:n.length,warningCount:o.length}}}function cf(){return{tables:oe(An),promptTemplate:Tc,apiPreset:"",promptPreset:"",bypass:{enabled:!1,presetId:""},activeTemplate:Tt,autoUpdateEnabled:!1,autoUpdateTrigger:"assistantMessage",runScope:vt.ENABLED,scope:{mode:vt.ENABLED,selectedTableIds:[],activeTableId:""},fillMode:Qa.INCREMENTAL,contextDepth:8,contextRoles:"all",contextExtractTags:[],contextUseGlobalRules:!1,worldbooks:{enabled:!1,selected:[]},sendLatestRows:-1,mirrorToMessage:!1,mirrorTag:"yyt-table-workbench",worldbookSync:{enabled:!1,targetBook:"",entryComment:"YYT-\u586B\u8868\u6570\u636E"},wrapperConfig:{enabled:!0,wrapperTag:"\u6700\u65B0\u6570\u636E\u4E0E\u8BB0\u5F55",wrapperHint:"\u4EE5\u4E0B\u662F\u5728\u8FD9\u4E2A\u65F6\u95F4\u70B9\uFF0C\u5F53\u524D\u573A\u666F\u4E0B\u5267\u60C5\u76F8\u5173\u7684\u6700\u65B0\u6570\u636E\u4E0E\u8BB0\u5F55\uFF0C\u4F60\u5728\u8FDB\u884C\u5267\u60C5\u5206\u6790\u65F6\u5FC5\u987B\u4EE5\u6B64\u6700\u65B0\u7684\u6570\u636E\u4E3A\u51C6\uFF0C\u4EE5\u4E0B\u6570\u636E\u4E0E\u8BB0\u5F55\u7684\u4F18\u5148\u7EA7\u9AD8\u4E8E\u5176\u4ED6\u4EFB\u4F55\u80CC\u666F\u8BBE\u5B9A\uFF1A",wrapperPlacement:{position:"before_character_definition",depth:2,order:0}},tableEnabledOverrides:{},runtime:af()}}function Yt(t={}){let e=cf(),r=t&&typeof t=="object"?t:{},s=r.bypass?r.bypass:r.bypassPresetId?{presetId:r.bypassPresetId,enabled:!!r.bypassPresetId}:void 0,n=yv(s,r.promptPreset),o=av(r.tables,{seedDefaultWhenMissing:!Object.prototype.hasOwnProperty.call(r,"tables")}),a=r.scope&&typeof r.scope=="object"?r.scope:{},i=typeof r.runScope=="string"&&r.runScope?{...a,mode:r.runScope}:a,l=Po(i,{mode:r.runScope,selectedTableIds:r.selectedTableIds,activeTableId:r.activeTableId}),c=hr(r.autoUpdateEnabled!==void 0?r.autoUpdateEnabled:r.automation?.enabled,e.autoUpdateEnabled);return{tables:o,promptTemplate:D(r.promptTemplate,e.promptTemplate),apiPreset:D(r.apiPreset,""),promptPreset:n.presetId,bypass:n,activeTemplate:D(r.activeTemplate,e.activeTemplate),autoUpdateEnabled:c,autoUpdateTrigger:D(r.autoUpdateTrigger,e.autoUpdateTrigger),runScope:l.mode,scope:l,fillMode:r.fillMode===Qa.FULL?Qa.FULL:e.fillMode,contextDepth:Number.isFinite(Number(r.contextDepth))&&Number(r.contextDepth)>0?Math.floor(Number(r.contextDepth)):e.contextDepth,contextRoles:r.contextRoles==="assistant_only"?"assistant_only":"all",contextExtractTags:Array.isArray(r.contextExtractTags)?r.contextExtractTags.filter(d=>typeof d=="string"&&d.trim()):typeof r.contextExtractTags=="string"&&r.contextExtractTags.trim()?r.contextExtractTags.split(`
`).map(d=>d.trim()).filter(Boolean):[],contextUseGlobalRules:hr(r.contextUseGlobalRules??r.contextUseExtractRules??r.contextUseExcludeRules,!1),extraction:{regexPresetId:D(r.extraction?.regexPresetId,"")},worldbooks:{enabled:hr(r.worldbooks?.enabled,!1),selected:Array.isArray(r.worldbooks?.selected)?r.worldbooks.selected.filter(d=>typeof d=="string"&&d.trim()):[],presetId:D(r.worldbooks?.presetId,"")},sendLatestRows:Number.isFinite(Number(r.sendLatestRows))?Math.floor(Number(r.sendLatestRows)):-1,mirrorToMessage:hr(r.mirrorToMessage,e.mirrorToMessage),mirrorTag:D(r.mirrorTag,e.mirrorTag),worldbookSync:{enabled:hr(r.worldbookSync?.enabled,!1),targetBook:D(r.worldbookSync?.targetBook,""),entryComment:D(r.worldbookSync?.entryComment,e.worldbookSync.entryComment),wrapperConfig:r.worldbookSync?.wrapperConfig?{enabled:hr(r.worldbookSync.wrapperConfig?.enabled,!0),wrapperTag:D(r.worldbookSync.wrapperConfig?.wrapperTag,e.wrapperConfig.wrapperTag),wrapperHint:D(r.worldbookSync.wrapperConfig?.wrapperHint,""),wrapperPlacement:{position:D(r.worldbookSync.wrapperConfig?.wrapperPlacement?.position,e.wrapperConfig.wrapperPlacement.position),depth:Number.isFinite(Number(r.worldbookSync.wrapperConfig?.wrapperPlacement?.depth))?Math.floor(Number(r.worldbookSync.wrapperConfig?.wrapperPlacement?.depth)):e.wrapperConfig.wrapperPlacement.depth,order:Number.isFinite(Number(r.worldbookSync.wrapperConfig?.wrapperPlacement?.order))?Math.floor(Number(r.worldbookSync.wrapperConfig?.wrapperPlacement?.order)):e.wrapperConfig.wrapperPlacement.order}}:void 0},wrapperConfig:{enabled:hr(r.wrapperConfig?.enabled,e.wrapperConfig.enabled),wrapperTag:D(r.wrapperConfig?.wrapperTag,e.wrapperConfig.wrapperTag),wrapperHint:D(r.wrapperConfig?.wrapperHint,e.wrapperConfig.wrapperHint),wrapperPlacement:{position:D(r.wrapperConfig?.wrapperPlacement?.position,e.wrapperConfig.wrapperPlacement.position),depth:Number.isFinite(Number(r.wrapperConfig?.wrapperPlacement?.depth))?Math.floor(Number(r.wrapperConfig?.wrapperPlacement?.depth)):e.wrapperConfig.wrapperPlacement.depth,order:Number.isFinite(Number(r.wrapperConfig?.wrapperPlacement?.order))?Math.floor(Number(r.wrapperConfig?.wrapperPlacement?.order)):e.wrapperConfig.wrapperPlacement.order}},tableEnabledOverrides:r.tableEnabledOverrides&&typeof r.tableEnabledOverrides=="object"&&!Array.isArray(r.tableEnabledOverrides)?Object.fromEntries(Object.entries(r.tableEnabledOverrides).filter(([d,u])=>typeof d=="string"&&d&&typeof u=="boolean")):{},runtime:af({...e.runtime,...r.runtime||{}})}}function kc(t={}){let e=Yt(t),r=[];return Array.isArray(e.tables)||r.push("\u8868\u5B9A\u4E49\u5FC5\u987B\u662F JSON \u6570\u7EC4\u3002"),e.promptTemplate||r.push("\u586B\u8868 Prompt \u4E0D\u80FD\u4E3A\u7A7A\u3002"),e.mirrorTag||r.push("\u6B63\u6587\u955C\u50CF\u6807\u7B7E\u4E0D\u80FD\u4E3A\u7A7A\u3002"),{valid:r.length===0,errors:r,config:e}}function be(){let t=Ac.get(Ec,cf()),e=Yt(t),r=vc();return{...tf(e,r),guide:r}}function bv(t){let r=(Array.isArray(t?.tables)?t.tables:[]).map(s=>({...s,rows:[]}));return{...t,tables:r}}function Je(t={}){let e=be(),r=Yt({...e,...t||{},runtime:t?.runtime===void 0?e.runtime:t.runtime}),s=kc(r);if(!s.valid)return{success:!1,error:s.errors.join(`
`),errors:s.errors,config:s.config};let n=bv(s.config);return Ac.set(Ec,n),ef({templateId:s.config.activeTemplate,scope:s.config.scope,worldbookSync:s.config.worldbookSync}),{success:!0,config:s.config}}function df(t={}){let e=be(),r=Yt({...e,runtime:{...e.runtime,...t||{}}});return Ac.set(Ec,r),r.runtime}function xv(t={},e={}){let r=Yt(t),s=D(r.promptTemplate,Tc);return e.skipResponseContract?s.trim():`${s}

${sf}`.trim()}function uf(t={},e={}){let r=Yt(t);return{id:"tableWorkbench",name:"\u586B\u8868\u5DE5\u4F5C\u53F0",promptTemplate:xv(r,e),bypass:{enabled:r.bypass?.enabled===!0,presetId:r.bypass?.presetId||r.promptPreset||""}}}var Ac,Ec,qt=N(()=>{He();Le();Cn();Xa();rf();of();_c();Ac=z.namespace("tableWorkbench"),Ec="config"});function Mc(){return Rc||(Rc=C.createScope("TableIsolation")),Rc}var pf,yf,Rc,Pc,ne,kr=N(()=>{He();H();Le();pf="tableEngine.isolation",yf=Object.freeze({enabled:!1,key:Et});Pc=class{constructor(){this._cache=null,this._subscribers=new Set}getState(){if(this._cache)return this._cache;let e=z.get(pf,null);return this._cache=this._normalize(e),this._cache}isEnabled(){return this.getState().enabled===!0}getKey(){let e=this.getState();return e.enabled?e.key||Et:Et}getConfiguredKey(){return this.getState().key}setEnabled(e){let r=this._normalize({...this.getState(),enabled:!!e});this._commit(r,{reason:"enabled"})}setKey(e){let r=this._normalize({...this.getState(),key:e});this._commit(r,{reason:"key"})}updateState(e={}){let r=this.getState(),s=this._normalize({enabled:e.enabled!==void 0?!!e.enabled:r.enabled,key:e.key!==void 0?e.key:r.key});this._commit(s,{reason:"patch"})}reset(){this._commit({...yf},{reason:"reset"})}getScopeKey(e){return Mo(e,this.getKey())}subscribe(e){return typeof e!="function"?()=>{}:(this._subscribers.add(e),()=>this._subscribers.delete(e))}_normalize(e){return!e||typeof e!="object"?{...yf}:{enabled:e.enabled===!0,key:Ce(e.key)}}_commit(e,r={}){let s=this.getState();if(s.enabled===e.enabled&&s.key===e.key)return;this._cache=e;try{z.set(pf,e)}catch(o){Mc().error("isolation \u72B6\u6001\u843D\u76D8\u5931\u8D25",o)}Mc().info("isolation \u72B6\u6001\u53D8\u5316",{prev:s,next:e,reason:r.reason||""});let n={...e,prev:s,reason:r.reason||""};for(let o of this._subscribers)try{o(n)}catch(a){Mc().error("isolation \u8BA2\u9605\u8005\u56DE\u8C03\u5F02\u5E38",a)}}},ne=new Pc});var ff={};le(ff,{AuthorityProvider:()=>ti,default:()=>vv});var In,Nc,wv,ts,ti,vv,gf=N(()=>{H();Rn();In=C.createScope("AuthorityProvider"),Nc="third-party/youyou-toolkit",wv="YouYou Toolkit",ts="main",ti=class{constructor({extensionVersion:e="1.0.149"}={}){this.kind=kn.AUTHORITY,this._client=null,this._extensionVersion=e,this._initialized=!1}async init(){let e=ri();if(!e)return In.error("\u672A\u68C0\u6D4B\u5230 window.STAuthority.AuthoritySDK"),!1;try{return this._client=await e.init({extensionId:Nc,displayName:wv,version:this._extensionVersion,installType:"local",declaredPermissions:{sql:{private:!0}}}),this._initialized=!0,In.info("AuthorityProvider \u521D\u59CB\u5316\u6210\u529F",{extensionId:Nc}),!0}catch(r){return In.error("AuthorityProvider \u521D\u59CB\u5316\u5931\u8D25",{error:r?.message||r}),this._initialized=!1,!1}}async dispose(){this._client=null,this._initialized=!1}async migrate({migrations:e,database:r=ts,tableName:s}={}){this._ensureReady();let n={database:r,migrations:e};s&&(n.tableName=s);let o=await this._client.sql.migrate(n);return{applied:o?.applied||[],skipped:o?.skipped||[],tableName:o?.tableName,latestId:o?.latestId}}async query({statement:e,params:r=[],database:s=ts,page:n=void 0}={}){this._ensureReady();let o={database:s,statement:e,params:r};n&&(o.page=n);let a=await this._client.sql.query(o);return{columns:a.columns||[],rows:a.rows||[],rowCount:a.rowCount??(a.rows?.length||0),page:a.page}}async execute({statement:e,params:r=[],database:s=ts}={}){this._ensureReady();let n=await this._client.sql.exec({database:s,statement:e,params:r});return{rowsAffected:n.rowsAffected??0,lastInsertRowid:n.lastInsertRowid??null}}async batch({statements:e,database:r=ts}={}){this._ensureReady();let s=(e||[]).map(o=>({mode:o.mode||(/^\s*SELECT/i.test(o.statement)?"query":"exec"),statement:o.statement,params:o.params||[]}));return{results:(await this._client.sql.batch({database:r,statements:s}))?.results||[]}}async transaction({statements:e,database:r=ts}={}){this._ensureReady();let s=(e||[]).map(o=>({mode:o.mode||(/^\s*SELECT/i.test(o.statement)?"query":"exec"),statement:o.statement,params:o.params||[]})),n=await this._client.sql.transaction({database:r,statements:s});return{committed:!!n?.committed,results:n?.results||[]}}async paginate({statement:e,params:r=[],database:s=ts,page:n={}}={}){return this._ensureReady(),this.query({statement:e,params:r,database:s,page:n})}async pageAll({statement:e,params:r=[],database:s=ts,pageSize:n=200,maxPages:o}={}){this._ensureReady();let a=await this._client.sql.pageAll({database:s,statement:e,params:r},{pageSize:n,maxPages:o});return{columns:a.columns||[],rows:a.rows||[],rowCount:a.rowCount??(a.rows?.length||0)}}async backup(){return In.warn("backup() \u6682\u672A\u5B9E\u73B0\uFF0CAuthorityProvider \u8D70 Authority \u5185\u7F6E\u5907\u4EFD"),{kind:"authority",timestamp:Date.now()}}async export(){return In.warn("export() \u6682\u672A\u5B9E\u73B0\uFF0CAuthorityProvider \u8D70 Authority \u5185\u7F6E\u5BFC\u51FA"),{kind:"authority",timestamp:Date.now()}}async import(){In.warn("import() \u6682\u672A\u5B9E\u73B0\uFF0CAuthorityProvider \u8D70 Authority \u5185\u7F6E\u5BFC\u5165")}describe(){return{kind:this.kind,initialized:this._initialized,extensionId:Nc,database:ts,hasClient:!!this._client}}_ensureReady(){if(!this._initialized||!this._client)throw new Error("AuthorityProvider \u5C1A\u672A\u521D\u59CB\u5316")}},vv=ti});var hf={};le(hf,{FallbackProvider:()=>si,default:()=>kv});function Tv(t){let e=[],r=0,s="";for(let n of t)n==="("?r+=1:n===")"&&(r-=1),n===","&&r===0?(s.trim()&&e.push(s),s=""):s+=n;return s.trim()&&e.push(s),e}function Sv(t){let e=t.match(/^\s*CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?(\w+)\s*\(([\s\S]+)\)\s*$/i);if(!e)return null;let r=e[1],s=e[2],n=Tv(s),o=[],a=[];for(let i of n){let l=i.trim(),c=l.match(/^PRIMARY\s+KEY\s*\(([^)]+)\)$/i);if(c){a=c[1].split(",").map(u=>u.trim());continue}let d=l.match(/^(\w+)\s+(\w+)/);d&&(o.push({name:d[1],type:d[2].toUpperCase(),raw:l}),/PRIMARY\s+KEY/i.test(l)&&!a.length&&(a=[d[1]]))}return{name:r,columns:o,pkCols:a}}function _v(t){let e=t.match(/^\s*INSERT\s+(?:OR\s+REPLACE\s+)?INTO\s+(\w+)(?:\s*\(([^)]+)\))?\s+VALUES\s*\(([^)]+)\)\s*$/i);if(!e)return null;let r=e[1],s=e[2]?e[2].split(",").map(o=>o.trim()):null,n=(e[3].match(/\?/g)||[]).length;return{name:r,cols:s,paramCount:n}}function Dc(t){let e=t.split(/\s+AND\s+/i),r=[];for(let s of e){let n=s.match(/^\s*(\w+)\s*(=|!=|<>|>=|<=|>|<)\s*\?\s*$/);if(n){let a=n[2]==="<>"?"!=":n[2];r.push({col:n[1],op:a,placeholder:!0});continue}let o=s.match(/^\s*(\w+)\s+IS\s+(NOT\s+)?NULL\s*$/i);if(o){r.push({col:o[1],op:o[2]?"IS NOT NULL":"IS NULL",placeholder:!1});continue}throw new Error(`FallbackProvider \u4E0D\u652F\u6301\u7684 WHERE \u5B50\u53E5: "${s}"`)}return r}function Av(t){let e=t.match(/^\s*SELECT\s+([\s\S]+?)\s+FROM\s+(\w+)([\s\S]*)$/i);if(!e)return null;let r=e[1].trim(),s=e[2],n=e[3],o=n.match(/\bWHERE\s+([\s\S]+?)(?=\bORDER\s+BY\b|\bLIMIT\b|\bOFFSET\b|$)/i),a=n.match(/\bORDER\s+BY\s+(\w+)\s*(ASC|DESC)?/i),i=n.match(/\bLIMIT\s+(\d+)/i),l=n.match(/\bOFFSET\s+(\d+)/i);return{name:s,cols:r==="*"?null:r.split(",").map(c=>c.trim()),where:o?Dc(o[1].trim()):null,orderBy:a?{col:a[1],dir:(a[2]||"ASC").toUpperCase()}:null,limit:i?parseInt(i[1],10):null,offset:l?parseInt(l[1],10):null}}function Ev(t){let e=t.match(/^\s*UPDATE\s+(\w+)\s+SET\s+([\s\S]+?)(?:\s+WHERE\s+([\s\S]+))?\s*$/i);if(!e)return null;let r=e[1],s=e[2],n=e[3],o=s.split(",").map(a=>{let i=a.trim().match(/^(\w+)\s*=\s*\?$/);if(!i)throw new Error(`FallbackProvider \u4E0D\u652F\u6301\u7684 SET \u5B50\u53E5: "${a}"`);return i[1]});return{name:r,setCols:o,where:n?Dc(n.trim()):null}}function Cv(t){let e=t.match(/^\s*DELETE\s+FROM\s+(\w+)(?:\s+WHERE\s+([\s\S]+))?\s*$/i);return e?{name:e[1],where:e[2]?Dc(e[2].trim()):null}:null}function Oc(t,e){return t===e?!0:t==null?e==null:e==null?!1:typeof t=="number"||typeof e=="number"?Number(t)===Number(e):String(t)===String(e)}function $o(t,e){return t===e?0:t==null?-1:e==null?1:typeof t=="number"&&typeof e=="number"?t-e:String(t)<String(e)?-1:1}function Iv(t,e,r){let s=t[e.col];if(e.op==="IS NULL")return s==null;if(e.op==="IS NOT NULL")return s!=null;let n=r.shift();switch(e.op){case"=":return Oc(s,n);case"!=":return!Oc(s,n);case">":return $o(s,n)>0;case"<":return $o(s,n)<0;case">=":return $o(s,n)>=0;case"<=":return $o(s,n)<=0;default:return!1}}function $c(t,e,r){if(!e||!e.length)return!0;let s=Array.isArray(r)?[...r]:[];for(let n of e)if(!Iv(t,n,s))return!1;return!0}var Mn,mf,si,kv,bf=N(()=>{H();He();Rn();Mn=C.createScope("FallbackProvider"),mf="provider_fallback_v1";si=class{constructor(){this.kind=kn.FALLBACK,this._tables=new Map,this._migrations=new Set,this._initialized=!1,this._dirty=!1,this._saveTimer=null}async init(){try{let e=Se.get(mf)||{};this._migrations=new Set(Array.isArray(e.migrations)?e.migrations:[]),this._tables=new Map;for(let[r,s]of Object.entries(e.tables||{}))this._tables.set(r,{schema:s.schema||{name:r,columns:[],pkCols:[]},rows:Array.isArray(s.rows)?s.rows:[]});return this._initialized=!0,Mn.info("FallbackProvider \u521D\u59CB\u5316\u5B8C\u6210",{tables:this._tables.size,migrations:this._migrations.size}),!0}catch(e){return Mn.error("FallbackProvider \u521D\u59CB\u5316\u5931\u8D25",{error:e?.message||e}),this._initialized=!1,!1}}async dispose(){this._flushSave(!0),this._tables.clear(),this._migrations.clear(),this._initialized=!1}async migrate({migrations:e}={}){this._ensureReady();let r=[],s=[];for(let n of e||[]){if(!n?.id||!n?.statement)continue;if(this._migrations.has(n.id)){s.push(n.id);continue}let o=n.statement.trim();if(/^CREATE\s+TABLE/i.test(o)){let a=Sv(o);if(!a)throw new Error(`\u65E0\u6CD5\u89E3\u6790 CREATE TABLE: ${o}`);this._tables.has(a.name)||this._tables.set(a.name,{schema:a,rows:[]})}else if(!/^CREATE\s+(UNIQUE\s+)?INDEX/i.test(o))if(/^DROP\s+TABLE/i.test(o)){let a=o.match(/^DROP\s+TABLE\s+(?:IF\s+EXISTS\s+)?(\w+)/i);a&&this._tables.delete(a[1])}else/^ALTER\s+TABLE/i.test(o)?Mn.warn("FallbackProvider \u4E0D\u652F\u6301 ALTER TABLE\uFF0C\u8DF3\u8FC7",{id:n.id}):Mn.warn("FallbackProvider \u8DF3\u8FC7\u672A\u8BC6\u522B DDL",{id:n.id,statement:o});this._migrations.add(n.id),r.push(n.id)}return this._markDirty(),{applied:r,skipped:s}}async query({statement:e,params:r=[]}={}){this._ensureReady();let s=Av(e);if(!s)throw new Error(`\u65E0\u6CD5\u89E3\u6790 SELECT: ${e}`);let n=this._tables.get(s.name);if(!n)return{columns:s.cols||[],rows:[],rowCount:0};let o=n.rows.filter(l=>$c(l,s.where,r));if(s.orderBy){let l=s.orderBy.dir==="DESC"?-1:1;o=[...o].sort((c,d)=>$o(c[s.orderBy.col],d[s.orderBy.col])*l)}s.offset&&(o=o.slice(s.offset)),Number.isFinite(s.limit)&&(o=o.slice(0,s.limit));let a,i=o;return s.cols?(i=o.map(l=>{let c={};for(let d of s.cols)c[d]=l[d]===void 0?null:l[d];return c}),a=s.cols):a=n.schema?.columns?.map(l=>l.name)||(i[0]?Object.keys(i[0]):[]),{columns:a,rows:i,rowCount:i.length}}async execute({statement:e,params:r=[]}={}){this._ensureReady();let s=String(e||"").trim(),n=s.split(/\s+/)[0].toUpperCase(),o;if(n==="INSERT")o=this._doInsert(s,r);else if(n==="UPDATE")o=this._doUpdate(s,r);else if(n==="DELETE")o=this._doDelete(s,r);else throw new Error(`FallbackProvider \u4E0D\u652F\u6301\u7684 execute \u8BED\u53E5: ${e}`);return o}_doInsert(e,r){let s=_v(e);if(!s)throw new Error(`\u65E0\u6CD5\u89E3\u6790 INSERT: ${e}`);let n=this._tables.get(s.name);if(!n)throw new Error(`\u8868\u4E0D\u5B58\u5728: ${s.name}`);let o=s.cols||(n.schema.columns||[]).map(c=>c.name);if(!o.length)throw new Error(`\u8868 ${s.name} \u65E0\u5217\u5B9A\u4E49`);if(r.length!==o.length)throw new Error(`INSERT \u53C2\u6570\u6570\u91CF\u4E0D\u5339\u914D (\u671F\u671B ${o.length}, \u5B9E\u9645 ${r.length})`);let a={};for(let c=0;c<o.length;c+=1)a[o[c]]=r[c];let i=n.schema?.pkCols||[],l=/^INSERT\s+OR\s+REPLACE/i.test(e);if(i.length){let c=n.rows.findIndex(d=>i.every(u=>Oc(d[u],a[u])));if(c>=0){if(l)return n.rows[c]=a,this._markDirty(),{rowsAffected:1,lastInsertRowid:c+1};throw new Error(`PRIMARY KEY \u51B2\u7A81 (${i.join(",")})`)}}return n.rows.push(a),this._markDirty(),{rowsAffected:1,lastInsertRowid:n.rows.length}}_doUpdate(e,r){let s=Ev(e);if(!s)throw new Error(`\u65E0\u6CD5\u89E3\u6790 UPDATE: ${e}`);let n=this._tables.get(s.name);if(!n)return{rowsAffected:0,lastInsertRowid:null};let o=s.setCols.length;if(r.length<o)throw new Error(`UPDATE \u53C2\u6570\u4E0D\u8DB3 (SET \u9700\u8981 ${o}, \u5B9E\u9645 ${r.length})`);let a=r.slice(0,o),i=r.slice(o),l=0;for(let c of n.rows)if($c(c,s.where,i)){for(let d=0;d<o;d+=1)c[s.setCols[d]]=a[d];l+=1}return l>0&&this._markDirty(),{rowsAffected:l,lastInsertRowid:null}}_doDelete(e,r){let s=Cv(e);if(!s)throw new Error(`\u65E0\u6CD5\u89E3\u6790 DELETE: ${e}`);let n=this._tables.get(s.name);if(!n)return{rowsAffected:0,lastInsertRowid:null};let o=n.rows.length;n.rows=n.rows.filter(i=>!$c(i,s.where,r));let a=o-n.rows.length;return a>0&&this._markDirty(),{rowsAffected:a,lastInsertRowid:null}}async batch({statements:e}={}){this._ensureReady();let r=[];for(let s of e||[])if(String(s.statement||"").trim().split(/\s+/)[0].toUpperCase()==="SELECT"){let o=await this.query(s);r.push({kind:"query",...o})}else{let o=await this.execute(s);r.push({kind:"exec",...o})}return{results:r}}async transaction({statements:e}={}){this._ensureReady();let r=this._snapshot();try{let{results:s}=await this.batch({statements:e});return this._flushSave(!0),{committed:!0,results:s}}catch(s){throw this._restore(r),Mn.warn("FallbackProvider \u4E8B\u52A1\u56DE\u6EDA",{error:s?.message||s}),s}}async paginate({statement:e,params:r=[],page:s={}}={}){this._ensureReady();let n=Number.isFinite(s?.limit)?s.limit:50,o=Number.isFinite(s?.offset)?s.offset:0,a=`${e} LIMIT ${n} OFFSET ${o}`;return this.query({statement:a,params:r})}async backup(){return this._ensureReady(),this._snapshot()}async export(){return this.backup()}async import(e){this._ensureReady(),this._restore(e||{}),this._markDirty(),this._flushSave(!0)}describe(){return{kind:this.kind,initialized:this._initialized,tables:this._tables.size,migrations:this._migrations.size,tableNames:[...this._tables.keys()]}}_snapshot(){let e={};for(let[r,s]of this._tables)e[r]={schema:s.schema,rows:JSON.parse(JSON.stringify(s.rows))};return{migrations:[...this._migrations],tables:e}}_restore(e){this._migrations=new Set(Array.isArray(e?.migrations)?e.migrations:[]),this._tables=new Map;for(let[r,s]of Object.entries(e?.tables||{}))this._tables.set(r,{schema:s.schema||{name:r,columns:[],pkCols:[]},rows:Array.isArray(s.rows)?s.rows:[]})}_markDirty(){this._dirty=!0,this._saveTimer&&clearTimeout(this._saveTimer),this._saveTimer=setTimeout(()=>this._flushSave(!1),300)}_flushSave(e){if(this._saveTimer&&(clearTimeout(this._saveTimer),this._saveTimer=null),!(!this._dirty&&!e))try{Se.set(mf,this._snapshot()),this._dirty=!1}catch(r){Mn.error("FallbackProvider \u6301\u4E45\u5316\u5931\u8D25",{error:r?.message||r})}}_ensureReady(){if(!this._initialized)throw new Error("FallbackProvider \u5C1A\u672A\u521D\u59CB\u5316")}},kv=si});var xf={};le(xf,{PROVIDER_KIND:()=>kn,createProvider:()=>Rv,detectAuthoritySdk:()=>ri,disposeToolDataProvider:()=>Mv,getCurrentProvider:()=>Pn,getToolDataProvider:()=>Do});function ri(){if(typeof window>"u")return null;try{let t=window.STAuthority?.AuthoritySDK;if(t)return t}catch{}try{if(window.parent&&window.parent!==window){let t=window.parent.STAuthority?.AuthoritySDK;if(t)return t}}catch{}return null}async function Bc({preferAuthority:t=!0,extensionVersion:e="1.0.149"}={}){if(t&&ri()){let{AuthorityProvider:s}=await Promise.resolve().then(()=>(gf(),ff));return new s({extensionVersion:e})}let{FallbackProvider:r}=await Promise.resolve().then(()=>(bf(),hf));return new r}async function Do(t={}){return Ks||Oo||(Oo=(async()=>{let e=await Bc({preferAuthority:!0,...t}),r=await e.init();if(!r&&e.kind===kn.AUTHORITY){Lc.warn("AuthorityProvider \u521D\u59CB\u5316\u5931\u8D25\uFF0C\u964D\u7EA7\u5230 FallbackProvider");try{await e.dispose()}catch{}e=await Bc({preferAuthority:!1}),r=await e.init()}return r?Lc.info(`Provider \u521D\u59CB\u5316\u5B8C\u6210: kind=${e.kind}`):Lc.error(`Provider \u5168\u90E8\u521D\u59CB\u5316\u5931\u8D25 (kind=${e.kind})`),Ks=e,e})(),Oo)}function Pn(){return Ks}async function Rv(t={}){let e=await Bc(t);return await e.init(),e}async function Mv(){if(Ks){try{await Ks.dispose()}catch{}Ks=null}Oo=null}var Lc,kn,Ks,Oo,Rn=N(()=>{H();Lc=C.createScope("ToolDataProvider"),kn=Object.freeze({AUTHORITY:"authority",FALLBACK:"fallback"}),Ks=null,Oo=null});var Hc={};le(Hc,{clearChatScopeConfig:()=>Nf,clearLockEntry:()=>If,clearScopeLocks:()=>Rf,clearSheetLocks:()=>kf,clearSlot:()=>Af,commitSlotTables:()=>ii,default:()=>Nv,deleteRowsBySheet:()=>Sf,deleteSheetsBySlot:()=>ai,ensureTableDataReady:()=>Xe,getChatScopeConfig:()=>Mf,getCurrentTableDataProvider:()=>vf,getLocksForSheet:()=>Ef,getRowsBySheet:()=>Wc,getSheetsBySlot:()=>jc,loadSlotTables:()=>_f,setChatScopeConfig:()=>Pf,setLockEntry:()=>Cf,upsertSheetMeta:()=>Uc,upsertSheetRows:()=>Fc});function Kc(){return zc||(zc=C.createScope("TableDataService")),zc}async function Xe(){return wf?Pn():Lo||(Lo=(async()=>{try{let t=await Do();if(!t)return Kc().error("Provider \u4E0D\u53EF\u7528\uFF0C\u8DF3\u8FC7 migration"),null;let e=await t.migrate({migrations:[...Pv]});return wf=!0,Kc().info("\u8868\u683C\u6570\u636E migration \u5B8C\u6210",{kind:t.kind,applied:e?.applied?.length||0,skipped:e?.skipped?.length||0}),t}catch(t){return Kc().error("table-data-service migration \u5931\u8D25",t),null}finally{Lo=null}})(),Lo)}function vf(){return Pn()}function Tf(){return Date.now()}function ni(t){try{return JSON.stringify(t)}catch{return"{}"}}function oi(t,e=null){if(typeof t!="string")return e;try{return JSON.parse(t)}catch{return e}}function rs(t={}){return{chatId:String(t.chatId??"").trim(),messageId:String(t.messageId??"").trim(),swipeId:String(t.swipeId??"0").trim()||"0",isolationKey:Ce(t.isolationKey)}}function ss(t){return t&&t.chatId&&t.messageId}async function Uc(t,e){let r=await Xe();if(!r)return!1;let s=rs(t);return!ss(s)||!e?.uid?!1:(await r.execute({statement:`INSERT INTO table_sheets
      (chat_id, message_id, swipe_id, isolation_key, sheet_uid, name, columns_json, meta_json, order_no, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,params:[s.chatId,s.messageId,s.swipeId,s.isolationKey,String(e.uid),String(e.name??e.uid),ni(Array.isArray(e.columns)?e.columns:[]),ni(e.meta||e.sourceData||{}),Number.isFinite(e.orderNo)?e.orderNo:0,Tf()]}),!0)}async function jc(t){let e=await Xe();if(!e)return[];let r=rs(t);return ss(r)?((await e.query({statement:`SELECT * FROM table_sheets
      WHERE chat_id = ? AND message_id = ? AND swipe_id = ? AND isolation_key = ?
      ORDER BY order_no ASC`,params:[r.chatId,r.messageId,r.swipeId,r.isolationKey]}))?.rows||[]).map(n=>({uid:n.sheet_uid,name:n.name,columns:oi(n.columns_json,[]),meta:oi(n.meta_json,{}),orderNo:n.order_no||0,updatedAt:n.updated_at||0})):[]}async function ai(t){let e=await Xe();if(!e)return 0;let r=rs(t);return ss(r)&&(await e.execute({statement:`DELETE FROM table_sheets
      WHERE chat_id = ? AND message_id = ? AND swipe_id = ? AND isolation_key = ?`,params:[r.chatId,r.messageId,r.swipeId,r.isolationKey]}))?.rowsAffected||0}async function Fc(t,e,r){let s=await Xe();if(!s)return!1;let n=rs(t);if(!ss(n)||!e||!Array.isArray(r))return!1;if(await s.execute({statement:`DELETE FROM table_rows
      WHERE chat_id = ? AND message_id = ? AND swipe_id = ? AND isolation_key = ? AND sheet_uid = ?`,params:[n.chatId,n.messageId,n.swipeId,n.isolationKey,String(e)]}),r.length===0)return!0;let o=r.map((a,i)=>({statement:`INSERT INTO table_rows
      (chat_id, message_id, swipe_id, isolation_key, sheet_uid, row_index, row_id, row_name, cells_json)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,params:[n.chatId,n.messageId,n.swipeId,n.isolationKey,String(e),i,String(a?.id??""),String(a?.name??""),ni(a?.cells||{})]}));return typeof s.transaction=="function"?await s.transaction({statements:o}):await s.batch({statements:o}),!0}async function Wc(t,e){let r=await Xe();if(!r)return[];let s=rs(t);return!ss(s)||!e?[]:((await r.query({statement:`SELECT * FROM table_rows
      WHERE chat_id = ? AND message_id = ? AND swipe_id = ? AND isolation_key = ? AND sheet_uid = ?
      ORDER BY row_index ASC`,params:[s.chatId,s.messageId,s.swipeId,s.isolationKey,String(e)]}))?.rows||[]).map(o=>({id:o.row_id||"",name:o.row_name||"",cells:oi(o.cells_json,{}),rowIndex:o.row_index}))}async function Sf(t,e){let r=await Xe();if(!r)return 0;let s=rs(t);return!ss(s)||!e?0:(await r.execute({statement:`DELETE FROM table_rows
      WHERE chat_id = ? AND message_id = ? AND swipe_id = ? AND isolation_key = ? AND sheet_uid = ?`,params:[s.chatId,s.messageId,s.swipeId,s.isolationKey,String(e)]}))?.rowsAffected||0}async function _f(t){let e=await jc(t);if(e.length===0)return[];let r=[];for(let s of e){let n=await Wc(t,s.uid);r.push({id:s.uid,uid:s.uid,name:s.name,columns:s.columns,rows:n,meta:s.meta,orderNo:s.orderNo,updatedAt:s.updatedAt})}return r}async function ii(t,e){let r=await Xe();if(!r)return!1;let s=rs(t);if(!ss(s)||!Array.isArray(e))return!1;await ai(s),await r.execute({statement:`DELETE FROM table_rows
      WHERE chat_id = ? AND message_id = ? AND swipe_id = ? AND isolation_key = ?`,params:[s.chatId,s.messageId,s.swipeId,s.isolationKey]});for(let n=0;n<e.length;n++){let o=e[n],a=String(o?.uid||o?.id||`sheet_${n+1}`);await Uc(s,{uid:a,name:o?.name||a,columns:o?.columns||[],meta:o?.meta||{},orderNo:Number.isFinite(o?.orderNo)?o.orderNo:n}),await Fc(s,a,Array.isArray(o?.rows)?o.rows:[])}return!0}async function Af(t){let e=await Xe();if(!e)return!1;let r=rs(t);return ss(r)?(await ai(r),await e.execute({statement:`DELETE FROM table_rows
      WHERE chat_id = ? AND message_id = ? AND swipe_id = ? AND isolation_key = ?`,params:[r.chatId,r.messageId,r.swipeId,r.isolationKey]}),!0):!1}async function Ef(t,e){let r=await Xe();if(!r)return[];let s=String(t?.chatId??"").trim(),n=Ce(t?.isolationKey);return!s||!e?[]:((await r.query({statement:`SELECT lock_type, target FROM table_locks
      WHERE chat_id = ? AND isolation_key = ? AND sheet_uid = ?`,params:[s,n,String(e)]}))?.rows||[]).map(a=>({lockType:a.lock_type,target:a.target||""}))}async function Cf(t,e,r,s=""){let n=await Xe();if(!n)return!1;let o=String(t?.chatId??"").trim(),a=Ce(t?.isolationKey);return!o||!e||!r?!1:(await n.execute({statement:"INSERT INTO table_locks (chat_id, isolation_key, sheet_uid, lock_type, target) VALUES (?, ?, ?, ?, ?)",params:[o,a,String(e),String(r),String(s)]}),!0)}async function If(t,e,r,s=""){let n=await Xe();if(!n)return!1;let o=String(t?.chatId??"").trim(),a=Ce(t?.isolationKey);return!o||!e||!r?!1:(await n.execute({statement:`DELETE FROM table_locks
      WHERE chat_id = ? AND isolation_key = ? AND sheet_uid = ? AND lock_type = ? AND target = ?`,params:[o,a,String(e),String(r),String(s)]}),!0)}async function kf(t,e){let r=await Xe();if(!r)return!1;let s=String(t?.chatId??"").trim(),n=Ce(t?.isolationKey);return!s||!e?!1:(await r.execute({statement:`DELETE FROM table_locks
      WHERE chat_id = ? AND isolation_key = ? AND sheet_uid = ?`,params:[s,n,String(e)]}),!0)}async function Rf(t){let e=await Xe();if(!e)return!1;let r=String(t?.chatId??"").trim(),s=Ce(t?.isolationKey);return r?(await e.execute({statement:"DELETE FROM table_locks WHERE chat_id = ? AND isolation_key = ?",params:[r,s]}),!0):!1}async function Mf(t){let e=await Xe();if(!e)return null;let r=String(t??"").trim();if(!r)return null;let n=(await e.query({statement:"SELECT scoped_config_json FROM table_chat_scope WHERE chat_id = ?",params:[r]}))?.rows?.[0];return n?oi(n.scoped_config_json,null):null}async function Pf(t,e){let r=await Xe();if(!r)return!1;let s=String(t??"").trim();return s?(await r.execute({statement:"INSERT INTO table_chat_scope (chat_id, scoped_config_json, updated_at) VALUES (?, ?, ?)",params:[s,ni(e||{}),Tf()]}),!0):!1}async function Nf(t){let e=await Xe();if(!e)return!1;let r=String(t??"").trim();return r?(await e.execute({statement:"DELETE FROM table_chat_scope WHERE chat_id = ?",params:[r]}),!0):!1}var zc,Pv,wf,Lo,Nv,li=N(()=>{H();Rn();Le();Pv=Object.freeze([{id:"table_engine_v1__sheets",statement:`
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
    `.replace(/\s+/g," ").trim()}]),wf=!1,Lo=null;Nv={ensureTableDataReady:Xe,getCurrentTableDataProvider:vf,upsertSheetMeta:Uc,getSheetsBySlot:jc,deleteSheetsBySlot:ai,upsertSheetRows:Fc,getRowsBySheet:Wc,deleteRowsBySheet:Sf,loadSlotTables:_f,commitSlotTables:ii,clearSlot:Af,getLocksForSheet:Ef,setLockEntry:Cf,clearLockEntry:If,clearSheetLocks:kf,clearScopeLocks:Rf,getChatScopeConfig:Mf,setChatScopeConfig:Pf,clearChatScopeConfig:Nf}});function Mr(){return Gc||(Gc=C.createScope("TableChatScope")),Gc}function br(){let t=globalThis.window||globalThis,e=t?.TavernHelper?.getCurrentChatId?.()||t?.Silvy?.getCurrentChatId?.()||t?.chat_metadata?.chat_id||t?.this_chid||t?.name1;return String(e??"").trim()||"default_chat"}function di(){return new Date().toISOString()}function Nn(t){return t!==null&&typeof t=="object"&&!Array.isArray(t)}function Rr(t){let e=Yc.get(qc,{}),s=(Nn(e)?e:{})[t];return Of(s)}function Us(t,e){let r=Yc.get(qc,{}),s=Nn(r)?r:{};s[t]=e,Yc.set(qc,s),Ov(t,e).catch(()=>{})}async function Ov(t,e){try{let r=await Promise.resolve().then(()=>(li(),Hc));await r.ensureTableDataReady(),await r.setChatScopeConfig(t,e||{})}catch(r){Mr().warn("chat-scope SQL \u955C\u50CF\u5931\u8D25\uFF08\u4E0D\u5F71\u54CD\u4E3B\u6D41\u7A0B\uFF09",{error:r?.message||String(r)})}}function $f(){return{template:{},templateArchives:{}}}function Of(t){return Nn(t)?{template:Nn(t.template)?t.template:{},templateArchives:Nn(t.templateArchives)?t.templateArchives:{}}:$f()}function ci(t){return Nn(t)?{mode:Dv.has(t.mode)?t.mode:Ve.INHERIT_GLOBAL,presetName:typeof t.presetName=="string"?t.presetName:"",templateStr:typeof t.templateStr=="string"?t.templateStr:"",guideData:t.guideData!==void 0?oe(t.guideData):null,updatedAt:typeof t.updatedAt=="string"?t.updatedAt:di(),source:typeof t.source=="string"?t.source:"ui"}:null}function Lv(t){let e=[t.mode||"",t.presetName||"",t.templateStr||""],r=5381,s=e.join("||");for(let n=0;n<s.length;n++)r=(r<<5)+r+s.charCodeAt(n),r|=0;return String(r)}var $v,qc,Gc,Yc,Dv,Vc,xr,Df=N(()=>{He();H();Le();kr();$v="tableChatScope",qc="chats";Yc=z.namespace($v);Dv=new Set(Object.values(Ve));Vc=class{getScopedConfig(e=br()){return Rr(e)}setScopedConfig(e,r=br()){let s=Of(e);return Us(r,s),s}getTemplateScope(e,r=br()){let s=Ce(e===void 0?ne.getKey():e),n=Rr(r);return ci(n.template[s])||null}setTemplateScope(e,r,s=br()){let n=Ce(r===void 0?ne.getKey():r),o=ci({...e,updatedAt:di()});if(!o)return Mr().warn("setTemplateScope \u6536\u5230\u65E0\u6548 state",e),null;let a=Rr(s);return a.template[n]=o,Us(s,a),Mr().info("\u6A21\u677F\u4F5C\u7528\u57DF\u5DF2\u66F4\u65B0",{chatId:s,isolationKey:n,mode:o.mode}),o}clearTemplateScope(e,r=br()){let s=Ce(e===void 0?ne.getKey():e),n=Rr(r);n.template[s]!==void 0&&(delete n.template[s],Us(r,n),Mr().info("\u6A21\u677F\u4F5C\u7528\u57DF\u5DF2\u6E05\u9664",{chatId:r,isolationKey:s}))}archiveCurrentTemplate(e,r=br()){let s=Ce(e===void 0?ne.getKey():e),n=Rr(r),o=ci(n.template[s]);if(!o)return null;let a=Lv(o),i=Array.isArray(n.templateArchives[s])?n.templateArchives[s]:[];if(i.length>0&&i[0].fingerprint===a)return null;let l={fingerprint:a,state:oe(o),archivedAt:di()},c=[l,...i].slice(0,qy);return n.templateArchives[s]=c,Us(r,n),Mr().info("\u6A21\u677F\u5DF2\u5F52\u6863",{chatId:r,isolationKey:s,archiveCount:c.length}),l}listTemplateArchives(e,r=br()){let s=Ce(e===void 0?ne.getKey():e),n=Rr(r);return(Array.isArray(n.templateArchives[s])?n.templateArchives[s]:[]).map(a=>oe(a))}restoreTemplateArchive(e,r,s=br()){let n=Ce(r===void 0?ne.getKey():r),o=Rr(s),a=Array.isArray(o.templateArchives[n])?o.templateArchives[n]:[],i=a[e];if(!i)return Mr().warn("restoreTemplateArchive: \u627E\u4E0D\u5230 archive",{index:e,available:a.length}),null;this.archiveCurrentTemplate(n,s);let l=ci({...i.state,source:"restore",updatedAt:di()});if(!l)return null;let c=Rr(s);return c.template[n]=l,Us(s,c),Mr().info("\u6A21\u677F\u5DF2\u6062\u590D",{chatId:s,isolationKey:n,fromArchiveIndex:e}),l}clearTemplateArchives(e,r=br()){let s=Ce(e===void 0?ne.getKey():e),n=Rr(r);Array.isArray(n.templateArchives[s])&&(delete n.templateArchives[s],Us(r,n),Mr().info("\u6A21\u677F\u5F52\u6863\u5DF2\u6E05\u7A7A",{chatId:r,isolationKey:s}))}resetChat(e=br()){Us(e,$f()),Mr().warn("\u5DF2\u91CD\u7F6E chat \u7684 ScopedConfig",{chatId:e})}},xr=new Vc});var Lf,Bf=N(()=>{Le();Lf=Object.freeze({formatId:"youyou",displayName:"YouYou \u539F\u751F (tables \u6570\u7EC4)",detect(t){return!t||typeof t!="object"||Array.isArray(t)?!1:Array.isArray(t.tables)},parse(t){if(!t||typeof t!="object")throw new Error("youyou-importer: raw \u4E0D\u662F\u5BF9\u8C61");return{tables:Array.isArray(t.tables)?oe(t.tables):[],name:typeof t.name=="string"?t.name:"",description:typeof t.description=="string"?t.description:"",promptTemplate:typeof t.promptTemplate=="string"?t.promptTemplate:""}}})});function wr(t,e=""){return t==null?e:String(t).trim()||e}function zf(t){return t&&typeof t=="object"&&Array.isArray(t.content)}function Kf(t){return!t||typeof t!="object"?null:t.tables&&typeof t.tables=="object"&&!Array.isArray(t.tables)&&Object.keys(t.tables).filter(s=>s.startsWith("sheet_")&&zf(t.tables[s])).length>0?t.tables:Object.keys(t).filter(r=>r.startsWith("sheet_")&&zf(t[r])).length>0?t:null}function Bv(t){return!t||typeof t!="object"?[]:Object.keys(t).filter(r=>r.startsWith("sheet_")&&t[r]&&typeof t[r]=="object").map((r,s)=>({key:r,table:t[r],fallbackOrder:s})).sort((r,s)=>{let n=Number.isFinite(r.table.orderNo)?r.table.orderNo:r.fallbackOrder,o=Number.isFinite(s.table.orderNo)?s.table.orderNo:s.fallbackOrder;return n-o}).map(({key:r,table:s},n)=>{let o=s.sourceData&&typeof s.sourceData=="object"?s.sourceData:{},a=Array.isArray(s.content)?s.content:[],i=Array.isArray(a[0])?a[0]:[],l=Cc(o.note),c=new Set,d=i.slice(1).map((y,p)=>{let g=l[p]||{},m=wr(y||g.title,`\u5217${p+1}`);return{key:Zr(m||`col_${p+1}`,c),title:m,description:wr(g.description,""),type:"text",required:!1}}),u=a.slice(1).map((y,p)=>{let g=Array.isArray(y)?y:[],m={};return d.forEach((h,x)=>{m[h.key]=Qr(g[x+1])}),{name:wr(g[0],`\u884C${p+1}`),cells:m}});return{id:wr(s.uid||r,`sheet_${n+1}`),name:wr(s.name,`\u8868${n+1}`),note:wr(o.note,""),enabled:s.enabled!==!1,aiInstructions:{init:wr(o.initNode,""),create:wr(o.insertNode,""),update:wr(o.updateNode,""),delete:wr(o.deleteNode,"")},columns:d,rows:u}})}var Uf,jf=N(()=>{Le();qt();Uf=Object.freeze({formatId:"shujuku",displayName:"shujuku \u6570\u636E\u5E93\u683C\u5F0F (sheet_x)",detect(t){return!t||typeof t!="object"||Array.isArray(t)?!1:Kf(t)!==null},parse(t){let e=Kf(t);if(!e)throw new Error("shujuku-importer: \u672A\u627E\u5230 sheet_xxx \u5165\u53E3");return{tables:Bv(e),name:typeof t.name=="string"?t.name:"",description:typeof t.description=="string"?t.description:""}}})});var Ff,Wf=N(()=>{Ff=Object.freeze({formatId:"youyou",displayName:"YouYou \u539F\u751F (.json)",fileExtension:".json",mimeType:"application/json",serialize(t){return{version:1,exportedAt:new Date().toISOString(),templates:Array.isArray(t)?t:[]}}})});function Bo(){return Jc||(Jc=C.createScope("TemplateAdapter")),Jc}function Hf(t){if(t==null)return null;for(let e of zv){let r=!1;try{r=e.detect(t)}catch(s){Bo().warn(`importer ${e.formatId} detect \u629B\u9519`,s);continue}if(r)try{let s=e.parse(t);if(s&&Array.isArray(s.tables))return Bo().debug("\u9002\u914D\u5668\u547D\u4E2D",{formatId:e.formatId,displayName:e.displayName,tableCount:s.tables.length,firstTableName:s.tables[0]?.name||""}),{...s,formatId:e.formatId};Bo().warn(`importer ${e.formatId} parse \u8FD4\u56DE\u65E0\u6548\u7ED3\u6784`,{hasResult:!!s,hasTablesArray:Array.isArray(s?.tables)})}catch(s){Bo().warn(`importer ${e.formatId} parse \u629B\u9519\uFF0C\u5C1D\u8BD5\u4E0B\u4E00\u4E2A`,s)}}return Bo().warn("importTemplateAuto: \u65E0\u9002\u914D\u5668\u547D\u4E2D",{isObject:t&&typeof t=="object",isArray:Array.isArray(t),keys:t&&typeof t=="object"?Object.keys(t).slice(0,10):[]}),null}var Jc,zv,L1,Gf=N(()=>{H();Bf();jf();Wf();zv=Object.freeze([Lf,Uf]),L1=Object.freeze([Ff])});function Ct(){return Xc||(Xc=C.createScope("TableTemplate")),Xc}function ct(t,e=""){return t==null?e:String(t).trim()||e}function qf(t="template"){return`${t}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`}function On(t={}){let e=Hf(t),r=[],s="",n="",o="",a="";e?(r=e.tables,s=e.formatId||"",n=e.name||"",o=e.description||"",a=e.promptTemplate||""):t&&typeof t=="object"&&Ct().warn("normalizeTemplate: \u65E0\u9002\u914D\u5668\u547D\u4E2D\uFF0C\u6309\u7A7A\u6A21\u677F\u5904\u7406",{keys:Object.keys(t).slice(0,10)});let i=ei({tables:r});return{id:ct(t?.id,qf()),name:ct(t?.name||n,"\u672A\u547D\u540D\u6A21\u677F"),description:ct(t?.description||o,""),tables:i.tables||r,promptTemplate:ct(t?.promptTemplate||a,""),sourceFormat:s,createdAt:ct(t?.createdAt,new Date().toISOString()),updatedAt:ct(t?.updatedAt,new Date().toISOString())}}function Yf(){zo=null}function Vf(){return[On({id:Tt,name:Sc,description:"\u5305\u542B\u5168\u5C40\u6570\u636E\u3001\u4E3B\u89D2\u3001\u91CD\u8981\u89D2\u8272\u3001\u6280\u80FD\u3001\u80CC\u5305\u3001\u4EFB\u52A1\u3001\u7EAA\u8981\u548C\u9009\u9879\u8868\u3002",tables:oe(An)})]}function js(){let t=$n.get(Qc,[]);return Array.isArray(t)?t.map(On):[]}function os(){if(zo)return zo;let t=Vf(),e=js(),r=new Map(e.map(o=>[o.id,o])),s=t.map(o=>r.has(o.id)?r.get(o.id):o),n=new Set(t.map(o=>o.id));for(let o of e)n.has(o.id)||s.push(o);return zo=Object.freeze(s),zo}function zs(t){let e=ct(t,"");return os().find(r=>r.id===e)||null}function es(t={}){let e=new Date().toISOString(),r=On({...t,id:ct(t.id,qf()),updatedAt:e,createdAt:ct(t.createdAt,e)}),n=js().filter(o=>o.id!==r.id);return n.push(r),$n.set(Qc,n),Yf(),{success:!0,template:r}}function ed(t){let e=ct(t,"");if(!e||e===Tt)return{success:!1,error:"\u5185\u7F6E\u6A21\u677F\u4E0D\u80FD\u5220\u9664\u3002"};let r=js().filter(s=>s.id!==e);return $n.set(Qc,r),Yf(),Kv()===e&&td(Tt),{success:!0}}function Jf(t,e){let r=ct(t,"");if(!r||r===Tt)return{success:!1,error:"\u5185\u7F6E\u6A21\u677F\u4E0D\u80FD\u91CD\u547D\u540D\u3002"};let s=ct(e,"");if(!s)return{success:!1,error:"\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A\u3002"};let n=zs(r);return n?es({...n,name:s}):{success:!1,error:"\u6A21\u677F\u4E0D\u5B58\u5728\u3002"}}function ui(){return{version:1,exportedAt:new Date().toISOString(),templates:js()}}function Xf(t,{overwrite:e=!1}={}){let r;if(Array.isArray(t))r=t;else if(t&&typeof t=="object")Array.isArray(t.templates)?r=t.templates:t.template&&typeof t.template=="object"?r=[t.template]:r=[t];else return{success:!1,imported:0,skipped:0,errors:["\u65E0\u6548\u7684\u5BFC\u5165\u6570\u636E\u683C\u5F0F\u3002"]};Ct().info("importTemplates \u5F00\u59CB",{rawListCount:r.length,overwrite:e});let s=new Set(js().map(i=>i.id)),n=0,o=0,a=[];for(let i of r)try{let l=On(i);if(Ct().info("importTemplates \u5355\u6761",{id:l.id,name:l.name,tableCount:Array.isArray(l.tables)?l.tables.length:0,firstTableName:l.tables?.[0]?.name||""}),!e&&s.has(l.id)){o++;continue}es(l),s.add(l.id),n++}catch(l){a.push(ct(l?.message,"\u672A\u77E5\u9519\u8BEF")),Ct().error("importTemplates \u5355\u6761\u5931\u8D25",l)}return Ct().info("importTemplates \u5B8C\u6210",{imported:n,skipped:o,errorCount:a.length}),{success:!0,imported:n,skipped:o,errors:a}}function Kv(){let t=$n.get(Zc,""),e=ct(t,Tt);return zs(e)?e:Tt}function td(t){let e=ct(t,Tt);return $n.set(Zc,e),Ct().info("\u5168\u5C40\u6FC0\u6D3B\u6A21\u677F\u5DF2\u5207\u6362",{templateId:e}),e}function ns(){let t=$n.get(Zc,""),e=ct(t,Tt),r=zs(e);return r||Vf()[0]}function Uv(t){try{return JSON.stringify(t)}catch(e){return Ct().error("templateToString \u5931\u8D25",e),""}}function jv(t){if(!t||typeof t!="string")return null;try{let e=JSON.parse(t);return On(e)}catch(e){return Ct().warn("templateFromString \u53CD\u5E8F\u5217\u5316\u5931\u8D25",e),null}}function Dn({chatId:t,isolationKey:e}={}){let r=e===void 0?ne.getKey():e,s=xr.getTemplateScope(r,t);if(!s||s.mode===Ve.INHERIT_GLOBAL){let o=ns();return Ct().debug("resolveActiveTemplate: inherit_global",{chatId:t,isolationKey:r,templateId:o?.id||"",templateName:o?.name||"",tableCount:Array.isArray(o?.tables)?o.tables.length:0,firstTableName:o?.tables?.[0]?.name||""}),{template:o,mode:Ve.INHERIT_GLOBAL,source:{templateId:o?.id||""}}}if(s.mode===Ve.CHAT_OVERRIDE){let o=jv(s.templateStr);if(o)return{template:o,mode:Ve.CHAT_OVERRIDE,source:{}};Ct().warn("chat_override templateStr \u53CD\u5E8F\u5217\u5316\u5931\u8D25\uFF0C\u964D\u7EA7\u5230 inherit_global");let a=ns();return{template:a,mode:Ve.INHERIT_GLOBAL,source:{templateId:a?.id||"",fallback:!0}}}if(s.mode===Ve.PRESET_LINK){let o=s.presetName||"",a=os(),i=a.find(c=>c.name===o)||a.find(c=>c.id===o);if(i)return{template:i,mode:Ve.PRESET_LINK,source:{presetName:o,templateId:i.id}};Ct().warn("preset_link \u6307\u5411\u7684\u5168\u5C40\u9884\u8BBE\u4E0D\u5B58\u5728\uFF0C\u964D\u7EA7\u5230 inherit_global",{presetName:o});let l=ns();return{template:l,mode:Ve.INHERIT_GLOBAL,source:{templateId:l?.id||"",presetName:o,fallback:!0}}}let n=ns();return{template:n,mode:Ve.INHERIT_GLOBAL,source:{templateId:n?.id||"",unknownMode:s.mode}}}function Qf(t,e={}){if(!t||typeof t!="object")return{success:!1,error:"\u6A21\u677F\u4E0D\u80FD\u4E3A\u7A7A"};let r=On(t),s=e.isolationKey===void 0?ne.getKey():e.isolationKey;xr.archiveCurrentTemplate(s,e.chatId);let n=xr.setTemplateScope({mode:Ve.CHAT_OVERRIDE,templateStr:Uv(r),source:e.source||"ui"},s,e.chatId);return Ct().info("applyTemplateAsChatOverride",{chatId:e.chatId,isolationKey:s,templateName:r.name}),{success:!0,scopeState:n}}function Zf(t,e={}){let r=ct(t,"");if(!r)return{success:!1,error:"presetName \u4E0D\u80FD\u4E3A\u7A7A"};let s=os(),n=s.find(i=>i.name===r)||s.find(i=>i.id===r);if(!n)return{success:!1,error:"\u627E\u4E0D\u5230\u6307\u5B9A\u7684\u5168\u5C40\u9884\u8BBE"};let o=e.isolationKey===void 0?ne.getKey():e.isolationKey;xr.archiveCurrentTemplate(o,e.chatId);let a=xr.setTemplateScope({mode:Ve.PRESET_LINK,presetName:n.name,source:e.source||"ui"},o,e.chatId);return Ct().info("linkPresetToChat",{chatId:e.chatId,isolationKey:o,presetName:n.name}),{success:!0,scopeState:a}}function eg(t={}){let e=t.isolationKey===void 0?ne.getKey():t.isolationKey;return t.archive!==!1&&xr.archiveCurrentTemplate(e,t.chatId),xr.clearTemplateScope(e,t.chatId),Ct().info("resetChatTemplateScope",{chatId:t.chatId,isolationKey:e}),{success:!0}}function tg(t={}){let e=t.isolationKey===void 0?ne.getKey():t.isolationKey;return xr.listTemplateArchives(e,t.chatId)}function rg(t,e={}){let r=e.isolationKey===void 0?ne.getKey():e.isolationKey,s=xr.restoreTemplateArchive(t,r,e.chatId);return s?{success:!0,scopeState:s}:{success:!1,error:"\u5F52\u6863\u4E0D\u5B58\u5728"}}var $n,Qc,Zc,Xc,zo,Cn=N(()=>{He();H();qt();Le();Df();kr();Gf();$n=z.namespace("tableWorkbenchTemplates"),Qc="templates",Zc="activeId";zo=null});var og={};le(og,{TableTemplatePanel:()=>ng,default:()=>qv});function rd(t){return t===Tt}function Hv(t,{onChange:e,readonly:r}){let s=f("div",{style:{display:"flex",flexDirection:"column",gap:"12px"}});G(s,$t({label:"\u63CF\u8FF0",control:ge({value:t.description||"",placeholder:"\u53EF\u9009 \u2014 \u5907\u6CE8\u7528\u9014",disabled:r,onChange:a=>e({description:a})})})),G(s,f("div",{text:"\u586B\u8868\u63D0\u793A\u8BCD\u6A21\u677F",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}})),G(s,f("div",{text:"\u53EF\u4F7F\u7528\u5B8F\uFF1A{{tableData}} {{lastUserMessage}} {{lastAiMessage}} {{toolWorldbookContent}} \u7B49\u3002\u7559\u7A7A\u4F7F\u7528\u9ED8\u8BA4\u6A21\u677F\u3002",style:{fontSize:"11px",color:"var(--yyt-text-muted)",lineHeight:"1.6",marginBottom:"4px"}}));let n=f("textarea",{className:"yyt-textarea",attrs:{rows:"8",placeholder:"\u53EF\u9009 \u2014 \u81EA\u5B9A\u4E49\u586B\u8868\u63D0\u793A\u8BCD",disabled:r?"disabled":null},style:{width:"100%",resize:"vertical",fontFamily:"ui-monospace, monospace",fontSize:"12px"}});n.value=t.promptTemplate||"",n.addEventListener("change",()=>{r||e({promptTemplate:n.value})}),G(s,n),G(s,f("div",{text:`\u8868\u683C\u7ED3\u6784\uFF08${(t.tables||[]).length} \u5F20\u8868\uFF09`,style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)",marginTop:"6px"}})),G(s,f("div",{text:"\u672C\u9762\u677F\u53EA\u5C55\u793A\u8868\u7ED3\u6784 JSON\u3002\u590D\u6742 schema \u7F16\u8F91\uFF08\u589E\u5220\u8868\u3001\u5217\u5B9A\u4E49\u3001\u9ED8\u8BA4\u884C\uFF09\u5C06\u5728\u586B\u8868\u5DE5\u4F5C\u53F0\u4E2D\u63D0\u4F9B\u3002",style:{fontSize:"11px",color:"var(--yyt-text-muted)",lineHeight:"1.6",marginBottom:"4px"}}));let o=f("pre",{style:{padding:"10px 12px",background:"var(--yyt-bg-base)",border:"1px solid var(--yyt-border)",borderRadius:"var(--yyt-radius-sm, 6px)",fontFamily:"ui-monospace, monospace",fontSize:"11px",lineHeight:"1.6",color:"var(--yyt-text-secondary)",maxHeight:"260px",overflow:"auto",whiteSpace:"pre",margin:"0"}});try{o.textContent=JSON.stringify(t.tables||[],null,2)}catch{o.textContent="// \u65E0\u6CD5\u5E8F\u5217\u5316"}return G(s,o),s}function Gv(t){let r=[`${(t.tables||[]).length} \u5F20\u8868`];return t.promptTemplate&&r.push("\u81EA\u5B9A\u4E49\u6A21\u677F"),r}var Fv,sg,Wv,ng,qv,ag=N(()=>{tr();Cn();qt();H();ho();Fv=C.createScope("TableTemplatePanel"),sg="";Wv={listPresets(){return os().map(t=>({id:rd(t.id)?`builtin_table_${t.id}`:t.id,name:t.name,description:t.description||"",promptTemplate:t.promptTemplate||"",tables:t.tables||[],_rawId:t.id,createdAt:t.createdAt,updatedAt:t.updatedAt}))},getPreset(t){if(!t)return null;let e=t.startsWith("builtin_table_")?t.slice(14):t,r=zs(e);return r?{id:rd(r.id)?`builtin_table_${r.id}`:r.id,name:r.name,description:r.description||"",promptTemplate:r.promptTemplate||"",tables:r.tables||[],_rawId:r.id,createdAt:r.createdAt,updatedAt:r.updatedAt}:null},getCurrentPresetId(){return sg||""},setCurrentPresetId(t){return sg=t||"",!0},createPreset(t){let e=String(t?.name||"").trim()||"\u65B0\u5EFA\u6A21\u677F",r=es({name:e,description:t?.description||"",promptTemplate:t?.promptTemplate||"",tables:Array.isArray(t?.tables)?t.tables:[]});return r?.success?{id:r.template.id,...r.template,_rawId:r.template.id}:null},updatePreset(t,e){if(!t)return null;let r=t.startsWith("builtin_table_")?t.slice(14):t;if(rd(r))return Fv.warn("\u62D2\u7EDD\u4FEE\u6539\u5185\u7F6E\u8868\u683C\u6A21\u677F"),null;let s=zs(r);if(!s)return null;let n=es({...s,...e,id:r});return n?.success?{id:n.template.id,...n.template,_rawId:n.template.id}:null},deletePreset(t){if(!t)return!1;let e=t.startsWith("builtin_table_")?t.slice(14):t;return!!ed(e)?.success},duplicatePreset(t,e={}){let r=this.getPreset(t);if(!r)return null;let s=e.nameSuffix||" \u526F\u672C";return this.createPreset({name:`${r.name}${s}`,description:r.description,promptTemplate:r.promptTemplate,tables:r.tables})},renamePreset(t,e){if(!t||!e)return null;let r=t.startsWith("builtin_table_")?t.slice(14):t,s=Jf(r,e);return s?.success?this.getPreset(s.template?.id||r):null},exportAll(){return ui()},importPresets(t){let e=Xf(t,{overwrite:!1});return{added:e?.imported||0,skipped:e?.skipped||0}},resetAll(){let t=js();for(let e of t)try{ed(e.id)}catch{}}};ng=Kr({id:"tableTemplatePanel",kind:"table",panelTitle:"\u8868\u683C\u6A21\u677F",panelHint:"\u7BA1\u7406\u586B\u8868\u5DE5\u4F5C\u53F0\u7684\u8868\u683C\u7ED3\u6784\u6A21\u677F\u3002\u5728\u586B\u8868\u9762\u677F\u9876\u90E8\u5DE5\u5177\u680F\u53EF\u5FEB\u901F\u52A0\u8F7D/\u4FDD\u5B58\u5F53\u524D\u6A21\u677F\u3002",store:Wv,renderEditor:Hv,renderListItemMeta:Gv}),qv=ng});var lg={};le(lg,{ToolManagePanel:()=>ig,default:()=>Yv});var zt,ig,Yv,cg=N(()=>{at();H();_o();gr();zt=C.createScope("ToolManagePanel"),ig={id:"toolManagePanel",_removeDialog(t){if(!t?.length)return;let e=t.find("#yyt-tool-dialog-overlay");Nt(e,"yytToolManageDialogSelect"),e.remove()},_getToolkitWindow(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window},_openToolConfig(t){if(!t)return;let r=this._getToolkitWindow()?.YouYouToolkit||window.YouYouToolkit;if(!r){zt.warn("\u672A\u627E\u5230\u5DE5\u5177\u7BB1\u5B9E\u4F8B\uFF0C\u65E0\u6CD5\u8DF3\u8F6C\u5230\u5DE5\u5177\u914D\u7F6E",null,{toast:!0});return}r.switchMainTab("tools"),r.switchSubTab("tools",t)},render(t){let e=pr(),r=Object.entries(e),s=r.filter(([,n])=>n?.enabled!==!1).length;return`
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
    `},_renderToolList(t){let e=Object.entries(t);return e.length?`<div class="yyt-list-table">${e.map(([s,n])=>`
      <div class="yyt-list-row ${n.enabled?"yyt-tool-item-enabled":"yyt-tool-item-disabled"}" data-tool-id="${s}">
        <div class="yyt-list-row-icon" style="background: var(--yyt-accent-soft); color: var(--yyt-accent);">
          <i class="fa-solid fa-wrench"></i>
        </div>
        <div class="yyt-list-row-main">
          <div class="yyt-list-row-name">
            ${ce(n.name)}
            <span class="yyt-badge" style="background: var(--yyt-accent-soft); color: var(--yyt-accent); margin-left: 6px;">${ce(n.category)}</span>
          </div>
          <div class="yyt-list-row-desc">${ce(n.description)}</div>
        </div>
        <span class="yyt-status-dot ${n.enabled?"yyt-status-dot-on":"yyt-status-dot-off"}"></span>
        <label class="yyt-toggle yyt-small yyt-tool-toggle">
          <input type="checkbox" ${n.enabled?"checked":""}>
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
      `},bindEvents(t,e){let r=re();!r||!ke(t)||(t.off(".yytToolManage"),this._bindToolEvents(t,r),this._bindFileEvents(t,r))},_bindToolEvents(t,e){t.on("change.yytToolManage",".yyt-tool-toggle input",r=>{let s=e(r.currentTarget).closest(".yyt-list-row"),n=s.data("tool-id"),o=e(r.currentTarget).is(":checked");Ua(n,o),s.toggleClass("yyt-tool-item-enabled",o).toggleClass("yyt-tool-item-disabled",!o),s.find(".yyt-status-dot").toggleClass("yyt-status-dot-on",o).toggleClass("yyt-status-dot-off",!o),zt.info(o?"\u5DE5\u5177\u5DF2\u542F\u7528":"\u5DE5\u5177\u5DF2\u7981\u7528",null,{toast:!0})}),t.on("click.yytToolManage","#yyt-add-tool",()=>{this._showToolEditDialog(t,e,null)}),t.on("click.yytToolManage",'.yyt-list-row [data-action="config"]',r=>{let s=e(r.currentTarget).closest(".yyt-list-row").data("tool-id");this._openToolConfig(s)}),t.on("click.yytToolManage",'.yyt-list-row [data-action="edit"]',r=>{let s=e(r.currentTarget).closest(".yyt-list-row").data("tool-id");this._showToolEditDialog(t,e,s)}),t.on("click.yytToolManage",'.yyt-list-row [data-action="delete"]',async r=>{let s=e(r.currentTarget).closest(".yyt-list-row").data("tool-id"),n=yr(s);if(!s||!n||!await _r("\u5220\u9664\u5DE5\u5177",`\u786E\u5B9A\u8981\u5220\u9664\u5DE5\u5177"${n.name}"\u5417\uFF1F`,{danger:!0}))return;if(!gn(s)){zt.error("\u5220\u9664\u5931\u8D25",null,{toast:!0});return}this.renderTo(t),zt.info("\u5DE5\u5177\u5DF2\u5220\u9664",null,{toast:"success"})})},_bindFileEvents(t,e){t.on("click.yytToolManage","#yyt-import-tools",()=>{t.find("#yyt-import-tools-file").click()}),t.on("change.yytToolManage","#yyt-import-tools-file",async r=>{let s=r.target.files[0];if(s){try{let n=await lo(s),o=hn(n,{overwrite:!1});o.success?zt.info(o.message,null,{toast:"success"}):zt.error(o.message,null,{toast:!0}),o.success&&this.renderTo(t)}catch(n){zt.error(`\u5BFC\u5165\u5931\u8D25: ${n.message}`,null,{toast:!0})}e(r.target).val("")}}),t.on("click.yytToolManage","#yyt-export-tools",()=>{try{let r=mn();io(r,`youyou_toolkit_tools_${Date.now()}.json`),zt.info("\u5DE5\u5177\u5DF2\u5BFC\u51FA",null,{toast:"success"})}catch(r){zt.error(`\u5BFC\u51FA\u5931\u8D25: ${r.message}`,null,{toast:!0})}}),t.on("click.yytToolManage","#yyt-reset-tools",async()=>{await _r("\u91CD\u7F6E\u5DE5\u5177","\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u5DE5\u5177\u5417\uFF1F",{danger:!0})&&(bn(),this.renderTo(t),zt.info("\u5DE5\u5177\u5DF2\u91CD\u7F6E",null,{toast:!0}))})},_showToolEditDialog(t,e,r){let s=r?yr(r):null,n=!!s,o=`
      <div class="yyt-dialog-overlay" id="yyt-tool-dialog-overlay">
        <div class="yyt-dialog yyt-dialog-wide">
          <div class="yyt-dialog-header">
            <span class="yyt-dialog-title">${n?"\u7F16\u8F91\u5DE5\u5177":"\u65B0\u5EFA\u5DE5\u5177"}</span>
            <button class="yyt-dialog-close" id="yyt-tool-dialog-close">
              <i class="fa-solid fa-times"></i>
            </button>
          </div>
          <div class="yyt-dialog-body">
            <div class="yyt-form-row">
              <div class="yyt-form-group yyt-flex-1">
                <label>\u5DE5\u5177\u540D\u79F0</label>
                <input type="text" class="yyt-input" id="yyt-tool-name"
                       value="${s?ce(s.name):""}" placeholder="\u5DE5\u5177\u540D\u79F0">
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
                     value="${s?ce(s.description||""):""}" placeholder="\u5DE5\u5177\u63CF\u8FF0">
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
    `;this._removeDialog(t),t.append(o);let a=t.find("#yyt-tool-dialog-overlay"),i=a.find("#yyt-tool-name"),l=a.find("#yyt-tool-category"),c=a.find("#yyt-tool-desc"),d=a.find("#yyt-tool-timeout"),u=a.find("#yyt-tool-retries");lr(a,{namespace:"yytToolManageDialogSelect",selectors:["#yyt-tool-category"]});let y=()=>{Nt(a,"yytToolManageDialogSelect"),a.remove()};a.find("#yyt-tool-dialog-close, #yyt-tool-dialog-cancel").on("click",y),a.on("click",function(p){p.target===this&&y()}),a.find("#yyt-tool-dialog-save").on("click",()=>{let p=i.val().trim(),g=l.val(),m=c.val().trim(),h=parseInt(d.val())||6e4,x=parseInt(u.val())||3;if(!p){zt.warn("\u8BF7\u8F93\u5165\u5DE5\u5177\u540D\u79F0",null,{toast:!0}),i.trigger("focus").trigger("select");return}let v=r||`tool_${Date.now()}`;if(!fn(v,{name:p,category:g,description:m,promptTemplate:s?.promptTemplate||"",extractTags:Array.isArray(s?.extractTags)?s.extractTags:[],config:{execution:{timeout:h,retries:x},api:s?.config?.api||{preset:"",useBypass:!1,bypassPreset:""},messages:Array.isArray(s?.config?.messages)?s.config.messages:[],context:{depth:s?.config?.context?.depth||3,includeTags:Array.isArray(s?.config?.context?.includeTags)?s.config.context.includeTags:[],excludeTags:Array.isArray(s?.config?.context?.excludeTags)?s.config.context.excludeTags:[]},worldbooks:{enabled:s?.config?.worldbooks?.enabled===!0,selected:Array.isArray(s?.config?.worldbooks?.selected)?s.config.worldbooks.selected:[]}},enabled:s?.enabled!==!1})){zt.error(n?"\u5DE5\u5177\u66F4\u65B0\u5931\u8D25":"\u5DE5\u5177\u521B\u5EFA\u5931\u8D25",null,{toast:!0});return}wn(v),y(),this.renderTo(t),zt.info(n?"\u5DE5\u5177\u5DF2\u66F4\u65B0":"\u5DE5\u5177\u5DF2\u521B\u5EFA",null,{toast:"success"}),n||this._openToolConfig(v)})},destroy(t){!re()||!ke(t)||(this._removeDialog(t),t.off(".yytToolManage"))},getStyles(){return`
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
    `},renderTo(t){let e=this.render({});t.html(e),this.bindEvents(t,{})}},Yv=ig});var ug={};le(ug,{BypassManager:()=>yi,DEFAULT_BYPASS_PRESETS:()=>Nr,addMessage:()=>cT,buildBypassMessages:()=>fT,bypassManager:()=>ye,createPreset:()=>rT,default:()=>gT,deleteMessage:()=>uT,deletePreset:()=>nT,duplicatePreset:()=>oT,exportPresets:()=>pT,getAllPresets:()=>eT,getDefaultPresetId:()=>aT,getEnabledMessages:()=>lT,getPreset:()=>tT,getPresetList:()=>Ko,importPresets:()=>yT,setDefaultPresetId:()=>iT,updateMessage:()=>dT,updatePreset:()=>sT});function dg(t){let e=String(t||"").trim().toLowerCase();return e==="system"?"SYSTEM":e==="assistant"||e==="ai"?"assistant":"USER"}function Xv(t){return t&&typeof t=="object"&&typeof t.content=="string"&&!t.name&&!Array.isArray(t.messages)}function Qv(t){return String(t||"").replace(/\$0/g,"{{toolContentMacro}}").replace(/\$1/g,"{{rawRecentMessagesText}}").replace(/\$4/g,"{{toolWorldbookContent}}").replace(/\$8/g,"{{userMessage}}").replace(/\$C/g,"{{characterCard}}")}function Zv(t,e,r){let s=t.mainSlot||(t.isMain?"A":t.isMain2?"B":"");return{id:typeof t.id=="string"&&t.id.trim()?t.id.trim():`${r}_msg_${e+1}`,role:dg(t.role),content:Qv(t.content),enabled:t.enabled!==!1,deletable:t.deletable!==!1,...s?{mainSlot:s,isMain:s==="A",isMain2:s==="B"}:{}}}var pi,Pr,Ln,sd,Vv,Nr,Jv,yi,ye,eT,Ko,tT,rT,sT,nT,oT,aT,iT,lT,cT,dT,uT,pT,yT,fT,gT,Bn=N(()=>{He();ot();H();pi=C.createScope("BypassManager"),Pr="bypass_presets",Ln="default_bypass_preset",sd="current_bypass_preset",Vv=Object.freeze([{id:"table_fill_default_msg_1",role:"SYSTEM",content:"\u4F60\u662F\u4E00\u4E2A\u52A9\u624B\uFF0C\u8D1F\u8D23\u542C\u4ECE\u7528\u6237\u7684\u6307\u4EE4\u5B8C\u6210\u4F60\u7684\u5DE5\u4F5C",enabled:!0,deletable:!0},{id:"table_fill_default_msg_2",role:"assistant",content:"\u6536\u5230\uFF0C\u6211\u5C06\u5145\u5206\u63CF\u7ED8\u7528\u6237\u7684\u610F\u5FD7\uFF0C\u6BEB\u4E0D\u5077\u61D2\uFF0C\u5E76\u4E14\u6211\u4E00\u5B9A\u4F1A\u9075\u7167\u7528\u6237\u7684\u8981\u6C42",enabled:!0,deletable:!0},{id:"table_fill_default_msg_3",role:"USER",content:`\u4EE5\u4E0B\u662F\u4F60\u53EF\u80FD\u9700\u8981\u7528\u5230\u7684\u80CC\u666F\u8BBE\u5B9A\uFF0C\u6CE8\u610F\u4F60\u53EA\u9700\u8981\u5176\u4E2D\u5173\u4E8E\u5267\u60C5\u4EE5\u53CA\u4EBA\u8BBE\u65B9\u9762\u7684\u6570\u636E\uFF0C\u4E0D\u9700\u8981\u601D\u8003\u91CC\u8FB9\u9664\u6B64\u4E4B\u5916\u7684\u4EFB\u4F55\u683C\u5F0F\u6216\u8005\u601D\u7EF4\u94FE\u65B9\u9762\u7684\u8981\u6C42\uFF1A
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

{{userMessage}}`,enabled:!0,deletable:!1,mainSlot:"B",isMain2:!0},{id:"table_fill_default_msg_8",role:"assistant",content:"\u6536\u5230\u6307\u4EE4\uFF0C\u6211\u5C06\u4E00\u6B65\u4E00\u6B65\u5F00\u59CB\u601D\u8003\uFF0C\u5E76\u5B8C\u6210\u586B\u8868\uFF0C\u9996\u5148\u6211\u8981\u5206\u6790\u5F53\u524D\u8F6E\u6B21\u7684\u5267\u60C5\u53D8\u5316\u3002",enabled:!0,deletable:!0}]),Nr={table_workbench_fill_default:{id:"table_workbench_fill_default",name:"\u9ED8\u8BA4\u586B\u8868 Ai \u6307\u4EE4\u9884\u8BBE",description:"\u7528\u4E8E\u586B\u8868\u5DE5\u4F5C\u53F0\u7684\u5185\u7F6E Ai \u6307\u4EE4\u9884\u8BBE\uFF0C\u53EF\u590D\u5236\u540E\u6309\u9700\u7F16\u8F91\u3002",enabled:!0,messages:Vv.map(t=>({...t})),createdAt:0,updatedAt:0}},Jv=new Set(["\u6807\u51C6\u7834\u9650\u8BCD","\u589E\u5F3A\u7834\u9650"]);yi=class{constructor(){this._cache=null,this._migrated=!1,this.debugMode=!1}getAllPresets(){if(this._migrateLegacyData(),this._cache)return this._cache;let e=z.get(Pr,{});return this._cache={...Nr,...e},this._cache}getPresetList(){let e=this.getAllPresets();return Object.values(e).sort((r,s)=>(s.updatedAt||0)-(r.updatedAt||0))}getPreset(e){return e&&this.getAllPresets()[e]||null}presetExists(e){return!!this.getPreset(e)}createPreset(e){let{id:r,name:s,description:n,messages:o}=e;if(!r||typeof r!="string"||!r.trim())return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};if(!s||typeof s!="string"||!s.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let a=r.trim();if(this.presetExists(a))return{success:!1,message:`\u9884\u8BBE "${a}" \u5DF2\u5B58\u5728`};let i={id:a,name:s.trim(),description:n||"",enabled:!0,messages:o||[],createdAt:Date.now(),updatedAt:Date.now()};return this._savePreset(a,i),W.emit(j.BYPASS_PRESET_CREATED,{presetId:a,preset:i}),pi.info(`\u9884\u8BBE\u5DF2\u521B\u5EFA: ${a}`),{success:!0,message:`\u9884\u8BBE "${s}" \u521B\u5EFA\u6210\u529F`,preset:i}}updatePreset(e,r){if(!e)return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};let s=this.getPreset(e);if(!s)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};if(r.id&&r.id!==e)return{success:!1,message:"\u4E0D\u5141\u8BB8\u4FEE\u6539\u9884\u8BBEID"};let n={...s,...r,id:e,updatedAt:Date.now()};return this._savePreset(e,n),W.emit(j.BYPASS_PRESET_UPDATED,{presetId:e,preset:n}),pi.info(`\u9884\u8BBE\u5DF2\u66F4\u65B0: ${e}`),{success:!0,message:`\u9884\u8BBE "${s.name}" \u66F4\u65B0\u6210\u529F`,preset:n}}deletePreset(e){if(!e)return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};if(Nr[e])return{success:!1,message:"\u4E0D\u5141\u8BB8\u5220\u9664\u9ED8\u8BA4\u9884\u8BBE"};let r=this.getPreset(e);if(!r)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let s=z.get(Pr,{});return delete s[e],z.set(Pr,s),this._cache=null,this.getDefaultPresetId()===e&&this.setDefaultPresetId(null),W.emit(j.BYPASS_PRESET_DELETED,{presetId:e}),pi.info(`\u9884\u8BBE\u5DF2\u5220\u9664: ${e}`),{success:!0,message:`\u9884\u8BBE "${r.name}" \u5DF2\u5220\u9664`}}duplicatePreset(e,r,s){let n=this.getPreset(e);if(!n)return{success:!1,message:`\u6E90\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};if((!r||!r.trim())&&(r=`${e}_copy_${Date.now()}`),this.presetExists(r))return{success:!1,message:`\u9884\u8BBE "${r}" \u5DF2\u5B58\u5728`};let o={...JSON.parse(JSON.stringify(n)),id:r.trim(),name:s||`${n.name} (\u526F\u672C)`,createdAt:Date.now(),updatedAt:Date.now()};return this._savePreset(r.trim(),o),W.emit(j.BYPASS_PRESET_CREATED,{presetId:r,preset:o}),{success:!0,message:`\u9884\u8BBE\u5DF2\u590D\u5236\u4E3A "${o.name}"`,preset:o}}addMessage(e,r){let s=this.getPreset(e);if(!s)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let n={id:`msg_${Date.now()}`,role:dg(r.role||"SYSTEM"),content:r.content||"",enabled:r.enabled!==!1,deletable:r.deletable!==!1,...r.mainSlot?{mainSlot:r.mainSlot}:{}},o=[...s.messages||[],n];return this.updatePreset(e,{messages:o})}updateMessage(e,r,s){let n=this.getPreset(e);if(!n)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let o=n.messages||[],a=o.findIndex(l=>l.id===r);if(a===-1)return{success:!1,message:`\u6D88\u606F "${r}" \u4E0D\u5B58\u5728`};let i=[...o];return i[a]={...i[a],...s},this.updatePreset(e,{messages:i})}deleteMessage(e,r){let s=this.getPreset(e);if(!s)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let n=s.messages||[],o=n.find(i=>i.id===r);if(!o)return{success:!1,message:`\u6D88\u606F "${r}" \u4E0D\u5B58\u5728`};if(o.deletable===!1)return{success:!1,message:"\u8BE5\u6D88\u606F\u4E0D\u53EF\u5220\u9664"};let a=n.filter(i=>i.id!==r);return this.updatePreset(e,{messages:a})}getEnabledMessages(e){let r=this.getPreset(e);return!r||!r.enabled?[]:(r.messages||[]).filter(s=>s.enabled!==!1)}getDefaultPresetId(){this._migrateLegacyData();let e=z.get(Ln,null);return e==="undefined"||e==="null"||e===""?(z.remove(Ln),null):e}setDefaultPresetId(e){return e&&!this.presetExists(e)?!1:(z.set(Ln,e),W.emit(j.BYPASS_PRESET_ACTIVATED,{presetId:e}),pi.info(`\u9ED8\u8BA4\u9884\u8BBE\u5DF2\u8BBE\u7F6E: ${e}`),!0)}getDefaultPreset(){let e=this.getDefaultPresetId();return e?this.getPreset(e):null}exportPresets(e=null){if(e){let s=this.getPreset(e);if(!s)throw new Error(`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`);return JSON.stringify(s,null,2)}let r=this.getAllPresets();return JSON.stringify({version:"1.0.0",exportedAt:new Date().toISOString(),presets:Object.values(r)},null,2)}importPresets(e,r={}){let{overwrite:s=!1,name:n=""}=r,o;try{o=JSON.parse(e)}catch{return{success:!1,message:"JSON\u89E3\u6790\u5931\u8D25",imported:0}}let a=z.get(Pr,{}),l=Array.isArray(o)&&o.every(Xv)?[{id:this._generatePresetId(n||"\u5BFC\u5165\u586B\u8868\u6307\u4EE4\u9884\u8BBE",a),name:n||"\u5BFC\u5165\u586B\u8868\u6307\u4EE4\u9884\u8BBE",description:"\u7531\u5916\u90E8\u586B\u8868\u63D0\u793A\u8BCD\u7EC4\u5BFC\u5165\u3002",enabled:!0,messages:o}]:Array.isArray(o)?o:o.presets?o.presets:[o];if(l.length===0)return{success:!1,message:"\u6CA1\u6709\u627E\u5230\u6709\u6548\u7684\u9884\u8BBE\u6570\u636E",imported:0};let c=0;for(let d of l){let u=this._normalizePreset(d?.id,d,a);u&&(Nr[u.id]&&!s||!s&&a[u.id]||(a[u.id]={...u,updatedAt:Date.now()},c++))}return c>0&&(z.set(Pr,a),this._cache=null),{success:!0,message:`\u6210\u529F\u5BFC\u5165 ${c} \u4E2A\u9884\u8BBE`,imported:c}}getToolBypassPreset(e){if(!e?.bypass?.enabled)return null;let r=e?.bypass?.presetId;return r?this.getPreset(r):this.getDefaultPreset()}buildBypassMessages(e){let r=this.getToolBypassPreset(e);return r?this.getEnabledMessages(r.id):[]}_savePreset(e,r){let s=z.get(Pr,{});s[e]=r,z.set(Pr,s),this._cache=null}_migrateLegacyData(){if(this._migrated)return;let e=z.get(Pr,{}),r={},s=!1,n=Array.isArray(e)?e.map((o,a)=>[o?.id||o?.name||`legacy_${a}`,o]):Object.entries(e||{});for(let[o,a]of n){let i=this._normalizePreset(o,a,r);if(!i){s=!0;continue}r[i.id]=i,(!e?.[i.id]||e?.[i.id]?.id!==i.id)&&(s=!0)}s&&z.set(Pr,r),this._migrateDefaultPreset(r),this._cache=null,this._migrated=!0}_normalizePreset(e,r,s={}){if(!r||typeof r!="object")return null;let n=typeof r.name=="string"?r.name.trim():"",o=typeof r.id=="string"?r.id.trim():"",a=typeof e=="string"?e.trim():"";if(!n&&a&&a!=="undefined"&&a!=="null"&&(n=a),this._isLegacySamplePreset(n,o)||(!o&&a&&a!=="undefined"&&a!=="null"&&(o=a),!o&&n&&n!=="undefined"&&n!=="null"&&(o=this._generatePresetId(n,s)),!n||!o||o==="undefined"||n==="undefined"))return null;let l=Array.isArray(r.messages)?r.messages.filter(c=>c&&typeof c=="object").map((c,d)=>Zv(c,d,o)):[];return{...r,id:o,name:n,description:typeof r.description=="string"?r.description:"",enabled:r.enabled!==!1,messages:l,createdAt:r.createdAt||Date.now(),updatedAt:r.updatedAt||Date.now()}}_migrateDefaultPreset(e){let r=z.get(Ln,null),s=z.get(sd,null),n=r??s;(n==="undefined"||n==="null"||n==="")&&(n=null),n&&!e[n]&&(n=Object.values(e).find(a=>a.name===n)?.id||null),n?z.set(Ln,n):z.remove(Ln),z.has(sd)&&z.remove(sd)}_isLegacySamplePreset(e,r=""){return e?r==="standard"||r==="enhanced"||r==="jailbreak"||Jv.has(e)?!0:/^增强破限（副本）(?:\s*\(\d+\))?$/.test(e):!1}_generatePresetId(e,r={}){let s=String(e).trim().toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g,"_").replace(/^_+|_+$/g,"")||`bypass_${Date.now()}`,n=s,o=1;for(;r[n];)n=`${s}_${o++}`;return n}},ye=new yi,eT=()=>ye.getAllPresets(),Ko=()=>ye.getPresetList(),tT=t=>ye.getPreset(t),rT=t=>ye.createPreset(t),sT=(t,e)=>ye.updatePreset(t,e),nT=t=>ye.deletePreset(t),oT=(t,e,r)=>ye.duplicatePreset(t,e,r),aT=()=>ye.getDefaultPresetId(),iT=t=>ye.setDefaultPresetId(t),lT=t=>ye.getEnabledMessages(t),cT=(t,e)=>ye.addMessage(t,e),dT=(t,e,r)=>ye.updateMessage(t,e,r),uT=(t,e)=>ye.deleteMessage(t,e),pT=t=>ye.exportPresets(t),yT=(t,e)=>ye.importPresets(t,e),fT=t=>ye.buildBypassMessages(t),gT=ye});var pg={};le(pg,{DEFAULT_SETTINGS:()=>Uo,SettingsService:()=>gi,default:()=>mT,settingsService:()=>Vt});var Uo,fi,gi,Vt,mT,jo=N(()=>{He();ot();Uo={executor:{maxConcurrent:3,maxRetries:2,retryDelayMs:5e3,requestTimeoutMs:9e4,queueStrategy:"fifo"},automation:{settleMs:1200,cooldownMs:5e3,maxConcurrentSlots:1},debug:{enableDebugLog:!1,saveExecutionHistory:!0,showRuntimeBadge:!0},ui:{compactMode:!1,animationEnabled:!0,theme:"dark-blue",startupScreenDismissed:!1}},fi="settings_v2",gi=class{constructor(){this._cache=null}getSettings(){if(this._cache)return this._cache;let e=z.get(fi,{}),r=this._migrateLegacy(e);return this._cache=this._mergeWithDefaults(r.settings),r.changed&&z.set(fi,this._cache),this._cache}saveSettings(e){this._cache=this._mergeWithDefaults(e),z.set(fi,this._cache),W.emit(j.SETTINGS_UPDATED,{settings:this._cache})}updateSettings(e){let r=this.getSettings(),s=this._deepMerge(r,e);this.saveSettings(s)}getExecutorSettings(){return this.getSettings().executor}updateExecutorSettings(e){this.updateSettings({executor:e})}getAutomationSettings(){return this.getSettings().automation}updateAutomationSettings(e){this.updateSettings({automation:e})}getDebugSettings(){return this.getSettings().debug}updateDebugSettings(e){this.updateSettings({debug:e})}getUiSettings(){return this.getSettings().ui}updateUiSettings(e){this.updateSettings({ui:e})}resetSettings(){this._cache=JSON.parse(JSON.stringify(Uo)),z.set(fi,this._cache),W.emit(j.SETTINGS_UPDATED,{settings:this._cache,reset:!0})}get(e,r=null){let s=this.getSettings(),n=e.split("."),o=s;for(let a of n)if(o&&typeof o=="object"&&a in o)o=o[a];else return r;return o}set(e,r){let s=JSON.parse(JSON.stringify(this.getSettings())),n=e.split("."),o=s;for(let a=0;a<n.length-1;a+=1){let i=n[a];i in o||(o[i]={}),o=o[i]}o[n[n.length-1]]=r,this.saveSettings(s)}_migrateLegacy(e){if(!e||typeof e!="object")return{settings:{},changed:!1};let r=!1,s=JSON.parse(JSON.stringify(e));return s.automation&&Object.prototype.hasOwnProperty.call(s.automation,"enabled")&&(delete s.automation.enabled,r=!0),{settings:s,changed:r}}_mergeWithDefaults(e){return this._deepMerge(JSON.parse(JSON.stringify(Uo)),e)}_deepMerge(e,r){let s={...e};for(let n in r)r[n]&&typeof r[n]=="object"&&!Array.isArray(r[n])?s[n]=this._deepMerge(e[n]||{},r[n]):s[n]=r[n];return s}},Vt=new gi,mT=Vt});var fg={};le(fg,{ContextInjector:()=>bi,DEFAULT_INJECTION_OPTIONS:()=>yg,WRITEBACK_METHODS:()=>nr,WRITEBACK_RESULT_STATUS:()=>hi,contextInjector:()=>Kt,default:()=>xT});function nd(t){return typeof t=="number"&&Number.isFinite(t)?String(t):typeof t=="string"&&t.trim()?t.trim():""}function Fs(t,e){let r=String(e||"").trim();return r?Array.isArray(t)?(t.includes(r)||t.push(r),t):[r]:t}function mi(t={}){if(t?.signal?.aborted)return"\u5DE5\u5177\u7ED3\u679C\u5DF2\u53D6\u6D88\uFF0C\u8DF3\u8FC7\u5199\u56DE";if(typeof t?.shouldAbortWriteback=="function")try{if(t.shouldAbortWriteback()===!0)return"\u5DE5\u5177\u7ED3\u679C\u5DF2\u8FC7\u671F\uFF0C\u8DF3\u8FC7\u5199\u56DE"}catch{return"\u5DE5\u5177\u7ED3\u679C\u5DF2\u8FC7\u671F\uFF0C\u8DF3\u8FC7\u5199\u56DE"}return""}var ht,It,zn,yg,hi,nr,hT,bT,bi,Kt,xT,Ws=N(()=>{ot();H();La();ht=C.createScope("ContextInjector"),It="YouYouToolkit_toolOutputs",zn="YouYouToolkit_injectedContext",yg={overwrite:!0,enabled:!0};hi={SUCCESS:"success",FAILED:"failed"},nr={NONE:"none",LOCAL_ONLY:"local_only",SET_CHAT_MESSAGES:"setChatMessages",SET_CHAT_MESSAGE:"setChatMessage"},hT=60,bT=3;bi=class{constructor(){this.debugMode=!1}async inject(e,r,s={}){return(await this.injectDetailed(e,r,s)).success}async injectDetailed(e,r,s={}){let n={...yg,...s},o=this._createWritebackResult(e,n);if(!e||r===void 0||r===null)return ht.error("\u6CE8\u5165\u5931\u8D25: \u53C2\u6570\u65E0\u6548"),o.error="\u6CE8\u5165\u5931\u8D25: \u53C2\u6570\u65E0\u6548",o;if(!nd(n.sourceMessageId))return ht.error("\u6CE8\u5165\u5931\u8D25: \u7F3A\u5C11 sourceMessageId"),o.error="\u6CE8\u5165\u5931\u8D25: \u7F3A\u5C11 sourceMessageId",o;if(n?.signal?.aborted)return o.error="\u5DE5\u5177\u7ED3\u679C\u5DF2\u53D6\u6D88\uFF0C\u8DF3\u8FC7\u5199\u56DE",o;if(typeof n?.shouldAbortWriteback=="function")try{if(n.shouldAbortWriteback()===!0)return o.error="\u5DE5\u5177\u7ED3\u679C\u5DF2\u8FC7\u671F\uFF0C\u8DF3\u8FC7\u5199\u56DE",o}catch{return o.error="\u5DE5\u5177\u7ED3\u679C\u5DF2\u8FC7\u671F\uFF0C\u8DF3\u8FC7\u5199\u56DE",o}let a=o.chatId,i={toolId:e,content:String(r),updatedAt:Date.now(),sourceMessageId:n.sourceMessageId||null,sourceSwipeId:n.sourceSwipeId||n.effectiveSwipeId||null,options:n};W.emit(j.TOOL_CONTEXT_INJECTED,{toolId:e,chatId:a,content:i.content,sourceMessageId:i.sourceMessageId,sourceSwipeId:i.sourceSwipeId,effectiveSwipeId:i.sourceSwipeId,slotBindingKey:n.slotBindingKey||"",slotRevisionKey:n.slotRevisionKey||"",slotTransactionId:n.slotTransactionId||"",traceId:n.traceId||"",sessionKey:n.sessionKey||"",options:n});let l=await this._insertToolOutputToBoundAssistantSlot(e,i,n,o);return l.success&&ht.info(`\u6CE8\u5165\u6210\u529F: ${e} -> ${a}`,{inserted:l}),l}getAggregatedContext(e){return this.getLatestMessageInjectedContext()}getLatestMessageInjectedContext(e=null){try{let{chat:r}=this._getChatRuntime(),s=this._findAssistantMessageIndex(r,e);if(s<0)return"";let n=r[s]||{},o=n[zn];if(typeof o=="string"&&o.trim())return o.trim();let a=n[It];return a&&typeof a=="object"?this._buildMessageInjectedContext(a).trim():""}catch(r){return ht.warn("\u8BFB\u53D6\u6700\u65B0 AI \u6D88\u606F injectedContext \u5931\u8D25",{error:r}),""}}_getLatestAssistantMessageOutputs(){try{let{chat:e}=this._getChatRuntime(),r=this._findAssistantMessageIndex(e,null);if(r<0)return{};let n=(e[r]||{})[It];return n&&typeof n=="object"?n:{}}catch(e){return ht.warn("\u8BFB\u53D6\u6700\u65B0 AI \u6D88\u606F\u4E0A\u4E0B\u6587\u5931\u8D25",{error:e}),{}}}getToolContext(e,r){if(!r)return null;try{let{chat:s}=this._getChatRuntime(),n=this._findAssistantMessageIndex(s,null);return n<0?null:s[n]?.[It]?.[r]||null}catch{return null}}getAllToolContexts(e){return this._getLatestAssistantMessageOutputs()}async clearToolContext(e,r){if(!r)return!1;try{let{api:s,context:n,chat:o}=this._getChatRuntime(),a=this._findAssistantMessageIndex(o,null);if(a<0)return!1;let i=o[a],l=i?.[It];if(!l||!l[r])return!1;delete l[r],i[It]=l,i[zn]=this._buildMessageInjectedContext(l);let c=n?.saveChat||s?.saveChat||null;return typeof c=="function"&&await c.call(n||s),W.emit(j.TOOL_CONTEXT_CLEARED,{chatId:e||this._getCurrentChatId(),toolId:r}),!0}catch(s){return ht.warn("\u6E05\u9664\u5DE5\u5177\u4E0A\u4E0B\u6587\u5931\u8D25",{error:s}),!1}}async clearAllContext(e){try{let{api:r,context:s,chat:n}=this._getChatRuntime(),o=this._findAssistantMessageIndex(n,null);if(o<0)return!1;let a=n[o];delete a[It],delete a[zn];let i=s?.saveChat||r?.saveChat||null;return typeof i=="function"&&await i.call(s||r),W.emit(j.TOOL_CONTEXT_CLEARED,{chatId:e||this._getCurrentChatId(),allTools:!0}),!0}catch(r){return ht.warn("\u6E05\u9664\u6240\u6709\u5DE5\u5177\u4E0A\u4E0B\u6587\u5931\u8D25",{error:r}),!1}}clearAllChatsContexts(){ht.info("\u6E05\u9664\u6240\u6709\u4E0A\u4E0B\u6587")}hasToolContext(e,r){return!!this.getToolContext(e,r)}getContextSummary(e){let r=this._getLatestAssistantMessageOutputs(),s=Object.entries(r).map(([n,o])=>({toolId:n,updatedAt:o.updatedAt,contentLength:o.content?.length||0}));return{chatId:e||this._getCurrentChatId(),tools:s,totalCount:s.length}}exportContext(e){return{chatId:e||this._getCurrentChatId(),contexts:this._getLatestAssistantMessageOutputs(),exportedAt:Date.now()}}importContext(e,r={}){return!1}_getChatRuntime(){try{let e=typeof window.parent<"u"&&window.parent!==window?window.parent:window,r=e.SillyTavern||null,s=r?.getContext?.()||null,n=Array.isArray(s?.chat)?s.chat:[],o=Array.isArray(r?.chat)?r.chat:[],a=n.length?n:o;return{topWindow:e,api:r,context:s,chat:a,contextChat:n,apiChat:o}}catch{return{topWindow:null,api:null,context:null,chat:[],contextChat:[],apiChat:[]}}}_createWritebackResult(e,r={}){let s=nr.SET_CHAT_MESSAGES;return{success:!1,toolId:e,chatId:this._getCurrentChatId(),traceId:r.traceId||"",sessionKey:r.sessionKey||"",sourceMessageId:r.sourceMessageId||null,sourceSwipeId:r.sourceSwipeId||r.effectiveSwipeId||null,effectiveSwipeId:r.effectiveSwipeId||r.sourceSwipeId||null,slotBindingKey:r.slotBindingKey||"",slotRevisionKey:r.slotRevisionKey||"",slotTransactionId:r.slotTransactionId||"",messageIndex:-1,textField:"",blockIdentity:null,hostUpdateMethod:nr.NONE,commit:{preferredMethod:s,attemptedMethods:[],appliedMethod:nr.NONE,fallbackUsed:!1,contentCommitted:!1,hostCommitApplied:!1},refresh:{requestMethods:[],requested:!1,confirmChecks:0,confirmed:!1,confirmedBy:"",eventSource:"",eventName:""},contentCommitted:!1,hostCommitApplied:!1,refreshRequested:!1,refreshConfirmed:!1,writebackStatus:hi.FAILED,replacedExistingBlock:!1,insertedNewBlock:!1,conflictDetected:!1,conflictReason:"",preservedOtherToolBlocks:!0,error:"",errors:[],steps:{foundTargetMessage:!1,contentCommitted:!1,localTextApplied:!1,runtimeSynced:!1,hostSetChatMessages:!1,hostSetChatMessage:!1,refreshForceSetChatMessage:!1,saveChatDebounced:!1,saveChat:!1,refreshRequested:!1,notifiedMessageUpdated:!1,verifiedAfterWrite:!1,refreshConfirmed:!1},verification:{textIncludesContent:!1,mirrorStored:!1,refreshConfirmed:!1}}}async _wait(e){await new Promise(r=>setTimeout(r,e))}_collectWritebackVerification(e,r,s,n,o,a=null){let i=e?.contextChat?.[s]||e?.apiChat?.[s]||r?.[s]||a||null,l=this._getWritableMessageField(i).text||"",c=i?.[It]?.[n],d=o?l.includes(o):!0,u=!!(c&&String(c.content||"").trim()===o);return{latestMessage:i,latestText:l,textIncludesContent:d,mirrorStored:u}}async _confirmRefresh(e,r,s,n,o,a=null){let i=1,l=this._collectWritebackVerification(e,r,s,n,o,a);for(let c=0;c<bT;c+=1){if(l.textIncludesContent&&l.mirrorStored)return{...l,refreshConfirmed:!0,confirmChecks:i,confirmedBy:"text_and_mirror_present"};await this._wait(hT),i+=1,l=this._collectWritebackVerification(e,r,s,n,o,a)}return{...l,refreshConfirmed:l.textIncludesContent&&l.mirrorStored,confirmChecks:i,confirmedBy:l.textIncludesContent&&l.mirrorStored?"text_and_mirror_present":""}}async _requestAssistantMessageRefresh(e,r,s,n={},o=null){let a=o||this._createWritebackResult("",n),{api:i,context:l}=e||{},c=e?.topWindow||(typeof window.parent<"u"&&window.parent!==window?window.parent:window),d=c?.TavernHelper?.setChatMessages||l?.setChatMessages||i?.setChatMessages||c?.setChatMessages||null;a.commit.preferredMethod=typeof d=="function"?nr.SET_CHAT_MESSAGES:nr.LOCAL_ONLY;let u=!1,y=mi(n);if(y)return a.error=y,a;if(typeof d=="function"){Fs(a.commit.attemptedMethods,nr.SET_CHAT_MESSAGES);try{let p=mi(n);if(p)return a.error=p,a;let g=nd(n.sourceMessageId)||r;await d([{message_id:g,message:s}],{refresh:"affected"}),a.steps.hostSetChatMessages=!0,a.hostUpdateMethod=nr.SET_CHAT_MESSAGES,a.hostCommitApplied=!0,a.commit.appliedMethod=nr.SET_CHAT_MESSAGES,a.commit.hostCommitApplied=!0,u=!0}catch(p){ht.error("setChatMessages \u5199\u56DE\u5931\u8D25\uFF0C\u56DE\u9000\u672C\u5730\u540C\u6B65",{error:p}),a.errors.push(`setChatMessages: ${p?.message||String(p)}`)}}return u&&(a.refreshRequested=!0,Fs(a.refresh.requestMethods,a.hostUpdateMethod)),u||(Fs(a.commit.attemptedMethods,nr.LOCAL_ONLY),a.commit.appliedMethod=nr.LOCAL_ONLY,a.commit.fallbackUsed=!0,a.hostUpdateMethod=a.commit.appliedMethod),a}_inferBlockType(e){let r=String(e||"").trim();if(!r)return"empty";let s=r.match(/^<([a-zA-Z0-9_-]+)(?:\s[^>]*)?>[\s\S]*<\/\1>$/);return s?.[1]?s[1]:"plain_text"}_stripExactStoredBlock(e,r,s=""){let n=String(e||""),o=String(r||"").trim(),a=String(s||"").trim();return o?n.includes(o)?a?{text:n.replace(o,a).trimEnd(),removed:!0,replaced:!0}:{text:n.replace(o,"").trimEnd(),removed:!0,replaced:!1}:{text:n,removed:!1,replaced:!1}:{text:n,removed:!1,replaced:!1}}_syncMessageToRuntimeChats(e,r,s){let{contextChat:n,apiChat:o}=e||{},a=i=>{!Array.isArray(i)||r<0||r>=i.length||i[r]!==s&&(i[r]={...i[r]||{},...s})};a(n),a(o)}_notifyMessageUpdated(e,r,s={}){if(s.skipNotify===!0)return{emitted:!1,source:"skipped_by_caller",eventName:""};try{let n=_t.describe(),o=e?.topWindow||Oa();return n.hasBridge?(_t.emit(Ge.MESSAGE_UPDATED,r),typeof o?.requestAnimationFrame=="function"?o.requestAnimationFrame(()=>{_t.emit(Ge.MESSAGE_UPDATED,r)}):typeof o?.setTimeout=="function"&&o.setTimeout(()=>{_t.emit(Ge.MESSAGE_UPDATED,r)},30),{emitted:!0,source:n.source||"unavailable",eventName:Ge.MESSAGE_UPDATED}):{emitted:!1,source:n.source||"unavailable",eventName:Ge.MESSAGE_UPDATED}}catch(n){return ht.warn("\u89E6\u53D1\u6D88\u606F\u5237\u65B0\u4E8B\u4EF6\u5931\u8D25",{error:n}),{emitted:!1,source:"error",eventName:"",error:n?.message||String(n)}}}_isAssistantMessage(e){if(!e||e.is_user||e.is_system)return!1;let r=String(e.role||"").toLowerCase();return r==="assistant"||r==="ai"||!r}_findAssistantMessageIndex(e,r){let s=Array.isArray(e)?e:[];if(!s.length)return-1;let n=r!=null&&r!=="",o=(a,i)=>{if(!this._isAssistantMessage(a)||r==null||r==="")return!1;let l=String(r).trim();return l?[a.message_id,a.id,a.messageId,a.mes_id,i].map(d=>d==null?"":String(d).trim()).includes(l):!1};for(let a=s.length-1;a>=0;a-=1)if(o(s[a],a))return a;if(n)return-1;for(let a=s.length-1;a>=0;a-=1)if(this._isAssistantMessage(s[a]))return a;return-1}_buildMessageInjectedContext(e){let s=Object.entries(e&&typeof e=="object"?e:{}).filter(([,o])=>o?.blockType!=="full_message").sort(([,o],[,a])=>(o?.updatedAt||0)-(a?.updatedAt||0));if(!s.length)return"";let n=["[\u5DE5\u5177\u4E0A\u4E0B\u6587\u6CE8\u5165]",""];for(let[o,a]of s)n.push(`[${o}]`),n.push(a?.content||""),n.push("");return n.join(`
`)}_getWritableMessageField(e){let r=["mes","message","content","text"];for(let s of r)if(typeof e?.[s]=="string")return{key:s,text:e[s]};return{key:"mes",text:""}}_applyMessageText(e,r,s={}){let n=e&&typeof e=="object"?e:{},o=["mes","message","content","text"],a=!1;if(o.forEach(i=>{typeof n[i]=="string"&&(n[i]=r,a=!0)}),a||(n.mes=r,n.message=r),Array.isArray(n.swipes)){let i=Number.parseInt(nd(s?.sourceSwipeId||s?.effectiveSwipeId),10),l=Number.isInteger(i)?i:Number.isInteger(n.swipe_id)?n.swipe_id:Number.isInteger(n.swipeId)?n.swipeId:0;l>=0&&l<n.swipes.length&&(n.swipes[l]=r,n.swipe_id=l,n.swipeId=l)}return n}_stripExistingToolOutput(e,r=[]){let s=String(e||"");return(Array.isArray(r)?r:[]).forEach(o=>{let a=String(o||"").trim();if(!a)return;if(a.startsWith("regex:")){try{let d=new RegExp(a.slice(6).trim(),"gis");s=s.replace(d,"")}catch(d){ht.warn("\u79FB\u9664\u65E7\u5DE5\u5177\u8F93\u51FA\u65F6\u6B63\u5219\u65E0\u6548",{value:a,error:d})}return}let i=a.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),l=new RegExp(`<${i}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${i}>\\s*`,"gi"),c=new RegExp(`\\{${i}\\|[\\s\\S]*?\\}\\s*`,"gi");s=s.replace(l,""),s=s.replace(c,"")}),s.trimEnd()}_stripPreviousStoredToolContent(e,r){let s=String(e||""),n=String(r||"").trim();return n?s.replace(n,"").trimEnd():s.trimEnd()}async _insertToolOutputToBoundAssistantSlot(e,r,s={},n=null){let o=n||this._createWritebackResult(e,s);try{let a=this._getChatRuntime(),{context:i,chat:l}=a;if(!Array.isArray(l)||!l.length)return ht.error("\u672A\u627E\u5230\u804A\u5929\u6D88\u606F\uFF0C\u65E0\u6CD5\u63D2\u5165\u5DE5\u5177\u8F93\u51FA"),o.error="\u672A\u627E\u5230\u804A\u5929\u6D88\u606F\uFF0C\u65E0\u6CD5\u63D2\u5165\u5DE5\u5177\u8F93\u51FA",o;let c=this._findAssistantMessageIndex(l,s.sourceMessageId);if(c<0)return ht.error("\u672A\u627E\u5230\u53EF\u5199\u5165\u7684\u6700\u65B0 AI \u56DE\u590D\u6D88\u606F"),o.error="\u672A\u627E\u5230\u53EF\u5199\u5165\u7684\u6700\u65B0 AI \u56DE\u590D\u6D88\u606F",o;if(s?.signal?.aborted)return o.error="\u5DE5\u5177\u7ED3\u679C\u5DF2\u53D6\u6D88\uFF0C\u8DF3\u8FC7\u5199\u56DE",o;if(typeof s?.shouldAbortWriteback=="function")try{if(s.shouldAbortWriteback()===!0)return o.error="\u5DE5\u5177\u7ED3\u679C\u5DF2\u8FC7\u671F\uFF0C\u8DF3\u8FC7\u5199\u56DE",o}catch{return o.error="\u5DE5\u5177\u7ED3\u679C\u5DF2\u8FC7\u671F\uFF0C\u8DF3\u8FC7\u5199\u56DE",o}o.messageIndex=c,o.steps.foundTargetMessage=!0;let d=l[c],{key:u,text:y}=this._getWritableMessageField(d);o.textField=u;let p=d[It]&&typeof d[It]=="object"?d[It]:{},g=p?.[e]||{},m=g?.content||"",h=g?.blockText||m||"",x=Object.entries(p).filter(([qe])=>qe!==e).map(([,qe])=>qe||{}),v=String(r.content||"").trim(),T=s.replaceFullMessage===!0,A=T?"full_message":this._inferBlockType(v),E={toolId:e,messageId:s.sourceMessageId||d?.message_id||d?.messageId||c,blockType:A,insertedAt:r.updatedAt,replaceable:s.overwrite!==!1};o.blockIdentity=E;let w=s.overwrite===!1||T?{text:String(y||""),removed:!1,replaced:!1}:this._stripExactStoredBlock(y,h,v),P=w.text,$="";!T&&s.overwrite!==!1&&h&&!w.removed&&($="previous_block_not_found");let B=s.overwrite===!1||w.replaced||T?P:this._stripExistingToolOutput(P,s.extractionSelectors),R=B!==P;P=B;let _=s.overwrite===!1||w.replaced||T?P:this._stripPreviousStoredToolContent(P,m),k=_!==P;P=_,o.replacedExistingBlock=T||w.removed||R||k;let K=s.overwrite===!1?String(y||""):P,Y=T?v:w.replaced?P.trim():[K.trimEnd(),v].filter(Boolean).join(`

`).trim();o.insertedNewBlock=!!v;let ue=x.every(qe=>{if(qe?.blockType==="full_message")return!0;let fs=String(qe?.blockText||qe?.content||"").trim();return fs?Y.includes(fs):!0});o.preservedOtherToolBlocks=ue,ue?$&&(o.conflictDetected=!0,o.conflictReason=$):(o.conflictDetected=!0,o.conflictReason="other_tool_block_removed");let pe={...p,[e]:{toolId:e,content:v,blockText:v,blockType:A,blockIdentity:E,updatedAt:r.updatedAt,sourceMessageId:r.sourceMessageId||null}},te=mi(s);if(te)return o.error=te,o;d[u]=Y,this._applyMessageText(d,Y,s),d[It]=pe,d[zn]=this._buildMessageInjectedContext(pe),o.contentCommitted=!0,o.commit.contentCommitted=!0,o.steps.contentCommitted=!0,o.steps.localTextApplied=!0,this._syncMessageToRuntimeChats(a,c,d),o.steps.runtimeSynced=!0;let Te=mi(s);if(Te)return o.error=Te,o;await this._requestAssistantMessageRefresh(a,c,Y,s,o);let Fe=i?.saveChat||a?.api?.saveChat||null,V=i?.saveChatDebounced||a?.api?.saveChatDebounced||null;typeof V=="function"&&(V.call(i||api),o.steps.saveChatDebounced=!0,o.refreshRequested=!0,Fs(o.refresh.requestMethods,"saveChatDebounced")),typeof Fe=="function"&&(await Fe.call(i||api),o.steps.saveChat=!0,o.refreshRequested=!0,Fs(o.refresh.requestMethods,"saveChat"));let We=this._notifyMessageUpdated(a,c,s);o.steps.notifiedMessageUpdated=We?.emitted===!0,o.refresh.eventSource=We?.source||"",o.refresh.eventName=We?.eventName||"",We?.error&&o.errors.push(`MESSAGE_UPDATED: ${We.error}`);let we=String(r.content||"").trim();(o.steps.hostSetChatMessages||o.steps.hostSetChatMessage)&&(o.refreshRequested=!0,Fs(o.refresh.requestMethods,o.hostUpdateMethod)),o.steps.notifiedMessageUpdated&&(o.refreshRequested=!0,Fs(o.refresh.requestMethods,`MESSAGE_UPDATED:${o.refresh.eventName||"MESSAGE_UPDATED"}`)),o.steps.refreshRequested=o.refreshRequested,o.refresh.requested=o.refreshRequested;let $e=await this._confirmRefresh(a,l,c,e,we,d);return o.verification.textIncludesContent=$e.textIncludesContent,o.verification.mirrorStored=$e.mirrorStored,o.verification.refreshConfirmed=$e.refreshConfirmed,o.steps.verifiedAfterWrite=o.verification.textIncludesContent&&o.verification.mirrorStored,o.refreshConfirmed=o.verification.refreshConfirmed&&o.refreshRequested,o.refresh.confirmChecks=Number($e.confirmChecks)||0,o.refresh.confirmedBy=$e.confirmedBy||"",o.refresh.confirmed=o.refreshConfirmed,o.steps.refreshConfirmed=o.refreshConfirmed,o.success=o.steps.localTextApplied&&o.steps.runtimeSynced&&o.steps.verifiedAfterWrite&&o.refreshConfirmed,o.writebackStatus=o.success?hi.SUCCESS:hi.FAILED,!o.success&&!o.error&&(o.error=o.refreshRequested?"\u5DE5\u5177\u7ED3\u679C\u5DF2\u63D0\u4EA4\uFF0C\u4F46\u5BBF\u4E3B\u5237\u65B0\u786E\u8BA4\u672A\u901A\u8FC7":"\u5DE5\u5177\u7ED3\u679C\u5DF2\u5C1D\u8BD5\u5199\u56DE\uFF0C\u4F46\u6700\u7EC8\u6821\u9A8C\u672A\u901A\u8FC7"),o.conflictDetected&&!o.error&&(o.error=`\u5DE5\u5177\u7ED3\u679C\u5DF2\u5199\u56DE\uFF0C\u4F46\u68C0\u6D4B\u5230\u5757\u51B2\u7A81\uFF1A${o.conflictReason}`),ht.info(`\u5DF2\u5C06\u5DE5\u5177\u8F93\u51FA\u5199\u5165\u7ED1\u5B9A assistant \u69FD\u4F4D: ${e} -> #${c}`),o}catch(a){return ht.error("\u63D2\u5165\u6700\u65B0 AI \u56DE\u590D\u539F\u6587\u5931\u8D25",{error:a}),o.error=a?.message||String(a),o.errors.push(o.error),o}}getAssistantMessageSnapshot(e=null){try{let r=this._getChatRuntime(),{chat:s}=r,n=this._findAssistantMessageIndex(s,e);if(n<0)return null;let o=s[n]||null,a=this._getWritableMessageField(o).text||"",i=o?.[It]&&typeof o[It]=="object"?o[It]:{},l=Object.values(i).reduce((c,d)=>{let u=String(d?.blockText||d?.content||"").trim();return!u||!c.includes(u)?c:c.replace(u,"").trimEnd()},String(a||"")).trim();return{messageIndex:n,message:o,messageText:a,baseText:l,toolOutputs:i,injectedContext:typeof o?.[zn]=="string"?o[zn]:this._buildMessageInjectedContext(i)}}catch(r){return ht.warn("\u8BFB\u53D6 assistant \u6D88\u606F\u5FEB\u7167\u5931\u8D25",{error:r}),null}}_getCurrentChatId(){try{let e=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(e.SillyTavern?.getContext){let r=e.SillyTavern.getContext(),n=[r?.chatId,r?.chat_id,r?.chat_filename,r?.chatMetadata?.chatId,r?.chatMetadata?.chat_id,r?.chatMetadata?.file_name,r?.chatMetadata?.name,e.SillyTavern?.chatId,e.SillyTavern?.chat_id,e.SillyTavern?.chat_filename].find(a=>typeof a=="string"&&a.trim());if(n)return n;let o=e.SillyTavern?.this_chid;if(o!=null)return`chat_char_${o}`}return"chat_default"}catch{return"chat_default"}}},Kt=new bi,xT=Kt});var mg={};le(mg,{BUILTIN_VARIABLES:()=>gg,VariableResolver:()=>xi,default:()=>wT,variableResolver:()=>Jt});var Fo,gg,xi,Jt,wT,wi=N(()=>{ot();H();Fo=C.createScope("VariableResolver"),gg={lastUserMessage:{name:"lastUserMessage",description:"\u6700\u65B0\u7528\u6237\u6D88\u606F",category:"chat"},lastAiMessage:{name:"lastAiMessage",description:"\u6700\u65B0AI\u56DE\u590D",category:"chat"},chatHistory:{name:"chatHistory",description:"\u6700\u8FD1\u804A\u5929\u8BB0\u5F55",category:"chat"},characterCard:{name:"characterCard",description:"\u5F53\u524D\u89D2\u8272\u5361\u5185\u5BB9",category:"character"},toolName:{name:"toolName",description:"\u5DE5\u5177\u540D\u79F0",category:"tool"},toolId:{name:"toolId",description:"\u5DE5\u5177ID",category:"tool"},toolPromptMacro:{name:"toolPromptMacro",description:"\u5F53\u524D\u5DE5\u5177\u6A21\u677F\u63D0\u793A\u8BCD\u5B8F",category:"tool"},toolContentMacro:{name:"toolContentMacro",description:"\u5F53\u524D\u5DE5\u5177\u5904\u7406\u540E\u7684\u5185\u5BB9\u5B8F",category:"tool"},toolWorldbookContent:{name:"toolWorldbookContent",description:"\u5F53\u524D\u5DE5\u5177\u9009\u62E9\u7684\u4E16\u754C\u4E66\u6CE8\u5165\u5185\u5BB9",category:"tool"},injectedContext:{name:"injectedContext",description:"\u5DF2\u6CE8\u5165\u7684\u5DE5\u5177\u4E0A\u4E0B\u6587",category:"context"},extractedContent:{name:"extractedContent",description:"\u5DE5\u5177\u63D0\u53D6\u5185\u5BB9",category:"context"},recentMessagesText:{name:"recentMessagesText",description:"\u6700\u8FD1\u6D88\u606F\u6B63\u6587",category:"context"},rawRecentMessagesText:{name:"rawRecentMessagesText",description:"\u6700\u8FD1\u6D88\u606F\u539F\u6587",category:"context"},userMessage:{name:"userMessage",description:"\u5F53\u524D\u7528\u6237\u6D88\u606F",category:"chat"},previousToolOutput:{name:"previousToolOutput",description:"\u4E0A\u4E00\u6B21\u5DE5\u5177\u8F93\u51FA",category:"context"}},xi=class{constructor(){this.customVariables=new Map,this.variableHandlers=new Map,this.debugMode=!1,this._registerDefaultHandlers()}resolveTemplate(e,r){if(typeof e!="string")return e;let s=e;return s=this._resolveBuiltinVariables(s,r),s=this._resolveCustomVariables(s,r),s=this._resolveRegexVariables(s,r),s}resolveObject(e,r){if(!e||typeof e!="object")return e;if(Array.isArray(e))return e.map(n=>this.resolveObject(n,r));let s={};for(let[n,o]of Object.entries(e))typeof o=="string"?s[n]=this.resolveTemplate(o,r):typeof o=="object"&&o!==null?s[n]=this.resolveObject(o,r):s[n]=o;return s}buildToolContext(e){return{lastUserMessage:e.lastUserMessage||"",lastAiMessage:e.lastAiMessage||"",chatHistory:e.chatHistory||[],characterCard:e.characterCard||null,characterName:e.characterCard?.name||"",toolName:e.toolName||"",toolId:e.toolId||"",toolPromptMacro:e.toolPromptMacro||"",toolContentMacro:e.toolContentMacro||"",toolWorldbookContent:e.toolWorldbookContent||"",injectedContext:e.injectedContext||"",extractedContent:e.extractedContent||"",recentMessagesText:e.recentMessagesText||"",rawRecentMessagesText:e.rawRecentMessagesText||"",userMessage:e.userMessage||"",previousToolOutput:e.previousToolOutput||"",regexResults:e.regexResults||{},raw:e,timestamp:Date.now()}}registerVariable(e,r){e&&(this.customVariables.set(e,r),Fo.info(`\u6CE8\u518C\u81EA\u5B9A\u4E49\u53D8\u91CF: ${e}`))}unregisterVariable(e){this.customVariables.delete(e),Fo.info(`\u6CE8\u9500\u81EA\u5B9A\u4E49\u53D8\u91CF: ${e}`)}registerHandler(e,r){!e||typeof r!="function"||(this.variableHandlers.set(e,r),Fo.info(`\u6CE8\u518C\u53D8\u91CF\u5904\u7406\u5668: ${e}`))}getAvailableVariables(){let e=[];for(let[,r]of Object.entries(gg))e.push({name:`{{${r.name}}}`,description:r.description,category:r.category,type:"builtin"});for(let[r,s]of this.customVariables)e.push({name:`{{${r}}}`,description:typeof s=="function"?"\u81EA\u5B9A\u4E49\u51FD\u6570\u53D8\u91CF":"\u81EA\u5B9A\u4E49\u9759\u6001\u53D8\u91CF",category:"custom",type:"custom"});return e}getVariableHelp(){let e=["\u53EF\u7528\u53D8\u91CF\uFF1A",""],r={chat:"\u804A\u5929\u76F8\u5173",character:"\u89D2\u8272\u76F8\u5173",tool:"\u5DE5\u5177\u76F8\u5173",context:"\u4E0A\u4E0B\u6587\u76F8\u5173",custom:"\u81EA\u5B9A\u4E49\u53D8\u91CF"},s={};for(let n of this.getAvailableVariables())s[n.category]||(s[n.category]=[]),s[n.category].push(n);for(let[n,o]of Object.entries(r))if(s[n]&&s[n].length>0){e.push(`\u3010${o}\u3011`);for(let a of s[n])e.push(`  ${a.name} - ${a.description}`);e.push("")}return e.push("\u3010\u6B63\u5219\u63D0\u53D6\u3011"),e.push("  {{regex.xxx}} - \u4F7F\u7528\u6B63\u5219\u63D0\u53D6\u7ED3\u679C\uFF0Cxxx\u4E3A\u6355\u83B7\u7EC4\u540D"),e.join(`
`)}_registerDefaultHandlers(){this.registerHandler("regex",(e,r)=>(r.regexResults||r.raw?.regexResults||{})[e]||"")}_resolveBuiltinVariables(e,r){let s=e;return s=s.replace(/\{\{lastUserMessage\}\}/gi,r.lastUserMessage||r.raw?.lastUserMessage||""),s=s.replace(/\{\{lastAiMessage\}\}/gi,r.lastAiMessage||r.raw?.lastAiMessage||""),s=s.replace(/\{\{chatHistory\}\}/gi,()=>{let n=r.chatHistory||r.raw?.chatHistory||[];return this._formatChatHistory(n)}),s=s.replace(/\{\{characterCard\}\}/gi,()=>{let n=r.characterCard||r.raw?.characterCard;return n?this._formatCharacterCard(n):""}),s=s.replace(/\{\{toolName\}\}/gi,r.toolName||r.raw?.toolName||""),s=s.replace(/\{\{toolId\}\}/gi,r.toolId||r.raw?.toolId||""),s=s.replace(/\{\{toolPromptMacro\}\}/gi,r.toolPromptMacro||r.raw?.toolPromptMacro||""),s=s.replace(/\{\{toolContentMacro\}\}/gi,r.toolContentMacro||r.raw?.toolContentMacro||""),s=s.replace(/\{\{toolWorldbookContent\}\}/gi,r.toolWorldbookContent||r.raw?.toolWorldbookContent||""),s=s.replace(/\{\{injectedContext\}\}/gi,r.injectedContext||r.raw?.injectedContext||""),s=s.replace(/\{\{extractedContent\}\}/gi,r.extractedContent||r.raw?.extractedContent||""),s=s.replace(/\{\{recentMessagesText\}\}/gi,r.recentMessagesText||r.raw?.recentMessagesText||""),s=s.replace(/\{\{rawRecentMessagesText\}\}/gi,r.rawRecentMessagesText||r.raw?.rawRecentMessagesText||""),s=s.replace(/\{\{userMessage\}\}/gi,r.userMessage||r.raw?.userMessage||""),s=s.replace(/\{\{previousToolOutput\}\}/gi,r.previousToolOutput||r.raw?.previousToolOutput||""),s}_resolveCustomVariables(e,r){let s=e;for(let[n,o]of this.customVariables){let a=new RegExp(`\\{\\{${this._escapeRegex(n)}\\}\\}`,"gi");typeof o=="function"?s=s.replace(a,()=>{try{return o(r)}catch(i){return Fo.error(`\u53D8\u91CF\u5904\u7406\u9519\u8BEF ${n}:`,i),""}}):s=s.replace(a,String(o))}return s}_resolveRegexVariables(e,r){let s=e;for(let[n,o]of this.variableHandlers){let a=new RegExp(`\\{\\{${n}\\.([^}]+)\\}\\}`,"gi");s=s.replace(a,(i,l)=>{try{return o(l,r)}catch(c){return Fo.error(`\u53D8\u91CF\u5904\u7406\u9519\u8BEF ${n}.${l}:`,c),""}})}return s}_formatChatHistory(e){return!Array.isArray(e)||e.length===0?"":e.map(r=>{let s=r.role||"unknown",n=r.content||r.mes||"";return`[${s}]: ${n}`}).join(`

`)}_formatCharacterCard(e){if(!e)return"";let r=[];return e.name&&r.push(`\u59D3\u540D: ${e.name}`),e.description&&r.push(`\u63CF\u8FF0: ${e.description}`),e.personality&&r.push(`\u6027\u683C: ${e.personality}`),e.scenario&&r.push(`\u573A\u666F: ${e.scenario}`),r.join(`

`)}_escapeRegex(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}},Jt=new xi,wT=Jt});var xg={};le(xg,{DEFAULT_PROMPT_TEMPLATE:()=>bg,ToolPromptService:()=>vi,default:()=>vT,toolPromptService:()=>Hs});var hg,bg,vi,Hs,vT,Ti=N(()=>{ot();Bn();wi();$a();H();hg=C.createScope("ToolPromptService"),bg="\u8BF7\u5904\u7406\u4EE5\u4E0BAI\u56DE\u590D\u5185\u5BB9\uFF1A",vi=class{constructor(){this.debugMode=!1}async _buildVariableContext(e,r={}){let s=this._getPromptTemplate(e),n=String(r?.toolWorldbookContent||r?.input?.toolWorldbookContent||await Na(e)).trim(),o=Jt.buildToolContext({...r,toolName:e?.name||r?.toolName||"",toolId:e?.id||r?.toolId||"",toolWorldbookContent:n}),a=Jt.resolveTemplate(s,o).trim(),i=String(r?.toolContentMacro||r?.input?.toolContentMacro||"").trim();return Jt.buildToolContext({...r,toolName:e?.name||r?.toolName||"",toolId:e?.id||r?.toolId||"",toolPromptMacro:a,toolContentMacro:i,toolWorldbookContent:n})}async buildToolMessages(e,r){if(!e)return hg.error("\u6784\u5EFA\u5931\u8D25: \u5DE5\u5177\u914D\u7F6E\u4E3A\u7A7A"),[];let s=[],n=await this._buildVariableContext(e,r),o=Array.isArray(e.promptMessages)?e.promptMessages:[],a=this._getBypassMessages(e),i=a?.some(l=>l.mainSlot==="A"||l.mainSlot==="B"||l.isMain||l.isMain2);if(a&&a.length>0)for(let l of a)l.enabled!==!1&&s.push({role:this._normalizeRole(l.role),content:Jt.resolveTemplate(l.content||"",n)});if(!i&&o.length>0)for(let l of o){let c=Jt.resolveTemplate(l?.content||"",n).trim();c&&s.push({role:this._normalizeRole(l?.role),content:c})}else if(!i&&!a?.length){let l=this._buildUserContent(this._getPromptTemplate(e),n);l&&s.push({role:"user",content:l})}return hg.debug(`\u6784\u5EFA\u6D88\u606F: ${s.length} \u6761`),s}async buildPromptText(e,r){let s=await this._buildVariableContext(e,r),n=Array.isArray(e?.promptMessages)?e.promptMessages:[];return n.length>0?n.map(o=>Jt.resolveTemplate(o?.content||"",s).trim()).filter(Boolean).join(`

`):s.toolPromptMacro||""}getToolPromptTemplate(e){return this._getPromptTemplate(e)}_getPromptTemplate(e){return e.promptTemplate&&typeof e.promptTemplate=="string"?e.promptTemplate:bg}_getBypassMessages(e){return e.bypass?.enabled?ye.buildBypassMessages(e):[]}_buildUserContent(e,r){return!e||!e.trim()?"":Jt.resolveTemplate(e,r).trim()}_normalizeRole(e){if(!e)return"user";switch(String(e).toLowerCase()){case"system":return"system";case"assistant":return"assistant";case"user":default:return"user"}}setDebugMode(e){this.debugMode=e}},Hs=new vi,vT=Hs});var vg={};le(vg,{LEGACY_OUTPUT_MODES:()=>TT,OUTPUT_MODES:()=>Ut,TOOL_FAILURE_STAGES:()=>et,TOOL_RUNTIME_STATUS:()=>ST,TOOL_WRITEBACK_STATUS:()=>Ue,ToolOutputService:()=>Si,default:()=>_T,toolOutputService:()=>jt});function wg(t){if(t?.signal?.aborted)return{aborted:!0,stale:!1,reason:"cancelled_before_host_commit"};if(typeof t?.shouldAbortWriteback=="function")try{return t.shouldAbortWriteback()||!1}catch{return{aborted:!0,stale:!0,reason:"stale_base_changed"}}return!1}function Kn(t=[],e="",r=null){return{request:{built:Array.isArray(t)&&t.length>0,messageCount:Array.isArray(t)?t.length:0},extract:{completed:!0,hasOutput:!!String(e||"").trim()},writeback:{attempted:!!r,contentCommitted:!!r?.contentCommitted,hostCommitApplied:!!r?.hostCommitApplied,writebackStatus:r?.writebackStatus||"",preferredCommitMethod:r?.commit?.preferredMethod||"",appliedCommitMethod:r?.commit?.appliedMethod||"",fallbackUsed:!!r?.commit?.fallbackUsed},refresh:{requested:!!r?.refreshRequested,confirmed:!!r?.refreshConfirmed,requestMethods:Array.isArray(r?.refresh?.requestMethods)?[...r.refresh.requestMethods]:[],confirmChecks:Number(r?.refresh?.confirmChecks)||0,confirmedBy:r?.refresh?.confirmedBy||""}}}var as,Ut,TT,ST,et,Ue,Si,jt,_T,Wo=N(()=>{ot();jo();H();Ws();Ti();yn();Vr();fo();as=C.createScope("ToolOutputService"),Ut={FOLLOW_AI:"follow_ai",POST_RESPONSE_API:"post_response_api",LOCAL_TRANSFORM:"local_transform"},TT={inline:"follow_ai"},ST={IDLE:"idle",RUNNING:"running",SUCCESS:"success",ERROR:"error"},et={BUILD_MESSAGES:"build_messages",SEND_API_REQUEST:"send_api_request",EXTRACT_OUTPUT:"extract_output",INJECT_CONTEXT:"inject_context",COMPATIBILITY_EXECUTE:"compatibility_execute",UNKNOWN:"unknown"},Ue={SUCCESS:"success",FAILED:"failed",SKIPPED_EMPTY_OUTPUT:"skipped_empty_output",NOT_APPLICABLE:"not_applicable"};Si=class{constructor(){this.debugMode=!1,this._apiConnection=null}shouldRunPostResponse(e){return!e||!e.enabled||!e.output?.enabled?!1:e.output?.mode===Ut.POST_RESPONSE_API}shouldRunLocalTransform(e){return!e||!e.enabled||!e.output?.enabled?!1:e.output?.mode===Ut.LOCAL_TRANSFORM||!!e.processor?.type}shouldRunFollowAi(e){if(!e||!e.enabled||!e.output?.enabled)return!1;let r=e.output?.mode;return r===Ut.FOLLOW_AI||r==="inline"}shouldRunInline(e){return this.shouldRunFollowAi(e)}async runToolPostResponse(e,r){let s=Date.now(),n=e.id,o=r?.traceId||`trace_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,a=r?.sessionKey||"",i=r?.executionKey||"",l=this._getExtractionSelectors(e),c=e?.extraction?.writebackTag?.trim(),d=c?[c]:l,u=e.output?.apiPreset||e.apiPreset||"",y="",p=Ue.NOT_APPLICABLE,g=null,m=[],h="";as.info(`\u5F00\u59CB\u6267\u884C\u5DE5\u5177: ${n}`),W.emit(j.TOOL_EXECUTION_STARTED,{toolId:n,traceId:o,sessionKey:a,mode:Ut.POST_RESPONSE_API});try{if(y=et.BUILD_MESSAGES,m=await this._buildToolMessages(e,r),!m||m.length===0)throw new Error("\u672A\u6784\u5EFA\u51FA\u53EF\u53D1\u9001\u7684\u5DE5\u5177\u8BF7\u6C42\u6D88\u606F\uFF0C\u8BF7\u68C0\u67E5\u63D0\u793A\u8BCD\u6A21\u677F\u6216\u7834\u9650\u8BCD\u914D\u7F6E\u662F\u5426\u4E3A\u7A7A\u3002");as.debug(`\u6784\u5EFA\u4E86 ${m.length} \u6761\u6D88\u606F`);let x=wg(r);if(x){let w=Date.now()-s;return{success:!1,toolId:n,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88",duration:w,meta:{traceId:o,sessionKey:a,executionKey:i,sourceMessageId:r?.sourceMessageId||r?.confirmedAssistantMessageId||r?.messageId||"",sourceSwipeId:r?.sourceSwipeId||r?.confirmedAssistantSwipeId||r?.effectiveSwipeId||"",slotRevisionKey:r?.slotRevisionKey||"",selectors:l,apiPreset:u,writebackStatus:p,failureStage:y,writebackDetails:g,aborted:x.aborted===!0,stale:x.stale===!0,abortReason:x.reason||"",phases:Kn(m,h,g)}}}let v=await this._getRequestTimeout();y=et.SEND_API_REQUEST;let T=await this._sendApiRequest(u,m,{timeoutMs:v,signal:r.signal});y=et.EXTRACT_OUTPUT,h=this._extractOutputContent(T,e);let A=wg(r);if(A){let w=Date.now()-s;return{success:!1,toolId:n,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88",duration:w,meta:{traceId:o,sessionKey:a,executionKey:i,sourceMessageId:r?.sourceMessageId||r?.confirmedAssistantMessageId||r?.messageId||"",sourceSwipeId:r?.sourceSwipeId||r?.confirmedAssistantSwipeId||r?.effectiveSwipeId||"",slotRevisionKey:r?.slotRevisionKey||"",selectors:l,apiPreset:u,writebackStatus:p,failureStage:y,writebackDetails:g,aborted:A.aborted===!0,stale:A.stale===!0,abortReason:A.reason||"",phases:Kn(m,h,g)}}}if(h){if(y=et.INJECT_CONTEXT,g=await Kt.injectDetailed(n,h,{overwrite:e.output?.overwrite!==!1,sourceMessageId:r.sourceMessageId||r.confirmedAssistantMessageId||r.messageId||"",sourceSwipeId:r.sourceSwipeId||r.confirmedAssistantSwipeId||r.effectiveSwipeId||"",effectiveSwipeId:r.effectiveSwipeId||r.confirmedAssistantSwipeId||"",slotBindingKey:r.slotBindingKey||"",slotRevisionKey:r.slotRevisionKey||"",slotTransactionId:r.slotTransactionId||"",extractionSelectors:d,traceId:o,sessionKey:a,signal:r.signal,shouldAbortWriteback:r.shouldAbortWriteback,isAutoRun:r.isAutoRun===!0,skipNotify:r.skipNotify===!0}),!g?.success)throw p=Ue.FAILED,new Error(g?.error||"\u5DE5\u5177\u7ED3\u679C\u5DF2\u751F\u6210\uFF0C\u4F46\u5199\u5165\u4E0A\u4E0B\u6587/\u4E16\u754C\u4E66\u5931\u8D25");p=Ue.SUCCESS}else p=Ue.SKIPPED_EMPTY_OUTPUT;y="";let E=Date.now()-s;return W.emit(j.TOOL_EXECUTED,{toolId:n,traceId:o,sessionKey:a,success:!0,duration:E,mode:Ut.POST_RESPONSE_API}),as.info(`\u5DE5\u5177\u6267\u884C\u6210\u529F: ${n}, \u8017\u65F6 ${E}ms`),{success:!0,toolId:n,output:h,duration:E,meta:{traceId:o,sessionKey:a,executionKey:i,slotBindingKey:r?.slotBindingKey||"",slotTransactionId:r?.slotTransactionId||"",generationAction:r?.generationAction||"",generationActionSource:r?.generationActionSource||"",rawGenerationType:r?.rawGenerationType||"",normalizedGenerationType:r?.normalizedGenerationType||"",generationMessageBindingSource:r?.generationMessageBindingSource||"",sourceMessageId:r?.sourceMessageId||r?.confirmedAssistantMessageId||r?.messageId||"",sourceSwipeId:r?.sourceSwipeId||r?.confirmedAssistantSwipeId||r?.effectiveSwipeId||"",confirmedAssistantSwipeId:r?.confirmedAssistantSwipeId||"",effectiveSwipeId:r?.effectiveSwipeId||"",slotRevisionKey:r?.slotRevisionKey||"",messageCount:m.length,selectors:l,apiPreset:u,writebackStatus:p,failureStage:"",writebackDetails:g,phases:Kn(m,h,g)}}}catch(x){let v=Date.now()-s,T=y||et.UNKNOWN,A=p||Ue.NOT_APPLICABLE;return as.error(`\u5DE5\u5177\u6267\u884C\u5931\u8D25: ${n}`,{error:x}),W.emit(j.TOOL_EXECUTION_FAILED,{toolId:n,traceId:o,sessionKey:a,error:x.message||String(x),duration:v}),{success:!1,toolId:n,error:x.message||String(x),duration:v,meta:{traceId:o,sessionKey:a,executionKey:i,slotBindingKey:r?.slotBindingKey||"",slotTransactionId:r?.slotTransactionId||"",generationAction:r?.generationAction||"",generationActionSource:r?.generationActionSource||"",rawGenerationType:r?.rawGenerationType||"",normalizedGenerationType:r?.normalizedGenerationType||"",generationMessageBindingSource:r?.generationMessageBindingSource||"",sourceMessageId:r?.sourceMessageId||r?.confirmedAssistantMessageId||r?.messageId||"",sourceSwipeId:r?.sourceSwipeId||r?.confirmedAssistantSwipeId||r?.effectiveSwipeId||"",confirmedAssistantSwipeId:r?.confirmedAssistantSwipeId||"",effectiveSwipeId:r?.effectiveSwipeId||"",slotRevisionKey:r?.slotRevisionKey||"",messageCount:m.length,selectors:l,apiPreset:u,writebackStatus:A,failureStage:T,writebackDetails:g,phases:Kn(m,h,g)}}}}async runToolFollowAiManual(e,r){let s=Date.now(),n=e.id,o=r?.traceId||`trace_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,a=r?.sessionKey||"",i=r?.executionKey||"",l=e.output?.apiPreset||e.apiPreset||"",c=this._getExtractionSelectors(e),d=e?.extraction?.writebackTag?.trim(),u=d?[d]:c,y="",p=Ue.NOT_APPLICABLE,g=null,m=[],h="";W.emit(j.TOOL_EXECUTION_STARTED,{toolId:n,traceId:o,sessionKey:a,mode:Ut.FOLLOW_AI});try{if(y=et.BUILD_MESSAGES,m=await this._buildToolMessages(e,r),!m||m.length===0)throw new Error("\u672A\u6784\u5EFA\u51FA\u53EF\u53D1\u9001\u7684\u5DE5\u5177\u8BF7\u6C42\u6D88\u606F\uFF0C\u8BF7\u68C0\u67E5\u63D0\u793A\u8BCD\u6A21\u677F\u6216\u7834\u9650\u8BCD\u914D\u7F6E\u662F\u5426\u4E3A\u7A7A\u3002");let x=await this._getRequestTimeout();y=et.SEND_API_REQUEST;let v=await this._sendApiRequest(l,m,{timeoutMs:x,signal:r.signal});if(y=et.EXTRACT_OUTPUT,h=this._extractOutputContent(v,e),h){if(y=et.INJECT_CONTEXT,g=await Kt.injectDetailed(n,h,{overwrite:e.output?.overwrite!==!1,sourceMessageId:r.sourceMessageId||r.confirmedAssistantMessageId||r.messageId||"",sourceSwipeId:r.sourceSwipeId||r.confirmedAssistantSwipeId||r.effectiveSwipeId||"",effectiveSwipeId:r.effectiveSwipeId||r.confirmedAssistantSwipeId||"",slotBindingKey:r.slotBindingKey||"",slotRevisionKey:r.slotRevisionKey||"",slotTransactionId:r.slotTransactionId||"",extractionSelectors:u,traceId:o,sessionKey:a}),!g?.success)throw p=Ue.FAILED,new Error(g?.error||"\u5DE5\u5177\u7ED3\u679C\u5DF2\u751F\u6210\uFF0C\u4F46\u5199\u5165\u4E0A\u4E0B\u6587/\u4E16\u754C\u4E66\u5931\u8D25");p=Ue.SUCCESS}else p=Ue.SKIPPED_EMPTY_OUTPUT;y="";let T=Date.now()-s;return W.emit(j.TOOL_EXECUTED,{toolId:n,traceId:o,sessionKey:a,success:!0,duration:T,mode:Ut.FOLLOW_AI}),{success:!0,toolId:n,output:h,duration:T,meta:{traceId:o,sessionKey:a,executionKey:i,slotBindingKey:r?.slotBindingKey||"",slotTransactionId:r?.slotTransactionId||"",sourceMessageId:r?.sourceMessageId||r?.confirmedAssistantMessageId||r?.messageId||"",sourceSwipeId:r?.sourceSwipeId||r?.confirmedAssistantSwipeId||r?.effectiveSwipeId||"",confirmedAssistantSwipeId:r?.confirmedAssistantSwipeId||"",effectiveSwipeId:r?.effectiveSwipeId||"",slotRevisionKey:r?.slotRevisionKey||"",messageCount:m.length,selectors:c,apiPreset:l,writebackStatus:p,failureStage:"",writebackDetails:g,phases:Kn(m,h,g)}}}catch(x){let v=Date.now()-s,T=y||et.UNKNOWN,A=p||Ue.NOT_APPLICABLE;return W.emit(j.TOOL_EXECUTION_FAILED,{toolId:n,traceId:o,sessionKey:a,error:x.message||String(x),duration:v,mode:Ut.FOLLOW_AI}),{success:!1,toolId:n,error:x.message||String(x),duration:v,meta:{traceId:o,sessionKey:a,executionKey:i,slotBindingKey:r?.slotBindingKey||"",slotTransactionId:r?.slotTransactionId||"",sourceMessageId:r?.sourceMessageId||r?.confirmedAssistantMessageId||r?.messageId||"",sourceSwipeId:r?.sourceSwipeId||r?.confirmedAssistantSwipeId||r?.effectiveSwipeId||"",confirmedAssistantSwipeId:r?.confirmedAssistantSwipeId||"",effectiveSwipeId:r?.effectiveSwipeId||"",slotRevisionKey:r?.slotRevisionKey||"",messageCount:m.length,selectors:c,apiPreset:l,writebackStatus:A,failureStage:T,writebackDetails:g,phases:Kn(m,h,g)}}}}async runToolInline(e,r){return this.runToolFollowAiManual(e,r)}async previewExtraction(e,r){return{success:!0,...this.getExtractionSnapshot(e,r)}}getExtractionSnapshot(e,r){let s=this._buildRecentMessageExtractionEntries(e,r),n=this._joinMessageBlocks(s,"rawText"),o=this._joinMessageBlocks(s,"filteredText"),a=this._joinMessageBlocks(s,"extractedText",{skipEmpty:!0}),i=(Array.isArray(s)?s:[]).map(c=>String(c?.extractedText||"").trim()).filter(Boolean).join(`

`),l=Array.isArray(s)&&s.length>0?s[s.length-1]:null;return{sourceText:n,filteredSourceText:o,extractedText:a,extractedRawText:i,messageEntries:s,primaryEntry:l,selectors:this._getExtractionSelectors(e),maxMessages:e?.extraction?.maxMessages||5}}async _buildToolMessages(e,r){let s=this._buildRecentMessageExtractionEntries(e,r),n=this._joinMessageBlocks(s,"rawText"),o=this._joinMessageBlocks(s,"filteredText"),a=this._joinMessageBlocks(s,"extractedText",{skipEmpty:!0}),i={...r,rawRecentMessagesText:n,recentMessagesText:o,extractedContent:a,toolContentMacro:this._buildToolContentMacro(s),toolName:e.name,toolId:e.id};return Hs.buildToolMessages(e,i)}_normalizeRole(e){if(!e)return"user";let r=String(e).toLowerCase();return r==="system"?"system":r==="assistant"?"assistant":"user"}setApiConnection(e){this._apiConnection=e}async _sendApiRequest(e,r,s={}){if(!this._apiConnection)throw new Error("API\u8FDE\u63A5\u6A21\u5757\u672A\u914D\u7F6E");let{timeoutMs:n=9e4,signal:o}=s,a=null;if(e){if(!uo(e))throw new Error(`\u672A\u627E\u5230 API \u9884\u8BBE\u201C${e}\u201D\uFF0C\u8BF7\u91CD\u65B0\u9009\u62E9\u6216\u4FDD\u5B58\u540E\u518D\u6267\u884C`);a=co(e)}else a=co();let i=wa(a||{});if(!i.valid&&!a?.useMainApi)throw new Error(`API\u914D\u7F6E\u65E0\u6548\uFF1A${i.errors.join("\uFF0C")}\u3002\u8BF7\u5148\u5B8C\u5584\u81EA\u5B9A\u4E49API\u914D\u7F6E\uFF0C\u6216\u542F\u7528\u201C\u4F7F\u7528SillyTavern\u4E3BAPI\u201D`);if(this._apiConnection.sendApiRequest)return await this._apiConnection.sendApiRequest(r,{timeoutMs:n,apiConfig:a},o);throw new Error("\u6CA1\u6709\u53EF\u7528\u7684API\u53D1\u9001\u65B9\u6CD5")}async _getRequestTimeout(){return Vt.getSettings().executor?.requestTimeoutMs||9e4}_extractOutputContent(e,r){if(!e)return"";if(typeof e=="string")return this._applyOutputExtractionSelectors(e,r);if(typeof e=="object"){if(e.choices&&e.choices[0]?.message?.content)return this._applyOutputExtractionSelectors(e.choices[0].message.content,r);if(e.content)return this._applyOutputExtractionSelectors(e.content,r);if(e.text)return this._applyOutputExtractionSelectors(e.text,r);if(e.message)return this._applyOutputExtractionSelectors(e.message,r);try{return this._applyOutputExtractionSelectors(JSON.stringify(e,null,2),r)}catch{return this._applyOutputExtractionSelectors(String(e),r)}}return this._applyOutputExtractionSelectors(String(e),r)}_applyOutputExtractionSelectors(e,r){let s=typeof e=="string"?e:String(e||""),n=this._getExtractionSelectors(r);if(!n.length)return s.trim();let o=[];for(let a of n){let i=String(a||"").trim();if(!i)continue;if(i.startsWith("regex:")){let c=i.slice(6).trim();if(!c)continue;try{let d=new RegExp(c,"gi");[...s.matchAll(d)].forEach(y=>{let p=String(y?.[0]||"").trim();p&&o.push(p)})}catch(d){as.warn("\u5DE5\u5177\u8F93\u51FA\u6B63\u5219\u63D0\u53D6\u5931\u8D25\uFF0C\u8DF3\u8FC7\u8BE5\u89C4\u5219",{selector:i,error:d})}continue}let l=i.replace(/^<|>$/g,"").trim();if(l)try{let c=new RegExp(`<${l}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${l}>`,"gi");(s.match(c)||[]).forEach(u=>{let y=String(u||"").trim();y&&o.push(y)})}catch(c){as.warn("\u5DE5\u5177\u8F93\u51FA\u6807\u7B7E\u63D0\u53D6\u5931\u8D25\uFF0C\u8DF3\u8FC7\u8BE5\u89C4\u5219",{selector:i,error:c})}}return o.length>0?o.join(`

`).trim():s.trim()}_resolveExtractionContext(e){let r=e?.extraction?.regexPresetId;if(!r)return{rules:[],blacklist:[]};try{let s=Cr(r);if(!s)return{rules:[],blacklist:[]};let n=Array.isArray(s.rules)?s.rules.filter(a=>a&&a.enabled!==!1&&a.value).map(a=>({id:a.id,type:a.type,value:a.value,enabled:!0})):[],o=Array.isArray(s.blacklist)?s.blacklist.map(a=>String(a||"").trim()).filter(Boolean):[];return{rules:n,blacklist:o}}catch(s){return as.warn("_resolveExtractionContext \u5F02\u5E38",{error:s}),{rules:[],blacklist:[]}}}_getExtractionSelectors(e){let{rules:r}=this._resolveExtractionContext(e),s=[];for(let n of r){let o=String(n.value||"").trim();o&&(n.type==="include"?s.push(o):n.type==="regex_include"&&s.push(`regex:${o}`))}return s}_applyExtractionSelectors(e,r){return this._applyExtractionSelectorsInternal(e,r,{strict:!1})}_applyExtractionSelectorsInternal(e,r,s={}){let n=typeof e=="string"?e:String(e||""),{rules:o,blacklist:a}=this._resolveExtractionContext(r),{strict:i=!1}=s;if(!o.length)return n.trim();let l=Ar(n,o,a||[]);return i?(l||"").trim():l||n.trim()}_extractToolContent(e,r){let s=typeof r=="string"?r:String(r||""),{rules:n}=this._resolveExtractionContext(e);return n.length?this._applyExtractionSelectorsInternal(s,e,{strict:!0}):s.trim()}_applyGlobalContextRules(e){let r=typeof e=="string"?e:String(e||"");if(!r.trim())return"";try{let s=un()||[],n=pn()||[];return!Array.isArray(s)||s.length===0?r.trim():Ar(r,s,n)||r.trim()}catch(s){return as.warn("\u5E94\u7528\u5168\u5C40\u6B63\u6587\u63D0\u53D6\u89C4\u5219\u5931\u8D25\uFF0C\u56DE\u9000\u539F\u59CB\u6587\u672C",{error:s}),r.trim()}}_getMessageText(e){if(!e)return"";let r=[e.content,e.mes,e.message,e.text,e?.data?.content];for(let s of r)if(typeof s=="string"&&s.trim())return s.trim();return""}_collectRecentAssistantMessages(e,r){return this._collectRecentAssistantMessageEntries(e,r).map(s=>s.text).filter(Boolean).join(`

`)}_collectRecentAssistantMessageEntries(e,r){let s=Math.max(1,parseInt(e?.extraction?.maxMessages,10)||5),n=Array.isArray(r?.chatMessages)?r.chatMessages:[],o=[];for(let i=n.length-1;i>=0&&o.length<s;i-=1){let l=n[i],c=String(l?.role||"").toLowerCase(),d=c==="assistant"||c==="ai"||!l?.is_user&&!l?.is_system&&!c,u=this._getMessageText(l);d&&u&&o.unshift({text:u,message:l,chatIndex:i})}if(o.length>0)return o;let a=r?.lastAiMessage||r?.input?.lastAiMessage||"";return a?[{text:a,message:null,chatIndex:-1}]:[]}_buildRecentMessageExtractionEntries(e,r){return this._collectRecentAssistantMessageEntries(e,r).map((n,o)=>{let a=n.text||"",i=this._applyGlobalContextRules(a),l=this._extractToolContent(e,a);return{...n,order:o+1,rawText:a,filteredText:i,extractedText:l,fullMessageText:a}})}_joinMessageBlocks(e,r,s={}){let n=Array.isArray(e)?e:[],{skipEmpty:o=!1}=s;return n.map(i=>{let l=String(i?.[r]||"").trim();return o&&!l?"":`${`\u3010\u7B2C ${i?.order||0} \u6761 AI \u6D88\u606F\u3011`}
${l||"(\u7A7A)"}`}).filter(Boolean).join(`

--------------------------------

`)}_buildToolContentMacro(e){return(Array.isArray(e)?e:[]).map(n=>{let o=`\u3010\u7B2C ${n?.order||0} \u6761 AI \u6D88\u606F\u3011`,a=String(n?.filteredText||"").trim()||"(\u7A7A)",i=String(n?.extractedText||"").trim()||"(\u7A7A)";return`${o}
\u6B63\u6587\uFF1A
${a}

\u5DE5\u5177\uFF1A
${i}`}).filter(Boolean).join(`

--------------------------------

`).trim()}filterPostResponseTools(e){return Array.isArray(e)?e.filter(r=>this.shouldRunPostResponse(r)):[]}filterAutoPostResponseTools(e){return Array.isArray(e)?e.filter(r=>this.shouldRunPostResponse(r)):[]}filterInlineTools(e){return Array.isArray(e)?e.filter(r=>this.shouldRunInline(r)):[]}setDebugMode(e){this.debugMode=e}},jt=new Si,_T=jt});function Sg(t={}){return!t||typeof t!="object"?{}:Object.entries(t).reduce((e,[r,s])=>(e[r]=s===!0,e),{})}function CT(t,e={}){let r=e?.direction==="unescape"?"unescape":"escape",s=Sg(e?.options);return AT.reduce((n,o)=>s[o.key]!==!0?n:r==="unescape"?n.replace(o.escaped,o.unescaped):n.replace(o.plain,o.replacement),String(t||""))}function IT(t,e={}){if((e?.direction||"en_to_zh")!=="en_to_zh")return String(t||"");let s=Sg(e?.options);return ET.reduce((n,o)=>s[o.key]!==!0?n:n.replace(o.from,o.to),String(t||""))}function kT(t,e){let r=t?.processor||{},s=r?.type||"",n=String(e||"");switch(s){case Tg.ESCAPE_TRANSFORM:return CT(n,r);case Tg.PUNCTUATION_TRANSFORM:return IT(n,r);default:return n}}function RT(t,e,r){let s=String(t||""),n=String(e||"").trim(),o=String(r||"").trim();return!s.trim()||!n?{nextMessageText:"",replaced:!1}:s.includes(n)?{nextMessageText:s.replace(n,o).trim(),replaced:!0}:{nextMessageText:"",replaced:!1}}async function _i(t,e={}){let r=jt.getExtractionSnapshot(t,e),s=r?.primaryEntry||null,n=String(s?.fullMessageText||e?.lastAiMessage||"").trim(),o=String(s?.extractedText||r?.extractedRawText||r?.extractedText||"").trim(),a=Array.isArray(r?.selectors)?r.selectors:[],i=e?.traceId||`trace_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,l=e?.sessionKey||"";if(!o||!n)return{success:!1,error:"\u672A\u63D0\u53D6\u5230\u53EF\u5904\u7406\u5185\u5BB9\uFF0C\u8BF7\u5148\u68C0\u67E5\u6807\u7B7E\u6216\u6B63\u5219\u89C4\u5219",meta:{traceId:i,sessionKey:l,selectors:a,writebackStatus:Ue.NOT_APPLICABLE,failureStage:et.EXTRACT_OUTPUT,extraction:r}};let c=String(kT(t,o)||"").trim(),d=RT(n,o,c),u=d.replaced?d.nextMessageText:c,y=null,p=Ue.NOT_APPLICABLE;if(u){if(y=await Kt.injectDetailed(t.id,u,{overwrite:!0,sourceMessageId:e?.sourceMessageId||e?.confirmedAssistantMessageId||e?.messageId||"",sourceSwipeId:e?.sourceSwipeId||e?.confirmedAssistantSwipeId||e?.effectiveSwipeId||"",effectiveSwipeId:e?.effectiveSwipeId||e?.confirmedAssistantSwipeId||"",slotBindingKey:e?.slotBindingKey||"",slotRevisionKey:e?.slotRevisionKey||"",slotTransactionId:e?.slotTransactionId||"",extractionSelectors:[],replaceFullMessage:d.replaced,traceId:i,sessionKey:l,skipNotify:e?.skipNotify===!0}),!y?.success)return{success:!1,error:y?.error||"\u672C\u5730\u5904\u7406\u5B8C\u6210\uFF0C\u4F46\u5199\u56DE\u5931\u8D25",meta:{traceId:i,sessionKey:l,selectors:a,writebackStatus:Ue.FAILED,failureStage:et.INJECT_CONTEXT,writebackDetails:y,extraction:r}};p=Ue.SUCCESS}else p=Ue.SKIPPED_EMPTY_OUTPUT;return{success:!0,output:c,writebackState:u?{committed:y?.contentCommitted===!0}:null,meta:{traceId:i,sessionKey:l,selectors:a,writebackStatus:p,failureStage:"",writebackDetails:y,extraction:r}}}var AT,ET,Tg,od=N(()=>{Wo();Ws();AT=[{key:"newline",plain:/\r\n|\r|\n/g,escaped:/\\n/g,replacement:"\\n",unescaped:`
`},{key:"doubleQuote",plain:/"/g,escaped:/\\"/g,replacement:'\\"',unescaped:'"'},{key:"singleQuote",plain:/'/g,escaped:/\\'/g,replacement:"\\'",unescaped:"'"}],ET=[{key:"comma",from:/,/g,to:"\uFF0C"},{key:"period",from:/\./g,to:"\u3002"},{key:"exclamation",from:/!/g,to:"\uFF01"},{key:"question",from:/\?/g,to:"\uFF1F"},{key:"semicolon",from:/;/g,to:"\uFF1B"},{key:"colon",from:/:/g,to:"\uFF1A"},{key:"leftParen",from:/\(/g,to:"\uFF08"},{key:"rightParen",from:/\)/g,to:"\uFF09"}],Tg={ESCAPE_TRANSFORM:"escape_transform",PUNCTUATION_TRANSFORM:"punctuation_transform"}});var ld={};le(ld,{abortAllTasks:()=>OT,abortTask:()=>$T,buildToolMessages:()=>Eg,clearExecutionHistory:()=>KT,createExecutionContext:()=>WT,createResult:()=>Ai,enhanceMessagesWithBypass:()=>HT,executeBatch:()=>NT,executeTool:()=>Ag,executeToolWithConfig:()=>Cg,executeToolsBatch:()=>YT,executorState:()=>Be,extractFailed:()=>FT,extractSuccessful:()=>jT,generateTaskId:()=>Gs,getExecutionHistory:()=>zT,getExecutorStatus:()=>BT,getScheduler:()=>Un,mergeResults:()=>UT,pauseExecutor:()=>DT,resumeExecutor:()=>LT,setMaxConcurrent:()=>PT});function Ai(t,e,r,s,n,o,a=0){return{success:r,taskId:t,toolId:e,data:s,error:n,duration:o,retries:a,timestamp:Date.now(),metadata:{}}}function Gs(){return`task_${Date.now()}_${Math.random().toString(36).substr(2,9)}`}function MT(t,e={}){return{id:Gs(),toolId:t,options:e,status:"pending",createdAt:Date.now(),startedAt:null,completedAt:null,retries:0,maxRetries:e.maxRetries||3}}function Un(){return Ho||(Ho=new ad(Be.maxConcurrent)),Ho}function PT(t){Be.maxConcurrent=Math.max(1,Math.min(10,t)),Ho&&(Ho.maxConcurrent=Be.maxConcurrent)}async function Ag(t,e={},r){let s=Un(),n=MT(t,e);for(;Be.isPaused;)await new Promise(o=>setTimeout(o,100));try{let o=await s.enqueue(async a=>{if(a.aborted)throw new DOMException("\u4EFB\u52A1\u5DF2\u4E2D\u6B62","AbortError");if(typeof r=="function")return await r(a,e);throw new Error("\u6267\u884C\u5668\u5FC5\u987B\u662F\u4E00\u4E2A\u51FD\u6570")},n);return _g(o),o}catch(o){id.error(`executeTool \u5F02\u5E38 (toolId=${t})`,{error:o});let a=Ai(n.id,t,!1,null,o,Date.now()-n.createdAt,n.retries);return _g(a),a}}async function NT(t,e={}){let{failFast:r=!1,concurrency:s=Be.maxConcurrent}=e,n=[],o=Un(),a=o.maxConcurrent;o.maxConcurrent=s;try{let i=t.map(({toolId:l,options:c,executor:d})=>Ag(l,c,d));if(r)for(let l of i){let c=await l;if(n.push(c),!c.success){o.abortAll();break}}else{let l=await Promise.allSettled(i);for(let c of l)c.status==="fulfilled"?n.push(c.value):n.push(Ai(Gs(),"unknown",!1,null,c.reason,0,0))}}finally{o.maxConcurrent=a}return n}function $T(t){return Un().abort(t)}function OT(){Un().abortAll(),Be.executionQueue=[]}function DT(){Be.isPaused=!0}function LT(){Be.isPaused=!1}function BT(){return{...Un().getStatus(),isPaused:Be.isPaused,activeControllers:Be.activeControllers.size,historyCount:Be.executionHistory.length}}function _g(t){Be.executionHistory.push(t),Be.executionHistory.length>100&&Be.executionHistory.shift()}function zT(t={}){let e=[...Be.executionHistory];return t.toolId&&(e=e.filter(r=>r.toolId===t.toolId)),t.success!==void 0&&(e=e.filter(r=>r.success===t.success)),t.limit&&(e=e.slice(-t.limit)),e}function KT(){Be.executionHistory=[]}function UT(t){let e={success:!0,data:[],errors:[],totalDuration:0,successCount:0,failureCount:0};for(let r of t)e.totalDuration+=r.duration,r.success?(e.successCount++,r.data!==void 0&&r.data!==null&&e.data.push(r.data)):(e.success=!1,e.failureCount++,r.error&&e.errors.push({taskId:r.taskId,toolId:r.toolId,error:r.error.message||String(r.error)}));return e}function jT(t){return t.filter(e=>e.success).map(e=>e.data)}function FT(t){return t.filter(e=>!e.success).map(e=>({taskId:e.taskId,toolId:e.toolId,error:e.error}))}function WT(t={}){return{taskId:Gs(),startTime:Date.now(),signal:t.signal||null,apiConfig:t.apiConfig||null,bypassMessages:t.bypassMessages||[],context:t.context||{},metadata:t.metadata||{}}}function HT(t,e){return!e||e.length===0?t:[...e,...t]}function GT(t){return t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function Eg(t,e){let r=[],s=t.promptTemplate||"",n={"{{userMessage}}":e.input?.userMessage||"","{{lastAiMessage}}":e.input?.lastAiMessage||"","{{extractedContent}}":e.input?.extractedContent||"","{{previousToolOutput}}":e.input?.previousToolOutput||"","{{context}}":JSON.stringify(e.input?.context||{}),"{{pg}}":e.input?.context?.pg||"1","{{time}}":e.input?.context?.time||"","{{scene}}":e.input?.context?.scene||"","{{plot}}":e.input?.context?.plot||"","{{mq}}":e.input?.context?.mq||"\u2160","{{mqStatus}}":e.input?.context?.mqStatus||"\u8FDB\u884C\u4E2D","{{sq}}":e.input?.context?.sq||"1","{{sqStatus}}":e.input?.context?.sqStatus||"\u8FDB\u884C\u4E2D","{{latestSq}}":e.input?.context?.latestSq||"1","{{completed}}":e.input?.context?.completed||"\u65E0","{{defined}}":e.input?.context?.defined||"","{{status}}":e.input?.context?.status||"","{{seeds}}":e.input?.context?.seeds||"","{{name}}":e.input?.context?.name||"","{{location}}":e.input?.context?.location||"","{{condition}}":e.input?.context?.condition||"","{{equipment}}":e.input?.context?.equipment||"","{{skills}}":e.input?.context?.skills||""};for(let[o,a]of Object.entries(n))s=s.replace(new RegExp(GT(o),"g"),a);return r.push({role:"USER",content:s}),r}async function Cg(t,e,r={}){let s=de(t);if(!s)return{success:!1,taskId:Gs(),toolId:t,error:"\u5DE5\u5177\u914D\u7F6E\u4E0D\u5B58\u5728",duration:0};if(!s.enabled)return{success:!1,taskId:Gs(),toolId:t,error:"\u5DE5\u5177\u672A\u542F\u7528",duration:0};let n=Date.now(),o=Gs();try{W.emit(j.TOOL_EXECUTION_STARTED,{toolId:t,taskId:o,context:e});let a=Eg(s,e);if(typeof r.callApi=="function"){let i=s.output?.apiPreset||s.apiPreset||"",l=i?{preset:i}:null,c=await r.callApi(a,l,r.signal),d=c;s.outputMode==="separate"&&s.extractTags?.length>0&&(d=qT(c,s.extractTags));let u={success:!0,taskId:o,toolId:t,data:d,duration:Date.now()-n};return W.emit(j.TOOL_EXECUTED,{toolId:t,taskId:o,result:u}),u}else return{success:!0,taskId:o,toolId:t,data:{messages:a,config:{apiPreset:s.output?.apiPreset||s.apiPreset||"",outputMode:s.outputMode,extractTags:s.extractTags}},duration:Date.now()-n,needsExecution:!0}}catch(a){id.error(`executeToolWithConfig \u5F02\u5E38 (toolId=${t})`,{error:a});let i={success:!1,taskId:o,toolId:t,error:a.message||String(a),duration:Date.now()-n};return W.emit(j.TOOL_EXECUTION_FAILED,{toolId:t,taskId:o,error:a}),i}}function qT(t,e){let r={};for(let s of e){let n=new RegExp(`<${s}[^>]*>([\\s\\S]*?)<\\/${s}>`,"gi"),o=t.match(n);o&&(r[s]=o.map(a=>{let i=a.match(new RegExp(`<${s}[^>]*>([\\s\\S]*?)<\\/${s}>`,"i"));return i?i[1].trim():""}))}return r}async function YT(t,e,r={}){let s=[];for(let n of t){let o=de(n);if(o&&o.enabled){let a=await Cg(n,e,r);s.push(a)}}return s}var id,Be,ad,Ho,cd=N(()=>{gr();ot();H();id=C.createScope("ToolExecutor"),Be={activeControllers:new Map,executionQueue:[],runningCount:0,maxConcurrent:3,executionHistory:[],isPaused:!1};ad=class{constructor(e=3){this.maxConcurrent=e,this.queue=[],this.running=new Map,this.isProcessing=!1}enqueue(e,r){return new Promise((s,n)=>{this.queue.push({executor:e,task:r,resolve:s,reject:n}),this.process()})}async process(){if(!this.isProcessing){for(this.isProcessing=!0;this.queue.length>0&&this.running.size<this.maxConcurrent;){let e=this.queue.shift();if(!e)continue;let{executor:r,task:s,resolve:n,reject:o}=e,a=new AbortController;s.abortController=a,s.status="running",s.startedAt=Date.now(),this.running.set(s.id,s),Be.activeControllers.set(s.id,a),this.executeTask(r,s,a.signal).then(i=>{s.status="completed",s.completedAt=Date.now(),n(i)}).catch(i=>{s.status=i.name==="AbortError"?"aborted":"failed",s.completedAt=Date.now(),o(i)}).finally(()=>{this.running.delete(s.id),Be.activeControllers.delete(s.id),Be.runningCount=this.running.size})}this.isProcessing=!1}}async executeTask(e,r,s){let n=Date.now(),o=null;for(let a=0;a<=r.maxRetries;a++){if(s.aborted)throw new DOMException("\u4EFB\u52A1\u5DF2\u4E2D\u6B62","AbortError");try{let i=await e(s);return Ai(r.id,r.toolId,!0,i,null,Date.now()-n,a)}catch(i){if(o=i,i.name==="AbortError")throw i;a===r.maxRetries&&id.error(`\u4EFB\u52A1\u6267\u884C\u5931\u8D25 (toolId=${r.toolId}, ${a+1}\u6B21\u91CD\u8BD5)`,{error:i}),a<r.maxRetries&&(await this.delay(1e3*(a+1)),r.retries=a+1)}}throw o}delay(e){return new Promise(r=>setTimeout(r,e))}abort(e){let r=Be.activeControllers.get(e);return r?(r.abort(),!0):!1}abortAll(){for(let e of Be.activeControllers.values())e.abort();Be.activeControllers.clear(),this.queue=[],this.running.clear()}getStatus(){return{pending:this.queue.length,running:this.running.size,maxConcurrent:this.maxConcurrent}}},Ho=null});async function VT(){return dd||(dd=Promise.resolve().then(()=>(cd(),ld))),dd}async function JT(t,e,r){return r&&t.output?.mode===Ut.POST_RESPONSE_API?jt.runToolPostResponse(t,e):r&&t.output?.mode===Ut.FOLLOW_AI?jt.runToolFollowAiManual(t,e):(await VT()).executeToolWithConfig(t.id,e)}function XT(t,e){return e?.runSource==="MANUAL"?t.output?.mode==="local_transform"||t.processor?.type?qs.MANUAL_LOCAL_TRANSFORM:t.output?.mode===Ut.POST_RESPONSE_API?qs.MANUAL_POST_RESPONSE_API:qs.MANUAL_COMPATIBILITY:qs.MANUAL_POST_RESPONSE_API}function Ei(t,e){try{uc(t,e)}catch(r){jn.warn("\u66F4\u65B0\u5DE5\u5177\u8FD0\u884C\u65F6\u72B6\u6001\u5931\u8D25:",{toolId:t,error:r})}}async function QT(t,e){let r=Date.now(),s=t.id,n=`yyt-tool-run-${s}`,o=XT(t,e),a=e?.executionKey||"";Ei(s,{lastStatus:"running",lastError:"",lastDurationMs:0,lastTraceId:e?.traceId||"",lastMessageKey:e?.messageId||"",lastExecutionKey:a,lastExecutionPath:o,lastWritebackStatus:"",lastFailureStage:"",lastSlotBindingKey:e?.slotBindingKey||"",lastSlotRevisionKey:e?.slotRevisionKey||"",lastSlotTransactionId:e?.slotTransactionId||"",lastSourceMessageId:e?.sourceMessageId||e?.messageId||"",lastSourceSwipeId:e?.sourceSwipeId||e?.effectiveSwipeId||"",lastContentCommitted:!1,lastHostCommitApplied:!1,lastRefreshRequested:!1,lastRefreshConfirmed:!1,lastPreferredCommitMethod:"",lastAppliedCommitMethod:"",lastRefreshMethodCount:0,lastRefreshMethods:[],lastRefreshConfirmChecks:0,lastRefreshConfirmedBy:""}),jn.info(`\u6B63\u5728\u624B\u52A8\u6267\u884C ${t.name}`,null,{topNotice:{sticky:!0,noticeId:n}});try{let i=o===qs.MANUAL_LOCAL_TRANSFORM?await _i(t,e):await JT(t,e,!0),l=Date.now()-r;if(i?.success){let y=de(s),p=i?.meta?.writebackDetails||{};return Ei(s,{lastStatus:"success",lastError:"",lastDurationMs:l,lastTraceId:e?.traceId||"",successCount:(y?.runtime?.successCount||0)+1,lastMessageKey:e?.messageId||"",lastExecutionKey:a,lastExecutionPath:o,lastWritebackStatus:i?.meta?.writebackStatus||Ue.NOT_APPLICABLE,lastFailureStage:i?.meta?.failureStage||"",lastSlotBindingKey:e?.slotBindingKey||"",lastSlotRevisionKey:e?.slotRevisionKey||"",lastSlotTransactionId:e?.slotTransactionId||"",lastSourceMessageId:e?.sourceMessageId||e?.messageId||"",lastSourceSwipeId:e?.sourceSwipeId||e?.effectiveSwipeId||"",lastContentCommitted:!!p.contentCommitted,lastHostCommitApplied:!!p.hostCommitApplied,lastRefreshRequested:!!p.refreshRequested,lastRefreshConfirmed:!!p.refreshConfirmed,lastPreferredCommitMethod:p?.commit?.preferredMethod||"",lastAppliedCommitMethod:p?.commit?.appliedMethod||"",lastRefreshMethodCount:Array.isArray(p?.refresh?.requestMethods)?p.refresh.requestMethods.length:0,lastRefreshMethods:Array.isArray(p?.refresh?.requestMethods)?[...p.refresh.requestMethods]:[],lastRefreshConfirmChecks:Number(p?.refresh?.confirmChecks)||0,lastRefreshConfirmedBy:p?.refresh?.confirmedBy||""}),jn.info(`${t.name} \u624B\u52A8\u6267\u884C\u5B8C\u6210`,null,{toast:"success",topNotice:{duration:3200,noticeId:n}}),{success:!0,duration:l,result:i}}let c=de(s),d=i?.error||"\u5DE5\u5177\u6267\u884C\u5931\u8D25",u=i?.meta?.writebackDetails||{};return Ei(s,{lastStatus:"error",lastError:d,lastDurationMs:l,lastTraceId:e?.traceId||"",errorCount:(c?.runtime?.errorCount||0)+1,lastMessageKey:e?.messageId||"",lastExecutionKey:a,lastExecutionPath:o,lastWritebackStatus:i?.meta?.writebackStatus||Ue.NOT_APPLICABLE,lastFailureStage:i?.meta?.failureStage||(o===qs.MANUAL_COMPATIBILITY?et.COMPATIBILITY_EXECUTE:et.UNKNOWN),lastSlotBindingKey:e?.slotBindingKey||"",lastSlotRevisionKey:e?.slotRevisionKey||"",lastSlotTransactionId:e?.slotTransactionId||"",lastSourceMessageId:e?.sourceMessageId||e?.messageId||"",lastSourceSwipeId:e?.sourceSwipeId||e?.effectiveSwipeId||"",lastContentCommitted:!!u.contentCommitted,lastHostCommitApplied:!!u.hostCommitApplied,lastRefreshRequested:!!u.refreshRequested,lastRefreshConfirmed:!!u.refreshConfirmed,lastPreferredCommitMethod:u?.commit?.preferredMethod||"",lastAppliedCommitMethod:u?.commit?.appliedMethod||"",lastRefreshMethodCount:Array.isArray(u?.refresh?.requestMethods)?u.refresh.requestMethods.length:0,lastRefreshMethods:Array.isArray(u?.refresh?.requestMethods)?[...u.refresh.requestMethods]:[],lastRefreshConfirmChecks:Number(u?.refresh?.confirmChecks)||0,lastRefreshConfirmedBy:u?.refresh?.confirmedBy||""}),jn.error(`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${d}`,null,{toast:!0,topNotice:{sticky:!0,noticeId:n}}),{success:!1,duration:l,error:d,result:i}}catch(i){let l=Date.now()-r,c=de(s),d=i?.message||String(i);throw Ei(s,{lastStatus:"error",lastError:d,lastDurationMs:l,lastTraceId:e?.traceId||"",errorCount:(c?.runtime?.errorCount||0)+1,lastMessageKey:e?.messageId||"",lastExecutionKey:a,lastExecutionPath:o,lastWritebackStatus:Ue.NOT_APPLICABLE,lastFailureStage:o===qs.MANUAL_COMPATIBILITY?et.COMPATIBILITY_EXECUTE:et.UNKNOWN,lastSlotBindingKey:e?.slotBindingKey||"",lastSlotRevisionKey:e?.slotRevisionKey||"",lastSlotTransactionId:e?.slotTransactionId||"",lastSourceMessageId:e?.sourceMessageId||e?.messageId||"",lastSourceSwipeId:e?.sourceSwipeId||e?.effectiveSwipeId||"",lastContentCommitted:!1,lastHostCommitApplied:!1,lastRefreshRequested:!1,lastRefreshConfirmed:!1,lastPreferredCommitMethod:"",lastAppliedCommitMethod:"",lastRefreshMethodCount:0,lastRefreshMethods:[],lastRefreshConfirmChecks:0,lastRefreshConfirmedBy:""}),jn.error(`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${d}`,null,{toast:!0,topNotice:{sticky:!0,noticeId:n}}),i}}async function Ci(t){if(!t)return{success:!1,error:"\u7F3A\u5C11\u5DE5\u5177ID"};let e=de(t);if(!e)return{success:!1,error:"\u5DE5\u5177\u4E0D\u5B58\u5728"};if(!e.enabled)return qr(t,{lastMessageKey:"",lastExecutionKey:"",lastExecutionPath:"",lastWritebackStatus:Ue.NOT_APPLICABLE,lastFailureStage:"",lastContentCommitted:!1,lastHostCommitApplied:!1,lastRefreshRequested:!1,lastRefreshConfirmed:!1,lastPreferredCommitMethod:"",lastAppliedCommitMethod:"",lastRefreshMethodCount:0,lastRefreshMethods:[],lastRefreshConfirmChecks:0,lastRefreshConfirmedBy:""},{touchLastRunAt:!1,emitEvent:!1}),jn.warn(`${e.name} \u672A\u542F\u7528\uFF0C\u65E0\u6CD5\u624B\u52A8\u6267\u884C`,null,{topNotice:{duration:2800,noticeId:`yyt-tool-run-${t}`}}),{success:!1,error:"\u5DE5\u5177\u672A\u542F\u7528"};let r=await Cs({runSource:"MANUAL"});return QT(e,r)}async function Ii(t){if(!t)return{success:!1,error:"\u7F3A\u5C11\u5DE5\u5177ID"};let e=de(t);if(!e)return{success:!1,error:"\u5DE5\u5177\u4E0D\u5B58\u5728"};let r=await Cs({runSource:"MANUAL_PREVIEW"});return jt.previewExtraction(e,r)}var jn,qs,dd,ud=N(()=>{gr();Wo();ks();od();H();jn=C.createScope("ToolTrigger"),qs={MANUAL_POST_RESPONSE_API:"manual_post_response_api",MANUAL_LOCAL_TRANSFORM:"manual_local_transform",MANUAL_COMPATIBILITY:"manual_compatibility"},dd=null});var kg={};le(kg,{TOOL_CONFIG_PANEL_STYLES:()=>pd,createToolConfigPanel:()=>ls,default:()=>iS});function Ig(t){return t?t.length!==void 0&&typeof t.get=="function"?t.get(0):t:null}function ZT(t){if(!Number.isFinite(t)||t<=0)return"\u4ECE\u672A";let e=Date.now()-t;if(e<6e4)return`${Math.floor(e/1e3)} \u79D2\u524D`;if(e<36e5)return`${Math.floor(e/6e4)} \u5206\u949F\u524D`;if(e<864e5)return`${Math.floor(e/36e5)} \u5C0F\u65F6\u524D`;try{return new Date(t).toLocaleString()}catch{return"\u672A\u77E5"}}function eS(t){if(!t)return null;let e=t.closest(".yyt-popup-body");if(!e)return vr.warn("pinToolPanelHeight: \u627E\u4E0D\u5230 .yyt-popup-body \u7956\u5148"),null;let r=()=>{let n=t.querySelector(".yyt-tool-panel");if(!n)return;let o=e.getBoundingClientRect(),a=n.getBoundingClientRect(),i=o.bottom-a.top-8;i>100?n.style.height=`${i}px`:vr.warn(`pinToolPanelHeight: \u8BA1\u7B97\u9AD8\u5EA6\u5F02\u5E38 h=${i}`)};if(r(),requestAnimationFrame(()=>requestAnimationFrame(r)),typeof ResizeObserver>"u")return null;let s=new ResizeObserver(()=>r());return s.observe(e),()=>{try{s.disconnect()}catch{}}}function tS(t){if(!t)return;let e=t.querySelector(".yyt-tool-panel-hero"),r=t.querySelector(".yyt-tool-panel-scroll");if(!e||!r)return;let s=()=>{r.scrollTop>0?e.classList.add("yyt-tool-panel-hero--compact"):e.classList.remove("yyt-tool-panel-hero--compact")};s(),r.addEventListener("scroll",s,{passive:!0})}function ls(t={}){let{id:e,toolId:r,postResponseHint:s,previewDialogId:n,previewTitle:o="\u6D4B\u8BD5\u63D0\u53D6\u7ED3\u679C"}=t;return{id:e,toolId:r,renderTo(a){let i=Ig(a);if(!i)return;if(i._yytToolPanelCleanup)try{i._yytToolPanelCleanup()}catch{}let l=()=>this.renderTo(a),c=de(r);if(!c){i.innerHTML='<div class="yyt-empty-state-small">\u5DE5\u5177\u914D\u7F6E\u52A0\u8F7D\u5931\u8D25</div>';return}let d=f("div",{className:"yyt-tool-panel",dataset:{toolId:r}}),u=[];d.appendChild(rS(c,r,l,s));let y=f("div",{className:"yyt-tool-panel-scroll"});y.appendChild(sS(c));let p=nS(c,r,l);u.push(p),y.appendChild(p.el);let g=oS(c,r,l,a,n,o);u.push(g),y.appendChild(g.el),d.appendChild(y),i.innerHTML="",i.appendChild(d);let m=eS(i);tS(i),i._yytToolPanelCleanup=()=>{for(let h of u)try{h.destroy()}catch{}if(typeof m=="function")try{m()}catch{}delete i._yytToolPanelCleanup}},destroy(a){let i=Ig(a);if(i?._yytToolPanelCleanup)try{i._yytToolPanelCleanup()}catch{}},getStyles(){return pd}}}function rS(t,e,r,s){let n=f("div",{className:"yyt-tool-panel-hero"}),o=f("div",{className:"yyt-tool-panel-hero-row1"});o.appendChild(f("div",{className:"yyt-tool-panel-hero-icon",text:"\u{1F527}"})),o.appendChild(f("div",{className:"yyt-tool-panel-hero-name",text:t.name||e}));let a=f("div",{className:"yyt-tool-panel-hero-actions"});a.appendChild(q({label:"\u25B6 \u7ACB\u5373\u6267\u884C\u4E00\u6B21",size:"small",onClick:async()=>{try{await Ci(e),vr.info("\u5DF2\u89E6\u53D1\u624B\u52A8\u6267\u884C",null,{toast:"success"})}catch(g){vr.error(`\u6267\u884C\u5931\u8D25\uFF1A${g?.message||g}`,null,{toast:!0})}}}).el),a.appendChild(q({label:"\u{1F4BE} \u4FDD\u5B58\u914D\u7F6E",size:"small",variant:"primary",onClick:()=>{vr.info("\u914D\u7F6E\u5DF2\u4FDD\u5B58",null,{toast:"success"}),r()}}).el),o.appendChild(a),n.appendChild(o),t.description&&n.appendChild(f("div",{className:"yyt-tool-panel-hero-desc",text:t.description}));let i=f("div",{className:"yyt-tool-panel-hero-chips"}),c=(t.output?.mode||"follow_ai")==="post_response_api"?"\u989D\u5916 AI \u89E3\u6790\uFF08\u81EA\u52A8\uFF09":"\u968F AI \u8F93\u51FA\uFF08\u624B\u52A8\uFF09";i.appendChild(f("span",{className:"yyt-tool-hero-chip mode",text:c}));let d=t.output?.apiPreset||t.apiPreset||"";d&&i.appendChild(f("span",{className:"yyt-tool-hero-chip preset",text:`API: ${d}`}));let u=t.extraction?.regexPresetId||"";if(u){let g=Ee.getPreset(u);i.appendChild(f("span",{className:"yyt-tool-hero-chip preset",text:`\u6B63\u5219: ${g?g.name:"\u5DF2\u5220\u9664"}`}))}else i.appendChild(f("span",{className:"yyt-tool-hero-chip",text:"\u6B63\u5219: \u672A\u7ED1\u5B9A",style:{opacity:"0.6"}}));let y=t.worldbooks?.presetId||"";if(y){let g=gt.getPreset(y);g&&i.appendChild(f("span",{className:"yyt-tool-hero-chip preset",text:`\u4E16\u754C\u4E66: ${g.name}`}))}let p=t.runtime?.lastStatus;if(p){let g=p==="success"?"status-success":p==="failed"?"status-failed":"";i.appendChild(f("span",{className:`yyt-tool-hero-chip ${g}`,text:`\u4E0A\u6B21\u6267\u884C \xB7 ${p}`}))}return n.appendChild(i),n}function sS(t){let e=f("div",{className:"yyt-tool-runtime-row"}),r=t.runtime||{},s=(a,i,l="")=>{let c=f("div",{className:"yyt-tool-runtime-stat"});return c.appendChild(f("span",{className:"yyt-tool-runtime-stat-label",text:a})),c.appendChild(f("span",{className:`yyt-tool-runtime-stat-value ${l}`,text:i})),c},n=r.lastStatus==="success"?"\u2713 \u4E0A\u6B21\u6210\u529F":r.lastStatus==="failed"?"\u2717 \u4E0A\u6B21\u5931\u8D25":r.lastStatus==="idle"?"\u5F85\u547D":r.lastStatus||"\u5F85\u547D",o=r.lastStatus==="success"?"success":r.lastStatus==="failed"?"error":"muted";return e.appendChild(s("\u72B6\u6001",n,o)),e.appendChild(s("\u6700\u8FD1\u8FD0\u884C",ZT(r.lastRunAt),"muted")),e.appendChild(s("\u6210\u529F",String(r.successCount||0),"success")),e.appendChild(s("\u5931\u8D25",String(r.errorCount||0),r.errorCount?"error":"muted")),e}function nS(t,e,r){let s=f("div",{style:{display:"flex",flexDirection:"column"}});s.appendChild(Go({label:"\u8F93\u51FA\u6A21\u5F0F",hint:"\u51B3\u5B9A\u6267\u884C\u8DEF\u5F84 + \u81EA\u52A8/\u624B\u52A8",control:_e({value:t.output?.mode||"follow_ai",options:[{value:"follow_ai",label:"follow_ai \u2014 \u968F AI \u8F93\u51FA\uFF08\u624B\u52A8\u89E6\u53D1\uFF09"},{value:"post_response_api",label:"post_response_api \u2014 \u989D\u5916 AI \u89E3\u6790\uFF08\u81EA\u52A8\uFF09"}],onChange:l=>{let c=de(e)||{};Me(e,{...c,output:{...c.output||{},mode:l,enabled:l==="post_response_api"}}),r()}})}));let n=(()=>{try{return zr()||[]}catch{return[]}})();s.appendChild(Go({label:"API \u9884\u8BBE",hint:"\u989D\u5916 AI \u89E3\u6790\u65F6\u4F7F\u7528",control:_e({value:t.output?.apiPreset||t.apiPreset||"",options:[{value:"",label:"\u2014\u2014 \u8DDF\u968F\u5F53\u524D\u4E3B API \u2014\u2014"},...n.map(l=>({value:l.name,label:l.name}))],onChange:l=>{let c=de(e)||{};Me(e,{...c,apiPreset:l,output:{...c.output||{},apiPreset:l}}),r()}})}));let o=(()=>{try{return Ko()||[]}catch{return[]}})();s.appendChild(Go({label:"Ai \u6307\u4EE4\u9884\u8BBE",hint:'\u9644\u52A0\u5728 system/user \u524D\u7684\u6307\u4EE4\uFF1B\u9009"\u65E0"\u5373\u4E0D\u542F\u7528',control:_e({value:t.bypass?.enabled&&t.bypass?.presetId||"",options:[{value:"",label:"\u2014\u2014 \u65E0 \u2014\u2014"},...o.map(l=>({value:l.id,label:`${l.name}${l.isDefault?" [\u9ED8\u8BA4]":""}`}))],onChange:l=>{let c=de(e)||{};Me(e,{...c,bypass:{enabled:!!l,presetId:l||""}}),r()}})}));let a=Ee.listPresets();s.appendChild(Go({label:"\u6B63\u5219\u63D0\u53D6\u9884\u8BBE",hint:"\u51B3\u5B9A\u4ECE AI \u56DE\u590D\u4E2D\u5982\u4F55\u62BD\u53D6",control:_e({value:t.extraction?.regexPresetId||"",options:[{value:"",label:"\u2014\u2014 \u65E0\uFF08\u4E0D\u8FDB\u884C\u63D0\u53D6\uFF09 \u2014\u2014"},...a.map(l=>({value:l.id,label:l.name}))],onChange:l=>{let c=de(e)||{},d={...c.extraction||{},regexPresetId:l};if(l){let u=Ee.getPreset(l);vr.info(`\u5DF2\u7ED1\u5B9A\u6B63\u5219\u9884\u8BBE\uFF1A${u?.name||l}`,null,{toast:"success"})}else vr.info("\u5DF2\u89E3\u7ED1\u6B63\u5219\u9884\u8BBE\uFF0C\u5DE5\u5177\u5C06\u4E0D\u8FDB\u884C\u5185\u5BB9\u63D0\u53D6",null,{toast:"success"});Me(e,{...c,extraction:d}),r()}})}));let i=gt.listPresets();return s.appendChild(Go({label:"\u4E16\u754C\u4E66\u9884\u8BBE",hint:"\u6CE8\u5165\u5230 prompt \u7684 {{toolWorldbookContent}}",control:_e({value:t.worldbooks?.presetId||"",options:[{value:"",label:"\u2014\u2014 \u65E0\uFF08\u4FDD\u7559\u5DE5\u5177\u539F\u6709\u4E16\u754C\u4E66\u8BBE\u7F6E\uFF09 \u2014\u2014"},...i.map(l=>({value:l.id,label:l.name}))],onChange:l=>{let c=de(e)||{},d={...c.worldbooks||{},presetId:l};if(l){let u=gt.getPreset(l);vr.info(`\u5DF2\u7ED1\u5B9A\u4E16\u754C\u4E66\u9884\u8BBE\uFF1A${u?.name||l}`,null,{toast:"success"})}else vr.info("\u5DF2\u89E3\u7ED1\u4E16\u754C\u4E66\u9884\u8BBE\uFF0C\u5DE5\u5177\u4E0D\u518D\u6CE8\u5165\u4E16\u754C\u4E66\u5185\u5BB9",null,{toast:"success"});Me(e,{...c,worldbooks:d}),r()}})})),er({heading:"\u7ED1\u5B9A",icon:"\u{1F517}",content:[s]})}function Go({label:t,hint:e,control:r}){let s=f("div",{className:"yyt-tool-binding-row"}),n=f("div",{className:"yyt-tool-binding-label"});return n.appendChild(f("span",{className:"yyt-tool-binding-label-text",text:t})),e&&n.appendChild(f("span",{className:"yyt-tool-binding-label-hint",text:e})),s.appendChild(n),r.el.classList.add("small"),Object.assign(r.el.style,{padding:"7px 10px",fontSize:"12px"}),s.appendChild(r.el),s.appendChild(f("div",{className:"yyt-tool-binding-meta"})),s}function oS(t,e,r,s,n,o){let a=f("div",{style:{display:"flex",flexDirection:"column"}});a.appendChild(f("div",{style:{marginBottom:"8px",display:"flex",alignItems:"center",gap:"10px"}},f("div",{style:{flex:"1"}},f("div",{text:"\u63D0\u793A\u8BCD\u6A21\u677F",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}}),f("div",{text:"\u7528 {{macro}} \u5F15\u7528\u4E0A\u4E0B\u6587\u3002\u6A21\u677F\u5185\u5BB9\u4F1A\u4F5C\u4E3A\u53D1\u7ED9\u989D\u5916 AI \u7684 user \u6D88\u606F\u3002",style:{fontSize:"11px",color:"var(--yyt-text-muted)",lineHeight:"1.6"}})),q({label:"\u{1F504} \u91CD\u7F6E\u4E3A\u9ED8\u8BA4",size:"small",variant:"ghost",onClick:()=>{if(!window.confirm("\u7528\u5DE5\u5177\u9ED8\u8BA4\u6A21\u677F\u8986\u76D6\u5F53\u524D\u6A21\u677F\uFF1F"))return;let x=ja(e)||{},v=de(e)||{};Me(e,{...v,promptTemplate:x.promptTemplate||""}),r()}}).el));let i=f("textarea",{className:"yyt-textarea yyt-code-textarea",attrs:{rows:"10",placeholder:"\u8F93\u5165\u63D0\u793A\u8BCD\u6A21\u677F..."},style:{width:"100%",resize:"vertical",fontFamily:"ui-monospace, monospace",fontSize:"12px",lineHeight:"1.7"}});i.value=t.promptTemplate||"",i.addEventListener("change",()=>{let x=de(e)||{};Me(e,{...x,promptTemplate:i.value})}),a.appendChild(i),a.appendChild(f("div",{className:"yyt-macro-inline",html:"\u53EF\u7528\u5B8F\uFF1A<code>{{toolPromptMacro}}</code> <code>{{toolContentMacro}}</code> <code>{{toolWorldbookContent}}</code> <code>{{lastAiMessage}}</code> <code>{{recentMessagesText}}</code> <code>{{rawRecentMessagesText}}</code> <code>{{userMessage}}</code> <code>{{toolName}}</code> <code>{{toolId}}</code>"})),a.appendChild(f("hr",{className:"yyt-zone-divider"})),a.appendChild(f("div",{style:{marginBottom:"8px"}},f("div",{text:"\u63D0\u53D6\u914D\u7F6E",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}}),f("div",{text:'\u4ECE AI \u56DE\u590D\u4E2D\u62BD\u53D6\u5E76\u5199\u56DE\u3002\u5B8C\u6574\u89C4\u5219\u7531"\u6B63\u5219\u63D0\u53D6\u9884\u8BBE"\u51B3\u5B9A\uFF0C\u8FD9\u91CC\u53EA\u914D\u7F6E\u5DE5\u5177\u53C2\u6570\u3002',style:{fontSize:"11px",color:"var(--yyt-text-muted)",lineHeight:"1.6"}})));let l=f("div",{style:{display:"grid",gridTemplateColumns:"1fr auto",gap:"12px",alignItems:"end",marginBottom:"12px"}}),c=f("div",{className:"yyt-form-group",style:{margin:0}});c.appendChild(f("label",{text:"\u6700\u5927\u63D0\u53D6 AI \u6D88\u606F\u6570",style:{fontSize:"12px",fontWeight:"600",color:"var(--yyt-text-secondary, rgba(255,255,255,0.55))"}}));let d=f("input",{className:"yyt-input",attrs:{type:"number",min:"1",max:"50"},style:{padding:"7px 10px",fontSize:"12px"}});d.value=String(Number(t.extraction?.maxMessages)||5),d.addEventListener("change",()=>{let x=de(e)||{};Me(e,{...x,extraction:{...x.extraction||{},maxMessages:Math.max(1,parseInt(d.value,10)||5)}})}),c.appendChild(d),l.appendChild(c);let u=f("div",{className:"yyt-form-group",style:{margin:0}});u.appendChild(f("label",{html:"&nbsp;",style:{fontSize:"12px"}})),u.appendChild(q({label:"\u{1F50D} \u6D4B\u8BD5\u63D0\u53D6",onClick:async()=>{try{let x=await Ii(e);aS(s,x,n,o)}catch(x){vr.error(`\u6D4B\u8BD5\u63D0\u53D6\u5931\u8D25\uFF1A${x?.message||x}`,null,{toast:!0})}}}).el),l.appendChild(u),a.appendChild(l);let y=f("div",{className:"yyt-form-group",style:{margin:0}});y.appendChild(f("label",{html:'\u5199\u56DE\u6807\u7B7E <span style="font-size:10px;color:var(--yyt-text-muted);font-weight:500;">\uFF08\u591A\u6807\u7B7E\u63D0\u53D6\u65F6\u6307\u5B9A\u552F\u4E00\u5199\u56DE\u6807\u7B7E\uFF1B\u7559\u7A7A\u5219\u63D0\u53D6\u9996\u4E2A\uFF09</span>',style:{fontSize:"12px",fontWeight:"600",color:"var(--yyt-text-secondary, rgba(255,255,255,0.55))"}}));let p=`yyt-writeback-dl-${e}-${Math.random().toString(36).slice(2,6)}`,g=f("datalist",{attrs:{id:p}}),m=(()=>{let x=new Set,v=[];function T(E){if(E)for(let w of E.rules||[]){if(w?.enabled===!1||w?.type!=="include")continue;let P=String(w.value||"").trim();!P||x.has(P)||(x.add(P),v.push(P))}}let A=t.extraction?.regexPresetId;if(A)T(Ee.getPreset(A));else for(let E of Ee.listPresets())T(E);return v})();for(let x of m)g.appendChild(f("option",{attrs:{value:x}}));let h=f("input",{className:"yyt-input",attrs:{type:"text",placeholder:"\u5982 status / content\uFF08\u6765\u81EA\u6B63\u5219\u9884\u8BBE\u7684 include \u6807\u7B7E\uFF09",list:p,autocomplete:"off"},style:{padding:"7px 10px",fontSize:"12px"}});return h.value=t.extraction?.writebackTag||"",h.addEventListener("change",()=>{let x=de(e)||{};Me(e,{...x,extraction:{...x.extraction||{},writebackTag:h.value.trim()}})}),y.appendChild(h),y.appendChild(g),a.appendChild(y),er({heading:"\u914D\u7F6E",icon:"\u2699",content:[a]})}function aS(t,e,r,s){if(!re()||!ke(t))return;let o=`${ws}-${r||"extraction-preview"}`,a=Array.isArray(e?.messageEntries)?e.messageEntries:[],i=a.length>0?`
      <div class="yyt-form-group">
        <label>\u9010\u6761\u6D88\u606F\u9884\u89C8</label>
        <div class="yyt-preview-message-list">
          ${a.map((l,c)=>{let d=c===a.length-1?"\u6700\u65B0\u6D88\u606F":`\u6700\u8FD1\u7684\u7B2C ${a.length-c} \u6761\u6D88\u606F`;return`
              <div class="yyt-preview-message-item">
                <div class="yyt-preview-message-title">${is(d)}</div>
                <div><label>\u539F\u6587</label><pre class="yyt-preview-box yyt-preview-pre">${is(l.rawText||"\u65E0\u53EF\u7528\u6D88\u606F")}</pre></div>
                <div><label>\u6B63\u6587\u63D0\u53D6</label><pre class="yyt-preview-box yyt-preview-pre">${is(l.filteredText||"\u6B63\u6587\u89C4\u5219\u672A\u547D\u4E2D")}</pre></div>
                <div><label>\u5DE5\u5177\u6807\u7B7E\u63D0\u53D6</label><pre class="yyt-preview-box yyt-preview-pre">${is(l.extractedText||"\u672A\u63D0\u53D6\u5230\u5185\u5BB9")}</pre></div>
              </div>
            `}).join("")}
        </div>
      </div>
    `:"";t.append(oo({id:o,title:s,width:"720px",wide:!0,body:`
      <div class="yyt-form-group">
        <label>\u63D0\u53D6\u89C4\u5219</label>
        <div class="yyt-preview-box">${is((e?.selectors||[]).join(`
`)||"\u65E0")}</div>
      </div>
      <div class="yyt-form-group">
        <label>\u539F\u59CB\u5185\u5BB9\u6C47\u603B</label>
        <pre class="yyt-preview-box yyt-preview-pre">${is(e?.sourceText||"\u65E0\u53EF\u7528\u6D88\u606F")}</pre>
      </div>
      <div class="yyt-form-group">
        <label>\u6B63\u6587\u63D0\u53D6\u6C47\u603B</label>
        <pre class="yyt-preview-box yyt-preview-pre">${is(e?.filteredSourceText||"\u6B63\u6587\u89C4\u5219\u672A\u547D\u4E2D")}</pre>
      </div>
      <div class="yyt-form-group">
        <label>\u5DE5\u5177\u6807\u7B7E\u63D0\u53D6\u6C47\u603B</label>
        <pre class="yyt-preview-box yyt-preview-pre">${is(e?.extractedText||"\u672A\u63D0\u53D6\u5230\u5185\u5BB9")}</pre>
      </div>
      ${i}
    `})),ao(t,o,{onSave:l=>l()}),t.find(`#${o}-save`).text("\u5173\u95ED"),t.find(`#${o}-cancel`).remove()}function is(t){return t==null?"":String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var vr,pd,iS,Fn=N(()=>{tr();at();at();gr();an();Bn();ud();H();Vr();cn();vr=C.createScope("ToolConfigPanel"),pd=`
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
`;iS=ls});var Mg={};le(Mg,{SummaryToolPanel:()=>Rg,default:()=>lS});var Rg,lS,Pg=N(()=>{Fn();Rg=ls({id:"summaryToolPanel",toolId:"summaryTool",postResponseHint:"\u70B9\u51FB\u201C\u7ACB\u5373\u6267\u884C\u4E00\u6B21\u201D\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u8FDB\u884C\u6458\u8981\u89E3\u6790\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 boo_FM
\u6216 regex:<boo_FM>([\\s\\S]*?)</boo_FM>`,previewDialogId:"summary-extraction-preview",defaultInjectionOrder:1e4,lorebookLogTag:"SummaryToolPanel"}),lS=Rg});var $g={};le($g,{StatusBlockPanel:()=>Ng,default:()=>cS});var Ng,cS,Og=N(()=>{Fn();Ng=ls({id:"statusBlockPanel",toolId:"statusBlock",postResponseHint:"\u70B9\u51FB\u201C\u7ACB\u5373\u6267\u884C\u4E00\u6B21\u201D\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u751F\u6210\u4E3B\u89D2\u72B6\u6001\u680F\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 status_block
\u6216 regex:<status_block>([\\s\\S]*?)</status_block>`,previewDialogId:"status-extraction-preview",defaultInjectionOrder:10001,lorebookLogTag:"StatusBlockPanel"}),cS=Ng});var Lg={};le(Lg,{YouyouReviewPanel:()=>Dg,default:()=>dS});var Dg,dS,Bg=N(()=>{Fn();Dg=ls({id:"youyouReviewPanel",toolId:"youyouReview",postResponseHint:"\u70B9\u51FB\u201C\u7ACB\u5373\u6267\u884C\u4E00\u6B21\u201D\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u5728\u672B\u5C3E\u751F\u6210\u5C0F\u5E7D\u70B9\u8BC4\u4E0E\u5267\u60C5\u94A9\u5B50\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 youyou
\u6216 regex:<youyou>([\\s\\S]*?)</youyou>`,previewDialogId:"youyou-review-extraction-preview",previewTitle:"\u5C0F\u5E7D\u70B9\u8BC4\u63D0\u53D6\u9884\u89C8"}),dS=Dg});function zg(t){return t?t.length!==void 0&&typeof t.get=="function"?t.get(0):t:null}function uS(t){if(!Number.isFinite(t)||t<=0)return"\u4ECE\u672A";let e=Date.now()-t;if(e<6e4)return`${Math.floor(e/1e3)} \u79D2\u524D`;if(e<36e5)return`${Math.floor(e/6e4)} \u5206\u949F\u524D`;if(e<864e5)return`${Math.floor(e/36e5)} \u5C0F\u65F6\u524D`;try{return new Date(t).toLocaleString()}catch{return"\u672A\u77E5"}}function cs(t){return t==null?"":String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function ki(t={}){let{id:e,toolId:r,previewDialogId:s,previewTitle:n="\u6D4B\u8BD5\u63D0\u53D6\u7ED3\u679C",processorDirections:o=[],processorOptions:a=[],heroHint:i=""}=t;return{id:e,toolId:r,renderTo(l){let c=zg(l);if(!c)return;if(c._yytLocalToolPanelCleanup)try{c._yytLocalToolPanelCleanup()}catch{}let d=()=>this.renderTo(l),u=de(r);if(!u){c.innerHTML='<div class="yyt-empty-state-small">\u5DE5\u5177\u914D\u7F6E\u52A0\u8F7D\u5931\u8D25</div>';return}let y=f("div",{className:"yyt-tool-panel",dataset:{toolId:r}}),p=[];y.appendChild(pS(u,r,d,o,i)),y.appendChild(yS(u));let g=fS(u,r,d);p.push(g),y.appendChild(g.el);let m=gS(u,r,d,l,o,a,s,n);p.push(m),y.appendChild(m.el),c.innerHTML="",c.appendChild(y),c._yytLocalToolPanelCleanup=()=>{for(let h of p)try{h.destroy()}catch{}delete c._yytLocalToolPanelCleanup}},destroy(l){let c=zg(l);if(c?._yytLocalToolPanelCleanup)try{c._yytLocalToolPanelCleanup()}catch{}},getStyles(){return""}}}function pS(t,e,r,s,n){let o=f("div",{className:"yyt-tool-panel-hero"}),a=f("div",{className:"yyt-tool-panel-hero-row1"});a.appendChild(f("div",{className:"yyt-tool-panel-hero-icon",text:"\u2699"})),a.appendChild(f("div",{className:"yyt-tool-panel-hero-name",text:t.name||e}));let i=f("div",{className:"yyt-tool-panel-hero-actions"});i.appendChild(q({label:"\u25B6 \u7ACB\u5373\u6267\u884C\u4E00\u6B21",size:"small",onClick:async()=>{try{await Ci(e),Wn.info("\u5DF2\u89E6\u53D1\u624B\u52A8\u6267\u884C",null,{toast:"success"})}catch(m){Wn.error(`\u6267\u884C\u5931\u8D25\uFF1A${m?.message||m}`,null,{toast:!0})}}}).el),i.appendChild(q({label:"\u{1F4BE} \u4FDD\u5B58\u914D\u7F6E",size:"small",variant:"primary",onClick:()=>{Wn.info("\u914D\u7F6E\u5DF2\u4FDD\u5B58",null,{toast:"success"}),r()}}).el),a.appendChild(i),o.appendChild(a),t.description&&o.appendChild(f("div",{className:"yyt-tool-panel-hero-desc",text:t.description})),n&&o.appendChild(f("div",{className:"yyt-tool-panel-hero-desc",text:n}));let l=f("div",{className:"yyt-tool-panel-hero-chips"}),c=t.output?.autoTrigger!==!1;l.appendChild(f("span",{className:"yyt-tool-hero-chip mode",text:`\u672C\u5730\u811A\u672C\uFF08${c?"\u81EA\u52A8":"\u624B\u52A8"}\uFF09`}));let d=t.processor?.direction||s[0]?.key||"",u=s.find(m=>m.key===d)?.label||d;u&&l.appendChild(f("span",{className:"yyt-tool-hero-chip preset",text:`\u65B9\u5411: ${u}`}));let y=t.output?.overwrite!==!1;l.appendChild(f("span",{className:"yyt-tool-hero-chip preset",text:`\u5199\u56DE: ${y?"\u8986\u76D6":"\u8FFD\u52A0"}`}));let p=t.extraction?.regexPresetId||"";if(p){let m=Ee.getPreset(p);m&&l.appendChild(f("span",{className:"yyt-tool-hero-chip preset",text:`\u6B63\u5219: ${m.name}`}))}let g=t.runtime?.lastStatus;if(g){let m=g==="success"?"status-success":g==="failed"?"status-failed":"";l.appendChild(f("span",{className:`yyt-tool-hero-chip ${m}`,text:`\u4E0A\u6B21\u6267\u884C \xB7 ${g}`}))}return o.appendChild(l),o}function yS(t){let e=f("div",{className:"yyt-tool-runtime-row"}),r=t.runtime||{},s=(a,i,l="")=>{let c=f("div",{className:"yyt-tool-runtime-stat"});return c.appendChild(f("span",{className:"yyt-tool-runtime-stat-label",text:a})),c.appendChild(f("span",{className:`yyt-tool-runtime-stat-value ${l}`,text:i})),c},n=r.lastStatus==="success"?"\u2713 \u4E0A\u6B21\u6210\u529F":r.lastStatus==="failed"?"\u2717 \u4E0A\u6B21\u5931\u8D25":"\u5F85\u547D",o=r.lastStatus==="success"?"success":r.lastStatus==="failed"?"error":"muted";return e.appendChild(s("\u72B6\u6001",n,o)),e.appendChild(s("\u6700\u8FD1\u8FD0\u884C",uS(r.lastRunAt),"muted")),e.appendChild(s("\u6210\u529F",String(r.successCount||0),"success")),e.appendChild(s("\u5931\u8D25",String(r.errorCount||0),r.errorCount?"error":"muted")),e}function fS(t,e,r){let s=f("div",{style:{display:"flex",flexDirection:"column"}}),n=Ee.listPresets();return s.appendChild(yd({label:"\u6B63\u5219\u63D0\u53D6\u9884\u8BBE",hint:"\u51B3\u5B9A\u4ECE AI \u56DE\u590D\u4E2D\u5982\u4F55\u62BD\u53D6\u8981\u672C\u5730\u5904\u7406\u7684\u6587\u672C",control:_e({value:t.extraction?.regexPresetId||"",options:[{value:"",label:"\u2014\u2014 \u65E0\uFF08\u4E0D\u8FDB\u884C\u63D0\u53D6\uFF09 \u2014\u2014"},...n.map(o=>({value:o.id,label:o.name}))],onChange:o=>{let a=de(e)||{},i={...a.extraction||{},regexPresetId:o};if(o){let l=Ee.getPreset(o);Wn.info(`\u5DF2\u7ED1\u5B9A\u6B63\u5219\u9884\u8BBE\uFF1A${l?.name||o}`,null,{toast:"success"})}else Wn.info("\u5DF2\u89E3\u7ED1\u6B63\u5219\u9884\u8BBE\uFF0C\u5DE5\u5177\u5C06\u4E0D\u8FDB\u884C\u5185\u5BB9\u63D0\u53D6",null,{toast:"success"});Me(e,{...a,extraction:i}),r()}})})),s.appendChild(yd({label:"\u5199\u56DE\u65B9\u5F0F",hint:"\u5904\u7406\u540E\u7684\u7ED3\u679C\u5982\u4F55\u56DE\u5199\u5230 AI \u6D88\u606F",control:_e({value:t.output?.overwrite!==!1?"replace":"append",options:[{value:"replace",label:"\u8986\u76D6\u539F\u5DE5\u5177\u5757"},{value:"append",label:"\u8FFD\u52A0\u5230\u672B\u5C3E"}],onChange:o=>{let a=de(e)||{};Me(e,{...a,output:{...a.output||{},overwrite:o==="replace",enabled:!0,mode:"local_transform"}}),r()}})})),s.appendChild(yd({label:"\u81EA\u52A8\u89E6\u53D1",hint:"\u6536\u5230 AI \u56DE\u590D\u540E\u662F\u5426\u81EA\u52A8\u6267\u884C\u6B64\u811A\u672C",control:_e({value:t.output?.autoTrigger!==!1?"auto":"manual",options:[{value:"auto",label:"\u81EA\u52A8\uFF08\u6536\u5230\u56DE\u590D\u5373\u6267\u884C\uFF09"},{value:"manual",label:"\u624B\u52A8\uFF08\u4EC5\u70B9\u51FB\u6309\u94AE\u6267\u884C\uFF09"}],onChange:o=>{let a=de(e)||{};Me(e,{...a,output:{...a.output||{},autoTrigger:o==="auto",enabled:!0,mode:"local_transform"}}),r()}})})),er({heading:"\u7ED1\u5B9A",icon:"\u{1F517}",content:[s]})}function yd({label:t,hint:e,control:r}){let s=f("div",{className:"yyt-tool-binding-row"}),n=f("div",{className:"yyt-tool-binding-label"});return n.appendChild(f("span",{className:"yyt-tool-binding-label-text",text:t})),e&&n.appendChild(f("span",{className:"yyt-tool-binding-label-hint",text:e})),s.appendChild(n),Object.assign(r.el.style,{padding:"7px 10px",fontSize:"12px"}),s.appendChild(r.el),s.appendChild(f("div",{className:"yyt-tool-binding-meta"})),s}function gS(t,e,r,s,n,o,a,i){let l=f("div",{style:{display:"flex",flexDirection:"column"}});l.appendChild(f("div",{style:{marginBottom:"10px"}},f("div",{text:"\u6267\u884C\u65B9\u5411",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}}),f("div",{text:"\u51B3\u5B9A\u672C\u5730\u811A\u672C\u8FD0\u884C\u54EA\u4E2A\u53D8\u6362\u8DEF\u5F84\u3002",style:{fontSize:"11px",color:"var(--yyt-text-muted)",lineHeight:"1.6"}})));let c=t.processor?.direction||n[0]?.key||"",d=_e({value:c,options:n.map(m=>({value:m.key,label:m.description?`${m.label} \u2014 ${m.description}`:m.label})),style:{padding:"7px 10px",fontSize:"12px"},onChange:m=>{let h=de(e)||{};Me(e,{...h,processor:{...h.processor||{},direction:m}}),r()}});if(l.appendChild(d.el),l.appendChild(f("hr",{className:"yyt-zone-divider"})),o.length>0){l.appendChild(f("div",{style:{marginBottom:"10px"}},f("div",{text:"\u5904\u7406\u9879",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}}),f("div",{text:"\u52FE\u9009\u8981\u5305\u542B\u5728\u672C\u6B21\u53D8\u6362\u4E2D\u7684\u9879\u76EE\u3002",style:{fontSize:"11px",color:"var(--yyt-text-muted)",lineHeight:"1.6"}})));let m=f("div",{style:{display:"flex",flexDirection:"column"}}),h=t.processor?.options||{};for(let x of o){let v=Ye({label:x.label,hint:x.description||"",checked:h[x.key]===!0,onChange:T=>{let A=de(e)||{};Me(e,{...A,processor:{...A.processor||{},options:{...A.processor?.options||{},[x.key]:T}}})}});m.appendChild(v.el)}l.appendChild(m),l.appendChild(f("hr",{className:"yyt-zone-divider"}))}l.appendChild(f("div",{style:{marginBottom:"10px"}},f("div",{text:"\u63D0\u53D6\u914D\u7F6E",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}}),f("div",{text:'\u4ECE AI \u56DE\u590D\u4E2D\u62BD\u53D6\u8981\u672C\u5730\u5904\u7406\u7684\u6587\u672C\u3002\u5B8C\u6574\u89C4\u5219\u7531"\u6B63\u5219\u63D0\u53D6\u9884\u8BBE"\u51B3\u5B9A\uFF0C\u8FD9\u91CC\u53EA\u914D\u7F6E\u5DE5\u5177\u53C2\u6570\u3002',style:{fontSize:"11px",color:"var(--yyt-text-muted)",lineHeight:"1.6"}})));let u=f("div",{style:{display:"grid",gridTemplateColumns:"1fr auto",gap:"12px",alignItems:"end"}}),y=f("div",{className:"yyt-form-group",style:{margin:0}});y.appendChild(f("label",{text:"\u6700\u5927\u63D0\u53D6 AI \u6D88\u606F\u6570",style:{fontSize:"12px",fontWeight:"600",color:"var(--yyt-text-secondary, rgba(255,255,255,0.55))"}}));let p=f("input",{className:"yyt-input",attrs:{type:"number",min:"1",max:"50"},style:{padding:"7px 10px",fontSize:"12px"}});p.value=String(Number(t.extraction?.maxMessages)||5),p.addEventListener("change",()=>{let m=de(e)||{};Me(e,{...m,extraction:{...m.extraction||{},maxMessages:Math.max(1,parseInt(p.value,10)||5)}})}),y.appendChild(p),u.appendChild(y);let g=f("div",{className:"yyt-form-group",style:{margin:0}});return g.appendChild(f("label",{html:"&nbsp;",style:{fontSize:"12px"}})),g.appendChild(q({label:"\u{1F50D} \u6D4B\u8BD5\u63D0\u53D6",onClick:async()=>{try{let m=await Ii(e);mS(s,m,a,i)}catch(m){Wn.error(`\u6D4B\u8BD5\u63D0\u53D6\u5931\u8D25\uFF1A${m?.message||m}`,null,{toast:!0})}}}).el),u.appendChild(g),l.appendChild(u),er({heading:"\u914D\u7F6E",icon:"\u2699",content:[l]})}function mS(t,e,r,s){if(!re()||!ke(t))return;let o=`${ws}-${r||"extraction-preview"}`,a=Array.isArray(e?.messageEntries)?e.messageEntries:[],i=a.length>0?`
      <div class="yyt-form-group">
        <label>\u9010\u6761\u6D88\u606F\u9884\u89C8</label>
        <div class="yyt-preview-message-list">
          ${a.map((l,c)=>{let d=c===a.length-1?"\u6700\u65B0\u6D88\u606F":`\u6700\u8FD1\u7684\u7B2C ${a.length-c} \u6761\u6D88\u606F`;return`
              <div class="yyt-preview-message-item">
                <div class="yyt-preview-message-title">${cs(d)}</div>
                <div><label>\u539F\u6587</label><pre class="yyt-preview-box yyt-preview-pre">${cs(l.rawText||"\u65E0\u53EF\u7528\u6D88\u606F")}</pre></div>
                <div><label>\u6B63\u6587\u63D0\u53D6</label><pre class="yyt-preview-box yyt-preview-pre">${cs(l.filteredText||"\u6B63\u6587\u89C4\u5219\u672A\u547D\u4E2D")}</pre></div>
                <div><label>\u5DE5\u5177\u6807\u7B7E\u63D0\u53D6</label><pre class="yyt-preview-box yyt-preview-pre">${cs(l.extractedText||"\u672A\u63D0\u53D6\u5230\u5185\u5BB9")}</pre></div>
              </div>
            `}).join("")}
        </div>
      </div>
    `:"";t.append(oo({id:o,title:s,width:"720px",wide:!0,body:`
      <div class="yyt-form-group">
        <label>\u63D0\u53D6\u89C4\u5219</label>
        <div class="yyt-preview-box">${cs((e?.selectors||[]).join(`
`)||"\u65E0")}</div>
      </div>
      <div class="yyt-form-group">
        <label>\u539F\u59CB\u5185\u5BB9\u6C47\u603B</label>
        <pre class="yyt-preview-box yyt-preview-pre">${cs(e?.sourceText||"\u65E0\u53EF\u7528\u6D88\u606F")}</pre>
      </div>
      <div class="yyt-form-group">
        <label>\u6B63\u6587\u63D0\u53D6\u6C47\u603B</label>
        <pre class="yyt-preview-box yyt-preview-pre">${cs(e?.filteredSourceText||"\u6B63\u6587\u89C4\u5219\u672A\u547D\u4E2D")}</pre>
      </div>
      <div class="yyt-form-group">
        <label>\u5DE5\u5177\u6807\u7B7E\u63D0\u53D6\u6C47\u603B</label>
        <pre class="yyt-preview-box yyt-preview-pre">${cs(e?.extractedText||"\u672A\u63D0\u53D6\u5230\u5185\u5BB9")}</pre>
      </div>
      ${i}
    `})),ao(t,o,{onSave:l=>l()}),t.find(`#${o}-save`).text("\u5173\u95ED"),t.find(`#${o}-cancel`).remove()}var Wn,fd=N(()=>{tr();at();gr();ud();H();Fn();Vr();Wn=C.createScope("LocalTransformToolPanel")});var Ug={};le(Ug,{EscapeTransformToolPanel:()=>Kg,default:()=>hS});var Kg,hS,jg=N(()=>{fd();Kg=ki({id:"escapeTransformToolPanel",toolId:"escapeTransformTool",previewDialogId:"escape-transform-extraction-preview",previewTitle:"\u8F6C\u4E49\u5904\u7406\u63D0\u53D6\u9884\u89C8",heroHint:"\u4ECE\u6700\u8FD1 AI \u6D88\u606F\u63D0\u53D6\u6587\u672C\u540E\uFF0C\u5728\u672C\u5730\u6267\u884C\u8F6C\u4E49\u6216\u53BB\u8F6C\u4E49\uFF0C\u518D\u6309\u6240\u9009\u65B9\u5F0F\u5199\u56DE\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\u6216\u6B63\u5219\uFF0C\u4F8B\u5982\uFF1A
content
regex:<content>([\\s\\S]*?)</content>`,processorDirections:[{key:"escape",label:"\u8F6C\u4E49",description:"\u628A\u539F\u59CB\u5B57\u7B26\u8F6C\u6362\u6210\u8F6C\u4E49\u5E8F\u5217\u3002"},{key:"unescape",label:"\u53BB\u8F6C\u4E49",description:"\u628A\u8F6C\u4E49\u5E8F\u5217\u8FD8\u539F\u6210\u539F\u59CB\u5B57\u7B26\u3002"}],processorOptions:[{key:"doubleQuote",label:"\u53CC\u5F15\u53F7",description:'\u5904\u7406 " \u4E0E \\"\u3002'},{key:"singleQuote",label:"\u5355\u5F15\u53F7",description:"\u5904\u7406 ' \u4E0E \\'\u3002"},{key:"newline",label:"\u6362\u884C\u7B26",description:"\u5904\u7406\u6362\u884C\u4E0E \\n\u3002"}]}),hS=Kg});var Wg={};le(Wg,{PunctuationTransformToolPanel:()=>Fg,default:()=>bS});var Fg,bS,Hg=N(()=>{fd();Fg=ki({id:"punctuationTransformToolPanel",toolId:"punctuationTransformTool",previewDialogId:"punctuation-transform-extraction-preview",previewTitle:"\u4E2D\u6587\u6807\u70B9\u66FF\u6362\u63D0\u53D6\u9884\u89C8",heroHint:"\u4ECE\u6700\u8FD1 AI \u6D88\u606F\u63D0\u53D6\u6587\u672C\u540E\uFF0C\u5728\u672C\u5730\u628A\u82F1\u6587\u6807\u70B9\u66FF\u6362\u6210\u4E2D\u6587\u6807\u70B9\uFF0C\u518D\u6309\u6240\u9009\u65B9\u5F0F\u5199\u56DE\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\u6216\u6B63\u5219\uFF0C\u4F8B\u5982\uFF1A
content
regex:<content>([\\s\\S]*?)</content>`,processorDirections:[{key:"en_to_zh",label:"\u82F1\u6587\u8F6C\u4E2D\u6587",description:"\u6309\u52FE\u9009\u9879\u628A\u82F1\u6587\u6807\u70B9\u66FF\u6362\u4E3A\u4E2D\u6587\u6807\u70B9\u3002"}],processorOptions:[{key:"comma",label:"\u9017\u53F7 ,",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u9017\u53F7\u3002"},{key:"period",label:"\u53E5\u53F7 .",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u53E5\u53F7\u3002"},{key:"exclamation",label:"\u611F\u53F9\u53F7 !",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u611F\u53F9\u53F7\u3002"},{key:"question",label:"\u95EE\u53F7 ?",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u95EE\u53F7\u3002"},{key:"semicolon",label:"\u5206\u53F7 ;",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u5206\u53F7\u3002"},{key:"colon",label:"\u5192\u53F7 :",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u5192\u53F7\u3002"},{key:"leftParen",label:"\u5DE6\u62EC\u53F7 (",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u5DE6\u62EC\u53F7\u3002"},{key:"rightParen",label:"\u53F3\u62EC\u53F7 )",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u53F3\u62EC\u53F7\u3002"}]}),bS=Fg});var qg={};le(qg,{BypassPanel:()=>Gg,default:()=>xS});var dt,Gg,xS,Yg=N(()=>{ot();Bn();at();H();dt=C.createScope("BypassPanel"),Gg={id:"bypassPanel",_getActivePresetId(t){return t.find(".yyt-bypass-editor-content").data("presetId")||null},render(t){let e=ye.getPresetList(),r=ye.getDefaultPresetId();return`
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
    `},_renderPresetItem(t,e){let r=Nr&&Nr[t.id];return`
      <div class="yyt-bypass-preset-item ${e?"yyt-default":""}" data-preset-id="${t.id}">
        <div class="yyt-bypass-preset-info">
          <span class="yyt-bypass-preset-name">${ce(t.name)}</span>
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
      `;let e=ye.getDefaultPresetId()===t.id,r=Nr&&Nr[t.id];return`
      <div class="yyt-bypass-editor-content" data-preset-id="${t.id}">
        <div class="yyt-bypass-editor-header">
          <div class="yyt-bypass-editor-title">
            <input type="text" class="yyt-input yyt-bypass-name-input" 
                   value="${ce(t.name)}" placeholder="\u9884\u8BBE\u540D\u79F0">
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
                 value="${ce(t.description||"")}" placeholder="\u9884\u8BBE\u63CF\u8FF0\uFF08\u53EF\u9009\uFF09">
        </div>

        <div class="yyt-bypass-messages-header">
          <span>\u6D88\u606F\u5217\u8868</span>
          <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="yyt-bypass-add-message">
            <i class="fa-solid fa-plus"></i> \u6DFB\u52A0\u6D88\u606F
          </button>
        </div>

        <div class="yyt-bypass-messages">
          ${(t.messages||[]).map((s,n)=>this._renderMessageItem(s,n)).join("")}
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
                  placeholder="\u8F93\u5165\u6D88\u606F\u5185\u5BB9...">${ce(t.content||"")}</textarea>
      </div>
    `},bindEvents(t,e){let r=re();!r||!ke(t)||(t.off(".yytBypass"),this._bindPresetListEvents(t,r),this._bindEditorEvents(t,r),this._bindFileEvents(t,r),lr(t,{namespace:"yytBypassSelect",selectors:[".yyt-bypass-role-select"]}))},_bindPresetListEvents(t,e){t.on("click.yytBypass",".yyt-bypass-preset-item",r=>{if(e(r.target).closest(".yyt-bypass-quick-delete").length)return;let s=e(r.currentTarget).data("presetId");this._selectPreset(t,e,s)}),t.on("click.yytBypass",".yyt-bypass-quick-delete",async r=>{r.stopPropagation();let s=e(r.currentTarget).data("presetId");if(!s||!await _r("\u5220\u9664\u9884\u8BBE","\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u4E2A\u9884\u8BBE\u5417\uFF1F",{danger:!0}))return;let o=ye.deletePreset(s);o.success?(t.find(".yyt-bypass-editor-content").data("presetId")===s&&t.find(".yyt-bypass-editor").html(`
            <div class="yyt-bypass-empty">
              <i class="fa-solid fa-shield-halved"></i>
              <p>\u9009\u62E9\u6216\u521B\u5EFA Ai \u6307\u4EE4\u9884\u8BBE</p>
            </div>
          `),this._refreshPresetList(t,e),dt.info("\u9884\u8BBE\u5DF2\u5220\u9664",null,{toast:"success"})):dt.error(o?.message||"\u5220\u9664\u9884\u8BBE\u5931\u8D25",null,{toast:!0})}),t.on("click.yytBypass","#yyt-bypass-add",()=>{this._createNewPreset(t,e)})},_bindEditorEvents(t,e){t.on("click.yytBypass","#yyt-bypass-save",()=>{this._saveCurrentPreset(t,e)}),t.on("click.yytBypass","#yyt-bypass-delete",()=>{this._deleteCurrentPreset(t,e)}),t.on("click.yytBypass","#yyt-bypass-duplicate",()=>{this._duplicateCurrentPreset(t,e)}),t.on("click.yytBypass","#yyt-bypass-set-default",()=>{this._setAsDefault(t,e)}),t.on("click.yytBypass","#yyt-bypass-add-message",()=>{this._addMessage(t,e)}),t.on("click.yytBypass",".yyt-bypass-move-up",r=>{let s=e(r.currentTarget).closest(".yyt-bypass-message"),n=s.prev(".yyt-bypass-message");n.length&&(n.before(s),this._refreshMessageIndices(t,e))}),t.on("click.yytBypass",".yyt-bypass-move-down",r=>{let s=e(r.currentTarget).closest(".yyt-bypass-message"),n=s.next(".yyt-bypass-message");n.length&&(n.after(s),this._refreshMessageIndices(t,e))}),t.on("click.yytBypass",".yyt-bypass-insert-message",r=>{let s=e(r.currentTarget).closest(".yyt-bypass-message");this._insertMessageAfter(t,e,s)}),t.on("click.yytBypass",".yyt-bypass-delete-message",r=>{e(r.currentTarget).closest(".yyt-bypass-message").remove(),this._refreshMessageIndices(t,e)}),t.on("change.yytBypass",".yyt-bypass-message-enabled",r=>{e(r.currentTarget).closest(".yyt-bypass-message").toggleClass("yyt-disabled",!e(r.currentTarget).is(":checked"))})},_bindFileEvents(t,e){t.on("click.yytBypass","#yyt-bypass-import",()=>{t.find("#yyt-bypass-import-file").click()}),t.on("change.yytBypass","#yyt-bypass-import-file",async r=>{let s=r.target.files[0];if(s){try{let n=await lo(s),o=ye.importPresets(n);o.success?dt.info(o.message,null,{toast:"success"}):dt.error(o.message,null,{toast:!0}),o.success&&this.renderTo(t)}catch(n){dt.error(`\u5BFC\u5165\u5931\u8D25: ${n.message}`,null,{toast:!0})}e(r.target).val("")}}),t.on("click.yytBypass","#yyt-bypass-export",()=>{try{let r=ye.exportPresets();io(r,`bypass_presets_${Date.now()}.json`),dt.info("\u9884\u8BBE\u5DF2\u5BFC\u51FA",null,{toast:"success"})}catch(r){dt.error(`\u5BFC\u51FA\u5931\u8D25: ${r.message}`,null,{toast:!0})}})},_selectPreset(t,e,r){let s=ye.getPreset(r);s&&(t.find(".yyt-bypass-preset-item").removeClass("yyt-active"),t.find(`.yyt-bypass-preset-item[data-preset-id="${r}"]`).addClass("yyt-active"),t.find(".yyt-bypass-editor").html(this._renderEditor(s)),lr(t,{namespace:"yytBypassSelect",selectors:[".yyt-bypass-role-select"]}))},_createNewPreset(t,e){let r=`bypass_${Date.now()}`,s=ye.createPreset({id:r,name:"\u65B0 Ai \u6307\u4EE4\u9884\u8BBE",description:"",messages:[]});s.success?(this.renderTo(t),this._selectPreset(t,e,r),dt.info("\u9884\u8BBE\u5DF2\u521B\u5EFA",null,{toast:"success"})):dt.error(s?.message||"\u521B\u5EFA\u9884\u8BBE\u5931\u8D25",null,{toast:!0})},_saveCurrentPreset(t,e){let r=t.find(".yyt-bypass-editor-content"),s=r.data("presetId");if(!s)return;let n=r.find(".yyt-bypass-name-input").val().trim(),o=r.find(".yyt-bypass-description-input").val().trim();if(!n){dt.warn("\u8BF7\u8F93\u5165\u9884\u8BBE\u540D\u79F0",null,{toast:!0}),r.find(".yyt-bypass-name-input").trigger("focus").trigger("select");return}let a=[];r.find(".yyt-bypass-message").each(function(){let l=e(this);a.push({id:l.data("messageId"),role:l.find(".yyt-bypass-role-select").val(),content:l.find(".yyt-bypass-message-content").val(),enabled:l.find(".yyt-bypass-message-enabled").is(":checked"),deletable:String(l.data("deletable"))!=="false"})});let i=ye.updatePreset(s,{name:n,description:o,messages:a});i.success?(dt.info("\u9884\u8BBE\u5DF2\u4FDD\u5B58",null,{toast:"success"}),this._refreshPresetList(t,e)):dt.error(i?.message||"\u4FDD\u5B58\u9884\u8BBE\u5931\u8D25",null,{toast:!0})},async _deleteCurrentPreset(t,e){let s=t.find(".yyt-bypass-editor-content").data("presetId");if(!s||!await _r("\u5220\u9664\u9884\u8BBE","\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u4E2A\u9884\u8BBE\u5417\uFF1F",{danger:!0}))return;let o=ye.deletePreset(s);o.success?(this.renderTo(t),dt.info("\u9884\u8BBE\u5DF2\u5220\u9664",null,{toast:"success"})):dt.error(o?.message||"\u5220\u9664\u9884\u8BBE\u5931\u8D25",null,{toast:!0})},_duplicateCurrentPreset(t,e){let s=t.find(".yyt-bypass-editor-content").data("presetId");if(!s)return;let n=`bypass_${Date.now()}`,o=ye.duplicatePreset(s,n);o.success?(this.renderTo(t),this._selectPreset(t,e,n),dt.info("\u9884\u8BBE\u5DF2\u590D\u5236",null,{toast:"success"})):dt.error(o?.message||"\u590D\u5236\u9884\u8BBE\u5931\u8D25",null,{toast:!0})},_setAsDefault(t,e){let s=t.find(".yyt-bypass-editor-content").data("presetId");if(!s)return;ye.setDefaultPresetId(s),this._refreshPresetList(t,e);let n=ye.getPreset(s);n&&t.find(".yyt-bypass-editor").html(this._renderEditor(n)),dt.info("\u5DF2\u8BBE\u4E3A\u9ED8\u8BA4\u9884\u8BBE",null,{toast:"success"})},_addMessage(t,e){let r=t.find(".yyt-bypass-messages"),s={id:`msg_${Date.now()}`,role:"SYSTEM",content:"",enabled:!0,deletable:!0},n=r.find(".yyt-bypass-message").length;r.append(this._renderMessageItem(s,n))},_insertMessageAfter(t,e,r){let s=t.find(".yyt-bypass-messages"),n={id:`msg_${Date.now()}`,role:"SYSTEM",content:"",enabled:!0,deletable:!0},o=this._renderMessageItem(n,0),a=e(o);r.after(a),this._refreshMessageIndices(t,e)},_refreshMessageIndices(t,e){t.find(".yyt-bypass-message").each(function(r){e(this).attr("data-message-index",r)})},_refreshPresetList(t,e){let r=ye.getPresetList(),s=ye.getDefaultPresetId(),n=this._getActivePresetId(t);t.find(".yyt-bypass-preset-list").html(r.map(o=>this._renderPresetItem(o,o.id===s)).join("")),n&&t.find(`.yyt-bypass-preset-item[data-preset-id="${n}"]`).addClass("yyt-active")},destroy(t){!re()||!ke(t)||(Nt(t,"yytBypassSelect"),t.off(".yytBypass"))},getStyles(){return`
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
    `},renderTo(t){let e=this.render({});t.html(e),this.bindEvents(t,{})}},xS=Gg});var bd={};le(bd,{SettingsPanel:()=>Yo,applyTheme:()=>Zg,applyUiPreferences:()=>md,default:()=>ES});function Xg(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window}function Vo(){return Xg()?.document||document}function Qg(t=Vo()){return t?.documentElement||document.documentElement}function Zg(t,e=Vo()){let r=Qg(e),s={...wS,...Vg[t]||Vg["dark-blue"]};Object.entries(s).forEach(([n,o])=>{r.style.setProperty(n,o)}),r.setAttribute("data-yyt-theme",t)}function md(t={},e=Vo()){let r=Qg(e),{theme:s="dark-blue",compactMode:n=!1,animationEnabled:o=!0}=t||{};Zg(s,e),r.classList.toggle("yyt-compact-mode",!!n),r.classList.toggle("yyt-no-animation",!o)}function vS(){let t=new Map;return{add(e){return e?._id&&t.set(e._id,e),e},getControl(e){return t.get(e)||null},destroy(){for(let e of t.values())try{e.destroy?.()}catch{}t.clear()}}}function hd(t){return f("i",{className:`fa-solid ${t}`})}function TS(t,e,r,s){let n=f("div",{className:"yyt-settings-hero"}),o=f("div",{className:"yyt-settings-hero-row1"});o.appendChild(f("div",{className:"yyt-settings-hero-icon"},[hd("fa-sliders")])),o.appendChild(f("div",{className:"yyt-settings-hero-name",text:"\u5168\u5C40\u8BBE\u7F6E"}));let a=f("div",{className:"yyt-settings-hero-actions"});a.appendChild(q({label:"\u91CD\u7F6E\u4E3A\u9ED8\u8BA4",size:"small",icon:"\u21A9",onClick:r}).el),a.appendChild(q({label:"\u4FDD\u5B58\u8BBE\u7F6E",size:"small",variant:"primary",icon:"\u2713",onClick:s}).el),o.appendChild(a),n.appendChild(o),n.appendChild(f("div",{className:"yyt-settings-hero-desc",text:"\u7BA1\u7406\u6267\u884C\u5668\u3001\u81EA\u52A8\u5316\u3001\u8C03\u8BD5\u4E0E\u5916\u89C2\u504F\u597D\u3002"}));let i=t.ui||{},l=t.debug||{},c={"dark-blue":"\u6DF1\u84DD","dark-purple":"\u6DF1\u7D2B","dark-green":"\u6DF1\u7EFF",light:"\u6D45\u8272"}[i.theme]||"\u9ED8\u8BA4",d=f("div",{className:"yyt-settings-hero-chips"});return d.appendChild(f("span",{className:"yyt-settings-chip mode",text:`\u4E3B\u9898 ${c}`})),d.appendChild(f("span",{className:"yyt-settings-chip preset",text:`\u65E5\u5FD7 ${l.enableDebugLog?"DEBUG":"INFO"}`})),d.appendChild(f("span",{className:"yyt-settings-chip",text:`\u52A8\u753B ${i.animationEnabled===!1?"\u5173\u95ED":"\u5F00\u542F"}`})),d.appendChild(f("span",{className:"yyt-settings-chip",text:`\u7D27\u51D1 ${i.compactMode?"\u5F00":"\u5173"}`})),n.appendChild(d),n}function ds({icon:t,title:e,action:r=null},s=[]){let n=f("div",{className:"yyt-settings-section"}),o=f("div",{className:"yyt-settings-section-heading"});if(t){let a=f("span",{className:"yyt-settings-section-icon"});a.appendChild(hd(t)),o.appendChild(a)}if(o.appendChild(f("span",{text:e})),r){let a=f("span",{className:"yyt-settings-section-action"});a.appendChild(r),o.appendChild(a)}n.appendChild(o);for(let a of s)a&&n.appendChild(a?.el?a.el:a);return n}function Ri({label:t,hint:e,control:r}){let s=f("div",{className:"yyt-settings-row"}),n=f("div",{className:"yyt-settings-row-label"});return n.appendChild(f("span",{className:"yyt-settings-row-label-text",text:t})),e&&n.appendChild(f("span",{className:"yyt-settings-row-label-hint",text:e})),s.appendChild(n),s.appendChild(r?.el?r.el:r),s}function Jg({label:t,hint:e,leftLabel:r,leftControl:s,rightLabel:n,rightControl:o}){let a=f("div",{className:"yyt-settings-row-double"}),i=f("div",{className:"yyt-settings-row-label"});i.appendChild(f("span",{className:"yyt-settings-row-label-text",text:t})),e&&i.appendChild(f("span",{className:"yyt-settings-row-label-hint",text:e})),a.appendChild(i);let l=f("div",{className:"yyt-settings-row-double-cell"});r&&l.appendChild(f("span",{className:"yyt-settings-row-double-cell-label",text:r})),l.appendChild(s?.el?s.el:s),a.appendChild(l);let c=f("div",{className:"yyt-settings-row-double-cell"});return n&&c.appendChild(f("span",{className:"yyt-settings-row-double-cell-label",text:n})),c.appendChild(o?.el?o.el:o),a.appendChild(c),a}function qo({title:t,desc:e,control:r}){let s=f("div",{className:"yyt-settings-toggle-row"}),n=f("div",{className:"yyt-settings-toggle-info"});return n.appendChild(f("div",{className:"yyt-settings-toggle-title",text:t})),e&&n.appendChild(f("div",{className:"yyt-settings-toggle-desc",text:e})),s.appendChild(n),s.appendChild(r?.el?r.el:r),s}function Mi(t){return f("div",{className:"yyt-settings-hint-note",html:t})}function SS(t){let e=t?.hostBinding||{},r=f("div",{className:"yyt-settings-stat-row"}),s=(n,o,a="")=>{let i=f("div",{className:"yyt-settings-stat"});return i.appendChild(f("span",{className:"yyt-settings-stat-label",text:n})),i.appendChild(f("span",{className:`yyt-settings-stat-value ${a}`.trim(),text:o})),i};return r.appendChild(s("\u670D\u52A1",t?.enabled?"\u8FD0\u884C\u4E2D":"\u672A\u542F\u7528",t?.enabled?"success":"error")),r.appendChild(s("\u76D1\u542C",e.initialized?"\u5DF2\u7ED1\u5B9A":"\u672A\u7ED1\u5B9A",e.initialized?"success":"error")),r.appendChild(s("\u5F85\u5904\u7406",String(t?.pendingTimerCount||0),t?.pendingTimerCount?"":"muted")),r.appendChild(s("\u6392\u961F\u69FD\u4F4D",String(t?.queuedSlotCount||0),t?.queuedSlotCount?"":"muted")),r}function _S(t){if(!t.length)return f("div",{className:"yyt-settings-hint-note",text:"\u6682\u65E0\u81EA\u52A8\u5316\u4E8B\u52A1\u8BB0\u5F55\u3002"});let e=f("div",{className:"yyt-runtime-list"});for(let r of t.slice(0,5)){let s=f("div",{className:"yyt-runtime-list-row"});s.appendChild(f("span",{className:"yyt-runtime-event",text:r?.sourceEvent||"UNKNOWN_EVENT"}));let n=r?.phase||"unknown",o="";n==="completed"||r?.verdict==="success"?o="success":(n==="failed"||r?.error)&&(o="error"),s.appendChild(f("span",{className:`yyt-runtime-phase ${o}`.trim(),text:n}));let a=[r?.messageId||"no_message_id",r?.verdict||r?.error||r?.generationKey||""].filter(Boolean).join(" \xB7 ");s.appendChild(f("span",{className:"yyt-runtime-main",text:a||"\u65E0\u989D\u5916\u4FE1\u606F"})),e.appendChild(s)}return e}function AS(){let t=Jt.getAvailableVariables(),e=f("div",{className:"yyt-macro-list"});for(let r of t){let s=f("div",{className:"yyt-macro-row"});s.appendChild(f("code",{text:r.name})),s.appendChild(f("span",{text:r.description})),e.appendChild(s)}return e}function Hn(t,e,r,{min:s,max:n,step:o}={}){let a={};return s!=null&&(a.min=String(s)),n!=null&&(a.max=String(n)),o!=null&&(a.step=String(o)),t.add(ge({id:e,type:"number",value:String(r),attrs:a}))}var gd,wS,Vg,Yo,ES,xd=N(()=>{jo();H();wi();at();tr();gd=C.createScope("SettingsPanel"),wS={"--yyt-accent":"#7bb7ff","--yyt-accent-glow":"rgba(123, 183, 255, 0.4)","--yyt-accent-soft":"rgba(123, 183, 255, 0.15)","--yyt-accent-strong":"#a5d4ff","--yyt-on-accent":"#0a0d13","--yyt-bg-base":"#0a0d13","--yyt-surface":"#0f1219","--yyt-surface-2":"#151a24","--yyt-surface-3":"#1c2231","--yyt-surface-hover":"#1c2231","--yyt-surface-active":"#232b3e","--yyt-border":"rgba(255, 255, 255, 0.06)","--yyt-border-soft":"rgba(255, 255, 255, 0.04)","--yyt-border-strong":"rgba(255, 255, 255, 0.12)","--yyt-text":"rgba(255, 255, 255, 0.92)","--yyt-text-secondary":"rgba(255, 255, 255, 0.55)","--yyt-text-muted":"rgba(255, 255, 255, 0.35)","--yyt-focus-ring":"0 0 0 2px rgba(123, 183, 255, 1), 0 0 0 4px rgba(123, 183, 255, 0.15)","--yyt-control-bg":"#0f1219","--yyt-control-bg-hover":"#151a24","--yyt-control-bg-active":"#1c2231","--yyt-control-bg-strong":"#151a24","--yyt-control-bg-focus":"#151a24","--yyt-control-border":"rgba(255, 255, 255, 0.08)","--yyt-control-border-hover":"rgba(255, 255, 255, 0.14)","--yyt-control-border-focus":"rgba(123, 183, 255, 0.5)","--yyt-control-shadow":"none","--yyt-control-shadow-hover":"none","--yyt-control-shadow-focus":"none","--yyt-control-shadow-active":"none","--yyt-select-surface":"#151a24","--yyt-select-option-bg":"#1c2231","--yyt-select-option-hover-bg":"#232b3e","--yyt-select-option-selected-bg":"#2a3450","--yyt-select-option-border":"rgba(123, 183, 255, 0.15)","--yyt-select-option-selected-border":"rgba(123, 183, 255, 0.3)","--yyt-select-dropdown-shadow":"0 8px 24px rgba(0, 0, 0, 0.4)","--yyt-select-arrow-color":"rgba(255, 255, 255, 0.4)"},Vg={"dark-blue":{"--yyt-on-accent":"#0a0d13"},"dark-purple":{"--yyt-accent":"#a78bfa","--yyt-accent-glow":"rgba(167, 139, 250, 0.4)","--yyt-accent-soft":"rgba(167, 139, 250, 0.15)","--yyt-accent-strong":"#c4b5fd","--yyt-bg-base":"#0d0a14","--yyt-surface":"#12101c","--yyt-surface-2":"#1a1726","--yyt-surface-3":"#221e32","--yyt-surface-hover":"#221e32","--yyt-surface-active":"#2a2540","--yyt-on-accent":"#0d0a14","--yyt-control-bg":"#12101c","--yyt-control-bg-hover":"#1a1726","--yyt-control-bg-active":"#221e32","--yyt-control-bg-strong":"#1a1726","--yyt-control-bg-focus":"#1a1726","--yyt-control-border-focus":"rgba(167, 139, 250, 0.5)","--yyt-select-surface":"#1a1726","--yyt-select-option-bg":"#221e32","--yyt-select-option-hover-bg":"#2a2540","--yyt-select-option-selected-bg":"#332d50","--yyt-select-option-border":"rgba(167, 139, 250, 0.15)","--yyt-select-option-selected-border":"rgba(167, 139, 250, 0.3)","--yyt-focus-ring":"0 0 0 2px rgba(167, 139, 250, 1), 0 0 0 4px rgba(167, 139, 250, 0.15)"},"dark-green":{"--yyt-accent":"#4ade80","--yyt-accent-glow":"rgba(74, 222, 128, 0.4)","--yyt-accent-soft":"rgba(74, 222, 128, 0.15)","--yyt-accent-strong":"#86efac","--yyt-bg-base":"#0a120d","--yyt-surface":"#0f1912","--yyt-surface-2":"#151f1a","--yyt-surface-3":"#1c2824","--yyt-surface-hover":"#1c2824","--yyt-surface-active":"#233530","--yyt-on-accent":"#0a120d","--yyt-control-bg":"#0f1912","--yyt-control-bg-hover":"#151f1a","--yyt-control-bg-active":"#1c2824","--yyt-control-bg-strong":"#151f1a","--yyt-control-bg-focus":"#151f1a","--yyt-control-border-focus":"rgba(74, 222, 128, 0.5)","--yyt-select-surface":"#151f1a","--yyt-select-option-bg":"#1c2824","--yyt-select-option-hover-bg":"#233530","--yyt-select-option-selected-bg":"#2a4038","--yyt-select-option-border":"rgba(74, 222, 128, 0.15)","--yyt-select-option-selected-border":"rgba(74, 222, 128, 0.3)","--yyt-focus-ring":"0 0 0 2px rgba(74, 222, 128, 1), 0 0 0 4px rgba(74, 222, 128, 0.15)"},light:{"--yyt-accent":"#3b82f6","--yyt-accent-glow":"rgba(59, 130, 246, 0.3)","--yyt-accent-soft":"rgba(59, 130, 246, 0.1)","--yyt-accent-strong":"#93c5fd","--yyt-bg-base":"#f5f7fa","--yyt-surface":"#edf0f5","--yyt-surface-2":"#e4e8ef","--yyt-surface-3":"#dbe0e9","--yyt-surface-hover":"#dbe0e9","--yyt-surface-active":"#d1d7e2","--yyt-text":"rgba(15, 23, 42, 0.92)","--yyt-text-secondary":"rgba(15, 23, 42, 0.55)","--yyt-text-muted":"rgba(15, 23, 42, 0.35)","--yyt-border":"rgba(15, 23, 42, 0.08)","--yyt-border-soft":"rgba(15, 23, 42, 0.04)","--yyt-border-strong":"rgba(15, 23, 42, 0.14)","--yyt-focus-ring":"0 0 0 2px rgba(59, 130, 246, 1), 0 0 0 4px rgba(59, 130, 246, 0.12)","--yyt-on-accent":"#ffffff","--yyt-control-bg":"#edf0f5","--yyt-control-bg-hover":"#e4e8ef","--yyt-control-bg-active":"#dbe0e9","--yyt-control-bg-strong":"#e4e8ef","--yyt-control-bg-focus":"#e4e8ef","--yyt-control-border":"rgba(15, 23, 42, 0.1)","--yyt-control-border-hover":"rgba(15, 23, 42, 0.18)","--yyt-control-border-focus":"rgba(59, 130, 246, 0.5)","--yyt-control-shadow":"none","--yyt-control-shadow-hover":"none","--yyt-control-shadow-focus":"none","--yyt-control-shadow-active":"none","--yyt-select-surface":"#e4e8ef","--yyt-select-option-bg":"#edf0f5","--yyt-select-option-hover-bg":"#dbe0e9","--yyt-select-option-selected-bg":"#dbeafe","--yyt-select-option-border":"rgba(59, 130, 246, 0.12)","--yyt-select-option-selected-border":"rgba(59, 130, 246, 0.3)","--yyt-select-dropdown-shadow":"0 8px 24px rgba(15, 23, 42, 0.1)","--yyt-select-arrow-color":"rgba(15, 23, 42, 0.4)"}};Yo={id:"settingsPanel",_instance:null,_getAutomationRuntime(){try{return Xg()?.YouYouToolkit?.getAutomationRuntime?.()||null}catch{return null}},renderTo(t){if(!re()||!t?.length)return;let r=Vt.getSettings(),s=r.executor||{},n=r.automation||{},o=r.debug||{},a=r.ui||{},i=this._getAutomationRuntime(),l=Array.isArray(i?.recentTransactions)?i.recentTransactions.slice().reverse():[],c=i?.hostBinding||{},d=vS(),u=async()=>{await _r("\u91CD\u7F6E\u8BBE\u7F6E","\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u8BBE\u7F6E\u4E3A\u9ED8\u8BA4\u503C\u5417\uFF1F",{danger:!0})&&(Vt.resetSettings(),md(Uo.ui,Vo()),Yo.renderTo(t),gd.info("\u8BBE\u7F6E\u5DF2\u91CD\u7F6E",null,{toast:"success"}))},y=()=>{Yo._saveFromControls(d,t)},p=f("div",{className:"yyt-settings-panel"});p.appendChild(TS(r,i,u,y));let g=new Map,m=f("div",{className:"yyt-settings-tabs"}),h=[{id:"executor",label:"\u6267\u884C\u5668",icon:"fa-microchip"},{id:"debug",label:"\u8C03\u8BD5",icon:"fa-bug"},{id:"ui",label:"\u5916\u89C2",icon:"fa-palette"}],x=new Map,v=_=>{for(let[k,K]of x)K.classList.toggle("yyt-active",k===_);for(let[k,K]of g)K.classList.toggle("yyt-active",k===_)};for(let _ of h){let k=f("button",{className:"yyt-settings-tab"+(_.id==="executor"?" yyt-active":""),attrs:{type:"button"}});k.appendChild(hd(_.icon)),k.appendChild(f("span",{text:_.label})),k.addEventListener("click",()=>v(_.id)),m.appendChild(k),x.set(_.id,k)}p.appendChild(m);let T=f("div",{className:"yyt-settings-scroll"}),A=f("div",{className:"yyt-settings-body"});T.appendChild(A);let E=f("div",{className:"yyt-settings-tab-pane yyt-active"});E.appendChild(ds({icon:"fa-gauge-high",title:"\u6267\u884C\u9650\u5236"},[Ri({label:"\u6700\u5927\u5E76\u53D1\u6570",hint:"\u540C\u65F6\u6267\u884C\u7684\u5DE5\u5177\u6570\u91CF\u4E0A\u9650\uFF081 ~ 10\uFF09",control:Hn(d,"maxConcurrent",s.maxConcurrent??3,{min:1,max:10})}),Ri({label:"\u961F\u5217\u5904\u7406\u65B9\u5F0F",hint:"\u51B3\u5B9A\u5F85\u6267\u884C\u5DE5\u5177\u7684\u6392\u961F\u987A\u5E8F",control:d.add(_e({id:"queueStrategy",options:[{value:"fifo",label:"FIFO (\u5148\u8FDB\u5148\u51FA)"},{value:"lifo",label:"LIFO (\u540E\u8FDB\u5148\u51FA)"},{value:"priority",label:"\u4F18\u5148\u7EA7\u6392\u5E8F"}],value:s.queueStrategy||"fifo"}))})])),E.appendChild(ds({icon:"fa-rotate-right",title:"\u91CD\u8BD5\u4E0E\u8D85\u65F6"},[Jg({label:"\u91CD\u8BD5\u7B56\u7565",hint:"\u5931\u8D25\u540E\u81EA\u52A8\u91CD\u8BD5\u7684\u6B21\u6570\u4E0E\u95F4\u9694",leftLabel:"\u6B21\u6570",leftControl:Hn(d,"maxRetries",s.maxRetries??2,{min:0,max:10}),rightLabel:"\u95F4\u9694 ms",rightControl:Hn(d,"retryDelayMs",s.retryDelayMs??5e3,{min:1e3,max:6e4,step:1e3})}),Ri({label:"\u8BF7\u6C42\u8D85\u65F6\u65F6\u95F4 (ms)",hint:"\u5355\u4E2A\u8BF7\u6C42\u8D85\u8FC7\u8BE5\u65F6\u957F\u5C06\u81EA\u52A8\u4E2D\u65AD",control:Hn(d,"requestTimeoutMs",s.requestTimeoutMs??9e4,{min:1e4,max:3e5,step:1e4})})])),E.appendChild(ds({icon:"fa-bolt",title:"\u81EA\u52A8\u89E6\u53D1"},[Mi("\u7531\u5404\u5DE5\u5177\u7684 <code>output_mode</code> \u51B3\u5B9A\u54EA\u4E9B\u5DE5\u5177\u81EA\u52A8\u89E6\u53D1\u3002\u8FD9\u91CC\u53EA\u63A7\u5236\u5168\u5C40\u8282\u6D41\u65F6\u95F4\u3002"),Jg({label:"\u8282\u6D41\u53C2\u6570",hint:"\u7B49\u5F85\u7A33\u5B9A\u540E\u89E6\u53D1\uFF0C\u89E6\u53D1\u540E\u518D\u51B7\u5374",leftLabel:"\u7A33\u5B9A ms",leftControl:Hn(d,"automationSettleMs",n.settleMs??1200,{min:0,max:1e4,step:100}),rightLabel:"\u51B7\u5374 ms",rightControl:Hn(d,"automationCooldownMs",n.cooldownMs??5e3,{min:0,max:6e4,step:100})})]));let w=[SS(i)],P=Array.isArray(c.eventBindings)&&c.eventBindings.length>0?c.eventBindings.join(" / "):"\u6682\u65E0\u4E8B\u4EF6\u7ED1\u5B9A";w.push(Mi(`\u4E8B\u4EF6\u6E90: <code>${c.source||"unavailable"}</code>\uFF1B\u4E8B\u4EF6: <code>${P}</code>`)),c.lastError&&w.push(Mi(`\u6700\u8FD1\u9519\u8BEF: <code>${c.lastError}</code>`)),w.push(_S(l)),E.appendChild(ds({icon:"fa-magnifying-glass-chart",title:"\u81EA\u52A8\u89E6\u53D1\u8BCA\u65AD"},w)),A.appendChild(E),g.set("executor",E);let $=f("div",{className:"yyt-settings-tab-pane"});$.appendChild(ds({icon:"fa-terminal",title:"\u65E5\u5FD7\u4E0E\u5386\u53F2"},[qo({title:"\u542F\u7528\u8C03\u8BD5\u65E5\u5FD7",desc:"\u5F00\u542F\u540E Logger \u9762\u677F\u5C06\u8BB0\u5F55 DEBUG \u7EA7\u522B\u65E5\u5FD7\uFF0C\u5173\u95ED\u4EC5\u8BB0\u5F55 INFO \u53CA\u4EE5\u4E0A",control:d.add(Ye({id:"enableDebugLog",checked:o.enableDebugLog}))}),qo({title:"\u4FDD\u5B58\u6267\u884C\u5386\u53F2",desc:"\u8BB0\u5F55\u5DE5\u5177\u6267\u884C\u5386\u53F2\uFF0C\u4FBF\u4E8E\u95EE\u9898\u6392\u67E5",control:d.add(Ye({id:"saveExecutionHistory",checked:o.saveExecutionHistory}))})])),$.appendChild(ds({icon:"fa-eye",title:"\u663E\u793A\u8F85\u52A9"},[qo({title:"\u663E\u793A\u8FD0\u884C\u72B6\u6001\u5FBD\u7AE0",desc:"\u5728\u5DE5\u5177\u5361\u7247\u4E0A\u663E\u793A\u8FD0\u884C\u72B6\u6001\u6307\u793A\u5668",control:d.add(Ye({id:"showRuntimeBadge",checked:o.showRuntimeBadge}))})])),A.appendChild($),g.set("debug",$);let B=f("div",{className:"yyt-settings-tab-pane"});B.appendChild(ds({icon:"fa-palette",title:"\u4E3B\u9898\u4E0E\u52A8\u6548"},[Ri({label:"\u4E3B\u9898",hint:"\u5207\u6362\u540E\u4FDD\u5B58\u5373\u53EF\u5E94\u7528\u5230\u5168\u5C40\u754C\u9762",control:d.add(_e({id:"theme",options:[{value:"dark-blue",label:"\u6DF1\u84DD"},{value:"dark-purple",label:"\u6DF1\u7D2B"},{value:"dark-green",label:"\u6DF1\u7EFF"},{value:"light",label:"\u6D45\u8272"}],value:a.theme||"dark-blue"}))}),qo({title:"\u7D27\u51D1\u6A21\u5F0F",desc:"\u51CF\u5C11\u5361\u7247\u95F4\u8DDD\uFF0C\u663E\u793A\u66F4\u591A\u5185\u5BB9",control:d.add(Ye({id:"compactMode",checked:a.compactMode}))}),qo({title:"\u542F\u7528\u52A8\u753B\u6548\u679C",desc:"\u754C\u9762\u8FC7\u6E21\u548C\u4EA4\u4E92\u52A8\u753B",control:d.add(Ye({id:"animationEnabled",checked:a.animationEnabled}))})])),B.appendChild(ds({icon:"fa-code",title:"\u6A21\u677F\u5B8F\u8BF4\u660E"},[Mi("\u5DE5\u5177\u6A21\u677F\u91CC\u53EF\u76F4\u63A5\u4F7F\u7528\u4E0B\u9762\u8FD9\u4E9B\u5B8F\u3002\u4E16\u754C\u4E66\u5185\u5BB9\u53EA\u6709\u5728\u6A21\u677F\u91CC\u663E\u5F0F\u5199\u5165 <code>{{toolWorldbookContent}}</code> \u65F6\u624D\u4F1A\u6CE8\u5165\u3002"),AS()])),A.appendChild(B),g.set("ui",B),p.appendChild(T),t.empty().append(p),this._instance={root:d,_tabPanels:g};let R=Vt.getDebugSettings();C.setLevel(R.enableDebugLog?fe.DEBUG:fe.INFO)},_saveFromControls(t,e){let r=o=>{let a=t.getControl(o);return a?a.get():null},s=[{id:"maxConcurrent",min:1,max:10,label:"\u6700\u5927\u5E76\u53D1\u6570"},{id:"maxRetries",min:0,max:10,label:"\u6700\u5927\u91CD\u8BD5\u6B21\u6570"},{id:"retryDelayMs",min:1e3,max:6e4,label:"\u91CD\u8BD5\u95F4\u9694"},{id:"requestTimeoutMs",min:1e4,max:3e5,label:"\u8BF7\u6C42\u8D85\u65F6\u65F6\u95F4"},{id:"automationSettleMs",min:0,max:1e4,label:"\u7B49\u5F85\u7A33\u5B9A\u65F6\u95F4"},{id:"automationCooldownMs",min:0,max:6e4,label:"\u81EA\u52A8\u5316\u51B7\u5374\u65F6\u95F4"}];for(let o of s){let a=r(o.id),i=parseInt(a,10);if(isNaN(i)||i<o.min||i>o.max){gd.warn(`${o.label} \u987B\u5728 ${o.min} ~ ${o.max} \u4E4B\u95F4`,null,{toast:!0});let l=t.getControl(o.id);l?.focus&&l.focus(),l?.select&&l.select();return}}let n={executor:{maxConcurrent:parseInt(r("maxConcurrent"),10)||3,maxRetries:parseInt(r("maxRetries"),10)||2,retryDelayMs:parseInt(r("retryDelayMs"),10)||5e3,requestTimeoutMs:parseInt(r("requestTimeoutMs"),10)||9e4,queueStrategy:r("queueStrategy")||"fifo"},automation:{settleMs:parseInt(r("automationSettleMs"),10)||1200,cooldownMs:parseInt(r("automationCooldownMs"),10)||5e3,maxConcurrentSlots:Vt.getSettings()?.automation?.maxConcurrentSlots||1},debug:{enableDebugLog:!!r("enableDebugLog"),saveExecutionHistory:!!r("saveExecutionHistory"),showRuntimeBadge:!!r("showRuntimeBadge")},ui:{theme:r("theme")||"dark-blue",compactMode:!!r("compactMode"),animationEnabled:!!r("animationEnabled")}};Vt.saveSettings(n),C.setLevel(n.debug.enableDebugLog?fe.DEBUG:fe.INFO),md(n.ui,Vo()),gd.info("\u8BBE\u7F6E\u5DF2\u4FDD\u5B58",null,{toast:"success"}),Yo.renderTo(e)},render(){return""},getStyles(){return""},bindEvents(){},destroy(t){if(this._instance?.root)try{this._instance.root.destroy()}catch{}this._instance=null,re()&&t?.length&&t.empty()}},ES=Yo});function CS(t={},e=-1){return[t?.sourceId,t?.messageId,t?.message_id,t?.id,t?.mid,t?.mesid,t?.mes_id,t?.chat_index,t?.index,e].map(r=>Ae(r))}function IS(t=[],e=""){let r=Ae(e);if(!r||!Array.isArray(t))return-1;for(let s=t.length-1;s>=0;s-=1){let n=t[s];if(CS(n,s).includes(r))return s}return-1}function Jo(t={},e={}){let r=Ae(t?.sourceMessageId||t?.confirmedAssistantMessageId||t?.messageId);if(!r)return null;let s=bc({resolvedAt:Date.now(),runSource:e.runSource||t?.runSource||lt.MANUAL,traceId:t?.traceId||"",chatId:t?.chatId||"",sourceMessageId:r,sourceSwipeId:t?.sourceSwipeId||t?.effectiveSwipeId||"",effectiveSwipeId:t?.effectiveSwipeId||t?.sourceSwipeId||"swipe:current",slotBindingKey:t?.slotBindingKey||"",slotRevisionKey:t?.slotRevisionKey||"",slotTransactionId:t?.slotTransactionId||"",assistantContentFingerprint:t?.assistantContentFingerprint||"",assistantBaseFingerprint:t?.assistantBaseFingerprint||"",assistantText:t?.lastAiMessage||"",assistantBaseText:t?.assistantBaseText||"",targetMessageIndex:IS(t?.chatMessages||t?.chatHistory||[],r)});return!s.slotBindingKey||!s.slotRevisionKey?null:s}async function wd({runSource:t=lt.MANUAL}={}){let e=await Cs({runSource:t});return Jo(e,{runSource:t})}async function kS({messageId:t,swipeId:e="",runSource:r=lt.AUTO}={}){let s=await Is({messageId:t,swipeId:e,runSource:r});return Jo(s,{runSource:r})}async function em(t=null,e={}){let r=t||null;if(typeof e.resolveTarget=="function")return await e.resolveTarget(r);let s=Ae(e.runSource||r?.runSource)||lt.MANUAL,n=Ae(e.messageId||r?.sourceMessageId),o=Ae(e.swipeId||r?.sourceSwipeId||r?.effectiveSwipeId);return e.useMessageTarget===!0||s===lt.AUTO?n?kS({messageId:n,swipeId:o,runSource:s}):null:wd({runSource:s})}function tm(t,e){let r=t||null,s=e||null;return!r||!s?{valid:!1,reason:"missing_target_snapshot"}:Ae(r.sourceMessageId)!==Ae(s.sourceMessageId)?{valid:!1,reason:"source_message_changed"}:Ae(r.sourceSwipeId||r.effectiveSwipeId)!==Ae(s.sourceSwipeId||s.effectiveSwipeId)?{valid:!1,reason:"source_swipe_changed"}:Ae(r.slotRevisionKey)!==Ae(s.slotRevisionKey)?{valid:!1,reason:"slot_revision_changed"}:{valid:!0,reason:"ok"}}var Pi=N(()=>{ks();Le()});function $r(t,e=""){return t==null?e:String(t).trim()||e}function RS(t){if(!t||t?.is_user===!0||t?.is_system===!0)return!1;let e=String(t?.role||"").trim().toLowerCase();return e==="assistant"||e==="ai"||!e}function MS(t){return!t||typeof t!="object"||Array.isArray(t)?!1:!!(Array.isArray(t.tables)||typeof t.chatId=="string"&&t.chatId.length>0||typeof t.slotBindingKey=="string"&&t.slotBindingKey.length>0)}function rm(t,e){if(!t)return null;let r=t[Ds];if(!r)return null;let s=Ce(e);return MS(r)?s===Et?r:null:r[s]||null}function Xo({loadMode:t=Ls.EMPTY,mergeBaseOnly:e=!1,state:r=null,sourceKind:s=Lt.EMPTY,resolvedFromMessageId:n="",resolvedFromRevisionKey:o=""}={}){let a=Ir(r)||null;return{loadMode:t,mergeBaseOnly:e,state:a,sourceKind:s,resolvedFromMessageId:$r(n,a?.sourceMessageId||""),resolvedFromRevisionKey:$r(o,a?.slotRevisionKey||"")}}function vd(t,e={}){let r=Ir(t);return r?Ir({...r,meta:{...r.meta||{},...e||{}}}):null}function sm({runtime:t,targetSnapshot:e,currentMessageIndex:r=-1,templateTables:s=[],isolationKey:n}={}){let o=Array.isArray(t?.chat)?t.chat:[],a=$r(e?.slotRevisionKey,""),i=$r(e?.slotBindingKey,""),l=Ce(n===void 0?"":n);if(r>=0&&r<o.length){let c=rm(o[r],l),d=Ir(c);if(d&&$r(d.slotRevisionKey,"")===a)return Xo({loadMode:Ls.EXACT,mergeBaseOnly:!1,state:vd(d,{sourceKind:Lt.EXACT,isolationKey:l,resolvedFromMessageId:d.sourceMessageId,resolvedFromRevisionKey:d.slotRevisionKey}),sourceKind:Lt.EXACT,resolvedFromMessageId:d.sourceMessageId,resolvedFromRevisionKey:d.slotRevisionKey});if(d&&$r(d.slotBindingKey,"")===i){let u=vd({...d,slotRevisionKey:a||d.slotRevisionKey,sourceSwipeId:$r(e?.sourceSwipeId||e?.effectiveSwipeId,d.sourceSwipeId),meta:{...d.meta||{},sourceKind:Lt.BINDING,mergeBaseOnly:!0,fallbackFromBinding:!0,isolationKey:l,fallbackFromRevisionKey:$r(d.slotRevisionKey,""),requestedRevisionKey:a,resolvedFromMessageId:d.sourceMessageId,resolvedFromRevisionKey:d.slotRevisionKey}});return Xo({loadMode:Ls.BINDING_FALLBACK,mergeBaseOnly:!0,state:u,sourceKind:Lt.BINDING,resolvedFromMessageId:d.sourceMessageId,resolvedFromRevisionKey:d.slotRevisionKey})}}if(r>0)for(let c=r-1;c>=0;c-=1){let d=o[c];if(!RS(d))continue;let u=rm(d,l),y=Ir(u);if(!y||!Array.isArray(y.tables)||y.tables.length===0)continue;let p=vd({...y,slotBindingKey:i||y.slotBindingKey,slotRevisionKey:a||y.slotRevisionKey,sourceSwipeId:$r(e?.sourceSwipeId||e?.effectiveSwipeId,y.sourceSwipeId),meta:{...y.meta||{},sourceKind:Lt.HISTORY,mergeBaseOnly:!0,reconstructedFromHistory:!0,isolationKey:l,resolvedFromMessageId:y.sourceMessageId,resolvedFromRevisionKey:y.slotRevisionKey}});return Xo({loadMode:Ls.HISTORY,mergeBaseOnly:!0,state:p,sourceKind:Lt.HISTORY,resolvedFromMessageId:y.sourceMessageId,resolvedFromRevisionKey:y.slotRevisionKey})}return Array.isArray(s)&&s.length>0?Xo({loadMode:Ls.TEMPLATE,mergeBaseOnly:!1,state:Ro(e,{tables:oe(s),meta:{fromTemplate:!0,isolationKey:l,sourceKind:Lt.TEMPLATE,resolvedFromMessageId:"",resolvedFromRevisionKey:""}}),sourceKind:Lt.TEMPLATE}):Xo({loadMode:Ls.EMPTY,mergeBaseOnly:!1,state:Ro(e,{meta:{isolationKey:l,sourceKind:Lt.EMPTY,resolvedFromMessageId:"",resolvedFromRevisionKey:""}}),sourceKind:Lt.EMPTY})}var nm=N(()=>{Le()});function om(){return Td||(Td=C.createScope("TableStateMirror")),Td}async function PS(t,e,r){try{await Xe(),await ii({chatId:t?.chatId,messageId:t?.sourceMessageId,swipeId:t?.sourceSwipeId||t?.effectiveSwipeId,isolationKey:e},Array.isArray(r)?r:[]),om().info("slot \u5DF2\u955C\u50CF\u5230 SQL",{chatId:t?.chatId,messageId:t?.sourceMessageId,tableCount:r?.length||0})}catch(s){om().warn("SQL \u955C\u50CF\u5931\u8D25\uFF08\u4E0D\u5F71\u54CD\u4E3B\u6D41\u7A0B\uFF09",{error:s?.message||String(s)})}}function am(t){return t==null?"":String(t).trim()}function NS(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window}function _d(){try{let t=NS(),e=t?.SillyTavern||null,r=e?.getContext?.()||null,s=Array.isArray(r?.chat)?r.chat:[],n=Array.isArray(e?.chat)?e.chat:[],o=s.length?s:n;return{topWindow:t,api:e,context:r,chat:o,contextChat:s,apiChat:n}}catch{return{topWindow:null,api:null,context:null,chat:[],contextChat:[],apiChat:[]}}}function $S(t){if(!t||t?.is_user===!0||t?.is_system===!0)return!1;let e=String(t?.role||"").trim().toLowerCase();return e==="assistant"||e==="ai"||!e}function OS(t=[],e=""){let r=am(e);if(!Array.isArray(t)||!r)return-1;for(let s=t.length-1;s>=0;s-=1){let n=t[s];if(!$S(n))continue;if([n?.sourceId,n?.message_id,n?.messageId,n?.id,n?.mes_id,n?.mid,n?.mesid,n?.chat_index,n?.index,s].map(a=>am(a)).includes(r))return s}return-1}function Ad(t){let e=_d(),r=OS(e.chat,t?.sourceMessageId);return r<0?{runtime:e,messageIndex:r,message:null}:{runtime:e,messageIndex:r,message:e.chat[r]||null}}function Oi(t,e,r){let s=n=>{!Array.isArray(n)||e<0||e>=n.length||(n[e]={...n[e]||{},...r})};s(t?.contextChat),s(t?.apiChat)}async function Di(t){let e=t?.context||null,r=t?.api||null,s=e?.saveChatDebounced||r?.saveChatDebounced||null,n=e?.saveChat||r?.saveChat||null;typeof s=="function"&&s.call(e||r),typeof n=="function"&&await n.call(e||r)}function Li(t){return!t||typeof t!="object"||Array.isArray(t)?!1:!!(Array.isArray(t.tables)||typeof t.chatId=="string"&&t.chatId.length>0||typeof t.slotBindingKey=="string"&&t.slotBindingKey.length>0)}function Ys(t){return!t||typeof t!="object"||Array.isArray(t)?!1:"lastResolvedTarget"in t||"lastCommittedTarget"in t}function Ni(t,e,r,s){if(!t)return null;let n=t[e];if(!n)return null;let o=Ce(r);return typeof s=="function"&&s(n)?o===Et?n:null:n[o]||null}function Sd(t,e,r,s,n){if(!t)return;let o=Ce(r),a=t[e];if(typeof n=="function"&&n(a)){let i={[Et]:a};i[o]=s,t[e]=i}else a&&typeof a=="object"&&!Array.isArray(a)?t[e]={...a,[o]:s}:t[e]={[o]:s}}function $i(t,e,r,s){if(!t)return!1;let n=Ce(r),o=t[e];if(!o)return!1;if(typeof s=="function"&&s(o))return n===Et?(delete t[e],!0):!1;if(o&&typeof o=="object"&&!Array.isArray(o)){if(o[n]===void 0)return!1;let a={...o};return delete a[n],Object.keys(a).length===0?delete t[e]:t[e]=a,!0}return!1}function im(t,e={}){let{runtime:r,messageIndex:s}=Ad(t);return sm({runtime:r,targetSnapshot:t,currentMessageIndex:s,templateTables:Array.isArray(e.templateTables)?e.templateTables:[],isolationKey:e.isolationKey===void 0?ne.getKey():e.isolationKey})}async function lm(t,e={}){let{runtime:r,messageIndex:s,message:n}=Ad(t);if(!n||s<0)return{success:!1,error:"target_message_not_found"};let o=e.isolationKey===void 0?ne.getKey():e.isolationKey,a=Ni(n,Jr,o,Ys),i={...Ya(a),lastResolvedTarget:Sn(t),updatedAt:Date.now()};return Sd(n,Jr,o,i,Ys),Oi(r,s,n),await Di(r),{success:!0,bindings:i}}async function Bi(t,e,r={}){let s=r.skipFreshValidation===!0?t:await em(t,r),n=r.skipFreshValidation===!0?{valid:!0,reason:"skipped"}:tm(t,s);if(!n.valid)return{success:!1,error:"target_changed_before_commit",validation:n};let o=s||t,{runtime:a,messageIndex:i,message:l}=Ad(o);if(!l||i<0)return{success:!1,error:"target_message_not_found",validation:n};let c=r.isolationKey===void 0?ne.getKey():r.isolationKey,d=Ro(o),u={...d.meta||{},...e.meta||{},...r.locks?{locks:r.locks}:{},...r.previousSnapshot?{previousSnapshot:r.previousSnapshot}:{},isolationKey:c},y=Ir({...d,...e,meta:u,slotBindingKey:o.slotBindingKey,slotRevisionKey:o.slotRevisionKey,sourceMessageId:o.sourceMessageId,sourceSwipeId:o.sourceSwipeId||o.effectiveSwipeId,updatedAt:Date.now()}),p=Ni(l,Jr,c,Ys),g={...Ya(p),lastResolvedTarget:Sn(o),lastCommittedTarget:Sn(o),updatedAt:Date.now()};return Sd(l,Ds,c,y,Li),Sd(l,Jr,c,g,Ys),Oi(a,i,l),await Di(a),PS(o,c,y?.tables||[]).catch(()=>{}),{success:!0,state:y,bindings:g,validation:n,messageIndex:i,sourceMessageId:o.sourceMessageId,slotRevisionKey:o.slotRevisionKey}}function Vs(t=null,e={}){let r=Kt.getAssistantMessageSnapshot(t);if(!r?.message)return null;let s=e.isolationKey===void 0?ne.getKey():e.isolationKey;return{...r,tableState:Ir(Ni(r.message,Ds,s,Li)),tableBindings:Ya(Ni(r.message,Jr,s,Ys))}}async function cm(t,e={}){let r=_d();if(!Array.isArray(r.chat)||t<0||t>=r.chat.length)return{success:!1,error:"invalid_message_index",messageIndex:t};let s=r.chat[t];if(!s)return{success:!1,error:"message_not_found",messageIndex:t};let n=e.isolationKey===void 0?ne.getKey():e.isolationKey,o=$i(s,Ds,n,Li),a=e.clearBindings===!1?!1:$i(s,Jr,n,Ys);return(o||a)&&(Oi(r,t,s),await Di(r)),{success:!0,cleared:o||a,messageIndex:t,isolationKey:n}}async function dm(t={}){let e=_d(),r=Number.isFinite(t.fromMessageIndex)?t.fromMessageIndex:0,s=Number.isFinite(t.toMessageIndex)?t.toMessageIndex:(e.chat?.length||0)-1,n=t.isolationKey===void 0?ne.getKey():t.isolationKey,o=0;for(let a=r;a<=s;a++){let i=e.chat[a];if(!i)continue;let l=$i(i,Ds,n,Li),c=$i(i,Jr,n,Ys);(l||c)&&(Oi(e,a,i),o++)}return o>0&&await Di(e),{success:!0,touched:o,from:r,to:s,isolationKey:n}}var Td,Qo=N(()=>{Ws();Le();kr();nm();Pi();li();H()});function pm(t){let e=new Set;if(!Array.isArray(t))return e;for(let r of t){let s=r?.order;Number.isFinite(s)&&e.add(Math.floor(s))}return e}function Ed(t,e=5e4,r=1,s=99999){for(let n=e;n<=s;n++)if(!t.has(n))return t.add(n),n;for(let n=r;n<e;n++)if(!t.has(n))return t.add(n),n;return um.warn("\u65E0\u53EF\u7528 order \u69FD\u4F4D"),t.add(e),e}function ym(t,e,r=5e4,s=1,n=99999){let o=n-e+1;for(let a=r;a<=o;a++){let i=!0;for(let l=0;l<e;l++)if(t.has(a+l)){i=!1;break}if(i){for(let l=0;l<e;l++)t.add(a+l);return a}}for(let a=s;a<r&&a<=o;a++){let i=!0;for(let l=0;l<e;l++)if(t.has(a+l)){i=!1;break}if(i){for(let l=0;l<e;l++)t.add(a+l);return a}}um.warn(`\u65E0\u6CD5\u5206\u914D ${e} \u4E2A\u8FDE\u7EED order \u69FD\u4F4D`);for(let a=0;a<e;a++)t.add(r+a);return r}var um,fm=N(()=>{H();um=C.createScope("TableWBOrder")});function Cd(t,e="before_character_definition"){let r=String(t||"").trim().toLowerCase();return r==="at_depth_as_system"||r==="system"?"at_depth_as_system":r==="before_char"||r==="before_character"||r==="before_character_definition"||r==="0"?"before_character_definition":r==="after_char"||r==="after_character"||r==="after_character_definition"||r==="1"?"after_character_definition":e}function Zo(t,e){if(!e)return t;let r={...t,position:e.position};return e.position==="at_depth_as_system"?r.depth=e.depth:delete r.depth,r}var jk,Fk,gm=N(()=>{jk=Object.freeze(["at_depth_as_system","before_character_definition","after_character_definition"]);Fk=Object.freeze({position:"before_character_definition",depth:2,order:5e4})});function Id(t,e=""){return t==null?e:String(t).trim()||e}function BS(t){return Id(t,"default_chat").replace(/[\[\]=]/g,"_")}function zS(){let t=globalThis.window||globalThis;return Id(t?.TavernHelper?.getCurrentChatId?.()||t?.Silvy?.getCurrentChatId?.()||t?.chat_metadata?.chat_id||t?.this_chid||t?.name1,"default_chat")}function KS(){try{if(typeof TavernHelper<"u"&&TavernHelper)return TavernHelper}catch{}return Wr()?.TavernHelper||null}function US(t){return String(t??"").replace(/\|/g,"\uFF5C").replace(/\n/g," ")}function mm(t){let e=Array.isArray(t.columns)?t.columns:[],r=Array.isArray(t.rows)?t.rows:[];if(r.length===0)return"";let s=e.map(l=>l.key),n=e.map(l=>l.title||l.key),o=`| ${n.join(" | ")} |`,a=`| ${n.map(()=>"---").join(" | ")} |`,i=r.map(l=>{let c=l.cells||{};return`| ${s.map(d=>US(c[d])).join(" | ")} |`});return`# ${t.name||"\u672A\u547D\u540D\u8868"}

${o}
${a}
${i.join(`
`)}`}function jS(t,e){if(!Array.isArray(t)||t.length===0)return[];let r=new Map;if(Array.isArray(e))for(let s of e){let n=s?.id||s?.key;n&&r.set(n,s)}return t.map(s=>{let n=s?.id?r.get(s.id):null;return{...s,exportConfig:s?.exportConfig||n?.exportConfig||{enabled:!1},enabled:s?.enabled!==!1}})}function zi(t){return`${bm}${DS}${BS(t)}${LS}-`}function FS(t){return`${bm}[${Id(t,"default_chat")}]-`}function xm(t,e){if(!t||typeof t!="string")return!1;let r=zi(e);if(t.startsWith(r))return!0;let s=FS(e);return!!t.startsWith(s)}function WS(t,e){let r=zi(t),s=String(e||"").trim();return s?`${r}${s}`:`${r}\u586B\u8868\u6570\u636E`}function hm(t,e,r){return`${zi(t)}Wrapper-${r}`}function HS(t,e){return t?t.content!==e.content||t.enabled!==e.enabled||t.type!==e.type||t.position!==e.position||t.prevent_recursion!==e.prevent_recursion||t.order!==e.order:!0}async function ea(t,e,r,s,n,o,a){let i=r.find(l=>l.comment===s);return i&&a&&!xm(i.comment,a)?(Gn.warn(`upsert \u8DF3\u8FC7\uFF1A\u73B0\u6709\u6761\u76EE comment "${s}" \u4E0D\u5C5E\u4E8E\u5F53\u524D chat`,{chatId:a}),{action:"skipped",comment:s,reason:"cross_chat_collision"}):i&&i.uid?HS(i,n)?(await Promise.resolve(t.setLorebookEntries(e,[{uid:i.uid,...n}])),Gn.info(`\u4E16\u754C\u4E66\u6761\u76EE\u5DF2\u66F4\u65B0\uFF1A${s}`),{action:"updated",comment:s}):(o.add(i.order||0),{action:"skipped",comment:s}):typeof t.createLorebookEntries=="function"?(await Promise.resolve(t.createLorebookEntries(e,[{comment:s,keys:[],...n}])),Gn.info(`\u4E16\u754C\u4E66\u6761\u76EE\u5DF2\u521B\u5EFA\uFF1A${s}`),{action:"created",comment:s}):{action:"failed",comment:s,error:"createLorebookEntries \u4E0D\u53EF\u7528"}}async function wm(t,e){let r=e?.worldbookSync;if(!r?.enabled)return{skipped:!0,reason:"disabled"};let s=String(r.targetBook||"").trim();if(!s)return{skipped:!0,reason:"no_target_book"};let n=KS();if(!n)return{success:!1,error:"TavernHelper \u4E0D\u53EF\u7528"};if(typeof n.getLorebookEntries!="function")return{success:!1,error:"getLorebookEntries \u4E0D\u53EF\u7528"};if(typeof n.setLorebookEntries!="function"&&typeof n.createLorebookEntries!="function")return{success:!1,error:"\u4E16\u754C\u4E66\u5199\u5165 API \u4E0D\u53EF\u7528"};let o=zS(),a=zi(o),i=Array.isArray(e?.tables)?e.tables:[],c=jS(t,i).filter(y=>y&&y.enabled!==!1&&Array.isArray(y.rows)&&y.rows.length>0);if(c.length===0)return{skipped:!0,reason:"empty_tables"};let d=e?.wrapperConfig||{},u=d.enabled!==!1;try{let y=await Promise.resolve(n.getLorebookEntries(s));Array.isArray(y)||(y=[]);let p=pm(y),g=[],m=c.filter(w=>w.exportConfig?.enabled===!0),h=c.filter(w=>w.exportConfig?.enabled!==!0),x="";if(h.length>0&&(x=h.map(w=>mm(w)).join(`

`)),u&&(x||m.length>0)){let w=d.wrapperTag||"\u6700\u65B0\u6570\u636E\u4E0E\u8BB0\u5F55",P=d.wrapperHint||"",$=d.wrapperPlacement||{},B=$.order||5e4,R=ym(p,3,B,1,99999),_=Cd($.position,"before_character_definition"),k=Number.isFinite($.depth)?$.depth:2,K=`<${w}>
${P}`;g.push(await ea(n,s,y,hm(o,w,"Start"),Zo({content:K,enabled:!0,type:"constant",order:R,prevent_recursion:!0},{position:_,depth:k}),p,o)),x&&g.push(await ea(n,s,y,`${a}\u5168\u5C40\u6570\u636E`,Zo({content:x,enabled:!0,type:"constant",order:R+1,prevent_recursion:!0},{position:_,depth:k}),p,o)),g.push(await ea(n,s,y,hm(o,w,"End"),Zo({content:`</${w}>`,enabled:!0,type:"constant",order:R+2,prevent_recursion:!0},{position:_,depth:k}),p,o))}else if(x){let w=Ed(p,5e4,1,99999);g.push(await ea(n,s,y,`${a}\u5168\u5C40\u6570\u636E`,{content:x,enabled:!0,type:"constant",position:"before_character_definition",order:w,prevent_recursion:!0},p,o))}for(let w of m){let P=w.exportConfig||{},$=P.entryName||w.name||"\u672A\u547D\u540D\u8868",B=WS(o,$),R=mm(w);if(!R)continue;let _=P.entryPlacement||{},k=Cd(_.position,"before_character_definition"),K=Ed(p,_.order||5e4,1,99999),Y=P.entryType==="keyword"?"keyword":"constant";g.push(await ea(n,s,y,B,Zo({content:R,enabled:!0,type:Y,order:K,prevent_recursion:P.preventRecursion!==!1},{position:k,depth:_.depth||2}),p,o))}let v=new Set(g.map(w=>w.comment).filter(Boolean)),T=y.filter(w=>!w.comment||!xm(w.comment,o)?!1:!v.has(w.comment));if(T.length>0){let w=T.map(P=>P.uid).filter(Boolean);w.length>0&&typeof n.deleteLorebookEntries=="function"&&(await Promise.resolve(n.deleteLorebookEntries(s,w)),Gn.info(`\u5DF2\u6E05\u7406 ${w.length} \u4E2A\u65E7\u4E16\u754C\u4E66\u6761\u76EE [${o}]`))}let A=g.filter(w=>w.action==="created").length,E=g.filter(w=>w.action==="updated").length;return Gn.info(`\u4E16\u754C\u4E66\u540C\u6B65\u5B8C\u6210 [${o}]\uFF1A${A} \u521B\u5EFA, ${E} \u66F4\u65B0, ${T.length} \u6E05\u7406`),{success:!0,results:g,stats:{created:A,updated:E,cleaned:T.length},targetBook:s,chatId:o}}catch(y){return Gn.warn("\u4E16\u754C\u4E66\u540C\u6B65\u5931\u8D25:",y),{success:!1,error:y?.message||"\u4E16\u754C\u4E66\u540C\u6B65\u5931\u8D25"}}}var Gn,bm,DS,LS,vm=N(()=>{ks();H();fm();gm();Gn=C.createScope("TableWorldbookSync"),bm="YYT-",DS="[YY:chatId=",LS="]"});function Ki(t,e=""){return t==null?e:String(t).trim()||e}function qS(t={}){return{tables:Array.isArray(t?.tables)?oe(t.tables):[]}}function YS(t={},e={}){let r=Ki(e.mirrorTag,"yyt-table-workbench"),s=qS(t);return[`<${r}>`,"[\u586B\u8868\u5DE5\u4F5C\u53F0]","```json",JSON.stringify(s,null,2),"```",`</${r}>`].join(`
`)}async function Tm({targetSnapshot:t,nextTables:e,config:r,loadResult:s=null,diff:n=null,fillMode:o="",skipNotify:a=!1}={}){let i=Yt(r),l=await Bi(t,{tables:Array.isArray(e)?oe(e):[],meta:{lastLoadMode:Ki(s?.loadMode,""),lastFillMode:Ki(o),mergeBaseOnly:!1,updatedBy:Ki(t?.runSource,"MANUAL_TABLE")}});if(!l?.success)return{success:!1,error:l?.error||"table_state_commit_failed",commitResult:l,mirrorResult:null,warning:""};let c=null,d=null,u="";if(i.mirrorToMessage){let y=YS(l.state,{mirrorTag:i.mirrorTag});c=await Kt.injectDetailed(GS,y,{overwrite:!0,extractionSelectors:[i.mirrorTag],sourceMessageId:l.sourceMessageId,sourceSwipeId:t?.sourceSwipeId||t?.effectiveSwipeId,effectiveSwipeId:t?.effectiveSwipeId||t?.sourceSwipeId,slotBindingKey:t?.slotBindingKey,slotRevisionKey:t?.slotRevisionKey,slotTransactionId:t?.slotTransactionId,traceId:t?.traceId,skipNotify:a}),c?.success||(u=c?.error||"\u6B63\u6587\u955C\u50CF\u5199\u56DE\u5931\u8D25")}return i.worldbookSync?.enabled&&(d=await wm(Array.isArray(e)?e:[],i),d&&!d.success&&!d.skipped&&(u=u?`${u}; ${d.error}`:d.error||"\u4E16\u754C\u4E66\u540C\u6B65\u5931\u8D25")),{success:!0,state:l.state,bindings:l.bindings,diff:n,fillMode:o,commitResult:l,mirrorResult:c,worldbookSyncResult:d,warning:u}}var GS,Sm=N(()=>{Ws();Le();Qo();qt();vm();GS="tableWorkbenchMirror"});function VS(t){return typeof t!="string"||!t?t:t.replace(/[“”「」『』＂]/g,'"')}function kd(t,e){for(let r=e;r<t.length;r++)if(!/\s/.test(t[r]))return{char:t[r],index:r};return{char:"",index:-1}}function Em(t){return!!t&&(t==='"'||t==="{"||t==="["||t==="-"||/\d/.test(t)||t==="t"||t==="f"||t==="n")}function JS(t,e,r,s){let n=kd(t,e+1),o=n.char;if(!o)return r!=="key";if(r==="key")return o===":";if(o==="}"||o==="]")return!0;if(o!==",")return!1;let a=kd(t,n.index+1).char;return a?s==="object"?a==='"'||a==="}":s==="array"?a==="]"||Em(a):Em(a)||a==="}"||a==="]":!0}function XS(t){if(typeof t!="string")return{success:!1,result:t,error:"not a string"};let e="",r=!1,s=!1,n=null,o=[],a=()=>o.length?o[o.length-1]:null,i=()=>{let l=a();l&&(l.expecting="commaOrEnd")};for(let l=0;l<t.length;l++){let c=t[l];if(s){e+=c,s=!1;continue}if(r){if(c==="\\"){e+=c,s=!0;continue}if(c==='"'){let d=a();JS(t,l,n,d?.type||null)?(e+=c,r=!1,n==="key"&&d?.type==="object"?d.expecting="colon":i(),n=null):e+='\\"';continue}e+=c;continue}if(c==='"'){e+=c,r=!0;let d=a();n=d&&d.type==="object"&&(d.expecting==="key"||d.expecting==="keyOrEnd")?"key":"value";continue}if(c==="{"){e+=c,o.push({type:"object",expecting:"keyOrEnd"});continue}if(c==="["){e+=c,o.push({type:"array",expecting:"valueOrEnd"});continue}if(c===":"){e+=c;let d=a();d?.type==="object"&&(d.expecting="value");continue}if(c===","){e+=c;let d=a();d?.type==="object"&&(d.expecting="key"),d?.type==="array"&&(d.expecting="value");continue}if(c==="}"||c==="]"){e+=c,o.pop(),i();continue}e+=c}return{success:!0,result:e,error:null}}function QS(t){if(typeof t!="string"||!t)return t;let e="",r=!1,s=!1;for(let n=0;n<t.length;n++){let o=t[n];if(s){e+=o,s=!1;continue}if(o==="\\"){e+=o,r&&(s=!0);continue}if(o==='"'){e+=o,r=!r;continue}if(r){if(o===`
`){e+="\\n";continue}if(o==="\r"){e+="\\r";continue}if(o==="	"){e+="\\t";continue}if(o==="\0"){e+="\\u0000";continue}}e+=o}return e}function ZS(t){if(typeof t!="string"||!t)return t;let e="",r=!1,s=!1;for(let n=0;n<t.length;n++){let o=t[n];if(s){e+=o,s=!1;continue}if(o==="\\"){e+=o,r&&(s=!0);continue}if(o==='"'){e+=o,r=!r;continue}if(!r&&o===","){let a=kd(t,n+1).char;if(a==="}"||a==="]")continue}e+=o}return e}function e0(t){return typeof t!="string"||!t?t:t.replace(/([{,]\s*)(-?\d+)(\s*:)/g,'$1"$2"$3')}function ta(t){if(typeof t!="string")return{success:!1,result:t,layersApplied:[],error:"Input is not a string"};let e=[],r=t,s=VS(r);s!==r&&e.push("normalizeQuotes"),r=s;let n=XS(r);if(!n.success)return{success:!1,result:r,layersApplied:e,error:n.error};n.result!==r&&e.push("escapeUnescapedQuotes"),r=n.result;let o=QS(r);o!==r&&e.push("sanitizeControlChars"),r=o;let a=ZS(r);a!==r&&e.push("removeTrailingCommas"),r=a;let i=e0(r);return i!==r&&e.push("fixNumericKeys"),r=i,{success:!0,result:r,layersApplied:e,error:null}}function t0(t,e=","){if(typeof t!="string"||!t)return[];let r=[],s="",n=!1,o=!1,a=0,i=0,l=0;for(let c=0;c<t.length;c++){let d=t[c];if(o){s+=d,o=!1;continue}if(d==="\\"){s+=d,n&&(o=!0);continue}if(d==='"'){s+=d,n=!n;continue}if(!n){if(d==="{")a++;else if(d==="}")a=Math.max(0,a-1);else if(d==="[")i++;else if(d==="]")i=Math.max(0,i-1);else if(d==="(")l++;else if(d===")")l=Math.max(0,l-1);else if(d===e&&a===0&&i===0&&l===0){s.trim()&&r.push(s.trim()),s="";continue}}s+=d}return s.trim()&&r.push(s.trim()),r}function r0(t,e=":"){if(typeof t!="string"||!t)return-1;let r=!1,s=!1,n=0,o=0,a=0;for(let i=0;i<t.length;i++){let l=t[i];if(s){s=!1;continue}if(l==="\\"){r&&(s=!0);continue}if(l==='"'){r=!r;continue}if(!r){if(l==="{")n++;else if(l==="}")n=Math.max(0,n-1);else if(l==="[")o++;else if(l==="]")o=Math.max(0,o-1);else if(l==="(")a++;else if(l===")")a=Math.max(0,a-1);else if(l===e&&n===0&&o===0&&a===0)return i}}return-1}function Rd(t){if(typeof t!="string")return{success:!0,value:t,error:null};let e=t.trim();if(!e)return{success:!1,value:null,error:"Empty value"};let s=`[${e.startsWith("'")&&e.endsWith("'")?`"${e.slice(1,-1).replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\r/g,"\\r").replace(/\n/g,"\\n").replace(/\t/g,"\\t")}"`:e}]`;try{return{success:!0,value:JSON.parse(s)[0],error:null}}catch(n){let o=ta(s);if(o.success)try{return{success:!0,value:JSON.parse(o.result)[0],error:null}}catch{}return{success:!1,value:null,error:n?.message||"Failed to parse loose value"}}}function s0(t){let e=typeof t=="string"?t.trim():"";if(!e)return null;if(/^-?\d+$/.test(e))return e;let r=Rd(e);return r.success&&(typeof r.value=="string"||typeof r.value=="number")?String(r.value):e.replace(/^["']|["']$/g,"")}function Cm(t){if(typeof t!="string")return{success:!1,result:null,recoveredKeys:[],error:"not a string"};let e=t.trim();if(!e.startsWith("{")||!e.endsWith("}"))return{success:!1,result:null,recoveredKeys:[],error:"not an object literal"};let r=e.slice(1,-1).trim();if(!r)return{success:!0,result:{},recoveredKeys:[],error:null};let s=t0(r,",").filter(Boolean);if(!s.length)return{success:!1,result:null,recoveredKeys:[],error:"no segments"};let n={},o=0;for(let i of s){let l=r0(i,":");if(l!==-1){let d=s0(i.slice(0,l)),u=Rd(i.slice(l+1));if(!d||!u.success)return{success:!1,result:null,recoveredKeys:Object.keys(n),error:`Failed segment: ${i}`};n[d]=u.value;let y=parseInt(d,10);!isNaN(y)&&String(y)===d&&(o=Math.max(o,y+1));continue}let c=Rd(i);if(!c.success)return{success:!1,result:null,recoveredKeys:Object.keys(n),error:`Failed value: ${i}`};for(;Object.prototype.hasOwnProperty.call(n,String(o));)o++;n[String(o)]=c.value,o++}let a=Object.keys(n).sort((i,l)=>parseInt(i,10)-parseInt(l,10));return a.length?{success:!0,result:n,recoveredKeys:a,error:null}:{success:!1,result:null,recoveredKeys:[],error:"no keys recovered"}}function n0(t){if(typeof t!="string")return"";let e=t.trim();return e=e.replace(/'\s*\+\s*'/g,""),e.startsWith("'")&&e.endsWith("'")&&(e=e.slice(1,-1)),e=e.replace(/\\n/g,`
`),e=e.replace(/\\\\"/g,'\\"'),e=e.replace(/：/g,":"),e}function o0(t){let e=n0(t);if(!e)return[];let r=[];_m.lastIndex=0;let s;for(;(s=_m.exec(e))!==null;){let i=s[1];i&&i.trim()&&r.push(i)}if(r.length)return r;let n=i=>/(insertRow|updateRow|deleteRow)\s*\(/.test(i),o=/<!--([\s\S]*?)-->/g,a=[];for(;(s=o.exec(e))!==null;)n(s[1])&&a.push(s[1]);return a}function a0(t){let e=t.split(/\r?\n/),r=[],s="",n=!1;for(let a of e){let i=a.trim();if(!i||(!n&&i.includes("//")&&!i.includes('"//')&&!i.includes("'//")&&(i=i.split("//")[0].trim()),!i))continue;if(/^(insertRow|updateRow|deleteRow)\s*\(/.test(i)&&!n?(s&&r.push(s),s=i):s+=(s?" ":"")+i,s){let c=(s.match(/\{/g)||[]).length,d=(s.match(/\}/g)||[]).length;n=c>d}}s&&r.push(s);let o=[];for(let a of r){let i=/(?:^|;\s*)((?:insertRow|deleteRow|updateRow)\s*\()/g,l=[],c;for(;(c=i.exec(a))!==null;)l.push(c.index+(c[0].length-c[1].length));if(l.length<=1)o.push(a.replace(/;\s*$/,""));else for(let d=0;d<l.length;d++){let u=l[d],y=d+1<l.length?l[d+1]:a.length,p=a.substring(u,y).replace(/;\s*$/,"").trim();p&&o.push(p)}}return o}function i0(t){try{let e=t;if(e.match(/\)\s*;?\s*\/\/.*$/)&&(e=e.replace(/\/\/.*$/,"").trim()),!e)return null;let r=e.match(/^(insertRow|deleteRow|updateRow)\s*\((.*)\);?$/);if(!r)return null;let s=r[1],n=r[2],o=n.indexOf("{");if(o===-1)return{command:s,args:JSON.parse(`[${n}]`),line:e};let a=n.substring(0,o).trim(),i=n.substring(o),l=JSON.parse(`[${a.replace(/,$/,"")}]`);try{return{command:s,args:[...l,JSON.parse(i)],line:e}}catch{}let c=Cm(i);if(c.success)return{command:s,args:[...l,c.result],line:e};let d=ta(i);if(!d.success)return null;try{return{command:s,args:[...l,JSON.parse(d.result)],line:e}}catch{}let u=Cm(d.result);return u.success?{command:s,args:[...l,u.result],line:e}:null}catch{return null}}function l0(t){if(!t)return null;let{command:e,args:r}=t;if(e==="insertRow"){let s=typeof r[0]=="number"?r[0]:0,n=typeof r[1]=="object"&&r[1]!==null?r[1]:{};return{op:e,tableIndex:s,data:n}}if(e==="deleteRow"){let s=typeof r[0]=="number"?r[0]:0,n=typeof r[1]=="number"?r[1]:0;return{op:e,tableIndex:s,rowIndex:n}}if(e==="updateRow"){let s=typeof r[0]=="number"?r[0]:0,n=typeof r[1]=="number"?r[1]:0,o=typeof r[2]=="object"&&r[2]!==null?r[2]:{};return{op:e,tableIndex:s,rowIndex:n,data:o}}return null}function Md(t){let e=o0(t);if(!e.length)return null;let r=[],s=[];for(let n of e){let o=n.replace(/<!--|-->/g,"").trim();if(!o)continue;let a=a0(o);for(let i of a){let l=i0(i),c=l0(l);c?r.push(c):i&&/^(insertRow|updateRow|deleteRow)/.test(i)&&s.push(i.slice(0,200))}}if(s.length>0)try{console.warn("[TableJsonSanitizer] parseIncrementalEdits: %d \u6761\u6307\u4EE4\u89E3\u6790\u5931\u8D25",s.length,s)}catch{}return r.length?r:null}function Pd(t){Am.lastIndex=0;let e;for(;(e=Am.exec(t))!==null;){let g=e[1].trim();if(g)try{return JSON.parse(g)}catch{let h=ta(g);if(h.success)try{return JSON.parse(h.result)}catch{}}}let r=t.trim();try{return JSON.parse(r)}catch{}let s=ta(r);if(s.success)try{return JSON.parse(s.result)}catch{}let n=r.indexOf("{"),o=r.indexOf("["),a=-1,i="",l="";if(n!==-1&&(o===-1||n<o)?(a=n,i="{",l="}"):o!==-1&&(a=o,i="[",l="]"),a===-1)return null;let c=0,d=-1,u=!1,y=!1;for(let g=a;g<r.length;g++){let m=r[g];if(y){y=!1;continue}if(m==="\\"&&u){y=!0;continue}if(m==='"'){u=!u;continue}if(!u){if(m===i)c++;else if(m===l&&(c--,c===0)){d=g;break}}}if(d===-1)return null;let p=r.substring(a,d+1);try{return JSON.parse(p)}catch{let m=ta(p);if(m.success)try{return JSON.parse(m.result)}catch{}}return null}function Im(t){if(!t||typeof t!="string")return{mode:"empty",edits:null,tables:null};let e=Md(t);if(e)return{mode:"incremental",edits:e,tables:null};let r=Pd(t);if(r){let s=null;if(Array.isArray(r))s=r;else if(r&&Array.isArray(r.tables))s=r.tables;else if(r&&typeof r=="object"){for(let n of Object.values(r))if(Array.isArray(n)){s=n;break}}if(Array.isArray(s))return{mode:"full",edits:null,tables:s}}return{mode:"empty",edits:null,tables:null}}var _m,Am,Ui=N(()=>{_m=/<tableEdit>([\s\S]*?)<\/tableEdit>/gi,Am=/```(?:json)?\s*([\s\S]*?)```/gi});var c0,d0,km,Rm=N(()=>{Ui();c0=/<tableEdit>[\s\S]*?<\/tableEdit>/i,d0=/(insertRow|updateRow|deleteRow)\s*\(/,km=Object.freeze({formatId:"dsl",displayName:"<tableEdit> DSL \u589E\u91CF\u534F\u8BAE",detect(t){return!t||typeof t!="string"?!1:c0.test(t)||d0.test(t)},parse(t){let e=Md(t);return!Array.isArray(e)||e.length===0?null:{mode:"incremental",edits:e,tables:null}}})});function Pm(t){if(typeof t!="string")return t;let e=t.trim();return e.startsWith("'")&&e.endsWith("'")||e.startsWith('"')&&e.endsWith('"')?e.slice(1,-1).replace(/''/g,"'").replace(/\\'/g,"'"):e}function Nd(t){let e=String(t||"").match(/(\d+)$/);return e?parseInt(e[1],10):0}function Nm(t){let e=String(t||"").match(/row_id\s*=\s*(\d+)/i);return e?parseInt(e[1],10):-1}function u0(t){let e=t.match(/INSERT\s+INTO\s+(\S+)\s*\(([^)]*)\)\s*VALUES\s*\(([^)]*)\)/i);if(!e)return null;let r=e[1],s=e[2],n=e[3],o=s.split(",").map(l=>l.trim()),a=n.split(",").map(l=>Pm(l.trim())),i={};return o.forEach((l,c)=>{l!=="row_id"&&a[c]!==void 0&&(i[l]=a[c])}),{op:"insertRow",tableIndex:Nd(r),data:i}}function p0(t){let e=t.match(/UPDATE\s+(\S+)\s+SET\s+([\s\S]+?)\s+WHERE\s+([\s\S]+?);?$/i);if(!e)return null;let r=e[1],s=e[2],n=e[3],o={},a=s.split(/,(?![^()]*\))/);for(let i of a){let l=i.indexOf("=");if(l<0)continue;let c=i.slice(0,l).trim(),d=Pm(i.slice(l+1).trim());c&&c!=="row_id"&&(o[c]=d)}return{op:"updateRow",tableIndex:Nd(r),rowIndex:Nm(n),data:o}}function y0(t){let e=t.match(/DELETE\s+FROM\s+(\S+)\s+WHERE\s+([\s\S]+?);?$/i);return e?{op:"deleteRow",tableIndex:Nd(e[1]),rowIndex:Nm(e[2])}:null}function f0(t){let e=[];Mm.lastIndex=0;let r;for(;(r=Mm.exec(t))!==null;){let s=r[0].trim(),n=null;/^INSERT/i.test(s)?n=u0(s):/^UPDATE/i.test(s)?n=p0(s):/^DELETE/i.test(s)&&(n=y0(s)),n&&e.push(n)}return e}var ra,Mm,$m,Om=N(()=>{ra=/<sql>([\s\S]*?)<\/sql>/gi,Mm=/(INSERT\s+INTO\s+\S+[\s\S]*?;)|(UPDATE\s+\S+\s+SET[\s\S]*?;)|(DELETE\s+FROM\s+\S+[\s\S]*?;)/gi;$m=Object.freeze({formatId:"sql",displayName:"SQL \u534F\u8BAE\uFF08INSERT/UPDATE/DELETE\uFF09",detect(t){return!t||typeof t!="string"?!1:ra.test(t)?(ra.lastIndex=0,!0):(ra.lastIndex=0,/\b(INSERT\s+INTO|UPDATE\s+\S+\s+SET|DELETE\s+FROM)\b/i.test(t))},parse(t){let e="";ra.lastIndex=0;let r,s=[];for(;(r=ra.exec(t))!==null;)s.push(r[1]);s.length>0?e=s.join(`
`):e=t;let n=f0(e);return!Array.isArray(n)||n.length===0?null:{mode:"incremental",edits:n,tables:null}}})});var Dm,Lm=N(()=>{Ui();Dm=Object.freeze({formatId:"full-json",displayName:"JSON envelope \u5168\u91CF\u534F\u8BAE",detect(t){return!t||typeof t!="string"?!1:/```json/i.test(t)||/\{[\s\S]*?"tables"\s*:/i.test(t)},parse(t){let e=Pd(t);if(!e)return null;let r=null;if(Array.isArray(e))r=e;else if(e&&Array.isArray(e.tables))r=e.tables;else if(e&&typeof e=="object"){for(let s of Object.values(e))if(Array.isArray(s)){r=s;break}}return!Array.isArray(r)||r.length===0?null:{mode:"full",edits:null,tables:r}}})});function ji(){return $d||($d=C.createScope("AiProtocolAdapter")),$d}function Bm(t){if(!t||typeof t!="string")return null;for(let e of g0){let r=!1;try{r=e.detect(t)}catch(s){ji().warn(`adapter ${e.formatId} detect \u629B\u9519`,s);continue}if(r)try{let s=e.parse(t);if(s&&(s.mode==="incremental"||s.mode==="full")&&(s.mode==="incremental"&&Array.isArray(s.edits)&&s.edits.length>0||s.mode==="full"&&Array.isArray(s.tables)&&s.tables.length>0))return ji().info("AI \u534F\u8BAE\u9002\u914D\u5668\u547D\u4E2D",{formatId:e.formatId,mode:s.mode,editsCount:s.edits?.length,tablesCount:s.tables?.length}),{...s,rawFormat:e.formatId}}catch(s){ji().warn(`adapter ${e.formatId} parse \u629B\u9519\uFF0C\u5C1D\u8BD5\u4E0B\u4E00\u4E2A`,s)}}return ji().warn("parseAiResponseAuto: \u65E0\u9002\u914D\u5668\u547D\u4E2D",{responseLength:t.length}),null}var $d,g0,zm=N(()=>{H();Rm();Om();Lm();g0=Object.freeze([km,$m,Dm])});function m0(t,e){let r=new Map;Array.isArray(t)&&t.forEach((o,a)=>{o&&typeof o=="object"&&r.set(o.name||`__row_${a}`,o)});let s=new Map;Array.isArray(e)&&e.forEach((o,a)=>{o&&typeof o=="object"&&s.set(o.name||`__row_${a}`,o)});let n={};for(let[o,a]of s){let i=r.get(o);if(i){n[o]={};let l=new Set([...Object.keys(i.cells||{}),...Object.keys(a.cells||{})]);for(let c of l){let d=String((i.cells&&i.cells[c])??""),u=String((a.cells&&a.cells[c])??"");n[o][c]=d===u?"unchanged":"updated"}n[o].__rowStatus="kept"}else{if(n[o]={},a.cells&&typeof a.cells=="object")for(let l of Object.keys(a.cells))n[o][l]="new";n[o].__rowStatus="new"}}for(let[o]of r)s.has(o)||(n[o]={__rowStatus:"deleted"});return n}function Km(t,e){let r=Array.isArray(t)?oe(t):[],s=Array.isArray(e)?oe(e):[],n={},o=Math.max(r.length,s.length);for(let a=0;a<o;a++){let i=r[a],l=s[a];!i&&l?(n[a]={},Array.isArray(l.rows)&&l.rows.forEach(c=>{let d=c.name||`__row_${l.rows.indexOf(c)}`;n[a][d]={__rowStatus:"new"}})):i&&!l?(n[a]={},Array.isArray(i.rows)&&i.rows.forEach(c=>{let d=c.name||`__row_${i.rows.indexOf(c)}`;n[a][d]={__rowStatus:"deleted"}})):i&&l&&(n[a]=m0(i.rows,l.rows))}return n}var Um=N(()=>{Le()});function h0(){return{mode:"native",async buildRequest(t={},e={}){if(typeof t.buildRequest!="function")throw new Error("table_provider_missing_build_request");return t.buildRequest(e)},async sendRequest(t={},e=null,r={}){if(typeof t.sendRequest!="function")throw new Error("table_provider_missing_send_request");return t.sendRequest(e?.messages||[],r.config||{},r.abortSignal||null)},parseResponse(t={},e=""){if(typeof t.parseResponse!="function")throw new Error("table_provider_missing_parse_response");return t.parseResponse(e)}}}function jm(){return h0()}var Fm=N(()=>{});function x0(){return Od||(Od=C.createScope("TableLock")),Od}function Js(t){return t!==null&&typeof t=="object"&&!Array.isArray(t)}function Gm(){let t=Hm.get(Wm,{});return Js(t)?t:{}}function w0(t){Hm.set(Wm,t)}function sa(t){let e=Gm();return Js(e[t])?e[t]:{}}function Dd(t,e){let r=Gm();r[t]=e,w0(r),v0(t,e).catch(()=>{})}async function v0(t,e){try{let{chatKey:r,isolationKey:s}=(()=>{let o=String(t||"").indexOf("::");return o===-1?{chatKey:String(t||""),isolationKey:""}:{chatKey:t.slice(0,o),isolationKey:t.slice(o+2)}})();if(!r)return;let n=await Promise.resolve().then(()=>(li(),Hc));await n.ensureTableDataReady(),await n.clearScopeLocks({chatId:r,isolationKey:s});for(let[o,a]of Object.entries(e||{})){if(!Js(a))continue;let i={chatId:r,isolationKey:s};if(Array.isArray(a.rows))for(let l of a.rows)Number.isFinite(l)&&await n.setLockEntry(i,o,"row",String(l));if(Array.isArray(a.cols))for(let l of a.cols)typeof l=="string"&&l&&await n.setLockEntry(i,o,"column",l);if(Array.isArray(a.cells))for(let l of a.cells)typeof l=="string"&&l.includes(":")&&await n.setLockEntry(i,o,"cell",l);a.indexColumn===!0&&await n.setLockEntry(i,o,"index_column","")}}catch(r){x0().warn("lock-service SQL \u955C\u50CF\u5931\u8D25\uFF08\u4E0D\u5F71\u54CD\u4E3B\u6D41\u7A0B\uFF09",{error:r?.message||String(r)})}}function na(t){let e=Yy();return Js(t)&&(Array.isArray(t.rows)&&(e.rows=Array.from(new Set(t.rows.filter(r=>Number.isFinite(r)).map(r=>Math.floor(r)))),e.rows.sort((r,s)=>r-s)),Array.isArray(t.cols)&&(e.cols=Array.from(new Set(t.cols.filter(r=>typeof r=="string"&&r.length>0)))),Array.isArray(t.cells)&&(e.cells=Array.from(new Set(t.cells.filter(r=>typeof r=="string"&&r.includes(":"))))),e.indexColumn=t.indexColumn===!0),e}function oa(t){if(typeof t=="string")return t;if(Js(t)){if(typeof t.scopeKey=="string"&&t.scopeKey.includes("::"))return t.scopeKey;if(t.chatId!==void 0){let e=t.isolationKey!==void 0?t.isolationKey:ne.getKey();return Mo(t.chatId,e)}}return Mo("",ne.getKey())}function T0(t,e){let r=sa(t),s={};if(!Array.isArray(e))return s;for(let n=0;n<e.length;n++){let o=e[n];if(!o)continue;let a=o.uid||o.id||"";a&&r[a]&&(s[n]=na(r[a]))}return s}function qn(t,e){let r=oa(t),s=sa(r);return na(s[e])}function Fi(t,e,r,s=!0){if(!e||!Number.isFinite(r))return!1;let n=oa(t),o=sa(n),a=na(o[e]),i=Math.floor(r),l=a.rows.includes(i);if(s&&!l)a.rows.push(i),a.rows.sort((c,d)=>c-d);else if(!s&&l)a.rows=a.rows.filter(c=>c!==i);else return!1;return o[e]=a,Dd(n,o),!0}function Wi(t,e,r,s=!0){if(!e||!r)return!1;let n=oa(t),o=sa(n),a=na(o[e]),i=a.cols.includes(r);if(s&&!i)a.cols.push(r);else if(!s&&i)a.cols=a.cols.filter(l=>l!==r);else return!1;return o[e]=a,Dd(n,o),!0}function Hi(t,e,r,s,n=!0){if(!e||!s||!Number.isFinite(r))return!1;let o=oa(t),a=sa(o),i=na(a[e]),l=Vy(r,-1)==="-1:-1"?`${r}:${s}`:`${r}:${s}`,c=`${Math.floor(r)}:${s}`,d=i.cells.includes(c);if(n&&!d)i.cells.push(c);else if(!n&&d)i.cells=i.cells.filter(u=>u!==c);else return!1;return a[e]=i,Dd(o,a),!0}function qm(t,e=[]){let r=oa(t);return T0(r,e)}function Ym(t,e,r,s){if(!Js(t))return!1;let n=t[e];if(!n)return!1;if(Number.isFinite(r)&&n.rows.includes(r)||typeof s=="string"&&s.length>0&&n.cols.includes(s))return!0;if(Number.isFinite(r)&&typeof s=="string"&&s.length>0){let o=`${r}:${s}`;if(n.cells.includes(o))return!0}return!1}function Ld(t,e,r){if(!Js(t))return!1;let s=t[e];return s?Number.isFinite(r)&&s.rows.includes(r):!1}var b0,Wm,Od,Hm,Gi=N(()=>{He();H();Le();kr();b0="tableLocks",Wm="scopes";Hm=z.namespace(b0)});function S0(){return Bd||(Bd=C.createScope("TableAutoSchedule")),Bd}function Jm(t,e,r){let s=Ce(e||Et);return`${String(t||"")}::${s}::${String(r||"")}`}function _0(t,e,r){if(!r)return null;let s=Vm.get(Jm(t,e,r),null);return s&&typeof s=="object"?s:null}function A0(t,e,r,s){if(!r)return;let n=Number.isFinite(s)?s:-1;Vm.set(Jm(t,e,r),{lastMessageIndex:n,lastUpdatedAt:new Date().toISOString()})}function Xm(t,e,r=[],s){for(let n of r)A0(t,e,n,s)}function Qm({chatId:t,isolationKey:e,currentMessageIndex:r,scopeTables:s=[]}){let n=new Set,o={};for(let a of s){let i=a?.id||a?.uid||"";if(!i)continue;if(a?.enabled===!1){o[i]="disabled";continue}let l=a?.updateConfig?.updateFrequency;if(!Number.isFinite(l)||l===-1){n.add(i);continue}if(l===0){o[i]="frequency_zero";continue}if(l>=1){let c=_0(t,e,i);if(!c||!Number.isFinite(c.lastMessageIndex)){n.add(i);continue}let d=r-c.lastMessageIndex;d>=l?n.add(i):o[i]=`frequency_not_met (${d}/${l})`}else n.add(i)}return S0().info("buildAutoSchedulePlan",{chatId:t,isolationKey:e,currentMessageIndex:r,shouldUpdateCount:n.size,skipReasonsCount:Object.keys(o).length,shouldUpdateTables:[...n],skipReasons:o}),{shouldUpdate:n,skipReasons:o}}var Vm,Bd,Zm=N(()=>{He();H();Le();Vm=z.namespace("tableAutoSchedule")});function E0(t){let e=Bm(t);return e&&(e.mode==="incremental"||e.mode==="full")?e:Im(t)}function xe(){return C.createScope("TableUpdate")}function I0(t,e){return new Promise(r=>{if(e?.aborted){r(!1);return}let s,n=()=>{clearTimeout(s);try{e?.removeEventListener?.("abort",n)}catch{}r(!1)};s=setTimeout(()=>{try{e?.removeEventListener?.("abort",n)}catch{}r(!0)},t);try{e?.addEventListener?.("abort",n)}catch{}})}function J(t,e=""){return t==null?e:String(t).trim()||e}function eh(t=[],e=8,r="all"){if(!Array.isArray(t)||t.length===0)return"";let s=r==="assistant_only"?t.filter(n=>n?.role==="assistant"):t;return s.slice(Math.max(s.length-e,0)).map(n=>`[${J(n?.role,"unknown")}] ${String(n?.content||"").trim()}`).filter(Boolean).join(`

`)}function th(t,{extractTags:e=[],useGlobalRules:r=!1,regexPresetId:s=""}={}){if(!t)return t;let n=Array.isArray(e)&&e.length>0,o=typeof s=="string"&&s.trim().length>0;if(!n&&!r&&!o)return t;try{let a=[],i=[];if(o)try{let l=Ee.getPreset(s);if(l){let c=Array.isArray(l.rules)?l.rules.filter(d=>d&&d.enabled!==!1&&d.value):[];a.push(...c),Array.isArray(l.blacklist)&&i.push(...l.blacklist.map(d=>String(d||"").trim()).filter(Boolean))}else xe().warn("applyContextExtractionRules: \u627E\u4E0D\u5230\u6B63\u5219\u9884\u8BBE",{regexPresetId:s})}catch(l){xe().warn("applyContextExtractionRules: \u52A0\u8F7D\u6B63\u5219\u9884\u8BBE\u5931\u8D25",l)}if(n&&a.push(...e.map(l=>{let c=String(l||"").trim();return c.startsWith("regex:")?{type:"regex_include",value:c.slice(6).trim(),enabled:!0}:{type:"include",value:c,enabled:!0}}).filter(l=>l.value)),r){let l=un()||[];a=[...a,...l.filter(c=>c?.enabled)],i=[...i,...pn()||[]]}return a.length===0&&i.length===0?t:Ar(t,a,i)||t}catch(a){return xe().warn("applyContextExtractionRules \u5931\u8D25\uFF0C\u56DE\u9000\u539F\u59CB\u6587\u672C",a),t}}function k0(t=[],e=-1){return!Number.isFinite(e)||e<0?t:t.map(r=>{let s=Array.isArray(r?.rows)?r.rows:[];return e===0||s.length<=e?r:{...r,rows:s.slice(s.length-e)}})}function R0(t=[]){return!Array.isArray(t)||t.length===0?"":t.map((e,r)=>{let s=e?.aiInstructions&&typeof e.aiInstructions=="object"?e.aiInstructions:{},n=Array.isArray(e?.columns)?e.columns:[],o=[`\u8868 ${r}: ${J(e?.name,`\u8868${r+1}`)}`,`\u8868\u683C\u8BF4\u660E: ${J(e?.note,"\u65E0")}`,`\u521D\u59CB\u5316\u8BF4\u660E: ${J(s.init,"\u65E0")}`,`\u65B0\u589E\u8BF4\u660E: ${J(s.create,"\u65E0")}`,`\u66F4\u65B0\u8BF4\u660E: ${J(s.update,"\u65E0")}`,`\u5220\u9664\u8BF4\u660E: ${J(s.delete,"\u65E0")}`,"\u5B57\u6BB5\uFF08\u8BF7\u7528\u5217\u7D22\u5F15\u4F5C\u4E3A data key\uFF09:"];return n.forEach((a,i)=>{o.push(`- [${i}]: ${J(a?.title||a?.key,"\u672A\u547D\u540D\u5B57\u6BB5")} \u2014 ${J(a?.description,"\u65E0")}`)}),o.join(`
`)}).join(`

`)}function M0(t,e=[]){if(!t||!Array.isArray(e)||e.length===0)return"";let r=e.map((n,o)=>{let a=J(n?.name,`\u8868${o+1}`),i=t.includes(n,o);return`\u8868 ${o}: ${a} - ${i?"\u5141\u8BB8\u7F16\u8F91":"\u53EA\u8BFB\uFF0C\u7981\u6B62\u4FEE\u6539"}`});return e.some((n,o)=>!t.includes(n,o))&&(r.push(""),r.push('\u3010\u91CD\u8981\u7EA6\u675F\u3011\u6807\u8BB0\u4E3A"\u53EA\u8BFB"\u7684\u8868\u683C\uFF0C\u4F60\u5FC5\u987B\u5728\u8F93\u51FA\u4E2D\u539F\u6837\u4FDD\u7559\u5176\u6240\u6709\u884C\u6570\u636E\uFF0C\u4E0D\u5F97\u65B0\u589E\u3001\u4FEE\u6539\u6216\u5220\u9664\u4EFB\u4F55\u884C\u3002'),r.push("\u5168\u91CF\u8F93\u51FA\u65F6\uFF0C\u53EA\u8BFB\u8868\u683C\u7684 rows \u5FC5\u987B\u4E0E\u8F93\u5165\u4E2D\u7684\u5B8C\u5168\u4E00\u81F4\u3002")),r.join(`
`)}function nh(t={},e=0,r=[]){let s=t&&typeof t=="object"?t:{},n=s.cells&&typeof s.cells=="object"&&!Array.isArray(s.cells)?s.cells:{},o={},a=Array.isArray(r)?r.map(l=>J(l?.key,"")).filter(Boolean):[];return new Set([...Object.keys(n),...a]).forEach(l=>{o[l]=J(n[l],"")}),{...s,id:ko(s.id||s.rowId,e),name:J(s.name,""),cells:o}}function Qs(t={},e=0){let r=t&&typeof t=="object"?t:{},s=Array.isArray(r.columns)?oe(r.columns):[],n=Array.isArray(r.rows)?r.rows.map((o,a)=>nh(o,a,s)):[];return{...r,id:sr(r.id||r.key,e),rows:n}}function Sr(t=[]){return Array.isArray(t)?t.map((e,r)=>Qs(e,r)):[]}function P0(t=[],e=[],r){let s=Sr(t),n=Sr(e);if(!r)return n;let o=new Map(n.map((u,y)=>[sr(u?.id||u?.key,y),u])),a=s.map((u,y)=>({table:u,tableIndex:y,id:sr(u?.id||u?.key,y)})).filter(({table:u,tableIndex:y})=>r.includes(u,y)),i=new Set,l=new Map;for(let u=0;u<n.length;u++){let y=n[u],p=sr(y?.id||y?.key,u);o.has(p)&&(l.set(p,y),i.add(p))}let c=0,d=n.filter((u,y)=>{let p=sr(u?.id||u?.key,y);return!i.has(p)});return s.map((u,y)=>{let p=sr(u?.id||u?.key,y);if(!r.includes(u,y))return Qs(u,y);let g=l.get(p);if(g)return Qs(g,y);let m=d[c];return m?(c++,Qs({...m,id:u.id||m.id},y)):Qs(u,y)})}function N0(t=[],e=[],r,s={}){if(!Array.isArray(t)||!r)return{edits:[],stats:{total:0,passed:0,droppedByScope:0,droppedByLock:0}};let n=Sr(e),o=[],a=0,i=0;for(let l of t){let c=Number.isFinite(l?.tableIndex)?l.tableIndex:-1;if(c<0||c>=n.length){a++;continue}let d=n[c];if(!r.includes(d,c)){a++;continue}if(l.op===_n.INSERT_ROW){o.push(l);continue}let u=Number.isFinite(l?.rowIndex)?l.rowIndex:-1;if(u<0||u>=(Array.isArray(d?.rows)?d.rows.length:0)){a++;continue}if(l.op===_n.DELETE_ROW){if(Ld(s,c,u)){i++;continue}o.push(l);continue}o.push(l)}return{edits:o,stats:{total:t.length,passed:o.length,droppedByScope:a,droppedByLock:i}}}function $0(t=[],e){let r=Sr(t);return e?r.map((s,n)=>{let o=Array.isArray(s?.columns)?s.columns:[];return e.includes(s,n)?{...Qs(s,n),scopeEditable:!0,scopeStatus:"editable"}:{...Qs(s,n),scopeEditable:!1,scopeStatus:"readonly",rows:Array.isArray(s?.rows)?s.rows.map((a,i)=>nh(a,i,o)):[]}}):r}function O0(t,e,r){return{target:{sourceMessageId:J(t?.sourceMessageId),sourceSwipeId:J(t?.sourceSwipeId||t?.effectiveSwipeId),slotBindingKey:J(t?.slotBindingKey),slotRevisionKey:J(t?.slotRevisionKey),slotTransactionId:J(t?.slotTransactionId)},loadMode:J(e?.loadMode),mergeBaseOnly:e?.mergeBaseOnly===!0,resolvedFromMessageId:J(e?.resolvedFromMessageId),resolvedFromRevisionKey:J(e?.resolvedFromRevisionKey),sourceKind:J(e?.sourceKind||e?.state?.meta?.sourceKind),scope:typeof r?.toJSON=="function"?r.toJSON():null,tables:$0(e?.state?.tables,r)}}function rh(){return D0}function sh(t,e){if(!t||typeof t!="string")return{key:t,source:"fallback"};if(!Array.isArray(e)||e.length===0)return{key:t,source:"fallback"};for(let s of e)if(s?.key===t)return{key:t,source:"direct"};if(/^\d+$/.test(t)){let s=parseInt(t,10);if(s>=0&&s<e.length&&e[s]?.key)return{key:e[s].key,source:"index"}}let r=t.match(/^col(?:_(\d+))?$/i);if(r){let s=r[1]?parseInt(r[1],10)-1:0;if(s>=0&&s<e.length&&e[s]?.key)return{key:e[s].key,source:"col_n"}}return{key:t,source:"fallback"}}function L0(t,e,r,s=null){let n=Sr(t||[]),o=r||{},a={direct:0,index:0,col_n:0,fallback:0},i={},l={};if(Array.isArray(e))for(let c of e){let d=Number.isFinite(c?.tableIndex)?c.tableIndex:-1;i[d]=(i[d]||0)+1,l[c?.op||"unknown"]=(l[c?.op||"unknown"]||0)+1}xe().info("applyIncrementalEdits \u603B\u89C8",{totalEdits:e?.length||0,tableCount:n.length,editsByTable:i,editsByOp:l});for(let c of e){let d=c.tableIndex;if(d<0||d>=n.length)continue;let u=n[d];if(!u||!Array.isArray(u.rows)||s&&!s.includes(u,d))continue;if(c.op===_n.INSERT_ROW){let p={id:Bs("row"),name:"",cells:{}};if(c.data&&typeof c.data=="object"){p.name=J(c.data.name,"");let m=Array.isArray(u.columns)?u.columns:[];for(let[h,x]of Object.entries(c.data)){if(h==="name")continue;let{key:v,source:T}=sh(h,m);p.cells[v]=J(x),a[T]=(a[T]||0)+1}}Object.keys(p.cells).length===0&&!p.name&&xe().warn("applyIncrementalEdits: \u63D2\u5165\u7A7A\u884C\uFF08data \u89E3\u6790\u4E3A\u7A7A\uFF09",{tableIndex:d,tableName:u.name,editDataKeys:c.data?Object.keys(c.data):[],editDataPreview:JSON.stringify(c.data||{}).slice(0,200)}),u.rows.push(p);continue}let y=c.rowIndex;if(!(y<0||y>=u.rows.length)){if(c.op===_n.DELETE_ROW){if(Ld(o,d,y))continue;u.rows.splice(y,1);continue}if(c.op===_n.UPDATE_ROW){let p=u.rows[y];if(!p)continue;if(p.id=ko(p.id||p.rowId,y),p.cells=p.cells||{},c.data&&typeof c.data=="object"){let g=Array.isArray(u.columns)?u.columns:[];for(let[m,h]of Object.entries(c.data)){if(m==="name")continue;let{key:x,source:v}=sh(m,g);Ym(o,d,y,x)||(p.cells[x]=J(h),a[v]=(a[v]||0)+1)}c.data.name!==void 0&&(p.name=J(c.data.name,p.name))}}}}return Object.values(a).some(c=>c>0)&&xe().info("\u5217 key \u89E3\u6790\u7EDF\u8BA1",a),Sr(n)}async function B0({executionContext:t,targetSnapshot:e,loadResult:r,config:s,assistantSnapshot:n,fillMode:o,runScope:a}={}){let i=Yt(s),l=o==="incremental"||!o&&i.fillMode!=="full",c=uf(i,{skipResponseContract:l}),d=O0(e,r,a),u=Array.isArray(n?.tableState?.tables)?Sr(n.tableState.tables):[],y=t?.chatHistory||t?.chatMessages||[],{contextDepth:p,contextRoles:g,contextExtractTags:m,contextUseGlobalRules:h,sendLatestRows:x}=i,v=i?.extraction?.regexPresetId||"",T=eh(y,p,g),A=eh(y,p,"all"),E=th(T,{extractTags:m,useGlobalRules:h,regexPresetId:v}),w=th(A,{extractTags:m,useGlobalRules:h,regexPresetId:v}),P=await Na({worldbooks:i.worldbooks}),$=k0(d.tables,x),B={...d,tables:$},R={...t,toolName:"\u586B\u8868\u5DE5\u4F5C\u53F0",toolId:"tableWorkbench",lastAiMessage:t?.assistantBaseText||t?.lastAiMessage||"",recentMessagesText:E,rawRecentMessagesText:w,toolWorldbookContent:P,tableGuidance:R0(i.tables),tableScopeGuidance:M0(a,d.tables),injectedContext:n?.injectedContext||Kt.getLatestMessageInjectedContext(e?.sourceMessageId),toolContentMacro:JSON.stringify(B,null,2),extractedContent:JSON.stringify(B,null,2),previousToolOutput:JSON.stringify(u,null,2)},_=await Hs.buildToolMessages(c,R),k=await Hs.buildPromptText(c,R);if(l&&(k+=rh(),Array.isArray(_)&&_.length>0)){let Y=_[_.length-1];Y&&typeof Y.content=="string"&&(Y.content+=rh())}if(!Array.isArray(_)||_.length===0)throw new Error("\u586B\u8868\u8BF7\u6C42\u6D88\u606F\u6784\u5EFA\u5931\u8D25\u3002");let K=i.apiPreset||"";try{let Y=Array.isArray(d?.tables)?d.tables:[],ue=Y.filter(pe=>pe?.scopeEditable!==!1).map(pe=>J(pe?.updateConfig?.apiPreset,"")).filter(Boolean);ue.length>0&&ue.every(pe=>pe===ue[0])&&(K=ue[0],xe().info("L3: \u8868\u7EA7 API \u9884\u8BBE\u751F\u6548",{preset:K,affectedTables:Y.filter(pe=>pe?.scopeEditable!==!1).map(pe=>pe?.name||pe?.id)}))}catch(Y){xe().warn("L3 \u8868\u7EA7 API \u9884\u8BBE\u89E3\u6790\u5931\u8D25\uFF0C\u7528\u5168\u5C40",Y)}return{toolConfig:c,context:R,requestPayload:d,promptText:k,messages:_,fillMode:l?"incremental":"full",effectiveApiPreset:K,runScope:typeof a?.toJSON=="function"?a.toJSON():null}}async function z0(t,e={},r=null){let s=Yt(e),n=J(e?._effectiveApiPreset||s.apiPreset,"");if(n){if(!uo(n))throw new Error(`API \u9884\u8BBE\u4E0D\u5B58\u5728: ${n}`);return po(n,t,{},r)}return yo(t,{},r)}function Or({status:t=Ie.IDLE,targetSnapshot:e=null,skipReason:r="",startedAt:s=Date.now(),error:n=""}={}){return{lastAutoRunAt:s,lastAutoStatus:J(t,Ie.IDLE),lastAutoMessageId:J(e?.sourceMessageId,""),lastAutoRevisionKey:J(e?.slotRevisionKey,""),lastAutoSkipReason:J(r,""),...n?{lastError:n,lastErrorDetails:[n]}:{}}}function Tr(t={},e=lt.MANUAL){let r=t&&typeof t=="object"?t:{};return Object.keys(r).length?df(r):null}function Xs({targetSnapshot:t=null,startedAt:e=Date.now(),status:r="idle",skipReason:s="",warning:n="",writeback:o=null,aborted:a=!1,stale:i=!1,abortReason:l="",error:c=""}={}){return{isAutoRun:!0,status:r,startedAt:e,targetSnapshot:t,sourceMessageId:J(t?.sourceMessageId,""),sourceSwipeId:J(t?.sourceSwipeId||t?.effectiveSwipeId,""),slotRevisionKey:J(t?.slotRevisionKey,""),writebackStatus:o?.success===!0?"success":n?"warning":"",refreshConfirmed:o?.mirrorResult?.refreshConfirmed===!0,warning:J(n,""),skipReason:J(s,""),aborted:a===!0,stale:i===!0,abortReason:J(l,""),error:J(c,"")}}function Yi(t=null){if(t?.signal?.aborted)return{aborted:!0,stale:!1,reason:"cancelled_before_host_commit"};if(typeof t?.shouldAbortWriteback=="function")try{return t.shouldAbortWriteback()||!1}catch{return{aborted:!0,stale:!0,reason:"stale_base_changed"}}return!1}async function aa(t=null,e={}){return ah({configInput:t,runSource:lt.MANUAL,clearBeforeUpdate:e?.clearBeforeUpdate===!0,executionContextBuilder:()=>Cs({runSource:lt.MANUAL}),targetResolver:r=>Jo(r,{runSource:lt.MANUAL})})}async function oh({messageId:t,swipeId:e="",sourceEvent:r="AUTO_TABLE",configInput:s=null,signal:n=null,shouldAbortWriteback:o=null}={}){return ah({configInput:s,runSource:lt.AUTO,autoMeta:{sourceEvent:r,messageId:J(t,""),swipeId:J(e,""),signal:n,shouldAbortWriteback:o},executionContextBuilder:()=>Is({messageId:t,swipeId:e,runSource:lt.AUTO}),targetResolver:a=>Jo(a,{runSource:lt.AUTO})})}async function ah({configInput:t=null,runSource:e=lt.MANUAL,executionContextBuilder:r,targetResolver:s,autoMeta:n=null,clearBeforeUpdate:o=!1}={}){let a=Yt(t||be()),i=kc(a),l=ei({tables:Array.isArray(a.tables)?a.tables:[]}),c=e===lt.AUTO,d=Date.now();if(xe().info(`\u5F00\u59CB\u586B\u8868 [${e}]`,{isAutoRun:c,fillMode:a.fillMode}),!i.valid||!l.valid){let m=[...i.errors,...l.errors];return xe().error("\u914D\u7F6E\u6821\u9A8C\u5931\u8D25",{errors:m}),Tr({lastStatus:Ie.ERROR,lastRunAt:d,lastDurationMs:0,lastError:m[0]||"\u586B\u8868\u914D\u7F6E\u65E0\u6548\u3002",lastErrorDetails:m,lastValidationSummary:l.summary||{errorCount:m.length,warningCount:0},errorCount:Number(a?.runtime?.errorCount)||0,...c?Or({status:Ie.ERROR,startedAt:d,skipReason:"invalid_config",error:m[0]||"\u586B\u8868\u914D\u7F6E\u65E0\u6548\u3002"}):{}},e),{success:!1,error:m.join(`
`),errors:m,...c?{meta:Xs({startedAt:d,status:Ie.ERROR,skipReason:"invalid_config",error:m[0]||"\u586B\u8868\u914D\u7F6E\u65E0\u6548\u3002"})}:{}}}let u=a.runtime||{},y=Array.isArray(a.tables)?a.tables:[];try{let h=Dn({})?.template?.tables;if(Array.isArray(h)&&h.length>0){let x=a.tableEnabledOverrides&&typeof a.tableEnabledOverrides=="object"?a.tableEnabledOverrides:{};if(y=h.map(T=>{let A=T?.id,E=A&&Object.prototype.hasOwnProperty.call(x,A)?x[A]:void 0,w=E!==void 0?E:T.enabled!==!1;return{...T,enabled:w}}),c){let T=Number.isFinite(targetSnapshot?.targetMessageIndex)?targetSnapshot.targetMessageIndex:-1,A=Qm({chatId:targetSnapshot?.chatId||"",isolationKey:ne.getKey?ne.getKey():"",currentMessageIndex:T,scopeTables:y});y=y.map(E=>{let w=E?.id||E?.uid||"";return w&&!A.shouldUpdate.has(w)?{...E,enabled:!1}:E})}let v=y.filter(T=>T.enabled===!1).map(T=>T?.name||T?.id);v.length>0&&xe().info("scopeTables: \u7528\u6237\u7981\u7528\u4E86\u90E8\u5206\u8868",{disabledCount:v.length,disabledNames:v})}}catch{}let p=Jy(a.scope||a,y);if(xe().info("runScope \u5DF2\u89E3\u6790",{mode:p.mode,requestedMode:p.requestedMode,staleScope:p.staleScope,scopeTablesCount:Array.isArray(y)?y.length:0,allowedTableIds:p.allowedTableIds,allTableIds:p.allTableIds,scopeTablesEnabled:Array.isArray(y)?y.map(m=>({id:m?.id,name:m?.name,enabled:m?.enabled})):[]}),p.staleScope&&xe().warn("runScope: \u68C0\u6D4B\u5230 stale scope\uFF08activeTableId/selectedTableIds \u4E0D\u5728\u5F53\u524D tables \u8303\u56F4\u5185\uFF09\uFF0C\u5DF2\u81EA\u52A8 fallback \u5230 enabled",{requestedMode:p.requestedMode,requestedActiveTableId:p.activeTableId,requestedSelectedTableIds:p.selectedTableIds}),(p.mode==="current"||p.mode==="selected")&&p.allowedTableIds.length===0){let m=p.mode==="current"?"\u672A\u6307\u5B9A\u5F53\u524D\u8868\u683C\uFF0C\u65E0\u6CD5\u6267\u884C\u3002":"\u672A\u9009\u62E9\u4EFB\u4F55\u8868\u683C\uFF0C\u65E0\u6CD5\u6267\u884C\u3002";return xe().warn(m,{mode:p.mode}),Tr({lastStatus:Ie.ERROR,lastRunAt:d,lastDurationMs:0,lastError:m,lastErrorDetails:[m]},e),{success:!1,error:m,errors:[m]}}let g=null;Tr({lastStatus:Ie.RUNNING,lastError:"",lastErrorDetails:[],lastValidationSummary:l.summary||{errorCount:0,warningCount:0},lastScopeMode:J(p.mode,""),...c?Or({status:Ie.RUNNING,startedAt:d,skipReason:""}):{}},e);try{if(typeof r!="function")throw new Error("table_update_missing_execution_context_builder");if(typeof s!="function")throw new Error("table_update_missing_target_resolver");let m=await r();xe().info("\u6267\u884C\u4E0A\u4E0B\u6587\u5DF2\u6784\u5EFA");let h=s(m);if(!h)throw new Error("\u5F53\u524D\u6CA1\u6709\u53EF\u7528\u7684 assistant \u76EE\u6807\u697C\u5C42\u3002");g=h,xe().info("\u76EE\u6807\u6D88\u606F\u5DF2\u89E3\u6790",{sourceMessageId:h.sourceMessageId,slotRevisionKey:h.slotRevisionKey}),c&&Tr(Or({status:Ie.RUNNING,targetSnapshot:h,startedAt:d,skipReason:""}),e);let x=J(a.autoUpdateTrigger,"assistantMessage");if(c&&(!a.autoUpdateEnabled||x!=="assistantMessage")){let V=a.autoUpdateEnabled?"auto_trigger_not_assistant_message":"auto_update_disabled";return Tr(Or({status:Ie.SKIPPED,targetSnapshot:h,startedAt:d,skipReason:V}),e),{success:!1,skipped:!0,reason:V,targetSnapshot:h,meta:Xs({targetSnapshot:h,startedAt:d,status:Ie.SKIPPED,skipReason:V})}}if(c){let V=Yi(n);if(V)return Tr(Or({status:Ie.ABORTED,targetSnapshot:h,startedAt:d,skipReason:V.reason,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88"}),e),{success:!1,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88",targetSnapshot:h,meta:Xs({targetSnapshot:h,startedAt:d,status:Ie.ABORTED,skipReason:V.reason,aborted:V.aborted===!0,stale:V.stale===!0,abortReason:V.reason,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88"})}}let v=await lm(h);if(!v?.success)throw new Error(v?.error||"\u76EE\u6807\u89E3\u6790\u8BB0\u5F55\u5931\u8D25");if(o&&Number.isFinite(h?.targetMessageIndex)&&h.targetMessageIndex>=0){xe().info("clearBeforeUpdate \u542F\u7528\uFF0C\u6E05\u7A7A\u76EE\u6807\u697C\u5C42\u6570\u636E",{targetMessageIndex:h.targetMessageIndex});try{let V=await cm(h.targetMessageIndex);xe().info("clearBeforeUpdate \u5B8C\u6210",V)}catch(V){xe().error("clearBeforeUpdate \u5931\u8D25",V)}}let T=Vs(h.sourceMessageId),A=Array.isArray(y)&&y.length>0?y:a.tables;xe().info("templateTables \u6765\u6E90",{usingActiveTemplate:y!==(Array.isArray(a.tables)?a.tables:[]),tableCount:Array.isArray(A)?A.length:0,firstTableName:A?.[0]?.name||"",firstTableId:A?.[0]?.id||""});let E=im(h,{templateTables:A}),w=Sr(E?.state?.tables||[]),P=jm(),$=n?.signal||m?.signal||null;xe().info("\u72B6\u6001\u5DF2\u52A0\u8F7D",{loadMode:E?.loadMode,sourceKind:E?.sourceKind,tableCount:w.length});let B=await P.buildRequest({buildRequest:B0},{executionContext:m,targetSnapshot:h,loadResult:E,config:a,assistantSnapshot:T,runScope:p});xe().info("\u8BF7\u6C42\u5DF2\u6784\u5EFA",{messageCount:B?.messages?.length,fillMode:B?.fillMode});let R="",_=null,k=null;for(let V=1;V<=qi;V++){if($?.aborted)throw new Error("\u8BF7\u6C42\u5DF2\u53D6\u6D88");try{if(R=await P.sendRequest({sendRequest:z0},B,{config:{...a,_effectiveApiPreset:B?.effectiveApiPreset||""},abortSignal:$}),xe().info("API \u54CD\u5E94\u5DF2\u6536\u5230",{attempt:V,responseLength:R?.length||0}),_=P.parseResponse({parseResponse:E0},R),xe().info("\u54CD\u5E94\u5DF2\u89E3\u6790",{attempt:V,mode:_?.mode,hasEdits:!!_?.edits,hasTables:!!_?.tables,rawFormat:_?.rawFormat}),!(_?.mode==="incremental"&&Array.isArray(_.edits)&&_.edits.length>0||_?.mode==="full"&&_?.tables))throw new Error("AI \u54CD\u5E94\u4E2D\u672A\u627E\u5230\u6709\u6548\u7684 <tableEdit> \u6807\u7B7E\u6216\u8868\u683C JSON");k=null;break}catch(We){if(k=We,xe().warn(`\u586B\u8868 attempt ${V}/${qi} \u5931\u8D25`,{error:We?.message||String(We)}),V<qi&&!await I0(C0,$))throw new Error("\u8BF7\u6C42\u5DF2\u53D6\u6D88\uFF08\u91CD\u8BD5\u7B49\u5F85\u671F\u95F4\uFF09")}}if(k)throw new Error(`\u586B\u8868\u5931\u8D25\uFF08${qi} \u6B21\u91CD\u8BD5\u540E\u4ECD\u5931\u8D25\uFF09: ${k?.message||String(k)}`);let K,Y=null,ue=B.fillMode||"full",pe=null;if(_.mode==="incremental"&&_.edits){let V=qm(E?.state,w),We=N0(_.edits,w,p,V);pe=We.stats,K=L0(w,We.edits,V,p),ue="incremental",(pe.droppedByScope>0||pe.droppedByLock>0)&&xe().info("scope \u8FC7\u6EE4",pe)}else if(_.mode==="full"&&_.tables){let V=Sr(_.tables);K=P0(w,V,p),ue="full"}else K=Sr(w);if(Y=Km(w,K),xe().info("\u5DEE\u5F02\u5DF2\u8BA1\u7B97",{fillMode:ue}),c){let V=Yi(n);if(V)return Tr(Or({status:Ie.ABORTED,targetSnapshot:h,startedAt:d,skipReason:V.reason,error:"\u5199\u56DE\u524D\u5DF2\u53D6\u6D88"}),e),{success:!1,error:"\u5199\u56DE\u524D\u5DF2\u53D6\u6D88",targetSnapshot:h,meta:Xs({targetSnapshot:h,startedAt:d,status:Ie.ABORTED,aborted:V.aborted===!0,stale:V.stale===!0,abortReason:V.reason,error:"\u5199\u56DE\u524D\u5DF2\u53D6\u6D88"})}}let te=await Tm({targetSnapshot:h,nextTables:K,config:a,loadResult:E,diff:Y,fillMode:ue,skipNotify:c});if(c){let V=Yi(n);if(V)return Tr(Or({status:Ie.ABORTED,targetSnapshot:h,startedAt:d,skipReason:V.reason,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88"}),e),{success:!1,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88",targetSnapshot:h,loadResult:E,request:B,responseText:R,parsed:_,fillMode:ue,diff:Y,previousTables:w,nextTables:K,runScope:p,state:te?.state,bindings:te?.bindings,mirrorResult:te?.mirrorResult,warning:te?.warning||"",meta:Xs({targetSnapshot:h,startedAt:d,status:Ie.ABORTED,warning:te?.warning||"",writeback:te,aborted:V.aborted===!0,stale:V.stale===!0,abortReason:V.reason,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88"})}}if(!te?.success)throw new Error(te?.error||"\u7ED3\u6784\u5316\u5199\u56DE\u5931\u8D25");if(c)try{let V=Number.isFinite(h?.targetMessageIndex)?h.targetMessageIndex:-1,We=y.filter(we=>we?.enabled!==!1&&(we?.id||we?.uid)).map(we=>we.id||we.uid);We.length>0&&V>=0&&Xm(h?.chatId||"",ne.getKey?ne.getKey():"",We,V)}catch(V){xe().warn("recordTablesUpdated \u5931\u8D25\uFF08\u4E0D\u5F71\u54CD\u4E3B\u6D41\u7A0B\uFF09",V)}let Te=Date.now()-d;xe().info(`\u586B\u8868\u5B8C\u6210 [${ue}] ${Te}ms`,{success:!0,writebackSuccess:te?.success,mirrorSuccess:te?.mirrorResult?.success});let Fe={lastStatus:Ie.SUCCESS,lastRunAt:Date.now(),lastDurationMs:Te,lastError:"",lastErrorDetails:[],lastValidationSummary:l.summary||{errorCount:0,warningCount:0},successCount:(Number(u.successCount)||0)+1,errorCount:Number(u.errorCount)||0,lastSourceMessageId:J(h.sourceMessageId),lastSlotRevisionKey:J(h.slotRevisionKey),lastLoadMode:J(E.loadMode),lastMirrorApplied:te?.mirrorResult?.success===!0,lastResolvedFromMessageId:J(E?.resolvedFromMessageId),lastResolvedFromRevisionKey:J(E?.resolvedFromRevisionKey),lastSourceKind:J(E?.sourceKind||E?.state?.meta?.sourceKind),lastScopeMode:J(p.mode,""),lastFillMode:ue,...c?Or({status:Ie.SUCCESS,targetSnapshot:h,startedAt:d,skipReason:""}):{}};return Tr(Fe,e),{success:!0,targetSnapshot:h,loadResult:E,request:B,responseText:R,parsed:_,fillMode:ue,diff:Y,previousTables:w,nextTables:K,runScope:p,scopeStats:pe,state:te.state,bindings:te.bindings,mirrorResult:te.mirrorResult,warning:te.warning||"",...c?{meta:Xs({targetSnapshot:h,startedAt:d,status:Ie.SUCCESS,warning:te.warning||"",writeback:te})}:{}}}catch(m){let h=Date.now()-d;xe().error(`\u586B\u8868\u5931\u8D25 ${h}ms: ${m?.message||m}`,{stack:m?.stack});let x=c?Yi(n):!1,v=m?.name==="AbortError"||m?.message==="\u8BF7\u6C42\u5DF2\u53D6\u6D88"||x?.aborted===!0||x?.stale===!0,T=v?Ie.ABORTED:Ie.ERROR,A={lastStatus:T,lastRunAt:Date.now(),lastDurationMs:h,lastError:m?.message||String(m),lastErrorDetails:[m?.message||String(m)],lastValidationSummary:l.summary||{errorCount:0,warningCount:0},successCount:Number(u.successCount)||0,errorCount:v?Number(u.errorCount)||0:(Number(u.errorCount)||0)+1,lastScopeMode:J(p.mode,""),...c?Or({status:T,targetSnapshot:g,startedAt:d,skipReason:v?x?.reason||"cancelled_before_host_commit":"",error:m?.message||String(m)}):{}};return Tr(A,e),{success:!1,error:m?.message||String(m),errors:[m?.message||String(m)],...c?{meta:Xs({targetSnapshot:g,startedAt:d,status:T,skipReason:v?x?.reason||"cancelled_before_host_commit":"",aborted:v,stale:x?.stale===!0,abortReason:v?x?.reason||"cancelled_before_host_commit":"",error:m?.message||String(m)})}:{}}}}var qi,C0,D0,Vi=N(()=>{ks();Ws();fo();Ti();H();Le();Pi();Qo();qt();Sm();Ui();zm();Um();Xa();Fm();Gi();Cn();$a();yn();Vr();Zm();kr();qi=3,C0=5e3;D0=`

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

\u53EA\u8FD4\u56DE <tableEdit> \u6807\u7B7E\uFF0C\u4E0D\u8981\u9644\u52A0\u5176\u4ED6\u5185\u5BB9\u3002`});var ch={};le(ch,{WindowManager:()=>Ji,closeWindow:()=>lh,createWindow:()=>zd,windowManager:()=>bt});function j0(){if(bt.stylesInjected)return;bt.stylesInjected=!0;let t=`
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
  `,e=Wt(),r=e.createElement("style");r.id=U0+"_styles",r.textContent=t,(e.head||e.documentElement).appendChild(r)}function zd(t){let{id:e,title:r="\u7A97\u53E3",content:s="",width:n=900,height:o=700,modal:a=!1,resizable:i=!0,maximizable:l=!0,startMaximized:c=!1,rememberState:d=!0,onClose:u,onReady:y}=t;j0();let p=Wt(),g=p.defaultView||window.parent||window,m=window.jQuery||window.parent?.jQuery;if(!m)return K0.error("jQuery not available"),null;if(bt.isOpen(e))return bt.bringToFront(e),bt.getWindow(e);let h=g.innerWidth||1200,x=g.innerHeight||800,v=h<=1100,T=null,A=!1;d&&(T=bt.getState(e),T&&!v&&(A=!0));let E,w;A&&T.width&&T.height?(E=Math.max(400,Math.min(T.width,h-40)),w=Math.max(300,Math.min(T.height,x-40))):(E=Math.max(400,Math.min(n,h-40)),w=Math.max(300,Math.min(o,x-40)));let P=Math.max(20,Math.min((h-E)/2,h-E-20)),$=Math.max(20,Math.min((x-w)/2,x-w-20)),B=l&&!v,R=`
    <div class="yyt-window" id="${e}" style="left:${P}px; top:${$}px; width:${E}px; height:${w}px;">
      <div class="yyt-window-header">
        <div class="yyt-window-title">
          <i class="fa-solid fa-window-maximize"></i>
          <span>${F0(r)}</span>
        </div>
        <div class="yyt-window-controls">
          ${B?'<button class="yyt-window-btn maximize" title="\u6700\u5927\u5316/\u8FD8\u539F"><i class="fa-solid fa-expand"></i></button>':""}
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
  `,_=null;a&&(_=m(`<div class="yyt-window-overlay" data-for="${e}"></div>`),m(p.body).append(_));let k=m(R);m(p.body).append(k),bt.register(e,k),k.on("mousedown",()=>bt.bringToFront(e));let K=!1,Y={left:P,top:$,width:E,height:w},ue=()=>{Y={left:parseInt(k.css("left")),top:parseInt(k.css("top")),width:k.width(),height:k.height()},k.addClass("maximized"),k.find(".yyt-window-btn.maximize i").removeClass("fa-expand").addClass("fa-compress"),K=!0},pe=()=>{k.removeClass("maximized"),k.css({left:Y.left+"px",top:Y.top+"px",width:Y.width+"px",height:Y.height+"px"}),k.find(".yyt-window-btn.maximize i").removeClass("fa-compress").addClass("fa-expand"),K=!1};k.find(".yyt-window-btn.maximize").on("click",()=>{K?pe():ue()}),(v&&l||A&&T.isMaximized&&l||c&&l)&&ue(),k.find(".yyt-window-btn.close").on("click",()=>{if(d&&l){let we={width:K?Y.width:k.width(),height:K?Y.height:k.height(),isMaximized:K};bt.saveState(e,we)}u&&u(),_&&_.remove(),k.remove(),bt.unregister(e),m(p).off(".yytWindowDrag"+e),m(p).off(".yytWindowResize"+e)}),_&&_.on("click",we=>{we.target,_[0]});let te=!1,Te,Fe,V,We;if(k.find(".yyt-window-header").on("mousedown",we=>{m(we.target).closest(".yyt-window-controls").length||K||(te=!0,Te=we.clientX,Fe=we.clientY,V=parseInt(k.css("left")),We=parseInt(k.css("top")),m(p.body).css("user-select","none"))}),m(p).on("mousemove.yytWindowDrag"+e,we=>{if(!te)return;let $e=we.clientX-Te,qe=we.clientY-Fe;k.css({left:Math.max(0,V+$e)+"px",top:Math.max(0,We+qe)+"px"})}),m(p).on("mouseup.yytWindowDrag"+e,()=>{te&&(te=!1,m(p.body).css("user-select",""))}),i){let we=!1,$e="",qe,fs,Ze,rn,ro,so;k.find(".yyt-window-resize-handle").on("mousedown",function(Qt){K||(we=!0,$e="",m(this).hasClass("se")?$e="se":m(this).hasClass("e")?$e="e":m(this).hasClass("s")?$e="s":m(this).hasClass("w")?$e="w":m(this).hasClass("n")?$e="n":m(this).hasClass("nw")?$e="nw":m(this).hasClass("ne")?$e="ne":m(this).hasClass("sw")&&($e="sw"),qe=Qt.clientX,fs=Qt.clientY,Ze=k.width(),rn=k.height(),ro=parseInt(k.css("left")),so=parseInt(k.css("top")),m(p.body).css("user-select","none"),Qt.stopPropagation())}),m(p).on("mousemove.yytWindowResize"+e,Qt=>{if(!we)return;let gs=Qt.clientX-qe,ms=Qt.clientY-fs,sn=400,fa=300,no=Ze,Dr=rn,hs=ro,ga=so;if($e.includes("e")&&(no=Math.max(sn,Ze+gs)),$e.includes("s")&&(Dr=Math.max(fa,rn+ms)),$e.includes("w")){let bs=Ze-gs;bs>=sn&&(no=bs,hs=ro+gs)}if($e.includes("n")){let bs=rn-ms;bs>=fa&&(Dr=bs,ga=so+ms)}k.css({width:no+"px",height:Dr+"px",left:hs+"px",top:ga+"px"})}),m(p).on("mouseup.yytWindowResize"+e,()=>{we&&(we=!1,m(p.body).css("user-select",""))})}return k.on("remove",()=>{m(p).off(".yytWindowDrag"+e),m(p).off(".yytWindowResize"+e)}),y&&setTimeout(()=>y(k),50),k}function lh(t){let e=bt.getWindow(t);if(e){let r=window.jQuery||window.parent?.jQuery;if(r){let s=Wt();r(`.yyt-window-overlay[data-for="${t}"]`).remove(),r(s).off(".yytWindowDrag"+t),r(s).off(".yytWindowResize"+t)}e.remove(),bt.unregister(t)}}function F0(t){return typeof t!="string"?"":t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}var K0,U0,ih,Ji,bt,Kd=N(()=>{He();H();at();K0=C.createScope("WindowManager"),U0="youyou_toolkit_window_manager",ih="window_states",Ji=class{constructor(){this.windows=new Map,this.baseZIndex=1e4,this.topZIndex=1e4,this.stylesInjected=!1}register(e,r){this.topZIndex++,this.windows.set(e,{$el:r,zIndex:this.topZIndex}),r.css("z-index",this.topZIndex)}unregister(e){this.windows.delete(e)}bringToFront(e){let r=this.windows.get(e);r&&(this.topZIndex++,r.zIndex=this.topZIndex,r.$el.css("z-index",this.topZIndex))}getWindow(e){return this.windows.get(e)?.$el||null}isOpen(e){return this.windows.has(e)}closeAll(){this.windows.forEach((e,r)=>{e.$el&&e.$el.remove()}),this.windows.clear()}saveState(e,r){let s=this.loadStates();s[e]={...r,updatedAt:Date.now()},xa.set(ih,s)}loadStates(){return xa.get(ih)||{}}getState(e){return this.loadStates()[e]||null}},bt=new Ji});function yh(){return{addedTables:[],deletedTables:[],renamedTables:[],movedTables:[],patchedAiInstructions:[],patchedColumns:[],patchedRows:[],patchedExportConfig:[],patchedLocks:[],patchedWorkbenchConfig:[]}}function Ud(t,e=""){return{protocolVersion:Zs,mode:Yn,baseFingerprint:t||"",summary:"",warnings:[],operations:[],currentTableId:String(e||"")}}function jd(){let t=0,e=!1;return{createRunGuard(){let r=t;return{isCancelled:()=>e,isStale:()=>!e&&r!==t}},invalidate(){t+=1},cancel(){e=!0,t+=1},reset(){e=!1,t+=1}}}function kt(t){return t===void 0?t:JSON.parse(JSON.stringify(t))}function G0(t){try{return JSON.stringify(t)}catch{return""}}async function la(t){if(!t||!Array.isArray(t.tables))return"empty";let e=t.tables.map(i=>({id:i.id||"",name:i.name||"",note:i.note||"",enabled:i.enabled,columns:Array.isArray(i.columns)?i.columns.map(l=>({key:l.key||"",title:l.title||"",type:l.type||""})):[],aiInstructions:i.aiInstructions||{},exportConfig:i.exportConfig||{}})),r=G0(e),n=new TextEncoder().encode(r),o=await crypto.subtle.digest("SHA-256",n);return`yyt-fp:${Array.from(new Uint8Array(o)).slice(0,8).map(i=>i.toString(16).padStart(2,"0")).join("")}`}function Qi(t,e){let r=Number(t);if(!Number.isFinite(r))return e;let s=Math.floor(r);return s>0?s:e}function fh(t,e){let r=Number(t);if(!Number.isFinite(r))return e;let s=Math.floor(r);return s>=0?s:e}function us(t){return String(t??"").trim()}var rt,Zs,Yn,ia,W0,Xi,H0,dh,uh,ph,Vn,QR,Zi=N(()=>{rt=Object.freeze({ADD_TABLE:"add_table",RENAME_TABLE:"rename_table",DELETE_TABLE:"delete_table",MOVE_TABLE:"move_table",PATCH_AI_INSTRUCTIONS:"patch_table_ai_instructions",PATCH_COLUMNS:"patch_table_columns",PATCH_ROWS:"patch_table_rows",PATCH_EXPORT_CONFIG:"patch_table_export_config",PATCH_LOCKS:"patch_table_locks",PATCH_WORKBENCH_CONFIG:"patch_workbench_config"}),Zs=1,Yn="modify_current_workbench_incremental",ia="assistantDraft",W0=Object.freeze(["note","init","create","update","delete"]),Xi=new Set(W0),H0=Object.freeze(["contextDepth","contextRoles","sendLatestRows","runScope","mirrorToMessage","mirrorTag","fillMode","autoUpdateEnabled","autoUpdateTrigger"]),dh=new Set(H0),uh=3,ph=1,Vn=Object.freeze({MAX_ROUNDS:"max_rounds",EMPTY_OPERATIONS:"empty_operations",REPEATED_FINGERPRINT:"repeated_working_fingerprint",REPAIR_RETRY_CAPPED:"repair_retry_capped"}),QR=Object.freeze({CANCELLED:"cancelled",STALE:"stale"})});function Fd(t){return!!t&&typeof t=="object"&&!Array.isArray(t)}function xt(t,e){if(!Fd(t))throw new Error(`${e} \u5FC5\u987B\u662F\u5BF9\u8C61`)}function Rt(t,e){let r=String(t??"").trim();if(!r)throw new Error(`${e} \u5FC5\u987B\u662F\u975E\u7A7A\u5B57\u7B26\u4E32`);return r}function Jn(t,e){let r=t.tables.find(s=>s.id===e);if(!r)throw new Error(`\u627E\u4E0D\u5230\u76EE\u6807\u8868: ${e}`);return r}function gh(t){return new Set((t.columns||[]).map(e=>e.key).filter(Boolean))}function mh(){return{init:"",create:"",update:"",delete:""}}function q0(t){let e=ia,r=new RegExp(`<${e}>([\\s\\S]*?)<\\/${e}>`,"g"),s=Array.from(String(t||"").matchAll(r));if(!s.length)throw new Error(`AI \u54CD\u5E94\u4E2D\u672A\u627E\u5230 <${e}> \u6807\u7B7E`);return String(s[s.length-1][1]||"").trim()}function hh(t){let e=q0(t),r;try{r=JSON.parse(e)}catch(s){throw new Error(`assistant draft JSON \u89E3\u6790\u5931\u8D25: ${s?.message||"\u672A\u77E5\u9519\u8BEF"}`)}return Y0(r)}function Y0(t){if(xt(t,"assistant draft"),t.protocolVersion!==Zs)throw new Error(`assistant draft.protocolVersion \u5FC5\u987B\u4E3A ${Zs}`);if(t.mode!==Yn)throw new Error(`assistant draft.mode \u975E\u6CD5: ${t.mode}`);if(typeof t.baseFingerprint!="string"||!t.baseFingerprint.trim())throw new Error("assistant draft.baseFingerprint \u7F3A\u5931");if(typeof t.summary!="string")throw new Error("assistant draft.summary \u5FC5\u987B\u662F\u5B57\u7B26\u4E32");if(!Array.isArray(t.warnings))throw new Error("assistant draft.warnings \u5FC5\u987B\u662F\u6570\u7EC4");if(!Array.isArray(t.operations))throw new Error("assistant draft.operations \u5FC5\u987B\u662F\u6570\u7EC4");let e=new Set(Object.values(rt));return t.operations.forEach((r,s)=>{xt(r,`operations[${s}]`);let n=String(r.op||"");if(!e.has(n))throw new Error(`operations[${s}] \u5305\u542B\u4E0D\u652F\u6301\u7684\u64CD\u4F5C: ${n}`);if((n.startsWith("patch_table_")||n===rt.MOVE_TABLE)&&Rt(r.tableId,`${n}.tableId`),n===rt.RENAME_TABLE&&Rt(r.newName,`${n}.newName`),n===rt.ADD_TABLE&&(Rt(r.name,`${n}.name`),!Array.isArray(r.columns)||r.columns.length===0))throw new Error(`${n} \u81F3\u5C11\u9700\u8981\u4E00\u4E2A column`);n.startsWith("patch_table_")&&n!==rt.PATCH_LOCKS&&xt(r.patch,`${n}.patch`)}),{protocolVersion:Zs,mode:Yn,baseFingerprint:String(t.baseFingerprint||""),summary:String(t.summary||""),warnings:(t.warnings||[]).map(r=>String(r??"")),operations:kt(t.operations),currentTableId:String(t.currentTableId||"")}}function V0(t,e,r){let s=Rt(e.name,"add_table.name");if(!Array.isArray(e.columns)||e.columns.length===0)throw new Error("add_table \u81F3\u5C11\u9700\u8981\u4E00\u4E2A column");let n=new Set,o=e.columns.map((c,d)=>{let u=Rt(c.title||c.name,`add_table.columns[${d}].title`);return{key:Zr(No(u,`col_${d+1}`),n),title:u,description:String(c.description??""),type:String(c.type||"text"),required:!!c.required}}),a=e.aiInstructions&&typeof e.aiInstructions=="object"?{note:String(e.aiInstructions.note??e.note??""),init:String(e.aiInstructions.init??""),create:String(e.aiInstructions.create??""),update:String(e.aiInstructions.update??""),delete:String(e.aiInstructions.delete??"")}:{note:String(e.note??""),...mh()},i={id:hc("table"),name:s,note:a.note,enabled:!0,aiInstructions:{init:a.init,create:a.create,update:a.update,delete:a.delete},columns:o,rows:[],exportConfig:{enabled:!1,entryName:s,entryType:"constant",splitByRow:!1,keywords:"",injectionTemplate:"",preventRecursion:!0,entryPlacement:{position:"before_character_definition",depth:2,order:0}}},l=String(e.insertAfterTableId||"").trim();if(l){let c=t.tables.findIndex(d=>d.id===l);if(c===-1)throw new Error(`add_table \u7684 insertAfterTableId \u4E0D\u5B58\u5728: ${l}`);t.tables.splice(c+1,0,i)}else t.tables.push(i);return r.addedTables.push({tableId:i.id,name:s}),i.id}function J0(t,e,r){let s=Jn(t,e.tableId),n=s.name,o=Rt(e.newName,"rename_table.newName");s.name=o,r.renamedTables.push({tableId:e.tableId,beforeName:n,afterName:o})}function X0(t,e,r,s){let n=t.tables.findIndex(a=>a.id===e.tableId);if(n===-1)throw new Error(`\u627E\u4E0D\u5230\u76EE\u6807\u8868: ${e.tableId}`);let o=t.tables[n];r.deletedTables.push({tableId:e.tableId,name:o.name}),s.push({type:"delete_table",label:`\u5220\u9664\u8868: ${o.name}`}),t.tables.splice(n,1)}function Q0(t,e,r){let s=t.tables.findIndex(u=>u.id===e.tableId);if(s===-1)throw new Error(`\u627E\u4E0D\u5230\u76EE\u6807\u8868: ${e.tableId}`);if(+!!e.beforeTableId+ +!!e.afterTableId!==1)throw new Error("move_table \u5FC5\u987B\u4E14\u53EA\u80FD\u63D0\u4F9B beforeTableId \u6216 afterTableId \u4E4B\u4E00");let o=e.beforeTableId||e.afterTableId;if(t.tables.findIndex(u=>u.id===o)===-1)throw new Error(`move_table \u951A\u70B9\u4E0D\u5B58\u5728: ${o}`);if(o===e.tableId)throw new Error("move_table \u4E0D\u80FD\u4EE5\u81EA\u8EAB\u4E3A\u951A\u70B9");let[i]=t.tables.splice(s,1),l=t.tables.findIndex(u=>u.id===o),c=e.beforeTableId?l:l+1;t.tables.splice(c,0,i);let d=t.tables.indexOf(i);r.movedTables.push({tableId:e.tableId,name:i.name,fromIndex:s,toIndex:d})}function Z0(t,e,r){let s=Jn(t,e.tableId);xt(e.patch,`${e.op}.patch`);let n=[];Object.keys(e.patch).forEach(o=>{if(!Xi.has(o))throw new Error(`patch_table_ai_instructions.patch \u5305\u542B\u672A\u77E5\u5B57\u6BB5: ${o}`)}),(!s.aiInstructions||typeof s.aiInstructions!="object")&&(s.aiInstructions=mh()),"note"in e.patch&&(s.note=String(e.patch.note??""),n.push("note")),["init","create","update","delete"].forEach(o=>{o in e.patch&&(s.aiInstructions[o]=String(e.patch[o]??""),n.push(o))}),n.length&&r.patchedAiInstructions.push({tableId:e.tableId,name:s.name,keys:n})}function e_(t,e,r,s){let n=Jn(t,e.tableId);xt(e.patch,`${e.op}.patch`);let o=new Set(["renameColumns","addColumns","deleteColumns"]);Object.keys(e.patch).forEach(p=>{if(!o.has(p))throw new Error(`patch_table_columns.patch \u5305\u542B\u672A\u77E5\u5B57\u6BB5: ${p}`)});let a=[],i=[];(Array.isArray(e.patch.renameColumns)?e.patch.renameColumns:[]).forEach((p,g)=>{xt(p,`renameColumns[${g}]`);let m=Rt(p.columnKey,`renameColumns[${g}].columnKey`),h=n.columns.find(v=>v.key===m);if(!h)throw new Error(`renameColumns[${g}] \u6307\u5411\u4E0D\u5B58\u5728\u7684\u5217: ${m}`);let x=Rt(p.newTitle,`renameColumns[${g}].newTitle`);a.push(`\u5217\u6539\u540D: ${h.title} -> ${x}`),h.title=x}),(Array.isArray(e.patch.deleteColumns)?e.patch.deleteColumns:[]).map((p,g)=>{let m=Rt(p,`deleteColumns[${g}]`);if(!n.columns.some(h=>h.key===m))throw new Error(`deleteColumns[${g}] \u6307\u5411\u4E0D\u5B58\u5728\u7684\u5217: ${m}`);return m}).forEach(p=>{n.columns=n.columns.filter(g=>g.key!==p),(n.rows||[]).forEach(g=>{g.cells&&p in g.cells&&delete g.cells[p]}),a.push(`\u5220\u9664\u5217: ${p}`),i.push(`\u5220\u9664\u5217: ${n.name}.${p}`)});let u=Array.isArray(e.patch.addColumns)?e.patch.addColumns:[],y=gh(n);u.forEach((p,g)=>{xt(p,`addColumns[${g}]`);let m=Rt(p.title||p.name,`addColumns[${g}].title`),h=Zr(No(m,`col_${n.columns.length+1}`),y);n.columns.push({key:h,title:m,description:String(p.description??""),type:String(p.type||"text"),required:!!p.required}),(n.rows||[]).forEach(x=>{x.cells&&(x.cells[h]="")}),a.push(`\u65B0\u589E\u5217: ${m} (${h})`)}),a.length&&r.patchedColumns.push({tableId:e.tableId,name:n.name,changes:a}),i.forEach(p=>{s.push({type:"patch_table_columns",label:p})})}function t_(t,e,r){let s=Jn(t,e.tableId);xt(e.patch,`${e.op}.patch`);let n=new Set(["updateCells","addRows","deleteRowIds"]);Object.keys(e.patch).forEach(u=>{if(!n.has(u))throw new Error(`patch_table_rows.patch \u5305\u542B\u672A\u77E5\u5B57\u6BB5: ${u}`)});let o=[],a=(s.columns||[]).map(u=>u.key);Array.isArray(s.rows)||(s.rows=[]),(Array.isArray(e.patch.updateCells)?e.patch.updateCells:[]).forEach((u,y)=>{xt(u,`updateCells[${y}]`);let p=Rt(u.rowId,`updateCells[${y}].rowId`),g=Rt(u.columnKey,`updateCells[${y}].columnKey`),m=s.rows.find(h=>h.id===p);if(!m)throw new Error(`updateCells[${y}] \u6307\u5411\u4E0D\u5B58\u5728\u7684\u884C: ${p}`);if(!a.includes(g))throw new Error(`updateCells[${y}] \u6307\u5411\u4E0D\u5B58\u5728\u7684\u5217: ${g}`);m.cells||(m.cells={}),m.cells[g]=kt(u.value??""),o.push(`\u6539\u5355\u5143\u683C: ${p}.${g}`)}),(Array.isArray(e.patch.addRows)?e.patch.addRows:[]).forEach((u,y)=>{if(xt(u,`addRows[${y}]`),!u.cells||typeof u.cells!="object")throw new Error(`addRows[${y}].cells \u5FC5\u987B\u662F\u5BF9\u8C61`);Object.keys(u.cells).forEach(g=>{if(!a.includes(g))throw new Error(`addRows[${y}] \u5305\u542B\u672A\u77E5\u5217: ${g}`)});let p={id:Bs("row"),name:`\u884C${s.rows.length+1}`,cells:{}};a.forEach(g=>{p.cells[g]=g in u.cells?kt(u.cells[g]):""}),s.rows.push(p),o.push(`\u65B0\u589E\u884C: ${p.id}`)});let c=Array.isArray(e.patch.deleteRowIds)?e.patch.deleteRowIds:[],d=new Set(c.map(u=>String(u)));if(d.size){let u=s.rows.length;s.rows=s.rows.filter(p=>!d.has(p.id));let y=u-s.rows.length;y>0&&o.push(`\u5220\u9664 ${y} \u884C`)}o.length&&r.patchedRows.push({tableId:e.tableId,name:s.name,changes:o})}function r_(t,e,r){let s=Jn(t,e.tableId);xt(e.patch,`${e.op}.patch`),(!s.exportConfig||typeof s.exportConfig!="object")&&(s.exportConfig={enabled:!1,entryName:s.name,entryType:"constant"});let n=new Set(["enabled","entryName","entryType","splitByRow","keywords","injectionTemplate","preventRecursion"]);Object.keys(e.patch).forEach(a=>{if(!n.has(a))throw new Error(`patch_table_export_config.patch \u5305\u542B\u672A\u77E5\u5B57\u6BB5: ${a}`)}),Object.entries(e.patch).forEach(([a,i])=>{if(a==="entryType"&&!["constant","keyword"].includes(i))throw new Error(`patch_table_export_config.entryType \u5FC5\u987B\u4E3A constant \u6216 keyword\uFF0C\u6536\u5230: ${i}`);s.exportConfig[a]=kt(i)});let o=Object.keys(e.patch);r.patchedExportConfig.push({tableId:e.tableId,name:s.name,keys:o})}function s_(t,e,r){xt(e.patch,`${e.op}.patch`);let s=new Set(["rows","columns","cells"]);Object.keys(e.patch).forEach(c=>{if(!s.has(c))throw new Error(`patch_table_locks.patch \u5305\u542B\u672A\u77E5\u5B57\u6BB5: ${c}`)});let n=Jn(t,e.tableId),o=[],a={tableId:e.tableId,name:n.name,rows:[],columns:[],cells:[]},i=Array.isArray(n.rows)?n.rows.length:0,l=gh(n);return(Array.isArray(e.patch.rows)?e.patch.rows:[]).forEach((c,d)=>{if(xt(c,`rows[${d}]`),typeof c.rowIndex!="number"||c.rowIndex<0||c.rowIndex>=i)throw new Error(`rows[${d}].rowIndex \u8D8A\u754C`);if(typeof c.locked!="boolean")throw new Error(`rows[${d}].locked \u5FC5\u987B\u662F\u5E03\u5C14\u503C`);a.rows.push({rowIndex:c.rowIndex,locked:c.locked}),o.push(`${c.locked?"\u9501\u5B9A":"\u89E3\u9501"}\u7B2C${c.rowIndex}\u884C`)}),(Array.isArray(e.patch.columns)?e.patch.columns:[]).forEach((c,d)=>{xt(c,`columns[${d}]`);let u=Rt(c.columnKey,`columns[${d}].columnKey`);if(!l.has(u))throw new Error(`columns[${d}] \u6307\u5411\u4E0D\u5B58\u5728\u7684\u5217: ${u}`);if(typeof c.locked!="boolean")throw new Error(`columns[${d}].locked \u5FC5\u987B\u662F\u5E03\u5C14\u503C`);a.columns.push({columnKey:u,locked:c.locked}),o.push(`${c.locked?"\u9501\u5B9A":"\u89E3\u9501"}\u5217: ${u}`)}),(Array.isArray(e.patch.cells)?e.patch.cells:[]).forEach((c,d)=>{if(xt(c,`cells[${d}]`),typeof c.rowIndex!="number"||c.rowIndex<0||c.rowIndex>=i)throw new Error(`cells[${d}].rowIndex \u8D8A\u754C`);let u=Rt(c.columnKey,`cells[${d}].columnKey`);if(!l.has(u))throw new Error(`cells[${d}] \u6307\u5411\u4E0D\u5B58\u5728\u7684\u5217: ${u}`);if(typeof c.locked!="boolean")throw new Error(`cells[${d}].locked \u5FC5\u987B\u662F\u5E03\u5C14\u503C`);a.cells.push({rowIndex:c.rowIndex,columnKey:u,locked:c.locked}),o.push(`${c.locked?"\u9501\u5B9A":"\u89E3\u9501"}\u5355\u5143\u683C: \u884C${c.rowIndex}.${u}`)}),o.length&&r.patchedLocks.push({tableId:e.tableId,name:n.name,changes:o}),a}function n_(t,e,r,s){xt(e.patch,`${e.op}.patch`);let n=[];Object.keys(e.patch).forEach(o=>{if(!dh.has(o))throw new Error(`patch_workbench_config.patch \u5305\u542B\u672A\u77E5\u5B57\u6BB5: ${o}`);t[o]=kt(e.patch[o]),n.push(o)}),n.length&&(r.patchedWorkbenchConfig.push({keys:n}),s.push({type:"patch_workbench_config",label:`\u4FEE\u6539\u5DE5\u4F5C\u53F0\u914D\u7F6E: ${n.join(", ")}`}))}function Wd({config:t,draft:e}){if(!Fd(t))throw new Error("\u7F3A\u5C11 config");if(!Fd(e)||!Array.isArray(e.operations))throw new Error("\u7F3A\u5C11\u5408\u6CD5 draft.operations");let r=kt(t),s=yh(),n=[],o=[],a=t.scope?.activeTableId||"";return e.operations.forEach(i=>{let l=String(i.op||"");switch(l){case rt.ADD_TABLE:{a=V0(r,i,s);break}case rt.RENAME_TABLE:J0(r,i,s);break;case rt.DELETE_TABLE:X0(r,i,s,n);break;case rt.MOVE_TABLE:Q0(r,i,s);break;case rt.PATCH_AI_INSTRUCTIONS:Z0(r,i,s);break;case rt.PATCH_COLUMNS:e_(r,i,s,n);break;case rt.PATCH_ROWS:t_(r,i,s);break;case rt.PATCH_EXPORT_CONFIG:r_(r,i,s);break;case rt.PATCH_LOCKS:{let c=s_(r,i,s);(c.rows.length||c.columns.length||c.cells.length)&&o.push(c);break}case rt.PATCH_WORKBENCH_CONFIG:n_(r,i,s,n);break;default:throw new Error(`\u4E0D\u652F\u6301\u7684\u64CD\u4F5C: ${l}`)}}),a&&!r.tables.some(i=>i.id===a)&&(a=r.tables[0]?.id||""),{candidateConfig:r,diff:s,highRiskItems:n,lockChanges:o,focusTableId:a}}var bh=N(()=>{Zi();Le();_c()});function o_(){return["\u4F60\u662F youyou_Toolkit \u586B\u8868\u5DE5\u4F5C\u53F0\u7684\u6539\u8868\u52A9\u624B\u3002",`\u4F60\u53EA\u80FD\u8F93\u51FA\u4E00\u4E2A\u88AB <${ia}> \u548C </${ia}> \u5305\u88F9\u7684 JSON \u5BF9\u8C61\uFF0C\u4E0D\u80FD\u8F93\u51FA\u89E3\u91CA\u6587\u672C\u3002`,`\u4E25\u683C\u4F7F\u7528 protocolVersion=${Zs}\u3001mode="${Yn}"\u3002`,"","\u9876\u5C42 JSON \u5FC5\u987B\u5305\u542B: protocolVersion, mode, baseFingerprint, summary, warnings, operations, currentTableId\u3002","warnings \u5FC5\u987B\u662F\u5B57\u7B26\u4E32\u6570\u7EC4\uFF1B\u6CA1\u6709\u5219\u8F93\u51FA\u7A7A\u6570\u7EC4\u3002","","\u53EA\u5141\u8BB8\u4EE5\u4E0B 10 \u79CD\u64CD\u4F5C:",...Object.values(rt).map(t=>`  - ${t}`),"",'\u6BCF\u4E2A operations[i] \u5FC5\u987B\u4F7F\u7528 "op" \u5B57\u6BB5\u8868\u793A\u64CD\u4F5C\u540D\uFF1B\u7981\u6B62\u4F7F\u7528 type/operation/action \u7B49\u522B\u540D\u3002',"","--- add_table ---","\u5FC5\u987B\u63D0\u4F9B\u975E\u7A7A name \u548C\u81F3\u5C11\u4E00\u4E2A columns \u9879\u3002","\u6BCF\u4E2A column \u81F3\u5C11\u6709 title \u5B57\u6BB5\u3002","\u5E94\u5C3D\u91CF\u540C\u65F6\u63D0\u4F9B aiInstructions\uFF08init/create/update/delete\uFF09\u8BA9\u65B0\u8868\u7ACB\u523B\u53EF\u7528\u3002","\u4E0D\u8981\u751F\u6210 tableId\uFF0C\u672C\u5730\u4F1A\u81EA\u52A8\u751F\u6210\u3002",'\u5982\u679C\u7528\u6237\u53EA\u8BF4"\u65B0\u589E\u67D0\u67D0\u8868"\u4F46\u6CA1\u7ED9\u8868\u5934\uFF0C\u6839\u636E\u8868\u540D\u8BED\u4E49\u751F\u6210\u5408\u7406\u901A\u7528\u7684 columns\u3002',"\u9ED8\u8BA4\u4F18\u5148 add_table + \u5B8C\u6574 aiInstructions\uFF1B\u9664\u975E\u7528\u6237\u660E\u786E\u8981\u6C42 DDL \u6216\u5B57\u6BB5\u7C7B\u578B\u7EA6\u675F\uFF0C\u5426\u5219\u4E0D\u8981\u8F93\u51FA patch_table_columns \u6765\u8865\u5217\u3002","","--- patch_table_ai_instructions ---",`\u53EA\u5141\u8BB8 patch: { ${[...Xi].join(", ")} }\u3002`,"","--- patch_table_columns ---","patch \u53EA\u5141\u8BB8: renameColumns[], addColumns[], deleteColumns[]\u3002","renameColumns \u4E2D\u7528 columnKey\uFF08\u4E0D\u662F title\uFF09\u5B9A\u4F4D\u5217\uFF0C\u63D0\u4F9B newTitle\u3002","addColumns \u4E2D\u6BCF\u4E2A\u9879\u81F3\u5C11\u6709 title\u3002","deleteColumns \u4E2D\u662F columnKey \u5B57\u7B26\u4E32\u6570\u7EC4\u3002","","--- patch_table_rows ---","patch \u53EA\u5141\u8BB8: updateCells[], addRows[], deleteRowIds[]\u3002","updateCells \u7528 rowId\uFF08\u4E0D\u662F\u884C\u53F7\uFF09\u5B9A\u4F4D\u884C\uFF0C\u7528 columnKey \u5B9A\u4F4D\u5217\uFF0C\u63D0\u4F9B value\u3002","addRows \u4E2D\u6BCF\u4E2A\u9879\u6709 cells: { [columnKey]: value }\u3002","deleteRowIds \u662F rowId \u5B57\u7B26\u4E32\u6570\u7EC4\u3002","","--- patch_table_export_config ---","patch \u53EA\u5141\u8BB8: enabled, entryName, entryType, splitByRow, keywords, injectionTemplate, preventRecursion\u3002","","--- patch_table_locks ---","patch \u53EA\u5141\u8BB8: rows[], columns[], cells[]\u3002","rows \u4E2D\u7528 rowIndex(0-based) + locked(boolean)\u3002","columns \u4E2D\u7528 columnKey + locked(boolean)\u3002","cells \u4E2D\u7528 rowIndex + columnKey + locked(boolean)\u3002","","--- patch_workbench_config ---","patch \u53EA\u5141\u8BB8: contextDepth, contextRoles, sendLatestRows, runScope, mirrorToMessage, mirrorTag, fillMode, autoUpdateEnabled, autoUpdateTrigger\u3002","","--- \u901A\u7528\u89C4\u5219 ---","\u5982\u679C\u9700\u6C42\u4FE1\u606F\u4E0D\u8DB3\u6216\u65E0\u6CD5\u751F\u6210\u5408\u6CD5\u64CD\u4F5C\uFF0C\u8FD4\u56DE\u7A7A operations\uFF0Csummary \u8BF4\u660E\u539F\u56E0\uFF0Cwarnings \u5199\u660E\u539F\u56E0\u3002\u4E0D\u8981\u8F93\u51FA\u8FFD\u95EE\u6587\u672C\u3002","\u4E25\u683C\u7981\u6B62\u4EFB\u4F55\u76F4\u63A5\u4FDD\u5B58\u884C\u4E3A\u3002","patch \u5BF9\u8C61\u53EA\u80FD\u586B\u5199\u5F53\u524D\u7ED3\u6784\u91CC\u771F\u5B9E\u5B58\u5728\u7684 tableId\u3001columnKey\u3001rowId\uFF1B\u4E0D\u8981\u731C\u6D4B\u672A\u77E5\u5B57\u6BB5\u3002","move_table \u53EA\u80FD\u63D0\u4F9B beforeTableId \u6216 afterTableId \u4E4B\u4E00\u3002","","=== \u6570\u636E\u6A21\u578B\u8BED\u4E49 ===","","\u8868\u683C (table) \u9876\u5C42\u5B57\u6BB5:","  id: \u53EA\u8BFB\uFF0C\u7531\u7CFB\u7EDF\u81EA\u52A8\u751F\u6210\u7684\u552F\u4E00\u6807\u8BC6\u7B26\u3002","  name: \u8868\u7684\u663E\u793A\u540D\u79F0\uFF08\u4E2D\u6587\uFF09\u3002","  note: \u8868\u7684\u7528\u9014\u63CF\u8FF0\uFF08\u7B49\u540C aiInstructions.note\uFF09\u3002","  enabled: boolean\uFF0C\u8BE5\u8868\u662F\u5426\u53C2\u4E0E\u81EA\u52A8\u586B\u8868\u3002","  columns[]: \u5217\u5B9A\u4E49\u6570\u7EC4\u3002","  rows[]: \u884C\u6570\u636E\u6570\u7EC4\u3002","  aiInstructions{}: AI \u64CD\u4F5C\u6307\u4EE4\u96C6\u3002","  exportConfig{}: \u4E16\u754C\u4E66\u6CE8\u5165\u5BFC\u51FA\u914D\u7F6E\u3002","","\u5217 (column) \u5B57\u6BB5:","  key: \u53EA\u8BFB\uFF0C\u7CFB\u7EDF\u4ECE title \u81EA\u52A8\u6D3E\u751F\u7684\u552F\u4E00\u6807\u8BC6\uFF08\u4E2D\u6587 title \u53EF\u80FD\u751F\u6210 col_1 \u683C\u5F0F\uFF09\u3002","  title: \u5217\u6807\u9898\uFF08\u9762\u5411\u7528\u6237\u7684\u663E\u793A\u540D\uFF09\u3002","  description: \u5217\u8BF4\u660E\u3002","  type: \u5217\u7C7B\u578B\u679A\u4E3E \u2014 text | number | boolean | date | json\uFF0C\u9ED8\u8BA4 text\u3002","  required: boolean\uFF0C\u8BE5\u5217\u662F\u5426\u5FC5\u586B\u3002","","\u884C (row) \u5B57\u6BB5:","  id: \u53EA\u8BFB\uFF0C\u7CFB\u7EDF\u81EA\u52A8\u751F\u6210\u7684\u552F\u4E00\u6807\u8BC6\u7B26\uFF08\u4E0D\u900F\u660E\u5B57\u7B26\u4E32\uFF0C\u975E\u6570\u5B57\u7D22\u5F15\uFF09\u3002",'  name: \u884C\u6807\u8BC6\uFF08\u5982"\u884C1"\uFF09\u3002',"  cells: { [columnKey]: string }\uFF0C\u6240\u6709\u503C\u90FD\u662F\u5B57\u7B26\u4E32\u3002","","aiInstructions \u5B57\u6BB5\u8BED\u4E49:","  note: \u8868\u7528\u9014\u63CF\u8FF0\uFF08\u5F71\u54CD AI \u5BF9\u8868\u7684\u7406\u89E3\uFF09\u3002","  init: \u521D\u59CB\u5316\u6307\u4EE4 \u2014 \u9996\u6B21\u586B\u5145\u65F6\u5982\u4F55\u751F\u6210\u884C\u3002","  create: \u65B0\u589E\u884C\u6307\u4EE4 \u2014 \u4EC0\u4E48\u6761\u4EF6\u4E0B\u65B0\u589E\u4E00\u884C\u3001\u683C\u5F0F\u8981\u6C42\u3002","  update: \u66F4\u65B0\u884C\u6307\u4EE4 \u2014 \u4EC0\u4E48\u6761\u4EF6\u4E0B\u4FEE\u6539\u5DF2\u6709\u884C\u3001\u54EA\u4E9B\u5217\u53EF\u6539\u3002","  delete: \u5220\u9664\u884C\u6307\u4EE4 \u2014 \u4EC0\u4E48\u6761\u4EF6\u4E0B\u5220\u9664\u884C\u3002","","exportConfig \u5B57\u6BB5\u8BED\u4E49:","  enabled: boolean\uFF0C\u662F\u5426\u5C06\u8BE5\u8868\u6570\u636E\u5199\u5165\u4E16\u754C\u4E66\u6761\u76EE\u3002","  entryName: \u4E16\u754C\u4E66\u6761\u76EE\u540D\u79F0\u3002","  entryType: \u6761\u76EE\u7C7B\u578B\u679A\u4E3E \u2014 constant | keyword\u3002","  splitByRow: boolean\uFF0C\u662F\u5426\u6BCF\u884C\u751F\u6210\u72EC\u7ACB\u6761\u76EE\u3002","  keywords: \u89E6\u53D1\u5173\u952E\u8BCD\u3002","  injectionTemplate: \u6CE8\u5165\u6A21\u677F\uFF08\u652F\u6301 {{columnKey}} \u53D8\u91CF\uFF09\u3002","  preventRecursion: boolean\uFF0C\u9ED8\u8BA4 true\uFF0C\u9632\u6B62\u9012\u5F52\u6CE8\u5165\u3002","","\u5DE5\u4F5C\u53F0\u914D\u7F6E\u5B57\u6BB5\u503C\u57DF:","  contextDepth: 0-50\uFF0C\u5411\u524D\u8BFB\u53D6\u7684\u6D88\u606F\u6761\u6570\u3002",'  contextRoles: "all" | "assistant_only"\uFF0C\u8BFB\u53D6\u54EA\u4E9B\u89D2\u8272\u7684\u6D88\u606F\u3002',"  sendLatestRows: \u53D1\u9001\u7ED9 AI \u7684\u6700\u65B0 N \u884C\u6570\u636E\uFF080=\u5168\u90E8\uFF09\u3002",'  runScope: "enabled" | "selected" | "current"\uFF0C\u81EA\u52A8\u586B\u8868\u8303\u56F4\u3002','  fillMode: "incremental" | "full"\uFF0C\u589E\u91CF\u6216\u5168\u91CF\u586B\u5145\u6A21\u5F0F\u3002',"  mirrorToMessage: boolean\uFF0C\u662F\u5426\u5C06\u6570\u636E\u955C\u50CF\u5199\u56DE\u6D88\u606F\u3002","  mirrorTag: \u955C\u50CF\u6807\u7B7E\u540D\u3002","  autoUpdateEnabled: boolean\uFF0C\u662F\u5426\u542F\u7528\u81EA\u52A8\u586B\u8868\u3002","  autoUpdateTrigger: \u81EA\u52A8\u89E6\u53D1\u6761\u4EF6\u3002","","=== \u64CD\u4F5C\u793A\u4F8B ===","","\u793A\u4F8B 1 \u2014 add_table\uFF08\u65B0\u589E\u8868\uFF0C\u542B\u5B8C\u6574\u7ED3\u6784\u548C AI \u6307\u4EE4\uFF09:","{",'  "op": "add_table",','  "name": "\u6218\u5229\u54C1\u8868",','  "columns": [','    { "title": "\u7269\u54C1\u540D", "type": "text", "required": true },','    { "title": "\u7A00\u6709\u5EA6", "type": "text" },','    { "title": "\u6570\u91CF", "type": "number" }',"  ],",'  "aiInstructions": {','    "note": "\u8BB0\u5F55\u89D2\u8272\u83B7\u5F97\u7684\u6218\u5229\u54C1",','    "init": "\u6839\u636E\u5267\u60C5\u5185\u5BB9\u521D\u59CB\u5316\u89D2\u8272\u5DF2\u6709\u7684\u7269\u54C1",','    "create": "\u5F53\u89D2\u8272\u83B7\u5F97\u65B0\u7269\u54C1\u65F6\u65B0\u589E\u884C",','    "update": "\u5F53\u7269\u54C1\u6570\u91CF\u6216\u7A00\u6709\u5EA6\u53D8\u5316\u65F6\u66F4\u65B0\u5BF9\u5E94\u884C",','    "delete": "\u5F53\u7269\u54C1\u88AB\u6D88\u8017\u6216\u4E22\u5931\u65F6\u5220\u9664\u5BF9\u5E94\u884C"',"  }","}","","\u793A\u4F8B 2 \u2014 patch_table_ai_instructions:","{",'  "op": "patch_table_ai_instructions",','  "tableId": "table_abc123",','  "patch": { "create": "\u5F53\u65B0\u89D2\u8272\u767B\u573A\u6216\u65B0\u7269\u54C1\u83B7\u5F97\u65F6\u65B0\u589E\u884C", "note": "\u8BB0\u5F55\u89D2\u8272\u7269\u54C1\u548C\u6218\u5229\u54C1" }',"}","","\u793A\u4F8B 3 \u2014 patch_table_columns:","{",'  "op": "patch_table_columns",','  "tableId": "table_abc123",','  "patch": {','    "renameColumns": [{ "columnKey": "col_1", "newTitle": "\u7269\u54C1\u540D\u79F0" }],','    "addColumns": [{ "title": "\u6765\u6E90", "type": "text" }],','    "deleteColumns": ["col_5"]',"  }","}","","=== \u6CE8\u610F\u4E8B\u9879 ===","- columnKey \u4ECE title \u81EA\u52A8\u6D3E\u751F\uFF0C\u4E2D\u6587 title \u7684 key \u901A\u5E38\u4E0D\u662F\u4E2D\u6587\uFF08\u5982 col_1\u3001col_2\uFF09\u3002\u5B9A\u4F4D\u5217\u65F6\u52A1\u5FC5\u7528 userPrompt \u4E2D\u63D0\u4F9B\u7684 column.key \u503C\u3002",'- rowId \u662F\u4E0D\u900F\u660E\u5B57\u7B26\u4E32\uFF08\u5982 "row_x7k9m2"\uFF09\uFF0C\u4E0D\u53EF\u7528\u884C\u53F7\u4EE3\u66FF\u3002','- cells \u4E2D\u6240\u6709\u503C\u90FD\u662F\u5B57\u7B26\u4E32\u7C7B\u578B\uFF0C\u6570\u5B57\u4E5F\u5199\u4F5C "42"\u3002',"- exportConfig.preventRecursion \u9ED8\u8BA4\u5E94\u4E3A true\u3002","- add_table \u4E0D\u8981\u751F\u6210 tableId\uFF0C\u672C\u5730\u81EA\u52A8\u751F\u6210\u3002","- \u6CE8\u5165\u6A21\u677F injectionTemplate \u4E2D\u7528 {{columnKey}} \u5F15\u7528\u5217\u503C\u3002"].join(`
`)}function a_(t,e){let r=t.config,s=t.currentTableId||"",n=Array.isArray(r?.tables)?r.tables:[],o=n.find(l=>l.id===s)||null,a=n.map(l=>({tableId:l.id,name:l.name,note:l.note||"",enabled:l.enabled,columns:(l.columns||[]).map(c=>({key:c.key,title:c.title,type:c.type||"text"})),aiInstructions:l.aiInstructions||{},exportConfig:l.exportConfig||{},rowCount:Array.isArray(l.rows)?l.rows.length:0})),i={userRequest:us(t.userRequest),baseFingerprint:e,currentTableId:s,currentTable:o?{tableId:o.id,name:o.name,note:o.note||"",columns:(o.columns||[]).map(l=>({key:l.key,title:l.title,type:l.type||"text"})),aiInstructions:o.aiInstructions||{},exportConfig:o.exportConfig||{},rowCount:Array.isArray(o.rows)?o.rows.length:0,rowIds:(o.rows||[]).map(l=>l.id)}:null,allTables:a,workbenchConfig:{contextDepth:r.contextDepth,contextRoles:r.contextRoles,sendLatestRows:r.sendLatestRows,runScope:r.runScope||r.scope?.mode,fillMode:r.fillMode,autoUpdateEnabled:r.autoUpdateEnabled,mirrorToMessage:r.mirrorToMessage}};try{return JSON.stringify(i,null,0)}catch{return"{}"}}function i_({userRequest:t,round:e,maxRounds:r,repairReason:s}){let n=[us(t)];return e>1&&n.push(`\u8865\u5145\u8BF4\u660E\uFF1A\u5F53\u524D\u662F\u7B2C ${e}/${r} \u8F6E\uFF0C\u8F93\u5165\u6570\u636E\u5DF2\u7ECF\u5305\u542B\u524D\u9762\u8F6E\u6B21\u4EA7\u751F\u7684\u8349\u7A3F\u7ED3\u679C\u3002\u8BF7\u53EA\u7EE7\u7EED\u672A\u5B8C\u6210\u7684\u6539\u52A8\uFF1B\u5982\u679C\u5DF2\u7ECF\u65E0\u9700\u7EE7\u7EED\u4FEE\u6539\uFF0C\u8BF7\u8FD4\u56DE\u7A7A operations\u3002`),s&&n.push(`\u4FEE\u590D\u8981\u6C42\uFF1A\u4E0A\u4E00\u8F6E\u8349\u7A3F\u672A\u901A\u8FC7\u672C\u5730\u6821\u9A8C\uFF0C\u539F\u56E0\u662F\uFF1A${s}\u3002\u8BF7\u4FEE\u590D\u8349\u7A3F\u5E76\u7EE7\u7EED\u5B8C\u6210\u9700\u6C42\uFF0C\u4ECD\u7136\u53EA\u80FD\u8F93\u51FA\u5408\u6CD5 draft JSON\u3002`),n.filter(Boolean).join(`

`)}async function l_(t,e){let r=t.config,s=us(t.userRequest);if(!s)throw new Error("\u8BF7\u8F93\u5165\u6539\u8868\u9700\u6C42");let n=await la(r),o=[{role:"system",content:o_()},...(t.priorTurns||[]).flatMap(d=>{let u=[];return d.user&&u.push({role:"user",content:d.user}),d.assistant&&u.push({role:"assistant",content:d.assistant}),u}),{role:"user",content:a_(t,n)}],a=us(t.apiPreset||r?.apiPreset),i=await po(a||"",o,{},e);if(!i)throw new Error("AI \u672A\u8FD4\u56DE\u6709\u6548\u5185\u5BB9");let l;try{l=hh(i)}catch(d){throw ca.error("draft \u89E3\u6790\u5931\u8D25",{userRequest:s,error:d?.message,aiRawText:i}),d}if(l.baseFingerprint!==n)throw new Error("AI \u8FD4\u56DE\u7684 baseFingerprint \u4E0E\u5F53\u524D\u7ED3\u6784\u4E0D\u4E00\u81F4");let c=Wd({config:r,draft:l});return{draft:l,aiRawText:i,messages:o,compileResult:c,originalBaseFingerprint:n}}async function xh(t){let e=t.config,r=us(t.userRequest);if(!r)throw new Error("\u8BF7\u8F93\u5165\u6539\u8868\u9700\u6C42");let s=Qi(t.maxRounds,uh),n=fh(t.maxRepairRetries,ph),o=kt(e),a=await la(o),i=[],l=c_(t.priorTurns),c=kt(o),d=a,u=Vn.MAX_ROUNDS,y=0,p="",g=null,m=null;function h(){let A=t.guard;if(A?.isCancelled?.())throw new en("cancelled");if(A?.isStale?.())throw new en("stale")}function x(){if(m){try{m.abort()}catch{}m=null}}e:for(let A=1;A<=s;A+=1){let E="";for(;;){h(),x(),m=new AbortController;let w=i_({userRequest:r,round:A,maxRounds:s,repairReason:E});try{let P=[...l,...i.map(K=>({user:K.userRequest,assistant:K.aiRawText}))],$=await l_({config:c,currentTableId:t.currentTableId,userRequest:w,priorTurns:P,apiPreset:t.apiPreset},m.signal);h(),g=$;let B=$.draft.operations.length>0,R=B?kt($.compileResult.candidateConfig):kt(c),_=B?await la(R):d,k={round:A,userRequest:w,draft:$.draft,aiRawText:$.aiRawText,messages:$.messages,perRoundCompileResult:$.compileResult,workingFingerprint:_};if(i.push(k),t.onRoundComplete?.({round:kt(k),rounds:kt(i),maxRounds:s}),!B){u=Vn.EMPTY_OPERATIONS;break e}if(c=R,_===d){u=Vn.REPEATED_FINGERPRINT;break e}if(d=_,p="",A===s){u=Vn.MAX_ROUNDS;break e}break}catch(P){if(h(),P instanceof en)throw P;if(p=P?.message||"\u672A\u77E5\u9519\u8BEF",y>=n){u=Vn.REPAIR_RETRY_CAPPED;break e}y+=1,E=p}}}x();let v=i.length>0?i[i.length-1].perRoundCompileResult:Wd({config:c,draft:Ud(a)}),T={originalBaseFingerprint:a,finalWorkingFingerprint:d,stopReason:u,roundsExecuted:i.length,maxRounds:s,repairRetriesUsed:y,maxRepairRetries:n,lastErrorMessage:p};return{draft:g?.draft||Ud(a,t.currentTableId),aiRawText:g?.aiRawText||"",messages:g?.messages||[],compileResult:v,originalBaseFingerprint:a,rounds:i,session:T}}function c_(t){return Array.isArray(t)?t.map(e=>({user:us(e?.user),assistant:us(e?.assistant)})).filter(e=>e.user||e.assistant):[]}async function wh(t){try{let e=await la(be()),r=t.originalBaseFingerprint||t.draft?.baseFingerprint||"";if(!r||e!==r)return ca.warn("applyAssistantResult: fingerprint \u4E0D\u5339\u914D\uFF0C\u8349\u7A3F\u5DF2\u8FC7\u671F"),!1;let s=Je(t.compileResult.candidateConfig);if(s&&typeof s=="object"&&s.success===!1)return ca.error("applyAssistantResult: saveTableWorkbenchConfig \u5931\u8D25",s),!1;if(t.compileResult.lockChanges?.length){let o={chatId:"",isolationKey:ne.isEnabled()?ne.getKey():""};t.compileResult.lockChanges.forEach(a=>{a.rows?.forEach(i=>{Fi(o,a.tableId,i.rowIndex,i.locked)}),a.columns?.forEach(i=>{Wi(o,a.tableId,i.columnKey,i.locked)}),a.cells?.forEach(i=>{Hi(o,a.tableId,i.rowIndex,i.columnKey,i.locked)})})}return ca.info("applyAssistantResult: \u8349\u7A3F\u5DF2\u5E94\u7528",{tables:t.compileResult.candidateConfig?.tables?.length}),!0}catch(e){return ca.error("applyAssistantResult \u5F02\u5E38",e),!1}}var ca,en,vh=N(()=>{fo();H();qt();Gi();kr();bh();Zi();ca=C.createScope("TableAssistant");en=class extends Error{constructor(e){super(e==="cancelled"?"\u6539\u8868\u52A9\u624B\u4F1A\u8BDD\u5DF2\u53D6\u6D88":"\u6539\u8868\u52A9\u624B\u4F1A\u8BDD\u5DF2\u8FC7\u671F"),this.name="AssistantSessionStoppedError",this.stopReason=e}}});function d_(){try{if(window.parent&&window.parent!==window&&window.parent.document)return window.parent.document}catch{}return document}function tl(){return`turn_${Date.now()}_${Math.random().toString(36).slice(2,8)}`}function st(t){let e=document.createElement("div");return e.textContent=String(t??""),e.innerHTML}function u_(){let t=be(),e=t?.scope?.activeTableId||"",r=(t?.tables||[]).find(s=>s.id===e);return!e||!r?"\u5F53\u524D\u672A\u9009\u4E2D\u8868":`${r.name} (${e})`}function p_(t){if(!t)return"";let e=[];t.addedTables?.length&&e.push(`\u65B0\u589E${t.addedTables.length}\u8868`),t.deletedTables?.length&&e.push(`\u5220\u9664${t.deletedTables.length}\u8868`),t.renamedTables?.length&&e.push(`\u91CD\u547D\u540D${t.renamedTables.length}\u8868`),t.movedTables?.length&&e.push(`\u79FB\u52A8${t.movedTables.length}\u8868`);let r=(t.patchedAiInstructions?.length||0)+(t.patchedColumns?.length||0)+(t.patchedRows?.length||0)+(t.patchedExportConfig?.length||0)+(t.patchedLocks?.length||0)+(t.patchedWorkbenchConfig?.length||0);return r&&e.push(`\u4FEE\u6539${r}\u5904`),e.length?e.join(" \xB7 "):"\u65E0\u53D8\u66F4"}function y_(t){if(!t)return"";let e=[],r=s=>s.length?`<ul>${s.map(n=>`<li>${st(n)}</li>`).join("")}</ul>`:'<div class="yyt-assistant-hint">\u65E0</div>';return t.addedTables?.length&&e.push(`<div><strong>\u65B0\u589E\u8868</strong>${r(t.addedTables.map(s=>`${s.name} [${s.tableId}]`))}</div>`),t.deletedTables?.length&&e.push(`<div><strong>\u5220\u9664\u8868</strong>${r(t.deletedTables.map(s=>`${s.name} [${s.tableId}]`))}</div>`),t.renamedTables?.length&&e.push(`<div><strong>\u91CD\u547D\u540D</strong>${r(t.renamedTables.map(s=>`${s.beforeName} -> ${s.afterName}`))}</div>`),t.patchedAiInstructions?.length&&e.push(`<div><strong>AI \u6307\u4EE4\u53D8\u66F4</strong>${r(t.patchedAiInstructions.map(s=>`${s.name}: ${s.keys.join(", ")}`))}</div>`),t.patchedColumns?.length&&e.push(`<div><strong>\u5217\u7ED3\u6784\u53D8\u66F4</strong>${r(t.patchedColumns.map(s=>`${s.name}: ${s.changes.join("\uFF1B")}`))}</div>`),t.patchedRows?.length&&e.push(`<div><strong>\u884C\u6570\u636E\u53D8\u66F4</strong>${r(t.patchedRows.map(s=>`${s.name}: ${s.changes.join("\uFF1B")}`))}</div>`),t.patchedExportConfig?.length&&e.push(`<div><strong>\u5BFC\u51FA\u914D\u7F6E\u53D8\u66F4</strong>${r(t.patchedExportConfig.map(s=>`${s.name}: ${s.keys.join(", ")}`))}</div>`),t.patchedLocks?.length&&e.push(`<div><strong>\u9501\u53D8\u66F4</strong>${r(t.patchedLocks.map(s=>`${s.name}: ${s.changes.join("\uFF1B")}`))}</div>`),t.patchedWorkbenchConfig?.length&&e.push(`<div><strong>\u5DE5\u4F5C\u53F0\u914D\u7F6E\u53D8\u66F4</strong>${r(t.patchedWorkbenchConfig.map(s=>s.keys.join(", ")))}</div>`),e.join("")}function f_(t){let e=t.compileResult?.highRiskItems||[];return e.length?e.map((r,s)=>{let n=t.riskConfirmations?.[String(s)]!==!1;return`<label class="yyt-assistant-risk-item"><input type="checkbox" class="yyt-assistant-risk-cb" data-turn-id="${st(t.id)}" data-risk-idx="${s}" ${n?"checked":""}><span>${st(r.label)}</span></label>`}).join(""):'<div class="yyt-assistant-hint">\u65E0\u9AD8\u98CE\u9669\u64CD\u4F5C</div>'}function g_(){return tt.length?tt.map((t,e)=>{let r=e===tt.length-1;if(t.type==="user")return`<div class="yyt-assistant-bubble yyt-assistant-bubble-user"><div class="yyt-assistant-label">\u4F60</div><div class="yyt-assistant-content">${st(t.content)}</div></div>`;if(t.type==="error")return`<div class="yyt-assistant-bubble yyt-assistant-bubble-error"><div class="yyt-assistant-label" style="color:#ff8888;">\u6267\u884C\u9519\u8BEF</div><div class="yyt-assistant-content">${st(t.errorMessage)}</div></div>`;if(t.type==="assistant"){let s=t.draft,n=t.compileResult,o=s?.summary||"\uFF08\u65E0\u6458\u8981\uFF09",a=s?.warnings||[],i=p_(n?.diff),l=!!t.isFinal,c=n?.highRiskItems?.length||0,d=c===0||t.riskConfirmations&&n.highRiskItems.every((m,h)=>t.riskConfirmations[String(h)]!==!1),u=r&&l,y=t.expanded||!1,p=t.sessionInfo||"",g='<div class="yyt-assistant-bubble yyt-assistant-bubble-ai">';return g+=`<div class="yyt-assistant-label">AI \u52A9\u624B${p?` \xB7 ${st(p)}`:""}</div>`,g+=`<div class="yyt-assistant-content">${st(o)}</div>`,g+=`<div class="yyt-assistant-toggle" data-turn-id="${st(t.id)}">${y?"\u25BC":"\u25B6"} \u8BE6\u60C5 (${st(i)})</div>`,g+=`<div class="yyt-assistant-detail" data-turn-id="${st(t.id)}" style="display:${y?"block":"none"};">`,a.length&&(g+=`<div><strong>\u8B66\u544A</strong><ul>${a.map(m=>`<li>${st(m)}</li>`).join("")}</ul></div>`),g+=y_(n?.diff),l&&c>0?g+=`<div><strong>\u9AD8\u98CE\u9669\u786E\u8BA4</strong><div class="yyt-assistant-risk-list">${f_(t)}</div></div>`:c>0&&(g+=`<div><strong>\u9AD8\u98CE\u9669\u9879</strong><ul>${n.highRiskItems.map(m=>`<li>${st(m.label)}</li>`).join("")}</ul></div>`),g+="</div>",u&&(g+=`<button class="yyt-btn yyt-btn-primary yyt-btn-small yyt-assistant-apply-btn" type="button" data-turn-id="${st(t.id)}" ${d?"":"disabled"}>\u5E94\u7528\u5230\u5DE5\u4F5C\u53F0</button>`),g+="</div>",g}return""}).join(""):'<div class="yyt-assistant-empty">AI \u6539\u8868\u52A9\u624B\u5DF2\u5C31\u7EEA\u3002\u8F93\u5165\u4FEE\u6539\u9700\u6C42\u540E\u53D1\u9001\u3002</div>'}function m_(){let t=[];try{t=_l()||[]}catch{}return[{value:"",label:"\u8DDF\u968F\u586B\u8868\u5DE5\u4F5C\u53F0"},...t.map(e=>({value:e,label:e}))]}function h_(){return m_().map(t=>`<option value="${st(t.value)}" ${String(t.value)===Jd?"selected":""}>${st(t.label)}</option>`).join("")}function b_(){let t=Xn||!Zn.trim();return`
    <div id="yyt-assistant-panel" class="yyt-assistant-panel">
      <div class="yyt-assistant-header">
        <div>
          <div class="yyt-assistant-title">AI \u6539\u8868\u52A9\u624B</div>
          <div class="yyt-assistant-hint">\u5F53\u524D\u8868\uFF1A${st(u_())}</div>
        </div>
        <button class="yyt-btn yyt-btn-secondary yyt-btn-small" type="button" data-action="close-assistant">\u5173\u95ED</button>
      </div>
      <div class="yyt-assistant-chat">
        ${g_()}
      </div>
      <div class="yyt-assistant-footer">
        <div id="yyt-assistant-control-slot" class="yyt-assistant-controls">
          <label class="yyt-assistant-inline-field" for="yyt-assistant-preset">
            <span>API \u9884\u8BBE</span>
            <select class="yyt-select yyt-assistant-preset-select" id="yyt-assistant-preset">${h_()}</select>
          </label>
          <label class="yyt-assistant-inline-field" for="yyt-assistant-max-rounds">
            <span>\u6700\u5927\u8F6E\u6B21</span>
            <input class="yyt-input yyt-assistant-rounds-input" id="yyt-assistant-max-rounds" type="number" min="1" value="${st(Vd)}">
          </label>
        </div>
        <textarea class="yyt-textarea yyt-assistant-textarea" id="yyt-assistant-input" placeholder="\u4F8B\u5982\uFF1A\u65B0\u589E\u4E00\u5F20\u6218\u5229\u54C1\u8868\uFF0C\u5173\u95ED\u80CC\u5305\u7269\u54C1\u8868\u7684\u72EC\u7ACB\u5BFC\u51FA\u3002">${st(Zn)}</textarea>
        <div class="yyt-assistant-actions">
          <button class="yyt-btn yyt-btn-primary" id="yyt-assistant-send" type="button" ${t?"disabled":""}>${Xn?"\u751F\u6210\u4E2D...":"\u53D1\u9001"}</button>
          <button class="yyt-btn yyt-btn-small" id="yyt-assistant-stop" type="button" ${Xn?"":"disabled"}>\u505C\u6B62</button>
        </div>
      </div>
    </div>
  `}function Xd(){return Hd?Hd.querySelector("#"+Th):d_().getElementById(Th)}function Qn(){let t=Xd();t&&(t.innerHTML=b_(),x_())}function x_(){let t=Xd();t&&(t.querySelector("#yyt-assistant-input")?.addEventListener("input",e=>{Zn=e.target.value||"";let r=t.querySelector("#yyt-assistant-send");r&&(r.disabled=Xn||!Zn.trim())}),t.querySelector("#yyt-assistant-preset")?.addEventListener("change",e=>{Jd=e.target.value||""}),t.querySelector("#yyt-assistant-max-rounds")?.addEventListener("input",e=>{Vd=e.target.value||String(Yd)}),t.querySelector("#yyt-assistant-send")?.addEventListener("click",w_),t.querySelector("#yyt-assistant-stop")?.addEventListener("click",v_),t.querySelector('[data-action="close-assistant"]')?.addEventListener("click",T_),t.querySelectorAll(".yyt-assistant-toggle").forEach(e=>{e.addEventListener("click",()=>{let r=e.getAttribute("data-turn-id"),s=tt.find(n=>n.id===r&&n.type==="assistant");s&&(s.expanded=!s.expanded,Qn())})}),t.querySelectorAll(".yyt-assistant-risk-cb").forEach(e=>{e.addEventListener("change",()=>{let r=e.getAttribute("data-turn-id"),s=Number(e.getAttribute("data-risk-idx")),n=tt.find(a=>a.id===r&&a.type==="assistant");if(!n)return;n.riskConfirmations||(n.riskConfirmations={}),n.riskConfirmations[String(s)]=e.checked;let o=t.querySelector(`.yyt-assistant-apply-btn[data-turn-id="${r}"]`);if(o){let a=(n.compileResult?.highRiskItems||[]).every((i,l)=>n.riskConfirmations[String(l)]!==!1);o.disabled=!a}})}),t.querySelectorAll(".yyt-assistant-apply-btn").forEach(e=>{e.addEventListener("click",async()=>{let r=e.getAttribute("data-turn-id"),s=tt.find(a=>a.id===r&&a.type==="assistant");if(!s?.result)return;let n=s.compileResult?.highRiskItems||[],o=n.every((a,i)=>s.riskConfirmations?.[String(i)]!==!1);if(n.length&&!o){tn.warn("\u8BF7\u5148\u786E\u8BA4\u6240\u6709\u9AD8\u98CE\u9669\u9879",null,{toast:"warning"});return}try{if(await wh(s.result)){tn.info("assistant \u8349\u7A3F\u5DF2\u5E94\u7528\u5230\u5DE5\u4F5C\u53F0",null,{toast:"success"});let i=s.compileResult?.focusTableId;if(i)try{let l=be();l&&(!l.scope||l.scope.activeTableId!==i)&&(l.scope={...l.scope||{},activeTableId:i},Je(l))}catch{}typeof Gd=="function"&&Gd(),Qn()}else tn.warn("\u5F53\u524D\u7ED3\u6784\u5DF2\u53D8\u5316\uFF0Cassistant \u8349\u7A3F\u5DF2\u5931\u6548\uFF0C\u8BF7\u91CD\u65B0\u751F\u6210\u3002",null,{toast:"warning"})}catch(a){tn.error("\u5E94\u7528\u5931\u8D25",a,{toast:"error"})}})}))}async function w_(){let t=Zn.trim();if(!t)return;let e=be(),r=e?.scope?.activeTableId||"";if(!r){tn.warn("\u8BF7\u5148\u9009\u4E2D\u4E00\u4E2A\u8868\u540E\u518D\u4F7F\u7528 AI \u6539\u8868\u52A9\u624B",null,{toast:"warning"});return}let s=S_(),n={type:"user",id:tl(),content:t};tt.push(n),Zn="",Xn=!0;let o=el+1;rl=jd(),el=o,Qn();try{let a=await xh({config:oe(e),currentTableId:r,userRequest:t,priorTurns:s,apiPreset:Jd,maxRounds:Qi(Vd,Yd),guard:rl.createRunGuard(),onRoundComplete:c=>{if(o!==el)return;let d={type:"assistant",id:tl(),draft:c.round.draft,aiRawText:c.round.aiRawText,compileResult:c.round.perRoundCompileResult,sessionInfo:`\u7B2C ${c.round.round}/${c.maxRounds} \u8F6E`,isFinal:!1,expanded:!1,riskConfirmations:{}};tt.push(d),Qn()}});if(o!==el)return;let i={type:"assistant",id:tl(),draft:a.draft,aiRawText:a.aiRawText,compileResult:a.compileResult,sessionInfo:a.session?`${a.session.roundsExecuted}\u8F6E \xB7 ${a.session.stopReason}`:"",isFinal:!0,expanded:!1,riskConfirmations:{},result:a},l=tt.findLastIndex(c=>c.type==="assistant"&&!c.isFinal);l>=0?tt[l]=i:tt.push(i)}catch(a){if(a instanceof en){tn.warn(a.message,null,{toast:"warning"});return}tt.push({type:"error",id:tl(),errorMessage:a?.message||"\u751F\u6210\u5931\u8D25"}),tn.error("\u6539\u8868\u52A9\u624B\u6267\u884C\u5931\u8D25",a,{toast:"error"})}finally{Xn=!1,Qn()}}function v_(){rl&&rl.cancel()}function T_(){Sh=!1;let t=Xd();t&&(t.style.display="none"),typeof qd=="function"&&qd()}function S_(){let t=[];for(let e=0;e<tt.length;e++){let r=tt[e];if(r.type==="user"){let s;for(let n=e+1;n<tt.length&&tt[n].type!=="user";n++)tt[n].type==="assistant"&&tt[n].isFinal&&(s=tt[n].aiRawText);t.push({user:r.content,assistant:s})}}return t}function _h(t,e,r){e&&(Hd=e),typeof t=="function"&&(Gd=t),qd=r||null,Sh=!0,Qn()}function Ah(){return`
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
  `}var tn,Th,Yd,Hd,Gd,qd,Sh,Xn,Zn,Vd,Jd,rl,tt,el,Eh=N(()=>{H();vh();qt();Le();Zi();an();tn=C.createScope("TableAssistantUI");Th="yyt-assistant-host",Yd=3,Hd=null,Gd=null,qd=null,Sh=!1,Xn=!1,Zn="",Vd=String(Yd),Jd="",rl=null,tt=[],el=0});function Q(){return Zd||(Zd=C.createScope("TableDataEditor")),Zd}function ze(){I.isDirty=!0;try{I._refs.saveBtn?.setDisabled(!1),I._refs.dirtyBadge&&(I._refs.dirtyBadge.style.display="inline-flex")}catch{}}function kh(){I.isDirty=!1;try{I._refs.saveBtn?.setDisabled(!0),I._refs.dirtyBadge&&(I._refs.dirtyBadge.style.display="none")}catch{}}function ut(){let t=Array.isArray(I.tempData)?I.tempData:[],e=I.currentTableIndex;return e>=0&&e<t.length?t[e]:null}function A_(){if(!eu)try{let t=window.parent&&window.parent.document?window.parent.document:document,e=t.head||t.documentElement;if(e.querySelector("#yyt-tde-styles")){eu=!0;return}let r=t.createElement("style");r.id="yyt-tde-styles",r.textContent=__,e.appendChild(r),eu=!0}catch(t){Q().warn("\u6CE8\u5165\u6570\u636E\u7F16\u8F91\u5668\u6837\u5F0F\u5931\u8D25",t)}}function ru(){let t=[],e=null,r=!1,s=I._afterSaveGlobalAt&&Date.now()-I._afterSaveGlobalAt<5*60*1e3;try{let n=Vs(null);Q().info("loadEditorData snapshot",{hasSnapshot:!!n,messageId:n?.message?.message_id??n?.sourceMessageId,chatId:n?.chatId,isolationKey:n?.tableState?.meta?.isolationKey,hasTableState:!!n?.tableState,tableStateTablesLen:Array.isArray(n?.tableState?.tables)?n.tableState.tables.length:null,firstTableNameInSlot:n?.tableState?.tables?.[0]?.name,afterSaveGlobalRecent:s}),!s&&Array.isArray(n?.tableState?.tables)&&n.tableState.tables.length>0&&(t=n.tableState.tables),e=n?{chatId:n.chatId||"",sourceMessageId:n.sourceMessageId||n.message?.message_id||"",sourceSwipeId:n.sourceSwipeId||"",effectiveSwipeId:n.effectiveSwipeId||"",slotBindingKey:n.slotBindingKey||"",slotRevisionKey:n.slotRevisionKey||"",slotTransactionId:n.slotTransactionId||"",traceId:n.traceId||"",targetMessageIndex:n.targetMessageIndex??-1}:null}catch(n){Q().warn("loadEditorData \u5F02\u5E38",n)}if(t.length===0)try{let o=Dn({})?.template?.tables;Array.isArray(o)&&o.length>0&&(t=oe(o),r=!0)}catch(n){Q().warn("\u4ECE\u6A21\u677F fallback \u5931\u8D25",n)}I.tempData=oe(t)||[],I.targetSnapshot=e,I.isDirty=!1,I.isFromTemplate=r,I._pendingMirrorTag=null,I.currentTableIndex>=I.tempData.length?I.currentTableIndex=I.tempData.length>0?0:-1:I.currentTableIndex<0&&I.tempData.length>0&&(I.currentTableIndex=0)}function E_(){let t=f("div",{className:"yyt-tde-toolbar"}),e=f("div",{className:"yyt-tde-toolbar-left"}),r=f("div",{className:"yyt-tde-mode-switch"}),s=[{key:"data",label:"\u6570\u636E\u7F16\u8F91"},{key:"schema",label:"\u7ED3\u6784\u914D\u7F6E"},{key:"global",label:"\u5168\u5C40\u6CE8\u5165"}];for(let u of s){let y=q({label:u.label,variant:I.mode===u.key?"primary":"ghost",size:"small",onClick:()=>{I.mode!==u.key&&(I.mode=u.key,je())}});r.appendChild(y.el)}e.appendChild(r);let n=f("span",{className:"yyt-tde-dirty-badge",text:"\u672A\u4FDD\u5B58"});I.isDirty&&(n.style.display="inline-flex"),e.appendChild(n),I._refs.dirtyBadge=n;let o=f("div",{className:"yyt-tde-actions"}),a=q({label:"\u91CD\u65B0\u52A0\u8F7D",icon:"\u21BB",size:"small",onClick:D_}),i=q({label:"\u4FDD\u5B58\u5230 chat",icon:"\u{1F4BE}",size:"small",disabled:!I.isDirty,title:"\u4FDD\u5B58\u5230\u5F53\u524D\u6D88\u606F\u7684 slot",onClick:L_});I._refs.saveBtn=i;let l=q({label:"\u4FDD\u5B58\u5230\u5168\u5C40",icon:"\u{1F310}",size:"small",title:"\u4FDD\u5B58\u5230\u5168\u5C40\u6FC0\u6D3B\u6A21\u677F\uFF08\u5F71\u54CD\u6240\u6709 chat \u540E\u7EED\u586B\u8868\uFF09",onClick:B_});I._refs.saveGlobalBtn=l;let c=q({label:"\u7ACB\u5373\u586B\u8868",icon:"\u25B6",variant:"primary",size:"small",onClick:z_}),d=q({label:"AI \u6539\u8868\u52A9\u624B",icon:"\u2726",size:"small",variant:I._assistantOpen?"primary":"ghost",title:"\u7528\u81EA\u7136\u8BED\u8A00\u4FEE\u6539\u8868\u7ED3\u6784\u3001AI \u6307\u4EE4\u548C\u914D\u7F6E",onClick:O_});return o.appendChild(a.el),o.appendChild(i.el),o.appendChild(l.el),o.appendChild(c.el),o.appendChild(d.el),t.appendChild(e),t.appendChild(o),t}function C_(){let t=f("div",{className:"yyt-tde-sidebar"}),e=I.tempData||[];t.appendChild(f("div",{className:"yyt-tde-sidebar-label",text:`\u8868\u683C\u5217\u8868 (${e.length})`}));let r=f("div",{className:"yyt-tde-sheet-list"});return e.length===0?r.appendChild(f("div",{text:"\u6682\u65E0\u8868",style:{padding:"8px 10px",fontSize:"11px",color:"var(--tde-text-muted)"}})):e.forEach((s,n)=>{let o=n===I.currentTableIndex,a=s?.name||`\u8868 ${n+1}`,i=Array.isArray(s?.rows)?s.rows.length:0,l=f("div",{className:`yyt-tde-sheet-row${o?" active":""}`}),c=f("div",{className:"yyt-tde-sheet-pick"});c.appendChild(f("span",{className:"yyt-tde-sheet-idx",text:`[${n}]`})),c.appendChild(f("span",{className:"yyt-tde-sheet-name",text:a})),c.appendChild(f("span",{className:"yyt-tde-sheet-count",text:String(i)})),c.addEventListener("click",()=>{I.currentTableIndex!==n&&(I.currentTableIndex=n,je())}),l.appendChild(c);let d=f("div",{className:"yyt-tde-sheet-actions"});d.appendChild(q({label:"\u2191",size:"small",variant:"ghost",disabled:n===0,title:"\u4E0A\u79FB",onClick:()=>Ih(n,-1)}).el),d.appendChild(q({label:"\u2193",size:"small",variant:"ghost",disabled:n===e.length-1,title:"\u4E0B\u79FB",onClick:()=>Ih(n,1)}).el),d.appendChild(q({label:"\xD7",size:"small",variant:"danger",title:"\u5220\u9664\u6B64\u8868",onClick:()=>K_(n)}).el),l.appendChild(d),r.appendChild(l)}),t.appendChild(r),t.appendChild(q({label:"+ \u6DFB\u52A0\u65B0\u8868",size:"small",variant:"ghost",onClick:U_}).el),t}function I_(){let t=f("main",{className:"yyt-tde-main"}),e=I.tempData||[];if(I.mode==="global")return t.appendChild(M_()),t;if(e.length===0)return t.appendChild(f("div",{className:"yyt-tde-empty",html:'\u5F53\u524D slot \u6CA1\u6709\u8868\u6570\u636E\uFF0C\u6A21\u677F\u4E5F\u672A\u914D\u7F6E\u8868\u3002<br>\u8BF7\u5148\u5728\u5DE5\u4F5C\u53F0\u70B9"\u7ACB\u5373\u586B\u8868"\u8BA9 AI \u521D\u59CB\u5316\uFF0C\u6216\u5230\u300C\u9884\u8BBE\u7BA1\u7406 \u2192 \u8868\u683C\u6A21\u677F\u300D\u914D\u7F6E\u6A21\u677F\u3002'})),t;let r=ut();return r?(I.mode==="data"?t.appendChild(k_(r)):I.mode==="schema"&&t.appendChild(R_(r)),t):(t.appendChild(f("div",{className:"yyt-tde-empty",text:"\u8BF7\u4ECE\u5DE6\u4FA7\u9009\u62E9\u4E00\u5F20\u8868\u3002"})),t)}function k_(t){let e=f("div"),r=Array.isArray(t?.columns)?t.columns:[],s=Array.isArray(t?.rows)?t.rows:[],n=I.targetSnapshot?.chatId||"",o=t?.uid||t?.id||"",a={cols:{},rows:{},cells:{},indexCol:!1};try{a=qn({chatId:n,isolationKey:ne.getKey()},o)||a}catch{}let i=a?.rows||{},l=a?.cells||{};I.isFromTemplate&&e.appendChild(f("div",{className:"yyt-tde-schema-hint",html:'\u5F53\u524D\u663E\u793A<b>\u6A21\u677F\u9ED8\u8BA4\u7ED3\u6784</b>\uFF08slot \u5C1A\u65E0\u6570\u636E\uFF09\u3002\u76F4\u63A5\u6DFB\u52A0\u884C\u6216\u7F16\u8F91\u4F1A\u521B\u5EFA slot \u6570\u636E\uFF1B\u6216\u5DE5\u4F5C\u53F0\u70B9"\u7ACB\u5373\u586B\u8868"\u8BA9 AI \u586B\u3002'}));let c=f("div",{className:"yyt-tde-card-grid"});s.forEach((u,y)=>{let p=u?.cells||{},g=!!i[y],m=f("article",{className:`yyt-tde-card${g?" yyt-tde-row-locked":""}`}),h=f("header",{className:"yyt-tde-card-header"});h.appendChild(f("span",{className:"yyt-tde-card-index",text:`#${y+1}`}));let x=f("div",{className:"yyt-tde-card-name-slot"}),v=ge({value:u?.name||"",placeholder:"\u884C\u540D",disabled:g,onInput:E=>{let w=ut();w?.rows?.[y]&&(w.rows[y].name=E,ze())}});x.appendChild(v.el),h.appendChild(x);let T=f("div",{className:"yyt-tde-card-actions"});T.appendChild(q({label:g?"\u{1F512}":"\u{1F513}",size:"small",variant:g?"danger":"ghost",title:g?"\u5DF2\u9501\u5B9A\u6B64\u884C\uFF08\u70B9\u51FB\u89E3\u9501\uFF09":"\u9501\u5B9A\u6B64\u884C\uFF08AI \u4E0D\u4F1A\u6539\uFF09",onClick:()=>j_(o,y)}).el),T.appendChild(q({label:"\u{1F5D1}",size:"small",variant:"danger",disabled:g,title:"\u5220\u9664\u884C",onClick:()=>W_(y)}).el),h.appendChild(T),m.appendChild(h);let A=f("div",{className:"yyt-tde-card-body"});r.length===0?A.appendChild(f("div",{text:"\u8BE5\u8868\u6CA1\u6709\u5217\u5B9A\u4E49",style:{padding:"8px",color:"var(--tde-text-muted)",fontSize:"12px"}})):r.forEach(E=>{let w=E?.key||"",P=E?.title||w,$=p[w],B=$==null||$==="",R=B?"\uFF08\u7A7A\uFF09":String($),_=!!l[`${y}::${w}`],k=f("div",{className:`yyt-tde-field${_?" yyt-tde-cell-locked":""}`}),K=f("div",{className:"yyt-tde-field-label"});K.appendChild(f("span",{text:P})),K.appendChild(q({label:_?"\u{1F512}":"\u{1F513}",size:"small",variant:_?"danger":"ghost",title:_?"\u5DF2\u9501\u5B9A\u6B64\u5355\u5143\u683C":"\u9501\u5B9A\u6B64\u5355\u5143\u683C\uFF08AI \u4E0D\u4F1A\u6539\uFF09",onClick:()=>F_(o,y,w)}).el),k.appendChild(K);let Y=f("div",{className:`yyt-tde-field-cell${B?" yyt-tde-field-cell--empty":""}${_?" yyt-tde-cell-locked-bg":""}`,text:R,attrs:{contenteditable:_?"false":"true"}});Y.addEventListener("input",()=>{let ue=ut();ue?.rows?.[y]&&(ue.rows[y].cells||(ue.rows[y].cells={}),ue.rows[y].cells[w]=Y.textContent,ze())}),k.appendChild(Y),A.appendChild(k)}),m.appendChild(A),c.appendChild(m)});let d=f("div",{className:"yyt-tde-card-add"});return d.appendChild(q({label:"+ \u6DFB\u52A0\u884C",variant:"ghost",onClick:H_}).el),c.appendChild(d),e.appendChild(c),e}function R_(t){let e=f("div"),r=Array.isArray(t?.columns)?t.columns:[],s=t?.sourceData||{},n=t?.aiInstructions||{},o=t?.updateConfig||{},a=I.targetSnapshot?.chatId||"",i=t?.uid||t?.id||"",l={cols:{},rows:{},cells:{},indexCol:!1};try{l=qn({chatId:a,isolationKey:ne.getKey()},i)||l}catch{}let c=l?.cols||{},d=f("div",{className:"yyt-tde-schema-section"});d.appendChild(f("div",{className:"yyt-tde-schema-heading",text:"\u57FA\u7840\u4FE1\u606F"}));let u=f("div",{className:"yyt-tde-schema-row"});u.appendChild(f("div",{className:"yyt-tde-schema-key",text:"\u8868\u540D"}));let y=f("div",{className:"yyt-tde-schema-value"});y.appendChild(ge({value:t?.name||"",onInput:$=>{let B=ut();B&&(B.name=$,ze())}}).el),u.appendChild(y),d.appendChild(u);let p=f("div",{className:"yyt-tde-schema-row"});p.appendChild(f("div",{className:"yyt-tde-schema-key",text:"UID"})),p.appendChild(f("code",{text:t?.uid||t?.id||"",style:{fontSize:"11px",color:"var(--tde-accent)"}})),d.appendChild(p);let g=f("div",{className:"yyt-tde-schema-row",style:{alignItems:"flex-start"}});g.appendChild(f("div",{className:"yyt-tde-schema-key",text:"\u8868\u8BF4\u660E"}));let m=f("div",{className:"yyt-tde-schema-value"});m.appendChild(sl({value:t?.note||s?.note||"",placeholder:"\u8868\u7528\u9014\u8BF4\u660E + \u5217\u6CE8\u91CA",onInput:$=>{let B=ut();B&&(B.note=$,ze())}})),g.appendChild(m),d.appendChild(g),e.appendChild(d);let h=f("div",{className:"yyt-tde-schema-section"});h.appendChild(f("div",{className:"yyt-tde-schema-heading",text:"AI \u64CD\u4F5C\u8BF4\u660E (sourceData)"}));let x=[{key:"init",label:"\u521D\u59CB\u5316 (init)",placeholder:"\u8868\u4E3A\u7A7A\u65F6 AI \u5E94\u8BE5\u63D2\u5165\u4EC0\u4E48",legacy:"initNode"},{key:"create",label:"\u65B0\u589E (insert)",placeholder:"\u4EC0\u4E48\u60C5\u51B5\u4E0B AI \u5E94\u8BE5\u65B0\u589E\u884C",legacy:"insertNode"},{key:"update",label:"\u66F4\u65B0 (update)",placeholder:"\u4EC0\u4E48\u60C5\u51B5\u4E0B AI \u5E94\u8BE5\u66F4\u65B0\u884C",legacy:"updateNode"},{key:"delete",label:"\u5220\u9664 (delete)",placeholder:"\u4EC0\u4E48\u60C5\u51B5\u4E0B AI \u5E94\u8BE5\u5220\u9664\u884C",legacy:"deleteNode"}];for(let $ of x){let B=f("div",{className:"yyt-tde-schema-row",style:{alignItems:"flex-start"}});B.appendChild(f("div",{className:"yyt-tde-schema-key",text:$.label}));let R=f("div",{className:"yyt-tde-schema-value"});R.appendChild(sl({value:n?.[$.key]||s?.[$.legacy]||"",placeholder:$.placeholder,onInput:_=>{let k=ut();k&&(k.aiInstructions=k.aiInstructions||{},k.aiInstructions[$.key]=_,ze())}})),B.appendChild(R),h.appendChild(B)}e.appendChild(h);let v=f("div",{className:"yyt-tde-schema-section"});v.appendChild(f("div",{className:"yyt-tde-schema-heading",text:"\u66F4\u65B0\u914D\u7F6E (updateConfig)"})),v.appendChild(f("div",{className:"yyt-tde-hint",style:{marginBottom:"8px",fontSize:"11px",color:"var(--tde-text-muted)"},html:"<strong>\u8BF4\u660E</strong>\uFF1A\u8FD9\u91CC\u914D\u7F6E AI \u586B\u8868\u65F6\u8FD9\u5F20\u8868\u7684\u884C\u4E3A\uFF08\u9891\u7387\u3001\u4E0A\u4E0B\u6587\u6DF1\u5EA6\u3001token \u8282\u7701\uFF09\u3002\u8DDF\u300C\u4E16\u754C\u4E66\u6CE8\u5165\u300D\u662F\u4E24\u4EF6\u4E8B\uFF1A\u4E16\u754C\u4E66\u662F\u628A\u8868\u6570\u636E\u585E\u8FDB prompt \u7ED9\u4E3B AI \u770B\uFF08\u5408\u5E76\u6761\u76EE / \u72EC\u7ACB\u6761\u76EE\u5728<strong>\u5168\u5C40\u6CE8\u5165</strong> tab \u914D\uFF09\uFF0C\u8FD9\u91CC\u662F\u63A7\u5236<strong>\u586B\u8868\u65F6\u673A</strong>\uFF08\u591A\u4E45\u586B\u4E00\u6B21\u3001\u8DF3\u8FC7\u51E0\u5C42\u7B49\uFF09\u3002-1 = \u6CBF\u7528\u5168\u5C40\uFF0C0 = \u7981\u7528\u5355\u8868\u3002"}));let T=f("div",{className:"yyt-tde-uc-grid"}),A=[{key:"contextDepth",label:"\u4E0A\u4E0B\u6587\u6DF1\u5EA6 (contextDepth)",hint:"-1 = \u6CBF\u7528\u5168\u5C40\uFF0C0 = \u7981\u7528\uFF0CN = \u6700\u8FD1 N \u6761\u6D88\u606F"},{key:"updateFrequency",label:"\u66F4\u65B0\u9891\u7387 (updateFrequency)",hint:"-1 = \u6CBF\u7528\u5168\u5C40\uFF0C0 = \u7981\u7528\u81EA\u52A8\u586B\u8868\uFF0CN = \u6BCF N \u6761\u6D88\u606F\u89E6\u53D1\u4E00\u6B21"},{key:"batchSize",label:"\u6279\u6B21\u5927\u5C0F (batchSize)",hint:"-1 = \u6CBF\u7528\u5168\u5C40\uFF0CN = \u5355\u6B21\u6700\u591A\u5904\u7406 N \u5F20\u8868"},{key:"skipFloors",label:"\u8DF3\u8FC7\u697C\u5C42 (skipFloors)",hint:"-1 = \u6CBF\u7528\u5168\u5C40\uFF0CN = \u8DF3\u8FC7\u6700\u8FD1 N \u5C42"},{key:"sendLatestRows",label:"\u53D1\u9001\u6700\u65B0 N \u884C (sendLatestRows)",hint:"-1 = \u5168\u90E8\u53D1\u9001\uFF0C0 = \u6CBF\u7528\u5168\u5C40\uFF0CN = \u4EC5\u53D1\u9001\u6700\u65B0 N \u884C\uFF08\u5927\u8868 token \u8282\u7701\uFF09"}];for(let $ of A){let B=f("div",{className:"yyt-tde-uc-cell"});B.appendChild(f("label",{text:$.label})),B.appendChild(ge({type:"number",value:Number.isFinite(o?.[$.key])?String(o[$.key]):"-1",onInput:R=>{let _=ut();if(!_)return;_.updateConfig=_.updateConfig||{};let k=Number(R);_.updateConfig[$.key]=Number.isFinite(k)?k:-1,ze()}}).el),B.appendChild(f("span",{className:"yyt-tde-hint",text:$.hint})),T.appendChild(B)}let E=f("div",{className:"yyt-tde-uc-cell"});E.appendChild(f("label",{text:"\u5206\u7EC4 ID (groupId)"})),E.appendChild(ge({value:o?.groupId||"",placeholder:"\u540C\u7EC4 ID \u7684\u8868\u4F1A\u5408\u5E76\u89E6\u53D1",onInput:$=>{let B=ut();B&&(B.updateConfig=B.updateConfig||{},B.updateConfig.groupId=$,ze())}}).el),E.appendChild(f("span",{className:"yyt-tde-hint",text:"\u540C\u7EC4\u540C\u65F6\u89E6\u53D1\uFF0C\u8DE8\u7EC4\u5E76\u884C\uFF08\u7559\u7A7A = \u72EC\u7ACB\u89E6\u53D1\uFF09"})),T.appendChild(E);let w=f("div",{className:"yyt-tde-uc-cell yyt-tde-uc-cell-wide"});w.appendChild(f("label",{text:"\u8868\u7EA7 API \u9884\u8BBE\u8986\u76D6"})),w.appendChild(ge({value:o?.apiPreset||"",placeholder:"\u7559\u7A7A = \u6CBF\u7528\u5168\u5C40\uFF0C\u586B\u9884\u8BBE\u540D = \u8FD9\u5F20\u8868\u7528\u8FD9\u4E2A",onInput:$=>{let B=ut();B&&(B.updateConfig=B.updateConfig||{},B.updateConfig.apiPreset=$,ze())}}).el),w.appendChild(f("span",{className:"yyt-tde-hint",text:"\u4F8B\uFF1A\u89D2\u8272\u8868\u7528 Claude\u3001\u7EAA\u8981\u8868\u7528 GPT"})),T.appendChild(w),v.appendChild(T),e.appendChild(v);let P=f("div",{className:"yyt-tde-schema-section"});return P.appendChild(f("div",{className:"yyt-tde-schema-heading",text:`\u5B57\u6BB5\u5B9A\u4E49 (${r.length})`})),r.length===0?P.appendChild(f("div",{text:"\u65E0\u5B57\u6BB5",style:{color:"var(--tde-text-muted)",fontSize:"12px",padding:"8px 0"}})):r.forEach(($,B)=>{let R=$?.key||"",_=R?!!c[R]:!1,k=f("div",{className:`yyt-tde-schema-field${_?" locked":""}`}),K=f("div",{className:"yyt-tde-schema-field-head"});K.appendChild(f("span",{className:"yyt-tde-schema-idx",text:`[${B}]`}));let Y=f("div",{className:"yyt-tde-field-input-title"});Y.appendChild(ge({value:$?.title||$?.key||"",placeholder:"\u5B57\u6BB5\u6807\u9898",onInput:Te=>{let Fe=ut();Fe?.columns?.[B]&&(Fe.columns[B].title=Te,ze())}}).el),K.appendChild(Y);let ue=f("div",{className:"yyt-tde-field-input-key"}),pe=ge({value:$?.key||"",placeholder:"key",style:{fontFamily:"monospace"},onInput:Te=>{let Fe=ut();Fe?.columns?.[B]&&(Fe.columns[B].key=Te,ze())}});ue.appendChild(pe.el),K.appendChild(ue);let te=f("div",{className:"yyt-tde-field-input-type"});te.appendChild(_e({value:$?.type||"text",options:["text","number","boolean","date","json"].map(Te=>({value:Te,label:Te})),onChange:Te=>{let Fe=ut();Fe?.columns?.[B]&&(Fe.columns[B].type=Te,ze())}}).el),K.appendChild(te),K.appendChild(q({label:_?"\u{1F512}":"\u{1F513}",size:"small",variant:_?"danger":"ghost",title:_?"\u5DF2\u9501\u5B9A\uFF1AAI \u4E0D\u4F1A\u6539\u8FD9\u5217\u3002\u70B9\u51FB\u89E3\u9501":"\u9501\u5B9A\u6B64\u5217\uFF1AAI \u6C38\u4E0D\u4FEE\u6539",onClick:()=>G_(i,R)}).el),K.appendChild(q({label:"\u{1F5D1}",size:"small",variant:"danger",title:"\u5220\u9664\u6B64\u5B57\u6BB5",onClick:()=>q_(B)}).el),k.appendChild(K),k.appendChild(sl({value:$?.description||"",placeholder:"\u5B57\u6BB5\u63CF\u8FF0",minHeight:"32px",onInput:Te=>{let Fe=ut();Fe?.columns?.[B]&&(Fe.columns[B].description=Te,ze())}})),P.appendChild(k)}),P.appendChild(q({label:"+ \u6DFB\u52A0\u5B57\u6BB5",variant:"ghost",onClick:Y_}).el),e.appendChild(P),e}function M_(){let t=f("div"),e=Array.isArray(I.tempData)?I.tempData:[];if(t.appendChild(f("div",{className:"yyt-tde-schema-hint",style:{background:"rgba(74,158,255,0.08)",borderColor:"rgba(74,158,255,0.3)"},html:"<strong>\u5168\u5C40\u6CE8\u5165\u914D\u7F6E</strong> \u2014 \u6BCF\u5F20\u8868\u7684 exportConfig\uFF08\u72EC\u7ACB\u4E16\u754C\u4E66\u6761\u76EE\uFF09+ placement\uFF08\u6CE8\u5165\u4F4D\u7F6E/\u6DF1\u5EA6/\u987A\u5E8F\uFF09\u3002\u672A\u542F\u7528\u300C\u72EC\u7ACB\u6CE8\u5165\u300D\u7684\u8868\u4F1A\u8D70\u5168\u5C40 wrapper\uFF08\u5DE5\u4F5C\u53F0\u300C\u540C\u6B65\u5230\u4E16\u754C\u4E66\u300D\u5F00\u5173\uFF09\u3002"})),e.length===0)return t.appendChild(f("div",{className:"yyt-tde-empty",text:"\u65E0\u8868\u683C\u53EF\u914D\u7F6E\u3002\u8BF7\u5148\u6DFB\u52A0\u8868\u683C\u3002"})),t;let r="yyt-table-workbench";try{r=be()?.mirrorTag||r}catch{}let s=f("div",{className:"yyt-tde-schema-section"});s.appendChild(f("div",{className:"yyt-tde-schema-heading",text:"\u5199\u56DE\u6B63\u6587\u6807\u7B7E"}));let n=f("div",{className:"yyt-tde-uc-grid"}),o=f("div",{className:"yyt-tde-uc-cell yyt-tde-uc-cell-wide"});return o.appendChild(f("label",{text:"mirrorTag"})),o.appendChild(ge({value:r,placeholder:"\u9ED8\u8BA4: yyt-table-workbench",onInput:a=>{I._pendingMirrorTag=a,ze()}}).el),o.appendChild(f("span",{className:"yyt-tde-hint",text:"\u5F00\u542F\u5199\u56DE\u6B63\u6587\u65F6\uFF0C\u7528\u6B64 XML \u6807\u7B7E\u5305\u88F9\u8868\u683C\u6570\u636E\u6CE8\u5165\u5230 assistant \u6D88\u606F"})),n.appendChild(o),s.appendChild(n),t.appendChild(s),e.forEach((a,i)=>{t.appendChild(P_(a,i))}),t}function P_(t,e){let r=t?.exportConfig||{},s=r.entryPlacement||{},n=r.extraIndexPlacement||{},o=r.enabled===!0,a=f("div",{className:"yyt-tde-global-card"}),i=f("div",{className:"yyt-tde-global-card-head"});i.appendChild(f("span",{className:"yyt-tde-global-card-name",text:t?.name||`\u8868 ${e+1}`}));let l=Ye({label:"\u542F\u7528\u72EC\u7ACB\u6CE8\u5165",checked:o,onChange:y=>{let p=I.tempData?.[e];p&&(p.exportConfig=p.exportConfig||{},p.exportConfig.enabled=y,ze(),je())}});i.appendChild(l.el),a.appendChild(i);let c=f("div",{className:`yyt-tde-global-card-body${o?"":" yyt-tde-disabled-section"}`}),d=f("div",{className:"yyt-tde-uc-grid"});d.appendChild(ps({label:"\u6761\u76EE\u540D (entryName)",control:ge({value:r.entryName||t?.name||"",onInput:y=>eo(e,"entryName",y)})})),d.appendChild(ps({label:"\u6761\u76EE\u7C7B\u578B (entryType)",control:_e({value:r.entryType||"constant",options:[{value:"constant",label:"constant (\u5E38\u9A7B)"},{value:"keyword",label:"keyword (\u5173\u952E\u8BCD\u89E6\u53D1)"}],onChange:y=>eo(e,"entryType",y)})})),d.appendChild(ps({label:"\u89E6\u53D1\u5173\u952E\u8BCD (keywords)",wide:!0,control:ge({value:r.keywords||"",placeholder:"\u7528\u9017\u53F7\u6216\u6362\u884C\u5206\u9694",onInput:y=>eo(e,"keywords",y)})})),d.appendChild(ps({label:"\u6309\u884C\u62C6\u5206 (splitByRow)",control:_e({value:r.splitByRow?"true":"false",options:[{value:"false",label:"\u5426\uFF08\u6574\u5F20\u8868\u4E00\u4E2A\u6761\u76EE\uFF09"},{value:"true",label:"\u662F\uFF08\u6BCF\u884C\u4E00\u4E2A\u6761\u76EE\uFF09"}],onChange:y=>eo(e,"splitByRow",y==="true")})})),d.appendChild(ps({label:"\u9632\u9012\u5F52 (preventRecursion)",control:_e({value:r.preventRecursion===!1?"false":"true",options:[{value:"true",label:"\u662F"},{value:"false",label:"\u5426"}],onChange:y=>eo(e,"preventRecursion",y!=="false")})}));let u=f("div",{className:"yyt-tde-uc-cell yyt-tde-uc-cell-wide"});return u.appendChild(f("label",{text:"\u6CE8\u5165\u6A21\u677F (injectionTemplate)"})),u.appendChild(sl({value:r.injectionTemplate||"",placeholder:"\u4F8B\uFF1A\u4EE5\u4E0B\u662F {{tableName}} \u7684\u6700\u65B0\u6570\u636E\uFF1A{{tableContent}}",onInput:y=>eo(e,"injectionTemplate",y)})),d.appendChild(u),c.appendChild(d),c.appendChild(f("div",{className:"yyt-tde-schema-heading",style:{marginTop:"12px"},text:"\u6761\u76EE\u4F4D\u7F6E (entryPlacement)"})),c.appendChild(Ch(e,"entryPlacement",s)),c.appendChild(f("div",{className:"yyt-tde-schema-heading",style:{marginTop:"12px"},text:"\u989D\u5916\u7D22\u5F15\u4F4D\u7F6E (extraIndexPlacement\uFF0C\u53EF\u9009)"})),c.appendChild(Ch(e,"extraIndexPlacement",n)),a.appendChild(c),a}function Ch(t,e,r){let s=f("div",{className:"yyt-tde-uc-grid"}),n=["before_character_definition","after_character_definition","before_authors_note","after_authors_note"];return s.appendChild(ps({label:"position",control:_e({value:r.position||"before_character_definition",options:n.map(o=>({value:o,label:o})),onChange:o=>tu(t,e,"position",o)})})),s.appendChild(ps({label:"depth",control:ge({type:"number",value:Number.isFinite(r.depth)?String(r.depth):"2",onInput:o=>tu(t,e,"depth",Number(o)||0)})})),s.appendChild(ps({label:"order",control:ge({type:"number",value:Number.isFinite(r.order)?String(r.order):"0",onInput:o=>tu(t,e,"order",Number(o)||0)})})),s}function ps({label:t,control:e,wide:r=!1,hint:s=null}){let n=f("div",{className:`yyt-tde-uc-cell${r?" yyt-tde-uc-cell-wide":""}`});return n.appendChild(f("label",{text:t})),n.appendChild(e.el),s&&n.appendChild(f("span",{className:"yyt-tde-hint",text:s})),n}function sl({value:t="",placeholder:e="",minHeight:r="60px",onInput:s=null}={}){let n=f("textarea",{className:"yyt-textarea",attrs:{placeholder:e},style:{minHeight:r}});return n.value=t,typeof s=="function"&&n.addEventListener("input",()=>s(n.value)),n}function eo(t,e,r){let s=I.tempData?.[t];s&&(s.exportConfig=s.exportConfig||{},s.exportConfig[e]=r,ze())}function tu(t,e,r,s){let n=I.tempData?.[t];n&&(n.exportConfig=n.exportConfig||{},n.exportConfig[e]=n.exportConfig[e]||{},n.exportConfig[e][r]=s,ze())}function N_(){let t=f("div",{className:"yyt-tde"});t.appendChild(E_());let e=f("div",{className:"yyt-tde-content"});e.appendChild(C_()),e.appendChild(I_());let r=f("div",{id:"yyt-assistant-host",className:"yyt-assistant-dock"});return r.style.display=I._assistantOpen?"flex":"none",e.appendChild(r),t.appendChild(e),t}function je(){if(!I.$window)return;let t=I.$window.find(".yyt-window-body");if(!t||!t.length)return;let e=t[0];if(e.innerHTML="",e.appendChild(N_()),$_(),I._assistantOpen){let r=e.querySelector(".yyt-tde-content"),s=r?.querySelector("#yyt-assistant-host");r&&s&&(s.style.display="flex",_h(()=>je(),r,()=>{I._assistantOpen=!1,je()}))}}function $_(){let t=I.$window?.[0]?.ownerDocument||document;if(!t)return;let e=t.getElementById("yyt-assistant-styles");e||(e=t.createElement("style"),e.id="yyt-assistant-styles",(t.head||t.documentElement).appendChild(e)),e.textContent=Ah()}function O_(){try{I._assistantOpen=!I._assistantOpen,je()}catch(t){Q().error("toggleAssistant \u5F02\u5E38",t)}}function D_(){if(I.isDirty&&!window.confirm("\u6709\u672A\u4FDD\u5B58\u4FEE\u6539\uFF0C\u91CD\u65B0\u52A0\u8F7D\u5C06\u4E22\u5F03\uFF0C\u786E\u5B9A\uFF1F"))return;let t=I.tempData?.[0];Q().info("reload \u89E6\u53D1",{before:{tableCount:I.tempData?.length,firstName:t?.name,firstAiInit:t?.aiInstructions?.init?.slice(0,50),firstUcFreq:t?.updateConfig?.updateFrequency},targetSnapshot:{messageId:I.targetSnapshot?.sourceMessageId,isFromTemplate:I.isFromTemplate}}),ru();let e=I.tempData?.[0];Q().info("reload \u5B8C\u6210",{after:{tableCount:I.tempData?.length,firstName:e?.name,firstAiInit:e?.aiInstructions?.init?.slice(0,50),firstUcFreq:e?.updateConfig?.updateFrequency,isFromTemplate:I.isFromTemplate}}),je(),Q().info("\u5DF2\u91CD\u65B0\u52A0\u8F7D",null,{toast:"success"})}async function L_(){if(!I.isDirty){Q().info("\u6CA1\u6709\u4FEE\u6539",null,{toast:!0});return}try{let t=I.targetSnapshot;if(t?.sourceMessageId||(t=await wd()),!t?.sourceMessageId){Q().error("\u65E0\u6CD5\u5B9A\u4F4D\u5F53\u524D\u6D88\u606F\uFF08\u627E\u4E0D\u5230 assistant \u6D88\u606F\uFF09",null,{toast:!0});return}let e=await Bi(t,{tables:oe(I.tempData)||[],meta:{source:"data-editor-manual-save"}},{skipFreshValidation:!0});Q().info("save-chat commitBoundState \u7ED3\u679C",{success:e?.success,error:e?.error,commitMessageId:e?.sourceMessageId,commitSlotRevisionKey:e?.slotRevisionKey,stateTablesLen:Array.isArray(e?.state?.tables)?e.state.tables.length:null,firstTableInState:e?.state?.tables?.[0]?.name,firstAiInitInState:e?.state?.tables?.[0]?.aiInstructions?.init?.slice(0,50)}),e?.success?(kh(),I.targetSnapshot={chatId:e.state?.chatId||t.chatId,sourceMessageId:e.sourceMessageId,sourceSwipeId:e.state?.sourceSwipeId||t.sourceSwipeId,effectiveSwipeId:t.effectiveSwipeId,slotBindingKey:e.state?.slotBindingKey||t.slotBindingKey,slotRevisionKey:e.slotRevisionKey,slotTransactionId:t.slotTransactionId,traceId:t.traceId,targetMessageIndex:e.messageIndex??t.targetMessageIndex},Array.isArray(e?.state?.tables)&&(I.tempData=oe(e.state.tables)||[],I.isFromTemplate=!1),I._afterSaveGlobalAt=0,Q().info("\u5DF2\u4FDD\u5B58\u5230 chat",null,{toast:"success"}),je()):Q().error(`\u4FDD\u5B58\u5931\u8D25\uFF1A${e?.error||"\u672A\u77E5"}`,null,{toast:!0})}catch(t){Q().error("\u4FDD\u5B58\u5F02\u5E38",t),Q().error(`\u4FDD\u5B58\u5F02\u5E38\uFF1A${t?.message||t}`,null,{toast:!0})}}async function B_(){if(!Array.isArray(I.tempData)||I.tempData.length===0){Q().info("\u6CA1\u6709\u53EF\u4FDD\u5B58\u7684\u6570\u636E",null,{toast:!0});return}if(window.confirm("\u4FDD\u5B58\u5230\u300C\u5168\u5C40\u6FC0\u6D3B\u6A21\u677F\u300D\u4F1A\u5F71\u54CD\u540E\u7EED\u6240\u6709 chat \u7684\u65B0\u586B\u8868\uFF08\u5DF2\u6709 slot \u6570\u636E\u4E0D\u53D7\u5F71\u54CD\uFF09\u3002\u7EE7\u7EED\uFF1F"))try{let t=ns();if(!t?.id){Q().error("\u6CA1\u6709\u53EF\u7528\u7684\u5168\u5C40\u6FC0\u6D3B\u6A21\u677F",null,{toast:!0});return}let e=(I.tempData||[]).map(s=>({id:s?.id||s?.uid,name:s?.name||"",note:s?.note||"",enabled:s?.enabled!==!1,aiInstructions:s?.aiInstructions||{},updateConfig:s?.updateConfig||{},exportConfig:s?.exportConfig||{},columns:Array.isArray(s?.columns)?oe(s.columns):[],rows:[]})),r=es({...t,tables:e});if(r?.success){if(typeof I._pendingMirrorTag=="string"&&I._pendingMirrorTag.trim())try{let s=be();Je({...s,mirrorTag:I._pendingMirrorTag.trim()})}catch(s){Q().warn("\u4FDD\u5B58 mirrorTag \u5230 workbench config \u5931\u8D25",s)}I._pendingMirrorTag=null,kh(),Array.isArray(r?.template?.tables)&&(I.tempData=oe(r.template.tables)||[],I.isFromTemplate=!0,I._afterSaveGlobalAt=Date.now()),Q().info(`\u5DF2\u4FDD\u5B58\u5230\u5168\u5C40\u6A21\u677F\u300C${t.name}\u300D`,null,{toast:"success"}),Q().info("\u4FDD\u5B58\u5230\u5168\u5C40\u6A21\u677F\u6210\u529F",{templateId:t.id,name:t.name,tableCount:e.length}),je()}else Q().error(`\u4FDD\u5B58\u5931\u8D25\uFF1A${r?.error||"\u672A\u77E5"}`,null,{toast:!0})}catch(t){Q().error("\u4FDD\u5B58\u5230\u5168\u5C40\u6A21\u677F\u5F02\u5E38",t),Q().error(`\u4FDD\u5B58\u5F02\u5E38\uFF1A${t?.message||t}`,null,{toast:!0})}}async function z_(){if(!(I.isDirty&&!window.confirm("\u6709\u672A\u4FDD\u5B58\u4FEE\u6539\uFF0C\u7ACB\u5373\u586B\u8868\u4F1A\u5148\u4E22\u5F03\u8FD9\u4E9B\u4FEE\u6539\uFF0C\u786E\u5B9A\uFF1F")))try{let t=await aa();t?.success?(Q().info("\u586B\u8868\u5B8C\u6210",null,{toast:"success"}),ru(),je()):Q().error(`\u586B\u8868\u5931\u8D25\uFF1A${t?.error||"\u672A\u77E5"}`,null,{toast:!0})}catch(t){Q().error("\u7ACB\u5373\u586B\u8868\u5F02\u5E38",t),Q().error(`\u5F02\u5E38\uFF1A${t?.message||t}`,null,{toast:!0})}}function Ih(t,e){if(!Array.isArray(I.tempData))return;let r=I.tempData,s=t+e;s<0||s>=r.length||([r[t],r[s]]=[r[s],r[t]],I.currentTableIndex===t?I.currentTableIndex=s:I.currentTableIndex===s&&(I.currentTableIndex=t),ze(),je())}function K_(t){if(!Array.isArray(I.tempData)||!I.tempData[t])return;let e=I.tempData[t];window.confirm(`\u5220\u9664\u8868\u300C${e.name||`\u8868 ${t+1}`}\u300D\uFF1F\u6B64\u64CD\u4F5C\u4E0D\u53EF\u64A4\u9500\u3002`)&&(I.tempData.splice(t,1),I.currentTableIndex>=I.tempData.length&&(I.currentTableIndex=Math.max(0,I.tempData.length-1)),ze(),je())}function U_(){let t=window.prompt("\u65B0\u8868\u540D\uFF1A",`\u8868 ${(I.tempData?.length||0)+1}`);if(!t||!t.trim())return;I.tempData=Array.isArray(I.tempData)?I.tempData:[];let e=new Set(I.tempData.map(n=>n?.id).filter(Boolean)),r=I.tempData.length+1,s=`sheet_${Date.now().toString(36)}_${r}`;for(;e.has(s);)r++,s=`sheet_${Date.now().toString(36)}_${r}`;I.tempData.push({id:s,name:t.trim(),enabled:!0,note:"",aiInstructions:{init:"",create:"",update:"",delete:""},updateConfig:{},exportConfig:{enabled:!1},columns:[{key:"col_1",title:"\u5B57\u6BB51",description:"",type:"text",required:!1}],rows:[]}),I.currentTableIndex=I.tempData.length-1,ze(),je()}function j_(t,e){if(!(!t||!Number.isFinite(e)))try{let r={chatId:I.targetSnapshot?.chatId||"",isolationKey:ne.getKey()},s=qn(r,t)||{rows:{}},n=!!(s.rows&&s.rows[e]);Fi(r,t,e,!n),Q().info(n?`\u5DF2\u89E3\u9501\u884C #${e+1}`:`\u5DF2\u9501\u5B9A\u884C #${e+1}\uFF08AI \u4E0D\u4F1A\u6539\u8FD9\u884C\uFF09`,null,{toast:"success"}),Q().info("row-lock toggled",{sheetUid:t,rowIndex:e,locked:!n}),je()}catch(r){Q().error("row-lock \u5F02\u5E38",r),Q().error(`\u9501\u5B9A\u5931\u8D25\uFF1A${r?.message||r}`,null,{toast:!0})}}function F_(t,e,r){if(!(!t||!Number.isFinite(e)||!r))try{let s={chatId:I.targetSnapshot?.chatId||"",isolationKey:ne.getKey()},n=qn(s,t)||{cells:{}},o=`${e}::${r}`,a=!!(n.cells&&n.cells[o]);Hi(s,t,e,r,!a),Q().info(a?`\u5DF2\u89E3\u9501 [${e}][${r}]`:`\u5DF2\u9501\u5B9A [${e}][${r}]`,null,{toast:"success"}),Q().info("cell-lock toggled",{sheetUid:t,rowIndex:e,colKey:r,locked:!a}),je()}catch(s){Q().error("cell-lock \u5F02\u5E38",s),Q().error(`\u9501\u5B9A\u5931\u8D25\uFF1A${s?.message||s}`,null,{toast:!0})}}function W_(t){if(!Number.isFinite(t)||!window.confirm(`\u786E\u5B9A\u5220\u9664\u7B2C ${t+1} \u884C\uFF1F`))return;let e=ut();e?.rows&&(e.rows.splice(t,1),ze(),je())}function H_(){let t=ut();t&&(Array.isArray(t.rows)||(t.rows=[]),t.rows.push({id:Bs("row"),name:"",cells:{}}),ze(),je())}function G_(t,e){if(!t||!e){Q().error("\u5217\u9501\u5B9A\u5931\u8D25\uFF1A\u7F3A\u5C11 sheetUid \u6216 colKey",null,{toast:!0});return}try{let s={chatId:I.targetSnapshot?.chatId||"",isolationKey:ne.getKey()},n=qn(s,t)||{cols:{}},o=!!(n.cols&&n.cols[e]);Wi(s,t,e,!o),Q().info(o?`\u5DF2\u89E3\u9501 ${e}`:`\u5DF2\u9501\u5B9A ${e}\uFF08AI \u4E0D\u4F1A\u6539\u8FD9\u5217\uFF09`,null,{toast:"success"}),Q().info("field-lock toggled",{sheetUid:t,colKey:e,locked:!o}),je()}catch(r){Q().error("field-lock \u5F02\u5E38",r),Q().error(`\u9501\u5B9A\u5931\u8D25\uFF1A${r?.message||r}`,null,{toast:!0})}}function q_(t){let e=ut();e?.columns?.[t]&&window.confirm(`\u5220\u9664\u5B57\u6BB5\u300C${e.columns[t].title||e.columns[t].key}\u300D\uFF1F\u6B64\u64CD\u4F5C\u4E0D\u4F1A\u81EA\u52A8\u6E05\u7406\u884C\u6570\u636E\u3002`)&&(e.columns.splice(t,1),ze(),je())}function Y_(){let t=ut();if(!t)return;t.columns=Array.isArray(t.columns)?t.columns:[];let e=new Set(t.columns.map(s=>s?.key).filter(Boolean)),r=t.columns.length+1;for(;e.has(`col_${r}`);)r++;t.columns.push({key:`col_${r}`,title:`\u5B57\u6BB5${r}`,description:"",type:"text",required:!1}),ze(),je()}function su(t={}){if(Q().info("openTableDataEditor \u8C03\u7528",{options:t}),A_(),!(window.jQuery||window.parent?.jQuery)){let s="jQuery \u4E0D\u53EF\u7528\uFF08window.jQuery \u548C window.parent.jQuery \u90FD\u662F undefined\uFF09";Q().error(s);try{Q().error(`\u6570\u636E\u7F16\u8F91\u5668\u6253\u5F00\u5931\u8D25\uFF1A${s}`,null,{toast:!0})}catch{}return null}try{let s=bt.getState(Qd);if(s){let n=Number(s.width),o=Number(s.height),a=Number.isFinite(n)&&n<800||Number.isFinite(o)&&o<500;(s.isMaximized||a)&&(Q().info("\u68C0\u6D4B\u5230\u4E0D\u5408\u7406 saved state\uFF0C\u91CD\u7F6E\u4E3A\u9ED8\u8BA4\u5C3A\u5BF8",{isMaximized:s.isMaximized,savedW:n,savedH:o}),bt.saveState(Qd,{width:1200,height:800,isMaximized:!1,x:void 0,y:void 0}))}}catch(s){Q().warn("saved state sanity check \u5F02\u5E38",s)}if(I.$window&&I.$window.length&&Wt().body.contains(I.$window[0])){if(t.focusTableUid){let n=(I.tempData||[]).findIndex(o=>(o?.uid||o?.id)===t.focusTableUid);n>=0&&(I.currentTableIndex=n)}return t.focusMode&&["data","schema","global"].includes(t.focusMode)&&(I.mode=t.focusMode),t.openAssistant&&!I._assistantOpen&&(I._assistantOpen=!0),je(),I.$window}if(ru(),t.focusTableUid){let n=(I.tempData||[]).findIndex(o=>(o?.uid||o?.id)===t.focusTableUid);n>=0&&(I.currentTableIndex=n)}t.focusMode&&["data","schema","global"].includes(t.focusMode)&&(I.mode=t.focusMode),t.openAssistant&&(I._assistantOpen=!0);let r;try{r=zd({id:Qd,title:"\u586B\u8868\u6570\u636E\u7F16\u8F91\u5668",content:'<div class="yyt-tde-placeholder"></div>',width:1200,height:800,modal:!1,resizable:!0,maximizable:!0,rememberState:!0,onReady:s=>{I.$window=s,je()},onClose:()=>{I.isDirty&&Q().warn("\u6570\u636E\u7F16\u8F91\u5668\u5173\u95ED\u65F6\u6709\u672A\u4FDD\u5B58\u4FEE\u6539"),I.$window=null,I._assistantOpen=!1,I._refs={saveBtn:null,saveGlobalBtn:null,dirtyBadge:null}}})}catch(s){Q().error("createWindow \u629B\u9519",s);try{Q().error(`\u521B\u5EFA\u7A97\u53E3\u5931\u8D25\uFF1A${s?.message||s}`,null,{toast:!0})}catch{}return null}return r}var Qd,Zd,I,__,eu,Rh=N(()=>{Kd();at();H();Qo();Pi();Vi();Cn();qt();Le();kr();Gi();tr();Eh();Qd="yyt-table-data-editor";I={$window:null,mode:"data",tempData:null,currentTableIndex:-1,isDirty:!1,isFromTemplate:!1,_pendingMirrorTag:null,targetSnapshot:null,_afterSaveGlobalAt:0,_assistantOpen:!1,_refs:{saveBtn:null,saveGlobalBtn:null,dirtyBadge:null}};__=`
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
`,eu=!1});function V_(t){return oe(t)}function J_(t,e,r){if(!t||typeof t!="object")return;let s=String(e||"").split(".").filter(Boolean);if(s.length===0)return;let n=t;for(let o=0;o<s.length-1;o++){let a=s[o];(n[a]===null||n[a]===void 0||typeof n[a]!="object")&&(n[a]={}),n=n[a]}n[s[s.length-1]]=r}function L(){return nu||(nu=C.createScope("TableWorkbenchView")),nu}async function X_(){try{let t=await Do();if(!t)return Mt.kind=null,Mt.lastError="Provider \u4E0D\u53EF\u7528",Mt;if(Mt.kind=t.kind,typeof t.query=="function"){let e=await t.query({statement:"SELECT COUNT(*) as c FROM table_sheets"}),r=await t.query({statement:"SELECT COUNT(*) as c FROM table_rows"});Mt.sheetCount=e?.rows?.[0]?.c??0,Mt.rowCount=r?.rows?.[0]?.c??0}Mt.lastError=null,Mt.lastRefreshAt=Date.now(),L().info("Provider stats \u5DF2\u5237\u65B0",{...Mt})}catch(t){Mt.lastError=t?.message||String(t),L().warn("Provider stats \u5237\u65B0\u5931\u8D25",t)}return Mt}function Q_(){if(!Mt.kind){let t=Pn();t?.kind&&(Mt.kind=t.kind)}return Mt}function ee(t){return String(t??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Ph(t){if(!Number.isFinite(t)||t<=0)return"\u4ECE\u672A";let e=Date.now()-t;if(e<6e4)return`${Math.floor(e/1e3)} \u79D2\u524D`;if(e<36e5)return`${Math.floor(e/6e4)} \u5206\u949F\u524D`;if(e<864e5)return`${Math.floor(e/36e5)} \u5C0F\u65F6\u524D`;try{return new Date(t).toLocaleString()}catch{return"\u672A\u77E5"}}function $h(t){let{config:e,activeTemplate:r,isolationKey:s,tablesPreview:n,templateArchives:o=[],providerStats:a={}}=t,i=e?.runtime||{},l=i.lastStatus==="success"?"\u2713 \u4E0A\u6B21\u6210\u529F":i.lastStatus==="failed"?"\u2717 \u4E0A\u6B21\u5931\u8D25":i.lastStatus==="running"?"\u8FD0\u884C\u4E2D":"\u5F85\u547D",c=i.lastStatus==="success"?"success":i.lastStatus==="failed"?"error":"muted",d=e?.automation?.enabled?"\u81EA\u52A8":"\u624B\u52A8",u=e?.apiPreset||"\u8DDF\u968F\u4E3B API",y=e?.bypassPresetId?"\u5DF2\u7ED1\u5B9A":"\u65E0",p=Array.isArray(o)?o.length:0;return`
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
          ${r?.mode&&r.mode!==Ve.INHERIT_GLOBAL?`<button class="yyt-tww-btn yyt-tww-btn-small" data-action="reset-template-scope" title="\u672C chat \u5F53\u524D\u662F\u300C${r.mode===Ve.CHAT_OVERRIDE?"chat \u4E13\u5C5E":"\u94FE\u63A5\u9884\u8BBE"}\u300D\u6A21\u5F0F\uFF0C\u70B9\u51FB\u6062\u590D\u4E3A\u300C\u7EE7\u627F\u5168\u5C40\u300D"><i class="fa-solid fa-rotate-right"></i> \u6062\u590D\u7EE7\u627F</button>`:""}
          <button class="yyt-tww-btn yyt-tww-btn-small yyt-tww-btn-danger" data-action="reset-chat-data" title="\u6E05\u7A7A\u5F53\u524D\u804A\u5929\u6240\u6709\u697C\u5C42\u7684\u8868\u683C\u6570\u636E\uFF0C\u8BA9\u6A21\u677F\u5207\u6362\u540E\u4ECE\u5934\u5F00\u59CB"><i class="fa-solid fa-trash-can"></i> \u6E05\u7A7A chat \u6570\u636E</button>
        </div>
      </div>
      <div class="yyt-tww-hero-desc">\u4ECE\u5BF9\u8BDD\u5185\u5BB9\u63D0\u53D6\u7ED3\u6784\u5316\u6570\u636E\uFF0C\u81EA\u52A8\u7EF4\u62A4\u8868\u683C\u72B6\u6001\u3002</div>
      <div class="yyt-tww-hero-chips">
        <span class="yyt-tww-chip mode">\u6A21\u5F0F ${ee(d)}</span>
        <span class="yyt-tww-chip preset">\u6A21\u677F: ${ee(r?.template?.name||"\u9ED8\u8BA4")}</span>
        ${(()=>{let g=r?.mode;if(g===Ve.CHAT_OVERRIDE)return'<span class="yyt-tww-chip preset" title="\u672C chat \u7528\u4E86\u72EC\u7ACB\u6A21\u677F\u526F\u672C\uFF08\u4FEE\u6539\u4E0D\u5F71\u54CD\u5168\u5C40\uFF09\u3002\u53EF\u5728\u300C\u91CD\u7F6E\u8303\u56F4\u300D\u6309\u94AE\u65C1\u7684\u83DC\u5355\u6062\u590D\u7EE7\u627F\u5168\u5C40\u3002">\u4F5C\u7528\u57DF: chat \u4E13\u5C5E</span>';if(g===Ve.PRESET_LINK){let m=r?.source?.presetName||"";return`<span class="yyt-tww-chip preset" title="\u672C chat \u94FE\u63A5\u5230\u5168\u5C40\u9884\u8BBE ${ee(m)}\uFF0C\u8DDF\u968F\u8BE5\u9884\u8BBE\u53D8\u5316\u3002">\u4F5C\u7528\u57DF: \u94FE\u63A5 ${ee(m)}</span>`}return'<span class="yyt-tww-chip preset" title="\u672C chat \u8DDF\u968F\u5168\u5C40\u6FC0\u6D3B\u6A21\u677F\u3002">\u4F5C\u7528\u57DF: \u7EE7\u627F\u5168\u5C40</span>'})()}
        <span class="yyt-tww-chip preset">API: ${ee(u)}</span>
        <span class="yyt-tww-chip preset">\u6307\u4EE4: ${ee(y)}</span>
        ${(()=>{let g=e?.runScope||e?.scope?.mode||"enabled";return g==="enabled"?'<span class="yyt-tww-chip preset">\u8303\u56F4: \u6240\u6709\u542F\u7528\u8868</span>':`<button class="yyt-tww-chip status-failed" data-action="reset-run-scope" title="\u5F53\u524D AI \u53EA\u4F1A\u586B\u90E8\u5206\u8868\uFF0C\u70B9\u51FB\u91CD\u7F6E\u4E3A\u300C\u6240\u6709\u542F\u7528\u8868\u300D" style="border:0;cursor:pointer;">\u8303\u56F4: ${ee(g==="current"?"\u26A0\uFE0F \u4EC5\u5F53\u524D\u8868":"\u4EC5\u9009\u4E2D\u8868")} \u2014 \u70B9\u6B64\u91CD\u7F6E</button>`})()}
        ${(()=>{let g=a?.kind,m=a?.sheetCount,h=a?.rowCount,x=m!==null&&h!==null?` \u2014 ${m} \u8868 ${h} \u884C`:"";return g==="authority"?`<span class="yyt-tww-chip status-success" title="\u6570\u636E\u6301\u4E45\u5316\u5230\u771F\u540E\u7AEF SQLite\uFF08ST-Delegation-of-authority \u63D0\u4F9B\uFF09">\u2713 \u771F\u540E\u7AEF SQLite${ee(x)}</span>`:g==="fallback"?`<span class="yyt-tww-chip preset" title="\u6570\u636E\u6301\u4E45\u5316\u5230 localStorage\uFF08\u672A\u88C5 ST-Delegation-of-authority\uFF09">\u2139 Fallback (localStorage)${ee(x)}</span>`:'<span class="yyt-tww-chip" title="Provider \u8FD8\u672A\u521D\u59CB\u5316\uFF08\u61D2\u52A0\u8F7D\uFF09">Provider \u52A0\u8F7D\u4E2D...</span>'})()}
        ${s?`<span class="yyt-tww-chip">\u9694\u79BB: ${ee(s)}</span>`:""}
        <span class="yyt-tww-chip status-${c==="success"?"success":c==="error"?"failed":""}">${ee(l)}</span>
        <span class="yyt-tww-chip yyt-tww-chip-toggle" data-action="toggle-chips" title="\u5C55\u5F00/\u6536\u8D77">\u25B8</span>
      </div>
    </div>

    <!-- v1.0.209 #3 \u4FEE\u590D\uFF1Ahero \u63D0\u5230\u6EDA\u52A8\u533A\u5916\u9762\uFF08\u540C .yyt-tww \u76F4\u63A5\u5B50\uFF09\uFF0C\u4E0B\u9762\u6240\u6709\u5185\u5BB9\u5305\u8FDB .yyt-tww-scroll \u5355\u4E00\u6EDA\u52A8\u5BB9\u5668\u3002
         hero \u7269\u7406\u4E0A\u5C31\u4E0D\u5728\u6EDA\u52A8\u533A\u5185 \u2192 \u4E0D\u4F1A\u88AB\u6EDA\u8D70\u3002JS \u76D1\u542C scrollTop > 0 \u5207\u6362 compact \u6001\u538B\u7F29 hero\u3002 -->
    <div class="yyt-tww-scroll">

    <!-- \u6A21\u677F\u5F52\u6863\u5217\u8868\uFF08\u9ED8\u8BA4\u9690\u85CF\uFF0Chero \u6309\u94AE toggle\uFF09 -->
    <div class="yyt-tww-archives" data-archives-panel style="display:none;">
      ${rA(o)}
    </div>

    <!-- Runtime stats -->
    <div class="yyt-tww-stat-row">
      <div class="yyt-tww-stat">
        <span class="yyt-tww-stat-label">\u72B6\u6001</span>
        <span class="yyt-tww-stat-value ${c}">${ee(l)}</span>
      </div>
      <div class="yyt-tww-stat">
        <span class="yyt-tww-stat-label">\u6700\u8FD1\u8FD0\u884C</span>
        <span class="yyt-tww-stat-value muted">${ee(Ph(i.lastRunAt))}</span>
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
        ${Z_(t)}
      </section>

      <section class="yyt-tww-section" data-section="behavior">
        <div class="yyt-tww-section-heading">
          <span class="yyt-tww-section-icon"><i class="fa-solid fa-arrows-rotate"></i></span>
          \u586B\u8868\u884C\u4E3A
        </div>
        ${eA(t)}
      </section>

      <section class="yyt-tww-section" data-section="overview">
        <div class="yyt-tww-section-heading">
          <span class="yyt-tww-section-icon"><i class="fa-solid fa-table-cells"></i></span>
          \u8868\u683C\u6982\u89C8
          <span class="yyt-tww-section-action">
            <button class="yyt-tww-btn yyt-tww-btn-small" data-action="open-editor"><i class="fa-solid fa-table-cells"></i> \u6253\u5F00\u6570\u636E\u7F16\u8F91\u5668</button>
          </span>
        </div>
        ${sA(t.tablesPreview)}
      </section>

    </div>

    </div>
  </div>
  `}function Z_(t){let{config:e,allTemplates:r,apiPresets:s,bypassPresets:n,regexPresets:o,worldbookPresets:a,activeTemplate:i}=t,l=r.map(T=>`<option value="${ee(T.id)}" ${i?.source?.templateId===T.id?"selected":""}>${ee(T.name)}</option>`).join(""),c=e?.autoUpdateEnabled===!0?"auto":"manual",d=e?.apiPreset||"",u='<option value="">\u2014\u2014 \u8DDF\u968F\u4E3B API \u2014\u2014</option>'+s.map(T=>`<option value="${ee(T.name)}" ${T.name===d?"selected":""}>${ee(T.name)}</option>`).join(""),y=e?.bypass?.presetId||"",p='<option value="">\u2014\u2014 \u65E0 \u2014\u2014</option>'+n.map(T=>`<option value="${ee(T.id)}" ${T.id===y?"selected":""}>${ee(T.name)}${T.isDefault?" [\u9ED8\u8BA4]":""}</option>`).join(""),g=e?.extraction?.regexPresetId||"",m='<option value="">\u2014\u2014 \u65E0\uFF08\u4E0D\u8FDB\u884C\u63D0\u53D6\uFF09 \u2014\u2014</option>'+o.map(T=>`<option value="${ee(T.id)}" ${T.id===g?"selected":""}>${ee(T.name)}</option>`).join(""),h=e?.worldbooks?.presetId||"",x='<option value="">\u2014\u2014 \u65E0 \u2014\u2014</option>'+a.map(T=>`<option value="${ee(T.id)}" ${T.id===h?"selected":""}>${ee(T.name)}</option>`).join(""),v=e?.runScope||"enabled";return`
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
        <option value="auto" ${c==="auto"?"selected":""}>\u81EA\u52A8 \u2014 \u56DE\u590D\u5B8C\u6210\u540E\u586B\u8868</option>
        <option value="manual" ${c==="manual"?"selected":""}>\u624B\u52A8 \u2014 \u4EC5\u5728\u70B9"\u7ACB\u5373\u586B\u8868"\u65F6</option>
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
        <option value="current" ${v==="current"?"selected":""}>\u4EC5\u5F53\u524D\u6D3B\u52A8\u8868</option>
        <option value="selected" ${v==="selected"?"selected":""}>\u5F53\u524D\u9009\u4E2D\u8868</option>
        <option value="enabled" ${v==="enabled"?"selected":""}>\u6240\u6709\u542F\u7528\u7684\u8868</option>
      </select>
      <div class="yyt-tww-row-meta"></div>
    </div>
  `}function eA(t){let{config:e}=t,r=e?.fillMode||"incremental",s=Number(e?.contextDepth)||3,n=e?.worldbookSync?.enabled===!0,o=e?.mirrorToMessage===!0;return`
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
      <div class="yyt-tww-toggle ${n?"on":""}" data-toggle="worldbookSync"></div>
    </div>

    ${tA(t)}

    <div class="yyt-tww-toggle-row">
      <div class="yyt-tww-toggle-info">
        <div class="yyt-tww-toggle-title">\u5199\u56DE\u6B63\u6587\u955C\u50CF</div>
        <div class="yyt-tww-toggle-desc">\u5728\u52A9\u624B\u6D88\u606F\u672B\u5C3E\u955C\u50CF\u5199\u5165 markdown \u65B9\u4FBF\u624B\u52A8\u67E5\u9605\u3002</div>
      </div>
      <div class="yyt-tww-toggle ${o?"on":""}" data-toggle="mirrorToMessage"></div>
    </div>
  `}function tA(t){let e=t?.config?.worldbookSync||{};if(!(e.enabled===!0))return"";let s=String(e.targetBook||""),n=String(t?.boundLorebook||""),o=t?.chatOpen===!0,a=s||n,i=Array.isArray(t.availableWorldbooks)?t.availableWorldbooks:[],l=e.wrapperConfig||{},c=l.enabled!==!1,d=String(l.wrapperTag||"\u6700\u65B0\u6570\u636E\u4E0E\u8BB0\u5F55"),u=String(l.wrapperHint||""),y=l.wrapperPlacement||{},p=String(y.position||"before_character_definition"),g=Number.isFinite(y.depth)?y.depth:2,m=Number.isFinite(y.order)?y.order:5e4,h;if(!o)h='<option value="">\u2014\u2014 \u8BF7\u5148\u6253\u5F00\u804A\u5929 \u2014\u2014</option>';else if(i.length===0)h=`<option value="${ee(a)}">${a?ee(a):"\u2014\u2014 \u89D2\u8272\u5361\u672A\u7ED1\u5B9A\u4E16\u754C\u4E66 \u2014\u2014"}</option>`;else{let T=i.map(E=>{let w=typeof E=="string"?E:E?.name||"";return`<option value="${ee(w)}" ${w===a?"selected":""}>${ee(w)}${w===n?"\uFF08\u89D2\u8272\u5361\u7ED1\u5B9A\uFF09":""}</option>`}).join("");h=(n?`<option value="">\u2014\u2014 \u89D2\u8272\u5361\u7ED1\u5B9A\uFF1A${ee(n)} \u2014\u2014</option>`:'<option value="">\u2014\u2014 \u9009\u62E9 \u2014\u2014</option>')+T}return`
    <div class="yyt-tww-sub-zone" data-sub-zone="worldbookSync">
      <div class="yyt-tww-sub-row">
        <label>\u76EE\u6807\u4E16\u754C\u4E66</label>
        <select class="yyt-select yyt-tww-ctrl" data-binding="worldbookTargetBook" ${o?"":"disabled"}>${h}</select>
        <div class="yyt-tww-sub-meta">${o?'<a data-action="refresh-worldbooks">\u5237\u65B0\u5217\u8868</a>':'<span style="color:var(--tww-warning);">\u672A\u6253\u5F00\u804A\u5929</span>'}</div>
      </div>

      <div class="yyt-tww-sub-row-toggle">
        <label>Wrapper \u5305\u88F9</label>
        <div class="yyt-tww-toggle-desc">\u7528 <code style="font-size:10px;">&lt;${ee(d)}&gt;...&lt;/${ee(d)}&gt;</code> \u5305\u4F4F\u6240\u6709\u5168\u5C40\u8868\u6570\u636E</div>
        <div class="yyt-tww-toggle ${c?"on":""}" data-toggle="worldbookWrapperEnabled"></div>
      </div>

      <div class="yyt-tww-sub-row">
        <label>Wrapper \u6807\u7B7E</label>
        <input class="yyt-input yyt-tww-ctrl" type="text" data-binding="worldbookWrapperTag" value="${ee(d)}" placeholder="\u6700\u65B0\u6570\u636E\u4E0E\u8BB0\u5F55">
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
  `}function rA(t=[]){return!Array.isArray(t)||t.length===0?'<div class="yyt-tww-empty">\u5F53\u524D chat \xD7 isolationKey \u6682\u65E0\u5F52\u6863\uFF08\u4EC5\u5728\u5207\u6362\u6A21\u677F\u65F6\u81EA\u52A8\u5F52\u6863\u5F53\u524D\u72B6\u6001\uFF09</div>':`
    <div class="yyt-tww-archives-header">\u6A21\u677F\u5F52\u6863\u5386\u53F2 (${t.length}/8)</div>
    <div class="yyt-tww-archives-list">
      ${t.map((e,r)=>{let s=e?.state||{},n=s.mode||"unknown",o=e?.archivedAt?new Date(e.archivedAt).toLocaleString():"\u672A\u77E5\u65F6\u95F4",a=s.presetName||"",i=n==="preset_link"?`\u9884\u8BBE\u94FE\u63A5: ${ee(a)}`:n==="chat_override"?"chat \u7EA7\u8986\u76D6\u6A21\u677F":n==="inherit_global"?"\u7EE7\u627F\u5168\u5C40":ee(n);return`
          <div class="yyt-tww-archive-item" data-archive-index="${r}">
            <div class="yyt-tww-archive-meta">
              <span class="yyt-tww-archive-time">${ee(o)}</span>
              <span class="yyt-tww-archive-mode">${i}</span>
            </div>
            <button class="yyt-tww-btn yyt-tww-btn-small" data-action="restore-archive" data-archive-index="${r}" title="\u6062\u590D\u6B64\u5F52\u6863\uFF08\u6062\u590D\u524D\u81EA\u52A8\u5F52\u6863\u5F53\u524D\u72B6\u6001\uFF09">\u6062\u590D</button>
          </div>
        `}).join("")}
    </div>
  `}function sA(t){return!Array.isArray(t)||t.length===0?'<div class="yyt-tww-empty">\u5F53\u524D slot \u6682\u65E0\u8868\u6570\u636E\u3002\u8BF7\u5148"\u7ACB\u5373\u586B\u8868"\u6216\u5728\u6570\u636E\u7F16\u8F91\u5668\u4E2D\u521D\u59CB\u5316\u3002</div>':`
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
  `}function Oh(){let t=(()=>{try{return be()}catch{return{}}})(),e=(()=>{try{return os()||[]}catch{return[]}})(),r=(()=>{try{return Dn({})}catch{return null}})(),s=(()=>{try{return zr()||[]}catch{return[]}})(),n=(()=>{try{return Ko()||[]}catch{return[]}})(),o=(()=>{try{return Ee.listPresets()||[]}catch{return[]}})(),a=(()=>{try{return gt.listPresets()||[]}catch{return[]}})(),i=(()=>{try{return ne.getKey()}catch{return""}})(),l=nA(),c=oA(),d=aA(),u=null,y=0;try{let x=Vs(null);Array.isArray(x?.tableState?.tables)&&x.tableState.tables.length>0&&(u=x.tableState.tables,y=Number(x.tableState.updatedAt)||0)}catch{}let p=u||r?.template?.tables||t?.tables||[],g=t?.tableEnabledOverrides&&typeof t.tableEnabledOverrides=="object"?t.tableEnabledOverrides:{},m=p.map(x=>{let v=x?.id||"",T=v&&Object.prototype.hasOwnProperty.call(g,v)?g[v]:void 0;return{id:v,name:x?.name||"",enabled:T!==void 0?T:x?.enabled!==!1,rowCount:Array.isArray(x?.rows)?x.rows.length:0,colCount:Array.isArray(x?.columns)?x.columns.length:0,updatedHint:u&&y>0?Ph(y):""}}),h=(()=>{try{return tg()||[]}catch{return[]}})();return{config:t,activeTemplate:r,allTemplates:e,apiPresets:s,bypassPresets:n,regexPresets:o,worldbookPresets:a,availableWorldbooks:l,boundLorebook:c,chatOpen:d,isolationKey:i,tablesPreview:m,templateArchives:h,providerStats:Q_()}}function nA(){try{let t=globalThis.window||globalThis,e=t?.TavernHelper||t?.parent?.TavernHelper;if(!e)return[];if(typeof e.getLorebooks=="function"){let r=e.getLorebooks();if(Array.isArray(r))return r}if(typeof e.getLorebookList=="function"){let r=e.getLorebookList();if(Array.isArray(r))return r}}catch(t){L().warn("loadAvailableWorldbooks \u5931\u8D25",t)}return[]}function oA(){try{let t=globalThis.window||globalThis,e=t?.TavernHelper||t?.parent?.TavernHelper;if(e){if(typeof e.getCurrentCharPrimaryLorebook=="function"){let s=e.getCurrentCharPrimaryLorebook();if(typeof s=="string"&&s)return s}if(typeof e.getCharLorebooks=="function")try{let s=e.getCharLorebooks();if(s?.primary)return String(s.primary)}catch{}if(typeof e.getChatLorebook=="function")try{let s=e.getChatLorebook();if(typeof s=="string"&&s)return s}catch{}}let r=t?.SillyTavern?.getContext?.()||t?.parent?.SillyTavern?.getContext?.();if(r){let s=r.characters?.[r.characterId],n=s?.data?.character_book?.name||s?.data?.extensions?.world||s?.world;if(typeof n=="string"&&n)return n}}catch(t){L().warn("loadCharacterBoundLorebook \u5931\u8D25",t)}return""}function aA(){try{let t=globalThis.window||globalThis,e=t?.TavernHelper||t?.parent?.TavernHelper;if(e&&typeof e.getCurrentChatId=="function"){let s=e.getCurrentChatId();return!!(s&&String(s).trim()&&String(s).trim()!=="default_chat")}let r=t?.SillyTavern?.getContext?.()||t?.parent?.SillyTavern?.getContext?.();if(r){let s=r.chat;if(Array.isArray(s)&&s.length>0||r.chatId)return!0}}catch{}return!1}function ou(t,e){let r=window.jQuery||window.parent?.jQuery;if(!r||!t||!t.on){L().warn("bindWorkbenchEvents: jQuery \u6216 $container \u4E0D\u53EF\u7528");return}t.off(".tww"),Mh||(Mh=!0,X_().then(()=>{typeof e=="function"&&e()}).catch(()=>{})),t.on("click.tww",'[data-action="run-now"]',async()=>{try{let o=await aa();o?.success?L().info("\u586B\u8868\u5B8C\u6210",null,{toast:"success"}):L().error(`\u586B\u8868\u5931\u8D25\uFF1A${o?.error||"\u672A\u77E5"}`,null,{toast:!0}),typeof e=="function"&&e()}catch(o){L().error("\u7ACB\u5373\u586B\u8868\u5F02\u5E38",o),L().error(`\u5F02\u5E38\uFF1A${o?.message||o}`,null,{toast:!0})}}),t.on("click.tww",'[data-action="run-clear"]',async()=>{if(window.confirm("\u91CD\u586B\u4F1A\u6E05\u7A7A\u5F53\u524D\u6D88\u606F\u697C\u5C42\u7684\u8868\u683C\u6570\u636E\u5E76\u91CD\u65B0\u751F\u6210\uFF0C\u786E\u5B9A\uFF1F"))try{let o=await aa(null,{clearBeforeUpdate:!0});o?.success?L().info("\u91CD\u586B\u5B8C\u6210",null,{toast:"success"}):L().error(`\u91CD\u586B\u5931\u8D25\uFF1A${o?.error||"\u672A\u77E5"}`,null,{toast:!0}),typeof e=="function"&&e()}catch(o){L().error("\u91CD\u586B\u5F02\u5E38",o),L().error(`\u5F02\u5E38\uFF1A${o?.message||o}`,null,{toast:!0})}}),t.on("click.tww",'[data-action="reset-run-scope"]',()=>{try{let o=be();Je({...o,runScope:"enabled",scope:{...o.scope||{},mode:"enabled",activeTableId:"",selectedTableIds:[]}}),L().info("\u5DF2\u91CD\u7F6E\u8303\u56F4\u4E3A\u300C\u6240\u6709\u542F\u7528\u8868\u300D",null,{toast:"success"}),L().info("\u7528\u6237\u91CD\u7F6E runScope \u4E3A enabled"),typeof e=="function"&&e()}catch(o){L().error("\u91CD\u7F6E\u8303\u56F4\u5F02\u5E38",o),L().error(`\u91CD\u7F6E\u5931\u8D25\uFF1A${o?.message||o}`,null,{toast:!0})}}),t.on("click.tww",'[data-action="toggle-chips"]',function(){let o=t.find(".yyt-tww-hero-chips")[0];if(!o)return;let a=o.classList.toggle("yyt-tww-hero-chips-expanded");this.textContent=a?"\u25BE":"\u25B8"}),t.on("click.tww",'[data-action="export-templates"]',()=>{try{let o=ui(),a=JSON.stringify(o,null,2),i=new Blob([a],{type:"application/json"}),l=URL.createObjectURL(i),c=document.createElement("a");c.href=l,c.download=`youyou-table-templates-${Date.now()}.json`,document.body.appendChild(c),c.click(),document.body.removeChild(c),URL.revokeObjectURL(l);let d=Array.isArray(o?.templates)?o.templates.length:0;L().info(`\u5DF2\u5BFC\u51FA ${d} \u4E2A\u6A21\u677F\u5230\u4E0B\u8F7D\u6587\u4EF6\u5939`,null,{toast:"success"}),L().info("export-templates \u5B8C\u6210",{count:d})}catch(o){L().error("export-templates \u5F02\u5E38",o),L().error(`\u5BFC\u51FA\u5931\u8D25\uFF1A${o?.message||o}`,null,{toast:!0})}}),t.on("click.tww",'[data-action="reset-template-scope"]',()=>{if(window.confirm("\u6062\u590D\u672C chat \u7684\u6A21\u677F\u4F5C\u7528\u57DF\u5230\u300C\u7EE7\u627F\u5168\u5C40\u300D\uFF1F\u5F53\u524D\u72B6\u6001\u4F1A\u5148\u81EA\u52A8\u5F52\u6863\uFF0C\u53EF\u5728\u300C\u5F52\u6863\u300D\u4E2D\u6062\u590D\u3002"))try{let o=eg({archive:!0});o?.success?(L().info("\u5DF2\u6062\u590D\u4E3A\u7EE7\u627F\u5168\u5C40",null,{toast:"success"}),L().info("reset-template-scope \u5B8C\u6210"),typeof e=="function"&&e()):L().error(`\u6062\u590D\u5931\u8D25\uFF1A${o?.error||"\u672A\u77E5"}`,null,{toast:!0})}catch(o){L().error("reset-template-scope \u5F02\u5E38",o),L().error(`\u5F02\u5E38\uFF1A${o?.message||o}`,null,{toast:!0})}}),t.on("click.tww",'[data-action="chat-template-override"]',()=>{if(window.confirm(`\u628A\u5F53\u524D\u6FC0\u6D3B\u6A21\u677F\u6DF1\u62F7\u8D1D\u4E3A\u672C chat \u7684\u72EC\u7ACB\u526F\u672C\uFF1F
\u4E4B\u540E\u4FEE\u6539\u4E0D\u5F71\u54CD\u5168\u5C40\u6A21\u677F\u3002\u64CD\u4F5C\u524D\u81EA\u52A8\u5F52\u6863\u5F53\u524D\u72B6\u6001\u3002`))try{let o=ns();if(!o){L().error("\u6CA1\u6709\u53EF\u7528\u7684\u5168\u5C40\u6FC0\u6D3B\u6A21\u677F",null,{toast:!0});return}let a=Qf(o,{source:"workbench-chat-override"});a?.success?(L().info(`\u5DF2\u8BBE\u4E3A chat \u4E13\u5C5E\uFF1A${o.name}`,null,{toast:"success"}),L().info("chat-template-override \u5B8C\u6210",{templateId:o.id,name:o.name}),typeof e=="function"&&e()):L().error(`\u8BBE\u7F6E\u5931\u8D25\uFF1A${a?.error||"\u672A\u77E5"}`,null,{toast:!0})}catch(o){L().error("chat-template-override \u5F02\u5E38",o),L().error(`\u5F02\u5E38\uFF1A${o?.message||o}`,null,{toast:!0})}}),t.on("click.tww",'[data-action="chat-template-link"]',()=>{let o=(()=>{try{return os()||[]}catch{return[]}})();if(o.length===0){L().info("\u6CA1\u6709\u53EF\u7528\u7684\u6A21\u677F",null,{toast:!0});return}let a=o.map((d,u)=>`${u+1}. ${d.name}`).join(`
`),i=window.prompt(`\u94FE\u63A5\u5230\u54EA\u4E2A\u5168\u5C40\u9884\u8BBE\uFF1F\u8F93\u5165\u7F16\u53F7\uFF081-${o.length}\uFF09\uFF1A

${a}`,"1");if(!i)return;let l=parseInt(i,10)-1;if(!Number.isFinite(l)||l<0||l>=o.length){L().error("\u7F16\u53F7\u65E0\u6548",null,{toast:!0});return}let c=o[l];try{let d=Zf(c.name,{source:"workbench-link-preset"});d?.success?(L().info(`\u5DF2\u94FE\u63A5\u5230\u9884\u8BBE\uFF1A${c.name}`,null,{toast:"success"}),L().info("chat-template-link \u5B8C\u6210",{presetName:c.name}),typeof e=="function"&&e()):L().error(`\u94FE\u63A5\u5931\u8D25\uFF1A${d?.error||"\u672A\u77E5"}`,null,{toast:!0})}catch(d){L().error("chat-template-link \u5F02\u5E38",d),L().error(`\u5F02\u5E38\uFF1A${d?.message||d}`,null,{toast:!0})}}),t.on("click.tww",'[data-action="reset-chat-data"]',async()=>{if(window.confirm("\u5C06\u6E05\u7A7A\u5F53\u524D\u804A\u5929\u6240\u6709\u697C\u5C42\u7684\u8868\u683C\u6570\u636E\uFF08\u4E0D\u5F71\u54CD\u6A21\u677F/\u914D\u7F6E\uFF09\u3002\u4E0B\u6B21\u586B\u8868\u4F1A\u6309\u5F53\u524D\u6FC0\u6D3B\u6A21\u677F\u4ECE\u5934\u5F00\u59CB\u3002\u786E\u5B9A\uFF1F"))try{let o=await dm();o?.success?(L().info(`\u5DF2\u6E05\u7A7A ${o.touched||0} \u6761\u6D88\u606F\u7684\u8868\u683C\u6570\u636E`,null,{toast:"success"}),L().info("\u6E05\u7A7A chat \u6570\u636E\u5B8C\u6210",o)):L().error("\u6E05\u7A7A\u5931\u8D25",null,{toast:!0}),typeof e=="function"&&e()}catch(o){L().error("\u6E05\u7A7A chat \u6570\u636E\u5F02\u5E38",o),L().error(`\u5F02\u5E38\uFF1A${o?.message||o}`,null,{toast:!0})}}),t.on("click.tww",'[data-action="open-editor"]',o=>{o.preventDefault(),L().info("open-editor button clicked");try{let a=su();L().info("openTableDataEditor \u8C03\u7528\u5B8C\u6210",{hasReturn:!!a})}catch(a){L().error("\u6253\u5F00\u6570\u636E\u7F16\u8F91\u5668\u5F02\u5E38",a),L().error(`\u6253\u5F00\u5931\u8D25\uFF1A${a?.message||a}`,null,{toast:!0})}}),t.on("click.tww","[data-table-index]",function(o){if(r(o.target).closest('[data-action="toggle-table-enabled"]').length>0||r(o.target).is("label, label *"))return;o.preventDefault();let a=Number(r(this).attr("data-table-index"));if(!(!Number.isFinite(a)||a<0))try{let l=Vs(null)?.tableState?.tables?.[a],c=su({focusTableUid:l?.uid||l?.id||""})}catch(i){L().error("\u6253\u5F00\u6570\u636E\u7F16\u8F91\u5668\u5F02\u5E38",i),L().error(`\u6253\u5F00\u5931\u8D25\uFF1A${i?.message||i}`,null,{toast:!0})}}),t.on("click.tww",'[data-action="toggle-archives"]',function(o){o.preventDefault();let a=t.find("[data-archives-panel]").first();a.length&&(a.css("display")==="none"?a.css("display","block"):a.css("display","none"))}),t.on("click.tww",'[data-action="restore-archive"]',async function(o){o.stopPropagation();let a=Number(r(this).attr("data-archive-index"));if(!(!Number.isFinite(a)||a<0)&&window.confirm(`\u6062\u590D\u5F52\u6863 #${a}\uFF1F\u6062\u590D\u524D\u4F1A\u81EA\u52A8\u5F52\u6863\u5F53\u524D\u72B6\u6001\uFF0C\u53EF\u518D\u6B21\u6062\u590D\u56DE\u6765\u3002`))try{let i=rg(a);i?.success?(L().info("\u5DF2\u6062\u590D\u5F52\u6863",null,{toast:"success"}),L().info("restoreChatTemplateArchive \u6210\u529F",{index:a,scopeState:i.scopeState})):L().error(`\u6062\u590D\u5931\u8D25\uFF1A${i?.error||"\u672A\u77E5"}`,null,{toast:!0}),typeof e=="function"&&e()}catch(i){L().error("\u6062\u590D\u5F52\u6863\u5F02\u5E38",i),L().error(`\u5F02\u5E38\uFF1A${i?.message||i}`,null,{toast:!0})}}),t.on("change.tww",'[data-action="toggle-table-enabled"]',function(o){o.stopPropagation();let a=r(this).attr("data-table-id"),i=r(this).is(":checked");if(a)try{let l=be(),c={...l.tableEnabledOverrides||{}};c[a]=i,Je({...l,tableEnabledOverrides:c}),L().info(i?`\u5DF2\u542F\u7528 ${a}`:`\u5DF2\u7981\u7528 ${a}`,null,{toast:"success"}),L().info("toggle \u5355\u8868\u6FC0\u6D3B",{tableId:a,enabled:i}),typeof e=="function"&&e()}catch(l){L().error("toggle \u5355\u8868\u6FC0\u6D3B\u5F02\u5E38",l),L().error(`\u5207\u6362\u5931\u8D25\uFF1A${l?.message||l}`,null,{toast:!0})}}),t.on("change.tww",'[data-binding="template"]',function(){let o=r(this).val();try{td(o);let a=be();Je({...a,activeTemplate:o}),L().info("\u6A21\u677F\u5DF2\u5207\u6362",null,{toast:"success"}),typeof e=="function"&&e()}catch(a){L().error("\u5207\u6362\u6A21\u677F\u5F02\u5E38",a),L().error(`\u5207\u6362\u5931\u8D25\uFF1A${a?.message||a}`,null,{toast:!0})}}),t.on("change.tww",'[data-binding="triggerMode"]',function(){let o=r(this).val();try{let a=be();Je({...a,autoUpdateEnabled:o==="auto"}),L().info(o==="auto"?"\u5DF2\u5207\u6362\u4E3A\u81EA\u52A8\u6A21\u5F0F":"\u5DF2\u5207\u6362\u4E3A\u624B\u52A8\u6A21\u5F0F",null,{toast:"success"}),typeof e=="function"&&e()}catch(a){L().error("\u5207\u6362\u89E6\u53D1\u6A21\u5F0F\u5F02\u5E38",a),L().error(`\u5207\u6362\u5931\u8D25\uFF1A${a?.message||a}`,null,{toast:!0})}});let s=[{sel:'[data-binding="apiPreset"]',key:"apiPreset"},{sel:'[data-binding="runScope"]',key:"runScope"},{sel:'[data-binding="fillMode"]',key:"fillMode"}];for(let{sel:o,key:a}of s)t.on("change.tww",o,function(){let i=r(this).val();try{let l=be(),c={...l,[a]:i};a==="runScope"&&(c.scope={...l.scope||{},mode:i,...i==="enabled"?{activeTableId:"",selectedTableIds:[]}:{}}),Je(c),L().info("\u5DF2\u4FDD\u5B58",null,{toast:"success"})}catch(l){L().error(`\u4FDD\u5B58 ${a} \u5F02\u5E38`,l),L().error(`\u4FDD\u5B58\u5931\u8D25\uFF1A${l?.message||l}`,null,{toast:!0})}});t.on("change.tww",'[data-binding="bypassPreset"]',function(){let o=r(this).val();try{let a=be();Je({...a,bypass:{...a.bypass||{},presetId:o,enabled:!!o}}),L().info("Ai \u6307\u4EE4\u9884\u8BBE\u5DF2\u4FDD\u5B58",null,{toast:"success"})}catch(a){L().error("\u4FDD\u5B58 bypass \u5F02\u5E38",a),L().error(`\u4FDD\u5B58\u5931\u8D25\uFF1A${a?.message||a}`,null,{toast:!0})}}),t.on("change.tww",'[data-binding="regexPreset"]',function(){let o=r(this).val();try{let a=be();Je({...a,extraction:{...a.extraction||{},regexPresetId:o}}),L().info("\u6B63\u5219\u9884\u8BBE\u5DF2\u66F4\u65B0",null,{toast:"success"})}catch(a){L().error("\u4FDD\u5B58 regexPreset \u5F02\u5E38",a),L().error(`\u4FDD\u5B58\u5931\u8D25\uFF1A${a?.message||a}`,null,{toast:!0})}}),t.on("change.tww",'[data-binding="worldbookPreset"]',function(){let o=r(this).val();try{let a=be();Je({...a,worldbooks:{...a.worldbooks||{},presetId:o}}),L().info("\u4E16\u754C\u4E66\u9884\u8BBE\u5DF2\u66F4\u65B0",null,{toast:"success"})}catch(a){L().error("\u4FDD\u5B58 worldbookPreset \u5F02\u5E38",a),L().error(`\u4FDD\u5B58\u5931\u8D25\uFF1A${a?.message||a}`,null,{toast:!0})}}),t.on("change.tww",'[data-binding="contextDepth"]',function(){let o=Math.max(1,parseInt(r(this).val(),10)||3);try{let a=be();Je({...a,contextDepth:o}),L().info("\u5DF2\u4FDD\u5B58",null,{toast:"success"})}catch(a){L().error("\u4FDD\u5B58 contextDepth \u5F02\u5E38",a),L().error(`\u4FDD\u5B58\u5931\u8D25\uFF1A${a?.message||a}`,null,{toast:!0})}}),t.on("click.tww",'[data-toggle="worldbookSync"]',function(){let o=r(this),a=o.hasClass("on"),i=!a;o.toggleClass("on",i);try{let l=be();Je({...l,worldbookSync:{...l.worldbookSync||{},enabled:i}}),L().info(i?"\u5DF2\u542F\u7528\u4E16\u754C\u4E66\u540C\u6B65":"\u5DF2\u505C\u7528\u4E16\u754C\u4E66\u540C\u6B65",null,{toast:"success"}),typeof e=="function"&&e()}catch(l){o.toggleClass("on",a),L().error("toggle worldbookSync \u5F02\u5E38",l),L().error(`\u4FDD\u5B58\u5931\u8D25\uFF1A${l?.message||l}`,null,{toast:!0})}}),t.on("click.tww",'[data-toggle="worldbookWrapperEnabled"]',function(){let o=r(this),a=o.hasClass("on"),i=!a;o.toggleClass("on",i);try{let l=be(),c=l.worldbookSync||{};Je({...l,worldbookSync:{...c,wrapperConfig:{...c.wrapperConfig||{},enabled:i}}}),L().info(i?"\u5DF2\u542F\u7528 Wrapper \u5305\u88F9":"\u5DF2\u505C\u7528 Wrapper",null,{toast:"success"})}catch(l){o.toggleClass("on",a),L().error("toggle worldbookWrapperEnabled \u5F02\u5E38",l)}});let n=[{sel:'[data-binding="worldbookTargetBook"]',path:"targetBook",type:"string"},{sel:'[data-binding="worldbookWrapperTag"]',path:"wrapperConfig.wrapperTag",type:"string"},{sel:'[data-binding="worldbookWrapperHint"]',path:"wrapperConfig.wrapperHint",type:"string"},{sel:'[data-binding="worldbookWrapperPosition"]',path:"wrapperConfig.wrapperPlacement.position",type:"string"},{sel:'[data-binding="worldbookWrapperDepth"]',path:"wrapperConfig.wrapperPlacement.depth",type:"number"},{sel:'[data-binding="worldbookWrapperOrder"]',path:"wrapperConfig.wrapperPlacement.order",type:"number"}];for(let{sel:o,path:a,type:i}of n)t.on("change.tww",o,function(){let l=r(this).val();i==="number"&&(l=Number.parseInt(l,10));try{let c=be(),d=V_(c.worldbookSync||{});J_(d,a,l),Je({...c,worldbookSync:d}),L().info("\u5DF2\u4FDD\u5B58",null,{toast:"success"})}catch(c){L().error(`\u4FDD\u5B58 worldbookSync.${a} \u5F02\u5E38`,c),L().error(`\u4FDD\u5B58\u5931\u8D25\uFF1A${c?.message||c}`,null,{toast:!0})}});t.on("click.tww",'[data-action="refresh-worldbooks"]',function(o){o.preventDefault(),typeof e=="function"&&e(),L().info("\u5DF2\u5237\u65B0\u4E16\u754C\u4E66\u5217\u8868",null,{toast:"success"})}),t.on("click.tww",'[data-toggle="mirrorToMessage"]',function(){let o=r(this),a=o.hasClass("on"),i=!a;o.toggleClass("on",i);try{let l=be();Je({...l,mirrorToMessage:i}),L().info(i?"\u5DF2\u542F\u7528\u6B63\u6587\u955C\u50CF":"\u5DF2\u505C\u7528\u6B63\u6587\u955C\u50CF",null,{toast:"success"})}catch(l){o.toggleClass("on",a),L().error("toggle mirrorToMessage \u5F02\u5E38",l),L().error(`\u4FDD\u5B58\u5931\u8D25\uFF1A${l?.message||l}`,null,{toast:!0})}}),t.on("click.tww","[data-link]",function(o){o.preventDefault(),L().info("\u8DF3\u8F6C\u5230\u9884\u8BBE\u7BA1\u7406\u9762\u677F\uFF08\u5F85\u63A5\u5165\uFF09",null,{toast:!0})})}var nu,Mt,Mh,Nh,Dh=N(()=>{H();Rn();qt();Cn();Le();kr();Vi();Qo();Rh();Le();an();Bn();Vr();cn();Mt={kind:null,sheetCount:null,rowCount:null,lastError:null,lastRefreshAt:0},Mh=!1;Nh=`
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
`});var Kh={};le(Kh,{TableWorkbenchPanel:()=>zh,default:()=>lA});function iA(){if(!au)try{let t=window.parent&&window.parent.document?window.parent.document:document,e=t.head||t.documentElement;if(e.querySelector("#yyt-tww-styles")){au=!0;return}let r=t.createElement("style");r.id="yyt-tww-styles",r.textContent=Nh,e.appendChild(r),au=!0}catch(t){da.warn("\u6CE8\u5165\u5DE5\u4F5C\u53F0\u6837\u5F0F\u5931\u8D25",t)}}function Lh(t){let e=t?.[0];if(!e)return;let r=e.closest(".yyt-popup-body");if(!r){da.warn("pinWorkbenchHeight: \u627E\u4E0D\u5230 .yyt-popup-body \u7956\u5148");return}let s=()=>{let o=e.querySelector(".yyt-tww");if(!o)return;let a=r.getBoundingClientRect(),i=e.getBoundingClientRect(),l=a.bottom-i.top-8;l>100?o.style.height=`${l}px`:da.warn(`pinWorkbenchHeight: \u8BA1\u7B97\u9AD8\u5EA6\u5F02\u5E38 h=${l}, popupBottom=${a.bottom}, tabTop=${i.top}`)};if(s(),requestAnimationFrame(()=>requestAnimationFrame(s)),typeof ResizeObserver>"u"||e.__yytwwROTarget===r&&e.__yytwwRO)return;if(e.__yytwwRO)try{e.__yytwwRO.disconnect()}catch{}let n=new ResizeObserver(()=>s());n.observe(r),e.__yytwwRO=n,e.__yytwwROTarget=r}function Bh(t){let e=t?.[0];if(!e)return;let r=e.querySelector(".yyt-tww-hero"),s=e.querySelector(".yyt-tww-scroll");if(!r||!s)return;let n=()=>{s.scrollTop>0?r.classList.add("yyt-tww-hero--compact"):r.classList.remove("yyt-tww-hero--compact")};n(),s.addEventListener("scroll",n,{passive:!0})}var da,au,zh,lA,Uh=N(()=>{at();H();Dh();da=C.createScope("TableWorkbenchPanel"),au=!1;zh={id:"tableWorkbenchPanel",render(){iA();try{let t=Oh();return $h(t)}catch(t){return da.error("\u6E32\u67D3\u5DE5\u4F5C\u53F0 UI \u5F02\u5E38",t),`<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5DE5\u4F5C\u53F0\u6E32\u67D3\u5931\u8D25\uFF1A${t?.message||t}</span></div>`}},bindEvents(t){if(!re()||!ke(t))return;let r=this,s=()=>{try{t.html(r.render()),ou(t,s),Lh(t),Bh(t)}catch(n){da.error("refresh \u5F02\u5E38",n)}};ou(t,s),Lh(t),Bh(t)},renderTo(t){!re()||!ke(t)||(t.html(this.render()),this.bindEvents(t))}},lA=zh});var Fh={};le(Fh,{LoggerPanel:()=>jh,default:()=>yA});function uA(t){switch(t){case fe.DEBUG:return"yyt-log-debug";case fe.INFO:return"yyt-log-info";case fe.WARN:return"yyt-log-warn";case fe.ERROR:return"yyt-log-error";default:return""}}function pA(t){let e=new Date(t),r=s=>String(s).padStart(2,"0");return`${r(e.getHours())}:${r(e.getMinutes())}:${r(e.getSeconds())}.${String(e.getMilliseconds()).padStart(3,"0")}`}var cA,dA,jh,yA,Wh=N(()=>{H();ot();at();cA="yyt-logger-panel",dA=[{level:null,label:"\u5168\u90E8",icon:"fa-list"},{level:fe.DEBUG,label:"DEBUG",icon:"fa-bug"},{level:fe.INFO,label:"INFO",icon:"fa-circle-info"},{level:fe.WARN,label:"WARN",icon:"fa-triangle-exclamation"},{level:fe.ERROR,label:"ERROR",icon:"fa-circle-exclamation"}];jh={id:"loggerPanel",render(){let t=C.getStats();return`
      <div class="yyt-logger-panel" id="${cA}">
        <div class="yyt-logger-toolbar">
          <div class="yyt-logger-filter-btns" data-yyt-log-filter-group>
            ${dA.map((e,r)=>`<button class="yyt-log-filter-btn ${r===0?"yyt-active":""}" data-level="${e.level??""}">
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
    `},bindEvents(t){let e=re();if(!e||!ke(t))return;let r=this,s=null,n=!1,o=[],a=t.find("[data-yyt-log-list]"),i=t.find("[data-yyt-log-search]"),l=t.find("[data-yyt-log-autoscroll]"),c=t.find("[data-yyt-log-pause]");function d(p){if(!p.length){a.html('<div class="yyt-logger-empty">\u6682\u65E0\u5339\u914D\u7684\u65E5\u5FD7\u8BB0\u5F55</div>');return}a.html(p.map(g=>`
        <div class="yyt-log-entry ${uA(g.level)}" data-log-id="${g.id}">
          <span class="yyt-log-time">${pA(g.timestamp)}</span>
          <span class="yyt-log-level">${C.levelLabel(g.level)}</span>
          <span class="yyt-log-scope">${ce(g.scope)}</span>
          <span class="yyt-log-msg">${ce(g.message)}</span>
          ${g.data!==void 0?`<span class="yyt-log-data">${ce(typeof g.data=="object"?JSON.stringify(g.data):String(g.data))}</span>`:""}
        </div>
      `).join(""))}function u(){let p=i.val()?.trim()||"",{entries:g}=C.getEntries({level:s,search:p||void 0,limit:500});d(g),l.is(":checked")&&requestAnimationFrame(()=>{a[0].scrollTop=a[0].scrollHeight})}function y(){if(n||!o.length)return;let p=o;o=[],u()}this._onLogEntry=p=>{if(n||s!==null&&p.level<s)return;let g=i.val()?.trim().toLowerCase()||"";if(g){let m=p.scope.toLowerCase().includes(g),h=p.message.toLowerCase().includes(g);if(!m&&!h)return}o.push(p),o.length>=50?y():this._flushTimer||(this._flushTimer=setTimeout(()=>{this._flushTimer=null,y(),r._updateStats(t)},250))},W.on("logger:entry",this._onLogEntry),t.on("click.yytLogger","[data-yyt-log-filter-group] .yyt-log-filter-btn",p=>{t.find("[data-yyt-log-filter-group] .yyt-log-filter-btn").removeClass("yyt-active"),e(p.currentTarget).addClass("yyt-active");let g=e(p.currentTarget).data("level");s=g===""?null:g,u(),r._updateStats(t)}),i.on("input.yytLogger",()=>{u()}),t.on("click.yytLogger","[data-yyt-log-pause]",()=>{n=!n,c.toggleClass("yyt-active",n),c.html(n?'<i class="fa-solid fa-play"></i> \u7EE7\u7EED':'<i class="fa-solid fa-pause"></i> \u6682\u505C'),n||(o=[],u(),r._updateStats(t))}),t.on("click.yytLogger","[data-yyt-log-clear]",()=>{C.clear(),a.html('<div class="yyt-logger-empty">\u65E5\u5FD7\u5DF2\u6E05\u9664</div>'),r._updateStats(t)}),t.on("click.yytLogger","[data-yyt-log-export]",()=>{let{entries:p}=C.getEntries({limit:1e4}),g=JSON.stringify(p.map(v=>({time:new Date(v.timestamp).toISOString(),level:C.levelLabel(v.level),scope:v.scope,message:v.message,data:v.data})),null,2),m=new Blob([g],{type:"application/json"}),h=URL.createObjectURL(m),x=document.createElement("a");x.href=h,x.download=`yyt-logs-${new Date().toISOString().replace(/[:.]/g,"-")}.json`,x.click(),URL.revokeObjectURL(h)}),u()},_updateStats(t){if(!re()||!ke(t))return;let r=C.getStats(),s=t.find(".yyt-logger-stats");s.length&&s.html(`
      <span class="yyt-logger-stat">\u5171 <strong>${r.total}</strong> \u6761</span>
      ${["ERROR","WARN","INFO","DEBUG"].map(n=>`<span class="yyt-logger-stat yyt-log-${n.toLowerCase()}">${n}: <strong>${r.byLevel[n]||0}</strong></span>`).join("")}
    `)},destroy(t){let e=re();this._onLogEntry&&(W.off("logger:entry",this._onLogEntry),this._onLogEntry=null),this._flushTimer&&(clearTimeout(this._flushTimer),this._flushTimer=null),!(!e||!ke(t))&&t.off(".yytLogger")},getStyles(){return`
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
    `}},yA=jh});var Zh={};le(Zh,{MAIN_TAB_RENDERERS:()=>vu,PanelState:()=>gl,SCRIPT_ID:()=>ws,SUB_TAB_RENDERERS:()=>Tu,UIManager:()=>mo,bindDialogEvents:()=>ao,closeActiveCustomSelectDropdown:()=>ar,closeCustomSelectDropdown:()=>xl,createDialogHtml:()=>oo,default:()=>gA,destroyEnhancedCustomSelects:()=>Nt,downloadJson:()=>io,enhanceNativeSelects:()=>lr,escapeHtml:()=>ce,fillFormWithConfig:()=>qb,getAllStyles:()=>Qh,getFormApiConfig:()=>Gb,getJQuery:()=>re,getTargetDocument:()=>Wt,initUI:()=>Yh,isContainerValid:()=>ke,normalizeCustomSelectOptions:()=>Hu,openCustomSelectDropdown:()=>Fu,readFileContent:()=>lo,registerComponents:()=>iu,renderApiPanel:()=>lu,renderBypassPanel:()=>hu,renderCustomSelectControl:()=>Gu,renderEscapeTransformToolPanel:()=>gu,renderLoggerPanel:()=>wu,renderMainTab:()=>Jh,renderPunctuationTransformToolPanel:()=>mu,renderRegexPanel:()=>du,renderSettingsPanel:()=>bu,renderStatusBlockPanel:()=>yu,renderSubTabComponent:()=>Xh,renderSummaryToolPanel:()=>pu,renderTableTemplatePanel:()=>uu,renderTableWorkbenchPanel:()=>xu,renderToolPanel:()=>Vh,renderWorldbookPresetPanel:()=>cu,renderYouyouReviewPanel:()=>fu,repositionActiveCustomSelectDropdown:()=>hl,resetJQueryCache:()=>Bb,showConfirm:()=>_r,showPrompt:()=>Yb,showToast:()=>ha,showTopNotice:()=>bl,toggleCustomSelectDropdown:()=>Wu,uiManager:()=>Zt,withButtonLoading:()=>Vb});async function Gh(t){if(!nl.has(t)){let e=Hh[t];if(typeof e!="function")throw new Error(`unknown_panel:${t}`);nl.set(t,e().then(r=>{let s=r?.[t]||r?.default;if(!s?.id)throw new Error(`invalid_panel:${t}`);return s}).catch(r=>{throw nl.delete(t),r}))}return nl.get(t)}function qh(t,e=null){let r=e?.message?`\uFF1A${ce(e.message)}`:"";return`<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>${ce(t)}${r}</span></div>`}async function iu(){let t=await Promise.allSettled(Object.keys(Hh).map(async r=>{let s=await Gh(r);return Zt.register(s.id,s),s.id})),e=t.filter(r=>r.status==="rejected");e.length&&e.forEach(r=>ua.error("\u7EC4\u4EF6\u6CE8\u518C\u5931\u8D25",r.reason)),ua.log(`\u7EC4\u4EF6\u6CE8\u518C\u5B8C\u6210\uFF0C\u6210\u529F ${t.length-e.length} \u4E2A\uFF0C\u5931\u8D25 ${e.length} \u4E2A`)}async function Yh(t={}){let{autoInjectStyles:e=!0,targetDocument:r,...s}=t;Zt.init(s),await iu(),e&&Zt.injectStyles(r),ua.log("\u6A21\u5757\u521D\u59CB\u5316\u5B8C\u6210")}async function fA(t){let e=await Gh(t);return Zt.getComponent(e.id)||Zt.register(e.id,e),e}async function Pt(t,e,r={}){let s=await fA(t);Zt.render(s.id,e,r)}function lu(t){return Pt("ApiPresetPanel",t)}function cu(t){return Pt("WorldbookPresetPanel",t)}function du(t){return Pt("RegexExtractPanel",t)}function uu(t){return Pt("TableTemplatePanel",t)}function Vh(t){return Pt("ToolManagePanel",t)}function pu(t){return Pt("SummaryToolPanel",t)}function yu(t){return Pt("StatusBlockPanel",t)}function fu(t){return Pt("YouyouReviewPanel",t)}function gu(t){return Pt("EscapeTransformToolPanel",t)}function mu(t){return Pt("PunctuationTransformToolPanel",t)}function hu(t){return Pt("BypassPanel",t)}function bu(t){return Pt("SettingsPanel",t)}function xu(t){return Pt("TableWorkbenchPanel",t)}function wu(t){return Pt("LoggerPanel",t)}async function Jh(t,e){let r=vu[t];if(!r)return!1;try{await r.render(e)}catch(s){ua.error(r.failMessage,s),e.html(qh(r.failMessage,s))}return!0}async function Xh(t,e){let r=Tu[t];if(!r)return null;try{await r.render(e)}catch(s){ua.error(r.failMessage,s),e.html(qh(r.failMessage,s))}return t}function Qh(){return Zt.getAllStyles()}var ua,Hh,nl,vu,Tu,gA,eb=N(()=>{H();Ml();at();at();Ml();ua=C.createScope("UI"),Hh=Object.freeze({ApiPresetPanel:()=>Promise.resolve().then(()=>(vp(),wp)),WorldbookPresetPanel:()=>Promise.resolve().then(()=>(zp(),Bp)),RegexExtractPanel:()=>Promise.resolve().then(()=>(Hy(),Wy)),TableTemplatePanel:()=>Promise.resolve().then(()=>(ag(),og)),ToolManagePanel:()=>Promise.resolve().then(()=>(cg(),lg)),SummaryToolPanel:()=>Promise.resolve().then(()=>(Pg(),Mg)),StatusBlockPanel:()=>Promise.resolve().then(()=>(Og(),$g)),YouyouReviewPanel:()=>Promise.resolve().then(()=>(Bg(),Lg)),EscapeTransformToolPanel:()=>Promise.resolve().then(()=>(jg(),Ug)),PunctuationTransformToolPanel:()=>Promise.resolve().then(()=>(Hg(),Wg)),BypassPanel:()=>Promise.resolve().then(()=>(Yg(),qg)),SettingsPanel:()=>Promise.resolve().then(()=>(xd(),bd)),TableWorkbenchPanel:()=>Promise.resolve().then(()=>(Uh(),Kh)),LoggerPanel:()=>Promise.resolve().then(()=>(Wh(),Fh))}),nl=new Map;vu=Object.freeze({tableWorkbench:{render:t=>xu(t),failMessage:"\u586B\u8868\u5DE5\u4F5C\u53F0\u52A0\u8F7D\u5931\u8D25"},bypass:{render:t=>hu(t),failMessage:"Ai\u6307\u4EE4\u9884\u8BBE\u9762\u677F\u52A0\u8F7D\u5931\u8D25"},settings:{render:t=>bu(t),failMessage:"\u8BBE\u7F6E\u9762\u677F\u52A0\u8F7D\u5931\u8D25"},logger:{render:t=>wu(t),failMessage:"\u65E5\u5FD7\u9762\u677F\u52A0\u8F7D\u5931\u8D25"}}),Tu=Object.freeze({ApiPresetPanel:{render:t=>lu(t),failMessage:"API \u9884\u8BBE\u9762\u677F\u52A0\u8F7D\u5931\u8D25"},RegexExtractPanel:{render:t=>du(t),failMessage:"\u6B63\u5219\u63D0\u53D6\u9762\u677F\u52A0\u8F7D\u5931\u8D25"},WorldbookPresetPanel:{render:t=>cu(t),failMessage:"\u4E16\u754C\u4E66\u9884\u8BBE\u9762\u677F\u52A0\u8F7D\u5931\u8D25"},TableTemplatePanel:{render:t=>uu(t),failMessage:"\u8868\u683C\u6A21\u677F\u9762\u677F\u52A0\u8F7D\u5931\u8D25"},SummaryToolPanel:{render:t=>pu(t),failMessage:"\u6458\u8981\u5DE5\u5177\u52A0\u8F7D\u5931\u8D25"},StatusBlockPanel:{render:t=>yu(t),failMessage:"\u4E3B\u89D2\u72B6\u6001\u680F\u52A0\u8F7D\u5931\u8D25"},YouyouReviewPanel:{render:t=>fu(t),failMessage:"\u5C0F\u5E7D\u70B9\u8BC4\u52A0\u8F7D\u5931\u8D25"},EscapeTransformToolPanel:{render:t=>gu(t),failMessage:"\u8F6C\u4E49\u5904\u7406\u5DE5\u5177\u52A0\u8F7D\u5931\u8D25"},PunctuationTransformToolPanel:{render:t=>mu(t),failMessage:"\u4E2D\u6587\u6807\u70B9\u66FF\u6362\u5DE5\u5177\u52A0\u8F7D\u5931\u8D25"}});gA={uiManager:Zt,registerComponents:iu,initUI:Yh,renderApiPanel:lu,renderWorldbookPresetPanel:cu,renderRegexPanel:du,renderTableTemplatePanel:uu,renderToolPanel:Vh,renderSummaryToolPanel:pu,renderStatusBlockPanel:yu,renderYouyouReviewPanel:fu,renderEscapeTransformToolPanel:gu,renderPunctuationTransformToolPanel:mu,renderBypassPanel:hu,renderSettingsPanel:bu,renderTableWorkbenchPanel:xu,renderLoggerPanel:wu,MAIN_TAB_RENDERERS:vu,SUB_TAB_RENDERERS:Tu,renderMainTab:Jh,renderSubTabComponent:Xh,getAllStyles:Qh}});var ab={};le(ab,{TX_PHASE:()=>Xt,ToolAutomationService:()=>al,Transaction:()=>ol,default:()=>wA,toolAutomationService:()=>ob});function me(t){return t==null?"":String(t).trim()}function tb(t){let e=Da(t);return me(e?.chatId??e?.chat_id??t?.chatId??t?.chat_id??t?.chat_filename??t?.this_chid??"chat_default")||"chat_default"}function Su(t){let e=Da(t);return Array.isArray(e?.chat)?e.chat:Array.isArray(t?.chat)?t.chat:[]}function nb(t){if(!t||t?.is_user===!0||t?.is_system===!0)return!1;let e=String(t?.role||"").trim().toLowerCase();return e==="user"||e==="system"?!1:e==="assistant"||e==="ai"||!e}function mA(t,e){let r=me(e);if(!r)return null;let s=Su(t);for(let n=s.length-1;n>=0;n-=1){let o=s[n];if([o?.messageId,o?.message_id,o?.id,o?.mid,o?.mesid,o?.chat_index,n].map(i=>me(i)).includes(r))return o||null}return null}function rb(t){let e=Su(t);if(!Array.isArray(e)||e.length===0)return null;let r=e.length-1,s=e[r]||null;if(!nb(s))return null;let n=me(s?.messageId??s?.message_id??s?.id??s?.mid??s?.mesid??s?.chat_index??r);return n?{messageId:n,swipeId:me(s?.swipeId??s?.swipe_id??s?.swipe??s?.swipeIndex),message:s}:null}function xA(){let t=Date.now().toString(36),e=Math.random().toString(36).slice(2,8);return`tx_${t}_${e}`}var Qe,sb,hA,bA,Xt,ol,al,ob,wA,ib=N(()=>{jo();H();La();gr();Wo();od();ks();Vi();qt();Qe=C.createScope("ToolAutomation");sb=1e4,hA=15e3,bA=800;Xt=Object.freeze({RECEIVED:"received",CONFIRMED:"confirmed",CONTEXT_BUILT:"context_built",REQUEST_STARTED:"request_started",REQUEST_FINISHED:"request_finished",WRITEBACK_STARTED:"writeback_started",WRITEBACK_COMMITTED:"writeback_committed",REFRESH_CONFIRMED:"refresh_confirmed",SKIPPED:"skipped",FAILED:"failed"}),ol=class{constructor({chatId:e,messageId:r,swipeId:s,sourceEvent:n,generationKey:o}){this.traceId=xA(),this.chatId=e||"",this.messageId=r||"",this.swipeId=s||"",this.sourceEvent=n||"",this.generationKey=o||"",this.phase=Xt.RECEIVED,this.createdAt=Date.now(),this.updatedAt=Date.now(),this.verdict="",this.error=null,this.toolResults=[],this.writebackState=null,this.refreshState=null}transition(e,r={}){return this.phase=e,this.updatedAt=Date.now(),Object.assign(this,r),this}toSnapshot(){return{...this}}},al=class{constructor(){this._stopCallbacks=[],this._pendingTimers=new Map,this._recentlyProcessedSlots=new Map,this._ownWriteMessageIds=new Map,this._slotQueues=new Map,this._activeTransactions=new Map,this._isProcessing=!1,this._currentChatId="",this.debugMode=!1,this._transactionHistory=[],this._maxHistorySize=30,this._hostBindingStatus={initialized:!1,initAttempts:0,lastInitAt:0,lastInitResult:"idle",source:"unavailable",hasEventSource:!1,hasEventTypes:!1,eventBindings:[],retryScheduled:!1,retryDelayMs:0,lastError:""},this._messageReceivedThrottleUntil=0}setDebugMode(e){this.debugMode=e===!0}init(e={}){this.stop(),this._hostBindingStatus.lastInitAt=Date.now(),this._hostBindingStatus.initAttempts=(this._hostBindingStatus.initAttempts||0)+1;let r=Hr();this._currentChatId=tb(r);let s=(n,...o)=>{let a=Hr(),{messageId:i,swipeId:l}=this._extractIdentitiesFromArgs(o);if(Qe.debug(`\u6536\u5230\u5BBF\u4E3B\u4E8B\u4EF6 "${n}"`,{messageId:i,swipeId:l,argCount:o.length}),n===Ge.MESSAGE_RECEIVED){let m=Date.now();if(m<this._messageReceivedThrottleUntil){Qe.debug(`MESSAGE_RECEIVED \u5728\u8282\u6D41\u7A97\u53E3\u5185\uFF0C\u8DF3\u8FC7\uFF08\u5269\u4F59 ${this._messageReceivedThrottleUntil-m}ms\uFF09`);return}this._messageReceivedThrottleUntil=m+this._getSettleMs()+5e3}let c=null,d=i,u=l;if(d&&(c=mA(a,d)),!c){let m=rb(a);m?.messageId&&(c=m.message,d=m.messageId,u=m.swipeId||u)}if(!d||!c){Qe.debug(`\u4E8B\u4EF6 "${n}" \u65E0 assistant \u76EE\u6807\uFF0C\u8DF3\u8FC7`);return}if(!nb(c)){Qe.debug(`\u4E8B\u4EF6 "${n}" \u547D\u4E2D\u975E assistant \u6D88\u606F\uFF0C\u8DF3\u8FC7`,{messageId:d});return}let y=String(c.content||c.mes||"").trim();if(!y||y.length<5){Qe.debug(`\u4E8B\u4EF6 "${n}" \u6D88\u606F\u8FC7\u77ED\uFF08${y.length} \u5B57\u7B26\uFF09\uFF0C\u8DF3\u8FC7`);return}if(this._isProcessing){Qe.debug(`\u4E8B\u4EF6 "${n}" \u6B63\u5728\u5904\u7406\u4E2D\uFF0C\u8DF3\u8FC7`);return}if(this._isOwnWrite(d)){Qe.debug(`\u4E8B\u4EF6 "${n}" \u547D\u4E2D own-write \u9ED1\u540D\u5355\uFF0C\u8DF3\u8FC7`,{messageId:d});return}let p=me(c?.swipeId??c?.swipe_id??c?.swipe??c?.swipeIndex);p&&(u=p);let g=`${d}::${u}`;if(this._isRecentlyProcessed(g)){Qe.debug(`\u4E8B\u4EF6 "${n}" slot \u5DF2\u8FD1\u671F\u5904\u7406\u8FC7\uFF0C\u8DF3\u8FC7`,{slotKey:g});return}this._scheduleMessageProcessing(d,u,{settleMs:this._getSettleMs(),sourceEvent:n}),Qe.info(`\u4E8B\u4EF6 "${n}" \u901A\u8FC7\u6240\u6709\u5B88\u536B\uFF0C\u5DF2\u8C03\u5EA6\u5904\u7406`,{targetMessageId:d,targetSwipeId:u,throttleUntil:this._messageReceivedThrottleUntil,isProcessing:this._isProcessing})};return this._stopCallbacks.push(_t.subscribe(Ge.MESSAGE_SENT,()=>{Qe.debug("MESSAGE_SENT \u2192 \u6E05\u7406\u8C03\u5EA6\u961F\u5217"),this._pendingTimers.forEach(n=>clearTimeout(n)),this._pendingTimers.clear()})),this._stopCallbacks.push(_t.subscribe(Ge.MESSAGE_RECEIVED,(...n)=>{s(Ge.MESSAGE_RECEIVED,...n)})),this._stopCallbacks.push(_t.subscribe(Ge.GENERATION_STOPPED,()=>{Qe.info("GENERATION_STOPPED \u2192 \u53D6\u6D88\u6240\u6709\u6D3B\u8DC3\u4E8B\u52A1"),this._cancelActiveTransactions("generation_stopped"),this._pendingTimers.forEach(n=>clearTimeout(n)),this._pendingTimers.clear(),this._isProcessing=!1})),this._stopCallbacks.push(_t.subscribe(Ge.CHAT_CHANGED,()=>{this._resetForChatChange()})),this._stopCallbacks.push(_t.subscribe(Ge.MESSAGE_DELETED,n=>{this._clearMessageState(me(n))})),this._refreshHostBindingStatus(),this._seedKnownSlots(),Qe.info("\u81EA\u52A8\u5316\u670D\u52A1\u5DF2\u521D\u59CB\u5316",{chatId:this._currentChatId,source:this._hostBindingStatus.source}),!0}_seedKnownSlots(){try{let e=Hr(),r=rb(e);if(!r?.messageId)return;let s=`${me(r.messageId)}::${me(r.swipeId)}`;this._recentlyProcessedSlots.set(s,Number.MAX_SAFE_INTEGER),Qe.debug(`\u5DF2\u5C06\u5F53\u524D\u6700\u65B0 slot "${s}" \u9884\u6807\u8BB0\u4E3A\u5DF2\u77E5\uFF0C\u8DF3\u8FC7 MESSAGE_RECEIVED \u91CD\u653E`)}catch(e){Qe.warn("_seedKnownSlots \u5931\u8D25",{error:e})}}_refreshHostBindingStatus(){let e=_t.describe(),r=[Ge.MESSAGE_SENT,Ge.MESSAGE_RECEIVED,Ge.GENERATION_STOPPED,Ge.CHAT_CHANGED,Ge.MESSAGE_DELETED];this._hostBindingStatus={...this._hostBindingStatus,initialized:!!e.hasBridge,lastInitResult:e.hasBridge?"ready":e.retryScheduled?"pending_retry":"pending",source:e.source,hasEventSource:!!e.hasBridge,hasEventTypes:Array.isArray(e.availableEvents)&&e.availableEvents.length>0,eventBindings:r.map(s=>`subscribed: ${s}`),retryScheduled:!!e.retryScheduled,retryDelayMs:0,lastError:""}}stop(){this._stopCallbacks.forEach(e=>{try{e()}catch(r){Qe.warn("\u505C\u6B62\u56DE\u8C03\u5931\u8D25",{error:r})}}),this._stopCallbacks=[],this._pendingTimers.forEach(e=>clearTimeout(e)),this._pendingTimers.clear(),this._slotQueues.clear(),this._recentlyProcessedSlots.clear(),this._ownWriteMessageIds.clear(),this._cancelActiveTransactions("service_stopped"),this._activeTransactions.clear(),this._isProcessing=!1,this._hostBindingStatus={initialized:!1,initAttempts:0,lastInitAt:0,lastInitResult:"idle",source:"unavailable",hasEventSource:!1,hasEventTypes:!1,eventBindings:[],retryScheduled:!1,retryDelayMs:0,lastError:""}}isEnabled(){return!0}getRuntimeSnapshot(){return this._pruneRecentSlots(),this._pruneOwnWrites(),this._refreshHostBindingStatus(),{currentChatId:this._currentChatId,enabled:!0,isProcessing:this._isProcessing,pendingTimerCount:this._pendingTimers.size,queuedSlotCount:this._slotQueues.size,recentlyProcessedSlotCount:this._recentlyProcessedSlots.size,ownWriteMessageIdCount:this._ownWriteMessageIds.size,activeTransactionCount:this._activeTransactions.size,recentTransactions:this._transactionHistory.slice(-10).map(e=>e.toSnapshot()),hostBinding:{...this._hostBindingStatus,eventBindings:Array.isArray(this._hostBindingStatus?.eventBindings)?[...this._hostBindingStatus.eventBindings]:[]},settings:this._getAutomationSettings()}}async processCurrentAssistantMessage(e={}){let r=await Is({messageId:"",swipeId:"",runSource:"AUTO"}),s=me(r?.sourceMessageId||r?.messageId);return s?this.processAssistantMessage(s,{force:e.force===!0,swipeId:me(r?.sourceSwipeId),sourceEvent:e.sourceEvent||"MANUAL_CURRENT_ASSISTANT"}):{success:!1,error:"\u672A\u627E\u5230\u5F53\u524D assistant \u697C\u5C42"}}async processAssistantMessage(e,{force:r=!1,swipeId:s="",sourceEvent:n="AUTO"}={}){let o=new ol({chatId:this._currentChatId,messageId:e,swipeId:s,sourceEvent:n});try{if(!e)return this._skipTransaction(o,"missing_message_id");o.transition(Xt.CONFIRMED);let a=await Is({messageId:e,swipeId:s,runSource:"AUTO"}),i=a?.targetAssistantMessage||null;if(!i||!a?.sourceMessageId)return this._skipTransaction(o,"assistant_message_not_found");let l=String(i.content||i.mes||"").trim();if(!l||l.length<5)return this._skipTransaction(o,"assistant_message_too_short");o.transition(Xt.CONTEXT_BUILT);let c=`${me(a.sourceMessageId)}::${me(a.sourceSwipeId||s)}`;if(o.generationKey=c,!r&&this._isRecentlyProcessed(c))return this._skipTransaction(o,"duplicate_slot",{slotKey:c});let d=Co(),u=jt.filterAutoPostResponseTools(d),p=[...d.filter(h=>jt.shouldRunLocalTransform(h)&&h.output?.autoTrigger!==!1),...u],g=be(),m=g?.autoUpdateEnabled===!0&&me(g?.autoUpdateTrigger||"assistantMessage")==="assistantMessage";return!p.length&&!m?this._skipTransaction(o,"no_auto_tools",{tools:p}):(o.slotKey=c,o.slotRevisionKey=a.slotRevisionKey||"",o.sourceMessageId=a.sourceMessageId||e,o.sourceSwipeId=a.sourceSwipeId||s||"",this._enqueueSlot(c,async()=>{if(!r&&this._isRecentlyProcessed(c))return this._skipTransaction(o,"duplicate_slot_after_queue",{slotKey:c});this._isProcessing=!0,this._markSlotProcessed(c),o.transition(Xt.REQUEST_STARTED);let h=new AbortController;this._registerActiveTransaction(o,{controller:h,slotKey:c,sourceMessageId:a.sourceMessageId||e,sourceSwipeId:a.sourceSwipeId||s||""});try{let{results:x,hasWriteback:v}=await this._executeAutoTools(p,a,h,o,{slotKey:c,messageId:e,swipeId:s}),{tableResult:T,hasWriteback:A}=await this._executeAutoTableUpdate(a,h,o,{shouldRunTableAuto:m,tableWorkbenchConfig:g,messageId:e,swipeId:s,sourceEvent:n}),E=v||A;o.transition(Xt.REQUEST_FINISHED,{toolResults:x,tableResult:T}),E&&(o.transition(Xt.WRITEBACK_STARTED),o.writebackState={messageId:a.sourceMessageId,swipeId:a.sourceSwipeId,hasOutput:!0},this._messageReceivedThrottleUntil=Date.now()+hA),this._markSlotProcessed(c);let w=x.every(_=>_?.success!==!1),P=!m||!!T?.success||T?.skipped===!0||T?.meta?.aborted===!0||T?.meta?.stale===!0,$=w&&P,B=x.some(_=>_?.meta?.aborted===!0||_?.meta?.stale===!0||_?.error==="\u8BF7\u6C42\u5DF2\u53D6\u6D88")||T?.meta?.aborted===!0||T?.meta?.stale===!0;$&&o.transition(Xt.WRITEBACK_COMMITTED);let R=$?Xt.REFRESH_CONFIRMED:Xt.FAILED;return o.transition(R,{verdict:B?"aborted":$?"success":"partial_failure"}),this._recordTransaction(o),this._updateAutoRuntimeForResults(p,a,o,x),{success:$,traceId:o.traceId,slotKey:c,sourceEvent:n,messageId:a.sourceMessageId||e,phase:o.phase,results:x,tableResult:T}}finally{this._unregisterActiveTransaction(o.traceId),this._isProcessing=!1}}))}catch(a){return o.transition(Xt.FAILED,{error:a?.message||String(a)}),this._recordTransaction(o),this._unregisterActiveTransaction(o.traceId),this._isProcessing=!1,Qe.error("processAssistantMessage \u5F02\u5E38",{error:a}),{success:!1,traceId:o.traceId,error:o.error,phase:o.phase}}}_extractIdentitiesFromArgs(e){let r="",s="";for(let n of e)if(n!=null){if(typeof n=="number"&&Number.isFinite(n)&&!r){r=me(n);continue}if(typeof n=="string"){let o=me(n);!r&&/^\d+$/.test(o)&&(r=o);continue}typeof n=="object"&&(r||(r=me(n.messageId??n.message_id??n.id??n.mid??n.mesid??n.chat_index??n.message?.messageId??n.message?.message_id??n.message?.id??n.message?.mid??n.message?.mesid??n.message?.chat_index??n.data?.messageId??n.data?.message_id??n.data?.id??n.data?.mid??n.data?.mesid??n.data?.chat_index??n.target?.messageId??n.target?.message_id??n.target?.id??n.target?.mid??n.target?.mesid??n.target?.chat_index)),s||(s=me(n.swipeId??n.swipe_id??n.swipe??n.swipeIndex??n.currentSwipe??n.message?.swipeId??n.message?.swipe_id??n.message?.swipe??n.data?.swipeId??n.data?.swipe_id??n.data?.swipe??n.target?.swipeId??n.target?.swipe_id??n.target?.swipe)))}return{messageId:r,swipeId:s}}_scheduleMessageProcessing(e,r="",s={}){let n=s.settleMs??this._getSettleMs(),o=`msg::${me(e)}::${me(r)}`,a=this._pendingTimers.get(o);a&&clearTimeout(a);let i=setTimeout(()=>{this._pendingTimers.delete(o),this.processAssistantMessage(e,{swipeId:r,sourceEvent:s.sourceEvent||"AUTO"}).catch(l=>{Qe.error("\u8C03\u5EA6\u6267\u884C\u5931\u8D25",{messageId:e,error:l})})},Math.max(0,n));this._pendingTimers.set(o,i),Qe.info("\u5DF2\u8C03\u5EA6\u6D88\u606F\u5904\u7406",{timerKey:o,settleMs:n,sourceEvent:s.sourceEvent})}cancelAutomation(e={}){let r=e.reason||"manual_cancel",s=me(e.messageId),n=me(e.slotKey),o=me(e.traceId),a=0;for(let[i,l]of this._pendingTimers){let c=s&&i.includes(`::${s}::`),d=n&&i.includes(n);(c||d||!s&&!n&&!o)&&(clearTimeout(l),this._pendingTimers.delete(i),a+=1)}return a+=this._cancelActiveTransactions(r,{messageId:s,slotKey:n,traceId:o}),{success:a>0,cancelledCount:a,reason:r}}_isRecentlyProcessed(e){if(!e)return!1;this._pruneRecentSlots();let r=this._recentlyProcessedSlots.get(e);return r?Date.now()-r<this._getDedupeWindowMs():!1}_markSlotProcessed(e){e&&(this._recentlyProcessedSlots.set(e,Date.now()),this._pruneRecentSlots())}_pruneRecentSlots(){let e=Date.now()-this._getDedupeWindowMs();for(let[r,s]of this._recentlyProcessedSlots)(!Number.isFinite(s)||s<e)&&this._recentlyProcessedSlots.delete(r)}async _executeAutoTools(e,r,s,n,{slotKey:o,messageId:a,swipeId:i}){let l=[],c=!1,d=r.lastAiMessage,u=r.assistantBaseText;for(let y of e){let p={...r,signal:s.signal,isAutoRun:!0,abortMeta:{traceId:n.traceId,slotKey:o,sourceMessageId:r.sourceMessageId||a,sourceSwipeId:r.sourceSwipeId||i||""},shouldAbortWriteback:()=>this._shouldAbortAutoWriteback({traceId:n.traceId}),skipNotify:!0,lastAiMessage:d,assistantBaseText:u,input:{...r.input||{},lastAiMessage:d,assistantBaseText:u}},m=jt.shouldRunLocalTransform(y)?await _i(y,p):await jt.runToolPostResponse(y,p);if(l.push(m),m?.writebackState||m?.output){c=!0,this._markOwnWrite(r.sourceMessageId||a);let h=this._readCurrentMessageText(r.sourceMessageId||a);if(h){d=h,u=h;let x=Number(r.sourceMessageId||a);Array.isArray(r.chatMessages)&&r.chatMessages[x]&&(r.chatMessages[x].content=h,r.chatMessages[x].mes=h)}}}return{results:l,hasWriteback:c}}async _executeAutoTableUpdate(e,r,s,{shouldRunTableAuto:n,tableWorkbenchConfig:o,messageId:a,swipeId:i,sourceEvent:l}){if(!n)return{tableResult:null,hasWriteback:!1};let c=await oh({messageId:e.sourceMessageId||a,swipeId:e.sourceSwipeId||i||"",sourceEvent:l,configInput:o,signal:r.signal,shouldAbortWriteback:()=>this._shouldAbortAutoWriteback({traceId:s.traceId})}),d=!!(c?.state||c?.mirrorResult?.success===!0);return d&&this._markOwnWrite(e.sourceMessageId||a),{tableResult:c,hasWriteback:d}}_readCurrentMessageText(e){let r=Hr(),s=Su(r),n=Number(e);if(!Number.isFinite(n)||n<0||n>=s.length)return"";let o=s[n];return String(o?.mes||o?.content||"").trim()}_markOwnWrite(e){let r=me(e);r&&(this._ownWriteMessageIds.set(r,Date.now()),this._pruneOwnWrites())}_isOwnWrite(e){let r=me(e);if(!r)return!1;this._pruneOwnWrites();let s=this._ownWriteMessageIds.get(r);return s?Date.now()-s<sb:!1}_pruneOwnWrites(){let e=Date.now()-sb;for(let[r,s]of this._ownWriteMessageIds)(!Number.isFinite(s)||s<e)&&this._ownWriteMessageIds.delete(r)}_recordTransaction(e){this._transactionHistory.push(e),this._transactionHistory.length>this._maxHistorySize&&(this._transactionHistory=this._transactionHistory.slice(-this._maxHistorySize)),Qe.debug(`\u4E8B\u52A1 [${e.traceId}] \u2192 ${e.phase}`,{messageId:e.messageId,generationKey:e.generationKey,verdict:e.verdict,sourceEvent:e.sourceEvent,error:e.error})}_skipTransaction(e,r,s={}){return e.transition(Xt.SKIPPED,{verdict:r,...s}),this._recordTransaction(e),Array.isArray(s?.tools)&&s.tools.length>0&&this._updateAutoRuntimeForSkip(s.tools,e,r,s),{success:!1,skipped:!0,reason:r,traceId:e.traceId,...s}}_enqueueSlot(e,r){let n=(this._slotQueues.get(e)||Promise.resolve()).catch(()=>{}).then(r).finally(()=>{this._slotQueues.get(e)===n&&this._slotQueues.delete(e)});return this._slotQueues.set(e,n),n}_registerActiveTransaction(e,r={}){e?.traceId&&this._activeTransactions.set(e.traceId,{traceId:e.traceId,generationKey:r.generationKey||e.generationKey||"",slotKey:r.slotKey||e.slotKey||"",sourceMessageId:r.sourceMessageId||e.sourceMessageId||"",sourceSwipeId:r.sourceSwipeId||e.sourceSwipeId||"",slotRevisionKey:r.slotRevisionKey||e.slotRevisionKey||"",assistantBaseFingerprint:r.assistantBaseFingerprint||"",assistantBaseText:r.assistantBaseText||"",controller:r.controller||null,cancelled:!1,cancelReason:""})}_unregisterActiveTransaction(e){e&&this._activeTransactions.delete(e)}_cancelActiveTransactions(e="manual_cancel",r={}){let s=me(r.messageId),n=me(r.slotKey),o=me(r.traceId),a=0;for(let[i,l]of this._activeTransactions){let c=o&&i===o,d=s&&me(l?.sourceMessageId)===s,u=n&&me(l?.slotKey)===n;if(!(!c&&!d&&!u&&!(!o&&!s&&!n))){l.cancelled=!0,l.cancelReason=e;try{l?.controller?.abort?.()}catch{}a+=1}}return a}_shouldAbortAutoWriteback(e={}){let r=me(e.traceId);if(r){let s=this._activeTransactions.get(r);if(!s||s.cancelled)return{aborted:!0,reason:"cancelled_before_host_commit"}}return!1}_updateAutoRuntimeForSkip(e,r,s,n={}){e.forEach(o=>{o?.id&&qr(o.id,{lastAutoRunAt:Date.now(),lastAutoStatus:"skipped",lastAutoMessageId:r?.sourceMessageId||r?.messageId||"",lastAutoSwipeId:r?.sourceSwipeId||r?.swipeId||"",lastAutoRevisionKey:r?.slotRevisionKey||n?.slotRevisionKey||"",lastAutoWritebackStatus:"",lastAutoRefreshConfirmed:!1,lastAutoSkipReason:s||""},{touchLastRunAt:!1,emitEvent:!1,emitRuntimeEvent:!0})})}_updateAutoRuntimeForResults(e,r,s,n=[]){e.forEach((o,a)=>{if(!o?.id)return;let i=n[a]||{},l=i?.meta?.writebackDetails||{},c=i?.meta?.aborted===!0||i?.meta?.stale===!0?"aborted":i?.success===!1?"failed":"success",d=i?.meta?.aborted===!0?i?.meta?.abortReason||(i?.meta?.stale===!0?"stale_base_changed":"cancelled_before_host_commit"):"";qr(o.id,{lastAutoRunAt:Date.now(),lastAutoStatus:c,lastAutoMessageId:r?.sourceMessageId||s?.sourceMessageId||s?.messageId||"",lastAutoSwipeId:r?.sourceSwipeId||s?.sourceSwipeId||s?.swipeId||"",lastAutoRevisionKey:r?.slotRevisionKey||s?.slotRevisionKey||"",lastAutoWritebackStatus:i?.meta?.writebackStatus||"",lastAutoRefreshConfirmed:!!l.refreshConfirmed,lastAutoSkipReason:d},{touchLastRunAt:!1,emitEvent:!1,emitRuntimeEvent:!0})})}_resetForChatChange(){let e=Hr(),r=tb(e);Qe.info("\u804A\u5929\u5207\u6362",{from:this._currentChatId,to:r}),this._currentChatId=r,this._pendingTimers.forEach(s=>clearTimeout(s)),this._pendingTimers.clear(),this._slotQueues.clear(),this._recentlyProcessedSlots.clear(),this._ownWriteMessageIds.clear(),this._cancelActiveTransactions("chat_changed"),this._activeTransactions.clear(),this._isProcessing=!1,this._messageReceivedThrottleUntil=0,this._seedKnownSlots()}_clearMessageState(e){if(e){for(let[r,s]of this._pendingTimers)(r.includes(`::${e}::`)||r.startsWith(`msg::${e}::`))&&(clearTimeout(s),this._pendingTimers.delete(r));for(let r of this._recentlyProcessedSlots.keys())r.startsWith(`${e}::`)&&this._recentlyProcessedSlots.delete(r);this._ownWriteMessageIds.delete(me(e)),this._seedKnownSlots()}}_getAutomationSettings(){let e=Vt.getSettings()?.automation||{},r=Number.isFinite(e.settleMs)?e.settleMs:bA;return{settleMs:r,dedupeWindowMs:Number.isFinite(e.dedupeWindowMs)?e.dedupeWindowMs:Math.max(5e3,r+600)}}_getSettleMs(){return this._getAutomationSettings().settleMs}_getDedupeWindowMs(){return this._getAutomationSettings().dedupeWindowMs}},ob=new al,wA=ob});var ub={};le(ub,{BUILTIN_REGEX_PRESETS:()=>ll,BUILTIN_WORLDBOOK_PRESETS:()=>_u,MIGRATION_BACKUP_KEY:()=>cb,MIGRATION_DONE_KEY:()=>il,default:()=>_A,ensurePresetSystem:()=>db,registerBuiltinPresets:()=>Au,runMigrationOnce:()=>Eu});function vA(t){if(!Array.isArray(t)||t.length===0)return null;let e=t.map(r=>String(r||"").trim()).filter(Boolean).sort().join("|");if(!e)return null;for(let r of ll)if(r.rules.filter(n=>n.type==="include"&&n.enabled!==!1).map(n=>n.value).sort().join("|")===e)return r.id;return null}function Au(){try{typeof mc=="function"&&mc(ll),typeof jl=="function"&&jl(_u),ys.info("\u5185\u7F6E\u9884\u8BBE\u5DF2\u6CE8\u518C",{regex:ll.length,worldbook:_u.length})}catch(t){ys.error("\u6CE8\u518C\u5185\u7F6E\u9884\u8BBE\u5931\u8D25",{error:t})}}function TA(t){let e=new Set,r=[];for(let s of Array.isArray(t)?t:[]){let n=String(s||"").trim();if(!(!n||e.has(n)))if(e.add(n),n.startsWith("regex:")){let o=n.slice(6).trim();o&&r.push({type:"regex_include",value:o,enabled:!0,name:"",description:""})}else r.push({type:"include",value:n,enabled:!0,name:"",description:""})}return r}function SA(t,e,r){let s=JSON.parse(JSON.stringify(r||{})),n=!1,o=s.extraction||{};if(!o.regexPresetId){let i=Array.isArray(o.selectors)?o.selectors:[];if(i.length>0){let l=vA(i);if(l)o.regexPresetId=l,n=!0,ys.info(`\u5DE5\u5177 ${t} \u7ED1\u5B9A\u5185\u7F6E\u6B63\u5219\u9884\u8BBE: ${l}`);else{let c=qa({name:`${e||t}_\u8FC1\u79FB_\u6B63\u5219`,description:`\u81EA\u8001\u7248\u672C selectors \u81EA\u52A8\u8FC1\u79FB\uFF08${i.length} \u9879\uFF09`,rules:TA(i),blacklist:[]});c?.id&&(o.regexPresetId=c.id,n=!0,ys.info(`\u5DE5\u5177 ${t} \u521B\u5EFA\u8FC1\u79FB\u6B63\u5219\u9884\u8BBE: ${c.id}`))}s.extraction=o}}let a=s.worldbooks||{};if(!a.presetId&&a.enabled===!0&&Array.isArray(a.selected)&&a.selected.length>0){let i=Ra({name:`${e||t}_\u8FC1\u79FB_\u4E16\u754C\u4E66`,description:`\u81EA\u8001\u7248\u672C worldbooks.selected \u81EA\u52A8\u8FC1\u79FB\uFF08${a.selected.length} \u672C\uFF09`,bindingMode:"custom",includeDisabled:!1,bookList:a.selected.map(l=>({bookName:String(l||""),enabled:!0,entryOverrides:{}})).filter(l=>l.bookName)});i?.id&&(a.presetId=i.id,n=!0,ys.info(`\u5DE5\u5177 ${t} \u521B\u5EFA\u8FC1\u79FB\u4E16\u754C\u4E66\u9884\u8BBE: ${i.id}`)),s.worldbooks=a}return n?s:null}function Eu(){try{if(Re.get(il)===!0)return{skipped:!0,reason:"already_done"};let t=z.get(lb)||{};if(!t||typeof t!="object")return ys.info("\u65E0\u5DE5\u5177\u914D\u7F6E\u9700\u8981\u8FC1\u79FB"),Re.set(il,!0),{skipped:!0,reason:"no_configs"};Re.set(cb,{ts:Date.now(),version:"v45",snapshot:t});let e=0,r={...t};for(let[s,n]of Object.entries(t)){if(!n||typeof n!="object")continue;let o=SA(s,n.name,n);o&&(r[s]=o,e+=1)}return e>0&&z.set(lb,r),Re.set(il,!0),ys.info("\u8FC1\u79FB\u5B8C\u6210",{migratedCount:e,total:Object.keys(t).length}),{skipped:!1,migratedCount:e,total:Object.keys(t).length}}catch(t){return ys.error("\u8FC1\u79FB\u5931\u8D25\uFF0C\u5DF2 abort\uFF0C\u8001\u5B57\u6BB5\u4FDD\u7559",{error:t}),{skipped:!1,error:t?.message||String(t),aborted:!0}}}function db(){return Au(),Eu()}var ys,il,cb,lb,ll,_u,_A,pb=N(()=>{He();H();Vr();cn();ys=C.createScope("PresetBootstrap"),il="migration_v45_done",cb="migration_v45_backup",lb="tool_configs",ll=[{id:"builtin_regex_summary",name:"\u5185\u7F6E \xB7 \u603B\u7ED3\u63D0\u53D6",description:"\u63D0\u53D6 <boo_FM> \u6807\u7B7E\u5185\u5BB9\uFF08\u5BF9\u5E94\u5185\u7F6E\u300C\u8BB0\u5FC6\u538B\u7F29\u300D\u5DE5\u5177\uFF09",rules:[{id:"r_builtin_summary_1",type:"include",value:"boo_FM",enabled:!0,name:"\u603B\u7ED3\u6807\u7B7E",description:""}],blacklist:[]},{id:"builtin_regex_status_block",name:"\u5185\u7F6E \xB7 \u72B6\u6001\u680F\u63D0\u53D6",description:"\u63D0\u53D6 <status_block> \u6807\u7B7E\u5185\u5BB9\uFF08\u5BF9\u5E94\u5185\u7F6E\u300C\u72B6\u6001\u680F\u300D\u5DE5\u5177\uFF09",rules:[{id:"r_builtin_status_1",type:"include",value:"status_block",enabled:!0,name:"\u72B6\u6001\u6807\u7B7E",description:""}],blacklist:[]},{id:"builtin_regex_youyou",name:"\u5185\u7F6E \xB7 \u4F18\u4F18\u9510\u8BC4\u63D0\u53D6",description:"\u63D0\u53D6 <youyou> \u6807\u7B7E\u5185\u5BB9\uFF08\u5BF9\u5E94\u5185\u7F6E\u300C\u4F18\u4F18\u9510\u8BC4\u300D\u5DE5\u5177\uFF09",rules:[{id:"r_builtin_youyou_1",type:"include",value:"youyou",enabled:!0,name:"\u4F18\u4F18\u6807\u7B7E",description:""}],blacklist:[]}],_u=[];_A={registerBuiltinPresets:Au,runMigrationOnce:Eu,ensurePresetSystem:db}});var Iu={};le(Iu,{confirmDeleteTool:()=>RA,confirmResetTools:()=>NA,getAllTools:()=>pr,getTool:()=>yr,showExportToolsDialog:()=>MA,showImportToolsDialog:()=>PA,showToolEditDialog:()=>kA});async function kA(t=null){let e=t?yr(t):null,r=!!e,s=ge({value:e?.name||"",placeholder:"\u5DE5\u5177\u540D\u79F0"}),n=_e({value:e?.category||"utility",options:IA}),o=ge({value:e?.description||"",placeholder:"\u5DE5\u5177\u63CF\u8FF0"}),a=f("input",{className:"yyt-input",attrs:{type:"number",min:"1000"},style:{padding:"7px 10px",fontSize:"12px"}});a.value=String(e?.config?.execution?.timeout||6e4);let i=f("input",{className:"yyt-input",attrs:{type:"number",min:"0",max:"10"},style:{padding:"7px 10px",fontSize:"12px"}});i.value=String(e?.config?.execution?.retries??3);function l(p,g,m=""){let h=f("div",{className:"yyt-form-group",style:{margin:"0 0 12px 0"}});return h.appendChild(f("label",{text:p,style:{fontSize:"12px",fontWeight:"600",color:"var(--yyt-text-secondary, rgba(255,255,255,0.55))",display:"block",marginBottom:"4px"}})),h.appendChild(g),m&&h.appendChild(f("div",{text:m,style:{fontSize:"11px",color:"var(--yyt-text-muted)",marginTop:"4px"}})),h}let c=f("div",{style:{display:"flex",flexDirection:"column"}}),d=f("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px"}});d.appendChild(l("\u5DE5\u5177\u540D\u79F0",s.el)),d.appendChild(l("\u5206\u7C7B",n.el)),c.appendChild(d),c.appendChild(l("\u63CF\u8FF0",o.el));let u=f("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px"}});u.appendChild(l("\u8D85\u65F6\u65F6\u95F4 (ms)",a)),u.appendChild(l("\u91CD\u8BD5\u6B21\u6570",i)),c.appendChild(u);let y=Ne.custom({title:r?`\u7F16\u8F91\u5DE5\u5177\u300C${e.name}\u300D`:"\u65B0\u5EFA\u5DE5\u5177",width:"480px",body:c,buttons:[{label:"\u53D6\u6D88",variant:"ghost",onClick:p=>p(null)},{label:r?"\u4FDD\u5B58":"\u521B\u5EFA",variant:"primary",onClick:p=>{let g=String(s.get()||"").trim();if(!g){s.el.focus();return}let m=t||`tool_${Date.now()}`;if(!fn(m,{name:g,category:n.get(),description:String(o.get()||"").trim(),promptTemplate:e?.promptTemplate||"",extractTags:Array.isArray(e?.extractTags)?e.extractTags:[],config:{execution:{timeout:Math.max(1e3,parseInt(a.value,10)||6e4),retries:Math.max(0,parseInt(i.value,10)||3)},api:e?.config?.api||{preset:"",useBypass:!1,bypassPreset:""},messages:Array.isArray(e?.config?.messages)?e.config.messages:[],context:{depth:e?.config?.context?.depth||3,includeTags:Array.isArray(e?.config?.context?.includeTags)?e.config.context.includeTags:[],excludeTags:Array.isArray(e?.config?.context?.excludeTags)?e.config.context.excludeTags:[]},worldbooks:{enabled:e?.config?.worldbooks?.enabled===!0,selected:Array.isArray(e?.config?.worldbooks?.selected)?e.config.worldbooks.selected:[]}},enabled:e?.enabled!==!1})){Cu.warn("saveTool \u5931\u8D25",{id:m});return}try{wn(m)}catch(x){Cu.warn("ensureToolRuntimeConfig \u5F02\u5E38",{err:x})}p(m)}}]});return setTimeout(()=>s.el.focus(),0),y.result}async function RA(t){let e=yr(t);return!e||!await Ne.confirm({title:"\u5220\u9664\u5DE5\u5177",message:`\u786E\u5B9A\u5220\u9664\u5DE5\u5177\u300C${e.name}\u300D\uFF1F\u6B64\u64CD\u4F5C\u4E0D\u53EF\u64A4\u9500\u3002`,confirmText:"\u5220\u9664",danger:!0})?!1:gn(t)}function MA(){let t;try{t=mn()}catch(r){Ne.confirm({title:"\u5BFC\u51FA\u5931\u8D25",message:String(r?.message||r),confirmText:"\u786E\u5B9A"});return}let e=f("textarea",{className:"yyt-textarea",style:{width:"100%",minHeight:"220px",fontSize:"12px",fontFamily:"monospace"}});e.value=t,e.readOnly=!0,Ne.custom({title:"\u5BFC\u51FA\u5DE5\u5177 JSON",width:"600px",body:e,buttons:[{label:"\u5173\u95ED",variant:"ghost",onClick:r=>r(null)},{label:"\u590D\u5236\u5230\u526A\u8D34\u677F",variant:"ghost",onClick:async()=>{try{await navigator.clipboard.writeText(t)}catch{e.select();try{document.execCommand("copy")}catch{}}}},{label:"\u4E0B\u8F7D JSON",variant:"primary",onClick:()=>{try{let r=new Blob([t],{type:"application/json"}),s=URL.createObjectURL(r),n=f("a",{attrs:{href:s,download:`youyou_tools_${Date.now()}.json`}});document.body.appendChild(n),n.click(),setTimeout(()=>{try{document.body.removeChild(n)}catch{}try{URL.revokeObjectURL(s)}catch{}},100)}catch(r){Cu.warn("\u4E0B\u8F7D\u5931\u8D25",{err:r})}}}]})}async function PA(){let t=f("textarea",{className:"yyt-textarea",attrs:{placeholder:"\u7C98\u8D34 YouYou Toolkit \u5DE5\u5177 JSON"},style:{width:"100%",minHeight:"200px",fontSize:"12px",fontFamily:"monospace"}}),e=f("label",{style:{display:"flex",alignItems:"center",gap:"6px",fontSize:"12px",color:"var(--yyt-text-secondary)",marginTop:"8px"}}),r=f("input",{attrs:{type:"checkbox"}});e.appendChild(r),e.appendChild(f("span",{text:"\u8986\u76D6\u6A21\u5F0F\uFF08\u6E05\u7A7A\u5DF2\u6709\u5DE5\u5177\u540E\u518D\u5BFC\u5165\uFF1B\u4E0D\u52FE\u9009\u5219\u5408\u5E76\uFF09"}));let s=f("div");s.appendChild(t),s.appendChild(e),s.appendChild(f("div",{style:{display:"flex",gap:"6px",marginTop:"8px"}},q({label:"\u{1F4C1} \u4ECE\u6587\u4EF6\u2026",size:"small",variant:"ghost",onClick:()=>{let o=f("input",{attrs:{type:"file",accept:"application/json,.json"}});o.addEventListener("change",()=>{let a=o.files?.[0];if(!a)return;let i=new FileReader;i.onload=()=>{t.value=String(i.result||""),t.focus()},i.readAsText(a)}),o.click()}}).el));let n=Ne.custom({title:"\u5BFC\u5165\u5DE5\u5177 JSON",width:"520px",body:s,buttons:[{label:"\u53D6\u6D88",variant:"ghost",onClick:o=>o(null)},{label:"\u5BFC\u5165",variant:"primary",onClick:async o=>{let a=t.value.trim();if(!a){o(null);return}try{let i=hn(a,{overwrite:r.checked});o(i)}catch(i){await Ne.confirm({title:"\u5BFC\u5165\u5931\u8D25",message:String(i?.message||i),confirmText:"\u786E\u5B9A"})}}}]});return setTimeout(()=>t.focus(),0),n.result}async function NA(){return await Ne.confirm({title:"\u91CD\u7F6E\u6240\u6709\u5DE5\u5177",message:"\u6B64\u64CD\u4F5C\u4F1A\u5220\u9664\u6240\u6709\u81EA\u5B9A\u4E49\u5DE5\u5177\u4E0E\u9884\u8BBE\uFF0C\u4E0D\u53EF\u64A4\u9500\u3002\u5185\u7F6E\u5DE5\u5177\u4E0D\u53D7\u5F71\u54CD\u3002",confirmText:"\u91CD\u7F6E",danger:!0})?(bn(),!0):!1}var Cu,IA,ku=N(()=>{Ca();tr();_o();gr();H();Cu=C.createScope("ToolActions"),IA=[{value:"api",label:"API"},{value:"prompt",label:"Prompt"},{value:"utility",label:"Utility"}]});H();var Nu=`/**\r
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
`;at();function yb(t,e={}){let{constants:r,topLevelWindow:s,modules:n}=t,{SCRIPT_ID:o,SCRIPT_VERSION:a,MENU_ITEM_ID:i,MENU_CONTAINER_ID:l}=r,c=null,d=!1,u=C.createScope("Bootstrap");C.setToastHandler((A,E,w)=>{if(w.toast&&ha(w.toast===!0?A:w.toast,E,w.duration),w.topNotice){let P=typeof w.topNotice=="object"?w.topNotice:{};bl(A,E,P)}});function y(...A){u.log(A.join(" "))}function p(...A){u.error(A.join(" "))}async function g(){return c||(c=(async()=>{try{n.storageModule=await Promise.resolve().then(()=>(He(),Yu)),n.apiConnectionModule=await Promise.resolve().then(()=>(fo(),Zu)),n.presetManagerModule=await Promise.resolve().then(()=>(an(),sp)),n.uiModule=await Promise.resolve().then(()=>(eb(),Zh)),n.regexExtractorModule=await Promise.resolve().then(()=>(yn(),nc)),n.toolManagerModule=await Promise.resolve().then(()=>(_o(),my)),n.toolExecutorModule=await Promise.resolve().then(()=>(cd(),ld)),n.windowManagerModule=await Promise.resolve().then(()=>(Kd(),ch)),n.toolRegistryModule=await Promise.resolve().then(()=>(gr(),pc)),n.settingsServiceModule=await Promise.resolve().then(()=>(jo(),pg)),n.bypassManagerModule=await Promise.resolve().then(()=>(Bn(),ug)),n.variableResolverModule=await Promise.resolve().then(()=>(wi(),mg)),n.contextInjectorModule=await Promise.resolve().then(()=>(Ws(),fg)),n.toolPromptServiceModule=await Promise.resolve().then(()=>(Ti(),xg)),n.toolOutputServiceModule=await Promise.resolve().then(()=>(Wo(),vg)),n.toolAutomationServiceModule=await Promise.resolve().then(()=>(ib(),ab)),n.toolDataProviderModule=await Promise.resolve().then(()=>(Rn(),xf)),n.presetBootstrapModule=await Promise.resolve().then(()=>(pb(),ub));try{n.toolDataProviderModule.getToolDataProvider({extensionVersion:a}).then(A=>{u.log(`Provider \u5C31\u7EEA: ${A.kind}`)}).catch(A=>{u.error(`Provider \u521D\u59CB\u5316\u5F02\u5E38: ${A?.message||A}`)})}catch(A){u.error(`Provider \u542F\u52A8\u5F02\u5E38: ${A?.message||A}`)}return n.toolOutputServiceModule?.toolOutputService&&n.apiConnectionModule&&n.toolOutputServiceModule.toolOutputService.setApiConnection(n.apiConnectionModule),!0}catch(A){return c=null,p("\u6A21\u5757\u52A0\u8F7D\u5931\u8D25\uFF0C\u4F7F\u7528\u5185\u7F6E\u529F\u80FD:",A),p("\u5DF2\u52A0\u8F7D\u6A21\u5757:",Object.keys(n).filter(E=>n[E])),!1}})(),c)}function m(){let A=`${o}-styles`,E=s.document||document;if(E.getElementById(A))return;let w=E.createElement("style");w.id=A,w.textContent=Nu,(E.head||E.documentElement).appendChild(w),y("\u6837\u5F0F\u5DF2\u6CE8\u5165")}function h(){let A=s.document||document;if(n.uiModule?.getAllStyles){let E=`${o}-ui-styles`;if(!A.getElementById(E)){let w=A.createElement("style");w.id=E,w.textContent=n.uiModule.getAllStyles(),(A.head||A.documentElement).appendChild(w)}}}async function x(){try{let{applyUiPreferences:A}=await Promise.resolve().then(()=>(xd(),bd));if(n.settingsServiceModule?.settingsService){let E=n.settingsServiceModule.settingsService.getUiSettings();if(E&&E.theme){let w=s.document||document;A(E,w),y(`\u4E3B\u9898\u5DF2\u5E94\u7528: ${E.theme}`)}}}catch(A){y("\u4E3B\u9898\u52A0\u8F7D\u5931\u8D25:",A)}}function v(){let A=s.jQuery||window.jQuery;if(!A){p("jQuery \u672A\u627E\u5230\uFF0C\u5EF6\u8FDF\u91CD\u8BD5..."),setTimeout(v,1e3);return}let E=s.document||document,w=A("#extensionsMenu",E);if(!w.length){y("\u9B54\u68D2\u83DC\u5355\u672A\u627E\u5230\uFF0C\u5EF6\u8FDF\u91CD\u8BD5..."),setTimeout(v,2e3);return}if(A(`#${l}`,w).length>0){y("\u83DC\u5355\u9879\u5DF2\u5B58\u5728");return}let $=A(`<div class="extension_container interactable" id="${l}" tabindex="0"></div>`),B=`
      <div class="list-group-item flex-container flexGap5 interactable" id="${i}" title="\u6253\u5F00 YouYou \u5DE5\u5177\u7BB1">
        <div class="fa-fw fa-solid fa-wand-magic-sparkles extensionsMenuExtensionButton"></div>
        <span>YouYou \u5DE5\u5177\u7BB1</span>
      </div>
    `,R=A(B);R.on("click",function(k){k.stopPropagation(),y("\u83DC\u5355\u9879\u88AB\u70B9\u51FB");let K=A("#extensionsMenuButton",E);K.length&&w.is(":visible")&&K.trigger("click"),typeof e.openPopup=="function"&&e.openPopup()}),$.append(R),w.append($),y("\u83DC\u5355\u9879\u5DF2\u6DFB\u52A0\u5230\u9B54\u68D2\u533A")}async function T(){y(`\u521D\u59CB\u5316\u5F00\u59CB... \u7248\u672C: ${a}`),await m();let A=await g();if(y(A?"\u6240\u6709\u6A21\u5757\u52A0\u8F7D\u6210\u529F":"\u90E8\u5206\u6A21\u5757\u52A0\u8F7D\u5931\u8D25\uFF0C\u4F7F\u7528\u53EF\u7528\u529F\u80FD"),!d&&n.uiModule?.initUI)try{await n.uiModule.initUI({services:n,autoInjectStyles:!1,targetDocument:s.document||document}),d=!0,y("UI \u88C5\u914D\u4E2D\u5FC3\u5DF2\u521D\u59CB\u5316")}catch(w){p("UI \u6A21\u5757\u521D\u59CB\u5316\u5931\u8D25:",w)}if(n.uiModule&&(h(),await x()),n.presetBootstrapModule?.ensurePresetSystem)try{let w=n.presetBootstrapModule.ensurePresetSystem();w?.aborted?y(`\u9884\u8BBE\u7CFB\u7EDF\u8FC1\u79FB\u5931\u8D25\u5DF2 abort\uFF0C\u8001\u5B57\u6BB5\u4FDD\u7559: ${w.error}`):w?.skipped?y(`\u9884\u8BBE\u7CFB\u7EDF\u5DF2\u5C31\u7EEA\uFF08${w.reason}\uFF09`):y(`\u9884\u8BBE\u7CFB\u7EDF\u8FC1\u79FB\u5B8C\u6210\uFF08${w.migratedCount}/${w.total} \u5DE5\u5177\uFF09`)}catch(w){p("\u9884\u8BBE\u7CFB\u7EDF\u521D\u59CB\u5316\u5F02\u5E38:",w)}if(n.toolAutomationServiceModule?.toolAutomationService){let w=n.toolAutomationServiceModule.toolAutomationService.init();y(w?"\u81EA\u52A8\u5316\u751F\u547D\u5468\u671F\u670D\u52A1\u5DF2\u521D\u59CB\u5316":"\u81EA\u52A8\u5316\u751F\u547D\u5468\u671F\u670D\u52A1\u521D\u59CB\u5316\u672A\u5B8C\u6210\uFF0C\u7B49\u5F85\u5BBF\u4E3B\u4E8B\u4EF6\u6E90\u91CD\u8BD5")}let E=s.document||document;E.readyState==="loading"?E.addEventListener("DOMContentLoaded",()=>{setTimeout(v,1e3)}):setTimeout(v,1e3),y("\u521D\u59CB\u5316\u5B8C\u6210")}return{loadModules:g,injectStyles:m,addMenuItem:v,init:T,log:y,logError:p}}ot();at();at();H();var to=C.createScope("PromptEditor"),AA="youyou_toolkit_prompt_editor",EA={system:"System Prompt (\u7CFB\u7EDF\u63D0\u793A\u8BCD)",ai:"AI Prompt (AI\u6307\u4EE4\u63D0\u793A\u8BCD)",user:"User Prompt (\u7528\u6237\u63D0\u793A\u8BCD)"},CA={system:"fa-server",ai:"fa-robot",user:"fa-user"},pa=[{id:"system_1",type:"system",role:"SYSTEM",mainSlot:"",content:"",deletable:!1,expanded:!0},{id:"ai_1",type:"ai",role:"USER",mainSlot:"A",content:"",deletable:!1,expanded:!0,isMain:!0},{id:"user_1",type:"user",role:"USER",mainSlot:"B",content:"",deletable:!1,expanded:!0,isMain2:!0}],cl=class{constructor(e={}){this.containerId=e.containerId||AA,this.segments=e.segments||[...pa],this.onChange=e.onChange||null,this.editable=e.editable!==!1,this.showMainSlot=e.showMainSlot!==!1,this.$container=null,this.$=null}init(e){if(this.$=window.jQuery||window.parent?.jQuery,!this.$){to.error("jQuery not available");return}this.$container=e,this.render(),this.bindEvents()}setSegments(e){this.segments=e&&Array.isArray(e)?[...e]:[...pa],this.$container&&(this.render(),this.bindEvents())}getSegments(){return this.segments.map(e=>({...e,content:this.getSegmentContent(e.id)}))}getSegmentContent(e){return this.$container&&this.$container.find(`[data-segment-id="${e}"] .yyt-prompt-textarea`).val()||""}render(){if(!this.$container)return;let e=`
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
    `;this.$container.html(e)}renderSegment(e){let r=EA[e.type]||e.type,s=CA[e.type]||"fa-file",n=e.mainSlot==="A"||e.isMain,o=e.mainSlot==="B"||e.isMain2,a=n?"var(--yyt-accent, #7bb7ff)":o?"#ffb74d":"",i=this.showMainSlot&&e.mainSlot?`<span class="yyt-prompt-slot-badge">mainSlot: ${e.mainSlot}</span>`:"",l=`<span class="yyt-prompt-role-badge">role: ${e.role||"USER"}</span>`;return`
      <div class="yyt-prompt-segment ${e.expanded?"yyt-expanded":""} ${n?"yyt-main-a":""} ${o?"yyt-main-b":""}" 
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
    `}bindEvents(){this.$container&&(Nt(this.$container,"yytPromptEditorSelect"),this.$container.off(".yytPromptEditor"),this.$container.on("click.yytPromptEditor",".yyt-prompt-toggle",e=>{this.$(e.currentTarget).closest(".yyt-prompt-segment").toggleClass("yyt-expanded"),this.$(e.currentTarget).find("i").toggleClass("fa-chevron-up fa-chevron-down")}),this.$container.on("click.yytPromptEditor",".yyt-prompt-delete",e=>{let r=this.$(e.currentTarget).closest(".yyt-prompt-segment").data("segment-id");this.deleteSegment(r)}),this.$container.on("change.yytPromptEditor",".yyt-prompt-role",e=>{let r=this.$(e.currentTarget).closest(".yyt-prompt-segment").data("segment-id"),s=this.$(e.currentTarget).val();this.updateSegmentMeta(r,{role:s})}),this.$container.on("change.yytPromptEditor",".yyt-prompt-main-slot",e=>{let r=this.$(e.currentTarget).closest(".yyt-prompt-segment").data("segment-id"),s=this.$(e.currentTarget).val();this.updateSegmentMeta(r,{mainSlot:s})}),this.$container.on("input.yytPromptEditor",".yyt-prompt-textarea",e=>{this.onChange&&this.onChange(this.getSegments())}),this.$container.on("click.yytPromptEditor",`#${this.containerId}-add-segment`,()=>{this.addSegment()}),this.$container.on("click.yytPromptEditor",`#${this.containerId}-import-prompt`,()=>{this.importPrompt()}),this.$container.on("click.yytPromptEditor",`#${this.containerId}-export-prompt`,()=>{this.exportPrompt()}),lr(this.$container,{namespace:"yytPromptEditorSelect",selectors:[".yyt-prompt-role",".yyt-prompt-main-slot"]}))}addSegment(e=null){let r=`segment_${Date.now()}`,s=e||{id:r,type:"user",role:"USER",mainSlot:"",content:"",deletable:!0,expanded:!0};s.id||(s.id=r),this.segments.push(s),this.render(),this.bindEvents(),this.onChange&&this.onChange(this.getSegments())}deleteSegment(e){let r=this.segments.findIndex(n=>n.id===e);if(r===-1)return;if(this.segments[r].deletable===!1){to.warn("\u8BE5\u6BB5\u843D\u4E0D\u53EF\u5220\u9664");return}this.segments.splice(r,1),this.render(),this.bindEvents(),this.onChange&&this.onChange(this.getSegments())}updateSegmentMeta(e,r){let s=this.segments.find(n=>n.id===e);s&&(Object.assign(s,r),this.onChange&&this.onChange(this.getSegments()))}importPrompt(){let e=document.createElement("input");e.type="file",e.accept=".json",e.onchange=r=>{let s=r.target.files[0];if(!s)return;let n=new FileReader;n.onload=o=>{try{let a=JSON.parse(o.target.result);Array.isArray(a)?(this.setSegments(a),to.log("\u63D0\u793A\u8BCD\u5BFC\u5165\u6210\u529F")):to.error("\u65E0\u6548\u7684\u63D0\u793A\u8BCD\u683C\u5F0F")}catch(a){to.error("\u5BFC\u5165\u5931\u8D25:",a)}},n.readAsText(s)},e.click()}exportPrompt(){let e=this.getSegments(),r=JSON.stringify(e,null,2),s=new Blob([r],{type:"application/json"}),n=URL.createObjectURL(s),o=document.createElement("a");o.href=n,o.download=`prompt_group_${Date.now()}.json`,o.click(),URL.revokeObjectURL(n),to.log("\u63D0\u793A\u8BCD\u5DF2\u5BFC\u51FA")}destroy(){this.$container&&(Nt(this.$container,"yytPromptEditorSelect"),this.$container.off(".yytPromptEditor"))}escapeHtml(e){return typeof e!="string"?"":e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}};function fb(){return`
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
  `}function gb(t){return t.filter(e=>e.content&&e.content.trim()).map(e=>({role:e.role,content:e.content,deletable:e.deletable,mainSlot:e.mainSlot}))}function mb(t){return Array.isArray(t)?t.map((e,r)=>({id:`segment_${r}_${Date.now()}`,type:e.role==="SYSTEM"?"system":e.role==="assistant"?"ai":"user",role:e.role,mainSlot:e.mainSlot||"",content:e.content||"",deletable:e.deletable!==!1,expanded:!0,isMain:e.mainSlot==="A"||e.isMain,isMain2:e.mainSlot==="B"||e.isMain2})):[...pa]}H();function hb(t){let{constants:e,topLevelWindow:r,modules:s,caches:n,uiState:o}=t,{SCRIPT_ID:a,SCRIPT_VERSION:i,POPUP_ID:l}=e,c=C.createScope("PopupShell"),d={cleanup:null},u={cleanups:[]},y={cleanups:[]},p={current:null};function g(){return!!o.sidebarCollapsed}function m(){o.sidebarCollapsed=!o.sidebarCollapsed;let b=o.currentPopup;if(!b)return;let S=b.querySelector(".yyt-shell-sidebar"),M=b.querySelector(".yyt-shell-workspace"),O=b.querySelector(".yyt-sidebar-toggle i");S&&S.classList.toggle("yyt-collapsed",o.sidebarCollapsed),M&&M.classList.toggle("yyt-sidebar-collapsed",o.sidebarCollapsed),O&&(O.className=o.sidebarCollapsed?"fa-solid fa-angles-right":"fa-solid fa-angles-left"),Ze()}function h(...b){c.log(b.join(" "))}function x(...b){c.error(b.join(" "))}function v(b){return typeof b!="string"?"":b.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function T(){return r.jQuery||window.jQuery}function A(){return r.document||document}function E(b){if(!b)return"\u672A\u9009\u62E9\u9875\u9762";let S=s.toolRegistryModule?.getToolConfig(b);if(!S)return b;if(!S.hasSubTabs)return S.name||b;let M=P(b),O=S.subTabs?.find(U=>U.id===M);return O?.name?`${S.name} / ${O.name}`:S.name||b}function w(b){if(!b)return"\u8BF7\u9009\u62E9\u5DE6\u4FA7\u5BFC\u822A\u4E2D\u7684\u9875\u9762\u8FDB\u884C\u914D\u7F6E\u6216\u6392\u67E5\u3002";let S=s.toolRegistryModule?.getToolConfig(b);if(!S)return"\u5F53\u524D\u9875\u9762\u63CF\u8FF0\u6682\u4E0D\u53EF\u7528\u3002";if(!S.hasSubTabs)return S.description||"\u5728\u8FD9\u91CC\u7BA1\u7406\u5F53\u524D\u9875\u9762\u7684\u914D\u7F6E\u548C\u64CD\u4F5C\u3002";let M=P(b);return S.subTabs?.find(U=>U.id===M)?.description||S.description||"\u5728\u8FD9\u91CC\u7BA1\u7406\u5F53\u524D\u5DE5\u5177\u7684\u6A21\u677F\u3001\u914D\u7F6E\u4E0E\u8C03\u8BD5\u80FD\u529B\u3002"}function P(b,S=""){let M=s.toolRegistryModule?.getToolConfig(b);if(!M?.hasSubTabs||!Array.isArray(M.subTabs)||M.subTabs.length===0)return"";let O=String(S||o.currentSubTab[b]||"").trim(),F=O&&M.subTabs.some(ae=>ae?.id===O)?O:M.subTabs[0]?.id||"";return F&&o.currentSubTab[b]!==F&&(o.currentSubTab[b]=F),F}function $(){let b=o.currentPopup;if(!b)return;let S=E(o.currentMainTab),M=w(o.currentMainTab),O=b.querySelector(".yyt-popup-active-label");O&&(O.textContent=`\u5F53\u524D\uFF1A${S}`);let U=b.querySelector(".yyt-shell-breadcrumb");U&&(U.textContent=S);let F=b.querySelector(".yyt-shell-main-title");F&&(F.textContent=S);let ae=b.querySelector(".yyt-shell-main-description");ae&&(ae.textContent=M)}function B(){typeof d.cleanup=="function"&&(d.cleanup(),d.cleanup=null)}function R(){Array.isArray(u.cleanups)&&(u.cleanups.forEach(b=>{typeof b=="function"&&b()}),u.cleanups=[])}function _(){Array.isArray(y.cleanups)&&(y.cleanups.forEach(b=>{typeof b=="function"&&b()}),y.cleanups=[])}function k(b,S){if(!b||!S)return!1;let M=b.jquery?b[0]:b,O=S.jquery?S[0]:S;return!!(M&&O&&M===O)}function K(b={}){let{container:S=null}=b,M=p.current;if(M&&!(S&&!k(M.container,S))){try{typeof M.destroy=="function"&&M.destroy(M.container)}catch(O){x("\u9500\u6BC1\u52A8\u6001\u9762\u677F host \u5931\u8D25",O)}s.uiModule?.uiManager?.destroyContainerInstance&&s.uiModule.uiManager.destroyContainerInstance(M.container),p.current=null}}function Y(b,S={}){p.current={key:S.key||"",container:b,destroy:typeof S.destroy=="function"?S.destroy:null}}function ue(){let b=T();if(!b||!o.currentPopup)return;let S=s.toolRegistryModule?.getToolList()||[],M=b(o.currentPopup).find(".yyt-main-nav");if(!M.length)return;let O=S.map(F=>`
      <div class="yyt-main-nav-item ${F.id===o.currentMainTab?"active":""}" data-tab="${F.id}">
        <div class="yyt-main-nav-icon">
          <i class="fa-solid ${v(F.icon||"fa-file")}"></i>
        </div>
        <div class="yyt-main-nav-copy">
          <span class="yyt-main-nav-name">${v(F.name||F.id)}</span>
          <span class="yyt-main-nav-desc">${v(F.description||"\u8FDB\u5165\u6B64\u9875\u9762\u8FDB\u884C\u914D\u7F6E\u3001\u67E5\u770B\u6216\u7EF4\u62A4\u3002")}</span>
        </div>
      </div>
    `).join("");M.html(O),b(o.currentPopup).find(".yyt-main-nav-item").on("click",function(){let ae=b(this).data("tab");ae&&gs(ae)});let U=b(o.currentPopup).find(".yyt-shell-sidebar-hint");U.length&&U.text(`${S.length} tabs`)}function pe(){let b=T();if(!b||!o.currentPopup)return;let S=s.toolRegistryModule?.getToolList()||[],M=s.toolRegistryModule?.getToolConfig("tools"),O=Array.isArray(M?.subTabs)?M.subTabs:[],U=O.filter(ie=>ie?.isCustom).length,F=O.filter(ie=>!ie?.isCustom).length,Z=b(o.currentPopup).find(".yyt-shell-sidebar-stats");Z.length&&(Z.find(".yyt-shell-sidebar-stat").eq(0).find(".yyt-shell-sidebar-stat-value").text(String(S.length)),Z.find(".yyt-shell-sidebar-stat").eq(1).find(".yyt-shell-sidebar-stat-value").text(String(F)),Z.find(".yyt-shell-sidebar-stat").eq(2).find(".yyt-shell-sidebar-stat-value").text(String(U)))}function te(){let b=s.toolRegistryModule?.getToolList()||[];return b.length?(b.some(S=>S.id===o.currentMainTab)||(o.currentMainTab=b[0].id),o.currentMainTab):null}async function Te(b={}){let{rebuildNavigation:S=!1,reRenderSubNav:M=!1}=b,O=T();if(!O||!o.currentPopup)return;K();let U=te();if(!U)return;S&&(ue(),pe());let F=s.toolRegistryModule?.getToolConfig(U),ae=!!F?.hasSubTabs,Z=O(o.currentPopup).find(".yyt-sub-nav"),ie=O(o.currentPopup).find(".yyt-content-inner");if(S&&ie.length){let Oe=new Set(ie.find(".yyt-tab-content").map((he,pt)=>O(pt).data("tab")).get());(s.toolRegistryModule?.getToolList()||[]).forEach(he=>{Oe.has(he.id)||ie.append(`<div class="yyt-tab-content" data-tab="${v(he.id)}"></div>`)}),ie.find(".yyt-tab-content").each((he,pt)=>{let Ft=O(pt).data("tab");(s.toolRegistryModule?.getToolList()||[]).some(or=>or.id===Ft)||O(pt).remove()})}O(o.currentPopup).find(".yyt-main-nav-item").removeClass("active"),O(o.currentPopup).find(`.yyt-main-nav-item[data-tab="${U}"]`).addClass("active"),O(o.currentPopup).find(".yyt-tab-content").removeClass("active"),O(o.currentPopup).find(`.yyt-tab-content[data-tab="${U}"]`).addClass("active"),ae?(Z.show(),(M||S)&&sn(U,F.subTabs)):Z.hide(),await Dr(U),$(),Ze()}function Fe(){if(!o.currentPopup)return;R();let b=()=>{if(o.currentMainTab==="presetManagement"){Te();return}o.currentMainTab==="tools"&&Te({reRenderSubNav:!0})},S=()=>{o.currentMainTab==="tools"?Te({rebuildNavigation:!0,reRenderSubNav:!0}):pe()},M=()=>{o.currentMainTab==="tools"&&Te({rebuildNavigation:!1,reRenderSubNav:!1})},O=()=>{(o.currentMainTab==="bypass"||o.currentMainTab==="tools")&&Te({reRenderSubNav:o.currentMainTab==="tools"})};[j.PRESET_CREATED,j.PRESET_UPDATED,j.PRESET_DELETED].forEach(U=>{u.cleanups.push(W.on(U,b))}),[j.TOOL_REGISTERED,j.TOOL_UPDATED,j.TOOL_UNREGISTERED].forEach(U=>{u.cleanups.push(W.on(U,S))}),u.cleanups.push(W.on(j.TOOL_RUNTIME_UPDATED,M)),[j.BYPASS_PRESET_CREATED,j.BYPASS_PRESET_UPDATED,j.BYPASS_PRESET_DELETED].forEach(U=>{u.cleanups.push(W.on(U,O))})}function V(b){return!!b?.closest?.(["input","textarea","select","button","a","label","summary","details",'[contenteditable="true"]',".yyt-dialog",".yyt-select-dropdown",".yyt-select-portal-layer"].join(","))}function We(b){let S=b?.closest?.(["textarea",".yyt-preview-pre",".yyt-select-dropdown",".yyt-select-portal-layer",".yyt-dialog-body",".yyt-worldbook-list",".yyt-tool-panel",".yyt-panel-section"].join(","));return S?S.scrollHeight>S.clientHeight+2||S.scrollWidth>S.clientWidth+2:!1}function we(b,S){return S?.closest?.(".yyt-scrollable-surface")===b}function $e(b,S){if(!b||!S)return null;let M=S.closest?.([".yyt-worldbook-list",".yyt-select-dropdown",".yyt-select-portal-layer",".yyt-dialog-body",".yyt-preview-pre",".yyt-tool-panel",".yyt-panel-section"].join(","));return M&&(M.classList?.contains("yyt-select-portal-layer")||b.contains(M))&&(M.scrollHeight>M.clientHeight+2||M.scrollWidth>M.clientWidth+2)?M:[S.closest?.(".yyt-tool-list"),S.closest?.(".yyt-settings-content"),S.closest?.(".yyt-sub-content"),S.closest?.(".yyt-tab-content.active"),b].filter(Boolean).find(U=>U!==b&&!b.contains(U)?!1:U.scrollHeight>U.clientHeight+2||U.scrollWidth>U.clientWidth+2)||b}function qe({mainTab:b=null,includeSubContent:S=!1}={}){let M=o.currentPopup;if(!M)return;let O=M.querySelector(".yyt-content");O&&(O.scrollTop=0,O.scrollLeft=0);let U=b?`.yyt-tab-content[data-tab="${b}"]`:".yyt-tab-content.active",F=M.querySelector(U);if(F&&(F.scrollTop=0,F.scrollLeft=0),!S)return;(F?.querySelectorAll(".yyt-sub-content")||[]).forEach(Z=>{Z.scrollTop=0,Z.scrollLeft=0})}function fs(b){let S=A();if(!b||!S)return;b.classList.add("yyt-scrollable-surface");let M=!1,O=!1,U=0,F=0,ae=0,Z=0,ie=!1,Oe=!1,he=()=>{M=!1,O=!1,b.classList.remove("yyt-scroll-dragging")},pt=X=>{X.button===0&&(V(X.target)||we(b,X.target)&&(ie=b.scrollWidth>b.clientWidth+2,Oe=b.scrollHeight>b.clientHeight+2,!(!ie&&!Oe)&&(X.stopPropagation(),M=!0,O=!1,U=X.clientX,F=X.clientY,ae=b.scrollLeft,Z=b.scrollTop)))},Ft=X=>{if(!M)return;let wt=X.clientX-U,nt=X.clientY-F;!(Math.abs(wt)>4||Math.abs(nt)>4)&&!O||(O=!0,b.classList.add("yyt-scroll-dragging"),ie&&(b.scrollLeft=ae-wt),Oe&&(b.scrollTop=Z-nt),X.preventDefault())},or=()=>{he()},Lr=X=>{if(X.ctrlKey||We(X.target)||!b.classList.contains("yyt-content")&&!we(b,X.target))return;let nt=$e(b,X.target);!nt||nt!==b&&!b.contains(nt)||!(nt.scrollHeight>nt.clientHeight+2||nt.scrollWidth>nt.clientWidth+2)||(Math.abs(X.deltaY)>0&&(nt.scrollTop+=X.deltaY),Math.abs(X.deltaX)>0&&(nt.scrollLeft+=X.deltaX),X.preventDefault(),X.stopPropagation())},yt=X=>{O&&X.preventDefault()};b.addEventListener("mousedown",pt),b.addEventListener("wheel",Lr,{passive:!1}),b.addEventListener("dragstart",yt),S.addEventListener("mousemove",Ft),S.addEventListener("mouseup",or),y.cleanups.push(()=>{he(),b.classList.remove("yyt-scrollable-surface"),b.removeEventListener("mousedown",pt),b.removeEventListener("wheel",Lr),b.removeEventListener("dragstart",yt),S.removeEventListener("mousemove",Ft),S.removeEventListener("mouseup",or)})}function Ze(){let b=o.currentPopup;if(!b)return;_();let S=[...b.querySelectorAll(".yyt-shell-sidebar .yyt-main-nav"),...b.querySelectorAll(".yyt-sub-nav"),...b.querySelectorAll(".yyt-content"),...b.querySelectorAll(".yyt-settings-content"),...b.querySelectorAll(".yyt-tool-list")];[...new Set(S)].forEach(fs)}function rn(b){return`
      <div class="yyt-startup-screen" data-yyt-startup-screen>
        <div class="yyt-startup-screen-inner">
          <div class="yyt-startup-screen-kicker">Welcome</div>
          <div class="yyt-startup-screen-title">YouYou \u5DE5\u5177\u7BB1</div>
          <div class="yyt-startup-screen-desc">\u96C6\u4E2D\u7BA1\u7406 API \u9884\u8BBE\u3001\u81EA\u5B9A\u4E49\u5DE5\u5177\u3001\u63D0\u53D6\u89C4\u5219\u3001Ai\u6307\u4EE4\u9884\u8BBE\u4E0E\u8BCA\u65AD\u6D41\u7A0B\u3002\u6BCF\u6B21\u5237\u65B0\u540E\u90FD\u4F1A\u91CD\u65B0\u663E\u793A\uFF0C\u4FBF\u4E8E\u5FEB\u901F\u56DE\u5230\u4ECB\u7ECD\u5165\u53E3\u3002</div>
          <div class="yyt-startup-screen-modules">
            ${(b||[]).slice(0,6).map(M=>`
      <div class="yyt-startup-module-chip">
        <i class="fa-solid ${v(M.icon||"fa-file")}"></i>
        <span>${v(M.name||M.id)}</span>
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
    `}function ro(b){let S=T();if(!S||!o.currentPopup||o.startupScreenDismissed)return;let M=S(o.currentPopup).find(".yyt-popup-body"),O=M.find(".yyt-popup-shell");!M.length||!O.length||M.find("[data-yyt-startup-screen]").length||(O.attr("data-yyt-startup-visible","true"),M.prepend(rn(b)),M.find(".yyt-startup-enter").on("click",()=>{M.find("[data-yyt-startup-screen]").remove(),O.removeAttr("data-yyt-startup-visible"),o.startupScreenDismissed=!0,Ze()}))}function so(){let b=A(),S=o.currentPopup,M=S?.querySelector(".yyt-popup-header");if(!S||!M||!b)return;let O=!1,U=0,F=0,ae=0,Z=0,ie="",Oe=()=>({width:r.innerWidth||b.documentElement?.clientWidth||window.innerWidth||0,height:r.innerHeight||b.documentElement?.clientHeight||window.innerHeight||0}),he=(yt,X,wt)=>Math.min(Math.max(yt,X),wt),pt=()=>{O&&(O=!1,S.classList.remove("yyt-popup-dragging"),b.body.style.userSelect=ie)},Ft=yt=>{if(!O||!o.currentPopup)return;let X=yt.clientX-U,wt=yt.clientY-F,{width:nt,height:pl}=Oe(),kb=S.offsetWidth||0,Rb=S.offsetHeight||0,Mb=Math.max(0,nt-kb),Pb=Math.max(0,pl-Rb);S.style.left=`${he(ae+X,0,Mb)}px`,S.style.top=`${he(Z+wt,0,Pb)}px`,S.style.transform="none",S.style.right="auto",S.style.bottom="auto"},or=()=>{pt()},Lr=yt=>{if(yt.button!==0||yt.target?.closest(".yyt-popup-close"))return;O=!0,U=yt.clientX,F=yt.clientY;let X=S.getBoundingClientRect();ae=X.left,Z=X.top,S.style.left=`${X.left}px`,S.style.top=`${X.top}px`,S.style.transform="none",S.style.right="auto",S.style.bottom="auto",S.classList.add("yyt-popup-dragging"),ie=b.body.style.userSelect||"",b.body.style.userSelect="none",yt.preventDefault()};M.addEventListener("mousedown",Lr),b.addEventListener("mousemove",Ft),b.addEventListener("mouseup",or),d.cleanup=()=>{pt(),M.removeEventListener("mousedown",Lr),b.removeEventListener("mousemove",Ft),b.removeEventListener("mouseup",or)}}function Qt(){K(),B(),R(),_();let b=T();if(b&&o.currentPopup){let S=b(o.currentPopup);Nt(S,"yytPopupToolConfigSelect"),Nt(S,"yytPromptEditorSelect")}o.currentPopup&&(o.currentPopup.remove(),o.currentPopup=null),o.currentOverlay&&(o.currentOverlay.remove(),o.currentOverlay=null),h("\u5F39\u7A97\u5DF2\u5173\u95ED")}function gs(b){K(),o.currentMainTab=b;let S=T();if(!S||!o.currentPopup)return;qe({mainTab:b,includeSubContent:!0}),S(o.currentPopup).find(".yyt-main-nav-item").removeClass("active"),S(o.currentPopup).find(`.yyt-main-nav-item[data-tab="${b}"]`).addClass("active");let M=s.toolRegistryModule?.getToolConfig(b);M?.hasSubTabs?(S(o.currentPopup).find(".yyt-sub-nav").show(),sn(b,M.subTabs)):S(o.currentPopup).find(".yyt-sub-nav").hide(),S(o.currentPopup).find(".yyt-tab-content").removeClass("active"),S(o.currentPopup).find(`.yyt-tab-content[data-tab="${b}"]`).addClass("active"),Dr(b),$(),Ze()}function ms(b,S){K(),o.currentSubTab[b]=S;let M=T();!M||!o.currentPopup||(qe({mainTab:b,includeSubContent:!0}),M(o.currentPopup).find(".yyt-sub-nav-item").removeClass("active"),M(o.currentPopup).find(`.yyt-sub-nav-item[data-subtab="${S}"]`).addClass("active"),hs(b,S),$(),Ze())}function sn(b,S){let M=T();if(!M||!o.currentPopup||!S)return;let O=P(b,o.currentSubTab[b]||S[0]?.id),F=(b==="tools"?[{key:"ai",title:"AI \u5DE5\u5177",items:S.filter(Z=>!Z?.isCustom&&(Z?.toolKind||"ai")!=="script")},{key:"script",title:"\u811A\u672C\u5DE5\u5177",items:S.filter(Z=>!Z?.isCustom&&Z?.toolKind==="script")},{key:"custom",title:"\u81EA\u5B9A\u4E49\u5DE5\u5177",items:S.filter(Z=>Z?.isCustom===!0)}].filter(Z=>Z.items.length>0):[{key:"default",title:"",items:S}]).map(Z=>{let ie=Z.title?`<div class="yyt-sub-nav-group-title">${v(Z.title)}</div>`:"",Oe=Z.items.map(he=>{let pt=he?.isCustom===!0,Ft=b==="tools"&&pt?`<div class="yyt-sub-nav-item-actions">
               <button type="button" class="yyt-sub-nav-item-action" data-action="edit" data-subtab="${he.id}" title="\u7F16\u8F91"><i class="fa-solid fa-pen"></i></button>
               <button type="button" class="yyt-sub-nav-item-action" data-action="delete" data-subtab="${he.id}" title="\u5220\u9664"><i class="fa-solid fa-trash"></i></button>
             </div>`:"";return`
        <div class="yyt-sub-nav-item ${he.id===O?"active":""}" data-subtab="${he.id}" data-tool-name="${v((he.name||he.id).toLowerCase())}">
          <i class="fa-solid ${he.icon||"fa-file"}"></i>
          <span class="yyt-sub-nav-item-label">${v(he.name||he.id)}</span>
          ${Ft}
        </div>
      `}).join("");return`
        <div class="yyt-sub-nav-group yyt-sub-nav-group-${Z.key}">
          ${ie}
          <div class="yyt-sub-nav-group-items">
            ${Oe}
          </div>
        </div>
      `}).join(""),ae=b==="tools"?`<div class="yyt-sub-nav-toolbar">
           <button type="button" class="yyt-sub-nav-toolbar-btn" data-tool-action="add" title="\u65B0\u5EFA\u81EA\u5B9A\u4E49\u5DE5\u5177"><i class="fa-solid fa-plus"></i><span>\u65B0\u5EFA</span></button>
           <button type="button" class="yyt-sub-nav-toolbar-btn" data-tool-action="import" title="\u4ECE JSON \u5BFC\u5165\u5DE5\u5177"><i class="fa-solid fa-file-import"></i></button>
           <button type="button" class="yyt-sub-nav-toolbar-btn" data-tool-action="export" title="\u5BFC\u51FA\u5DE5\u5177 JSON"><i class="fa-solid fa-file-export"></i></button>
         </div>
         <div class="yyt-sub-nav-filter-wrap">
           <input type="text" class="yyt-sub-nav-filter" placeholder="\u7B5B\u9009\u5DE5\u5177\u2026" autocomplete="off">
         </div>`:"";M(o.currentPopup).find(".yyt-sub-nav").html(ae+F),M(o.currentPopup).find(".yyt-sub-nav-item").on("click",function(ie){if(ie.target.closest&&ie.target.closest(".yyt-sub-nav-item-action"))return;let Oe=M(this).data("subtab");ms(b,Oe)}),b==="tools"&&no(b),Ze()}function fa(b){if(!o.currentPopup)return;let S=T();if(!S)return;let M=String(b||"").trim().toLowerCase();S(o.currentPopup).find(".yyt-sub-nav-item").each(function(){let U=String(S(this).data("tool-name")||"");S(this).toggle(!M||U.includes(M))}),S(o.currentPopup).find(".yyt-sub-nav-group").each(function(){let U=S(this).find(".yyt-sub-nav-item:visible").length>0;S(this).toggle(U)})}function no(b){let S=T();if(!S||!o.currentPopup)return;let M=S(o.currentPopup).find(".yyt-sub-nav");M.find(".yyt-sub-nav-filter").off("input.yytFilter").on("input.yytFilter",function(){fa(this.value)}),M.find(".yyt-sub-nav-toolbar-btn").off("click.yytToolAction").on("click.yytToolAction",async function(O){O.preventDefault(),O.stopPropagation();let U=S(this).data("tool-action");try{let F=await Promise.resolve().then(()=>(ku(),Iu));if(U==="add"){let ae=await F.showToolEditDialog(null);ae&&(o.currentSubTab[b]=ae,ms(b,ae))}else U==="import"?await F.showImportToolsDialog():U==="export"&&F.showExportToolsDialog()}catch(F){x("\u5DE5\u5177\u64CD\u4F5C\u5931\u8D25",F)}}),M.find(".yyt-sub-nav-item-action").off("click.yytItemAction").on("click.yytItemAction",async function(O){O.preventDefault(),O.stopPropagation();let U=S(this).data("action"),F=String(S(this).data("subtab")||"");if(F)try{let ae=await Promise.resolve().then(()=>(ku(),Iu));U==="edit"?await ae.showToolEditDialog(F):U==="delete"&&await ae.confirmDeleteTool(F)&&o.currentSubTab[b]===F&&(o.currentSubTab[b]="")}catch(ae){x("\u5DE5\u5177\u884C\u5185\u64CD\u4F5C\u5931\u8D25",ae)}})}async function Dr(b){let S=T();if(!S||!o.currentPopup)return;let M=S(o.currentPopup).find(`.yyt-tab-content[data-tab="${b}"]`);if(!M.length)return;if(s.toolRegistryModule?.getToolConfig(b)?.hasSubTabs){let F=P(b);F?await hs(b,F):M.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5B50 tab \u914D\u7F6E\u52A0\u8F7D\u5931\u8D25</span></div>'),Ze();return}await s.uiModule?.renderMainTab?.(b,M)||bs(b,M),Ze()}async function hs(b,S){let M=T();if(!M||!o.currentPopup)return;let O=M(o.currentPopup).find(`.yyt-tab-content[data-tab="${b}"]`);if(!O.length)return;let U=s.toolRegistryModule?.getToolConfig(b);if(U?.hasSubTabs){let ae=P(b,S),Z=U.subTabs?.find(pt=>pt.id===ae),ie=O.find(".yyt-sub-content");if(ie.length||(O.html('<div class="yyt-sub-content"></div>'),ie=O.find(".yyt-sub-content")),!Z){ie.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5F53\u524D\u5B50\u9875\u9762\u4E0D\u5B58\u5728\u6216\u5DF2\u5931\u6548</span></div>'),qe({mainTab:b,includeSubContent:!0}),Ze();return}let Oe=Z.component;if(Oe==="GenericToolConfigPanel"){await ga(Z,ie),qe({mainTab:b,includeSubContent:!0}),Ze();return}K({container:ie});let he=await s.uiModule?.renderSubTabComponent?.(Oe,ie);he?Y(ie,{key:he}):ie.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-tools"></i><span>\u529F\u80FD\u5F00\u53D1\u4E2D...</span></div>'),qe({mainTab:b,includeSubContent:!0}),Ze();return}let F=O.find(".yyt-sub-content");if(F.length){switch(K({container:F}),S){case"config":wb(b,F);break;case"prompts":await vb(b,F);break;case"presets":Tb(b,F);break;default:F.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-tools"></i><span>\u529F\u80FD\u5F00\u53D1\u4E2D...</span></div>')}qe({mainTab:b,includeSubContent:!0}),Ze()}}async function ga(b,S){if(!(!T()||!S?.length||!b?.id)){K({container:S});try{let O=n.dynamicToolPanelCache.get(b.id);if(!O){let ae=(await Promise.resolve().then(()=>(Fn(),kg)))?.createToolConfigPanel;if(typeof ae!="function")throw new Error("\u901A\u7528\u5DE5\u5177\u9762\u677F\u5DE5\u5382\u4E0D\u53EF\u7528");O=()=>ae({id:`${b.id}Panel`,toolId:b.id,postResponseHint:`\u70B9\u51FB\u201C\u7ACB\u5373\u6267\u884C\u4E00\u6B21\u201D\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u6267\u884C\u201C${b.name||b.id}\u201D\u3002`,extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 custom_tag
\u6216 regex:<custom_tag>([\\s\\S]*?)</custom_tag>`,previewDialogId:`${b.id}-extraction-preview`,previewTitle:`${b.name||b.id} \u63D0\u53D6\u9884\u89C8`}),n.dynamicToolPanelCache.set(b.id,O)}let U=O();U.renderTo(S),Y(S,{key:b.id,destroy:typeof U?.destroy=="function"?F=>U.destroy(F):null}),Ze()}catch(O){p.current=null,x("\u81EA\u5B9A\u4E49\u5DE5\u5177\u9762\u677F\u52A0\u8F7D\u5931\u8D25:",O),S.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u81EA\u5B9A\u4E49\u5DE5\u5177\u9762\u677F\u52A0\u8F7D\u5931\u8D25</span></div>')}}}function bs(b,S){if(!T())return;let O=s.toolRegistryModule?.getToolConfig(b);if(!O){S.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5DE5\u5177\u914D\u7F6E\u4E0D\u5B58\u5728</span></div>');return}let U=o.currentSubTab[b]||O.subTabs?.[0]?.id||"config";S.html(`
      <div class="yyt-tool-window">
        <div class="yyt-sub-content" data-subtab="${U}">
          <!-- \u5B50\u5185\u5BB9\u5C06\u5728\u6B64\u6E32\u67D3 -->
        </div>
      </div>
    `),hs(b,U)}function wb(b,S){if(!T())return;let O=s.toolManagerModule?.getTool(b),U=s.presetManagerModule?.getAllPresets()||[],F=s.toolRegistryModule?.getToolApiPreset(b)||"",ae=U.map(Z=>`<option value="${v(Z.name)}" ${Z.name===F?"selected":""}>${v(Z.name)}</option>`).join("");S.html(`
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
              ${ae}
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
              <input type="number" class="yyt-input" id="yyt-tool-timeout" value="${O?.config?.execution?.timeout||6e4}">
            </div>
            <div class="yyt-form-group yyt-flex-1">
              <label>\u91CD\u8BD5\u6B21\u6570</label>
              <input type="number" class="yyt-input" id="yyt-tool-retries" value="${O?.config?.execution?.retries||3}">
            </div>
          </div>
        </div>
      </div>
    `),lr(S,{namespace:"yytPopupToolConfigSelect",selectors:["#yyt-tool-api-preset"]}),S.find("#yyt-save-tool-preset").on("click",function(){let ie=S.find("#yyt-tool-api-preset").val();s.toolRegistryModule?.setToolApiPreset(b,ie),c.info("API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u4FDD\u5B58",null,{toast:"success"})})}async function vb(b,S){if(!T()){S.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u63D0\u793A\u8BCD\u7F16\u8F91\u5668\u6A21\u5757\u672A\u52A0\u8F7D</span></div>');return}let U=s.toolManagerModule?.getTool(b)?.config?.messages||[],F=mb(U)||pa,ae=new cl({containerId:`yyt-prompt-editor-${b}`,segments:F,onChange:ie=>{let Oe=gb(ie);h("\u63D0\u793A\u8BCD\u5DF2\u66F4\u65B0:",Oe.length,"\u6761\u6D88\u606F")}});S.html(`<div id="yyt-prompt-editor-${b}" class="yyt-prompt-editor-container"></div>`),ae.init(S.find(`#yyt-prompt-editor-${b}`));let Z=fb();if(Z){let ie="yyt-prompt-editor-styles",Oe=r.document||document;if(!Oe.getElementById(ie)){let he=Oe.createElement("style");he.id=ie,he.textContent=Z,(Oe.head||Oe.documentElement).appendChild(he)}}}function Tb(b,S){T()&&S.html(`
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
    `)}function Sb(){return`
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
      </div>`}function _b(b,S,M){let O=g(),U=b.map(F=>`
      <div class="yyt-main-nav-item ${F.id===o.currentMainTab?"active":""}" data-tab="${F.id}">
        <div class="yyt-main-nav-icon">
          <i class="fa-solid ${v(F.icon||"fa-file")}"></i>
        </div>
        <div class="yyt-main-nav-copy">
          <span class="yyt-main-nav-name">${v(F.name||F.id)}</span>
          <span class="yyt-main-nav-desc">${v(F.description||"\u8FDB\u5165\u6B64\u9875\u9762\u8FDB\u884C\u914D\u7F6E\u3001\u67E5\u770B\u6216\u7EF4\u62A4\u3002")}</span>
        </div>
      </div>
    `).join("");return`
      <aside class="yyt-shell-sidebar${O?" yyt-collapsed":""}">
        <div class="yyt-shell-sidebar-card">
          <div class="yyt-shell-sidebar-title-row">
            <span class="yyt-shell-sidebar-title">\u9875\u9762\u5BFC\u822A</span>
            <span class="yyt-shell-sidebar-hint">${b.length} tabs</span>
            <button class="yyt-sidebar-toggle" title="${O?"\u5C55\u5F00\u4FA7\u680F":"\u6298\u53E0\u4FA7\u680F"}">
              <i class="fa-solid ${O?"fa-angles-right":"fa-angles-left"}"></i>
            </button>
          </div>
          <div class="yyt-main-nav">
            ${U}
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
              <span class="yyt-shell-sidebar-stat-value">${M}</span>
              <span class="yyt-shell-sidebar-stat-label">\u81EA\u5B9A\u4E49\u5DE5\u5177</span>
            </div>
          </div>
        </div>
      </aside>`}function Ab(b,S){return`
      <div class="yyt-shell-main-header">
        <div class="yyt-shell-main-heading-block">
          <div class="yyt-shell-main-title">${v(b)}</div>
          <div class="yyt-shell-main-description">${v(S)}</div>
        </div>
        <div class="yyt-shell-main-actions">
          <div class="yyt-shell-main-meta">
            <i class="fa-solid fa-circle-info"></i>
            <span>\u4FDD\u5B58\u540E\u6267\u884C\u94FE\u4F1A\u7ACB\u5373\u4F7F\u7528\u6700\u65B0\u914D\u7F6E</span>
          </div>
        </div>
      </div>`}function Eb(b,S){return b.map(M=>`
      <div class="yyt-tab-content ${M.id===S?"active":""}" data-tab="${M.id}">
      </div>
    `).join("")}function Cb(b){return`
      <div class="yyt-popup-footer">
        <div class="yyt-popup-footer-left">
          <div class="yyt-popup-status-cluster">
            <div class="yyt-popup-status">
              <i class="fa-solid fa-compass"></i>
              <span class="yyt-popup-active-label">\u5F53\u524D\uFF1A${v(b)}</span>
            </div>
            <div class="yyt-popup-footer-note">
              API\u3001\u5DE5\u5177\u3001\u63D0\u53D6\u4E0E\u8BCA\u65AD\u7EDF\u4E00\u5165\u53E3\u3002
            </div>
          </div>
        </div>
      </div>`}async function Ib(){if(o.currentPopup){h("\u5F39\u7A97\u5DF2\u5B58\u5728");return}let b=t?.services?.loadModules;typeof b=="function"&&await b();let S=T(),M=A();if(!S){x("jQuery \u672A\u627E\u5230\uFF0C\u65E0\u6CD5\u521B\u5EFA\u5F39\u7A97");return}let O=s.toolRegistryModule?.getToolList()||[];if(!O.length){x("\u5DE5\u5177\u5217\u8868\u4E3A\u7A7A\uFF0C\u65E0\u6CD5\u521B\u5EFA\u5F39\u7A97");return}O.some(X=>X.id===o.currentMainTab)||(o.currentMainTab=O[0].id);let U=s.toolRegistryModule?.getToolConfig("tools"),F=Array.isArray(U?.subTabs)?U.subTabs:[],ae=F.filter(X=>X?.isCustom).length,Z=F.filter(X=>!X?.isCustom).length,ie=E(o.currentMainTab),Oe=w(o.currentMainTab);o.currentOverlay=M.createElement("div"),o.currentOverlay.className="yyt-popup-overlay",o.currentOverlay.addEventListener("click",X=>{X.target===o.currentOverlay&&Qt()}),M.body.appendChild(o.currentOverlay);let he=g(),pt=`
      <div class="yyt-popup" id="${l}">
        ${Sb()}
        <div class="yyt-popup-body">
          <div class="yyt-popup-shell">
            <div class="yyt-shell-workspace${he?" yyt-sidebar-collapsed":""}">
              ${_b(O,Z,ae)}
              <section class="yyt-shell-main">
                ${Ab(ie,Oe)}
                <div class="yyt-sub-nav" style="display: none;"></div>
                <div class="yyt-content-frame">
                  <div class="yyt-content">
                    <div class="yyt-content-inner">
                      ${Eb(O,o.currentMainTab)}
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
        ${Cb(ie)}
      </div>
    `,Ft=M.createElement("div");Ft.innerHTML=pt,o.currentPopup=Ft.firstElementChild,M.body.appendChild(o.currentPopup),S(o.currentPopup).find(".yyt-popup-close").on("click",Qt),S(o.currentPopup).find(".yyt-sidebar-toggle").on("click",m);let or=X=>{X.key==="Escape"&&(M.querySelector(".yyt-dialog-overlay")||M.querySelector(".yyt-twb-editor-drawer.is-open")||(X.stopPropagation(),Qt()))},Lr=X=>{if(!(X.ctrlKey||X.metaKey)||X.key!=="s"||!o.currentPopup)return;X.preventDefault(),X.stopPropagation();let wt=S(o.currentPopup),nt=wt.find("#yyt-bypass-save:visible").first()||wt.find(`#${a}-save-api-config:visible`).first()||wt.find("#yyt-save-tool-preset:visible").first()||wt.find('[data-twb-action="save"]:visible').first();nt?.length&&nt.trigger("click")};M.addEventListener("keydown",or),M.addEventListener("keydown",Lr),u.cleanups.push(()=>{M.removeEventListener("keydown",or),M.removeEventListener("keydown",Lr)}),Fe(),S(o.currentPopup).find(".yyt-main-nav-item").on("click",function(){let wt=S(this).data("tab");wt&&gs(wt)}),so(),Dr(o.currentMainTab);let yt=s.toolRegistryModule?.getToolConfig(o.currentMainTab);yt?.hasSubTabs&&(S(o.currentPopup).find(".yyt-sub-nav").show(),sn(o.currentMainTab,yt.subTabs)),$(),ro(O),Ze(),h("\u5F39\u7A97\u5DF2\u6253\u5F00")}return{openPopup:Ib,closePopup:Qt,switchMainTab:gs,switchSubTab:ms,renderTabContent:Dr,renderSubTabContent:hs}}function bb(t,e={}){let{constants:r,modules:s}=t,{SCRIPT_ID:n,SCRIPT_VERSION:o}=r,{init:a,loadModules:i,addMenuItem:l,popupShell:c}=e;return{version:o,id:n,init:a,openPopup:c?.openPopup,closePopup:c?.closePopup,switchMainTab:c?.switchMainTab,switchSubTab:c?.switchSubTab,addMenuItem:l,getStorage:()=>s.storageModule,getApiConnection:()=>s.apiConnectionModule,getPresetManager:()=>s.presetManagerModule,getUi:()=>s.uiModule,getUiModule:()=>s.uiModule,getRegexExtractor:()=>s.regexExtractorModule,getToolManager:()=>s.toolManagerModule,getToolExecutor:()=>s.toolExecutorModule,getWindowManager:()=>s.windowManagerModule,getToolRegistry:()=>s.toolRegistryModule,getSettingsService:()=>s.settingsServiceModule,getBypassManager:()=>s.bypassManagerModule,getVariableResolver:()=>s.variableResolverModule,getContextInjector:()=>s.contextInjectorModule,getToolPromptService:()=>s.toolPromptServiceModule,getToolOutputService:()=>s.toolOutputServiceModule,getToolAutomationService:()=>s.toolAutomationServiceModule,getDataProvider:()=>s.toolDataProviderModule?.getCurrentProvider?.()||null,async getDataProviderAsync(){return await i(),s.toolDataProviderModule?.getToolDataProvider?.()||null},async getApiConfig(){return await i(),s.apiConnectionModule?.getApiConfig?.()||null},async saveApiConfig(d){return await i(),s.apiConnectionModule?(s.apiConnectionModule.updateApiConfig(d),!0):!1},async getPresets(){return await i(),s.presetManagerModule?s.presetManagerModule.getAllPresets():[]},async sendApiRequest(d,u){if(await i(),s.apiConnectionModule)return s.apiConnectionModule.sendApiRequest(d,u);throw new Error("API\u6A21\u5757\u672A\u52A0\u8F7D")},async testApiConnection(){return await i(),s.apiConnectionModule?s.apiConnectionModule.testApiConnection():{success:!1,message:"API\u6A21\u5757\u672A\u52A0\u8F7D"}},registerTool(d,u){return s.toolRegistryModule?.registerTool(d,u)||!1},unregisterTool(d){return s.toolRegistryModule?.unregisterTool(d)||!1},getToolList(){return s.toolRegistryModule?.getToolList()||[]},createWindow(d){return s.windowManagerModule?.createWindow(d)||null},closeWindow(d){s.windowManagerModule?.closeWindow(d)},startAutomation(){return s.toolAutomationServiceModule?.toolAutomationService?.init?.()||!1},stopAutomation(){s.toolAutomationServiceModule?.toolAutomationService?.stop?.()},getAutomationRuntime(){return s.toolAutomationServiceModule?.toolAutomationService?.getRuntimeSnapshot?.()||null},cancelAutomation(d={}){return s.toolAutomationServiceModule?.toolAutomationService?.cancelAutomation?.(d)||{success:!1,error:"\u81EA\u52A8\u5316\u670D\u52A1\u672A\u52A0\u8F7D"}},async processCurrentAssistantMessage(d={}){return s.toolAutomationServiceModule?.toolAutomationService?.processCurrentAssistantMessage?.(d)||{success:!1,error:"\u81EA\u52A8\u5316\u670D\u52A1\u672A\u52A0\u8F7D"}}}}var dl="youyou_toolkit",$A="1.0.242",OA=`${dl}-menu-item`,DA=`${dl}-menu-container`,LA=`${dl}-popup`,BA=typeof window.parent<"u"?window.parent:window,ul={constants:{SCRIPT_ID:dl,SCRIPT_VERSION:$A,MENU_ITEM_ID:OA,MENU_CONTAINER_ID:DA,POPUP_ID:LA},topLevelWindow:BA,modules:{storageModule:null,apiConnectionModule:null,uiModule:null,presetManagerModule:null,regexExtractorModule:null,toolManagerModule:null,toolExecutorModule:null,toolTriggerModule:null,windowManagerModule:null,toolRegistryModule:null,settingsServiceModule:null,bypassManagerModule:null,variableResolverModule:null,contextInjectorModule:null,toolPromptServiceModule:null,toolOutputServiceModule:null,toolAutomationServiceModule:null,toolDataProviderModule:null},caches:{dynamicToolPanelCache:new Map},services:{loadModules:null},uiState:{currentPopup:null,currentOverlay:null,currentMainTab:"presetManagement",currentSubTab:{},startupScreenDismissed:!1}},xb=hb(ul),ya=yb(ul,{openPopup:xb.openPopup});ul.services.loadModules=ya.loadModules;var Ru=bb(ul,{init:ya.init,loadModules:ya.loadModules,addMenuItem:ya.addMenuItem,popupShell:xb});if(typeof window<"u"&&(window.YouYouToolkit=Ru,typeof window.parent<"u"&&window.parent!==window))try{window.parent.YouYouToolkit=Ru}catch{}var zP=Ru;ya.init();Promise.resolve().then(()=>(H(),Pu)).then(({logger:t})=>{t.createScope("Bootstrap").log("\u6A21\u5757\u52A0\u8F7D\u5B8C\u6210")});export{zP as default};
