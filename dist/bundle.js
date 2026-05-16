var Wp=Object.defineProperty;var R=(t,e)=>()=>(t&&(e=t(t=0)),e);var te=(t,e)=>{for(var s in e)Wp(t,s,{get:e[s],enumerable:!0})};var M,ua,P,Me=R(()=>{M={STORAGE_CHANGED:"storage:changed",STORAGE_CLEARED:"storage:cleared",PRESET_CREATED:"preset:created",PRESET_UPDATED:"preset:updated",PRESET_DELETED:"preset:deleted",PRESET_ACTIVATED:"preset:activated",PRESET_IMPORTED:"preset:imported",PRESET_EXPORTED:"preset:exported",API_CONFIG_UPDATED:"api:configUpdated",API_REQUEST_START:"api:requestStart",API_REQUEST_SUCCESS:"api:requestSuccess",API_REQUEST_ERROR:"api:requestError",API_CONNECTION_TESTED:"api:connectionTested",TOOL_REGISTERED:"tool:registered",TOOL_UNREGISTERED:"tool:unregistered",TOOL_UPDATED:"tool:updated",TOOL_RUNTIME_UPDATED:"tool:runtimeUpdated",TOOL_ENABLED:"tool:enabled",TOOL_DISABLED:"tool:disabled",TOOL_EXECUTING:"tool:executing",TOOL_EXECUTED:"tool:executed",TOOL_ERROR:"tool:error",TOOL_EXECUTION_STARTED:"tool:executionStarted",TOOL_EXECUTION_FAILED:"tool:executionFailed",REGEX_RULE_ADDED:"regex:ruleAdded",REGEX_RULE_UPDATED:"regex:ruleUpdated",REGEX_RULE_DELETED:"regex:ruleDeleted",REGEX_RULES_CLEARED:"regex:rulesCleared",REGEX_PRESET_LOADED:"regex:presetLoaded",REGEX_EXTRACTED:"regex:extracted",UI_INITIALIZED:"ui:initialized",UI_RENDER_REQUESTED:"ui:renderRequested",UI_TAB_CHANGED:"ui:tabChanged",UI_SUBTAB_CHANGED:"ui:subTabChanged",UI_POPUP_OPENED:"ui:popupOpened",UI_POPUP_CLOSED:"ui:popupClosed",UI_WINDOW_CREATED:"ui:windowCreated",UI_WINDOW_CLOSED:"ui:windowClosed",APP_INITIALIZING:"app:initializing",APP_INITIALIZED:"app:initialized",APP_ERROR:"app:error",SETTINGS_UPDATED:"settings:updated",TOOL_CONTEXT_INJECTED:"tool:contextInjected",TOOL_CONTEXT_CLEARED:"tool:contextCleared",BYPASS_PRESET_CREATED:"bypass:presetCreated",BYPASS_PRESET_UPDATED:"bypass:presetUpdated",BYPASS_PRESET_DELETED:"bypass:presetDeleted",BYPASS_PRESET_ACTIVATED:"bypass:presetActivated",TOOL_OUTPUT_MODE_CHANGED:"tool:outputModeChanged"},ua=class{constructor(){this.listeners=new Map,this.onceCallbacks=new Map,this.history=[],this.maxHistorySize=100,this.debugMode=!1}on(e,s,r={}){if(!e||typeof s!="function")return console.warn("[EventBus] \u65E0\u6548\u7684\u4E8B\u4EF6\u6216\u56DE\u8C03"),()=>{};let{priority:o=0}=r;this.listeners.has(e)||this.listeners.set(e,new Set);let n={callback:s,priority:o};return this.listeners.get(e).add(n),this.debugMode&&console.log(`[EventBus] \u8BA2\u9605: ${e}`),()=>this.off(e,s)}off(e,s){let r=this.listeners.get(e);if(r){for(let o of r)if(o.callback===s){r.delete(o);break}this.debugMode&&console.log(`[EventBus] \u53D6\u6D88\u8BA2\u9605: ${e}`)}}emit(e,s){this.debugMode&&console.log(`[EventBus] \u53D1\u5E03: ${e}`,s),this._addToHistory(e,s);let r=this.listeners.get(e);if(!r||r.size===0)return;let o=Array.from(r).sort((n,a)=>a.priority-n.priority);for(let{callback:n}of o)try{n(s)}catch(a){console.error(`[EventBus] \u4E8B\u4EF6\u5904\u7406\u9519\u8BEF (${e}):`,a)}}once(e,s){let r=o=>{this.off(e,r),s(o)};return this.on(e,r)}wait(e,s=0){return new Promise((r,o)=>{let n=null,a=this.once(e,i=>{n&&clearTimeout(n),r(i)});s>0&&(n=setTimeout(()=>{a(),o(new Error(`\u7B49\u5F85\u4E8B\u4EF6\u8D85\u65F6: ${e}`))},s))})}hasListeners(e){let s=this.listeners.get(e);return s&&s.size>0}listenerCount(e){let s=this.listeners.get(e);return s?s.size:0}removeAllListeners(e){e?this.listeners.delete(e):this.listeners.clear()}setDebugMode(e){this.debugMode=e}_addToHistory(e,s){this.history.push({event:e,data:s,timestamp:Date.now()}),this.history.length>this.maxHistorySize&&this.history.shift()}getHistory(e){return e?this.history.filter(s=>s.event===e):[...this.history]}clearHistory(){this.history=[]}},P=new ua});var xl={};te(xl,{LOG_LEVEL:()=>ae,LoggerService:()=>jo,default:()=>Hp,logger:()=>I});var ae,hl,jo,I,Hp,J=R(()=>{Me();ae=Object.freeze({DEBUG:0,INFO:1,WARN:2,ERROR:3}),hl=Object.freeze({[ae.DEBUG]:"DEBUG",[ae.INFO]:"INFO",[ae.WARN]:"WARN",[ae.ERROR]:"ERROR"}),jo=class{constructor(){this._entries=[],this._maxSize=2e3,this._nextId=1,this._minLevel=ae.INFO,this._eventKey="logger:entry",this._statsEventKey="logger:statsChanged",this._pendingFlush=!1}_write(e,s,r,o){let n={id:this._nextId++,timestamp:Date.now(),level:e,scope:s,message:r,data:o};this._entries.push(n),this._entries.length>this._maxSize&&this._entries.shift(),this._forwardToConsole(n),this._pendingFlush||(this._pendingFlush=!0,queueMicrotask(()=>{this._pendingFlush=!1,this._emitEntry(n)}))}_forwardToConsole(e){let s=`[${e.scope}]`;switch(e.level){case ae.DEBUG:console.debug(s,e.message,e.data??"");break;case ae.INFO:console.log(s,e.message,e.data??"");break;case ae.WARN:console.warn(s,e.message,e.data??"");break;case ae.ERROR:console.error(s,e.message,e.data??"");break}}_emitEntry(e){try{P?.emit(this._eventKey,e)}catch{}}debug(e,s,r){ae.DEBUG<this._minLevel||this._write(ae.DEBUG,e,s,r)}info(e,s,r){ae.INFO<this._minLevel||this._write(ae.INFO,e,s,r)}log(e,s,r){this.info(e,s,r)}warn(e,s,r){ae.WARN<this._minLevel||this._write(ae.WARN,e,s,r)}error(e,s,r){ae.ERROR<this._minLevel||this._write(ae.ERROR,e,s,r)}createScope(e){return{debug:(s,r)=>this.debug(e,s,r),info:(s,r)=>this.info(e,s,r),log:(s,r)=>this.log(e,s,r),warn:(s,r)=>this.warn(e,s,r),error:(s,r)=>this.error(e,s,r)}}getEntries(e={}){let{level:s,scope:r,search:o,limit:n=500,offset:a=0}=e,i=this._entries;if(s!=null&&(i=i.filter(c=>c.level>=s)),r&&(i=i.filter(c=>c.scope===r)),o){let c=o.toLowerCase();i=i.filter(d=>d.scope.toLowerCase().includes(c)||d.message.toLowerCase().includes(c))}let l=i.length;return i=i.slice(a,a+n),{entries:i,total:l}}getStats(){let e={total:this._entries.length,byLevel:{DEBUG:0,INFO:0,WARN:0,ERROR:0},byScope:{}};for(let s of this._entries){let r=hl[s.level]||"UNKNOWN";e.byLevel[r]=(e.byLevel[r]||0)+1,e.byScope[s.scope]=(e.byScope[s.scope]||0)+1}return e}setLevel(e){this._minLevel=e}getLevel(){return this._minLevel}setMaxSize(e){this._maxSize=Math.max(100,Math.min(1e4,e))}clear(){this._entries=[],this._nextId=1}levelLabel(e){return hl[e]||"UNKNOWN"}},I=new jo,Hp=I});var vl={};te(vl,{StorageService:()=>$s,default:()=>Vp,getStorage:()=>qp,loadSettings:()=>Yp,presetStorage:()=>$e,saveSettings:()=>Gp,storage:()=>$,toolStorage:()=>ge,windowStorage:()=>Fo});function qp(){let t=$;return t._getStorage(),t._storage}function Yp(){return $.get("settings",{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}})}function Gp(t){$.set("settings",t)}var ya,$s,$,ge,$e,Fo,Vp,We=R(()=>{J();ya=I.createScope("StorageService"),$s=class t{constructor(e="youyou_toolkit"){this.namespaceKey=e,this._storage=null,this._cache=new Map}_getStorage(){if(this._storage)return this._storage;try{let e=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(e.SillyTavern?.getContext){let s=e.SillyTavern.getContext();if(s?.extensionSettings)return s.extensionSettings[this.namespaceKey]||(s.extensionSettings[this.namespaceKey]={}),this._storage={_target:s.extensionSettings[this.namespaceKey],getItem:r=>{let o=s.extensionSettings[this.namespaceKey][r];return typeof o=="string"?o:o?JSON.stringify(o):null},setItem:(r,o)=>{s.extensionSettings[this.namespaceKey][r]=o,this._saveSettings(s)},removeItem:r=>{delete s.extensionSettings[this.namespaceKey][r],this._saveSettings(s)},_isTavern:!0},this._storage}}catch{ya.warn("SillyTavern\u5B58\u50A8\u4E0D\u53EF\u7528\uFF0C\u4F7F\u7528localStorage")}return this._storage={getItem:e=>{try{return localStorage.getItem(e)}catch{return null}},setItem:(e,s)=>{try{localStorage.setItem(e,s)}catch(r){ya.error("localStorage\u5199\u5165\u5931\u8D25:",r)}},removeItem:e=>{try{localStorage.removeItem(e)}catch{}},_isTavern:!1},this._storage}_saveSettings(e){if(typeof e.saveSettings=="function")try{e.saveSettings()}catch{}else if(typeof e.saveSettingsDebounced=="function")try{e.saveSettingsDebounced()}catch{}}get(e,s=null){let r=`${this.namespaceKey}:${e}`;if(this._cache.has(r))return this._cache.get(r);let o=this._getStorage(),n=this._getFullKey(e),a=o.getItem(n);if(a===null)return s;try{let i=JSON.parse(a);return this._cache.set(r,i),i}catch{return a}}set(e,s){let r=this._getStorage(),o=this._getFullKey(e),n=`${this.namespaceKey}:${e}`;this._cache.set(n,s);try{r.setItem(o,JSON.stringify(s))}catch(a){ya.error("\u5B58\u50A8\u5931\u8D25:",a)}}remove(e){let s=this._getStorage(),r=this._getFullKey(e),o=`${this.namespaceKey}:${e}`;this._cache.delete(o),s.removeItem(r)}has(e){let s=this._getStorage(),r=this._getFullKey(e);return s.getItem(r)!==null}clear(){if(this._getStorage()._isTavern){let s=typeof window.parent<"u"?window.parent:window;if(s.SillyTavern?.getContext){let r=s.SillyTavern.getContext();r?.extensionSettings?.[this.namespaceKey]&&(r.extensionSettings[this.namespaceKey]={},this._saveSettings(r))}}else{let s=`${this.namespaceKey}_`,r=[];for(let o=0;o<localStorage.length;o++){let n=localStorage.key(o);n&&n.startsWith(s)&&r.push(n)}r.forEach(o=>localStorage.removeItem(o))}this._cache.clear()}_getFullKey(e){return this._getStorage()._isTavern?e:`${this.namespaceKey}_${e}`}namespace(e){return new t(`${this.namespaceKey}:${e}`)}getMultiple(e){let s={};return e.forEach(r=>{s[r]=this.get(r)}),s}setMultiple(e){Object.entries(e).forEach(([s,r])=>{this.set(s,r)})}exportAll(){let e=this._getStorage(),s={};if(e._isTavern){let r=typeof window.parent<"u"?window.parent:window;if(r.SillyTavern?.getContext){let n=r.SillyTavern.getContext()?.extensionSettings?.[this.namespaceKey]||{};Object.entries(n).forEach(([a,i])=>{s[a]=typeof i=="string"?JSON.parse(i):i})}}else{let r=`${this.namespaceKey}_`;for(let o=0;o<localStorage.length;o++){let n=localStorage.key(o);if(n&&n.startsWith(r)){let a=n.slice(r.length);try{s[a]=JSON.parse(localStorage.getItem(n))}catch{s[a]=localStorage.getItem(n)}}}}return s}},$=new $s("youyou_toolkit"),ge=new $s("youyou_toolkit:tools"),$e=new $s("youyou_toolkit:presets"),Fo=new $s("youyou_toolkit:windows");Vp=$});var Al={};te(Al,{API_STATUS:()=>sf,fetchAvailableModels:()=>ba,getApiConfig:()=>Yt,getEffectiveApiConfig:()=>zr,hasEffectiveApiPreset:()=>Ur,sendApiRequest:()=>jr,sendWithPreset:()=>ga,testApiConnection:()=>df,updateApiConfig:()=>cr,validateApiConfig:()=>dr});function Zp(){return{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,stream:!1,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}}}function fa(){return $.get(wl,Zp())}function ef(t){$.set(wl,t)}function Sl(){return $.get(Xp,[])}function tf(){return $.get(Qp,"")}function pa(t,e={}){let s=new Error(t);return s.allowDirectFallback=e.allowDirectFallback===!0,s}function Tl(t,e="chat_completions"){let s=String(t||"").trim();if(!s)return"";let r=null;try{r=new URL(s)}catch{return s}let o=r.pathname.replace(/\/+$/,""),n=o;return e==="chat_completions"?!/\/chat\/completions$/i.test(o)&&!/\/completions$/i.test(o)&&(n=`${o||""}/chat/completions`):e==="models"&&(/\/chat\/completions$/i.test(o)?n=o.replace(/\/chat\/completions$/i,"/models"):/\/completions$/i.test(o)?n=o.replace(/\/completions$/i,"/models"):/\/models$/i.test(o)||(n=`${o||""}/models`)),r.pathname=n.replace(/\/+/g,"/"),r.toString()}function rf(t){let e=String(t||"").trim();if(!e)return"";try{let s=new URL(e);return s.pathname=s.pathname.replace(/\/chat\/completions$/i,"").replace(/\/completions$/i,"").replace(/\/models$/i,"").replace(/\/+$/,"")||"/",s.toString().replace(/\/$/,"")}catch{return e.replace(/\/chat\/completions$/i,"").replace(/\/completions$/i,"").replace(/\/models$/i,"").replace(/\/+$/,"")}}function Yt(){return fa().apiConfig||{}}function cr(t){let e=fa();e.apiConfig={...e.apiConfig,...t},ef(e)}function dr(t){let e=[];if(t.useMainApi)return{valid:!0,errors:[]};if(!t.url||!t.url.trim())e.push("API URL \u4E0D\u80FD\u4E3A\u7A7A");else try{new URL(t.url)}catch{e.push("API URL \u683C\u5F0F\u65E0\u6548")}return(!t.model||!t.model.trim())&&e.push("\u6A21\u578B\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"),{valid:e.length===0,errors:e}}function zr(t=""){let e=fa(),s=t||tf()||"";if(s){let o=Sl().find(n=>n.name===s);if(o&&o.apiConfig)return{...o.apiConfig,presetName:o.name}}return e.apiConfig||{}}function Ur(t=""){return t?Sl().some(s=>s?.name===t):!1}async function ga(t,e,s={},r=null){let o=zr(t);return await jr(e,{...s,apiConfig:o},r)}function _l(t,e={}){let s=e.apiConfig||Yt();return{messages:t,model:s.model||"gpt-3.5-turbo",max_tokens:s.max_tokens||4096,temperature:s.temperature??.7,top_p:s.top_p??.9,stream:s.stream??!1,...e.extraParams}}function ma(t){let e="";if(t?.choices&&t.choices[0]?.message?.content)e=t.choices[0].message.content;else if(t?.content)e=t.content;else if(t?.text)e=t.text;else if(t?.response)e=t.response;else throw new Error(`\u65E0\u6CD5\u89E3\u6790API\u54CD\u5E94\u683C\u5F0F: ${JSON.stringify(t).slice(0,200)}`);return String(e||"").trim()}async function jr(t,e={},s=null){let r=e.apiConfig||Yt(),o=r.useMainApi,n=dr(r);if(!n.valid&&!o)throw new Error(`API\u914D\u7F6E\u65E0\u6548: ${n.errors.join(", ")}`);return o?await of(t,e,s):await nf(t,r,e,s)}async function of(t,e,s){let r=typeof window.parent<"u"?window.parent:window;if(!r.TavernHelper?.generateRaw)throw new Error("TavernHelper.generateRaw \u4E0D\u53EF\u7528\u3002\u8BF7\u68C0\u67E5SillyTavern\u7248\u672C\u3002");try{let o=await r.TavernHelper.generateRaw({ordered_prompts:t,should_stream:e.apiConfig?.stream??Yt().stream??!1,...e.extraParams});if(typeof o!="string")throw new Error("\u4E3BAPI\u8FD4\u56DE\u4E86\u975E\u9884\u671F\u7684\u54CD\u5E94\u7C7B\u578B");return o.trim()}catch(o){throw o.name==="AbortError"?o:new Error(`\u4E3BAPI\u8BF7\u6C42\u5931\u8D25: ${o.message}`)}}async function nf(t,e,s,r){let o=typeof window.parent<"u"?window.parent:window;if(o.TavernHelper?.generateRaw)try{return await af(t,e,s,r,o)}catch(n){let a=String(n?.message||n||"");if(n?.name==="AbortError"||r?.aborted||a.includes("\u505C\u6B62\u6309\u94AE")||a.includes("stop button")||a.includes("Clicked stop")||a==="\u8BF7\u6C42\u5DF2\u53D6\u6D88")throw n;Jp.warn("TavernHelper \u81EA\u5B9A\u4E49\u8BF7\u6C42\u5931\u8D25\uFF0C\u56DE\u9000\u5230\u540E\u5907\u94FE\u8DEF:",n)}if(o.SillyTavern?.getRequestHeaders)try{return await lf(t,e,s,r,o)}catch(n){if(!n?.allowDirectFallback)throw n}return await cf(t,e,s,r)}async function af(t,e,s,r,o){if(r?.aborted)throw new DOMException("\u8BF7\u6C42\u5DF2\u53D6\u6D88","AbortError");let n=await o.TavernHelper.generateRaw({ordered_prompts:t,should_stream:e.stream??!1,max_chat_history:0,custom_api:{apiurl:rf(e.url),key:e.apiKey||"",model:e.model||"gpt-3.5-turbo",max_tokens:e.max_tokens||4096,temperature:e.temperature??.7,top_p:e.top_p??.9},...s.extraParams||{}});return typeof n=="string"?n.trim():ma(n)}async function lf(t,e,s,r,o){let n=String(e.url||"").trim(),a={..._l(t,{apiConfig:e,...s}),chat_completion_source:"custom",reverse_proxy:n,proxy_password:"",custom_url:n,custom_include_headers:e.apiKey?`Authorization: Bearer ${e.apiKey}`:""},i={...typeof o.SillyTavern?.getRequestHeaders=="function"?o.SillyTavern.getRequestHeaders():{},"Content-Type":"application/json"},l=null;try{l=await fetch("/api/backends/chat-completions/generate",{method:"POST",headers:i,body:JSON.stringify(a),signal:r})}catch(u){throw u?.name==="AbortError"?u:pa(`\u9152\u9986\u540E\u7AEF\u8F6C\u53D1\u8BF7\u6C42\u4E0D\u53EF\u7528\uFF0C\u5DF2\u5C1D\u8BD5\u56DE\u9000\u5230\u6D4F\u89C8\u5668\u76F4\u8FDE\u3002\u539F\u59CB\u9519\u8BEF: ${u.message}`,{allowDirectFallback:!0})}let c=await l.text().catch(()=>"");if(!l.ok){let u=[404,405,501,502].includes(l.status);throw pa(`\u9152\u9986\u540E\u7AEF\u8F6C\u53D1\u8BF7\u6C42\u5931\u8D25 (${l.status}): ${c||"Unknown error"}`,{allowDirectFallback:u})}let d=null;try{d=c?JSON.parse(c):{}}catch{let p=String(c||"").replace(/\s+/g," ").trim().slice(0,120);throw pa(`\u9152\u9986\u540E\u7AEF\u8FD4\u56DE\u4E86\u975EJSON\u5185\u5BB9\u3002\u54CD\u5E94\u7247\u6BB5: ${p||"(\u7A7A\u54CD\u5E94)"}`)}return ma(d)}async function cf(t,e,s,r){let o=_l(t,{apiConfig:e,...s}),n=Tl(e.url,"chat_completions"),a={"Content-Type":"application/json"};e.apiKey&&(a.Authorization=`Bearer ${e.apiKey}`);let i=await fetch(n,{method:"POST",headers:a,body:JSON.stringify(o),signal:r}),l=await i.text().catch(()=>"");if(!i.ok){let d=l||"Unknown error";throw new Error(`API\u8BF7\u6C42\u5931\u8D25 (${i.status}): ${d}`)}let c=null;try{c=l?JSON.parse(l):{}}catch{let u=String(l||"").replace(/\s+/g," ").trim().slice(0,120);throw new Error(`\u81EA\u5B9A\u4E49API\u8FD4\u56DE\u7684\u4E0D\u662FJSON\uFF0C\u53EF\u80FD\u662FURL\u914D\u7F6E\u9519\u8BEF\u3001\u53EA\u586B\u5199\u4E86\u7AD9\u70B9\u9996\u9875/\u57FA\u7840\u8DEF\u5F84\u3001\u6216\u8BF7\u6C42\u88AB\u91CD\u5B9A\u5411\u3002\u5F53\u524D\u4F1A\u81EA\u52A8\u5C1D\u8BD5\u8865\u5168 chat/completions \u7AEF\u70B9\uFF1B\u82E5\u4ECD\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5API URL\uFF0C\u6216\u6539\u4E3A\u542F\u7528\u201C\u4F7F\u7528SillyTavern\u4E3BAPI\u201D\u3002\u54CD\u5E94\u7247\u6BB5: ${u||"(\u7A7A\u54CD\u5E94)"}`)}return ma(c)}async function df(t=null){let e=t||Yt(),s=Date.now();try{await jr([{role:"user",content:'Hello, this is a connection test. Please respond with "OK".'}],{apiConfig:e});let o=Date.now()-s;return{success:!0,message:`\u8FDE\u63A5\u6210\u529F (\u5EF6\u8FDF: ${o}ms)`,latency:o}}catch(r){return{success:!1,message:`\u8FDE\u63A5\u5931\u8D25: ${r.message}`,latency:Date.now()-s}}}async function ba(t=null){let e=t||Yt();return e.useMainApi?await uf():await yf(e)}async function uf(){let t=typeof window.parent<"u"?window.parent:window;try{if(t.SillyTavern?.getContext){let e=t.SillyTavern.getContext();if(e.settings?.api_server)return[e.settings.api_server]}return["gpt-4","gpt-4-turbo","gpt-3.5-turbo","claude-3-opus","claude-3-sonnet"]}catch{return["gpt-4","gpt-3.5-turbo"]}}async function yf(t){if(!t.url||!t.apiKey)return[];try{let e=Tl(t.url,"models"),s=await fetch(e,{method:"GET",headers:{Authorization:`Bearer ${t.apiKey}`}});if(!s.ok)return[];let r=await s.json();return r.data&&Array.isArray(r.data)?r.data.map(o=>o.id||o.name).filter(Boolean).sort():[]}catch{return[]}}var Jp,wl,Xp,Qp,sf,Fr=R(()=>{We();J();Jp=I.createScope("ApiConnection"),wl="settings",Xp="api_presets",Qp="current_preset";sf={IDLE:"idle",CONNECTING:"connecting",SUCCESS:"success",ERROR:"error"}});var Il={};te(Il,{createPreset:()=>Ho,createPresetFromCurrentConfig:()=>hf,deletePreset:()=>Wr,duplicatePreset:()=>bf,exportPresets:()=>Sa,generateUniquePresetName:()=>_a,getActiveConfig:()=>wa,getActivePresetName:()=>qo,getAllPresets:()=>Gt,getPreset:()=>Ns,getPresetNames:()=>gf,getStarredPresets:()=>va,importPresets:()=>Ta,presetExists:()=>Kr,renamePreset:()=>mf,switchToPreset:()=>Os,togglePresetStar:()=>xa,updatePreset:()=>ha,validatePreset:()=>xf});function ff(){return{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}}}function kl(){return $.get(pf,ff())}function et(){return $.get(El,[])}function Ds(t){$.set(El,t)}function Wo(){return $.get(Cl,"")}function Ko(t){$.set(Cl,t||"")}function Gt(){return et()}function gf(){return et().map(e=>e.name)}function Ns(t){return!t||typeof t!="string"?null:et().find(s=>s.name===t)||null}function Kr(t){return!t||typeof t!="string"?!1:et().some(s=>s.name===t)}function Ho(t){let{name:e,description:s,apiConfig:r}=t;if(!e||typeof e!="string"||!e.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let o=e.trim();if(Kr(o))return{success:!1,message:`\u9884\u8BBE "${o}" \u5DF2\u5B58\u5728`};let n={name:o,description:s||"",apiConfig:{url:r?.url||"",apiKey:r?.apiKey||"",model:r?.model||"",useMainApi:r?.useMainApi??!0,stream:r?.stream??!1,max_tokens:r?.max_tokens||4096,temperature:r?.temperature??.7,top_p:r?.top_p??.9},createdAt:Date.now(),updatedAt:Date.now()},a=et();return a.push(n),Ds(a),{success:!0,message:`\u9884\u8BBE "${o}" \u521B\u5EFA\u6210\u529F`,preset:n}}function ha(t,e){if(!t||typeof t!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let s=et(),r=s.findIndex(a=>a.name===t);if(r===-1)return{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if(e.name&&e.name!==t)return{success:!1,message:"\u4E0D\u652F\u6301\u4FEE\u6539\u9884\u8BBE\u540D\u79F0\uFF0C\u8BF7\u521B\u5EFA\u65B0\u9884\u8BBE"};let o=s[r],n={...o,...e,name:o.name,updatedAt:Date.now()};return e.apiConfig&&(n.apiConfig={...o.apiConfig,...e.apiConfig}),s[r]=n,Ds(s),{success:!0,message:`\u9884\u8BBE "${t}" \u66F4\u65B0\u6210\u529F`,preset:n}}function Wr(t){if(!t||typeof t!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let e=et(),s=e.findIndex(r=>r.name===t);return s===-1?{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`}:(e.splice(s,1),Ds(e),Wo()===t&&Ko(""),{success:!0,message:`\u9884\u8BBE "${t}" \u5DF2\u5220\u9664`})}function mf(t,e){if(!t||typeof t!="string")return{success:!1,message:"\u539F\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};if(!e||typeof e!="string"||!e.trim())return{success:!1,message:"\u65B0\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let s=e.trim();if(!Kr(t))return{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if(Kr(s))return{success:!1,message:`\u9884\u8BBE "${s}" \u5DF2\u5B58\u5728`};let r=et(),o=r.find(n=>n.name===t);return o&&(o.name=s,o.updatedAt=Date.now(),Ds(r),Wo()===t&&Ko(s)),{success:!0,message:`\u9884\u8BBE\u5DF2\u91CD\u547D\u540D\u4E3A "${s}"`}}function bf(t,e){if(!t||typeof t!="string")return{success:!1,message:"\u6E90\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};if(!e||typeof e!="string"||!e.trim())return{success:!1,message:"\u76EE\u6807\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let s=e.trim(),r=Ns(t);if(!r)return{success:!1,message:`\u6E90\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if(Kr(s))return{success:!1,message:`\u9884\u8BBE "${s}" \u5DF2\u5B58\u5728`};let o={...JSON.parse(JSON.stringify(r)),name:s,createdAt:Date.now(),updatedAt:Date.now()},n=et();return n.push(o),Ds(n),{success:!0,message:`\u9884\u8BBE\u5DF2\u590D\u5236\u4E3A "${s}"`,preset:o}}function xa(t){if(!t||typeof t!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let e=et(),s=e.find(r=>r.name===t);return s?(s.starred=!s.starred,s.updatedAt=Date.now(),Ds(e),{success:!0,message:s.starred?`\u5DF2\u5C06 "${t}" \u6DFB\u52A0\u5230\u9884\u89C8\u5217\u8868`:`\u5DF2\u5C06 "${t}" \u4ECE\u9884\u89C8\u5217\u8868\u79FB\u9664`,starred:s.starred}):{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`}}function va(){return et().filter(e=>e.starred===!0)}function Os(t){if(!t)return Ko(""),{success:!0,message:"\u5DF2\u5207\u6362\u5230\u5F53\u524DAPI\u914D\u7F6E"};let e=Ns(t);return e?(Ko(t),{success:!0,message:`\u5DF2\u5207\u6362\u5230\u9884\u8BBE "${t}"`,apiConfig:e.apiConfig}):{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`}}function qo(){return Wo()}function wa(){let t=Wo();if(t){let s=Ns(t);if(s)return{presetName:t,apiConfig:s.apiConfig}}return{presetName:"",apiConfig:kl().apiConfig||{}}}function Sa(t=null){if(t){let s=Ns(t);if(!s)throw new Error(`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`);return JSON.stringify(s,null,2)}let e=et();return JSON.stringify(e,null,2)}function Ta(t,e={overwrite:!1}){let s;try{s=JSON.parse(t)}catch{return{success:!1,message:"JSON\u89E3\u6790\u5931\u8D25",imported:0}}let r=Array.isArray(s)?s:[s];if(r.length===0)return{success:!1,message:"\u6CA1\u6709\u627E\u5230\u6709\u6548\u7684\u9884\u8BBE\u6570\u636E",imported:0};let o=et(),n=0;for(let a of r){if(!a.name||typeof a.name!="string"||!a.apiConfig||typeof a.apiConfig!="object")continue;let i=o.findIndex(l=>l.name===a.name);i>=0?e.overwrite&&(a.updatedAt=Date.now(),o[i]=a,n++):(a.createdAt=a.createdAt||Date.now(),a.updatedAt=Date.now(),o.push(a),n++)}return n>0&&Ds(o),{success:!0,message:`\u6210\u529F\u5BFC\u5165 ${n} \u4E2A\u9884\u8BBE`,imported:n}}function hf(t,e=""){let s=kl();return Ho({name:t,description:e,apiConfig:s.apiConfig})}function xf(t){let e=[];return(!t.name||typeof t.name!="string"||!t.name.trim())&&e.push("\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"),(!t.apiConfig||typeof t.apiConfig!="object")&&e.push("\u7F3A\u5C11API\u914D\u7F6E"),{valid:e.length===0,errors:e}}function _a(t){(!t||typeof t!="string")&&(t="\u65B0\u9884\u8BBE");let e=et(),s=new Set(e.map(o=>o.name));if(!s.has(t))return t;let r=1;for(;s.has(`${t} (${r})`);)r++;return`${t} (${r})`}var pf,El,Cl,Hr=R(()=>{We();pf="settings",El="api_presets",Cl="current_preset"});function Lt(){return typeof window.parent<"u"&&window.parent!==window&&window.parent.document?window.parent.document:document}function v(t){return typeof t!="string"?"":t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function k(t,e,s=3e3){e||(e=t==="error"?"\u64CD\u4F5C\u5931\u8D25":"\u64CD\u4F5C\u5B8C\u6210");let r=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(r.toastr){r.toastr[t](e,"YouYou \u5DE5\u5177\u7BB1",{timeOut:s,progressBar:!0});return}wf(t,e,s),vf.log(`[${t.toUpperCase()}] ${e}`)}function ce(t,e,s={}){e||(e=t==="error"?"\u64CD\u4F5C\u5931\u8D25":"\u64CD\u4F5C\u5B8C\u6210");let{duration:r=3500,sticky:o=!1,noticeId:n=""}=s,a=Lt();if(!a?.body){k(t,e,r);return}let i="yyt-top-notice-container",l="yyt-top-notice-styles",c=a.getElementById(i);if(c||(c=a.createElement("div"),c.id=i,c.style.cssText=`
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
    `,a.head.appendChild(h)}if(n){let h=c.querySelector(`[data-notice-id="${n}"]`);h&&h.remove()}let d={success:"\u2713",error:"!",warning:"\u2022",info:"i"},u=a.createElement("div");u.className=`yyt-top-notice yyt-top-notice--${t||"info"}`,n&&(u.dataset.noticeId=n);let p=a.createElement("span");p.className="yyt-top-notice__icon",p.textContent=d[t]||d.info;let y=a.createElement("div");y.className="yyt-top-notice__content",y.textContent=e;let f=a.createElement("button");f.className="yyt-top-notice__close",f.type="button",f.setAttribute("aria-label","\u5173\u95ED\u901A\u77E5"),f.textContent="\xD7";let x=()=>{u.style.animation="yyt-top-notice-out 0.18s ease forwards",setTimeout(()=>u.remove(),180)};f.addEventListener("click",x),u.appendChild(p),u.appendChild(y),u.appendChild(f),c.appendChild(u),o||setTimeout(x,r)}function wf(t,e,s){let r=Lt();if(!r)return;let o=r.getElementById("yyt-fallback-toast");o&&o.remove();let n={success:{bg:"rgba(74, 222, 128, 0.9)",border:"#22c55e"},error:{bg:"rgba(248, 113, 113, 0.9)",border:"#ef4444"},warning:{bg:"rgba(251, 191, 36, 0.9)",border:"#f59e0b"},info:{bg:"rgba(123, 183, 255, 0.9)",border:"#7bb7ff"}},a=n[t]||n.info,i=r.createElement("div");if(i.id="yyt-fallback-toast",i.style.cssText=`
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
  `,i.textContent=e,!r.getElementById("yyt-toast-styles")){let l=r.createElement("style");l.id="yyt-toast-styles",l.textContent=`
      @keyframes yyt-toast-in {
        from { opacity: 0; transform: translateX(100px); }
        to { opacity: 1; transform: translateX(0); }
      }
      @keyframes yyt-toast-out {
        from { opacity: 1; transform: translateX(0); }
        to { opacity: 0; transform: translateX(100px); }
      }
    `,r.head.appendChild(l)}r.body.appendChild(i),setTimeout(()=>{i.style.animation="yyt-toast-out 0.3s ease forwards",setTimeout(()=>{i.remove()},300)},s)}function U(){if(Ls)return Ls;if(typeof window.parent<"u"&&window.parent!==window)try{if(window.parent.jQuery)return Ls=window.parent.jQuery,Ls}catch{}return window.jQuery&&(Ls=window.jQuery),Ls}function Sf(){Ls=null}function X(t){if(!t||t.length===0)return!1;let e=t[0];if(!e||e.nodeType!==1)return!1;let s=e.ownerDocument||document;return e.isConnected?s?.documentElement?.contains?s.documentElement.contains(e):!0:!1}function fs(...t){return t.flat(1/0).flatMap(e=>String(e||"").split(/\s+/)).map(e=>e.trim()).filter(Boolean).join(" ")}function ur(t={}){return Object.entries(t).filter(([,e])=>e!=null&&e!==!1).map(([e,s])=>s===!0?e:`${e}="${v(String(s))}"`).join(" ")}function $l(t=[],e="",s=""){let r=String(e??""),o=t.find(n=>n.value===r)||t.find(n=>n.disabled!==!0)||null;return o||{value:r,label:s||r||"\u8BF7\u9009\u62E9",disabled:!1}}function Tf(t=""){return String(t||"").split(/\s+/).map(e=>e.trim()).filter(e=>e&&e!=="yyt-select"&&e!=="yyt-native-select-bridge")}function Ml(t,e){let s=U();if(!s||!e?.length)return null;let r=e.attr("id")?`#${e.attr("id")}`:e.attr("data-yyt-select-key")?`[data-yyt-select-key="${e.attr("data-yyt-select-key")}"]`:"";if(!r)return null;let n=t.find("[data-yyt-custom-select]").filter((a,i)=>String(s(i).attr("data-yyt-select-target")||"")===r);return n.length?n.first():null}function Dl(t){let e=t?.[0];return e?.ownerDocument?e.ownerDocument:typeof window.parent<"u"&&window.parent!==window&&window.parent.document?window.parent.document:document}function _f(t){if(!U()||!X(t))return null;let s=t.find("[data-yyt-custom-select]");return s.length?s:null}function Nl(t,e){if(!U()||!e?.length)return null;let r=e.find("[data-yyt-select-native]").first();if(r.length)return r;let o=String(e.attr("data-yyt-select-target")||"").trim();if(!o)return null;let n=t.find(o).first();return n.length?n:null}function Ol(t=null){return t?.jquery&&t[0]?.ownerDocument?t[0].ownerDocument:t?.ownerDocument?t.ownerDocument:t?.nodeType===9?t:Lt()}function Bt(t=null){let e=Ol(t),s=Rl.get(e);return s||(s={targetDoc:e,layer:null,activeRoot:null,activeDropdown:null,placeholder:null,cleanup:null},Rl.set(e,s)),s}function Af(t=null){let e=Ol(t);if(!e?.body)return null;let s=Bt(e);if(s.layer&&s.layer.isConnected)return s.layer;let r=e.getElementById(Pl);return r||(r=e.createElement("div"),r.id=Pl,r.className="yyt-select-portal-layer",e.body.appendChild(r)),s.layer=r,r}function Yo(t){if(!U()||!t?.length)return null;let s=t.find("[data-yyt-select-trigger]").first();return s.length?s:t.find(".yyt-select-trigger").first()}function Ll(t){let e=U();if(!e||!t?.length)return null;let s=Bt(t);if(s.activeRoot===t[0]&&s.activeDropdown)return e(s.activeDropdown);let r=t.find("[data-yyt-select-dropdown]").first();return r.length?r:t.find(".yyt-select-dropdown").first()}function Ef(t){t&&(t.classList.remove("yyt-floating-open"),t.removeAttribute("data-yyt-floating"),t.removeAttribute("data-yyt-floating-placement"),t.style.position="",t.style.top="",t.style.left="",t.style.right="",t.style.width="",t.style.minWidth="",t.style.maxWidth="",t.style.maxHeight="",t.style.visibility="",t.style.zIndex="")}function Bl(t,e=null){if(!t)return!1;let s=Bt(e||t);return s.activeRoot?.contains?.(t)||s.activeDropdown?.contains?.(t)?!0:!!t.closest?.("[data-yyt-custom-select], .yyt-select-portal-layer")}function Cf(t){if(!t?.targetDoc||typeof t.cleanup=="function")return;let e=t.targetDoc,s=e.defaultView||window,r=i=>{!t.activeRoot||!t.activeDropdown||Bl(i.target,e)||lt(e)},o=i=>{if(i.key!=="Escape")return;let l=t.activeRoot;lt(e);let c=U();c&&l&&Yo(c(l))?.trigger("focus")},n=()=>{Ca(e)},a=()=>{Ca(e)};e.addEventListener("mousedown",r,!0),e.addEventListener("keydown",o,!0),s.addEventListener("resize",n),e.addEventListener("scroll",a,!0),t.cleanup=()=>{e.removeEventListener("mousedown",r,!0),e.removeEventListener("keydown",o,!0),s.removeEventListener("resize",n),e.removeEventListener("scroll",a,!0)}}function kf(t){typeof t?.cleanup=="function"&&t.cleanup(),t&&(t.cleanup=null)}function Ea(t){let e=U();if(!e||!t?.activeRoot||!t?.activeDropdown)return;let s=t.targetDoc;if(!s?.body?.contains?.(t.activeRoot)){lt(s);return}let r=e(t.activeRoot),o=Yo(r),n=t.activeDropdown,a=s?.defaultView||window;if(!o?.length||!n?.isConnected||!r[0]?.isConnected){lt(s);return}let i=o[0].getBoundingClientRect(),l=a.innerWidth||s.documentElement?.clientWidth||0,c=a.innerHeight||s.documentElement?.clientHeight||0,d=12,u=8,p=Math.max(0,c-i.bottom-d-u),y=Math.max(0,i.top-d-u),f=p<220&&y>p,h=Math.max(120,Math.floor((f?y:p)||0));n.setAttribute("data-yyt-floating","true"),n.setAttribute("data-yyt-floating-placement",f?"top":"bottom"),n.classList.add("yyt-floating-open");let C=Math.ceil(i.width),T=Math.max(C,Math.floor(l-d*2)),_=n.style.width,Y=n.style.minWidth,L=n.style.maxWidth,S=n.style.visibility;n.style.width="max-content",n.style.minWidth=`${C}px`,n.style.maxWidth=`${T}px`,n.style.visibility="hidden";let N=Math.ceil(n.scrollWidth||n.getBoundingClientRect().width||C),F=Math.max(C,Math.min(T,N)),q=Math.min(n.scrollHeight||h,h);n.style.width=_,n.style.minWidth=Y,n.style.maxWidth=L,n.style.visibility=S;let D=Math.round(i.left);D+F>l-d&&(D=Math.max(d,Math.round(l-d-F))),D=Math.max(d,D);let H=Math.round(f?i.top-u-q:i.bottom+u);H=Math.max(d,Math.min(H,Math.round(c-d-q))),n.style.position="fixed",n.style.top=`${H}px`,n.style.left=`${D}px`,n.style.right="auto",n.style.width=`${F}px`,n.style.minWidth=`${C}px`,n.style.maxWidth=`${T}px`,n.style.maxHeight=`${Math.floor(h)}px`,n.style.visibility="",n.style.zIndex="10050"}function lt(t=null){let e=U(),s=Bt(t);if(!e||!s?.activeRoot)return;let r=s.activeRoot,o=s.activeDropdown,n=s.placeholder,a=e(r),i=Yo(a);o&&(Ef(o),n?.parentNode?n.parentNode.insertBefore(o,n):r?.isConnected?r.appendChild(o):o.remove()),n?.parentNode?.removeChild(n),a.removeClass("yyt-open"),i?.attr("aria-expanded","false"),s.activeRoot=null,s.activeDropdown=null,s.placeholder=null,kf(s)}function Ca(t=null){let e=Bt(t);!e?.activeRoot||!e?.activeDropdown||Ea(e)}function zl(t){if(!U()||!t?.length)return;let s=t.first(),r=Yo(s),o=Ll(s);if(!r?.length||!o?.length||r.prop("disabled"))return;let n=Bt(s);if(n.activeRoot===s[0]){Ea(n);return}lt(s);let a=Af(s);if(!a)return;let i=o[0],l=n.targetDoc.createComment("yyt-select-dropdown-placeholder");i.parentNode?.insertBefore(l,i),a.appendChild(i),n.activeRoot=s[0],n.activeDropdown=i,n.placeholder=l,s.addClass("yyt-open"),r.attr("aria-expanded","true"),Cf(n),Ea(n)}function If(t,e){let s=U();if(!s||!e?.length)return null;let r=e.closest("[data-yyt-custom-select]");if(r.length)return r.first();let o=Bt(e);if(o.activeRoot&&o.activeDropdown?.contains?.(e[0])){let n=s(o.activeRoot);return t.has(o.activeRoot).length?n:null}return null}function qr(t){let e=Bt(t);t?.length&&e.activeRoot&&e.activeRoot!==t[0]||lt(t)}function Go(t){let e=Bt(t);if(t?.length&&e.activeRoot===t[0]){lt(t);return}zl(t)}function Aa(t,e,s=null){let r=U();if(!r||!e?.length)return;let o=s||Nl(t,e);if(!o?.length)return;let n=Array.isArray(o.data("yytCustomSelectOptions"))?o.data("yytCustomSelectOptions"):[],a=$l(n,o.val(),e.attr("data-yyt-select-placeholder")||""),i=String(a.value??""),l=String(a.label??""),c=o.is(":disabled");e.find(".yyt-select-value").text(l).attr("data-value",i).data("value",i);let d=Ll(e);(d?.length?d.find("[data-yyt-select-option]"):e.find("[data-yyt-select-option]")).each((y,f)=>{let x=r(f),h=String(x.attr("data-value")||"")===i;x.toggleClass("yyt-selected",h).attr("aria-selected",String(h))});let p=e.find("[data-yyt-select-trigger]").first();p.prop("disabled",c),c&&(qr(e),e.removeClass("yyt-open"),p.attr("aria-expanded","false"))}function Vo(t=[]){return Array.isArray(t)?t.map(e=>{if(e&&typeof e=="object"&&!Array.isArray(e)){let r=String(e.value??""),o=String(e.label??e.text??e.name??r);return{value:r,label:o,disabled:e.disabled===!0}}let s=String(e??"");return{value:s,label:s,disabled:!1}}):[]}function Jo(t={}){let{selectedValue:e="",options:s=[],placeholder:r="\u8BF7\u9009\u62E9",disabled:o=!1,includeNative:n=!0,nativeTag:a="input",nativeType:i="hidden",rootAttributes:l={},nativeAttributes:c={},triggerAttributes:d={},dropdownAttributes:u={},optionAttributes:p={},optionClass:y="",optionTextClass:f=""}=t,x=Vo(s),h=$l(x,e,r),C=o===!0||x.length===0,T=ur({...l,class:fs("yyt-custom-select",l.class),"data-yyt-custom-select":l["data-yyt-custom-select"]??"true","data-yyt-select-placeholder":r}),_=ur({type:"button",...d,class:fs("yyt-select-trigger",d.class),"data-yyt-select-trigger":d["data-yyt-select-trigger"]??"true","aria-haspopup":d["aria-haspopup"]??"listbox","aria-expanded":d["aria-expanded"]??"false",disabled:C?!0:d.disabled}),Y=ur({...u,class:fs("yyt-select-dropdown",u.class),"data-yyt-select-dropdown":u["data-yyt-select-dropdown"]??"true",role:u.role??"listbox"}),L=n?(()=>{let S={...c,class:fs(c.class),"data-yyt-select-native":c["data-yyt-select-native"]??"true",disabled:C?!0:c.disabled};return a==="select"?`<select ${ur(S)}>${x.map(q=>`
            <option value="${v(q.value)}" ${q.value===String(h.value??"")?"selected":""} ${q.disabled?"disabled":""}>${v(q.label)}</option>
          `).join("")}</select>`:`<input ${ur({type:i,value:h.value,...S})}>`})():"";return`
    <div ${T}>
      ${L}
      <button ${_}>
        <span class="${v(fs("yyt-select-value"))}" data-value="${v(h.value)}">${v(h.label)}</span>
        <i class="fa-solid fa-chevron-down yyt-select-arrow"></i>
      </button>
      <div ${Y}>
        ${x.map(S=>{let N=S.value===String(h.value??"");return`
            <button ${ur({type:"button",...p,class:fs("yyt-select-option",y,p.class,N?"yyt-selected":""),"data-yyt-select-option":p["data-yyt-select-option"]??"true","data-value":S.value,role:p.role??"option","aria-selected":N?"true":"false",disabled:S.disabled?!0:p.disabled})}>
              <span class="${v(fs("yyt-option-text",f))}">${v(S.label)}</span>
            </button>
          `}).join("")}
      </div>
    </div>
  `}function Ve(t,e="yytCustomSelect"){let s=U();if(!s||!X(t))return;let r=Dl(t),o=Bt(r);o.activeRoot&&t.has(o.activeRoot).length&&lt(r),t.off(`.${e}`),s(r).off(`click.${e}`),s(r).off(`mousedown.${e}`),t.find('[data-yyt-enhanced-select="true"]').remove(),t.find(".yyt-native-select-bridge").each((n,a)=>{let i=s(a),l=i.attr("data-yyt-original-style");l!==void 0&&l?i.attr("style",l):i.removeAttr("style"),i.removeClass("yyt-native-select-bridge").removeAttr("data-yyt-original-style").removeAttr("data-yyt-select-key").removeData("yytCustomSelectOptions")})}function bt(t,e={}){let s=U();if(!s||!X(t))return;let{namespace:r="yytCustomSelect",selectors:o=[]}=e,n=Array.isArray(o)?o.filter(Boolean):[o].filter(Boolean);if(n.length===0)return;Ve(t,r);let a=n.join(", "),i=Dl(t);t.find(a).each((l,c)=>{let d=s(c),u=String(d.attr("id")||"").trim(),p=u||`yyt-select-${Date.now()}-${l}`,y=u?`#${u}`:`[data-yyt-select-key="${p}"]`,f=`${p}-dropdown`,x=Tf(d.attr("class")),h=d.attr("style"),C=d.find("option").map((Y,L)=>{let S=s(L);return{value:String(S.attr("value")??S.val()??""),label:S.text(),disabled:S.is(":disabled")}}).get();d.attr("data-yyt-original-style",h??"").attr("data-yyt-select-key",p).addClass("yyt-native-select-bridge").css("display","none").data("yytCustomSelectOptions",C);let T=Jo({includeNative:!1,selectedValue:d.val(),options:C,disabled:d.is(":disabled"),placeholder:C[0]?.label||"\u8BF7\u9009\u62E9",rootAttributes:{class:fs(x),style:h||void 0,"data-yyt-enhanced-select":"true","data-yyt-select-target":y},triggerAttributes:{id:`${p}-trigger`,"aria-controls":f},dropdownAttributes:{id:f}});d.after(T);let _=Ml(t,d);Aa(t,_,d)}),t.on(`click.${r}`,"[data-yyt-select-trigger]",l=>{l.preventDefault(),l.stopPropagation();let c=s(l.currentTarget);if(c.prop("disabled"))return;let d=c.closest("[data-yyt-custom-select]");Go(d)}),t.on(`change.${r}`,a,l=>{let c=s(l.currentTarget),d=c.find("option").map((p,y)=>{let f=s(y);return{value:String(f.attr("value")??f.val()??""),label:f.text(),disabled:f.is(":disabled")}}).get();c.data("yytCustomSelectOptions",d);let u=Ml(t,c);Aa(t,u,c)}),s(i).off(`click.${r}`).on(`click.${r}`,l=>{if(Bl(l.target,i))return;let c=_f(t);c?.length&&(lt(i),c.filter(".yyt-open").removeClass("yyt-open").find("[data-yyt-select-trigger]").attr("aria-expanded","false"))}),s(i).off(`mousedown.${r}`,".yyt-select-portal-layer [data-yyt-select-option]").on(`mousedown.${r}`,".yyt-select-portal-layer [data-yyt-select-option]",l=>{l.preventDefault(),l.stopPropagation();let c=s(l.currentTarget);if(c.prop("disabled"))return;let d=If(t,c);if(!d?.length)return;let u=Nl(t,d);if(!u?.length)return;let p=String(c.attr("data-value")||"");u.val(p).trigger("change"),Aa(t,d,u),qr(d)})}function Yr(t,e=O){if(!U()||!X(t))return{url:"",apiKey:"",model:"",useMainApi:!0,stream:!1,max_tokens:4096,temperature:.7,top_p:.9};let r=t.find(`#${e}-model`).val()?.trim()||"",o=t.find(`#${e}-model-select`);return o.is(":visible")&&(r=o.val()||r),{url:t.find(`#${e}-api-url`).val()?.trim()||"",apiKey:t.find(`#${e}-api-key`).val()||"",model:r,useMainApi:t.find(`#${e}-use-main-api`).is(":checked"),stream:t.find(`#${e}-stream`).is(":checked"),max_tokens:parseInt(t.find(`#${e}-max-tokens`).val())||4096,temperature:parseFloat(t.find(`#${e}-temperature`).val())??.7,top_p:parseFloat(t.find(`#${e}-top-p`).val())??.9}}function Xo(t,e,s=O){if(!U()||!X(t)||!e)return;t.find(`#${s}-api-url`).val(e.url||""),t.find(`#${s}-api-key`).val(e.apiKey||""),t.find(`#${s}-model`).val(e.model||""),t.find(`#${s}-stream`).prop("checked",e.stream===!0),t.find(`#${s}-max-tokens`).val(e.max_tokens||4096),t.find(`#${s}-temperature`).val(e.temperature??.7),t.find(`#${s}-top-p`).val(e.top_p??.9);let o=e.useMainApi??!0;t.find(`#${s}-use-main-api`).prop("checked",o);let a=t.find(`#${s}-custom-api-fields`);o?a.addClass("yyt-disabled").find("input, button, select").prop("disabled",!0):a.removeClass("yyt-disabled").find("input, button, select").prop("disabled",!1),t.find(`#${s}-model`).show(),t.find(`#${s}-model-select`).hide()}function Gr(t){let{id:e,title:s,body:r,width:o="380px",wide:n=!1,dialogClass:a="",bodyClass:i="",footerClass:l=""}=t;return`
    <div class="yyt-dialog-overlay" id="${e}-overlay">
      <div class="yyt-dialog ${n?"yyt-dialog-wide":""} ${a}" style="${o!=="380px"?`width: ${o};`:""} max-height: calc(100vh - 32px);">
        <div class="yyt-dialog-header">
          <span class="yyt-dialog-title">${s}</span>
          <button class="yyt-dialog-close" id="${e}-close">
            <i class="fa-solid fa-times"></i>
          </button>
        </div>
        <div class="yyt-dialog-body ${i}" style="overflow-y: auto; overflow-x: hidden; max-height: calc(100vh - 160px);">
          ${r}
        </div>
        <div class="yyt-dialog-footer ${l}">
          <button class="yyt-btn yyt-btn-secondary" id="${e}-cancel">\u53D6\u6D88</button>
          <button class="yyt-btn yyt-btn-primary" id="${e}-save">\u4FDD\u5B58</button>
        </div>
      </div>
    </div>
  `}function Vr(t,e,s={}){if(!U())return()=>{};let o=t.find(`#${e}-overlay`),n=()=>{o.remove(),a?.removeEventListener("keydown",i),s.onClose&&s.onClose()};o.find(`#${e}-close, #${e}-cancel`).on("click",n),o.on("click",function(l){l.target===this&&n()}),o.find(`#${e}-save`).on("click",function(){s.onSave&&s.onSave(n)});let a=o[0]?.ownerDocument||document,i=l=>{l.key==="Escape"&&(l.stopPropagation(),n())};return a.addEventListener("keydown",i),n}function De(t,e,s={}){let{confirmText:r="\u786E\u5B9A",cancelText:o="\u53D6\u6D88",danger:n=!1,width:a="380px"}=s,i=U(),l=Lt();if(!i||!l?.body)return Promise.resolve(!1);let c=`yyt-confirm-${++Ul}`;return new Promise(d=>{let u=!1,p=h=>{u||(u=!0,x.remove(),y?.focus(),d(h))},y=l.activeElement,f=`
      <div class="yyt-dialog-overlay" id="${c}-overlay">
        <div class="yyt-dialog" style="${a!=="380px"?`width: ${a};`:""} max-height: calc(100vh - 32px);">
          <div class="yyt-dialog-header">
            <span class="yyt-dialog-title">${v(t)}</span>
            <button class="yyt-dialog-close" id="${c}-close">
              <i class="fa-solid fa-times"></i>
            </button>
          </div>
          <div class="yyt-dialog-body">
            <div style="color: var(--yyt-text-secondary); font-size: 13px; line-height: 1.6;">${v(e)}</div>
          </div>
          <div class="yyt-dialog-footer">
            <button class="yyt-btn yyt-btn-secondary" id="${c}-cancel">${v(o)}</button>
            <button class="yyt-btn ${n?"yyt-btn-danger":"yyt-btn-primary"}" id="${c}-confirm">${v(r)}</button>
          </div>
        </div>
      </div>`,x=i(f).appendTo(l.body);x.find(`#${c}-confirm`).on("click",()=>p(!0)),x.find(`#${c}-cancel, #${c}-close`).on("click",()=>p(!1)),x.on("click",function(h){h.target===this&&p(!1)}),x.on("keydown",h=>{h.key==="Escape"&&(h.stopPropagation(),p(!1)),h.key==="Enter"&&(h.stopPropagation(),p(!0))}),x.find(`#${c}-${n?"cancel":"confirm"}`).trigger("focus")})}function ka(t,e,s={}){let{defaultValue:r="",placeholder:o="",confirmText:n="\u786E\u5B9A",cancelText:a="\u53D6\u6D88",width:i="380px"}=s,l=U(),c=Lt();if(!l||!c?.body)return Promise.resolve(null);let d=`yyt-prompt-${++Ul}`;return new Promise(u=>{let p=!1,y=_=>{p||(p=!0,h.remove(),f?.focus(),u(_))},f=c.activeElement,x=`
      <div class="yyt-dialog-overlay" id="${d}-overlay">
        <div class="yyt-dialog" style="${i!=="380px"?`width: ${i};`:""} max-height: calc(100vh - 32px);">
          <div class="yyt-dialog-header">
            <span class="yyt-dialog-title">${v(t)}</span>
            <button class="yyt-dialog-close" id="${d}-close">
              <i class="fa-solid fa-times"></i>
            </button>
          </div>
          <div class="yyt-dialog-body">
            ${e?`<div style="color: var(--yyt-text-secondary); font-size: 13px; line-height: 1.6;">${v(e)}</div>`:""}
            <input class="yyt-input" id="${d}-input" type="text" value="${v(r)}" placeholder="${v(o)}" />
          </div>
          <div class="yyt-dialog-footer">
            <button class="yyt-btn yyt-btn-secondary" id="${d}-cancel">${v(a)}</button>
            <button class="yyt-btn yyt-btn-primary" id="${d}-confirm">${v(n)}</button>
          </div>
        </div>
      </div>`,h=l(x).appendTo(c.body),C=h.find(`#${d}-input`),T=()=>{let _=C.val().trim();y(_||null)};h.find(`#${d}-confirm`).on("click",T),h.find(`#${d}-cancel, #${d}-close`).on("click",()=>y(null)),h.on("click",function(_){_.target===this&&y(null)}),C.on("keydown",_=>{_.key==="Enter"&&(_.stopPropagation(),T())}),h.on("keydown",_=>{_.key==="Escape"&&(_.stopPropagation(),y(null))}),C.trigger("focus").trigger("select")})}function Mf(t,e,s){if(t.prop("disabled")&&t.data("yytLoading"))return Promise.resolve();let r=t.html(),o=t.outerWidth();if(t.prop("disabled",!0).data("yytLoading",!0),t.css("min-width",o+"px"),s)t.html(`<i class="fa-solid fa-spinner fa-spin" style="margin-right:4px"></i>${v(s)}`);else{let n=t.find("i.fa-solid, i.fa-regular").first();n.length?(n.data("yytOriginalClass",n.attr("class")),n.attr("class","fa-solid fa-spinner fa-spin")):t.html(`<i class="fa-solid fa-spinner fa-spin" style="margin-right:4px"></i>${r}`)}return Promise.resolve().then(()=>e()).finally(()=>{if(s)t.html(r);else{let n=t.find("i.fa-spinner"),a=n.data("yytOriginalClass");a?n.attr("class",a).removeData("yytOriginalClass"):t.html(r)}t.prop("disabled",!1).removeData("yytLoading").css("min-width","")})}function zt(t,e){let s=new Blob([t],{type:"application/json"}),r=URL.createObjectURL(s),o=document.createElement("a");o.href=r,o.download=e,o.click(),URL.revokeObjectURL(r)}function Vt(t){return new Promise((e,s)=>{let r=new FileReader;r.onload=o=>e(o.target.result),r.onerror=o=>s(new Error("\u6587\u4EF6\u8BFB\u53D6\u5931\u8D25")),r.readAsText(t)})}var vf,O,yr,Ls,Rl,Pl,Ul,Ne=R(()=>{J();vf=I.createScope("UIUtils"),O="youyou_toolkit",yr=class{constructor(e={}){this._state={...e}}get(e){return this._state[e]}set(e,s){return this._state[e]=s,this}reset(e={}){return this._state={...e},this}toJSON(){return{...this._state}}};Ls=null;Rl=new WeakMap,Pl="yyt-select-portal-layer";Ul=0});var pr,Jr,Ct,Ia=R(()=>{Me();Ne();J();pr=I.createScope("UIManager"),Jr=class{constructor(){this.components=new Map,this.activeInstances=new Map,this.dependencies={},this.currentTab="main",this.currentSubTab={},this.initialized=!1}init(e={}){this.initialized||(this.dependencies=e.services||{},this._subscribeEvents(),this.initialized=!0,P.emit(M.UI_INITIALIZED),pr.log("\u521D\u59CB\u5316\u5B8C\u6210"))}register(e,s){return!e||!s?(pr.warn("\u65E0\u6548\u7684\u7EC4\u4EF6\u6CE8\u518C"),!1):(this.components.set(e,{id:e,...s,render:s.render||(()=>""),bindEvents:s.bindEvents||(()=>{}),destroy:s.destroy||(()=>{}),getStyles:s.getStyles||(()=>"")}),!0)}unregister(e){this.destroyInstance(e),this.components.delete(e)}getComponent(e){return this.components.get(e)}render(e,s,r={}){let o=U();if(!o){pr.error("jQuery\u4E0D\u53EF\u7528");return}let n=this.components.get(e);if(!n){pr.error(`\u7EC4\u4EF6\u4E0D\u5B58\u5728: ${e}`);let i;typeof s=="string"?i=o(s):s&&s.jquery?i=s:s&&(i=o(s)),i?.length&&i.html(`<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u7EC4\u4EF6\u672A\u6CE8\u518C\uFF1A${e}</span></div>`);return}let a;if(typeof s=="string"?a=o(s):s&&s.jquery?a=s:s&&(a=o(s)),!X(a)){pr.warn("\u5BB9\u5668\u4E0D\u5B58\u5728");return}this.activeInstances.forEach((i,l)=>{i?.container?.length&&a.length&&i.container[0]===a[0]&&l!==e&&this.destroyInstance(l)}),this.destroyInstance(e);try{if(typeof n.renderTo=="function")n.renderTo(a,{...r,dependencies:this.dependencies});else{let i=n.render({...r,dependencies:this.dependencies});a.html(i),n.bindEvents(a,this.dependencies)}}catch(i){pr.error(`\u7EC4\u4EF6\u6E32\u67D3\u5931\u8D25: ${e}`,i),a.html(`<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u7EC4\u4EF6\u6E32\u67D3\u5931\u8D25\uFF1A${e}${i?.message?` - ${i.message}`:""}</span></div>`);return}this.activeInstances.set(e,{container:a,component:n,props:r}),P.emit(M.UI_RENDER_REQUESTED,{componentId:e})}destroyInstance(e){let s=this.activeInstances.get(e);s&&(s.component.destroy(s.container),this.activeInstances.delete(e))}destroyContainerInstance(e){let s=U();if(!s||!e)return;let r;if(typeof e=="string"?r=s(e):e?.jquery?r=e:r=s(e),!r?.length)return;let o=[];this.activeInstances.forEach((n,a)=>{n?.container?.length&&n.container[0]===r[0]&&o.push(a)}),o.forEach(n=>this.destroyInstance(n))}switchTab(e){let s=this.currentTab;this.currentTab=e,P.emit(M.UI_TAB_CHANGED,{tabId:e,oldTab:s})}getCurrentTab(){return this.currentTab}switchSubTab(e,s){this.currentSubTab[e]=s,P.emit(M.UI_SUBTAB_CHANGED,{mainTab:e,subTab:s})}getCurrentSubTab(e){return this.currentSubTab[e]||""}getAllStyles(){let e="";return this.components.forEach((s,r)=>{s.getStyles&&(e+=s.getStyles())}),e}injectStyles(e=document){let s="yyt-component-styles";if(e.getElementById(s))return;let r=e.createElement("style");r.id=s,r.textContent=this.getAllStyles(),(e.head||e.documentElement).appendChild(r)}setDependency(e,s){this.dependencies[e]=s}getDependency(e){return this.dependencies[e]}_subscribeEvents(){P.on(M.PRESET_UPDATED,()=>{}),P.on(M.TOOL_UPDATED,()=>{})}},Ct=new Jr});var Kl={};te(Kl,{ApiPresetPanel:()=>Fl,default:()=>Rf});function ht(t){return String(t||"").trim()}var jl,Fl,Rf,Wl=R(()=>{Me();Ne();Fr();Hr();jl={selectedPresetName:null},Fl={id:"apiPresetPanel",_getState(t){if(!t?.length)return new yr(jl);let e=t.data("yytPanelState");return e||(e=new yr(jl),t.data("yytPanelState",e)),e},_getSelectedPresetName(t){return this._getState(t).get("selectedPresetName")},_setSelectedPresetName(t,e){this._getState(t).set("selectedPresetName",e===null?null:ht(e))},_rerender(t){X(t)&&(lt(t),this.renderTo(t))},_removeDialog(t){t?.length&&t.find(`#${O}-dialog-overlay`).remove()},render(t={}){let e=wa(),s=e?.apiConfig||Yt(),r=ht(e?.presetName||qo()),o=Gt(),n=va(),a=t.selectedPresetName??null,l=n.slice(0,8),c=l.length>0?l.map(p=>this._renderPresetItem(p)).join(""):"",d=a===null?r||"":ht(a),u=d||"-- \u5F53\u524D\u914D\u7F6E --";return`
      <div class="yyt-api-manager">
          <!-- \u9884\u8BBE\u9009\u62E9\u533A -->
          <div class="yyt-flow-section">
            <div class="yyt-flow-heading">
              <span class="yyt-flow-heading-icon"><i class="fa-solid fa-bookmark"></i></span>
              <span>\u9884\u8BBE\u9009\u62E9</span>
            </div>
            
            <div class="yyt-preset-selector">
              <!-- \u81EA\u5B9A\u4E49\u4E0B\u62C9\u6846 -->
              <div class="yyt-custom-select" id="${O}-preset-dropdown">
                <div class="yyt-select-trigger">
                  <span class="yyt-select-value" data-value="${v(d)}">${v(u)}</span>
                  <i class="fa-solid fa-chevron-down yyt-select-arrow"></i>
                </div>
                <div class="yyt-select-dropdown">
                  <div class="yyt-select-option ${d?"":"yyt-selected"}" data-value="">
                    <span class="yyt-option-star yyt-placeholder"></span>
                    <span class="yyt-option-text">-- \u5F53\u524D\u914D\u7F6E --</span>
                    <span class="yyt-option-delete yyt-placeholder"></span>
                  </div>
                  ${o.length>0?o.map(p=>this._renderSelectOption(p,d)).join(""):""}
                </div>
              </div>
              <button class="yyt-btn yyt-btn-secondary" id="${O}-load-preset" title="\u52A0\u8F7D\u9009\u4E2D\u9884\u8BBE">
                <i class="fa-solid fa-download"></i> \u52A0\u8F7D
              </button>
            </div>
            
            ${c?`
            <div class="yyt-preset-list-compact">
              ${c}
            </div>
            `:""}
          </div>
          
          <!-- API\u914D\u7F6E\u533A -->
          <div class="yyt-flow-section">
            <div class="yyt-flow-heading">
              <span class="yyt-flow-heading-icon"><i class="fa-solid fa-sliders"></i></span>
              <span>API\u914D\u7F6E</span>
              <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="${O}-save-as-preset" style="margin-left: auto;">
                <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u4E3A\u9884\u8BBE
              </button>
            </div>
            
            ${this._renderApiConfigForm(s)}
          </div>
          
          <!-- \u5E95\u90E8\u64CD\u4F5C\u533A -->
          <div class="yyt-panel-footer">
            <div class="yyt-footer-left">
              <button class="yyt-btn yyt-btn-secondary" id="${O}-import-presets">
                <i class="fa-solid fa-file-import"></i> \u5BFC\u5165
              </button>
              <button class="yyt-btn yyt-btn-secondary" id="${O}-export-presets">
                <i class="fa-solid fa-file-export"></i> \u5BFC\u51FA
              </button>
              <input type="file" id="${O}-import-file" accept=".json" style="display:none">
            </div>
            <div class="yyt-footer-right">
              <button class="yyt-btn yyt-btn-secondary" id="${O}-reset-api-config">
                <i class="fa-solid fa-undo"></i> \u91CD\u7F6E
              </button>
              <button class="yyt-btn yyt-btn-primary" id="${O}-save-api-config">
                <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u914D\u7F6E
              </button>
            </div>
          </div>
      </div>
    `},_renderPresetItem(t){return`
      <div class="yyt-preset-item" data-preset-name="${v(t.name)}">
        <div class="yyt-preset-info">
          <div class="yyt-preset-name">${v(t.name)}</div>
          <div class="yyt-preset-meta">
            ${t.apiConfig.useMainApi?'<span class="yyt-badge yyt-badge-small">\u4E3BAPI</span>':`<span class="yyt-badge yyt-badge-small">${v(t.apiConfig.model||"\u672A\u8BBE\u7F6E")}</span>`}
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
    `},_renderSelectOption(t,e){let s=t.starred===!0,r=s?"yyt-option-star yyt-starred":"yyt-option-star",o=s?"\u2605":"\u2606";return`
      <div class="yyt-select-option ${t.name===e?"yyt-selected":""}" data-value="${v(t.name)}">
        <button class="${r}" data-preset="${v(t.name)}" title="${s?"\u70B9\u51FB\u53D6\u6D88\u661F\u6807":"\u70B9\u51FB\u6DFB\u52A0\u661F\u6807"}">${o}</button>
        <span class="yyt-option-text">${v(t.name)}</span>
        <button class="yyt-option-delete" data-action="delete" data-preset="${v(t.name)}" title="\u5220\u9664\u9884\u8BBE">
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
            <input type="checkbox" id="${O}-use-main-api" ${t.useMainApi?"checked":""}>
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
            <input type="checkbox" id="${O}-stream" ${t.stream===!0?"checked":""}>
            <span class="yyt-toggle-slider"></span>
          </label>
        </div>
      </div>

      <div id="${O}-custom-api-fields" class="${t.useMainApi?"yyt-disabled":""}">
        <div class="yyt-form-row">
          <div class="yyt-form-group yyt-flex-1">
            <label>API URL</label>
            <input type="text" class="yyt-input" id="${O}-api-url" 
                   value="${v(t.url||"")}" 
                   placeholder="https://api.openai.com/v1/chat/completions">
          </div>
        </div>
        
        <div class="yyt-form-row">
          <div class="yyt-form-group yyt-flex-1">
            <label>API Key</label>
            <div class="yyt-input-group">
              <input type="password" class="yyt-input" id="${O}-api-key" 
                     value="${v(t.apiKey||"")}" 
                     placeholder="sk-...">
              <button class="yyt-btn yyt-btn-icon" id="${O}-toggle-key-visibility" title="\u663E\u793A/\u9690\u85CF">
                <i class="fa-solid fa-eye"></i>
              </button>
            </div>
          </div>
        </div>
        
        <div class="yyt-form-row">
          <div class="yyt-form-group yyt-flex-1">
            <label>\u6A21\u578B</label>
            <div class="yyt-model-row">
              <input type="text" class="yyt-input yyt-model-input" id="${O}-model" 
                     value="${v(t.model||"")}" 
                     placeholder="gpt-4">
              <select class="yyt-select yyt-model-select" id="${O}-model-select" style="display: none;">
              </select>
              <button class="yyt-btn yyt-btn-secondary yyt-model-btn" id="${O}-load-models" title="\u83B7\u53D6\u6A21\u578B\u5217\u8868">
                <i class="fa-solid fa-sync-alt"></i>
              </button>
            </div>
          </div>
        </div>
        
        <div class="yyt-form-row yyt-form-row-2col">
          <div class="yyt-form-group">
            <label>Max Tokens</label>
            <input type="number" class="yyt-input" id="${O}-max-tokens" 
                   value="${t.max_tokens||4096}" min="1" max="128000">
          </div>
          
          <div class="yyt-form-group">
            <label>Temperature</label>
            <input type="number" class="yyt-input" id="${O}-temperature" 
                   value="${t.temperature??.7}" min="0" max="2" step="0.1">
          </div>
        </div>
        
        <div class="yyt-form-row">
          <div class="yyt-form-group yyt-flex-1">
            <label>Top P</label>
            <input type="number" class="yyt-input" id="${O}-top-p" 
                   value="${t.top_p??.9}" min="0" max="1" step="0.1">
          </div>
        </div>
      </div>
    `},bindEvents(t,e){let s=U();!s||!X(t)||(this._bindDropdownEvents(t,s),this._bindPresetListEvents(t,s),this._bindApiConfigEvents(t,s),this._bindFileEvents(t,s))},_bindDropdownEvents(t,e){let s=t.find(`#${O}-preset-dropdown`),r=s.find(".yyt-select-trigger"),o=s.find(".yyt-select-value"),n=()=>{let a=ht(o.data("value"));if(!a){this._setSelectedPresetName(t,""),Os(""),Xo(t,Yt(),O),t.find(".yyt-preset-item").removeClass("yyt-loaded"),s.find(".yyt-select-option").removeClass("yyt-selected"),s.find('.yyt-select-option[data-value=""]').addClass("yyt-selected"),k("info","\u5DF2\u5207\u6362\u5230\u5F53\u524DAPI\u914D\u7F6E");return}let i=Ns(a);if(!i){k("error",`\u9884\u8BBE "${a}" \u4E0D\u5B58\u5728`);return}this._setSelectedPresetName(t,a),Os(a),Xo(t,i.apiConfig,O),t.find(".yyt-preset-item").removeClass("yyt-loaded"),t.find(`.yyt-preset-item[data-preset-name="${a.replace(/"/g,"&quot;")}"]`).addClass("yyt-loaded"),s.find(".yyt-select-option").removeClass("yyt-selected"),s.find(`.yyt-select-option[data-value="${a.replace(/"/g,"&quot;")}"]`).addClass("yyt-selected")};r.on("click.yytApiPreset",a=>{a.preventDefault(),a.stopPropagation(),Go(s)}),s.find(".yyt-select-option").on("click.yytApiPreset",a=>{if(e(a.target).closest(".yyt-option-star, .yyt-option-delete").length)return;let i=e(a.currentTarget),l=ht(i.data("value")),c=i.find(".yyt-option-text").text(),d=i.closest(".yyt-select-dropdown").find(".yyt-select-option");this._setSelectedPresetName(t,l),o.text(c).data("value",l),d.removeClass("yyt-selected"),i.addClass("yyt-selected"),qr(s)}),t.find(`#${O}-load-preset`).on("click",()=>{n()}),s.find(".yyt-option-star").on("click.yytApiPreset",a=>{a.preventDefault(),a.stopPropagation();let i=ht(e(a.currentTarget).data("preset"));if(!i)return;let l=xa(i);l.success?(k("success",l.message),this._rerender(t)):k("error",l.message)}),s.find(".yyt-option-delete").on("click.yytApiPreset",async a=>{a.preventDefault(),a.stopPropagation();let i=ht(e(a.currentTarget).data("preset"));if(!i||!await De("\u5220\u9664\u9884\u8BBE",`\u786E\u5B9A\u8981\u5220\u9664\u9884\u8BBE "${i}" \u5417\uFF1F`,{danger:!0}))return;let l=Wr(i);k(l.success?"info":"error",l.message),l.success&&(P.emit(M.PRESET_DELETED,{name:i}),ht(this._getSelectedPresetName(t))===i&&this._setSelectedPresetName(t,""),ht(o.data("value"))===i&&o.text("-- \u5F53\u524D\u914D\u7F6E --").data("value",""),this._rerender(t))})},_bindPresetListEvents(t,e){t.find(".yyt-preset-item").on("click.yytApiPreset",async s=>{let r=e(s.currentTarget),o=ht(r.data("preset-name")),n=e(s.target).closest("[data-action]").data("action");if(n)switch(s.stopPropagation(),n){case"load":this._setSelectedPresetName(t,o),t.find(".yyt-select-value").text(o).data("value",o),t.find(".yyt-select-option").removeClass("yyt-selected"),t.find(`.yyt-select-option[data-value="${o.replace(/"/g,"&quot;")}"]`).addClass("yyt-selected"),t.find(`#${O}-load-preset`).trigger("click");break;case"delete":if(await De("\u5220\u9664\u9884\u8BBE",`\u786E\u5B9A\u8981\u5220\u9664\u9884\u8BBE "${o}" \u5417\uFF1F`,{danger:!0})){let a=Wr(o);k(a.success?"info":"error",a.message),a.success&&(P.emit(M.PRESET_DELETED,{name:o}),ht(this._getSelectedPresetName(t))===o&&this._setSelectedPresetName(t,""),this._rerender(t))}break}})},_bindApiConfigEvents(t,e){t.find(`#${O}-use-main-api`).on("change.yytApiPreset",function(){let s=e(this).is(":checked"),r=t.find(`#${O}-custom-api-fields`);s?r.addClass("yyt-disabled").find("input, button, select").prop("disabled",!0):r.removeClass("yyt-disabled").find("input, button, select").prop("disabled",!1)}),t.find(`#${O}-toggle-key-visibility`).on("click",function(){let s=t.find(`#${O}-api-key`),r=s.attr("type");s.attr("type",r==="password"?"text":"password"),e(this).find("i").toggleClass("fa-eye fa-eye-slash")}),t.find(`#${O}-load-models`).on("click",async()=>{let s=t.find(`#${O}-load-models`),r=t.find(`#${O}-model`),o=t.find(`#${O}-model-select`);s.prop("disabled",!0).find("i").addClass("fa-spin");try{let n=Yr(t,O),a=await ba(n);if(a.length>0){o.empty(),a.forEach(l=>{o.append(`<option value="${v(l)}">${v(l)}</option>`)}),r.hide(),o.show();let i=r.val();i&&a.includes(i)&&o.val(i),o.off("change.yytApiPreset").on("change.yytApiPreset",function(){r.val(e(this).val())}),k("success",`\u5DF2\u52A0\u8F7D ${a.length} \u4E2A\u6A21\u578B`)}else k("warning","\u672A\u80FD\u83B7\u53D6\u6A21\u578B\u5217\u8868\uFF0C\u8BF7\u624B\u52A8\u8F93\u5165")}catch(n){k("error",`\u52A0\u8F7D\u6A21\u578B\u5931\u8D25: ${n.message}`)}finally{s.prop("disabled",!1).find("i").removeClass("fa-spin")}}),t.find(`#${O}-model`).on("focus.yytApiPreset",function(){let s=t.find(`#${O}-model-select`);e(this).show(),s.hide()}),t.find(`#${O}-save-api-config`).on("click",async()=>{let s=Yr(t,O),r=ht(qo()),o=dr(s);if(!o.valid&&!s.useMainApi){k("error",o.errors.join(", "));return}if(r){if(!await De("\u8986\u76D6\u9884\u8BBE",`\u662F\u5426\u8981\u8986\u76D6\u9884\u8BBE "${r}" \u7684\u914D\u7F6E\uFF1F

\u70B9\u51FB"\u786E\u5B9A"\u8986\u76D6\u9884\u8BBE\uFF0C\u70B9\u51FB"\u53D6\u6D88"\u4EC5\u4FDD\u5B58\u5F53\u524D\u914D\u7F6E\u5E76\u5207\u6362\u5230"\u5F53\u524D\u914D\u7F6E"`)){cr(s),Os(""),this._setSelectedPresetName(t,""),k("success","API\u914D\u7F6E\u5DF2\u4FDD\u5B58\uFF0C\u5E76\u5DF2\u5207\u6362\u5230\u5F53\u524DAPI\u914D\u7F6E"),this._rerender(t);return}cr(s);let n=ha(r,{apiConfig:s});n.success?(this._setSelectedPresetName(t,r),k("success",`\u914D\u7F6E\u5DF2\u4FDD\u5B58\u5E76\u8986\u76D6\u9884\u8BBE "${r}"`),Os(r),P.emit(M.PRESET_UPDATED,{name:r}),this._rerender(t)):k("error",n.message);return}cr(s),k("success","API\u914D\u7F6E\u5DF2\u4FDD\u5B58")}),t.find(`#${O}-reset-api-config`).on("click",async()=>{await De("\u91CD\u7F6E\u914D\u7F6E","\u786E\u5B9A\u8981\u91CD\u7F6EAPI\u914D\u7F6E\u5417\uFF1F",{danger:!0})&&(Os(""),this._setSelectedPresetName(t,""),cr({url:"",apiKey:"",model:"",useMainApi:!0,stream:!1,max_tokens:4096,temperature:.7,top_p:.9}),this._rerender(t),k("info","API\u914D\u7F6E\u5DF2\u91CD\u7F6E"))}),t.find(`#${O}-save-as-preset`).on("click",()=>{this._showSavePresetDialog(t,e)})},_bindFileEvents(t,e){t.find(`#${O}-export-presets`).on("click",()=>{try{let s=Sa();zt(s,`youyou_toolkit_presets_${Date.now()}.json`),k("success","\u9884\u8BBE\u5DF2\u5BFC\u51FA")}catch(s){k("error",`\u5BFC\u51FA\u5931\u8D25: ${s.message}`)}}),t.find(`#${O}-import-presets`).on("click",()=>{t.find(`#${O}-import-file`).click()}),t.find(`#${O}-import-file`).on("change",async s=>{let r=s.target.files[0];if(r){try{let o=await Vt(r),n=Ta(o,{overwrite:!0});k(n.success?"success":"error",n.message),n.imported>0&&this._rerender(t)}catch(o){k("error",`\u5BFC\u5165\u5931\u8D25: ${o.message}`)}e(s.target).val("")}})},_showSavePresetDialog(t,e){let r=Gt().map(d=>d.name),o=_a("\u65B0\u9884\u8BBE"),n=`
      <div class="yyt-dialog-overlay" id="${O}-dialog-overlay">
        <div class="yyt-dialog">
          <div class="yyt-dialog-header">
            <span class="yyt-dialog-title">\u4FDD\u5B58\u4E3A\u65B0\u9884\u8BBE</span>
            <button class="yyt-dialog-close" id="${O}-dialog-close">
              <i class="fa-solid fa-times"></i>
            </button>
          </div>
          <div class="yyt-dialog-body">
            <div class="yyt-form-group">
              <label>\u9884\u8BBE\u540D\u79F0</label>
              <input type="text" class="yyt-input" id="${O}-dialog-preset-name"
                     value="${v(o)}" placeholder="\u8F93\u5165\u9884\u8BBE\u540D\u79F0">
            </div>
            <div class="yyt-form-group">
              <label>\u63CF\u8FF0\uFF08\u53EF\u9009\uFF09</label>
              <textarea class="yyt-textarea" id="${O}-dialog-preset-desc" rows="2"
                        placeholder="\u9884\u8BBE\u63CF\u8FF0..."></textarea>
            </div>
          </div>
          <div class="yyt-dialog-footer">
            <button class="yyt-btn yyt-btn-secondary" id="${O}-dialog-cancel">\u53D6\u6D88</button>
            <button class="yyt-btn yyt-btn-primary" id="${O}-dialog-save">\u4FDD\u5B58</button>
          </div>
        </div>
      </div>
    `;this._removeDialog(t),t.append(n);let a=t.find(`#${O}-dialog-overlay`),i=a.find(`#${O}-dialog-preset-name`),l=a.find(`#${O}-dialog-preset-desc`);i.focus().select();let c=()=>a.remove();a.find(`#${O}-dialog-close, #${O}-dialog-cancel`).on("click",c),a.on("click",function(d){d.target===this&&c()}),a.find(`#${O}-dialog-save`).on("click",async()=>{let d=i.val().trim(),u=l.val().trim();if(!d){k("warning","\u8BF7\u8F93\u5165\u9884\u8BBE\u540D\u79F0"),i.focus();return}if(r.includes(d)){if(!await De("\u8986\u76D6\u9884\u8BBE",`\u9884\u8BBE "${d}" \u5DF2\u5B58\u5728\uFF0C\u662F\u5426\u8986\u76D6\uFF1F`))return;Wr(d),P.emit(M.PRESET_DELETED,{name:d})}let p=Yr(t,O),y=Ho({name:d,description:u,apiConfig:p});y.success?(k("success",y.message),this._setSelectedPresetName(t,d),c(),P.emit(M.PRESET_CREATED,{preset:y.preset}),this._rerender(t)):k("error",y.message)}),i.on("keypress.yytApiPreset",function(d){d.which===13&&a.find(`#${O}-dialog-save`).click()})},destroy(t){!U()||!X(t)||(this._removeDialog(t),lt(t),t.removeData("yytPanelState"),t.off(".yytApiPreset"))},getStyles(){return`
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
    `},renderTo(t){let e=this.render({selectedPresetName:this._getSelectedPresetName(t)});t.html(e),this.bindEvents(t,{})}},Rf=Fl});function m(t,e={},...s){let r=document.createElement(t);if(e.className&&(r.className=e.className),e.text!==void 0&&e.text!==null&&(r.textContent=String(e.text)),e.html!==void 0&&e.html!==null&&(r.innerHTML=String(e.html)),e.attrs)for(let[o,n]of Object.entries(e.attrs))n==null||n===!1||r.setAttribute(o,n===!0?"":String(n));if(e.style&&Object.assign(r.style,e.style),e.dataset)for(let[o,n]of Object.entries(e.dataset))r.dataset[o]=String(n);for(let o of s)xt(r,o);return r}function xt(t,e){if(!(e==null||e===!1)){if(Array.isArray(e)){for(let s of e)xt(t,s);return}if(typeof e=="string"||typeof e=="number"){t.appendChild(document.createTextNode(String(e)));return}if(e instanceof Node){t.appendChild(e);return}if(e&&e.el instanceof Node){t.appendChild(e.el);return}}}function Hl(){let t=new Map;return{on(e,s){return!e||typeof s!="function"?()=>{}:(t.has(e)||t.set(e,new Set),t.get(e).add(s),()=>this.off(e,s))},off(e,s){let r=t.get(e);r&&r.delete(s)},emit(e,...s){let r=t.get(e);if(r)for(let o of[...r])try{o(...s)}catch{}},clear(){t.clear()}}}function Ma(t,e){if(!t||!e)return null;if(t._id===e)return t;let s=t._children;if(!s)return null;let r=s instanceof Map?[...s.values()]:Array.isArray(s)?s:[];for(let o of r){let n=Ma(o,e);if(n)return n}return null}function Ue({id:t=null,kind:e="control"}={}){let s=Hl();return{_id:t||null,_kind:e,_children:null,_emitter:s,on(r,o){return s.on(r,o)},off(r,o){s.off(r,o)},getControl(r){return Ma(this,r)},get(){},set(r){},destroy(){if(s.clear(),this._children){let r=this._children instanceof Map?[...this._children.values()]:Array.isArray(this._children)?this._children:[];for(let o of r)try{o?.destroy?.()}catch{}this._children instanceof Map?this._children.clear():Array.isArray(this._children)&&(this._children.length=0)}if(this.el?.parentNode)try{this.el.parentNode.removeChild(this.el)}catch{}}}}var kt=R(()=>{});function se(t={}){let{id:e=null,label:s="",icon:r=null,variant:o="default",size:n="normal",disabled:a=!1,title:i=null,onClick:l=null}=t,c=["yyt-btn"];o==="primary"?c.push("yyt-btn-primary"):o==="danger"?c.push("yyt-btn-danger"):o==="ghost"&&c.push("yyt-btn-secondary"),n==="small"&&c.push("yyt-btn-small");let d=m("button",{className:c.join(" "),attrs:{type:"button",disabled:a?"disabled":null,title:i}}),u=null;r&&(u=m("span",{className:"yyt-btn-icon-glyph",text:r}),d.appendChild(u));let p=m("span",{text:s});d.appendChild(p);let y={...Ue({id:e,kind:"button"}),el:d,setLabel(f){p.textContent=String(f||"")},setIcon(f){u&&(u.textContent=String(f||""))},setDisabled(f){f?d.setAttribute("disabled","disabled"):d.removeAttribute("disabled")},isDisabled(){return d.hasAttribute("disabled")},get(){return p.textContent},set(f){this.setLabel(f)}};return d.addEventListener("click",f=>{if(!d.hasAttribute("disabled")){if(typeof l=="function")try{l(f,y)}catch{}y._emitter.emit("click",f)}}),y}var ql=R(()=>{kt()});function Jt(t={}){let{id:e=null,placeholder:s="",value:r="",type:o="text",disabled:n=!1,maxLength:a=null,onInput:i=null,onChange:l=null}=t,c=m("input",{className:"yyt-input",attrs:{type:o,placeholder:s,disabled:n?"disabled":null,maxlength:a!=null?String(a):null}});c.value=r==null?"":String(r);let d={...Ue({id:e,kind:"textInput"}),el:c,get(){return c.value},set(u,{silent:p=!1}={}){c.value=u==null?"":String(u),p||d._emitter.emit("change",c.value)},setPlaceholder(u){c.placeholder=u==null?"":String(u)},setDisabled(u){c.disabled=!!u},focus(){c.focus()},select(){c.select()}};return c.addEventListener("input",()=>{if(typeof i=="function")try{i(c.value,d)}catch{}d._emitter.emit("input",c.value)}),c.addEventListener("change",()=>{if(typeof l=="function")try{l(c.value,d)}catch{}d._emitter.emit("change",c.value)}),c.addEventListener("blur",()=>d._emitter.emit("blur",c.value)),d}var Yl=R(()=>{kt()});function Je(t={}){let{id:e=null,options:s=[],value:r="",placeholder:o=null,disabled:n=!1,onChange:a=null}=t,i=m("select",{className:"yyt-select",attrs:{disabled:n?"disabled":null}});function l(d,u){if(i.innerHTML="",o!==null){let p=m("option",{text:o,attrs:{value:"",disabled:"disabled",selected:u?null:"selected"}});i.appendChild(p)}for(let p of d){let y=m("option",{text:p.label??String(p.value),attrs:{value:String(p.value),selected:String(p.value)===String(u)?"selected":null,disabled:p.disabled?"disabled":null}});i.appendChild(y)}}l(s,r);let c={...Ue({id:e,kind:"select"}),el:i,get(){return i.value},set(d,{silent:u=!1}={}){i.value=d==null?"":String(d),u||c._emitter.emit("change",i.value)},setOptions(d,u){l(d||[],u??i.value)},setDisabled(d){i.disabled=!!d}};return i.addEventListener("change",()=>{if(typeof a=="function")try{a(i.value,c)}catch{}c._emitter.emit("change",i.value)}),c}var Gl=R(()=>{kt()});function Xt(t={}){let{id:e=null,label:s="",hint:r="",checked:o=!1,disabled:n=!1,onChange:a=null}=t,i=m("label",{className:"yyt-toggle-label"});s&&i.appendChild(m("span",{text:s})),r&&i.appendChild(m("span",{className:"yyt-toggle-hint",text:r}));let l=m("input",{attrs:{type:"checkbox",disabled:n?"disabled":null}});l.checked=!!o;let c=m("span",{className:"yyt-toggle-slider"}),d=m("label",{className:"yyt-toggle"});d.appendChild(l),d.appendChild(c);let u=m("div",{className:"yyt-toggle-row"});u.appendChild(i),u.appendChild(d),i.addEventListener("click",y=>{y.preventDefault(),!l.disabled&&(l.checked=!l.checked,l.dispatchEvent(new Event("change",{bubbles:!0})))});let p={...Ue({id:e,kind:"toggle"}),el:u,get(){return!!l.checked},set(y,{silent:f=!1}={}){l.checked=!!y,f||p._emitter.emit("change",!!y)},setDisabled(y){l.disabled=!!y}};return l.addEventListener("change",()=>{let y=!!l.checked;if(typeof a=="function")try{a(y,p)}catch{}p._emitter.emit("change",y)}),p}var Vl=R(()=>{kt()});var Jl=R(()=>{kt()});var Xl=R(()=>{kt()});function gs(t={}){let{id:e=null,label:s="",hint:r="",control:o=null,inline:n=!1}=t,a=m("div",{className:"yyt-form-group",style:n?{flexDirection:"row",alignItems:"center",gap:"12px"}:null});s&&a.appendChild(m("label",{text:s,style:n?{flex:"0 0 auto",minWidth:"120px"}:null}));let i=m("div",{style:n?{flex:"1",minWidth:"0"}:null});o&&xt(i,o),a.appendChild(i),r&&a.appendChild(m("div",{className:"yyt-form-hint",text:r}));let l=o?[o]:[];return{...Ue({id:e,kind:"formRow"}),el:a,_children:l,get(){return o?.get?.()},set(c,d){o?.set?.(c,d)},setControl(c){i.innerHTML="",l.length=0,c&&(xt(i,c),l.push(c))}}}var Ql=R(()=>{kt()});function Bs(t={}){let{id:e=null,icon:s=null,name:r="",desc:o="",active:n=!1,disabled:a=!1,actions:i=[],onClick:l=null}=t,c=["yyt-list-row"];n&&c.push("yyt-list-row-active"),a&&c.push("yyt-list-row-disabled");let d=m("div",{className:c.join(" "),style:a?{opacity:"0.5",pointerEvents:"none"}:null});s&&d.appendChild(m("div",{className:"yyt-list-row-icon",text:s}));let u=m("div",{className:"yyt-list-row-main"}),p=m("div",{className:"yyt-list-row-name",text:r});u.appendChild(p);let y=null;o&&(y=m("div",{className:"yyt-list-row-desc",text:o}),u.appendChild(y)),d.appendChild(u);let f=null;if(i&&i.length){f=m("div",{className:"yyt-list-row-actions"});for(let h of i)xt(f,h);d.appendChild(f)}typeof l=="function"&&(d.style.cursor="pointer",d.addEventListener("click",h=>{h.target.closest(".yyt-list-row-actions")||(l(h,x),x._emitter.emit("click",h))}));let x={...Ue({id:e,kind:"listRow"}),el:d,_children:i||[],setName(h){p.textContent=h==null?"":String(h)},setDesc(h){if(y)y.textContent=h==null?"":String(h);else{if(!h)return;y=m("div",{className:"yyt-list-row-desc",text:h}),u.appendChild(y)}},setActive(h){h?d.classList.add("yyt-list-row-active"):d.classList.remove("yyt-list-row-active")},setDisabled(h){h?(d.classList.add("yyt-list-row-disabled"),d.style.opacity="0.5",d.style.pointerEvents="none"):(d.classList.remove("yyt-list-row-disabled"),d.style.opacity="",d.style.pointerEvents="")}};return x}var Zl=R(()=>{kt()});function je(t={}){let{id:e=null,heading:s="",icon:r=null,actions:o=[],content:n=[]}=t,a=m("div",{className:"yyt-flow-section"}),i=null,l=null,c=null;if(s||r||o&&o.length){if(i=m("div",{className:"yyt-flow-heading"}),r&&(l=m("span",{className:"yyt-flow-heading-icon",text:r}),i.appendChild(l)),s&&i.appendChild(m("span",{text:s})),o&&o.length){c=m("div",{className:"yyt-flow-heading-action"});for(let y of o)xt(c,y);i.appendChild(c)}a.appendChild(i)}let d=m("div",{className:"yyt-flow-content"}),u=[];for(let y of n||[])y&&(xt(d,y),u.push(y));for(let y of o||[])y&&typeof y=="object"&&y.el&&u.push(y);return a.appendChild(d),{...Ue({id:e,kind:"flowSection"}),el:a,_children:u,appendContent(y){y&&(xt(d,y),y&&typeof y=="object"&&y.el&&u.push(y))},clearContent(){d.innerHTML="";let y=u.filter(f=>(o||[]).includes(f));u.length=0;for(let f of y)u.push(f)},setHeading(y){if(!i)return;let f=i.querySelector("span:not(.yyt-flow-heading-icon):not(.yyt-flow-heading-action)");f&&(f.textContent=y==null?"":String(y))},setIcon(y){l&&(l.textContent=y==null?"":String(y))}}}var ec=R(()=>{kt()});var Xr=R(()=>{ql();Yl();Gl();Vl();Jl();Xl();Ql();Zl();ec();kt()});function Pa(){return`wb_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`}function ms(){let t=$e.get(Ra);return!t||typeof t!="object"?{}:t}function Zo(t){$e.set(Ra,t)}function fr(t={}){let e=String(t.id||Pa()),s=Array.isArray(t.bookList)?t.bookList.map(r=>({bookName:String(r?.bookName||""),enabled:r?.enabled!==!1,entryOverrides:r?.entryOverrides&&typeof r.entryOverrides=="object"?r.entryOverrides:{}})).filter(r=>r.bookName):[];return{id:e,name:String(t.name||"").trim()||"\u672A\u547D\u540D\u9884\u8BBE",description:String(t.description||""),bindingMode:t.bindingMode===Qt.CUSTOM?Qt.CUSTOM:Qt.CHARACTER_CARD,includeDisabled:t.includeDisabled===!0,bookList:s,createdAt:Number.isFinite(t.createdAt)?t.createdAt:Date.now(),updatedAt:Number.isFinite(t.updatedAt)?t.updatedAt:Date.now()}}function Pf(){let t=ms();return Object.values(t).map(fr).sort((e,s)=>s.updatedAt-e.updatedAt)}function $a(t){if(!t)return null;let e=ms();return e[t]?fr(e[t]):null}function Da(){let t=$e.get(Qo);return typeof t=="string"&&t?t:""}function $f(){let t=Da();return t?$a(t):null}function Df(t){let e=ms();return t&&!e[t]?(Qr.warn(`setCurrentPresetId \u627E\u4E0D\u5230\u9884\u8BBE: ${t}`),!1):($e.set(Qo,t||""),P.emit(M.PRESET_ACTIVATED,{kind:"worldbook",id:t}),!0)}function tc(t={}){let e=fr({...t,id:Pa(),createdAt:Date.now(),updatedAt:Date.now()}),s=ms();return s[e.id]=e,Zo(s),P.emit(M.PRESET_CREATED,{kind:"worldbook",id:e.id}),Qr.info(`\u521B\u5EFA\u9884\u8BBE: ${e.id} (${e.name})`),e}function sc(t,e={}){if(!t)return null;let s=ms(),r=s[t];if(!r)return Qr.warn(`updatePreset \u627E\u4E0D\u5230\u9884\u8BBE: ${t}`),null;let o=fr({...r,...e,id:t,createdAt:r.createdAt,updatedAt:Date.now()});return s[t]=o,Zo(s),P.emit(M.PRESET_UPDATED,{kind:"worldbook",id:t}),o}function Nf(t){if(!t)return!1;let e=ms();return e[t]?(delete e[t],Zo(e),Da()===t&&$e.set(Qo,""),P.emit(M.PRESET_DELETED,{kind:"worldbook",id:t}),Qr.info(`\u5220\u9664\u9884\u8BBE: ${t}`),!0):!1}function Of(t,{nameSuffix:e=" \u526F\u672C"}={}){let s=$a(t);return s?tc({...s,name:`${s.name}${e}`}):null}function Lf(t,e){return sc(t,{name:String(e||"").trim()||"\u672A\u547D\u540D\u9884\u8BBE"})}function Bf(){return{version:1,exportedAt:Date.now(),presets:Object.values(ms()).map(fr)}}function zf(t){if(!t||typeof t!="object")return{added:0,skipped:0};let e=Array.isArray(t.presets)?t.presets:[],s=ms(),r=0,o=0;for(let n of e){let a=fr({...n,id:Pa(),createdAt:Date.now(),updatedAt:Date.now()});s[a.id]=a,r+=1}return Zo(s),r>0&&P.emit(M.PRESET_IMPORTED,{kind:"worldbook",count:r}),{added:r,skipped:o}}function Uf(){$e.set(Ra,{}),$e.set(Qo,""),Qr.info("\u5DF2\u6E05\u7A7A\u6240\u6709\u4E16\u754C\u4E66\u9884\u8BBE")}var Qr,Ra,Qo,Qt,be,Na=R(()=>{We();Me();J();Qr=I.createScope("WorldbookPresetStore"),Ra="worldbook_presets",Qo="worldbook_current_preset",Qt=Object.freeze({CHARACTER_CARD:"character_card",CUSTOM:"custom"});be={listPresets:Pf,getPreset:$a,getCurrentPresetId:Da,getCurrentPreset:$f,setCurrentPresetId:Df,createPreset:tc,updatePreset:sc,deletePreset:Nf,duplicatePreset:Of,renamePreset:Lf,exportAll:Bf,importPresets:zf,resetAll:Uf,BINDING_MODES:Qt}});function bs(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window}function en(){return bs()?.SillyTavern||null}function me(t){return t==null?"":String(t).trim()}function Ff(t){if(!t)return"";let e=[t.content,t.mes,t.message,t.text,t?.data?.content];for(let s of e)if(typeof s=="string"&&s.trim())return s.trim();return""}function Kf(t){let e=String(t?.role||"").trim().toLowerCase();return e==="assistant"||e==="ai"?"assistant":e==="system"?"system":e==="user"||t?.is_user===!0?"user":t?.is_system===!0?"system":"assistant"}function rc(t=""){let e=String(t||"").trim();if(!e)return"empty";let s=0;for(let r=0;r<e.length;r+=1)s=(s<<5)-s+e.charCodeAt(r),s|=0;return`fp_${Math.abs(s).toString(36)}`}function oc(t={}){let e=me(t.chatId)||"chat_default",s=me(t.messageId)||"latest";return`${e}::${s}`}function nc(t={}){let e=oc(t),s=me(t.effectiveSwipeId)||"swipe:current",r=me(t.assistantContentFingerprint)||"empty";return`${e}::${s}::${r}`}function Wf(t={}){let e=nc(t),s=me(t.eventType)||"MANUAL",r=me(t.traceId)||ac("manual");return`${e}::${s}::${r}`}function ac(t="trace"){return`${t}_${Date.now()}_${Math.random().toString(36).slice(2,8)}`}function ic(){let t=en();try{let e=t?.getContext?.()||null;if(Array.isArray(e?.chat))return e.chat}catch{}return Array.isArray(t?.chat)?t.chat:[]}function lc(t=[]){let e=[],s=null,r=null;return t.forEach((o,n)=>{let a=Kf(o),i=Ff(o);if(!i)return;let l=me(o?.messageId??o?.message_id??o?.id??o?.mid??o?.mesid??o?.chat_index??n),c=me(o?.swipe_id??o?.swipeId??o?.swipe??""),d={role:a,content:i,sourceId:l,swipeId:c,raw:o,index:n};e.push(d),a==="user"&&(s=d),a==="assistant"&&(r=d)}),{messages:e,lastUserMessage:s,lastAiMessage:r}}function Hf(t,e,s){return me(e?.chatId??e?.chat_id??t?.chatId??t?.chat_id??t?.this_chid??s?.id??"chat_default")||"chat_default"}async function Oa(){let t=en();if(!t)return null;try{let e=t.this_chid,s=t.characters||[];if(e>=0&&e<s.length){let r=s[e];return{id:e,name:r?.name||"",description:r?.description||"",personality:r?.personality||"",scenario:r?.scenario||"",firstMes:r?.first_mes||"",mesExample:r?.mes_example||""}}}catch(e){jf.error("\u83B7\u53D6\u89D2\u8272\u4FE1\u606F\u5931\u8D25:",e)}return null}function qf(t="",e=null){let s=String(t||""),r=e?.YouYouToolkit_toolOutputs;return r&&typeof r=="object"&&Object.values(r).forEach(o=>{let n=String(o?.blockText||o?.content||"").trim();n&&s.includes(n)&&(s=s.replace(n,"").trimEnd())}),s.trim()}function Yf(t,e={}){let s=Array.isArray(t?.messages)?t.messages:[],r=me(e.messageId),o=me(e.swipeId);if(!r)return t?.lastAiMessage||null;let n=s.filter(i=>i.role==="assistant"),a=n.find(i=>i.sourceId!==r?!1:o?me(i.swipeId)===o:!0);return a||n.find(i=>i.sourceId===r)||null}function cc({api:t,stContext:e,character:s,conversation:r,targetAssistantMessage:o,runSource:n="MANUAL"}={}){let a=r?.messages||[],i=r?.lastUserMessage||null,l=me(o?.sourceId)||"",c=me(o?.swipeId)||"swipe:current",d=o?.content||"",u=qf(d,o?.raw||null),p=rc(d),y=rc(u),f=Hf(t,e,s),x=ac(String(n||"manual").toLowerCase()),h=oc({chatId:f,messageId:l}),C=nc({chatId:f,messageId:l,effectiveSwipeId:c,assistantContentFingerprint:y});return{startedAt:Date.now(),runSource:n,traceId:x,chatId:f,messageId:l,confirmedAssistantMessageId:l,slotBindingKey:h,slotRevisionKey:C,slotTransactionId:Wf({chatId:f,messageId:l,effectiveSwipeId:c,assistantContentFingerprint:y,eventType:n,traceId:x}),executionKey:C,lastAiMessage:d,assistantContentFingerprint:p,assistantBaseText:u,assistantBaseFingerprint:y,lastAiMessageSwipeId:c,confirmedAssistantSwipeId:c,effectiveSwipeId:c,sourceMessageId:l,sourceSwipeId:c,lastUserMessage:i?.content||"",userMessage:i?.content||"",targetAssistantMessage:o,chatMessages:a,characterCard:s,chatHistory:a,input:{userMessage:i?.content||"",lastAiMessage:d,assistantBaseText:u,extractedContent:"",previousToolOutput:"",context:{character:s?.name||"",chatLength:a.length||0}},config:{},status:"pending"}}async function zs({runSource:t="MANUAL"}={}){let e=en(),s=e?.getContext?.()||null,r=await Oa(),o=ic(),n=lc(o),a=n?.lastAiMessage||null;return cc({api:e,stContext:s,character:r,conversation:n,targetAssistantMessage:a,runSource:t})}async function Us({messageId:t,swipeId:e="",runSource:s="AUTO"}={}){let r=en(),o=r?.getContext?.()||null,n=await Oa(),a=ic(),i=lc(a),l=Yf(i,{messageId:t,swipeId:e});return cc({api:r,stContext:o,character:n,conversation:i,targetAssistantMessage:l,runSource:s})}var jf,js=R(()=>{J();jf=I.createScope("ExecutionContext")});var yc={};te(yc,{buildSelectedWorldbookContent:()=>gr,default:()=>Qf,getAvailableWorldbooks:()=>so,getCachedAvailableWorldbooks:()=>to,getLastWorldbookDiagnostics:()=>uc});function dc(){try{if(typeof TavernHelper<"u"&&TavernHelper)return TavernHelper}catch{}return bs()?.TavernHelper||null}function Gf(){try{if(typeof SillyTavern<"u"&&SillyTavern)return SillyTavern}catch{}return bs()?.SillyTavern||null}function eo(t){return Array.isArray(t)?Array.from(new Set(t.map(e=>String(e||"").trim()).filter(Boolean))):[]}function La(t){if(Array.isArray(t))return t.map(e=>typeof e=="string"?e:e&&typeof e=="object"?e.name||e.id||e.title||JSON.stringify(e):String(e??""));if(t&&typeof t=="object"){let e={};return Object.keys(t).forEach(s=>{let r=t[s];Array.isArray(r)?e[s]=r.map(o=>typeof o=="string"?o:o&&typeof o=="object"?o.name||o.id||o.title||"[object]":String(o??"")):r&&typeof r=="object"?e[s]="[object]":e[s]=r}),e}return t}function Vf(t={}){let e=typeof t.content=="string"?t.content.trim():"";if(!e)return"";let s=[t.comment,t.key,t.keysecondary,t.text].map(r=>String(r||"").trim()).find(Boolean);return s&&s!==e?`## ${s}
${e}`:e}function to(){return Array.isArray(Ba)?[...Ba]:[]}function uc(){return za?{...za}:null}async function Jf(t){if(!t||typeof t.getCharLorebooks!="function")return[];try{let e=await Promise.resolve(t.getCharLorebooks({type:"all"}));return eo([e?.primary,e?.secondary,...Array.isArray(e?.additional)?e.additional:[]])}catch(e){return Zr.warn("\u83B7\u53D6\u89D2\u8272\u7ED1\u5B9A\u4E16\u754C\u4E66\u5931\u8D25:",e),[]}}async function Xf(t,e){if(t&&typeof t.getLorebooks=="function")try{let s=eo(await Promise.resolve(t.getLorebooks()));if(s.length>0)return s}catch(s){Zr.warn("\u83B7\u53D6\u5168\u90E8\u4E16\u754C\u4E66\u5217\u8868\u5931\u8D25:",s)}if(e&&typeof e.getWorldBooks=="function")try{let s=await Promise.resolve(e.getWorldBooks()),r=eo(Array.isArray(s)?s.map(o=>o?.name??o):[]);if(r.length>0)return r}catch(s){Zr.warn("\u4ECE SillyTavern \u83B7\u53D6\u4E16\u754C\u4E66\u5217\u8868\u5931\u8D25:",s)}return[]}async function so(){let t=dc(),e=Gf(),s={checkedAt:Date.now(),hasGlobalTavernHelper:(()=>{try{return typeof TavernHelper<"u"&&!!TavernHelper}catch{return!1}})(),hasParentTavernHelper:!!bs()?.TavernHelper,hasGlobalSillyTavern:(()=>{try{return typeof SillyTavern<"u"&&!!SillyTavern}catch{return!1}})(),hasParentSillyTavern:!!bs()?.SillyTavern,helperKeys:t?Object.keys(t).sort():[],stKeys:e?Object.keys(e).sort():[],getLorebooksType:typeof t?.getLorebooks,getCharLorebooksType:typeof t?.getCharLorebooks,getLorebookEntriesType:typeof t?.getLorebookEntries,getWorldBooksType:typeof e?.getWorldBooks,characterWorldbooks:[],allWorldbooks:[],combinedWorldbooks:[],rawResults:{},errors:[]};try{s.rawResults.getLorebooks=t&&typeof t.getLorebooks=="function"?La(await Promise.resolve(t.getLorebooks())):"[unavailable]"}catch(a){s.errors.push(`getLorebooks: ${a?.message||a}`)}try{s.rawResults.getCharLorebooks=t&&typeof t.getCharLorebooks=="function"?La(await Promise.resolve(t.getCharLorebooks({type:"all"}))):"[unavailable]"}catch(a){s.errors.push(`getCharLorebooks: ${a?.message||a}`)}try{s.rawResults.getWorldBooks=e&&typeof e.getWorldBooks=="function"?La(await Promise.resolve(e.getWorldBooks())):"[unavailable]"}catch(a){s.errors.push(`getWorldBooks: ${a?.message||a}`)}let r=await Jf(t),o=await Xf(t,e),n=eo([...r,...o]);return s.characterWorldbooks=[...r],s.allWorldbooks=[...o],s.combinedWorldbooks=[...n],za=s,Ba=n,[...n]}async function gr(t){let e=eo(t?.worldbooks?.selected);if(t?.worldbooks?.enabled!==!0||e.length===0)return"";let s=dc();if(!s||typeof s.getLorebookEntries!="function")return Zr.warn("TavernHelper.getLorebookEntries \u4E0D\u53EF\u7528\uFF0C\u65E0\u6CD5\u8BFB\u53D6\u4E16\u754C\u4E66\u5185\u5BB9\u3002"),"";let r=[];for(let o of e)try{let n=await s.getLorebookEntries(o),i=(Array.isArray(n)?n.filter(l=>l?.enabled!==!1&&!l?.disable):[]).map(Vf).filter(Boolean).join(`

`);i&&r.push(`[\u4E16\u754C\u4E66\uFF1A${o}]
${i}`)}catch(n){Zr.warn(`\u8BFB\u53D6\u4E16\u754C\u4E66\u5931\u8D25: ${o}`,n)}return r.join(`

---

`)}var Zr,Ba,za,Qf,ro=R(()=>{js();J();Zr=I.createScope("ToolWorldbookService"),Ba=[],za=null;Qf={getCachedAvailableWorldbooks:to,getLastWorldbookDiagnostics:uc,getAvailableWorldbooks:so,buildSelectedWorldbookContent:gr}});var hc={};te(hc,{WorldbookPresetPanel:()=>Ua,default:()=>ag});function pc(t){return t?t.length!==void 0&&typeof t.get=="function"?t.get(0):t:null}function mc(t){if(t.selectedId)return t.selectedId;let e=t.presets;return e.length?e[0].id:""}function bc(t){let e=mc(t);return e&&t.presets.find(s=>s.id===e)||null}function Zf(t){return t===Qt.CUSTOM?"\u81EA\u5B9A\u4E49":"\u8DDF\u968F\u89D2\u8272\u5361"}function eg(){return{presets:be.listPresets(),selectedId:be.getCurrentPresetId(),availableBooks:to()}}function tg(t,e){let s=t.presets.length?t.presets.map(r=>Bs({name:r.name,desc:`${Zf(r.bindingMode)} \xB7 ${r.bookList.length} \u672C\u4E16\u754C\u4E66${r.includeDisabled?" \xB7 \u542B\u7981\u7528":""}`,active:r.id===mc(t),onClick:()=>{be.setCurrentPresetId(r.id),t.selectedId=r.id,e()},actions:[se({label:"\u590D\u5236",size:"small",variant:"ghost",title:"\u590D\u5236\u6B64\u9884\u8BBE",onClick:o=>{o.stopPropagation();let n=be.duplicatePreset(r.id);n&&(be.setCurrentPresetId(n.id),t.selectedId=n.id),e()}}),se({label:"\u270E",size:"small",variant:"ghost",title:"\u91CD\u547D\u540D",onClick:o=>{o.stopPropagation();let n=window.prompt("\u9884\u8BBE\u540D",r.name);n!=null&&(be.renamePreset(r.id,n),e())}}),se({label:"\xD7",size:"small",variant:"danger",title:"\u5220\u9664",onClick:o=>{o.stopPropagation(),window.confirm(`\u5220\u9664\u9884\u8BBE "${r.name}" \uFF1F`)&&(be.deletePreset(r.id),t.selectedId===r.id&&(t.selectedId=""),e())}})]})):[m("div",{style:{padding:"24px 0",textAlign:"center",color:"var(--yyt-text-muted)",fontSize:"12px"},text:'\u6682\u65E0\u9884\u8BBE\u3002\u70B9\u51FB\u53F3\u4E0A\u89D2"+ \u65B0\u5EFA\u9884\u8BBE"\u5F00\u59CB\u3002'})];return je({heading:"\u9884\u8BBE\u9009\u62E9",icon:"\u{1F4DA}",actions:[se({label:"+ \u65B0\u5EFA\u9884\u8BBE",size:"small",onClick:()=>{let r=window.prompt("\u65B0\u9884\u8BBE\u540D","\u65B0\u9884\u8BBE");if(r==null)return;let o=be.createPreset({name:r||"\u65B0\u9884\u8BBE"});be.setCurrentPresetId(o.id),t.selectedId=o.id,e()}})],content:s})}function sg(t,e){let s=bc(t);return s?je({heading:"\u57FA\u672C\u4FE1\u606F",icon:"\u24D8",content:[gs({label:"\u9884\u8BBE\u540D",control:Jt({value:s.name,onChange:r=>{be.updatePreset(s.id,{name:r}),e()}})}),gs({label:"\u63CF\u8FF0",control:Jt({value:s.description,placeholder:"\u53EF\u9009 \u2014 \u5907\u6CE8\u7528\u9014",onChange:r=>{be.updatePreset(s.id,{description:r})}})}),gs({label:"\u7ED1\u5B9A\u6A21\u5F0F",hint:"\u8DDF\u968F\u89D2\u8272\u5361 = \u6CE8\u5165\u5F53\u524D\u89D2\u8272\u7ED1\u5B9A\u7684\u4E16\u754C\u4E66\uFF1B\u81EA\u5B9A\u4E49 = \u7528\u4E0B\u65B9\u624B\u52A8\u9009\u62E9\u7684\u5217\u8868",control:Je({value:s.bindingMode,options:[{value:Qt.CHARACTER_CARD,label:"\u8DDF\u968F\u89D2\u8272\u5361\uFF08\u52A8\u6001\uFF09"},{value:Qt.CUSTOM,label:"\u81EA\u5B9A\u4E49\uFF08\u56FA\u5B9A\u5217\u8868\uFF09"}],onChange:r=>{be.updatePreset(s.id,{bindingMode:r}),e()}})}),Xt({label:"\u5305\u542B\u7981\u7528\u8BCD\u6761",hint:"\u5F00\u542F\u540E\uFF1A\u6E90\u4E16\u754C\u4E66\u4E2D\u5DF2\u7981\u7528\u7684\u8BCD\u6761\u53EF\u88AB\u672C\u9884\u8BBE\u5F3A\u5236\u542F\u7528\u5E76\u6CE8\u5165\uFF08\u4EC5\u5728\u8BCD\u6761\u8986\u76D6\u4E2D\u52FE\u9009\u65F6\u751F\u6548\uFF09",checked:s.includeDisabled,onChange:r=>{be.updatePreset(s.id,{includeDisabled:r})}})]}):null}function rg(t,e){let s=bc(t);if(!s)return null;let r=s.bindingMode===Qt.CHARACTER_CARD,o=[];r?t.availableBooks.length?o=t.availableBooks.map(a=>{let i=s.bookList.find(c=>c.bookName===a),l=i?i.enabled!==!1:!0;return Bs({name:a,desc:l?"\u5DF2\u542F\u7528 \xB7 \u6574\u672C\u6CE8\u5165":"\u5DF2\u7981\u7528",actions:[Xt({checked:l,onChange:c=>fc(s,a,c)})]})}):o=[m("div",{style:{padding:"14px 0",color:"var(--yyt-text-muted)",fontSize:"12px"},text:'\u5F53\u524D\u89D2\u8272\u5361\u672A\u7ED1\u5B9A\u4E16\u754C\u4E66 \u2014 \u5207\u6362\u5230"\u81EA\u5B9A\u4E49"\u53EF\u4EE5\u624B\u52A8\u9009\u62E9\u4EFB\u610F\u4E16\u754C\u4E66\u3002'})]:s.bookList.length?o=s.bookList.map(a=>Bs({name:a.bookName,desc:a.enabled===!1?"\u5DF2\u7981\u7528":"\u5DF2\u542F\u7528 \xB7 \u6574\u672C\u6CE8\u5165",actions:[Xt({checked:a.enabled!==!1,onChange:i=>fc(s,a.bookName,i)}),se({label:"\xD7",size:"small",variant:"danger",title:"\u4ECE\u9884\u8BBE\u79FB\u9664",onClick:()=>og(s,a.bookName,e)})]})):o=[m("div",{style:{padding:"14px 0",color:"var(--yyt-text-muted)",fontSize:"12px"},text:'\u70B9\u51FB\u53F3\u4E0A\u89D2"+ \u6DFB\u52A0"\u9009\u62E9\u4E16\u754C\u4E66\u52A0\u5165\u6B64\u9884\u8BBE\u3002'})];let n=[];return r||n.push(se({label:"+ \u6DFB\u52A0",size:"small",onClick:()=>{let a=to(),i=new Set(s.bookList.map(u=>u.bookName)),l=a.filter(u=>!i.has(u));if(!l.length){window.alert("\u6CA1\u6709\u53EF\u6DFB\u52A0\u7684\u4E16\u754C\u4E66\uFF08\u7F13\u5B58\u91CC\u5DF2\u88AB\u5168\u90E8\u52A0\u5165\u6216\u5BBF\u4E3B\u672A\u63D0\u4F9B\uFF09");return}let c=window.prompt(`\u8F93\u5165\u8981\u6DFB\u52A0\u7684\u4E16\u754C\u4E66\u540D\uFF08\u53EF\u9009\uFF1A
${l.join(`
`)}
\uFF09`,l[0]||"");if(!c)return;let d=[...s.bookList,{bookName:c,enabled:!0,entryOverrides:{}}];be.updatePreset(s.id,{bookList:d}),e()}})),n.push(se({label:"\u{1F504} \u5237\u65B0\u4E16\u754C\u4E66\u5217\u8868",size:"small",variant:"ghost",onClick:async()=>{try{let a=await so();t.availableBooks=a}catch(a){gc.warn("\u5237\u65B0\u4E16\u754C\u4E66\u5217\u8868\u5931\u8D25",{error:a})}e()}})),je({heading:"\u9009\u4E2D\u7684\u4E16\u754C\u4E66",icon:"\u{1F4D1}",actions:n,content:o})}function fc(t,e,s){let r=[...t.bookList],o=r.findIndex(n=>n.bookName===e);o>=0?r[o]={...r[o],enabled:s}:r.push({bookName:e,enabled:s,entryOverrides:{}}),be.updatePreset(t.id,{bookList:r})}function og(t,e,s){let r=t.bookList.filter(o=>o.bookName!==e);be.updatePreset(t.id,{bookList:r}),s()}function ng(t,e){let s=m("div",{className:"yyt-panel-footer",style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 20px",borderTop:"1px solid var(--yyt-border)"}}),r=m("div",{style:{display:"flex",gap:"8px"}});r.appendChild(se({label:"\u{1F4E5} \u5BFC\u5165",size:"small",onClick:()=>{let n=window.prompt("\u7C98\u8D34\u5BFC\u51FA\u7684 JSON\uFF1A");if(n)try{let a=JSON.parse(n),i=be.importPresets(a);window.alert(`\u5BFC\u5165\u5B8C\u6210\uFF1A\u65B0\u589E ${i.added} \u6761`),e()}catch(a){window.alert(`\u5BFC\u5165\u5931\u8D25\uFF1A${a?.message||a}`)}}}).el),r.appendChild(se({label:"\u{1F4E4} \u5BFC\u51FA",size:"small",onClick:()=>{let n=JSON.stringify(be.exportAll(),null,2);try{navigator.clipboard?.writeText?.(n),window.alert("\u5DF2\u590D\u5236\u5230\u526A\u8D34\u677F")}catch{window.prompt("\u5BFC\u51FA JSON\uFF08\u590D\u5236\u4FDD\u5B58\uFF09\uFF1A",n)}}}).el),s.appendChild(r);let o=m("div",{style:{display:"flex",gap:"8px"}});return o.appendChild(se({label:"\u6E05\u7A7A\u6240\u6709\u9884\u8BBE",size:"small",variant:"danger",onClick:()=>{window.confirm("\u786E\u5B9A\u6E05\u7A7A\u6240\u6709\u4E16\u754C\u4E66\u9884\u8BBE\uFF1F\u6B64\u64CD\u4F5C\u4E0D\u53EF\u64A4\u9500\u3002")&&(be.resetAll(),e())}}).el),s.appendChild(o),s}var gc,Ua,ag,xc=R(()=>{Xr();Na();ro();J();gc=I.createScope("WorldbookPresetPanel");Ua={id:"worldbookPresetPanel",renderTo(t){let e=pc(t);if(!e)return;if(e._yytWorldbookPanelCleanup)try{e._yytWorldbookPanelCleanup()}catch{}let s=eg();function r(){Ua.renderTo(t)}let o=m("div",{className:"yyt-worldbook-preset-panel",style:{display:"flex",flexDirection:"column",height:"100%"}}),n=tg(s,r);o.appendChild(n.el);let a=sg(s,r);a&&o.appendChild(a.el);let i=rg(s,r);i&&o.appendChild(i.el);let l=ng(s,r);o.appendChild(l),e.innerHTML="",e.appendChild(o);let c=[n,a,i].filter(Boolean);e._yytWorldbookPanelCleanup=()=>{for(let d of c)try{d.destroy()}catch{}delete e._yytWorldbookPanelCleanup},s.availableBooks.length||so().then(d=>{e._yytWorldbookPanelCleanup&&(s.availableBooks=d,r())}).catch(d=>{gc.warn("\u52A0\u8F7D\u4E16\u754C\u4E66\u5217\u8868\u5931\u8D25",{error:d})})},destroy(t){let e=pc(t);if(e?._yytWorldbookPanelCleanup)try{e._yytWorldbookPanelCleanup()}catch{}},getStyles(){return`
      .yyt-worldbook-preset-panel { gap: 0; }
    `}},ag=Ua});var Ya={};te(Ya,{MESSAGE_MACROS:()=>Fc,addTagRule:()=>Rc,createRuleTemplate:()=>Cc,default:()=>cg,deleteRulePreset:()=>Bc,deleteRuleTemplate:()=>Ic,deleteTagRule:()=>$c,escapeRegex:()=>Fs,exportRulesConfig:()=>zc,extractComplexTag:()=>wc,extractCurlyBraceTag:()=>Ha,extractHtmlFormatTag:()=>Sc,extractSimpleTag:()=>Wa,extractTagContent:()=>es,generateTagSuggestions:()=>_c,getAllRulePresets:()=>Oc,getAllRuleTemplates:()=>Ac,getContentBlacklist:()=>br,getRuleTemplate:()=>Ec,getTagRules:()=>mr,importRulesConfig:()=>Uc,isValidTagName:()=>Ka,loadRulePreset:()=>Lc,saveRulesAsPreset:()=>Nc,scanTextForTags:()=>Tc,setContentBlacklist:()=>Dc,setTagRules:()=>Mc,shouldSkipContent:()=>Fa,testRegex:()=>jc,updateRuleTemplate:()=>kc,updateTagRule:()=>Pc});function ig(){return{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"},ruleTemplates:[...ja],tagRules:[],contentBlacklist:[],tagRulePresets:{}}}function ct(){return $.get(vc,ig())}function Ut(t){$.set(vc,t)}function tn(){let t=ct();return He=t.ruleTemplates||[...ja],we=t.tagRules||[],tt=t.contentBlacklist||[],{ruleTemplates:He,tagRules:we,contentBlacklist:tt}}function Fs(t){return typeof t!="string"?"":t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function Fa(t,e){if(!e||e.length===0||!t||typeof t!="string")return!1;let s=t.toLowerCase();return e.some(r=>{let o=r.trim().toLowerCase();return o&&s.includes(o)})}function Ka(t){return!t||typeof t!="string"?!1:/^[a-zA-Z][a-zA-Z0-9_-]*$/.test(t)&&!lg.includes(t.toLowerCase())}function Wa(t,e){if(!t||!e)return[];let s=[],r=Fs(e),o=new RegExp(`<${r}>([\\s\\S]*?)<\\/${r}>`,"gi");[...t.matchAll(o)].forEach(l=>{l[1]&&s.push(l[1].trim())});let a=(t.match(new RegExp(`<${r}>`,"gi"))||[]).length,i=(t.match(new RegExp(`<\\/${r}>`,"gi"))||[]).length;return a>i&&Zt.warn(`\u53D1\u73B0 ${a-i} \u4E2A\u672A\u95ED\u5408\u7684 <${e}> \u6807\u7B7E`),s}function Ha(t,e){if(!t||!e)return[];let s=[],r=Fs(e),o=new RegExp(`\\{${r}\\|`,"gi"),n;for(;(n=o.exec(t))!==null;){let a=n.index,i=a+n[0].length,l=1,c=i;for(;c<t.length&&l>0;)t[c]==="{"?l++:t[c]==="}"&&l--,c++;if(l===0){let d=t.substring(i,c-1);d.trim()&&s.push(d.trim())}o.lastIndex=a+1}return s}function wc(t,e){if(!t||!e)return[];let s=e.split(",");if(s.length!==2)return Zt.error(`\u590D\u6742\u6807\u7B7E\u914D\u7F6E\u683C\u5F0F\u9519\u8BEF\uFF0C\u5E94\u8BE5\u5305\u542B\u4E00\u4E2A\u9017\u53F7: ${e}`),[];let r=s[0].trim(),o=s[1].trim(),n=o.match(/<\/(\w+)>/);if(!n)return Zt.error(`\u65E0\u6CD5\u89E3\u6790\u7ED3\u675F\u6807\u7B7E: ${o}`),[];let a=n[1],i=new RegExp(`${Fs(r)}([\\s\\S]*?)<\\/${a}>`,"gi"),l=[];return[...t.matchAll(i)].forEach(d=>{d[1]&&l.push(d[1].trim())}),l}function Sc(t,e){if(!t||!e)return[];let s=e.match(/<(\w+)(?:\s[^>]*)?>/);if(!s)return Zt.error(`\u65E0\u6CD5\u89E3\u6790HTML\u683C\u5F0F\u6807\u7B7E: ${e}`),[];let r=s[1],o=[],n=new RegExp(`<${r}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${r}>`,"gi");[...t.matchAll(n)].forEach(c=>{c[1]&&o.push(c[1].trim())});let i=(t.match(new RegExp(`<${r}(?:\\s[^>]*)?>`,"gi"))||[]).length,l=(t.match(new RegExp(`<\\/${r}>`,"gi"))||[]).length;return i>l&&Zt.warn(`\u53D1\u73B0 ${i-l} \u4E2A\u672A\u95ED\u5408\u7684 <${r}> \u6807\u7B7E`),o}function es(t,e,s=[]){if(!t)return"";if(!e||e.length===0)return t;let r=e.filter(d=>d.type==="exclude"&&d.enabled),o=e.filter(d=>(d.type==="include"||d.type==="regex_include")&&d.enabled),n=e.filter(d=>d.type==="regex_exclude"&&d.enabled),a=t;for(let d of r)try{let u=new RegExp(`<${Fs(d.value)}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${Fs(d.value)}>`,"gi");a=a.replace(u,"")}catch(u){Zt.error("Error applying block exclusion rule:",{rule:d,error:u})}let i=[];if(o.length>0)for(let d of o){let u=[];try{if(d.type==="include")u.push(...Wa(a,d.value)),u.push(...Ha(a,d.value));else if(d.type==="regex_include"){let p=new RegExp(d.value,"gi");[...a.matchAll(p)].forEach(f=>{f[1]&&u.push(f[1])})}}catch(p){Zt.error("Error applying inclusion rule:",{rule:d,error:p})}u.forEach(p=>i.push(p.trim()))}else i.push(a);let l=[];for(let d of i){for(let u of n)try{let p=new RegExp(u.value,"gi");d=d.replace(p,"")}catch(p){Zt.error("Error applying cleanup rule:",{rule:u,error:p})}Fa(d,s)||l.push(d)}return l.join(`

`).replace(/\n\s*\n\s*\n/g,`

`).replace(/^\s+|\s+$/g,"").trim()}async function Tc(t,e={}){let s=performance.now(),{chunkSize:r=5e4,maxTags:o=100,timeoutMs:n=5e3}=e,a=new Set,i=/<(?:\/|)([a-zA-Z0-9_-]+)(?:[^>]*)>|\{([a-zA-Z0-9_-]+)(?:\||})/g,l=0,c=0;for(let u=0;u<t.length;u+=r){let p=t.slice(u,Math.min(u+r,t.length));if(c++,l+=p.length,performance.now()-s>n){Zt.warn(`Tag scanning timed out after ${n}ms`);break}let y;for(;(y=i.exec(p))!==null&&a.size<o;){let f=(y[1]||y[2]).toLowerCase();Ka(f)&&a.add(f)}if(a.size>=o)break;c%5===0&&await new Promise(f=>setTimeout(f,0))}let d=performance.now();return{tags:Array.from(a).sort(),stats:{processingTimeMs:Math.round(d-s),processedChars:l,totalChars:t.length,chunkCount:c,tagsFound:a.size}}}function _c(t,e=25){let s=t.tags.slice(0,e);return{suggestions:s,stats:{totalFound:t.stats.tagsFound,finalCount:s.length}}}function Ac(){return He.length===0&&tn(),He}function Ec(t){return He.find(e=>e.id===t)}function Cc(t){let e={id:`rule-${Date.now()}`,name:t.name||"\u65B0\u89C4\u5219",description:t.description||"",type:t.type||"include",value:t.value||"",enabled:t.enabled!==!1,createdAt:new Date().toISOString()};return He.push(e),qa(),{success:!0,template:e,message:"\u89C4\u5219\u6A21\u677F\u521B\u5EFA\u6210\u529F"}}function kc(t,e){let s=He.findIndex(r=>r.id===t);return s===-1?{success:!1,message:"\u89C4\u5219\u6A21\u677F\u4E0D\u5B58\u5728"}:(He[s]={...He[s],...e,updatedAt:new Date().toISOString()},qa(),{success:!0,template:He[s],message:"\u89C4\u5219\u6A21\u677F\u66F4\u65B0\u6210\u529F"})}function Ic(t){let e=He.findIndex(s=>s.id===t);return e===-1?{success:!1,message:"\u89C4\u5219\u6A21\u677F\u4E0D\u5B58\u5728"}:(He.splice(e,1),qa(),{success:!0,message:"\u89C4\u5219\u6A21\u677F\u5DF2\u5220\u9664"})}function qa(){let t=ct();t.ruleTemplates=He,Ut(t)}function mr(){return we||tn(),we}function Mc(t){we=t||[];let e=ct();e.tagRules=we,Ut(e)}function Rc(t){let e={id:`tag-${Date.now()}`,type:t.type||"include",value:t.value||"",enabled:t.enabled!==!1};we.push(e);let s=ct();return s.tagRules=we,Ut(s),{success:!0,rule:e,message:"\u89C4\u5219\u6DFB\u52A0\u6210\u529F"}}function Pc(t,e){if(t<0||t>=we.length)return{success:!1,message:"\u89C4\u5219\u7D22\u5F15\u65E0\u6548"};we[t]={...we[t],...e};let s=ct();return s.tagRules=we,Ut(s),{success:!0,rule:we[t],message:"\u89C4\u5219\u66F4\u65B0\u6210\u529F"}}function $c(t){if(t<0||t>=we.length)return{success:!1,message:"\u89C4\u5219\u7D22\u5F15\u65E0\u6548"};we.splice(t,1);let e=ct();return e.tagRules=we,Ut(e),{success:!0,message:"\u89C4\u5219\u5DF2\u5220\u9664"}}function br(){return tt||tn(),tt}function Dc(t){tt=t||[];let e=ct();e.contentBlacklist=tt,Ut(e)}function Nc(t,e=""){if(!t||!t.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let s=ct();s.tagRulePresets||(s.tagRulePresets={});let r=`preset-${Date.now()}`;return s.tagRulePresets[r]={id:r,name:t.trim(),description:e.trim(),rules:JSON.parse(JSON.stringify(we)),blacklist:JSON.parse(JSON.stringify(tt)),createdAt:new Date().toISOString()},Ut(s),{success:!0,preset:s.tagRulePresets[r],message:"\u9884\u8BBE\u4FDD\u5B58\u6210\u529F"}}function Oc(){let e=ct().tagRulePresets||{};return Object.values(e)}function Lc(t){let e=ct(),r=(e.tagRulePresets||{})[t];return r?(we=JSON.parse(JSON.stringify(r.rules||[])),tt=JSON.parse(JSON.stringify(r.blacklist||[])),e.tagRules=we,e.contentBlacklist=tt,Ut(e),{success:!0,preset:r,message:"\u9884\u8BBE\u52A0\u8F7D\u6210\u529F"}):{success:!1,message:"\u9884\u8BBE\u4E0D\u5B58\u5728"}}function Bc(t){let e=ct(),s=e.tagRulePresets||{};return s[t]?(delete s[t],e.tagRulePresets=s,Ut(e),{success:!0,message:"\u9884\u8BBE\u5DF2\u5220\u9664"}):{success:!1,message:"\u9884\u8BBE\u4E0D\u5B58\u5728"}}function zc(){return JSON.stringify({tagRules:we,contentBlacklist:tt,ruleTemplates:He,tagRulePresets:ct().tagRulePresets||{}},null,2)}function Uc(t,e={overwrite:!0}){try{let s=JSON.parse(t);if(e.overwrite)we=s.tagRules||[],tt=s.contentBlacklist||[],He=s.ruleTemplates||ja;else if(s.tagRules&&we.push(...s.tagRules),s.contentBlacklist){let o=new Set(tt.map(n=>n.toLowerCase()));s.contentBlacklist.forEach(n=>{o.has(n.toLowerCase())||tt.push(n)})}let r=ct();return r.tagRules=we,r.contentBlacklist=tt,r.ruleTemplates=He,s.tagRulePresets&&(r.tagRulePresets={...r.tagRulePresets||{},...s.tagRulePresets}),Ut(r),{success:!0,message:"\u914D\u7F6E\u5BFC\u5165\u6210\u529F"}}catch(s){return{success:!1,message:`\u5BFC\u5165\u5931\u8D25: ${s.message}`}}}function jc(t,e,s="g",r=0){try{if(!t||typeof t!="string")return{success:!1,error:"\u6B63\u5219\u8868\u8FBE\u5F0F\u4E0D\u80FD\u4E3A\u7A7A",matches:[]};let o=new RegExp(t,s),n=[];if(s.includes("g")){let a;for(;(a=o.exec(e))!==null;)a.length>1?n.push({fullMatch:a[0],groups:a.slice(1),index:a.index,extracted:a[r]||a[1]||a[0]}):n.push({fullMatch:a[0],groups:[],index:a.index,extracted:a[0]})}else{let a=o.exec(e);a&&n.push({fullMatch:a[0],groups:a.length>1?a.slice(1):[],index:a.index,extracted:a.length>1?a[r]||a[1]:a[0]})}return{success:!0,matches:n,count:n.length,extracted:n.map(a=>a.extracted)}}catch(o){return{success:!1,error:o.message,matches:[]}}}var Zt,vc,lg,ja,He,we,tt,Fc,cg,hr=R(()=>{We();J();Zt=I.createScope("RegexExtractor"),vc="settings";lg=["font","span","div","p","br","hr","img","a","b","i","u","s","em","strong","small","big","sub","sup","h1","h2","h3","h4","h5","h6","table","tr","td","th","tbody","thead","tfoot","ul","ol","li","form","input","button","select","option","textarea","label","script","style","meta","link","title","head","body","html"],ja=[{id:"exclude-thinking",name:"\u6392\u9664\u601D\u8003\u6807\u7B7E",description:"\u79FB\u9664<thinking>\u6807\u7B7E\u5757",type:"exclude",value:"thinking",enabled:!0},{id:"include-content",name:"\u63D0\u53D6\u5185\u5BB9\u6807\u7B7E",description:"\u63D0\u53D6<content>\u6807\u7B7E\u5185\u5BB9",type:"include",value:"content",enabled:!0},{id:"regex-exclude-cot",name:"\u6392\u9664\u5C0FCoT",description:"\u79FB\u9664HTML\u6CE8\u91CA",type:"regex_exclude",value:"<!--[\\s\\S]*?-->",enabled:!1},{id:"regex-include-details",name:"\u63D0\u53D6details\u6807\u7B7E",description:"\u63D0\u53D6<details>\u6807\u7B7E\u5185\u5BB9",type:"regex_include",value:"<details[^>]*>([\\s\\S]*?)</details>",enabled:!1}],He=[],we=[],tt=[];Fc={lastMessage:{macro:"{{lastMessage}}",description:"\u6700\u540E\u4E00\u6761\u6D88\u606F"},lastCharMessage:{macro:"{{lastCharMessage}}",description:"\u6700\u540E\u4E00\u6761\u89D2\u8272\u6D88\u606F"},lastUserMessage:{macro:"{{lastUserMessage}}",description:"\u6700\u540E\u4E00\u6761\u7528\u6237\u6D88\u606F"},char:{macro:"{{char}}",description:"\u89D2\u8272\u540D\u79F0"},user:{macro:"{{user}}",description:"\u7528\u6237\u540D\u79F0"},input:{macro:"{{input}}",description:"\u5F53\u524D\u8F93\u5165\u6846\u5185\u5BB9"}};tn();cg={extractTagContent:es,extractSimpleTag:Wa,extractCurlyBraceTag:Ha,extractComplexTag:wc,extractHtmlFormatTag:Sc,escapeRegex:Fs,shouldSkipContent:Fa,isValidTagName:Ka,scanTextForTags:Tc,generateTagSuggestions:_c,getAllRuleTemplates:Ac,getRuleTemplate:Ec,createRuleTemplate:Cc,updateRuleTemplate:kc,deleteRuleTemplate:Ic,getTagRules:mr,setTagRules:Mc,addTagRule:Rc,updateTagRule:Pc,deleteTagRule:$c,getContentBlacklist:br,setContentBlacklist:Dc,saveRulesAsPreset:Nc,getAllRulePresets:Oc,loadRulePreset:Lc,deleteRulePreset:Bc,exportRulesConfig:zc,importRulesConfig:Uc,testRegex:jc,MESSAGE_MACROS:Fc}});var Jc={};te(Jc,{createDefaultToolDefinition:()=>Ks,default:()=>pg,deleteTool:()=>on,deleteToolPreset:()=>Yc,exportTools:()=>ln,getAllTools:()=>hs,getCurrentToolPreset:()=>Gc,getTool:()=>xr,getToolPresets:()=>nn,importTools:()=>cn,normalizeToolDefinitionToRuntimeConfig:()=>no,resetTools:()=>dn,saveTool:()=>rn,saveToolPreset:()=>qc,setCurrentToolPreset:()=>Vc,setToolEnabled:()=>an});function dg(t={}){return!t||typeof t!="object"?{}:Object.fromEntries(Object.entries(t).map(([e,s])=>[e,Ks({...s||{},id:e})]))}function oo(t){return Array.isArray(t)?t.map(e=>String(e||"").trim()).filter(Boolean):[]}function Ga(t,e){let s=parseInt(t,10);return Number.isFinite(s)&&s>0?s:e}function Kc(t,e){let s=parseInt(t,10);return Number.isFinite(s)&&s>=0?s:e}function Wc(t={}){return{enabled:t?.enabled===!0,settleMs:Kc(t?.settleMs,1200),cooldownMs:Kc(t?.cooldownMs,5e3)}}function Hc(t={}){return{enabled:t?.enabled===!0,selected:oo(t?.selected)}}function ug(t=[]){let e=Array.isArray(t)?t.map(s=>({role:String(s?.role||"user").trim().toUpperCase(),content:String(s?.content||"").trim()})).filter(s=>s.content):[];return e.length===0?"":e.length===1?e[0].content:e.map(s=>`\u3010${s.role||"USER"}\u3011
${s.content}`).join(`

`)}function yg(t,e={}){let s=typeof e?.promptTemplate=="string"?e.promptTemplate.trim():"";if(s)return s;let r=ug(e?.config?.messages||[]);return r||`\u8BF7\u57FA\u4E8E\u6700\u8FD1\u7684 AI \u56DE\u590D\u4E3A\u5DE5\u5177\u201C${e?.name||t}\u201D\u751F\u6210\u7ED3\u6784\u5316\u8F93\u51FA\u3002`}function Ks(t={}){let e=new Date().toISOString(),s=t?.config||{};return{...vt,...t,id:t?.id||vt.id,icon:t?.icon||vt.icon,order:Number.isFinite(t?.order)?t.order:vt.order,promptTemplate:typeof t?.promptTemplate=="string"?t.promptTemplate:vt.promptTemplate,extractTags:oo(t?.extractTags),config:{execution:{...vt.config.execution,...s.execution||{},timeout:Ga(s?.execution?.timeout,vt.config.execution.timeout),retries:Math.max(0,parseInt(s?.execution?.retries,10)||vt.config.execution.retries)},api:{...vt.config.api,...s.api||{}},messages:Array.isArray(s?.messages)?s.messages:[],context:{...vt.config.context,...s.context||{},depth:Ga(s?.context?.depth,vt.config.context.depth),includeTags:oo(s?.context?.includeTags),excludeTags:oo(s?.context?.excludeTags)},automation:Wc(s?.automation),worldbooks:Hc(s?.worldbooks)},enabled:t?.enabled!==!1,metadata:{...vt.metadata,...t?.metadata||{},createdAt:t?.metadata?.createdAt||e,updatedAt:t?.metadata?.updatedAt||e}}}function no(t,e={},s={}){let r=Ks({...e,id:t||e?.id||""}),o=oo(r?.extractTags?.length?r.extractTags:r?.config?.context?.includeTags),n=String(e?.output?.apiPreset||r?.config?.api?.preset||"").trim(),a=yg(t,r),i=typeof e?.output?.mode=="string"&&e.output.mode.trim()?e.output.mode.trim():s.defaultOutputMode||"follow_ai";return{id:r.id||t,name:r.name||t,icon:r.icon||"fa-screwdriver-wrench",description:r.description||"",enabled:r.enabled!==!1,order:Number.isFinite(r.order)?r.order:100,bypass:{enabled:r?.config?.api?.useBypass===!0&&!!r?.config?.api?.bypassPreset,presetId:r?.config?.api?.bypassPreset||""},output:{mode:i,apiPreset:n,overwrite:!0,enabled:!0},automation:Wc(r?.config?.automation),worldbooks:Hc(r?.config?.worldbooks),extraction:{enabled:!0,maxMessages:Ga(r?.config?.context?.depth,5),selectors:o},promptTemplate:a,runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},apiPreset:n,extractTags:o,isCustom:!0,category:r.category||"utility",metadata:{...r.metadata||{}}}}function hs(){let t=ge.get(_e.TOOLS),e=dg(t);return t&&JSON.stringify(t)!==JSON.stringify(e)&&ge.set(_e.TOOLS,e),{...sn,...e}}function xr(t){return hs()[t]||null}function rn(t,e){if(!t||!e)return!1;let s=ge.get(_e.TOOLS)||{},r=!s[t]&&!sn[t],o=Ks({...s[t]||{},...e,id:t,metadata:{...s[t]?.metadata||{},...e.metadata||{},createdAt:s[t]?.metadata?.createdAt||e?.metadata?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString()}});return s[t]=o,ge.set(_e.TOOLS,s),P.emit(r?M.TOOL_REGISTERED:M.TOOL_UPDATED,{toolId:t,tool:o}),!0}function on(t){let e=ge.get(_e.TOOLS)||{};return!e[t]&&!sn[t]||sn[t]?!1:(delete e[t],ge.set(_e.TOOLS,e),P.emit(M.TOOL_UNREGISTERED,{toolId:t}),!0)}function nn(){return ge.get(_e.PRESETS)||{}}function qc(t,e){if(!t||!e)return!1;let s=nn(),r=!s[t];return s[t]={...e,name:t,updatedAt:new Date().toISOString()},ge.set(_e.PRESETS,s),P.emit(r?M.PRESET_CREATED:M.PRESET_UPDATED,{type:"tool",presetName:t,preset:s[t]}),!0}function Yc(t){let e=nn();return e[t]?(delete e[t],ge.set(_e.PRESETS,e),P.emit(M.PRESET_DELETED,{type:"tool",presetName:t}),!0):!1}function Gc(){return ge.get(_e.CURRENT_PRESET)||""}function Vc(t){return ge.set(_e.CURRENT_PRESET,t||""),P.emit(M.PRESET_ACTIVATED,{type:"tool",presetName:t}),!0}function an(t,e){let s=xr(t);if(!s)return!1;let r=ge.get(_e.TOOLS)||{};return r[t]=Ks({...s,id:t,enabled:e,metadata:{...s?.metadata||{},createdAt:s?.metadata?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString()}}),ge.set(_e.TOOLS,r),P.emit(e?M.TOOL_ENABLED:M.TOOL_DISABLED,{toolId:t,enabled:e}),!0}function ln(){let t=ge.get(_e.TOOLS)||{},e=ge.get(_e.PRESETS)||{};return JSON.stringify({version:"1.0.0",exportedAt:new Date().toISOString(),tools:t,presets:e},null,2)}function cn(t,e=!1){try{let s=typeof e=="object"?!!e?.overwrite:!!e,r=JSON.parse(t);if(!r||typeof r!="object")return{success:!1,toolsImported:0,presetsImported:0,message:"\u65E0\u6548\u7684JSON\u683C\u5F0F"};let o=s?{}:ge.get(_e.TOOLS)||{},n=s?{}:ge.get(_e.PRESETS)||{},a=0,i=0;if(r.tools&&typeof r.tools=="object"){for(let[l,c]of Object.entries(r.tools))!c||typeof c!="object"||(o[l]=Ks({...c,id:l}),a+=1);ge.set(_e.TOOLS,o)}if(r.presets&&typeof r.presets=="object"){for(let[l,c]of Object.entries(r.presets))!c||typeof c!="object"||(n[l]={...c,name:l,updatedAt:new Date().toISOString()},i+=1);ge.set(_e.PRESETS,n)}return{success:!0,toolsImported:a,presetsImported:i,message:`\u6210\u529F\u5BFC\u5165 ${a} \u4E2A\u5DE5\u5177\u548C ${i} \u4E2A\u9884\u8BBE`}}catch(s){return{success:!1,toolsImported:0,presetsImported:0,message:`\u5BFC\u5165\u5931\u8D25: ${s.message}`}}}function dn(){ge.remove(_e.TOOLS),ge.remove(_e.PRESETS),ge.remove(_e.CURRENT_PRESET)}var vt,sn,_e,pg,un=R(()=>{We();Me();vt={id:"",name:"",description:"",icon:"fa-screwdriver-wrench",order:100,category:"utility",promptTemplate:"",extractTags:[],config:{execution:{timeout:6e4,retries:3},api:{preset:"",useBypass:!1,bypassPreset:""},messages:[],context:{depth:3,includeTags:[],excludeTags:[]},automation:{enabled:!1,settleMs:1200,cooldownMs:5e3},worldbooks:{enabled:!1,selected:[]}},enabled:!0,metadata:{createdAt:null,updatedAt:null,author:"",version:"1.0.0"}},sn={},_e={TOOLS:"tools",PRESETS:"tool_presets",CURRENT_PRESET:"current_tool_preset"};pg={getAllTools:hs,getTool:xr,saveTool:rn,deleteTool:on,setToolEnabled:an,exportTools:ln,importTools:cn,resetTools:dn,getToolPresets:nn,saveToolPreset:qc,deleteToolPreset:Yc,getCurrentToolPreset:Gc,setCurrentToolPreset:Vc,createDefaultToolDefinition:Ks,normalizeToolDefinitionToRuntimeConfig:no}});var ti={};te(ti,{TOOL_CATEGORIES:()=>Xc,TOOL_REGISTRY:()=>vr,appendToolRuntimeHistory:()=>cd,clearToolApiPreset:()=>ad,default:()=>wg,ensureToolRuntimeConfig:()=>pn,getAllDefaultToolConfigs:()=>ud,getAllToolApiBindings:()=>id,getAllToolFullConfigs:()=>lo,getEnabledTools:()=>yd,getToolApiPreset:()=>Za,getToolBaseConfig:()=>yn,getToolConfig:()=>io,getToolFullConfig:()=>Q,getToolList:()=>sd,getToolSubTabs:()=>rd,getToolWindowState:()=>fd,hasTool:()=>Qa,onPresetDeleted:()=>ld,patchToolRuntime:()=>xs,registerTool:()=>ed,resetToolConfig:()=>dd,resetToolRegistry:()=>od,saveToolConfig:()=>he,saveToolWindowState:()=>pd,setToolApiPreset:()=>nd,setToolApiPresetConfig:()=>hg,setToolBypassConfig:()=>xg,setToolOutputMode:()=>bg,setToolPromptTemplate:()=>vg,unregisterTool:()=>td,updateToolRuntime:()=>ei});function Hs(t={}){let e=Array.isArray(t?.recentWritebackHistory)?t.recentWritebackHistory.filter(Boolean):[];return{lastRunAt:Number.isFinite(t?.lastRunAt)?t.lastRunAt:0,lastStatus:typeof t?.lastStatus=="string"?t.lastStatus:"idle",lastError:typeof t?.lastError=="string"?t.lastError:"",lastDurationMs:Number.isFinite(t?.lastDurationMs)?t.lastDurationMs:0,successCount:Number.isFinite(t?.successCount)?t.successCount:0,errorCount:Number.isFinite(t?.errorCount)?t.errorCount:0,lastMessageKey:typeof t?.lastMessageKey=="string"?t.lastMessageKey:"",lastExecutionKey:typeof t?.lastExecutionKey=="string"?t.lastExecutionKey:"",lastExecutionPath:typeof t?.lastExecutionPath=="string"?t.lastExecutionPath:"",lastWritebackStatus:typeof t?.lastWritebackStatus=="string"?t.lastWritebackStatus:"",lastFailureStage:typeof t?.lastFailureStage=="string"?t.lastFailureStage:"",lastSlotBindingKey:typeof t?.lastSlotBindingKey=="string"?t.lastSlotBindingKey:"",lastSlotRevisionKey:typeof t?.lastSlotRevisionKey=="string"?t.lastSlotRevisionKey:"",lastSlotTransactionId:typeof t?.lastSlotTransactionId=="string"?t.lastSlotTransactionId:"",lastSourceMessageId:typeof t?.lastSourceMessageId=="string"?t.lastSourceMessageId:"",lastSourceSwipeId:typeof t?.lastSourceSwipeId=="string"?t.lastSourceSwipeId:"",lastContentCommitted:t?.lastContentCommitted===!0,lastHostCommitApplied:t?.lastHostCommitApplied===!0,lastRefreshRequested:t?.lastRefreshRequested===!0,lastRefreshConfirmed:t?.lastRefreshConfirmed===!0,lastPreferredCommitMethod:typeof t?.lastPreferredCommitMethod=="string"?t.lastPreferredCommitMethod:"",lastAppliedCommitMethod:typeof t?.lastAppliedCommitMethod=="string"?t.lastAppliedCommitMethod:"",lastRefreshMethodCount:Number.isFinite(t?.lastRefreshMethodCount)?t.lastRefreshMethodCount:0,lastRefreshMethods:Array.isArray(t?.lastRefreshMethods)?t.lastRefreshMethods.filter(Boolean):[],lastRefreshConfirmChecks:Number.isFinite(t?.lastRefreshConfirmChecks)?t.lastRefreshConfirmChecks:0,lastRefreshConfirmedBy:typeof t?.lastRefreshConfirmedBy=="string"?t.lastRefreshConfirmedBy:"",lastTraceId:typeof t?.lastTraceId=="string"?t.lastTraceId:"",lastAutoRunAt:Number.isFinite(t?.lastAutoRunAt)?t.lastAutoRunAt:0,lastAutoStatus:typeof t?.lastAutoStatus=="string"?t.lastAutoStatus:"idle",lastAutoMessageId:typeof t?.lastAutoMessageId=="string"?t.lastAutoMessageId:"",lastAutoSwipeId:typeof t?.lastAutoSwipeId=="string"?t.lastAutoSwipeId:"",lastAutoRevisionKey:typeof t?.lastAutoRevisionKey=="string"?t.lastAutoRevisionKey:"",lastAutoWritebackStatus:typeof t?.lastAutoWritebackStatus=="string"?t.lastAutoWritebackStatus:"",lastAutoRefreshConfirmed:t?.lastAutoRefreshConfirmed===!0,lastAutoSkipReason:typeof t?.lastAutoSkipReason=="string"?t.lastAutoSkipReason:"",recentWritebackHistory:e}}function fg(t,e=10){let s=Number.isFinite(e)?Math.max(1,Math.min(50,Math.floor(e))):10;return Array.isArray(t)?t.length<=s?t:t.slice(t.length-s):[]}function Qc(){let t=hs()||{};return Object.entries(t).filter(([e])=>!ao[e]).map(([e,s])=>[e,s||{}])}function Va(t={}){return t?.toolKind==="script"?"script":t?.toolKind==="ai"?"ai":t?.output?.mode==="local_transform"||t?.processor?.type?"script":"ai"}function Zc(){let t=Array.isArray(vr.tools?.subTabs)?vr.tools.subTabs.map((s,r)=>({...s,order:Number.isFinite(s?.order)?s.order:r,toolKind:Va(s),toolGroupLabel:Va(s)==="script"?"\u811A\u672C\u5DE5\u5177":"AI \u5DE5\u5177"})):[],e=Qc().map(([s,r],o)=>{let n=no(s,r),a=Va(n);return{id:s,name:n.name||s,icon:n.icon||"fa-screwdriver-wrench",component:"GenericToolConfigPanel",order:Number.isFinite(n.order)?n.order:100+o,isCustom:!0,description:n.description||"",toolKind:a,toolGroupLabel:a==="script"?"\u811A\u672C\u5DE5\u5177":"AI \u5DE5\u5177"}});return[...t,...e].sort((s,r)=>(s.order??0)-(r.order??0))}function gg(t,e={}){let s=no(t,e,{defaultOutputMode:"follow_ai"});return{...s,runtime:Hs(s.runtime)}}function Xa(t){let e=ao[t];if(e)return{...e,output:{...e.output||{}},bypass:{...e.bypass||{}},worldbooks:{...e.worldbooks||{},selected:Array.isArray(e?.worldbooks?.selected)?[...e.worldbooks.selected]:[]},extraction:{...e.extraction||{}},processor:{...e.processor||{},options:{...e?.processor?.options||{}}},runtime:Hs(e.runtime),extractTags:Array.isArray(e.extractTags)?[...e.extractTags]:[]};let r=(hs()||{})[t]||null;return r?gg(t,r):io(t)}function yn(t){let e=Xa(t);return e?{...e,output:{...e.output||{}},automation:{...e.automation||{}},bypass:{...e.bypass||{}},worldbooks:{...e.worldbooks||{},selected:Array.isArray(e?.worldbooks?.selected)?[...e.worldbooks.selected]:[]},extraction:{...e.extraction||{},selectors:Array.isArray(e?.extraction?.selectors)?[...e.extraction.selectors]:[]},processor:{...e.processor||{},options:{...e?.processor?.options||{}}},runtime:{...e.runtime||{}},extractTags:Array.isArray(e.extractTags)?[...e.extractTags]:[]}:null}function mg(t,e={},s=""){if(!t)return null;let r={...t,...e,id:t.id||e.id};r.output={...t.output||{},...e.output||{}},r.automation={enabled:t?.automation?.enabled===!0||e?.automation?.enabled===!0,settleMs:Number.isFinite(e?.automation?.settleMs)?e.automation.settleMs:Number.isFinite(t?.automation?.settleMs)?t.automation.settleMs:1200,cooldownMs:Number.isFinite(e?.automation?.cooldownMs)?e.automation.cooldownMs:Number.isFinite(t?.automation?.cooldownMs)?t.automation.cooldownMs:5e3},r.bypass={...t.bypass||{},...e.bypass||{}},r.worldbooks={...t.worldbooks||{},...e.worldbooks||{},selected:Array.isArray(e?.worldbooks?.selected)?[...e.worldbooks.selected]:Array.isArray(t?.worldbooks?.selected)?[...t.worldbooks.selected]:[]},r.runtime=Hs({...t.runtime||{},...e.runtime||{}}),r.extraction={...t.extraction||{},...e.extraction||{}},r.processor={...t.processor||{},...e.processor||{},options:{...t?.processor?.options||{},...e?.processor?.options||{}}};let o=e?.output?.apiPreset||e?.apiPreset||r.output?.apiPreset||r.apiPreset||s||"";return r.output={...r.output||{},apiPreset:o},r.apiPreset=o,(!Array.isArray(r.extraction.selectors)||r.extraction.selectors.length===0)&&Array.isArray(r.extractTags)&&r.extractTags.length>0&&(r.extraction.selectors=[...r.extractTags]),(!Array.isArray(r.extractTags)||r.extractTags.length===0)&&(r.extractTags=Array.isArray(r.extraction.selectors)?[...r.extraction.selectors]:[]),t.isCustom?r.enabled=t.enabled!==!1:typeof e.enabled=="boolean"?r.enabled=e.enabled:r.enabled=t.enabled!==!1,r}function ed(t,e){if(!t||typeof t!="string")return Xe.error("\u5DE5\u5177ID\u65E0\u6548"),!1;if(!e||typeof e!="object")return Xe.error("\u5DE5\u5177\u914D\u7F6E\u65E0\u6548"),!1;let s=["name","icon","component"];for(let r of s)if(!e[r])return Xe.error(` \u5DE5\u5177\u7F3A\u5C11\u5FC5\u9700\u5B57\u6BB5: ${r}`),!1;return jt[t]={id:t,...e,order:e.order??Object.keys(jt).length},Xe.log(` \u5DE5\u5177\u5DF2\u6CE8\u518C: ${t}`),!0}function td(t){return jt[t]?(delete jt[t],Xe.log(` \u5DE5\u5177\u5DF2\u6CE8\u9500: ${t}`),!0):(Xe.warn(` \u5DE5\u5177\u4E0D\u5B58\u5728: ${t}`),!1)}function sd(t=!0){let e=Object.values(jt).map(s=>s.id==="tools"?{...s,subTabs:Zc()}:s);return t?e.sort((s,r)=>(s.order??0)-(r.order??0)):e}function io(t){return t==="tools"&&jt[t]?{...jt[t],subTabs:Zc()}:jt[t]||null}function Qa(t){return!!jt[t]}function rd(t){let e=io(t);return!e||!e.hasSubTabs?[]:e.subTabs||[]}function od(){jt={...vr},Xe.log("\u5DE5\u5177\u6CE8\u518C\u8868\u5DF2\u91CD\u7F6E")}function nd(t,e){if(!Qa(t))return Xe.warn(` \u5DE5\u5177\u4E0D\u5B58\u5728: ${t}`),!1;let s=$.get(wt)||{};return s[t]=e||"",$.set(wt,s),Xe.log(` \u5DE5\u5177 "${t}" \u7ED1\u5B9A\u5230\u9884\u8BBE "${e||"\u5F53\u524D\u914D\u7F6E"}"`),!0}function Za(t){return($.get(wt)||{})[t]||""}function ad(t){let e=$.get(wt)||{};delete e[t],$.set(wt,e),Xe.log(` \u5DE5\u5177 "${t}" \u7684API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u6E05\u9664`)}function id(){return $.get(wt)||{}}function ld(t){let e=$.get(wt)||{},s=!1;for(let r in e)e[r]===t&&(e[r]="",s=!0,Xe.log(` \u5DE5\u5177 "${r}" \u7684API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u6E05\u9664\uFF08\u9884\u8BBE\u88AB\u5220\u9664\uFF09`));s&&$.set(wt,e)}function Q(t){let e=Xa(t);if(!e)return io(t);let r=($.get(Ws)||{})[t]||{},o=Za(t);return mg({...e,id:t},r,o)}function pn(t){if(!t)return!1;let e=Xa(t);if(!e)return!1;let s=$.get(Ws)||{};if(s[t])return!0;let r={promptTemplate:e.promptTemplate||"",enabled:e.enabled!==!1,extractTags:Array.isArray(e.extractTags)?[...e.extractTags]:[],apiPreset:e.apiPreset||"",output:{...e.output||{}},automation:{...e.automation||{}},bypass:{...e.bypass||{}},worldbooks:{...e.worldbooks||{},selected:Array.isArray(e?.worldbooks?.selected)?[...e.worldbooks.selected]:[]},extraction:{...e.extraction||{},selectors:Array.isArray(e?.extraction?.selectors)?[...e.extraction.selectors]:[]},processor:{...e.processor||{},options:{...e?.processor?.options||{}}},runtime:{...e.runtime||{}}};s[t]=r,$.set(Ws,s);let o=$.get(wt)||{};return o[t]=r.output?.apiPreset||r.apiPreset||"",$.set(wt,o),P.emit(M.TOOL_UPDATED,{toolId:t,config:r}),!0}function he(t,e,s={}){if(!t||!Q(t))return Xe.warn("\u5DE5\u5177\u4E0D\u5B58\u5728:",t),!1;let{emitEvent:r=!0}=s,o=$.get(Ws)||{},n=$.get(wt)||{},a=e?.output?.apiPreset??e?.apiPreset??"",i=["promptTemplate","enabled","extractTags","apiPreset","output","automation","bypass","worldbooks","extraction","processor","runtime"];return o[t]={},i.forEach(l=>{if(e[l]!==void 0){if(l==="output"&&e.output){o[t][l]={...e.output,apiPreset:a};return}if(l==="apiPreset"){o[t][l]=a;return}o[t][l]=e[l]}}),o[t].apiPreset===void 0&&(o[t].apiPreset=a),!o[t].output&&e.output!==void 0&&(o[t].output={...e.output||{},apiPreset:a}),$.set(Ws,o),n[t]=a,$.set(wt,n),r&&P.emit(M.TOOL_UPDATED,{toolId:t,config:o[t]}),Xe.log(` \u5DE5\u5177\u914D\u7F6E\u5DF2\u4FDD\u5B58: ${t}`),!0}function bg(t,e){let s=Q(t);return s?he(t,{...s,output:{...s.output,mode:e}}):!1}function hg(t,e){let s=Q(t);return s?he(t,{...s,apiPreset:e,output:{...s.output,apiPreset:e}}):!1}function xg(t,e){let s=Q(t);return s?he(t,{...s,bypass:{...s.bypass,...e}}):!1}function vg(t,e){let s=Q(t);return s?he(t,{...s,promptTemplate:e}):!1}function xs(t,e,s={}){let r=Q(t);if(!r)return!1;let{touchLastRunAt:o=!1,emitEvent:n=!1,emitRuntimeEvent:a=!0}=s,i=Hs({...r.runtime||{},...e||{}});o&&(i.lastRunAt=Date.now());let l=he(t,{...r,runtime:i},{emitEvent:n});return l&&a&&P.emit(M.TOOL_RUNTIME_UPDATED,{toolId:t,runtime:i,previousRuntime:Hs(r.runtime||{})}),l}function cd(t,e,s={},r={}){let o=Q(t);if(!o)return!1;let{limit:n=10,emitEvent:a=!1,emitRuntimeEvent:i=!0}=r,l=Hs(o.runtime||{}),c=Hs(o.runtime||{}),d="recentWritebackHistory",u={id:s?.id||`hist_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,at:s?.at||Date.now(),...s};l[d]=fg([...Array.isArray(l[d])?l[d]:[],u],n),u?.traceId&&(l.lastTraceId=u.traceId);let p=he(t,{...o,runtime:l},{emitEvent:a});return p&&i&&P.emit(M.TOOL_RUNTIME_UPDATED,{toolId:t,runtime:l,previousRuntime:c,historyType:e,historyEntry:u}),p}function ei(t,e,s={}){let{touchLastRunAt:r=!0,emitEvent:o=!1,emitRuntimeEvent:n=!0}=s;return xs(t,e,{touchLastRunAt:r,emitEvent:o,emitRuntimeEvent:n})}function dd(t){if(!t||!ao[t])return Xe.warn("\u5DE5\u5177\u4E0D\u5B58\u5728:",t),!1;let e=$.get(Ws)||{};return delete e[t],$.set(Ws,e),P.emit(M.TOOL_UPDATED,{toolId:t,config:null}),Xe.log(` \u5DE5\u5177\u914D\u7F6E\u5DF2\u91CD\u7F6E: ${t}`),!0}function ud(){return{...ao}}function lo(){let t=new Set([...Object.keys(ao),...Qc().map(([e])=>e)]);return Array.from(t).map(e=>Q(e)).filter(Boolean)}function yd(){return lo().filter(t=>t&&t.enabled)}function pd(t,e){let s=$.get(Ja)||{};s[t]={...e,updatedAt:Date.now()},$.set(Ja,s)}function fd(t){return($.get(Ja)||{})[t]||null}var Xe,Ws,wt,Ja,ao,vr,Xc,jt,wg,ts=R(()=>{We();Me();J();un();Xe=I.createScope("ToolRegistry"),Ws="tool_configs",wt="tool_api_bindings",Ja="tool_window_states";ao={summaryTool:{id:"summaryTool",name:"\u6458\u8981\u5DE5\u5177",icon:"fa-file-lines",description:"\u751F\u6210\u5267\u60C5\u6458\u8981\u5757",enabled:!0,order:3,bypass:{enabled:!1,presetId:""},output:{mode:"follow_ai",apiPreset:"",overwrite:!0,enabled:!0},automation:{enabled:!1,settleMs:1200,cooldownMs:5e3},worldbooks:{enabled:!1,selected:[]},extraction:{enabled:!0,maxMessages:5,selectors:["boo_FM"]},promptTemplate:`\u8BF7\u6839\u636E\u4EE5\u4E0BAI\u56DE\u590D\u751F\u6210\u6458\u8981\u5757\uFF1A

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
</youyou>`,runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},apiPreset:"",extractTags:["youyou"]},escapeTransformTool:{id:"escapeTransformTool",name:"\u8F6C\u4E49\u5904\u7406",icon:"fa-quote-left",description:"\u5BF9\u63D0\u53D6\u5185\u5BB9\u6267\u884C\u672C\u5730\u8F6C\u4E49\u6216\u53BB\u8F6C\u4E49",enabled:!0,order:6,output:{mode:"local_transform",apiPreset:"",overwrite:!0,enabled:!0},extraction:{enabled:!0,maxMessages:5,selectors:[]},processor:{type:"escape_transform",direction:"escape",options:{doubleQuote:!0,singleQuote:!1,newline:!1}},runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},extractTags:[]},punctuationTransformTool:{id:"punctuationTransformTool",name:"\u4E2D\u6587\u6807\u70B9\u66FF\u6362",icon:"fa-language",description:"\u5C06\u82F1\u6587\u6807\u70B9\u6309\u52FE\u9009\u9879\u66FF\u6362\u4E3A\u4E2D\u6587\u6807\u70B9",enabled:!0,order:7,output:{mode:"local_transform",apiPreset:"",overwrite:!0,enabled:!0},extraction:{enabled:!0,maxMessages:5,selectors:[]},processor:{type:"punctuation_transform",direction:"en_to_zh",options:{comma:!0,period:!0,exclamation:!0,question:!0,semicolon:!1,colon:!1,leftParen:!1,rightParen:!1}},runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},extractTags:[]}},vr={apiPresets:{id:"apiPresets",name:"API\u9884\u8BBE",icon:"fa-database",hasSubTabs:!1,description:"\u7BA1\u7406API\u914D\u7F6E\u548C\u9884\u8BBE",component:"ApiPresetPanel",order:0},worldbookPresets:{id:"worldbookPresets",name:"\u4E16\u754C\u4E66\u9884\u8BBE",icon:"fa-book-atlas",hasSubTabs:!1,description:"\u7BA1\u7406\u4E16\u754C\u4E66\u6CE8\u5165\u9884\u8BBE\uFF08\u8BAE\u9898 #7\uFF09",component:"WorldbookPresetPanel",order:1},regexExtract:{id:"regexExtract",name:"\u6B63\u5219\u63D0\u53D6",icon:"fa-filter",hasSubTabs:!1,description:"\u4ECE\u6D88\u606F\u4E2D\u63D0\u53D6\u7279\u5B9A\u5185\u5BB9",component:"RegexExtractPanel",order:2,defaultConfig:{execution:{timeout:3e4,retries:1},api:{preset:""},extractRules:[],excludeRules:[]}},toolManage:{id:"toolManage",name:"\u5DE5\u5177\u5217\u8868",icon:"fa-screwdriver-wrench",hasSubTabs:!1,description:"\u521B\u5EFA\u3001\u7F16\u8F91\u548C\u7BA1\u7406\u81EA\u5B9A\u4E49\u5DE5\u5177",component:"ToolManagePanel",order:3},tools:{id:"tools",name:"\u5DE5\u5177",icon:"fa-tools",hasSubTabs:!0,description:"\u5DE5\u5177\u96C6\u5408",order:4,subTabs:[{id:"summaryTool",name:"\u6458\u8981\u5DE5\u5177",icon:"fa-file-lines",component:"SummaryToolPanel",toolKind:"ai"},{id:"statusBlock",name:"\u4E3B\u89D2\u72B6\u6001\u680F",icon:"fa-user-check",component:"StatusBlockPanel",toolKind:"ai"},{id:"youyouReview",name:"\u5C0F\u5E7D\u70B9\u8BC4",icon:"fa-comment-dots",component:"YouyouReviewPanel",toolKind:"ai"},{id:"escapeTransformTool",name:"\u8F6C\u4E49\u5904\u7406",icon:"fa-quote-left",component:"EscapeTransformToolPanel",toolKind:"script"},{id:"punctuationTransformTool",name:"\u4E2D\u6587\u6807\u70B9\u66FF\u6362",icon:"fa-language",component:"PunctuationTransformToolPanel",toolKind:"script"}]},tableWorkbench:{id:"tableWorkbench",name:"\u586B\u8868\u5DE5\u4F5C\u53F0",icon:"fa-table-cells",hasSubTabs:!1,description:"\u7ED3\u6784\u5316\u586B\u8868\u4E0E\u72B6\u6001\u9884\u89C8\u5DE5\u4F5C\u53F0",component:"TableWorkbenchPanel",order:5},bypass:{id:"bypass",name:"Ai\u6307\u4EE4\u9884\u8BBE",icon:"fa-shield-halved",hasSubTabs:!1,description:"\u7BA1\u7406 Ai \u6307\u4EE4\u9884\u8BBE",component:"BypassPanel",order:6},settings:{id:"settings",name:"\u8BBE\u7F6E",icon:"fa-cog",hasSubTabs:!1,description:"\u5168\u5C40\u8BBE\u7F6E",component:"SettingsPanel",order:7},logger:{id:"logger",name:"\u65E5\u5FD7",icon:"fa-terminal",hasSubTabs:!1,description:"\u67E5\u770B\u63D2\u4EF6\u8FD0\u884C\u65E5\u5FD7\uFF0C\u652F\u6301\u8FC7\u6EE4\u4E0E\u5BFC\u51FA",component:"LoggerPanel",order:8}},Xc={api:{name:"API\u5DE5\u5177",icon:"fa-plug",order:0},prompt:{name:"\u63D0\u793A\u8BCD\u5DE5\u5177",icon:"fa-file-alt",order:1},utility:{name:"\u5B9E\u7528\u5DE5\u5177",icon:"fa-wrench",order:2}},jt={...vr};wg={TOOL_REGISTRY:vr,TOOL_CATEGORIES:Xc,registerTool:ed,unregisterTool:td,getToolList:sd,getToolConfig:io,hasTool:Qa,getToolSubTabs:rd,resetToolRegistry:od,setToolApiPreset:nd,getToolApiPreset:Za,clearToolApiPreset:ad,getAllToolApiBindings:id,onPresetDeleted:ld,saveToolWindowState:pd,getToolWindowState:fd,getToolBaseConfig:yn,ensureToolRuntimeConfig:pn,getToolFullConfig:Q,patchToolRuntime:xs,appendToolRuntimeHistory:cd,saveToolConfig:he,resetToolConfig:dd,getAllDefaultToolConfigs:ud,getAllToolFullConfigs:lo,getEnabledTools:yd}});function fn(){return`rgx_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`}function hd(){return`r_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,6)}`}function oi(t={}){let e=Object.values(It).includes(t.type)?t.type:It.INCLUDE;return{id:String(t.id||hd()),name:String(t.name||"").trim(),description:String(t.description||""),type:e,value:String(t.value||""),enabled:t.enabled!==!1}}function vs(t={}){return{id:String(t.id||fn()),name:String(t.name||"").trim()||"\u672A\u547D\u540D\u9884\u8BBE",description:String(t.description||""),rules:Array.isArray(t.rules)?t.rules.map(oi):[],blacklist:Array.isArray(t.blacklist)?t.blacklist.map(e=>String(e||"").trim()).filter(Boolean):[],createdAt:Number.isFinite(t.createdAt)?t.createdAt:Date.now(),updatedAt:Number.isFinite(t.updatedAt)?t.updatedAt:Date.now()}}function ss(){let t=$e.get(ri);return!t||typeof t!="object"?{}:t}function uo(t){$e.set(ri,t)}function Sr(){if(bd)return;bd=!0;let t=$.get(gd)||{};if(t[md]===!0)return;let e=ss(),s=Object.keys(e).length>0,r=0,o={...e},n=t.tagRulePresets||{};for(let a of Object.values(n)){let i=vs({id:fn(),name:a.name||"\u5DF2\u8FC1\u79FB\u9884\u8BBE",description:a.description||"",rules:a.rules||[],blacklist:a.blacklist||[],createdAt:typeof a.createdAt=="string"&&Date.parse(a.createdAt)||Date.now(),updatedAt:Date.now()});o[i.id]=i,r+=1}if(!s&&r===0){let a=Array.isArray(t.tagRules)?t.tagRules:[],i=Array.isArray(t.contentBlacklist)?t.contentBlacklist:[];if(a.length||i.length){let l=vs({name:"\u9ED8\u8BA4\u89C4\u5219\u96C6\uFF08\u8FC1\u79FB\uFF09",description:"\u4ECE\u8001\u7248\u672C\u7684\u5F53\u524D\u89C4\u5219\u8FC1\u79FB\u800C\u6765",rules:a,blacklist:i});o[l.id]=l,$e.set(co,l.id),r+=1}}r>0&&(uo(o),wr.info(`\u5DF2\u4ECE\u8001\u6570\u636E\u8FC1\u79FB ${r} \u4E2A\u6B63\u5219\u9884\u8BBE`)),$.set(gd,{...t,[md]:!0})}function Sg(){Sr();let t=ss();return Object.values(t).map(vs).sort((e,s)=>s.updatedAt-e.updatedAt)}function qs(t){if(!t)return null;Sr();let e=ss();return e[t]?vs(e[t]):null}function gn(){Sr();let t=$e.get(co);return typeof t=="string"&&t?t:""}function xd(){let t=gn();return t?qs(t):null}function Tg(t){let e=ss();return t&&!e[t]?(wr.warn(`setCurrentPresetId \u627E\u4E0D\u5230\u9884\u8BBE: ${t}`),!1):($e.set(co,t||""),ni(),P.emit(M.PRESET_ACTIVATED,{kind:"regex",id:t}),!0)}function vd(t={}){Sr();let e=vs({...t,id:fn(),createdAt:Date.now(),updatedAt:Date.now()}),s=ss();return s[e.id]=e,uo(s),P.emit(M.PRESET_CREATED,{kind:"regex",id:e.id}),wr.info(`\u521B\u5EFA\u9884\u8BBE: ${e.id} (${e.name})`),e}function Ys(t,e={}){if(!t)return null;let s=ss(),r=s[t];if(!r)return null;let o=vs({...r,...e,id:t,createdAt:r.createdAt,updatedAt:Date.now()});return s[t]=o,uo(s),gn()===t&&si(o),P.emit(M.PRESET_UPDATED,{kind:"regex",id:t}),o}function _g(t){if(!t)return!1;let e=ss();return e[t]?(delete e[t],uo(e),gn()===t&&($e.set(co,""),ni()),P.emit(M.PRESET_DELETED,{kind:"regex",id:t}),wr.info(`\u5220\u9664\u9884\u8BBE: ${t}`),!0):!1}function Ag(t,{nameSuffix:e=" \u526F\u672C"}={}){let s=qs(t);return s?vd({...s,name:`${s.name}${e}`}):null}function Eg(t,e){return Ys(t,{name:String(e||"").trim()||"\u672A\u547D\u540D\u9884\u8BBE"})}function Cg(t,e={}){let s=qs(t);if(!s)return null;let r=oi({...e,id:hd()}),o=[...s.rules,r];return Ys(t,{rules:o})}function kg(t,e,s={}){let r=qs(t);if(!r)return null;let o=r.rules.map(n=>n.id===e?oi({...n,...s,id:n.id}):n);return Ys(t,{rules:o})}function Ig(t,e){let s=qs(t);if(!s)return null;let r=s.rules.filter(o=>o.id!==e);return Ys(t,{rules:r})}function Mg(t,e,s){let r=qs(t);if(!r)return null;let o=r.rules.findIndex(i=>i.id===e);if(o<0)return null;let n=s==="up"?o-1:o+1;if(n<0||n>=r.rules.length)return null;let a=[...r.rules];return[a[o],a[n]]=[a[n],a[o]],Ys(t,{rules:a})}function Rg(t,e){let s=Array.isArray(e)?e.map(r=>String(r||"").trim()).filter(Boolean):[];return Ys(t,{blacklist:Array.from(new Set(s))})}function Pg(){return Sr(),{version:1,exportedAt:Date.now(),presets:Object.values(ss()).map(vs)}}function $g(t){if(Sr(),!t||typeof t!="object")return{added:0};let e=Array.isArray(t.presets)?t.presets:[],s=ss(),r=0;for(let o of e){let n=vs({...o,id:fn(),createdAt:Date.now(),updatedAt:Date.now()});s[n.id]=n,r+=1}return r>0&&(uo(s),P.emit(M.PRESET_IMPORTED,{kind:"regex",count:r})),{added:r}}function Dg(){$e.set(ri,{}),$e.set(co,""),ni(),wr.info("\u5DF2\u6E05\u7A7A\u6240\u6709\u6B63\u5219\u9884\u8BBE")}async function si(t){if(t)try{let e=await Promise.resolve().then(()=>(hr(),Ya));typeof e.setCurrentRules=="function"&&e.setCurrentRules(JSON.parse(JSON.stringify(t.rules||[]))),typeof e.setContentBlacklist=="function"&&e.setContentBlacklist(JSON.parse(JSON.stringify(t.blacklist||[])))}catch(e){wr.warn("\u540C\u6B65\u5230 regex-extractor \u5931\u8D25",{error:e})}}function ni(){let t=xd();return si(t||{rules:[],blacklist:[]})}async function Ng(t){if(!t)return[];try{let e=await Promise.resolve().then(()=>(ts(),ti));return(typeof e.getToolList=="function"?e.getToolList(!1):[]).filter(r=>(typeof e.getToolFullConfig=="function"?e.getToolFullConfig(r.id):null)?.extraction?.regexPresetId===t).map(r=>r.id)}catch{return[]}}var wr,ri,co,gd,md,It,bd,oe,mn=R(()=>{We();Me();J();wr=I.createScope("RegexPresetStore"),ri="regex_presets",co="regex_current_preset",gd="settings",md="regex_presets_migrated",It=Object.freeze({INCLUDE:"include",EXCLUDE:"exclude",REGEX_INCLUDE:"regex_include",REGEX_EXCLUDE:"regex_exclude"});bd=!1;oe={listPresets:Sg,getPreset:qs,getCurrentPresetId:gn,getCurrentPreset:xd,setCurrentPresetId:Tg,createPreset:vd,updatePreset:Ys,deletePreset:_g,duplicatePreset:Ag,renamePreset:Eg,addRule:Cg,updateRule:kg,deleteRule:Ig,moveRule:Mg,setBlacklist:Rg,exportAll:Pg,importPresets:$g,resetAll:Dg,findLinkedTools:Ng,RULE_TYPES:It}});var Sd={};te(Sd,{RegexExtractPanel:()=>ai,default:()=>Hg});function wd(t){return t?t.length!==void 0&&typeof t.get=="function"?t.get(0):t:null}function Lg(){return{presets:oe.listPresets(),selectedId:oe.getCurrentPresetId(),testInput:"",testOutput:"",linkedTools:{}}}function bn(t){return t.selectedId&&t.presets.find(e=>e.id===t.selectedId)||null}function Bg(t,e){let s=t.presets.length?t.presets.map(r=>{let o=t.linkedTools[r.id]||[],n=r.rules.filter(a=>a.enabled!==!1).length;return Bs({name:r.name,desc:`${r.rules.length} \u6761\u89C4\u5219\uFF08${n} \u542F\u7528\uFF09 \xB7 ${r.blacklist.length} \u9ED1\u540D\u5355${o.length?` \xB7 \u88AB ${o.length} \u4E2A\u5DE5\u5177\u5F15\u7528`:""}`,active:r.id===t.selectedId,onClick:()=>{oe.setCurrentPresetId(r.id),t.selectedId=r.id,e()},actions:[se({label:"\u590D\u5236",size:"small",variant:"ghost",title:"\u590D\u5236\u6B64\u9884\u8BBE",onClick:a=>{a.stopPropagation();let i=oe.duplicatePreset(r.id);i&&(oe.setCurrentPresetId(i.id),t.selectedId=i.id),e()}}),se({label:"\u270E",size:"small",variant:"ghost",title:"\u91CD\u547D\u540D",onClick:a=>{a.stopPropagation();let i=window.prompt("\u9884\u8BBE\u540D",r.name);i!=null&&(oe.renamePreset(r.id,i),e())}}),se({label:"\xD7",size:"small",variant:"danger",title:"\u5220\u9664",onClick:a=>{a.stopPropagation();let i=t.linkedTools[r.id]||[],l=`\u5220\u9664\u9884\u8BBE "${r.name}" \uFF1F`;i.length&&(l+=`

\u6CE8\u610F\uFF1A\u4EE5\u4E0B ${i.length} \u4E2A\u5DE5\u5177\u5F15\u7528\u4E86\u6B64\u9884\u8BBE\uFF0C\u5220\u9664\u540E\u5B83\u4EEC\u7684\u63D0\u53D6\u5C06\u5931\u6548\uFF1A
  ${i.join(", ")}`),window.confirm(l)&&(oe.deletePreset(r.id),t.selectedId===r.id&&(t.selectedId=oe.getCurrentPresetId()),e())}})]})}):[m("div",{style:{padding:"24px 0",textAlign:"center",color:"var(--yyt-text-muted)",fontSize:"12px"},text:'\u6682\u65E0\u9884\u8BBE\u3002\u70B9\u51FB\u53F3\u4E0A\u89D2"+ \u65B0\u5EFA\u9884\u8BBE"\u5F00\u59CB\u3002'})];return je({heading:"\u9884\u8BBE\u9009\u62E9",icon:"\u{1F516}",actions:[se({label:"+ \u65B0\u5EFA\u9884\u8BBE",size:"small",onClick:()=>{let r=window.prompt("\u65B0\u9884\u8BBE\u540D","\u65B0\u9884\u8BBE");if(r==null)return;let o=oe.createPreset({name:r||"\u65B0\u9884\u8BBE"});oe.setCurrentPresetId(o.id),t.selectedId=o.id,e()}})],content:s})}function zg(t,e){let s=bn(t);if(!s)return null;let r=t.linkedTools[s.id]||[];return je({heading:"\u57FA\u672C\u4FE1\u606F",icon:"\u24D8",content:[gs({label:"\u9884\u8BBE\u540D",control:Jt({value:s.name,onChange:o=>{oe.updatePreset(s.id,{name:o}),e()}})}),gs({label:"\u63CF\u8FF0",control:Jt({value:s.description,placeholder:"\u53EF\u9009 \u2014 \u5907\u6CE8\u7528\u9014",onChange:o=>{oe.updatePreset(s.id,{description:o})}})}),m("div",{style:{marginTop:"10px",padding:"10px 12px",background:"var(--yyt-surface-2)",borderRadius:"var(--yyt-radius-sm)",fontSize:"11px",color:"var(--yyt-text-muted)",lineHeight:"1.7"},html:r.length?`<strong style="color:var(--yyt-text)">\u88AB\u5F15\u7528\uFF1A</strong>${r.map(o=>`<span style="display:inline-block;padding:2px 8px;border-radius:999px;background:var(--yyt-accent-soft);color:var(--yyt-accent);font-weight:600;margin-right:4px;">${o}</span>`).join("")}`:'<strong style="color:var(--yyt-text)">\u88AB\u5F15\u7528\uFF1A</strong>\u6682\u65E0\u5DE5\u5177\u5F15\u7528\u6B64\u9884\u8BBE\u3002\u53EF\u5728\u5DE5\u5177\u914D\u7F6E\u9762\u677F\u7684"\u63D0\u53D6\u914D\u7F6E"\u533A\u5C06\u5DE5\u5177\u7ED1\u5B9A\u5230\u672C\u9884\u8BBE\u3002'})]})}function Ug(t,e,s,r,o){let n=m("div",{style:{display:"grid",gridTemplateColumns:"auto minmax(140px, 1fr) 200px minmax(120px, 2fr) auto",gap:"10px",alignItems:"center",padding:"12px 0",borderTop:s===0?"none":"1px solid var(--yyt-border)",opacity:e.enabled===!1?"0.5":"1"}}),a=m("div",{style:{display:"flex",flexDirection:"column",gap:"2px"}}),i=se({label:"\u25B2",size:"small",variant:"ghost",title:"\u4E0A\u79FB",disabled:s===0,onClick:()=>{oe.moveRule(t.id,e.id,"up"),o()}}),l=se({label:"\u25BC",size:"small",variant:"ghost",title:"\u4E0B\u79FB",disabled:s===r-1,onClick:()=>{oe.moveRule(t.id,e.id,"down"),o()}});for(let h of[i,l])h.el.style.padding="2px 8px",h.el.style.minHeight="auto",h.el.style.fontSize="10px";a.appendChild(i.el),a.appendChild(l.el),n.appendChild(a);let c=m("div",{style:{display:"flex",flexDirection:"column",gap:"2px",minWidth:"0"}}),d=Jt({value:e.name||"",placeholder:"\u89C4\u5219\u540D\uFF08\u53EF\u9009\uFF09",onChange:h=>oe.updateRule(t.id,e.id,{name:h})});d.el.style.fontSize="12px",d.el.style.padding="6px 10px",c.appendChild(d.el),e.description&&c.appendChild(m("div",{text:e.description,style:{fontSize:"10px",color:"var(--yyt-text-muted)"}})),n.appendChild(c);let u=Je({value:e.type,options:Og,onChange:h=>{oe.updateRule(t.id,e.id,{type:h}),o()}});u.el.style.fontSize="11px",u.el.style.padding="6px 10px",n.appendChild(u.el);let p=e.type===It.REGEX_INCLUDE||e.type===It.REGEX_EXCLUDE,y=Jt({value:e.value||"",placeholder:p?"\u6B63\u5219\u8868\u8FBE\u5F0F...":"\u6807\u7B7E\u540D\uFF08\u5982 content\uFF09",onChange:h=>oe.updateRule(t.id,e.id,{value:h})});y.el.style.fontSize="12px",y.el.style.padding="6px 10px",y.el.style.fontFamily="ui-monospace, monospace",n.appendChild(y.el);let f=m("div",{style:{display:"flex",gap:"6px",alignItems:"center"}}),x=Xt({checked:e.enabled!==!1,onChange:h=>{oe.updateRule(t.id,e.id,{enabled:h}),o()}});return x.el.style.padding="0",x.el.style.border="none",x.el.style.background="transparent",f.appendChild(x.el),f.appendChild(se({label:"\xD7",size:"small",variant:"danger",title:"\u5220\u9664\u89C4\u5219",onClick:()=>{window.confirm("\u5220\u9664\u8FD9\u6761\u89C4\u5219\uFF1F")&&(oe.deleteRule(t.id,e.id),o())}}).el),n.appendChild(f),n}function jg(t,e){let s=bn(t);if(!s)return null;let r=s.rules.length?s.rules.map((o,n)=>Ug(s,o,n,s.rules.length,e)):[m("div",{style:{padding:"14px 0",color:"var(--yyt-text-muted)",fontSize:"12px"},text:'\u5C1A\u65E0\u89C4\u5219\u3002\u70B9\u51FB\u53F3\u4E0A\u89D2"+ \u65B0\u589E\u89C4\u5219"\u5F00\u59CB\u6DFB\u52A0\u3002'})];return je({heading:"\u63D0\u53D6\u89C4\u5219",icon:"\u{1F4DC}",actions:[m("span",{text:"\u6309\u987A\u5E8F\u4F9D\u6B21\u5E94\u7528",style:{fontSize:"11px",color:"var(--yyt-text-muted)"}}),se({label:"+ \u65B0\u589E\u89C4\u5219",size:"small",onClick:()=>{oe.addRule(s.id,{type:It.INCLUDE,value:"",enabled:!0}),e()}})],content:r})}function Fg(t,e){let s=bn(t);if(!s)return null;let r=m("textarea",{className:"yyt-textarea",attrs:{rows:"4",placeholder:"\u6BCF\u884C\u4E00\u4E2A\u5173\u952E\u8BCD\uFF0C\u547D\u4E2D\u5373\u8DF3\u8FC7\u8BE5\u63D0\u53D6\u5757\uFF08\u6309\u5B50\u4E32\u5339\u914D\uFF0C\u4E0D\u533A\u5206\u5927\u5C0F\u5199\uFF09"},style:{width:"100%",resize:"vertical"}});return r.value=(s.blacklist||[]).join(`
`),r.addEventListener("change",()=>{let o=r.value.split(`
`).map(n=>n.trim()).filter(Boolean);oe.setBlacklist(s.id,o)}),je({heading:"\u5185\u5BB9\u9ED1\u540D\u5355",icon:"\u26D4",content:[m("div",{className:"yyt-form-hint",text:"\u63D0\u53D6\u51FA\u7684\u5185\u5BB9\u5757\u5982\u679C\u5305\u542B\u4EFB\u610F\u5173\u952E\u8BCD\uFF0C\u5219\u8DF3\u8FC7\u8BE5\u5757\u3002",style:{marginBottom:"8px"}}),r]})}function Kg(t){let e=bn(t);if(!e)return null;let s=m("textarea",{className:"yyt-textarea",attrs:{rows:"6",placeholder:"\u7C98\u8D34\u6D4B\u8BD5\u6587\u672C\uFF08\u5982 AI \u56DE\u590D\u539F\u6587\uFF09..."},style:{width:"100%",resize:"vertical",fontFamily:"ui-monospace, monospace",fontSize:"12px"}});s.value=t.testInput||"",s.addEventListener("input",()=>{t.testInput=s.value});let r=m("div",{style:{padding:"12px",background:"var(--yyt-bg-base)",border:"1px solid var(--yyt-border)",borderRadius:"var(--yyt-radius-sm)",fontFamily:"ui-monospace, monospace",fontSize:"11px",lineHeight:"1.7",color:"var(--yyt-text-muted)",maxHeight:"240px",overflowY:"auto",whiteSpace:"pre-wrap",wordBreak:"break-all",minHeight:"60px"}});return t.testOutput?(r.textContent=t.testOutput,r.style.color="var(--yyt-text)"):r.textContent='// \u70B9\u51FB"\u8FD0\u884C\u6D4B\u8BD5"\u770B\u63D0\u53D6\u7ED3\u679C',je({heading:"\u6D4B\u8BD5\u63D0\u53D6",icon:"\u{1F50D}",actions:[se({label:"\u25B6 \u8FD0\u884C\u6D4B\u8BD5",size:"small",variant:"primary",onClick:()=>{let o=s.value;if(!o.trim()){t.testOutput="// \u6D4B\u8BD5\u8F93\u5165\u4E3A\u7A7A",r.textContent=t.testOutput,r.style.color="var(--yyt-text-muted)";return}try{let n=es(o,e.rules||[],e.blacklist||[]);t.testOutput=n||"// \u6CA1\u6709\u63D0\u53D6\u5230\u5185\u5BB9",r.textContent=t.testOutput,r.style.color=n?"var(--yyt-text)":"var(--yyt-text-muted)"}catch(n){t.testOutput=`// \u6D4B\u8BD5\u51FA\u9519\uFF1A${n?.message||n}`,r.textContent=t.testOutput,r.style.color="var(--yyt-error, #ef4444)"}}}),se({label:"\u6E05\u7A7A\u8F93\u51FA",size:"small",variant:"ghost",onClick:()=>{t.testOutput="",r.textContent='// \u70B9\u51FB"\u8FD0\u884C\u6D4B\u8BD5"\u770B\u63D0\u53D6\u7ED3\u679C',r.style.color="var(--yyt-text-muted)"}})],content:[m("div",{className:"yyt-form-hint",text:"\u4F7F\u7528\u5F53\u524D\u9884\u8BBE\u7684\u89C4\u5219 + \u9ED1\u540D\u5355\u63D0\u53D6\uFF0C\u7ED3\u679C\u4E0E\u8FD0\u884C\u65F6\u4E00\u81F4\u3002",style:{marginBottom:"8px"}}),m("div",{className:"yyt-form-label",text:"\u6D4B\u8BD5\u8F93\u5165",style:{marginBottom:"4px"}}),s,m("div",{className:"yyt-form-label",text:"\u63D0\u53D6\u7ED3\u679C",style:{marginTop:"12px",marginBottom:"4px"}}),r]})}function Wg(t){let e=m("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 20px",borderTop:"1px solid var(--yyt-border)"}}),s=m("div",{style:{display:"flex",gap:"8px"}});s.appendChild(se({label:"\u{1F4E5} \u5BFC\u5165",size:"small",onClick:()=>{let o=window.prompt("\u7C98\u8D34\u5BFC\u51FA\u7684 JSON\uFF1A");if(o)try{let n=JSON.parse(o),a=oe.importPresets(n);window.alert(`\u5BFC\u5165\u5B8C\u6210\uFF1A\u65B0\u589E ${a.added} \u6761`),t()}catch(n){window.alert(`\u5BFC\u5165\u5931\u8D25\uFF1A${n?.message||n}`)}}}).el),s.appendChild(se({label:"\u{1F4E4} \u5BFC\u51FA",size:"small",onClick:()=>{let o=JSON.stringify(oe.exportAll(),null,2);try{navigator.clipboard?.writeText?.(o),window.alert("\u5DF2\u590D\u5236\u5230\u526A\u8D34\u677F")}catch{window.prompt("\u5BFC\u51FA JSON\uFF08\u590D\u5236\u4FDD\u5B58\uFF09\uFF1A",o)}}}).el),e.appendChild(s);let r=m("div",{style:{display:"flex",gap:"8px"}});return r.appendChild(se({label:"\u6E05\u7A7A\u6240\u6709\u9884\u8BBE",size:"small",variant:"danger",onClick:()=>{window.confirm("\u786E\u5B9A\u6E05\u7A7A\u6240\u6709\u6B63\u5219\u9884\u8BBE\uFF1F\u6B64\u64CD\u4F5C\u4E0D\u53EF\u64A4\u9500\u3002")&&(oe.resetAll(),t())}}).el),e.appendChild(r),e}var Tw,Og,ai,Hg,Td=R(()=>{Xr();mn();hr();J();Tw=I.createScope("RegexExtractPanel"),Og=[{value:It.INCLUDE,label:"include \u2014 \u63D0\u53D6\u6807\u7B7E"},{value:It.EXCLUDE,label:"exclude \u2014 \u6392\u9664\u6807\u7B7E"},{value:It.REGEX_INCLUDE,label:"regex_include \u2014 \u6B63\u5219\u63D0\u53D6"},{value:It.REGEX_EXCLUDE,label:"regex_exclude \u2014 \u6B63\u5219\u6392\u9664"}];ai={id:"regexExtractPanel",renderTo(t){let e=wd(t);if(!e)return;if(e._yytRegexPanelCleanup)try{e._yytRegexPanelCleanup()}catch{}let s=Lg();function r(){ai.renderTo(t)}let o=m("div",{className:"yyt-regex-preset-panel",style:{display:"flex",flexDirection:"column",height:"100%"}}),n=[Bg(s,r),zg(s,r),jg(s,r),Fg(s,r),Kg(s)].filter(Boolean);for(let i of n)o.appendChild(i.el);let a=Wg(r);o.appendChild(a),e.innerHTML="",e.appendChild(o),e._yytRegexPanelCleanup=()=>{for(let i of n)try{i.destroy()}catch{}delete e._yytRegexPanelCleanup},Promise.all(s.presets.map(async i=>{try{let l=await oe.findLinkedTools(i.id);return[i.id,l]}catch{return[i.id,[]]}})).then(i=>{let l={};for(let[d,u]of i)l[d]=u;let c=!1;for(let d of Object.keys(l))if((s.linkedTools[d]||[]).join(",")!==l[d].join(",")){c=!0;break}c&&e._yytRegexPanelCleanup&&(s.linkedTools=l,r())})},destroy(t){let e=wd(t);if(e?._yytRegexPanelCleanup)try{e._yytRegexPanelCleanup()}catch{}},getStyles(){return`
      .yyt-regex-preset-panel { gap: 0; }
    `}},Hg=ai});var Ad={};te(Ad,{ToolManagePanel:()=>_d,default:()=>qg});var _d,qg,Ed=R(()=>{Ne();un();ts();_d={id:"toolManagePanel",_removeDialog(t){if(!t?.length)return;let e=t.find("#yyt-tool-dialog-overlay");Ve(e,"yytToolManageDialogSelect"),e.remove()},_getToolkitWindow(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window},_openToolConfig(t){if(!t)return;let s=this._getToolkitWindow()?.YouYouToolkit||window.YouYouToolkit;if(!s){k("warning","\u672A\u627E\u5230\u5DE5\u5177\u7BB1\u5B9E\u4F8B\uFF0C\u65E0\u6CD5\u8DF3\u8F6C\u5230\u5DE5\u5177\u914D\u7F6E");return}s.switchMainTab("tools"),s.switchSubTab("tools",t)},render(t){let e=hs(),s=Object.entries(e),r=s.filter(([,o])=>o?.enabled!==!1).length;return`
      <div class="yyt-tool-manager">
        <!-- Stats -->
        <div class="yyt-flow-section">
          <div class="yyt-stat-row" style="grid-template-columns: 1fr 1fr;">
            <div class="yyt-stat-cell">
              <div class="yyt-stat-label">\u5DE5\u5177\u603B\u6570</div>
              <div class="yyt-stat-value">${s.length}</div>
            </div>
            <div class="yyt-stat-cell">
              <div class="yyt-stat-label">\u5DF2\u542F\u7528</div>
              <div class="yyt-stat-value" style="color: var(--yyt-success);">${r}</div>
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
    `},_renderToolList(t){let e=Object.entries(t);return e.length?`<div class="yyt-list-table">${e.map(([r,o])=>`
      <div class="yyt-list-row ${o.enabled?"yyt-tool-item-enabled":"yyt-tool-item-disabled"}" data-tool-id="${r}">
        <div class="yyt-list-row-icon" style="background: var(--yyt-accent-soft); color: var(--yyt-accent);">
          <i class="fa-solid fa-wrench"></i>
        </div>
        <div class="yyt-list-row-main">
          <div class="yyt-list-row-name">
            ${v(o.name)}
            <span class="yyt-badge" style="background: var(--yyt-accent-soft); color: var(--yyt-accent); margin-left: 6px;">${v(o.category)}</span>
          </div>
          <div class="yyt-list-row-desc">${v(o.description)}</div>
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
      `},bindEvents(t,e){let s=U();!s||!X(t)||(t.off(".yytToolManage"),this._bindToolEvents(t,s),this._bindFileEvents(t,s))},_bindToolEvents(t,e){t.on("change.yytToolManage",".yyt-tool-toggle input",s=>{let r=e(s.currentTarget).closest(".yyt-list-row"),o=r.data("tool-id"),n=e(s.currentTarget).is(":checked");an(o,n),r.toggleClass("yyt-tool-item-enabled",n).toggleClass("yyt-tool-item-disabled",!n),r.find(".yyt-status-dot").toggleClass("yyt-status-dot-on",n).toggleClass("yyt-status-dot-off",!n),k("info",n?"\u5DE5\u5177\u5DF2\u542F\u7528":"\u5DE5\u5177\u5DF2\u7981\u7528")}),t.on("click.yytToolManage","#yyt-add-tool",()=>{this._showToolEditDialog(t,e,null)}),t.on("click.yytToolManage",'.yyt-list-row [data-action="config"]',s=>{let r=e(s.currentTarget).closest(".yyt-list-row").data("tool-id");this._openToolConfig(r)}),t.on("click.yytToolManage",'.yyt-list-row [data-action="edit"]',s=>{let r=e(s.currentTarget).closest(".yyt-list-row").data("tool-id");this._showToolEditDialog(t,e,r)}),t.on("click.yytToolManage",'.yyt-list-row [data-action="delete"]',async s=>{let r=e(s.currentTarget).closest(".yyt-list-row").data("tool-id"),o=xr(r);if(!r||!o||!await De("\u5220\u9664\u5DE5\u5177",`\u786E\u5B9A\u8981\u5220\u9664\u5DE5\u5177"${o.name}"\u5417\uFF1F`,{danger:!0}))return;if(!on(r)){k("error","\u5220\u9664\u5931\u8D25");return}this.renderTo(t),k("success","\u5DE5\u5177\u5DF2\u5220\u9664")})},_bindFileEvents(t,e){t.on("click.yytToolManage","#yyt-import-tools",()=>{t.find("#yyt-import-tools-file").click()}),t.on("change.yytToolManage","#yyt-import-tools-file",async s=>{let r=s.target.files[0];if(r){try{let o=await Vt(r),n=cn(o,{overwrite:!1});k(n.success?"success":"error",n.message),n.success&&this.renderTo(t)}catch(o){k("error",`\u5BFC\u5165\u5931\u8D25: ${o.message}`)}e(s.target).val("")}}),t.on("click.yytToolManage","#yyt-export-tools",()=>{try{let s=ln();zt(s,`youyou_toolkit_tools_${Date.now()}.json`),k("success","\u5DE5\u5177\u5DF2\u5BFC\u51FA")}catch(s){k("error",`\u5BFC\u51FA\u5931\u8D25: ${s.message}`)}}),t.on("click.yytToolManage","#yyt-reset-tools",async()=>{await De("\u91CD\u7F6E\u5DE5\u5177","\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u5DE5\u5177\u5417\uFF1F",{danger:!0})&&(dn(),this.renderTo(t),k("info","\u5DE5\u5177\u5DF2\u91CD\u7F6E"))})},_showToolEditDialog(t,e,s){let r=s?xr(s):null,o=!!r,n=`
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
                       value="${r?v(r.name):""}" placeholder="\u5DE5\u5177\u540D\u79F0">
              </div>
              <div class="yyt-form-group yyt-flex-1">
                <label>\u5206\u7C7B</label>
                <select class="yyt-select" id="yyt-tool-category">
                  <option value="api" ${r?.category==="api"?"selected":""}>API</option>
                  <option value="prompt" ${r?.category==="prompt"?"selected":""}>Prompt</option>
                  <option value="utility" ${r?.category==="utility"?"selected":""}>Utility</option>
                </select>
              </div>
            </div>
            <div class="yyt-form-group">
              <label>\u63CF\u8FF0</label>
              <input type="text" class="yyt-input" id="yyt-tool-desc"
                     value="${r?v(r.description||""):""}" placeholder="\u5DE5\u5177\u63CF\u8FF0">
            </div>
            <div class="yyt-form-row">
              <div class="yyt-form-group yyt-flex-1">
                <label>\u8D85\u65F6\u65F6\u95F4(ms)</label>
                <input type="number" class="yyt-input" id="yyt-tool-timeout"
                       value="${r?.config?.execution?.timeout||6e4}">
              </div>
              <div class="yyt-form-group yyt-flex-1">
                <label>\u91CD\u8BD5\u6B21\u6570</label>
                <input type="number" class="yyt-input" id="yyt-tool-retries"
                       value="${r?.config?.execution?.retries||3}">
              </div>
            </div>
          </div>
          <div class="yyt-dialog-footer">
            <button class="yyt-btn yyt-btn-secondary" id="yyt-tool-dialog-cancel">\u53D6\u6D88</button>
            <button class="yyt-btn yyt-btn-primary" id="yyt-tool-dialog-save">\u4FDD\u5B58</button>
          </div>
        </div>
      </div>
    `;this._removeDialog(t),t.append(n);let a=t.find("#yyt-tool-dialog-overlay"),i=a.find("#yyt-tool-name"),l=a.find("#yyt-tool-category"),c=a.find("#yyt-tool-desc"),d=a.find("#yyt-tool-timeout"),u=a.find("#yyt-tool-retries");bt(a,{namespace:"yytToolManageDialogSelect",selectors:["#yyt-tool-category"]});let p=()=>{Ve(a,"yytToolManageDialogSelect"),a.remove()};a.find("#yyt-tool-dialog-close, #yyt-tool-dialog-cancel").on("click",p),a.on("click",function(y){y.target===this&&p()}),a.find("#yyt-tool-dialog-save").on("click",()=>{let y=i.val().trim(),f=l.val(),x=c.val().trim(),h=parseInt(d.val())||6e4,C=parseInt(u.val())||3;if(!y){k("warning","\u8BF7\u8F93\u5165\u5DE5\u5177\u540D\u79F0"),i.trigger("focus").trigger("select");return}let T=s||`tool_${Date.now()}`;if(!rn(T,{name:y,category:f,description:x,promptTemplate:r?.promptTemplate||"",extractTags:Array.isArray(r?.extractTags)?r.extractTags:[],config:{execution:{timeout:h,retries:C},api:r?.config?.api||{preset:"",useBypass:!1,bypassPreset:""},messages:Array.isArray(r?.config?.messages)?r.config.messages:[],context:{depth:r?.config?.context?.depth||3,includeTags:Array.isArray(r?.config?.context?.includeTags)?r.config.context.includeTags:[],excludeTags:Array.isArray(r?.config?.context?.excludeTags)?r.config.context.excludeTags:[]},worldbooks:{enabled:r?.config?.worldbooks?.enabled===!0,selected:Array.isArray(r?.config?.worldbooks?.selected)?r.config.worldbooks.selected:[]}},enabled:r?.enabled!==!1})){k("error",o?"\u5DE5\u5177\u66F4\u65B0\u5931\u8D25":"\u5DE5\u5177\u521B\u5EFA\u5931\u8D25");return}pn(T),p(),this.renderTo(t),k("success",o?"\u5DE5\u5177\u5DF2\u66F4\u65B0":"\u5DE5\u5177\u5DF2\u521B\u5EFA"),o||this._openToolConfig(T)})},destroy(t){!U()||!X(t)||(this._removeDialog(t),t.off(".yytToolManage"))},getStyles(){return`
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
    `},renderTo(t){let e=this.render({});t.html(e),this.bindEvents(t,{})}},qg=_d});var kd={};te(kd,{BypassManager:()=>hn,DEFAULT_BYPASS_PRESETS:()=>os,addMessage:()=>lm,buildBypassMessages:()=>pm,bypassManager:()=>ee,createPreset:()=>tm,default:()=>fm,deleteMessage:()=>dm,deletePreset:()=>rm,duplicatePreset:()=>om,exportPresets:()=>um,getAllPresets:()=>Zg,getDefaultPresetId:()=>nm,getEnabledMessages:()=>im,getPreset:()=>em,getPresetList:()=>yo,importPresets:()=>ym,setDefaultPresetId:()=>am,updateMessage:()=>cm,updatePreset:()=>sm});function Cd(t){let e=String(t||"").trim().toLowerCase();return e==="system"?"SYSTEM":e==="assistant"||e==="ai"?"assistant":"USER"}function Jg(t){return t&&typeof t=="object"&&typeof t.content=="string"&&!t.name&&!Array.isArray(t.messages)}function Xg(t){return String(t||"").replace(/\$0/g,"{{toolContentMacro}}").replace(/\$1/g,"{{rawRecentMessagesText}}").replace(/\$4/g,"{{toolWorldbookContent}}").replace(/\$8/g,"{{userMessage}}").replace(/\$C/g,"{{characterCard}}")}function Qg(t,e,s){let r=t.mainSlot||(t.isMain?"A":t.isMain2?"B":"");return{id:typeof t.id=="string"&&t.id.trim()?t.id.trim():`${s}_msg_${e+1}`,role:Cd(t.role),content:Xg(t.content),enabled:t.enabled!==!1,deletable:t.deletable!==!1,...r?{mainSlot:r,isMain:r==="A",isMain2:r==="B"}:{}}}var Yg,rs,Tr,ii,Gg,os,Vg,hn,ee,Zg,yo,em,tm,sm,rm,om,nm,am,im,lm,cm,dm,um,ym,pm,fm,_r=R(()=>{We();Me();J();Yg=I.createScope("BypassManager"),rs="bypass_presets",Tr="default_bypass_preset",ii="current_bypass_preset",Gg=Object.freeze([{id:"table_fill_default_msg_1",role:"SYSTEM",content:"\u4F60\u662F\u4E00\u4E2A\u52A9\u624B\uFF0C\u8D1F\u8D23\u542C\u4ECE\u7528\u6237\u7684\u6307\u4EE4\u5B8C\u6210\u4F60\u7684\u5DE5\u4F5C",enabled:!0,deletable:!0},{id:"table_fill_default_msg_2",role:"assistant",content:"\u6536\u5230\uFF0C\u6211\u5C06\u5145\u5206\u63CF\u7ED8\u7528\u6237\u7684\u610F\u5FD7\uFF0C\u6BEB\u4E0D\u5077\u61D2\uFF0C\u5E76\u4E14\u6211\u4E00\u5B9A\u4F1A\u9075\u7167\u7528\u6237\u7684\u8981\u6C42",enabled:!0,deletable:!0},{id:"table_fill_default_msg_3",role:"USER",content:`\u4EE5\u4E0B\u662F\u4F60\u53EF\u80FD\u9700\u8981\u7528\u5230\u7684\u80CC\u666F\u8BBE\u5B9A\uFF0C\u6CE8\u610F\u4F60\u53EA\u9700\u8981\u5176\u4E2D\u5173\u4E8E\u5267\u60C5\u4EE5\u53CA\u4EBA\u8BBE\u65B9\u9762\u7684\u6570\u636E\uFF0C\u4E0D\u9700\u8981\u601D\u8003\u91CC\u8FB9\u9664\u6B64\u4E4B\u5916\u7684\u4EFB\u4F55\u683C\u5F0F\u6216\u8005\u601D\u7EF4\u94FE\u65B9\u9762\u7684\u8981\u6C42\uFF1A
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

{{userMessage}}`,enabled:!0,deletable:!1,mainSlot:"B",isMain2:!0},{id:"table_fill_default_msg_8",role:"assistant",content:"\u6536\u5230\u6307\u4EE4\uFF0C\u6211\u5C06\u4E00\u6B65\u4E00\u6B65\u5F00\u59CB\u601D\u8003\uFF0C\u5E76\u5B8C\u6210\u586B\u8868\uFF0C\u9996\u5148\u6211\u8981\u5206\u6790\u5F53\u524D\u8F6E\u6B21\u7684\u5267\u60C5\u53D8\u5316\u3002",enabled:!0,deletable:!0}]),os={table_workbench_fill_default:{id:"table_workbench_fill_default",name:"\u9ED8\u8BA4\u586B\u8868 Ai \u6307\u4EE4\u9884\u8BBE",description:"\u7528\u4E8E\u586B\u8868\u5DE5\u4F5C\u53F0\u7684\u5185\u7F6E Ai \u6307\u4EE4\u9884\u8BBE\uFF0C\u53EF\u590D\u5236\u540E\u6309\u9700\u7F16\u8F91\u3002",enabled:!0,messages:Gg.map(t=>({...t})),createdAt:0,updatedAt:0}},Vg=new Set(["\u6807\u51C6\u7834\u9650\u8BCD","\u589E\u5F3A\u7834\u9650"]);hn=class{constructor(){this._cache=null,this._migrated=!1,this.debugMode=!1}getAllPresets(){if(this._migrateLegacyData(),this._cache)return this._cache;let e=$.get(rs,{});return this._cache={...os,...e},this._cache}getPresetList(){let e=this.getAllPresets();return Object.values(e).sort((s,r)=>(r.updatedAt||0)-(s.updatedAt||0))}getPreset(e){return e&&this.getAllPresets()[e]||null}presetExists(e){return!!this.getPreset(e)}createPreset(e){let{id:s,name:r,description:o,messages:n}=e;if(!s||typeof s!="string"||!s.trim())return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};if(!r||typeof r!="string"||!r.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let a=s.trim();if(this.presetExists(a))return{success:!1,message:`\u9884\u8BBE "${a}" \u5DF2\u5B58\u5728`};let i={id:a,name:r.trim(),description:o||"",enabled:!0,messages:n||[],createdAt:Date.now(),updatedAt:Date.now()};return this._savePreset(a,i),P.emit(M.BYPASS_PRESET_CREATED,{presetId:a,preset:i}),this._log(`\u9884\u8BBE\u5DF2\u521B\u5EFA: ${a}`),{success:!0,message:`\u9884\u8BBE "${r}" \u521B\u5EFA\u6210\u529F`,preset:i}}updatePreset(e,s){if(!e)return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};let r=this.getPreset(e);if(!r)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};if(s.id&&s.id!==e)return{success:!1,message:"\u4E0D\u5141\u8BB8\u4FEE\u6539\u9884\u8BBEID"};let o={...r,...s,id:e,updatedAt:Date.now()};return this._savePreset(e,o),P.emit(M.BYPASS_PRESET_UPDATED,{presetId:e,preset:o}),this._log(`\u9884\u8BBE\u5DF2\u66F4\u65B0: ${e}`),{success:!0,message:`\u9884\u8BBE "${r.name}" \u66F4\u65B0\u6210\u529F`,preset:o}}deletePreset(e){if(!e)return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};if(os[e])return{success:!1,message:"\u4E0D\u5141\u8BB8\u5220\u9664\u9ED8\u8BA4\u9884\u8BBE"};let s=this.getPreset(e);if(!s)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let r=$.get(rs,{});return delete r[e],$.set(rs,r),this._cache=null,this.getDefaultPresetId()===e&&this.setDefaultPresetId(null),P.emit(M.BYPASS_PRESET_DELETED,{presetId:e}),this._log(`\u9884\u8BBE\u5DF2\u5220\u9664: ${e}`),{success:!0,message:`\u9884\u8BBE "${s.name}" \u5DF2\u5220\u9664`}}duplicatePreset(e,s,r){let o=this.getPreset(e);if(!o)return{success:!1,message:`\u6E90\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};if((!s||!s.trim())&&(s=`${e}_copy_${Date.now()}`),this.presetExists(s))return{success:!1,message:`\u9884\u8BBE "${s}" \u5DF2\u5B58\u5728`};let n={...JSON.parse(JSON.stringify(o)),id:s.trim(),name:r||`${o.name} (\u526F\u672C)`,createdAt:Date.now(),updatedAt:Date.now()};return this._savePreset(s.trim(),n),P.emit(M.BYPASS_PRESET_CREATED,{presetId:s,preset:n}),{success:!0,message:`\u9884\u8BBE\u5DF2\u590D\u5236\u4E3A "${n.name}"`,preset:n}}addMessage(e,s){let r=this.getPreset(e);if(!r)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let o={id:`msg_${Date.now()}`,role:Cd(s.role||"SYSTEM"),content:s.content||"",enabled:s.enabled!==!1,deletable:s.deletable!==!1,...s.mainSlot?{mainSlot:s.mainSlot}:{}},n=[...r.messages||[],o];return this.updatePreset(e,{messages:n})}updateMessage(e,s,r){let o=this.getPreset(e);if(!o)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let n=o.messages||[],a=n.findIndex(l=>l.id===s);if(a===-1)return{success:!1,message:`\u6D88\u606F "${s}" \u4E0D\u5B58\u5728`};let i=[...n];return i[a]={...i[a],...r},this.updatePreset(e,{messages:i})}deleteMessage(e,s){let r=this.getPreset(e);if(!r)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let o=r.messages||[],n=o.find(i=>i.id===s);if(!n)return{success:!1,message:`\u6D88\u606F "${s}" \u4E0D\u5B58\u5728`};if(n.deletable===!1)return{success:!1,message:"\u8BE5\u6D88\u606F\u4E0D\u53EF\u5220\u9664"};let a=o.filter(i=>i.id!==s);return this.updatePreset(e,{messages:a})}getEnabledMessages(e){let s=this.getPreset(e);return!s||!s.enabled?[]:(s.messages||[]).filter(r=>r.enabled!==!1)}getDefaultPresetId(){this._migrateLegacyData();let e=$.get(Tr,null);return e==="undefined"||e==="null"||e===""?($.remove(Tr),null):e}setDefaultPresetId(e){return e&&!this.presetExists(e)?!1:($.set(Tr,e),P.emit(M.BYPASS_PRESET_ACTIVATED,{presetId:e}),this._log(`\u9ED8\u8BA4\u9884\u8BBE\u5DF2\u8BBE\u7F6E: ${e}`),!0)}getDefaultPreset(){let e=this.getDefaultPresetId();return e?this.getPreset(e):null}exportPresets(e=null){if(e){let r=this.getPreset(e);if(!r)throw new Error(`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`);return JSON.stringify(r,null,2)}let s=this.getAllPresets();return JSON.stringify({version:"1.0.0",exportedAt:new Date().toISOString(),presets:Object.values(s)},null,2)}importPresets(e,s={}){let{overwrite:r=!1,name:o=""}=s,n;try{n=JSON.parse(e)}catch{return{success:!1,message:"JSON\u89E3\u6790\u5931\u8D25",imported:0}}let a=$.get(rs,{}),l=Array.isArray(n)&&n.every(Jg)?[{id:this._generatePresetId(o||"\u5BFC\u5165\u586B\u8868\u6307\u4EE4\u9884\u8BBE",a),name:o||"\u5BFC\u5165\u586B\u8868\u6307\u4EE4\u9884\u8BBE",description:"\u7531\u5916\u90E8\u586B\u8868\u63D0\u793A\u8BCD\u7EC4\u5BFC\u5165\u3002",enabled:!0,messages:n}]:Array.isArray(n)?n:n.presets?n.presets:[n];if(l.length===0)return{success:!1,message:"\u6CA1\u6709\u627E\u5230\u6709\u6548\u7684\u9884\u8BBE\u6570\u636E",imported:0};let c=0;for(let d of l){let u=this._normalizePreset(d?.id,d,a);u&&(os[u.id]&&!r||!r&&a[u.id]||(a[u.id]={...u,updatedAt:Date.now()},c++))}return c>0&&($.set(rs,a),this._cache=null),{success:!0,message:`\u6210\u529F\u5BFC\u5165 ${c} \u4E2A\u9884\u8BBE`,imported:c}}getToolBypassPreset(e){if(!e?.bypass?.enabled)return null;let s=e?.bypass?.presetId;return s?this.getPreset(s):this.getDefaultPreset()}buildBypassMessages(e){let s=this.getToolBypassPreset(e);return s?this.getEnabledMessages(s.id):[]}_savePreset(e,s){let r=$.get(rs,{});r[e]=s,$.set(rs,r),this._cache=null}_migrateLegacyData(){if(this._migrated)return;let e=$.get(rs,{}),s={},r=!1,o=Array.isArray(e)?e.map((n,a)=>[n?.id||n?.name||`legacy_${a}`,n]):Object.entries(e||{});for(let[n,a]of o){let i=this._normalizePreset(n,a,s);if(!i){r=!0;continue}s[i.id]=i,(!e?.[i.id]||e?.[i.id]?.id!==i.id)&&(r=!0)}r&&$.set(rs,s),this._migrateDefaultPreset(s),this._cache=null,this._migrated=!0}_normalizePreset(e,s,r={}){if(!s||typeof s!="object")return null;let o=typeof s.name=="string"?s.name.trim():"",n=typeof s.id=="string"?s.id.trim():"",a=typeof e=="string"?e.trim():"";if(!o&&a&&a!=="undefined"&&a!=="null"&&(o=a),this._isLegacySamplePreset(o,n)||(!n&&a&&a!=="undefined"&&a!=="null"&&(n=a),!n&&o&&o!=="undefined"&&o!=="null"&&(n=this._generatePresetId(o,r)),!o||!n||n==="undefined"||o==="undefined"))return null;let l=Array.isArray(s.messages)?s.messages.filter(c=>c&&typeof c=="object").map((c,d)=>Qg(c,d,n)):[];return{...s,id:n,name:o,description:typeof s.description=="string"?s.description:"",enabled:s.enabled!==!1,messages:l,createdAt:s.createdAt||Date.now(),updatedAt:s.updatedAt||Date.now()}}_migrateDefaultPreset(e){let s=$.get(Tr,null),r=$.get(ii,null),o=s??r;(o==="undefined"||o==="null"||o==="")&&(o=null),o&&!e[o]&&(o=Object.values(e).find(a=>a.name===o)?.id||null),o?$.set(Tr,o):$.remove(Tr),$.has(ii)&&$.remove(ii)}_isLegacySamplePreset(e,s=""){return e?s==="standard"||s==="enhanced"||s==="jailbreak"||Vg.has(e)?!0:/^增强破限（副本）(?:\s*\(\d+\))?$/.test(e):!1}_generatePresetId(e,s={}){let r=String(e).trim().toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g,"_").replace(/^_+|_+$/g,"")||`bypass_${Date.now()}`,o=r,n=1;for(;s[o];)o=`${r}_${n++}`;return o}_log(...e){Yg.debug(e[0],e.length>1?e.slice(1):void 0)}},ee=new hn,Zg=()=>ee.getAllPresets(),yo=()=>ee.getPresetList(),em=t=>ee.getPreset(t),tm=t=>ee.createPreset(t),sm=(t,e)=>ee.updatePreset(t,e),rm=t=>ee.deletePreset(t),om=(t,e,s)=>ee.duplicatePreset(t,e,s),nm=()=>ee.getDefaultPresetId(),am=t=>ee.setDefaultPresetId(t),im=t=>ee.getEnabledMessages(t),lm=(t,e)=>ee.addMessage(t,e),cm=(t,e,s)=>ee.updateMessage(t,e,s),dm=(t,e)=>ee.deleteMessage(t,e),um=t=>ee.exportPresets(t),ym=(t,e)=>ee.importPresets(t,e),pm=t=>ee.buildBypassMessages(t),fm=ee});var Id={};te(Id,{DEFAULT_SETTINGS:()=>po,SettingsService:()=>xn,default:()=>gm,settingsService:()=>St});var po,li,xn,St,gm,fo=R(()=>{We();Me();po={executor:{maxConcurrent:3,maxRetries:2,retryDelayMs:5e3,requestTimeoutMs:9e4,queueStrategy:"fifo"},automation:{enabled:!0,settleMs:1200,cooldownMs:5e3,maxConcurrentSlots:1},debug:{enableDebugLog:!1,saveExecutionHistory:!0,showRuntimeBadge:!0},ui:{compactMode:!1,animationEnabled:!0,theme:"dark-blue",startupScreenDismissed:!1}},li="settings_v2",xn=class{constructor(){this._cache=null}getSettings(){if(this._cache)return this._cache;let e=$.get(li,{});return this._cache=this._mergeWithDefaults(e),this._cache}saveSettings(e){this._cache=this._mergeWithDefaults(e),$.set(li,this._cache),P.emit(M.SETTINGS_UPDATED,{settings:this._cache})}updateSettings(e){let s=this.getSettings(),r=this._deepMerge(s,e);this.saveSettings(r)}getExecutorSettings(){return this.getSettings().executor}updateExecutorSettings(e){this.updateSettings({executor:e})}getAutomationSettings(){return this.getSettings().automation}updateAutomationSettings(e){this.updateSettings({automation:e})}getDebugSettings(){return this.getSettings().debug}updateDebugSettings(e){this.updateSettings({debug:e})}getUiSettings(){return this.getSettings().ui}updateUiSettings(e){this.updateSettings({ui:e})}resetSettings(){this._cache=JSON.parse(JSON.stringify(po)),$.set(li,this._cache),P.emit(M.SETTINGS_UPDATED,{settings:this._cache,reset:!0})}get(e,s=null){let r=this.getSettings(),o=e.split("."),n=r;for(let a of o)if(n&&typeof n=="object"&&a in n)n=n[a];else return s;return n}set(e,s){let r=JSON.parse(JSON.stringify(this.getSettings())),o=e.split("."),n=r;for(let a=0;a<o.length-1;a+=1){let i=o[a];i in n||(n[i]={}),n=n[i]}n[o[o.length-1]]=s,this.saveSettings(r)}_mergeWithDefaults(e){return this._deepMerge(JSON.parse(JSON.stringify(po)),e)}_deepMerge(e,s){let r={...e};for(let o in s)s[o]&&typeof s[o]=="object"&&!Array.isArray(s[o])?r[o]=this._deepMerge(e[o]||{},s[o]):r[o]=s[o];return r}},St=new xn,gm=St});function Md(t){if(!t)return"";let e=String(t).trim();return e=e.replace(/([a-z0-9])([A-Z])/g,"$1_$2"),e.toUpperCase()}function vn(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window}function Gs(){try{return vn()?.SillyTavern||null}catch{return null}}function wn(t){try{return(t||Gs())?.getContext?.()||null}catch{return null}}function ci(t,e){if(!t)return null;let s=typeof t?.on=="function"||typeof t?.addListener=="function",r=typeof t?.off=="function"||typeof t?.removeListener=="function";return!s||!r?null:{source:e,eventSource:t,capabilities:{on:typeof t?.on=="function",off:typeof t?.off=="function",addListener:typeof t?.addListener=="function",removeListener:typeof t?.removeListener=="function"}}}function mm(){let t=vn(),e=Gs(),s=wn(e),o=[ci(e?.eventSource,"SillyTavern.eventSource"),ci(s?.eventSource,"SillyTavern.getContext().eventSource"),ci(t?.eventSource,"topWindow.eventSource")].filter(Boolean)[0]||null,n=e?.eventTypes||e?.event_types||s?.eventTypes||s?.event_types||t?.eventTypes||t?.event_types||{};return{topWindow:t,api:e,context:s,eventSource:o?.eventSource||null,eventTypes:n,source:o?.source||"unavailable",capabilities:o?.capabilities||null,hasBridge:!!o?.eventSource}}var dt,Ce,bm,Rd,di,st,Sn=R(()=>{J();dt=I.createScope("HostEvents"),Ce=Object.freeze({MESSAGE_SENT:"MESSAGE_SENT",MESSAGE_RECEIVED:"MESSAGE_RECEIVED",MESSAGE_UPDATED:"MESSAGE_UPDATED",MESSAGE_DELETED:"MESSAGE_DELETED",MESSAGE_EDITED:"MESSAGE_EDITED",USER_MESSAGE_RENDERED:"USER_MESSAGE_RENDERED",IMPERSONATE_READY:"IMPERSONATE_READY",GENERATION_STOPPED:"GENERATION_STOPPED",GENERATION_AFTER_COMMANDS:"GENERATION_AFTER_COMMANDS",CHAT_CHANGED:"CHAT_CHANGED"});bm=1500,Rd=20,di=class{constructor(){this._bridge=null,this._pending=[],this._initAttempts=0,this._retryTimer=null,this._readyResolvers=[],this._initialized=!1,this._disposed=!1}subscribe(e,s,r={}){if(!e||typeof s!="function")return dt.warn("subscribe \u65E0\u6548\u53C2\u6570",{eventKey:e,handlerType:typeof s}),()=>{};if(this._disposed)return dt.warn("subscribe \u5728 dispose \u4E4B\u540E\u88AB\u8C03\u7528",{eventKey:e}),()=>{};let o={key:Md(e),rawKey:e,handler:s,options:r,attached:!1,_hostName:"",_hostUnsubscribe:null,_disposed:!1};return this._pending.push(o),this._ensureInitialized(),this._bridge?.hasBridge&&this._attachEntry(o),()=>{if(o._disposed)return;o._disposed=!0;let n=this._pending.indexOf(o);if(n>=0&&this._pending.splice(n,1),o.attached&&typeof o._hostUnsubscribe=="function")try{o._hostUnsubscribe()}catch(a){dt.warn("\u53D6\u6D88\u5BBF\u4E3B\u8BA2\u9605\u5931\u8D25",{event:o._hostName,error:a})}}}async emit(e,...s){if(this._ensureInitialized(),!this._bridge?.hasBridge)return dt.debug("emit \u65F6\u5BBF\u4E3B\u6865\u672A\u5C31\u7EEA\uFF0C\u8DF3\u8FC7",{eventKey:e}),!1;let r=this._resolveHostEventName(e);if(!r)return!1;let{eventSource:o}=this._bridge;try{if(typeof o?.emit=="function")return await o.emit(r,...s),!0;if(typeof o?.dispatch=="function")return await o.dispatch(r,...s),!0}catch(n){dt.warn("emit \u629B\u9519",{eventKey:e,hostName:r,error:n})}return!1}ready({timeoutMs:e=1e4}={}){return this._ensureInitialized(),this._bridge?.hasBridge?Promise.resolve(!0):new Promise(s=>{let r=!1,o=a=>{r||(r=!0,s(a))},n=e>0?setTimeout(()=>o(!1),e):null;this._readyResolvers.push(a=>{n&&clearTimeout(n),o(a)})})}describe(){this._ensureInitialized();let e=this._bridge?.eventTypes||{};return{initialized:this._initialized,source:this._bridge?.source||"unavailable",hasBridge:!!this._bridge?.hasBridge,initAttempts:this._initAttempts,retryScheduled:!!this._retryTimer,pendingCount:this._pending.filter(s=>!s.attached).length,attachedCount:this._pending.filter(s=>s.attached).length,availableEvents:Object.keys(e).slice(0,100)}}reinit(){if(this._disposed)return!1;for(let e of this._pending){if(e.attached&&typeof e._hostUnsubscribe=="function")try{e._hostUnsubscribe()}catch{}e.attached=!1,e._hostUnsubscribe=null,e._hostName=""}return this._bridge=null,this._initialized=!1,this._initAttempts=0,this._retryTimer&&(clearTimeout(this._retryTimer),this._retryTimer=null),this._ensureInitialized()}dispose(){this._retryTimer&&(clearTimeout(this._retryTimer),this._retryTimer=null);for(let e of this._pending){if(e.attached&&typeof e._hostUnsubscribe=="function")try{e._hostUnsubscribe()}catch{}e._disposed=!0}this._pending=[],this._readyResolvers=[],this._bridge=null,this._initialized=!1,this._disposed=!0}_ensureInitialized(){if(this._disposed)return!1;if(this._initialized&&this._bridge?.hasBridge)return!0;this._initAttempts+=1;let e=mm();if(this._bridge=e,this._initialized=!0,!e.hasBridge)return dt.debug(`\u5BBF\u4E3B\u6865\u672A\u5C31\u7EEA (attempt ${this._initAttempts})`,{source:e.source}),this._scheduleRetry(),!1;dt.info("\u5BBF\u4E3B\u6865\u5DF2\u5C31\u7EEA",{source:e.source,eventTypesCount:Object.keys(e.eventTypes).length});for(let r of this._pending)!r.attached&&!r._disposed&&this._attachEntry(r);let s=this._readyResolvers.slice();this._readyResolvers=[];for(let r of s)try{r(!0)}catch{}return!0}_scheduleRetry(){if(!this._retryTimer){if(this._initAttempts>=Rd){dt.warn(`\u5DF2\u8FBE\u6700\u5927\u91CD\u8BD5\u6B21\u6570 (${Rd})\uFF0C\u505C\u6B62\u91CD\u8BD5`);let e=this._readyResolvers.slice();this._readyResolvers=[];for(let s of e)try{s(!1)}catch{}return}this._retryTimer=setTimeout(()=>{this._retryTimer=null,this._initialized=!1,this._ensureInitialized()},bm)}}_resolveHostEventName(e){let s=Md(e),r=this._bridge?.eventTypes||{};if(r[s])return r[s];let o=s.toLowerCase();if(r[o])return r[o];let n=String(e).trim();return n&&n===n.toLowerCase()?n:o}_attachEntry(e){if(!this._bridge?.hasBridge||e.attached||e._disposed)return;let s=this._resolveHostEventName(e.rawKey);if(!s){dt.warn("\u65E0\u6CD5\u89E3\u6790\u5BBF\u4E3B\u4E8B\u4EF6\u540D",{rawKey:e.rawKey});return}let{eventSource:r}=this._bridge,o=typeof r?.on=="function"?r.on.bind(r):typeof r?.addListener=="function"?r.addListener.bind(r):null,n=typeof r?.off=="function"?r.off.bind(r):typeof r?.removeListener=="function"?r.removeListener.bind(r):null;if(!o||!n){dt.warn("\u5BBF\u4E3B eventSource \u7F3A\u5C11 on/off \u65B9\u6CD5");return}try{o(s,e.handler),e.attached=!0,e._hostName=s,e._hostUnsubscribe=()=>{try{n(s,e.handler)}catch(a){dt.warn("\u53D6\u6D88\u5BBF\u4E3B\u8BA2\u9605\u5931\u8D25",{event:s,error:a})}},dt.debug(`\u7ED1\u5B9A\u5BBF\u4E3B\u4E8B\u4EF6: "${s}" (key=${e.key})`)}catch(a){dt.error(`\u7ED1\u5B9A\u5BBF\u4E3B\u4E8B\u4EF6\u5931\u8D25: "${s}"`,{error:a})}}},st=new di});var $d={};te($d,{ContextInjector:()=>An,DEFAULT_INJECTION_OPTIONS:()=>Pd,WRITEBACK_METHODS:()=>Mt,WRITEBACK_RESULT_STATUS:()=>_n,contextInjector:()=>ut,default:()=>vm});function ui(t){return typeof t=="number"&&Number.isFinite(t)?String(t):typeof t=="string"&&t.trim()?t.trim():""}function Vs(t,e){let s=String(e||"").trim();return s?Array.isArray(t)?(t.includes(s)||t.push(s),t):[s]:t}function Tn(t={}){if(t?.signal?.aborted)return"\u5DE5\u5177\u7ED3\u679C\u5DF2\u53D6\u6D88\uFF0C\u8DF3\u8FC7\u5199\u56DE";if(typeof t?.shouldAbortWriteback=="function")try{if(t.shouldAbortWriteback()===!0)return"\u5DE5\u5177\u7ED3\u679C\u5DF2\u8FC7\u671F\uFF0C\u8DF3\u8FC7\u5199\u56DE"}catch{return"\u5DE5\u5177\u7ED3\u679C\u5DF2\u8FC7\u671F\uFF0C\u8DF3\u8FC7\u5199\u56DE"}return""}var qe,rt,Ar,Pd,_n,Mt,hm,xm,An,ut,vm,Js=R(()=>{Me();J();Sn();qe=I.createScope("ContextInjector"),rt="YouYouToolkit_toolOutputs",Ar="YouYouToolkit_injectedContext",Pd={overwrite:!0,enabled:!0};_n={SUCCESS:"success",FAILED:"failed"},Mt={NONE:"none",LOCAL_ONLY:"local_only",SET_CHAT_MESSAGES:"setChatMessages",SET_CHAT_MESSAGE:"setChatMessage"},hm=60,xm=3;An=class{constructor(){this.debugMode=!1}async inject(e,s,r={}){return(await this.injectDetailed(e,s,r)).success}async injectDetailed(e,s,r={}){let o={...Pd,...r},n=this._createWritebackResult(e,o);if(!e||s===void 0||s===null)return qe.error("\u6CE8\u5165\u5931\u8D25: \u53C2\u6570\u65E0\u6548"),n.error="\u6CE8\u5165\u5931\u8D25: \u53C2\u6570\u65E0\u6548",n;if(!ui(o.sourceMessageId))return qe.error("\u6CE8\u5165\u5931\u8D25: \u7F3A\u5C11 sourceMessageId"),n.error="\u6CE8\u5165\u5931\u8D25: \u7F3A\u5C11 sourceMessageId",n;if(o?.signal?.aborted)return n.error="\u5DE5\u5177\u7ED3\u679C\u5DF2\u53D6\u6D88\uFF0C\u8DF3\u8FC7\u5199\u56DE",n;if(typeof o?.shouldAbortWriteback=="function")try{if(o.shouldAbortWriteback()===!0)return n.error="\u5DE5\u5177\u7ED3\u679C\u5DF2\u8FC7\u671F\uFF0C\u8DF3\u8FC7\u5199\u56DE",n}catch{return n.error="\u5DE5\u5177\u7ED3\u679C\u5DF2\u8FC7\u671F\uFF0C\u8DF3\u8FC7\u5199\u56DE",n}let a=n.chatId,i={toolId:e,content:String(s),updatedAt:Date.now(),sourceMessageId:o.sourceMessageId||null,sourceSwipeId:o.sourceSwipeId||o.effectiveSwipeId||null,options:o};P.emit(M.TOOL_CONTEXT_INJECTED,{toolId:e,chatId:a,content:i.content,sourceMessageId:i.sourceMessageId,sourceSwipeId:i.sourceSwipeId,effectiveSwipeId:i.sourceSwipeId,slotBindingKey:o.slotBindingKey||"",slotRevisionKey:o.slotRevisionKey||"",slotTransactionId:o.slotTransactionId||"",traceId:o.traceId||"",sessionKey:o.sessionKey||"",options:o});let l=await this._insertToolOutputToBoundAssistantSlot(e,i,o,n);return l.success&&qe.info(`\u6CE8\u5165\u6210\u529F: ${e} -> ${a}`,{inserted:l}),l}getAggregatedContext(e){return this.getLatestMessageInjectedContext()}getLatestMessageInjectedContext(e=null){try{let{chat:s}=this._getChatRuntime(),r=this._findAssistantMessageIndex(s,e);if(r<0)return"";let o=s[r]||{},n=o[Ar];if(typeof n=="string"&&n.trim())return n.trim();let a=o[rt];return a&&typeof a=="object"?this._buildMessageInjectedContext(a).trim():""}catch(s){return qe.warn("\u8BFB\u53D6\u6700\u65B0 AI \u6D88\u606F injectedContext \u5931\u8D25",{error:s}),""}}_getLatestAssistantMessageOutputs(){try{let{chat:e}=this._getChatRuntime(),s=this._findAssistantMessageIndex(e,null);if(s<0)return{};let o=(e[s]||{})[rt];return o&&typeof o=="object"?o:{}}catch(e){return qe.warn("\u8BFB\u53D6\u6700\u65B0 AI \u6D88\u606F\u4E0A\u4E0B\u6587\u5931\u8D25",{error:e}),{}}}getToolContext(e,s){if(!s)return null;try{let{chat:r}=this._getChatRuntime(),o=this._findAssistantMessageIndex(r,null);return o<0?null:r[o]?.[rt]?.[s]||null}catch{return null}}getAllToolContexts(e){return this._getLatestAssistantMessageOutputs()}async clearToolContext(e,s){if(!s)return!1;try{let{api:r,context:o,chat:n}=this._getChatRuntime(),a=this._findAssistantMessageIndex(n,null);if(a<0)return!1;let i=n[a],l=i?.[rt];if(!l||!l[s])return!1;delete l[s],i[rt]=l,i[Ar]=this._buildMessageInjectedContext(l);let c=o?.saveChat||r?.saveChat||null;return typeof c=="function"&&await c.call(o||r),P.emit(M.TOOL_CONTEXT_CLEARED,{chatId:e||this._getCurrentChatId(),toolId:s}),!0}catch(r){return qe.warn("\u6E05\u9664\u5DE5\u5177\u4E0A\u4E0B\u6587\u5931\u8D25",{error:r}),!1}}async clearAllContext(e){try{let{api:s,context:r,chat:o}=this._getChatRuntime(),n=this._findAssistantMessageIndex(o,null);if(n<0)return!1;let a=o[n];delete a[rt],delete a[Ar];let i=r?.saveChat||s?.saveChat||null;return typeof i=="function"&&await i.call(r||s),P.emit(M.TOOL_CONTEXT_CLEARED,{chatId:e||this._getCurrentChatId(),allTools:!0}),!0}catch(s){return qe.warn("\u6E05\u9664\u6240\u6709\u5DE5\u5177\u4E0A\u4E0B\u6587\u5931\u8D25",{error:s}),!1}}clearAllChatsContexts(){qe.info("\u6E05\u9664\u6240\u6709\u4E0A\u4E0B\u6587")}hasToolContext(e,s){return!!this.getToolContext(e,s)}getContextSummary(e){let s=this._getLatestAssistantMessageOutputs(),r=Object.entries(s).map(([o,n])=>({toolId:o,updatedAt:n.updatedAt,contentLength:n.content?.length||0}));return{chatId:e||this._getCurrentChatId(),tools:r,totalCount:r.length}}exportContext(e){return{chatId:e||this._getCurrentChatId(),contexts:this._getLatestAssistantMessageOutputs(),exportedAt:Date.now()}}importContext(e,s={}){return!1}_getChatRuntime(){try{let e=typeof window.parent<"u"&&window.parent!==window?window.parent:window,s=e.SillyTavern||null,r=s?.getContext?.()||null,o=Array.isArray(r?.chat)?r.chat:[],n=Array.isArray(s?.chat)?s.chat:[],a=o.length?o:n;return{topWindow:e,api:s,context:r,chat:a,contextChat:o,apiChat:n}}catch{return{topWindow:null,api:null,context:null,chat:[],contextChat:[],apiChat:[]}}}_createWritebackResult(e,s={}){let r=Mt.SET_CHAT_MESSAGES;return{success:!1,toolId:e,chatId:this._getCurrentChatId(),traceId:s.traceId||"",sessionKey:s.sessionKey||"",sourceMessageId:s.sourceMessageId||null,sourceSwipeId:s.sourceSwipeId||s.effectiveSwipeId||null,effectiveSwipeId:s.effectiveSwipeId||s.sourceSwipeId||null,slotBindingKey:s.slotBindingKey||"",slotRevisionKey:s.slotRevisionKey||"",slotTransactionId:s.slotTransactionId||"",messageIndex:-1,textField:"",blockIdentity:null,hostUpdateMethod:Mt.NONE,commit:{preferredMethod:r,attemptedMethods:[],appliedMethod:Mt.NONE,fallbackUsed:!1,contentCommitted:!1,hostCommitApplied:!1},refresh:{requestMethods:[],requested:!1,confirmChecks:0,confirmed:!1,confirmedBy:"",eventSource:"",eventName:""},contentCommitted:!1,hostCommitApplied:!1,refreshRequested:!1,refreshConfirmed:!1,writebackStatus:_n.FAILED,replacedExistingBlock:!1,insertedNewBlock:!1,conflictDetected:!1,conflictReason:"",preservedOtherToolBlocks:!0,error:"",errors:[],steps:{foundTargetMessage:!1,contentCommitted:!1,localTextApplied:!1,runtimeSynced:!1,hostSetChatMessages:!1,hostSetChatMessage:!1,refreshForceSetChatMessage:!1,saveChatDebounced:!1,saveChat:!1,refreshRequested:!1,notifiedMessageUpdated:!1,verifiedAfterWrite:!1,refreshConfirmed:!1},verification:{textIncludesContent:!1,mirrorStored:!1,refreshConfirmed:!1}}}async _wait(e){await new Promise(s=>setTimeout(s,e))}_collectWritebackVerification(e,s,r,o,n,a=null){let i=e?.contextChat?.[r]||e?.apiChat?.[r]||s?.[r]||a||null,l=this._getWritableMessageField(i).text||"",c=i?.[rt]?.[o],d=n?l.includes(n):!0,u=!!(c&&String(c.content||"").trim()===n);return{latestMessage:i,latestText:l,textIncludesContent:d,mirrorStored:u}}async _confirmRefresh(e,s,r,o,n,a=null){let i=1,l=this._collectWritebackVerification(e,s,r,o,n,a);for(let c=0;c<xm;c+=1){if(l.textIncludesContent&&l.mirrorStored)return{...l,refreshConfirmed:!0,confirmChecks:i,confirmedBy:"text_and_mirror_present"};await this._wait(hm),i+=1,l=this._collectWritebackVerification(e,s,r,o,n,a)}return{...l,refreshConfirmed:l.textIncludesContent&&l.mirrorStored,confirmChecks:i,confirmedBy:l.textIncludesContent&&l.mirrorStored?"text_and_mirror_present":""}}async _requestAssistantMessageRefresh(e,s,r,o={},n=null){let a=n||this._createWritebackResult("",o),{api:i,context:l}=e||{},c=e?.topWindow||(typeof window.parent<"u"&&window.parent!==window?window.parent:window),d=c?.TavernHelper?.setChatMessages||l?.setChatMessages||i?.setChatMessages||c?.setChatMessages||null;a.commit.preferredMethod=typeof d=="function"?Mt.SET_CHAT_MESSAGES:Mt.LOCAL_ONLY;let u=!1,p=Tn(o);if(p)return a.error=p,a;if(typeof d=="function"){Vs(a.commit.attemptedMethods,Mt.SET_CHAT_MESSAGES);try{let y=Tn(o);if(y)return a.error=y,a;let f=ui(o.sourceMessageId)||s;await d([{message_id:f,message:r}],{refresh:"affected"}),a.steps.hostSetChatMessages=!0,a.hostUpdateMethod=Mt.SET_CHAT_MESSAGES,a.hostCommitApplied=!0,a.commit.appliedMethod=Mt.SET_CHAT_MESSAGES,a.commit.hostCommitApplied=!0,u=!0}catch(y){qe.error("setChatMessages \u5199\u56DE\u5931\u8D25\uFF0C\u56DE\u9000\u672C\u5730\u540C\u6B65",{error:y}),a.errors.push(`setChatMessages: ${y?.message||String(y)}`)}}return u&&(a.refreshRequested=!0,Vs(a.refresh.requestMethods,a.hostUpdateMethod)),u||(Vs(a.commit.attemptedMethods,Mt.LOCAL_ONLY),a.commit.appliedMethod=Mt.LOCAL_ONLY,a.commit.fallbackUsed=!0,a.hostUpdateMethod=a.commit.appliedMethod),a}_inferBlockType(e){let s=String(e||"").trim();if(!s)return"empty";let r=s.match(/^<([a-zA-Z0-9_-]+)(?:\s[^>]*)?>[\s\S]*<\/\1>$/);return r?.[1]?r[1]:"plain_text"}_stripExactStoredBlock(e,s,r=""){let o=String(e||""),n=String(s||"").trim(),a=String(r||"").trim();return n?o.includes(n)?a?{text:o.replace(n,a).trimEnd(),removed:!0,replaced:!0}:{text:o.replace(n,"").trimEnd(),removed:!0,replaced:!1}:{text:o,removed:!1,replaced:!1}:{text:o,removed:!1,replaced:!1}}_syncMessageToRuntimeChats(e,s,r){let{contextChat:o,apiChat:n}=e||{},a=i=>{!Array.isArray(i)||s<0||s>=i.length||i[s]!==r&&(i[s]={...i[s]||{},...r})};a(o),a(n)}_notifyMessageUpdated(e,s,r={}){if(r.skipNotify===!0)return{emitted:!1,source:"skipped_by_caller",eventName:""};try{let o=st.describe(),n=e?.topWindow||vn();return o.hasBridge?(st.emit(Ce.MESSAGE_UPDATED,s),typeof n?.requestAnimationFrame=="function"?n.requestAnimationFrame(()=>{st.emit(Ce.MESSAGE_UPDATED,s)}):typeof n?.setTimeout=="function"&&n.setTimeout(()=>{st.emit(Ce.MESSAGE_UPDATED,s)},30),{emitted:!0,source:o.source||"unavailable",eventName:Ce.MESSAGE_UPDATED}):{emitted:!1,source:o.source||"unavailable",eventName:Ce.MESSAGE_UPDATED}}catch(o){return qe.warn("\u89E6\u53D1\u6D88\u606F\u5237\u65B0\u4E8B\u4EF6\u5931\u8D25",{error:o}),{emitted:!1,source:"error",eventName:"",error:o?.message||String(o)}}}_isAssistantMessage(e){if(!e||e.is_user||e.is_system)return!1;let s=String(e.role||"").toLowerCase();return s==="assistant"||s==="ai"||!s}_findAssistantMessageIndex(e,s){let r=Array.isArray(e)?e:[];if(!r.length)return-1;let o=s!=null&&s!=="",n=(a,i)=>{if(!this._isAssistantMessage(a)||s==null||s==="")return!1;let l=String(s).trim();return l?[a.message_id,a.id,a.messageId,a.mes_id,i].map(d=>d==null?"":String(d).trim()).includes(l):!1};for(let a=r.length-1;a>=0;a-=1)if(n(r[a],a))return a;if(o)return-1;for(let a=r.length-1;a>=0;a-=1)if(this._isAssistantMessage(r[a]))return a;return-1}_buildMessageInjectedContext(e){let r=Object.entries(e&&typeof e=="object"?e:{}).filter(([,n])=>n?.blockType!=="full_message").sort(([,n],[,a])=>(n?.updatedAt||0)-(a?.updatedAt||0));if(!r.length)return"";let o=["[\u5DE5\u5177\u4E0A\u4E0B\u6587\u6CE8\u5165]",""];for(let[n,a]of r)o.push(`[${n}]`),o.push(a?.content||""),o.push("");return o.join(`
`)}_getWritableMessageField(e){let s=["mes","message","content","text"];for(let r of s)if(typeof e?.[r]=="string")return{key:r,text:e[r]};return{key:"mes",text:""}}_applyMessageText(e,s,r={}){let o=e&&typeof e=="object"?e:{},n=["mes","message","content","text"],a=!1;if(n.forEach(i=>{typeof o[i]=="string"&&(o[i]=s,a=!0)}),a||(o.mes=s,o.message=s),Array.isArray(o.swipes)){let i=Number.parseInt(ui(r?.sourceSwipeId||r?.effectiveSwipeId),10),l=Number.isInteger(i)?i:Number.isInteger(o.swipe_id)?o.swipe_id:Number.isInteger(o.swipeId)?o.swipeId:0;l>=0&&l<o.swipes.length&&(o.swipes[l]=s,o.swipe_id=l,o.swipeId=l)}return o}_stripExistingToolOutput(e,s=[]){let r=String(e||"");return(Array.isArray(s)?s:[]).forEach(n=>{let a=String(n||"").trim();if(!a)return;if(a.startsWith("regex:")){try{let d=new RegExp(a.slice(6).trim(),"gis");r=r.replace(d,"")}catch(d){qe.warn("\u79FB\u9664\u65E7\u5DE5\u5177\u8F93\u51FA\u65F6\u6B63\u5219\u65E0\u6548",{value:a,error:d})}return}let i=a.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),l=new RegExp(`<${i}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${i}>\\s*`,"gi"),c=new RegExp(`\\{${i}\\|[\\s\\S]*?\\}\\s*`,"gi");r=r.replace(l,""),r=r.replace(c,"")}),r.trimEnd()}_stripPreviousStoredToolContent(e,s){let r=String(e||""),o=String(s||"").trim();return o?r.replace(o,"").trimEnd():r.trimEnd()}async _insertToolOutputToBoundAssistantSlot(e,s,r={},o=null){let n=o||this._createWritebackResult(e,r);try{let a=this._getChatRuntime(),{context:i,chat:l}=a;if(!Array.isArray(l)||!l.length)return qe.error("\u672A\u627E\u5230\u804A\u5929\u6D88\u606F\uFF0C\u65E0\u6CD5\u63D2\u5165\u5DE5\u5177\u8F93\u51FA"),n.error="\u672A\u627E\u5230\u804A\u5929\u6D88\u606F\uFF0C\u65E0\u6CD5\u63D2\u5165\u5DE5\u5177\u8F93\u51FA",n;let c=this._findAssistantMessageIndex(l,r.sourceMessageId);if(c<0)return qe.error("\u672A\u627E\u5230\u53EF\u5199\u5165\u7684\u6700\u65B0 AI \u56DE\u590D\u6D88\u606F"),n.error="\u672A\u627E\u5230\u53EF\u5199\u5165\u7684\u6700\u65B0 AI \u56DE\u590D\u6D88\u606F",n;if(r?.signal?.aborted)return n.error="\u5DE5\u5177\u7ED3\u679C\u5DF2\u53D6\u6D88\uFF0C\u8DF3\u8FC7\u5199\u56DE",n;if(typeof r?.shouldAbortWriteback=="function")try{if(r.shouldAbortWriteback()===!0)return n.error="\u5DE5\u5177\u7ED3\u679C\u5DF2\u8FC7\u671F\uFF0C\u8DF3\u8FC7\u5199\u56DE",n}catch{return n.error="\u5DE5\u5177\u7ED3\u679C\u5DF2\u8FC7\u671F\uFF0C\u8DF3\u8FC7\u5199\u56DE",n}n.messageIndex=c,n.steps.foundTargetMessage=!0;let d=l[c],{key:u,text:p}=this._getWritableMessageField(d);n.textField=u;let y=d[rt]&&typeof d[rt]=="object"?d[rt]:{},f=y?.[e]||{},x=f?.content||"",h=f?.blockText||x||"",C=Object.entries(y).filter(([Ie])=>Ie!==e).map(([,Ie])=>Ie||{}),T=String(s.content||"").trim(),_=r.replaceFullMessage===!0,Y=_?"full_message":this._inferBlockType(T),L={toolId:e,messageId:r.sourceMessageId||d?.message_id||d?.messageId||c,blockType:Y,insertedAt:s.updatedAt,replaceable:r.overwrite!==!1};n.blockIdentity=L;let S=r.overwrite===!1||_?{text:String(p||""),removed:!1,replaced:!1}:this._stripExactStoredBlock(p,h,T),N=S.text,F="";!_&&r.overwrite!==!1&&h&&!S.removed&&(F="previous_block_not_found");let q=r.overwrite===!1||S.replaced||_?N:this._stripExistingToolOutput(N,r.extractionSelectors),D=q!==N;N=q;let H=r.overwrite===!1||S.replaced||_?N:this._stripPreviousStoredToolContent(N,x),le=H!==N;N=H,n.replacedExistingBlock=_||S.removed||D||le;let K=r.overwrite===!1?String(p||""):N,fe=_?T:S.replaced?N.trim():[K.trimEnd(),T].filter(Boolean).join(`

`).trim();n.insertedNewBlock=!!T;let Qe=C.every(Ie=>{if(Ie?.blockType==="full_message")return!0;let qt=String(Ie?.blockText||Ie?.content||"").trim();return qt?fe.includes(qt):!0});n.preservedOtherToolBlocks=Qe,Qe?F&&(n.conflictDetected=!0,n.conflictReason=F):(n.conflictDetected=!0,n.conflictReason="other_tool_block_removed");let ne={...y,[e]:{toolId:e,content:T,blockText:T,blockType:Y,blockIdentity:L,updatedAt:s.updatedAt,sourceMessageId:s.sourceMessageId||null}},Ee=Tn(r);if(Ee)return n.error=Ee,n;d[u]=fe,this._applyMessageText(d,fe,r),d[rt]=ne,d[Ar]=this._buildMessageInjectedContext(ne),n.contentCommitted=!0,n.commit.contentCommitted=!0,n.steps.contentCommitted=!0,n.steps.localTextApplied=!0,this._syncMessageToRuntimeChats(a,c,d),n.steps.runtimeSynced=!0;let Be=Tn(r);if(Be)return n.error=Be,n;await this._requestAssistantMessageRefresh(a,c,fe,r,n);let $t=i?.saveChat||a?.api?.saveChat||null,xe=i?.saveChatDebounced||a?.api?.saveChatDebounced||null;typeof xe=="function"&&(xe.call(i||api),n.steps.saveChatDebounced=!0,n.refreshRequested=!0,Vs(n.refresh.requestMethods,"saveChatDebounced")),typeof $t=="function"&&(await $t.call(i||api),n.steps.saveChat=!0,n.refreshRequested=!0,Vs(n.refresh.requestMethods,"saveChat"));let ve=this._notifyMessageUpdated(a,c,r);n.steps.notifiedMessageUpdated=ve?.emitted===!0,n.refresh.eventSource=ve?.source||"",n.refresh.eventName=ve?.eventName||"",ve?.error&&n.errors.push(`MESSAGE_UPDATED: ${ve.error}`);let Ht=String(s.content||"").trim();(n.steps.hostSetChatMessages||n.steps.hostSetChatMessage)&&(n.refreshRequested=!0,Vs(n.refresh.requestMethods,n.hostUpdateMethod)),n.steps.notifiedMessageUpdated&&(n.refreshRequested=!0,Vs(n.refresh.requestMethods,`MESSAGE_UPDATED:${n.refresh.eventName||"MESSAGE_UPDATED"}`)),n.steps.refreshRequested=n.refreshRequested,n.refresh.requested=n.refreshRequested;let Dt=await this._confirmRefresh(a,l,c,e,Ht,d);return n.verification.textIncludesContent=Dt.textIncludesContent,n.verification.mirrorStored=Dt.mirrorStored,n.verification.refreshConfirmed=Dt.refreshConfirmed,n.steps.verifiedAfterWrite=n.verification.textIncludesContent&&n.verification.mirrorStored,n.refreshConfirmed=n.verification.refreshConfirmed&&n.refreshRequested,n.refresh.confirmChecks=Number(Dt.confirmChecks)||0,n.refresh.confirmedBy=Dt.confirmedBy||"",n.refresh.confirmed=n.refreshConfirmed,n.steps.refreshConfirmed=n.refreshConfirmed,n.success=n.steps.localTextApplied&&n.steps.runtimeSynced&&n.steps.verifiedAfterWrite&&n.refreshConfirmed,n.writebackStatus=n.success?_n.SUCCESS:_n.FAILED,!n.success&&!n.error&&(n.error=n.refreshRequested?"\u5DE5\u5177\u7ED3\u679C\u5DF2\u63D0\u4EA4\uFF0C\u4F46\u5BBF\u4E3B\u5237\u65B0\u786E\u8BA4\u672A\u901A\u8FC7":"\u5DE5\u5177\u7ED3\u679C\u5DF2\u5C1D\u8BD5\u5199\u56DE\uFF0C\u4F46\u6700\u7EC8\u6821\u9A8C\u672A\u901A\u8FC7"),n.conflictDetected&&!n.error&&(n.error=`\u5DE5\u5177\u7ED3\u679C\u5DF2\u5199\u56DE\uFF0C\u4F46\u68C0\u6D4B\u5230\u5757\u51B2\u7A81\uFF1A${n.conflictReason}`),qe.info(`\u5DF2\u5C06\u5DE5\u5177\u8F93\u51FA\u5199\u5165\u7ED1\u5B9A assistant \u69FD\u4F4D: ${e} -> #${c}`),n}catch(a){return qe.error("\u63D2\u5165\u6700\u65B0 AI \u56DE\u590D\u539F\u6587\u5931\u8D25",{error:a}),n.error=a?.message||String(a),n.errors.push(n.error),n}}getAssistantMessageSnapshot(e=null){try{let s=this._getChatRuntime(),{chat:r}=s,o=this._findAssistantMessageIndex(r,e);if(o<0)return null;let n=r[o]||null,a=this._getWritableMessageField(n).text||"",i=n?.[rt]&&typeof n[rt]=="object"?n[rt]:{},l=Object.values(i).reduce((c,d)=>{let u=String(d?.blockText||d?.content||"").trim();return!u||!c.includes(u)?c:c.replace(u,"").trimEnd()},String(a||"")).trim();return{messageIndex:o,message:n,messageText:a,baseText:l,toolOutputs:i,injectedContext:typeof n?.[Ar]=="string"?n[Ar]:this._buildMessageInjectedContext(i)}}catch(s){return qe.warn("\u8BFB\u53D6 assistant \u6D88\u606F\u5FEB\u7167\u5931\u8D25",{error:s}),null}}_getCurrentChatId(){try{let e=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(e.SillyTavern?.getContext){let s=e.SillyTavern.getContext(),o=[s?.chatId,s?.chat_id,s?.chat_filename,s?.chatMetadata?.chatId,s?.chatMetadata?.chat_id,s?.chatMetadata?.file_name,s?.chatMetadata?.name,e.SillyTavern?.chatId,e.SillyTavern?.chat_id,e.SillyTavern?.chat_filename].find(a=>typeof a=="string"&&a.trim());if(o)return o;let n=e.SillyTavern?.this_chid;if(n!=null)return`chat_char_${n}`}return"chat_default"}catch{return"chat_default"}}},ut=new An,vm=ut});var Nd={};te(Nd,{BUILTIN_VARIABLES:()=>Dd,VariableResolver:()=>En,default:()=>Sm,variableResolver:()=>ot});var wm,Dd,En,ot,Sm,go=R(()=>{Me();J();wm=I.createScope("VariableResolver"),Dd={lastUserMessage:{name:"lastUserMessage",description:"\u6700\u65B0\u7528\u6237\u6D88\u606F",category:"chat"},lastAiMessage:{name:"lastAiMessage",description:"\u6700\u65B0AI\u56DE\u590D",category:"chat"},chatHistory:{name:"chatHistory",description:"\u6700\u8FD1\u804A\u5929\u8BB0\u5F55",category:"chat"},characterCard:{name:"characterCard",description:"\u5F53\u524D\u89D2\u8272\u5361\u5185\u5BB9",category:"character"},toolName:{name:"toolName",description:"\u5DE5\u5177\u540D\u79F0",category:"tool"},toolId:{name:"toolId",description:"\u5DE5\u5177ID",category:"tool"},toolPromptMacro:{name:"toolPromptMacro",description:"\u5F53\u524D\u5DE5\u5177\u6A21\u677F\u63D0\u793A\u8BCD\u5B8F",category:"tool"},toolContentMacro:{name:"toolContentMacro",description:"\u5F53\u524D\u5DE5\u5177\u5904\u7406\u540E\u7684\u5185\u5BB9\u5B8F",category:"tool"},toolWorldbookContent:{name:"toolWorldbookContent",description:"\u5F53\u524D\u5DE5\u5177\u9009\u62E9\u7684\u4E16\u754C\u4E66\u6CE8\u5165\u5185\u5BB9",category:"tool"},injectedContext:{name:"injectedContext",description:"\u5DF2\u6CE8\u5165\u7684\u5DE5\u5177\u4E0A\u4E0B\u6587",category:"context"},extractedContent:{name:"extractedContent",description:"\u5DE5\u5177\u63D0\u53D6\u5185\u5BB9",category:"context"},recentMessagesText:{name:"recentMessagesText",description:"\u6700\u8FD1\u6D88\u606F\u6B63\u6587",category:"context"},rawRecentMessagesText:{name:"rawRecentMessagesText",description:"\u6700\u8FD1\u6D88\u606F\u539F\u6587",category:"context"},userMessage:{name:"userMessage",description:"\u5F53\u524D\u7528\u6237\u6D88\u606F",category:"chat"},previousToolOutput:{name:"previousToolOutput",description:"\u4E0A\u4E00\u6B21\u5DE5\u5177\u8F93\u51FA",category:"context"}},En=class{constructor(){this.customVariables=new Map,this.variableHandlers=new Map,this.debugMode=!1,this._registerDefaultHandlers()}resolveTemplate(e,s){if(typeof e!="string")return e;let r=e;return r=this._resolveBuiltinVariables(r,s),r=this._resolveCustomVariables(r,s),r=this._resolveRegexVariables(r,s),r}resolveObject(e,s){if(!e||typeof e!="object")return e;if(Array.isArray(e))return e.map(o=>this.resolveObject(o,s));let r={};for(let[o,n]of Object.entries(e))typeof n=="string"?r[o]=this.resolveTemplate(n,s):typeof n=="object"&&n!==null?r[o]=this.resolveObject(n,s):r[o]=n;return r}buildToolContext(e){return{lastUserMessage:e.lastUserMessage||"",lastAiMessage:e.lastAiMessage||"",chatHistory:e.chatHistory||[],characterCard:e.characterCard||null,characterName:e.characterCard?.name||"",toolName:e.toolName||"",toolId:e.toolId||"",toolPromptMacro:e.toolPromptMacro||"",toolContentMacro:e.toolContentMacro||"",toolWorldbookContent:e.toolWorldbookContent||"",injectedContext:e.injectedContext||"",extractedContent:e.extractedContent||"",recentMessagesText:e.recentMessagesText||"",rawRecentMessagesText:e.rawRecentMessagesText||"",userMessage:e.userMessage||"",previousToolOutput:e.previousToolOutput||"",regexResults:e.regexResults||{},raw:e,timestamp:Date.now()}}registerVariable(e,s){e&&(this.customVariables.set(e,s),this._log(`\u6CE8\u518C\u81EA\u5B9A\u4E49\u53D8\u91CF: ${e}`))}unregisterVariable(e){this.customVariables.delete(e),this._log(`\u6CE8\u9500\u81EA\u5B9A\u4E49\u53D8\u91CF: ${e}`)}registerHandler(e,s){!e||typeof s!="function"||(this.variableHandlers.set(e,s),this._log(`\u6CE8\u518C\u53D8\u91CF\u5904\u7406\u5668: ${e}`))}getAvailableVariables(){let e=[];for(let[,s]of Object.entries(Dd))e.push({name:`{{${s.name}}}`,description:s.description,category:s.category,type:"builtin"});for(let[s,r]of this.customVariables)e.push({name:`{{${s}}}`,description:typeof r=="function"?"\u81EA\u5B9A\u4E49\u51FD\u6570\u53D8\u91CF":"\u81EA\u5B9A\u4E49\u9759\u6001\u53D8\u91CF",category:"custom",type:"custom"});return e}getVariableHelp(){let e=["\u53EF\u7528\u53D8\u91CF\uFF1A",""],s={chat:"\u804A\u5929\u76F8\u5173",character:"\u89D2\u8272\u76F8\u5173",tool:"\u5DE5\u5177\u76F8\u5173",context:"\u4E0A\u4E0B\u6587\u76F8\u5173",custom:"\u81EA\u5B9A\u4E49\u53D8\u91CF"},r={};for(let o of this.getAvailableVariables())r[o.category]||(r[o.category]=[]),r[o.category].push(o);for(let[o,n]of Object.entries(s))if(r[o]&&r[o].length>0){e.push(`\u3010${n}\u3011`);for(let a of r[o])e.push(`  ${a.name} - ${a.description}`);e.push("")}return e.push("\u3010\u6B63\u5219\u63D0\u53D6\u3011"),e.push("  {{regex.xxx}} - \u4F7F\u7528\u6B63\u5219\u63D0\u53D6\u7ED3\u679C\uFF0Cxxx\u4E3A\u6355\u83B7\u7EC4\u540D"),e.join(`
`)}_registerDefaultHandlers(){this.registerHandler("regex",(e,s)=>(s.regexResults||s.raw?.regexResults||{})[e]||"")}_resolveBuiltinVariables(e,s){let r=e;return r=r.replace(/\{\{lastUserMessage\}\}/gi,s.lastUserMessage||s.raw?.lastUserMessage||""),r=r.replace(/\{\{lastAiMessage\}\}/gi,s.lastAiMessage||s.raw?.lastAiMessage||""),r=r.replace(/\{\{chatHistory\}\}/gi,()=>{let o=s.chatHistory||s.raw?.chatHistory||[];return this._formatChatHistory(o)}),r=r.replace(/\{\{characterCard\}\}/gi,()=>{let o=s.characterCard||s.raw?.characterCard;return o?this._formatCharacterCard(o):""}),r=r.replace(/\{\{toolName\}\}/gi,s.toolName||s.raw?.toolName||""),r=r.replace(/\{\{toolId\}\}/gi,s.toolId||s.raw?.toolId||""),r=r.replace(/\{\{toolPromptMacro\}\}/gi,s.toolPromptMacro||s.raw?.toolPromptMacro||""),r=r.replace(/\{\{toolContentMacro\}\}/gi,s.toolContentMacro||s.raw?.toolContentMacro||""),r=r.replace(/\{\{toolWorldbookContent\}\}/gi,s.toolWorldbookContent||s.raw?.toolWorldbookContent||""),r=r.replace(/\{\{injectedContext\}\}/gi,s.injectedContext||s.raw?.injectedContext||""),r=r.replace(/\{\{extractedContent\}\}/gi,s.extractedContent||s.raw?.extractedContent||""),r=r.replace(/\{\{recentMessagesText\}\}/gi,s.recentMessagesText||s.raw?.recentMessagesText||""),r=r.replace(/\{\{rawRecentMessagesText\}\}/gi,s.rawRecentMessagesText||s.raw?.rawRecentMessagesText||""),r=r.replace(/\{\{userMessage\}\}/gi,s.userMessage||s.raw?.userMessage||""),r=r.replace(/\{\{previousToolOutput\}\}/gi,s.previousToolOutput||s.raw?.previousToolOutput||""),r}_resolveCustomVariables(e,s){let r=e;for(let[o,n]of this.customVariables){let a=new RegExp(`\\{\\{${this._escapeRegex(o)}\\}\\}`,"gi");typeof n=="function"?r=r.replace(a,()=>{try{return n(s)}catch(i){return this._log(`\u53D8\u91CF\u5904\u7406\u9519\u8BEF ${o}:`,i),""}}):r=r.replace(a,String(n))}return r}_resolveRegexVariables(e,s){let r=e;for(let[o,n]of this.variableHandlers){let a=new RegExp(`\\{\\{${o}\\.([^}]+)\\}\\}`,"gi");r=r.replace(a,(i,l)=>{try{return n(l,s)}catch(c){return this._log(`\u53D8\u91CF\u5904\u7406\u9519\u8BEF ${o}.${l}:`,c),""}})}return r}_formatChatHistory(e){return!Array.isArray(e)||e.length===0?"":e.map(s=>{let r=s.role||"unknown",o=s.content||s.mes||"";return`[${r}]: ${o}`}).join(`

`)}_formatCharacterCard(e){if(!e)return"";let s=[];return e.name&&s.push(`\u59D3\u540D: ${e.name}`),e.description&&s.push(`\u63CF\u8FF0: ${e.description}`),e.personality&&s.push(`\u6027\u683C: ${e.personality}`),e.scenario&&s.push(`\u573A\u666F: ${e.scenario}`),s.join(`

`)}_escapeRegex(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}_log(...e){wm.debug(e[0],e.length>1?e.slice(1):void 0)}},ot=new En,Sm=ot});var Ld={};te(Ld,{DEFAULT_PROMPT_TEMPLATE:()=>Od,ToolPromptService:()=>Cn,default:()=>_m,toolPromptService:()=>Xs});var Tm,Od,Cn,Xs,_m,kn=R(()=>{Me();_r();go();ro();J();Tm=I.createScope("ToolPromptService"),Od="\u8BF7\u5904\u7406\u4EE5\u4E0BAI\u56DE\u590D\u5185\u5BB9\uFF1A",Cn=class{constructor(){this.debugMode=!1}async _buildVariableContext(e,s={}){let r=this._getPromptTemplate(e),o=String(s?.toolWorldbookContent||s?.input?.toolWorldbookContent||await gr(e)).trim(),n=ot.buildToolContext({...s,toolName:e?.name||s?.toolName||"",toolId:e?.id||s?.toolId||"",toolWorldbookContent:o}),a=ot.resolveTemplate(r,n).trim(),i=String(s?.toolContentMacro||s?.input?.toolContentMacro||"").trim();return ot.buildToolContext({...s,toolName:e?.name||s?.toolName||"",toolId:e?.id||s?.toolId||"",toolPromptMacro:a,toolContentMacro:i,toolWorldbookContent:o})}async buildToolMessages(e,s){if(!e)return this._log("\u6784\u5EFA\u5931\u8D25: \u5DE5\u5177\u914D\u7F6E\u4E3A\u7A7A"),[];let r=[],o=await this._buildVariableContext(e,s),n=Array.isArray(e.promptMessages)?e.promptMessages:[],a=this._getBypassMessages(e),i=a?.some(l=>l.mainSlot==="A"||l.mainSlot==="B"||l.isMain||l.isMain2);if(a&&a.length>0)for(let l of a)l.enabled!==!1&&r.push({role:this._normalizeRole(l.role),content:ot.resolveTemplate(l.content||"",o)});if(!i&&n.length>0)for(let l of n){let c=ot.resolveTemplate(l?.content||"",o).trim();c&&r.push({role:this._normalizeRole(l?.role),content:c})}else if(!i&&!a?.length){let l=this._buildUserContent(this._getPromptTemplate(e),o);l&&r.push({role:"user",content:l})}return this._log(`\u6784\u5EFA\u6D88\u606F: ${r.length} \u6761`),r}async buildPromptText(e,s){let r=await this._buildVariableContext(e,s),o=Array.isArray(e?.promptMessages)?e.promptMessages:[];return o.length>0?o.map(n=>ot.resolveTemplate(n?.content||"",r).trim()).filter(Boolean).join(`

`):r.toolPromptMacro||""}getToolPromptTemplate(e){return this._getPromptTemplate(e)}_getPromptTemplate(e){return e.promptTemplate&&typeof e.promptTemplate=="string"?e.promptTemplate:Od}_getBypassMessages(e){return e.bypass?.enabled?ee.buildBypassMessages(e):[]}_buildUserContent(e,s){return!e||!e.trim()?"":ot.resolveTemplate(e,s).trim()}_normalizeRole(e){if(!e)return"user";switch(String(e).toLowerCase()){case"system":return"system";case"assistant":return"assistant";case"user":default:return"user"}}_log(...e){Tm.debug(e[0],e.length>1?e.slice(1):void 0)}setDebugMode(e){this.debugMode=e}},Xs=new Cn,_m=Xs});var zd={};te(zd,{LEGACY_OUTPUT_MODES:()=>Am,OUTPUT_MODES:()=>Tt,TOOL_FAILURE_STAGES:()=>Oe,TOOL_RUNTIME_STATUS:()=>Em,TOOL_WRITEBACK_STATUS:()=>ke,ToolOutputService:()=>In,default:()=>Cm,toolOutputService:()=>Ft});function Bd(t){if(t?.signal?.aborted)return{aborted:!0,stale:!1,reason:"cancelled_before_host_commit"};if(typeof t?.shouldAbortWriteback=="function")try{return t.shouldAbortWriteback()||!1}catch{return{aborted:!0,stale:!0,reason:"stale_base_changed"}}return!1}function Er(t=[],e="",s=null){return{request:{built:Array.isArray(t)&&t.length>0,messageCount:Array.isArray(t)?t.length:0},extract:{completed:!0,hasOutput:!!String(e||"").trim()},writeback:{attempted:!!s,contentCommitted:!!s?.contentCommitted,hostCommitApplied:!!s?.hostCommitApplied,writebackStatus:s?.writebackStatus||"",preferredCommitMethod:s?.commit?.preferredMethod||"",appliedCommitMethod:s?.commit?.appliedMethod||"",fallbackUsed:!!s?.commit?.fallbackUsed},refresh:{requested:!!s?.refreshRequested,confirmed:!!s?.refreshConfirmed,requestMethods:Array.isArray(s?.refresh?.requestMethods)?[...s.refresh.requestMethods]:[],confirmChecks:Number(s?.refresh?.confirmChecks)||0,confirmedBy:s?.refresh?.confirmedBy||""}}}var Qs,Tt,Am,Em,Oe,ke,In,Ft,Cm,Mn=R(()=>{Me();fo();J();Js();kn();hr();Fr();Qs=I.createScope("ToolOutputService"),Tt={FOLLOW_AI:"follow_ai",POST_RESPONSE_API:"post_response_api"},Am={inline:"follow_ai"},Em={IDLE:"idle",RUNNING:"running",SUCCESS:"success",ERROR:"error"},Oe={BUILD_MESSAGES:"build_messages",SEND_API_REQUEST:"send_api_request",EXTRACT_OUTPUT:"extract_output",INJECT_CONTEXT:"inject_context",COMPATIBILITY_EXECUTE:"compatibility_execute",UNKNOWN:"unknown"},ke={SUCCESS:"success",FAILED:"failed",SKIPPED_EMPTY_OUTPUT:"skipped_empty_output",NOT_APPLICABLE:"not_applicable"};In=class{constructor(){this.debugMode=!1,this._apiConnection=null}shouldRunPostResponse(e){return!e||!e.enabled||!e.output?.enabled?!1:e.output?.mode===Tt.POST_RESPONSE_API}shouldRunFollowAi(e){if(!e||!e.enabled||!e.output?.enabled)return!1;let s=e.output?.mode;return s===Tt.FOLLOW_AI||s==="inline"}shouldRunInline(e){return this.shouldRunFollowAi(e)}async runToolPostResponse(e,s){let r=Date.now(),o=e.id,n=s?.traceId||`trace_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,a=s?.sessionKey||"",i=s?.executionKey||"",l=this._getExtractionSelectors(e),c=e.output?.apiPreset||e.apiPreset||"",d="",u=ke.NOT_APPLICABLE,p=null,y=[],f="";Qs.info(`\u5F00\u59CB\u6267\u884C\u5DE5\u5177: ${o}`),P.emit(M.TOOL_EXECUTION_STARTED,{toolId:o,traceId:n,sessionKey:a,mode:Tt.POST_RESPONSE_API});try{if(d=Oe.BUILD_MESSAGES,y=await this._buildToolMessages(e,s),!y||y.length===0)throw new Error("\u672A\u6784\u5EFA\u51FA\u53EF\u53D1\u9001\u7684\u5DE5\u5177\u8BF7\u6C42\u6D88\u606F\uFF0C\u8BF7\u68C0\u67E5\u63D0\u793A\u8BCD\u6A21\u677F\u6216\u7834\u9650\u8BCD\u914D\u7F6E\u662F\u5426\u4E3A\u7A7A\u3002");Qs.debug(`\u6784\u5EFA\u4E86 ${y.length} \u6761\u6D88\u606F`);let x=Bd(s);if(x){let Y=Date.now()-r;return{success:!1,toolId:o,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88",duration:Y,meta:{traceId:n,sessionKey:a,executionKey:i,sourceMessageId:s?.sourceMessageId||s?.confirmedAssistantMessageId||s?.messageId||"",sourceSwipeId:s?.sourceSwipeId||s?.confirmedAssistantSwipeId||s?.effectiveSwipeId||"",slotRevisionKey:s?.slotRevisionKey||"",selectors:l,apiPreset:c,writebackStatus:u,failureStage:d,writebackDetails:p,aborted:x.aborted===!0,stale:x.stale===!0,abortReason:x.reason||"",phases:Er(y,f,p)}}}let h=await this._getRequestTimeout();d=Oe.SEND_API_REQUEST;let C=await this._sendApiRequest(c,y,{timeoutMs:h,signal:s.signal});d=Oe.EXTRACT_OUTPUT,f=this._extractOutputContent(C,e);let T=Bd(s);if(T){let Y=Date.now()-r;return{success:!1,toolId:o,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88",duration:Y,meta:{traceId:n,sessionKey:a,executionKey:i,sourceMessageId:s?.sourceMessageId||s?.confirmedAssistantMessageId||s?.messageId||"",sourceSwipeId:s?.sourceSwipeId||s?.confirmedAssistantSwipeId||s?.effectiveSwipeId||"",slotRevisionKey:s?.slotRevisionKey||"",selectors:l,apiPreset:c,writebackStatus:u,failureStage:d,writebackDetails:p,aborted:T.aborted===!0,stale:T.stale===!0,abortReason:T.reason||"",phases:Er(y,f,p)}}}if(f){if(d=Oe.INJECT_CONTEXT,p=await ut.injectDetailed(o,f,{overwrite:e.output?.overwrite!==!1,sourceMessageId:s.sourceMessageId||s.confirmedAssistantMessageId||s.messageId||"",sourceSwipeId:s.sourceSwipeId||s.confirmedAssistantSwipeId||s.effectiveSwipeId||"",effectiveSwipeId:s.effectiveSwipeId||s.confirmedAssistantSwipeId||"",slotBindingKey:s.slotBindingKey||"",slotRevisionKey:s.slotRevisionKey||"",slotTransactionId:s.slotTransactionId||"",extractionSelectors:l,traceId:n,sessionKey:a,signal:s.signal,shouldAbortWriteback:s.shouldAbortWriteback,isAutoRun:s.isAutoRun===!0,skipNotify:s.skipNotify===!0}),!p?.success)throw u=ke.FAILED,new Error(p?.error||"\u5DE5\u5177\u7ED3\u679C\u5DF2\u751F\u6210\uFF0C\u4F46\u5199\u5165\u4E0A\u4E0B\u6587/\u4E16\u754C\u4E66\u5931\u8D25");u=ke.SUCCESS}else u=ke.SKIPPED_EMPTY_OUTPUT;d="";let _=Date.now()-r;return P.emit(M.TOOL_EXECUTED,{toolId:o,traceId:n,sessionKey:a,success:!0,duration:_,mode:Tt.POST_RESPONSE_API}),Qs.info(`\u5DE5\u5177\u6267\u884C\u6210\u529F: ${o}, \u8017\u65F6 ${_}ms`),{success:!0,toolId:o,output:f,duration:_,meta:{traceId:n,sessionKey:a,executionKey:i,slotBindingKey:s?.slotBindingKey||"",slotTransactionId:s?.slotTransactionId||"",generationAction:s?.generationAction||"",generationActionSource:s?.generationActionSource||"",rawGenerationType:s?.rawGenerationType||"",normalizedGenerationType:s?.normalizedGenerationType||"",generationMessageBindingSource:s?.generationMessageBindingSource||"",sourceMessageId:s?.sourceMessageId||s?.confirmedAssistantMessageId||s?.messageId||"",sourceSwipeId:s?.sourceSwipeId||s?.confirmedAssistantSwipeId||s?.effectiveSwipeId||"",confirmedAssistantSwipeId:s?.confirmedAssistantSwipeId||"",effectiveSwipeId:s?.effectiveSwipeId||"",slotRevisionKey:s?.slotRevisionKey||"",messageCount:y.length,selectors:l,apiPreset:c,writebackStatus:u,failureStage:"",writebackDetails:p,phases:Er(y,f,p)}}}catch(x){let h=Date.now()-r,C=d||Oe.UNKNOWN,T=u||ke.NOT_APPLICABLE;return Qs.error(`\u5DE5\u5177\u6267\u884C\u5931\u8D25: ${o}`,{error:x}),P.emit(M.TOOL_EXECUTION_FAILED,{toolId:o,traceId:n,sessionKey:a,error:x.message||String(x),duration:h}),{success:!1,toolId:o,error:x.message||String(x),duration:h,meta:{traceId:n,sessionKey:a,executionKey:i,slotBindingKey:s?.slotBindingKey||"",slotTransactionId:s?.slotTransactionId||"",generationAction:s?.generationAction||"",generationActionSource:s?.generationActionSource||"",rawGenerationType:s?.rawGenerationType||"",normalizedGenerationType:s?.normalizedGenerationType||"",generationMessageBindingSource:s?.generationMessageBindingSource||"",sourceMessageId:s?.sourceMessageId||s?.confirmedAssistantMessageId||s?.messageId||"",sourceSwipeId:s?.sourceSwipeId||s?.confirmedAssistantSwipeId||s?.effectiveSwipeId||"",confirmedAssistantSwipeId:s?.confirmedAssistantSwipeId||"",effectiveSwipeId:s?.effectiveSwipeId||"",slotRevisionKey:s?.slotRevisionKey||"",messageCount:y.length,selectors:l,apiPreset:c,writebackStatus:T,failureStage:C,writebackDetails:p,phases:Er(y,f,p)}}}}async runToolFollowAiManual(e,s){let r=Date.now(),o=e.id,n=s?.traceId||`trace_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,a=s?.sessionKey||"",i=s?.executionKey||"",l=e.output?.apiPreset||e.apiPreset||"",c=this._getExtractionSelectors(e),d="",u=ke.NOT_APPLICABLE,p=null,y=[],f="";P.emit(M.TOOL_EXECUTION_STARTED,{toolId:o,traceId:n,sessionKey:a,mode:Tt.FOLLOW_AI});try{if(d=Oe.BUILD_MESSAGES,y=await this._buildToolMessages(e,s),!y||y.length===0)throw new Error("\u672A\u6784\u5EFA\u51FA\u53EF\u53D1\u9001\u7684\u5DE5\u5177\u8BF7\u6C42\u6D88\u606F\uFF0C\u8BF7\u68C0\u67E5\u63D0\u793A\u8BCD\u6A21\u677F\u6216\u7834\u9650\u8BCD\u914D\u7F6E\u662F\u5426\u4E3A\u7A7A\u3002");let x=await this._getRequestTimeout();d=Oe.SEND_API_REQUEST;let h=await this._sendApiRequest(l,y,{timeoutMs:x,signal:s.signal});if(d=Oe.EXTRACT_OUTPUT,f=this._extractOutputContent(h,e),f){if(d=Oe.INJECT_CONTEXT,p=await ut.injectDetailed(o,f,{overwrite:e.output?.overwrite!==!1,sourceMessageId:s.sourceMessageId||s.confirmedAssistantMessageId||s.messageId||"",sourceSwipeId:s.sourceSwipeId||s.confirmedAssistantSwipeId||s.effectiveSwipeId||"",effectiveSwipeId:s.effectiveSwipeId||s.confirmedAssistantSwipeId||"",slotBindingKey:s.slotBindingKey||"",slotRevisionKey:s.slotRevisionKey||"",slotTransactionId:s.slotTransactionId||"",extractionSelectors:c,traceId:n,sessionKey:a}),!p?.success)throw u=ke.FAILED,new Error(p?.error||"\u5DE5\u5177\u7ED3\u679C\u5DF2\u751F\u6210\uFF0C\u4F46\u5199\u5165\u4E0A\u4E0B\u6587/\u4E16\u754C\u4E66\u5931\u8D25");u=ke.SUCCESS}else u=ke.SKIPPED_EMPTY_OUTPUT;d="";let C=Date.now()-r;return P.emit(M.TOOL_EXECUTED,{toolId:o,traceId:n,sessionKey:a,success:!0,duration:C,mode:Tt.FOLLOW_AI}),{success:!0,toolId:o,output:f,duration:C,meta:{traceId:n,sessionKey:a,executionKey:i,slotBindingKey:s?.slotBindingKey||"",slotTransactionId:s?.slotTransactionId||"",sourceMessageId:s?.sourceMessageId||s?.confirmedAssistantMessageId||s?.messageId||"",sourceSwipeId:s?.sourceSwipeId||s?.confirmedAssistantSwipeId||s?.effectiveSwipeId||"",confirmedAssistantSwipeId:s?.confirmedAssistantSwipeId||"",effectiveSwipeId:s?.effectiveSwipeId||"",slotRevisionKey:s?.slotRevisionKey||"",messageCount:y.length,selectors:c,apiPreset:l,writebackStatus:u,failureStage:"",writebackDetails:p,phases:Er(y,f,p)}}}catch(x){let h=Date.now()-r,C=d||Oe.UNKNOWN,T=u||ke.NOT_APPLICABLE;return P.emit(M.TOOL_EXECUTION_FAILED,{toolId:o,traceId:n,sessionKey:a,error:x.message||String(x),duration:h,mode:Tt.FOLLOW_AI}),{success:!1,toolId:o,error:x.message||String(x),duration:h,meta:{traceId:n,sessionKey:a,executionKey:i,slotBindingKey:s?.slotBindingKey||"",slotTransactionId:s?.slotTransactionId||"",sourceMessageId:s?.sourceMessageId||s?.confirmedAssistantMessageId||s?.messageId||"",sourceSwipeId:s?.sourceSwipeId||s?.confirmedAssistantSwipeId||s?.effectiveSwipeId||"",confirmedAssistantSwipeId:s?.confirmedAssistantSwipeId||"",effectiveSwipeId:s?.effectiveSwipeId||"",slotRevisionKey:s?.slotRevisionKey||"",messageCount:y.length,selectors:c,apiPreset:l,writebackStatus:T,failureStage:C,writebackDetails:p,phases:Er(y,f,p)}}}}async runToolInline(e,s){return this.runToolFollowAiManual(e,s)}async previewExtraction(e,s){return{success:!0,...this.getExtractionSnapshot(e,s)}}getExtractionSnapshot(e,s){let r=this._buildRecentMessageExtractionEntries(e,s),o=this._joinMessageBlocks(r,"rawText"),n=this._joinMessageBlocks(r,"filteredText"),a=this._joinMessageBlocks(r,"extractedText",{skipEmpty:!0}),i=(Array.isArray(r)?r:[]).map(c=>String(c?.extractedText||"").trim()).filter(Boolean).join(`

`),l=Array.isArray(r)&&r.length>0?r[r.length-1]:null;return{sourceText:o,filteredSourceText:n,extractedText:a,extractedRawText:i,messageEntries:r,primaryEntry:l,selectors:this._getExtractionSelectors(e),maxMessages:e?.extraction?.maxMessages||5}}async _buildToolMessages(e,s){let r=this._buildRecentMessageExtractionEntries(e,s),o=this._joinMessageBlocks(r,"rawText"),n=this._joinMessageBlocks(r,"filteredText"),a=this._joinMessageBlocks(r,"extractedText",{skipEmpty:!0}),i={...s,rawRecentMessagesText:o,recentMessagesText:n,extractedContent:a,toolContentMacro:this._buildToolContentMacro(r),toolName:e.name,toolId:e.id};return Xs.buildToolMessages(e,i)}_normalizeRole(e){if(!e)return"user";let s=String(e).toLowerCase();return s==="system"?"system":s==="assistant"?"assistant":"user"}setApiConnection(e){this._apiConnection=e}async _sendApiRequest(e,s,r={}){if(!this._apiConnection)throw new Error("API\u8FDE\u63A5\u6A21\u5757\u672A\u914D\u7F6E");let{timeoutMs:o=9e4,signal:n}=r,a=null;if(e){if(!Ur(e))throw new Error(`\u672A\u627E\u5230 API \u9884\u8BBE\u201C${e}\u201D\uFF0C\u8BF7\u91CD\u65B0\u9009\u62E9\u6216\u4FDD\u5B58\u540E\u518D\u6267\u884C`);a=zr(e)}else a=zr();let i=dr(a||{});if(!i.valid&&!a?.useMainApi)throw new Error(`API\u914D\u7F6E\u65E0\u6548\uFF1A${i.errors.join("\uFF0C")}\u3002\u8BF7\u5148\u5B8C\u5584\u81EA\u5B9A\u4E49API\u914D\u7F6E\uFF0C\u6216\u542F\u7528\u201C\u4F7F\u7528SillyTavern\u4E3BAPI\u201D`);if(this._apiConnection.sendApiRequest)return await this._apiConnection.sendApiRequest(s,{timeoutMs:o,apiConfig:a},n);throw new Error("\u6CA1\u6709\u53EF\u7528\u7684API\u53D1\u9001\u65B9\u6CD5")}async _getRequestTimeout(){return St.getSettings().executor?.requestTimeoutMs||9e4}_extractOutputContent(e,s){if(!e)return"";if(typeof e=="string")return this._applyOutputExtractionSelectors(e,s);if(typeof e=="object"){if(e.choices&&e.choices[0]?.message?.content)return this._applyOutputExtractionSelectors(e.choices[0].message.content,s);if(e.content)return this._applyOutputExtractionSelectors(e.content,s);if(e.text)return this._applyOutputExtractionSelectors(e.text,s);if(e.message)return this._applyOutputExtractionSelectors(e.message,s);try{return this._applyOutputExtractionSelectors(JSON.stringify(e,null,2),s)}catch{return this._applyOutputExtractionSelectors(String(e),s)}}return this._applyOutputExtractionSelectors(String(e),s)}_applyOutputExtractionSelectors(e,s){let r=typeof e=="string"?e:String(e||""),o=this._getExtractionSelectors(s);if(!o.length)return r.trim();let n=[];for(let a of o){let i=String(a||"").trim();if(!i)continue;if(i.startsWith("regex:")){let c=i.slice(6).trim();if(!c)continue;try{let d=new RegExp(c,"gi");[...r.matchAll(d)].forEach(p=>{let y=String(p?.[0]||"").trim();y&&n.push(y)})}catch(d){Qs.warn("\u5DE5\u5177\u8F93\u51FA\u6B63\u5219\u63D0\u53D6\u5931\u8D25\uFF0C\u8DF3\u8FC7\u8BE5\u89C4\u5219",{selector:i,error:d})}continue}let l=i.replace(/^<|>$/g,"").trim();if(l)try{let c=new RegExp(`<${l}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${l}>`,"gi");(r.match(c)||[]).forEach(u=>{let p=String(u||"").trim();p&&n.push(p)})}catch(c){Qs.warn("\u5DE5\u5177\u8F93\u51FA\u6807\u7B7E\u63D0\u53D6\u5931\u8D25\uFF0C\u8DF3\u8FC7\u8BE5\u89C4\u5219",{selector:i,error:c})}}return n.length>0?n.join(`

`).trim():r.trim()}_getExtractionSelectors(e){let s=e?.extraction?.selectors;return Array.isArray(s)&&s.length>0?s.map(r=>String(r||"").trim()).filter(Boolean):Array.isArray(e?.extractTags)&&e.extractTags.length>0?e.extractTags.map(r=>String(r||"").trim()).filter(Boolean):[]}_applyExtractionSelectors(e,s){return this._applyExtractionSelectorsInternal(e,s,{strict:!1})}_applyExtractionSelectorsInternal(e,s,r={}){let o=typeof e=="string"?e:String(e||""),n=this._getExtractionSelectors(s),{strict:a=!1}=r;if(!n.length)return o.trim();let i=n.map((c,d)=>{let u=String(c||"").trim(),p=u.startsWith("regex:");return{id:`tool-extract-${d}`,type:p?"regex_include":"include",value:p?u.slice(6).trim():u,enabled:!0}}).filter(c=>c.value),l=es(o,i,[]);return a?(l||"").trim():l||o.trim()}_extractToolContent(e,s){let r=typeof s=="string"?s:String(s||"");return this._getExtractionSelectors(e).length?this._applyExtractionSelectorsInternal(r,e,{strict:!0}):r.trim()}_applyGlobalContextRules(e){let s=typeof e=="string"?e:String(e||"");if(!s.trim())return"";try{let r=mr()||[],o=br()||[];return!Array.isArray(r)||r.length===0?s.trim():es(s,r,o)||s.trim()}catch(r){return Qs.warn("\u5E94\u7528\u5168\u5C40\u6B63\u6587\u63D0\u53D6\u89C4\u5219\u5931\u8D25\uFF0C\u56DE\u9000\u539F\u59CB\u6587\u672C",{error:r}),s.trim()}}_getMessageText(e){if(!e)return"";let s=[e.content,e.mes,e.message,e.text,e?.data?.content];for(let r of s)if(typeof r=="string"&&r.trim())return r.trim();return""}_collectRecentAssistantMessages(e,s){return this._collectRecentAssistantMessageEntries(e,s).map(r=>r.text).filter(Boolean).join(`

`)}_collectRecentAssistantMessageEntries(e,s){let r=Math.max(1,parseInt(e?.extraction?.maxMessages,10)||5),o=Array.isArray(s?.chatMessages)?s.chatMessages:[],n=[];for(let i=o.length-1;i>=0&&n.length<r;i-=1){let l=o[i],c=String(l?.role||"").toLowerCase(),d=c==="assistant"||c==="ai"||!l?.is_user&&!l?.is_system&&!c,u=this._getMessageText(l);d&&u&&n.unshift({text:u,message:l,chatIndex:i})}if(n.length>0)return n;let a=s?.lastAiMessage||s?.input?.lastAiMessage||"";return a?[{text:a,message:null,chatIndex:-1}]:[]}_buildRecentMessageExtractionEntries(e,s){return this._collectRecentAssistantMessageEntries(e,s).map((o,n)=>{let a=o.text||"",i=this._applyGlobalContextRules(a),l=this._extractToolContent(e,a);return{...o,order:n+1,rawText:a,filteredText:i,extractedText:l,fullMessageText:a}})}_joinMessageBlocks(e,s,r={}){let o=Array.isArray(e)?e:[],{skipEmpty:n=!1}=r;return o.map(i=>{let l=String(i?.[s]||"").trim();return n&&!l?"":`${`\u3010\u7B2C ${i?.order||0} \u6761 AI \u6D88\u606F\u3011`}
${l||"(\u7A7A)"}`}).filter(Boolean).join(`

--------------------------------

`)}_buildToolContentMacro(e){return(Array.isArray(e)?e:[]).map(o=>{let n=`\u3010\u7B2C ${o?.order||0} \u6761 AI \u6D88\u606F\u3011`,a=String(o?.filteredText||"").trim()||"(\u7A7A)",i=String(o?.extractedText||"").trim()||"(\u7A7A)";return`${n}
\u6B63\u6587\uFF1A
${a}

\u5DE5\u5177\uFF1A
${i}`}).filter(Boolean).join(`

--------------------------------

`).trim()}filterPostResponseTools(e){return Array.isArray(e)?e.filter(s=>this.shouldRunPostResponse(s)):[]}filterAutoPostResponseTools(e){return Array.isArray(e)?e.filter(s=>this.shouldRunPostResponse(s)):[]}filterInlineTools(e){return Array.isArray(e)?e.filter(s=>this.shouldRunInline(s)):[]}setDebugMode(e){this.debugMode=e}},Ft=new In,Cm=Ft});function jd(t={}){return!t||typeof t!="object"?{}:Object.entries(t).reduce((e,[s,r])=>(e[s]=r===!0,e),{})}function Mm(t,e={}){let s=e?.direction==="unescape"?"unescape":"escape",r=jd(e?.options);return km.reduce((o,n)=>r[n.key]!==!0?o:s==="unescape"?o.replace(n.escaped,n.unescaped):o.replace(n.plain,n.replacement),String(t||""))}function Rm(t,e={}){if((e?.direction||"en_to_zh")!=="en_to_zh")return String(t||"");let r=jd(e?.options);return Im.reduce((o,n)=>r[n.key]!==!0?o:o.replace(n.from,n.to),String(t||""))}function Fd(t,e){let s=t?.processor||{},r=s?.type||"",o=String(e||"");switch(r){case Ud.ESCAPE_TRANSFORM:return Mm(o,s);case Ud.PUNCTUATION_TRANSFORM:return Rm(o,s);default:return o}}var km,Im,Ud,Kd=R(()=>{km=[{key:"newline",plain:/\r\n|\r|\n/g,escaped:/\\n/g,replacement:"\\n",unescaped:`
`},{key:"doubleQuote",plain:/"/g,escaped:/\\"/g,replacement:'\\"',unescaped:'"'},{key:"singleQuote",plain:/'/g,escaped:/\\'/g,replacement:"\\'",unescaped:"'"}],Im=[{key:"comma",from:/,/g,to:"\uFF0C"},{key:"period",from:/\./g,to:"\u3002"},{key:"exclamation",from:/!/g,to:"\uFF01"},{key:"question",from:/\?/g,to:"\uFF1F"},{key:"semicolon",from:/;/g,to:"\uFF1B"},{key:"colon",from:/:/g,to:"\uFF1A"},{key:"leftParen",from:/\(/g,to:"\uFF08"},{key:"rightParen",from:/\)/g,to:"\uFF09"}],Ud={ESCAPE_TRANSFORM:"escape_transform",PUNCTUATION_TRANSFORM:"punctuation_transform"}});var pi={};te(pi,{abortAllTasks:()=>Om,abortTask:()=>Nm,buildToolMessages:()=>qd,clearExecutionHistory:()=>jm,createExecutionContext:()=>Hm,createResult:()=>Rn,enhanceMessagesWithBypass:()=>qm,executeBatch:()=>Dm,executeTool:()=>Hd,executeToolWithConfig:()=>Yd,executeToolsBatch:()=>Vm,executorState:()=>Se,extractFailed:()=>Wm,extractSuccessful:()=>Km,generateTaskId:()=>Zs,getExecutionHistory:()=>Um,getExecutorStatus:()=>zm,getScheduler:()=>Cr,mergeResults:()=>Fm,pauseExecutor:()=>Lm,resumeExecutor:()=>Bm,setMaxConcurrent:()=>$m});function Rn(t,e,s,r,o,n,a=0){return{success:s,taskId:t,toolId:e,data:r,error:o,duration:n,retries:a,timestamp:Date.now(),metadata:{}}}function Zs(){return`task_${Date.now()}_${Math.random().toString(36).substr(2,9)}`}function Pm(t,e={}){return{id:Zs(),toolId:t,options:e,status:"pending",createdAt:Date.now(),startedAt:null,completedAt:null,retries:0,maxRetries:e.maxRetries||3}}function Cr(){return mo||(mo=new yi(Se.maxConcurrent)),mo}function $m(t){Se.maxConcurrent=Math.max(1,Math.min(10,t)),mo&&(mo.maxConcurrent=Se.maxConcurrent)}async function Hd(t,e={},s){let r=Cr(),o=Pm(t,e);for(;Se.isPaused;)await new Promise(n=>setTimeout(n,100));try{let n=await r.enqueue(async a=>{if(a.aborted)throw new DOMException("\u4EFB\u52A1\u5DF2\u4E2D\u6B62","AbortError");if(typeof s=="function")return await s(a,e);throw new Error("\u6267\u884C\u5668\u5FC5\u987B\u662F\u4E00\u4E2A\u51FD\u6570")},o);return Wd(n),n}catch(n){let a=Rn(o.id,t,!1,null,n,Date.now()-o.createdAt,o.retries);return Wd(a),a}}async function Dm(t,e={}){let{failFast:s=!1,concurrency:r=Se.maxConcurrent}=e,o=[],n=Cr(),a=n.maxConcurrent;n.maxConcurrent=r;try{let i=t.map(({toolId:l,options:c,executor:d})=>Hd(l,c,d));if(s)for(let l of i){let c=await l;if(o.push(c),!c.success){n.abortAll();break}}else{let l=await Promise.allSettled(i);for(let c of l)c.status==="fulfilled"?o.push(c.value):o.push(Rn(Zs(),"unknown",!1,null,c.reason,0,0))}}finally{n.maxConcurrent=a}return o}function Nm(t){return Cr().abort(t)}function Om(){Cr().abortAll(),Se.executionQueue=[]}function Lm(){Se.isPaused=!0}function Bm(){Se.isPaused=!1}function zm(){return{...Cr().getStatus(),isPaused:Se.isPaused,activeControllers:Se.activeControllers.size,historyCount:Se.executionHistory.length}}function Wd(t){Se.executionHistory.push(t),Se.executionHistory.length>100&&Se.executionHistory.shift()}function Um(t={}){let e=[...Se.executionHistory];return t.toolId&&(e=e.filter(s=>s.toolId===t.toolId)),t.success!==void 0&&(e=e.filter(s=>s.success===t.success)),t.limit&&(e=e.slice(-t.limit)),e}function jm(){Se.executionHistory=[]}function Fm(t){let e={success:!0,data:[],errors:[],totalDuration:0,successCount:0,failureCount:0};for(let s of t)e.totalDuration+=s.duration,s.success?(e.successCount++,s.data!==void 0&&s.data!==null&&e.data.push(s.data)):(e.success=!1,e.failureCount++,s.error&&e.errors.push({taskId:s.taskId,toolId:s.toolId,error:s.error.message||String(s.error)}));return e}function Km(t){return t.filter(e=>e.success).map(e=>e.data)}function Wm(t){return t.filter(e=>!e.success).map(e=>({taskId:e.taskId,toolId:e.toolId,error:e.error}))}function Hm(t={}){return{taskId:Zs(),startTime:Date.now(),signal:t.signal||null,apiConfig:t.apiConfig||null,bypassMessages:t.bypassMessages||[],context:t.context||{},metadata:t.metadata||{}}}function qm(t,e){return!e||e.length===0?t:[...e,...t]}function Ym(t){return t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function qd(t,e){let s=[],r=t.promptTemplate||"",o={"{{userMessage}}":e.input?.userMessage||"","{{lastAiMessage}}":e.input?.lastAiMessage||"","{{extractedContent}}":e.input?.extractedContent||"","{{previousToolOutput}}":e.input?.previousToolOutput||"","{{context}}":JSON.stringify(e.input?.context||{}),"{{pg}}":e.input?.context?.pg||"1","{{time}}":e.input?.context?.time||"","{{scene}}":e.input?.context?.scene||"","{{plot}}":e.input?.context?.plot||"","{{mq}}":e.input?.context?.mq||"\u2160","{{mqStatus}}":e.input?.context?.mqStatus||"\u8FDB\u884C\u4E2D","{{sq}}":e.input?.context?.sq||"1","{{sqStatus}}":e.input?.context?.sqStatus||"\u8FDB\u884C\u4E2D","{{latestSq}}":e.input?.context?.latestSq||"1","{{completed}}":e.input?.context?.completed||"\u65E0","{{defined}}":e.input?.context?.defined||"","{{status}}":e.input?.context?.status||"","{{seeds}}":e.input?.context?.seeds||"","{{name}}":e.input?.context?.name||"","{{location}}":e.input?.context?.location||"","{{condition}}":e.input?.context?.condition||"","{{equipment}}":e.input?.context?.equipment||"","{{skills}}":e.input?.context?.skills||""};for(let[n,a]of Object.entries(o))r=r.replace(new RegExp(Ym(n),"g"),a);return s.push({role:"USER",content:r}),s}async function Yd(t,e,s={}){let r=Q(t);if(!r)return{success:!1,taskId:Zs(),toolId:t,error:"\u5DE5\u5177\u914D\u7F6E\u4E0D\u5B58\u5728",duration:0};if(!r.enabled)return{success:!1,taskId:Zs(),toolId:t,error:"\u5DE5\u5177\u672A\u542F\u7528",duration:0};let o=Date.now(),n=Zs();try{P.emit(M.TOOL_EXECUTION_STARTED,{toolId:t,taskId:n,context:e});let a=qd(r,e);if(typeof s.callApi=="function"){let i=r.output?.apiPreset||r.apiPreset||"",l=i?{preset:i}:null,c=await s.callApi(a,l,s.signal),d=c;r.outputMode==="separate"&&r.extractTags?.length>0&&(d=Gm(c,r.extractTags));let u={success:!0,taskId:n,toolId:t,data:d,duration:Date.now()-o};return P.emit(M.TOOL_EXECUTED,{toolId:t,taskId:n,result:u}),u}else return{success:!0,taskId:n,toolId:t,data:{messages:a,config:{apiPreset:r.output?.apiPreset||r.apiPreset||"",outputMode:r.outputMode,extractTags:r.extractTags}},duration:Date.now()-o,needsExecution:!0}}catch(a){let i={success:!1,taskId:n,toolId:t,error:a.message||String(a),duration:Date.now()-o};return P.emit(M.TOOL_EXECUTION_FAILED,{toolId:t,taskId:n,error:a}),i}}function Gm(t,e){let s={};for(let r of e){let o=new RegExp(`<${r}[^>]*>([\\s\\S]*?)<\\/${r}>`,"gi"),n=t.match(o);n&&(s[r]=n.map(a=>{let i=a.match(new RegExp(`<${r}[^>]*>([\\s\\S]*?)<\\/${r}>`,"i"));return i?i[1].trim():""}))}return s}async function Vm(t,e,s={}){let r=[];for(let o of t){let n=Q(o);if(n&&n.enabled){let a=await Yd(o,e,s);r.push(a)}}return r}var Se,yi,mo,fi=R(()=>{ts();Me();Se={activeControllers:new Map,executionQueue:[],runningCount:0,maxConcurrent:3,executionHistory:[],isPaused:!1};yi=class{constructor(e=3){this.maxConcurrent=e,this.queue=[],this.running=new Map,this.isProcessing=!1}enqueue(e,s){return new Promise((r,o)=>{this.queue.push({executor:e,task:s,resolve:r,reject:o}),this.process()})}async process(){if(!this.isProcessing){for(this.isProcessing=!0;this.queue.length>0&&this.running.size<this.maxConcurrent;){let e=this.queue.shift();if(!e)continue;let{executor:s,task:r,resolve:o,reject:n}=e,a=new AbortController;r.abortController=a,r.status="running",r.startedAt=Date.now(),this.running.set(r.id,r),Se.activeControllers.set(r.id,a),this.executeTask(s,r,a.signal).then(i=>{r.status="completed",r.completedAt=Date.now(),o(i)}).catch(i=>{r.status=i.name==="AbortError"?"aborted":"failed",r.completedAt=Date.now(),n(i)}).finally(()=>{this.running.delete(r.id),Se.activeControllers.delete(r.id),Se.runningCount=this.running.size})}this.isProcessing=!1}}async executeTask(e,s,r){let o=Date.now(),n=null;for(let a=0;a<=s.maxRetries;a++){if(r.aborted)throw new DOMException("\u4EFB\u52A1\u5DF2\u4E2D\u6B62","AbortError");try{let i=await e(r);return Rn(s.id,s.toolId,!0,i,null,Date.now()-o,a)}catch(i){if(n=i,i.name==="AbortError")throw i;a<s.maxRetries&&(await this.delay(1e3*(a+1)),s.retries=a+1)}}throw n}delay(e){return new Promise(s=>setTimeout(s,e))}abort(e){let s=Se.activeControllers.get(e);return s?(s.abort(),!0):!1}abortAll(){for(let e of Se.activeControllers.values())e.abort();Se.activeControllers.clear(),this.queue=[],this.running.clear()}getStatus(){return{pending:this.queue.length,running:this.running.size,maxConcurrent:this.maxConcurrent}}},mo=null});async function Xm(){return gi||(gi=Promise.resolve().then(()=>(fi(),pi))),gi}async function Qm(t,e,s){return s&&t.output?.mode===Tt.POST_RESPONSE_API?Ft.runToolPostResponse(t,e):s&&t.output?.mode===Tt.FOLLOW_AI?Ft.runToolFollowAiManual(t,e):(await Xm()).executeToolWithConfig(t.id,e)}function Zm(t,e){return e?.runSource==="MANUAL"?t.output?.mode==="local_transform"||t.processor?.type?er.MANUAL_LOCAL_TRANSFORM:t.output?.mode===Tt.POST_RESPONSE_API?er.MANUAL_POST_RESPONSE_API:er.MANUAL_COMPATIBILITY:er.MANUAL_POST_RESPONSE_API}function Pn(t,e){try{ei(t,e)}catch(s){Jm.warn("\u66F4\u65B0\u5DE5\u5177\u8FD0\u884C\u65F6\u72B6\u6001\u5931\u8D25:",{toolId:t,error:s})}}function eb(t,e,s){let r=String(t||""),o=String(e||"").trim(),n=String(s||"").trim();return!r.trim()||!o?{nextMessageText:"",replaced:!1}:r.includes(o)?{nextMessageText:r.replace(o,n).trim(),replaced:!0}:{nextMessageText:"",replaced:!1}}async function tb(t,e){let s=Ft.getExtractionSnapshot(t,e),r=s?.primaryEntry||null,o=String(r?.fullMessageText||e?.lastAiMessage||"").trim(),n=String(r?.extractedText||s?.extractedRawText||s?.extractedText||"").trim(),a=Array.isArray(s?.selectors)?s.selectors:[],i=e?.traceId||`trace_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,l=e?.sessionKey||"";if(!n||!o)return{success:!1,error:"\u672A\u63D0\u53D6\u5230\u53EF\u5904\u7406\u5185\u5BB9\uFF0C\u8BF7\u5148\u68C0\u67E5\u6807\u7B7E\u6216\u6B63\u5219\u89C4\u5219",meta:{traceId:i,sessionKey:l,selectors:a,writebackStatus:ke.NOT_APPLICABLE,failureStage:Oe.EXTRACT_OUTPUT,extraction:s}};let c=String(Fd(t,n)||"").trim(),d=eb(o,n,c),u=d.replaced?d.nextMessageText:c,p=null,y=ke.NOT_APPLICABLE;if(u){if(p=await ut.injectDetailed(t.id,u,{overwrite:!0,sourceMessageId:e?.sourceMessageId||e?.confirmedAssistantMessageId||e?.messageId||"",sourceSwipeId:e?.sourceSwipeId||e?.confirmedAssistantSwipeId||e?.effectiveSwipeId||"",effectiveSwipeId:e?.effectiveSwipeId||e?.confirmedAssistantSwipeId||"",slotBindingKey:e?.slotBindingKey||"",slotRevisionKey:e?.slotRevisionKey||"",slotTransactionId:e?.slotTransactionId||"",extractionSelectors:[],replaceFullMessage:d.replaced,traceId:i,sessionKey:l}),!p?.success)return{success:!1,error:p?.error||"\u672C\u5730\u5904\u7406\u5B8C\u6210\uFF0C\u4F46\u5199\u56DE\u5931\u8D25",meta:{traceId:i,sessionKey:l,selectors:a,writebackStatus:ke.FAILED,failureStage:Oe.INJECT_CONTEXT,writebackDetails:p,extraction:s}};y=ke.SUCCESS}else y=ke.SKIPPED_EMPTY_OUTPUT;return{success:!0,output:c,meta:{traceId:i,sessionKey:l,selectors:a,writebackStatus:y,failureStage:"",writebackDetails:p,extraction:s}}}async function sb(t,e){let s=Date.now(),r=t.id,o=`yyt-tool-run-${r}`,n=Zm(t,e),a=e?.executionKey||"";Pn(r,{lastStatus:"running",lastError:"",lastDurationMs:0,lastTraceId:e?.traceId||"",lastMessageKey:e?.messageId||"",lastExecutionKey:a,lastExecutionPath:n,lastWritebackStatus:"",lastFailureStage:"",lastSlotBindingKey:e?.slotBindingKey||"",lastSlotRevisionKey:e?.slotRevisionKey||"",lastSlotTransactionId:e?.slotTransactionId||"",lastSourceMessageId:e?.sourceMessageId||e?.messageId||"",lastSourceSwipeId:e?.sourceSwipeId||e?.effectiveSwipeId||"",lastContentCommitted:!1,lastHostCommitApplied:!1,lastRefreshRequested:!1,lastRefreshConfirmed:!1,lastPreferredCommitMethod:"",lastAppliedCommitMethod:"",lastRefreshMethodCount:0,lastRefreshMethods:[],lastRefreshConfirmChecks:0,lastRefreshConfirmedBy:""}),ce("info",`\u6B63\u5728\u624B\u52A8\u6267\u884C ${t.name}`,{sticky:!0,noticeId:o});try{let i=n===er.MANUAL_LOCAL_TRANSFORM?await tb(t,e):await Qm(t,e,!0),l=Date.now()-s;if(i?.success){let p=Q(r),y=i?.meta?.writebackDetails||{};return Pn(r,{lastStatus:"success",lastError:"",lastDurationMs:l,lastTraceId:e?.traceId||"",successCount:(p?.runtime?.successCount||0)+1,lastMessageKey:e?.messageId||"",lastExecutionKey:a,lastExecutionPath:n,lastWritebackStatus:i?.meta?.writebackStatus||ke.NOT_APPLICABLE,lastFailureStage:i?.meta?.failureStage||"",lastSlotBindingKey:e?.slotBindingKey||"",lastSlotRevisionKey:e?.slotRevisionKey||"",lastSlotTransactionId:e?.slotTransactionId||"",lastSourceMessageId:e?.sourceMessageId||e?.messageId||"",lastSourceSwipeId:e?.sourceSwipeId||e?.effectiveSwipeId||"",lastContentCommitted:!!y.contentCommitted,lastHostCommitApplied:!!y.hostCommitApplied,lastRefreshRequested:!!y.refreshRequested,lastRefreshConfirmed:!!y.refreshConfirmed,lastPreferredCommitMethod:y?.commit?.preferredMethod||"",lastAppliedCommitMethod:y?.commit?.appliedMethod||"",lastRefreshMethodCount:Array.isArray(y?.refresh?.requestMethods)?y.refresh.requestMethods.length:0,lastRefreshMethods:Array.isArray(y?.refresh?.requestMethods)?[...y.refresh.requestMethods]:[],lastRefreshConfirmChecks:Number(y?.refresh?.confirmChecks)||0,lastRefreshConfirmedBy:y?.refresh?.confirmedBy||""}),k("success",`${t.name} \u624B\u52A8\u6267\u884C\u5B8C\u6210`),ce("success",`${t.name} \u624B\u52A8\u6267\u884C\u5B8C\u6210`,{duration:3200,noticeId:o}),{success:!0,duration:l,result:i}}let c=Q(r),d=i?.error||"\u5DE5\u5177\u6267\u884C\u5931\u8D25",u=i?.meta?.writebackDetails||{};return Pn(r,{lastStatus:"error",lastError:d,lastDurationMs:l,lastTraceId:e?.traceId||"",errorCount:(c?.runtime?.errorCount||0)+1,lastMessageKey:e?.messageId||"",lastExecutionKey:a,lastExecutionPath:n,lastWritebackStatus:i?.meta?.writebackStatus||ke.NOT_APPLICABLE,lastFailureStage:i?.meta?.failureStage||(n===er.MANUAL_COMPATIBILITY?Oe.COMPATIBILITY_EXECUTE:Oe.UNKNOWN),lastSlotBindingKey:e?.slotBindingKey||"",lastSlotRevisionKey:e?.slotRevisionKey||"",lastSlotTransactionId:e?.slotTransactionId||"",lastSourceMessageId:e?.sourceMessageId||e?.messageId||"",lastSourceSwipeId:e?.sourceSwipeId||e?.effectiveSwipeId||"",lastContentCommitted:!!u.contentCommitted,lastHostCommitApplied:!!u.hostCommitApplied,lastRefreshRequested:!!u.refreshRequested,lastRefreshConfirmed:!!u.refreshConfirmed,lastPreferredCommitMethod:u?.commit?.preferredMethod||"",lastAppliedCommitMethod:u?.commit?.appliedMethod||"",lastRefreshMethodCount:Array.isArray(u?.refresh?.requestMethods)?u.refresh.requestMethods.length:0,lastRefreshMethods:Array.isArray(u?.refresh?.requestMethods)?[...u.refresh.requestMethods]:[],lastRefreshConfirmChecks:Number(u?.refresh?.confirmChecks)||0,lastRefreshConfirmedBy:u?.refresh?.confirmedBy||""}),k("error",`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${d}`),ce("error",`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${d}`,{sticky:!0,noticeId:o}),{success:!1,duration:l,error:d,result:i}}catch(i){let l=Date.now()-s,c=Q(r),d=i?.message||String(i);throw Pn(r,{lastStatus:"error",lastError:d,lastDurationMs:l,lastTraceId:e?.traceId||"",errorCount:(c?.runtime?.errorCount||0)+1,lastMessageKey:e?.messageId||"",lastExecutionKey:a,lastExecutionPath:n,lastWritebackStatus:ke.NOT_APPLICABLE,lastFailureStage:n===er.MANUAL_COMPATIBILITY?Oe.COMPATIBILITY_EXECUTE:Oe.UNKNOWN,lastSlotBindingKey:e?.slotBindingKey||"",lastSlotRevisionKey:e?.slotRevisionKey||"",lastSlotTransactionId:e?.slotTransactionId||"",lastSourceMessageId:e?.sourceMessageId||e?.messageId||"",lastSourceSwipeId:e?.sourceSwipeId||e?.effectiveSwipeId||"",lastContentCommitted:!1,lastHostCommitApplied:!1,lastRefreshRequested:!1,lastRefreshConfirmed:!1,lastPreferredCommitMethod:"",lastAppliedCommitMethod:"",lastRefreshMethodCount:0,lastRefreshMethods:[],lastRefreshConfirmChecks:0,lastRefreshConfirmedBy:""}),k("error",`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${d}`),ce("error",`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${d}`,{sticky:!0,noticeId:o}),i}}async function $n(t){if(!t)return{success:!1,error:"\u7F3A\u5C11\u5DE5\u5177ID"};let e=Q(t);if(!e)return{success:!1,error:"\u5DE5\u5177\u4E0D\u5B58\u5728"};if(!e.enabled)return xs(t,{lastMessageKey:"",lastExecutionKey:"",lastExecutionPath:"",lastWritebackStatus:ke.NOT_APPLICABLE,lastFailureStage:"",lastContentCommitted:!1,lastHostCommitApplied:!1,lastRefreshRequested:!1,lastRefreshConfirmed:!1,lastPreferredCommitMethod:"",lastAppliedCommitMethod:"",lastRefreshMethodCount:0,lastRefreshMethods:[],lastRefreshConfirmChecks:0,lastRefreshConfirmedBy:""},{touchLastRunAt:!1,emitEvent:!1}),ce("warning",`${e.name} \u672A\u542F\u7528\uFF0C\u65E0\u6CD5\u624B\u52A8\u6267\u884C`,{duration:2800,noticeId:`yyt-tool-run-${t}`}),{success:!1,error:"\u5DE5\u5177\u672A\u542F\u7528"};let s=await zs({runSource:"MANUAL"});return sb(e,s)}async function Dn(t){if(!t)return{success:!1,error:"\u7F3A\u5C11\u5DE5\u5177ID"};let e=Q(t);if(!e)return{success:!1,error:"\u5DE5\u5177\u4E0D\u5B58\u5728"};let s=await zs({runSource:"MANUAL_PREVIEW"});return Ft.previewExtraction(e,s)}var Jm,er,gi,mi=R(()=>{ts();Mn();js();Js();Kd();Ne();J();Jm=I.createScope("ToolTrigger"),er={MANUAL_POST_RESPONSE_API:"manual_post_response_api",MANUAL_LOCAL_TRANSFORM:"manual_local_transform",MANUAL_COMPATIBILITY:"manual_compatibility"},gi=null});var Vd={};te(Vd,{TOOL_CONFIG_PANEL_STYLES:()=>Nn,createToolConfigPanel:()=>Ss,default:()=>ub});function Gd(t){return t?t.length!==void 0&&typeof t.get=="function"?t.get(0):t:null}function rb(t){if(!Number.isFinite(t)||t<=0)return"\u4ECE\u672A";let e=Date.now()-t;if(e<6e4)return`${Math.floor(e/1e3)} \u79D2\u524D`;if(e<36e5)return`${Math.floor(e/6e4)} \u5206\u949F\u524D`;if(e<864e5)return`${Math.floor(e/36e5)} \u5C0F\u65F6\u524D`;try{return new Date(t).toLocaleString()}catch{return"\u672A\u77E5"}}function ob(t){let e=oe.getPreset(t);if(!e)return[];let s=[];for(let r of e.rules||[])r.enabled!==!1&&(r.type==="include"&&r.value?s.push(String(r.value)):r.type==="regex_include"&&r.value&&s.push(`regex:${r.value}`));return s}function nb(t){let e=be.getPreset(t);if(!e)return{enabled:!1,selected:[]};let s=(e.bookList||[]).filter(r=>r.enabled!==!1).map(r=>r.bookName).filter(Boolean);return{enabled:s.length>0,selected:s}}function Ss(t={}){let{id:e,toolId:s,postResponseHint:r,previewDialogId:o,previewTitle:n="\u6D4B\u8BD5\u63D0\u53D6\u7ED3\u679C"}=t;return{id:e,toolId:s,renderTo(a){let i=Gd(a);if(!i)return;if(i._yytToolPanelCleanup)try{i._yytToolPanelCleanup()}catch{}let l=()=>this.renderTo(a),c=Q(s);if(!c){i.innerHTML='<div class="yyt-empty-state-small">\u5DE5\u5177\u914D\u7F6E\u52A0\u8F7D\u5931\u8D25</div>';return}let d=m("div",{className:"yyt-tool-panel",dataset:{toolId:s}}),u=[];d.appendChild(ab(c,s,l,r)),d.appendChild(ib(c));let p=lb(c,s,l);u.push(p),d.appendChild(p.el);let y=cb(c,s,l,a,o,n);u.push(y),d.appendChild(y.el),i.innerHTML="",i.appendChild(d),i._yytToolPanelCleanup=()=>{for(let f of u)try{f.destroy()}catch{}delete i._yytToolPanelCleanup}},destroy(a){let i=Gd(a);if(i?._yytToolPanelCleanup)try{i._yytToolPanelCleanup()}catch{}},getStyles(){return""}}}function ab(t,e,s,r){let o=m("div",{className:"yyt-tool-panel-hero"}),n=m("div",{className:"yyt-tool-panel-hero-row1"});n.appendChild(m("div",{className:"yyt-tool-panel-hero-icon",text:"\u{1F527}"})),n.appendChild(m("div",{className:"yyt-tool-panel-hero-name",text:t.name||e}));let a=m("div",{className:"yyt-tool-panel-hero-actions"});a.appendChild(se({label:"\u25B6 \u7ACB\u5373\u6267\u884C\u4E00\u6B21",size:"small",onClick:async()=>{try{await $n(e),k("\u5DF2\u89E6\u53D1\u624B\u52A8\u6267\u884C","success")}catch(f){k(`\u6267\u884C\u5931\u8D25\uFF1A${f?.message||f}`,"error")}}}).el),a.appendChild(se({label:"\u{1F4BE} \u4FDD\u5B58\u914D\u7F6E",size:"small",variant:"primary",onClick:()=>{k("\u914D\u7F6E\u5DF2\u4FDD\u5B58","success"),s()}}).el),n.appendChild(a),o.appendChild(n),t.description&&o.appendChild(m("div",{className:"yyt-tool-panel-hero-desc",text:t.description}));let i=m("div",{className:"yyt-tool-panel-hero-chips"}),c=(t.output?.mode||"follow_ai")==="post_response_api"?"\u989D\u5916 AI \u89E3\u6790\uFF08\u81EA\u52A8\uFF09":"\u968F AI \u8F93\u51FA\uFF08\u624B\u52A8\uFF09";i.appendChild(m("span",{className:"yyt-tool-hero-chip mode",text:c}));let d=t.output?.apiPreset||t.apiPreset||"";d&&i.appendChild(m("span",{className:"yyt-tool-hero-chip preset",text:`API: ${d}`}));let u=t.extraction?.regexPresetId||"";if(u){let f=oe.getPreset(u);f&&i.appendChild(m("span",{className:"yyt-tool-hero-chip preset",text:`\u6B63\u5219: ${f.name}`}))}let p=t.worldbooks?.presetId||"";if(p){let f=be.getPreset(p);f&&i.appendChild(m("span",{className:"yyt-tool-hero-chip preset",text:`\u4E16\u754C\u4E66: ${f.name}`}))}let y=t.runtime?.lastStatus;if(y){let f=y==="success"?"status-success":y==="failed"?"status-failed":"";i.appendChild(m("span",{className:`yyt-tool-hero-chip ${f}`,text:`\u4E0A\u6B21\u6267\u884C \xB7 ${y}`}))}return o.appendChild(i),o}function ib(t){let e=m("div",{className:"yyt-tool-runtime-row"}),s=t.runtime||{},r=(a,i,l="")=>{let c=m("div",{className:"yyt-tool-runtime-stat"});return c.appendChild(m("span",{className:"yyt-tool-runtime-stat-label",text:a})),c.appendChild(m("span",{className:`yyt-tool-runtime-stat-value ${l}`,text:i})),c},o=s.lastStatus==="success"?"\u2713 \u4E0A\u6B21\u6210\u529F":s.lastStatus==="failed"?"\u2717 \u4E0A\u6B21\u5931\u8D25":s.lastStatus==="idle"?"\u5F85\u547D":s.lastStatus||"\u5F85\u547D",n=s.lastStatus==="success"?"success":s.lastStatus==="failed"?"error":"muted";return e.appendChild(r("\u72B6\u6001",o,n)),e.appendChild(r("\u6700\u8FD1\u8FD0\u884C",rb(s.lastRunAt),"muted")),e.appendChild(r("\u6210\u529F",String(s.successCount||0),"success")),e.appendChild(r("\u5931\u8D25",String(s.errorCount||0),s.errorCount?"error":"muted")),e}function lb(t,e,s){let r=m("div",{style:{display:"flex",flexDirection:"column"}});r.appendChild(bo({label:"\u8F93\u51FA\u6A21\u5F0F",hint:"\u51B3\u5B9A\u6267\u884C\u8DEF\u5F84 + \u81EA\u52A8/\u624B\u52A8",control:Je({value:t.output?.mode||"follow_ai",options:[{value:"follow_ai",label:"follow_ai \u2014 \u968F AI \u8F93\u51FA\uFF08\u624B\u52A8\u89E6\u53D1\uFF09"},{value:"post_response_api",label:"post_response_api \u2014 \u989D\u5916 AI \u89E3\u6790\uFF08\u81EA\u52A8\uFF09"}],onChange:l=>{let c=Q(e)||{};he(e,{...c,output:{...c.output||{},mode:l,enabled:l==="post_response_api"}}),s()}})}));let o=(()=>{try{return Gt()||[]}catch{return[]}})();r.appendChild(bo({label:"API \u9884\u8BBE",hint:"\u989D\u5916 AI \u89E3\u6790\u65F6\u4F7F\u7528",control:Je({value:t.output?.apiPreset||t.apiPreset||"",options:[{value:"",label:"\u2014\u2014 \u8DDF\u968F\u5F53\u524D\u4E3B API \u2014\u2014"},...o.map(l=>({value:l.name,label:l.name}))],onChange:l=>{let c=Q(e)||{};he(e,{...c,apiPreset:l,output:{...c.output||{},apiPreset:l}}),s()}})}));let n=(()=>{try{return yo()||[]}catch{return[]}})();r.appendChild(bo({label:"Ai \u6307\u4EE4\u9884\u8BBE",hint:'\u9644\u52A0\u5728 system/user \u524D\u7684\u6307\u4EE4\uFF1B\u9009"\u65E0"\u5373\u4E0D\u542F\u7528',control:Je({value:t.bypass?.enabled&&t.bypass?.presetId||"",options:[{value:"",label:"\u2014\u2014 \u65E0 \u2014\u2014"},...n.map(l=>({value:l.id,label:`${l.name}${l.isDefault?" [\u9ED8\u8BA4]":""}`}))],onChange:l=>{let c=Q(e)||{};he(e,{...c,bypass:{enabled:!!l,presetId:l||""}}),s()}})}));let a=oe.listPresets();r.appendChild(bo({label:"\u6B63\u5219\u63D0\u53D6\u9884\u8BBE",hint:"\u51B3\u5B9A\u4ECE AI \u56DE\u590D\u4E2D\u5982\u4F55\u62BD\u53D6",control:Je({value:t.extraction?.regexPresetId||"",options:[{value:"",label:"\u2014\u2014 \u65E0\uFF08\u4FDD\u7559\u5DE5\u5177\u539F\u6709\u63D0\u53D6\u89C4\u5219\uFF09 \u2014\u2014"},...a.map(l=>({value:l.id,label:l.name}))],onChange:l=>{let c=Q(e)||{},d={...c.extraction||{},regexPresetId:l};if(l){let u=ob(l);d.selectors=u,k(`\u5DF2\u7ED1\u5B9A\u6B63\u5219\u9884\u8BBE\uFF1B\u63D0\u53D6\u89C4\u5219\u66FF\u6362\u4E3A\uFF1A${u.length?u.join(", "):"\uFF08\u9884\u8BBE\u65E0 include \u89C4\u5219\uFF09"}`,"success")}else k("\u5DF2\u89E3\u7ED1\u6B63\u5219\u9884\u8BBE\uFF0C\u5DE5\u5177\u4ECD\u4F7F\u7528\u539F\u6709\u63D0\u53D6\u89C4\u5219","success");he(e,{...c,extraction:d}),s()}})}));let i=be.listPresets();return r.appendChild(bo({label:"\u4E16\u754C\u4E66\u9884\u8BBE",hint:"\u6CE8\u5165\u5230 prompt \u7684 {{toolWorldbookContent}}",control:Je({value:t.worldbooks?.presetId||"",options:[{value:"",label:"\u2014\u2014 \u65E0\uFF08\u4FDD\u7559\u5DE5\u5177\u539F\u6709\u4E16\u754C\u4E66\u8BBE\u7F6E\uFF09 \u2014\u2014"},...i.map(l=>({value:l.id,label:l.name}))],onChange:l=>{let c=Q(e)||{},d={...c.worldbooks||{},presetId:l};if(l){let u=nb(l);d.enabled=u.enabled,d.selected=u.selected,k(`\u5DF2\u7ED1\u5B9A\u4E16\u754C\u4E66\u9884\u8BBE\uFF1B${u.enabled?`\u6CE8\u5165 ${u.selected.length} \u672C`:"\u9884\u8BBE\u5185\u65E0\u542F\u7528\u4E16\u754C\u4E66"}`,"success")}else k("\u5DF2\u89E3\u7ED1\u4E16\u754C\u4E66\u9884\u8BBE\uFF0C\u5DE5\u5177\u4ECD\u4F7F\u7528\u539F\u6709\u4E16\u754C\u4E66\u8BBE\u7F6E","success");he(e,{...c,worldbooks:d}),s()}})})),je({heading:"\u7ED1\u5B9A",icon:"\u{1F517}",content:[r]})}function bo({label:t,hint:e,control:s}){let r=m("div",{className:"yyt-tool-binding-row"}),o=m("div",{className:"yyt-tool-binding-label"});return o.appendChild(m("span",{className:"yyt-tool-binding-label-text",text:t})),e&&o.appendChild(m("span",{className:"yyt-tool-binding-label-hint",text:e})),r.appendChild(o),s.el.classList.add("small"),s.el.style.padding="7px 10px",s.el.style.fontSize="12px",r.appendChild(s.el),r.appendChild(m("div",{className:"yyt-tool-binding-meta"})),r}function cb(t,e,s,r,o,n){let a=m("div",{style:{display:"flex",flexDirection:"column"}});a.appendChild(m("div",{style:{marginBottom:"8px",display:"flex",alignItems:"center",gap:"10px"}},m("div",{style:{flex:"1"}},m("div",{text:"\u63D0\u793A\u8BCD\u6A21\u677F",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}}),m("div",{text:"\u7528 {{macro}} \u5F15\u7528\u4E0A\u4E0B\u6587\u3002\u6A21\u677F\u5185\u5BB9\u4F1A\u4F5C\u4E3A\u53D1\u7ED9\u989D\u5916 AI \u7684 user \u6D88\u606F\u3002",style:{fontSize:"11px",color:"var(--yyt-text-muted)",lineHeight:"1.6"}})),se({label:"\u{1F504} \u91CD\u7F6E\u4E3A\u9ED8\u8BA4",size:"small",variant:"ghost",onClick:()=>{if(!window.confirm("\u7528\u5DE5\u5177\u9ED8\u8BA4\u6A21\u677F\u8986\u76D6\u5F53\u524D\u6A21\u677F\uFF1F"))return;let f=yn(e)||{},x=Q(e)||{};he(e,{...x,promptTemplate:f.promptTemplate||""}),s()}}).el));let i=m("textarea",{className:"yyt-textarea yyt-code-textarea",attrs:{rows:"10",placeholder:"\u8F93\u5165\u63D0\u793A\u8BCD\u6A21\u677F..."},style:{width:"100%",resize:"vertical",fontFamily:"ui-monospace, monospace",fontSize:"12px",lineHeight:"1.7"}});i.value=t.promptTemplate||"",i.addEventListener("change",()=>{let f=Q(e)||{};he(e,{...f,promptTemplate:i.value})}),a.appendChild(i),a.appendChild(m("div",{className:"yyt-macro-inline",html:"\u53EF\u7528\u5B8F\uFF1A<code>{{toolPromptMacro}}</code> <code>{{toolContentMacro}}</code> <code>{{toolWorldbookContent}}</code> <code>{{lastAiMessage}}</code> <code>{{recentMessagesText}}</code> <code>{{rawRecentMessagesText}}</code> <code>{{userMessage}}</code> <code>{{toolName}}</code> <code>{{toolId}}</code>"})),a.appendChild(m("hr",{className:"yyt-zone-divider"})),a.appendChild(m("div",{style:{marginBottom:"8px"}},m("div",{text:"\u63D0\u53D6\u914D\u7F6E",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}}),m("div",{text:'\u4ECE AI \u56DE\u590D\u4E2D\u62BD\u53D6\u5E76\u5199\u56DE\u3002\u5B8C\u6574\u89C4\u5219\u7531"\u6B63\u5219\u63D0\u53D6\u9884\u8BBE"\u51B3\u5B9A\uFF0C\u8FD9\u91CC\u53EA\u914D\u7F6E\u5DE5\u5177\u53C2\u6570\u3002',style:{fontSize:"11px",color:"var(--yyt-text-muted)",lineHeight:"1.6"}})));let l=m("div",{style:{display:"grid",gridTemplateColumns:"1fr auto",gap:"12px",alignItems:"end",marginBottom:"12px"}}),c=m("div",{className:"yyt-form-group",style:{margin:0}});c.appendChild(m("label",{text:"\u6700\u5927\u63D0\u53D6 AI \u6D88\u606F\u6570",style:{fontSize:"12px",fontWeight:"600",color:"var(--yyt-text-secondary, rgba(255,255,255,0.55))"}}));let d=m("input",{className:"yyt-input",attrs:{type:"number",min:"1",max:"50"},style:{padding:"7px 10px",fontSize:"12px"}});d.value=String(Number(t.extraction?.maxMessages)||5),d.addEventListener("change",()=>{let f=Q(e)||{};he(e,{...f,extraction:{...f.extraction||{},maxMessages:Math.max(1,parseInt(d.value,10)||5)}})}),c.appendChild(d),l.appendChild(c);let u=m("div",{className:"yyt-form-group",style:{margin:0}});u.appendChild(m("label",{html:"&nbsp;",style:{fontSize:"12px"}})),u.appendChild(se({label:"\u{1F50D} \u6D4B\u8BD5\u63D0\u53D6",onClick:async()=>{try{let f=await Dn(e);db(r,f,o,n)}catch(f){k(`\u6D4B\u8BD5\u63D0\u53D6\u5931\u8D25\uFF1A${f?.message||f}`,"error")}}}).el),l.appendChild(u),a.appendChild(l);let p=m("div",{className:"yyt-form-group",style:{margin:0}});p.appendChild(m("label",{html:'\u5199\u56DE\u6807\u7B7E <span style="font-size:10px;color:var(--yyt-text-muted);font-weight:500;">\uFF08\u591A\u6807\u7B7E\u63D0\u53D6\u65F6\u6307\u5B9A\u552F\u4E00\u5199\u56DE\u6807\u7B7E\uFF1B\u7559\u7A7A\u5219\u63D0\u53D6\u9996\u4E2A\uFF09</span>',style:{fontSize:"12px",fontWeight:"600",color:"var(--yyt-text-secondary, rgba(255,255,255,0.55))"}}));let y=m("input",{className:"yyt-input",attrs:{type:"text",placeholder:"\u5982 status / content\uFF08\u6765\u81EA\u6B63\u5219\u9884\u8BBE\u7684 include \u6807\u7B7E\uFF09"},style:{padding:"7px 10px",fontSize:"12px"}});return y.value=t.extraction?.writebackTag||"",y.addEventListener("change",()=>{let f=Q(e)||{};he(e,{...f,extraction:{...f.extraction||{},writebackTag:y.value.trim()}})}),p.appendChild(y),a.appendChild(p),je({heading:"\u914D\u7F6E",icon:"\u2699",content:[a]})}function db(t,e,s,r){if(!U()||!X(t))return;let n=`${O}-${s||"extraction-preview"}`,a=Array.isArray(e?.messageEntries)?e.messageEntries:[],i=a.length>0?`
      <div class="yyt-form-group">
        <label>\u9010\u6761\u6D88\u606F\u9884\u89C8</label>
        <div class="yyt-preview-message-list">
          ${a.map((l,c)=>{let d=c===a.length-1?"\u6700\u65B0\u6D88\u606F":`\u6700\u8FD1\u7684\u7B2C ${a.length-c} \u6761\u6D88\u606F`;return`
              <div class="yyt-preview-message-item">
                <div class="yyt-preview-message-title">${ws(d)}</div>
                <div><label>\u539F\u6587</label><pre class="yyt-preview-box yyt-preview-pre">${ws(l.rawText||"\u65E0\u53EF\u7528\u6D88\u606F")}</pre></div>
                <div><label>\u6B63\u6587\u63D0\u53D6</label><pre class="yyt-preview-box yyt-preview-pre">${ws(l.filteredText||"\u6B63\u6587\u89C4\u5219\u672A\u547D\u4E2D")}</pre></div>
                <div><label>\u5DE5\u5177\u6807\u7B7E\u63D0\u53D6</label><pre class="yyt-preview-box yyt-preview-pre">${ws(l.extractedText||"\u672A\u63D0\u53D6\u5230\u5185\u5BB9")}</pre></div>
              </div>
            `}).join("")}
        </div>
      </div>
    `:"";t.append(Gr({id:n,title:r,width:"720px",wide:!0,body:`
      <div class="yyt-form-group">
        <label>\u63D0\u53D6\u89C4\u5219</label>
        <div class="yyt-preview-box">${ws((e?.selectors||[]).join(`
`)||"\u65E0")}</div>
      </div>
      <div class="yyt-form-group">
        <label>\u539F\u59CB\u5185\u5BB9\u6C47\u603B</label>
        <pre class="yyt-preview-box yyt-preview-pre">${ws(e?.sourceText||"\u65E0\u53EF\u7528\u6D88\u606F")}</pre>
      </div>
      <div class="yyt-form-group">
        <label>\u6B63\u6587\u63D0\u53D6\u6C47\u603B</label>
        <pre class="yyt-preview-box yyt-preview-pre">${ws(e?.filteredSourceText||"\u6B63\u6587\u89C4\u5219\u672A\u547D\u4E2D")}</pre>
      </div>
      <div class="yyt-form-group">
        <label>\u5DE5\u5177\u6807\u7B7E\u63D0\u53D6\u6C47\u603B</label>
        <pre class="yyt-preview-box yyt-preview-pre">${ws(e?.extractedText||"\u672A\u63D0\u53D6\u5230\u5185\u5BB9")}</pre>
      </div>
      ${i}
    `})),Vr(t,n,{onSave:l=>l()}),t.find(`#${n}-save`).text("\u5173\u95ED"),t.find(`#${n}-cancel`).remove()}function ws(t){return t==null?"":String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var A0,Nn,ub,tr=R(()=>{Xr();Ne();Ne();ts();Hr();_r();mi();J();mn();Na();A0=I.createScope("ToolConfigPanel"),Nn=`
  .yyt-tool-panel { display: flex; flex-direction: column; height: 100%; gap: 0; }
  .yyt-tool-panel-hero {
    padding: 16px 20px;
    border-bottom: 1px solid var(--yyt-border);
    display: flex; flex-direction: column; gap: 8px;
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
`;ub=Ss});var Xd={};te(Xd,{SummaryToolPanel:()=>Jd,default:()=>yb});var Jd,yb,Qd=R(()=>{tr();Jd=Ss({id:"summaryToolPanel",toolId:"summaryTool",postResponseHint:"\u70B9\u51FB\u201C\u7ACB\u5373\u6267\u884C\u4E00\u6B21\u201D\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u8FDB\u884C\u6458\u8981\u89E3\u6790\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 boo_FM
\u6216 regex:<boo_FM>([\\s\\S]*?)</boo_FM>`,previewDialogId:"summary-extraction-preview",defaultInjectionOrder:1e4,lorebookLogTag:"SummaryToolPanel"}),yb=Jd});var eu={};te(eu,{StatusBlockPanel:()=>Zd,default:()=>pb});var Zd,pb,tu=R(()=>{tr();Zd=Ss({id:"statusBlockPanel",toolId:"statusBlock",postResponseHint:"\u70B9\u51FB\u201C\u7ACB\u5373\u6267\u884C\u4E00\u6B21\u201D\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u751F\u6210\u4E3B\u89D2\u72B6\u6001\u680F\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 status_block
\u6216 regex:<status_block>([\\s\\S]*?)</status_block>`,previewDialogId:"status-extraction-preview",defaultInjectionOrder:10001,lorebookLogTag:"StatusBlockPanel"}),pb=Zd});var ru={};te(ru,{YouyouReviewPanel:()=>su,default:()=>fb});var su,fb,ou=R(()=>{tr();su=Ss({id:"youyouReviewPanel",toolId:"youyouReview",postResponseHint:"\u70B9\u51FB\u201C\u7ACB\u5373\u6267\u884C\u4E00\u6B21\u201D\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u5728\u672B\u5C3E\u751F\u6210\u5C0F\u5E7D\u70B9\u8BC4\u4E0E\u5267\u60C5\u94A9\u5B50\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 youyou
\u6216 regex:<youyou>([\\s\\S]*?)</youyou>`,previewDialogId:"youyou-review-extraction-preview",previewTitle:"\u5C0F\u5E7D\u70B9\u8BC4\u63D0\u53D6\u9884\u89C8"}),fb=su});function nu(t){return t?t.length!==void 0&&typeof t.get=="function"?t.get(0):t:null}function gb(t){if(!Number.isFinite(t)||t<=0)return"\u4ECE\u672A";let e=Date.now()-t;if(e<6e4)return`${Math.floor(e/1e3)} \u79D2\u524D`;if(e<36e5)return`${Math.floor(e/6e4)} \u5206\u949F\u524D`;if(e<864e5)return`${Math.floor(e/36e5)} \u5C0F\u65F6\u524D`;try{return new Date(t).toLocaleString()}catch{return"\u672A\u77E5"}}function mb(t){let e=oe.getPreset(t);if(!e)return[];let s=[];for(let r of e.rules||[])r.enabled!==!1&&(r.type==="include"&&r.value?s.push(String(r.value)):r.type==="regex_include"&&r.value&&s.push(`regex:${r.value}`));return s}function Ts(t){return t==null?"":String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function On(t={}){let{id:e,toolId:s,previewDialogId:r,previewTitle:o="\u6D4B\u8BD5\u63D0\u53D6\u7ED3\u679C",processorDirections:n=[],processorOptions:a=[],heroHint:i=""}=t;return{id:e,toolId:s,renderTo(l){let c=nu(l);if(!c)return;if(c._yytLocalToolPanelCleanup)try{c._yytLocalToolPanelCleanup()}catch{}let d=()=>this.renderTo(l),u=Q(s);if(!u){c.innerHTML='<div class="yyt-empty-state-small">\u5DE5\u5177\u914D\u7F6E\u52A0\u8F7D\u5931\u8D25</div>';return}let p=m("div",{className:"yyt-tool-panel",dataset:{toolId:s}}),y=[];p.appendChild(bb(u,s,d,n,i)),p.appendChild(hb(u));let f=xb(u,s,d);y.push(f),p.appendChild(f.el);let x=vb(u,s,d,l,n,a,r,o);y.push(x),p.appendChild(x.el),c.innerHTML="",c.appendChild(p),c._yytLocalToolPanelCleanup=()=>{for(let h of y)try{h.destroy()}catch{}delete c._yytLocalToolPanelCleanup}},destroy(l){let c=nu(l);if(c?._yytLocalToolPanelCleanup)try{c._yytLocalToolPanelCleanup()}catch{}},getStyles(){return""}}}function bb(t,e,s,r,o){let n=m("div",{className:"yyt-tool-panel-hero"}),a=m("div",{className:"yyt-tool-panel-hero-row1"});a.appendChild(m("div",{className:"yyt-tool-panel-hero-icon",text:"\u2699"})),a.appendChild(m("div",{className:"yyt-tool-panel-hero-name",text:t.name||e}));let i=m("div",{className:"yyt-tool-panel-hero-actions"});i.appendChild(se({label:"\u25B6 \u7ACB\u5373\u6267\u884C\u4E00\u6B21",size:"small",onClick:async()=>{try{await $n(e),k("\u5DF2\u89E6\u53D1\u624B\u52A8\u6267\u884C","success")}catch(f){k(`\u6267\u884C\u5931\u8D25\uFF1A${f?.message||f}`,"error")}}}).el),i.appendChild(se({label:"\u{1F4BE} \u4FDD\u5B58\u914D\u7F6E",size:"small",variant:"primary",onClick:()=>{k("\u914D\u7F6E\u5DF2\u4FDD\u5B58","success"),s()}}).el),a.appendChild(i),n.appendChild(a),t.description&&n.appendChild(m("div",{className:"yyt-tool-panel-hero-desc",text:t.description})),o&&n.appendChild(m("div",{className:"yyt-tool-panel-hero-desc",text:o}));let l=m("div",{className:"yyt-tool-panel-hero-chips"});l.appendChild(m("span",{className:"yyt-tool-hero-chip mode",text:"\u672C\u5730\u811A\u672C\uFF08\u624B\u52A8\uFF09"}));let c=t.processor?.direction||r[0]?.key||"",d=r.find(f=>f.key===c)?.label||c;d&&l.appendChild(m("span",{className:"yyt-tool-hero-chip preset",text:`\u65B9\u5411: ${d}`}));let u=t.output?.overwrite!==!1;l.appendChild(m("span",{className:"yyt-tool-hero-chip preset",text:`\u5199\u56DE: ${u?"\u8986\u76D6":"\u8FFD\u52A0"}`}));let p=t.extraction?.regexPresetId||"";if(p){let f=oe.getPreset(p);f&&l.appendChild(m("span",{className:"yyt-tool-hero-chip preset",text:`\u6B63\u5219: ${f.name}`}))}let y=t.runtime?.lastStatus;if(y){let f=y==="success"?"status-success":y==="failed"?"status-failed":"";l.appendChild(m("span",{className:`yyt-tool-hero-chip ${f}`,text:`\u4E0A\u6B21\u6267\u884C \xB7 ${y}`}))}return n.appendChild(l),n}function hb(t){let e=m("div",{className:"yyt-tool-runtime-row"}),s=t.runtime||{},r=(a,i,l="")=>{let c=m("div",{className:"yyt-tool-runtime-stat"});return c.appendChild(m("span",{className:"yyt-tool-runtime-stat-label",text:a})),c.appendChild(m("span",{className:`yyt-tool-runtime-stat-value ${l}`,text:i})),c},o=s.lastStatus==="success"?"\u2713 \u4E0A\u6B21\u6210\u529F":s.lastStatus==="failed"?"\u2717 \u4E0A\u6B21\u5931\u8D25":"\u5F85\u547D",n=s.lastStatus==="success"?"success":s.lastStatus==="failed"?"error":"muted";return e.appendChild(r("\u72B6\u6001",o,n)),e.appendChild(r("\u6700\u8FD1\u8FD0\u884C",gb(s.lastRunAt),"muted")),e.appendChild(r("\u6210\u529F",String(s.successCount||0),"success")),e.appendChild(r("\u5931\u8D25",String(s.errorCount||0),s.errorCount?"error":"muted")),e}function xb(t,e,s){let r=m("div",{style:{display:"flex",flexDirection:"column"}}),o=oe.listPresets();return r.appendChild(au({label:"\u6B63\u5219\u63D0\u53D6\u9884\u8BBE",hint:"\u51B3\u5B9A\u4ECE AI \u56DE\u590D\u4E2D\u5982\u4F55\u62BD\u53D6\u8981\u672C\u5730\u5904\u7406\u7684\u6587\u672C",control:Je({value:t.extraction?.regexPresetId||"",options:[{value:"",label:"\u2014\u2014 \u65E0\uFF08\u4FDD\u7559\u5DE5\u5177\u539F\u6709\u63D0\u53D6\u89C4\u5219\uFF09 \u2014\u2014"},...o.map(n=>({value:n.id,label:n.name}))],onChange:n=>{let a=Q(e)||{},i={...a.extraction||{},regexPresetId:n};if(n){let l=mb(n);i.selectors=l,k(`\u5DF2\u7ED1\u5B9A\u6B63\u5219\u9884\u8BBE\uFF1B\u63D0\u53D6\u89C4\u5219\u66FF\u6362\u4E3A\uFF1A${l.length?l.join(", "):"\uFF08\u9884\u8BBE\u65E0 include \u89C4\u5219\uFF09"}`,"success")}else k("\u5DF2\u89E3\u7ED1\u6B63\u5219\u9884\u8BBE\uFF0C\u5DE5\u5177\u4ECD\u4F7F\u7528\u539F\u6709\u63D0\u53D6\u89C4\u5219","success");he(e,{...a,extraction:i}),s()}})})),r.appendChild(au({label:"\u5199\u56DE\u65B9\u5F0F",hint:"\u5904\u7406\u540E\u7684\u7ED3\u679C\u5982\u4F55\u56DE\u5199\u5230 AI \u6D88\u606F",control:Je({value:t.output?.overwrite!==!1?"replace":"append",options:[{value:"replace",label:"\u8986\u76D6\u539F\u5DE5\u5177\u5757"},{value:"append",label:"\u8FFD\u52A0\u5230\u672B\u5C3E"}],onChange:n=>{let a=Q(e)||{};he(e,{...a,output:{...a.output||{},overwrite:n==="replace",enabled:!0,mode:"local_transform"}}),s()}})})),je({heading:"\u7ED1\u5B9A",icon:"\u{1F517}",content:[r]})}function au({label:t,hint:e,control:s}){let r=m("div",{className:"yyt-tool-binding-row"}),o=m("div",{className:"yyt-tool-binding-label"});return o.appendChild(m("span",{className:"yyt-tool-binding-label-text",text:t})),e&&o.appendChild(m("span",{className:"yyt-tool-binding-label-hint",text:e})),r.appendChild(o),s.el.style.padding="7px 10px",s.el.style.fontSize="12px",r.appendChild(s.el),r.appendChild(m("div",{className:"yyt-tool-binding-meta"})),r}function vb(t,e,s,r,o,n,a,i){let l=m("div",{style:{display:"flex",flexDirection:"column"}});l.appendChild(m("div",{style:{marginBottom:"10px"}},m("div",{text:"\u6267\u884C\u65B9\u5411",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}}),m("div",{text:"\u51B3\u5B9A\u672C\u5730\u811A\u672C\u8FD0\u884C\u54EA\u4E2A\u53D8\u6362\u8DEF\u5F84\u3002",style:{fontSize:"11px",color:"var(--yyt-text-muted)",lineHeight:"1.6"}})));let c=t.processor?.direction||o[0]?.key||"",d=Je({value:c,options:o.map(x=>({value:x.key,label:x.description?`${x.label} \u2014 ${x.description}`:x.label})),onChange:x=>{let h=Q(e)||{};he(e,{...h,processor:{...h.processor||{},direction:x}}),s()}});if(d.el.style.padding="7px 10px",d.el.style.fontSize="12px",l.appendChild(d.el),l.appendChild(m("hr",{className:"yyt-zone-divider"})),n.length>0){l.appendChild(m("div",{style:{marginBottom:"10px"}},m("div",{text:"\u5904\u7406\u9879",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}}),m("div",{text:"\u52FE\u9009\u8981\u5305\u542B\u5728\u672C\u6B21\u53D8\u6362\u4E2D\u7684\u9879\u76EE\u3002",style:{fontSize:"11px",color:"var(--yyt-text-muted)",lineHeight:"1.6"}})));let x=m("div",{style:{display:"flex",flexDirection:"column"}}),h=t.processor?.options||{};for(let C of n){let T=Xt({label:C.label,hint:C.description||"",checked:h[C.key]===!0,onChange:_=>{let Y=Q(e)||{};he(e,{...Y,processor:{...Y.processor||{},options:{...Y.processor?.options||{},[C.key]:_}}})}});x.appendChild(T.el)}l.appendChild(x),l.appendChild(m("hr",{className:"yyt-zone-divider"}))}l.appendChild(m("div",{style:{marginBottom:"10px"}},m("div",{text:"\u63D0\u53D6\u914D\u7F6E",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}}),m("div",{text:'\u4ECE AI \u56DE\u590D\u4E2D\u62BD\u53D6\u8981\u672C\u5730\u5904\u7406\u7684\u6587\u672C\u3002\u5B8C\u6574\u89C4\u5219\u7531"\u6B63\u5219\u63D0\u53D6\u9884\u8BBE"\u51B3\u5B9A\uFF0C\u8FD9\u91CC\u53EA\u914D\u7F6E\u5DE5\u5177\u53C2\u6570\u3002',style:{fontSize:"11px",color:"var(--yyt-text-muted)",lineHeight:"1.6"}})));let u=m("div",{style:{display:"grid",gridTemplateColumns:"1fr auto",gap:"12px",alignItems:"end"}}),p=m("div",{className:"yyt-form-group",style:{margin:0}});p.appendChild(m("label",{text:"\u6700\u5927\u63D0\u53D6 AI \u6D88\u606F\u6570",style:{fontSize:"12px",fontWeight:"600",color:"var(--yyt-text-secondary, rgba(255,255,255,0.55))"}}));let y=m("input",{className:"yyt-input",attrs:{type:"number",min:"1",max:"50"},style:{padding:"7px 10px",fontSize:"12px"}});y.value=String(Number(t.extraction?.maxMessages)||5),y.addEventListener("change",()=>{let x=Q(e)||{};he(e,{...x,extraction:{...x.extraction||{},maxMessages:Math.max(1,parseInt(y.value,10)||5)}})}),p.appendChild(y),u.appendChild(p);let f=m("div",{className:"yyt-form-group",style:{margin:0}});return f.appendChild(m("label",{html:"&nbsp;",style:{fontSize:"12px"}})),f.appendChild(se({label:"\u{1F50D} \u6D4B\u8BD5\u63D0\u53D6",onClick:async()=>{try{let x=await Dn(e);wb(r,x,a,i)}catch(x){k(`\u6D4B\u8BD5\u63D0\u53D6\u5931\u8D25\uFF1A${x?.message||x}`,"error")}}}).el),u.appendChild(f),l.appendChild(u),je({heading:"\u914D\u7F6E",icon:"\u2699",content:[l]})}function wb(t,e,s,r){if(!U()||!X(t))return;let n=`${O}-${s||"extraction-preview"}`,a=Array.isArray(e?.messageEntries)?e.messageEntries:[],i=a.length>0?`
      <div class="yyt-form-group">
        <label>\u9010\u6761\u6D88\u606F\u9884\u89C8</label>
        <div class="yyt-preview-message-list">
          ${a.map((l,c)=>{let d=c===a.length-1?"\u6700\u65B0\u6D88\u606F":`\u6700\u8FD1\u7684\u7B2C ${a.length-c} \u6761\u6D88\u606F`;return`
              <div class="yyt-preview-message-item">
                <div class="yyt-preview-message-title">${Ts(d)}</div>
                <div><label>\u539F\u6587</label><pre class="yyt-preview-box yyt-preview-pre">${Ts(l.rawText||"\u65E0\u53EF\u7528\u6D88\u606F")}</pre></div>
                <div><label>\u6B63\u6587\u63D0\u53D6</label><pre class="yyt-preview-box yyt-preview-pre">${Ts(l.filteredText||"\u6B63\u6587\u89C4\u5219\u672A\u547D\u4E2D")}</pre></div>
                <div><label>\u5DE5\u5177\u6807\u7B7E\u63D0\u53D6</label><pre class="yyt-preview-box yyt-preview-pre">${Ts(l.extractedText||"\u672A\u63D0\u53D6\u5230\u5185\u5BB9")}</pre></div>
              </div>
            `}).join("")}
        </div>
      </div>
    `:"";t.append(Gr({id:n,title:r,width:"720px",wide:!0,body:`
      <div class="yyt-form-group">
        <label>\u63D0\u53D6\u89C4\u5219</label>
        <div class="yyt-preview-box">${Ts((e?.selectors||[]).join(`
`)||"\u65E0")}</div>
      </div>
      <div class="yyt-form-group">
        <label>\u539F\u59CB\u5185\u5BB9\u6C47\u603B</label>
        <pre class="yyt-preview-box yyt-preview-pre">${Ts(e?.sourceText||"\u65E0\u53EF\u7528\u6D88\u606F")}</pre>
      </div>
      <div class="yyt-form-group">
        <label>\u6B63\u6587\u63D0\u53D6\u6C47\u603B</label>
        <pre class="yyt-preview-box yyt-preview-pre">${Ts(e?.filteredSourceText||"\u6B63\u6587\u89C4\u5219\u672A\u547D\u4E2D")}</pre>
      </div>
      <div class="yyt-form-group">
        <label>\u5DE5\u5177\u6807\u7B7E\u63D0\u53D6\u6C47\u603B</label>
        <pre class="yyt-preview-box yyt-preview-pre">${Ts(e?.extractedText||"\u672A\u63D0\u53D6\u5230\u5185\u5BB9")}</pre>
      </div>
      ${i}
    `})),Vr(t,n,{onSave:l=>l()}),t.find(`#${n}-save`).text("\u5173\u95ED"),t.find(`#${n}-cancel`).remove()}var B0,bi=R(()=>{Xr();Ne();ts();mi();J();tr();mn();B0=I.createScope("LocalTransformToolPanel")});var lu={};te(lu,{EscapeTransformToolPanel:()=>iu,default:()=>Sb});var iu,Sb,cu=R(()=>{bi();iu=On({id:"escapeTransformToolPanel",toolId:"escapeTransformTool",previewDialogId:"escape-transform-extraction-preview",previewTitle:"\u8F6C\u4E49\u5904\u7406\u63D0\u53D6\u9884\u89C8",heroHint:"\u4ECE\u6700\u8FD1 AI \u6D88\u606F\u63D0\u53D6\u6587\u672C\u540E\uFF0C\u5728\u672C\u5730\u6267\u884C\u8F6C\u4E49\u6216\u53BB\u8F6C\u4E49\uFF0C\u518D\u6309\u6240\u9009\u65B9\u5F0F\u5199\u56DE\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\u6216\u6B63\u5219\uFF0C\u4F8B\u5982\uFF1A
content
regex:<content>([\\s\\S]*?)</content>`,processorDirections:[{key:"escape",label:"\u8F6C\u4E49",description:"\u628A\u539F\u59CB\u5B57\u7B26\u8F6C\u6362\u6210\u8F6C\u4E49\u5E8F\u5217\u3002"},{key:"unescape",label:"\u53BB\u8F6C\u4E49",description:"\u628A\u8F6C\u4E49\u5E8F\u5217\u8FD8\u539F\u6210\u539F\u59CB\u5B57\u7B26\u3002"}],processorOptions:[{key:"doubleQuote",label:"\u53CC\u5F15\u53F7",description:'\u5904\u7406 " \u4E0E \\"\u3002'},{key:"singleQuote",label:"\u5355\u5F15\u53F7",description:"\u5904\u7406 ' \u4E0E \\'\u3002"},{key:"newline",label:"\u6362\u884C\u7B26",description:"\u5904\u7406\u6362\u884C\u4E0E \\n\u3002"}]}),Sb=iu});var uu={};te(uu,{PunctuationTransformToolPanel:()=>du,default:()=>Tb});var du,Tb,yu=R(()=>{bi();du=On({id:"punctuationTransformToolPanel",toolId:"punctuationTransformTool",previewDialogId:"punctuation-transform-extraction-preview",previewTitle:"\u4E2D\u6587\u6807\u70B9\u66FF\u6362\u63D0\u53D6\u9884\u89C8",heroHint:"\u4ECE\u6700\u8FD1 AI \u6D88\u606F\u63D0\u53D6\u6587\u672C\u540E\uFF0C\u5728\u672C\u5730\u628A\u82F1\u6587\u6807\u70B9\u66FF\u6362\u6210\u4E2D\u6587\u6807\u70B9\uFF0C\u518D\u6309\u6240\u9009\u65B9\u5F0F\u5199\u56DE\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\u6216\u6B63\u5219\uFF0C\u4F8B\u5982\uFF1A
content
regex:<content>([\\s\\S]*?)</content>`,processorDirections:[{key:"en_to_zh",label:"\u82F1\u6587\u8F6C\u4E2D\u6587",description:"\u6309\u52FE\u9009\u9879\u628A\u82F1\u6587\u6807\u70B9\u66FF\u6362\u4E3A\u4E2D\u6587\u6807\u70B9\u3002"}],processorOptions:[{key:"comma",label:"\u9017\u53F7 ,",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u9017\u53F7\u3002"},{key:"period",label:"\u53E5\u53F7 .",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u53E5\u53F7\u3002"},{key:"exclamation",label:"\u611F\u53F9\u53F7 !",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u611F\u53F9\u53F7\u3002"},{key:"question",label:"\u95EE\u53F7 ?",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u95EE\u53F7\u3002"},{key:"semicolon",label:"\u5206\u53F7 ;",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u5206\u53F7\u3002"},{key:"colon",label:"\u5192\u53F7 :",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u5192\u53F7\u3002"},{key:"leftParen",label:"\u5DE6\u62EC\u53F7 (",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u5DE6\u62EC\u53F7\u3002"},{key:"rightParen",label:"\u53F3\u62EC\u53F7 )",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u53F3\u62EC\u53F7\u3002"}]}),Tb=du});var fu={};te(fu,{BypassPanel:()=>pu,default:()=>_b});var pu,_b,gu=R(()=>{Me();_r();Ne();pu={id:"bypassPanel",_getActivePresetId(t){return t.find(".yyt-bypass-editor-content").data("presetId")||null},render(t){let e=ee.getPresetList(),s=ee.getDefaultPresetId();return`
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
            ${e.map(r=>this._renderPresetItem(r,r.id===s)).join("")}
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
    `},_renderPresetItem(t,e){let s=os&&os[t.id];return`
      <div class="yyt-bypass-preset-item ${e?"yyt-default":""}" data-preset-id="${t.id}">
        <div class="yyt-bypass-preset-info">
          <span class="yyt-bypass-preset-name">${v(t.name)}</span>
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
      `;let e=ee.getDefaultPresetId()===t.id,s=os&&os[t.id];return`
      <div class="yyt-bypass-editor-content" data-preset-id="${t.id}">
        <div class="yyt-bypass-editor-header">
          <div class="yyt-bypass-editor-title">
            <input type="text" class="yyt-input yyt-bypass-name-input" 
                   value="${v(t.name)}" placeholder="\u9884\u8BBE\u540D\u79F0">
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
          <input type="text" class="yyt-input yyt-bypass-description-input"
                 value="${v(t.description||"")}" placeholder="\u9884\u8BBE\u63CF\u8FF0\uFF08\u53EF\u9009\uFF09">
        </div>

        <div class="yyt-bypass-messages-header">
          <span>\u6D88\u606F\u5217\u8868</span>
          <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="yyt-bypass-add-message">
            <i class="fa-solid fa-plus"></i> \u6DFB\u52A0\u6D88\u606F
          </button>
        </div>

        <div class="yyt-bypass-messages">
          ${(t.messages||[]).map((r,o)=>this._renderMessageItem(r,o)).join("")}
        </div>

        <div class="yyt-bypass-editor-footer">
          <button class="yyt-btn yyt-btn-primary" id="yyt-bypass-save">
            <i class="fa-solid fa-save"></i> \u4FDD\u5B58
          </button>
        </div>
      </div>
    `},_renderMessageItem(t,e=0){let s={SYSTEM:"fa-server",USER:"fa-user",assistant:"fa-robot"};return`
      <div class="yyt-bypass-message ${t.enabled===!1?"yyt-disabled":""}"
           data-message-id="${t.id}" data-message-index="${e}"
           data-deletable="${t.deletable!==!1}">
        <div class="yyt-bypass-message-header">
          <div class="yyt-bypass-message-role">
            <i class="fa-solid ${s[t.role]||"fa-comment"}"></i>
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
                  placeholder="\u8F93\u5165\u6D88\u606F\u5185\u5BB9...">${v(t.content||"")}</textarea>
      </div>
    `},bindEvents(t,e){let s=U();!s||!X(t)||(t.off(".yytBypass"),this._bindPresetListEvents(t,s),this._bindEditorEvents(t,s),this._bindFileEvents(t,s),bt(t,{namespace:"yytBypassSelect",selectors:[".yyt-bypass-role-select"]}))},_bindPresetListEvents(t,e){t.on("click.yytBypass",".yyt-bypass-preset-item",s=>{if(e(s.target).closest(".yyt-bypass-quick-delete").length)return;let r=e(s.currentTarget).data("presetId");this._selectPreset(t,e,r)}),t.on("click.yytBypass",".yyt-bypass-quick-delete",async s=>{s.stopPropagation();let r=e(s.currentTarget).data("presetId");if(!r||!await De("\u5220\u9664\u9884\u8BBE","\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u4E2A\u9884\u8BBE\u5417\uFF1F",{danger:!0}))return;let n=ee.deletePreset(r);n.success?(t.find(".yyt-bypass-editor-content").data("presetId")===r&&t.find(".yyt-bypass-editor").html(`
            <div class="yyt-bypass-empty">
              <i class="fa-solid fa-shield-halved"></i>
              <p>\u9009\u62E9\u6216\u521B\u5EFA Ai \u6307\u4EE4\u9884\u8BBE</p>
            </div>
          `),this._refreshPresetList(t,e),k("success","\u9884\u8BBE\u5DF2\u5220\u9664")):k("error",n?.message||"\u5220\u9664\u9884\u8BBE\u5931\u8D25")}),t.on("click.yytBypass","#yyt-bypass-add",()=>{this._createNewPreset(t,e)})},_bindEditorEvents(t,e){t.on("click.yytBypass","#yyt-bypass-save",()=>{this._saveCurrentPreset(t,e)}),t.on("click.yytBypass","#yyt-bypass-delete",()=>{this._deleteCurrentPreset(t,e)}),t.on("click.yytBypass","#yyt-bypass-duplicate",()=>{this._duplicateCurrentPreset(t,e)}),t.on("click.yytBypass","#yyt-bypass-set-default",()=>{this._setAsDefault(t,e)}),t.on("click.yytBypass","#yyt-bypass-add-message",()=>{this._addMessage(t,e)}),t.on("click.yytBypass",".yyt-bypass-move-up",s=>{let r=e(s.currentTarget).closest(".yyt-bypass-message"),o=r.prev(".yyt-bypass-message");o.length&&(o.before(r),this._refreshMessageIndices(t,e))}),t.on("click.yytBypass",".yyt-bypass-move-down",s=>{let r=e(s.currentTarget).closest(".yyt-bypass-message"),o=r.next(".yyt-bypass-message");o.length&&(o.after(r),this._refreshMessageIndices(t,e))}),t.on("click.yytBypass",".yyt-bypass-insert-message",s=>{let r=e(s.currentTarget).closest(".yyt-bypass-message");this._insertMessageAfter(t,e,r)}),t.on("click.yytBypass",".yyt-bypass-delete-message",s=>{e(s.currentTarget).closest(".yyt-bypass-message").remove(),this._refreshMessageIndices(t,e)}),t.on("change.yytBypass",".yyt-bypass-message-enabled",s=>{e(s.currentTarget).closest(".yyt-bypass-message").toggleClass("yyt-disabled",!e(s.currentTarget).is(":checked"))})},_bindFileEvents(t,e){t.on("click.yytBypass","#yyt-bypass-import",()=>{t.find("#yyt-bypass-import-file").click()}),t.on("change.yytBypass","#yyt-bypass-import-file",async s=>{let r=s.target.files[0];if(r){try{let o=await Vt(r),n=ee.importPresets(o);k(n.success?"success":"error",n.message),n.success&&this.renderTo(t)}catch(o){k("error",`\u5BFC\u5165\u5931\u8D25: ${o.message}`)}e(s.target).val("")}}),t.on("click.yytBypass","#yyt-bypass-export",()=>{try{let s=ee.exportPresets();zt(s,`bypass_presets_${Date.now()}.json`),k("success","\u9884\u8BBE\u5DF2\u5BFC\u51FA")}catch(s){k("error",`\u5BFC\u51FA\u5931\u8D25: ${s.message}`)}})},_selectPreset(t,e,s){let r=ee.getPreset(s);r&&(t.find(".yyt-bypass-preset-item").removeClass("yyt-active"),t.find(`.yyt-bypass-preset-item[data-preset-id="${s}"]`).addClass("yyt-active"),t.find(".yyt-bypass-editor").html(this._renderEditor(r)),bt(t,{namespace:"yytBypassSelect",selectors:[".yyt-bypass-role-select"]}))},_createNewPreset(t,e){let s=`bypass_${Date.now()}`,r=ee.createPreset({id:s,name:"\u65B0 Ai \u6307\u4EE4\u9884\u8BBE",description:"",messages:[]});r.success?(this.renderTo(t),this._selectPreset(t,e,s),k("success","\u9884\u8BBE\u5DF2\u521B\u5EFA")):k("error",r?.message||"\u521B\u5EFA\u9884\u8BBE\u5931\u8D25")},_saveCurrentPreset(t,e){let s=t.find(".yyt-bypass-editor-content"),r=s.data("presetId");if(!r)return;let o=s.find(".yyt-bypass-name-input").val().trim(),n=s.find(".yyt-bypass-description-input").val().trim();if(!o){k("warning","\u8BF7\u8F93\u5165\u9884\u8BBE\u540D\u79F0"),s.find(".yyt-bypass-name-input").trigger("focus").trigger("select");return}let a=[];s.find(".yyt-bypass-message").each(function(){let l=e(this);a.push({id:l.data("messageId"),role:l.find(".yyt-bypass-role-select").val(),content:l.find(".yyt-bypass-message-content").val(),enabled:l.find(".yyt-bypass-message-enabled").is(":checked"),deletable:String(l.data("deletable"))!=="false"})});let i=ee.updatePreset(r,{name:o,description:n,messages:a});i.success?(k("success","\u9884\u8BBE\u5DF2\u4FDD\u5B58"),this._refreshPresetList(t,e)):k("error",i?.message||"\u4FDD\u5B58\u9884\u8BBE\u5931\u8D25")},async _deleteCurrentPreset(t,e){let r=t.find(".yyt-bypass-editor-content").data("presetId");if(!r||!await De("\u5220\u9664\u9884\u8BBE","\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u4E2A\u9884\u8BBE\u5417\uFF1F",{danger:!0}))return;let n=ee.deletePreset(r);n.success?(this.renderTo(t),k("success","\u9884\u8BBE\u5DF2\u5220\u9664")):k("error",n?.message||"\u5220\u9664\u9884\u8BBE\u5931\u8D25")},_duplicateCurrentPreset(t,e){let r=t.find(".yyt-bypass-editor-content").data("presetId");if(!r)return;let o=`bypass_${Date.now()}`,n=ee.duplicatePreset(r,o);n.success?(this.renderTo(t),this._selectPreset(t,e,o),k("success","\u9884\u8BBE\u5DF2\u590D\u5236")):k("error",n?.message||"\u590D\u5236\u9884\u8BBE\u5931\u8D25")},_setAsDefault(t,e){let r=t.find(".yyt-bypass-editor-content").data("presetId");if(!r)return;ee.setDefaultPresetId(r),this._refreshPresetList(t,e);let o=ee.getPreset(r);o&&t.find(".yyt-bypass-editor").html(this._renderEditor(o)),k("success","\u5DF2\u8BBE\u4E3A\u9ED8\u8BA4\u9884\u8BBE")},_addMessage(t,e){let s=t.find(".yyt-bypass-messages"),r={id:`msg_${Date.now()}`,role:"SYSTEM",content:"",enabled:!0,deletable:!0},o=s.find(".yyt-bypass-message").length;s.append(this._renderMessageItem(r,o))},_insertMessageAfter(t,e,s){let r=t.find(".yyt-bypass-messages"),o={id:`msg_${Date.now()}`,role:"SYSTEM",content:"",enabled:!0,deletable:!0},n=this._renderMessageItem(o,0),a=e(n);s.after(a),this._refreshMessageIndices(t,e)},_refreshMessageIndices(t,e){t.find(".yyt-bypass-message").each(function(s){e(this).attr("data-message-index",s)})},_refreshPresetList(t,e){let s=ee.getPresetList(),r=ee.getDefaultPresetId(),o=this._getActivePresetId(t);t.find(".yyt-bypass-preset-list").html(s.map(n=>this._renderPresetItem(n,n.id===r)).join("")),o&&t.find(`.yyt-bypass-preset-item[data-preset-id="${o}"]`).addClass("yyt-active")},destroy(t){!U()||!X(t)||(Ve(t,"yytBypassSelect"),t.off(".yytBypass"))},getStyles(){return`
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
    `},renderTo(t){let e=this.render({});t.html(e),this.bindEvents(t,{})}},_b=pu});var xi={};te(xi,{SettingsPanel:()=>vu,applyTheme:()=>xu,applyUiPreferences:()=>hi,default:()=>Eb});function ho({id:t,checked:e=!1,title:s="",hint:r=""}){return`
    <div class="yyt-toggle-row">
      <div class="yyt-toggle-label">
        <span>${s}</span>
        ${r?`<span class="yyt-toggle-hint">${r}</span>`:""}
      </div>
      <label class="yyt-toggle">
        <input type="checkbox" id="${t}" ${e?"checked":""}>
        <span class="yyt-toggle-slider"></span>
      </label>
    </div>
  `}function bu(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window}function xo(){return bu()?.document||document}function hu(t=xo()){return t?.documentElement||document.documentElement}function xu(t,e=xo()){let s=hu(e),r={...Ab,...mu[t]||mu["dark-blue"]};Object.entries(r).forEach(([o,n])=>{s.style.setProperty(o,n)}),s.setAttribute("data-yyt-theme",t)}function hi(t={},e=xo()){let s=hu(e),{theme:r="dark-blue",compactMode:o=!1,animationEnabled:n=!0}=t||{};xu(r,e),s.classList.toggle("yyt-compact-mode",!!o),s.classList.toggle("yyt-no-animation",!n)}var Ab,mu,vu,Eb,vi=R(()=>{Me();fo();J();go();Ne();Ab={"--yyt-accent":"#7bb7ff","--yyt-accent-glow":"rgba(123, 183, 255, 0.4)","--yyt-accent-soft":"rgba(123, 183, 255, 0.15)","--yyt-accent-strong":"#a5d4ff","--yyt-on-accent":"#0a0d13","--yyt-bg-base":"#0a0d13","--yyt-surface":"#0f1219","--yyt-surface-2":"#151a24","--yyt-surface-3":"#1c2231","--yyt-surface-hover":"#1c2231","--yyt-surface-active":"#232b3e","--yyt-border":"rgba(255, 255, 255, 0.06)","--yyt-border-soft":"rgba(255, 255, 255, 0.04)","--yyt-border-strong":"rgba(255, 255, 255, 0.12)","--yyt-text":"rgba(255, 255, 255, 0.92)","--yyt-text-secondary":"rgba(255, 255, 255, 0.55)","--yyt-text-muted":"rgba(255, 255, 255, 0.35)","--yyt-focus-ring":"0 0 0 2px rgba(123, 183, 255, 1), 0 0 0 4px rgba(123, 183, 255, 0.15)","--yyt-control-bg":"#0f1219","--yyt-control-bg-hover":"#151a24","--yyt-control-bg-active":"#1c2231","--yyt-control-bg-strong":"#151a24","--yyt-control-bg-focus":"#151a24","--yyt-control-border":"rgba(255, 255, 255, 0.08)","--yyt-control-border-hover":"rgba(255, 255, 255, 0.14)","--yyt-control-border-focus":"rgba(123, 183, 255, 0.5)","--yyt-control-shadow":"none","--yyt-control-shadow-hover":"none","--yyt-control-shadow-focus":"none","--yyt-control-shadow-active":"none","--yyt-select-surface":"#151a24","--yyt-select-option-bg":"#1c2231","--yyt-select-option-hover-bg":"#232b3e","--yyt-select-option-selected-bg":"#2a3450","--yyt-select-option-border":"rgba(123, 183, 255, 0.15)","--yyt-select-option-selected-border":"rgba(123, 183, 255, 0.3)","--yyt-select-dropdown-shadow":"0 8px 24px rgba(0, 0, 0, 0.4)","--yyt-select-arrow-color":"rgba(255, 255, 255, 0.4)"},mu={"dark-blue":{"--yyt-on-accent":"#0a0d13"},"dark-purple":{"--yyt-accent":"#a78bfa","--yyt-accent-glow":"rgba(167, 139, 250, 0.4)","--yyt-accent-soft":"rgba(167, 139, 250, 0.15)","--yyt-accent-strong":"#c4b5fd","--yyt-bg-base":"#0d0a14","--yyt-surface":"#12101c","--yyt-surface-2":"#1a1726","--yyt-surface-3":"#221e32","--yyt-surface-hover":"#221e32","--yyt-surface-active":"#2a2540","--yyt-on-accent":"#0d0a14","--yyt-control-bg":"#12101c","--yyt-control-bg-hover":"#1a1726","--yyt-control-bg-active":"#221e32","--yyt-control-bg-strong":"#1a1726","--yyt-control-bg-focus":"#1a1726","--yyt-control-border-focus":"rgba(167, 139, 250, 0.5)","--yyt-select-surface":"#1a1726","--yyt-select-option-bg":"#221e32","--yyt-select-option-hover-bg":"#2a2540","--yyt-select-option-selected-bg":"#332d50","--yyt-select-option-border":"rgba(167, 139, 250, 0.15)","--yyt-select-option-selected-border":"rgba(167, 139, 250, 0.3)","--yyt-focus-ring":"0 0 0 2px rgba(167, 139, 250, 1), 0 0 0 4px rgba(167, 139, 250, 0.15)"},"dark-green":{"--yyt-accent":"#4ade80","--yyt-accent-glow":"rgba(74, 222, 128, 0.4)","--yyt-accent-soft":"rgba(74, 222, 128, 0.15)","--yyt-accent-strong":"#86efac","--yyt-bg-base":"#0a120d","--yyt-surface":"#0f1912","--yyt-surface-2":"#151f1a","--yyt-surface-3":"#1c2824","--yyt-surface-hover":"#1c2824","--yyt-surface-active":"#233530","--yyt-on-accent":"#0a120d","--yyt-control-bg":"#0f1912","--yyt-control-bg-hover":"#151f1a","--yyt-control-bg-active":"#1c2824","--yyt-control-bg-strong":"#151f1a","--yyt-control-bg-focus":"#151f1a","--yyt-control-border-focus":"rgba(74, 222, 128, 0.5)","--yyt-select-surface":"#151f1a","--yyt-select-option-bg":"#1c2824","--yyt-select-option-hover-bg":"#233530","--yyt-select-option-selected-bg":"#2a4038","--yyt-select-option-border":"rgba(74, 222, 128, 0.15)","--yyt-select-option-selected-border":"rgba(74, 222, 128, 0.3)","--yyt-focus-ring":"0 0 0 2px rgba(74, 222, 128, 1), 0 0 0 4px rgba(74, 222, 128, 0.15)"},light:{"--yyt-accent":"#3b82f6","--yyt-accent-glow":"rgba(59, 130, 246, 0.3)","--yyt-accent-soft":"rgba(59, 130, 246, 0.1)","--yyt-accent-strong":"#93c5fd","--yyt-bg-base":"#f5f7fa","--yyt-surface":"#edf0f5","--yyt-surface-2":"#e4e8ef","--yyt-surface-3":"#dbe0e9","--yyt-surface-hover":"#dbe0e9","--yyt-surface-active":"#d1d7e2","--yyt-text":"rgba(15, 23, 42, 0.92)","--yyt-text-secondary":"rgba(15, 23, 42, 0.55)","--yyt-text-muted":"rgba(15, 23, 42, 0.35)","--yyt-border":"rgba(15, 23, 42, 0.08)","--yyt-border-soft":"rgba(15, 23, 42, 0.04)","--yyt-border-strong":"rgba(15, 23, 42, 0.14)","--yyt-focus-ring":"0 0 0 2px rgba(59, 130, 246, 1), 0 0 0 4px rgba(59, 130, 246, 0.12)","--yyt-on-accent":"#ffffff","--yyt-control-bg":"#edf0f5","--yyt-control-bg-hover":"#e4e8ef","--yyt-control-bg-active":"#dbe0e9","--yyt-control-bg-strong":"#e4e8ef","--yyt-control-bg-focus":"#e4e8ef","--yyt-control-border":"rgba(15, 23, 42, 0.1)","--yyt-control-border-hover":"rgba(15, 23, 42, 0.18)","--yyt-control-border-focus":"rgba(59, 130, 246, 0.5)","--yyt-control-shadow":"none","--yyt-control-shadow-hover":"none","--yyt-control-shadow-focus":"none","--yyt-control-shadow-active":"none","--yyt-select-surface":"#e4e8ef","--yyt-select-option-bg":"#edf0f5","--yyt-select-option-hover-bg":"#dbe0e9","--yyt-select-option-selected-bg":"#dbeafe","--yyt-select-option-border":"rgba(59, 130, 246, 0.12)","--yyt-select-option-selected-border":"rgba(59, 130, 246, 0.3)","--yyt-select-dropdown-shadow":"0 8px 24px rgba(15, 23, 42, 0.1)","--yyt-select-arrow-color":"rgba(15, 23, 42, 0.4)"}};vu={id:"settingsPanel",render(){let t=St.getSettings(),e=t.debug?.enableDebugLog===!0,s=this._getAutomationRuntime();return`
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
          ${this._renderExecutorTab(t.executor,t.automation,s)}
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
    `},_renderExecutorTab(t,e={},s=null){let r=Array.isArray(s?.recentTransactions)?s.recentTransactions.slice().reverse():[],o=s?.hostBinding||{},n=Array.isArray(o.eventBindings)&&o.eventBindings.length>0?o.eventBindings.join(" / "):"\u6682\u65E0\u4E8B\u4EF6\u7ED1\u5B9A",a=r.length>0?r.slice(0,5).map(i=>{let l=i?.results?.[0]?.meta?.writebackDetails?.refresh||{};return`
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
            <div class="yyt-settings-runtime-chip ${s?.enabled?"is-on":"is-off"}">\u670D\u52A1 ${s?.enabled?"\u8FD0\u884C\u4E2D":"\u672A\u542F\u7528"}</div>
            <div class="yyt-settings-runtime-chip ${o.initialized?"is-on":"is-off"}">\u76D1\u542C ${o.initialized?"\u5DF2\u7ED1\u5B9A":"\u672A\u7ED1\u5B9A"}</div>
            <div class="yyt-settings-runtime-chip is-neutral">\u5F85\u5904\u7406 ${s?.pendingTimerCount||0}</div>
            <div class="yyt-settings-runtime-chip is-neutral">\u6392\u961F\u69FD\u4F4D ${s?.queuedSlotCount||0}</div>
            <div class="yyt-settings-runtime-chip is-neutral">\u4E8B\u52A1 ${r.length}</div>
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
            ${ho({id:"yyt-setting-enableDebugLog",checked:t.enableDebugLog,title:"\u542F\u7528\u8C03\u8BD5\u65E5\u5FD7",hint:"\u5F00\u542F\u540E Logger \u9762\u677F\u5C06\u8BB0\u5F55 DEBUG \u7EA7\u522B\u65E5\u5FD7\uFF0C\u5173\u95ED\u4EC5\u8BB0\u5F55 INFO \u53CA\u4EE5\u4E0A"})}
          </div>
          <div class="yyt-settings-hint" style="margin-top: 8px;">
            <i class="fa-solid fa-terminal"></i> \u5728\u300C\u65E5\u5FD7\u300D\u9762\u677F\u4E2D\u67E5\u770B\u3001\u641C\u7D22\u548C\u5BFC\u51FA\u63D2\u4EF6\u8FD0\u884C\u65E5\u5FD7
          </div>
        </div>

        <div class="yyt-flow-section">
          <div class="yyt-flow-heading"><span class="yyt-flow-heading-icon"><i class="fa-solid fa-clock-rotate-left"></i></span>\u6267\u884C\u8BB0\u5F55</div>
          <div class="yyt-form-group">
            ${ho({id:"yyt-setting-saveExecutionHistory",checked:t.saveExecutionHistory,title:"\u4FDD\u5B58\u6267\u884C\u5386\u53F2",hint:"\u8BB0\u5F55\u5DE5\u5177\u6267\u884C\u5386\u53F2\uFF0C\u4FBF\u4E8E\u95EE\u9898\u6392\u67E5"})}
          </div>
        </div>

        <div class="yyt-flow-section">
          <div class="yyt-flow-heading"><span class="yyt-flow-heading-icon"><i class="fa-solid fa-eye"></i></span>UI \u663E\u793A</div>
          <div class="yyt-form-group">
            ${ho({id:"yyt-setting-showRuntimeBadge",checked:t.showRuntimeBadge,title:"\u663E\u793A\u8FD0\u884C\u72B6\u6001\u5FBD\u7AE0",hint:"\u5728\u5DE5\u5177\u5361\u7247\u4E0A\u663E\u793A\u8FD0\u884C\u72B6\u6001\u6307\u793A\u5668"})}
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
            ${ho({id:"yyt-setting-compactMode",checked:t.compactMode,title:"\u7D27\u51D1\u6A21\u5F0F",hint:"\u51CF\u5C11\u5361\u7247\u95F4\u8DDD\uFF0C\u663E\u793A\u66F4\u591A\u5185\u5BB9"})}
          </div>

          <div class="yyt-form-group">
            ${ho({id:"yyt-setting-animationEnabled",checked:t.animationEnabled,title:"\u542F\u7528\u52A8\u753B\u6548\u679C",hint:"\u754C\u9762\u8FC7\u6E21\u548C\u4EA4\u4E92\u52A8\u753B"})}
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
    `},_renderMacroList(){return ot.getAvailableVariables().map(t=>`
        <div class="yyt-list-row">
          <code>${t.name}</code>
          <span>${t.description}</span>
        </div>
      `).join("")},bindEvents(t){let e=U();if(!e||!X(t))return;let s=this;t.off(".yytSettings"),t.on("click.yytSettings",".yyt-settings-tab",o=>{let n=e(o.currentTarget).data("tab");t.find(".yyt-settings-tab").removeClass("yyt-active"),e(o.currentTarget).addClass("yyt-active"),t.find(".yyt-settings-tab-content").removeClass("yyt-active"),t.find(`.yyt-settings-tab-content[data-tab="${n}"]`).addClass("yyt-active")}),t.on("click.yytSettings","#yyt-settings-save",()=>{s._saveSettings(t)}),t.on("click.yytSettings","#yyt-settings-reset",async()=>{await De("\u91CD\u7F6E\u8BBE\u7F6E","\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u8BBE\u7F6E\u4E3A\u9ED8\u8BA4\u503C\u5417\uFF1F",{danger:!0})&&(St.resetSettings(),hi(po.ui,xo()),s.renderTo(t),k("success","\u8BBE\u7F6E\u5DF2\u91CD\u7F6E"))}),bt(t,{namespace:"yytSettingsSelect",selectors:["#yyt-setting-queueStrategy","#yyt-setting-theme"]});let r=St.getDebugSettings();I.setLevel(r.enableDebugLog?ae.DEBUG:ae.INFO)},_saveSettings(t){let e=U(),s=[{id:"yyt-setting-maxConcurrent",min:1,max:10,label:"\u6700\u5927\u5E76\u53D1\u6570"},{id:"yyt-setting-maxRetries",min:0,max:10,label:"\u6700\u5927\u91CD\u8BD5\u6B21\u6570"},{id:"yyt-setting-retryDelayMs",min:1e3,max:6e4,label:"\u91CD\u8BD5\u95F4\u9694"},{id:"yyt-setting-requestTimeoutMs",min:1e4,max:3e5,label:"\u8BF7\u6C42\u8D85\u65F6\u65F6\u95F4"},{id:"yyt-setting-automationSettleMs",min:0,max:1e4,label:"\u7B49\u5F85\u7A33\u5B9A\u65F6\u95F4"},{id:"yyt-setting-automationCooldownMs",min:0,max:6e4,label:"\u81EA\u52A8\u5316\u51B7\u5374\u65F6\u95F4"}];for(let o of s){let n=t.find(`#${o.id}`),a=n.val(),i=parseInt(a,10);if(isNaN(i)||i<o.min||i>o.max){k("warning",`${o.label} \u987B\u5728 ${o.min} ~ ${o.max} \u4E4B\u95F4`),n.trigger("focus").trigger("select");return}}let r={executor:{maxConcurrent:parseInt(t.find("#yyt-setting-maxConcurrent").val(),10)||3,maxRetries:parseInt(t.find("#yyt-setting-maxRetries").val(),10)||2,retryDelayMs:parseInt(t.find("#yyt-setting-retryDelayMs").val(),10)||5e3,requestTimeoutMs:parseInt(t.find("#yyt-setting-requestTimeoutMs").val(),10)||9e4,queueStrategy:t.find("#yyt-setting-queueStrategy").val()||"fifo"},automation:{enabled:!0,settleMs:parseInt(t.find("#yyt-setting-automationSettleMs").val(),10)||1200,cooldownMs:parseInt(t.find("#yyt-setting-automationCooldownMs").val(),10)||5e3,maxConcurrentSlots:St.getSettings()?.automation?.maxConcurrentSlots||1},debug:{enableDebugLog:t.find("#yyt-setting-enableDebugLog").is(":checked"),saveExecutionHistory:t.find("#yyt-setting-saveExecutionHistory").is(":checked"),showRuntimeBadge:t.find("#yyt-setting-showRuntimeBadge").is(":checked")},ui:{theme:t.find("#yyt-setting-theme").val()||"dark-blue",compactMode:t.find("#yyt-setting-compactMode").is(":checked"),animationEnabled:t.find("#yyt-setting-animationEnabled").is(":checked")}};St.saveSettings(r),I.setLevel(r.debug.enableDebugLog?ae.DEBUG:ae.INFO),hi(r.ui,xo()),k("success","\u8BBE\u7F6E\u5DF2\u4FDD\u5B58")},_getAutomationRuntime(){try{return bu()?.YouYouToolkit?.getAutomationRuntime?.()||null}catch{return null}},destroy(t){!U()||!X(t)||(Ve(t,"yytSettingsSelect"),t.off(".yytSettings"))},getStyles(){return`
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
    `},renderTo(t){t.html(this.render({})),this.bindEvents(t,{})}},Eb=vu});function ye(t){return t==null?"":String(t).trim()}function wu(t="table"){let e=ye(t)||"table",s=Date.now().toString(36),r=Math.random().toString(36).slice(2,8);return`${e}_${s}_${r}`}function Su(t="table"){return wu(t)}function Ln(t="row"){return wu(t)}function nt(t,e=0){return ye(t)||`table_${Number.isFinite(e)?e+1:1}`}function vo(t,e=0){return ye(t)||`row_${Number.isFinite(e)?e+1:1}`}function Bn(t,e,s){return`${Number.isFinite(t)?t:-1}:${Number.isFinite(e)?e:-1}:${ye(s)||"*"}`}function pe(t){if(t!==void 0)try{return JSON.parse(JSON.stringify(t))}catch{return t}}function kr(t={}){return{chatId:ye(t.chatId),sourceMessageId:ye(t.sourceMessageId||t.messageId),sourceSwipeId:ye(t.sourceSwipeId||t.effectiveSwipeId),effectiveSwipeId:ye(t.effectiveSwipeId||t.sourceSwipeId),slotBindingKey:ye(t.slotBindingKey),slotRevisionKey:ye(t.slotRevisionKey),slotTransactionId:ye(t.slotTransactionId),traceId:ye(t.traceId),resolvedAt:Number.isFinite(t.resolvedAt)?t.resolvedAt:Date.now()}}function Si(t={}){return{resolvedAt:Number.isFinite(t.resolvedAt)?t.resolvedAt:Date.now(),runSource:ye(t.runSource)||Fe.MANUAL,traceId:ye(t.traceId),chatId:ye(t.chatId),sourceMessageId:ye(t.sourceMessageId||t.messageId),sourceSwipeId:ye(t.sourceSwipeId||t.effectiveSwipeId),effectiveSwipeId:ye(t.effectiveSwipeId||t.sourceSwipeId)||"swipe:current",slotBindingKey:ye(t.slotBindingKey),slotRevisionKey:ye(t.slotRevisionKey),slotTransactionId:ye(t.slotTransactionId),assistantContentFingerprint:ye(t.assistantContentFingerprint),assistantBaseFingerprint:ye(t.assistantBaseFingerprint),assistantText:String(t.assistantText||""),assistantBaseText:String(t.assistantBaseText||""),targetMessageIndex:Number.isFinite(t.targetMessageIndex)?t.targetMessageIndex:-1}}function Kt(t){return!t||typeof t!="object"?null:{chatId:ye(t.chatId),slotBindingKey:ye(t.slotBindingKey),slotRevisionKey:ye(t.slotRevisionKey),sourceMessageId:ye(t.sourceMessageId),sourceSwipeId:ye(t.sourceSwipeId),tables:Array.isArray(t.tables)?pe(t.tables):[],updatedAt:Number.isFinite(t.updatedAt)?t.updatedAt:0,meta:t.meta&&typeof t.meta=="object"?pe(t.meta):{}}}function wo(t={},e={}){let s=Si(t),r=e.meta&&typeof e.meta=="object"?pe(e.meta):{};return{chatId:s.chatId,slotBindingKey:s.slotBindingKey,slotRevisionKey:s.slotRevisionKey,sourceMessageId:s.sourceMessageId,sourceSwipeId:s.sourceSwipeId||s.effectiveSwipeId,tables:Array.isArray(e.tables)?pe(e.tables):[],updatedAt:Number.isFinite(e.updatedAt)?e.updatedAt:Date.now(),meta:{sourceKind:r.sourceKind||yt.EMPTY,...r}}}function zn(t){return!t||typeof t!="object"?{lastResolvedTarget:null,lastCommittedTarget:null,updatedAt:0}:{lastResolvedTarget:t.lastResolvedTarget?kr(t.lastResolvedTarget):null,lastCommittedTarget:t.lastCommittedTarget?kr(t.lastCommittedTarget):null,updatedAt:Number.isFinite(t.updatedAt)?t.updatedAt:0}}var sr,Ir,Fe,Rt,rr,yt,ns,wi,pt=R(()=>{sr="YouYouToolkit_tableState",Ir="YouYouToolkit_tableBindings",Fe=Object.freeze({MANUAL:"MANUAL_TABLE",AUTO:"AUTO_TABLE"}),Rt=Object.freeze({ENABLED:"enabled",SELECTED:"selected",CURRENT:"current"}),rr=Object.freeze({EXACT:"exact",BINDING_FALLBACK:"binding_fallback",HISTORY:"history",TEMPLATE:"template",EMPTY:"empty"}),yt=Object.freeze({EXACT:"exact",BINDING:"binding",HISTORY:"history",TEMPLATE:"template",EMPTY:"empty"}),ns=Object.freeze({INSERT_ROW:"insertRow",UPDATE_ROW:"updateRow",DELETE_ROW:"deleteRow"}),wi=Object.freeze({CELL:"cell",ROW:"row",COLUMN:"column"})});function Pt(t,e=""){return t==null?e:String(t).trim()||e}function Tu(t="template"){return`${t}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`}function Un(t={}){let e=pe(Array.isArray(t.tables)?t.tables:[]),s=as({tables:e});return{id:Pt(t.id,Tu()),name:Pt(t.name,"\u672A\u547D\u540D\u6A21\u677F"),description:Pt(t.description,""),tables:s.tables||e,promptTemplate:Pt(t.promptTemplate,""),createdAt:Pt(t.createdAt,new Date().toISOString()),updatedAt:Pt(t.updatedAt,new Date().toISOString())}}function Cb(){return[Un({id:_s,name:ki,description:"\u5305\u542B\u5168\u5C40\u6570\u636E\u3001\u4E3B\u89D2\u3001\u91CD\u8981\u89D2\u8272\u3001\u6280\u80FD\u3001\u80CC\u5305\u3001\u4EFB\u52A1\u3001\u7EAA\u8981\u548C\u9009\u9879\u8868\u3002",tables:pe(To)})]}function So(){let t=Ti.get(_i,[]);return Array.isArray(t)?t.map(Un):[]}function Ai(){let t=Cb(),e=So(),s=new Set(t.map(r=>r.id));return[...t,...e.filter(r=>!s.has(r.id))]}function _u(t){let e=Pt(t,"");return Ai().find(s=>s.id===e)||null}function Ei(t={}){let e=new Date().toISOString(),s=Un({...t,id:Pt(t.id,Tu()),updatedAt:e,createdAt:Pt(t.createdAt,e)}),o=So().filter(n=>n.id!==s.id);return o.push(s),Ti.set(_i,o),{success:!0,template:s}}function Au(t){let e=Pt(t,"");if(!e||e===_s)return{success:!1,error:"\u5185\u7F6E\u6A21\u677F\u4E0D\u80FD\u5220\u9664\u3002"};let s=So().filter(r=>r.id!==e);return Ti.set(_i,s),{success:!0}}function Eu(){return{version:1,exportedAt:new Date().toISOString(),templates:So()}}function Cu(t,{overwrite:e=!1}={}){let s;if(Array.isArray(t))s=t;else if(t&&typeof t=="object")Array.isArray(t.templates)?s=t.templates:t.template&&typeof t.template=="object"?s=[t.template]:s=[t];else return{success:!1,imported:0,skipped:0,errors:["\u65E0\u6548\u7684\u5BFC\u5165\u6570\u636E\u683C\u5F0F\u3002"]};let r=new Set(So().map(i=>i.id)),o=0,n=0,a=[];for(let i of s)try{let l=Un(i);if(!e&&r.has(l.id)){n++;continue}Ei(l),r.add(l.id),o++}catch(l){a.push(Pt(l?.message,"\u672A\u77E5\u9519\u8BEF"))}return{success:!0,imported:o,skipped:n,errors:a}}var Ti,_i,Ci=R(()=>{We();As();pt();Ti=$.namespace("tableWorkbenchTemplates"),_i="templates"});function jn(t,e=""){return t==null?e:String(t).trim()||e}function kb(t,e=!1){return t==null?e:t===!0}function Fn(t={},e=0){return nt(t?.id||t?.key,e)}function _o(t={},e={}){let s=t&&typeof t=="object"?t:{},r=e&&typeof e=="object"?e:{},o=jn(s.mode||s.runScope||r.mode||r.runScope,Rt.ENABLED),n=Array.isArray(s.selectedTableIds)?s.selectedTableIds.map(i=>jn(i,"")).filter(Boolean):Array.isArray(r.selectedTableIds)?r.selectedTableIds.map(i=>jn(i,"")).filter(Boolean):[],a=jn(s.activeTableId||r.activeTableId,"");return{mode:Object.values(Rt).includes(o)?o:Rt.ENABLED,selectedTableIds:n,activeTableId:a}}function ku(t={},e=[]){let s=_o(t,t?.scope||{}),r=Array.isArray(e)?e:[],o=r.map((i,l)=>Fn(i,l)),n=[];s.mode===Rt.CURRENT?n=s.activeTableId?[s.activeTableId]:[]:s.mode===Rt.SELECTED?n=s.selectedTableIds.filter(i=>o.includes(i)):n=r.map((i,l)=>({table:i,id:Fn(i,l)})).filter(({table:i})=>kb(i?.enabled,!0)).map(({id:i})=>i);let a=new Set(n);return{...s,allTableIds:o,allowedTableIds:n,allowedIdSet:a,includes(i={},l=-1){return a.has(Fn(i,l))},filterTables(i=[]){return(Array.isArray(i)?i:[]).filter((c,d)=>a.has(Fn(c,d)))},toJSON(){return{mode:s.mode,selectedTableIds:pe(s.selectedTableIds),activeTableId:s.activeTableId,allowedTableIds:[...n]}}}}var Kn=R(()=>{pt()});function ft(t,e=""){return t==null?e:String(t).trim()||e}function Ii(){let t=globalThis.window||globalThis;return ft(t?.TavernHelper?.getCurrentChatId?.()||t?.Silvy?.getCurrentChatId?.()||t?.chat_metadata?.chat_id||t?.this_chid||t?.name1,"default_chat")}function Ib(t,e=!1){return t===!0}function Mb(t={}){let e=t&&typeof t=="object"?t:{};return{enabled:Ib(e.enabled,!1),targetBook:ft(e.targetBook,""),entryComment:ft(e.entryComment,"YYT-\u586B\u8868\u6570\u636E")}}function Mi(t={},e={}){let s=t&&typeof t=="object"?t:{},r=_o(s.scope,{mode:s.runScope||e.runScope||Rt.ENABLED,selectedTableIds:s.selectedTableIds||e.selectedTableIds||[],activeTableId:s.activeTableId||e.activeTableId||""});return{chatId:ft(s.chatId,ft(e.chatId,Ii())),templateId:ft(s.templateId,ft(e.templateId,_s)),enabledTableIds:Array.isArray(s.enabledTableIds)?s.enabledTableIds.map(o=>ft(o,"")).filter(Boolean):[],focusedTableId:ft(s.focusedTableId,r.activeTableId),scope:r,worldbookSync:Mb(s.worldbookSync),seedNote:ft(s.seedNote,""),updatedAt:ft(s.updatedAt,new Date().toISOString())}}function Ru(){let t=Iu.get(Mu,{});return t&&typeof t=="object"&&!Array.isArray(t)?t:{}}function Ri(t=Ii()){let e=ft(t,"default_chat"),s=Ru();return Mi(s[e],{chatId:e})}function Pu(t={},e=Ii()){let s=ft(e,"default_chat"),r=Ru(),o=Mi({...r[s],...t||{},chatId:s,updatedAt:new Date().toISOString()},{chatId:s});return Iu.set(Mu,{...r,[s]:o}),{success:!0,guide:o}}function $u(t={},e=null){let s=Mi(e||Ri(),{templateId:t.activeTemplate,runScope:t.runScope,selectedTableIds:t.scope?.selectedTableIds,activeTableId:t.scope?.activeTableId}),r={...t,activeTemplate:s.templateId||t.activeTemplate,runScope:s.scope.mode,scope:s.scope};return s.worldbookSync&&s.worldbookSync.targetBook&&(r.worldbookSync={...t.worldbookSync||{},...s.worldbookSync}),r}var Iu,Mu,Du=R(()=>{We();As();pt();Kn();Iu=$.namespace("tableWorkbenchGuides"),Mu="guides"});function G(t,e,s="",r=or){return{key:t,title:e,description:s,type:r,required:!1}}function Es({id:t,name:e,note:s,aiInstructions:r,columns:o}){return{id:t,name:e,note:s,enabled:!0,aiInstructions:{init:r?.init||"",create:r?.create||"",update:r?.update||"",delete:r?.delete||""},columns:o,rows:[]}}function A(t,e=""){return t==null?e:String(t).trim()||e}function is(t,e=!1){return t==null?e:t===!0}function Pb(t){if(!Array.isArray(t)||t.length!==1)return!1;let e=t[0]&&typeof t[0]=="object"?t[0]:null;if(!e)return!1;let s=A(e.name||e.title,""),r=A(e.note||e.description,""),o=Array.isArray(e.columns)?e.columns:[],n=Array.isArray(e.rows)?e.rows:[];if(s&&!["\u88681","\u8868\u683C 1","\u8868\u683C1"].includes(s)||r||o.length!==1||n.length>1)return!1;let a=o[0]&&typeof o[0]=="object"?o[0]:{},i=A(a.key||a.id,""),l=A(a.title||a.name||a.label,"");if(A(a.description||a.note,"")||i&&i!=="col_1"||l&&!["\u52171","col_1"].includes(l))return!1;if(n.length===0)return!0;let d=n[0]&&typeof n[0]=="object"?n[0]:{},u=A(d.name||d.title||d.label,""),p=d.cells&&typeof d.cells=="object"&&!Array.isArray(d.cells)?d.cells:{},y=Array.isArray(d.values)?d.values:[],f=Object.values(p).some(x=>A(x,""))||y.some(x=>A(x,""));return(!u||u==="\u884C1")&&!f}function $b(t,{seedDefaultWhenMissing:e=!1}={}){return Pb(t)?pe(To):Array.isArray(t)?pe(t):t&&typeof t=="object"?Nb(t):e?pe(To):[]}function Db(t=""){let e=[],s=A(t,""),r=/-\s*列\d+\s*[:：]\s*([^\n\-–—]+?)\s*[-–—]\s*([^\n]+)/g,o;for(;o=r.exec(s);)e.push({title:A(o[1],""),description:A(o[2],"")});return e}function Nb(t={}){let e=t&&typeof t=="object"?t:{};return Object.keys(e).filter(r=>r.startsWith("sheet_")&&e[r]&&typeof e[r]=="object").map((r,o)=>({key:r,table:e[r],fallbackOrder:o})).sort((r,o)=>{let n=Number.isFinite(r.table.orderNo)?r.table.orderNo:r.fallbackOrder,a=Number.isFinite(o.table.orderNo)?o.table.orderNo:o.fallbackOrder;return n-a}).map(({key:r,table:o},n)=>{let a=o.sourceData&&typeof o.sourceData=="object"?o.sourceData:{},i=Array.isArray(o.content)?o.content:[],l=Array.isArray(i[0])?i[0]:[],c=Db(a.note),d=new Set,u=l.slice(1).map((y,f)=>{let x=c[f]||{},h=A(y||x.title,`\u5217${f+1}`);return{key:Di(h||`col_${f+1}`,d),title:h,description:A(x.description,""),type:or,required:!1}}),p=i.slice(1).map((y,f)=>{let x=Array.isArray(y)?y:[],h={};return u.forEach((C,T)=>{h[C.key]=Ao(x[T+1])}),{name:A(x[0],`\u884C${f+1}`),cells:h}});return{id:A(o.uid||r,`sheet_${n+1}`),name:A(o.name,`\u8868${n+1}`),note:A(a.note,""),enabled:o.enabled!==!1,aiInstructions:{init:A(a.initNode,""),create:A(a.insertNode,""),update:A(a.updateNode,""),delete:A(a.deleteNode,"")},columns:u,rows:p}})}function Ao(t){if(t==null)return"";if(typeof t=="string")return t;try{return JSON.stringify(t,null,2)}catch{return String(t)}}function Ob(t,e="col"){return A(t,"").toLowerCase().replace(/[^a-z0-9]+/g,"_").replace(/^_+|_+$/g,"")||e}function Di(t,e=new Set){let s=Ob(t,"col"),r=s,o=2;for(;e.has(r);)r=`${s}_${o}`,o+=1;return e.add(r),r}function Lb(t=[]){let e=[],s=0;return t.forEach(r=>{let o=r&&typeof r=="object"?r:{},n=o.cells&&typeof o.cells=="object"&&!Array.isArray(o.cells)?o.cells:null,a=Array.isArray(o.cells)?o.cells:Array.isArray(o.values)?o.values:null;n&&Object.keys(n).forEach(i=>{e.includes(i)||e.push(i)}),a&&a.length>s&&(s=a.length)}),e.length>0?e.map(r=>({key:r,title:String(r)})):s>0?Array.from({length:s},(r,o)=>({key:`col_${o+1}`,title:`\u5217${o+1}`})):[]}function Ni(t,e=or){let s=A(t,e);return Ou.some(r=>r.value===s)?s:e}function Bb(t={},e=0,s=new Set){let r=t&&typeof t=="object"?t:{},o=A(r.title||r.name||r.label,`\u5217${e+1}`),n=A(r.key||r.id,""),a=Di(n||o||`col_${e+1}`,s),i=[n,A(r.title,""),A(r.name,""),A(r.label,"")].filter(Boolean);return{key:a,title:o,description:A(r.description||r.note,""),type:Ni(r.type),required:r.required===!0,sourceKeys:i}}function zb(t={},e={},s=0){let r=t.cells&&typeof t.cells=="object"&&!Array.isArray(t.cells)?t.cells:null,o=Array.isArray(t.cells)?t.cells:Array.isArray(t.values)?t.values:null;if(r){let n=[...Array.isArray(e.sourceKeys)?e.sourceKeys:[],e.key,e.title].filter(Boolean);for(let a of n)if(r[a]!==void 0)return Ao(r[a])}return o&&o[s]!==void 0?Ao(o[s]):""}function Ub(t={},e=[],s=0){let r=t&&typeof t=="object"?t:{},o={};return e.forEach((n,a)=>{o[n.key]=zb(r,n,a)}),{id:vo(r.id||r.rowId,s),name:A(r.name||r.title||r.label,`\u884C${s+1}`),cells:o}}function Lu(t={}){let e=t&&typeof t=="object"?t:{};return{init:A(e.init,""),create:A(e.create,""),update:A(e.update,""),delete:A(e.delete,"")}}function jb(t={},e=""){let s=t&&typeof t=="object"?t:{},r=A(s.presetId,A(e,""));return{enabled:s.enabled===!0,presetId:r}}function Fb(t={},e=""){let s=t&&typeof t=="object"?t:{};return{enabled:is(s.enabled,!1),entryName:A(s.entryName,e),entryType:s.entryType==="keyword"?"keyword":"constant",splitByRow:is(s.splitByRow,!1),keywords:A(s.keywords,""),injectionTemplate:A(s.injectionTemplate,""),preventRecursion:is(s.preventRecursion,!0),entryPlacement:{position:A(s.entryPlacement?.position||s.placement?.position,"before_character_definition"),depth:Number.isFinite(Number(s.entryPlacement?.depth??s.placement?.depth))?Math.floor(Number(s.entryPlacement?.depth??s.placement?.depth)):2,order:Number.isFinite(Number(s.entryPlacement?.order??s.placement?.order))?Math.floor(Number(s.entryPlacement?.order??s.placement?.order)):0}}}function Bu(t={},e=0){let s=t&&typeof t=="object"?t:{},r=new Set,n=(Array.isArray(s.columns)&&s.columns.length>0?s.columns:Lb(Array.isArray(s.rows)?s.rows:[])).map((l,c)=>Bb(l,c,r)),a=Array.isArray(s.rows)?s.rows.map((l,c)=>Ub(l,n,c)):[],i=A(s.name||s.title,`\u8868${e+1}`);return{id:nt(s.id||s.key,e),name:i,note:A(s.note||s.description,""),enabled:s.enabled!==!1,aiInstructions:Lu(s.aiInstructions),exportConfig:Fb(s.exportConfig,i),columns:n.map(l=>({key:l.key,title:l.title,description:A(l.description,""),type:Ni(l.type),required:l.required===!0})),rows:a}}function zu(t={}){let e=t&&typeof t=="object"?t:{},s=Array.isArray(e.lastErrorDetails)?e.lastErrorDetails.map(o=>A(o,"")).filter(Boolean):[],r=e.lastValidationSummary&&typeof e.lastValidationSummary=="object"?{errorCount:Number.isFinite(e.lastValidationSummary.errorCount)?e.lastValidationSummary.errorCount:0,warningCount:Number.isFinite(e.lastValidationSummary.warningCount)?e.lastValidationSummary.warningCount:0}:{errorCount:0,warningCount:0};return{lastStatus:A(e.lastStatus,Te.IDLE),lastRunAt:Number.isFinite(e.lastRunAt)?e.lastRunAt:0,lastDurationMs:Number.isFinite(e.lastDurationMs)?e.lastDurationMs:0,lastError:A(e.lastError,""),lastErrorDetails:s,lastValidationSummary:r,successCount:Number.isFinite(e.successCount)?e.successCount:0,errorCount:Number.isFinite(e.errorCount)?e.errorCount:0,lastSourceMessageId:A(e.lastSourceMessageId,""),lastSlotRevisionKey:A(e.lastSlotRevisionKey,""),lastLoadMode:A(e.lastLoadMode,""),lastFillMode:A(e.lastFillMode,""),lastMirrorApplied:e.lastMirrorApplied===!0,lastResolvedFromMessageId:A(e.lastResolvedFromMessageId,""),lastResolvedFromRevisionKey:A(e.lastResolvedFromRevisionKey,""),lastSourceKind:A(e.lastSourceKind,""),lastScopeMode:A(e.lastScopeMode,""),lastAutoRunAt:Number.isFinite(e.lastAutoRunAt)?e.lastAutoRunAt:0,lastAutoStatus:A(e.lastAutoStatus,Te.IDLE),lastAutoMessageId:A(e.lastAutoMessageId,""),lastAutoRevisionKey:A(e.lastAutoRevisionKey,""),lastAutoSkipReason:A(e.lastAutoSkipReason,"")}}function Hn(t=1,e=[]){let s=new Set((Array.isArray(e)?e:[]).map(o=>A(o?.key,"")).filter(Boolean));return{key:Di(`col_${t}`,s),title:`\u5217${t}`,description:"",type:or,required:!1}}function qn(t=[],e=1){let s={};return(Array.isArray(t)?t:[]).forEach(r=>{let o=A(r?.key,"");o&&(s[o]="")}),{id:Ln("row"),name:`\u884C${e}`,cells:s}}function Oi(t=1){let e=Hn(1);return{id:Su("table"),name:`\u8868${t}`,note:"",enabled:!0,aiInstructions:Lu(),columns:[e],rows:[qn([e],1)]}}function Kb(){return{tables:[]}}function Uu(t=[]){return!Array.isArray(t)||t.length===0?Kb():{tables:t.map((e,s)=>Bu(e,s))}}function Wb(t={}){let e=t&&typeof t=="object"?t:{};return(Array.isArray(e.tables)?e.tables:[]).map((r,o)=>Bu(r,o))}function ju(t="",e={},s={}){let r=Ni(e?.type),o=String(t??"").trim(),n=A(s?.label,`${A(s?.tableName,"\u8868\u683C")} / ${A(s?.rowName,"\u884C")} / ${A(e?.title||e?.key,"\u5355\u5143\u683C")}`),a=[],i=[];if(e?.required===!0&&!o&&a.push(`${n} \u4E3A\u5FC5\u586B\uFF0C\u5F53\u524D\u4E3A\u7A7A\u3002`),!o)return{valid:a.length===0,errors:a,warnings:i};if(r==="number"&&!Number.isFinite(Number(o))&&a.push(`${n} \u9700\u8981\u586B\u5199\u6570\u5B57\u3002`),r==="boolean"&&!["true","false","1","0","yes","no"].includes(o.toLowerCase())&&a.push(`${n} \u9700\u8981\u586B\u5199\u5E03\u5C14\u503C\uFF08true / false\uFF09\u3002`),r==="date"&&Number.isNaN(Date.parse(o))&&a.push(`${n} \u9700\u8981\u586B\u5199\u53EF\u89E3\u6790\u7684\u65E5\u671F\u3002`),r==="json")try{JSON.parse(o)}catch(l){a.push(`${n} \u9700\u8981\u586B\u5199\u5408\u6CD5 JSON\uFF1A${l?.message||"\u89E3\u6790\u5931\u8D25"}`)}return{valid:a.length===0,errors:a,warnings:i}}function Hb(t={}){let s=Wb(t&&typeof t=="object"?t:{}),r=[];return s.forEach((o,n)=>{let a=A(o?.name,`\u8868${n+1}`),i=Array.isArray(o?.columns)?o.columns:[],l=Array.isArray(o?.rows)?o.rows:[];a||r.push(`\u8868 ${n+1} \u7F3A\u5C11\u540D\u79F0\u3002`),i.length===0&&r.push(`${a} \u81F3\u5C11\u9700\u8981\u4E00\u5217\u3002`);let c=new Set;i.forEach((d,u)=>{let p=A(d?.key,""),y=A(d?.title,`\u5217${u+1}`);if(!p){r.push(`${a} / ${y} \u7F3A\u5C11\u5185\u90E8\u540D\u3002`);return}if(c.has(p)){r.push(`${a} \u4E2D\u5B58\u5728\u91CD\u590D\u5217\u5185\u90E8\u540D\uFF1A${p}`);return}c.add(p)}),l.forEach((d,u)=>{let p=A(d?.name,`\u884C${u+1}`),y=d?.cells&&typeof d.cells=="object"&&!Array.isArray(d.cells)?d.cells:{};i.forEach((f,x)=>{let h=A(f?.key,""),C=A(f?.title||h,`\u5217${x+1}`),T=h?Ao(y[h]):"",_=ju(T,f,{label:`${a} / ${p} / ${C}`,tableName:a,rowName:p});r.push(..._.errors)})})}),{valid:r.length===0,errors:r,tables:s}}function Mr({severity:t="error",message:e="",tableIndex:s=-1,tableName:r="",columnIndex:o=-1,columnKey:n="",rowIndex:a=-1,rowName:i="",cellKey:l=""}={}){return{severity:t,message:A(e,t==="warning"?"\u5B58\u5728\u8B66\u544A\u3002":"\u5B58\u5728\u9519\u8BEF\u3002"),tableIndex:s,tableName:A(r,""),columnIndex:o,columnKey:A(n,""),rowIndex:a,rowName:A(i,""),cellKey:A(l,"")}}function as(t={}){let e=Hb(t),s=[];if(!e.valid)return{...e,warnings:[],issues:s,summary:{errorCount:e.errors.length,warningCount:0}};let r=Array.isArray(e.tables)?e.tables:[];r.forEach((a,i)=>{let l=A(a?.name,`\u8868${i+1}`),c=Array.isArray(a?.columns)?a.columns:[],d=Array.isArray(a?.rows)?a.rows:[],u=new Set;l||s.push(Mr({severity:"error",message:`\u8868 ${i+1} \u7F3A\u5C11\u540D\u79F0\u3002`,tableIndex:i,tableName:l})),c.forEach((p,y)=>{let f=A(p?.key,""),x=A(p?.title,`\u5217${y+1}`);f||s.push(Mr({severity:"error",message:`${l} / ${x} \u7F3A\u5C11\u5185\u90E8\u540D\u3002`,tableIndex:i,tableName:l,columnIndex:y,columnKey:f,cellKey:f})),f&&(u.has(f)&&s.push(Mr({severity:"error",message:`${l} \u4E2D\u5B58\u5728\u91CD\u590D\u5217\u5185\u90E8\u540D\uFF1A${f}`,tableIndex:i,tableName:l,columnIndex:y,columnKey:f,cellKey:f})),u.add(f))}),d.forEach((p,y)=>{let f=A(p?.name,`\u884C${y+1}`),x=p?.cells&&typeof p.cells=="object"&&!Array.isArray(p.cells)?p.cells:{};Object.keys(x).forEach(C=>{c.some(T=>A(T?.key,"")===C)||s.push(Mr({severity:"warning",message:`${l} / ${f} \u5305\u542B\u672A\u5B9A\u4E49\u5217 ${C}\uFF0C\u4FDD\u5B58\u540E\u4F1A\u88AB\u5FFD\u7565\u3002`,tableIndex:i,tableName:l,rowIndex:y,rowName:f,cellKey:C}))}),c.forEach((C,T)=>{let _=A(C?.key,""),Y=A(C?.title||_,`\u5217${T+1}`),L=_?Ao(x[_]):"",S=ju(L,C,{label:`${l} / ${f} / ${Y}`,tableName:l,rowName:f});S.errors.forEach(N=>{s.push(Mr({severity:"error",message:N,tableIndex:i,tableName:l,columnIndex:T,columnKey:_,rowIndex:y,rowName:f,cellKey:_}))}),S.warnings.forEach(N=>{s.push(Mr({severity:"warning",message:N,tableIndex:i,tableName:l,columnIndex:T,columnKey:_,rowIndex:y,rowName:f,cellKey:_}))})})})});let o=s.filter(a=>a.severity!=="warning").map(a=>a.message),n=s.filter(a=>a.severity==="warning").map(a=>a.message);return{valid:o.length===0,errors:o,warnings:n,issues:s,tables:r,summary:{errorCount:o.length,warningCount:n.length}}}function Eo(){return Ai()}function Fu(){return{tables:pe(To),promptTemplate:Nu,apiPreset:"",promptPreset:"",bypass:{enabled:!1,presetId:""},activeTemplate:_s,autoUpdateEnabled:!1,autoUpdateTrigger:"assistantMessage",runScope:Rt.ENABLED,scope:{mode:Rt.ENABLED,selectedTableIds:[],activeTableId:""},fillMode:Cs.INCREMENTAL,contextDepth:8,contextRoles:"all",contextExtractTags:[],contextUseGlobalRules:!1,worldbooks:{enabled:!1,selected:[]},sendLatestRows:-1,mirrorToMessage:!1,mirrorTag:"yyt-table-workbench",worldbookSync:{enabled:!1,targetBook:"",entryComment:"YYT-\u586B\u8868\u6570\u636E"},wrapperConfig:{enabled:!0,wrapperTag:"\u6700\u65B0\u6570\u636E\u4E0E\u8BB0\u5F55",wrapperHint:"\u4EE5\u4E0B\u662F\u5728\u8FD9\u4E2A\u65F6\u95F4\u70B9\uFF0C\u5F53\u524D\u573A\u666F\u4E0B\u5267\u60C5\u76F8\u5173\u7684\u6700\u65B0\u6570\u636E\u4E0E\u8BB0\u5F55\uFF0C\u4F60\u5728\u8FDB\u884C\u5267\u60C5\u5206\u6790\u65F6\u5FC5\u987B\u4EE5\u6B64\u6700\u65B0\u7684\u6570\u636E\u4E3A\u51C6\uFF0C\u4EE5\u4E0B\u6570\u636E\u4E0E\u8BB0\u5F55\u7684\u4F18\u5148\u7EA7\u9AD8\u4E8E\u5176\u4ED6\u4EFB\u4F55\u80CC\u666F\u8BBE\u5B9A\uFF1A",wrapperPlacement:{position:"before_character_definition",depth:2,order:0}},runtime:zu()}}function _t(t={}){let e=Fu(),s=t&&typeof t=="object"?t:{},r=jb(s.bypass,s.promptPreset),o=$b(s.tables,{seedDefaultWhenMissing:!Object.prototype.hasOwnProperty.call(s,"tables")}),n=_o(s.scope,{mode:s.runScope,selectedTableIds:s.selectedTableIds,activeTableId:s.activeTableId});return{tables:o,promptTemplate:A(s.promptTemplate,e.promptTemplate),apiPreset:A(s.apiPreset,""),promptPreset:r.presetId,bypass:r,activeTemplate:A(s.activeTemplate,e.activeTemplate),autoUpdateEnabled:is(s.autoUpdateEnabled,e.autoUpdateEnabled),autoUpdateTrigger:A(s.autoUpdateTrigger,e.autoUpdateTrigger),runScope:n.mode,scope:n,fillMode:s.fillMode===Cs.FULL?Cs.FULL:e.fillMode,contextDepth:Number.isFinite(Number(s.contextDepth))&&Number(s.contextDepth)>0?Math.floor(Number(s.contextDepth)):e.contextDepth,contextRoles:s.contextRoles==="assistant_only"?"assistant_only":"all",contextExtractTags:Array.isArray(s.contextExtractTags)?s.contextExtractTags.filter(a=>typeof a=="string"&&a.trim()):typeof s.contextExtractTags=="string"&&s.contextExtractTags.trim()?s.contextExtractTags.split(`
`).map(a=>a.trim()).filter(Boolean):[],contextUseGlobalRules:is(s.contextUseGlobalRules??s.contextUseExtractRules??s.contextUseExcludeRules,!1),worldbooks:{enabled:is(s.worldbooks?.enabled,!1),selected:Array.isArray(s.worldbooks?.selected)?s.worldbooks.selected.filter(a=>typeof a=="string"&&a.trim()):[]},sendLatestRows:Number.isFinite(Number(s.sendLatestRows))?Math.floor(Number(s.sendLatestRows)):-1,mirrorToMessage:is(s.mirrorToMessage,e.mirrorToMessage),mirrorTag:A(s.mirrorTag,e.mirrorTag),worldbookSync:{enabled:is(s.worldbookSync?.enabled,!1),targetBook:A(s.worldbookSync?.targetBook,""),entryComment:A(s.worldbookSync?.entryComment,e.worldbookSync.entryComment)},wrapperConfig:{enabled:is(s.wrapperConfig?.enabled,e.wrapperConfig.enabled),wrapperTag:A(s.wrapperConfig?.wrapperTag,e.wrapperConfig.wrapperTag),wrapperHint:A(s.wrapperConfig?.wrapperHint,e.wrapperConfig.wrapperHint),wrapperPlacement:{position:A(s.wrapperConfig?.wrapperPlacement?.position,e.wrapperConfig.wrapperPlacement.position),depth:Number.isFinite(Number(s.wrapperConfig?.wrapperPlacement?.depth))?Math.floor(Number(s.wrapperConfig?.wrapperPlacement?.depth)):e.wrapperConfig.wrapperPlacement.depth,order:Number.isFinite(Number(s.wrapperConfig?.wrapperPlacement?.order))?Math.floor(Number(s.wrapperConfig?.wrapperPlacement?.order)):e.wrapperConfig.wrapperPlacement.order}},runtime:zu({...e.runtime,...s.runtime||{}})}}function Li(t={}){let e=_t(t),s=[];return Array.isArray(e.tables)||s.push("\u8868\u5B9A\u4E49\u5FC5\u987B\u662F JSON \u6570\u7EC4\u3002"),e.promptTemplate||s.push("\u586B\u8868 Prompt \u4E0D\u80FD\u4E3A\u7A7A\u3002"),e.mirrorTag||s.push("\u6B63\u6587\u955C\u50CF\u6807\u7B7E\u4E0D\u80FD\u4E3A\u7A7A\u3002"),{valid:s.length===0,errors:s,config:e}}function Le(){let t=Pi.get($i,Fu()),e=_t(t),s=Ri();return{...$u(e,s),guide:s}}function qb(t){let s=(Array.isArray(t?.tables)?t.tables:[]).map(r=>({...r,rows:[]}));return{...t,tables:s}}function at(t={}){let e=Le(),s=_t({...e,...t||{},runtime:t?.runtime===void 0?e.runtime:t.runtime}),r=Li(s);if(!r.valid)return{success:!1,error:r.errors.join(`
`),errors:r.errors,config:r.config};let o=qb(r.config);return Pi.set($i,o),Pu({templateId:r.config.activeTemplate,scope:r.config.scope,worldbookSync:r.config.worldbookSync}),{success:!0,config:r.config}}function Ku(t){let e=_u(t);if(!e)return{success:!1,error:"\u6A21\u677F\u4E0D\u5B58\u5728\u3002"};let s=Le();return at({...s,tables:pe(e.tables),activeTemplate:e.id,promptTemplate:e.promptTemplate||s.promptTemplate})}function Wu({name:t="",description:e=""}={}){let s=Le();return Ei({name:A(t,`${ki}\u526F\u672C`),description:e,tables:pe(s.tables),promptTemplate:s.promptTemplate})}function Hu(t={}){let e=Le(),s=_t({...e,runtime:{...e.runtime,...t||{}}});return Pi.set($i,s),s.runtime}function Yb(t={}){let e=_t(t);return`${A(e.promptTemplate,Nu)}

${Rb}`.trim()}function qu(t={}){let e=_t(t);return{id:"tableWorkbench",name:"\u586B\u8868\u5DE5\u4F5C\u53F0",promptTemplate:Yb(e),bypass:{enabled:e.bypass?.enabled===!0,presetId:e.bypass?.presetId||e.promptPreset||""}}}function Yu({apiPresets:t=[]}={}){let e=[{value:"",label:"\u5F53\u524D API \u914D\u7F6E"},...t.map(s=>({value:String(s?.name||""),label:String(s?.name||"")})).filter(s=>s.value)];return[{name:"tables",type:"tableDefinitions",label:"\u8868\u5B9A\u4E49",description:"\u901A\u8FC7\u7ED3\u6784\u5316\u7F16\u8F91\u5668\u7EF4\u62A4 tables\u3002\u9996\u6B21\u6267\u884C\u6216\u5F53\u524D\u6D88\u606F\u5C1A\u65E0\u7ED1\u5B9A state \u65F6\uFF0C\u4F1A\u4EE5\u7F16\u8BD1\u540E\u7684 tables \u4F5C\u4E3A merge base\u3002",emptyValue:[]},{name:"promptTemplate",type:"textarea",label:"\u586B\u8868 Prompt",rows:12,description:"\u53EF\u4F7F\u7528 {{lastUserMessage}}\u3001{{lastAiMessage}}\u3001{{chatHistory}}\u3001{{toolContentMacro}} \u7B49\u53D8\u91CF\u3002\u7CFB\u7EDF\u4F1A\u81EA\u52A8\u8FFD\u52A0 JSON \u8F93\u51FA\u7EA6\u675F\u3002"},{name:"apiPreset",type:"select",label:"API \u9884\u8BBE",description:"\u4E3A\u7A7A\u65F6\u4F7F\u7528\u5F53\u524D\u5168\u5C40 API \u914D\u7F6E\u3002",options:e},{name:"mirrorToMessage",type:"checkbox",label:"\u955C\u50CF\u5199\u56DE\u6B63\u6587",description:"\u628A\u5F53\u524D tables \u7684 JSON \u9884\u89C8\u955C\u50CF\u5230\u76EE\u6807 assistant \u6D88\u606F\u6B63\u6587\u4E2D\u3002"}]}var Pi,$i,Te,Cs,Nu,Rb,Ou,or,Wn,_s,ki,To,As=R(()=>{We();pt();Ci();Kn();Du();Pi=$.namespace("tableWorkbench"),$i="config",Te=Object.freeze({IDLE:"idle",RUNNING:"running",SUCCESS:"success",ERROR:"error",ABORTED:"aborted",SKIPPED:"skipped"}),Cs=Object.freeze({INCREMENTAL:"incremental",FULL:"full"}),Nu=`\u8BF7\u6839\u636E\u5F53\u524D\u5BF9\u8BDD\u4E0E\u5F53\u524D\u8868\u683C\u57FA\u5E95\uFF0C\u66F4\u65B0\u7ED3\u6784\u5316 tables \u6570\u636E\u3002

\u8981\u6C42\uFF1A
1. \u53EA\u4F9D\u636E\u5F53\u524D\u5BF9\u8BDD\u5185\u5BB9\u66F4\u65B0\uFF0C\u4E0D\u8981\u81C6\u9020\u672A\u51FA\u73B0\u7684\u4FE1\u606F\u3002
2. \u4FDD\u6301\u539F\u6709\u8868\u7ED3\u6784\uFF1B\u6CA1\u6709\u4F9D\u636E\u65F6\u4FDD\u7559\u539F\u503C\u3002
3. \u5982\u679C\u67D0\u5B57\u6BB5\u9700\u8981\u6E05\u7A7A\uFF0C\u8BF7\u663E\u5F0F\u8F93\u51FA\u7A7A\u5B57\u7B26\u4E32\u3001\u7A7A\u6570\u7EC4\u6216 null\u3002
4. \u4F18\u5148\u53C2\u8003\u5F53\u524D assistant \u56DE\u590D\uFF1A{{lastAiMessage}}
5. \u8868\u683C\u7EA7 AI \u64CD\u4F5C\u8BF4\u660E\uFF1A
{{tableGuidance}}
6. \u672C\u6B21\u8FD0\u884C scope\uFF1A
{{tableScopeGuidance}}
7. \u5F53\u524D\u8868\u683C\u57FA\u5E95 JSON\uFF1A
{{toolContentMacro}}`,Rb=`\u8F93\u51FA\u8981\u6C42\uFF1A
- \u53EA\u8FD4\u56DE JSON
- \u4E0D\u8981\u9644\u52A0\u89E3\u91CA\u3001\u6807\u9898\u6216 Markdown
- JSON \u7ED3\u6784\u5FC5\u987B\u662F\uFF1A
{
  "tables": []
}`,Ou=Object.freeze([{value:"text",label:"\u6587\u672C"},{value:"number",label:"\u6570\u5B57"},{value:"boolean",label:"\u5E03\u5C14"},{value:"date",label:"\u65E5\u671F"},{value:"json",label:"JSON"}]),or="text",Wn=Object.freeze(Ou.map(t=>Object.freeze({...t}))),_s="default_story_state",ki="\u9ED8\u8BA4\u5267\u60C5\u72B6\u6001\u6A21\u677F";To=Object.freeze([Es({id:"default_global_state",name:"\u5168\u5C40\u6570\u636E\u8868",note:"\u8BB0\u5F55\u5F53\u524D\u4E3B\u89D2\u6240\u5728\u5730\u70B9\u53CA\u65F6\u95F4\u76F8\u5173\u53C2\u6570\u3002\u6B64\u8868\u901A\u5E38\u6709\u4E14\u4EC5\u6709\u4E00\u884C\u3002",aiInstructions:{init:"\u63D2\u5165\u4E00\u6761\u5173\u4E8E\u5F53\u524D\u4E16\u754C\u72B6\u6001\u7684\u8BB0\u5F55\u3002",create:"\u901A\u5E38\u7981\u6B62\u65B0\u589E\uFF1B\u9664\u975E\u8868\u4E3A\u7A7A\u4E14\u9700\u8981\u521D\u59CB\u5316\u3002",update:"\u5F53\u5730\u70B9\u6216\u65F6\u95F4\u53D1\u751F\u53D8\u5316\u65F6\u66F4\u65B0\u6B64\u8868\uFF1B\u6BCF\u8F6E\u5E94\u6839\u636E\u5267\u60C5\u66F4\u65B0\u65F6\u95F4\u76F8\u5173\u5B57\u6BB5\u3002",delete:"\u7981\u6B62\u5220\u9664\u3002"},columns:[G("location","\u4E3B\u89D2\u5F53\u524D\u6240\u5728\u5730\u70B9","\u4E3B\u89D2\u5F53\u524D\u6240\u5728\u7684\u5177\u4F53\u573A\u666F\u540D\u79F0\u3002"),G("current_time","\u5F53\u524D\u65F6\u95F4","\u6E38\u620F\u4E16\u754C\u7684\u5F53\u524D\u65F6\u95F4\uFF1B\u5982\u5267\u60C5\u6CA1\u6709\u660E\u786E\u65F6\u95F4\uFF0C\u53EF\u6839\u636E\u4E16\u754C\u89C2\u7ED9\u51FA\u5408\u7406\u65F6\u95F4\u3002"),G("previous_scene_time","\u4E0A\u8F6E\u573A\u666F\u65F6\u95F4","\u4E0A\u4E00\u8F6E\u4EA4\u4E92\u7ED3\u675F\u65F6\u7684\u65F6\u95F4\u3002"),G("elapsed_time","\u7ECF\u8FC7\u7684\u65F6\u95F4","\u6839\u636E\u5F53\u524D\u4E0E\u4E0A\u8F6E\u65F6\u95F4\u8BA1\u7B97\u51FA\u7684\u6587\u672C\u63CF\u8FF0\u3002")]}),Es({id:"default_protagonist_profile",name:"\u4E3B\u89D2\u4FE1\u606F",note:"\u8BB0\u5F55\u4E3B\u89D2\u7684\u6838\u5FC3\u8EAB\u4EFD\u4FE1\u606F\u3002\u6B64\u8868\u901A\u5E38\u6709\u4E14\u4EC5\u6709\u4E00\u884C\u3002",aiInstructions:{init:"\u521D\u59CB\u5316\u65F6\u63D2\u5165\u4E3B\u89D2\u7684\u552F\u4E00\u6761\u76EE\u3002",create:"\u7981\u6B62\u65B0\u589E\u591A\u540D\u4E3B\u89D2\uFF1B\u9664\u975E\u8868\u4E3A\u7A7A\u4E14\u9700\u8981\u521D\u59CB\u5316\u3002",update:"\u5F53\u4E3B\u89D2\u8EAB\u4EFD\u3001\u5916\u8C8C\u3001\u7ECF\u5386\u6216\u6027\u683C\u6709\u660E\u786E\u53D8\u5316\u65F6\u66F4\u65B0\u3002",delete:"\u7981\u6B62\u5220\u9664\u3002"},columns:[G("name","\u4EBA\u7269\u540D\u79F0","\u4E3B\u89D2\u7684\u540D\u5B57\u3002"),G("gender_age","\u6027\u522B/\u5E74\u9F84","\u4E3B\u89D2\u7684\u6027\u522B\u4E0E\u5E74\u9F84\u3002"),G("appearance","\u5916\u8C8C\u7279\u5F81","\u5BF9\u4E3B\u89D2\u5916\u8C8C\u7684\u5BA2\u89C2\u6587\u5B57\u63CF\u5199\u3002"),G("identity","\u804C\u4E1A/\u8EAB\u4EFD","\u4E3B\u89D2\u5728\u793E\u4F1A\u6216\u5267\u60C5\u4E2D\u7684\u4E3B\u8981\u8EAB\u4EFD\u3002"),G("history","\u8FC7\u5F80\u7ECF\u5386","\u4E3B\u89D2\u80CC\u666F\u6545\u4E8B\u4E0E\u5173\u952E\u7ECF\u5386\uFF0C\u968F\u5267\u60C5\u589E\u91CF\u66F4\u65B0\u3002"),G("personality","\u6027\u683C\u7279\u70B9","\u5BF9\u4E3B\u89D2\u6838\u5FC3\u6027\u683C\u7684\u6982\u62EC\u3002")]}),Es({id:"default_important_characters",name:"\u91CD\u8981\u89D2\u8272\u8868",note:"\u8BB0\u5F55\u5173\u952E NPC \u6216\u91CD\u8981\u89D2\u8272\u7684\u4FE1\u606F\u548C\u52A8\u6001\u72B6\u6001\u3002",aiInstructions:{init:"\u521D\u59CB\u5316\u65F6\u4E3A\u5F53\u524D\u5728\u573A\u7684\u91CD\u8981\u4EBA\u7269\u5206\u522B\u63D2\u5165\u6761\u76EE\u3002",create:"\u5267\u60C5\u4E2D\u6709\u672A\u8BB0\u5F55\u7684\u91CD\u8981\u4EBA\u7269\u767B\u573A\u65F6\u65B0\u589E\u3002",update:"\u5DF2\u6709\u89D2\u8272\u7684\u72B6\u6001\u3001\u5173\u7CFB\u3001\u60F3\u6CD5\u3001\u7ECF\u5386\u6216\u6301\u6709\u7269\u53D8\u5316\u65F6\u66F4\u65B0\u3002",delete:"\u901A\u5E38\u7981\u6B62\u5220\u9664\uFF1B\u89D2\u8272\u79BB\u573A\u65F6\u4F18\u5148\u66F4\u65B0\u201C\u662F\u5426\u79BB\u573A\u201D\u3002"},columns:[G("name","\u59D3\u540D","\u89D2\u8272\u59D3\u540D\u3002"),G("gender_age","\u6027\u522B/\u5E74\u9F84","\u89D2\u8272\u7684\u6027\u522B\u4E0E\u5E74\u9F84\u3002"),G("summary","\u4E00\u53E5\u8BDD\u4ECB\u7ECD","\u7528\u7B80\u77ED\u6587\u5B57\u6982\u62EC\u89D2\u8272\u8EAB\u4EFD\u80CC\u666F\u3002"),G("appearance","\u5916\u8C8C\u7279\u5F81","\u5BF9\u89D2\u8272\u5916\u8C8C\u548C\u5F53\u524D\u8863\u7740\u7684\u5BA2\u89C2\u63CF\u5199\u3002"),G("important_items","\u6301\u6709\u7684\u91CD\u8981\u7269\u54C1","\u89D2\u8272\u62E5\u6709\u7684\u5173\u952E\u7269\u54C1\uFF0C\u7528\u5206\u53F7\u5206\u9694\u3002"),G("offstage","\u662F\u5426\u79BB\u573A","\u5224\u65AD\u8BE5\u89D2\u8272\u5F53\u524D\u662F\u5426\u5DF2\u7ECF\u79BB\u573A\uFF0C\u586B\u5199\u201C\u662F\u201D\u6216\u201C\u5426\u201D\u3002","boolean"),G("history","\u8FC7\u5F80\u7ECF\u5386","\u89D2\u8272\u80CC\u666F\u4E0E\u5173\u952E\u4E8B\u4EF6\uFF0C\u968F\u5267\u60C5\u589E\u91CF\u66F4\u65B0\u3002")]}),Es({id:"default_protagonist_skills",name:"\u4E3B\u89D2\u6280\u80FD\u8868",note:"\u8BB0\u5F55\u4E3B\u89D2\u83B7\u5F97\u7684\u6280\u80FD\u3001\u80FD\u529B\u6216\u9636\u6BB5\u6027\u6210\u957F\u3002",aiInstructions:{init:"\u521D\u59CB\u5316\u65F6\u6839\u636E\u8BBE\u5B9A\u6DFB\u52A0\u4E3B\u89D2\u7684\u521D\u59CB\u6280\u80FD\u3002",create:"\u4E3B\u89D2\u83B7\u5F97\u65B0\u6280\u80FD\u6216\u65B0\u80FD\u529B\u65F6\u65B0\u589E\u3002",update:"\u5DF2\u6709\u6280\u80FD\u5347\u7EA7\u3001\u964D\u7EA7\u6216\u6548\u679C\u53D8\u5316\u65F6\u66F4\u65B0\u3002",delete:"\u6280\u80FD\u88AB\u5267\u60C5\u5265\u593A\u3001\u66FF\u6362\u6216\u5931\u6548\u65F6\u5220\u9664\u3002"},columns:[G("skill_name","\u6280\u80FD\u540D\u79F0","\u6280\u80FD\u6216\u80FD\u529B\u540D\u79F0\u3002"),G("skill_type","\u6280\u80FD\u7C7B\u578B","\u6280\u80FD\u7C7B\u522B\uFF0C\u4F8B\u5982\u4E3B\u52A8\u3001\u88AB\u52A8\u3001\u5929\u8D4B\u7B49\u3002"),G("level","\u7B49\u7EA7/\u9636\u6BB5","\u6280\u80FD\u5F53\u524D\u7B49\u7EA7\u3001\u719F\u7EC3\u5EA6\u6216\u9636\u6BB5\u3002"),G("effect","\u6548\u679C\u63CF\u8FF0","\u6280\u80FD\u5728\u5F53\u524D\u9636\u6BB5\u4E0B\u7684\u5177\u4F53\u6548\u679C\u3002")]}),Es({id:"default_inventory",name:"\u80CC\u5305\u7269\u54C1\u8868",note:"\u8BB0\u5F55\u4E3B\u89D2\u62E5\u6709\u7684\u7269\u54C1\u3001\u88C5\u5907\u6216\u6D88\u8017\u54C1\u3002",aiInstructions:{init:"\u521D\u59CB\u5316\u65F6\u6839\u636E\u5267\u60C5\u4E0E\u8BBE\u5B9A\u6DFB\u52A0\u4E3B\u89D2\u7684\u521D\u59CB\u643A\u5E26\u7269\u54C1\u3002",create:"\u4E3B\u89D2\u83B7\u5F97\u80CC\u5305\u4E2D\u6CA1\u6709\u7684\u5168\u65B0\u7269\u54C1\u65F6\u65B0\u589E\u3002",update:"\u5DF2\u6709\u7269\u54C1\u6570\u91CF\u3001\u72B6\u6001\u6216\u63CF\u8FF0\u53D8\u5316\u65F6\u66F4\u65B0\u3002",delete:"\u7269\u54C1\u88AB\u5B8C\u5168\u6D88\u8017\u3001\u4E22\u5F03\u6216\u6467\u6BC1\u65F6\u5220\u9664\u3002"},columns:[G("item_name","\u7269\u54C1\u540D\u79F0","\u7269\u54C1\u540D\u79F0\u3002"),G("quantity","\u6570\u91CF","\u62E5\u6709\u6570\u91CF\u3002","number"),G("description","\u63CF\u8FF0/\u6548\u679C","\u7269\u54C1\u529F\u80FD\u3001\u6548\u679C\u6216\u80CC\u666F\u63CF\u8FF0\u3002"),G("category","\u7C7B\u522B","\u7269\u54C1\u7C7B\u522B\uFF0C\u4F8B\u5982\u6B66\u5668\u3001\u6D88\u8017\u54C1\u3001\u6742\u7269\u7B49\u3002")]}),Es({id:"default_quests_events",name:"\u4EFB\u52A1\u4E0E\u4E8B\u4EF6\u8868",note:"\u8BB0\u5F55\u5F53\u524D\u6B63\u5728\u8FDB\u884C\u6216\u9700\u8981\u6301\u7EED\u8FFD\u8E2A\u7684\u4EFB\u52A1\u4E0E\u4E8B\u4EF6\u3002",aiInstructions:{init:"\u521D\u59CB\u5316\u65F6\u6839\u636E\u5267\u60C5\u4E0E\u8BBE\u5B9A\u6DFB\u52A0\u4E3B\u8981\u4EFB\u52A1\u6216\u5173\u952E\u4E8B\u4EF6\u3002",create:"\u4E3B\u89D2\u63A5\u53D6\u3001\u89E6\u53D1\u6216\u53D1\u73B0\u65B0\u7684\u4EFB\u52A1\u4E0E\u4E8B\u4EF6\u65F6\u65B0\u589E\u3002",update:"\u4EFB\u52A1\u53D6\u5F97\u5173\u952E\u8FDB\u5C55\u3001\u76EE\u6807\u53D8\u5316\u6216\u65F6\u9650\u53D8\u5316\u65F6\u66F4\u65B0\u3002",delete:"\u4EFB\u52A1\u5B8C\u6210\u3001\u5931\u8D25\u3001\u8FC7\u671F\u6216\u4E0D\u518D\u9700\u8981\u8FFD\u8E2A\u65F6\u5220\u9664\u3002"},columns:[G("quest_name","\u4EFB\u52A1\u540D\u79F0","\u4EFB\u52A1\u6216\u4E8B\u4EF6\u6807\u9898\u3002"),G("quest_type","\u4EFB\u52A1\u7C7B\u578B","\u4E3B\u7EBF\u3001\u652F\u7EBF\u3001\u4E2A\u4EBA\u3001\u7A81\u53D1\u4E8B\u4EF6\u7B49\u3002"),G("issuer","\u53D1\u5E03\u8005","\u53D1\u5E03\u4EFB\u52A1\u6216\u89E6\u53D1\u4E8B\u4EF6\u7684\u89D2\u8272\u3001\u5730\u70B9\u6216\u52BF\u529B\u3002"),G("detail","\u8BE6\u7EC6\u63CF\u8FF0","\u4EFB\u52A1\u76EE\u6807\u3001\u4E8B\u4EF6\u80CC\u666F\u548C\u8981\u6C42\u3002"),G("progress","\u5F53\u524D\u8FDB\u5EA6","\u5BF9\u5B8C\u6210\u5EA6\u6216\u5F53\u524D\u9636\u6BB5\u7684\u7B80\u8981\u63CF\u8FF0\u3002"),G("deadline","\u4EFB\u52A1\u65F6\u9650","\u5B8C\u6210\u4EFB\u52A1\u7684\u5269\u4F59\u65F6\u95F4\u6216\u622A\u6B62\u6761\u4EF6\u3002"),G("reward","\u5956\u52B1","\u5B8C\u6210\u540E\u53EF\u80FD\u83B7\u5F97\u7684\u5956\u52B1\u3002"),G("penalty","\u60E9\u7F5A","\u5931\u8D25\u6216\u9519\u8FC7\u540E\u7684\u540E\u679C\u3002")]}),Es({id:"default_memo_log",name:"\u7EAA\u8981\u8868",note:"\u8BB0\u5F55\u6BCF\u8F6E\u6216\u5173\u952E\u7247\u6BB5\u53D1\u751F\u7684\u4E8B\u4EF6\u7EAA\u8981\uFF0C\u7528\u4E8E\u540E\u7EED\u56DE\u987E\u3002",aiInstructions:{init:"\u6545\u4E8B\u521D\u59CB\u5316\u65F6\u63D2\u5165\u4E00\u6761\u8BB0\u5F55\uFF0C\u7528\u4E8E\u8BB0\u5F55\u521D\u59CB\u5316\u5267\u60C5\u3002",create:"\u6BCF\u8F6E\u4EA4\u4E92\u7ED3\u675F\u540E\uFF0C\u82E5\u53D1\u751F\u4E86\u503C\u5F97\u8BB0\u5F55\u7684\u65B0\u4E8B\u4EF6\uFF0C\u5219\u63D2\u5165\u4E00\u6761\u65B0\u7EAA\u8981\u3002",update:"\u901A\u5E38\u7981\u6B62\u66F4\u65B0\u5386\u53F2\u7EAA\u8981\uFF1B\u53EA\u6709\u660E\u663E\u4E8B\u5B9E\u9519\u8BEF\u65F6\u624D\u4FEE\u6B63\u3002",delete:"\u7981\u6B62\u5220\u9664\u3002"},columns:[G("time_span","\u65F6\u95F4\u8DE8\u5EA6","\u672C\u8F6E\u4E8B\u4EF6\u53D1\u751F\u7684\u65F6\u95F4\u8303\u56F4\u3002"),G("location","\u5730\u70B9","\u672C\u8F6E\u4E8B\u4EF6\u53D1\u751F\u5730\u70B9\u3002"),G("memo","\u7EAA\u8981","\u4EE5\u7B2C\u4E09\u65B9\u89C6\u89D2\u5BA2\u89C2\u8BB0\u5F55\u672C\u8F6E\u53D1\u751F\u7684\u4E8B\u5B9E\u3002"),G("summary","\u6982\u89C8","\u4E00\u53E5\u8BDD\u6982\u62EC\u7EAA\u8981\u5185\u5BB9\u3002"),G("index_code","\u7F16\u7801\u7D22\u5F15","\u7528\u4E8E\u540E\u7EED\u68C0\u7D22\u7684\u7B80\u77ED\u7F16\u7801\u3002")]}),Es({id:"default_options",name:"\u9009\u9879\u8868",note:"\u8BB0\u5F55\u6BCF\u8F6E\u4E3B\u89D2\u53EF\u4EE5\u91C7\u53D6\u7684\u884C\u52A8\u9009\u9879\u3002\u6B64\u8868\u901A\u5E38\u6709\u4E14\u4EC5\u6709\u4E00\u884C\u3002\u6240\u6709\u9009\u9879\u4F7F\u7528\u7B2C\u4E09\u4EBA\u79F0\uFF0C\u4E0D\u4EE3\u66FF\u4E3B\u89D2\u53D1\u8A00\uFF0C\u5E76\u7D27\u6263\u5F53\u524D\u5267\u60C5\u3002",aiInstructions:{init:"\u521D\u59CB\u5316\u65F6\u751F\u6210\u56DB\u4E2A\u521D\u59CB\u884C\u52A8\u9009\u9879\u3002",create:"\u901A\u5E38\u7981\u6B62\u65B0\u589E\uFF1B\u9664\u975E\u8868\u4E3A\u7A7A\u4E14\u9700\u8981\u521D\u59CB\u5316\u3002",update:"\u6BCF\u8F6E\u4EA4\u4E92\u540E\u6839\u636E\u5F53\u524D\u5267\u60C5\u751F\u6210\u65B0\u7684\u56DB\u4E2A\u9009\u9879\u5E76\u8986\u76D6\u539F\u6709\u5185\u5BB9\u3002",delete:"\u7981\u6B62\u5220\u9664\u3002"},columns:[G("option_1","\u9009\u9879\u4E00","\u504F\u5411\u7B56\u7565\u3001\u63A8\u8FDB\u5267\u60C5\u6216\u89E3\u51B3\u5F53\u524D\u95EE\u9898\u7684\u884C\u52A8\u3002"),G("option_2","\u9009\u9879\u4E8C","\u504F\u5411\u8C28\u614E\u89C2\u5BDF\u3001\u6536\u96C6\u4FE1\u606F\u6216\u4FDD\u6301\u4E2D\u7ACB\u7684\u884C\u52A8\u3002"),G("option_3","\u9009\u9879\u4E09","\u504F\u5411\u5E2E\u52A9\u3001\u4FDD\u62A4\u3001\u6C9F\u901A\u6216\u5B89\u629A\u7684\u884C\u52A8\u3002"),G("option_4","\u9009\u9879\u56DB","\u504F\u5411\u5192\u9669\u3001\u8BD5\u63A2\u3001\u6539\u53D8\u5C40\u52BF\u6216\u5173\u7CFB\u4E92\u52A8\u7684\u884C\u52A8\u3002")]})])});function Bi(t,e={},s={}){let r=Number.isInteger(s.size)?s.size:0,o=Number.isInteger(s.currentIndex)?s.currentIndex:-1,n=o<=0,a=o<0||o>=r-1,i=Object.entries(e).filter(([,l])=>Number.isInteger(l)).map(([l,c])=>`data-${l}="${c}"`).join(" ");return`
    <div class="yyt-table-editor-move-controls">
      <button type="button" class="yyt-btn yyt-btn-small yyt-btn-secondary" data-table-editor-action="move-${t}-up" ${i} ${n?"disabled":""}>
        <i class="fa-solid fa-arrow-up"></i>
      </button>
      <button type="button" class="yyt-btn yyt-btn-small yyt-btn-secondary" data-table-editor-action="move-${t}-down" ${i} ${a?"disabled":""}>
        <i class="fa-solid fa-arrow-down"></i>
      </button>
    </div>
  `}function Gb(t=or){return Wn.map(e=>`
    <option value="${v(e.value)}" ${e.value===t?"selected":""}>${v(e.label)}</option>
  `).join("")}function Vb(t=0,e=0){return!Number.isInteger(t)||t<=0||!Number.isInteger(e)||e<0?0:Math.min(e,t-1)}function Vu(t={}){let e=t&&typeof t=="object"?t:{};return Uu(Array.isArray(e.tables)?e.tables:[])}function Jb(t,e){if(t.type==="json"){let s=e===void 0?t.emptyValue:e;if(typeof s=="string")return s;try{return JSON.stringify(s??null,null,2)}catch{return String(s??"")}}return String(e??"")}function Xb(t={},e=""){let s=String(t.name||"").trim(),r=`yyt-table-field-${s}`,o=`${r}-value`,n=`${r}-dropdown`,a=Vo(t.options||[]);return Jo({selectedValue:e,options:a,placeholder:a[0]?.label||"\u8BF7\u9009\u62E9",rootAttributes:{"data-table-custom-select":"true"},nativeAttributes:{class:"yyt-table-select-native",id:o,"data-table-field":s,"data-field-type":"select"},triggerAttributes:{id:r,"data-table-select-trigger":"true","aria-controls":n},dropdownAttributes:{id:n,"data-table-select-dropdown":"true"},optionAttributes:{"data-table-select-option":"true"}})}function Qb(t={},e={},s=0){let r=t&&typeof t=="object"?t.cells:null;if(Array.isArray(r))return String(r[s]??"");if(r&&typeof r=="object"){if(r[e.key]!==void 0)return String(r[e.key]??"");if(r[e.title]!==void 0)return String(r[e.title]??"")}return""}function Zb(t={},e={},s=0,r=0){let o=Array.isArray(t.columns)?t.columns:[],n=Bi("row",{"table-index":s,"row-index":r},{currentIndex:r,size:o.length>=0&&Array.isArray(t.rows)?t.rows.length:0});return`
    <tr data-table-editor-row="${r}">
      <td>
        <input type="text" class="yyt-input" data-table-editor-row-name value="${v(String(e?.name||""))}" placeholder="\u53EF\u7559\u7A7A\uFF0C\u9ED8\u8BA4\u4F1A\u81EA\u52A8\u547D\u540D">
      </td>
      ${o.map((a,i)=>{let l=String(a?.key||"").trim();return`
        <td>
          <textarea class="yyt-textarea yyt-code-textarea-small"
                    data-table-editor-cell
                    data-column-index="${i}"
                    data-column-key="${v(l)}"
                    rows="2"
                    placeholder="${v(a.title||a.key||`\u5217${i+1}`)}">${v(Qb(e,a,i))}</textarea>
        </td>
      `}).join("")}
      <td>
        <div class="yyt-table-editor-row-actions">
          ${n}
          <button type="button" class="yyt-btn yyt-btn-small yyt-btn-danger" data-table-editor-action="delete-row" data-table-index="${s}" data-row-index="${r}">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </td>
    </tr>
  `}function Gu(t={},e=0,s={}){let r=Array.isArray(t.columns)?t.columns:[],o=Array.isArray(t.rows)?t.rows:[],n=String(t?.name||"").trim(),a=s.showDeleteTable!==!1,i=Bi("table",{"table-index":e},{currentIndex:e,size:Number.isInteger(s.totalTables)?s.totalTables:0}),l=a?`
        <div class="yyt-table-editor-card-actions">
          ${i}
          <button type="button" class="yyt-btn yyt-btn-small yyt-btn-danger" data-table-editor-action="delete-table" data-table-index="${e}">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      `:"";return`
    <div class="yyt-table-editor-card" data-table-editor-table="${e}">
      <div class="yyt-table-editor-card-head">
        ${l}
      </div>

      <div class="yyt-table-editor-meta">
        <div class="yyt-table-editor-input-group">
          <input type="text" class="yyt-input" data-table-editor-table-name value="${v(String(t?.name||""))}" placeholder="\u8868\u683C\u540D\u79F0">
        </div>
        <div class="yyt-table-editor-input-group">
          <textarea class="yyt-textarea yyt-code-textarea-small" data-table-editor-table-note rows="2" placeholder="\u5907\u6CE8\uFF08\u53EF\u7559\u7A7A\uFF09">${v(String(t?.note||""))}</textarea>
        </div>
      </div>

      <div class="yyt-table-editor-section">
        <div class="yyt-table-editor-section-head">
          <button type="button" class="yyt-btn yyt-btn-small yyt-btn-secondary" data-table-editor-action="add-column" data-table-index="${e}">
            <i class="fa-solid fa-plus"></i>
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
              ${r.length?r.map((c,d)=>`
                <tr class="yyt-table-editor-column" data-table-editor-column="${d}">
                  <td>
                    <input type="text" class="yyt-input" data-table-editor-column-title value="${v(String(c?.title||""))}" placeholder="\u4F8B\u5982\uFF1A\u5C5E\u6027">
                  </td>
                  <td>
                    <input type="text" class="yyt-input" data-table-editor-column-key value="${v(String(c?.key||""))}" placeholder="\u53EF\u7559\u7A7A\u81EA\u52A8\u751F\u6210">
                  </td>
                  <td>
                    <select class="yyt-select" data-table-editor-column-type>
                      ${Gb(String(c?.type||or))}
                    </select>
                  </td>
                  <td>
                    <label class="yyt-table-editor-column-required yyt-table-editor-column-required-inline">
                      <input type="checkbox" data-table-editor-column-required ${c?.required===!0?"checked":""}>
                      <span>\u5FC5\u586B</span>
                    </label>
                  </td>
                  <td>
                    <input type="text" class="yyt-input" data-table-editor-column-description value="${v(String(c?.description||""))}" placeholder="\u53EF\u4E0D\u586B">
                  </td>
                  <td>
                    <div class="yyt-table-editor-column-actions">
                      ${Bi("column",{"table-index":e,"column-index":d},{currentIndex:d,size:r.length})}
                      <button type="button" class="yyt-btn yyt-btn-small yyt-btn-danger" data-table-editor-action="delete-column" data-table-index="${e}" data-column-index="${d}">
                        <i class="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              `).join(""):`
                <tr>
                  <td colspan="6">
                    <div class="yyt-table-editor-empty">\u5148\u52A0\u4E00\u5217\u3002</div>
                  </td>
                </tr>
              `}
            </tbody>
          </table>
        </div>
      </div>

      <div class="yyt-table-editor-section">
        <div class="yyt-table-editor-section-head">
          <button type="button" class="yyt-btn yyt-btn-small yyt-btn-secondary" data-table-editor-action="add-row" data-table-index="${e}">
            <i class="fa-solid fa-plus"></i>
          </button>
        </div>
        <div class="yyt-table-editor-grid-wrap">
          <table class="yyt-table-editor-grid">
            <thead>
              <tr>
                <th>\u8FD9\u4E00\u884C\u540D\u79F0</th>
                ${r.map((c,d)=>`<th>${v(c?.title||c?.key||`\u5217${d+1}`)}</th>`).join("")}
                <th></th>
              </tr>
            </thead>
            <tbody>
              ${o.length?o.map((c,d)=>Zb(t,c,e,d)).join(""):`
                <tr>
                  <td colspan="${Math.max(r.length+2,2)}">
                    <div class="yyt-table-editor-empty">\u5148\u52A0\u4E00\u884C\u3002</div>
                  </td>
                </tr>
              `}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `}function eh(t={},e={}){let s=Vu(t),r=Array.isArray(s?.tables)?s.tables:[],o=e.mode==="focused"?"focused":"full",n=Vb(r.length,Number.parseInt(e.currentTableIndex,10));if(o==="focused"){let a=r[n]||null;return`
      <div class="yyt-table-editor-shell">
        ${a?Gu(a,n,{totalTables:r.length}):`
          <div class="yyt-table-editor-empty">\u8FD8\u6CA1\u6709\u8868\uFF0C\u5148\u65B0\u5EFA\u4E00\u5F20\u3002</div>
        `}
      </div>
    `}return`
    <div class="yyt-table-editor-shell">
      <div class="yyt-table-editor-toolbar">
        <button type="button" class="yyt-btn yyt-btn-small yyt-btn-primary" data-table-editor-action="add-table">
          <i class="fa-solid fa-plus"></i> \u65B0\u589E\u8868\u683C
        </button>
      </div>
      <div class="yyt-table-editor-stack">
        ${r.length?r.map((a,i)=>Gu(a,i,{totalTables:r.length})).join(""):`
          <div class="yyt-table-editor-empty">\u8FD8\u6CA1\u6709\u8868\uFF0C\u5148\u65B0\u5EFA\u4E00\u5F20\u3002</div>
        `}
      </div>
    </div>
  `}function th(t={},e={}){let s=String(t.name||"").trim(),r=v(t.label||s),o=t.description?`<div class="yyt-table-form-field-desc">${v(t.description)}</div>`:"",n=Vu({tables:Array.isArray(e[s])?e[s]:[]});return`
    <div class="yyt-table-form-field" data-table-form-item="${v(s)}">
      <label>${r}</label>
      ${sh(t,n,{description:o})}
    </div>
  `}function sh(t={},e={},s={}){let r=String(t.name||"").trim(),o=typeof s.description=="string"?s.description:t.description?`<div class="yyt-table-form-field-desc">${v(t.description)}</div>`:"",n=s.mode==="focused"?"focused":"full",a=Number.parseInt(s.currentTableIndex,10);return`
    <div class="yyt-table-editor" data-table-field="${v(r)}" data-field-type="tableDefinitions" data-table-definition-root data-table-editor-mode="${n}" data-current-table-index="${Number.isInteger(a)?a:0}">
      ${eh(e,{mode:n,currentTableIndex:a})}
    </div>
    ${o}
  `}function Ju(t=[],e={},s={}){let r=Array.isArray(t)?t:[],o=Array.isArray(s.includeFieldNames)?new Set(s.includeFieldNames.map(i=>String(i||"").trim()).filter(Boolean)):null,n=Array.isArray(s.excludeFieldNames)?new Set(s.excludeFieldNames.map(i=>String(i||"").trim()).filter(Boolean)):null,a=r.filter(i=>{let l=String(i?.name||"").trim();return!l||o&&!o.has(l)||n&&n.has(l)?!1:i.type!=="tableDefinitions"}).map(i=>rh(i,e)).join("");return a?`
    <div class="yyt-table-form-grid">
      ${a}
    </div>
  `:""}function rh(t={},e={}){let s=String(t.name||"").trim();if(!s)return"";if(t.type==="tableDefinitions")return th(t,e);let r=e[s],o=v(t.label||s),n=t.description?`<div class="yyt-table-form-field-desc">${v(t.description)}</div>`:"",a=Number.isFinite(t.rows)?t.rows:6;return t.type==="checkbox"?`
      <div class="yyt-table-form-field" data-table-form-item="${v(s)}">
        <label class="yyt-table-form-inline-checkbox">
          <input type="checkbox" data-table-field="${v(s)}" data-field-type="checkbox" ${r===!0?"checked":""}>
          <span>${o}</span>
        </label>
        ${n}
      </div>
    `:t.type==="select"?`
      <div class="yyt-table-form-field" data-table-form-item="${v(s)}">
        <label for="yyt-table-field-${v(s)}">${o}</label>
        ${Xb(t,r)}
        ${n}
      </div>
    `:`
    <div class="yyt-table-form-field" data-table-form-item="${v(s)}">
      <label for="yyt-table-field-${v(s)}">${o}</label>
      <textarea class="yyt-textarea yyt-code-textarea ${t.type==="json"?"":"yyt-code-textarea-small"}"
                id="yyt-table-field-${v(s)}"
                data-table-field="${v(s)}"
                data-field-type="${v(t.type||"textarea")}"
                rows="${a}">${v(Jb(t,r))}</textarea>
      ${n}
    </div>
  `}var Xu=R(()=>{Ne();As()});function Qu(){return`
    .yyt-cell-popup-menu {
      position: fixed;
      z-index: 99999;
      min-width: 140px;
      padding: 4px;
      border-radius: var(--yyt-radius);
      border: 1px solid var(--yyt-border-strong);
      background: rgba(24,28,36,0.97);
      box-shadow: 0 12px 32px rgba(0,0,0,0.5);
      backdrop-filter: blur(12px);
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .yyt-cell-menu-item {
      padding: 6px 12px;
      border-radius: 6px;
      font-size: 12px;
      color: rgba(255,255,255,0.8);
      cursor: pointer;
      white-space: nowrap;
      transition: background 0.1s;
    }
    .yyt-cell-menu-item:hover {
      background: rgba(123,183,255,0.15);
      color: #fff;
    }
  `}var nr,Co,Zu=R(()=>{Ne();nr=null,Co=class{constructor(){nr&&nr.destroy(),nr=this,this.$menu=null,this._onClickOutside=null}show(e,s,r={}){let o=U(),n=Lt();if(!o||!n)return;this.destroy();let a=this._buildItems(r);if(a.length===0)return;let i=a.map(c=>`
      <div class="yyt-cell-menu-item" data-action="${c.action}">
        ${c.label}
      </div>
    `).join("");this.$menu=o(`
      <div class="yyt-cell-popup-menu">
        ${i}
      </div>
    `);let l=o(n.body);this.$menu.css({left:e+"px",top:s+"px"}),l.append(this.$menu),this.$menu.on("click.yytCellMenu",".yyt-cell-menu-item",c=>{let d=o(c.currentTarget).attr("data-action");this.destroy(),r.onAction&&r.onAction(d)}),this._onClickOutside=c=>{this.$menu&&!this.$menu[0].contains(c.target)&&this.destroy()},setTimeout(()=>{this._onClickOutside&&o(n).on("mousedown.yytCellMenu",this._onClickOutside)},0)}_buildItems(e){if(Array.isArray(e.items)&&e.items.length>0)return e.items;let s=[],r=Number.isFinite(e.rowIndex)?e.rowIndex:-1,o=e.colKey||"";return o&&(s.push({label:"\u7F16\u8F91\u5355\u5143\u683C",action:`edit:${o}`}),s.push({label:"\u6E05\u7A7A\u5355\u5143\u683C",action:`clear:${o}`})),r>=0&&(s.push({label:"\u4E0A\u65B9\u63D2\u5165\u884C",action:"insert-row-above"}),s.push({label:"\u4E0B\u65B9\u63D2\u5165\u884C",action:"insert-row-below"}),s.push({label:"\u5220\u9664\u6B64\u884C",action:"delete-row"})),s}destroy(){let e=U(),s=Lt();this.$menu&&(this.$menu.off(".yytCellMenu"),this.$menu.remove(),this.$menu=null),this._onClickOutside&&s&&(e(s).off("mousedown.yytCellMenu",this._onClickOutside),this._onClickOutside=null),nr===this&&(nr=null)}static destroy(){nr&&nr.destroy()}}});function oh(t={},e=-1){return[t?.sourceId,t?.messageId,t?.message_id,t?.id,t?.mid,t?.mesid,t?.mes_id,t?.chat_index,t?.index,e].map(s=>me(s))}function nh(t=[],e=""){let s=me(e);if(!s||!Array.isArray(t))return-1;for(let r=t.length-1;r>=0;r-=1){let o=t[r];if(oh(o,r).includes(s))return r}return-1}function ko(t={},e={}){let s=me(t?.sourceMessageId||t?.confirmedAssistantMessageId||t?.messageId);if(!s)return null;let r=Si({resolvedAt:Date.now(),runSource:e.runSource||t?.runSource||Fe.MANUAL,traceId:t?.traceId||"",chatId:t?.chatId||"",sourceMessageId:s,sourceSwipeId:t?.sourceSwipeId||t?.effectiveSwipeId||"",effectiveSwipeId:t?.effectiveSwipeId||t?.sourceSwipeId||"swipe:current",slotBindingKey:t?.slotBindingKey||"",slotRevisionKey:t?.slotRevisionKey||"",slotTransactionId:t?.slotTransactionId||"",assistantContentFingerprint:t?.assistantContentFingerprint||"",assistantBaseFingerprint:t?.assistantBaseFingerprint||"",assistantText:t?.lastAiMessage||"",assistantBaseText:t?.assistantBaseText||"",targetMessageIndex:nh(t?.chatMessages||t?.chatHistory||[],s)});return!r.slotBindingKey||!r.slotRevisionKey?null:r}async function zi({runSource:t=Fe.MANUAL}={}){let e=await zs({runSource:t});return ko(e,{runSource:t})}async function ah({messageId:t,swipeId:e="",runSource:s=Fe.AUTO}={}){let r=await Us({messageId:t,swipeId:e,runSource:s});return ko(r,{runSource:s})}async function ey(t=null,e={}){let s=t||null;if(typeof e.resolveTarget=="function")return await e.resolveTarget(s);let r=me(e.runSource||s?.runSource)||Fe.MANUAL,o=me(e.messageId||s?.sourceMessageId),n=me(e.swipeId||s?.sourceSwipeId||s?.effectiveSwipeId);return e.useMessageTarget===!0||r===Fe.AUTO?o?ah({messageId:o,swipeId:n,runSource:r}):null:zi({runSource:r})}function ty(t,e){let s=t||null,r=e||null;return!s||!r?{valid:!1,reason:"missing_target_snapshot"}:me(s.sourceMessageId)!==me(r.sourceMessageId)?{valid:!1,reason:"source_message_changed"}:me(s.sourceSwipeId||s.effectiveSwipeId)!==me(r.sourceSwipeId||r.effectiveSwipeId)?{valid:!1,reason:"source_swipe_changed"}:me(s.slotRevisionKey)!==me(r.slotRevisionKey)?{valid:!1,reason:"slot_revision_changed"}:{valid:!0,reason:"ok"}}var Yn=R(()=>{js();pt()});function ls(t,e=""){return t==null?e:String(t).trim()||e}function ih(t){if(!t||t?.is_user===!0||t?.is_system===!0)return!1;let e=String(t?.role||"").trim().toLowerCase();return e==="assistant"||e==="ai"||!e}function Io({loadMode:t=rr.EMPTY,mergeBaseOnly:e=!1,state:s=null,sourceKind:r=yt.EMPTY,resolvedFromMessageId:o="",resolvedFromRevisionKey:n=""}={}){let a=Kt(s)||null;return{loadMode:t,mergeBaseOnly:e,state:a,sourceKind:r,resolvedFromMessageId:ls(o,a?.sourceMessageId||""),resolvedFromRevisionKey:ls(n,a?.slotRevisionKey||"")}}function Ui(t,e={}){let s=Kt(t);return s?Kt({...s,meta:{...s.meta||{},...e||{}}}):null}function sy({runtime:t,targetSnapshot:e,currentMessageIndex:s=-1,templateTables:r=[]}={}){let o=Array.isArray(t?.chat)?t.chat:[],n=ls(e?.slotRevisionKey,""),a=ls(e?.slotBindingKey,"");if(s>=0&&s<o.length){let i=Kt(o[s]?.[sr]);if(i&&ls(i.slotRevisionKey,"")===n)return Io({loadMode:rr.EXACT,mergeBaseOnly:!1,state:Ui(i,{sourceKind:yt.EXACT,resolvedFromMessageId:i.sourceMessageId,resolvedFromRevisionKey:i.slotRevisionKey}),sourceKind:yt.EXACT,resolvedFromMessageId:i.sourceMessageId,resolvedFromRevisionKey:i.slotRevisionKey});if(i&&ls(i.slotBindingKey,"")===a){let l=Ui({...i,slotRevisionKey:n||i.slotRevisionKey,sourceSwipeId:ls(e?.sourceSwipeId||e?.effectiveSwipeId,i.sourceSwipeId),meta:{...i.meta||{},sourceKind:yt.BINDING,mergeBaseOnly:!0,fallbackFromBinding:!0,fallbackFromRevisionKey:ls(i.slotRevisionKey,""),requestedRevisionKey:n,resolvedFromMessageId:i.sourceMessageId,resolvedFromRevisionKey:i.slotRevisionKey}});return Io({loadMode:rr.BINDING_FALLBACK,mergeBaseOnly:!0,state:l,sourceKind:yt.BINDING,resolvedFromMessageId:i.sourceMessageId,resolvedFromRevisionKey:i.slotRevisionKey})}}if(s>0)for(let i=s-1;i>=0;i-=1){let l=o[i];if(!ih(l))continue;let c=Kt(l?.[sr]);if(!c||!Array.isArray(c.tables)||c.tables.length===0)continue;let d=Ui({...c,slotBindingKey:a||c.slotBindingKey,slotRevisionKey:n||c.slotRevisionKey,sourceSwipeId:ls(e?.sourceSwipeId||e?.effectiveSwipeId,c.sourceSwipeId),meta:{...c.meta||{},sourceKind:yt.HISTORY,mergeBaseOnly:!0,reconstructedFromHistory:!0,resolvedFromMessageId:c.sourceMessageId,resolvedFromRevisionKey:c.slotRevisionKey}});return Io({loadMode:rr.HISTORY,mergeBaseOnly:!0,state:d,sourceKind:yt.HISTORY,resolvedFromMessageId:c.sourceMessageId,resolvedFromRevisionKey:c.slotRevisionKey})}return Array.isArray(r)?Io({loadMode:rr.TEMPLATE,mergeBaseOnly:!1,state:wo(e,{tables:pe(r),meta:{fromTemplate:!0,sourceKind:yt.TEMPLATE,resolvedFromMessageId:"",resolvedFromRevisionKey:""}}),sourceKind:yt.TEMPLATE}):Io({loadMode:rr.EMPTY,mergeBaseOnly:!1,state:wo(e,{meta:{sourceKind:yt.EMPTY,resolvedFromMessageId:"",resolvedFromRevisionKey:""}}),sourceKind:yt.EMPTY})}var ry=R(()=>{pt()});function oy(t){return t==null?"":String(t).trim()}function lh(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window}function ch(){try{let t=lh(),e=t?.SillyTavern||null,s=e?.getContext?.()||null,r=Array.isArray(s?.chat)?s.chat:[],o=Array.isArray(e?.chat)?e.chat:[],n=r.length?r:o;return{topWindow:t,api:e,context:s,chat:n,contextChat:r,apiChat:o}}catch{return{topWindow:null,api:null,context:null,chat:[],contextChat:[],apiChat:[]}}}function dh(t){if(!t||t?.is_user===!0||t?.is_system===!0)return!1;let e=String(t?.role||"").trim().toLowerCase();return e==="assistant"||e==="ai"||!e}function uh(t=[],e=""){let s=oy(e);if(!Array.isArray(t)||!s)return-1;for(let r=t.length-1;r>=0;r-=1){let o=t[r];if(!dh(o))continue;if([o?.sourceId,o?.message_id,o?.messageId,o?.id,o?.mes_id,o?.mid,o?.mesid,o?.chat_index,o?.index,r].map(a=>oy(a)).includes(s))return r}return-1}function Gn(t){let e=ch(),s=uh(e.chat,t?.sourceMessageId);return s<0?{runtime:e,messageIndex:s,message:null}:{runtime:e,messageIndex:s,message:e.chat[s]||null}}function ny(t,e,s){let r=o=>{!Array.isArray(o)||e<0||e>=o.length||(o[e]={...o[e]||{},...s})};r(t?.contextChat),r(t?.apiChat)}async function ay(t){let e=t?.context||null,s=t?.api||null,r=e?.saveChatDebounced||s?.saveChatDebounced||null,o=e?.saveChat||s?.saveChat||null;typeof r=="function"&&r.call(e||s),typeof o=="function"&&await o.call(e||s)}function iy(t){let{message:e}=Gn(t);return Kt(e?.[sr])}function ly(t,e={}){let{runtime:s,messageIndex:r}=Gn(t);return sy({runtime:s,targetSnapshot:t,currentMessageIndex:r,templateTables:Array.isArray(e.templateTables)?e.templateTables:[]})}async function cy(t){let{runtime:e,messageIndex:s,message:r}=Gn(t);if(!r||s<0)return{success:!1,error:"target_message_not_found"};let o={...zn(r[Ir]),lastResolvedTarget:kr(t),updatedAt:Date.now()};return r[Ir]=o,ny(e,s,r),await ay(e),{success:!0,bindings:o}}async function dy(t,e,s={}){let r=s.skipFreshValidation===!0?t:await ey(t,s),o=s.skipFreshValidation===!0?{valid:!0,reason:"skipped"}:ty(t,r);if(!o.valid)return{success:!1,error:"target_changed_before_commit",validation:o};let n=r||t,{runtime:a,messageIndex:i,message:l}=Gn(n);if(!l||i<0)return{success:!1,error:"target_message_not_found",validation:o};let c=wo(n),d={...c.meta||{},...e.meta||{},...s.locks?{locks:s.locks}:{},...s.previousSnapshot?{previousSnapshot:s.previousSnapshot}:{}},u=Kt({...c,...e,meta:d,slotBindingKey:n.slotBindingKey,slotRevisionKey:n.slotRevisionKey,sourceMessageId:n.sourceMessageId,sourceSwipeId:n.sourceSwipeId||n.effectiveSwipeId,updatedAt:Date.now()}),p={...zn(l[Ir]),lastResolvedTarget:kr(n),lastCommittedTarget:kr(n),updatedAt:Date.now()};return l[sr]=u,l[Ir]=p,ny(a,i,l),await ay(a),{success:!0,state:u,bindings:p,validation:o,messageIndex:i,sourceMessageId:n.sourceMessageId,slotRevisionKey:n.slotRevisionKey}}function uy(t=null){let e=ut.getAssistantMessageSnapshot(t);return e?.message?{...e,tableState:Kt(e.message[sr]),tableBindings:zn(e.message[Ir])}:null}var Vn=R(()=>{Js();pt();ry();Yn()});function py(t){let e=new Set;if(!Array.isArray(t))return e;for(let s of t){let r=s?.order;Number.isFinite(r)&&e.add(Math.floor(r))}return e}function ji(t,e=5e4,s=1,r=99999){for(let o=e;o<=r;o++)if(!t.has(o))return t.add(o),o;for(let o=s;o<e;o++)if(!t.has(o))return t.add(o),o;return yy.warn("\u65E0\u53EF\u7528 order \u69FD\u4F4D"),t.add(e),e}function fy(t,e,s=5e4,r=1,o=99999){let n=o-e+1;for(let a=s;a<=n;a++){let i=!0;for(let l=0;l<e;l++)if(t.has(a+l)){i=!1;break}if(i){for(let l=0;l<e;l++)t.add(a+l);return a}}for(let a=r;a<s&&a<=n;a++){let i=!0;for(let l=0;l<e;l++)if(t.has(a+l)){i=!1;break}if(i){for(let l=0;l<e;l++)t.add(a+l);return a}}yy.warn(`\u65E0\u6CD5\u5206\u914D ${e} \u4E2A\u8FDE\u7EED order \u69FD\u4F4D`);for(let a=0;a<e;a++)t.add(s+a);return s}var yy,gy=R(()=>{J();yy=I.createScope("TableWBOrder")});function Fi(t,e="before_character_definition"){let s=String(t||"").trim().toLowerCase();return s==="at_depth_as_system"||s==="system"?"at_depth_as_system":s==="before_char"||s==="before_character"||s==="before_character_definition"||s==="0"?"before_character_definition":s==="after_char"||s==="after_character"||s==="after_character_definition"||s==="1"?"after_character_definition":e}function Mo(t,e){if(!e)return t;let s={...t,position:e.position};return e.position==="at_depth_as_system"?s.depth=e.depth:delete s.depth,s}var OS,LS,my=R(()=>{OS=Object.freeze(["at_depth_as_system","before_character_definition","after_character_definition"]);LS=Object.freeze({position:"before_character_definition",depth:2,order:5e4})});function ph(t,e=""){return t==null?e:String(t).trim()||e}function fh(){let t=globalThis.window||globalThis;return ph(t?.TavernHelper?.getCurrentChatId?.()||t?.Silvy?.getCurrentChatId?.()||t?.chat_metadata?.chat_id||t?.this_chid||t?.name1,"default_chat")}function gh(){try{if(typeof TavernHelper<"u"&&TavernHelper)return TavernHelper}catch{}return bs()?.TavernHelper||null}function mh(t){return String(t??"").replace(/\|/g,"\uFF5C").replace(/\n/g," ")}function by(t){let e=Array.isArray(t.columns)?t.columns:[],s=Array.isArray(t.rows)?t.rows:[];if(s.length===0)return"";let r=e.map(l=>l.key),o=e.map(l=>l.title||l.key),n=`| ${o.join(" | ")} |`,a=`| ${o.map(()=>"---").join(" | ")} |`,i=s.map(l=>{let c=l.cells||{};return`| ${r.map(d=>mh(c[d])).join(" | ")} |`});return`# ${t.name||"\u672A\u547D\u540D\u8868"}

${n}
${a}
${i.join(`
`)}`}function bh(t,e){return!Array.isArray(t)||t.length===0?e||[]:!Array.isArray(e)||e.length===0?t:e.map((s,r)=>{let o=t[r];return o?{...s,name:s.name||o.name||"",columns:Array.isArray(s.columns)&&s.columns.length>0?s.columns:Array.isArray(o.columns)?o.columns:[],rows:Array.isArray(o.rows)?o.rows:Array.isArray(s.rows)?s.rows:[],enabled:o.enabled!==void 0?o.enabled:s.enabled,exportConfig:s.exportConfig||o.exportConfig||{enabled:!1}}:s})}function Ki(t){return`${yh}[${t}]-`}function hh(t,e){let s=Ki(t),r=String(e||"").trim();return r?`${s}${r}`:`${s}\u586B\u8868\u6570\u636E`}function hy(t,e,s){return`${Ki(t)}Wrapper-${s}`}function xh(t,e){return t?t.content!==e.content||t.enabled!==e.enabled||t.type!==e.type||t.position!==e.position||t.prevent_recursion!==e.prevent_recursion||t.order!==e.order:!0}async function Ro(t,e,s,r,o,n){let a=s.find(i=>i.comment===r);return a&&a.uid?xh(a,o)?(await Promise.resolve(t.setLorebookEntries(e,[{uid:a.uid,...o}])),Po.info(`\u4E16\u754C\u4E66\u6761\u76EE\u5DF2\u66F4\u65B0\uFF1A${r}`),{action:"updated",comment:r}):(n.add(a.order||0),{action:"skipped",comment:r}):typeof t.createLorebookEntries=="function"?(await Promise.resolve(t.createLorebookEntries(e,[{comment:r,keys:[],...o}])),Po.info(`\u4E16\u754C\u4E66\u6761\u76EE\u5DF2\u521B\u5EFA\uFF1A${r}`),{action:"created",comment:r}):{action:"failed",comment:r,error:"createLorebookEntries \u4E0D\u53EF\u7528"}}async function xy(t,e){let s=e?.worldbookSync;if(!s?.enabled)return{skipped:!0,reason:"disabled"};let r=String(s.targetBook||"").trim();if(!r)return{skipped:!0,reason:"no_target_book"};let o=gh();if(!o)return{success:!1,error:"TavernHelper \u4E0D\u53EF\u7528"};if(typeof o.getLorebookEntries!="function")return{success:!1,error:"getLorebookEntries \u4E0D\u53EF\u7528"};if(typeof o.setLorebookEntries!="function"&&typeof o.createLorebookEntries!="function")return{success:!1,error:"\u4E16\u754C\u4E66\u5199\u5165 API \u4E0D\u53EF\u7528"};let n=fh(),a=Ki(n),i=Array.isArray(e?.tables)?e.tables:[],c=bh(t,i).filter(p=>p&&p.enabled!==!1&&Array.isArray(p.rows)&&p.rows.length>0);if(c.length===0)return{skipped:!0,reason:"empty_tables"};let d=e?.wrapperConfig||{},u=d.enabled!==!1;try{let p=await Promise.resolve(o.getLorebookEntries(r));Array.isArray(p)||(p=[]);let y=py(p),f=[],x=c.filter(S=>S.exportConfig?.enabled===!0),h=c.filter(S=>S.exportConfig?.enabled!==!0),C="";if(h.length>0&&(C=h.map(S=>by(S)).join(`

`)),u&&(C||x.length>0)){let S=d.wrapperTag||"\u6700\u65B0\u6570\u636E\u4E0E\u8BB0\u5F55",N=d.wrapperHint||"",F=d.wrapperPlacement||{},q=F.order||5e4,D=fy(y,3,q,1,99999),H=Fi(F.position,"before_character_definition"),le=Number.isFinite(F.depth)?F.depth:2,K=`<${S}>
${N}`;f.push(await Ro(o,r,p,hy(n,S,"Start"),Mo({content:K,enabled:!0,type:"constant",order:D,prevent_recursion:!0},{position:H,depth:le}),y)),C&&f.push(await Ro(o,r,p,`${a}\u5168\u5C40\u6570\u636E`,Mo({content:C,enabled:!0,type:"constant",order:D+1,prevent_recursion:!0},{position:H,depth:le}),y)),f.push(await Ro(o,r,p,hy(n,S,"End"),Mo({content:`</${S}>`,enabled:!0,type:"constant",order:D+2,prevent_recursion:!0},{position:H,depth:le}),y))}else if(C){let S=ji(y,5e4,1,99999);f.push(await Ro(o,r,p,`${a}\u5168\u5C40\u6570\u636E`,{content:C,enabled:!0,type:"constant",position:"before_character_definition",order:S,prevent_recursion:!0},y))}for(let S of x){let N=S.exportConfig||{},F=N.entryName||S.name||"\u672A\u547D\u540D\u8868",q=hh(n,F),D=by(S);if(!D)continue;let H=N.entryPlacement||{},le=Fi(H.position,"before_character_definition"),K=ji(y,H.order||5e4,1,99999),fe=N.entryType==="keyword"?"keyword":"constant";f.push(await Ro(o,r,p,q,Mo({content:D,enabled:!0,type:fe,order:K,prevent_recursion:N.preventRecursion!==!1},{position:le,depth:H.depth||2}),y))}let T=new Set(f.map(S=>S.comment).filter(Boolean)),_=p.filter(S=>!S.comment||!S.comment.startsWith(a)?!1:!T.has(S.comment));if(_.length>0){let S=_.map(N=>N.uid).filter(Boolean);S.length>0&&typeof o.deleteLorebookEntries=="function"&&(await Promise.resolve(o.deleteLorebookEntries(r,S)),Po.info(`\u5DF2\u6E05\u7406 ${S.length} \u4E2A\u65E7\u4E16\u754C\u4E66\u6761\u76EE [${n}]`))}let Y=f.filter(S=>S.action==="created").length,L=f.filter(S=>S.action==="updated").length;return Po.info(`\u4E16\u754C\u4E66\u540C\u6B65\u5B8C\u6210 [${n}]\uFF1A${Y} \u521B\u5EFA, ${L} \u66F4\u65B0, ${_.length} \u6E05\u7406`),{success:!0,results:f,stats:{created:Y,updated:L,cleaned:_.length},targetBook:r,chatId:n}}catch(p){return Po.warn("\u4E16\u754C\u4E66\u540C\u6B65\u5931\u8D25:",p),{success:!1,error:p?.message||"\u4E16\u754C\u4E66\u540C\u6B65\u5931\u8D25"}}}var Po,yh,vy=R(()=>{js();J();gy();my();Po=I.createScope("TableWorldbookSync"),yh="YYT-"});function Jn(t,e=""){return t==null?e:String(t).trim()||e}function wh(t={}){return{tables:Array.isArray(t?.tables)?pe(t.tables):[]}}function Sh(t={},e={}){let s=Jn(e.mirrorTag,"yyt-table-workbench"),r=wh(t);return[`<${s}>`,"[\u586B\u8868\u5DE5\u4F5C\u53F0]","```json",JSON.stringify(r,null,2),"```",`</${s}>`].join(`
`)}async function wy({targetSnapshot:t,nextTables:e,config:s,loadResult:r=null,diff:o=null,fillMode:n="",skipNotify:a=!1}={}){let i=_t(s),l=await dy(t,{tables:Array.isArray(e)?pe(e):[],meta:{lastLoadMode:Jn(r?.loadMode,""),lastFillMode:Jn(n),mergeBaseOnly:!1,updatedBy:Jn(t?.runSource,"MANUAL_TABLE")}});if(!l?.success)return{success:!1,error:l?.error||"table_state_commit_failed",commitResult:l,mirrorResult:null,warning:""};let c=null,d=null,u="";if(i.mirrorToMessage){let p=Sh(l.state,{mirrorTag:i.mirrorTag});c=await ut.injectDetailed(vh,p,{overwrite:!0,extractionSelectors:[i.mirrorTag],sourceMessageId:l.sourceMessageId,sourceSwipeId:t?.sourceSwipeId||t?.effectiveSwipeId,effectiveSwipeId:t?.effectiveSwipeId||t?.sourceSwipeId,slotBindingKey:t?.slotBindingKey,slotRevisionKey:t?.slotRevisionKey,slotTransactionId:t?.slotTransactionId,traceId:t?.traceId,skipNotify:a}),c?.success||(u=c?.error||"\u6B63\u6587\u955C\u50CF\u5199\u56DE\u5931\u8D25")}return i.worldbookSync?.enabled&&(d=await xy(Array.isArray(e)?e:[],i),d&&!d.success&&!d.skipped&&(u=u?`${u}; ${d.error}`:d.error||"\u4E16\u754C\u4E66\u540C\u6B65\u5931\u8D25")),{success:!0,state:l.state,bindings:l.bindings,diff:o,fillMode:n,commitResult:l,mirrorResult:c,worldbookSyncResult:d,warning:u}}var vh,Sy=R(()=>{Js();pt();Vn();As();vy();vh="tableWorkbenchMirror"});function Th(t){let e=[],s;for(Ty.lastIndex=0;(s=Ty.exec(t))!==null;)e.push(s[1].trim());return e.length>0?e[e.length-1]:""}function _h(t){let e=[],s=t.split(/\r?\n/).map(o=>o.trim()).filter(Boolean),r="";for(let o of s)if(r+=o,r.includes("(")&&r.includes(")")){let n=r.match(/(insertRow|updateRow|deleteRow)\s*\(\s*(-?\d+)\s*,?\s*(-?\d+)?\s*,?\s*(.*?)?\)\s*;?\s*$/);if(n){let a=n[1],i=parseInt(n[2],10),l=n[3]!==void 0?parseInt(n[3],10):void 0,c={},d=n[4];if(d)try{c=JSON.parse(d)}catch{c=Ah(d)}a==="insertRow"?(e.push({op:a,tableIndex:i,rowIndex:-1,data:l!==void 0&&typeof l=="number"&&!d?{}:typeof l=="number"?c:typeof l=="object"?l:c}),a==="insertRow"&&l!==void 0&&typeof l=="object"&&(e[e.length-1].data=l)):e.push({op:a,tableIndex:i,rowIndex:l??-1,data:c})}r=""}return e}function Ah(t){if(!t||typeof t!="string")return{};let e={},s=t.replace(/^\{|\}$/g,"").trim();if(!s)return e;let r=Eh(s,",");for(let o of r){let n=o.indexOf(":");if(n<0)continue;let a=o.slice(0,n).trim().replace(/^["']|["']$/g,""),i=o.slice(n+1).trim();i=i.replace(/^["']|["']$/g,""),a&&(e[a]=i)}return e}function Eh(t,e){let s=[],r=0,o="",n=!1,a="";for(let i=0;i<t.length;i++){let l=t[i];if(n){o+=l,l===a&&t[i-1]!=="\\"&&(n=!1);continue}if(l==='"'||l==="'"){n=!0,a=l,o+=l;continue}if(l==="{"||l==="["?r++:(l==="}"||l==="]")&&r--,l===e&&r===0){s.push(o.trim()),o="";continue}o+=l}return o.trim()&&s.push(o.trim()),s}function Ay(t){let e=t.replace(/\/\/.*$/gm,"").replace(/\/\*[\s\S]*?\*\//g,"");return e=e.replace(/,\s*([}\]])/g,"$1"),e=e.replace(/'/g,'"'),e}function Ch(t){let e=t;for(let s=0;s<3&&(e.startsWith('"')&&e.endsWith('"')||e.startsWith("'")&&e.endsWith("'"));s++)try{let r=JSON.parse(e);if(typeof r=="string")e=r;else break}catch{break}return e}function kh(t){let e=Th(t);if(!e)return null;let s=_h(e);return s.length>0?s:null}function Ih(t){let e=[],s=l=>{let c=String(l||"").trim();c&&!e.includes(c)&&e.push(c)};_y.lastIndex=0;let r;for(;(r=_y.exec(t))!==null;)s(r[1]);s(t);let o=t.indexOf("{"),n=t.lastIndexOf("}");o>=0&&n>o&&s(t.slice(o,n+1));let a=t.indexOf("["),i=t.lastIndexOf("]");a>=0&&i>a&&s(t.slice(a,i+1));for(let l of e){let c=null;try{c=JSON.parse(l)}catch{}if(!c)try{c=JSON.parse(Ay(l))}catch{}if(!c){let d=Ch(l);if(d!==l){try{c=JSON.parse(d)}catch{}if(!c)try{c=JSON.parse(Ay(d))}catch{}}}if(c){let d=null;if(Array.isArray(c)?d=c:Array.isArray(c.tables)?d=c.tables:c.data&&Array.isArray(c.data.tables)&&(d=c.data.tables),d)return d}}return null}function Ey(t){if(!t||typeof t!="string")return{mode:"empty",edits:null,tables:null};let e=kh(t);if(e)return{mode:"incremental",edits:e,tables:null};let s=Ih(t);return s?{mode:"full",edits:null,tables:s}:{mode:"empty",edits:null,tables:null}}var Ty,_y,Cy=R(()=>{Ty=/<tableEdit>([\s\S]*?)<\/tableEdit>/g,_y=/```(?:json)?\s*([\s\S]*?)```/gi});function Mh(t,e){let s=new Map;Array.isArray(t)&&t.forEach((n,a)=>{n&&typeof n=="object"&&s.set(n.name||`__row_${a}`,n)});let r=new Map;Array.isArray(e)&&e.forEach((n,a)=>{n&&typeof n=="object"&&r.set(n.name||`__row_${a}`,n)});let o={};for(let[n,a]of r){let i=s.get(n);if(i){o[n]={};let l=new Set([...Object.keys(i.cells||{}),...Object.keys(a.cells||{})]);for(let c of l){let d=String((i.cells&&i.cells[c])??""),u=String((a.cells&&a.cells[c])??"");o[n][c]=d===u?"unchanged":"updated"}o[n].__rowStatus="kept"}else{if(o[n]={},a.cells&&typeof a.cells=="object")for(let l of Object.keys(a.cells))o[n][l]="new";o[n].__rowStatus="new"}}for(let[n]of s)r.has(n)||(o[n]={__rowStatus:"deleted"});return o}function ky(t,e){let s=Array.isArray(t)?pe(t):[],r=Array.isArray(e)?pe(e):[],o={},n=Math.max(s.length,r.length);for(let a=0;a<n;a++){let i=s[a],l=r[a];!i&&l?(o[a]={},Array.isArray(l.rows)&&l.rows.forEach(c=>{let d=c.name||`__row_${l.rows.indexOf(c)}`;o[a][d]={__rowStatus:"new"}})):i&&!l?(o[a]={},Array.isArray(i.rows)&&i.rows.forEach(c=>{let d=c.name||`__row_${i.rows.indexOf(c)}`;o[a][d]={__rowStatus:"deleted"}})):i&&l&&(o[a]=Mh(i.rows,l.rows))}return o}var Iy=R(()=>{pt()});function Rh(){return{mode:"native",async buildRequest(t={},e={}){if(typeof t.buildRequest!="function")throw new Error("table_provider_missing_build_request");return t.buildRequest(e)},async sendRequest(t={},e=null,s={}){if(typeof t.sendRequest!="function")throw new Error("table_provider_missing_send_request");return t.sendRequest(e?.messages||[],s.config||{},s.abortSignal||null)},parseResponse(t={},e=""){if(typeof t.parseResponse!="function")throw new Error("table_provider_missing_parse_response");return t.parseResponse(e)}}}function My(){return Rh()}var Ry=R(()=>{});function Ph(t){if(!t||typeof t!="object")return{};let e={};for(let[s,r]of Object.entries(t))!r||typeof r!="object"||!r.scope||!Object.values(wi).includes(r.scope)||(e[s]={scope:r.scope,lockedAt:Number.isFinite(r.lockedAt)?r.lockedAt:Date.now()});return e}function Py(t){return!t||!t.meta?{}:Ph(t.meta.locks)}function $y(t,e,s,r){return!t||typeof t!="object"?!1:!!(t[Bn(e,s,r)]||t[Bn(e,s,"*")]||t[Bn(e,-1,r)])}function Wi(t,e,s){return!t||typeof t!="object"?!1:Object.entries(t).some(([r,o])=>{if(o.scope!==wi.ROW)return!1;let n=r.split(":");return Number(n[0])===e&&Number(n[1])===s})}var Dy=R(()=>{pt()});function it(){return I.createScope("TableUpdate")}function j(t,e=""){return t==null?e:String(t).trim()||e}function Ny(t=[],e=8,s="all"){if(!Array.isArray(t)||t.length===0)return"";let r=s==="assistant_only"?t.filter(o=>o?.role==="assistant"):t;return r.slice(Math.max(r.length-e,0)).map(o=>`[${j(o?.role,"unknown")}] ${String(o?.content||"").trim()}`).filter(Boolean).join(`

`)}function Oy(t,{extractTags:e=[],useGlobalRules:s=!1}={}){if(!t)return t;let r=Array.isArray(e)&&e.length>0;if(!r&&!s)return t;try{let o=[],n=[];if(r&&(o=e.map(a=>{let i=String(a||"").trim();return i.startsWith("regex:")?{type:"regex_include",value:i.slice(6).trim(),enabled:!0}:{type:"include",value:i,enabled:!0}}).filter(a=>a.value)),s){let a=mr()||[];o=[...o,...a.filter(i=>i?.enabled)],n=br()||[]}return o.length===0&&n.length===0?t:es(t,o,n)||t}catch(o){return it().warn("applyContextExtractionRules \u5931\u8D25\uFF0C\u56DE\u9000\u539F\u59CB\u6587\u672C",o),t}}function $h(t=[],e=-1){return!Number.isFinite(e)||e<0?t:t.map(s=>{let r=Array.isArray(s?.rows)?s.rows:[];return e===0||r.length<=e?s:{...s,rows:r.slice(r.length-e)}})}function Dh(t=[]){return!Array.isArray(t)||t.length===0?"":t.map((e,s)=>{let r=e?.aiInstructions&&typeof e.aiInstructions=="object"?e.aiInstructions:{},o=Array.isArray(e?.columns)?e.columns:[],n=[`\u8868 ${s}: ${j(e?.name,`\u8868${s+1}`)}`,`\u8868\u683C\u8BF4\u660E: ${j(e?.note,"\u65E0")}`,`\u521D\u59CB\u5316\u8BF4\u660E: ${j(r.init,"\u65E0")}`,`\u65B0\u589E\u8BF4\u660E: ${j(r.create,"\u65E0")}`,`\u66F4\u65B0\u8BF4\u660E: ${j(r.update,"\u65E0")}`,`\u5220\u9664\u8BF4\u660E: ${j(r.delete,"\u65E0")}`,"\u5B57\u6BB5:"];return o.forEach(a=>{n.push(`- ${j(a?.title||a?.key,"\u672A\u547D\u540D\u5B57\u6BB5")} (${j(a?.key,"")}): ${j(a?.description,"\u65E0")}`)}),n.join(`
`)}).join(`

`)}function Nh(t,e=[]){if(!t||!Array.isArray(e)||e.length===0)return"";let s=e.map((o,n)=>{let a=j(o?.name,`\u8868${n+1}`),i=t.includes(o,n);return`\u8868 ${n}: ${a} - ${i?"\u5141\u8BB8\u7F16\u8F91":"\u53EA\u8BFB\uFF0C\u7981\u6B62\u4FEE\u6539"}`});return e.some((o,n)=>!t.includes(o,n))&&(s.push(""),s.push('\u3010\u91CD\u8981\u7EA6\u675F\u3011\u6807\u8BB0\u4E3A"\u53EA\u8BFB"\u7684\u8868\u683C\uFF0C\u4F60\u5FC5\u987B\u5728\u8F93\u51FA\u4E2D\u539F\u6837\u4FDD\u7559\u5176\u6240\u6709\u884C\u6570\u636E\uFF0C\u4E0D\u5F97\u65B0\u589E\u3001\u4FEE\u6539\u6216\u5220\u9664\u4EFB\u4F55\u884C\u3002'),s.push("\u5168\u91CF\u8F93\u51FA\u65F6\uFF0C\u53EA\u8BFB\u8868\u683C\u7684 rows \u5FC5\u987B\u4E0E\u8F93\u5165\u4E2D\u7684\u5B8C\u5168\u4E00\u81F4\u3002")),s.join(`
`)}function By(t={},e=0,s=[]){let r=t&&typeof t=="object"?t:{},o=r.cells&&typeof r.cells=="object"&&!Array.isArray(r.cells)?r.cells:{},n={},a=Array.isArray(s)?s.map(l=>j(l?.key,"")).filter(Boolean):[];return new Set([...Object.keys(o),...a]).forEach(l=>{n[l]=j(o[l],"")}),{...r,id:vo(r.id||r.rowId,e),name:j(r.name,""),cells:n}}function ar(t={},e=0){let s=t&&typeof t=="object"?t:{},r=Array.isArray(s.columns)?pe(s.columns):[],o=Array.isArray(s.rows)?s.rows.map((n,a)=>By(n,a,r)):[];return{...s,id:nt(s.id||s.key,e),rows:o}}function Wt(t=[]){return Array.isArray(t)?t.map((e,s)=>ar(e,s)):[]}function Oh(t=[],e=[],s){let r=Wt(t),o=Wt(e);if(!s)return o;let n=new Map(o.map((u,p)=>[nt(u?.id||u?.key,p),u])),a=r.map((u,p)=>({table:u,tableIndex:p,id:nt(u?.id||u?.key,p)})).filter(({table:u,tableIndex:p})=>s.includes(u,p)),i=new Set,l=new Map;for(let u=0;u<o.length;u++){let p=o[u],y=nt(p?.id||p?.key,u);n.has(y)&&(l.set(y,p),i.add(y))}let c=0,d=o.filter((u,p)=>{let y=nt(u?.id||u?.key,p);return!i.has(y)});return r.map((u,p)=>{let y=nt(u?.id||u?.key,p);if(!s.includes(u,p))return ar(u,p);let f=l.get(y);if(f)return ar(f,p);let x=d[c];return x?(c++,ar({...x,id:u.id||x.id},p)):ar(u,p)})}function Lh(t=[],e=[],s,r={}){if(!Array.isArray(t)||!s)return{edits:[],stats:{total:0,passed:0,droppedByScope:0,droppedByLock:0}};let o=Wt(e),n=[],a=0,i=0;for(let l of t){let c=Number.isFinite(l?.tableIndex)?l.tableIndex:-1;if(c<0||c>=o.length){a++;continue}let d=o[c];if(!s.includes(d,c)){a++;continue}if(l.op===ns.INSERT_ROW){n.push(l);continue}let u=Number.isFinite(l?.rowIndex)?l.rowIndex:-1;if(u<0||u>=(Array.isArray(d?.rows)?d.rows.length:0)){a++;continue}if(l.op===ns.DELETE_ROW){if(Wi(r,c,u)){i++;continue}n.push(l);continue}n.push(l)}return{edits:n,stats:{total:t.length,passed:n.length,droppedByScope:a,droppedByLock:i}}}function Bh(t=[],e){let s=Wt(t);return e?s.map((r,o)=>{let n=Array.isArray(r?.columns)?r.columns:[];return e.includes(r,o)?{...ar(r,o),scopeEditable:!0,scopeStatus:"editable"}:{...ar(r,o),scopeEditable:!1,scopeStatus:"readonly",rows:Array.isArray(r?.rows)?r.rows.map((a,i)=>By(a,i,n)):[]}}):s}function zh(t,e,s){return{target:{sourceMessageId:j(t?.sourceMessageId),sourceSwipeId:j(t?.sourceSwipeId||t?.effectiveSwipeId),slotBindingKey:j(t?.slotBindingKey),slotRevisionKey:j(t?.slotRevisionKey),slotTransactionId:j(t?.slotTransactionId)},loadMode:j(e?.loadMode),mergeBaseOnly:e?.mergeBaseOnly===!0,resolvedFromMessageId:j(e?.resolvedFromMessageId),resolvedFromRevisionKey:j(e?.resolvedFromRevisionKey),sourceKind:j(e?.sourceKind||e?.state?.meta?.sourceKind),scope:typeof s?.toJSON=="function"?s.toJSON():null,tables:Bh(e?.state?.tables,s)}}function Ly(){return Uh}function jh(t){if(!Array.isArray(t))return[];let e={[ns.UPDATE_ROW]:0,[ns.INSERT_ROW]:1,[ns.DELETE_ROW]:2};return[...t].sort((s,r)=>{let o=e[s.op]??99,n=e[r.op]??99;return o===2&&n===2?(r.rowIndex??0)-(s.rowIndex??0):o-n})}function Fh(t,e,s,r=null){let o=Wt(t||[]),n=s||{};for(let a of e){let i=a.tableIndex;if(i<0||i>=o.length)continue;let l=o[i];if(!l||!Array.isArray(l.rows)||r&&!r.includes(l,i))continue;if(a.op===ns.INSERT_ROW){let d={id:Ln("row"),name:"",cells:{}};if(a.data&&typeof a.data=="object"){d.name=j(a.data.name,"");let u=Array.isArray(l.columns)?l.columns:[];for(let p of u){let y=p.key;a.data[y]!==void 0&&(d.cells[y]=j(a.data[y]))}for(let[p,y]of Object.entries(a.data))p!=="name"&&d.cells[p]===void 0&&(d.cells[p]=j(y))}l.rows.push(d);continue}let c=a.rowIndex;if(!(c<0||c>=l.rows.length)){if(a.op===ns.DELETE_ROW){if(Wi(n,i,c))continue;l.rows.splice(c,1);continue}if(a.op===ns.UPDATE_ROW){let d=l.rows[c];if(!d)continue;if(d.id=vo(d.id||d.rowId,c),d.cells=d.cells||{},a.data&&typeof a.data=="object"){for(let[u,p]of Object.entries(a.data))u!=="name"&&($y(n,i,c,u)||(d.cells[u]=j(p)));a.data.name!==void 0&&(d.name=j(a.data.name,d.name))}}}}return Wt(o)}async function Kh({executionContext:t,targetSnapshot:e,loadResult:s,config:r,assistantSnapshot:o,fillMode:n,runScope:a}={}){let i=_t(r),l=qu(i),c=zh(e,s,a),d=Array.isArray(o?.tableState?.tables)?Wt(o.tableState.tables):[],u=n==="incremental"||!n&&i.fillMode!=="full",p=t?.chatHistory||t?.chatMessages||[],{contextDepth:y,contextRoles:f,contextExtractTags:x,contextUseGlobalRules:h,sendLatestRows:C}=i,T=Ny(p,y,f),_=Ny(p,y,"all"),Y=Oy(T,{extractTags:x,useGlobalRules:h}),L=Oy(_,{extractTags:x,useGlobalRules:h}),S=await gr({worldbooks:i.worldbooks}),N=$h(c.tables,C),F={...c,tables:N},q={...t,toolName:"\u586B\u8868\u5DE5\u4F5C\u53F0",toolId:"tableWorkbench",lastAiMessage:t?.assistantBaseText||t?.lastAiMessage||"",recentMessagesText:Y,rawRecentMessagesText:L,toolWorldbookContent:S,tableGuidance:Dh(i.tables),tableScopeGuidance:Nh(a,c.tables),injectedContext:o?.injectedContext||ut.getLatestMessageInjectedContext(e?.sourceMessageId),toolContentMacro:JSON.stringify(F,null,2),extractedContent:JSON.stringify(F,null,2),previousToolOutput:JSON.stringify(d,null,2)},D=await Xs.buildToolMessages(l,q),H=await Xs.buildPromptText(l,q);if(u&&(H+=Ly(),Array.isArray(D)&&D.length>0)){let le=D[D.length-1];le&&typeof le.content=="string"&&(le.content+=Ly())}if(!Array.isArray(D)||D.length===0)throw new Error("\u586B\u8868\u8BF7\u6C42\u6D88\u606F\u6784\u5EFA\u5931\u8D25\u3002");return{toolConfig:l,context:q,requestPayload:c,promptText:H,messages:D,fillMode:u?"incremental":"full",runScope:typeof a?.toJSON=="function"?a.toJSON():null}}async function Wh(t,e={},s=null){let r=_t(e),o=j(r.apiPreset,"");if(o){if(!Ur(o))throw new Error(`API \u9884\u8BBE\u4E0D\u5B58\u5728: ${o}`);return ga(o,t,{},s)}return jr(t,{},s)}function ks({status:t=Te.IDLE,targetSnapshot:e=null,skipReason:s="",startedAt:r=Date.now(),error:o=""}={}){return{lastAutoRunAt:r,lastAutoStatus:j(t,Te.IDLE),lastAutoMessageId:j(e?.sourceMessageId,""),lastAutoRevisionKey:j(e?.slotRevisionKey,""),lastAutoSkipReason:j(s,""),...o?{lastError:o,lastErrorDetails:[o]}:{}}}function cs(t={},e=Fe.MANUAL){let s=t&&typeof t=="object"?t:{};return Object.keys(s).length?Hu(s):null}function Rr({targetSnapshot:t=null,startedAt:e=Date.now(),status:s="idle",skipReason:r="",warning:o="",writeback:n=null,aborted:a=!1,stale:i=!1,abortReason:l="",error:c=""}={}){return{isAutoRun:!0,status:s,startedAt:e,targetSnapshot:t,sourceMessageId:j(t?.sourceMessageId,""),sourceSwipeId:j(t?.sourceSwipeId||t?.effectiveSwipeId,""),slotRevisionKey:j(t?.slotRevisionKey,""),writebackStatus:n?.success===!0?"success":o?"warning":"",refreshConfirmed:n?.mirrorResult?.refreshConfirmed===!0,warning:j(o,""),skipReason:j(r,""),aborted:a===!0,stale:i===!0,abortReason:j(l,""),error:j(c,"")}}function Hi(t=null){if(t?.signal?.aborted)return{aborted:!0,stale:!1,reason:"cancelled_before_host_commit"};if(typeof t?.shouldAbortWriteback=="function")try{return t.shouldAbortWriteback()||!1}catch{return{aborted:!0,stale:!0,reason:"stale_base_changed"}}return!1}async function zy(t=null){return jy({configInput:t,runSource:Fe.MANUAL,executionContextBuilder:()=>zs({runSource:Fe.MANUAL}),targetResolver:e=>ko(e,{runSource:Fe.MANUAL})})}async function Uy({messageId:t,swipeId:e="",sourceEvent:s="AUTO_TABLE",configInput:r=null,signal:o=null,shouldAbortWriteback:n=null}={}){return jy({configInput:r,runSource:Fe.AUTO,autoMeta:{sourceEvent:s,messageId:j(t,""),swipeId:j(e,""),signal:o,shouldAbortWriteback:n},executionContextBuilder:()=>Us({messageId:t,swipeId:e,runSource:Fe.AUTO}),targetResolver:a=>ko(a,{runSource:Fe.AUTO})})}async function jy({configInput:t=null,runSource:e=Fe.MANUAL,executionContextBuilder:s,targetResolver:r,autoMeta:o=null}={}){let n=_t(t||Le()),a=Li(n),i=as({tables:Array.isArray(n.tables)?n.tables:[]}),l=e===Fe.AUTO,c=Date.now();if(it().info(`\u5F00\u59CB\u586B\u8868 [${e}]`,{isAutoRun:l,fillMode:n.fillMode}),!a.valid||!i.valid){let y=[...a.errors,...i.errors];return it().error("\u914D\u7F6E\u6821\u9A8C\u5931\u8D25",{errors:y}),cs({lastStatus:Te.ERROR,lastRunAt:c,lastDurationMs:0,lastError:y[0]||"\u586B\u8868\u914D\u7F6E\u65E0\u6548\u3002",lastErrorDetails:y,lastValidationSummary:i.summary||{errorCount:y.length,warningCount:0},errorCount:Number(n?.runtime?.errorCount)||0,...l?ks({status:Te.ERROR,startedAt:c,skipReason:"invalid_config",error:y[0]||"\u586B\u8868\u914D\u7F6E\u65E0\u6548\u3002"}):{}},e),{success:!1,error:y.join(`
`),errors:y,...l?{meta:Rr({startedAt:c,status:Te.ERROR,skipReason:"invalid_config",error:y[0]||"\u586B\u8868\u914D\u7F6E\u65E0\u6548\u3002"})}:{}}}let d=n.runtime||{},u=ku(n.scope||n,n.tables);if((u.mode==="current"||u.mode==="selected")&&u.allowedTableIds.length===0){let y=u.mode==="current"?"\u672A\u6307\u5B9A\u5F53\u524D\u8868\u683C\uFF0C\u65E0\u6CD5\u6267\u884C\u3002":"\u672A\u9009\u62E9\u4EFB\u4F55\u8868\u683C\uFF0C\u65E0\u6CD5\u6267\u884C\u3002";return it().warn(y,{mode:u.mode}),cs({lastStatus:Te.ERROR,lastRunAt:c,lastDurationMs:0,lastError:y,lastErrorDetails:[y]},e),{success:!1,error:y,errors:[y]}}let p=null;cs({lastStatus:Te.RUNNING,lastError:"",lastErrorDetails:[],lastValidationSummary:i.summary||{errorCount:0,warningCount:0},lastScopeMode:j(u.mode,""),...l?ks({status:Te.RUNNING,startedAt:c,skipReason:""}):{}},e);try{if(typeof s!="function")throw new Error("table_update_missing_execution_context_builder");if(typeof r!="function")throw new Error("table_update_missing_target_resolver");let y=await s();it().info("\u6267\u884C\u4E0A\u4E0B\u6587\u5DF2\u6784\u5EFA");let f=r(y);if(!f)throw new Error("\u5F53\u524D\u6CA1\u6709\u53EF\u7528\u7684 assistant \u76EE\u6807\u697C\u5C42\u3002");p=f,it().info("\u76EE\u6807\u6D88\u606F\u5DF2\u89E3\u6790",{sourceMessageId:f.sourceMessageId,slotRevisionKey:f.slotRevisionKey}),l&&cs(ks({status:Te.RUNNING,targetSnapshot:f,startedAt:c,skipReason:""}),e);let x=j(n.autoUpdateTrigger,"assistantMessage");if(l&&(!n.autoUpdateEnabled||x!=="assistantMessage")){let ne=n.autoUpdateEnabled?"auto_trigger_not_assistant_message":"auto_update_disabled";return cs(ks({status:Te.SKIPPED,targetSnapshot:f,startedAt:c,skipReason:ne}),e),{success:!1,skipped:!0,reason:ne,targetSnapshot:f,meta:Rr({targetSnapshot:f,startedAt:c,status:Te.SKIPPED,skipReason:ne})}}if(l){let ne=Hi(o);if(ne)return cs(ks({status:Te.ABORTED,targetSnapshot:f,startedAt:c,skipReason:ne.reason,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88"}),e),{success:!1,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88",targetSnapshot:f,meta:Rr({targetSnapshot:f,startedAt:c,status:Te.ABORTED,skipReason:ne.reason,aborted:ne.aborted===!0,stale:ne.stale===!0,abortReason:ne.reason,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88"})}}let h=await cy(f);if(!h?.success)throw new Error(h?.error||"\u76EE\u6807\u89E3\u6790\u8BB0\u5F55\u5931\u8D25");let C=uy(f.sourceMessageId),T=ly(f,{templateTables:n.tables}),_=Wt(T?.state?.tables||[]),Y=My(),L=o?.signal||y?.signal||null;it().info("\u72B6\u6001\u5DF2\u52A0\u8F7D",{loadMode:T?.loadMode,sourceKind:T?.sourceKind,tableCount:_.length});let S=await Y.buildRequest({buildRequest:Kh},{executionContext:y,targetSnapshot:f,loadResult:T,config:n,assistantSnapshot:C,runScope:u});it().info("\u8BF7\u6C42\u5DF2\u6784\u5EFA",{messageCount:S?.messages?.length,fillMode:S?.fillMode});let N=await Y.sendRequest({sendRequest:Wh},S,{config:n,abortSignal:L});it().info("API \u54CD\u5E94\u5DF2\u6536\u5230",{responseLength:N?.length||0});let F=Y.parseResponse({parseResponse:Ey},N);it().info("\u54CD\u5E94\u5DF2\u89E3\u6790",{mode:F?.mode,hasEdits:!!F?.edits,hasTables:!!F?.tables});let q,D=null,H=S.fillMode||"full",le=null;if(F.mode==="incremental"&&F.edits){let ne=Py(T?.state),Ee=Lh(F.edits,_,u,ne);le=Ee.stats;let Be=jh(Ee.edits);q=Fh(_,Be,ne,u),H="incremental",(le.droppedByScope>0||le.droppedByLock>0)&&it().info("scope \u8FC7\u6EE4",le)}else if(F.mode==="full"&&F.tables){let ne=Wt(F.tables);q=Oh(_,ne,u),H="full"}else q=Wt(_);D=ky(_,q),it().info("\u5DEE\u5F02\u5DF2\u8BA1\u7B97",{fillMode:H});let K=await wy({targetSnapshot:f,nextTables:q,config:n,loadResult:T,diff:D,fillMode:H,skipNotify:l});if(l){let ne=Hi(o);if(ne)return cs(ks({status:Te.ABORTED,targetSnapshot:f,startedAt:c,skipReason:ne.reason,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88"}),e),{success:!1,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88",targetSnapshot:f,loadResult:T,request:S,responseText:N,parsed:F,fillMode:H,diff:D,previousTables:_,nextTables:q,runScope:u,state:K?.state,bindings:K?.bindings,mirrorResult:K?.mirrorResult,warning:K?.warning||"",meta:Rr({targetSnapshot:f,startedAt:c,status:Te.ABORTED,warning:K?.warning||"",writeback:K,aborted:ne.aborted===!0,stale:ne.stale===!0,abortReason:ne.reason,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88"})}}if(!K?.success)throw new Error(K?.error||"\u7ED3\u6784\u5316\u5199\u56DE\u5931\u8D25");let fe=Date.now()-c;it().info(`\u586B\u8868\u5B8C\u6210 [${H}] ${fe}ms`,{success:!0,writebackSuccess:K?.success,mirrorSuccess:K?.mirrorResult?.success});let Qe={lastStatus:Te.SUCCESS,lastRunAt:Date.now(),lastDurationMs:fe,lastError:"",lastErrorDetails:[],lastValidationSummary:i.summary||{errorCount:0,warningCount:0},successCount:(Number(d.successCount)||0)+1,errorCount:Number(d.errorCount)||0,lastSourceMessageId:j(f.sourceMessageId),lastSlotRevisionKey:j(f.slotRevisionKey),lastLoadMode:j(T.loadMode),lastMirrorApplied:K?.mirrorResult?.success===!0,lastResolvedFromMessageId:j(T?.resolvedFromMessageId),lastResolvedFromRevisionKey:j(T?.resolvedFromRevisionKey),lastSourceKind:j(T?.sourceKind||T?.state?.meta?.sourceKind),lastScopeMode:j(u.mode,""),lastFillMode:H,...l?ks({status:Te.SUCCESS,targetSnapshot:f,startedAt:c,skipReason:""}):{}};return cs(Qe,e),{success:!0,targetSnapshot:f,loadResult:T,request:S,responseText:N,parsed:F,fillMode:H,diff:D,previousTables:_,nextTables:q,runScope:u,scopeStats:le,state:K.state,bindings:K.bindings,mirrorResult:K.mirrorResult,warning:K.warning||"",...l?{meta:Rr({targetSnapshot:f,startedAt:c,status:Te.SUCCESS,warning:K.warning||"",writeback:K})}:{}}}catch(y){let f=Date.now()-c;it().error(`\u586B\u8868\u5931\u8D25 ${f}ms: ${y?.message||y}`,{stack:y?.stack});let x=l?Hi(o):!1,h=y?.name==="AbortError"||y?.message==="\u8BF7\u6C42\u5DF2\u53D6\u6D88"||x?.aborted===!0||x?.stale===!0,C=h?Te.ABORTED:Te.ERROR,T={lastStatus:C,lastRunAt:Date.now(),lastDurationMs:f,lastError:y?.message||String(y),lastErrorDetails:[y?.message||String(y)],lastValidationSummary:i.summary||{errorCount:0,warningCount:0},successCount:Number(d.successCount)||0,errorCount:h?Number(d.errorCount)||0:(Number(d.errorCount)||0)+1,lastScopeMode:j(u.mode,""),...l?ks({status:C,targetSnapshot:p,startedAt:c,skipReason:h?x?.reason||"cancelled_before_host_commit":"",error:y?.message||String(y)}):{}};return cs(T,e),{success:!1,error:y?.message||String(y),errors:[y?.message||String(y)],...l?{meta:Rr({targetSnapshot:p,startedAt:c,status:C,skipReason:h?x?.reason||"cancelled_before_host_commit":"",aborted:h,stale:x?.stale===!0,abortReason:h?x?.reason||"cancelled_before_host_commit":"",error:y?.message||String(y)})}:{}}}}var Uh,qi=R(()=>{js();Js();Fr();kn();J();pt();Yn();Vn();As();Sy();Cy();Iy();Kn();Ry();Dy();ro();hr();Uh=`

\u3010\u8868\u683C\u7F16\u8F91\u6307\u4EE4\u683C\u5F0F\u3011
\u8BF7\u4F7F\u7528 <tableEdit> \u6807\u7B7E\u8FD4\u56DE\u5BF9\u8868\u683C\u7684\u4FEE\u6539\uFF0C\u652F\u6301\u4E09\u79CD\u64CD\u4F5C\uFF1A

1. \u63D2\u5165\u65B0\u884C\uFF1AinsertRow(\u8868\u7D22\u5F15, {"\u5217\u952E": "\u503C", ...})
2. \u66F4\u65B0\u73B0\u6709\u884C\uFF1AupdateRow(\u8868\u7D22\u5F15, \u884C\u7D22\u5F15, {"\u5217\u952E": "\u65B0\u503C", ...})
3. \u5220\u9664\u884C\uFF1AdeleteRow(\u8868\u7D22\u5F15, \u884C\u7D22\u5F15)

\u5176\u4E2D\u8868\u7D22\u5F15\u4ECE0\u5F00\u59CB\uFF0C\u884C\u7D22\u5F15\u4E5F\u662F\u4ECE0\u5F00\u59CB\u3002
\u4E00\u6B21\u53EF\u4EE5\u5305\u542B\u591A\u4E2A\u64CD\u4F5C\uFF0C\u6BCF\u4E2A\u64CD\u4F5C\u4E00\u884C\u3002
\u5982\u679C\u4E0D\u9700\u8981\u4FEE\u6539\u8868\u683C\uFF0C\u8FD4\u56DE\u7A7A\u7684 <tableEdit></tableEdit>\u3002

\u793A\u4F8B\uFF1A
<tableEdit>
insertRow(0, {"name": "\u65B0\u89D2\u8272", "age": "25", "role": "\u6218\u58EB"})
updateRow(0, 1, {"age": "26"})
deleteRow(1, 0)
</tableEdit>

\u53EA\u8FD4\u56DE <tableEdit> \u6807\u7B7E\uFF0C\u4E0D\u8981\u9644\u52A0\u5176\u4ED6\u5185\u5BB9\u3002`});var Gy={};te(Gy,{TableWorkbenchPanel:()=>Yy,default:()=>fx});function de(t,e=""){return typeof t=="string"&&t.trim()?t.trim():e}function At(t,e){let s=Array.isArray(t)?t.length:0;return s<=0||!Number.isInteger(e)||e<0?0:Math.min(e,s-1)}function Yi(t){try{return JSON.stringify(t,null,2)}catch{return String(t??"")}}function qh(){return Yu({apiPresets:Gt()})}function Do(t,e){return de(t?.aiInstructions?.[e],"")}function Yh(t={}){return{init:Do(t,"init"),create:Do(t,"create"),update:Do(t,"update"),delete:Do(t,"delete")}}function Qn(t){let e=de(t,"idle");return e==="running"?"\u8FD0\u884C\u4E2D":e==="success"?"\u6700\u8FD1\u6210\u529F":e==="error"?"\u6700\u8FD1\u5931\u8D25":e==="aborted"?"\u5DF2\u4E2D\u6B62":e==="skipped"?"\u5DF2\u8DF3\u8FC7":"\u672A\u8FD0\u884C"}function Wy(t){return t?new Date(t).toLocaleString():"\u2014"}function Gh(t){return Number.isFinite(t)&&t>0?`${(t/1e3).toFixed(t>=1e3?1:2)}s`:"\u2014"}function Xn(t,e){return de(t?.id||t?.key,`table_${e}`)}function Gi(t,e,s){if(!Array.isArray(t))return[];let r=Array.isArray(e)&&e.length>0&&e.some(n=>Array.isArray(n?.rows)&&n.rows.length>0),o=new Map;return r&&e.forEach((n,a)=>{let i=nt(n?.id||n?.key,a);o.set(i,n)}),t.map((n,a)=>{let i=nt(n?.id||n?.key,a),l=o.get(i)||(r&&a<e.length?e[a]:null);return l&&r&&Array.isArray(l.rows)?{...n,rows:pe(l.rows),__liveSourceKind:"live"}:{...n,__liveSourceKind:"template"}})}function Hy(t){return{columns:Array.isArray(t?.columns)?t.columns.length:0,rows:Array.isArray(t?.rows)?t.rows.length:0}}function Vh(t){let e=Hy(t);return`${e.columns} \u5B57\u6BB5 \xB7 ${e.rows} \u884C`}function Ye(t,e){let s=U(),r=e&&typeof e=="object"?e:Le();if(!s||!X(t))return r;let o={...r,runtime:r.runtime||{},scope:r.scope&&typeof r.scope=="object"?{mode:de(r.scope.mode||r.runScope,"enabled"),selectedTableIds:Array.isArray(r.scope.selectedTableIds)?[...r.scope.selectedTableIds]:[],activeTableId:de(r.scope.activeTableId,"")}:{mode:de(r.runScope,"enabled"),selectedTableIds:[],activeTableId:""}},n=Array.isArray(o.tables)?[...o.tables]:[],a=At(n,o.__activeTableIndex??0);if(n[a]){let K=n[a]||{},fe={...K,aiInstructions:Yh(K)},Qe=t.find("[data-twb-name]");Qe.length&&(fe.name=String(Qe.val()||"").trim());let ne=t.find("[data-twb-note]");ne.length&&(fe.note=String(ne.val()||"").trim()),t.find("[data-twb-table-instruction]").each(function(){let Ee=String(s(this).attr("data-twb-table-instruction")||"").trim();Ee&&(fe.aiInstructions[Ee]=String(s(this).val()||"").trim())}),t.find("[data-twb-col]").length&&(fe.columns=[],t.find("[data-twb-col]").each(function(){let Ee=s(this);fe.columns.push({key:de(Ee.find("[data-twb-col-key]").val(),""),title:de(Ee.find("[data-twb-col-title]").val(),""),type:de(Ee.find("[data-twb-col-type]").val(),"text"),required:Ee.find("[data-twb-col-req]").is(":checked"),description:de(Ee.find("[data-twb-col-desc]").val(),"")})})),t.find("[data-twb-row]").length&&(fe.rows=[],t.find("[data-twb-row]").each(function(Ee){let Be=s(this),$t={};(fe.columns||[]).forEach(xe=>{$t[xe.key]=de(Be.find(`[data-twb-cell="${xe.key}"]`).val(),"")}),fe.rows.push({id:de(Be.attr("data-twb-row-id"),K.rows?.[Ee]?.id||""),name:de(Be.find("[data-twb-row-name]").val(),""),cells:$t})})),n[a]=fe}let i=t.find('[data-twb-field="promptTemplate"]');i.length&&(o.promptTemplate=String(i.val()||""));let l=t.find('[data-twb-field="apiPreset"]');l.length&&(o.apiPreset=String(l.val()||""));let c=t.find('[data-twb-field="fillMode"]');c.length&&(o.fillMode=String(c.val()||""));let d=t.find('[data-twb-field="mirrorToMessage"]');d.length&&(o.mirrorToMessage=d.is(":checked"));let u=t.find('[data-twb-field="autoUpdateEnabled"]');u.length&&(o.autoUpdateEnabled=u.is(":checked"));let p=t.find('[data-twb-field="autoUpdateTrigger"]');p.length&&(o.autoUpdateTrigger=String(p.val()||"assistantMessage"));let y=t.find('[data-twb-field="runScope"]:checked');y.length&&(o.runScope=String(y.val()||"enabled"));let f=[];t.find("[data-twb-run-table]:checked").each(function(){let K=de(s(this).attr("data-twb-run-table"),"");K&&f.push(K)}),o.scope={mode:o.runScope,selectedTableIds:f,activeTableId:n[a]?Xn(n[a],a):""};let x=t.find('[data-twb-field="promptPreset"]');x.length&&(o.promptPreset=String(x.val()||""));let h=t.find('[data-twb-field="bypassEnabled"]'),C=String(o.promptPreset||"");o.bypass={...o.bypass||{},enabled:h.length?h.is(":checked"):o.bypass?.enabled===!0,presetId:C};let T=t.find('[data-twb-field="activeTemplate"]');T.length&&(o.activeTemplate=String(T.val()||""));let _=t.find('[data-twb-field="contextDepth"]');_.length&&(o.contextDepth=Math.max(1,parseInt(_.val(),10)||8));let Y=t.find('[data-twb-field="contextRoles"]:checked');Y.length&&(o.contextRoles=String(Y.val()||"all"));let L=t.find('[data-twb-field="contextExtractTags"]');L.length&&(o.contextExtractTags=String(L.val()||"").split(`
`).map(K=>K.trim()).filter(Boolean));let S=t.find('[data-twb-field="contextUseGlobalRules"]');S.length&&(o.contextUseGlobalRules=S.is(":checked"));let N=t.find('[data-twb-field="sendLatestRows"]');N.length&&(o.sendLatestRows=parseInt(N.val(),10),Number.isFinite(o.sendLatestRows)||(o.sendLatestRows=-1));let F=t.find('[data-twb-field="worldbooksEnabled"]'),q=[];t.find("[data-twb-wb-item]:checked").each(function(){let K=String(s(this).attr("data-twb-wb-name")||"").trim();K&&q.push(K)}),o.worldbooks={enabled:F.length?F.is(":checked"):o.worldbooks?.enabled===!0,selected:q.length>0?q:Array.isArray(o.worldbooks?.selected)?o.worldbooks.selected:[]};let D=t.find('[data-twb-field="worldbookSyncEnabled"]'),H=t.find('[data-twb-field="worldbookSyncTarget"]'),le=t.find('[data-twb-field="worldbookSyncComment"]');return o.worldbookSync={enabled:D.length?D.is(":checked"):o.worldbookSync?.enabled===!0,targetBook:H.length?String(H.val()||""):o.worldbookSync?.targetBook||"",entryComment:le.length?String(le.val()||"").trim()||"YYT-\u586B\u8868\u6570\u636E":o.worldbookSync?.entryComment||"YYT-\u586B\u8868\u6570\u636E"},o.tables=n,o}function qy(t){let e=de(t,"idle");return`<span class="yyt-tool-runtime-badge yyt-status-${v(e)}">${v(Qn(e))}</span>`}function Jh(t){return`
    <header class="yyt-tool-panel-hero">
      <div class="yyt-tool-panel-hero-copy">
        <div class="yyt-tool-panel-hero-title"><i class="fa-solid fa-table-cells"></i> \u586B\u8868\u5DE5\u4F5C\u53F0</div>
        <div class="yyt-tool-panel-hero-desc">\u7ED3\u6784\u5316\u72B6\u6001\u4E0E\u5173\u7CFB\u6570\u636E\u5DE5\u4F5C\u53F0\uFF0C\u6309\u5F53\u524D assistant \u6D88\u606F\u6267\u884C AI \u586B\u8868\u3002</div>
      </div>
      <div class="yyt-tool-panel-hero-tags">
        ${qy(t?.runtime?.lastStatus)}
        <button class="yyt-btn yyt-btn-secondary yyt-tool-save-top" data-twb-action="save"><i class="fa-solid fa-save"></i> \u4FDD\u5B58</button>
        <button class="yyt-btn yyt-btn-primary" data-twb-action="run"><i class="fa-solid fa-play"></i> \u7ACB\u5373\u586B\u8868</button>
      </div>
    </header>`}function Xh(t){let e=t?.runtime||{};return`
    <article class="yyt-panel-section yyt-twb-card yyt-twb-runtime-card">
      <div class="yyt-twb-card-header">
        <div><h3>\u8FD0\u884C\u6982\u89C8</h3><p>\u6700\u8FD1\u4E00\u6B21\u586B\u8868\u6267\u884C\u7ED3\u679C\u3002</p></div>
        ${qy(e.lastStatus)}
      </div>
      <div class="yyt-twb-metrics">
        <div><span>\u6700\u8FD1\u8FD0\u884C</span><strong>${v(Wy(e.lastRunAt))}</strong></div>
        <div><span>\u8017\u65F6</span><strong>${v(Gh(e.lastDurationMs))}</strong></div>
        <div><span>\u6210\u529F</span><strong>${Number(e.successCount)||0}</strong></div>
        <div><span>\u5931\u8D25</span><strong>${Number(e.errorCount)||0}</strong></div>
      </div>
      <div class="yyt-twb-runtime-message">\u6700\u8FD1\u9519\u8BEF\uFF1A${v(de(e.lastError,"\u65E0"))}</div>
    </article>`}function Qh(t){let e=t?.runtime||{};return`
    <article class="yyt-panel-section yyt-twb-card">
      <div class="yyt-twb-card-header">
        <div><h3>\u81EA\u52A8\u66F4\u65B0</h3><p>\u63A7\u5236\u9ED8\u8BA4\u8FD0\u884C\u65B9\u5F0F\u4E0E\u5199\u56DE\u7B56\u7565\u3002</p></div>
        <label class="yyt-twb-check-row"><input type="checkbox" data-twb-field="autoUpdateEnabled" ${t.autoUpdateEnabled?"checked":""}><span>\u542F\u7528</span></label>
      </div>
      <label class="yyt-twb-field">
        <span>\u89E6\u53D1\u65F6\u673A</span>
        <select class="yyt-select" data-twb-field="autoUpdateTrigger">
          <option value="assistantMessage" ${t.autoUpdateTrigger!=="manual"&&t.autoUpdateTrigger!=="custom"?"selected":""}>assistant \u6D88\u606F\u540E</option>
          <option value="manual" ${t.autoUpdateTrigger==="manual"?"selected":""}>\u4EC5\u624B\u52A8</option>
          <option value="custom" ${t.autoUpdateTrigger==="custom"?"selected":""}>\u81EA\u5B9A\u4E49</option>
        </select>
      </label>
      <label class="yyt-twb-field">
        <span>\u9ED8\u8BA4\u66F4\u65B0\u6A21\u5F0F</span>
        <select class="yyt-select" data-twb-field="fillMode">
          <option value="${Cs.INCREMENTAL}" ${t.fillMode!==Cs.FULL?"selected":""}>\u589E\u91CF\u66F4\u65B0</option>
          <option value="${Cs.FULL}" ${t.fillMode===Cs.FULL?"selected":""}>\u5168\u91CF\u91CD\u5199</option>
        </select>
      </label>
      <label class="yyt-twb-check-row"><input type="checkbox" data-twb-field="mirrorToMessage" ${t.mirrorToMessage?"checked":""}><span>\u955C\u50CF\u5199\u56DE\u6B63\u6587</span></label>
      <div class="yyt-twb-runtime-message">\u81EA\u52A8\u6700\u8FD1\u72B6\u6001\uFF1A${v(Qn(e.lastAutoStatus))} \xB7 \u6700\u8FD1\u89E6\u53D1\uFF1A${v(Wy(e.lastAutoRunAt))} \xB7 \u76EE\u6807\u6D88\u606F\uFF1A${v(de(e.lastAutoMessageId,"\u2014"))}${e.lastAutoSkipReason?` \xB7 \u539F\u56E0\uFF1A${v(e.lastAutoSkipReason)}`:""}</div>
    </article>`}function Zh(t){let e=Gt(),s=yo()||[],r=t?.bypass?.enabled===!0,o=de(t?.bypass?.presetId||t?.promptPreset,"");return`
    <article class="yyt-panel-section yyt-twb-card">
      <div class="yyt-twb-card-header">
        <div><h3>AI \u7ED1\u5B9A</h3><p>\u9009\u62E9\u586B\u8868\u4F7F\u7528\u7684 API \u4E0E Ai \u6307\u4EE4\u9884\u8BBE\u3002</p></div>
        <span class="yyt-twb-muted">API \u4E0E Ai \u6307\u4EE4</span>
      </div>
      <label class="yyt-twb-field">
        <span>API \u9884\u8BBE</span>
        <select class="yyt-select" data-twb-field="apiPreset">
          <option value="" ${t.apiPreset?"":"selected"}>\u4F7F\u7528\u5F53\u524D API \u914D\u7F6E</option>
          ${e.map(n=>`<option value="${v(n?.name||"")}" ${t.apiPreset===n?.name?"selected":""}>${v(n?.name||"")}</option>`).join("")}
        </select>
      </label>
      <label class="yyt-twb-check-row">
        <input type="checkbox" data-twb-field="bypassEnabled" ${r?"checked":""}>
        <span>\u542F\u7528 Ai \u6307\u4EE4\u9884\u8BBE</span>
      </label>
      <label class="yyt-twb-field yyt-twb-bypass-preset ${r?"":"yyt-hidden"}">
        <span>\u7ED1\u5B9A Ai \u6307\u4EE4\u9884\u8BBE</span>
        <select class="yyt-select" data-twb-field="promptPreset">
          <option value="" ${o?"":"selected"}>\u9009\u62E9\u9884\u8BBE</option>
          ${s.map(n=>`<option value="${v(n?.id||"")}" ${o===n?.id?"selected":""}>${v(n?.name||n?.id||"")}</option>`).join("")}
        </select>
        <small>\u542F\u7528\u540E\u4F1A\u4F5C\u4E3A\u586B\u8868\u8BF7\u6C42\u7684\u524D\u7F6E\u6D88\u606F\u53D1\u9001\uFF0C\u590D\u7528\u7834\u9650\u6A21\u5757\u4E2D\u7684 Ai \u6307\u4EE4\u9884\u8BBE\u3002</small>
      </label>
    </article>`}function ex(t){let e=Eo(),s=_s;return`
    <article class="yyt-panel-section yyt-twb-card yyt-twb-template-card">
      <div class="yyt-twb-card-header">
        <div><h3>\u6A21\u677F\u7BA1\u7406</h3><p>\u590D\u7528\u8868\u683C\u7ED3\u6784\u4E0E AI \u64CD\u4F5C\u8BF4\u660E\u3002</p></div>
        <span class="yyt-twb-muted">\u7ED3\u6784\u6A21\u677F / \u5F53\u524D\u804A\u5929 guide</span>
      </div>
      <div class="yyt-twb-runtime-message">\u5F53\u524D guide\uFF1A\u6A21\u677F ${v(de(t?.guide?.templateId||t.activeTemplate,"\u2014"))} \xB7 scope ${v(de(t?.guide?.scope?.mode||t.runScope,"enabled"))} \xB7 \u7126\u70B9\u8868 ${v(de(t?.guide?.focusedTableId||t.scope?.activeTableId,"\u2014"))}</div>
      <label class="yyt-twb-field">
        <span>\u5F53\u524D\u6A21\u677F</span>
        <select class="yyt-select" data-twb-field="activeTemplate">
          <option value="" ${t.activeTemplate?"":"selected"}>\u4E0D\u5207\u6362\u6A21\u677F</option>
          ${e.map(r=>`<option value="${v(r.id)}" ${t.activeTemplate===r.id?"selected":""}>${v(r.name)}${r.id===s?" (\u5185\u7F6E)":""}</option>`).join("")}
        </select>
      </label>
      <div class="yyt-twb-template-list" data-twb-template-list>
        ${e.filter(r=>r.id!==s).map(r=>`
          <div class="yyt-twb-template-item" data-twb-template-id="${v(r.id)}">
            <span class="yyt-twb-template-item-name">${v(r.name)}</span>
            <span class="yyt-twb-template-item-meta">${r.tables?.length||0} \u8868</span>
            <button class="yyt-btn yyt-btn-icon yyt-btn-danger yyt-btn-small" data-twb-action="delete-template" data-twb-template-id="${v(r.id)}" title="\u5220\u9664"><i class="fa-solid fa-trash"></i></button>
          </div>`).join("")||'<div class="yyt-twb-muted" style="padding:6px 0;font-size:12px">\u6682\u65E0\u7528\u6237\u6A21\u677F\u3002\u4FDD\u5B58\u5F53\u524D\u8868\u7ED3\u6784\u4E3A\u6A21\u677F\u540E\u4F1A\u5728\u6B64\u663E\u793A\u3002</div>'}
      </div>
      <div class="yyt-twb-action-grid">
        <button class="yyt-btn yyt-btn-secondary yyt-btn-small" data-twb-action="apply-template">\u5E94\u7528\u6A21\u677F</button>
        <button class="yyt-btn yyt-btn-secondary yyt-btn-small" data-twb-action="save-template">\u4FDD\u5B58\u4E3A\u6A21\u677F</button>
        <button class="yyt-btn yyt-btn-secondary yyt-btn-small" data-twb-action="import-template">\u5BFC\u5165\u6A21\u677F</button>
        <button class="yyt-btn yyt-btn-secondary yyt-btn-small" data-twb-action="export-template">\u5BFC\u51FA\u5F53\u524D</button>
        <button class="yyt-btn yyt-btn-secondary yyt-btn-small" data-twb-action="export-all-templates">\u5BFC\u51FA\u5168\u90E8</button>
      </div>
      <input type="file" data-twb-import-file accept=".json" style="display:none">
    </article>`}function tx(t){let e=Array.isArray(t.tables)?t.tables:[],s=de(t.scope?.mode||t.runScope,"enabled"),r=new Set(Array.isArray(t.scope?.selectedTableIds)?t.scope.selectedTableIds:[]);return`
    <article class="yyt-panel-section yyt-twb-card yyt-twb-manual-card">
      <div class="yyt-twb-card-header">
        <div><h3>\u624B\u52A8\u66F4\u65B0</h3><p>\u9009\u62E9\u672C\u6B21\u60F3\u8BA9 AI \u5173\u6CE8\u7684\u8868\u3002</p></div>
        <span class="yyt-twb-muted">${e.length} \u5F20\u8868</span>
      </div>
      <div class="yyt-twb-radio-group">
        <label><input type="radio" name="twbRunScope" value="enabled" data-twb-field="runScope" ${s==="enabled"?"checked":""}>\u6240\u6709\u542F\u7528\u8868\u683C</label>
        <label><input type="radio" name="twbRunScope" value="selected" data-twb-field="runScope" ${s==="selected"?"checked":""}>\u4EC5\u9009\u4E2D\u8868\u683C</label>
        <label><input type="radio" name="twbRunScope" value="current" data-twb-field="runScope" ${s==="current"?"checked":""}>\u5F53\u524D\u6253\u5F00\u8868\u683C</label>
      </div>
      <div class="yyt-twb-table-chip-list">
        ${e.length?e.map((o,n)=>`<label class="yyt-twb-table-chip"><input type="checkbox" data-twb-run-table="${v(Xn(o,n))}" ${r.has(Xn(o,n))?"checked":""}><span>${v(de(o?.name,`\u8868\u683C ${n+1}`))}</span></label>`).join(""):'<span class="yyt-twb-muted">\u8FD8\u6CA1\u6709\u53EF\u66F4\u65B0\u7684\u8868\u683C\u3002</span>'}
      </div>
      <div class="yyt-twb-card-actions">
        <button class="yyt-btn yyt-btn-secondary yyt-btn-small" data-twb-action="run-selected">\u4EC5\u66F4\u65B0\u9009\u4E2D\u8868\u683C</button>
        <button class="yyt-btn yyt-btn-primary yyt-btn-small" data-twb-action="run">\u7ACB\u5373\u586B\u8868</button>
      </div>
    </article>`}function sx(t){let e=Array.isArray(t.tables)?t.tables:[],s=At(e,t.__activeTableIndex??0),r=as({tables:e});return`
    <section class="yyt-twb-table-overview">
      <div class="yyt-twb-section-header">
        <div><h3>\u8868\u683C</h3><p>\u7BA1\u7406\u9700\u8981 AI \u7EF4\u62A4\u7684\u7ED3\u6784\u5316\u8868\u683C\u3002</p></div>
        <button class="yyt-btn yyt-btn-secondary" data-twb-action="add-table"><i class="fa-solid fa-plus"></i> \u65B0\u5EFA\u8868\u683C</button>
      </div>
      ${e.length?`
        <div class="yyt-twb-table-card-list">
          ${e.map((o,n)=>{let a=Hy(o),i=(r.issues||[]).filter(u=>u.tableIndex===n),l=i.length?`${i.length} \u4E2A\u95EE\u9898`:"\u65E0\u6821\u9A8C\u95EE\u9898",c=n===s,d=o.__liveSourceKind==="live"?'<span class="yyt-twb-live-badge yyt-twb-live-badge--live">\u5B9E\u65F6</span>':'<span class="yyt-twb-live-badge yyt-twb-live-badge--template">\u6A21\u677F</span>';return`
              <article class="yyt-twb-table-card ${c?"is-active":""}" data-twb-select="${n}">
                <div class="yyt-twb-table-card-main">
                  <div class="yyt-twb-table-copy">
                    <h4>${v(de(o?.name,`\u8868\u683C ${n+1}`))}</h4>
                    <p>${v(de(o?.note,"\u8FD8\u6CA1\u6709\u8868\u683C\u8BF4\u660E\u3002"))}</p>
                    <div class="yyt-twb-table-card-meta ${i.length?"is-warning":""}">${a.columns} \u5B57\u6BB5 / ${a.rows} \u884C \xB7 ${d} \xB7 ${v(Qn(t?.runtime?.lastStatus))} \xB7 ${v(l)}</div>
                  </div>
                </div>
                <div class="yyt-twb-table-card-actions">
                  <button class="yyt-btn yyt-btn-secondary yyt-btn-small" data-twb-action="open-table-editor" data-twb-ti="${n}">\u914D\u7F6E\u8868\u683C</button>
                  <button class="yyt-btn yyt-btn-secondary yyt-btn-small" data-twb-action="run-table" data-twb-ti="${n}">\u66F4\u65B0\u6B64\u8868</button>
                  ${e.length>1?`<button class="yyt-btn yyt-btn-danger yyt-btn-small" data-twb-action="delete-table" data-twb-ti="${n}" title="\u5220\u9664\u8868\u683C">\u5220\u9664</button>`:""}
                </div>
              </article>`}).join("")}
        </div>`:`
        <div class="yyt-twb-empty">
          <h4>\u8FD8\u6CA1\u6709\u8868\u683C</h4>
          <p>\u5148\u65B0\u5EFA\u4E00\u5F20\u8868\uFF0C\u518D\u5B9A\u4E49\u5B57\u6BB5\u548C\u6570\u636E\u884C\u3002</p>
          <button class="yyt-btn yyt-btn-primary" data-twb-action="add-table">\u65B0\u5EFA\u7B2C\u4E00\u5F20\u8868</button>
        </div>`}
    </section>`}function rx(t){let e=Number.isFinite(t.contextDepth)?t.contextDepth:8,s=t.contextRoles==="assistant_only"?"assistant_only":"all",r=Array.isArray(t.contextExtractTags)?t.contextExtractTags.join(`
`):"",o=t.contextUseGlobalRules===!0,n=Number.isFinite(t.sendLatestRows)?t.sendLatestRows:-1,a=t.worldbooks?.enabled===!0;return`
    <article class="yyt-panel-section yyt-twb-card">
      <div class="yyt-twb-card-header">
        <div><h3>\u4E0A\u4E0B\u6587\u914D\u7F6E</h3><p>\u63A7\u5236\u53D1\u7ED9\u586B\u8868 AI \u7684\u6D88\u606F\u6DF1\u5EA6\u3001\u89D2\u8272\u8FC7\u6EE4\u4E0E\u4E16\u754C\u4E66\u6CE8\u5165\u3002</p></div>
      </div>
      <label class="yyt-twb-field">
        <span>\u6D88\u606F\u6DF1\u5EA6</span>
        <input class="yyt-input" type="number" min="1" max="100" data-twb-field="contextDepth" value="${v(String(e))}">
        <small>\u5411 AI \u53D1\u9001\u6700\u8FD1 N \u6761\u6D88\u606F\u4F5C\u4E3A\u4E0A\u4E0B\u6587\u3002\u9ED8\u8BA4 8\u3002</small>
      </label>
      <label class="yyt-twb-field">
        <span>\u6D88\u606F\u89D2\u8272</span>
        <div class="yyt-twb-radio-group">
          <label><input type="radio" name="twbContextRoles" value="all" data-twb-field="contextRoles" ${s==="all"?"checked":""}>\u5168\u90E8\u6D88\u606F\uFF08user + assistant\uFF09</label>
          <label><input type="radio" name="twbContextRoles" value="assistant_only" data-twb-field="contextRoles" ${s==="assistant_only"?"checked":""}>\u4EC5 AI \u6D88\u606F</label>
        </div>
      </label>
      <div class="yyt-twb-field">
        <span>\u63D0\u53D6\u6807\u7B7E / \u6B63\u5219</span>
        <textarea class="yyt-textarea yyt-code-textarea yyt-code-textarea-small" data-twb-field="contextExtractTags" rows="4" placeholder="\u6BCF\u884C\u4E00\u4E2A\u89C4\u5219\u3002\u666E\u901A\u6587\u672C\u6309\u6807\u7B7E\u63D0\u53D6\uFF1B\u4EE5 regex: \u5F00\u5934\u65F6\u6309\u6B63\u5219\u7B2C\u4E00\u6355\u83B7\u7EC4\u63D0\u53D6\u3002">${v(r)}</textarea>
        <small>\u81EA\u5B9A\u4E49\u63D0\u53D6\u89C4\u5219\uFF0C\u5BF9\u6D88\u606F\u4E0A\u4E0B\u6587\u8FDB\u884C include / regex \u63D0\u53D6\u3002</small>
      </div>
      <div class="yyt-twb-field">
        <label class="yyt-twb-check-row"><input type="checkbox" data-twb-field="contextUseGlobalRules" ${o?"checked":""}><span>\u540C\u65F6\u5E94\u7528\u5168\u5C40\u6B63\u5219\u89C4\u5219\uFF08\u63D0\u53D6 + \u6392\u9664 + \u9ED1\u540D\u5355\uFF09</span></label>
        <small>\u542F\u7528\u540E\uFF0C\u5C06\u5408\u5E76"\u6B63\u5219\u63D0\u53D6"\u9762\u677F\u4E2D\u7684\u5168\u5C40\u89C4\u5219\u4E00\u8D77\u5E94\u7528\u3002</small>
      </div>
      <label class="yyt-twb-field">
        <span>\u53D1\u9001\u6700\u65B0\u884C\u6570</span>
        <input class="yyt-input" type="number" min="-1" data-twb-field="sendLatestRows" value="${v(String(n))}">
        <small>\u6BCF\u5F20\u8868\u6700\u591A\u53D1\u9001\u6700\u540E N \u884C\u7ED9 AI\u3002-1 \u8868\u793A\u5168\u90E8\u53D1\u9001\u3002</small>
      </label>
      <div class="yyt-twb-field">
        <span>\u4E16\u754C\u4E66\u6CE8\u5165</span>
        <label class="yyt-twb-check-row"><input type="checkbox" data-twb-field="worldbooksEnabled" ${a?"checked":""}><span>\u542F\u7528\u4E16\u754C\u4E66\u6CE8\u5165</span></label>
        <div class="yyt-twb-worldbook-selector ${a?"":"yyt-hidden"}" data-twb-wb-selector>
          <div class="yyt-twb-worldbook-list" data-twb-wb-list></div>
        </div>
      </div>
      <div class="yyt-twb-field">
        <span>\u4E16\u754C\u4E66\u540C\u6B65\uFF08\u586B\u8868 \u2192 \u4E16\u754C\u4E66\uFF09</span>
        <label class="yyt-twb-check-row"><input type="checkbox" data-twb-field="worldbookSyncEnabled" ${t.worldbookSync?.enabled?"checked":""}><span>\u586B\u8868\u540E\u81EA\u52A8\u540C\u6B65\u6570\u636E\u5230\u4E16\u754C\u4E66\u6761\u76EE</span></label>
        <div class="yyt-twb-worldbook-sync-opts ${t.worldbookSync?.enabled?"":"yyt-hidden"}" data-twb-wbsync-opts>
          <label class="yyt-twb-field" style="margin-top:8px">
            <span>\u76EE\u6807\u4E16\u754C\u4E66</span>
            <select class="yyt-select" data-twb-field="worldbookSyncTarget">
              <option value="">\u8BF7\u9009\u62E9\u2026</option>
            </select>
            <small>\u586B\u8868\u6570\u636E\u5C06\u5199\u5165\u6B64\u4E16\u754C\u4E66\u7684\u4E00\u4E2A\u5E38\u9A7B\u6761\u76EE\u4E2D\u3002</small>
          </label>
          <label class="yyt-twb-field">
            <span>\u6761\u76EE\u6807\u8BC6</span>
            <input class="yyt-input" type="text" data-twb-field="worldbookSyncComment" value="${v(t.worldbookSync?.entryComment||"YYT-\u586B\u8868\u6570\u636E")}">
            <small>\u4E16\u754C\u4E66\u6761\u76EE\u7684 comment \u5B57\u6BB5\uFF0C\u7528\u4E8E\u5B9A\u4F4D\u66F4\u65B0\u3002</small>
          </label>
        </div>
      </div>
    </article>`}function ox(t){return`
    <main class="yyt-twb-dashboard">
      <section class="yyt-twb-dashboard-grid">
        ${Xh(t)}
        ${Qh(t)}
        ${Zh(t)}
        ${rx(t)}
        ${ex(t)}
        ${tx(t)}
      </section>
      ${sx(t)}
    </main>`}function nx(t){return`
    <section class="yyt-panel-section yyt-twb-editor-section">
      <div class="yyt-twb-section-header"><div><h4>\u8868\u683C\u57FA\u7840\u4FE1\u606F</h4><p>\u544A\u8BC9 AI \u8FD9\u5F20\u8868\u4EE3\u8868\u4EC0\u4E48\uFF0C\u4EE5\u53CA\u5B83\u5E94\u8BE5\u8FFD\u8E2A\u54EA\u7C7B\u4FE1\u606F\u3002</p></div></div>
      <label class="yyt-twb-field"><span>\u8868\u540D</span><input class="yyt-input" data-twb-name value="${v(t?.name||"")}" placeholder="\u8868\u540D"></label>
      <label class="yyt-twb-field"><span>\u8868\u683C\u8BF4\u660E</span><textarea class="yyt-textarea" rows="3" data-twb-note placeholder="\u4F8B\u5982\uFF1A\u8BB0\u5F55\u89D2\u8272\u57FA\u7840\u4FE1\u606F\u3001\u72B6\u6001\u548C\u5173\u7CFB\u53D8\u5316\u3002">${v(t?.note||"")}</textarea></label>
    </section>`}function ax(t){return`
    <section class="yyt-panel-section yyt-twb-editor-section yyt-twb-ai-instructions">
      <div class="yyt-twb-section-header"><div><h4>AI \u7406\u89E3\u4E0E\u64CD\u4F5C\u8BF4\u660E</h4><p>\u8BA9 AI \u81EA\u884C\u5224\u65AD\u662F\u5426\u9700\u8981\u521D\u59CB\u5316\u3001\u65B0\u589E\u3001\u66F4\u65B0\u6216\u5220\u9664\u8FD9\u5F20\u8868\u7684\u6570\u636E\u3002</p></div></div>
      <div class="yyt-twb-ai-grid">
        ${[["init","\u521D\u59CB\u5316\u8BF4\u660E","\u5F53\u8868\u683C\u4E3A\u7A7A\u65F6\uFF0CAI \u5E94\u8BE5\u5982\u4F55\u521B\u5EFA\u521D\u59CB\u6570\u636E\u3002"],["create","\u65B0\u589E\u8BF4\u660E","\u4EC0\u4E48\u65F6\u5019\u5E94\u8BE5\u65B0\u589E\u4E00\u884C\u3002"],["update","\u66F4\u65B0\u8BF4\u660E","\u4EC0\u4E48\u65F6\u5019\u5E94\u8BE5\u66F4\u65B0\u5DF2\u6709\u884C\u3002"],["delete","\u5220\u9664\u8BF4\u660E","\u4EC0\u4E48\u65F6\u5019\u5E94\u8BE5\u5220\u9664\u6216\u6807\u8BB0\u5220\u9664\u4E00\u884C\u3002"]].map(([s,r,o])=>`
          <label class="yyt-twb-field">
            <span>${r}</span>
            <small>${o}</small>
            <textarea class="yyt-textarea" rows="3" data-twb-table-instruction="${s}">${v(Do(t,s))}</textarea>
          </label>`).join("")}
      </div>
    </section>`}function ix(t){let e=Array.isArray(t?.columns)?t.columns:[];return`
    <section class="yyt-panel-section yyt-twb-editor-section">
      <div class="yyt-twb-section-header">
        <div><h4>\u5B57\u6BB5\u7ED3\u6784</h4><p>\u544A\u8BC9 AI \u6BCF\u4E00\u884C\u9700\u8981\u586B\u5199\u54EA\u4E9B\u4FE1\u606F\u3002\u9ED8\u8BA4\u53EA\u5C55\u793A\u7528\u6237\u53EF\u7406\u89E3\u7684\u5B57\u6BB5\u540D\u548C\u586B\u5199\u8BF4\u660E\u3002</p></div>
        <button class="yyt-btn yyt-btn-secondary yyt-btn-small" data-twb-action="add-col">\u6DFB\u52A0\u5B57\u6BB5</button>
      </div>
      ${e.length?`
        <div class="yyt-twb-field-card-list">
          ${e.map((s,r)=>`
            <article class="yyt-twb-field-card" data-twb-col>
              <div class="yyt-twb-field-card-main">
                <label class="yyt-twb-field"><span>\u5B57\u6BB5\u540D</span><input class="yyt-input" data-twb-col-title value="${v(s.title||"")}" placeholder="\u5B57\u6BB5\u540D"></label>
                <label class="yyt-twb-field"><span>AI \u586B\u5199\u8BF4\u660E</span><textarea class="yyt-textarea" rows="2" data-twb-col-desc placeholder="\u544A\u8BC9 AI \u8FD9\u4E2A\u5B57\u6BB5\u8BE5\u586B\u4EC0\u4E48\u3002">${v(s.description||"")}</textarea></label>
              </div>
              <button class="yyt-btn yyt-btn-icon" data-twb-action="delete-col" data-twb-ci="${v(s.key||"")}" title="\u5220\u9664\u5B57\u6BB5" aria-label="\u5220\u9664\u5B57\u6BB5"><i class="fa-solid fa-trash"></i></button>
              <details class="yyt-twb-field-advanced">
                <summary>\u9AD8\u7EA7\u8BBE\u7F6E</summary>
                <div class="yyt-twb-advanced-grid">
                  <label class="yyt-twb-field"><span>\u5185\u90E8\u6807\u8BC6 key</span><input class="yyt-input" data-twb-col-key value="${v(s.key||"")}" placeholder="col_key"></label>
                  <label class="yyt-twb-field"><span>\u5185\u5BB9\u683C\u5F0F</span><select class="yyt-select" data-twb-col-type>${Wn.map(o=>`<option value="${o.value}" ${s.type===o.value?"selected":""}>${o.label}</option>`).join("")}</select></label>
                  <label class="yyt-twb-check-row"><input type="checkbox" data-twb-col-req ${s.required?"checked":""}><span>AI \u5FC5\u987B\u5C1D\u8BD5\u586B\u5199</span></label>
                </div>
              </details>
            </article>`).join("")}
        </div>`:`
        <div class="yyt-twb-empty"><h4>\u8FD8\u6CA1\u6709\u5B57\u6BB5</h4><p>\u5B57\u6BB5\u51B3\u5B9A AI \u8F93\u51FA\u683C\u5F0F\uFF0C\u4E5F\u51B3\u5B9A\u6BCF\u884C\u53EF\u586B\u5199\u7684\u5185\u5BB9\u3002</p><button class="yyt-btn yyt-btn-secondary" data-twb-action="add-col">\u6DFB\u52A0\u5B57\u6BB5</button></div>`}
    </section>`}function lx(t,e){let s=t?.key||"",r=t?.title||s,o=e?.cells&&e.cells[s]!==void 0?e.cells[s]:"",n=t?.required?" *":"";return t?.type==="boolean"?`
      <label class="yyt-twb-field">
        <span>${v(r)}${n}</span>
        <select class="yyt-select" data-twb-cell="${v(s)}">
          <option value="" ${o===""?"selected":""}>\u2014</option>
          <option value="true" ${o==="true"?"selected":""}>\u662F</option>
          <option value="false" ${o==="false"?"selected":""}>\u5426</option>
        </select>
      </label>`:t?.type==="json"?`<label class="yyt-twb-field yyt-twb-span-2"><span>${v(r)}${n}</span><textarea class="yyt-textarea" rows="4" data-twb-cell="${v(s)}">${v(o)}</textarea></label>`:`<label class="yyt-twb-field ${t?.type==="text"&&String(o).length>80?"yyt-twb-span-2":""}"><span>${v(r)}${n}</span><input class="yyt-input" type="${t?.type==="number"?"number":"text"}" data-twb-cell="${v(s)}" value="${v(o)}" placeholder="${v(r)}"></label>`}function Fy(t,e,s){let r=e?.name||`__row_${s}`,o=t?.[r];return o?.__rowStatus==="new"?"new":o&&Object.entries(o).some(([n,a])=>n!=="__rowStatus"&&(a==="updated"||a==="new"))?"updated":""}function cx(t){return t==="new"?"\u65B0\u589E":t==="updated"?"\u5DF2\u66F4\u65B0":"\u624B\u52A8"}function dx(t,e){let s=Array.isArray(t?.columns)?t.columns:[],r=Array.isArray(t?.rows)?t.rows:[];return`
    <section class="yyt-panel-section yyt-twb-editor-section yyt-twb-rows-workspace">
      <div class="yyt-twb-section-header">
        <div><h4>\u6570\u636E\u884C</h4><p>\u5171 ${r.length} \u884C \xB7 \u6700\u8FD1 AI \u66F4\u65B0 ${r.filter((o,n)=>Fy(e,o,n)).length} \u884C</p></div>
        <button class="yyt-btn yyt-btn-secondary yyt-btn-small" data-twb-action="add-row">\u6DFB\u52A0\u884C</button>
      </div>
      <div class="yyt-twb-row-toolbar">
        <input class="yyt-input" placeholder="\u641C\u7D22\u884C\u540D\u6216\u5185\u5BB9" data-twb-row-search>
        <div class="yyt-twb-segmented" data-twb-field="rowFilter">
          <button class="active" data-twb-row-filter="all">\u5168\u90E8</button>
          <button data-twb-row-filter="new">\u65B0\u589E</button>
          <button data-twb-row-filter="updated">\u5DF2\u66F4\u65B0</button>
        </div>
      </div>
      ${r.length?`
        <div class="yyt-twb-row-list">
          ${r.map((o,n)=>{let a=Fy(e,o,n);return`
              <article class="yyt-twb-row-card${a?` row-${a}`:""}" data-twb-row data-twb-ri="${n}" data-twb-row-id="${v(o?.id||"")}">
                <header class="yyt-twb-row-card-header">
                  <div><span class="yyt-twb-row-index">\u7B2C ${n+1} \u884C</span><input class="yyt-input yyt-twb-row-name" data-twb-row-name value="${v(o?.name||"")}" placeholder="\u884C\u540D\uFF08\u53EF\u9009\uFF09"></div>
                  <div class="yyt-twb-row-actions">
                    <span class="yyt-tool-runtime-badge yyt-status-${a==="new"?"success":a==="updated"?"running":"idle"}">${cx(a)}</span>
                    <button class="yyt-btn yyt-btn-icon" data-twb-action="delete-row" data-twb-ri="${n}" title="\u5220\u9664\u6B64\u884C" aria-label="\u5220\u9664\u6B64\u884C"><i class="fa-solid fa-trash"></i></button>
                  </div>
                </header>
                <div class="yyt-twb-row-fields">${s.map(i=>lx(i,o)).join("")}</div>
              </article>`}).join("")}
        </div>`:`
        <div class="yyt-twb-empty"><h4>\u6682\u65E0\u6570\u636E\u884C</h4><p>\u53EF\u4EE5\u624B\u52A8\u6DFB\u52A0\u4E00\u884C\uFF0C\u6216\u70B9\u51FB"\u7ACB\u5373\u586B\u8868"\u8BA9 AI \u6839\u636E\u5F53\u524D\u5BF9\u8BDD\u751F\u6210\u3002</p><button class="yyt-btn yyt-btn-secondary" data-twb-action="add-row">\u6DFB\u52A0\u884C</button></div>`}
    </section>`}function ux(t,e,s){let o=(as({tables:Array.isArray(s.tables)?s.tables:[]}).issues||[]).filter(n=>n.tableIndex===e);return`
    <section class="yyt-twb-editor-section yyt-twb-diagnostics">
      <details>
        <summary>\u5355\u8868\u8BCA\u65AD <span class="yyt-twb-muted">${o.length} \u4E2A\u6821\u9A8C\u95EE\u9898 \xB7 JSON \u9884\u89C8</span></summary>
        <div class="yyt-twb-diagnostic-grid">
          <div>
            <h5>\u6821\u9A8C\u95EE\u9898</h5>
            ${o.length?`<div class="yyt-twb-pre">${v(o.map(n=>n.message).join(`
`))}</div>`:'<div class="yyt-twb-muted">\u6682\u65E0\u6821\u9A8C\u95EE\u9898\u3002</div>'}
          </div>
          <div>
            <h5>JSON \u9884\u89C8</h5>
            <pre class="yyt-twb-pre">${v(Yi(t||{}))}</pre>
          </div>
        </div>
      </details>
    </section>`}function yx(t){let e={tables:Array.isArray(t.tables)?t.tables:[]},r=as(e)?.summary?.errorCount||0;return`
    <section class="yyt-twb-editor-section yyt-twb-diagnostics">
      <details>
        <summary>${r>0?`\u9700\u8981\u5904\u7406\uFF1A${r} \u4E2A\u6821\u9A8C\u95EE\u9898`:"\u5168\u5C40\u9AD8\u7EA7\u8BBE\u7F6E\u4E0E\u8FD0\u884C\u8BCA\u65AD"}</summary>
        <div class="yyt-twb-diagnostic-body">
          ${Ju(qh(),t)}
          <div><h5>\u53D8\u91CF\u5E2E\u52A9</h5><pre class="yyt-twb-pre">${v(ot.getVariableHelp())}</pre></div>
        </div>
      </details>
    </section>`}function px(t,e,s,r){let n=(Array.isArray(t.tables)?t.tables:[])[e]||null;return!s||!n?'<aside class="yyt-twb-editor-drawer"></aside>':`
    <aside class="yyt-twb-editor-drawer is-open">
      <div class="yyt-twb-editor">
        <header class="yyt-twb-editor-header">
          <div>
            <h3>\u914D\u7F6E\u8868\u683C\uFF1A${v(de(n.name,`\u8868\u683C ${e+1}`))}</h3>
            <p>${v(Vh(n))} \xB7 ${v(Qn(t?.runtime?.lastStatus))}</p>
          </div>
          <button class="yyt-btn yyt-btn-icon" data-twb-action="close-table-editor" title="\u5173\u95ED" aria-label="\u5173\u95ED"><i class="fa-solid fa-xmark"></i></button>
        </header>
        <div class="yyt-twb-editor-body">
          ${nx(n)}
          ${ax(n)}
          ${ix(n)}
          ${dx(n,r)}
          ${ux(n,e,t)}
          ${yx(t)}
        </div>
        <footer class="yyt-twb-editor-footer">
          <button class="yyt-btn yyt-btn-secondary" data-twb-action="close-table-editor">\u5173\u95ED</button>
          <button class="yyt-btn yyt-btn-primary" data-twb-action="save">\u4FDD\u5B58\u8868\u683C</button>
        </footer>
      </div>
    </aside>`}function Ky(t,e){let s=Ye(t,e.lastLiveConfig);if(at(s),e.editorOpen=!1,e.lastLiveConfig){let r=Le(),o=Gi(r.tables,e.lastLiveConfig.tables,e.lastLiveConfig.__liveSourceKind||"exact");e.lastLiveConfig={...r,tables:o,__liveSourceKind:e.lastLiveConfig.__liveSourceKind||"exact"},e.renderTo(t,{config:e.lastLiveConfig})}else e.renderTo(t,{config:s})}var $o,Hh,Yy,fx,Vy=R(()=>{Ne();tr();Xu();Zu();J();Sn();go();Hr();_r();As();Ci();qi();Yn();Vn();pt();$o=I.createScope("TableWorkbench"),Hh=`${Nn} ${Qu()}

[data-twb-wb-selector] { margin-top:8px; padding:10px; border:1px solid var(--yyt-border); border-radius:6px; background:var(--yyt-surface-2); }
[data-twb-wb-list] { max-height:180px; overflow-y:auto; display:flex; flex-direction:column; gap:2px; }

.yyt-twb-template-list { margin:8px 0; max-height:160px; overflow-y:auto; display:flex; flex-direction:column; gap:4px; }
.yyt-twb-template-item { display:flex; align-items:center; gap:8px; padding:5px 8px; border-radius:6px; background:var(--yyt-surface-2); border:1px solid var(--yyt-border); }
.yyt-twb-template-item-name { flex:1; font-size:13px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
.yyt-twb-template-item-meta { font-size:11px; color:var(--yyt-text-muted); white-space:nowrap; }

.yyt-twb {
  position:relative;
  display:flex;
  flex-direction:column;
  gap:16px;
  min-height:620px;
  overflow:hidden;
}

.yyt-twb textarea { resize:vertical; }
.yyt-twb-dashboard { display:flex; flex-direction:column; gap:16px; min-height:0; overflow:auto; padding:0 2px 8px; }
.yyt-twb-dashboard-grid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:14px; align-items:start; }
.yyt-twb-card,
.yyt-twb-editor-section { min-width:0; }
.yyt-twb-runtime-card,
.yyt-twb-manual-card { grid-column:auto; }
.yyt-twb-card-header,
.yyt-twb-section-header { display:flex; justify-content:space-between; align-items:flex-start; gap:12px; margin-bottom:12px; }
.yyt-twb-card-header h3,
.yyt-twb-section-header h3,
.yyt-twb-section-header h4 { margin:0; color:var(--yyt-text); font-size:14px; letter-spacing:0.01em; }
.yyt-twb-section-header p,
.yyt-twb-card-header p { margin:4px 0 0; color:var(--yyt-text-secondary); font-size:12px; line-height:1.5; }
.yyt-twb-metrics { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:8px; }
.yyt-twb-metrics > div { padding:10px 11px; border:1px solid var(--yyt-border); border-radius:6px; background:var(--yyt-surface-2); }
.yyt-twb-metrics span { display:block; color:var(--yyt-text-muted); font-size:11px; margin-bottom:5px; }
.yyt-twb-metrics strong { color:var(--yyt-text); font-size:15px; font-weight:700; }
.yyt-twb-runtime-message { margin-top:10px; padding:9px 10px; border:1px solid var(--yyt-border); border-radius:6px; background:var(--yyt-surface-2); color:var(--yyt-text-secondary); font-size:12px; line-height:1.6; }

.yyt-twb-field { display:flex; flex-direction:column; gap:6px; margin:0 0 10px; min-width:0; }
.yyt-twb-field > span { color:var(--yyt-text-secondary); font-size:12px; font-weight:700; }
.yyt-twb-field small { color:var(--yyt-text-muted); font-size:11px; line-height:1.45; }
.yyt-twb-check-row,
.yyt-twb-radio-group label,
.yyt-twb-table-chip { display:flex; align-items:center; gap:8px; color:var(--yyt-text-secondary); font-size:12px; }
.yyt-twb-check-row { width:max-content; max-width:100%; }
.yyt-twb-radio-group { display:flex; flex-direction:column; gap:8px; margin-bottom:10px; }
.yyt-twb-radio-group label { width:max-content; max-width:100%; }
.yyt-twb-segmented { display:inline-flex; gap:4px; padding:3px; border:1px solid var(--yyt-border); border-radius:999px; background:var(--yyt-surface-2); }
.yyt-twb-segmented button { border:none; border-radius:999px; padding:6px 11px; background:transparent; color:var(--yyt-text-secondary); cursor:pointer; font-size:12px; font-weight:700; }
.yyt-twb-segmented button.active { background:var(--yyt-accent); color:#fff; }
.yyt-twb-action-grid { display:flex; flex-wrap:wrap; gap:8px; }
.yyt-twb-table-chip-list { display:flex; flex-wrap:wrap; gap:8px; margin:10px 0; }
.yyt-twb-table-chip { max-width:220px; padding:6px 10px; border:1px solid var(--yyt-border); border-radius:999px; background:var(--yyt-surface-2); }
.yyt-twb-table-chip span { min-width:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
.yyt-twb-muted { color:var(--yyt-text-muted); font-size:12px; }
.yyt-twb-help { margin:0; color:var(--yyt-text-secondary); font-size:12px; line-height:1.6; }
.yyt-twb-prompt-summary { cursor:pointer; font-weight:700; padding:8px 0; display:none; }
.yyt-twb-prompt-field { margin-top:10px; }

.yyt-twb-table-overview { border:1px solid var(--yyt-border); border-radius:8px; background:var(--yyt-surface); padding:14px; }
.yyt-twb-table-card-list { display:flex; flex-direction:column; gap:8px; }
.yyt-twb-table-card { display:grid; grid-template-columns:minmax(0,1fr) auto; gap:12px; padding:12px; border:1px solid var(--yyt-border); border-radius:6px; background:var(--yyt-surface-2); cursor:pointer; }
.yyt-twb-table-card:hover,
.yyt-twb-table-card:focus-within { border-color:var(--yyt-accent); }
.yyt-twb-table-card.is-active { border-color:var(--yyt-accent); box-shadow:inset 3px 0 0 var(--yyt-accent); }
.yyt-twb-table-card-main { min-width:0; }
.yyt-twb-table-copy { min-width:0; }
.yyt-twb-table-card-main h4 { margin:0; color:var(--yyt-text); font-size:14px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
.yyt-twb-table-card-main p { margin:5px 0 0; color:var(--yyt-text-secondary); font-size:12px; line-height:1.5; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
.yyt-twb-table-card-meta { color:var(--yyt-text-muted); font-size:12px; margin-top:7px; }
.yyt-twb-table-card-meta.is-warning { color:#f6ad55; }
.yyt-twb-table-card-actions { display:flex; align-items:center; justify-content:flex-end; gap:8px; flex-wrap:wrap; }
.yyt-twb-empty { padding:24px; border:1px dashed var(--yyt-border); border-radius:8px; color:var(--yyt-text-secondary); background:var(--yyt-surface-2); text-align:center; }
.yyt-twb-live-badge { display:inline-block; padding:1px 7px; border-radius:999px; font-size:11px; font-weight:700; }
.yyt-twb-live-badge--live { background:rgba(56,178,172,.15); color:#38b2ac; }
.yyt-twb-live-badge--template { background:rgba(160,174,192,.15); color:#a0aec0; }
.yyt-twb-empty h4 { margin:0 0 6px; color:var(--yyt-text); font-size:15px; }
.yyt-twb-empty p { margin:0 0 14px; font-size:12px; line-height:1.6; }

.yyt-twb-editor-drawer { position:absolute; inset:0 0 0 auto; width:min(920px,92%); background:rgba(8,12,18,0.72); backdrop-filter:blur(10px); border-left:1px solid var(--yyt-border); transform:translateX(100%); transition:transform 180ms ease; z-index:20; box-shadow:-18px 0 40px rgba(0,0,0,0.22); }
.yyt-twb-editor-drawer.is-open { transform:translateX(0); }
.yyt-twb-editor { height:100%; display:flex; flex-direction:column; background:var(--yyt-surface); }
.yyt-twb-editor-header,
.yyt-twb-editor-footer { display:flex; justify-content:space-between; align-items:flex-start; gap:12px; padding:16px 18px; border-bottom:1px solid var(--yyt-border); background:var(--yyt-surface); }
.yyt-twb-editor-footer { border-top:1px solid var(--yyt-border); border-bottom:none; justify-content:flex-end; }
.yyt-twb-editor-header h3 { margin:0; color:var(--yyt-text); font-size:17px; }
.yyt-twb-editor-header p { margin:4px 0 0; color:var(--yyt-text-secondary); font-size:12px; }
.yyt-twb-editor-body { overflow:auto; padding:18px; display:flex; flex-direction:column; gap:16px; }

.yyt-twb-ai-grid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:10px; }
.yyt-twb-field-card-list { display:flex; flex-direction:column; gap:10px; }
.yyt-twb-field-card { display:grid; grid-template-columns:minmax(0,1fr) auto; gap:10px; padding:12px; border:1px solid var(--yyt-border); border-radius:6px; background:var(--yyt-surface-2); }
.yyt-twb-field-card-main { display:grid; grid-template-columns:220px minmax(0,1fr); gap:10px; align-items:start; }
.yyt-twb-field-advanced { grid-column:1 / -1; border-top:1px dashed var(--yyt-border); padding-top:8px; }
.yyt-twb-field-advanced summary { cursor:pointer; color:var(--yyt-text-secondary); font-size:12px; font-weight:700; padding:6px 0; }
.yyt-twb-advanced-grid { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:10px; margin-top:10px; }

.yyt-twb-row-toolbar { display:flex; gap:8px; margin-bottom:12px; align-items:center; flex-wrap:wrap; }
.yyt-twb-row-toolbar .yyt-input { flex:1; min-width:180px; }
.yyt-twb-row-list { display:flex; flex-direction:column; gap:12px; }
.yyt-twb-row-card { border:1px solid var(--yyt-border); border-radius:6px; background:var(--yyt-surface-2); padding:14px; }
.yyt-twb-row-card.row-new { border-color:#48bb78; }
.yyt-twb-row-card.row-updated { border-color:#f6ad55; }
.yyt-twb-row-card.row-deleted { border-color:#f56565; opacity:0.72; }
.yyt-twb-row-card-header { display:flex; justify-content:space-between; gap:12px; margin-bottom:12px; align-items:flex-start; }
.yyt-twb-row-card-header > div:first-child { display:flex; align-items:center; gap:9px; min-width:0; flex:1; }
.yyt-twb-row-index { display:inline-flex; align-items:center; justify-content:center; height:28px; padding:0 9px; border:1px solid var(--yyt-border); border-radius:999px; background:var(--yyt-surface); color:var(--yyt-text-secondary); font-size:11px; font-weight:700; white-space:nowrap; }
.yyt-twb-row-name { max-width:280px; }
.yyt-twb-row-actions { display:flex; align-items:center; gap:8px; }
.yyt-twb-row-fields { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:10px; }
.yyt-twb-span-2 { grid-column:span 2; }
.yyt-twb-diagnostics details { border:1px solid var(--yyt-border); border-radius:6px; background:var(--yyt-surface-2); overflow:hidden; }
.yyt-twb-diagnostics summary { cursor:pointer; padding:11px 12px; color:var(--yyt-text-secondary); font-size:12px; font-weight:700; }
.yyt-twb-diagnostic-grid { display:grid; grid-template-columns:minmax(220px,0.8fr) minmax(0,1.2fr); gap:12px; padding:0 12px 12px; }
.yyt-twb-diagnostic-body { padding:0 12px 12px; display:flex; flex-direction:column; gap:12px; }
.yyt-twb-diagnostic-grid h5,
.yyt-twb-diagnostic-body h5 { margin:0 0 8px; color:var(--yyt-text); font-size:12px; }
.yyt-twb-pre { margin:0; padding:10px; max-height:260px; overflow:auto; white-space:pre-wrap; word-break:break-word; border:1px solid var(--yyt-border); border-radius:6px; background:var(--yyt-surface); color:var(--yyt-text-secondary); font-family:'Fira Code','Consolas',monospace; font-size:11px; line-height:1.6; }

@media (max-width:980px) {
  .yyt-twb-dashboard-grid { grid-template-columns:1fr; }
  .yyt-twb-metrics { grid-template-columns:repeat(2,minmax(0,1fr)); }
  .yyt-twb-table-card { grid-template-columns:1fr; }
  .yyt-twb-table-card-actions { justify-content:flex-start; }
  .yyt-twb-editor-drawer { width:100%; }
  .yyt-twb-ai-grid,
  .yyt-twb-field-card-main,
  .yyt-twb-advanced-grid,
  .yyt-twb-diagnostic-grid { grid-template-columns:1fr; }
  .yyt-twb-span-2 { grid-column:1 / -1; }
}

@media (max-width:640px) {
  .yyt-twb { gap:12px; }
  .yyt-twb-dashboard { padding:0; }
  .yyt-twb-metrics,
  .yyt-twb-row-fields { grid-template-columns:1fr; }
  .yyt-twb-table-card-main,
  .yyt-twb-row-card-header,
  .yyt-twb-row-card-header > div:first-child { flex-direction:column; align-items:flex-start; }
  .yyt-twb-row-name { max-width:none; width:100%; }
  .yyt-twb-row-actions,
  .yyt-twb-row-toolbar { width:100%; }
  .yyt-twb-row-toolbar .yyt-input,
  .yyt-twb-segmented { width:100%; }
  .yyt-twb-segmented button { flex:1; }
  .yyt-twb-editor-header,
  .yyt-twb-editor-footer { padding:14px; }
  .yyt-twb-editor-body { padding:14px; }
}
`;Yy={id:"tableWorkbenchPanel",currentTableIndex:0,editorOpen:!1,lastDiff:null,pendingTemplateApplyId:"",_pendingDeleteTemplateId:"",availableWorldbooks:[],worldbookLoadState:"idle",render({config:t}={}){let e=t&&typeof t=="object"?t:Le(),s=Array.isArray(e.tables)?e.tables:[];this.currentTableIndex=At(s,e.__activeTableIndex??this.currentTableIndex);let r=this.currentTableIndex;return`
      <div class="yyt-tool-panel yyt-twb" data-tool-id="tableWorkbench">
        ${Jh(e)}
        ${ox(e)}
        ${px(e,r,this.editorOpen,this.lastDiff?.[r])}
      </div>`},bindEvents(t){let e=U();if(!e||!X(t))return;let s=this;t.off(".twb"),this._subscribeChatChanged(t),t.on("change.twb",'[data-twb-field="worldbooksEnabled"]',function(){let r=e(this).is(":checked");t.find("[data-twb-wb-selector]").toggleClass("yyt-hidden",!r),r&&s.availableWorldbooks.length===0&&s.worldbookLoadState==="idle"&&s._loadTableWorldbooks(t)}),t.on("change.twb",'[data-twb-field="worldbookSyncEnabled"]',function(){let r=e(this).is(":checked");t.find("[data-twb-wbsync-opts]").toggleClass("yyt-hidden",!r),r&&s.availableWorldbooks.length===0&&s.worldbookLoadState==="idle"&&s._loadTableWorldbooks(t),r&&s.availableWorldbooks.length>0&&s._renderWorldbookSyncTargetSelect(t)}),t.on("change.twb","[data-twb-wb-item]",function(){s._updateWorldbookSummary(t)}),t.on("click.twb",'[data-twb-action="open-table-editor"]',function(r){r.stopPropagation();let o=Ye(t,s.lastLiveConfig),n=Number(e(this).attr("data-twb-ti"));o.__activeTableIndex=n,s.currentTableIndex=At(o.tables,n),s.editorOpen=!0,s.renderTo(t,{config:o})}),t.on("click.twb",'[data-twb-action="close-table-editor"]',function(){Ky(t,s)}),t.on("keydown.twb",function(r){r.key==="Escape"&&s.editorOpen&&(r.stopPropagation(),Ky(t,s))}),t.on("click.twb","[data-twb-select]",function(){let r=Number(e(this).attr("data-twb-select")),o=Ye(t,s.lastLiveConfig);o.__activeTableIndex=r,s.currentTableIndex=At(o.tables,r),s.renderTo(t,{config:o})}),t.on("click.twb",'[data-twb-action="add-table"]',function(r){r.stopPropagation();let o=Ye(t,s.lastLiveConfig),n=Array.isArray(o.tables)?[...o.tables]:[];n.push(Oi(n.length+1)),o.tables=n,o.__activeTableIndex=n.length-1,at(o),s.currentTableIndex=n.length-1,s.editorOpen=!0,s.renderTo(t,{config:o})}),t.on("click.twb",'[data-twb-action="delete-table"]',async function(r){r.stopPropagation();let o=Number(e(this).attr("data-twb-ti")),n=Ye(t),a=Array.isArray(n.tables)?[...n.tables]:[];if(o<0||o>=a.length)return;let i=a[o]?.name||`\u8868\u683C ${o+1}`;if(!await De("\u5220\u9664\u8868\u683C",`\u786E\u5B9A\u8981\u5220\u9664\u300C${i}\u300D\u5417\uFF1F\u6B64\u64CD\u4F5C\u4E0D\u53EF\u64A4\u9500\u3002`,{danger:!0}))return;a.splice(o,1);let l=At(a,o>0?o-1:0);n.tables=a,n.__activeTableIndex=l,at(n),s.currentTableIndex=l,s.editorOpen=!1,s.renderTo(t,{config:n})}),t.on("click.twb",'[data-twb-action="save"]',()=>{let r=Ye(t),o=at(r);o.success?(k("success","\u5DF2\u4FDD\u5B58"),s.renderTo(t,{config:o.config})):ce("warning",o.error||"\u4FDD\u5B58\u5931\u8D25",{duration:4e3,noticeId:"twb-save"})}),t.on("click.twb",'[data-twb-action="run"], [data-twb-action="run-selected"], [data-twb-action="run-table"]',async function(){let r=e(this).attr("data-twb-action"),o=Number(e(this).attr("data-twb-ti")),n=Ye(t);if(Number.isInteger(o)){n.__activeTableIndex=o;let i=Array.isArray(n.tables)?n.tables[o]:null;i&&(n.scope={...n.scope||{},activeTableId:Xn(i,o)})}r==="run-selected"?(n.runScope="selected",n.scope={...n.scope||{},mode:"selected"}):r==="run-table"&&(n.runScope="current",n.scope={...n.scope||{},mode:"current"});let a=at(n);if(!a.success){ce("warning",a.error||"\u4FDD\u5B58\u5931\u8D25",{duration:4e3,noticeId:"twb-save"});return}try{e(this).prop("disabled",!0).text("\u586B\u8868\u4E2D...");let i=await zy(a.config);if(!i?.success)ce("warning",i?.error||"\u586B\u8868\u5931\u8D25",{duration:4e3,noticeId:"twb-run"});else{s.lastDiff=i.diff||null;let l=i.fillMode==="incremental"?"\u589E\u91CF":"\u5168\u91CF",c=i.scopeStats,d="";if(c&&(c.droppedByScope>0||c.droppedByLock>0)){let u=[];c.droppedByScope>0&&u.push(`${c.droppedByScope} \u6761\u56E0 scope \u8FC7\u6EE4`),c.droppedByLock>0&&u.push(`${c.droppedByLock} \u6761\u56E0\u9501\u5B9A\u8FC7\u6EE4`),d=`\uFF0C${u.join("\u3001")}`}i.warning?ce("warning",`\u586B\u8868\u5B8C\u6210 (${l}${d})\uFF0C\u955C\u50CF\u5931\u8D25: ${i.warning}`,{duration:4200,noticeId:"twb-run"}):ce("success",`\u586B\u8868\u5B8C\u6210 (${l}${d})`,{duration:2800,noticeId:"twb-run"})}if(i?.success||i?.nextTables){let l=Le(),c=i.nextTables||i.state?.tables||[];$o.debug("nextTables",c.map(u=>({id:u?.id,key:u?.key,name:u?.name,rowCount:u?.rows?.length}))),$o.debug("configTables",l.tables?.map(u=>({id:u?.id,key:u?.key,name:u?.name,rowCount:u?.rows?.length})));let d=Gi(l.tables,c,"exact");$o.debug("mergedTables",d.map(u=>({id:u?.id,key:u?.key,name:u?.name,rowCount:u?.rows?.length,source:u?.__liveSourceKind}))),s.lastLiveConfig={...l,tables:d,__liveSourceKind:"exact"},s.lastLiveTarget=i.targetSnapshot||null}}catch(i){k("error",i?.message||"\u586B\u8868\u5931\u8D25")}finally{s.renderTo(t,{config:s.lastLiveConfig||void 0})}}),t.on("click.twb",'[data-twb-action="add-row"]',()=>{let r=Ye(t),o=At(r.tables,s.currentTableIndex),n=Array.isArray(r.tables)?[...r.tables]:[];if(!n[o])return;let a={...n[o]};a.rows=Array.isArray(a.rows)?[...a.rows]:[];let i=qn(a.columns||[],a.rows.length+1);a.rows.push(i),n[o]=a,r.tables=n,r.__activeTableIndex=o,at(r),s.renderTo(t,{config:r})}),t.on("click.twb",'[data-twb-action="delete-row"]',function(){let r=Number(e(this).attr("data-twb-ri")),o=Ye(t),n=At(o.tables,s.currentTableIndex),a=Array.isArray(o.tables)?[...o.tables]:[];if(!a[n]||r<0||r>=(a[n].rows?.length||0))return;let i={...a[n]};i.rows=Array.isArray(i.rows)?[...i.rows]:[],i.rows.splice(r,1),a[n]=i,o.tables=a,o.__activeTableIndex=n,at(o),s.renderTo(t,{config:o})}),t.on("click.twb",'[data-twb-action="add-col"]',()=>{let r=Ye(t),o=At(r.tables,s.currentTableIndex),n=Array.isArray(r.tables)?[...r.tables]:[];if(!n[o])return;let a={...n[o]};a.columns=Array.isArray(a.columns)?[...a.columns]:[];let i=a.columns.length+1,l=Hn(i,a.columns);a.columns.push(l),n[o]=a,r.tables=n,r.__activeTableIndex=o,at(r),s.renderTo(t,{config:r})}),t.on("click.twb",'[data-twb-action="delete-col"]',async function(){let r=e(this).attr("data-twb-ci"),o=Ye(t),n=At(o.tables,s.currentTableIndex),a=Array.isArray(o.tables)?[...o.tables]:[];if(!a[n])return;let i=a[n].columns?.find(d=>d.key===r),l=i?.name||i?.key||"\u6B64\u5B57\u6BB5";if(!await De("\u5220\u9664\u5B57\u6BB5",`\u786E\u5B9A\u8981\u5220\u9664\u300C${l}\u300D\u5417\uFF1F\u5173\u8054\u7684\u5355\u5143\u683C\u6570\u636E\u4E5F\u5C06\u88AB\u79FB\u9664\u3002`,{danger:!0}))return;let c={...a[n]};c.columns=Array.isArray(c.columns)?[...c.columns]:[],c.columns=c.columns.filter(d=>d.key!==r),c.rows=(c.rows||[]).map(d=>{let u={...d.cells||{}};return delete u[r],{...d,cells:u}}),a[n]=c,o.tables=a,o.__activeTableIndex=n,at(o),s.renderTo(t,{config:o})}),t.on("contextmenu.twb","[data-twb-row]",function(r){r.preventDefault();let o=Number(e(this).attr("data-twb-ri"));new Co().show(r.clientX,r.clientY,{rowIndex:o,onAction(a){if(a==="insert-row-above"||a==="insert-row-below"){let i=a==="insert-row-above"?o:o+1,l=Ye(t),c=At(l.tables,s.currentTableIndex),d=Array.isArray(l.tables)?[...l.tables]:[];if(!d[c])return;let u={...d[c]};u.rows=Array.isArray(u.rows)?[...u.rows]:[];let p=qn(u.columns||[],u.rows.length+1);u.rows.splice(Math.max(i,0),0,p),d[c]=u,l.tables=d,l.__activeTableIndex=c,at(l),s.renderTo(t,{config:l})}else a==="delete-row"&&t.find(`[data-twb-action="delete-row"][data-twb-ri="${o}"]`).trigger("click")}})}),t.on("click.twb","[data-twb-row-filter]",function(){let r=e(this).attr("data-twb-row-filter");t.find("[data-twb-row-filter]").removeClass("active"),e(this).addClass("active"),t.find("[data-twb-row]").each(function(){let o=r==="all"||e(this).hasClass(`row-${r}`);e(this).toggle(o)})}),t.on("input.twb","[data-twb-row-search]",function(){let r=String(e(this).val()||"").toLowerCase().trim();t.find("[data-twb-row]").each(function(){e(this).toggle(!r||e(this).text().toLowerCase().includes(r))})}),t.on("click.twb",'[data-twb-action="apply-template"]',function(){let r=Ye(t),o=de(r.activeTemplate,""),n=Eo().find(l=>l.id===o);if(!n){ce("warning","\u8BF7\u5148\u5728\u4E0B\u62C9\u5217\u8868\u4E2D\u9009\u62E9\u4E00\u4E2A\u6A21\u677F\u3002",{duration:3e3,noticeId:"twb-template"});return}if(Array.isArray(r.tables)&&r.tables.length>0&&s.pendingTemplateApplyId!==o){s.pendingTemplateApplyId=o,ce("warning",'\u5E94\u7528\u6A21\u677F\u4F1A\u66FF\u6362\u5F53\u524D\u8868\u683C\u3002\u518D\u6B21\u70B9\u51FB"\u5E94\u7528\u6A21\u677F"\u786E\u8BA4\u3002',{duration:4200,noticeId:"twb-template"});return}let i=Ku(o);s.pendingTemplateApplyId="",s.currentTableIndex=0,s.editorOpen=!1,i.success?(ce("success",`\u5DF2\u5E94\u7528\u6A21\u677F\uFF1A${n.name}`,{duration:2800,noticeId:"twb-template"}),s.renderTo(t,{config:i.config})):ce("warning",i.error||"\u5E94\u7528\u6A21\u677F\u5931\u8D25",{duration:4e3,noticeId:"twb-template"})}),t.on("click.twb",'[data-twb-action="save-template"]',async function(){let r=Ye(t),o=`${de(r.tables?.[0]?.name,"\u586B\u8868\u6A21\u677F")} ${new Date().toLocaleString()}`,n=await ka("\u4FDD\u5B58\u6A21\u677F","\u8BF7\u8F93\u5165\u6A21\u677F\u540D\u79F0",{defaultValue:o});if(!n)return;let a=at(r);if(!a.success){ce("warning",a.error||"\u4FDD\u5B58\u914D\u7F6E\u5931\u8D25",{duration:4e3,noticeId:"twb-template"});return}let i=Wu({name:n,description:"\u4ECE\u586B\u8868\u5DE5\u4F5C\u53F0\u4FDD\u5B58\u3002"});i.success?(ce("success",`\u5DF2\u4FDD\u5B58\u6A21\u677F\uFF1A${i.template.name}`,{duration:2800,noticeId:"twb-template"}),s.renderTo(t)):ce("warning",i.error||"\u4FDD\u5B58\u6A21\u677F\u5931\u8D25",{duration:4e3,noticeId:"twb-template"})}),t.on("click.twb",'[data-twb-action="delete-template"]',function(){let r=de(e(this).attr("data-twb-template-id"),"");if(!r)return;let o=Eo().find(a=>a.id===r);if(!o){ce("warning","\u6A21\u677F\u4E0D\u5B58\u5728\u3002",{duration:3e3,noticeId:"twb-template"});return}if(s._pendingDeleteTemplateId!==r){s._pendingDeleteTemplateId=r,ce("warning",`\u786E\u8BA4\u5220\u9664\u6A21\u677F"${o.name}"\uFF1F\u518D\u6B21\u70B9\u51FB\u5220\u9664\u6309\u94AE\u786E\u8BA4\u3002`,{duration:4200,noticeId:"twb-template"});return}s._pendingDeleteTemplateId="";let n=Au(r);n.success?(ce("success","\u5DF2\u5220\u9664\u6A21\u677F\u3002",{duration:2800,noticeId:"twb-template"}),s.renderTo(t)):ce("warning",n.error||"\u5220\u9664\u5931\u8D25",{duration:4e3,noticeId:"twb-template"})}),t.on("click.twb",'[data-twb-action="export-template"]',function(){let r=Ye(t),o=de(Eo().find(a=>a.id===r.activeTemplate)?.name,"\u5F53\u524D\u586B\u8868\u6A21\u677F"),n={version:1,exportedAt:new Date().toISOString(),template:{id:de(r.activeTemplate,""),name:o,description:"YouYou Toolkit \u586B\u8868\u6A21\u677F\u5BFC\u51FA\u3002",tables:r.tables||[],promptTemplate:r.promptTemplate||""}};zt(Yi(n),`youyou_table_template_${Date.now()}.json`),ce("success","\u6A21\u677F\u5DF2\u5BFC\u51FA\u4E3A\u6587\u4EF6\u3002",{duration:2800,noticeId:"twb-template"})}),t.on("click.twb",'[data-twb-action="export-all-templates"]',function(){let r=Eu();if(!r.templates||r.templates.length===0){ce("warning","\u6CA1\u6709\u7528\u6237\u6A21\u677F\u53EF\u5BFC\u51FA\u3002",{duration:3e3,noticeId:"twb-template"});return}zt(Yi(r),`youyou_table_templates_all_${Date.now()}.json`),ce("success",`\u5DF2\u5BFC\u51FA ${r.templates.length} \u4E2A\u7528\u6237\u6A21\u677F\u3002`,{duration:2800,noticeId:"twb-template"})}),t.on("click.twb",'[data-twb-action="import-template"]',function(){t.find("[data-twb-import-file]").val("").trigger("click")}),t.on("change.twb","[data-twb-import-file]",async function(){let r=this.files?.[0];if(r)try{let o=await Vt(r),n=JSON.parse(o),a=Cu(n,{overwrite:!1});a.imported>0?(ce("success",`\u5DF2\u5BFC\u5165 ${a.imported} \u4E2A\u6A21\u677F${a.skipped?`\uFF0C\u8DF3\u8FC7 ${a.skipped} \u4E2A\u5DF2\u5B58\u5728`:""}\u3002`,{duration:3500,noticeId:"twb-template"}),s.renderTo(t)):a.skipped>0?ce("warning",`${a.skipped} \u4E2A\u6A21\u677F\u5DF2\u5B58\u5728\uFF0C\u5168\u90E8\u8DF3\u8FC7\u3002`,{duration:3500,noticeId:"twb-template"}):ce("warning",a.errors?.[0]||"\u672A\u5BFC\u5165\u4EFB\u4F55\u6A21\u677F\u3002",{duration:4e3,noticeId:"twb-template"})}catch(o){ce("warning",o?.message||"\u6A21\u677F\u6587\u4EF6\u89E3\u6790\u5931\u8D25",{duration:4e3,noticeId:"twb-template"})}}),t.on("change.twb",'[data-twb-field="bypassEnabled"]',function(){t.find(".yyt-twb-bypass-preset").toggleClass("yyt-hidden",!e(this).is(":checked"))}),t.on("blur.twb change.twb","[data-twb-name], [data-twb-note], [data-twb-table-instruction], [data-twb-col] input, [data-twb-col] select, [data-twb-col] textarea, [data-twb-row] input, [data-twb-row] select, [data-twb-row] textarea, [data-twb-field]",function(){let r=Ye(t);at(r)})},destroy(t){!U()||!X(t)||(Co.destroy(),t.off(".twb"),typeof this._chatChangedUnsubscribe=="function"&&this._chatChangedUnsubscribe(),this._clearLiveCache())},getStyles(){return Hh},lastLiveConfig:null,lastLiveTarget:null,_liveRefreshPending:!1,_chatChangedUnsubscribe:null,_clearLiveCache(){this.lastLiveConfig=null,this.lastLiveTarget=null},_subscribeChatChanged(t){if(this._chatChangedUnsubscribe)return;let e=()=>{this._clearLiveCache(),X(t)&&this.renderTo(t)},s=st.subscribe(Ce.CHAT_CHANGED,e);this._chatChangedUnsubscribe=()=>{try{s()}catch{}this._chatChangedUnsubscribe=null}},async _loadTableWorldbooks(t){this.worldbookLoadState="loading",this._renderWorldbookList(t);try{let{getAvailableWorldbooks:e}=await Promise.resolve().then(()=>(ro(),yc)),s=await e();this.availableWorldbooks=Array.isArray(s)?s:[]}catch{this.availableWorldbooks=[]}this.worldbookLoadState="ready",this._renderWorldbookList(t),this._renderWorldbookSyncTargetSelect(t)},_renderWorldbookList(t){let e=U(),s=t.find("[data-twb-wb-list]");if(!s.length)return;let r=this.lastLiveConfig||Le(),o=new Set(Array.isArray(r.worldbooks?.selected)?r.worldbooks.selected:[]),n=this.availableWorldbooks;if(this.worldbookLoadState==="loading"){s.html('<div style="padding:6px;color:var(--yyt-text-muted);font-size:12px">\u4E16\u754C\u4E66\u52A0\u8F7D\u4E2D\u2026</div>');return}if(n.length===0){s.html('<div style="padding:6px;color:var(--yyt-text-muted);font-size:12px">\u65E0\u53EF\u7528\u4E16\u754C\u4E66\u3002</div>');return}s.html(n.map(a=>`<label class="yyt-twb-check-row" style="margin-bottom:4px">
      <input type="checkbox" data-twb-wb-item data-twb-wb-name="${v(a)}" ${o.has(a)?"checked":""}>
      <span>${v(a)}</span>
    </label>`).join(""))},_updateWorldbookSummary(t){let e=U(),s=[];t.find("[data-twb-wb-item]:checked").each(function(){let r=String(e(this).attr("data-twb-wb-name")||"").trim();r&&s.push(r)})},_renderWorldbookSyncTargetSelect(t){let e=U(),s=t.find('[data-twb-field="worldbookSyncTarget"]');if(!s.length)return;let o=(this.lastLiveConfig||Le()).worldbookSync?.targetBook||"",n=this.availableWorldbooks;s.html(`<option value="">\u8BF7\u9009\u62E9\u2026</option>${n.map(a=>`<option value="${v(a)}" ${a===o?"selected":""}>${v(a)}</option>`).join("")}`)},async _refreshLiveState(t){if(!this._liveRefreshPending){this._liveRefreshPending=!0;try{let e=await zi({runSource:"MANUAL_TABLE"});if($o.debug("_refreshLiveState targetSnapshot",e?{sourceMessageId:e.sourceMessageId,slotBindingKey:e.slotBindingKey,slotRevisionKey:e.slotRevisionKey,chatId:e.chatId}:null),!e){this._clearLiveCache();return}let s=iy(e);if($o.debug("_refreshLiveState boundState",s?{hasTables:Array.isArray(s.tables),tableCount:s.tables?.length,rowCounts:s.tables?.map(a=>a?.rows?.length),sourceKind:s.meta?.sourceKind}:null),!s||!Array.isArray(s.tables)||s.tables.length===0){this.lastLiveTarget=e,this.lastLiveConfig&&(this.lastLiveConfig=null,X(t)&&this.renderTo(t,{config:Le(),_skipRefresh:!0}));return}let r=Le(),o=s.meta?.sourceKind||"exact",n=Gi(r.tables,s.tables,o);this.lastLiveConfig={...r,tables:n,__liveSourceKind:o},this.lastLiveTarget=e,X(t)&&this.renderTo(t,{config:this.lastLiveConfig,_skipRefresh:!0})}catch{}finally{this._liveRefreshPending=!1}}},renderTo(t,{config:e,_skipRefresh:s}={}){if(!U()||!X(t))return;let o=e&&typeof e=="object"?e:this.lastLiveConfig||Le();this.currentTableIndex=At(o.tables,o.__activeTableIndex??this.currentTableIndex),t.html(this.render({config:o})),this.bindEvents(t),o.worldbooks?.enabled&&this.availableWorldbooks.length>0?this._renderWorldbookList(t):o.worldbooks?.enabled&&this.worldbookLoadState==="idle"&&this._loadTableWorldbooks(t),o.worldbookSync?.enabled&&this.availableWorldbooks.length>0?this._renderWorldbookSyncTargetSelect(t):o.worldbookSync?.enabled&&this.worldbookLoadState==="idle"&&this._loadTableWorldbooks(t),!e&&!s&&this._refreshLiveState(t)}},fx=Yy});var Xy={};te(Xy,{LoggerPanel:()=>Jy,default:()=>xx});function bx(t){switch(t){case ae.DEBUG:return"yyt-log-debug";case ae.INFO:return"yyt-log-info";case ae.WARN:return"yyt-log-warn";case ae.ERROR:return"yyt-log-error";default:return""}}function hx(t){let e=new Date(t),s=r=>String(r).padStart(2,"0");return`${s(e.getHours())}:${s(e.getMinutes())}:${s(e.getSeconds())}.${String(e.getMilliseconds()).padStart(3,"0")}`}var gx,mx,Jy,xx,Qy=R(()=>{J();Me();Ne();gx="yyt-logger-panel",mx=[{level:null,label:"\u5168\u90E8",icon:"fa-list"},{level:ae.DEBUG,label:"DEBUG",icon:"fa-bug"},{level:ae.INFO,label:"INFO",icon:"fa-circle-info"},{level:ae.WARN,label:"WARN",icon:"fa-triangle-exclamation"},{level:ae.ERROR,label:"ERROR",icon:"fa-circle-exclamation"}];Jy={id:"loggerPanel",render(){let t=I.getStats();return`
      <div class="yyt-logger-panel" id="${gx}">
        <div class="yyt-logger-toolbar">
          <div class="yyt-logger-filter-btns" data-yyt-log-filter-group>
            ${mx.map((e,s)=>`<button class="yyt-log-filter-btn ${s===0?"yyt-active":""}" data-level="${e.level??""}">
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
    `},bindEvents(t){let e=U();if(!e||!X(t))return;let s=this,r=null,o=!1,n=[],a=t.find("[data-yyt-log-list]"),i=t.find("[data-yyt-log-search]"),l=t.find("[data-yyt-log-autoscroll]"),c=t.find("[data-yyt-log-pause]");function d(y){if(!y.length){a.html('<div class="yyt-logger-empty">\u6682\u65E0\u5339\u914D\u7684\u65E5\u5FD7\u8BB0\u5F55</div>');return}a.html(y.map(f=>`
        <div class="yyt-log-entry ${bx(f.level)}" data-log-id="${f.id}">
          <span class="yyt-log-time">${hx(f.timestamp)}</span>
          <span class="yyt-log-level">${I.levelLabel(f.level)}</span>
          <span class="yyt-log-scope">${v(f.scope)}</span>
          <span class="yyt-log-msg">${v(f.message)}</span>
          ${f.data!==void 0?`<span class="yyt-log-data">${v(typeof f.data=="object"?JSON.stringify(f.data):String(f.data))}</span>`:""}
        </div>
      `).join(""))}function u(){let y=i.val()?.trim()||"",{entries:f}=I.getEntries({level:r,search:y||void 0,limit:500});d(f),l.is(":checked")&&requestAnimationFrame(()=>{a[0].scrollTop=a[0].scrollHeight})}function p(){if(o||!n.length)return;let y=n;n=[],u()}this._onLogEntry=y=>{if(o||r!==null&&y.level<r)return;let f=i.val()?.trim().toLowerCase()||"";if(f){let x=y.scope.toLowerCase().includes(f),h=y.message.toLowerCase().includes(f);if(!x&&!h)return}n.push(y),n.length>=50?p():this._flushTimer||(this._flushTimer=setTimeout(()=>{this._flushTimer=null,p(),s._updateStats(t)},250))},P.on("logger:entry",this._onLogEntry),t.on("click.yytLogger","[data-yyt-log-filter-group] .yyt-log-filter-btn",y=>{t.find("[data-yyt-log-filter-group] .yyt-log-filter-btn").removeClass("yyt-active"),e(y.currentTarget).addClass("yyt-active");let f=e(y.currentTarget).data("level");r=f===""?null:f,u(),s._updateStats(t)}),i.on("input.yytLogger",()=>{u()}),t.on("click.yytLogger","[data-yyt-log-pause]",()=>{o=!o,c.toggleClass("yyt-active",o),c.html(o?'<i class="fa-solid fa-play"></i> \u7EE7\u7EED':'<i class="fa-solid fa-pause"></i> \u6682\u505C'),o||(n=[],u(),s._updateStats(t))}),t.on("click.yytLogger","[data-yyt-log-clear]",()=>{I.clear(),a.html('<div class="yyt-logger-empty">\u65E5\u5FD7\u5DF2\u6E05\u9664</div>'),s._updateStats(t)}),t.on("click.yytLogger","[data-yyt-log-export]",()=>{let{entries:y}=I.getEntries({limit:1e4}),f=JSON.stringify(y.map(T=>({time:new Date(T.timestamp).toISOString(),level:I.levelLabel(T.level),scope:T.scope,message:T.message,data:T.data})),null,2),x=new Blob([f],{type:"application/json"}),h=URL.createObjectURL(x),C=document.createElement("a");C.href=h,C.download=`yyt-logs-${new Date().toISOString().replace(/[:.]/g,"-")}.json`,C.click(),URL.revokeObjectURL(h)}),u()},_updateStats(t){if(!U()||!X(t))return;let s=I.getStats(),r=t.find(".yyt-logger-stats");r.length&&r.html(`
      <span class="yyt-logger-stat">\u5171 <strong>${s.total}</strong> \u6761</span>
      ${["ERROR","WARN","INFO","DEBUG"].map(o=>`<span class="yyt-logger-stat yyt-log-${o.toLowerCase()}">${o}: <strong>${s.byLevel[o]||0}</strong></span>`).join("")}
    `)},destroy(t){let e=U();this._onLogEntry&&(P.off("logger:entry",this._onLogEntry),this._onLogEntry=null),this._flushTimer&&(clearTimeout(this._flushTimer),this._flushTimer=null),!(!e||!X(t))&&t.off(".yytLogger")},getStyles(){return`
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
    `}},xx=Jy});var ap={};te(ap,{MAIN_TAB_RENDERERS:()=>cl,PanelState:()=>yr,SCRIPT_ID:()=>O,SUB_TAB_RENDERERS:()=>dl,UIManager:()=>Jr,bindDialogEvents:()=>Vr,closeActiveCustomSelectDropdown:()=>lt,closeCustomSelectDropdown:()=>qr,createDialogHtml:()=>Gr,default:()=>wx,destroyEnhancedCustomSelects:()=>Ve,downloadJson:()=>zt,enhanceNativeSelects:()=>bt,escapeHtml:()=>v,fillFormWithConfig:()=>Xo,getAllStyles:()=>np,getFormApiConfig:()=>Yr,getJQuery:()=>U,getTargetDocument:()=>Lt,initUI:()=>sp,isContainerValid:()=>X,normalizeCustomSelectOptions:()=>Vo,openCustomSelectDropdown:()=>zl,readFileContent:()=>Vt,registerComponents:()=>Vi,renderApiPanel:()=>Ji,renderBypassPanel:()=>nl,renderCustomSelectControl:()=>Jo,renderEscapeTransformToolPanel:()=>rl,renderLoggerPanel:()=>ll,renderMainTab:()=>rp,renderPunctuationTransformToolPanel:()=>ol,renderRegexPanel:()=>Qi,renderSettingsPanel:()=>al,renderStatusBlockPanel:()=>tl,renderSubTabComponent:()=>op,renderSummaryToolPanel:()=>el,renderTableWorkbenchPanel:()=>il,renderToolPanel:()=>Zi,renderWorldbookPresetPanel:()=>Xi,renderYouyouReviewPanel:()=>sl,repositionActiveCustomSelectDropdown:()=>Ca,resetJQueryCache:()=>Sf,showConfirm:()=>De,showPrompt:()=>ka,showToast:()=>k,showTopNotice:()=>ce,toggleCustomSelectDropdown:()=>Go,uiManager:()=>Ct,withButtonLoading:()=>Mf});async function ep(t){if(!Zn.has(t)){let e=Zy[t];if(typeof e!="function")throw new Error(`unknown_panel:${t}`);Zn.set(t,e().then(s=>{let r=s?.[t]||s?.default;if(!r?.id)throw new Error(`invalid_panel:${t}`);return r}).catch(s=>{throw Zn.delete(t),s}))}return Zn.get(t)}function tp(t,e=null){let s=e?.message?`\uFF1A${v(e.message)}`:"";return`<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>${v(t)}${s}</span></div>`}async function Vi(){let t=await Promise.allSettled(Object.keys(Zy).map(async s=>{let r=await ep(s);return Ct.register(r.id,r),r.id})),e=t.filter(s=>s.status==="rejected");e.length&&e.forEach(s=>No.error("\u7EC4\u4EF6\u6CE8\u518C\u5931\u8D25",s.reason)),No.log(`\u7EC4\u4EF6\u6CE8\u518C\u5B8C\u6210\uFF0C\u6210\u529F ${t.length-e.length} \u4E2A\uFF0C\u5931\u8D25 ${e.length} \u4E2A`)}async function sp(t={}){let{autoInjectStyles:e=!0,targetDocument:s,...r}=t;Ct.init(r),await Vi(),e&&Ct.injectStyles(s),No.log("\u6A21\u5757\u521D\u59CB\u5316\u5B8C\u6210")}async function vx(t){let e=await ep(t);return Ct.getComponent(e.id)||Ct.register(e.id,e),e}async function gt(t,e,s={}){let r=await vx(t);Ct.render(r.id,e,s)}function Ji(t){return gt("ApiPresetPanel",t)}function Xi(t){return gt("WorldbookPresetPanel",t)}function Qi(t){return gt("RegexExtractPanel",t)}function Zi(t){return gt("ToolManagePanel",t)}function el(t){return gt("SummaryToolPanel",t)}function tl(t){return gt("StatusBlockPanel",t)}function sl(t){return gt("YouyouReviewPanel",t)}function rl(t){return gt("EscapeTransformToolPanel",t)}function ol(t){return gt("PunctuationTransformToolPanel",t)}function nl(t){return gt("BypassPanel",t)}function al(t){return gt("SettingsPanel",t)}function il(t){return gt("TableWorkbenchPanel",t)}function ll(t){return gt("LoggerPanel",t)}async function rp(t,e){let s=cl[t];if(!s)return!1;try{await s.render(e)}catch(r){No.error(s.failMessage,r),e.html(tp(s.failMessage,r))}return!0}async function op(t,e){let s=dl[t];if(!s)return null;try{await s.render(e)}catch(r){No.error(s.failMessage,r),e.html(tp(s.failMessage,r))}return t}function np(){return Ct.getAllStyles()}var No,Zy,Zn,cl,dl,wx,ip=R(()=>{J();Ia();Ne();Ne();Ia();No=I.createScope("UI"),Zy=Object.freeze({ApiPresetPanel:()=>Promise.resolve().then(()=>(Wl(),Kl)),WorldbookPresetPanel:()=>Promise.resolve().then(()=>(xc(),hc)),RegexExtractPanel:()=>Promise.resolve().then(()=>(Td(),Sd)),ToolManagePanel:()=>Promise.resolve().then(()=>(Ed(),Ad)),SummaryToolPanel:()=>Promise.resolve().then(()=>(Qd(),Xd)),StatusBlockPanel:()=>Promise.resolve().then(()=>(tu(),eu)),YouyouReviewPanel:()=>Promise.resolve().then(()=>(ou(),ru)),EscapeTransformToolPanel:()=>Promise.resolve().then(()=>(cu(),lu)),PunctuationTransformToolPanel:()=>Promise.resolve().then(()=>(yu(),uu)),BypassPanel:()=>Promise.resolve().then(()=>(gu(),fu)),SettingsPanel:()=>Promise.resolve().then(()=>(vi(),xi)),TableWorkbenchPanel:()=>Promise.resolve().then(()=>(Vy(),Gy)),LoggerPanel:()=>Promise.resolve().then(()=>(Qy(),Xy))}),Zn=new Map;cl=Object.freeze({apiPresets:{render:t=>Ji(t),failMessage:"API \u9884\u8BBE\u9762\u677F\u52A0\u8F7D\u5931\u8D25"},worldbookPresets:{render:t=>Xi(t),failMessage:"\u4E16\u754C\u4E66\u9884\u8BBE\u9762\u677F\u52A0\u8F7D\u5931\u8D25"},toolManage:{render:t=>Zi(t),failMessage:"\u5DE5\u5177\u7BA1\u7406\u9762\u677F\u52A0\u8F7D\u5931\u8D25"},regexExtract:{render:t=>Qi(t),failMessage:"\u6B63\u5219\u63D0\u53D6\u9762\u677F\u52A0\u8F7D\u5931\u8D25"},tableWorkbench:{render:t=>il(t),failMessage:"\u586B\u8868\u5DE5\u4F5C\u53F0\u52A0\u8F7D\u5931\u8D25"},bypass:{render:t=>nl(t),failMessage:"Ai\u6307\u4EE4\u9884\u8BBE\u9762\u677F\u52A0\u8F7D\u5931\u8D25"},settings:{render:t=>al(t),failMessage:"\u8BBE\u7F6E\u9762\u677F\u52A0\u8F7D\u5931\u8D25"},logger:{render:t=>ll(t),failMessage:"\u65E5\u5FD7\u9762\u677F\u52A0\u8F7D\u5931\u8D25"}}),dl=Object.freeze({SummaryToolPanel:{render:t=>el(t),failMessage:"\u6458\u8981\u5DE5\u5177\u52A0\u8F7D\u5931\u8D25"},StatusBlockPanel:{render:t=>tl(t),failMessage:"\u4E3B\u89D2\u72B6\u6001\u680F\u52A0\u8F7D\u5931\u8D25"},YouyouReviewPanel:{render:t=>sl(t),failMessage:"\u5C0F\u5E7D\u70B9\u8BC4\u52A0\u8F7D\u5931\u8D25"},EscapeTransformToolPanel:{render:t=>rl(t),failMessage:"\u8F6C\u4E49\u5904\u7406\u5DE5\u5177\u52A0\u8F7D\u5931\u8D25"},PunctuationTransformToolPanel:{render:t=>ol(t),failMessage:"\u4E2D\u6587\u6807\u70B9\u66FF\u6362\u5DE5\u5177\u52A0\u8F7D\u5931\u8D25"}});wx={uiManager:Ct,registerComponents:Vi,initUI:sp,renderApiPanel:Ji,renderWorldbookPresetPanel:Xi,renderRegexPanel:Qi,renderToolPanel:Zi,renderSummaryToolPanel:el,renderStatusBlockPanel:tl,renderYouyouReviewPanel:sl,renderEscapeTransformToolPanel:rl,renderPunctuationTransformToolPanel:ol,renderBypassPanel:nl,renderSettingsPanel:al,renderTableWorkbenchPanel:il,renderLoggerPanel:ll,MAIN_TAB_RENDERERS:cl,SUB_TAB_RENDERERS:dl,renderMainTab:rp,renderSubTabComponent:op,getAllStyles:np}});var cp={};te(cp,{WindowManager:()=>ea,closeWindow:()=>Ex,createWindow:()=>Ax,windowManager:()=>mt});function _x(){if(mt.stylesInjected)return;mt.stylesInjected=!0;let t=`
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
  `,e=document.createElement("style");e.id=Tx+"_styles",e.textContent=t,(document.head||document.documentElement).appendChild(e)}function Ax(t){let{id:e,title:s="\u7A97\u53E3",content:r="",width:o=900,height:n=700,modal:a=!1,resizable:i=!0,maximizable:l=!0,startMaximized:c=!1,rememberState:d=!0,onClose:u,onReady:p}=t;_x();let y=window.jQuery||window.parent?.jQuery;if(!y)return Sx.error("jQuery not available"),null;if(mt.isOpen(e))return mt.bringToFront(e),mt.getWindow(e);let f=window.innerWidth||1200,x=window.innerHeight||800,h=f<=1100,C=null,T=!1;d&&(C=mt.getState(e),C&&!h&&(T=!0));let _,Y;T&&C.width&&C.height?(_=Math.max(400,Math.min(C.width,f-40)),Y=Math.max(300,Math.min(C.height,x-40))):(_=Math.max(400,Math.min(o,f-40)),Y=Math.max(300,Math.min(n,x-40)));let L=Math.max(20,Math.min((f-_)/2,f-_-20)),S=Math.max(20,Math.min((x-Y)/2,x-Y-20)),N=l&&!h,F=`
    <div class="yyt-window" id="${e}" style="left:${L}px; top:${S}px; width:${_}px; height:${Y}px;">
      <div class="yyt-window-header">
        <div class="yyt-window-title">
          <i class="fa-solid fa-window-maximize"></i>
          <span>${Cx(s)}</span>
        </div>
        <div class="yyt-window-controls">
          ${N?'<button class="yyt-window-btn maximize" title="\u6700\u5927\u5316/\u8FD8\u539F"><i class="fa-solid fa-expand"></i></button>':""}
          <button class="yyt-window-btn close" title="\u5173\u95ED"><i class="fa-solid fa-times"></i></button>
        </div>
      </div>
      <div class="yyt-window-body">${r}</div>
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
  `,q=null;a&&(q=y(`<div class="yyt-window-overlay" data-for="${e}"></div>`),y(document.body).append(q));let D=y(F);y(document.body).append(D),mt.register(e,D),D.on("mousedown",()=>mt.bringToFront(e));let H=!1,le={left:L,top:S,width:_,height:Y},K=()=>{le={left:parseInt(D.css("left")),top:parseInt(D.css("top")),width:D.width(),height:D.height()},D.addClass("maximized"),D.find(".yyt-window-btn.maximize i").removeClass("fa-expand").addClass("fa-compress"),H=!0},fe=()=>{D.removeClass("maximized"),D.css({left:le.left+"px",top:le.top+"px",width:le.width+"px",height:le.height+"px"}),D.find(".yyt-window-btn.maximize i").removeClass("fa-compress").addClass("fa-expand"),H=!1};D.find(".yyt-window-btn.maximize").on("click",()=>{H?fe():K()}),(h&&l||T&&C.isMaximized&&l||c&&l)&&K(),D.find(".yyt-window-btn.close").on("click",()=>{if(d&&l){let xe={width:H?le.width:D.width(),height:H?le.height:D.height(),isMaximized:H};mt.saveState(e,xe)}u&&u(),q&&q.remove(),D.remove(),mt.unregister(e),y(document).off(".yytWindowDrag"+e),y(document).off(".yytWindowResize"+e)}),q&&q.on("click",xe=>{xe.target,q[0]});let Qe=!1,ne,Ee,Be,$t;if(D.find(".yyt-window-header").on("mousedown",xe=>{y(xe.target).closest(".yyt-window-controls").length||H||(Qe=!0,ne=xe.clientX,Ee=xe.clientY,Be=parseInt(D.css("left")),$t=parseInt(D.css("top")),y(document.body).css("user-select","none"))}),y(document).on("mousemove.yytWindowDrag"+e,xe=>{if(!Qe)return;let ve=xe.clientX-ne,Ht=xe.clientY-Ee;D.css({left:Math.max(0,Be+ve)+"px",top:Math.max(0,$t+Ht)+"px"})}),y(document).on("mouseup.yytWindowDrag"+e,()=>{Qe&&(Qe=!1,y(document.body).css("user-select",""))}),i){let xe=!1,ve="",Ht,Dt,Ie,qt,Pe,Or;D.find(".yyt-window-resize-handle").on("mousedown",function(ds){H||(xe=!0,ve="",y(this).hasClass("se")?ve="se":y(this).hasClass("e")?ve="e":y(this).hasClass("s")?ve="s":y(this).hasClass("w")?ve="w":y(this).hasClass("n")?ve="n":y(this).hasClass("nw")?ve="nw":y(this).hasClass("ne")?ve="ne":y(this).hasClass("sw")&&(ve="sw"),Ht=ds.clientX,Dt=ds.clientY,Ie=D.width(),qt=D.height(),Pe=parseInt(D.css("left")),Or=parseInt(D.css("top")),y(document.body).css("user-select","none"),ds.stopPropagation())}),y(document).on("mousemove.yytWindowResize"+e,ds=>{if(!xe)return;let Lr=ds.clientX-Ht,us=ds.clientY-Dt,lr=400,Br=300,Ms=Ie,ys=qt,Rs=Pe,Uo=Or;if(ve.includes("e")&&(Ms=Math.max(lr,Ie+Lr)),ve.includes("s")&&(ys=Math.max(Br,qt+us)),ve.includes("w")){let Ps=Ie-Lr;Ps>=lr&&(Ms=Ps,Rs=Pe+Lr)}if(ve.includes("n")){let Ps=qt-us;Ps>=Br&&(ys=Ps,Uo=Or+us)}D.css({width:Ms+"px",height:ys+"px",left:Rs+"px",top:Uo+"px"})}),y(document).on("mouseup.yytWindowResize"+e,()=>{xe&&(xe=!1,y(document.body).css("user-select",""))})}return D.on("remove",()=>{y(document).off(".yytWindowDrag"+e),y(document).off(".yytWindowResize"+e)}),p&&setTimeout(()=>p(D),50),D}function Ex(t){let e=mt.getWindow(t);if(e){let s=window.jQuery||window.parent?.jQuery;s&&(s(`.yyt-window-overlay[data-for="${t}"]`).remove(),s(document).off(".yytWindowDrag"+t),s(document).off(".yytWindowResize"+t)),e.remove(),mt.unregister(t)}}function Cx(t){return typeof t!="string"?"":t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}var Sx,Tx,lp,ea,mt,dp=R(()=>{We();J();Sx=I.createScope("WindowManager"),Tx="youyou_toolkit_window_manager",lp="window_states",ea=class{constructor(){this.windows=new Map,this.baseZIndex=1e4,this.topZIndex=1e4,this.stylesInjected=!1}register(e,s){this.topZIndex++,this.windows.set(e,{$el:s,zIndex:this.topZIndex}),s.css("z-index",this.topZIndex)}unregister(e){this.windows.delete(e)}bringToFront(e){let s=this.windows.get(e);s&&(this.topZIndex++,s.zIndex=this.topZIndex,s.$el.css("z-index",this.topZIndex))}getWindow(e){return this.windows.get(e)?.$el||null}isOpen(e){return this.windows.has(e)}closeAll(){this.windows.forEach((e,s)=>{e.$el&&e.$el.remove()}),this.windows.clear()}saveState(e,s){let r=this.loadStates();r[e]={...s,updatedAt:Date.now()},Fo.set(lp,r)}loadStates(){return Fo.get(lp)||{}}getState(e){return this.loadStates()[e]||null}},mt=new ea});var mp={};te(mp,{TX_PHASE:()=>Et,ToolAutomationService:()=>sa,Transaction:()=>ta,default:()=>Mx,toolAutomationService:()=>gp});function ie(t){return t==null?"":String(t).trim()}function up(t){let e=wn(t);return ie(e?.chatId??e?.chat_id??t?.chatId??t?.chat_id??t?.chat_filename??t?.this_chid??"chat_default")||"chat_default"}function pp(t){let e=wn(t);return Array.isArray(e?.chat)?e.chat:Array.isArray(t?.chat)?t.chat:[]}function fp(t){if(!t||t?.is_user===!0||t?.is_system===!0)return!1;let e=String(t?.role||"").trim().toLowerCase();return e==="user"||e==="system"?!1:e==="assistant"||e==="ai"||!e}function kx(t,e){let s=ie(e);if(!s)return null;let r=pp(t);for(let o=r.length-1;o>=0;o-=1){let n=r[o];if([n?.messageId,n?.message_id,n?.id,n?.mid,n?.mesid,n?.chat_index,o].map(i=>ie(i)).includes(s))return n||null}return null}function yp(t){let e=pp(t);if(!Array.isArray(e)||e.length===0)return null;let s=e.length-1,r=e[s]||null;if(!fp(r))return null;let o=ie(r?.messageId??r?.message_id??r?.id??r?.mid??r?.mesid??r?.chat_index??s);return o?{messageId:o,swipeId:ie(r?.swipeId??r?.swipe_id??r?.swipe??r?.swipeIndex),message:r}:null}function Ix(){let t=Date.now().toString(36),e=Math.random().toString(36).slice(2,8);return`tx_${t}_${e}`}var Ae,Et,ta,sa,gp,Mx,bp=R(()=>{fo();Me();J();Sn();ts();Mn();js();qi();As();Ae=I.createScope("ToolAutomation");Et=Object.freeze({RECEIVED:"received",CONFIRMED:"confirmed",CONTEXT_BUILT:"context_built",REQUEST_STARTED:"request_started",REQUEST_FINISHED:"request_finished",WRITEBACK_STARTED:"writeback_started",WRITEBACK_COMMITTED:"writeback_committed",REFRESH_CONFIRMED:"refresh_confirmed",SKIPPED:"skipped",FAILED:"failed"}),ta=class{constructor({chatId:e,messageId:s,swipeId:r,sourceEvent:o,generationKey:n}){this.traceId=Ix(),this.chatId=e||"",this.messageId=s||"",this.swipeId=r||"",this.sourceEvent=o||"",this.generationKey=n||"",this.phase=Et.RECEIVED,this.createdAt=Date.now(),this.updatedAt=Date.now(),this.verdict="",this.error=null,this.toolResults=[],this.writebackState=null,this.refreshState=null}transition(e,s={}){return this.phase=e,this.updatedAt=Date.now(),Object.assign(this,s),this}toSnapshot(){return{...this}}},sa=class{constructor(){this._stopCallbacks=[],this._pendingTimers=new Map,this._recentlyProcessedSlots=new Map,this._ownWriteMessageIds=new Map,this._slotQueues=new Map,this._activeTransactions=new Map,this._isProcessing=!1,this._currentChatId="",this._enabled=!1,this._enabledCheckedOnce=!1,this.debugMode=!1,this._transactionHistory=[],this._maxHistorySize=30,this._hostBindingStatus={initialized:!1,initAttempts:0,lastInitAt:0,lastInitResult:"idle",source:"unavailable",hasEventSource:!1,hasEventTypes:!1,eventBindings:[],retryScheduled:!1,retryDelayMs:0,lastError:""},this._messageReceivedThrottleUntil=0}setDebugMode(e){this.debugMode=e===!0}init(e={}){this.stop(),this._hostBindingStatus.lastInitAt=Date.now(),this._hostBindingStatus.initAttempts=(this._hostBindingStatus.initAttempts||0)+1;let s=Gs();this._currentChatId=up(s);let r=(o,...n)=>{let a=Gs(),{messageId:i,swipeId:l}=this._extractIdentitiesFromArgs(n);if(Ae.debug(`\u6536\u5230\u5BBF\u4E3B\u4E8B\u4EF6 "${o}"`,{messageId:i,swipeId:l,argCount:n.length}),!this._checkEnabled())return;if(o===Ce.MESSAGE_RECEIVED){let x=Date.now();if(x<this._messageReceivedThrottleUntil){Ae.debug(`MESSAGE_RECEIVED \u5728\u8282\u6D41\u7A97\u53E3\u5185\uFF0C\u8DF3\u8FC7\uFF08\u5269\u4F59 ${this._messageReceivedThrottleUntil-x}ms\uFF09`);return}this._messageReceivedThrottleUntil=x+this._getSettleMs()+5e3}let c=null,d=i,u=l;if(d&&(c=kx(a,d)),!c){let x=yp(a);x?.messageId&&(c=x.message,d=x.messageId,u=x.swipeId||u)}if(!d||!c){Ae.debug(`\u4E8B\u4EF6 "${o}" \u65E0 assistant \u76EE\u6807\uFF0C\u8DF3\u8FC7`);return}if(!fp(c)){Ae.debug(`\u4E8B\u4EF6 "${o}" \u547D\u4E2D\u975E assistant \u6D88\u606F\uFF0C\u8DF3\u8FC7`,{messageId:d});return}let p=String(c.content||c.mes||"").trim();if(!p||p.length<5){Ae.debug(`\u4E8B\u4EF6 "${o}" \u6D88\u606F\u8FC7\u77ED\uFF08${p.length} \u5B57\u7B26\uFF09\uFF0C\u8DF3\u8FC7`);return}if(this._isProcessing){Ae.debug(`\u4E8B\u4EF6 "${o}" \u6B63\u5728\u5904\u7406\u4E2D\uFF0C\u8DF3\u8FC7`);return}if(this._isOwnWrite(d)){Ae.debug(`\u4E8B\u4EF6 "${o}" \u547D\u4E2D own-write \u9ED1\u540D\u5355\uFF0C\u8DF3\u8FC7`,{messageId:d});return}let y=ie(c?.swipeId??c?.swipe_id??c?.swipe??c?.swipeIndex);y&&(u=y);let f=`${d}::${u}`;if(this._isRecentlyProcessed(f)){Ae.debug(`\u4E8B\u4EF6 "${o}" slot \u5DF2\u8FD1\u671F\u5904\u7406\u8FC7\uFF0C\u8DF3\u8FC7`,{slotKey:f});return}this._scheduleMessageProcessing(d,u,{settleMs:this._getSettleMs(),sourceEvent:o}),Ae.info(`\u4E8B\u4EF6 "${o}" \u901A\u8FC7\u6240\u6709\u5B88\u536B\uFF0C\u5DF2\u8C03\u5EA6\u5904\u7406`,{targetMessageId:d,targetSwipeId:u,throttleUntil:this._messageReceivedThrottleUntil,isProcessing:this._isProcessing})};return this._stopCallbacks.push(st.subscribe(Ce.MESSAGE_SENT,()=>{Ae.debug("MESSAGE_SENT \u2192 \u6E05\u7406\u8C03\u5EA6\u961F\u5217"),this._pendingTimers.forEach(o=>clearTimeout(o)),this._pendingTimers.clear()})),this._stopCallbacks.push(st.subscribe(Ce.MESSAGE_RECEIVED,(...o)=>{r(Ce.MESSAGE_RECEIVED,...o)})),this._stopCallbacks.push(st.subscribe(Ce.GENERATION_STOPPED,()=>{Ae.info("GENERATION_STOPPED \u2192 \u53D6\u6D88\u6240\u6709\u6D3B\u8DC3\u4E8B\u52A1"),this._cancelActiveTransactions("generation_stopped"),this._pendingTimers.forEach(o=>clearTimeout(o)),this._pendingTimers.clear(),this._isProcessing=!1})),this._stopCallbacks.push(st.subscribe(Ce.CHAT_CHANGED,()=>{this._resetForChatChange()})),this._stopCallbacks.push(st.subscribe(Ce.MESSAGE_DELETED,o=>{this._clearMessageState(ie(o))})),this._stopCallbacks.push(P.on(M.SETTINGS_UPDATED,()=>{let o=this._enabled;this._enabled=this._evaluateEnabled(),o!==this._enabled&&Ae.info(`\u81EA\u52A8\u5316\u72B6\u6001\u53D8\u66F4: ${o} \u2192 ${this._enabled}`)})),this._enabled=this._evaluateEnabled(),this._enabledCheckedOnce=!1,this._refreshHostBindingStatus(),this._seedKnownSlots(),Ae.info("\u81EA\u52A8\u5316\u670D\u52A1\u5DF2\u521D\u59CB\u5316",{enabled:this._enabled,chatId:this._currentChatId,source:this._hostBindingStatus.source}),!0}_seedKnownSlots(){try{let e=Gs(),s=yp(e);if(!s?.messageId)return;let r=`${ie(s.messageId)}::${ie(s.swipeId)}`;this._recentlyProcessedSlots.set(r,Number.MAX_SAFE_INTEGER),Ae.debug(`\u5DF2\u5C06\u5F53\u524D\u6700\u65B0 slot "${r}" \u9884\u6807\u8BB0\u4E3A\u5DF2\u77E5\uFF0C\u8DF3\u8FC7 MESSAGE_RECEIVED \u91CD\u653E`)}catch(e){Ae.warn("_seedKnownSlots \u5931\u8D25",{error:e})}}_refreshHostBindingStatus(){let e=st.describe(),s=[Ce.MESSAGE_SENT,Ce.MESSAGE_RECEIVED,Ce.GENERATION_STOPPED,Ce.CHAT_CHANGED,Ce.MESSAGE_DELETED];this._hostBindingStatus={...this._hostBindingStatus,initialized:!!e.hasBridge,lastInitResult:e.hasBridge?"ready":e.retryScheduled?"pending_retry":"pending",source:e.source,hasEventSource:!!e.hasBridge,hasEventTypes:Array.isArray(e.availableEvents)&&e.availableEvents.length>0,eventBindings:s.map(r=>`subscribed: ${r}`),retryScheduled:!!e.retryScheduled,retryDelayMs:0,lastError:""}}stop(){this._stopCallbacks.forEach(e=>{try{e()}catch(s){Ae.warn("\u505C\u6B62\u56DE\u8C03\u5931\u8D25",{error:s})}}),this._stopCallbacks=[],this._pendingTimers.forEach(e=>clearTimeout(e)),this._pendingTimers.clear(),this._slotQueues.clear(),this._recentlyProcessedSlots.clear(),this._ownWriteMessageIds.clear(),this._cancelActiveTransactions("service_stopped"),this._activeTransactions.clear(),this._isProcessing=!1,this._enabled=!1,this._enabledCheckedOnce=!1,this._hostBindingStatus={initialized:!1,initAttempts:0,lastInitAt:0,lastInitResult:"idle",source:"unavailable",hasEventSource:!1,hasEventTypes:!1,eventBindings:[],retryScheduled:!1,retryDelayMs:0,lastError:""}}isEnabled(){return this._enabled}getRuntimeSnapshot(){return this._pruneRecentSlots(),this._pruneOwnWrites(),this._refreshHostBindingStatus(),{currentChatId:this._currentChatId,enabled:this._enabled,isProcessing:this._isProcessing,pendingTimerCount:this._pendingTimers.size,queuedSlotCount:this._slotQueues.size,recentlyProcessedSlotCount:this._recentlyProcessedSlots.size,ownWriteMessageIdCount:this._ownWriteMessageIds.size,activeTransactionCount:this._activeTransactions.size,recentTransactions:this._transactionHistory.slice(-10).map(e=>e.toSnapshot()),hostBinding:{...this._hostBindingStatus,eventBindings:Array.isArray(this._hostBindingStatus?.eventBindings)?[...this._hostBindingStatus.eventBindings]:[]},settings:this._getAutomationSettings()}}async processCurrentAssistantMessage(e={}){let s=await Us({messageId:"",swipeId:"",runSource:"AUTO"}),r=ie(s?.sourceMessageId||s?.messageId);return r?this.processAssistantMessage(r,{force:e.force===!0,swipeId:ie(s?.sourceSwipeId),sourceEvent:e.sourceEvent||"MANUAL_CURRENT_ASSISTANT"}):{success:!1,error:"\u672A\u627E\u5230\u5F53\u524D assistant \u697C\u5C42"}}async processAssistantMessage(e,{force:s=!1,swipeId:r="",sourceEvent:o="AUTO"}={}){let n=new ta({chatId:this._currentChatId,messageId:e,swipeId:r,sourceEvent:o});try{if(!e)return this._skipTransaction(n,"missing_message_id");if(!this._checkEnabled()&&!s)return this._skipTransaction(n,"automation_disabled");n.transition(Et.CONFIRMED);let a=await Us({messageId:e,swipeId:r,runSource:"AUTO"}),i=a?.targetAssistantMessage||null;if(!i||!a?.sourceMessageId)return this._skipTransaction(n,"assistant_message_not_found");let l=String(i.content||i.mes||"").trim();if(!l||l.length<5)return this._skipTransaction(n,"assistant_message_too_short");n.transition(Et.CONTEXT_BUILT);let c=`${ie(a.sourceMessageId)}::${ie(a.sourceSwipeId||r)}`;if(n.generationKey=c,!s&&this._isRecentlyProcessed(c))return this._skipTransaction(n,"duplicate_slot",{slotKey:c});let d=Ft.filterAutoPostResponseTools(lo()),u=Le(),p=u?.autoUpdateEnabled===!0&&ie(u?.autoUpdateTrigger||"assistantMessage")==="assistantMessage";return!d.length&&!p?this._skipTransaction(n,"no_auto_tools",{tools:d}):(n.slotKey=c,n.slotRevisionKey=a.slotRevisionKey||"",n.sourceMessageId=a.sourceMessageId||e,n.sourceSwipeId=a.sourceSwipeId||r||"",this._enqueueSlot(c,async()=>{if(!s&&this._isRecentlyProcessed(c))return this._skipTransaction(n,"duplicate_slot_after_queue",{slotKey:c});this._isProcessing=!0,this._markSlotProcessed(c),n.transition(Et.REQUEST_STARTED);let y=new AbortController;this._registerActiveTransaction(n,{controller:y,slotKey:c,sourceMessageId:a.sourceMessageId||e,sourceSwipeId:a.sourceSwipeId||r||""});try{let f=[],x=!1,h=null;for(let S of d){let N={...a,signal:y.signal,isAutoRun:!0,abortMeta:{traceId:n.traceId,slotKey:c,sourceMessageId:a.sourceMessageId||e,sourceSwipeId:a.sourceSwipeId||r||""},shouldAbortWriteback:()=>this._shouldAbortAutoWriteback({traceId:n.traceId}),skipNotify:!0,input:{...a.input||{},lastAiMessage:a.lastAiMessage,assistantBaseText:a.assistantBaseText}},F=await Ft.runToolPostResponse(S,N);f.push(F),(F?.writebackState||F?.output)&&(x=!0,this._markOwnWrite(a.sourceMessageId||e))}p&&(h=await Uy({messageId:a.sourceMessageId||e,swipeId:a.sourceSwipeId||r||"",sourceEvent:o,configInput:u,signal:y.signal,shouldAbortWriteback:()=>this._shouldAbortAutoWriteback({traceId:n.traceId})}),(h?.state||h?.mirrorResult?.success===!0)&&(x=!0,this._markOwnWrite(a.sourceMessageId||e))),n.transition(Et.REQUEST_FINISHED,{toolResults:f,tableResult:h}),x&&(n.transition(Et.WRITEBACK_STARTED),n.writebackState={messageId:a.sourceMessageId,swipeId:a.sourceSwipeId,hasOutput:!0},this._messageReceivedThrottleUntil=Date.now()+15e3),this._markSlotProcessed(c);let C=f.every(S=>S?.success!==!1),T=!p||!!h?.success||h?.skipped===!0||h?.meta?.aborted===!0||h?.meta?.stale===!0,_=C&&T,Y=f.some(S=>S?.meta?.aborted===!0||S?.meta?.stale===!0||S?.error==="\u8BF7\u6C42\u5DF2\u53D6\u6D88")||h?.meta?.aborted===!0||h?.meta?.stale===!0;_&&n.transition(Et.WRITEBACK_COMMITTED);let L=_?Et.REFRESH_CONFIRMED:Et.FAILED;return n.transition(L,{verdict:Y?"aborted":_?"success":"partial_failure"}),this._recordTransaction(n),this._updateAutoRuntimeForResults(d,a,n,f),{success:_,traceId:n.traceId,slotKey:c,sourceEvent:o,messageId:a.sourceMessageId||e,phase:n.phase,results:f,tableResult:h}}finally{this._unregisterActiveTransaction(n.traceId),this._isProcessing=!1}}))}catch(a){return n.transition(Et.FAILED,{error:a?.message||String(a)}),this._recordTransaction(n),this._unregisterActiveTransaction(n.traceId),this._isProcessing=!1,Ae.error("processAssistantMessage \u5F02\u5E38",{error:a}),{success:!1,traceId:n.traceId,error:n.error,phase:n.phase}}}_extractIdentitiesFromArgs(e){let s="",r="";for(let o of e)if(o!=null){if(typeof o=="number"&&Number.isFinite(o)&&!s){s=ie(o);continue}if(typeof o=="string"){let n=ie(o);!s&&/^\d+$/.test(n)&&(s=n);continue}typeof o=="object"&&(s||(s=ie(o.messageId??o.message_id??o.id??o.mid??o.mesid??o.chat_index??o.message?.messageId??o.message?.message_id??o.message?.id??o.message?.mid??o.message?.mesid??o.message?.chat_index??o.data?.messageId??o.data?.message_id??o.data?.id??o.data?.mid??o.data?.mesid??o.data?.chat_index??o.target?.messageId??o.target?.message_id??o.target?.id??o.target?.mid??o.target?.mesid??o.target?.chat_index)),r||(r=ie(o.swipeId??o.swipe_id??o.swipe??o.swipeIndex??o.currentSwipe??o.message?.swipeId??o.message?.swipe_id??o.message?.swipe??o.data?.swipeId??o.data?.swipe_id??o.data?.swipe??o.target?.swipeId??o.target?.swipe_id??o.target?.swipe)))}return{messageId:s,swipeId:r}}_scheduleMessageProcessing(e,s="",r={}){let o=r.settleMs??this._getSettleMs(),n=`msg::${ie(e)}::${ie(s)}`,a=this._pendingTimers.get(n);a&&clearTimeout(a);let i=setTimeout(()=>{this._pendingTimers.delete(n),this.processAssistantMessage(e,{swipeId:s,sourceEvent:r.sourceEvent||"AUTO"}).catch(l=>{Ae.error("\u8C03\u5EA6\u6267\u884C\u5931\u8D25",{messageId:e,error:l})})},Math.max(0,o));this._pendingTimers.set(n,i),Ae.info("\u5DF2\u8C03\u5EA6\u6D88\u606F\u5904\u7406",{timerKey:n,settleMs:o,sourceEvent:r.sourceEvent})}cancelAutomation(e={}){let s=e.reason||"manual_cancel",r=ie(e.messageId),o=ie(e.slotKey),n=ie(e.traceId),a=0;for(let[i,l]of this._pendingTimers){let c=r&&i.includes(`::${r}::`),d=o&&i.includes(o);(c||d||!r&&!o&&!n)&&(clearTimeout(l),this._pendingTimers.delete(i),a+=1)}return a+=this._cancelActiveTransactions(s,{messageId:r,slotKey:o,traceId:n}),{success:a>0,cancelledCount:a,reason:s}}_isRecentlyProcessed(e){if(!e)return!1;this._pruneRecentSlots();let s=this._recentlyProcessedSlots.get(e);return s?Date.now()-s<this._getDedupeWindowMs():!1}_markSlotProcessed(e){e&&(this._recentlyProcessedSlots.set(e,Date.now()),this._pruneRecentSlots())}_pruneRecentSlots(){let e=Date.now()-this._getDedupeWindowMs();for(let[s,r]of this._recentlyProcessedSlots)(!Number.isFinite(r)||r<e)&&this._recentlyProcessedSlots.delete(s)}_markOwnWrite(e){let s=ie(e);s&&(this._ownWriteMessageIds.set(s,Date.now()),this._pruneOwnWrites())}_isOwnWrite(e){let s=ie(e);if(!s)return!1;this._pruneOwnWrites();let r=this._ownWriteMessageIds.get(s);return r?Date.now()-r<1e4:!1}_pruneOwnWrites(){let e=Date.now()-1e4;for(let[s,r]of this._ownWriteMessageIds)(!Number.isFinite(r)||r<e)&&this._ownWriteMessageIds.delete(s)}_pruneCancelledKeys(){}_recordTransaction(e){this._transactionHistory.push(e),this._transactionHistory.length>this._maxHistorySize&&(this._transactionHistory=this._transactionHistory.slice(-this._maxHistorySize)),Ae.debug(`\u4E8B\u52A1 [${e.traceId}] \u2192 ${e.phase}`,{messageId:e.messageId,generationKey:e.generationKey,verdict:e.verdict,sourceEvent:e.sourceEvent,error:e.error})}_skipTransaction(e,s,r={}){return e.transition(Et.SKIPPED,{verdict:s,...r}),this._recordTransaction(e),Array.isArray(r?.tools)&&r.tools.length>0&&this._updateAutoRuntimeForSkip(r.tools,e,s,r),{success:!1,skipped:!0,reason:s,traceId:e.traceId,...r}}_enqueueSlot(e,s){let o=(this._slotQueues.get(e)||Promise.resolve()).catch(()=>{}).then(s).finally(()=>{this._slotQueues.get(e)===o&&this._slotQueues.delete(e)});return this._slotQueues.set(e,o),o}_registerActiveTransaction(e,s={}){e?.traceId&&this._activeTransactions.set(e.traceId,{traceId:e.traceId,generationKey:s.generationKey||e.generationKey||"",slotKey:s.slotKey||e.slotKey||"",sourceMessageId:s.sourceMessageId||e.sourceMessageId||"",sourceSwipeId:s.sourceSwipeId||e.sourceSwipeId||"",slotRevisionKey:s.slotRevisionKey||e.slotRevisionKey||"",assistantBaseFingerprint:s.assistantBaseFingerprint||"",assistantBaseText:s.assistantBaseText||"",controller:s.controller||null,cancelled:!1,cancelReason:""})}_unregisterActiveTransaction(e){e&&this._activeTransactions.delete(e)}_cancelActiveTransactions(e="manual_cancel",s={}){let r=ie(s.messageId),o=ie(s.slotKey),n=ie(s.traceId),a=0;for(let[i,l]of this._activeTransactions){let c=n&&i===n,d=r&&ie(l?.sourceMessageId)===r,u=o&&ie(l?.slotKey)===o;if(!(!c&&!d&&!u&&!(!n&&!r&&!o))){l.cancelled=!0,l.cancelReason=e;try{l?.controller?.abort?.()}catch{}a+=1}}return a}_shouldAbortAutoWriteback(e={}){let s=ie(e.traceId);if(s){let r=this._activeTransactions.get(s);if(!r||r.cancelled)return{aborted:!0,reason:"cancelled_before_host_commit"}}return!1}_updateAutoRuntimeForSkip(e,s,r,o={}){e.forEach(n=>{n?.id&&xs(n.id,{lastAutoRunAt:Date.now(),lastAutoStatus:"skipped",lastAutoMessageId:s?.sourceMessageId||s?.messageId||"",lastAutoSwipeId:s?.sourceSwipeId||s?.swipeId||"",lastAutoRevisionKey:s?.slotRevisionKey||o?.slotRevisionKey||"",lastAutoWritebackStatus:"",lastAutoRefreshConfirmed:!1,lastAutoSkipReason:r||""},{touchLastRunAt:!1,emitEvent:!1,emitRuntimeEvent:!0})})}_updateAutoRuntimeForResults(e,s,r,o=[]){e.forEach((n,a)=>{if(!n?.id)return;let i=o[a]||{},l=i?.meta?.writebackDetails||{},c=i?.meta?.aborted===!0||i?.meta?.stale===!0?"aborted":i?.success===!1?"failed":"success",d=i?.meta?.aborted===!0?i?.meta?.abortReason||(i?.meta?.stale===!0?"stale_base_changed":"cancelled_before_host_commit"):"";xs(n.id,{lastAutoRunAt:Date.now(),lastAutoStatus:c,lastAutoMessageId:s?.sourceMessageId||r?.sourceMessageId||r?.messageId||"",lastAutoSwipeId:s?.sourceSwipeId||r?.sourceSwipeId||r?.swipeId||"",lastAutoRevisionKey:s?.slotRevisionKey||r?.slotRevisionKey||"",lastAutoWritebackStatus:i?.meta?.writebackStatus||"",lastAutoRefreshConfirmed:!!l.refreshConfirmed,lastAutoSkipReason:d},{touchLastRunAt:!1,emitEvent:!1,emitRuntimeEvent:!0})})}_resetForChatChange(){let e=Gs(),s=up(e);Ae.info("\u804A\u5929\u5207\u6362",{from:this._currentChatId,to:s}),this._currentChatId=s,this._pendingTimers.forEach(r=>clearTimeout(r)),this._pendingTimers.clear(),this._slotQueues.clear(),this._recentlyProcessedSlots.clear(),this._ownWriteMessageIds.clear(),this._cancelActiveTransactions("chat_changed"),this._activeTransactions.clear(),this._isProcessing=!1,this._messageReceivedThrottleUntil=0,this._seedKnownSlots()}_clearMessageState(e){if(e){for(let[s,r]of this._pendingTimers)(s.includes(`::${e}::`)||s.startsWith(`msg::${e}::`))&&(clearTimeout(r),this._pendingTimers.delete(s));for(let s of this._recentlyProcessedSlots.keys())s.startsWith(`${e}::`)&&this._recentlyProcessedSlots.delete(s);this._ownWriteMessageIds.delete(ie(e)),this._seedKnownSlots()}}_evaluateEnabled(){return!0}_checkEnabled(){if(this._enabled)return!0;if(!this._enabledCheckedOnce){this._enabledCheckedOnce=!0;let e=this._getAutomationSettings();Ae.warn("\u81EA\u52A8\u5316\u672A\u542F\u7528\uFF0C\u9996\u6B21\u8BCA\u65AD:",{"automation.enabled":e.enabled,"\u5B8C\u6574 automation \u8BBE\u7F6E":e,\u63D0\u793A:"\u8BF7\u786E\u4FDD settings.automation.enabled === true"})}return!1}_getAutomationSettings(){let e=St.getSettings()?.automation||{},s=Number.isFinite(e.settleMs)?e.settleMs:800;return{enabled:!0,settleMs:s,dedupeWindowMs:Number.isFinite(e.dedupeWindowMs)?e.dedupeWindowMs:Math.max(5e3,s+600)}}_getSettleMs(){return this._getAutomationSettings().settleMs}_getDedupeWindowMs(){return this._getAutomationSettings().dedupeWindowMs}},gp=new sa,Mx=gp});var hp={};te(hp,{AuthorityProvider:()=>ra,default:()=>Px});var Pr,ul,Rx,Is,ra,Px,xp=R(()=>{J();na();Pr=I.createScope("AuthorityProvider"),ul="third-party/youyou-toolkit",Rx="YouYou Toolkit",Is="main",ra=class{constructor({extensionVersion:e="1.0.149"}={}){this.kind=$r.AUTHORITY,this._client=null,this._extensionVersion=e,this._initialized=!1}async init(){let e=oa();if(!e)return Pr.error("\u672A\u68C0\u6D4B\u5230 window.STAuthority.AuthoritySDK"),!1;try{return this._client=await e.init({extensionId:ul,displayName:Rx,version:this._extensionVersion,installType:"local",declaredPermissions:{sql:{private:!0}}}),this._initialized=!0,Pr.info("AuthorityProvider \u521D\u59CB\u5316\u6210\u529F",{extensionId:ul}),!0}catch(s){return Pr.error("AuthorityProvider \u521D\u59CB\u5316\u5931\u8D25",{error:s?.message||s}),this._initialized=!1,!1}}async dispose(){this._client=null,this._initialized=!1}async migrate({migrations:e,database:s=Is,tableName:r}={}){this._ensureReady();let o={database:s,migrations:e};r&&(o.tableName=r);let n=await this._client.sql.migrate(o);return{applied:n?.applied||[],skipped:n?.skipped||[],tableName:n?.tableName,latestId:n?.latestId}}async query({statement:e,params:s=[],database:r=Is,page:o=void 0}={}){this._ensureReady();let n={database:r,statement:e,params:s};o&&(n.page=o);let a=await this._client.sql.query(n);return{columns:a.columns||[],rows:a.rows||[],rowCount:a.rowCount??(a.rows?.length||0),page:a.page}}async execute({statement:e,params:s=[],database:r=Is}={}){this._ensureReady();let o=await this._client.sql.exec({database:r,statement:e,params:s});return{rowsAffected:o.rowsAffected??0,lastInsertRowid:o.lastInsertRowid??null}}async batch({statements:e,database:s=Is}={}){this._ensureReady();let r=(e||[]).map(n=>({mode:n.mode||(/^\s*SELECT/i.test(n.statement)?"query":"exec"),statement:n.statement,params:n.params||[]}));return{results:(await this._client.sql.batch({database:s,statements:r}))?.results||[]}}async transaction({statements:e,database:s=Is}={}){this._ensureReady();let r=(e||[]).map(n=>({mode:n.mode||(/^\s*SELECT/i.test(n.statement)?"query":"exec"),statement:n.statement,params:n.params||[]})),o=await this._client.sql.transaction({database:s,statements:r});return{committed:!!o?.committed,results:o?.results||[]}}async paginate({statement:e,params:s=[],database:r=Is,page:o={}}={}){return this._ensureReady(),this.query({statement:e,params:s,database:r,page:o})}async pageAll({statement:e,params:s=[],database:r=Is,pageSize:o=200,maxPages:n}={}){this._ensureReady();let a=await this._client.sql.pageAll({database:r,statement:e,params:s},{pageSize:o,maxPages:n});return{columns:a.columns||[],rows:a.rows||[],rowCount:a.rowCount??(a.rows?.length||0)}}async backup(){return Pr.warn("backup() \u6682\u672A\u5B9E\u73B0\uFF0CAuthorityProvider \u8D70 Authority \u5185\u7F6E\u5907\u4EFD"),{kind:"authority",timestamp:Date.now()}}async export(){return Pr.warn("export() \u6682\u672A\u5B9E\u73B0\uFF0CAuthorityProvider \u8D70 Authority \u5185\u7F6E\u5BFC\u51FA"),{kind:"authority",timestamp:Date.now()}}async import(){Pr.warn("import() \u6682\u672A\u5B9E\u73B0\uFF0CAuthorityProvider \u8D70 Authority \u5185\u7F6E\u5BFC\u5165")}describe(){return{kind:this.kind,initialized:this._initialized,extensionId:ul,database:Is,hasClient:!!this._client}}_ensureReady(){if(!this._initialized||!this._client)throw new Error("AuthorityProvider \u5C1A\u672A\u521D\u59CB\u5316")}},Px=ra});var wp={};te(wp,{FallbackProvider:()=>aa,default:()=>Ux});function $x(t){let e=[],s=0,r="";for(let o of t)o==="("?s+=1:o===")"&&(s-=1),o===","&&s===0?(r.trim()&&e.push(r),r=""):r+=o;return r.trim()&&e.push(r),e}function Dx(t){let e=t.match(/^\s*CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?(\w+)\s*\(([\s\S]+)\)\s*$/i);if(!e)return null;let s=e[1],r=e[2],o=$x(r),n=[],a=[];for(let i of o){let l=i.trim(),c=l.match(/^PRIMARY\s+KEY\s*\(([^)]+)\)$/i);if(c){a=c[1].split(",").map(u=>u.trim());continue}let d=l.match(/^(\w+)\s+(\w+)/);d&&(n.push({name:d[1],type:d[2].toUpperCase(),raw:l}),/PRIMARY\s+KEY/i.test(l)&&!a.length&&(a=[d[1]]))}return{name:s,columns:n,pkCols:a}}function Nx(t){let e=t.match(/^\s*INSERT\s+(?:OR\s+REPLACE\s+)?INTO\s+(\w+)(?:\s*\(([^)]+)\))?\s+VALUES\s*\(([^)]+)\)\s*$/i);if(!e)return null;let s=e[1],r=e[2]?e[2].split(",").map(n=>n.trim()):null,o=(e[3].match(/\?/g)||[]).length;return{name:s,cols:r,paramCount:o}}function fl(t){let e=t.split(/\s+AND\s+/i),s=[];for(let r of e){let o=r.match(/^\s*(\w+)\s*(=|!=|<>|>=|<=|>|<)\s*\?\s*$/);if(o){let a=o[2]==="<>"?"!=":o[2];s.push({col:o[1],op:a,placeholder:!0});continue}let n=r.match(/^\s*(\w+)\s+IS\s+(NOT\s+)?NULL\s*$/i);if(n){s.push({col:n[1],op:n[2]?"IS NOT NULL":"IS NULL",placeholder:!1});continue}throw new Error(`FallbackProvider \u4E0D\u652F\u6301\u7684 WHERE \u5B50\u53E5: "${r}"`)}return s}function Ox(t){let e=t.match(/^\s*SELECT\s+([\s\S]+?)\s+FROM\s+(\w+)([\s\S]*)$/i);if(!e)return null;let s=e[1].trim(),r=e[2],o=e[3],n=o.match(/\bWHERE\s+([\s\S]+?)(?=\bORDER\s+BY\b|\bLIMIT\b|\bOFFSET\b|$)/i),a=o.match(/\bORDER\s+BY\s+(\w+)\s*(ASC|DESC)?/i),i=o.match(/\bLIMIT\s+(\d+)/i),l=o.match(/\bOFFSET\s+(\d+)/i);return{name:r,cols:s==="*"?null:s.split(",").map(c=>c.trim()),where:n?fl(n[1].trim()):null,orderBy:a?{col:a[1],dir:(a[2]||"ASC").toUpperCase()}:null,limit:i?parseInt(i[1],10):null,offset:l?parseInt(l[1],10):null}}function Lx(t){let e=t.match(/^\s*UPDATE\s+(\w+)\s+SET\s+([\s\S]+?)(?:\s+WHERE\s+([\s\S]+))?\s*$/i);if(!e)return null;let s=e[1],r=e[2],o=e[3],n=r.split(",").map(a=>{let i=a.trim().match(/^(\w+)\s*=\s*\?$/);if(!i)throw new Error(`FallbackProvider \u4E0D\u652F\u6301\u7684 SET \u5B50\u53E5: "${a}"`);return i[1]});return{name:s,setCols:n,where:o?fl(o.trim()):null}}function Bx(t){let e=t.match(/^\s*DELETE\s+FROM\s+(\w+)(?:\s+WHERE\s+([\s\S]+))?\s*$/i);return e?{name:e[1],where:e[2]?fl(e[2].trim()):null}:null}function pl(t,e){return t===e?!0:t==null?e==null:e==null?!1:typeof t=="number"||typeof e=="number"?Number(t)===Number(e):String(t)===String(e)}function Oo(t,e){return t===e?0:t==null?-1:e==null?1:typeof t=="number"&&typeof e=="number"?t-e:String(t)<String(e)?-1:1}function zx(t,e,s){let r=t[e.col];if(e.op==="IS NULL")return r==null;if(e.op==="IS NOT NULL")return r!=null;let o=s.shift();switch(e.op){case"=":return pl(r,o);case"!=":return!pl(r,o);case">":return Oo(r,o)>0;case"<":return Oo(r,o)<0;case">=":return Oo(r,o)>=0;case"<=":return Oo(r,o)<=0;default:return!1}}function yl(t,e,s){if(!e||!e.length)return!0;let r=Array.isArray(s)?[...s]:[];for(let o of e)if(!zx(t,o,r))return!1;return!0}var Dr,vp,aa,Ux,Sp=R(()=>{J();We();na();Dr=I.createScope("FallbackProvider"),vp="provider_fallback_v1";aa=class{constructor(){this.kind=$r.FALLBACK,this._tables=new Map,this._migrations=new Set,this._initialized=!1,this._dirty=!1,this._saveTimer=null}async init(){try{let e=ge.get(vp)||{};this._migrations=new Set(Array.isArray(e.migrations)?e.migrations:[]),this._tables=new Map;for(let[s,r]of Object.entries(e.tables||{}))this._tables.set(s,{schema:r.schema||{name:s,columns:[],pkCols:[]},rows:Array.isArray(r.rows)?r.rows:[]});return this._initialized=!0,Dr.info("FallbackProvider \u521D\u59CB\u5316\u5B8C\u6210",{tables:this._tables.size,migrations:this._migrations.size}),!0}catch(e){return Dr.error("FallbackProvider \u521D\u59CB\u5316\u5931\u8D25",{error:e?.message||e}),this._initialized=!1,!1}}async dispose(){this._flushSave(!0),this._tables.clear(),this._migrations.clear(),this._initialized=!1}async migrate({migrations:e}={}){this._ensureReady();let s=[],r=[];for(let o of e||[]){if(!o?.id||!o?.statement)continue;if(this._migrations.has(o.id)){r.push(o.id);continue}let n=o.statement.trim();if(/^CREATE\s+TABLE/i.test(n)){let a=Dx(n);if(!a)throw new Error(`\u65E0\u6CD5\u89E3\u6790 CREATE TABLE: ${n}`);this._tables.has(a.name)||this._tables.set(a.name,{schema:a,rows:[]})}else if(!/^CREATE\s+(UNIQUE\s+)?INDEX/i.test(n))if(/^DROP\s+TABLE/i.test(n)){let a=n.match(/^DROP\s+TABLE\s+(?:IF\s+EXISTS\s+)?(\w+)/i);a&&this._tables.delete(a[1])}else/^ALTER\s+TABLE/i.test(n)?Dr.warn("FallbackProvider \u4E0D\u652F\u6301 ALTER TABLE\uFF0C\u8DF3\u8FC7",{id:o.id}):Dr.warn("FallbackProvider \u8DF3\u8FC7\u672A\u8BC6\u522B DDL",{id:o.id,statement:n});this._migrations.add(o.id),s.push(o.id)}return this._markDirty(),{applied:s,skipped:r}}async query({statement:e,params:s=[]}={}){this._ensureReady();let r=Ox(e);if(!r)throw new Error(`\u65E0\u6CD5\u89E3\u6790 SELECT: ${e}`);let o=this._tables.get(r.name);if(!o)return{columns:r.cols||[],rows:[],rowCount:0};let n=o.rows.filter(l=>yl(l,r.where,s));if(r.orderBy){let l=r.orderBy.dir==="DESC"?-1:1;n=[...n].sort((c,d)=>Oo(c[r.orderBy.col],d[r.orderBy.col])*l)}r.offset&&(n=n.slice(r.offset)),Number.isFinite(r.limit)&&(n=n.slice(0,r.limit));let a,i=n;return r.cols?(i=n.map(l=>{let c={};for(let d of r.cols)c[d]=l[d]===void 0?null:l[d];return c}),a=r.cols):a=o.schema?.columns?.map(l=>l.name)||(i[0]?Object.keys(i[0]):[]),{columns:a,rows:i,rowCount:i.length}}async execute({statement:e,params:s=[]}={}){this._ensureReady();let r=String(e||"").trim(),o=r.split(/\s+/)[0].toUpperCase(),n;if(o==="INSERT")n=this._doInsert(r,s);else if(o==="UPDATE")n=this._doUpdate(r,s);else if(o==="DELETE")n=this._doDelete(r,s);else throw new Error(`FallbackProvider \u4E0D\u652F\u6301\u7684 execute \u8BED\u53E5: ${e}`);return n}_doInsert(e,s){let r=Nx(e);if(!r)throw new Error(`\u65E0\u6CD5\u89E3\u6790 INSERT: ${e}`);let o=this._tables.get(r.name);if(!o)throw new Error(`\u8868\u4E0D\u5B58\u5728: ${r.name}`);let n=r.cols||(o.schema.columns||[]).map(c=>c.name);if(!n.length)throw new Error(`\u8868 ${r.name} \u65E0\u5217\u5B9A\u4E49`);if(s.length!==n.length)throw new Error(`INSERT \u53C2\u6570\u6570\u91CF\u4E0D\u5339\u914D (\u671F\u671B ${n.length}, \u5B9E\u9645 ${s.length})`);let a={};for(let c=0;c<n.length;c+=1)a[n[c]]=s[c];let i=o.schema?.pkCols||[],l=/^INSERT\s+OR\s+REPLACE/i.test(e);if(i.length){let c=o.rows.findIndex(d=>i.every(u=>pl(d[u],a[u])));if(c>=0){if(l)return o.rows[c]=a,this._markDirty(),{rowsAffected:1,lastInsertRowid:c+1};throw new Error(`PRIMARY KEY \u51B2\u7A81 (${i.join(",")})`)}}return o.rows.push(a),this._markDirty(),{rowsAffected:1,lastInsertRowid:o.rows.length}}_doUpdate(e,s){let r=Lx(e);if(!r)throw new Error(`\u65E0\u6CD5\u89E3\u6790 UPDATE: ${e}`);let o=this._tables.get(r.name);if(!o)return{rowsAffected:0,lastInsertRowid:null};let n=r.setCols.length;if(s.length<n)throw new Error(`UPDATE \u53C2\u6570\u4E0D\u8DB3 (SET \u9700\u8981 ${n}, \u5B9E\u9645 ${s.length})`);let a=s.slice(0,n),i=s.slice(n),l=0;for(let c of o.rows)if(yl(c,r.where,i)){for(let d=0;d<n;d+=1)c[r.setCols[d]]=a[d];l+=1}return l>0&&this._markDirty(),{rowsAffected:l,lastInsertRowid:null}}_doDelete(e,s){let r=Bx(e);if(!r)throw new Error(`\u65E0\u6CD5\u89E3\u6790 DELETE: ${e}`);let o=this._tables.get(r.name);if(!o)return{rowsAffected:0,lastInsertRowid:null};let n=o.rows.length;o.rows=o.rows.filter(i=>!yl(i,r.where,s));let a=n-o.rows.length;return a>0&&this._markDirty(),{rowsAffected:a,lastInsertRowid:null}}async batch({statements:e}={}){this._ensureReady();let s=[];for(let r of e||[])if(String(r.statement||"").trim().split(/\s+/)[0].toUpperCase()==="SELECT"){let n=await this.query(r);s.push({kind:"query",...n})}else{let n=await this.execute(r);s.push({kind:"exec",...n})}return{results:s}}async transaction({statements:e}={}){this._ensureReady();let s=this._snapshot();try{let{results:r}=await this.batch({statements:e});return this._flushSave(!0),{committed:!0,results:r}}catch(r){throw this._restore(s),Dr.warn("FallbackProvider \u4E8B\u52A1\u56DE\u6EDA",{error:r?.message||r}),r}}async paginate({statement:e,params:s=[],page:r={}}={}){this._ensureReady();let o=Number.isFinite(r?.limit)?r.limit:50,n=Number.isFinite(r?.offset)?r.offset:0,a=`${e} LIMIT ${o} OFFSET ${n}`;return this.query({statement:a,params:s})}async backup(){return this._ensureReady(),this._snapshot()}async export(){return this.backup()}async import(e){this._ensureReady(),this._restore(e||{}),this._markDirty(),this._flushSave(!0)}describe(){return{kind:this.kind,initialized:this._initialized,tables:this._tables.size,migrations:this._migrations.size,tableNames:[...this._tables.keys()]}}_snapshot(){let e={};for(let[s,r]of this._tables)e[s]={schema:r.schema,rows:JSON.parse(JSON.stringify(r.rows))};return{migrations:[...this._migrations],tables:e}}_restore(e){this._migrations=new Set(Array.isArray(e?.migrations)?e.migrations:[]),this._tables=new Map;for(let[s,r]of Object.entries(e?.tables||{}))this._tables.set(s,{schema:r.schema||{name:s,columns:[],pkCols:[]},rows:Array.isArray(r.rows)?r.rows:[]})}_markDirty(){this._dirty=!0,this._saveTimer&&clearTimeout(this._saveTimer),this._saveTimer=setTimeout(()=>this._flushSave(!1),300)}_flushSave(e){if(this._saveTimer&&(clearTimeout(this._saveTimer),this._saveTimer=null),!(!this._dirty&&!e))try{ge.set(vp,this._snapshot()),this._dirty=!1}catch(s){Dr.error("FallbackProvider \u6301\u4E45\u5316\u5931\u8D25",{error:s?.message||s})}}_ensureReady(){if(!this._initialized)throw new Error("FallbackProvider \u5C1A\u672A\u521D\u59CB\u5316")}},Ux=aa});var Tp={};te(Tp,{PROVIDER_KIND:()=>$r,createProvider:()=>Kx,detectAuthoritySdk:()=>oa,disposeToolDataProvider:()=>Wx,getCurrentProvider:()=>Fx,getToolDataProvider:()=>jx});function oa(){if(typeof window>"u")return null;try{let t=window.STAuthority?.AuthoritySDK;if(t)return t}catch{}try{if(window.parent&&window.parent!==window){let t=window.parent.STAuthority?.AuthoritySDK;if(t)return t}}catch{}return null}async function ml({preferAuthority:t=!0,extensionVersion:e="1.0.149"}={}){if(t&&oa()){let{AuthorityProvider:r}=await Promise.resolve().then(()=>(xp(),hp));return new r({extensionVersion:e})}let{FallbackProvider:s}=await Promise.resolve().then(()=>(Sp(),wp));return new s}async function jx(t={}){return ir||Lo||(Lo=(async()=>{let e=await ml({preferAuthority:!0,...t}),s=await e.init();if(!s&&e.kind===$r.AUTHORITY){gl.warn("AuthorityProvider \u521D\u59CB\u5316\u5931\u8D25\uFF0C\u964D\u7EA7\u5230 FallbackProvider");try{await e.dispose()}catch{}e=await ml({preferAuthority:!1}),s=await e.init()}return s?gl.info(`Provider \u521D\u59CB\u5316\u5B8C\u6210: kind=${e.kind}`):gl.error(`Provider \u5168\u90E8\u521D\u59CB\u5316\u5931\u8D25 (kind=${e.kind})`),ir=e,e})(),Lo)}function Fx(){return ir}async function Kx(t={}){let e=await ml(t);return await e.init(),e}async function Wx(){if(ir){try{await ir.dispose()}catch{}ir=null}Lo=null}var gl,$r,ir,Lo,na=R(()=>{J();gl=I.createScope("ToolDataProvider"),$r=Object.freeze({AUTHORITY:"authority",FALLBACK:"fallback"}),ir=null,Lo=null});J();function _p(t,e={}){let{constants:s,topLevelWindow:r,modules:o}=t,{SCRIPT_ID:n,SCRIPT_VERSION:a,MENU_ITEM_ID:i,MENU_CONTAINER_ID:l}=s,c=null,d=!1,u=I.createScope("Bootstrap");function p(...L){u.log(L.join(" "))}function y(...L){u.error(L.join(" "))}async function f(){return c||(c=(async()=>{try{o.storageModule=await Promise.resolve().then(()=>(We(),vl)),o.apiConnectionModule=await Promise.resolve().then(()=>(Fr(),Al)),o.presetManagerModule=await Promise.resolve().then(()=>(Hr(),Il)),o.uiModule=await Promise.resolve().then(()=>(ip(),ap)),o.regexExtractorModule=await Promise.resolve().then(()=>(hr(),Ya)),o.toolManagerModule=await Promise.resolve().then(()=>(un(),Jc)),o.toolExecutorModule=await Promise.resolve().then(()=>(fi(),pi)),o.windowManagerModule=await Promise.resolve().then(()=>(dp(),cp)),o.toolRegistryModule=await Promise.resolve().then(()=>(ts(),ti)),o.settingsServiceModule=await Promise.resolve().then(()=>(fo(),Id)),o.bypassManagerModule=await Promise.resolve().then(()=>(_r(),kd)),o.variableResolverModule=await Promise.resolve().then(()=>(go(),Nd)),o.contextInjectorModule=await Promise.resolve().then(()=>(Js(),$d)),o.toolPromptServiceModule=await Promise.resolve().then(()=>(kn(),Ld)),o.toolOutputServiceModule=await Promise.resolve().then(()=>(Mn(),zd)),o.toolAutomationServiceModule=await Promise.resolve().then(()=>(bp(),mp)),o.toolDataProviderModule=await Promise.resolve().then(()=>(na(),Tp));try{o.toolDataProviderModule.getToolDataProvider({extensionVersion:a}).then(L=>{u.log(`Provider \u5C31\u7EEA: ${L.kind}`)}).catch(L=>{u.error(`Provider \u521D\u59CB\u5316\u5F02\u5E38: ${L?.message||L}`)})}catch(L){u.error(`Provider \u542F\u52A8\u5F02\u5E38: ${L?.message||L}`)}return o.toolOutputServiceModule?.toolOutputService&&o.apiConnectionModule&&o.toolOutputServiceModule.toolOutputService.setApiConnection(o.apiConnectionModule),!0}catch(L){return c=null,y("\u6A21\u5757\u52A0\u8F7D\u5931\u8D25\uFF0C\u4F7F\u7528\u5185\u7F6E\u529F\u80FD:",L),y("\u5DF2\u52A0\u8F7D\u6A21\u5757:",Object.keys(o).filter(S=>o[S])),!1}})(),c)}function x(){return`
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

.yyt-page.active {
  display: block;
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
    `}async function h(){let L=`${n}-styles`,S=r.document||document;if(S.getElementById(L))return;let N="",F=[];try{F.push(new URL("../styles/main.css",import.meta.url).href)}catch{}try{F.push(new URL("../../styles/main.css",import.meta.url).href)}catch{}F.push("./styles/main.css");for(let D of[...new Set(F.filter(Boolean))])try{let H=await fetch(D);if(H.ok){N=await H.text();break}}catch{}N||(p("\u65E0\u6CD5\u52A0\u8F7D\u5916\u90E8\u6837\u5F0F\u6587\u4EF6\uFF0C\u4F7F\u7528\u5185\u7F6E\u6837\u5F0F"),N=x());let q=S.createElement("style");q.id=L,q.textContent=N,(S.head||S.documentElement).appendChild(q),p("\u6837\u5F0F\u5DF2\u6CE8\u5165")}function C(){let L=r.document||document;if(o.uiModule?.getAllStyles){let S=`${n}-ui-styles`;if(!L.getElementById(S)){let N=L.createElement("style");N.id=S,N.textContent=o.uiModule.getAllStyles(),(L.head||L.documentElement).appendChild(N)}}}async function T(){try{let{applyUiPreferences:L}=await Promise.resolve().then(()=>(vi(),xi));if(o.settingsServiceModule?.settingsService){let S=o.settingsServiceModule.settingsService.getUiSettings();if(S&&S.theme){let N=r.document||document;L(S,N),p(`\u4E3B\u9898\u5DF2\u5E94\u7528: ${S.theme}`)}}}catch(L){p("\u4E3B\u9898\u52A0\u8F7D\u5931\u8D25:",L)}}function _(){let L=r.jQuery||window.jQuery;if(!L){y("jQuery \u672A\u627E\u5230\uFF0C\u5EF6\u8FDF\u91CD\u8BD5..."),setTimeout(_,1e3);return}let S=r.document||document,N=L("#extensionsMenu",S);if(!N.length){p("\u9B54\u68D2\u83DC\u5355\u672A\u627E\u5230\uFF0C\u5EF6\u8FDF\u91CD\u8BD5..."),setTimeout(_,2e3);return}if(L(`#${l}`,N).length>0){p("\u83DC\u5355\u9879\u5DF2\u5B58\u5728");return}let q=L(`<div class="extension_container interactable" id="${l}" tabindex="0"></div>`),D=`
      <div class="list-group-item flex-container flexGap5 interactable" id="${i}" title="\u6253\u5F00 YouYou \u5DE5\u5177\u7BB1">
        <div class="fa-fw fa-solid fa-wand-magic-sparkles extensionsMenuExtensionButton"></div>
        <span>YouYou \u5DE5\u5177\u7BB1</span>
      </div>
    `,H=L(D);H.on("click",function(K){K.stopPropagation(),p("\u83DC\u5355\u9879\u88AB\u70B9\u51FB");let fe=L("#extensionsMenuButton",S);fe.length&&N.is(":visible")&&fe.trigger("click"),typeof e.openPopup=="function"&&e.openPopup()}),q.append(H),N.append(q),p("\u83DC\u5355\u9879\u5DF2\u6DFB\u52A0\u5230\u9B54\u68D2\u533A")}async function Y(){p(`\u521D\u59CB\u5316\u5F00\u59CB... \u7248\u672C: ${a}`),await h();let L=await f();if(p(L?"\u6240\u6709\u6A21\u5757\u52A0\u8F7D\u6210\u529F":"\u90E8\u5206\u6A21\u5757\u52A0\u8F7D\u5931\u8D25\uFF0C\u4F7F\u7528\u53EF\u7528\u529F\u80FD"),!d&&o.uiModule?.initUI)try{await o.uiModule.initUI({services:o,autoInjectStyles:!1,targetDocument:r.document||document}),d=!0,p("UI \u88C5\u914D\u4E2D\u5FC3\u5DF2\u521D\u59CB\u5316")}catch(N){y("UI \u6A21\u5757\u521D\u59CB\u5316\u5931\u8D25:",N)}if(o.uiModule&&(C(),await T()),o.toolAutomationServiceModule?.toolAutomationService){let N=o.toolAutomationServiceModule.toolAutomationService.init();p(N?"\u81EA\u52A8\u5316\u751F\u547D\u5468\u671F\u670D\u52A1\u5DF2\u521D\u59CB\u5316":"\u81EA\u52A8\u5316\u751F\u547D\u5468\u671F\u670D\u52A1\u521D\u59CB\u5316\u672A\u5B8C\u6210\uFF0C\u7B49\u5F85\u5BBF\u4E3B\u4E8B\u4EF6\u6E90\u91CD\u8BD5")}let S=r.document||document;S.readyState==="loading"?S.addEventListener("DOMContentLoaded",()=>{setTimeout(_,1e3)}):setTimeout(_,1e3),p("\u521D\u59CB\u5316\u5B8C\u6210")}return{loadModules:f,injectStyles:h,addMenuItem:_,init:Y,log:p,logError:y}}Me();Ne();Ne();J();var Nr=I.createScope("PromptEditor"),Hx="youyou_toolkit_prompt_editor",qx={system:"System Prompt (\u7CFB\u7EDF\u63D0\u793A\u8BCD)",ai:"AI Prompt (AI\u6307\u4EE4\u63D0\u793A\u8BCD)",user:"User Prompt (\u7528\u6237\u63D0\u793A\u8BCD)"},Yx={system:"fa-server",ai:"fa-robot",user:"fa-user"},Bo=[{id:"system_1",type:"system",role:"SYSTEM",mainSlot:"",content:"",deletable:!1,expanded:!0},{id:"ai_1",type:"ai",role:"USER",mainSlot:"A",content:"",deletable:!1,expanded:!0,isMain:!0},{id:"user_1",type:"user",role:"USER",mainSlot:"B",content:"",deletable:!1,expanded:!0,isMain2:!0}],ia=class{constructor(e={}){this.containerId=e.containerId||Hx,this.segments=e.segments||[...Bo],this.onChange=e.onChange||null,this.editable=e.editable!==!1,this.showMainSlot=e.showMainSlot!==!1,this.$container=null,this.$=null}init(e){if(this.$=window.jQuery||window.parent?.jQuery,!this.$){Nr.error("jQuery not available");return}this.$container=e,this.render(),this.bindEvents()}setSegments(e){this.segments=e&&Array.isArray(e)?[...e]:[...Bo],this.$container&&(this.render(),this.bindEvents())}getSegments(){return this.segments.map(e=>({...e,content:this.getSegmentContent(e.id)}))}getSegmentContent(e){return this.$container&&this.$container.find(`[data-segment-id="${e}"] .yyt-prompt-textarea`).val()||""}render(){if(!this.$container)return;let e=`
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
    `;this.$container.html(e)}renderSegment(e){let s=qx[e.type]||e.type,r=Yx[e.type]||"fa-file",o=e.mainSlot==="A"||e.isMain,n=e.mainSlot==="B"||e.isMain2,a=o?"var(--yyt-accent, #7bb7ff)":n?"#ffb74d":"",i=this.showMainSlot&&e.mainSlot?`<span class="yyt-prompt-slot-badge">mainSlot: ${e.mainSlot}</span>`:"",l=`<span class="yyt-prompt-role-badge">role: ${e.role||"USER"}</span>`;return`
      <div class="yyt-prompt-segment ${e.expanded?"yyt-expanded":""} ${o?"yyt-main-a":""} ${n?"yyt-main-b":""}" 
           data-segment-id="${e.id}" 
           data-segment-type="${e.type}"
           style="${a?`border-left: 3px solid ${a};`:""}">
        <div class="yyt-prompt-segment-header">
          <div class="yyt-prompt-segment-info">
            <i class="fa-solid ${r}"></i>
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
    `}bindEvents(){this.$container&&(Ve(this.$container,"yytPromptEditorSelect"),this.$container.off(".yytPromptEditor"),this.$container.on("click.yytPromptEditor",".yyt-prompt-toggle",e=>{this.$(e.currentTarget).closest(".yyt-prompt-segment").toggleClass("yyt-expanded"),this.$(e.currentTarget).find("i").toggleClass("fa-chevron-up fa-chevron-down")}),this.$container.on("click.yytPromptEditor",".yyt-prompt-delete",e=>{let s=this.$(e.currentTarget).closest(".yyt-prompt-segment").data("segment-id");this.deleteSegment(s)}),this.$container.on("change.yytPromptEditor",".yyt-prompt-role",e=>{let s=this.$(e.currentTarget).closest(".yyt-prompt-segment").data("segment-id"),r=this.$(e.currentTarget).val();this.updateSegmentMeta(s,{role:r})}),this.$container.on("change.yytPromptEditor",".yyt-prompt-main-slot",e=>{let s=this.$(e.currentTarget).closest(".yyt-prompt-segment").data("segment-id"),r=this.$(e.currentTarget).val();this.updateSegmentMeta(s,{mainSlot:r})}),this.$container.on("input.yytPromptEditor",".yyt-prompt-textarea",e=>{this.onChange&&this.onChange(this.getSegments())}),this.$container.on("click.yytPromptEditor",`#${this.containerId}-add-segment`,()=>{this.addSegment()}),this.$container.on("click.yytPromptEditor",`#${this.containerId}-import-prompt`,()=>{this.importPrompt()}),this.$container.on("click.yytPromptEditor",`#${this.containerId}-export-prompt`,()=>{this.exportPrompt()}),bt(this.$container,{namespace:"yytPromptEditorSelect",selectors:[".yyt-prompt-role",".yyt-prompt-main-slot"]}))}addSegment(e=null){let s=`segment_${Date.now()}`,r=e||{id:s,type:"user",role:"USER",mainSlot:"",content:"",deletable:!0,expanded:!0};r.id||(r.id=s),this.segments.push(r),this.render(),this.bindEvents(),this.onChange&&this.onChange(this.getSegments())}deleteSegment(e){let s=this.segments.findIndex(o=>o.id===e);if(s===-1)return;if(this.segments[s].deletable===!1){Nr.warn("\u8BE5\u6BB5\u843D\u4E0D\u53EF\u5220\u9664");return}this.segments.splice(s,1),this.render(),this.bindEvents(),this.onChange&&this.onChange(this.getSegments())}updateSegmentMeta(e,s){let r=this.segments.find(o=>o.id===e);r&&(Object.assign(r,s),this.onChange&&this.onChange(this.getSegments()))}importPrompt(){let e=document.createElement("input");e.type="file",e.accept=".json",e.onchange=s=>{let r=s.target.files[0];if(!r)return;let o=new FileReader;o.onload=n=>{try{let a=JSON.parse(n.target.result);Array.isArray(a)?(this.setSegments(a),Nr.log("\u63D0\u793A\u8BCD\u5BFC\u5165\u6210\u529F")):Nr.error("\u65E0\u6548\u7684\u63D0\u793A\u8BCD\u683C\u5F0F")}catch(a){Nr.error("\u5BFC\u5165\u5931\u8D25:",a)}},o.readAsText(r)},e.click()}exportPrompt(){let e=this.getSegments(),s=JSON.stringify(e,null,2),r=new Blob([s],{type:"application/json"}),o=URL.createObjectURL(r),n=document.createElement("a");n.href=o,n.download=`prompt_group_${Date.now()}.json`,n.click(),URL.revokeObjectURL(o),Nr.log("\u63D0\u793A\u8BCD\u5DF2\u5BFC\u51FA")}destroy(){this.$container&&(Ve(this.$container,"yytPromptEditorSelect"),this.$container.off(".yytPromptEditor"))}escapeHtml(e){return typeof e!="string"?"":e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}};function Ap(){return`
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
  `}function Ep(t){return t.filter(e=>e.content&&e.content.trim()).map(e=>({role:e.role,content:e.content,deletable:e.deletable,mainSlot:e.mainSlot}))}function Cp(t){return Array.isArray(t)?t.map((e,s)=>({id:`segment_${s}_${Date.now()}`,type:e.role==="SYSTEM"?"system":e.role==="assistant"?"ai":"user",role:e.role,mainSlot:e.mainSlot||"",content:e.content||"",deletable:e.deletable!==!1,expanded:!0,isMain:e.mainSlot==="A"||e.isMain,isMain2:e.mainSlot==="B"||e.isMain2})):[...Bo]}J();function kp(t){let{constants:e,topLevelWindow:s,modules:r,caches:o,uiState:n}=t,{SCRIPT_ID:a,SCRIPT_VERSION:i,POPUP_ID:l}=e,c=I.createScope("PopupShell"),d={cleanup:null},u={cleanups:[]},p={cleanups:[]},y={current:null};function f(){return!!n.sidebarCollapsed}function x(){n.sidebarCollapsed=!n.sidebarCollapsed;let g=n.currentPopup;if(!g)return;let b=g.querySelector(".yyt-shell-sidebar"),w=g.querySelector(".yyt-shell-workspace"),E=g.querySelector(".yyt-sidebar-toggle i");b&&b.classList.toggle("yyt-collapsed",n.sidebarCollapsed),w&&w.classList.toggle("yyt-sidebar-collapsed",n.sidebarCollapsed),E&&(E.className=n.sidebarCollapsed?"fa-solid fa-angles-right":"fa-solid fa-angles-left"),Pe()}function h(...g){c.log(g.join(" "))}function C(...g){c.error(g.join(" "))}function T(g){return typeof g!="string"?"":g.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function _(){return s.jQuery||window.jQuery}function Y(){return s.document||document}function L(g){if(!g)return"\u672A\u9009\u62E9\u9875\u9762";let b=r.toolRegistryModule?.getToolConfig(g);if(!b)return g;if(!b.hasSubTabs)return b.name||g;let w=N(g),E=b.subTabs?.find(B=>B.id===w);return E?.name?`${b.name} / ${E.name}`:b.name||g}function S(g){if(!g)return"\u8BF7\u9009\u62E9\u5DE6\u4FA7\u5BFC\u822A\u4E2D\u7684\u9875\u9762\u8FDB\u884C\u914D\u7F6E\u6216\u6392\u67E5\u3002";let b=r.toolRegistryModule?.getToolConfig(g);if(!b)return"\u5F53\u524D\u9875\u9762\u63CF\u8FF0\u6682\u4E0D\u53EF\u7528\u3002";if(!b.hasSubTabs)return b.description||"\u5728\u8FD9\u91CC\u7BA1\u7406\u5F53\u524D\u9875\u9762\u7684\u914D\u7F6E\u548C\u64CD\u4F5C\u3002";let w=N(g);return b.subTabs?.find(B=>B.id===w)?.description||b.description||"\u5728\u8FD9\u91CC\u7BA1\u7406\u5F53\u524D\u5DE5\u5177\u7684\u6A21\u677F\u3001\u914D\u7F6E\u4E0E\u8C03\u8BD5\u80FD\u529B\u3002"}function N(g,b=""){let w=r.toolRegistryModule?.getToolConfig(g);if(!w?.hasSubTabs||!Array.isArray(w.subTabs)||w.subTabs.length===0)return"";let E=String(b||n.currentSubTab[g]||"").trim(),z=E&&w.subTabs.some(V=>V?.id===E)?E:w.subTabs[0]?.id||"";return z&&n.currentSubTab[g]!==z&&(n.currentSubTab[g]=z),z}function F(){let g=n.currentPopup;if(!g)return;let b=L(n.currentMainTab),w=S(n.currentMainTab),E=g.querySelector(".yyt-popup-active-label");E&&(E.textContent=`\u5F53\u524D\uFF1A${b}`);let B=g.querySelector(".yyt-shell-breadcrumb");B&&(B.textContent=b);let z=g.querySelector(".yyt-shell-main-title");z&&(z.textContent=b);let V=g.querySelector(".yyt-shell-main-description");V&&(V.textContent=w)}function q(){typeof d.cleanup=="function"&&(d.cleanup(),d.cleanup=null)}function D(){Array.isArray(u.cleanups)&&(u.cleanups.forEach(g=>{typeof g=="function"&&g()}),u.cleanups=[])}function H(){Array.isArray(p.cleanups)&&(p.cleanups.forEach(g=>{typeof g=="function"&&g()}),p.cleanups=[])}function le(g,b){if(!g||!b)return!1;let w=g.jquery?g[0]:g,E=b.jquery?b[0]:b;return!!(w&&E&&w===E)}function K(g={}){let{container:b=null}=g,w=y.current;if(w&&!(b&&!le(w.container,b))){try{typeof w.destroy=="function"&&w.destroy(w.container)}catch(E){C("\u9500\u6BC1\u52A8\u6001\u9762\u677F host \u5931\u8D25",E)}r.uiModule?.uiManager?.destroyContainerInstance&&r.uiModule.uiManager.destroyContainerInstance(w.container),y.current=null}}function fe(g,b={}){y.current={key:b.key||"",container:g,destroy:typeof b.destroy=="function"?b.destroy:null}}function Qe(){let g=_();if(!g||!n.currentPopup)return;let b=r.toolRegistryModule?.getToolList()||[],w=g(n.currentPopup).find(".yyt-main-nav");if(!w.length)return;let E=b.map(z=>`
      <div class="yyt-main-nav-item ${z.id===n.currentMainTab?"active":""}" data-tab="${z.id}">
        <div class="yyt-main-nav-icon">
          <i class="fa-solid ${T(z.icon||"fa-file")}"></i>
        </div>
        <div class="yyt-main-nav-copy">
          <span class="yyt-main-nav-name">${T(z.name||z.id)}</span>
          <span class="yyt-main-nav-desc">${T(z.description||"\u8FDB\u5165\u6B64\u9875\u9762\u8FDB\u884C\u914D\u7F6E\u3001\u67E5\u770B\u6216\u7EF4\u62A4\u3002")}</span>
        </div>
      </div>
    `).join("");w.html(E),g(n.currentPopup).find(".yyt-main-nav-item").on("click",function(){let V=g(this).data("tab");V&&lr(V)});let B=g(n.currentPopup).find(".yyt-shell-sidebar-hint");B.length&&B.text(`${b.length} tabs`)}function ne(){let g=_();if(!g||!n.currentPopup)return;let b=r.toolRegistryModule?.getToolList()||[],w=r.toolRegistryModule?.getToolConfig("tools"),E=Array.isArray(w?.subTabs)?w.subTabs:[],B=E.filter(Z=>Z?.isCustom).length,z=E.filter(Z=>!Z?.isCustom).length,re=g(n.currentPopup).find(".yyt-shell-sidebar-stats");re.length&&(re.find(".yyt-shell-sidebar-stat").eq(0).find(".yyt-shell-sidebar-stat-value").text(String(b.length)),re.find(".yyt-shell-sidebar-stat").eq(1).find(".yyt-shell-sidebar-stat-value").text(String(z)),re.find(".yyt-shell-sidebar-stat").eq(2).find(".yyt-shell-sidebar-stat-value").text(String(B)))}function Ee(){let g=r.toolRegistryModule?.getToolList()||[];return g.length?(g.some(b=>b.id===n.currentMainTab)||(n.currentMainTab=g[0].id),n.currentMainTab):null}async function Be(g={}){let{rebuildNavigation:b=!1,reRenderSubNav:w=!1}=g,E=_();if(!E||!n.currentPopup)return;K();let B=Ee();if(!B)return;b&&(Qe(),ne());let z=r.toolRegistryModule?.getToolConfig(B),V=!!z?.hasSubTabs,re=E(n.currentPopup).find(".yyt-sub-nav"),Z=E(n.currentPopup).find(".yyt-content-inner");if(b&&Z.length){let ue=new Set(Z.find(".yyt-tab-content").map((Re,Ze)=>E(Ze).data("tab")).get());(r.toolRegistryModule?.getToolList()||[]).forEach(Re=>{ue.has(Re.id)||Z.append(`<div class="yyt-tab-content" data-tab="${T(Re.id)}"></div>`)}),Z.find(".yyt-tab-content").each((Re,Ze)=>{let Nt=E(Ze).data("tab");(r.toolRegistryModule?.getToolList()||[]).some(Ot=>Ot.id===Nt)||E(Ze).remove()})}E(n.currentPopup).find(".yyt-main-nav-item").removeClass("active"),E(n.currentPopup).find(`.yyt-main-nav-item[data-tab="${B}"]`).addClass("active"),E(n.currentPopup).find(".yyt-tab-content").removeClass("active"),E(n.currentPopup).find(`.yyt-tab-content[data-tab="${B}"]`).addClass("active"),V?(re.show(),(w||b)&&Ms(B,z.subTabs)):re.hide(),await ys(B),F(),Pe()}function $t(){if(!n.currentPopup)return;D();let g=()=>{if(n.currentMainTab==="apiPresets"){Be();return}n.currentMainTab==="tools"&&Be({reRenderSubNav:!0})},b=()=>{n.currentMainTab==="tools"?Be({rebuildNavigation:!0,reRenderSubNav:!0}):ne()},w=()=>{n.currentMainTab==="tools"&&Be({rebuildNavigation:!1,reRenderSubNav:!1})},E=()=>{(n.currentMainTab==="bypass"||n.currentMainTab==="tools")&&Be({reRenderSubNav:n.currentMainTab==="tools"})};[M.PRESET_CREATED,M.PRESET_UPDATED,M.PRESET_DELETED].forEach(B=>{u.cleanups.push(P.on(B,g))}),[M.TOOL_REGISTERED,M.TOOL_UPDATED,M.TOOL_UNREGISTERED].forEach(B=>{u.cleanups.push(P.on(B,b))}),u.cleanups.push(P.on(M.TOOL_RUNTIME_UPDATED,w)),[M.BYPASS_PRESET_CREATED,M.BYPASS_PRESET_UPDATED,M.BYPASS_PRESET_DELETED].forEach(B=>{u.cleanups.push(P.on(B,E))})}function xe(g){return!!g?.closest?.(["input","textarea","select","button","a","label","summary","details",'[contenteditable="true"]',".yyt-dialog",".yyt-select-dropdown",".yyt-select-portal-layer"].join(","))}function ve(g){let b=g?.closest?.(["textarea",".yyt-preview-pre",".yyt-select-dropdown",".yyt-select-portal-layer",".yyt-dialog-body",".yyt-worldbook-list",".yyt-tool-panel",".yyt-panel-section"].join(","));return b?b.scrollHeight>b.clientHeight+2||b.scrollWidth>b.clientWidth+2:!1}function Ht(g,b){return b?.closest?.(".yyt-scrollable-surface")===g}function Dt(g,b){if(!g||!b)return null;let w=b.closest?.([".yyt-worldbook-list",".yyt-select-dropdown",".yyt-select-portal-layer",".yyt-dialog-body",".yyt-preview-pre",".yyt-tool-panel",".yyt-panel-section"].join(","));return w&&(w.classList?.contains("yyt-select-portal-layer")||g.contains(w))&&(w.scrollHeight>w.clientHeight+2||w.scrollWidth>w.clientWidth+2)?w:[b.closest?.(".yyt-tool-list"),b.closest?.(".yyt-settings-content"),b.closest?.(".yyt-sub-content"),b.closest?.(".yyt-tab-content.active"),g].filter(Boolean).find(B=>B!==g&&!g.contains(B)?!1:B.scrollHeight>B.clientHeight+2||B.scrollWidth>B.clientWidth+2)||g}function Ie({mainTab:g=null,includeSubContent:b=!1}={}){let w=n.currentPopup;if(!w)return;let E=w.querySelector(".yyt-content");E&&(E.scrollTop=0,E.scrollLeft=0);let B=g?`.yyt-tab-content[data-tab="${g}"]`:".yyt-tab-content.active",z=w.querySelector(B);if(z&&(z.scrollTop=0,z.scrollLeft=0),!b)return;(z?.querySelectorAll(".yyt-sub-content")||[]).forEach(re=>{re.scrollTop=0,re.scrollLeft=0})}function qt(g){let b=Y();if(!g||!b)return;g.classList.add("yyt-scrollable-surface");let w=!1,E=!1,B=0,z=0,V=0,re=0,Z=!1,ue=!1,Re=()=>{w=!1,E=!1,g.classList.remove("yyt-scroll-dragging")},Ze=W=>{W.button===0&&(xe(W.target)||Ht(g,W.target)&&(Z=g.scrollWidth>g.clientWidth+2,ue=g.scrollHeight>g.clientHeight+2,!(!Z&&!ue)&&(W.stopPropagation(),w=!0,E=!1,B=W.clientX,z=W.clientY,V=g.scrollLeft,re=g.scrollTop)))},Nt=W=>{if(!w)return;let Ge=W.clientX-B,ze=W.clientY-z;!(Math.abs(Ge)>4||Math.abs(ze)>4)&&!E||(E=!0,g.classList.add("yyt-scroll-dragging"),Z&&(g.scrollLeft=V-Ge),ue&&(g.scrollTop=re-ze),W.preventDefault())},Ot=()=>{Re()},ps=W=>{if(W.ctrlKey||ve(W.target)||!g.classList.contains("yyt-content")&&!Ht(g,W.target))return;let ze=Dt(g,W.target);!ze||ze!==g&&!g.contains(ze)||!(ze.scrollHeight>ze.clientHeight+2||ze.scrollWidth>ze.clientWidth+2)||(Math.abs(W.deltaY)>0&&(ze.scrollTop+=W.deltaY),Math.abs(W.deltaX)>0&&(ze.scrollLeft+=W.deltaX),W.preventDefault(),W.stopPropagation())},Ke=W=>{E&&W.preventDefault()};g.addEventListener("mousedown",Ze),g.addEventListener("wheel",ps,{passive:!1}),g.addEventListener("dragstart",Ke),b.addEventListener("mousemove",Nt),b.addEventListener("mouseup",Ot),p.cleanups.push(()=>{Re(),g.classList.remove("yyt-scrollable-surface"),g.removeEventListener("mousedown",Ze),g.removeEventListener("wheel",ps),g.removeEventListener("dragstart",Ke),b.removeEventListener("mousemove",Nt),b.removeEventListener("mouseup",Ot)})}function Pe(){let g=n.currentPopup;if(!g)return;H();let b=[...g.querySelectorAll(".yyt-shell-sidebar .yyt-main-nav"),...g.querySelectorAll(".yyt-sub-nav"),...g.querySelectorAll(".yyt-content"),...g.querySelectorAll(".yyt-settings-content"),...g.querySelectorAll(".yyt-tool-list")];[...new Set(b)].forEach(qt)}function Or(g){return`
      <div class="yyt-startup-screen" data-yyt-startup-screen>
        <div class="yyt-startup-screen-inner">
          <div class="yyt-startup-screen-kicker">Welcome</div>
          <div class="yyt-startup-screen-title">YouYou \u5DE5\u5177\u7BB1</div>
          <div class="yyt-startup-screen-desc">\u96C6\u4E2D\u7BA1\u7406 API \u9884\u8BBE\u3001\u81EA\u5B9A\u4E49\u5DE5\u5177\u3001\u63D0\u53D6\u89C4\u5219\u3001Ai\u6307\u4EE4\u9884\u8BBE\u4E0E\u8BCA\u65AD\u6D41\u7A0B\u3002\u6BCF\u6B21\u5237\u65B0\u540E\u90FD\u4F1A\u91CD\u65B0\u663E\u793A\uFF0C\u4FBF\u4E8E\u5FEB\u901F\u56DE\u5230\u4ECB\u7ECD\u5165\u53E3\u3002</div>
          <div class="yyt-startup-screen-modules">
            ${(g||[]).slice(0,6).map(w=>`
      <div class="yyt-startup-module-chip">
        <i class="fa-solid ${T(w.icon||"fa-file")}"></i>
        <span>${T(w.name||w.id)}</span>
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
    `}function ds(g){let b=_();if(!b||!n.currentPopup||n.startupScreenDismissed)return;let w=b(n.currentPopup).find(".yyt-popup-body"),E=w.find(".yyt-popup-shell");!w.length||!E.length||w.find("[data-yyt-startup-screen]").length||(E.attr("data-yyt-startup-visible","true"),w.prepend(Or(g)),w.find(".yyt-startup-enter").on("click",()=>{w.find("[data-yyt-startup-screen]").remove(),E.removeAttr("data-yyt-startup-visible"),n.startupScreenDismissed=!0,Pe()}))}function Lr(){let g=Y(),b=n.currentPopup,w=b?.querySelector(".yyt-popup-header");if(!b||!w||!g)return;let E=!1,B=0,z=0,V=0,re=0,Z="",ue=()=>({width:s.innerWidth||g.documentElement?.clientWidth||window.innerWidth||0,height:s.innerHeight||g.documentElement?.clientHeight||window.innerHeight||0}),Re=(Ke,W,Ge)=>Math.min(Math.max(Ke,W),Ge),Ze=()=>{E&&(E=!1,b.classList.remove("yyt-popup-dragging"),g.body.style.userSelect=Z)},Nt=Ke=>{if(!E||!n.currentPopup)return;let W=Ke.clientX-B,Ge=Ke.clientY-z,{width:ze,height:da}=ue(),Up=b.offsetWidth||0,jp=b.offsetHeight||0,Fp=Math.max(0,ze-Up),Kp=Math.max(0,da-jp);b.style.left=`${Re(V+W,0,Fp)}px`,b.style.top=`${Re(re+Ge,0,Kp)}px`,b.style.transform="none",b.style.right="auto",b.style.bottom="auto"},Ot=()=>{Ze()},ps=Ke=>{if(Ke.button!==0||Ke.target?.closest(".yyt-popup-close"))return;E=!0,B=Ke.clientX,z=Ke.clientY;let W=b.getBoundingClientRect();V=W.left,re=W.top,b.style.left=`${W.left}px`,b.style.top=`${W.top}px`,b.style.transform="none",b.style.right="auto",b.style.bottom="auto",b.classList.add("yyt-popup-dragging"),Z=g.body.style.userSelect||"",g.body.style.userSelect="none",Ke.preventDefault()};w.addEventListener("mousedown",ps),g.addEventListener("mousemove",Nt),g.addEventListener("mouseup",Ot),d.cleanup=()=>{Ze(),w.removeEventListener("mousedown",ps),g.removeEventListener("mousemove",Nt),g.removeEventListener("mouseup",Ot)}}function us(){K(),q(),D(),H();let g=_();if(g&&n.currentPopup){let b=g(n.currentPopup);Ve(b,"yytPopupToolConfigSelect"),Ve(b,"yytPromptEditorSelect")}n.currentPopup&&(n.currentPopup.remove(),n.currentPopup=null),n.currentOverlay&&(n.currentOverlay.remove(),n.currentOverlay=null),h("\u5F39\u7A97\u5DF2\u5173\u95ED")}function lr(g){K(),n.currentMainTab=g;let b=_();if(!b||!n.currentPopup)return;Ie({mainTab:g,includeSubContent:!0}),b(n.currentPopup).find(".yyt-main-nav-item").removeClass("active"),b(n.currentPopup).find(`.yyt-main-nav-item[data-tab="${g}"]`).addClass("active");let w=r.toolRegistryModule?.getToolConfig(g);w?.hasSubTabs?(b(n.currentPopup).find(".yyt-sub-nav").show(),Ms(g,w.subTabs)):b(n.currentPopup).find(".yyt-sub-nav").hide(),b(n.currentPopup).find(".yyt-tab-content").removeClass("active"),b(n.currentPopup).find(`.yyt-tab-content[data-tab="${g}"]`).addClass("active"),ys(g),F(),Pe()}function Br(g,b){K(),n.currentSubTab[g]=b;let w=_();!w||!n.currentPopup||(Ie({mainTab:g,includeSubContent:!0}),w(n.currentPopup).find(".yyt-sub-nav-item").removeClass("active"),w(n.currentPopup).find(`.yyt-sub-nav-item[data-subtab="${b}"]`).addClass("active"),Rs(g,b),F(),Pe())}function Ms(g,b){let w=_();if(!w||!n.currentPopup||!b)return;let E=N(g,n.currentSubTab[g]||b[0]?.id),z=(g==="tools"?[{key:"ai",title:"AI \u5DE5\u5177",items:b.filter(V=>(V?.toolKind||"ai")!=="script")},{key:"script",title:"\u811A\u672C\u5DE5\u5177",items:b.filter(V=>V?.toolKind==="script")}].filter(V=>V.items.length>0):[{key:"default",title:"",items:b}]).map(V=>{let re=V.title?`<div class="yyt-sub-nav-group-title">${T(V.title)}</div>`:"",Z=V.items.map(ue=>`
        <div class="yyt-sub-nav-item ${ue.id===E?"active":""}" data-subtab="${ue.id}">
          <i class="fa-solid ${ue.icon||"fa-file"}"></i>
          <span>${T(ue.name||ue.id)}</span>
        </div>
      `).join("");return`
        <div class="yyt-sub-nav-group yyt-sub-nav-group-${V.key}">
          ${re}
          <div class="yyt-sub-nav-group-items">
            ${Z}
          </div>
        </div>
      `}).join("");w(n.currentPopup).find(".yyt-sub-nav").html(z),w(n.currentPopup).find(".yyt-sub-nav-item").on("click",function(){let re=w(this).data("subtab");Br(g,re)}),Pe()}async function ys(g){let b=_();if(!b||!n.currentPopup)return;let w=b(n.currentPopup).find(`.yyt-tab-content[data-tab="${g}"]`);if(!w.length)return;let E=r.toolRegistryModule?.getToolConfig(g);if(g==="tools"){let z=N(g);E?.hasSubTabs&&z?await Rs(g,z):w.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5DE5\u5177\u914D\u7F6E\u52A0\u8F7D\u5931\u8D25</span></div>'),Pe();return}await r.uiModule?.renderMainTab?.(g,w)||Ps(g,w),Pe()}async function Rs(g,b){let w=_();if(!w||!n.currentPopup)return;let E=w(n.currentPopup).find(`.yyt-tab-content[data-tab="${g}"]`);if(!E.length)return;let B=r.toolRegistryModule?.getToolConfig(g);if(B?.hasSubTabs){let V=N(g,b),re=B.subTabs?.find(Ze=>Ze.id===V),Z=E.find(".yyt-sub-content");if(Z.length||(E.html('<div class="yyt-sub-content"></div>'),Z=E.find(".yyt-sub-content")),!re){Z.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5F53\u524D\u5B50\u9875\u9762\u4E0D\u5B58\u5728\u6216\u5DF2\u5931\u6548</span></div>'),Ie({mainTab:g,includeSubContent:!0}),Pe();return}let ue=re.component;if(ue==="GenericToolConfigPanel"){await Uo(re,Z),Ie({mainTab:g,includeSubContent:!0}),Pe();return}K({container:Z});let Re=await r.uiModule?.renderSubTabComponent?.(ue,Z);Re?fe(Z,{key:Re}):Z.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-tools"></i><span>\u529F\u80FD\u5F00\u53D1\u4E2D...</span></div>'),Ie({mainTab:g,includeSubContent:!0}),Pe();return}let z=E.find(".yyt-sub-content");if(z.length){switch(K({container:z}),b){case"config":Rp(g,z);break;case"prompts":await Pp(g,z);break;case"presets":$p(g,z);break;default:z.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-tools"></i><span>\u529F\u80FD\u5F00\u53D1\u4E2D...</span></div>')}Ie({mainTab:g,includeSubContent:!0}),Pe()}}async function Uo(g,b){if(!(!_()||!b?.length||!g?.id)){K({container:b});try{let E=o.dynamicToolPanelCache.get(g.id);if(!E){let V=(await Promise.resolve().then(()=>(tr(),Vd)))?.createToolConfigPanel;if(typeof V!="function")throw new Error("\u901A\u7528\u5DE5\u5177\u9762\u677F\u5DE5\u5382\u4E0D\u53EF\u7528");E=()=>V({id:`${g.id}Panel`,toolId:g.id,postResponseHint:`\u70B9\u51FB\u201C\u7ACB\u5373\u6267\u884C\u4E00\u6B21\u201D\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u6267\u884C\u201C${g.name||g.id}\u201D\u3002`,extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 custom_tag
\u6216 regex:<custom_tag>([\\s\\S]*?)</custom_tag>`,previewDialogId:`${g.id}-extraction-preview`,previewTitle:`${g.name||g.id} \u63D0\u53D6\u9884\u89C8`}),o.dynamicToolPanelCache.set(g.id,E)}let B=E();B.renderTo(b),fe(b,{key:g.id,destroy:typeof B?.destroy=="function"?z=>B.destroy(z):null}),Pe()}catch(E){y.current=null,C("\u81EA\u5B9A\u4E49\u5DE5\u5177\u9762\u677F\u52A0\u8F7D\u5931\u8D25:",E),b.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u81EA\u5B9A\u4E49\u5DE5\u5177\u9762\u677F\u52A0\u8F7D\u5931\u8D25</span></div>')}}}function Ps(g,b){if(!_())return;let E=r.toolRegistryModule?.getToolConfig(g);if(!E){b.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5DE5\u5177\u914D\u7F6E\u4E0D\u5B58\u5728</span></div>');return}let B=n.currentSubTab[g]||E.subTabs?.[0]?.id||"config";b.html(`
      <div class="yyt-tool-window">
        <div class="yyt-sub-content" data-subtab="${B}">
          <!-- \u5B50\u5185\u5BB9\u5C06\u5728\u6B64\u6E32\u67D3 -->
        </div>
      </div>
    `),Rs(g,B)}function Rp(g,b){if(!_())return;let E=r.toolManagerModule?.getTool(g),B=r.presetManagerModule?.getAllPresets()||[],z=r.toolRegistryModule?.getToolApiPreset(g)||"",V=B.map(re=>`<option value="${T(re.name)}" ${re.name===z?"selected":""}>${T(re.name)}</option>`).join("");b.html(`
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
              ${V}
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
              <input type="number" class="yyt-input" id="yyt-tool-timeout" value="${E?.config?.execution?.timeout||6e4}">
            </div>
            <div class="yyt-form-group yyt-flex-1">
              <label>\u91CD\u8BD5\u6B21\u6570</label>
              <input type="number" class="yyt-input" id="yyt-tool-retries" value="${E?.config?.execution?.retries||3}">
            </div>
          </div>
        </div>
      </div>
    `),bt(b,{namespace:"yytPopupToolConfigSelect",selectors:["#yyt-tool-api-preset"]}),b.find("#yyt-save-tool-preset").on("click",function(){let Z=b.find("#yyt-tool-api-preset").val();r.toolRegistryModule?.setToolApiPreset(g,Z);let ue=s.toastr;ue&&ue.success("API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u4FDD\u5B58","YouYou \u5DE5\u5177\u7BB1")})}async function Pp(g,b){if(!_()){b.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u63D0\u793A\u8BCD\u7F16\u8F91\u5668\u6A21\u5757\u672A\u52A0\u8F7D</span></div>');return}let B=r.toolManagerModule?.getTool(g)?.config?.messages||[],z=Cp(B)||Bo,V=new ia({containerId:`yyt-prompt-editor-${g}`,segments:z,onChange:Z=>{let ue=Ep(Z);h("\u63D0\u793A\u8BCD\u5DF2\u66F4\u65B0:",ue.length,"\u6761\u6D88\u606F")}});b.html(`<div id="yyt-prompt-editor-${g}" class="yyt-prompt-editor-container"></div>`),V.init(b.find(`#yyt-prompt-editor-${g}`));let re=Ap();if(re){let Z="yyt-prompt-editor-styles",ue=s.document||document;if(!ue.getElementById(Z)){let Re=ue.createElement("style");Re.id=Z,Re.textContent=re,(ue.head||ue.documentElement).appendChild(Re)}}}function $p(g,b){_()&&b.html(`
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
    `)}function Dp(){return`
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
      </div>`}function Np(g,b,w){let E=f(),B=g.map(z=>`
      <div class="yyt-main-nav-item ${z.id===n.currentMainTab?"active":""}" data-tab="${z.id}">
        <div class="yyt-main-nav-icon">
          <i class="fa-solid ${T(z.icon||"fa-file")}"></i>
        </div>
        <div class="yyt-main-nav-copy">
          <span class="yyt-main-nav-name">${T(z.name||z.id)}</span>
          <span class="yyt-main-nav-desc">${T(z.description||"\u8FDB\u5165\u6B64\u9875\u9762\u8FDB\u884C\u914D\u7F6E\u3001\u67E5\u770B\u6216\u7EF4\u62A4\u3002")}</span>
        </div>
      </div>
    `).join("");return`
      <aside class="yyt-shell-sidebar${E?" yyt-collapsed":""}">
        <div class="yyt-shell-sidebar-card">
          <div class="yyt-shell-sidebar-title-row">
            <span class="yyt-shell-sidebar-title">\u9875\u9762\u5BFC\u822A</span>
            <span class="yyt-shell-sidebar-hint">${g.length} tabs</span>
            <button class="yyt-sidebar-toggle" title="${E?"\u5C55\u5F00\u4FA7\u680F":"\u6298\u53E0\u4FA7\u680F"}">
              <i class="fa-solid ${E?"fa-angles-right":"fa-angles-left"}"></i>
            </button>
          </div>
          <div class="yyt-main-nav">
            ${B}
          </div>
          <div class="yyt-shell-sidebar-note">
            \u4FDD\u5B58\u540E\uFF0C\u624B\u52A8\u6267\u884C\u4E0E\u5199\u56DE\u94FE\u90FD\u4F1A\u4EE5\u6700\u65B0\u914D\u7F6E\u4E3A\u51C6\u3002
          </div>
          <div class="yyt-shell-sidebar-stats">
            <div class="yyt-shell-sidebar-stat">
              <span class="yyt-shell-sidebar-stat-value">${g.length}</span>
              <span class="yyt-shell-sidebar-stat-label">\u4E3B\u9875\u9762</span>
            </div>
            <div class="yyt-shell-sidebar-stat">
              <span class="yyt-shell-sidebar-stat-value">${b}</span>
              <span class="yyt-shell-sidebar-stat-label">\u9ED8\u8BA4\u5DE5\u5177</span>
            </div>
            <div class="yyt-shell-sidebar-stat">
              <span class="yyt-shell-sidebar-stat-value">${w}</span>
              <span class="yyt-shell-sidebar-stat-label">\u81EA\u5B9A\u4E49\u5DE5\u5177</span>
            </div>
          </div>
        </div>
      </aside>`}function Op(g,b){return`
      <div class="yyt-shell-main-header">
        <div class="yyt-shell-main-heading-block">
          <div class="yyt-shell-main-title">${T(g)}</div>
          <div class="yyt-shell-main-description">${T(b)}</div>
        </div>
        <div class="yyt-shell-main-actions">
          <div class="yyt-shell-main-meta">
            <i class="fa-solid fa-circle-info"></i>
            <span>\u4FDD\u5B58\u540E\u6267\u884C\u94FE\u4F1A\u7ACB\u5373\u4F7F\u7528\u6700\u65B0\u914D\u7F6E</span>
          </div>
        </div>
      </div>`}function Lp(g,b){return g.map(w=>`
      <div class="yyt-tab-content ${w.id===b?"active":""}" data-tab="${w.id}">
      </div>
    `).join("")}function Bp(g){return`
      <div class="yyt-popup-footer">
        <div class="yyt-popup-footer-left">
          <div class="yyt-popup-status-cluster">
            <div class="yyt-popup-status">
              <i class="fa-solid fa-compass"></i>
              <span class="yyt-popup-active-label">\u5F53\u524D\uFF1A${T(g)}</span>
            </div>
            <div class="yyt-popup-footer-note">
              API\u3001\u5DE5\u5177\u3001\u63D0\u53D6\u4E0E\u8BCA\u65AD\u7EDF\u4E00\u5165\u53E3\u3002
            </div>
          </div>
        </div>
      </div>`}async function zp(){if(n.currentPopup){h("\u5F39\u7A97\u5DF2\u5B58\u5728");return}let g=t?.services?.loadModules;typeof g=="function"&&await g();let b=_(),w=Y();if(!b){C("jQuery \u672A\u627E\u5230\uFF0C\u65E0\u6CD5\u521B\u5EFA\u5F39\u7A97");return}let E=r.toolRegistryModule?.getToolList()||[];if(!E.length){C("\u5DE5\u5177\u5217\u8868\u4E3A\u7A7A\uFF0C\u65E0\u6CD5\u521B\u5EFA\u5F39\u7A97");return}E.some(W=>W.id===n.currentMainTab)||(n.currentMainTab=E[0].id);let B=r.toolRegistryModule?.getToolConfig("tools"),z=Array.isArray(B?.subTabs)?B.subTabs:[],V=z.filter(W=>W?.isCustom).length,re=z.filter(W=>!W?.isCustom).length,Z=L(n.currentMainTab),ue=S(n.currentMainTab);n.currentOverlay=w.createElement("div"),n.currentOverlay.className="yyt-popup-overlay",n.currentOverlay.addEventListener("click",W=>{W.target===n.currentOverlay&&us()}),w.body.appendChild(n.currentOverlay);let Re=f(),Ze=`
      <div class="yyt-popup" id="${l}">
        ${Dp()}
        <div class="yyt-popup-body">
          <div class="yyt-popup-shell">
            <div class="yyt-shell-workspace${Re?" yyt-sidebar-collapsed":""}">
              ${Np(E,re,V)}
              <section class="yyt-shell-main">
                ${Op(Z,ue)}
                <div class="yyt-sub-nav" style="display: none;"></div>
                <div class="yyt-content-frame">
                  <div class="yyt-content">
                    <div class="yyt-content-inner">
                      ${Lp(E,n.currentMainTab)}
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
        ${Bp(Z)}
      </div>
    `,Nt=w.createElement("div");Nt.innerHTML=Ze,n.currentPopup=Nt.firstElementChild,w.body.appendChild(n.currentPopup),b(n.currentPopup).find(".yyt-popup-close").on("click",us),b(n.currentPopup).find(".yyt-sidebar-toggle").on("click",x);let Ot=W=>{W.key==="Escape"&&(w.querySelector(".yyt-dialog-overlay")||w.querySelector(".yyt-twb-editor-drawer.is-open")||(W.stopPropagation(),us()))},ps=W=>{if(!(W.ctrlKey||W.metaKey)||W.key!=="s"||!n.currentPopup)return;W.preventDefault(),W.stopPropagation();let Ge=b(n.currentPopup),ze=Ge.find("#yyt-bypass-save:visible").first()||Ge.find(`#${a}-save-api-config:visible`).first()||Ge.find("#yyt-save-tool-preset:visible").first()||Ge.find('[data-twb-action="save"]:visible').first();ze?.length&&ze.trigger("click")};w.addEventListener("keydown",Ot),w.addEventListener("keydown",ps),u.cleanups.push(()=>{w.removeEventListener("keydown",Ot),w.removeEventListener("keydown",ps)}),$t(),b(n.currentPopup).find(".yyt-main-nav-item").on("click",function(){let Ge=b(this).data("tab");Ge&&lr(Ge)}),Lr(),ys(n.currentMainTab);let Ke=r.toolRegistryModule?.getToolConfig(n.currentMainTab);Ke?.hasSubTabs&&(b(n.currentPopup).find(".yyt-sub-nav").show(),Ms(n.currentMainTab,Ke.subTabs)),F(),ds(E),Pe(),h("\u5F39\u7A97\u5DF2\u6253\u5F00")}return{openPopup:zp,closePopup:us,switchMainTab:lr,switchSubTab:Br,renderTabContent:ys,renderSubTabContent:Rs}}function Ip(t,e={}){let{constants:s,modules:r}=t,{SCRIPT_ID:o,SCRIPT_VERSION:n}=s,{init:a,loadModules:i,addMenuItem:l,popupShell:c}=e;return{version:n,id:o,init:a,openPopup:c?.openPopup,closePopup:c?.closePopup,switchMainTab:c?.switchMainTab,switchSubTab:c?.switchSubTab,addMenuItem:l,getStorage:()=>r.storageModule,getApiConnection:()=>r.apiConnectionModule,getPresetManager:()=>r.presetManagerModule,getUi:()=>r.uiModule,getUiModule:()=>r.uiModule,getRegexExtractor:()=>r.regexExtractorModule,getToolManager:()=>r.toolManagerModule,getToolExecutor:()=>r.toolExecutorModule,getWindowManager:()=>r.windowManagerModule,getToolRegistry:()=>r.toolRegistryModule,getSettingsService:()=>r.settingsServiceModule,getBypassManager:()=>r.bypassManagerModule,getVariableResolver:()=>r.variableResolverModule,getContextInjector:()=>r.contextInjectorModule,getToolPromptService:()=>r.toolPromptServiceModule,getToolOutputService:()=>r.toolOutputServiceModule,getToolAutomationService:()=>r.toolAutomationServiceModule,getDataProvider:()=>r.toolDataProviderModule?.getCurrentProvider?.()||null,async getDataProviderAsync(){return await i(),r.toolDataProviderModule?.getToolDataProvider?.()||null},async getApiConfig(){return await i(),r.apiConnectionModule?.getApiConfig?.()||null},async saveApiConfig(d){return await i(),r.apiConnectionModule?(r.apiConnectionModule.updateApiConfig(d),!0):!1},async getPresets(){return await i(),r.presetManagerModule?r.presetManagerModule.getAllPresets():[]},async sendApiRequest(d,u){if(await i(),r.apiConnectionModule)return r.apiConnectionModule.sendApiRequest(d,u);throw new Error("API\u6A21\u5757\u672A\u52A0\u8F7D")},async testApiConnection(){return await i(),r.apiConnectionModule?r.apiConnectionModule.testApiConnection():{success:!1,message:"API\u6A21\u5757\u672A\u52A0\u8F7D"}},registerTool(d,u){return r.toolRegistryModule?.registerTool(d,u)||!1},unregisterTool(d){return r.toolRegistryModule?.unregisterTool(d)||!1},getToolList(){return r.toolRegistryModule?.getToolList()||[]},createWindow(d){return r.windowManagerModule?.createWindow(d)||null},closeWindow(d){r.windowManagerModule?.closeWindow(d)},startAutomation(){return r.toolAutomationServiceModule?.toolAutomationService?.init?.()||!1},stopAutomation(){r.toolAutomationServiceModule?.toolAutomationService?.stop?.()},getAutomationRuntime(){return r.toolAutomationServiceModule?.toolAutomationService?.getRuntimeSnapshot?.()||null},cancelAutomation(d={}){return r.toolAutomationServiceModule?.toolAutomationService?.cancelAutomation?.(d)||{success:!1,error:"\u81EA\u52A8\u5316\u670D\u52A1\u672A\u52A0\u8F7D"}},async processCurrentAssistantMessage(d={}){return r.toolAutomationServiceModule?.toolAutomationService?.processCurrentAssistantMessage?.(d)||{success:!1,error:"\u81EA\u52A8\u5316\u670D\u52A1\u672A\u52A0\u8F7D"}}}}var la="youyou_toolkit",Gx="1.0.155",Vx=`${la}-menu-item`,Jx=`${la}-menu-container`,Xx=`${la}-popup`,Qx=typeof window.parent<"u"?window.parent:window,ca={constants:{SCRIPT_ID:la,SCRIPT_VERSION:Gx,MENU_ITEM_ID:Vx,MENU_CONTAINER_ID:Jx,POPUP_ID:Xx},topLevelWindow:Qx,modules:{storageModule:null,apiConnectionModule:null,uiModule:null,presetManagerModule:null,regexExtractorModule:null,toolManagerModule:null,toolExecutorModule:null,toolTriggerModule:null,windowManagerModule:null,toolRegistryModule:null,settingsServiceModule:null,bypassManagerModule:null,variableResolverModule:null,contextInjectorModule:null,toolPromptServiceModule:null,toolOutputServiceModule:null,toolAutomationServiceModule:null,toolDataProviderModule:null},caches:{dynamicToolPanelCache:new Map},services:{loadModules:null},uiState:{currentPopup:null,currentOverlay:null,currentMainTab:"apiPresets",currentSubTab:{},startupScreenDismissed:!1}},Mp=kp(ca),zo=_p(ca,{openPopup:Mp.openPopup});ca.services.loadModules=zo.loadModules;var bl=Ip(ca,{init:zo.init,loadModules:zo.loadModules,addMenuItem:zo.addMenuItem,popupShell:Mp});if(typeof window<"u"&&(window.YouYouToolkit=bl,typeof window.parent<"u"&&window.parent!==window))try{window.parent.YouYouToolkit=bl}catch{}var w_=bl;zo.init();Promise.resolve().then(()=>(J(),xl)).then(({logger:t})=>{t.createScope("Bootstrap").log("\u6A21\u5757\u52A0\u8F7D\u5B8C\u6210")});export{w_ as default};
