var Xf=Object.defineProperty;var L=(t,e)=>()=>(t&&(e=t(t=0)),e);var oe=(t,e)=>{for(var r in e)Xf(t,r,{get:e[r],enumerable:!0})};var D,Ri,z,Ke=L(()=>{D={STORAGE_CHANGED:"storage:changed",STORAGE_CLEARED:"storage:cleared",PRESET_CREATED:"preset:created",PRESET_UPDATED:"preset:updated",PRESET_DELETED:"preset:deleted",PRESET_ACTIVATED:"preset:activated",PRESET_IMPORTED:"preset:imported",PRESET_EXPORTED:"preset:exported",API_CONFIG_UPDATED:"api:configUpdated",API_REQUEST_START:"api:requestStart",API_REQUEST_SUCCESS:"api:requestSuccess",API_REQUEST_ERROR:"api:requestError",API_CONNECTION_TESTED:"api:connectionTested",TOOL_REGISTERED:"tool:registered",TOOL_UNREGISTERED:"tool:unregistered",TOOL_UPDATED:"tool:updated",TOOL_RUNTIME_UPDATED:"tool:runtimeUpdated",TOOL_ENABLED:"tool:enabled",TOOL_DISABLED:"tool:disabled",TOOL_EXECUTING:"tool:executing",TOOL_EXECUTED:"tool:executed",TOOL_ERROR:"tool:error",TOOL_EXECUTION_STARTED:"tool:executionStarted",TOOL_EXECUTION_FAILED:"tool:executionFailed",REGEX_RULE_ADDED:"regex:ruleAdded",REGEX_RULE_UPDATED:"regex:ruleUpdated",REGEX_RULE_DELETED:"regex:ruleDeleted",REGEX_RULES_CLEARED:"regex:rulesCleared",REGEX_PRESET_LOADED:"regex:presetLoaded",REGEX_EXTRACTED:"regex:extracted",UI_INITIALIZED:"ui:initialized",UI_RENDER_REQUESTED:"ui:renderRequested",UI_TAB_CHANGED:"ui:tabChanged",UI_SUBTAB_CHANGED:"ui:subTabChanged",UI_POPUP_OPENED:"ui:popupOpened",UI_POPUP_CLOSED:"ui:popupClosed",UI_WINDOW_CREATED:"ui:windowCreated",UI_WINDOW_CLOSED:"ui:windowClosed",APP_INITIALIZING:"app:initializing",APP_INITIALIZED:"app:initialized",APP_ERROR:"app:error",SETTINGS_UPDATED:"settings:updated",TOOL_CONTEXT_INJECTED:"tool:contextInjected",TOOL_CONTEXT_CLEARED:"tool:contextCleared",BYPASS_PRESET_CREATED:"bypass:presetCreated",BYPASS_PRESET_UPDATED:"bypass:presetUpdated",BYPASS_PRESET_DELETED:"bypass:presetDeleted",BYPASS_PRESET_ACTIVATED:"bypass:presetActivated",TOOL_OUTPUT_MODE_CHANGED:"tool:outputModeChanged"},Ri=class{constructor(){this.listeners=new Map,this.onceCallbacks=new Map,this.history=[],this.maxHistorySize=100,this.debugMode=!1}on(e,r,s={}){if(!e||typeof r!="function")return console.warn("[EventBus] \u65E0\u6548\u7684\u4E8B\u4EF6\u6216\u56DE\u8C03"),()=>{};let{priority:o=0}=s;this.listeners.has(e)||this.listeners.set(e,new Set);let n={callback:r,priority:o};return this.listeners.get(e).add(n),this.debugMode&&console.log(`[EventBus] \u8BA2\u9605: ${e}`),()=>this.off(e,r)}off(e,r){let s=this.listeners.get(e);if(s){for(let o of s)if(o.callback===r){s.delete(o);break}this.debugMode&&console.log(`[EventBus] \u53D6\u6D88\u8BA2\u9605: ${e}`)}}emit(e,r){this.debugMode&&console.log(`[EventBus] \u53D1\u5E03: ${e}`,r),this._addToHistory(e,r);let s=this.listeners.get(e);if(!s||s.size===0)return;let o=Array.from(s).sort((n,i)=>i.priority-n.priority);for(let{callback:n}of o)try{n(r)}catch(i){console.error(`[EventBus] \u4E8B\u4EF6\u5904\u7406\u9519\u8BEF (${e}):`,i)}}once(e,r){let s=o=>{this.off(e,s),r(o)};return this.on(e,s)}wait(e,r=0){return new Promise((s,o)=>{let n=null,i=this.once(e,a=>{n&&clearTimeout(n),s(a)});r>0&&(n=setTimeout(()=>{i(),o(new Error(`\u7B49\u5F85\u4E8B\u4EF6\u8D85\u65F6: ${e}`))},r))})}hasListeners(e){let r=this.listeners.get(e);return r&&r.size>0}listenerCount(e){let r=this.listeners.get(e);return r?r.size:0}removeAllListeners(e){e?this.listeners.delete(e):this.listeners.clear()}setDebugMode(e){this.debugMode=e}_addToHistory(e,r){this.history.push({event:e,data:r,timestamp:Date.now()}),this.history.length>this.maxHistorySize&&this.history.shift()}getHistory(e){return e?this.history.filter(r=>r.event===e):[...this.history]}clearHistory(){this.history=[]}},z=new Ri});var dc={};oe(dc,{LOG_LEVEL:()=>le,LoggerService:()=>nn,default:()=>Qf,logger:()=>C});var le,cc,nn,C,Qf,q=L(()=>{Ke();le=Object.freeze({DEBUG:0,INFO:1,WARN:2,ERROR:3}),cc=Object.freeze({[le.DEBUG]:"DEBUG",[le.INFO]:"INFO",[le.WARN]:"WARN",[le.ERROR]:"ERROR"}),nn=class{constructor(){this._entries=[],this._maxSize=2e3,this._nextId=1,this._minLevel=le.INFO,this._eventKey="logger:entry",this._statsEventKey="logger:statsChanged",this._pendingFlush=!1}_write(e,r,s,o){let n={id:this._nextId++,timestamp:Date.now(),level:e,scope:r,message:s,data:o};this._entries.push(n),this._entries.length>this._maxSize&&this._entries.shift(),this._forwardToConsole(n),this._pendingFlush||(this._pendingFlush=!0,queueMicrotask(()=>{this._pendingFlush=!1,this._emitEntry(n)}))}_forwardToConsole(e){let r=`[${e.scope}]`;switch(e.level){case le.DEBUG:console.debug(r,e.message,e.data??"");break;case le.INFO:console.log(r,e.message,e.data??"");break;case le.WARN:console.warn(r,e.message,e.data??"");break;case le.ERROR:console.error(r,e.message,e.data??"");break}}_emitEntry(e){try{z?.emit(this._eventKey,e)}catch{}}debug(e,r,s){le.DEBUG<this._minLevel||this._write(le.DEBUG,e,r,s)}info(e,r,s){le.INFO<this._minLevel||this._write(le.INFO,e,r,s)}log(e,r,s){this.info(e,r,s)}warn(e,r,s){le.WARN<this._minLevel||this._write(le.WARN,e,r,s)}error(e,r,s){le.ERROR<this._minLevel||this._write(le.ERROR,e,r,s)}createScope(e){return{debug:(r,s)=>this.debug(e,r,s),info:(r,s)=>this.info(e,r,s),log:(r,s)=>this.log(e,r,s),warn:(r,s)=>this.warn(e,r,s),error:(r,s)=>this.error(e,r,s)}}getEntries(e={}){let{level:r,scope:s,search:o,limit:n=500,offset:i=0}=e,a=this._entries;if(r!=null&&(a=a.filter(d=>d.level>=r)),s&&(a=a.filter(d=>d.scope===s)),o){let d=o.toLowerCase();a=a.filter(c=>c.scope.toLowerCase().includes(d)||c.message.toLowerCase().includes(d))}let l=a.length;return a=a.slice(i,i+n),{entries:a,total:l}}getStats(){let e={total:this._entries.length,byLevel:{DEBUG:0,INFO:0,WARN:0,ERROR:0},byScope:{}};for(let r of this._entries){let s=cc[r.level]||"UNKNOWN";e.byLevel[s]=(e.byLevel[s]||0)+1,e.byScope[r.scope]=(e.byScope[r.scope]||0)+1}return e}setLevel(e){this._minLevel=e}getLevel(){return this._minLevel}setMaxSize(e){this._maxSize=Math.max(100,Math.min(1e4,e))}clear(){this._entries=[],this._nextId=1}levelLabel(e){return cc[e]||"UNKNOWN"}},C=new nn,Qf=C});var uc={};oe(uc,{StorageService:()=>Kr,default:()=>rg,getStorage:()=>Zf,loadSettings:()=>eg,presetStorage:()=>we,saveSettings:()=>tg,storage:()=>M,toolStorage:()=>ge,windowStorage:()=>an});function Zf(){let t=M;return t._getStorage(),t._storage}function eg(){return M.get("settings",{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}})}function tg(t){M.set("settings",t)}var Pi,Kr,M,ge,we,an,rg,Le=L(()=>{q();Pi=C.createScope("StorageService"),Kr=class t{constructor(e="youyou_toolkit"){this.namespaceKey=e,this._storage=null,this._cache=new Map}_getStorage(){if(this._storage)return this._storage;try{let e=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(e.SillyTavern?.getContext){let r=e.SillyTavern.getContext();if(r?.extensionSettings)return r.extensionSettings[this.namespaceKey]||(r.extensionSettings[this.namespaceKey]={}),this._storage={_target:r.extensionSettings[this.namespaceKey],getItem:s=>{let o=r.extensionSettings[this.namespaceKey][s];return typeof o=="string"?o:o?JSON.stringify(o):null},setItem:(s,o)=>{r.extensionSettings[this.namespaceKey][s]=o,this._saveSettings(r)},removeItem:s=>{delete r.extensionSettings[this.namespaceKey][s],this._saveSettings(r)},_isTavern:!0},this._storage}}catch{Pi.warn("SillyTavern\u5B58\u50A8\u4E0D\u53EF\u7528\uFF0C\u4F7F\u7528localStorage")}return this._storage={getItem:e=>{try{return localStorage.getItem(e)}catch{return null}},setItem:(e,r)=>{try{localStorage.setItem(e,r)}catch(s){Pi.error("localStorage\u5199\u5165\u5931\u8D25:",s)}},removeItem:e=>{try{localStorage.removeItem(e)}catch{}},_isTavern:!1},this._storage}_saveSettings(e){if(typeof e.saveSettings=="function")try{e.saveSettings()}catch{}else if(typeof e.saveSettingsDebounced=="function")try{e.saveSettingsDebounced()}catch{}}get(e,r=null){let s=`${this.namespaceKey}:${e}`;if(this._cache.has(s))return this._cache.get(s);let o=this._getStorage(),n=this._getFullKey(e),i=o.getItem(n);if(i===null)return r;try{let a=JSON.parse(i);return this._cache.set(s,a),a}catch{return i}}set(e,r){let s=this._getStorage(),o=this._getFullKey(e),n=`${this.namespaceKey}:${e}`;this._cache.set(n,r);try{s.setItem(o,JSON.stringify(r))}catch(i){Pi.error("\u5B58\u50A8\u5931\u8D25:",i)}}remove(e){let r=this._getStorage(),s=this._getFullKey(e),o=`${this.namespaceKey}:${e}`;this._cache.delete(o),r.removeItem(s)}has(e){let r=this._getStorage(),s=this._getFullKey(e);return r.getItem(s)!==null}clear(){if(this._getStorage()._isTavern){let r=typeof window.parent<"u"?window.parent:window;if(r.SillyTavern?.getContext){let s=r.SillyTavern.getContext();s?.extensionSettings?.[this.namespaceKey]&&(s.extensionSettings[this.namespaceKey]={},this._saveSettings(s))}}else{let r=`${this.namespaceKey}_`,s=[];for(let o=0;o<localStorage.length;o++){let n=localStorage.key(o);n&&n.startsWith(r)&&s.push(n)}s.forEach(o=>localStorage.removeItem(o))}this._cache.clear()}_getFullKey(e){return this._getStorage()._isTavern?e:`${this.namespaceKey}_${e}`}namespace(e){return new t(`${this.namespaceKey}:${e}`)}getMultiple(e){let r={};return e.forEach(s=>{r[s]=this.get(s)}),r}setMultiple(e){Object.entries(e).forEach(([r,s])=>{this.set(r,s)})}exportAll(){let e=this._getStorage(),r={};if(e._isTavern){let s=typeof window.parent<"u"?window.parent:window;if(s.SillyTavern?.getContext){let n=s.SillyTavern.getContext()?.extensionSettings?.[this.namespaceKey]||{};Object.entries(n).forEach(([i,a])=>{r[i]=typeof a=="string"?JSON.parse(a):a})}}else{let s=`${this.namespaceKey}_`;for(let o=0;o<localStorage.length;o++){let n=localStorage.key(o);if(n&&n.startsWith(s)){let i=n.slice(s.length);try{r[i]=JSON.parse(localStorage.getItem(n))}catch{r[i]=localStorage.getItem(n)}}}}return r}},M=new Kr("youyou_toolkit"),ge=new Kr("youyou_toolkit:tools"),we=new Kr("youyou_toolkit:presets"),an=new Kr("youyou_toolkit:windows");rg=M});var mc={};oe(mc,{API_STATUS:()=>cg,fetchAvailableModels:()=>bg,getApiConfig:()=>Ss,getEffectiveApiConfig:()=>co,hasEffectiveApiPreset:()=>uo,sendApiRequest:()=>po,sendWithPreset:()=>Li,testApiConnection:()=>hg,updateApiConfig:()=>ug,validateApiConfig:()=>ln});function ig(){return{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,stream:!1,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}}}function Oi(){return M.get(pc,ig())}function ag(t){M.set(pc,t)}function yc(){return M.get(og,[])}function lg(){return M.get(ng,"")}function $i(t,e={}){let r=new Error(t);return r.allowDirectFallback=e.allowDirectFallback===!0,r}function fc(t,e="chat_completions"){let r=String(t||"").trim();if(!r)return"";let s=null;try{s=new URL(r)}catch{return r}let o=s.pathname.replace(/\/+$/,""),n=o;return e==="chat_completions"?!/\/chat\/completions$/i.test(o)&&!/\/completions$/i.test(o)&&(n=`${o||""}/chat/completions`):e==="models"&&(/\/chat\/completions$/i.test(o)?n=o.replace(/\/chat\/completions$/i,"/models"):/\/completions$/i.test(o)?n=o.replace(/\/completions$/i,"/models"):/\/models$/i.test(o)||(n=`${o||""}/models`)),s.pathname=n.replace(/\/+/g,"/"),s.toString()}function dg(t){let e=String(t||"").trim();if(!e)return"";try{let r=new URL(e);return r.pathname=r.pathname.replace(/\/chat\/completions$/i,"").replace(/\/completions$/i,"").replace(/\/models$/i,"").replace(/\/+$/,"")||"/",r.toString().replace(/\/$/,"")}catch{return e.replace(/\/chat\/completions$/i,"").replace(/\/completions$/i,"").replace(/\/models$/i,"").replace(/\/+$/,"")}}function Ss(){return Oi().apiConfig||{}}function ug(t){let e=Oi();e.apiConfig={...e.apiConfig,...t},ag(e)}function ln(t){let e=[];if(t.useMainApi)return{valid:!0,errors:[]};if(!t.url||!t.url.trim())e.push("API URL \u4E0D\u80FD\u4E3A\u7A7A");else try{new URL(t.url)}catch{e.push("API URL \u683C\u5F0F\u65E0\u6548")}return(!t.model||!t.model.trim())&&e.push("\u6A21\u578B\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"),{valid:e.length===0,errors:e}}function co(t=""){let e=Oi(),r=t||lg()||"";if(r){let o=yc().find(n=>n.name===r);if(o&&o.apiConfig)return{...o.apiConfig,presetName:o.name}}return e.apiConfig||{}}function uo(t=""){return t?yc().some(r=>r?.name===t):!1}async function Li(t,e,r={},s=null){let o=co(t);return await po(e,{...r,apiConfig:o},s)}function gc(t,e={}){let r=e.apiConfig||Ss();return{messages:t,model:r.model||"gpt-3.5-turbo",max_tokens:r.max_tokens||4096,temperature:r.temperature??.7,top_p:r.top_p??.9,stream:r.stream??!1,...e.extraParams}}function Ni(t){let e="";if(t?.choices&&t.choices[0]?.message?.content)e=t.choices[0].message.content;else if(t?.content)e=t.content;else if(t?.text)e=t.text;else if(t?.response)e=t.response;else throw new Error(`\u65E0\u6CD5\u89E3\u6790API\u54CD\u5E94\u683C\u5F0F: ${JSON.stringify(t).slice(0,200)}`);return String(e||"").trim()}async function po(t,e={},r=null){let s=e.apiConfig||Ss(),o=s.useMainApi,n=ln(s);if(!n.valid&&!o)throw new Error(`API\u914D\u7F6E\u65E0\u6548: ${n.errors.join(", ")}`);return o?await pg(t,e,r):await yg(t,s,e,r)}async function pg(t,e,r){let s=typeof window.parent<"u"?window.parent:window;if(!s.TavernHelper?.generateRaw)throw new Error("TavernHelper.generateRaw \u4E0D\u53EF\u7528\u3002\u8BF7\u68C0\u67E5SillyTavern\u7248\u672C\u3002");try{let o=await s.TavernHelper.generateRaw({ordered_prompts:t,should_stream:e.apiConfig?.stream??Ss().stream??!1,...e.extraParams});if(typeof o!="string")throw new Error("\u4E3BAPI\u8FD4\u56DE\u4E86\u975E\u9884\u671F\u7684\u54CD\u5E94\u7C7B\u578B");return o.trim()}catch(o){throw o.name==="AbortError"?o:new Error(`\u4E3BAPI\u8BF7\u6C42\u5931\u8D25: ${o.message}`)}}async function yg(t,e,r,s){let o=typeof window.parent<"u"?window.parent:window;if(o.TavernHelper?.generateRaw)try{return await fg(t,e,r,s,o)}catch(n){let i=String(n?.message||n||"");if(n?.name==="AbortError"||s?.aborted||i.includes("\u505C\u6B62\u6309\u94AE")||i.includes("stop button")||i.includes("Clicked stop")||i==="\u8BF7\u6C42\u5DF2\u53D6\u6D88")throw n;sg.warn("TavernHelper \u81EA\u5B9A\u4E49\u8BF7\u6C42\u5931\u8D25\uFF0C\u56DE\u9000\u5230\u540E\u5907\u94FE\u8DEF:",n)}if(o.SillyTavern?.getRequestHeaders)try{return await gg(t,e,r,s,o)}catch(n){if(!n?.allowDirectFallback)throw n}return await mg(t,e,r,s)}async function fg(t,e,r,s,o){if(s?.aborted)throw new DOMException("\u8BF7\u6C42\u5DF2\u53D6\u6D88","AbortError");let n=await o.TavernHelper.generateRaw({ordered_prompts:t,should_stream:e.stream??!1,max_chat_history:0,custom_api:{apiurl:dg(e.url),key:e.apiKey||"",model:e.model||"gpt-3.5-turbo",max_tokens:e.max_tokens||4096,temperature:e.temperature??.7,top_p:e.top_p??.9},...r.extraParams||{}});return typeof n=="string"?n.trim():Ni(n)}async function gg(t,e,r,s,o){let n=String(e.url||"").trim(),i={...gc(t,{apiConfig:e,...r}),chat_completion_source:"custom",reverse_proxy:n,proxy_password:"",custom_url:n,custom_include_headers:e.apiKey?`Authorization: Bearer ${e.apiKey}`:""},a={...typeof o.SillyTavern?.getRequestHeaders=="function"?o.SillyTavern.getRequestHeaders():{},"Content-Type":"application/json"},l=null;try{l=await fetch("/api/backends/chat-completions/generate",{method:"POST",headers:a,body:JSON.stringify(i),signal:s})}catch(u){throw u?.name==="AbortError"?u:$i(`\u9152\u9986\u540E\u7AEF\u8F6C\u53D1\u8BF7\u6C42\u4E0D\u53EF\u7528\uFF0C\u5DF2\u5C1D\u8BD5\u56DE\u9000\u5230\u6D4F\u89C8\u5668\u76F4\u8FDE\u3002\u539F\u59CB\u9519\u8BEF: ${u.message}`,{allowDirectFallback:!0})}let d=await l.text().catch(()=>"");if(!l.ok){let u=[404,405,501,502].includes(l.status);throw $i(`\u9152\u9986\u540E\u7AEF\u8F6C\u53D1\u8BF7\u6C42\u5931\u8D25 (${l.status}): ${d||"Unknown error"}`,{allowDirectFallback:u})}let c=null;try{c=d?JSON.parse(d):{}}catch{let p=String(d||"").replace(/\s+/g," ").trim().slice(0,120);throw $i(`\u9152\u9986\u540E\u7AEF\u8FD4\u56DE\u4E86\u975EJSON\u5185\u5BB9\u3002\u54CD\u5E94\u7247\u6BB5: ${p||"(\u7A7A\u54CD\u5E94)"}`)}return Ni(c)}async function mg(t,e,r,s){let o=gc(t,{apiConfig:e,...r}),n=fc(e.url,"chat_completions"),i={"Content-Type":"application/json"};e.apiKey&&(i.Authorization=`Bearer ${e.apiKey}`);let a=await fetch(n,{method:"POST",headers:i,body:JSON.stringify(o),signal:s}),l=await a.text().catch(()=>"");if(!a.ok){let c=l||"Unknown error";throw new Error(`API\u8BF7\u6C42\u5931\u8D25 (${a.status}): ${c}`)}let d=null;try{d=l?JSON.parse(l):{}}catch{let u=String(l||"").replace(/\s+/g," ").trim().slice(0,120);throw new Error(`\u81EA\u5B9A\u4E49API\u8FD4\u56DE\u7684\u4E0D\u662FJSON\uFF0C\u53EF\u80FD\u662FURL\u914D\u7F6E\u9519\u8BEF\u3001\u53EA\u586B\u5199\u4E86\u7AD9\u70B9\u9996\u9875/\u57FA\u7840\u8DEF\u5F84\u3001\u6216\u8BF7\u6C42\u88AB\u91CD\u5B9A\u5411\u3002\u5F53\u524D\u4F1A\u81EA\u52A8\u5C1D\u8BD5\u8865\u5168 chat/completions \u7AEF\u70B9\uFF1B\u82E5\u4ECD\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5API URL\uFF0C\u6216\u6539\u4E3A\u542F\u7528\u201C\u4F7F\u7528SillyTavern\u4E3BAPI\u201D\u3002\u54CD\u5E94\u7247\u6BB5: ${u||"(\u7A7A\u54CD\u5E94)"}`)}return Ni(d)}async function hg(t=null){let e=t||Ss(),r=Date.now();try{await po([{role:"user",content:'Hello, this is a connection test. Please respond with "OK".'}],{apiConfig:e});let o=Date.now()-r;return{success:!0,message:`\u8FDE\u63A5\u6210\u529F (\u5EF6\u8FDF: ${o}ms)`,latency:o}}catch(s){return{success:!1,message:`\u8FDE\u63A5\u5931\u8D25: ${s.message}`,latency:Date.now()-r}}}async function bg(t=null){let e=t||Ss();return e.useMainApi?await xg():await wg(e)}async function xg(){let t=typeof window.parent<"u"?window.parent:window;try{if(t.SillyTavern?.getContext){let e=t.SillyTavern.getContext();if(e.settings?.api_server)return[e.settings.api_server]}return["gpt-4","gpt-4-turbo","gpt-3.5-turbo","claude-3-opus","claude-3-sonnet"]}catch{return["gpt-4","gpt-3.5-turbo"]}}async function wg(t){if(!t.url||!t.apiKey)return[];try{let e=fc(t.url,"models"),r=await fetch(e,{method:"GET",headers:{Authorization:`Bearer ${t.apiKey}`}});if(!r.ok)return[];let s=await r.json();return s.data&&Array.isArray(s.data)?s.data.map(o=>o.id||o.name).filter(Boolean).sort():[]}catch{return[]}}var sg,pc,og,ng,cg,cn=L(()=>{Le();q();sg=C.createScope("ApiConnection"),pc="settings",og="api_presets",ng="current_preset";cg={IDLE:"idle",CONNECTING:"connecting",SUCCESS:"success",ERROR:"error"}});var wc={};oe(wc,{createPreset:()=>pn,createPresetFromCurrentConfig:()=>Cg,deletePreset:()=>yn,duplicatePreset:()=>zi,exportPresets:()=>Ui,generateUniquePresetName:()=>Ig,getActiveConfig:()=>Ag,getActivePresetName:()=>Ki,getAllPresets:()=>vr,getPreset:()=>jr,getPresetNames:()=>Tg,getStarredPresets:()=>Eg,importPresets:()=>ji,presetExists:()=>yo,renamePreset:()=>Bi,switchToPreset:()=>fn,togglePresetStar:()=>_g,updatePreset:()=>Di,validatePreset:()=>kg});function Sg(){return{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}}}function xc(){return M.get(vg,Sg())}function ot(){return M.get(hc,[])}function Ur(t){M.set(hc,t)}function un(){return M.get(bc,"")}function dn(t){M.set(bc,t||"")}function vr(){return ot()}function Tg(){return ot().map(e=>e.name)}function jr(t){return!t||typeof t!="string"?null:ot().find(r=>r.name===t)||null}function yo(t){return!t||typeof t!="string"?!1:ot().some(r=>r.name===t)}function pn(t){let{name:e,description:r,apiConfig:s}=t;if(!e||typeof e!="string"||!e.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let o=e.trim();if(yo(o))return{success:!1,message:`\u9884\u8BBE "${o}" \u5DF2\u5B58\u5728`};let n={name:o,description:r||"",apiConfig:{url:s?.url||"",apiKey:s?.apiKey||"",model:s?.model||"",useMainApi:s?.useMainApi??!0,stream:s?.stream??!1,max_tokens:s?.max_tokens||4096,temperature:s?.temperature??.7,top_p:s?.top_p??.9},createdAt:Date.now(),updatedAt:Date.now()},i=ot();return i.push(n),Ur(i),{success:!0,message:`\u9884\u8BBE "${o}" \u521B\u5EFA\u6210\u529F`,preset:n}}function Di(t,e){if(!t||typeof t!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let r=ot(),s=r.findIndex(i=>i.name===t);if(s===-1)return{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if(e.name&&e.name!==t)return{success:!1,message:"\u4E0D\u652F\u6301\u4FEE\u6539\u9884\u8BBE\u540D\u79F0\uFF0C\u8BF7\u521B\u5EFA\u65B0\u9884\u8BBE"};let o=r[s],n={...o,...e,name:o.name,updatedAt:Date.now()};return e.apiConfig&&(n.apiConfig={...o.apiConfig,...e.apiConfig}),r[s]=n,Ur(r),{success:!0,message:`\u9884\u8BBE "${t}" \u66F4\u65B0\u6210\u529F`,preset:n}}function yn(t){if(!t||typeof t!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let e=ot(),r=e.findIndex(s=>s.name===t);return r===-1?{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`}:(e.splice(r,1),Ur(e),un()===t&&dn(""),{success:!0,message:`\u9884\u8BBE "${t}" \u5DF2\u5220\u9664`})}function Bi(t,e){if(!t||typeof t!="string")return{success:!1,message:"\u539F\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};if(!e||typeof e!="string"||!e.trim())return{success:!1,message:"\u65B0\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let r=e.trim();if(!yo(t))return{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if(yo(r))return{success:!1,message:`\u9884\u8BBE "${r}" \u5DF2\u5B58\u5728`};let s=ot(),o=s.find(n=>n.name===t);return o&&(o.name=r,o.updatedAt=Date.now(),Ur(s),un()===t&&dn(r)),{success:!0,message:`\u9884\u8BBE\u5DF2\u91CD\u547D\u540D\u4E3A "${r}"`}}function zi(t,e){if(!t||typeof t!="string")return{success:!1,message:"\u6E90\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};if(!e||typeof e!="string"||!e.trim())return{success:!1,message:"\u76EE\u6807\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let r=e.trim(),s=jr(t);if(!s)return{success:!1,message:`\u6E90\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if(yo(r))return{success:!1,message:`\u9884\u8BBE "${r}" \u5DF2\u5B58\u5728`};let o={...JSON.parse(JSON.stringify(s)),name:r,createdAt:Date.now(),updatedAt:Date.now()},n=ot();return n.push(o),Ur(n),{success:!0,message:`\u9884\u8BBE\u5DF2\u590D\u5236\u4E3A "${r}"`,preset:o}}function _g(t){if(!t||typeof t!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let e=ot(),r=e.find(s=>s.name===t);return r?(r.starred=!r.starred,r.updatedAt=Date.now(),Ur(e),{success:!0,message:r.starred?`\u5DF2\u5C06 "${t}" \u6DFB\u52A0\u5230\u9884\u89C8\u5217\u8868`:`\u5DF2\u5C06 "${t}" \u4ECE\u9884\u89C8\u5217\u8868\u79FB\u9664`,starred:r.starred}):{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`}}function Eg(){return ot().filter(e=>e.starred===!0)}function fn(t){if(!t)return dn(""),{success:!0,message:"\u5DF2\u5207\u6362\u5230\u5F53\u524DAPI\u914D\u7F6E"};let e=jr(t);return e?(dn(t),{success:!0,message:`\u5DF2\u5207\u6362\u5230\u9884\u8BBE "${t}"`,apiConfig:e.apiConfig}):{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`}}function Ki(){return un()}function Ag(){let t=un();if(t){let r=jr(t);if(r)return{presetName:t,apiConfig:r.apiConfig}}return{presetName:"",apiConfig:xc().apiConfig||{}}}function Ui(t=null){if(t){let r=jr(t);if(!r)throw new Error(`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`);return JSON.stringify(r,null,2)}let e=ot();return JSON.stringify(e,null,2)}function ji(t,e={overwrite:!1}){let r;try{r=JSON.parse(t)}catch{return{success:!1,message:"JSON\u89E3\u6790\u5931\u8D25",imported:0}}let s=Array.isArray(r)?r:[r];if(s.length===0)return{success:!1,message:"\u6CA1\u6709\u627E\u5230\u6709\u6548\u7684\u9884\u8BBE\u6570\u636E",imported:0};let o=ot(),n=0;for(let i of s){if(!i.name||typeof i.name!="string"||!i.apiConfig||typeof i.apiConfig!="object")continue;let a=o.findIndex(l=>l.name===i.name);a>=0?e.overwrite&&(i.updatedAt=Date.now(),o[a]=i,n++):(i.createdAt=i.createdAt||Date.now(),i.updatedAt=Date.now(),o.push(i),n++)}return n>0&&Ur(o),{success:!0,message:`\u6210\u529F\u5BFC\u5165 ${n} \u4E2A\u9884\u8BBE`,imported:n}}function Cg(t,e=""){let r=xc();return pn({name:t,description:e,apiConfig:r.apiConfig})}function kg(t){let e=[];return(!t.name||typeof t.name!="string"||!t.name.trim())&&e.push("\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"),(!t.apiConfig||typeof t.apiConfig!="object")&&e.push("\u7F3A\u5C11API\u914D\u7F6E"),{valid:e.length===0,errors:e}}function Ig(t){(!t||typeof t!="string")&&(t="\u65B0\u9884\u8BBE");let e=ot(),r=new Set(e.map(o=>o.name));if(!r.has(t))return t;let s=1;for(;r.has(`${t} (${s})`);)s++;return`${t} (${s})`}var vg,hc,bc,fo=L(()=>{Le();vg="settings",hc="api_presets",bc="current_preset"});function _s(){return typeof window.parent<"u"&&window.parent!==window&&window.parent.document?window.parent.document:document}function re(t){return typeof t!="string"?"":t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function R(t,e,r=3e3){e||(e=t==="error"?"\u64CD\u4F5C\u5931\u8D25":"\u64CD\u4F5C\u5B8C\u6210");let s=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(s.toastr){s.toastr[t](e,"YouYou \u5DE5\u5177\u7BB1",{timeOut:r,progressBar:!0});return}Rg(t,e,r),Mg.log(`[${t.toUpperCase()}] ${e}`)}function Hr(t,e,r={}){e||(e=t==="error"?"\u64CD\u4F5C\u5931\u8D25":"\u64CD\u4F5C\u5B8C\u6210");let{duration:s=3500,sticky:o=!1,noticeId:n=""}=r,i=_s();if(!i?.body){R(t,e,s);return}let a="yyt-top-notice-container",l="yyt-top-notice-styles",d=i.getElementById(a);if(d||(d=i.createElement("div"),d.id=a,d.style.cssText=`
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
    `,i.body.appendChild(d)),!i.getElementById(l)){let b=i.createElement("style");b.id=l,b.textContent=`
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
    `,i.head.appendChild(b)}if(n){let b=d.querySelector(`[data-notice-id="${n}"]`);b&&b.remove()}let c={success:"\u2713",error:"!",warning:"\u2022",info:"i"},u=i.createElement("div");u.className=`yyt-top-notice yyt-top-notice--${t||"info"}`,n&&(u.dataset.noticeId=n);let p=i.createElement("span");p.className="yyt-top-notice__icon",p.textContent=c[t]||c.info;let y=i.createElement("div");y.className="yyt-top-notice__content",y.textContent=e;let f=i.createElement("button");f.className="yyt-top-notice__close",f.type="button",f.setAttribute("aria-label","\u5173\u95ED\u901A\u77E5"),f.textContent="\xD7";let m=()=>{u.style.animation="yyt-top-notice-out 0.18s ease forwards",setTimeout(()=>u.remove(),180)};f.addEventListener("click",m),u.appendChild(p),u.appendChild(y),u.appendChild(f),d.appendChild(u),o||setTimeout(m,s)}function Rg(t,e,r){let s=_s();if(!s)return;let o=s.getElementById("yyt-fallback-toast");o&&o.remove();let n={success:{bg:"rgba(74, 222, 128, 0.9)",border:"#22c55e"},error:{bg:"rgba(248, 113, 113, 0.9)",border:"#ef4444"},warning:{bg:"rgba(251, 191, 36, 0.9)",border:"#f59e0b"},info:{bg:"rgba(123, 183, 255, 0.9)",border:"#7bb7ff"}},i=n[t]||n.info,a=s.createElement("div");if(a.id="yyt-fallback-toast",a.style.cssText=`
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
  `,a.textContent=e,!s.getElementById("yyt-toast-styles")){let l=s.createElement("style");l.id="yyt-toast-styles",l.textContent=`
      @keyframes yyt-toast-in {
        from { opacity: 0; transform: translateX(100px); }
        to { opacity: 1; transform: translateX(0); }
      }
      @keyframes yyt-toast-out {
        from { opacity: 1; transform: translateX(0); }
        to { opacity: 0; transform: translateX(100px); }
      }
    `,s.head.appendChild(l)}s.body.appendChild(a),setTimeout(()=>{a.style.animation="yyt-toast-out 0.3s ease forwards",setTimeout(()=>{a.remove()},300)},r)}function X(){if(Wr)return Wr;if(typeof window.parent<"u"&&window.parent!==window)try{if(window.parent.jQuery)return Wr=window.parent.jQuery,Wr}catch{}return window.jQuery&&(Wr=window.jQuery),Wr}function Pg(){Wr=null}function pe(t){if(!t||t.length===0)return!1;let e=t[0];if(!e||e.nodeType!==1)return!1;let r=e.ownerDocument||document;return e.isConnected?r?.documentElement?.contains?r.documentElement.contains(e):!0:!1}function Sr(...t){return t.flat(1/0).flatMap(e=>String(e||"").split(/\s+/)).map(e=>e.trim()).filter(Boolean).join(" ")}function Ts(t={}){return Object.entries(t).filter(([,e])=>e!=null&&e!==!1).map(([e,r])=>r===!0?e:`${e}="${re(String(r))}"`).join(" ")}function _c(t=[],e="",r=""){let s=String(e??""),o=t.find(n=>n.value===s)||t.find(n=>n.disabled!==!0)||null;return o||{value:s,label:r||s||"\u8BF7\u9009\u62E9",disabled:!1}}function $g(t=""){return String(t||"").split(/\s+/).map(e=>e.trim()).filter(e=>e&&e!=="yyt-select"&&e!=="yyt-native-select-bridge")}function vc(t,e){let r=X();if(!r||!e?.length)return null;let s=e.attr("id")?`#${e.attr("id")}`:e.attr("data-yyt-select-key")?`[data-yyt-select-key="${e.attr("data-yyt-select-key")}"]`:"";if(!s)return null;let n=t.find("[data-yyt-custom-select]").filter((i,a)=>String(r(a).attr("data-yyt-select-target")||"")===s);return n.length?n.first():null}function Ec(t){let e=t?.[0];return e?.ownerDocument?e.ownerDocument:typeof window.parent<"u"&&window.parent!==window&&window.parent.document?window.parent.document:document}function Og(t){if(!X()||!pe(t))return null;let r=t.find("[data-yyt-custom-select]");return r.length?r:null}function Ac(t,e){if(!X()||!e?.length)return null;let s=e.find("[data-yyt-select-native]").first();if(s.length)return s;let o=String(e.attr("data-yyt-select-target")||"").trim();if(!o)return null;let n=t.find(o).first();return n.length?n:null}function Cc(t=null){return t?.jquery&&t[0]?.ownerDocument?t[0].ownerDocument:t?.ownerDocument?t.ownerDocument:t?.nodeType===9?t:_s()}function Wt(t=null){let e=Cc(t),r=Sc.get(e);return r||(r={targetDoc:e,layer:null,activeRoot:null,activeDropdown:null,placeholder:null,cleanup:null},Sc.set(e,r)),r}function Lg(t=null){let e=Cc(t);if(!e?.body)return null;let r=Wt(e);if(r.layer&&r.layer.isConnected)return r.layer;let s=e.getElementById(Tc);return s||(s=e.createElement("div"),s.id=Tc,s.className="yyt-select-portal-layer",e.body.appendChild(s)),r.layer=s,s}function gn(t){if(!X()||!t?.length)return null;let r=t.find("[data-yyt-select-trigger]").first();return r.length?r:t.find(".yyt-select-trigger").first()}function kc(t){let e=X();if(!e||!t?.length)return null;let r=Wt(t);if(r.activeRoot===t[0]&&r.activeDropdown)return e(r.activeDropdown);let s=t.find("[data-yyt-select-dropdown]").first();return s.length?s:t.find(".yyt-select-dropdown").first()}function Ng(t){t&&(t.classList.remove("yyt-floating-open"),t.removeAttribute("data-yyt-floating"),t.removeAttribute("data-yyt-floating-placement"),t.style.position="",t.style.top="",t.style.left="",t.style.right="",t.style.width="",t.style.minWidth="",t.style.maxWidth="",t.style.maxHeight="",t.style.visibility="",t.style.zIndex="")}function Ic(t,e=null){if(!t)return!1;let r=Wt(e||t);return r.activeRoot?.contains?.(t)||r.activeDropdown?.contains?.(t)?!0:!!t.closest?.("[data-yyt-custom-select], .yyt-select-portal-layer")}function Dg(t){if(!t?.targetDoc||typeof t.cleanup=="function")return;let e=t.targetDoc,r=e.defaultView||window,s=a=>{!t.activeRoot||!t.activeDropdown||Ic(a.target,e)||jt(e)},o=a=>{if(a.key!=="Escape")return;let l=t.activeRoot;jt(e);let d=X();d&&l&&gn(d(l))?.trigger("focus")},n=()=>{Gi(e)},i=()=>{Gi(e)};e.addEventListener("mousedown",s,!0),e.addEventListener("keydown",o,!0),r.addEventListener("resize",n),e.addEventListener("scroll",i,!0),t.cleanup=()=>{e.removeEventListener("mousedown",s,!0),e.removeEventListener("keydown",o,!0),r.removeEventListener("resize",n),e.removeEventListener("scroll",i,!0)}}function Bg(t){typeof t?.cleanup=="function"&&t.cleanup(),t&&(t.cleanup=null)}function Hi(t){let e=X();if(!e||!t?.activeRoot||!t?.activeDropdown)return;let r=t.targetDoc;if(!r?.body?.contains?.(t.activeRoot)){jt(r);return}let s=e(t.activeRoot),o=gn(s),n=t.activeDropdown,i=r?.defaultView||window;if(!o?.length||!n?.isConnected||!s[0]?.isConnected){jt(r);return}let a=o[0].getBoundingClientRect(),l=i.innerWidth||r.documentElement?.clientWidth||0,d=i.innerHeight||r.documentElement?.clientHeight||0,c=12,u=8,p=Math.max(0,d-a.bottom-c-u),y=Math.max(0,a.top-c-u),f=p<220&&y>p,b=Math.max(120,Math.floor((f?y:p)||0));n.setAttribute("data-yyt-floating","true"),n.setAttribute("data-yyt-floating-placement",f?"top":"bottom"),n.classList.add("yyt-floating-open");let w=Math.ceil(a.width),S=Math.max(w,Math.floor(l-c*2)),v=n.style.width,K=n.style.minWidth,P=n.style.maxWidth,_=n.style.visibility;n.style.width="max-content",n.style.minWidth=`${w}px`,n.style.maxWidth=`${S}px`,n.style.visibility="hidden";let T=Math.ceil(n.scrollWidth||n.getBoundingClientRect().width||w),F=Math.max(w,Math.min(S,T)),U=Math.min(n.scrollHeight||b,b);n.style.width=v,n.style.minWidth=K,n.style.maxWidth=P,n.style.visibility=_;let A=Math.round(a.left);A+F>l-c&&(A=Math.max(c,Math.round(l-c-F))),A=Math.max(c,A);let O=Math.round(f?a.top-u-U:a.bottom+u);O=Math.max(c,Math.min(O,Math.round(d-c-U))),n.style.position="fixed",n.style.top=`${O}px`,n.style.left=`${A}px`,n.style.right="auto",n.style.width=`${F}px`,n.style.minWidth=`${w}px`,n.style.maxWidth=`${S}px`,n.style.maxHeight=`${Math.floor(b)}px`,n.style.visibility="",n.style.zIndex="10050"}function jt(t=null){let e=X(),r=Wt(t);if(!e||!r?.activeRoot)return;let s=r.activeRoot,o=r.activeDropdown,n=r.placeholder,i=e(s),a=gn(i);o&&(Ng(o),n?.parentNode?n.parentNode.insertBefore(o,n):s?.isConnected?s.appendChild(o):o.remove()),n?.parentNode?.removeChild(n),i.removeClass("yyt-open"),a?.attr("aria-expanded","false"),r.activeRoot=null,r.activeDropdown=null,r.placeholder=null,Bg(r)}function Gi(t=null){let e=Wt(t);!e?.activeRoot||!e?.activeDropdown||Hi(e)}function Mc(t){if(!X()||!t?.length)return;let r=t.first(),s=gn(r),o=kc(r);if(!s?.length||!o?.length||s.prop("disabled"))return;let n=Wt(r);if(n.activeRoot===r[0]){Hi(n);return}jt(r);let i=Lg(r);if(!i)return;let a=o[0],l=n.targetDoc.createComment("yyt-select-dropdown-placeholder");a.parentNode?.insertBefore(l,a),i.appendChild(a),n.activeRoot=r[0],n.activeDropdown=a,n.placeholder=l,r.addClass("yyt-open"),s.attr("aria-expanded","true"),Dg(n),Hi(n)}function zg(t,e){let r=X();if(!r||!e?.length)return null;let s=e.closest("[data-yyt-custom-select]");if(s.length)return s.first();let o=Wt(e);if(o.activeRoot&&o.activeDropdown?.contains?.(e[0])){let n=r(o.activeRoot);return t.has(o.activeRoot).length?n:null}return null}function Yi(t){let e=Wt(t);t?.length&&e.activeRoot&&e.activeRoot!==t[0]||jt(t)}function Rc(t){let e=Wt(t);if(t?.length&&e.activeRoot===t[0]){jt(t);return}Mc(t)}function Wi(t,e,r=null){let s=X();if(!s||!e?.length)return;let o=r||Ac(t,e);if(!o?.length)return;let n=Array.isArray(o.data("yytCustomSelectOptions"))?o.data("yytCustomSelectOptions"):[],i=_c(n,o.val(),e.attr("data-yyt-select-placeholder")||""),a=String(i.value??""),l=String(i.label??""),d=o.is(":disabled");e.find(".yyt-select-value").text(l).attr("data-value",a).data("value",a);let c=kc(e);(c?.length?c.find("[data-yyt-select-option]"):e.find("[data-yyt-select-option]")).each((y,f)=>{let m=s(f),b=String(m.attr("data-value")||"")===a;m.toggleClass("yyt-selected",b).attr("aria-selected",String(b))});let p=e.find("[data-yyt-select-trigger]").first();p.prop("disabled",d),d&&(Yi(e),e.removeClass("yyt-open"),p.attr("aria-expanded","false"))}function Pc(t=[]){return Array.isArray(t)?t.map(e=>{if(e&&typeof e=="object"&&!Array.isArray(e)){let s=String(e.value??""),o=String(e.label??e.text??e.name??s);return{value:s,label:o,disabled:e.disabled===!0}}let r=String(e??"");return{value:r,label:r,disabled:!1}}):[]}function $c(t={}){let{selectedValue:e="",options:r=[],placeholder:s="\u8BF7\u9009\u62E9",disabled:o=!1,includeNative:n=!0,nativeTag:i="input",nativeType:a="hidden",rootAttributes:l={},nativeAttributes:d={},triggerAttributes:c={},dropdownAttributes:u={},optionAttributes:p={},optionClass:y="",optionTextClass:f=""}=t,m=Pc(r),b=_c(m,e,s),w=o===!0||m.length===0,S=Ts({...l,class:Sr("yyt-custom-select",l.class),"data-yyt-custom-select":l["data-yyt-custom-select"]??"true","data-yyt-select-placeholder":s}),v=Ts({type:"button",...c,class:Sr("yyt-select-trigger",c.class),"data-yyt-select-trigger":c["data-yyt-select-trigger"]??"true","aria-haspopup":c["aria-haspopup"]??"listbox","aria-expanded":c["aria-expanded"]??"false",disabled:w?!0:c.disabled}),K=Ts({...u,class:Sr("yyt-select-dropdown",u.class),"data-yyt-select-dropdown":u["data-yyt-select-dropdown"]??"true",role:u.role??"listbox"}),P=n?(()=>{let _={...d,class:Sr(d.class),"data-yyt-select-native":d["data-yyt-select-native"]??"true",disabled:w?!0:d.disabled};return i==="select"?`<select ${Ts(_)}>${m.map(U=>`
            <option value="${re(U.value)}" ${U.value===String(b.value??"")?"selected":""} ${U.disabled?"disabled":""}>${re(U.label)}</option>
          `).join("")}</select>`:`<input ${Ts({type:a,value:b.value,..._})}>`})():"";return`
    <div ${S}>
      ${P}
      <button ${v}>
        <span class="${re(Sr("yyt-select-value"))}" data-value="${re(b.value)}">${re(b.label)}</span>
        <i class="fa-solid fa-chevron-down yyt-select-arrow"></i>
      </button>
      <div ${K}>
        ${m.map(_=>{let T=_.value===String(b.value??"");return`
            <button ${Ts({type:"button",...p,class:Sr("yyt-select-option",y,p.class,T?"yyt-selected":""),"data-yyt-select-option":p["data-yyt-select-option"]??"true","data-value":_.value,role:p.role??"option","aria-selected":T?"true":"false",disabled:_.disabled?!0:p.disabled})}>
              <span class="${re(Sr("yyt-option-text",f))}">${re(_.label)}</span>
            </button>
          `}).join("")}
      </div>
    </div>
  `}function et(t,e="yytCustomSelect"){let r=X();if(!r||!pe(t))return;let s=Ec(t),o=Wt(s);o.activeRoot&&t.has(o.activeRoot).length&&jt(s),t.off(`.${e}`),r(s).off(`click.${e}`),r(s).off(`mousedown.${e}`),t.find('[data-yyt-enhanced-select="true"]').remove(),t.find(".yyt-native-select-bridge").each((n,i)=>{let a=r(i),l=a.attr("data-yyt-original-style");l!==void 0&&l?a.attr("style",l):a.removeAttr("style"),a.removeClass("yyt-native-select-bridge").removeAttr("data-yyt-original-style").removeAttr("data-yyt-select-key").removeData("yytCustomSelectOptions")})}function vt(t,e={}){let r=X();if(!r||!pe(t))return;let{namespace:s="yytCustomSelect",selectors:o=[]}=e,n=Array.isArray(o)?o.filter(Boolean):[o].filter(Boolean);if(n.length===0)return;et(t,s);let i=n.join(", "),a=Ec(t);t.find(i).each((l,d)=>{let c=r(d),u=String(c.attr("id")||"").trim(),p=u||`yyt-select-${Date.now()}-${l}`,y=u?`#${u}`:`[data-yyt-select-key="${p}"]`,f=`${p}-dropdown`,m=$g(c.attr("class")),b=c.attr("style"),w=c.find("option").map((K,P)=>{let _=r(P);return{value:String(_.attr("value")??_.val()??""),label:_.text(),disabled:_.is(":disabled")}}).get();c.attr("data-yyt-original-style",b??"").attr("data-yyt-select-key",p).addClass("yyt-native-select-bridge").css("display","none").data("yytCustomSelectOptions",w);let S=$c({includeNative:!1,selectedValue:c.val(),options:w,disabled:c.is(":disabled"),placeholder:w[0]?.label||"\u8BF7\u9009\u62E9",rootAttributes:{class:Sr(m),style:b||void 0,"data-yyt-enhanced-select":"true","data-yyt-select-target":y},triggerAttributes:{id:`${p}-trigger`,"aria-controls":f},dropdownAttributes:{id:f}});c.after(S);let v=vc(t,c);Wi(t,v,c)}),t.on(`click.${s}`,"[data-yyt-select-trigger]",l=>{l.preventDefault(),l.stopPropagation();let d=r(l.currentTarget);if(d.prop("disabled"))return;let c=d.closest("[data-yyt-custom-select]");Rc(c)}),t.on(`change.${s}`,i,l=>{let d=r(l.currentTarget),c=d.find("option").map((p,y)=>{let f=r(y);return{value:String(f.attr("value")??f.val()??""),label:f.text(),disabled:f.is(":disabled")}}).get();d.data("yytCustomSelectOptions",c);let u=vc(t,d);Wi(t,u,d)}),r(a).off(`click.${s}`).on(`click.${s}`,l=>{if(Ic(l.target,a))return;let d=Og(t);d?.length&&(jt(a),d.filter(".yyt-open").removeClass("yyt-open").find("[data-yyt-select-trigger]").attr("aria-expanded","false"))}),r(a).off(`mousedown.${s}`,".yyt-select-portal-layer [data-yyt-select-option]").on(`mousedown.${s}`,".yyt-select-portal-layer [data-yyt-select-option]",l=>{l.preventDefault(),l.stopPropagation();let d=r(l.currentTarget);if(d.prop("disabled"))return;let c=zg(t,d);if(!c?.length)return;let u=Ac(t,c);if(!u?.length)return;let p=String(d.attr("data-value")||"");u.val(p).trigger("change"),Wi(t,c,u),Yi(c)})}function Kg(t,e=Fr){if(!X()||!pe(t))return{url:"",apiKey:"",model:"",useMainApi:!0,stream:!1,max_tokens:4096,temperature:.7,top_p:.9};let s=t.find(`#${e}-model`).val()?.trim()||"",o=t.find(`#${e}-model-select`);return o.is(":visible")&&(s=o.val()||s),{url:t.find(`#${e}-api-url`).val()?.trim()||"",apiKey:t.find(`#${e}-api-key`).val()||"",model:s,useMainApi:t.find(`#${e}-use-main-api`).is(":checked"),stream:t.find(`#${e}-stream`).is(":checked"),max_tokens:parseInt(t.find(`#${e}-max-tokens`).val())||4096,temperature:parseFloat(t.find(`#${e}-temperature`).val())??.7,top_p:parseFloat(t.find(`#${e}-top-p`).val())??.9}}function Ug(t,e,r=Fr){if(!X()||!pe(t)||!e)return;t.find(`#${r}-api-url`).val(e.url||""),t.find(`#${r}-api-key`).val(e.apiKey||""),t.find(`#${r}-model`).val(e.model||""),t.find(`#${r}-stream`).prop("checked",e.stream===!0),t.find(`#${r}-max-tokens`).val(e.max_tokens||4096),t.find(`#${r}-temperature`).val(e.temperature??.7),t.find(`#${r}-top-p`).val(e.top_p??.9);let o=e.useMainApi??!0;t.find(`#${r}-use-main-api`).prop("checked",o);let i=t.find(`#${r}-custom-api-fields`);o?i.addClass("yyt-disabled").find("input, button, select").prop("disabled",!0):i.removeClass("yyt-disabled").find("input, button, select").prop("disabled",!1),t.find(`#${r}-model`).show(),t.find(`#${r}-model-select`).hide()}function go(t){let{id:e,title:r,body:s,width:o="380px",wide:n=!1,dialogClass:i="",bodyClass:a="",footerClass:l=""}=t;return`
    <div class="yyt-dialog-overlay" id="${e}-overlay">
      <div class="yyt-dialog ${n?"yyt-dialog-wide":""} ${i}" style="${o!=="380px"?`width: ${o};`:""} max-height: calc(100vh - 32px);">
        <div class="yyt-dialog-header">
          <span class="yyt-dialog-title">${r}</span>
          <button class="yyt-dialog-close" id="${e}-close">
            <i class="fa-solid fa-times"></i>
          </button>
        </div>
        <div class="yyt-dialog-body ${a}" style="overflow-y: auto; overflow-x: hidden; max-height: calc(100vh - 160px);">
          ${s}
        </div>
        <div class="yyt-dialog-footer ${l}">
          <button class="yyt-btn yyt-btn-secondary" id="${e}-cancel">\u53D6\u6D88</button>
          <button class="yyt-btn yyt-btn-primary" id="${e}-save">\u4FDD\u5B58</button>
        </div>
      </div>
    </div>
  `}function mo(t,e,r={}){if(!X())return()=>{};let o=t.find(`#${e}-overlay`),n=()=>{o.remove(),i?.removeEventListener("keydown",a),r.onClose&&r.onClose()};o.find(`#${e}-close, #${e}-cancel`).on("click",n),o.on("click",function(l){l.target===this&&n()}),o.find(`#${e}-save`).on("click",function(){r.onSave&&r.onSave(n)});let i=o[0]?.ownerDocument||document,a=l=>{l.key==="Escape"&&(l.stopPropagation(),n())};return i.addEventListener("keydown",a),n}function er(t,e,r={}){let{confirmText:s="\u786E\u5B9A",cancelText:o="\u53D6\u6D88",danger:n=!1,width:i="380px"}=r,a=X(),l=_s();if(!a||!l?.body)return Promise.resolve(!1);let d=`yyt-confirm-${++Oc}`;return new Promise(c=>{let u=!1,p=b=>{u||(u=!0,m.remove(),y?.focus(),c(b))},y=l.activeElement,f=`
      <div class="yyt-dialog-overlay" id="${d}-overlay">
        <div class="yyt-dialog" style="${i!=="380px"?`width: ${i};`:""} max-height: calc(100vh - 32px);">
          <div class="yyt-dialog-header">
            <span class="yyt-dialog-title">${re(t)}</span>
            <button class="yyt-dialog-close" id="${d}-close">
              <i class="fa-solid fa-times"></i>
            </button>
          </div>
          <div class="yyt-dialog-body">
            <div style="color: var(--yyt-text-secondary); font-size: 13px; line-height: 1.6;">${re(e)}</div>
          </div>
          <div class="yyt-dialog-footer">
            <button class="yyt-btn yyt-btn-secondary" id="${d}-cancel">${re(o)}</button>
            <button class="yyt-btn ${n?"yyt-btn-danger":"yyt-btn-primary"}" id="${d}-confirm">${re(s)}</button>
          </div>
        </div>
      </div>`,m=a(f).appendTo(l.body);m.find(`#${d}-confirm`).on("click",()=>p(!0)),m.find(`#${d}-cancel, #${d}-close`).on("click",()=>p(!1)),m.on("click",function(b){b.target===this&&p(!1)}),m.on("keydown",b=>{b.key==="Escape"&&(b.stopPropagation(),p(!1)),b.key==="Enter"&&(b.stopPropagation(),p(!0))}),m.find(`#${d}-${n?"cancel":"confirm"}`).trigger("focus")})}function jg(t,e,r={}){let{defaultValue:s="",placeholder:o="",confirmText:n="\u786E\u5B9A",cancelText:i="\u53D6\u6D88",width:a="380px"}=r,l=X(),d=_s();if(!l||!d?.body)return Promise.resolve(null);let c=`yyt-prompt-${++Oc}`;return new Promise(u=>{let p=!1,y=v=>{p||(p=!0,b.remove(),f?.focus(),u(v))},f=d.activeElement,m=`
      <div class="yyt-dialog-overlay" id="${c}-overlay">
        <div class="yyt-dialog" style="${a!=="380px"?`width: ${a};`:""} max-height: calc(100vh - 32px);">
          <div class="yyt-dialog-header">
            <span class="yyt-dialog-title">${re(t)}</span>
            <button class="yyt-dialog-close" id="${c}-close">
              <i class="fa-solid fa-times"></i>
            </button>
          </div>
          <div class="yyt-dialog-body">
            ${e?`<div style="color: var(--yyt-text-secondary); font-size: 13px; line-height: 1.6;">${re(e)}</div>`:""}
            <input class="yyt-input" id="${c}-input" type="text" value="${re(s)}" placeholder="${re(o)}" />
          </div>
          <div class="yyt-dialog-footer">
            <button class="yyt-btn yyt-btn-secondary" id="${c}-cancel">${re(i)}</button>
            <button class="yyt-btn yyt-btn-primary" id="${c}-confirm">${re(n)}</button>
          </div>
        </div>
      </div>`,b=l(m).appendTo(d.body),w=b.find(`#${c}-input`),S=()=>{let v=w.val().trim();y(v||null)};b.find(`#${c}-confirm`).on("click",S),b.find(`#${c}-cancel, #${c}-close`).on("click",()=>y(null)),b.on("click",function(v){v.target===this&&y(null)}),w.on("keydown",v=>{v.key==="Enter"&&(v.stopPropagation(),S())}),b.on("keydown",v=>{v.key==="Escape"&&(v.stopPropagation(),y(null))}),w.trigger("focus").trigger("select")})}function Wg(t,e,r){if(t.prop("disabled")&&t.data("yytLoading"))return Promise.resolve();let s=t.html(),o=t.outerWidth();if(t.prop("disabled",!0).data("yytLoading",!0),t.css("min-width",o+"px"),r)t.html(`<i class="fa-solid fa-spinner fa-spin" style="margin-right:4px"></i>${re(r)}`);else{let n=t.find("i.fa-solid, i.fa-regular").first();n.length?(n.data("yytOriginalClass",n.attr("class")),n.attr("class","fa-solid fa-spinner fa-spin")):t.html(`<i class="fa-solid fa-spinner fa-spin" style="margin-right:4px"></i>${s}`)}return Promise.resolve().then(()=>e()).finally(()=>{if(r)t.html(s);else{let n=t.find("i.fa-spinner"),i=n.data("yytOriginalClass");i?n.attr("class",i).removeData("yytOriginalClass"):t.html(s)}t.prop("disabled",!1).removeData("yytLoading").css("min-width","")})}function ho(t,e){let r=new Blob([t],{type:"application/json"}),s=URL.createObjectURL(r),o=document.createElement("a");o.href=s,o.download=e,o.click(),URL.revokeObjectURL(s)}function bo(t){return new Promise((e,r)=>{let s=new FileReader;s.onload=o=>e(o.target.result),s.onerror=o=>r(new Error("\u6587\u4EF6\u8BFB\u53D6\u5931\u8D25")),s.readAsText(t)})}var Mg,Fr,Fi,Wr,Sc,Tc,Oc,Je=L(()=>{q();Mg=C.createScope("UIUtils"),Fr="youyou_toolkit",Fi=class{constructor(e={}){this._state={...e}}get(e){return this._state[e]}set(e,r){return this._state[e]=r,this}reset(e={}){return this._state={...e},this}toJSON(){return{...this._state}}};Wr=null;Sc=new WeakMap,Tc="yyt-select-portal-layer";Oc=0});var Es,xo,Pt,qi=L(()=>{Ke();Je();q();Es=C.createScope("UIManager"),xo=class{constructor(){this.components=new Map,this.activeInstances=new Map,this.dependencies={},this.currentTab="main",this.currentSubTab={},this.initialized=!1}init(e={}){this.initialized||(this.dependencies=e.services||{},this._subscribeEvents(),this.initialized=!0,z.emit(D.UI_INITIALIZED),Es.log("\u521D\u59CB\u5316\u5B8C\u6210"))}register(e,r){return!e||!r?(Es.warn("\u65E0\u6548\u7684\u7EC4\u4EF6\u6CE8\u518C"),!1):(this.components.set(e,{id:e,...r,render:r.render||(()=>""),bindEvents:r.bindEvents||(()=>{}),destroy:r.destroy||(()=>{}),getStyles:r.getStyles||(()=>"")}),!0)}unregister(e){this.destroyInstance(e),this.components.delete(e)}getComponent(e){return this.components.get(e)}render(e,r,s={}){let o=X();if(!o){Es.error("jQuery\u4E0D\u53EF\u7528");return}let n=this.components.get(e);if(!n){Es.error(`\u7EC4\u4EF6\u4E0D\u5B58\u5728: ${e}`);let a;typeof r=="string"?a=o(r):r&&r.jquery?a=r:r&&(a=o(r)),a?.length&&a.html(`<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u7EC4\u4EF6\u672A\u6CE8\u518C\uFF1A${e}</span></div>`);return}let i;if(typeof r=="string"?i=o(r):r&&r.jquery?i=r:r&&(i=o(r)),!pe(i)){Es.warn("\u5BB9\u5668\u4E0D\u5B58\u5728");return}this.activeInstances.forEach((a,l)=>{a?.container?.length&&i.length&&a.container[0]===i[0]&&l!==e&&this.destroyInstance(l)}),this.destroyInstance(e);try{if(typeof n.renderTo=="function")n.renderTo(i,{...s,dependencies:this.dependencies});else{let a=n.render({...s,dependencies:this.dependencies});i.html(a),n.bindEvents(i,this.dependencies)}}catch(a){Es.error(`\u7EC4\u4EF6\u6E32\u67D3\u5931\u8D25: ${e}`,a),i.html(`<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u7EC4\u4EF6\u6E32\u67D3\u5931\u8D25\uFF1A${e}${a?.message?` - ${a.message}`:""}</span></div>`);return}this.activeInstances.set(e,{container:i,component:n,props:s}),z.emit(D.UI_RENDER_REQUESTED,{componentId:e})}destroyInstance(e){let r=this.activeInstances.get(e);r&&(r.component.destroy(r.container),this.activeInstances.delete(e))}destroyContainerInstance(e){let r=X();if(!r||!e)return;let s;if(typeof e=="string"?s=r(e):e?.jquery?s=e:s=r(e),!s?.length)return;let o=[];this.activeInstances.forEach((n,i)=>{n?.container?.length&&n.container[0]===s[0]&&o.push(i)}),o.forEach(n=>this.destroyInstance(n))}switchTab(e){let r=this.currentTab;this.currentTab=e,z.emit(D.UI_TAB_CHANGED,{tabId:e,oldTab:r})}getCurrentTab(){return this.currentTab}switchSubTab(e,r){this.currentSubTab[e]=r,z.emit(D.UI_SUBTAB_CHANGED,{mainTab:e,subTab:r})}getCurrentSubTab(e){return this.currentSubTab[e]||""}getAllStyles(){let e="";return this.components.forEach((r,s)=>{r.getStyles&&(e+=r.getStyles())}),e}injectStyles(e=document){let r="yyt-component-styles";if(e.getElementById(r))return;let s=e.createElement("style");s.id=r,s.textContent=this.getAllStyles(),(e.head||e.documentElement).appendChild(s)}setDependency(e,r){this.dependencies[e]=r}getDependency(e){return this.dependencies[e]}_subscribeEvents(){z.on(D.PRESET_UPDATED,()=>{}),z.on(D.TOOL_UPDATED,()=>{})}},Pt=new xo});function g(t,e={},...r){let s=document.createElement(t);if(e.className&&(s.className=e.className),e.text!==void 0&&e.text!==null&&(s.textContent=String(e.text)),e.html!==void 0&&e.html!==null&&(s.innerHTML=String(e.html)),e.attrs)for(let[o,n]of Object.entries(e.attrs))n==null||n===!1||s.setAttribute(o,n===!0?"":String(n));if(e.style&&Object.assign(s.style,e.style),e.dataset)for(let[o,n]of Object.entries(e.dataset))s.dataset[o]=String(n);for(let o of r)W(s,o);return s}function W(t,e){if(!(e==null||e===!1)){if(Array.isArray(e)){for(let r of e)W(t,r);return}if(typeof e=="string"||typeof e=="number"){t.appendChild(document.createTextNode(String(e)));return}if(e instanceof Node){t.appendChild(e);return}if(e&&e.el instanceof Node){t.appendChild(e.el);return}}}function Lc(){let t=new Map;return{on(e,r){return!e||typeof r!="function"?()=>{}:(t.has(e)||t.set(e,new Set),t.get(e).add(r),()=>this.off(e,r))},off(e,r){let s=t.get(e);s&&s.delete(r)},emit(e,...r){let s=t.get(e);if(s)for(let o of[...s])try{o(...r)}catch{}},clear(){t.clear()}}}function Vi(t,e){if(!t||!e)return null;if(t._id===e)return t;let r=t._children;if(!r)return null;let s=r instanceof Map?[...r.values()]:Array.isArray(r)?r:[];for(let o of s){let n=Vi(o,e);if(n)return n}return null}function Ce({id:t=null,kind:e="control"}={}){let r=Lc();return{_id:t||null,_kind:e,_children:null,_emitter:r,on(s,o){return r.on(s,o)},off(s,o){r.off(s,o)},getControl(s){return Vi(this,s)},get(){},set(s){},destroy(){if(r.clear(),this._children){let s=this._children instanceof Map?[...this._children.values()]:Array.isArray(this._children)?this._children:[];for(let o of s)try{o?.destroy?.()}catch{}this._children instanceof Map?this._children.clear():Array.isArray(this._children)&&(this._children.length=0)}if(this.el?.parentNode)try{this.el.parentNode.removeChild(this.el)}catch{}}}}var tt=L(()=>{});function de(t={}){let{id:e=null,label:r="",icon:s=null,variant:o="default",size:n="normal",disabled:i=!1,title:a=null,onClick:l=null}=t,d=["yyt-btn"];o==="primary"?d.push("yyt-btn-primary"):o==="danger"?d.push("yyt-btn-danger"):o==="ghost"&&d.push("yyt-btn-secondary"),n==="small"&&d.push("yyt-btn-small");let c=g("button",{className:d.join(" "),attrs:{type:"button",disabled:i?"disabled":null,title:a}}),u=null;s&&(u=g("span",{className:"yyt-btn-icon-glyph",text:s}),c.appendChild(u));let p=g("span",{text:r});c.appendChild(p);let y={...Ce({id:e,kind:"button"}),el:c,setLabel(f){p.textContent=String(f||"")},setIcon(f){u&&(u.textContent=String(f||""))},setDisabled(f){f?c.setAttribute("disabled","disabled"):c.removeAttribute("disabled")},isDisabled(){return c.hasAttribute("disabled")},get(){return p.textContent},set(f){this.setLabel(f)}};return c.addEventListener("click",f=>{if(!c.hasAttribute("disabled")){if(typeof l=="function")try{l(f,y)}catch{}y._emitter.emit("click",f)}}),y}var Nc=L(()=>{tt()});function Ge(t={}){let{id:e=null,placeholder:r="",value:s="",type:o="text",disabled:n=!1,maxLength:i=null,onInput:a=null,onChange:l=null}=t,d=g("input",{className:"yyt-input",attrs:{type:o,placeholder:r,disabled:n?"disabled":null,maxlength:i!=null?String(i):null}});d.value=s==null?"":String(s);let c={...Ce({id:e,kind:"textInput"}),el:d,get(){return d.value},set(u,{silent:p=!1}={}){d.value=u==null?"":String(u),p||c._emitter.emit("change",d.value)},setPlaceholder(u){d.placeholder=u==null?"":String(u)},setDisabled(u){d.disabled=!!u},focus(){d.focus()},select(){d.select()}};return d.addEventListener("input",()=>{if(typeof a=="function")try{a(d.value,c)}catch{}c._emitter.emit("input",d.value)}),d.addEventListener("change",()=>{if(typeof l=="function")try{l(d.value,c)}catch{}c._emitter.emit("change",d.value)}),d.addEventListener("blur",()=>c._emitter.emit("blur",d.value)),c}var Dc=L(()=>{tt()});function Ue(t={}){let{id:e=null,options:r=[],value:s="",placeholder:o=null,disabled:n=!1,onChange:i=null}=t,a=g("select",{className:"yyt-select",attrs:{disabled:n?"disabled":null}});function l(c,u){if(a.innerHTML="",o!==null){let p=g("option",{text:o,attrs:{value:"",disabled:"disabled",selected:u?null:"selected"}});a.appendChild(p)}for(let p of c){let y=g("option",{text:p.label??String(p.value),attrs:{value:String(p.value),selected:String(p.value)===String(u)?"selected":null,disabled:p.disabled?"disabled":null}});a.appendChild(y)}}l(r,s);let d={...Ce({id:e,kind:"select"}),el:a,get(){return a.value},set(c,{silent:u=!1}={}){a.value=c==null?"":String(c),u||d._emitter.emit("change",a.value)},setOptions(c,u){l(c||[],u??a.value)},setDisabled(c){a.disabled=!!c}};return a.addEventListener("change",()=>{if(typeof i=="function")try{i(a.value,d)}catch(c){typeof console<"u"&&console.error&&console.error("[selectInput] onChange \u5F02\u5E38",c)}d._emitter.emit("change",a.value)}),d}var Bc=L(()=>{tt()});function St(t={}){let{id:e=null,label:r="",hint:s="",checked:o=!1,disabled:n=!1,onChange:i=null}=t,a=g("label",{className:"yyt-toggle-label"});r&&a.appendChild(g("span",{text:r})),s&&a.appendChild(g("span",{className:"yyt-toggle-hint",text:s}));let l=g("input",{attrs:{type:"checkbox",disabled:n?"disabled":null}});l.checked=!!o;let d=g("span",{className:"yyt-toggle-slider"}),c=g("label",{className:"yyt-toggle"});c.appendChild(l),c.appendChild(d);let u=g("div",{className:"yyt-toggle-row"});u.appendChild(a),u.appendChild(c),a.addEventListener("click",y=>{y.preventDefault(),!l.disabled&&(l.checked=!l.checked,l.dispatchEvent(new Event("change",{bubbles:!0})))});let p={...Ce({id:e,kind:"toggle"}),el:u,get(){return!!l.checked},set(y,{silent:f=!1}={}){l.checked=!!y,f||p._emitter.emit("change",!!y)},setDisabled(y){l.disabled=!!y}};return l.addEventListener("change",()=>{let y=!!l.checked;if(typeof i=="function")try{i(y,p)}catch{}p._emitter.emit("change",y)}),p}var zc=L(()=>{tt()});var Kc=L(()=>{tt()});var Uc=L(()=>{tt()});function ct(t={}){let{id:e=null,label:r="",hint:s="",control:o=null,inline:n=!1}=t,i=g("div",{className:"yyt-form-group",style:n?{flexDirection:"row",alignItems:"center",gap:"12px"}:null});r&&i.appendChild(g("label",{text:r,style:n?{flex:"0 0 auto",minWidth:"120px"}:null}));let a=g("div",{style:n?{flex:"1",minWidth:"0"}:null});o&&W(a,o),i.appendChild(a),s&&i.appendChild(g("div",{className:"yyt-form-hint",text:s}));let l=o?[o]:[];return{...Ce({id:e,kind:"formRow"}),el:i,_children:l,get(){return o?.get?.()},set(d,c){o?.set?.(d,c)},setControl(d){a.innerHTML="",l.length=0,d&&(W(a,d),l.push(d))}}}var jc=L(()=>{tt()});function mn(t={}){let{id:e=null,icon:r=null,name:s="",desc:o="",active:n=!1,disabled:i=!1,actions:a=[],onClick:l=null}=t,d=["yyt-list-row"];n&&d.push("yyt-list-row-active"),i&&d.push("yyt-list-row-disabled");let c=g("div",{className:d.join(" "),style:i?{opacity:"0.5",pointerEvents:"none"}:null});r&&c.appendChild(g("div",{className:"yyt-list-row-icon",text:r}));let u=g("div",{className:"yyt-list-row-main"}),p=g("div",{className:"yyt-list-row-name",text:s});u.appendChild(p);let y=null;o&&(y=g("div",{className:"yyt-list-row-desc",text:o}),u.appendChild(y)),c.appendChild(u);let f=null;if(a&&a.length){f=g("div",{className:"yyt-list-row-actions"});for(let b of a)W(f,b);c.appendChild(f)}typeof l=="function"&&(c.style.cursor="pointer",c.addEventListener("click",b=>{b.target.closest(".yyt-list-row-actions")||(l(b,m),m._emitter.emit("click",b))}));let m={...Ce({id:e,kind:"listRow"}),el:c,_children:a||[],setName(b){p.textContent=b==null?"":String(b)},setDesc(b){if(y)y.textContent=b==null?"":String(b);else{if(!b)return;y=g("div",{className:"yyt-list-row-desc",text:b}),u.appendChild(y)}},setActive(b){b?c.classList.add("yyt-list-row-active"):c.classList.remove("yyt-list-row-active")},setDisabled(b){b?(c.classList.add("yyt-list-row-disabled"),c.style.opacity="0.5",c.style.pointerEvents="none"):(c.classList.remove("yyt-list-row-disabled"),c.style.opacity="",c.style.pointerEvents="")}};return m}var Wc=L(()=>{tt()});function $t(t={}){let{id:e=null,heading:r="",icon:s=null,actions:o=[],content:n=[]}=t,i=g("div",{className:"yyt-flow-section"}),a=null,l=null,d=null;if(r||s||o&&o.length){if(a=g("div",{className:"yyt-flow-heading"}),s&&(l=g("span",{className:"yyt-flow-heading-icon",text:s}),a.appendChild(l)),r&&a.appendChild(g("span",{text:r})),o&&o.length){d=g("div",{className:"yyt-flow-heading-action"});for(let y of o)W(d,y);a.appendChild(d)}i.appendChild(a)}let c=g("div",{className:"yyt-flow-content"}),u=[];for(let y of n||[])y&&(W(c,y),u.push(y));for(let y of o||[])y&&typeof y=="object"&&y.el&&u.push(y);return i.appendChild(c),{...Ce({id:e,kind:"flowSection"}),el:i,_children:u,appendContent(y){y&&(W(c,y),y&&typeof y=="object"&&y.el&&u.push(y))},clearContent(){c.innerHTML="";let y=u.filter(f=>(o||[]).includes(f));u.length=0;for(let f of y)u.push(f)},setHeading(y){if(!a)return;let f=a.querySelector("span:not(.yyt-flow-heading-icon):not(.yyt-flow-heading-action)");f&&(f.textContent=y==null?"":String(y))},setIcon(y){l&&(l.textContent=y==null?"":String(y))}}}var Fc=L(()=>{tt()});function hn(){try{if(window.parent&&window.parent!==window&&window.parent.document)return window.parent.document}catch{}return document}function Ji({title:t,width:e,wide:r}){let s=`yyt-ctrl-dialog-${++Fg}`,o=g("div",{className:"yyt-dialog-overlay",attrs:{"data-dialog-id":s}}),n={};e&&e!=="380px"&&(n.width=e),n.maxHeight="calc(100vh - 32px)";let i=g("div",{className:`yyt-dialog${r?" yyt-dialog-wide":""}`,style:n}),a=g("div",{className:"yyt-dialog-header"});a.appendChild(g("span",{className:"yyt-dialog-title",text:t||""}));let l=g("button",{className:"yyt-dialog-close",attrs:{type:"button","aria-label":"close"},html:'<i class="fa-solid fa-times"></i>'});a.appendChild(l),i.appendChild(a);let d=g("div",{className:"yyt-dialog-body"});i.appendChild(d);let c=g("div",{className:"yyt-dialog-footer"});return i.appendChild(c),o.appendChild(i),{overlay:o,body:d,footer:c,closeBtn:l,id:s}}function Xi(t){let e=hn();return e?.body?(e.body.appendChild(t),!0):!1}function Qi(t){if(t?.parentNode)try{t.parentNode.removeChild(t)}catch{}}function Hg(t={}){let{title:e="\u8BF7\u786E\u8BA4",message:r="",confirmText:s="\u786E\u5B9A",cancelText:o="\u53D6\u6D88",danger:n=!1,width:i="380px"}=t;return new Promise(a=>{let{overlay:l,body:d,footer:c,closeBtn:u}=Ji({title:e,width:i,wide:!1}),p=(hn()||document).activeElement,y=g("div",{style:{color:"var(--yyt-text-secondary)",fontSize:"13px",lineHeight:"1.6"},text:r});d.appendChild(y);let f=g("button",{className:"yyt-btn yyt-btn-secondary",attrs:{type:"button"},text:o}),m=g("button",{className:`yyt-btn ${n?"yyt-btn-danger":"yyt-btn-primary"}`,attrs:{type:"button"},text:s});c.appendChild(f),c.appendChild(m);let b=!1,w=S=>{if(!b){b=!0,Qi(l);try{p?.focus()}catch{}a(S)}};if(m.addEventListener("click",()=>w(!0)),f.addEventListener("click",()=>w(!1)),u.addEventListener("click",()=>w(!1)),l.addEventListener("click",S=>{S.target===l&&w(!1)}),l.addEventListener("keydown",S=>{S.key==="Escape"?(S.stopPropagation(),w(!1)):S.key==="Enter"&&(S.stopPropagation(),w(!0))}),!Xi(l)){a(!1);return}(n?f:m).focus()})}function Gg(t={}){let{title:e="\u8F93\u5165",message:r="",defaultValue:s="",placeholder:o="",confirmText:n="\u786E\u5B9A",cancelText:i="\u53D6\u6D88",validate:a=null,width:l="380px"}=t;return new Promise(d=>{let{overlay:c,body:u,footer:p,closeBtn:y}=Ji({title:e,width:l,wide:!1}),f=(hn()||document).activeElement;r&&u.appendChild(g("div",{style:{color:"var(--yyt-text-secondary)",fontSize:"13px",lineHeight:"1.6",marginBottom:"8px"},text:r}));let m=g("input",{className:"yyt-input",attrs:{type:"text",placeholder:o}});m.value=String(s||""),u.appendChild(m);let b=g("div",{style:{color:"var(--yyt-danger, #f87171)",fontSize:"12px",marginTop:"6px",minHeight:"14px"}});u.appendChild(b);let w=g("button",{className:"yyt-btn yyt-btn-secondary",attrs:{type:"button"},text:i}),S=g("button",{className:"yyt-btn yyt-btn-primary",attrs:{type:"button"},text:n});p.appendChild(w),p.appendChild(S);let v=!1,K=_=>{if(!v){v=!0,Qi(c);try{f?.focus()}catch{}d(_)}},P=()=>{let _=m.value.trim();if(typeof a=="function"){let T=a(_);if(T){b.textContent=T,m.focus();return}}K(_||null)};if(S.addEventListener("click",P),w.addEventListener("click",()=>K(null)),y.addEventListener("click",()=>K(null)),c.addEventListener("click",_=>{_.target===c&&K(null)}),m.addEventListener("keydown",_=>{_.key==="Enter"&&(_.stopPropagation(),P())}),c.addEventListener("keydown",_=>{_.key==="Escape"&&(_.stopPropagation(),K(null))}),!Xi(c)){d(null);return}m.focus(),m.select()})}function Yg(t={}){let{title:e="",body:r=null,buttons:s=[],width:o="480px",wide:n=!1,onMounted:i=null}=t,{overlay:a,body:l,footer:d,closeBtn:c}=Ji({title:e,width:o,wide:n}),u=(hn()||document).activeElement;r&&W(l,r);let p=!1,y,f=new Promise(b=>{y=b}),m=b=>{if(!p){p=!0,Qi(a);try{u?.focus()}catch{}y(b)}};for(let b of s){let w=b.variant==="primary"?"yyt-btn-primary":b.variant==="danger"?"yyt-btn-danger":"yyt-btn-secondary",S=g("button",{className:`yyt-btn ${w}`,attrs:{type:"button"},text:b.label||""});S.addEventListener("click",()=>{try{b.onClick?.(m,l)}catch(v){console.error("[dialog.custom] button onClick error",v),m(null)}}),d.appendChild(S)}if(c.addEventListener("click",()=>m(null)),a.addEventListener("click",b=>{b.target===a&&m(null)}),a.addEventListener("keydown",b=>{b.key==="Escape"&&(b.stopPropagation(),m(null))}),!Xi(a))y(null);else if(typeof i=="function")try{i({overlay:a,body:l,close:m})}catch{}return{el:a,body:l,close:m,result:f}}var Fg,Ee,bn=L(()=>{tt();Fg=0;Ee={confirm:Hg,prompt:Gg,custom:Yg}});function Zi(t={}){let{id:e=null,items:r=[],align:s="start",gap:o="8px",wrap:n=!0}=t,a=g("div",{className:"yyt-toolbar",style:{display:"flex",alignItems:"center",justifyContent:{start:"flex-start",end:"flex-end",center:"center","space-between":"space-between"}[s]||"flex-start",gap:o,flexWrap:n?"wrap":"nowrap"}}),l=[];for(let d of r)d&&(W(a,d),l.push(d));return{...Ce({id:e,kind:"toolbar"}),el:a,_children:l,addItem(d){d&&(W(a,d),l.push(d))},clear(){for(;a.firstChild;)a.removeChild(a.firstChild);for(let d of l)try{d?.destroy?.()}catch{}l.length=0}}}var Hc=L(()=>{tt()});function ea(t={}){let{id:e=null,name:r="",desc:s="",active:o=!1,disabled:n=!1,builtin:i=!1,readonly:a=!1,metaChips:l=[],actions:d=[],onClick:c=null}=t,u=i||a,p=["yyt-list-row","yyt-preset-list-item"];o&&p.push("yyt-list-row-active"),n&&p.push("yyt-list-row-disabled"),u&&p.push("yyt-preset-list-item-readonly");let y=g("div",{className:p.join(" "),style:n?{opacity:"0.5",pointerEvents:"none"}:null}),f=g("span",{className:"yyt-preset-dot",style:{width:"8px",height:"8px",borderRadius:"50%",flexShrink:"0",marginRight:"8px",background:o?"var(--yyt-accent, #7bb7ff)":"transparent",border:o?"none":"1px solid var(--yyt-border, rgba(255,255,255,0.15))",transition:"background 0.15s ease"}});y.appendChild(f);let m=g("div",{className:"yyt-list-row-main",style:{flex:"1",minWidth:"0"}}),b=g("div",{style:{display:"flex",alignItems:"center",gap:"8px"}}),w=g("div",{className:"yyt-list-row-name",text:r,style:{fontWeight:"600"}});b.appendChild(w),i&&b.appendChild(g("span",{className:"yyt-preset-badge yyt-preset-badge-builtin",text:"\u5185\u7F6E",style:{fontSize:"10px",padding:"2px 6px",borderRadius:"999px",background:"var(--yyt-surface-3, rgba(255,255,255,0.06))",color:"var(--yyt-text-muted, rgba(255,255,255,0.5))",border:"1px solid var(--yyt-border, rgba(255,255,255,0.1))"}})),m.appendChild(b);let S=null;s&&(S=g("div",{className:"yyt-list-row-desc",text:s}),m.appendChild(S)),y.appendChild(m);let v=null;if(Array.isArray(l)&&l.length){v=g("div",{className:"yyt-preset-meta-chips",style:{display:"flex",gap:"6px",flexWrap:"wrap"}});for(let T of l)T&&v.appendChild(g("span",{className:"yyt-preset-meta-chip",text:String(T),style:{fontSize:"11px",padding:"2px 8px",borderRadius:"999px",background:"var(--yyt-surface-2, rgba(255,255,255,0.04))",color:"var(--yyt-text-secondary, rgba(255,255,255,0.6))",border:"1px solid var(--yyt-border-soft, rgba(255,255,255,0.04))"}}));y.appendChild(v)}let K=null,P=u?d.filter(T=>T?._kind!=="button"||!T._destructive):d;if(P&&P.length){K=g("div",{className:"yyt-list-row-actions"});for(let T of P)W(K,T);y.appendChild(K)}typeof c=="function"&&(y.style.cursor="pointer",y.addEventListener("click",T=>{T.target.closest(".yyt-list-row-actions")||(c(T,_),_._emitter.emit("click",T))}));let _={...Ce({id:e,kind:"presetListItem"}),el:y,_children:d||[],setActive(T){T?y.classList.add("yyt-list-row-active"):y.classList.remove("yyt-list-row-active"),f.style.background=T?"var(--yyt-accent, #7bb7ff)":"transparent",f.style.border=T?"none":"1px solid var(--yyt-border, rgba(255,255,255,0.15))"},setName(T){w.textContent=T==null?"":String(T)},setDesc(T){if(S)S.textContent=T==null?"":String(T);else{if(!T)return;S=g("div",{className:"yyt-list-row-desc",text:T}),m.appendChild(S)}},setDisabled(T){T?(y.classList.add("yyt-list-row-disabled"),y.style.opacity="0.5",y.style.pointerEvents="none"):(y.classList.remove("yyt-list-row-disabled"),y.style.opacity="",y.style.pointerEvents="")}};return _}var Gc=L(()=>{tt()});function ta(t={}){let{id:e=null,values:r=[],placeholder:s="\u8F93\u5165\u540E\u56DE\u8F66\u6DFB\u52A0",suggestions:o=null,allowDuplicates:n=!1,maxChips:i=0,chipVariant:a="default",onChange:l=null,onAdd:d=null,onRemove:c=null}=t,u=o&&o.length?`yyt-chip-dl-${++qg}`:null,p=g("div",{className:"yyt-chip-group",style:{display:"flex",flexWrap:"wrap",gap:"6px",padding:"6px 8px",borderRadius:"var(--yyt-radius-sm, 6px)",border:"1px solid var(--yyt-control-border, rgba(255,255,255,0.08))",background:"var(--yyt-control-bg, transparent)",minHeight:"36px",alignItems:"center"}}),y=[],f={type:"text",placeholder:s,autocomplete:"off"};u&&(f.list=u);let m=g("input",{className:"yyt-chip-input",attrs:f,style:{flex:"1 1 auto",minWidth:"120px",border:"none",outline:"none",background:"transparent",color:"var(--yyt-text, inherit)",fontSize:"12px",padding:"4px 0"}}),b=null;if(u){b=g("datalist",{attrs:{id:u}});for(let A of o)b.appendChild(g("option",{attrs:{value:String(A)}}));p.appendChild(b)}function w(){return a==="danger"?"rgba(248,113,113,0.12)":a==="soft"?"var(--yyt-surface-2, rgba(255,255,255,0.04))":"var(--yyt-accent-soft, rgba(123,183,255,0.15))"}function S(){return a==="danger"?"rgba(248,113,113,0.25)":"var(--yyt-border, rgba(255,255,255,0.1))"}function v(){return a==="danger"?"#f87171":"var(--yyt-text, inherit)"}function K(A){let O=g("span",{className:"yyt-chip",style:{display:"inline-flex",alignItems:"center",gap:"4px",padding:"3px 4px 3px 10px",borderRadius:"999px",background:w(),border:`1px solid ${S()}`,color:v(),fontSize:"11px",fontWeight:"500"}});O.appendChild(g("span",{text:A,style:{lineHeight:"1"}}));let J=g("button",{attrs:{type:"button","aria-label":"remove"},text:"\xD7",style:{border:"none",background:"transparent",color:"inherit",cursor:"pointer",padding:"0 4px",fontSize:"14px",lineHeight:"1",opacity:"0.7"}});return J.addEventListener("click",j=>{j.stopPropagation(),T(A)}),J.addEventListener("mouseenter",()=>{J.style.opacity="1"}),J.addEventListener("mouseleave",()=>{J.style.opacity="0.7"}),O.appendChild(J),O}function P(){let A=[];for(let O of p.children)O===m||O===b||A.push(O);for(let O of A)p.removeChild(O);for(let O of y)p.insertBefore(K(O),m)}function _(A){let O=String(A||"").trim();if(!O||!n&&y.includes(O)||i>0&&y.length>=i)return!1;y.push(O),P();try{d?.(O,y.slice())}catch{}try{l?.(y.slice())}catch{}return U._emitter.emit("change",y.slice()),!0}function T(A){let O=y.indexOf(A);if(O<0)return!1;y.splice(O,1),P();try{c?.(A,y.slice())}catch{}try{l?.(y.slice())}catch{}return U._emitter.emit("change",y.slice()),!0}function F(){if(y.length!==0){y=[],P();try{l?.([])}catch{}U._emitter.emit("change",[])}}for(let A of r){let O=String(A||"").trim();O&&(!n&&y.includes(O)||y.push(O))}p.appendChild(m),P(),m.addEventListener("keydown",A=>{if(A.key==="Enter"||A.key===","){A.preventDefault();let O=m.value.trim();O&&_(O)&&(m.value="")}else A.key==="Backspace"&&!m.value&&y.length&&T(y[y.length-1])}),m.addEventListener("blur",()=>{let A=m.value.trim();A&&_(A)&&(m.value="")}),p.addEventListener("click",A=>{A.target===p&&m.focus()});let U={...Ce({id:e,kind:"chipGroup"}),el:p,get(){return y.slice()},set(A){y=[];for(let O of Array.isArray(A)?A:[]){let J=String(O||"").trim();J&&(!n&&y.includes(J)||y.push(J))}P();try{l?.(y.slice())}catch{}U._emitter.emit("change",y.slice())},addChip:_,removeChip:T,clear:F,setSuggestions(A){if(b){for(;b.firstChild;)b.removeChild(b.firstChild);for(let O of A||[])b.appendChild(g("option",{attrs:{value:String(O)}}))}}};return U}var qg,Yc=L(()=>{tt();qg=0});var tr=L(()=>{Nc();Dc();Bc();zc();Kc();Uc();jc();Wc();Fc();bn();Hc();Gc();Yc();tt()});function qc(t){return t?t.length!==void 0&&typeof t.get=="function"?t.get(0):t:null}function Vc(t){return typeof t=="string"&&t.startsWith("builtin_")}function Tr(t={}){let{id:e,kind:r="generic",panelTitle:s="\u9884\u8BBE\u7BA1\u7406",panelHint:o="",store:n,renderEditor:i,renderExtras:a=null,renderListItemMeta:l=null,hasSwitchToButton:d=!1,onSwitchTo:c=null}=t;if(!n||typeof n.listPresets!="function")throw new Error("createPresetManagerPanel: store \u7F3A\u5C11\u5FC5\u8981\u7684 listPresets \u65B9\u6CD5");if(typeof i!="function")throw new Error("createPresetManagerPanel: \u5FC5\u987B\u63D0\u4F9B renderEditor");return{id:e,kind:r,renderTo(u){let p=qc(u);if(!p)return;let f=p._yytLastPresetPanelKind!==r;if(p._yytLastPresetPanelKind=r,p._yytPresetPanelCleanup)try{p._yytPresetPanelCleanup()}catch{}let m=()=>this.renderTo(u),b=n.listPresets(),w=typeof n.getCurrentPresetId=="function"?n.getCurrentPresetId():"",S=f?"":w,v=g("div",{className:"yyt-preset-manager-panel",style:{display:"flex",flexDirection:"column",gap:"14px"}});if(s||o){let j=g("div",{style:{display:"flex",flexDirection:"column",gap:"4px"}});s&&j.appendChild(g("div",{text:s,style:{fontSize:"15px",fontWeight:"700",color:"var(--yyt-text)"}})),o&&j.appendChild(g("div",{text:o,style:{fontSize:"12px",color:"var(--yyt-text-secondary)",lineHeight:"1.6"}})),v.appendChild(j)}let K=[],P=g("div",{style:{display:"flex",flexDirection:"column"}});if(b.length===0)P.appendChild(g("div",{text:'\u6682\u65E0\u9884\u8BBE\u3002\u70B9\u51FB\u4E0B\u65B9"\u65B0\u5EFA"\u521B\u5EFA\u7B2C\u4E00\u4E2A\u9884\u8BBE\u3002',style:{fontSize:"12px",color:"var(--yyt-text-muted)",padding:"12px 0",textAlign:"center"}}));else for(let j of b){let Z=j.id===S,ie=Vc(j.id),be=typeof l=="function"?l(j)||[]:[],Re=[];d&&typeof c=="function"&&Re.push(de({label:Z?"\u2713 \u5DF2\u52A0\u8F7D":"\u52A0\u8F7D",size:"small",variant:Z?"ghost":"primary",disabled:Z,onClick:Ae=>{Ae.stopPropagation();try{c(j.id)}catch(ae){Gr.warn("onSwitchTo \u5F02\u5E38",{err:ae})}m()}})),Re.push(de({label:"\u590D\u5236",size:"small",variant:"ghost",title:"\u590D\u5236\u4E3A\u7528\u6237\u9884\u8BBE",onClick:async Ae=>{Ae.stopPropagation();try{let ae=n.duplicatePreset(j.id);ae?.id&&typeof n.setCurrentPresetId=="function"&&n.setCurrentPresetId(ae.id),m()}catch(ae){Gr.warn("duplicate \u5F02\u5E38",{err:ae})}}})),ie||(Re.push(de({label:"\u270E",size:"small",variant:"ghost",title:"\u91CD\u547D\u540D",onClick:async Ae=>{Ae.stopPropagation();let ae=await Ee.prompt({title:"\u91CD\u547D\u540D\u9884\u8BBE",defaultValue:j.name,placeholder:"\u9884\u8BBE\u540D",validate:xe=>xe?null:"\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"});ae&&ae!==j.name&&(n.renamePreset(j.id,ae),m())}})),Re.push(de({label:"\xD7",size:"small",variant:"ghost",title:"\u5220\u9664",onClick:async Ae=>{Ae.stopPropagation(),await Ee.confirm({title:"\u5220\u9664\u9884\u8BBE",message:`\u786E\u8BA4\u5220\u9664\u300C${j.name}\u300D\uFF1F\u6B64\u64CD\u4F5C\u4E0D\u53EF\u64A4\u9500\u3002`,confirmText:"\u5220\u9664",danger:!0})&&(n.deletePreset(j.id),m())}})));let H=ea({id:j.id,name:j.name,desc:j.description,active:Z,builtin:ie,metaChips:be,actions:Re,onClick:()=>{typeof n.setCurrentPresetId=="function"&&n.setCurrentPresetId(j.id),m()}});P.appendChild(H.el)}let _=de({label:"+ \u65B0\u5EFA\u9884\u8BBE",size:"small",variant:"primary",onClick:async()=>{let j=await Ee.prompt({title:"\u65B0\u5EFA\u9884\u8BBE",placeholder:"\u9884\u8BBE\u540D\uFF08\u5FC5\u586B\uFF09",validate:Z=>Z?null:"\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"});if(j)try{let Z=n.createPreset({name:j});Z?.id&&typeof n.setCurrentPresetId=="function"&&n.setCurrentPresetId(Z.id),m()}catch(Z){Gr.warn("createPreset \u5931\u8D25",{err:Z}),await Ee.confirm({title:"\u521B\u5EFA\u5931\u8D25",message:String(Z?.message||Z),confirmText:"\u786E\u5B9A"})}}}),T=$t({heading:"\u9884\u8BBE\u9009\u62E9",icon:"\u{1F4CB}",actions:[_.el],content:[P]});K.push(T),v.appendChild(T.el);let F=S?b.find(j=>j.id===S):null;if(F){let j=Vc(F.id),Z=null;try{Z=i(F,{readonly:j,onChange:be=>{if(!j&&!(!be||typeof be!="object"))try{n.updatePreset(F.id,be)}catch(Re){Gr.warn("updatePreset \u5931\u8D25",{err:Re})}},refresh:m})}catch(be){Gr.error("renderEditor \u5F02\u5E38",{err:be}),Z=g("div",{text:`\u7F16\u8F91\u5668\u6E32\u67D3\u5F02\u5E38\uFF1A${be?.message||be}`,style:{color:"var(--yyt-danger, #f87171)",fontSize:"12px"}})}let ie=$t({heading:j?`\u7F16\u8F91\u300C${F.name}\u300D\uFF08\u5185\u7F6E\u53EA\u8BFB\uFF09`:`\u7F16\u8F91\u300C${F.name}\u300D`,icon:"\u270E",content:[Z].filter(Boolean)});if(K.push(ie),v.appendChild(ie.el),typeof a=="function"){let be=null;try{be=a(F,{refresh:m})}catch(Re){Gr.warn("renderExtras \u5F02\u5E38",{err:Re})}if(be){let Re=$t({heading:"\u9644\u52A0",icon:"\u{1F527}",content:[be]});K.push(Re),v.appendChild(Re.el)}}}else b.length>0&&v.appendChild(g("div",{text:"\u8BF7\u5728\u4E0A\u65B9\u5217\u8868\u9009\u62E9\u4E00\u4E2A\u9884\u8BBE\u4EE5\u7F16\u8F91",style:{fontSize:"12px",color:"var(--yyt-text-muted)",padding:"16px",textAlign:"center",border:"1px dashed var(--yyt-border, rgba(255,255,255,0.08))",borderRadius:"var(--yyt-radius-sm, 6px)"}}));let U=de({label:"\u2B06 \u5BFC\u5165",size:"small",variant:"ghost",onClick:async()=>{await Vg(n,m)}}),A=de({label:"\u2B07 \u5BFC\u51FA",size:"small",variant:"ghost",onClick:()=>{Jg(n,r)}}),O=de({label:"\u6E05\u7A7A\u5168\u90E8",size:"small",variant:"ghost",onClick:async()=>{await Ee.confirm({title:"\u6E05\u7A7A\u6240\u6709\u9884\u8BBE",message:"\u6B64\u64CD\u4F5C\u4F1A\u5220\u9664\u6240\u6709\u7528\u6237\u9884\u8BBE\uFF08\u5185\u7F6E\u9884\u8BBE\u4E0D\u53D7\u5F71\u54CD\uFF09\uFF0C\u4E0D\u53EF\u64A4\u9500\u3002",confirmText:"\u6E05\u7A7A",danger:!0})&&typeof n.resetAll=="function"&&(n.resetAll(),m())}}),J=Zi({items:[U,A,O],align:"end",gap:"8px"});v.appendChild(J.el),p.innerHTML="",p.appendChild(v),p._yytPresetPanelCleanup=()=>{for(let j of K)try{j.destroy()}catch{}delete p._yytPresetPanelCleanup}},destroy(u){let p=qc(u);if(p?._yytPresetPanelCleanup)try{p._yytPresetPanelCleanup()}catch{}},getStyles(){return""}}}async function Vg(t,e){if(typeof t.importPresets!="function"){await Ee.confirm({title:"\u4E0D\u652F\u6301\u5BFC\u5165",message:"\u5F53\u524D\u9884\u8BBE\u7C7B\u578B\u4E0D\u652F\u6301\u5BFC\u5165\u3002",confirmText:"\u786E\u5B9A"});return}let r=g("textarea",{className:"yyt-textarea",attrs:{placeholder:"\u7C98\u8D34\u5BFC\u51FA\u7684 JSON"},style:{width:"100%",minHeight:"180px",fontSize:"12px",fontFamily:"monospace"}}),s=Ee.custom({title:"\u5BFC\u5165\u9884\u8BBE",width:"520px",body:r,buttons:[{label:"\u53D6\u6D88",variant:"ghost",onClick:n=>n(null)},{label:"\u4ECE\u6587\u4EF6\u2026",variant:"ghost",onClick:()=>{let n=g("input",{attrs:{type:"file",accept:"application/json,.json"}});n.addEventListener("change",()=>{let i=n.files?.[0];if(!i)return;let a=new FileReader;a.onload=()=>{r.value=String(a.result||""),r.focus()},a.readAsText(i)}),n.click()}},{label:"\u5BFC\u5165",variant:"primary",onClick:async n=>{let i=r.value.trim();if(!i){n(null);return}let a;try{a=JSON.parse(i)}catch(l){await Ee.confirm({title:"JSON \u89E3\u6790\u5931\u8D25",message:String(l?.message||l),confirmText:"\u786E\u5B9A"});return}try{let l=t.importPresets(a);n(l)}catch(l){await Ee.confirm({title:"\u5BFC\u5165\u5931\u8D25",message:String(l?.message||l),confirmText:"\u786E\u5B9A"})}}}]});setTimeout(()=>r.focus(),0);let o=await s.result;o&&(o.added>0||o.imported>0)&&e()}function Jg(t,e){if(typeof t.exportAll!="function"){Ee.confirm({title:"\u4E0D\u652F\u6301\u5BFC\u51FA",message:"\u5F53\u524D\u9884\u8BBE\u7C7B\u578B\u4E0D\u652F\u6301\u5BFC\u51FA\u3002",confirmText:"\u786E\u5B9A"});return}let r=t.exportAll(),s=JSON.stringify(r,null,2),o=g("textarea",{className:"yyt-textarea",style:{width:"100%",minHeight:"220px",fontSize:"12px",fontFamily:"monospace"}});o.value=s,o.readOnly=!0,Ee.custom({title:`\u5BFC\u51FA ${e||""} \u9884\u8BBE`,width:"600px",body:o,buttons:[{label:"\u5173\u95ED",variant:"ghost",onClick:n=>n(null)},{label:"\u590D\u5236\u5230\u526A\u8D34\u677F",variant:"ghost",onClick:async()=>{try{await navigator.clipboard.writeText(s)}catch{o.select();try{document.execCommand("copy")}catch{}}}},{label:"\u4E0B\u8F7D JSON",variant:"primary",onClick:()=>{try{let n=new Blob([s],{type:"application/json"}),i=URL.createObjectURL(n),a=g("a",{attrs:{href:i,download:`${e||"preset"}_${Date.now()}.json`}});document.body.appendChild(a),a.click(),setTimeout(()=>{try{document.body.removeChild(a)}catch{}try{URL.revokeObjectURL(i)}catch{}},100)}catch(n){Gr.warn("\u4E0B\u8F7D\u5931\u8D25",{err:n})}}}]})}var Gr,wo=L(()=>{tr();q();Gr=C.createScope("PresetManagerBase")});var Xc={};oe(Xc,{ApiPresetPanel:()=>Jc,default:()=>em});function Qg(t,{onChange:e,readonly:r}){let s=g("div",{style:{display:"flex",flexDirection:"column",gap:"12px"}}),o=t.apiConfig||{};W(s,ct({label:"\u63CF\u8FF0",control:Ge({value:t.description||"",placeholder:"\u53EF\u9009 \u2014 \u5907\u6CE8\u7528\u9014",disabled:r,onChange:a=>e({description:a})})})),W(s,St({label:"\u4F7F\u7528\u4E3B API",hint:"\u5F00\u542F\u540E\u5FFD\u7565\u4E0B\u65B9 URL/Key/Model\uFF0C\u76F4\u63A5\u590D\u7528 SillyTavern \u4E3B\u8FDE\u63A5",checked:o.useMainApi!==!1,disabled:r,onChange:a=>e({apiConfig:{...o,useMainApi:a}})})),W(s,St({label:"\u6D41\u5F0F\u8F93\u51FA\uFF08stream\uFF09",hint:"\u9010\u5B57\u63A5\u6536\u54CD\u5E94",checked:o.stream===!0,disabled:r,onChange:a=>e({apiConfig:{...o,stream:a}})})),W(s,ct({label:"API URL",control:Ge({value:o.url||"",placeholder:"https://api.example.com/v1",disabled:r,onChange:a=>e({apiConfig:{...o,url:a}})})})),W(s,ct({label:"API Key",control:(()=>{let a=Ge({value:o.apiKey||"",placeholder:"sk-...",disabled:r,onChange:l=>e({apiConfig:{...o,apiKey:l}})});try{a.el.setAttribute("type","password")}catch{}return a})()})),W(s,ct({label:"\u6A21\u578B",control:Ge({value:o.model||"",placeholder:"gpt-4 / gemini-pro / claude-...",disabled:r,onChange:a=>e({apiConfig:{...o,model:a}})})}));let n=g("div",{style:{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:"10px"}});function i(a,l,d,c="1"){let u=g("div",{style:{display:"flex",flexDirection:"column",gap:"4px"}});u.appendChild(g("label",{text:a,style:{fontSize:"11px",color:"var(--yyt-text-secondary)",fontWeight:"600"}}));let p=g("input",{className:"yyt-input",attrs:{type:"number",step:c,disabled:r?"disabled":null},style:{padding:"6px 10px",fontSize:"12px"}});return p.value=String(o[l]??d),p.addEventListener("change",()=>{let y=Number(p.value);Number.isFinite(y)&&e({apiConfig:{...o,[l]:y}})}),u.appendChild(p),u}return n.appendChild(i("max_tokens","max_tokens",4096,"1")),n.appendChild(i("temperature","temperature",.7,"0.05")),n.appendChild(i("top_p","top_p",.9,"0.05")),W(s,n),s}function Zg(t){let e=t.apiConfig||{},r=[];return e.useMainApi!==!1?r.push("\u4E3B API"):r.push(e.model||"\u81EA\u5B9A\u4E49"),t.starred&&r.push("\u2605"),r}var _r,Xg,Jc,em,Qc=L(()=>{tr();fo();q();wo();_r=C.createScope("ApiPresetPanel"),Xg={listPresets(){return vr().map(t=>({id:t.name,name:t.name,description:t.description||"",apiConfig:t.apiConfig||{},starred:t.starred===!0,createdAt:t.createdAt,updatedAt:t.updatedAt}))},getPreset(t){if(!t)return null;let e=jr(t);return e?{id:e.name,...e,description:e.description||""}:null},getCurrentPresetId(){return Ki()||""},setCurrentPresetId(t){if(!t)return!1;try{return!!fn(t)}catch(e){return _r.warn("switchToPreset \u5931\u8D25",{err:e}),!1}},createPreset(t){let e=String(t?.name||"").trim();if(!e)return _r.warn("createPreset: name \u7F3A\u5931"),null;let r=pn({name:e,description:t?.description||"",apiConfig:t?.apiConfig||{}});return r?.success?{id:r.preset.name,...r.preset,description:r.preset.description||""}:(_r.warn("createPreset \u5931\u8D25",{msg:r?.message}),null)},updatePreset(t,e){if(!t)return null;let r=Di(t,e);return r?.success?{id:r.preset.name,...r.preset,description:r.preset.description||""}:(_r.warn("updatePreset \u5931\u8D25",{id:t,msg:r?.message}),null)},deletePreset(t){if(!t)return!1;try{let e=yn(t);return!!(e?.success??e===!0)}catch(e){return _r.warn("deletePreset \u5931\u8D25",{err:e}),!1}},duplicatePreset(t,e={}){if(!t)return null;let r=e.nameSuffix||"_\u526F\u672C",s=`${t}${r}`;try{let o=zi(t,s);return o?.success?{id:o.preset.name,...o.preset,description:o.preset.description||""}:null}catch(o){return _r.warn("duplicatePreset \u5931\u8D25",{err:o}),null}},renamePreset(t,e){if(!t||!e)return null;try{let r=Bi(t,e);return r?.success?{id:r.preset?.name||e,...r.preset,description:r.preset?.description||""}:null}catch(r){return _r.warn("renamePreset \u5931\u8D25",{err:r}),null}},exportAll(){let t=Ui();try{return{version:1,exportedAt:Date.now(),presets:JSON.parse(t)}}catch{return{version:1,exportedAt:Date.now(),presets:[]}}},importPresets(t){if(!t||typeof t!="object")return{added:0};let e=Array.isArray(t.presets)?t.presets:[t],r=JSON.stringify(e);return{added:ji(r,{overwrite:!1})?.imported||0}},resetAll(){let t=vr();for(let e of t)try{yn(e.name)}catch{}}};Jc=Tr({id:"apiPresetPanel",kind:"api",panelTitle:"API \u9884\u8BBE",panelHint:'\u7BA1\u7406\u591A\u7EC4 API \u8FDE\u63A5\u914D\u7F6E\u3002\u70B9\u51FB"\u52A0\u8F7D"\u6FC0\u6D3B\u67D0\u4E2A\u9884\u8BBE\u4F5C\u4E3A\u5F53\u524D API\uFF1B\u5176\u4ED6\u5DE5\u5177\u53EF\u5728\u914D\u7F6E\u9762\u677F\u4E2D\u6309\u9884\u8BBE\u540D\u5F15\u7528\u3002',store:Xg,renderEditor:Qg,renderListItemMeta:Zg,hasSwitchToButton:!0,onSwitchTo:t=>{try{fn(t)}catch(e){_r.warn("switchToPreset",{err:e})}}}),em=Jc});function sa(){return`wb_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`}function Ar(){let t=we.get(ra);return!t||typeof t!="object"?{}:t}function wn(t){we.set(ra,t)}function Yr(t){return typeof t=="string"&&t.startsWith(tm)}function rm(t){return Yr(t)&&xn.find(e=>e.id===t)||null}function oa(t){if(!Array.isArray(t)){xn=[];return}xn=t.map(e=>qr({...e,id:String(e?.id||"")})).filter(e=>Yr(e.id))}function qr(t={}){let e=String(t.id||sa()),r=Array.isArray(t.bookList)?t.bookList.map(s=>({bookName:String(s?.bookName||""),enabled:s?.enabled!==!1,entryOverrides:s?.entryOverrides&&typeof s.entryOverrides=="object"?s.entryOverrides:{}})).filter(s=>s.bookName):[];return{id:e,name:String(t.name||"").trim()||"\u672A\u547D\u540D\u9884\u8BBE",description:String(t.description||""),bindingMode:t.bindingMode===rr.CUSTOM?rr.CUSTOM:rr.CHARACTER_CARD,includeDisabled:t.includeDisabled===!0,bookList:r,createdAt:Number.isFinite(t.createdAt)?t.createdAt:Date.now(),updatedAt:Number.isFinite(t.updatedAt)?t.updatedAt:Date.now()}}function sm(){let t=Ar(),e=Object.values(t).map(qr).sort((r,s)=>s.updatedAt-r.updatedAt);return[...xn,...e]}function So(t){if(!t)return null;if(Yr(t))return rm(t);let e=Ar();return e[t]?qr(e[t]):null}function na(){let t=we.get(vo);return typeof t=="string"&&t?t:""}function om(){let t=na();return t?So(t):null}function nm(t){if(t&&Yr(t))return we.set(vo,t),z.emit(D.PRESET_ACTIVATED,{kind:"worldbook",id:t}),!0;let e=Ar();return t&&!e[t]?(Er.warn(`setCurrentPresetId \u627E\u4E0D\u5230\u9884\u8BBE: ${t}`),!1):(we.set(vo,t||""),z.emit(D.PRESET_ACTIVATED,{kind:"worldbook",id:t}),!0)}function vn(t={}){let e=qr({...t,id:sa(),createdAt:Date.now(),updatedAt:Date.now()}),r=Ar();return r[e.id]=e,wn(r),z.emit(D.PRESET_CREATED,{kind:"worldbook",id:e.id}),Er.info(`\u521B\u5EFA\u9884\u8BBE: ${e.id} (${e.name})`),e}function Zc(t,e={}){if(!t)return null;if(Yr(t))return Er.warn(`\u62D2\u7EDD\u4FEE\u6539\u5185\u7F6E\u9884\u8BBE: ${t}`),null;let r=Ar(),s=r[t];if(!s)return Er.warn(`updatePreset \u627E\u4E0D\u5230\u9884\u8BBE: ${t}`),null;let o=qr({...s,...e,id:t,createdAt:s.createdAt,updatedAt:Date.now()});return r[t]=o,wn(r),z.emit(D.PRESET_UPDATED,{kind:"worldbook",id:t}),o}function im(t){if(!t)return!1;if(Yr(t))return Er.warn(`\u62D2\u7EDD\u5220\u9664\u5185\u7F6E\u9884\u8BBE: ${t}`),!1;let e=Ar();return e[t]?(delete e[t],wn(e),na()===t&&we.set(vo,""),z.emit(D.PRESET_DELETED,{kind:"worldbook",id:t}),Er.info(`\u5220\u9664\u9884\u8BBE: ${t}`),!0):!1}function am(t,{nameSuffix:e=" \u526F\u672C"}={}){let r=So(t);return r?vn({...r,id:void 0,name:`${r.name}${e}`}):null}function lm(t,e){return Yr(t)?(Er.warn(`\u62D2\u7EDD\u91CD\u547D\u540D\u5185\u7F6E\u9884\u8BBE: ${t}`),null):Zc(t,{name:String(e||"").trim()||"\u672A\u547D\u540D\u9884\u8BBE"})}function cm(){return{version:1,exportedAt:Date.now(),presets:Object.values(Ar()).map(qr)}}function dm(t){if(!t||typeof t!="object")return{added:0,skipped:0};let e=Array.isArray(t.presets)?t.presets:[],r=Ar(),s=0,o=0;for(let n of e){let i=qr({...n,id:sa(),createdAt:Date.now(),updatedAt:Date.now()});r[i.id]=i,s+=1}return wn(r),s>0&&z.emit(D.PRESET_IMPORTED,{kind:"worldbook",count:s}),{added:s,skipped:o}}function um(){we.set(ra,{}),we.set(vo,""),Er.info("\u5DF2\u6E05\u7A7A\u6240\u6709\u4E16\u754C\u4E66\u9884\u8BBE")}var Er,ra,vo,rr,tm,xn,Ot,As=L(()=>{Le();Ke();q();Er=C.createScope("WorldbookPresetStore"),ra="worldbook_presets",vo="worldbook_current_preset",rr=Object.freeze({CHARACTER_CARD:"character_card",CUSTOM:"custom"});tm="builtin_worldbook_",xn=[];Ot={listPresets:sm,getPreset:So,getCurrentPresetId:na,getCurrentPreset:om,setCurrentPresetId:nm,createPreset:vn,updatePreset:Zc,deletePreset:im,duplicatePreset:am,renamePreset:lm,exportAll:cm,importPresets:dm,resetAll:um,BINDING_MODES:rr}});function Cr(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window}function Sn(){return Cr()?.SillyTavern||null}function me(t){return t==null?"":String(t).trim()}function ym(t){if(!t)return"";let e=[t.content,t.mes,t.message,t.text,t?.data?.content];for(let r of e)if(typeof r=="string"&&r.trim())return r.trim();return""}function fm(t){let e=String(t?.role||"").trim().toLowerCase();return e==="assistant"||e==="ai"?"assistant":e==="system"?"system":e==="user"||t?.is_user===!0?"user":t?.is_system===!0?"system":"assistant"}function td(t=""){let e=String(t||"").trim();if(!e)return"empty";let r=0;for(let s=0;s<e.length;s+=1)r=(r<<5)-r+e.charCodeAt(s),r|=0;return`fp_${Math.abs(r).toString(36)}`}function rd(t={}){let e=me(t.chatId)||"chat_default",r=me(t.messageId)||"latest";return`${e}::${r}`}function sd(t={}){let e=rd(t),r=me(t.effectiveSwipeId)||"swipe:current",s=me(t.assistantContentFingerprint)||"empty";return`${e}::${r}::${s}`}function gm(t={}){let e=sd(t),r=me(t.eventType)||"MANUAL",s=me(t.traceId)||od("manual");return`${e}::${r}::${s}`}function od(t="trace"){return`${t}_${Date.now()}_${Math.random().toString(36).slice(2,8)}`}function nd(){let t=Sn();try{let e=t?.getContext?.()||null;if(Array.isArray(e?.chat))return e.chat}catch{}return Array.isArray(t?.chat)?t.chat:[]}function id(t=[]){let e=[],r=null,s=null;return t.forEach((o,n)=>{let i=fm(o),a=ym(o);if(!a)return;let l=me(o?.messageId??o?.message_id??o?.id??o?.mid??o?.mesid??o?.chat_index??n),d=me(o?.swipe_id??o?.swipeId??o?.swipe??""),c={role:i,content:a,sourceId:l,swipeId:d,raw:o,index:n};e.push(c),i==="user"&&(r=c),i==="assistant"&&(s=c)}),{messages:e,lastUserMessage:r,lastAiMessage:s}}function mm(t,e,r){return me(e?.chatId??e?.chat_id??t?.chatId??t?.chat_id??t?.this_chid??r?.id??"chat_default")||"chat_default"}async function ia(){let t=Sn();if(!t)return null;try{let e=t.this_chid,r=t.characters||[];if(e>=0&&e<r.length){let s=r[e];return{id:e,name:s?.name||"",description:s?.description||"",personality:s?.personality||"",scenario:s?.scenario||"",firstMes:s?.first_mes||"",mesExample:s?.mes_example||""}}}catch(e){pm.error("\u83B7\u53D6\u89D2\u8272\u4FE1\u606F\u5931\u8D25:",e)}return null}function hm(t="",e=null){let r=String(t||""),s=e?.YouYouToolkit_toolOutputs;return s&&typeof s=="object"&&Object.values(s).forEach(o=>{let n=String(o?.blockText||o?.content||"").trim();n&&r.includes(n)&&(r=r.replace(n,"").trimEnd())}),r.trim()}function bm(t,e={}){let r=Array.isArray(t?.messages)?t.messages:[],s=me(e.messageId),o=me(e.swipeId);if(!s)return t?.lastAiMessage||null;let n=r.filter(a=>a.role==="assistant"),i=n.find(a=>a.sourceId!==s?!1:o?me(a.swipeId)===o:!0);return i||n.find(a=>a.sourceId===s)||null}function ad({api:t,stContext:e,character:r,conversation:s,targetAssistantMessage:o,runSource:n="MANUAL"}={}){let i=s?.messages||[],a=s?.lastUserMessage||null,l=me(o?.sourceId)||"",d=me(o?.swipeId)||"swipe:current",c=o?.content||"",u=hm(c,o?.raw||null),p=td(c),y=td(u),f=mm(t,e,r),m=od(String(n||"manual").toLowerCase()),b=rd({chatId:f,messageId:l}),w=sd({chatId:f,messageId:l,effectiveSwipeId:d,assistantContentFingerprint:y});return{startedAt:Date.now(),runSource:n,traceId:m,chatId:f,messageId:l,confirmedAssistantMessageId:l,slotBindingKey:b,slotRevisionKey:w,slotTransactionId:gm({chatId:f,messageId:l,effectiveSwipeId:d,assistantContentFingerprint:y,eventType:n,traceId:m}),executionKey:w,lastAiMessage:c,assistantContentFingerprint:p,assistantBaseText:u,assistantBaseFingerprint:y,lastAiMessageSwipeId:d,confirmedAssistantSwipeId:d,effectiveSwipeId:d,sourceMessageId:l,sourceSwipeId:d,lastUserMessage:a?.content||"",userMessage:a?.content||"",targetAssistantMessage:o,chatMessages:i,characterCard:r,chatHistory:i,input:{userMessage:a?.content||"",lastAiMessage:c,assistantBaseText:u,extractedContent:"",previousToolOutput:"",context:{character:r?.name||"",chatLength:i.length||0}},config:{},status:"pending"}}async function Vr({runSource:t="MANUAL"}={}){let e=Sn(),r=e?.getContext?.()||null,s=await ia(),o=nd(),n=id(o),i=n?.lastAiMessage||null;return ad({api:e,stContext:r,character:s,conversation:n,targetAssistantMessage:i,runSource:t})}async function Jr({messageId:t,swipeId:e="",runSource:r="AUTO"}={}){let s=Sn(),o=s?.getContext?.()||null,n=await ia(),i=nd(),a=id(i),l=bm(a,{messageId:t,swipeId:e});return ad({api:s,stContext:o,character:n,conversation:a,targetAssistantMessage:l,runSource:r})}var pm,Xr=L(()=>{q();pm=C.createScope("ExecutionContext")});function ca(){try{if(typeof TavernHelper<"u"&&TavernHelper)return TavernHelper}catch{}return Cr()?.TavernHelper||null}function ld(){try{if(typeof SillyTavern<"u"&&SillyTavern)return SillyTavern}catch{}return Cr()?.SillyTavern||null}function ks(t){return Array.isArray(t)?Array.from(new Set(t.map(e=>String(e||"").trim()).filter(Boolean))):[]}function aa(t){if(Array.isArray(t))return t.map(e=>typeof e=="string"?e:e&&typeof e=="object"?e.name||e.id||e.title||JSON.stringify(e):String(e??""));if(t&&typeof t=="object"){let e={};return Object.keys(t).forEach(r=>{let s=t[r];Array.isArray(s)?e[r]=s.map(o=>typeof o=="string"?o:o&&typeof o=="object"?o.name||o.id||o.title||"[object]":String(o??"")):s&&typeof s=="object"?e[r]="[object]":e[r]=s}),e}return t}function wm(t={}){let e=typeof t.content=="string"?t.content.trim():"";if(!e)return"";let r=[t.comment,t.key,t.keysecondary,t.text].map(s=>String(s||"").trim()).find(Boolean);return r&&r!==e?`## ${r}
${e}`:e}function da(){return Array.isArray(la)?[...la]:[]}async function cd(t){if(!t||typeof t.getCharLorebooks!="function")return[];try{let e=await Promise.resolve(t.getCharLorebooks({type:"all"}));return ks([e?.primary,e?.secondary,...Array.isArray(e?.additional)?e.additional:[]])}catch(e){return Cs.warn("\u83B7\u53D6\u89D2\u8272\u7ED1\u5B9A\u4E16\u754C\u4E66\u5931\u8D25:",e),[]}}async function vm(t,e){if(t&&typeof t.getLorebooks=="function")try{let r=ks(await Promise.resolve(t.getLorebooks()));if(r.length>0)return r}catch(r){Cs.warn("\u83B7\u53D6\u5168\u90E8\u4E16\u754C\u4E66\u5217\u8868\u5931\u8D25:",r)}if(e&&typeof e.getWorldBooks=="function")try{let r=await Promise.resolve(e.getWorldBooks()),s=ks(Array.isArray(r)?r.map(o=>o?.name??o):[]);if(s.length>0)return s}catch(r){Cs.warn("\u4ECE SillyTavern \u83B7\u53D6\u4E16\u754C\u4E66\u5217\u8868\u5931\u8D25:",r)}return[]}async function ua(){let t=ca(),e=ld(),r={checkedAt:Date.now(),hasGlobalTavernHelper:(()=>{try{return typeof TavernHelper<"u"&&!!TavernHelper}catch{return!1}})(),hasParentTavernHelper:!!Cr()?.TavernHelper,hasGlobalSillyTavern:(()=>{try{return typeof SillyTavern<"u"&&!!SillyTavern}catch{return!1}})(),hasParentSillyTavern:!!Cr()?.SillyTavern,helperKeys:t?Object.keys(t).sort():[],stKeys:e?Object.keys(e).sort():[],getLorebooksType:typeof t?.getLorebooks,getCharLorebooksType:typeof t?.getCharLorebooks,getLorebookEntriesType:typeof t?.getLorebookEntries,getWorldBooksType:typeof e?.getWorldBooks,characterWorldbooks:[],allWorldbooks:[],combinedWorldbooks:[],rawResults:{},errors:[]};try{r.rawResults.getLorebooks=t&&typeof t.getLorebooks=="function"?aa(await Promise.resolve(t.getLorebooks())):"[unavailable]"}catch(i){r.errors.push(`getLorebooks: ${i?.message||i}`)}try{r.rawResults.getCharLorebooks=t&&typeof t.getCharLorebooks=="function"?aa(await Promise.resolve(t.getCharLorebooks({type:"all"}))):"[unavailable]"}catch(i){r.errors.push(`getCharLorebooks: ${i?.message||i}`)}try{r.rawResults.getWorldBooks=e&&typeof e.getWorldBooks=="function"?aa(await Promise.resolve(e.getWorldBooks())):"[unavailable]"}catch(i){r.errors.push(`getWorldBooks: ${i?.message||i}`)}let s=await cd(t),o=await vm(t,e),n=ks([...s,...o]);return r.characterWorldbooks=[...s],r.allWorldbooks=[...o],r.combinedWorldbooks=[...n],xm=r,la=n,[...n]}async function Tn(t){let e="";if(typeof t=="string"?e=t:t&&typeof t=="object"&&(e=t?.worldbooks?.presetId||""),!e)return"";let r=So(e);if(!r)return Cs.warn(`buildSelectedWorldbookContent: \u9884\u8BBE\u4E0D\u5B58\u5728 ${e}`),"";let s=r.includeDisabled===!0,o=[];if(r.bindingMode==="character_card"){let a=ca(),l=ld(),d=await cd(a),c=new Map((r.bookList||[]).map(u=>[String(u.bookName||""),u]));for(let u of ks(d)){let p=c.get(u);p&&p.enabled===!1||o.push(u)}}else o=(r.bookList||[]).filter(a=>a&&a.bookName&&a.enabled!==!1).map(a=>a.bookName);if(o=ks(o),o.length===0)return"";let n=ca();if(!n||typeof n.getLorebookEntries!="function")return Cs.warn("TavernHelper.getLorebookEntries \u4E0D\u53EF\u7528\uFF0C\u65E0\u6CD5\u8BFB\u53D6\u4E16\u754C\u4E66\u5185\u5BB9\u3002"),"";let i=[];for(let a of o)try{let l=await n.getLorebookEntries(a),d=Array.isArray(l)?l:[],u=(s?d:d.filter(p=>p?.enabled!==!1&&!p?.disable)).map(wm).filter(Boolean).join(`

`);u&&i.push(`[\u4E16\u754C\u4E66\uFF1A${a}]
${u}`)}catch(l){Cs.warn(`\u8BFB\u53D6\u4E16\u754C\u4E66\u5931\u8D25: ${a}`,l)}return i.join(`

---

`)}var Cs,la,xm,_n=L(()=>{Xr();q();As();Cs=C.createScope("ToolWorldbookService"),la=[],xm=null});var pd={};oe(pd,{WorldbookPresetPanel:()=>ud,default:()=>km});function Tm(t){return t===rr.CUSTOM?"\u81EA\u5B9A\u4E49":"\u8DDF\u968F\u89D2\u8272\u5361"}function dd(t,e,r){let s=[...t.bookList],o=s.findIndex(n=>n.bookName===e);o>=0?s[o]={...s[o],enabled:r}:s.push({bookName:e,enabled:r,entryOverrides:{}}),Ot.updatePreset(t.id,{bookList:s})}function _m(t,e){let r=t.bookList.filter(s=>s.bookName!==e);Ot.updatePreset(t.id,{bookList:r})}async function Em(t,e){let r=da();if(!r.length)try{r=await ua()}catch{}let s=new Set(t.bookList.map(c=>c.bookName)),o=r.filter(c=>!s.has(c));if(!o.length){await Ee.confirm({title:"\u6CA1\u6709\u53EF\u6DFB\u52A0\u7684\u4E16\u754C\u4E66",message:"\u5BBF\u4E3B\u672A\u63D0\u4F9B\u66F4\u591A\u53EF\u7528\u4E16\u754C\u4E66\uFF0C\u6216\u7F13\u5B58\u5185\u5168\u90E8\u5DF2\u52A0\u5165\u6B64\u9884\u8BBE\u3002",confirmText:"\u786E\u5B9A"});return}let n=g("div",{style:{display:"flex",flexDirection:"column",gap:"8px"}}),i=g("input",{className:"yyt-input",attrs:{type:"text",placeholder:`\u641C\u7D22 ${o.length} \u672C\u4E16\u754C\u4E66\u2026`,autocomplete:"off"},style:{padding:"7px 10px",fontSize:"12px"}});n.appendChild(i);let a=g("div",{style:{display:"flex",flexDirection:"column",gap:"4px",maxHeight:"320px",overflowY:"auto"}}),l=new Set,d=[];for(let c of o){let u=g("label",{style:{display:"flex",alignItems:"center",gap:"8px",padding:"8px 10px",cursor:"pointer",borderRadius:"var(--yyt-radius-sm, 6px)",background:"var(--yyt-surface-2, rgba(255,255,255,0.03))",fontSize:"12px"}}),p=g("input",{attrs:{type:"checkbox",value:c}});p.addEventListener("change",()=>{p.checked?l.add(c):l.delete(c)}),u.appendChild(p),u.appendChild(g("span",{text:c,style:{color:"var(--yyt-text)"}})),a.appendChild(u),d.push({el:u,search:c.toLowerCase()})}n.appendChild(a),i.addEventListener("input",()=>{let c=i.value.trim().toLowerCase();for(let u of d)u.el.style.display=!c||u.search.includes(c)?"":"none"}),Ee.custom({title:`\u6DFB\u52A0\u4E16\u754C\u4E66\uFF08${o.length} \u9879\u53EF\u9009\uFF09`,width:"480px",body:n,buttons:[{label:"\u53D6\u6D88",variant:"ghost",onClick:c=>c(null)},{label:"\u5168\u9009\u53EF\u89C1",variant:"ghost",onClick:()=>{for(let c of a.querySelectorAll("input[type=checkbox]")){let u=c.closest("label");(!u||u.style.display!=="none")&&(c.checked=!0,l.add(c.value))}}},{label:"\u6DFB\u52A0\u9009\u4E2D",variant:"primary",onClick:c=>{let u=Array.from(l);if(!u.length){c(null);return}let p=u.map(f=>({bookName:f,enabled:!0,entryOverrides:{}})),y=[...t.bookList,...p];Ot.updatePreset(t.id,{bookList:y}),c(u.length)}}]}).result.then(c=>{c&&e&&e()})}function Am(t,{onChange:e,readonly:r,refresh:s}){let o=g("div",{style:{display:"flex",flexDirection:"column",gap:"12px"}});W(o,ct({label:"\u63CF\u8FF0",control:Ge({value:t.description,placeholder:"\u53EF\u9009 \u2014 \u5907\u6CE8\u7528\u9014",disabled:r,onChange:u=>e({description:u})})})),W(o,ct({label:"\u7ED1\u5B9A\u6A21\u5F0F",hint:"\u8DDF\u968F\u89D2\u8272\u5361 = \u6CE8\u5165\u5F53\u524D\u89D2\u8272\u7ED1\u5B9A\u7684\u4E16\u754C\u4E66\uFF1B\u81EA\u5B9A\u4E49 = \u7528\u4E0B\u65B9\u624B\u52A8\u9009\u62E9\u7684\u5217\u8868",control:Ue({value:t.bindingMode,disabled:r,options:[{value:rr.CHARACTER_CARD,label:"\u8DDF\u968F\u89D2\u8272\u5361\uFF08\u52A8\u6001\uFF09"},{value:rr.CUSTOM,label:"\u81EA\u5B9A\u4E49\uFF08\u56FA\u5B9A\u5217\u8868\uFF09"}],onChange:u=>{e({bindingMode:u}),s&&s()}})})),W(o,St({label:"\u5305\u542B\u7981\u7528\u8BCD\u6761",hint:"\u5F00\u542F\u540E\uFF1A\u6E90\u4E16\u754C\u4E66\u4E2D\u5DF2\u7981\u7528\u7684\u8BCD\u6761\u53EF\u88AB\u672C\u9884\u8BBE\u5F3A\u5236\u542F\u7528\u5E76\u6CE8\u5165",checked:t.includeDisabled,disabled:r,onChange:u=>e({includeDisabled:u})}));let n=t.bindingMode===rr.CHARACTER_CARD,i=da(),a=g("div",{style:{display:"flex",flexDirection:"column"}}),l=g("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"6px",gap:"8px"}});l.appendChild(g("div",{style:{display:"flex",flexDirection:"column",gap:"2px"}},g("div",{text:n?"\u968F\u89D2\u8272\u5361\u6CE8\u5165\u7684\u4E16\u754C\u4E66":"\u9009\u4E2D\u7684\u4E16\u754C\u4E66",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}}),g("div",{text:n?"\u4EE5\u4E0B\u6765\u81EA\u5F53\u524D\u89D2\u8272\u5361\u7684\u4E16\u754C\u4E66\u5C06\u88AB\u6CE8\u5165\uFF1B\u53EF\u5355\u72EC\u5173\u95ED\u67D0\u672C\uFF08\u4E0D\u5F71\u54CD\u5176\u4ED6\u5DE5\u5177\uFF09":'\u672C\u9884\u8BBE\u56FA\u5B9A\u6CE8\u5165\u4E0B\u5217\u4E16\u754C\u4E66\uFF1B\u70B9\u51FB"+ \u6DFB\u52A0"\u4ECE\u53EF\u7528\u5217\u8868\u591A\u9009',style:{fontSize:"11px",color:"var(--yyt-text-muted)",lineHeight:"1.5"}})));let d=g("div",{style:{display:"flex",gap:"6px"}});!n&&!r&&d.appendChild(de({label:"+ \u6DFB\u52A0",size:"small",onClick:()=>Em(t,s)}).el),d.appendChild(de({label:"\u{1F504} \u5237\u65B0",size:"small",variant:"ghost",onClick:async()=>{try{await ua()}catch(u){Sm.warn("\u5237\u65B0\u5931\u8D25",{e:u})}s&&s()}}).el),l.appendChild(d),W(a,l);let c=[];n?i.length?c=i.map(u=>{let p=t.bookList.find(f=>f.bookName===u),y=p?p.enabled!==!1:!0;return mn({name:u,desc:y?"\u5DF2\u542F\u7528 \xB7 \u6574\u672C\u6CE8\u5165":"\u5DF2\u7981\u7528",actions:[St({checked:y,disabled:r,onChange:f=>dd(t,u,f)})]})}):c=[g("div",{style:{padding:"14px 0",color:"var(--yyt-text-muted)",fontSize:"12px"},text:'\u5F53\u524D\u89D2\u8272\u5361\u672A\u7ED1\u5B9A\u4E16\u754C\u4E66 \u2014 \u5207\u6362\u5230"\u81EA\u5B9A\u4E49"\u53EF\u4EE5\u624B\u52A8\u9009\u62E9\u4EFB\u610F\u4E16\u754C\u4E66\u3002'})]:t.bookList.length?c=t.bookList.map(u=>mn({name:u.bookName,desc:u.enabled===!1?"\u5DF2\u7981\u7528":"\u5DF2\u542F\u7528 \xB7 \u6574\u672C\u6CE8\u5165",actions:[St({checked:u.enabled!==!1,disabled:r,onChange:p=>dd(t,u.bookName,p)}),...r?[]:[de({label:"\xD7",size:"small",variant:"ghost",title:"\u4ECE\u9884\u8BBE\u79FB\u9664",onClick:()=>{_m(t,u.bookName),s&&s()}})]]})):c=[g("div",{style:{padding:"14px 0",color:"var(--yyt-text-muted)",fontSize:"12px"},text:'\u70B9\u51FB\u53F3\u4E0A\u89D2"+ \u6DFB\u52A0"\u9009\u62E9\u4E16\u754C\u4E66\u52A0\u5165\u6B64\u9884\u8BBE\u3002'})];for(let u of c)u?.el?W(a,u.el):u instanceof Node&&W(a,u);return W(o,a),o}function Cm(t){let e=[`${Tm(t.bindingMode)}`,`${t.bookList.length} \u672C`];return t.includeDisabled&&e.push("\u542B\u7981\u7528"),e}var Sm,ud,km,yd=L(()=>{tr();As();_n();bn();q();wo();Sm=C.createScope("WorldbookPresetPanel");ud=Tr({id:"worldbookPresetPanel",kind:"worldbook",panelTitle:"\u4E16\u754C\u4E66\u9884\u8BBE",panelHint:"\u7BA1\u7406\u4E16\u754C\u4E66\u6CE8\u5165\u9884\u8BBE\u3002\u5DE5\u5177\u914D\u7F6E\u4E2D\u901A\u8FC7\u9884\u8BBE ID \u5F15\u7528\uFF0C\u53EF\u7ED1\u5B9A\u89D2\u8272\u5361\uFF08\u52A8\u6001\uFF09\u6216\u56FA\u5B9A\u5217\u8868\u3002",store:Ot,renderEditor:Am,renderListItemMeta:Cm}),km=ud});var ba={};oe(ba,{MESSAGE_MACROS:()=>Nd,addTagRule:()=>Ed,createRuleTemplate:()=>vd,default:()=>Rm,deleteRulePreset:()=>Pd,deleteRuleTemplate:()=>Td,deleteTagRule:()=>Cd,escapeRegex:()=>Qr,exportRulesConfig:()=>$d,extractComplexTag:()=>gd,extractCurlyBraceTag:()=>ma,extractHtmlFormatTag:()=>md,extractSimpleTag:()=>ga,extractTagContent:()=>or,generateTagSuggestions:()=>bd,getAllRulePresets:()=>Md,getAllRuleTemplates:()=>xd,getContentBlacklist:()=>Ms,getRuleTemplate:()=>wd,getTagRules:()=>Is,importRulesConfig:()=>Od,isValidTagName:()=>fa,loadRulePreset:()=>Rd,saveRulesAsPreset:()=>Id,scanTextForTags:()=>hd,setContentBlacklist:()=>kd,setTagRules:()=>_d,shouldSkipContent:()=>ya,testRegex:()=>Ld,updateRuleTemplate:()=>Sd,updateTagRule:()=>Ad});function Im(){return{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"},ruleTemplates:[...pa],tagRules:[],contentBlacklist:[],tagRulePresets:{}}}function dt(){return M.get(fd,Im())}function Ft(t){M.set(fd,t)}function En(){let t=dt();return Xe=t.ruleTemplates||[...pa],ke=t.tagRules||[],nt=t.contentBlacklist||[],{ruleTemplates:Xe,tagRules:ke,contentBlacklist:nt}}function Qr(t){return typeof t!="string"?"":t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function ya(t,e){if(!e||e.length===0||!t||typeof t!="string")return!1;let r=t.toLowerCase();return e.some(s=>{let o=s.trim().toLowerCase();return o&&r.includes(o)})}function fa(t){return!t||typeof t!="string"?!1:/^[a-zA-Z][a-zA-Z0-9_-]*$/.test(t)&&!Mm.includes(t.toLowerCase())}function ga(t,e){if(!t||!e)return[];let r=[],s=Qr(e),o=new RegExp(`<${s}>([\\s\\S]*?)<\\/${s}>`,"gi");[...t.matchAll(o)].forEach(l=>{l[1]&&r.push(l[1].trim())});let i=(t.match(new RegExp(`<${s}>`,"gi"))||[]).length,a=(t.match(new RegExp(`<\\/${s}>`,"gi"))||[]).length;return i>a&&sr.warn(`\u53D1\u73B0 ${i-a} \u4E2A\u672A\u95ED\u5408\u7684 <${e}> \u6807\u7B7E`),r}function ma(t,e){if(!t||!e)return[];let r=[],s=Qr(e),o=new RegExp(`\\{${s}\\|`,"gi"),n;for(;(n=o.exec(t))!==null;){let i=n.index,a=i+n[0].length,l=1,d=a;for(;d<t.length&&l>0;)t[d]==="{"?l++:t[d]==="}"&&l--,d++;if(l===0){let c=t.substring(a,d-1);c.trim()&&r.push(c.trim())}o.lastIndex=i+1}return r}function gd(t,e){if(!t||!e)return[];let r=e.split(",");if(r.length!==2)return sr.error(`\u590D\u6742\u6807\u7B7E\u914D\u7F6E\u683C\u5F0F\u9519\u8BEF\uFF0C\u5E94\u8BE5\u5305\u542B\u4E00\u4E2A\u9017\u53F7: ${e}`),[];let s=r[0].trim(),o=r[1].trim(),n=o.match(/<\/(\w+)>/);if(!n)return sr.error(`\u65E0\u6CD5\u89E3\u6790\u7ED3\u675F\u6807\u7B7E: ${o}`),[];let i=n[1],a=new RegExp(`${Qr(s)}([\\s\\S]*?)<\\/${i}>`,"gi"),l=[];return[...t.matchAll(a)].forEach(c=>{c[1]&&l.push(c[1].trim())}),l}function md(t,e){if(!t||!e)return[];let r=e.match(/<(\w+)(?:\s[^>]*)?>/);if(!r)return sr.error(`\u65E0\u6CD5\u89E3\u6790HTML\u683C\u5F0F\u6807\u7B7E: ${e}`),[];let s=r[1],o=[],n=new RegExp(`<${s}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${s}>`,"gi");[...t.matchAll(n)].forEach(d=>{d[1]&&o.push(d[1].trim())});let a=(t.match(new RegExp(`<${s}(?:\\s[^>]*)?>`,"gi"))||[]).length,l=(t.match(new RegExp(`<\\/${s}>`,"gi"))||[]).length;return a>l&&sr.warn(`\u53D1\u73B0 ${a-l} \u4E2A\u672A\u95ED\u5408\u7684 <${s}> \u6807\u7B7E`),o}function or(t,e,r=[]){if(!t)return"";if(!e||e.length===0)return t;let s=e.filter(c=>c.type==="exclude"&&c.enabled),o=e.filter(c=>(c.type==="include"||c.type==="regex_include")&&c.enabled),n=e.filter(c=>c.type==="regex_exclude"&&c.enabled),i=t;for(let c of s)try{let u=new RegExp(`<${Qr(c.value)}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${Qr(c.value)}>`,"gi");i=i.replace(u,"")}catch(u){sr.error("Error applying block exclusion rule:",{rule:c,error:u})}let a=[];if(o.length>0)for(let c of o){let u=[];try{if(c.type==="include")u.push(...ga(i,c.value)),u.push(...ma(i,c.value));else if(c.type==="regex_include"){let p=new RegExp(c.value,"gi");[...i.matchAll(p)].forEach(f=>{f[1]&&u.push(f[1])})}}catch(p){sr.error("Error applying inclusion rule:",{rule:c,error:p})}u.forEach(p=>a.push(p.trim()))}else a.push(i);let l=[];for(let c of a){for(let u of n)try{let p=new RegExp(u.value,"gi");c=c.replace(p,"")}catch(p){sr.error("Error applying cleanup rule:",{rule:u,error:p})}ya(c,r)||l.push(c)}return l.join(`

`).replace(/\n\s*\n\s*\n/g,`

`).replace(/^\s+|\s+$/g,"").trim()}async function hd(t,e={}){let r=performance.now(),{chunkSize:s=5e4,maxTags:o=100,timeoutMs:n=5e3}=e,i=new Set,a=/<(?:\/|)([a-zA-Z0-9_-]+)(?:[^>]*)>|\{([a-zA-Z0-9_-]+)(?:\||})/g,l=0,d=0;for(let u=0;u<t.length;u+=s){let p=t.slice(u,Math.min(u+s,t.length));if(d++,l+=p.length,performance.now()-r>n){sr.warn(`Tag scanning timed out after ${n}ms`);break}let y;for(;(y=a.exec(p))!==null&&i.size<o;){let f=(y[1]||y[2]).toLowerCase();fa(f)&&i.add(f)}if(i.size>=o)break;d%5===0&&await new Promise(f=>setTimeout(f,0))}let c=performance.now();return{tags:Array.from(i).sort(),stats:{processingTimeMs:Math.round(c-r),processedChars:l,totalChars:t.length,chunkCount:d,tagsFound:i.size}}}function bd(t,e=25){let r=t.tags.slice(0,e);return{suggestions:r,stats:{totalFound:t.stats.tagsFound,finalCount:r.length}}}function xd(){return Xe.length===0&&En(),Xe}function wd(t){return Xe.find(e=>e.id===t)}function vd(t){let e={id:`rule-${Date.now()}`,name:t.name||"\u65B0\u89C4\u5219",description:t.description||"",type:t.type||"include",value:t.value||"",enabled:t.enabled!==!1,createdAt:new Date().toISOString()};return Xe.push(e),ha(),{success:!0,template:e,message:"\u89C4\u5219\u6A21\u677F\u521B\u5EFA\u6210\u529F"}}function Sd(t,e){let r=Xe.findIndex(s=>s.id===t);return r===-1?{success:!1,message:"\u89C4\u5219\u6A21\u677F\u4E0D\u5B58\u5728"}:(Xe[r]={...Xe[r],...e,updatedAt:new Date().toISOString()},ha(),{success:!0,template:Xe[r],message:"\u89C4\u5219\u6A21\u677F\u66F4\u65B0\u6210\u529F"})}function Td(t){let e=Xe.findIndex(r=>r.id===t);return e===-1?{success:!1,message:"\u89C4\u5219\u6A21\u677F\u4E0D\u5B58\u5728"}:(Xe.splice(e,1),ha(),{success:!0,message:"\u89C4\u5219\u6A21\u677F\u5DF2\u5220\u9664"})}function ha(){let t=dt();t.ruleTemplates=Xe,Ft(t)}function Is(){return ke||En(),ke}function _d(t){ke=t||[];let e=dt();e.tagRules=ke,Ft(e)}function Ed(t){let e={id:`tag-${Date.now()}`,type:t.type||"include",value:t.value||"",enabled:t.enabled!==!1};ke.push(e);let r=dt();return r.tagRules=ke,Ft(r),{success:!0,rule:e,message:"\u89C4\u5219\u6DFB\u52A0\u6210\u529F"}}function Ad(t,e){if(t<0||t>=ke.length)return{success:!1,message:"\u89C4\u5219\u7D22\u5F15\u65E0\u6548"};ke[t]={...ke[t],...e};let r=dt();return r.tagRules=ke,Ft(r),{success:!0,rule:ke[t],message:"\u89C4\u5219\u66F4\u65B0\u6210\u529F"}}function Cd(t){if(t<0||t>=ke.length)return{success:!1,message:"\u89C4\u5219\u7D22\u5F15\u65E0\u6548"};ke.splice(t,1);let e=dt();return e.tagRules=ke,Ft(e),{success:!0,message:"\u89C4\u5219\u5DF2\u5220\u9664"}}function Ms(){return nt||En(),nt}function kd(t){nt=t||[];let e=dt();e.contentBlacklist=nt,Ft(e)}function Id(t,e=""){if(!t||!t.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let r=dt();r.tagRulePresets||(r.tagRulePresets={});let s=`preset-${Date.now()}`;return r.tagRulePresets[s]={id:s,name:t.trim(),description:e.trim(),rules:JSON.parse(JSON.stringify(ke)),blacklist:JSON.parse(JSON.stringify(nt)),createdAt:new Date().toISOString()},Ft(r),{success:!0,preset:r.tagRulePresets[s],message:"\u9884\u8BBE\u4FDD\u5B58\u6210\u529F"}}function Md(){let e=dt().tagRulePresets||{};return Object.values(e)}function Rd(t){let e=dt(),s=(e.tagRulePresets||{})[t];return s?(ke=JSON.parse(JSON.stringify(s.rules||[])),nt=JSON.parse(JSON.stringify(s.blacklist||[])),e.tagRules=ke,e.contentBlacklist=nt,Ft(e),{success:!0,preset:s,message:"\u9884\u8BBE\u52A0\u8F7D\u6210\u529F"}):{success:!1,message:"\u9884\u8BBE\u4E0D\u5B58\u5728"}}function Pd(t){let e=dt(),r=e.tagRulePresets||{};return r[t]?(delete r[t],e.tagRulePresets=r,Ft(e),{success:!0,message:"\u9884\u8BBE\u5DF2\u5220\u9664"}):{success:!1,message:"\u9884\u8BBE\u4E0D\u5B58\u5728"}}function $d(){return JSON.stringify({tagRules:ke,contentBlacklist:nt,ruleTemplates:Xe,tagRulePresets:dt().tagRulePresets||{}},null,2)}function Od(t,e={overwrite:!0}){try{let r=JSON.parse(t);if(e.overwrite)ke=r.tagRules||[],nt=r.contentBlacklist||[],Xe=r.ruleTemplates||pa;else if(r.tagRules&&ke.push(...r.tagRules),r.contentBlacklist){let o=new Set(nt.map(n=>n.toLowerCase()));r.contentBlacklist.forEach(n=>{o.has(n.toLowerCase())||nt.push(n)})}let s=dt();return s.tagRules=ke,s.contentBlacklist=nt,s.ruleTemplates=Xe,r.tagRulePresets&&(s.tagRulePresets={...s.tagRulePresets||{},...r.tagRulePresets}),Ft(s),{success:!0,message:"\u914D\u7F6E\u5BFC\u5165\u6210\u529F"}}catch(r){return{success:!1,message:`\u5BFC\u5165\u5931\u8D25: ${r.message}`}}}function Ld(t,e,r="g",s=0){try{if(!t||typeof t!="string")return{success:!1,error:"\u6B63\u5219\u8868\u8FBE\u5F0F\u4E0D\u80FD\u4E3A\u7A7A",matches:[]};let o=new RegExp(t,r),n=[];if(r.includes("g")){let i;for(;(i=o.exec(e))!==null;)i.length>1?n.push({fullMatch:i[0],groups:i.slice(1),index:i.index,extracted:i[s]||i[1]||i[0]}):n.push({fullMatch:i[0],groups:[],index:i.index,extracted:i[0]})}else{let i=o.exec(e);i&&n.push({fullMatch:i[0],groups:i.length>1?i.slice(1):[],index:i.index,extracted:i.length>1?i[s]||i[1]:i[0]})}return{success:!0,matches:n,count:n.length,extracted:n.map(i=>i.extracted)}}catch(o){return{success:!1,error:o.message,matches:[]}}}var sr,fd,Mm,pa,Xe,ke,nt,Nd,Rm,Rs=L(()=>{Le();q();sr=C.createScope("RegexExtractor"),fd="settings";Mm=["font","span","div","p","br","hr","img","a","b","i","u","s","em","strong","small","big","sub","sup","h1","h2","h3","h4","h5","h6","table","tr","td","th","tbody","thead","tfoot","ul","ol","li","form","input","button","select","option","textarea","label","script","style","meta","link","title","head","body","html"],pa=[{id:"exclude-thinking",name:"\u6392\u9664\u601D\u8003\u6807\u7B7E",description:"\u79FB\u9664<thinking>\u6807\u7B7E\u5757",type:"exclude",value:"thinking",enabled:!0},{id:"include-content",name:"\u63D0\u53D6\u5185\u5BB9\u6807\u7B7E",description:"\u63D0\u53D6<content>\u6807\u7B7E\u5185\u5BB9",type:"include",value:"content",enabled:!0},{id:"regex-exclude-cot",name:"\u6392\u9664\u5C0FCoT",description:"\u79FB\u9664HTML\u6CE8\u91CA",type:"regex_exclude",value:"<!--[\\s\\S]*?-->",enabled:!1},{id:"regex-include-details",name:"\u63D0\u53D6details\u6807\u7B7E",description:"\u63D0\u53D6<details>\u6807\u7B7E\u5185\u5BB9",type:"regex_include",value:"<details[^>]*>([\\s\\S]*?)</details>",enabled:!1}],Xe=[],ke=[],nt=[];Nd={lastMessage:{macro:"{{lastMessage}}",description:"\u6700\u540E\u4E00\u6761\u6D88\u606F"},lastCharMessage:{macro:"{{lastCharMessage}}",description:"\u6700\u540E\u4E00\u6761\u89D2\u8272\u6D88\u606F"},lastUserMessage:{macro:"{{lastUserMessage}}",description:"\u6700\u540E\u4E00\u6761\u7528\u6237\u6D88\u606F"},char:{macro:"{{char}}",description:"\u89D2\u8272\u540D\u79F0"},user:{macro:"{{user}}",description:"\u7528\u6237\u540D\u79F0"},input:{macro:"{{input}}",description:"\u5F53\u524D\u8F93\u5165\u6846\u5185\u5BB9"}};En();Rm={extractTagContent:or,extractSimpleTag:ga,extractCurlyBraceTag:ma,extractComplexTag:gd,extractHtmlFormatTag:md,escapeRegex:Qr,shouldSkipContent:ya,isValidTagName:fa,scanTextForTags:hd,generateTagSuggestions:bd,getAllRuleTemplates:xd,getRuleTemplate:wd,createRuleTemplate:vd,updateRuleTemplate:Sd,deleteRuleTemplate:Td,getTagRules:Is,setTagRules:_d,addTagRule:Ed,updateTagRule:Ad,deleteTagRule:Cd,getContentBlacklist:Ms,setContentBlacklist:kd,saveRulesAsPreset:Id,getAllRulePresets:Md,loadRulePreset:Rd,deleteRulePreset:Pd,exportRulesConfig:$d,importRulesConfig:Od,testRegex:Ld,MESSAGE_MACROS:Nd}});var Fd={};oe(Fd,{createDefaultToolDefinition:()=>Zr,default:()=>Lm,deleteTool:()=>$s,deleteToolPreset:()=>Ud,exportTools:()=>Os,getAllTools:()=>Ht,getCurrentToolPreset:()=>jd,getTool:()=>Gt,getToolPresets:()=>Cn,importTools:()=>Ls,normalizeToolDefinitionToRuntimeConfig:()=>_o,resetTools:()=>Ns,saveTool:()=>Ps,saveToolPreset:()=>Kd,setCurrentToolPreset:()=>Wd,setToolEnabled:()=>kn});function Pm(t={}){return!t||typeof t!="object"?{}:Object.fromEntries(Object.entries(t).map(([e,r])=>[e,Zr({...r||{},id:e})]))}function To(t){return Array.isArray(t)?t.map(e=>String(e||"").trim()).filter(Boolean):[]}function xa(t,e){let r=parseInt(t,10);return Number.isFinite(r)&&r>0?r:e}function Dd(t,e){let r=parseInt(t,10);return Number.isFinite(r)&&r>=0?r:e}function Bd(t={}){return{settleMs:Dd(t?.settleMs,1200),cooldownMs:Dd(t?.cooldownMs,5e3)}}function zd(t={}){return{enabled:t?.enabled===!0,selected:To(t?.selected),presetId:typeof t?.presetId=="string"?t.presetId:""}}function $m(t=[]){let e=Array.isArray(t)?t.map(r=>({role:String(r?.role||"user").trim().toUpperCase(),content:String(r?.content||"").trim()})).filter(r=>r.content):[];return e.length===0?"":e.length===1?e[0].content:e.map(r=>`\u3010${r.role||"USER"}\u3011
${r.content}`).join(`

`)}function Om(t,e={}){let r=typeof e?.promptTemplate=="string"?e.promptTemplate.trim():"";if(r)return r;let s=$m(e?.config?.messages||[]);return s||`\u8BF7\u57FA\u4E8E\u6700\u8FD1\u7684 AI \u56DE\u590D\u4E3A\u5DE5\u5177\u201C${e?.name||t}\u201D\u751F\u6210\u7ED3\u6784\u5316\u8F93\u51FA\u3002`}function Zr(t={}){let e=new Date().toISOString(),r=t?.config||{};return{...Tt,...t,id:t?.id||Tt.id,icon:t?.icon||Tt.icon,order:Number.isFinite(t?.order)?t.order:Tt.order,promptTemplate:typeof t?.promptTemplate=="string"?t.promptTemplate:Tt.promptTemplate,extractTags:To(t?.extractTags),config:{execution:{...Tt.config.execution,...r.execution||{},timeout:xa(r?.execution?.timeout,Tt.config.execution.timeout),retries:Math.max(0,parseInt(r?.execution?.retries,10)||Tt.config.execution.retries)},api:{...Tt.config.api,...r.api||{}},messages:Array.isArray(r?.messages)?r.messages:[],context:{...Tt.config.context,...r.context||{},depth:xa(r?.context?.depth,Tt.config.context.depth),includeTags:To(r?.context?.includeTags),excludeTags:To(r?.context?.excludeTags)},automation:Bd(r?.automation),worldbooks:zd(r?.worldbooks)},enabled:t?.enabled!==!1,metadata:{...Tt.metadata,...t?.metadata||{},createdAt:t?.metadata?.createdAt||e,updatedAt:t?.metadata?.updatedAt||e}}}function _o(t,e={},r={}){let s=Zr({...e,id:t||e?.id||""}),o=To(s?.extractTags?.length?s.extractTags:s?.config?.context?.includeTags),n=String(e?.output?.apiPreset||s?.config?.api?.preset||"").trim(),i=Om(t,s),a=typeof e?.output?.mode=="string"&&e.output.mode.trim()?e.output.mode.trim():r.defaultOutputMode||"follow_ai";return{id:s.id||t,name:s.name||t,icon:s.icon||"fa-screwdriver-wrench",description:s.description||"",enabled:s.enabled!==!1,order:Number.isFinite(s.order)?s.order:100,bypass:{enabled:s?.config?.api?.useBypass===!0&&!!s?.config?.api?.bypassPreset,presetId:s?.config?.api?.bypassPreset||""},output:{mode:a,apiPreset:n,overwrite:!0,enabled:!0},automation:Bd(s?.config?.automation),worldbooks:zd(s?.config?.worldbooks),extraction:{enabled:!0,maxMessages:xa(s?.config?.context?.depth,5),selectors:o,regexPresetId:typeof s?.config?.extraction?.regexPresetId=="string"?s.config.extraction.regexPresetId:"",writebackTag:typeof s?.config?.extraction?.writebackTag=="string"?s.config.extraction.writebackTag:""},promptTemplate:i,runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},apiPreset:n,extractTags:o,isCustom:!0,category:s.category||"utility",metadata:{...s.metadata||{}}}}function Ht(){let t=ge.get(Pe.TOOLS),e=Pm(t);return t&&JSON.stringify(t)!==JSON.stringify(e)&&ge.set(Pe.TOOLS,e),{...An,...e}}function Gt(t){return Ht()[t]||null}function Ps(t,e){if(!t||!e)return!1;let r=ge.get(Pe.TOOLS)||{},s=!r[t]&&!An[t],o=Zr({...r[t]||{},...e,id:t,metadata:{...r[t]?.metadata||{},...e.metadata||{},createdAt:r[t]?.metadata?.createdAt||e?.metadata?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString()}});return r[t]=o,ge.set(Pe.TOOLS,r),z.emit(s?D.TOOL_REGISTERED:D.TOOL_UPDATED,{toolId:t,tool:o}),!0}function $s(t){let e=ge.get(Pe.TOOLS)||{};return!e[t]&&!An[t]||An[t]?!1:(delete e[t],ge.set(Pe.TOOLS,e),z.emit(D.TOOL_UNREGISTERED,{toolId:t}),!0)}function Cn(){return ge.get(Pe.PRESETS)||{}}function Kd(t,e){if(!t||!e)return!1;let r=Cn(),s=!r[t];return r[t]={...e,name:t,updatedAt:new Date().toISOString()},ge.set(Pe.PRESETS,r),z.emit(s?D.PRESET_CREATED:D.PRESET_UPDATED,{type:"tool",presetName:t,preset:r[t]}),!0}function Ud(t){let e=Cn();return e[t]?(delete e[t],ge.set(Pe.PRESETS,e),z.emit(D.PRESET_DELETED,{type:"tool",presetName:t}),!0):!1}function jd(){return ge.get(Pe.CURRENT_PRESET)||""}function Wd(t){return ge.set(Pe.CURRENT_PRESET,t||""),z.emit(D.PRESET_ACTIVATED,{type:"tool",presetName:t}),!0}function kn(t,e){let r=Gt(t);if(!r)return!1;let s=ge.get(Pe.TOOLS)||{};return s[t]=Zr({...r,id:t,enabled:e,metadata:{...r?.metadata||{},createdAt:r?.metadata?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString()}}),ge.set(Pe.TOOLS,s),z.emit(e?D.TOOL_ENABLED:D.TOOL_DISABLED,{toolId:t,enabled:e}),!0}function Os(){let t=ge.get(Pe.TOOLS)||{},e=ge.get(Pe.PRESETS)||{};return JSON.stringify({version:"1.0.0",exportedAt:new Date().toISOString(),tools:t,presets:e},null,2)}function Ls(t,e=!1){try{let r=typeof e=="object"?!!e?.overwrite:!!e,s=JSON.parse(t);if(!s||typeof s!="object")return{success:!1,toolsImported:0,presetsImported:0,message:"\u65E0\u6548\u7684JSON\u683C\u5F0F"};let o=r?{}:ge.get(Pe.TOOLS)||{},n=r?{}:ge.get(Pe.PRESETS)||{},i=0,a=0;if(s.tools&&typeof s.tools=="object"){for(let[l,d]of Object.entries(s.tools))!d||typeof d!="object"||(o[l]=Zr({...d,id:l}),i+=1);ge.set(Pe.TOOLS,o)}if(s.presets&&typeof s.presets=="object"){for(let[l,d]of Object.entries(s.presets))!d||typeof d!="object"||(n[l]={...d,name:l,updatedAt:new Date().toISOString()},a+=1);ge.set(Pe.PRESETS,n)}return{success:!0,toolsImported:i,presetsImported:a,message:`\u6210\u529F\u5BFC\u5165 ${i} \u4E2A\u5DE5\u5177\u548C ${a} \u4E2A\u9884\u8BBE`}}catch(r){return{success:!1,toolsImported:0,presetsImported:0,message:`\u5BFC\u5165\u5931\u8D25: ${r.message}`}}}function Ns(){ge.remove(Pe.TOOLS),ge.remove(Pe.PRESETS),ge.remove(Pe.CURRENT_PRESET)}var Tt,An,Pe,Lm,Eo=L(()=>{Le();Ke();Tt={id:"",name:"",description:"",icon:"fa-screwdriver-wrench",order:100,category:"utility",promptTemplate:"",extractTags:[],config:{execution:{timeout:6e4,retries:3},api:{preset:"",useBypass:!1,bypassPreset:""},messages:[],context:{depth:3,includeTags:[],excludeTags:[]},automation:{settleMs:1200,cooldownMs:5e3},worldbooks:{enabled:!1,selected:[]}},enabled:!0,metadata:{createdAt:null,updatedAt:null,author:"",version:"1.0.0"}},An={},Pe={TOOLS:"tools",PRESETS:"tool_presets",CURRENT_PRESET:"current_tool_preset"};Lm={getAllTools:Ht,getTool:Gt,saveTool:Ps,deleteTool:$s,setToolEnabled:kn,exportTools:Os,importTools:Ls,resetTools:Ns,getToolPresets:Cn,saveToolPreset:Kd,deleteToolPreset:Ud,getCurrentToolPreset:jd,setCurrentToolPreset:Wd,createDefaultToolDefinition:Zr,normalizeToolDefinitionToRuntimeConfig:_o}});var Aa={};oe(Aa,{TOOL_CATEGORIES:()=>Hd,TOOL_REGISTRY:()=>Ds,appendToolRuntimeHistory:()=>su,clearToolApiPreset:()=>eu,default:()=>Wm,ensureToolRuntimeConfig:()=>Bs,getAllDefaultToolConfigs:()=>nu,getAllToolApiBindings:()=>tu,getAllToolFullConfigs:()=>ko,getEnabledTools:()=>iu,getToolApiPreset:()=>_a,getToolBaseConfig:()=>In,getToolConfig:()=>Co,getToolFullConfig:()=>se,getToolList:()=>Jd,getToolSubTabs:()=>Xd,getToolWindowState:()=>lu,hasTool:()=>Ta,onPresetDeleted:()=>ru,patchToolRuntime:()=>Ir,registerTool:()=>qd,resetToolConfig:()=>ou,resetToolRegistry:()=>Qd,saveToolConfig:()=>ve,saveToolWindowState:()=>au,setToolApiPreset:()=>Zd,setToolApiPresetConfig:()=>Km,setToolBypassConfig:()=>Um,setToolOutputMode:()=>zm,setToolPromptTemplate:()=>jm,unregisterTool:()=>Vd,updateToolRuntime:()=>Ea});function es(t={}){let e=Array.isArray(t?.recentWritebackHistory)?t.recentWritebackHistory.filter(Boolean):[];return{lastRunAt:Number.isFinite(t?.lastRunAt)?t.lastRunAt:0,lastStatus:typeof t?.lastStatus=="string"?t.lastStatus:"idle",lastError:typeof t?.lastError=="string"?t.lastError:"",lastDurationMs:Number.isFinite(t?.lastDurationMs)?t.lastDurationMs:0,successCount:Number.isFinite(t?.successCount)?t.successCount:0,errorCount:Number.isFinite(t?.errorCount)?t.errorCount:0,lastMessageKey:typeof t?.lastMessageKey=="string"?t.lastMessageKey:"",lastExecutionKey:typeof t?.lastExecutionKey=="string"?t.lastExecutionKey:"",lastExecutionPath:typeof t?.lastExecutionPath=="string"?t.lastExecutionPath:"",lastWritebackStatus:typeof t?.lastWritebackStatus=="string"?t.lastWritebackStatus:"",lastFailureStage:typeof t?.lastFailureStage=="string"?t.lastFailureStage:"",lastSlotBindingKey:typeof t?.lastSlotBindingKey=="string"?t.lastSlotBindingKey:"",lastSlotRevisionKey:typeof t?.lastSlotRevisionKey=="string"?t.lastSlotRevisionKey:"",lastSlotTransactionId:typeof t?.lastSlotTransactionId=="string"?t.lastSlotTransactionId:"",lastSourceMessageId:typeof t?.lastSourceMessageId=="string"?t.lastSourceMessageId:"",lastSourceSwipeId:typeof t?.lastSourceSwipeId=="string"?t.lastSourceSwipeId:"",lastContentCommitted:t?.lastContentCommitted===!0,lastHostCommitApplied:t?.lastHostCommitApplied===!0,lastRefreshRequested:t?.lastRefreshRequested===!0,lastRefreshConfirmed:t?.lastRefreshConfirmed===!0,lastPreferredCommitMethod:typeof t?.lastPreferredCommitMethod=="string"?t.lastPreferredCommitMethod:"",lastAppliedCommitMethod:typeof t?.lastAppliedCommitMethod=="string"?t.lastAppliedCommitMethod:"",lastRefreshMethodCount:Number.isFinite(t?.lastRefreshMethodCount)?t.lastRefreshMethodCount:0,lastRefreshMethods:Array.isArray(t?.lastRefreshMethods)?t.lastRefreshMethods.filter(Boolean):[],lastRefreshConfirmChecks:Number.isFinite(t?.lastRefreshConfirmChecks)?t.lastRefreshConfirmChecks:0,lastRefreshConfirmedBy:typeof t?.lastRefreshConfirmedBy=="string"?t.lastRefreshConfirmedBy:"",lastTraceId:typeof t?.lastTraceId=="string"?t.lastTraceId:"",lastAutoRunAt:Number.isFinite(t?.lastAutoRunAt)?t.lastAutoRunAt:0,lastAutoStatus:typeof t?.lastAutoStatus=="string"?t.lastAutoStatus:"idle",lastAutoMessageId:typeof t?.lastAutoMessageId=="string"?t.lastAutoMessageId:"",lastAutoSwipeId:typeof t?.lastAutoSwipeId=="string"?t.lastAutoSwipeId:"",lastAutoRevisionKey:typeof t?.lastAutoRevisionKey=="string"?t.lastAutoRevisionKey:"",lastAutoWritebackStatus:typeof t?.lastAutoWritebackStatus=="string"?t.lastAutoWritebackStatus:"",lastAutoRefreshConfirmed:t?.lastAutoRefreshConfirmed===!0,lastAutoSkipReason:typeof t?.lastAutoSkipReason=="string"?t.lastAutoSkipReason:"",recentWritebackHistory:e}}function Nm(t,e=10){let r=Number.isFinite(e)?Math.max(1,Math.min(50,Math.floor(e))):10;return Array.isArray(t)?t.length<=r?t:t.slice(t.length-r):[]}function Gd(){let t=Ht()||{};return Object.entries(t).filter(([e])=>!Ao[e]).map(([e,r])=>[e,r||{}])}function wa(t={}){return t?.toolKind==="script"?"script":t?.toolKind==="ai"?"ai":t?.output?.mode==="local_transform"||t?.processor?.type?"script":"ai"}function Yd(){let t=Array.isArray(Ds.tools?.subTabs)?Ds.tools.subTabs.map((r,s)=>({...r,order:Number.isFinite(r?.order)?r.order:s,toolKind:wa(r),toolGroupLabel:wa(r)==="script"?"\u811A\u672C\u5DE5\u5177":"AI \u5DE5\u5177"})):[],e=Gd().map(([r,s],o)=>{let n=_o(r,s),i=wa(n);return{id:r,name:n.name||r,icon:n.icon||"fa-screwdriver-wrench",component:"GenericToolConfigPanel",order:Number.isFinite(n.order)?n.order:100+o,isCustom:!0,description:n.description||"",toolKind:i,toolGroupLabel:i==="script"?"\u811A\u672C\u5DE5\u5177":"AI \u5DE5\u5177"}});return[...t,...e].sort((r,s)=>(r.order??0)-(s.order??0))}function Dm(t,e={}){let r=_o(t,e,{defaultOutputMode:"follow_ai"});return{...r,runtime:es(r.runtime)}}function Sa(t){let e=Ao[t];if(e)return{...e,output:{...e.output||{}},bypass:{...e.bypass||{}},worldbooks:{...e.worldbooks||{},selected:Array.isArray(e?.worldbooks?.selected)?[...e.worldbooks.selected]:[]},extraction:{...e.extraction||{}},processor:{...e.processor||{},options:{...e?.processor?.options||{}}},runtime:es(e.runtime),extractTags:Array.isArray(e.extractTags)?[...e.extractTags]:[]};let s=(Ht()||{})[t]||null;return s?Dm(t,s):Co(t)}function In(t){let e=Sa(t);return e?{...e,output:{...e.output||{}},automation:{...e.automation||{}},bypass:{...e.bypass||{}},worldbooks:{...e.worldbooks||{},selected:Array.isArray(e?.worldbooks?.selected)?[...e.worldbooks.selected]:[]},extraction:{...e.extraction||{},selectors:Array.isArray(e?.extraction?.selectors)?[...e.extraction.selectors]:[]},processor:{...e.processor||{},options:{...e?.processor?.options||{}}},runtime:{...e.runtime||{}},extractTags:Array.isArray(e.extractTags)?[...e.extractTags]:[]}:null}function Bm(t,e={},r=""){if(!t)return null;let s={...t,...e,id:t.id||e.id};s.output={...t.output||{},...e.output||{}},s.automation={settleMs:Number.isFinite(e?.automation?.settleMs)?e.automation.settleMs:Number.isFinite(t?.automation?.settleMs)?t.automation.settleMs:1200,cooldownMs:Number.isFinite(e?.automation?.cooldownMs)?e.automation.cooldownMs:Number.isFinite(t?.automation?.cooldownMs)?t.automation.cooldownMs:5e3},s.bypass={...t.bypass||{},...e.bypass||{}},s.worldbooks={...t.worldbooks||{},...e.worldbooks||{},selected:Array.isArray(e?.worldbooks?.selected)?[...e.worldbooks.selected]:Array.isArray(t?.worldbooks?.selected)?[...t.worldbooks.selected]:[]},s.runtime=es({...t.runtime||{},...e.runtime||{}}),s.extraction={...t.extraction||{},...e.extraction||{}},s.processor={...t.processor||{},...e.processor||{},options:{...t?.processor?.options||{},...e?.processor?.options||{}}};let o=e?.output?.apiPreset||e?.apiPreset||s.output?.apiPreset||s.apiPreset||r||"";return s.output={...s.output||{},apiPreset:o},s.apiPreset=o,t.isCustom?s.enabled=t.enabled!==!1:typeof e.enabled=="boolean"?s.enabled=e.enabled:s.enabled=t.enabled!==!1,s}function qd(t,e){if(!t||typeof t!="string")return rt.error("\u5DE5\u5177ID\u65E0\u6548"),!1;if(!e||typeof e!="object")return rt.error("\u5DE5\u5177\u914D\u7F6E\u65E0\u6548"),!1;let r=["name","icon","component"];for(let s of r)if(!e[s])return rt.error(` \u5DE5\u5177\u7F3A\u5C11\u5FC5\u9700\u5B57\u6BB5: ${s}`),!1;return Yt[t]={id:t,...e,order:e.order??Object.keys(Yt).length},rt.log(` \u5DE5\u5177\u5DF2\u6CE8\u518C: ${t}`),!0}function Vd(t){return Yt[t]?(delete Yt[t],rt.log(` \u5DE5\u5177\u5DF2\u6CE8\u9500: ${t}`),!0):(rt.warn(` \u5DE5\u5177\u4E0D\u5B58\u5728: ${t}`),!1)}function Jd(t=!0){let e=Object.values(Yt).map(r=>r.id==="tools"?{...r,subTabs:Yd()}:r);return t?e.sort((r,s)=>(r.order??0)-(s.order??0)):e}function Co(t){return t==="tools"&&Yt[t]?{...Yt[t],subTabs:Yd()}:Yt[t]||null}function Ta(t){return!!Yt[t]}function Xd(t){let e=Co(t);return!e||!e.hasSubTabs?[]:e.subTabs||[]}function Qd(){Yt={...Ds},rt.log("\u5DE5\u5177\u6CE8\u518C\u8868\u5DF2\u91CD\u7F6E")}function Zd(t,e){if(!Ta(t))return rt.warn(` \u5DE5\u5177\u4E0D\u5B58\u5728: ${t}`),!1;let r=M.get(_t)||{};return r[t]=e||"",M.set(_t,r),rt.log(` \u5DE5\u5177 "${t}" \u7ED1\u5B9A\u5230\u9884\u8BBE "${e||"\u5F53\u524D\u914D\u7F6E"}"`),!0}function _a(t){return(M.get(_t)||{})[t]||""}function eu(t){let e=M.get(_t)||{};delete e[t],M.set(_t,e),rt.log(` \u5DE5\u5177 "${t}" \u7684API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u6E05\u9664`)}function tu(){return M.get(_t)||{}}function ru(t){let e=M.get(_t)||{},r=!1;for(let s in e)e[s]===t&&(e[s]="",r=!0,rt.log(` \u5DE5\u5177 "${s}" \u7684API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u6E05\u9664\uFF08\u9884\u8BBE\u88AB\u5220\u9664\uFF09`));r&&M.set(_t,e)}function se(t){let e=Sa(t);if(!e)return Co(t);let s=(M.get(kr)||{})[t]||{},o=_a(t),n=Bm({...e,id:t},s,o);return typeof window<"u"&&window.YYT_PRESET_DEBUG&&typeof console<"u"&&console.log&&console.log(`[YYT-DEBUG][getToolFullConfig] ${t}`,{base_extraction:JSON.parse(JSON.stringify(e.extraction||{})),base_worldbooks:JSON.parse(JSON.stringify(e.worldbooks||{})),user_extraction:JSON.parse(JSON.stringify(s.extraction||{})),user_worldbooks:JSON.parse(JSON.stringify(s.worldbooks||{})),merged_extraction:JSON.parse(JSON.stringify(n.extraction||{})),merged_worldbooks:JSON.parse(JSON.stringify(n.worldbooks||{}))}),n}function Bs(t){if(!t)return!1;let e=Sa(t);if(!e)return!1;let r=M.get(kr)||{};if(r[t])return!0;let s={promptTemplate:e.promptTemplate||"",enabled:e.enabled!==!1,extractTags:Array.isArray(e.extractTags)?[...e.extractTags]:[],apiPreset:e.apiPreset||"",output:{...e.output||{}},automation:{...e.automation||{}},bypass:{...e.bypass||{}},worldbooks:{...e.worldbooks||{},selected:Array.isArray(e?.worldbooks?.selected)?[...e.worldbooks.selected]:[]},extraction:{...e.extraction||{},selectors:Array.isArray(e?.extraction?.selectors)?[...e.extraction.selectors]:[]},processor:{...e.processor||{},options:{...e?.processor?.options||{}}},runtime:{...e.runtime||{}}};r[t]=s,M.set(kr,r);let o=M.get(_t)||{};return o[t]=s.output?.apiPreset||s.apiPreset||"",M.set(_t,o),z.emit(D.TOOL_UPDATED,{toolId:t,config:s}),!0}function ve(t,e,r={}){if(!t||!se(t))return rt.warn("\u5DE5\u5177\u4E0D\u5B58\u5728:",t),!1;let{emitEvent:s=!0}=r,o=M.get(kr)||{},n=M.get(_t)||{},i=e?.output?.apiPreset??e?.apiPreset??"",a=["promptTemplate","enabled","extractTags","apiPreset","output","automation","bypass","worldbooks","extraction","processor","runtime"];return o[t]={},a.forEach(l=>{if(e[l]!==void 0){if(l==="output"&&e.output){o[t][l]={...e.output,apiPreset:i};return}if(l==="apiPreset"){o[t][l]=i;return}o[t][l]=e[l]}}),o[t].apiPreset===void 0&&(o[t].apiPreset=i),!o[t].output&&e.output!==void 0&&(o[t].output={...e.output||{},apiPreset:i}),M.set(kr,o),n[t]=i,M.set(_t,n),typeof window<"u"&&window.YYT_PRESET_DEBUG&&typeof console<"u"&&console.log&&console.log(`[YYT-DEBUG][saveToolConfig] ${t}`,{input_extraction:JSON.parse(JSON.stringify(e.extraction||{})),input_worldbooks:JSON.parse(JSON.stringify(e.worldbooks||{})),saved_extraction:JSON.parse(JSON.stringify(o[t].extraction||{})),saved_worldbooks:JSON.parse(JSON.stringify(o[t].worldbooks||{})),verify_storage:JSON.parse(JSON.stringify((M.get(kr)||{})[t]?.extraction||{}))}),s&&z.emit(D.TOOL_UPDATED,{toolId:t,config:o[t]}),rt.log(` \u5DE5\u5177\u914D\u7F6E\u5DF2\u4FDD\u5B58: ${t}`),!0}function zm(t,e){let r=se(t);return r?ve(t,{...r,output:{...r.output,mode:e}}):!1}function Km(t,e){let r=se(t);return r?ve(t,{...r,apiPreset:e,output:{...r.output,apiPreset:e}}):!1}function Um(t,e){let r=se(t);return r?ve(t,{...r,bypass:{...r.bypass,...e}}):!1}function jm(t,e){let r=se(t);return r?ve(t,{...r,promptTemplate:e}):!1}function Ir(t,e,r={}){let s=se(t);if(!s)return!1;let{touchLastRunAt:o=!1,emitEvent:n=!1,emitRuntimeEvent:i=!0}=r,a=es({...s.runtime||{},...e||{}});o&&(a.lastRunAt=Date.now());let l=ve(t,{...s,runtime:a},{emitEvent:n});return l&&i&&z.emit(D.TOOL_RUNTIME_UPDATED,{toolId:t,runtime:a,previousRuntime:es(s.runtime||{})}),l}function su(t,e,r={},s={}){let o=se(t);if(!o)return!1;let{limit:n=10,emitEvent:i=!1,emitRuntimeEvent:a=!0}=s,l=es(o.runtime||{}),d=es(o.runtime||{}),c="recentWritebackHistory",u={id:r?.id||`hist_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,at:r?.at||Date.now(),...r};l[c]=Nm([...Array.isArray(l[c])?l[c]:[],u],n),u?.traceId&&(l.lastTraceId=u.traceId);let p=ve(t,{...o,runtime:l},{emitEvent:i});return p&&a&&z.emit(D.TOOL_RUNTIME_UPDATED,{toolId:t,runtime:l,previousRuntime:d,historyType:e,historyEntry:u}),p}function Ea(t,e,r={}){let{touchLastRunAt:s=!0,emitEvent:o=!1,emitRuntimeEvent:n=!0}=r;return Ir(t,e,{touchLastRunAt:s,emitEvent:o,emitRuntimeEvent:n})}function ou(t){if(!t||!Ao[t])return rt.warn("\u5DE5\u5177\u4E0D\u5B58\u5728:",t),!1;let e=M.get(kr)||{};return delete e[t],M.set(kr,e),z.emit(D.TOOL_UPDATED,{toolId:t,config:null}),rt.log(` \u5DE5\u5177\u914D\u7F6E\u5DF2\u91CD\u7F6E: ${t}`),!0}function nu(){return{...Ao}}function ko(){let t=new Set([...Object.keys(Ao),...Gd().map(([e])=>e)]);return Array.from(t).map(e=>se(e)).filter(Boolean)}function iu(){return ko().filter(t=>t&&t.enabled)}function au(t,e){let r=M.get(va)||{};r[t]={...e,updatedAt:Date.now()},M.set(va,r)}function lu(t){return(M.get(va)||{})[t]||null}var rt,kr,_t,va,Ao,Ds,Hd,Yt,Wm,qt=L(()=>{Le();Ke();q();Eo();rt=C.createScope("ToolRegistry"),kr="tool_configs",_t="tool_api_bindings",va="tool_window_states";Ao={summaryTool:{id:"summaryTool",name:"\u6458\u8981\u5DE5\u5177",icon:"fa-file-lines",description:"\u751F\u6210\u5267\u60C5\u6458\u8981\u5757",enabled:!0,order:3,bypass:{enabled:!1,presetId:""},output:{mode:"follow_ai",apiPreset:"",overwrite:!0,enabled:!0},automation:{settleMs:1200,cooldownMs:5e3},worldbooks:{enabled:!1,selected:[]},extraction:{enabled:!0,maxMessages:5,regexPresetId:"builtin_regex_summary"},promptTemplate:`\u8BF7\u6839\u636E\u4EE5\u4E0BAI\u56DE\u590D\u751F\u6210\u6458\u8981\u5757\uFF1A

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
</youyou>`,runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},apiPreset:"",extractTags:[]},escapeTransformTool:{id:"escapeTransformTool",name:"\u8F6C\u4E49\u5904\u7406",icon:"fa-quote-left",description:"\u5BF9\u63D0\u53D6\u5185\u5BB9\u6267\u884C\u672C\u5730\u8F6C\u4E49\u6216\u53BB\u8F6C\u4E49",enabled:!0,order:6,output:{mode:"local_transform",apiPreset:"",overwrite:!0,enabled:!0,autoTrigger:!0},extraction:{enabled:!0,maxMessages:5,selectors:[]},processor:{type:"escape_transform",direction:"escape",options:{doubleQuote:!0,singleQuote:!1,newline:!1}},runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},extractTags:[]},punctuationTransformTool:{id:"punctuationTransformTool",name:"\u4E2D\u6587\u6807\u70B9\u66FF\u6362",icon:"fa-language",description:"\u5C06\u82F1\u6587\u6807\u70B9\u6309\u52FE\u9009\u9879\u66FF\u6362\u4E3A\u4E2D\u6587\u6807\u70B9",enabled:!0,order:7,output:{mode:"local_transform",apiPreset:"",overwrite:!0,enabled:!0,autoTrigger:!0},extraction:{enabled:!0,maxMessages:5,selectors:[]},processor:{type:"punctuation_transform",direction:"en_to_zh",options:{comma:!0,period:!0,exclamation:!0,question:!0,semicolon:!1,colon:!1,leftParen:!1,rightParen:!1}},runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},extractTags:[]}},Ds={presetManagement:{id:"presetManagement",name:"\u9884\u8BBE\u7BA1\u7406",icon:"fa-bookmark",hasSubTabs:!0,description:"\u7EDF\u4E00\u7BA1\u7406 API / \u6B63\u5219 / \u4E16\u754C\u4E66 / \u8868\u683C\u6A21\u677F\u9884\u8BBE",order:0,subTabs:[{id:"apiPresets",name:"API \u9884\u8BBE",icon:"fa-database",component:"ApiPresetPanel",presetKind:"api"},{id:"regexPresets",name:"\u6B63\u5219\u63D0\u53D6",icon:"fa-filter",component:"RegexExtractPanel",presetKind:"regex"},{id:"worldbookPresets",name:"\u4E16\u754C\u4E66",icon:"fa-book-atlas",component:"WorldbookPresetPanel",presetKind:"worldbook"},{id:"tableTemplates",name:"\u8868\u683C\u6A21\u677F",icon:"fa-table-list",component:"TableTemplatePanel",presetKind:"table"}]},tools:{id:"tools",name:"\u5DE5\u5177",icon:"fa-tools",hasSubTabs:!0,description:"\u5DE5\u5177\u96C6\u5408",order:4,subTabs:[{id:"summaryTool",name:"\u6458\u8981\u5DE5\u5177",icon:"fa-file-lines",component:"SummaryToolPanel",toolKind:"ai"},{id:"statusBlock",name:"\u4E3B\u89D2\u72B6\u6001\u680F",icon:"fa-user-check",component:"StatusBlockPanel",toolKind:"ai"},{id:"youyouReview",name:"\u5C0F\u5E7D\u70B9\u8BC4",icon:"fa-comment-dots",component:"YouyouReviewPanel",toolKind:"ai"},{id:"escapeTransformTool",name:"\u8F6C\u4E49\u5904\u7406",icon:"fa-quote-left",component:"EscapeTransformToolPanel",toolKind:"script"},{id:"punctuationTransformTool",name:"\u4E2D\u6587\u6807\u70B9\u66FF\u6362",icon:"fa-language",component:"PunctuationTransformToolPanel",toolKind:"script"}]},tableWorkbench:{id:"tableWorkbench",name:"\u586B\u8868\u5DE5\u4F5C\u53F0",icon:"fa-table-cells",hasSubTabs:!1,description:"\u7ED3\u6784\u5316\u586B\u8868\u4E0E\u72B6\u6001\u9884\u89C8\u5DE5\u4F5C\u53F0",component:"TableWorkbenchPanel",order:5},bypass:{id:"bypass",name:"Ai\u6307\u4EE4\u9884\u8BBE",icon:"fa-shield-halved",hasSubTabs:!1,description:"\u7BA1\u7406 Ai \u6307\u4EE4\u9884\u8BBE",component:"BypassPanel",order:6},settings:{id:"settings",name:"\u8BBE\u7F6E",icon:"fa-cog",hasSubTabs:!1,description:"\u5168\u5C40\u8BBE\u7F6E",component:"SettingsPanel",order:7},logger:{id:"logger",name:"\u65E5\u5FD7",icon:"fa-terminal",hasSubTabs:!1,description:"\u67E5\u770B\u63D2\u4EF6\u8FD0\u884C\u65E5\u5FD7\uFF0C\u652F\u6301\u8FC7\u6EE4\u4E0E\u5BFC\u51FA",component:"LoggerPanel",order:8}},Hd={api:{name:"API\u5DE5\u5177",icon:"fa-plug",order:0},prompt:{name:"\u63D0\u793A\u8BCD\u5DE5\u5177",icon:"fa-file-alt",order:1},utility:{name:"\u5B9E\u7528\u5DE5\u5177",icon:"fa-wrench",order:2}},Yt={...Ds};Wm={TOOL_REGISTRY:Ds,TOOL_CATEGORIES:Hd,registerTool:qd,unregisterTool:Vd,getToolList:Jd,getToolConfig:Co,hasTool:Ta,getToolSubTabs:Xd,resetToolRegistry:Qd,setToolApiPreset:Zd,getToolApiPreset:_a,clearToolApiPreset:eu,getAllToolApiBindings:tu,onPresetDeleted:ru,saveToolWindowState:au,getToolWindowState:lu,getToolBaseConfig:In,ensureToolRuntimeConfig:Bs,getToolFullConfig:se,patchToolRuntime:Ir,appendToolRuntimeHistory:su,saveToolConfig:ve,resetToolConfig:ou,getAllDefaultToolConfigs:nu,getAllToolFullConfigs:ko,getEnabledTools:iu}});function Pn(){return`rgx_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`}function pu(){return`r_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,6)}`}function Ia(t={}){let e=Object.values(Lt).includes(t.type)?t.type:Lt.INCLUDE;return{id:String(t.id||pu()),name:String(t.name||"").trim(),description:String(t.description||""),type:e,value:String(t.value||""),enabled:t.enabled!==!1}}function ir(t={}){return{id:String(t.id||Pn()),name:String(t.name||"").trim()||"\u672A\u547D\u540D\u9884\u8BBE",description:String(t.description||""),rules:Array.isArray(t.rules)?t.rules.map(Ia):[],blacklist:Array.isArray(t.blacklist)?t.blacklist.map(e=>String(e||"").trim()).filter(Boolean):[],createdAt:Number.isFinite(t.createdAt)?t.createdAt:Date.now(),updatedAt:Number.isFinite(t.updatedAt)?t.updatedAt:Date.now()}}function ar(){let t=we.get(ka);return!t||typeof t!="object"?{}:t}function Io(t){we.set(ka,t)}function ts(t){return typeof t=="string"&&t.startsWith(Fm)}function Hm(t){return ts(t)&&Mn.find(e=>e.id===t)||null}function Ma(t){if(!Array.isArray(t)){Mn=[];return}Mn=t.map(e=>ir({...e,id:String(e?.id||"")})).filter(e=>ts(e.id))}function Ks(){if(uu)return;uu=!0;let t=M.get(cu)||{};if(t[du]===!0)return;let e=ar(),r=Object.keys(e).length>0,s=0,o={...e},n=t.tagRulePresets||{};for(let i of Object.values(n)){let a=ir({id:Pn(),name:i.name||"\u5DF2\u8FC1\u79FB\u9884\u8BBE",description:i.description||"",rules:i.rules||[],blacklist:i.blacklist||[],createdAt:typeof i.createdAt=="string"&&Date.parse(i.createdAt)||Date.now(),updatedAt:Date.now()});o[a.id]=a,s+=1}if(!r&&s===0){let i=Array.isArray(t.tagRules)?t.tagRules:[],a=Array.isArray(t.contentBlacklist)?t.contentBlacklist:[];if(i.length||a.length){let l=ir({name:"\u9ED8\u8BA4\u89C4\u5219\u96C6\uFF08\u8FC1\u79FB\uFF09",description:"\u4ECE\u8001\u7248\u672C\u7684\u5F53\u524D\u89C4\u5219\u8FC1\u79FB\u800C\u6765",rules:i,blacklist:a});o[l.id]=l,we.set(zs,l.id),s+=1}}s>0&&(Io(o),nr.info(`\u5DF2\u4ECE\u8001\u6570\u636E\u8FC1\u79FB ${s} \u4E2A\u6B63\u5219\u9884\u8BBE`)),M.set(cu,{...t,[du]:!0})}function Gm(){Ks();let t=ar(),e=Object.values(t).map(ir).sort((r,s)=>s.updatedAt-r.updatedAt);return[...Mn,...e]}function lr(t){if(!t)return null;if(ts(t))return Hm(t);Ks();let e=ar();return e[t]?ir(e[t]):null}function $n(){Ks();let t=we.get(zs);return typeof t=="string"&&t?t:""}function yu(){let t=$n();return t?lr(t):null}function Ym(t){if(t&&ts(t))return we.set(zs,t),Rn(),z.emit(D.PRESET_ACTIVATED,{kind:"regex",id:t}),!0;let e=ar();return t&&!e[t]?(nr.warn(`setCurrentPresetId \u627E\u4E0D\u5230\u9884\u8BBE: ${t}`),!1):(we.set(zs,t||""),Rn(),z.emit(D.PRESET_ACTIVATED,{kind:"regex",id:t}),!0)}function On(t={}){Ks();let e=ir({...t,id:Pn(),createdAt:Date.now(),updatedAt:Date.now()}),r=ar();return r[e.id]=e,Io(r),z.emit(D.PRESET_CREATED,{kind:"regex",id:e.id}),nr.info(`\u521B\u5EFA\u9884\u8BBE: ${e.id} (${e.name})`),e}function rs(t,e={}){if(!t)return null;if(ts(t))return nr.warn(`\u62D2\u7EDD\u4FEE\u6539\u5185\u7F6E\u9884\u8BBE: ${t}`),null;let r=ar(),s=r[t];if(!s)return null;let o=ir({...s,...e,id:t,createdAt:s.createdAt,updatedAt:Date.now()});return r[t]=o,Io(r),$n()===t&&Ca(o),z.emit(D.PRESET_UPDATED,{kind:"regex",id:t}),o}function qm(t){if(!t)return!1;if(ts(t))return nr.warn(`\u62D2\u7EDD\u5220\u9664\u5185\u7F6E\u9884\u8BBE: ${t}`),!1;let e=ar();return e[t]?(delete e[t],Io(e),$n()===t&&(we.set(zs,""),Rn()),z.emit(D.PRESET_DELETED,{kind:"regex",id:t}),nr.info(`\u5220\u9664\u9884\u8BBE: ${t}`),!0):!1}function Vm(t,{nameSuffix:e=" \u526F\u672C"}={}){let r=lr(t);return r?On({...r,id:void 0,name:`${r.name}${e}`}):null}function Jm(t,e){return ts(t)?(nr.warn(`\u62D2\u7EDD\u91CD\u547D\u540D\u5185\u7F6E\u9884\u8BBE: ${t}`),null):rs(t,{name:String(e||"").trim()||"\u672A\u547D\u540D\u9884\u8BBE"})}function Xm(t,e={}){let r=lr(t);if(!r)return null;let s=Ia({...e,id:pu()}),o=[...r.rules,s];return rs(t,{rules:o})}function Qm(t,e,r={}){let s=lr(t);if(!s)return null;let o=s.rules.map(n=>n.id===e?Ia({...n,...r,id:n.id}):n);return rs(t,{rules:o})}function Zm(t,e){let r=lr(t);if(!r)return null;let s=r.rules.filter(o=>o.id!==e);return rs(t,{rules:s})}function eh(t,e,r){let s=lr(t);if(!s)return null;let o=s.rules.findIndex(a=>a.id===e);if(o<0)return null;let n=r==="up"?o-1:o+1;if(n<0||n>=s.rules.length)return null;let i=[...s.rules];return[i[o],i[n]]=[i[n],i[o]],rs(t,{rules:i})}function th(t,e){let r=Array.isArray(e)?e.map(s=>String(s||"").trim()).filter(Boolean):[];return rs(t,{blacklist:Array.from(new Set(r))})}function rh(){return Ks(),{version:1,exportedAt:Date.now(),presets:Object.values(ar()).map(ir)}}function sh(t){if(Ks(),!t||typeof t!="object")return{added:0};let e=Array.isArray(t.presets)?t.presets:[],r=ar(),s=0;for(let o of e){let n=ir({...o,id:Pn(),createdAt:Date.now(),updatedAt:Date.now()});r[n.id]=n,s+=1}return s>0&&(Io(r),z.emit(D.PRESET_IMPORTED,{kind:"regex",count:s})),{added:s}}function oh(){we.set(ka,{}),we.set(zs,""),Rn(),nr.info("\u5DF2\u6E05\u7A7A\u6240\u6709\u6B63\u5219\u9884\u8BBE")}async function Ca(t){if(t)try{let e=await Promise.resolve().then(()=>(Rs(),ba));typeof e.setCurrentRules=="function"&&e.setCurrentRules(JSON.parse(JSON.stringify(t.rules||[]))),typeof e.setContentBlacklist=="function"&&e.setContentBlacklist(JSON.parse(JSON.stringify(t.blacklist||[])))}catch(e){nr.warn("\u540C\u6B65\u5230 regex-extractor \u5931\u8D25",{error:e})}}function Rn(){let t=yu();return Ca(t||{rules:[],blacklist:[]})}async function nh(t){if(!t)return[];try{let e=await Promise.resolve().then(()=>(qt(),Aa));return(typeof e.getToolList=="function"?e.getToolList(!1):[]).filter(s=>(typeof e.getToolFullConfig=="function"?e.getToolFullConfig(s.id):null)?.extraction?.regexPresetId===t).map(s=>s.id)}catch{return[]}}var nr,ka,zs,cu,du,Lt,Fm,Mn,uu,Se,ss=L(()=>{Le();Ke();q();nr=C.createScope("RegexPresetStore"),ka="regex_presets",zs="regex_current_preset",cu="settings",du="regex_presets_migrated",Lt=Object.freeze({INCLUDE:"include",EXCLUDE:"exclude",REGEX_INCLUDE:"regex_include",REGEX_EXCLUDE:"regex_exclude"});Fm="builtin_regex_",Mn=[];uu=!1;Se={listPresets:Gm,getPreset:lr,getCurrentPresetId:$n,getCurrentPreset:yu,setCurrentPresetId:Ym,createPreset:On,updatePreset:rs,deletePreset:qm,duplicatePreset:Vm,renamePreset:Jm,addRule:Xm,updateRule:Qm,deleteRule:Zm,moveRule:eh,setBlacklist:th,exportAll:rh,importPresets:sh,resetAll:oh,findLinkedTools:nh,RULE_TYPES:Lt}});var hu={};oe(hu,{RegexExtractPanel:()=>mu,default:()=>ph});function ah(t,e,r,s,o,n){let i=g("div",{style:{display:"grid",gridTemplateColumns:"auto auto minmax(140px, 1fr) 200px minmax(120px, 2fr) auto",gap:"10px",alignItems:"center",padding:"10px 0",borderTop:r===0?"none":"1px solid var(--yyt-border)",opacity:e.enabled===!1?"0.55":"1"},attrs:{draggable:n?null:"true","data-rule-id":e.id}}),a=g("div",{style:{cursor:n?"default":"grab",padding:"4px",color:"var(--yyt-text-muted)",fontSize:"14px",userSelect:"none"},text:"\u22EE\u22EE",title:n?"\u5185\u7F6E\u9884\u8BBE\u4E0D\u53EF\u91CD\u6392":"\u62D6\u52A8\u6392\u5E8F"});i.appendChild(a);let l=g("div",{style:{display:"flex",flexDirection:"column",gap:"2px"}}),d=de({label:"\u25B2",size:"small",variant:"ghost",title:"\u4E0A\u79FB",disabled:n||r===0,onClick:()=>{Se.moveRule(t.id,e.id,"up"),o()}}),c=de({label:"\u25BC",size:"small",variant:"ghost",title:"\u4E0B\u79FB",disabled:n||r===s-1,onClick:()=>{Se.moveRule(t.id,e.id,"down"),o()}});for(let S of[d,c])S.el.style.padding="0 6px",S.el.style.minHeight="auto",S.el.style.fontSize="9px";l.appendChild(d.el),l.appendChild(c.el),i.appendChild(l);let u=g("div",{style:{display:"flex",flexDirection:"column",gap:"2px",minWidth:"0"}}),p=Ge({value:e.name||"",placeholder:"\u89C4\u5219\u540D\uFF08\u53EF\u9009\uFF09",disabled:n,onChange:S=>Se.updateRule(t.id,e.id,{name:S})});p.el.style.fontSize="12px",p.el.style.padding="6px 10px",u.appendChild(p.el),e.description&&u.appendChild(g("div",{text:e.description,style:{fontSize:"10px",color:"var(--yyt-text-muted)"}})),i.appendChild(u);let y=Ue({value:e.type,disabled:n,options:ih,onChange:S=>{Se.updateRule(t.id,e.id,{type:S}),o()}});y.el.style.fontSize="11px",y.el.style.padding="6px 10px",i.appendChild(y.el);let f=e.type===Lt.REGEX_INCLUDE||e.type===Lt.REGEX_EXCLUDE,m=Ge({value:e.value||"",placeholder:f?"\u6B63\u5219\u8868\u8FBE\u5F0F...":"\u6807\u7B7E\u540D\uFF08\u5982 content\uFF09",disabled:n,onChange:S=>Se.updateRule(t.id,e.id,{value:S})});m.el.style.fontSize="12px",m.el.style.padding="6px 10px",m.el.style.fontFamily="ui-monospace, monospace",i.appendChild(m.el);let b=g("div",{style:{display:"flex",gap:"6px",alignItems:"center"}}),w=St({checked:e.enabled!==!1,disabled:n,onChange:S=>{Se.updateRule(t.id,e.id,{enabled:S}),o()}});return w.el.style.padding="0",w.el.style.border="none",w.el.style.background="transparent",b.appendChild(w.el),n||b.appendChild(de({label:"\xD7",size:"small",variant:"ghost",title:"\u5220\u9664\u89C4\u5219",onClick:()=>{Se.deleteRule(t.id,e.id),o()}}).el),i.appendChild(b),i}function lh(t,e,r){let s=null;t.addEventListener("dragstart",o=>{let n=o.target;if(!(n instanceof HTMLElement))return;let i=n.closest("[data-rule-id]");if(i){s=i.getAttribute("data-rule-id"),i.style.opacity="0.4";try{o.dataTransfer.effectAllowed="move",o.dataTransfer.setData("text/plain",s)}catch{}}}),t.addEventListener("dragend",o=>{let n=o.target;n instanceof HTMLElement&&(n.style.opacity=""),s=null}),t.addEventListener("dragover",o=>{if(s){o.preventDefault();try{o.dataTransfer.dropEffect="move"}catch{}}}),t.addEventListener("drop",o=>{if(o.preventDefault(),!s)return;let n=o.target instanceof HTMLElement?o.target.closest("[data-rule-id]"):null;if(!n)return;let i=n.getAttribute("data-rule-id");if(!i||i===s)return;let a=Se.getPreset(e.id);if(!a)return;let l=a.rules.findIndex(p=>p.id===s),d=a.rules.findIndex(p=>p.id===i);if(l<0||d<0)return;let c=[...a.rules],[u]=c.splice(l,1);c.splice(d,0,u),Se.updatePreset(e.id,{rules:c}),r()})}function ch(t,{onChange:e,readonly:r,refresh:s}){let o=g("div",{style:{display:"flex",flexDirection:"column",gap:"14px"}});W(o,ct({label:"\u63CF\u8FF0",control:Ge({value:t.description,placeholder:"\u53EF\u9009 \u2014 \u5907\u6CE8\u7528\u9014",disabled:r,onChange:a=>e({description:a})})}));let n=g("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"6px"}},g("div",{text:"\u63D0\u53D6\u89C4\u5219\uFF08\u6309\u987A\u5E8F\u5E94\u7528\uFF09",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}}),r?g("span",{text:"\u5185\u7F6E\u9884\u8BBE\u53EA\u8BFB",style:{fontSize:"11px",color:"var(--yyt-text-muted)"}}):de({label:"+ \u65B0\u589E\u89C4\u5219",size:"small",onClick:()=>{Se.addRule(t.id,{type:Lt.INCLUDE,value:"",enabled:!0}),s&&s()}}).el);W(o,n);let i=g("div");if(t.rules.length){for(let a=0;a<t.rules.length;a++)i.appendChild(ah(t,t.rules[a],a,t.rules.length,s,r));r||lh(i,t,s)}else i.appendChild(g("div",{style:{padding:"14px 0",color:"var(--yyt-text-muted)",fontSize:"12px"},text:'\u5C1A\u65E0\u89C4\u5219\u3002\u70B9\u51FB\u53F3\u4E0A\u89D2"+ \u65B0\u589E\u89C4\u5219"\u5F00\u59CB\u6DFB\u52A0\u3002'}));if(W(o,i),W(o,g("div",{text:"\u5185\u5BB9\u9ED1\u540D\u5355",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)",marginTop:"6px",marginBottom:"4px"}})),W(o,g("div",{text:"\u63D0\u53D6\u51FA\u7684\u5185\u5BB9\u5757\u82E5\u5305\u542B\u4EFB\u4E00\u5173\u952E\u8BCD\u5219\u8DF3\u8FC7\u8BE5\u5757\uFF08\u4E0D\u533A\u5206\u5927\u5C0F\u5199\uFF09\u3002",style:{fontSize:"11px",color:"var(--yyt-text-muted)",marginBottom:"6px"}})),r)W(o,g("div",{style:{fontSize:"12px",color:"var(--yyt-text-muted)"},text:t.blacklist.length?t.blacklist.join("\u3001"):"\uFF08\u7A7A\uFF09"}));else{let a=ta({values:t.blacklist,placeholder:"\u8F93\u5165\u5173\u952E\u8BCD\u56DE\u8F66\u6DFB\u52A0",chipVariant:"danger",onChange:l=>Se.setBlacklist(t.id,l)});W(o,a.el)}return o}function dh(t){if(!t)return null;let e=g("div",{style:{display:"flex",flexDirection:"column",gap:"8px"}});W(e,g("div",{text:"\u6D4B\u8BD5\u63D0\u53D6",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}}));let r=gu.get(t.id)||{input:"",output:""};gu.set(t.id,r);let s=g("textarea",{className:"yyt-textarea",attrs:{rows:"5",placeholder:"\u7C98\u8D34\u6D4B\u8BD5\u6587\u672C\uFF08\u5982 AI \u56DE\u590D\u539F\u6587\uFF09..."},style:{width:"100%",resize:"vertical",fontFamily:"ui-monospace, monospace",fontSize:"12px"}});s.value=r.input,s.addEventListener("input",()=>{r.input=s.value}),W(e,s);let o=g("div",{style:{padding:"10px",background:"var(--yyt-bg-base)",border:"1px solid var(--yyt-border)",borderRadius:"var(--yyt-radius-sm)",fontFamily:"ui-monospace, monospace",fontSize:"11px",lineHeight:"1.6",color:"var(--yyt-text-muted)",maxHeight:"200px",overflowY:"auto",whiteSpace:"pre-wrap",wordBreak:"break-all",minHeight:"50px"}});o.textContent=r.output||'// \u70B9\u51FB"\u8FD0\u884C\u6D4B\u8BD5"\u770B\u63D0\u53D6\u7ED3\u679C';let n=de({label:"\u25B6 \u8FD0\u884C\u6D4B\u8BD5",size:"small",variant:"primary",onClick:()=>{let i=s.value;if(!i.trim()){r.output="// \u6D4B\u8BD5\u8F93\u5165\u4E3A\u7A7A",o.textContent=r.output,o.style.color="var(--yyt-text-muted)";return}try{let a=or(i,t.rules||[],t.blacklist||[]);r.output=a||"// \u6CA1\u6709\u63D0\u53D6\u5230\u5185\u5BB9",o.textContent=r.output,o.style.color=a?"var(--yyt-text)":"var(--yyt-text-muted)"}catch(a){r.output=`// \u6D4B\u8BD5\u51FA\u9519\uFF1A${a?.message||a}`,o.textContent=r.output,o.style.color="var(--yyt-danger, #f87171)"}}});return W(e,n.el),W(e,o),e}function uh(t){let e=t.rules.filter(r=>r.enabled!==!1).length;return[`${t.rules.length} \u89C4\u5219\uFF08${e} \u542F\u7528\uFF09`,`${t.blacklist.length} \u9ED1\u540D\u5355`]}var _T,ih,gu,mu,ph,bu=L(()=>{tr();ss();Rs();q();wo();_T=C.createScope("RegexExtractPanel"),ih=[{value:Lt.INCLUDE,label:"include \u2014 \u63D0\u53D6\u6807\u7B7E"},{value:Lt.EXCLUDE,label:"exclude \u2014 \u6392\u9664\u6807\u7B7E"},{value:Lt.REGEX_INCLUDE,label:"regex_include \u2014 \u6B63\u5219\u63D0\u53D6"},{value:Lt.REGEX_EXCLUDE,label:"regex_exclude \u2014 \u6B63\u5219\u6392\u9664"}],gu=new Map;mu=Tr({id:"regexExtractPanel",kind:"regex",panelTitle:"\u6B63\u5219\u63D0\u53D6\u9884\u8BBE",panelHint:"\u7BA1\u7406\u591A\u4E2A\u63D0\u53D6\u89C4\u5219\u96C6\uFF0C\u5DE5\u5177\u914D\u7F6E\u4E2D\u901A\u8FC7\u9884\u8BBE ID \u5F15\u7528\u3002\u89C4\u5219\u6309\u987A\u5E8F\u5E94\u7528\uFF0C\u53EF\u62D6\u62FD\u6392\u5E8F\u3002",store:Se,renderEditor:ch,renderExtras:dh,renderListItemMeta:uh}),ph=mu});function ye(t){return t==null?"":String(t).trim()}function fh(t="table"){let e=ye(t)||"table",r=Date.now().toString(36),s=Math.random().toString(36).slice(2,8);return`${e}_${r}_${s}`}function Ra(t="row"){return fh(t)}function Dt(t,e=0){return ye(t)||`table_${Number.isFinite(e)?e+1:1}`}function Mo(t,e=0){return ye(t)||`row_${Number.isFinite(e)?e+1:1}`}function fe(t){if(t!==void 0)try{return JSON.parse(JSON.stringify(t))}catch{return t}}function Us(t={}){return{chatId:ye(t.chatId),sourceMessageId:ye(t.sourceMessageId||t.messageId),sourceSwipeId:ye(t.sourceSwipeId||t.effectiveSwipeId),effectiveSwipeId:ye(t.effectiveSwipeId||t.sourceSwipeId),slotBindingKey:ye(t.slotBindingKey),slotRevisionKey:ye(t.slotRevisionKey),slotTransactionId:ye(t.slotTransactionId),traceId:ye(t.traceId),resolvedAt:Number.isFinite(t.resolvedAt)?t.resolvedAt:Date.now()}}function Pa(t={}){return{resolvedAt:Number.isFinite(t.resolvedAt)?t.resolvedAt:Date.now(),runSource:ye(t.runSource)||Ye.MANUAL,traceId:ye(t.traceId),chatId:ye(t.chatId),sourceMessageId:ye(t.sourceMessageId||t.messageId),sourceSwipeId:ye(t.sourceSwipeId||t.effectiveSwipeId),effectiveSwipeId:ye(t.effectiveSwipeId||t.sourceSwipeId)||"swipe:current",slotBindingKey:ye(t.slotBindingKey),slotRevisionKey:ye(t.slotRevisionKey),slotTransactionId:ye(t.slotTransactionId),assistantContentFingerprint:ye(t.assistantContentFingerprint),assistantBaseFingerprint:ye(t.assistantBaseFingerprint),assistantText:String(t.assistantText||""),assistantBaseText:String(t.assistantBaseText||""),targetMessageIndex:Number.isFinite(t.targetMessageIndex)?t.targetMessageIndex:-1}}function cr(t){return!t||typeof t!="object"?null:{chatId:ye(t.chatId),slotBindingKey:ye(t.slotBindingKey),slotRevisionKey:ye(t.slotRevisionKey),sourceMessageId:ye(t.sourceMessageId),sourceSwipeId:ye(t.sourceSwipeId),tables:Array.isArray(t.tables)?fe(t.tables):[],updatedAt:Number.isFinite(t.updatedAt)?t.updatedAt:0,meta:t.meta&&typeof t.meta=="object"?fe(t.meta):{}}}function Ro(t={},e={}){let r=Pa(t),s=e.meta&&typeof e.meta=="object"?fe(e.meta):{};return{chatId:r.chatId,slotBindingKey:r.slotBindingKey,slotRevisionKey:r.slotRevisionKey,sourceMessageId:r.sourceMessageId,sourceSwipeId:r.sourceSwipeId||r.effectiveSwipeId,tables:Array.isArray(e.tables)?fe(e.tables):[],updatedAt:Number.isFinite(e.updatedAt)?e.updatedAt:Date.now(),meta:{sourceKind:s.sourceKind||ut.EMPTY,...s}}}function Ln(t){return!t||typeof t!="object"?{lastResolvedTarget:null,lastCommittedTarget:null,updatedAt:0}:{lastResolvedTarget:t.lastResolvedTarget?Us(t.lastResolvedTarget):null,lastCommittedTarget:t.lastCommittedTarget?Us(t.lastCommittedTarget):null,updatedAt:Number.isFinite(t.updatedAt)?t.updatedAt:0}}function je(t){if(t==null)return Et;let e=String(t).trim();return e===""?Et:e}function Po(t,e){let r=ye(t),s=je(e);return`${r}::${s}`}function wu(){return{rows:[],cols:[],cells:[],indexColumn:!1}}var js,os,Ye,Nt,ns,ut,Ws,yh,Et,pt,xu,ET,AT,it=L(()=>{js="YouYouToolkit_tableState",os="YouYouToolkit_tableBindings",Ye=Object.freeze({MANUAL:"MANUAL_TABLE",AUTO:"AUTO_TABLE"}),Nt=Object.freeze({ENABLED:"enabled",SELECTED:"selected",CURRENT:"current"}),ns=Object.freeze({EXACT:"exact",BINDING_FALLBACK:"binding_fallback",HISTORY:"history",TEMPLATE:"template",EMPTY:"empty"}),ut=Object.freeze({EXACT:"exact",BINDING:"binding",HISTORY:"history",TEMPLATE:"template",EMPTY:"empty"}),Ws=Object.freeze({INSERT_ROW:"insertRow",UPDATE_ROW:"updateRow",DELETE_ROW:"deleteRow"}),yh=Object.freeze({CELL:"cell",ROW:"row",COLUMN:"column",INDEX_COLUMN:"index_column"});Et="";pt=Object.freeze({INHERIT_GLOBAL:"inherit_global",CHAT_OVERRIDE:"chat_override",PRESET_LINK:"preset_link"}),xu=8,ET=Object.freeze({NOTE:"note",INIT_NODE:"initNode",INSERT_NODE:"insertNode",UPDATE_NODE:"updateNode",DELETE_NODE:"deleteNode"}),AT=Object.freeze({INHERIT_GLOBAL:-1,DISABLED:0})});function Nn(t,e=""){return t==null?e:String(t).trim()||e}function gh(t,e=!1){return t==null?e:t===!0}function Dn(t={},e=0){return Dt(t?.id||t?.key,e)}function $o(t={},e={}){let r=t&&typeof t=="object"?t:{},s=e&&typeof e=="object"?e:{},o=Nn(r.mode||r.runScope||s.mode||s.runScope,Nt.ENABLED),n=Array.isArray(r.selectedTableIds)?r.selectedTableIds.map(a=>Nn(a,"")).filter(Boolean):Array.isArray(s.selectedTableIds)?s.selectedTableIds.map(a=>Nn(a,"")).filter(Boolean):[],i=Nn(r.activeTableId||s.activeTableId,"");return{mode:Object.values(Nt).includes(o)?o:Nt.ENABLED,selectedTableIds:n,activeTableId:i}}function vu(t={},e=[]){let r=$o(t,t?.scope||{}),s=Array.isArray(e)?e:[],o=s.map((a,l)=>Dn(a,l)),n=[];r.mode===Nt.CURRENT?n=r.activeTableId?[r.activeTableId]:[]:r.mode===Nt.SELECTED?n=r.selectedTableIds.filter(a=>o.includes(a)):n=s.map((a,l)=>({table:a,id:Dn(a,l)})).filter(({table:a})=>gh(a?.enabled,!0)).map(({id:a})=>a);let i=new Set(n);return{...r,allTableIds:o,allowedTableIds:n,allowedIdSet:i,includes(a={},l=-1){return i.has(Dn(a,l))},filterTables(a=[]){return(Array.isArray(a)?a:[]).filter((d,c)=>i.has(Dn(d,c)))},toJSON(){return{mode:r.mode,selectedTableIds:fe(r.selectedTableIds),activeTableId:r.activeTableId,allowedTableIds:[...n]}}}}var Bn=L(()=>{it()});function yt(t,e=""){return t==null?e:String(t).trim()||e}function $a(){let t=globalThis.window||globalThis;return yt(t?.TavernHelper?.getCurrentChatId?.()||t?.Silvy?.getCurrentChatId?.()||t?.chat_metadata?.chat_id||t?.this_chid||t?.name1,"default_chat")}function mh(t,e=!1){return t===!0}function hh(t={}){let e=t&&typeof t=="object"?t:{};return{enabled:mh(e.enabled,!1),targetBook:yt(e.targetBook,""),entryComment:yt(e.entryComment,"YYT-\u586B\u8868\u6570\u636E")}}function Oa(t={},e={}){let r=t&&typeof t=="object"?t:{},s=$o(r.scope,{mode:r.runScope||e.runScope||Nt.ENABLED,selectedTableIds:r.selectedTableIds||e.selectedTableIds||[],activeTableId:r.activeTableId||e.activeTableId||""});return{chatId:yt(r.chatId,yt(e.chatId,$a())),templateId:yt(r.templateId,yt(e.templateId,ft)),enabledTableIds:Array.isArray(r.enabledTableIds)?r.enabledTableIds.map(o=>yt(o,"")).filter(Boolean):[],focusedTableId:yt(r.focusedTableId,s.activeTableId),scope:s,worldbookSync:hh(r.worldbookSync),seedNote:yt(r.seedNote,""),updatedAt:yt(r.updatedAt,new Date().toISOString())}}function _u(){let t=Su.get(Tu,{});return t&&typeof t=="object"&&!Array.isArray(t)?t:{}}function La(t=$a()){let e=yt(t,"default_chat"),r=_u();return Oa(r[e],{chatId:e})}function Eu(t={},e=$a()){let r=yt(e,"default_chat"),s=_u(),o=Oa({...s[r],...t||{},chatId:r,updatedAt:new Date().toISOString()},{chatId:r});return Su.set(Tu,{...s,[r]:o}),{success:!0,guide:o}}function Au(t={},e=null){let r=Oa(e||La(),{templateId:t.activeTemplate,runScope:t.runScope,selectedTableIds:t.scope?.selectedTableIds,activeTableId:t.scope?.activeTableId}),s={...t,activeTemplate:r.templateId||t.activeTemplate,runScope:r.scope.mode,scope:r.scope};return r.worldbookSync&&r.worldbookSync.targetBook&&(s.worldbookSync={...t.worldbookSync||{},...r.worldbookSync}),s}var Su,Tu,Cu=L(()=>{Le();dr();it();Bn();Su=M.namespace("tableWorkbenchGuides"),Tu="guides"});function Q(t,e,r="",s=za){return{key:t,title:e,description:r,type:s,required:!1}}function Mr({id:t,name:e,note:r,aiInstructions:s,columns:o}){return{id:t,name:e,note:r,enabled:!0,aiInstructions:{init:s?.init||"",create:s?.create||"",update:s?.update||"",delete:s?.delete||""},columns:o,rows:[]}}function I(t,e=""){return t==null?e:String(t).trim()||e}function ur(t,e=!1){return t==null?e:t===!0}function xh(t){if(!Array.isArray(t)||t.length!==1)return!1;let e=t[0]&&typeof t[0]=="object"?t[0]:null;if(!e)return!1;let r=I(e.name||e.title,""),s=I(e.note||e.description,""),o=Array.isArray(e.columns)?e.columns:[],n=Array.isArray(e.rows)?e.rows:[];if(r&&!["\u88681","\u8868\u683C 1","\u8868\u683C1"].includes(r)||s||o.length!==1||n.length>1)return!1;let i=o[0]&&typeof o[0]=="object"?o[0]:{},a=I(i.key||i.id,""),l=I(i.title||i.name||i.label,"");if(I(i.description||i.note,"")||a&&a!=="col_1"||l&&!["\u52171","col_1"].includes(l))return!1;if(n.length===0)return!0;let c=n[0]&&typeof n[0]=="object"?n[0]:{},u=I(c.name||c.title||c.label,""),p=c.cells&&typeof c.cells=="object"&&!Array.isArray(c.cells)?c.cells:{},y=Array.isArray(c.values)?c.values:[],f=Object.values(p).some(m=>I(m,""))||y.some(m=>I(m,""));return(!u||u==="\u884C1")&&!f}function wh(t,{seedDefaultWhenMissing:e=!1}={}){return xh(t)?fe(Oo):Array.isArray(t)?fe(t):t&&typeof t=="object"?Sh(t):e?fe(Oo):[]}function vh(t=""){let e=[],r=I(t,""),s=/-\s*列\d+\s*[:：]\s*([^\n\-–—]+?)\s*[-–—]\s*([^\n]+)/g,o;for(;o=s.exec(r);)e.push({title:I(o[1],""),description:I(o[2],"")});return e}function Sh(t={}){let e=t&&typeof t=="object"?t:{};return Object.keys(e).filter(s=>s.startsWith("sheet_")&&e[s]&&typeof e[s]=="object").map((s,o)=>({key:s,table:e[s],fallbackOrder:o})).sort((s,o)=>{let n=Number.isFinite(s.table.orderNo)?s.table.orderNo:s.fallbackOrder,i=Number.isFinite(o.table.orderNo)?o.table.orderNo:o.fallbackOrder;return n-i}).map(({key:s,table:o},n)=>{let i=o.sourceData&&typeof o.sourceData=="object"?o.sourceData:{},a=Array.isArray(o.content)?o.content:[],l=Array.isArray(a[0])?a[0]:[],d=vh(i.note),c=new Set,u=l.slice(1).map((y,f)=>{let m=d[f]||{},b=I(y||m.title,`\u5217${f+1}`);return{key:Ru(b||`col_${f+1}`,c),title:b,description:I(m.description,""),type:za,required:!1}}),p=a.slice(1).map((y,f)=>{let m=Array.isArray(y)?y:[],b={};return u.forEach((w,S)=>{b[w.key]=Lo(m[S+1])}),{name:I(m[0],`\u884C${f+1}`),cells:b}});return{id:I(o.uid||s,`sheet_${n+1}`),name:I(o.name,`\u8868${n+1}`),note:I(i.note,""),enabled:o.enabled!==!1,aiInstructions:{init:I(i.initNode,""),create:I(i.insertNode,""),update:I(i.updateNode,""),delete:I(i.deleteNode,"")},columns:u,rows:p}})}function Lo(t){if(t==null)return"";if(typeof t=="string")return t;try{return JSON.stringify(t,null,2)}catch{return String(t)}}function Th(t,e="col"){return I(t,"").toLowerCase().replace(/[^a-z0-9]+/g,"_").replace(/^_+|_+$/g,"")||e}function Ru(t,e=new Set){let r=Th(t,"col"),s=r,o=2;for(;e.has(s);)s=`${r}_${o}`,o+=1;return e.add(s),s}function _h(t=[]){let e=[],r=0;return t.forEach(s=>{let o=s&&typeof s=="object"?s:{},n=o.cells&&typeof o.cells=="object"&&!Array.isArray(o.cells)?o.cells:null,i=Array.isArray(o.cells)?o.cells:Array.isArray(o.values)?o.values:null;n&&Object.keys(n).forEach(a=>{e.includes(a)||e.push(a)}),i&&i.length>r&&(r=i.length)}),e.length>0?e.map(s=>({key:s,title:String(s)})):r>0?Array.from({length:r},(s,o)=>({key:`col_${o+1}`,title:`\u5217${o+1}`})):[]}function Ka(t,e=za){let r=I(t,e);return Iu.some(s=>s.value===r)?r:e}function Eh(t={},e=0,r=new Set){let s=t&&typeof t=="object"?t:{},o=I(s.title||s.name||s.label,`\u5217${e+1}`),n=I(s.key||s.id,""),i=Ru(n||o||`col_${e+1}`,r),a=[n,I(s.title,""),I(s.name,""),I(s.label,"")].filter(Boolean);return{key:i,title:o,description:I(s.description||s.note,""),type:Ka(s.type),required:s.required===!0,sourceKeys:a}}function Ah(t={},e={},r=0){let s=t.cells&&typeof t.cells=="object"&&!Array.isArray(t.cells)?t.cells:null,o=Array.isArray(t.cells)?t.cells:Array.isArray(t.values)?t.values:null;if(s){let n=[...Array.isArray(e.sourceKeys)?e.sourceKeys:[],e.key,e.title].filter(Boolean);for(let i of n)if(s[i]!==void 0)return Lo(s[i])}return o&&o[r]!==void 0?Lo(o[r]):""}function Ch(t={},e=[],r=0){let s=t&&typeof t=="object"?t:{},o={};return e.forEach((n,i)=>{o[n.key]=Ah(s,n,i)}),{id:Mo(s.id||s.rowId,r),name:I(s.name||s.title||s.label,`\u884C${r+1}`),cells:o}}function kh(t={}){let e=t&&typeof t=="object"?t:{};return{init:I(e.init,""),create:I(e.create,""),update:I(e.update,""),delete:I(e.delete,"")}}function Ih(t={},e=""){let r=t&&typeof t=="object"?t:{},s=I(r.presetId,I(e,""));return{enabled:r.enabled===!0,presetId:s}}function Mh(t={},e=""){let r=t&&typeof t=="object"?t:{};return{enabled:ur(r.enabled,!1),entryName:I(r.entryName,e),entryType:r.entryType==="keyword"?"keyword":"constant",splitByRow:ur(r.splitByRow,!1),keywords:I(r.keywords,""),injectionTemplate:I(r.injectionTemplate,""),preventRecursion:ur(r.preventRecursion,!0),entryPlacement:{position:I(r.entryPlacement?.position||r.placement?.position,"before_character_definition"),depth:Number.isFinite(Number(r.entryPlacement?.depth??r.placement?.depth))?Math.floor(Number(r.entryPlacement?.depth??r.placement?.depth)):2,order:Number.isFinite(Number(r.entryPlacement?.order??r.placement?.order))?Math.floor(Number(r.entryPlacement?.order??r.placement?.order)):0}}}function Rh(t={},e=0){let r=t&&typeof t=="object"?t:{},s=new Set,n=(Array.isArray(r.columns)&&r.columns.length>0?r.columns:_h(Array.isArray(r.rows)?r.rows:[])).map((l,d)=>Eh(l,d,s)),i=Array.isArray(r.rows)?r.rows.map((l,d)=>Ch(l,n,d)):[],a=I(r.name||r.title,`\u8868${e+1}`);return{id:Dt(r.id||r.key,e),name:a,note:I(r.note||r.description,""),enabled:r.enabled!==!1,aiInstructions:kh(r.aiInstructions),exportConfig:Mh(r.exportConfig,a),columns:n.map(l=>({key:l.key,title:l.title,description:I(l.description,""),type:Ka(l.type),required:l.required===!0})),rows:i}}function Pu(t={}){let e=t&&typeof t=="object"?t:{},r=Array.isArray(e.lastErrorDetails)?e.lastErrorDetails.map(o=>I(o,"")).filter(Boolean):[],s=e.lastValidationSummary&&typeof e.lastValidationSummary=="object"?{errorCount:Number.isFinite(e.lastValidationSummary.errorCount)?e.lastValidationSummary.errorCount:0,warningCount:Number.isFinite(e.lastValidationSummary.warningCount)?e.lastValidationSummary.warningCount:0}:{errorCount:0,warningCount:0};return{lastStatus:I(e.lastStatus,Te.IDLE),lastRunAt:Number.isFinite(e.lastRunAt)?e.lastRunAt:0,lastDurationMs:Number.isFinite(e.lastDurationMs)?e.lastDurationMs:0,lastError:I(e.lastError,""),lastErrorDetails:r,lastValidationSummary:s,successCount:Number.isFinite(e.successCount)?e.successCount:0,errorCount:Number.isFinite(e.errorCount)?e.errorCount:0,lastSourceMessageId:I(e.lastSourceMessageId,""),lastSlotRevisionKey:I(e.lastSlotRevisionKey,""),lastLoadMode:I(e.lastLoadMode,""),lastFillMode:I(e.lastFillMode,""),lastMirrorApplied:e.lastMirrorApplied===!0,lastResolvedFromMessageId:I(e.lastResolvedFromMessageId,""),lastResolvedFromRevisionKey:I(e.lastResolvedFromRevisionKey,""),lastSourceKind:I(e.lastSourceKind,""),lastScopeMode:I(e.lastScopeMode,""),lastAutoRunAt:Number.isFinite(e.lastAutoRunAt)?e.lastAutoRunAt:0,lastAutoStatus:I(e.lastAutoStatus,Te.IDLE),lastAutoMessageId:I(e.lastAutoMessageId,""),lastAutoRevisionKey:I(e.lastAutoRevisionKey,""),lastAutoSkipReason:I(e.lastAutoSkipReason,"")}}function Ph(t={}){let e=t&&typeof t=="object"?t:{};return(Array.isArray(e.tables)?e.tables:[]).map((s,o)=>Rh(s,o))}function $u(t="",e={},r={}){let s=Ka(e?.type),o=String(t??"").trim(),n=I(r?.label,`${I(r?.tableName,"\u8868\u683C")} / ${I(r?.rowName,"\u884C")} / ${I(e?.title||e?.key,"\u5355\u5143\u683C")}`),i=[],a=[];if(e?.required===!0&&!o&&i.push(`${n} \u4E3A\u5FC5\u586B\uFF0C\u5F53\u524D\u4E3A\u7A7A\u3002`),!o)return{valid:i.length===0,errors:i,warnings:a};if(s==="number"&&!Number.isFinite(Number(o))&&i.push(`${n} \u9700\u8981\u586B\u5199\u6570\u5B57\u3002`),s==="boolean"&&!["true","false","1","0","yes","no"].includes(o.toLowerCase())&&i.push(`${n} \u9700\u8981\u586B\u5199\u5E03\u5C14\u503C\uFF08true / false\uFF09\u3002`),s==="date"&&Number.isNaN(Date.parse(o))&&i.push(`${n} \u9700\u8981\u586B\u5199\u53EF\u89E3\u6790\u7684\u65E5\u671F\u3002`),s==="json")try{JSON.parse(o)}catch(l){i.push(`${n} \u9700\u8981\u586B\u5199\u5408\u6CD5 JSON\uFF1A${l?.message||"\u89E3\u6790\u5931\u8D25"}`)}return{valid:i.length===0,errors:i,warnings:a}}function $h(t={}){let r=Ph(t&&typeof t=="object"?t:{}),s=[];return r.forEach((o,n)=>{let i=I(o?.name,`\u8868${n+1}`),a=Array.isArray(o?.columns)?o.columns:[],l=Array.isArray(o?.rows)?o.rows:[];i||s.push(`\u8868 ${n+1} \u7F3A\u5C11\u540D\u79F0\u3002`),a.length===0&&s.push(`${i} \u81F3\u5C11\u9700\u8981\u4E00\u5217\u3002`);let d=new Set;a.forEach((c,u)=>{let p=I(c?.key,""),y=I(c?.title,`\u5217${u+1}`);if(!p){s.push(`${i} / ${y} \u7F3A\u5C11\u5185\u90E8\u540D\u3002`);return}if(d.has(p)){s.push(`${i} \u4E2D\u5B58\u5728\u91CD\u590D\u5217\u5185\u90E8\u540D\uFF1A${p}`);return}d.add(p)}),l.forEach((c,u)=>{let p=I(c?.name,`\u884C${u+1}`),y=c?.cells&&typeof c.cells=="object"&&!Array.isArray(c.cells)?c.cells:{};a.forEach((f,m)=>{let b=I(f?.key,""),w=I(f?.title||b,`\u5217${m+1}`),S=b?Lo(y[b]):"",v=$u(S,f,{label:`${i} / ${p} / ${w}`,tableName:i,rowName:p});s.push(...v.errors)})})}),{valid:s.length===0,errors:s,tables:r}}function Fs({severity:t="error",message:e="",tableIndex:r=-1,tableName:s="",columnIndex:o=-1,columnKey:n="",rowIndex:i=-1,rowName:a="",cellKey:l=""}={}){return{severity:t,message:I(e,t==="warning"?"\u5B58\u5728\u8B66\u544A\u3002":"\u5B58\u5728\u9519\u8BEF\u3002"),tableIndex:r,tableName:I(s,""),columnIndex:o,columnKey:I(n,""),rowIndex:i,rowName:I(a,""),cellKey:I(l,"")}}function zn(t={}){let e=$h(t),r=[];if(!e.valid)return{...e,warnings:[],issues:r,summary:{errorCount:e.errors.length,warningCount:0}};let s=Array.isArray(e.tables)?e.tables:[];s.forEach((i,a)=>{let l=I(i?.name,`\u8868${a+1}`),d=Array.isArray(i?.columns)?i.columns:[],c=Array.isArray(i?.rows)?i.rows:[],u=new Set;l||r.push(Fs({severity:"error",message:`\u8868 ${a+1} \u7F3A\u5C11\u540D\u79F0\u3002`,tableIndex:a,tableName:l})),d.forEach((p,y)=>{let f=I(p?.key,""),m=I(p?.title,`\u5217${y+1}`);f||r.push(Fs({severity:"error",message:`${l} / ${m} \u7F3A\u5C11\u5185\u90E8\u540D\u3002`,tableIndex:a,tableName:l,columnIndex:y,columnKey:f,cellKey:f})),f&&(u.has(f)&&r.push(Fs({severity:"error",message:`${l} \u4E2D\u5B58\u5728\u91CD\u590D\u5217\u5185\u90E8\u540D\uFF1A${f}`,tableIndex:a,tableName:l,columnIndex:y,columnKey:f,cellKey:f})),u.add(f))}),c.forEach((p,y)=>{let f=I(p?.name,`\u884C${y+1}`),m=p?.cells&&typeof p.cells=="object"&&!Array.isArray(p.cells)?p.cells:{};Object.keys(m).forEach(w=>{d.some(S=>I(S?.key,"")===w)||r.push(Fs({severity:"warning",message:`${l} / ${f} \u5305\u542B\u672A\u5B9A\u4E49\u5217 ${w}\uFF0C\u4FDD\u5B58\u540E\u4F1A\u88AB\u5FFD\u7565\u3002`,tableIndex:a,tableName:l,rowIndex:y,rowName:f,cellKey:w}))}),d.forEach((w,S)=>{let v=I(w?.key,""),K=I(w?.title||v,`\u5217${S+1}`),P=v?Lo(m[v]):"",_=$u(P,w,{label:`${l} / ${f} / ${K}`,tableName:l,rowName:f});_.errors.forEach(T=>{r.push(Fs({severity:"error",message:T,tableIndex:a,tableName:l,columnIndex:S,columnKey:v,rowIndex:y,rowName:f,cellKey:v}))}),_.warnings.forEach(T=>{r.push(Fs({severity:"warning",message:T,tableIndex:a,tableName:l,columnIndex:S,columnKey:v,rowIndex:y,rowName:f,cellKey:v}))})})})});let o=r.filter(i=>i.severity!=="warning").map(i=>i.message),n=r.filter(i=>i.severity==="warning").map(i=>i.message);return{valid:o.length===0,errors:o,warnings:n,issues:r,tables:s,summary:{errorCount:o.length,warningCount:n.length}}}function Ou(){return{tables:fe(Oo),promptTemplate:ku,apiPreset:"",promptPreset:"",bypass:{enabled:!1,presetId:""},activeTemplate:ft,autoUpdateEnabled:!1,autoUpdateTrigger:"assistantMessage",runScope:Nt.ENABLED,scope:{mode:Nt.ENABLED,selectedTableIds:[],activeTableId:""},fillMode:Na.INCREMENTAL,contextDepth:8,contextRoles:"all",contextExtractTags:[],contextUseGlobalRules:!1,worldbooks:{enabled:!1,selected:[]},sendLatestRows:-1,mirrorToMessage:!1,mirrorTag:"yyt-table-workbench",worldbookSync:{enabled:!1,targetBook:"",entryComment:"YYT-\u586B\u8868\u6570\u636E"},wrapperConfig:{enabled:!0,wrapperTag:"\u6700\u65B0\u6570\u636E\u4E0E\u8BB0\u5F55",wrapperHint:"\u4EE5\u4E0B\u662F\u5728\u8FD9\u4E2A\u65F6\u95F4\u70B9\uFF0C\u5F53\u524D\u573A\u666F\u4E0B\u5267\u60C5\u76F8\u5173\u7684\u6700\u65B0\u6570\u636E\u4E0E\u8BB0\u5F55\uFF0C\u4F60\u5728\u8FDB\u884C\u5267\u60C5\u5206\u6790\u65F6\u5FC5\u987B\u4EE5\u6B64\u6700\u65B0\u7684\u6570\u636E\u4E3A\u51C6\uFF0C\u4EE5\u4E0B\u6570\u636E\u4E0E\u8BB0\u5F55\u7684\u4F18\u5148\u7EA7\u9AD8\u4E8E\u5176\u4ED6\u4EFB\u4F55\u80CC\u666F\u8BBE\u5B9A\uFF1A",wrapperPlacement:{position:"before_character_definition",depth:2,order:0}},runtime:Pu()}}function At(t={}){let e=Ou(),r=t&&typeof t=="object"?t:{},s=Ih(r.bypass,r.promptPreset),o=wh(r.tables,{seedDefaultWhenMissing:!Object.prototype.hasOwnProperty.call(r,"tables")}),n=$o(r.scope,{mode:r.runScope,selectedTableIds:r.selectedTableIds,activeTableId:r.activeTableId});return{tables:o,promptTemplate:I(r.promptTemplate,e.promptTemplate),apiPreset:I(r.apiPreset,""),promptPreset:s.presetId,bypass:s,activeTemplate:I(r.activeTemplate,e.activeTemplate),autoUpdateEnabled:ur(r.autoUpdateEnabled,e.autoUpdateEnabled),autoUpdateTrigger:I(r.autoUpdateTrigger,e.autoUpdateTrigger),runScope:n.mode,scope:n,fillMode:r.fillMode===Na.FULL?Na.FULL:e.fillMode,contextDepth:Number.isFinite(Number(r.contextDepth))&&Number(r.contextDepth)>0?Math.floor(Number(r.contextDepth)):e.contextDepth,contextRoles:r.contextRoles==="assistant_only"?"assistant_only":"all",contextExtractTags:Array.isArray(r.contextExtractTags)?r.contextExtractTags.filter(i=>typeof i=="string"&&i.trim()):typeof r.contextExtractTags=="string"&&r.contextExtractTags.trim()?r.contextExtractTags.split(`
`).map(i=>i.trim()).filter(Boolean):[],contextUseGlobalRules:ur(r.contextUseGlobalRules??r.contextUseExtractRules??r.contextUseExcludeRules,!1),worldbooks:{enabled:ur(r.worldbooks?.enabled,!1),selected:Array.isArray(r.worldbooks?.selected)?r.worldbooks.selected.filter(i=>typeof i=="string"&&i.trim()):[]},sendLatestRows:Number.isFinite(Number(r.sendLatestRows))?Math.floor(Number(r.sendLatestRows)):-1,mirrorToMessage:ur(r.mirrorToMessage,e.mirrorToMessage),mirrorTag:I(r.mirrorTag,e.mirrorTag),worldbookSync:{enabled:ur(r.worldbookSync?.enabled,!1),targetBook:I(r.worldbookSync?.targetBook,""),entryComment:I(r.worldbookSync?.entryComment,e.worldbookSync.entryComment)},wrapperConfig:{enabled:ur(r.wrapperConfig?.enabled,e.wrapperConfig.enabled),wrapperTag:I(r.wrapperConfig?.wrapperTag,e.wrapperConfig.wrapperTag),wrapperHint:I(r.wrapperConfig?.wrapperHint,e.wrapperConfig.wrapperHint),wrapperPlacement:{position:I(r.wrapperConfig?.wrapperPlacement?.position,e.wrapperConfig.wrapperPlacement.position),depth:Number.isFinite(Number(r.wrapperConfig?.wrapperPlacement?.depth))?Math.floor(Number(r.wrapperConfig?.wrapperPlacement?.depth)):e.wrapperConfig.wrapperPlacement.depth,order:Number.isFinite(Number(r.wrapperConfig?.wrapperPlacement?.order))?Math.floor(Number(r.wrapperConfig?.wrapperPlacement?.order)):e.wrapperConfig.wrapperPlacement.order}},runtime:Pu({...e.runtime,...r.runtime||{}})}}function Ua(t={}){let e=At(t),r=[];return Array.isArray(e.tables)||r.push("\u8868\u5B9A\u4E49\u5FC5\u987B\u662F JSON \u6570\u7EC4\u3002"),e.promptTemplate||r.push("\u586B\u8868 Prompt \u4E0D\u80FD\u4E3A\u7A7A\u3002"),e.mirrorTag||r.push("\u6B63\u6587\u955C\u50CF\u6807\u7B7E\u4E0D\u80FD\u4E3A\u7A7A\u3002"),{valid:r.length===0,errors:r,config:e}}function We(){let t=Da.get(Ba,Ou()),e=At(t),r=La();return{...Au(e,r),guide:r}}function Oh(t){let r=(Array.isArray(t?.tables)?t.tables:[]).map(s=>({...s,rows:[]}));return{...t,tables:r}}function pr(t={}){let e=We(),r=At({...e,...t||{},runtime:t?.runtime===void 0?e.runtime:t.runtime}),s=Ua(r);if(!s.valid)return{success:!1,error:s.errors.join(`
`),errors:s.errors,config:s.config};let o=Oh(s.config);return Da.set(Ba,o),Eu({templateId:s.config.activeTemplate,scope:s.config.scope,worldbookSync:s.config.worldbookSync}),{success:!0,config:s.config}}function Lu(t={}){let e=We(),r=At({...e,runtime:{...e.runtime,...t||{}}});return Da.set(Ba,r),r.runtime}function Lh(t={},e={}){let r=At(t),s=I(r.promptTemplate,ku);return e.skipResponseContract?s.trim():`${s}

${bh}`.trim()}function Nu(t={},e={}){let r=At(t);return{id:"tableWorkbench",name:"\u586B\u8868\u5DE5\u4F5C\u53F0",promptTemplate:Lh(r,e),bypass:{enabled:r.bypass?.enabled===!0,presetId:r.bypass?.presetId||r.promptPreset||""}}}var Da,Ba,Te,Na,ku,bh,Iu,za,UT,ft,Mu,Oo,dr=L(()=>{Le();it();No();Bn();Cu();Da=M.namespace("tableWorkbench"),Ba="config",Te=Object.freeze({IDLE:"idle",RUNNING:"running",SUCCESS:"success",ERROR:"error",ABORTED:"aborted",SKIPPED:"skipped"}),Na=Object.freeze({INCREMENTAL:"incremental",FULL:"full"}),ku=`\u8BF7\u6839\u636E\u5F53\u524D\u5BF9\u8BDD\u4E0E\u5F53\u524D\u8868\u683C\u57FA\u5E95\uFF0C\u66F4\u65B0\u7ED3\u6784\u5316 tables \u6570\u636E\u3002

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
{{toolContentMacro}}`,bh=`\u8F93\u51FA\u8981\u6C42\uFF1A
- \u53EA\u8FD4\u56DE JSON
- \u4E0D\u8981\u9644\u52A0\u89E3\u91CA\u3001\u6807\u9898\u6216 Markdown
- JSON \u7ED3\u6784\u5FC5\u987B\u662F\uFF1A
{
  "tables": []
}`,Iu=Object.freeze([{value:"text",label:"\u6587\u672C"},{value:"number",label:"\u6570\u5B57"},{value:"boolean",label:"\u5E03\u5C14"},{value:"date",label:"\u65E5\u671F"},{value:"json",label:"JSON"}]),za="text",UT=Object.freeze(Iu.map(t=>Object.freeze({...t}))),ft="default_story_state",Mu="\u9ED8\u8BA4\u5267\u60C5\u72B6\u6001\u6A21\u677F";Oo=Object.freeze([Mr({id:"default_global_state",name:"\u5168\u5C40\u6570\u636E\u8868",note:"\u8BB0\u5F55\u5F53\u524D\u4E3B\u89D2\u6240\u5728\u5730\u70B9\u53CA\u65F6\u95F4\u76F8\u5173\u53C2\u6570\u3002\u6B64\u8868\u901A\u5E38\u6709\u4E14\u4EC5\u6709\u4E00\u884C\u3002",aiInstructions:{init:"\u63D2\u5165\u4E00\u6761\u5173\u4E8E\u5F53\u524D\u4E16\u754C\u72B6\u6001\u7684\u8BB0\u5F55\u3002",create:"\u901A\u5E38\u7981\u6B62\u65B0\u589E\uFF1B\u9664\u975E\u8868\u4E3A\u7A7A\u4E14\u9700\u8981\u521D\u59CB\u5316\u3002",update:"\u5F53\u5730\u70B9\u6216\u65F6\u95F4\u53D1\u751F\u53D8\u5316\u65F6\u66F4\u65B0\u6B64\u8868\uFF1B\u6BCF\u8F6E\u5E94\u6839\u636E\u5267\u60C5\u66F4\u65B0\u65F6\u95F4\u76F8\u5173\u5B57\u6BB5\u3002",delete:"\u7981\u6B62\u5220\u9664\u3002"},columns:[Q("location","\u4E3B\u89D2\u5F53\u524D\u6240\u5728\u5730\u70B9","\u4E3B\u89D2\u5F53\u524D\u6240\u5728\u7684\u5177\u4F53\u573A\u666F\u540D\u79F0\u3002"),Q("current_time","\u5F53\u524D\u65F6\u95F4","\u6E38\u620F\u4E16\u754C\u7684\u5F53\u524D\u65F6\u95F4\uFF1B\u5982\u5267\u60C5\u6CA1\u6709\u660E\u786E\u65F6\u95F4\uFF0C\u53EF\u6839\u636E\u4E16\u754C\u89C2\u7ED9\u51FA\u5408\u7406\u65F6\u95F4\u3002"),Q("previous_scene_time","\u4E0A\u8F6E\u573A\u666F\u65F6\u95F4","\u4E0A\u4E00\u8F6E\u4EA4\u4E92\u7ED3\u675F\u65F6\u7684\u65F6\u95F4\u3002"),Q("elapsed_time","\u7ECF\u8FC7\u7684\u65F6\u95F4","\u6839\u636E\u5F53\u524D\u4E0E\u4E0A\u8F6E\u65F6\u95F4\u8BA1\u7B97\u51FA\u7684\u6587\u672C\u63CF\u8FF0\u3002")]}),Mr({id:"default_protagonist_profile",name:"\u4E3B\u89D2\u4FE1\u606F",note:"\u8BB0\u5F55\u4E3B\u89D2\u7684\u6838\u5FC3\u8EAB\u4EFD\u4FE1\u606F\u3002\u6B64\u8868\u901A\u5E38\u6709\u4E14\u4EC5\u6709\u4E00\u884C\u3002",aiInstructions:{init:"\u521D\u59CB\u5316\u65F6\u63D2\u5165\u4E3B\u89D2\u7684\u552F\u4E00\u6761\u76EE\u3002",create:"\u7981\u6B62\u65B0\u589E\u591A\u540D\u4E3B\u89D2\uFF1B\u9664\u975E\u8868\u4E3A\u7A7A\u4E14\u9700\u8981\u521D\u59CB\u5316\u3002",update:"\u5F53\u4E3B\u89D2\u8EAB\u4EFD\u3001\u5916\u8C8C\u3001\u7ECF\u5386\u6216\u6027\u683C\u6709\u660E\u786E\u53D8\u5316\u65F6\u66F4\u65B0\u3002",delete:"\u7981\u6B62\u5220\u9664\u3002"},columns:[Q("name","\u4EBA\u7269\u540D\u79F0","\u4E3B\u89D2\u7684\u540D\u5B57\u3002"),Q("gender_age","\u6027\u522B/\u5E74\u9F84","\u4E3B\u89D2\u7684\u6027\u522B\u4E0E\u5E74\u9F84\u3002"),Q("appearance","\u5916\u8C8C\u7279\u5F81","\u5BF9\u4E3B\u89D2\u5916\u8C8C\u7684\u5BA2\u89C2\u6587\u5B57\u63CF\u5199\u3002"),Q("identity","\u804C\u4E1A/\u8EAB\u4EFD","\u4E3B\u89D2\u5728\u793E\u4F1A\u6216\u5267\u60C5\u4E2D\u7684\u4E3B\u8981\u8EAB\u4EFD\u3002"),Q("history","\u8FC7\u5F80\u7ECF\u5386","\u4E3B\u89D2\u80CC\u666F\u6545\u4E8B\u4E0E\u5173\u952E\u7ECF\u5386\uFF0C\u968F\u5267\u60C5\u589E\u91CF\u66F4\u65B0\u3002"),Q("personality","\u6027\u683C\u7279\u70B9","\u5BF9\u4E3B\u89D2\u6838\u5FC3\u6027\u683C\u7684\u6982\u62EC\u3002")]}),Mr({id:"default_important_characters",name:"\u91CD\u8981\u89D2\u8272\u8868",note:"\u8BB0\u5F55\u5173\u952E NPC \u6216\u91CD\u8981\u89D2\u8272\u7684\u4FE1\u606F\u548C\u52A8\u6001\u72B6\u6001\u3002",aiInstructions:{init:"\u521D\u59CB\u5316\u65F6\u4E3A\u5F53\u524D\u5728\u573A\u7684\u91CD\u8981\u4EBA\u7269\u5206\u522B\u63D2\u5165\u6761\u76EE\u3002",create:"\u5267\u60C5\u4E2D\u6709\u672A\u8BB0\u5F55\u7684\u91CD\u8981\u4EBA\u7269\u767B\u573A\u65F6\u65B0\u589E\u3002",update:"\u5DF2\u6709\u89D2\u8272\u7684\u72B6\u6001\u3001\u5173\u7CFB\u3001\u60F3\u6CD5\u3001\u7ECF\u5386\u6216\u6301\u6709\u7269\u53D8\u5316\u65F6\u66F4\u65B0\u3002",delete:"\u901A\u5E38\u7981\u6B62\u5220\u9664\uFF1B\u89D2\u8272\u79BB\u573A\u65F6\u4F18\u5148\u66F4\u65B0\u201C\u662F\u5426\u79BB\u573A\u201D\u3002"},columns:[Q("name","\u59D3\u540D","\u89D2\u8272\u59D3\u540D\u3002"),Q("gender_age","\u6027\u522B/\u5E74\u9F84","\u89D2\u8272\u7684\u6027\u522B\u4E0E\u5E74\u9F84\u3002"),Q("summary","\u4E00\u53E5\u8BDD\u4ECB\u7ECD","\u7528\u7B80\u77ED\u6587\u5B57\u6982\u62EC\u89D2\u8272\u8EAB\u4EFD\u80CC\u666F\u3002"),Q("appearance","\u5916\u8C8C\u7279\u5F81","\u5BF9\u89D2\u8272\u5916\u8C8C\u548C\u5F53\u524D\u8863\u7740\u7684\u5BA2\u89C2\u63CF\u5199\u3002"),Q("important_items","\u6301\u6709\u7684\u91CD\u8981\u7269\u54C1","\u89D2\u8272\u62E5\u6709\u7684\u5173\u952E\u7269\u54C1\uFF0C\u7528\u5206\u53F7\u5206\u9694\u3002"),Q("offstage","\u662F\u5426\u79BB\u573A","\u5224\u65AD\u8BE5\u89D2\u8272\u5F53\u524D\u662F\u5426\u5DF2\u7ECF\u79BB\u573A\uFF0C\u586B\u5199\u201C\u662F\u201D\u6216\u201C\u5426\u201D\u3002","boolean"),Q("history","\u8FC7\u5F80\u7ECF\u5386","\u89D2\u8272\u80CC\u666F\u4E0E\u5173\u952E\u4E8B\u4EF6\uFF0C\u968F\u5267\u60C5\u589E\u91CF\u66F4\u65B0\u3002")]}),Mr({id:"default_protagonist_skills",name:"\u4E3B\u89D2\u6280\u80FD\u8868",note:"\u8BB0\u5F55\u4E3B\u89D2\u83B7\u5F97\u7684\u6280\u80FD\u3001\u80FD\u529B\u6216\u9636\u6BB5\u6027\u6210\u957F\u3002",aiInstructions:{init:"\u521D\u59CB\u5316\u65F6\u6839\u636E\u8BBE\u5B9A\u6DFB\u52A0\u4E3B\u89D2\u7684\u521D\u59CB\u6280\u80FD\u3002",create:"\u4E3B\u89D2\u83B7\u5F97\u65B0\u6280\u80FD\u6216\u65B0\u80FD\u529B\u65F6\u65B0\u589E\u3002",update:"\u5DF2\u6709\u6280\u80FD\u5347\u7EA7\u3001\u964D\u7EA7\u6216\u6548\u679C\u53D8\u5316\u65F6\u66F4\u65B0\u3002",delete:"\u6280\u80FD\u88AB\u5267\u60C5\u5265\u593A\u3001\u66FF\u6362\u6216\u5931\u6548\u65F6\u5220\u9664\u3002"},columns:[Q("skill_name","\u6280\u80FD\u540D\u79F0","\u6280\u80FD\u6216\u80FD\u529B\u540D\u79F0\u3002"),Q("skill_type","\u6280\u80FD\u7C7B\u578B","\u6280\u80FD\u7C7B\u522B\uFF0C\u4F8B\u5982\u4E3B\u52A8\u3001\u88AB\u52A8\u3001\u5929\u8D4B\u7B49\u3002"),Q("level","\u7B49\u7EA7/\u9636\u6BB5","\u6280\u80FD\u5F53\u524D\u7B49\u7EA7\u3001\u719F\u7EC3\u5EA6\u6216\u9636\u6BB5\u3002"),Q("effect","\u6548\u679C\u63CF\u8FF0","\u6280\u80FD\u5728\u5F53\u524D\u9636\u6BB5\u4E0B\u7684\u5177\u4F53\u6548\u679C\u3002")]}),Mr({id:"default_inventory",name:"\u80CC\u5305\u7269\u54C1\u8868",note:"\u8BB0\u5F55\u4E3B\u89D2\u62E5\u6709\u7684\u7269\u54C1\u3001\u88C5\u5907\u6216\u6D88\u8017\u54C1\u3002",aiInstructions:{init:"\u521D\u59CB\u5316\u65F6\u6839\u636E\u5267\u60C5\u4E0E\u8BBE\u5B9A\u6DFB\u52A0\u4E3B\u89D2\u7684\u521D\u59CB\u643A\u5E26\u7269\u54C1\u3002",create:"\u4E3B\u89D2\u83B7\u5F97\u80CC\u5305\u4E2D\u6CA1\u6709\u7684\u5168\u65B0\u7269\u54C1\u65F6\u65B0\u589E\u3002",update:"\u5DF2\u6709\u7269\u54C1\u6570\u91CF\u3001\u72B6\u6001\u6216\u63CF\u8FF0\u53D8\u5316\u65F6\u66F4\u65B0\u3002",delete:"\u7269\u54C1\u88AB\u5B8C\u5168\u6D88\u8017\u3001\u4E22\u5F03\u6216\u6467\u6BC1\u65F6\u5220\u9664\u3002"},columns:[Q("item_name","\u7269\u54C1\u540D\u79F0","\u7269\u54C1\u540D\u79F0\u3002"),Q("quantity","\u6570\u91CF","\u62E5\u6709\u6570\u91CF\u3002","number"),Q("description","\u63CF\u8FF0/\u6548\u679C","\u7269\u54C1\u529F\u80FD\u3001\u6548\u679C\u6216\u80CC\u666F\u63CF\u8FF0\u3002"),Q("category","\u7C7B\u522B","\u7269\u54C1\u7C7B\u522B\uFF0C\u4F8B\u5982\u6B66\u5668\u3001\u6D88\u8017\u54C1\u3001\u6742\u7269\u7B49\u3002")]}),Mr({id:"default_quests_events",name:"\u4EFB\u52A1\u4E0E\u4E8B\u4EF6\u8868",note:"\u8BB0\u5F55\u5F53\u524D\u6B63\u5728\u8FDB\u884C\u6216\u9700\u8981\u6301\u7EED\u8FFD\u8E2A\u7684\u4EFB\u52A1\u4E0E\u4E8B\u4EF6\u3002",aiInstructions:{init:"\u521D\u59CB\u5316\u65F6\u6839\u636E\u5267\u60C5\u4E0E\u8BBE\u5B9A\u6DFB\u52A0\u4E3B\u8981\u4EFB\u52A1\u6216\u5173\u952E\u4E8B\u4EF6\u3002",create:"\u4E3B\u89D2\u63A5\u53D6\u3001\u89E6\u53D1\u6216\u53D1\u73B0\u65B0\u7684\u4EFB\u52A1\u4E0E\u4E8B\u4EF6\u65F6\u65B0\u589E\u3002",update:"\u4EFB\u52A1\u53D6\u5F97\u5173\u952E\u8FDB\u5C55\u3001\u76EE\u6807\u53D8\u5316\u6216\u65F6\u9650\u53D8\u5316\u65F6\u66F4\u65B0\u3002",delete:"\u4EFB\u52A1\u5B8C\u6210\u3001\u5931\u8D25\u3001\u8FC7\u671F\u6216\u4E0D\u518D\u9700\u8981\u8FFD\u8E2A\u65F6\u5220\u9664\u3002"},columns:[Q("quest_name","\u4EFB\u52A1\u540D\u79F0","\u4EFB\u52A1\u6216\u4E8B\u4EF6\u6807\u9898\u3002"),Q("quest_type","\u4EFB\u52A1\u7C7B\u578B","\u4E3B\u7EBF\u3001\u652F\u7EBF\u3001\u4E2A\u4EBA\u3001\u7A81\u53D1\u4E8B\u4EF6\u7B49\u3002"),Q("issuer","\u53D1\u5E03\u8005","\u53D1\u5E03\u4EFB\u52A1\u6216\u89E6\u53D1\u4E8B\u4EF6\u7684\u89D2\u8272\u3001\u5730\u70B9\u6216\u52BF\u529B\u3002"),Q("detail","\u8BE6\u7EC6\u63CF\u8FF0","\u4EFB\u52A1\u76EE\u6807\u3001\u4E8B\u4EF6\u80CC\u666F\u548C\u8981\u6C42\u3002"),Q("progress","\u5F53\u524D\u8FDB\u5EA6","\u5BF9\u5B8C\u6210\u5EA6\u6216\u5F53\u524D\u9636\u6BB5\u7684\u7B80\u8981\u63CF\u8FF0\u3002"),Q("deadline","\u4EFB\u52A1\u65F6\u9650","\u5B8C\u6210\u4EFB\u52A1\u7684\u5269\u4F59\u65F6\u95F4\u6216\u622A\u6B62\u6761\u4EF6\u3002"),Q("reward","\u5956\u52B1","\u5B8C\u6210\u540E\u53EF\u80FD\u83B7\u5F97\u7684\u5956\u52B1\u3002"),Q("penalty","\u60E9\u7F5A","\u5931\u8D25\u6216\u9519\u8FC7\u540E\u7684\u540E\u679C\u3002")]}),Mr({id:"default_memo_log",name:"\u7EAA\u8981\u8868",note:"\u8BB0\u5F55\u6BCF\u8F6E\u6216\u5173\u952E\u7247\u6BB5\u53D1\u751F\u7684\u4E8B\u4EF6\u7EAA\u8981\uFF0C\u7528\u4E8E\u540E\u7EED\u56DE\u987E\u3002",aiInstructions:{init:"\u6545\u4E8B\u521D\u59CB\u5316\u65F6\u63D2\u5165\u4E00\u6761\u8BB0\u5F55\uFF0C\u7528\u4E8E\u8BB0\u5F55\u521D\u59CB\u5316\u5267\u60C5\u3002",create:"\u6BCF\u8F6E\u4EA4\u4E92\u7ED3\u675F\u540E\uFF0C\u82E5\u53D1\u751F\u4E86\u503C\u5F97\u8BB0\u5F55\u7684\u65B0\u4E8B\u4EF6\uFF0C\u5219\u63D2\u5165\u4E00\u6761\u65B0\u7EAA\u8981\u3002",update:"\u901A\u5E38\u7981\u6B62\u66F4\u65B0\u5386\u53F2\u7EAA\u8981\uFF1B\u53EA\u6709\u660E\u663E\u4E8B\u5B9E\u9519\u8BEF\u65F6\u624D\u4FEE\u6B63\u3002",delete:"\u7981\u6B62\u5220\u9664\u3002"},columns:[Q("time_span","\u65F6\u95F4\u8DE8\u5EA6","\u672C\u8F6E\u4E8B\u4EF6\u53D1\u751F\u7684\u65F6\u95F4\u8303\u56F4\u3002"),Q("location","\u5730\u70B9","\u672C\u8F6E\u4E8B\u4EF6\u53D1\u751F\u5730\u70B9\u3002"),Q("memo","\u7EAA\u8981","\u4EE5\u7B2C\u4E09\u65B9\u89C6\u89D2\u5BA2\u89C2\u8BB0\u5F55\u672C\u8F6E\u53D1\u751F\u7684\u4E8B\u5B9E\u3002"),Q("summary","\u6982\u89C8","\u4E00\u53E5\u8BDD\u6982\u62EC\u7EAA\u8981\u5185\u5BB9\u3002"),Q("index_code","\u7F16\u7801\u7D22\u5F15","\u7528\u4E8E\u540E\u7EED\u68C0\u7D22\u7684\u7B80\u77ED\u7F16\u7801\u3002")]}),Mr({id:"default_options",name:"\u9009\u9879\u8868",note:"\u8BB0\u5F55\u6BCF\u8F6E\u4E3B\u89D2\u53EF\u4EE5\u91C7\u53D6\u7684\u884C\u52A8\u9009\u9879\u3002\u6B64\u8868\u901A\u5E38\u6709\u4E14\u4EC5\u6709\u4E00\u884C\u3002\u6240\u6709\u9009\u9879\u4F7F\u7528\u7B2C\u4E09\u4EBA\u79F0\uFF0C\u4E0D\u4EE3\u66FF\u4E3B\u89D2\u53D1\u8A00\uFF0C\u5E76\u7D27\u6263\u5F53\u524D\u5267\u60C5\u3002",aiInstructions:{init:"\u521D\u59CB\u5316\u65F6\u751F\u6210\u56DB\u4E2A\u521D\u59CB\u884C\u52A8\u9009\u9879\u3002",create:"\u901A\u5E38\u7981\u6B62\u65B0\u589E\uFF1B\u9664\u975E\u8868\u4E3A\u7A7A\u4E14\u9700\u8981\u521D\u59CB\u5316\u3002",update:"\u6BCF\u8F6E\u4EA4\u4E92\u540E\u6839\u636E\u5F53\u524D\u5267\u60C5\u751F\u6210\u65B0\u7684\u56DB\u4E2A\u9009\u9879\u5E76\u8986\u76D6\u539F\u6709\u5185\u5BB9\u3002",delete:"\u7981\u6B62\u5220\u9664\u3002"},columns:[Q("option_1","\u9009\u9879\u4E00","\u504F\u5411\u7B56\u7565\u3001\u63A8\u8FDB\u5267\u60C5\u6216\u89E3\u51B3\u5F53\u524D\u95EE\u9898\u7684\u884C\u52A8\u3002"),Q("option_2","\u9009\u9879\u4E8C","\u504F\u5411\u8C28\u614E\u89C2\u5BDF\u3001\u6536\u96C6\u4FE1\u606F\u6216\u4FDD\u6301\u4E2D\u7ACB\u7684\u884C\u52A8\u3002"),Q("option_3","\u9009\u9879\u4E09","\u504F\u5411\u5E2E\u52A9\u3001\u4FDD\u62A4\u3001\u6C9F\u901A\u6216\u5B89\u629A\u7684\u884C\u52A8\u3002"),Q("option_4","\u9009\u9879\u56DB","\u504F\u5411\u5192\u9669\u3001\u8BD5\u63A2\u3001\u6539\u53D8\u5C40\u52BF\u6216\u5173\u7CFB\u4E92\u52A8\u7684\u884C\u52A8\u3002")]})])});function Wa(){return ja||(ja=C.createScope("TableIsolation")),ja}var Du,Bu,ja,Fa,Ie,ls=L(()=>{Le();q();it();Du="tableEngine.isolation",Bu=Object.freeze({enabled:!1,key:Et});Fa=class{constructor(){this._cache=null,this._subscribers=new Set}getState(){if(this._cache)return this._cache;let e=M.get(Du,null);return this._cache=this._normalize(e),this._cache}isEnabled(){return this.getState().enabled===!0}getKey(){let e=this.getState();return e.enabled?e.key||Et:Et}getConfiguredKey(){return this.getState().key}setEnabled(e){let r=this._normalize({...this.getState(),enabled:!!e});this._commit(r,{reason:"enabled"})}setKey(e){let r=this._normalize({...this.getState(),key:e});this._commit(r,{reason:"key"})}updateState(e={}){let r=this.getState(),s=this._normalize({enabled:e.enabled!==void 0?!!e.enabled:r.enabled,key:e.key!==void 0?e.key:r.key});this._commit(s,{reason:"patch"})}reset(){this._commit({...Bu},{reason:"reset"})}getScopeKey(e){return Po(e,this.getKey())}subscribe(e){return typeof e!="function"?()=>{}:(this._subscribers.add(e),()=>this._subscribers.delete(e))}_normalize(e){return!e||typeof e!="object"?{...Bu}:{enabled:e.enabled===!0,key:je(e.key)}}_commit(e,r={}){let s=this.getState();if(s.enabled===e.enabled&&s.key===e.key)return;this._cache=e;try{M.set(Du,e)}catch(n){Wa().error("isolation \u72B6\u6001\u843D\u76D8\u5931\u8D25",n)}Wa().info("isolation \u72B6\u6001\u53D8\u5316",{prev:s,next:e,reason:r.reason||""});let o={...e,prev:s,reason:r.reason||""};for(let n of this._subscribers)try{n(o)}catch(i){Wa().error("isolation \u8BA2\u9605\u8005\u56DE\u8C03\u5F02\u5E38",i)}}},Ie=new Fa});function Rr(){return Ha||(Ha=C.createScope("TableChatScope")),Ha}function Vt(){let t=globalThis.window||globalThis,e=t?.TavernHelper?.getCurrentChatId?.()||t?.Silvy?.getCurrentChatId?.()||t?.chat_metadata?.chat_id||t?.this_chid||t?.name1;return String(e??"").trim()||"default_chat"}function Un(){return new Date().toISOString()}function Gs(t){return t!==null&&typeof t=="object"&&!Array.isArray(t)}function yr(t){let e=Ya.get(Ga,{}),s=(Gs(e)?e:{})[t];return Ku(s)}function cs(t,e){let r=Ya.get(Ga,{}),s=Gs(r)?r:{};s[t]=e,Ya.set(Ga,s)}function zu(){return{template:{},templateArchives:{}}}function Ku(t){return Gs(t)?{template:Gs(t.template)?t.template:{},templateArchives:Gs(t.templateArchives)?t.templateArchives:{}}:zu()}function Kn(t){return Gs(t)?{mode:Dh.has(t.mode)?t.mode:pt.INHERIT_GLOBAL,presetName:typeof t.presetName=="string"?t.presetName:"",templateStr:typeof t.templateStr=="string"?t.templateStr:"",guideData:t.guideData!==void 0?fe(t.guideData):null,updatedAt:typeof t.updatedAt=="string"?t.updatedAt:Un(),source:typeof t.source=="string"?t.source:"ui"}:null}function Bh(t){let e=[t.mode||"",t.presetName||"",t.templateStr||""],r=5381,s=e.join("||");for(let o=0;o<s.length;o++)r=(r<<5)+r+s.charCodeAt(o),r|=0;return String(r)}var Nh,Ga,Ha,Ya,Dh,qa,Uu,ju=L(()=>{Le();q();it();ls();Nh="tableChatScope",Ga="chats";Ya=M.namespace(Nh);Dh=new Set(Object.values(pt));qa=class{getScopedConfig(e=Vt()){return yr(e)}setScopedConfig(e,r=Vt()){let s=Ku(e);return cs(r,s),s}getTemplateScope(e,r=Vt()){let s=je(e===void 0?Ie.getKey():e),o=yr(r);return Kn(o.template[s])||null}setTemplateScope(e,r,s=Vt()){let o=je(r===void 0?Ie.getKey():r),n=Kn({...e,updatedAt:Un()});if(!n)return Rr().warn("setTemplateScope \u6536\u5230\u65E0\u6548 state",e),null;let i=yr(s);return i.template[o]=n,cs(s,i),Rr().info("\u6A21\u677F\u4F5C\u7528\u57DF\u5DF2\u66F4\u65B0",{chatId:s,isolationKey:o,mode:n.mode}),n}clearTemplateScope(e,r=Vt()){let s=je(e===void 0?Ie.getKey():e),o=yr(r);o.template[s]!==void 0&&(delete o.template[s],cs(r,o),Rr().info("\u6A21\u677F\u4F5C\u7528\u57DF\u5DF2\u6E05\u9664",{chatId:r,isolationKey:s}))}archiveCurrentTemplate(e,r=Vt()){let s=je(e===void 0?Ie.getKey():e),o=yr(r),n=Kn(o.template[s]);if(!n)return null;let i=Bh(n),a=Array.isArray(o.templateArchives[s])?o.templateArchives[s]:[];if(a.length>0&&a[0].fingerprint===i)return null;let l={fingerprint:i,state:fe(n),archivedAt:Un()},d=[l,...a].slice(0,xu);return o.templateArchives[s]=d,cs(r,o),Rr().info("\u6A21\u677F\u5DF2\u5F52\u6863",{chatId:r,isolationKey:s,archiveCount:d.length}),l}listTemplateArchives(e,r=Vt()){let s=je(e===void 0?Ie.getKey():e),o=yr(r);return(Array.isArray(o.templateArchives[s])?o.templateArchives[s]:[]).map(i=>fe(i))}restoreTemplateArchive(e,r,s=Vt()){let o=je(r===void 0?Ie.getKey():r),n=yr(s),i=Array.isArray(n.templateArchives[o])?n.templateArchives[o]:[],a=i[e];if(!a)return Rr().warn("restoreTemplateArchive: \u627E\u4E0D\u5230 archive",{index:e,available:i.length}),null;this.archiveCurrentTemplate(o,s);let l=Kn({...a.state,source:"restore",updatedAt:Un()});if(!l)return null;let d=yr(s);return d.template[o]=l,cs(s,d),Rr().info("\u6A21\u677F\u5DF2\u6062\u590D",{chatId:s,isolationKey:o,fromArchiveIndex:e}),l}clearTemplateArchives(e,r=Vt()){let s=je(e===void 0?Ie.getKey():e),o=yr(r);Array.isArray(o.templateArchives[s])&&(delete o.templateArchives[s],cs(r,o),Rr().info("\u6A21\u677F\u5F52\u6863\u5DF2\u6E05\u7A7A",{chatId:r,isolationKey:s}))}resetChat(e=Vt()){cs(e,zu()),Rr().warn("\u5DF2\u91CD\u7F6E chat \u7684 ScopedConfig",{chatId:e})}},Uu=new qa});function Wn(){return Va||(Va=C.createScope("TableTemplate")),Va}function st(t,e=""){return t==null?e:String(t).trim()||e}function Fu(t="template"){return`${t}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`}function Bo(t={}){let e=fe(Array.isArray(t.tables)?t.tables:[]),r=zn({tables:e});return{id:st(t.id,Fu()),name:st(t.name,"\u672A\u547D\u540D\u6A21\u677F"),description:st(t.description,""),tables:r.tables||e,promptTemplate:st(t.promptTemplate,""),createdAt:st(t.createdAt,new Date().toISOString()),updatedAt:st(t.updatedAt,new Date().toISOString())}}function Hu(){return[Bo({id:ft,name:Mu,description:"\u5305\u542B\u5168\u5C40\u6570\u636E\u3001\u4E3B\u89D2\u3001\u91CD\u8981\u89D2\u8272\u3001\u6280\u80FD\u3001\u80CC\u5305\u3001\u4EFB\u52A1\u3001\u7EAA\u8981\u548C\u9009\u9879\u8868\u3002",tables:fe(Oo)})]}function ds(){let t=Do.get(Ja,[]);return Array.isArray(t)?t.map(Bo):[]}function is(){let t=Hu(),e=ds(),r=new Set(t.map(s=>s.id));return[...t,...e.filter(s=>!r.has(s.id))]}function as(t){let e=st(t,"");return is().find(r=>r.id===e)||null}function Hs(t={}){let e=new Date().toISOString(),r=Bo({...t,id:st(t.id,Fu()),updatedAt:e,createdAt:st(t.createdAt,e)}),o=ds().filter(n=>n.id!==r.id);return o.push(r),Do.set(Ja,o),{success:!0,template:r}}function Xa(t){let e=st(t,"");if(!e||e===ft)return{success:!1,error:"\u5185\u7F6E\u6A21\u677F\u4E0D\u80FD\u5220\u9664\u3002"};let r=ds().filter(s=>s.id!==e);return Do.set(Ja,r),Vu()===e&&Qa(ft),{success:!0}}function Gu(t,e){let r=st(t,"");if(!r||r===ft)return{success:!1,error:"\u5185\u7F6E\u6A21\u677F\u4E0D\u80FD\u91CD\u547D\u540D\u3002"};let s=st(e,"");if(!s)return{success:!1,error:"\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A\u3002"};let o=as(r);return o?Hs({...o,name:s}):{success:!1,error:"\u6A21\u677F\u4E0D\u5B58\u5728\u3002"}}function Yu(){return{version:1,exportedAt:new Date().toISOString(),templates:ds()}}function qu(t,{overwrite:e=!1}={}){let r;if(Array.isArray(t))r=t;else if(t&&typeof t=="object")Array.isArray(t.templates)?r=t.templates:t.template&&typeof t.template=="object"?r=[t.template]:r=[t];else return{success:!1,imported:0,skipped:0,errors:["\u65E0\u6548\u7684\u5BFC\u5165\u6570\u636E\u683C\u5F0F\u3002"]};let s=new Set(ds().map(a=>a.id)),o=0,n=0,i=[];for(let a of r)try{let l=Bo(a);if(!e&&s.has(l.id)){n++;continue}Hs(l),s.add(l.id),o++}catch(l){i.push(st(l?.message,"\u672A\u77E5\u9519\u8BEF"))}return{success:!0,imported:o,skipped:n,errors:i}}function Vu(){let t=Do.get(Wu,""),e=st(t,ft);return as(e)?e:ft}function Qa(t){let e=st(t,ft);return Do.set(Wu,e),Wn().info("\u5168\u5C40\u6FC0\u6D3B\u6A21\u677F\u5DF2\u5207\u6362",{templateId:e}),e}function jn(){let t=Vu();return as(t)||Hu()[0]}function zh(t){if(!t||typeof t!="string")return null;try{let e=JSON.parse(t);return Bo(e)}catch(e){return Wn().warn("templateFromString \u53CD\u5E8F\u5217\u5316\u5931\u8D25",e),null}}function Fn({chatId:t,isolationKey:e}={}){let r=e===void 0?Ie.getKey():e,s=Uu.getTemplateScope(r,t);if(!s||s.mode===pt.INHERIT_GLOBAL){let n=jn();return{template:n,mode:pt.INHERIT_GLOBAL,source:{templateId:n?.id||""}}}if(s.mode===pt.CHAT_OVERRIDE){let n=zh(s.templateStr);if(n)return{template:n,mode:pt.CHAT_OVERRIDE,source:{}};Wn().warn("chat_override templateStr \u53CD\u5E8F\u5217\u5316\u5931\u8D25\uFF0C\u964D\u7EA7\u5230 inherit_global");let i=jn();return{template:i,mode:pt.INHERIT_GLOBAL,source:{templateId:i?.id||"",fallback:!0}}}if(s.mode===pt.PRESET_LINK){let n=s.presetName||"",i=is(),a=i.find(d=>d.name===n)||i.find(d=>d.id===n);if(a)return{template:a,mode:pt.PRESET_LINK,source:{presetName:n,templateId:a.id}};Wn().warn("preset_link \u6307\u5411\u7684\u5168\u5C40\u9884\u8BBE\u4E0D\u5B58\u5728\uFF0C\u964D\u7EA7\u5230 inherit_global",{presetName:n});let l=jn();return{template:l,mode:pt.INHERIT_GLOBAL,source:{templateId:l?.id||"",presetName:n,fallback:!0}}}let o=jn();return{template:o,mode:pt.INHERIT_GLOBAL,source:{templateId:o?.id||"",unknownMode:s.mode}}}var Do,Ja,Wu,Va,No=L(()=>{Le();q();dr();it();ju();ls();Do=M.namespace("tableWorkbenchTemplates"),Ja="templates",Wu="activeId"});var Qu={};oe(Qu,{TableTemplatePanel:()=>Xu,default:()=>Fh});function Za(t){return t===ft}function jh(t,{onChange:e,readonly:r}){let s=g("div",{style:{display:"flex",flexDirection:"column",gap:"12px"}});W(s,ct({label:"\u63CF\u8FF0",control:Ge({value:t.description||"",placeholder:"\u53EF\u9009 \u2014 \u5907\u6CE8\u7528\u9014",disabled:r,onChange:i=>e({description:i})})})),W(s,g("div",{text:"\u586B\u8868\u63D0\u793A\u8BCD\u6A21\u677F",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}})),W(s,g("div",{text:"\u53EF\u4F7F\u7528\u5B8F\uFF1A{{tableData}} {{lastUserMessage}} {{lastAiMessage}} {{toolWorldbookContent}} \u7B49\u3002\u7559\u7A7A\u4F7F\u7528\u9ED8\u8BA4\u6A21\u677F\u3002",style:{fontSize:"11px",color:"var(--yyt-text-muted)",lineHeight:"1.6",marginBottom:"4px"}}));let o=g("textarea",{className:"yyt-textarea",attrs:{rows:"8",placeholder:"\u53EF\u9009 \u2014 \u81EA\u5B9A\u4E49\u586B\u8868\u63D0\u793A\u8BCD",disabled:r?"disabled":null},style:{width:"100%",resize:"vertical",fontFamily:"ui-monospace, monospace",fontSize:"12px"}});o.value=t.promptTemplate||"",o.addEventListener("change",()=>{r||e({promptTemplate:o.value})}),W(s,o),W(s,g("div",{text:`\u8868\u683C\u7ED3\u6784\uFF08${(t.tables||[]).length} \u5F20\u8868\uFF09`,style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)",marginTop:"6px"}})),W(s,g("div",{text:"\u672C\u9762\u677F\u53EA\u5C55\u793A\u8868\u7ED3\u6784 JSON\u3002\u590D\u6742 schema \u7F16\u8F91\uFF08\u589E\u5220\u8868\u3001\u5217\u5B9A\u4E49\u3001\u9ED8\u8BA4\u884C\uFF09\u5C06\u5728\u586B\u8868\u5DE5\u4F5C\u53F0\u4E2D\u63D0\u4F9B\u3002",style:{fontSize:"11px",color:"var(--yyt-text-muted)",lineHeight:"1.6",marginBottom:"4px"}}));let n=g("pre",{style:{padding:"10px 12px",background:"var(--yyt-bg-base)",border:"1px solid var(--yyt-border)",borderRadius:"var(--yyt-radius-sm, 6px)",fontFamily:"ui-monospace, monospace",fontSize:"11px",lineHeight:"1.6",color:"var(--yyt-text-secondary)",maxHeight:"260px",overflow:"auto",whiteSpace:"pre",margin:"0"}});try{n.textContent=JSON.stringify(t.tables||[],null,2)}catch{n.textContent="// \u65E0\u6CD5\u5E8F\u5217\u5316"}return W(s,n),s}function Wh(t){let r=[`${(t.tables||[]).length} \u5F20\u8868`];return t.promptTemplate&&r.push("\u81EA\u5B9A\u4E49\u6A21\u677F"),r}var Kh,Ju,Uh,Xu,Fh,Zu=L(()=>{tr();No();dr();q();wo();Kh=C.createScope("TableTemplatePanel"),Ju="";Uh={listPresets(){return is().map(t=>({id:Za(t.id)?`builtin_table_${t.id}`:t.id,name:t.name,description:t.description||"",promptTemplate:t.promptTemplate||"",tables:t.tables||[],_rawId:t.id,createdAt:t.createdAt,updatedAt:t.updatedAt}))},getPreset(t){if(!t)return null;let e=t.startsWith("builtin_table_")?t.slice(14):t,r=as(e);return r?{id:Za(r.id)?`builtin_table_${r.id}`:r.id,name:r.name,description:r.description||"",promptTemplate:r.promptTemplate||"",tables:r.tables||[],_rawId:r.id,createdAt:r.createdAt,updatedAt:r.updatedAt}:null},getCurrentPresetId(){return Ju||""},setCurrentPresetId(t){return Ju=t||"",!0},createPreset(t){let e=String(t?.name||"").trim()||"\u65B0\u5EFA\u6A21\u677F",r=Hs({name:e,description:t?.description||"",promptTemplate:t?.promptTemplate||"",tables:Array.isArray(t?.tables)?t.tables:[]});return r?.success?{id:r.template.id,...r.template,_rawId:r.template.id}:null},updatePreset(t,e){if(!t)return null;let r=t.startsWith("builtin_table_")?t.slice(14):t;if(Za(r))return Kh.warn("\u62D2\u7EDD\u4FEE\u6539\u5185\u7F6E\u8868\u683C\u6A21\u677F"),null;let s=as(r);if(!s)return null;let o=Hs({...s,...e,id:r});return o?.success?{id:o.template.id,...o.template,_rawId:o.template.id}:null},deletePreset(t){if(!t)return!1;let e=t.startsWith("builtin_table_")?t.slice(14):t;return!!Xa(e)?.success},duplicatePreset(t,e={}){let r=this.getPreset(t);if(!r)return null;let s=e.nameSuffix||" \u526F\u672C";return this.createPreset({name:`${r.name}${s}`,description:r.description,promptTemplate:r.promptTemplate,tables:r.tables})},renamePreset(t,e){if(!t||!e)return null;let r=t.startsWith("builtin_table_")?t.slice(14):t,s=Gu(r,e);return s?.success?this.getPreset(s.template?.id||r):null},exportAll(){return Yu()},importPresets(t){let e=qu(t,{overwrite:!1});return{added:e?.imported||0,skipped:e?.skipped||0}},resetAll(){let t=ds();for(let e of t)try{Xa(e.id)}catch{}}};Xu=Tr({id:"tableTemplatePanel",kind:"table",panelTitle:"\u8868\u683C\u6A21\u677F",panelHint:"\u7BA1\u7406\u586B\u8868\u5DE5\u4F5C\u53F0\u7684\u8868\u683C\u7ED3\u6784\u6A21\u677F\u3002\u5728\u586B\u8868\u9762\u677F\u9876\u90E8\u5DE5\u5177\u680F\u53EF\u5FEB\u901F\u52A0\u8F7D/\u4FDD\u5B58\u5F53\u524D\u6A21\u677F\u3002",store:Uh,renderEditor:jh,renderListItemMeta:Wh}),Fh=Xu});var tp={};oe(tp,{ToolManagePanel:()=>ep,default:()=>Hh});var ep,Hh,rp=L(()=>{Je();Eo();qt();ep={id:"toolManagePanel",_removeDialog(t){if(!t?.length)return;let e=t.find("#yyt-tool-dialog-overlay");et(e,"yytToolManageDialogSelect"),e.remove()},_getToolkitWindow(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window},_openToolConfig(t){if(!t)return;let r=this._getToolkitWindow()?.YouYouToolkit||window.YouYouToolkit;if(!r){R("warning","\u672A\u627E\u5230\u5DE5\u5177\u7BB1\u5B9E\u4F8B\uFF0C\u65E0\u6CD5\u8DF3\u8F6C\u5230\u5DE5\u5177\u914D\u7F6E");return}r.switchMainTab("tools"),r.switchSubTab("tools",t)},render(t){let e=Ht(),r=Object.entries(e),s=r.filter(([,o])=>o?.enabled!==!1).length;return`
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
            ${re(o.name)}
            <span class="yyt-badge" style="background: var(--yyt-accent-soft); color: var(--yyt-accent); margin-left: 6px;">${re(o.category)}</span>
          </div>
          <div class="yyt-list-row-desc">${re(o.description)}</div>
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
      `},bindEvents(t,e){let r=X();!r||!pe(t)||(t.off(".yytToolManage"),this._bindToolEvents(t,r),this._bindFileEvents(t,r))},_bindToolEvents(t,e){t.on("change.yytToolManage",".yyt-tool-toggle input",r=>{let s=e(r.currentTarget).closest(".yyt-list-row"),o=s.data("tool-id"),n=e(r.currentTarget).is(":checked");kn(o,n),s.toggleClass("yyt-tool-item-enabled",n).toggleClass("yyt-tool-item-disabled",!n),s.find(".yyt-status-dot").toggleClass("yyt-status-dot-on",n).toggleClass("yyt-status-dot-off",!n),R("info",n?"\u5DE5\u5177\u5DF2\u542F\u7528":"\u5DE5\u5177\u5DF2\u7981\u7528")}),t.on("click.yytToolManage","#yyt-add-tool",()=>{this._showToolEditDialog(t,e,null)}),t.on("click.yytToolManage",'.yyt-list-row [data-action="config"]',r=>{let s=e(r.currentTarget).closest(".yyt-list-row").data("tool-id");this._openToolConfig(s)}),t.on("click.yytToolManage",'.yyt-list-row [data-action="edit"]',r=>{let s=e(r.currentTarget).closest(".yyt-list-row").data("tool-id");this._showToolEditDialog(t,e,s)}),t.on("click.yytToolManage",'.yyt-list-row [data-action="delete"]',async r=>{let s=e(r.currentTarget).closest(".yyt-list-row").data("tool-id"),o=Gt(s);if(!s||!o||!await er("\u5220\u9664\u5DE5\u5177",`\u786E\u5B9A\u8981\u5220\u9664\u5DE5\u5177"${o.name}"\u5417\uFF1F`,{danger:!0}))return;if(!$s(s)){R("error","\u5220\u9664\u5931\u8D25");return}this.renderTo(t),R("success","\u5DE5\u5177\u5DF2\u5220\u9664")})},_bindFileEvents(t,e){t.on("click.yytToolManage","#yyt-import-tools",()=>{t.find("#yyt-import-tools-file").click()}),t.on("change.yytToolManage","#yyt-import-tools-file",async r=>{let s=r.target.files[0];if(s){try{let o=await bo(s),n=Ls(o,{overwrite:!1});R(n.success?"success":"error",n.message),n.success&&this.renderTo(t)}catch(o){R("error",`\u5BFC\u5165\u5931\u8D25: ${o.message}`)}e(r.target).val("")}}),t.on("click.yytToolManage","#yyt-export-tools",()=>{try{let r=Os();ho(r,`youyou_toolkit_tools_${Date.now()}.json`),R("success","\u5DE5\u5177\u5DF2\u5BFC\u51FA")}catch(r){R("error",`\u5BFC\u51FA\u5931\u8D25: ${r.message}`)}}),t.on("click.yytToolManage","#yyt-reset-tools",async()=>{await er("\u91CD\u7F6E\u5DE5\u5177","\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u5DE5\u5177\u5417\uFF1F",{danger:!0})&&(Ns(),this.renderTo(t),R("info","\u5DE5\u5177\u5DF2\u91CD\u7F6E"))})},_showToolEditDialog(t,e,r){let s=r?Gt(r):null,o=!!s,n=`
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
                       value="${s?re(s.name):""}" placeholder="\u5DE5\u5177\u540D\u79F0">
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
                     value="${s?re(s.description||""):""}" placeholder="\u5DE5\u5177\u63CF\u8FF0">
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
    `;this._removeDialog(t),t.append(n);let i=t.find("#yyt-tool-dialog-overlay"),a=i.find("#yyt-tool-name"),l=i.find("#yyt-tool-category"),d=i.find("#yyt-tool-desc"),c=i.find("#yyt-tool-timeout"),u=i.find("#yyt-tool-retries");vt(i,{namespace:"yytToolManageDialogSelect",selectors:["#yyt-tool-category"]});let p=()=>{et(i,"yytToolManageDialogSelect"),i.remove()};i.find("#yyt-tool-dialog-close, #yyt-tool-dialog-cancel").on("click",p),i.on("click",function(y){y.target===this&&p()}),i.find("#yyt-tool-dialog-save").on("click",()=>{let y=a.val().trim(),f=l.val(),m=d.val().trim(),b=parseInt(c.val())||6e4,w=parseInt(u.val())||3;if(!y){R("warning","\u8BF7\u8F93\u5165\u5DE5\u5177\u540D\u79F0"),a.trigger("focus").trigger("select");return}let S=r||`tool_${Date.now()}`;if(!Ps(S,{name:y,category:f,description:m,promptTemplate:s?.promptTemplate||"",extractTags:Array.isArray(s?.extractTags)?s.extractTags:[],config:{execution:{timeout:b,retries:w},api:s?.config?.api||{preset:"",useBypass:!1,bypassPreset:""},messages:Array.isArray(s?.config?.messages)?s.config.messages:[],context:{depth:s?.config?.context?.depth||3,includeTags:Array.isArray(s?.config?.context?.includeTags)?s.config.context.includeTags:[],excludeTags:Array.isArray(s?.config?.context?.excludeTags)?s.config.context.excludeTags:[]},worldbooks:{enabled:s?.config?.worldbooks?.enabled===!0,selected:Array.isArray(s?.config?.worldbooks?.selected)?s.config.worldbooks.selected:[]}},enabled:s?.enabled!==!1})){R("error",o?"\u5DE5\u5177\u66F4\u65B0\u5931\u8D25":"\u5DE5\u5177\u521B\u5EFA\u5931\u8D25");return}Bs(S),p(),this.renderTo(t),R("success",o?"\u5DE5\u5177\u5DF2\u66F4\u65B0":"\u5DE5\u5177\u5DF2\u521B\u5EFA"),o||this._openToolConfig(S)})},destroy(t){!X()||!pe(t)||(this._removeDialog(t),t.off(".yytToolManage"))},getStyles(){return`
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
    `},renderTo(t){let e=this.render({});t.html(e),this.bindEvents(t,{})}},Hh=ep});var op={};oe(op,{BypassManager:()=>Hn,DEFAULT_BYPASS_PRESETS:()=>gr,addMessage:()=>ab,buildBypassMessages:()=>pb,bypassManager:()=>ne,createPreset:()=>eb,default:()=>yb,deleteMessage:()=>cb,deletePreset:()=>rb,duplicatePreset:()=>sb,exportPresets:()=>db,getAllPresets:()=>Qh,getDefaultPresetId:()=>ob,getEnabledMessages:()=>ib,getPreset:()=>Zh,getPresetList:()=>zo,importPresets:()=>ub,setDefaultPresetId:()=>nb,updateMessage:()=>lb,updatePreset:()=>tb});function sp(t){let e=String(t||"").trim().toLowerCase();return e==="system"?"SYSTEM":e==="assistant"||e==="ai"?"assistant":"USER"}function Vh(t){return t&&typeof t=="object"&&typeof t.content=="string"&&!t.name&&!Array.isArray(t.messages)}function Jh(t){return String(t||"").replace(/\$0/g,"{{toolContentMacro}}").replace(/\$1/g,"{{rawRecentMessagesText}}").replace(/\$4/g,"{{toolWorldbookContent}}").replace(/\$8/g,"{{userMessage}}").replace(/\$C/g,"{{characterCard}}")}function Xh(t,e,r){let s=t.mainSlot||(t.isMain?"A":t.isMain2?"B":"");return{id:typeof t.id=="string"&&t.id.trim()?t.id.trim():`${r}_msg_${e+1}`,role:sp(t.role),content:Jh(t.content),enabled:t.enabled!==!1,deletable:t.deletable!==!1,...s?{mainSlot:s,isMain:s==="A",isMain2:s==="B"}:{}}}var Gh,fr,Ys,el,Yh,gr,qh,Hn,ne,Qh,zo,Zh,eb,tb,rb,sb,ob,nb,ib,ab,lb,cb,db,ub,pb,yb,qs=L(()=>{Le();Ke();q();Gh=C.createScope("BypassManager"),fr="bypass_presets",Ys="default_bypass_preset",el="current_bypass_preset",Yh=Object.freeze([{id:"table_fill_default_msg_1",role:"SYSTEM",content:"\u4F60\u662F\u4E00\u4E2A\u52A9\u624B\uFF0C\u8D1F\u8D23\u542C\u4ECE\u7528\u6237\u7684\u6307\u4EE4\u5B8C\u6210\u4F60\u7684\u5DE5\u4F5C",enabled:!0,deletable:!0},{id:"table_fill_default_msg_2",role:"assistant",content:"\u6536\u5230\uFF0C\u6211\u5C06\u5145\u5206\u63CF\u7ED8\u7528\u6237\u7684\u610F\u5FD7\uFF0C\u6BEB\u4E0D\u5077\u61D2\uFF0C\u5E76\u4E14\u6211\u4E00\u5B9A\u4F1A\u9075\u7167\u7528\u6237\u7684\u8981\u6C42",enabled:!0,deletable:!0},{id:"table_fill_default_msg_3",role:"USER",content:`\u4EE5\u4E0B\u662F\u4F60\u53EF\u80FD\u9700\u8981\u7528\u5230\u7684\u80CC\u666F\u8BBE\u5B9A\uFF0C\u6CE8\u610F\u4F60\u53EA\u9700\u8981\u5176\u4E2D\u5173\u4E8E\u5267\u60C5\u4EE5\u53CA\u4EBA\u8BBE\u65B9\u9762\u7684\u6570\u636E\uFF0C\u4E0D\u9700\u8981\u601D\u8003\u91CC\u8FB9\u9664\u6B64\u4E4B\u5916\u7684\u4EFB\u4F55\u683C\u5F0F\u6216\u8005\u601D\u7EF4\u94FE\u65B9\u9762\u7684\u8981\u6C42\uFF1A
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

{{userMessage}}`,enabled:!0,deletable:!1,mainSlot:"B",isMain2:!0},{id:"table_fill_default_msg_8",role:"assistant",content:"\u6536\u5230\u6307\u4EE4\uFF0C\u6211\u5C06\u4E00\u6B65\u4E00\u6B65\u5F00\u59CB\u601D\u8003\uFF0C\u5E76\u5B8C\u6210\u586B\u8868\uFF0C\u9996\u5148\u6211\u8981\u5206\u6790\u5F53\u524D\u8F6E\u6B21\u7684\u5267\u60C5\u53D8\u5316\u3002",enabled:!0,deletable:!0}]),gr={table_workbench_fill_default:{id:"table_workbench_fill_default",name:"\u9ED8\u8BA4\u586B\u8868 Ai \u6307\u4EE4\u9884\u8BBE",description:"\u7528\u4E8E\u586B\u8868\u5DE5\u4F5C\u53F0\u7684\u5185\u7F6E Ai \u6307\u4EE4\u9884\u8BBE\uFF0C\u53EF\u590D\u5236\u540E\u6309\u9700\u7F16\u8F91\u3002",enabled:!0,messages:Yh.map(t=>({...t})),createdAt:0,updatedAt:0}},qh=new Set(["\u6807\u51C6\u7834\u9650\u8BCD","\u589E\u5F3A\u7834\u9650"]);Hn=class{constructor(){this._cache=null,this._migrated=!1,this.debugMode=!1}getAllPresets(){if(this._migrateLegacyData(),this._cache)return this._cache;let e=M.get(fr,{});return this._cache={...gr,...e},this._cache}getPresetList(){let e=this.getAllPresets();return Object.values(e).sort((r,s)=>(s.updatedAt||0)-(r.updatedAt||0))}getPreset(e){return e&&this.getAllPresets()[e]||null}presetExists(e){return!!this.getPreset(e)}createPreset(e){let{id:r,name:s,description:o,messages:n}=e;if(!r||typeof r!="string"||!r.trim())return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};if(!s||typeof s!="string"||!s.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let i=r.trim();if(this.presetExists(i))return{success:!1,message:`\u9884\u8BBE "${i}" \u5DF2\u5B58\u5728`};let a={id:i,name:s.trim(),description:o||"",enabled:!0,messages:n||[],createdAt:Date.now(),updatedAt:Date.now()};return this._savePreset(i,a),z.emit(D.BYPASS_PRESET_CREATED,{presetId:i,preset:a}),this._log(`\u9884\u8BBE\u5DF2\u521B\u5EFA: ${i}`),{success:!0,message:`\u9884\u8BBE "${s}" \u521B\u5EFA\u6210\u529F`,preset:a}}updatePreset(e,r){if(!e)return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};let s=this.getPreset(e);if(!s)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};if(r.id&&r.id!==e)return{success:!1,message:"\u4E0D\u5141\u8BB8\u4FEE\u6539\u9884\u8BBEID"};let o={...s,...r,id:e,updatedAt:Date.now()};return this._savePreset(e,o),z.emit(D.BYPASS_PRESET_UPDATED,{presetId:e,preset:o}),this._log(`\u9884\u8BBE\u5DF2\u66F4\u65B0: ${e}`),{success:!0,message:`\u9884\u8BBE "${s.name}" \u66F4\u65B0\u6210\u529F`,preset:o}}deletePreset(e){if(!e)return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};if(gr[e])return{success:!1,message:"\u4E0D\u5141\u8BB8\u5220\u9664\u9ED8\u8BA4\u9884\u8BBE"};let r=this.getPreset(e);if(!r)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let s=M.get(fr,{});return delete s[e],M.set(fr,s),this._cache=null,this.getDefaultPresetId()===e&&this.setDefaultPresetId(null),z.emit(D.BYPASS_PRESET_DELETED,{presetId:e}),this._log(`\u9884\u8BBE\u5DF2\u5220\u9664: ${e}`),{success:!0,message:`\u9884\u8BBE "${r.name}" \u5DF2\u5220\u9664`}}duplicatePreset(e,r,s){let o=this.getPreset(e);if(!o)return{success:!1,message:`\u6E90\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};if((!r||!r.trim())&&(r=`${e}_copy_${Date.now()}`),this.presetExists(r))return{success:!1,message:`\u9884\u8BBE "${r}" \u5DF2\u5B58\u5728`};let n={...JSON.parse(JSON.stringify(o)),id:r.trim(),name:s||`${o.name} (\u526F\u672C)`,createdAt:Date.now(),updatedAt:Date.now()};return this._savePreset(r.trim(),n),z.emit(D.BYPASS_PRESET_CREATED,{presetId:r,preset:n}),{success:!0,message:`\u9884\u8BBE\u5DF2\u590D\u5236\u4E3A "${n.name}"`,preset:n}}addMessage(e,r){let s=this.getPreset(e);if(!s)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let o={id:`msg_${Date.now()}`,role:sp(r.role||"SYSTEM"),content:r.content||"",enabled:r.enabled!==!1,deletable:r.deletable!==!1,...r.mainSlot?{mainSlot:r.mainSlot}:{}},n=[...s.messages||[],o];return this.updatePreset(e,{messages:n})}updateMessage(e,r,s){let o=this.getPreset(e);if(!o)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let n=o.messages||[],i=n.findIndex(l=>l.id===r);if(i===-1)return{success:!1,message:`\u6D88\u606F "${r}" \u4E0D\u5B58\u5728`};let a=[...n];return a[i]={...a[i],...s},this.updatePreset(e,{messages:a})}deleteMessage(e,r){let s=this.getPreset(e);if(!s)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let o=s.messages||[],n=o.find(a=>a.id===r);if(!n)return{success:!1,message:`\u6D88\u606F "${r}" \u4E0D\u5B58\u5728`};if(n.deletable===!1)return{success:!1,message:"\u8BE5\u6D88\u606F\u4E0D\u53EF\u5220\u9664"};let i=o.filter(a=>a.id!==r);return this.updatePreset(e,{messages:i})}getEnabledMessages(e){let r=this.getPreset(e);return!r||!r.enabled?[]:(r.messages||[]).filter(s=>s.enabled!==!1)}getDefaultPresetId(){this._migrateLegacyData();let e=M.get(Ys,null);return e==="undefined"||e==="null"||e===""?(M.remove(Ys),null):e}setDefaultPresetId(e){return e&&!this.presetExists(e)?!1:(M.set(Ys,e),z.emit(D.BYPASS_PRESET_ACTIVATED,{presetId:e}),this._log(`\u9ED8\u8BA4\u9884\u8BBE\u5DF2\u8BBE\u7F6E: ${e}`),!0)}getDefaultPreset(){let e=this.getDefaultPresetId();return e?this.getPreset(e):null}exportPresets(e=null){if(e){let s=this.getPreset(e);if(!s)throw new Error(`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`);return JSON.stringify(s,null,2)}let r=this.getAllPresets();return JSON.stringify({version:"1.0.0",exportedAt:new Date().toISOString(),presets:Object.values(r)},null,2)}importPresets(e,r={}){let{overwrite:s=!1,name:o=""}=r,n;try{n=JSON.parse(e)}catch{return{success:!1,message:"JSON\u89E3\u6790\u5931\u8D25",imported:0}}let i=M.get(fr,{}),l=Array.isArray(n)&&n.every(Vh)?[{id:this._generatePresetId(o||"\u5BFC\u5165\u586B\u8868\u6307\u4EE4\u9884\u8BBE",i),name:o||"\u5BFC\u5165\u586B\u8868\u6307\u4EE4\u9884\u8BBE",description:"\u7531\u5916\u90E8\u586B\u8868\u63D0\u793A\u8BCD\u7EC4\u5BFC\u5165\u3002",enabled:!0,messages:n}]:Array.isArray(n)?n:n.presets?n.presets:[n];if(l.length===0)return{success:!1,message:"\u6CA1\u6709\u627E\u5230\u6709\u6548\u7684\u9884\u8BBE\u6570\u636E",imported:0};let d=0;for(let c of l){let u=this._normalizePreset(c?.id,c,i);u&&(gr[u.id]&&!s||!s&&i[u.id]||(i[u.id]={...u,updatedAt:Date.now()},d++))}return d>0&&(M.set(fr,i),this._cache=null),{success:!0,message:`\u6210\u529F\u5BFC\u5165 ${d} \u4E2A\u9884\u8BBE`,imported:d}}getToolBypassPreset(e){if(!e?.bypass?.enabled)return null;let r=e?.bypass?.presetId;return r?this.getPreset(r):this.getDefaultPreset()}buildBypassMessages(e){let r=this.getToolBypassPreset(e);return r?this.getEnabledMessages(r.id):[]}_savePreset(e,r){let s=M.get(fr,{});s[e]=r,M.set(fr,s),this._cache=null}_migrateLegacyData(){if(this._migrated)return;let e=M.get(fr,{}),r={},s=!1,o=Array.isArray(e)?e.map((n,i)=>[n?.id||n?.name||`legacy_${i}`,n]):Object.entries(e||{});for(let[n,i]of o){let a=this._normalizePreset(n,i,r);if(!a){s=!0;continue}r[a.id]=a,(!e?.[a.id]||e?.[a.id]?.id!==a.id)&&(s=!0)}s&&M.set(fr,r),this._migrateDefaultPreset(r),this._cache=null,this._migrated=!0}_normalizePreset(e,r,s={}){if(!r||typeof r!="object")return null;let o=typeof r.name=="string"?r.name.trim():"",n=typeof r.id=="string"?r.id.trim():"",i=typeof e=="string"?e.trim():"";if(!o&&i&&i!=="undefined"&&i!=="null"&&(o=i),this._isLegacySamplePreset(o,n)||(!n&&i&&i!=="undefined"&&i!=="null"&&(n=i),!n&&o&&o!=="undefined"&&o!=="null"&&(n=this._generatePresetId(o,s)),!o||!n||n==="undefined"||o==="undefined"))return null;let l=Array.isArray(r.messages)?r.messages.filter(d=>d&&typeof d=="object").map((d,c)=>Xh(d,c,n)):[];return{...r,id:n,name:o,description:typeof r.description=="string"?r.description:"",enabled:r.enabled!==!1,messages:l,createdAt:r.createdAt||Date.now(),updatedAt:r.updatedAt||Date.now()}}_migrateDefaultPreset(e){let r=M.get(Ys,null),s=M.get(el,null),o=r??s;(o==="undefined"||o==="null"||o==="")&&(o=null),o&&!e[o]&&(o=Object.values(e).find(i=>i.name===o)?.id||null),o?M.set(Ys,o):M.remove(Ys),M.has(el)&&M.remove(el)}_isLegacySamplePreset(e,r=""){return e?r==="standard"||r==="enhanced"||r==="jailbreak"||qh.has(e)?!0:/^增强破限（副本）(?:\s*\(\d+\))?$/.test(e):!1}_generatePresetId(e,r={}){let s=String(e).trim().toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g,"_").replace(/^_+|_+$/g,"")||`bypass_${Date.now()}`,o=s,n=1;for(;r[o];)o=`${s}_${n++}`;return o}_log(...e){Gh.debug(e[0],e.length>1?e.slice(1):void 0)}},ne=new Hn,Qh=()=>ne.getAllPresets(),zo=()=>ne.getPresetList(),Zh=t=>ne.getPreset(t),eb=t=>ne.createPreset(t),tb=(t,e)=>ne.updatePreset(t,e),rb=t=>ne.deletePreset(t),sb=(t,e,r)=>ne.duplicatePreset(t,e,r),ob=()=>ne.getDefaultPresetId(),nb=t=>ne.setDefaultPresetId(t),ib=t=>ne.getEnabledMessages(t),ab=(t,e)=>ne.addMessage(t,e),lb=(t,e,r)=>ne.updateMessage(t,e,r),cb=(t,e)=>ne.deleteMessage(t,e),db=t=>ne.exportPresets(t),ub=(t,e)=>ne.importPresets(t,e),pb=t=>ne.buildBypassMessages(t),yb=ne});var np={};oe(np,{DEFAULT_SETTINGS:()=>Ko,SettingsService:()=>Yn,default:()=>fb,settingsService:()=>Ct});var Ko,Gn,Yn,Ct,fb,Uo=L(()=>{Le();Ke();Ko={executor:{maxConcurrent:3,maxRetries:2,retryDelayMs:5e3,requestTimeoutMs:9e4,queueStrategy:"fifo"},automation:{settleMs:1200,cooldownMs:5e3,maxConcurrentSlots:1},debug:{enableDebugLog:!1,saveExecutionHistory:!0,showRuntimeBadge:!0},ui:{compactMode:!1,animationEnabled:!0,theme:"dark-blue",startupScreenDismissed:!1}},Gn="settings_v2",Yn=class{constructor(){this._cache=null}getSettings(){if(this._cache)return this._cache;let e=M.get(Gn,{}),r=this._migrateLegacy(e);return this._cache=this._mergeWithDefaults(r.settings),r.changed&&M.set(Gn,this._cache),this._cache}saveSettings(e){this._cache=this._mergeWithDefaults(e),M.set(Gn,this._cache),z.emit(D.SETTINGS_UPDATED,{settings:this._cache})}updateSettings(e){let r=this.getSettings(),s=this._deepMerge(r,e);this.saveSettings(s)}getExecutorSettings(){return this.getSettings().executor}updateExecutorSettings(e){this.updateSettings({executor:e})}getAutomationSettings(){return this.getSettings().automation}updateAutomationSettings(e){this.updateSettings({automation:e})}getDebugSettings(){return this.getSettings().debug}updateDebugSettings(e){this.updateSettings({debug:e})}getUiSettings(){return this.getSettings().ui}updateUiSettings(e){this.updateSettings({ui:e})}resetSettings(){this._cache=JSON.parse(JSON.stringify(Ko)),M.set(Gn,this._cache),z.emit(D.SETTINGS_UPDATED,{settings:this._cache,reset:!0})}get(e,r=null){let s=this.getSettings(),o=e.split("."),n=s;for(let i of o)if(n&&typeof n=="object"&&i in n)n=n[i];else return r;return n}set(e,r){let s=JSON.parse(JSON.stringify(this.getSettings())),o=e.split("."),n=s;for(let i=0;i<o.length-1;i+=1){let a=o[i];a in n||(n[a]={}),n=n[a]}n[o[o.length-1]]=r,this.saveSettings(s)}_migrateLegacy(e){if(!e||typeof e!="object")return{settings:{},changed:!1};let r=!1,s=JSON.parse(JSON.stringify(e));return s.automation&&Object.prototype.hasOwnProperty.call(s.automation,"enabled")&&(delete s.automation.enabled,r=!0),{settings:s,changed:r}}_mergeWithDefaults(e){return this._deepMerge(JSON.parse(JSON.stringify(Ko)),e)}_deepMerge(e,r){let s={...e};for(let o in r)r[o]&&typeof r[o]=="object"&&!Array.isArray(r[o])?s[o]=this._deepMerge(e[o]||{},r[o]):s[o]=r[o];return s}},Ct=new Yn,fb=Ct});function ip(t){if(!t)return"";let e=String(t).trim();return e=e.replace(/([a-z0-9])([A-Z])/g,"$1_$2"),e.toUpperCase()}function qn(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window}function Pr(){try{return qn()?.SillyTavern||null}catch{return null}}function Vn(t){try{return(t||Pr())?.getContext?.()||null}catch{return null}}function tl(t,e){if(!t)return null;let r=typeof t?.on=="function"||typeof t?.addListener=="function",s=typeof t?.off=="function"||typeof t?.removeListener=="function";return!r||!s?null:{source:e,eventSource:t,capabilities:{on:typeof t?.on=="function",off:typeof t?.off=="function",addListener:typeof t?.addListener=="function",removeListener:typeof t?.removeListener=="function"}}}function gb(){let t=qn(),e=Pr(),r=Vn(e),o=[tl(e?.eventSource,"SillyTavern.eventSource"),tl(r?.eventSource,"SillyTavern.getContext().eventSource"),tl(t?.eventSource,"topWindow.eventSource")].filter(Boolean)[0]||null,n=e?.eventTypes||e?.event_types||r?.eventTypes||r?.event_types||t?.eventTypes||t?.event_types||{};return{topWindow:t,api:e,context:r,eventSource:o?.eventSource||null,eventTypes:n,source:o?.source||"unavailable",capabilities:o?.capabilities||null,hasBridge:!!o?.eventSource}}var gt,De,mb,ap,rl,kt,sl=L(()=>{q();gt=C.createScope("HostEvents"),De=Object.freeze({MESSAGE_SENT:"MESSAGE_SENT",MESSAGE_RECEIVED:"MESSAGE_RECEIVED",MESSAGE_UPDATED:"MESSAGE_UPDATED",MESSAGE_DELETED:"MESSAGE_DELETED",MESSAGE_EDITED:"MESSAGE_EDITED",USER_MESSAGE_RENDERED:"USER_MESSAGE_RENDERED",IMPERSONATE_READY:"IMPERSONATE_READY",GENERATION_STOPPED:"GENERATION_STOPPED",GENERATION_AFTER_COMMANDS:"GENERATION_AFTER_COMMANDS",CHAT_CHANGED:"CHAT_CHANGED"});mb=1500,ap=20,rl=class{constructor(){this._bridge=null,this._pending=[],this._initAttempts=0,this._retryTimer=null,this._readyResolvers=[],this._initialized=!1,this._disposed=!1}subscribe(e,r,s={}){if(!e||typeof r!="function")return gt.warn("subscribe \u65E0\u6548\u53C2\u6570",{eventKey:e,handlerType:typeof r}),()=>{};if(this._disposed)return gt.warn("subscribe \u5728 dispose \u4E4B\u540E\u88AB\u8C03\u7528",{eventKey:e}),()=>{};let o={key:ip(e),rawKey:e,handler:r,options:s,attached:!1,_hostName:"",_hostUnsubscribe:null,_disposed:!1};return this._pending.push(o),this._ensureInitialized(),this._bridge?.hasBridge&&this._attachEntry(o),()=>{if(o._disposed)return;o._disposed=!0;let n=this._pending.indexOf(o);if(n>=0&&this._pending.splice(n,1),o.attached&&typeof o._hostUnsubscribe=="function")try{o._hostUnsubscribe()}catch(i){gt.warn("\u53D6\u6D88\u5BBF\u4E3B\u8BA2\u9605\u5931\u8D25",{event:o._hostName,error:i})}}}async emit(e,...r){if(this._ensureInitialized(),!this._bridge?.hasBridge)return gt.debug("emit \u65F6\u5BBF\u4E3B\u6865\u672A\u5C31\u7EEA\uFF0C\u8DF3\u8FC7",{eventKey:e}),!1;let s=this._resolveHostEventName(e);if(!s)return!1;let{eventSource:o}=this._bridge;try{if(typeof o?.emit=="function")return await o.emit(s,...r),!0;if(typeof o?.dispatch=="function")return await o.dispatch(s,...r),!0}catch(n){gt.warn("emit \u629B\u9519",{eventKey:e,hostName:s,error:n})}return!1}ready({timeoutMs:e=1e4}={}){return this._ensureInitialized(),this._bridge?.hasBridge?Promise.resolve(!0):new Promise(r=>{let s=!1,o=i=>{s||(s=!0,r(i))},n=e>0?setTimeout(()=>o(!1),e):null;this._readyResolvers.push(i=>{n&&clearTimeout(n),o(i)})})}describe(){this._ensureInitialized();let e=this._bridge?.eventTypes||{};return{initialized:this._initialized,source:this._bridge?.source||"unavailable",hasBridge:!!this._bridge?.hasBridge,initAttempts:this._initAttempts,retryScheduled:!!this._retryTimer,pendingCount:this._pending.filter(r=>!r.attached).length,attachedCount:this._pending.filter(r=>r.attached).length,availableEvents:Object.keys(e).slice(0,100)}}reinit(){if(this._disposed)return!1;for(let e of this._pending){if(e.attached&&typeof e._hostUnsubscribe=="function")try{e._hostUnsubscribe()}catch{}e.attached=!1,e._hostUnsubscribe=null,e._hostName=""}return this._bridge=null,this._initialized=!1,this._initAttempts=0,this._retryTimer&&(clearTimeout(this._retryTimer),this._retryTimer=null),this._ensureInitialized()}dispose(){this._retryTimer&&(clearTimeout(this._retryTimer),this._retryTimer=null);for(let e of this._pending){if(e.attached&&typeof e._hostUnsubscribe=="function")try{e._hostUnsubscribe()}catch{}e._disposed=!0}this._pending=[],this._readyResolvers=[],this._bridge=null,this._initialized=!1,this._disposed=!0}_ensureInitialized(){if(this._disposed)return!1;if(this._initialized&&this._bridge?.hasBridge)return!0;this._initAttempts+=1;let e=gb();if(this._bridge=e,this._initialized=!0,!e.hasBridge)return gt.debug(`\u5BBF\u4E3B\u6865\u672A\u5C31\u7EEA (attempt ${this._initAttempts})`,{source:e.source}),this._scheduleRetry(),!1;gt.info("\u5BBF\u4E3B\u6865\u5DF2\u5C31\u7EEA",{source:e.source,eventTypesCount:Object.keys(e.eventTypes).length});for(let s of this._pending)!s.attached&&!s._disposed&&this._attachEntry(s);let r=this._readyResolvers.slice();this._readyResolvers=[];for(let s of r)try{s(!0)}catch{}return!0}_scheduleRetry(){if(!this._retryTimer){if(this._initAttempts>=ap){gt.warn(`\u5DF2\u8FBE\u6700\u5927\u91CD\u8BD5\u6B21\u6570 (${ap})\uFF0C\u505C\u6B62\u91CD\u8BD5`);let e=this._readyResolvers.slice();this._readyResolvers=[];for(let r of e)try{r(!1)}catch{}return}this._retryTimer=setTimeout(()=>{this._retryTimer=null,this._initialized=!1,this._ensureInitialized()},mb)}}_resolveHostEventName(e){let r=ip(e),s=this._bridge?.eventTypes||{};if(s[r])return s[r];let o=r.toLowerCase();if(s[o])return s[o];let n=String(e).trim();return n&&n===n.toLowerCase()?n:o}_attachEntry(e){if(!this._bridge?.hasBridge||e.attached||e._disposed)return;let r=this._resolveHostEventName(e.rawKey);if(!r){gt.warn("\u65E0\u6CD5\u89E3\u6790\u5BBF\u4E3B\u4E8B\u4EF6\u540D",{rawKey:e.rawKey});return}let{eventSource:s}=this._bridge,o=typeof s?.on=="function"?s.on.bind(s):typeof s?.addListener=="function"?s.addListener.bind(s):null,n=typeof s?.off=="function"?s.off.bind(s):typeof s?.removeListener=="function"?s.removeListener.bind(s):null;if(!o||!n){gt.warn("\u5BBF\u4E3B eventSource \u7F3A\u5C11 on/off \u65B9\u6CD5");return}try{o(r,e.handler),e.attached=!0,e._hostName=r,e._hostUnsubscribe=()=>{try{n(r,e.handler)}catch(i){gt.warn("\u53D6\u6D88\u5BBF\u4E3B\u8BA2\u9605\u5931\u8D25",{event:r,error:i})}},gt.debug(`\u7ED1\u5B9A\u5BBF\u4E3B\u4E8B\u4EF6: "${r}" (key=${e.key})`)}catch(i){gt.error(`\u7ED1\u5B9A\u5BBF\u4E3B\u4E8B\u4EF6\u5931\u8D25: "${r}"`,{error:i})}}},kt=new rl});var cp={};oe(cp,{ContextInjector:()=>Qn,DEFAULT_INJECTION_OPTIONS:()=>lp,WRITEBACK_METHODS:()=>Bt,WRITEBACK_RESULT_STATUS:()=>Xn,contextInjector:()=>mt,default:()=>xb});function ol(t){return typeof t=="number"&&Number.isFinite(t)?String(t):typeof t=="string"&&t.trim()?t.trim():""}function us(t,e){let r=String(e||"").trim();return r?Array.isArray(t)?(t.includes(r)||t.push(r),t):[r]:t}function Jn(t={}){if(t?.signal?.aborted)return"\u5DE5\u5177\u7ED3\u679C\u5DF2\u53D6\u6D88\uFF0C\u8DF3\u8FC7\u5199\u56DE";if(typeof t?.shouldAbortWriteback=="function")try{if(t.shouldAbortWriteback()===!0)return"\u5DE5\u5177\u7ED3\u679C\u5DF2\u8FC7\u671F\uFF0C\u8DF3\u8FC7\u5199\u56DE"}catch{return"\u5DE5\u5177\u7ED3\u679C\u5DF2\u8FC7\u671F\uFF0C\u8DF3\u8FC7\u5199\u56DE"}return""}var Qe,at,Vs,lp,Xn,Bt,hb,bb,Qn,mt,xb,ps=L(()=>{Ke();q();sl();Qe=C.createScope("ContextInjector"),at="YouYouToolkit_toolOutputs",Vs="YouYouToolkit_injectedContext",lp={overwrite:!0,enabled:!0};Xn={SUCCESS:"success",FAILED:"failed"},Bt={NONE:"none",LOCAL_ONLY:"local_only",SET_CHAT_MESSAGES:"setChatMessages",SET_CHAT_MESSAGE:"setChatMessage"},hb=60,bb=3;Qn=class{constructor(){this.debugMode=!1}async inject(e,r,s={}){return(await this.injectDetailed(e,r,s)).success}async injectDetailed(e,r,s={}){let o={...lp,...s},n=this._createWritebackResult(e,o);if(!e||r===void 0||r===null)return Qe.error("\u6CE8\u5165\u5931\u8D25: \u53C2\u6570\u65E0\u6548"),n.error="\u6CE8\u5165\u5931\u8D25: \u53C2\u6570\u65E0\u6548",n;if(!ol(o.sourceMessageId))return Qe.error("\u6CE8\u5165\u5931\u8D25: \u7F3A\u5C11 sourceMessageId"),n.error="\u6CE8\u5165\u5931\u8D25: \u7F3A\u5C11 sourceMessageId",n;if(o?.signal?.aborted)return n.error="\u5DE5\u5177\u7ED3\u679C\u5DF2\u53D6\u6D88\uFF0C\u8DF3\u8FC7\u5199\u56DE",n;if(typeof o?.shouldAbortWriteback=="function")try{if(o.shouldAbortWriteback()===!0)return n.error="\u5DE5\u5177\u7ED3\u679C\u5DF2\u8FC7\u671F\uFF0C\u8DF3\u8FC7\u5199\u56DE",n}catch{return n.error="\u5DE5\u5177\u7ED3\u679C\u5DF2\u8FC7\u671F\uFF0C\u8DF3\u8FC7\u5199\u56DE",n}let i=n.chatId,a={toolId:e,content:String(r),updatedAt:Date.now(),sourceMessageId:o.sourceMessageId||null,sourceSwipeId:o.sourceSwipeId||o.effectiveSwipeId||null,options:o};z.emit(D.TOOL_CONTEXT_INJECTED,{toolId:e,chatId:i,content:a.content,sourceMessageId:a.sourceMessageId,sourceSwipeId:a.sourceSwipeId,effectiveSwipeId:a.sourceSwipeId,slotBindingKey:o.slotBindingKey||"",slotRevisionKey:o.slotRevisionKey||"",slotTransactionId:o.slotTransactionId||"",traceId:o.traceId||"",sessionKey:o.sessionKey||"",options:o});let l=await this._insertToolOutputToBoundAssistantSlot(e,a,o,n);return l.success&&Qe.info(`\u6CE8\u5165\u6210\u529F: ${e} -> ${i}`,{inserted:l}),l}getAggregatedContext(e){return this.getLatestMessageInjectedContext()}getLatestMessageInjectedContext(e=null){try{let{chat:r}=this._getChatRuntime(),s=this._findAssistantMessageIndex(r,e);if(s<0)return"";let o=r[s]||{},n=o[Vs];if(typeof n=="string"&&n.trim())return n.trim();let i=o[at];return i&&typeof i=="object"?this._buildMessageInjectedContext(i).trim():""}catch(r){return Qe.warn("\u8BFB\u53D6\u6700\u65B0 AI \u6D88\u606F injectedContext \u5931\u8D25",{error:r}),""}}_getLatestAssistantMessageOutputs(){try{let{chat:e}=this._getChatRuntime(),r=this._findAssistantMessageIndex(e,null);if(r<0)return{};let o=(e[r]||{})[at];return o&&typeof o=="object"?o:{}}catch(e){return Qe.warn("\u8BFB\u53D6\u6700\u65B0 AI \u6D88\u606F\u4E0A\u4E0B\u6587\u5931\u8D25",{error:e}),{}}}getToolContext(e,r){if(!r)return null;try{let{chat:s}=this._getChatRuntime(),o=this._findAssistantMessageIndex(s,null);return o<0?null:s[o]?.[at]?.[r]||null}catch{return null}}getAllToolContexts(e){return this._getLatestAssistantMessageOutputs()}async clearToolContext(e,r){if(!r)return!1;try{let{api:s,context:o,chat:n}=this._getChatRuntime(),i=this._findAssistantMessageIndex(n,null);if(i<0)return!1;let a=n[i],l=a?.[at];if(!l||!l[r])return!1;delete l[r],a[at]=l,a[Vs]=this._buildMessageInjectedContext(l);let d=o?.saveChat||s?.saveChat||null;return typeof d=="function"&&await d.call(o||s),z.emit(D.TOOL_CONTEXT_CLEARED,{chatId:e||this._getCurrentChatId(),toolId:r}),!0}catch(s){return Qe.warn("\u6E05\u9664\u5DE5\u5177\u4E0A\u4E0B\u6587\u5931\u8D25",{error:s}),!1}}async clearAllContext(e){try{let{api:r,context:s,chat:o}=this._getChatRuntime(),n=this._findAssistantMessageIndex(o,null);if(n<0)return!1;let i=o[n];delete i[at],delete i[Vs];let a=s?.saveChat||r?.saveChat||null;return typeof a=="function"&&await a.call(s||r),z.emit(D.TOOL_CONTEXT_CLEARED,{chatId:e||this._getCurrentChatId(),allTools:!0}),!0}catch(r){return Qe.warn("\u6E05\u9664\u6240\u6709\u5DE5\u5177\u4E0A\u4E0B\u6587\u5931\u8D25",{error:r}),!1}}clearAllChatsContexts(){Qe.info("\u6E05\u9664\u6240\u6709\u4E0A\u4E0B\u6587")}hasToolContext(e,r){return!!this.getToolContext(e,r)}getContextSummary(e){let r=this._getLatestAssistantMessageOutputs(),s=Object.entries(r).map(([o,n])=>({toolId:o,updatedAt:n.updatedAt,contentLength:n.content?.length||0}));return{chatId:e||this._getCurrentChatId(),tools:s,totalCount:s.length}}exportContext(e){return{chatId:e||this._getCurrentChatId(),contexts:this._getLatestAssistantMessageOutputs(),exportedAt:Date.now()}}importContext(e,r={}){return!1}_getChatRuntime(){try{let e=typeof window.parent<"u"&&window.parent!==window?window.parent:window,r=e.SillyTavern||null,s=r?.getContext?.()||null,o=Array.isArray(s?.chat)?s.chat:[],n=Array.isArray(r?.chat)?r.chat:[],i=o.length?o:n;return{topWindow:e,api:r,context:s,chat:i,contextChat:o,apiChat:n}}catch{return{topWindow:null,api:null,context:null,chat:[],contextChat:[],apiChat:[]}}}_createWritebackResult(e,r={}){let s=Bt.SET_CHAT_MESSAGES;return{success:!1,toolId:e,chatId:this._getCurrentChatId(),traceId:r.traceId||"",sessionKey:r.sessionKey||"",sourceMessageId:r.sourceMessageId||null,sourceSwipeId:r.sourceSwipeId||r.effectiveSwipeId||null,effectiveSwipeId:r.effectiveSwipeId||r.sourceSwipeId||null,slotBindingKey:r.slotBindingKey||"",slotRevisionKey:r.slotRevisionKey||"",slotTransactionId:r.slotTransactionId||"",messageIndex:-1,textField:"",blockIdentity:null,hostUpdateMethod:Bt.NONE,commit:{preferredMethod:s,attemptedMethods:[],appliedMethod:Bt.NONE,fallbackUsed:!1,contentCommitted:!1,hostCommitApplied:!1},refresh:{requestMethods:[],requested:!1,confirmChecks:0,confirmed:!1,confirmedBy:"",eventSource:"",eventName:""},contentCommitted:!1,hostCommitApplied:!1,refreshRequested:!1,refreshConfirmed:!1,writebackStatus:Xn.FAILED,replacedExistingBlock:!1,insertedNewBlock:!1,conflictDetected:!1,conflictReason:"",preservedOtherToolBlocks:!0,error:"",errors:[],steps:{foundTargetMessage:!1,contentCommitted:!1,localTextApplied:!1,runtimeSynced:!1,hostSetChatMessages:!1,hostSetChatMessage:!1,refreshForceSetChatMessage:!1,saveChatDebounced:!1,saveChat:!1,refreshRequested:!1,notifiedMessageUpdated:!1,verifiedAfterWrite:!1,refreshConfirmed:!1},verification:{textIncludesContent:!1,mirrorStored:!1,refreshConfirmed:!1}}}async _wait(e){await new Promise(r=>setTimeout(r,e))}_collectWritebackVerification(e,r,s,o,n,i=null){let a=e?.contextChat?.[s]||e?.apiChat?.[s]||r?.[s]||i||null,l=this._getWritableMessageField(a).text||"",d=a?.[at]?.[o],c=n?l.includes(n):!0,u=!!(d&&String(d.content||"").trim()===n);return{latestMessage:a,latestText:l,textIncludesContent:c,mirrorStored:u}}async _confirmRefresh(e,r,s,o,n,i=null){let a=1,l=this._collectWritebackVerification(e,r,s,o,n,i);for(let d=0;d<bb;d+=1){if(l.textIncludesContent&&l.mirrorStored)return{...l,refreshConfirmed:!0,confirmChecks:a,confirmedBy:"text_and_mirror_present"};await this._wait(hb),a+=1,l=this._collectWritebackVerification(e,r,s,o,n,i)}return{...l,refreshConfirmed:l.textIncludesContent&&l.mirrorStored,confirmChecks:a,confirmedBy:l.textIncludesContent&&l.mirrorStored?"text_and_mirror_present":""}}async _requestAssistantMessageRefresh(e,r,s,o={},n=null){let i=n||this._createWritebackResult("",o),{api:a,context:l}=e||{},d=e?.topWindow||(typeof window.parent<"u"&&window.parent!==window?window.parent:window),c=d?.TavernHelper?.setChatMessages||l?.setChatMessages||a?.setChatMessages||d?.setChatMessages||null;i.commit.preferredMethod=typeof c=="function"?Bt.SET_CHAT_MESSAGES:Bt.LOCAL_ONLY;let u=!1,p=Jn(o);if(p)return i.error=p,i;if(typeof c=="function"){us(i.commit.attemptedMethods,Bt.SET_CHAT_MESSAGES);try{let y=Jn(o);if(y)return i.error=y,i;let f=ol(o.sourceMessageId)||r;await c([{message_id:f,message:s}],{refresh:"affected"}),i.steps.hostSetChatMessages=!0,i.hostUpdateMethod=Bt.SET_CHAT_MESSAGES,i.hostCommitApplied=!0,i.commit.appliedMethod=Bt.SET_CHAT_MESSAGES,i.commit.hostCommitApplied=!0,u=!0}catch(y){Qe.error("setChatMessages \u5199\u56DE\u5931\u8D25\uFF0C\u56DE\u9000\u672C\u5730\u540C\u6B65",{error:y}),i.errors.push(`setChatMessages: ${y?.message||String(y)}`)}}return u&&(i.refreshRequested=!0,us(i.refresh.requestMethods,i.hostUpdateMethod)),u||(us(i.commit.attemptedMethods,Bt.LOCAL_ONLY),i.commit.appliedMethod=Bt.LOCAL_ONLY,i.commit.fallbackUsed=!0,i.hostUpdateMethod=i.commit.appliedMethod),i}_inferBlockType(e){let r=String(e||"").trim();if(!r)return"empty";let s=r.match(/^<([a-zA-Z0-9_-]+)(?:\s[^>]*)?>[\s\S]*<\/\1>$/);return s?.[1]?s[1]:"plain_text"}_stripExactStoredBlock(e,r,s=""){let o=String(e||""),n=String(r||"").trim(),i=String(s||"").trim();return n?o.includes(n)?i?{text:o.replace(n,i).trimEnd(),removed:!0,replaced:!0}:{text:o.replace(n,"").trimEnd(),removed:!0,replaced:!1}:{text:o,removed:!1,replaced:!1}:{text:o,removed:!1,replaced:!1}}_syncMessageToRuntimeChats(e,r,s){let{contextChat:o,apiChat:n}=e||{},i=a=>{!Array.isArray(a)||r<0||r>=a.length||a[r]!==s&&(a[r]={...a[r]||{},...s})};i(o),i(n)}_notifyMessageUpdated(e,r,s={}){if(s.skipNotify===!0)return{emitted:!1,source:"skipped_by_caller",eventName:""};try{let o=kt.describe(),n=e?.topWindow||qn();return o.hasBridge?(kt.emit(De.MESSAGE_UPDATED,r),typeof n?.requestAnimationFrame=="function"?n.requestAnimationFrame(()=>{kt.emit(De.MESSAGE_UPDATED,r)}):typeof n?.setTimeout=="function"&&n.setTimeout(()=>{kt.emit(De.MESSAGE_UPDATED,r)},30),{emitted:!0,source:o.source||"unavailable",eventName:De.MESSAGE_UPDATED}):{emitted:!1,source:o.source||"unavailable",eventName:De.MESSAGE_UPDATED}}catch(o){return Qe.warn("\u89E6\u53D1\u6D88\u606F\u5237\u65B0\u4E8B\u4EF6\u5931\u8D25",{error:o}),{emitted:!1,source:"error",eventName:"",error:o?.message||String(o)}}}_isAssistantMessage(e){if(!e||e.is_user||e.is_system)return!1;let r=String(e.role||"").toLowerCase();return r==="assistant"||r==="ai"||!r}_findAssistantMessageIndex(e,r){let s=Array.isArray(e)?e:[];if(!s.length)return-1;let o=r!=null&&r!=="",n=(i,a)=>{if(!this._isAssistantMessage(i)||r==null||r==="")return!1;let l=String(r).trim();return l?[i.message_id,i.id,i.messageId,i.mes_id,a].map(c=>c==null?"":String(c).trim()).includes(l):!1};for(let i=s.length-1;i>=0;i-=1)if(n(s[i],i))return i;if(o)return-1;for(let i=s.length-1;i>=0;i-=1)if(this._isAssistantMessage(s[i]))return i;return-1}_buildMessageInjectedContext(e){let s=Object.entries(e&&typeof e=="object"?e:{}).filter(([,n])=>n?.blockType!=="full_message").sort(([,n],[,i])=>(n?.updatedAt||0)-(i?.updatedAt||0));if(!s.length)return"";let o=["[\u5DE5\u5177\u4E0A\u4E0B\u6587\u6CE8\u5165]",""];for(let[n,i]of s)o.push(`[${n}]`),o.push(i?.content||""),o.push("");return o.join(`
`)}_getWritableMessageField(e){let r=["mes","message","content","text"];for(let s of r)if(typeof e?.[s]=="string")return{key:s,text:e[s]};return{key:"mes",text:""}}_applyMessageText(e,r,s={}){let o=e&&typeof e=="object"?e:{},n=["mes","message","content","text"],i=!1;if(n.forEach(a=>{typeof o[a]=="string"&&(o[a]=r,i=!0)}),i||(o.mes=r,o.message=r),Array.isArray(o.swipes)){let a=Number.parseInt(ol(s?.sourceSwipeId||s?.effectiveSwipeId),10),l=Number.isInteger(a)?a:Number.isInteger(o.swipe_id)?o.swipe_id:Number.isInteger(o.swipeId)?o.swipeId:0;l>=0&&l<o.swipes.length&&(o.swipes[l]=r,o.swipe_id=l,o.swipeId=l)}return o}_stripExistingToolOutput(e,r=[]){let s=String(e||"");return(Array.isArray(r)?r:[]).forEach(n=>{let i=String(n||"").trim();if(!i)return;if(i.startsWith("regex:")){try{let c=new RegExp(i.slice(6).trim(),"gis");s=s.replace(c,"")}catch(c){Qe.warn("\u79FB\u9664\u65E7\u5DE5\u5177\u8F93\u51FA\u65F6\u6B63\u5219\u65E0\u6548",{value:i,error:c})}return}let a=i.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),l=new RegExp(`<${a}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${a}>\\s*`,"gi"),d=new RegExp(`\\{${a}\\|[\\s\\S]*?\\}\\s*`,"gi");s=s.replace(l,""),s=s.replace(d,"")}),s.trimEnd()}_stripPreviousStoredToolContent(e,r){let s=String(e||""),o=String(r||"").trim();return o?s.replace(o,"").trimEnd():s.trimEnd()}async _insertToolOutputToBoundAssistantSlot(e,r,s={},o=null){let n=o||this._createWritebackResult(e,s);try{let i=this._getChatRuntime(),{context:a,chat:l}=i;if(!Array.isArray(l)||!l.length)return Qe.error("\u672A\u627E\u5230\u804A\u5929\u6D88\u606F\uFF0C\u65E0\u6CD5\u63D2\u5165\u5DE5\u5177\u8F93\u51FA"),n.error="\u672A\u627E\u5230\u804A\u5929\u6D88\u606F\uFF0C\u65E0\u6CD5\u63D2\u5165\u5DE5\u5177\u8F93\u51FA",n;let d=this._findAssistantMessageIndex(l,s.sourceMessageId);if(d<0)return Qe.error("\u672A\u627E\u5230\u53EF\u5199\u5165\u7684\u6700\u65B0 AI \u56DE\u590D\u6D88\u606F"),n.error="\u672A\u627E\u5230\u53EF\u5199\u5165\u7684\u6700\u65B0 AI \u56DE\u590D\u6D88\u606F",n;if(s?.signal?.aborted)return n.error="\u5DE5\u5177\u7ED3\u679C\u5DF2\u53D6\u6D88\uFF0C\u8DF3\u8FC7\u5199\u56DE",n;if(typeof s?.shouldAbortWriteback=="function")try{if(s.shouldAbortWriteback()===!0)return n.error="\u5DE5\u5177\u7ED3\u679C\u5DF2\u8FC7\u671F\uFF0C\u8DF3\u8FC7\u5199\u56DE",n}catch{return n.error="\u5DE5\u5177\u7ED3\u679C\u5DF2\u8FC7\u671F\uFF0C\u8DF3\u8FC7\u5199\u56DE",n}n.messageIndex=d,n.steps.foundTargetMessage=!0;let c=l[d],{key:u,text:p}=this._getWritableMessageField(c);n.textField=u;let y=c[at]&&typeof c[at]=="object"?c[at]:{},f=y?.[e]||{},m=f?.content||"",b=f?.blockText||m||"",w=Object.entries(y).filter(([Oe])=>Oe!==e).map(([,Oe])=>Oe||{}),S=String(r.content||"").trim(),v=s.replaceFullMessage===!0,K=v?"full_message":this._inferBlockType(S),P={toolId:e,messageId:s.sourceMessageId||c?.message_id||c?.messageId||d,blockType:K,insertedAt:r.updatedAt,replaceable:s.overwrite!==!1};n.blockIdentity=P;let _=s.overwrite===!1||v?{text:String(p||""),removed:!1,replaced:!1}:this._stripExactStoredBlock(p,b,S),T=_.text,F="";!v&&s.overwrite!==!1&&b&&!_.removed&&(F="previous_block_not_found");let U=s.overwrite===!1||_.replaced||v?T:this._stripExistingToolOutput(T,s.extractionSelectors),A=U!==T;T=U;let O=s.overwrite===!1||_.replaced||v?T:this._stripPreviousStoredToolContent(T,m),J=O!==T;T=O,n.replacedExistingBlock=v||_.removed||A||J;let j=s.overwrite===!1?String(p||""):T,Z=v?S:_.replaced?T.trim():[j.trimEnd(),S].filter(Boolean).join(`

`).trim();n.insertedNewBlock=!!S;let ie=w.every(Oe=>{if(Oe?.blockType==="full_message")return!0;let Zt=String(Oe?.blockText||Oe?.content||"").trim();return Zt?Z.includes(Zt):!0});n.preservedOtherToolBlocks=ie,ie?F&&(n.conflictDetected=!0,n.conflictReason=F):(n.conflictDetected=!0,n.conflictReason="other_tool_block_removed");let be={...y,[e]:{toolId:e,content:S,blockText:S,blockType:K,blockIdentity:P,updatedAt:r.updatedAt,sourceMessageId:r.sourceMessageId||null}},Re=Jn(s);if(Re)return n.error=Re,n;c[u]=Z,this._applyMessageText(c,Z,s),c[at]=be,c[Vs]=this._buildMessageInjectedContext(be),n.contentCommitted=!0,n.commit.contentCommitted=!0,n.steps.contentCommitted=!0,n.steps.localTextApplied=!0,this._syncMessageToRuntimeChats(i,d,c),n.steps.runtimeSynced=!0;let H=Jn(s);if(H)return n.error=H,n;await this._requestAssistantMessageRefresh(i,d,Z,s,n);let Ae=a?.saveChat||i?.api?.saveChat||null,ae=a?.saveChatDebounced||i?.api?.saveChatDebounced||null;typeof ae=="function"&&(ae.call(a||api),n.steps.saveChatDebounced=!0,n.refreshRequested=!0,us(n.refresh.requestMethods,"saveChatDebounced")),typeof Ae=="function"&&(await Ae.call(a||api),n.steps.saveChat=!0,n.refreshRequested=!0,us(n.refresh.requestMethods,"saveChat"));let xe=this._notifyMessageUpdated(i,d,s);n.steps.notifiedMessageUpdated=xe?.emitted===!0,n.refresh.eventSource=xe?.source||"",n.refresh.eventName=xe?.eventName||"",xe?.error&&n.errors.push(`MESSAGE_UPDATED: ${xe.error}`);let Qt=String(r.content||"").trim();(n.steps.hostSetChatMessages||n.steps.hostSetChatMessage)&&(n.refreshRequested=!0,us(n.refresh.requestMethods,n.hostUpdateMethod)),n.steps.notifiedMessageUpdated&&(n.refreshRequested=!0,us(n.refresh.requestMethods,`MESSAGE_UPDATED:${n.refresh.eventName||"MESSAGE_UPDATED"}`)),n.steps.refreshRequested=n.refreshRequested,n.refresh.requested=n.refreshRequested;let zt=await this._confirmRefresh(i,l,d,e,Qt,c);return n.verification.textIncludesContent=zt.textIncludesContent,n.verification.mirrorStored=zt.mirrorStored,n.verification.refreshConfirmed=zt.refreshConfirmed,n.steps.verifiedAfterWrite=n.verification.textIncludesContent&&n.verification.mirrorStored,n.refreshConfirmed=n.verification.refreshConfirmed&&n.refreshRequested,n.refresh.confirmChecks=Number(zt.confirmChecks)||0,n.refresh.confirmedBy=zt.confirmedBy||"",n.refresh.confirmed=n.refreshConfirmed,n.steps.refreshConfirmed=n.refreshConfirmed,n.success=n.steps.localTextApplied&&n.steps.runtimeSynced&&n.steps.verifiedAfterWrite&&n.refreshConfirmed,n.writebackStatus=n.success?Xn.SUCCESS:Xn.FAILED,!n.success&&!n.error&&(n.error=n.refreshRequested?"\u5DE5\u5177\u7ED3\u679C\u5DF2\u63D0\u4EA4\uFF0C\u4F46\u5BBF\u4E3B\u5237\u65B0\u786E\u8BA4\u672A\u901A\u8FC7":"\u5DE5\u5177\u7ED3\u679C\u5DF2\u5C1D\u8BD5\u5199\u56DE\uFF0C\u4F46\u6700\u7EC8\u6821\u9A8C\u672A\u901A\u8FC7"),n.conflictDetected&&!n.error&&(n.error=`\u5DE5\u5177\u7ED3\u679C\u5DF2\u5199\u56DE\uFF0C\u4F46\u68C0\u6D4B\u5230\u5757\u51B2\u7A81\uFF1A${n.conflictReason}`),Qe.info(`\u5DF2\u5C06\u5DE5\u5177\u8F93\u51FA\u5199\u5165\u7ED1\u5B9A assistant \u69FD\u4F4D: ${e} -> #${d}`),n}catch(i){return Qe.error("\u63D2\u5165\u6700\u65B0 AI \u56DE\u590D\u539F\u6587\u5931\u8D25",{error:i}),n.error=i?.message||String(i),n.errors.push(n.error),n}}getAssistantMessageSnapshot(e=null){try{let r=this._getChatRuntime(),{chat:s}=r,o=this._findAssistantMessageIndex(s,e);if(o<0)return null;let n=s[o]||null,i=this._getWritableMessageField(n).text||"",a=n?.[at]&&typeof n[at]=="object"?n[at]:{},l=Object.values(a).reduce((d,c)=>{let u=String(c?.blockText||c?.content||"").trim();return!u||!d.includes(u)?d:d.replace(u,"").trimEnd()},String(i||"")).trim();return{messageIndex:o,message:n,messageText:i,baseText:l,toolOutputs:a,injectedContext:typeof n?.[Vs]=="string"?n[Vs]:this._buildMessageInjectedContext(a)}}catch(r){return Qe.warn("\u8BFB\u53D6 assistant \u6D88\u606F\u5FEB\u7167\u5931\u8D25",{error:r}),null}}_getCurrentChatId(){try{let e=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(e.SillyTavern?.getContext){let r=e.SillyTavern.getContext(),o=[r?.chatId,r?.chat_id,r?.chat_filename,r?.chatMetadata?.chatId,r?.chatMetadata?.chat_id,r?.chatMetadata?.file_name,r?.chatMetadata?.name,e.SillyTavern?.chatId,e.SillyTavern?.chat_id,e.SillyTavern?.chat_filename].find(i=>typeof i=="string"&&i.trim());if(o)return o;let n=e.SillyTavern?.this_chid;if(n!=null)return`chat_char_${n}`}return"chat_default"}catch{return"chat_default"}}},mt=new Qn,xb=mt});var up={};oe(up,{BUILTIN_VARIABLES:()=>dp,VariableResolver:()=>Zn,default:()=>vb,variableResolver:()=>It});var wb,dp,Zn,It,vb,ei=L(()=>{Ke();q();wb=C.createScope("VariableResolver"),dp={lastUserMessage:{name:"lastUserMessage",description:"\u6700\u65B0\u7528\u6237\u6D88\u606F",category:"chat"},lastAiMessage:{name:"lastAiMessage",description:"\u6700\u65B0AI\u56DE\u590D",category:"chat"},chatHistory:{name:"chatHistory",description:"\u6700\u8FD1\u804A\u5929\u8BB0\u5F55",category:"chat"},characterCard:{name:"characterCard",description:"\u5F53\u524D\u89D2\u8272\u5361\u5185\u5BB9",category:"character"},toolName:{name:"toolName",description:"\u5DE5\u5177\u540D\u79F0",category:"tool"},toolId:{name:"toolId",description:"\u5DE5\u5177ID",category:"tool"},toolPromptMacro:{name:"toolPromptMacro",description:"\u5F53\u524D\u5DE5\u5177\u6A21\u677F\u63D0\u793A\u8BCD\u5B8F",category:"tool"},toolContentMacro:{name:"toolContentMacro",description:"\u5F53\u524D\u5DE5\u5177\u5904\u7406\u540E\u7684\u5185\u5BB9\u5B8F",category:"tool"},toolWorldbookContent:{name:"toolWorldbookContent",description:"\u5F53\u524D\u5DE5\u5177\u9009\u62E9\u7684\u4E16\u754C\u4E66\u6CE8\u5165\u5185\u5BB9",category:"tool"},injectedContext:{name:"injectedContext",description:"\u5DF2\u6CE8\u5165\u7684\u5DE5\u5177\u4E0A\u4E0B\u6587",category:"context"},extractedContent:{name:"extractedContent",description:"\u5DE5\u5177\u63D0\u53D6\u5185\u5BB9",category:"context"},recentMessagesText:{name:"recentMessagesText",description:"\u6700\u8FD1\u6D88\u606F\u6B63\u6587",category:"context"},rawRecentMessagesText:{name:"rawRecentMessagesText",description:"\u6700\u8FD1\u6D88\u606F\u539F\u6587",category:"context"},userMessage:{name:"userMessage",description:"\u5F53\u524D\u7528\u6237\u6D88\u606F",category:"chat"},previousToolOutput:{name:"previousToolOutput",description:"\u4E0A\u4E00\u6B21\u5DE5\u5177\u8F93\u51FA",category:"context"}},Zn=class{constructor(){this.customVariables=new Map,this.variableHandlers=new Map,this.debugMode=!1,this._registerDefaultHandlers()}resolveTemplate(e,r){if(typeof e!="string")return e;let s=e;return s=this._resolveBuiltinVariables(s,r),s=this._resolveCustomVariables(s,r),s=this._resolveRegexVariables(s,r),s}resolveObject(e,r){if(!e||typeof e!="object")return e;if(Array.isArray(e))return e.map(o=>this.resolveObject(o,r));let s={};for(let[o,n]of Object.entries(e))typeof n=="string"?s[o]=this.resolveTemplate(n,r):typeof n=="object"&&n!==null?s[o]=this.resolveObject(n,r):s[o]=n;return s}buildToolContext(e){return{lastUserMessage:e.lastUserMessage||"",lastAiMessage:e.lastAiMessage||"",chatHistory:e.chatHistory||[],characterCard:e.characterCard||null,characterName:e.characterCard?.name||"",toolName:e.toolName||"",toolId:e.toolId||"",toolPromptMacro:e.toolPromptMacro||"",toolContentMacro:e.toolContentMacro||"",toolWorldbookContent:e.toolWorldbookContent||"",injectedContext:e.injectedContext||"",extractedContent:e.extractedContent||"",recentMessagesText:e.recentMessagesText||"",rawRecentMessagesText:e.rawRecentMessagesText||"",userMessage:e.userMessage||"",previousToolOutput:e.previousToolOutput||"",regexResults:e.regexResults||{},raw:e,timestamp:Date.now()}}registerVariable(e,r){e&&(this.customVariables.set(e,r),this._log(`\u6CE8\u518C\u81EA\u5B9A\u4E49\u53D8\u91CF: ${e}`))}unregisterVariable(e){this.customVariables.delete(e),this._log(`\u6CE8\u9500\u81EA\u5B9A\u4E49\u53D8\u91CF: ${e}`)}registerHandler(e,r){!e||typeof r!="function"||(this.variableHandlers.set(e,r),this._log(`\u6CE8\u518C\u53D8\u91CF\u5904\u7406\u5668: ${e}`))}getAvailableVariables(){let e=[];for(let[,r]of Object.entries(dp))e.push({name:`{{${r.name}}}`,description:r.description,category:r.category,type:"builtin"});for(let[r,s]of this.customVariables)e.push({name:`{{${r}}}`,description:typeof s=="function"?"\u81EA\u5B9A\u4E49\u51FD\u6570\u53D8\u91CF":"\u81EA\u5B9A\u4E49\u9759\u6001\u53D8\u91CF",category:"custom",type:"custom"});return e}getVariableHelp(){let e=["\u53EF\u7528\u53D8\u91CF\uFF1A",""],r={chat:"\u804A\u5929\u76F8\u5173",character:"\u89D2\u8272\u76F8\u5173",tool:"\u5DE5\u5177\u76F8\u5173",context:"\u4E0A\u4E0B\u6587\u76F8\u5173",custom:"\u81EA\u5B9A\u4E49\u53D8\u91CF"},s={};for(let o of this.getAvailableVariables())s[o.category]||(s[o.category]=[]),s[o.category].push(o);for(let[o,n]of Object.entries(r))if(s[o]&&s[o].length>0){e.push(`\u3010${n}\u3011`);for(let i of s[o])e.push(`  ${i.name} - ${i.description}`);e.push("")}return e.push("\u3010\u6B63\u5219\u63D0\u53D6\u3011"),e.push("  {{regex.xxx}} - \u4F7F\u7528\u6B63\u5219\u63D0\u53D6\u7ED3\u679C\uFF0Cxxx\u4E3A\u6355\u83B7\u7EC4\u540D"),e.join(`
`)}_registerDefaultHandlers(){this.registerHandler("regex",(e,r)=>(r.regexResults||r.raw?.regexResults||{})[e]||"")}_resolveBuiltinVariables(e,r){let s=e;return s=s.replace(/\{\{lastUserMessage\}\}/gi,r.lastUserMessage||r.raw?.lastUserMessage||""),s=s.replace(/\{\{lastAiMessage\}\}/gi,r.lastAiMessage||r.raw?.lastAiMessage||""),s=s.replace(/\{\{chatHistory\}\}/gi,()=>{let o=r.chatHistory||r.raw?.chatHistory||[];return this._formatChatHistory(o)}),s=s.replace(/\{\{characterCard\}\}/gi,()=>{let o=r.characterCard||r.raw?.characterCard;return o?this._formatCharacterCard(o):""}),s=s.replace(/\{\{toolName\}\}/gi,r.toolName||r.raw?.toolName||""),s=s.replace(/\{\{toolId\}\}/gi,r.toolId||r.raw?.toolId||""),s=s.replace(/\{\{toolPromptMacro\}\}/gi,r.toolPromptMacro||r.raw?.toolPromptMacro||""),s=s.replace(/\{\{toolContentMacro\}\}/gi,r.toolContentMacro||r.raw?.toolContentMacro||""),s=s.replace(/\{\{toolWorldbookContent\}\}/gi,r.toolWorldbookContent||r.raw?.toolWorldbookContent||""),s=s.replace(/\{\{injectedContext\}\}/gi,r.injectedContext||r.raw?.injectedContext||""),s=s.replace(/\{\{extractedContent\}\}/gi,r.extractedContent||r.raw?.extractedContent||""),s=s.replace(/\{\{recentMessagesText\}\}/gi,r.recentMessagesText||r.raw?.recentMessagesText||""),s=s.replace(/\{\{rawRecentMessagesText\}\}/gi,r.rawRecentMessagesText||r.raw?.rawRecentMessagesText||""),s=s.replace(/\{\{userMessage\}\}/gi,r.userMessage||r.raw?.userMessage||""),s=s.replace(/\{\{previousToolOutput\}\}/gi,r.previousToolOutput||r.raw?.previousToolOutput||""),s}_resolveCustomVariables(e,r){let s=e;for(let[o,n]of this.customVariables){let i=new RegExp(`\\{\\{${this._escapeRegex(o)}\\}\\}`,"gi");typeof n=="function"?s=s.replace(i,()=>{try{return n(r)}catch(a){return this._log(`\u53D8\u91CF\u5904\u7406\u9519\u8BEF ${o}:`,a),""}}):s=s.replace(i,String(n))}return s}_resolveRegexVariables(e,r){let s=e;for(let[o,n]of this.variableHandlers){let i=new RegExp(`\\{\\{${o}\\.([^}]+)\\}\\}`,"gi");s=s.replace(i,(a,l)=>{try{return n(l,r)}catch(d){return this._log(`\u53D8\u91CF\u5904\u7406\u9519\u8BEF ${o}.${l}:`,d),""}})}return s}_formatChatHistory(e){return!Array.isArray(e)||e.length===0?"":e.map(r=>{let s=r.role||"unknown",o=r.content||r.mes||"";return`[${s}]: ${o}`}).join(`

`)}_formatCharacterCard(e){if(!e)return"";let r=[];return e.name&&r.push(`\u59D3\u540D: ${e.name}`),e.description&&r.push(`\u63CF\u8FF0: ${e.description}`),e.personality&&r.push(`\u6027\u683C: ${e.personality}`),e.scenario&&r.push(`\u573A\u666F: ${e.scenario}`),r.join(`

`)}_escapeRegex(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}_log(...e){wb.debug(e[0],e.length>1?e.slice(1):void 0)}},It=new Zn,vb=It});var yp={};oe(yp,{DEFAULT_PROMPT_TEMPLATE:()=>pp,ToolPromptService:()=>ti,default:()=>Tb,toolPromptService:()=>ys});var Sb,pp,ti,ys,Tb,ri=L(()=>{Ke();qs();ei();_n();q();Sb=C.createScope("ToolPromptService"),pp="\u8BF7\u5904\u7406\u4EE5\u4E0BAI\u56DE\u590D\u5185\u5BB9\uFF1A",ti=class{constructor(){this.debugMode=!1}async _buildVariableContext(e,r={}){let s=this._getPromptTemplate(e),o=String(r?.toolWorldbookContent||r?.input?.toolWorldbookContent||await Tn(e)).trim(),n=It.buildToolContext({...r,toolName:e?.name||r?.toolName||"",toolId:e?.id||r?.toolId||"",toolWorldbookContent:o}),i=It.resolveTemplate(s,n).trim(),a=String(r?.toolContentMacro||r?.input?.toolContentMacro||"").trim();return It.buildToolContext({...r,toolName:e?.name||r?.toolName||"",toolId:e?.id||r?.toolId||"",toolPromptMacro:i,toolContentMacro:a,toolWorldbookContent:o})}async buildToolMessages(e,r){if(!e)return this._log("\u6784\u5EFA\u5931\u8D25: \u5DE5\u5177\u914D\u7F6E\u4E3A\u7A7A"),[];let s=[],o=await this._buildVariableContext(e,r),n=Array.isArray(e.promptMessages)?e.promptMessages:[],i=this._getBypassMessages(e),a=i?.some(l=>l.mainSlot==="A"||l.mainSlot==="B"||l.isMain||l.isMain2);if(i&&i.length>0)for(let l of i)l.enabled!==!1&&s.push({role:this._normalizeRole(l.role),content:It.resolveTemplate(l.content||"",o)});if(!a&&n.length>0)for(let l of n){let d=It.resolveTemplate(l?.content||"",o).trim();d&&s.push({role:this._normalizeRole(l?.role),content:d})}else if(!a&&!i?.length){let l=this._buildUserContent(this._getPromptTemplate(e),o);l&&s.push({role:"user",content:l})}return this._log(`\u6784\u5EFA\u6D88\u606F: ${s.length} \u6761`),s}async buildPromptText(e,r){let s=await this._buildVariableContext(e,r),o=Array.isArray(e?.promptMessages)?e.promptMessages:[];return o.length>0?o.map(n=>It.resolveTemplate(n?.content||"",s).trim()).filter(Boolean).join(`

`):s.toolPromptMacro||""}getToolPromptTemplate(e){return this._getPromptTemplate(e)}_getPromptTemplate(e){return e.promptTemplate&&typeof e.promptTemplate=="string"?e.promptTemplate:pp}_getBypassMessages(e){return e.bypass?.enabled?ne.buildBypassMessages(e):[]}_buildUserContent(e,r){return!e||!e.trim()?"":It.resolveTemplate(e,r).trim()}_normalizeRole(e){if(!e)return"user";switch(String(e).toLowerCase()){case"system":return"system";case"assistant":return"assistant";case"user":default:return"user"}}_log(...e){Sb.debug(e[0],e.length>1?e.slice(1):void 0)}setDebugMode(e){this.debugMode=e}},ys=new ti,Tb=ys});var gp={};oe(gp,{LEGACY_OUTPUT_MODES:()=>_b,OUTPUT_MODES:()=>ht,TOOL_FAILURE_STAGES:()=>Be,TOOL_RUNTIME_STATUS:()=>Eb,TOOL_WRITEBACK_STATUS:()=>$e,ToolOutputService:()=>si,default:()=>Ab,toolOutputService:()=>bt});function fp(t){if(t?.signal?.aborted)return{aborted:!0,stale:!1,reason:"cancelled_before_host_commit"};if(typeof t?.shouldAbortWriteback=="function")try{return t.shouldAbortWriteback()||!1}catch{return{aborted:!0,stale:!0,reason:"stale_base_changed"}}return!1}function Js(t=[],e="",r=null){return{request:{built:Array.isArray(t)&&t.length>0,messageCount:Array.isArray(t)?t.length:0},extract:{completed:!0,hasOutput:!!String(e||"").trim()},writeback:{attempted:!!r,contentCommitted:!!r?.contentCommitted,hostCommitApplied:!!r?.hostCommitApplied,writebackStatus:r?.writebackStatus||"",preferredCommitMethod:r?.commit?.preferredMethod||"",appliedCommitMethod:r?.commit?.appliedMethod||"",fallbackUsed:!!r?.commit?.fallbackUsed},refresh:{requested:!!r?.refreshRequested,confirmed:!!r?.refreshConfirmed,requestMethods:Array.isArray(r?.refresh?.requestMethods)?[...r.refresh.requestMethods]:[],confirmChecks:Number(r?.refresh?.confirmChecks)||0,confirmedBy:r?.refresh?.confirmedBy||""}}}var fs,ht,_b,Eb,Be,$e,si,bt,Ab,jo=L(()=>{Ke();Uo();q();ps();ri();Rs();ss();cn();fs=C.createScope("ToolOutputService"),ht={FOLLOW_AI:"follow_ai",POST_RESPONSE_API:"post_response_api",LOCAL_TRANSFORM:"local_transform"},_b={inline:"follow_ai"},Eb={IDLE:"idle",RUNNING:"running",SUCCESS:"success",ERROR:"error"},Be={BUILD_MESSAGES:"build_messages",SEND_API_REQUEST:"send_api_request",EXTRACT_OUTPUT:"extract_output",INJECT_CONTEXT:"inject_context",COMPATIBILITY_EXECUTE:"compatibility_execute",UNKNOWN:"unknown"},$e={SUCCESS:"success",FAILED:"failed",SKIPPED_EMPTY_OUTPUT:"skipped_empty_output",NOT_APPLICABLE:"not_applicable"};si=class{constructor(){this.debugMode=!1,this._apiConnection=null}shouldRunPostResponse(e){return!e||!e.enabled||!e.output?.enabled?!1:e.output?.mode===ht.POST_RESPONSE_API}shouldRunLocalTransform(e){return!e||!e.enabled||!e.output?.enabled?!1:e.output?.mode===ht.LOCAL_TRANSFORM||!!e.processor?.type}shouldRunFollowAi(e){if(!e||!e.enabled||!e.output?.enabled)return!1;let r=e.output?.mode;return r===ht.FOLLOW_AI||r==="inline"}shouldRunInline(e){return this.shouldRunFollowAi(e)}async runToolPostResponse(e,r){let s=Date.now(),o=e.id,n=r?.traceId||`trace_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,i=r?.sessionKey||"",a=r?.executionKey||"",l=this._getExtractionSelectors(e),d=e.output?.apiPreset||e.apiPreset||"",c="",u=$e.NOT_APPLICABLE,p=null,y=[],f="";fs.info(`\u5F00\u59CB\u6267\u884C\u5DE5\u5177: ${o}`),z.emit(D.TOOL_EXECUTION_STARTED,{toolId:o,traceId:n,sessionKey:i,mode:ht.POST_RESPONSE_API});try{if(c=Be.BUILD_MESSAGES,y=await this._buildToolMessages(e,r),!y||y.length===0)throw new Error("\u672A\u6784\u5EFA\u51FA\u53EF\u53D1\u9001\u7684\u5DE5\u5177\u8BF7\u6C42\u6D88\u606F\uFF0C\u8BF7\u68C0\u67E5\u63D0\u793A\u8BCD\u6A21\u677F\u6216\u7834\u9650\u8BCD\u914D\u7F6E\u662F\u5426\u4E3A\u7A7A\u3002");fs.debug(`\u6784\u5EFA\u4E86 ${y.length} \u6761\u6D88\u606F`);let m=fp(r);if(m){let K=Date.now()-s;return{success:!1,toolId:o,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88",duration:K,meta:{traceId:n,sessionKey:i,executionKey:a,sourceMessageId:r?.sourceMessageId||r?.confirmedAssistantMessageId||r?.messageId||"",sourceSwipeId:r?.sourceSwipeId||r?.confirmedAssistantSwipeId||r?.effectiveSwipeId||"",slotRevisionKey:r?.slotRevisionKey||"",selectors:l,apiPreset:d,writebackStatus:u,failureStage:c,writebackDetails:p,aborted:m.aborted===!0,stale:m.stale===!0,abortReason:m.reason||"",phases:Js(y,f,p)}}}let b=await this._getRequestTimeout();c=Be.SEND_API_REQUEST;let w=await this._sendApiRequest(d,y,{timeoutMs:b,signal:r.signal});c=Be.EXTRACT_OUTPUT,f=this._extractOutputContent(w,e);let S=fp(r);if(S){let K=Date.now()-s;return{success:!1,toolId:o,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88",duration:K,meta:{traceId:n,sessionKey:i,executionKey:a,sourceMessageId:r?.sourceMessageId||r?.confirmedAssistantMessageId||r?.messageId||"",sourceSwipeId:r?.sourceSwipeId||r?.confirmedAssistantSwipeId||r?.effectiveSwipeId||"",slotRevisionKey:r?.slotRevisionKey||"",selectors:l,apiPreset:d,writebackStatus:u,failureStage:c,writebackDetails:p,aborted:S.aborted===!0,stale:S.stale===!0,abortReason:S.reason||"",phases:Js(y,f,p)}}}if(f){if(c=Be.INJECT_CONTEXT,p=await mt.injectDetailed(o,f,{overwrite:e.output?.overwrite!==!1,sourceMessageId:r.sourceMessageId||r.confirmedAssistantMessageId||r.messageId||"",sourceSwipeId:r.sourceSwipeId||r.confirmedAssistantSwipeId||r.effectiveSwipeId||"",effectiveSwipeId:r.effectiveSwipeId||r.confirmedAssistantSwipeId||"",slotBindingKey:r.slotBindingKey||"",slotRevisionKey:r.slotRevisionKey||"",slotTransactionId:r.slotTransactionId||"",extractionSelectors:l,traceId:n,sessionKey:i,signal:r.signal,shouldAbortWriteback:r.shouldAbortWriteback,isAutoRun:r.isAutoRun===!0,skipNotify:r.skipNotify===!0}),!p?.success)throw u=$e.FAILED,new Error(p?.error||"\u5DE5\u5177\u7ED3\u679C\u5DF2\u751F\u6210\uFF0C\u4F46\u5199\u5165\u4E0A\u4E0B\u6587/\u4E16\u754C\u4E66\u5931\u8D25");u=$e.SUCCESS}else u=$e.SKIPPED_EMPTY_OUTPUT;c="";let v=Date.now()-s;return z.emit(D.TOOL_EXECUTED,{toolId:o,traceId:n,sessionKey:i,success:!0,duration:v,mode:ht.POST_RESPONSE_API}),fs.info(`\u5DE5\u5177\u6267\u884C\u6210\u529F: ${o}, \u8017\u65F6 ${v}ms`),{success:!0,toolId:o,output:f,duration:v,meta:{traceId:n,sessionKey:i,executionKey:a,slotBindingKey:r?.slotBindingKey||"",slotTransactionId:r?.slotTransactionId||"",generationAction:r?.generationAction||"",generationActionSource:r?.generationActionSource||"",rawGenerationType:r?.rawGenerationType||"",normalizedGenerationType:r?.normalizedGenerationType||"",generationMessageBindingSource:r?.generationMessageBindingSource||"",sourceMessageId:r?.sourceMessageId||r?.confirmedAssistantMessageId||r?.messageId||"",sourceSwipeId:r?.sourceSwipeId||r?.confirmedAssistantSwipeId||r?.effectiveSwipeId||"",confirmedAssistantSwipeId:r?.confirmedAssistantSwipeId||"",effectiveSwipeId:r?.effectiveSwipeId||"",slotRevisionKey:r?.slotRevisionKey||"",messageCount:y.length,selectors:l,apiPreset:d,writebackStatus:u,failureStage:"",writebackDetails:p,phases:Js(y,f,p)}}}catch(m){let b=Date.now()-s,w=c||Be.UNKNOWN,S=u||$e.NOT_APPLICABLE;return fs.error(`\u5DE5\u5177\u6267\u884C\u5931\u8D25: ${o}`,{error:m}),z.emit(D.TOOL_EXECUTION_FAILED,{toolId:o,traceId:n,sessionKey:i,error:m.message||String(m),duration:b}),{success:!1,toolId:o,error:m.message||String(m),duration:b,meta:{traceId:n,sessionKey:i,executionKey:a,slotBindingKey:r?.slotBindingKey||"",slotTransactionId:r?.slotTransactionId||"",generationAction:r?.generationAction||"",generationActionSource:r?.generationActionSource||"",rawGenerationType:r?.rawGenerationType||"",normalizedGenerationType:r?.normalizedGenerationType||"",generationMessageBindingSource:r?.generationMessageBindingSource||"",sourceMessageId:r?.sourceMessageId||r?.confirmedAssistantMessageId||r?.messageId||"",sourceSwipeId:r?.sourceSwipeId||r?.confirmedAssistantSwipeId||r?.effectiveSwipeId||"",confirmedAssistantSwipeId:r?.confirmedAssistantSwipeId||"",effectiveSwipeId:r?.effectiveSwipeId||"",slotRevisionKey:r?.slotRevisionKey||"",messageCount:y.length,selectors:l,apiPreset:d,writebackStatus:S,failureStage:w,writebackDetails:p,phases:Js(y,f,p)}}}}async runToolFollowAiManual(e,r){let s=Date.now(),o=e.id,n=r?.traceId||`trace_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,i=r?.sessionKey||"",a=r?.executionKey||"",l=e.output?.apiPreset||e.apiPreset||"",d=this._getExtractionSelectors(e),c="",u=$e.NOT_APPLICABLE,p=null,y=[],f="";z.emit(D.TOOL_EXECUTION_STARTED,{toolId:o,traceId:n,sessionKey:i,mode:ht.FOLLOW_AI});try{if(c=Be.BUILD_MESSAGES,y=await this._buildToolMessages(e,r),!y||y.length===0)throw new Error("\u672A\u6784\u5EFA\u51FA\u53EF\u53D1\u9001\u7684\u5DE5\u5177\u8BF7\u6C42\u6D88\u606F\uFF0C\u8BF7\u68C0\u67E5\u63D0\u793A\u8BCD\u6A21\u677F\u6216\u7834\u9650\u8BCD\u914D\u7F6E\u662F\u5426\u4E3A\u7A7A\u3002");let m=await this._getRequestTimeout();c=Be.SEND_API_REQUEST;let b=await this._sendApiRequest(l,y,{timeoutMs:m,signal:r.signal});if(c=Be.EXTRACT_OUTPUT,f=this._extractOutputContent(b,e),f){if(c=Be.INJECT_CONTEXT,p=await mt.injectDetailed(o,f,{overwrite:e.output?.overwrite!==!1,sourceMessageId:r.sourceMessageId||r.confirmedAssistantMessageId||r.messageId||"",sourceSwipeId:r.sourceSwipeId||r.confirmedAssistantSwipeId||r.effectiveSwipeId||"",effectiveSwipeId:r.effectiveSwipeId||r.confirmedAssistantSwipeId||"",slotBindingKey:r.slotBindingKey||"",slotRevisionKey:r.slotRevisionKey||"",slotTransactionId:r.slotTransactionId||"",extractionSelectors:d,traceId:n,sessionKey:i}),!p?.success)throw u=$e.FAILED,new Error(p?.error||"\u5DE5\u5177\u7ED3\u679C\u5DF2\u751F\u6210\uFF0C\u4F46\u5199\u5165\u4E0A\u4E0B\u6587/\u4E16\u754C\u4E66\u5931\u8D25");u=$e.SUCCESS}else u=$e.SKIPPED_EMPTY_OUTPUT;c="";let w=Date.now()-s;return z.emit(D.TOOL_EXECUTED,{toolId:o,traceId:n,sessionKey:i,success:!0,duration:w,mode:ht.FOLLOW_AI}),{success:!0,toolId:o,output:f,duration:w,meta:{traceId:n,sessionKey:i,executionKey:a,slotBindingKey:r?.slotBindingKey||"",slotTransactionId:r?.slotTransactionId||"",sourceMessageId:r?.sourceMessageId||r?.confirmedAssistantMessageId||r?.messageId||"",sourceSwipeId:r?.sourceSwipeId||r?.confirmedAssistantSwipeId||r?.effectiveSwipeId||"",confirmedAssistantSwipeId:r?.confirmedAssistantSwipeId||"",effectiveSwipeId:r?.effectiveSwipeId||"",slotRevisionKey:r?.slotRevisionKey||"",messageCount:y.length,selectors:d,apiPreset:l,writebackStatus:u,failureStage:"",writebackDetails:p,phases:Js(y,f,p)}}}catch(m){let b=Date.now()-s,w=c||Be.UNKNOWN,S=u||$e.NOT_APPLICABLE;return z.emit(D.TOOL_EXECUTION_FAILED,{toolId:o,traceId:n,sessionKey:i,error:m.message||String(m),duration:b,mode:ht.FOLLOW_AI}),{success:!1,toolId:o,error:m.message||String(m),duration:b,meta:{traceId:n,sessionKey:i,executionKey:a,slotBindingKey:r?.slotBindingKey||"",slotTransactionId:r?.slotTransactionId||"",sourceMessageId:r?.sourceMessageId||r?.confirmedAssistantMessageId||r?.messageId||"",sourceSwipeId:r?.sourceSwipeId||r?.confirmedAssistantSwipeId||r?.effectiveSwipeId||"",confirmedAssistantSwipeId:r?.confirmedAssistantSwipeId||"",effectiveSwipeId:r?.effectiveSwipeId||"",slotRevisionKey:r?.slotRevisionKey||"",messageCount:y.length,selectors:d,apiPreset:l,writebackStatus:S,failureStage:w,writebackDetails:p,phases:Js(y,f,p)}}}}async runToolInline(e,r){return this.runToolFollowAiManual(e,r)}async previewExtraction(e,r){return{success:!0,...this.getExtractionSnapshot(e,r)}}getExtractionSnapshot(e,r){let s=this._buildRecentMessageExtractionEntries(e,r),o=this._joinMessageBlocks(s,"rawText"),n=this._joinMessageBlocks(s,"filteredText"),i=this._joinMessageBlocks(s,"extractedText",{skipEmpty:!0}),a=(Array.isArray(s)?s:[]).map(d=>String(d?.extractedText||"").trim()).filter(Boolean).join(`

`),l=Array.isArray(s)&&s.length>0?s[s.length-1]:null;return{sourceText:o,filteredSourceText:n,extractedText:i,extractedRawText:a,messageEntries:s,primaryEntry:l,selectors:this._getExtractionSelectors(e),maxMessages:e?.extraction?.maxMessages||5}}async _buildToolMessages(e,r){let s=this._buildRecentMessageExtractionEntries(e,r),o=this._joinMessageBlocks(s,"rawText"),n=this._joinMessageBlocks(s,"filteredText"),i=this._joinMessageBlocks(s,"extractedText",{skipEmpty:!0}),a={...r,rawRecentMessagesText:o,recentMessagesText:n,extractedContent:i,toolContentMacro:this._buildToolContentMacro(s),toolName:e.name,toolId:e.id};return ys.buildToolMessages(e,a)}_normalizeRole(e){if(!e)return"user";let r=String(e).toLowerCase();return r==="system"?"system":r==="assistant"?"assistant":"user"}setApiConnection(e){this._apiConnection=e}async _sendApiRequest(e,r,s={}){if(!this._apiConnection)throw new Error("API\u8FDE\u63A5\u6A21\u5757\u672A\u914D\u7F6E");let{timeoutMs:o=9e4,signal:n}=s,i=null;if(e){if(!uo(e))throw new Error(`\u672A\u627E\u5230 API \u9884\u8BBE\u201C${e}\u201D\uFF0C\u8BF7\u91CD\u65B0\u9009\u62E9\u6216\u4FDD\u5B58\u540E\u518D\u6267\u884C`);i=co(e)}else i=co();let a=ln(i||{});if(!a.valid&&!i?.useMainApi)throw new Error(`API\u914D\u7F6E\u65E0\u6548\uFF1A${a.errors.join("\uFF0C")}\u3002\u8BF7\u5148\u5B8C\u5584\u81EA\u5B9A\u4E49API\u914D\u7F6E\uFF0C\u6216\u542F\u7528\u201C\u4F7F\u7528SillyTavern\u4E3BAPI\u201D`);if(this._apiConnection.sendApiRequest)return await this._apiConnection.sendApiRequest(r,{timeoutMs:o,apiConfig:i},n);throw new Error("\u6CA1\u6709\u53EF\u7528\u7684API\u53D1\u9001\u65B9\u6CD5")}async _getRequestTimeout(){return Ct.getSettings().executor?.requestTimeoutMs||9e4}_extractOutputContent(e,r){if(!e)return"";if(typeof e=="string")return this._applyOutputExtractionSelectors(e,r);if(typeof e=="object"){if(e.choices&&e.choices[0]?.message?.content)return this._applyOutputExtractionSelectors(e.choices[0].message.content,r);if(e.content)return this._applyOutputExtractionSelectors(e.content,r);if(e.text)return this._applyOutputExtractionSelectors(e.text,r);if(e.message)return this._applyOutputExtractionSelectors(e.message,r);try{return this._applyOutputExtractionSelectors(JSON.stringify(e,null,2),r)}catch{return this._applyOutputExtractionSelectors(String(e),r)}}return this._applyOutputExtractionSelectors(String(e),r)}_applyOutputExtractionSelectors(e,r){let s=typeof e=="string"?e:String(e||""),o=this._getExtractionSelectors(r);if(!o.length)return s.trim();let n=[];for(let i of o){let a=String(i||"").trim();if(!a)continue;if(a.startsWith("regex:")){let d=a.slice(6).trim();if(!d)continue;try{let c=new RegExp(d,"gi");[...s.matchAll(c)].forEach(p=>{let y=String(p?.[0]||"").trim();y&&n.push(y)})}catch(c){fs.warn("\u5DE5\u5177\u8F93\u51FA\u6B63\u5219\u63D0\u53D6\u5931\u8D25\uFF0C\u8DF3\u8FC7\u8BE5\u89C4\u5219",{selector:a,error:c})}continue}let l=a.replace(/^<|>$/g,"").trim();if(l)try{let d=new RegExp(`<${l}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${l}>`,"gi");(s.match(d)||[]).forEach(u=>{let p=String(u||"").trim();p&&n.push(p)})}catch(d){fs.warn("\u5DE5\u5177\u8F93\u51FA\u6807\u7B7E\u63D0\u53D6\u5931\u8D25\uFF0C\u8DF3\u8FC7\u8BE5\u89C4\u5219",{selector:a,error:d})}}return n.length>0?n.join(`

`).trim():s.trim()}_resolveExtractionContext(e){let r=e?.extraction?.regexPresetId;if(!r)return{rules:[],blacklist:[]};try{let s=lr(r);if(!s)return{rules:[],blacklist:[]};let o=Array.isArray(s.rules)?s.rules.filter(i=>i&&i.enabled!==!1&&i.value).map(i=>({id:i.id,type:i.type,value:i.value,enabled:!0})):[],n=Array.isArray(s.blacklist)?s.blacklist.map(i=>String(i||"").trim()).filter(Boolean):[];return{rules:o,blacklist:n}}catch(s){return this._log("warn","_resolveExtractionContext \u5F02\u5E38",{error:s}),{rules:[],blacklist:[]}}}_getExtractionSelectors(e){let{rules:r}=this._resolveExtractionContext(e),s=[];for(let o of r){let n=String(o.value||"").trim();n&&(o.type==="include"?s.push(n):o.type==="regex_include"&&s.push(`regex:${n}`))}return s}_applyExtractionSelectors(e,r){return this._applyExtractionSelectorsInternal(e,r,{strict:!1})}_applyExtractionSelectorsInternal(e,r,s={}){let o=typeof e=="string"?e:String(e||""),{rules:n,blacklist:i}=this._resolveExtractionContext(r),{strict:a=!1}=s;if(!n.length)return o.trim();let l=or(o,n,i||[]);return a?(l||"").trim():l||o.trim()}_extractToolContent(e,r){let s=typeof r=="string"?r:String(r||""),{rules:o}=this._resolveExtractionContext(e);return o.length?this._applyExtractionSelectorsInternal(s,e,{strict:!0}):s.trim()}_applyGlobalContextRules(e){let r=typeof e=="string"?e:String(e||"");if(!r.trim())return"";try{let s=Is()||[],o=Ms()||[];return!Array.isArray(s)||s.length===0?r.trim():or(r,s,o)||r.trim()}catch(s){return fs.warn("\u5E94\u7528\u5168\u5C40\u6B63\u6587\u63D0\u53D6\u89C4\u5219\u5931\u8D25\uFF0C\u56DE\u9000\u539F\u59CB\u6587\u672C",{error:s}),r.trim()}}_getMessageText(e){if(!e)return"";let r=[e.content,e.mes,e.message,e.text,e?.data?.content];for(let s of r)if(typeof s=="string"&&s.trim())return s.trim();return""}_collectRecentAssistantMessages(e,r){return this._collectRecentAssistantMessageEntries(e,r).map(s=>s.text).filter(Boolean).join(`

`)}_collectRecentAssistantMessageEntries(e,r){let s=Math.max(1,parseInt(e?.extraction?.maxMessages,10)||5),o=Array.isArray(r?.chatMessages)?r.chatMessages:[],n=[];for(let a=o.length-1;a>=0&&n.length<s;a-=1){let l=o[a],d=String(l?.role||"").toLowerCase(),c=d==="assistant"||d==="ai"||!l?.is_user&&!l?.is_system&&!d,u=this._getMessageText(l);c&&u&&n.unshift({text:u,message:l,chatIndex:a})}if(n.length>0)return n;let i=r?.lastAiMessage||r?.input?.lastAiMessage||"";return i?[{text:i,message:null,chatIndex:-1}]:[]}_buildRecentMessageExtractionEntries(e,r){return this._collectRecentAssistantMessageEntries(e,r).map((o,n)=>{let i=o.text||"",a=this._applyGlobalContextRules(i),l=this._extractToolContent(e,i);return{...o,order:n+1,rawText:i,filteredText:a,extractedText:l,fullMessageText:i}})}_joinMessageBlocks(e,r,s={}){let o=Array.isArray(e)?e:[],{skipEmpty:n=!1}=s;return o.map(a=>{let l=String(a?.[r]||"").trim();return n&&!l?"":`${`\u3010\u7B2C ${a?.order||0} \u6761 AI \u6D88\u606F\u3011`}
${l||"(\u7A7A)"}`}).filter(Boolean).join(`

--------------------------------

`)}_buildToolContentMacro(e){return(Array.isArray(e)?e:[]).map(o=>{let n=`\u3010\u7B2C ${o?.order||0} \u6761 AI \u6D88\u606F\u3011`,i=String(o?.filteredText||"").trim()||"(\u7A7A)",a=String(o?.extractedText||"").trim()||"(\u7A7A)";return`${n}
\u6B63\u6587\uFF1A
${i}

\u5DE5\u5177\uFF1A
${a}`}).filter(Boolean).join(`

--------------------------------

`).trim()}filterPostResponseTools(e){return Array.isArray(e)?e.filter(r=>this.shouldRunPostResponse(r)):[]}filterAutoPostResponseTools(e){return Array.isArray(e)?e.filter(r=>this.shouldRunPostResponse(r)):[]}filterInlineTools(e){return Array.isArray(e)?e.filter(r=>this.shouldRunInline(r)):[]}setDebugMode(e){this.debugMode=e}},bt=new si,Ab=bt});function hp(t={}){return!t||typeof t!="object"?{}:Object.entries(t).reduce((e,[r,s])=>(e[r]=s===!0,e),{})}function Ib(t,e={}){let r=e?.direction==="unescape"?"unescape":"escape",s=hp(e?.options);return Cb.reduce((o,n)=>s[n.key]!==!0?o:r==="unescape"?o.replace(n.escaped,n.unescaped):o.replace(n.plain,n.replacement),String(t||""))}function Mb(t,e={}){if((e?.direction||"en_to_zh")!=="en_to_zh")return String(t||"");let s=hp(e?.options);return kb.reduce((o,n)=>s[n.key]!==!0?o:o.replace(n.from,n.to),String(t||""))}function Rb(t,e){let r=t?.processor||{},s=r?.type||"",o=String(e||"");switch(s){case mp.ESCAPE_TRANSFORM:return Ib(o,r);case mp.PUNCTUATION_TRANSFORM:return Mb(o,r);default:return o}}function Pb(t,e,r){let s=String(t||""),o=String(e||"").trim(),n=String(r||"").trim();return!s.trim()||!o?{nextMessageText:"",replaced:!1}:s.includes(o)?{nextMessageText:s.replace(o,n).trim(),replaced:!0}:{nextMessageText:"",replaced:!1}}async function oi(t,e={}){let r=bt.getExtractionSnapshot(t,e),s=r?.primaryEntry||null,o=String(s?.fullMessageText||e?.lastAiMessage||"").trim(),n=String(s?.extractedText||r?.extractedRawText||r?.extractedText||"").trim(),i=Array.isArray(r?.selectors)?r.selectors:[],a=e?.traceId||`trace_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,l=e?.sessionKey||"";if(!n||!o)return{success:!1,error:"\u672A\u63D0\u53D6\u5230\u53EF\u5904\u7406\u5185\u5BB9\uFF0C\u8BF7\u5148\u68C0\u67E5\u6807\u7B7E\u6216\u6B63\u5219\u89C4\u5219",meta:{traceId:a,sessionKey:l,selectors:i,writebackStatus:$e.NOT_APPLICABLE,failureStage:Be.EXTRACT_OUTPUT,extraction:r}};let d=String(Rb(t,n)||"").trim(),c=Pb(o,n,d),u=c.replaced?c.nextMessageText:d,p=null,y=$e.NOT_APPLICABLE;if(u){if(p=await mt.injectDetailed(t.id,u,{overwrite:!0,sourceMessageId:e?.sourceMessageId||e?.confirmedAssistantMessageId||e?.messageId||"",sourceSwipeId:e?.sourceSwipeId||e?.confirmedAssistantSwipeId||e?.effectiveSwipeId||"",effectiveSwipeId:e?.effectiveSwipeId||e?.confirmedAssistantSwipeId||"",slotBindingKey:e?.slotBindingKey||"",slotRevisionKey:e?.slotRevisionKey||"",slotTransactionId:e?.slotTransactionId||"",extractionSelectors:[],replaceFullMessage:c.replaced,traceId:a,sessionKey:l,skipNotify:e?.skipNotify===!0}),!p?.success)return{success:!1,error:p?.error||"\u672C\u5730\u5904\u7406\u5B8C\u6210\uFF0C\u4F46\u5199\u56DE\u5931\u8D25",meta:{traceId:a,sessionKey:l,selectors:i,writebackStatus:$e.FAILED,failureStage:Be.INJECT_CONTEXT,writebackDetails:p,extraction:r}};y=$e.SUCCESS}else y=$e.SKIPPED_EMPTY_OUTPUT;return{success:!0,output:d,writebackState:u?{committed:p?.contentCommitted===!0}:null,meta:{traceId:a,sessionKey:l,selectors:i,writebackStatus:y,failureStage:"",writebackDetails:p,extraction:r}}}var Cb,kb,mp,nl=L(()=>{jo();ps();Cb=[{key:"newline",plain:/\r\n|\r|\n/g,escaped:/\\n/g,replacement:"\\n",unescaped:`
`},{key:"doubleQuote",plain:/"/g,escaped:/\\"/g,replacement:'\\"',unescaped:'"'},{key:"singleQuote",plain:/'/g,escaped:/\\'/g,replacement:"\\'",unescaped:"'"}],kb=[{key:"comma",from:/,/g,to:"\uFF0C"},{key:"period",from:/\./g,to:"\u3002"},{key:"exclamation",from:/!/g,to:"\uFF01"},{key:"question",from:/\?/g,to:"\uFF1F"},{key:"semicolon",from:/;/g,to:"\uFF1B"},{key:"colon",from:/:/g,to:"\uFF1A"},{key:"leftParen",from:/\(/g,to:"\uFF08"},{key:"rightParen",from:/\)/g,to:"\uFF09"}],mp={ESCAPE_TRANSFORM:"escape_transform",PUNCTUATION_TRANSFORM:"punctuation_transform"}});var al={};oe(al,{abortAllTasks:()=>Db,abortTask:()=>Nb,buildToolMessages:()=>wp,clearExecutionHistory:()=>jb,createExecutionContext:()=>Gb,createResult:()=>ni,enhanceMessagesWithBypass:()=>Yb,executeBatch:()=>Lb,executeTool:()=>xp,executeToolWithConfig:()=>vp,executeToolsBatch:()=>Jb,executorState:()=>Me,extractFailed:()=>Hb,extractSuccessful:()=>Fb,generateTaskId:()=>gs,getExecutionHistory:()=>Ub,getExecutorStatus:()=>Kb,getScheduler:()=>Xs,mergeResults:()=>Wb,pauseExecutor:()=>Bb,resumeExecutor:()=>zb,setMaxConcurrent:()=>Ob});function ni(t,e,r,s,o,n,i=0){return{success:r,taskId:t,toolId:e,data:s,error:o,duration:n,retries:i,timestamp:Date.now(),metadata:{}}}function gs(){return`task_${Date.now()}_${Math.random().toString(36).substr(2,9)}`}function $b(t,e={}){return{id:gs(),toolId:t,options:e,status:"pending",createdAt:Date.now(),startedAt:null,completedAt:null,retries:0,maxRetries:e.maxRetries||3}}function Xs(){return Wo||(Wo=new il(Me.maxConcurrent)),Wo}function Ob(t){Me.maxConcurrent=Math.max(1,Math.min(10,t)),Wo&&(Wo.maxConcurrent=Me.maxConcurrent)}async function xp(t,e={},r){let s=Xs(),o=$b(t,e);for(;Me.isPaused;)await new Promise(n=>setTimeout(n,100));try{let n=await s.enqueue(async i=>{if(i.aborted)throw new DOMException("\u4EFB\u52A1\u5DF2\u4E2D\u6B62","AbortError");if(typeof r=="function")return await r(i,e);throw new Error("\u6267\u884C\u5668\u5FC5\u987B\u662F\u4E00\u4E2A\u51FD\u6570")},o);return bp(n),n}catch(n){let i=ni(o.id,t,!1,null,n,Date.now()-o.createdAt,o.retries);return bp(i),i}}async function Lb(t,e={}){let{failFast:r=!1,concurrency:s=Me.maxConcurrent}=e,o=[],n=Xs(),i=n.maxConcurrent;n.maxConcurrent=s;try{let a=t.map(({toolId:l,options:d,executor:c})=>xp(l,d,c));if(r)for(let l of a){let d=await l;if(o.push(d),!d.success){n.abortAll();break}}else{let l=await Promise.allSettled(a);for(let d of l)d.status==="fulfilled"?o.push(d.value):o.push(ni(gs(),"unknown",!1,null,d.reason,0,0))}}finally{n.maxConcurrent=i}return o}function Nb(t){return Xs().abort(t)}function Db(){Xs().abortAll(),Me.executionQueue=[]}function Bb(){Me.isPaused=!0}function zb(){Me.isPaused=!1}function Kb(){return{...Xs().getStatus(),isPaused:Me.isPaused,activeControllers:Me.activeControllers.size,historyCount:Me.executionHistory.length}}function bp(t){Me.executionHistory.push(t),Me.executionHistory.length>100&&Me.executionHistory.shift()}function Ub(t={}){let e=[...Me.executionHistory];return t.toolId&&(e=e.filter(r=>r.toolId===t.toolId)),t.success!==void 0&&(e=e.filter(r=>r.success===t.success)),t.limit&&(e=e.slice(-t.limit)),e}function jb(){Me.executionHistory=[]}function Wb(t){let e={success:!0,data:[],errors:[],totalDuration:0,successCount:0,failureCount:0};for(let r of t)e.totalDuration+=r.duration,r.success?(e.successCount++,r.data!==void 0&&r.data!==null&&e.data.push(r.data)):(e.success=!1,e.failureCount++,r.error&&e.errors.push({taskId:r.taskId,toolId:r.toolId,error:r.error.message||String(r.error)}));return e}function Fb(t){return t.filter(e=>e.success).map(e=>e.data)}function Hb(t){return t.filter(e=>!e.success).map(e=>({taskId:e.taskId,toolId:e.toolId,error:e.error}))}function Gb(t={}){return{taskId:gs(),startTime:Date.now(),signal:t.signal||null,apiConfig:t.apiConfig||null,bypassMessages:t.bypassMessages||[],context:t.context||{},metadata:t.metadata||{}}}function Yb(t,e){return!e||e.length===0?t:[...e,...t]}function qb(t){return t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function wp(t,e){let r=[],s=t.promptTemplate||"",o={"{{userMessage}}":e.input?.userMessage||"","{{lastAiMessage}}":e.input?.lastAiMessage||"","{{extractedContent}}":e.input?.extractedContent||"","{{previousToolOutput}}":e.input?.previousToolOutput||"","{{context}}":JSON.stringify(e.input?.context||{}),"{{pg}}":e.input?.context?.pg||"1","{{time}}":e.input?.context?.time||"","{{scene}}":e.input?.context?.scene||"","{{plot}}":e.input?.context?.plot||"","{{mq}}":e.input?.context?.mq||"\u2160","{{mqStatus}}":e.input?.context?.mqStatus||"\u8FDB\u884C\u4E2D","{{sq}}":e.input?.context?.sq||"1","{{sqStatus}}":e.input?.context?.sqStatus||"\u8FDB\u884C\u4E2D","{{latestSq}}":e.input?.context?.latestSq||"1","{{completed}}":e.input?.context?.completed||"\u65E0","{{defined}}":e.input?.context?.defined||"","{{status}}":e.input?.context?.status||"","{{seeds}}":e.input?.context?.seeds||"","{{name}}":e.input?.context?.name||"","{{location}}":e.input?.context?.location||"","{{condition}}":e.input?.context?.condition||"","{{equipment}}":e.input?.context?.equipment||"","{{skills}}":e.input?.context?.skills||""};for(let[n,i]of Object.entries(o))s=s.replace(new RegExp(qb(n),"g"),i);return r.push({role:"USER",content:s}),r}async function vp(t,e,r={}){let s=se(t);if(!s)return{success:!1,taskId:gs(),toolId:t,error:"\u5DE5\u5177\u914D\u7F6E\u4E0D\u5B58\u5728",duration:0};if(!s.enabled)return{success:!1,taskId:gs(),toolId:t,error:"\u5DE5\u5177\u672A\u542F\u7528",duration:0};let o=Date.now(),n=gs();try{z.emit(D.TOOL_EXECUTION_STARTED,{toolId:t,taskId:n,context:e});let i=wp(s,e);if(typeof r.callApi=="function"){let a=s.output?.apiPreset||s.apiPreset||"",l=a?{preset:a}:null,d=await r.callApi(i,l,r.signal),c=d;s.outputMode==="separate"&&s.extractTags?.length>0&&(c=Vb(d,s.extractTags));let u={success:!0,taskId:n,toolId:t,data:c,duration:Date.now()-o};return z.emit(D.TOOL_EXECUTED,{toolId:t,taskId:n,result:u}),u}else return{success:!0,taskId:n,toolId:t,data:{messages:i,config:{apiPreset:s.output?.apiPreset||s.apiPreset||"",outputMode:s.outputMode,extractTags:s.extractTags}},duration:Date.now()-o,needsExecution:!0}}catch(i){let a={success:!1,taskId:n,toolId:t,error:i.message||String(i),duration:Date.now()-o};return z.emit(D.TOOL_EXECUTION_FAILED,{toolId:t,taskId:n,error:i}),a}}function Vb(t,e){let r={};for(let s of e){let o=new RegExp(`<${s}[^>]*>([\\s\\S]*?)<\\/${s}>`,"gi"),n=t.match(o);n&&(r[s]=n.map(i=>{let a=i.match(new RegExp(`<${s}[^>]*>([\\s\\S]*?)<\\/${s}>`,"i"));return a?a[1].trim():""}))}return r}async function Jb(t,e,r={}){let s=[];for(let o of t){let n=se(o);if(n&&n.enabled){let i=await vp(o,e,r);s.push(i)}}return s}var Me,il,Wo,ll=L(()=>{qt();Ke();Me={activeControllers:new Map,executionQueue:[],runningCount:0,maxConcurrent:3,executionHistory:[],isPaused:!1};il=class{constructor(e=3){this.maxConcurrent=e,this.queue=[],this.running=new Map,this.isProcessing=!1}enqueue(e,r){return new Promise((s,o)=>{this.queue.push({executor:e,task:r,resolve:s,reject:o}),this.process()})}async process(){if(!this.isProcessing){for(this.isProcessing=!0;this.queue.length>0&&this.running.size<this.maxConcurrent;){let e=this.queue.shift();if(!e)continue;let{executor:r,task:s,resolve:o,reject:n}=e,i=new AbortController;s.abortController=i,s.status="running",s.startedAt=Date.now(),this.running.set(s.id,s),Me.activeControllers.set(s.id,i),this.executeTask(r,s,i.signal).then(a=>{s.status="completed",s.completedAt=Date.now(),o(a)}).catch(a=>{s.status=a.name==="AbortError"?"aborted":"failed",s.completedAt=Date.now(),n(a)}).finally(()=>{this.running.delete(s.id),Me.activeControllers.delete(s.id),Me.runningCount=this.running.size})}this.isProcessing=!1}}async executeTask(e,r,s){let o=Date.now(),n=null;for(let i=0;i<=r.maxRetries;i++){if(s.aborted)throw new DOMException("\u4EFB\u52A1\u5DF2\u4E2D\u6B62","AbortError");try{let a=await e(s);return ni(r.id,r.toolId,!0,a,null,Date.now()-o,i)}catch(a){if(n=a,a.name==="AbortError")throw a;i<r.maxRetries&&(await this.delay(1e3*(i+1)),r.retries=i+1)}}throw n}delay(e){return new Promise(r=>setTimeout(r,e))}abort(e){let r=Me.activeControllers.get(e);return r?(r.abort(),!0):!1}abortAll(){for(let e of Me.activeControllers.values())e.abort();Me.activeControllers.clear(),this.queue=[],this.running.clear()}getStatus(){return{pending:this.queue.length,running:this.running.size,maxConcurrent:this.maxConcurrent}}},Wo=null});async function Qb(){return cl||(cl=Promise.resolve().then(()=>(ll(),al))),cl}async function Zb(t,e,r){return r&&t.output?.mode===ht.POST_RESPONSE_API?bt.runToolPostResponse(t,e):r&&t.output?.mode===ht.FOLLOW_AI?bt.runToolFollowAiManual(t,e):(await Qb()).executeToolWithConfig(t.id,e)}function ex(t,e){return e?.runSource==="MANUAL"?t.output?.mode==="local_transform"||t.processor?.type?ms.MANUAL_LOCAL_TRANSFORM:t.output?.mode===ht.POST_RESPONSE_API?ms.MANUAL_POST_RESPONSE_API:ms.MANUAL_COMPATIBILITY:ms.MANUAL_POST_RESPONSE_API}function ii(t,e){try{Ea(t,e)}catch(r){Xb.warn("\u66F4\u65B0\u5DE5\u5177\u8FD0\u884C\u65F6\u72B6\u6001\u5931\u8D25:",{toolId:t,error:r})}}async function tx(t,e){let r=Date.now(),s=t.id,o=`yyt-tool-run-${s}`,n=ex(t,e),i=e?.executionKey||"";ii(s,{lastStatus:"running",lastError:"",lastDurationMs:0,lastTraceId:e?.traceId||"",lastMessageKey:e?.messageId||"",lastExecutionKey:i,lastExecutionPath:n,lastWritebackStatus:"",lastFailureStage:"",lastSlotBindingKey:e?.slotBindingKey||"",lastSlotRevisionKey:e?.slotRevisionKey||"",lastSlotTransactionId:e?.slotTransactionId||"",lastSourceMessageId:e?.sourceMessageId||e?.messageId||"",lastSourceSwipeId:e?.sourceSwipeId||e?.effectiveSwipeId||"",lastContentCommitted:!1,lastHostCommitApplied:!1,lastRefreshRequested:!1,lastRefreshConfirmed:!1,lastPreferredCommitMethod:"",lastAppliedCommitMethod:"",lastRefreshMethodCount:0,lastRefreshMethods:[],lastRefreshConfirmChecks:0,lastRefreshConfirmedBy:""}),Hr("info",`\u6B63\u5728\u624B\u52A8\u6267\u884C ${t.name}`,{sticky:!0,noticeId:o});try{let a=n===ms.MANUAL_LOCAL_TRANSFORM?await oi(t,e):await Zb(t,e,!0),l=Date.now()-r;if(a?.success){let p=se(s),y=a?.meta?.writebackDetails||{};return ii(s,{lastStatus:"success",lastError:"",lastDurationMs:l,lastTraceId:e?.traceId||"",successCount:(p?.runtime?.successCount||0)+1,lastMessageKey:e?.messageId||"",lastExecutionKey:i,lastExecutionPath:n,lastWritebackStatus:a?.meta?.writebackStatus||$e.NOT_APPLICABLE,lastFailureStage:a?.meta?.failureStage||"",lastSlotBindingKey:e?.slotBindingKey||"",lastSlotRevisionKey:e?.slotRevisionKey||"",lastSlotTransactionId:e?.slotTransactionId||"",lastSourceMessageId:e?.sourceMessageId||e?.messageId||"",lastSourceSwipeId:e?.sourceSwipeId||e?.effectiveSwipeId||"",lastContentCommitted:!!y.contentCommitted,lastHostCommitApplied:!!y.hostCommitApplied,lastRefreshRequested:!!y.refreshRequested,lastRefreshConfirmed:!!y.refreshConfirmed,lastPreferredCommitMethod:y?.commit?.preferredMethod||"",lastAppliedCommitMethod:y?.commit?.appliedMethod||"",lastRefreshMethodCount:Array.isArray(y?.refresh?.requestMethods)?y.refresh.requestMethods.length:0,lastRefreshMethods:Array.isArray(y?.refresh?.requestMethods)?[...y.refresh.requestMethods]:[],lastRefreshConfirmChecks:Number(y?.refresh?.confirmChecks)||0,lastRefreshConfirmedBy:y?.refresh?.confirmedBy||""}),R("success",`${t.name} \u624B\u52A8\u6267\u884C\u5B8C\u6210`),Hr("success",`${t.name} \u624B\u52A8\u6267\u884C\u5B8C\u6210`,{duration:3200,noticeId:o}),{success:!0,duration:l,result:a}}let d=se(s),c=a?.error||"\u5DE5\u5177\u6267\u884C\u5931\u8D25",u=a?.meta?.writebackDetails||{};return ii(s,{lastStatus:"error",lastError:c,lastDurationMs:l,lastTraceId:e?.traceId||"",errorCount:(d?.runtime?.errorCount||0)+1,lastMessageKey:e?.messageId||"",lastExecutionKey:i,lastExecutionPath:n,lastWritebackStatus:a?.meta?.writebackStatus||$e.NOT_APPLICABLE,lastFailureStage:a?.meta?.failureStage||(n===ms.MANUAL_COMPATIBILITY?Be.COMPATIBILITY_EXECUTE:Be.UNKNOWN),lastSlotBindingKey:e?.slotBindingKey||"",lastSlotRevisionKey:e?.slotRevisionKey||"",lastSlotTransactionId:e?.slotTransactionId||"",lastSourceMessageId:e?.sourceMessageId||e?.messageId||"",lastSourceSwipeId:e?.sourceSwipeId||e?.effectiveSwipeId||"",lastContentCommitted:!!u.contentCommitted,lastHostCommitApplied:!!u.hostCommitApplied,lastRefreshRequested:!!u.refreshRequested,lastRefreshConfirmed:!!u.refreshConfirmed,lastPreferredCommitMethod:u?.commit?.preferredMethod||"",lastAppliedCommitMethod:u?.commit?.appliedMethod||"",lastRefreshMethodCount:Array.isArray(u?.refresh?.requestMethods)?u.refresh.requestMethods.length:0,lastRefreshMethods:Array.isArray(u?.refresh?.requestMethods)?[...u.refresh.requestMethods]:[],lastRefreshConfirmChecks:Number(u?.refresh?.confirmChecks)||0,lastRefreshConfirmedBy:u?.refresh?.confirmedBy||""}),R("error",`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${c}`),Hr("error",`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${c}`,{sticky:!0,noticeId:o}),{success:!1,duration:l,error:c,result:a}}catch(a){let l=Date.now()-r,d=se(s),c=a?.message||String(a);throw ii(s,{lastStatus:"error",lastError:c,lastDurationMs:l,lastTraceId:e?.traceId||"",errorCount:(d?.runtime?.errorCount||0)+1,lastMessageKey:e?.messageId||"",lastExecutionKey:i,lastExecutionPath:n,lastWritebackStatus:$e.NOT_APPLICABLE,lastFailureStage:n===ms.MANUAL_COMPATIBILITY?Be.COMPATIBILITY_EXECUTE:Be.UNKNOWN,lastSlotBindingKey:e?.slotBindingKey||"",lastSlotRevisionKey:e?.slotRevisionKey||"",lastSlotTransactionId:e?.slotTransactionId||"",lastSourceMessageId:e?.sourceMessageId||e?.messageId||"",lastSourceSwipeId:e?.sourceSwipeId||e?.effectiveSwipeId||"",lastContentCommitted:!1,lastHostCommitApplied:!1,lastRefreshRequested:!1,lastRefreshConfirmed:!1,lastPreferredCommitMethod:"",lastAppliedCommitMethod:"",lastRefreshMethodCount:0,lastRefreshMethods:[],lastRefreshConfirmChecks:0,lastRefreshConfirmedBy:""}),R("error",`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${c}`),Hr("error",`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${c}`,{sticky:!0,noticeId:o}),a}}async function ai(t){if(!t)return{success:!1,error:"\u7F3A\u5C11\u5DE5\u5177ID"};let e=se(t);if(!e)return{success:!1,error:"\u5DE5\u5177\u4E0D\u5B58\u5728"};if(!e.enabled)return Ir(t,{lastMessageKey:"",lastExecutionKey:"",lastExecutionPath:"",lastWritebackStatus:$e.NOT_APPLICABLE,lastFailureStage:"",lastContentCommitted:!1,lastHostCommitApplied:!1,lastRefreshRequested:!1,lastRefreshConfirmed:!1,lastPreferredCommitMethod:"",lastAppliedCommitMethod:"",lastRefreshMethodCount:0,lastRefreshMethods:[],lastRefreshConfirmChecks:0,lastRefreshConfirmedBy:""},{touchLastRunAt:!1,emitEvent:!1}),Hr("warning",`${e.name} \u672A\u542F\u7528\uFF0C\u65E0\u6CD5\u624B\u52A8\u6267\u884C`,{duration:2800,noticeId:`yyt-tool-run-${t}`}),{success:!1,error:"\u5DE5\u5177\u672A\u542F\u7528"};let r=await Vr({runSource:"MANUAL"});return tx(e,r)}async function li(t){if(!t)return{success:!1,error:"\u7F3A\u5C11\u5DE5\u5177ID"};let e=se(t);if(!e)return{success:!1,error:"\u5DE5\u5177\u4E0D\u5B58\u5728"};let r=await Vr({runSource:"MANUAL_PREVIEW"});return bt.previewExtraction(e,r)}var Xb,ms,cl,dl=L(()=>{qt();jo();Xr();nl();Je();q();Xb=C.createScope("ToolTrigger"),ms={MANUAL_POST_RESPONSE_API:"manual_post_response_api",MANUAL_LOCAL_TRANSFORM:"manual_local_transform",MANUAL_COMPATIBILITY:"manual_compatibility"},cl=null});var _p={};oe(_p,{TOOL_CONFIG_PANEL_STYLES:()=>Tp,createToolConfigPanel:()=>Or,default:()=>lx});function Sp(t){return t?t.length!==void 0&&typeof t.get=="function"?t.get(0):t:null}function rx(t){if(!Number.isFinite(t)||t<=0)return"\u4ECE\u672A";let e=Date.now()-t;if(e<6e4)return`${Math.floor(e/1e3)} \u79D2\u524D`;if(e<36e5)return`${Math.floor(e/6e4)} \u5206\u949F\u524D`;if(e<864e5)return`${Math.floor(e/36e5)} \u5C0F\u65F6\u524D`;try{return new Date(t).toLocaleString()}catch{return"\u672A\u77E5"}}function Or(t={}){let{id:e,toolId:r,postResponseHint:s,previewDialogId:o,previewTitle:n="\u6D4B\u8BD5\u63D0\u53D6\u7ED3\u679C"}=t;return{id:e,toolId:r,renderTo(i){let a=Sp(i);if(!a)return;if(a._yytToolPanelCleanup)try{a._yytToolPanelCleanup()}catch{}let l=()=>this.renderTo(i),d=se(r);if(!d){a.innerHTML='<div class="yyt-empty-state-small">\u5DE5\u5177\u914D\u7F6E\u52A0\u8F7D\u5931\u8D25</div>';return}let c=g("div",{className:"yyt-tool-panel",dataset:{toolId:r}}),u=[];c.appendChild(sx(d,r,l,s)),c.appendChild(ox(d));let p=nx(d,r,l);u.push(p),c.appendChild(p.el);let y=ix(d,r,l,i,o,n);u.push(y),c.appendChild(y.el),a.innerHTML="",a.appendChild(c),a._yytToolPanelCleanup=()=>{for(let f of u)try{f.destroy()}catch{}delete a._yytToolPanelCleanup}},destroy(i){let a=Sp(i);if(a?._yytToolPanelCleanup)try{a._yytToolPanelCleanup()}catch{}},getStyles(){return""}}}function sx(t,e,r,s){let o=g("div",{className:"yyt-tool-panel-hero"}),n=g("div",{className:"yyt-tool-panel-hero-row1"});n.appendChild(g("div",{className:"yyt-tool-panel-hero-icon",text:"\u{1F527}"})),n.appendChild(g("div",{className:"yyt-tool-panel-hero-name",text:t.name||e}));let i=g("div",{className:"yyt-tool-panel-hero-actions"});i.appendChild(de({label:"\u25B6 \u7ACB\u5373\u6267\u884C\u4E00\u6B21",size:"small",onClick:async()=>{try{await ai(e),R("success","\u5DF2\u89E6\u53D1\u624B\u52A8\u6267\u884C")}catch(f){R("error",`\u6267\u884C\u5931\u8D25\uFF1A${f?.message||f}`)}}}).el),i.appendChild(de({label:"\u{1F4BE} \u4FDD\u5B58\u914D\u7F6E",size:"small",variant:"primary",onClick:()=>{R("success","\u914D\u7F6E\u5DF2\u4FDD\u5B58"),r()}}).el),n.appendChild(i),o.appendChild(n),t.description&&o.appendChild(g("div",{className:"yyt-tool-panel-hero-desc",text:t.description}));let a=g("div",{className:"yyt-tool-panel-hero-chips"}),d=(t.output?.mode||"follow_ai")==="post_response_api"?"\u989D\u5916 AI \u89E3\u6790\uFF08\u81EA\u52A8\uFF09":"\u968F AI \u8F93\u51FA\uFF08\u624B\u52A8\uFF09";a.appendChild(g("span",{className:"yyt-tool-hero-chip mode",text:d}));let c=t.output?.apiPreset||t.apiPreset||"";c&&a.appendChild(g("span",{className:"yyt-tool-hero-chip preset",text:`API: ${c}`}));let u=t.extraction?.regexPresetId||"";if(u){let f=Se.getPreset(u);a.appendChild(g("span",{className:"yyt-tool-hero-chip preset",text:`\u6B63\u5219: ${f?f.name:"\u5DF2\u5220\u9664"}`}))}else a.appendChild(g("span",{className:"yyt-tool-hero-chip",text:"\u6B63\u5219: \u672A\u7ED1\u5B9A",style:{opacity:"0.6"}}));let p=t.worldbooks?.presetId||"";if(p){let f=Ot.getPreset(p);f&&a.appendChild(g("span",{className:"yyt-tool-hero-chip preset",text:`\u4E16\u754C\u4E66: ${f.name}`}))}let y=t.runtime?.lastStatus;if(y){let f=y==="success"?"status-success":y==="failed"?"status-failed":"";a.appendChild(g("span",{className:`yyt-tool-hero-chip ${f}`,text:`\u4E0A\u6B21\u6267\u884C \xB7 ${y}`}))}return o.appendChild(a),o}function ox(t){let e=g("div",{className:"yyt-tool-runtime-row"}),r=t.runtime||{},s=(i,a,l="")=>{let d=g("div",{className:"yyt-tool-runtime-stat"});return d.appendChild(g("span",{className:"yyt-tool-runtime-stat-label",text:i})),d.appendChild(g("span",{className:`yyt-tool-runtime-stat-value ${l}`,text:a})),d},o=r.lastStatus==="success"?"\u2713 \u4E0A\u6B21\u6210\u529F":r.lastStatus==="failed"?"\u2717 \u4E0A\u6B21\u5931\u8D25":r.lastStatus==="idle"?"\u5F85\u547D":r.lastStatus||"\u5F85\u547D",n=r.lastStatus==="success"?"success":r.lastStatus==="failed"?"error":"muted";return e.appendChild(s("\u72B6\u6001",o,n)),e.appendChild(s("\u6700\u8FD1\u8FD0\u884C",rx(r.lastRunAt),"muted")),e.appendChild(s("\u6210\u529F",String(r.successCount||0),"success")),e.appendChild(s("\u5931\u8D25",String(r.errorCount||0),r.errorCount?"error":"muted")),e}function nx(t,e,r){let s=g("div",{style:{display:"flex",flexDirection:"column"}});s.appendChild(Fo({label:"\u8F93\u51FA\u6A21\u5F0F",hint:"\u51B3\u5B9A\u6267\u884C\u8DEF\u5F84 + \u81EA\u52A8/\u624B\u52A8",control:Ue({value:t.output?.mode||"follow_ai",options:[{value:"follow_ai",label:"follow_ai \u2014 \u968F AI \u8F93\u51FA\uFF08\u624B\u52A8\u89E6\u53D1\uFF09"},{value:"post_response_api",label:"post_response_api \u2014 \u989D\u5916 AI \u89E3\u6790\uFF08\u81EA\u52A8\uFF09"}],onChange:l=>{let d=se(e)||{};ve(e,{...d,output:{...d.output||{},mode:l,enabled:l==="post_response_api"}}),r()}})}));let o=(()=>{try{return vr()||[]}catch{return[]}})();s.appendChild(Fo({label:"API \u9884\u8BBE",hint:"\u989D\u5916 AI \u89E3\u6790\u65F6\u4F7F\u7528",control:Ue({value:t.output?.apiPreset||t.apiPreset||"",options:[{value:"",label:"\u2014\u2014 \u8DDF\u968F\u5F53\u524D\u4E3B API \u2014\u2014"},...o.map(l=>({value:l.name,label:l.name}))],onChange:l=>{let d=se(e)||{};ve(e,{...d,apiPreset:l,output:{...d.output||{},apiPreset:l}}),r()}})}));let n=(()=>{try{return zo()||[]}catch{return[]}})();s.appendChild(Fo({label:"Ai \u6307\u4EE4\u9884\u8BBE",hint:'\u9644\u52A0\u5728 system/user \u524D\u7684\u6307\u4EE4\uFF1B\u9009"\u65E0"\u5373\u4E0D\u542F\u7528',control:Ue({value:t.bypass?.enabled&&t.bypass?.presetId||"",options:[{value:"",label:"\u2014\u2014 \u65E0 \u2014\u2014"},...n.map(l=>({value:l.id,label:`${l.name}${l.isDefault?" [\u9ED8\u8BA4]":""}`}))],onChange:l=>{let d=se(e)||{};ve(e,{...d,bypass:{enabled:!!l,presetId:l||""}}),r()}})}));let i=Se.listPresets();s.appendChild(Fo({label:"\u6B63\u5219\u63D0\u53D6\u9884\u8BBE",hint:"\u51B3\u5B9A\u4ECE AI \u56DE\u590D\u4E2D\u5982\u4F55\u62BD\u53D6",control:Ue({value:t.extraction?.regexPresetId||"",options:[{value:"",label:"\u2014\u2014 \u65E0\uFF08\u4E0D\u8FDB\u884C\u63D0\u53D6\uFF09 \u2014\u2014"},...i.map(l=>({value:l.id,label:l.name}))],onChange:l=>{let d=se(e)||{},c={...d.extraction||{},regexPresetId:l};if(l){let u=Se.getPreset(l);R("success",`\u5DF2\u7ED1\u5B9A\u6B63\u5219\u9884\u8BBE\uFF1A${u?.name||l}`)}else R("success","\u5DF2\u89E3\u7ED1\u6B63\u5219\u9884\u8BBE\uFF0C\u5DE5\u5177\u5C06\u4E0D\u8FDB\u884C\u5185\u5BB9\u63D0\u53D6");ve(e,{...d,extraction:c}),r()}})}));let a=Ot.listPresets();return s.appendChild(Fo({label:"\u4E16\u754C\u4E66\u9884\u8BBE",hint:"\u6CE8\u5165\u5230 prompt \u7684 {{toolWorldbookContent}}",control:Ue({value:t.worldbooks?.presetId||"",options:[{value:"",label:"\u2014\u2014 \u65E0\uFF08\u4FDD\u7559\u5DE5\u5177\u539F\u6709\u4E16\u754C\u4E66\u8BBE\u7F6E\uFF09 \u2014\u2014"},...a.map(l=>({value:l.id,label:l.name}))],onChange:l=>{let d=se(e)||{},c={...d.worldbooks||{},presetId:l};if(l){let u=Ot.getPreset(l);R("success",`\u5DF2\u7ED1\u5B9A\u4E16\u754C\u4E66\u9884\u8BBE\uFF1A${u?.name||l}`)}else R("success","\u5DF2\u89E3\u7ED1\u4E16\u754C\u4E66\u9884\u8BBE\uFF0C\u5DE5\u5177\u4E0D\u518D\u6CE8\u5165\u4E16\u754C\u4E66\u5185\u5BB9");ve(e,{...d,worldbooks:c}),r()}})})),$t({heading:"\u7ED1\u5B9A",icon:"\u{1F517}",content:[s]})}function Fo({label:t,hint:e,control:r}){let s=g("div",{className:"yyt-tool-binding-row"}),o=g("div",{className:"yyt-tool-binding-label"});return o.appendChild(g("span",{className:"yyt-tool-binding-label-text",text:t})),e&&o.appendChild(g("span",{className:"yyt-tool-binding-label-hint",text:e})),s.appendChild(o),r.el.classList.add("small"),r.el.style.padding="7px 10px",r.el.style.fontSize="12px",s.appendChild(r.el),s.appendChild(g("div",{className:"yyt-tool-binding-meta"})),s}function ix(t,e,r,s,o,n){let i=g("div",{style:{display:"flex",flexDirection:"column"}});i.appendChild(g("div",{style:{marginBottom:"8px",display:"flex",alignItems:"center",gap:"10px"}},g("div",{style:{flex:"1"}},g("div",{text:"\u63D0\u793A\u8BCD\u6A21\u677F",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}}),g("div",{text:"\u7528 {{macro}} \u5F15\u7528\u4E0A\u4E0B\u6587\u3002\u6A21\u677F\u5185\u5BB9\u4F1A\u4F5C\u4E3A\u53D1\u7ED9\u989D\u5916 AI \u7684 user \u6D88\u606F\u3002",style:{fontSize:"11px",color:"var(--yyt-text-muted)",lineHeight:"1.6"}})),de({label:"\u{1F504} \u91CD\u7F6E\u4E3A\u9ED8\u8BA4",size:"small",variant:"ghost",onClick:()=>{if(!window.confirm("\u7528\u5DE5\u5177\u9ED8\u8BA4\u6A21\u677F\u8986\u76D6\u5F53\u524D\u6A21\u677F\uFF1F"))return;let w=In(e)||{},S=se(e)||{};ve(e,{...S,promptTemplate:w.promptTemplate||""}),r()}}).el));let a=g("textarea",{className:"yyt-textarea yyt-code-textarea",attrs:{rows:"10",placeholder:"\u8F93\u5165\u63D0\u793A\u8BCD\u6A21\u677F..."},style:{width:"100%",resize:"vertical",fontFamily:"ui-monospace, monospace",fontSize:"12px",lineHeight:"1.7"}});a.value=t.promptTemplate||"",a.addEventListener("change",()=>{let w=se(e)||{};ve(e,{...w,promptTemplate:a.value})}),i.appendChild(a),i.appendChild(g("div",{className:"yyt-macro-inline",html:"\u53EF\u7528\u5B8F\uFF1A<code>{{toolPromptMacro}}</code> <code>{{toolContentMacro}}</code> <code>{{toolWorldbookContent}}</code> <code>{{lastAiMessage}}</code> <code>{{recentMessagesText}}</code> <code>{{rawRecentMessagesText}}</code> <code>{{userMessage}}</code> <code>{{toolName}}</code> <code>{{toolId}}</code>"})),i.appendChild(g("hr",{className:"yyt-zone-divider"})),i.appendChild(g("div",{style:{marginBottom:"8px"}},g("div",{text:"\u63D0\u53D6\u914D\u7F6E",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}}),g("div",{text:'\u4ECE AI \u56DE\u590D\u4E2D\u62BD\u53D6\u5E76\u5199\u56DE\u3002\u5B8C\u6574\u89C4\u5219\u7531"\u6B63\u5219\u63D0\u53D6\u9884\u8BBE"\u51B3\u5B9A\uFF0C\u8FD9\u91CC\u53EA\u914D\u7F6E\u5DE5\u5177\u53C2\u6570\u3002',style:{fontSize:"11px",color:"var(--yyt-text-muted)",lineHeight:"1.6"}})));let l=g("div",{style:{display:"grid",gridTemplateColumns:"1fr auto",gap:"12px",alignItems:"end",marginBottom:"12px"}}),d=g("div",{className:"yyt-form-group",style:{margin:0}});d.appendChild(g("label",{text:"\u6700\u5927\u63D0\u53D6 AI \u6D88\u606F\u6570",style:{fontSize:"12px",fontWeight:"600",color:"var(--yyt-text-secondary, rgba(255,255,255,0.55))"}}));let c=g("input",{className:"yyt-input",attrs:{type:"number",min:"1",max:"50"},style:{padding:"7px 10px",fontSize:"12px"}});c.value=String(Number(t.extraction?.maxMessages)||5),c.addEventListener("change",()=>{let w=se(e)||{};ve(e,{...w,extraction:{...w.extraction||{},maxMessages:Math.max(1,parseInt(c.value,10)||5)}})}),d.appendChild(c),l.appendChild(d);let u=g("div",{className:"yyt-form-group",style:{margin:0}});u.appendChild(g("label",{html:"&nbsp;",style:{fontSize:"12px"}})),u.appendChild(de({label:"\u{1F50D} \u6D4B\u8BD5\u63D0\u53D6",onClick:async()=>{try{let w=await li(e);ax(s,w,o,n)}catch(w){R("error",`\u6D4B\u8BD5\u63D0\u53D6\u5931\u8D25\uFF1A${w?.message||w}`)}}}).el),l.appendChild(u),i.appendChild(l);let p=g("div",{className:"yyt-form-group",style:{margin:0}});p.appendChild(g("label",{html:'\u5199\u56DE\u6807\u7B7E <span style="font-size:10px;color:var(--yyt-text-muted);font-weight:500;">\uFF08\u591A\u6807\u7B7E\u63D0\u53D6\u65F6\u6307\u5B9A\u552F\u4E00\u5199\u56DE\u6807\u7B7E\uFF1B\u7559\u7A7A\u5219\u63D0\u53D6\u9996\u4E2A\uFF09</span>',style:{fontSize:"12px",fontWeight:"600",color:"var(--yyt-text-secondary, rgba(255,255,255,0.55))"}}));let y=`yyt-writeback-dl-${e}-${Math.random().toString(36).slice(2,6)}`,f=g("datalist",{attrs:{id:y}}),m=(()=>{let w=new Set,S=[];function v(P){if(P)for(let _ of P.rules||[]){if(_?.enabled===!1||_?.type!=="include")continue;let T=String(_.value||"").trim();!T||w.has(T)||(w.add(T),S.push(T))}}let K=t.extraction?.regexPresetId;if(K)v(Se.getPreset(K));else for(let P of Se.listPresets())v(P);return S})();for(let w of m)f.appendChild(g("option",{attrs:{value:w}}));let b=g("input",{className:"yyt-input",attrs:{type:"text",placeholder:"\u5982 status / content\uFF08\u6765\u81EA\u6B63\u5219\u9884\u8BBE\u7684 include \u6807\u7B7E\uFF09",list:y,autocomplete:"off"},style:{padding:"7px 10px",fontSize:"12px"}});return b.value=t.extraction?.writebackTag||"",b.addEventListener("change",()=>{let w=se(e)||{};ve(e,{...w,extraction:{...w.extraction||{},writebackTag:b.value.trim()}})}),p.appendChild(b),p.appendChild(f),i.appendChild(p),$t({heading:"\u914D\u7F6E",icon:"\u2699",content:[i]})}function ax(t,e,r,s){if(!X()||!pe(t))return;let n=`${Fr}-${r||"extraction-preview"}`,i=Array.isArray(e?.messageEntries)?e.messageEntries:[],a=i.length>0?`
      <div class="yyt-form-group">
        <label>\u9010\u6761\u6D88\u606F\u9884\u89C8</label>
        <div class="yyt-preview-message-list">
          ${i.map((l,d)=>{let c=d===i.length-1?"\u6700\u65B0\u6D88\u606F":`\u6700\u8FD1\u7684\u7B2C ${i.length-d} \u6761\u6D88\u606F`;return`
              <div class="yyt-preview-message-item">
                <div class="yyt-preview-message-title">${$r(c)}</div>
                <div><label>\u539F\u6587</label><pre class="yyt-preview-box yyt-preview-pre">${$r(l.rawText||"\u65E0\u53EF\u7528\u6D88\u606F")}</pre></div>
                <div><label>\u6B63\u6587\u63D0\u53D6</label><pre class="yyt-preview-box yyt-preview-pre">${$r(l.filteredText||"\u6B63\u6587\u89C4\u5219\u672A\u547D\u4E2D")}</pre></div>
                <div><label>\u5DE5\u5177\u6807\u7B7E\u63D0\u53D6</label><pre class="yyt-preview-box yyt-preview-pre">${$r(l.extractedText||"\u672A\u63D0\u53D6\u5230\u5185\u5BB9")}</pre></div>
              </div>
            `}).join("")}
        </div>
      </div>
    `:"";t.append(go({id:n,title:s,width:"720px",wide:!0,body:`
      <div class="yyt-form-group">
        <label>\u63D0\u53D6\u89C4\u5219</label>
        <div class="yyt-preview-box">${$r((e?.selectors||[]).join(`
`)||"\u65E0")}</div>
      </div>
      <div class="yyt-form-group">
        <label>\u539F\u59CB\u5185\u5BB9\u6C47\u603B</label>
        <pre class="yyt-preview-box yyt-preview-pre">${$r(e?.sourceText||"\u65E0\u53EF\u7528\u6D88\u606F")}</pre>
      </div>
      <div class="yyt-form-group">
        <label>\u6B63\u6587\u63D0\u53D6\u6C47\u603B</label>
        <pre class="yyt-preview-box yyt-preview-pre">${$r(e?.filteredSourceText||"\u6B63\u6587\u89C4\u5219\u672A\u547D\u4E2D")}</pre>
      </div>
      <div class="yyt-form-group">
        <label>\u5DE5\u5177\u6807\u7B7E\u63D0\u53D6\u6C47\u603B</label>
        <pre class="yyt-preview-box yyt-preview-pre">${$r(e?.extractedText||"\u672A\u63D0\u53D6\u5230\u5185\u5BB9")}</pre>
      </div>
      ${a}
    `})),mo(t,n,{onSave:l=>l()}),t.find(`#${n}-save`).text("\u5173\u95ED"),t.find(`#${n}-cancel`).remove()}function $r(t){return t==null?"":String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var y_,Tp,lx,Qs=L(()=>{tr();Je();Je();qt();fo();qs();dl();q();ss();As();y_=C.createScope("ToolConfigPanel"),Tp=`
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
`;lx=Or});var Ap={};oe(Ap,{SummaryToolPanel:()=>Ep,default:()=>cx});var Ep,cx,Cp=L(()=>{Qs();Ep=Or({id:"summaryToolPanel",toolId:"summaryTool",postResponseHint:"\u70B9\u51FB\u201C\u7ACB\u5373\u6267\u884C\u4E00\u6B21\u201D\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u8FDB\u884C\u6458\u8981\u89E3\u6790\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 boo_FM
\u6216 regex:<boo_FM>([\\s\\S]*?)</boo_FM>`,previewDialogId:"summary-extraction-preview",defaultInjectionOrder:1e4,lorebookLogTag:"SummaryToolPanel"}),cx=Ep});var Ip={};oe(Ip,{StatusBlockPanel:()=>kp,default:()=>dx});var kp,dx,Mp=L(()=>{Qs();kp=Or({id:"statusBlockPanel",toolId:"statusBlock",postResponseHint:"\u70B9\u51FB\u201C\u7ACB\u5373\u6267\u884C\u4E00\u6B21\u201D\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u751F\u6210\u4E3B\u89D2\u72B6\u6001\u680F\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 status_block
\u6216 regex:<status_block>([\\s\\S]*?)</status_block>`,previewDialogId:"status-extraction-preview",defaultInjectionOrder:10001,lorebookLogTag:"StatusBlockPanel"}),dx=kp});var Pp={};oe(Pp,{YouyouReviewPanel:()=>Rp,default:()=>ux});var Rp,ux,$p=L(()=>{Qs();Rp=Or({id:"youyouReviewPanel",toolId:"youyouReview",postResponseHint:"\u70B9\u51FB\u201C\u7ACB\u5373\u6267\u884C\u4E00\u6B21\u201D\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u5728\u672B\u5C3E\u751F\u6210\u5C0F\u5E7D\u70B9\u8BC4\u4E0E\u5267\u60C5\u94A9\u5B50\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 youyou
\u6216 regex:<youyou>([\\s\\S]*?)</youyou>`,previewDialogId:"youyou-review-extraction-preview",previewTitle:"\u5C0F\u5E7D\u70B9\u8BC4\u63D0\u53D6\u9884\u89C8"}),ux=Rp});function Op(t){return t?t.length!==void 0&&typeof t.get=="function"?t.get(0):t:null}function px(t){if(!Number.isFinite(t)||t<=0)return"\u4ECE\u672A";let e=Date.now()-t;if(e<6e4)return`${Math.floor(e/1e3)} \u79D2\u524D`;if(e<36e5)return`${Math.floor(e/6e4)} \u5206\u949F\u524D`;if(e<864e5)return`${Math.floor(e/36e5)} \u5C0F\u65F6\u524D`;try{return new Date(t).toLocaleString()}catch{return"\u672A\u77E5"}}function Lr(t){return t==null?"":String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function ci(t={}){let{id:e,toolId:r,previewDialogId:s,previewTitle:o="\u6D4B\u8BD5\u63D0\u53D6\u7ED3\u679C",processorDirections:n=[],processorOptions:i=[],heroHint:a=""}=t;return{id:e,toolId:r,renderTo(l){let d=Op(l);if(!d)return;if(d._yytLocalToolPanelCleanup)try{d._yytLocalToolPanelCleanup()}catch{}let c=()=>this.renderTo(l),u=se(r);if(!u){d.innerHTML='<div class="yyt-empty-state-small">\u5DE5\u5177\u914D\u7F6E\u52A0\u8F7D\u5931\u8D25</div>';return}let p=g("div",{className:"yyt-tool-panel",dataset:{toolId:r}}),y=[];p.appendChild(yx(u,r,c,n,a)),p.appendChild(fx(u));let f=gx(u,r,c);y.push(f),p.appendChild(f.el);let m=mx(u,r,c,l,n,i,s,o);y.push(m),p.appendChild(m.el),d.innerHTML="",d.appendChild(p),d._yytLocalToolPanelCleanup=()=>{for(let b of y)try{b.destroy()}catch{}delete d._yytLocalToolPanelCleanup}},destroy(l){let d=Op(l);if(d?._yytLocalToolPanelCleanup)try{d._yytLocalToolPanelCleanup()}catch{}},getStyles(){return""}}}function yx(t,e,r,s,o){let n=g("div",{className:"yyt-tool-panel-hero"}),i=g("div",{className:"yyt-tool-panel-hero-row1"});i.appendChild(g("div",{className:"yyt-tool-panel-hero-icon",text:"\u2699"})),i.appendChild(g("div",{className:"yyt-tool-panel-hero-name",text:t.name||e}));let a=g("div",{className:"yyt-tool-panel-hero-actions"});a.appendChild(de({label:"\u25B6 \u7ACB\u5373\u6267\u884C\u4E00\u6B21",size:"small",onClick:async()=>{try{await ai(e),R("success","\u5DF2\u89E6\u53D1\u624B\u52A8\u6267\u884C")}catch(m){R("error",`\u6267\u884C\u5931\u8D25\uFF1A${m?.message||m}`)}}}).el),a.appendChild(de({label:"\u{1F4BE} \u4FDD\u5B58\u914D\u7F6E",size:"small",variant:"primary",onClick:()=>{R("success","\u914D\u7F6E\u5DF2\u4FDD\u5B58"),r()}}).el),i.appendChild(a),n.appendChild(i),t.description&&n.appendChild(g("div",{className:"yyt-tool-panel-hero-desc",text:t.description})),o&&n.appendChild(g("div",{className:"yyt-tool-panel-hero-desc",text:o}));let l=g("div",{className:"yyt-tool-panel-hero-chips"}),d=t.output?.autoTrigger!==!1;l.appendChild(g("span",{className:"yyt-tool-hero-chip mode",text:`\u672C\u5730\u811A\u672C\uFF08${d?"\u81EA\u52A8":"\u624B\u52A8"}\uFF09`}));let c=t.processor?.direction||s[0]?.key||"",u=s.find(m=>m.key===c)?.label||c;u&&l.appendChild(g("span",{className:"yyt-tool-hero-chip preset",text:`\u65B9\u5411: ${u}`}));let p=t.output?.overwrite!==!1;l.appendChild(g("span",{className:"yyt-tool-hero-chip preset",text:`\u5199\u56DE: ${p?"\u8986\u76D6":"\u8FFD\u52A0"}`}));let y=t.extraction?.regexPresetId||"";if(y){let m=Se.getPreset(y);m&&l.appendChild(g("span",{className:"yyt-tool-hero-chip preset",text:`\u6B63\u5219: ${m.name}`}))}let f=t.runtime?.lastStatus;if(f){let m=f==="success"?"status-success":f==="failed"?"status-failed":"";l.appendChild(g("span",{className:`yyt-tool-hero-chip ${m}`,text:`\u4E0A\u6B21\u6267\u884C \xB7 ${f}`}))}return n.appendChild(l),n}function fx(t){let e=g("div",{className:"yyt-tool-runtime-row"}),r=t.runtime||{},s=(i,a,l="")=>{let d=g("div",{className:"yyt-tool-runtime-stat"});return d.appendChild(g("span",{className:"yyt-tool-runtime-stat-label",text:i})),d.appendChild(g("span",{className:`yyt-tool-runtime-stat-value ${l}`,text:a})),d},o=r.lastStatus==="success"?"\u2713 \u4E0A\u6B21\u6210\u529F":r.lastStatus==="failed"?"\u2717 \u4E0A\u6B21\u5931\u8D25":"\u5F85\u547D",n=r.lastStatus==="success"?"success":r.lastStatus==="failed"?"error":"muted";return e.appendChild(s("\u72B6\u6001",o,n)),e.appendChild(s("\u6700\u8FD1\u8FD0\u884C",px(r.lastRunAt),"muted")),e.appendChild(s("\u6210\u529F",String(r.successCount||0),"success")),e.appendChild(s("\u5931\u8D25",String(r.errorCount||0),r.errorCount?"error":"muted")),e}function gx(t,e,r){let s=g("div",{style:{display:"flex",flexDirection:"column"}}),o=Se.listPresets();return s.appendChild(ul({label:"\u6B63\u5219\u63D0\u53D6\u9884\u8BBE",hint:"\u51B3\u5B9A\u4ECE AI \u56DE\u590D\u4E2D\u5982\u4F55\u62BD\u53D6\u8981\u672C\u5730\u5904\u7406\u7684\u6587\u672C",control:Ue({value:t.extraction?.regexPresetId||"",options:[{value:"",label:"\u2014\u2014 \u65E0\uFF08\u4E0D\u8FDB\u884C\u63D0\u53D6\uFF09 \u2014\u2014"},...o.map(n=>({value:n.id,label:n.name}))],onChange:n=>{let i=se(e)||{},a={...i.extraction||{},regexPresetId:n};if(n){let l=Se.getPreset(n);R("success",`\u5DF2\u7ED1\u5B9A\u6B63\u5219\u9884\u8BBE\uFF1A${l?.name||n}`)}else R("success","\u5DF2\u89E3\u7ED1\u6B63\u5219\u9884\u8BBE\uFF0C\u5DE5\u5177\u5C06\u4E0D\u8FDB\u884C\u5185\u5BB9\u63D0\u53D6");ve(e,{...i,extraction:a}),r()}})})),s.appendChild(ul({label:"\u5199\u56DE\u65B9\u5F0F",hint:"\u5904\u7406\u540E\u7684\u7ED3\u679C\u5982\u4F55\u56DE\u5199\u5230 AI \u6D88\u606F",control:Ue({value:t.output?.overwrite!==!1?"replace":"append",options:[{value:"replace",label:"\u8986\u76D6\u539F\u5DE5\u5177\u5757"},{value:"append",label:"\u8FFD\u52A0\u5230\u672B\u5C3E"}],onChange:n=>{let i=se(e)||{};ve(e,{...i,output:{...i.output||{},overwrite:n==="replace",enabled:!0,mode:"local_transform"}}),r()}})})),s.appendChild(ul({label:"\u81EA\u52A8\u89E6\u53D1",hint:"\u6536\u5230 AI \u56DE\u590D\u540E\u662F\u5426\u81EA\u52A8\u6267\u884C\u6B64\u811A\u672C",control:Ue({value:t.output?.autoTrigger!==!1?"auto":"manual",options:[{value:"auto",label:"\u81EA\u52A8\uFF08\u6536\u5230\u56DE\u590D\u5373\u6267\u884C\uFF09"},{value:"manual",label:"\u624B\u52A8\uFF08\u4EC5\u70B9\u51FB\u6309\u94AE\u6267\u884C\uFF09"}],onChange:n=>{let i=se(e)||{};ve(e,{...i,output:{...i.output||{},autoTrigger:n==="auto",enabled:!0,mode:"local_transform"}}),r()}})})),$t({heading:"\u7ED1\u5B9A",icon:"\u{1F517}",content:[s]})}function ul({label:t,hint:e,control:r}){let s=g("div",{className:"yyt-tool-binding-row"}),o=g("div",{className:"yyt-tool-binding-label"});return o.appendChild(g("span",{className:"yyt-tool-binding-label-text",text:t})),e&&o.appendChild(g("span",{className:"yyt-tool-binding-label-hint",text:e})),s.appendChild(o),r.el.style.padding="7px 10px",r.el.style.fontSize="12px",s.appendChild(r.el),s.appendChild(g("div",{className:"yyt-tool-binding-meta"})),s}function mx(t,e,r,s,o,n,i,a){let l=g("div",{style:{display:"flex",flexDirection:"column"}});l.appendChild(g("div",{style:{marginBottom:"10px"}},g("div",{text:"\u6267\u884C\u65B9\u5411",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}}),g("div",{text:"\u51B3\u5B9A\u672C\u5730\u811A\u672C\u8FD0\u884C\u54EA\u4E2A\u53D8\u6362\u8DEF\u5F84\u3002",style:{fontSize:"11px",color:"var(--yyt-text-muted)",lineHeight:"1.6"}})));let d=t.processor?.direction||o[0]?.key||"",c=Ue({value:d,options:o.map(m=>({value:m.key,label:m.description?`${m.label} \u2014 ${m.description}`:m.label})),onChange:m=>{let b=se(e)||{};ve(e,{...b,processor:{...b.processor||{},direction:m}}),r()}});if(c.el.style.padding="7px 10px",c.el.style.fontSize="12px",l.appendChild(c.el),l.appendChild(g("hr",{className:"yyt-zone-divider"})),n.length>0){l.appendChild(g("div",{style:{marginBottom:"10px"}},g("div",{text:"\u5904\u7406\u9879",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}}),g("div",{text:"\u52FE\u9009\u8981\u5305\u542B\u5728\u672C\u6B21\u53D8\u6362\u4E2D\u7684\u9879\u76EE\u3002",style:{fontSize:"11px",color:"var(--yyt-text-muted)",lineHeight:"1.6"}})));let m=g("div",{style:{display:"flex",flexDirection:"column"}}),b=t.processor?.options||{};for(let w of n){let S=St({label:w.label,hint:w.description||"",checked:b[w.key]===!0,onChange:v=>{let K=se(e)||{};ve(e,{...K,processor:{...K.processor||{},options:{...K.processor?.options||{},[w.key]:v}}})}});m.appendChild(S.el)}l.appendChild(m),l.appendChild(g("hr",{className:"yyt-zone-divider"}))}l.appendChild(g("div",{style:{marginBottom:"10px"}},g("div",{text:"\u63D0\u53D6\u914D\u7F6E",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}}),g("div",{text:'\u4ECE AI \u56DE\u590D\u4E2D\u62BD\u53D6\u8981\u672C\u5730\u5904\u7406\u7684\u6587\u672C\u3002\u5B8C\u6574\u89C4\u5219\u7531"\u6B63\u5219\u63D0\u53D6\u9884\u8BBE"\u51B3\u5B9A\uFF0C\u8FD9\u91CC\u53EA\u914D\u7F6E\u5DE5\u5177\u53C2\u6570\u3002',style:{fontSize:"11px",color:"var(--yyt-text-muted)",lineHeight:"1.6"}})));let u=g("div",{style:{display:"grid",gridTemplateColumns:"1fr auto",gap:"12px",alignItems:"end"}}),p=g("div",{className:"yyt-form-group",style:{margin:0}});p.appendChild(g("label",{text:"\u6700\u5927\u63D0\u53D6 AI \u6D88\u606F\u6570",style:{fontSize:"12px",fontWeight:"600",color:"var(--yyt-text-secondary, rgba(255,255,255,0.55))"}}));let y=g("input",{className:"yyt-input",attrs:{type:"number",min:"1",max:"50"},style:{padding:"7px 10px",fontSize:"12px"}});y.value=String(Number(t.extraction?.maxMessages)||5),y.addEventListener("change",()=>{let m=se(e)||{};ve(e,{...m,extraction:{...m.extraction||{},maxMessages:Math.max(1,parseInt(y.value,10)||5)}})}),p.appendChild(y),u.appendChild(p);let f=g("div",{className:"yyt-form-group",style:{margin:0}});return f.appendChild(g("label",{html:"&nbsp;",style:{fontSize:"12px"}})),f.appendChild(de({label:"\u{1F50D} \u6D4B\u8BD5\u63D0\u53D6",onClick:async()=>{try{let m=await li(e);hx(s,m,i,a)}catch(m){R("error",`\u6D4B\u8BD5\u63D0\u53D6\u5931\u8D25\uFF1A${m?.message||m}`)}}}).el),u.appendChild(f),l.appendChild(u),$t({heading:"\u914D\u7F6E",icon:"\u2699",content:[l]})}function hx(t,e,r,s){if(!X()||!pe(t))return;let n=`${Fr}-${r||"extraction-preview"}`,i=Array.isArray(e?.messageEntries)?e.messageEntries:[],a=i.length>0?`
      <div class="yyt-form-group">
        <label>\u9010\u6761\u6D88\u606F\u9884\u89C8</label>
        <div class="yyt-preview-message-list">
          ${i.map((l,d)=>{let c=d===i.length-1?"\u6700\u65B0\u6D88\u606F":`\u6700\u8FD1\u7684\u7B2C ${i.length-d} \u6761\u6D88\u606F`;return`
              <div class="yyt-preview-message-item">
                <div class="yyt-preview-message-title">${Lr(c)}</div>
                <div><label>\u539F\u6587</label><pre class="yyt-preview-box yyt-preview-pre">${Lr(l.rawText||"\u65E0\u53EF\u7528\u6D88\u606F")}</pre></div>
                <div><label>\u6B63\u6587\u63D0\u53D6</label><pre class="yyt-preview-box yyt-preview-pre">${Lr(l.filteredText||"\u6B63\u6587\u89C4\u5219\u672A\u547D\u4E2D")}</pre></div>
                <div><label>\u5DE5\u5177\u6807\u7B7E\u63D0\u53D6</label><pre class="yyt-preview-box yyt-preview-pre">${Lr(l.extractedText||"\u672A\u63D0\u53D6\u5230\u5185\u5BB9")}</pre></div>
              </div>
            `}).join("")}
        </div>
      </div>
    `:"";t.append(go({id:n,title:s,width:"720px",wide:!0,body:`
      <div class="yyt-form-group">
        <label>\u63D0\u53D6\u89C4\u5219</label>
        <div class="yyt-preview-box">${Lr((e?.selectors||[]).join(`
`)||"\u65E0")}</div>
      </div>
      <div class="yyt-form-group">
        <label>\u539F\u59CB\u5185\u5BB9\u6C47\u603B</label>
        <pre class="yyt-preview-box yyt-preview-pre">${Lr(e?.sourceText||"\u65E0\u53EF\u7528\u6D88\u606F")}</pre>
      </div>
      <div class="yyt-form-group">
        <label>\u6B63\u6587\u63D0\u53D6\u6C47\u603B</label>
        <pre class="yyt-preview-box yyt-preview-pre">${Lr(e?.filteredSourceText||"\u6B63\u6587\u89C4\u5219\u672A\u547D\u4E2D")}</pre>
      </div>
      <div class="yyt-form-group">
        <label>\u5DE5\u5177\u6807\u7B7E\u63D0\u53D6\u6C47\u603B</label>
        <pre class="yyt-preview-box yyt-preview-pre">${Lr(e?.extractedText||"\u672A\u63D0\u53D6\u5230\u5185\u5BB9")}</pre>
      </div>
      ${a}
    `})),mo(t,n,{onSave:l=>l()}),t.find(`#${n}-save`).text("\u5173\u95ED"),t.find(`#${n}-cancel`).remove()}var A_,pl=L(()=>{tr();Je();qt();dl();q();Qs();ss();A_=C.createScope("LocalTransformToolPanel")});var Np={};oe(Np,{EscapeTransformToolPanel:()=>Lp,default:()=>bx});var Lp,bx,Dp=L(()=>{pl();Lp=ci({id:"escapeTransformToolPanel",toolId:"escapeTransformTool",previewDialogId:"escape-transform-extraction-preview",previewTitle:"\u8F6C\u4E49\u5904\u7406\u63D0\u53D6\u9884\u89C8",heroHint:"\u4ECE\u6700\u8FD1 AI \u6D88\u606F\u63D0\u53D6\u6587\u672C\u540E\uFF0C\u5728\u672C\u5730\u6267\u884C\u8F6C\u4E49\u6216\u53BB\u8F6C\u4E49\uFF0C\u518D\u6309\u6240\u9009\u65B9\u5F0F\u5199\u56DE\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\u6216\u6B63\u5219\uFF0C\u4F8B\u5982\uFF1A
content
regex:<content>([\\s\\S]*?)</content>`,processorDirections:[{key:"escape",label:"\u8F6C\u4E49",description:"\u628A\u539F\u59CB\u5B57\u7B26\u8F6C\u6362\u6210\u8F6C\u4E49\u5E8F\u5217\u3002"},{key:"unescape",label:"\u53BB\u8F6C\u4E49",description:"\u628A\u8F6C\u4E49\u5E8F\u5217\u8FD8\u539F\u6210\u539F\u59CB\u5B57\u7B26\u3002"}],processorOptions:[{key:"doubleQuote",label:"\u53CC\u5F15\u53F7",description:'\u5904\u7406 " \u4E0E \\"\u3002'},{key:"singleQuote",label:"\u5355\u5F15\u53F7",description:"\u5904\u7406 ' \u4E0E \\'\u3002"},{key:"newline",label:"\u6362\u884C\u7B26",description:"\u5904\u7406\u6362\u884C\u4E0E \\n\u3002"}]}),bx=Lp});var zp={};oe(zp,{PunctuationTransformToolPanel:()=>Bp,default:()=>xx});var Bp,xx,Kp=L(()=>{pl();Bp=ci({id:"punctuationTransformToolPanel",toolId:"punctuationTransformTool",previewDialogId:"punctuation-transform-extraction-preview",previewTitle:"\u4E2D\u6587\u6807\u70B9\u66FF\u6362\u63D0\u53D6\u9884\u89C8",heroHint:"\u4ECE\u6700\u8FD1 AI \u6D88\u606F\u63D0\u53D6\u6587\u672C\u540E\uFF0C\u5728\u672C\u5730\u628A\u82F1\u6587\u6807\u70B9\u66FF\u6362\u6210\u4E2D\u6587\u6807\u70B9\uFF0C\u518D\u6309\u6240\u9009\u65B9\u5F0F\u5199\u56DE\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\u6216\u6B63\u5219\uFF0C\u4F8B\u5982\uFF1A
content
regex:<content>([\\s\\S]*?)</content>`,processorDirections:[{key:"en_to_zh",label:"\u82F1\u6587\u8F6C\u4E2D\u6587",description:"\u6309\u52FE\u9009\u9879\u628A\u82F1\u6587\u6807\u70B9\u66FF\u6362\u4E3A\u4E2D\u6587\u6807\u70B9\u3002"}],processorOptions:[{key:"comma",label:"\u9017\u53F7 ,",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u9017\u53F7\u3002"},{key:"period",label:"\u53E5\u53F7 .",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u53E5\u53F7\u3002"},{key:"exclamation",label:"\u611F\u53F9\u53F7 !",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u611F\u53F9\u53F7\u3002"},{key:"question",label:"\u95EE\u53F7 ?",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u95EE\u53F7\u3002"},{key:"semicolon",label:"\u5206\u53F7 ;",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u5206\u53F7\u3002"},{key:"colon",label:"\u5192\u53F7 :",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u5192\u53F7\u3002"},{key:"leftParen",label:"\u5DE6\u62EC\u53F7 (",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u5DE6\u62EC\u53F7\u3002"},{key:"rightParen",label:"\u53F3\u62EC\u53F7 )",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u53F3\u62EC\u53F7\u3002"}]}),xx=Bp});var jp={};oe(jp,{BypassPanel:()=>Up,default:()=>wx});var Up,wx,Wp=L(()=>{Ke();qs();Je();Up={id:"bypassPanel",_getActivePresetId(t){return t.find(".yyt-bypass-editor-content").data("presetId")||null},render(t){let e=ne.getPresetList(),r=ne.getDefaultPresetId();return`
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
    `},_renderPresetItem(t,e){let r=gr&&gr[t.id];return`
      <div class="yyt-bypass-preset-item ${e?"yyt-default":""}" data-preset-id="${t.id}">
        <div class="yyt-bypass-preset-info">
          <span class="yyt-bypass-preset-name">${re(t.name)}</span>
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
      `;let e=ne.getDefaultPresetId()===t.id,r=gr&&gr[t.id];return`
      <div class="yyt-bypass-editor-content" data-preset-id="${t.id}">
        <div class="yyt-bypass-editor-header">
          <div class="yyt-bypass-editor-title">
            <input type="text" class="yyt-input yyt-bypass-name-input" 
                   value="${re(t.name)}" placeholder="\u9884\u8BBE\u540D\u79F0">
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
                 value="${re(t.description||"")}" placeholder="\u9884\u8BBE\u63CF\u8FF0\uFF08\u53EF\u9009\uFF09">
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
                  placeholder="\u8F93\u5165\u6D88\u606F\u5185\u5BB9...">${re(t.content||"")}</textarea>
      </div>
    `},bindEvents(t,e){let r=X();!r||!pe(t)||(t.off(".yytBypass"),this._bindPresetListEvents(t,r),this._bindEditorEvents(t,r),this._bindFileEvents(t,r),vt(t,{namespace:"yytBypassSelect",selectors:[".yyt-bypass-role-select"]}))},_bindPresetListEvents(t,e){t.on("click.yytBypass",".yyt-bypass-preset-item",r=>{if(e(r.target).closest(".yyt-bypass-quick-delete").length)return;let s=e(r.currentTarget).data("presetId");this._selectPreset(t,e,s)}),t.on("click.yytBypass",".yyt-bypass-quick-delete",async r=>{r.stopPropagation();let s=e(r.currentTarget).data("presetId");if(!s||!await er("\u5220\u9664\u9884\u8BBE","\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u4E2A\u9884\u8BBE\u5417\uFF1F",{danger:!0}))return;let n=ne.deletePreset(s);n.success?(t.find(".yyt-bypass-editor-content").data("presetId")===s&&t.find(".yyt-bypass-editor").html(`
            <div class="yyt-bypass-empty">
              <i class="fa-solid fa-shield-halved"></i>
              <p>\u9009\u62E9\u6216\u521B\u5EFA Ai \u6307\u4EE4\u9884\u8BBE</p>
            </div>
          `),this._refreshPresetList(t,e),R("success","\u9884\u8BBE\u5DF2\u5220\u9664")):R("error",n?.message||"\u5220\u9664\u9884\u8BBE\u5931\u8D25")}),t.on("click.yytBypass","#yyt-bypass-add",()=>{this._createNewPreset(t,e)})},_bindEditorEvents(t,e){t.on("click.yytBypass","#yyt-bypass-save",()=>{this._saveCurrentPreset(t,e)}),t.on("click.yytBypass","#yyt-bypass-delete",()=>{this._deleteCurrentPreset(t,e)}),t.on("click.yytBypass","#yyt-bypass-duplicate",()=>{this._duplicateCurrentPreset(t,e)}),t.on("click.yytBypass","#yyt-bypass-set-default",()=>{this._setAsDefault(t,e)}),t.on("click.yytBypass","#yyt-bypass-add-message",()=>{this._addMessage(t,e)}),t.on("click.yytBypass",".yyt-bypass-move-up",r=>{let s=e(r.currentTarget).closest(".yyt-bypass-message"),o=s.prev(".yyt-bypass-message");o.length&&(o.before(s),this._refreshMessageIndices(t,e))}),t.on("click.yytBypass",".yyt-bypass-move-down",r=>{let s=e(r.currentTarget).closest(".yyt-bypass-message"),o=s.next(".yyt-bypass-message");o.length&&(o.after(s),this._refreshMessageIndices(t,e))}),t.on("click.yytBypass",".yyt-bypass-insert-message",r=>{let s=e(r.currentTarget).closest(".yyt-bypass-message");this._insertMessageAfter(t,e,s)}),t.on("click.yytBypass",".yyt-bypass-delete-message",r=>{e(r.currentTarget).closest(".yyt-bypass-message").remove(),this._refreshMessageIndices(t,e)}),t.on("change.yytBypass",".yyt-bypass-message-enabled",r=>{e(r.currentTarget).closest(".yyt-bypass-message").toggleClass("yyt-disabled",!e(r.currentTarget).is(":checked"))})},_bindFileEvents(t,e){t.on("click.yytBypass","#yyt-bypass-import",()=>{t.find("#yyt-bypass-import-file").click()}),t.on("change.yytBypass","#yyt-bypass-import-file",async r=>{let s=r.target.files[0];if(s){try{let o=await bo(s),n=ne.importPresets(o);R(n.success?"success":"error",n.message),n.success&&this.renderTo(t)}catch(o){R("error",`\u5BFC\u5165\u5931\u8D25: ${o.message}`)}e(r.target).val("")}}),t.on("click.yytBypass","#yyt-bypass-export",()=>{try{let r=ne.exportPresets();ho(r,`bypass_presets_${Date.now()}.json`),R("success","\u9884\u8BBE\u5DF2\u5BFC\u51FA")}catch(r){R("error",`\u5BFC\u51FA\u5931\u8D25: ${r.message}`)}})},_selectPreset(t,e,r){let s=ne.getPreset(r);s&&(t.find(".yyt-bypass-preset-item").removeClass("yyt-active"),t.find(`.yyt-bypass-preset-item[data-preset-id="${r}"]`).addClass("yyt-active"),t.find(".yyt-bypass-editor").html(this._renderEditor(s)),vt(t,{namespace:"yytBypassSelect",selectors:[".yyt-bypass-role-select"]}))},_createNewPreset(t,e){let r=`bypass_${Date.now()}`,s=ne.createPreset({id:r,name:"\u65B0 Ai \u6307\u4EE4\u9884\u8BBE",description:"",messages:[]});s.success?(this.renderTo(t),this._selectPreset(t,e,r),R("success","\u9884\u8BBE\u5DF2\u521B\u5EFA")):R("error",s?.message||"\u521B\u5EFA\u9884\u8BBE\u5931\u8D25")},_saveCurrentPreset(t,e){let r=t.find(".yyt-bypass-editor-content"),s=r.data("presetId");if(!s)return;let o=r.find(".yyt-bypass-name-input").val().trim(),n=r.find(".yyt-bypass-description-input").val().trim();if(!o){R("warning","\u8BF7\u8F93\u5165\u9884\u8BBE\u540D\u79F0"),r.find(".yyt-bypass-name-input").trigger("focus").trigger("select");return}let i=[];r.find(".yyt-bypass-message").each(function(){let l=e(this);i.push({id:l.data("messageId"),role:l.find(".yyt-bypass-role-select").val(),content:l.find(".yyt-bypass-message-content").val(),enabled:l.find(".yyt-bypass-message-enabled").is(":checked"),deletable:String(l.data("deletable"))!=="false"})});let a=ne.updatePreset(s,{name:o,description:n,messages:i});a.success?(R("success","\u9884\u8BBE\u5DF2\u4FDD\u5B58"),this._refreshPresetList(t,e)):R("error",a?.message||"\u4FDD\u5B58\u9884\u8BBE\u5931\u8D25")},async _deleteCurrentPreset(t,e){let s=t.find(".yyt-bypass-editor-content").data("presetId");if(!s||!await er("\u5220\u9664\u9884\u8BBE","\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u4E2A\u9884\u8BBE\u5417\uFF1F",{danger:!0}))return;let n=ne.deletePreset(s);n.success?(this.renderTo(t),R("success","\u9884\u8BBE\u5DF2\u5220\u9664")):R("error",n?.message||"\u5220\u9664\u9884\u8BBE\u5931\u8D25")},_duplicateCurrentPreset(t,e){let s=t.find(".yyt-bypass-editor-content").data("presetId");if(!s)return;let o=`bypass_${Date.now()}`,n=ne.duplicatePreset(s,o);n.success?(this.renderTo(t),this._selectPreset(t,e,o),R("success","\u9884\u8BBE\u5DF2\u590D\u5236")):R("error",n?.message||"\u590D\u5236\u9884\u8BBE\u5931\u8D25")},_setAsDefault(t,e){let s=t.find(".yyt-bypass-editor-content").data("presetId");if(!s)return;ne.setDefaultPresetId(s),this._refreshPresetList(t,e);let o=ne.getPreset(s);o&&t.find(".yyt-bypass-editor").html(this._renderEditor(o)),R("success","\u5DF2\u8BBE\u4E3A\u9ED8\u8BA4\u9884\u8BBE")},_addMessage(t,e){let r=t.find(".yyt-bypass-messages"),s={id:`msg_${Date.now()}`,role:"SYSTEM",content:"",enabled:!0,deletable:!0},o=r.find(".yyt-bypass-message").length;r.append(this._renderMessageItem(s,o))},_insertMessageAfter(t,e,r){let s=t.find(".yyt-bypass-messages"),o={id:`msg_${Date.now()}`,role:"SYSTEM",content:"",enabled:!0,deletable:!0},n=this._renderMessageItem(o,0),i=e(n);r.after(i),this._refreshMessageIndices(t,e)},_refreshMessageIndices(t,e){t.find(".yyt-bypass-message").each(function(r){e(this).attr("data-message-index",r)})},_refreshPresetList(t,e){let r=ne.getPresetList(),s=ne.getDefaultPresetId(),o=this._getActivePresetId(t);t.find(".yyt-bypass-preset-list").html(r.map(n=>this._renderPresetItem(n,n.id===s)).join("")),o&&t.find(`.yyt-bypass-preset-item[data-preset-id="${o}"]`).addClass("yyt-active")},destroy(t){!X()||!pe(t)||(et(t,"yytBypassSelect"),t.off(".yytBypass"))},getStyles(){return`
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
    `},renderTo(t){let e=this.render({});t.html(e),this.bindEvents(t,{})}},wx=Up});var fl={};oe(fl,{SettingsPanel:()=>qp,applyTheme:()=>Yp,applyUiPreferences:()=>yl,default:()=>Sx});function Ho({id:t,checked:e=!1,title:r="",hint:s=""}){return`
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
  `}function Hp(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window}function Go(){return Hp()?.document||document}function Gp(t=Go()){return t?.documentElement||document.documentElement}function Yp(t,e=Go()){let r=Gp(e),s={...vx,...Fp[t]||Fp["dark-blue"]};Object.entries(s).forEach(([o,n])=>{r.style.setProperty(o,n)}),r.setAttribute("data-yyt-theme",t)}function yl(t={},e=Go()){let r=Gp(e),{theme:s="dark-blue",compactMode:o=!1,animationEnabled:n=!0}=t||{};Yp(s,e),r.classList.toggle("yyt-compact-mode",!!o),r.classList.toggle("yyt-no-animation",!n)}var vx,Fp,qp,Sx,gl=L(()=>{Ke();Uo();q();ei();Je();vx={"--yyt-accent":"#7bb7ff","--yyt-accent-glow":"rgba(123, 183, 255, 0.4)","--yyt-accent-soft":"rgba(123, 183, 255, 0.15)","--yyt-accent-strong":"#a5d4ff","--yyt-on-accent":"#0a0d13","--yyt-bg-base":"#0a0d13","--yyt-surface":"#0f1219","--yyt-surface-2":"#151a24","--yyt-surface-3":"#1c2231","--yyt-surface-hover":"#1c2231","--yyt-surface-active":"#232b3e","--yyt-border":"rgba(255, 255, 255, 0.06)","--yyt-border-soft":"rgba(255, 255, 255, 0.04)","--yyt-border-strong":"rgba(255, 255, 255, 0.12)","--yyt-text":"rgba(255, 255, 255, 0.92)","--yyt-text-secondary":"rgba(255, 255, 255, 0.55)","--yyt-text-muted":"rgba(255, 255, 255, 0.35)","--yyt-focus-ring":"0 0 0 2px rgba(123, 183, 255, 1), 0 0 0 4px rgba(123, 183, 255, 0.15)","--yyt-control-bg":"#0f1219","--yyt-control-bg-hover":"#151a24","--yyt-control-bg-active":"#1c2231","--yyt-control-bg-strong":"#151a24","--yyt-control-bg-focus":"#151a24","--yyt-control-border":"rgba(255, 255, 255, 0.08)","--yyt-control-border-hover":"rgba(255, 255, 255, 0.14)","--yyt-control-border-focus":"rgba(123, 183, 255, 0.5)","--yyt-control-shadow":"none","--yyt-control-shadow-hover":"none","--yyt-control-shadow-focus":"none","--yyt-control-shadow-active":"none","--yyt-select-surface":"#151a24","--yyt-select-option-bg":"#1c2231","--yyt-select-option-hover-bg":"#232b3e","--yyt-select-option-selected-bg":"#2a3450","--yyt-select-option-border":"rgba(123, 183, 255, 0.15)","--yyt-select-option-selected-border":"rgba(123, 183, 255, 0.3)","--yyt-select-dropdown-shadow":"0 8px 24px rgba(0, 0, 0, 0.4)","--yyt-select-arrow-color":"rgba(255, 255, 255, 0.4)"},Fp={"dark-blue":{"--yyt-on-accent":"#0a0d13"},"dark-purple":{"--yyt-accent":"#a78bfa","--yyt-accent-glow":"rgba(167, 139, 250, 0.4)","--yyt-accent-soft":"rgba(167, 139, 250, 0.15)","--yyt-accent-strong":"#c4b5fd","--yyt-bg-base":"#0d0a14","--yyt-surface":"#12101c","--yyt-surface-2":"#1a1726","--yyt-surface-3":"#221e32","--yyt-surface-hover":"#221e32","--yyt-surface-active":"#2a2540","--yyt-on-accent":"#0d0a14","--yyt-control-bg":"#12101c","--yyt-control-bg-hover":"#1a1726","--yyt-control-bg-active":"#221e32","--yyt-control-bg-strong":"#1a1726","--yyt-control-bg-focus":"#1a1726","--yyt-control-border-focus":"rgba(167, 139, 250, 0.5)","--yyt-select-surface":"#1a1726","--yyt-select-option-bg":"#221e32","--yyt-select-option-hover-bg":"#2a2540","--yyt-select-option-selected-bg":"#332d50","--yyt-select-option-border":"rgba(167, 139, 250, 0.15)","--yyt-select-option-selected-border":"rgba(167, 139, 250, 0.3)","--yyt-focus-ring":"0 0 0 2px rgba(167, 139, 250, 1), 0 0 0 4px rgba(167, 139, 250, 0.15)"},"dark-green":{"--yyt-accent":"#4ade80","--yyt-accent-glow":"rgba(74, 222, 128, 0.4)","--yyt-accent-soft":"rgba(74, 222, 128, 0.15)","--yyt-accent-strong":"#86efac","--yyt-bg-base":"#0a120d","--yyt-surface":"#0f1912","--yyt-surface-2":"#151f1a","--yyt-surface-3":"#1c2824","--yyt-surface-hover":"#1c2824","--yyt-surface-active":"#233530","--yyt-on-accent":"#0a120d","--yyt-control-bg":"#0f1912","--yyt-control-bg-hover":"#151f1a","--yyt-control-bg-active":"#1c2824","--yyt-control-bg-strong":"#151f1a","--yyt-control-bg-focus":"#151f1a","--yyt-control-border-focus":"rgba(74, 222, 128, 0.5)","--yyt-select-surface":"#151f1a","--yyt-select-option-bg":"#1c2824","--yyt-select-option-hover-bg":"#233530","--yyt-select-option-selected-bg":"#2a4038","--yyt-select-option-border":"rgba(74, 222, 128, 0.15)","--yyt-select-option-selected-border":"rgba(74, 222, 128, 0.3)","--yyt-focus-ring":"0 0 0 2px rgba(74, 222, 128, 1), 0 0 0 4px rgba(74, 222, 128, 0.15)"},light:{"--yyt-accent":"#3b82f6","--yyt-accent-glow":"rgba(59, 130, 246, 0.3)","--yyt-accent-soft":"rgba(59, 130, 246, 0.1)","--yyt-accent-strong":"#93c5fd","--yyt-bg-base":"#f5f7fa","--yyt-surface":"#edf0f5","--yyt-surface-2":"#e4e8ef","--yyt-surface-3":"#dbe0e9","--yyt-surface-hover":"#dbe0e9","--yyt-surface-active":"#d1d7e2","--yyt-text":"rgba(15, 23, 42, 0.92)","--yyt-text-secondary":"rgba(15, 23, 42, 0.55)","--yyt-text-muted":"rgba(15, 23, 42, 0.35)","--yyt-border":"rgba(15, 23, 42, 0.08)","--yyt-border-soft":"rgba(15, 23, 42, 0.04)","--yyt-border-strong":"rgba(15, 23, 42, 0.14)","--yyt-focus-ring":"0 0 0 2px rgba(59, 130, 246, 1), 0 0 0 4px rgba(59, 130, 246, 0.12)","--yyt-on-accent":"#ffffff","--yyt-control-bg":"#edf0f5","--yyt-control-bg-hover":"#e4e8ef","--yyt-control-bg-active":"#dbe0e9","--yyt-control-bg-strong":"#e4e8ef","--yyt-control-bg-focus":"#e4e8ef","--yyt-control-border":"rgba(15, 23, 42, 0.1)","--yyt-control-border-hover":"rgba(15, 23, 42, 0.18)","--yyt-control-border-focus":"rgba(59, 130, 246, 0.5)","--yyt-control-shadow":"none","--yyt-control-shadow-hover":"none","--yyt-control-shadow-focus":"none","--yyt-control-shadow-active":"none","--yyt-select-surface":"#e4e8ef","--yyt-select-option-bg":"#edf0f5","--yyt-select-option-hover-bg":"#dbe0e9","--yyt-select-option-selected-bg":"#dbeafe","--yyt-select-option-border":"rgba(59, 130, 246, 0.12)","--yyt-select-option-selected-border":"rgba(59, 130, 246, 0.3)","--yyt-select-dropdown-shadow":"0 8px 24px rgba(15, 23, 42, 0.1)","--yyt-select-arrow-color":"rgba(15, 23, 42, 0.4)"}};qp={id:"settingsPanel",render(){let t=Ct.getSettings(),e=t.debug?.enableDebugLog===!0,r=this._getAutomationRuntime();return`
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
    `},_renderExecutorTab(t,e={},r=null){let s=Array.isArray(r?.recentTransactions)?r.recentTransactions.slice().reverse():[],o=r?.hostBinding||{},n=Array.isArray(o.eventBindings)&&o.eventBindings.length>0?o.eventBindings.join(" / "):"\u6682\u65E0\u4E8B\u4EF6\u7ED1\u5B9A",i=s.length>0?s.slice(0,5).map(a=>{let l=a?.results?.[0]?.meta?.writebackDetails?.refresh||{};return`
          <div class="yyt-list-row">
            <div class="yyt-settings-runtime-meta">
              <span>${a?.sourceEvent||"UNKNOWN_EVENT"}</span>
              <span>${a?.phase||"unknown"}</span>
              <span>${a?.messageId||"no_message_id"}</span>
            </div>
            <div class="yyt-settings-runtime-main">${a?.verdict||a?.error||a?.generationKey||"\u65E0\u989D\u5916\u4FE1\u606F"}</div>
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
          <div class="yyt-list-table">${i}</div>
        </div>
      </div>
    `},_renderDebugTab(t){return`
      <div class="yyt-settings-tab-content" data-tab="debug">
        <div class="yyt-flow-section">
          <div class="yyt-flow-heading"><span class="yyt-flow-heading-icon"><i class="fa-solid fa-file-lines"></i></span>\u65E5\u5FD7\u7EA7\u522B</div>
          <div class="yyt-form-group">
            ${Ho({id:"yyt-setting-enableDebugLog",checked:t.enableDebugLog,title:"\u542F\u7528\u8C03\u8BD5\u65E5\u5FD7",hint:"\u5F00\u542F\u540E Logger \u9762\u677F\u5C06\u8BB0\u5F55 DEBUG \u7EA7\u522B\u65E5\u5FD7\uFF0C\u5173\u95ED\u4EC5\u8BB0\u5F55 INFO \u53CA\u4EE5\u4E0A"})}
          </div>
          <div class="yyt-settings-hint" style="margin-top: 8px;">
            <i class="fa-solid fa-terminal"></i> \u5728\u300C\u65E5\u5FD7\u300D\u9762\u677F\u4E2D\u67E5\u770B\u3001\u641C\u7D22\u548C\u5BFC\u51FA\u63D2\u4EF6\u8FD0\u884C\u65E5\u5FD7
          </div>
        </div>

        <div class="yyt-flow-section">
          <div class="yyt-flow-heading"><span class="yyt-flow-heading-icon"><i class="fa-solid fa-clock-rotate-left"></i></span>\u6267\u884C\u8BB0\u5F55</div>
          <div class="yyt-form-group">
            ${Ho({id:"yyt-setting-saveExecutionHistory",checked:t.saveExecutionHistory,title:"\u4FDD\u5B58\u6267\u884C\u5386\u53F2",hint:"\u8BB0\u5F55\u5DE5\u5177\u6267\u884C\u5386\u53F2\uFF0C\u4FBF\u4E8E\u95EE\u9898\u6392\u67E5"})}
          </div>
        </div>

        <div class="yyt-flow-section">
          <div class="yyt-flow-heading"><span class="yyt-flow-heading-icon"><i class="fa-solid fa-eye"></i></span>UI \u663E\u793A</div>
          <div class="yyt-form-group">
            ${Ho({id:"yyt-setting-showRuntimeBadge",checked:t.showRuntimeBadge,title:"\u663E\u793A\u8FD0\u884C\u72B6\u6001\u5FBD\u7AE0",hint:"\u5728\u5DE5\u5177\u5361\u7247\u4E0A\u663E\u793A\u8FD0\u884C\u72B6\u6001\u6307\u793A\u5668"})}
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
            ${Ho({id:"yyt-setting-compactMode",checked:t.compactMode,title:"\u7D27\u51D1\u6A21\u5F0F",hint:"\u51CF\u5C11\u5361\u7247\u95F4\u8DDD\uFF0C\u663E\u793A\u66F4\u591A\u5185\u5BB9"})}
          </div>

          <div class="yyt-form-group">
            ${Ho({id:"yyt-setting-animationEnabled",checked:t.animationEnabled,title:"\u542F\u7528\u52A8\u753B\u6548\u679C",hint:"\u754C\u9762\u8FC7\u6E21\u548C\u4EA4\u4E92\u52A8\u753B"})}
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
    `},_renderMacroList(){return It.getAvailableVariables().map(t=>`
        <div class="yyt-list-row">
          <code>${t.name}</code>
          <span>${t.description}</span>
        </div>
      `).join("")},bindEvents(t){let e=X();if(!e||!pe(t))return;let r=this;t.off(".yytSettings"),t.on("click.yytSettings",".yyt-settings-tab",o=>{let n=e(o.currentTarget).data("tab");t.find(".yyt-settings-tab").removeClass("yyt-active"),e(o.currentTarget).addClass("yyt-active"),t.find(".yyt-settings-tab-content").removeClass("yyt-active"),t.find(`.yyt-settings-tab-content[data-tab="${n}"]`).addClass("yyt-active")}),t.on("click.yytSettings","#yyt-settings-save",()=>{r._saveSettings(t)}),t.on("click.yytSettings","#yyt-settings-reset",async()=>{await er("\u91CD\u7F6E\u8BBE\u7F6E","\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u8BBE\u7F6E\u4E3A\u9ED8\u8BA4\u503C\u5417\uFF1F",{danger:!0})&&(Ct.resetSettings(),yl(Ko.ui,Go()),r.renderTo(t),R("success","\u8BBE\u7F6E\u5DF2\u91CD\u7F6E"))}),vt(t,{namespace:"yytSettingsSelect",selectors:["#yyt-setting-queueStrategy","#yyt-setting-theme"]});let s=Ct.getDebugSettings();C.setLevel(s.enableDebugLog?le.DEBUG:le.INFO)},_saveSettings(t){let e=X(),r=[{id:"yyt-setting-maxConcurrent",min:1,max:10,label:"\u6700\u5927\u5E76\u53D1\u6570"},{id:"yyt-setting-maxRetries",min:0,max:10,label:"\u6700\u5927\u91CD\u8BD5\u6B21\u6570"},{id:"yyt-setting-retryDelayMs",min:1e3,max:6e4,label:"\u91CD\u8BD5\u95F4\u9694"},{id:"yyt-setting-requestTimeoutMs",min:1e4,max:3e5,label:"\u8BF7\u6C42\u8D85\u65F6\u65F6\u95F4"},{id:"yyt-setting-automationSettleMs",min:0,max:1e4,label:"\u7B49\u5F85\u7A33\u5B9A\u65F6\u95F4"},{id:"yyt-setting-automationCooldownMs",min:0,max:6e4,label:"\u81EA\u52A8\u5316\u51B7\u5374\u65F6\u95F4"}];for(let o of r){let n=t.find(`#${o.id}`),i=n.val(),a=parseInt(i,10);if(isNaN(a)||a<o.min||a>o.max){R("warning",`${o.label} \u987B\u5728 ${o.min} ~ ${o.max} \u4E4B\u95F4`),n.trigger("focus").trigger("select");return}}let s={executor:{maxConcurrent:parseInt(t.find("#yyt-setting-maxConcurrent").val(),10)||3,maxRetries:parseInt(t.find("#yyt-setting-maxRetries").val(),10)||2,retryDelayMs:parseInt(t.find("#yyt-setting-retryDelayMs").val(),10)||5e3,requestTimeoutMs:parseInt(t.find("#yyt-setting-requestTimeoutMs").val(),10)||9e4,queueStrategy:t.find("#yyt-setting-queueStrategy").val()||"fifo"},automation:{settleMs:parseInt(t.find("#yyt-setting-automationSettleMs").val(),10)||1200,cooldownMs:parseInt(t.find("#yyt-setting-automationCooldownMs").val(),10)||5e3,maxConcurrentSlots:Ct.getSettings()?.automation?.maxConcurrentSlots||1},debug:{enableDebugLog:t.find("#yyt-setting-enableDebugLog").is(":checked"),saveExecutionHistory:t.find("#yyt-setting-saveExecutionHistory").is(":checked"),showRuntimeBadge:t.find("#yyt-setting-showRuntimeBadge").is(":checked")},ui:{theme:t.find("#yyt-setting-theme").val()||"dark-blue",compactMode:t.find("#yyt-setting-compactMode").is(":checked"),animationEnabled:t.find("#yyt-setting-animationEnabled").is(":checked")}};Ct.saveSettings(s),C.setLevel(s.debug.enableDebugLog?le.DEBUG:le.INFO),yl(s.ui,Go()),R("success","\u8BBE\u7F6E\u5DF2\u4FDD\u5B58")},_getAutomationRuntime(){try{return Hp()?.YouYouToolkit?.getAutomationRuntime?.()||null}catch{return null}},destroy(t){!X()||!pe(t)||(et(t,"yytSettingsSelect"),t.off(".yytSettings"))},getStyles(){return`
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
    `},renderTo(t){t.html(this.render({})),this.bindEvents(t,{})}},Sx=qp});function Tx(t={},e=-1){return[t?.sourceId,t?.messageId,t?.message_id,t?.id,t?.mid,t?.mesid,t?.mes_id,t?.chat_index,t?.index,e].map(r=>me(r))}function _x(t=[],e=""){let r=me(e);if(!r||!Array.isArray(t))return-1;for(let s=t.length-1;s>=0;s-=1){let o=t[s];if(Tx(o,s).includes(r))return s}return-1}function Yo(t={},e={}){let r=me(t?.sourceMessageId||t?.confirmedAssistantMessageId||t?.messageId);if(!r)return null;let s=Pa({resolvedAt:Date.now(),runSource:e.runSource||t?.runSource||Ye.MANUAL,traceId:t?.traceId||"",chatId:t?.chatId||"",sourceMessageId:r,sourceSwipeId:t?.sourceSwipeId||t?.effectiveSwipeId||"",effectiveSwipeId:t?.effectiveSwipeId||t?.sourceSwipeId||"swipe:current",slotBindingKey:t?.slotBindingKey||"",slotRevisionKey:t?.slotRevisionKey||"",slotTransactionId:t?.slotTransactionId||"",assistantContentFingerprint:t?.assistantContentFingerprint||"",assistantBaseFingerprint:t?.assistantBaseFingerprint||"",assistantText:t?.lastAiMessage||"",assistantBaseText:t?.assistantBaseText||"",targetMessageIndex:_x(t?.chatMessages||t?.chatHistory||[],r)});return!s.slotBindingKey||!s.slotRevisionKey?null:s}async function Ex({runSource:t=Ye.MANUAL}={}){let e=await Vr({runSource:t});return Yo(e,{runSource:t})}async function Ax({messageId:t,swipeId:e="",runSource:r=Ye.AUTO}={}){let s=await Jr({messageId:t,swipeId:e,runSource:r});return Yo(s,{runSource:r})}async function Vp(t=null,e={}){let r=t||null;if(typeof e.resolveTarget=="function")return await e.resolveTarget(r);let s=me(e.runSource||r?.runSource)||Ye.MANUAL,o=me(e.messageId||r?.sourceMessageId),n=me(e.swipeId||r?.sourceSwipeId||r?.effectiveSwipeId);return e.useMessageTarget===!0||s===Ye.AUTO?o?Ax({messageId:o,swipeId:n,runSource:s}):null:Ex({runSource:s})}function Jp(t,e){let r=t||null,s=e||null;return!r||!s?{valid:!1,reason:"missing_target_snapshot"}:me(r.sourceMessageId)!==me(s.sourceMessageId)?{valid:!1,reason:"source_message_changed"}:me(r.sourceSwipeId||r.effectiveSwipeId)!==me(s.sourceSwipeId||s.effectiveSwipeId)?{valid:!1,reason:"source_swipe_changed"}:me(r.slotRevisionKey)!==me(s.slotRevisionKey)?{valid:!1,reason:"slot_revision_changed"}:{valid:!0,reason:"ok"}}var ml=L(()=>{Xr();it()});function mr(t,e=""){return t==null?e:String(t).trim()||e}function Cx(t){if(!t||t?.is_user===!0||t?.is_system===!0)return!1;let e=String(t?.role||"").trim().toLowerCase();return e==="assistant"||e==="ai"||!e}function kx(t){return!t||typeof t!="object"||Array.isArray(t)?!1:!!(Array.isArray(t.tables)||typeof t.chatId=="string"&&t.chatId.length>0||typeof t.slotBindingKey=="string"&&t.slotBindingKey.length>0)}function Xp(t,e){if(!t)return null;let r=t[js];if(!r)return null;let s=je(e);return kx(r)?s===Et?r:null:r[s]||null}function qo({loadMode:t=ns.EMPTY,mergeBaseOnly:e=!1,state:r=null,sourceKind:s=ut.EMPTY,resolvedFromMessageId:o="",resolvedFromRevisionKey:n=""}={}){let i=cr(r)||null;return{loadMode:t,mergeBaseOnly:e,state:i,sourceKind:s,resolvedFromMessageId:mr(o,i?.sourceMessageId||""),resolvedFromRevisionKey:mr(n,i?.slotRevisionKey||"")}}function hl(t,e={}){let r=cr(t);return r?cr({...r,meta:{...r.meta||{},...e||{}}}):null}function Qp({runtime:t,targetSnapshot:e,currentMessageIndex:r=-1,templateTables:s=[],isolationKey:o}={}){let n=Array.isArray(t?.chat)?t.chat:[],i=mr(e?.slotRevisionKey,""),a=mr(e?.slotBindingKey,""),l=je(o===void 0?"":o);if(r>=0&&r<n.length){let d=Xp(n[r],l),c=cr(d);if(c&&mr(c.slotRevisionKey,"")===i)return qo({loadMode:ns.EXACT,mergeBaseOnly:!1,state:hl(c,{sourceKind:ut.EXACT,isolationKey:l,resolvedFromMessageId:c.sourceMessageId,resolvedFromRevisionKey:c.slotRevisionKey}),sourceKind:ut.EXACT,resolvedFromMessageId:c.sourceMessageId,resolvedFromRevisionKey:c.slotRevisionKey});if(c&&mr(c.slotBindingKey,"")===a){let u=hl({...c,slotRevisionKey:i||c.slotRevisionKey,sourceSwipeId:mr(e?.sourceSwipeId||e?.effectiveSwipeId,c.sourceSwipeId),meta:{...c.meta||{},sourceKind:ut.BINDING,mergeBaseOnly:!0,fallbackFromBinding:!0,isolationKey:l,fallbackFromRevisionKey:mr(c.slotRevisionKey,""),requestedRevisionKey:i,resolvedFromMessageId:c.sourceMessageId,resolvedFromRevisionKey:c.slotRevisionKey}});return qo({loadMode:ns.BINDING_FALLBACK,mergeBaseOnly:!0,state:u,sourceKind:ut.BINDING,resolvedFromMessageId:c.sourceMessageId,resolvedFromRevisionKey:c.slotRevisionKey})}}if(r>0)for(let d=r-1;d>=0;d-=1){let c=n[d];if(!Cx(c))continue;let u=Xp(c,l),p=cr(u);if(!p||!Array.isArray(p.tables)||p.tables.length===0)continue;let y=hl({...p,slotBindingKey:a||p.slotBindingKey,slotRevisionKey:i||p.slotRevisionKey,sourceSwipeId:mr(e?.sourceSwipeId||e?.effectiveSwipeId,p.sourceSwipeId),meta:{...p.meta||{},sourceKind:ut.HISTORY,mergeBaseOnly:!0,reconstructedFromHistory:!0,isolationKey:l,resolvedFromMessageId:p.sourceMessageId,resolvedFromRevisionKey:p.slotRevisionKey}});return qo({loadMode:ns.HISTORY,mergeBaseOnly:!0,state:y,sourceKind:ut.HISTORY,resolvedFromMessageId:p.sourceMessageId,resolvedFromRevisionKey:p.slotRevisionKey})}return Array.isArray(s)&&s.length>0?qo({loadMode:ns.TEMPLATE,mergeBaseOnly:!1,state:Ro(e,{tables:fe(s),meta:{fromTemplate:!0,isolationKey:l,sourceKind:ut.TEMPLATE,resolvedFromMessageId:"",resolvedFromRevisionKey:""}}),sourceKind:ut.TEMPLATE}):qo({loadMode:ns.EMPTY,mergeBaseOnly:!1,state:Ro(e,{meta:{isolationKey:l,sourceKind:ut.EMPTY,resolvedFromMessageId:"",resolvedFromRevisionKey:""}}),sourceKind:ut.EMPTY})}var Zp=L(()=>{it()});function ey(t){return t==null?"":String(t).trim()}function Ix(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window}function ry(){try{let t=Ix(),e=t?.SillyTavern||null,r=e?.getContext?.()||null,s=Array.isArray(r?.chat)?r.chat:[],o=Array.isArray(e?.chat)?e.chat:[],n=s.length?s:o;return{topWindow:t,api:e,context:r,chat:n,contextChat:s,apiChat:o}}catch{return{topWindow:null,api:null,context:null,chat:[],contextChat:[],apiChat:[]}}}function Mx(t){if(!t||t?.is_user===!0||t?.is_system===!0)return!1;let e=String(t?.role||"").trim().toLowerCase();return e==="assistant"||e==="ai"||!e}function Rx(t=[],e=""){let r=ey(e);if(!Array.isArray(t)||!r)return-1;for(let s=t.length-1;s>=0;s-=1){let o=t[s];if(!Mx(o))continue;if([o?.sourceId,o?.message_id,o?.messageId,o?.id,o?.mes_id,o?.mid,o?.mesid,o?.chat_index,o?.index,s].map(i=>ey(i)).includes(r))return s}return-1}function xl(t){let e=ry(),r=Rx(e.chat,t?.sourceMessageId);return r<0?{runtime:e,messageIndex:r,message:null}:{runtime:e,messageIndex:r,message:e.chat[r]||null}}function wl(t,e,r){let s=o=>{!Array.isArray(o)||e<0||e>=o.length||(o[e]={...o[e]||{},...r})};s(t?.contextChat),s(t?.apiChat)}async function vl(t){let e=t?.context||null,r=t?.api||null,s=e?.saveChatDebounced||r?.saveChatDebounced||null,o=e?.saveChat||r?.saveChat||null;typeof s=="function"&&s.call(e||r),typeof o=="function"&&await o.call(e||r)}function Sl(t){return!t||typeof t!="object"||Array.isArray(t)?!1:!!(Array.isArray(t.tables)||typeof t.chatId=="string"&&t.chatId.length>0||typeof t.slotBindingKey=="string"&&t.slotBindingKey.length>0)}function Zs(t){return!t||typeof t!="object"||Array.isArray(t)?!1:"lastResolvedTarget"in t||"lastCommittedTarget"in t}function di(t,e,r,s){if(!t)return null;let o=t[e];if(!o)return null;let n=je(r);return typeof s=="function"&&s(o)?n===Et?o:null:o[n]||null}function bl(t,e,r,s,o){if(!t)return;let n=je(r),i=t[e];if(typeof o=="function"&&o(i)){let a={[Et]:i};a[n]=s,t[e]=a}else i&&typeof i=="object"&&!Array.isArray(i)?t[e]={...i,[n]:s}:t[e]={[n]:s}}function ty(t,e,r,s){if(!t)return!1;let o=je(r),n=t[e];if(!n)return!1;if(typeof s=="function"&&s(n))return o===Et?(delete t[e],!0):!1;if(n&&typeof n=="object"&&!Array.isArray(n)){if(n[o]===void 0)return!1;let i={...n};return delete i[o],Object.keys(i).length===0?delete t[e]:t[e]=i,!0}return!1}function sy(t,e={}){let{runtime:r,messageIndex:s}=xl(t);return Qp({runtime:r,targetSnapshot:t,currentMessageIndex:s,templateTables:Array.isArray(e.templateTables)?e.templateTables:[],isolationKey:e.isolationKey===void 0?Ie.getKey():e.isolationKey})}async function oy(t,e={}){let{runtime:r,messageIndex:s,message:o}=xl(t);if(!o||s<0)return{success:!1,error:"target_message_not_found"};let n=e.isolationKey===void 0?Ie.getKey():e.isolationKey,i=di(o,os,n,Zs),a={...Ln(i),lastResolvedTarget:Us(t),updatedAt:Date.now()};return bl(o,os,n,a,Zs),wl(r,s,o),await vl(r),{success:!0,bindings:a}}async function ny(t,e,r={}){let s=r.skipFreshValidation===!0?t:await Vp(t,r),o=r.skipFreshValidation===!0?{valid:!0,reason:"skipped"}:Jp(t,s);if(!o.valid)return{success:!1,error:"target_changed_before_commit",validation:o};let n=s||t,{runtime:i,messageIndex:a,message:l}=xl(n);if(!l||a<0)return{success:!1,error:"target_message_not_found",validation:o};let d=r.isolationKey===void 0?Ie.getKey():r.isolationKey,c=Ro(n),u={...c.meta||{},...e.meta||{},...r.locks?{locks:r.locks}:{},...r.previousSnapshot?{previousSnapshot:r.previousSnapshot}:{},isolationKey:d},p=cr({...c,...e,meta:u,slotBindingKey:n.slotBindingKey,slotRevisionKey:n.slotRevisionKey,sourceMessageId:n.sourceMessageId,sourceSwipeId:n.sourceSwipeId||n.effectiveSwipeId,updatedAt:Date.now()}),y=di(l,os,d,Zs),f={...Ln(y),lastResolvedTarget:Us(n),lastCommittedTarget:Us(n),updatedAt:Date.now()};return bl(l,js,d,p,Sl),bl(l,os,d,f,Zs),wl(i,a,l),await vl(i),{success:!0,state:p,bindings:f,validation:o,messageIndex:a,sourceMessageId:n.sourceMessageId,slotRevisionKey:n.slotRevisionKey}}function iy(t=null,e={}){let r=mt.getAssistantMessageSnapshot(t);if(!r?.message)return null;let s=e.isolationKey===void 0?Ie.getKey():e.isolationKey;return{...r,tableState:cr(di(r.message,js,s,Sl)),tableBindings:Ln(di(r.message,os,s,Zs))}}async function ay(t,e={}){let r=ry();if(!Array.isArray(r.chat)||t<0||t>=r.chat.length)return{success:!1,error:"invalid_message_index",messageIndex:t};let s=r.chat[t];if(!s)return{success:!1,error:"message_not_found",messageIndex:t};let o=e.isolationKey===void 0?Ie.getKey():e.isolationKey,n=ty(s,js,o,Sl),i=e.clearBindings===!1?!1:ty(s,os,o,Zs);return(n||i)&&(wl(r,t,s),await vl(r)),{success:!0,cleared:n||i,messageIndex:t,isolationKey:o}}var Tl=L(()=>{ps();it();ls();Zp();ml()});function cy(t){let e=new Set;if(!Array.isArray(t))return e;for(let r of t){let s=r?.order;Number.isFinite(s)&&e.add(Math.floor(s))}return e}function _l(t,e=5e4,r=1,s=99999){for(let o=e;o<=s;o++)if(!t.has(o))return t.add(o),o;for(let o=r;o<e;o++)if(!t.has(o))return t.add(o),o;return ly.warn("\u65E0\u53EF\u7528 order \u69FD\u4F4D"),t.add(e),e}function dy(t,e,r=5e4,s=1,o=99999){let n=o-e+1;for(let i=r;i<=n;i++){let a=!0;for(let l=0;l<e;l++)if(t.has(i+l)){a=!1;break}if(a){for(let l=0;l<e;l++)t.add(i+l);return i}}for(let i=s;i<r&&i<=n;i++){let a=!0;for(let l=0;l<e;l++)if(t.has(i+l)){a=!1;break}if(a){for(let l=0;l<e;l++)t.add(i+l);return i}}ly.warn(`\u65E0\u6CD5\u5206\u914D ${e} \u4E2A\u8FDE\u7EED order \u69FD\u4F4D`);for(let i=0;i<e;i++)t.add(r+i);return r}var ly,uy=L(()=>{q();ly=C.createScope("TableWBOrder")});function El(t,e="before_character_definition"){let r=String(t||"").trim().toLowerCase();return r==="at_depth_as_system"||r==="system"?"at_depth_as_system":r==="before_char"||r==="before_character"||r==="before_character_definition"||r==="0"?"before_character_definition":r==="after_char"||r==="after_character"||r==="after_character_definition"||r==="1"?"after_character_definition":e}function Vo(t,e){if(!e)return t;let r={...t,position:e.position};return e.position==="at_depth_as_system"?r.depth=e.depth:delete r.depth,r}var rE,sE,py=L(()=>{rE=Object.freeze(["at_depth_as_system","before_character_definition","after_character_definition"]);sE=Object.freeze({position:"before_character_definition",depth:2,order:5e4})});function Al(t,e=""){return t==null?e:String(t).trim()||e}function Ox(t){return Al(t,"default_chat").replace(/[\[\]=]/g,"_")}function Lx(){let t=globalThis.window||globalThis;return Al(t?.TavernHelper?.getCurrentChatId?.()||t?.Silvy?.getCurrentChatId?.()||t?.chat_metadata?.chat_id||t?.this_chid||t?.name1,"default_chat")}function Nx(){try{if(typeof TavernHelper<"u"&&TavernHelper)return TavernHelper}catch{}return Cr()?.TavernHelper||null}function Dx(t){return String(t??"").replace(/\|/g,"\uFF5C").replace(/\n/g," ")}function yy(t){let e=Array.isArray(t.columns)?t.columns:[],r=Array.isArray(t.rows)?t.rows:[];if(r.length===0)return"";let s=e.map(l=>l.key),o=e.map(l=>l.title||l.key),n=`| ${o.join(" | ")} |`,i=`| ${o.map(()=>"---").join(" | ")} |`,a=r.map(l=>{let d=l.cells||{};return`| ${s.map(c=>Dx(d[c])).join(" | ")} |`});return`# ${t.name||"\u672A\u547D\u540D\u8868"}

${n}
${i}
${a.join(`
`)}`}function Bx(t,e){return!Array.isArray(t)||t.length===0?e||[]:!Array.isArray(e)||e.length===0?t:e.map((r,s)=>{let o=t[s];return o?{...r,name:r.name||o.name||"",columns:Array.isArray(r.columns)&&r.columns.length>0?r.columns:Array.isArray(o.columns)?o.columns:[],rows:Array.isArray(o.rows)?o.rows:Array.isArray(r.rows)?r.rows:[],enabled:o.enabled!==void 0?o.enabled:r.enabled,exportConfig:r.exportConfig||o.exportConfig||{enabled:!1}}:r})}function ui(t){return`${gy}${Px}${Ox(t)}${$x}-`}function zx(t){return`${gy}[${Al(t,"default_chat")}]-`}function my(t,e){if(!t||typeof t!="string")return!1;let r=ui(e);if(t.startsWith(r))return!0;let s=zx(e);return!!t.startsWith(s)}function Kx(t,e){let r=ui(t),s=String(e||"").trim();return s?`${r}${s}`:`${r}\u586B\u8868\u6570\u636E`}function fy(t,e,r){return`${ui(t)}Wrapper-${r}`}function Ux(t,e){return t?t.content!==e.content||t.enabled!==e.enabled||t.type!==e.type||t.position!==e.position||t.prevent_recursion!==e.prevent_recursion||t.order!==e.order:!0}async function Jo(t,e,r,s,o,n,i){let a=r.find(l=>l.comment===s);return a&&i&&!my(a.comment,i)?(eo.warn(`upsert \u8DF3\u8FC7\uFF1A\u73B0\u6709\u6761\u76EE comment "${s}" \u4E0D\u5C5E\u4E8E\u5F53\u524D chat`,{chatId:i}),{action:"skipped",comment:s,reason:"cross_chat_collision"}):a&&a.uid?Ux(a,o)?(await Promise.resolve(t.setLorebookEntries(e,[{uid:a.uid,...o}])),eo.info(`\u4E16\u754C\u4E66\u6761\u76EE\u5DF2\u66F4\u65B0\uFF1A${s}`),{action:"updated",comment:s}):(n.add(a.order||0),{action:"skipped",comment:s}):typeof t.createLorebookEntries=="function"?(await Promise.resolve(t.createLorebookEntries(e,[{comment:s,keys:[],...o}])),eo.info(`\u4E16\u754C\u4E66\u6761\u76EE\u5DF2\u521B\u5EFA\uFF1A${s}`),{action:"created",comment:s}):{action:"failed",comment:s,error:"createLorebookEntries \u4E0D\u53EF\u7528"}}async function hy(t,e){let r=e?.worldbookSync;if(!r?.enabled)return{skipped:!0,reason:"disabled"};let s=String(r.targetBook||"").trim();if(!s)return{skipped:!0,reason:"no_target_book"};let o=Nx();if(!o)return{success:!1,error:"TavernHelper \u4E0D\u53EF\u7528"};if(typeof o.getLorebookEntries!="function")return{success:!1,error:"getLorebookEntries \u4E0D\u53EF\u7528"};if(typeof o.setLorebookEntries!="function"&&typeof o.createLorebookEntries!="function")return{success:!1,error:"\u4E16\u754C\u4E66\u5199\u5165 API \u4E0D\u53EF\u7528"};let n=Lx(),i=ui(n),a=Array.isArray(e?.tables)?e.tables:[],d=Bx(t,a).filter(p=>p&&p.enabled!==!1&&Array.isArray(p.rows)&&p.rows.length>0);if(d.length===0)return{skipped:!0,reason:"empty_tables"};let c=e?.wrapperConfig||{},u=c.enabled!==!1;try{let p=await Promise.resolve(o.getLorebookEntries(s));Array.isArray(p)||(p=[]);let y=cy(p),f=[],m=d.filter(_=>_.exportConfig?.enabled===!0),b=d.filter(_=>_.exportConfig?.enabled!==!0),w="";if(b.length>0&&(w=b.map(_=>yy(_)).join(`

`)),u&&(w||m.length>0)){let _=c.wrapperTag||"\u6700\u65B0\u6570\u636E\u4E0E\u8BB0\u5F55",T=c.wrapperHint||"",F=c.wrapperPlacement||{},U=F.order||5e4,A=dy(y,3,U,1,99999),O=El(F.position,"before_character_definition"),J=Number.isFinite(F.depth)?F.depth:2,j=`<${_}>
${T}`;f.push(await Jo(o,s,p,fy(n,_,"Start"),Vo({content:j,enabled:!0,type:"constant",order:A,prevent_recursion:!0},{position:O,depth:J}),y,n)),w&&f.push(await Jo(o,s,p,`${i}\u5168\u5C40\u6570\u636E`,Vo({content:w,enabled:!0,type:"constant",order:A+1,prevent_recursion:!0},{position:O,depth:J}),y,n)),f.push(await Jo(o,s,p,fy(n,_,"End"),Vo({content:`</${_}>`,enabled:!0,type:"constant",order:A+2,prevent_recursion:!0},{position:O,depth:J}),y,n))}else if(w){let _=_l(y,5e4,1,99999);f.push(await Jo(o,s,p,`${i}\u5168\u5C40\u6570\u636E`,{content:w,enabled:!0,type:"constant",position:"before_character_definition",order:_,prevent_recursion:!0},y,n))}for(let _ of m){let T=_.exportConfig||{},F=T.entryName||_.name||"\u672A\u547D\u540D\u8868",U=Kx(n,F),A=yy(_);if(!A)continue;let O=T.entryPlacement||{},J=El(O.position,"before_character_definition"),j=_l(y,O.order||5e4,1,99999),Z=T.entryType==="keyword"?"keyword":"constant";f.push(await Jo(o,s,p,U,Vo({content:A,enabled:!0,type:Z,order:j,prevent_recursion:T.preventRecursion!==!1},{position:J,depth:O.depth||2}),y,n))}let S=new Set(f.map(_=>_.comment).filter(Boolean)),v=p.filter(_=>!_.comment||!my(_.comment,n)?!1:!S.has(_.comment));if(v.length>0){let _=v.map(T=>T.uid).filter(Boolean);_.length>0&&typeof o.deleteLorebookEntries=="function"&&(await Promise.resolve(o.deleteLorebookEntries(s,_)),eo.info(`\u5DF2\u6E05\u7406 ${_.length} \u4E2A\u65E7\u4E16\u754C\u4E66\u6761\u76EE [${n}]`))}let K=f.filter(_=>_.action==="created").length,P=f.filter(_=>_.action==="updated").length;return eo.info(`\u4E16\u754C\u4E66\u540C\u6B65\u5B8C\u6210 [${n}]\uFF1A${K} \u521B\u5EFA, ${P} \u66F4\u65B0, ${v.length} \u6E05\u7406`),{success:!0,results:f,stats:{created:K,updated:P,cleaned:v.length},targetBook:s,chatId:n}}catch(p){return eo.warn("\u4E16\u754C\u4E66\u540C\u6B65\u5931\u8D25:",p),{success:!1,error:p?.message||"\u4E16\u754C\u4E66\u540C\u6B65\u5931\u8D25"}}}var eo,gy,Px,$x,by=L(()=>{Xr();q();uy();py();eo=C.createScope("TableWorldbookSync"),gy="YYT-",Px="[YY:chatId=",$x="]"});function pi(t,e=""){return t==null?e:String(t).trim()||e}function Wx(t={}){return{tables:Array.isArray(t?.tables)?fe(t.tables):[]}}function Fx(t={},e={}){let r=pi(e.mirrorTag,"yyt-table-workbench"),s=Wx(t);return[`<${r}>`,"[\u586B\u8868\u5DE5\u4F5C\u53F0]","```json",JSON.stringify(s,null,2),"```",`</${r}>`].join(`
`)}async function xy({targetSnapshot:t,nextTables:e,config:r,loadResult:s=null,diff:o=null,fillMode:n="",skipNotify:i=!1}={}){let a=At(r),l=await ny(t,{tables:Array.isArray(e)?fe(e):[],meta:{lastLoadMode:pi(s?.loadMode,""),lastFillMode:pi(n),mergeBaseOnly:!1,updatedBy:pi(t?.runSource,"MANUAL_TABLE")}});if(!l?.success)return{success:!1,error:l?.error||"table_state_commit_failed",commitResult:l,mirrorResult:null,warning:""};let d=null,c=null,u="";if(a.mirrorToMessage){let p=Fx(l.state,{mirrorTag:a.mirrorTag});d=await mt.injectDetailed(jx,p,{overwrite:!0,extractionSelectors:[a.mirrorTag],sourceMessageId:l.sourceMessageId,sourceSwipeId:t?.sourceSwipeId||t?.effectiveSwipeId,effectiveSwipeId:t?.effectiveSwipeId||t?.sourceSwipeId,slotBindingKey:t?.slotBindingKey,slotRevisionKey:t?.slotRevisionKey,slotTransactionId:t?.slotTransactionId,traceId:t?.traceId,skipNotify:i}),d?.success||(u=d?.error||"\u6B63\u6587\u955C\u50CF\u5199\u56DE\u5931\u8D25")}return a.worldbookSync?.enabled&&(c=await hy(Array.isArray(e)?e:[],a),c&&!c.success&&!c.skipped&&(u=u?`${u}; ${c.error}`:c.error||"\u4E16\u754C\u4E66\u540C\u6B65\u5931\u8D25")),{success:!0,state:l.state,bindings:l.bindings,diff:o,fillMode:n,commitResult:l,mirrorResult:d,worldbookSyncResult:c,warning:u}}var jx,wy=L(()=>{ps();it();Tl();dr();by();jx="tableWorkbenchMirror"});function Hx(t){return typeof t!="string"||!t?t:t.replace(/[“”「」『』＂]/g,'"')}function Cl(t,e){for(let r=e;r<t.length;r++)if(!/\s/.test(t[r]))return{char:t[r],index:r};return{char:"",index:-1}}function Ty(t){return!!t&&(t==='"'||t==="{"||t==="["||t==="-"||/\d/.test(t)||t==="t"||t==="f"||t==="n")}function Gx(t,e,r,s){let o=Cl(t,e+1),n=o.char;if(!n)return r!=="key";if(r==="key")return n===":";if(n==="}"||n==="]")return!0;if(n!==",")return!1;let i=Cl(t,o.index+1).char;return i?s==="object"?i==='"'||i==="}":s==="array"?i==="]"||Ty(i):Ty(i)||i==="}"||i==="]":!0}function Yx(t){if(typeof t!="string")return{success:!1,result:t,error:"not a string"};let e="",r=!1,s=!1,o=null,n=[],i=()=>n.length?n[n.length-1]:null,a=()=>{let l=i();l&&(l.expecting="commaOrEnd")};for(let l=0;l<t.length;l++){let d=t[l];if(s){e+=d,s=!1;continue}if(r){if(d==="\\"){e+=d,s=!0;continue}if(d==='"'){let c=i();Gx(t,l,o,c?.type||null)?(e+=d,r=!1,o==="key"&&c?.type==="object"?c.expecting="colon":a(),o=null):e+='\\"';continue}e+=d;continue}if(d==='"'){e+=d,r=!0;let c=i();o=c&&c.type==="object"&&(c.expecting==="key"||c.expecting==="keyOrEnd")?"key":"value";continue}if(d==="{"){e+=d,n.push({type:"object",expecting:"keyOrEnd"});continue}if(d==="["){e+=d,n.push({type:"array",expecting:"valueOrEnd"});continue}if(d===":"){e+=d;let c=i();c?.type==="object"&&(c.expecting="value");continue}if(d===","){e+=d;let c=i();c?.type==="object"&&(c.expecting="key"),c?.type==="array"&&(c.expecting="value");continue}if(d==="}"||d==="]"){e+=d,n.pop(),a();continue}e+=d}return{success:!0,result:e,error:null}}function qx(t){if(typeof t!="string"||!t)return t;let e="",r=!1,s=!1;for(let o=0;o<t.length;o++){let n=t[o];if(s){e+=n,s=!1;continue}if(n==="\\"){e+=n,r&&(s=!0);continue}if(n==='"'){e+=n,r=!r;continue}if(r){if(n===`
`){e+="\\n";continue}if(n==="\r"){e+="\\r";continue}if(n==="	"){e+="\\t";continue}if(n==="\0"){e+="\\u0000";continue}}e+=n}return e}function Vx(t){if(typeof t!="string"||!t)return t;let e="",r=!1,s=!1;for(let o=0;o<t.length;o++){let n=t[o];if(s){e+=n,s=!1;continue}if(n==="\\"){e+=n,r&&(s=!0);continue}if(n==='"'){e+=n,r=!r;continue}if(!r&&n===","){let i=Cl(t,o+1).char;if(i==="}"||i==="]")continue}e+=n}return e}function Jx(t){return typeof t!="string"||!t?t:t.replace(/([{,]\s*)(-?\d+)(\s*:)/g,'$1"$2"$3')}function Xo(t){if(typeof t!="string")return{success:!1,result:t,layersApplied:[],error:"Input is not a string"};let e=[],r=t,s=Hx(r);s!==r&&e.push("normalizeQuotes"),r=s;let o=Yx(r);if(!o.success)return{success:!1,result:r,layersApplied:e,error:o.error};o.result!==r&&e.push("escapeUnescapedQuotes"),r=o.result;let n=qx(r);n!==r&&e.push("sanitizeControlChars"),r=n;let i=Vx(r);i!==r&&e.push("removeTrailingCommas"),r=i;let a=Jx(r);return a!==r&&e.push("fixNumericKeys"),r=a,{success:!0,result:r,layersApplied:e,error:null}}function Xx(t,e=","){if(typeof t!="string"||!t)return[];let r=[],s="",o=!1,n=!1,i=0,a=0,l=0;for(let d=0;d<t.length;d++){let c=t[d];if(n){s+=c,n=!1;continue}if(c==="\\"){s+=c,o&&(n=!0);continue}if(c==='"'){s+=c,o=!o;continue}if(!o){if(c==="{")i++;else if(c==="}")i=Math.max(0,i-1);else if(c==="[")a++;else if(c==="]")a=Math.max(0,a-1);else if(c==="(")l++;else if(c===")")l=Math.max(0,l-1);else if(c===e&&i===0&&a===0&&l===0){s.trim()&&r.push(s.trim()),s="";continue}}s+=c}return s.trim()&&r.push(s.trim()),r}function Qx(t,e=":"){if(typeof t!="string"||!t)return-1;let r=!1,s=!1,o=0,n=0,i=0;for(let a=0;a<t.length;a++){let l=t[a];if(s){s=!1;continue}if(l==="\\"){r&&(s=!0);continue}if(l==='"'){r=!r;continue}if(!r){if(l==="{")o++;else if(l==="}")o=Math.max(0,o-1);else if(l==="[")n++;else if(l==="]")n=Math.max(0,n-1);else if(l==="(")i++;else if(l===")")i=Math.max(0,i-1);else if(l===e&&o===0&&n===0&&i===0)return a}}return-1}function kl(t){if(typeof t!="string")return{success:!0,value:t,error:null};let e=t.trim();if(!e)return{success:!1,value:null,error:"Empty value"};let s=`[${e.startsWith("'")&&e.endsWith("'")?`"${e.slice(1,-1).replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\r/g,"\\r").replace(/\n/g,"\\n").replace(/\t/g,"\\t")}"`:e}]`;try{return{success:!0,value:JSON.parse(s)[0],error:null}}catch(o){let n=Xo(s);if(n.success)try{return{success:!0,value:JSON.parse(n.result)[0],error:null}}catch{}return{success:!1,value:null,error:o?.message||"Failed to parse loose value"}}}function Zx(t){let e=typeof t=="string"?t.trim():"";if(!e)return null;if(/^-?\d+$/.test(e))return e;let r=kl(e);return r.success&&(typeof r.value=="string"||typeof r.value=="number")?String(r.value):e.replace(/^["']|["']$/g,"")}function _y(t){if(typeof t!="string")return{success:!1,result:null,recoveredKeys:[],error:"not a string"};let e=t.trim();if(!e.startsWith("{")||!e.endsWith("}"))return{success:!1,result:null,recoveredKeys:[],error:"not an object literal"};let r=e.slice(1,-1).trim();if(!r)return{success:!0,result:{},recoveredKeys:[],error:null};let s=Xx(r,",").filter(Boolean);if(!s.length)return{success:!1,result:null,recoveredKeys:[],error:"no segments"};let o={},n=0;for(let a of s){let l=Qx(a,":");if(l!==-1){let c=Zx(a.slice(0,l)),u=kl(a.slice(l+1));if(!c||!u.success)return{success:!1,result:null,recoveredKeys:Object.keys(o),error:`Failed segment: ${a}`};o[c]=u.value;let p=parseInt(c,10);!isNaN(p)&&String(p)===c&&(n=Math.max(n,p+1));continue}let d=kl(a);if(!d.success)return{success:!1,result:null,recoveredKeys:Object.keys(o),error:`Failed value: ${a}`};for(;Object.prototype.hasOwnProperty.call(o,String(n));)n++;o[String(n)]=d.value,n++}let i=Object.keys(o).sort((a,l)=>parseInt(a,10)-parseInt(l,10));return i.length?{success:!0,result:o,recoveredKeys:i,error:null}:{success:!1,result:null,recoveredKeys:[],error:"no keys recovered"}}function ew(t){if(typeof t!="string")return"";let e=t.trim();return e=e.replace(/'\s*\+\s*'/g,""),e.startsWith("'")&&e.endsWith("'")&&(e=e.slice(1,-1)),e=e.replace(/\\n/g,`
`),e=e.replace(/\\\\"/g,'\\"'),e=e.replace(/：/g,":"),e}function tw(t){let e=ew(t);if(!e)return[];let r=[];vy.lastIndex=0;let s;for(;(s=vy.exec(e))!==null;){let a=s[1];a&&a.trim()&&r.push(a)}if(r.length)return r;let o=a=>/(insertRow|updateRow|deleteRow)\s*\(/.test(a),n=/<!--([\s\S]*?)-->/g,i=[];for(;(s=n.exec(e))!==null;)o(s[1])&&i.push(s[1]);return i}function rw(t){let e=t.split(/\r?\n/),r=[],s="",o=!1;for(let i of e){let a=i.trim();if(!a||(!o&&a.includes("//")&&!a.includes('"//')&&!a.includes("'//")&&(a=a.split("//")[0].trim()),!a))continue;if(/^(insertRow|updateRow|deleteRow)\s*\(/.test(a)&&!o?(s&&r.push(s),s=a):s+=(s?" ":"")+a,s){let d=(s.match(/\{/g)||[]).length,c=(s.match(/\}/g)||[]).length;o=d>c}}s&&r.push(s);let n=[];for(let i of r){let a=/(?:^|;\s*)((?:insertRow|deleteRow|updateRow)\s*\()/g,l=[],d;for(;(d=a.exec(i))!==null;)l.push(d.index+(d[0].length-d[1].length));if(l.length<=1)n.push(i.replace(/;\s*$/,""));else for(let c=0;c<l.length;c++){let u=l[c],p=c+1<l.length?l[c+1]:i.length,y=i.substring(u,p).replace(/;\s*$/,"").trim();y&&n.push(y)}}return n}function sw(t){try{let e=t;if(e.match(/\)\s*;?\s*\/\/.*$/)&&(e=e.replace(/\/\/.*$/,"").trim()),!e)return null;let r=e.match(/^(insertRow|deleteRow|updateRow)\s*\((.*)\);?$/);if(!r)return null;let s=r[1],o=r[2],n=o.indexOf("{");if(n===-1)return{command:s,args:JSON.parse(`[${o}]`),line:e};let i=o.substring(0,n).trim(),a=o.substring(n),l=JSON.parse(`[${i.replace(/,$/,"")}]`);try{return{command:s,args:[...l,JSON.parse(a)],line:e}}catch{}let d=_y(a);if(d.success)return{command:s,args:[...l,d.result],line:e};let c=Xo(a);if(!c.success)return null;try{return{command:s,args:[...l,JSON.parse(c.result)],line:e}}catch{}let u=_y(c.result);return u.success?{command:s,args:[...l,u.result],line:e}:null}catch{return null}}function ow(t){if(!t)return null;let{command:e,args:r}=t;if(e==="insertRow"){let s=typeof r[0]=="number"?r[0]:0,o=typeof r[1]=="object"&&r[1]!==null?r[1]:{};return{op:e,tableIndex:s,data:o}}if(e==="deleteRow"){let s=typeof r[0]=="number"?r[0]:0,o=typeof r[1]=="number"?r[1]:0;return{op:e,tableIndex:s,rowIndex:o}}if(e==="updateRow"){let s=typeof r[0]=="number"?r[0]:0,o=typeof r[1]=="number"?r[1]:0,n=typeof r[2]=="object"&&r[2]!==null?r[2]:{};return{op:e,tableIndex:s,rowIndex:o,data:n}}return null}function nw(t){let e=tw(t);if(!e.length)return null;let r=[];for(let s of e){let o=s.replace(/<!--|-->/g,"").trim();if(!o)continue;let n=rw(o);for(let i of n){let a=sw(i),l=ow(a);l&&r.push(l)}}return r.length?r:null}function iw(t){Sy.lastIndex=0;let e;for(;(e=Sy.exec(t))!==null;){let f=e[1].trim();if(f)try{return JSON.parse(f)}catch{let b=Xo(f);if(b.success)try{return JSON.parse(b.result)}catch{}}}let r=t.trim();try{return JSON.parse(r)}catch{}let s=Xo(r);if(s.success)try{return JSON.parse(s.result)}catch{}let o=r.indexOf("{"),n=r.indexOf("["),i=-1,a="",l="";if(o!==-1&&(n===-1||o<n)?(i=o,a="{",l="}"):n!==-1&&(i=n,a="[",l="]"),i===-1)return null;let d=0,c=-1,u=!1,p=!1;for(let f=i;f<r.length;f++){let m=r[f];if(p){p=!1;continue}if(m==="\\"&&u){p=!0;continue}if(m==='"'){u=!u;continue}if(!u){if(m===a)d++;else if(m===l&&(d--,d===0)){c=f;break}}}if(c===-1)return null;let y=r.substring(i,c+1);try{return JSON.parse(y)}catch{let m=Xo(y);if(m.success)try{return JSON.parse(m.result)}catch{}}return null}function Ey(t){if(!t||typeof t!="string")return{mode:"empty",edits:null,tables:null};let e=nw(t);if(e)return{mode:"incremental",edits:e,tables:null};let r=iw(t);return r?{mode:"full",edits:null,tables:r}:{mode:"empty",edits:null,tables:null}}var vy,Sy,Ay=L(()=>{vy=/<tableEdit>([\s\S]*?)<\/tableEdit>/gi,Sy=/```(?:json)?\s*([\s\S]*?)```/gi});function aw(t,e){let r=new Map;Array.isArray(t)&&t.forEach((n,i)=>{n&&typeof n=="object"&&r.set(n.name||`__row_${i}`,n)});let s=new Map;Array.isArray(e)&&e.forEach((n,i)=>{n&&typeof n=="object"&&s.set(n.name||`__row_${i}`,n)});let o={};for(let[n,i]of s){let a=r.get(n);if(a){o[n]={};let l=new Set([...Object.keys(a.cells||{}),...Object.keys(i.cells||{})]);for(let d of l){let c=String((a.cells&&a.cells[d])??""),u=String((i.cells&&i.cells[d])??"");o[n][d]=c===u?"unchanged":"updated"}o[n].__rowStatus="kept"}else{if(o[n]={},i.cells&&typeof i.cells=="object")for(let l of Object.keys(i.cells))o[n][l]="new";o[n].__rowStatus="new"}}for(let[n]of r)s.has(n)||(o[n]={__rowStatus:"deleted"});return o}function Cy(t,e){let r=Array.isArray(t)?fe(t):[],s=Array.isArray(e)?fe(e):[],o={},n=Math.max(r.length,s.length);for(let i=0;i<n;i++){let a=r[i],l=s[i];!a&&l?(o[i]={},Array.isArray(l.rows)&&l.rows.forEach(d=>{let c=d.name||`__row_${l.rows.indexOf(d)}`;o[i][c]={__rowStatus:"new"}})):a&&!l?(o[i]={},Array.isArray(a.rows)&&a.rows.forEach(d=>{let c=d.name||`__row_${a.rows.indexOf(d)}`;o[i][c]={__rowStatus:"deleted"}})):a&&l&&(o[i]=aw(a.rows,l.rows))}return o}var ky=L(()=>{it()});function lw(){return{mode:"native",async buildRequest(t={},e={}){if(typeof t.buildRequest!="function")throw new Error("table_provider_missing_build_request");return t.buildRequest(e)},async sendRequest(t={},e=null,r={}){if(typeof t.sendRequest!="function")throw new Error("table_provider_missing_send_request");return t.sendRequest(e?.messages||[],r.config||{},r.abortSignal||null)},parseResponse(t={},e=""){if(typeof t.parseResponse!="function")throw new Error("table_provider_missing_parse_response");return t.parseResponse(e)}}}function Iy(){return lw()}var My=L(()=>{});function to(t){return t!==null&&typeof t=="object"&&!Array.isArray(t)}function pw(){let t=uw.get(dw,{});return to(t)?t:{}}function yw(t){let e=pw();return to(e[t])?e[t]:{}}function fw(t){let e=wu();return to(t)&&(Array.isArray(t.rows)&&(e.rows=Array.from(new Set(t.rows.filter(r=>Number.isFinite(r)).map(r=>Math.floor(r)))),e.rows.sort((r,s)=>r-s)),Array.isArray(t.cols)&&(e.cols=Array.from(new Set(t.cols.filter(r=>typeof r=="string"&&r.length>0)))),Array.isArray(t.cells)&&(e.cells=Array.from(new Set(t.cells.filter(r=>typeof r=="string"&&r.includes(":"))))),e.indexColumn=t.indexColumn===!0),e}function gw(t){if(typeof t=="string")return t;if(to(t)){if(typeof t.scopeKey=="string"&&t.scopeKey.includes("::"))return t.scopeKey;if(t.chatId!==void 0){let e=t.isolationKey!==void 0?t.isolationKey:Ie.getKey();return Po(t.chatId,e)}}return Po("",Ie.getKey())}function mw(t,e){let r=yw(t),s={};if(!Array.isArray(e))return s;for(let o=0;o<e.length;o++){let n=e[o];if(!n)continue;let i=n.uid||n.id||"";i&&r[i]&&(s[o]=fw(r[i]))}return s}function Ry(t,e=[]){let r=gw(t);return mw(r,e)}function Py(t,e,r,s){if(!to(t))return!1;let o=t[e];if(!o)return!1;if(Number.isFinite(r)&&o.rows.includes(r)||typeof s=="string"&&s.length>0&&o.cols.includes(s))return!0;if(Number.isFinite(r)&&typeof s=="string"&&s.length>0){let n=`${r}:${s}`;if(o.cells.includes(n))return!0}return!1}function Il(t,e,r){if(!to(t))return!1;let s=t[e];return s?Number.isFinite(r)&&s.rows.includes(r):!1}var cw,dw,uw,$y=L(()=>{Le();q();it();ls();cw="tableLocks",dw="scopes",uw=M.namespace(cw)});function Fe(){return C.createScope("TableUpdate")}function bw(t,e){return new Promise(r=>{if(e?.aborted){r(!1);return}let s,o=()=>{clearTimeout(s);try{e?.removeEventListener?.("abort",o)}catch{}r(!1)};s=setTimeout(()=>{try{e?.removeEventListener?.("abort",o)}catch{}r(!0)},t);try{e?.addEventListener?.("abort",o)}catch{}})}function G(t,e=""){return t==null?e:String(t).trim()||e}function Oy(t=[],e=8,r="all"){if(!Array.isArray(t)||t.length===0)return"";let s=r==="assistant_only"?t.filter(o=>o?.role==="assistant"):t;return s.slice(Math.max(s.length-e,0)).map(o=>`[${G(o?.role,"unknown")}] ${String(o?.content||"").trim()}`).filter(Boolean).join(`

`)}function Ly(t,{extractTags:e=[],useGlobalRules:r=!1}={}){if(!t)return t;let s=Array.isArray(e)&&e.length>0;if(!s&&!r)return t;try{let o=[],n=[];if(s&&(o=e.map(i=>{let a=String(i||"").trim();return a.startsWith("regex:")?{type:"regex_include",value:a.slice(6).trim(),enabled:!0}:{type:"include",value:a,enabled:!0}}).filter(i=>i.value)),r){let i=Is()||[];o=[...o,...i.filter(a=>a?.enabled)],n=Ms()||[]}return o.length===0&&n.length===0?t:or(t,o,n)||t}catch(o){return Fe().warn("applyContextExtractionRules \u5931\u8D25\uFF0C\u56DE\u9000\u539F\u59CB\u6587\u672C",o),t}}function xw(t=[],e=-1){return!Number.isFinite(e)||e<0?t:t.map(r=>{let s=Array.isArray(r?.rows)?r.rows:[];return e===0||s.length<=e?r:{...r,rows:s.slice(s.length-e)}})}function ww(t=[]){return!Array.isArray(t)||t.length===0?"":t.map((e,r)=>{let s=e?.aiInstructions&&typeof e.aiInstructions=="object"?e.aiInstructions:{},o=Array.isArray(e?.columns)?e.columns:[],n=[`\u8868 ${r}: ${G(e?.name,`\u8868${r+1}`)}`,`\u8868\u683C\u8BF4\u660E: ${G(e?.note,"\u65E0")}`,`\u521D\u59CB\u5316\u8BF4\u660E: ${G(s.init,"\u65E0")}`,`\u65B0\u589E\u8BF4\u660E: ${G(s.create,"\u65E0")}`,`\u66F4\u65B0\u8BF4\u660E: ${G(s.update,"\u65E0")}`,`\u5220\u9664\u8BF4\u660E: ${G(s.delete,"\u65E0")}`,"\u5B57\u6BB5:"];return o.forEach(i=>{n.push(`- ${G(i?.title||i?.key,"\u672A\u547D\u540D\u5B57\u6BB5")} (${G(i?.key,"")}): ${G(i?.description,"\u65E0")}`)}),n.join(`
`)}).join(`

`)}function vw(t,e=[]){if(!t||!Array.isArray(e)||e.length===0)return"";let r=e.map((o,n)=>{let i=G(o?.name,`\u8868${n+1}`),a=t.includes(o,n);return`\u8868 ${n}: ${i} - ${a?"\u5141\u8BB8\u7F16\u8F91":"\u53EA\u8BFB\uFF0C\u7981\u6B62\u4FEE\u6539"}`});return e.some((o,n)=>!t.includes(o,n))&&(r.push(""),r.push('\u3010\u91CD\u8981\u7EA6\u675F\u3011\u6807\u8BB0\u4E3A"\u53EA\u8BFB"\u7684\u8868\u683C\uFF0C\u4F60\u5FC5\u987B\u5728\u8F93\u51FA\u4E2D\u539F\u6837\u4FDD\u7559\u5176\u6240\u6709\u884C\u6570\u636E\uFF0C\u4E0D\u5F97\u65B0\u589E\u3001\u4FEE\u6539\u6216\u5220\u9664\u4EFB\u4F55\u884C\u3002'),r.push("\u5168\u91CF\u8F93\u51FA\u65F6\uFF0C\u53EA\u8BFB\u8868\u683C\u7684 rows \u5FC5\u987B\u4E0E\u8F93\u5165\u4E2D\u7684\u5B8C\u5168\u4E00\u81F4\u3002")),r.join(`
`)}function Dy(t={},e=0,r=[]){let s=t&&typeof t=="object"?t:{},o=s.cells&&typeof s.cells=="object"&&!Array.isArray(s.cells)?s.cells:{},n={},i=Array.isArray(r)?r.map(l=>G(l?.key,"")).filter(Boolean):[];return new Set([...Object.keys(o),...i]).forEach(l=>{n[l]=G(o[l],"")}),{...s,id:Mo(s.id||s.rowId,e),name:G(s.name,""),cells:n}}function bs(t={},e=0){let r=t&&typeof t=="object"?t:{},s=Array.isArray(r.columns)?fe(r.columns):[],o=Array.isArray(r.rows)?r.rows.map((n,i)=>Dy(n,i,s)):[];return{...r,id:Dt(r.id||r.key,e),rows:o}}function Xt(t=[]){return Array.isArray(t)?t.map((e,r)=>bs(e,r)):[]}function Sw(t=[],e=[],r){let s=Xt(t),o=Xt(e);if(!r)return o;let n=new Map(o.map((u,p)=>[Dt(u?.id||u?.key,p),u])),i=s.map((u,p)=>({table:u,tableIndex:p,id:Dt(u?.id||u?.key,p)})).filter(({table:u,tableIndex:p})=>r.includes(u,p)),a=new Set,l=new Map;for(let u=0;u<o.length;u++){let p=o[u],y=Dt(p?.id||p?.key,u);n.has(y)&&(l.set(y,p),a.add(y))}let d=0,c=o.filter((u,p)=>{let y=Dt(u?.id||u?.key,p);return!a.has(y)});return s.map((u,p)=>{let y=Dt(u?.id||u?.key,p);if(!r.includes(u,p))return bs(u,p);let f=l.get(y);if(f)return bs(f,p);let m=c[d];return m?(d++,bs({...m,id:u.id||m.id},p)):bs(u,p)})}function Tw(t=[],e=[],r,s={}){if(!Array.isArray(t)||!r)return{edits:[],stats:{total:0,passed:0,droppedByScope:0,droppedByLock:0}};let o=Xt(e),n=[],i=0,a=0;for(let l of t){let d=Number.isFinite(l?.tableIndex)?l.tableIndex:-1;if(d<0||d>=o.length){i++;continue}let c=o[d];if(!r.includes(c,d)){i++;continue}if(l.op===Ws.INSERT_ROW){n.push(l);continue}let u=Number.isFinite(l?.rowIndex)?l.rowIndex:-1;if(u<0||u>=(Array.isArray(c?.rows)?c.rows.length:0)){i++;continue}if(l.op===Ws.DELETE_ROW){if(Il(s,d,u)){a++;continue}n.push(l);continue}n.push(l)}return{edits:n,stats:{total:t.length,passed:n.length,droppedByScope:i,droppedByLock:a}}}function _w(t=[],e){let r=Xt(t);return e?r.map((s,o)=>{let n=Array.isArray(s?.columns)?s.columns:[];return e.includes(s,o)?{...bs(s,o),scopeEditable:!0,scopeStatus:"editable"}:{...bs(s,o),scopeEditable:!1,scopeStatus:"readonly",rows:Array.isArray(s?.rows)?s.rows.map((i,a)=>Dy(i,a,n)):[]}}):r}function Ew(t,e,r){return{target:{sourceMessageId:G(t?.sourceMessageId),sourceSwipeId:G(t?.sourceSwipeId||t?.effectiveSwipeId),slotBindingKey:G(t?.slotBindingKey),slotRevisionKey:G(t?.slotRevisionKey),slotTransactionId:G(t?.slotTransactionId)},loadMode:G(e?.loadMode),mergeBaseOnly:e?.mergeBaseOnly===!0,resolvedFromMessageId:G(e?.resolvedFromMessageId),resolvedFromRevisionKey:G(e?.resolvedFromRevisionKey),sourceKind:G(e?.sourceKind||e?.state?.meta?.sourceKind),scope:typeof r?.toJSON=="function"?r.toJSON():null,tables:_w(e?.state?.tables,r)}}function Ny(){return Aw}function Cw(t,e,r,s=null){let o=Xt(t||[]),n=r||{};for(let i of e){let a=i.tableIndex;if(a<0||a>=o.length)continue;let l=o[a];if(!l||!Array.isArray(l.rows)||s&&!s.includes(l,a))continue;if(i.op===Ws.INSERT_ROW){let c={id:Ra("row"),name:"",cells:{}};if(i.data&&typeof i.data=="object"){c.name=G(i.data.name,"");let u=Array.isArray(l.columns)?l.columns:[];for(let p of u){let y=p.key;i.data[y]!==void 0&&(c.cells[y]=G(i.data[y]))}for(let[p,y]of Object.entries(i.data))p!=="name"&&c.cells[p]===void 0&&(c.cells[p]=G(y))}l.rows.push(c);continue}let d=i.rowIndex;if(!(d<0||d>=l.rows.length)){if(i.op===Ws.DELETE_ROW){if(Il(n,a,d))continue;l.rows.splice(d,1);continue}if(i.op===Ws.UPDATE_ROW){let c=l.rows[d];if(!c)continue;if(c.id=Mo(c.id||c.rowId,d),c.cells=c.cells||{},i.data&&typeof i.data=="object"){for(let[u,p]of Object.entries(i.data))u!=="name"&&(Py(n,a,d,u)||(c.cells[u]=G(p)));i.data.name!==void 0&&(c.name=G(i.data.name,c.name))}}}}return Xt(o)}async function kw({executionContext:t,targetSnapshot:e,loadResult:r,config:s,assistantSnapshot:o,fillMode:n,runScope:i}={}){let a=At(s),l=n==="incremental"||!n&&a.fillMode!=="full",d=Nu(a,{skipResponseContract:l}),c=Ew(e,r,i),u=Array.isArray(o?.tableState?.tables)?Xt(o.tableState.tables):[],p=t?.chatHistory||t?.chatMessages||[],{contextDepth:y,contextRoles:f,contextExtractTags:m,contextUseGlobalRules:b,sendLatestRows:w}=a,S=Oy(p,y,f),v=Oy(p,y,"all"),K=Ly(S,{extractTags:m,useGlobalRules:b}),P=Ly(v,{extractTags:m,useGlobalRules:b}),_=await Tn({worldbooks:a.worldbooks}),T=xw(c.tables,w),F={...c,tables:T},U={...t,toolName:"\u586B\u8868\u5DE5\u4F5C\u53F0",toolId:"tableWorkbench",lastAiMessage:t?.assistantBaseText||t?.lastAiMessage||"",recentMessagesText:K,rawRecentMessagesText:P,toolWorldbookContent:_,tableGuidance:ww(a.tables),tableScopeGuidance:vw(i,c.tables),injectedContext:o?.injectedContext||mt.getLatestMessageInjectedContext(e?.sourceMessageId),toolContentMacro:JSON.stringify(F,null,2),extractedContent:JSON.stringify(F,null,2),previousToolOutput:JSON.stringify(u,null,2)},A=await ys.buildToolMessages(d,U),O=await ys.buildPromptText(d,U);if(l&&(O+=Ny(),Array.isArray(A)&&A.length>0)){let J=A[A.length-1];J&&typeof J.content=="string"&&(J.content+=Ny())}if(!Array.isArray(A)||A.length===0)throw new Error("\u586B\u8868\u8BF7\u6C42\u6D88\u606F\u6784\u5EFA\u5931\u8D25\u3002");return{toolConfig:d,context:U,requestPayload:c,promptText:O,messages:A,fillMode:l?"incremental":"full",runScope:typeof i?.toJSON=="function"?i.toJSON():null}}async function Iw(t,e={},r=null){let s=At(e),o=G(s.apiPreset,"");if(o){if(!uo(o))throw new Error(`API \u9884\u8BBE\u4E0D\u5B58\u5728: ${o}`);return Li(o,t,{},r)}return po(t,{},r)}function hr({status:t=Te.IDLE,targetSnapshot:e=null,skipReason:r="",startedAt:s=Date.now(),error:o=""}={}){return{lastAutoRunAt:s,lastAutoStatus:G(t,Te.IDLE),lastAutoMessageId:G(e?.sourceMessageId,""),lastAutoRevisionKey:G(e?.slotRevisionKey,""),lastAutoSkipReason:G(r,""),...o?{lastError:o,lastErrorDetails:[o]}:{}}}function Jt(t={},e=Ye.MANUAL){let r=t&&typeof t=="object"?t:{};return Object.keys(r).length?Lu(r):null}function hs({targetSnapshot:t=null,startedAt:e=Date.now(),status:r="idle",skipReason:s="",warning:o="",writeback:n=null,aborted:i=!1,stale:a=!1,abortReason:l="",error:d=""}={}){return{isAutoRun:!0,status:r,startedAt:e,targetSnapshot:t,sourceMessageId:G(t?.sourceMessageId,""),sourceSwipeId:G(t?.sourceSwipeId||t?.effectiveSwipeId,""),slotRevisionKey:G(t?.slotRevisionKey,""),writebackStatus:n?.success===!0?"success":o?"warning":"",refreshConfirmed:n?.mirrorResult?.refreshConfirmed===!0,warning:G(o,""),skipReason:G(s,""),aborted:i===!0,stale:a===!0,abortReason:G(l,""),error:G(d,"")}}function fi(t=null){if(t?.signal?.aborted)return{aborted:!0,stale:!1,reason:"cancelled_before_host_commit"};if(typeof t?.shouldAbortWriteback=="function")try{return t.shouldAbortWriteback()||!1}catch{return{aborted:!0,stale:!0,reason:"stale_base_changed"}}return!1}async function Qo(t=null,e={}){return zy({configInput:t,runSource:Ye.MANUAL,clearBeforeUpdate:e?.clearBeforeUpdate===!0,executionContextBuilder:()=>Vr({runSource:Ye.MANUAL}),targetResolver:r=>Yo(r,{runSource:Ye.MANUAL})})}async function By({messageId:t,swipeId:e="",sourceEvent:r="AUTO_TABLE",configInput:s=null,signal:o=null,shouldAbortWriteback:n=null}={}){return zy({configInput:s,runSource:Ye.AUTO,autoMeta:{sourceEvent:r,messageId:G(t,""),swipeId:G(e,""),signal:o,shouldAbortWriteback:n},executionContextBuilder:()=>Jr({messageId:t,swipeId:e,runSource:Ye.AUTO}),targetResolver:i=>Yo(i,{runSource:Ye.AUTO})})}async function zy({configInput:t=null,runSource:e=Ye.MANUAL,executionContextBuilder:r,targetResolver:s,autoMeta:o=null,clearBeforeUpdate:n=!1}={}){let i=At(t||We()),a=Ua(i),l=zn({tables:Array.isArray(i.tables)?i.tables:[]}),d=e===Ye.AUTO,c=Date.now();if(Fe().info(`\u5F00\u59CB\u586B\u8868 [${e}]`,{isAutoRun:d,fillMode:i.fillMode}),!a.valid||!l.valid){let f=[...a.errors,...l.errors];return Fe().error("\u914D\u7F6E\u6821\u9A8C\u5931\u8D25",{errors:f}),Jt({lastStatus:Te.ERROR,lastRunAt:c,lastDurationMs:0,lastError:f[0]||"\u586B\u8868\u914D\u7F6E\u65E0\u6548\u3002",lastErrorDetails:f,lastValidationSummary:l.summary||{errorCount:f.length,warningCount:0},errorCount:Number(i?.runtime?.errorCount)||0,...d?hr({status:Te.ERROR,startedAt:c,skipReason:"invalid_config",error:f[0]||"\u586B\u8868\u914D\u7F6E\u65E0\u6548\u3002"}):{}},e),{success:!1,error:f.join(`
`),errors:f,...d?{meta:hs({startedAt:c,status:Te.ERROR,skipReason:"invalid_config",error:f[0]||"\u586B\u8868\u914D\u7F6E\u65E0\u6548\u3002"})}:{}}}let u=i.runtime||{},p=vu(i.scope||i,i.tables);if((p.mode==="current"||p.mode==="selected")&&p.allowedTableIds.length===0){let f=p.mode==="current"?"\u672A\u6307\u5B9A\u5F53\u524D\u8868\u683C\uFF0C\u65E0\u6CD5\u6267\u884C\u3002":"\u672A\u9009\u62E9\u4EFB\u4F55\u8868\u683C\uFF0C\u65E0\u6CD5\u6267\u884C\u3002";return Fe().warn(f,{mode:p.mode}),Jt({lastStatus:Te.ERROR,lastRunAt:c,lastDurationMs:0,lastError:f,lastErrorDetails:[f]},e),{success:!1,error:f,errors:[f]}}let y=null;Jt({lastStatus:Te.RUNNING,lastError:"",lastErrorDetails:[],lastValidationSummary:l.summary||{errorCount:0,warningCount:0},lastScopeMode:G(p.mode,""),...d?hr({status:Te.RUNNING,startedAt:c,skipReason:""}):{}},e);try{if(typeof r!="function")throw new Error("table_update_missing_execution_context_builder");if(typeof s!="function")throw new Error("table_update_missing_target_resolver");let f=await r();Fe().info("\u6267\u884C\u4E0A\u4E0B\u6587\u5DF2\u6784\u5EFA");let m=s(f);if(!m)throw new Error("\u5F53\u524D\u6CA1\u6709\u53EF\u7528\u7684 assistant \u76EE\u6807\u697C\u5C42\u3002");y=m,Fe().info("\u76EE\u6807\u6D88\u606F\u5DF2\u89E3\u6790",{sourceMessageId:m.sourceMessageId,slotRevisionKey:m.slotRevisionKey}),d&&Jt(hr({status:Te.RUNNING,targetSnapshot:m,startedAt:c,skipReason:""}),e);let b=G(i.autoUpdateTrigger,"assistantMessage");if(d&&(!i.autoUpdateEnabled||b!=="assistantMessage")){let H=i.autoUpdateEnabled?"auto_trigger_not_assistant_message":"auto_update_disabled";return Jt(hr({status:Te.SKIPPED,targetSnapshot:m,startedAt:c,skipReason:H}),e),{success:!1,skipped:!0,reason:H,targetSnapshot:m,meta:hs({targetSnapshot:m,startedAt:c,status:Te.SKIPPED,skipReason:H})}}if(d){let H=fi(o);if(H)return Jt(hr({status:Te.ABORTED,targetSnapshot:m,startedAt:c,skipReason:H.reason,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88"}),e),{success:!1,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88",targetSnapshot:m,meta:hs({targetSnapshot:m,startedAt:c,status:Te.ABORTED,skipReason:H.reason,aborted:H.aborted===!0,stale:H.stale===!0,abortReason:H.reason,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88"})}}let w=await oy(m);if(!w?.success)throw new Error(w?.error||"\u76EE\u6807\u89E3\u6790\u8BB0\u5F55\u5931\u8D25");if(n&&Number.isFinite(m?.targetMessageIndex)&&m.targetMessageIndex>=0){Fe().info("clearBeforeUpdate \u542F\u7528\uFF0C\u6E05\u7A7A\u76EE\u6807\u697C\u5C42\u6570\u636E",{targetMessageIndex:m.targetMessageIndex});try{let H=await ay(m.targetMessageIndex);Fe().info("clearBeforeUpdate \u5B8C\u6210",H)}catch(H){Fe().error("clearBeforeUpdate \u5931\u8D25",H)}}let S=iy(m.sourceMessageId),v=sy(m,{templateTables:i.tables}),K=Xt(v?.state?.tables||[]),P=Iy(),_=o?.signal||f?.signal||null;Fe().info("\u72B6\u6001\u5DF2\u52A0\u8F7D",{loadMode:v?.loadMode,sourceKind:v?.sourceKind,tableCount:K.length});let T=await P.buildRequest({buildRequest:kw},{executionContext:f,targetSnapshot:m,loadResult:v,config:i,assistantSnapshot:S,runScope:p});Fe().info("\u8BF7\u6C42\u5DF2\u6784\u5EFA",{messageCount:T?.messages?.length,fillMode:T?.fillMode});let F="",U=null,A=null;for(let H=1;H<=yi;H++){if(_?.aborted)throw new Error("\u8BF7\u6C42\u5DF2\u53D6\u6D88");try{if(F=await P.sendRequest({sendRequest:Iw},T,{config:i,abortSignal:_}),Fe().info("API \u54CD\u5E94\u5DF2\u6536\u5230",{attempt:H,responseLength:F?.length||0}),U=P.parseResponse({parseResponse:Ey},F),Fe().info("\u54CD\u5E94\u5DF2\u89E3\u6790",{attempt:H,mode:U?.mode,hasEdits:!!U?.edits,hasTables:!!U?.tables}),!(U?.mode==="incremental"&&Array.isArray(U.edits)&&U.edits.length>0||U?.mode==="full"&&U?.tables))throw new Error("AI \u54CD\u5E94\u4E2D\u672A\u627E\u5230\u6709\u6548\u7684 <tableEdit> \u6807\u7B7E\u6216\u8868\u683C JSON");A=null;break}catch(Ae){if(A=Ae,Fe().warn(`\u586B\u8868 attempt ${H}/${yi} \u5931\u8D25`,{error:Ae?.message||String(Ae)}),H<yi&&!await bw(hw,_))throw new Error("\u8BF7\u6C42\u5DF2\u53D6\u6D88\uFF08\u91CD\u8BD5\u7B49\u5F85\u671F\u95F4\uFF09")}}if(A)throw new Error(`\u586B\u8868\u5931\u8D25\uFF08${yi} \u6B21\u91CD\u8BD5\u540E\u4ECD\u5931\u8D25\uFF09: ${A?.message||String(A)}`);let O,J=null,j=T.fillMode||"full",Z=null;if(U.mode==="incremental"&&U.edits){let H=Ry(v?.state,K),Ae=Tw(U.edits,K,p,H);Z=Ae.stats,O=Cw(K,Ae.edits,H,p),j="incremental",(Z.droppedByScope>0||Z.droppedByLock>0)&&Fe().info("scope \u8FC7\u6EE4",Z)}else if(U.mode==="full"&&U.tables){let H=Xt(U.tables);O=Sw(K,H,p),j="full"}else O=Xt(K);if(J=Cy(K,O),Fe().info("\u5DEE\u5F02\u5DF2\u8BA1\u7B97",{fillMode:j}),d){let H=fi(o);if(H)return Jt(hr({status:Te.ABORTED,targetSnapshot:m,startedAt:c,skipReason:H.reason,error:"\u5199\u56DE\u524D\u5DF2\u53D6\u6D88"}),e),{success:!1,error:"\u5199\u56DE\u524D\u5DF2\u53D6\u6D88",targetSnapshot:m,meta:hs({targetSnapshot:m,startedAt:c,status:Te.ABORTED,aborted:H.aborted===!0,stale:H.stale===!0,abortReason:H.reason,error:"\u5199\u56DE\u524D\u5DF2\u53D6\u6D88"})}}let ie=await xy({targetSnapshot:m,nextTables:O,config:i,loadResult:v,diff:J,fillMode:j,skipNotify:d});if(d){let H=fi(o);if(H)return Jt(hr({status:Te.ABORTED,targetSnapshot:m,startedAt:c,skipReason:H.reason,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88"}),e),{success:!1,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88",targetSnapshot:m,loadResult:v,request:T,responseText:F,parsed:U,fillMode:j,diff:J,previousTables:K,nextTables:O,runScope:p,state:ie?.state,bindings:ie?.bindings,mirrorResult:ie?.mirrorResult,warning:ie?.warning||"",meta:hs({targetSnapshot:m,startedAt:c,status:Te.ABORTED,warning:ie?.warning||"",writeback:ie,aborted:H.aborted===!0,stale:H.stale===!0,abortReason:H.reason,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88"})}}if(!ie?.success)throw new Error(ie?.error||"\u7ED3\u6784\u5316\u5199\u56DE\u5931\u8D25");let be=Date.now()-c;Fe().info(`\u586B\u8868\u5B8C\u6210 [${j}] ${be}ms`,{success:!0,writebackSuccess:ie?.success,mirrorSuccess:ie?.mirrorResult?.success});let Re={lastStatus:Te.SUCCESS,lastRunAt:Date.now(),lastDurationMs:be,lastError:"",lastErrorDetails:[],lastValidationSummary:l.summary||{errorCount:0,warningCount:0},successCount:(Number(u.successCount)||0)+1,errorCount:Number(u.errorCount)||0,lastSourceMessageId:G(m.sourceMessageId),lastSlotRevisionKey:G(m.slotRevisionKey),lastLoadMode:G(v.loadMode),lastMirrorApplied:ie?.mirrorResult?.success===!0,lastResolvedFromMessageId:G(v?.resolvedFromMessageId),lastResolvedFromRevisionKey:G(v?.resolvedFromRevisionKey),lastSourceKind:G(v?.sourceKind||v?.state?.meta?.sourceKind),lastScopeMode:G(p.mode,""),lastFillMode:j,...d?hr({status:Te.SUCCESS,targetSnapshot:m,startedAt:c,skipReason:""}):{}};return Jt(Re,e),{success:!0,targetSnapshot:m,loadResult:v,request:T,responseText:F,parsed:U,fillMode:j,diff:J,previousTables:K,nextTables:O,runScope:p,scopeStats:Z,state:ie.state,bindings:ie.bindings,mirrorResult:ie.mirrorResult,warning:ie.warning||"",...d?{meta:hs({targetSnapshot:m,startedAt:c,status:Te.SUCCESS,warning:ie.warning||"",writeback:ie})}:{}}}catch(f){let m=Date.now()-c;Fe().error(`\u586B\u8868\u5931\u8D25 ${m}ms: ${f?.message||f}`,{stack:f?.stack});let b=d?fi(o):!1,w=f?.name==="AbortError"||f?.message==="\u8BF7\u6C42\u5DF2\u53D6\u6D88"||b?.aborted===!0||b?.stale===!0,S=w?Te.ABORTED:Te.ERROR,v={lastStatus:S,lastRunAt:Date.now(),lastDurationMs:m,lastError:f?.message||String(f),lastErrorDetails:[f?.message||String(f)],lastValidationSummary:l.summary||{errorCount:0,warningCount:0},successCount:Number(u.successCount)||0,errorCount:w?Number(u.errorCount)||0:(Number(u.errorCount)||0)+1,lastScopeMode:G(p.mode,""),...d?hr({status:S,targetSnapshot:y,startedAt:c,skipReason:w?b?.reason||"cancelled_before_host_commit":"",error:f?.message||String(f)}):{}};return Jt(v,e),{success:!1,error:f?.message||String(f),errors:[f?.message||String(f)],...d?{meta:hs({targetSnapshot:y,startedAt:c,status:S,skipReason:w?b?.reason||"cancelled_before_host_commit":"",aborted:w,stale:b?.stale===!0,abortReason:w?b?.reason||"cancelled_before_host_commit":"",error:f?.message||String(f)})}:{}}}}var yi,hw,Aw,gi=L(()=>{Xr();ps();cn();ri();q();it();ml();Tl();dr();wy();Ay();ky();Bn();My();$y();_n();Rs();yi=3,hw=5e3;Aw=`

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

\u53EA\u8FD4\u56DE <tableEdit> \u6807\u7B7E\uFF0C\u4E0D\u8981\u9644\u52A0\u5176\u4ED6\u5185\u5BB9\u3002`});var jy={};oe(jy,{WindowManager:()=>mi,closeWindow:()=>Uy,createWindow:()=>Ml,windowManager:()=>xt});function Pw(){if(xt.stylesInjected)return;xt.stylesInjected=!0;let t=`
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
  `,e=document.createElement("style");e.id=Rw+"_styles",e.textContent=t,(document.head||document.documentElement).appendChild(e)}function Ml(t){let{id:e,title:r="\u7A97\u53E3",content:s="",width:o=900,height:n=700,modal:i=!1,resizable:a=!0,maximizable:l=!0,startMaximized:d=!1,rememberState:c=!0,onClose:u,onReady:p}=t;Pw();let y=window.jQuery||window.parent?.jQuery;if(!y)return Mw.error("jQuery not available"),null;if(xt.isOpen(e))return xt.bringToFront(e),xt.getWindow(e);let f=window.innerWidth||1200,m=window.innerHeight||800,b=f<=1100,w=null,S=!1;c&&(w=xt.getState(e),w&&!b&&(S=!0));let v,K;S&&w.width&&w.height?(v=Math.max(400,Math.min(w.width,f-40)),K=Math.max(300,Math.min(w.height,m-40))):(v=Math.max(400,Math.min(o,f-40)),K=Math.max(300,Math.min(n,m-40)));let P=Math.max(20,Math.min((f-v)/2,f-v-20)),_=Math.max(20,Math.min((m-K)/2,m-K-20)),T=l&&!b,F=`
    <div class="yyt-window" id="${e}" style="left:${P}px; top:${_}px; width:${v}px; height:${K}px;">
      <div class="yyt-window-header">
        <div class="yyt-window-title">
          <i class="fa-solid fa-window-maximize"></i>
          <span>${$w(r)}</span>
        </div>
        <div class="yyt-window-controls">
          ${T?'<button class="yyt-window-btn maximize" title="\u6700\u5927\u5316/\u8FD8\u539F"><i class="fa-solid fa-expand"></i></button>':""}
          <button class="yyt-window-btn close" title="\u5173\u95ED"><i class="fa-solid fa-times"></i></button>
        </div>
      </div>
      <div class="yyt-window-body">${s}</div>
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
  `,U=null;i&&(U=y(`<div class="yyt-window-overlay" data-for="${e}"></div>`),y(document.body).append(U));let A=y(F);y(document.body).append(A),xt.register(e,A),A.on("mousedown",()=>xt.bringToFront(e));let O=!1,J={left:P,top:_,width:v,height:K},j=()=>{J={left:parseInt(A.css("left")),top:parseInt(A.css("top")),width:A.width(),height:A.height()},A.addClass("maximized"),A.find(".yyt-window-btn.maximize i").removeClass("fa-expand").addClass("fa-compress"),O=!0},Z=()=>{A.removeClass("maximized"),A.css({left:J.left+"px",top:J.top+"px",width:J.width+"px",height:J.height+"px"}),A.find(".yyt-window-btn.maximize i").removeClass("fa-compress").addClass("fa-expand"),O=!1};A.find(".yyt-window-btn.maximize").on("click",()=>{O?Z():j()}),(b&&l||S&&w.isMaximized&&l||d&&l)&&j(),A.find(".yyt-window-btn.close").on("click",()=>{if(c&&l){let ae={width:O?J.width:A.width(),height:O?J.height:A.height(),isMaximized:O};xt.saveState(e,ae)}u&&u(),U&&U.remove(),A.remove(),xt.unregister(e),y(document).off(".yytWindowDrag"+e),y(document).off(".yytWindowResize"+e)}),U&&U.on("click",ae=>{ae.target,U[0]});let ie=!1,be,Re,H,Ae;if(A.find(".yyt-window-header").on("mousedown",ae=>{y(ae.target).closest(".yyt-window-controls").length||O||(ie=!0,be=ae.clientX,Re=ae.clientY,H=parseInt(A.css("left")),Ae=parseInt(A.css("top")),y(document.body).css("user-select","none"))}),y(document).on("mousemove.yytWindowDrag"+e,ae=>{if(!ie)return;let xe=ae.clientX-be,Qt=ae.clientY-Re;A.css({left:Math.max(0,H+xe)+"px",top:Math.max(0,Ae+Qt)+"px"})}),y(document).on("mouseup.yytWindowDrag"+e,()=>{ie&&(ie=!1,y(document.body).css("user-select",""))}),a){let ae=!1,xe="",Qt,zt,Oe,Zt,ze,io;A.find(".yyt-window-resize-handle").on("mousedown",function(br){O||(ae=!0,xe="",y(this).hasClass("se")?xe="se":y(this).hasClass("e")?xe="e":y(this).hasClass("s")?xe="s":y(this).hasClass("w")?xe="w":y(this).hasClass("n")?xe="n":y(this).hasClass("nw")?xe="nw":y(this).hasClass("ne")?xe="ne":y(this).hasClass("sw")&&(xe="sw"),Qt=br.clientX,zt=br.clientY,Oe=A.width(),Zt=A.height(),ze=parseInt(A.css("left")),io=parseInt(A.css("top")),y(document.body).css("user-select","none"),br.stopPropagation())}),y(document).on("mousemove.yytWindowResize"+e,br=>{if(!ae)return;let ao=br.clientX-Qt,xr=br.clientY-zt,ws=400,vs=300,Br=Oe,lo=Zt,on=ze,zr=io;if(xe.includes("e")&&(Br=Math.max(ws,Oe+ao)),xe.includes("s")&&(lo=Math.max(vs,Zt+xr)),xe.includes("w")){let Kt=Oe-ao;Kt>=ws&&(Br=Kt,on=ze+ao)}if(xe.includes("n")){let Kt=Zt-xr;Kt>=vs&&(lo=Kt,zr=io+xr)}A.css({width:Br+"px",height:lo+"px",left:on+"px",top:zr+"px"})}),y(document).on("mouseup.yytWindowResize"+e,()=>{ae&&(ae=!1,y(document.body).css("user-select",""))})}return A.on("remove",()=>{y(document).off(".yytWindowDrag"+e),y(document).off(".yytWindowResize"+e)}),p&&setTimeout(()=>p(A),50),A}function Uy(t){let e=xt.getWindow(t);if(e){let r=window.jQuery||window.parent?.jQuery;r&&(r(`.yyt-window-overlay[data-for="${t}"]`).remove(),r(document).off(".yytWindowDrag"+t),r(document).off(".yytWindowResize"+t)),e.remove(),xt.unregister(t)}}function $w(t){return typeof t!="string"?"":t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}var Mw,Rw,Ky,mi,xt,Rl=L(()=>{Le();q();Mw=C.createScope("WindowManager"),Rw="youyou_toolkit_window_manager",Ky="window_states",mi=class{constructor(){this.windows=new Map,this.baseZIndex=1e4,this.topZIndex=1e4,this.stylesInjected=!1}register(e,r){this.topZIndex++,this.windows.set(e,{$el:r,zIndex:this.topZIndex}),r.css("z-index",this.topZIndex)}unregister(e){this.windows.delete(e)}bringToFront(e){let r=this.windows.get(e);r&&(this.topZIndex++,r.zIndex=this.topZIndex,r.$el.css("z-index",this.topZIndex))}getWindow(e){return this.windows.get(e)?.$el||null}isOpen(e){return this.windows.has(e)}closeAll(){this.windows.forEach((e,r)=>{e.$el&&e.$el.remove()}),this.windows.clear()}saveState(e,r){let s=this.loadStates();s[e]={...r,updatedAt:Date.now()},an.set(Ky,s)}loadStates(){return an.get(Ky)||{}}getState(e){return this.loadStates()[e]||null}},xt=new mi});function Mt(){return Pl||(Pl=C.createScope("TableWorkbenchWindow")),Pl}function _e(t){return String(t??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Lw(t){if(!Number.isFinite(t)||t<=0)return"\u4ECE\u672A";let e=Date.now()-t;if(e<6e4)return`${Math.floor(e/1e3)} \u79D2\u524D`;if(e<36e5)return`${Math.floor(e/6e4)} \u5206\u949F\u524D`;if(e<864e5)return`${Math.floor(e/36e5)} \u5C0F\u65F6\u524D`;try{return new Date(t).toLocaleString()}catch{return"\u672A\u77E5"}}function Dw(){if(Wy||!(window.jQuery||window.parent?.jQuery))return;let e=window.parent?.document?.head||document.head,r=document.createElement("style");r.id="yyt-tww-styles",r.textContent=Nw,e.appendChild(r),Wy=!0}function Bw(t){let{config:e,activeTemplate:r,isolationKey:s,tablesPreview:o}=t,n=e?.runtime||{},i=n.lastStatus==="success"?"\u2713 \u4E0A\u6B21\u6210\u529F":n.lastStatus==="failed"?"\u2717 \u4E0A\u6B21\u5931\u8D25":n.lastStatus==="running"?"\u8FD0\u884C\u4E2D":"\u5F85\u547D",a=n.lastStatus==="success"?"success":n.lastStatus==="failed"?"error":"muted",l=e?.automation?.enabled?"\u81EA\u52A8":"\u624B\u52A8",d=e?.apiPreset||"\u8DDF\u968F\u4E3B API",c=e?.bypassPresetId?"\u5DF2\u7ED1\u5B9A":"\u65E0";return`
  <div class="yyt-tww">
    <!-- Hero -->
    <div class="yyt-tww-hero">
      <div class="yyt-tww-hero-row1">
        <div class="yyt-tww-hero-icon"><i class="fa-solid fa-wand-magic-sparkles"></i></div>
        <div class="yyt-tww-hero-name">\u586B\u8868\u5DE5\u4F5C\u53F0</div>
        <div class="yyt-tww-hero-actions">
          <button class="yyt-tww-btn yyt-tww-btn-small" data-action="run-now"><i class="fa-solid fa-play"></i> \u7ACB\u5373\u586B\u8868</button>
          <button class="yyt-tww-btn yyt-tww-btn-small" data-action="run-clear"><i class="fa-solid fa-rotate-left"></i> \u91CD\u586B</button>
        </div>
      </div>
      <div class="yyt-tww-hero-desc">\u4ECE\u5BF9\u8BDD\u5185\u5BB9\u63D0\u53D6\u7ED3\u6784\u5316\u6570\u636E\uFF0C\u81EA\u52A8\u7EF4\u62A4\u8868\u683C\u72B6\u6001\u3002</div>
      <div class="yyt-tww-hero-chips">
        <span class="yyt-tww-chip mode">\u6A21\u5F0F ${_e(l)}</span>
        <span class="yyt-tww-chip preset">\u6A21\u677F: ${_e(r?.template?.name||"\u9ED8\u8BA4")}</span>
        <span class="yyt-tww-chip preset">API: ${_e(d)}</span>
        <span class="yyt-tww-chip preset">\u6307\u4EE4: ${_e(c)}</span>
        ${s?`<span class="yyt-tww-chip">\u9694\u79BB: ${_e(s)}</span>`:""}
        <span class="yyt-tww-chip status-${a==="success"?"success":a==="error"?"failed":""}">${_e(i)}</span>
      </div>
    </div>

    <!-- Runtime stats -->
    <div class="yyt-tww-stat-row">
      <div class="yyt-tww-stat">
        <span class="yyt-tww-stat-label">\u72B6\u6001</span>
        <span class="yyt-tww-stat-value ${a}">${_e(i)}</span>
      </div>
      <div class="yyt-tww-stat">
        <span class="yyt-tww-stat-label">\u6700\u8FD1\u8FD0\u884C</span>
        <span class="yyt-tww-stat-value muted">${_e(Lw(n.lastRunAt))}</span>
      </div>
      <div class="yyt-tww-stat">
        <span class="yyt-tww-stat-label">\u6210\u529F</span>
        <span class="yyt-tww-stat-value success">${_e(n.successCount||0)}</span>
      </div>
      <div class="yyt-tww-stat">
        <span class="yyt-tww-stat-label">\u5931\u8D25</span>
        <span class="yyt-tww-stat-value ${n.errorCount?"error":"muted"}">${_e(n.errorCount||0)}</span>
      </div>
    </div>

    <!-- Scrollable body -->
    <div class="yyt-tww-scroll">

      <!-- \u7ED1\u5B9A\u533A -->
      <section class="yyt-tww-section" data-section="bindings">
        <div class="yyt-tww-section-heading">
          <span class="yyt-tww-section-icon"><i class="fa-solid fa-link"></i></span>
          \u7ED1\u5B9A
        </div>
        ${zw(t)}
      </section>

      <!-- \u586B\u8868\u884C\u4E3A -->
      <section class="yyt-tww-section" data-section="behavior">
        <div class="yyt-tww-section-heading">
          <span class="yyt-tww-section-icon"><i class="fa-solid fa-arrows-rotate"></i></span>
          \u586B\u8868\u884C\u4E3A
        </div>
        ${Kw(t)}
      </section>

      <!-- \u8868\u683C\u6982\u89C8 -->
      <section class="yyt-tww-section" data-section="overview">
        <div class="yyt-tww-section-heading">
          <span class="yyt-tww-section-icon"><i class="fa-solid fa-table-cells"></i></span>
          \u8868\u683C\u6982\u89C8
          <span class="yyt-tww-section-action">
            <button class="yyt-tww-btn yyt-tww-btn-small" data-action="open-editor"><i class="fa-solid fa-table-cells"></i> \u6253\u5F00\u6570\u636E\u7F16\u8F91\u5668</button>
          </span>
        </div>
        ${Uw(o)}
      </section>

    </div>
  </div>
  `}function zw(t){let{config:e,allTemplates:r,apiPresets:s,bypassPresets:o,regexPresets:n,worldbookPresets:i,activeTemplate:a}=t,l=r.map(v=>`<option value="${_e(v.id)}" ${a?.source?.templateId===v.id?"selected":""}>${_e(v.name)}</option>`).join(""),d=e?.automation?.enabled?"auto":"manual",c=e?.apiPreset||"",u='<option value="">\u2014\u2014 \u8DDF\u968F\u4E3B API \u2014\u2014</option>'+s.map(v=>`<option value="${_e(v.name)}" ${v.name===c?"selected":""}>${_e(v.name)}</option>`).join(""),p=e?.bypassPresetId||"",y='<option value="">\u2014\u2014 \u65E0 \u2014\u2014</option>'+o.map(v=>`<option value="${_e(v.id)}" ${v.id===p?"selected":""}>${_e(v.name)}${v.isDefault?" [\u9ED8\u8BA4]":""}</option>`).join(""),f=e?.extraction?.regexPresetId||"",m='<option value="">\u2014\u2014 \u65E0\uFF08\u4E0D\u8FDB\u884C\u63D0\u53D6\uFF09 \u2014\u2014</option>'+n.map(v=>`<option value="${_e(v.id)}" ${v.id===f?"selected":""}>${_e(v.name)}</option>`).join(""),b=e?.worldbooks?.presetId||"",w='<option value="">\u2014\u2014 \u65E0 \u2014\u2014</option>'+i.map(v=>`<option value="${_e(v.id)}" ${v.id===b?"selected":""}>${_e(v.name)}</option>`).join(""),S=e?.runScope||"enabled";return`
    <div class="yyt-tww-row">
      <div class="yyt-tww-row-label">
        <span class="yyt-tww-row-label-text">\u586B\u8868\u6A21\u677F</span>
        <span class="yyt-tww-row-label-hint">\u8868\u7ED3\u6784 + \u586B\u8868\u63D0\u793A\u8BCD</span>
      </div>
      <select class="yyt-tww-ctrl" data-binding="template">${l}</select>
      <div class="yyt-tww-row-meta">
        <span>${a?.mode==="inherit_global"?"\u7EE7\u627F\u5168\u5C40":a?.mode==="chat_override"?"chat \u8986\u76D6":a?.mode==="preset_link"?"\u94FE\u63A5\u9884\u8BBE":""}</span>
      </div>
    </div>

    <div class="yyt-tww-row">
      <div class="yyt-tww-row-label">
        <span class="yyt-tww-row-label-text">\u89E6\u53D1\u6A21\u5F0F</span>
        <span class="yyt-tww-row-label-hint">\u81EA\u52A8\u968F AI \u56DE\u590D / \u4EC5\u624B\u52A8</span>
      </div>
      <select class="yyt-tww-ctrl" data-binding="triggerMode">
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
      <select class="yyt-tww-ctrl" data-binding="apiPreset">${u}</select>
      <div class="yyt-tww-row-meta"><a data-link="api-presets">\u7BA1\u7406\u2026</a></div>
    </div>

    <div class="yyt-tww-row">
      <div class="yyt-tww-row-label">
        <span class="yyt-tww-row-label-text">Ai \u6307\u4EE4\u9884\u8BBE</span>
        <span class="yyt-tww-row-label-hint">\u9644\u52A0\u5728 system/user \u524D\u7684\u6307\u4EE4</span>
      </div>
      <select class="yyt-tww-ctrl" data-binding="bypassPreset">${y}</select>
      <div class="yyt-tww-row-meta"><a data-link="bypass">\u7BA1\u7406\u2026</a></div>
    </div>

    <div class="yyt-tww-row">
      <div class="yyt-tww-row-label">
        <span class="yyt-tww-row-label-text">\u6B63\u5219\u63D0\u53D6\u9884\u8BBE</span>
        <span class="yyt-tww-row-label-hint">\u51B3\u5B9A\u4ECE AI \u56DE\u590D\u4E2D\u5982\u4F55\u62BD\u53D6</span>
      </div>
      <select class="yyt-tww-ctrl" data-binding="regexPreset">${m}</select>
      <div class="yyt-tww-row-meta"><a data-link="regex">\u7BA1\u7406\u2026</a></div>
    </div>

    <div class="yyt-tww-row">
      <div class="yyt-tww-row-label">
        <span class="yyt-tww-row-label-text">\u4E16\u754C\u4E66\u9884\u8BBE</span>
        <span class="yyt-tww-row-label-hint">\u6CE8\u5165\u5230 prompt \u7684 {{toolWorldbookContent}}</span>
      </div>
      <select class="yyt-tww-ctrl" data-binding="worldbookPreset">${w}</select>
      <div class="yyt-tww-row-meta"><a data-link="worldbook">\u7BA1\u7406\u2026</a></div>
    </div>

    <div class="yyt-tww-row">
      <div class="yyt-tww-row-label">
        <span class="yyt-tww-row-label-text">\u4F5C\u7528\u57DF</span>
        <span class="yyt-tww-row-label-hint">\u6570\u636E\u72B6\u6001\u7ED1\u5B9A\u7684\u8303\u56F4</span>
      </div>
      <select class="yyt-tww-ctrl" data-binding="runScope">
        <option value="current" ${S==="current"?"selected":""}>\u4EC5\u5F53\u524D\u6D3B\u52A8\u8868</option>
        <option value="selected" ${S==="selected"?"selected":""}>\u5F53\u524D\u9009\u4E2D\u8868</option>
        <option value="enabled" ${S==="enabled"?"selected":""}>\u6240\u6709\u542F\u7528\u7684\u8868</option>
      </select>
      <div class="yyt-tww-row-meta"></div>
    </div>
  `}function Kw(t){let{config:e}=t,r=e?.fillMode||"incremental",s=Number(e?.contextDepth)||3,o=e?.worldbookSync?.enabled===!0,n=e?.mirrorToMessage===!0;return`
    <div class="yyt-tww-row">
      <div class="yyt-tww-row-label">
        <span class="yyt-tww-row-label-text">\u586B\u5145\u6A21\u5F0F</span>
        <span class="yyt-tww-row-label-hint">\u589E\u91CF\u66F4\u65B0 / \u5168\u8868\u91CD\u586B</span>
      </div>
      <select class="yyt-tww-ctrl" data-binding="fillMode">
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
      <input class="yyt-tww-ctrl" type="number" min="1" max="50" data-binding="contextDepth" value="${_e(s)}">
      <div class="yyt-tww-row-meta"></div>
    </div>

    <div class="yyt-tww-toggle-row">
      <div class="yyt-tww-toggle-info">
        <div class="yyt-tww-toggle-title">\u540C\u6B65\u5230\u4E16\u754C\u4E66</div>
        <div class="yyt-tww-toggle-desc">\u628A\u8868\u683C\u5E8F\u5217\u5316\u4E3A\u4E16\u754C\u4E66\u6761\u76EE\u8BA9\u4E3B\u6A21\u578B\u5728\u751F\u6210\u65F6\u770B\u5230\u3002</div>
      </div>
      <div class="yyt-tww-toggle ${o?"on":""}" data-toggle="worldbookSync"></div>
    </div>

    <div class="yyt-tww-toggle-row">
      <div class="yyt-tww-toggle-info">
        <div class="yyt-tww-toggle-title">\u5199\u56DE\u6B63\u6587\u955C\u50CF</div>
        <div class="yyt-tww-toggle-desc">\u5728\u52A9\u624B\u6D88\u606F\u672B\u5C3E\u955C\u50CF\u5199\u5165 markdown \u65B9\u4FBF\u624B\u52A8\u67E5\u9605\u3002</div>
      </div>
      <div class="yyt-tww-toggle ${n?"on":""}" data-toggle="mirrorToMessage"></div>
    </div>
  `}function Uw(t){return!Array.isArray(t)||t.length===0?'<div class="yyt-tww-empty">\u5F53\u524D slot \u6682\u65E0\u8868\u6570\u636E\u3002\u8BF7\u5148"\u7ACB\u5373\u586B\u8868"\u6216\u5728\u6570\u636E\u7F16\u8F91\u5668\u4E2D\u521D\u59CB\u5316\u3002</div>':`
    <div class="yyt-tww-table-grid">
      ${t.map((e,r)=>`
        <div class="yyt-tww-table-card" data-table-index="${r}">
          <div class="yyt-tww-table-card-header">
            <span class="yyt-tww-table-card-name">${_e(e.name||`\u8868 ${r+1}`)}</span>
            <i class="fa-solid fa-arrow-right yyt-tww-table-card-arrow"></i>
          </div>
          <div class="yyt-tww-table-card-stats">
            <span><b>${_e(e.rowCount||0)}</b> \u884C</span>
            <span><b>${_e(e.colCount||0)}</b> \u5B57\u6BB5</span>
            ${e.updatedHint?`<span>${_e(e.updatedHint)}</span>`:""}
          </div>
        </div>
      `).join("")}
    </div>
  `}function jw(){let t=(()=>{try{return We()}catch{return{}}})(),e=(()=>{try{return is()||[]}catch{return[]}})(),r=(()=>{try{return Fn({})}catch{return null}})(),s=(()=>{try{return vr()||[]}catch{return[]}})(),o=(()=>{try{return zo()||[]}catch{return[]}})(),n=(()=>{try{return Se.listPresets()||[]}catch{return[]}})(),i=(()=>{try{return Ot.listPresets()||[]}catch{return[]}})(),a=(()=>{try{return Ie.getKey()}catch{return""}})(),l=(r?.template?.tables||t?.tables||[]).map(d=>({name:d?.name||"",rowCount:Array.isArray(d?.rows)?d.rows.length:0,colCount:Array.isArray(d?.columns)?d.columns.length:0,updatedHint:""}));return{config:t,activeTemplate:r,allTemplates:e,apiPresets:s,bypassPresets:o,regexPresets:n,worldbookPresets:i,isolationKey:a,tablesPreview:l}}function Ww(t,e){t.on("click",'[data-action="run-now"]',async()=>{try{let s=await Qo();s?.success?R("success","\u586B\u8868\u5B8C\u6210"):R("error",`\u586B\u8868\u5931\u8D25\uFF1A${s?.error||"\u672A\u77E5"}`),e()}catch(s){Mt().error("\u7ACB\u5373\u586B\u8868\u5F02\u5E38",s),R("error",`\u5F02\u5E38\uFF1A${s?.message||s}`)}}),t.on("click",'[data-action="run-clear"]',async()=>{if(window.confirm("\u91CD\u586B\u4F1A\u6E05\u7A7A\u5F53\u524D\u6D88\u606F\u697C\u5C42\u7684\u8868\u683C\u6570\u636E\u5E76\u91CD\u65B0\u751F\u6210\uFF0C\u786E\u5B9A\uFF1F"))try{let s=await Qo(null,{clearBeforeUpdate:!0});s?.success?R("success","\u91CD\u586B\u5B8C\u6210"):R("error",`\u91CD\u586B\u5931\u8D25\uFF1A${s?.error||"\u672A\u77E5"}`),e()}catch(s){Mt().error("\u91CD\u586B\u5F02\u5E38",s),R("error",`\u5F02\u5E38\uFF1A${s?.message||s}`)}}),t.on("click",'[data-action="open-editor"], [data-table-index]',s=>{s.preventDefault(),R("info","\u6570\u636E\u7F16\u8F91\u5668\u7A97\u53E3\u5F85\u5B9E\u73B0\uFF08#11\uFF09")}),t.on("change",'[data-binding="template"]',function(){let s=$(this).val();try{Qa(s);let o=We();pr({...o,activeTemplate:s}),R("success","\u6A21\u677F\u5DF2\u5207\u6362"),e()}catch(o){Mt().error("\u5207\u6362\u6A21\u677F\u5F02\u5E38",o),R("error",`\u5207\u6362\u5931\u8D25\uFF1A${o?.message||o}`)}}),t.on("change",'[data-binding="triggerMode"]',function(){let s=$(this).val();try{let o=We();pr({...o,automation:{...o.automation||{},enabled:s==="auto"}}),R("success",s==="auto"?"\u5DF2\u5207\u6362\u4E3A\u81EA\u52A8\u6A21\u5F0F":"\u5DF2\u5207\u6362\u4E3A\u624B\u52A8\u6A21\u5F0F"),e()}catch(o){Mt().error("\u5207\u6362\u89E6\u53D1\u6A21\u5F0F\u5F02\u5E38",o),R("error",`\u5207\u6362\u5931\u8D25\uFF1A${o?.message||o}`)}});let r=[{sel:'[data-binding="apiPreset"]',key:"apiPreset"},{sel:'[data-binding="bypassPreset"]',key:"bypassPresetId"},{sel:'[data-binding="runScope"]',key:"runScope"},{sel:'[data-binding="fillMode"]',key:"fillMode"}];for(let{sel:s,key:o}of r)t.on("change",s,function(){let n=$(this).val();try{let i=We();pr({...i,[o]:n}),R("success","\u5DF2\u4FDD\u5B58")}catch(i){Mt().error(`\u4FDD\u5B58 ${o} \u5F02\u5E38`,i),R("error",`\u4FDD\u5B58\u5931\u8D25\uFF1A${i?.message||i}`)}});t.on("change",'[data-binding="regexPreset"]',function(){let s=$(this).val();try{let o=We();pr({...o,extraction:{...o.extraction||{},regexPresetId:s}}),R("success","\u6B63\u5219\u9884\u8BBE\u5DF2\u66F4\u65B0")}catch(o){Mt().error("\u4FDD\u5B58 regexPreset \u5F02\u5E38",o),R("error",`\u4FDD\u5B58\u5931\u8D25\uFF1A${o?.message||o}`)}}),t.on("change",'[data-binding="worldbookPreset"]',function(){let s=$(this).val();try{let o=We();pr({...o,worldbooks:{...o.worldbooks||{},presetId:s}}),R("success","\u4E16\u754C\u4E66\u9884\u8BBE\u5DF2\u66F4\u65B0")}catch(o){Mt().error("\u4FDD\u5B58 worldbookPreset \u5F02\u5E38",o),R("error",`\u4FDD\u5B58\u5931\u8D25\uFF1A${o?.message||o}`)}}),t.on("change",'[data-binding="contextDepth"]',function(){let s=Math.max(1,parseInt($(this).val(),10)||3);try{let o=We();pr({...o,contextDepth:s}),R("success","\u5DF2\u4FDD\u5B58")}catch(o){Mt().error("\u4FDD\u5B58 contextDepth \u5F02\u5E38",o),R("error",`\u4FDD\u5B58\u5931\u8D25\uFF1A${o?.message||o}`)}}),t.on("click",'[data-toggle="worldbookSync"]',function(){let s=$(this),o=s.hasClass("on"),n=!o;s.toggleClass("on",n);try{let i=We();pr({...i,worldbookSync:{...i.worldbookSync||{},enabled:n}}),R("success",n?"\u5DF2\u542F\u7528\u4E16\u754C\u4E66\u540C\u6B65":"\u5DF2\u505C\u7528\u4E16\u754C\u4E66\u540C\u6B65")}catch(i){s.toggleClass("on",o),Mt().error("toggle worldbookSync \u5F02\u5E38",i),R("error",`\u4FDD\u5B58\u5931\u8D25\uFF1A${i?.message||i}`)}}),t.on("click",'[data-toggle="mirrorToMessage"]',function(){let s=$(this),o=s.hasClass("on"),n=!o;s.toggleClass("on",n);try{let i=We();pr({...i,mirrorToMessage:n}),R("success",n?"\u5DF2\u542F\u7528\u6B63\u6587\u955C\u50CF":"\u5DF2\u505C\u7528\u6B63\u6587\u955C\u50CF")}catch(i){s.toggleClass("on",o),Mt().error("toggle mirrorToMessage \u5F02\u5E38",i),R("error",`\u4FDD\u5B58\u5931\u8D25\uFF1A${i?.message||i}`)}}),t.on("click","[data-link]",function(s){s.preventDefault(),R("info","\u8DF3\u8F6C\u5230\u9884\u8BBE\u7BA1\u7406\u9762\u677F\uFF08\u5F85\u63A5\u5165\uFF09")})}function Fy(t={}){if(Dw(),!(window.jQuery||window.parent?.jQuery))return Mt().error("jQuery \u4E0D\u53EF\u7528"),null;let r=()=>{let n=jw();return Bw(n)},s=null,o=()=>{if(!s)return;s.find(".yyt-window-body").html(r())};return s=Ml({id:Ow,title:"\u586B\u8868\u5DE5\u4F5C\u53F0",content:r(),width:980,height:720,modal:!1,resizable:!0,maximizable:!0,rememberState:!0,onReady:n=>{if(s=n,Ww(s,o),t.focus){let i=s.find(`[data-section="${t.focus}"]`);if(i.length){let a=s.find(".yyt-tww-scroll");a.animate({scrollTop:i.position().top+a.scrollTop()-10},200)}}},onClose:()=>{Mt().info("\u7A97\u53E3\u5DF2\u5173\u95ED")}}),s}var Ow,Pl,Nw,Wy,Hy=L(()=>{Rl();q();dr();No();ls();gi();fo();qs();ss();As();Je();Ow="yyt-table-workbench-window";Nw=`
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
  height: 100%; background: var(--tww-canvas); color: var(--tww-text);
  font-size: 13px; line-height: 1.5;
}
.yyt-tww-hero {
  flex-shrink: 0;
  padding: 14px 18px;
  border-bottom: 1px solid var(--tww-hairline);
  background: var(--tww-surface-1);
  display: flex; flex-direction: column; gap: 8px;
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
.yyt-tww-hero-chips { display: flex; gap: 6px; flex-wrap: wrap; padding-left: 42px; }
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

.yyt-tww-scroll {
  flex: 1; min-height: 0; overflow-y: auto;
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

.yyt-tww-ctrl {
  width: 100%; padding: 7px 10px;
  background: var(--tww-canvas);
  border: 1px solid var(--tww-hairline-strong);
  border-radius: 6px;
  color: var(--tww-text); font-size: 12px;
  outline: none;
  transition: border-color 0.12s ease;
  font-family: inherit;
}
.yyt-tww-ctrl:focus {
  border-color: var(--tww-accent);
  box-shadow: 0 0 0 2px var(--tww-accent-soft);
}
select.yyt-tww-ctrl {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23a8b7ca' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat; background-position: right 10px center;
  background-size: 10px; padding-right: 28px; cursor: pointer;
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
.yyt-tww-table-card-header { display: flex; align-items: center; gap: 8px; }
.yyt-tww-table-card-name { flex: 1; font-size: 13px; font-weight: 700; color: var(--tww-text); }
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
`,Wy=!1});var Vy={};oe(Vy,{TableWorkbenchPanel:()=>qy,default:()=>Yw});function Hw(){if(Yy)return;let t=(window.parent&&window.parent.document?window.parent.document:document).head,e=document.createElement("style");e.id="yyt-twb-launcher-styles",e.textContent=Fw,t.appendChild(e),Yy=!0}function hi(t){return String(t??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Gw(){let t={};try{t=We()||{}}catch{}let e=t.runtime||{},r="\u9ED8\u8BA4";try{r=Fn({})?.template?.name||r}catch{}let s="";try{s=Ie.getKey()}catch{}return{cfg:t,runtime:e,templateName:r,isolationKey:s,triggerMode:t.automation?.enabled?"\u81EA\u52A8":"\u624B\u52A8"}}var Gy,Fw,Yy,qy,Yw,Jy=L(()=>{Je();q();dr();No();ls();gi();Hy();Gy=C.createScope("TableWorkbenchPanel"),Fw=`
.yyt-twb-launcher {
  padding: 20px;
  display: flex; flex-direction: column; gap: 16px;
  max-width: 760px; margin: 0 auto;
}
.yyt-twb-launcher h1 {
  font-size: 20px; font-weight: 700; color: var(--yyt-text);
  display: flex; align-items: center; gap: 10px;
  margin: 0;
}
.yyt-twb-launcher h1 .icon {
  width: 32px; height: 32px; border-radius: 8px;
  background: var(--yyt-accent-soft); color: var(--yyt-accent);
  display: inline-flex; align-items: center; justify-content: center;
  font-size: 15px;
}
.yyt-twb-launcher-desc {
  color: var(--yyt-text-secondary); font-size: 13px;
  line-height: 1.7;
}
.yyt-twb-launcher-chips {
  display: flex; flex-wrap: wrap; gap: 6px;
}
.yyt-twb-launcher-chip {
  display: inline-flex; align-items: center; gap: 5px;
  padding: 3px 9px; border-radius: 999px;
  font-size: 11px; font-weight: 600; letter-spacing: 0.3px;
  background: var(--yyt-surface-2); color: var(--yyt-text-secondary);
  border: 1px solid var(--yyt-border);
}
.yyt-twb-launcher-chip.preset { color: var(--yyt-accent); background: var(--yyt-accent-soft); border-color: rgba(123,183,255,0.18); }
.yyt-twb-launcher-chip.mode { color: #a78bfa; background: rgba(167,139,250,0.12); border-color: rgba(167,139,250,0.18); }
.yyt-twb-launcher-actions {
  display: flex; gap: 10px; flex-wrap: wrap;
  margin-top: 4px;
}
.yyt-twb-launcher-btn {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 12px 20px;
  border: 1px solid var(--yyt-border-strong);
  border-radius: 8px;
  background: var(--yyt-surface-2);
  color: var(--yyt-text);
  font-size: 14px; font-weight: 600; cursor: pointer;
  transition: all 0.12s ease;
  font-family: inherit;
}
.yyt-twb-launcher-btn:hover { background: var(--yyt-surface-3); }
.yyt-twb-launcher-btn-primary {
  background: var(--yyt-accent); color: var(--yyt-on-accent);
  border-color: transparent; font-weight: 700;
}
.yyt-twb-launcher-btn-primary:hover { background: var(--yyt-accent-strong); }
.yyt-twb-launcher-hint {
  margin-top: 4px;
  padding: 10px 14px;
  background: var(--yyt-surface-2);
  border-left: 3px solid var(--yyt-accent);
  border-radius: 4px;
  color: var(--yyt-text-secondary);
  font-size: 12px; line-height: 1.7;
}
.yyt-twb-launcher-hint code {
  font-family: ui-monospace, "SF Mono", Consolas, monospace;
  font-size: 11px; padding: 1px 5px; border-radius: 3px;
  background: var(--yyt-bg-base); color: var(--yyt-accent);
}
`,Yy=!1;qy={id:"tableWorkbenchPanel",render(){Hw();let t=Gw(),e=t.runtime?.lastStatus==="success"?"\u4E0A\u6B21\u6210\u529F":t.runtime?.lastStatus==="failed"?"\u4E0A\u6B21\u5931\u8D25":t.runtime?.lastRunAt>0?"\u5DF2\u8FD0\u884C":"\u4ECE\u672A\u8FD0\u884C";return`
      <div class="yyt-twb-launcher">
        <h1>
          <span class="icon"><i class="fa-solid fa-wand-magic-sparkles"></i></span>
          \u586B\u8868\u5DE5\u4F5C\u53F0
        </h1>
        <div class="yyt-twb-launcher-desc">
          \u4ECE\u5BF9\u8BDD\u5185\u5BB9\u63D0\u53D6\u7ED3\u6784\u5316\u6570\u636E\uFF0C\u81EA\u52A8\u7EF4\u62A4\u8868\u683C\u72B6\u6001\u3002\u70B9\u51FB\u4E0B\u65B9\u6309\u94AE\u6253\u5F00\u72EC\u7ACB\u5DE5\u4F5C\u53F0\u7A97\u53E3\u914D\u7F6E AI \u7ED1\u5B9A\u3001\u6A21\u677F\u548C\u586B\u8868\u884C\u4E3A\uFF1B\u6570\u636E\u7F16\u8F91\u53EF\u4ECE\u5DE5\u4F5C\u53F0\u5185\u90E8\u8FDB\u5165\u3002
        </div>

        <div class="yyt-twb-launcher-chips">
          <span class="yyt-twb-launcher-chip mode">\u6A21\u5F0F ${hi(t.triggerMode)}</span>
          <span class="yyt-twb-launcher-chip preset">\u6A21\u677F: ${hi(t.templateName)}</span>
          ${t.isolationKey?`<span class="yyt-twb-launcher-chip">\u9694\u79BB: ${hi(t.isolationKey)}</span>`:""}
          <span class="yyt-twb-launcher-chip">${hi(e)}</span>
        </div>

        <div class="yyt-twb-launcher-actions">
          <button class="yyt-twb-launcher-btn yyt-twb-launcher-btn-primary" data-twb-action="open-window">
            <i class="fa-solid fa-table-cells"></i> \u6253\u5F00\u586B\u8868\u5DE5\u4F5C\u53F0
          </button>
          <button class="yyt-twb-launcher-btn" data-twb-action="run-now">
            <i class="fa-solid fa-play"></i> \u7ACB\u5373\u586B\u8868
          </button>
        </div>

        <div class="yyt-twb-launcher-hint">
          <strong>v1.0.169 \u91CD\u5199\u8BF4\u660E\uFF1A</strong> \u65E7\u7248\u9762\u677F\u7684\u914D\u7F6E\u9762\u548C\u6570\u636E\u7F16\u8F91\u5DF2\u5206\u522B\u8FC1\u79FB\u5230<b>\u5DE5\u4F5C\u53F0\u7A97\u53E3</b>\u548C<b>\u6570\u636E\u7F16\u8F91\u5668\u7A97\u53E3</b>\u3002
          \u6A21\u677F/\u6B63\u5219/\u4E16\u754C\u4E66/AI \u6307\u4EE4\u7684\u5185\u5BB9\u7F16\u8F91\u8BF7\u5728 <code>\u9884\u8BBE\u7BA1\u7406</code> \u4E3B tab \u5B8C\u6210\uFF1B\u672C\u5165\u53E3\u53EA\u505A\u542F\u52A8\u4E0E\u5FEB\u6377\u8FD0\u884C\u3002
        </div>
      </div>
    `},bindEvents(t){if(!X()||!pe(t))return;let r=this;t.off(".twb"),t.on("click.twb",'[data-twb-action="open-window"]',()=>{try{Fy()}catch(s){Gy.error("\u6253\u5F00\u5DE5\u4F5C\u53F0\u7A97\u53E3\u5F02\u5E38",s),R("error",`\u6253\u5F00\u5931\u8D25\uFF1A${s?.message||s}`)}}),t.on("click.twb",'[data-twb-action="run-now"]',async()=>{try{let s=await Qo();s?.success?R("success","\u586B\u8868\u5B8C\u6210"):R("error",`\u586B\u8868\u5931\u8D25\uFF1A${s?.error||"\u672A\u77E5"}`),typeof r.renderTo=="function"&&r.renderTo(t)}catch(s){Gy.error("\u7ACB\u5373\u586B\u8868\u5F02\u5E38",s),R("error",`\u5F02\u5E38\uFF1A${s?.message||s}`)}})},renderTo(t){!X()||!pe(t)||(t.html(this.render()),this.bindEvents(t))}},Yw=qy});var Qy={};oe(Qy,{LoggerPanel:()=>Xy,default:()=>Qw});function Jw(t){switch(t){case le.DEBUG:return"yyt-log-debug";case le.INFO:return"yyt-log-info";case le.WARN:return"yyt-log-warn";case le.ERROR:return"yyt-log-error";default:return""}}function Xw(t){let e=new Date(t),r=s=>String(s).padStart(2,"0");return`${r(e.getHours())}:${r(e.getMinutes())}:${r(e.getSeconds())}.${String(e.getMilliseconds()).padStart(3,"0")}`}var qw,Vw,Xy,Qw,Zy=L(()=>{q();Ke();Je();qw="yyt-logger-panel",Vw=[{level:null,label:"\u5168\u90E8",icon:"fa-list"},{level:le.DEBUG,label:"DEBUG",icon:"fa-bug"},{level:le.INFO,label:"INFO",icon:"fa-circle-info"},{level:le.WARN,label:"WARN",icon:"fa-triangle-exclamation"},{level:le.ERROR,label:"ERROR",icon:"fa-circle-exclamation"}];Xy={id:"loggerPanel",render(){let t=C.getStats();return`
      <div class="yyt-logger-panel" id="${qw}">
        <div class="yyt-logger-toolbar">
          <div class="yyt-logger-filter-btns" data-yyt-log-filter-group>
            ${Vw.map((e,r)=>`<button class="yyt-log-filter-btn ${r===0?"yyt-active":""}" data-level="${e.level??""}">
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
    `},bindEvents(t){let e=X();if(!e||!pe(t))return;let r=this,s=null,o=!1,n=[],i=t.find("[data-yyt-log-list]"),a=t.find("[data-yyt-log-search]"),l=t.find("[data-yyt-log-autoscroll]"),d=t.find("[data-yyt-log-pause]");function c(y){if(!y.length){i.html('<div class="yyt-logger-empty">\u6682\u65E0\u5339\u914D\u7684\u65E5\u5FD7\u8BB0\u5F55</div>');return}i.html(y.map(f=>`
        <div class="yyt-log-entry ${Jw(f.level)}" data-log-id="${f.id}">
          <span class="yyt-log-time">${Xw(f.timestamp)}</span>
          <span class="yyt-log-level">${C.levelLabel(f.level)}</span>
          <span class="yyt-log-scope">${re(f.scope)}</span>
          <span class="yyt-log-msg">${re(f.message)}</span>
          ${f.data!==void 0?`<span class="yyt-log-data">${re(typeof f.data=="object"?JSON.stringify(f.data):String(f.data))}</span>`:""}
        </div>
      `).join(""))}function u(){let y=a.val()?.trim()||"",{entries:f}=C.getEntries({level:s,search:y||void 0,limit:500});c(f),l.is(":checked")&&requestAnimationFrame(()=>{i[0].scrollTop=i[0].scrollHeight})}function p(){if(o||!n.length)return;let y=n;n=[],u()}this._onLogEntry=y=>{if(o||s!==null&&y.level<s)return;let f=a.val()?.trim().toLowerCase()||"";if(f){let m=y.scope.toLowerCase().includes(f),b=y.message.toLowerCase().includes(f);if(!m&&!b)return}n.push(y),n.length>=50?p():this._flushTimer||(this._flushTimer=setTimeout(()=>{this._flushTimer=null,p(),r._updateStats(t)},250))},z.on("logger:entry",this._onLogEntry),t.on("click.yytLogger","[data-yyt-log-filter-group] .yyt-log-filter-btn",y=>{t.find("[data-yyt-log-filter-group] .yyt-log-filter-btn").removeClass("yyt-active"),e(y.currentTarget).addClass("yyt-active");let f=e(y.currentTarget).data("level");s=f===""?null:f,u(),r._updateStats(t)}),a.on("input.yytLogger",()=>{u()}),t.on("click.yytLogger","[data-yyt-log-pause]",()=>{o=!o,d.toggleClass("yyt-active",o),d.html(o?'<i class="fa-solid fa-play"></i> \u7EE7\u7EED':'<i class="fa-solid fa-pause"></i> \u6682\u505C'),o||(n=[],u(),r._updateStats(t))}),t.on("click.yytLogger","[data-yyt-log-clear]",()=>{C.clear(),i.html('<div class="yyt-logger-empty">\u65E5\u5FD7\u5DF2\u6E05\u9664</div>'),r._updateStats(t)}),t.on("click.yytLogger","[data-yyt-log-export]",()=>{let{entries:y}=C.getEntries({limit:1e4}),f=JSON.stringify(y.map(S=>({time:new Date(S.timestamp).toISOString(),level:C.levelLabel(S.level),scope:S.scope,message:S.message,data:S.data})),null,2),m=new Blob([f],{type:"application/json"}),b=URL.createObjectURL(m),w=document.createElement("a");w.href=b,w.download=`yyt-logs-${new Date().toISOString().replace(/[:.]/g,"-")}.json`,w.click(),URL.revokeObjectURL(b)}),u()},_updateStats(t){if(!X()||!pe(t))return;let r=C.getStats(),s=t.find(".yyt-logger-stats");s.length&&s.html(`
      <span class="yyt-logger-stat">\u5171 <strong>${r.total}</strong> \u6761</span>
      ${["ERROR","WARN","INFO","DEBUG"].map(o=>`<span class="yyt-logger-stat yyt-log-${o.toLowerCase()}">${o}: <strong>${r.byLevel[o]||0}</strong></span>`).join("")}
    `)},destroy(t){let e=X();this._onLogEntry&&(z.off("logger:entry",this._onLogEntry),this._onLogEntry=null),this._flushTimer&&(clearTimeout(this._flushTimer),this._flushTimer=null),!(!e||!pe(t))&&t.off(".yytLogger")},getStyles(){return`
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
    `}},Qw=Xy});var cf={};oe(cf,{MAIN_TAB_RENDERERS:()=>Yl,PanelState:()=>Fi,SCRIPT_ID:()=>Fr,SUB_TAB_RENDERERS:()=>ql,UIManager:()=>xo,bindDialogEvents:()=>mo,closeActiveCustomSelectDropdown:()=>jt,closeCustomSelectDropdown:()=>Yi,createDialogHtml:()=>go,default:()=>ev,destroyEnhancedCustomSelects:()=>et,downloadJson:()=>ho,enhanceNativeSelects:()=>vt,escapeHtml:()=>re,fillFormWithConfig:()=>Ug,getAllStyles:()=>lf,getFormApiConfig:()=>Kg,getJQuery:()=>X,getTargetDocument:()=>_s,initUI:()=>sf,isContainerValid:()=>pe,normalizeCustomSelectOptions:()=>Pc,openCustomSelectDropdown:()=>Mc,readFileContent:()=>bo,registerComponents:()=>$l,renderApiPanel:()=>Ol,renderBypassPanel:()=>Wl,renderCustomSelectControl:()=>$c,renderEscapeTransformToolPanel:()=>Ul,renderLoggerPanel:()=>Gl,renderMainTab:()=>nf,renderPunctuationTransformToolPanel:()=>jl,renderRegexPanel:()=>Nl,renderSettingsPanel:()=>Fl,renderStatusBlockPanel:()=>zl,renderSubTabComponent:()=>af,renderSummaryToolPanel:()=>Bl,renderTableTemplatePanel:()=>Dl,renderTableWorkbenchPanel:()=>Hl,renderToolPanel:()=>of,renderWorldbookPresetPanel:()=>Ll,renderYouyouReviewPanel:()=>Kl,repositionActiveCustomSelectDropdown:()=>Gi,resetJQueryCache:()=>Pg,showConfirm:()=>er,showPrompt:()=>jg,showToast:()=>R,showTopNotice:()=>Hr,toggleCustomSelectDropdown:()=>Rc,uiManager:()=>Pt,withButtonLoading:()=>Wg});async function tf(t){if(!bi.has(t)){let e=ef[t];if(typeof e!="function")throw new Error(`unknown_panel:${t}`);bi.set(t,e().then(r=>{let s=r?.[t]||r?.default;if(!s?.id)throw new Error(`invalid_panel:${t}`);return s}).catch(r=>{throw bi.delete(t),r}))}return bi.get(t)}function rf(t,e=null){let r=e?.message?`\uFF1A${re(e.message)}`:"";return`<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>${re(t)}${r}</span></div>`}async function $l(){let t=await Promise.allSettled(Object.keys(ef).map(async r=>{let s=await tf(r);return Pt.register(s.id,s),s.id})),e=t.filter(r=>r.status==="rejected");e.length&&e.forEach(r=>Zo.error("\u7EC4\u4EF6\u6CE8\u518C\u5931\u8D25",r.reason)),Zo.log(`\u7EC4\u4EF6\u6CE8\u518C\u5B8C\u6210\uFF0C\u6210\u529F ${t.length-e.length} \u4E2A\uFF0C\u5931\u8D25 ${e.length} \u4E2A`)}async function sf(t={}){let{autoInjectStyles:e=!0,targetDocument:r,...s}=t;Pt.init(s),await $l(),e&&Pt.injectStyles(r),Zo.log("\u6A21\u5757\u521D\u59CB\u5316\u5B8C\u6210")}async function Zw(t){let e=await tf(t);return Pt.getComponent(e.id)||Pt.register(e.id,e),e}async function lt(t,e,r={}){let s=await Zw(t);Pt.render(s.id,e,r)}function Ol(t){return lt("ApiPresetPanel",t)}function Ll(t){return lt("WorldbookPresetPanel",t)}function Nl(t){return lt("RegexExtractPanel",t)}function Dl(t){return lt("TableTemplatePanel",t)}function of(t){return lt("ToolManagePanel",t)}function Bl(t){return lt("SummaryToolPanel",t)}function zl(t){return lt("StatusBlockPanel",t)}function Kl(t){return lt("YouyouReviewPanel",t)}function Ul(t){return lt("EscapeTransformToolPanel",t)}function jl(t){return lt("PunctuationTransformToolPanel",t)}function Wl(t){return lt("BypassPanel",t)}function Fl(t){return lt("SettingsPanel",t)}function Hl(t){return lt("TableWorkbenchPanel",t)}function Gl(t){return lt("LoggerPanel",t)}async function nf(t,e){let r=Yl[t];if(!r)return!1;try{await r.render(e)}catch(s){Zo.error(r.failMessage,s),e.html(rf(r.failMessage,s))}return!0}async function af(t,e){let r=ql[t];if(!r)return null;try{await r.render(e)}catch(s){Zo.error(r.failMessage,s),e.html(rf(r.failMessage,s))}return t}function lf(){return Pt.getAllStyles()}var Zo,ef,bi,Yl,ql,ev,df=L(()=>{q();qi();Je();Je();qi();Zo=C.createScope("UI"),ef=Object.freeze({ApiPresetPanel:()=>Promise.resolve().then(()=>(Qc(),Xc)),WorldbookPresetPanel:()=>Promise.resolve().then(()=>(yd(),pd)),RegexExtractPanel:()=>Promise.resolve().then(()=>(bu(),hu)),TableTemplatePanel:()=>Promise.resolve().then(()=>(Zu(),Qu)),ToolManagePanel:()=>Promise.resolve().then(()=>(rp(),tp)),SummaryToolPanel:()=>Promise.resolve().then(()=>(Cp(),Ap)),StatusBlockPanel:()=>Promise.resolve().then(()=>(Mp(),Ip)),YouyouReviewPanel:()=>Promise.resolve().then(()=>($p(),Pp)),EscapeTransformToolPanel:()=>Promise.resolve().then(()=>(Dp(),Np)),PunctuationTransformToolPanel:()=>Promise.resolve().then(()=>(Kp(),zp)),BypassPanel:()=>Promise.resolve().then(()=>(Wp(),jp)),SettingsPanel:()=>Promise.resolve().then(()=>(gl(),fl)),TableWorkbenchPanel:()=>Promise.resolve().then(()=>(Jy(),Vy)),LoggerPanel:()=>Promise.resolve().then(()=>(Zy(),Qy))}),bi=new Map;Yl=Object.freeze({tableWorkbench:{render:t=>Hl(t),failMessage:"\u586B\u8868\u5DE5\u4F5C\u53F0\u52A0\u8F7D\u5931\u8D25"},bypass:{render:t=>Wl(t),failMessage:"Ai\u6307\u4EE4\u9884\u8BBE\u9762\u677F\u52A0\u8F7D\u5931\u8D25"},settings:{render:t=>Fl(t),failMessage:"\u8BBE\u7F6E\u9762\u677F\u52A0\u8F7D\u5931\u8D25"},logger:{render:t=>Gl(t),failMessage:"\u65E5\u5FD7\u9762\u677F\u52A0\u8F7D\u5931\u8D25"}}),ql=Object.freeze({ApiPresetPanel:{render:t=>Ol(t),failMessage:"API \u9884\u8BBE\u9762\u677F\u52A0\u8F7D\u5931\u8D25"},RegexExtractPanel:{render:t=>Nl(t),failMessage:"\u6B63\u5219\u63D0\u53D6\u9762\u677F\u52A0\u8F7D\u5931\u8D25"},WorldbookPresetPanel:{render:t=>Ll(t),failMessage:"\u4E16\u754C\u4E66\u9884\u8BBE\u9762\u677F\u52A0\u8F7D\u5931\u8D25"},TableTemplatePanel:{render:t=>Dl(t),failMessage:"\u8868\u683C\u6A21\u677F\u9762\u677F\u52A0\u8F7D\u5931\u8D25"},SummaryToolPanel:{render:t=>Bl(t),failMessage:"\u6458\u8981\u5DE5\u5177\u52A0\u8F7D\u5931\u8D25"},StatusBlockPanel:{render:t=>zl(t),failMessage:"\u4E3B\u89D2\u72B6\u6001\u680F\u52A0\u8F7D\u5931\u8D25"},YouyouReviewPanel:{render:t=>Kl(t),failMessage:"\u5C0F\u5E7D\u70B9\u8BC4\u52A0\u8F7D\u5931\u8D25"},EscapeTransformToolPanel:{render:t=>Ul(t),failMessage:"\u8F6C\u4E49\u5904\u7406\u5DE5\u5177\u52A0\u8F7D\u5931\u8D25"},PunctuationTransformToolPanel:{render:t=>jl(t),failMessage:"\u4E2D\u6587\u6807\u70B9\u66FF\u6362\u5DE5\u5177\u52A0\u8F7D\u5931\u8D25"}});ev={uiManager:Pt,registerComponents:$l,initUI:sf,renderApiPanel:Ol,renderWorldbookPresetPanel:Ll,renderRegexPanel:Nl,renderTableTemplatePanel:Dl,renderToolPanel:of,renderSummaryToolPanel:Bl,renderStatusBlockPanel:zl,renderYouyouReviewPanel:Kl,renderEscapeTransformToolPanel:Ul,renderPunctuationTransformToolPanel:jl,renderBypassPanel:Wl,renderSettingsPanel:Fl,renderTableWorkbenchPanel:Hl,renderLoggerPanel:Gl,MAIN_TAB_RENDERERS:Yl,SUB_TAB_RENDERERS:ql,renderMainTab:nf,renderSubTabComponent:af,getAllStyles:lf}});var mf={};oe(mf,{TX_PHASE:()=>Rt,ToolAutomationService:()=>wi,Transaction:()=>xi,default:()=>nv,toolAutomationService:()=>gf});function ce(t){return t==null?"":String(t).trim()}function uf(t){let e=Vn(t);return ce(e?.chatId??e?.chat_id??t?.chatId??t?.chat_id??t?.chat_filename??t?.this_chid??"chat_default")||"chat_default"}function Vl(t){let e=Vn(t);return Array.isArray(e?.chat)?e.chat:Array.isArray(t?.chat)?t.chat:[]}function ff(t){if(!t||t?.is_user===!0||t?.is_system===!0)return!1;let e=String(t?.role||"").trim().toLowerCase();return e==="user"||e==="system"?!1:e==="assistant"||e==="ai"||!e}function tv(t,e){let r=ce(e);if(!r)return null;let s=Vl(t);for(let o=s.length-1;o>=0;o-=1){let n=s[o];if([n?.messageId,n?.message_id,n?.id,n?.mid,n?.mesid,n?.chat_index,o].map(a=>ce(a)).includes(r))return n||null}return null}function pf(t){let e=Vl(t);if(!Array.isArray(e)||e.length===0)return null;let r=e.length-1,s=e[r]||null;if(!ff(s))return null;let o=ce(s?.messageId??s?.message_id??s?.id??s?.mid??s?.mesid??s?.chat_index??r);return o?{messageId:o,swipeId:ce(s?.swipeId??s?.swipe_id??s?.swipe??s?.swipeIndex),message:s}:null}function ov(){let t=Date.now().toString(36),e=Math.random().toString(36).slice(2,8);return`tx_${t}_${e}`}var Ne,yf,rv,sv,Rt,xi,wi,gf,nv,hf=L(()=>{Uo();q();sl();qt();jo();nl();Xr();gi();dr();Ne=C.createScope("ToolAutomation");yf=1e4,rv=15e3,sv=800;Rt=Object.freeze({RECEIVED:"received",CONFIRMED:"confirmed",CONTEXT_BUILT:"context_built",REQUEST_STARTED:"request_started",REQUEST_FINISHED:"request_finished",WRITEBACK_STARTED:"writeback_started",WRITEBACK_COMMITTED:"writeback_committed",REFRESH_CONFIRMED:"refresh_confirmed",SKIPPED:"skipped",FAILED:"failed"}),xi=class{constructor({chatId:e,messageId:r,swipeId:s,sourceEvent:o,generationKey:n}){this.traceId=ov(),this.chatId=e||"",this.messageId=r||"",this.swipeId=s||"",this.sourceEvent=o||"",this.generationKey=n||"",this.phase=Rt.RECEIVED,this.createdAt=Date.now(),this.updatedAt=Date.now(),this.verdict="",this.error=null,this.toolResults=[],this.writebackState=null,this.refreshState=null}transition(e,r={}){return this.phase=e,this.updatedAt=Date.now(),Object.assign(this,r),this}toSnapshot(){return{...this}}},wi=class{constructor(){this._stopCallbacks=[],this._pendingTimers=new Map,this._recentlyProcessedSlots=new Map,this._ownWriteMessageIds=new Map,this._slotQueues=new Map,this._activeTransactions=new Map,this._isProcessing=!1,this._currentChatId="",this.debugMode=!1,this._transactionHistory=[],this._maxHistorySize=30,this._hostBindingStatus={initialized:!1,initAttempts:0,lastInitAt:0,lastInitResult:"idle",source:"unavailable",hasEventSource:!1,hasEventTypes:!1,eventBindings:[],retryScheduled:!1,retryDelayMs:0,lastError:""},this._messageReceivedThrottleUntil=0}setDebugMode(e){this.debugMode=e===!0}init(e={}){this.stop(),this._hostBindingStatus.lastInitAt=Date.now(),this._hostBindingStatus.initAttempts=(this._hostBindingStatus.initAttempts||0)+1;let r=Pr();this._currentChatId=uf(r);let s=(o,...n)=>{let i=Pr(),{messageId:a,swipeId:l}=this._extractIdentitiesFromArgs(n);if(Ne.debug(`\u6536\u5230\u5BBF\u4E3B\u4E8B\u4EF6 "${o}"`,{messageId:a,swipeId:l,argCount:n.length}),o===De.MESSAGE_RECEIVED){let m=Date.now();if(m<this._messageReceivedThrottleUntil){Ne.debug(`MESSAGE_RECEIVED \u5728\u8282\u6D41\u7A97\u53E3\u5185\uFF0C\u8DF3\u8FC7\uFF08\u5269\u4F59 ${this._messageReceivedThrottleUntil-m}ms\uFF09`);return}this._messageReceivedThrottleUntil=m+this._getSettleMs()+5e3}let d=null,c=a,u=l;if(c&&(d=tv(i,c)),!d){let m=pf(i);m?.messageId&&(d=m.message,c=m.messageId,u=m.swipeId||u)}if(!c||!d){Ne.debug(`\u4E8B\u4EF6 "${o}" \u65E0 assistant \u76EE\u6807\uFF0C\u8DF3\u8FC7`);return}if(!ff(d)){Ne.debug(`\u4E8B\u4EF6 "${o}" \u547D\u4E2D\u975E assistant \u6D88\u606F\uFF0C\u8DF3\u8FC7`,{messageId:c});return}let p=String(d.content||d.mes||"").trim();if(!p||p.length<5){Ne.debug(`\u4E8B\u4EF6 "${o}" \u6D88\u606F\u8FC7\u77ED\uFF08${p.length} \u5B57\u7B26\uFF09\uFF0C\u8DF3\u8FC7`);return}if(this._isProcessing){Ne.debug(`\u4E8B\u4EF6 "${o}" \u6B63\u5728\u5904\u7406\u4E2D\uFF0C\u8DF3\u8FC7`);return}if(this._isOwnWrite(c)){Ne.debug(`\u4E8B\u4EF6 "${o}" \u547D\u4E2D own-write \u9ED1\u540D\u5355\uFF0C\u8DF3\u8FC7`,{messageId:c});return}let y=ce(d?.swipeId??d?.swipe_id??d?.swipe??d?.swipeIndex);y&&(u=y);let f=`${c}::${u}`;if(this._isRecentlyProcessed(f)){Ne.debug(`\u4E8B\u4EF6 "${o}" slot \u5DF2\u8FD1\u671F\u5904\u7406\u8FC7\uFF0C\u8DF3\u8FC7`,{slotKey:f});return}this._scheduleMessageProcessing(c,u,{settleMs:this._getSettleMs(),sourceEvent:o}),Ne.info(`\u4E8B\u4EF6 "${o}" \u901A\u8FC7\u6240\u6709\u5B88\u536B\uFF0C\u5DF2\u8C03\u5EA6\u5904\u7406`,{targetMessageId:c,targetSwipeId:u,throttleUntil:this._messageReceivedThrottleUntil,isProcessing:this._isProcessing})};return this._stopCallbacks.push(kt.subscribe(De.MESSAGE_SENT,()=>{Ne.debug("MESSAGE_SENT \u2192 \u6E05\u7406\u8C03\u5EA6\u961F\u5217"),this._pendingTimers.forEach(o=>clearTimeout(o)),this._pendingTimers.clear()})),this._stopCallbacks.push(kt.subscribe(De.MESSAGE_RECEIVED,(...o)=>{s(De.MESSAGE_RECEIVED,...o)})),this._stopCallbacks.push(kt.subscribe(De.GENERATION_STOPPED,()=>{Ne.info("GENERATION_STOPPED \u2192 \u53D6\u6D88\u6240\u6709\u6D3B\u8DC3\u4E8B\u52A1"),this._cancelActiveTransactions("generation_stopped"),this._pendingTimers.forEach(o=>clearTimeout(o)),this._pendingTimers.clear(),this._isProcessing=!1})),this._stopCallbacks.push(kt.subscribe(De.CHAT_CHANGED,()=>{this._resetForChatChange()})),this._stopCallbacks.push(kt.subscribe(De.MESSAGE_DELETED,o=>{this._clearMessageState(ce(o))})),this._refreshHostBindingStatus(),this._seedKnownSlots(),Ne.info("\u81EA\u52A8\u5316\u670D\u52A1\u5DF2\u521D\u59CB\u5316",{chatId:this._currentChatId,source:this._hostBindingStatus.source}),!0}_seedKnownSlots(){try{let e=Pr(),r=pf(e);if(!r?.messageId)return;let s=`${ce(r.messageId)}::${ce(r.swipeId)}`;this._recentlyProcessedSlots.set(s,Number.MAX_SAFE_INTEGER),Ne.debug(`\u5DF2\u5C06\u5F53\u524D\u6700\u65B0 slot "${s}" \u9884\u6807\u8BB0\u4E3A\u5DF2\u77E5\uFF0C\u8DF3\u8FC7 MESSAGE_RECEIVED \u91CD\u653E`)}catch(e){Ne.warn("_seedKnownSlots \u5931\u8D25",{error:e})}}_refreshHostBindingStatus(){let e=kt.describe(),r=[De.MESSAGE_SENT,De.MESSAGE_RECEIVED,De.GENERATION_STOPPED,De.CHAT_CHANGED,De.MESSAGE_DELETED];this._hostBindingStatus={...this._hostBindingStatus,initialized:!!e.hasBridge,lastInitResult:e.hasBridge?"ready":e.retryScheduled?"pending_retry":"pending",source:e.source,hasEventSource:!!e.hasBridge,hasEventTypes:Array.isArray(e.availableEvents)&&e.availableEvents.length>0,eventBindings:r.map(s=>`subscribed: ${s}`),retryScheduled:!!e.retryScheduled,retryDelayMs:0,lastError:""}}stop(){this._stopCallbacks.forEach(e=>{try{e()}catch(r){Ne.warn("\u505C\u6B62\u56DE\u8C03\u5931\u8D25",{error:r})}}),this._stopCallbacks=[],this._pendingTimers.forEach(e=>clearTimeout(e)),this._pendingTimers.clear(),this._slotQueues.clear(),this._recentlyProcessedSlots.clear(),this._ownWriteMessageIds.clear(),this._cancelActiveTransactions("service_stopped"),this._activeTransactions.clear(),this._isProcessing=!1,this._hostBindingStatus={initialized:!1,initAttempts:0,lastInitAt:0,lastInitResult:"idle",source:"unavailable",hasEventSource:!1,hasEventTypes:!1,eventBindings:[],retryScheduled:!1,retryDelayMs:0,lastError:""}}isEnabled(){return!0}getRuntimeSnapshot(){return this._pruneRecentSlots(),this._pruneOwnWrites(),this._refreshHostBindingStatus(),{currentChatId:this._currentChatId,enabled:!0,isProcessing:this._isProcessing,pendingTimerCount:this._pendingTimers.size,queuedSlotCount:this._slotQueues.size,recentlyProcessedSlotCount:this._recentlyProcessedSlots.size,ownWriteMessageIdCount:this._ownWriteMessageIds.size,activeTransactionCount:this._activeTransactions.size,recentTransactions:this._transactionHistory.slice(-10).map(e=>e.toSnapshot()),hostBinding:{...this._hostBindingStatus,eventBindings:Array.isArray(this._hostBindingStatus?.eventBindings)?[...this._hostBindingStatus.eventBindings]:[]},settings:this._getAutomationSettings()}}async processCurrentAssistantMessage(e={}){let r=await Jr({messageId:"",swipeId:"",runSource:"AUTO"}),s=ce(r?.sourceMessageId||r?.messageId);return s?this.processAssistantMessage(s,{force:e.force===!0,swipeId:ce(r?.sourceSwipeId),sourceEvent:e.sourceEvent||"MANUAL_CURRENT_ASSISTANT"}):{success:!1,error:"\u672A\u627E\u5230\u5F53\u524D assistant \u697C\u5C42"}}async processAssistantMessage(e,{force:r=!1,swipeId:s="",sourceEvent:o="AUTO"}={}){let n=new xi({chatId:this._currentChatId,messageId:e,swipeId:s,sourceEvent:o});try{if(!e)return this._skipTransaction(n,"missing_message_id");n.transition(Rt.CONFIRMED);let i=await Jr({messageId:e,swipeId:s,runSource:"AUTO"}),a=i?.targetAssistantMessage||null;if(!a||!i?.sourceMessageId)return this._skipTransaction(n,"assistant_message_not_found");let l=String(a.content||a.mes||"").trim();if(!l||l.length<5)return this._skipTransaction(n,"assistant_message_too_short");n.transition(Rt.CONTEXT_BUILT);let d=`${ce(i.sourceMessageId)}::${ce(i.sourceSwipeId||s)}`;if(n.generationKey=d,!r&&this._isRecentlyProcessed(d))return this._skipTransaction(n,"duplicate_slot",{slotKey:d});let c=ko(),u=bt.filterAutoPostResponseTools(c),y=[...c.filter(b=>bt.shouldRunLocalTransform(b)&&b.output?.autoTrigger!==!1),...u],f=We(),m=f?.autoUpdateEnabled===!0&&ce(f?.autoUpdateTrigger||"assistantMessage")==="assistantMessage";return!y.length&&!m?this._skipTransaction(n,"no_auto_tools",{tools:y}):(n.slotKey=d,n.slotRevisionKey=i.slotRevisionKey||"",n.sourceMessageId=i.sourceMessageId||e,n.sourceSwipeId=i.sourceSwipeId||s||"",this._enqueueSlot(d,async()=>{if(!r&&this._isRecentlyProcessed(d))return this._skipTransaction(n,"duplicate_slot_after_queue",{slotKey:d});this._isProcessing=!0,this._markSlotProcessed(d),n.transition(Rt.REQUEST_STARTED);let b=new AbortController;this._registerActiveTransaction(n,{controller:b,slotKey:d,sourceMessageId:i.sourceMessageId||e,sourceSwipeId:i.sourceSwipeId||s||""});try{let{results:w,hasWriteback:S}=await this._executeAutoTools(y,i,b,n,{slotKey:d,messageId:e,swipeId:s}),{tableResult:v,hasWriteback:K}=await this._executeAutoTableUpdate(i,b,n,{shouldRunTableAuto:m,tableWorkbenchConfig:f,messageId:e,swipeId:s,sourceEvent:o}),P=S||K;n.transition(Rt.REQUEST_FINISHED,{toolResults:w,tableResult:v}),P&&(n.transition(Rt.WRITEBACK_STARTED),n.writebackState={messageId:i.sourceMessageId,swipeId:i.sourceSwipeId,hasOutput:!0},this._messageReceivedThrottleUntil=Date.now()+rv),this._markSlotProcessed(d);let _=w.every(O=>O?.success!==!1),T=!m||!!v?.success||v?.skipped===!0||v?.meta?.aborted===!0||v?.meta?.stale===!0,F=_&&T,U=w.some(O=>O?.meta?.aborted===!0||O?.meta?.stale===!0||O?.error==="\u8BF7\u6C42\u5DF2\u53D6\u6D88")||v?.meta?.aborted===!0||v?.meta?.stale===!0;F&&n.transition(Rt.WRITEBACK_COMMITTED);let A=F?Rt.REFRESH_CONFIRMED:Rt.FAILED;return n.transition(A,{verdict:U?"aborted":F?"success":"partial_failure"}),this._recordTransaction(n),this._updateAutoRuntimeForResults(y,i,n,w),{success:F,traceId:n.traceId,slotKey:d,sourceEvent:o,messageId:i.sourceMessageId||e,phase:n.phase,results:w,tableResult:v}}finally{this._unregisterActiveTransaction(n.traceId),this._isProcessing=!1}}))}catch(i){return n.transition(Rt.FAILED,{error:i?.message||String(i)}),this._recordTransaction(n),this._unregisterActiveTransaction(n.traceId),this._isProcessing=!1,Ne.error("processAssistantMessage \u5F02\u5E38",{error:i}),{success:!1,traceId:n.traceId,error:n.error,phase:n.phase}}}_extractIdentitiesFromArgs(e){let r="",s="";for(let o of e)if(o!=null){if(typeof o=="number"&&Number.isFinite(o)&&!r){r=ce(o);continue}if(typeof o=="string"){let n=ce(o);!r&&/^\d+$/.test(n)&&(r=n);continue}typeof o=="object"&&(r||(r=ce(o.messageId??o.message_id??o.id??o.mid??o.mesid??o.chat_index??o.message?.messageId??o.message?.message_id??o.message?.id??o.message?.mid??o.message?.mesid??o.message?.chat_index??o.data?.messageId??o.data?.message_id??o.data?.id??o.data?.mid??o.data?.mesid??o.data?.chat_index??o.target?.messageId??o.target?.message_id??o.target?.id??o.target?.mid??o.target?.mesid??o.target?.chat_index)),s||(s=ce(o.swipeId??o.swipe_id??o.swipe??o.swipeIndex??o.currentSwipe??o.message?.swipeId??o.message?.swipe_id??o.message?.swipe??o.data?.swipeId??o.data?.swipe_id??o.data?.swipe??o.target?.swipeId??o.target?.swipe_id??o.target?.swipe)))}return{messageId:r,swipeId:s}}_scheduleMessageProcessing(e,r="",s={}){let o=s.settleMs??this._getSettleMs(),n=`msg::${ce(e)}::${ce(r)}`,i=this._pendingTimers.get(n);i&&clearTimeout(i);let a=setTimeout(()=>{this._pendingTimers.delete(n),this.processAssistantMessage(e,{swipeId:r,sourceEvent:s.sourceEvent||"AUTO"}).catch(l=>{Ne.error("\u8C03\u5EA6\u6267\u884C\u5931\u8D25",{messageId:e,error:l})})},Math.max(0,o));this._pendingTimers.set(n,a),Ne.info("\u5DF2\u8C03\u5EA6\u6D88\u606F\u5904\u7406",{timerKey:n,settleMs:o,sourceEvent:s.sourceEvent})}cancelAutomation(e={}){let r=e.reason||"manual_cancel",s=ce(e.messageId),o=ce(e.slotKey),n=ce(e.traceId),i=0;for(let[a,l]of this._pendingTimers){let d=s&&a.includes(`::${s}::`),c=o&&a.includes(o);(d||c||!s&&!o&&!n)&&(clearTimeout(l),this._pendingTimers.delete(a),i+=1)}return i+=this._cancelActiveTransactions(r,{messageId:s,slotKey:o,traceId:n}),{success:i>0,cancelledCount:i,reason:r}}_isRecentlyProcessed(e){if(!e)return!1;this._pruneRecentSlots();let r=this._recentlyProcessedSlots.get(e);return r?Date.now()-r<this._getDedupeWindowMs():!1}_markSlotProcessed(e){e&&(this._recentlyProcessedSlots.set(e,Date.now()),this._pruneRecentSlots())}_pruneRecentSlots(){let e=Date.now()-this._getDedupeWindowMs();for(let[r,s]of this._recentlyProcessedSlots)(!Number.isFinite(s)||s<e)&&this._recentlyProcessedSlots.delete(r)}async _executeAutoTools(e,r,s,o,{slotKey:n,messageId:i,swipeId:a}){let l=[],d=!1,c=r.lastAiMessage,u=r.assistantBaseText;for(let p of e){let y={...r,signal:s.signal,isAutoRun:!0,abortMeta:{traceId:o.traceId,slotKey:n,sourceMessageId:r.sourceMessageId||i,sourceSwipeId:r.sourceSwipeId||a||""},shouldAbortWriteback:()=>this._shouldAbortAutoWriteback({traceId:o.traceId}),skipNotify:!0,lastAiMessage:c,assistantBaseText:u,input:{...r.input||{},lastAiMessage:c,assistantBaseText:u}},m=bt.shouldRunLocalTransform(p)?await oi(p,y):await bt.runToolPostResponse(p,y);if(l.push(m),m?.writebackState||m?.output){d=!0,this._markOwnWrite(r.sourceMessageId||i);let b=this._readCurrentMessageText(r.sourceMessageId||i);if(b){c=b,u=b;let w=Number(r.sourceMessageId||i);Array.isArray(r.chatMessages)&&r.chatMessages[w]&&(r.chatMessages[w].content=b,r.chatMessages[w].mes=b)}}}return{results:l,hasWriteback:d}}async _executeAutoTableUpdate(e,r,s,{shouldRunTableAuto:o,tableWorkbenchConfig:n,messageId:i,swipeId:a,sourceEvent:l}){if(!o)return{tableResult:null,hasWriteback:!1};let d=await By({messageId:e.sourceMessageId||i,swipeId:e.sourceSwipeId||a||"",sourceEvent:l,configInput:n,signal:r.signal,shouldAbortWriteback:()=>this._shouldAbortAutoWriteback({traceId:s.traceId})}),c=!!(d?.state||d?.mirrorResult?.success===!0);return c&&this._markOwnWrite(e.sourceMessageId||i),{tableResult:d,hasWriteback:c}}_readCurrentMessageText(e){let r=Pr(),s=Vl(r),o=Number(e);if(!Number.isFinite(o)||o<0||o>=s.length)return"";let n=s[o];return String(n?.mes||n?.content||"").trim()}_markOwnWrite(e){let r=ce(e);r&&(this._ownWriteMessageIds.set(r,Date.now()),this._pruneOwnWrites())}_isOwnWrite(e){let r=ce(e);if(!r)return!1;this._pruneOwnWrites();let s=this._ownWriteMessageIds.get(r);return s?Date.now()-s<yf:!1}_pruneOwnWrites(){let e=Date.now()-yf;for(let[r,s]of this._ownWriteMessageIds)(!Number.isFinite(s)||s<e)&&this._ownWriteMessageIds.delete(r)}_recordTransaction(e){this._transactionHistory.push(e),this._transactionHistory.length>this._maxHistorySize&&(this._transactionHistory=this._transactionHistory.slice(-this._maxHistorySize)),Ne.debug(`\u4E8B\u52A1 [${e.traceId}] \u2192 ${e.phase}`,{messageId:e.messageId,generationKey:e.generationKey,verdict:e.verdict,sourceEvent:e.sourceEvent,error:e.error})}_skipTransaction(e,r,s={}){return e.transition(Rt.SKIPPED,{verdict:r,...s}),this._recordTransaction(e),Array.isArray(s?.tools)&&s.tools.length>0&&this._updateAutoRuntimeForSkip(s.tools,e,r,s),{success:!1,skipped:!0,reason:r,traceId:e.traceId,...s}}_enqueueSlot(e,r){let o=(this._slotQueues.get(e)||Promise.resolve()).catch(()=>{}).then(r).finally(()=>{this._slotQueues.get(e)===o&&this._slotQueues.delete(e)});return this._slotQueues.set(e,o),o}_registerActiveTransaction(e,r={}){e?.traceId&&this._activeTransactions.set(e.traceId,{traceId:e.traceId,generationKey:r.generationKey||e.generationKey||"",slotKey:r.slotKey||e.slotKey||"",sourceMessageId:r.sourceMessageId||e.sourceMessageId||"",sourceSwipeId:r.sourceSwipeId||e.sourceSwipeId||"",slotRevisionKey:r.slotRevisionKey||e.slotRevisionKey||"",assistantBaseFingerprint:r.assistantBaseFingerprint||"",assistantBaseText:r.assistantBaseText||"",controller:r.controller||null,cancelled:!1,cancelReason:""})}_unregisterActiveTransaction(e){e&&this._activeTransactions.delete(e)}_cancelActiveTransactions(e="manual_cancel",r={}){let s=ce(r.messageId),o=ce(r.slotKey),n=ce(r.traceId),i=0;for(let[a,l]of this._activeTransactions){let d=n&&a===n,c=s&&ce(l?.sourceMessageId)===s,u=o&&ce(l?.slotKey)===o;if(!(!d&&!c&&!u&&!(!n&&!s&&!o))){l.cancelled=!0,l.cancelReason=e;try{l?.controller?.abort?.()}catch{}i+=1}}return i}_shouldAbortAutoWriteback(e={}){let r=ce(e.traceId);if(r){let s=this._activeTransactions.get(r);if(!s||s.cancelled)return{aborted:!0,reason:"cancelled_before_host_commit"}}return!1}_updateAutoRuntimeForSkip(e,r,s,o={}){e.forEach(n=>{n?.id&&Ir(n.id,{lastAutoRunAt:Date.now(),lastAutoStatus:"skipped",lastAutoMessageId:r?.sourceMessageId||r?.messageId||"",lastAutoSwipeId:r?.sourceSwipeId||r?.swipeId||"",lastAutoRevisionKey:r?.slotRevisionKey||o?.slotRevisionKey||"",lastAutoWritebackStatus:"",lastAutoRefreshConfirmed:!1,lastAutoSkipReason:s||""},{touchLastRunAt:!1,emitEvent:!1,emitRuntimeEvent:!0})})}_updateAutoRuntimeForResults(e,r,s,o=[]){e.forEach((n,i)=>{if(!n?.id)return;let a=o[i]||{},l=a?.meta?.writebackDetails||{},d=a?.meta?.aborted===!0||a?.meta?.stale===!0?"aborted":a?.success===!1?"failed":"success",c=a?.meta?.aborted===!0?a?.meta?.abortReason||(a?.meta?.stale===!0?"stale_base_changed":"cancelled_before_host_commit"):"";Ir(n.id,{lastAutoRunAt:Date.now(),lastAutoStatus:d,lastAutoMessageId:r?.sourceMessageId||s?.sourceMessageId||s?.messageId||"",lastAutoSwipeId:r?.sourceSwipeId||s?.sourceSwipeId||s?.swipeId||"",lastAutoRevisionKey:r?.slotRevisionKey||s?.slotRevisionKey||"",lastAutoWritebackStatus:a?.meta?.writebackStatus||"",lastAutoRefreshConfirmed:!!l.refreshConfirmed,lastAutoSkipReason:c},{touchLastRunAt:!1,emitEvent:!1,emitRuntimeEvent:!0})})}_resetForChatChange(){let e=Pr(),r=uf(e);Ne.info("\u804A\u5929\u5207\u6362",{from:this._currentChatId,to:r}),this._currentChatId=r,this._pendingTimers.forEach(s=>clearTimeout(s)),this._pendingTimers.clear(),this._slotQueues.clear(),this._recentlyProcessedSlots.clear(),this._ownWriteMessageIds.clear(),this._cancelActiveTransactions("chat_changed"),this._activeTransactions.clear(),this._isProcessing=!1,this._messageReceivedThrottleUntil=0,this._seedKnownSlots()}_clearMessageState(e){if(e){for(let[r,s]of this._pendingTimers)(r.includes(`::${e}::`)||r.startsWith(`msg::${e}::`))&&(clearTimeout(s),this._pendingTimers.delete(r));for(let r of this._recentlyProcessedSlots.keys())r.startsWith(`${e}::`)&&this._recentlyProcessedSlots.delete(r);this._ownWriteMessageIds.delete(ce(e)),this._seedKnownSlots()}}_getAutomationSettings(){let e=Ct.getSettings()?.automation||{},r=Number.isFinite(e.settleMs)?e.settleMs:sv;return{settleMs:r,dedupeWindowMs:Number.isFinite(e.dedupeWindowMs)?e.dedupeWindowMs:Math.max(5e3,r+600)}}_getSettleMs(){return this._getAutomationSettings().settleMs}_getDedupeWindowMs(){return this._getAutomationSettings().dedupeWindowMs}},gf=new wi,nv=gf});var bf={};oe(bf,{AuthorityProvider:()=>vi,default:()=>av});var ro,Jl,iv,Nr,vi,av,xf=L(()=>{q();Ti();ro=C.createScope("AuthorityProvider"),Jl="third-party/youyou-toolkit",iv="YouYou Toolkit",Nr="main",vi=class{constructor({extensionVersion:e="1.0.149"}={}){this.kind=so.AUTHORITY,this._client=null,this._extensionVersion=e,this._initialized=!1}async init(){let e=Si();if(!e)return ro.error("\u672A\u68C0\u6D4B\u5230 window.STAuthority.AuthoritySDK"),!1;try{return this._client=await e.init({extensionId:Jl,displayName:iv,version:this._extensionVersion,installType:"local",declaredPermissions:{sql:{private:!0}}}),this._initialized=!0,ro.info("AuthorityProvider \u521D\u59CB\u5316\u6210\u529F",{extensionId:Jl}),!0}catch(r){return ro.error("AuthorityProvider \u521D\u59CB\u5316\u5931\u8D25",{error:r?.message||r}),this._initialized=!1,!1}}async dispose(){this._client=null,this._initialized=!1}async migrate({migrations:e,database:r=Nr,tableName:s}={}){this._ensureReady();let o={database:r,migrations:e};s&&(o.tableName=s);let n=await this._client.sql.migrate(o);return{applied:n?.applied||[],skipped:n?.skipped||[],tableName:n?.tableName,latestId:n?.latestId}}async query({statement:e,params:r=[],database:s=Nr,page:o=void 0}={}){this._ensureReady();let n={database:s,statement:e,params:r};o&&(n.page=o);let i=await this._client.sql.query(n);return{columns:i.columns||[],rows:i.rows||[],rowCount:i.rowCount??(i.rows?.length||0),page:i.page}}async execute({statement:e,params:r=[],database:s=Nr}={}){this._ensureReady();let o=await this._client.sql.exec({database:s,statement:e,params:r});return{rowsAffected:o.rowsAffected??0,lastInsertRowid:o.lastInsertRowid??null}}async batch({statements:e,database:r=Nr}={}){this._ensureReady();let s=(e||[]).map(n=>({mode:n.mode||(/^\s*SELECT/i.test(n.statement)?"query":"exec"),statement:n.statement,params:n.params||[]}));return{results:(await this._client.sql.batch({database:r,statements:s}))?.results||[]}}async transaction({statements:e,database:r=Nr}={}){this._ensureReady();let s=(e||[]).map(n=>({mode:n.mode||(/^\s*SELECT/i.test(n.statement)?"query":"exec"),statement:n.statement,params:n.params||[]})),o=await this._client.sql.transaction({database:r,statements:s});return{committed:!!o?.committed,results:o?.results||[]}}async paginate({statement:e,params:r=[],database:s=Nr,page:o={}}={}){return this._ensureReady(),this.query({statement:e,params:r,database:s,page:o})}async pageAll({statement:e,params:r=[],database:s=Nr,pageSize:o=200,maxPages:n}={}){this._ensureReady();let i=await this._client.sql.pageAll({database:s,statement:e,params:r},{pageSize:o,maxPages:n});return{columns:i.columns||[],rows:i.rows||[],rowCount:i.rowCount??(i.rows?.length||0)}}async backup(){return ro.warn("backup() \u6682\u672A\u5B9E\u73B0\uFF0CAuthorityProvider \u8D70 Authority \u5185\u7F6E\u5907\u4EFD"),{kind:"authority",timestamp:Date.now()}}async export(){return ro.warn("export() \u6682\u672A\u5B9E\u73B0\uFF0CAuthorityProvider \u8D70 Authority \u5185\u7F6E\u5BFC\u51FA"),{kind:"authority",timestamp:Date.now()}}async import(){ro.warn("import() \u6682\u672A\u5B9E\u73B0\uFF0CAuthorityProvider \u8D70 Authority \u5185\u7F6E\u5BFC\u5165")}describe(){return{kind:this.kind,initialized:this._initialized,extensionId:Jl,database:Nr,hasClient:!!this._client}}_ensureReady(){if(!this._initialized||!this._client)throw new Error("AuthorityProvider \u5C1A\u672A\u521D\u59CB\u5316")}},av=vi});var vf={};oe(vf,{FallbackProvider:()=>_i,default:()=>gv});function lv(t){let e=[],r=0,s="";for(let o of t)o==="("?r+=1:o===")"&&(r-=1),o===","&&r===0?(s.trim()&&e.push(s),s=""):s+=o;return s.trim()&&e.push(s),e}function cv(t){let e=t.match(/^\s*CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?(\w+)\s*\(([\s\S]+)\)\s*$/i);if(!e)return null;let r=e[1],s=e[2],o=lv(s),n=[],i=[];for(let a of o){let l=a.trim(),d=l.match(/^PRIMARY\s+KEY\s*\(([^)]+)\)$/i);if(d){i=d[1].split(",").map(u=>u.trim());continue}let c=l.match(/^(\w+)\s+(\w+)/);c&&(n.push({name:c[1],type:c[2].toUpperCase(),raw:l}),/PRIMARY\s+KEY/i.test(l)&&!i.length&&(i=[c[1]]))}return{name:r,columns:n,pkCols:i}}function dv(t){let e=t.match(/^\s*INSERT\s+(?:OR\s+REPLACE\s+)?INTO\s+(\w+)(?:\s*\(([^)]+)\))?\s+VALUES\s*\(([^)]+)\)\s*$/i);if(!e)return null;let r=e[1],s=e[2]?e[2].split(",").map(n=>n.trim()):null,o=(e[3].match(/\?/g)||[]).length;return{name:r,cols:s,paramCount:o}}function Zl(t){let e=t.split(/\s+AND\s+/i),r=[];for(let s of e){let o=s.match(/^\s*(\w+)\s*(=|!=|<>|>=|<=|>|<)\s*\?\s*$/);if(o){let i=o[2]==="<>"?"!=":o[2];r.push({col:o[1],op:i,placeholder:!0});continue}let n=s.match(/^\s*(\w+)\s+IS\s+(NOT\s+)?NULL\s*$/i);if(n){r.push({col:n[1],op:n[2]?"IS NOT NULL":"IS NULL",placeholder:!1});continue}throw new Error(`FallbackProvider \u4E0D\u652F\u6301\u7684 WHERE \u5B50\u53E5: "${s}"`)}return r}function uv(t){let e=t.match(/^\s*SELECT\s+([\s\S]+?)\s+FROM\s+(\w+)([\s\S]*)$/i);if(!e)return null;let r=e[1].trim(),s=e[2],o=e[3],n=o.match(/\bWHERE\s+([\s\S]+?)(?=\bORDER\s+BY\b|\bLIMIT\b|\bOFFSET\b|$)/i),i=o.match(/\bORDER\s+BY\s+(\w+)\s*(ASC|DESC)?/i),a=o.match(/\bLIMIT\s+(\d+)/i),l=o.match(/\bOFFSET\s+(\d+)/i);return{name:s,cols:r==="*"?null:r.split(",").map(d=>d.trim()),where:n?Zl(n[1].trim()):null,orderBy:i?{col:i[1],dir:(i[2]||"ASC").toUpperCase()}:null,limit:a?parseInt(a[1],10):null,offset:l?parseInt(l[1],10):null}}function pv(t){let e=t.match(/^\s*UPDATE\s+(\w+)\s+SET\s+([\s\S]+?)(?:\s+WHERE\s+([\s\S]+))?\s*$/i);if(!e)return null;let r=e[1],s=e[2],o=e[3],n=s.split(",").map(i=>{let a=i.trim().match(/^(\w+)\s*=\s*\?$/);if(!a)throw new Error(`FallbackProvider \u4E0D\u652F\u6301\u7684 SET \u5B50\u53E5: "${i}"`);return a[1]});return{name:r,setCols:n,where:o?Zl(o.trim()):null}}function yv(t){let e=t.match(/^\s*DELETE\s+FROM\s+(\w+)(?:\s+WHERE\s+([\s\S]+))?\s*$/i);return e?{name:e[1],where:e[2]?Zl(e[2].trim()):null}:null}function Ql(t,e){return t===e?!0:t==null?e==null:e==null?!1:typeof t=="number"||typeof e=="number"?Number(t)===Number(e):String(t)===String(e)}function en(t,e){return t===e?0:t==null?-1:e==null?1:typeof t=="number"&&typeof e=="number"?t-e:String(t)<String(e)?-1:1}function fv(t,e,r){let s=t[e.col];if(e.op==="IS NULL")return s==null;if(e.op==="IS NOT NULL")return s!=null;let o=r.shift();switch(e.op){case"=":return Ql(s,o);case"!=":return!Ql(s,o);case">":return en(s,o)>0;case"<":return en(s,o)<0;case">=":return en(s,o)>=0;case"<=":return en(s,o)<=0;default:return!1}}function Xl(t,e,r){if(!e||!e.length)return!0;let s=Array.isArray(r)?[...r]:[];for(let o of e)if(!fv(t,o,s))return!1;return!0}var oo,wf,_i,gv,Sf=L(()=>{q();Le();Ti();oo=C.createScope("FallbackProvider"),wf="provider_fallback_v1";_i=class{constructor(){this.kind=so.FALLBACK,this._tables=new Map,this._migrations=new Set,this._initialized=!1,this._dirty=!1,this._saveTimer=null}async init(){try{let e=ge.get(wf)||{};this._migrations=new Set(Array.isArray(e.migrations)?e.migrations:[]),this._tables=new Map;for(let[r,s]of Object.entries(e.tables||{}))this._tables.set(r,{schema:s.schema||{name:r,columns:[],pkCols:[]},rows:Array.isArray(s.rows)?s.rows:[]});return this._initialized=!0,oo.info("FallbackProvider \u521D\u59CB\u5316\u5B8C\u6210",{tables:this._tables.size,migrations:this._migrations.size}),!0}catch(e){return oo.error("FallbackProvider \u521D\u59CB\u5316\u5931\u8D25",{error:e?.message||e}),this._initialized=!1,!1}}async dispose(){this._flushSave(!0),this._tables.clear(),this._migrations.clear(),this._initialized=!1}async migrate({migrations:e}={}){this._ensureReady();let r=[],s=[];for(let o of e||[]){if(!o?.id||!o?.statement)continue;if(this._migrations.has(o.id)){s.push(o.id);continue}let n=o.statement.trim();if(/^CREATE\s+TABLE/i.test(n)){let i=cv(n);if(!i)throw new Error(`\u65E0\u6CD5\u89E3\u6790 CREATE TABLE: ${n}`);this._tables.has(i.name)||this._tables.set(i.name,{schema:i,rows:[]})}else if(!/^CREATE\s+(UNIQUE\s+)?INDEX/i.test(n))if(/^DROP\s+TABLE/i.test(n)){let i=n.match(/^DROP\s+TABLE\s+(?:IF\s+EXISTS\s+)?(\w+)/i);i&&this._tables.delete(i[1])}else/^ALTER\s+TABLE/i.test(n)?oo.warn("FallbackProvider \u4E0D\u652F\u6301 ALTER TABLE\uFF0C\u8DF3\u8FC7",{id:o.id}):oo.warn("FallbackProvider \u8DF3\u8FC7\u672A\u8BC6\u522B DDL",{id:o.id,statement:n});this._migrations.add(o.id),r.push(o.id)}return this._markDirty(),{applied:r,skipped:s}}async query({statement:e,params:r=[]}={}){this._ensureReady();let s=uv(e);if(!s)throw new Error(`\u65E0\u6CD5\u89E3\u6790 SELECT: ${e}`);let o=this._tables.get(s.name);if(!o)return{columns:s.cols||[],rows:[],rowCount:0};let n=o.rows.filter(l=>Xl(l,s.where,r));if(s.orderBy){let l=s.orderBy.dir==="DESC"?-1:1;n=[...n].sort((d,c)=>en(d[s.orderBy.col],c[s.orderBy.col])*l)}s.offset&&(n=n.slice(s.offset)),Number.isFinite(s.limit)&&(n=n.slice(0,s.limit));let i,a=n;return s.cols?(a=n.map(l=>{let d={};for(let c of s.cols)d[c]=l[c]===void 0?null:l[c];return d}),i=s.cols):i=o.schema?.columns?.map(l=>l.name)||(a[0]?Object.keys(a[0]):[]),{columns:i,rows:a,rowCount:a.length}}async execute({statement:e,params:r=[]}={}){this._ensureReady();let s=String(e||"").trim(),o=s.split(/\s+/)[0].toUpperCase(),n;if(o==="INSERT")n=this._doInsert(s,r);else if(o==="UPDATE")n=this._doUpdate(s,r);else if(o==="DELETE")n=this._doDelete(s,r);else throw new Error(`FallbackProvider \u4E0D\u652F\u6301\u7684 execute \u8BED\u53E5: ${e}`);return n}_doInsert(e,r){let s=dv(e);if(!s)throw new Error(`\u65E0\u6CD5\u89E3\u6790 INSERT: ${e}`);let o=this._tables.get(s.name);if(!o)throw new Error(`\u8868\u4E0D\u5B58\u5728: ${s.name}`);let n=s.cols||(o.schema.columns||[]).map(d=>d.name);if(!n.length)throw new Error(`\u8868 ${s.name} \u65E0\u5217\u5B9A\u4E49`);if(r.length!==n.length)throw new Error(`INSERT \u53C2\u6570\u6570\u91CF\u4E0D\u5339\u914D (\u671F\u671B ${n.length}, \u5B9E\u9645 ${r.length})`);let i={};for(let d=0;d<n.length;d+=1)i[n[d]]=r[d];let a=o.schema?.pkCols||[],l=/^INSERT\s+OR\s+REPLACE/i.test(e);if(a.length){let d=o.rows.findIndex(c=>a.every(u=>Ql(c[u],i[u])));if(d>=0){if(l)return o.rows[d]=i,this._markDirty(),{rowsAffected:1,lastInsertRowid:d+1};throw new Error(`PRIMARY KEY \u51B2\u7A81 (${a.join(",")})`)}}return o.rows.push(i),this._markDirty(),{rowsAffected:1,lastInsertRowid:o.rows.length}}_doUpdate(e,r){let s=pv(e);if(!s)throw new Error(`\u65E0\u6CD5\u89E3\u6790 UPDATE: ${e}`);let o=this._tables.get(s.name);if(!o)return{rowsAffected:0,lastInsertRowid:null};let n=s.setCols.length;if(r.length<n)throw new Error(`UPDATE \u53C2\u6570\u4E0D\u8DB3 (SET \u9700\u8981 ${n}, \u5B9E\u9645 ${r.length})`);let i=r.slice(0,n),a=r.slice(n),l=0;for(let d of o.rows)if(Xl(d,s.where,a)){for(let c=0;c<n;c+=1)d[s.setCols[c]]=i[c];l+=1}return l>0&&this._markDirty(),{rowsAffected:l,lastInsertRowid:null}}_doDelete(e,r){let s=yv(e);if(!s)throw new Error(`\u65E0\u6CD5\u89E3\u6790 DELETE: ${e}`);let o=this._tables.get(s.name);if(!o)return{rowsAffected:0,lastInsertRowid:null};let n=o.rows.length;o.rows=o.rows.filter(a=>!Xl(a,s.where,r));let i=n-o.rows.length;return i>0&&this._markDirty(),{rowsAffected:i,lastInsertRowid:null}}async batch({statements:e}={}){this._ensureReady();let r=[];for(let s of e||[])if(String(s.statement||"").trim().split(/\s+/)[0].toUpperCase()==="SELECT"){let n=await this.query(s);r.push({kind:"query",...n})}else{let n=await this.execute(s);r.push({kind:"exec",...n})}return{results:r}}async transaction({statements:e}={}){this._ensureReady();let r=this._snapshot();try{let{results:s}=await this.batch({statements:e});return this._flushSave(!0),{committed:!0,results:s}}catch(s){throw this._restore(r),oo.warn("FallbackProvider \u4E8B\u52A1\u56DE\u6EDA",{error:s?.message||s}),s}}async paginate({statement:e,params:r=[],page:s={}}={}){this._ensureReady();let o=Number.isFinite(s?.limit)?s.limit:50,n=Number.isFinite(s?.offset)?s.offset:0,i=`${e} LIMIT ${o} OFFSET ${n}`;return this.query({statement:i,params:r})}async backup(){return this._ensureReady(),this._snapshot()}async export(){return this.backup()}async import(e){this._ensureReady(),this._restore(e||{}),this._markDirty(),this._flushSave(!0)}describe(){return{kind:this.kind,initialized:this._initialized,tables:this._tables.size,migrations:this._migrations.size,tableNames:[...this._tables.keys()]}}_snapshot(){let e={};for(let[r,s]of this._tables)e[r]={schema:s.schema,rows:JSON.parse(JSON.stringify(s.rows))};return{migrations:[...this._migrations],tables:e}}_restore(e){this._migrations=new Set(Array.isArray(e?.migrations)?e.migrations:[]),this._tables=new Map;for(let[r,s]of Object.entries(e?.tables||{}))this._tables.set(r,{schema:s.schema||{name:r,columns:[],pkCols:[]},rows:Array.isArray(s.rows)?s.rows:[]})}_markDirty(){this._dirty=!0,this._saveTimer&&clearTimeout(this._saveTimer),this._saveTimer=setTimeout(()=>this._flushSave(!1),300)}_flushSave(e){if(this._saveTimer&&(clearTimeout(this._saveTimer),this._saveTimer=null),!(!this._dirty&&!e))try{ge.set(wf,this._snapshot()),this._dirty=!1}catch(r){oo.error("FallbackProvider \u6301\u4E45\u5316\u5931\u8D25",{error:r?.message||r})}}_ensureReady(){if(!this._initialized)throw new Error("FallbackProvider \u5C1A\u672A\u521D\u59CB\u5316")}},gv=_i});var Tf={};oe(Tf,{PROVIDER_KIND:()=>so,createProvider:()=>bv,detectAuthoritySdk:()=>Si,disposeToolDataProvider:()=>xv,getCurrentProvider:()=>hv,getToolDataProvider:()=>mv});function Si(){if(typeof window>"u")return null;try{let t=window.STAuthority?.AuthoritySDK;if(t)return t}catch{}try{if(window.parent&&window.parent!==window){let t=window.parent.STAuthority?.AuthoritySDK;if(t)return t}}catch{}return null}async function tc({preferAuthority:t=!0,extensionVersion:e="1.0.149"}={}){if(t&&Si()){let{AuthorityProvider:s}=await Promise.resolve().then(()=>(xf(),bf));return new s({extensionVersion:e})}let{FallbackProvider:r}=await Promise.resolve().then(()=>(Sf(),vf));return new r}async function mv(t={}){return xs||tn||(tn=(async()=>{let e=await tc({preferAuthority:!0,...t}),r=await e.init();if(!r&&e.kind===so.AUTHORITY){ec.warn("AuthorityProvider \u521D\u59CB\u5316\u5931\u8D25\uFF0C\u964D\u7EA7\u5230 FallbackProvider");try{await e.dispose()}catch{}e=await tc({preferAuthority:!1}),r=await e.init()}return r?ec.info(`Provider \u521D\u59CB\u5316\u5B8C\u6210: kind=${e.kind}`):ec.error(`Provider \u5168\u90E8\u521D\u59CB\u5316\u5931\u8D25 (kind=${e.kind})`),xs=e,e})(),tn)}function hv(){return xs}async function bv(t={}){let e=await tc(t);return await e.init(),e}async function xv(){if(xs){try{await xs.dispose()}catch{}xs=null}tn=null}var ec,so,xs,tn,Ti=L(()=>{q();ec=C.createScope("ToolDataProvider"),so=Object.freeze({AUTHORITY:"authority",FALLBACK:"fallback"}),xs=null,tn=null});var Cf={};oe(Cf,{BUILTIN_REGEX_PRESETS:()=>Ai,BUILTIN_WORLDBOOK_PRESETS:()=>rc,MIGRATION_BACKUP_KEY:()=>Ef,MIGRATION_DONE_KEY:()=>Ei,default:()=>Tv,ensurePresetSystem:()=>Af,registerBuiltinPresets:()=>sc,runMigrationOnce:()=>oc});function wv(t){if(!Array.isArray(t)||t.length===0)return null;let e=t.map(r=>String(r||"").trim()).filter(Boolean).sort().join("|");if(!e)return null;for(let r of Ai)if(r.rules.filter(o=>o.type==="include"&&o.enabled!==!1).map(o=>o.value).sort().join("|")===e)return r.id;return null}function sc(){try{typeof Ma=="function"&&Ma(Ai),typeof oa=="function"&&oa(rc),Dr.info("\u5185\u7F6E\u9884\u8BBE\u5DF2\u6CE8\u518C",{regex:Ai.length,worldbook:rc.length})}catch(t){Dr.error("\u6CE8\u518C\u5185\u7F6E\u9884\u8BBE\u5931\u8D25",{error:t})}}function vv(t){let e=new Set,r=[];for(let s of Array.isArray(t)?t:[]){let o=String(s||"").trim();if(!(!o||e.has(o)))if(e.add(o),o.startsWith("regex:")){let n=o.slice(6).trim();n&&r.push({type:"regex_include",value:n,enabled:!0,name:"",description:""})}else r.push({type:"include",value:o,enabled:!0,name:"",description:""})}return r}function Sv(t,e,r){let s=JSON.parse(JSON.stringify(r||{})),o=!1,n=s.extraction||{};if(!n.regexPresetId){let a=Array.isArray(n.selectors)?n.selectors:[];if(a.length>0){let l=wv(a);if(l)n.regexPresetId=l,o=!0,Dr.info(`\u5DE5\u5177 ${t} \u7ED1\u5B9A\u5185\u7F6E\u6B63\u5219\u9884\u8BBE: ${l}`);else{let d=On({name:`${e||t}_\u8FC1\u79FB_\u6B63\u5219`,description:`\u81EA\u8001\u7248\u672C selectors \u81EA\u52A8\u8FC1\u79FB\uFF08${a.length} \u9879\uFF09`,rules:vv(a),blacklist:[]});d?.id&&(n.regexPresetId=d.id,o=!0,Dr.info(`\u5DE5\u5177 ${t} \u521B\u5EFA\u8FC1\u79FB\u6B63\u5219\u9884\u8BBE: ${d.id}`))}s.extraction=n}}let i=s.worldbooks||{};if(!i.presetId&&i.enabled===!0&&Array.isArray(i.selected)&&i.selected.length>0){let a=vn({name:`${e||t}_\u8FC1\u79FB_\u4E16\u754C\u4E66`,description:`\u81EA\u8001\u7248\u672C worldbooks.selected \u81EA\u52A8\u8FC1\u79FB\uFF08${i.selected.length} \u672C\uFF09`,bindingMode:"custom",includeDisabled:!1,bookList:i.selected.map(l=>({bookName:String(l||""),enabled:!0,entryOverrides:{}})).filter(l=>l.bookName)});a?.id&&(i.presetId=a.id,o=!0,Dr.info(`\u5DE5\u5177 ${t} \u521B\u5EFA\u8FC1\u79FB\u4E16\u754C\u4E66\u9884\u8BBE: ${a.id}`)),s.worldbooks=i}return o?s:null}function oc(){try{if(we.get(Ei)===!0)return{skipped:!0,reason:"already_done"};let t=M.get(_f)||{};if(!t||typeof t!="object")return Dr.info("\u65E0\u5DE5\u5177\u914D\u7F6E\u9700\u8981\u8FC1\u79FB"),we.set(Ei,!0),{skipped:!0,reason:"no_configs"};we.set(Ef,{ts:Date.now(),version:"v45",snapshot:t});let e=0,r={...t};for(let[s,o]of Object.entries(t)){if(!o||typeof o!="object")continue;let n=Sv(s,o.name,o);n&&(r[s]=n,e+=1)}return e>0&&M.set(_f,r),we.set(Ei,!0),Dr.info("\u8FC1\u79FB\u5B8C\u6210",{migratedCount:e,total:Object.keys(t).length}),{skipped:!1,migratedCount:e,total:Object.keys(t).length}}catch(t){return Dr.error("\u8FC1\u79FB\u5931\u8D25\uFF0C\u5DF2 abort\uFF0C\u8001\u5B57\u6BB5\u4FDD\u7559",{error:t}),{skipped:!1,error:t?.message||String(t),aborted:!0}}}function Af(){return sc(),oc()}var Dr,Ei,Ef,_f,Ai,rc,Tv,kf=L(()=>{Le();q();ss();As();Dr=C.createScope("PresetBootstrap"),Ei="migration_v45_done",Ef="migration_v45_backup",_f="tool_configs",Ai=[{id:"builtin_regex_summary",name:"\u5185\u7F6E \xB7 \u603B\u7ED3\u63D0\u53D6",description:"\u63D0\u53D6 <boo_FM> \u6807\u7B7E\u5185\u5BB9\uFF08\u5BF9\u5E94\u5185\u7F6E\u300C\u8BB0\u5FC6\u538B\u7F29\u300D\u5DE5\u5177\uFF09",rules:[{id:"r_builtin_summary_1",type:"include",value:"boo_FM",enabled:!0,name:"\u603B\u7ED3\u6807\u7B7E",description:""}],blacklist:[]},{id:"builtin_regex_status_block",name:"\u5185\u7F6E \xB7 \u72B6\u6001\u680F\u63D0\u53D6",description:"\u63D0\u53D6 <status_block> \u6807\u7B7E\u5185\u5BB9\uFF08\u5BF9\u5E94\u5185\u7F6E\u300C\u72B6\u6001\u680F\u300D\u5DE5\u5177\uFF09",rules:[{id:"r_builtin_status_1",type:"include",value:"status_block",enabled:!0,name:"\u72B6\u6001\u6807\u7B7E",description:""}],blacklist:[]},{id:"builtin_regex_youyou",name:"\u5185\u7F6E \xB7 \u4F18\u4F18\u9510\u8BC4\u63D0\u53D6",description:"\u63D0\u53D6 <youyou> \u6807\u7B7E\u5185\u5BB9\uFF08\u5BF9\u5E94\u5185\u7F6E\u300C\u4F18\u4F18\u9510\u8BC4\u300D\u5DE5\u5177\uFF09",rules:[{id:"r_builtin_youyou_1",type:"include",value:"youyou",enabled:!0,name:"\u4F18\u4F18\u6807\u7B7E",description:""}],blacklist:[]}],rc=[];Tv={registerBuiltinPresets:sc,runMigrationOnce:oc,ensurePresetSystem:Af}});var ic={};oe(ic,{confirmDeleteTool:()=>Iv,confirmResetTools:()=>Pv,getAllTools:()=>Ht,getTool:()=>Gt,showExportToolsDialog:()=>Mv,showImportToolsDialog:()=>Rv,showToolEditDialog:()=>kv});async function kv(t=null){let e=t?Gt(t):null,r=!!e,s=Ge({value:e?.name||"",placeholder:"\u5DE5\u5177\u540D\u79F0"}),o=Ue({value:e?.category||"utility",options:Cv}),n=Ge({value:e?.description||"",placeholder:"\u5DE5\u5177\u63CF\u8FF0"}),i=g("input",{className:"yyt-input",attrs:{type:"number",min:"1000"},style:{padding:"7px 10px",fontSize:"12px"}});i.value=String(e?.config?.execution?.timeout||6e4);let a=g("input",{className:"yyt-input",attrs:{type:"number",min:"0",max:"10"},style:{padding:"7px 10px",fontSize:"12px"}});a.value=String(e?.config?.execution?.retries??3);function l(y,f,m=""){let b=g("div",{className:"yyt-form-group",style:{margin:"0 0 12px 0"}});return b.appendChild(g("label",{text:y,style:{fontSize:"12px",fontWeight:"600",color:"var(--yyt-text-secondary, rgba(255,255,255,0.55))",display:"block",marginBottom:"4px"}})),b.appendChild(f),m&&b.appendChild(g("div",{text:m,style:{fontSize:"11px",color:"var(--yyt-text-muted)",marginTop:"4px"}})),b}let d=g("div",{style:{display:"flex",flexDirection:"column"}}),c=g("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px"}});c.appendChild(l("\u5DE5\u5177\u540D\u79F0",s.el)),c.appendChild(l("\u5206\u7C7B",o.el)),d.appendChild(c),d.appendChild(l("\u63CF\u8FF0",n.el));let u=g("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px"}});u.appendChild(l("\u8D85\u65F6\u65F6\u95F4 (ms)",i)),u.appendChild(l("\u91CD\u8BD5\u6B21\u6570",a)),d.appendChild(u);let p=Ee.custom({title:r?`\u7F16\u8F91\u5DE5\u5177\u300C${e.name}\u300D`:"\u65B0\u5EFA\u5DE5\u5177",width:"480px",body:d,buttons:[{label:"\u53D6\u6D88",variant:"ghost",onClick:y=>y(null)},{label:r?"\u4FDD\u5B58":"\u521B\u5EFA",variant:"primary",onClick:y=>{let f=String(s.get()||"").trim();if(!f){s.el.focus();return}let m=t||`tool_${Date.now()}`;if(!Ps(m,{name:f,category:o.get(),description:String(n.get()||"").trim(),promptTemplate:e?.promptTemplate||"",extractTags:Array.isArray(e?.extractTags)?e.extractTags:[],config:{execution:{timeout:Math.max(1e3,parseInt(i.value,10)||6e4),retries:Math.max(0,parseInt(a.value,10)||3)},api:e?.config?.api||{preset:"",useBypass:!1,bypassPreset:""},messages:Array.isArray(e?.config?.messages)?e.config.messages:[],context:{depth:e?.config?.context?.depth||3,includeTags:Array.isArray(e?.config?.context?.includeTags)?e.config.context.includeTags:[],excludeTags:Array.isArray(e?.config?.context?.excludeTags)?e.config.context.excludeTags:[]},worldbooks:{enabled:e?.config?.worldbooks?.enabled===!0,selected:Array.isArray(e?.config?.worldbooks?.selected)?e.config.worldbooks.selected:[]}},enabled:e?.enabled!==!1})){nc.warn("saveTool \u5931\u8D25",{id:m});return}try{Bs(m)}catch(w){nc.warn("ensureToolRuntimeConfig \u5F02\u5E38",{err:w})}y(m)}}]});return setTimeout(()=>s.el.focus(),0),p.result}async function Iv(t){let e=Gt(t);return!e||!await Ee.confirm({title:"\u5220\u9664\u5DE5\u5177",message:`\u786E\u5B9A\u5220\u9664\u5DE5\u5177\u300C${e.name}\u300D\uFF1F\u6B64\u64CD\u4F5C\u4E0D\u53EF\u64A4\u9500\u3002`,confirmText:"\u5220\u9664",danger:!0})?!1:$s(t)}function Mv(){let t;try{t=Os()}catch(r){Ee.confirm({title:"\u5BFC\u51FA\u5931\u8D25",message:String(r?.message||r),confirmText:"\u786E\u5B9A"});return}let e=g("textarea",{className:"yyt-textarea",style:{width:"100%",minHeight:"220px",fontSize:"12px",fontFamily:"monospace"}});e.value=t,e.readOnly=!0,Ee.custom({title:"\u5BFC\u51FA\u5DE5\u5177 JSON",width:"600px",body:e,buttons:[{label:"\u5173\u95ED",variant:"ghost",onClick:r=>r(null)},{label:"\u590D\u5236\u5230\u526A\u8D34\u677F",variant:"ghost",onClick:async()=>{try{await navigator.clipboard.writeText(t)}catch{e.select();try{document.execCommand("copy")}catch{}}}},{label:"\u4E0B\u8F7D JSON",variant:"primary",onClick:()=>{try{let r=new Blob([t],{type:"application/json"}),s=URL.createObjectURL(r),o=g("a",{attrs:{href:s,download:`youyou_tools_${Date.now()}.json`}});document.body.appendChild(o),o.click(),setTimeout(()=>{try{document.body.removeChild(o)}catch{}try{URL.revokeObjectURL(s)}catch{}},100)}catch(r){nc.warn("\u4E0B\u8F7D\u5931\u8D25",{err:r})}}}]})}async function Rv(){let t=g("textarea",{className:"yyt-textarea",attrs:{placeholder:"\u7C98\u8D34 YouYou Toolkit \u5DE5\u5177 JSON"},style:{width:"100%",minHeight:"200px",fontSize:"12px",fontFamily:"monospace"}}),e=g("label",{style:{display:"flex",alignItems:"center",gap:"6px",fontSize:"12px",color:"var(--yyt-text-secondary)",marginTop:"8px"}}),r=g("input",{attrs:{type:"checkbox"}});e.appendChild(r),e.appendChild(g("span",{text:"\u8986\u76D6\u6A21\u5F0F\uFF08\u6E05\u7A7A\u5DF2\u6709\u5DE5\u5177\u540E\u518D\u5BFC\u5165\uFF1B\u4E0D\u52FE\u9009\u5219\u5408\u5E76\uFF09"}));let s=g("div");s.appendChild(t),s.appendChild(e),s.appendChild(g("div",{style:{display:"flex",gap:"6px",marginTop:"8px"}},de({label:"\u{1F4C1} \u4ECE\u6587\u4EF6\u2026",size:"small",variant:"ghost",onClick:()=>{let n=g("input",{attrs:{type:"file",accept:"application/json,.json"}});n.addEventListener("change",()=>{let i=n.files?.[0];if(!i)return;let a=new FileReader;a.onload=()=>{t.value=String(a.result||""),t.focus()},a.readAsText(i)}),n.click()}}).el));let o=Ee.custom({title:"\u5BFC\u5165\u5DE5\u5177 JSON",width:"520px",body:s,buttons:[{label:"\u53D6\u6D88",variant:"ghost",onClick:n=>n(null)},{label:"\u5BFC\u5165",variant:"primary",onClick:async n=>{let i=t.value.trim();if(!i){n(null);return}try{let a=Ls(i,{overwrite:r.checked});n(a)}catch(a){await Ee.confirm({title:"\u5BFC\u5165\u5931\u8D25",message:String(a?.message||a),confirmText:"\u786E\u5B9A"})}}}]});return setTimeout(()=>t.focus(),0),o.result}async function Pv(){return await Ee.confirm({title:"\u91CD\u7F6E\u6240\u6709\u5DE5\u5177",message:"\u6B64\u64CD\u4F5C\u4F1A\u5220\u9664\u6240\u6709\u81EA\u5B9A\u4E49\u5DE5\u5177\u4E0E\u9884\u8BBE\uFF0C\u4E0D\u53EF\u64A4\u9500\u3002\u5185\u7F6E\u5DE5\u5177\u4E0D\u53D7\u5F71\u54CD\u3002",confirmText:"\u91CD\u7F6E",danger:!0})?(Ns(),!0):!1}var nc,Cv,ac=L(()=>{bn();tr();Eo();qt();q();nc=C.createScope("ToolActions"),Cv=[{value:"api",label:"API"},{value:"prompt",label:"Prompt"},{value:"utility",label:"Utility"}]});q();function If(t,e={}){let{constants:r,topLevelWindow:s,modules:o}=t,{SCRIPT_ID:n,SCRIPT_VERSION:i,MENU_ITEM_ID:a,MENU_CONTAINER_ID:l}=r,d=null,c=!1,u=C.createScope("Bootstrap");function p(...P){u.log(P.join(" "))}function y(...P){u.error(P.join(" "))}async function f(){return d||(d=(async()=>{try{o.storageModule=await Promise.resolve().then(()=>(Le(),uc)),o.apiConnectionModule=await Promise.resolve().then(()=>(cn(),mc)),o.presetManagerModule=await Promise.resolve().then(()=>(fo(),wc)),o.uiModule=await Promise.resolve().then(()=>(df(),cf)),o.regexExtractorModule=await Promise.resolve().then(()=>(Rs(),ba)),o.toolManagerModule=await Promise.resolve().then(()=>(Eo(),Fd)),o.toolExecutorModule=await Promise.resolve().then(()=>(ll(),al)),o.windowManagerModule=await Promise.resolve().then(()=>(Rl(),jy)),o.toolRegistryModule=await Promise.resolve().then(()=>(qt(),Aa)),o.settingsServiceModule=await Promise.resolve().then(()=>(Uo(),np)),o.bypassManagerModule=await Promise.resolve().then(()=>(qs(),op)),o.variableResolverModule=await Promise.resolve().then(()=>(ei(),up)),o.contextInjectorModule=await Promise.resolve().then(()=>(ps(),cp)),o.toolPromptServiceModule=await Promise.resolve().then(()=>(ri(),yp)),o.toolOutputServiceModule=await Promise.resolve().then(()=>(jo(),gp)),o.toolAutomationServiceModule=await Promise.resolve().then(()=>(hf(),mf)),o.toolDataProviderModule=await Promise.resolve().then(()=>(Ti(),Tf)),o.presetBootstrapModule=await Promise.resolve().then(()=>(kf(),Cf));try{o.toolDataProviderModule.getToolDataProvider({extensionVersion:i}).then(P=>{u.log(`Provider \u5C31\u7EEA: ${P.kind}`)}).catch(P=>{u.error(`Provider \u521D\u59CB\u5316\u5F02\u5E38: ${P?.message||P}`)})}catch(P){u.error(`Provider \u542F\u52A8\u5F02\u5E38: ${P?.message||P}`)}return o.toolOutputServiceModule?.toolOutputService&&o.apiConnectionModule&&o.toolOutputServiceModule.toolOutputService.setApiConnection(o.apiConnectionModule),!0}catch(P){return d=null,y("\u6A21\u5757\u52A0\u8F7D\u5931\u8D25\uFF0C\u4F7F\u7528\u5185\u7F6E\u529F\u80FD:",P),y("\u5DF2\u52A0\u8F7D\u6A21\u5757:",Object.keys(o).filter(_=>o[_])),!1}})(),d)}function m(){return`
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
    `}async function b(){let P=`${n}-styles`,_=s.document||document;if(_.getElementById(P))return;let T="",F=[];try{F.push(new URL("../styles/main.css",import.meta.url).href)}catch{}try{F.push(new URL("../../styles/main.css",import.meta.url).href)}catch{}F.push("./styles/main.css");for(let A of[...new Set(F.filter(Boolean))])try{let O=await fetch(A);if(O.ok){T=await O.text();break}}catch{}T||(p("\u65E0\u6CD5\u52A0\u8F7D\u5916\u90E8\u6837\u5F0F\u6587\u4EF6\uFF0C\u4F7F\u7528\u5185\u7F6E\u6837\u5F0F"),T=m());let U=_.createElement("style");U.id=P,U.textContent=T,(_.head||_.documentElement).appendChild(U),p("\u6837\u5F0F\u5DF2\u6CE8\u5165")}function w(){let P=s.document||document;if(o.uiModule?.getAllStyles){let _=`${n}-ui-styles`;if(!P.getElementById(_)){let T=P.createElement("style");T.id=_,T.textContent=o.uiModule.getAllStyles(),(P.head||P.documentElement).appendChild(T)}}}async function S(){try{let{applyUiPreferences:P}=await Promise.resolve().then(()=>(gl(),fl));if(o.settingsServiceModule?.settingsService){let _=o.settingsServiceModule.settingsService.getUiSettings();if(_&&_.theme){let T=s.document||document;P(_,T),p(`\u4E3B\u9898\u5DF2\u5E94\u7528: ${_.theme}`)}}}catch(P){p("\u4E3B\u9898\u52A0\u8F7D\u5931\u8D25:",P)}}function v(){let P=s.jQuery||window.jQuery;if(!P){y("jQuery \u672A\u627E\u5230\uFF0C\u5EF6\u8FDF\u91CD\u8BD5..."),setTimeout(v,1e3);return}let _=s.document||document,T=P("#extensionsMenu",_);if(!T.length){p("\u9B54\u68D2\u83DC\u5355\u672A\u627E\u5230\uFF0C\u5EF6\u8FDF\u91CD\u8BD5..."),setTimeout(v,2e3);return}if(P(`#${l}`,T).length>0){p("\u83DC\u5355\u9879\u5DF2\u5B58\u5728");return}let U=P(`<div class="extension_container interactable" id="${l}" tabindex="0"></div>`),A=`
      <div class="list-group-item flex-container flexGap5 interactable" id="${a}" title="\u6253\u5F00 YouYou \u5DE5\u5177\u7BB1">
        <div class="fa-fw fa-solid fa-wand-magic-sparkles extensionsMenuExtensionButton"></div>
        <span>YouYou \u5DE5\u5177\u7BB1</span>
      </div>
    `,O=P(A);O.on("click",function(j){j.stopPropagation(),p("\u83DC\u5355\u9879\u88AB\u70B9\u51FB");let Z=P("#extensionsMenuButton",_);Z.length&&T.is(":visible")&&Z.trigger("click"),typeof e.openPopup=="function"&&e.openPopup()}),U.append(O),T.append(U),p("\u83DC\u5355\u9879\u5DF2\u6DFB\u52A0\u5230\u9B54\u68D2\u533A")}async function K(){p(`\u521D\u59CB\u5316\u5F00\u59CB... \u7248\u672C: ${i}`),await b();let P=await f();if(p(P?"\u6240\u6709\u6A21\u5757\u52A0\u8F7D\u6210\u529F":"\u90E8\u5206\u6A21\u5757\u52A0\u8F7D\u5931\u8D25\uFF0C\u4F7F\u7528\u53EF\u7528\u529F\u80FD"),!c&&o.uiModule?.initUI)try{await o.uiModule.initUI({services:o,autoInjectStyles:!1,targetDocument:s.document||document}),c=!0,p("UI \u88C5\u914D\u4E2D\u5FC3\u5DF2\u521D\u59CB\u5316")}catch(T){y("UI \u6A21\u5757\u521D\u59CB\u5316\u5931\u8D25:",T)}if(o.uiModule&&(w(),await S()),o.presetBootstrapModule?.ensurePresetSystem)try{let T=o.presetBootstrapModule.ensurePresetSystem();T?.aborted?p(`\u9884\u8BBE\u7CFB\u7EDF\u8FC1\u79FB\u5931\u8D25\u5DF2 abort\uFF0C\u8001\u5B57\u6BB5\u4FDD\u7559: ${T.error}`):T?.skipped?p(`\u9884\u8BBE\u7CFB\u7EDF\u5DF2\u5C31\u7EEA\uFF08${T.reason}\uFF09`):p(`\u9884\u8BBE\u7CFB\u7EDF\u8FC1\u79FB\u5B8C\u6210\uFF08${T.migratedCount}/${T.total} \u5DE5\u5177\uFF09`)}catch(T){y("\u9884\u8BBE\u7CFB\u7EDF\u521D\u59CB\u5316\u5F02\u5E38:",T)}if(o.toolAutomationServiceModule?.toolAutomationService){let T=o.toolAutomationServiceModule.toolAutomationService.init();p(T?"\u81EA\u52A8\u5316\u751F\u547D\u5468\u671F\u670D\u52A1\u5DF2\u521D\u59CB\u5316":"\u81EA\u52A8\u5316\u751F\u547D\u5468\u671F\u670D\u52A1\u521D\u59CB\u5316\u672A\u5B8C\u6210\uFF0C\u7B49\u5F85\u5BBF\u4E3B\u4E8B\u4EF6\u6E90\u91CD\u8BD5")}let _=s.document||document;_.readyState==="loading"?_.addEventListener("DOMContentLoaded",()=>{setTimeout(v,1e3)}):setTimeout(v,1e3),p("\u521D\u59CB\u5316\u5B8C\u6210")}return{loadModules:f,injectStyles:b,addMenuItem:v,init:K,log:p,logError:y}}Ke();Je();Je();q();var no=C.createScope("PromptEditor"),_v="youyou_toolkit_prompt_editor",Ev={system:"System Prompt (\u7CFB\u7EDF\u63D0\u793A\u8BCD)",ai:"AI Prompt (AI\u6307\u4EE4\u63D0\u793A\u8BCD)",user:"User Prompt (\u7528\u6237\u63D0\u793A\u8BCD)"},Av={system:"fa-server",ai:"fa-robot",user:"fa-user"},rn=[{id:"system_1",type:"system",role:"SYSTEM",mainSlot:"",content:"",deletable:!1,expanded:!0},{id:"ai_1",type:"ai",role:"USER",mainSlot:"A",content:"",deletable:!1,expanded:!0,isMain:!0},{id:"user_1",type:"user",role:"USER",mainSlot:"B",content:"",deletable:!1,expanded:!0,isMain2:!0}],Ci=class{constructor(e={}){this.containerId=e.containerId||_v,this.segments=e.segments||[...rn],this.onChange=e.onChange||null,this.editable=e.editable!==!1,this.showMainSlot=e.showMainSlot!==!1,this.$container=null,this.$=null}init(e){if(this.$=window.jQuery||window.parent?.jQuery,!this.$){no.error("jQuery not available");return}this.$container=e,this.render(),this.bindEvents()}setSegments(e){this.segments=e&&Array.isArray(e)?[...e]:[...rn],this.$container&&(this.render(),this.bindEvents())}getSegments(){return this.segments.map(e=>({...e,content:this.getSegmentContent(e.id)}))}getSegmentContent(e){return this.$container&&this.$container.find(`[data-segment-id="${e}"] .yyt-prompt-textarea`).val()||""}render(){if(!this.$container)return;let e=`
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
    `;this.$container.html(e)}renderSegment(e){let r=Ev[e.type]||e.type,s=Av[e.type]||"fa-file",o=e.mainSlot==="A"||e.isMain,n=e.mainSlot==="B"||e.isMain2,i=o?"var(--yyt-accent, #7bb7ff)":n?"#ffb74d":"",a=this.showMainSlot&&e.mainSlot?`<span class="yyt-prompt-slot-badge">mainSlot: ${e.mainSlot}</span>`:"",l=`<span class="yyt-prompt-role-badge">role: ${e.role||"USER"}</span>`;return`
      <div class="yyt-prompt-segment ${e.expanded?"yyt-expanded":""} ${o?"yyt-main-a":""} ${n?"yyt-main-b":""}" 
           data-segment-id="${e.id}" 
           data-segment-type="${e.type}"
           style="${i?`border-left: 3px solid ${i};`:""}">
        <div class="yyt-prompt-segment-header">
          <div class="yyt-prompt-segment-info">
            <i class="fa-solid ${s}"></i>
            <span class="yyt-prompt-segment-title">${r}</span>
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
    `}bindEvents(){this.$container&&(et(this.$container,"yytPromptEditorSelect"),this.$container.off(".yytPromptEditor"),this.$container.on("click.yytPromptEditor",".yyt-prompt-toggle",e=>{this.$(e.currentTarget).closest(".yyt-prompt-segment").toggleClass("yyt-expanded"),this.$(e.currentTarget).find("i").toggleClass("fa-chevron-up fa-chevron-down")}),this.$container.on("click.yytPromptEditor",".yyt-prompt-delete",e=>{let r=this.$(e.currentTarget).closest(".yyt-prompt-segment").data("segment-id");this.deleteSegment(r)}),this.$container.on("change.yytPromptEditor",".yyt-prompt-role",e=>{let r=this.$(e.currentTarget).closest(".yyt-prompt-segment").data("segment-id"),s=this.$(e.currentTarget).val();this.updateSegmentMeta(r,{role:s})}),this.$container.on("change.yytPromptEditor",".yyt-prompt-main-slot",e=>{let r=this.$(e.currentTarget).closest(".yyt-prompt-segment").data("segment-id"),s=this.$(e.currentTarget).val();this.updateSegmentMeta(r,{mainSlot:s})}),this.$container.on("input.yytPromptEditor",".yyt-prompt-textarea",e=>{this.onChange&&this.onChange(this.getSegments())}),this.$container.on("click.yytPromptEditor",`#${this.containerId}-add-segment`,()=>{this.addSegment()}),this.$container.on("click.yytPromptEditor",`#${this.containerId}-import-prompt`,()=>{this.importPrompt()}),this.$container.on("click.yytPromptEditor",`#${this.containerId}-export-prompt`,()=>{this.exportPrompt()}),vt(this.$container,{namespace:"yytPromptEditorSelect",selectors:[".yyt-prompt-role",".yyt-prompt-main-slot"]}))}addSegment(e=null){let r=`segment_${Date.now()}`,s=e||{id:r,type:"user",role:"USER",mainSlot:"",content:"",deletable:!0,expanded:!0};s.id||(s.id=r),this.segments.push(s),this.render(),this.bindEvents(),this.onChange&&this.onChange(this.getSegments())}deleteSegment(e){let r=this.segments.findIndex(o=>o.id===e);if(r===-1)return;if(this.segments[r].deletable===!1){no.warn("\u8BE5\u6BB5\u843D\u4E0D\u53EF\u5220\u9664");return}this.segments.splice(r,1),this.render(),this.bindEvents(),this.onChange&&this.onChange(this.getSegments())}updateSegmentMeta(e,r){let s=this.segments.find(o=>o.id===e);s&&(Object.assign(s,r),this.onChange&&this.onChange(this.getSegments()))}importPrompt(){let e=document.createElement("input");e.type="file",e.accept=".json",e.onchange=r=>{let s=r.target.files[0];if(!s)return;let o=new FileReader;o.onload=n=>{try{let i=JSON.parse(n.target.result);Array.isArray(i)?(this.setSegments(i),no.log("\u63D0\u793A\u8BCD\u5BFC\u5165\u6210\u529F")):no.error("\u65E0\u6548\u7684\u63D0\u793A\u8BCD\u683C\u5F0F")}catch(i){no.error("\u5BFC\u5165\u5931\u8D25:",i)}},o.readAsText(s)},e.click()}exportPrompt(){let e=this.getSegments(),r=JSON.stringify(e,null,2),s=new Blob([r],{type:"application/json"}),o=URL.createObjectURL(s),n=document.createElement("a");n.href=o,n.download=`prompt_group_${Date.now()}.json`,n.click(),URL.revokeObjectURL(o),no.log("\u63D0\u793A\u8BCD\u5DF2\u5BFC\u51FA")}destroy(){this.$container&&(et(this.$container,"yytPromptEditorSelect"),this.$container.off(".yytPromptEditor"))}escapeHtml(e){return typeof e!="string"?"":e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}};function Mf(){return`
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
  `}function Rf(t){return t.filter(e=>e.content&&e.content.trim()).map(e=>({role:e.role,content:e.content,deletable:e.deletable,mainSlot:e.mainSlot}))}function Pf(t){return Array.isArray(t)?t.map((e,r)=>({id:`segment_${r}_${Date.now()}`,type:e.role==="SYSTEM"?"system":e.role==="assistant"?"ai":"user",role:e.role,mainSlot:e.mainSlot||"",content:e.content||"",deletable:e.deletable!==!1,expanded:!0,isMain:e.mainSlot==="A"||e.isMain,isMain2:e.mainSlot==="B"||e.isMain2})):[...rn]}q();function $f(t){let{constants:e,topLevelWindow:r,modules:s,caches:o,uiState:n}=t,{SCRIPT_ID:i,SCRIPT_VERSION:a,POPUP_ID:l}=e,d=C.createScope("PopupShell"),c={cleanup:null},u={cleanups:[]},p={cleanups:[]},y={current:null};function f(){return!!n.sidebarCollapsed}function m(){n.sidebarCollapsed=!n.sidebarCollapsed;let h=n.currentPopup;if(!h)return;let x=h.querySelector(".yyt-shell-sidebar"),E=h.querySelector(".yyt-shell-workspace"),k=h.querySelector(".yyt-sidebar-toggle i");x&&x.classList.toggle("yyt-collapsed",n.sidebarCollapsed),E&&E.classList.toggle("yyt-sidebar-collapsed",n.sidebarCollapsed),k&&(k.className=n.sidebarCollapsed?"fa-solid fa-angles-right":"fa-solid fa-angles-left"),ze()}function b(...h){d.log(h.join(" "))}function w(...h){d.error(h.join(" "))}function S(h){return typeof h!="string"?"":h.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function v(){return r.jQuery||window.jQuery}function K(){return r.document||document}function P(h){if(!h)return"\u672A\u9009\u62E9\u9875\u9762";let x=s.toolRegistryModule?.getToolConfig(h);if(!x)return h;if(!x.hasSubTabs)return x.name||h;let E=T(h),k=x.subTabs?.find(N=>N.id===E);return k?.name?`${x.name} / ${k.name}`:x.name||h}function _(h){if(!h)return"\u8BF7\u9009\u62E9\u5DE6\u4FA7\u5BFC\u822A\u4E2D\u7684\u9875\u9762\u8FDB\u884C\u914D\u7F6E\u6216\u6392\u67E5\u3002";let x=s.toolRegistryModule?.getToolConfig(h);if(!x)return"\u5F53\u524D\u9875\u9762\u63CF\u8FF0\u6682\u4E0D\u53EF\u7528\u3002";if(!x.hasSubTabs)return x.description||"\u5728\u8FD9\u91CC\u7BA1\u7406\u5F53\u524D\u9875\u9762\u7684\u914D\u7F6E\u548C\u64CD\u4F5C\u3002";let E=T(h);return x.subTabs?.find(N=>N.id===E)?.description||x.description||"\u5728\u8FD9\u91CC\u7BA1\u7406\u5F53\u524D\u5DE5\u5177\u7684\u6A21\u677F\u3001\u914D\u7F6E\u4E0E\u8C03\u8BD5\u80FD\u529B\u3002"}function T(h,x=""){let E=s.toolRegistryModule?.getToolConfig(h);if(!E?.hasSubTabs||!Array.isArray(E.subTabs)||E.subTabs.length===0)return"";let k=String(x||n.currentSubTab[h]||"").trim(),B=k&&E.subTabs.some(ee=>ee?.id===k)?k:E.subTabs[0]?.id||"";return B&&n.currentSubTab[h]!==B&&(n.currentSubTab[h]=B),B}function F(){let h=n.currentPopup;if(!h)return;let x=P(n.currentMainTab),E=_(n.currentMainTab),k=h.querySelector(".yyt-popup-active-label");k&&(k.textContent=`\u5F53\u524D\uFF1A${x}`);let N=h.querySelector(".yyt-shell-breadcrumb");N&&(N.textContent=x);let B=h.querySelector(".yyt-shell-main-title");B&&(B.textContent=x);let ee=h.querySelector(".yyt-shell-main-description");ee&&(ee.textContent=E)}function U(){typeof c.cleanup=="function"&&(c.cleanup(),c.cleanup=null)}function A(){Array.isArray(u.cleanups)&&(u.cleanups.forEach(h=>{typeof h=="function"&&h()}),u.cleanups=[])}function O(){Array.isArray(p.cleanups)&&(p.cleanups.forEach(h=>{typeof h=="function"&&h()}),p.cleanups=[])}function J(h,x){if(!h||!x)return!1;let E=h.jquery?h[0]:h,k=x.jquery?x[0]:x;return!!(E&&k&&E===k)}function j(h={}){let{container:x=null}=h,E=y.current;if(E&&!(x&&!J(E.container,x))){try{typeof E.destroy=="function"&&E.destroy(E.container)}catch(k){w("\u9500\u6BC1\u52A8\u6001\u9762\u677F host \u5931\u8D25",k)}s.uiModule?.uiManager?.destroyContainerInstance&&s.uiModule.uiManager.destroyContainerInstance(E.container),y.current=null}}function Z(h,x={}){y.current={key:x.key||"",container:h,destroy:typeof x.destroy=="function"?x.destroy:null}}function ie(){let h=v();if(!h||!n.currentPopup)return;let x=s.toolRegistryModule?.getToolList()||[],E=h(n.currentPopup).find(".yyt-main-nav");if(!E.length)return;let k=x.map(B=>`
      <div class="yyt-main-nav-item ${B.id===n.currentMainTab?"active":""}" data-tab="${B.id}">
        <div class="yyt-main-nav-icon">
          <i class="fa-solid ${S(B.icon||"fa-file")}"></i>
        </div>
        <div class="yyt-main-nav-copy">
          <span class="yyt-main-nav-name">${S(B.name||B.id)}</span>
          <span class="yyt-main-nav-desc">${S(B.description||"\u8FDB\u5165\u6B64\u9875\u9762\u8FDB\u884C\u914D\u7F6E\u3001\u67E5\u770B\u6216\u7EF4\u62A4\u3002")}</span>
        </div>
      </div>
    `).join("");E.html(k),h(n.currentPopup).find(".yyt-main-nav-item").on("click",function(){let ee=h(this).data("tab");ee&&ws(ee)});let N=h(n.currentPopup).find(".yyt-shell-sidebar-hint");N.length&&N.text(`${x.length} tabs`)}function be(){let h=v();if(!h||!n.currentPopup)return;let x=s.toolRegistryModule?.getToolList()||[],E=s.toolRegistryModule?.getToolConfig("tools"),k=Array.isArray(E?.subTabs)?E.subTabs:[],N=k.filter(te=>te?.isCustom).length,B=k.filter(te=>!te?.isCustom).length,V=h(n.currentPopup).find(".yyt-shell-sidebar-stats");V.length&&(V.find(".yyt-shell-sidebar-stat").eq(0).find(".yyt-shell-sidebar-stat-value").text(String(x.length)),V.find(".yyt-shell-sidebar-stat").eq(1).find(".yyt-shell-sidebar-stat-value").text(String(B)),V.find(".yyt-shell-sidebar-stat").eq(2).find(".yyt-shell-sidebar-stat-value").text(String(N)))}function Re(){let h=s.toolRegistryModule?.getToolList()||[];return h.length?(h.some(x=>x.id===n.currentMainTab)||(n.currentMainTab=h[0].id),n.currentMainTab):null}async function H(h={}){let{rebuildNavigation:x=!1,reRenderSubNav:E=!1}=h,k=v();if(!k||!n.currentPopup)return;j();let N=Re();if(!N)return;x&&(ie(),be());let B=s.toolRegistryModule?.getToolConfig(N),ee=!!B?.hasSubTabs,V=k(n.currentPopup).find(".yyt-sub-nav"),te=k(n.currentPopup).find(".yyt-content-inner");if(x&&te.length){let he=new Set(te.find(".yyt-tab-content").map((ue,qe)=>k(qe).data("tab")).get());(s.toolRegistryModule?.getToolList()||[]).forEach(ue=>{he.has(ue.id)||te.append(`<div class="yyt-tab-content" data-tab="${S(ue.id)}"></div>`)}),te.find(".yyt-tab-content").each((ue,qe)=>{let wt=k(qe).data("tab");(s.toolRegistryModule?.getToolList()||[]).some(Ut=>Ut.id===wt)||k(qe).remove()})}k(n.currentPopup).find(".yyt-main-nav-item").removeClass("active"),k(n.currentPopup).find(`.yyt-main-nav-item[data-tab="${N}"]`).addClass("active"),k(n.currentPopup).find(".yyt-tab-content").removeClass("active"),k(n.currentPopup).find(`.yyt-tab-content[data-tab="${N}"]`).addClass("active"),ee?(V.show(),(E||x)&&Br(N,B.subTabs)):V.hide(),await zr(N),F(),ze()}function Ae(){if(!n.currentPopup)return;A();let h=()=>{if(n.currentMainTab==="presetManagement"){H();return}n.currentMainTab==="tools"&&H({reRenderSubNav:!0})},x=()=>{n.currentMainTab==="tools"?H({rebuildNavigation:!0,reRenderSubNav:!0}):be()},E=()=>{n.currentMainTab==="tools"&&H({rebuildNavigation:!1,reRenderSubNav:!1})},k=()=>{(n.currentMainTab==="bypass"||n.currentMainTab==="tools")&&H({reRenderSubNav:n.currentMainTab==="tools"})};[D.PRESET_CREATED,D.PRESET_UPDATED,D.PRESET_DELETED].forEach(N=>{u.cleanups.push(z.on(N,h))}),[D.TOOL_REGISTERED,D.TOOL_UPDATED,D.TOOL_UNREGISTERED].forEach(N=>{u.cleanups.push(z.on(N,x))}),u.cleanups.push(z.on(D.TOOL_RUNTIME_UPDATED,E)),[D.BYPASS_PRESET_CREATED,D.BYPASS_PRESET_UPDATED,D.BYPASS_PRESET_DELETED].forEach(N=>{u.cleanups.push(z.on(N,k))})}function ae(h){return!!h?.closest?.(["input","textarea","select","button","a","label","summary","details",'[contenteditable="true"]',".yyt-dialog",".yyt-select-dropdown",".yyt-select-portal-layer"].join(","))}function xe(h){let x=h?.closest?.(["textarea",".yyt-preview-pre",".yyt-select-dropdown",".yyt-select-portal-layer",".yyt-dialog-body",".yyt-worldbook-list",".yyt-tool-panel",".yyt-panel-section"].join(","));return x?x.scrollHeight>x.clientHeight+2||x.scrollWidth>x.clientWidth+2:!1}function Qt(h,x){return x?.closest?.(".yyt-scrollable-surface")===h}function zt(h,x){if(!h||!x)return null;let E=x.closest?.([".yyt-worldbook-list",".yyt-select-dropdown",".yyt-select-portal-layer",".yyt-dialog-body",".yyt-preview-pre",".yyt-tool-panel",".yyt-panel-section"].join(","));return E&&(E.classList?.contains("yyt-select-portal-layer")||h.contains(E))&&(E.scrollHeight>E.clientHeight+2||E.scrollWidth>E.clientWidth+2)?E:[x.closest?.(".yyt-tool-list"),x.closest?.(".yyt-settings-content"),x.closest?.(".yyt-sub-content"),x.closest?.(".yyt-tab-content.active"),h].filter(Boolean).find(N=>N!==h&&!h.contains(N)?!1:N.scrollHeight>N.clientHeight+2||N.scrollWidth>N.clientWidth+2)||h}function Oe({mainTab:h=null,includeSubContent:x=!1}={}){let E=n.currentPopup;if(!E)return;let k=E.querySelector(".yyt-content");k&&(k.scrollTop=0,k.scrollLeft=0);let N=h?`.yyt-tab-content[data-tab="${h}"]`:".yyt-tab-content.active",B=E.querySelector(N);if(B&&(B.scrollTop=0,B.scrollLeft=0),!x)return;(B?.querySelectorAll(".yyt-sub-content")||[]).forEach(V=>{V.scrollTop=0,V.scrollLeft=0})}function Zt(h){let x=K();if(!h||!x)return;h.classList.add("yyt-scrollable-surface");let E=!1,k=!1,N=0,B=0,ee=0,V=0,te=!1,he=!1,ue=()=>{E=!1,k=!1,h.classList.remove("yyt-scroll-dragging")},qe=Y=>{Y.button===0&&(ae(Y.target)||Qt(h,Y.target)&&(te=h.scrollWidth>h.clientWidth+2,he=h.scrollHeight>h.clientHeight+2,!(!te&&!he)&&(Y.stopPropagation(),E=!0,k=!1,N=Y.clientX,B=Y.clientY,ee=h.scrollLeft,V=h.scrollTop)))},wt=Y=>{if(!E)return;let Ze=Y.clientX-N,He=Y.clientY-B;!(Math.abs(Ze)>4||Math.abs(He)>4)&&!k||(k=!0,h.classList.add("yyt-scroll-dragging"),te&&(h.scrollLeft=ee-Ze),he&&(h.scrollTop=V-He),Y.preventDefault())},Ut=()=>{ue()},wr=Y=>{if(Y.ctrlKey||xe(Y.target)||!h.classList.contains("yyt-content")&&!Qt(h,Y.target))return;let He=zt(h,Y.target);!He||He!==h&&!h.contains(He)||!(He.scrollHeight>He.clientHeight+2||He.scrollWidth>He.clientWidth+2)||(Math.abs(Y.deltaY)>0&&(He.scrollTop+=Y.deltaY),Math.abs(Y.deltaX)>0&&(He.scrollLeft+=Y.deltaX),Y.preventDefault(),Y.stopPropagation())},Ve=Y=>{k&&Y.preventDefault()};h.addEventListener("mousedown",qe),h.addEventListener("wheel",wr,{passive:!1}),h.addEventListener("dragstart",Ve),x.addEventListener("mousemove",wt),x.addEventListener("mouseup",Ut),p.cleanups.push(()=>{ue(),h.classList.remove("yyt-scrollable-surface"),h.removeEventListener("mousedown",qe),h.removeEventListener("wheel",wr),h.removeEventListener("dragstart",Ve),x.removeEventListener("mousemove",wt),x.removeEventListener("mouseup",Ut)})}function ze(){let h=n.currentPopup;if(!h)return;O();let x=[...h.querySelectorAll(".yyt-shell-sidebar .yyt-main-nav"),...h.querySelectorAll(".yyt-sub-nav"),...h.querySelectorAll(".yyt-content"),...h.querySelectorAll(".yyt-settings-content"),...h.querySelectorAll(".yyt-tool-list")];[...new Set(x)].forEach(Zt)}function io(h){return`
      <div class="yyt-startup-screen" data-yyt-startup-screen>
        <div class="yyt-startup-screen-inner">
          <div class="yyt-startup-screen-kicker">Welcome</div>
          <div class="yyt-startup-screen-title">YouYou \u5DE5\u5177\u7BB1</div>
          <div class="yyt-startup-screen-desc">\u96C6\u4E2D\u7BA1\u7406 API \u9884\u8BBE\u3001\u81EA\u5B9A\u4E49\u5DE5\u5177\u3001\u63D0\u53D6\u89C4\u5219\u3001Ai\u6307\u4EE4\u9884\u8BBE\u4E0E\u8BCA\u65AD\u6D41\u7A0B\u3002\u6BCF\u6B21\u5237\u65B0\u540E\u90FD\u4F1A\u91CD\u65B0\u663E\u793A\uFF0C\u4FBF\u4E8E\u5FEB\u901F\u56DE\u5230\u4ECB\u7ECD\u5165\u53E3\u3002</div>
          <div class="yyt-startup-screen-modules">
            ${(h||[]).slice(0,6).map(E=>`
      <div class="yyt-startup-module-chip">
        <i class="fa-solid ${S(E.icon||"fa-file")}"></i>
        <span>${S(E.name||E.id)}</span>
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
    `}function br(h){let x=v();if(!x||!n.currentPopup||n.startupScreenDismissed)return;let E=x(n.currentPopup).find(".yyt-popup-body"),k=E.find(".yyt-popup-shell");!E.length||!k.length||E.find("[data-yyt-startup-screen]").length||(k.attr("data-yyt-startup-visible","true"),E.prepend(io(h)),E.find(".yyt-startup-enter").on("click",()=>{E.find("[data-yyt-startup-screen]").remove(),k.removeAttr("data-yyt-startup-visible"),n.startupScreenDismissed=!0,ze()}))}function ao(){let h=K(),x=n.currentPopup,E=x?.querySelector(".yyt-popup-header");if(!x||!E||!h)return;let k=!1,N=0,B=0,ee=0,V=0,te="",he=()=>({width:r.innerWidth||h.documentElement?.clientWidth||window.innerWidth||0,height:r.innerHeight||h.documentElement?.clientHeight||window.innerHeight||0}),ue=(Ve,Y,Ze)=>Math.min(Math.max(Ve,Y),Ze),qe=()=>{k&&(k=!1,x.classList.remove("yyt-popup-dragging"),h.body.style.userSelect=te)},wt=Ve=>{if(!k||!n.currentPopup)return;let Y=Ve.clientX-N,Ze=Ve.clientY-B,{width:He,height:Mi}=he(),Yf=x.offsetWidth||0,qf=x.offsetHeight||0,Vf=Math.max(0,He-Yf),Jf=Math.max(0,Mi-qf);x.style.left=`${ue(ee+Y,0,Vf)}px`,x.style.top=`${ue(V+Ze,0,Jf)}px`,x.style.transform="none",x.style.right="auto",x.style.bottom="auto"},Ut=()=>{qe()},wr=Ve=>{if(Ve.button!==0||Ve.target?.closest(".yyt-popup-close"))return;k=!0,N=Ve.clientX,B=Ve.clientY;let Y=x.getBoundingClientRect();ee=Y.left,V=Y.top,x.style.left=`${Y.left}px`,x.style.top=`${Y.top}px`,x.style.transform="none",x.style.right="auto",x.style.bottom="auto",x.classList.add("yyt-popup-dragging"),te=h.body.style.userSelect||"",h.body.style.userSelect="none",Ve.preventDefault()};E.addEventListener("mousedown",wr),h.addEventListener("mousemove",wt),h.addEventListener("mouseup",Ut),c.cleanup=()=>{qe(),E.removeEventListener("mousedown",wr),h.removeEventListener("mousemove",wt),h.removeEventListener("mouseup",Ut)}}function xr(){j(),U(),A(),O();let h=v();if(h&&n.currentPopup){let x=h(n.currentPopup);et(x,"yytPopupToolConfigSelect"),et(x,"yytPromptEditorSelect")}n.currentPopup&&(n.currentPopup.remove(),n.currentPopup=null),n.currentOverlay&&(n.currentOverlay.remove(),n.currentOverlay=null),b("\u5F39\u7A97\u5DF2\u5173\u95ED")}function ws(h){j(),n.currentMainTab=h;let x=v();if(!x||!n.currentPopup)return;Oe({mainTab:h,includeSubContent:!0}),x(n.currentPopup).find(".yyt-main-nav-item").removeClass("active"),x(n.currentPopup).find(`.yyt-main-nav-item[data-tab="${h}"]`).addClass("active");let E=s.toolRegistryModule?.getToolConfig(h);E?.hasSubTabs?(x(n.currentPopup).find(".yyt-sub-nav").show(),Br(h,E.subTabs)):x(n.currentPopup).find(".yyt-sub-nav").hide(),x(n.currentPopup).find(".yyt-tab-content").removeClass("active"),x(n.currentPopup).find(`.yyt-tab-content[data-tab="${h}"]`).addClass("active"),zr(h),F(),ze()}function vs(h,x){j(),n.currentSubTab[h]=x;let E=v();!E||!n.currentPopup||(Oe({mainTab:h,includeSubContent:!0}),E(n.currentPopup).find(".yyt-sub-nav-item").removeClass("active"),E(n.currentPopup).find(`.yyt-sub-nav-item[data-subtab="${x}"]`).addClass("active"),Kt(h,x),F(),ze())}function Br(h,x){let E=v();if(!E||!n.currentPopup||!x)return;let k=T(h,n.currentSubTab[h]||x[0]?.id),B=(h==="tools"?[{key:"ai",title:"AI \u5DE5\u5177",items:x.filter(V=>!V?.isCustom&&(V?.toolKind||"ai")!=="script")},{key:"script",title:"\u811A\u672C\u5DE5\u5177",items:x.filter(V=>!V?.isCustom&&V?.toolKind==="script")},{key:"custom",title:"\u81EA\u5B9A\u4E49\u5DE5\u5177",items:x.filter(V=>V?.isCustom===!0)}].filter(V=>V.items.length>0):[{key:"default",title:"",items:x}]).map(V=>{let te=V.title?`<div class="yyt-sub-nav-group-title">${S(V.title)}</div>`:"",he=V.items.map(ue=>{let qe=ue?.isCustom===!0,wt=h==="tools"&&qe?`<div class="yyt-sub-nav-item-actions">
               <button type="button" class="yyt-sub-nav-item-action" data-action="edit" data-subtab="${ue.id}" title="\u7F16\u8F91"><i class="fa-solid fa-pen"></i></button>
               <button type="button" class="yyt-sub-nav-item-action" data-action="delete" data-subtab="${ue.id}" title="\u5220\u9664"><i class="fa-solid fa-trash"></i></button>
             </div>`:"";return`
        <div class="yyt-sub-nav-item ${ue.id===k?"active":""}" data-subtab="${ue.id}" data-tool-name="${S((ue.name||ue.id).toLowerCase())}">
          <i class="fa-solid ${ue.icon||"fa-file"}"></i>
          <span class="yyt-sub-nav-item-label">${S(ue.name||ue.id)}</span>
          ${wt}
        </div>
      `}).join("");return`
        <div class="yyt-sub-nav-group yyt-sub-nav-group-${V.key}">
          ${te}
          <div class="yyt-sub-nav-group-items">
            ${he}
          </div>
        </div>
      `}).join(""),ee=h==="tools"?`<div class="yyt-sub-nav-toolbar">
           <button type="button" class="yyt-sub-nav-toolbar-btn" data-tool-action="add" title="\u65B0\u5EFA\u81EA\u5B9A\u4E49\u5DE5\u5177"><i class="fa-solid fa-plus"></i><span>\u65B0\u5EFA</span></button>
           <button type="button" class="yyt-sub-nav-toolbar-btn" data-tool-action="import" title="\u4ECE JSON \u5BFC\u5165\u5DE5\u5177"><i class="fa-solid fa-file-import"></i></button>
           <button type="button" class="yyt-sub-nav-toolbar-btn" data-tool-action="export" title="\u5BFC\u51FA\u5DE5\u5177 JSON"><i class="fa-solid fa-file-export"></i></button>
         </div>
         <div class="yyt-sub-nav-filter-wrap">
           <input type="text" class="yyt-sub-nav-filter" placeholder="\u7B5B\u9009\u5DE5\u5177\u2026" autocomplete="off">
         </div>`:"";E(n.currentPopup).find(".yyt-sub-nav").html(ee+B),E(n.currentPopup).find(".yyt-sub-nav-item").on("click",function(te){if(te.target.closest&&te.target.closest(".yyt-sub-nav-item-action"))return;let he=E(this).data("subtab");vs(h,he)}),h==="tools"&&on(h),ze()}function lo(h){if(!n.currentPopup)return;let x=v();if(!x)return;let E=String(h||"").trim().toLowerCase();x(n.currentPopup).find(".yyt-sub-nav-item").each(function(){let N=String(x(this).data("tool-name")||"");x(this).toggle(!E||N.includes(E))}),x(n.currentPopup).find(".yyt-sub-nav-group").each(function(){let N=x(this).find(".yyt-sub-nav-item:visible").length>0;x(this).toggle(N)})}function on(h){let x=v();if(!x||!n.currentPopup)return;let E=x(n.currentPopup).find(".yyt-sub-nav");E.find(".yyt-sub-nav-filter").off("input.yytFilter").on("input.yytFilter",function(){lo(this.value)}),E.find(".yyt-sub-nav-toolbar-btn").off("click.yytToolAction").on("click.yytToolAction",async function(k){k.preventDefault(),k.stopPropagation();let N=x(this).data("tool-action");try{let B=await Promise.resolve().then(()=>(ac(),ic));if(N==="add"){let ee=await B.showToolEditDialog(null);ee&&(n.currentSubTab[h]=ee,vs(h,ee))}else N==="import"?await B.showImportToolsDialog():N==="export"&&B.showExportToolsDialog()}catch(B){w("\u5DE5\u5177\u64CD\u4F5C\u5931\u8D25",B)}}),E.find(".yyt-sub-nav-item-action").off("click.yytItemAction").on("click.yytItemAction",async function(k){k.preventDefault(),k.stopPropagation();let N=x(this).data("action"),B=String(x(this).data("subtab")||"");if(B)try{let ee=await Promise.resolve().then(()=>(ac(),ic));N==="edit"?await ee.showToolEditDialog(B):N==="delete"&&await ee.confirmDeleteTool(B)&&n.currentSubTab[h]===B&&(n.currentSubTab[h]="")}catch(ee){w("\u5DE5\u5177\u884C\u5185\u64CD\u4F5C\u5931\u8D25",ee)}})}async function zr(h){let x=v();if(!x||!n.currentPopup)return;let E=x(n.currentPopup).find(`.yyt-tab-content[data-tab="${h}"]`);if(!E.length)return;if(s.toolRegistryModule?.getToolConfig(h)?.hasSubTabs){let B=T(h);B?await Kt(h,B):E.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5B50 tab \u914D\u7F6E\u52A0\u8F7D\u5931\u8D25</span></div>'),ze();return}await s.uiModule?.renderMainTab?.(h,E)||Df(h,E),ze()}async function Kt(h,x){let E=v();if(!E||!n.currentPopup)return;let k=E(n.currentPopup).find(`.yyt-tab-content[data-tab="${h}"]`);if(!k.length)return;let N=s.toolRegistryModule?.getToolConfig(h);if(N?.hasSubTabs){let ee=T(h,x),V=N.subTabs?.find(qe=>qe.id===ee),te=k.find(".yyt-sub-content");if(te.length||(k.html('<div class="yyt-sub-content"></div>'),te=k.find(".yyt-sub-content")),!V){te.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5F53\u524D\u5B50\u9875\u9762\u4E0D\u5B58\u5728\u6216\u5DF2\u5931\u6548</span></div>'),Oe({mainTab:h,includeSubContent:!0}),ze();return}let he=V.component;if(he==="GenericToolConfigPanel"){await Nf(V,te),Oe({mainTab:h,includeSubContent:!0}),ze();return}j({container:te});let ue=await s.uiModule?.renderSubTabComponent?.(he,te);ue?Z(te,{key:ue}):te.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-tools"></i><span>\u529F\u80FD\u5F00\u53D1\u4E2D...</span></div>'),Oe({mainTab:h,includeSubContent:!0}),ze();return}let B=k.find(".yyt-sub-content");if(B.length){switch(j({container:B}),x){case"config":Bf(h,B);break;case"prompts":await zf(h,B);break;case"presets":Kf(h,B);break;default:B.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-tools"></i><span>\u529F\u80FD\u5F00\u53D1\u4E2D...</span></div>')}Oe({mainTab:h,includeSubContent:!0}),ze()}}async function Nf(h,x){if(!(!v()||!x?.length||!h?.id)){j({container:x});try{let k=o.dynamicToolPanelCache.get(h.id);if(!k){let ee=(await Promise.resolve().then(()=>(Qs(),_p)))?.createToolConfigPanel;if(typeof ee!="function")throw new Error("\u901A\u7528\u5DE5\u5177\u9762\u677F\u5DE5\u5382\u4E0D\u53EF\u7528");k=()=>ee({id:`${h.id}Panel`,toolId:h.id,postResponseHint:`\u70B9\u51FB\u201C\u7ACB\u5373\u6267\u884C\u4E00\u6B21\u201D\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u6267\u884C\u201C${h.name||h.id}\u201D\u3002`,extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 custom_tag
\u6216 regex:<custom_tag>([\\s\\S]*?)</custom_tag>`,previewDialogId:`${h.id}-extraction-preview`,previewTitle:`${h.name||h.id} \u63D0\u53D6\u9884\u89C8`}),o.dynamicToolPanelCache.set(h.id,k)}let N=k();N.renderTo(x),Z(x,{key:h.id,destroy:typeof N?.destroy=="function"?B=>N.destroy(B):null}),ze()}catch(k){y.current=null,w("\u81EA\u5B9A\u4E49\u5DE5\u5177\u9762\u677F\u52A0\u8F7D\u5931\u8D25:",k),x.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u81EA\u5B9A\u4E49\u5DE5\u5177\u9762\u677F\u52A0\u8F7D\u5931\u8D25</span></div>')}}}function Df(h,x){if(!v())return;let k=s.toolRegistryModule?.getToolConfig(h);if(!k){x.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5DE5\u5177\u914D\u7F6E\u4E0D\u5B58\u5728</span></div>');return}let N=n.currentSubTab[h]||k.subTabs?.[0]?.id||"config";x.html(`
      <div class="yyt-tool-window">
        <div class="yyt-sub-content" data-subtab="${N}">
          <!-- \u5B50\u5185\u5BB9\u5C06\u5728\u6B64\u6E32\u67D3 -->
        </div>
      </div>
    `),Kt(h,N)}function Bf(h,x){if(!v())return;let k=s.toolManagerModule?.getTool(h),N=s.presetManagerModule?.getAllPresets()||[],B=s.toolRegistryModule?.getToolApiPreset(h)||"",ee=N.map(V=>`<option value="${S(V.name)}" ${V.name===B?"selected":""}>${S(V.name)}</option>`).join("");x.html(`
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
              ${ee}
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
              <input type="number" class="yyt-input" id="yyt-tool-timeout" value="${k?.config?.execution?.timeout||6e4}">
            </div>
            <div class="yyt-form-group yyt-flex-1">
              <label>\u91CD\u8BD5\u6B21\u6570</label>
              <input type="number" class="yyt-input" id="yyt-tool-retries" value="${k?.config?.execution?.retries||3}">
            </div>
          </div>
        </div>
      </div>
    `),vt(x,{namespace:"yytPopupToolConfigSelect",selectors:["#yyt-tool-api-preset"]}),x.find("#yyt-save-tool-preset").on("click",function(){let te=x.find("#yyt-tool-api-preset").val();s.toolRegistryModule?.setToolApiPreset(h,te);let he=r.toastr;he&&he.success("API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u4FDD\u5B58","YouYou \u5DE5\u5177\u7BB1")})}async function zf(h,x){if(!v()){x.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u63D0\u793A\u8BCD\u7F16\u8F91\u5668\u6A21\u5757\u672A\u52A0\u8F7D</span></div>');return}let N=s.toolManagerModule?.getTool(h)?.config?.messages||[],B=Pf(N)||rn,ee=new Ci({containerId:`yyt-prompt-editor-${h}`,segments:B,onChange:te=>{let he=Rf(te);b("\u63D0\u793A\u8BCD\u5DF2\u66F4\u65B0:",he.length,"\u6761\u6D88\u606F")}});x.html(`<div id="yyt-prompt-editor-${h}" class="yyt-prompt-editor-container"></div>`),ee.init(x.find(`#yyt-prompt-editor-${h}`));let V=Mf();if(V){let te="yyt-prompt-editor-styles",he=r.document||document;if(!he.getElementById(te)){let ue=he.createElement("style");ue.id=te,ue.textContent=V,(he.head||he.documentElement).appendChild(ue)}}}function Kf(h,x){v()&&x.html(`
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
    `)}function Uf(){return`
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
      </div>`}function jf(h,x,E){let k=f(),N=h.map(B=>`
      <div class="yyt-main-nav-item ${B.id===n.currentMainTab?"active":""}" data-tab="${B.id}">
        <div class="yyt-main-nav-icon">
          <i class="fa-solid ${S(B.icon||"fa-file")}"></i>
        </div>
        <div class="yyt-main-nav-copy">
          <span class="yyt-main-nav-name">${S(B.name||B.id)}</span>
          <span class="yyt-main-nav-desc">${S(B.description||"\u8FDB\u5165\u6B64\u9875\u9762\u8FDB\u884C\u914D\u7F6E\u3001\u67E5\u770B\u6216\u7EF4\u62A4\u3002")}</span>
        </div>
      </div>
    `).join("");return`
      <aside class="yyt-shell-sidebar${k?" yyt-collapsed":""}">
        <div class="yyt-shell-sidebar-card">
          <div class="yyt-shell-sidebar-title-row">
            <span class="yyt-shell-sidebar-title">\u9875\u9762\u5BFC\u822A</span>
            <span class="yyt-shell-sidebar-hint">${h.length} tabs</span>
            <button class="yyt-sidebar-toggle" title="${k?"\u5C55\u5F00\u4FA7\u680F":"\u6298\u53E0\u4FA7\u680F"}">
              <i class="fa-solid ${k?"fa-angles-right":"fa-angles-left"}"></i>
            </button>
          </div>
          <div class="yyt-main-nav">
            ${N}
          </div>
          <div class="yyt-shell-sidebar-note">
            \u4FDD\u5B58\u540E\uFF0C\u624B\u52A8\u6267\u884C\u4E0E\u5199\u56DE\u94FE\u90FD\u4F1A\u4EE5\u6700\u65B0\u914D\u7F6E\u4E3A\u51C6\u3002
          </div>
          <div class="yyt-shell-sidebar-stats">
            <div class="yyt-shell-sidebar-stat">
              <span class="yyt-shell-sidebar-stat-value">${h.length}</span>
              <span class="yyt-shell-sidebar-stat-label">\u4E3B\u9875\u9762</span>
            </div>
            <div class="yyt-shell-sidebar-stat">
              <span class="yyt-shell-sidebar-stat-value">${x}</span>
              <span class="yyt-shell-sidebar-stat-label">\u9ED8\u8BA4\u5DE5\u5177</span>
            </div>
            <div class="yyt-shell-sidebar-stat">
              <span class="yyt-shell-sidebar-stat-value">${E}</span>
              <span class="yyt-shell-sidebar-stat-label">\u81EA\u5B9A\u4E49\u5DE5\u5177</span>
            </div>
          </div>
        </div>
      </aside>`}function Wf(h,x){return`
      <div class="yyt-shell-main-header">
        <div class="yyt-shell-main-heading-block">
          <div class="yyt-shell-main-title">${S(h)}</div>
          <div class="yyt-shell-main-description">${S(x)}</div>
        </div>
        <div class="yyt-shell-main-actions">
          <div class="yyt-shell-main-meta">
            <i class="fa-solid fa-circle-info"></i>
            <span>\u4FDD\u5B58\u540E\u6267\u884C\u94FE\u4F1A\u7ACB\u5373\u4F7F\u7528\u6700\u65B0\u914D\u7F6E</span>
          </div>
        </div>
      </div>`}function Ff(h,x){return h.map(E=>`
      <div class="yyt-tab-content ${E.id===x?"active":""}" data-tab="${E.id}">
      </div>
    `).join("")}function Hf(h){return`
      <div class="yyt-popup-footer">
        <div class="yyt-popup-footer-left">
          <div class="yyt-popup-status-cluster">
            <div class="yyt-popup-status">
              <i class="fa-solid fa-compass"></i>
              <span class="yyt-popup-active-label">\u5F53\u524D\uFF1A${S(h)}</span>
            </div>
            <div class="yyt-popup-footer-note">
              API\u3001\u5DE5\u5177\u3001\u63D0\u53D6\u4E0E\u8BCA\u65AD\u7EDF\u4E00\u5165\u53E3\u3002
            </div>
          </div>
        </div>
      </div>`}async function Gf(){if(n.currentPopup){b("\u5F39\u7A97\u5DF2\u5B58\u5728");return}let h=t?.services?.loadModules;typeof h=="function"&&await h();let x=v(),E=K();if(!x){w("jQuery \u672A\u627E\u5230\uFF0C\u65E0\u6CD5\u521B\u5EFA\u5F39\u7A97");return}let k=s.toolRegistryModule?.getToolList()||[];if(!k.length){w("\u5DE5\u5177\u5217\u8868\u4E3A\u7A7A\uFF0C\u65E0\u6CD5\u521B\u5EFA\u5F39\u7A97");return}k.some(Y=>Y.id===n.currentMainTab)||(n.currentMainTab=k[0].id);let N=s.toolRegistryModule?.getToolConfig("tools"),B=Array.isArray(N?.subTabs)?N.subTabs:[],ee=B.filter(Y=>Y?.isCustom).length,V=B.filter(Y=>!Y?.isCustom).length,te=P(n.currentMainTab),he=_(n.currentMainTab);n.currentOverlay=E.createElement("div"),n.currentOverlay.className="yyt-popup-overlay",n.currentOverlay.addEventListener("click",Y=>{Y.target===n.currentOverlay&&xr()}),E.body.appendChild(n.currentOverlay);let ue=f(),qe=`
      <div class="yyt-popup" id="${l}">
        ${Uf()}
        <div class="yyt-popup-body">
          <div class="yyt-popup-shell">
            <div class="yyt-shell-workspace${ue?" yyt-sidebar-collapsed":""}">
              ${jf(k,V,ee)}
              <section class="yyt-shell-main">
                ${Wf(te,he)}
                <div class="yyt-sub-nav" style="display: none;"></div>
                <div class="yyt-content-frame">
                  <div class="yyt-content">
                    <div class="yyt-content-inner">
                      ${Ff(k,n.currentMainTab)}
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
        ${Hf(te)}
      </div>
    `,wt=E.createElement("div");wt.innerHTML=qe,n.currentPopup=wt.firstElementChild,E.body.appendChild(n.currentPopup),x(n.currentPopup).find(".yyt-popup-close").on("click",xr),x(n.currentPopup).find(".yyt-sidebar-toggle").on("click",m);let Ut=Y=>{Y.key==="Escape"&&(E.querySelector(".yyt-dialog-overlay")||E.querySelector(".yyt-twb-editor-drawer.is-open")||(Y.stopPropagation(),xr()))},wr=Y=>{if(!(Y.ctrlKey||Y.metaKey)||Y.key!=="s"||!n.currentPopup)return;Y.preventDefault(),Y.stopPropagation();let Ze=x(n.currentPopup),He=Ze.find("#yyt-bypass-save:visible").first()||Ze.find(`#${i}-save-api-config:visible`).first()||Ze.find("#yyt-save-tool-preset:visible").first()||Ze.find('[data-twb-action="save"]:visible').first();He?.length&&He.trigger("click")};E.addEventListener("keydown",Ut),E.addEventListener("keydown",wr),u.cleanups.push(()=>{E.removeEventListener("keydown",Ut),E.removeEventListener("keydown",wr)}),Ae(),x(n.currentPopup).find(".yyt-main-nav-item").on("click",function(){let Ze=x(this).data("tab");Ze&&ws(Ze)}),ao(),zr(n.currentMainTab);let Ve=s.toolRegistryModule?.getToolConfig(n.currentMainTab);Ve?.hasSubTabs&&(x(n.currentPopup).find(".yyt-sub-nav").show(),Br(n.currentMainTab,Ve.subTabs)),F(),br(k),ze(),b("\u5F39\u7A97\u5DF2\u6253\u5F00")}return{openPopup:Gf,closePopup:xr,switchMainTab:ws,switchSubTab:vs,renderTabContent:zr,renderSubTabContent:Kt}}function Of(t,e={}){let{constants:r,modules:s}=t,{SCRIPT_ID:o,SCRIPT_VERSION:n}=r,{init:i,loadModules:a,addMenuItem:l,popupShell:d}=e;return{version:n,id:o,init:i,openPopup:d?.openPopup,closePopup:d?.closePopup,switchMainTab:d?.switchMainTab,switchSubTab:d?.switchSubTab,addMenuItem:l,getStorage:()=>s.storageModule,getApiConnection:()=>s.apiConnectionModule,getPresetManager:()=>s.presetManagerModule,getUi:()=>s.uiModule,getUiModule:()=>s.uiModule,getRegexExtractor:()=>s.regexExtractorModule,getToolManager:()=>s.toolManagerModule,getToolExecutor:()=>s.toolExecutorModule,getWindowManager:()=>s.windowManagerModule,getToolRegistry:()=>s.toolRegistryModule,getSettingsService:()=>s.settingsServiceModule,getBypassManager:()=>s.bypassManagerModule,getVariableResolver:()=>s.variableResolverModule,getContextInjector:()=>s.contextInjectorModule,getToolPromptService:()=>s.toolPromptServiceModule,getToolOutputService:()=>s.toolOutputServiceModule,getToolAutomationService:()=>s.toolAutomationServiceModule,getDataProvider:()=>s.toolDataProviderModule?.getCurrentProvider?.()||null,async getDataProviderAsync(){return await a(),s.toolDataProviderModule?.getToolDataProvider?.()||null},async getApiConfig(){return await a(),s.apiConnectionModule?.getApiConfig?.()||null},async saveApiConfig(c){return await a(),s.apiConnectionModule?(s.apiConnectionModule.updateApiConfig(c),!0):!1},async getPresets(){return await a(),s.presetManagerModule?s.presetManagerModule.getAllPresets():[]},async sendApiRequest(c,u){if(await a(),s.apiConnectionModule)return s.apiConnectionModule.sendApiRequest(c,u);throw new Error("API\u6A21\u5757\u672A\u52A0\u8F7D")},async testApiConnection(){return await a(),s.apiConnectionModule?s.apiConnectionModule.testApiConnection():{success:!1,message:"API\u6A21\u5757\u672A\u52A0\u8F7D"}},registerTool(c,u){return s.toolRegistryModule?.registerTool(c,u)||!1},unregisterTool(c){return s.toolRegistryModule?.unregisterTool(c)||!1},getToolList(){return s.toolRegistryModule?.getToolList()||[]},createWindow(c){return s.windowManagerModule?.createWindow(c)||null},closeWindow(c){s.windowManagerModule?.closeWindow(c)},startAutomation(){return s.toolAutomationServiceModule?.toolAutomationService?.init?.()||!1},stopAutomation(){s.toolAutomationServiceModule?.toolAutomationService?.stop?.()},getAutomationRuntime(){return s.toolAutomationServiceModule?.toolAutomationService?.getRuntimeSnapshot?.()||null},cancelAutomation(c={}){return s.toolAutomationServiceModule?.toolAutomationService?.cancelAutomation?.(c)||{success:!1,error:"\u81EA\u52A8\u5316\u670D\u52A1\u672A\u52A0\u8F7D"}},async processCurrentAssistantMessage(c={}){return s.toolAutomationServiceModule?.toolAutomationService?.processCurrentAssistantMessage?.(c)||{success:!1,error:"\u81EA\u52A8\u5316\u670D\u52A1\u672A\u52A0\u8F7D"}}}}var ki="youyou_toolkit",$v="1.0.170",Ov=`${ki}-menu-item`,Lv=`${ki}-menu-container`,Nv=`${ki}-popup`,Dv=typeof window.parent<"u"?window.parent:window,Ii={constants:{SCRIPT_ID:ki,SCRIPT_VERSION:$v,MENU_ITEM_ID:Ov,MENU_CONTAINER_ID:Lv,POPUP_ID:Nv},topLevelWindow:Dv,modules:{storageModule:null,apiConnectionModule:null,uiModule:null,presetManagerModule:null,regexExtractorModule:null,toolManagerModule:null,toolExecutorModule:null,toolTriggerModule:null,windowManagerModule:null,toolRegistryModule:null,settingsServiceModule:null,bypassManagerModule:null,variableResolverModule:null,contextInjectorModule:null,toolPromptServiceModule:null,toolOutputServiceModule:null,toolAutomationServiceModule:null,toolDataProviderModule:null},caches:{dynamicToolPanelCache:new Map},services:{loadModules:null},uiState:{currentPopup:null,currentOverlay:null,currentMainTab:"presetManagement",currentSubTab:{},startupScreenDismissed:!1}},Lf=$f(Ii),sn=If(Ii,{openPopup:Lf.openPopup});Ii.services.loadModules=sn.loadModules;var lc=Of(Ii,{init:sn.init,loadModules:sn.loadModules,addMenuItem:sn.addMenuItem,popupShell:Lf});if(typeof window<"u"&&(window.YouYouToolkit=lc,typeof window.parent<"u"&&window.parent!==window))try{window.parent.YouYouToolkit=lc}catch{}var i1=lc;sn.init();Promise.resolve().then(()=>(q(),dc)).then(({logger:t})=>{t.createScope("Bootstrap").log("\u6A21\u5757\u52A0\u8F7D\u5B8C\u6210")});export{i1 as default};
