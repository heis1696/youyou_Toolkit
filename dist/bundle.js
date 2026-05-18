var ih=Object.defineProperty;var N=(t,e)=>()=>(t&&(e=t(t=0)),e);var se=(t,e)=>{for(var r in e)ih(t,r,{get:e[r],enumerable:!0})};var B,bi,K,Je=N(()=>{B={STORAGE_CHANGED:"storage:changed",STORAGE_CLEARED:"storage:cleared",PRESET_CREATED:"preset:created",PRESET_UPDATED:"preset:updated",PRESET_DELETED:"preset:deleted",PRESET_ACTIVATED:"preset:activated",PRESET_IMPORTED:"preset:imported",PRESET_EXPORTED:"preset:exported",API_CONFIG_UPDATED:"api:configUpdated",API_REQUEST_START:"api:requestStart",API_REQUEST_SUCCESS:"api:requestSuccess",API_REQUEST_ERROR:"api:requestError",API_CONNECTION_TESTED:"api:connectionTested",TOOL_REGISTERED:"tool:registered",TOOL_UNREGISTERED:"tool:unregistered",TOOL_UPDATED:"tool:updated",TOOL_RUNTIME_UPDATED:"tool:runtimeUpdated",TOOL_ENABLED:"tool:enabled",TOOL_DISABLED:"tool:disabled",TOOL_EXECUTING:"tool:executing",TOOL_EXECUTED:"tool:executed",TOOL_ERROR:"tool:error",TOOL_EXECUTION_STARTED:"tool:executionStarted",TOOL_EXECUTION_FAILED:"tool:executionFailed",REGEX_RULE_ADDED:"regex:ruleAdded",REGEX_RULE_UPDATED:"regex:ruleUpdated",REGEX_RULE_DELETED:"regex:ruleDeleted",REGEX_RULES_CLEARED:"regex:rulesCleared",REGEX_PRESET_LOADED:"regex:presetLoaded",REGEX_EXTRACTED:"regex:extracted",UI_INITIALIZED:"ui:initialized",UI_RENDER_REQUESTED:"ui:renderRequested",UI_TAB_CHANGED:"ui:tabChanged",UI_SUBTAB_CHANGED:"ui:subTabChanged",UI_POPUP_OPENED:"ui:popupOpened",UI_POPUP_CLOSED:"ui:popupClosed",UI_WINDOW_CREATED:"ui:windowCreated",UI_WINDOW_CLOSED:"ui:windowClosed",APP_INITIALIZING:"app:initializing",APP_INITIALIZED:"app:initialized",APP_ERROR:"app:error",SETTINGS_UPDATED:"settings:updated",TOOL_CONTEXT_INJECTED:"tool:contextInjected",TOOL_CONTEXT_CLEARED:"tool:contextCleared",BYPASS_PRESET_CREATED:"bypass:presetCreated",BYPASS_PRESET_UPDATED:"bypass:presetUpdated",BYPASS_PRESET_DELETED:"bypass:presetDeleted",BYPASS_PRESET_ACTIVATED:"bypass:presetActivated",TOOL_OUTPUT_MODE_CHANGED:"tool:outputModeChanged"},bi=class{constructor(){this.listeners=new Map,this.onceCallbacks=new Map,this.history=[],this.maxHistorySize=100,this.debugMode=!1}on(e,r,s={}){if(!e||typeof r!="function")return console.warn("[EventBus] \u65E0\u6548\u7684\u4E8B\u4EF6\u6216\u56DE\u8C03"),()=>{};let{priority:o=0}=s;this.listeners.has(e)||this.listeners.set(e,new Set);let n={callback:r,priority:o};return this.listeners.get(e).add(n),this.debugMode&&console.log(`[EventBus] \u8BA2\u9605: ${e}`),()=>this.off(e,r)}off(e,r){let s=this.listeners.get(e);if(s){for(let o of s)if(o.callback===r){s.delete(o);break}this.debugMode&&console.log(`[EventBus] \u53D6\u6D88\u8BA2\u9605: ${e}`)}}emit(e,r){this.debugMode&&console.log(`[EventBus] \u53D1\u5E03: ${e}`,r),this._addToHistory(e,r);let s=this.listeners.get(e);if(!s||s.size===0)return;let o=Array.from(s).sort((n,a)=>a.priority-n.priority);for(let{callback:n}of o)try{n(r)}catch(a){console.error(`[EventBus] \u4E8B\u4EF6\u5904\u7406\u9519\u8BEF (${e}):`,a)}}once(e,r){let s=o=>{this.off(e,s),r(o)};return this.on(e,s)}wait(e,r=0){return new Promise((s,o)=>{let n=null,a=this.once(e,i=>{n&&clearTimeout(n),s(i)});r>0&&(n=setTimeout(()=>{a(),o(new Error(`\u7B49\u5F85\u4E8B\u4EF6\u8D85\u65F6: ${e}`))},r))})}hasListeners(e){let r=this.listeners.get(e);return r&&r.size>0}listenerCount(e){let r=this.listeners.get(e);return r?r.size:0}removeAllListeners(e){e?this.listeners.delete(e):this.listeners.clear()}setDebugMode(e){this.debugMode=e}_addToHistory(e,r){this.history.push({event:e,data:r,timestamp:Date.now()}),this.history.length>this.maxHistorySize&&this.history.shift()}getHistory(e){return e?this.history.filter(r=>r.event===e):[...this.history]}clearHistory(){this.history=[]}},K=new bi});var xd={};se(xd,{LOG_LEVEL:()=>ye,LoggerService:()=>Dn,default:()=>lh,logger:()=>R});var ye,bd,Dn,R,lh,H=N(()=>{Je();ye=Object.freeze({DEBUG:0,INFO:1,WARN:2,ERROR:3}),bd=Object.freeze({[ye.DEBUG]:"DEBUG",[ye.INFO]:"INFO",[ye.WARN]:"WARN",[ye.ERROR]:"ERROR"}),Dn=class{constructor(){this._entries=[],this._maxSize=2e3,this._nextId=1,this._minLevel=ye.INFO,this._eventKey="logger:entry",this._statsEventKey="logger:statsChanged",this._pendingFlush=!1}_write(e,r,s,o){let n={id:this._nextId++,timestamp:Date.now(),level:e,scope:r,message:s,data:o};this._entries.push(n),this._entries.length>this._maxSize&&this._entries.shift(),this._forwardToConsole(n),this._pendingFlush||(this._pendingFlush=!0,queueMicrotask(()=>{this._pendingFlush=!1,this._emitEntry(n)}))}_forwardToConsole(e){let r=`[${e.scope}]`;switch(e.level){case ye.DEBUG:console.debug(r,e.message,e.data??"");break;case ye.INFO:console.log(r,e.message,e.data??"");break;case ye.WARN:console.warn(r,e.message,e.data??"");break;case ye.ERROR:console.error(r,e.message,e.data??"");break}}_emitEntry(e){try{K?.emit(this._eventKey,e)}catch{}}debug(e,r,s){ye.DEBUG<this._minLevel||this._write(ye.DEBUG,e,r,s)}info(e,r,s){ye.INFO<this._minLevel||this._write(ye.INFO,e,r,s)}log(e,r,s){this.info(e,r,s)}warn(e,r,s){ye.WARN<this._minLevel||this._write(ye.WARN,e,r,s)}error(e,r,s){ye.ERROR<this._minLevel||this._write(ye.ERROR,e,r,s)}createScope(e){return{debug:(r,s)=>this.debug(e,r,s),info:(r,s)=>this.info(e,r,s),log:(r,s)=>this.log(e,r,s),warn:(r,s)=>this.warn(e,r,s),error:(r,s)=>this.error(e,r,s)}}getEntries(e={}){let{level:r,scope:s,search:o,limit:n=500,offset:a=0}=e,i=this._entries;if(r!=null&&(i=i.filter(c=>c.level>=r)),s&&(i=i.filter(c=>c.scope===s)),o){let c=o.toLowerCase();i=i.filter(d=>d.scope.toLowerCase().includes(c)||d.message.toLowerCase().includes(c))}let l=i.length;return i=i.slice(a,a+n),{entries:i,total:l}}getStats(){let e={total:this._entries.length,byLevel:{DEBUG:0,INFO:0,WARN:0,ERROR:0},byScope:{}};for(let r of this._entries){let s=bd[r.level]||"UNKNOWN";e.byLevel[s]=(e.byLevel[s]||0)+1,e.byScope[r.scope]=(e.byScope[r.scope]||0)+1}return e}setLevel(e){this._minLevel=e}getLevel(){return this._minLevel}setMaxSize(e){this._maxSize=Math.max(100,Math.min(1e4,e))}clear(){this._entries=[],this._nextId=1}levelLabel(e){return bd[e]||"UNKNOWN"}},R=new Dn,lh=R});var wd={};se(wd,{StorageService:()=>as,default:()=>ph,getStorage:()=>ch,loadSettings:()=>dh,presetStorage:()=>Ie,saveSettings:()=>uh,storage:()=>D,toolStorage:()=>ve,windowStorage:()=>Ln});function ch(){let t=D;return t._getStorage(),t._storage}function dh(){return D.get("settings",{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}})}function uh(t){D.set("settings",t)}var xi,as,D,ve,Ie,Ln,ph,Ke=N(()=>{H();xi=R.createScope("StorageService"),as=class t{constructor(e="youyou_toolkit"){this.namespaceKey=e,this._storage=null,this._cache=new Map}_getStorage(){if(this._storage)return this._storage;try{let e=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(e.SillyTavern?.getContext){let r=e.SillyTavern.getContext();if(r?.extensionSettings)return r.extensionSettings[this.namespaceKey]||(r.extensionSettings[this.namespaceKey]={}),this._storage={_target:r.extensionSettings[this.namespaceKey],getItem:s=>{let o=r.extensionSettings[this.namespaceKey][s];return typeof o=="string"?o:o?JSON.stringify(o):null},setItem:(s,o)=>{r.extensionSettings[this.namespaceKey][s]=o,this._saveSettings(r)},removeItem:s=>{delete r.extensionSettings[this.namespaceKey][s],this._saveSettings(r)},_isTavern:!0},this._storage}}catch{xi.warn("SillyTavern\u5B58\u50A8\u4E0D\u53EF\u7528\uFF0C\u4F7F\u7528localStorage")}return this._storage={getItem:e=>{try{return localStorage.getItem(e)}catch{return null}},setItem:(e,r)=>{try{localStorage.setItem(e,r)}catch(s){xi.error("localStorage\u5199\u5165\u5931\u8D25:",s)}},removeItem:e=>{try{localStorage.removeItem(e)}catch{}},_isTavern:!1},this._storage}_saveSettings(e){if(typeof e.saveSettings=="function")try{e.saveSettings()}catch{}else if(typeof e.saveSettingsDebounced=="function")try{e.saveSettingsDebounced()}catch{}}get(e,r=null){let s=`${this.namespaceKey}:${e}`;if(this._cache.has(s))return this._cache.get(s);let o=this._getStorage(),n=this._getFullKey(e),a=o.getItem(n);if(a===null)return r;try{let i=JSON.parse(a);return this._cache.set(s,i),i}catch{return a}}set(e,r){let s=this._getStorage(),o=this._getFullKey(e),n=`${this.namespaceKey}:${e}`;this._cache.set(n,r);try{s.setItem(o,JSON.stringify(r))}catch(a){xi.error("\u5B58\u50A8\u5931\u8D25:",a)}}remove(e){let r=this._getStorage(),s=this._getFullKey(e),o=`${this.namespaceKey}:${e}`;this._cache.delete(o),r.removeItem(s)}has(e){let r=this._getStorage(),s=this._getFullKey(e);return r.getItem(s)!==null}clear(){if(this._getStorage()._isTavern){let r=typeof window.parent<"u"?window.parent:window;if(r.SillyTavern?.getContext){let s=r.SillyTavern.getContext();s?.extensionSettings?.[this.namespaceKey]&&(s.extensionSettings[this.namespaceKey]={},this._saveSettings(s))}}else{let r=`${this.namespaceKey}_`,s=[];for(let o=0;o<localStorage.length;o++){let n=localStorage.key(o);n&&n.startsWith(r)&&s.push(n)}s.forEach(o=>localStorage.removeItem(o))}this._cache.clear()}_getFullKey(e){return this._getStorage()._isTavern?e:`${this.namespaceKey}_${e}`}namespace(e){return new t(`${this.namespaceKey}:${e}`)}getMultiple(e){let r={};return e.forEach(s=>{r[s]=this.get(s)}),r}setMultiple(e){Object.entries(e).forEach(([r,s])=>{this.set(r,s)})}exportAll(){let e=this._getStorage(),r={};if(e._isTavern){let s=typeof window.parent<"u"?window.parent:window;if(s.SillyTavern?.getContext){let n=s.SillyTavern.getContext()?.extensionSettings?.[this.namespaceKey]||{};Object.entries(n).forEach(([a,i])=>{r[a]=typeof i=="string"?JSON.parse(i):i})}}else{let s=`${this.namespaceKey}_`;for(let o=0;o<localStorage.length;o++){let n=localStorage.key(o);if(n&&n.startsWith(s)){let a=n.slice(s.length);try{r[a]=JSON.parse(localStorage.getItem(n))}catch{r[a]=localStorage.getItem(n)}}}}return r}},D=new as("youyou_toolkit"),ve=new as("youyou_toolkit:tools"),Ie=new as("youyou_toolkit:presets"),Ln=new as("youyou_toolkit:windows");ph=D});var Ed={};se(Ed,{API_STATUS:()=>xh,fetchAvailableModels:()=>Ch,getApiConfig:()=>Fs,getEffectiveApiConfig:()=>$o,hasEffectiveApiPreset:()=>Do,sendApiRequest:()=>Lo,sendWithPreset:()=>Ti,testApiConnection:()=>kh,updateApiConfig:()=>vh,validateApiConfig:()=>On});function mh(){return{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,stream:!1,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}}}function vi(){return D.get(vd,mh())}function hh(t){D.set(vd,t)}function Td(){return D.get(fh,[])}function bh(){return D.get(gh,"")}function wi(t,e={}){let r=new Error(t);return r.allowDirectFallback=e.allowDirectFallback===!0,r}function Sd(t,e="chat_completions"){let r=String(t||"").trim();if(!r)return"";let s=null;try{s=new URL(r)}catch{return r}let o=s.pathname.replace(/\/+$/,""),n=o;return e==="chat_completions"?!/\/chat\/completions$/i.test(o)&&!/\/completions$/i.test(o)&&(n=`${o||""}/chat/completions`):e==="models"&&(/\/chat\/completions$/i.test(o)?n=o.replace(/\/chat\/completions$/i,"/models"):/\/completions$/i.test(o)?n=o.replace(/\/completions$/i,"/models"):/\/models$/i.test(o)||(n=`${o||""}/models`)),s.pathname=n.replace(/\/+/g,"/"),s.toString()}function wh(t){let e=String(t||"").trim();if(!e)return"";try{let r=new URL(e);return r.pathname=r.pathname.replace(/\/chat\/completions$/i,"").replace(/\/completions$/i,"").replace(/\/models$/i,"").replace(/\/+$/,"")||"/",r.toString().replace(/\/$/,"")}catch{return e.replace(/\/chat\/completions$/i,"").replace(/\/completions$/i,"").replace(/\/models$/i,"").replace(/\/+$/,"")}}function Fs(){return vi().apiConfig||{}}function vh(t){let e=vi();e.apiConfig={...e.apiConfig,...t},hh(e)}function On(t){let e=[];if(t.useMainApi)return{valid:!0,errors:[]};if(!t.url||!t.url.trim())e.push("API URL \u4E0D\u80FD\u4E3A\u7A7A");else try{new URL(t.url)}catch{e.push("API URL \u683C\u5F0F\u65E0\u6548")}return(!t.model||!t.model.trim())&&e.push("\u6A21\u578B\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"),{valid:e.length===0,errors:e}}function $o(t=""){let e=vi(),r=t||bh()||"";if(r){let o=Td().find(n=>n.name===r);if(o&&o.apiConfig)return{...o.apiConfig,presetName:o.name}}return e.apiConfig||{}}function Do(t=""){return t?Td().some(r=>r?.name===t):!1}async function Ti(t,e,r={},s=null){let o=$o(t);return await Lo(e,{...r,apiConfig:o},s)}function _d(t,e={}){let r=e.apiConfig||Fs();return{messages:t,model:r.model||"gpt-3.5-turbo",max_tokens:r.max_tokens||4096,temperature:r.temperature??.7,top_p:r.top_p??.9,stream:r.stream??!1,...e.extraParams}}function Si(t){let e="";if(t?.choices&&t.choices[0]?.message?.content)e=t.choices[0].message.content;else if(t?.content)e=t.content;else if(t?.text)e=t.text;else if(t?.response)e=t.response;else throw new Error(`\u65E0\u6CD5\u89E3\u6790API\u54CD\u5E94\u683C\u5F0F: ${JSON.stringify(t).slice(0,200)}`);return String(e||"").trim()}async function Lo(t,e={},r=null){let s=e.apiConfig||Fs(),o=s.useMainApi,n=On(s);if(!n.valid&&!o)throw new Error(`API\u914D\u7F6E\u65E0\u6548: ${n.errors.join(", ")}`);return o?await Th(t,e,r):await Sh(t,s,e,r)}async function Th(t,e,r){let s=typeof window.parent<"u"?window.parent:window;if(!s.TavernHelper?.generateRaw)throw new Error("TavernHelper.generateRaw \u4E0D\u53EF\u7528\u3002\u8BF7\u68C0\u67E5SillyTavern\u7248\u672C\u3002");try{let o=await s.TavernHelper.generateRaw({ordered_prompts:t,should_stream:e.apiConfig?.stream??Fs().stream??!1,...e.extraParams});if(typeof o!="string")throw new Error("\u4E3BAPI\u8FD4\u56DE\u4E86\u975E\u9884\u671F\u7684\u54CD\u5E94\u7C7B\u578B");return o.trim()}catch(o){throw o.name==="AbortError"?o:new Error(`\u4E3BAPI\u8BF7\u6C42\u5931\u8D25: ${o.message}`)}}async function Sh(t,e,r,s){let o=typeof window.parent<"u"?window.parent:window;if(o.TavernHelper?.generateRaw)try{return await _h(t,e,r,s,o)}catch(n){let a=String(n?.message||n||"");if(n?.name==="AbortError"||s?.aborted||a.includes("\u505C\u6B62\u6309\u94AE")||a.includes("stop button")||a.includes("Clicked stop")||a==="\u8BF7\u6C42\u5DF2\u53D6\u6D88")throw n;yh.warn("TavernHelper \u81EA\u5B9A\u4E49\u8BF7\u6C42\u5931\u8D25\uFF0C\u56DE\u9000\u5230\u540E\u5907\u94FE\u8DEF:",n)}if(o.SillyTavern?.getRequestHeaders)try{return await Eh(t,e,r,s,o)}catch(n){if(!n?.allowDirectFallback)throw n}return await Ah(t,e,r,s)}async function _h(t,e,r,s,o){if(s?.aborted)throw new DOMException("\u8BF7\u6C42\u5DF2\u53D6\u6D88","AbortError");let n=await o.TavernHelper.generateRaw({ordered_prompts:t,should_stream:e.stream??!1,max_chat_history:0,custom_api:{apiurl:wh(e.url),key:e.apiKey||"",model:e.model||"gpt-3.5-turbo",max_tokens:e.max_tokens||4096,temperature:e.temperature??.7,top_p:e.top_p??.9},...r.extraParams||{}});return typeof n=="string"?n.trim():Si(n)}async function Eh(t,e,r,s,o){let n=String(e.url||"").trim(),a={..._d(t,{apiConfig:e,...r}),chat_completion_source:"custom",reverse_proxy:n,proxy_password:"",custom_url:n,custom_include_headers:e.apiKey?`Authorization: Bearer ${e.apiKey}`:""},i={...typeof o.SillyTavern?.getRequestHeaders=="function"?o.SillyTavern.getRequestHeaders():{},"Content-Type":"application/json"},l=null;try{l=await fetch("/api/backends/chat-completions/generate",{method:"POST",headers:i,body:JSON.stringify(a),signal:s})}catch(u){throw u?.name==="AbortError"?u:wi(`\u9152\u9986\u540E\u7AEF\u8F6C\u53D1\u8BF7\u6C42\u4E0D\u53EF\u7528\uFF0C\u5DF2\u5C1D\u8BD5\u56DE\u9000\u5230\u6D4F\u89C8\u5668\u76F4\u8FDE\u3002\u539F\u59CB\u9519\u8BEF: ${u.message}`,{allowDirectFallback:!0})}let c=await l.text().catch(()=>"");if(!l.ok){let u=[404,405,501,502].includes(l.status);throw wi(`\u9152\u9986\u540E\u7AEF\u8F6C\u53D1\u8BF7\u6C42\u5931\u8D25 (${l.status}): ${c||"Unknown error"}`,{allowDirectFallback:u})}let d=null;try{d=c?JSON.parse(c):{}}catch{let y=String(c||"").replace(/\s+/g," ").trim().slice(0,120);throw wi(`\u9152\u9986\u540E\u7AEF\u8FD4\u56DE\u4E86\u975EJSON\u5185\u5BB9\u3002\u54CD\u5E94\u7247\u6BB5: ${y||"(\u7A7A\u54CD\u5E94)"}`)}return Si(d)}async function Ah(t,e,r,s){let o=_d(t,{apiConfig:e,...r}),n=Sd(e.url,"chat_completions"),a={"Content-Type":"application/json"};e.apiKey&&(a.Authorization=`Bearer ${e.apiKey}`);let i=await fetch(n,{method:"POST",headers:a,body:JSON.stringify(o),signal:s}),l=await i.text().catch(()=>"");if(!i.ok){let d=l||"Unknown error";throw new Error(`API\u8BF7\u6C42\u5931\u8D25 (${i.status}): ${d}`)}let c=null;try{c=l?JSON.parse(l):{}}catch{let u=String(l||"").replace(/\s+/g," ").trim().slice(0,120);throw new Error(`\u81EA\u5B9A\u4E49API\u8FD4\u56DE\u7684\u4E0D\u662FJSON\uFF0C\u53EF\u80FD\u662FURL\u914D\u7F6E\u9519\u8BEF\u3001\u53EA\u586B\u5199\u4E86\u7AD9\u70B9\u9996\u9875/\u57FA\u7840\u8DEF\u5F84\u3001\u6216\u8BF7\u6C42\u88AB\u91CD\u5B9A\u5411\u3002\u5F53\u524D\u4F1A\u81EA\u52A8\u5C1D\u8BD5\u8865\u5168 chat/completions \u7AEF\u70B9\uFF1B\u82E5\u4ECD\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5API URL\uFF0C\u6216\u6539\u4E3A\u542F\u7528\u201C\u4F7F\u7528SillyTavern\u4E3BAPI\u201D\u3002\u54CD\u5E94\u7247\u6BB5: ${u||"(\u7A7A\u54CD\u5E94)"}`)}return Si(c)}async function kh(t=null){let e=t||Fs(),r=Date.now();try{await Lo([{role:"user",content:'Hello, this is a connection test. Please respond with "OK".'}],{apiConfig:e});let o=Date.now()-r;return{success:!0,message:`\u8FDE\u63A5\u6210\u529F (\u5EF6\u8FDF: ${o}ms)`,latency:o}}catch(s){return{success:!1,message:`\u8FDE\u63A5\u5931\u8D25: ${s.message}`,latency:Date.now()-r}}}async function Ch(t=null){let e=t||Fs();return e.useMainApi?await Ih():await Rh(e)}async function Ih(){let t=typeof window.parent<"u"?window.parent:window;try{if(t.SillyTavern?.getContext){let e=t.SillyTavern.getContext();if(e.settings?.api_server)return[e.settings.api_server]}return["gpt-4","gpt-4-turbo","gpt-3.5-turbo","claude-3-opus","claude-3-sonnet"]}catch{return["gpt-4","gpt-3.5-turbo"]}}async function Rh(t){if(!t.url||!t.apiKey)return[];try{let e=Sd(t.url,"models"),r=await fetch(e,{method:"GET",headers:{Authorization:`Bearer ${t.apiKey}`}});if(!r.ok)return[];let s=await r.json();return s.data&&Array.isArray(s.data)?s.data.map(o=>o.id||o.name).filter(Boolean).sort():[]}catch{return[]}}var yh,vd,fh,gh,xh,Bn=N(()=>{Ke();H();yh=R.createScope("ApiConnection"),vd="settings",fh="api_presets",gh="current_preset";xh={IDLE:"idle",CONNECTING:"connecting",SUCCESS:"success",ERROR:"error"}});var Id={};se(Id,{createPreset:()=>Un,createPresetFromCurrentConfig:()=>Oh,deletePreset:()=>jn,duplicatePreset:()=>Ai,exportPresets:()=>Ci,generateUniquePresetName:()=>zh,getActiveConfig:()=>Lh,getActivePresetName:()=>ki,getAllPresets:()=>Rr,getPreset:()=>ls,getPresetNames:()=>Nh,getStarredPresets:()=>Dh,importPresets:()=>Ii,presetExists:()=>Oo,renamePreset:()=>Ei,switchToPreset:()=>Fn,togglePresetStar:()=>$h,updatePreset:()=>_i,validatePreset:()=>Bh});function Ph(){return{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}}}function Cd(){return D.get(Mh,Ph())}function mt(){return D.get(Ad,[])}function is(t){D.set(Ad,t)}function Kn(){return D.get(kd,"")}function zn(t){D.set(kd,t||"")}function Rr(){return mt()}function Nh(){return mt().map(e=>e.name)}function ls(t){return!t||typeof t!="string"?null:mt().find(r=>r.name===t)||null}function Oo(t){return!t||typeof t!="string"?!1:mt().some(r=>r.name===t)}function Un(t){let{name:e,description:r,apiConfig:s}=t;if(!e||typeof e!="string"||!e.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let o=e.trim();if(Oo(o))return{success:!1,message:`\u9884\u8BBE "${o}" \u5DF2\u5B58\u5728`};let n={name:o,description:r||"",apiConfig:{url:s?.url||"",apiKey:s?.apiKey||"",model:s?.model||"",useMainApi:s?.useMainApi??!0,stream:s?.stream??!1,max_tokens:s?.max_tokens||4096,temperature:s?.temperature??.7,top_p:s?.top_p??.9},createdAt:Date.now(),updatedAt:Date.now()},a=mt();return a.push(n),is(a),{success:!0,message:`\u9884\u8BBE "${o}" \u521B\u5EFA\u6210\u529F`,preset:n}}function _i(t,e){if(!t||typeof t!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let r=mt(),s=r.findIndex(a=>a.name===t);if(s===-1)return{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if(e.name&&e.name!==t)return{success:!1,message:"\u4E0D\u652F\u6301\u4FEE\u6539\u9884\u8BBE\u540D\u79F0\uFF0C\u8BF7\u521B\u5EFA\u65B0\u9884\u8BBE"};let o=r[s],n={...o,...e,name:o.name,updatedAt:Date.now()};return e.apiConfig&&(n.apiConfig={...o.apiConfig,...e.apiConfig}),r[s]=n,is(r),{success:!0,message:`\u9884\u8BBE "${t}" \u66F4\u65B0\u6210\u529F`,preset:n}}function jn(t){if(!t||typeof t!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let e=mt(),r=e.findIndex(s=>s.name===t);return r===-1?{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`}:(e.splice(r,1),is(e),Kn()===t&&zn(""),{success:!0,message:`\u9884\u8BBE "${t}" \u5DF2\u5220\u9664`})}function Ei(t,e){if(!t||typeof t!="string")return{success:!1,message:"\u539F\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};if(!e||typeof e!="string"||!e.trim())return{success:!1,message:"\u65B0\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let r=e.trim();if(!Oo(t))return{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if(Oo(r))return{success:!1,message:`\u9884\u8BBE "${r}" \u5DF2\u5B58\u5728`};let s=mt(),o=s.find(n=>n.name===t);return o&&(o.name=r,o.updatedAt=Date.now(),is(s),Kn()===t&&zn(r)),{success:!0,message:`\u9884\u8BBE\u5DF2\u91CD\u547D\u540D\u4E3A "${r}"`}}function Ai(t,e){if(!t||typeof t!="string")return{success:!1,message:"\u6E90\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};if(!e||typeof e!="string"||!e.trim())return{success:!1,message:"\u76EE\u6807\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let r=e.trim(),s=ls(t);if(!s)return{success:!1,message:`\u6E90\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if(Oo(r))return{success:!1,message:`\u9884\u8BBE "${r}" \u5DF2\u5B58\u5728`};let o={...JSON.parse(JSON.stringify(s)),name:r,createdAt:Date.now(),updatedAt:Date.now()},n=mt();return n.push(o),is(n),{success:!0,message:`\u9884\u8BBE\u5DF2\u590D\u5236\u4E3A "${r}"`,preset:o}}function $h(t){if(!t||typeof t!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let e=mt(),r=e.find(s=>s.name===t);return r?(r.starred=!r.starred,r.updatedAt=Date.now(),is(e),{success:!0,message:r.starred?`\u5DF2\u5C06 "${t}" \u6DFB\u52A0\u5230\u9884\u89C8\u5217\u8868`:`\u5DF2\u5C06 "${t}" \u4ECE\u9884\u89C8\u5217\u8868\u79FB\u9664`,starred:r.starred}):{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`}}function Dh(){return mt().filter(e=>e.starred===!0)}function Fn(t){if(!t)return zn(""),{success:!0,message:"\u5DF2\u5207\u6362\u5230\u5F53\u524DAPI\u914D\u7F6E"};let e=ls(t);return e?(zn(t),{success:!0,message:`\u5DF2\u5207\u6362\u5230\u9884\u8BBE "${t}"`,apiConfig:e.apiConfig}):{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`}}function ki(){return Kn()}function Lh(){let t=Kn();if(t){let r=ls(t);if(r)return{presetName:t,apiConfig:r.apiConfig}}return{presetName:"",apiConfig:Cd().apiConfig||{}}}function Ci(t=null){if(t){let r=ls(t);if(!r)throw new Error(`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`);return JSON.stringify(r,null,2)}let e=mt();return JSON.stringify(e,null,2)}function Ii(t,e={overwrite:!1}){let r;try{r=JSON.parse(t)}catch{return{success:!1,message:"JSON\u89E3\u6790\u5931\u8D25",imported:0}}let s=Array.isArray(r)?r:[r];if(s.length===0)return{success:!1,message:"\u6CA1\u6709\u627E\u5230\u6709\u6548\u7684\u9884\u8BBE\u6570\u636E",imported:0};let o=mt(),n=0;for(let a of s){if(!a.name||typeof a.name!="string"||!a.apiConfig||typeof a.apiConfig!="object")continue;let i=o.findIndex(l=>l.name===a.name);i>=0?e.overwrite&&(a.updatedAt=Date.now(),o[i]=a,n++):(a.createdAt=a.createdAt||Date.now(),a.updatedAt=Date.now(),o.push(a),n++)}return n>0&&is(o),{success:!0,message:`\u6210\u529F\u5BFC\u5165 ${n} \u4E2A\u9884\u8BBE`,imported:n}}function Oh(t,e=""){let r=Cd();return Un({name:t,description:e,apiConfig:r.apiConfig})}function Bh(t){let e=[];return(!t.name||typeof t.name!="string"||!t.name.trim())&&e.push("\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"),(!t.apiConfig||typeof t.apiConfig!="object")&&e.push("\u7F3A\u5C11API\u914D\u7F6E"),{valid:e.length===0,errors:e}}function zh(t){(!t||typeof t!="string")&&(t="\u65B0\u9884\u8BBE");let e=mt(),r=new Set(e.map(o=>o.name));if(!r.has(t))return t;let s=1;for(;r.has(`${t} (${s})`);)s++;return`${t} (${s})`}var Mh,Ad,kd,Bo=N(()=>{Ke();Mh="settings",Ad="api_presets",kd="current_preset"});function pr(){return typeof window.parent<"u"&&window.parent!==window&&window.parent.document?window.parent.document:document}function oe(t){return typeof t!="string"?"":t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function E(t,e,r=3e3){e||(e=t==="error"?"\u64CD\u4F5C\u5931\u8D25":"\u64CD\u4F5C\u5B8C\u6210");let s=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(s.toastr){s.toastr[t](e,"YouYou \u5DE5\u5177\u7BB1",{timeOut:r,progressBar:!0});return}Uh(t,e,r),Kh.log(`[${t.toUpperCase()}] ${e}`)}function us(t,e,r={}){e||(e=t==="error"?"\u64CD\u4F5C\u5931\u8D25":"\u64CD\u4F5C\u5B8C\u6210");let{duration:s=3500,sticky:o=!1,noticeId:n=""}=r,a=pr();if(!a?.body){E(t,e,s);return}let i="yyt-top-notice-container",l="yyt-top-notice-styles",c=a.getElementById(i);if(c||(c=a.createElement("div"),c.id=i,c.style.cssText=`
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
    `,a.head.appendChild(h)}if(n){let h=c.querySelector(`[data-notice-id="${n}"]`);h&&h.remove()}let d={success:"\u2713",error:"!",warning:"\u2022",info:"i"},u=a.createElement("div");u.className=`yyt-top-notice yyt-top-notice--${t||"info"}`,n&&(u.dataset.noticeId=n);let y=a.createElement("span");y.className="yyt-top-notice__icon",y.textContent=d[t]||d.info;let p=a.createElement("div");p.className="yyt-top-notice__content",p.textContent=e;let f=a.createElement("button");f.className="yyt-top-notice__close",f.type="button",f.setAttribute("aria-label","\u5173\u95ED\u901A\u77E5"),f.textContent="\xD7";let g=()=>{u.style.animation="yyt-top-notice-out 0.18s ease forwards",setTimeout(()=>u.remove(),180)};f.addEventListener("click",g),u.appendChild(y),u.appendChild(p),u.appendChild(f),c.appendChild(u),o||setTimeout(g,s)}function Uh(t,e,r){let s=pr();if(!s)return;let o=s.getElementById("yyt-fallback-toast");o&&o.remove();let n={success:{bg:"rgba(74, 222, 128, 0.9)",border:"#22c55e"},error:{bg:"rgba(248, 113, 113, 0.9)",border:"#ef4444"},warning:{bg:"rgba(251, 191, 36, 0.9)",border:"#f59e0b"},info:{bg:"rgba(123, 183, 255, 0.9)",border:"#7bb7ff"}},a=n[t]||n.info,i=s.createElement("div");if(i.id="yyt-fallback-toast",i.style.cssText=`
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
  `,i.textContent=e,!s.getElementById("yyt-toast-styles")){let l=s.createElement("style");l.id="yyt-toast-styles",l.textContent=`
      @keyframes yyt-toast-in {
        from { opacity: 0; transform: translateX(100px); }
        to { opacity: 1; transform: translateX(0); }
      }
      @keyframes yyt-toast-out {
        from { opacity: 1; transform: translateX(0); }
        to { opacity: 0; transform: translateX(100px); }
      }
    `,s.head.appendChild(l)}s.body.appendChild(i),setTimeout(()=>{i.style.animation="yyt-toast-out 0.3s ease forwards",setTimeout(()=>{i.remove()},300)},r)}function Z(){if(cs)return cs;if(typeof window.parent<"u"&&window.parent!==window)try{if(window.parent.jQuery)return cs=window.parent.jQuery,cs}catch{}return window.jQuery&&(cs=window.jQuery),cs}function jh(){cs=null}function xe(t){if(!t||t.length===0)return!1;let e=t[0];if(!e||e.nodeType!==1)return!1;let r=e.ownerDocument||document;return e.isConnected?r?.documentElement?.contains?r.documentElement.contains(e):!0:!1}function Mr(...t){return t.flat(1/0).flatMap(e=>String(e||"").split(/\s+/)).map(e=>e.trim()).filter(Boolean).join(" ")}function Ws(t={}){return Object.entries(t).filter(([,e])=>e!=null&&e!==!1).map(([e,r])=>r===!0?e:`${e}="${oe(String(r))}"`).join(" ")}function Nd(t=[],e="",r=""){let s=String(e??""),o=t.find(n=>n.value===s)||t.find(n=>n.disabled!==!0)||null;return o||{value:s,label:r||s||"\u8BF7\u9009\u62E9",disabled:!1}}function Fh(t=""){return String(t||"").split(/\s+/).map(e=>e.trim()).filter(e=>e&&e!=="yyt-select"&&e!=="yyt-native-select-bridge")}function Rd(t,e){let r=Z();if(!r||!e?.length)return null;let s=e.attr("id")?`#${e.attr("id")}`:e.attr("data-yyt-select-key")?`[data-yyt-select-key="${e.attr("data-yyt-select-key")}"]`:"";if(!s)return null;let n=t.find("[data-yyt-custom-select]").filter((a,i)=>String(r(i).attr("data-yyt-select-target")||"")===s);return n.length?n.first():null}function $d(t){let e=t?.[0];return e?.ownerDocument?e.ownerDocument:typeof window.parent<"u"&&window.parent!==window&&window.parent.document?window.parent.document:document}function Wh(t){if(!Z()||!xe(t))return null;let r=t.find("[data-yyt-custom-select]");return r.length?r:null}function Dd(t,e){if(!Z()||!e?.length)return null;let s=e.find("[data-yyt-select-native]").first();if(s.length)return s;let o=String(e.attr("data-yyt-select-target")||"").trim();if(!o)return null;let n=t.find(o).first();return n.length?n:null}function Ld(t=null){return t?.jquery&&t[0]?.ownerDocument?t[0].ownerDocument:t?.ownerDocument?t.ownerDocument:t?.nodeType===9?t:pr()}function Jt(t=null){let e=Ld(t),r=Md.get(e);return r||(r={targetDoc:e,layer:null,activeRoot:null,activeDropdown:null,placeholder:null,cleanup:null},Md.set(e,r)),r}function Hh(t=null){let e=Ld(t);if(!e?.body)return null;let r=Jt(e);if(r.layer&&r.layer.isConnected)return r.layer;let s=e.getElementById(Pd);return s||(s=e.createElement("div"),s.id=Pd,s.className="yyt-select-portal-layer",e.body.appendChild(s)),r.layer=s,s}function Wn(t){if(!Z()||!t?.length)return null;let r=t.find("[data-yyt-select-trigger]").first();return r.length?r:t.find(".yyt-select-trigger").first()}function Od(t){let e=Z();if(!e||!t?.length)return null;let r=Jt(t);if(r.activeRoot===t[0]&&r.activeDropdown)return e(r.activeDropdown);let s=t.find("[data-yyt-select-dropdown]").first();return s.length?s:t.find(".yyt-select-dropdown").first()}function Yh(t){t&&(t.classList.remove("yyt-floating-open"),t.removeAttribute("data-yyt-floating"),t.removeAttribute("data-yyt-floating-placement"),t.style.position="",t.style.top="",t.style.left="",t.style.right="",t.style.width="",t.style.minWidth="",t.style.maxWidth="",t.style.maxHeight="",t.style.visibility="",t.style.zIndex="")}function Bd(t,e=null){if(!t)return!1;let r=Jt(e||t);return r.activeRoot?.contains?.(t)||r.activeDropdown?.contains?.(t)?!0:!!t.closest?.("[data-yyt-custom-select], .yyt-select-portal-layer")}function Gh(t){if(!t?.targetDoc||typeof t.cleanup=="function")return;let e=t.targetDoc,r=e.defaultView||window,s=i=>{!t.activeRoot||!t.activeDropdown||Bd(i.target,e)||Vt(e)},o=i=>{if(i.key!=="Escape")return;let l=t.activeRoot;Vt(e);let c=Z();c&&l&&Wn(c(l))?.trigger("focus")},n=()=>{Ni(e)},a=()=>{Ni(e)};e.addEventListener("mousedown",s,!0),e.addEventListener("keydown",o,!0),r.addEventListener("resize",n),e.addEventListener("scroll",a,!0),t.cleanup=()=>{e.removeEventListener("mousedown",s,!0),e.removeEventListener("keydown",o,!0),r.removeEventListener("resize",n),e.removeEventListener("scroll",a,!0)}}function qh(t){typeof t?.cleanup=="function"&&t.cleanup(),t&&(t.cleanup=null)}function Pi(t){let e=Z();if(!e||!t?.activeRoot||!t?.activeDropdown)return;let r=t.targetDoc;if(!r?.body?.contains?.(t.activeRoot)){Vt(r);return}let s=e(t.activeRoot),o=Wn(s),n=t.activeDropdown,a=r?.defaultView||window;if(!o?.length||!n?.isConnected||!s[0]?.isConnected){Vt(r);return}let i=o[0].getBoundingClientRect(),l=a.innerWidth||r.documentElement?.clientWidth||0,c=a.innerHeight||r.documentElement?.clientHeight||0,d=12,u=8,y=Math.max(0,c-i.bottom-d-u),p=Math.max(0,i.top-d-u),f=y<220&&p>y,h=Math.max(120,Math.floor((f?p:y)||0));n.setAttribute("data-yyt-floating","true"),n.setAttribute("data-yyt-floating-placement",f?"top":"bottom"),n.classList.add("yyt-floating-open");let x=Math.ceil(i.width),T=Math.max(x,Math.floor(l-d*2)),v=n.style.width,L=n.style.minWidth,C=n.style.maxWidth,_=n.style.visibility;n.style.width="max-content",n.style.minWidth=`${x}px`,n.style.maxWidth=`${T}px`,n.style.visibility="hidden";let k=Math.ceil(n.scrollWidth||n.getBoundingClientRect().width||x),W=Math.max(x,Math.min(T,k)),q=Math.min(n.scrollHeight||h,h);n.style.width=v,n.style.minWidth=L,n.style.maxWidth=C,n.style.visibility=_;let M=Math.round(i.left);M+W>l-d&&(M=Math.max(d,Math.round(l-d-W))),M=Math.max(d,M);let S=Math.round(f?i.top-u-q:i.bottom+u);S=Math.max(d,Math.min(S,Math.round(c-d-q))),n.style.position="fixed",n.style.top=`${S}px`,n.style.left=`${M}px`,n.style.right="auto",n.style.width=`${W}px`,n.style.minWidth=`${x}px`,n.style.maxWidth=`${T}px`,n.style.maxHeight=`${Math.floor(h)}px`,n.style.visibility="",n.style.zIndex="10050"}function Vt(t=null){let e=Z(),r=Jt(t);if(!e||!r?.activeRoot)return;let s=r.activeRoot,o=r.activeDropdown,n=r.placeholder,a=e(s),i=Wn(a);o&&(Yh(o),n?.parentNode?n.parentNode.insertBefore(o,n):s?.isConnected?s.appendChild(o):o.remove()),n?.parentNode?.removeChild(n),a.removeClass("yyt-open"),i?.attr("aria-expanded","false"),r.activeRoot=null,r.activeDropdown=null,r.placeholder=null,qh(r)}function Ni(t=null){let e=Jt(t);!e?.activeRoot||!e?.activeDropdown||Pi(e)}function zd(t){if(!Z()||!t?.length)return;let r=t.first(),s=Wn(r),o=Od(r);if(!s?.length||!o?.length||s.prop("disabled"))return;let n=Jt(r);if(n.activeRoot===r[0]){Pi(n);return}Vt(r);let a=Hh(r);if(!a)return;let i=o[0],l=n.targetDoc.createComment("yyt-select-dropdown-placeholder");i.parentNode?.insertBefore(l,i),a.appendChild(i),n.activeRoot=r[0],n.activeDropdown=i,n.placeholder=l,r.addClass("yyt-open"),s.attr("aria-expanded","true"),Gh(n),Pi(n)}function Vh(t,e){let r=Z();if(!r||!e?.length)return null;let s=e.closest("[data-yyt-custom-select]");if(s.length)return s.first();let o=Jt(e);if(o.activeRoot&&o.activeDropdown?.contains?.(e[0])){let n=r(o.activeRoot);return t.has(o.activeRoot).length?n:null}return null}function $i(t){let e=Jt(t);t?.length&&e.activeRoot&&e.activeRoot!==t[0]||Vt(t)}function Kd(t){let e=Jt(t);if(t?.length&&e.activeRoot===t[0]){Vt(t);return}zd(t)}function Ri(t,e,r=null){let s=Z();if(!s||!e?.length)return;let o=r||Dd(t,e);if(!o?.length)return;let n=Array.isArray(o.data("yytCustomSelectOptions"))?o.data("yytCustomSelectOptions"):[],a=Nd(n,o.val(),e.attr("data-yyt-select-placeholder")||""),i=String(a.value??""),l=String(a.label??""),c=o.is(":disabled");e.find(".yyt-select-value").text(l).attr("data-value",i).data("value",i);let d=Od(e);(d?.length?d.find("[data-yyt-select-option]"):e.find("[data-yyt-select-option]")).each((p,f)=>{let g=s(f),h=String(g.attr("data-value")||"")===i;g.toggleClass("yyt-selected",h).attr("aria-selected",String(h))});let y=e.find("[data-yyt-select-trigger]").first();y.prop("disabled",c),c&&($i(e),e.removeClass("yyt-open"),y.attr("aria-expanded","false"))}function Ud(t=[]){return Array.isArray(t)?t.map(e=>{if(e&&typeof e=="object"&&!Array.isArray(e)){let s=String(e.value??""),o=String(e.label??e.text??e.name??s);return{value:s,label:o,disabled:e.disabled===!0}}let r=String(e??"");return{value:r,label:r,disabled:!1}}):[]}function jd(t={}){let{selectedValue:e="",options:r=[],placeholder:s="\u8BF7\u9009\u62E9",disabled:o=!1,includeNative:n=!0,nativeTag:a="input",nativeType:i="hidden",rootAttributes:l={},nativeAttributes:c={},triggerAttributes:d={},dropdownAttributes:u={},optionAttributes:y={},optionClass:p="",optionTextClass:f=""}=t,g=Ud(r),h=Nd(g,e,s),x=o===!0||g.length===0,T=Ws({...l,class:Mr("yyt-custom-select",l.class),"data-yyt-custom-select":l["data-yyt-custom-select"]??"true","data-yyt-select-placeholder":s}),v=Ws({type:"button",...d,class:Mr("yyt-select-trigger",d.class),"data-yyt-select-trigger":d["data-yyt-select-trigger"]??"true","aria-haspopup":d["aria-haspopup"]??"listbox","aria-expanded":d["aria-expanded"]??"false",disabled:x?!0:d.disabled}),L=Ws({...u,class:Mr("yyt-select-dropdown",u.class),"data-yyt-select-dropdown":u["data-yyt-select-dropdown"]??"true",role:u.role??"listbox"}),C=n?(()=>{let _={...c,class:Mr(c.class),"data-yyt-select-native":c["data-yyt-select-native"]??"true",disabled:x?!0:c.disabled};return a==="select"?`<select ${Ws(_)}>${g.map(q=>`
            <option value="${oe(q.value)}" ${q.value===String(h.value??"")?"selected":""} ${q.disabled?"disabled":""}>${oe(q.label)}</option>
          `).join("")}</select>`:`<input ${Ws({type:i,value:h.value,..._})}>`})():"";return`
    <div ${T}>
      ${C}
      <button ${v}>
        <span class="${oe(Mr("yyt-select-value"))}" data-value="${oe(h.value)}">${oe(h.label)}</span>
        <i class="fa-solid fa-chevron-down yyt-select-arrow"></i>
      </button>
      <div ${L}>
        ${g.map(_=>{let k=_.value===String(h.value??"");return`
            <button ${Ws({type:"button",...y,class:Mr("yyt-select-option",p,y.class,k?"yyt-selected":""),"data-yyt-select-option":y["data-yyt-select-option"]??"true","data-value":_.value,role:y.role??"option","aria-selected":k?"true":"false",disabled:_.disabled?!0:y.disabled})}>
              <span class="${oe(Mr("yyt-option-text",f))}">${oe(_.label)}</span>
            </button>
          `}).join("")}
      </div>
    </div>
  `}function dt(t,e="yytCustomSelect"){let r=Z();if(!r||!xe(t))return;let s=$d(t),o=Jt(s);o.activeRoot&&t.has(o.activeRoot).length&&Vt(s),t.off(`.${e}`),r(s).off(`click.${e}`),r(s).off(`mousedown.${e}`),t.find('[data-yyt-enhanced-select="true"]').remove(),t.find(".yyt-native-select-bridge").each((n,a)=>{let i=r(a),l=i.attr("data-yyt-original-style");l!==void 0&&l?i.attr("style",l):i.removeAttr("style"),i.removeClass("yyt-native-select-bridge").removeAttr("data-yyt-original-style").removeAttr("data-yyt-select-key").removeData("yytCustomSelectOptions")})}function Dt(t,e={}){let r=Z();if(!r||!xe(t))return;let{namespace:s="yytCustomSelect",selectors:o=[]}=e,n=Array.isArray(o)?o.filter(Boolean):[o].filter(Boolean);if(n.length===0)return;dt(t,s);let a=n.join(", "),i=$d(t);t.find(a).each((l,c)=>{let d=r(c),u=String(d.attr("id")||"").trim(),y=u||`yyt-select-${Date.now()}-${l}`,p=u?`#${u}`:`[data-yyt-select-key="${y}"]`,f=`${y}-dropdown`,g=Fh(d.attr("class")),h=d.attr("style"),x=d.find("option").map((L,C)=>{let _=r(C);return{value:String(_.attr("value")??_.val()??""),label:_.text(),disabled:_.is(":disabled")}}).get();d.attr("data-yyt-original-style",h??"").attr("data-yyt-select-key",y).addClass("yyt-native-select-bridge").css("display","none").data("yytCustomSelectOptions",x);let T=jd({includeNative:!1,selectedValue:d.val(),options:x,disabled:d.is(":disabled"),placeholder:x[0]?.label||"\u8BF7\u9009\u62E9",rootAttributes:{class:Mr(g),style:h||void 0,"data-yyt-enhanced-select":"true","data-yyt-select-target":p},triggerAttributes:{id:`${y}-trigger`,"aria-controls":f},dropdownAttributes:{id:f}});d.after(T);let v=Rd(t,d);Ri(t,v,d)}),t.on(`click.${s}`,"[data-yyt-select-trigger]",l=>{l.preventDefault(),l.stopPropagation();let c=r(l.currentTarget);if(c.prop("disabled"))return;let d=c.closest("[data-yyt-custom-select]");Kd(d)}),t.on(`change.${s}`,a,l=>{let c=r(l.currentTarget),d=c.find("option").map((y,p)=>{let f=r(p);return{value:String(f.attr("value")??f.val()??""),label:f.text(),disabled:f.is(":disabled")}}).get();c.data("yytCustomSelectOptions",d);let u=Rd(t,c);Ri(t,u,c)}),r(i).off(`click.${s}`).on(`click.${s}`,l=>{if(Bd(l.target,i))return;let c=Wh(t);c?.length&&(Vt(i),c.filter(".yyt-open").removeClass("yyt-open").find("[data-yyt-select-trigger]").attr("aria-expanded","false"))}),r(i).off(`mousedown.${s}`,".yyt-select-portal-layer [data-yyt-select-option]").on(`mousedown.${s}`,".yyt-select-portal-layer [data-yyt-select-option]",l=>{l.preventDefault(),l.stopPropagation();let c=r(l.currentTarget);if(c.prop("disabled"))return;let d=Vh(t,c);if(!d?.length)return;let u=Dd(t,d);if(!u?.length)return;let y=String(c.attr("data-value")||"");u.val(y).trigger("change"),Ri(t,d,u),$i(d)})}function Jh(t,e=ds){if(!Z()||!xe(t))return{url:"",apiKey:"",model:"",useMainApi:!0,stream:!1,max_tokens:4096,temperature:.7,top_p:.9};let s=t.find(`#${e}-model`).val()?.trim()||"",o=t.find(`#${e}-model-select`);return o.is(":visible")&&(s=o.val()||s),{url:t.find(`#${e}-api-url`).val()?.trim()||"",apiKey:t.find(`#${e}-api-key`).val()||"",model:s,useMainApi:t.find(`#${e}-use-main-api`).is(":checked"),stream:t.find(`#${e}-stream`).is(":checked"),max_tokens:parseInt(t.find(`#${e}-max-tokens`).val())||4096,temperature:parseFloat(t.find(`#${e}-temperature`).val())??.7,top_p:parseFloat(t.find(`#${e}-top-p`).val())??.9}}function Xh(t,e,r=ds){if(!Z()||!xe(t)||!e)return;t.find(`#${r}-api-url`).val(e.url||""),t.find(`#${r}-api-key`).val(e.apiKey||""),t.find(`#${r}-model`).val(e.model||""),t.find(`#${r}-stream`).prop("checked",e.stream===!0),t.find(`#${r}-max-tokens`).val(e.max_tokens||4096),t.find(`#${r}-temperature`).val(e.temperature??.7),t.find(`#${r}-top-p`).val(e.top_p??.9);let o=e.useMainApi??!0;t.find(`#${r}-use-main-api`).prop("checked",o);let a=t.find(`#${r}-custom-api-fields`);o?a.addClass("yyt-disabled").find("input, button, select").prop("disabled",!0):a.removeClass("yyt-disabled").find("input, button, select").prop("disabled",!1),t.find(`#${r}-model`).show(),t.find(`#${r}-model-select`).hide()}function zo(t){let{id:e,title:r,body:s,width:o="380px",wide:n=!1,dialogClass:a="",bodyClass:i="",footerClass:l=""}=t;return`
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
  `}function Ko(t,e,r={}){if(!Z())return()=>{};let o=t.find(`#${e}-overlay`),n=()=>{o.remove(),a?.removeEventListener("keydown",i),r.onClose&&r.onClose()};o.find(`#${e}-close, #${e}-cancel`).on("click",n),o.on("click",function(l){l.target===this&&n()}),o.find(`#${e}-save`).on("click",function(){r.onSave&&r.onSave(n)});let a=o[0]?.ownerDocument||document,i=l=>{l.key==="Escape"&&(l.stopPropagation(),n())};return a.addEventListener("keydown",i),n}function yr(t,e,r={}){let{confirmText:s="\u786E\u5B9A",cancelText:o="\u53D6\u6D88",danger:n=!1,width:a="380px"}=r,i=Z(),l=pr();if(!i||!l?.body)return Promise.resolve(!1);let c=`yyt-confirm-${++Fd}`;return new Promise(d=>{let u=!1,y=h=>{u||(u=!0,g.remove(),p?.focus(),d(h))},p=l.activeElement,f=`
      <div class="yyt-dialog-overlay" id="${c}-overlay">
        <div class="yyt-dialog" style="${a!=="380px"?`width: ${a};`:""} max-height: calc(100vh - 32px);">
          <div class="yyt-dialog-header">
            <span class="yyt-dialog-title">${oe(t)}</span>
            <button class="yyt-dialog-close" id="${c}-close">
              <i class="fa-solid fa-times"></i>
            </button>
          </div>
          <div class="yyt-dialog-body">
            <div style="color: var(--yyt-text-secondary); font-size: 13px; line-height: 1.6;">${oe(e)}</div>
          </div>
          <div class="yyt-dialog-footer">
            <button class="yyt-btn yyt-btn-secondary" id="${c}-cancel">${oe(o)}</button>
            <button class="yyt-btn ${n?"yyt-btn-danger":"yyt-btn-primary"}" id="${c}-confirm">${oe(s)}</button>
          </div>
        </div>
      </div>`,g=i(f).appendTo(l.body);g.find(`#${c}-confirm`).on("click",()=>y(!0)),g.find(`#${c}-cancel, #${c}-close`).on("click",()=>y(!1)),g.on("click",function(h){h.target===this&&y(!1)}),g.on("keydown",h=>{h.key==="Escape"&&(h.stopPropagation(),y(!1)),h.key==="Enter"&&(h.stopPropagation(),y(!0))}),g.find(`#${c}-${n?"cancel":"confirm"}`).trigger("focus")})}function Qh(t,e,r={}){let{defaultValue:s="",placeholder:o="",confirmText:n="\u786E\u5B9A",cancelText:a="\u53D6\u6D88",width:i="380px"}=r,l=Z(),c=pr();if(!l||!c?.body)return Promise.resolve(null);let d=`yyt-prompt-${++Fd}`;return new Promise(u=>{let y=!1,p=v=>{y||(y=!0,h.remove(),f?.focus(),u(v))},f=c.activeElement,g=`
      <div class="yyt-dialog-overlay" id="${d}-overlay">
        <div class="yyt-dialog" style="${i!=="380px"?`width: ${i};`:""} max-height: calc(100vh - 32px);">
          <div class="yyt-dialog-header">
            <span class="yyt-dialog-title">${oe(t)}</span>
            <button class="yyt-dialog-close" id="${d}-close">
              <i class="fa-solid fa-times"></i>
            </button>
          </div>
          <div class="yyt-dialog-body">
            ${e?`<div style="color: var(--yyt-text-secondary); font-size: 13px; line-height: 1.6;">${oe(e)}</div>`:""}
            <input class="yyt-input" id="${d}-input" type="text" value="${oe(s)}" placeholder="${oe(o)}" />
          </div>
          <div class="yyt-dialog-footer">
            <button class="yyt-btn yyt-btn-secondary" id="${d}-cancel">${oe(a)}</button>
            <button class="yyt-btn yyt-btn-primary" id="${d}-confirm">${oe(n)}</button>
          </div>
        </div>
      </div>`,h=l(g).appendTo(c.body),x=h.find(`#${d}-input`),T=()=>{let v=x.val().trim();p(v||null)};h.find(`#${d}-confirm`).on("click",T),h.find(`#${d}-cancel, #${d}-close`).on("click",()=>p(null)),h.on("click",function(v){v.target===this&&p(null)}),x.on("keydown",v=>{v.key==="Enter"&&(v.stopPropagation(),T())}),h.on("keydown",v=>{v.key==="Escape"&&(v.stopPropagation(),p(null))}),x.trigger("focus").trigger("select")})}function Zh(t,e,r){if(t.prop("disabled")&&t.data("yytLoading"))return Promise.resolve();let s=t.html(),o=t.outerWidth();if(t.prop("disabled",!0).data("yytLoading",!0),t.css("min-width",o+"px"),r)t.html(`<i class="fa-solid fa-spinner fa-spin" style="margin-right:4px"></i>${oe(r)}`);else{let n=t.find("i.fa-solid, i.fa-regular").first();n.length?(n.data("yytOriginalClass",n.attr("class")),n.attr("class","fa-solid fa-spinner fa-spin")):t.html(`<i class="fa-solid fa-spinner fa-spin" style="margin-right:4px"></i>${s}`)}return Promise.resolve().then(()=>e()).finally(()=>{if(r)t.html(s);else{let n=t.find("i.fa-spinner"),a=n.data("yytOriginalClass");a?n.attr("class",a).removeData("yytOriginalClass"):t.html(s)}t.prop("disabled",!1).removeData("yytLoading").css("min-width","")})}function Uo(t,e){let r=new Blob([t],{type:"application/json"}),s=URL.createObjectURL(r),o=document.createElement("a");o.href=s,o.download=e,o.click(),URL.revokeObjectURL(s)}function jo(t){return new Promise((e,r)=>{let s=new FileReader;s.onload=o=>e(o.target.result),s.onerror=o=>r(new Error("\u6587\u4EF6\u8BFB\u53D6\u5931\u8D25")),s.readAsText(t)})}var Kh,ds,Mi,cs,Md,Pd,Fd,Xe=N(()=>{H();Kh=R.createScope("UIUtils"),ds="youyou_toolkit",Mi=class{constructor(e={}){this._state={...e}}get(e){return this._state[e]}set(e,r){return this._state[e]=r,this}reset(e={}){return this._state={...e},this}toJSON(){return{...this._state}}};cs=null;Md=new WeakMap,Pd="yyt-select-portal-layer";Fd=0});var Hs,Fo,Ft,Di=N(()=>{Je();Xe();H();Hs=R.createScope("UIManager"),Fo=class{constructor(){this.components=new Map,this.activeInstances=new Map,this.dependencies={},this.currentTab="main",this.currentSubTab={},this.initialized=!1}init(e={}){this.initialized||(this.dependencies=e.services||{},this._subscribeEvents(),this.initialized=!0,K.emit(B.UI_INITIALIZED),Hs.log("\u521D\u59CB\u5316\u5B8C\u6210"))}register(e,r){return!e||!r?(Hs.warn("\u65E0\u6548\u7684\u7EC4\u4EF6\u6CE8\u518C"),!1):(this.components.set(e,{id:e,...r,render:r.render||(()=>""),bindEvents:r.bindEvents||(()=>{}),destroy:r.destroy||(()=>{}),getStyles:r.getStyles||(()=>"")}),!0)}unregister(e){this.destroyInstance(e),this.components.delete(e)}getComponent(e){return this.components.get(e)}render(e,r,s={}){let o=Z();if(!o){Hs.error("jQuery\u4E0D\u53EF\u7528");return}let n=this.components.get(e);if(!n){Hs.error(`\u7EC4\u4EF6\u4E0D\u5B58\u5728: ${e}`);let i;typeof r=="string"?i=o(r):r&&r.jquery?i=r:r&&(i=o(r)),i?.length&&i.html(`<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u7EC4\u4EF6\u672A\u6CE8\u518C\uFF1A${e}</span></div>`);return}let a;if(typeof r=="string"?a=o(r):r&&r.jquery?a=r:r&&(a=o(r)),!xe(a)){Hs.warn("\u5BB9\u5668\u4E0D\u5B58\u5728");return}this.activeInstances.forEach((i,l)=>{i?.container?.length&&a.length&&i.container[0]===a[0]&&l!==e&&this.destroyInstance(l)}),this.destroyInstance(e);try{if(typeof n.renderTo=="function")n.renderTo(a,{...s,dependencies:this.dependencies});else{let i=n.render({...s,dependencies:this.dependencies});a.html(i),n.bindEvents(a,this.dependencies)}}catch(i){Hs.error(`\u7EC4\u4EF6\u6E32\u67D3\u5931\u8D25: ${e}`,i),a.html(`<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u7EC4\u4EF6\u6E32\u67D3\u5931\u8D25\uFF1A${e}${i?.message?` - ${i.message}`:""}</span></div>`);return}this.activeInstances.set(e,{container:a,component:n,props:s}),K.emit(B.UI_RENDER_REQUESTED,{componentId:e})}destroyInstance(e){let r=this.activeInstances.get(e);r&&(r.component.destroy(r.container),this.activeInstances.delete(e))}destroyContainerInstance(e){let r=Z();if(!r||!e)return;let s;if(typeof e=="string"?s=r(e):e?.jquery?s=e:s=r(e),!s?.length)return;let o=[];this.activeInstances.forEach((n,a)=>{n?.container?.length&&n.container[0]===s[0]&&o.push(a)}),o.forEach(n=>this.destroyInstance(n))}switchTab(e){let r=this.currentTab;this.currentTab=e,K.emit(B.UI_TAB_CHANGED,{tabId:e,oldTab:r})}getCurrentTab(){return this.currentTab}switchSubTab(e,r){this.currentSubTab[e]=r,K.emit(B.UI_SUBTAB_CHANGED,{mainTab:e,subTab:r})}getCurrentSubTab(e){return this.currentSubTab[e]||""}getAllStyles(){let e="";return this.components.forEach((r,s)=>{r.getStyles&&(e+=r.getStyles())}),e}injectStyles(e=document){let r="yyt-component-styles";if(e.getElementById(r))return;let s=e.createElement("style");s.id=r,s.textContent=this.getAllStyles(),(e.head||e.documentElement).appendChild(s)}setDependency(e,r){this.dependencies[e]=r}getDependency(e){return this.dependencies[e]}_subscribeEvents(){K.on(B.PRESET_UPDATED,()=>{}),K.on(B.TOOL_UPDATED,()=>{})}},Ft=new Fo});function m(t,e={},...r){let s=document.createElement(t);if(e.className&&(s.className=e.className),e.text!==void 0&&e.text!==null&&(s.textContent=String(e.text)),e.html!==void 0&&e.html!==null&&(s.innerHTML=String(e.html)),e.attrs)for(let[o,n]of Object.entries(e.attrs))n==null||n===!1||s.setAttribute(o,n===!0?"":String(n));if(e.style&&Object.assign(s.style,e.style),e.dataset)for(let[o,n]of Object.entries(e.dataset))s.dataset[o]=String(n);for(let o of r)F(s,o);return s}function F(t,e){if(!(e==null||e===!1)){if(Array.isArray(e)){for(let r of e)F(t,r);return}if(typeof e=="string"||typeof e=="number"){t.appendChild(document.createTextNode(String(e)));return}if(e instanceof Node){t.appendChild(e);return}if(e&&e.el instanceof Node){t.appendChild(e.el);return}}}function Wd(){let t=new Map;return{on(e,r){return!e||typeof r!="function"?()=>{}:(t.has(e)||t.set(e,new Set),t.get(e).add(r),()=>this.off(e,r))},off(e,r){let s=t.get(e);s&&s.delete(r)},emit(e,...r){let s=t.get(e);if(s)for(let o of[...s])try{o(...r)}catch{}},clear(){t.clear()}}}function Li(t,e){if(!t||!e)return null;if(t._id===e)return t;let r=t._children;if(!r)return null;let s=r instanceof Map?[...r.values()]:Array.isArray(r)?r:[];for(let o of s){let n=Li(o,e);if(n)return n}return null}function Ne({id:t=null,kind:e="control"}={}){let r=Wd();return{_id:t||null,_kind:e,_children:null,_emitter:r,on(s,o){return r.on(s,o)},off(s,o){r.off(s,o)},getControl(s){return Li(this,s)},get(){},set(s){},destroy(){if(r.clear(),this._children){let s=this._children instanceof Map?[...this._children.values()]:Array.isArray(this._children)?this._children:[];for(let o of s)try{o?.destroy?.()}catch{}this._children instanceof Map?this._children.clear():Array.isArray(this._children)&&(this._children.length=0)}if(this.el?.parentNode)try{this.el.parentNode.removeChild(this.el)}catch{}}}}var ut=N(()=>{});function fe(t={}){let{id:e=null,label:r="",icon:s=null,variant:o="default",size:n="normal",disabled:a=!1,title:i=null,onClick:l=null}=t,c=["yyt-btn"];o==="primary"?c.push("yyt-btn-primary"):o==="danger"?c.push("yyt-btn-danger"):o==="ghost"&&c.push("yyt-btn-secondary"),n==="small"&&c.push("yyt-btn-small");let d=m("button",{className:c.join(" "),attrs:{type:"button",disabled:a?"disabled":null,title:i}}),u=null;s&&(u=m("span",{className:"yyt-btn-icon-glyph",text:s}),d.appendChild(u));let y=m("span",{text:r});d.appendChild(y);let p={...Ne({id:e,kind:"button"}),el:d,setLabel(f){y.textContent=String(f||"")},setIcon(f){u&&(u.textContent=String(f||""))},setDisabled(f){f?d.setAttribute("disabled","disabled"):d.removeAttribute("disabled")},isDisabled(){return d.hasAttribute("disabled")},get(){return y.textContent},set(f){this.setLabel(f)}};return d.addEventListener("click",f=>{if(!d.hasAttribute("disabled")){if(typeof l=="function")try{l(f,p)}catch{}p._emitter.emit("click",f)}}),p}var Hd=N(()=>{ut()});function et(t={}){let{id:e=null,placeholder:r="",value:s="",type:o="text",disabled:n=!1,maxLength:a=null,onInput:i=null,onChange:l=null}=t,c=m("input",{className:"yyt-input",attrs:{type:o,placeholder:r,disabled:n?"disabled":null,maxlength:a!=null?String(a):null}});c.value=s==null?"":String(s);let d={...Ne({id:e,kind:"textInput"}),el:c,get(){return c.value},set(u,{silent:y=!1}={}){c.value=u==null?"":String(u),y||d._emitter.emit("change",c.value)},setPlaceholder(u){c.placeholder=u==null?"":String(u)},setDisabled(u){c.disabled=!!u},focus(){c.focus()},select(){c.select()}};return c.addEventListener("input",()=>{if(typeof i=="function")try{i(c.value,d)}catch{}d._emitter.emit("input",c.value)}),c.addEventListener("change",()=>{if(typeof l=="function")try{l(c.value,d)}catch{}d._emitter.emit("change",c.value)}),c.addEventListener("blur",()=>d._emitter.emit("blur",c.value)),d}var Yd=N(()=>{ut()});function Qe(t={}){let{id:e=null,options:r=[],value:s="",placeholder:o=null,disabled:n=!1,onChange:a=null}=t,i=m("select",{className:"yyt-select",attrs:{disabled:n?"disabled":null}});function l(d,u){if(i.innerHTML="",o!==null){let y=m("option",{text:o,attrs:{value:"",disabled:"disabled",selected:u?null:"selected"}});i.appendChild(y)}for(let y of d){let p=m("option",{text:y.label??String(y.value),attrs:{value:String(y.value),selected:String(y.value)===String(u)?"selected":null,disabled:y.disabled?"disabled":null}});i.appendChild(p)}}l(r,s);let c={...Ne({id:e,kind:"select"}),el:i,get(){return i.value},set(d,{silent:u=!1}={}){i.value=d==null?"":String(d),u||c._emitter.emit("change",i.value)},setOptions(d,u){l(d||[],u??i.value)},setDisabled(d){i.disabled=!!d}};return i.addEventListener("change",()=>{if(typeof a=="function")try{a(i.value,c)}catch(d){typeof console<"u"&&console.error&&console.error("[selectInput] onChange \u5F02\u5E38",d)}c._emitter.emit("change",i.value)}),c}var Gd=N(()=>{ut()});function St(t={}){let{id:e=null,label:r="",hint:s="",checked:o=!1,disabled:n=!1,onChange:a=null}=t,i=m("label",{className:"yyt-toggle-label"});r&&i.appendChild(m("span",{text:r})),s&&i.appendChild(m("span",{className:"yyt-toggle-hint",text:s}));let l=m("input",{attrs:{type:"checkbox",disabled:n?"disabled":null}});l.checked=!!o;let c=m("span",{className:"yyt-toggle-slider"}),d=m("label",{className:"yyt-toggle"});d.appendChild(l),d.appendChild(c);let u=m("div",{className:"yyt-toggle-row"});u.appendChild(i),u.appendChild(d),i.addEventListener("click",p=>{p.preventDefault(),!l.disabled&&(l.checked=!l.checked,l.dispatchEvent(new Event("change",{bubbles:!0})))});let y={...Ne({id:e,kind:"toggle"}),el:u,get(){return!!l.checked},set(p,{silent:f=!1}={}){l.checked=!!p,f||y._emitter.emit("change",!!p)},setDisabled(p){l.disabled=!!p}};return l.addEventListener("change",()=>{let p=!!l.checked;if(typeof a=="function")try{a(p,y)}catch{}y._emitter.emit("change",p)}),y}var qd=N(()=>{ut()});var Vd=N(()=>{ut()});var Jd=N(()=>{ut()});function _t(t={}){let{id:e=null,label:r="",hint:s="",control:o=null,inline:n=!1}=t,a=m("div",{className:"yyt-form-group",style:n?{flexDirection:"row",alignItems:"center",gap:"12px"}:null});r&&a.appendChild(m("label",{text:r,style:n?{flex:"0 0 auto",minWidth:"120px"}:null}));let i=m("div",{style:n?{flex:"1",minWidth:"0"}:null});o&&F(i,o),a.appendChild(i),s&&a.appendChild(m("div",{className:"yyt-form-hint",text:s}));let l=o?[o]:[];return{...Ne({id:e,kind:"formRow"}),el:a,_children:l,get(){return o?.get?.()},set(c,d){o?.set?.(c,d)},setControl(c){i.innerHTML="",l.length=0,c&&(F(i,c),l.push(c))}}}var Xd=N(()=>{ut()});function Hn(t={}){let{id:e=null,icon:r=null,name:s="",desc:o="",active:n=!1,disabled:a=!1,actions:i=[],onClick:l=null}=t,c=["yyt-list-row"];n&&c.push("yyt-list-row-active"),a&&c.push("yyt-list-row-disabled");let d=m("div",{className:c.join(" "),style:a?{opacity:"0.5",pointerEvents:"none"}:null});r&&d.appendChild(m("div",{className:"yyt-list-row-icon",text:r}));let u=m("div",{className:"yyt-list-row-main"}),y=m("div",{className:"yyt-list-row-name",text:s});u.appendChild(y);let p=null;o&&(p=m("div",{className:"yyt-list-row-desc",text:o}),u.appendChild(p)),d.appendChild(u);let f=null;if(i&&i.length){f=m("div",{className:"yyt-list-row-actions"});for(let h of i)F(f,h);d.appendChild(f)}typeof l=="function"&&(d.style.cursor="pointer",d.addEventListener("click",h=>{h.target.closest(".yyt-list-row-actions")||(l(h,g),g._emitter.emit("click",h))}));let g={...Ne({id:e,kind:"listRow"}),el:d,_children:i||[],setName(h){y.textContent=h==null?"":String(h)},setDesc(h){if(p)p.textContent=h==null?"":String(h);else{if(!h)return;p=m("div",{className:"yyt-list-row-desc",text:h}),u.appendChild(p)}},setActive(h){h?d.classList.add("yyt-list-row-active"):d.classList.remove("yyt-list-row-active")},setDisabled(h){h?(d.classList.add("yyt-list-row-disabled"),d.style.opacity="0.5",d.style.pointerEvents="none"):(d.classList.remove("yyt-list-row-disabled"),d.style.opacity="",d.style.pointerEvents="")}};return g}var Qd=N(()=>{ut()});function Wt(t={}){let{id:e=null,heading:r="",icon:s=null,actions:o=[],content:n=[]}=t,a=m("div",{className:"yyt-flow-section"}),i=null,l=null,c=null;if(r||s||o&&o.length){if(i=m("div",{className:"yyt-flow-heading"}),s&&(l=m("span",{className:"yyt-flow-heading-icon",text:s}),i.appendChild(l)),r&&i.appendChild(m("span",{text:r})),o&&o.length){c=m("div",{className:"yyt-flow-heading-action"});for(let p of o)F(c,p);i.appendChild(c)}a.appendChild(i)}let d=m("div",{className:"yyt-flow-content"}),u=[];for(let p of n||[])p&&(F(d,p),u.push(p));for(let p of o||[])p&&typeof p=="object"&&p.el&&u.push(p);return a.appendChild(d),{...Ne({id:e,kind:"flowSection"}),el:a,_children:u,appendContent(p){p&&(F(d,p),p&&typeof p=="object"&&p.el&&u.push(p))},clearContent(){d.innerHTML="";let p=u.filter(f=>(o||[]).includes(f));u.length=0;for(let f of p)u.push(f)},setHeading(p){if(!i)return;let f=i.querySelector("span:not(.yyt-flow-heading-icon):not(.yyt-flow-heading-action)");f&&(f.textContent=p==null?"":String(p))},setIcon(p){l&&(l.textContent=p==null?"":String(p))}}}var Zd=N(()=>{ut()});function Yn(){try{if(window.parent&&window.parent!==window&&window.parent.document)return window.parent.document}catch{}return document}function Oi({title:t,width:e,wide:r}){let s=`yyt-ctrl-dialog-${++eb}`,o=m("div",{className:"yyt-dialog-overlay",attrs:{"data-dialog-id":s}}),n={};e&&e!=="380px"&&(n.width=e),n.maxHeight="calc(100vh - 32px)";let a=m("div",{className:`yyt-dialog${r?" yyt-dialog-wide":""}`,style:n}),i=m("div",{className:"yyt-dialog-header"});i.appendChild(m("span",{className:"yyt-dialog-title",text:t||""}));let l=m("button",{className:"yyt-dialog-close",attrs:{type:"button","aria-label":"close"},html:'<i class="fa-solid fa-times"></i>'});i.appendChild(l),a.appendChild(i);let c=m("div",{className:"yyt-dialog-body"});a.appendChild(c);let d=m("div",{className:"yyt-dialog-footer"});return a.appendChild(d),o.appendChild(a),{overlay:o,body:c,footer:d,closeBtn:l,id:s}}function Bi(t){let e=Yn();return e?.body?(e.body.appendChild(t),!0):!1}function zi(t){if(t?.parentNode)try{t.parentNode.removeChild(t)}catch{}}function tb(t={}){let{title:e="\u8BF7\u786E\u8BA4",message:r="",confirmText:s="\u786E\u5B9A",cancelText:o="\u53D6\u6D88",danger:n=!1,width:a="380px"}=t;return new Promise(i=>{let{overlay:l,body:c,footer:d,closeBtn:u}=Oi({title:e,width:a,wide:!1}),y=(Yn()||document).activeElement,p=m("div",{style:{color:"var(--yyt-text-secondary)",fontSize:"13px",lineHeight:"1.6"},text:r});c.appendChild(p);let f=m("button",{className:"yyt-btn yyt-btn-secondary",attrs:{type:"button"},text:o}),g=m("button",{className:`yyt-btn ${n?"yyt-btn-danger":"yyt-btn-primary"}`,attrs:{type:"button"},text:s});d.appendChild(f),d.appendChild(g);let h=!1,x=T=>{if(!h){h=!0,zi(l);try{y?.focus()}catch{}i(T)}};if(g.addEventListener("click",()=>x(!0)),f.addEventListener("click",()=>x(!1)),u.addEventListener("click",()=>x(!1)),l.addEventListener("click",T=>{T.target===l&&x(!1)}),l.addEventListener("keydown",T=>{T.key==="Escape"?(T.stopPropagation(),x(!1)):T.key==="Enter"&&(T.stopPropagation(),x(!0))}),!Bi(l)){i(!1);return}(n?f:g).focus()})}function rb(t={}){let{title:e="\u8F93\u5165",message:r="",defaultValue:s="",placeholder:o="",confirmText:n="\u786E\u5B9A",cancelText:a="\u53D6\u6D88",validate:i=null,width:l="380px"}=t;return new Promise(c=>{let{overlay:d,body:u,footer:y,closeBtn:p}=Oi({title:e,width:l,wide:!1}),f=(Yn()||document).activeElement;r&&u.appendChild(m("div",{style:{color:"var(--yyt-text-secondary)",fontSize:"13px",lineHeight:"1.6",marginBottom:"8px"},text:r}));let g=m("input",{className:"yyt-input",attrs:{type:"text",placeholder:o}});g.value=String(s||""),u.appendChild(g);let h=m("div",{style:{color:"var(--yyt-danger, #f87171)",fontSize:"12px",marginTop:"6px",minHeight:"14px"}});u.appendChild(h);let x=m("button",{className:"yyt-btn yyt-btn-secondary",attrs:{type:"button"},text:a}),T=m("button",{className:"yyt-btn yyt-btn-primary",attrs:{type:"button"},text:n});y.appendChild(x),y.appendChild(T);let v=!1,L=_=>{if(!v){v=!0,zi(d);try{f?.focus()}catch{}c(_)}},C=()=>{let _=g.value.trim();if(typeof i=="function"){let k=i(_);if(k){h.textContent=k,g.focus();return}}L(_||null)};if(T.addEventListener("click",C),x.addEventListener("click",()=>L(null)),p.addEventListener("click",()=>L(null)),d.addEventListener("click",_=>{_.target===d&&L(null)}),g.addEventListener("keydown",_=>{_.key==="Enter"&&(_.stopPropagation(),C())}),d.addEventListener("keydown",_=>{_.key==="Escape"&&(_.stopPropagation(),L(null))}),!Bi(d)){c(null);return}g.focus(),g.select()})}function sb(t={}){let{title:e="",body:r=null,buttons:s=[],width:o="480px",wide:n=!1,onMounted:a=null}=t,{overlay:i,body:l,footer:c,closeBtn:d}=Oi({title:e,width:o,wide:n}),u=(Yn()||document).activeElement;r&&F(l,r);let y=!1,p,f=new Promise(h=>{p=h}),g=h=>{if(!y){y=!0,zi(i);try{u?.focus()}catch{}p(h)}};for(let h of s){let x=h.variant==="primary"?"yyt-btn-primary":h.variant==="danger"?"yyt-btn-danger":"yyt-btn-secondary",T=m("button",{className:`yyt-btn ${x}`,attrs:{type:"button"},text:h.label||""});T.addEventListener("click",()=>{try{h.onClick?.(g,l)}catch(v){console.error("[dialog.custom] button onClick error",v),g(null)}}),c.appendChild(T)}if(d.addEventListener("click",()=>g(null)),i.addEventListener("click",h=>{h.target===i&&g(null)}),i.addEventListener("keydown",h=>{h.key==="Escape"&&(h.stopPropagation(),g(null))}),!Bi(i))p(null);else if(typeof a=="function")try{a({overlay:i,body:l,close:g})}catch{}return{el:i,body:l,close:g,result:f}}var eb,Me,Gn=N(()=>{ut();eb=0;Me={confirm:tb,prompt:rb,custom:sb}});function Ki(t={}){let{id:e=null,items:r=[],align:s="start",gap:o="8px",wrap:n=!0}=t,i=m("div",{className:"yyt-toolbar",style:{display:"flex",alignItems:"center",justifyContent:{start:"flex-start",end:"flex-end",center:"center","space-between":"space-between"}[s]||"flex-start",gap:o,flexWrap:n?"wrap":"nowrap"}}),l=[];for(let c of r)c&&(F(i,c),l.push(c));return{...Ne({id:e,kind:"toolbar"}),el:i,_children:l,addItem(c){c&&(F(i,c),l.push(c))},clear(){for(;i.firstChild;)i.removeChild(i.firstChild);for(let c of l)try{c?.destroy?.()}catch{}l.length=0}}}var eu=N(()=>{ut()});function Ui(t={}){let{id:e=null,name:r="",desc:s="",active:o=!1,disabled:n=!1,builtin:a=!1,readonly:i=!1,metaChips:l=[],actions:c=[],onClick:d=null}=t,u=a||i,y=["yyt-list-row","yyt-preset-list-item"];o&&y.push("yyt-list-row-active"),n&&y.push("yyt-list-row-disabled"),u&&y.push("yyt-preset-list-item-readonly");let p=m("div",{className:y.join(" "),style:n?{opacity:"0.5",pointerEvents:"none"}:null}),f=m("span",{className:"yyt-preset-dot",style:{width:"8px",height:"8px",borderRadius:"50%",flexShrink:"0",marginRight:"8px",background:o?"var(--yyt-accent, #7bb7ff)":"transparent",border:o?"none":"1px solid var(--yyt-border, rgba(255,255,255,0.15))",transition:"background 0.15s ease"}});p.appendChild(f);let g=m("div",{className:"yyt-list-row-main",style:{flex:"1",minWidth:"0"}}),h=m("div",{style:{display:"flex",alignItems:"center",gap:"8px"}}),x=m("div",{className:"yyt-list-row-name",text:r,style:{fontWeight:"600"}});h.appendChild(x),a&&h.appendChild(m("span",{className:"yyt-preset-badge yyt-preset-badge-builtin",text:"\u5185\u7F6E",style:{fontSize:"10px",padding:"2px 6px",borderRadius:"999px",background:"var(--yyt-surface-3, rgba(255,255,255,0.06))",color:"var(--yyt-text-muted, rgba(255,255,255,0.5))",border:"1px solid var(--yyt-border, rgba(255,255,255,0.1))"}})),g.appendChild(h);let T=null;s&&(T=m("div",{className:"yyt-list-row-desc",text:s}),g.appendChild(T)),p.appendChild(g);let v=null;if(Array.isArray(l)&&l.length){v=m("div",{className:"yyt-preset-meta-chips",style:{display:"flex",gap:"6px",flexWrap:"wrap"}});for(let k of l)k&&v.appendChild(m("span",{className:"yyt-preset-meta-chip",text:String(k),style:{fontSize:"11px",padding:"2px 8px",borderRadius:"999px",background:"var(--yyt-surface-2, rgba(255,255,255,0.04))",color:"var(--yyt-text-secondary, rgba(255,255,255,0.6))",border:"1px solid var(--yyt-border-soft, rgba(255,255,255,0.04))"}}));p.appendChild(v)}let L=null,C=u?c.filter(k=>k?._kind!=="button"||!k._destructive):c;if(C&&C.length){L=m("div",{className:"yyt-list-row-actions"});for(let k of C)F(L,k);p.appendChild(L)}typeof d=="function"&&(p.style.cursor="pointer",p.addEventListener("click",k=>{k.target.closest(".yyt-list-row-actions")||(d(k,_),_._emitter.emit("click",k))}));let _={...Ne({id:e,kind:"presetListItem"}),el:p,_children:c||[],setActive(k){k?p.classList.add("yyt-list-row-active"):p.classList.remove("yyt-list-row-active"),f.style.background=k?"var(--yyt-accent, #7bb7ff)":"transparent",f.style.border=k?"none":"1px solid var(--yyt-border, rgba(255,255,255,0.15))"},setName(k){x.textContent=k==null?"":String(k)},setDesc(k){if(T)T.textContent=k==null?"":String(k);else{if(!k)return;T=m("div",{className:"yyt-list-row-desc",text:k}),g.appendChild(T)}},setDisabled(k){k?(p.classList.add("yyt-list-row-disabled"),p.style.opacity="0.5",p.style.pointerEvents="none"):(p.classList.remove("yyt-list-row-disabled"),p.style.opacity="",p.style.pointerEvents="")}};return _}var tu=N(()=>{ut()});function ji(t={}){let{id:e=null,values:r=[],placeholder:s="\u8F93\u5165\u540E\u56DE\u8F66\u6DFB\u52A0",suggestions:o=null,allowDuplicates:n=!1,maxChips:a=0,chipVariant:i="default",onChange:l=null,onAdd:c=null,onRemove:d=null}=t,u=o&&o.length?`yyt-chip-dl-${++ob}`:null,y=m("div",{className:"yyt-chip-group",style:{display:"flex",flexWrap:"wrap",gap:"6px",padding:"6px 8px",borderRadius:"var(--yyt-radius-sm, 6px)",border:"1px solid var(--yyt-control-border, rgba(255,255,255,0.08))",background:"var(--yyt-control-bg, transparent)",minHeight:"36px",alignItems:"center"}}),p=[],f={type:"text",placeholder:s,autocomplete:"off"};u&&(f.list=u);let g=m("input",{className:"yyt-chip-input",attrs:f,style:{flex:"1 1 auto",minWidth:"120px",border:"none",outline:"none",background:"transparent",color:"var(--yyt-text, inherit)",fontSize:"12px",padding:"4px 0"}}),h=null;if(u){h=m("datalist",{attrs:{id:u}});for(let M of o)h.appendChild(m("option",{attrs:{value:String(M)}}));y.appendChild(h)}function x(){return i==="danger"?"rgba(248,113,113,0.12)":i==="soft"?"var(--yyt-surface-2, rgba(255,255,255,0.04))":"var(--yyt-accent-soft, rgba(123,183,255,0.15))"}function T(){return i==="danger"?"rgba(248,113,113,0.25)":"var(--yyt-border, rgba(255,255,255,0.1))"}function v(){return i==="danger"?"#f87171":"var(--yyt-text, inherit)"}function L(M){let S=m("span",{className:"yyt-chip",style:{display:"inline-flex",alignItems:"center",gap:"4px",padding:"3px 4px 3px 10px",borderRadius:"999px",background:x(),border:`1px solid ${T()}`,color:v(),fontSize:"11px",fontWeight:"500"}});S.appendChild(m("span",{text:M,style:{lineHeight:"1"}}));let U=m("button",{attrs:{type:"button","aria-label":"remove"},text:"\xD7",style:{border:"none",background:"transparent",color:"inherit",cursor:"pointer",padding:"0 4px",fontSize:"14px",lineHeight:"1",opacity:"0.7"}});return U.addEventListener("click",j=>{j.stopPropagation(),k(M)}),U.addEventListener("mouseenter",()=>{U.style.opacity="1"}),U.addEventListener("mouseleave",()=>{U.style.opacity="0.7"}),S.appendChild(U),S}function C(){let M=[];for(let S of y.children)S===g||S===h||M.push(S);for(let S of M)y.removeChild(S);for(let S of p)y.insertBefore(L(S),g)}function _(M){let S=String(M||"").trim();if(!S||!n&&p.includes(S)||a>0&&p.length>=a)return!1;p.push(S),C();try{c?.(S,p.slice())}catch{}try{l?.(p.slice())}catch{}return q._emitter.emit("change",p.slice()),!0}function k(M){let S=p.indexOf(M);if(S<0)return!1;p.splice(S,1),C();try{d?.(M,p.slice())}catch{}try{l?.(p.slice())}catch{}return q._emitter.emit("change",p.slice()),!0}function W(){if(p.length!==0){p=[],C();try{l?.([])}catch{}q._emitter.emit("change",[])}}for(let M of r){let S=String(M||"").trim();S&&(!n&&p.includes(S)||p.push(S))}y.appendChild(g),C(),g.addEventListener("keydown",M=>{if(M.key==="Enter"||M.key===","){M.preventDefault();let S=g.value.trim();S&&_(S)&&(g.value="")}else M.key==="Backspace"&&!g.value&&p.length&&k(p[p.length-1])}),g.addEventListener("blur",()=>{let M=g.value.trim();M&&_(M)&&(g.value="")}),y.addEventListener("click",M=>{M.target===y&&g.focus()});let q={...Ne({id:e,kind:"chipGroup"}),el:y,get(){return p.slice()},set(M){p=[];for(let S of Array.isArray(M)?M:[]){let U=String(S||"").trim();U&&(!n&&p.includes(U)||p.push(U))}C();try{l?.(p.slice())}catch{}q._emitter.emit("change",p.slice())},addChip:_,removeChip:k,clear:W,setSuggestions(M){if(h){for(;h.firstChild;)h.removeChild(h.firstChild);for(let S of M||[])h.appendChild(m("option",{attrs:{value:String(S)}}))}}};return q}var ob,ru=N(()=>{ut();ob=0});var fr=N(()=>{Hd();Yd();Gd();qd();Vd();Jd();Xd();Qd();Zd();Gn();eu();tu();ru();ut()});function su(t){return t?t.length!==void 0&&typeof t.get=="function"?t.get(0):t:null}function nb(t){return typeof t=="string"&&t.startsWith("builtin_")}function Pr(t={}){let{id:e,kind:r="generic",panelTitle:s="\u9884\u8BBE\u7BA1\u7406",panelHint:o="",store:n,renderEditor:a,renderExtras:i=null,renderListItemMeta:l=null,hasSwitchToButton:c=!1,onSwitchTo:d=null}=t;if(!n||typeof n.listPresets!="function")throw new Error("createPresetManagerPanel: store \u7F3A\u5C11\u5FC5\u8981\u7684 listPresets \u65B9\u6CD5");if(typeof a!="function")throw new Error("createPresetManagerPanel: \u5FC5\u987B\u63D0\u4F9B renderEditor");return{id:e,kind:r,renderTo(u){let y=su(u);if(!y)return;if(y._yytPresetPanelCleanup)try{y._yytPresetPanelCleanup()}catch{}let p=()=>this.renderTo(u),f=n.listPresets(),g=typeof n.getCurrentPresetId=="function"?n.getCurrentPresetId():"",h=m("div",{className:"yyt-preset-manager-panel",style:{display:"flex",flexDirection:"column",gap:"14px"}});if(s||o){let M=m("div",{style:{display:"flex",flexDirection:"column",gap:"4px"}});s&&M.appendChild(m("div",{text:s,style:{fontSize:"15px",fontWeight:"700",color:"var(--yyt-text)"}})),o&&M.appendChild(m("div",{text:o,style:{fontSize:"12px",color:"var(--yyt-text-secondary)",lineHeight:"1.6"}})),h.appendChild(M)}let x=[],T=m("div",{style:{display:"flex",flexDirection:"column"}});if(f.length===0)T.appendChild(m("div",{text:'\u6682\u65E0\u9884\u8BBE\u3002\u70B9\u51FB\u4E0B\u65B9"\u65B0\u5EFA"\u521B\u5EFA\u7B2C\u4E00\u4E2A\u9884\u8BBE\u3002',style:{fontSize:"12px",color:"var(--yyt-text-muted)",padding:"12px 0",textAlign:"center"}}));else for(let M of f){let S=M.id===g,U=nb(M.id),j=typeof l=="function"?l(M)||[]:[],Q=[];c&&typeof d=="function"&&Q.push(fe({label:S?"\u2713 \u5DF2\u52A0\u8F7D":"\u52A0\u8F7D",size:"small",variant:S?"ghost":"primary",disabled:S,onClick:ce=>{ce.stopPropagation();try{d(M.id)}catch(de){ps.warn("onSwitchTo \u5F02\u5E38",{err:de})}p()}})),Q.push(fe({label:"\u590D\u5236",size:"small",variant:"ghost",title:"\u590D\u5236\u4E3A\u7528\u6237\u9884\u8BBE",onClick:async ce=>{ce.stopPropagation();try{let de=n.duplicatePreset(M.id);de?.id&&typeof n.setCurrentPresetId=="function"&&n.setCurrentPresetId(de.id),p()}catch(de){ps.warn("duplicate \u5F02\u5E38",{err:de})}}})),U||(Q.push(fe({label:"\u270E",size:"small",variant:"ghost",title:"\u91CD\u547D\u540D",onClick:async ce=>{ce.stopPropagation();let de=await Me.prompt({title:"\u91CD\u547D\u540D\u9884\u8BBE",defaultValue:M.name,placeholder:"\u9884\u8BBE\u540D",validate:st=>st?null:"\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"});de&&de!==M.name&&(n.renamePreset(M.id,de),p())}})),Q.push(fe({label:"\xD7",size:"small",variant:"ghost",title:"\u5220\u9664",onClick:async ce=>{ce.stopPropagation(),await Me.confirm({title:"\u5220\u9664\u9884\u8BBE",message:`\u786E\u8BA4\u5220\u9664\u300C${M.name}\u300D\uFF1F\u6B64\u64CD\u4F5C\u4E0D\u53EF\u64A4\u9500\u3002`,confirmText:"\u5220\u9664",danger:!0})&&(n.deletePreset(M.id),p())}})));let Ae=Ui({id:M.id,name:M.name,desc:M.description,active:S,builtin:U,metaChips:j,actions:Q,onClick:()=>{typeof n.setCurrentPresetId=="function"&&n.setCurrentPresetId(M.id),p()}});T.appendChild(Ae.el)}let v=fe({label:"+ \u65B0\u5EFA\u9884\u8BBE",size:"small",variant:"primary",onClick:async()=>{let M=await Me.prompt({title:"\u65B0\u5EFA\u9884\u8BBE",placeholder:"\u9884\u8BBE\u540D\uFF08\u5FC5\u586B\uFF09",validate:S=>S?null:"\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"});if(M)try{let S=n.createPreset({name:M});S?.id&&typeof n.setCurrentPresetId=="function"&&n.setCurrentPresetId(S.id),p()}catch(S){ps.warn("createPreset \u5931\u8D25",{err:S}),await Me.confirm({title:"\u521B\u5EFA\u5931\u8D25",message:String(S?.message||S),confirmText:"\u786E\u5B9A"})}}}),L=Wt({heading:"\u9884\u8BBE\u9009\u62E9",icon:"\u{1F4CB}",actions:[v.el],content:[T]});x.push(L),h.appendChild(L.el);let C=g?f.find(M=>M.id===g):null;if(C){let M=null;try{M=a(C,{readonly:!1,onChange:U=>{if(!(!U||typeof U!="object"))try{n.updatePreset(C.id,U)}catch(j){ps.warn("updatePreset \u5931\u8D25",{err:j})}},refresh:p})}catch(U){ps.error("renderEditor \u5F02\u5E38",{err:U}),M=m("div",{text:`\u7F16\u8F91\u5668\u6E32\u67D3\u5F02\u5E38\uFF1A${U?.message||U}`,style:{color:"var(--yyt-danger, #f87171)",fontSize:"12px"}})}let S=Wt({heading:`\u7F16\u8F91\u300C${C.name}\u300D`,icon:"\u270E",content:[M].filter(Boolean)});if(x.push(S),h.appendChild(S.el),typeof i=="function"){let U=null;try{U=i(C,{refresh:p})}catch(j){ps.warn("renderExtras \u5F02\u5E38",{err:j})}if(U){let j=Wt({heading:"\u9644\u52A0",icon:"\u{1F527}",content:[U]});x.push(j),h.appendChild(j.el)}}}else f.length>0&&h.appendChild(m("div",{text:"\u8BF7\u5728\u4E0A\u65B9\u5217\u8868\u9009\u62E9\u4E00\u4E2A\u9884\u8BBE\u4EE5\u7F16\u8F91",style:{fontSize:"12px",color:"var(--yyt-text-muted)",padding:"16px",textAlign:"center",border:"1px dashed var(--yyt-border, rgba(255,255,255,0.08))",borderRadius:"var(--yyt-radius-sm, 6px)"}}));let _=fe({label:"\u2B06 \u5BFC\u5165",size:"small",variant:"ghost",onClick:async()=>{await ab(n,p)}}),k=fe({label:"\u2B07 \u5BFC\u51FA",size:"small",variant:"ghost",onClick:()=>{ib(n,r)}}),W=fe({label:"\u6E05\u7A7A\u5168\u90E8",size:"small",variant:"ghost",onClick:async()=>{await Me.confirm({title:"\u6E05\u7A7A\u6240\u6709\u9884\u8BBE",message:"\u6B64\u64CD\u4F5C\u4F1A\u5220\u9664\u6240\u6709\u7528\u6237\u9884\u8BBE\uFF08\u5185\u7F6E\u9884\u8BBE\u4E0D\u53D7\u5F71\u54CD\uFF09\uFF0C\u4E0D\u53EF\u64A4\u9500\u3002",confirmText:"\u6E05\u7A7A",danger:!0})&&typeof n.resetAll=="function"&&(n.resetAll(),p())}}),q=Ki({items:[_,k,W],align:"end",gap:"8px"});h.appendChild(q.el),y.innerHTML="",y.appendChild(h),y._yytPresetPanelCleanup=()=>{for(let M of x)try{M.destroy()}catch{}delete y._yytPresetPanelCleanup}},destroy(u){let y=su(u);if(y?._yytPresetPanelCleanup)try{y._yytPresetPanelCleanup()}catch{}},getStyles(){return""}}}async function ab(t,e){if(typeof t.importPresets!="function"){await Me.confirm({title:"\u4E0D\u652F\u6301\u5BFC\u5165",message:"\u5F53\u524D\u9884\u8BBE\u7C7B\u578B\u4E0D\u652F\u6301\u5BFC\u5165\u3002",confirmText:"\u786E\u5B9A"});return}let r=m("textarea",{className:"yyt-textarea",attrs:{placeholder:"\u7C98\u8D34\u5BFC\u51FA\u7684 JSON"},style:{width:"100%",minHeight:"180px",fontSize:"12px",fontFamily:"monospace"}}),s=Me.custom({title:"\u5BFC\u5165\u9884\u8BBE",width:"520px",body:r,buttons:[{label:"\u53D6\u6D88",variant:"ghost",onClick:n=>n(null)},{label:"\u4ECE\u6587\u4EF6\u2026",variant:"ghost",onClick:()=>{let n=m("input",{attrs:{type:"file",accept:"application/json,.json"}});n.addEventListener("change",()=>{let a=n.files?.[0];if(!a)return;let i=new FileReader;i.onload=()=>{r.value=String(i.result||""),r.focus()},i.readAsText(a)}),n.click()}},{label:"\u5BFC\u5165",variant:"primary",onClick:async n=>{let a=r.value.trim();if(!a){n(null);return}let i;try{i=JSON.parse(a)}catch(l){await Me.confirm({title:"JSON \u89E3\u6790\u5931\u8D25",message:String(l?.message||l),confirmText:"\u786E\u5B9A"});return}try{let l=t.importPresets(i);n(l)}catch(l){await Me.confirm({title:"\u5BFC\u5165\u5931\u8D25",message:String(l?.message||l),confirmText:"\u786E\u5B9A"})}}}]});setTimeout(()=>r.focus(),0);let o=await s.result;o&&(o.added>0||o.imported>0)&&e()}function ib(t,e){if(typeof t.exportAll!="function"){Me.confirm({title:"\u4E0D\u652F\u6301\u5BFC\u51FA",message:"\u5F53\u524D\u9884\u8BBE\u7C7B\u578B\u4E0D\u652F\u6301\u5BFC\u51FA\u3002",confirmText:"\u786E\u5B9A"});return}let r=t.exportAll(),s=JSON.stringify(r,null,2),o=m("textarea",{className:"yyt-textarea",style:{width:"100%",minHeight:"220px",fontSize:"12px",fontFamily:"monospace"}});o.value=s,o.readOnly=!0,Me.custom({title:`\u5BFC\u51FA ${e||""} \u9884\u8BBE`,width:"600px",body:o,buttons:[{label:"\u5173\u95ED",variant:"ghost",onClick:n=>n(null)},{label:"\u590D\u5236\u5230\u526A\u8D34\u677F",variant:"ghost",onClick:async()=>{try{await navigator.clipboard.writeText(s)}catch{o.select();try{document.execCommand("copy")}catch{}}}},{label:"\u4E0B\u8F7D JSON",variant:"primary",onClick:()=>{try{let n=new Blob([s],{type:"application/json"}),a=URL.createObjectURL(n),i=m("a",{attrs:{href:a,download:`${e||"preset"}_${Date.now()}.json`}});document.body.appendChild(i),i.click(),setTimeout(()=>{try{document.body.removeChild(i)}catch{}try{URL.revokeObjectURL(a)}catch{}},100)}catch(n){ps.warn("\u4E0B\u8F7D\u5931\u8D25",{err:n})}}}]})}var ps,Wo=N(()=>{fr();H();ps=R.createScope("PresetManagerBase")});var nu={};se(nu,{ApiPresetPanel:()=>ou,default:()=>ub});function cb(t,{onChange:e,readonly:r}){let s=m("div",{style:{display:"flex",flexDirection:"column",gap:"12px"}}),o=t.apiConfig||{};F(s,_t({label:"\u63CF\u8FF0",control:et({value:t.description||"",placeholder:"\u53EF\u9009 \u2014 \u5907\u6CE8\u7528\u9014",disabled:r,onChange:i=>e({description:i})})})),F(s,St({label:"\u4F7F\u7528\u4E3B API",hint:"\u5F00\u542F\u540E\u5FFD\u7565\u4E0B\u65B9 URL/Key/Model\uFF0C\u76F4\u63A5\u590D\u7528 SillyTavern \u4E3B\u8FDE\u63A5",checked:o.useMainApi!==!1,disabled:r,onChange:i=>e({apiConfig:{...o,useMainApi:i}})})),F(s,St({label:"\u6D41\u5F0F\u8F93\u51FA\uFF08stream\uFF09",hint:"\u9010\u5B57\u63A5\u6536\u54CD\u5E94",checked:o.stream===!0,disabled:r,onChange:i=>e({apiConfig:{...o,stream:i}})})),F(s,_t({label:"API URL",control:et({value:o.url||"",placeholder:"https://api.example.com/v1",disabled:r,onChange:i=>e({apiConfig:{...o,url:i}})})})),F(s,_t({label:"API Key",control:(()=>{let i=et({value:o.apiKey||"",placeholder:"sk-...",disabled:r,onChange:l=>e({apiConfig:{...o,apiKey:l}})});try{i.el.setAttribute("type","password")}catch{}return i})()})),F(s,_t({label:"\u6A21\u578B",control:et({value:o.model||"",placeholder:"gpt-4 / gemini-pro / claude-...",disabled:r,onChange:i=>e({apiConfig:{...o,model:i}})})}));let n=m("div",{style:{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:"10px"}});function a(i,l,c,d="1"){let u=m("div",{style:{display:"flex",flexDirection:"column",gap:"4px"}});u.appendChild(m("label",{text:i,style:{fontSize:"11px",color:"var(--yyt-text-secondary)",fontWeight:"600"}}));let y=m("input",{className:"yyt-input",attrs:{type:"number",step:d,disabled:r?"disabled":null},style:{padding:"6px 10px",fontSize:"12px"}});return y.value=String(o[l]??c),y.addEventListener("change",()=>{let p=Number(y.value);Number.isFinite(p)&&e({apiConfig:{...o,[l]:p}})}),u.appendChild(y),u}return n.appendChild(a("max_tokens","max_tokens",4096,"1")),n.appendChild(a("temperature","temperature",.7,"0.05")),n.appendChild(a("top_p","top_p",.9,"0.05")),F(s,n),s}function db(t){let e=t.apiConfig||{},r=[];return e.useMainApi!==!1?r.push("\u4E3B API"):r.push(e.model||"\u81EA\u5B9A\u4E49"),t.starred&&r.push("\u2605"),r}var Nr,lb,ou,ub,au=N(()=>{fr();Bo();H();Wo();Nr=R.createScope("ApiPresetPanel"),lb={listPresets(){return Rr().map(t=>({id:t.name,name:t.name,description:t.description||"",apiConfig:t.apiConfig||{},starred:t.starred===!0,createdAt:t.createdAt,updatedAt:t.updatedAt}))},getPreset(t){if(!t)return null;let e=ls(t);return e?{id:e.name,...e,description:e.description||""}:null},getCurrentPresetId(){return ki()||""},setCurrentPresetId(t){if(!t)return!1;try{return!!Fn(t)}catch(e){return Nr.warn("switchToPreset \u5931\u8D25",{err:e}),!1}},createPreset(t){let e=String(t?.name||"").trim();if(!e)return Nr.warn("createPreset: name \u7F3A\u5931"),null;let r=Un({name:e,description:t?.description||"",apiConfig:t?.apiConfig||{}});return r?.success?{id:r.preset.name,...r.preset,description:r.preset.description||""}:(Nr.warn("createPreset \u5931\u8D25",{msg:r?.message}),null)},updatePreset(t,e){if(!t)return null;let r=_i(t,e);return r?.success?{id:r.preset.name,...r.preset,description:r.preset.description||""}:(Nr.warn("updatePreset \u5931\u8D25",{id:t,msg:r?.message}),null)},deletePreset(t){if(!t)return!1;try{let e=jn(t);return!!(e?.success??e===!0)}catch(e){return Nr.warn("deletePreset \u5931\u8D25",{err:e}),!1}},duplicatePreset(t,e={}){if(!t)return null;let r=e.nameSuffix||"_\u526F\u672C",s=`${t}${r}`;try{let o=Ai(t,s);return o?.success?{id:o.preset.name,...o.preset,description:o.preset.description||""}:null}catch(o){return Nr.warn("duplicatePreset \u5931\u8D25",{err:o}),null}},renamePreset(t,e){if(!t||!e)return null;try{let r=Ei(t,e);return r?.success?{id:r.preset?.name||e,...r.preset,description:r.preset?.description||""}:null}catch(r){return Nr.warn("renamePreset \u5931\u8D25",{err:r}),null}},exportAll(){let t=Ci();try{return{version:1,exportedAt:Date.now(),presets:JSON.parse(t)}}catch{return{version:1,exportedAt:Date.now(),presets:[]}}},importPresets(t){if(!t||typeof t!="object")return{added:0};let e=Array.isArray(t.presets)?t.presets:[t],r=JSON.stringify(e);return{added:Ii(r,{overwrite:!1})?.imported||0}},resetAll(){let t=Rr();for(let e of t)try{jn(e.name)}catch{}}};ou=Pr({id:"apiPresetPanel",kind:"api",panelTitle:"API \u9884\u8BBE",panelHint:'\u7BA1\u7406\u591A\u7EC4 API \u8FDE\u63A5\u914D\u7F6E\u3002\u70B9\u51FB"\u52A0\u8F7D"\u6FC0\u6D3B\u67D0\u4E2A\u9884\u8BBE\u4F5C\u4E3A\u5F53\u524D API\uFF1B\u5176\u4ED6\u5DE5\u5177\u53EF\u5728\u914D\u7F6E\u9762\u677F\u4E2D\u6309\u9884\u8BBE\u540D\u5F15\u7528\u3002',store:lb,renderEditor:cb,renderListItemMeta:db,hasSwitchToButton:!0,onSwitchTo:t=>{try{Fn(t)}catch(e){Nr.warn("switchToPreset",{err:e})}}}),ub=ou});function Wi(){return`wb_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`}function Dr(){let t=Ie.get(Fi);return!t||typeof t!="object"?{}:t}function Vn(t){Ie.set(Fi,t)}function fs(t){return typeof t=="string"&&t.startsWith(pb)}function iu(t){return fs(t)&&qn.find(e=>e.id===t)||null}function Hi(t){if(!Array.isArray(t)){qn=[];return}qn=t.map(e=>$r({...e,id:String(e?.id||"")})).filter(e=>fs(e.id))}function $r(t={}){let e=String(t.id||Wi()),r=Array.isArray(t.bookList)?t.bookList.map(s=>({bookName:String(s?.bookName||""),enabled:s?.enabled!==!1,entryOverrides:s?.entryOverrides&&typeof s.entryOverrides=="object"?s.entryOverrides:{}})).filter(s=>s.bookName):[];return{id:e,name:String(t.name||"").trim()||"\u672A\u547D\u540D\u9884\u8BBE",description:String(t.description||""),bindingMode:t.bindingMode===gr.CUSTOM?gr.CUSTOM:gr.CHARACTER_CARD,includeDisabled:t.includeDisabled===!0,bookList:r,createdAt:Number.isFinite(t.createdAt)?t.createdAt:Date.now(),updatedAt:Number.isFinite(t.updatedAt)?t.updatedAt:Date.now()}}function yb(){let t=Dr(),e=new Set,r=[];for(let o of qn){let n=t[o.id];n?(r.push($r(n)),e.add(o.id)):r.push(o)}let s=Object.values(t).map($r).filter(o=>!e.has(o.id)).sort((o,n)=>n.updatedAt-o.updatedAt);return r.push(...s),r}function Yo(t){if(!t)return null;let e=Dr();return e[t]?$r(e[t]):fs(t)?iu(t):null}function Yi(){let t=Ie.get(Ho);return typeof t=="string"&&t?t:""}function fb(){let t=Yi();return t?Yo(t):null}function gb(t){if(t&&fs(t))return Ie.set(Ho,t),K.emit(B.PRESET_ACTIVATED,{kind:"worldbook",id:t}),!0;let e=Dr();return t&&!e[t]?(ys.warn(`setCurrentPresetId \u627E\u4E0D\u5230\u9884\u8BBE: ${t}`),!1):(Ie.set(Ho,t||""),K.emit(B.PRESET_ACTIVATED,{kind:"worldbook",id:t}),!0)}function Jn(t={}){let e=$r({...t,id:Wi(),createdAt:Date.now(),updatedAt:Date.now()}),r=Dr();return r[e.id]=e,Vn(r),K.emit(B.PRESET_CREATED,{kind:"worldbook",id:e.id}),ys.info(`\u521B\u5EFA\u9884\u8BBE: ${e.id} (${e.name})`),e}function lu(t,e={},{silent:r=!1}={}){if(!t)return null;let s=Dr(),o=s[t];if(!o&&fs(t)&&(o=iu(t)),!o)return ys.warn(`updatePreset \u627E\u4E0D\u5230\u9884\u8BBE: ${t}`),null;let n=$r({...o,...e,id:t,createdAt:o.createdAt,updatedAt:Date.now()});return s[t]=n,Vn(s),r||K.emit(B.PRESET_UPDATED,{kind:"worldbook",id:t}),n}function mb(t){if(!t)return!1;if(fs(t))return ys.warn(`\u62D2\u7EDD\u5220\u9664\u5185\u7F6E\u9884\u8BBE: ${t}`),!1;let e=Dr();return e[t]?(delete e[t],Vn(e),Yi()===t&&Ie.set(Ho,""),K.emit(B.PRESET_DELETED,{kind:"worldbook",id:t}),ys.info(`\u5220\u9664\u9884\u8BBE: ${t}`),!0):!1}function hb(t,{nameSuffix:e=" \u526F\u672C"}={}){let r=Yo(t);return r?Jn({...r,id:void 0,name:`${r.name}${e}`}):null}function bb(t,e){return fs(t)?(ys.warn(`\u62D2\u7EDD\u91CD\u547D\u540D\u5185\u7F6E\u9884\u8BBE: ${t}`),null):lu(t,{name:String(e||"").trim()||"\u672A\u547D\u540D\u9884\u8BBE"})}function xb(){return{version:1,exportedAt:Date.now(),presets:Object.values(Dr()).map($r)}}function wb(t){if(!t||typeof t!="object")return{added:0,skipped:0};let e=Array.isArray(t.presets)?t.presets:[],r=Dr(),s=0,o=0;for(let n of e){let a=$r({...n,id:Wi(),createdAt:Date.now(),updatedAt:Date.now()});r[a.id]=a,s+=1}return Vn(r),s>0&&K.emit(B.PRESET_IMPORTED,{kind:"worldbook",count:s}),{added:s,skipped:o}}function vb(){Ie.set(Fi,{}),Ie.set(Ho,""),ys.info("\u5DF2\u6E05\u7A7A\u6240\u6709\u4E16\u754C\u4E66\u9884\u8BBE")}var ys,Fi,Ho,gr,pb,qn,pt,Ys=N(()=>{Ke();Je();H();ys=R.createScope("WorldbookPresetStore"),Fi="worldbook_presets",Ho="worldbook_current_preset",gr=Object.freeze({CHARACTER_CARD:"character_card",CUSTOM:"custom"});pb="builtin_worldbook_",qn=[];pt={listPresets:yb,getPreset:Yo,getCurrentPresetId:Yi,getCurrentPreset:fb,setCurrentPresetId:gb,createPreset:Jn,updatePreset:lu,deletePreset:mb,duplicatePreset:hb,renamePreset:bb,exportAll:xb,importPresets:wb,resetAll:vb,BINDING_MODES:gr}});function Lr(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window}function Xn(){return Lr()?.SillyTavern||null}function Te(t){return t==null?"":String(t).trim()}function Sb(t){if(!t)return"";let e=[t.content,t.mes,t.message,t.text,t?.data?.content];for(let r of e)if(typeof r=="string"&&r.trim())return r.trim();return""}function _b(t){let e=String(t?.role||"").trim().toLowerCase();return e==="assistant"||e==="ai"?"assistant":e==="system"?"system":e==="user"||t?.is_user===!0?"user":t?.is_system===!0?"system":"assistant"}function du(t=""){let e=String(t||"").trim();if(!e)return"empty";let r=0;for(let s=0;s<e.length;s+=1)r=(r<<5)-r+e.charCodeAt(s),r|=0;return`fp_${Math.abs(r).toString(36)}`}function uu(t={}){let e=Te(t.chatId)||"chat_default",r=Te(t.messageId)||"latest";return`${e}::${r}`}function pu(t={}){let e=uu(t),r=Te(t.effectiveSwipeId)||"swipe:current",s=Te(t.assistantContentFingerprint)||"empty";return`${e}::${r}::${s}`}function Eb(t={}){let e=pu(t),r=Te(t.eventType)||"MANUAL",s=Te(t.traceId)||yu("manual");return`${e}::${r}::${s}`}function yu(t="trace"){return`${t}_${Date.now()}_${Math.random().toString(36).slice(2,8)}`}function fu(){let t=Xn();try{let e=t?.getContext?.()||null;if(Array.isArray(e?.chat))return e.chat}catch{}return Array.isArray(t?.chat)?t.chat:[]}function gu(t=[]){let e=[],r=null,s=null;return t.forEach((o,n)=>{let a=_b(o),i=Sb(o);if(!i)return;let l=Te(o?.messageId??o?.message_id??o?.id??o?.mid??o?.mesid??o?.chat_index??n),c=Te(o?.swipe_id??o?.swipeId??o?.swipe??""),d={role:a,content:i,sourceId:l,swipeId:c,raw:o,index:n};e.push(d),a==="user"&&(r=d),a==="assistant"&&(s=d)}),{messages:e,lastUserMessage:r,lastAiMessage:s}}function Ab(t,e,r){return Te(e?.chatId??e?.chat_id??t?.chatId??t?.chat_id??t?.this_chid??r?.id??"chat_default")||"chat_default"}async function Gi(){let t=Xn();if(!t)return null;try{let e=t.this_chid,r=t.characters||[];if(e>=0&&e<r.length){let s=r[e];return{id:e,name:s?.name||"",description:s?.description||"",personality:s?.personality||"",scenario:s?.scenario||"",firstMes:s?.first_mes||"",mesExample:s?.mes_example||""}}}catch(e){Tb.error("\u83B7\u53D6\u89D2\u8272\u4FE1\u606F\u5931\u8D25:",e)}return null}function kb(t="",e=null){let r=String(t||""),s=e?.YouYouToolkit_toolOutputs;return s&&typeof s=="object"&&Object.values(s).forEach(o=>{let n=String(o?.blockText||o?.content||"").trim();n&&r.includes(n)&&(r=r.replace(n,"").trimEnd())}),r.trim()}function Cb(t,e={}){let r=Array.isArray(t?.messages)?t.messages:[],s=Te(e.messageId),o=Te(e.swipeId);if(!s)return t?.lastAiMessage||null;let n=r.filter(i=>i.role==="assistant"),a=n.find(i=>i.sourceId!==s?!1:o?Te(i.swipeId)===o:!0);return a||n.find(i=>i.sourceId===s)||null}function mu({api:t,stContext:e,character:r,conversation:s,targetAssistantMessage:o,runSource:n="MANUAL"}={}){let a=s?.messages||[],i=s?.lastUserMessage||null,l=Te(o?.sourceId)||"",c=Te(o?.swipeId)||"swipe:current",d=o?.content||"",u=kb(d,o?.raw||null),y=du(d),p=du(u),f=Ab(t,e,r),g=yu(String(n||"manual").toLowerCase()),h=uu({chatId:f,messageId:l}),x=pu({chatId:f,messageId:l,effectiveSwipeId:c,assistantContentFingerprint:p});return{startedAt:Date.now(),runSource:n,traceId:g,chatId:f,messageId:l,confirmedAssistantMessageId:l,slotBindingKey:h,slotRevisionKey:x,slotTransactionId:Eb({chatId:f,messageId:l,effectiveSwipeId:c,assistantContentFingerprint:p,eventType:n,traceId:g}),executionKey:x,lastAiMessage:d,assistantContentFingerprint:y,assistantBaseText:u,assistantBaseFingerprint:p,lastAiMessageSwipeId:c,confirmedAssistantSwipeId:c,effectiveSwipeId:c,sourceMessageId:l,sourceSwipeId:c,lastUserMessage:i?.content||"",userMessage:i?.content||"",targetAssistantMessage:o,chatMessages:a,characterCard:r,chatHistory:a,input:{userMessage:i?.content||"",lastAiMessage:d,assistantBaseText:u,extractedContent:"",previousToolOutput:"",context:{character:r?.name||"",chatLength:a.length||0}},config:{},status:"pending"}}async function gs({runSource:t="MANUAL"}={}){let e=Xn(),r=e?.getContext?.()||null,s=await Gi(),o=fu(),n=gu(o),a=n?.lastAiMessage||null;return mu({api:e,stContext:r,character:s,conversation:n,targetAssistantMessage:a,runSource:t})}async function ms({messageId:t,swipeId:e="",runSource:r="AUTO"}={}){let s=Xn(),o=s?.getContext?.()||null,n=await Gi(),a=fu(),i=gu(a),l=Cb(i,{messageId:t,swipeId:e});return mu({api:s,stContext:o,character:n,conversation:i,targetAssistantMessage:l,runSource:r})}var Tb,hs=N(()=>{H();Tb=R.createScope("ExecutionContext")});function Qn(){try{if(typeof TavernHelper<"u"&&TavernHelper)return TavernHelper}catch{}return Lr()?.TavernHelper||null}function hu(){try{if(typeof SillyTavern<"u"&&SillyTavern)return SillyTavern}catch{}return Lr()?.SillyTavern||null}function Gs(t){return Array.isArray(t)?Array.from(new Set(t.map(e=>String(e||"").trim()).filter(Boolean))):[]}function qi(t){if(Array.isArray(t))return t.map(e=>typeof e=="string"?e:e&&typeof e=="object"?e.name||e.id||e.title||JSON.stringify(e):String(e??""));if(t&&typeof t=="object"){let e={};return Object.keys(t).forEach(r=>{let s=t[r];Array.isArray(s)?e[r]=s.map(o=>typeof o=="string"?o:o&&typeof o=="object"?o.name||o.id||o.title||"[object]":String(o??"")):s&&typeof s=="object"?e[r]="[object]":e[r]=s}),e}return t}function Rb(t={}){let e=typeof t.content=="string"?t.content.trim():"";if(!e)return"";let r=[t.comment,t.key,t.keysecondary,t.text].map(s=>String(s||"").trim()).find(Boolean);return r&&r!==e?`## ${r}
${e}`:e}function Ji(){return Array.isArray(Vi)?[...Vi]:[]}async function bu(t){if(!t||typeof t.getCharLorebooks!="function")return[];try{let e=await Promise.resolve(t.getCharLorebooks({type:"all"}));return Gs([e?.primary,e?.secondary,...Array.isArray(e?.additional)?e.additional:[]])}catch(e){return bs.warn("\u83B7\u53D6\u89D2\u8272\u7ED1\u5B9A\u4E16\u754C\u4E66\u5931\u8D25:",e),[]}}async function Mb(t,e){if(t&&typeof t.getLorebooks=="function")try{let r=Gs(await Promise.resolve(t.getLorebooks()));if(r.length>0)return r}catch(r){bs.warn("\u83B7\u53D6\u5168\u90E8\u4E16\u754C\u4E66\u5217\u8868\u5931\u8D25:",r)}if(e&&typeof e.getWorldBooks=="function")try{let r=await Promise.resolve(e.getWorldBooks()),s=Gs(Array.isArray(r)?r.map(o=>o?.name??o):[]);if(s.length>0)return s}catch(r){bs.warn("\u4ECE SillyTavern \u83B7\u53D6\u4E16\u754C\u4E66\u5217\u8868\u5931\u8D25:",r)}return[]}async function Xi(){let t=Qn(),e=hu(),r={checkedAt:Date.now(),hasGlobalTavernHelper:(()=>{try{return typeof TavernHelper<"u"&&!!TavernHelper}catch{return!1}})(),hasParentTavernHelper:!!Lr()?.TavernHelper,hasGlobalSillyTavern:(()=>{try{return typeof SillyTavern<"u"&&!!SillyTavern}catch{return!1}})(),hasParentSillyTavern:!!Lr()?.SillyTavern,helperKeys:t?Object.keys(t).sort():[],stKeys:e?Object.keys(e).sort():[],getLorebooksType:typeof t?.getLorebooks,getCharLorebooksType:typeof t?.getCharLorebooks,getLorebookEntriesType:typeof t?.getLorebookEntries,getWorldBooksType:typeof e?.getWorldBooks,characterWorldbooks:[],allWorldbooks:[],combinedWorldbooks:[],rawResults:{},errors:[]};try{r.rawResults.getLorebooks=t&&typeof t.getLorebooks=="function"?qi(await Promise.resolve(t.getLorebooks())):"[unavailable]"}catch(a){r.errors.push(`getLorebooks: ${a?.message||a}`)}try{r.rawResults.getCharLorebooks=t&&typeof t.getCharLorebooks=="function"?qi(await Promise.resolve(t.getCharLorebooks({type:"all"}))):"[unavailable]"}catch(a){r.errors.push(`getCharLorebooks: ${a?.message||a}`)}try{r.rawResults.getWorldBooks=e&&typeof e.getWorldBooks=="function"?qi(await Promise.resolve(e.getWorldBooks())):"[unavailable]"}catch(a){r.errors.push(`getWorldBooks: ${a?.message||a}`)}let s=await bu(t),o=await Mb(t,e),n=Gs([...s,...o]);return r.characterWorldbooks=[...s],r.allWorldbooks=[...o],r.combinedWorldbooks=[...n],Ib=r,Vi=n,[...n]}async function Zn(t){let e="";if(typeof t=="string"?e=t:t&&typeof t=="object"&&(e=t?.worldbooks?.presetId||""),!e)return"";let r=Yo(e);if(!r)return bs.warn(`buildSelectedWorldbookContent: \u9884\u8BBE\u4E0D\u5B58\u5728 ${e}`),"";let s=r.includeDisabled===!0,o=[];if(r.bindingMode==="character_card"){let l=Qn(),c=hu(),d=await bu(l),u=new Map((r.bookList||[]).map(y=>[String(y.bookName||""),y]));for(let y of Gs(d)){let p=u.get(y);p&&p.enabled===!1||o.push(y)}}else o=(r.bookList||[]).filter(l=>l&&l.bookName&&l.enabled!==!1).map(l=>l.bookName);if(o=Gs(o),o.length===0)return"";let n=Qn();if(!n||typeof n.getLorebookEntries!="function")return bs.warn("TavernHelper.getLorebookEntries \u4E0D\u53EF\u7528\uFF0C\u65E0\u6CD5\u8BFB\u53D6\u4E16\u754C\u4E66\u5185\u5BB9\u3002"),"";let a=new Map((r.bookList||[]).map(l=>[l.bookName,l.entryOverrides||{}])),i=[];for(let l of o)try{let c=await n.getLorebookEntries(l),d=Array.isArray(c)?c:[],u=a.get(l)||{},p=d.filter(f=>s||f?.enabled!==!1&&!f?.disable).filter(f=>{let g=u[String(f?.uid??"")];return g&&typeof g.enabled=="boolean"?g.enabled:!0}).map(Rb).filter(Boolean).join(`

`);p&&i.push(`[\u4E16\u754C\u4E66\uFF1A${l}]
${p}`)}catch(c){bs.warn(`\u8BFB\u53D6\u4E16\u754C\u4E66\u5931\u8D25: ${l}`,c)}return i.join(`

---

`)}async function xu(t){if(!t)return[];let e=Qn();if(!e||typeof e.getLorebookEntries!="function")return[];try{let r=await e.getLorebookEntries(t);return Array.isArray(r)?r:[]}catch(r){return bs.warn(`getEntriesForBook \u5931\u8D25: ${t}`,r),[]}}var bs,Vi,Ib,ea=N(()=>{hs();H();Ys();bs=R.createScope("ToolWorldbookService"),Vi=[],Ib=null});var Su={};se(Su,{WorldbookPresetPanel:()=>Tu,default:()=>Bb});function Pb(t){return t===gr.CUSTOM?"\u81EA\u5B9A\u4E49":"\u8DDF\u968F\u89D2\u8272\u5361"}function wu(t,e,r){let s=[...t.bookList],o=s.findIndex(n=>n.bookName===e);o>=0?s[o]={...s[o],enabled:r}:s.push({bookName:e,enabled:r,entryOverrides:{}}),pt.updatePreset(t.id,{bookList:s})}function Nb(t,e){let r=t.bookList.filter(s=>s.bookName!==e);pt.updatePreset(t.id,{bookList:r})}async function $b(t,e){let r=Ji();if(!r.length)try{r=await Xi()}catch{}let s=new Set(t.bookList.map(d=>d.bookName)),o=r.filter(d=>!s.has(d));if(!o.length){await Me.confirm({title:"\u6CA1\u6709\u53EF\u6DFB\u52A0\u7684\u4E16\u754C\u4E66",message:"\u5BBF\u4E3B\u672A\u63D0\u4F9B\u66F4\u591A\u53EF\u7528\u4E16\u754C\u4E66\uFF0C\u6216\u7F13\u5B58\u5185\u5168\u90E8\u5DF2\u52A0\u5165\u6B64\u9884\u8BBE\u3002",confirmText:"\u786E\u5B9A"});return}let n=m("div",{style:{display:"flex",flexDirection:"column",gap:"8px"}}),a=m("input",{className:"yyt-input",attrs:{type:"text",placeholder:`\u641C\u7D22 ${o.length} \u672C\u4E16\u754C\u4E66\u2026`,autocomplete:"off"},style:{padding:"7px 10px",fontSize:"12px"}});n.appendChild(a);let i=m("div",{style:{display:"flex",flexDirection:"column",gap:"4px",maxHeight:"320px",overflowY:"auto"}}),l=new Set,c=[];for(let d of o){let u=m("label",{style:{display:"flex",alignItems:"center",gap:"8px",padding:"8px 10px",cursor:"pointer",borderRadius:"var(--yyt-radius-sm, 6px)",background:"var(--yyt-surface-2, rgba(255,255,255,0.03))",fontSize:"12px"}}),y=m("input",{attrs:{type:"checkbox",value:d}});y.addEventListener("change",()=>{y.checked?l.add(d):l.delete(d)}),u.appendChild(y),u.appendChild(m("span",{text:d,style:{color:"var(--yyt-text)"}})),i.appendChild(u),c.push({el:u,search:d.toLowerCase()})}n.appendChild(i),a.addEventListener("input",()=>{let d=a.value.trim().toLowerCase();for(let u of c)u.el.style.display=!d||u.search.includes(d)?"":"none"}),Me.custom({title:`\u6DFB\u52A0\u4E16\u754C\u4E66\uFF08${o.length} \u9879\u53EF\u9009\uFF09`,width:"480px",body:n,buttons:[{label:"\u53D6\u6D88",variant:"ghost",onClick:d=>d(null)},{label:"\u5168\u9009\u53EF\u89C1",variant:"ghost",onClick:()=>{for(let d of i.querySelectorAll("input[type=checkbox]")){let u=d.closest("label");(!u||u.style.display!=="none")&&(d.checked=!0,l.add(d.value))}}},{label:"\u6DFB\u52A0\u9009\u4E2D",variant:"primary",onClick:d=>{let u=Array.from(l);if(!u.length){d(null);return}let y=u.map(f=>({bookName:f,enabled:!0,entryOverrides:{}})),p=[...t.bookList,...y];pt.updatePreset(t.id,{bookList:p}),d(u.length)}}]}).result.then(d=>{d&&e&&e()})}function Db(t,{onChange:e,readonly:r,refresh:s}){let o=m("div",{style:{display:"flex",flexDirection:"column",gap:"12px"}});F(o,_t({label:"\u63CF\u8FF0",control:et({value:t.description,placeholder:"\u53EF\u9009 \u2014 \u5907\u6CE8\u7528\u9014",disabled:r,onChange:u=>e({description:u})})})),F(o,_t({label:"\u7ED1\u5B9A\u6A21\u5F0F",hint:"\u8DDF\u968F\u89D2\u8272\u5361 = \u6CE8\u5165\u5F53\u524D\u89D2\u8272\u7ED1\u5B9A\u7684\u4E16\u754C\u4E66\uFF1B\u81EA\u5B9A\u4E49 = \u7528\u4E0B\u65B9\u624B\u52A8\u9009\u62E9\u7684\u5217\u8868",control:Qe({value:t.bindingMode,disabled:r,options:[{value:gr.CHARACTER_CARD,label:"\u8DDF\u968F\u89D2\u8272\u5361\uFF08\u52A8\u6001\uFF09"},{value:gr.CUSTOM,label:"\u81EA\u5B9A\u4E49\uFF08\u56FA\u5B9A\u5217\u8868\uFF09"}],onChange:u=>{e({bindingMode:u}),s&&s()}})})),F(o,St({label:"\u5305\u542B\u7981\u7528\u8BCD\u6761",hint:"\u5F00\u542F\u540E\uFF1A\u6E90\u4E16\u754C\u4E66\u4E2D\u5DF2\u7981\u7528\u7684\u8BCD\u6761\u53EF\u88AB\u672C\u9884\u8BBE\u5F3A\u5236\u542F\u7528\u5E76\u6CE8\u5165",checked:t.includeDisabled,disabled:r,onChange:u=>e({includeDisabled:u})}));let n=t.bindingMode===gr.CHARACTER_CARD,a=Ji(),i=m("div",{style:{display:"flex",flexDirection:"column"}}),l=m("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"6px",gap:"8px"}});l.appendChild(m("div",{style:{display:"flex",flexDirection:"column",gap:"2px"}},m("div",{text:n?"\u968F\u89D2\u8272\u5361\u6CE8\u5165\u7684\u4E16\u754C\u4E66":"\u9009\u4E2D\u7684\u4E16\u754C\u4E66",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}}),m("div",{text:n?"\u4EE5\u4E0B\u6765\u81EA\u5F53\u524D\u89D2\u8272\u5361\u7684\u4E16\u754C\u4E66\u5C06\u88AB\u6CE8\u5165\uFF1B\u53EF\u5355\u72EC\u5173\u95ED\u67D0\u672C\uFF08\u4E0D\u5F71\u54CD\u5176\u4ED6\u5DE5\u5177\uFF09":'\u672C\u9884\u8BBE\u56FA\u5B9A\u6CE8\u5165\u4E0B\u5217\u4E16\u754C\u4E66\uFF1B\u70B9\u51FB"+ \u6DFB\u52A0"\u4ECE\u53EF\u7528\u5217\u8868\u591A\u9009',style:{fontSize:"11px",color:"var(--yyt-text-muted)",lineHeight:"1.5"}})));let c=m("div",{style:{display:"flex",gap:"6px"}});!n&&!r&&c.appendChild(fe({label:"+ \u6DFB\u52A0",size:"small",onClick:()=>$b(t,s)}).el),c.appendChild(fe({label:"\u{1F504} \u5237\u65B0",size:"small",variant:"ghost",onClick:async()=>{try{await Xi()}catch(u){vu.warn("\u5237\u65B0\u5931\u8D25",{e:u})}s&&s()}}).el),l.appendChild(c),F(i,l);let d=[];n?a.length?d=a.map(u=>{let y=t.bookList.find(f=>f.bookName===u),p=y?y.enabled!==!1:!0;return Hn({name:u,desc:p?"\u5DF2\u542F\u7528 \xB7 \u6574\u672C\u6CE8\u5165":"\u5DF2\u7981\u7528",actions:[St({checked:p,disabled:r,onChange:f=>wu(t,u,f)})]})}):d=[m("div",{style:{padding:"14px 0",color:"var(--yyt-text-muted)",fontSize:"12px"},text:'\u5F53\u524D\u89D2\u8272\u5361\u672A\u7ED1\u5B9A\u4E16\u754C\u4E66 \u2014 \u5207\u6362\u5230"\u81EA\u5B9A\u4E49"\u53EF\u4EE5\u624B\u52A8\u9009\u62E9\u4EFB\u610F\u4E16\u754C\u4E66\u3002'})]:t.bookList.length?d=t.bookList.map(u=>{let y=Object.keys(u.entryOverrides||{}).filter(g=>{let h=u.entryOverrides[g];return h&&typeof h.enabled=="boolean"}).length,p=m("div",{style:{display:"flex",flexDirection:"column"}}),f=Hn({name:u.bookName,desc:u.enabled===!1?"\u5DF2\u7981\u7528":`\u5DF2\u542F\u7528 \xB7 \u6574\u672C\u6CE8\u5165${y?` \xB7 ${y} \u6761 override`:""}`,actions:[fe({label:"\u25B8 \u8BCD\u6761",size:"small",variant:"ghost",title:"\u5C55\u5F00/\u6536\u8D77\u8BCD\u6761\u7EA7 override",onClick:()=>Lb(p,t,u,r,s)}),St({checked:u.enabled!==!1,disabled:r,onChange:g=>wu(t,u.bookName,g)}),...r?[]:[fe({label:"\xD7",size:"small",variant:"ghost",title:"\u4ECE\u9884\u8BBE\u79FB\u9664",onClick:()=>{Nb(t,u.bookName),s&&s()}})]]});return f?.el&&F(p,f.el),p}):d=[m("div",{style:{padding:"14px 0",color:"var(--yyt-text-muted)",fontSize:"12px"},text:'\u70B9\u51FB\u53F3\u4E0A\u89D2"+ \u6DFB\u52A0"\u9009\u62E9\u4E16\u754C\u4E66\u52A0\u5165\u6B64\u9884\u8BBE\u3002'})];for(let u of d)u?.el?F(i,u.el):u instanceof Node&&F(i,u);return F(o,i),o}function Lb(t,e,r,s,o){let n=t.querySelector(".yyt-wb-entry-panel");if(n){n.remove();let l=t.querySelector('[title="\u5C55\u5F00/\u6536\u8D77\u8BCD\u6761\u7EA7 override"]');l&&(l.textContent="\u25B8 \u8BCD\u6761");return}let a=t.querySelector('[title="\u5C55\u5F00/\u6536\u8D77\u8BCD\u6761\u7EA7 override"]');a&&(a.textContent="\u25BE \u8BCD\u6761");let i=m("div",{className:"yyt-wb-entry-panel",style:{marginLeft:"18px",marginTop:"4px",padding:"8px 10px",background:"var(--yyt-surface-2, rgba(255,255,255,0.03))",borderRadius:"var(--yyt-radius-sm, 6px)",border:"1px solid var(--yyt-border, rgba(255,255,255,0.06))",fontSize:"12px",display:"flex",flexDirection:"column",gap:"4px"}});i.appendChild(m("div",{text:"\u52A0\u8F7D\u4E2D\u2026",style:{color:"var(--yyt-text-muted)",padding:"4px 0"}})),t.appendChild(i),xu(r.bookName).then(l=>{if(!l.length){i.innerHTML="",i.appendChild(m("div",{text:"\u8BE5\u4E16\u754C\u4E66\u65E0\u8BCD\u6761",style:{color:"var(--yyt-text-muted)",padding:"4px 0"}}));return}let c=r.entryOverrides||{};i.innerHTML="";let d=m("input",{className:"yyt-input",attrs:{type:"text",placeholder:`\u641C\u7D22 ${l.length} \u4E2A\u8BCD\u6761\u2026`,autocomplete:"off"},style:{padding:"5px 8px",fontSize:"11px",marginBottom:"4px",flexShrink:"0"}});i.appendChild(d);let u=m("div",{style:{display:"flex",flexDirection:"column",gap:"2px",height:"260px",overflowY:"scroll",overscrollBehavior:"contain",WebkitOverflowScrolling:"touch"}}),y=e.includeDisabled===!0,p=[];for(let f of l){let g=String(f.uid??""),h=f.comment||f.key||f.name||"",x=String(Array.isArray(h)?h[0]:h).trim()||`\u6761\u76EE ${f.uid}`,T=f.enabled===!1||f.disable===!0,v=c[g],L=v&&typeof v.enabled=="boolean",C=T&&!L&&!y,_=m("div",{style:{display:"flex",alignItems:"center",gap:"8px",padding:"5px 8px",borderRadius:"4px",background:L?"rgba(123,183,255,0.08)":"transparent",opacity:C?"0.4":"1"}}),k=S=>{_.style.background=S?"rgba(123,183,255,0.08)":"transparent",M.style.color=S?"var(--yyt-accent)":"var(--yyt-text)",S?W||(W=q(),_.appendChild(W)):(W&&(W.remove(),W=null),_.style.opacity=T?"0.4":"1")},W=null,q=()=>{let S=m("span",{text:"\u2715",style:{cursor:"pointer",color:"var(--yyt-text-muted)",fontSize:"10px",flexShrink:"0"},attrs:{title:"\u6E05\u9664 override"}});return S.addEventListener("click",U=>{if(U.stopPropagation(),s)return;let j=pt.getPreset(e.id);if(!j)return;let Q=j.bookList.find(Ae=>Ae.bookName===r.bookName);Q&&(Q.entryOverrides=Q.entryOverrides||{},delete Q.entryOverrides[g],pt.updatePreset(e.id,{bookList:[...j.bookList]},{silent:!0}),W=null,k(!1))}),S};_.appendChild(St({checked:L?v.enabled:!T,disabled:s||C,onChange:S=>{let U=pt.getPreset(e.id);if(!U)return;let j=U.bookList.find(ce=>ce.bookName===r.bookName);if(!j)return;j.entryOverrides=j.entryOverrides||{};let Q=!T;S===Q?delete j.entryOverrides[g]:j.entryOverrides[g]={enabled:S};let Ae=S!==Q;pt.updatePreset(e.id,{bookList:[...U.bookList]},{silent:!0}),k(Ae),_.style.opacity=C?"0.4":"1"}}).el);let M=m("span",{style:{flex:"1",minWidth:"0",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",color:L?"var(--yyt-accent)":"var(--yyt-text)",fontSize:"11px"},text:x+(C?" (\u6E90\u7981\u7528)":"")});_.appendChild(M),L&&(W=q(),_.appendChild(W)),u.appendChild(_),p.push({el:_,search:x.toLowerCase()})}i.appendChild(u),d.addEventListener("input",()=>{let f=d.value.trim().toLowerCase();for(let g of p)g.el.style.display=!f||g.search.includes(f)?"":"none"})}).catch(l=>{vu.warn("\u52A0\u8F7D\u8BCD\u6761\u5931\u8D25",l),i.innerHTML="",i.appendChild(m("div",{text:`\u52A0\u8F7D\u5931\u8D25\uFF1A${l?.message||l}`,style:{color:"var(--yyt-danger, #f87171)",padding:"4px 0"}}))})}function Ob(t){let e=[`${Pb(t.bindingMode)}`,`${t.bookList.length} \u672C`];return t.includeDisabled&&e.push("\u542B\u7981\u7528"),e}var vu,Tu,Bb,_u=N(()=>{fr();Ys();ea();Gn();H();Wo();vu=R.createScope("WorldbookPresetPanel");Tu=Pr({id:"worldbookPresetPanel",kind:"worldbook",panelTitle:"\u4E16\u754C\u4E66\u9884\u8BBE",panelHint:"\u7BA1\u7406\u4E16\u754C\u4E66\u6CE8\u5165\u9884\u8BBE\u3002\u5DE5\u5177\u914D\u7F6E\u4E2D\u901A\u8FC7\u9884\u8BBE ID \u5F15\u7528\uFF0C\u53EF\u7ED1\u5B9A\u89D2\u8272\u5361\uFF08\u52A8\u6001\uFF09\u6216\u56FA\u5B9A\u5217\u8868\u3002",store:pt,renderEditor:Db,renderListItemMeta:Ob}),Bb=Tu});var ol={};se(ol,{MESSAGE_MACROS:()=>Gu,addTagRule:()=>Lu,createRuleTemplate:()=>Pu,default:()=>Ub,deleteRulePreset:()=>Fu,deleteRuleTemplate:()=>$u,deleteTagRule:()=>Bu,escapeRegex:()=>xs,exportRulesConfig:()=>Wu,extractComplexTag:()=>Au,extractCurlyBraceTag:()=>rl,extractHtmlFormatTag:()=>ku,extractSimpleTag:()=>tl,extractTagContent:()=>hr,generateTagSuggestions:()=>Iu,getAllRulePresets:()=>Uu,getAllRuleTemplates:()=>Ru,getContentBlacklist:()=>Vs,getRuleTemplate:()=>Mu,getTagRules:()=>qs,importRulesConfig:()=>Hu,isValidTagName:()=>el,loadRulePreset:()=>ju,saveRulesAsPreset:()=>Ku,scanTextForTags:()=>Cu,setContentBlacklist:()=>zu,setTagRules:()=>Du,shouldSkipContent:()=>Zi,testRegex:()=>Yu,updateRuleTemplate:()=>Nu,updateTagRule:()=>Ou});function zb(){return{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"},ruleTemplates:[...Qi],tagRules:[],contentBlacklist:[],tagRulePresets:{}}}function Et(){return D.get(Eu,zb())}function Xt(t){D.set(Eu,t)}function ta(){let t=Et();return at=t.ruleTemplates||[...Qi],$e=t.tagRules||[],ht=t.contentBlacklist||[],{ruleTemplates:at,tagRules:$e,contentBlacklist:ht}}function xs(t){return typeof t!="string"?"":t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function Zi(t,e){if(!e||e.length===0||!t||typeof t!="string")return!1;let r=t.toLowerCase();return e.some(s=>{let o=s.trim().toLowerCase();return o&&r.includes(o)})}function el(t){return!t||typeof t!="string"?!1:/^[a-zA-Z][a-zA-Z0-9_-]*$/.test(t)&&!Kb.includes(t.toLowerCase())}function tl(t,e){if(!t||!e)return[];let r=[],s=xs(e),o=new RegExp(`<${s}>([\\s\\S]*?)<\\/${s}>`,"gi");[...t.matchAll(o)].forEach(l=>{l[1]&&r.push(l[1].trim())});let a=(t.match(new RegExp(`<${s}>`,"gi"))||[]).length,i=(t.match(new RegExp(`<\\/${s}>`,"gi"))||[]).length;return a>i&&mr.warn(`\u53D1\u73B0 ${a-i} \u4E2A\u672A\u95ED\u5408\u7684 <${e}> \u6807\u7B7E`),r}function rl(t,e){if(!t||!e)return[];let r=[],s=xs(e),o=new RegExp(`\\{${s}\\|`,"gi"),n;for(;(n=o.exec(t))!==null;){let a=n.index,i=a+n[0].length,l=1,c=i;for(;c<t.length&&l>0;)t[c]==="{"?l++:t[c]==="}"&&l--,c++;if(l===0){let d=t.substring(i,c-1);d.trim()&&r.push(d.trim())}o.lastIndex=a+1}return r}function Au(t,e){if(!t||!e)return[];let r=e.split(",");if(r.length!==2)return mr.error(`\u590D\u6742\u6807\u7B7E\u914D\u7F6E\u683C\u5F0F\u9519\u8BEF\uFF0C\u5E94\u8BE5\u5305\u542B\u4E00\u4E2A\u9017\u53F7: ${e}`),[];let s=r[0].trim(),o=r[1].trim(),n=o.match(/<\/(\w+)>/);if(!n)return mr.error(`\u65E0\u6CD5\u89E3\u6790\u7ED3\u675F\u6807\u7B7E: ${o}`),[];let a=n[1],i=new RegExp(`${xs(s)}([\\s\\S]*?)<\\/${a}>`,"gi"),l=[];return[...t.matchAll(i)].forEach(d=>{d[1]&&l.push(d[1].trim())}),l}function ku(t,e){if(!t||!e)return[];let r=e.match(/<(\w+)(?:\s[^>]*)?>/);if(!r)return mr.error(`\u65E0\u6CD5\u89E3\u6790HTML\u683C\u5F0F\u6807\u7B7E: ${e}`),[];let s=r[1],o=[],n=new RegExp(`<${s}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${s}>`,"gi");[...t.matchAll(n)].forEach(c=>{c[1]&&o.push(c[1].trim())});let i=(t.match(new RegExp(`<${s}(?:\\s[^>]*)?>`,"gi"))||[]).length,l=(t.match(new RegExp(`<\\/${s}>`,"gi"))||[]).length;return i>l&&mr.warn(`\u53D1\u73B0 ${i-l} \u4E2A\u672A\u95ED\u5408\u7684 <${s}> \u6807\u7B7E`),o}function hr(t,e,r=[]){if(!t)return"";if(!e||e.length===0)return t;let s=e.filter(d=>d.type==="exclude"&&d.enabled),o=e.filter(d=>(d.type==="include"||d.type==="regex_include")&&d.enabled),n=e.filter(d=>d.type==="regex_exclude"&&d.enabled),a=t;for(let d of s)try{let u=new RegExp(`<${xs(d.value)}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${xs(d.value)}>`,"gi");a=a.replace(u,"")}catch(u){mr.error("Error applying block exclusion rule:",{rule:d,error:u})}let i=[];if(o.length>0)for(let d of o){let u=[];try{if(d.type==="include")u.push(...tl(a,d.value)),u.push(...rl(a,d.value));else if(d.type==="regex_include"){let y=new RegExp(d.value,"gi");[...a.matchAll(y)].forEach(f=>{f[1]&&u.push(f[1])})}}catch(y){mr.error("Error applying inclusion rule:",{rule:d,error:y})}u.forEach(y=>i.push(y.trim()))}else i.push(a);let l=[];for(let d of i){for(let u of n)try{let y=new RegExp(u.value,"gi");d=d.replace(y,"")}catch(y){mr.error("Error applying cleanup rule:",{rule:u,error:y})}Zi(d,r)||l.push(d)}return l.join(`

`).replace(/\n\s*\n\s*\n/g,`

`).replace(/^\s+|\s+$/g,"").trim()}async function Cu(t,e={}){let r=performance.now(),{chunkSize:s=5e4,maxTags:o=100,timeoutMs:n=5e3}=e,a=new Set,i=/<(?:\/|)([a-zA-Z0-9_-]+)(?:[^>]*)>|\{([a-zA-Z0-9_-]+)(?:\||})/g,l=0,c=0;for(let u=0;u<t.length;u+=s){let y=t.slice(u,Math.min(u+s,t.length));if(c++,l+=y.length,performance.now()-r>n){mr.warn(`Tag scanning timed out after ${n}ms`);break}let p;for(;(p=i.exec(y))!==null&&a.size<o;){let f=(p[1]||p[2]).toLowerCase();el(f)&&a.add(f)}if(a.size>=o)break;c%5===0&&await new Promise(f=>setTimeout(f,0))}let d=performance.now();return{tags:Array.from(a).sort(),stats:{processingTimeMs:Math.round(d-r),processedChars:l,totalChars:t.length,chunkCount:c,tagsFound:a.size}}}function Iu(t,e=25){let r=t.tags.slice(0,e);return{suggestions:r,stats:{totalFound:t.stats.tagsFound,finalCount:r.length}}}function Ru(){return at.length===0&&ta(),at}function Mu(t){return at.find(e=>e.id===t)}function Pu(t){let e={id:`rule-${Date.now()}`,name:t.name||"\u65B0\u89C4\u5219",description:t.description||"",type:t.type||"include",value:t.value||"",enabled:t.enabled!==!1,createdAt:new Date().toISOString()};return at.push(e),sl(),{success:!0,template:e,message:"\u89C4\u5219\u6A21\u677F\u521B\u5EFA\u6210\u529F"}}function Nu(t,e){let r=at.findIndex(s=>s.id===t);return r===-1?{success:!1,message:"\u89C4\u5219\u6A21\u677F\u4E0D\u5B58\u5728"}:(at[r]={...at[r],...e,updatedAt:new Date().toISOString()},sl(),{success:!0,template:at[r],message:"\u89C4\u5219\u6A21\u677F\u66F4\u65B0\u6210\u529F"})}function $u(t){let e=at.findIndex(r=>r.id===t);return e===-1?{success:!1,message:"\u89C4\u5219\u6A21\u677F\u4E0D\u5B58\u5728"}:(at.splice(e,1),sl(),{success:!0,message:"\u89C4\u5219\u6A21\u677F\u5DF2\u5220\u9664"})}function sl(){let t=Et();t.ruleTemplates=at,Xt(t)}function qs(){return $e||ta(),$e}function Du(t){$e=t||[];let e=Et();e.tagRules=$e,Xt(e)}function Lu(t){let e={id:`tag-${Date.now()}`,type:t.type||"include",value:t.value||"",enabled:t.enabled!==!1};$e.push(e);let r=Et();return r.tagRules=$e,Xt(r),{success:!0,rule:e,message:"\u89C4\u5219\u6DFB\u52A0\u6210\u529F"}}function Ou(t,e){if(t<0||t>=$e.length)return{success:!1,message:"\u89C4\u5219\u7D22\u5F15\u65E0\u6548"};$e[t]={...$e[t],...e};let r=Et();return r.tagRules=$e,Xt(r),{success:!0,rule:$e[t],message:"\u89C4\u5219\u66F4\u65B0\u6210\u529F"}}function Bu(t){if(t<0||t>=$e.length)return{success:!1,message:"\u89C4\u5219\u7D22\u5F15\u65E0\u6548"};$e.splice(t,1);let e=Et();return e.tagRules=$e,Xt(e),{success:!0,message:"\u89C4\u5219\u5DF2\u5220\u9664"}}function Vs(){return ht||ta(),ht}function zu(t){ht=t||[];let e=Et();e.contentBlacklist=ht,Xt(e)}function Ku(t,e=""){if(!t||!t.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let r=Et();r.tagRulePresets||(r.tagRulePresets={});let s=`preset-${Date.now()}`;return r.tagRulePresets[s]={id:s,name:t.trim(),description:e.trim(),rules:JSON.parse(JSON.stringify($e)),blacklist:JSON.parse(JSON.stringify(ht)),createdAt:new Date().toISOString()},Xt(r),{success:!0,preset:r.tagRulePresets[s],message:"\u9884\u8BBE\u4FDD\u5B58\u6210\u529F"}}function Uu(){let e=Et().tagRulePresets||{};return Object.values(e)}function ju(t){let e=Et(),s=(e.tagRulePresets||{})[t];return s?($e=JSON.parse(JSON.stringify(s.rules||[])),ht=JSON.parse(JSON.stringify(s.blacklist||[])),e.tagRules=$e,e.contentBlacklist=ht,Xt(e),{success:!0,preset:s,message:"\u9884\u8BBE\u52A0\u8F7D\u6210\u529F"}):{success:!1,message:"\u9884\u8BBE\u4E0D\u5B58\u5728"}}function Fu(t){let e=Et(),r=e.tagRulePresets||{};return r[t]?(delete r[t],e.tagRulePresets=r,Xt(e),{success:!0,message:"\u9884\u8BBE\u5DF2\u5220\u9664"}):{success:!1,message:"\u9884\u8BBE\u4E0D\u5B58\u5728"}}function Wu(){return JSON.stringify({tagRules:$e,contentBlacklist:ht,ruleTemplates:at,tagRulePresets:Et().tagRulePresets||{}},null,2)}function Hu(t,e={overwrite:!0}){try{let r=JSON.parse(t);if(e.overwrite)$e=r.tagRules||[],ht=r.contentBlacklist||[],at=r.ruleTemplates||Qi;else if(r.tagRules&&$e.push(...r.tagRules),r.contentBlacklist){let o=new Set(ht.map(n=>n.toLowerCase()));r.contentBlacklist.forEach(n=>{o.has(n.toLowerCase())||ht.push(n)})}let s=Et();return s.tagRules=$e,s.contentBlacklist=ht,s.ruleTemplates=at,r.tagRulePresets&&(s.tagRulePresets={...s.tagRulePresets||{},...r.tagRulePresets}),Xt(s),{success:!0,message:"\u914D\u7F6E\u5BFC\u5165\u6210\u529F"}}catch(r){return{success:!1,message:`\u5BFC\u5165\u5931\u8D25: ${r.message}`}}}function Yu(t,e,r="g",s=0){try{if(!t||typeof t!="string")return{success:!1,error:"\u6B63\u5219\u8868\u8FBE\u5F0F\u4E0D\u80FD\u4E3A\u7A7A",matches:[]};let o=new RegExp(t,r),n=[];if(r.includes("g")){let a;for(;(a=o.exec(e))!==null;)a.length>1?n.push({fullMatch:a[0],groups:a.slice(1),index:a.index,extracted:a[s]||a[1]||a[0]}):n.push({fullMatch:a[0],groups:[],index:a.index,extracted:a[0]})}else{let a=o.exec(e);a&&n.push({fullMatch:a[0],groups:a.length>1?a.slice(1):[],index:a.index,extracted:a.length>1?a[s]||a[1]:a[0]})}return{success:!0,matches:n,count:n.length,extracted:n.map(a=>a.extracted)}}catch(o){return{success:!1,error:o.message,matches:[]}}}var mr,Eu,Kb,Qi,at,$e,ht,Gu,Ub,Js=N(()=>{Ke();H();mr=R.createScope("RegexExtractor"),Eu="settings";Kb=["font","span","div","p","br","hr","img","a","b","i","u","s","em","strong","small","big","sub","sup","h1","h2","h3","h4","h5","h6","table","tr","td","th","tbody","thead","tfoot","ul","ol","li","form","input","button","select","option","textarea","label","script","style","meta","link","title","head","body","html"],Qi=[{id:"exclude-thinking",name:"\u6392\u9664\u601D\u8003\u6807\u7B7E",description:"\u79FB\u9664<thinking>\u6807\u7B7E\u5757",type:"exclude",value:"thinking",enabled:!0},{id:"include-content",name:"\u63D0\u53D6\u5185\u5BB9\u6807\u7B7E",description:"\u63D0\u53D6<content>\u6807\u7B7E\u5185\u5BB9",type:"include",value:"content",enabled:!0},{id:"regex-exclude-cot",name:"\u6392\u9664\u5C0FCoT",description:"\u79FB\u9664HTML\u6CE8\u91CA",type:"regex_exclude",value:"<!--[\\s\\S]*?-->",enabled:!1},{id:"regex-include-details",name:"\u63D0\u53D6details\u6807\u7B7E",description:"\u63D0\u53D6<details>\u6807\u7B7E\u5185\u5BB9",type:"regex_include",value:"<details[^>]*>([\\s\\S]*?)</details>",enabled:!1}],at=[],$e=[],ht=[];Gu={lastMessage:{macro:"{{lastMessage}}",description:"\u6700\u540E\u4E00\u6761\u6D88\u606F"},lastCharMessage:{macro:"{{lastCharMessage}}",description:"\u6700\u540E\u4E00\u6761\u89D2\u8272\u6D88\u606F"},lastUserMessage:{macro:"{{lastUserMessage}}",description:"\u6700\u540E\u4E00\u6761\u7528\u6237\u6D88\u606F"},char:{macro:"{{char}}",description:"\u89D2\u8272\u540D\u79F0"},user:{macro:"{{user}}",description:"\u7528\u6237\u540D\u79F0"},input:{macro:"{{input}}",description:"\u5F53\u524D\u8F93\u5165\u6846\u5185\u5BB9"}};ta();Ub={extractTagContent:hr,extractSimpleTag:tl,extractCurlyBraceTag:rl,extractComplexTag:Au,extractHtmlFormatTag:ku,escapeRegex:xs,shouldSkipContent:Zi,isValidTagName:el,scanTextForTags:Cu,generateTagSuggestions:Iu,getAllRuleTemplates:Ru,getRuleTemplate:Mu,createRuleTemplate:Pu,updateRuleTemplate:Nu,deleteRuleTemplate:$u,getTagRules:qs,setTagRules:Du,addTagRule:Lu,updateTagRule:Ou,deleteTagRule:Bu,getContentBlacklist:Vs,setContentBlacklist:zu,saveRulesAsPreset:Ku,getAllRulePresets:Uu,loadRulePreset:ju,deleteRulePreset:Fu,exportRulesConfig:Wu,importRulesConfig:Hu,testRegex:Yu,MESSAGE_MACROS:Gu}});var tp={};se(tp,{createDefaultToolDefinition:()=>ws,default:()=>Hb,deleteTool:()=>Qs,deleteToolPreset:()=>Qu,exportTools:()=>Zs,getAllTools:()=>Qt,getCurrentToolPreset:()=>Zu,getTool:()=>Zt,getToolPresets:()=>sa,importTools:()=>eo,normalizeToolDefinitionToRuntimeConfig:()=>qo,resetTools:()=>to,saveTool:()=>Xs,saveToolPreset:()=>Xu,setCurrentToolPreset:()=>ep,setToolEnabled:()=>oa});function jb(t={}){return!t||typeof t!="object"?{}:Object.fromEntries(Object.entries(t).map(([e,r])=>[e,ws({...r||{},id:e})]))}function Go(t){return Array.isArray(t)?t.map(e=>String(e||"").trim()).filter(Boolean):[]}function nl(t,e){let r=parseInt(t,10);return Number.isFinite(r)&&r>0?r:e}function qu(t,e){let r=parseInt(t,10);return Number.isFinite(r)&&r>=0?r:e}function Vu(t={}){return{settleMs:qu(t?.settleMs,1200),cooldownMs:qu(t?.cooldownMs,5e3)}}function Ju(t={}){return{enabled:t?.enabled===!0,selected:Go(t?.selected),presetId:typeof t?.presetId=="string"?t.presetId:""}}function Fb(t=[]){let e=Array.isArray(t)?t.map(r=>({role:String(r?.role||"user").trim().toUpperCase(),content:String(r?.content||"").trim()})).filter(r=>r.content):[];return e.length===0?"":e.length===1?e[0].content:e.map(r=>`\u3010${r.role||"USER"}\u3011
${r.content}`).join(`

`)}function Wb(t,e={}){let r=typeof e?.promptTemplate=="string"?e.promptTemplate.trim():"";if(r)return r;let s=Fb(e?.config?.messages||[]);return s||`\u8BF7\u57FA\u4E8E\u6700\u8FD1\u7684 AI \u56DE\u590D\u4E3A\u5DE5\u5177\u201C${e?.name||t}\u201D\u751F\u6210\u7ED3\u6784\u5316\u8F93\u51FA\u3002`}function ws(t={}){let e=new Date().toISOString(),r=t?.config||{};return{...Lt,...t,id:t?.id||Lt.id,icon:t?.icon||Lt.icon,order:Number.isFinite(t?.order)?t.order:Lt.order,promptTemplate:typeof t?.promptTemplate=="string"?t.promptTemplate:Lt.promptTemplate,extractTags:Go(t?.extractTags),config:{execution:{...Lt.config.execution,...r.execution||{},timeout:nl(r?.execution?.timeout,Lt.config.execution.timeout),retries:Math.max(0,parseInt(r?.execution?.retries,10)||Lt.config.execution.retries)},api:{...Lt.config.api,...r.api||{}},messages:Array.isArray(r?.messages)?r.messages:[],context:{...Lt.config.context,...r.context||{},depth:nl(r?.context?.depth,Lt.config.context.depth),includeTags:Go(r?.context?.includeTags),excludeTags:Go(r?.context?.excludeTags)},automation:Vu(r?.automation),worldbooks:Ju(r?.worldbooks)},enabled:t?.enabled!==!1,metadata:{...Lt.metadata,...t?.metadata||{},createdAt:t?.metadata?.createdAt||e,updatedAt:t?.metadata?.updatedAt||e}}}function qo(t,e={},r={}){let s=ws({...e,id:t||e?.id||""}),o=Go(s?.extractTags?.length?s.extractTags:s?.config?.context?.includeTags),n=String(e?.output?.apiPreset||s?.config?.api?.preset||"").trim(),a=Wb(t,s),i=typeof e?.output?.mode=="string"&&e.output.mode.trim()?e.output.mode.trim():r.defaultOutputMode||"follow_ai";return{id:s.id||t,name:s.name||t,icon:s.icon||"fa-screwdriver-wrench",description:s.description||"",enabled:s.enabled!==!1,order:Number.isFinite(s.order)?s.order:100,bypass:{enabled:s?.config?.api?.useBypass===!0&&!!s?.config?.api?.bypassPreset,presetId:s?.config?.api?.bypassPreset||""},output:{mode:i,apiPreset:n,overwrite:!0,enabled:!0},automation:Vu(s?.config?.automation),worldbooks:Ju(s?.config?.worldbooks),extraction:{enabled:!0,maxMessages:nl(s?.config?.context?.depth,5),selectors:o,regexPresetId:typeof s?.config?.extraction?.regexPresetId=="string"?s.config.extraction.regexPresetId:"",writebackTag:typeof s?.config?.extraction?.writebackTag=="string"?s.config.extraction.writebackTag:""},promptTemplate:a,runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},apiPreset:n,extractTags:o,isCustom:!0,category:s.category||"utility",metadata:{...s.metadata||{}}}}function Qt(){let t=ve.get(Oe.TOOLS),e=jb(t);return t&&JSON.stringify(t)!==JSON.stringify(e)&&ve.set(Oe.TOOLS,e),{...ra,...e}}function Zt(t){return Qt()[t]||null}function Xs(t,e){if(!t||!e)return!1;let r=ve.get(Oe.TOOLS)||{},s=!r[t]&&!ra[t],o=ws({...r[t]||{},...e,id:t,metadata:{...r[t]?.metadata||{},...e.metadata||{},createdAt:r[t]?.metadata?.createdAt||e?.metadata?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString()}});return r[t]=o,ve.set(Oe.TOOLS,r),K.emit(s?B.TOOL_REGISTERED:B.TOOL_UPDATED,{toolId:t,tool:o}),!0}function Qs(t){let e=ve.get(Oe.TOOLS)||{};return!e[t]&&!ra[t]||ra[t]?!1:(delete e[t],ve.set(Oe.TOOLS,e),K.emit(B.TOOL_UNREGISTERED,{toolId:t}),!0)}function sa(){return ve.get(Oe.PRESETS)||{}}function Xu(t,e){if(!t||!e)return!1;let r=sa(),s=!r[t];return r[t]={...e,name:t,updatedAt:new Date().toISOString()},ve.set(Oe.PRESETS,r),K.emit(s?B.PRESET_CREATED:B.PRESET_UPDATED,{type:"tool",presetName:t,preset:r[t]}),!0}function Qu(t){let e=sa();return e[t]?(delete e[t],ve.set(Oe.PRESETS,e),K.emit(B.PRESET_DELETED,{type:"tool",presetName:t}),!0):!1}function Zu(){return ve.get(Oe.CURRENT_PRESET)||""}function ep(t){return ve.set(Oe.CURRENT_PRESET,t||""),K.emit(B.PRESET_ACTIVATED,{type:"tool",presetName:t}),!0}function oa(t,e){let r=Zt(t);if(!r)return!1;let s=ve.get(Oe.TOOLS)||{};return s[t]=ws({...r,id:t,enabled:e,metadata:{...r?.metadata||{},createdAt:r?.metadata?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString()}}),ve.set(Oe.TOOLS,s),K.emit(e?B.TOOL_ENABLED:B.TOOL_DISABLED,{toolId:t,enabled:e}),!0}function Zs(){let t=ve.get(Oe.TOOLS)||{},e=ve.get(Oe.PRESETS)||{};return JSON.stringify({version:"1.0.0",exportedAt:new Date().toISOString(),tools:t,presets:e},null,2)}function eo(t,e=!1){try{let r=typeof e=="object"?!!e?.overwrite:!!e,s=JSON.parse(t);if(!s||typeof s!="object")return{success:!1,toolsImported:0,presetsImported:0,message:"\u65E0\u6548\u7684JSON\u683C\u5F0F"};let o=r?{}:ve.get(Oe.TOOLS)||{},n=r?{}:ve.get(Oe.PRESETS)||{},a=0,i=0;if(s.tools&&typeof s.tools=="object"){for(let[l,c]of Object.entries(s.tools))!c||typeof c!="object"||(o[l]=ws({...c,id:l}),a+=1);ve.set(Oe.TOOLS,o)}if(s.presets&&typeof s.presets=="object"){for(let[l,c]of Object.entries(s.presets))!c||typeof c!="object"||(n[l]={...c,name:l,updatedAt:new Date().toISOString()},i+=1);ve.set(Oe.PRESETS,n)}return{success:!0,toolsImported:a,presetsImported:i,message:`\u6210\u529F\u5BFC\u5165 ${a} \u4E2A\u5DE5\u5177\u548C ${i} \u4E2A\u9884\u8BBE`}}catch(r){return{success:!1,toolsImported:0,presetsImported:0,message:`\u5BFC\u5165\u5931\u8D25: ${r.message}`}}}function to(){ve.remove(Oe.TOOLS),ve.remove(Oe.PRESETS),ve.remove(Oe.CURRENT_PRESET)}var Lt,ra,Oe,Hb,Vo=N(()=>{Ke();Je();Lt={id:"",name:"",description:"",icon:"fa-screwdriver-wrench",order:100,category:"utility",promptTemplate:"",extractTags:[],config:{execution:{timeout:6e4,retries:3},api:{preset:"",useBypass:!1,bypassPreset:""},messages:[],context:{depth:3,includeTags:[],excludeTags:[]},automation:{settleMs:1200,cooldownMs:5e3},worldbooks:{enabled:!1,selected:[]}},enabled:!0,metadata:{createdAt:null,updatedAt:null,author:"",version:"1.0.0"}},ra={},Oe={TOOLS:"tools",PRESETS:"tool_presets",CURRENT_PRESET:"current_tool_preset"};Hb={getAllTools:Qt,getTool:Zt,saveTool:Xs,deleteTool:Qs,setToolEnabled:oa,exportTools:Zs,importTools:eo,resetTools:to,getToolPresets:sa,saveToolPreset:Xu,deleteToolPreset:Qu,getCurrentToolPreset:Zu,setCurrentToolPreset:ep,createDefaultToolDefinition:ws,normalizeToolDefinitionToRuntimeConfig:qo}});var pl={};se(pl,{TOOL_CATEGORIES:()=>rp,TOOL_REGISTRY:()=>ro,appendToolRuntimeHistory:()=>fp,clearToolApiPreset:()=>up,default:()=>Zb,ensureToolRuntimeConfig:()=>so,getAllDefaultToolConfigs:()=>mp,getAllToolApiBindings:()=>pp,getAllToolFullConfigs:()=>Qo,getEnabledTools:()=>hp,getToolApiPreset:()=>dl,getToolBaseConfig:()=>na,getToolConfig:()=>Xo,getToolFullConfig:()=>ne,getToolList:()=>ip,getToolSubTabs:()=>lp,getToolWindowState:()=>xp,hasTool:()=>cl,onPresetDeleted:()=>yp,patchToolRuntime:()=>Br,registerTool:()=>np,resetToolConfig:()=>gp,resetToolRegistry:()=>cp,saveToolConfig:()=>Re,saveToolWindowState:()=>bp,setToolApiPreset:()=>dp,setToolApiPresetConfig:()=>Jb,setToolBypassConfig:()=>Xb,setToolOutputMode:()=>Vb,setToolPromptTemplate:()=>Qb,unregisterTool:()=>ap,updateToolRuntime:()=>ul});function vs(t={}){let e=Array.isArray(t?.recentWritebackHistory)?t.recentWritebackHistory.filter(Boolean):[];return{lastRunAt:Number.isFinite(t?.lastRunAt)?t.lastRunAt:0,lastStatus:typeof t?.lastStatus=="string"?t.lastStatus:"idle",lastError:typeof t?.lastError=="string"?t.lastError:"",lastDurationMs:Number.isFinite(t?.lastDurationMs)?t.lastDurationMs:0,successCount:Number.isFinite(t?.successCount)?t.successCount:0,errorCount:Number.isFinite(t?.errorCount)?t.errorCount:0,lastMessageKey:typeof t?.lastMessageKey=="string"?t.lastMessageKey:"",lastExecutionKey:typeof t?.lastExecutionKey=="string"?t.lastExecutionKey:"",lastExecutionPath:typeof t?.lastExecutionPath=="string"?t.lastExecutionPath:"",lastWritebackStatus:typeof t?.lastWritebackStatus=="string"?t.lastWritebackStatus:"",lastFailureStage:typeof t?.lastFailureStage=="string"?t.lastFailureStage:"",lastSlotBindingKey:typeof t?.lastSlotBindingKey=="string"?t.lastSlotBindingKey:"",lastSlotRevisionKey:typeof t?.lastSlotRevisionKey=="string"?t.lastSlotRevisionKey:"",lastSlotTransactionId:typeof t?.lastSlotTransactionId=="string"?t.lastSlotTransactionId:"",lastSourceMessageId:typeof t?.lastSourceMessageId=="string"?t.lastSourceMessageId:"",lastSourceSwipeId:typeof t?.lastSourceSwipeId=="string"?t.lastSourceSwipeId:"",lastContentCommitted:t?.lastContentCommitted===!0,lastHostCommitApplied:t?.lastHostCommitApplied===!0,lastRefreshRequested:t?.lastRefreshRequested===!0,lastRefreshConfirmed:t?.lastRefreshConfirmed===!0,lastPreferredCommitMethod:typeof t?.lastPreferredCommitMethod=="string"?t.lastPreferredCommitMethod:"",lastAppliedCommitMethod:typeof t?.lastAppliedCommitMethod=="string"?t.lastAppliedCommitMethod:"",lastRefreshMethodCount:Number.isFinite(t?.lastRefreshMethodCount)?t.lastRefreshMethodCount:0,lastRefreshMethods:Array.isArray(t?.lastRefreshMethods)?t.lastRefreshMethods.filter(Boolean):[],lastRefreshConfirmChecks:Number.isFinite(t?.lastRefreshConfirmChecks)?t.lastRefreshConfirmChecks:0,lastRefreshConfirmedBy:typeof t?.lastRefreshConfirmedBy=="string"?t.lastRefreshConfirmedBy:"",lastTraceId:typeof t?.lastTraceId=="string"?t.lastTraceId:"",lastAutoRunAt:Number.isFinite(t?.lastAutoRunAt)?t.lastAutoRunAt:0,lastAutoStatus:typeof t?.lastAutoStatus=="string"?t.lastAutoStatus:"idle",lastAutoMessageId:typeof t?.lastAutoMessageId=="string"?t.lastAutoMessageId:"",lastAutoSwipeId:typeof t?.lastAutoSwipeId=="string"?t.lastAutoSwipeId:"",lastAutoRevisionKey:typeof t?.lastAutoRevisionKey=="string"?t.lastAutoRevisionKey:"",lastAutoWritebackStatus:typeof t?.lastAutoWritebackStatus=="string"?t.lastAutoWritebackStatus:"",lastAutoRefreshConfirmed:t?.lastAutoRefreshConfirmed===!0,lastAutoSkipReason:typeof t?.lastAutoSkipReason=="string"?t.lastAutoSkipReason:"",recentWritebackHistory:e}}function Yb(t,e=10){let r=Number.isFinite(e)?Math.max(1,Math.min(50,Math.floor(e))):10;return Array.isArray(t)?t.length<=r?t:t.slice(t.length-r):[]}function sp(){let t=Qt()||{};return Object.entries(t).filter(([e])=>!Jo[e]).map(([e,r])=>[e,r||{}])}function al(t={}){return t?.toolKind==="script"?"script":t?.toolKind==="ai"?"ai":t?.output?.mode==="local_transform"||t?.processor?.type?"script":"ai"}function op(){let t=Array.isArray(ro.tools?.subTabs)?ro.tools.subTabs.map((r,s)=>({...r,order:Number.isFinite(r?.order)?r.order:s,toolKind:al(r),toolGroupLabel:al(r)==="script"?"\u811A\u672C\u5DE5\u5177":"AI \u5DE5\u5177"})):[],e=sp().map(([r,s],o)=>{let n=qo(r,s),a=al(n);return{id:r,name:n.name||r,icon:n.icon||"fa-screwdriver-wrench",component:"GenericToolConfigPanel",order:Number.isFinite(n.order)?n.order:100+o,isCustom:!0,description:n.description||"",toolKind:a,toolGroupLabel:a==="script"?"\u811A\u672C\u5DE5\u5177":"AI \u5DE5\u5177"}});return[...t,...e].sort((r,s)=>(r.order??0)-(s.order??0))}function Gb(t,e={}){let r=qo(t,e,{defaultOutputMode:"follow_ai"});return{...r,runtime:vs(r.runtime)}}function ll(t){let e=Jo[t];if(e)return{...e,output:{...e.output||{}},bypass:{...e.bypass||{}},worldbooks:{...e.worldbooks||{},selected:Array.isArray(e?.worldbooks?.selected)?[...e.worldbooks.selected]:[]},extraction:{...e.extraction||{}},processor:{...e.processor||{},options:{...e?.processor?.options||{}}},runtime:vs(e.runtime),extractTags:Array.isArray(e.extractTags)?[...e.extractTags]:[]};let s=(Qt()||{})[t]||null;return s?Gb(t,s):Xo(t)}function na(t){let e=ll(t);return e?{...e,output:{...e.output||{}},automation:{...e.automation||{}},bypass:{...e.bypass||{}},worldbooks:{...e.worldbooks||{},selected:Array.isArray(e?.worldbooks?.selected)?[...e.worldbooks.selected]:[]},extraction:{...e.extraction||{},selectors:Array.isArray(e?.extraction?.selectors)?[...e.extraction.selectors]:[]},processor:{...e.processor||{},options:{...e?.processor?.options||{}}},runtime:{...e.runtime||{}},extractTags:Array.isArray(e.extractTags)?[...e.extractTags]:[]}:null}function qb(t,e={},r=""){if(!t)return null;let s={...t,...e,id:t.id||e.id};s.output={...t.output||{},...e.output||{}},s.automation={settleMs:Number.isFinite(e?.automation?.settleMs)?e.automation.settleMs:Number.isFinite(t?.automation?.settleMs)?t.automation.settleMs:1200,cooldownMs:Number.isFinite(e?.automation?.cooldownMs)?e.automation.cooldownMs:Number.isFinite(t?.automation?.cooldownMs)?t.automation.cooldownMs:5e3},s.bypass={...t.bypass||{},...e.bypass||{}},s.worldbooks={...t.worldbooks||{},...e.worldbooks||{},selected:Array.isArray(e?.worldbooks?.selected)?[...e.worldbooks.selected]:Array.isArray(t?.worldbooks?.selected)?[...t.worldbooks.selected]:[]},s.runtime=vs({...t.runtime||{},...e.runtime||{}}),s.extraction={...t.extraction||{},...e.extraction||{}},s.processor={...t.processor||{},...e.processor||{},options:{...t?.processor?.options||{},...e?.processor?.options||{}}};let o=e?.output?.apiPreset||e?.apiPreset||s.output?.apiPreset||s.apiPreset||r||"";return s.output={...s.output||{},apiPreset:o},s.apiPreset=o,t.isCustom?s.enabled=t.enabled!==!1:typeof e.enabled=="boolean"?s.enabled=e.enabled:s.enabled=t.enabled!==!1,s}function np(t,e){if(!t||typeof t!="string")return yt.error("\u5DE5\u5177ID\u65E0\u6548"),!1;if(!e||typeof e!="object")return yt.error("\u5DE5\u5177\u914D\u7F6E\u65E0\u6548"),!1;let r=["name","icon","component"];for(let s of r)if(!e[s])return yt.error(` \u5DE5\u5177\u7F3A\u5C11\u5FC5\u9700\u5B57\u6BB5: ${s}`),!1;return er[t]={id:t,...e,order:e.order??Object.keys(er).length},yt.log(` \u5DE5\u5177\u5DF2\u6CE8\u518C: ${t}`),!0}function ap(t){return er[t]?(delete er[t],yt.log(` \u5DE5\u5177\u5DF2\u6CE8\u9500: ${t}`),!0):(yt.warn(` \u5DE5\u5177\u4E0D\u5B58\u5728: ${t}`),!1)}function ip(t=!0){let e=Object.values(er).map(r=>r.id==="tools"?{...r,subTabs:op()}:r);return t?e.sort((r,s)=>(r.order??0)-(s.order??0)):e}function Xo(t){return t==="tools"&&er[t]?{...er[t],subTabs:op()}:er[t]||null}function cl(t){return!!er[t]}function lp(t){let e=Xo(t);return!e||!e.hasSubTabs?[]:e.subTabs||[]}function cp(){er={...ro},yt.log("\u5DE5\u5177\u6CE8\u518C\u8868\u5DF2\u91CD\u7F6E")}function dp(t,e){if(!cl(t))return yt.warn(` \u5DE5\u5177\u4E0D\u5B58\u5728: ${t}`),!1;let r=D.get(Ot)||{};return r[t]=e||"",D.set(Ot,r),yt.log(` \u5DE5\u5177 "${t}" \u7ED1\u5B9A\u5230\u9884\u8BBE "${e||"\u5F53\u524D\u914D\u7F6E"}"`),!0}function dl(t){return(D.get(Ot)||{})[t]||""}function up(t){let e=D.get(Ot)||{};delete e[t],D.set(Ot,e),yt.log(` \u5DE5\u5177 "${t}" \u7684API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u6E05\u9664`)}function pp(){return D.get(Ot)||{}}function yp(t){let e=D.get(Ot)||{},r=!1;for(let s in e)e[s]===t&&(e[s]="",r=!0,yt.log(` \u5DE5\u5177 "${s}" \u7684API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u6E05\u9664\uFF08\u9884\u8BBE\u88AB\u5220\u9664\uFF09`));r&&D.set(Ot,e)}function ne(t){let e=ll(t);if(!e)return Xo(t);let s=(D.get(Or)||{})[t]||{},o=dl(t),n=qb({...e,id:t},s,o);return typeof window<"u"&&window.YYT_PRESET_DEBUG&&typeof console<"u"&&console.log&&console.log(`[YYT-DEBUG][getToolFullConfig] ${t}`,{base_extraction:JSON.parse(JSON.stringify(e.extraction||{})),base_worldbooks:JSON.parse(JSON.stringify(e.worldbooks||{})),user_extraction:JSON.parse(JSON.stringify(s.extraction||{})),user_worldbooks:JSON.parse(JSON.stringify(s.worldbooks||{})),merged_extraction:JSON.parse(JSON.stringify(n.extraction||{})),merged_worldbooks:JSON.parse(JSON.stringify(n.worldbooks||{}))}),n}function so(t){if(!t)return!1;let e=ll(t);if(!e)return!1;let r=D.get(Or)||{};if(r[t])return!0;let s={promptTemplate:e.promptTemplate||"",enabled:e.enabled!==!1,extractTags:Array.isArray(e.extractTags)?[...e.extractTags]:[],apiPreset:e.apiPreset||"",output:{...e.output||{}},automation:{...e.automation||{}},bypass:{...e.bypass||{}},worldbooks:{...e.worldbooks||{},selected:Array.isArray(e?.worldbooks?.selected)?[...e.worldbooks.selected]:[]},extraction:{...e.extraction||{},selectors:Array.isArray(e?.extraction?.selectors)?[...e.extraction.selectors]:[]},processor:{...e.processor||{},options:{...e?.processor?.options||{}}},runtime:{...e.runtime||{}}};r[t]=s,D.set(Or,r);let o=D.get(Ot)||{};return o[t]=s.output?.apiPreset||s.apiPreset||"",D.set(Ot,o),K.emit(B.TOOL_UPDATED,{toolId:t,config:s}),!0}function Re(t,e,r={}){if(!t||!ne(t))return yt.warn("\u5DE5\u5177\u4E0D\u5B58\u5728:",t),!1;let{emitEvent:s=!0}=r,o=D.get(Or)||{},n=D.get(Ot)||{},a=e?.output?.apiPreset??e?.apiPreset??"",i=["promptTemplate","enabled","extractTags","apiPreset","output","automation","bypass","worldbooks","extraction","processor","runtime"];return o[t]={},i.forEach(l=>{if(e[l]!==void 0){if(l==="output"&&e.output){o[t][l]={...e.output,apiPreset:a};return}if(l==="apiPreset"){o[t][l]=a;return}o[t][l]=e[l]}}),o[t].apiPreset===void 0&&(o[t].apiPreset=a),!o[t].output&&e.output!==void 0&&(o[t].output={...e.output||{},apiPreset:a}),D.set(Or,o),n[t]=a,D.set(Ot,n),typeof window<"u"&&window.YYT_PRESET_DEBUG&&typeof console<"u"&&console.log&&console.log(`[YYT-DEBUG][saveToolConfig] ${t}`,{input_extraction:JSON.parse(JSON.stringify(e.extraction||{})),input_worldbooks:JSON.parse(JSON.stringify(e.worldbooks||{})),saved_extraction:JSON.parse(JSON.stringify(o[t].extraction||{})),saved_worldbooks:JSON.parse(JSON.stringify(o[t].worldbooks||{})),verify_storage:JSON.parse(JSON.stringify((D.get(Or)||{})[t]?.extraction||{}))}),s&&K.emit(B.TOOL_UPDATED,{toolId:t,config:o[t]}),yt.log(` \u5DE5\u5177\u914D\u7F6E\u5DF2\u4FDD\u5B58: ${t}`),!0}function Vb(t,e){let r=ne(t);return r?Re(t,{...r,output:{...r.output,mode:e}}):!1}function Jb(t,e){let r=ne(t);return r?Re(t,{...r,apiPreset:e,output:{...r.output,apiPreset:e}}):!1}function Xb(t,e){let r=ne(t);return r?Re(t,{...r,bypass:{...r.bypass,...e}}):!1}function Qb(t,e){let r=ne(t);return r?Re(t,{...r,promptTemplate:e}):!1}function Br(t,e,r={}){let s=ne(t);if(!s)return!1;let{touchLastRunAt:o=!1,emitEvent:n=!1,emitRuntimeEvent:a=!0}=r,i=vs({...s.runtime||{},...e||{}});o&&(i.lastRunAt=Date.now());let l=Re(t,{...s,runtime:i},{emitEvent:n});return l&&a&&K.emit(B.TOOL_RUNTIME_UPDATED,{toolId:t,runtime:i,previousRuntime:vs(s.runtime||{})}),l}function fp(t,e,r={},s={}){let o=ne(t);if(!o)return!1;let{limit:n=10,emitEvent:a=!1,emitRuntimeEvent:i=!0}=s,l=vs(o.runtime||{}),c=vs(o.runtime||{}),d="recentWritebackHistory",u={id:r?.id||`hist_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,at:r?.at||Date.now(),...r};l[d]=Yb([...Array.isArray(l[d])?l[d]:[],u],n),u?.traceId&&(l.lastTraceId=u.traceId);let y=Re(t,{...o,runtime:l},{emitEvent:a});return y&&i&&K.emit(B.TOOL_RUNTIME_UPDATED,{toolId:t,runtime:l,previousRuntime:c,historyType:e,historyEntry:u}),y}function ul(t,e,r={}){let{touchLastRunAt:s=!0,emitEvent:o=!1,emitRuntimeEvent:n=!0}=r;return Br(t,e,{touchLastRunAt:s,emitEvent:o,emitRuntimeEvent:n})}function gp(t){if(!t||!Jo[t])return yt.warn("\u5DE5\u5177\u4E0D\u5B58\u5728:",t),!1;let e=D.get(Or)||{};return delete e[t],D.set(Or,e),K.emit(B.TOOL_UPDATED,{toolId:t,config:null}),yt.log(` \u5DE5\u5177\u914D\u7F6E\u5DF2\u91CD\u7F6E: ${t}`),!0}function mp(){return{...Jo}}function Qo(){let t=new Set([...Object.keys(Jo),...sp().map(([e])=>e)]);return Array.from(t).map(e=>ne(e)).filter(Boolean)}function hp(){return Qo().filter(t=>t&&t.enabled)}function bp(t,e){let r=D.get(il)||{};r[t]={...e,updatedAt:Date.now()},D.set(il,r)}function xp(t){return(D.get(il)||{})[t]||null}var yt,Or,Ot,il,Jo,ro,rp,er,Zb,tr=N(()=>{Ke();Je();H();Vo();yt=R.createScope("ToolRegistry"),Or="tool_configs",Ot="tool_api_bindings",il="tool_window_states";Jo={summaryTool:{id:"summaryTool",name:"\u6458\u8981\u5DE5\u5177",icon:"fa-file-lines",description:"\u751F\u6210\u5267\u60C5\u6458\u8981\u5757",enabled:!0,order:3,bypass:{enabled:!1,presetId:""},output:{mode:"follow_ai",apiPreset:"",overwrite:!0,enabled:!0},automation:{settleMs:1200,cooldownMs:5e3},worldbooks:{enabled:!1,selected:[]},extraction:{enabled:!0,maxMessages:5,regexPresetId:"builtin_regex_summary"},promptTemplate:`\u8BF7\u6839\u636E\u4EE5\u4E0BAI\u56DE\u590D\u751F\u6210\u6458\u8981\u5757\uFF1A

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
</youyou>`,runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},apiPreset:"",extractTags:[]},escapeTransformTool:{id:"escapeTransformTool",name:"\u8F6C\u4E49\u5904\u7406",icon:"fa-quote-left",description:"\u5BF9\u63D0\u53D6\u5185\u5BB9\u6267\u884C\u672C\u5730\u8F6C\u4E49\u6216\u53BB\u8F6C\u4E49",enabled:!0,order:6,output:{mode:"local_transform",apiPreset:"",overwrite:!0,enabled:!0,autoTrigger:!0},extraction:{enabled:!0,maxMessages:5,selectors:[]},processor:{type:"escape_transform",direction:"escape",options:{doubleQuote:!0,singleQuote:!1,newline:!1}},runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},extractTags:[]},punctuationTransformTool:{id:"punctuationTransformTool",name:"\u4E2D\u6587\u6807\u70B9\u66FF\u6362",icon:"fa-language",description:"\u5C06\u82F1\u6587\u6807\u70B9\u6309\u52FE\u9009\u9879\u66FF\u6362\u4E3A\u4E2D\u6587\u6807\u70B9",enabled:!0,order:7,output:{mode:"local_transform",apiPreset:"",overwrite:!0,enabled:!0,autoTrigger:!0},extraction:{enabled:!0,maxMessages:5,selectors:[]},processor:{type:"punctuation_transform",direction:"en_to_zh",options:{comma:!0,period:!0,exclamation:!0,question:!0,semicolon:!1,colon:!1,leftParen:!1,rightParen:!1}},runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},extractTags:[]}},ro={presetManagement:{id:"presetManagement",name:"\u9884\u8BBE\u7BA1\u7406",icon:"fa-bookmark",hasSubTabs:!0,description:"\u7EDF\u4E00\u7BA1\u7406 API / \u6B63\u5219 / \u4E16\u754C\u4E66 / \u8868\u683C\u6A21\u677F\u9884\u8BBE",order:0,subTabs:[{id:"apiPresets",name:"API \u9884\u8BBE",icon:"fa-database",component:"ApiPresetPanel",presetKind:"api"},{id:"regexPresets",name:"\u6B63\u5219\u63D0\u53D6",icon:"fa-filter",component:"RegexExtractPanel",presetKind:"regex"},{id:"worldbookPresets",name:"\u4E16\u754C\u4E66",icon:"fa-book-atlas",component:"WorldbookPresetPanel",presetKind:"worldbook"},{id:"tableTemplates",name:"\u8868\u683C\u6A21\u677F",icon:"fa-table-list",component:"TableTemplatePanel",presetKind:"table"}]},tools:{id:"tools",name:"\u5DE5\u5177",icon:"fa-tools",hasSubTabs:!0,description:"\u5DE5\u5177\u96C6\u5408",order:4,subTabs:[{id:"summaryTool",name:"\u6458\u8981\u5DE5\u5177",icon:"fa-file-lines",component:"SummaryToolPanel",toolKind:"ai"},{id:"statusBlock",name:"\u4E3B\u89D2\u72B6\u6001\u680F",icon:"fa-user-check",component:"StatusBlockPanel",toolKind:"ai"},{id:"youyouReview",name:"\u5C0F\u5E7D\u70B9\u8BC4",icon:"fa-comment-dots",component:"YouyouReviewPanel",toolKind:"ai"},{id:"escapeTransformTool",name:"\u8F6C\u4E49\u5904\u7406",icon:"fa-quote-left",component:"EscapeTransformToolPanel",toolKind:"script"},{id:"punctuationTransformTool",name:"\u4E2D\u6587\u6807\u70B9\u66FF\u6362",icon:"fa-language",component:"PunctuationTransformToolPanel",toolKind:"script"}]},tableWorkbench:{id:"tableWorkbench",name:"\u586B\u8868\u5DE5\u4F5C\u53F0",icon:"fa-table-cells",hasSubTabs:!1,description:"\u7ED3\u6784\u5316\u586B\u8868\u4E0E\u72B6\u6001\u9884\u89C8\u5DE5\u4F5C\u53F0",component:"TableWorkbenchPanel",order:5},bypass:{id:"bypass",name:"Ai\u6307\u4EE4\u9884\u8BBE",icon:"fa-shield-halved",hasSubTabs:!1,description:"\u7BA1\u7406 Ai \u6307\u4EE4\u9884\u8BBE",component:"BypassPanel",order:6},settings:{id:"settings",name:"\u8BBE\u7F6E",icon:"fa-cog",hasSubTabs:!1,description:"\u5168\u5C40\u8BBE\u7F6E",component:"SettingsPanel",order:7},logger:{id:"logger",name:"\u65E5\u5FD7",icon:"fa-terminal",hasSubTabs:!1,description:"\u67E5\u770B\u63D2\u4EF6\u8FD0\u884C\u65E5\u5FD7\uFF0C\u652F\u6301\u8FC7\u6EE4\u4E0E\u5BFC\u51FA",component:"LoggerPanel",order:8}},rp={api:{name:"API\u5DE5\u5177",icon:"fa-plug",order:0},prompt:{name:"\u63D0\u793A\u8BCD\u5DE5\u5177",icon:"fa-file-alt",order:1},utility:{name:"\u5B9E\u7528\u5DE5\u5177",icon:"fa-wrench",order:2}},er={...ro};Zb={TOOL_REGISTRY:ro,TOOL_CATEGORIES:rp,registerTool:np,unregisterTool:ap,getToolList:ip,getToolConfig:Xo,hasTool:cl,getToolSubTabs:lp,resetToolRegistry:cp,setToolApiPreset:dp,getToolApiPreset:dl,clearToolApiPreset:up,getAllToolApiBindings:pp,onPresetDeleted:yp,saveToolWindowState:bp,getToolWindowState:xp,getToolBaseConfig:na,ensureToolRuntimeConfig:so,getToolFullConfig:ne,patchToolRuntime:Br,appendToolRuntimeHistory:fp,saveToolConfig:Re,resetToolConfig:gp,getAllDefaultToolConfigs:mp,getAllToolFullConfigs:Qo,getEnabledTools:hp}});function la(){return`rgx_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`}function Sp(){return`r_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,6)}`}function gl(t={}){let e=Object.values(Ht).includes(t.type)?t.type:Ht.INCLUDE;return{id:String(t.id||Sp()),name:String(t.name||"").trim(),description:String(t.description||""),type:e,value:String(t.value||""),enabled:t.enabled!==!1}}function rr(t={}){return{id:String(t.id||la()),name:String(t.name||"").trim()||"\u672A\u547D\u540D\u9884\u8BBE",description:String(t.description||""),rules:Array.isArray(t.rules)?t.rules.map(gl):[],blacklist:Array.isArray(t.blacklist)?t.blacklist.map(e=>String(e||"").trim()).filter(Boolean):[],createdAt:Number.isFinite(t.createdAt)?t.createdAt:Date.now(),updatedAt:Number.isFinite(t.updatedAt)?t.updatedAt:Date.now()}}function br(){let t=Ie.get(fl);return!t||typeof t!="object"?{}:t}function Zo(t){Ie.set(fl,t)}function Ts(t){return typeof t=="string"&&t.startsWith(ex)}function _p(t){return Ts(t)&&aa.find(e=>e.id===t)||null}function ml(t){if(!Array.isArray(t)){aa=[];return}aa=t.map(e=>rr({...e,id:String(e?.id||"")})).filter(e=>Ts(e.id))}function no(){if(Tp)return;Tp=!0;let t=D.get(wp)||{};if(t[vp]===!0)return;let e=br(),r=Object.keys(e).length>0,s=0,o={...e},n=t.tagRulePresets||{};for(let a of Object.values(n)){let i=rr({id:la(),name:a.name||"\u5DF2\u8FC1\u79FB\u9884\u8BBE",description:a.description||"",rules:a.rules||[],blacklist:a.blacklist||[],createdAt:typeof a.createdAt=="string"&&Date.parse(a.createdAt)||Date.now(),updatedAt:Date.now()});o[i.id]=i,s+=1}if(!r&&s===0){let a=Array.isArray(t.tagRules)?t.tagRules:[],i=Array.isArray(t.contentBlacklist)?t.contentBlacklist:[];if(a.length||i.length){let l=rr({name:"\u9ED8\u8BA4\u89C4\u5219\u96C6\uFF08\u8FC1\u79FB\uFF09",description:"\u4ECE\u8001\u7248\u672C\u7684\u5F53\u524D\u89C4\u5219\u8FC1\u79FB\u800C\u6765",rules:a,blacklist:i});o[l.id]=l,Ie.set(oo,l.id),s+=1}}s>0&&(Zo(o),zr.info(`\u5DF2\u4ECE\u8001\u6570\u636E\u8FC1\u79FB ${s} \u4E2A\u6B63\u5219\u9884\u8BBE`)),D.set(wp,{...t,[vp]:!0})}function tx(){no();let t=br(),e=new Set,r=[];for(let o of aa){let n=t[o.id];n?(r.push(rr(n)),e.add(o.id)):r.push(o)}let s=Object.values(t).map(rr).filter(o=>!e.has(o.id)).sort((o,n)=>n.updatedAt-o.updatedAt);return r.push(...s),r}function xr(t){if(!t)return null;no();let e=br();return e[t]?rr(e[t]):Ts(t)?_p(t):null}function ca(){no();let t=Ie.get(oo);return typeof t=="string"&&t?t:""}function Ep(){let t=ca();return t?xr(t):null}function rx(t){if(t&&Ts(t))return Ie.set(oo,t),ia(),K.emit(B.PRESET_ACTIVATED,{kind:"regex",id:t}),!0;let e=br();return t&&!e[t]?(zr.warn(`setCurrentPresetId \u627E\u4E0D\u5230\u9884\u8BBE: ${t}`),!1):(Ie.set(oo,t||""),ia(),K.emit(B.PRESET_ACTIVATED,{kind:"regex",id:t}),!0)}function da(t={}){no();let e=rr({...t,id:la(),createdAt:Date.now(),updatedAt:Date.now()}),r=br();return r[e.id]=e,Zo(r),K.emit(B.PRESET_CREATED,{kind:"regex",id:e.id}),zr.info(`\u521B\u5EFA\u9884\u8BBE: ${e.id} (${e.name})`),e}function Ss(t,e={}){if(!t)return null;let r=br(),s=r[t];if(!s&&Ts(t)&&(s=_p(t)),!s)return null;let o=rr({...s,...e,id:t,createdAt:s.createdAt,updatedAt:Date.now()});return r[t]=o,Zo(r),ca()===t&&yl(o),K.emit(B.PRESET_UPDATED,{kind:"regex",id:t}),o}function sx(t){if(!t)return!1;if(Ts(t))return zr.warn(`\u62D2\u7EDD\u5220\u9664\u5185\u7F6E\u9884\u8BBE: ${t}`),!1;let e=br();return e[t]?(delete e[t],Zo(e),ca()===t&&(Ie.set(oo,""),ia()),K.emit(B.PRESET_DELETED,{kind:"regex",id:t}),zr.info(`\u5220\u9664\u9884\u8BBE: ${t}`),!0):!1}function ox(t,{nameSuffix:e=" \u526F\u672C"}={}){let r=xr(t);return r?da({...r,id:void 0,name:`${r.name}${e}`}):null}function nx(t,e){return Ts(t)?(zr.warn(`\u62D2\u7EDD\u91CD\u547D\u540D\u5185\u7F6E\u9884\u8BBE: ${t}`),null):Ss(t,{name:String(e||"").trim()||"\u672A\u547D\u540D\u9884\u8BBE"})}function ax(t,e={}){let r=xr(t);if(!r)return null;let s=gl({...e,id:Sp()}),o=[...r.rules,s];return Ss(t,{rules:o})}function ix(t,e,r={}){let s=xr(t);if(!s)return null;let o=s.rules.map(n=>n.id===e?gl({...n,...r,id:n.id}):n);return Ss(t,{rules:o})}function lx(t,e){let r=xr(t);if(!r)return null;let s=r.rules.filter(o=>o.id!==e);return Ss(t,{rules:s})}function cx(t,e,r){let s=xr(t);if(!s)return null;let o=s.rules.findIndex(i=>i.id===e);if(o<0)return null;let n=r==="up"?o-1:o+1;if(n<0||n>=s.rules.length)return null;let a=[...s.rules];return[a[o],a[n]]=[a[n],a[o]],Ss(t,{rules:a})}function dx(t,e){let r=Array.isArray(e)?e.map(s=>String(s||"").trim()).filter(Boolean):[];return Ss(t,{blacklist:Array.from(new Set(r))})}function ux(){return no(),{version:1,exportedAt:Date.now(),presets:Object.values(br()).map(rr)}}function px(t){if(no(),!t||typeof t!="object")return{added:0};let e=Array.isArray(t.presets)?t.presets:[],r=br(),s=0;for(let o of e){let n=rr({...o,id:la(),createdAt:Date.now(),updatedAt:Date.now()});r[n.id]=n,s+=1}return s>0&&(Zo(r),K.emit(B.PRESET_IMPORTED,{kind:"regex",count:s})),{added:s}}function yx(){Ie.set(fl,{}),Ie.set(oo,""),ia(),zr.info("\u5DF2\u6E05\u7A7A\u6240\u6709\u6B63\u5219\u9884\u8BBE")}async function yl(t){if(t)try{let e=await Promise.resolve().then(()=>(Js(),ol));typeof e.setCurrentRules=="function"&&e.setCurrentRules(JSON.parse(JSON.stringify(t.rules||[]))),typeof e.setContentBlacklist=="function"&&e.setContentBlacklist(JSON.parse(JSON.stringify(t.blacklist||[])))}catch(e){zr.warn("\u540C\u6B65\u5230 regex-extractor \u5931\u8D25",{error:e})}}function ia(){let t=Ep();return yl(t||{rules:[],blacklist:[]})}async function fx(t){if(!t)return[];try{let e=await Promise.resolve().then(()=>(tr(),pl));return(typeof e.getToolList=="function"?e.getToolList(!1):[]).filter(s=>(typeof e.getToolFullConfig=="function"?e.getToolFullConfig(s.id):null)?.extraction?.regexPresetId===t).map(s=>s.id)}catch{return[]}}var zr,fl,oo,wp,vp,Ht,ex,aa,Tp,Se,Kr=N(()=>{Ke();Je();H();zr=R.createScope("RegexPresetStore"),fl="regex_presets",oo="regex_current_preset",wp="settings",vp="regex_presets_migrated",Ht=Object.freeze({INCLUDE:"include",EXCLUDE:"exclude",REGEX_INCLUDE:"regex_include",REGEX_EXCLUDE:"regex_exclude"});ex="builtin_regex_",aa=[];Tp=!1;Se={listPresets:tx,getPreset:xr,getCurrentPresetId:ca,getCurrentPreset:Ep,setCurrentPresetId:rx,createPreset:da,updatePreset:Ss,deletePreset:sx,duplicatePreset:ox,renamePreset:nx,addRule:ax,updateRule:ix,deleteRule:lx,moveRule:cx,setBlacklist:dx,exportAll:ux,importPresets:px,resetAll:yx,findLinkedTools:fx,RULE_TYPES:Ht}});var Ip={};se(Ip,{RegexExtractPanel:()=>Cp,default:()=>vx});function mx(t,e,r,s,o,n){let a=m("div",{style:{display:"grid",gridTemplateColumns:"auto auto minmax(140px, 1fr) 200px minmax(120px, 2fr) auto",gap:"10px",alignItems:"center",padding:"10px 0",borderTop:r===0?"none":"1px solid var(--yyt-border)",opacity:e.enabled===!1?"0.55":"1"},attrs:{draggable:n?null:"true","data-rule-id":e.id}}),i=m("div",{style:{cursor:n?"default":"grab",padding:"4px",color:"var(--yyt-text-muted)",fontSize:"14px",userSelect:"none"},text:"\u22EE\u22EE",title:n?"\u5185\u7F6E\u9884\u8BBE\u4E0D\u53EF\u91CD\u6392":"\u62D6\u52A8\u6392\u5E8F"});a.appendChild(i);let l=m("div",{style:{display:"flex",flexDirection:"column",gap:"2px"}}),c=fe({label:"\u25B2",size:"small",variant:"ghost",title:"\u4E0A\u79FB",disabled:n||r===0,onClick:()=>{Se.moveRule(t.id,e.id,"up"),o()}}),d=fe({label:"\u25BC",size:"small",variant:"ghost",title:"\u4E0B\u79FB",disabled:n||r===s-1,onClick:()=>{Se.moveRule(t.id,e.id,"down"),o()}});for(let T of[c,d])T.el.style.padding="0 6px",T.el.style.minHeight="auto",T.el.style.fontSize="9px";l.appendChild(c.el),l.appendChild(d.el),a.appendChild(l);let u=m("div",{style:{display:"flex",flexDirection:"column",gap:"2px",minWidth:"0"}}),y=et({value:e.name||"",placeholder:"\u89C4\u5219\u540D\uFF08\u53EF\u9009\uFF09",disabled:n,onChange:T=>Se.updateRule(t.id,e.id,{name:T})});y.el.style.fontSize="12px",y.el.style.padding="6px 10px",u.appendChild(y.el),e.description&&u.appendChild(m("div",{text:e.description,style:{fontSize:"10px",color:"var(--yyt-text-muted)"}})),a.appendChild(u);let p=Qe({value:e.type,disabled:n,options:gx,onChange:T=>{Se.updateRule(t.id,e.id,{type:T}),o()}});p.el.style.fontSize="11px",p.el.style.padding="6px 10px",a.appendChild(p.el);let f=e.type===Ht.REGEX_INCLUDE||e.type===Ht.REGEX_EXCLUDE,g=et({value:e.value||"",placeholder:f?"\u6B63\u5219\u8868\u8FBE\u5F0F...":"\u6807\u7B7E\u540D\uFF08\u5982 content\uFF09",disabled:n,onChange:T=>Se.updateRule(t.id,e.id,{value:T})});g.el.style.fontSize="12px",g.el.style.padding="6px 10px",g.el.style.fontFamily="ui-monospace, monospace",a.appendChild(g.el);let h=m("div",{style:{display:"flex",gap:"6px",alignItems:"center"}}),x=St({checked:e.enabled!==!1,disabled:n,onChange:T=>{Se.updateRule(t.id,e.id,{enabled:T}),o()}});return x.el.style.padding="0",x.el.style.border="none",x.el.style.background="transparent",h.appendChild(x.el),n||h.appendChild(fe({label:"\xD7",size:"small",variant:"ghost",title:"\u5220\u9664\u89C4\u5219",onClick:()=>{Se.deleteRule(t.id,e.id),o()}}).el),a.appendChild(h),a}function hx(t,e,r){let s=null;t.addEventListener("dragstart",o=>{let n=o.target;if(!(n instanceof HTMLElement))return;let a=n.closest("[data-rule-id]");if(a){s=a.getAttribute("data-rule-id"),a.style.opacity="0.4";try{o.dataTransfer.effectAllowed="move",o.dataTransfer.setData("text/plain",s)}catch{}}}),t.addEventListener("dragend",o=>{let n=o.target;n instanceof HTMLElement&&(n.style.opacity=""),s=null}),t.addEventListener("dragover",o=>{if(s){o.preventDefault();try{o.dataTransfer.dropEffect="move"}catch{}}}),t.addEventListener("drop",o=>{if(o.preventDefault(),!s)return;let n=o.target instanceof HTMLElement?o.target.closest("[data-rule-id]"):null;if(!n)return;let a=n.getAttribute("data-rule-id");if(!a||a===s)return;let i=Se.getPreset(e.id);if(!i)return;let l=i.rules.findIndex(y=>y.id===s),c=i.rules.findIndex(y=>y.id===a);if(l<0||c<0)return;let d=[...i.rules],[u]=d.splice(l,1);d.splice(c,0,u),Se.updatePreset(e.id,{rules:d}),r()})}function bx(t,{onChange:e,readonly:r,refresh:s}){let o=m("div",{style:{display:"flex",flexDirection:"column",gap:"14px"}});F(o,_t({label:"\u63CF\u8FF0",control:et({value:t.description,placeholder:"\u53EF\u9009 \u2014 \u5907\u6CE8\u7528\u9014",disabled:r,onChange:i=>e({description:i})})}));let n=m("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"6px"}},m("div",{text:"\u63D0\u53D6\u89C4\u5219\uFF08\u6309\u987A\u5E8F\u5E94\u7528\uFF09",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}}),r?m("span",{text:"\u5185\u7F6E\u9884\u8BBE\u53EA\u8BFB",style:{fontSize:"11px",color:"var(--yyt-text-muted)"}}):fe({label:"+ \u65B0\u589E\u89C4\u5219",size:"small",onClick:()=>{Se.addRule(t.id,{type:Ht.INCLUDE,value:"",enabled:!0}),s&&s()}}).el);F(o,n);let a=m("div");if(t.rules.length){for(let i=0;i<t.rules.length;i++)a.appendChild(mx(t,t.rules[i],i,t.rules.length,s,r));r||hx(a,t,s)}else a.appendChild(m("div",{style:{padding:"14px 0",color:"var(--yyt-text-muted)",fontSize:"12px"},text:'\u5C1A\u65E0\u89C4\u5219\u3002\u70B9\u51FB\u53F3\u4E0A\u89D2"+ \u65B0\u589E\u89C4\u5219"\u5F00\u59CB\u6DFB\u52A0\u3002'}));if(F(o,a),F(o,m("div",{text:"\u5185\u5BB9\u9ED1\u540D\u5355",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)",marginTop:"6px",marginBottom:"4px"}})),F(o,m("div",{text:"\u63D0\u53D6\u51FA\u7684\u5185\u5BB9\u5757\u82E5\u5305\u542B\u4EFB\u4E00\u5173\u952E\u8BCD\u5219\u8DF3\u8FC7\u8BE5\u5757\uFF08\u4E0D\u533A\u5206\u5927\u5C0F\u5199\uFF09\u3002",style:{fontSize:"11px",color:"var(--yyt-text-muted)",marginBottom:"6px"}})),r)F(o,m("div",{style:{fontSize:"12px",color:"var(--yyt-text-muted)"},text:t.blacklist.length?t.blacklist.join("\u3001"):"\uFF08\u7A7A\uFF09"}));else{let i=ji({values:t.blacklist,placeholder:"\u8F93\u5165\u5173\u952E\u8BCD\u56DE\u8F66\u6DFB\u52A0",chipVariant:"danger",onChange:l=>Se.setBlacklist(t.id,l)});F(o,i.el)}return o}function xx(t){if(!t)return null;let e=m("div",{style:{display:"flex",flexDirection:"column",gap:"8px"}});F(e,m("div",{text:"\u6D4B\u8BD5\u63D0\u53D6",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}}));let r=kp.get(t.id)||{input:"",output:""};kp.set(t.id,r);let s=m("textarea",{className:"yyt-textarea",attrs:{rows:"5",placeholder:"\u7C98\u8D34\u6D4B\u8BD5\u6587\u672C\uFF08\u5982 AI \u56DE\u590D\u539F\u6587\uFF09..."},style:{width:"100%",resize:"vertical",fontFamily:"ui-monospace, monospace",fontSize:"12px"}});s.value=r.input,s.addEventListener("input",()=>{r.input=s.value}),F(e,s);let o=m("div",{style:{padding:"10px",background:"var(--yyt-bg-base)",border:"1px solid var(--yyt-border)",borderRadius:"var(--yyt-radius-sm)",fontFamily:"ui-monospace, monospace",fontSize:"11px",lineHeight:"1.6",color:"var(--yyt-text-muted)",maxHeight:"200px",overflowY:"auto",whiteSpace:"pre-wrap",wordBreak:"break-all",minHeight:"50px"}});o.textContent=r.output||'// \u70B9\u51FB"\u8FD0\u884C\u6D4B\u8BD5"\u770B\u63D0\u53D6\u7ED3\u679C';let n=fe({label:"\u25B6 \u8FD0\u884C\u6D4B\u8BD5",size:"small",variant:"primary",onClick:()=>{let a=s.value;if(!a.trim()){r.output="// \u6D4B\u8BD5\u8F93\u5165\u4E3A\u7A7A",o.textContent=r.output,o.style.color="var(--yyt-text-muted)";return}try{let i=hr(a,t.rules||[],t.blacklist||[]);r.output=i||"// \u6CA1\u6709\u63D0\u53D6\u5230\u5185\u5BB9",o.textContent=r.output,o.style.color=i?"var(--yyt-text)":"var(--yyt-text-muted)"}catch(i){r.output=`// \u6D4B\u8BD5\u51FA\u9519\uFF1A${i?.message||i}`,o.textContent=r.output,o.style.color="var(--yyt-danger, #f87171)"}}});return F(e,n.el),F(e,o),e}function wx(t){let e=t.rules.filter(r=>r.enabled!==!1).length;return[`${t.rules.length} \u89C4\u5219\uFF08${e} \u542F\u7528\uFF09`,`${t.blacklist.length} \u9ED1\u540D\u5355`]}var X_,gx,kp,Cp,vx,Rp=N(()=>{fr();Kr();Js();H();Wo();X_=R.createScope("RegexExtractPanel"),gx=[{value:Ht.INCLUDE,label:"include \u2014 \u63D0\u53D6\u6807\u7B7E"},{value:Ht.EXCLUDE,label:"exclude \u2014 \u6392\u9664\u6807\u7B7E"},{value:Ht.REGEX_INCLUDE,label:"regex_include \u2014 \u6B63\u5219\u63D0\u53D6"},{value:Ht.REGEX_EXCLUDE,label:"regex_exclude \u2014 \u6B63\u5219\u6392\u9664"}],kp=new Map;Cp=Pr({id:"regexExtractPanel",kind:"regex",panelTitle:"\u6B63\u5219\u63D0\u53D6\u9884\u8BBE",panelHint:"\u7BA1\u7406\u591A\u4E2A\u63D0\u53D6\u89C4\u5219\u96C6\uFF0C\u5DE5\u5177\u914D\u7F6E\u4E2D\u901A\u8FC7\u9884\u8BBE ID \u5F15\u7528\u3002\u89C4\u5219\u6309\u987A\u5E8F\u5E94\u7528\uFF0C\u53EF\u62D6\u62FD\u6392\u5E8F\u3002",store:Se,renderEditor:bx,renderExtras:xx,renderListItemMeta:wx}),vx=Cp});function we(t){return t==null?"":String(t).trim()}function Sx(t="table"){let e=we(t)||"table",r=Date.now().toString(36),s=Math.random().toString(36).slice(2,8);return`${e}_${r}_${s}`}function en(t="row"){return Sx(t)}function Yt(t,e=0){return we(t)||`table_${Number.isFinite(e)?e+1:1}`}function tn(t,e=0){return we(t)||`row_${Number.isFinite(e)?e+1:1}`}function ae(t){if(t!==void 0)try{return JSON.parse(JSON.stringify(t))}catch{return t}}function ao(t={}){return{chatId:we(t.chatId),sourceMessageId:we(t.sourceMessageId||t.messageId),sourceSwipeId:we(t.sourceSwipeId||t.effectiveSwipeId),effectiveSwipeId:we(t.effectiveSwipeId||t.sourceSwipeId),slotBindingKey:we(t.slotBindingKey),slotRevisionKey:we(t.slotRevisionKey),slotTransactionId:we(t.slotTransactionId),traceId:we(t.traceId),resolvedAt:Number.isFinite(t.resolvedAt)?t.resolvedAt:Date.now()}}function hl(t={}){return{resolvedAt:Number.isFinite(t.resolvedAt)?t.resolvedAt:Date.now(),runSource:we(t.runSource)||tt.MANUAL,traceId:we(t.traceId),chatId:we(t.chatId),sourceMessageId:we(t.sourceMessageId||t.messageId),sourceSwipeId:we(t.sourceSwipeId||t.effectiveSwipeId),effectiveSwipeId:we(t.effectiveSwipeId||t.sourceSwipeId)||"swipe:current",slotBindingKey:we(t.slotBindingKey),slotRevisionKey:we(t.slotRevisionKey),slotTransactionId:we(t.slotTransactionId),assistantContentFingerprint:we(t.assistantContentFingerprint),assistantBaseFingerprint:we(t.assistantBaseFingerprint),assistantText:String(t.assistantText||""),assistantBaseText:String(t.assistantBaseText||""),targetMessageIndex:Number.isFinite(t.targetMessageIndex)?t.targetMessageIndex:-1}}function wr(t){return!t||typeof t!="object"?null:{chatId:we(t.chatId),slotBindingKey:we(t.slotBindingKey),slotRevisionKey:we(t.slotRevisionKey),sourceMessageId:we(t.sourceMessageId),sourceSwipeId:we(t.sourceSwipeId),tables:Array.isArray(t.tables)?ae(t.tables):[],updatedAt:Number.isFinite(t.updatedAt)?t.updatedAt:0,meta:t.meta&&typeof t.meta=="object"?ae(t.meta):{}}}function rn(t={},e={}){let r=hl(t),s=e.meta&&typeof e.meta=="object"?ae(e.meta):{};return{chatId:r.chatId,slotBindingKey:r.slotBindingKey,slotRevisionKey:r.slotRevisionKey,sourceMessageId:r.sourceMessageId,sourceSwipeId:r.sourceSwipeId||r.effectiveSwipeId,tables:Array.isArray(e.tables)?ae(e.tables):[],updatedAt:Number.isFinite(e.updatedAt)?e.updatedAt:Date.now(),meta:{sourceKind:s.sourceKind||At.EMPTY,...s}}}function ua(t){return!t||typeof t!="object"?{lastResolvedTarget:null,lastCommittedTarget:null,updatedAt:0}:{lastResolvedTarget:t.lastResolvedTarget?ao(t.lastResolvedTarget):null,lastCommittedTarget:t.lastCommittedTarget?ao(t.lastCommittedTarget):null,updatedAt:Number.isFinite(t.updatedAt)?t.updatedAt:0}}function _e(t){if(t==null)return bt;let e=String(t).trim();return e===""?bt:e}function sn(t,e){let r=we(t),s=_e(e);return`${r}::${s}`}function Pp(){return{rows:[],cols:[],cells:[],indexColumn:!1}}function Np(t,e){return`${Number.isFinite(t)?t:-1}:${Number.isFinite(e)?e:-1}`}var _s,Ur,tt,ft,Es,At,io,Tx,bt,je,Mp,Q_,Z_,Ue=N(()=>{_s="YouYouToolkit_tableState",Ur="YouYouToolkit_tableBindings",tt=Object.freeze({MANUAL:"MANUAL_TABLE",AUTO:"AUTO_TABLE"}),ft=Object.freeze({ENABLED:"enabled",SELECTED:"selected",CURRENT:"current"}),Es=Object.freeze({EXACT:"exact",BINDING_FALLBACK:"binding_fallback",HISTORY:"history",TEMPLATE:"template",EMPTY:"empty"}),At=Object.freeze({EXACT:"exact",BINDING:"binding",HISTORY:"history",TEMPLATE:"template",EMPTY:"empty"}),io=Object.freeze({INSERT_ROW:"insertRow",UPDATE_ROW:"updateRow",DELETE_ROW:"deleteRow"}),Tx=Object.freeze({CELL:"cell",ROW:"row",COLUMN:"column",INDEX_COLUMN:"index_column"});bt="";je=Object.freeze({INHERIT_GLOBAL:"inherit_global",CHAT_OVERRIDE:"chat_override",PRESET_LINK:"preset_link"}),Mp=8,Q_=Object.freeze({NOTE:"note",INIT_NODE:"initNode",INSERT_NODE:"insertNode",UPDATE_NODE:"updateNode",DELETE_NODE:"deleteNode"}),Z_=Object.freeze({INHERIT_GLOBAL:-1,DISABLED:0})});function pa(t,e=""){return t==null?e:String(t).trim()||e}function _x(t,e=!1){return t==null?e:t===!0}function ya(t={},e=0){return Yt(t?.id||t?.key,e)}function on(t={},e={}){let r=t&&typeof t=="object"?t:{},s=e&&typeof e=="object"?e:{},o=pa(r.mode||r.runScope||s.mode||s.runScope,ft.ENABLED),n=Array.isArray(r.selectedTableIds)?r.selectedTableIds.map(i=>pa(i,"")).filter(Boolean):Array.isArray(s.selectedTableIds)?s.selectedTableIds.map(i=>pa(i,"")).filter(Boolean):[],a=pa(r.activeTableId||s.activeTableId,"");return{mode:Object.values(ft).includes(o)?o:ft.ENABLED,selectedTableIds:n,activeTableId:a}}function $p(t={},e=[]){let r=on(t,t?.scope||{}),s=Array.isArray(e)?e:[],o=s.map((d,u)=>ya(d,u)),n=new Set(o),a=r.mode,i=!1;a===ft.CURRENT?(!r.activeTableId||!n.has(r.activeTableId))&&(a=ft.ENABLED,i=!0):a===ft.SELECTED&&r.selectedTableIds.filter(u=>n.has(u)).length===0&&(a=ft.ENABLED,i=!0);let l=[];a===ft.CURRENT?l=r.activeTableId?[r.activeTableId]:[]:a===ft.SELECTED?l=r.selectedTableIds.filter(d=>n.has(d)):l=s.map((d,u)=>({table:d,id:ya(d,u)})).filter(({table:d})=>_x(d?.enabled,!0)).map(({id:d})=>d);let c=new Set(l);return{...r,mode:a,requestedMode:r.mode,staleScope:i,allTableIds:o,allowedTableIds:l,allowedIdSet:c,includes(d={},u=-1){return c.has(ya(d,u))},filterTables(d=[]){return(Array.isArray(d)?d:[]).filter((y,p)=>c.has(ya(y,p)))},toJSON(){return{mode:a,requestedMode:r.mode,staleScope:i,selectedTableIds:ae(r.selectedTableIds),activeTableId:r.activeTableId,allowedTableIds:[...l]}}}}var fa=N(()=>{Ue()});function kt(t,e=""){return t==null?e:String(t).trim()||e}function bl(){let t=globalThis.window||globalThis;return kt(t?.TavernHelper?.getCurrentChatId?.()||t?.Silvy?.getCurrentChatId?.()||t?.chat_metadata?.chat_id||t?.this_chid||t?.name1,"default_chat")}function Ex(t,e=!1){return t===!0}function Ax(t={}){let e=t&&typeof t=="object"?t:{};return{enabled:Ex(e.enabled,!1),targetBook:kt(e.targetBook,""),entryComment:kt(e.entryComment,"YYT-\u586B\u8868\u6570\u636E")}}function xl(t={},e={}){let r=t&&typeof t=="object"?t:{},s=on(r.scope,{mode:r.runScope||e.runScope||ft.ENABLED,selectedTableIds:r.selectedTableIds||e.selectedTableIds||[],activeTableId:r.activeTableId||e.activeTableId||""});return{chatId:kt(r.chatId,kt(e.chatId,bl())),templateId:kt(r.templateId,kt(e.templateId,gt)),enabledTableIds:Array.isArray(r.enabledTableIds)?r.enabledTableIds.map(o=>kt(o,"")).filter(Boolean):[],focusedTableId:kt(r.focusedTableId,s.activeTableId),scope:s,worldbookSync:Ax(r.worldbookSync),seedNote:kt(r.seedNote,""),updatedAt:kt(r.updatedAt,new Date().toISOString())}}function Op(){let t=Dp.get(Lp,{});return t&&typeof t=="object"&&!Array.isArray(t)?t:{}}function wl(t=bl()){let e=kt(t,"default_chat"),r=Op();return xl(r[e],{chatId:e})}function Bp(t={},e=bl()){let r=kt(e,"default_chat"),s=Op(),o=xl({...s[r],...t||{},chatId:r,updatedAt:new Date().toISOString()},{chatId:r});return Dp.set(Lp,{...s,[r]:o}),{success:!0,guide:o}}function zp(t={},e=null){let r=xl(e||wl(),{templateId:t.activeTemplate,runScope:t.runScope,selectedTableIds:t.scope?.selectedTableIds,activeTableId:t.scope?.activeTableId}),s={...t,activeTemplate:r.templateId||t.activeTemplate,runScope:r.scope.mode,scope:r.scope};return r.worldbookSync&&r.worldbookSync.targetBook&&(s.worldbookSync={...t.worldbookSync||{},...r.worldbookSync}),s}var Dp,Lp,Kp=N(()=>{Ke();sr();Ue();fa();Dp=D.namespace("tableWorkbenchGuides"),Lp="guides"});function ee(t,e,r="",s=ma){return{key:t,title:e,description:r,type:s,required:!1}}function jr({id:t,name:e,note:r,aiInstructions:s,columns:o}){return{id:t,name:e,note:r,enabled:!0,aiInstructions:{init:s?.init||"",create:s?.create||"",update:s?.update||"",delete:s?.delete||""},columns:o,rows:[]}}var Ce,ga,vl,Up,kx,ma,jp,gt,Tl,lo,Fp=N(()=>{Ce=Object.freeze({IDLE:"idle",RUNNING:"running",SUCCESS:"success",ERROR:"error",ABORTED:"aborted",SKIPPED:"skipped"}),ga=Object.freeze({INCREMENTAL:"incremental",FULL:"full"}),vl=`\u8BF7\u6839\u636E\u5F53\u524D\u5BF9\u8BDD\u4E0E\u5F53\u524D\u8868\u683C\u57FA\u5E95\uFF0C\u5BF9\u7ED3\u6784\u5316 tables \u6570\u636E\u505A\u589E\u91CF\u66F4\u65B0\u3002

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
{{toolContentMacro}}`,Up=`\u8F93\u51FA\u8981\u6C42 \u2014 \u7528 <tableEdit>...</tableEdit> \u589E\u91CF DSL\uFF1A

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
\u4F46\u5E94\u8BE5\u5C3D\u91CF\u4F18\u5148\u7528 DSL\uFF08\u6D41\u91CF\u5C0F\u3001\u4E0D\u5F71\u54CD\u9501\u5B57\u6BB5\uFF09\u3002`,kx=Object.freeze([{value:"text",label:"\u6587\u672C"},{value:"number",label:"\u6570\u5B57"},{value:"boolean",label:"\u5E03\u5C14"},{value:"date",label:"\u65E5\u671F"},{value:"json",label:"JSON"}]),ma="text",jp=Object.freeze(kx.map(t=>Object.freeze({...t}))),gt="default_story_state",Tl="\u9ED8\u8BA4\u5267\u60C5\u72B6\u6001\u6A21\u677F";lo=Object.freeze([jr({id:"default_global_state",name:"\u5168\u5C40\u6570\u636E\u8868",note:"\u8BB0\u5F55\u5F53\u524D\u4E3B\u89D2\u6240\u5728\u5730\u70B9\u53CA\u65F6\u95F4\u76F8\u5173\u53C2\u6570\u3002\u6B64\u8868\u901A\u5E38\u6709\u4E14\u4EC5\u6709\u4E00\u884C\u3002",aiInstructions:{init:"\u63D2\u5165\u4E00\u6761\u5173\u4E8E\u5F53\u524D\u4E16\u754C\u72B6\u6001\u7684\u8BB0\u5F55\u3002",create:"\u901A\u5E38\u7981\u6B62\u65B0\u589E\uFF1B\u9664\u975E\u8868\u4E3A\u7A7A\u4E14\u9700\u8981\u521D\u59CB\u5316\u3002",update:"\u5F53\u5730\u70B9\u6216\u65F6\u95F4\u53D1\u751F\u53D8\u5316\u65F6\u66F4\u65B0\u6B64\u8868\uFF1B\u6BCF\u8F6E\u5E94\u6839\u636E\u5267\u60C5\u66F4\u65B0\u65F6\u95F4\u76F8\u5173\u5B57\u6BB5\u3002",delete:"\u7981\u6B62\u5220\u9664\u3002"},columns:[ee("location","\u4E3B\u89D2\u5F53\u524D\u6240\u5728\u5730\u70B9","\u4E3B\u89D2\u5F53\u524D\u6240\u5728\u7684\u5177\u4F53\u573A\u666F\u540D\u79F0\u3002"),ee("current_time","\u5F53\u524D\u65F6\u95F4","\u6E38\u620F\u4E16\u754C\u7684\u5F53\u524D\u65F6\u95F4\uFF1B\u5982\u5267\u60C5\u6CA1\u6709\u660E\u786E\u65F6\u95F4\uFF0C\u53EF\u6839\u636E\u4E16\u754C\u89C2\u7ED9\u51FA\u5408\u7406\u65F6\u95F4\u3002"),ee("previous_scene_time","\u4E0A\u8F6E\u573A\u666F\u65F6\u95F4","\u4E0A\u4E00\u8F6E\u4EA4\u4E92\u7ED3\u675F\u65F6\u7684\u65F6\u95F4\u3002"),ee("elapsed_time","\u7ECF\u8FC7\u7684\u65F6\u95F4","\u6839\u636E\u5F53\u524D\u4E0E\u4E0A\u8F6E\u65F6\u95F4\u8BA1\u7B97\u51FA\u7684\u6587\u672C\u63CF\u8FF0\u3002")]}),jr({id:"default_protagonist_profile",name:"\u4E3B\u89D2\u4FE1\u606F",note:"\u8BB0\u5F55\u4E3B\u89D2\u7684\u6838\u5FC3\u8EAB\u4EFD\u4FE1\u606F\u3002\u6B64\u8868\u901A\u5E38\u6709\u4E14\u4EC5\u6709\u4E00\u884C\u3002",aiInstructions:{init:"\u521D\u59CB\u5316\u65F6\u63D2\u5165\u4E3B\u89D2\u7684\u552F\u4E00\u6761\u76EE\u3002",create:"\u7981\u6B62\u65B0\u589E\u591A\u540D\u4E3B\u89D2\uFF1B\u9664\u975E\u8868\u4E3A\u7A7A\u4E14\u9700\u8981\u521D\u59CB\u5316\u3002",update:"\u5F53\u4E3B\u89D2\u8EAB\u4EFD\u3001\u5916\u8C8C\u3001\u7ECF\u5386\u6216\u6027\u683C\u6709\u660E\u786E\u53D8\u5316\u65F6\u66F4\u65B0\u3002",delete:"\u7981\u6B62\u5220\u9664\u3002"},columns:[ee("name","\u4EBA\u7269\u540D\u79F0","\u4E3B\u89D2\u7684\u540D\u5B57\u3002"),ee("gender_age","\u6027\u522B/\u5E74\u9F84","\u4E3B\u89D2\u7684\u6027\u522B\u4E0E\u5E74\u9F84\u3002"),ee("appearance","\u5916\u8C8C\u7279\u5F81","\u5BF9\u4E3B\u89D2\u5916\u8C8C\u7684\u5BA2\u89C2\u6587\u5B57\u63CF\u5199\u3002"),ee("identity","\u804C\u4E1A/\u8EAB\u4EFD","\u4E3B\u89D2\u5728\u793E\u4F1A\u6216\u5267\u60C5\u4E2D\u7684\u4E3B\u8981\u8EAB\u4EFD\u3002"),ee("history","\u8FC7\u5F80\u7ECF\u5386","\u4E3B\u89D2\u80CC\u666F\u6545\u4E8B\u4E0E\u5173\u952E\u7ECF\u5386\uFF0C\u968F\u5267\u60C5\u589E\u91CF\u66F4\u65B0\u3002"),ee("personality","\u6027\u683C\u7279\u70B9","\u5BF9\u4E3B\u89D2\u6838\u5FC3\u6027\u683C\u7684\u6982\u62EC\u3002")]}),jr({id:"default_important_characters",name:"\u91CD\u8981\u89D2\u8272\u8868",note:"\u8BB0\u5F55\u5173\u952E NPC \u6216\u91CD\u8981\u89D2\u8272\u7684\u4FE1\u606F\u548C\u52A8\u6001\u72B6\u6001\u3002",aiInstructions:{init:"\u521D\u59CB\u5316\u65F6\u4E3A\u5F53\u524D\u5728\u573A\u7684\u91CD\u8981\u4EBA\u7269\u5206\u522B\u63D2\u5165\u6761\u76EE\u3002",create:"\u5267\u60C5\u4E2D\u6709\u672A\u8BB0\u5F55\u7684\u91CD\u8981\u4EBA\u7269\u767B\u573A\u65F6\u65B0\u589E\u3002",update:"\u5DF2\u6709\u89D2\u8272\u7684\u72B6\u6001\u3001\u5173\u7CFB\u3001\u60F3\u6CD5\u3001\u7ECF\u5386\u6216\u6301\u6709\u7269\u53D8\u5316\u65F6\u66F4\u65B0\u3002",delete:'\u901A\u5E38\u7981\u6B62\u5220\u9664\uFF1B\u89D2\u8272\u79BB\u573A\u65F6\u4F18\u5148\u66F4\u65B0"\u662F\u5426\u79BB\u573A"\u3002'},columns:[ee("name","\u59D3\u540D","\u89D2\u8272\u59D3\u540D\u3002"),ee("gender_age","\u6027\u522B/\u5E74\u9F84","\u89D2\u8272\u7684\u6027\u522B\u4E0E\u5E74\u9F84\u3002"),ee("summary","\u4E00\u53E5\u8BDD\u4ECB\u7ECD","\u7528\u7B80\u77ED\u6587\u5B57\u6982\u62EC\u89D2\u8272\u8EAB\u4EFD\u80CC\u666F\u3002"),ee("appearance","\u5916\u8C8C\u7279\u5F81","\u5BF9\u89D2\u8272\u5916\u8C8C\u548C\u5F53\u524D\u8863\u7740\u7684\u5BA2\u89C2\u63CF\u5199\u3002"),ee("important_items","\u6301\u6709\u7684\u91CD\u8981\u7269\u54C1","\u89D2\u8272\u62E5\u6709\u7684\u5173\u952E\u7269\u54C1\uFF0C\u7528\u5206\u53F7\u5206\u9694\u3002"),ee("offstage","\u662F\u5426\u79BB\u573A",'\u5224\u65AD\u8BE5\u89D2\u8272\u5F53\u524D\u662F\u5426\u5DF2\u7ECF\u79BB\u573A\uFF0C\u586B\u5199"\u662F"\u6216"\u5426"\u3002',"boolean"),ee("history","\u8FC7\u5F80\u7ECF\u5386","\u89D2\u8272\u80CC\u666F\u4E0E\u5173\u952E\u4E8B\u4EF6\uFF0C\u968F\u5267\u60C5\u589E\u91CF\u66F4\u65B0\u3002")]}),jr({id:"default_protagonist_skills",name:"\u4E3B\u89D2\u6280\u80FD\u8868",note:"\u8BB0\u5F55\u4E3B\u89D2\u83B7\u5F97\u7684\u6280\u80FD\u3001\u80FD\u529B\u6216\u9636\u6BB5\u6027\u6210\u957F\u3002",aiInstructions:{init:"\u521D\u59CB\u5316\u65F6\u6839\u636E\u8BBE\u5B9A\u6DFB\u52A0\u4E3B\u89D2\u7684\u521D\u59CB\u6280\u80FD\u3002",create:"\u4E3B\u89D2\u83B7\u5F97\u65B0\u6280\u80FD\u6216\u65B0\u80FD\u529B\u65F6\u65B0\u589E\u3002",update:"\u5DF2\u6709\u6280\u80FD\u5347\u7EA7\u3001\u964D\u7EA7\u6216\u6548\u679C\u53D8\u5316\u65F6\u66F4\u65B0\u3002",delete:"\u6280\u80FD\u88AB\u5267\u60C5\u5265\u593A\u3001\u66FF\u6362\u6216\u5931\u6548\u65F6\u5220\u9664\u3002"},columns:[ee("skill_name","\u6280\u80FD\u540D\u79F0","\u6280\u80FD\u6216\u80FD\u529B\u540D\u79F0\u3002"),ee("skill_type","\u6280\u80FD\u7C7B\u578B","\u6280\u80FD\u7C7B\u522B\uFF0C\u4F8B\u5982\u4E3B\u52A8\u3001\u88AB\u52A8\u3001\u5929\u8D4B\u7B49\u3002"),ee("level","\u7B49\u7EA7/\u9636\u6BB5","\u6280\u80FD\u5F53\u524D\u7B49\u7EA7\u3001\u719F\u7EC3\u5EA6\u6216\u9636\u6BB5\u3002"),ee("effect","\u6548\u679C\u63CF\u8FF0","\u6280\u80FD\u5728\u5F53\u524D\u9636\u6BB5\u4E0B\u7684\u5177\u4F53\u6548\u679C\u3002")]}),jr({id:"default_inventory",name:"\u80CC\u5305\u7269\u54C1\u8868",note:"\u8BB0\u5F55\u4E3B\u89D2\u62E5\u6709\u7684\u7269\u54C1\u3001\u88C5\u5907\u6216\u6D88\u8017\u54C1\u3002",aiInstructions:{init:"\u521D\u59CB\u5316\u65F6\u6839\u636E\u5267\u60C5\u4E0E\u8BBE\u5B9A\u6DFB\u52A0\u4E3B\u89D2\u7684\u521D\u59CB\u643A\u5E26\u7269\u54C1\u3002",create:"\u4E3B\u89D2\u83B7\u5F97\u80CC\u5305\u4E2D\u6CA1\u6709\u7684\u5168\u65B0\u7269\u54C1\u65F6\u65B0\u589E\u3002",update:"\u5DF2\u6709\u7269\u54C1\u6570\u91CF\u3001\u72B6\u6001\u6216\u63CF\u8FF0\u53D8\u5316\u65F6\u66F4\u65B0\u3002",delete:"\u7269\u54C1\u88AB\u5B8C\u5168\u6D88\u8017\u3001\u4E22\u5F03\u6216\u6467\u6BC1\u65F6\u5220\u9664\u3002"},columns:[ee("item_name","\u7269\u54C1\u540D\u79F0","\u7269\u54C1\u540D\u79F0\u3002"),ee("quantity","\u6570\u91CF","\u62E5\u6709\u6570\u91CF\u3002","number"),ee("description","\u63CF\u8FF0/\u6548\u679C","\u7269\u54C1\u529F\u80FD\u3001\u6548\u679C\u6216\u80CC\u666F\u63CF\u8FF0\u3002"),ee("category","\u7C7B\u522B","\u7269\u54C1\u7C7B\u522B\uFF0C\u4F8B\u5982\u6B66\u5668\u3001\u6D88\u8017\u54C1\u3001\u6742\u7269\u7B49\u3002")]}),jr({id:"default_quests_events",name:"\u4EFB\u52A1\u4E0E\u4E8B\u4EF6\u8868",note:"\u8BB0\u5F55\u5F53\u524D\u6B63\u5728\u8FDB\u884C\u6216\u9700\u8981\u6301\u7EED\u8FFD\u8E2A\u7684\u4EFB\u52A1\u4E0E\u4E8B\u4EF6\u3002",aiInstructions:{init:"\u521D\u59CB\u5316\u65F6\u6839\u636E\u5267\u60C5\u4E0E\u8BBE\u5B9A\u6DFB\u52A0\u4E3B\u8981\u4EFB\u52A1\u6216\u5173\u952E\u4E8B\u4EF6\u3002",create:"\u4E3B\u89D2\u63A5\u53D6\u3001\u89E6\u53D1\u6216\u53D1\u73B0\u65B0\u7684\u4EFB\u52A1\u4E0E\u4E8B\u4EF6\u65F6\u65B0\u589E\u3002",update:"\u4EFB\u52A1\u53D6\u5F97\u5173\u952E\u8FDB\u5C55\u3001\u76EE\u6807\u53D8\u5316\u6216\u65F6\u9650\u53D8\u5316\u65F6\u66F4\u65B0\u3002",delete:"\u4EFB\u52A1\u5B8C\u6210\u3001\u5931\u8D25\u3001\u8FC7\u671F\u6216\u4E0D\u518D\u9700\u8981\u8FFD\u8E2A\u65F6\u5220\u9664\u3002"},columns:[ee("quest_name","\u4EFB\u52A1\u540D\u79F0","\u4EFB\u52A1\u6216\u4E8B\u4EF6\u6807\u9898\u3002"),ee("quest_type","\u4EFB\u52A1\u7C7B\u578B","\u4E3B\u7EBF\u3001\u652F\u7EBF\u3001\u4E2A\u4EBA\u3001\u7A81\u53D1\u4E8B\u4EF6\u7B49\u3002"),ee("issuer","\u53D1\u5E03\u8005","\u53D1\u5E03\u4EFB\u52A1\u6216\u89E6\u53D1\u4E8B\u4EF6\u7684\u89D2\u8272\u3001\u5730\u70B9\u6216\u52BF\u529B\u3002"),ee("detail","\u8BE6\u7EC6\u63CF\u8FF0","\u4EFB\u52A1\u76EE\u6807\u3001\u4E8B\u4EF6\u80CC\u666F\u548C\u8981\u6C42\u3002"),ee("progress","\u5F53\u524D\u8FDB\u5EA6","\u5BF9\u5B8C\u6210\u5EA6\u6216\u5F53\u524D\u9636\u6BB5\u7684\u7B80\u8981\u63CF\u8FF0\u3002"),ee("deadline","\u4EFB\u52A1\u65F6\u9650","\u5B8C\u6210\u4EFB\u52A1\u7684\u5269\u4F59\u65F6\u95F4\u6216\u622A\u6B62\u6761\u4EF6\u3002"),ee("reward","\u5956\u52B1","\u5B8C\u6210\u540E\u53EF\u80FD\u83B7\u5F97\u7684\u5956\u52B1\u3002"),ee("penalty","\u60E9\u7F5A","\u5931\u8D25\u6216\u9519\u8FC7\u540E\u7684\u540E\u679C\u3002")]}),jr({id:"default_memo_log",name:"\u7EAA\u8981\u8868",note:"\u8BB0\u5F55\u6BCF\u8F6E\u6216\u5173\u952E\u7247\u6BB5\u53D1\u751F\u7684\u4E8B\u4EF6\u7EAA\u8981\uFF0C\u7528\u4E8E\u540E\u7EED\u56DE\u987E\u3002",aiInstructions:{init:"\u6545\u4E8B\u521D\u59CB\u5316\u65F6\u63D2\u5165\u4E00\u6761\u8BB0\u5F55\uFF0C\u7528\u4E8E\u8BB0\u5F55\u521D\u59CB\u5316\u5267\u60C5\u3002",create:"\u6BCF\u8F6E\u4EA4\u4E92\u7ED3\u675F\u540E\uFF0C\u82E5\u53D1\u751F\u4E86\u503C\u5F97\u8BB0\u5F55\u7684\u65B0\u4E8B\u4EF6\uFF0C\u5219\u63D2\u5165\u4E00\u6761\u65B0\u7EAA\u8981\u3002",update:"\u901A\u5E38\u7981\u6B62\u66F4\u65B0\u5386\u53F2\u7EAA\u8981\uFF1B\u53EA\u6709\u660E\u663E\u4E8B\u5B9E\u9519\u8BEF\u65F6\u624D\u4FEE\u6B63\u3002",delete:"\u7981\u6B62\u5220\u9664\u3002"},columns:[ee("time_span","\u65F6\u95F4\u8DE8\u5EA6","\u672C\u8F6E\u4E8B\u4EF6\u53D1\u751F\u7684\u65F6\u95F4\u8303\u56F4\u3002"),ee("location","\u5730\u70B9","\u672C\u8F6E\u4E8B\u4EF6\u53D1\u751F\u5730\u70B9\u3002"),ee("memo","\u7EAA\u8981","\u4EE5\u7B2C\u4E09\u65B9\u89C6\u89D2\u5BA2\u89C2\u8BB0\u5F55\u672C\u8F6E\u53D1\u751F\u7684\u4E8B\u5B9E\u3002"),ee("summary","\u6982\u89C8","\u4E00\u53E5\u8BDD\u6982\u62EC\u7EAA\u8981\u5185\u5BB9\u3002"),ee("index_code","\u7F16\u7801\u7D22\u5F15","\u7528\u4E8E\u540E\u7EED\u68C0\u7D22\u7684\u7B80\u77ED\u7F16\u7801\u3002")]}),jr({id:"default_options",name:"\u9009\u9879\u8868",note:"\u8BB0\u5F55\u6BCF\u8F6E\u4E3B\u89D2\u53EF\u4EE5\u91C7\u53D6\u7684\u884C\u52A8\u9009\u9879\u3002\u6B64\u8868\u901A\u5E38\u6709\u4E14\u4EC5\u6709\u4E00\u884C\u3002\u6240\u6709\u9009\u9879\u4F7F\u7528\u7B2C\u4E09\u4EBA\u79F0\uFF0C\u4E0D\u4EE3\u66FF\u4E3B\u89D2\u53D1\u8A00\uFF0C\u5E76\u7D27\u6263\u5F53\u524D\u5267\u60C5\u3002",aiInstructions:{init:"\u521D\u59CB\u5316\u65F6\u751F\u6210\u56DB\u4E2A\u521D\u59CB\u884C\u52A8\u9009\u9879\u3002",create:"\u901A\u5E38\u7981\u6B62\u65B0\u589E\uFF1B\u9664\u975E\u8868\u4E3A\u7A7A\u4E14\u9700\u8981\u521D\u59CB\u5316\u3002",update:"\u6BCF\u8F6E\u4EA4\u4E92\u540E\u6839\u636E\u5F53\u524D\u5267\u60C5\u751F\u6210\u65B0\u7684\u56DB\u4E2A\u9009\u9879\u5E76\u8986\u76D6\u539F\u6709\u5185\u5BB9\u3002",delete:"\u7981\u6B62\u5220\u9664\u3002"},columns:[ee("option_1","\u9009\u9879\u4E00","\u504F\u5411\u7B56\u7565\u3001\u63A8\u8FDB\u5267\u60C5\u6216\u89E3\u51B3\u5F53\u524D\u95EE\u9898\u7684\u884C\u52A8\u3002"),ee("option_2","\u9009\u9879\u4E8C","\u504F\u5411\u8C28\u614E\u89C2\u5BDF\u3001\u6536\u96C6\u4FE1\u606F\u6216\u4FDD\u6301\u4E2D\u7ACB\u7684\u884C\u52A8\u3002"),ee("option_3","\u9009\u9879\u4E09","\u504F\u5411\u5E2E\u52A9\u3001\u4FDD\u62A4\u3001\u6C9F\u901A\u6216\u5B89\u629A\u7684\u884C\u52A8\u3002"),ee("option_4","\u9009\u9879\u56DB","\u504F\u5411\u5192\u9669\u3001\u8BD5\u63A2\u3001\u6539\u53D8\u5C40\u52BF\u6216\u5173\u7CFB\u4E92\u52A8\u7684\u884C\u52A8\u3002")]})])});function Cx(t,e=""){return t==null?e:String(t).trim()||e}function Fr(t){if(t==null)return"";if(typeof t=="string")return t;try{return JSON.stringify(t,null,2)}catch{return String(t)}}function Wp(t,e="col"){return Cx(t,"").toLowerCase().replace(/[^a-z0-9]+/g,"_").replace(/^_+|_+$/g,"")||e}function nn(t,e=new Set){let r=Wp(t,"col"),s=r,o=2;for(;e.has(s);)s=`${r}_${o}`,o+=1;return e.add(s),s}var Hp=N(()=>{});function $(t,e=""){return t==null?e:String(t).trim()||e}function or(t,e=!1){return t==null?e:t===!0}function Ix(t){if(!Array.isArray(t)||t.length!==1)return!1;let e=t[0]&&typeof t[0]=="object"?t[0]:null;if(!e)return!1;let r=$(e.name||e.title,""),s=$(e.note||e.description,""),o=Array.isArray(e.columns)?e.columns:[],n=Array.isArray(e.rows)?e.rows:[];if(r&&!["\u88681","\u8868\u683C 1","\u8868\u683C1"].includes(r)||s||o.length!==1||n.length>1)return!1;let a=o[0]&&typeof o[0]=="object"?o[0]:{},i=$(a.key||a.id,""),l=$(a.title||a.name||a.label,"");if($(a.description||a.note,"")||i&&i!=="col_1"||l&&!["\u52171","col_1"].includes(l))return!1;if(n.length===0)return!0;let d=n[0]&&typeof n[0]=="object"?n[0]:{},u=$(d.name||d.title||d.label,""),y=d.cells&&typeof d.cells=="object"&&!Array.isArray(d.cells)?d.cells:{},p=Array.isArray(d.values)?d.values:[],f=Object.values(y).some(g=>$(g,""))||p.some(g=>$(g,""));return(!u||u==="\u884C1")&&!f}function Rx(t,{seedDefaultWhenMissing:e=!1}={}){return Ix(t)?ae(lo):Array.isArray(t)?ae(t):t&&typeof t=="object"?Mx(t):e?ae(lo):[]}function El(t=""){let e=[],r=$(t,""),s=/-\s*列\d+\s*[:：]\s*([^\n\-–—]+?)\s*[-–—]\s*([^\n]+)/g,o;for(;o=s.exec(r);)e.push({title:$(o[1],""),description:$(o[2],"")});return e}function Mx(t={}){let e=t&&typeof t=="object"?t:{};return Object.keys(e).filter(s=>s.startsWith("sheet_")&&e[s]&&typeof e[s]=="object").map((s,o)=>({key:s,table:e[s],fallbackOrder:o})).sort((s,o)=>{let n=Number.isFinite(s.table.orderNo)?s.table.orderNo:s.fallbackOrder,a=Number.isFinite(o.table.orderNo)?o.table.orderNo:o.fallbackOrder;return n-a}).map(({key:s,table:o},n)=>{let a=o.sourceData&&typeof o.sourceData=="object"?o.sourceData:{},i=Array.isArray(o.content)?o.content:[],l=Array.isArray(i[0])?i[0]:[],c=El(a.note),d=new Set,u=l.slice(1).map((p,f)=>{let g=c[f]||{},h=$(p||g.title,`\u5217${f+1}`);return{key:nn(h||`col_${f+1}`,d),title:h,description:$(g.description,""),type:ma,required:!1}}),y=i.slice(1).map((p,f)=>{let g=Array.isArray(p)?p:[],h={};return u.forEach((x,T)=>{h[x.key]=Fr(g[T+1])}),{name:$(g[0],`\u884C${f+1}`),cells:h}});return{id:$(o.uid||s,`sheet_${n+1}`),name:$(o.name,`\u8868${n+1}`),note:$(a.note,""),enabled:o.enabled!==!1,aiInstructions:{init:$(a.initNode,""),create:$(a.insertNode,""),update:$(a.updateNode,""),delete:$(a.deleteNode,"")},columns:u,rows:y}})}function Px(t=[]){let e=[],r=0;return t.forEach(s=>{let o=s&&typeof s=="object"?s:{},n=o.cells&&typeof o.cells=="object"&&!Array.isArray(o.cells)?o.cells:null,a=Array.isArray(o.cells)?o.cells:Array.isArray(o.values)?o.values:null;n&&Object.keys(n).forEach(i=>{e.includes(i)||e.push(i)}),a&&a.length>r&&(r=a.length)}),e.length>0?e.map(s=>({key:s,title:String(s)})):r>0?Array.from({length:r},(s,o)=>({key:`col_${o+1}`,title:`\u5217${o+1}`})):[]}function Al(t,e=ma){let r=$(t,e);return jp.some(s=>s.value===r)?r:e}function Nx(t={},e=0,r=new Set){let s=t&&typeof t=="object"?t:{},o=$(s.title||s.name||s.label,`\u5217${e+1}`),n=$(s.key||s.id,""),a=nn(n||o||`col_${e+1}`,r),i=[n,$(s.title,""),$(s.name,""),$(s.label,"")].filter(Boolean);return{key:a,title:o,description:$(s.description||s.note,""),type:Al(s.type),required:s.required===!0,sourceKeys:i}}function $x(t={},e={},r=0){let s=t.cells&&typeof t.cells=="object"&&!Array.isArray(t.cells)?t.cells:null,o=Array.isArray(t.cells)?t.cells:Array.isArray(t.values)?t.values:null;if(s){let n=[...Array.isArray(e.sourceKeys)?e.sourceKeys:[],e.key,e.title].filter(Boolean);for(let a of n)if(s[a]!==void 0)return Fr(s[a])}return o&&o[r]!==void 0?Fr(o[r]):""}function Dx(t={},e=[],r=0){let s=t&&typeof t=="object"?t:{},o={};return e.forEach((n,a)=>{o[n.key]=$x(s,n,a)}),{id:tn(s.id||s.rowId,r),name:$(s.name||s.title||s.label,`\u884C${r+1}`),cells:o}}function Lx(t={}){let e=t&&typeof t=="object"?t:{};return{init:$(e.init,""),create:$(e.create,""),update:$(e.update,""),delete:$(e.delete,"")}}function Ox(t={},e=""){let r=t&&typeof t=="object"?t:{},s=$(r.presetId,$(e,""));return{enabled:r.enabled===!0,presetId:s}}function Bx(t={},e=""){let r=t&&typeof t=="object"?t:{};return{enabled:or(r.enabled,!1),entryName:$(r.entryName,e),entryType:r.entryType==="keyword"?"keyword":"constant",splitByRow:or(r.splitByRow,!1),keywords:$(r.keywords,""),injectionTemplate:$(r.injectionTemplate,""),preventRecursion:or(r.preventRecursion,!0),entryPlacement:{position:$(r.entryPlacement?.position||r.placement?.position,"before_character_definition"),depth:Number.isFinite(Number(r.entryPlacement?.depth??r.placement?.depth))?Math.floor(Number(r.entryPlacement?.depth??r.placement?.depth)):2,order:Number.isFinite(Number(r.entryPlacement?.order??r.placement?.order))?Math.floor(Number(r.entryPlacement?.order??r.placement?.order)):0}}}function zx(t={},e=0){let r=t&&typeof t=="object"?t:{},s=new Set,n=(Array.isArray(r.columns)&&r.columns.length>0?r.columns:Px(Array.isArray(r.rows)?r.rows:[])).map((l,c)=>Nx(l,c,s)),a=Array.isArray(r.rows)?r.rows.map((l,c)=>Dx(l,n,c)):[],i=$(r.name||r.title,`\u8868${e+1}`);return{id:Yt(r.id||r.key,e),name:i,note:$(r.note||r.description,""),enabled:r.enabled!==!1,aiInstructions:Lx(r.aiInstructions),exportConfig:Bx(r.exportConfig,i),columns:n.map(l=>({key:l.key,title:l.title,description:$(l.description,""),type:Al(l.type),required:l.required===!0})),rows:a}}function Yp(t={}){let e=t&&typeof t=="object"?t:{},r=Array.isArray(e.lastErrorDetails)?e.lastErrorDetails.map(o=>$(o,"")).filter(Boolean):[],s=e.lastValidationSummary&&typeof e.lastValidationSummary=="object"?{errorCount:Number.isFinite(e.lastValidationSummary.errorCount)?e.lastValidationSummary.errorCount:0,warningCount:Number.isFinite(e.lastValidationSummary.warningCount)?e.lastValidationSummary.warningCount:0}:{errorCount:0,warningCount:0};return{lastStatus:$(e.lastStatus,Ce.IDLE),lastRunAt:Number.isFinite(e.lastRunAt)?e.lastRunAt:0,lastDurationMs:Number.isFinite(e.lastDurationMs)?e.lastDurationMs:0,lastError:$(e.lastError,""),lastErrorDetails:r,lastValidationSummary:s,successCount:Number.isFinite(e.successCount)?e.successCount:0,errorCount:Number.isFinite(e.errorCount)?e.errorCount:0,lastSourceMessageId:$(e.lastSourceMessageId,""),lastSlotRevisionKey:$(e.lastSlotRevisionKey,""),lastLoadMode:$(e.lastLoadMode,""),lastFillMode:$(e.lastFillMode,""),lastMirrorApplied:e.lastMirrorApplied===!0,lastResolvedFromMessageId:$(e.lastResolvedFromMessageId,""),lastResolvedFromRevisionKey:$(e.lastResolvedFromRevisionKey,""),lastSourceKind:$(e.lastSourceKind,""),lastScopeMode:$(e.lastScopeMode,""),lastAutoRunAt:Number.isFinite(e.lastAutoRunAt)?e.lastAutoRunAt:0,lastAutoStatus:$(e.lastAutoStatus,Ce.IDLE),lastAutoMessageId:$(e.lastAutoMessageId,""),lastAutoRevisionKey:$(e.lastAutoRevisionKey,""),lastAutoSkipReason:$(e.lastAutoSkipReason,"")}}function Kx(t={}){let e=t&&typeof t=="object"?t:{};return(Array.isArray(e.tables)?e.tables:[]).map((s,o)=>zx(s,o))}function Gp(t="",e={},r={}){let s=Al(e?.type),o=String(t??"").trim(),n=$(r?.label,`${$(r?.tableName,"\u8868\u683C")} / ${$(r?.rowName,"\u884C")} / ${$(e?.title||e?.key,"\u5355\u5143\u683C")}`),a=[],i=[];if(e?.required===!0&&!o&&a.push(`${n} \u4E3A\u5FC5\u586B\uFF0C\u5F53\u524D\u4E3A\u7A7A\u3002`),!o)return{valid:a.length===0,errors:a,warnings:i};if(s==="number"&&!Number.isFinite(Number(o))&&a.push(`${n} \u9700\u8981\u586B\u5199\u6570\u5B57\u3002`),s==="boolean"&&!["true","false","1","0","yes","no"].includes(o.toLowerCase())&&a.push(`${n} \u9700\u8981\u586B\u5199\u5E03\u5C14\u503C\uFF08true / false\uFF09\u3002`),s==="date"&&Number.isNaN(Date.parse(o))&&a.push(`${n} \u9700\u8981\u586B\u5199\u53EF\u89E3\u6790\u7684\u65E5\u671F\u3002`),s==="json")try{JSON.parse(o)}catch(l){a.push(`${n} \u9700\u8981\u586B\u5199\u5408\u6CD5 JSON\uFF1A${l?.message||"\u89E3\u6790\u5931\u8D25"}`)}return{valid:a.length===0,errors:a,warnings:i}}function Ux(t={}){let r=Kx(t&&typeof t=="object"?t:{}),s=[];return r.forEach((o,n)=>{let a=$(o?.name,`\u8868${n+1}`),i=Array.isArray(o?.columns)?o.columns:[],l=Array.isArray(o?.rows)?o.rows:[];a||s.push(`\u8868 ${n+1} \u7F3A\u5C11\u540D\u79F0\u3002`),i.length===0&&s.push(`${a} \u81F3\u5C11\u9700\u8981\u4E00\u5217\u3002`);let c=new Set;i.forEach((d,u)=>{let y=$(d?.key,""),p=$(d?.title,`\u5217${u+1}`);if(!y){s.push(`${a} / ${p} \u7F3A\u5C11\u5185\u90E8\u540D\u3002`);return}if(c.has(y)){s.push(`${a} \u4E2D\u5B58\u5728\u91CD\u590D\u5217\u5185\u90E8\u540D\uFF1A${y}`);return}c.add(y)}),l.forEach((d,u)=>{let y=$(d?.name,`\u884C${u+1}`),p=d?.cells&&typeof d.cells=="object"&&!Array.isArray(d.cells)?d.cells:{};i.forEach((f,g)=>{let h=$(f?.key,""),x=$(f?.title||h,`\u5217${g+1}`),T=h?Fr(p[h]):"",v=Gp(T,f,{label:`${a} / ${y} / ${x}`,tableName:a,rowName:y});s.push(...v.errors)})})}),{valid:s.length===0,errors:s,tables:r}}function co({severity:t="error",message:e="",tableIndex:r=-1,tableName:s="",columnIndex:o=-1,columnKey:n="",rowIndex:a=-1,rowName:i="",cellKey:l=""}={}){return{severity:t,message:$(e,t==="warning"?"\u5B58\u5728\u8B66\u544A\u3002":"\u5B58\u5728\u9519\u8BEF\u3002"),tableIndex:r,tableName:$(s,""),columnIndex:o,columnKey:$(n,""),rowIndex:a,rowName:$(i,""),cellKey:$(l,"")}}function ha(t={}){let e=Ux(t),r=[];if(!e.valid)return{...e,warnings:[],issues:r,summary:{errorCount:e.errors.length,warningCount:0}};let s=Array.isArray(e.tables)?e.tables:[];s.forEach((a,i)=>{let l=$(a?.name,`\u8868${i+1}`),c=Array.isArray(a?.columns)?a.columns:[],d=Array.isArray(a?.rows)?a.rows:[],u=new Set;l||r.push(co({severity:"error",message:`\u8868 ${i+1} \u7F3A\u5C11\u540D\u79F0\u3002`,tableIndex:i,tableName:l})),c.forEach((y,p)=>{let f=$(y?.key,""),g=$(y?.title,`\u5217${p+1}`);f||r.push(co({severity:"error",message:`${l} / ${g} \u7F3A\u5C11\u5185\u90E8\u540D\u3002`,tableIndex:i,tableName:l,columnIndex:p,columnKey:f,cellKey:f})),f&&(u.has(f)&&r.push(co({severity:"error",message:`${l} \u4E2D\u5B58\u5728\u91CD\u590D\u5217\u5185\u90E8\u540D\uFF1A${f}`,tableIndex:i,tableName:l,columnIndex:p,columnKey:f,cellKey:f})),u.add(f))}),d.forEach((y,p)=>{let f=$(y?.name,`\u884C${p+1}`),g=y?.cells&&typeof y.cells=="object"&&!Array.isArray(y.cells)?y.cells:{};Object.keys(g).forEach(x=>{c.some(T=>$(T?.key,"")===x)||r.push(co({severity:"warning",message:`${l} / ${f} \u5305\u542B\u672A\u5B9A\u4E49\u5217 ${x}\uFF0C\u4FDD\u5B58\u540E\u4F1A\u88AB\u5FFD\u7565\u3002`,tableIndex:i,tableName:l,rowIndex:p,rowName:f,cellKey:x}))}),c.forEach((x,T)=>{let v=$(x?.key,""),L=$(x?.title||v,`\u5217${T+1}`),C=v?Fr(g[v]):"",_=Gp(C,x,{label:`${l} / ${f} / ${L}`,tableName:l,rowName:f});_.errors.forEach(k=>{r.push(co({severity:"error",message:k,tableIndex:i,tableName:l,columnIndex:T,columnKey:v,rowIndex:p,rowName:f,cellKey:v}))}),_.warnings.forEach(k=>{r.push(co({severity:"warning",message:k,tableIndex:i,tableName:l,columnIndex:T,columnKey:v,rowIndex:p,rowName:f,cellKey:v}))})})})});let o=r.filter(a=>a.severity!=="warning").map(a=>a.message),n=r.filter(a=>a.severity==="warning").map(a=>a.message);return{valid:o.length===0,errors:o,warnings:n,issues:r,tables:s,summary:{errorCount:o.length,warningCount:n.length}}}function qp(){return{tables:ae(lo),promptTemplate:vl,apiPreset:"",promptPreset:"",bypass:{enabled:!1,presetId:""},activeTemplate:gt,autoUpdateEnabled:!1,autoUpdateTrigger:"assistantMessage",runScope:ft.ENABLED,scope:{mode:ft.ENABLED,selectedTableIds:[],activeTableId:""},fillMode:ga.INCREMENTAL,contextDepth:8,contextRoles:"all",contextExtractTags:[],contextUseGlobalRules:!1,worldbooks:{enabled:!1,selected:[]},sendLatestRows:-1,mirrorToMessage:!1,mirrorTag:"yyt-table-workbench",worldbookSync:{enabled:!1,targetBook:"",entryComment:"YYT-\u586B\u8868\u6570\u636E"},wrapperConfig:{enabled:!0,wrapperTag:"\u6700\u65B0\u6570\u636E\u4E0E\u8BB0\u5F55",wrapperHint:"\u4EE5\u4E0B\u662F\u5728\u8FD9\u4E2A\u65F6\u95F4\u70B9\uFF0C\u5F53\u524D\u573A\u666F\u4E0B\u5267\u60C5\u76F8\u5173\u7684\u6700\u65B0\u6570\u636E\u4E0E\u8BB0\u5F55\uFF0C\u4F60\u5728\u8FDB\u884C\u5267\u60C5\u5206\u6790\u65F6\u5FC5\u987B\u4EE5\u6B64\u6700\u65B0\u7684\u6570\u636E\u4E3A\u51C6\uFF0C\u4EE5\u4E0B\u6570\u636E\u4E0E\u8BB0\u5F55\u7684\u4F18\u5148\u7EA7\u9AD8\u4E8E\u5176\u4ED6\u4EFB\u4F55\u80CC\u666F\u8BBE\u5B9A\uFF1A",wrapperPlacement:{position:"before_character_definition",depth:2,order:0}},tableEnabledOverrides:{},runtime:Yp()}}function Bt(t={}){let e=qp(),r=t&&typeof t=="object"?t:{},s=r.bypass?r.bypass:r.bypassPresetId?{presetId:r.bypassPresetId,enabled:!!r.bypassPresetId}:void 0,o=Ox(s,r.promptPreset),n=Rx(r.tables,{seedDefaultWhenMissing:!Object.prototype.hasOwnProperty.call(r,"tables")}),a=r.scope&&typeof r.scope=="object"?r.scope:{},i=typeof r.runScope=="string"&&r.runScope?{...a,mode:r.runScope}:a,l=on(i,{mode:r.runScope,selectedTableIds:r.selectedTableIds,activeTableId:r.activeTableId}),c=or(r.autoUpdateEnabled!==void 0?r.autoUpdateEnabled:r.automation?.enabled,e.autoUpdateEnabled);return{tables:n,promptTemplate:$(r.promptTemplate,e.promptTemplate),apiPreset:$(r.apiPreset,""),promptPreset:o.presetId,bypass:o,activeTemplate:$(r.activeTemplate,e.activeTemplate),autoUpdateEnabled:c,autoUpdateTrigger:$(r.autoUpdateTrigger,e.autoUpdateTrigger),runScope:l.mode,scope:l,fillMode:r.fillMode===ga.FULL?ga.FULL:e.fillMode,contextDepth:Number.isFinite(Number(r.contextDepth))&&Number(r.contextDepth)>0?Math.floor(Number(r.contextDepth)):e.contextDepth,contextRoles:r.contextRoles==="assistant_only"?"assistant_only":"all",contextExtractTags:Array.isArray(r.contextExtractTags)?r.contextExtractTags.filter(d=>typeof d=="string"&&d.trim()):typeof r.contextExtractTags=="string"&&r.contextExtractTags.trim()?r.contextExtractTags.split(`
`).map(d=>d.trim()).filter(Boolean):[],contextUseGlobalRules:or(r.contextUseGlobalRules??r.contextUseExtractRules??r.contextUseExcludeRules,!1),extraction:{regexPresetId:$(r.extraction?.regexPresetId,"")},worldbooks:{enabled:or(r.worldbooks?.enabled,!1),selected:Array.isArray(r.worldbooks?.selected)?r.worldbooks.selected.filter(d=>typeof d=="string"&&d.trim()):[],presetId:$(r.worldbooks?.presetId,"")},sendLatestRows:Number.isFinite(Number(r.sendLatestRows))?Math.floor(Number(r.sendLatestRows)):-1,mirrorToMessage:or(r.mirrorToMessage,e.mirrorToMessage),mirrorTag:$(r.mirrorTag,e.mirrorTag),worldbookSync:{enabled:or(r.worldbookSync?.enabled,!1),targetBook:$(r.worldbookSync?.targetBook,""),entryComment:$(r.worldbookSync?.entryComment,e.worldbookSync.entryComment),wrapperConfig:r.worldbookSync?.wrapperConfig?{enabled:or(r.worldbookSync.wrapperConfig?.enabled,!0),wrapperTag:$(r.worldbookSync.wrapperConfig?.wrapperTag,e.wrapperConfig.wrapperTag),wrapperHint:$(r.worldbookSync.wrapperConfig?.wrapperHint,""),wrapperPlacement:{position:$(r.worldbookSync.wrapperConfig?.wrapperPlacement?.position,e.wrapperConfig.wrapperPlacement.position),depth:Number.isFinite(Number(r.worldbookSync.wrapperConfig?.wrapperPlacement?.depth))?Math.floor(Number(r.worldbookSync.wrapperConfig?.wrapperPlacement?.depth)):e.wrapperConfig.wrapperPlacement.depth,order:Number.isFinite(Number(r.worldbookSync.wrapperConfig?.wrapperPlacement?.order))?Math.floor(Number(r.worldbookSync.wrapperConfig?.wrapperPlacement?.order)):e.wrapperConfig.wrapperPlacement.order}}:void 0},wrapperConfig:{enabled:or(r.wrapperConfig?.enabled,e.wrapperConfig.enabled),wrapperTag:$(r.wrapperConfig?.wrapperTag,e.wrapperConfig.wrapperTag),wrapperHint:$(r.wrapperConfig?.wrapperHint,e.wrapperConfig.wrapperHint),wrapperPlacement:{position:$(r.wrapperConfig?.wrapperPlacement?.position,e.wrapperConfig.wrapperPlacement.position),depth:Number.isFinite(Number(r.wrapperConfig?.wrapperPlacement?.depth))?Math.floor(Number(r.wrapperConfig?.wrapperPlacement?.depth)):e.wrapperConfig.wrapperPlacement.depth,order:Number.isFinite(Number(r.wrapperConfig?.wrapperPlacement?.order))?Math.floor(Number(r.wrapperConfig?.wrapperPlacement?.order)):e.wrapperConfig.wrapperPlacement.order}},tableEnabledOverrides:r.tableEnabledOverrides&&typeof r.tableEnabledOverrides=="object"&&!Array.isArray(r.tableEnabledOverrides)?Object.fromEntries(Object.entries(r.tableEnabledOverrides).filter(([d,u])=>typeof d=="string"&&d&&typeof u=="boolean")):{},runtime:Yp({...e.runtime,...r.runtime||{}})}}function kl(t={}){let e=Bt(t),r=[];return Array.isArray(e.tables)||r.push("\u8868\u5B9A\u4E49\u5FC5\u987B\u662F JSON \u6570\u7EC4\u3002"),e.promptTemplate||r.push("\u586B\u8868 Prompt \u4E0D\u80FD\u4E3A\u7A7A\u3002"),e.mirrorTag||r.push("\u6B63\u6587\u955C\u50CF\u6807\u7B7E\u4E0D\u80FD\u4E3A\u7A7A\u3002"),{valid:r.length===0,errors:r,config:e}}function Pe(){let t=Sl.get(_l,qp()),e=Bt(t),r=wl();return{...zp(e,r),guide:r}}function jx(t){let r=(Array.isArray(t?.tables)?t.tables:[]).map(s=>({...s,rows:[]}));return{...t,tables:r}}function it(t={}){let e=Pe(),r=Bt({...e,...t||{},runtime:t?.runtime===void 0?e.runtime:t.runtime}),s=kl(r);if(!s.valid)return{success:!1,error:s.errors.join(`
`),errors:s.errors,config:s.config};let o=jx(s.config);return Sl.set(_l,o),Bp({templateId:s.config.activeTemplate,scope:s.config.scope,worldbookSync:s.config.worldbookSync}),{success:!0,config:s.config}}function Vp(t={}){let e=Pe(),r=Bt({...e,runtime:{...e.runtime,...t||{}}});return Sl.set(_l,r),r.runtime}function Fx(t={},e={}){let r=Bt(t),s=$(r.promptTemplate,vl);return e.skipResponseContract?s.trim():`${s}

${Up}`.trim()}function Jp(t={},e={}){let r=Bt(t);return{id:"tableWorkbench",name:"\u586B\u8868\u5DE5\u4F5C\u53F0",promptTemplate:Fx(r,e),bypass:{enabled:r.bypass?.enabled===!0,presetId:r.bypass?.presetId||r.promptPreset||""}}}var Sl,_l,sr=N(()=>{Ke();Ue();uo();fa();Kp();Fp();Hp();Sl=D.namespace("tableWorkbench"),_l="config"});function Il(){return Cl||(Cl=R.createScope("TableIsolation")),Cl}var Xp,Qp,Cl,Rl,ie,Hr=N(()=>{Ke();H();Ue();Xp="tableEngine.isolation",Qp=Object.freeze({enabled:!1,key:bt});Rl=class{constructor(){this._cache=null,this._subscribers=new Set}getState(){if(this._cache)return this._cache;let e=D.get(Xp,null);return this._cache=this._normalize(e),this._cache}isEnabled(){return this.getState().enabled===!0}getKey(){let e=this.getState();return e.enabled?e.key||bt:bt}getConfiguredKey(){return this.getState().key}setEnabled(e){let r=this._normalize({...this.getState(),enabled:!!e});this._commit(r,{reason:"enabled"})}setKey(e){let r=this._normalize({...this.getState(),key:e});this._commit(r,{reason:"key"})}updateState(e={}){let r=this.getState(),s=this._normalize({enabled:e.enabled!==void 0?!!e.enabled:r.enabled,key:e.key!==void 0?e.key:r.key});this._commit(s,{reason:"patch"})}reset(){this._commit({...Qp},{reason:"reset"})}getScopeKey(e){return sn(e,this.getKey())}subscribe(e){return typeof e!="function"?()=>{}:(this._subscribers.add(e),()=>this._subscribers.delete(e))}_normalize(e){return!e||typeof e!="object"?{...Qp}:{enabled:e.enabled===!0,key:_e(e.key)}}_commit(e,r={}){let s=this.getState();if(s.enabled===e.enabled&&s.key===e.key)return;this._cache=e;try{D.set(Xp,e)}catch(n){Il().error("isolation \u72B6\u6001\u843D\u76D8\u5931\u8D25",n)}Il().info("isolation \u72B6\u6001\u53D8\u5316",{prev:s,next:e,reason:r.reason||""});let o={...e,prev:s,reason:r.reason||""};for(let n of this._subscribers)try{n(o)}catch(a){Il().error("isolation \u8BA2\u9605\u8005\u56DE\u8C03\u5F02\u5E38",a)}}},ie=new Rl});var Zp={};se(Zp,{AuthorityProvider:()=>ba,default:()=>Hx});var po,Ml,Wx,Yr,ba,Hx,ey=N(()=>{H();fo();po=R.createScope("AuthorityProvider"),Ml="third-party/youyou-toolkit",Wx="YouYou Toolkit",Yr="main",ba=class{constructor({extensionVersion:e="1.0.149"}={}){this.kind=yo.AUTHORITY,this._client=null,this._extensionVersion=e,this._initialized=!1}async init(){let e=xa();if(!e)return po.error("\u672A\u68C0\u6D4B\u5230 window.STAuthority.AuthoritySDK"),!1;try{return this._client=await e.init({extensionId:Ml,displayName:Wx,version:this._extensionVersion,installType:"local",declaredPermissions:{sql:{private:!0}}}),this._initialized=!0,po.info("AuthorityProvider \u521D\u59CB\u5316\u6210\u529F",{extensionId:Ml}),!0}catch(r){return po.error("AuthorityProvider \u521D\u59CB\u5316\u5931\u8D25",{error:r?.message||r}),this._initialized=!1,!1}}async dispose(){this._client=null,this._initialized=!1}async migrate({migrations:e,database:r=Yr,tableName:s}={}){this._ensureReady();let o={database:r,migrations:e};s&&(o.tableName=s);let n=await this._client.sql.migrate(o);return{applied:n?.applied||[],skipped:n?.skipped||[],tableName:n?.tableName,latestId:n?.latestId}}async query({statement:e,params:r=[],database:s=Yr,page:o=void 0}={}){this._ensureReady();let n={database:s,statement:e,params:r};o&&(n.page=o);let a=await this._client.sql.query(n);return{columns:a.columns||[],rows:a.rows||[],rowCount:a.rowCount??(a.rows?.length||0),page:a.page}}async execute({statement:e,params:r=[],database:s=Yr}={}){this._ensureReady();let o=await this._client.sql.exec({database:s,statement:e,params:r});return{rowsAffected:o.rowsAffected??0,lastInsertRowid:o.lastInsertRowid??null}}async batch({statements:e,database:r=Yr}={}){this._ensureReady();let s=(e||[]).map(n=>({mode:n.mode||(/^\s*SELECT/i.test(n.statement)?"query":"exec"),statement:n.statement,params:n.params||[]}));return{results:(await this._client.sql.batch({database:r,statements:s}))?.results||[]}}async transaction({statements:e,database:r=Yr}={}){this._ensureReady();let s=(e||[]).map(n=>({mode:n.mode||(/^\s*SELECT/i.test(n.statement)?"query":"exec"),statement:n.statement,params:n.params||[]})),o=await this._client.sql.transaction({database:r,statements:s});return{committed:!!o?.committed,results:o?.results||[]}}async paginate({statement:e,params:r=[],database:s=Yr,page:o={}}={}){return this._ensureReady(),this.query({statement:e,params:r,database:s,page:o})}async pageAll({statement:e,params:r=[],database:s=Yr,pageSize:o=200,maxPages:n}={}){this._ensureReady();let a=await this._client.sql.pageAll({database:s,statement:e,params:r},{pageSize:o,maxPages:n});return{columns:a.columns||[],rows:a.rows||[],rowCount:a.rowCount??(a.rows?.length||0)}}async backup(){return po.warn("backup() \u6682\u672A\u5B9E\u73B0\uFF0CAuthorityProvider \u8D70 Authority \u5185\u7F6E\u5907\u4EFD"),{kind:"authority",timestamp:Date.now()}}async export(){return po.warn("export() \u6682\u672A\u5B9E\u73B0\uFF0CAuthorityProvider \u8D70 Authority \u5185\u7F6E\u5BFC\u51FA"),{kind:"authority",timestamp:Date.now()}}async import(){po.warn("import() \u6682\u672A\u5B9E\u73B0\uFF0CAuthorityProvider \u8D70 Authority \u5185\u7F6E\u5BFC\u5165")}describe(){return{kind:this.kind,initialized:this._initialized,extensionId:Ml,database:Yr,hasClient:!!this._client}}_ensureReady(){if(!this._initialized||!this._client)throw new Error("AuthorityProvider \u5C1A\u672A\u521D\u59CB\u5316")}},Hx=ba});var ry={};se(ry,{FallbackProvider:()=>wa,default:()=>Zx});function Yx(t){let e=[],r=0,s="";for(let o of t)o==="("?r+=1:o===")"&&(r-=1),o===","&&r===0?(s.trim()&&e.push(s),s=""):s+=o;return s.trim()&&e.push(s),e}function Gx(t){let e=t.match(/^\s*CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?(\w+)\s*\(([\s\S]+)\)\s*$/i);if(!e)return null;let r=e[1],s=e[2],o=Yx(s),n=[],a=[];for(let i of o){let l=i.trim(),c=l.match(/^PRIMARY\s+KEY\s*\(([^)]+)\)$/i);if(c){a=c[1].split(",").map(u=>u.trim());continue}let d=l.match(/^(\w+)\s+(\w+)/);d&&(n.push({name:d[1],type:d[2].toUpperCase(),raw:l}),/PRIMARY\s+KEY/i.test(l)&&!a.length&&(a=[d[1]]))}return{name:r,columns:n,pkCols:a}}function qx(t){let e=t.match(/^\s*INSERT\s+(?:OR\s+REPLACE\s+)?INTO\s+(\w+)(?:\s*\(([^)]+)\))?\s+VALUES\s*\(([^)]+)\)\s*$/i);if(!e)return null;let r=e[1],s=e[2]?e[2].split(",").map(n=>n.trim()):null,o=(e[3].match(/\?/g)||[]).length;return{name:r,cols:s,paramCount:o}}function $l(t){let e=t.split(/\s+AND\s+/i),r=[];for(let s of e){let o=s.match(/^\s*(\w+)\s*(=|!=|<>|>=|<=|>|<)\s*\?\s*$/);if(o){let a=o[2]==="<>"?"!=":o[2];r.push({col:o[1],op:a,placeholder:!0});continue}let n=s.match(/^\s*(\w+)\s+IS\s+(NOT\s+)?NULL\s*$/i);if(n){r.push({col:n[1],op:n[2]?"IS NOT NULL":"IS NULL",placeholder:!1});continue}throw new Error(`FallbackProvider \u4E0D\u652F\u6301\u7684 WHERE \u5B50\u53E5: "${s}"`)}return r}function Vx(t){let e=t.match(/^\s*SELECT\s+([\s\S]+?)\s+FROM\s+(\w+)([\s\S]*)$/i);if(!e)return null;let r=e[1].trim(),s=e[2],o=e[3],n=o.match(/\bWHERE\s+([\s\S]+?)(?=\bORDER\s+BY\b|\bLIMIT\b|\bOFFSET\b|$)/i),a=o.match(/\bORDER\s+BY\s+(\w+)\s*(ASC|DESC)?/i),i=o.match(/\bLIMIT\s+(\d+)/i),l=o.match(/\bOFFSET\s+(\d+)/i);return{name:s,cols:r==="*"?null:r.split(",").map(c=>c.trim()),where:n?$l(n[1].trim()):null,orderBy:a?{col:a[1],dir:(a[2]||"ASC").toUpperCase()}:null,limit:i?parseInt(i[1],10):null,offset:l?parseInt(l[1],10):null}}function Jx(t){let e=t.match(/^\s*UPDATE\s+(\w+)\s+SET\s+([\s\S]+?)(?:\s+WHERE\s+([\s\S]+))?\s*$/i);if(!e)return null;let r=e[1],s=e[2],o=e[3],n=s.split(",").map(a=>{let i=a.trim().match(/^(\w+)\s*=\s*\?$/);if(!i)throw new Error(`FallbackProvider \u4E0D\u652F\u6301\u7684 SET \u5B50\u53E5: "${a}"`);return i[1]});return{name:r,setCols:n,where:o?$l(o.trim()):null}}function Xx(t){let e=t.match(/^\s*DELETE\s+FROM\s+(\w+)(?:\s+WHERE\s+([\s\S]+))?\s*$/i);return e?{name:e[1],where:e[2]?$l(e[2].trim()):null}:null}function Nl(t,e){return t===e?!0:t==null?e==null:e==null?!1:typeof t=="number"||typeof e=="number"?Number(t)===Number(e):String(t)===String(e)}function an(t,e){return t===e?0:t==null?-1:e==null?1:typeof t=="number"&&typeof e=="number"?t-e:String(t)<String(e)?-1:1}function Qx(t,e,r){let s=t[e.col];if(e.op==="IS NULL")return s==null;if(e.op==="IS NOT NULL")return s!=null;let o=r.shift();switch(e.op){case"=":return Nl(s,o);case"!=":return!Nl(s,o);case">":return an(s,o)>0;case"<":return an(s,o)<0;case">=":return an(s,o)>=0;case"<=":return an(s,o)<=0;default:return!1}}function Pl(t,e,r){if(!e||!e.length)return!0;let s=Array.isArray(r)?[...r]:[];for(let o of e)if(!Qx(t,o,s))return!1;return!0}var go,ty,wa,Zx,sy=N(()=>{H();Ke();fo();go=R.createScope("FallbackProvider"),ty="provider_fallback_v1";wa=class{constructor(){this.kind=yo.FALLBACK,this._tables=new Map,this._migrations=new Set,this._initialized=!1,this._dirty=!1,this._saveTimer=null}async init(){try{let e=ve.get(ty)||{};this._migrations=new Set(Array.isArray(e.migrations)?e.migrations:[]),this._tables=new Map;for(let[r,s]of Object.entries(e.tables||{}))this._tables.set(r,{schema:s.schema||{name:r,columns:[],pkCols:[]},rows:Array.isArray(s.rows)?s.rows:[]});return this._initialized=!0,go.info("FallbackProvider \u521D\u59CB\u5316\u5B8C\u6210",{tables:this._tables.size,migrations:this._migrations.size}),!0}catch(e){return go.error("FallbackProvider \u521D\u59CB\u5316\u5931\u8D25",{error:e?.message||e}),this._initialized=!1,!1}}async dispose(){this._flushSave(!0),this._tables.clear(),this._migrations.clear(),this._initialized=!1}async migrate({migrations:e}={}){this._ensureReady();let r=[],s=[];for(let o of e||[]){if(!o?.id||!o?.statement)continue;if(this._migrations.has(o.id)){s.push(o.id);continue}let n=o.statement.trim();if(/^CREATE\s+TABLE/i.test(n)){let a=Gx(n);if(!a)throw new Error(`\u65E0\u6CD5\u89E3\u6790 CREATE TABLE: ${n}`);this._tables.has(a.name)||this._tables.set(a.name,{schema:a,rows:[]})}else if(!/^CREATE\s+(UNIQUE\s+)?INDEX/i.test(n))if(/^DROP\s+TABLE/i.test(n)){let a=n.match(/^DROP\s+TABLE\s+(?:IF\s+EXISTS\s+)?(\w+)/i);a&&this._tables.delete(a[1])}else/^ALTER\s+TABLE/i.test(n)?go.warn("FallbackProvider \u4E0D\u652F\u6301 ALTER TABLE\uFF0C\u8DF3\u8FC7",{id:o.id}):go.warn("FallbackProvider \u8DF3\u8FC7\u672A\u8BC6\u522B DDL",{id:o.id,statement:n});this._migrations.add(o.id),r.push(o.id)}return this._markDirty(),{applied:r,skipped:s}}async query({statement:e,params:r=[]}={}){this._ensureReady();let s=Vx(e);if(!s)throw new Error(`\u65E0\u6CD5\u89E3\u6790 SELECT: ${e}`);let o=this._tables.get(s.name);if(!o)return{columns:s.cols||[],rows:[],rowCount:0};let n=o.rows.filter(l=>Pl(l,s.where,r));if(s.orderBy){let l=s.orderBy.dir==="DESC"?-1:1;n=[...n].sort((c,d)=>an(c[s.orderBy.col],d[s.orderBy.col])*l)}s.offset&&(n=n.slice(s.offset)),Number.isFinite(s.limit)&&(n=n.slice(0,s.limit));let a,i=n;return s.cols?(i=n.map(l=>{let c={};for(let d of s.cols)c[d]=l[d]===void 0?null:l[d];return c}),a=s.cols):a=o.schema?.columns?.map(l=>l.name)||(i[0]?Object.keys(i[0]):[]),{columns:a,rows:i,rowCount:i.length}}async execute({statement:e,params:r=[]}={}){this._ensureReady();let s=String(e||"").trim(),o=s.split(/\s+/)[0].toUpperCase(),n;if(o==="INSERT")n=this._doInsert(s,r);else if(o==="UPDATE")n=this._doUpdate(s,r);else if(o==="DELETE")n=this._doDelete(s,r);else throw new Error(`FallbackProvider \u4E0D\u652F\u6301\u7684 execute \u8BED\u53E5: ${e}`);return n}_doInsert(e,r){let s=qx(e);if(!s)throw new Error(`\u65E0\u6CD5\u89E3\u6790 INSERT: ${e}`);let o=this._tables.get(s.name);if(!o)throw new Error(`\u8868\u4E0D\u5B58\u5728: ${s.name}`);let n=s.cols||(o.schema.columns||[]).map(c=>c.name);if(!n.length)throw new Error(`\u8868 ${s.name} \u65E0\u5217\u5B9A\u4E49`);if(r.length!==n.length)throw new Error(`INSERT \u53C2\u6570\u6570\u91CF\u4E0D\u5339\u914D (\u671F\u671B ${n.length}, \u5B9E\u9645 ${r.length})`);let a={};for(let c=0;c<n.length;c+=1)a[n[c]]=r[c];let i=o.schema?.pkCols||[],l=/^INSERT\s+OR\s+REPLACE/i.test(e);if(i.length){let c=o.rows.findIndex(d=>i.every(u=>Nl(d[u],a[u])));if(c>=0){if(l)return o.rows[c]=a,this._markDirty(),{rowsAffected:1,lastInsertRowid:c+1};throw new Error(`PRIMARY KEY \u51B2\u7A81 (${i.join(",")})`)}}return o.rows.push(a),this._markDirty(),{rowsAffected:1,lastInsertRowid:o.rows.length}}_doUpdate(e,r){let s=Jx(e);if(!s)throw new Error(`\u65E0\u6CD5\u89E3\u6790 UPDATE: ${e}`);let o=this._tables.get(s.name);if(!o)return{rowsAffected:0,lastInsertRowid:null};let n=s.setCols.length;if(r.length<n)throw new Error(`UPDATE \u53C2\u6570\u4E0D\u8DB3 (SET \u9700\u8981 ${n}, \u5B9E\u9645 ${r.length})`);let a=r.slice(0,n),i=r.slice(n),l=0;for(let c of o.rows)if(Pl(c,s.where,i)){for(let d=0;d<n;d+=1)c[s.setCols[d]]=a[d];l+=1}return l>0&&this._markDirty(),{rowsAffected:l,lastInsertRowid:null}}_doDelete(e,r){let s=Xx(e);if(!s)throw new Error(`\u65E0\u6CD5\u89E3\u6790 DELETE: ${e}`);let o=this._tables.get(s.name);if(!o)return{rowsAffected:0,lastInsertRowid:null};let n=o.rows.length;o.rows=o.rows.filter(i=>!Pl(i,s.where,r));let a=n-o.rows.length;return a>0&&this._markDirty(),{rowsAffected:a,lastInsertRowid:null}}async batch({statements:e}={}){this._ensureReady();let r=[];for(let s of e||[])if(String(s.statement||"").trim().split(/\s+/)[0].toUpperCase()==="SELECT"){let n=await this.query(s);r.push({kind:"query",...n})}else{let n=await this.execute(s);r.push({kind:"exec",...n})}return{results:r}}async transaction({statements:e}={}){this._ensureReady();let r=this._snapshot();try{let{results:s}=await this.batch({statements:e});return this._flushSave(!0),{committed:!0,results:s}}catch(s){throw this._restore(r),go.warn("FallbackProvider \u4E8B\u52A1\u56DE\u6EDA",{error:s?.message||s}),s}}async paginate({statement:e,params:r=[],page:s={}}={}){this._ensureReady();let o=Number.isFinite(s?.limit)?s.limit:50,n=Number.isFinite(s?.offset)?s.offset:0,a=`${e} LIMIT ${o} OFFSET ${n}`;return this.query({statement:a,params:r})}async backup(){return this._ensureReady(),this._snapshot()}async export(){return this.backup()}async import(e){this._ensureReady(),this._restore(e||{}),this._markDirty(),this._flushSave(!0)}describe(){return{kind:this.kind,initialized:this._initialized,tables:this._tables.size,migrations:this._migrations.size,tableNames:[...this._tables.keys()]}}_snapshot(){let e={};for(let[r,s]of this._tables)e[r]={schema:s.schema,rows:JSON.parse(JSON.stringify(s.rows))};return{migrations:[...this._migrations],tables:e}}_restore(e){this._migrations=new Set(Array.isArray(e?.migrations)?e.migrations:[]),this._tables=new Map;for(let[r,s]of Object.entries(e?.tables||{}))this._tables.set(r,{schema:s.schema||{name:r,columns:[],pkCols:[]},rows:Array.isArray(s.rows)?s.rows:[]})}_markDirty(){this._dirty=!0,this._saveTimer&&clearTimeout(this._saveTimer),this._saveTimer=setTimeout(()=>this._flushSave(!1),300)}_flushSave(e){if(this._saveTimer&&(clearTimeout(this._saveTimer),this._saveTimer=null),!(!this._dirty&&!e))try{ve.set(ty,this._snapshot()),this._dirty=!1}catch(r){go.error("FallbackProvider \u6301\u4E45\u5316\u5931\u8D25",{error:r?.message||r})}}_ensureReady(){if(!this._initialized)throw new Error("FallbackProvider \u5C1A\u672A\u521D\u59CB\u5316")}},Zx=wa});var oy={};se(oy,{PROVIDER_KIND:()=>yo,createProvider:()=>ew,detectAuthoritySdk:()=>xa,disposeToolDataProvider:()=>tw,getCurrentProvider:()=>mo,getToolDataProvider:()=>cn});function xa(){if(typeof window>"u")return null;try{let t=window.STAuthority?.AuthoritySDK;if(t)return t}catch{}try{if(window.parent&&window.parent!==window){let t=window.parent.STAuthority?.AuthoritySDK;if(t)return t}}catch{}return null}async function Ll({preferAuthority:t=!0,extensionVersion:e="1.0.149"}={}){if(t&&xa()){let{AuthorityProvider:s}=await Promise.resolve().then(()=>(ey(),Zp));return new s({extensionVersion:e})}let{FallbackProvider:r}=await Promise.resolve().then(()=>(sy(),ry));return new r}async function cn(t={}){return ks||ln||(ln=(async()=>{let e=await Ll({preferAuthority:!0,...t}),r=await e.init();if(!r&&e.kind===yo.AUTHORITY){Dl.warn("AuthorityProvider \u521D\u59CB\u5316\u5931\u8D25\uFF0C\u964D\u7EA7\u5230 FallbackProvider");try{await e.dispose()}catch{}e=await Ll({preferAuthority:!1}),r=await e.init()}return r?Dl.info(`Provider \u521D\u59CB\u5316\u5B8C\u6210: kind=${e.kind}`):Dl.error(`Provider \u5168\u90E8\u521D\u59CB\u5316\u5931\u8D25 (kind=${e.kind})`),ks=e,e})(),ln)}function mo(){return ks}async function ew(t={}){let e=await Ll(t);return await e.init(),e}async function tw(){if(ks){try{await ks.dispose()}catch{}ks=null}ln=null}var Dl,yo,ks,ln,fo=N(()=>{H();Dl=R.createScope("ToolDataProvider"),yo=Object.freeze({AUTHORITY:"authority",FALLBACK:"fallback"}),ks=null,ln=null});var Fl={};se(Fl,{clearChatScopeConfig:()=>by,clearLockEntry:()=>yy,clearScopeLocks:()=>gy,clearSheetLocks:()=>fy,clearSlot:()=>dy,commitSlotTables:()=>_a,default:()=>sw,deleteRowsBySheet:()=>ly,deleteSheetsBySlot:()=>Sa,ensureTableDataReady:()=>Fe,getChatScopeConfig:()=>my,getCurrentTableDataProvider:()=>ay,getLocksForSheet:()=>uy,getRowsBySheet:()=>jl,getSheetsBySlot:()=>Kl,loadSlotTables:()=>cy,setChatScopeConfig:()=>hy,setLockEntry:()=>py,upsertSheetMeta:()=>zl,upsertSheetRows:()=>Ul});function Bl(){return Ol||(Ol=R.createScope("TableDataService")),Ol}async function Fe(){return ny?mo():dn||(dn=(async()=>{try{let t=await cn();if(!t)return Bl().error("Provider \u4E0D\u53EF\u7528\uFF0C\u8DF3\u8FC7 migration"),null;let e=await t.migrate({migrations:[...rw]});return ny=!0,Bl().info("\u8868\u683C\u6570\u636E migration \u5B8C\u6210",{kind:t.kind,applied:e?.applied?.length||0,skipped:e?.skipped?.length||0}),t}catch(t){return Bl().error("table-data-service migration \u5931\u8D25",t),null}finally{dn=null}})(),dn)}function ay(){return mo()}function iy(){return Date.now()}function va(t){try{return JSON.stringify(t)}catch{return"{}"}}function Ta(t,e=null){if(typeof t!="string")return e;try{return JSON.parse(t)}catch{return e}}function Gr(t={}){return{chatId:String(t.chatId??"").trim(),messageId:String(t.messageId??"").trim(),swipeId:String(t.swipeId??"0").trim()||"0",isolationKey:_e(t.isolationKey)}}function qr(t){return t&&t.chatId&&t.messageId}async function zl(t,e){let r=await Fe();if(!r)return!1;let s=Gr(t);return!qr(s)||!e?.uid?!1:(await r.execute({statement:`INSERT INTO table_sheets
      (chat_id, message_id, swipe_id, isolation_key, sheet_uid, name, columns_json, meta_json, order_no, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,params:[s.chatId,s.messageId,s.swipeId,s.isolationKey,String(e.uid),String(e.name??e.uid),va(Array.isArray(e.columns)?e.columns:[]),va(e.meta||e.sourceData||{}),Number.isFinite(e.orderNo)?e.orderNo:0,iy()]}),!0)}async function Kl(t){let e=await Fe();if(!e)return[];let r=Gr(t);return qr(r)?((await e.query({statement:`SELECT * FROM table_sheets
      WHERE chat_id = ? AND message_id = ? AND swipe_id = ? AND isolation_key = ?
      ORDER BY order_no ASC`,params:[r.chatId,r.messageId,r.swipeId,r.isolationKey]}))?.rows||[]).map(o=>({uid:o.sheet_uid,name:o.name,columns:Ta(o.columns_json,[]),meta:Ta(o.meta_json,{}),orderNo:o.order_no||0,updatedAt:o.updated_at||0})):[]}async function Sa(t){let e=await Fe();if(!e)return 0;let r=Gr(t);return qr(r)&&(await e.execute({statement:`DELETE FROM table_sheets
      WHERE chat_id = ? AND message_id = ? AND swipe_id = ? AND isolation_key = ?`,params:[r.chatId,r.messageId,r.swipeId,r.isolationKey]}))?.rowsAffected||0}async function Ul(t,e,r){let s=await Fe();if(!s)return!1;let o=Gr(t);if(!qr(o)||!e||!Array.isArray(r))return!1;if(await s.execute({statement:`DELETE FROM table_rows
      WHERE chat_id = ? AND message_id = ? AND swipe_id = ? AND isolation_key = ? AND sheet_uid = ?`,params:[o.chatId,o.messageId,o.swipeId,o.isolationKey,String(e)]}),r.length===0)return!0;let n=r.map((a,i)=>({statement:`INSERT INTO table_rows
      (chat_id, message_id, swipe_id, isolation_key, sheet_uid, row_index, row_id, row_name, cells_json)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,params:[o.chatId,o.messageId,o.swipeId,o.isolationKey,String(e),i,String(a?.id??""),String(a?.name??""),va(a?.cells||{})]}));return typeof s.transaction=="function"?await s.transaction({statements:n}):await s.batch({statements:n}),!0}async function jl(t,e){let r=await Fe();if(!r)return[];let s=Gr(t);return!qr(s)||!e?[]:((await r.query({statement:`SELECT * FROM table_rows
      WHERE chat_id = ? AND message_id = ? AND swipe_id = ? AND isolation_key = ? AND sheet_uid = ?
      ORDER BY row_index ASC`,params:[s.chatId,s.messageId,s.swipeId,s.isolationKey,String(e)]}))?.rows||[]).map(n=>({id:n.row_id||"",name:n.row_name||"",cells:Ta(n.cells_json,{}),rowIndex:n.row_index}))}async function ly(t,e){let r=await Fe();if(!r)return 0;let s=Gr(t);return!qr(s)||!e?0:(await r.execute({statement:`DELETE FROM table_rows
      WHERE chat_id = ? AND message_id = ? AND swipe_id = ? AND isolation_key = ? AND sheet_uid = ?`,params:[s.chatId,s.messageId,s.swipeId,s.isolationKey,String(e)]}))?.rowsAffected||0}async function cy(t){let e=await Kl(t);if(e.length===0)return[];let r=[];for(let s of e){let o=await jl(t,s.uid);r.push({id:s.uid,uid:s.uid,name:s.name,columns:s.columns,rows:o,meta:s.meta,orderNo:s.orderNo,updatedAt:s.updatedAt})}return r}async function _a(t,e){let r=await Fe();if(!r)return!1;let s=Gr(t);if(!qr(s)||!Array.isArray(e))return!1;await Sa(s),await r.execute({statement:`DELETE FROM table_rows
      WHERE chat_id = ? AND message_id = ? AND swipe_id = ? AND isolation_key = ?`,params:[s.chatId,s.messageId,s.swipeId,s.isolationKey]});for(let o=0;o<e.length;o++){let n=e[o],a=String(n?.uid||n?.id||`sheet_${o+1}`);await zl(s,{uid:a,name:n?.name||a,columns:n?.columns||[],meta:n?.meta||{},orderNo:Number.isFinite(n?.orderNo)?n.orderNo:o}),await Ul(s,a,Array.isArray(n?.rows)?n.rows:[])}return!0}async function dy(t){let e=await Fe();if(!e)return!1;let r=Gr(t);return qr(r)?(await Sa(r),await e.execute({statement:`DELETE FROM table_rows
      WHERE chat_id = ? AND message_id = ? AND swipe_id = ? AND isolation_key = ?`,params:[r.chatId,r.messageId,r.swipeId,r.isolationKey]}),!0):!1}async function uy(t,e){let r=await Fe();if(!r)return[];let s=String(t?.chatId??"").trim(),o=_e(t?.isolationKey);return!s||!e?[]:((await r.query({statement:`SELECT lock_type, target FROM table_locks
      WHERE chat_id = ? AND isolation_key = ? AND sheet_uid = ?`,params:[s,o,String(e)]}))?.rows||[]).map(a=>({lockType:a.lock_type,target:a.target||""}))}async function py(t,e,r,s=""){let o=await Fe();if(!o)return!1;let n=String(t?.chatId??"").trim(),a=_e(t?.isolationKey);return!n||!e||!r?!1:(await o.execute({statement:"INSERT INTO table_locks (chat_id, isolation_key, sheet_uid, lock_type, target) VALUES (?, ?, ?, ?, ?)",params:[n,a,String(e),String(r),String(s)]}),!0)}async function yy(t,e,r,s=""){let o=await Fe();if(!o)return!1;let n=String(t?.chatId??"").trim(),a=_e(t?.isolationKey);return!n||!e||!r?!1:(await o.execute({statement:`DELETE FROM table_locks
      WHERE chat_id = ? AND isolation_key = ? AND sheet_uid = ? AND lock_type = ? AND target = ?`,params:[n,a,String(e),String(r),String(s)]}),!0)}async function fy(t,e){let r=await Fe();if(!r)return!1;let s=String(t?.chatId??"").trim(),o=_e(t?.isolationKey);return!s||!e?!1:(await r.execute({statement:`DELETE FROM table_locks
      WHERE chat_id = ? AND isolation_key = ? AND sheet_uid = ?`,params:[s,o,String(e)]}),!0)}async function gy(t){let e=await Fe();if(!e)return!1;let r=String(t?.chatId??"").trim(),s=_e(t?.isolationKey);return r?(await e.execute({statement:"DELETE FROM table_locks WHERE chat_id = ? AND isolation_key = ?",params:[r,s]}),!0):!1}async function my(t){let e=await Fe();if(!e)return null;let r=String(t??"").trim();if(!r)return null;let o=(await e.query({statement:"SELECT scoped_config_json FROM table_chat_scope WHERE chat_id = ?",params:[r]}))?.rows?.[0];return o?Ta(o.scoped_config_json,null):null}async function hy(t,e){let r=await Fe();if(!r)return!1;let s=String(t??"").trim();return s?(await r.execute({statement:"INSERT INTO table_chat_scope (chat_id, scoped_config_json, updated_at) VALUES (?, ?, ?)",params:[s,va(e||{}),iy()]}),!0):!1}async function by(t){let e=await Fe();if(!e)return!1;let r=String(t??"").trim();return r?(await e.execute({statement:"DELETE FROM table_chat_scope WHERE chat_id = ?",params:[r]}),!0):!1}var Ol,rw,ny,dn,sw,Ea=N(()=>{H();fo();Ue();rw=Object.freeze([{id:"table_engine_v1__sheets",statement:`
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
    `.replace(/\s+/g," ").trim()}]),ny=!1,dn=null;sw={ensureTableDataReady:Fe,getCurrentTableDataProvider:ay,upsertSheetMeta:zl,getSheetsBySlot:Kl,deleteSheetsBySlot:Sa,upsertSheetRows:Ul,getRowsBySheet:jl,deleteRowsBySheet:ly,loadSlotTables:cy,commitSlotTables:_a,clearSlot:dy,getLocksForSheet:uy,setLockEntry:py,clearLockEntry:yy,clearSheetLocks:fy,clearScopeLocks:gy,getChatScopeConfig:my,setChatScopeConfig:hy,clearChatScopeConfig:by}});function Tr(){return Wl||(Wl=R.createScope("TableChatScope")),Wl}function nr(){let t=globalThis.window||globalThis,e=t?.TavernHelper?.getCurrentChatId?.()||t?.Silvy?.getCurrentChatId?.()||t?.chat_metadata?.chat_id||t?.this_chid||t?.name1;return String(e??"").trim()||"default_chat"}function ka(){return new Date().toISOString()}function ho(t){return t!==null&&typeof t=="object"&&!Array.isArray(t)}function vr(t){let e=Yl.get(Hl,{}),s=(ho(e)?e:{})[t];return wy(s)}function Cs(t,e){let r=Yl.get(Hl,{}),s=ho(r)?r:{};s[t]=e,Yl.set(Hl,s),nw(t,e).catch(()=>{})}async function nw(t,e){try{let r=await Promise.resolve().then(()=>(Ea(),Fl));await r.ensureTableDataReady(),await r.setChatScopeConfig(t,e||{})}catch(r){Tr().warn("chat-scope SQL \u955C\u50CF\u5931\u8D25\uFF08\u4E0D\u5F71\u54CD\u4E3B\u6D41\u7A0B\uFF09",{error:r?.message||String(r)})}}function xy(){return{template:{},templateArchives:{}}}function wy(t){return ho(t)?{template:ho(t.template)?t.template:{},templateArchives:ho(t.templateArchives)?t.templateArchives:{}}:xy()}function Aa(t){return ho(t)?{mode:aw.has(t.mode)?t.mode:je.INHERIT_GLOBAL,presetName:typeof t.presetName=="string"?t.presetName:"",templateStr:typeof t.templateStr=="string"?t.templateStr:"",guideData:t.guideData!==void 0?ae(t.guideData):null,updatedAt:typeof t.updatedAt=="string"?t.updatedAt:ka(),source:typeof t.source=="string"?t.source:"ui"}:null}function iw(t){let e=[t.mode||"",t.presetName||"",t.templateStr||""],r=5381,s=e.join("||");for(let o=0;o<s.length;o++)r=(r<<5)+r+s.charCodeAt(o),r|=0;return String(r)}var ow,Hl,Wl,Yl,aw,Gl,ar,vy=N(()=>{Ke();H();Ue();Hr();ow="tableChatScope",Hl="chats";Yl=D.namespace(ow);aw=new Set(Object.values(je));Gl=class{getScopedConfig(e=nr()){return vr(e)}setScopedConfig(e,r=nr()){let s=wy(e);return Cs(r,s),s}getTemplateScope(e,r=nr()){let s=_e(e===void 0?ie.getKey():e),o=vr(r);return Aa(o.template[s])||null}setTemplateScope(e,r,s=nr()){let o=_e(r===void 0?ie.getKey():r),n=Aa({...e,updatedAt:ka()});if(!n)return Tr().warn("setTemplateScope \u6536\u5230\u65E0\u6548 state",e),null;let a=vr(s);return a.template[o]=n,Cs(s,a),Tr().info("\u6A21\u677F\u4F5C\u7528\u57DF\u5DF2\u66F4\u65B0",{chatId:s,isolationKey:o,mode:n.mode}),n}clearTemplateScope(e,r=nr()){let s=_e(e===void 0?ie.getKey():e),o=vr(r);o.template[s]!==void 0&&(delete o.template[s],Cs(r,o),Tr().info("\u6A21\u677F\u4F5C\u7528\u57DF\u5DF2\u6E05\u9664",{chatId:r,isolationKey:s}))}archiveCurrentTemplate(e,r=nr()){let s=_e(e===void 0?ie.getKey():e),o=vr(r),n=Aa(o.template[s]);if(!n)return null;let a=iw(n),i=Array.isArray(o.templateArchives[s])?o.templateArchives[s]:[];if(i.length>0&&i[0].fingerprint===a)return null;let l={fingerprint:a,state:ae(n),archivedAt:ka()},c=[l,...i].slice(0,Mp);return o.templateArchives[s]=c,Cs(r,o),Tr().info("\u6A21\u677F\u5DF2\u5F52\u6863",{chatId:r,isolationKey:s,archiveCount:c.length}),l}listTemplateArchives(e,r=nr()){let s=_e(e===void 0?ie.getKey():e),o=vr(r);return(Array.isArray(o.templateArchives[s])?o.templateArchives[s]:[]).map(a=>ae(a))}restoreTemplateArchive(e,r,s=nr()){let o=_e(r===void 0?ie.getKey():r),n=vr(s),a=Array.isArray(n.templateArchives[o])?n.templateArchives[o]:[],i=a[e];if(!i)return Tr().warn("restoreTemplateArchive: \u627E\u4E0D\u5230 archive",{index:e,available:a.length}),null;this.archiveCurrentTemplate(o,s);let l=Aa({...i.state,source:"restore",updatedAt:ka()});if(!l)return null;let c=vr(s);return c.template[o]=l,Cs(s,c),Tr().info("\u6A21\u677F\u5DF2\u6062\u590D",{chatId:s,isolationKey:o,fromArchiveIndex:e}),l}clearTemplateArchives(e,r=nr()){let s=_e(e===void 0?ie.getKey():e),o=vr(r);Array.isArray(o.templateArchives[s])&&(delete o.templateArchives[s],Cs(r,o),Tr().info("\u6A21\u677F\u5F52\u6863\u5DF2\u6E05\u7A7A",{chatId:r,isolationKey:s}))}resetChat(e=nr()){Cs(e,xy()),Tr().warn("\u5DF2\u91CD\u7F6E chat \u7684 ScopedConfig",{chatId:e})}},ar=new Gl});var Ty,Sy=N(()=>{Ue();Ty=Object.freeze({formatId:"youyou",displayName:"YouYou \u539F\u751F (tables \u6570\u7EC4)",detect(t){return!t||typeof t!="object"||Array.isArray(t)?!1:Array.isArray(t.tables)},parse(t){if(!t||typeof t!="object")throw new Error("youyou-importer: raw \u4E0D\u662F\u5BF9\u8C61");return{tables:Array.isArray(t.tables)?ae(t.tables):[],name:typeof t.name=="string"?t.name:"",description:typeof t.description=="string"?t.description:"",promptTemplate:typeof t.promptTemplate=="string"?t.promptTemplate:""}}})});function ir(t,e=""){return t==null?e:String(t).trim()||e}function _y(t){return t&&typeof t=="object"&&Array.isArray(t.content)}function Ey(t){return!t||typeof t!="object"?null:t.tables&&typeof t.tables=="object"&&!Array.isArray(t.tables)&&Object.keys(t.tables).filter(s=>s.startsWith("sheet_")&&_y(t.tables[s])).length>0?t.tables:Object.keys(t).filter(r=>r.startsWith("sheet_")&&_y(t[r])).length>0?t:null}function lw(t){return!t||typeof t!="object"?[]:Object.keys(t).filter(r=>r.startsWith("sheet_")&&t[r]&&typeof t[r]=="object").map((r,s)=>({key:r,table:t[r],fallbackOrder:s})).sort((r,s)=>{let o=Number.isFinite(r.table.orderNo)?r.table.orderNo:r.fallbackOrder,n=Number.isFinite(s.table.orderNo)?s.table.orderNo:s.fallbackOrder;return o-n}).map(({key:r,table:s},o)=>{let n=s.sourceData&&typeof s.sourceData=="object"?s.sourceData:{},a=Array.isArray(s.content)?s.content:[],i=Array.isArray(a[0])?a[0]:[],l=El(n.note),c=new Set,d=i.slice(1).map((y,p)=>{let f=l[p]||{},g=ir(y||f.title,`\u5217${p+1}`);return{key:nn(g||`col_${p+1}`,c),title:g,description:ir(f.description,""),type:"text",required:!1}}),u=a.slice(1).map((y,p)=>{let f=Array.isArray(y)?y:[],g={};return d.forEach((h,x)=>{g[h.key]=Fr(f[x+1])}),{name:ir(f[0],`\u884C${p+1}`),cells:g}});return{id:ir(s.uid||r,`sheet_${o+1}`),name:ir(s.name,`\u8868${o+1}`),note:ir(n.note,""),enabled:s.enabled!==!1,aiInstructions:{init:ir(n.initNode,""),create:ir(n.insertNode,""),update:ir(n.updateNode,""),delete:ir(n.deleteNode,"")},columns:d,rows:u}})}var Ay,ky=N(()=>{Ue();sr();Ay=Object.freeze({formatId:"shujuku",displayName:"shujuku \u6570\u636E\u5E93\u683C\u5F0F (sheet_x)",detect(t){return!t||typeof t!="object"||Array.isArray(t)?!1:Ey(t)!==null},parse(t){let e=Ey(t);if(!e)throw new Error("shujuku-importer: \u672A\u627E\u5230 sheet_xxx \u5165\u53E3");return{tables:lw(e),name:typeof t.name=="string"?t.name:"",description:typeof t.description=="string"?t.description:""}}})});var Cy,Iy=N(()=>{Cy=Object.freeze({formatId:"youyou",displayName:"YouYou \u539F\u751F (.json)",fileExtension:".json",mimeType:"application/json",serialize(t){return{version:1,exportedAt:new Date().toISOString(),templates:Array.isArray(t)?t:[]}}})});function un(){return ql||(ql=R.createScope("TemplateAdapter")),ql}function Ry(t){if(t==null)return null;for(let e of cw){let r=!1;try{r=e.detect(t)}catch(s){un().warn(`importer ${e.formatId} detect \u629B\u9519`,s);continue}if(r)try{let s=e.parse(t);if(s&&Array.isArray(s.tables))return un().debug("\u9002\u914D\u5668\u547D\u4E2D",{formatId:e.formatId,displayName:e.displayName,tableCount:s.tables.length,firstTableName:s.tables[0]?.name||""}),{...s,formatId:e.formatId};un().warn(`importer ${e.formatId} parse \u8FD4\u56DE\u65E0\u6548\u7ED3\u6784`,{hasResult:!!s,hasTablesArray:Array.isArray(s?.tables)})}catch(s){un().warn(`importer ${e.formatId} parse \u629B\u9519\uFF0C\u5C1D\u8BD5\u4E0B\u4E00\u4E2A`,s)}}return un().warn("importTemplateAuto: \u65E0\u9002\u914D\u5668\u547D\u4E2D",{isObject:t&&typeof t=="object",isArray:Array.isArray(t),keys:t&&typeof t=="object"?Object.keys(t).slice(0,10):[]}),null}var ql,cw,eA,My=N(()=>{H();Sy();ky();Iy();cw=Object.freeze([Ty,Ay]),eA=Object.freeze([Cy])});function xt(){return Vl||(Vl=R.createScope("TableTemplate")),Vl}function rt(t,e=""){return t==null?e:String(t).trim()||e}function Py(t="template"){return`${t}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`}function xo(t={}){let e=Ry(t),r=[],s="",o="",n="",a="";e?(r=e.tables,s=e.formatId||"",o=e.name||"",n=e.description||"",a=e.promptTemplate||""):t&&typeof t=="object"&&xt().warn("normalizeTemplate: \u65E0\u9002\u914D\u5668\u547D\u4E2D\uFF0C\u6309\u7A7A\u6A21\u677F\u5904\u7406",{keys:Object.keys(t).slice(0,10)});let i=ha({tables:r});return{id:rt(t?.id,Py()),name:rt(t?.name||o,"\u672A\u547D\u540D\u6A21\u677F"),description:rt(t?.description||n,""),tables:i.tables||r,promptTemplate:rt(t?.promptTemplate||a,""),sourceFormat:s,createdAt:rt(t?.createdAt,new Date().toISOString()),updatedAt:rt(t?.updatedAt,new Date().toISOString())}}function Ny(){pn=null}function $y(){return[xo({id:gt,name:Tl,description:"\u5305\u542B\u5168\u5C40\u6570\u636E\u3001\u4E3B\u89D2\u3001\u91CD\u8981\u89D2\u8272\u3001\u6280\u80FD\u3001\u80CC\u5305\u3001\u4EFB\u52A1\u3001\u7EAA\u8981\u548C\u9009\u9879\u8868\u3002",tables:ae(lo)})]}function Is(){let t=bo.get(Jl,[]);return Array.isArray(t)?t.map(xo):[]}function Jr(){if(pn)return pn;let t=$y(),e=Is(),r=new Map(e.map(n=>[n.id,n])),s=t.map(n=>r.has(n.id)?r.get(n.id):n),o=new Set(t.map(n=>n.id));for(let n of e)o.has(n.id)||s.push(n);return pn=Object.freeze(s),pn}function As(t){let e=rt(t,"");return Jr().find(r=>r.id===e)||null}function Wr(t={}){let e=new Date().toISOString(),r=xo({...t,id:rt(t.id,Py()),updatedAt:e,createdAt:rt(t.createdAt,e)}),o=Is().filter(n=>n.id!==r.id);return o.push(r),bo.set(Jl,o),Ny(),{success:!0,template:r}}function Ql(t){let e=rt(t,"");if(!e||e===gt)return{success:!1,error:"\u5185\u7F6E\u6A21\u677F\u4E0D\u80FD\u5220\u9664\u3002"};let r=Is().filter(s=>s.id!==e);return bo.set(Jl,r),Ny(),dw()===e&&Zl(gt),{success:!0}}function Dy(t,e){let r=rt(t,"");if(!r||r===gt)return{success:!1,error:"\u5185\u7F6E\u6A21\u677F\u4E0D\u80FD\u91CD\u547D\u540D\u3002"};let s=rt(e,"");if(!s)return{success:!1,error:"\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A\u3002"};let o=As(r);return o?Wr({...o,name:s}):{success:!1,error:"\u6A21\u677F\u4E0D\u5B58\u5728\u3002"}}function Ca(){return{version:1,exportedAt:new Date().toISOString(),templates:Is()}}function Ly(t,{overwrite:e=!1}={}){let r;if(Array.isArray(t))r=t;else if(t&&typeof t=="object")Array.isArray(t.templates)?r=t.templates:t.template&&typeof t.template=="object"?r=[t.template]:r=[t];else return{success:!1,imported:0,skipped:0,errors:["\u65E0\u6548\u7684\u5BFC\u5165\u6570\u636E\u683C\u5F0F\u3002"]};xt().info("importTemplates \u5F00\u59CB",{rawListCount:r.length,overwrite:e});let s=new Set(Is().map(i=>i.id)),o=0,n=0,a=[];for(let i of r)try{let l=xo(i);if(xt().info("importTemplates \u5355\u6761",{id:l.id,name:l.name,tableCount:Array.isArray(l.tables)?l.tables.length:0,firstTableName:l.tables?.[0]?.name||""}),!e&&s.has(l.id)){n++;continue}Wr(l),s.add(l.id),o++}catch(l){a.push(rt(l?.message,"\u672A\u77E5\u9519\u8BEF")),xt().error("importTemplates \u5355\u6761\u5931\u8D25",l)}return xt().info("importTemplates \u5B8C\u6210",{imported:o,skipped:n,errorCount:a.length}),{success:!0,imported:o,skipped:n,errors:a}}function dw(){let t=bo.get(Xl,""),e=rt(t,gt);return As(e)?e:gt}function Zl(t){let e=rt(t,gt);return bo.set(Xl,e),xt().info("\u5168\u5C40\u6FC0\u6D3B\u6A21\u677F\u5DF2\u5207\u6362",{templateId:e}),e}function Vr(){let t=bo.get(Xl,""),e=rt(t,gt),r=As(e);return r||$y()[0]}function uw(t){try{return JSON.stringify(t)}catch(e){return xt().error("templateToString \u5931\u8D25",e),""}}function pw(t){if(!t||typeof t!="string")return null;try{let e=JSON.parse(t);return xo(e)}catch(e){return xt().warn("templateFromString \u53CD\u5E8F\u5217\u5316\u5931\u8D25",e),null}}function wo({chatId:t,isolationKey:e}={}){let r=e===void 0?ie.getKey():e,s=ar.getTemplateScope(r,t);if(!s||s.mode===je.INHERIT_GLOBAL){let n=Vr();return xt().debug("resolveActiveTemplate: inherit_global",{chatId:t,isolationKey:r,templateId:n?.id||"",templateName:n?.name||"",tableCount:Array.isArray(n?.tables)?n.tables.length:0,firstTableName:n?.tables?.[0]?.name||""}),{template:n,mode:je.INHERIT_GLOBAL,source:{templateId:n?.id||""}}}if(s.mode===je.CHAT_OVERRIDE){let n=pw(s.templateStr);if(n)return{template:n,mode:je.CHAT_OVERRIDE,source:{}};xt().warn("chat_override templateStr \u53CD\u5E8F\u5217\u5316\u5931\u8D25\uFF0C\u964D\u7EA7\u5230 inherit_global");let a=Vr();return{template:a,mode:je.INHERIT_GLOBAL,source:{templateId:a?.id||"",fallback:!0}}}if(s.mode===je.PRESET_LINK){let n=s.presetName||"",a=Jr(),i=a.find(c=>c.name===n)||a.find(c=>c.id===n);if(i)return{template:i,mode:je.PRESET_LINK,source:{presetName:n,templateId:i.id}};xt().warn("preset_link \u6307\u5411\u7684\u5168\u5C40\u9884\u8BBE\u4E0D\u5B58\u5728\uFF0C\u964D\u7EA7\u5230 inherit_global",{presetName:n});let l=Vr();return{template:l,mode:je.INHERIT_GLOBAL,source:{templateId:l?.id||"",presetName:n,fallback:!0}}}let o=Vr();return{template:o,mode:je.INHERIT_GLOBAL,source:{templateId:o?.id||"",unknownMode:s.mode}}}function Oy(t,e={}){if(!t||typeof t!="object")return{success:!1,error:"\u6A21\u677F\u4E0D\u80FD\u4E3A\u7A7A"};let r=xo(t),s=e.isolationKey===void 0?ie.getKey():e.isolationKey;ar.archiveCurrentTemplate(s,e.chatId);let o=ar.setTemplateScope({mode:je.CHAT_OVERRIDE,templateStr:uw(r),source:e.source||"ui"},s,e.chatId);return xt().info("applyTemplateAsChatOverride",{chatId:e.chatId,isolationKey:s,templateName:r.name}),{success:!0,scopeState:o}}function By(t,e={}){let r=rt(t,"");if(!r)return{success:!1,error:"presetName \u4E0D\u80FD\u4E3A\u7A7A"};let s=Jr(),o=s.find(i=>i.name===r)||s.find(i=>i.id===r);if(!o)return{success:!1,error:"\u627E\u4E0D\u5230\u6307\u5B9A\u7684\u5168\u5C40\u9884\u8BBE"};let n=e.isolationKey===void 0?ie.getKey():e.isolationKey;ar.archiveCurrentTemplate(n,e.chatId);let a=ar.setTemplateScope({mode:je.PRESET_LINK,presetName:o.name,source:e.source||"ui"},n,e.chatId);return xt().info("linkPresetToChat",{chatId:e.chatId,isolationKey:n,presetName:o.name}),{success:!0,scopeState:a}}function zy(t={}){let e=t.isolationKey===void 0?ie.getKey():t.isolationKey;return t.archive!==!1&&ar.archiveCurrentTemplate(e,t.chatId),ar.clearTemplateScope(e,t.chatId),xt().info("resetChatTemplateScope",{chatId:t.chatId,isolationKey:e}),{success:!0}}function Ky(t={}){let e=t.isolationKey===void 0?ie.getKey():t.isolationKey;return ar.listTemplateArchives(e,t.chatId)}function Uy(t,e={}){let r=e.isolationKey===void 0?ie.getKey():e.isolationKey,s=ar.restoreTemplateArchive(t,r,e.chatId);return s?{success:!0,scopeState:s}:{success:!1,error:"\u5F52\u6863\u4E0D\u5B58\u5728"}}var bo,Jl,Xl,Vl,pn,uo=N(()=>{Ke();H();sr();Ue();vy();Hr();My();bo=D.namespace("tableWorkbenchTemplates"),Jl="templates",Xl="activeId";pn=null});var Wy={};se(Wy,{TableTemplatePanel:()=>Fy,default:()=>hw});function ec(t){return t===gt}function gw(t,{onChange:e,readonly:r}){let s=m("div",{style:{display:"flex",flexDirection:"column",gap:"12px"}});F(s,_t({label:"\u63CF\u8FF0",control:et({value:t.description||"",placeholder:"\u53EF\u9009 \u2014 \u5907\u6CE8\u7528\u9014",disabled:r,onChange:a=>e({description:a})})})),F(s,m("div",{text:"\u586B\u8868\u63D0\u793A\u8BCD\u6A21\u677F",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}})),F(s,m("div",{text:"\u53EF\u4F7F\u7528\u5B8F\uFF1A{{tableData}} {{lastUserMessage}} {{lastAiMessage}} {{toolWorldbookContent}} \u7B49\u3002\u7559\u7A7A\u4F7F\u7528\u9ED8\u8BA4\u6A21\u677F\u3002",style:{fontSize:"11px",color:"var(--yyt-text-muted)",lineHeight:"1.6",marginBottom:"4px"}}));let o=m("textarea",{className:"yyt-textarea",attrs:{rows:"8",placeholder:"\u53EF\u9009 \u2014 \u81EA\u5B9A\u4E49\u586B\u8868\u63D0\u793A\u8BCD",disabled:r?"disabled":null},style:{width:"100%",resize:"vertical",fontFamily:"ui-monospace, monospace",fontSize:"12px"}});o.value=t.promptTemplate||"",o.addEventListener("change",()=>{r||e({promptTemplate:o.value})}),F(s,o),F(s,m("div",{text:`\u8868\u683C\u7ED3\u6784\uFF08${(t.tables||[]).length} \u5F20\u8868\uFF09`,style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)",marginTop:"6px"}})),F(s,m("div",{text:"\u672C\u9762\u677F\u53EA\u5C55\u793A\u8868\u7ED3\u6784 JSON\u3002\u590D\u6742 schema \u7F16\u8F91\uFF08\u589E\u5220\u8868\u3001\u5217\u5B9A\u4E49\u3001\u9ED8\u8BA4\u884C\uFF09\u5C06\u5728\u586B\u8868\u5DE5\u4F5C\u53F0\u4E2D\u63D0\u4F9B\u3002",style:{fontSize:"11px",color:"var(--yyt-text-muted)",lineHeight:"1.6",marginBottom:"4px"}}));let n=m("pre",{style:{padding:"10px 12px",background:"var(--yyt-bg-base)",border:"1px solid var(--yyt-border)",borderRadius:"var(--yyt-radius-sm, 6px)",fontFamily:"ui-monospace, monospace",fontSize:"11px",lineHeight:"1.6",color:"var(--yyt-text-secondary)",maxHeight:"260px",overflow:"auto",whiteSpace:"pre",margin:"0"}});try{n.textContent=JSON.stringify(t.tables||[],null,2)}catch{n.textContent="// \u65E0\u6CD5\u5E8F\u5217\u5316"}return F(s,n),s}function mw(t){let r=[`${(t.tables||[]).length} \u5F20\u8868`];return t.promptTemplate&&r.push("\u81EA\u5B9A\u4E49\u6A21\u677F"),r}var yw,jy,fw,Fy,hw,Hy=N(()=>{fr();uo();sr();H();Wo();yw=R.createScope("TableTemplatePanel"),jy="";fw={listPresets(){return Jr().map(t=>({id:ec(t.id)?`builtin_table_${t.id}`:t.id,name:t.name,description:t.description||"",promptTemplate:t.promptTemplate||"",tables:t.tables||[],_rawId:t.id,createdAt:t.createdAt,updatedAt:t.updatedAt}))},getPreset(t){if(!t)return null;let e=t.startsWith("builtin_table_")?t.slice(14):t,r=As(e);return r?{id:ec(r.id)?`builtin_table_${r.id}`:r.id,name:r.name,description:r.description||"",promptTemplate:r.promptTemplate||"",tables:r.tables||[],_rawId:r.id,createdAt:r.createdAt,updatedAt:r.updatedAt}:null},getCurrentPresetId(){return jy||""},setCurrentPresetId(t){return jy=t||"",!0},createPreset(t){let e=String(t?.name||"").trim()||"\u65B0\u5EFA\u6A21\u677F",r=Wr({name:e,description:t?.description||"",promptTemplate:t?.promptTemplate||"",tables:Array.isArray(t?.tables)?t.tables:[]});return r?.success?{id:r.template.id,...r.template,_rawId:r.template.id}:null},updatePreset(t,e){if(!t)return null;let r=t.startsWith("builtin_table_")?t.slice(14):t;if(ec(r))return yw.warn("\u62D2\u7EDD\u4FEE\u6539\u5185\u7F6E\u8868\u683C\u6A21\u677F"),null;let s=As(r);if(!s)return null;let o=Wr({...s,...e,id:r});return o?.success?{id:o.template.id,...o.template,_rawId:o.template.id}:null},deletePreset(t){if(!t)return!1;let e=t.startsWith("builtin_table_")?t.slice(14):t;return!!Ql(e)?.success},duplicatePreset(t,e={}){let r=this.getPreset(t);if(!r)return null;let s=e.nameSuffix||" \u526F\u672C";return this.createPreset({name:`${r.name}${s}`,description:r.description,promptTemplate:r.promptTemplate,tables:r.tables})},renamePreset(t,e){if(!t||!e)return null;let r=t.startsWith("builtin_table_")?t.slice(14):t,s=Dy(r,e);return s?.success?this.getPreset(s.template?.id||r):null},exportAll(){return Ca()},importPresets(t){let e=Ly(t,{overwrite:!1});return{added:e?.imported||0,skipped:e?.skipped||0}},resetAll(){let t=Is();for(let e of t)try{Ql(e.id)}catch{}}};Fy=Pr({id:"tableTemplatePanel",kind:"table",panelTitle:"\u8868\u683C\u6A21\u677F",panelHint:"\u7BA1\u7406\u586B\u8868\u5DE5\u4F5C\u53F0\u7684\u8868\u683C\u7ED3\u6784\u6A21\u677F\u3002\u5728\u586B\u8868\u9762\u677F\u9876\u90E8\u5DE5\u5177\u680F\u53EF\u5FEB\u901F\u52A0\u8F7D/\u4FDD\u5B58\u5F53\u524D\u6A21\u677F\u3002",store:fw,renderEditor:gw,renderListItemMeta:mw}),hw=Fy});var Gy={};se(Gy,{ToolManagePanel:()=>Yy,default:()=>bw});var Yy,bw,qy=N(()=>{Xe();Vo();tr();Yy={id:"toolManagePanel",_removeDialog(t){if(!t?.length)return;let e=t.find("#yyt-tool-dialog-overlay");dt(e,"yytToolManageDialogSelect"),e.remove()},_getToolkitWindow(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window},_openToolConfig(t){if(!t)return;let r=this._getToolkitWindow()?.YouYouToolkit||window.YouYouToolkit;if(!r){E("warning","\u672A\u627E\u5230\u5DE5\u5177\u7BB1\u5B9E\u4F8B\uFF0C\u65E0\u6CD5\u8DF3\u8F6C\u5230\u5DE5\u5177\u914D\u7F6E");return}r.switchMainTab("tools"),r.switchSubTab("tools",t)},render(t){let e=Qt(),r=Object.entries(e),s=r.filter(([,o])=>o?.enabled!==!1).length;return`
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
            ${oe(o.name)}
            <span class="yyt-badge" style="background: var(--yyt-accent-soft); color: var(--yyt-accent); margin-left: 6px;">${oe(o.category)}</span>
          </div>
          <div class="yyt-list-row-desc">${oe(o.description)}</div>
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
      `},bindEvents(t,e){let r=Z();!r||!xe(t)||(t.off(".yytToolManage"),this._bindToolEvents(t,r),this._bindFileEvents(t,r))},_bindToolEvents(t,e){t.on("change.yytToolManage",".yyt-tool-toggle input",r=>{let s=e(r.currentTarget).closest(".yyt-list-row"),o=s.data("tool-id"),n=e(r.currentTarget).is(":checked");oa(o,n),s.toggleClass("yyt-tool-item-enabled",n).toggleClass("yyt-tool-item-disabled",!n),s.find(".yyt-status-dot").toggleClass("yyt-status-dot-on",n).toggleClass("yyt-status-dot-off",!n),E("info",n?"\u5DE5\u5177\u5DF2\u542F\u7528":"\u5DE5\u5177\u5DF2\u7981\u7528")}),t.on("click.yytToolManage","#yyt-add-tool",()=>{this._showToolEditDialog(t,e,null)}),t.on("click.yytToolManage",'.yyt-list-row [data-action="config"]',r=>{let s=e(r.currentTarget).closest(".yyt-list-row").data("tool-id");this._openToolConfig(s)}),t.on("click.yytToolManage",'.yyt-list-row [data-action="edit"]',r=>{let s=e(r.currentTarget).closest(".yyt-list-row").data("tool-id");this._showToolEditDialog(t,e,s)}),t.on("click.yytToolManage",'.yyt-list-row [data-action="delete"]',async r=>{let s=e(r.currentTarget).closest(".yyt-list-row").data("tool-id"),o=Zt(s);if(!s||!o||!await yr("\u5220\u9664\u5DE5\u5177",`\u786E\u5B9A\u8981\u5220\u9664\u5DE5\u5177"${o.name}"\u5417\uFF1F`,{danger:!0}))return;if(!Qs(s)){E("error","\u5220\u9664\u5931\u8D25");return}this.renderTo(t),E("success","\u5DE5\u5177\u5DF2\u5220\u9664")})},_bindFileEvents(t,e){t.on("click.yytToolManage","#yyt-import-tools",()=>{t.find("#yyt-import-tools-file").click()}),t.on("change.yytToolManage","#yyt-import-tools-file",async r=>{let s=r.target.files[0];if(s){try{let o=await jo(s),n=eo(o,{overwrite:!1});E(n.success?"success":"error",n.message),n.success&&this.renderTo(t)}catch(o){E("error",`\u5BFC\u5165\u5931\u8D25: ${o.message}`)}e(r.target).val("")}}),t.on("click.yytToolManage","#yyt-export-tools",()=>{try{let r=Zs();Uo(r,`youyou_toolkit_tools_${Date.now()}.json`),E("success","\u5DE5\u5177\u5DF2\u5BFC\u51FA")}catch(r){E("error",`\u5BFC\u51FA\u5931\u8D25: ${r.message}`)}}),t.on("click.yytToolManage","#yyt-reset-tools",async()=>{await yr("\u91CD\u7F6E\u5DE5\u5177","\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u5DE5\u5177\u5417\uFF1F",{danger:!0})&&(to(),this.renderTo(t),E("info","\u5DE5\u5177\u5DF2\u91CD\u7F6E"))})},_showToolEditDialog(t,e,r){let s=r?Zt(r):null,o=!!s,n=`
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
                       value="${s?oe(s.name):""}" placeholder="\u5DE5\u5177\u540D\u79F0">
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
                     value="${s?oe(s.description||""):""}" placeholder="\u5DE5\u5177\u63CF\u8FF0">
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
    `;this._removeDialog(t),t.append(n);let a=t.find("#yyt-tool-dialog-overlay"),i=a.find("#yyt-tool-name"),l=a.find("#yyt-tool-category"),c=a.find("#yyt-tool-desc"),d=a.find("#yyt-tool-timeout"),u=a.find("#yyt-tool-retries");Dt(a,{namespace:"yytToolManageDialogSelect",selectors:["#yyt-tool-category"]});let y=()=>{dt(a,"yytToolManageDialogSelect"),a.remove()};a.find("#yyt-tool-dialog-close, #yyt-tool-dialog-cancel").on("click",y),a.on("click",function(p){p.target===this&&y()}),a.find("#yyt-tool-dialog-save").on("click",()=>{let p=i.val().trim(),f=l.val(),g=c.val().trim(),h=parseInt(d.val())||6e4,x=parseInt(u.val())||3;if(!p){E("warning","\u8BF7\u8F93\u5165\u5DE5\u5177\u540D\u79F0"),i.trigger("focus").trigger("select");return}let T=r||`tool_${Date.now()}`;if(!Xs(T,{name:p,category:f,description:g,promptTemplate:s?.promptTemplate||"",extractTags:Array.isArray(s?.extractTags)?s.extractTags:[],config:{execution:{timeout:h,retries:x},api:s?.config?.api||{preset:"",useBypass:!1,bypassPreset:""},messages:Array.isArray(s?.config?.messages)?s.config.messages:[],context:{depth:s?.config?.context?.depth||3,includeTags:Array.isArray(s?.config?.context?.includeTags)?s.config.context.includeTags:[],excludeTags:Array.isArray(s?.config?.context?.excludeTags)?s.config.context.excludeTags:[]},worldbooks:{enabled:s?.config?.worldbooks?.enabled===!0,selected:Array.isArray(s?.config?.worldbooks?.selected)?s.config.worldbooks.selected:[]}},enabled:s?.enabled!==!1})){E("error",o?"\u5DE5\u5177\u66F4\u65B0\u5931\u8D25":"\u5DE5\u5177\u521B\u5EFA\u5931\u8D25");return}so(T),y(),this.renderTo(t),E("success",o?"\u5DE5\u5177\u5DF2\u66F4\u65B0":"\u5DE5\u5177\u5DF2\u521B\u5EFA"),o||this._openToolConfig(T)})},destroy(t){!Z()||!xe(t)||(this._removeDialog(t),t.off(".yytToolManage"))},getStyles(){return`
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
    `},renderTo(t){let e=this.render({});t.html(e),this.bindEvents(t,{})}},bw=Yy});var Jy={};se(Jy,{BypassManager:()=>Ia,DEFAULT_BYPASS_PRESETS:()=>_r,addMessage:()=>$w,buildBypassMessages:()=>zw,bypassManager:()=>ue,createPreset:()=>kw,default:()=>Kw,deleteMessage:()=>Lw,deletePreset:()=>Iw,duplicatePreset:()=>Rw,exportPresets:()=>Ow,getAllPresets:()=>Ew,getDefaultPresetId:()=>Mw,getEnabledMessages:()=>Nw,getPreset:()=>Aw,getPresetList:()=>yn,importPresets:()=>Bw,setDefaultPresetId:()=>Pw,updateMessage:()=>Dw,updatePreset:()=>Cw});function Vy(t){let e=String(t||"").trim().toLowerCase();return e==="system"?"SYSTEM":e==="assistant"||e==="ai"?"assistant":"USER"}function Tw(t){return t&&typeof t=="object"&&typeof t.content=="string"&&!t.name&&!Array.isArray(t.messages)}function Sw(t){return String(t||"").replace(/\$0/g,"{{toolContentMacro}}").replace(/\$1/g,"{{rawRecentMessagesText}}").replace(/\$4/g,"{{toolWorldbookContent}}").replace(/\$8/g,"{{userMessage}}").replace(/\$C/g,"{{characterCard}}")}function _w(t,e,r){let s=t.mainSlot||(t.isMain?"A":t.isMain2?"B":"");return{id:typeof t.id=="string"&&t.id.trim()?t.id.trim():`${r}_msg_${e+1}`,role:Vy(t.role),content:Sw(t.content),enabled:t.enabled!==!1,deletable:t.deletable!==!1,...s?{mainSlot:s,isMain:s==="A",isMain2:s==="B"}:{}}}var xw,Sr,vo,tc,ww,_r,vw,Ia,ue,Ew,yn,Aw,kw,Cw,Iw,Rw,Mw,Pw,Nw,$w,Dw,Lw,Ow,Bw,zw,Kw,To=N(()=>{Ke();Je();H();xw=R.createScope("BypassManager"),Sr="bypass_presets",vo="default_bypass_preset",tc="current_bypass_preset",ww=Object.freeze([{id:"table_fill_default_msg_1",role:"SYSTEM",content:"\u4F60\u662F\u4E00\u4E2A\u52A9\u624B\uFF0C\u8D1F\u8D23\u542C\u4ECE\u7528\u6237\u7684\u6307\u4EE4\u5B8C\u6210\u4F60\u7684\u5DE5\u4F5C",enabled:!0,deletable:!0},{id:"table_fill_default_msg_2",role:"assistant",content:"\u6536\u5230\uFF0C\u6211\u5C06\u5145\u5206\u63CF\u7ED8\u7528\u6237\u7684\u610F\u5FD7\uFF0C\u6BEB\u4E0D\u5077\u61D2\uFF0C\u5E76\u4E14\u6211\u4E00\u5B9A\u4F1A\u9075\u7167\u7528\u6237\u7684\u8981\u6C42",enabled:!0,deletable:!0},{id:"table_fill_default_msg_3",role:"USER",content:`\u4EE5\u4E0B\u662F\u4F60\u53EF\u80FD\u9700\u8981\u7528\u5230\u7684\u80CC\u666F\u8BBE\u5B9A\uFF0C\u6CE8\u610F\u4F60\u53EA\u9700\u8981\u5176\u4E2D\u5173\u4E8E\u5267\u60C5\u4EE5\u53CA\u4EBA\u8BBE\u65B9\u9762\u7684\u6570\u636E\uFF0C\u4E0D\u9700\u8981\u601D\u8003\u91CC\u8FB9\u9664\u6B64\u4E4B\u5916\u7684\u4EFB\u4F55\u683C\u5F0F\u6216\u8005\u601D\u7EF4\u94FE\u65B9\u9762\u7684\u8981\u6C42\uFF1A
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

{{userMessage}}`,enabled:!0,deletable:!1,mainSlot:"B",isMain2:!0},{id:"table_fill_default_msg_8",role:"assistant",content:"\u6536\u5230\u6307\u4EE4\uFF0C\u6211\u5C06\u4E00\u6B65\u4E00\u6B65\u5F00\u59CB\u601D\u8003\uFF0C\u5E76\u5B8C\u6210\u586B\u8868\uFF0C\u9996\u5148\u6211\u8981\u5206\u6790\u5F53\u524D\u8F6E\u6B21\u7684\u5267\u60C5\u53D8\u5316\u3002",enabled:!0,deletable:!0}]),_r={table_workbench_fill_default:{id:"table_workbench_fill_default",name:"\u9ED8\u8BA4\u586B\u8868 Ai \u6307\u4EE4\u9884\u8BBE",description:"\u7528\u4E8E\u586B\u8868\u5DE5\u4F5C\u53F0\u7684\u5185\u7F6E Ai \u6307\u4EE4\u9884\u8BBE\uFF0C\u53EF\u590D\u5236\u540E\u6309\u9700\u7F16\u8F91\u3002",enabled:!0,messages:ww.map(t=>({...t})),createdAt:0,updatedAt:0}},vw=new Set(["\u6807\u51C6\u7834\u9650\u8BCD","\u589E\u5F3A\u7834\u9650"]);Ia=class{constructor(){this._cache=null,this._migrated=!1,this.debugMode=!1}getAllPresets(){if(this._migrateLegacyData(),this._cache)return this._cache;let e=D.get(Sr,{});return this._cache={..._r,...e},this._cache}getPresetList(){let e=this.getAllPresets();return Object.values(e).sort((r,s)=>(s.updatedAt||0)-(r.updatedAt||0))}getPreset(e){return e&&this.getAllPresets()[e]||null}presetExists(e){return!!this.getPreset(e)}createPreset(e){let{id:r,name:s,description:o,messages:n}=e;if(!r||typeof r!="string"||!r.trim())return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};if(!s||typeof s!="string"||!s.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let a=r.trim();if(this.presetExists(a))return{success:!1,message:`\u9884\u8BBE "${a}" \u5DF2\u5B58\u5728`};let i={id:a,name:s.trim(),description:o||"",enabled:!0,messages:n||[],createdAt:Date.now(),updatedAt:Date.now()};return this._savePreset(a,i),K.emit(B.BYPASS_PRESET_CREATED,{presetId:a,preset:i}),this._log(`\u9884\u8BBE\u5DF2\u521B\u5EFA: ${a}`),{success:!0,message:`\u9884\u8BBE "${s}" \u521B\u5EFA\u6210\u529F`,preset:i}}updatePreset(e,r){if(!e)return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};let s=this.getPreset(e);if(!s)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};if(r.id&&r.id!==e)return{success:!1,message:"\u4E0D\u5141\u8BB8\u4FEE\u6539\u9884\u8BBEID"};let o={...s,...r,id:e,updatedAt:Date.now()};return this._savePreset(e,o),K.emit(B.BYPASS_PRESET_UPDATED,{presetId:e,preset:o}),this._log(`\u9884\u8BBE\u5DF2\u66F4\u65B0: ${e}`),{success:!0,message:`\u9884\u8BBE "${s.name}" \u66F4\u65B0\u6210\u529F`,preset:o}}deletePreset(e){if(!e)return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};if(_r[e])return{success:!1,message:"\u4E0D\u5141\u8BB8\u5220\u9664\u9ED8\u8BA4\u9884\u8BBE"};let r=this.getPreset(e);if(!r)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let s=D.get(Sr,{});return delete s[e],D.set(Sr,s),this._cache=null,this.getDefaultPresetId()===e&&this.setDefaultPresetId(null),K.emit(B.BYPASS_PRESET_DELETED,{presetId:e}),this._log(`\u9884\u8BBE\u5DF2\u5220\u9664: ${e}`),{success:!0,message:`\u9884\u8BBE "${r.name}" \u5DF2\u5220\u9664`}}duplicatePreset(e,r,s){let o=this.getPreset(e);if(!o)return{success:!1,message:`\u6E90\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};if((!r||!r.trim())&&(r=`${e}_copy_${Date.now()}`),this.presetExists(r))return{success:!1,message:`\u9884\u8BBE "${r}" \u5DF2\u5B58\u5728`};let n={...JSON.parse(JSON.stringify(o)),id:r.trim(),name:s||`${o.name} (\u526F\u672C)`,createdAt:Date.now(),updatedAt:Date.now()};return this._savePreset(r.trim(),n),K.emit(B.BYPASS_PRESET_CREATED,{presetId:r,preset:n}),{success:!0,message:`\u9884\u8BBE\u5DF2\u590D\u5236\u4E3A "${n.name}"`,preset:n}}addMessage(e,r){let s=this.getPreset(e);if(!s)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let o={id:`msg_${Date.now()}`,role:Vy(r.role||"SYSTEM"),content:r.content||"",enabled:r.enabled!==!1,deletable:r.deletable!==!1,...r.mainSlot?{mainSlot:r.mainSlot}:{}},n=[...s.messages||[],o];return this.updatePreset(e,{messages:n})}updateMessage(e,r,s){let o=this.getPreset(e);if(!o)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let n=o.messages||[],a=n.findIndex(l=>l.id===r);if(a===-1)return{success:!1,message:`\u6D88\u606F "${r}" \u4E0D\u5B58\u5728`};let i=[...n];return i[a]={...i[a],...s},this.updatePreset(e,{messages:i})}deleteMessage(e,r){let s=this.getPreset(e);if(!s)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let o=s.messages||[],n=o.find(i=>i.id===r);if(!n)return{success:!1,message:`\u6D88\u606F "${r}" \u4E0D\u5B58\u5728`};if(n.deletable===!1)return{success:!1,message:"\u8BE5\u6D88\u606F\u4E0D\u53EF\u5220\u9664"};let a=o.filter(i=>i.id!==r);return this.updatePreset(e,{messages:a})}getEnabledMessages(e){let r=this.getPreset(e);return!r||!r.enabled?[]:(r.messages||[]).filter(s=>s.enabled!==!1)}getDefaultPresetId(){this._migrateLegacyData();let e=D.get(vo,null);return e==="undefined"||e==="null"||e===""?(D.remove(vo),null):e}setDefaultPresetId(e){return e&&!this.presetExists(e)?!1:(D.set(vo,e),K.emit(B.BYPASS_PRESET_ACTIVATED,{presetId:e}),this._log(`\u9ED8\u8BA4\u9884\u8BBE\u5DF2\u8BBE\u7F6E: ${e}`),!0)}getDefaultPreset(){let e=this.getDefaultPresetId();return e?this.getPreset(e):null}exportPresets(e=null){if(e){let s=this.getPreset(e);if(!s)throw new Error(`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`);return JSON.stringify(s,null,2)}let r=this.getAllPresets();return JSON.stringify({version:"1.0.0",exportedAt:new Date().toISOString(),presets:Object.values(r)},null,2)}importPresets(e,r={}){let{overwrite:s=!1,name:o=""}=r,n;try{n=JSON.parse(e)}catch{return{success:!1,message:"JSON\u89E3\u6790\u5931\u8D25",imported:0}}let a=D.get(Sr,{}),l=Array.isArray(n)&&n.every(Tw)?[{id:this._generatePresetId(o||"\u5BFC\u5165\u586B\u8868\u6307\u4EE4\u9884\u8BBE",a),name:o||"\u5BFC\u5165\u586B\u8868\u6307\u4EE4\u9884\u8BBE",description:"\u7531\u5916\u90E8\u586B\u8868\u63D0\u793A\u8BCD\u7EC4\u5BFC\u5165\u3002",enabled:!0,messages:n}]:Array.isArray(n)?n:n.presets?n.presets:[n];if(l.length===0)return{success:!1,message:"\u6CA1\u6709\u627E\u5230\u6709\u6548\u7684\u9884\u8BBE\u6570\u636E",imported:0};let c=0;for(let d of l){let u=this._normalizePreset(d?.id,d,a);u&&(_r[u.id]&&!s||!s&&a[u.id]||(a[u.id]={...u,updatedAt:Date.now()},c++))}return c>0&&(D.set(Sr,a),this._cache=null),{success:!0,message:`\u6210\u529F\u5BFC\u5165 ${c} \u4E2A\u9884\u8BBE`,imported:c}}getToolBypassPreset(e){if(!e?.bypass?.enabled)return null;let r=e?.bypass?.presetId;return r?this.getPreset(r):this.getDefaultPreset()}buildBypassMessages(e){let r=this.getToolBypassPreset(e);return r?this.getEnabledMessages(r.id):[]}_savePreset(e,r){let s=D.get(Sr,{});s[e]=r,D.set(Sr,s),this._cache=null}_migrateLegacyData(){if(this._migrated)return;let e=D.get(Sr,{}),r={},s=!1,o=Array.isArray(e)?e.map((n,a)=>[n?.id||n?.name||`legacy_${a}`,n]):Object.entries(e||{});for(let[n,a]of o){let i=this._normalizePreset(n,a,r);if(!i){s=!0;continue}r[i.id]=i,(!e?.[i.id]||e?.[i.id]?.id!==i.id)&&(s=!0)}s&&D.set(Sr,r),this._migrateDefaultPreset(r),this._cache=null,this._migrated=!0}_normalizePreset(e,r,s={}){if(!r||typeof r!="object")return null;let o=typeof r.name=="string"?r.name.trim():"",n=typeof r.id=="string"?r.id.trim():"",a=typeof e=="string"?e.trim():"";if(!o&&a&&a!=="undefined"&&a!=="null"&&(o=a),this._isLegacySamplePreset(o,n)||(!n&&a&&a!=="undefined"&&a!=="null"&&(n=a),!n&&o&&o!=="undefined"&&o!=="null"&&(n=this._generatePresetId(o,s)),!o||!n||n==="undefined"||o==="undefined"))return null;let l=Array.isArray(r.messages)?r.messages.filter(c=>c&&typeof c=="object").map((c,d)=>_w(c,d,n)):[];return{...r,id:n,name:o,description:typeof r.description=="string"?r.description:"",enabled:r.enabled!==!1,messages:l,createdAt:r.createdAt||Date.now(),updatedAt:r.updatedAt||Date.now()}}_migrateDefaultPreset(e){let r=D.get(vo,null),s=D.get(tc,null),o=r??s;(o==="undefined"||o==="null"||o==="")&&(o=null),o&&!e[o]&&(o=Object.values(e).find(a=>a.name===o)?.id||null),o?D.set(vo,o):D.remove(vo),D.has(tc)&&D.remove(tc)}_isLegacySamplePreset(e,r=""){return e?r==="standard"||r==="enhanced"||r==="jailbreak"||vw.has(e)?!0:/^增强破限（副本）(?:\s*\(\d+\))?$/.test(e):!1}_generatePresetId(e,r={}){let s=String(e).trim().toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g,"_").replace(/^_+|_+$/g,"")||`bypass_${Date.now()}`,o=s,n=1;for(;r[o];)o=`${s}_${n++}`;return o}_log(...e){xw.debug(e[0],e.length>1?e.slice(1):void 0)}},ue=new Ia,Ew=()=>ue.getAllPresets(),yn=()=>ue.getPresetList(),Aw=t=>ue.getPreset(t),kw=t=>ue.createPreset(t),Cw=(t,e)=>ue.updatePreset(t,e),Iw=t=>ue.deletePreset(t),Rw=(t,e,r)=>ue.duplicatePreset(t,e,r),Mw=()=>ue.getDefaultPresetId(),Pw=t=>ue.setDefaultPresetId(t),Nw=t=>ue.getEnabledMessages(t),$w=(t,e)=>ue.addMessage(t,e),Dw=(t,e,r)=>ue.updateMessage(t,e,r),Lw=(t,e)=>ue.deleteMessage(t,e),Ow=t=>ue.exportPresets(t),Bw=(t,e)=>ue.importPresets(t,e),zw=t=>ue.buildBypassMessages(t),Kw=ue});var Xy={};se(Xy,{DEFAULT_SETTINGS:()=>fn,SettingsService:()=>Ma,default:()=>Uw,settingsService:()=>zt});var fn,Ra,Ma,zt,Uw,gn=N(()=>{Ke();Je();fn={executor:{maxConcurrent:3,maxRetries:2,retryDelayMs:5e3,requestTimeoutMs:9e4,queueStrategy:"fifo"},automation:{settleMs:1200,cooldownMs:5e3,maxConcurrentSlots:1},debug:{enableDebugLog:!1,saveExecutionHistory:!0,showRuntimeBadge:!0},ui:{compactMode:!1,animationEnabled:!0,theme:"dark-blue",startupScreenDismissed:!1}},Ra="settings_v2",Ma=class{constructor(){this._cache=null}getSettings(){if(this._cache)return this._cache;let e=D.get(Ra,{}),r=this._migrateLegacy(e);return this._cache=this._mergeWithDefaults(r.settings),r.changed&&D.set(Ra,this._cache),this._cache}saveSettings(e){this._cache=this._mergeWithDefaults(e),D.set(Ra,this._cache),K.emit(B.SETTINGS_UPDATED,{settings:this._cache})}updateSettings(e){let r=this.getSettings(),s=this._deepMerge(r,e);this.saveSettings(s)}getExecutorSettings(){return this.getSettings().executor}updateExecutorSettings(e){this.updateSettings({executor:e})}getAutomationSettings(){return this.getSettings().automation}updateAutomationSettings(e){this.updateSettings({automation:e})}getDebugSettings(){return this.getSettings().debug}updateDebugSettings(e){this.updateSettings({debug:e})}getUiSettings(){return this.getSettings().ui}updateUiSettings(e){this.updateSettings({ui:e})}resetSettings(){this._cache=JSON.parse(JSON.stringify(fn)),D.set(Ra,this._cache),K.emit(B.SETTINGS_UPDATED,{settings:this._cache,reset:!0})}get(e,r=null){let s=this.getSettings(),o=e.split("."),n=s;for(let a of o)if(n&&typeof n=="object"&&a in n)n=n[a];else return r;return n}set(e,r){let s=JSON.parse(JSON.stringify(this.getSettings())),o=e.split("."),n=s;for(let a=0;a<o.length-1;a+=1){let i=o[a];i in n||(n[i]={}),n=n[i]}n[o[o.length-1]]=r,this.saveSettings(s)}_migrateLegacy(e){if(!e||typeof e!="object")return{settings:{},changed:!1};let r=!1,s=JSON.parse(JSON.stringify(e));return s.automation&&Object.prototype.hasOwnProperty.call(s.automation,"enabled")&&(delete s.automation.enabled,r=!0),{settings:s,changed:r}}_mergeWithDefaults(e){return this._deepMerge(JSON.parse(JSON.stringify(fn)),e)}_deepMerge(e,r){let s={...e};for(let o in r)r[o]&&typeof r[o]=="object"&&!Array.isArray(r[o])?s[o]=this._deepMerge(e[o]||{},r[o]):s[o]=r[o];return s}},zt=new Ma,Uw=zt});function Qy(t){if(!t)return"";let e=String(t).trim();return e=e.replace(/([a-z0-9])([A-Z])/g,"$1_$2"),e.toUpperCase()}function Pa(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window}function Xr(){try{return Pa()?.SillyTavern||null}catch{return null}}function Na(t){try{return(t||Xr())?.getContext?.()||null}catch{return null}}function rc(t,e){if(!t)return null;let r=typeof t?.on=="function"||typeof t?.addListener=="function",s=typeof t?.off=="function"||typeof t?.removeListener=="function";return!r||!s?null:{source:e,eventSource:t,capabilities:{on:typeof t?.on=="function",off:typeof t?.off=="function",addListener:typeof t?.addListener=="function",removeListener:typeof t?.removeListener=="function"}}}function jw(){let t=Pa(),e=Xr(),r=Na(e),o=[rc(e?.eventSource,"SillyTavern.eventSource"),rc(r?.eventSource,"SillyTavern.getContext().eventSource"),rc(t?.eventSource,"topWindow.eventSource")].filter(Boolean)[0]||null,n=e?.eventTypes||e?.event_types||r?.eventTypes||r?.event_types||t?.eventTypes||t?.event_types||{};return{topWindow:t,api:e,context:r,eventSource:o?.eventSource||null,eventTypes:n,source:o?.source||"unavailable",capabilities:o?.capabilities||null,hasBridge:!!o?.eventSource}}var Ct,Ye,Fw,Zy,sc,Kt,oc=N(()=>{H();Ct=R.createScope("HostEvents"),Ye=Object.freeze({MESSAGE_SENT:"MESSAGE_SENT",MESSAGE_RECEIVED:"MESSAGE_RECEIVED",MESSAGE_UPDATED:"MESSAGE_UPDATED",MESSAGE_DELETED:"MESSAGE_DELETED",MESSAGE_EDITED:"MESSAGE_EDITED",USER_MESSAGE_RENDERED:"USER_MESSAGE_RENDERED",IMPERSONATE_READY:"IMPERSONATE_READY",GENERATION_STOPPED:"GENERATION_STOPPED",GENERATION_AFTER_COMMANDS:"GENERATION_AFTER_COMMANDS",CHAT_CHANGED:"CHAT_CHANGED"});Fw=1500,Zy=20,sc=class{constructor(){this._bridge=null,this._pending=[],this._initAttempts=0,this._retryTimer=null,this._readyResolvers=[],this._initialized=!1,this._disposed=!1}subscribe(e,r,s={}){if(!e||typeof r!="function")return Ct.warn("subscribe \u65E0\u6548\u53C2\u6570",{eventKey:e,handlerType:typeof r}),()=>{};if(this._disposed)return Ct.warn("subscribe \u5728 dispose \u4E4B\u540E\u88AB\u8C03\u7528",{eventKey:e}),()=>{};let o={key:Qy(e),rawKey:e,handler:r,options:s,attached:!1,_hostName:"",_hostUnsubscribe:null,_disposed:!1};return this._pending.push(o),this._ensureInitialized(),this._bridge?.hasBridge&&this._attachEntry(o),()=>{if(o._disposed)return;o._disposed=!0;let n=this._pending.indexOf(o);if(n>=0&&this._pending.splice(n,1),o.attached&&typeof o._hostUnsubscribe=="function")try{o._hostUnsubscribe()}catch(a){Ct.warn("\u53D6\u6D88\u5BBF\u4E3B\u8BA2\u9605\u5931\u8D25",{event:o._hostName,error:a})}}}async emit(e,...r){if(this._ensureInitialized(),!this._bridge?.hasBridge)return Ct.debug("emit \u65F6\u5BBF\u4E3B\u6865\u672A\u5C31\u7EEA\uFF0C\u8DF3\u8FC7",{eventKey:e}),!1;let s=this._resolveHostEventName(e);if(!s)return!1;let{eventSource:o}=this._bridge;try{if(typeof o?.emit=="function")return await o.emit(s,...r),!0;if(typeof o?.dispatch=="function")return await o.dispatch(s,...r),!0}catch(n){Ct.warn("emit \u629B\u9519",{eventKey:e,hostName:s,error:n})}return!1}ready({timeoutMs:e=1e4}={}){return this._ensureInitialized(),this._bridge?.hasBridge?Promise.resolve(!0):new Promise(r=>{let s=!1,o=a=>{s||(s=!0,r(a))},n=e>0?setTimeout(()=>o(!1),e):null;this._readyResolvers.push(a=>{n&&clearTimeout(n),o(a)})})}describe(){this._ensureInitialized();let e=this._bridge?.eventTypes||{};return{initialized:this._initialized,source:this._bridge?.source||"unavailable",hasBridge:!!this._bridge?.hasBridge,initAttempts:this._initAttempts,retryScheduled:!!this._retryTimer,pendingCount:this._pending.filter(r=>!r.attached).length,attachedCount:this._pending.filter(r=>r.attached).length,availableEvents:Object.keys(e).slice(0,100)}}reinit(){if(this._disposed)return!1;for(let e of this._pending){if(e.attached&&typeof e._hostUnsubscribe=="function")try{e._hostUnsubscribe()}catch{}e.attached=!1,e._hostUnsubscribe=null,e._hostName=""}return this._bridge=null,this._initialized=!1,this._initAttempts=0,this._retryTimer&&(clearTimeout(this._retryTimer),this._retryTimer=null),this._ensureInitialized()}dispose(){this._retryTimer&&(clearTimeout(this._retryTimer),this._retryTimer=null);for(let e of this._pending){if(e.attached&&typeof e._hostUnsubscribe=="function")try{e._hostUnsubscribe()}catch{}e._disposed=!0}this._pending=[],this._readyResolvers=[],this._bridge=null,this._initialized=!1,this._disposed=!0}_ensureInitialized(){if(this._disposed)return!1;if(this._initialized&&this._bridge?.hasBridge)return!0;this._initAttempts+=1;let e=jw();if(this._bridge=e,this._initialized=!0,!e.hasBridge)return Ct.debug(`\u5BBF\u4E3B\u6865\u672A\u5C31\u7EEA (attempt ${this._initAttempts})`,{source:e.source}),this._scheduleRetry(),!1;Ct.info("\u5BBF\u4E3B\u6865\u5DF2\u5C31\u7EEA",{source:e.source,eventTypesCount:Object.keys(e.eventTypes).length});for(let s of this._pending)!s.attached&&!s._disposed&&this._attachEntry(s);let r=this._readyResolvers.slice();this._readyResolvers=[];for(let s of r)try{s(!0)}catch{}return!0}_scheduleRetry(){if(!this._retryTimer){if(this._initAttempts>=Zy){Ct.warn(`\u5DF2\u8FBE\u6700\u5927\u91CD\u8BD5\u6B21\u6570 (${Zy})\uFF0C\u505C\u6B62\u91CD\u8BD5`);let e=this._readyResolvers.slice();this._readyResolvers=[];for(let r of e)try{r(!1)}catch{}return}this._retryTimer=setTimeout(()=>{this._retryTimer=null,this._initialized=!1,this._ensureInitialized()},Fw)}}_resolveHostEventName(e){let r=Qy(e),s=this._bridge?.eventTypes||{};if(s[r])return s[r];let o=r.toLowerCase();if(s[o])return s[o];let n=String(e).trim();return n&&n===n.toLowerCase()?n:o}_attachEntry(e){if(!this._bridge?.hasBridge||e.attached||e._disposed)return;let r=this._resolveHostEventName(e.rawKey);if(!r){Ct.warn("\u65E0\u6CD5\u89E3\u6790\u5BBF\u4E3B\u4E8B\u4EF6\u540D",{rawKey:e.rawKey});return}let{eventSource:s}=this._bridge,o=typeof s?.on=="function"?s.on.bind(s):typeof s?.addListener=="function"?s.addListener.bind(s):null,n=typeof s?.off=="function"?s.off.bind(s):typeof s?.removeListener=="function"?s.removeListener.bind(s):null;if(!o||!n){Ct.warn("\u5BBF\u4E3B eventSource \u7F3A\u5C11 on/off \u65B9\u6CD5");return}try{o(r,e.handler),e.attached=!0,e._hostName=r,e._hostUnsubscribe=()=>{try{n(r,e.handler)}catch(a){Ct.warn("\u53D6\u6D88\u5BBF\u4E3B\u8BA2\u9605\u5931\u8D25",{event:r,error:a})}},Ct.debug(`\u7ED1\u5B9A\u5BBF\u4E3B\u4E8B\u4EF6: "${r}" (key=${e.key})`)}catch(a){Ct.error(`\u7ED1\u5B9A\u5BBF\u4E3B\u4E8B\u4EF6\u5931\u8D25: "${r}"`,{error:a})}}},Kt=new sc});var tf={};se(tf,{ContextInjector:()=>La,DEFAULT_INJECTION_OPTIONS:()=>ef,WRITEBACK_METHODS:()=>Gt,WRITEBACK_RESULT_STATUS:()=>Da,contextInjector:()=>It,default:()=>Yw});function nc(t){return typeof t=="number"&&Number.isFinite(t)?String(t):typeof t=="string"&&t.trim()?t.trim():""}function Rs(t,e){let r=String(e||"").trim();return r?Array.isArray(t)?(t.includes(r)||t.push(r),t):[r]:t}function $a(t={}){if(t?.signal?.aborted)return"\u5DE5\u5177\u7ED3\u679C\u5DF2\u53D6\u6D88\uFF0C\u8DF3\u8FC7\u5199\u56DE";if(typeof t?.shouldAbortWriteback=="function")try{if(t.shouldAbortWriteback()===!0)return"\u5DE5\u5177\u7ED3\u679C\u5DF2\u8FC7\u671F\uFF0C\u8DF3\u8FC7\u5199\u56DE"}catch{return"\u5DE5\u5177\u7ED3\u679C\u5DF2\u8FC7\u671F\uFF0C\u8DF3\u8FC7\u5199\u56DE"}return""}var lt,wt,So,ef,Da,Gt,Ww,Hw,La,It,Yw,Ms=N(()=>{Je();H();oc();lt=R.createScope("ContextInjector"),wt="YouYouToolkit_toolOutputs",So="YouYouToolkit_injectedContext",ef={overwrite:!0,enabled:!0};Da={SUCCESS:"success",FAILED:"failed"},Gt={NONE:"none",LOCAL_ONLY:"local_only",SET_CHAT_MESSAGES:"setChatMessages",SET_CHAT_MESSAGE:"setChatMessage"},Ww=60,Hw=3;La=class{constructor(){this.debugMode=!1}async inject(e,r,s={}){return(await this.injectDetailed(e,r,s)).success}async injectDetailed(e,r,s={}){let o={...ef,...s},n=this._createWritebackResult(e,o);if(!e||r===void 0||r===null)return lt.error("\u6CE8\u5165\u5931\u8D25: \u53C2\u6570\u65E0\u6548"),n.error="\u6CE8\u5165\u5931\u8D25: \u53C2\u6570\u65E0\u6548",n;if(!nc(o.sourceMessageId))return lt.error("\u6CE8\u5165\u5931\u8D25: \u7F3A\u5C11 sourceMessageId"),n.error="\u6CE8\u5165\u5931\u8D25: \u7F3A\u5C11 sourceMessageId",n;if(o?.signal?.aborted)return n.error="\u5DE5\u5177\u7ED3\u679C\u5DF2\u53D6\u6D88\uFF0C\u8DF3\u8FC7\u5199\u56DE",n;if(typeof o?.shouldAbortWriteback=="function")try{if(o.shouldAbortWriteback()===!0)return n.error="\u5DE5\u5177\u7ED3\u679C\u5DF2\u8FC7\u671F\uFF0C\u8DF3\u8FC7\u5199\u56DE",n}catch{return n.error="\u5DE5\u5177\u7ED3\u679C\u5DF2\u8FC7\u671F\uFF0C\u8DF3\u8FC7\u5199\u56DE",n}let a=n.chatId,i={toolId:e,content:String(r),updatedAt:Date.now(),sourceMessageId:o.sourceMessageId||null,sourceSwipeId:o.sourceSwipeId||o.effectiveSwipeId||null,options:o};K.emit(B.TOOL_CONTEXT_INJECTED,{toolId:e,chatId:a,content:i.content,sourceMessageId:i.sourceMessageId,sourceSwipeId:i.sourceSwipeId,effectiveSwipeId:i.sourceSwipeId,slotBindingKey:o.slotBindingKey||"",slotRevisionKey:o.slotRevisionKey||"",slotTransactionId:o.slotTransactionId||"",traceId:o.traceId||"",sessionKey:o.sessionKey||"",options:o});let l=await this._insertToolOutputToBoundAssistantSlot(e,i,o,n);return l.success&&lt.info(`\u6CE8\u5165\u6210\u529F: ${e} -> ${a}`,{inserted:l}),l}getAggregatedContext(e){return this.getLatestMessageInjectedContext()}getLatestMessageInjectedContext(e=null){try{let{chat:r}=this._getChatRuntime(),s=this._findAssistantMessageIndex(r,e);if(s<0)return"";let o=r[s]||{},n=o[So];if(typeof n=="string"&&n.trim())return n.trim();let a=o[wt];return a&&typeof a=="object"?this._buildMessageInjectedContext(a).trim():""}catch(r){return lt.warn("\u8BFB\u53D6\u6700\u65B0 AI \u6D88\u606F injectedContext \u5931\u8D25",{error:r}),""}}_getLatestAssistantMessageOutputs(){try{let{chat:e}=this._getChatRuntime(),r=this._findAssistantMessageIndex(e,null);if(r<0)return{};let o=(e[r]||{})[wt];return o&&typeof o=="object"?o:{}}catch(e){return lt.warn("\u8BFB\u53D6\u6700\u65B0 AI \u6D88\u606F\u4E0A\u4E0B\u6587\u5931\u8D25",{error:e}),{}}}getToolContext(e,r){if(!r)return null;try{let{chat:s}=this._getChatRuntime(),o=this._findAssistantMessageIndex(s,null);return o<0?null:s[o]?.[wt]?.[r]||null}catch{return null}}getAllToolContexts(e){return this._getLatestAssistantMessageOutputs()}async clearToolContext(e,r){if(!r)return!1;try{let{api:s,context:o,chat:n}=this._getChatRuntime(),a=this._findAssistantMessageIndex(n,null);if(a<0)return!1;let i=n[a],l=i?.[wt];if(!l||!l[r])return!1;delete l[r],i[wt]=l,i[So]=this._buildMessageInjectedContext(l);let c=o?.saveChat||s?.saveChat||null;return typeof c=="function"&&await c.call(o||s),K.emit(B.TOOL_CONTEXT_CLEARED,{chatId:e||this._getCurrentChatId(),toolId:r}),!0}catch(s){return lt.warn("\u6E05\u9664\u5DE5\u5177\u4E0A\u4E0B\u6587\u5931\u8D25",{error:s}),!1}}async clearAllContext(e){try{let{api:r,context:s,chat:o}=this._getChatRuntime(),n=this._findAssistantMessageIndex(o,null);if(n<0)return!1;let a=o[n];delete a[wt],delete a[So];let i=s?.saveChat||r?.saveChat||null;return typeof i=="function"&&await i.call(s||r),K.emit(B.TOOL_CONTEXT_CLEARED,{chatId:e||this._getCurrentChatId(),allTools:!0}),!0}catch(r){return lt.warn("\u6E05\u9664\u6240\u6709\u5DE5\u5177\u4E0A\u4E0B\u6587\u5931\u8D25",{error:r}),!1}}clearAllChatsContexts(){lt.info("\u6E05\u9664\u6240\u6709\u4E0A\u4E0B\u6587")}hasToolContext(e,r){return!!this.getToolContext(e,r)}getContextSummary(e){let r=this._getLatestAssistantMessageOutputs(),s=Object.entries(r).map(([o,n])=>({toolId:o,updatedAt:n.updatedAt,contentLength:n.content?.length||0}));return{chatId:e||this._getCurrentChatId(),tools:s,totalCount:s.length}}exportContext(e){return{chatId:e||this._getCurrentChatId(),contexts:this._getLatestAssistantMessageOutputs(),exportedAt:Date.now()}}importContext(e,r={}){return!1}_getChatRuntime(){try{let e=typeof window.parent<"u"&&window.parent!==window?window.parent:window,r=e.SillyTavern||null,s=r?.getContext?.()||null,o=Array.isArray(s?.chat)?s.chat:[],n=Array.isArray(r?.chat)?r.chat:[],a=o.length?o:n;return{topWindow:e,api:r,context:s,chat:a,contextChat:o,apiChat:n}}catch{return{topWindow:null,api:null,context:null,chat:[],contextChat:[],apiChat:[]}}}_createWritebackResult(e,r={}){let s=Gt.SET_CHAT_MESSAGES;return{success:!1,toolId:e,chatId:this._getCurrentChatId(),traceId:r.traceId||"",sessionKey:r.sessionKey||"",sourceMessageId:r.sourceMessageId||null,sourceSwipeId:r.sourceSwipeId||r.effectiveSwipeId||null,effectiveSwipeId:r.effectiveSwipeId||r.sourceSwipeId||null,slotBindingKey:r.slotBindingKey||"",slotRevisionKey:r.slotRevisionKey||"",slotTransactionId:r.slotTransactionId||"",messageIndex:-1,textField:"",blockIdentity:null,hostUpdateMethod:Gt.NONE,commit:{preferredMethod:s,attemptedMethods:[],appliedMethod:Gt.NONE,fallbackUsed:!1,contentCommitted:!1,hostCommitApplied:!1},refresh:{requestMethods:[],requested:!1,confirmChecks:0,confirmed:!1,confirmedBy:"",eventSource:"",eventName:""},contentCommitted:!1,hostCommitApplied:!1,refreshRequested:!1,refreshConfirmed:!1,writebackStatus:Da.FAILED,replacedExistingBlock:!1,insertedNewBlock:!1,conflictDetected:!1,conflictReason:"",preservedOtherToolBlocks:!0,error:"",errors:[],steps:{foundTargetMessage:!1,contentCommitted:!1,localTextApplied:!1,runtimeSynced:!1,hostSetChatMessages:!1,hostSetChatMessage:!1,refreshForceSetChatMessage:!1,saveChatDebounced:!1,saveChat:!1,refreshRequested:!1,notifiedMessageUpdated:!1,verifiedAfterWrite:!1,refreshConfirmed:!1},verification:{textIncludesContent:!1,mirrorStored:!1,refreshConfirmed:!1}}}async _wait(e){await new Promise(r=>setTimeout(r,e))}_collectWritebackVerification(e,r,s,o,n,a=null){let i=e?.contextChat?.[s]||e?.apiChat?.[s]||r?.[s]||a||null,l=this._getWritableMessageField(i).text||"",c=i?.[wt]?.[o],d=n?l.includes(n):!0,u=!!(c&&String(c.content||"").trim()===n);return{latestMessage:i,latestText:l,textIncludesContent:d,mirrorStored:u}}async _confirmRefresh(e,r,s,o,n,a=null){let i=1,l=this._collectWritebackVerification(e,r,s,o,n,a);for(let c=0;c<Hw;c+=1){if(l.textIncludesContent&&l.mirrorStored)return{...l,refreshConfirmed:!0,confirmChecks:i,confirmedBy:"text_and_mirror_present"};await this._wait(Ww),i+=1,l=this._collectWritebackVerification(e,r,s,o,n,a)}return{...l,refreshConfirmed:l.textIncludesContent&&l.mirrorStored,confirmChecks:i,confirmedBy:l.textIncludesContent&&l.mirrorStored?"text_and_mirror_present":""}}async _requestAssistantMessageRefresh(e,r,s,o={},n=null){let a=n||this._createWritebackResult("",o),{api:i,context:l}=e||{},c=e?.topWindow||(typeof window.parent<"u"&&window.parent!==window?window.parent:window),d=c?.TavernHelper?.setChatMessages||l?.setChatMessages||i?.setChatMessages||c?.setChatMessages||null;a.commit.preferredMethod=typeof d=="function"?Gt.SET_CHAT_MESSAGES:Gt.LOCAL_ONLY;let u=!1,y=$a(o);if(y)return a.error=y,a;if(typeof d=="function"){Rs(a.commit.attemptedMethods,Gt.SET_CHAT_MESSAGES);try{let p=$a(o);if(p)return a.error=p,a;let f=nc(o.sourceMessageId)||r;await d([{message_id:f,message:s}],{refresh:"affected"}),a.steps.hostSetChatMessages=!0,a.hostUpdateMethod=Gt.SET_CHAT_MESSAGES,a.hostCommitApplied=!0,a.commit.appliedMethod=Gt.SET_CHAT_MESSAGES,a.commit.hostCommitApplied=!0,u=!0}catch(p){lt.error("setChatMessages \u5199\u56DE\u5931\u8D25\uFF0C\u56DE\u9000\u672C\u5730\u540C\u6B65",{error:p}),a.errors.push(`setChatMessages: ${p?.message||String(p)}`)}}return u&&(a.refreshRequested=!0,Rs(a.refresh.requestMethods,a.hostUpdateMethod)),u||(Rs(a.commit.attemptedMethods,Gt.LOCAL_ONLY),a.commit.appliedMethod=Gt.LOCAL_ONLY,a.commit.fallbackUsed=!0,a.hostUpdateMethod=a.commit.appliedMethod),a}_inferBlockType(e){let r=String(e||"").trim();if(!r)return"empty";let s=r.match(/^<([a-zA-Z0-9_-]+)(?:\s[^>]*)?>[\s\S]*<\/\1>$/);return s?.[1]?s[1]:"plain_text"}_stripExactStoredBlock(e,r,s=""){let o=String(e||""),n=String(r||"").trim(),a=String(s||"").trim();return n?o.includes(n)?a?{text:o.replace(n,a).trimEnd(),removed:!0,replaced:!0}:{text:o.replace(n,"").trimEnd(),removed:!0,replaced:!1}:{text:o,removed:!1,replaced:!1}:{text:o,removed:!1,replaced:!1}}_syncMessageToRuntimeChats(e,r,s){let{contextChat:o,apiChat:n}=e||{},a=i=>{!Array.isArray(i)||r<0||r>=i.length||i[r]!==s&&(i[r]={...i[r]||{},...s})};a(o),a(n)}_notifyMessageUpdated(e,r,s={}){if(s.skipNotify===!0)return{emitted:!1,source:"skipped_by_caller",eventName:""};try{let o=Kt.describe(),n=e?.topWindow||Pa();return o.hasBridge?(Kt.emit(Ye.MESSAGE_UPDATED,r),typeof n?.requestAnimationFrame=="function"?n.requestAnimationFrame(()=>{Kt.emit(Ye.MESSAGE_UPDATED,r)}):typeof n?.setTimeout=="function"&&n.setTimeout(()=>{Kt.emit(Ye.MESSAGE_UPDATED,r)},30),{emitted:!0,source:o.source||"unavailable",eventName:Ye.MESSAGE_UPDATED}):{emitted:!1,source:o.source||"unavailable",eventName:Ye.MESSAGE_UPDATED}}catch(o){return lt.warn("\u89E6\u53D1\u6D88\u606F\u5237\u65B0\u4E8B\u4EF6\u5931\u8D25",{error:o}),{emitted:!1,source:"error",eventName:"",error:o?.message||String(o)}}}_isAssistantMessage(e){if(!e||e.is_user||e.is_system)return!1;let r=String(e.role||"").toLowerCase();return r==="assistant"||r==="ai"||!r}_findAssistantMessageIndex(e,r){let s=Array.isArray(e)?e:[];if(!s.length)return-1;let o=r!=null&&r!=="",n=(a,i)=>{if(!this._isAssistantMessage(a)||r==null||r==="")return!1;let l=String(r).trim();return l?[a.message_id,a.id,a.messageId,a.mes_id,i].map(d=>d==null?"":String(d).trim()).includes(l):!1};for(let a=s.length-1;a>=0;a-=1)if(n(s[a],a))return a;if(o)return-1;for(let a=s.length-1;a>=0;a-=1)if(this._isAssistantMessage(s[a]))return a;return-1}_buildMessageInjectedContext(e){let s=Object.entries(e&&typeof e=="object"?e:{}).filter(([,n])=>n?.blockType!=="full_message").sort(([,n],[,a])=>(n?.updatedAt||0)-(a?.updatedAt||0));if(!s.length)return"";let o=["[\u5DE5\u5177\u4E0A\u4E0B\u6587\u6CE8\u5165]",""];for(let[n,a]of s)o.push(`[${n}]`),o.push(a?.content||""),o.push("");return o.join(`
`)}_getWritableMessageField(e){let r=["mes","message","content","text"];for(let s of r)if(typeof e?.[s]=="string")return{key:s,text:e[s]};return{key:"mes",text:""}}_applyMessageText(e,r,s={}){let o=e&&typeof e=="object"?e:{},n=["mes","message","content","text"],a=!1;if(n.forEach(i=>{typeof o[i]=="string"&&(o[i]=r,a=!0)}),a||(o.mes=r,o.message=r),Array.isArray(o.swipes)){let i=Number.parseInt(nc(s?.sourceSwipeId||s?.effectiveSwipeId),10),l=Number.isInteger(i)?i:Number.isInteger(o.swipe_id)?o.swipe_id:Number.isInteger(o.swipeId)?o.swipeId:0;l>=0&&l<o.swipes.length&&(o.swipes[l]=r,o.swipe_id=l,o.swipeId=l)}return o}_stripExistingToolOutput(e,r=[]){let s=String(e||"");return(Array.isArray(r)?r:[]).forEach(n=>{let a=String(n||"").trim();if(!a)return;if(a.startsWith("regex:")){try{let d=new RegExp(a.slice(6).trim(),"gis");s=s.replace(d,"")}catch(d){lt.warn("\u79FB\u9664\u65E7\u5DE5\u5177\u8F93\u51FA\u65F6\u6B63\u5219\u65E0\u6548",{value:a,error:d})}return}let i=a.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),l=new RegExp(`<${i}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${i}>\\s*`,"gi"),c=new RegExp(`\\{${i}\\|[\\s\\S]*?\\}\\s*`,"gi");s=s.replace(l,""),s=s.replace(c,"")}),s.trimEnd()}_stripPreviousStoredToolContent(e,r){let s=String(e||""),o=String(r||"").trim();return o?s.replace(o,"").trimEnd():s.trimEnd()}async _insertToolOutputToBoundAssistantSlot(e,r,s={},o=null){let n=o||this._createWritebackResult(e,s);try{let a=this._getChatRuntime(),{context:i,chat:l}=a;if(!Array.isArray(l)||!l.length)return lt.error("\u672A\u627E\u5230\u804A\u5929\u6D88\u606F\uFF0C\u65E0\u6CD5\u63D2\u5165\u5DE5\u5177\u8F93\u51FA"),n.error="\u672A\u627E\u5230\u804A\u5929\u6D88\u606F\uFF0C\u65E0\u6CD5\u63D2\u5165\u5DE5\u5177\u8F93\u51FA",n;let c=this._findAssistantMessageIndex(l,s.sourceMessageId);if(c<0)return lt.error("\u672A\u627E\u5230\u53EF\u5199\u5165\u7684\u6700\u65B0 AI \u56DE\u590D\u6D88\u606F"),n.error="\u672A\u627E\u5230\u53EF\u5199\u5165\u7684\u6700\u65B0 AI \u56DE\u590D\u6D88\u606F",n;if(s?.signal?.aborted)return n.error="\u5DE5\u5177\u7ED3\u679C\u5DF2\u53D6\u6D88\uFF0C\u8DF3\u8FC7\u5199\u56DE",n;if(typeof s?.shouldAbortWriteback=="function")try{if(s.shouldAbortWriteback()===!0)return n.error="\u5DE5\u5177\u7ED3\u679C\u5DF2\u8FC7\u671F\uFF0C\u8DF3\u8FC7\u5199\u56DE",n}catch{return n.error="\u5DE5\u5177\u7ED3\u679C\u5DF2\u8FC7\u671F\uFF0C\u8DF3\u8FC7\u5199\u56DE",n}n.messageIndex=c,n.steps.foundTargetMessage=!0;let d=l[c],{key:u,text:y}=this._getWritableMessageField(d);n.textField=u;let p=d[wt]&&typeof d[wt]=="object"?d[wt]:{},f=p?.[e]||{},g=f?.content||"",h=f?.blockText||g||"",x=Object.entries(p).filter(([Ve])=>Ve!==e).map(([,Ve])=>Ve||{}),T=String(r.content||"").trim(),v=s.replaceFullMessage===!0,L=v?"full_message":this._inferBlockType(T),C={toolId:e,messageId:s.sourceMessageId||d?.message_id||d?.messageId||c,blockType:L,insertedAt:r.updatedAt,replaceable:s.overwrite!==!1};n.blockIdentity=C;let _=s.overwrite===!1||v?{text:String(y||""),removed:!1,replaced:!1}:this._stripExactStoredBlock(y,h,T),k=_.text,W="";!v&&s.overwrite!==!1&&h&&!_.removed&&(W="previous_block_not_found");let q=s.overwrite===!1||_.replaced||v?k:this._stripExistingToolOutput(k,s.extractionSelectors),M=q!==k;k=q;let S=s.overwrite===!1||_.replaced||v?k:this._stripPreviousStoredToolContent(k,g),U=S!==k;k=S,n.replacedExistingBlock=v||_.removed||M||U;let j=s.overwrite===!1?String(y||""):k,Q=v?T:_.replaced?k.trim():[j.trimEnd(),T].filter(Boolean).join(`

`).trim();n.insertedNewBlock=!!T;let Ae=x.every(Ve=>{if(Ve?.blockType==="full_message")return!0;let ur=String(Ve?.blockText||Ve?.content||"").trim();return ur?Q.includes(ur):!0});n.preservedOtherToolBlocks=Ae,Ae?W&&(n.conflictDetected=!0,n.conflictReason=W):(n.conflictDetected=!0,n.conflictReason="other_tool_block_removed");let ce={...p,[e]:{toolId:e,content:T,blockText:T,blockType:L,blockIdentity:C,updatedAt:r.updatedAt,sourceMessageId:r.sourceMessageId||null}},de=$a(s);if(de)return n.error=de,n;d[u]=Q,this._applyMessageText(d,Q,s),d[wt]=ce,d[So]=this._buildMessageInjectedContext(ce),n.contentCommitted=!0,n.commit.contentCommitted=!0,n.steps.contentCommitted=!0,n.steps.localTextApplied=!0,this._syncMessageToRuntimeChats(a,c,d),n.steps.runtimeSynced=!0;let st=$a(s);if(st)return n.error=st,n;await this._requestAssistantMessageRefresh(a,c,Q,s,n);let dr=i?.saveChat||a?.api?.saveChat||null,Y=i?.saveChatDebounced||a?.api?.saveChatDebounced||null;typeof Y=="function"&&(Y.call(i||api),n.steps.saveChatDebounced=!0,n.refreshRequested=!0,Rs(n.refresh.requestMethods,"saveChatDebounced")),typeof dr=="function"&&(await dr.call(i||api),n.steps.saveChat=!0,n.refreshRequested=!0,Rs(n.refresh.requestMethods,"saveChat"));let pe=this._notifyMessageUpdated(a,c,s);n.steps.notifiedMessageUpdated=pe?.emitted===!0,n.refresh.eventSource=pe?.source||"",n.refresh.eventName=pe?.eventName||"",pe?.error&&n.errors.push(`MESSAGE_UPDATED: ${pe.error}`);let be=String(r.content||"").trim();(n.steps.hostSetChatMessages||n.steps.hostSetChatMessage)&&(n.refreshRequested=!0,Rs(n.refresh.requestMethods,n.hostUpdateMethod)),n.steps.notifiedMessageUpdated&&(n.refreshRequested=!0,Rs(n.refresh.requestMethods,`MESSAGE_UPDATED:${n.refresh.eventName||"MESSAGE_UPDATED"}`)),n.steps.refreshRequested=n.refreshRequested,n.refresh.requested=n.refreshRequested;let Nt=await this._confirmRefresh(a,l,c,e,be,d);return n.verification.textIncludesContent=Nt.textIncludesContent,n.verification.mirrorStored=Nt.mirrorStored,n.verification.refreshConfirmed=Nt.refreshConfirmed,n.steps.verifiedAfterWrite=n.verification.textIncludesContent&&n.verification.mirrorStored,n.refreshConfirmed=n.verification.refreshConfirmed&&n.refreshRequested,n.refresh.confirmChecks=Number(Nt.confirmChecks)||0,n.refresh.confirmedBy=Nt.confirmedBy||"",n.refresh.confirmed=n.refreshConfirmed,n.steps.refreshConfirmed=n.refreshConfirmed,n.success=n.steps.localTextApplied&&n.steps.runtimeSynced&&n.steps.verifiedAfterWrite&&n.refreshConfirmed,n.writebackStatus=n.success?Da.SUCCESS:Da.FAILED,!n.success&&!n.error&&(n.error=n.refreshRequested?"\u5DE5\u5177\u7ED3\u679C\u5DF2\u63D0\u4EA4\uFF0C\u4F46\u5BBF\u4E3B\u5237\u65B0\u786E\u8BA4\u672A\u901A\u8FC7":"\u5DE5\u5177\u7ED3\u679C\u5DF2\u5C1D\u8BD5\u5199\u56DE\uFF0C\u4F46\u6700\u7EC8\u6821\u9A8C\u672A\u901A\u8FC7"),n.conflictDetected&&!n.error&&(n.error=`\u5DE5\u5177\u7ED3\u679C\u5DF2\u5199\u56DE\uFF0C\u4F46\u68C0\u6D4B\u5230\u5757\u51B2\u7A81\uFF1A${n.conflictReason}`),lt.info(`\u5DF2\u5C06\u5DE5\u5177\u8F93\u51FA\u5199\u5165\u7ED1\u5B9A assistant \u69FD\u4F4D: ${e} -> #${c}`),n}catch(a){return lt.error("\u63D2\u5165\u6700\u65B0 AI \u56DE\u590D\u539F\u6587\u5931\u8D25",{error:a}),n.error=a?.message||String(a),n.errors.push(n.error),n}}getAssistantMessageSnapshot(e=null){try{let r=this._getChatRuntime(),{chat:s}=r,o=this._findAssistantMessageIndex(s,e);if(o<0)return null;let n=s[o]||null,a=this._getWritableMessageField(n).text||"",i=n?.[wt]&&typeof n[wt]=="object"?n[wt]:{},l=Object.values(i).reduce((c,d)=>{let u=String(d?.blockText||d?.content||"").trim();return!u||!c.includes(u)?c:c.replace(u,"").trimEnd()},String(a||"")).trim();return{messageIndex:o,message:n,messageText:a,baseText:l,toolOutputs:i,injectedContext:typeof n?.[So]=="string"?n[So]:this._buildMessageInjectedContext(i)}}catch(r){return lt.warn("\u8BFB\u53D6 assistant \u6D88\u606F\u5FEB\u7167\u5931\u8D25",{error:r}),null}}_getCurrentChatId(){try{let e=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(e.SillyTavern?.getContext){let r=e.SillyTavern.getContext(),o=[r?.chatId,r?.chat_id,r?.chat_filename,r?.chatMetadata?.chatId,r?.chatMetadata?.chat_id,r?.chatMetadata?.file_name,r?.chatMetadata?.name,e.SillyTavern?.chatId,e.SillyTavern?.chat_id,e.SillyTavern?.chat_filename].find(a=>typeof a=="string"&&a.trim());if(o)return o;let n=e.SillyTavern?.this_chid;if(n!=null)return`chat_char_${n}`}return"chat_default"}catch{return"chat_default"}}},It=new La,Yw=It});var sf={};se(sf,{BUILTIN_VARIABLES:()=>rf,VariableResolver:()=>Oa,default:()=>qw,variableResolver:()=>Ut});var Gw,rf,Oa,Ut,qw,Ba=N(()=>{Je();H();Gw=R.createScope("VariableResolver"),rf={lastUserMessage:{name:"lastUserMessage",description:"\u6700\u65B0\u7528\u6237\u6D88\u606F",category:"chat"},lastAiMessage:{name:"lastAiMessage",description:"\u6700\u65B0AI\u56DE\u590D",category:"chat"},chatHistory:{name:"chatHistory",description:"\u6700\u8FD1\u804A\u5929\u8BB0\u5F55",category:"chat"},characterCard:{name:"characterCard",description:"\u5F53\u524D\u89D2\u8272\u5361\u5185\u5BB9",category:"character"},toolName:{name:"toolName",description:"\u5DE5\u5177\u540D\u79F0",category:"tool"},toolId:{name:"toolId",description:"\u5DE5\u5177ID",category:"tool"},toolPromptMacro:{name:"toolPromptMacro",description:"\u5F53\u524D\u5DE5\u5177\u6A21\u677F\u63D0\u793A\u8BCD\u5B8F",category:"tool"},toolContentMacro:{name:"toolContentMacro",description:"\u5F53\u524D\u5DE5\u5177\u5904\u7406\u540E\u7684\u5185\u5BB9\u5B8F",category:"tool"},toolWorldbookContent:{name:"toolWorldbookContent",description:"\u5F53\u524D\u5DE5\u5177\u9009\u62E9\u7684\u4E16\u754C\u4E66\u6CE8\u5165\u5185\u5BB9",category:"tool"},injectedContext:{name:"injectedContext",description:"\u5DF2\u6CE8\u5165\u7684\u5DE5\u5177\u4E0A\u4E0B\u6587",category:"context"},extractedContent:{name:"extractedContent",description:"\u5DE5\u5177\u63D0\u53D6\u5185\u5BB9",category:"context"},recentMessagesText:{name:"recentMessagesText",description:"\u6700\u8FD1\u6D88\u606F\u6B63\u6587",category:"context"},rawRecentMessagesText:{name:"rawRecentMessagesText",description:"\u6700\u8FD1\u6D88\u606F\u539F\u6587",category:"context"},userMessage:{name:"userMessage",description:"\u5F53\u524D\u7528\u6237\u6D88\u606F",category:"chat"},previousToolOutput:{name:"previousToolOutput",description:"\u4E0A\u4E00\u6B21\u5DE5\u5177\u8F93\u51FA",category:"context"}},Oa=class{constructor(){this.customVariables=new Map,this.variableHandlers=new Map,this.debugMode=!1,this._registerDefaultHandlers()}resolveTemplate(e,r){if(typeof e!="string")return e;let s=e;return s=this._resolveBuiltinVariables(s,r),s=this._resolveCustomVariables(s,r),s=this._resolveRegexVariables(s,r),s}resolveObject(e,r){if(!e||typeof e!="object")return e;if(Array.isArray(e))return e.map(o=>this.resolveObject(o,r));let s={};for(let[o,n]of Object.entries(e))typeof n=="string"?s[o]=this.resolveTemplate(n,r):typeof n=="object"&&n!==null?s[o]=this.resolveObject(n,r):s[o]=n;return s}buildToolContext(e){return{lastUserMessage:e.lastUserMessage||"",lastAiMessage:e.lastAiMessage||"",chatHistory:e.chatHistory||[],characterCard:e.characterCard||null,characterName:e.characterCard?.name||"",toolName:e.toolName||"",toolId:e.toolId||"",toolPromptMacro:e.toolPromptMacro||"",toolContentMacro:e.toolContentMacro||"",toolWorldbookContent:e.toolWorldbookContent||"",injectedContext:e.injectedContext||"",extractedContent:e.extractedContent||"",recentMessagesText:e.recentMessagesText||"",rawRecentMessagesText:e.rawRecentMessagesText||"",userMessage:e.userMessage||"",previousToolOutput:e.previousToolOutput||"",regexResults:e.regexResults||{},raw:e,timestamp:Date.now()}}registerVariable(e,r){e&&(this.customVariables.set(e,r),this._log(`\u6CE8\u518C\u81EA\u5B9A\u4E49\u53D8\u91CF: ${e}`))}unregisterVariable(e){this.customVariables.delete(e),this._log(`\u6CE8\u9500\u81EA\u5B9A\u4E49\u53D8\u91CF: ${e}`)}registerHandler(e,r){!e||typeof r!="function"||(this.variableHandlers.set(e,r),this._log(`\u6CE8\u518C\u53D8\u91CF\u5904\u7406\u5668: ${e}`))}getAvailableVariables(){let e=[];for(let[,r]of Object.entries(rf))e.push({name:`{{${r.name}}}`,description:r.description,category:r.category,type:"builtin"});for(let[r,s]of this.customVariables)e.push({name:`{{${r}}}`,description:typeof s=="function"?"\u81EA\u5B9A\u4E49\u51FD\u6570\u53D8\u91CF":"\u81EA\u5B9A\u4E49\u9759\u6001\u53D8\u91CF",category:"custom",type:"custom"});return e}getVariableHelp(){let e=["\u53EF\u7528\u53D8\u91CF\uFF1A",""],r={chat:"\u804A\u5929\u76F8\u5173",character:"\u89D2\u8272\u76F8\u5173",tool:"\u5DE5\u5177\u76F8\u5173",context:"\u4E0A\u4E0B\u6587\u76F8\u5173",custom:"\u81EA\u5B9A\u4E49\u53D8\u91CF"},s={};for(let o of this.getAvailableVariables())s[o.category]||(s[o.category]=[]),s[o.category].push(o);for(let[o,n]of Object.entries(r))if(s[o]&&s[o].length>0){e.push(`\u3010${n}\u3011`);for(let a of s[o])e.push(`  ${a.name} - ${a.description}`);e.push("")}return e.push("\u3010\u6B63\u5219\u63D0\u53D6\u3011"),e.push("  {{regex.xxx}} - \u4F7F\u7528\u6B63\u5219\u63D0\u53D6\u7ED3\u679C\uFF0Cxxx\u4E3A\u6355\u83B7\u7EC4\u540D"),e.join(`
`)}_registerDefaultHandlers(){this.registerHandler("regex",(e,r)=>(r.regexResults||r.raw?.regexResults||{})[e]||"")}_resolveBuiltinVariables(e,r){let s=e;return s=s.replace(/\{\{lastUserMessage\}\}/gi,r.lastUserMessage||r.raw?.lastUserMessage||""),s=s.replace(/\{\{lastAiMessage\}\}/gi,r.lastAiMessage||r.raw?.lastAiMessage||""),s=s.replace(/\{\{chatHistory\}\}/gi,()=>{let o=r.chatHistory||r.raw?.chatHistory||[];return this._formatChatHistory(o)}),s=s.replace(/\{\{characterCard\}\}/gi,()=>{let o=r.characterCard||r.raw?.characterCard;return o?this._formatCharacterCard(o):""}),s=s.replace(/\{\{toolName\}\}/gi,r.toolName||r.raw?.toolName||""),s=s.replace(/\{\{toolId\}\}/gi,r.toolId||r.raw?.toolId||""),s=s.replace(/\{\{toolPromptMacro\}\}/gi,r.toolPromptMacro||r.raw?.toolPromptMacro||""),s=s.replace(/\{\{toolContentMacro\}\}/gi,r.toolContentMacro||r.raw?.toolContentMacro||""),s=s.replace(/\{\{toolWorldbookContent\}\}/gi,r.toolWorldbookContent||r.raw?.toolWorldbookContent||""),s=s.replace(/\{\{injectedContext\}\}/gi,r.injectedContext||r.raw?.injectedContext||""),s=s.replace(/\{\{extractedContent\}\}/gi,r.extractedContent||r.raw?.extractedContent||""),s=s.replace(/\{\{recentMessagesText\}\}/gi,r.recentMessagesText||r.raw?.recentMessagesText||""),s=s.replace(/\{\{rawRecentMessagesText\}\}/gi,r.rawRecentMessagesText||r.raw?.rawRecentMessagesText||""),s=s.replace(/\{\{userMessage\}\}/gi,r.userMessage||r.raw?.userMessage||""),s=s.replace(/\{\{previousToolOutput\}\}/gi,r.previousToolOutput||r.raw?.previousToolOutput||""),s}_resolveCustomVariables(e,r){let s=e;for(let[o,n]of this.customVariables){let a=new RegExp(`\\{\\{${this._escapeRegex(o)}\\}\\}`,"gi");typeof n=="function"?s=s.replace(a,()=>{try{return n(r)}catch(i){return this._log(`\u53D8\u91CF\u5904\u7406\u9519\u8BEF ${o}:`,i),""}}):s=s.replace(a,String(n))}return s}_resolveRegexVariables(e,r){let s=e;for(let[o,n]of this.variableHandlers){let a=new RegExp(`\\{\\{${o}\\.([^}]+)\\}\\}`,"gi");s=s.replace(a,(i,l)=>{try{return n(l,r)}catch(c){return this._log(`\u53D8\u91CF\u5904\u7406\u9519\u8BEF ${o}.${l}:`,c),""}})}return s}_formatChatHistory(e){return!Array.isArray(e)||e.length===0?"":e.map(r=>{let s=r.role||"unknown",o=r.content||r.mes||"";return`[${s}]: ${o}`}).join(`

`)}_formatCharacterCard(e){if(!e)return"";let r=[];return e.name&&r.push(`\u59D3\u540D: ${e.name}`),e.description&&r.push(`\u63CF\u8FF0: ${e.description}`),e.personality&&r.push(`\u6027\u683C: ${e.personality}`),e.scenario&&r.push(`\u573A\u666F: ${e.scenario}`),r.join(`

`)}_escapeRegex(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}_log(...e){Gw.debug(e[0],e.length>1?e.slice(1):void 0)}},Ut=new Oa,qw=Ut});var nf={};se(nf,{DEFAULT_PROMPT_TEMPLATE:()=>of,ToolPromptService:()=>za,default:()=>Jw,toolPromptService:()=>Ps});var Vw,of,za,Ps,Jw,Ka=N(()=>{Je();To();Ba();ea();H();Vw=R.createScope("ToolPromptService"),of="\u8BF7\u5904\u7406\u4EE5\u4E0BAI\u56DE\u590D\u5185\u5BB9\uFF1A",za=class{constructor(){this.debugMode=!1}async _buildVariableContext(e,r={}){let s=this._getPromptTemplate(e),o=String(r?.toolWorldbookContent||r?.input?.toolWorldbookContent||await Zn(e)).trim(),n=Ut.buildToolContext({...r,toolName:e?.name||r?.toolName||"",toolId:e?.id||r?.toolId||"",toolWorldbookContent:o}),a=Ut.resolveTemplate(s,n).trim(),i=String(r?.toolContentMacro||r?.input?.toolContentMacro||"").trim();return Ut.buildToolContext({...r,toolName:e?.name||r?.toolName||"",toolId:e?.id||r?.toolId||"",toolPromptMacro:a,toolContentMacro:i,toolWorldbookContent:o})}async buildToolMessages(e,r){if(!e)return this._log("\u6784\u5EFA\u5931\u8D25: \u5DE5\u5177\u914D\u7F6E\u4E3A\u7A7A"),[];let s=[],o=await this._buildVariableContext(e,r),n=Array.isArray(e.promptMessages)?e.promptMessages:[],a=this._getBypassMessages(e),i=a?.some(l=>l.mainSlot==="A"||l.mainSlot==="B"||l.isMain||l.isMain2);if(a&&a.length>0)for(let l of a)l.enabled!==!1&&s.push({role:this._normalizeRole(l.role),content:Ut.resolveTemplate(l.content||"",o)});if(!i&&n.length>0)for(let l of n){let c=Ut.resolveTemplate(l?.content||"",o).trim();c&&s.push({role:this._normalizeRole(l?.role),content:c})}else if(!i&&!a?.length){let l=this._buildUserContent(this._getPromptTemplate(e),o);l&&s.push({role:"user",content:l})}return this._log(`\u6784\u5EFA\u6D88\u606F: ${s.length} \u6761`),s}async buildPromptText(e,r){let s=await this._buildVariableContext(e,r),o=Array.isArray(e?.promptMessages)?e.promptMessages:[];return o.length>0?o.map(n=>Ut.resolveTemplate(n?.content||"",s).trim()).filter(Boolean).join(`

`):s.toolPromptMacro||""}getToolPromptTemplate(e){return this._getPromptTemplate(e)}_getPromptTemplate(e){return e.promptTemplate&&typeof e.promptTemplate=="string"?e.promptTemplate:of}_getBypassMessages(e){return e.bypass?.enabled?ue.buildBypassMessages(e):[]}_buildUserContent(e,r){return!e||!e.trim()?"":Ut.resolveTemplate(e,r).trim()}_normalizeRole(e){if(!e)return"user";switch(String(e).toLowerCase()){case"system":return"system";case"assistant":return"assistant";case"user":default:return"user"}}_log(...e){Vw.debug(e[0],e.length>1?e.slice(1):void 0)}setDebugMode(e){this.debugMode=e}},Ps=new za,Jw=Ps});var lf={};se(lf,{LEGACY_OUTPUT_MODES:()=>Xw,OUTPUT_MODES:()=>Rt,TOOL_FAILURE_STAGES:()=>Ge,TOOL_RUNTIME_STATUS:()=>Qw,TOOL_WRITEBACK_STATUS:()=>Be,ToolOutputService:()=>Ua,default:()=>Zw,toolOutputService:()=>Mt});function af(t){if(t?.signal?.aborted)return{aborted:!0,stale:!1,reason:"cancelled_before_host_commit"};if(typeof t?.shouldAbortWriteback=="function")try{return t.shouldAbortWriteback()||!1}catch{return{aborted:!0,stale:!0,reason:"stale_base_changed"}}return!1}function _o(t=[],e="",r=null){return{request:{built:Array.isArray(t)&&t.length>0,messageCount:Array.isArray(t)?t.length:0},extract:{completed:!0,hasOutput:!!String(e||"").trim()},writeback:{attempted:!!r,contentCommitted:!!r?.contentCommitted,hostCommitApplied:!!r?.hostCommitApplied,writebackStatus:r?.writebackStatus||"",preferredCommitMethod:r?.commit?.preferredMethod||"",appliedCommitMethod:r?.commit?.appliedMethod||"",fallbackUsed:!!r?.commit?.fallbackUsed},refresh:{requested:!!r?.refreshRequested,confirmed:!!r?.refreshConfirmed,requestMethods:Array.isArray(r?.refresh?.requestMethods)?[...r.refresh.requestMethods]:[],confirmChecks:Number(r?.refresh?.confirmChecks)||0,confirmedBy:r?.refresh?.confirmedBy||""}}}var Ns,Rt,Xw,Qw,Ge,Be,Ua,Mt,Zw,mn=N(()=>{Je();gn();H();Ms();Ka();Js();Kr();Bn();Ns=R.createScope("ToolOutputService"),Rt={FOLLOW_AI:"follow_ai",POST_RESPONSE_API:"post_response_api",LOCAL_TRANSFORM:"local_transform"},Xw={inline:"follow_ai"},Qw={IDLE:"idle",RUNNING:"running",SUCCESS:"success",ERROR:"error"},Ge={BUILD_MESSAGES:"build_messages",SEND_API_REQUEST:"send_api_request",EXTRACT_OUTPUT:"extract_output",INJECT_CONTEXT:"inject_context",COMPATIBILITY_EXECUTE:"compatibility_execute",UNKNOWN:"unknown"},Be={SUCCESS:"success",FAILED:"failed",SKIPPED_EMPTY_OUTPUT:"skipped_empty_output",NOT_APPLICABLE:"not_applicable"};Ua=class{constructor(){this.debugMode=!1,this._apiConnection=null}shouldRunPostResponse(e){return!e||!e.enabled||!e.output?.enabled?!1:e.output?.mode===Rt.POST_RESPONSE_API}shouldRunLocalTransform(e){return!e||!e.enabled||!e.output?.enabled?!1:e.output?.mode===Rt.LOCAL_TRANSFORM||!!e.processor?.type}shouldRunFollowAi(e){if(!e||!e.enabled||!e.output?.enabled)return!1;let r=e.output?.mode;return r===Rt.FOLLOW_AI||r==="inline"}shouldRunInline(e){return this.shouldRunFollowAi(e)}async runToolPostResponse(e,r){let s=Date.now(),o=e.id,n=r?.traceId||`trace_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,a=r?.sessionKey||"",i=r?.executionKey||"",l=this._getExtractionSelectors(e),c=e.output?.apiPreset||e.apiPreset||"",d="",u=Be.NOT_APPLICABLE,y=null,p=[],f="";Ns.info(`\u5F00\u59CB\u6267\u884C\u5DE5\u5177: ${o}`),K.emit(B.TOOL_EXECUTION_STARTED,{toolId:o,traceId:n,sessionKey:a,mode:Rt.POST_RESPONSE_API});try{if(d=Ge.BUILD_MESSAGES,p=await this._buildToolMessages(e,r),!p||p.length===0)throw new Error("\u672A\u6784\u5EFA\u51FA\u53EF\u53D1\u9001\u7684\u5DE5\u5177\u8BF7\u6C42\u6D88\u606F\uFF0C\u8BF7\u68C0\u67E5\u63D0\u793A\u8BCD\u6A21\u677F\u6216\u7834\u9650\u8BCD\u914D\u7F6E\u662F\u5426\u4E3A\u7A7A\u3002");Ns.debug(`\u6784\u5EFA\u4E86 ${p.length} \u6761\u6D88\u606F`);let g=af(r);if(g){let L=Date.now()-s;return{success:!1,toolId:o,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88",duration:L,meta:{traceId:n,sessionKey:a,executionKey:i,sourceMessageId:r?.sourceMessageId||r?.confirmedAssistantMessageId||r?.messageId||"",sourceSwipeId:r?.sourceSwipeId||r?.confirmedAssistantSwipeId||r?.effectiveSwipeId||"",slotRevisionKey:r?.slotRevisionKey||"",selectors:l,apiPreset:c,writebackStatus:u,failureStage:d,writebackDetails:y,aborted:g.aborted===!0,stale:g.stale===!0,abortReason:g.reason||"",phases:_o(p,f,y)}}}let h=await this._getRequestTimeout();d=Ge.SEND_API_REQUEST;let x=await this._sendApiRequest(c,p,{timeoutMs:h,signal:r.signal});d=Ge.EXTRACT_OUTPUT,f=this._extractOutputContent(x,e);let T=af(r);if(T){let L=Date.now()-s;return{success:!1,toolId:o,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88",duration:L,meta:{traceId:n,sessionKey:a,executionKey:i,sourceMessageId:r?.sourceMessageId||r?.confirmedAssistantMessageId||r?.messageId||"",sourceSwipeId:r?.sourceSwipeId||r?.confirmedAssistantSwipeId||r?.effectiveSwipeId||"",slotRevisionKey:r?.slotRevisionKey||"",selectors:l,apiPreset:c,writebackStatus:u,failureStage:d,writebackDetails:y,aborted:T.aborted===!0,stale:T.stale===!0,abortReason:T.reason||"",phases:_o(p,f,y)}}}if(f){if(d=Ge.INJECT_CONTEXT,y=await It.injectDetailed(o,f,{overwrite:e.output?.overwrite!==!1,sourceMessageId:r.sourceMessageId||r.confirmedAssistantMessageId||r.messageId||"",sourceSwipeId:r.sourceSwipeId||r.confirmedAssistantSwipeId||r.effectiveSwipeId||"",effectiveSwipeId:r.effectiveSwipeId||r.confirmedAssistantSwipeId||"",slotBindingKey:r.slotBindingKey||"",slotRevisionKey:r.slotRevisionKey||"",slotTransactionId:r.slotTransactionId||"",extractionSelectors:l,traceId:n,sessionKey:a,signal:r.signal,shouldAbortWriteback:r.shouldAbortWriteback,isAutoRun:r.isAutoRun===!0,skipNotify:r.skipNotify===!0}),!y?.success)throw u=Be.FAILED,new Error(y?.error||"\u5DE5\u5177\u7ED3\u679C\u5DF2\u751F\u6210\uFF0C\u4F46\u5199\u5165\u4E0A\u4E0B\u6587/\u4E16\u754C\u4E66\u5931\u8D25");u=Be.SUCCESS}else u=Be.SKIPPED_EMPTY_OUTPUT;d="";let v=Date.now()-s;return K.emit(B.TOOL_EXECUTED,{toolId:o,traceId:n,sessionKey:a,success:!0,duration:v,mode:Rt.POST_RESPONSE_API}),Ns.info(`\u5DE5\u5177\u6267\u884C\u6210\u529F: ${o}, \u8017\u65F6 ${v}ms`),{success:!0,toolId:o,output:f,duration:v,meta:{traceId:n,sessionKey:a,executionKey:i,slotBindingKey:r?.slotBindingKey||"",slotTransactionId:r?.slotTransactionId||"",generationAction:r?.generationAction||"",generationActionSource:r?.generationActionSource||"",rawGenerationType:r?.rawGenerationType||"",normalizedGenerationType:r?.normalizedGenerationType||"",generationMessageBindingSource:r?.generationMessageBindingSource||"",sourceMessageId:r?.sourceMessageId||r?.confirmedAssistantMessageId||r?.messageId||"",sourceSwipeId:r?.sourceSwipeId||r?.confirmedAssistantSwipeId||r?.effectiveSwipeId||"",confirmedAssistantSwipeId:r?.confirmedAssistantSwipeId||"",effectiveSwipeId:r?.effectiveSwipeId||"",slotRevisionKey:r?.slotRevisionKey||"",messageCount:p.length,selectors:l,apiPreset:c,writebackStatus:u,failureStage:"",writebackDetails:y,phases:_o(p,f,y)}}}catch(g){let h=Date.now()-s,x=d||Ge.UNKNOWN,T=u||Be.NOT_APPLICABLE;return Ns.error(`\u5DE5\u5177\u6267\u884C\u5931\u8D25: ${o}`,{error:g}),K.emit(B.TOOL_EXECUTION_FAILED,{toolId:o,traceId:n,sessionKey:a,error:g.message||String(g),duration:h}),{success:!1,toolId:o,error:g.message||String(g),duration:h,meta:{traceId:n,sessionKey:a,executionKey:i,slotBindingKey:r?.slotBindingKey||"",slotTransactionId:r?.slotTransactionId||"",generationAction:r?.generationAction||"",generationActionSource:r?.generationActionSource||"",rawGenerationType:r?.rawGenerationType||"",normalizedGenerationType:r?.normalizedGenerationType||"",generationMessageBindingSource:r?.generationMessageBindingSource||"",sourceMessageId:r?.sourceMessageId||r?.confirmedAssistantMessageId||r?.messageId||"",sourceSwipeId:r?.sourceSwipeId||r?.confirmedAssistantSwipeId||r?.effectiveSwipeId||"",confirmedAssistantSwipeId:r?.confirmedAssistantSwipeId||"",effectiveSwipeId:r?.effectiveSwipeId||"",slotRevisionKey:r?.slotRevisionKey||"",messageCount:p.length,selectors:l,apiPreset:c,writebackStatus:T,failureStage:x,writebackDetails:y,phases:_o(p,f,y)}}}}async runToolFollowAiManual(e,r){let s=Date.now(),o=e.id,n=r?.traceId||`trace_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,a=r?.sessionKey||"",i=r?.executionKey||"",l=e.output?.apiPreset||e.apiPreset||"",c=this._getExtractionSelectors(e),d="",u=Be.NOT_APPLICABLE,y=null,p=[],f="";K.emit(B.TOOL_EXECUTION_STARTED,{toolId:o,traceId:n,sessionKey:a,mode:Rt.FOLLOW_AI});try{if(d=Ge.BUILD_MESSAGES,p=await this._buildToolMessages(e,r),!p||p.length===0)throw new Error("\u672A\u6784\u5EFA\u51FA\u53EF\u53D1\u9001\u7684\u5DE5\u5177\u8BF7\u6C42\u6D88\u606F\uFF0C\u8BF7\u68C0\u67E5\u63D0\u793A\u8BCD\u6A21\u677F\u6216\u7834\u9650\u8BCD\u914D\u7F6E\u662F\u5426\u4E3A\u7A7A\u3002");let g=await this._getRequestTimeout();d=Ge.SEND_API_REQUEST;let h=await this._sendApiRequest(l,p,{timeoutMs:g,signal:r.signal});if(d=Ge.EXTRACT_OUTPUT,f=this._extractOutputContent(h,e),f){if(d=Ge.INJECT_CONTEXT,y=await It.injectDetailed(o,f,{overwrite:e.output?.overwrite!==!1,sourceMessageId:r.sourceMessageId||r.confirmedAssistantMessageId||r.messageId||"",sourceSwipeId:r.sourceSwipeId||r.confirmedAssistantSwipeId||r.effectiveSwipeId||"",effectiveSwipeId:r.effectiveSwipeId||r.confirmedAssistantSwipeId||"",slotBindingKey:r.slotBindingKey||"",slotRevisionKey:r.slotRevisionKey||"",slotTransactionId:r.slotTransactionId||"",extractionSelectors:c,traceId:n,sessionKey:a}),!y?.success)throw u=Be.FAILED,new Error(y?.error||"\u5DE5\u5177\u7ED3\u679C\u5DF2\u751F\u6210\uFF0C\u4F46\u5199\u5165\u4E0A\u4E0B\u6587/\u4E16\u754C\u4E66\u5931\u8D25");u=Be.SUCCESS}else u=Be.SKIPPED_EMPTY_OUTPUT;d="";let x=Date.now()-s;return K.emit(B.TOOL_EXECUTED,{toolId:o,traceId:n,sessionKey:a,success:!0,duration:x,mode:Rt.FOLLOW_AI}),{success:!0,toolId:o,output:f,duration:x,meta:{traceId:n,sessionKey:a,executionKey:i,slotBindingKey:r?.slotBindingKey||"",slotTransactionId:r?.slotTransactionId||"",sourceMessageId:r?.sourceMessageId||r?.confirmedAssistantMessageId||r?.messageId||"",sourceSwipeId:r?.sourceSwipeId||r?.confirmedAssistantSwipeId||r?.effectiveSwipeId||"",confirmedAssistantSwipeId:r?.confirmedAssistantSwipeId||"",effectiveSwipeId:r?.effectiveSwipeId||"",slotRevisionKey:r?.slotRevisionKey||"",messageCount:p.length,selectors:c,apiPreset:l,writebackStatus:u,failureStage:"",writebackDetails:y,phases:_o(p,f,y)}}}catch(g){let h=Date.now()-s,x=d||Ge.UNKNOWN,T=u||Be.NOT_APPLICABLE;return K.emit(B.TOOL_EXECUTION_FAILED,{toolId:o,traceId:n,sessionKey:a,error:g.message||String(g),duration:h,mode:Rt.FOLLOW_AI}),{success:!1,toolId:o,error:g.message||String(g),duration:h,meta:{traceId:n,sessionKey:a,executionKey:i,slotBindingKey:r?.slotBindingKey||"",slotTransactionId:r?.slotTransactionId||"",sourceMessageId:r?.sourceMessageId||r?.confirmedAssistantMessageId||r?.messageId||"",sourceSwipeId:r?.sourceSwipeId||r?.confirmedAssistantSwipeId||r?.effectiveSwipeId||"",confirmedAssistantSwipeId:r?.confirmedAssistantSwipeId||"",effectiveSwipeId:r?.effectiveSwipeId||"",slotRevisionKey:r?.slotRevisionKey||"",messageCount:p.length,selectors:c,apiPreset:l,writebackStatus:T,failureStage:x,writebackDetails:y,phases:_o(p,f,y)}}}}async runToolInline(e,r){return this.runToolFollowAiManual(e,r)}async previewExtraction(e,r){return{success:!0,...this.getExtractionSnapshot(e,r)}}getExtractionSnapshot(e,r){let s=this._buildRecentMessageExtractionEntries(e,r),o=this._joinMessageBlocks(s,"rawText"),n=this._joinMessageBlocks(s,"filteredText"),a=this._joinMessageBlocks(s,"extractedText",{skipEmpty:!0}),i=(Array.isArray(s)?s:[]).map(c=>String(c?.extractedText||"").trim()).filter(Boolean).join(`

`),l=Array.isArray(s)&&s.length>0?s[s.length-1]:null;return{sourceText:o,filteredSourceText:n,extractedText:a,extractedRawText:i,messageEntries:s,primaryEntry:l,selectors:this._getExtractionSelectors(e),maxMessages:e?.extraction?.maxMessages||5}}async _buildToolMessages(e,r){let s=this._buildRecentMessageExtractionEntries(e,r),o=this._joinMessageBlocks(s,"rawText"),n=this._joinMessageBlocks(s,"filteredText"),a=this._joinMessageBlocks(s,"extractedText",{skipEmpty:!0}),i={...r,rawRecentMessagesText:o,recentMessagesText:n,extractedContent:a,toolContentMacro:this._buildToolContentMacro(s),toolName:e.name,toolId:e.id};return Ps.buildToolMessages(e,i)}_normalizeRole(e){if(!e)return"user";let r=String(e).toLowerCase();return r==="system"?"system":r==="assistant"?"assistant":"user"}setApiConnection(e){this._apiConnection=e}async _sendApiRequest(e,r,s={}){if(!this._apiConnection)throw new Error("API\u8FDE\u63A5\u6A21\u5757\u672A\u914D\u7F6E");let{timeoutMs:o=9e4,signal:n}=s,a=null;if(e){if(!Do(e))throw new Error(`\u672A\u627E\u5230 API \u9884\u8BBE\u201C${e}\u201D\uFF0C\u8BF7\u91CD\u65B0\u9009\u62E9\u6216\u4FDD\u5B58\u540E\u518D\u6267\u884C`);a=$o(e)}else a=$o();let i=On(a||{});if(!i.valid&&!a?.useMainApi)throw new Error(`API\u914D\u7F6E\u65E0\u6548\uFF1A${i.errors.join("\uFF0C")}\u3002\u8BF7\u5148\u5B8C\u5584\u81EA\u5B9A\u4E49API\u914D\u7F6E\uFF0C\u6216\u542F\u7528\u201C\u4F7F\u7528SillyTavern\u4E3BAPI\u201D`);if(this._apiConnection.sendApiRequest)return await this._apiConnection.sendApiRequest(r,{timeoutMs:o,apiConfig:a},n);throw new Error("\u6CA1\u6709\u53EF\u7528\u7684API\u53D1\u9001\u65B9\u6CD5")}async _getRequestTimeout(){return zt.getSettings().executor?.requestTimeoutMs||9e4}_extractOutputContent(e,r){if(!e)return"";if(typeof e=="string")return this._applyOutputExtractionSelectors(e,r);if(typeof e=="object"){if(e.choices&&e.choices[0]?.message?.content)return this._applyOutputExtractionSelectors(e.choices[0].message.content,r);if(e.content)return this._applyOutputExtractionSelectors(e.content,r);if(e.text)return this._applyOutputExtractionSelectors(e.text,r);if(e.message)return this._applyOutputExtractionSelectors(e.message,r);try{return this._applyOutputExtractionSelectors(JSON.stringify(e,null,2),r)}catch{return this._applyOutputExtractionSelectors(String(e),r)}}return this._applyOutputExtractionSelectors(String(e),r)}_applyOutputExtractionSelectors(e,r){let s=typeof e=="string"?e:String(e||""),o=this._getExtractionSelectors(r);if(!o.length)return s.trim();let n=[];for(let a of o){let i=String(a||"").trim();if(!i)continue;if(i.startsWith("regex:")){let c=i.slice(6).trim();if(!c)continue;try{let d=new RegExp(c,"gi");[...s.matchAll(d)].forEach(y=>{let p=String(y?.[0]||"").trim();p&&n.push(p)})}catch(d){Ns.warn("\u5DE5\u5177\u8F93\u51FA\u6B63\u5219\u63D0\u53D6\u5931\u8D25\uFF0C\u8DF3\u8FC7\u8BE5\u89C4\u5219",{selector:i,error:d})}continue}let l=i.replace(/^<|>$/g,"").trim();if(l)try{let c=new RegExp(`<${l}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${l}>`,"gi");(s.match(c)||[]).forEach(u=>{let y=String(u||"").trim();y&&n.push(y)})}catch(c){Ns.warn("\u5DE5\u5177\u8F93\u51FA\u6807\u7B7E\u63D0\u53D6\u5931\u8D25\uFF0C\u8DF3\u8FC7\u8BE5\u89C4\u5219",{selector:i,error:c})}}return n.length>0?n.join(`

`).trim():s.trim()}_resolveExtractionContext(e){let r=e?.extraction?.regexPresetId;if(!r)return{rules:[],blacklist:[]};try{let s=xr(r);if(!s)return{rules:[],blacklist:[]};let o=Array.isArray(s.rules)?s.rules.filter(a=>a&&a.enabled!==!1&&a.value).map(a=>({id:a.id,type:a.type,value:a.value,enabled:!0})):[],n=Array.isArray(s.blacklist)?s.blacklist.map(a=>String(a||"").trim()).filter(Boolean):[];return{rules:o,blacklist:n}}catch(s){return this._log("warn","_resolveExtractionContext \u5F02\u5E38",{error:s}),{rules:[],blacklist:[]}}}_getExtractionSelectors(e){let{rules:r}=this._resolveExtractionContext(e),s=[];for(let o of r){let n=String(o.value||"").trim();n&&(o.type==="include"?s.push(n):o.type==="regex_include"&&s.push(`regex:${n}`))}return s}_applyExtractionSelectors(e,r){return this._applyExtractionSelectorsInternal(e,r,{strict:!1})}_applyExtractionSelectorsInternal(e,r,s={}){let o=typeof e=="string"?e:String(e||""),{rules:n,blacklist:a}=this._resolveExtractionContext(r),{strict:i=!1}=s;if(!n.length)return o.trim();let l=hr(o,n,a||[]);return i?(l||"").trim():l||o.trim()}_extractToolContent(e,r){let s=typeof r=="string"?r:String(r||""),{rules:o}=this._resolveExtractionContext(e);return o.length?this._applyExtractionSelectorsInternal(s,e,{strict:!0}):s.trim()}_applyGlobalContextRules(e){let r=typeof e=="string"?e:String(e||"");if(!r.trim())return"";try{let s=qs()||[],o=Vs()||[];return!Array.isArray(s)||s.length===0?r.trim():hr(r,s,o)||r.trim()}catch(s){return Ns.warn("\u5E94\u7528\u5168\u5C40\u6B63\u6587\u63D0\u53D6\u89C4\u5219\u5931\u8D25\uFF0C\u56DE\u9000\u539F\u59CB\u6587\u672C",{error:s}),r.trim()}}_getMessageText(e){if(!e)return"";let r=[e.content,e.mes,e.message,e.text,e?.data?.content];for(let s of r)if(typeof s=="string"&&s.trim())return s.trim();return""}_collectRecentAssistantMessages(e,r){return this._collectRecentAssistantMessageEntries(e,r).map(s=>s.text).filter(Boolean).join(`

`)}_collectRecentAssistantMessageEntries(e,r){let s=Math.max(1,parseInt(e?.extraction?.maxMessages,10)||5),o=Array.isArray(r?.chatMessages)?r.chatMessages:[],n=[];for(let i=o.length-1;i>=0&&n.length<s;i-=1){let l=o[i],c=String(l?.role||"").toLowerCase(),d=c==="assistant"||c==="ai"||!l?.is_user&&!l?.is_system&&!c,u=this._getMessageText(l);d&&u&&n.unshift({text:u,message:l,chatIndex:i})}if(n.length>0)return n;let a=r?.lastAiMessage||r?.input?.lastAiMessage||"";return a?[{text:a,message:null,chatIndex:-1}]:[]}_buildRecentMessageExtractionEntries(e,r){return this._collectRecentAssistantMessageEntries(e,r).map((o,n)=>{let a=o.text||"",i=this._applyGlobalContextRules(a),l=this._extractToolContent(e,a);return{...o,order:n+1,rawText:a,filteredText:i,extractedText:l,fullMessageText:a}})}_joinMessageBlocks(e,r,s={}){let o=Array.isArray(e)?e:[],{skipEmpty:n=!1}=s;return o.map(i=>{let l=String(i?.[r]||"").trim();return n&&!l?"":`${`\u3010\u7B2C ${i?.order||0} \u6761 AI \u6D88\u606F\u3011`}
${l||"(\u7A7A)"}`}).filter(Boolean).join(`

--------------------------------

`)}_buildToolContentMacro(e){return(Array.isArray(e)?e:[]).map(o=>{let n=`\u3010\u7B2C ${o?.order||0} \u6761 AI \u6D88\u606F\u3011`,a=String(o?.filteredText||"").trim()||"(\u7A7A)",i=String(o?.extractedText||"").trim()||"(\u7A7A)";return`${n}
\u6B63\u6587\uFF1A
${a}

\u5DE5\u5177\uFF1A
${i}`}).filter(Boolean).join(`

--------------------------------

`).trim()}filterPostResponseTools(e){return Array.isArray(e)?e.filter(r=>this.shouldRunPostResponse(r)):[]}filterAutoPostResponseTools(e){return Array.isArray(e)?e.filter(r=>this.shouldRunPostResponse(r)):[]}filterInlineTools(e){return Array.isArray(e)?e.filter(r=>this.shouldRunInline(r)):[]}setDebugMode(e){this.debugMode=e}},Mt=new Ua,Zw=Mt});function df(t={}){return!t||typeof t!="object"?{}:Object.entries(t).reduce((e,[r,s])=>(e[r]=s===!0,e),{})}function rv(t,e={}){let r=e?.direction==="unescape"?"unescape":"escape",s=df(e?.options);return ev.reduce((o,n)=>s[n.key]!==!0?o:r==="unescape"?o.replace(n.escaped,n.unescaped):o.replace(n.plain,n.replacement),String(t||""))}function sv(t,e={}){if((e?.direction||"en_to_zh")!=="en_to_zh")return String(t||"");let s=df(e?.options);return tv.reduce((o,n)=>s[n.key]!==!0?o:o.replace(n.from,n.to),String(t||""))}function ov(t,e){let r=t?.processor||{},s=r?.type||"",o=String(e||"");switch(s){case cf.ESCAPE_TRANSFORM:return rv(o,r);case cf.PUNCTUATION_TRANSFORM:return sv(o,r);default:return o}}function nv(t,e,r){let s=String(t||""),o=String(e||"").trim(),n=String(r||"").trim();return!s.trim()||!o?{nextMessageText:"",replaced:!1}:s.includes(o)?{nextMessageText:s.replace(o,n).trim(),replaced:!0}:{nextMessageText:"",replaced:!1}}async function ja(t,e={}){let r=Mt.getExtractionSnapshot(t,e),s=r?.primaryEntry||null,o=String(s?.fullMessageText||e?.lastAiMessage||"").trim(),n=String(s?.extractedText||r?.extractedRawText||r?.extractedText||"").trim(),a=Array.isArray(r?.selectors)?r.selectors:[],i=e?.traceId||`trace_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,l=e?.sessionKey||"";if(!n||!o)return{success:!1,error:"\u672A\u63D0\u53D6\u5230\u53EF\u5904\u7406\u5185\u5BB9\uFF0C\u8BF7\u5148\u68C0\u67E5\u6807\u7B7E\u6216\u6B63\u5219\u89C4\u5219",meta:{traceId:i,sessionKey:l,selectors:a,writebackStatus:Be.NOT_APPLICABLE,failureStage:Ge.EXTRACT_OUTPUT,extraction:r}};let c=String(ov(t,n)||"").trim(),d=nv(o,n,c),u=d.replaced?d.nextMessageText:c,y=null,p=Be.NOT_APPLICABLE;if(u){if(y=await It.injectDetailed(t.id,u,{overwrite:!0,sourceMessageId:e?.sourceMessageId||e?.confirmedAssistantMessageId||e?.messageId||"",sourceSwipeId:e?.sourceSwipeId||e?.confirmedAssistantSwipeId||e?.effectiveSwipeId||"",effectiveSwipeId:e?.effectiveSwipeId||e?.confirmedAssistantSwipeId||"",slotBindingKey:e?.slotBindingKey||"",slotRevisionKey:e?.slotRevisionKey||"",slotTransactionId:e?.slotTransactionId||"",extractionSelectors:[],replaceFullMessage:d.replaced,traceId:i,sessionKey:l,skipNotify:e?.skipNotify===!0}),!y?.success)return{success:!1,error:y?.error||"\u672C\u5730\u5904\u7406\u5B8C\u6210\uFF0C\u4F46\u5199\u56DE\u5931\u8D25",meta:{traceId:i,sessionKey:l,selectors:a,writebackStatus:Be.FAILED,failureStage:Ge.INJECT_CONTEXT,writebackDetails:y,extraction:r}};p=Be.SUCCESS}else p=Be.SKIPPED_EMPTY_OUTPUT;return{success:!0,output:c,writebackState:u?{committed:y?.contentCommitted===!0}:null,meta:{traceId:i,sessionKey:l,selectors:a,writebackStatus:p,failureStage:"",writebackDetails:y,extraction:r}}}var ev,tv,cf,ac=N(()=>{mn();Ms();ev=[{key:"newline",plain:/\r\n|\r|\n/g,escaped:/\\n/g,replacement:"\\n",unescaped:`
`},{key:"doubleQuote",plain:/"/g,escaped:/\\"/g,replacement:'\\"',unescaped:'"'},{key:"singleQuote",plain:/'/g,escaped:/\\'/g,replacement:"\\'",unescaped:"'"}],tv=[{key:"comma",from:/,/g,to:"\uFF0C"},{key:"period",from:/\./g,to:"\u3002"},{key:"exclamation",from:/!/g,to:"\uFF01"},{key:"question",from:/\?/g,to:"\uFF1F"},{key:"semicolon",from:/;/g,to:"\uFF1B"},{key:"colon",from:/:/g,to:"\uFF1A"},{key:"leftParen",from:/\(/g,to:"\uFF08"},{key:"rightParen",from:/\)/g,to:"\uFF09"}],cf={ESCAPE_TRANSFORM:"escape_transform",PUNCTUATION_TRANSFORM:"punctuation_transform"}});var lc={};se(lc,{abortAllTasks:()=>dv,abortTask:()=>cv,buildToolMessages:()=>yf,clearExecutionHistory:()=>gv,createExecutionContext:()=>xv,createResult:()=>Fa,enhanceMessagesWithBypass:()=>wv,executeBatch:()=>lv,executeTool:()=>pf,executeToolWithConfig:()=>ff,executeToolsBatch:()=>Sv,executorState:()=>De,extractFailed:()=>bv,extractSuccessful:()=>hv,generateTaskId:()=>$s,getExecutionHistory:()=>fv,getExecutorStatus:()=>yv,getScheduler:()=>Eo,mergeResults:()=>mv,pauseExecutor:()=>uv,resumeExecutor:()=>pv,setMaxConcurrent:()=>iv});function Fa(t,e,r,s,o,n,a=0){return{success:r,taskId:t,toolId:e,data:s,error:o,duration:n,retries:a,timestamp:Date.now(),metadata:{}}}function $s(){return`task_${Date.now()}_${Math.random().toString(36).substr(2,9)}`}function av(t,e={}){return{id:$s(),toolId:t,options:e,status:"pending",createdAt:Date.now(),startedAt:null,completedAt:null,retries:0,maxRetries:e.maxRetries||3}}function Eo(){return hn||(hn=new ic(De.maxConcurrent)),hn}function iv(t){De.maxConcurrent=Math.max(1,Math.min(10,t)),hn&&(hn.maxConcurrent=De.maxConcurrent)}async function pf(t,e={},r){let s=Eo(),o=av(t,e);for(;De.isPaused;)await new Promise(n=>setTimeout(n,100));try{let n=await s.enqueue(async a=>{if(a.aborted)throw new DOMException("\u4EFB\u52A1\u5DF2\u4E2D\u6B62","AbortError");if(typeof r=="function")return await r(a,e);throw new Error("\u6267\u884C\u5668\u5FC5\u987B\u662F\u4E00\u4E2A\u51FD\u6570")},o);return uf(n),n}catch(n){let a=Fa(o.id,t,!1,null,n,Date.now()-o.createdAt,o.retries);return uf(a),a}}async function lv(t,e={}){let{failFast:r=!1,concurrency:s=De.maxConcurrent}=e,o=[],n=Eo(),a=n.maxConcurrent;n.maxConcurrent=s;try{let i=t.map(({toolId:l,options:c,executor:d})=>pf(l,c,d));if(r)for(let l of i){let c=await l;if(o.push(c),!c.success){n.abortAll();break}}else{let l=await Promise.allSettled(i);for(let c of l)c.status==="fulfilled"?o.push(c.value):o.push(Fa($s(),"unknown",!1,null,c.reason,0,0))}}finally{n.maxConcurrent=a}return o}function cv(t){return Eo().abort(t)}function dv(){Eo().abortAll(),De.executionQueue=[]}function uv(){De.isPaused=!0}function pv(){De.isPaused=!1}function yv(){return{...Eo().getStatus(),isPaused:De.isPaused,activeControllers:De.activeControllers.size,historyCount:De.executionHistory.length}}function uf(t){De.executionHistory.push(t),De.executionHistory.length>100&&De.executionHistory.shift()}function fv(t={}){let e=[...De.executionHistory];return t.toolId&&(e=e.filter(r=>r.toolId===t.toolId)),t.success!==void 0&&(e=e.filter(r=>r.success===t.success)),t.limit&&(e=e.slice(-t.limit)),e}function gv(){De.executionHistory=[]}function mv(t){let e={success:!0,data:[],errors:[],totalDuration:0,successCount:0,failureCount:0};for(let r of t)e.totalDuration+=r.duration,r.success?(e.successCount++,r.data!==void 0&&r.data!==null&&e.data.push(r.data)):(e.success=!1,e.failureCount++,r.error&&e.errors.push({taskId:r.taskId,toolId:r.toolId,error:r.error.message||String(r.error)}));return e}function hv(t){return t.filter(e=>e.success).map(e=>e.data)}function bv(t){return t.filter(e=>!e.success).map(e=>({taskId:e.taskId,toolId:e.toolId,error:e.error}))}function xv(t={}){return{taskId:$s(),startTime:Date.now(),signal:t.signal||null,apiConfig:t.apiConfig||null,bypassMessages:t.bypassMessages||[],context:t.context||{},metadata:t.metadata||{}}}function wv(t,e){return!e||e.length===0?t:[...e,...t]}function vv(t){return t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function yf(t,e){let r=[],s=t.promptTemplate||"",o={"{{userMessage}}":e.input?.userMessage||"","{{lastAiMessage}}":e.input?.lastAiMessage||"","{{extractedContent}}":e.input?.extractedContent||"","{{previousToolOutput}}":e.input?.previousToolOutput||"","{{context}}":JSON.stringify(e.input?.context||{}),"{{pg}}":e.input?.context?.pg||"1","{{time}}":e.input?.context?.time||"","{{scene}}":e.input?.context?.scene||"","{{plot}}":e.input?.context?.plot||"","{{mq}}":e.input?.context?.mq||"\u2160","{{mqStatus}}":e.input?.context?.mqStatus||"\u8FDB\u884C\u4E2D","{{sq}}":e.input?.context?.sq||"1","{{sqStatus}}":e.input?.context?.sqStatus||"\u8FDB\u884C\u4E2D","{{latestSq}}":e.input?.context?.latestSq||"1","{{completed}}":e.input?.context?.completed||"\u65E0","{{defined}}":e.input?.context?.defined||"","{{status}}":e.input?.context?.status||"","{{seeds}}":e.input?.context?.seeds||"","{{name}}":e.input?.context?.name||"","{{location}}":e.input?.context?.location||"","{{condition}}":e.input?.context?.condition||"","{{equipment}}":e.input?.context?.equipment||"","{{skills}}":e.input?.context?.skills||""};for(let[n,a]of Object.entries(o))s=s.replace(new RegExp(vv(n),"g"),a);return r.push({role:"USER",content:s}),r}async function ff(t,e,r={}){let s=ne(t);if(!s)return{success:!1,taskId:$s(),toolId:t,error:"\u5DE5\u5177\u914D\u7F6E\u4E0D\u5B58\u5728",duration:0};if(!s.enabled)return{success:!1,taskId:$s(),toolId:t,error:"\u5DE5\u5177\u672A\u542F\u7528",duration:0};let o=Date.now(),n=$s();try{K.emit(B.TOOL_EXECUTION_STARTED,{toolId:t,taskId:n,context:e});let a=yf(s,e);if(typeof r.callApi=="function"){let i=s.output?.apiPreset||s.apiPreset||"",l=i?{preset:i}:null,c=await r.callApi(a,l,r.signal),d=c;s.outputMode==="separate"&&s.extractTags?.length>0&&(d=Tv(c,s.extractTags));let u={success:!0,taskId:n,toolId:t,data:d,duration:Date.now()-o};return K.emit(B.TOOL_EXECUTED,{toolId:t,taskId:n,result:u}),u}else return{success:!0,taskId:n,toolId:t,data:{messages:a,config:{apiPreset:s.output?.apiPreset||s.apiPreset||"",outputMode:s.outputMode,extractTags:s.extractTags}},duration:Date.now()-o,needsExecution:!0}}catch(a){let i={success:!1,taskId:n,toolId:t,error:a.message||String(a),duration:Date.now()-o};return K.emit(B.TOOL_EXECUTION_FAILED,{toolId:t,taskId:n,error:a}),i}}function Tv(t,e){let r={};for(let s of e){let o=new RegExp(`<${s}[^>]*>([\\s\\S]*?)<\\/${s}>`,"gi"),n=t.match(o);n&&(r[s]=n.map(a=>{let i=a.match(new RegExp(`<${s}[^>]*>([\\s\\S]*?)<\\/${s}>`,"i"));return i?i[1].trim():""}))}return r}async function Sv(t,e,r={}){let s=[];for(let o of t){let n=ne(o);if(n&&n.enabled){let a=await ff(o,e,r);s.push(a)}}return s}var De,ic,hn,cc=N(()=>{tr();Je();De={activeControllers:new Map,executionQueue:[],runningCount:0,maxConcurrent:3,executionHistory:[],isPaused:!1};ic=class{constructor(e=3){this.maxConcurrent=e,this.queue=[],this.running=new Map,this.isProcessing=!1}enqueue(e,r){return new Promise((s,o)=>{this.queue.push({executor:e,task:r,resolve:s,reject:o}),this.process()})}async process(){if(!this.isProcessing){for(this.isProcessing=!0;this.queue.length>0&&this.running.size<this.maxConcurrent;){let e=this.queue.shift();if(!e)continue;let{executor:r,task:s,resolve:o,reject:n}=e,a=new AbortController;s.abortController=a,s.status="running",s.startedAt=Date.now(),this.running.set(s.id,s),De.activeControllers.set(s.id,a),this.executeTask(r,s,a.signal).then(i=>{s.status="completed",s.completedAt=Date.now(),o(i)}).catch(i=>{s.status=i.name==="AbortError"?"aborted":"failed",s.completedAt=Date.now(),n(i)}).finally(()=>{this.running.delete(s.id),De.activeControllers.delete(s.id),De.runningCount=this.running.size})}this.isProcessing=!1}}async executeTask(e,r,s){let o=Date.now(),n=null;for(let a=0;a<=r.maxRetries;a++){if(s.aborted)throw new DOMException("\u4EFB\u52A1\u5DF2\u4E2D\u6B62","AbortError");try{let i=await e(s);return Fa(r.id,r.toolId,!0,i,null,Date.now()-o,a)}catch(i){if(n=i,i.name==="AbortError")throw i;a<r.maxRetries&&(await this.delay(1e3*(a+1)),r.retries=a+1)}}throw n}delay(e){return new Promise(r=>setTimeout(r,e))}abort(e){let r=De.activeControllers.get(e);return r?(r.abort(),!0):!1}abortAll(){for(let e of De.activeControllers.values())e.abort();De.activeControllers.clear(),this.queue=[],this.running.clear()}getStatus(){return{pending:this.queue.length,running:this.running.size,maxConcurrent:this.maxConcurrent}}},hn=null});async function Ev(){return dc||(dc=Promise.resolve().then(()=>(cc(),lc))),dc}async function Av(t,e,r){return r&&t.output?.mode===Rt.POST_RESPONSE_API?Mt.runToolPostResponse(t,e):r&&t.output?.mode===Rt.FOLLOW_AI?Mt.runToolFollowAiManual(t,e):(await Ev()).executeToolWithConfig(t.id,e)}function kv(t,e){return e?.runSource==="MANUAL"?t.output?.mode==="local_transform"||t.processor?.type?Ds.MANUAL_LOCAL_TRANSFORM:t.output?.mode===Rt.POST_RESPONSE_API?Ds.MANUAL_POST_RESPONSE_API:Ds.MANUAL_COMPATIBILITY:Ds.MANUAL_POST_RESPONSE_API}function Wa(t,e){try{ul(t,e)}catch(r){_v.warn("\u66F4\u65B0\u5DE5\u5177\u8FD0\u884C\u65F6\u72B6\u6001\u5931\u8D25:",{toolId:t,error:r})}}async function Cv(t,e){let r=Date.now(),s=t.id,o=`yyt-tool-run-${s}`,n=kv(t,e),a=e?.executionKey||"";Wa(s,{lastStatus:"running",lastError:"",lastDurationMs:0,lastTraceId:e?.traceId||"",lastMessageKey:e?.messageId||"",lastExecutionKey:a,lastExecutionPath:n,lastWritebackStatus:"",lastFailureStage:"",lastSlotBindingKey:e?.slotBindingKey||"",lastSlotRevisionKey:e?.slotRevisionKey||"",lastSlotTransactionId:e?.slotTransactionId||"",lastSourceMessageId:e?.sourceMessageId||e?.messageId||"",lastSourceSwipeId:e?.sourceSwipeId||e?.effectiveSwipeId||"",lastContentCommitted:!1,lastHostCommitApplied:!1,lastRefreshRequested:!1,lastRefreshConfirmed:!1,lastPreferredCommitMethod:"",lastAppliedCommitMethod:"",lastRefreshMethodCount:0,lastRefreshMethods:[],lastRefreshConfirmChecks:0,lastRefreshConfirmedBy:""}),us("info",`\u6B63\u5728\u624B\u52A8\u6267\u884C ${t.name}`,{sticky:!0,noticeId:o});try{let i=n===Ds.MANUAL_LOCAL_TRANSFORM?await ja(t,e):await Av(t,e,!0),l=Date.now()-r;if(i?.success){let y=ne(s),p=i?.meta?.writebackDetails||{};return Wa(s,{lastStatus:"success",lastError:"",lastDurationMs:l,lastTraceId:e?.traceId||"",successCount:(y?.runtime?.successCount||0)+1,lastMessageKey:e?.messageId||"",lastExecutionKey:a,lastExecutionPath:n,lastWritebackStatus:i?.meta?.writebackStatus||Be.NOT_APPLICABLE,lastFailureStage:i?.meta?.failureStage||"",lastSlotBindingKey:e?.slotBindingKey||"",lastSlotRevisionKey:e?.slotRevisionKey||"",lastSlotTransactionId:e?.slotTransactionId||"",lastSourceMessageId:e?.sourceMessageId||e?.messageId||"",lastSourceSwipeId:e?.sourceSwipeId||e?.effectiveSwipeId||"",lastContentCommitted:!!p.contentCommitted,lastHostCommitApplied:!!p.hostCommitApplied,lastRefreshRequested:!!p.refreshRequested,lastRefreshConfirmed:!!p.refreshConfirmed,lastPreferredCommitMethod:p?.commit?.preferredMethod||"",lastAppliedCommitMethod:p?.commit?.appliedMethod||"",lastRefreshMethodCount:Array.isArray(p?.refresh?.requestMethods)?p.refresh.requestMethods.length:0,lastRefreshMethods:Array.isArray(p?.refresh?.requestMethods)?[...p.refresh.requestMethods]:[],lastRefreshConfirmChecks:Number(p?.refresh?.confirmChecks)||0,lastRefreshConfirmedBy:p?.refresh?.confirmedBy||""}),E("success",`${t.name} \u624B\u52A8\u6267\u884C\u5B8C\u6210`),us("success",`${t.name} \u624B\u52A8\u6267\u884C\u5B8C\u6210`,{duration:3200,noticeId:o}),{success:!0,duration:l,result:i}}let c=ne(s),d=i?.error||"\u5DE5\u5177\u6267\u884C\u5931\u8D25",u=i?.meta?.writebackDetails||{};return Wa(s,{lastStatus:"error",lastError:d,lastDurationMs:l,lastTraceId:e?.traceId||"",errorCount:(c?.runtime?.errorCount||0)+1,lastMessageKey:e?.messageId||"",lastExecutionKey:a,lastExecutionPath:n,lastWritebackStatus:i?.meta?.writebackStatus||Be.NOT_APPLICABLE,lastFailureStage:i?.meta?.failureStage||(n===Ds.MANUAL_COMPATIBILITY?Ge.COMPATIBILITY_EXECUTE:Ge.UNKNOWN),lastSlotBindingKey:e?.slotBindingKey||"",lastSlotRevisionKey:e?.slotRevisionKey||"",lastSlotTransactionId:e?.slotTransactionId||"",lastSourceMessageId:e?.sourceMessageId||e?.messageId||"",lastSourceSwipeId:e?.sourceSwipeId||e?.effectiveSwipeId||"",lastContentCommitted:!!u.contentCommitted,lastHostCommitApplied:!!u.hostCommitApplied,lastRefreshRequested:!!u.refreshRequested,lastRefreshConfirmed:!!u.refreshConfirmed,lastPreferredCommitMethod:u?.commit?.preferredMethod||"",lastAppliedCommitMethod:u?.commit?.appliedMethod||"",lastRefreshMethodCount:Array.isArray(u?.refresh?.requestMethods)?u.refresh.requestMethods.length:0,lastRefreshMethods:Array.isArray(u?.refresh?.requestMethods)?[...u.refresh.requestMethods]:[],lastRefreshConfirmChecks:Number(u?.refresh?.confirmChecks)||0,lastRefreshConfirmedBy:u?.refresh?.confirmedBy||""}),E("error",`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${d}`),us("error",`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${d}`,{sticky:!0,noticeId:o}),{success:!1,duration:l,error:d,result:i}}catch(i){let l=Date.now()-r,c=ne(s),d=i?.message||String(i);throw Wa(s,{lastStatus:"error",lastError:d,lastDurationMs:l,lastTraceId:e?.traceId||"",errorCount:(c?.runtime?.errorCount||0)+1,lastMessageKey:e?.messageId||"",lastExecutionKey:a,lastExecutionPath:n,lastWritebackStatus:Be.NOT_APPLICABLE,lastFailureStage:n===Ds.MANUAL_COMPATIBILITY?Ge.COMPATIBILITY_EXECUTE:Ge.UNKNOWN,lastSlotBindingKey:e?.slotBindingKey||"",lastSlotRevisionKey:e?.slotRevisionKey||"",lastSlotTransactionId:e?.slotTransactionId||"",lastSourceMessageId:e?.sourceMessageId||e?.messageId||"",lastSourceSwipeId:e?.sourceSwipeId||e?.effectiveSwipeId||"",lastContentCommitted:!1,lastHostCommitApplied:!1,lastRefreshRequested:!1,lastRefreshConfirmed:!1,lastPreferredCommitMethod:"",lastAppliedCommitMethod:"",lastRefreshMethodCount:0,lastRefreshMethods:[],lastRefreshConfirmChecks:0,lastRefreshConfirmedBy:""}),E("error",`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${d}`),us("error",`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${d}`,{sticky:!0,noticeId:o}),i}}async function Ha(t){if(!t)return{success:!1,error:"\u7F3A\u5C11\u5DE5\u5177ID"};let e=ne(t);if(!e)return{success:!1,error:"\u5DE5\u5177\u4E0D\u5B58\u5728"};if(!e.enabled)return Br(t,{lastMessageKey:"",lastExecutionKey:"",lastExecutionPath:"",lastWritebackStatus:Be.NOT_APPLICABLE,lastFailureStage:"",lastContentCommitted:!1,lastHostCommitApplied:!1,lastRefreshRequested:!1,lastRefreshConfirmed:!1,lastPreferredCommitMethod:"",lastAppliedCommitMethod:"",lastRefreshMethodCount:0,lastRefreshMethods:[],lastRefreshConfirmChecks:0,lastRefreshConfirmedBy:""},{touchLastRunAt:!1,emitEvent:!1}),us("warning",`${e.name} \u672A\u542F\u7528\uFF0C\u65E0\u6CD5\u624B\u52A8\u6267\u884C`,{duration:2800,noticeId:`yyt-tool-run-${t}`}),{success:!1,error:"\u5DE5\u5177\u672A\u542F\u7528"};let r=await gs({runSource:"MANUAL"});return Cv(e,r)}async function Ya(t){if(!t)return{success:!1,error:"\u7F3A\u5C11\u5DE5\u5177ID"};let e=ne(t);if(!e)return{success:!1,error:"\u5DE5\u5177\u4E0D\u5B58\u5728"};let r=await gs({runSource:"MANUAL_PREVIEW"});return Mt.previewExtraction(e,r)}var _v,Ds,dc,uc=N(()=>{tr();mn();hs();ac();Xe();H();_v=R.createScope("ToolTrigger"),Ds={MANUAL_POST_RESPONSE_API:"manual_post_response_api",MANUAL_LOCAL_TRANSFORM:"manual_local_transform",MANUAL_COMPATIBILITY:"manual_compatibility"},dc=null});var mf={};se(mf,{TOOL_CONFIG_PANEL_STYLES:()=>pc,createToolConfigPanel:()=>Zr,default:()=>Dv});function gf(t){return t?t.length!==void 0&&typeof t.get=="function"?t.get(0):t:null}function Iv(t){if(!Number.isFinite(t)||t<=0)return"\u4ECE\u672A";let e=Date.now()-t;if(e<6e4)return`${Math.floor(e/1e3)} \u79D2\u524D`;if(e<36e5)return`${Math.floor(e/6e4)} \u5206\u949F\u524D`;if(e<864e5)return`${Math.floor(e/36e5)} \u5C0F\u65F6\u524D`;try{return new Date(t).toLocaleString()}catch{return"\u672A\u77E5"}}function Zr(t={}){let{id:e,toolId:r,postResponseHint:s,previewDialogId:o,previewTitle:n="\u6D4B\u8BD5\u63D0\u53D6\u7ED3\u679C"}=t;return{id:e,toolId:r,renderTo(a){let i=gf(a);if(!i)return;if(i._yytToolPanelCleanup)try{i._yytToolPanelCleanup()}catch{}let l=()=>this.renderTo(a),c=ne(r);if(!c){i.innerHTML='<div class="yyt-empty-state-small">\u5DE5\u5177\u914D\u7F6E\u52A0\u8F7D\u5931\u8D25</div>';return}let d=m("div",{className:"yyt-tool-panel",dataset:{toolId:r}}),u=[];d.appendChild(Rv(c,r,l,s)),d.appendChild(Mv(c));let y=Pv(c,r,l);u.push(y),d.appendChild(y.el);let p=Nv(c,r,l,a,o,n);u.push(p),d.appendChild(p.el),i.innerHTML="",i.appendChild(d),i._yytToolPanelCleanup=()=>{for(let f of u)try{f.destroy()}catch{}delete i._yytToolPanelCleanup}},destroy(a){let i=gf(a);if(i?._yytToolPanelCleanup)try{i._yytToolPanelCleanup()}catch{}},getStyles(){return pc}}}function Rv(t,e,r,s){let o=m("div",{className:"yyt-tool-panel-hero"}),n=m("div",{className:"yyt-tool-panel-hero-row1"});n.appendChild(m("div",{className:"yyt-tool-panel-hero-icon",text:"\u{1F527}"})),n.appendChild(m("div",{className:"yyt-tool-panel-hero-name",text:t.name||e}));let a=m("div",{className:"yyt-tool-panel-hero-actions"});a.appendChild(fe({label:"\u25B6 \u7ACB\u5373\u6267\u884C\u4E00\u6B21",size:"small",onClick:async()=>{try{await Ha(e),E("success","\u5DF2\u89E6\u53D1\u624B\u52A8\u6267\u884C")}catch(f){E("error",`\u6267\u884C\u5931\u8D25\uFF1A${f?.message||f}`)}}}).el),a.appendChild(fe({label:"\u{1F4BE} \u4FDD\u5B58\u914D\u7F6E",size:"small",variant:"primary",onClick:()=>{E("success","\u914D\u7F6E\u5DF2\u4FDD\u5B58"),r()}}).el),n.appendChild(a),o.appendChild(n),t.description&&o.appendChild(m("div",{className:"yyt-tool-panel-hero-desc",text:t.description}));let i=m("div",{className:"yyt-tool-panel-hero-chips"}),c=(t.output?.mode||"follow_ai")==="post_response_api"?"\u989D\u5916 AI \u89E3\u6790\uFF08\u81EA\u52A8\uFF09":"\u968F AI \u8F93\u51FA\uFF08\u624B\u52A8\uFF09";i.appendChild(m("span",{className:"yyt-tool-hero-chip mode",text:c}));let d=t.output?.apiPreset||t.apiPreset||"";d&&i.appendChild(m("span",{className:"yyt-tool-hero-chip preset",text:`API: ${d}`}));let u=t.extraction?.regexPresetId||"";if(u){let f=Se.getPreset(u);i.appendChild(m("span",{className:"yyt-tool-hero-chip preset",text:`\u6B63\u5219: ${f?f.name:"\u5DF2\u5220\u9664"}`}))}else i.appendChild(m("span",{className:"yyt-tool-hero-chip",text:"\u6B63\u5219: \u672A\u7ED1\u5B9A",style:{opacity:"0.6"}}));let y=t.worldbooks?.presetId||"";if(y){let f=pt.getPreset(y);f&&i.appendChild(m("span",{className:"yyt-tool-hero-chip preset",text:`\u4E16\u754C\u4E66: ${f.name}`}))}let p=t.runtime?.lastStatus;if(p){let f=p==="success"?"status-success":p==="failed"?"status-failed":"";i.appendChild(m("span",{className:`yyt-tool-hero-chip ${f}`,text:`\u4E0A\u6B21\u6267\u884C \xB7 ${p}`}))}return o.appendChild(i),o}function Mv(t){let e=m("div",{className:"yyt-tool-runtime-row"}),r=t.runtime||{},s=(a,i,l="")=>{let c=m("div",{className:"yyt-tool-runtime-stat"});return c.appendChild(m("span",{className:"yyt-tool-runtime-stat-label",text:a})),c.appendChild(m("span",{className:`yyt-tool-runtime-stat-value ${l}`,text:i})),c},o=r.lastStatus==="success"?"\u2713 \u4E0A\u6B21\u6210\u529F":r.lastStatus==="failed"?"\u2717 \u4E0A\u6B21\u5931\u8D25":r.lastStatus==="idle"?"\u5F85\u547D":r.lastStatus||"\u5F85\u547D",n=r.lastStatus==="success"?"success":r.lastStatus==="failed"?"error":"muted";return e.appendChild(s("\u72B6\u6001",o,n)),e.appendChild(s("\u6700\u8FD1\u8FD0\u884C",Iv(r.lastRunAt),"muted")),e.appendChild(s("\u6210\u529F",String(r.successCount||0),"success")),e.appendChild(s("\u5931\u8D25",String(r.errorCount||0),r.errorCount?"error":"muted")),e}function Pv(t,e,r){let s=m("div",{style:{display:"flex",flexDirection:"column"}});s.appendChild(bn({label:"\u8F93\u51FA\u6A21\u5F0F",hint:"\u51B3\u5B9A\u6267\u884C\u8DEF\u5F84 + \u81EA\u52A8/\u624B\u52A8",control:Qe({value:t.output?.mode||"follow_ai",options:[{value:"follow_ai",label:"follow_ai \u2014 \u968F AI \u8F93\u51FA\uFF08\u624B\u52A8\u89E6\u53D1\uFF09"},{value:"post_response_api",label:"post_response_api \u2014 \u989D\u5916 AI \u89E3\u6790\uFF08\u81EA\u52A8\uFF09"}],onChange:l=>{let c=ne(e)||{};Re(e,{...c,output:{...c.output||{},mode:l,enabled:l==="post_response_api"}}),r()}})}));let o=(()=>{try{return Rr()||[]}catch{return[]}})();s.appendChild(bn({label:"API \u9884\u8BBE",hint:"\u989D\u5916 AI \u89E3\u6790\u65F6\u4F7F\u7528",control:Qe({value:t.output?.apiPreset||t.apiPreset||"",options:[{value:"",label:"\u2014\u2014 \u8DDF\u968F\u5F53\u524D\u4E3B API \u2014\u2014"},...o.map(l=>({value:l.name,label:l.name}))],onChange:l=>{let c=ne(e)||{};Re(e,{...c,apiPreset:l,output:{...c.output||{},apiPreset:l}}),r()}})}));let n=(()=>{try{return yn()||[]}catch{return[]}})();s.appendChild(bn({label:"Ai \u6307\u4EE4\u9884\u8BBE",hint:'\u9644\u52A0\u5728 system/user \u524D\u7684\u6307\u4EE4\uFF1B\u9009"\u65E0"\u5373\u4E0D\u542F\u7528',control:Qe({value:t.bypass?.enabled&&t.bypass?.presetId||"",options:[{value:"",label:"\u2014\u2014 \u65E0 \u2014\u2014"},...n.map(l=>({value:l.id,label:`${l.name}${l.isDefault?" [\u9ED8\u8BA4]":""}`}))],onChange:l=>{let c=ne(e)||{};Re(e,{...c,bypass:{enabled:!!l,presetId:l||""}}),r()}})}));let a=Se.listPresets();s.appendChild(bn({label:"\u6B63\u5219\u63D0\u53D6\u9884\u8BBE",hint:"\u51B3\u5B9A\u4ECE AI \u56DE\u590D\u4E2D\u5982\u4F55\u62BD\u53D6",control:Qe({value:t.extraction?.regexPresetId||"",options:[{value:"",label:"\u2014\u2014 \u65E0\uFF08\u4E0D\u8FDB\u884C\u63D0\u53D6\uFF09 \u2014\u2014"},...a.map(l=>({value:l.id,label:l.name}))],onChange:l=>{let c=ne(e)||{},d={...c.extraction||{},regexPresetId:l};if(l){let u=Se.getPreset(l);E("success",`\u5DF2\u7ED1\u5B9A\u6B63\u5219\u9884\u8BBE\uFF1A${u?.name||l}`)}else E("success","\u5DF2\u89E3\u7ED1\u6B63\u5219\u9884\u8BBE\uFF0C\u5DE5\u5177\u5C06\u4E0D\u8FDB\u884C\u5185\u5BB9\u63D0\u53D6");Re(e,{...c,extraction:d}),r()}})}));let i=pt.listPresets();return s.appendChild(bn({label:"\u4E16\u754C\u4E66\u9884\u8BBE",hint:"\u6CE8\u5165\u5230 prompt \u7684 {{toolWorldbookContent}}",control:Qe({value:t.worldbooks?.presetId||"",options:[{value:"",label:"\u2014\u2014 \u65E0\uFF08\u4FDD\u7559\u5DE5\u5177\u539F\u6709\u4E16\u754C\u4E66\u8BBE\u7F6E\uFF09 \u2014\u2014"},...i.map(l=>({value:l.id,label:l.name}))],onChange:l=>{let c=ne(e)||{},d={...c.worldbooks||{},presetId:l};if(l){let u=pt.getPreset(l);E("success",`\u5DF2\u7ED1\u5B9A\u4E16\u754C\u4E66\u9884\u8BBE\uFF1A${u?.name||l}`)}else E("success","\u5DF2\u89E3\u7ED1\u4E16\u754C\u4E66\u9884\u8BBE\uFF0C\u5DE5\u5177\u4E0D\u518D\u6CE8\u5165\u4E16\u754C\u4E66\u5185\u5BB9");Re(e,{...c,worldbooks:d}),r()}})})),Wt({heading:"\u7ED1\u5B9A",icon:"\u{1F517}",content:[s]})}function bn({label:t,hint:e,control:r}){let s=m("div",{className:"yyt-tool-binding-row"}),o=m("div",{className:"yyt-tool-binding-label"});return o.appendChild(m("span",{className:"yyt-tool-binding-label-text",text:t})),e&&o.appendChild(m("span",{className:"yyt-tool-binding-label-hint",text:e})),s.appendChild(o),r.el.classList.add("small"),r.el.style.padding="7px 10px",r.el.style.fontSize="12px",s.appendChild(r.el),s.appendChild(m("div",{className:"yyt-tool-binding-meta"})),s}function Nv(t,e,r,s,o,n){let a=m("div",{style:{display:"flex",flexDirection:"column"}});a.appendChild(m("div",{style:{marginBottom:"8px",display:"flex",alignItems:"center",gap:"10px"}},m("div",{style:{flex:"1"}},m("div",{text:"\u63D0\u793A\u8BCD\u6A21\u677F",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}}),m("div",{text:"\u7528 {{macro}} \u5F15\u7528\u4E0A\u4E0B\u6587\u3002\u6A21\u677F\u5185\u5BB9\u4F1A\u4F5C\u4E3A\u53D1\u7ED9\u989D\u5916 AI \u7684 user \u6D88\u606F\u3002",style:{fontSize:"11px",color:"var(--yyt-text-muted)",lineHeight:"1.6"}})),fe({label:"\u{1F504} \u91CD\u7F6E\u4E3A\u9ED8\u8BA4",size:"small",variant:"ghost",onClick:()=>{if(!window.confirm("\u7528\u5DE5\u5177\u9ED8\u8BA4\u6A21\u677F\u8986\u76D6\u5F53\u524D\u6A21\u677F\uFF1F"))return;let x=na(e)||{},T=ne(e)||{};Re(e,{...T,promptTemplate:x.promptTemplate||""}),r()}}).el));let i=m("textarea",{className:"yyt-textarea yyt-code-textarea",attrs:{rows:"10",placeholder:"\u8F93\u5165\u63D0\u793A\u8BCD\u6A21\u677F..."},style:{width:"100%",resize:"vertical",fontFamily:"ui-monospace, monospace",fontSize:"12px",lineHeight:"1.7"}});i.value=t.promptTemplate||"",i.addEventListener("change",()=>{let x=ne(e)||{};Re(e,{...x,promptTemplate:i.value})}),a.appendChild(i),a.appendChild(m("div",{className:"yyt-macro-inline",html:"\u53EF\u7528\u5B8F\uFF1A<code>{{toolPromptMacro}}</code> <code>{{toolContentMacro}}</code> <code>{{toolWorldbookContent}}</code> <code>{{lastAiMessage}}</code> <code>{{recentMessagesText}}</code> <code>{{rawRecentMessagesText}}</code> <code>{{userMessage}}</code> <code>{{toolName}}</code> <code>{{toolId}}</code>"})),a.appendChild(m("hr",{className:"yyt-zone-divider"})),a.appendChild(m("div",{style:{marginBottom:"8px"}},m("div",{text:"\u63D0\u53D6\u914D\u7F6E",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}}),m("div",{text:'\u4ECE AI \u56DE\u590D\u4E2D\u62BD\u53D6\u5E76\u5199\u56DE\u3002\u5B8C\u6574\u89C4\u5219\u7531"\u6B63\u5219\u63D0\u53D6\u9884\u8BBE"\u51B3\u5B9A\uFF0C\u8FD9\u91CC\u53EA\u914D\u7F6E\u5DE5\u5177\u53C2\u6570\u3002',style:{fontSize:"11px",color:"var(--yyt-text-muted)",lineHeight:"1.6"}})));let l=m("div",{style:{display:"grid",gridTemplateColumns:"1fr auto",gap:"12px",alignItems:"end",marginBottom:"12px"}}),c=m("div",{className:"yyt-form-group",style:{margin:0}});c.appendChild(m("label",{text:"\u6700\u5927\u63D0\u53D6 AI \u6D88\u606F\u6570",style:{fontSize:"12px",fontWeight:"600",color:"var(--yyt-text-secondary, rgba(255,255,255,0.55))"}}));let d=m("input",{className:"yyt-input",attrs:{type:"number",min:"1",max:"50"},style:{padding:"7px 10px",fontSize:"12px"}});d.value=String(Number(t.extraction?.maxMessages)||5),d.addEventListener("change",()=>{let x=ne(e)||{};Re(e,{...x,extraction:{...x.extraction||{},maxMessages:Math.max(1,parseInt(d.value,10)||5)}})}),c.appendChild(d),l.appendChild(c);let u=m("div",{className:"yyt-form-group",style:{margin:0}});u.appendChild(m("label",{html:"&nbsp;",style:{fontSize:"12px"}})),u.appendChild(fe({label:"\u{1F50D} \u6D4B\u8BD5\u63D0\u53D6",onClick:async()=>{try{let x=await Ya(e);$v(s,x,o,n)}catch(x){E("error",`\u6D4B\u8BD5\u63D0\u53D6\u5931\u8D25\uFF1A${x?.message||x}`)}}}).el),l.appendChild(u),a.appendChild(l);let y=m("div",{className:"yyt-form-group",style:{margin:0}});y.appendChild(m("label",{html:'\u5199\u56DE\u6807\u7B7E <span style="font-size:10px;color:var(--yyt-text-muted);font-weight:500;">\uFF08\u591A\u6807\u7B7E\u63D0\u53D6\u65F6\u6307\u5B9A\u552F\u4E00\u5199\u56DE\u6807\u7B7E\uFF1B\u7559\u7A7A\u5219\u63D0\u53D6\u9996\u4E2A\uFF09</span>',style:{fontSize:"12px",fontWeight:"600",color:"var(--yyt-text-secondary, rgba(255,255,255,0.55))"}}));let p=`yyt-writeback-dl-${e}-${Math.random().toString(36).slice(2,6)}`,f=m("datalist",{attrs:{id:p}}),g=(()=>{let x=new Set,T=[];function v(C){if(C)for(let _ of C.rules||[]){if(_?.enabled===!1||_?.type!=="include")continue;let k=String(_.value||"").trim();!k||x.has(k)||(x.add(k),T.push(k))}}let L=t.extraction?.regexPresetId;if(L)v(Se.getPreset(L));else for(let C of Se.listPresets())v(C);return T})();for(let x of g)f.appendChild(m("option",{attrs:{value:x}}));let h=m("input",{className:"yyt-input",attrs:{type:"text",placeholder:"\u5982 status / content\uFF08\u6765\u81EA\u6B63\u5219\u9884\u8BBE\u7684 include \u6807\u7B7E\uFF09",list:p,autocomplete:"off"},style:{padding:"7px 10px",fontSize:"12px"}});return h.value=t.extraction?.writebackTag||"",h.addEventListener("change",()=>{let x=ne(e)||{};Re(e,{...x,extraction:{...x.extraction||{},writebackTag:h.value.trim()}})}),y.appendChild(h),y.appendChild(f),a.appendChild(y),Wt({heading:"\u914D\u7F6E",icon:"\u2699",content:[a]})}function $v(t,e,r,s){if(!Z()||!xe(t))return;let n=`${ds}-${r||"extraction-preview"}`,a=Array.isArray(e?.messageEntries)?e.messageEntries:[],i=a.length>0?`
      <div class="yyt-form-group">
        <label>\u9010\u6761\u6D88\u606F\u9884\u89C8</label>
        <div class="yyt-preview-message-list">
          ${a.map((l,c)=>{let d=c===a.length-1?"\u6700\u65B0\u6D88\u606F":`\u6700\u8FD1\u7684\u7B2C ${a.length-c} \u6761\u6D88\u606F`;return`
              <div class="yyt-preview-message-item">
                <div class="yyt-preview-message-title">${Qr(d)}</div>
                <div><label>\u539F\u6587</label><pre class="yyt-preview-box yyt-preview-pre">${Qr(l.rawText||"\u65E0\u53EF\u7528\u6D88\u606F")}</pre></div>
                <div><label>\u6B63\u6587\u63D0\u53D6</label><pre class="yyt-preview-box yyt-preview-pre">${Qr(l.filteredText||"\u6B63\u6587\u89C4\u5219\u672A\u547D\u4E2D")}</pre></div>
                <div><label>\u5DE5\u5177\u6807\u7B7E\u63D0\u53D6</label><pre class="yyt-preview-box yyt-preview-pre">${Qr(l.extractedText||"\u672A\u63D0\u53D6\u5230\u5185\u5BB9")}</pre></div>
              </div>
            `}).join("")}
        </div>
      </div>
    `:"";t.append(zo({id:n,title:s,width:"720px",wide:!0,body:`
      <div class="yyt-form-group">
        <label>\u63D0\u53D6\u89C4\u5219</label>
        <div class="yyt-preview-box">${Qr((e?.selectors||[]).join(`
`)||"\u65E0")}</div>
      </div>
      <div class="yyt-form-group">
        <label>\u539F\u59CB\u5185\u5BB9\u6C47\u603B</label>
        <pre class="yyt-preview-box yyt-preview-pre">${Qr(e?.sourceText||"\u65E0\u53EF\u7528\u6D88\u606F")}</pre>
      </div>
      <div class="yyt-form-group">
        <label>\u6B63\u6587\u63D0\u53D6\u6C47\u603B</label>
        <pre class="yyt-preview-box yyt-preview-pre">${Qr(e?.filteredSourceText||"\u6B63\u6587\u89C4\u5219\u672A\u547D\u4E2D")}</pre>
      </div>
      <div class="yyt-form-group">
        <label>\u5DE5\u5177\u6807\u7B7E\u63D0\u53D6\u6C47\u603B</label>
        <pre class="yyt-preview-box yyt-preview-pre">${Qr(e?.extractedText||"\u672A\u63D0\u53D6\u5230\u5185\u5BB9")}</pre>
      </div>
      ${i}
    `})),Ko(t,n,{onSave:l=>l()}),t.find(`#${n}-save`).text("\u5173\u95ED"),t.find(`#${n}-cancel`).remove()}function Qr(t){return t==null?"":String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}var h1,pc,Dv,Ao=N(()=>{fr();Xe();Xe();tr();Bo();To();uc();H();Kr();Ys();h1=R.createScope("ToolConfigPanel"),pc=`
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
`;Dv=Zr});var bf={};se(bf,{SummaryToolPanel:()=>hf,default:()=>Lv});var hf,Lv,xf=N(()=>{Ao();hf=Zr({id:"summaryToolPanel",toolId:"summaryTool",postResponseHint:"\u70B9\u51FB\u201C\u7ACB\u5373\u6267\u884C\u4E00\u6B21\u201D\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u8FDB\u884C\u6458\u8981\u89E3\u6790\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 boo_FM
\u6216 regex:<boo_FM>([\\s\\S]*?)</boo_FM>`,previewDialogId:"summary-extraction-preview",defaultInjectionOrder:1e4,lorebookLogTag:"SummaryToolPanel"}),Lv=hf});var vf={};se(vf,{StatusBlockPanel:()=>wf,default:()=>Ov});var wf,Ov,Tf=N(()=>{Ao();wf=Zr({id:"statusBlockPanel",toolId:"statusBlock",postResponseHint:"\u70B9\u51FB\u201C\u7ACB\u5373\u6267\u884C\u4E00\u6B21\u201D\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u751F\u6210\u4E3B\u89D2\u72B6\u6001\u680F\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 status_block
\u6216 regex:<status_block>([\\s\\S]*?)</status_block>`,previewDialogId:"status-extraction-preview",defaultInjectionOrder:10001,lorebookLogTag:"StatusBlockPanel"}),Ov=wf});var _f={};se(_f,{YouyouReviewPanel:()=>Sf,default:()=>Bv});var Sf,Bv,Ef=N(()=>{Ao();Sf=Zr({id:"youyouReviewPanel",toolId:"youyouReview",postResponseHint:"\u70B9\u51FB\u201C\u7ACB\u5373\u6267\u884C\u4E00\u6B21\u201D\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u5728\u672B\u5C3E\u751F\u6210\u5C0F\u5E7D\u70B9\u8BC4\u4E0E\u5267\u60C5\u94A9\u5B50\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 youyou
\u6216 regex:<youyou>([\\s\\S]*?)</youyou>`,previewDialogId:"youyou-review-extraction-preview",previewTitle:"\u5C0F\u5E7D\u70B9\u8BC4\u63D0\u53D6\u9884\u89C8"}),Bv=Sf});function Af(t){return t?t.length!==void 0&&typeof t.get=="function"?t.get(0):t:null}function zv(t){if(!Number.isFinite(t)||t<=0)return"\u4ECE\u672A";let e=Date.now()-t;if(e<6e4)return`${Math.floor(e/1e3)} \u79D2\u524D`;if(e<36e5)return`${Math.floor(e/6e4)} \u5206\u949F\u524D`;if(e<864e5)return`${Math.floor(e/36e5)} \u5C0F\u65F6\u524D`;try{return new Date(t).toLocaleString()}catch{return"\u672A\u77E5"}}function es(t){return t==null?"":String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Ga(t={}){let{id:e,toolId:r,previewDialogId:s,previewTitle:o="\u6D4B\u8BD5\u63D0\u53D6\u7ED3\u679C",processorDirections:n=[],processorOptions:a=[],heroHint:i=""}=t;return{id:e,toolId:r,renderTo(l){let c=Af(l);if(!c)return;if(c._yytLocalToolPanelCleanup)try{c._yytLocalToolPanelCleanup()}catch{}let d=()=>this.renderTo(l),u=ne(r);if(!u){c.innerHTML='<div class="yyt-empty-state-small">\u5DE5\u5177\u914D\u7F6E\u52A0\u8F7D\u5931\u8D25</div>';return}let y=m("div",{className:"yyt-tool-panel",dataset:{toolId:r}}),p=[];y.appendChild(Kv(u,r,d,n,i)),y.appendChild(Uv(u));let f=jv(u,r,d);p.push(f),y.appendChild(f.el);let g=Fv(u,r,d,l,n,a,s,o);p.push(g),y.appendChild(g.el),c.innerHTML="",c.appendChild(y),c._yytLocalToolPanelCleanup=()=>{for(let h of p)try{h.destroy()}catch{}delete c._yytLocalToolPanelCleanup}},destroy(l){let c=Af(l);if(c?._yytLocalToolPanelCleanup)try{c._yytLocalToolPanelCleanup()}catch{}},getStyles(){return""}}}function Kv(t,e,r,s,o){let n=m("div",{className:"yyt-tool-panel-hero"}),a=m("div",{className:"yyt-tool-panel-hero-row1"});a.appendChild(m("div",{className:"yyt-tool-panel-hero-icon",text:"\u2699"})),a.appendChild(m("div",{className:"yyt-tool-panel-hero-name",text:t.name||e}));let i=m("div",{className:"yyt-tool-panel-hero-actions"});i.appendChild(fe({label:"\u25B6 \u7ACB\u5373\u6267\u884C\u4E00\u6B21",size:"small",onClick:async()=>{try{await Ha(e),E("success","\u5DF2\u89E6\u53D1\u624B\u52A8\u6267\u884C")}catch(g){E("error",`\u6267\u884C\u5931\u8D25\uFF1A${g?.message||g}`)}}}).el),i.appendChild(fe({label:"\u{1F4BE} \u4FDD\u5B58\u914D\u7F6E",size:"small",variant:"primary",onClick:()=>{E("success","\u914D\u7F6E\u5DF2\u4FDD\u5B58"),r()}}).el),a.appendChild(i),n.appendChild(a),t.description&&n.appendChild(m("div",{className:"yyt-tool-panel-hero-desc",text:t.description})),o&&n.appendChild(m("div",{className:"yyt-tool-panel-hero-desc",text:o}));let l=m("div",{className:"yyt-tool-panel-hero-chips"}),c=t.output?.autoTrigger!==!1;l.appendChild(m("span",{className:"yyt-tool-hero-chip mode",text:`\u672C\u5730\u811A\u672C\uFF08${c?"\u81EA\u52A8":"\u624B\u52A8"}\uFF09`}));let d=t.processor?.direction||s[0]?.key||"",u=s.find(g=>g.key===d)?.label||d;u&&l.appendChild(m("span",{className:"yyt-tool-hero-chip preset",text:`\u65B9\u5411: ${u}`}));let y=t.output?.overwrite!==!1;l.appendChild(m("span",{className:"yyt-tool-hero-chip preset",text:`\u5199\u56DE: ${y?"\u8986\u76D6":"\u8FFD\u52A0"}`}));let p=t.extraction?.regexPresetId||"";if(p){let g=Se.getPreset(p);g&&l.appendChild(m("span",{className:"yyt-tool-hero-chip preset",text:`\u6B63\u5219: ${g.name}`}))}let f=t.runtime?.lastStatus;if(f){let g=f==="success"?"status-success":f==="failed"?"status-failed":"";l.appendChild(m("span",{className:`yyt-tool-hero-chip ${g}`,text:`\u4E0A\u6B21\u6267\u884C \xB7 ${f}`}))}return n.appendChild(l),n}function Uv(t){let e=m("div",{className:"yyt-tool-runtime-row"}),r=t.runtime||{},s=(a,i,l="")=>{let c=m("div",{className:"yyt-tool-runtime-stat"});return c.appendChild(m("span",{className:"yyt-tool-runtime-stat-label",text:a})),c.appendChild(m("span",{className:`yyt-tool-runtime-stat-value ${l}`,text:i})),c},o=r.lastStatus==="success"?"\u2713 \u4E0A\u6B21\u6210\u529F":r.lastStatus==="failed"?"\u2717 \u4E0A\u6B21\u5931\u8D25":"\u5F85\u547D",n=r.lastStatus==="success"?"success":r.lastStatus==="failed"?"error":"muted";return e.appendChild(s("\u72B6\u6001",o,n)),e.appendChild(s("\u6700\u8FD1\u8FD0\u884C",zv(r.lastRunAt),"muted")),e.appendChild(s("\u6210\u529F",String(r.successCount||0),"success")),e.appendChild(s("\u5931\u8D25",String(r.errorCount||0),r.errorCount?"error":"muted")),e}function jv(t,e,r){let s=m("div",{style:{display:"flex",flexDirection:"column"}}),o=Se.listPresets();return s.appendChild(yc({label:"\u6B63\u5219\u63D0\u53D6\u9884\u8BBE",hint:"\u51B3\u5B9A\u4ECE AI \u56DE\u590D\u4E2D\u5982\u4F55\u62BD\u53D6\u8981\u672C\u5730\u5904\u7406\u7684\u6587\u672C",control:Qe({value:t.extraction?.regexPresetId||"",options:[{value:"",label:"\u2014\u2014 \u65E0\uFF08\u4E0D\u8FDB\u884C\u63D0\u53D6\uFF09 \u2014\u2014"},...o.map(n=>({value:n.id,label:n.name}))],onChange:n=>{let a=ne(e)||{},i={...a.extraction||{},regexPresetId:n};if(n){let l=Se.getPreset(n);E("success",`\u5DF2\u7ED1\u5B9A\u6B63\u5219\u9884\u8BBE\uFF1A${l?.name||n}`)}else E("success","\u5DF2\u89E3\u7ED1\u6B63\u5219\u9884\u8BBE\uFF0C\u5DE5\u5177\u5C06\u4E0D\u8FDB\u884C\u5185\u5BB9\u63D0\u53D6");Re(e,{...a,extraction:i}),r()}})})),s.appendChild(yc({label:"\u5199\u56DE\u65B9\u5F0F",hint:"\u5904\u7406\u540E\u7684\u7ED3\u679C\u5982\u4F55\u56DE\u5199\u5230 AI \u6D88\u606F",control:Qe({value:t.output?.overwrite!==!1?"replace":"append",options:[{value:"replace",label:"\u8986\u76D6\u539F\u5DE5\u5177\u5757"},{value:"append",label:"\u8FFD\u52A0\u5230\u672B\u5C3E"}],onChange:n=>{let a=ne(e)||{};Re(e,{...a,output:{...a.output||{},overwrite:n==="replace",enabled:!0,mode:"local_transform"}}),r()}})})),s.appendChild(yc({label:"\u81EA\u52A8\u89E6\u53D1",hint:"\u6536\u5230 AI \u56DE\u590D\u540E\u662F\u5426\u81EA\u52A8\u6267\u884C\u6B64\u811A\u672C",control:Qe({value:t.output?.autoTrigger!==!1?"auto":"manual",options:[{value:"auto",label:"\u81EA\u52A8\uFF08\u6536\u5230\u56DE\u590D\u5373\u6267\u884C\uFF09"},{value:"manual",label:"\u624B\u52A8\uFF08\u4EC5\u70B9\u51FB\u6309\u94AE\u6267\u884C\uFF09"}],onChange:n=>{let a=ne(e)||{};Re(e,{...a,output:{...a.output||{},autoTrigger:n==="auto",enabled:!0,mode:"local_transform"}}),r()}})})),Wt({heading:"\u7ED1\u5B9A",icon:"\u{1F517}",content:[s]})}function yc({label:t,hint:e,control:r}){let s=m("div",{className:"yyt-tool-binding-row"}),o=m("div",{className:"yyt-tool-binding-label"});return o.appendChild(m("span",{className:"yyt-tool-binding-label-text",text:t})),e&&o.appendChild(m("span",{className:"yyt-tool-binding-label-hint",text:e})),s.appendChild(o),r.el.style.padding="7px 10px",r.el.style.fontSize="12px",s.appendChild(r.el),s.appendChild(m("div",{className:"yyt-tool-binding-meta"})),s}function Fv(t,e,r,s,o,n,a,i){let l=m("div",{style:{display:"flex",flexDirection:"column"}});l.appendChild(m("div",{style:{marginBottom:"10px"}},m("div",{text:"\u6267\u884C\u65B9\u5411",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}}),m("div",{text:"\u51B3\u5B9A\u672C\u5730\u811A\u672C\u8FD0\u884C\u54EA\u4E2A\u53D8\u6362\u8DEF\u5F84\u3002",style:{fontSize:"11px",color:"var(--yyt-text-muted)",lineHeight:"1.6"}})));let c=t.processor?.direction||o[0]?.key||"",d=Qe({value:c,options:o.map(g=>({value:g.key,label:g.description?`${g.label} \u2014 ${g.description}`:g.label})),onChange:g=>{let h=ne(e)||{};Re(e,{...h,processor:{...h.processor||{},direction:g}}),r()}});if(d.el.style.padding="7px 10px",d.el.style.fontSize="12px",l.appendChild(d.el),l.appendChild(m("hr",{className:"yyt-zone-divider"})),n.length>0){l.appendChild(m("div",{style:{marginBottom:"10px"}},m("div",{text:"\u5904\u7406\u9879",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}}),m("div",{text:"\u52FE\u9009\u8981\u5305\u542B\u5728\u672C\u6B21\u53D8\u6362\u4E2D\u7684\u9879\u76EE\u3002",style:{fontSize:"11px",color:"var(--yyt-text-muted)",lineHeight:"1.6"}})));let g=m("div",{style:{display:"flex",flexDirection:"column"}}),h=t.processor?.options||{};for(let x of n){let T=St({label:x.label,hint:x.description||"",checked:h[x.key]===!0,onChange:v=>{let L=ne(e)||{};Re(e,{...L,processor:{...L.processor||{},options:{...L.processor?.options||{},[x.key]:v}}})}});g.appendChild(T.el)}l.appendChild(g),l.appendChild(m("hr",{className:"yyt-zone-divider"}))}l.appendChild(m("div",{style:{marginBottom:"10px"}},m("div",{text:"\u63D0\u53D6\u914D\u7F6E",style:{fontSize:"12px",fontWeight:"700",color:"var(--yyt-text)"}}),m("div",{text:'\u4ECE AI \u56DE\u590D\u4E2D\u62BD\u53D6\u8981\u672C\u5730\u5904\u7406\u7684\u6587\u672C\u3002\u5B8C\u6574\u89C4\u5219\u7531"\u6B63\u5219\u63D0\u53D6\u9884\u8BBE"\u51B3\u5B9A\uFF0C\u8FD9\u91CC\u53EA\u914D\u7F6E\u5DE5\u5177\u53C2\u6570\u3002',style:{fontSize:"11px",color:"var(--yyt-text-muted)",lineHeight:"1.6"}})));let u=m("div",{style:{display:"grid",gridTemplateColumns:"1fr auto",gap:"12px",alignItems:"end"}}),y=m("div",{className:"yyt-form-group",style:{margin:0}});y.appendChild(m("label",{text:"\u6700\u5927\u63D0\u53D6 AI \u6D88\u606F\u6570",style:{fontSize:"12px",fontWeight:"600",color:"var(--yyt-text-secondary, rgba(255,255,255,0.55))"}}));let p=m("input",{className:"yyt-input",attrs:{type:"number",min:"1",max:"50"},style:{padding:"7px 10px",fontSize:"12px"}});p.value=String(Number(t.extraction?.maxMessages)||5),p.addEventListener("change",()=>{let g=ne(e)||{};Re(e,{...g,extraction:{...g.extraction||{},maxMessages:Math.max(1,parseInt(p.value,10)||5)}})}),y.appendChild(p),u.appendChild(y);let f=m("div",{className:"yyt-form-group",style:{margin:0}});return f.appendChild(m("label",{html:"&nbsp;",style:{fontSize:"12px"}})),f.appendChild(fe({label:"\u{1F50D} \u6D4B\u8BD5\u63D0\u53D6",onClick:async()=>{try{let g=await Ya(e);Wv(s,g,a,i)}catch(g){E("error",`\u6D4B\u8BD5\u63D0\u53D6\u5931\u8D25\uFF1A${g?.message||g}`)}}}).el),u.appendChild(f),l.appendChild(u),Wt({heading:"\u914D\u7F6E",icon:"\u2699",content:[l]})}function Wv(t,e,r,s){if(!Z()||!xe(t))return;let n=`${ds}-${r||"extraction-preview"}`,a=Array.isArray(e?.messageEntries)?e.messageEntries:[],i=a.length>0?`
      <div class="yyt-form-group">
        <label>\u9010\u6761\u6D88\u606F\u9884\u89C8</label>
        <div class="yyt-preview-message-list">
          ${a.map((l,c)=>{let d=c===a.length-1?"\u6700\u65B0\u6D88\u606F":`\u6700\u8FD1\u7684\u7B2C ${a.length-c} \u6761\u6D88\u606F`;return`
              <div class="yyt-preview-message-item">
                <div class="yyt-preview-message-title">${es(d)}</div>
                <div><label>\u539F\u6587</label><pre class="yyt-preview-box yyt-preview-pre">${es(l.rawText||"\u65E0\u53EF\u7528\u6D88\u606F")}</pre></div>
                <div><label>\u6B63\u6587\u63D0\u53D6</label><pre class="yyt-preview-box yyt-preview-pre">${es(l.filteredText||"\u6B63\u6587\u89C4\u5219\u672A\u547D\u4E2D")}</pre></div>
                <div><label>\u5DE5\u5177\u6807\u7B7E\u63D0\u53D6</label><pre class="yyt-preview-box yyt-preview-pre">${es(l.extractedText||"\u672A\u63D0\u53D6\u5230\u5185\u5BB9")}</pre></div>
              </div>
            `}).join("")}
        </div>
      </div>
    `:"";t.append(zo({id:n,title:s,width:"720px",wide:!0,body:`
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
    `})),Ko(t,n,{onSave:l=>l()}),t.find(`#${n}-save`).text("\u5173\u95ED"),t.find(`#${n}-cancel`).remove()}var R1,fc=N(()=>{fr();Xe();tr();uc();H();Ao();Kr();R1=R.createScope("LocalTransformToolPanel")});var Cf={};se(Cf,{EscapeTransformToolPanel:()=>kf,default:()=>Hv});var kf,Hv,If=N(()=>{fc();kf=Ga({id:"escapeTransformToolPanel",toolId:"escapeTransformTool",previewDialogId:"escape-transform-extraction-preview",previewTitle:"\u8F6C\u4E49\u5904\u7406\u63D0\u53D6\u9884\u89C8",heroHint:"\u4ECE\u6700\u8FD1 AI \u6D88\u606F\u63D0\u53D6\u6587\u672C\u540E\uFF0C\u5728\u672C\u5730\u6267\u884C\u8F6C\u4E49\u6216\u53BB\u8F6C\u4E49\uFF0C\u518D\u6309\u6240\u9009\u65B9\u5F0F\u5199\u56DE\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\u6216\u6B63\u5219\uFF0C\u4F8B\u5982\uFF1A
content
regex:<content>([\\s\\S]*?)</content>`,processorDirections:[{key:"escape",label:"\u8F6C\u4E49",description:"\u628A\u539F\u59CB\u5B57\u7B26\u8F6C\u6362\u6210\u8F6C\u4E49\u5E8F\u5217\u3002"},{key:"unescape",label:"\u53BB\u8F6C\u4E49",description:"\u628A\u8F6C\u4E49\u5E8F\u5217\u8FD8\u539F\u6210\u539F\u59CB\u5B57\u7B26\u3002"}],processorOptions:[{key:"doubleQuote",label:"\u53CC\u5F15\u53F7",description:'\u5904\u7406 " \u4E0E \\"\u3002'},{key:"singleQuote",label:"\u5355\u5F15\u53F7",description:"\u5904\u7406 ' \u4E0E \\'\u3002"},{key:"newline",label:"\u6362\u884C\u7B26",description:"\u5904\u7406\u6362\u884C\u4E0E \\n\u3002"}]}),Hv=kf});var Mf={};se(Mf,{PunctuationTransformToolPanel:()=>Rf,default:()=>Yv});var Rf,Yv,Pf=N(()=>{fc();Rf=Ga({id:"punctuationTransformToolPanel",toolId:"punctuationTransformTool",previewDialogId:"punctuation-transform-extraction-preview",previewTitle:"\u4E2D\u6587\u6807\u70B9\u66FF\u6362\u63D0\u53D6\u9884\u89C8",heroHint:"\u4ECE\u6700\u8FD1 AI \u6D88\u606F\u63D0\u53D6\u6587\u672C\u540E\uFF0C\u5728\u672C\u5730\u628A\u82F1\u6587\u6807\u70B9\u66FF\u6362\u6210\u4E2D\u6587\u6807\u70B9\uFF0C\u518D\u6309\u6240\u9009\u65B9\u5F0F\u5199\u56DE\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\u6216\u6B63\u5219\uFF0C\u4F8B\u5982\uFF1A
content
regex:<content>([\\s\\S]*?)</content>`,processorDirections:[{key:"en_to_zh",label:"\u82F1\u6587\u8F6C\u4E2D\u6587",description:"\u6309\u52FE\u9009\u9879\u628A\u82F1\u6587\u6807\u70B9\u66FF\u6362\u4E3A\u4E2D\u6587\u6807\u70B9\u3002"}],processorOptions:[{key:"comma",label:"\u9017\u53F7 ,",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u9017\u53F7\u3002"},{key:"period",label:"\u53E5\u53F7 .",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u53E5\u53F7\u3002"},{key:"exclamation",label:"\u611F\u53F9\u53F7 !",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u611F\u53F9\u53F7\u3002"},{key:"question",label:"\u95EE\u53F7 ?",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u95EE\u53F7\u3002"},{key:"semicolon",label:"\u5206\u53F7 ;",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u5206\u53F7\u3002"},{key:"colon",label:"\u5192\u53F7 :",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u5192\u53F7\u3002"},{key:"leftParen",label:"\u5DE6\u62EC\u53F7 (",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u5DE6\u62EC\u53F7\u3002"},{key:"rightParen",label:"\u53F3\u62EC\u53F7 )",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u53F3\u62EC\u53F7\u3002"}]}),Yv=Rf});var $f={};se($f,{BypassPanel:()=>Nf,default:()=>Gv});var Nf,Gv,Df=N(()=>{Je();To();Xe();Nf={id:"bypassPanel",_getActivePresetId(t){return t.find(".yyt-bypass-editor-content").data("presetId")||null},render(t){let e=ue.getPresetList(),r=ue.getDefaultPresetId();return`
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
    `},_renderPresetItem(t,e){let r=_r&&_r[t.id];return`
      <div class="yyt-bypass-preset-item ${e?"yyt-default":""}" data-preset-id="${t.id}">
        <div class="yyt-bypass-preset-info">
          <span class="yyt-bypass-preset-name">${oe(t.name)}</span>
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
      `;let e=ue.getDefaultPresetId()===t.id,r=_r&&_r[t.id];return`
      <div class="yyt-bypass-editor-content" data-preset-id="${t.id}">
        <div class="yyt-bypass-editor-header">
          <div class="yyt-bypass-editor-title">
            <input type="text" class="yyt-input yyt-bypass-name-input" 
                   value="${oe(t.name)}" placeholder="\u9884\u8BBE\u540D\u79F0">
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
                 value="${oe(t.description||"")}" placeholder="\u9884\u8BBE\u63CF\u8FF0\uFF08\u53EF\u9009\uFF09">
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
                  placeholder="\u8F93\u5165\u6D88\u606F\u5185\u5BB9...">${oe(t.content||"")}</textarea>
      </div>
    `},bindEvents(t,e){let r=Z();!r||!xe(t)||(t.off(".yytBypass"),this._bindPresetListEvents(t,r),this._bindEditorEvents(t,r),this._bindFileEvents(t,r),Dt(t,{namespace:"yytBypassSelect",selectors:[".yyt-bypass-role-select"]}))},_bindPresetListEvents(t,e){t.on("click.yytBypass",".yyt-bypass-preset-item",r=>{if(e(r.target).closest(".yyt-bypass-quick-delete").length)return;let s=e(r.currentTarget).data("presetId");this._selectPreset(t,e,s)}),t.on("click.yytBypass",".yyt-bypass-quick-delete",async r=>{r.stopPropagation();let s=e(r.currentTarget).data("presetId");if(!s||!await yr("\u5220\u9664\u9884\u8BBE","\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u4E2A\u9884\u8BBE\u5417\uFF1F",{danger:!0}))return;let n=ue.deletePreset(s);n.success?(t.find(".yyt-bypass-editor-content").data("presetId")===s&&t.find(".yyt-bypass-editor").html(`
            <div class="yyt-bypass-empty">
              <i class="fa-solid fa-shield-halved"></i>
              <p>\u9009\u62E9\u6216\u521B\u5EFA Ai \u6307\u4EE4\u9884\u8BBE</p>
            </div>
          `),this._refreshPresetList(t,e),E("success","\u9884\u8BBE\u5DF2\u5220\u9664")):E("error",n?.message||"\u5220\u9664\u9884\u8BBE\u5931\u8D25")}),t.on("click.yytBypass","#yyt-bypass-add",()=>{this._createNewPreset(t,e)})},_bindEditorEvents(t,e){t.on("click.yytBypass","#yyt-bypass-save",()=>{this._saveCurrentPreset(t,e)}),t.on("click.yytBypass","#yyt-bypass-delete",()=>{this._deleteCurrentPreset(t,e)}),t.on("click.yytBypass","#yyt-bypass-duplicate",()=>{this._duplicateCurrentPreset(t,e)}),t.on("click.yytBypass","#yyt-bypass-set-default",()=>{this._setAsDefault(t,e)}),t.on("click.yytBypass","#yyt-bypass-add-message",()=>{this._addMessage(t,e)}),t.on("click.yytBypass",".yyt-bypass-move-up",r=>{let s=e(r.currentTarget).closest(".yyt-bypass-message"),o=s.prev(".yyt-bypass-message");o.length&&(o.before(s),this._refreshMessageIndices(t,e))}),t.on("click.yytBypass",".yyt-bypass-move-down",r=>{let s=e(r.currentTarget).closest(".yyt-bypass-message"),o=s.next(".yyt-bypass-message");o.length&&(o.after(s),this._refreshMessageIndices(t,e))}),t.on("click.yytBypass",".yyt-bypass-insert-message",r=>{let s=e(r.currentTarget).closest(".yyt-bypass-message");this._insertMessageAfter(t,e,s)}),t.on("click.yytBypass",".yyt-bypass-delete-message",r=>{e(r.currentTarget).closest(".yyt-bypass-message").remove(),this._refreshMessageIndices(t,e)}),t.on("change.yytBypass",".yyt-bypass-message-enabled",r=>{e(r.currentTarget).closest(".yyt-bypass-message").toggleClass("yyt-disabled",!e(r.currentTarget).is(":checked"))})},_bindFileEvents(t,e){t.on("click.yytBypass","#yyt-bypass-import",()=>{t.find("#yyt-bypass-import-file").click()}),t.on("change.yytBypass","#yyt-bypass-import-file",async r=>{let s=r.target.files[0];if(s){try{let o=await jo(s),n=ue.importPresets(o);E(n.success?"success":"error",n.message),n.success&&this.renderTo(t)}catch(o){E("error",`\u5BFC\u5165\u5931\u8D25: ${o.message}`)}e(r.target).val("")}}),t.on("click.yytBypass","#yyt-bypass-export",()=>{try{let r=ue.exportPresets();Uo(r,`bypass_presets_${Date.now()}.json`),E("success","\u9884\u8BBE\u5DF2\u5BFC\u51FA")}catch(r){E("error",`\u5BFC\u51FA\u5931\u8D25: ${r.message}`)}})},_selectPreset(t,e,r){let s=ue.getPreset(r);s&&(t.find(".yyt-bypass-preset-item").removeClass("yyt-active"),t.find(`.yyt-bypass-preset-item[data-preset-id="${r}"]`).addClass("yyt-active"),t.find(".yyt-bypass-editor").html(this._renderEditor(s)),Dt(t,{namespace:"yytBypassSelect",selectors:[".yyt-bypass-role-select"]}))},_createNewPreset(t,e){let r=`bypass_${Date.now()}`,s=ue.createPreset({id:r,name:"\u65B0 Ai \u6307\u4EE4\u9884\u8BBE",description:"",messages:[]});s.success?(this.renderTo(t),this._selectPreset(t,e,r),E("success","\u9884\u8BBE\u5DF2\u521B\u5EFA")):E("error",s?.message||"\u521B\u5EFA\u9884\u8BBE\u5931\u8D25")},_saveCurrentPreset(t,e){let r=t.find(".yyt-bypass-editor-content"),s=r.data("presetId");if(!s)return;let o=r.find(".yyt-bypass-name-input").val().trim(),n=r.find(".yyt-bypass-description-input").val().trim();if(!o){E("warning","\u8BF7\u8F93\u5165\u9884\u8BBE\u540D\u79F0"),r.find(".yyt-bypass-name-input").trigger("focus").trigger("select");return}let a=[];r.find(".yyt-bypass-message").each(function(){let l=e(this);a.push({id:l.data("messageId"),role:l.find(".yyt-bypass-role-select").val(),content:l.find(".yyt-bypass-message-content").val(),enabled:l.find(".yyt-bypass-message-enabled").is(":checked"),deletable:String(l.data("deletable"))!=="false"})});let i=ue.updatePreset(s,{name:o,description:n,messages:a});i.success?(E("success","\u9884\u8BBE\u5DF2\u4FDD\u5B58"),this._refreshPresetList(t,e)):E("error",i?.message||"\u4FDD\u5B58\u9884\u8BBE\u5931\u8D25")},async _deleteCurrentPreset(t,e){let s=t.find(".yyt-bypass-editor-content").data("presetId");if(!s||!await yr("\u5220\u9664\u9884\u8BBE","\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u4E2A\u9884\u8BBE\u5417\uFF1F",{danger:!0}))return;let n=ue.deletePreset(s);n.success?(this.renderTo(t),E("success","\u9884\u8BBE\u5DF2\u5220\u9664")):E("error",n?.message||"\u5220\u9664\u9884\u8BBE\u5931\u8D25")},_duplicateCurrentPreset(t,e){let s=t.find(".yyt-bypass-editor-content").data("presetId");if(!s)return;let o=`bypass_${Date.now()}`,n=ue.duplicatePreset(s,o);n.success?(this.renderTo(t),this._selectPreset(t,e,o),E("success","\u9884\u8BBE\u5DF2\u590D\u5236")):E("error",n?.message||"\u590D\u5236\u9884\u8BBE\u5931\u8D25")},_setAsDefault(t,e){let s=t.find(".yyt-bypass-editor-content").data("presetId");if(!s)return;ue.setDefaultPresetId(s),this._refreshPresetList(t,e);let o=ue.getPreset(s);o&&t.find(".yyt-bypass-editor").html(this._renderEditor(o)),E("success","\u5DF2\u8BBE\u4E3A\u9ED8\u8BA4\u9884\u8BBE")},_addMessage(t,e){let r=t.find(".yyt-bypass-messages"),s={id:`msg_${Date.now()}`,role:"SYSTEM",content:"",enabled:!0,deletable:!0},o=r.find(".yyt-bypass-message").length;r.append(this._renderMessageItem(s,o))},_insertMessageAfter(t,e,r){let s=t.find(".yyt-bypass-messages"),o={id:`msg_${Date.now()}`,role:"SYSTEM",content:"",enabled:!0,deletable:!0},n=this._renderMessageItem(o,0),a=e(n);r.after(a),this._refreshMessageIndices(t,e)},_refreshMessageIndices(t,e){t.find(".yyt-bypass-message").each(function(r){e(this).attr("data-message-index",r)})},_refreshPresetList(t,e){let r=ue.getPresetList(),s=ue.getDefaultPresetId(),o=this._getActivePresetId(t);t.find(".yyt-bypass-preset-list").html(r.map(n=>this._renderPresetItem(n,n.id===s)).join("")),o&&t.find(`.yyt-bypass-preset-item[data-preset-id="${o}"]`).addClass("yyt-active")},destroy(t){!Z()||!xe(t)||(dt(t,"yytBypassSelect"),t.off(".yytBypass"))},getStyles(){return`
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
    `},renderTo(t){let e=this.render({});t.html(e),this.bindEvents(t,{})}},Gv=Nf});var mc={};se(mc,{SettingsPanel:()=>Kf,applyTheme:()=>zf,applyUiPreferences:()=>gc,default:()=>Vv});function xn({id:t,checked:e=!1,title:r="",hint:s=""}){return`
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
  `}function Of(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window}function wn(){return Of()?.document||document}function Bf(t=wn()){return t?.documentElement||document.documentElement}function zf(t,e=wn()){let r=Bf(e),s={...qv,...Lf[t]||Lf["dark-blue"]};Object.entries(s).forEach(([o,n])=>{r.style.setProperty(o,n)}),r.setAttribute("data-yyt-theme",t)}function gc(t={},e=wn()){let r=Bf(e),{theme:s="dark-blue",compactMode:o=!1,animationEnabled:n=!0}=t||{};zf(s,e),r.classList.toggle("yyt-compact-mode",!!o),r.classList.toggle("yyt-no-animation",!n)}var qv,Lf,Kf,Vv,hc=N(()=>{Je();gn();H();Ba();Xe();qv={"--yyt-accent":"#7bb7ff","--yyt-accent-glow":"rgba(123, 183, 255, 0.4)","--yyt-accent-soft":"rgba(123, 183, 255, 0.15)","--yyt-accent-strong":"#a5d4ff","--yyt-on-accent":"#0a0d13","--yyt-bg-base":"#0a0d13","--yyt-surface":"#0f1219","--yyt-surface-2":"#151a24","--yyt-surface-3":"#1c2231","--yyt-surface-hover":"#1c2231","--yyt-surface-active":"#232b3e","--yyt-border":"rgba(255, 255, 255, 0.06)","--yyt-border-soft":"rgba(255, 255, 255, 0.04)","--yyt-border-strong":"rgba(255, 255, 255, 0.12)","--yyt-text":"rgba(255, 255, 255, 0.92)","--yyt-text-secondary":"rgba(255, 255, 255, 0.55)","--yyt-text-muted":"rgba(255, 255, 255, 0.35)","--yyt-focus-ring":"0 0 0 2px rgba(123, 183, 255, 1), 0 0 0 4px rgba(123, 183, 255, 0.15)","--yyt-control-bg":"#0f1219","--yyt-control-bg-hover":"#151a24","--yyt-control-bg-active":"#1c2231","--yyt-control-bg-strong":"#151a24","--yyt-control-bg-focus":"#151a24","--yyt-control-border":"rgba(255, 255, 255, 0.08)","--yyt-control-border-hover":"rgba(255, 255, 255, 0.14)","--yyt-control-border-focus":"rgba(123, 183, 255, 0.5)","--yyt-control-shadow":"none","--yyt-control-shadow-hover":"none","--yyt-control-shadow-focus":"none","--yyt-control-shadow-active":"none","--yyt-select-surface":"#151a24","--yyt-select-option-bg":"#1c2231","--yyt-select-option-hover-bg":"#232b3e","--yyt-select-option-selected-bg":"#2a3450","--yyt-select-option-border":"rgba(123, 183, 255, 0.15)","--yyt-select-option-selected-border":"rgba(123, 183, 255, 0.3)","--yyt-select-dropdown-shadow":"0 8px 24px rgba(0, 0, 0, 0.4)","--yyt-select-arrow-color":"rgba(255, 255, 255, 0.4)"},Lf={"dark-blue":{"--yyt-on-accent":"#0a0d13"},"dark-purple":{"--yyt-accent":"#a78bfa","--yyt-accent-glow":"rgba(167, 139, 250, 0.4)","--yyt-accent-soft":"rgba(167, 139, 250, 0.15)","--yyt-accent-strong":"#c4b5fd","--yyt-bg-base":"#0d0a14","--yyt-surface":"#12101c","--yyt-surface-2":"#1a1726","--yyt-surface-3":"#221e32","--yyt-surface-hover":"#221e32","--yyt-surface-active":"#2a2540","--yyt-on-accent":"#0d0a14","--yyt-control-bg":"#12101c","--yyt-control-bg-hover":"#1a1726","--yyt-control-bg-active":"#221e32","--yyt-control-bg-strong":"#1a1726","--yyt-control-bg-focus":"#1a1726","--yyt-control-border-focus":"rgba(167, 139, 250, 0.5)","--yyt-select-surface":"#1a1726","--yyt-select-option-bg":"#221e32","--yyt-select-option-hover-bg":"#2a2540","--yyt-select-option-selected-bg":"#332d50","--yyt-select-option-border":"rgba(167, 139, 250, 0.15)","--yyt-select-option-selected-border":"rgba(167, 139, 250, 0.3)","--yyt-focus-ring":"0 0 0 2px rgba(167, 139, 250, 1), 0 0 0 4px rgba(167, 139, 250, 0.15)"},"dark-green":{"--yyt-accent":"#4ade80","--yyt-accent-glow":"rgba(74, 222, 128, 0.4)","--yyt-accent-soft":"rgba(74, 222, 128, 0.15)","--yyt-accent-strong":"#86efac","--yyt-bg-base":"#0a120d","--yyt-surface":"#0f1912","--yyt-surface-2":"#151f1a","--yyt-surface-3":"#1c2824","--yyt-surface-hover":"#1c2824","--yyt-surface-active":"#233530","--yyt-on-accent":"#0a120d","--yyt-control-bg":"#0f1912","--yyt-control-bg-hover":"#151f1a","--yyt-control-bg-active":"#1c2824","--yyt-control-bg-strong":"#151f1a","--yyt-control-bg-focus":"#151f1a","--yyt-control-border-focus":"rgba(74, 222, 128, 0.5)","--yyt-select-surface":"#151f1a","--yyt-select-option-bg":"#1c2824","--yyt-select-option-hover-bg":"#233530","--yyt-select-option-selected-bg":"#2a4038","--yyt-select-option-border":"rgba(74, 222, 128, 0.15)","--yyt-select-option-selected-border":"rgba(74, 222, 128, 0.3)","--yyt-focus-ring":"0 0 0 2px rgba(74, 222, 128, 1), 0 0 0 4px rgba(74, 222, 128, 0.15)"},light:{"--yyt-accent":"#3b82f6","--yyt-accent-glow":"rgba(59, 130, 246, 0.3)","--yyt-accent-soft":"rgba(59, 130, 246, 0.1)","--yyt-accent-strong":"#93c5fd","--yyt-bg-base":"#f5f7fa","--yyt-surface":"#edf0f5","--yyt-surface-2":"#e4e8ef","--yyt-surface-3":"#dbe0e9","--yyt-surface-hover":"#dbe0e9","--yyt-surface-active":"#d1d7e2","--yyt-text":"rgba(15, 23, 42, 0.92)","--yyt-text-secondary":"rgba(15, 23, 42, 0.55)","--yyt-text-muted":"rgba(15, 23, 42, 0.35)","--yyt-border":"rgba(15, 23, 42, 0.08)","--yyt-border-soft":"rgba(15, 23, 42, 0.04)","--yyt-border-strong":"rgba(15, 23, 42, 0.14)","--yyt-focus-ring":"0 0 0 2px rgba(59, 130, 246, 1), 0 0 0 4px rgba(59, 130, 246, 0.12)","--yyt-on-accent":"#ffffff","--yyt-control-bg":"#edf0f5","--yyt-control-bg-hover":"#e4e8ef","--yyt-control-bg-active":"#dbe0e9","--yyt-control-bg-strong":"#e4e8ef","--yyt-control-bg-focus":"#e4e8ef","--yyt-control-border":"rgba(15, 23, 42, 0.1)","--yyt-control-border-hover":"rgba(15, 23, 42, 0.18)","--yyt-control-border-focus":"rgba(59, 130, 246, 0.5)","--yyt-control-shadow":"none","--yyt-control-shadow-hover":"none","--yyt-control-shadow-focus":"none","--yyt-control-shadow-active":"none","--yyt-select-surface":"#e4e8ef","--yyt-select-option-bg":"#edf0f5","--yyt-select-option-hover-bg":"#dbe0e9","--yyt-select-option-selected-bg":"#dbeafe","--yyt-select-option-border":"rgba(59, 130, 246, 0.12)","--yyt-select-option-selected-border":"rgba(59, 130, 246, 0.3)","--yyt-select-dropdown-shadow":"0 8px 24px rgba(15, 23, 42, 0.1)","--yyt-select-arrow-color":"rgba(15, 23, 42, 0.4)"}};Kf={id:"settingsPanel",render(){let t=zt.getSettings(),e=t.debug?.enableDebugLog===!0,r=this._getAutomationRuntime();return`
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
            ${xn({id:"yyt-setting-enableDebugLog",checked:t.enableDebugLog,title:"\u542F\u7528\u8C03\u8BD5\u65E5\u5FD7",hint:"\u5F00\u542F\u540E Logger \u9762\u677F\u5C06\u8BB0\u5F55 DEBUG \u7EA7\u522B\u65E5\u5FD7\uFF0C\u5173\u95ED\u4EC5\u8BB0\u5F55 INFO \u53CA\u4EE5\u4E0A"})}
          </div>
          <div class="yyt-settings-hint" style="margin-top: 8px;">
            <i class="fa-solid fa-terminal"></i> \u5728\u300C\u65E5\u5FD7\u300D\u9762\u677F\u4E2D\u67E5\u770B\u3001\u641C\u7D22\u548C\u5BFC\u51FA\u63D2\u4EF6\u8FD0\u884C\u65E5\u5FD7
          </div>
        </div>

        <div class="yyt-flow-section">
          <div class="yyt-flow-heading"><span class="yyt-flow-heading-icon"><i class="fa-solid fa-clock-rotate-left"></i></span>\u6267\u884C\u8BB0\u5F55</div>
          <div class="yyt-form-group">
            ${xn({id:"yyt-setting-saveExecutionHistory",checked:t.saveExecutionHistory,title:"\u4FDD\u5B58\u6267\u884C\u5386\u53F2",hint:"\u8BB0\u5F55\u5DE5\u5177\u6267\u884C\u5386\u53F2\uFF0C\u4FBF\u4E8E\u95EE\u9898\u6392\u67E5"})}
          </div>
        </div>

        <div class="yyt-flow-section">
          <div class="yyt-flow-heading"><span class="yyt-flow-heading-icon"><i class="fa-solid fa-eye"></i></span>UI \u663E\u793A</div>
          <div class="yyt-form-group">
            ${xn({id:"yyt-setting-showRuntimeBadge",checked:t.showRuntimeBadge,title:"\u663E\u793A\u8FD0\u884C\u72B6\u6001\u5FBD\u7AE0",hint:"\u5728\u5DE5\u5177\u5361\u7247\u4E0A\u663E\u793A\u8FD0\u884C\u72B6\u6001\u6307\u793A\u5668"})}
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
            ${xn({id:"yyt-setting-compactMode",checked:t.compactMode,title:"\u7D27\u51D1\u6A21\u5F0F",hint:"\u51CF\u5C11\u5361\u7247\u95F4\u8DDD\uFF0C\u663E\u793A\u66F4\u591A\u5185\u5BB9"})}
          </div>

          <div class="yyt-form-group">
            ${xn({id:"yyt-setting-animationEnabled",checked:t.animationEnabled,title:"\u542F\u7528\u52A8\u753B\u6548\u679C",hint:"\u754C\u9762\u8FC7\u6E21\u548C\u4EA4\u4E92\u52A8\u753B"})}
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
    `},_renderMacroList(){return Ut.getAvailableVariables().map(t=>`
        <div class="yyt-list-row">
          <code>${t.name}</code>
          <span>${t.description}</span>
        </div>
      `).join("")},bindEvents(t){let e=Z();if(!e||!xe(t))return;let r=this;t.off(".yytSettings"),t.on("click.yytSettings",".yyt-settings-tab",o=>{let n=e(o.currentTarget).data("tab");t.find(".yyt-settings-tab").removeClass("yyt-active"),e(o.currentTarget).addClass("yyt-active"),t.find(".yyt-settings-tab-content").removeClass("yyt-active"),t.find(`.yyt-settings-tab-content[data-tab="${n}"]`).addClass("yyt-active")}),t.on("click.yytSettings","#yyt-settings-save",()=>{r._saveSettings(t)}),t.on("click.yytSettings","#yyt-settings-reset",async()=>{await yr("\u91CD\u7F6E\u8BBE\u7F6E","\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u8BBE\u7F6E\u4E3A\u9ED8\u8BA4\u503C\u5417\uFF1F",{danger:!0})&&(zt.resetSettings(),gc(fn.ui,wn()),r.renderTo(t),E("success","\u8BBE\u7F6E\u5DF2\u91CD\u7F6E"))}),Dt(t,{namespace:"yytSettingsSelect",selectors:["#yyt-setting-queueStrategy","#yyt-setting-theme"]});let s=zt.getDebugSettings();R.setLevel(s.enableDebugLog?ye.DEBUG:ye.INFO)},_saveSettings(t){let e=Z(),r=[{id:"yyt-setting-maxConcurrent",min:1,max:10,label:"\u6700\u5927\u5E76\u53D1\u6570"},{id:"yyt-setting-maxRetries",min:0,max:10,label:"\u6700\u5927\u91CD\u8BD5\u6B21\u6570"},{id:"yyt-setting-retryDelayMs",min:1e3,max:6e4,label:"\u91CD\u8BD5\u95F4\u9694"},{id:"yyt-setting-requestTimeoutMs",min:1e4,max:3e5,label:"\u8BF7\u6C42\u8D85\u65F6\u65F6\u95F4"},{id:"yyt-setting-automationSettleMs",min:0,max:1e4,label:"\u7B49\u5F85\u7A33\u5B9A\u65F6\u95F4"},{id:"yyt-setting-automationCooldownMs",min:0,max:6e4,label:"\u81EA\u52A8\u5316\u51B7\u5374\u65F6\u95F4"}];for(let o of r){let n=t.find(`#${o.id}`),a=n.val(),i=parseInt(a,10);if(isNaN(i)||i<o.min||i>o.max){E("warning",`${o.label} \u987B\u5728 ${o.min} ~ ${o.max} \u4E4B\u95F4`),n.trigger("focus").trigger("select");return}}let s={executor:{maxConcurrent:parseInt(t.find("#yyt-setting-maxConcurrent").val(),10)||3,maxRetries:parseInt(t.find("#yyt-setting-maxRetries").val(),10)||2,retryDelayMs:parseInt(t.find("#yyt-setting-retryDelayMs").val(),10)||5e3,requestTimeoutMs:parseInt(t.find("#yyt-setting-requestTimeoutMs").val(),10)||9e4,queueStrategy:t.find("#yyt-setting-queueStrategy").val()||"fifo"},automation:{settleMs:parseInt(t.find("#yyt-setting-automationSettleMs").val(),10)||1200,cooldownMs:parseInt(t.find("#yyt-setting-automationCooldownMs").val(),10)||5e3,maxConcurrentSlots:zt.getSettings()?.automation?.maxConcurrentSlots||1},debug:{enableDebugLog:t.find("#yyt-setting-enableDebugLog").is(":checked"),saveExecutionHistory:t.find("#yyt-setting-saveExecutionHistory").is(":checked"),showRuntimeBadge:t.find("#yyt-setting-showRuntimeBadge").is(":checked")},ui:{theme:t.find("#yyt-setting-theme").val()||"dark-blue",compactMode:t.find("#yyt-setting-compactMode").is(":checked"),animationEnabled:t.find("#yyt-setting-animationEnabled").is(":checked")}};zt.saveSettings(s),R.setLevel(s.debug.enableDebugLog?ye.DEBUG:ye.INFO),gc(s.ui,wn()),E("success","\u8BBE\u7F6E\u5DF2\u4FDD\u5B58")},_getAutomationRuntime(){try{return Of()?.YouYouToolkit?.getAutomationRuntime?.()||null}catch{return null}},destroy(t){!Z()||!xe(t)||(dt(t,"yytSettingsSelect"),t.off(".yytSettings"))},getStyles(){return`
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
    `},renderTo(t){t.html(this.render({})),this.bindEvents(t,{})}},Vv=Kf});function Jv(t={},e=-1){return[t?.sourceId,t?.messageId,t?.message_id,t?.id,t?.mid,t?.mesid,t?.mes_id,t?.chat_index,t?.index,e].map(r=>Te(r))}function Xv(t=[],e=""){let r=Te(e);if(!r||!Array.isArray(t))return-1;for(let s=t.length-1;s>=0;s-=1){let o=t[s];if(Jv(o,s).includes(r))return s}return-1}function vn(t={},e={}){let r=Te(t?.sourceMessageId||t?.confirmedAssistantMessageId||t?.messageId);if(!r)return null;let s=hl({resolvedAt:Date.now(),runSource:e.runSource||t?.runSource||tt.MANUAL,traceId:t?.traceId||"",chatId:t?.chatId||"",sourceMessageId:r,sourceSwipeId:t?.sourceSwipeId||t?.effectiveSwipeId||"",effectiveSwipeId:t?.effectiveSwipeId||t?.sourceSwipeId||"swipe:current",slotBindingKey:t?.slotBindingKey||"",slotRevisionKey:t?.slotRevisionKey||"",slotTransactionId:t?.slotTransactionId||"",assistantContentFingerprint:t?.assistantContentFingerprint||"",assistantBaseFingerprint:t?.assistantBaseFingerprint||"",assistantText:t?.lastAiMessage||"",assistantBaseText:t?.assistantBaseText||"",targetMessageIndex:Xv(t?.chatMessages||t?.chatHistory||[],r)});return!s.slotBindingKey||!s.slotRevisionKey?null:s}async function bc({runSource:t=tt.MANUAL}={}){let e=await gs({runSource:t});return vn(e,{runSource:t})}async function Qv({messageId:t,swipeId:e="",runSource:r=tt.AUTO}={}){let s=await ms({messageId:t,swipeId:e,runSource:r});return vn(s,{runSource:r})}async function Uf(t=null,e={}){let r=t||null;if(typeof e.resolveTarget=="function")return await e.resolveTarget(r);let s=Te(e.runSource||r?.runSource)||tt.MANUAL,o=Te(e.messageId||r?.sourceMessageId),n=Te(e.swipeId||r?.sourceSwipeId||r?.effectiveSwipeId);return e.useMessageTarget===!0||s===tt.AUTO?o?Qv({messageId:o,swipeId:n,runSource:s}):null:bc({runSource:s})}function jf(t,e){let r=t||null,s=e||null;return!r||!s?{valid:!1,reason:"missing_target_snapshot"}:Te(r.sourceMessageId)!==Te(s.sourceMessageId)?{valid:!1,reason:"source_message_changed"}:Te(r.sourceSwipeId||r.effectiveSwipeId)!==Te(s.sourceSwipeId||s.effectiveSwipeId)?{valid:!1,reason:"source_swipe_changed"}:Te(r.slotRevisionKey)!==Te(s.slotRevisionKey)?{valid:!1,reason:"slot_revision_changed"}:{valid:!0,reason:"ok"}}var qa=N(()=>{hs();Ue()});function Er(t,e=""){return t==null?e:String(t).trim()||e}function Zv(t){if(!t||t?.is_user===!0||t?.is_system===!0)return!1;let e=String(t?.role||"").trim().toLowerCase();return e==="assistant"||e==="ai"||!e}function eT(t){return!t||typeof t!="object"||Array.isArray(t)?!1:!!(Array.isArray(t.tables)||typeof t.chatId=="string"&&t.chatId.length>0||typeof t.slotBindingKey=="string"&&t.slotBindingKey.length>0)}function Ff(t,e){if(!t)return null;let r=t[_s];if(!r)return null;let s=_e(e);return eT(r)?s===bt?r:null:r[s]||null}function Tn({loadMode:t=Es.EMPTY,mergeBaseOnly:e=!1,state:r=null,sourceKind:s=At.EMPTY,resolvedFromMessageId:o="",resolvedFromRevisionKey:n=""}={}){let a=wr(r)||null;return{loadMode:t,mergeBaseOnly:e,state:a,sourceKind:s,resolvedFromMessageId:Er(o,a?.sourceMessageId||""),resolvedFromRevisionKey:Er(n,a?.slotRevisionKey||"")}}function xc(t,e={}){let r=wr(t);return r?wr({...r,meta:{...r.meta||{},...e||{}}}):null}function Wf({runtime:t,targetSnapshot:e,currentMessageIndex:r=-1,templateTables:s=[],isolationKey:o}={}){let n=Array.isArray(t?.chat)?t.chat:[],a=Er(e?.slotRevisionKey,""),i=Er(e?.slotBindingKey,""),l=_e(o===void 0?"":o);if(r>=0&&r<n.length){let c=Ff(n[r],l),d=wr(c);if(d&&Er(d.slotRevisionKey,"")===a)return Tn({loadMode:Es.EXACT,mergeBaseOnly:!1,state:xc(d,{sourceKind:At.EXACT,isolationKey:l,resolvedFromMessageId:d.sourceMessageId,resolvedFromRevisionKey:d.slotRevisionKey}),sourceKind:At.EXACT,resolvedFromMessageId:d.sourceMessageId,resolvedFromRevisionKey:d.slotRevisionKey});if(d&&Er(d.slotBindingKey,"")===i){let u=xc({...d,slotRevisionKey:a||d.slotRevisionKey,sourceSwipeId:Er(e?.sourceSwipeId||e?.effectiveSwipeId,d.sourceSwipeId),meta:{...d.meta||{},sourceKind:At.BINDING,mergeBaseOnly:!0,fallbackFromBinding:!0,isolationKey:l,fallbackFromRevisionKey:Er(d.slotRevisionKey,""),requestedRevisionKey:a,resolvedFromMessageId:d.sourceMessageId,resolvedFromRevisionKey:d.slotRevisionKey}});return Tn({loadMode:Es.BINDING_FALLBACK,mergeBaseOnly:!0,state:u,sourceKind:At.BINDING,resolvedFromMessageId:d.sourceMessageId,resolvedFromRevisionKey:d.slotRevisionKey})}}if(r>0)for(let c=r-1;c>=0;c-=1){let d=n[c];if(!Zv(d))continue;let u=Ff(d,l),y=wr(u);if(!y||!Array.isArray(y.tables)||y.tables.length===0)continue;let p=xc({...y,slotBindingKey:i||y.slotBindingKey,slotRevisionKey:a||y.slotRevisionKey,sourceSwipeId:Er(e?.sourceSwipeId||e?.effectiveSwipeId,y.sourceSwipeId),meta:{...y.meta||{},sourceKind:At.HISTORY,mergeBaseOnly:!0,reconstructedFromHistory:!0,isolationKey:l,resolvedFromMessageId:y.sourceMessageId,resolvedFromRevisionKey:y.slotRevisionKey}});return Tn({loadMode:Es.HISTORY,mergeBaseOnly:!0,state:p,sourceKind:At.HISTORY,resolvedFromMessageId:y.sourceMessageId,resolvedFromRevisionKey:y.slotRevisionKey})}return Array.isArray(s)&&s.length>0?Tn({loadMode:Es.TEMPLATE,mergeBaseOnly:!1,state:rn(e,{tables:ae(s),meta:{fromTemplate:!0,isolationKey:l,sourceKind:At.TEMPLATE,resolvedFromMessageId:"",resolvedFromRevisionKey:""}}),sourceKind:At.TEMPLATE}):Tn({loadMode:Es.EMPTY,mergeBaseOnly:!1,state:rn(e,{meta:{isolationKey:l,sourceKind:At.EMPTY,resolvedFromMessageId:"",resolvedFromRevisionKey:""}}),sourceKind:At.EMPTY})}var Hf=N(()=>{Ue()});function Yf(){return wc||(wc=R.createScope("TableStateMirror")),wc}async function tT(t,e,r){try{await Fe(),await _a({chatId:t?.chatId,messageId:t?.sourceMessageId,swipeId:t?.sourceSwipeId||t?.effectiveSwipeId,isolationKey:e},Array.isArray(r)?r:[]),Yf().info("slot \u5DF2\u955C\u50CF\u5230 SQL",{chatId:t?.chatId,messageId:t?.sourceMessageId,tableCount:r?.length||0})}catch(s){Yf().warn("SQL \u955C\u50CF\u5931\u8D25\uFF08\u4E0D\u5F71\u54CD\u4E3B\u6D41\u7A0B\uFF09",{error:s?.message||String(s)})}}function Gf(t){return t==null?"":String(t).trim()}function rT(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window}function Tc(){try{let t=rT(),e=t?.SillyTavern||null,r=e?.getContext?.()||null,s=Array.isArray(r?.chat)?r.chat:[],o=Array.isArray(e?.chat)?e.chat:[],n=s.length?s:o;return{topWindow:t,api:e,context:r,chat:n,contextChat:s,apiChat:o}}catch{return{topWindow:null,api:null,context:null,chat:[],contextChat:[],apiChat:[]}}}function sT(t){if(!t||t?.is_user===!0||t?.is_system===!0)return!1;let e=String(t?.role||"").trim().toLowerCase();return e==="assistant"||e==="ai"||!e}function oT(t=[],e=""){let r=Gf(e);if(!Array.isArray(t)||!r)return-1;for(let s=t.length-1;s>=0;s-=1){let o=t[s];if(!sT(o))continue;if([o?.sourceId,o?.message_id,o?.messageId,o?.id,o?.mes_id,o?.mid,o?.mesid,o?.chat_index,o?.index,s].map(a=>Gf(a)).includes(r))return s}return-1}function Sc(t){let e=Tc(),r=oT(e.chat,t?.sourceMessageId);return r<0?{runtime:e,messageIndex:r,message:null}:{runtime:e,messageIndex:r,message:e.chat[r]||null}}function Xa(t,e,r){let s=o=>{!Array.isArray(o)||e<0||e>=o.length||(o[e]={...o[e]||{},...r})};s(t?.contextChat),s(t?.apiChat)}async function Qa(t){let e=t?.context||null,r=t?.api||null,s=e?.saveChatDebounced||r?.saveChatDebounced||null,o=e?.saveChat||r?.saveChat||null;typeof s=="function"&&s.call(e||r),typeof o=="function"&&await o.call(e||r)}function Za(t){return!t||typeof t!="object"||Array.isArray(t)?!1:!!(Array.isArray(t.tables)||typeof t.chatId=="string"&&t.chatId.length>0||typeof t.slotBindingKey=="string"&&t.slotBindingKey.length>0)}function Ls(t){return!t||typeof t!="object"||Array.isArray(t)?!1:"lastResolvedTarget"in t||"lastCommittedTarget"in t}function Va(t,e,r,s){if(!t)return null;let o=t[e];if(!o)return null;let n=_e(r);return typeof s=="function"&&s(o)?n===bt?o:null:o[n]||null}function vc(t,e,r,s,o){if(!t)return;let n=_e(r),a=t[e];if(typeof o=="function"&&o(a)){let i={[bt]:a};i[n]=s,t[e]=i}else a&&typeof a=="object"&&!Array.isArray(a)?t[e]={...a,[n]:s}:t[e]={[n]:s}}function Ja(t,e,r,s){if(!t)return!1;let o=_e(r),n=t[e];if(!n)return!1;if(typeof s=="function"&&s(n))return o===bt?(delete t[e],!0):!1;if(n&&typeof n=="object"&&!Array.isArray(n)){if(n[o]===void 0)return!1;let a={...n};return delete a[o],Object.keys(a).length===0?delete t[e]:t[e]=a,!0}return!1}function qf(t,e={}){let{runtime:r,messageIndex:s}=Sc(t);return Wf({runtime:r,targetSnapshot:t,currentMessageIndex:s,templateTables:Array.isArray(e.templateTables)?e.templateTables:[],isolationKey:e.isolationKey===void 0?ie.getKey():e.isolationKey})}async function Vf(t,e={}){let{runtime:r,messageIndex:s,message:o}=Sc(t);if(!o||s<0)return{success:!1,error:"target_message_not_found"};let n=e.isolationKey===void 0?ie.getKey():e.isolationKey,a=Va(o,Ur,n,Ls),i={...ua(a),lastResolvedTarget:ao(t),updatedAt:Date.now()};return vc(o,Ur,n,i,Ls),Xa(r,s,o),await Qa(r),{success:!0,bindings:i}}async function ei(t,e,r={}){let s=r.skipFreshValidation===!0?t:await Uf(t,r),o=r.skipFreshValidation===!0?{valid:!0,reason:"skipped"}:jf(t,s);if(!o.valid)return{success:!1,error:"target_changed_before_commit",validation:o};let n=s||t,{runtime:a,messageIndex:i,message:l}=Sc(n);if(!l||i<0)return{success:!1,error:"target_message_not_found",validation:o};let c=r.isolationKey===void 0?ie.getKey():r.isolationKey,d=rn(n),u={...d.meta||{},...e.meta||{},...r.locks?{locks:r.locks}:{},...r.previousSnapshot?{previousSnapshot:r.previousSnapshot}:{},isolationKey:c},y=wr({...d,...e,meta:u,slotBindingKey:n.slotBindingKey,slotRevisionKey:n.slotRevisionKey,sourceMessageId:n.sourceMessageId,sourceSwipeId:n.sourceSwipeId||n.effectiveSwipeId,updatedAt:Date.now()}),p=Va(l,Ur,c,Ls),f={...ua(p),lastResolvedTarget:ao(n),lastCommittedTarget:ao(n),updatedAt:Date.now()};return vc(l,_s,c,y,Za),vc(l,Ur,c,f,Ls),Xa(a,i,l),await Qa(a),tT(n,c,y?.tables||[]).catch(()=>{}),{success:!0,state:y,bindings:f,validation:o,messageIndex:i,sourceMessageId:n.sourceMessageId,slotRevisionKey:n.slotRevisionKey}}function Os(t=null,e={}){let r=It.getAssistantMessageSnapshot(t);if(!r?.message)return null;let s=e.isolationKey===void 0?ie.getKey():e.isolationKey;return{...r,tableState:wr(Va(r.message,_s,s,Za)),tableBindings:ua(Va(r.message,Ur,s,Ls))}}async function Jf(t,e={}){let r=Tc();if(!Array.isArray(r.chat)||t<0||t>=r.chat.length)return{success:!1,error:"invalid_message_index",messageIndex:t};let s=r.chat[t];if(!s)return{success:!1,error:"message_not_found",messageIndex:t};let o=e.isolationKey===void 0?ie.getKey():e.isolationKey,n=Ja(s,_s,o,Za),a=e.clearBindings===!1?!1:Ja(s,Ur,o,Ls);return(n||a)&&(Xa(r,t,s),await Qa(r)),{success:!0,cleared:n||a,messageIndex:t,isolationKey:o}}async function Xf(t={}){let e=Tc(),r=Number.isFinite(t.fromMessageIndex)?t.fromMessageIndex:0,s=Number.isFinite(t.toMessageIndex)?t.toMessageIndex:(e.chat?.length||0)-1,o=t.isolationKey===void 0?ie.getKey():t.isolationKey,n=0;for(let a=r;a<=s;a++){let i=e.chat[a];if(!i)continue;let l=Ja(i,_s,o,Za),c=Ja(i,Ur,o,Ls);(l||c)&&(Xa(e,a,i),n++)}return n>0&&await Qa(e),{success:!0,touched:n,from:r,to:s,isolationKey:o}}var wc,Sn=N(()=>{Ms();Ue();Hr();Hf();qa();Ea();H()});function Zf(t){let e=new Set;if(!Array.isArray(t))return e;for(let r of t){let s=r?.order;Number.isFinite(s)&&e.add(Math.floor(s))}return e}function _c(t,e=5e4,r=1,s=99999){for(let o=e;o<=s;o++)if(!t.has(o))return t.add(o),o;for(let o=r;o<e;o++)if(!t.has(o))return t.add(o),o;return Qf.warn("\u65E0\u53EF\u7528 order \u69FD\u4F4D"),t.add(e),e}function eg(t,e,r=5e4,s=1,o=99999){let n=o-e+1;for(let a=r;a<=n;a++){let i=!0;for(let l=0;l<e;l++)if(t.has(a+l)){i=!1;break}if(i){for(let l=0;l<e;l++)t.add(a+l);return a}}for(let a=s;a<r&&a<=n;a++){let i=!0;for(let l=0;l<e;l++)if(t.has(a+l)){i=!1;break}if(i){for(let l=0;l<e;l++)t.add(a+l);return a}}Qf.warn(`\u65E0\u6CD5\u5206\u914D ${e} \u4E2A\u8FDE\u7EED order \u69FD\u4F4D`);for(let a=0;a<e;a++)t.add(r+a);return r}var Qf,tg=N(()=>{H();Qf=R.createScope("TableWBOrder")});function Ec(t,e="before_character_definition"){let r=String(t||"").trim().toLowerCase();return r==="at_depth_as_system"||r==="system"?"at_depth_as_system":r==="before_char"||r==="before_character"||r==="before_character_definition"||r==="0"?"before_character_definition":r==="after_char"||r==="after_character"||r==="after_character_definition"||r==="1"?"after_character_definition":e}function _n(t,e){if(!e)return t;let r={...t,position:e.position};return e.position==="at_depth_as_system"?r.depth=e.depth:delete r.depth,r}var ck,dk,rg=N(()=>{ck=Object.freeze(["at_depth_as_system","before_character_definition","after_character_definition"]);dk=Object.freeze({position:"before_character_definition",depth:2,order:5e4})});function Ac(t,e=""){return t==null?e:String(t).trim()||e}function iT(t){return Ac(t,"default_chat").replace(/[\[\]=]/g,"_")}function lT(){let t=globalThis.window||globalThis;return Ac(t?.TavernHelper?.getCurrentChatId?.()||t?.Silvy?.getCurrentChatId?.()||t?.chat_metadata?.chat_id||t?.this_chid||t?.name1,"default_chat")}function cT(){try{if(typeof TavernHelper<"u"&&TavernHelper)return TavernHelper}catch{}return Lr()?.TavernHelper||null}function dT(t){return String(t??"").replace(/\|/g,"\uFF5C").replace(/\n/g," ")}function sg(t){let e=Array.isArray(t.columns)?t.columns:[],r=Array.isArray(t.rows)?t.rows:[];if(r.length===0)return"";let s=e.map(l=>l.key),o=e.map(l=>l.title||l.key),n=`| ${o.join(" | ")} |`,a=`| ${o.map(()=>"---").join(" | ")} |`,i=r.map(l=>{let c=l.cells||{};return`| ${s.map(d=>dT(c[d])).join(" | ")} |`});return`# ${t.name||"\u672A\u547D\u540D\u8868"}

${n}
${a}
${i.join(`
`)}`}function uT(t,e){if(!Array.isArray(t)||t.length===0)return[];let r=new Map;if(Array.isArray(e))for(let s of e){let o=s?.id||s?.key;o&&r.set(o,s)}return t.map(s=>{let o=s?.id?r.get(s.id):null;return{...s,exportConfig:s?.exportConfig||o?.exportConfig||{enabled:!1},enabled:s?.enabled!==!1}})}function ti(t){return`${ng}${nT}${iT(t)}${aT}-`}function pT(t){return`${ng}[${Ac(t,"default_chat")}]-`}function ag(t,e){if(!t||typeof t!="string")return!1;let r=ti(e);if(t.startsWith(r))return!0;let s=pT(e);return!!t.startsWith(s)}function yT(t,e){let r=ti(t),s=String(e||"").trim();return s?`${r}${s}`:`${r}\u586B\u8868\u6570\u636E`}function og(t,e,r){return`${ti(t)}Wrapper-${r}`}function fT(t,e){return t?t.content!==e.content||t.enabled!==e.enabled||t.type!==e.type||t.position!==e.position||t.prevent_recursion!==e.prevent_recursion||t.order!==e.order:!0}async function En(t,e,r,s,o,n,a){let i=r.find(l=>l.comment===s);return i&&a&&!ag(i.comment,a)?(ko.warn(`upsert \u8DF3\u8FC7\uFF1A\u73B0\u6709\u6761\u76EE comment "${s}" \u4E0D\u5C5E\u4E8E\u5F53\u524D chat`,{chatId:a}),{action:"skipped",comment:s,reason:"cross_chat_collision"}):i&&i.uid?fT(i,o)?(await Promise.resolve(t.setLorebookEntries(e,[{uid:i.uid,...o}])),ko.info(`\u4E16\u754C\u4E66\u6761\u76EE\u5DF2\u66F4\u65B0\uFF1A${s}`),{action:"updated",comment:s}):(n.add(i.order||0),{action:"skipped",comment:s}):typeof t.createLorebookEntries=="function"?(await Promise.resolve(t.createLorebookEntries(e,[{comment:s,keys:[],...o}])),ko.info(`\u4E16\u754C\u4E66\u6761\u76EE\u5DF2\u521B\u5EFA\uFF1A${s}`),{action:"created",comment:s}):{action:"failed",comment:s,error:"createLorebookEntries \u4E0D\u53EF\u7528"}}async function ig(t,e){let r=e?.worldbookSync;if(!r?.enabled)return{skipped:!0,reason:"disabled"};let s=String(r.targetBook||"").trim();if(!s)return{skipped:!0,reason:"no_target_book"};let o=cT();if(!o)return{success:!1,error:"TavernHelper \u4E0D\u53EF\u7528"};if(typeof o.getLorebookEntries!="function")return{success:!1,error:"getLorebookEntries \u4E0D\u53EF\u7528"};if(typeof o.setLorebookEntries!="function"&&typeof o.createLorebookEntries!="function")return{success:!1,error:"\u4E16\u754C\u4E66\u5199\u5165 API \u4E0D\u53EF\u7528"};let n=lT(),a=ti(n),i=Array.isArray(e?.tables)?e.tables:[],c=uT(t,i).filter(y=>y&&y.enabled!==!1&&Array.isArray(y.rows)&&y.rows.length>0);if(c.length===0)return{skipped:!0,reason:"empty_tables"};let d=e?.wrapperConfig||{},u=d.enabled!==!1;try{let y=await Promise.resolve(o.getLorebookEntries(s));Array.isArray(y)||(y=[]);let p=Zf(y),f=[],g=c.filter(_=>_.exportConfig?.enabled===!0),h=c.filter(_=>_.exportConfig?.enabled!==!0),x="";if(h.length>0&&(x=h.map(_=>sg(_)).join(`

`)),u&&(x||g.length>0)){let _=d.wrapperTag||"\u6700\u65B0\u6570\u636E\u4E0E\u8BB0\u5F55",k=d.wrapperHint||"",W=d.wrapperPlacement||{},q=W.order||5e4,M=eg(p,3,q,1,99999),S=Ec(W.position,"before_character_definition"),U=Number.isFinite(W.depth)?W.depth:2,j=`<${_}>
${k}`;f.push(await En(o,s,y,og(n,_,"Start"),_n({content:j,enabled:!0,type:"constant",order:M,prevent_recursion:!0},{position:S,depth:U}),p,n)),x&&f.push(await En(o,s,y,`${a}\u5168\u5C40\u6570\u636E`,_n({content:x,enabled:!0,type:"constant",order:M+1,prevent_recursion:!0},{position:S,depth:U}),p,n)),f.push(await En(o,s,y,og(n,_,"End"),_n({content:`</${_}>`,enabled:!0,type:"constant",order:M+2,prevent_recursion:!0},{position:S,depth:U}),p,n))}else if(x){let _=_c(p,5e4,1,99999);f.push(await En(o,s,y,`${a}\u5168\u5C40\u6570\u636E`,{content:x,enabled:!0,type:"constant",position:"before_character_definition",order:_,prevent_recursion:!0},p,n))}for(let _ of g){let k=_.exportConfig||{},W=k.entryName||_.name||"\u672A\u547D\u540D\u8868",q=yT(n,W),M=sg(_);if(!M)continue;let S=k.entryPlacement||{},U=Ec(S.position,"before_character_definition"),j=_c(p,S.order||5e4,1,99999),Q=k.entryType==="keyword"?"keyword":"constant";f.push(await En(o,s,y,q,_n({content:M,enabled:!0,type:Q,order:j,prevent_recursion:k.preventRecursion!==!1},{position:U,depth:S.depth||2}),p,n))}let T=new Set(f.map(_=>_.comment).filter(Boolean)),v=y.filter(_=>!_.comment||!ag(_.comment,n)?!1:!T.has(_.comment));if(v.length>0){let _=v.map(k=>k.uid).filter(Boolean);_.length>0&&typeof o.deleteLorebookEntries=="function"&&(await Promise.resolve(o.deleteLorebookEntries(s,_)),ko.info(`\u5DF2\u6E05\u7406 ${_.length} \u4E2A\u65E7\u4E16\u754C\u4E66\u6761\u76EE [${n}]`))}let L=f.filter(_=>_.action==="created").length,C=f.filter(_=>_.action==="updated").length;return ko.info(`\u4E16\u754C\u4E66\u540C\u6B65\u5B8C\u6210 [${n}]\uFF1A${L} \u521B\u5EFA, ${C} \u66F4\u65B0, ${v.length} \u6E05\u7406`),{success:!0,results:f,stats:{created:L,updated:C,cleaned:v.length},targetBook:s,chatId:n}}catch(y){return ko.warn("\u4E16\u754C\u4E66\u540C\u6B65\u5931\u8D25:",y),{success:!1,error:y?.message||"\u4E16\u754C\u4E66\u540C\u6B65\u5931\u8D25"}}}var ko,ng,nT,aT,lg=N(()=>{hs();H();tg();rg();ko=R.createScope("TableWorldbookSync"),ng="YYT-",nT="[YY:chatId=",aT="]"});function ri(t,e=""){return t==null?e:String(t).trim()||e}function mT(t={}){return{tables:Array.isArray(t?.tables)?ae(t.tables):[]}}function hT(t={},e={}){let r=ri(e.mirrorTag,"yyt-table-workbench"),s=mT(t);return[`<${r}>`,"[\u586B\u8868\u5DE5\u4F5C\u53F0]","```json",JSON.stringify(s,null,2),"```",`</${r}>`].join(`
`)}async function cg({targetSnapshot:t,nextTables:e,config:r,loadResult:s=null,diff:o=null,fillMode:n="",skipNotify:a=!1}={}){let i=Bt(r),l=await ei(t,{tables:Array.isArray(e)?ae(e):[],meta:{lastLoadMode:ri(s?.loadMode,""),lastFillMode:ri(n),mergeBaseOnly:!1,updatedBy:ri(t?.runSource,"MANUAL_TABLE")}});if(!l?.success)return{success:!1,error:l?.error||"table_state_commit_failed",commitResult:l,mirrorResult:null,warning:""};let c=null,d=null,u="";if(i.mirrorToMessage){let y=hT(l.state,{mirrorTag:i.mirrorTag});c=await It.injectDetailed(gT,y,{overwrite:!0,extractionSelectors:[i.mirrorTag],sourceMessageId:l.sourceMessageId,sourceSwipeId:t?.sourceSwipeId||t?.effectiveSwipeId,effectiveSwipeId:t?.effectiveSwipeId||t?.sourceSwipeId,slotBindingKey:t?.slotBindingKey,slotRevisionKey:t?.slotRevisionKey,slotTransactionId:t?.slotTransactionId,traceId:t?.traceId,skipNotify:a}),c?.success||(u=c?.error||"\u6B63\u6587\u955C\u50CF\u5199\u56DE\u5931\u8D25")}return i.worldbookSync?.enabled&&(d=await ig(Array.isArray(e)?e:[],i),d&&!d.success&&!d.skipped&&(u=u?`${u}; ${d.error}`:d.error||"\u4E16\u754C\u4E66\u540C\u6B65\u5931\u8D25")),{success:!0,state:l.state,bindings:l.bindings,diff:o,fillMode:n,commitResult:l,mirrorResult:c,worldbookSyncResult:d,warning:u}}var gT,dg=N(()=>{Ms();Ue();Sn();sr();lg();gT="tableWorkbenchMirror"});function bT(t){return typeof t!="string"||!t?t:t.replace(/[“”「」『』＂]/g,'"')}function kc(t,e){for(let r=e;r<t.length;r++)if(!/\s/.test(t[r]))return{char:t[r],index:r};return{char:"",index:-1}}function yg(t){return!!t&&(t==='"'||t==="{"||t==="["||t==="-"||/\d/.test(t)||t==="t"||t==="f"||t==="n")}function xT(t,e,r,s){let o=kc(t,e+1),n=o.char;if(!n)return r!=="key";if(r==="key")return n===":";if(n==="}"||n==="]")return!0;if(n!==",")return!1;let a=kc(t,o.index+1).char;return a?s==="object"?a==='"'||a==="}":s==="array"?a==="]"||yg(a):yg(a)||a==="}"||a==="]":!0}function wT(t){if(typeof t!="string")return{success:!1,result:t,error:"not a string"};let e="",r=!1,s=!1,o=null,n=[],a=()=>n.length?n[n.length-1]:null,i=()=>{let l=a();l&&(l.expecting="commaOrEnd")};for(let l=0;l<t.length;l++){let c=t[l];if(s){e+=c,s=!1;continue}if(r){if(c==="\\"){e+=c,s=!0;continue}if(c==='"'){let d=a();xT(t,l,o,d?.type||null)?(e+=c,r=!1,o==="key"&&d?.type==="object"?d.expecting="colon":i(),o=null):e+='\\"';continue}e+=c;continue}if(c==='"'){e+=c,r=!0;let d=a();o=d&&d.type==="object"&&(d.expecting==="key"||d.expecting==="keyOrEnd")?"key":"value";continue}if(c==="{"){e+=c,n.push({type:"object",expecting:"keyOrEnd"});continue}if(c==="["){e+=c,n.push({type:"array",expecting:"valueOrEnd"});continue}if(c===":"){e+=c;let d=a();d?.type==="object"&&(d.expecting="value");continue}if(c===","){e+=c;let d=a();d?.type==="object"&&(d.expecting="key"),d?.type==="array"&&(d.expecting="value");continue}if(c==="}"||c==="]"){e+=c,n.pop(),i();continue}e+=c}return{success:!0,result:e,error:null}}function vT(t){if(typeof t!="string"||!t)return t;let e="",r=!1,s=!1;for(let o=0;o<t.length;o++){let n=t[o];if(s){e+=n,s=!1;continue}if(n==="\\"){e+=n,r&&(s=!0);continue}if(n==='"'){e+=n,r=!r;continue}if(r){if(n===`
`){e+="\\n";continue}if(n==="\r"){e+="\\r";continue}if(n==="	"){e+="\\t";continue}if(n==="\0"){e+="\\u0000";continue}}e+=n}return e}function TT(t){if(typeof t!="string"||!t)return t;let e="",r=!1,s=!1;for(let o=0;o<t.length;o++){let n=t[o];if(s){e+=n,s=!1;continue}if(n==="\\"){e+=n,r&&(s=!0);continue}if(n==='"'){e+=n,r=!r;continue}if(!r&&n===","){let a=kc(t,o+1).char;if(a==="}"||a==="]")continue}e+=n}return e}function ST(t){return typeof t!="string"||!t?t:t.replace(/([{,]\s*)(-?\d+)(\s*:)/g,'$1"$2"$3')}function An(t){if(typeof t!="string")return{success:!1,result:t,layersApplied:[],error:"Input is not a string"};let e=[],r=t,s=bT(r);s!==r&&e.push("normalizeQuotes"),r=s;let o=wT(r);if(!o.success)return{success:!1,result:r,layersApplied:e,error:o.error};o.result!==r&&e.push("escapeUnescapedQuotes"),r=o.result;let n=vT(r);n!==r&&e.push("sanitizeControlChars"),r=n;let a=TT(r);a!==r&&e.push("removeTrailingCommas"),r=a;let i=ST(r);return i!==r&&e.push("fixNumericKeys"),r=i,{success:!0,result:r,layersApplied:e,error:null}}function _T(t,e=","){if(typeof t!="string"||!t)return[];let r=[],s="",o=!1,n=!1,a=0,i=0,l=0;for(let c=0;c<t.length;c++){let d=t[c];if(n){s+=d,n=!1;continue}if(d==="\\"){s+=d,o&&(n=!0);continue}if(d==='"'){s+=d,o=!o;continue}if(!o){if(d==="{")a++;else if(d==="}")a=Math.max(0,a-1);else if(d==="[")i++;else if(d==="]")i=Math.max(0,i-1);else if(d==="(")l++;else if(d===")")l=Math.max(0,l-1);else if(d===e&&a===0&&i===0&&l===0){s.trim()&&r.push(s.trim()),s="";continue}}s+=d}return s.trim()&&r.push(s.trim()),r}function ET(t,e=":"){if(typeof t!="string"||!t)return-1;let r=!1,s=!1,o=0,n=0,a=0;for(let i=0;i<t.length;i++){let l=t[i];if(s){s=!1;continue}if(l==="\\"){r&&(s=!0);continue}if(l==='"'){r=!r;continue}if(!r){if(l==="{")o++;else if(l==="}")o=Math.max(0,o-1);else if(l==="[")n++;else if(l==="]")n=Math.max(0,n-1);else if(l==="(")a++;else if(l===")")a=Math.max(0,a-1);else if(l===e&&o===0&&n===0&&a===0)return i}}return-1}function Cc(t){if(typeof t!="string")return{success:!0,value:t,error:null};let e=t.trim();if(!e)return{success:!1,value:null,error:"Empty value"};let s=`[${e.startsWith("'")&&e.endsWith("'")?`"${e.slice(1,-1).replace(/\\/g,"\\\\").replace(/"/g,'\\"').replace(/\r/g,"\\r").replace(/\n/g,"\\n").replace(/\t/g,"\\t")}"`:e}]`;try{return{success:!0,value:JSON.parse(s)[0],error:null}}catch(o){let n=An(s);if(n.success)try{return{success:!0,value:JSON.parse(n.result)[0],error:null}}catch{}return{success:!1,value:null,error:o?.message||"Failed to parse loose value"}}}function AT(t){let e=typeof t=="string"?t.trim():"";if(!e)return null;if(/^-?\d+$/.test(e))return e;let r=Cc(e);return r.success&&(typeof r.value=="string"||typeof r.value=="number")?String(r.value):e.replace(/^["']|["']$/g,"")}function fg(t){if(typeof t!="string")return{success:!1,result:null,recoveredKeys:[],error:"not a string"};let e=t.trim();if(!e.startsWith("{")||!e.endsWith("}"))return{success:!1,result:null,recoveredKeys:[],error:"not an object literal"};let r=e.slice(1,-1).trim();if(!r)return{success:!0,result:{},recoveredKeys:[],error:null};let s=_T(r,",").filter(Boolean);if(!s.length)return{success:!1,result:null,recoveredKeys:[],error:"no segments"};let o={},n=0;for(let i of s){let l=ET(i,":");if(l!==-1){let d=AT(i.slice(0,l)),u=Cc(i.slice(l+1));if(!d||!u.success)return{success:!1,result:null,recoveredKeys:Object.keys(o),error:`Failed segment: ${i}`};o[d]=u.value;let y=parseInt(d,10);!isNaN(y)&&String(y)===d&&(n=Math.max(n,y+1));continue}let c=Cc(i);if(!c.success)return{success:!1,result:null,recoveredKeys:Object.keys(o),error:`Failed value: ${i}`};for(;Object.prototype.hasOwnProperty.call(o,String(n));)n++;o[String(n)]=c.value,n++}let a=Object.keys(o).sort((i,l)=>parseInt(i,10)-parseInt(l,10));return a.length?{success:!0,result:o,recoveredKeys:a,error:null}:{success:!1,result:null,recoveredKeys:[],error:"no keys recovered"}}function kT(t){if(typeof t!="string")return"";let e=t.trim();return e=e.replace(/'\s*\+\s*'/g,""),e.startsWith("'")&&e.endsWith("'")&&(e=e.slice(1,-1)),e=e.replace(/\\n/g,`
`),e=e.replace(/\\\\"/g,'\\"'),e=e.replace(/：/g,":"),e}function CT(t){let e=kT(t);if(!e)return[];let r=[];ug.lastIndex=0;let s;for(;(s=ug.exec(e))!==null;){let i=s[1];i&&i.trim()&&r.push(i)}if(r.length)return r;let o=i=>/(insertRow|updateRow|deleteRow)\s*\(/.test(i),n=/<!--([\s\S]*?)-->/g,a=[];for(;(s=n.exec(e))!==null;)o(s[1])&&a.push(s[1]);return a}function IT(t){let e=t.split(/\r?\n/),r=[],s="",o=!1;for(let a of e){let i=a.trim();if(!i||(!o&&i.includes("//")&&!i.includes('"//')&&!i.includes("'//")&&(i=i.split("//")[0].trim()),!i))continue;if(/^(insertRow|updateRow|deleteRow)\s*\(/.test(i)&&!o?(s&&r.push(s),s=i):s+=(s?" ":"")+i,s){let c=(s.match(/\{/g)||[]).length,d=(s.match(/\}/g)||[]).length;o=c>d}}s&&r.push(s);let n=[];for(let a of r){let i=/(?:^|;\s*)((?:insertRow|deleteRow|updateRow)\s*\()/g,l=[],c;for(;(c=i.exec(a))!==null;)l.push(c.index+(c[0].length-c[1].length));if(l.length<=1)n.push(a.replace(/;\s*$/,""));else for(let d=0;d<l.length;d++){let u=l[d],y=d+1<l.length?l[d+1]:a.length,p=a.substring(u,y).replace(/;\s*$/,"").trim();p&&n.push(p)}}return n}function RT(t){try{let e=t;if(e.match(/\)\s*;?\s*\/\/.*$/)&&(e=e.replace(/\/\/.*$/,"").trim()),!e)return null;let r=e.match(/^(insertRow|deleteRow|updateRow)\s*\((.*)\);?$/);if(!r)return null;let s=r[1],o=r[2],n=o.indexOf("{");if(n===-1)return{command:s,args:JSON.parse(`[${o}]`),line:e};let a=o.substring(0,n).trim(),i=o.substring(n),l=JSON.parse(`[${a.replace(/,$/,"")}]`);try{return{command:s,args:[...l,JSON.parse(i)],line:e}}catch{}let c=fg(i);if(c.success)return{command:s,args:[...l,c.result],line:e};let d=An(i);if(!d.success)return null;try{return{command:s,args:[...l,JSON.parse(d.result)],line:e}}catch{}let u=fg(d.result);return u.success?{command:s,args:[...l,u.result],line:e}:null}catch{return null}}function MT(t){if(!t)return null;let{command:e,args:r}=t;if(e==="insertRow"){let s=typeof r[0]=="number"?r[0]:0,o=typeof r[1]=="object"&&r[1]!==null?r[1]:{};return{op:e,tableIndex:s,data:o}}if(e==="deleteRow"){let s=typeof r[0]=="number"?r[0]:0,o=typeof r[1]=="number"?r[1]:0;return{op:e,tableIndex:s,rowIndex:o}}if(e==="updateRow"){let s=typeof r[0]=="number"?r[0]:0,o=typeof r[1]=="number"?r[1]:0,n=typeof r[2]=="object"&&r[2]!==null?r[2]:{};return{op:e,tableIndex:s,rowIndex:o,data:n}}return null}function Ic(t){let e=CT(t);if(!e.length)return null;let r=[],s=[];for(let o of e){let n=o.replace(/<!--|-->/g,"").trim();if(!n)continue;let a=IT(n);for(let i of a){let l=RT(i),c=MT(l);c?r.push(c):i&&/^(insertRow|updateRow|deleteRow)/.test(i)&&s.push(i.slice(0,200))}}if(s.length>0)try{console.warn("[TableJsonSanitizer] parseIncrementalEdits: %d \u6761\u6307\u4EE4\u89E3\u6790\u5931\u8D25",s.length,s)}catch{}return r.length?r:null}function Rc(t){pg.lastIndex=0;let e;for(;(e=pg.exec(t))!==null;){let f=e[1].trim();if(f)try{return JSON.parse(f)}catch{let h=An(f);if(h.success)try{return JSON.parse(h.result)}catch{}}}let r=t.trim();try{return JSON.parse(r)}catch{}let s=An(r);if(s.success)try{return JSON.parse(s.result)}catch{}let o=r.indexOf("{"),n=r.indexOf("["),a=-1,i="",l="";if(o!==-1&&(n===-1||o<n)?(a=o,i="{",l="}"):n!==-1&&(a=n,i="[",l="]"),a===-1)return null;let c=0,d=-1,u=!1,y=!1;for(let f=a;f<r.length;f++){let g=r[f];if(y){y=!1;continue}if(g==="\\"&&u){y=!0;continue}if(g==='"'){u=!u;continue}if(!u){if(g===i)c++;else if(g===l&&(c--,c===0)){d=f;break}}}if(d===-1)return null;let p=r.substring(a,d+1);try{return JSON.parse(p)}catch{let g=An(p);if(g.success)try{return JSON.parse(g.result)}catch{}}return null}function gg(t){if(!t||typeof t!="string")return{mode:"empty",edits:null,tables:null};let e=Ic(t);if(e)return{mode:"incremental",edits:e,tables:null};let r=Rc(t);if(r){let s=null;if(Array.isArray(r))s=r;else if(r&&Array.isArray(r.tables))s=r.tables;else if(r&&typeof r=="object"){for(let o of Object.values(r))if(Array.isArray(o)){s=o;break}}if(Array.isArray(s))return{mode:"full",edits:null,tables:s}}return{mode:"empty",edits:null,tables:null}}var ug,pg,si=N(()=>{ug=/<tableEdit>([\s\S]*?)<\/tableEdit>/gi,pg=/```(?:json)?\s*([\s\S]*?)```/gi});var PT,NT,mg,hg=N(()=>{si();PT=/<tableEdit>[\s\S]*?<\/tableEdit>/i,NT=/(insertRow|updateRow|deleteRow)\s*\(/,mg=Object.freeze({formatId:"dsl",displayName:"<tableEdit> DSL \u589E\u91CF\u534F\u8BAE",detect(t){return!t||typeof t!="string"?!1:PT.test(t)||NT.test(t)},parse(t){let e=Ic(t);return!Array.isArray(e)||e.length===0?null:{mode:"incremental",edits:e,tables:null}}})});function xg(t){if(typeof t!="string")return t;let e=t.trim();return e.startsWith("'")&&e.endsWith("'")||e.startsWith('"')&&e.endsWith('"')?e.slice(1,-1).replace(/''/g,"'").replace(/\\'/g,"'"):e}function Mc(t){let e=String(t||"").match(/(\d+)$/);return e?parseInt(e[1],10):0}function wg(t){let e=String(t||"").match(/row_id\s*=\s*(\d+)/i);return e?parseInt(e[1],10):-1}function $T(t){let e=t.match(/INSERT\s+INTO\s+(\S+)\s*\(([^)]*)\)\s*VALUES\s*\(([^)]*)\)/i);if(!e)return null;let r=e[1],s=e[2],o=e[3],n=s.split(",").map(l=>l.trim()),a=o.split(",").map(l=>xg(l.trim())),i={};return n.forEach((l,c)=>{l!=="row_id"&&a[c]!==void 0&&(i[l]=a[c])}),{op:"insertRow",tableIndex:Mc(r),data:i}}function DT(t){let e=t.match(/UPDATE\s+(\S+)\s+SET\s+([\s\S]+?)\s+WHERE\s+([\s\S]+?);?$/i);if(!e)return null;let r=e[1],s=e[2],o=e[3],n={},a=s.split(/,(?![^()]*\))/);for(let i of a){let l=i.indexOf("=");if(l<0)continue;let c=i.slice(0,l).trim(),d=xg(i.slice(l+1).trim());c&&c!=="row_id"&&(n[c]=d)}return{op:"updateRow",tableIndex:Mc(r),rowIndex:wg(o),data:n}}function LT(t){let e=t.match(/DELETE\s+FROM\s+(\S+)\s+WHERE\s+([\s\S]+?);?$/i);return e?{op:"deleteRow",tableIndex:Mc(e[1]),rowIndex:wg(e[2])}:null}function OT(t){let e=[];bg.lastIndex=0;let r;for(;(r=bg.exec(t))!==null;){let s=r[0].trim(),o=null;/^INSERT/i.test(s)?o=$T(s):/^UPDATE/i.test(s)?o=DT(s):/^DELETE/i.test(s)&&(o=LT(s)),o&&e.push(o)}return e}var kn,bg,vg,Tg=N(()=>{kn=/<sql>([\s\S]*?)<\/sql>/gi,bg=/(INSERT\s+INTO\s+\S+[\s\S]*?;)|(UPDATE\s+\S+\s+SET[\s\S]*?;)|(DELETE\s+FROM\s+\S+[\s\S]*?;)/gi;vg=Object.freeze({formatId:"sql",displayName:"SQL \u534F\u8BAE\uFF08INSERT/UPDATE/DELETE\uFF09",detect(t){return!t||typeof t!="string"?!1:kn.test(t)?(kn.lastIndex=0,!0):(kn.lastIndex=0,/\b(INSERT\s+INTO|UPDATE\s+\S+\s+SET|DELETE\s+FROM)\b/i.test(t))},parse(t){let e="";kn.lastIndex=0;let r,s=[];for(;(r=kn.exec(t))!==null;)s.push(r[1]);s.length>0?e=s.join(`
`):e=t;let o=OT(e);return!Array.isArray(o)||o.length===0?null:{mode:"incremental",edits:o,tables:null}}})});var Sg,_g=N(()=>{si();Sg=Object.freeze({formatId:"full-json",displayName:"JSON envelope \u5168\u91CF\u534F\u8BAE",detect(t){return!t||typeof t!="string"?!1:/```json/i.test(t)||/\{[\s\S]*?"tables"\s*:/i.test(t)},parse(t){let e=Rc(t);if(!e)return null;let r=null;if(Array.isArray(e))r=e;else if(e&&Array.isArray(e.tables))r=e.tables;else if(e&&typeof e=="object"){for(let s of Object.values(e))if(Array.isArray(s)){r=s;break}}return!Array.isArray(r)||r.length===0?null:{mode:"full",edits:null,tables:r}}})});function oi(){return Pc||(Pc=R.createScope("AiProtocolAdapter")),Pc}function Eg(t){if(!t||typeof t!="string")return null;for(let e of BT){let r=!1;try{r=e.detect(t)}catch(s){oi().warn(`adapter ${e.formatId} detect \u629B\u9519`,s);continue}if(r)try{let s=e.parse(t);if(s&&(s.mode==="incremental"||s.mode==="full")&&(s.mode==="incremental"&&Array.isArray(s.edits)&&s.edits.length>0||s.mode==="full"&&Array.isArray(s.tables)&&s.tables.length>0))return oi().info("AI \u534F\u8BAE\u9002\u914D\u5668\u547D\u4E2D",{formatId:e.formatId,mode:s.mode,editsCount:s.edits?.length,tablesCount:s.tables?.length}),{...s,rawFormat:e.formatId}}catch(s){oi().warn(`adapter ${e.formatId} parse \u629B\u9519\uFF0C\u5C1D\u8BD5\u4E0B\u4E00\u4E2A`,s)}}return oi().warn("parseAiResponseAuto: \u65E0\u9002\u914D\u5668\u547D\u4E2D",{responseLength:t.length}),null}var Pc,BT,Ag=N(()=>{H();hg();Tg();_g();BT=Object.freeze([mg,vg,Sg])});function zT(t,e){let r=new Map;Array.isArray(t)&&t.forEach((n,a)=>{n&&typeof n=="object"&&r.set(n.name||`__row_${a}`,n)});let s=new Map;Array.isArray(e)&&e.forEach((n,a)=>{n&&typeof n=="object"&&s.set(n.name||`__row_${a}`,n)});let o={};for(let[n,a]of s){let i=r.get(n);if(i){o[n]={};let l=new Set([...Object.keys(i.cells||{}),...Object.keys(a.cells||{})]);for(let c of l){let d=String((i.cells&&i.cells[c])??""),u=String((a.cells&&a.cells[c])??"");o[n][c]=d===u?"unchanged":"updated"}o[n].__rowStatus="kept"}else{if(o[n]={},a.cells&&typeof a.cells=="object")for(let l of Object.keys(a.cells))o[n][l]="new";o[n].__rowStatus="new"}}for(let[n]of r)s.has(n)||(o[n]={__rowStatus:"deleted"});return o}function kg(t,e){let r=Array.isArray(t)?ae(t):[],s=Array.isArray(e)?ae(e):[],o={},n=Math.max(r.length,s.length);for(let a=0;a<n;a++){let i=r[a],l=s[a];!i&&l?(o[a]={},Array.isArray(l.rows)&&l.rows.forEach(c=>{let d=c.name||`__row_${l.rows.indexOf(c)}`;o[a][d]={__rowStatus:"new"}})):i&&!l?(o[a]={},Array.isArray(i.rows)&&i.rows.forEach(c=>{let d=c.name||`__row_${i.rows.indexOf(c)}`;o[a][d]={__rowStatus:"deleted"}})):i&&l&&(o[a]=zT(i.rows,l.rows))}return o}var Cg=N(()=>{Ue()});function KT(){return{mode:"native",async buildRequest(t={},e={}){if(typeof t.buildRequest!="function")throw new Error("table_provider_missing_build_request");return t.buildRequest(e)},async sendRequest(t={},e=null,r={}){if(typeof t.sendRequest!="function")throw new Error("table_provider_missing_send_request");return t.sendRequest(e?.messages||[],r.config||{},r.abortSignal||null)},parseResponse(t={},e=""){if(typeof t.parseResponse!="function")throw new Error("table_provider_missing_parse_response");return t.parseResponse(e)}}}function Ig(){return KT()}var Rg=N(()=>{});function jT(){return Nc||(Nc=R.createScope("TableLock")),Nc}function Bs(t){return t!==null&&typeof t=="object"&&!Array.isArray(t)}function Ng(){let t=Pg.get(Mg,{});return Bs(t)?t:{}}function FT(t){Pg.set(Mg,t)}function Cn(t){let e=Ng();return Bs(e[t])?e[t]:{}}function $c(t,e){let r=Ng();r[t]=e,FT(r),WT(t,e).catch(()=>{})}async function WT(t,e){try{let{chatKey:r,isolationKey:s}=(()=>{let n=String(t||"").indexOf("::");return n===-1?{chatKey:String(t||""),isolationKey:""}:{chatKey:t.slice(0,n),isolationKey:t.slice(n+2)}})();if(!r)return;let o=await Promise.resolve().then(()=>(Ea(),Fl));await o.ensureTableDataReady(),await o.clearScopeLocks({chatId:r,isolationKey:s});for(let[n,a]of Object.entries(e||{})){if(!Bs(a))continue;let i={chatId:r,isolationKey:s};if(Array.isArray(a.rows))for(let l of a.rows)Number.isFinite(l)&&await o.setLockEntry(i,n,"row",String(l));if(Array.isArray(a.cols))for(let l of a.cols)typeof l=="string"&&l&&await o.setLockEntry(i,n,"column",l);if(Array.isArray(a.cells))for(let l of a.cells)typeof l=="string"&&l.includes(":")&&await o.setLockEntry(i,n,"cell",l);a.indexColumn===!0&&await o.setLockEntry(i,n,"index_column","")}}catch(r){jT().warn("lock-service SQL \u955C\u50CF\u5931\u8D25\uFF08\u4E0D\u5F71\u54CD\u4E3B\u6D41\u7A0B\uFF09",{error:r?.message||String(r)})}}function In(t){let e=Pp();return Bs(t)&&(Array.isArray(t.rows)&&(e.rows=Array.from(new Set(t.rows.filter(r=>Number.isFinite(r)).map(r=>Math.floor(r)))),e.rows.sort((r,s)=>r-s)),Array.isArray(t.cols)&&(e.cols=Array.from(new Set(t.cols.filter(r=>typeof r=="string"&&r.length>0)))),Array.isArray(t.cells)&&(e.cells=Array.from(new Set(t.cells.filter(r=>typeof r=="string"&&r.includes(":"))))),e.indexColumn=t.indexColumn===!0),e}function Rn(t){if(typeof t=="string")return t;if(Bs(t)){if(typeof t.scopeKey=="string"&&t.scopeKey.includes("::"))return t.scopeKey;if(t.chatId!==void 0){let e=t.isolationKey!==void 0?t.isolationKey:ie.getKey();return sn(t.chatId,e)}}return sn("",ie.getKey())}function HT(t,e){let r=Cn(t),s={};if(!Array.isArray(e))return s;for(let o=0;o<e.length;o++){let n=e[o];if(!n)continue;let a=n.uid||n.id||"";a&&r[a]&&(s[o]=In(r[a]))}return s}function Co(t,e){let r=Rn(t),s=Cn(r);return In(s[e])}function $g(t,e,r,s=!0){if(!e||!Number.isFinite(r))return!1;let o=Rn(t),n=Cn(o),a=In(n[e]),i=Math.floor(r),l=a.rows.includes(i);if(s&&!l)a.rows.push(i),a.rows.sort((c,d)=>c-d);else if(!s&&l)a.rows=a.rows.filter(c=>c!==i);else return!1;return n[e]=a,$c(o,n),!0}function Dg(t,e,r,s=!0){if(!e||!r)return!1;let o=Rn(t),n=Cn(o),a=In(n[e]),i=a.cols.includes(r);if(s&&!i)a.cols.push(r);else if(!s&&i)a.cols=a.cols.filter(l=>l!==r);else return!1;return n[e]=a,$c(o,n),!0}function Lg(t,e,r,s,o=!0){if(!e||!s||!Number.isFinite(r))return!1;let n=Rn(t),a=Cn(n),i=In(a[e]),l=Np(r,-1)==="-1:-1"?`${r}:${s}`:`${r}:${s}`,c=`${Math.floor(r)}:${s}`,d=i.cells.includes(c);if(o&&!d)i.cells.push(c);else if(!o&&d)i.cells=i.cells.filter(u=>u!==c);else return!1;return a[e]=i,$c(n,a),!0}function Og(t,e=[]){let r=Rn(t);return HT(r,e)}function Bg(t,e,r,s){if(!Bs(t))return!1;let o=t[e];if(!o)return!1;if(Number.isFinite(r)&&o.rows.includes(r)||typeof s=="string"&&s.length>0&&o.cols.includes(s))return!0;if(Number.isFinite(r)&&typeof s=="string"&&s.length>0){let n=`${r}:${s}`;if(o.cells.includes(n))return!0}return!1}function Dc(t,e,r){if(!Bs(t))return!1;let s=t[e];return s?Number.isFinite(r)&&s.rows.includes(r):!1}var UT,Mg,Nc,Pg,Lc=N(()=>{Ke();H();Ue();Hr();UT="tableLocks",Mg="scopes";Pg=D.namespace(UT)});function YT(){return Oc||(Oc=R.createScope("TableAutoSchedule")),Oc}function Kg(t,e,r){let s=_e(e||bt);return`${String(t||"")}::${s}::${String(r||"")}`}function GT(t,e,r){if(!r)return null;let s=zg.get(Kg(t,e,r),null);return s&&typeof s=="object"?s:null}function qT(t,e,r,s){if(!r)return;let o=Number.isFinite(s)?s:-1;zg.set(Kg(t,e,r),{lastMessageIndex:o,lastUpdatedAt:new Date().toISOString()})}function Ug(t,e,r=[],s){for(let o of r)qT(t,e,o,s)}function jg({chatId:t,isolationKey:e,currentMessageIndex:r,scopeTables:s=[]}){let o=new Set,n={};for(let a of s){let i=a?.id||a?.uid||"";if(!i)continue;if(a?.enabled===!1){n[i]="disabled";continue}let l=a?.updateConfig?.updateFrequency;if(!Number.isFinite(l)||l===-1){o.add(i);continue}if(l===0){n[i]="frequency_zero";continue}if(l>=1){let c=GT(t,e,i);if(!c||!Number.isFinite(c.lastMessageIndex)){o.add(i);continue}let d=r-c.lastMessageIndex;d>=l?o.add(i):n[i]=`frequency_not_met (${d}/${l})`}else o.add(i)}return YT().info("buildAutoSchedulePlan",{chatId:t,isolationKey:e,currentMessageIndex:r,shouldUpdateCount:o.size,skipReasonsCount:Object.keys(n).length,shouldUpdateTables:[...o],skipReasons:n}),{shouldUpdate:o,skipReasons:n}}var zg,Oc,Fg=N(()=>{Ke();H();Ue();zg=D.namespace("tableAutoSchedule")});function VT(t){let e=Eg(t);return e&&(e.mode==="incremental"||e.mode==="full")?e:gg(t)}function he(){return R.createScope("TableUpdate")}function XT(t,e){return new Promise(r=>{if(e?.aborted){r(!1);return}let s,o=()=>{clearTimeout(s);try{e?.removeEventListener?.("abort",o)}catch{}r(!1)};s=setTimeout(()=>{try{e?.removeEventListener?.("abort",o)}catch{}r(!0)},t);try{e?.addEventListener?.("abort",o)}catch{}})}function G(t,e=""){return t==null?e:String(t).trim()||e}function Wg(t=[],e=8,r="all"){if(!Array.isArray(t)||t.length===0)return"";let s=r==="assistant_only"?t.filter(o=>o?.role==="assistant"):t;return s.slice(Math.max(s.length-e,0)).map(o=>`[${G(o?.role,"unknown")}] ${String(o?.content||"").trim()}`).filter(Boolean).join(`

`)}function Hg(t,{extractTags:e=[],useGlobalRules:r=!1,regexPresetId:s=""}={}){if(!t)return t;let o=Array.isArray(e)&&e.length>0,n=typeof s=="string"&&s.trim().length>0;if(!o&&!r&&!n)return t;try{let a=[],i=[];if(n)try{let l=Se.getPreset(s);if(l){let c=Array.isArray(l.rules)?l.rules.filter(d=>d&&d.enabled!==!1&&d.value):[];a.push(...c),Array.isArray(l.blacklist)&&i.push(...l.blacklist.map(d=>String(d||"").trim()).filter(Boolean))}else he().warn("applyContextExtractionRules: \u627E\u4E0D\u5230\u6B63\u5219\u9884\u8BBE",{regexPresetId:s})}catch(l){he().warn("applyContextExtractionRules: \u52A0\u8F7D\u6B63\u5219\u9884\u8BBE\u5931\u8D25",l)}if(o&&a.push(...e.map(l=>{let c=String(l||"").trim();return c.startsWith("regex:")?{type:"regex_include",value:c.slice(6).trim(),enabled:!0}:{type:"include",value:c,enabled:!0}}).filter(l=>l.value)),r){let l=qs()||[];a=[...a,...l.filter(c=>c?.enabled)],i=[...i,...Vs()||[]]}return a.length===0&&i.length===0?t:hr(t,a,i)||t}catch(a){return he().warn("applyContextExtractionRules \u5931\u8D25\uFF0C\u56DE\u9000\u539F\u59CB\u6587\u672C",a),t}}function QT(t=[],e=-1){return!Number.isFinite(e)||e<0?t:t.map(r=>{let s=Array.isArray(r?.rows)?r.rows:[];return e===0||s.length<=e?r:{...r,rows:s.slice(s.length-e)}})}function ZT(t=[]){return!Array.isArray(t)||t.length===0?"":t.map((e,r)=>{let s=e?.aiInstructions&&typeof e.aiInstructions=="object"?e.aiInstructions:{},o=Array.isArray(e?.columns)?e.columns:[],n=[`\u8868 ${r}: ${G(e?.name,`\u8868${r+1}`)}`,`\u8868\u683C\u8BF4\u660E: ${G(e?.note,"\u65E0")}`,`\u521D\u59CB\u5316\u8BF4\u660E: ${G(s.init,"\u65E0")}`,`\u65B0\u589E\u8BF4\u660E: ${G(s.create,"\u65E0")}`,`\u66F4\u65B0\u8BF4\u660E: ${G(s.update,"\u65E0")}`,`\u5220\u9664\u8BF4\u660E: ${G(s.delete,"\u65E0")}`,"\u5B57\u6BB5\uFF08\u8BF7\u7528\u5217\u7D22\u5F15\u4F5C\u4E3A data key\uFF09:"];return o.forEach((a,i)=>{n.push(`- [${i}]: ${G(a?.title||a?.key,"\u672A\u547D\u540D\u5B57\u6BB5")} \u2014 ${G(a?.description,"\u65E0")}`)}),n.join(`
`)}).join(`

`)}function eS(t,e=[]){if(!t||!Array.isArray(e)||e.length===0)return"";let r=e.map((o,n)=>{let a=G(o?.name,`\u8868${n+1}`),i=t.includes(o,n);return`\u8868 ${n}: ${a} - ${i?"\u5141\u8BB8\u7F16\u8F91":"\u53EA\u8BFB\uFF0C\u7981\u6B62\u4FEE\u6539"}`});return e.some((o,n)=>!t.includes(o,n))&&(r.push(""),r.push('\u3010\u91CD\u8981\u7EA6\u675F\u3011\u6807\u8BB0\u4E3A"\u53EA\u8BFB"\u7684\u8868\u683C\uFF0C\u4F60\u5FC5\u987B\u5728\u8F93\u51FA\u4E2D\u539F\u6837\u4FDD\u7559\u5176\u6240\u6709\u884C\u6570\u636E\uFF0C\u4E0D\u5F97\u65B0\u589E\u3001\u4FEE\u6539\u6216\u5220\u9664\u4EFB\u4F55\u884C\u3002'),r.push("\u5168\u91CF\u8F93\u51FA\u65F6\uFF0C\u53EA\u8BFB\u8868\u683C\u7684 rows \u5FC5\u987B\u4E0E\u8F93\u5165\u4E2D\u7684\u5B8C\u5168\u4E00\u81F4\u3002")),r.join(`
`)}function qg(t={},e=0,r=[]){let s=t&&typeof t=="object"?t:{},o=s.cells&&typeof s.cells=="object"&&!Array.isArray(s.cells)?s.cells:{},n={},a=Array.isArray(r)?r.map(l=>G(l?.key,"")).filter(Boolean):[];return new Set([...Object.keys(o),...a]).forEach(l=>{n[l]=G(o[l],"")}),{...s,id:tn(s.id||s.rowId,e),name:G(s.name,""),cells:n}}function Ks(t={},e=0){let r=t&&typeof t=="object"?t:{},s=Array.isArray(r.columns)?ae(r.columns):[],o=Array.isArray(r.rows)?r.rows.map((n,a)=>qg(n,a,s)):[];return{...r,id:Yt(r.id||r.key,e),rows:o}}function cr(t=[]){return Array.isArray(t)?t.map((e,r)=>Ks(e,r)):[]}function tS(t=[],e=[],r){let s=cr(t),o=cr(e);if(!r)return o;let n=new Map(o.map((u,y)=>[Yt(u?.id||u?.key,y),u])),a=s.map((u,y)=>({table:u,tableIndex:y,id:Yt(u?.id||u?.key,y)})).filter(({table:u,tableIndex:y})=>r.includes(u,y)),i=new Set,l=new Map;for(let u=0;u<o.length;u++){let y=o[u],p=Yt(y?.id||y?.key,u);n.has(p)&&(l.set(p,y),i.add(p))}let c=0,d=o.filter((u,y)=>{let p=Yt(u?.id||u?.key,y);return!i.has(p)});return s.map((u,y)=>{let p=Yt(u?.id||u?.key,y);if(!r.includes(u,y))return Ks(u,y);let f=l.get(p);if(f)return Ks(f,y);let g=d[c];return g?(c++,Ks({...g,id:u.id||g.id},y)):Ks(u,y)})}function rS(t=[],e=[],r,s={}){if(!Array.isArray(t)||!r)return{edits:[],stats:{total:0,passed:0,droppedByScope:0,droppedByLock:0}};let o=cr(e),n=[],a=0,i=0;for(let l of t){let c=Number.isFinite(l?.tableIndex)?l.tableIndex:-1;if(c<0||c>=o.length){a++;continue}let d=o[c];if(!r.includes(d,c)){a++;continue}if(l.op===io.INSERT_ROW){n.push(l);continue}let u=Number.isFinite(l?.rowIndex)?l.rowIndex:-1;if(u<0||u>=(Array.isArray(d?.rows)?d.rows.length:0)){a++;continue}if(l.op===io.DELETE_ROW){if(Dc(s,c,u)){i++;continue}n.push(l);continue}n.push(l)}return{edits:n,stats:{total:t.length,passed:n.length,droppedByScope:a,droppedByLock:i}}}function sS(t=[],e){let r=cr(t);return e?r.map((s,o)=>{let n=Array.isArray(s?.columns)?s.columns:[];return e.includes(s,o)?{...Ks(s,o),scopeEditable:!0,scopeStatus:"editable"}:{...Ks(s,o),scopeEditable:!1,scopeStatus:"readonly",rows:Array.isArray(s?.rows)?s.rows.map((a,i)=>qg(a,i,n)):[]}}):r}function oS(t,e,r){return{target:{sourceMessageId:G(t?.sourceMessageId),sourceSwipeId:G(t?.sourceSwipeId||t?.effectiveSwipeId),slotBindingKey:G(t?.slotBindingKey),slotRevisionKey:G(t?.slotRevisionKey),slotTransactionId:G(t?.slotTransactionId)},loadMode:G(e?.loadMode),mergeBaseOnly:e?.mergeBaseOnly===!0,resolvedFromMessageId:G(e?.resolvedFromMessageId),resolvedFromRevisionKey:G(e?.resolvedFromRevisionKey),sourceKind:G(e?.sourceKind||e?.state?.meta?.sourceKind),scope:typeof r?.toJSON=="function"?r.toJSON():null,tables:sS(e?.state?.tables,r)}}function Yg(){return nS}function Gg(t,e){if(!t||typeof t!="string")return{key:t,source:"fallback"};if(!Array.isArray(e)||e.length===0)return{key:t,source:"fallback"};for(let s of e)if(s?.key===t)return{key:t,source:"direct"};if(/^\d+$/.test(t)){let s=parseInt(t,10);if(s>=0&&s<e.length&&e[s]?.key)return{key:e[s].key,source:"index"}}let r=t.match(/^col(?:_(\d+))?$/i);if(r){let s=r[1]?parseInt(r[1],10)-1:0;if(s>=0&&s<e.length&&e[s]?.key)return{key:e[s].key,source:"col_n"}}return{key:t,source:"fallback"}}function aS(t,e,r,s=null){let o=cr(t||[]),n=r||{},a={direct:0,index:0,col_n:0,fallback:0},i={},l={};if(Array.isArray(e))for(let c of e){let d=Number.isFinite(c?.tableIndex)?c.tableIndex:-1;i[d]=(i[d]||0)+1,l[c?.op||"unknown"]=(l[c?.op||"unknown"]||0)+1}he().info("applyIncrementalEdits \u603B\u89C8",{totalEdits:e?.length||0,tableCount:o.length,editsByTable:i,editsByOp:l});for(let c of e){let d=c.tableIndex;if(d<0||d>=o.length)continue;let u=o[d];if(!u||!Array.isArray(u.rows)||s&&!s.includes(u,d))continue;if(c.op===io.INSERT_ROW){let p={id:en("row"),name:"",cells:{}};if(c.data&&typeof c.data=="object"){p.name=G(c.data.name,"");let g=Array.isArray(u.columns)?u.columns:[];for(let[h,x]of Object.entries(c.data)){if(h==="name")continue;let{key:T,source:v}=Gg(h,g);p.cells[T]=G(x),a[v]=(a[v]||0)+1}}Object.keys(p.cells).length===0&&!p.name&&he().warn("applyIncrementalEdits: \u63D2\u5165\u7A7A\u884C\uFF08data \u89E3\u6790\u4E3A\u7A7A\uFF09",{tableIndex:d,tableName:u.name,editDataKeys:c.data?Object.keys(c.data):[],editDataPreview:JSON.stringify(c.data||{}).slice(0,200)}),u.rows.push(p);continue}let y=c.rowIndex;if(!(y<0||y>=u.rows.length)){if(c.op===io.DELETE_ROW){if(Dc(n,d,y))continue;u.rows.splice(y,1);continue}if(c.op===io.UPDATE_ROW){let p=u.rows[y];if(!p)continue;if(p.id=tn(p.id||p.rowId,y),p.cells=p.cells||{},c.data&&typeof c.data=="object"){let f=Array.isArray(u.columns)?u.columns:[];for(let[g,h]of Object.entries(c.data)){if(g==="name")continue;let{key:x,source:T}=Gg(g,f);Bg(n,d,y,x)||(p.cells[x]=G(h),a[T]=(a[T]||0)+1)}c.data.name!==void 0&&(p.name=G(c.data.name,p.name))}}}}return Object.values(a).some(c=>c>0)&&he().info("\u5217 key \u89E3\u6790\u7EDF\u8BA1",a),cr(o)}async function iS({executionContext:t,targetSnapshot:e,loadResult:r,config:s,assistantSnapshot:o,fillMode:n,runScope:a}={}){let i=Bt(s),l=n==="incremental"||!n&&i.fillMode!=="full",c=Jp(i,{skipResponseContract:l}),d=oS(e,r,a),u=Array.isArray(o?.tableState?.tables)?cr(o.tableState.tables):[],y=t?.chatHistory||t?.chatMessages||[],{contextDepth:p,contextRoles:f,contextExtractTags:g,contextUseGlobalRules:h,sendLatestRows:x}=i,T=i?.extraction?.regexPresetId||"",v=Wg(y,p,f),L=Wg(y,p,"all"),C=Hg(v,{extractTags:g,useGlobalRules:h,regexPresetId:T}),_=Hg(L,{extractTags:g,useGlobalRules:h,regexPresetId:T}),k=await Zn({worldbooks:i.worldbooks}),W=QT(d.tables,x),q={...d,tables:W},M={...t,toolName:"\u586B\u8868\u5DE5\u4F5C\u53F0",toolId:"tableWorkbench",lastAiMessage:t?.assistantBaseText||t?.lastAiMessage||"",recentMessagesText:C,rawRecentMessagesText:_,toolWorldbookContent:k,tableGuidance:ZT(i.tables),tableScopeGuidance:eS(a,d.tables),injectedContext:o?.injectedContext||It.getLatestMessageInjectedContext(e?.sourceMessageId),toolContentMacro:JSON.stringify(q,null,2),extractedContent:JSON.stringify(q,null,2),previousToolOutput:JSON.stringify(u,null,2)},S=await Ps.buildToolMessages(c,M),U=await Ps.buildPromptText(c,M);if(l&&(U+=Yg(),Array.isArray(S)&&S.length>0)){let Q=S[S.length-1];Q&&typeof Q.content=="string"&&(Q.content+=Yg())}if(!Array.isArray(S)||S.length===0)throw new Error("\u586B\u8868\u8BF7\u6C42\u6D88\u606F\u6784\u5EFA\u5931\u8D25\u3002");let j=i.apiPreset||"";try{let Q=Array.isArray(d?.tables)?d.tables:[],Ae=Q.filter(ce=>ce?.scopeEditable!==!1).map(ce=>G(ce?.updateConfig?.apiPreset,"")).filter(Boolean);Ae.length>0&&Ae.every(ce=>ce===Ae[0])&&(j=Ae[0],he().info("L3: \u8868\u7EA7 API \u9884\u8BBE\u751F\u6548",{preset:j,affectedTables:Q.filter(ce=>ce?.scopeEditable!==!1).map(ce=>ce?.name||ce?.id)}))}catch(Q){he().warn("L3 \u8868\u7EA7 API \u9884\u8BBE\u89E3\u6790\u5931\u8D25\uFF0C\u7528\u5168\u5C40",Q)}return{toolConfig:c,context:M,requestPayload:d,promptText:U,messages:S,fillMode:l?"incremental":"full",effectiveApiPreset:j,runScope:typeof a?.toJSON=="function"?a.toJSON():null}}async function lS(t,e={},r=null){let s=Bt(e),o=G(e?._effectiveApiPreset||s.apiPreset,"");if(o){if(!Do(o))throw new Error(`API \u9884\u8BBE\u4E0D\u5B58\u5728: ${o}`);return Ti(o,t,{},r)}return Lo(t,{},r)}function Ar({status:t=Ce.IDLE,targetSnapshot:e=null,skipReason:r="",startedAt:s=Date.now(),error:o=""}={}){return{lastAutoRunAt:s,lastAutoStatus:G(t,Ce.IDLE),lastAutoMessageId:G(e?.sourceMessageId,""),lastAutoRevisionKey:G(e?.slotRevisionKey,""),lastAutoSkipReason:G(r,""),...o?{lastError:o,lastErrorDetails:[o]}:{}}}function lr(t={},e=tt.MANUAL){let r=t&&typeof t=="object"?t:{};return Object.keys(r).length?Vp(r):null}function zs({targetSnapshot:t=null,startedAt:e=Date.now(),status:r="idle",skipReason:s="",warning:o="",writeback:n=null,aborted:a=!1,stale:i=!1,abortReason:l="",error:c=""}={}){return{isAutoRun:!0,status:r,startedAt:e,targetSnapshot:t,sourceMessageId:G(t?.sourceMessageId,""),sourceSwipeId:G(t?.sourceSwipeId||t?.effectiveSwipeId,""),slotRevisionKey:G(t?.slotRevisionKey,""),writebackStatus:n?.success===!0?"success":o?"warning":"",refreshConfirmed:n?.mirrorResult?.refreshConfirmed===!0,warning:G(o,""),skipReason:G(s,""),aborted:a===!0,stale:i===!0,abortReason:G(l,""),error:G(c,"")}}function ai(t=null){if(t?.signal?.aborted)return{aborted:!0,stale:!1,reason:"cancelled_before_host_commit"};if(typeof t?.shouldAbortWriteback=="function")try{return t.shouldAbortWriteback()||!1}catch{return{aborted:!0,stale:!0,reason:"stale_base_changed"}}return!1}async function Mn(t=null,e={}){return Jg({configInput:t,runSource:tt.MANUAL,clearBeforeUpdate:e?.clearBeforeUpdate===!0,executionContextBuilder:()=>gs({runSource:tt.MANUAL}),targetResolver:r=>vn(r,{runSource:tt.MANUAL})})}async function Vg({messageId:t,swipeId:e="",sourceEvent:r="AUTO_TABLE",configInput:s=null,signal:o=null,shouldAbortWriteback:n=null}={}){return Jg({configInput:s,runSource:tt.AUTO,autoMeta:{sourceEvent:r,messageId:G(t,""),swipeId:G(e,""),signal:o,shouldAbortWriteback:n},executionContextBuilder:()=>ms({messageId:t,swipeId:e,runSource:tt.AUTO}),targetResolver:a=>vn(a,{runSource:tt.AUTO})})}async function Jg({configInput:t=null,runSource:e=tt.MANUAL,executionContextBuilder:r,targetResolver:s,autoMeta:o=null,clearBeforeUpdate:n=!1}={}){let a=Bt(t||Pe()),i=kl(a),l=ha({tables:Array.isArray(a.tables)?a.tables:[]}),c=e===tt.AUTO,d=Date.now();if(he().info(`\u5F00\u59CB\u586B\u8868 [${e}]`,{isAutoRun:c,fillMode:a.fillMode}),!i.valid||!l.valid){let g=[...i.errors,...l.errors];return he().error("\u914D\u7F6E\u6821\u9A8C\u5931\u8D25",{errors:g}),lr({lastStatus:Ce.ERROR,lastRunAt:d,lastDurationMs:0,lastError:g[0]||"\u586B\u8868\u914D\u7F6E\u65E0\u6548\u3002",lastErrorDetails:g,lastValidationSummary:l.summary||{errorCount:g.length,warningCount:0},errorCount:Number(a?.runtime?.errorCount)||0,...c?Ar({status:Ce.ERROR,startedAt:d,skipReason:"invalid_config",error:g[0]||"\u586B\u8868\u914D\u7F6E\u65E0\u6548\u3002"}):{}},e),{success:!1,error:g.join(`
`),errors:g,...c?{meta:zs({startedAt:d,status:Ce.ERROR,skipReason:"invalid_config",error:g[0]||"\u586B\u8868\u914D\u7F6E\u65E0\u6548\u3002"})}:{}}}let u=a.runtime||{},y=Array.isArray(a.tables)?a.tables:[];try{let h=wo({})?.template?.tables;if(Array.isArray(h)&&h.length>0){let x=a.tableEnabledOverrides&&typeof a.tableEnabledOverrides=="object"?a.tableEnabledOverrides:{};if(y=h.map(v=>{let L=v?.id,C=L&&Object.prototype.hasOwnProperty.call(x,L)?x[L]:void 0,_=C!==void 0?C:v.enabled!==!1;return{...v,enabled:_}}),c){let v=Number.isFinite(targetSnapshot?.targetMessageIndex)?targetSnapshot.targetMessageIndex:-1,L=jg({chatId:targetSnapshot?.chatId||"",isolationKey:ie.getKey?ie.getKey():"",currentMessageIndex:v,scopeTables:y});y=y.map(C=>{let _=C?.id||C?.uid||"";return _&&!L.shouldUpdate.has(_)?{...C,enabled:!1}:C})}let T=y.filter(v=>v.enabled===!1).map(v=>v?.name||v?.id);T.length>0&&he().info("scopeTables: \u7528\u6237\u7981\u7528\u4E86\u90E8\u5206\u8868",{disabledCount:T.length,disabledNames:T})}}catch{}let p=$p(a.scope||a,y);if(he().info("runScope \u5DF2\u89E3\u6790",{mode:p.mode,requestedMode:p.requestedMode,staleScope:p.staleScope,scopeTablesCount:Array.isArray(y)?y.length:0,allowedTableIds:p.allowedTableIds,allTableIds:p.allTableIds,scopeTablesEnabled:Array.isArray(y)?y.map(g=>({id:g?.id,name:g?.name,enabled:g?.enabled})):[]}),p.staleScope&&he().warn("runScope: \u68C0\u6D4B\u5230 stale scope\uFF08activeTableId/selectedTableIds \u4E0D\u5728\u5F53\u524D tables \u8303\u56F4\u5185\uFF09\uFF0C\u5DF2\u81EA\u52A8 fallback \u5230 enabled",{requestedMode:p.requestedMode,requestedActiveTableId:p.activeTableId,requestedSelectedTableIds:p.selectedTableIds}),(p.mode==="current"||p.mode==="selected")&&p.allowedTableIds.length===0){let g=p.mode==="current"?"\u672A\u6307\u5B9A\u5F53\u524D\u8868\u683C\uFF0C\u65E0\u6CD5\u6267\u884C\u3002":"\u672A\u9009\u62E9\u4EFB\u4F55\u8868\u683C\uFF0C\u65E0\u6CD5\u6267\u884C\u3002";return he().warn(g,{mode:p.mode}),lr({lastStatus:Ce.ERROR,lastRunAt:d,lastDurationMs:0,lastError:g,lastErrorDetails:[g]},e),{success:!1,error:g,errors:[g]}}let f=null;lr({lastStatus:Ce.RUNNING,lastError:"",lastErrorDetails:[],lastValidationSummary:l.summary||{errorCount:0,warningCount:0},lastScopeMode:G(p.mode,""),...c?Ar({status:Ce.RUNNING,startedAt:d,skipReason:""}):{}},e);try{if(typeof r!="function")throw new Error("table_update_missing_execution_context_builder");if(typeof s!="function")throw new Error("table_update_missing_target_resolver");let g=await r();he().info("\u6267\u884C\u4E0A\u4E0B\u6587\u5DF2\u6784\u5EFA");let h=s(g);if(!h)throw new Error("\u5F53\u524D\u6CA1\u6709\u53EF\u7528\u7684 assistant \u76EE\u6807\u697C\u5C42\u3002");f=h,he().info("\u76EE\u6807\u6D88\u606F\u5DF2\u89E3\u6790",{sourceMessageId:h.sourceMessageId,slotRevisionKey:h.slotRevisionKey}),c&&lr(Ar({status:Ce.RUNNING,targetSnapshot:h,startedAt:d,skipReason:""}),e);let x=G(a.autoUpdateTrigger,"assistantMessage");if(c&&(!a.autoUpdateEnabled||x!=="assistantMessage")){let Y=a.autoUpdateEnabled?"auto_trigger_not_assistant_message":"auto_update_disabled";return lr(Ar({status:Ce.SKIPPED,targetSnapshot:h,startedAt:d,skipReason:Y}),e),{success:!1,skipped:!0,reason:Y,targetSnapshot:h,meta:zs({targetSnapshot:h,startedAt:d,status:Ce.SKIPPED,skipReason:Y})}}if(c){let Y=ai(o);if(Y)return lr(Ar({status:Ce.ABORTED,targetSnapshot:h,startedAt:d,skipReason:Y.reason,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88"}),e),{success:!1,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88",targetSnapshot:h,meta:zs({targetSnapshot:h,startedAt:d,status:Ce.ABORTED,skipReason:Y.reason,aborted:Y.aborted===!0,stale:Y.stale===!0,abortReason:Y.reason,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88"})}}let T=await Vf(h);if(!T?.success)throw new Error(T?.error||"\u76EE\u6807\u89E3\u6790\u8BB0\u5F55\u5931\u8D25");if(n&&Number.isFinite(h?.targetMessageIndex)&&h.targetMessageIndex>=0){he().info("clearBeforeUpdate \u542F\u7528\uFF0C\u6E05\u7A7A\u76EE\u6807\u697C\u5C42\u6570\u636E",{targetMessageIndex:h.targetMessageIndex});try{let Y=await Jf(h.targetMessageIndex);he().info("clearBeforeUpdate \u5B8C\u6210",Y)}catch(Y){he().error("clearBeforeUpdate \u5931\u8D25",Y)}}let v=Os(h.sourceMessageId),L=Array.isArray(y)&&y.length>0?y:a.tables;he().info("templateTables \u6765\u6E90",{usingActiveTemplate:y!==(Array.isArray(a.tables)?a.tables:[]),tableCount:Array.isArray(L)?L.length:0,firstTableName:L?.[0]?.name||"",firstTableId:L?.[0]?.id||""});let C=qf(h,{templateTables:L}),_=cr(C?.state?.tables||[]),k=Ig(),W=o?.signal||g?.signal||null;he().info("\u72B6\u6001\u5DF2\u52A0\u8F7D",{loadMode:C?.loadMode,sourceKind:C?.sourceKind,tableCount:_.length});let q=await k.buildRequest({buildRequest:iS},{executionContext:g,targetSnapshot:h,loadResult:C,config:a,assistantSnapshot:v,runScope:p});he().info("\u8BF7\u6C42\u5DF2\u6784\u5EFA",{messageCount:q?.messages?.length,fillMode:q?.fillMode});let M="",S=null,U=null;for(let Y=1;Y<=ni;Y++){if(W?.aborted)throw new Error("\u8BF7\u6C42\u5DF2\u53D6\u6D88");try{if(M=await k.sendRequest({sendRequest:lS},q,{config:{...a,_effectiveApiPreset:q?.effectiveApiPreset||""},abortSignal:W}),he().info("API \u54CD\u5E94\u5DF2\u6536\u5230",{attempt:Y,responseLength:M?.length||0}),S=k.parseResponse({parseResponse:VT},M),he().info("\u54CD\u5E94\u5DF2\u89E3\u6790",{attempt:Y,mode:S?.mode,hasEdits:!!S?.edits,hasTables:!!S?.tables,rawFormat:S?.rawFormat}),!(S?.mode==="incremental"&&Array.isArray(S.edits)&&S.edits.length>0||S?.mode==="full"&&S?.tables))throw new Error("AI \u54CD\u5E94\u4E2D\u672A\u627E\u5230\u6709\u6548\u7684 <tableEdit> \u6807\u7B7E\u6216\u8868\u683C JSON");U=null;break}catch(pe){if(U=pe,he().warn(`\u586B\u8868 attempt ${Y}/${ni} \u5931\u8D25`,{error:pe?.message||String(pe)}),Y<ni&&!await XT(JT,W))throw new Error("\u8BF7\u6C42\u5DF2\u53D6\u6D88\uFF08\u91CD\u8BD5\u7B49\u5F85\u671F\u95F4\uFF09")}}if(U)throw new Error(`\u586B\u8868\u5931\u8D25\uFF08${ni} \u6B21\u91CD\u8BD5\u540E\u4ECD\u5931\u8D25\uFF09: ${U?.message||String(U)}`);let j,Q=null,Ae=q.fillMode||"full",ce=null;if(S.mode==="incremental"&&S.edits){let Y=Og(C?.state,_),pe=rS(S.edits,_,p,Y);ce=pe.stats,j=aS(_,pe.edits,Y,p),Ae="incremental",(ce.droppedByScope>0||ce.droppedByLock>0)&&he().info("scope \u8FC7\u6EE4",ce)}else if(S.mode==="full"&&S.tables){let Y=cr(S.tables);j=tS(_,Y,p),Ae="full"}else j=cr(_);if(Q=kg(_,j),he().info("\u5DEE\u5F02\u5DF2\u8BA1\u7B97",{fillMode:Ae}),c){let Y=ai(o);if(Y)return lr(Ar({status:Ce.ABORTED,targetSnapshot:h,startedAt:d,skipReason:Y.reason,error:"\u5199\u56DE\u524D\u5DF2\u53D6\u6D88"}),e),{success:!1,error:"\u5199\u56DE\u524D\u5DF2\u53D6\u6D88",targetSnapshot:h,meta:zs({targetSnapshot:h,startedAt:d,status:Ce.ABORTED,aborted:Y.aborted===!0,stale:Y.stale===!0,abortReason:Y.reason,error:"\u5199\u56DE\u524D\u5DF2\u53D6\u6D88"})}}let de=await cg({targetSnapshot:h,nextTables:j,config:a,loadResult:C,diff:Q,fillMode:Ae,skipNotify:c});if(c){let Y=ai(o);if(Y)return lr(Ar({status:Ce.ABORTED,targetSnapshot:h,startedAt:d,skipReason:Y.reason,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88"}),e),{success:!1,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88",targetSnapshot:h,loadResult:C,request:q,responseText:M,parsed:S,fillMode:Ae,diff:Q,previousTables:_,nextTables:j,runScope:p,state:de?.state,bindings:de?.bindings,mirrorResult:de?.mirrorResult,warning:de?.warning||"",meta:zs({targetSnapshot:h,startedAt:d,status:Ce.ABORTED,warning:de?.warning||"",writeback:de,aborted:Y.aborted===!0,stale:Y.stale===!0,abortReason:Y.reason,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88"})}}if(!de?.success)throw new Error(de?.error||"\u7ED3\u6784\u5316\u5199\u56DE\u5931\u8D25");if(c)try{let Y=Number.isFinite(h?.targetMessageIndex)?h.targetMessageIndex:-1,pe=y.filter(be=>be?.enabled!==!1&&(be?.id||be?.uid)).map(be=>be.id||be.uid);pe.length>0&&Y>=0&&Ug(h?.chatId||"",ie.getKey?ie.getKey():"",pe,Y)}catch(Y){he().warn("recordTablesUpdated \u5931\u8D25\uFF08\u4E0D\u5F71\u54CD\u4E3B\u6D41\u7A0B\uFF09",Y)}let st=Date.now()-d;he().info(`\u586B\u8868\u5B8C\u6210 [${Ae}] ${st}ms`,{success:!0,writebackSuccess:de?.success,mirrorSuccess:de?.mirrorResult?.success});let dr={lastStatus:Ce.SUCCESS,lastRunAt:Date.now(),lastDurationMs:st,lastError:"",lastErrorDetails:[],lastValidationSummary:l.summary||{errorCount:0,warningCount:0},successCount:(Number(u.successCount)||0)+1,errorCount:Number(u.errorCount)||0,lastSourceMessageId:G(h.sourceMessageId),lastSlotRevisionKey:G(h.slotRevisionKey),lastLoadMode:G(C.loadMode),lastMirrorApplied:de?.mirrorResult?.success===!0,lastResolvedFromMessageId:G(C?.resolvedFromMessageId),lastResolvedFromRevisionKey:G(C?.resolvedFromRevisionKey),lastSourceKind:G(C?.sourceKind||C?.state?.meta?.sourceKind),lastScopeMode:G(p.mode,""),lastFillMode:Ae,...c?Ar({status:Ce.SUCCESS,targetSnapshot:h,startedAt:d,skipReason:""}):{}};return lr(dr,e),{success:!0,targetSnapshot:h,loadResult:C,request:q,responseText:M,parsed:S,fillMode:Ae,diff:Q,previousTables:_,nextTables:j,runScope:p,scopeStats:ce,state:de.state,bindings:de.bindings,mirrorResult:de.mirrorResult,warning:de.warning||"",...c?{meta:zs({targetSnapshot:h,startedAt:d,status:Ce.SUCCESS,warning:de.warning||"",writeback:de})}:{}}}catch(g){let h=Date.now()-d;he().error(`\u586B\u8868\u5931\u8D25 ${h}ms: ${g?.message||g}`,{stack:g?.stack});let x=c?ai(o):!1,T=g?.name==="AbortError"||g?.message==="\u8BF7\u6C42\u5DF2\u53D6\u6D88"||x?.aborted===!0||x?.stale===!0,v=T?Ce.ABORTED:Ce.ERROR,L={lastStatus:v,lastRunAt:Date.now(),lastDurationMs:h,lastError:g?.message||String(g),lastErrorDetails:[g?.message||String(g)],lastValidationSummary:l.summary||{errorCount:0,warningCount:0},successCount:Number(u.successCount)||0,errorCount:T?Number(u.errorCount)||0:(Number(u.errorCount)||0)+1,lastScopeMode:G(p.mode,""),...c?Ar({status:v,targetSnapshot:f,startedAt:d,skipReason:T?x?.reason||"cancelled_before_host_commit":"",error:g?.message||String(g)}):{}};return lr(L,e),{success:!1,error:g?.message||String(g),errors:[g?.message||String(g)],...c?{meta:zs({targetSnapshot:f,startedAt:d,status:v,skipReason:T?x?.reason||"cancelled_before_host_commit":"",aborted:T,stale:x?.stale===!0,abortReason:T?x?.reason||"cancelled_before_host_commit":"",error:g?.message||String(g)})}:{}}}}var ni,JT,nS,ii=N(()=>{hs();Ms();Bn();Ka();H();Ue();qa();Sn();sr();dg();si();Ag();Cg();fa();Rg();Lc();uo();ea();Js();Kr();Fg();Hr();ni=3,JT=5e3;nS=`

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

\u53EA\u8FD4\u56DE <tableEdit> \u6807\u7B7E\uFF0C\u4E0D\u8981\u9644\u52A0\u5176\u4ED6\u5185\u5BB9\u3002`});var Zg={};se(Zg,{WindowManager:()=>li,closeWindow:()=>Qg,createWindow:()=>Bc,windowManager:()=>Pt});function uS(){if(Pt.stylesInjected)return;Pt.stylesInjected=!0;let t=`
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
  `,e=pr(),r=e.createElement("style");r.id=dS+"_styles",r.textContent=t,(e.head||e.documentElement).appendChild(r)}function Bc(t){let{id:e,title:r="\u7A97\u53E3",content:s="",width:o=900,height:n=700,modal:a=!1,resizable:i=!0,maximizable:l=!0,startMaximized:c=!1,rememberState:d=!0,onClose:u,onReady:y}=t;uS();let p=window.jQuery||window.parent?.jQuery;if(!p)return cS.error("jQuery not available"),null;if(Pt.isOpen(e))return Pt.bringToFront(e),Pt.getWindow(e);let f=window.innerWidth||1200,g=window.innerHeight||800,h=f<=1100,x=null,T=!1;d&&(x=Pt.getState(e),x&&!h&&(T=!0));let v,L;T&&x.width&&x.height?(v=Math.max(400,Math.min(x.width,f-40)),L=Math.max(300,Math.min(x.height,g-40))):(v=Math.max(400,Math.min(o,f-40)),L=Math.max(300,Math.min(n,g-40)));let C=Math.max(20,Math.min((f-v)/2,f-v-20)),_=Math.max(20,Math.min((g-L)/2,g-L-20)),k=l&&!h,W=`
    <div class="yyt-window" id="${e}" style="left:${C}px; top:${_}px; width:${v}px; height:${L}px;">
      <div class="yyt-window-header">
        <div class="yyt-window-title">
          <i class="fa-solid fa-window-maximize"></i>
          <span>${pS(r)}</span>
        </div>
        <div class="yyt-window-controls">
          ${k?'<button class="yyt-window-btn maximize" title="\u6700\u5927\u5316/\u8FD8\u539F"><i class="fa-solid fa-expand"></i></button>':""}
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
  `,q=pr(),M=null;a&&(M=p(`<div class="yyt-window-overlay" data-for="${e}"></div>`),p(q.body).append(M));let S=p(W);p(q.body).append(S),Pt.register(e,S),S.on("mousedown",()=>Pt.bringToFront(e));let U=!1,j={left:C,top:_,width:v,height:L},Q=()=>{j={left:parseInt(S.css("left")),top:parseInt(S.css("top")),width:S.width(),height:S.height()},S.addClass("maximized"),S.find(".yyt-window-btn.maximize i").removeClass("fa-expand").addClass("fa-compress"),U=!0},Ae=()=>{S.removeClass("maximized"),S.css({left:j.left+"px",top:j.top+"px",width:j.width+"px",height:j.height+"px"}),S.find(".yyt-window-btn.maximize i").removeClass("fa-compress").addClass("fa-expand"),U=!1};S.find(".yyt-window-btn.maximize").on("click",()=>{U?Ae():Q()}),(h&&l||T&&x.isMaximized&&l||c&&l)&&Q(),S.find(".yyt-window-btn.close").on("click",()=>{if(d&&l){let pe={width:U?j.width:S.width(),height:U?j.height:S.height(),isMaximized:U};Pt.saveState(e,pe)}u&&u(),M&&M.remove(),S.remove(),Pt.unregister(e),p(document).off(".yytWindowDrag"+e),p(document).off(".yytWindowResize"+e)}),M&&M.on("click",pe=>{pe.target,M[0]});let ce=!1,de,st,dr,Y;if(S.find(".yyt-window-header").on("mousedown",pe=>{p(pe.target).closest(".yyt-window-controls").length||U||(ce=!0,de=pe.clientX,st=pe.clientY,dr=parseInt(S.css("left")),Y=parseInt(S.css("top")),p(document.body).css("user-select","none"))}),p(document).on("mousemove.yytWindowDrag"+e,pe=>{if(!ce)return;let be=pe.clientX-de,Nt=pe.clientY-st;S.css({left:Math.max(0,dr+be)+"px",top:Math.max(0,Y+Nt)+"px"})}),p(document).on("mouseup.yytWindowDrag"+e,()=>{ce&&(ce=!1,p(document.body).css("user-select",""))}),i){let pe=!1,be="",Nt,Ve,ur,He,Ro,Mo;S.find(".yyt-window-resize-handle").on("mousedown",function(kr){U||(pe=!0,be="",p(this).hasClass("se")?be="se":p(this).hasClass("e")?be="e":p(this).hasClass("s")?be="s":p(this).hasClass("w")?be="w":p(this).hasClass("n")?be="n":p(this).hasClass("nw")?be="nw":p(this).hasClass("ne")?be="ne":p(this).hasClass("sw")&&(be="sw"),Nt=kr.clientX,Ve=kr.clientY,ur=S.width(),He=S.height(),Ro=parseInt(S.css("left")),Mo=parseInt(S.css("top")),p(document.body).css("user-select","none"),kr.stopPropagation())}),p(document).on("mousemove.yytWindowResize"+e,kr=>{if(!pe)return;let Cr=kr.clientX-Nt,rs=kr.clientY-Ve,Us=400,js=300,Po=ur,No=He,ss=Ro,os=Mo;if(be.includes("e")&&(Po=Math.max(Us,ur+Cr)),be.includes("s")&&(No=Math.max(js,He+rs)),be.includes("w")){let ns=ur-Cr;ns>=Us&&(Po=ns,ss=Ro+Cr)}if(be.includes("n")){let ns=He-rs;ns>=js&&(No=ns,os=Mo+rs)}S.css({width:Po+"px",height:No+"px",left:ss+"px",top:os+"px"})}),p(document).on("mouseup.yytWindowResize"+e,()=>{pe&&(pe=!1,p(document.body).css("user-select",""))})}return S.on("remove",()=>{p(document).off(".yytWindowDrag"+e),p(document).off(".yytWindowResize"+e)}),y&&setTimeout(()=>y(S),50),S}function Qg(t){let e=Pt.getWindow(t);if(e){let r=window.jQuery||window.parent?.jQuery;r&&(r(`.yyt-window-overlay[data-for="${t}"]`).remove(),r(document).off(".yytWindowDrag"+t),r(document).off(".yytWindowResize"+t)),e.remove(),Pt.unregister(t)}}function pS(t){return typeof t!="string"?"":t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}var cS,dS,Xg,li,Pt,zc=N(()=>{Ke();H();Xe();cS=R.createScope("WindowManager"),dS="youyou_toolkit_window_manager",Xg="window_states",li=class{constructor(){this.windows=new Map,this.baseZIndex=1e4,this.topZIndex=1e4,this.stylesInjected=!1}register(e,r){this.topZIndex++,this.windows.set(e,{$el:r,zIndex:this.topZIndex}),r.css("z-index",this.topZIndex)}unregister(e){this.windows.delete(e)}bringToFront(e){let r=this.windows.get(e);r&&(this.topZIndex++,r.zIndex=this.topZIndex,r.$el.css("z-index",this.topZIndex))}getWindow(e){return this.windows.get(e)?.$el||null}isOpen(e){return this.windows.has(e)}closeAll(){this.windows.forEach((e,r)=>{e.$el&&e.$el.remove()}),this.windows.clear()}saveState(e,r){let s=this.loadStates();s[e]={...r,updatedAt:Date.now()},Ln.set(Xg,s)}loadStates(){return Ln.get(Xg)||{}}getState(e){return this.loadStates()[e]||null}},Pt=new li});function ze(){return Kc||(Kc=R.createScope("TableDataEditor")),Kc}function Ee(t){return String(t??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Le(){if(A.isDirty=!0,!!A.$window)try{A.$window.find('[data-action="save"], [data-action="save-global"]').prop("disabled",!1).removeAttr("disabled");let t=A.$window.find(".yyt-tde-toolbar-left").first();t.length&&t.find(".yyt-tde-dirty-badge").length===0&&t.append('<span class="yyt-tde-dirty-badge">\u672A\u4FDD\u5B58</span>')}catch{}}function em(){if(A.isDirty=!1,!!A.$window)try{A.$window.find('[data-action="save"]').prop("disabled",!0).attr("disabled","disabled"),A.$window.find(".yyt-tde-dirty-badge").remove()}catch{}}function gS(){if(!Uc)try{let t=window.parent&&window.parent.document?window.parent.document:document,e=t.head||t.documentElement;if(e.querySelector("#yyt-tde-styles")){Uc=!0;return}let r=t.createElement("style");r.id="yyt-tde-styles",r.textContent=fS,e.appendChild(r),Uc=!0}catch(t){ze().warn("\u6CE8\u5165\u6570\u636E\u7F16\u8F91\u5668\u6837\u5F0F\u5931\u8D25",t)}}function jc(){let t=[],e=null,r=!1,s=A._afterSaveGlobalAt&&Date.now()-A._afterSaveGlobalAt<5*60*1e3;try{let o=Os(null);ze().info("loadEditorData snapshot",{hasSnapshot:!!o,messageId:o?.message?.message_id??o?.sourceMessageId,chatId:o?.chatId,isolationKey:o?.tableState?.meta?.isolationKey,hasTableState:!!o?.tableState,tableStateTablesLen:Array.isArray(o?.tableState?.tables)?o.tableState.tables.length:null,firstTableNameInSlot:o?.tableState?.tables?.[0]?.name,afterSaveGlobalRecent:s}),!s&&Array.isArray(o?.tableState?.tables)&&o.tableState.tables.length>0&&(t=o.tableState.tables),e=o?{chatId:o.chatId||"",sourceMessageId:o.sourceMessageId||o.message?.message_id||"",sourceSwipeId:o.sourceSwipeId||"",effectiveSwipeId:o.effectiveSwipeId||"",slotBindingKey:o.slotBindingKey||"",slotRevisionKey:o.slotRevisionKey||"",slotTransactionId:o.slotTransactionId||"",traceId:o.traceId||"",targetMessageIndex:o.targetMessageIndex??-1}:null}catch(o){ze().warn("loadEditorData \u5F02\u5E38",o)}if(t.length===0)try{let n=wo({})?.template?.tables;Array.isArray(n)&&n.length>0&&(t=ae(n),r=!0)}catch(o){ze().warn("\u4ECE\u6A21\u677F fallback \u5931\u8D25",o)}A.tempData=ae(t)||[],A.targetSnapshot=e,A.isDirty=!1,A.isFromTemplate=r,A._pendingMirrorTag=null,A.currentTableIndex>=A.tempData.length?A.currentTableIndex=A.tempData.length>0?0:-1:A.currentTableIndex<0&&A.tempData.length>0&&(A.currentTableIndex=0)}function rm(){return`
    <div class="yyt-tde">
      ${sm()}
      <div class="yyt-tde-content">
        ${mS()}
        <main class="yyt-tde-main">${hS()}</main>
      </div>
    </div>
  `}function sm(){return`
    <div class="yyt-tde-toolbar">
      <div class="yyt-tde-toolbar-left">
        <div class="yyt-tde-mode-switch">
          <button class="${A.mode==="data"?"active":""}" data-mode="data">\u6570\u636E\u7F16\u8F91</button>
          <button class="${A.mode==="schema"?"active":""}" data-mode="schema">\u7ED3\u6784\u914D\u7F6E</button>
          <button class="${A.mode==="global"?"active":""}" data-mode="global">\u5168\u5C40\u6CE8\u5165</button>
        </div>
        ${A.isDirty?'<span class="yyt-tde-dirty-badge">\u672A\u4FDD\u5B58</span>':""}
      </div>
      <div class="yyt-tde-actions">
        <button class="yyt-tde-btn" data-action="reload"><i class="fa-solid fa-rotate"></i> \u91CD\u65B0\u52A0\u8F7D</button>
        <button class="yyt-tde-btn" data-action="save" ${A.isDirty?"":"disabled"} title="\u4FDD\u5B58\u5230\u5F53\u524D\u6D88\u606F\u7684 slot"><i class="fa-solid fa-floppy-disk"></i> \u4FDD\u5B58\u5230 chat</button>
        <button class="yyt-tde-btn" data-action="save-global" title="\u4FDD\u5B58\u5230\u5168\u5C40\u6FC0\u6D3B\u6A21\u677F\uFF08\u5F71\u54CD\u6240\u6709 chat \u540E\u7EED\u586B\u8868\uFF09"><i class="fa-solid fa-globe"></i> \u4FDD\u5B58\u5230\u5168\u5C40</button>
        <button class="yyt-tde-btn yyt-tde-btn-primary" data-action="run-now"><i class="fa-solid fa-play"></i> \u7ACB\u5373\u586B\u8868</button>
      </div>
    </div>
  `}function mS(){let t=A.tempData||[],e=t.map((r,s)=>{let o=r?.name||`\u8868 ${s+1}`,n=Array.isArray(r?.rows)?r.rows.length:0;return`
      <div class="yyt-tde-sheet-item-wrap ${s===A.currentTableIndex?"active":""}">
        <button class="yyt-tde-sheet-item" data-sheet-index="${s}">
          <span class="yyt-tde-sheet-idx">[${s}]</span>
          <span class="yyt-tde-sheet-name">${Ee(o)}</span>
          <span class="yyt-tde-sheet-count">${n}</span>
        </button>
        <div class="yyt-tde-sheet-actions">
          <button class="yyt-tde-btn-icon" data-action="sheet-move-up" data-sheet-index="${s}" title="\u4E0A\u79FB" ${s===0?"disabled":""}><i class="fa-solid fa-arrow-up"></i></button>
          <button class="yyt-tde-btn-icon" data-action="sheet-move-down" data-sheet-index="${s}" title="\u4E0B\u79FB" ${s===t.length-1?"disabled":""}><i class="fa-solid fa-arrow-down"></i></button>
          <button class="yyt-tde-btn-icon yyt-tde-btn-danger" data-action="sheet-delete" data-sheet-index="${s}" title="\u5220\u9664\u6B64\u8868"><i class="fa-solid fa-trash"></i></button>
        </div>
      </div>
    `}).join("");return`
    <nav class="yyt-tde-sidebar">
      <div class="yyt-tde-sidebar-label">\u8868\u683C\u5217\u8868 (${t.length})</div>
      <div class="yyt-tde-sheet-list">
        ${e||'<div style="padding: 8px 10px; font-size: 11px; color: var(--tde-text-muted);">\u6682\u65E0\u8868</div>'}
      </div>
      <button class="yyt-tde-btn-add-field" data-action="sheet-add" style="margin: 10px;"><i class="fa-solid fa-plus"></i> \u6DFB\u52A0\u65B0\u8868</button>
    </nav>
  `}function hS(){let t=A.tempData||[],e=A.currentTableIndex,r=e>=0&&e<t.length?t[e]:null;return A.mode==="global"?wS():t.length===0?'<div class="yyt-tde-empty">\u5F53\u524D slot \u6CA1\u6709\u8868\u6570\u636E\uFF0C\u6A21\u677F\u4E5F\u672A\u914D\u7F6E\u8868\u3002<br>\u8BF7\u5148\u5728\u5DE5\u4F5C\u53F0\u70B9"\u7ACB\u5373\u586B\u8868"\u8BA9 AI \u521D\u59CB\u5316\uFF0C\u6216\u5230\u300C\u9884\u8BBE\u7BA1\u7406 \u2192 \u8868\u683C\u6A21\u677F\u300D\u914D\u7F6E\u6A21\u677F\u3002</div>':r?A.mode==="data"?bS(r,e):A.mode==="schema"?xS(r,e):"":'<div class="yyt-tde-empty">\u8BF7\u4ECE\u5DE6\u4FA7\u9009\u62E9\u4E00\u5F20\u8868\u3002</div>'}function bS(t,e){let r=Array.isArray(t?.columns)?t.columns:[],s=Array.isArray(t?.rows)?t.rows:[],o=A.targetSnapshot?.chatId||"",n=t?.uid||t?.id||"",a={cols:{},rows:{},cells:{},indexCol:!1};try{a=Co({chatId:o,isolationKey:ie.getKey()},n)||a}catch{}let i=a?.rows||{},l=a?.cells||{},c=A.isFromTemplate?'<div class="yyt-tde-schema-hint" style="margin-bottom:12px;">\u5F53\u524D\u663E\u793A<b>\u6A21\u677F\u9ED8\u8BA4\u7ED3\u6784</b>\uFF08slot \u5C1A\u65E0\u6570\u636E\uFF09\u3002\u76F4\u63A5\u6DFB\u52A0\u884C\u6216\u7F16\u8F91\u4F1A\u521B\u5EFA slot \u6570\u636E\uFF1B\u6216\u5DE5\u4F5C\u53F0\u70B9"\u7ACB\u5373\u586B\u8868"\u8BA9 AI \u586B\u3002</div>':"",d=s.map((u,y)=>{let p=u?.cells||{},f=!!i[y],g=r.map(h=>{let x=h?.key||"",T=h?.title||x,v=p[x],L=v==null||v==="",C=L?"\uFF08\u7A7A\uFF09":String(v),_=`${y}::${x}`,k=!!l[_];return`
        <div class="yyt-tde-field${k?" yyt-tde-cell-locked":""}">
          <div class="yyt-tde-field-label">
            ${Ee(T)}
            <button class="yyt-tde-cell-lock-btn ${k?"yyt-tde-locked-btn":""}" data-action="cell-lock" data-sheet-uid="${Ee(n)}" data-row-index="${y}" data-col-key="${Ee(x)}" title="${k?"\u5DF2\u9501\u5B9A\u6B64\u5355\u5143\u683C":"\u9501\u5B9A\u6B64\u5355\u5143\u683C\uFF08AI \u4E0D\u4F1A\u6539\uFF09"}"><i class="fa-solid ${k?"fa-lock":"fa-unlock"}"></i></button>
          </div>
          <div class="yyt-tde-field-cell ${L?"yyt-tde-field-cell--empty":""}${k?" yyt-tde-cell-locked-bg":""}"
               contenteditable="${k?"false":"true"}"
               data-row-index="${y}"
               data-col-key="${Ee(x)}">${Ee(C)}</div>
        </div>
      `}).join("");return`
      <article class="yyt-tde-card${f?" yyt-tde-row-locked":""}" data-row-index="${y}">
        <header class="yyt-tde-card-header">
          <span class="yyt-tde-card-index">#${y+1}</span>
          <input class="yyt-tde-card-name" value="${Ee(u?.name||"")}" data-row-name-index="${y}" placeholder="\u884C\u540D"${f?" readonly":""}>
          <div class="yyt-tde-card-actions">
            <button class="yyt-tde-icon-btn ${f?"yyt-tde-locked-btn":""}" data-action="row-lock" data-sheet-uid="${Ee(n)}" data-row-index="${y}" title="${f?"\u5DF2\u9501\u5B9A\u6B64\u884C":"\u9501\u5B9A\u6B64\u884C\uFF08AI \u4E0D\u4F1A\u6539\uFF09"}"><i class="fa-solid ${f?"fa-lock":"fa-unlock"}"></i></button>
            <button class="yyt-tde-icon-btn danger" data-action="delete-row" data-row-index="${y}" title="\u5220\u9664\u884C"${f?" disabled":""}><i class="fa-regular fa-trash-can"></i></button>
          </div>
        </header>
        <div class="yyt-tde-card-body">${g||'<div style="padding:8px;color:var(--tde-text-muted);font-size:12px;">\u8BE5\u8868\u6CA1\u6709\u5217\u5B9A\u4E49</div>'}</div>
      </article>
    `}).join("");return`
    ${c}
    <div class="yyt-tde-card-grid">
      ${d}
      <button class="yyt-tde-card-add" data-action="add-row">
        <i class="fa-solid fa-plus"></i> \u6DFB\u52A0\u884C
      </button>
    </div>
  `}function xS(t,e){let r=Array.isArray(t?.columns)?t.columns:[],s=t?.sourceData||{},o=t?.aiInstructions||{},n=t?.updateConfig||{},a=A.targetSnapshot?.chatId||"",i=t?.uid||t?.id||"",l={cols:{},rows:{},cells:{},indexCol:!1};try{l=Co({chatId:a,isolationKey:ie.getKey()},i)||l}catch{}let c=l?.cols||{},d=r.map((u,y)=>{let p=u?.key||"",f=p?!!c[p]:!1;return`
    <div class="yyt-tde-schema-row yyt-tde-schema-field${f?" yyt-tde-field-locked":""}" data-field-index="${y}">
      <div class="yyt-tde-schema-field-head">
        <span class="yyt-tde-schema-idx">[${y}]</span>
        <input class="yyt-tde-input yyt-tde-input-title" data-action="field-title" data-field-index="${y}" value="${Ee(u?.title||u?.key||"")}" placeholder="\u5B57\u6BB5\u6807\u9898" />
        <input class="yyt-tde-input yyt-tde-input-key" data-action="field-key" data-field-index="${y}" value="${Ee(u?.key||"")}" placeholder="key" />
        <select class="yyt-tde-input yyt-tde-input-type" data-action="field-type" data-field-index="${y}">
          ${["text","number","boolean","date","json"].map(g=>`<option value="${g}" ${u?.type===g?"selected":""}>${g}</option>`).join("")}
        </select>
        <button class="yyt-tde-btn-icon ${f?"yyt-tde-locked-btn":""}" data-action="field-lock" data-sheet-uid="${Ee(i)}" data-col-key="${Ee(p)}" title="${f?"\u5DF2\u9501\u5B9A\uFF1AAI \u4E0D\u4F1A\u6539\u8FD9\u5217\u3002\u70B9\u51FB\u89E3\u9501":"\u9501\u5B9A\u6B64\u5217\uFF1AAI \u6C38\u4E0D\u4FEE\u6539"}"><i class="fa-solid ${f?"fa-lock":"fa-unlock"}"></i></button>
        <button class="yyt-tde-btn-icon yyt-tde-btn-danger" data-action="field-delete" data-field-index="${y}" title="\u5220\u9664\u6B64\u5B57\u6BB5"><i class="fa-solid fa-trash"></i></button>
      </div>
      <textarea class="yyt-tde-input yyt-tde-input-desc" data-action="field-desc" data-field-index="${y}" placeholder="\u5B57\u6BB5\u63CF\u8FF0">${Ee(u?.description||"")}</textarea>
    </div>
  `}).join("");return`
    <div class="yyt-tde-schema-section">
      <div class="yyt-tde-schema-heading">\u57FA\u7840\u4FE1\u606F</div>
      <div class="yyt-tde-schema-row">
        <div class="yyt-tde-schema-key">\u8868\u540D</div>
        <div class="yyt-tde-schema-value">
          <input class="yyt-tde-input" data-action="table-name" value="${Ee(t?.name||"")}" />
        </div>
      </div>
      <div class="yyt-tde-schema-row">
        <div class="yyt-tde-schema-key">UID</div>
        <div class="yyt-tde-schema-value"><code style="font-size:11px;color:var(--tde-accent);">${Ee(t?.uid||t?.id||"")}</code></div>
      </div>
      <div class="yyt-tde-schema-row">
        <div class="yyt-tde-schema-key">\u8868\u8BF4\u660E</div>
        <div class="yyt-tde-schema-value">
          <textarea class="yyt-tde-input" data-action="table-note" placeholder="\u8868\u7528\u9014\u8BF4\u660E + \u5217\u6CE8\u91CA">${Ee(t?.note||s?.note||"")}</textarea>
        </div>
      </div>
    </div>

    <div class="yyt-tde-schema-section">
      <div class="yyt-tde-schema-heading">AI \u64CD\u4F5C\u8BF4\u660E (sourceData)</div>
      <div class="yyt-tde-schema-row yyt-tde-schema-sd">
        <div class="yyt-tde-schema-key">\u521D\u59CB\u5316 (init)</div>
        <div class="yyt-tde-schema-value">
          <textarea class="yyt-tde-input" data-action="sd-init" placeholder="\u8868\u4E3A\u7A7A\u65F6 AI \u5E94\u8BE5\u63D2\u5165\u4EC0\u4E48">${Ee(o?.init||s?.initNode||"")}</textarea>
        </div>
      </div>
      <div class="yyt-tde-schema-row yyt-tde-schema-sd">
        <div class="yyt-tde-schema-key">\u65B0\u589E (insert)</div>
        <div class="yyt-tde-schema-value">
          <textarea class="yyt-tde-input" data-action="sd-create" placeholder="\u4EC0\u4E48\u60C5\u51B5\u4E0B AI \u5E94\u8BE5\u65B0\u589E\u884C">${Ee(o?.create||s?.insertNode||"")}</textarea>
        </div>
      </div>
      <div class="yyt-tde-schema-row yyt-tde-schema-sd">
        <div class="yyt-tde-schema-key">\u66F4\u65B0 (update)</div>
        <div class="yyt-tde-schema-value">
          <textarea class="yyt-tde-input" data-action="sd-update" placeholder="\u4EC0\u4E48\u60C5\u51B5\u4E0B AI \u5E94\u8BE5\u66F4\u65B0\u884C">${Ee(o?.update||s?.updateNode||"")}</textarea>
        </div>
      </div>
      <div class="yyt-tde-schema-row yyt-tde-schema-sd">
        <div class="yyt-tde-schema-key">\u5220\u9664 (delete)</div>
        <div class="yyt-tde-schema-value">
          <textarea class="yyt-tde-input" data-action="sd-delete" placeholder="\u4EC0\u4E48\u60C5\u51B5\u4E0B AI \u5E94\u8BE5\u5220\u9664\u884C">${Ee(o?.delete||s?.deleteNode||"")}</textarea>
        </div>
      </div>
    </div>

    <div class="yyt-tde-schema-section">
      <div class="yyt-tde-schema-heading">\u66F4\u65B0\u914D\u7F6E (updateConfig)</div>
      <div class="yyt-tde-hint" style="margin-bottom:8px;font-size:11px;color:var(--tde-text-muted);">
        <strong>\u8BF4\u660E</strong>\uFF1A\u8FD9\u91CC\u914D\u7F6E AI \u586B\u8868\u65F6\u8FD9\u5F20\u8868\u7684\u884C\u4E3A\uFF08\u9891\u7387\u3001\u4E0A\u4E0B\u6587\u6DF1\u5EA6\u3001token \u8282\u7701\uFF09\u3002
        \u8DDF\u300C\u4E16\u754C\u4E66\u6CE8\u5165\u300D\u662F\u4E24\u4EF6\u4E8B\uFF1A\u4E16\u754C\u4E66\u662F\u628A\u8868\u6570\u636E\u585E\u8FDB prompt \u7ED9\u4E3B AI \u770B\uFF08\u5408\u5E76\u6761\u76EE / \u72EC\u7ACB\u6761\u76EE\u5728<strong>\u5168\u5C40\u6CE8\u5165</strong> tab \u914D\uFF09\uFF0C
        \u8FD9\u91CC\u662F\u63A7\u5236<strong>\u586B\u8868\u65F6\u673A</strong>\uFF08\u591A\u4E45\u586B\u4E00\u6B21\u3001\u8DF3\u8FC7\u51E0\u5C42\u7B49\uFF09\u3002-1 = \u6CBF\u7528\u5168\u5C40\uFF0C0 = \u7981\u7528\u5355\u8868\u3002
      </div>
      <div class="yyt-tde-uc-grid">
        <div class="yyt-tde-uc-cell">
          <label>\u4E0A\u4E0B\u6587\u6DF1\u5EA6 (contextDepth)</label>
          <input type="number" class="yyt-tde-input" data-action="uc-contextDepth" value="${Number.isFinite(n?.contextDepth)?n.contextDepth:-1}" min="-1" />
          <span class="yyt-tde-hint">-1 = \u6CBF\u7528\u5168\u5C40\uFF0C0 = \u7981\u7528\uFF0CN = \u6700\u8FD1 N \u6761\u6D88\u606F</span>
        </div>
        <div class="yyt-tde-uc-cell">
          <label>\u66F4\u65B0\u9891\u7387 (updateFrequency)</label>
          <input type="number" class="yyt-tde-input" data-action="uc-updateFrequency" value="${Number.isFinite(n?.updateFrequency)?n.updateFrequency:-1}" min="-1" />
          <span class="yyt-tde-hint">-1 = \u6CBF\u7528\u5168\u5C40\uFF0C0 = \u7981\u7528\u81EA\u52A8\u586B\u8868\uFF0CN = \u6BCF N \u6761\u6D88\u606F\u89E6\u53D1\u4E00\u6B21</span>
        </div>
        <div class="yyt-tde-uc-cell">
          <label>\u6279\u6B21\u5927\u5C0F (batchSize)</label>
          <input type="number" class="yyt-tde-input" data-action="uc-batchSize" value="${Number.isFinite(n?.batchSize)?n.batchSize:-1}" min="-1" />
          <span class="yyt-tde-hint">-1 = \u6CBF\u7528\u5168\u5C40\uFF0CN = \u5355\u6B21\u6700\u591A\u5904\u7406 N \u5F20\u8868</span>
        </div>
        <div class="yyt-tde-uc-cell">
          <label>\u8DF3\u8FC7\u697C\u5C42 (skipFloors)</label>
          <input type="number" class="yyt-tde-input" data-action="uc-skipFloors" value="${Number.isFinite(n?.skipFloors)?n.skipFloors:-1}" min="-1" />
          <span class="yyt-tde-hint">-1 = \u6CBF\u7528\u5168\u5C40\uFF0CN = \u8DF3\u8FC7\u6700\u8FD1 N \u5C42</span>
        </div>
        <div class="yyt-tde-uc-cell">
          <label>\u53D1\u9001\u6700\u65B0 N \u884C (sendLatestRows)</label>
          <input type="number" class="yyt-tde-input" data-action="uc-sendLatestRows" value="${Number.isFinite(n?.sendLatestRows)?n.sendLatestRows:-1}" min="-1" />
          <span class="yyt-tde-hint">-1 = \u5168\u90E8\u53D1\u9001\uFF0C0 = \u6CBF\u7528\u5168\u5C40\uFF0CN = \u4EC5\u53D1\u9001\u6700\u65B0 N \u884C\uFF08\u5927\u8868 token \u8282\u7701\uFF09</span>
        </div>
        <div class="yyt-tde-uc-cell">
          <label>\u5206\u7EC4 ID (groupId)</label>
          <input class="yyt-tde-input" data-action="uc-groupId" value="${Ee(n?.groupId||"")}" placeholder="\u540C\u7EC4 ID \u7684\u8868\u4F1A\u5408\u5E76\u89E6\u53D1" />
          <span class="yyt-tde-hint">\u540C\u7EC4\u540C\u65F6\u89E6\u53D1\uFF0C\u8DE8\u7EC4\u5E76\u884C\uFF08\u7559\u7A7A = \u72EC\u7ACB\u89E6\u53D1\uFF09</span>
        </div>
        <div class="yyt-tde-uc-cell yyt-tde-uc-cell-wide">
          <label>\u8868\u7EA7 API \u9884\u8BBE\u8986\u76D6</label>
          <input class="yyt-tde-input" data-action="uc-apiPreset" value="${Ee(n?.apiPreset||"")}" placeholder="\u7559\u7A7A = \u6CBF\u7528\u5168\u5C40\uFF0C\u586B\u9884\u8BBE\u540D = \u8FD9\u5F20\u8868\u7528\u8FD9\u4E2A" />
          <span class="yyt-tde-hint">\u4F8B\uFF1A\u89D2\u8272\u8868\u7528 Claude\u3001\u7EAA\u8981\u8868\u7528 GPT</span>
        </div>
      </div>
    </div>

    <div class="yyt-tde-schema-section">
      <div class="yyt-tde-schema-heading">\u5B57\u6BB5\u5B9A\u4E49 (${r.length})</div>
      ${d||'<div style="color:var(--tde-text-muted);font-size:12px;padding:8px 0;">\u65E0\u5B57\u6BB5</div>'}
      <button class="yyt-tde-btn yyt-tde-btn-add-field" data-action="field-add"><i class="fa-solid fa-plus"></i> \u6DFB\u52A0\u5B57\u6BB5</button>
    </div>
  `}function wS(){let t=Array.isArray(A.tempData)?A.tempData:[];if(t.length===0)return'<div class="yyt-tde-empty">\u65E0\u8868\u683C\u53EF\u914D\u7F6E\u3002\u8BF7\u5148\u6DFB\u52A0\u8868\u683C\u3002</div>';let e="yyt-table-workbench";try{e=Pe()?.mirrorTag||e}catch{}let r=t.map((s,o)=>{let n=s?.exportConfig||{},a=n.entryPlacement||{},i=n.extraIndexPlacement||{};return`
      <div class="yyt-tde-global-card" data-table-index="${o}">
        <div class="yyt-tde-global-card-head">
          <span class="yyt-tde-global-card-name">${Ee(s?.name||`\u8868 ${o+1}`)}</span>
          <label class="yyt-tde-toggle-inline">
            <input type="checkbox" data-action="ec-enabled" data-table-index="${o}" ${n.enabled===!0?"checked":""} />
            <span>\u542F\u7528\u72EC\u7ACB\u6CE8\u5165</span>
          </label>
        </div>
        <div class="yyt-tde-global-card-body ${n.enabled===!0?"":"yyt-tde-disabled-section"}">
          <div class="yyt-tde-uc-grid">
            <div class="yyt-tde-uc-cell">
              <label>\u6761\u76EE\u540D (entryName)</label>
              <input class="yyt-tde-input" data-action="ec-entryName" data-table-index="${o}" value="${Ee(n.entryName||s?.name||"")}" />
            </div>
            <div class="yyt-tde-uc-cell">
              <label>\u6761\u76EE\u7C7B\u578B (entryType)</label>
              <select class="yyt-tde-input" data-action="ec-entryType" data-table-index="${o}">
                <option value="constant" ${n.entryType==="constant"?"selected":""}>constant (\u5E38\u9A7B)</option>
                <option value="keyword" ${n.entryType==="keyword"?"selected":""}>keyword (\u5173\u952E\u8BCD\u89E6\u53D1)</option>
              </select>
            </div>
            <div class="yyt-tde-uc-cell yyt-tde-uc-cell-wide">
              <label>\u89E6\u53D1\u5173\u952E\u8BCD (keywords)</label>
              <input class="yyt-tde-input" data-action="ec-keywords" data-table-index="${o}" value="${Ee(n.keywords||"")}" placeholder="\u7528\u9017\u53F7\u6216\u6362\u884C\u5206\u9694" />
            </div>
            <div class="yyt-tde-uc-cell">
              <label>\u6309\u884C\u62C6\u5206 (splitByRow)</label>
              <select class="yyt-tde-input" data-action="ec-splitByRow" data-table-index="${o}">
                <option value="false" ${n.splitByRow?"":"selected"}>\u5426\uFF08\u6574\u5F20\u8868\u4E00\u4E2A\u6761\u76EE\uFF09</option>
                <option value="true" ${n.splitByRow?"selected":""}>\u662F\uFF08\u6BCF\u884C\u4E00\u4E2A\u6761\u76EE\uFF09</option>
              </select>
            </div>
            <div class="yyt-tde-uc-cell">
              <label>\u9632\u9012\u5F52 (preventRecursion)</label>
              <select class="yyt-tde-input" data-action="ec-preventRecursion" data-table-index="${o}">
                <option value="true" ${n.preventRecursion!==!1?"selected":""}>\u662F</option>
                <option value="false" ${n.preventRecursion===!1?"selected":""}>\u5426</option>
              </select>
            </div>
            <div class="yyt-tde-uc-cell yyt-tde-uc-cell-wide">
              <label>\u6CE8\u5165\u6A21\u677F (injectionTemplate)</label>
              <textarea class="yyt-tde-input" data-action="ec-injectionTemplate" data-table-index="${o}" placeholder="\u4F8B\uFF1A\u4EE5\u4E0B\u662F {{tableName}} \u7684\u6700\u65B0\u6570\u636E\uFF1A{{tableContent}}">${Ee(n.injectionTemplate||"")}</textarea>
            </div>
          </div>

          <div class="yyt-tde-schema-heading" style="margin-top:12px;">\u6761\u76EE\u4F4D\u7F6E (entryPlacement)</div>
          <div class="yyt-tde-uc-grid">
            <div class="yyt-tde-uc-cell">
              <label>position</label>
              <select class="yyt-tde-input" data-action="ec-ep-position" data-table-index="${o}">
                ${["before_character_definition","after_character_definition","before_authors_note","after_authors_note"].map(l=>`<option value="${l}" ${(a.position||"before_character_definition")===l?"selected":""}>${l}</option>`).join("")}
              </select>
            </div>
            <div class="yyt-tde-uc-cell">
              <label>depth</label>
              <input type="number" class="yyt-tde-input" data-action="ec-ep-depth" data-table-index="${o}" value="${Number.isFinite(a.depth)?a.depth:2}" />
            </div>
            <div class="yyt-tde-uc-cell">
              <label>order</label>
              <input type="number" class="yyt-tde-input" data-action="ec-ep-order" data-table-index="${o}" value="${Number.isFinite(a.order)?a.order:0}" />
            </div>
          </div>

          <div class="yyt-tde-schema-heading" style="margin-top:12px;">\u989D\u5916\u7D22\u5F15\u4F4D\u7F6E (extraIndexPlacement\uFF0C\u53EF\u9009)</div>
          <div class="yyt-tde-uc-grid">
            <div class="yyt-tde-uc-cell">
              <label>position</label>
              <select class="yyt-tde-input" data-action="ec-exi-position" data-table-index="${o}">
                ${["before_character_definition","after_character_definition","before_authors_note","after_authors_note"].map(l=>`<option value="${l}" ${(i.position||"before_character_definition")===l?"selected":""}>${l}</option>`).join("")}
              </select>
            </div>
            <div class="yyt-tde-uc-cell">
              <label>depth</label>
              <input type="number" class="yyt-tde-input" data-action="ec-exi-depth" data-table-index="${o}" value="${Number.isFinite(i.depth)?i.depth:2}" />
            </div>
            <div class="yyt-tde-uc-cell">
              <label>order</label>
              <input type="number" class="yyt-tde-input" data-action="ec-exi-order" data-table-index="${o}" value="${Number.isFinite(i.order)?i.order:0}" />
            </div>
          </div>
        </div>
      </div>
    `}).join("");return`
    <div class="yyt-tde-schema-hint" style="background:rgba(74,158,255,0.08);border-color:rgba(74,158,255,0.3);">
      <strong>\u5168\u5C40\u6CE8\u5165\u914D\u7F6E</strong> \u2014 \u6BCF\u5F20\u8868\u7684 exportConfig\uFF08\u72EC\u7ACB\u4E16\u754C\u4E66\u6761\u76EE\uFF09+ placement\uFF08\u6CE8\u5165\u4F4D\u7F6E/\u6DF1\u5EA6/\u987A\u5E8F\uFF09\u3002
      \u672A\u542F\u7528\u300C\u72EC\u7ACB\u6CE8\u5165\u300D\u7684\u8868\u4F1A\u8D70\u5168\u5C40 wrapper\uFF08\u5DE5\u4F5C\u53F0\u300C\u540C\u6B65\u5230\u4E16\u754C\u4E66\u300D\u5F00\u5173\uFF09\u3002
    </div>
    <div class="yyt-tde-schema-section">
      <div class="yyt-tde-schema-heading">\u5199\u56DE\u6B63\u6587\u6807\u7B7E</div>
      <div class="yyt-tde-uc-grid">
        <div class="yyt-tde-uc-cell yyt-tde-uc-cell-wide">
          <label>mirrorTag</label>
          <input class="yyt-tde-input" data-action="mirror-tag" value="${Ee(e)}" placeholder="\u9ED8\u8BA4: yyt-table-workbench" />
          <span class="yyt-tde-hint">\u5F00\u542F\u5199\u56DE\u6B63\u6587\u65F6\uFF0C\u7528\u6B64 XML \u6807\u7B7E\u5305\u88F9\u8868\u683C\u6570\u636E\u6CE8\u5165\u5230 assistant \u6D88\u606F</span>
        </div>
      </div>
    </div>
    ${r}
  `}function qe(){if(!A.$window)return;A.$window.find(".yyt-window-body").html(rm()),om(A.$window)}function om(t){let e=window.jQuery||window.parent?.jQuery;if(!e||!t||!t.on)return;t.off(".tde"),t.on("click.tde",".yyt-tde-mode-switch button[data-mode]",function(){let i=e(this).attr("data-mode");i&&i!==A.mode&&(A.mode=i,qe())}),t.on("click.tde","[data-sheet-index]",function(){let i=Number(e(this).attr("data-sheet-index"));Number.isFinite(i)&&i!==A.currentTableIndex&&(A.currentTableIndex=i,qe())});let r=()=>(Array.isArray(A.tempData)?A.tempData:[])[A.currentTableIndex]||null;t.on("input.tde",'[data-action="table-name"]',function(){let i=r();i&&(i.name=e(this).val(),Le())}),t.on("input.tde",'[data-action="table-note"]',function(){let i=r();i&&(i.note=e(this).val(),Le())}),Object.entries({"sd-init":"init","sd-create":"create","sd-update":"update","sd-delete":"delete"}).forEach(([i,l])=>{t.on("input.tde",`[data-action="${i}"]`,function(){let c=r();c&&(c.aiInstructions=c.aiInstructions||{},c.aiInstructions[l]=e(this).val(),Le())})}),["contextDepth","updateFrequency","batchSize","skipFloors","sendLatestRows"].forEach(i=>{t.on("input.tde",`[data-action="uc-${i}"]`,function(){let l=r();if(!l)return;l.updateConfig=l.updateConfig||{};let c=Number(e(this).val());l.updateConfig[i]=Number.isFinite(c)?c:-1,Le()})}),t.on("input.tde",'[data-action="uc-groupId"]',function(){let i=r();i&&(i.updateConfig=i.updateConfig||{},i.updateConfig.groupId=e(this).val(),Le())}),t.on("input.tde",'[data-action="uc-apiPreset"]',function(){let i=r();i&&(i.updateConfig=i.updateConfig||{},i.updateConfig.apiPreset=e(this).val(),Le())}),t.on("input.tde",'[data-action="field-title"]',function(){let i=r();if(!i)return;let l=Number(e(this).attr("data-field-index"));!Array.isArray(i.columns)||!i.columns[l]||(i.columns[l].title=e(this).val(),Le())}),t.on("input.tde",'[data-action="field-key"]',function(){let i=r();if(!i)return;let l=Number(e(this).attr("data-field-index"));!Array.isArray(i.columns)||!i.columns[l]||(i.columns[l].key=e(this).val(),Le())}),t.on("change.tde",'[data-action="field-type"]',function(){let i=r();if(!i)return;let l=Number(e(this).attr("data-field-index"));!Array.isArray(i.columns)||!i.columns[l]||(i.columns[l].type=e(this).val(),Le())}),t.on("input.tde",'[data-action="field-desc"]',function(){let i=r();if(!i)return;let l=Number(e(this).attr("data-field-index"));!Array.isArray(i.columns)||!i.columns[l]||(i.columns[l].description=e(this).val(),Le())}),t.on("click.tde",'[data-action="field-delete"]',function(){let i=r();if(!i)return;let l=Number(e(this).attr("data-field-index"));!Array.isArray(i.columns)||!i.columns[l]||window.confirm(`\u5220\u9664\u5B57\u6BB5\u300C${i.columns[l].title||i.columns[l].key}\u300D\uFF1F\u6B64\u64CD\u4F5C\u4E0D\u4F1A\u81EA\u52A8\u6E05\u7406\u884C\u6570\u636E\u3002`)&&(i.columns.splice(l,1),Le(),qe())}),t.on("click.tde",'[data-action="field-add"]',function(){let i=r();if(!i)return;i.columns=Array.isArray(i.columns)?i.columns:[];let l=new Set(i.columns.map(d=>d?.key).filter(Boolean)),c=i.columns.length+1;for(;l.has(`col_${c}`);)c++;i.columns.push({key:`col_${c}`,title:`\u5B57\u6BB5${c}`,description:"",type:"text",required:!1}),Le(),qe()}),t.on("click.tde",'[data-action="field-lock"]',function(i){i.preventDefault(),i.stopPropagation();let l=e(this).attr("data-sheet-uid"),c=e(this).attr("data-col-key");if(!l||!c){E("error","\u5217\u9501\u5B9A\u5931\u8D25\uFF1A\u7F3A\u5C11 sheetUid \u6216 colKey");return}try{let u={chatId:A.targetSnapshot?.chatId||"",isolationKey:ie.getKey()},y=Co(u,l)||{cols:{}},p=!!(y.cols&&y.cols[c]);Dg(u,l,c,!p),E("success",p?`\u5DF2\u89E3\u9501 ${c}`:`\u5DF2\u9501\u5B9A ${c}\uFF08AI \u4E0D\u4F1A\u6539\u8FD9\u5217\uFF09`),ze().info("field-lock toggled",{sheetUid:l,colKey:c,locked:!p}),qe()}catch(d){ze().error("field-lock \u5F02\u5E38",d),E("error",`\u9501\u5B9A\u5931\u8D25\uFF1A${d?.message||d}`)}}),t.on("click.tde",'[data-action="row-lock"]',function(i){i.preventDefault(),i.stopPropagation();let l=e(this).attr("data-sheet-uid"),c=Number(e(this).attr("data-row-index"));if(!(!l||!Number.isFinite(c)))try{let d={chatId:A.targetSnapshot?.chatId||"",isolationKey:ie.getKey()},u=Co(d,l)||{rows:{}},y=!!(u.rows&&u.rows[c]);$g(d,l,c,!y),E("success",y?`\u5DF2\u89E3\u9501\u884C #${c+1}`:`\u5DF2\u9501\u5B9A\u884C #${c+1}\uFF08AI \u4E0D\u4F1A\u6539\u8FD9\u884C\uFF09`),ze().info("row-lock toggled",{sheetUid:l,rowIndex:c,locked:!y}),qe()}catch(d){ze().error("row-lock \u5F02\u5E38",d),E("error",`\u9501\u5B9A\u5931\u8D25\uFF1A${d?.message||d}`)}}),t.on("click.tde",'[data-action="cell-lock"]',function(i){i.preventDefault(),i.stopPropagation();let l=e(this).attr("data-sheet-uid"),c=Number(e(this).attr("data-row-index")),d=e(this).attr("data-col-key");if(!(!l||!Number.isFinite(c)||!d))try{let u={chatId:A.targetSnapshot?.chatId||"",isolationKey:ie.getKey()},y=Co(u,l)||{cells:{}},p=`${c}::${d}`,f=!!(y.cells&&y.cells[p]);Lg(u,l,c,d,!f),E("success",f?`\u5DF2\u89E3\u9501 [${c}][${d}]`:`\u5DF2\u9501\u5B9A [${c}][${d}]`),ze().info("cell-lock toggled",{sheetUid:l,rowIndex:c,colKey:d,locked:!f}),qe()}catch(u){ze().error("cell-lock \u5F02\u5E38",u),E("error",`\u9501\u5B9A\u5931\u8D25\uFF1A${u?.message||u}`)}}),t.on("input.tde",'[data-action="mirror-tag"]',function(){A._pendingMirrorTag=e(this).val(),Le()});let n=(i,l,c)=>{let d=A.tempData?.[i];d&&(d.exportConfig=d.exportConfig||{},d.exportConfig[l]=c,Le())},a=(i,l,c,d)=>{let u=A.tempData?.[i];u&&(u.exportConfig=u.exportConfig||{},u.exportConfig[l]=u.exportConfig[l]||{},u.exportConfig[l][c]=d,Le())};t.on("change.tde",'[data-action="ec-enabled"]',function(){n(Number(e(this).attr("data-table-index")),"enabled",e(this).is(":checked")),qe()}),t.on("input.tde",'[data-action="ec-entryName"]',function(){n(Number(e(this).attr("data-table-index")),"entryName",e(this).val())}),t.on("change.tde",'[data-action="ec-entryType"]',function(){n(Number(e(this).attr("data-table-index")),"entryType",e(this).val())}),t.on("input.tde",'[data-action="ec-keywords"]',function(){n(Number(e(this).attr("data-table-index")),"keywords",e(this).val())}),t.on("change.tde",'[data-action="ec-splitByRow"]',function(){n(Number(e(this).attr("data-table-index")),"splitByRow",e(this).val()==="true")}),t.on("change.tde",'[data-action="ec-preventRecursion"]',function(){n(Number(e(this).attr("data-table-index")),"preventRecursion",e(this).val()!=="false")}),t.on("input.tde",'[data-action="ec-injectionTemplate"]',function(){n(Number(e(this).attr("data-table-index")),"injectionTemplate",e(this).val())}),t.on("change.tde",'[data-action="ec-ep-position"]',function(){a(Number(e(this).attr("data-table-index")),"entryPlacement","position",e(this).val())}),t.on("input.tde",'[data-action="ec-ep-depth"]',function(){a(Number(e(this).attr("data-table-index")),"entryPlacement","depth",Number(e(this).val())||0)}),t.on("input.tde",'[data-action="ec-ep-order"]',function(){a(Number(e(this).attr("data-table-index")),"entryPlacement","order",Number(e(this).val())||0)}),t.on("change.tde",'[data-action="ec-exi-position"]',function(){a(Number(e(this).attr("data-table-index")),"extraIndexPlacement","position",e(this).val())}),t.on("input.tde",'[data-action="ec-exi-depth"]',function(){a(Number(e(this).attr("data-table-index")),"extraIndexPlacement","depth",Number(e(this).val())||0)}),t.on("input.tde",'[data-action="ec-exi-order"]',function(){a(Number(e(this).attr("data-table-index")),"extraIndexPlacement","order",Number(e(this).val())||0)}),t.on("click.tde",'[data-action="sheet-move-up"]',function(i){i.stopPropagation();let l=Number(e(this).attr("data-sheet-index"));if(!Array.isArray(A.tempData)||l<=0)return;let c=A.tempData;[c[l-1],c[l]]=[c[l],c[l-1]],A.currentTableIndex===l?A.currentTableIndex=l-1:A.currentTableIndex===l-1&&(A.currentTableIndex=l),Le(),qe()}),t.on("click.tde",'[data-action="sheet-move-down"]',function(i){i.stopPropagation();let l=Number(e(this).attr("data-sheet-index"));if(!Array.isArray(A.tempData)||l>=A.tempData.length-1)return;let c=A.tempData;[c[l],c[l+1]]=[c[l+1],c[l]],A.currentTableIndex===l?A.currentTableIndex=l+1:A.currentTableIndex===l+1&&(A.currentTableIndex=l),Le(),qe()}),t.on("click.tde",'[data-action="sheet-delete"]',function(i){i.stopPropagation();let l=Number(e(this).attr("data-sheet-index"));if(!Array.isArray(A.tempData)||!A.tempData[l])return;let c=A.tempData[l];window.confirm(`\u5220\u9664\u8868\u300C${c.name||`\u8868 ${l+1}`}\u300D\uFF1F\u6B64\u64CD\u4F5C\u4E0D\u53EF\u64A4\u9500\u3002`)&&(A.tempData.splice(l,1),A.currentTableIndex>=A.tempData.length&&(A.currentTableIndex=Math.max(0,A.tempData.length-1)),Le(),qe())}),t.on("click.tde",'[data-action="sheet-add"]',function(){let i=window.prompt("\u65B0\u8868\u540D\uFF1A",`\u8868 ${(A.tempData?.length||0)+1}`);if(!i||!i.trim())return;A.tempData=Array.isArray(A.tempData)?A.tempData:[];let l=new Set(A.tempData.map(u=>u?.id).filter(Boolean)),c=A.tempData.length+1,d=`sheet_${Date.now().toString(36)}_${c}`;for(;l.has(d);)c++,d=`sheet_${Date.now().toString(36)}_${c}`;A.tempData.push({id:d,name:i.trim(),enabled:!0,note:"",aiInstructions:{init:"",create:"",update:"",delete:""},updateConfig:{},exportConfig:{enabled:!1},columns:[{key:"col_1",title:"\u5B57\u6BB51",description:"",type:"text",required:!1}],rows:[]}),A.currentTableIndex=A.tempData.length-1,Le(),qe()}),t.on("click.tde",'[data-action="reload"]',()=>{if(A.isDirty&&!window.confirm("\u6709\u672A\u4FDD\u5B58\u4FEE\u6539\uFF0C\u91CD\u65B0\u52A0\u8F7D\u5C06\u4E22\u5F03\uFF0C\u786E\u5B9A\uFF1F"))return;let i=A.tempData?.[0];ze().info("reload \u89E6\u53D1",{before:{tableCount:A.tempData?.length,firstName:i?.name,firstAiInit:i?.aiInstructions?.init?.slice(0,50),firstUcFreq:i?.updateConfig?.updateFrequency},targetSnapshot:{messageId:A.targetSnapshot?.sourceMessageId,isFromTemplate:A.isFromTemplate}}),jc();let l=A.tempData?.[0];ze().info("reload \u5B8C\u6210",{after:{tableCount:A.tempData?.length,firstName:l?.name,firstAiInit:l?.aiInstructions?.init?.slice(0,50),firstUcFreq:l?.updateConfig?.updateFrequency,isFromTemplate:A.isFromTemplate}}),qe(),E("success","\u5DF2\u91CD\u65B0\u52A0\u8F7D")}),t.on("click.tde",'[data-action="save"]',async()=>{if(!A.isDirty){E("info","\u6CA1\u6709\u4FEE\u6539");return}try{let i=A.targetSnapshot;if(i?.sourceMessageId||(i=await bc()),!i?.sourceMessageId){E("error","\u65E0\u6CD5\u5B9A\u4F4D\u5F53\u524D\u6D88\u606F\uFF08\u627E\u4E0D\u5230 assistant \u6D88\u606F\uFF09");return}let l=await ei(i,{tables:ae(A.tempData)||[],meta:{source:"data-editor-manual-save"}},{skipFreshValidation:!0});ze().info("save-chat commitBoundState \u7ED3\u679C",{success:l?.success,error:l?.error,commitMessageId:l?.sourceMessageId,commitSlotRevisionKey:l?.slotRevisionKey,stateTablesLen:Array.isArray(l?.state?.tables)?l.state.tables.length:null,firstTableInState:l?.state?.tables?.[0]?.name,firstAiInitInState:l?.state?.tables?.[0]?.aiInstructions?.init?.slice(0,50)}),l?.success?(em(),A.targetSnapshot={chatId:l.state?.chatId||i.chatId,sourceMessageId:l.sourceMessageId,sourceSwipeId:l.state?.sourceSwipeId||i.sourceSwipeId,effectiveSwipeId:i.effectiveSwipeId,slotBindingKey:l.state?.slotBindingKey||i.slotBindingKey,slotRevisionKey:l.slotRevisionKey,slotTransactionId:i.slotTransactionId,traceId:i.traceId,targetMessageIndex:l.messageIndex??i.targetMessageIndex},Array.isArray(l?.state?.tables)&&(A.tempData=ae(l.state.tables)||[],A.isFromTemplate=!1),A._afterSaveGlobalAt=0,E("success","\u5DF2\u4FDD\u5B58\u5230 chat"),qe()):E("error",`\u4FDD\u5B58\u5931\u8D25\uFF1A${l?.error||"\u672A\u77E5"}`)}catch(i){ze().error("\u4FDD\u5B58\u5F02\u5E38",i),E("error",`\u4FDD\u5B58\u5F02\u5E38\uFF1A${i?.message||i}`)}}),t.on("click.tde",'[data-action="save-global"]',async()=>{if(!Array.isArray(A.tempData)||A.tempData.length===0){E("info","\u6CA1\u6709\u53EF\u4FDD\u5B58\u7684\u6570\u636E");return}if(window.confirm("\u4FDD\u5B58\u5230\u300C\u5168\u5C40\u6FC0\u6D3B\u6A21\u677F\u300D\u4F1A\u5F71\u54CD\u540E\u7EED\u6240\u6709 chat \u7684\u65B0\u586B\u8868\uFF08\u5DF2\u6709 slot \u6570\u636E\u4E0D\u53D7\u5F71\u54CD\uFF09\u3002\u7EE7\u7EED\uFF1F"))try{let i=Vr();if(!i?.id){E("error","\u6CA1\u6709\u53EF\u7528\u7684\u5168\u5C40\u6FC0\u6D3B\u6A21\u677F");return}let l=(A.tempData||[]).map(d=>({id:d?.id||d?.uid,name:d?.name||"",note:d?.note||"",enabled:d?.enabled!==!1,aiInstructions:d?.aiInstructions||{},updateConfig:d?.updateConfig||{},exportConfig:d?.exportConfig||{},columns:Array.isArray(d?.columns)?ae(d.columns):[],rows:[]})),c=Wr({...i,tables:l});if(c?.success){if(typeof A._pendingMirrorTag=="string"&&A._pendingMirrorTag.trim())try{let d=Pe();it({...d,mirrorTag:A._pendingMirrorTag.trim()})}catch(d){ze().warn("\u4FDD\u5B58 mirrorTag \u5230 workbench config \u5931\u8D25",d)}A._pendingMirrorTag=null,em(),Array.isArray(c?.template?.tables)&&(A.tempData=ae(c.template.tables)||[],A.isFromTemplate=!0,A._afterSaveGlobalAt=Date.now()),E("success",`\u5DF2\u4FDD\u5B58\u5230\u5168\u5C40\u6A21\u677F\u300C${i.name}\u300D`),ze().info("\u4FDD\u5B58\u5230\u5168\u5C40\u6A21\u677F\u6210\u529F",{templateId:i.id,name:i.name,tableCount:l.length}),qe()}else E("error",`\u4FDD\u5B58\u5931\u8D25\uFF1A${c?.error||"\u672A\u77E5"}`)}catch(i){ze().error("\u4FDD\u5B58\u5230\u5168\u5C40\u6A21\u677F\u5F02\u5E38",i),E("error",`\u4FDD\u5B58\u5F02\u5E38\uFF1A${i?.message||i}`)}}),t.on("click.tde",'[data-action="run-now"]',async()=>{if(!(A.isDirty&&!window.confirm("\u6709\u672A\u4FDD\u5B58\u4FEE\u6539\uFF0C\u7ACB\u5373\u586B\u8868\u4F1A\u5148\u4E22\u5F03\u8FD9\u4E9B\u4FEE\u6539\uFF0C\u786E\u5B9A\uFF1F")))try{let i=await Mn();i?.success?(E("success","\u586B\u8868\u5B8C\u6210"),jc(),qe()):E("error",`\u586B\u8868\u5931\u8D25\uFF1A${i?.error||"\u672A\u77E5"}`)}catch(i){ze().error("\u7ACB\u5373\u586B\u8868\u5F02\u5E38",i),E("error",`\u5F02\u5E38\uFF1A${i?.message||i}`)}}),t.on("input.tde","[data-row-index][data-col-key]",function(){let i=Number(e(this).attr("data-row-index")),l=e(this).attr("data-col-key"),c=e(this).text();if(!Number.isFinite(i)||!l)return;let d=A.tempData[A.currentTableIndex];d?.rows?.[i]&&(d.rows[i].cells||(d.rows[i].cells={}),d.rows[i].cells[l]=c,Le(),tm())}),t.on("input.tde","[data-row-name-index]",function(){let i=Number(e(this).attr("data-row-name-index"));if(!Number.isFinite(i))return;let l=A.tempData[A.currentTableIndex];l?.rows?.[i]&&(l.rows[i].name=e(this).val(),Le(),tm())}),t.on("click.tde",'[data-action="delete-row"]',function(){let i=Number(e(this).attr("data-row-index"));if(!Number.isFinite(i)||!window.confirm(`\u786E\u5B9A\u5220\u9664\u7B2C ${i+1} \u884C\uFF1F`))return;let l=A.tempData[A.currentTableIndex];l?.rows&&(l.rows.splice(i,1),Le(),qe())}),t.on("click.tde",'[data-action="add-row"]',()=>{let i=A.tempData[A.currentTableIndex];i&&(Array.isArray(i.rows)||(i.rows=[]),i.rows.push({id:en("row"),name:"",cells:{}}),Le(),qe())})}function tm(){if(!A.$window)return;let t=A.$window.find(".yyt-tde-toolbar");!t||!t.length||t.replaceWith(sm())}function Fc(t={}){if(console.log("[YYT][TableDataEditor] openTableDataEditor called",{options:t}),ze().info("openTableDataEditor \u8C03\u7528",{options:t}),gS(),!(window.jQuery||window.parent?.jQuery)){let s="jQuery \u4E0D\u53EF\u7528\uFF08window.jQuery \u548C window.parent.jQuery \u90FD\u662F undefined\uFF09";console.error("[YYT][TableDataEditor]",s),ze().error(s);try{E("error",`\u6570\u636E\u7F16\u8F91\u5668\u6253\u5F00\u5931\u8D25\uFF1A${s}`)}catch{}return null}if(console.log("[YYT][TableDataEditor] jQuery \u53EF\u7528"),A.$window&&A.$window.length&&document.body.contains(A.$window[0])){if(t.focusTableUid){let o=(A.tempData||[]).findIndex(n=>(n?.uid||n?.id)===t.focusTableUid);o>=0&&(A.currentTableIndex=o)}return t.focusMode&&["data","schema","global"].includes(t.focusMode)&&(A.mode=t.focusMode),qe(),A.$window}if(jc(),console.log("[YYT][TableDataEditor] loadEditorData \u5B8C\u6210\uFF0CtempData \u8868\u6570:",A.tempData?.length),t.focusTableUid){let o=(A.tempData||[]).findIndex(n=>(n?.uid||n?.id)===t.focusTableUid);o>=0&&(A.currentTableIndex=o)}t.focusMode&&["data","schema","global"].includes(t.focusMode)&&(A.mode=t.focusMode),console.log("[YYT][TableDataEditor] \u5373\u5C06\u8C03 createWindow");let r;try{r=Bc({id:yS,title:"\u586B\u8868\u6570\u636E\u7F16\u8F91\u5668",content:rm(),width:1200,height:800,modal:!1,resizable:!0,maximizable:!0,rememberState:!0,onReady:s=>{console.log("[YYT][TableDataEditor] onReady triggered",{$el:!!s}),A.$window=s,om(s)},onClose:()=>{A.isDirty&&ze().warn("\u6570\u636E\u7F16\u8F91\u5668\u5173\u95ED\u65F6\u6709\u672A\u4FDD\u5B58\u4FEE\u6539"),A.$window=null}}),console.log("[YYT][TableDataEditor] createWindow \u8FD4\u56DE:",!!r)}catch(s){console.error("[YYT][TableDataEditor] createWindow \u629B\u9519:",s),ze().error("createWindow \u629B\u9519",s);try{E("error",`\u521B\u5EFA\u7A97\u53E3\u5931\u8D25\uFF1A${s?.message||s}`)}catch{}return null}return r}var yS,Kc,A,fS,Uc,nm=N(()=>{zc();H();Sn();qa();ii();uo();sr();Ue();Hr();Lc();Xe();yS="yyt-table-data-editor";A={$window:null,mode:"data",tempData:null,currentTableIndex:-1,isDirty:!1,isFromTemplate:!1,_pendingMirrorTag:null,targetSnapshot:null};fS=`
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
}
.yyt-tde-toolbar-left { display: flex; align-items: center; gap: 12px; }
.yyt-tde-mode-switch {
  display: inline-flex; gap: 2px; padding: 2px;
  border-radius: 6px;
  background: var(--tde-surface-2);
  border: 1px solid var(--tde-hairline);
}
.yyt-tde-mode-switch button {
  border: none; background: transparent;
  color: var(--tde-text-secondary);
  padding: 6px 12px; border-radius: 4px;
  font-size: 12px; font-weight: 600; cursor: pointer;
  transition: background 0.12s ease, color 0.12s ease;
  font-family: inherit;
}
.yyt-tde-mode-switch button:hover:not(.active) { color: var(--tde-text); background: rgba(255,255,255,0.04); }
.yyt-tde-mode-switch button.active { background: var(--tde-accent); color: var(--tde-on-accent); font-weight: 700; }

.yyt-tde-dirty-badge {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 3px 9px; border-radius: 999px;
  font-size: 11px; font-weight: 700;
  color: var(--tde-warning); background: var(--tde-warning-soft);
  border: 1px solid rgba(251,191,36,0.2);
}
.yyt-tde-dirty-badge::before {
  content: ''; width: 6px; height: 6px; border-radius: 50%; background: var(--tde-warning);
}

.yyt-tde-actions { display: flex; gap: 8px; }
.yyt-tde-btn {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 6px 12px;
  border: 1px solid var(--tde-hairline-strong);
  border-radius: 6px;
  background: var(--tde-surface-2);
  color: var(--tde-text-secondary);
  font-size: 12px; font-weight: 600; cursor: pointer;
  transition: all 0.12s ease;
  font-family: inherit;
}
.yyt-tde-btn:hover { background: var(--tde-surface-3); color: var(--tde-text); }
.yyt-tde-btn-primary {
  background: var(--tde-accent); color: var(--tde-on-accent);
  border-color: transparent; font-weight: 700;
}
.yyt-tde-btn-primary:hover { background: var(--tde-accent-strong); }
.yyt-tde-btn:disabled {
  opacity: 0.5; cursor: not-allowed; pointer-events: none;
}

/* content */
.yyt-tde-content { flex: 1; min-height: 0; display: flex; overflow: hidden; }

/* sidebar */
.yyt-tde-sidebar {
  flex: 0 0 220px;
  background: var(--tde-surface-1);
  border-right: 1px solid var(--tde-hairline);
  padding: 14px 10px 12px;
  display: flex; flex-direction: column;
  overflow-y: auto;
}
.yyt-tde-sidebar-label {
  font-size: 10px; font-weight: 700; color: var(--tde-text-muted);
  text-transform: uppercase; letter-spacing: 0.5px;
  padding: 0 8px 10px;
}
.yyt-tde-sheet-list { display: flex; flex-direction: column; gap: 2px; }
.yyt-tde-sheet-item {
  display: flex; align-items: center; gap: 8px;
  padding: 8px 10px; border-radius: 6px;
  background: transparent; border: 1px solid transparent;
  color: var(--tde-text-secondary); font-size: 13px; font-weight: 600;
  cursor: pointer; text-align: left; width: 100%;
  transition: background 0.12s ease, color 0.12s ease;
  font-family: inherit;
}
.yyt-tde-sheet-item:hover { background: var(--tde-surface-2); color: var(--tde-text); }
.yyt-tde-sheet-item.active {
  background: var(--tde-accent-soft); color: var(--tde-accent-strong);
  border-color: rgba(123,183,255,0.18);
}
.yyt-tde-sheet-name { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.yyt-tde-sheet-count {
  flex-shrink: 0; font-size: 10px; font-weight: 700;
  padding: 1px 6px; border-radius: 999px;
  color: var(--tde-text-muted); background: rgba(255,255,255,0.04);
}
.yyt-tde-sheet-item.active .yyt-tde-sheet-count { color: var(--tde-accent); background: rgba(123,183,255,0.12); }

/* v1.0.194 Task M3: sidebar \u8868\u987A\u5E8F\u64CD\u4F5C */
.yyt-tde-sheet-item-wrap {
  display: flex; align-items: center; gap: 2px;
  border-radius: 6px;
  padding: 0 2px;
}
.yyt-tde-sheet-item-wrap.active { background: var(--tde-accent-soft); }
.yyt-tde-sheet-item-wrap .yyt-tde-sheet-item {
  flex: 1; padding: 6px 8px;
}
.yyt-tde-sheet-actions {
  display: none; gap: 1px; flex-shrink: 0;
}
.yyt-tde-sheet-item-wrap:hover .yyt-tde-sheet-actions,
.yyt-tde-sheet-item-wrap.active .yyt-tde-sheet-actions { display: flex; }
.yyt-tde-sheet-idx {
  font-size: 10px; color: var(--tde-text-muted);
  margin-right: 4px; font-weight: 700;
}
.yyt-tde-btn-icon[disabled] { opacity: 0.3; cursor: not-allowed; }

/* main */
.yyt-tde-main {
  flex: 1; min-width: 0;
  overflow-y: auto;
  padding: 16px 18px;
  background: var(--tde-canvas);
}

/* card grid */
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
.yyt-tde-card-name {
  flex: 1; min-width: 0;
  background: transparent; border: 1px solid transparent;
  color: var(--tde-text); font-size: 13px; font-weight: 700;
  padding: 3px 6px; border-radius: 4px;
  outline: none;
  font-family: inherit;
}
.yyt-tde-card-name:hover { background: rgba(255,255,255,0.03); }
.yyt-tde-card-name:focus { background: var(--tde-canvas); border-color: var(--tde-accent); }

.yyt-tde-card-actions { display: flex; gap: 2px; flex-shrink: 0; }
.yyt-tde-icon-btn {
  width: 26px; height: 26px;
  padding: 0; border: none; background: transparent;
  color: var(--tde-text-muted);
  border-radius: 4px;
  cursor: pointer;
  display: inline-flex; align-items: center; justify-content: center;
  font-size: 11px;
  transition: background 0.12s ease, color 0.12s ease;
  font-family: inherit;
}
.yyt-tde-icon-btn:hover { background: rgba(255,255,255,0.06); color: var(--tde-text); }
.yyt-tde-icon-btn.danger:hover { background: rgba(239,68,68,0.18); color: #ffb4b4; }

.yyt-tde-card-body {
  padding: 4px 12px 10px;
  display: flex; flex-direction: column;
}
.yyt-tde-field {
  padding: 6px 0;
  border-bottom: 1px solid var(--tde-hairline);
}
.yyt-tde-field:last-child { border-bottom: none; }
.yyt-tde-field-label {
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
  display: flex; align-items: center; justify-content: center; gap: 8px;
  min-height: 84px;
  border: 1px dashed var(--tde-hairline-strong);
  border-radius: 8px;
  background: transparent;
  color: var(--tde-text-muted);
  font-size: 13px; font-weight: 600;
  cursor: pointer;
  transition: all 0.12s ease;
  font-family: inherit;
}
.yyt-tde-card-add:hover { border-color: var(--tde-accent); color: var(--tde-accent); background: var(--tde-accent-soft); }

.yyt-tde-empty {
  padding: 24px;
  text-align: center;
  color: var(--tde-text-muted);
  font-size: 13px;
  border: 1px dashed var(--tde-hairline-strong);
  border-radius: 8px;
}

/* schema mode (read-only display \u7B49 #16) */
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
}
.yyt-tde-schema-row:first-child { border-top: none; }
.yyt-tde-schema-key { color: var(--tde-text-secondary); font-weight: 600; }

/* v1.0.194 Task G1: schema mode \u53EF\u7F16\u8F91\u63A7\u4EF6 */
.yyt-tde-input {
  background: var(--tde-surface-3);
  border: 1px solid var(--tde-hairline);
  color: var(--tde-text);
  font-size: 12px;
  padding: 6px 10px;
  border-radius: 6px;
  width: 100%;
  font-family: inherit;
}
.yyt-tde-input:focus { outline: 1px solid var(--tde-accent, #4a9eff); }
textarea.yyt-tde-input { min-height: 40px; resize: vertical; }
.yyt-tde-schema-sd textarea.yyt-tde-input { min-height: 60px; }
.yyt-tde-uc-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 10px 14px;
  padding: 8px 0;
}
.yyt-tde-uc-cell { display: flex; flex-direction: column; gap: 4px; }
.yyt-tde-uc-cell-wide { grid-column: span 2; }
.yyt-tde-uc-cell label { font-size: 11px; font-weight: 600; color: var(--tde-text-secondary); }
.yyt-tde-uc-cell .yyt-tde-hint { font-size: 10px; color: var(--tde-text-muted); }
.yyt-tde-schema-field {
  flex-direction: column;
  gap: 6px;
  align-items: stretch;
  padding: 10px 12px;
  background: var(--tde-surface-2);
  border-radius: 6px;
  margin-bottom: 6px;
}
.yyt-tde-schema-field-head {
  display: flex; align-items: center; gap: 8px;
}
.yyt-tde-schema-idx { font-size: 11px; color: var(--tde-accent); font-weight: 700; min-width: 24px; }
.yyt-tde-input-title { flex: 2; }
.yyt-tde-input-key { flex: 1; font-family: monospace; }
.yyt-tde-input-type { flex: 0 0 90px; }
.yyt-tde-input-desc { width: 100%; min-height: 32px; font-size: 11px; }
.yyt-tde-btn-icon {
  background: transparent; border: none; color: var(--tde-text-muted);
  cursor: pointer; padding: 4px 6px; border-radius: 4px;
  font-size: 12px;
}
.yyt-tde-btn-icon:hover { background: var(--tde-surface-3); color: var(--tde-text); }
.yyt-tde-btn-danger:hover { color: #ff6b6b; }
.yyt-tde-locked-btn { color: var(--tde-warning, #fbbf24); }
.yyt-tde-locked-btn:hover { color: var(--tde-warning, #fbbf24); background: var(--tde-warning-soft, rgba(251,191,36,0.14)); }
.yyt-tde-field-locked {
  border-left: 2px solid var(--tde-warning, #fbbf24);
  background: var(--tde-warning-soft, rgba(251,191,36,0.06));
}
/* v1.0.205 M1+: data mode \u884C/\u5355\u5143\u683C\u9501\u89C6\u89C9 */
.yyt-tde-row-locked {
  border-color: var(--tde-warning, #fbbf24) !important;
  box-shadow: 0 0 0 1px var(--tde-warning-soft, rgba(251,191,36,0.2)) inset;
}
.yyt-tde-cell-locked-bg {
  background: var(--tde-warning-soft, rgba(251,191,36,0.06));
  color: var(--tde-text-muted);
}
.yyt-tde-cell-lock-btn {
  background: transparent; border: none; color: var(--tde-text-muted);
  cursor: pointer; padding: 2px 4px; border-radius: 3px;
  font-size: 9px;
}
.yyt-tde-cell-lock-btn:hover { background: var(--tde-surface-3); }
.yyt-tde-field-label {
  display: flex; align-items: center; justify-content: space-between; gap: 4px;
}
.yyt-tde-btn-add-field {
  margin-top: 8px;
  background: transparent;
  border: 1px dashed var(--tde-hairline);
  color: var(--tde-text-muted);
  padding: 8px;
  border-radius: 6px;
  cursor: pointer;
  width: 100%;
}
.yyt-tde-btn-add-field:hover { border-color: var(--tde-accent); color: var(--tde-accent); }

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
.yyt-tde-toggle-inline {
  display: inline-flex; align-items: center; gap: 6px;
  font-size: 12px; color: var(--tde-text-muted); cursor: pointer;
}
.yyt-tde-disabled-section { opacity: 0.5; pointer-events: none; }
.yyt-tde-schema-value { color: var(--tde-text); word-break: break-word; }
.yyt-tde-schema-hint {
  font-size: 11px;
  color: var(--tde-text-muted);
  padding: 10px 14px;
  background: var(--tde-surface-2);
  border-left: 3px solid var(--tde-accent);
  border-radius: 4px;
  margin-bottom: 12px;
}
`,Uc=!1});function vS(t){return ae(t)}function TS(t,e,r){if(!t||typeof t!="object")return;let s=String(e||"").split(".").filter(Boolean);if(s.length===0)return;let o=t;for(let n=0;n<s.length-1;n++){let a=s[n];(o[a]===null||o[a]===void 0||typeof o[a]!="object")&&(o[a]={}),o=o[a]}o[s[s.length-1]]=r}function le(){return Wc||(Wc=R.createScope("TableWorkbenchView")),Wc}async function SS(){try{let t=await cn();if(!t)return vt.kind=null,vt.lastError="Provider \u4E0D\u53EF\u7528",vt;if(vt.kind=t.kind,typeof t.query=="function"){let e=await t.query({statement:"SELECT COUNT(*) as c FROM table_sheets"}),r=await t.query({statement:"SELECT COUNT(*) as c FROM table_rows"});vt.sheetCount=e?.rows?.[0]?.c??0,vt.rowCount=r?.rows?.[0]?.c??0}vt.lastError=null,vt.lastRefreshAt=Date.now(),le().info("Provider stats \u5DF2\u5237\u65B0",{...vt})}catch(t){vt.lastError=t?.message||String(t),le().warn("Provider stats \u5237\u65B0\u5931\u8D25",t)}return vt}function _S(){if(!vt.kind){let t=mo();t?.kind&&(vt.kind=t.kind)}return vt}function X(t){return String(t??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function im(t){if(!Number.isFinite(t)||t<=0)return"\u4ECE\u672A";let e=Date.now()-t;if(e<6e4)return`${Math.floor(e/1e3)} \u79D2\u524D`;if(e<36e5)return`${Math.floor(e/6e4)} \u5206\u949F\u524D`;if(e<864e5)return`${Math.floor(e/36e5)} \u5C0F\u65F6\u524D`;try{return new Date(t).toLocaleString()}catch{return"\u672A\u77E5"}}function cm(t){let{config:e,activeTemplate:r,isolationKey:s,tablesPreview:o,templateArchives:n=[],providerStats:a={}}=t,i=e?.runtime||{},l=i.lastStatus==="success"?"\u2713 \u4E0A\u6B21\u6210\u529F":i.lastStatus==="failed"?"\u2717 \u4E0A\u6B21\u5931\u8D25":i.lastStatus==="running"?"\u8FD0\u884C\u4E2D":"\u5F85\u547D",c=i.lastStatus==="success"?"success":i.lastStatus==="failed"?"error":"muted",d=e?.automation?.enabled?"\u81EA\u52A8":"\u624B\u52A8",u=e?.apiPreset||"\u8DDF\u968F\u4E3B API",y=e?.bypassPresetId?"\u5DF2\u7ED1\u5B9A":"\u65E0",p=Array.isArray(n)?n.length:0;return`
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
          ${r?.mode&&r.mode!==je.INHERIT_GLOBAL?`<button class="yyt-tww-btn yyt-tww-btn-small" data-action="reset-template-scope" title="\u672C chat \u5F53\u524D\u662F\u300C${r.mode===je.CHAT_OVERRIDE?"chat \u4E13\u5C5E":"\u94FE\u63A5\u9884\u8BBE"}\u300D\u6A21\u5F0F\uFF0C\u70B9\u51FB\u6062\u590D\u4E3A\u300C\u7EE7\u627F\u5168\u5C40\u300D"><i class="fa-solid fa-rotate-right"></i> \u6062\u590D\u7EE7\u627F</button>`:""}
          <button class="yyt-tww-btn yyt-tww-btn-small yyt-tww-btn-danger" data-action="reset-chat-data" title="\u6E05\u7A7A\u5F53\u524D\u804A\u5929\u6240\u6709\u697C\u5C42\u7684\u8868\u683C\u6570\u636E\uFF0C\u8BA9\u6A21\u677F\u5207\u6362\u540E\u4ECE\u5934\u5F00\u59CB"><i class="fa-solid fa-trash-can"></i> \u6E05\u7A7A chat \u6570\u636E</button>
        </div>
      </div>
      <div class="yyt-tww-hero-desc">\u4ECE\u5BF9\u8BDD\u5185\u5BB9\u63D0\u53D6\u7ED3\u6784\u5316\u6570\u636E\uFF0C\u81EA\u52A8\u7EF4\u62A4\u8868\u683C\u72B6\u6001\u3002</div>
      <div class="yyt-tww-hero-chips">
        <span class="yyt-tww-chip mode">\u6A21\u5F0F ${X(d)}</span>
        <span class="yyt-tww-chip preset">\u6A21\u677F: ${X(r?.template?.name||"\u9ED8\u8BA4")}</span>
        ${(()=>{let f=r?.mode;if(f===je.CHAT_OVERRIDE)return'<span class="yyt-tww-chip preset" title="\u672C chat \u7528\u4E86\u72EC\u7ACB\u6A21\u677F\u526F\u672C\uFF08\u4FEE\u6539\u4E0D\u5F71\u54CD\u5168\u5C40\uFF09\u3002\u53EF\u5728\u300C\u91CD\u7F6E\u8303\u56F4\u300D\u6309\u94AE\u65C1\u7684\u83DC\u5355\u6062\u590D\u7EE7\u627F\u5168\u5C40\u3002">\u4F5C\u7528\u57DF: chat \u4E13\u5C5E</span>';if(f===je.PRESET_LINK){let g=r?.source?.presetName||"";return`<span class="yyt-tww-chip preset" title="\u672C chat \u94FE\u63A5\u5230\u5168\u5C40\u9884\u8BBE ${X(g)}\uFF0C\u8DDF\u968F\u8BE5\u9884\u8BBE\u53D8\u5316\u3002">\u4F5C\u7528\u57DF: \u94FE\u63A5 ${X(g)}</span>`}return'<span class="yyt-tww-chip preset" title="\u672C chat \u8DDF\u968F\u5168\u5C40\u6FC0\u6D3B\u6A21\u677F\u3002">\u4F5C\u7528\u57DF: \u7EE7\u627F\u5168\u5C40</span>'})()}
        <span class="yyt-tww-chip preset">API: ${X(u)}</span>
        <span class="yyt-tww-chip preset">\u6307\u4EE4: ${X(y)}</span>
        ${(()=>{let f=e?.runScope||e?.scope?.mode||"enabled";return f==="enabled"?'<span class="yyt-tww-chip preset">\u8303\u56F4: \u6240\u6709\u542F\u7528\u8868</span>':`<button class="yyt-tww-chip status-failed" data-action="reset-run-scope" title="\u5F53\u524D AI \u53EA\u4F1A\u586B\u90E8\u5206\u8868\uFF0C\u70B9\u51FB\u91CD\u7F6E\u4E3A\u300C\u6240\u6709\u542F\u7528\u8868\u300D" style="border:0;cursor:pointer;">\u8303\u56F4: ${X(f==="current"?"\u26A0\uFE0F \u4EC5\u5F53\u524D\u8868":"\u4EC5\u9009\u4E2D\u8868")} \u2014 \u70B9\u6B64\u91CD\u7F6E</button>`})()}
        ${(()=>{let f=a?.kind,g=a?.sheetCount,h=a?.rowCount,x=g!==null&&h!==null?` \u2014 ${g} \u8868 ${h} \u884C`:"";return f==="authority"?`<span class="yyt-tww-chip status-success" title="\u6570\u636E\u6301\u4E45\u5316\u5230\u771F\u540E\u7AEF SQLite\uFF08ST-Delegation-of-authority \u63D0\u4F9B\uFF09">\u2713 \u771F\u540E\u7AEF SQLite${X(x)}</span>`:f==="fallback"?`<span class="yyt-tww-chip preset" title="\u6570\u636E\u6301\u4E45\u5316\u5230 localStorage\uFF08\u672A\u88C5 ST-Delegation-of-authority\uFF09">\u2139 Fallback (localStorage)${X(x)}</span>`:'<span class="yyt-tww-chip" title="Provider \u8FD8\u672A\u521D\u59CB\u5316\uFF08\u61D2\u52A0\u8F7D\uFF09">Provider \u52A0\u8F7D\u4E2D...</span>'})()}
        ${s?`<span class="yyt-tww-chip">\u9694\u79BB: ${X(s)}</span>`:""}
        <span class="yyt-tww-chip status-${c==="success"?"success":c==="error"?"failed":""}">${X(l)}</span>
        <span class="yyt-tww-chip yyt-tww-chip-toggle" data-action="toggle-chips" title="\u5C55\u5F00/\u6536\u8D77">\u25B8</span>
      </div>
    </div>

    <!-- \u6A21\u677F\u5F52\u6863\u5217\u8868\uFF08\u9ED8\u8BA4\u9690\u85CF\uFF0Chero \u6309\u94AE toggle\uFF09 -->
    <div class="yyt-tww-archives" data-archives-panel style="display:none;">
      ${CS(n)}
    </div>

    <!-- Runtime stats -->
    <div class="yyt-tww-stat-row">
      <div class="yyt-tww-stat">
        <span class="yyt-tww-stat-label">\u72B6\u6001</span>
        <span class="yyt-tww-stat-value ${c}">${X(l)}</span>
      </div>
      <div class="yyt-tww-stat">
        <span class="yyt-tww-stat-label">\u6700\u8FD1\u8FD0\u884C</span>
        <span class="yyt-tww-stat-value muted">${X(im(i.lastRunAt))}</span>
      </div>
      <div class="yyt-tww-stat">
        <span class="yyt-tww-stat-label">\u6210\u529F</span>
        <span class="yyt-tww-stat-value success">${X(i.successCount||0)}</span>
      </div>
      <div class="yyt-tww-stat">
        <span class="yyt-tww-stat-label">\u5931\u8D25</span>
        <span class="yyt-tww-stat-value ${i.errorCount?"error":"muted"}">${X(i.errorCount||0)}</span>
      </div>
    </div>

    <!-- Body sections -->
    <div class="yyt-tww-body">

      <section class="yyt-tww-section" data-section="bindings">
        <div class="yyt-tww-section-heading">
          <span class="yyt-tww-section-icon"><i class="fa-solid fa-link"></i></span>
          \u7ED1\u5B9A
        </div>
        ${ES(t)}
      </section>

      <section class="yyt-tww-section" data-section="behavior">
        <div class="yyt-tww-section-heading">
          <span class="yyt-tww-section-icon"><i class="fa-solid fa-arrows-rotate"></i></span>
          \u586B\u8868\u884C\u4E3A
        </div>
        ${AS(t)}
      </section>

      <section class="yyt-tww-section" data-section="overview">
        <div class="yyt-tww-section-heading">
          <span class="yyt-tww-section-icon"><i class="fa-solid fa-table-cells"></i></span>
          \u8868\u683C\u6982\u89C8
          <span class="yyt-tww-section-action">
            <button class="yyt-tww-btn yyt-tww-btn-small" data-action="open-editor"><i class="fa-solid fa-table-cells"></i> \u6253\u5F00\u6570\u636E\u7F16\u8F91\u5668</button>
          </span>
        </div>
        ${IS(t.tablesPreview)}
      </section>

    </div>
  </div>
  `}function ES(t){let{config:e,allTemplates:r,apiPresets:s,bypassPresets:o,regexPresets:n,worldbookPresets:a,activeTemplate:i}=t,l=r.map(v=>`<option value="${X(v.id)}" ${i?.source?.templateId===v.id?"selected":""}>${X(v.name)}</option>`).join(""),c=e?.autoUpdateEnabled===!0?"auto":"manual",d=e?.apiPreset||"",u='<option value="">\u2014\u2014 \u8DDF\u968F\u4E3B API \u2014\u2014</option>'+s.map(v=>`<option value="${X(v.name)}" ${v.name===d?"selected":""}>${X(v.name)}</option>`).join(""),y=e?.bypass?.presetId||"",p='<option value="">\u2014\u2014 \u65E0 \u2014\u2014</option>'+o.map(v=>`<option value="${X(v.id)}" ${v.id===y?"selected":""}>${X(v.name)}${v.isDefault?" [\u9ED8\u8BA4]":""}</option>`).join(""),f=e?.extraction?.regexPresetId||"",g='<option value="">\u2014\u2014 \u65E0\uFF08\u4E0D\u8FDB\u884C\u63D0\u53D6\uFF09 \u2014\u2014</option>'+n.map(v=>`<option value="${X(v.id)}" ${v.id===f?"selected":""}>${X(v.name)}</option>`).join(""),h=e?.worldbooks?.presetId||"",x='<option value="">\u2014\u2014 \u65E0 \u2014\u2014</option>'+a.map(v=>`<option value="${X(v.id)}" ${v.id===h?"selected":""}>${X(v.name)}</option>`).join(""),T=e?.runScope||"enabled";return`
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
        <option value="current" ${T==="current"?"selected":""}>\u4EC5\u5F53\u524D\u6D3B\u52A8\u8868</option>
        <option value="selected" ${T==="selected"?"selected":""}>\u5F53\u524D\u9009\u4E2D\u8868</option>
        <option value="enabled" ${T==="enabled"?"selected":""}>\u6240\u6709\u542F\u7528\u7684\u8868</option>
      </select>
      <div class="yyt-tww-row-meta"></div>
    </div>
  `}function AS(t){let{config:e}=t,r=e?.fillMode||"incremental",s=Number(e?.contextDepth)||3,o=e?.worldbookSync?.enabled===!0,n=e?.mirrorToMessage===!0;return`
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
      <input class="yyt-input yyt-tww-ctrl" type="number" min="1" max="50" data-binding="contextDepth" value="${X(s)}">
      <div class="yyt-tww-row-meta"></div>
    </div>

    <div class="yyt-tww-toggle-row">
      <div class="yyt-tww-toggle-info">
        <div class="yyt-tww-toggle-title">\u540C\u6B65\u5230\u4E16\u754C\u4E66</div>
        <div class="yyt-tww-toggle-desc">\u628A\u8868\u683C\u5E8F\u5217\u5316\u4E3A\u4E16\u754C\u4E66\u6761\u76EE\u8BA9\u4E3B\u6A21\u578B\u5728\u751F\u6210\u65F6\u770B\u5230\u3002</div>
      </div>
      <div class="yyt-tww-toggle ${o?"on":""}" data-toggle="worldbookSync"></div>
    </div>

    ${kS(t)}

    <div class="yyt-tww-toggle-row">
      <div class="yyt-tww-toggle-info">
        <div class="yyt-tww-toggle-title">\u5199\u56DE\u6B63\u6587\u955C\u50CF</div>
        <div class="yyt-tww-toggle-desc">\u5728\u52A9\u624B\u6D88\u606F\u672B\u5C3E\u955C\u50CF\u5199\u5165 markdown \u65B9\u4FBF\u624B\u52A8\u67E5\u9605\u3002</div>
      </div>
      <div class="yyt-tww-toggle ${n?"on":""}" data-toggle="mirrorToMessage"></div>
    </div>
  `}function kS(t){let e=t?.config?.worldbookSync||{};if(!(e.enabled===!0))return"";let s=String(e.targetBook||""),o=String(t?.boundLorebook||""),n=t?.chatOpen===!0,a=s||o,i=Array.isArray(t.availableWorldbooks)?t.availableWorldbooks:[],l=e.wrapperConfig||{},c=l.enabled!==!1,d=String(l.wrapperTag||"\u6700\u65B0\u6570\u636E\u4E0E\u8BB0\u5F55"),u=String(l.wrapperHint||""),y=l.wrapperPlacement||{},p=String(y.position||"before_character_definition"),f=Number.isFinite(y.depth)?y.depth:2,g=Number.isFinite(y.order)?y.order:5e4,h;if(!n)h='<option value="">\u2014\u2014 \u8BF7\u5148\u6253\u5F00\u804A\u5929 \u2014\u2014</option>';else if(i.length===0)h=`<option value="${X(a)}">${a?X(a):"\u2014\u2014 \u89D2\u8272\u5361\u672A\u7ED1\u5B9A\u4E16\u754C\u4E66 \u2014\u2014"}</option>`;else{let v=i.map(C=>{let _=typeof C=="string"?C:C?.name||"";return`<option value="${X(_)}" ${_===a?"selected":""}>${X(_)}${_===o?"\uFF08\u89D2\u8272\u5361\u7ED1\u5B9A\uFF09":""}</option>`}).join("");h=(o?`<option value="">\u2014\u2014 \u89D2\u8272\u5361\u7ED1\u5B9A\uFF1A${X(o)} \u2014\u2014</option>`:'<option value="">\u2014\u2014 \u9009\u62E9 \u2014\u2014</option>')+v}return`
    <div class="yyt-tww-sub-zone" data-sub-zone="worldbookSync">
      <div class="yyt-tww-sub-row">
        <label>\u76EE\u6807\u4E16\u754C\u4E66</label>
        <select class="yyt-select yyt-tww-ctrl" data-binding="worldbookTargetBook" ${n?"":"disabled"}>${h}</select>
        <div class="yyt-tww-sub-meta">${n?'<a data-action="refresh-worldbooks">\u5237\u65B0\u5217\u8868</a>':'<span style="color:var(--tww-warning);">\u672A\u6253\u5F00\u804A\u5929</span>'}</div>
      </div>

      <div class="yyt-tww-sub-row-toggle">
        <label>Wrapper \u5305\u88F9</label>
        <div class="yyt-tww-toggle-desc">\u7528 <code style="font-size:10px;">&lt;${X(d)}&gt;...&lt;/${X(d)}&gt;</code> \u5305\u4F4F\u6240\u6709\u5168\u5C40\u8868\u6570\u636E</div>
        <div class="yyt-tww-toggle ${c?"on":""}" data-toggle="worldbookWrapperEnabled"></div>
      </div>

      <div class="yyt-tww-sub-row">
        <label>Wrapper \u6807\u7B7E</label>
        <input class="yyt-input yyt-tww-ctrl" type="text" data-binding="worldbookWrapperTag" value="${X(d)}" placeholder="\u6700\u65B0\u6570\u636E\u4E0E\u8BB0\u5F55">
        <div class="yyt-tww-sub-meta"></div>
      </div>

      <div class="yyt-tww-sub-row">
        <label>Wrapper \u63D0\u793A\u6587</label>
        <input class="yyt-input yyt-tww-ctrl" type="text" data-binding="worldbookWrapperHint" value="${X(u)}" placeholder="\u53EF\u9009\uFF0C\u8BF4\u660E wrapper \u5185\u5BB9\u7528\u9014">
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
        <input class="yyt-input yyt-tww-ctrl" type="number" data-binding="worldbookWrapperDepth" value="${X(f)}" min="0">
        <input class="yyt-input yyt-tww-ctrl" type="number" data-binding="worldbookWrapperOrder" value="${X(g)}" min="0">
      </div>
    </div>
  `}function CS(t=[]){return!Array.isArray(t)||t.length===0?'<div class="yyt-tww-empty">\u5F53\u524D chat \xD7 isolationKey \u6682\u65E0\u5F52\u6863\uFF08\u4EC5\u5728\u5207\u6362\u6A21\u677F\u65F6\u81EA\u52A8\u5F52\u6863\u5F53\u524D\u72B6\u6001\uFF09</div>':`
    <div class="yyt-tww-archives-header">\u6A21\u677F\u5F52\u6863\u5386\u53F2 (${t.length}/8)</div>
    <div class="yyt-tww-archives-list">
      ${t.map((e,r)=>{let s=e?.state||{},o=s.mode||"unknown",n=e?.archivedAt?new Date(e.archivedAt).toLocaleString():"\u672A\u77E5\u65F6\u95F4",a=s.presetName||"",i=o==="preset_link"?`\u9884\u8BBE\u94FE\u63A5: ${X(a)}`:o==="chat_override"?"chat \u7EA7\u8986\u76D6\u6A21\u677F":o==="inherit_global"?"\u7EE7\u627F\u5168\u5C40":X(o);return`
          <div class="yyt-tww-archive-item" data-archive-index="${r}">
            <div class="yyt-tww-archive-meta">
              <span class="yyt-tww-archive-time">${X(n)}</span>
              <span class="yyt-tww-archive-mode">${i}</span>
            </div>
            <button class="yyt-tww-btn yyt-tww-btn-small" data-action="restore-archive" data-archive-index="${r}" title="\u6062\u590D\u6B64\u5F52\u6863\uFF08\u6062\u590D\u524D\u81EA\u52A8\u5F52\u6863\u5F53\u524D\u72B6\u6001\uFF09">\u6062\u590D</button>
          </div>
        `}).join("")}
    </div>
  `}function IS(t){return!Array.isArray(t)||t.length===0?'<div class="yyt-tww-empty">\u5F53\u524D slot \u6682\u65E0\u8868\u6570\u636E\u3002\u8BF7\u5148"\u7ACB\u5373\u586B\u8868"\u6216\u5728\u6570\u636E\u7F16\u8F91\u5668\u4E2D\u521D\u59CB\u5316\u3002</div>':`
    <div class="yyt-tww-table-grid">
      ${t.map((e,r)=>`
        <div class="yyt-tww-table-card${e.enabled===!1?" yyt-tww-table-card-disabled":""}" data-table-index="${r}" data-table-id="${X(e.id||"")}">
          <div class="yyt-tww-table-card-header">
            <label class="yyt-tww-table-card-toggle" title="${e.enabled===!1?"\u5DF2\u7981\u7528 \u2014 AI \u4E0D\u4F1A\u586B\u8FD9\u5F20\u8868":"\u5DF2\u542F\u7528 \u2014 AI \u4F1A\u586B\u8FD9\u5F20\u8868"}">
              <input type="checkbox" data-action="toggle-table-enabled" data-table-id="${X(e.id||"")}" ${e.enabled===!1?"":"checked"} />
              <span class="yyt-tww-table-card-toggle-slider"></span>
            </label>
            <span class="yyt-tww-table-card-name">${X(e.name||`\u8868 ${r+1}`)}</span>
            <i class="fa-solid fa-arrow-right yyt-tww-table-card-arrow"></i>
          </div>
          <div class="yyt-tww-table-card-stats">
            <span><b>${X(e.rowCount||0)}</b> \u884C</span>
            <span><b>${X(e.colCount||0)}</b> \u5B57\u6BB5</span>
            ${e.updatedHint?`<span>${X(e.updatedHint)}</span>`:""}
          </div>
        </div>
      `).join("")}
    </div>
  `}function dm(){let t=(()=>{try{return Pe()}catch{return{}}})(),e=(()=>{try{return Jr()||[]}catch{return[]}})(),r=(()=>{try{return wo({})}catch{return null}})(),s=(()=>{try{return Rr()||[]}catch{return[]}})(),o=(()=>{try{return yn()||[]}catch{return[]}})(),n=(()=>{try{return Se.listPresets()||[]}catch{return[]}})(),a=(()=>{try{return pt.listPresets()||[]}catch{return[]}})(),i=(()=>{try{return ie.getKey()}catch{return""}})(),l=RS(),c=MS(),d=PS(),u=null,y=0;try{let x=Os(null);Array.isArray(x?.tableState?.tables)&&x.tableState.tables.length>0&&(u=x.tableState.tables,y=Number(x.tableState.updatedAt)||0)}catch{}let p=u||r?.template?.tables||t?.tables||[],f=t?.tableEnabledOverrides&&typeof t.tableEnabledOverrides=="object"?t.tableEnabledOverrides:{},g=p.map(x=>{let T=x?.id||"",v=T&&Object.prototype.hasOwnProperty.call(f,T)?f[T]:void 0;return{id:T,name:x?.name||"",enabled:v!==void 0?v:x?.enabled!==!1,rowCount:Array.isArray(x?.rows)?x.rows.length:0,colCount:Array.isArray(x?.columns)?x.columns.length:0,updatedHint:u&&y>0?im(y):""}}),h=(()=>{try{return Ky()||[]}catch{return[]}})();return{config:t,activeTemplate:r,allTemplates:e,apiPresets:s,bypassPresets:o,regexPresets:n,worldbookPresets:a,availableWorldbooks:l,boundLorebook:c,chatOpen:d,isolationKey:i,tablesPreview:g,templateArchives:h,providerStats:_S()}}function RS(){try{let t=globalThis.window||globalThis,e=t?.TavernHelper||t?.parent?.TavernHelper;if(!e)return[];if(typeof e.getLorebooks=="function"){let r=e.getLorebooks();if(Array.isArray(r))return r}if(typeof e.getLorebookList=="function"){let r=e.getLorebookList();if(Array.isArray(r))return r}}catch(t){le().warn("loadAvailableWorldbooks \u5931\u8D25",t)}return[]}function MS(){try{let t=globalThis.window||globalThis,e=t?.TavernHelper||t?.parent?.TavernHelper;if(e){if(typeof e.getCurrentCharPrimaryLorebook=="function"){let s=e.getCurrentCharPrimaryLorebook();if(typeof s=="string"&&s)return s}if(typeof e.getCharLorebooks=="function")try{let s=e.getCharLorebooks();if(s?.primary)return String(s.primary)}catch{}if(typeof e.getChatLorebook=="function")try{let s=e.getChatLorebook();if(typeof s=="string"&&s)return s}catch{}}let r=t?.SillyTavern?.getContext?.()||t?.parent?.SillyTavern?.getContext?.();if(r){let s=r.characters?.[r.characterId],o=s?.data?.character_book?.name||s?.data?.extensions?.world||s?.world;if(typeof o=="string"&&o)return o}}catch(t){le().warn("loadCharacterBoundLorebook \u5931\u8D25",t)}return""}function PS(){try{let t=globalThis.window||globalThis,e=t?.TavernHelper||t?.parent?.TavernHelper;if(e&&typeof e.getCurrentChatId=="function"){let s=e.getCurrentChatId();return!!(s&&String(s).trim()&&String(s).trim()!=="default_chat")}let r=t?.SillyTavern?.getContext?.()||t?.parent?.SillyTavern?.getContext?.();if(r){let s=r.chat;if(Array.isArray(s)&&s.length>0||r.chatId)return!0}}catch{}return!1}function Hc(t,e){let r=window.jQuery||window.parent?.jQuery;if(!r||!t||!t.on){le().warn("bindWorkbenchEvents: jQuery \u6216 $container \u4E0D\u53EF\u7528");return}t.off(".tww"),am||(am=!0,SS().then(()=>{typeof e=="function"&&e()}).catch(()=>{})),t.on("click.tww",'[data-action="run-now"]',async()=>{try{let n=await Mn();n?.success?E("success","\u586B\u8868\u5B8C\u6210"):E("error",`\u586B\u8868\u5931\u8D25\uFF1A${n?.error||"\u672A\u77E5"}`),typeof e=="function"&&e()}catch(n){le().error("\u7ACB\u5373\u586B\u8868\u5F02\u5E38",n),E("error",`\u5F02\u5E38\uFF1A${n?.message||n}`)}}),t.on("click.tww",'[data-action="run-clear"]',async()=>{if(window.confirm("\u91CD\u586B\u4F1A\u6E05\u7A7A\u5F53\u524D\u6D88\u606F\u697C\u5C42\u7684\u8868\u683C\u6570\u636E\u5E76\u91CD\u65B0\u751F\u6210\uFF0C\u786E\u5B9A\uFF1F"))try{let n=await Mn(null,{clearBeforeUpdate:!0});n?.success?E("success","\u91CD\u586B\u5B8C\u6210"):E("error",`\u91CD\u586B\u5931\u8D25\uFF1A${n?.error||"\u672A\u77E5"}`),typeof e=="function"&&e()}catch(n){le().error("\u91CD\u586B\u5F02\u5E38",n),E("error",`\u5F02\u5E38\uFF1A${n?.message||n}`)}}),t.on("click.tww",'[data-action="reset-run-scope"]',()=>{try{let n=Pe();it({...n,runScope:"enabled",scope:{...n.scope||{},mode:"enabled",activeTableId:"",selectedTableIds:[]}}),E("success","\u5DF2\u91CD\u7F6E\u8303\u56F4\u4E3A\u300C\u6240\u6709\u542F\u7528\u8868\u300D"),le().info("\u7528\u6237\u91CD\u7F6E runScope \u4E3A enabled"),typeof e=="function"&&e()}catch(n){le().error("\u91CD\u7F6E\u8303\u56F4\u5F02\u5E38",n),E("error",`\u91CD\u7F6E\u5931\u8D25\uFF1A${n?.message||n}`)}}),t.on("click.tww",'[data-action="toggle-chips"]',function(){let n=t.find(".yyt-tww-hero-chips")[0];if(!n)return;let a=n.classList.toggle("yyt-tww-hero-chips-expanded");this.textContent=a?"\u25BE":"\u25B8"}),t.on("click.tww",'[data-action="export-templates"]',()=>{try{let n=Ca(),a=JSON.stringify(n,null,2),i=new Blob([a],{type:"application/json"}),l=URL.createObjectURL(i),c=document.createElement("a");c.href=l,c.download=`youyou-table-templates-${Date.now()}.json`,document.body.appendChild(c),c.click(),document.body.removeChild(c),URL.revokeObjectURL(l);let d=Array.isArray(n?.templates)?n.templates.length:0;E("success",`\u5DF2\u5BFC\u51FA ${d} \u4E2A\u6A21\u677F\u5230\u4E0B\u8F7D\u6587\u4EF6\u5939`),le().info("export-templates \u5B8C\u6210",{count:d})}catch(n){le().error("export-templates \u5F02\u5E38",n),E("error",`\u5BFC\u51FA\u5931\u8D25\uFF1A${n?.message||n}`)}}),t.on("click.tww",'[data-action="reset-template-scope"]',()=>{if(window.confirm("\u6062\u590D\u672C chat \u7684\u6A21\u677F\u4F5C\u7528\u57DF\u5230\u300C\u7EE7\u627F\u5168\u5C40\u300D\uFF1F\u5F53\u524D\u72B6\u6001\u4F1A\u5148\u81EA\u52A8\u5F52\u6863\uFF0C\u53EF\u5728\u300C\u5F52\u6863\u300D\u4E2D\u6062\u590D\u3002"))try{let n=zy({archive:!0});n?.success?(E("success","\u5DF2\u6062\u590D\u4E3A\u7EE7\u627F\u5168\u5C40"),le().info("reset-template-scope \u5B8C\u6210"),typeof e=="function"&&e()):E("error",`\u6062\u590D\u5931\u8D25\uFF1A${n?.error||"\u672A\u77E5"}`)}catch(n){le().error("reset-template-scope \u5F02\u5E38",n),E("error",`\u5F02\u5E38\uFF1A${n?.message||n}`)}}),t.on("click.tww",'[data-action="chat-template-override"]',()=>{if(window.confirm(`\u628A\u5F53\u524D\u6FC0\u6D3B\u6A21\u677F\u6DF1\u62F7\u8D1D\u4E3A\u672C chat \u7684\u72EC\u7ACB\u526F\u672C\uFF1F
\u4E4B\u540E\u4FEE\u6539\u4E0D\u5F71\u54CD\u5168\u5C40\u6A21\u677F\u3002\u64CD\u4F5C\u524D\u81EA\u52A8\u5F52\u6863\u5F53\u524D\u72B6\u6001\u3002`))try{let n=Vr();if(!n){E("error","\u6CA1\u6709\u53EF\u7528\u7684\u5168\u5C40\u6FC0\u6D3B\u6A21\u677F");return}let a=Oy(n,{source:"workbench-chat-override"});a?.success?(E("success",`\u5DF2\u8BBE\u4E3A chat \u4E13\u5C5E\uFF1A${n.name}`),le().info("chat-template-override \u5B8C\u6210",{templateId:n.id,name:n.name}),typeof e=="function"&&e()):E("error",`\u8BBE\u7F6E\u5931\u8D25\uFF1A${a?.error||"\u672A\u77E5"}`)}catch(n){le().error("chat-template-override \u5F02\u5E38",n),E("error",`\u5F02\u5E38\uFF1A${n?.message||n}`)}}),t.on("click.tww",'[data-action="chat-template-link"]',()=>{let n=(()=>{try{return Jr()||[]}catch{return[]}})();if(n.length===0){E("info","\u6CA1\u6709\u53EF\u7528\u7684\u6A21\u677F");return}let a=n.map((d,u)=>`${u+1}. ${d.name}`).join(`
`),i=window.prompt(`\u94FE\u63A5\u5230\u54EA\u4E2A\u5168\u5C40\u9884\u8BBE\uFF1F\u8F93\u5165\u7F16\u53F7\uFF081-${n.length}\uFF09\uFF1A

${a}`,"1");if(!i)return;let l=parseInt(i,10)-1;if(!Number.isFinite(l)||l<0||l>=n.length){E("error","\u7F16\u53F7\u65E0\u6548");return}let c=n[l];try{let d=By(c.name,{source:"workbench-link-preset"});d?.success?(E("success",`\u5DF2\u94FE\u63A5\u5230\u9884\u8BBE\uFF1A${c.name}`),le().info("chat-template-link \u5B8C\u6210",{presetName:c.name}),typeof e=="function"&&e()):E("error",`\u94FE\u63A5\u5931\u8D25\uFF1A${d?.error||"\u672A\u77E5"}`)}catch(d){le().error("chat-template-link \u5F02\u5E38",d),E("error",`\u5F02\u5E38\uFF1A${d?.message||d}`)}}),t.on("click.tww",'[data-action="reset-chat-data"]',async()=>{if(window.confirm("\u5C06\u6E05\u7A7A\u5F53\u524D\u804A\u5929\u6240\u6709\u697C\u5C42\u7684\u8868\u683C\u6570\u636E\uFF08\u4E0D\u5F71\u54CD\u6A21\u677F/\u914D\u7F6E\uFF09\u3002\u4E0B\u6B21\u586B\u8868\u4F1A\u6309\u5F53\u524D\u6FC0\u6D3B\u6A21\u677F\u4ECE\u5934\u5F00\u59CB\u3002\u786E\u5B9A\uFF1F"))try{let n=await Xf();n?.success?(E("success",`\u5DF2\u6E05\u7A7A ${n.touched||0} \u6761\u6D88\u606F\u7684\u8868\u683C\u6570\u636E`),le().info("\u6E05\u7A7A chat \u6570\u636E\u5B8C\u6210",n)):E("error","\u6E05\u7A7A\u5931\u8D25"),typeof e=="function"&&e()}catch(n){le().error("\u6E05\u7A7A chat \u6570\u636E\u5F02\u5E38",n),E("error",`\u5F02\u5E38\uFF1A${n?.message||n}`)}}),t.on("click.tww",'[data-action="open-editor"]',n=>{n.preventDefault(),console.log("[YYT][TableWorkbench] open-editor button clicked"),le().info("open-editor button clicked");try{let a=Fc();console.log("[YYT][TableWorkbench] openTableDataEditor returned:",a),le().info("openTableDataEditor \u8C03\u7528\u5B8C\u6210",{hasReturn:!!a})}catch(a){console.error("[YYT][TableWorkbench] \u6253\u5F00\u6570\u636E\u7F16\u8F91\u5668\u5F02\u5E38:",a),le().error("\u6253\u5F00\u6570\u636E\u7F16\u8F91\u5668\u5F02\u5E38",a),E("error",`\u6253\u5F00\u5931\u8D25\uFF1A${a?.message||a}`)}}),t.on("click.tww","[data-table-index]",function(n){if(r(n.target).closest('[data-action="toggle-table-enabled"]').length>0||r(n.target).is("label, label *"))return;n.preventDefault();let a=Number(r(this).attr("data-table-index"));if(!(!Number.isFinite(a)||a<0)){console.log("[YYT][TableWorkbench] table card clicked, idx=",a);try{let l=Os(null)?.tableState?.tables?.[a],c=Fc({focusTableUid:l?.uid||l?.id||""});console.log("[YYT][TableWorkbench] openTableDataEditor returned:",c)}catch(i){console.error("[YYT][TableWorkbench] \u6253\u5F00\u6570\u636E\u7F16\u8F91\u5668\u5F02\u5E38:",i),le().error("\u6253\u5F00\u6570\u636E\u7F16\u8F91\u5668\u5F02\u5E38",i),E("error",`\u6253\u5F00\u5931\u8D25\uFF1A${i?.message||i}`)}}}),t.on("click.tww",'[data-action="toggle-archives"]',function(n){n.preventDefault();let a=t.find("[data-archives-panel]").first();a.length&&(a.css("display")==="none"?a.css("display","block"):a.css("display","none"))}),t.on("click.tww",'[data-action="restore-archive"]',async function(n){n.stopPropagation();let a=Number(r(this).attr("data-archive-index"));if(!(!Number.isFinite(a)||a<0)&&window.confirm(`\u6062\u590D\u5F52\u6863 #${a}\uFF1F\u6062\u590D\u524D\u4F1A\u81EA\u52A8\u5F52\u6863\u5F53\u524D\u72B6\u6001\uFF0C\u53EF\u518D\u6B21\u6062\u590D\u56DE\u6765\u3002`))try{let i=Uy(a);i?.success?(E("success","\u5DF2\u6062\u590D\u5F52\u6863"),le().info("restoreChatTemplateArchive \u6210\u529F",{index:a,scopeState:i.scopeState})):E("error",`\u6062\u590D\u5931\u8D25\uFF1A${i?.error||"\u672A\u77E5"}`),typeof e=="function"&&e()}catch(i){le().error("\u6062\u590D\u5F52\u6863\u5F02\u5E38",i),E("error",`\u5F02\u5E38\uFF1A${i?.message||i}`)}}),t.on("change.tww",'[data-action="toggle-table-enabled"]',function(n){n.stopPropagation();let a=r(this).attr("data-table-id"),i=r(this).is(":checked");if(a)try{let l=Pe(),c={...l.tableEnabledOverrides||{}};c[a]=i,it({...l,tableEnabledOverrides:c}),E("success",i?`\u5DF2\u542F\u7528 ${a}`:`\u5DF2\u7981\u7528 ${a}`),le().info("toggle \u5355\u8868\u6FC0\u6D3B",{tableId:a,enabled:i}),typeof e=="function"&&e()}catch(l){le().error("toggle \u5355\u8868\u6FC0\u6D3B\u5F02\u5E38",l),E("error",`\u5207\u6362\u5931\u8D25\uFF1A${l?.message||l}`)}}),t.on("change.tww",'[data-binding="template"]',function(){let n=r(this).val();try{Zl(n);let a=Pe();it({...a,activeTemplate:n}),E("success","\u6A21\u677F\u5DF2\u5207\u6362"),typeof e=="function"&&e()}catch(a){le().error("\u5207\u6362\u6A21\u677F\u5F02\u5E38",a),E("error",`\u5207\u6362\u5931\u8D25\uFF1A${a?.message||a}`)}}),t.on("change.tww",'[data-binding="triggerMode"]',function(){let n=r(this).val();try{let a=Pe();it({...a,autoUpdateEnabled:n==="auto"}),E("success",n==="auto"?"\u5DF2\u5207\u6362\u4E3A\u81EA\u52A8\u6A21\u5F0F":"\u5DF2\u5207\u6362\u4E3A\u624B\u52A8\u6A21\u5F0F"),typeof e=="function"&&e()}catch(a){le().error("\u5207\u6362\u89E6\u53D1\u6A21\u5F0F\u5F02\u5E38",a),E("error",`\u5207\u6362\u5931\u8D25\uFF1A${a?.message||a}`)}});let s=[{sel:'[data-binding="apiPreset"]',key:"apiPreset"},{sel:'[data-binding="runScope"]',key:"runScope"},{sel:'[data-binding="fillMode"]',key:"fillMode"}];for(let{sel:n,key:a}of s)t.on("change.tww",n,function(){let i=r(this).val();try{let l=Pe(),c={...l,[a]:i};a==="runScope"&&(c.scope={...l.scope||{},mode:i,...i==="enabled"?{activeTableId:"",selectedTableIds:[]}:{}}),it(c),E("success","\u5DF2\u4FDD\u5B58")}catch(l){le().error(`\u4FDD\u5B58 ${a} \u5F02\u5E38`,l),E("error",`\u4FDD\u5B58\u5931\u8D25\uFF1A${l?.message||l}`)}});t.on("change.tww",'[data-binding="bypassPreset"]',function(){let n=r(this).val();try{let a=Pe();it({...a,bypass:{...a.bypass||{},presetId:n,enabled:!!n}}),E("success","Ai \u6307\u4EE4\u9884\u8BBE\u5DF2\u4FDD\u5B58")}catch(a){le().error("\u4FDD\u5B58 bypass \u5F02\u5E38",a),E("error",`\u4FDD\u5B58\u5931\u8D25\uFF1A${a?.message||a}`)}}),t.on("change.tww",'[data-binding="regexPreset"]',function(){let n=r(this).val();try{let a=Pe();it({...a,extraction:{...a.extraction||{},regexPresetId:n}}),E("success","\u6B63\u5219\u9884\u8BBE\u5DF2\u66F4\u65B0")}catch(a){le().error("\u4FDD\u5B58 regexPreset \u5F02\u5E38",a),E("error",`\u4FDD\u5B58\u5931\u8D25\uFF1A${a?.message||a}`)}}),t.on("change.tww",'[data-binding="worldbookPreset"]',function(){let n=r(this).val();try{let a=Pe();it({...a,worldbooks:{...a.worldbooks||{},presetId:n}}),E("success","\u4E16\u754C\u4E66\u9884\u8BBE\u5DF2\u66F4\u65B0")}catch(a){le().error("\u4FDD\u5B58 worldbookPreset \u5F02\u5E38",a),E("error",`\u4FDD\u5B58\u5931\u8D25\uFF1A${a?.message||a}`)}}),t.on("change.tww",'[data-binding="contextDepth"]',function(){let n=Math.max(1,parseInt(r(this).val(),10)||3);try{let a=Pe();it({...a,contextDepth:n}),E("success","\u5DF2\u4FDD\u5B58")}catch(a){le().error("\u4FDD\u5B58 contextDepth \u5F02\u5E38",a),E("error",`\u4FDD\u5B58\u5931\u8D25\uFF1A${a?.message||a}`)}}),t.on("click.tww",'[data-toggle="worldbookSync"]',function(){let n=r(this),a=n.hasClass("on"),i=!a;n.toggleClass("on",i);try{let l=Pe();it({...l,worldbookSync:{...l.worldbookSync||{},enabled:i}}),E("success",i?"\u5DF2\u542F\u7528\u4E16\u754C\u4E66\u540C\u6B65":"\u5DF2\u505C\u7528\u4E16\u754C\u4E66\u540C\u6B65"),typeof e=="function"&&e()}catch(l){n.toggleClass("on",a),le().error("toggle worldbookSync \u5F02\u5E38",l),E("error",`\u4FDD\u5B58\u5931\u8D25\uFF1A${l?.message||l}`)}}),t.on("click.tww",'[data-toggle="worldbookWrapperEnabled"]',function(){let n=r(this),a=n.hasClass("on"),i=!a;n.toggleClass("on",i);try{let l=Pe(),c=l.worldbookSync||{};it({...l,worldbookSync:{...c,wrapperConfig:{...c.wrapperConfig||{},enabled:i}}}),E("success",i?"\u5DF2\u542F\u7528 Wrapper \u5305\u88F9":"\u5DF2\u505C\u7528 Wrapper")}catch(l){n.toggleClass("on",a),le().error("toggle worldbookWrapperEnabled \u5F02\u5E38",l)}});let o=[{sel:'[data-binding="worldbookTargetBook"]',path:"targetBook",type:"string"},{sel:'[data-binding="worldbookWrapperTag"]',path:"wrapperConfig.wrapperTag",type:"string"},{sel:'[data-binding="worldbookWrapperHint"]',path:"wrapperConfig.wrapperHint",type:"string"},{sel:'[data-binding="worldbookWrapperPosition"]',path:"wrapperConfig.wrapperPlacement.position",type:"string"},{sel:'[data-binding="worldbookWrapperDepth"]',path:"wrapperConfig.wrapperPlacement.depth",type:"number"},{sel:'[data-binding="worldbookWrapperOrder"]',path:"wrapperConfig.wrapperPlacement.order",type:"number"}];for(let{sel:n,path:a,type:i}of o)t.on("change.tww",n,function(){let l=r(this).val();i==="number"&&(l=Number.parseInt(l,10));try{let c=Pe(),d=vS(c.worldbookSync||{});TS(d,a,l),it({...c,worldbookSync:d}),E("success","\u5DF2\u4FDD\u5B58")}catch(c){le().error(`\u4FDD\u5B58 worldbookSync.${a} \u5F02\u5E38`,c),E("error",`\u4FDD\u5B58\u5931\u8D25\uFF1A${c?.message||c}`)}});t.on("click.tww",'[data-action="refresh-worldbooks"]',function(n){n.preventDefault(),typeof e=="function"&&e(),E("success","\u5DF2\u5237\u65B0\u4E16\u754C\u4E66\u5217\u8868")}),t.on("click.tww",'[data-toggle="mirrorToMessage"]',function(){let n=r(this),a=n.hasClass("on"),i=!a;n.toggleClass("on",i);try{let l=Pe();it({...l,mirrorToMessage:i}),E("success",i?"\u5DF2\u542F\u7528\u6B63\u6587\u955C\u50CF":"\u5DF2\u505C\u7528\u6B63\u6587\u955C\u50CF")}catch(l){n.toggleClass("on",a),le().error("toggle mirrorToMessage \u5F02\u5E38",l),E("error",`\u4FDD\u5B58\u5931\u8D25\uFF1A${l?.message||l}`)}}),t.on("click.tww","[data-link]",function(n){n.preventDefault(),E("info","\u8DF3\u8F6C\u5230\u9884\u8BBE\u7BA1\u7406\u9762\u677F\uFF08\u5F85\u63A5\u5165\uFF09")})}var Wc,vt,am,lm,um=N(()=>{H();fo();sr();uo();Ue();Hr();ii();Sn();nm();Ue();Bo();To();Kr();Ys();Xe();vt={kind:null,sheetCount:null,rowCount:null,lastError:null,lastRefreshAt:0},am=!1;lm=`
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
  flex: 1;
  min-height: 0;
  overflow: hidden;
  /* \u8BAE\u9898 #15 hotfix v1.0.173\uFF1A\u7236\u5BB9\u5668\uFF08popup yyt-content\uFF09\u5DF2\u662F\u6DF1\u8272\uFF0C\u672C\u5BB9\u5668\u900F\u660E\u7EE7\u627F\u907F\u514D\u8FB9\u754C\u9519\u4F4D */
  background: transparent; color: var(--tww-text);
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
  flex: 1;
  min-height: 0;
  overflow-y: auto;
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
`});var ym={};se(ym,{TableWorkbenchPanel:()=>pm,default:()=>$S});function NS(){if(!Yc)try{let t=window.parent&&window.parent.document?window.parent.document:document,e=t.head||t.documentElement;if(e.querySelector("#yyt-tww-styles")){Yc=!0;return}let r=t.createElement("style");r.id="yyt-tww-styles",r.textContent=lm,e.appendChild(r),Yc=!0}catch(t){Gc.warn("\u6CE8\u5165\u5DE5\u4F5C\u53F0\u6837\u5F0F\u5931\u8D25",t)}}var Gc,Yc,pm,$S,fm=N(()=>{Xe();H();um();Gc=R.createScope("TableWorkbenchPanel"),Yc=!1;pm={id:"tableWorkbenchPanel",render(){NS();try{let t=dm();return cm(t)}catch(t){return Gc.error("\u6E32\u67D3\u5DE5\u4F5C\u53F0 UI \u5F02\u5E38",t),`<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5DE5\u4F5C\u53F0\u6E32\u67D3\u5931\u8D25\uFF1A${t?.message||t}</span></div>`}},bindEvents(t){if(!Z()||!xe(t))return;let r=this,s=()=>{try{t.html(r.render()),Hc(t,s)}catch(o){Gc.error("refresh \u5F02\u5E38",o)}};Hc(t,s)},renderTo(t){!Z()||!xe(t)||(t.html(this.render()),this.bindEvents(t))}},$S=pm});var mm={};se(mm,{LoggerPanel:()=>gm,default:()=>zS});function OS(t){switch(t){case ye.DEBUG:return"yyt-log-debug";case ye.INFO:return"yyt-log-info";case ye.WARN:return"yyt-log-warn";case ye.ERROR:return"yyt-log-error";default:return""}}function BS(t){let e=new Date(t),r=s=>String(s).padStart(2,"0");return`${r(e.getHours())}:${r(e.getMinutes())}:${r(e.getSeconds())}.${String(e.getMilliseconds()).padStart(3,"0")}`}var DS,LS,gm,zS,hm=N(()=>{H();Je();Xe();DS="yyt-logger-panel",LS=[{level:null,label:"\u5168\u90E8",icon:"fa-list"},{level:ye.DEBUG,label:"DEBUG",icon:"fa-bug"},{level:ye.INFO,label:"INFO",icon:"fa-circle-info"},{level:ye.WARN,label:"WARN",icon:"fa-triangle-exclamation"},{level:ye.ERROR,label:"ERROR",icon:"fa-circle-exclamation"}];gm={id:"loggerPanel",render(){let t=R.getStats();return`
      <div class="yyt-logger-panel" id="${DS}">
        <div class="yyt-logger-toolbar">
          <div class="yyt-logger-filter-btns" data-yyt-log-filter-group>
            ${LS.map((e,r)=>`<button class="yyt-log-filter-btn ${r===0?"yyt-active":""}" data-level="${e.level??""}">
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
    `},bindEvents(t){let e=Z();if(!e||!xe(t))return;let r=this,s=null,o=!1,n=[],a=t.find("[data-yyt-log-list]"),i=t.find("[data-yyt-log-search]"),l=t.find("[data-yyt-log-autoscroll]"),c=t.find("[data-yyt-log-pause]");function d(p){if(!p.length){a.html('<div class="yyt-logger-empty">\u6682\u65E0\u5339\u914D\u7684\u65E5\u5FD7\u8BB0\u5F55</div>');return}a.html(p.map(f=>`
        <div class="yyt-log-entry ${OS(f.level)}" data-log-id="${f.id}">
          <span class="yyt-log-time">${BS(f.timestamp)}</span>
          <span class="yyt-log-level">${R.levelLabel(f.level)}</span>
          <span class="yyt-log-scope">${oe(f.scope)}</span>
          <span class="yyt-log-msg">${oe(f.message)}</span>
          ${f.data!==void 0?`<span class="yyt-log-data">${oe(typeof f.data=="object"?JSON.stringify(f.data):String(f.data))}</span>`:""}
        </div>
      `).join(""))}function u(){let p=i.val()?.trim()||"",{entries:f}=R.getEntries({level:s,search:p||void 0,limit:500});d(f),l.is(":checked")&&requestAnimationFrame(()=>{a[0].scrollTop=a[0].scrollHeight})}function y(){if(o||!n.length)return;let p=n;n=[],u()}this._onLogEntry=p=>{if(o||s!==null&&p.level<s)return;let f=i.val()?.trim().toLowerCase()||"";if(f){let g=p.scope.toLowerCase().includes(f),h=p.message.toLowerCase().includes(f);if(!g&&!h)return}n.push(p),n.length>=50?y():this._flushTimer||(this._flushTimer=setTimeout(()=>{this._flushTimer=null,y(),r._updateStats(t)},250))},K.on("logger:entry",this._onLogEntry),t.on("click.yytLogger","[data-yyt-log-filter-group] .yyt-log-filter-btn",p=>{t.find("[data-yyt-log-filter-group] .yyt-log-filter-btn").removeClass("yyt-active"),e(p.currentTarget).addClass("yyt-active");let f=e(p.currentTarget).data("level");s=f===""?null:f,u(),r._updateStats(t)}),i.on("input.yytLogger",()=>{u()}),t.on("click.yytLogger","[data-yyt-log-pause]",()=>{o=!o,c.toggleClass("yyt-active",o),c.html(o?'<i class="fa-solid fa-play"></i> \u7EE7\u7EED':'<i class="fa-solid fa-pause"></i> \u6682\u505C'),o||(n=[],u(),r._updateStats(t))}),t.on("click.yytLogger","[data-yyt-log-clear]",()=>{R.clear(),a.html('<div class="yyt-logger-empty">\u65E5\u5FD7\u5DF2\u6E05\u9664</div>'),r._updateStats(t)}),t.on("click.yytLogger","[data-yyt-log-export]",()=>{let{entries:p}=R.getEntries({limit:1e4}),f=JSON.stringify(p.map(T=>({time:new Date(T.timestamp).toISOString(),level:R.levelLabel(T.level),scope:T.scope,message:T.message,data:T.data})),null,2),g=new Blob([f],{type:"application/json"}),h=URL.createObjectURL(g),x=document.createElement("a");x.href=h,x.download=`yyt-logs-${new Date().toISOString().replace(/[:.]/g,"-")}.json`,x.click(),URL.revokeObjectURL(h)}),u()},_updateStats(t){if(!Z()||!xe(t))return;let r=R.getStats(),s=t.find(".yyt-logger-stats");s.length&&s.html(`
      <span class="yyt-logger-stat">\u5171 <strong>${r.total}</strong> \u6761</span>
      ${["ERROR","WARN","INFO","DEBUG"].map(o=>`<span class="yyt-logger-stat yyt-log-${o.toLowerCase()}">${o}: <strong>${r.byLevel[o]||0}</strong></span>`).join("")}
    `)},destroy(t){let e=Z();this._onLogEntry&&(K.off("logger:entry",this._onLogEntry),this._onLogEntry=null),this._flushTimer&&(clearTimeout(this._flushTimer),this._flushTimer=null),!(!e||!xe(t))&&t.off(".yytLogger")},getStyles(){return`
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
    `}},zS=gm});var Am={};se(Am,{MAIN_TAB_RENDERERS:()=>ld,PanelState:()=>Mi,SCRIPT_ID:()=>ds,SUB_TAB_RENDERERS:()=>cd,UIManager:()=>Fo,bindDialogEvents:()=>Ko,closeActiveCustomSelectDropdown:()=>Vt,closeCustomSelectDropdown:()=>$i,createDialogHtml:()=>zo,default:()=>US,destroyEnhancedCustomSelects:()=>dt,downloadJson:()=>Uo,enhanceNativeSelects:()=>Dt,escapeHtml:()=>oe,fillFormWithConfig:()=>Xh,getAllStyles:()=>Em,getFormApiConfig:()=>Jh,getJQuery:()=>Z,getTargetDocument:()=>pr,initUI:()=>vm,isContainerValid:()=>xe,normalizeCustomSelectOptions:()=>Ud,openCustomSelectDropdown:()=>zd,readFileContent:()=>jo,registerComponents:()=>qc,renderApiPanel:()=>Vc,renderBypassPanel:()=>od,renderCustomSelectControl:()=>jd,renderEscapeTransformToolPanel:()=>rd,renderLoggerPanel:()=>id,renderMainTab:()=>Sm,renderPunctuationTransformToolPanel:()=>sd,renderRegexPanel:()=>Xc,renderSettingsPanel:()=>nd,renderStatusBlockPanel:()=>ed,renderSubTabComponent:()=>_m,renderSummaryToolPanel:()=>Zc,renderTableTemplatePanel:()=>Qc,renderTableWorkbenchPanel:()=>ad,renderToolPanel:()=>Tm,renderWorldbookPresetPanel:()=>Jc,renderYouyouReviewPanel:()=>td,repositionActiveCustomSelectDropdown:()=>Ni,resetJQueryCache:()=>jh,showConfirm:()=>yr,showPrompt:()=>Qh,showToast:()=>E,showTopNotice:()=>us,toggleCustomSelectDropdown:()=>Kd,uiManager:()=>Ft,withButtonLoading:()=>Zh});async function xm(t){if(!ci.has(t)){let e=bm[t];if(typeof e!="function")throw new Error(`unknown_panel:${t}`);ci.set(t,e().then(r=>{let s=r?.[t]||r?.default;if(!s?.id)throw new Error(`invalid_panel:${t}`);return s}).catch(r=>{throw ci.delete(t),r}))}return ci.get(t)}function wm(t,e=null){let r=e?.message?`\uFF1A${oe(e.message)}`:"";return`<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>${oe(t)}${r}</span></div>`}async function qc(){let t=await Promise.allSettled(Object.keys(bm).map(async r=>{let s=await xm(r);return Ft.register(s.id,s),s.id})),e=t.filter(r=>r.status==="rejected");e.length&&e.forEach(r=>Pn.error("\u7EC4\u4EF6\u6CE8\u518C\u5931\u8D25",r.reason)),Pn.log(`\u7EC4\u4EF6\u6CE8\u518C\u5B8C\u6210\uFF0C\u6210\u529F ${t.length-e.length} \u4E2A\uFF0C\u5931\u8D25 ${e.length} \u4E2A`)}async function vm(t={}){let{autoInjectStyles:e=!0,targetDocument:r,...s}=t;Ft.init(s),await qc(),e&&Ft.injectStyles(r),Pn.log("\u6A21\u5757\u521D\u59CB\u5316\u5B8C\u6210")}async function KS(t){let e=await xm(t);return Ft.getComponent(e.id)||Ft.register(e.id,e),e}async function Tt(t,e,r={}){let s=await KS(t);Ft.render(s.id,e,r)}function Vc(t){return Tt("ApiPresetPanel",t)}function Jc(t){return Tt("WorldbookPresetPanel",t)}function Xc(t){return Tt("RegexExtractPanel",t)}function Qc(t){return Tt("TableTemplatePanel",t)}function Tm(t){return Tt("ToolManagePanel",t)}function Zc(t){return Tt("SummaryToolPanel",t)}function ed(t){return Tt("StatusBlockPanel",t)}function td(t){return Tt("YouyouReviewPanel",t)}function rd(t){return Tt("EscapeTransformToolPanel",t)}function sd(t){return Tt("PunctuationTransformToolPanel",t)}function od(t){return Tt("BypassPanel",t)}function nd(t){return Tt("SettingsPanel",t)}function ad(t){return Tt("TableWorkbenchPanel",t)}function id(t){return Tt("LoggerPanel",t)}async function Sm(t,e){let r=ld[t];if(!r)return!1;try{await r.render(e)}catch(s){Pn.error(r.failMessage,s),e.html(wm(r.failMessage,s))}return!0}async function _m(t,e){let r=cd[t];if(!r)return null;try{await r.render(e)}catch(s){Pn.error(r.failMessage,s),e.html(wm(r.failMessage,s))}return t}function Em(){return Ft.getAllStyles()}var Pn,bm,ci,ld,cd,US,km=N(()=>{H();Di();Xe();Xe();Di();Pn=R.createScope("UI"),bm=Object.freeze({ApiPresetPanel:()=>Promise.resolve().then(()=>(au(),nu)),WorldbookPresetPanel:()=>Promise.resolve().then(()=>(_u(),Su)),RegexExtractPanel:()=>Promise.resolve().then(()=>(Rp(),Ip)),TableTemplatePanel:()=>Promise.resolve().then(()=>(Hy(),Wy)),ToolManagePanel:()=>Promise.resolve().then(()=>(qy(),Gy)),SummaryToolPanel:()=>Promise.resolve().then(()=>(xf(),bf)),StatusBlockPanel:()=>Promise.resolve().then(()=>(Tf(),vf)),YouyouReviewPanel:()=>Promise.resolve().then(()=>(Ef(),_f)),EscapeTransformToolPanel:()=>Promise.resolve().then(()=>(If(),Cf)),PunctuationTransformToolPanel:()=>Promise.resolve().then(()=>(Pf(),Mf)),BypassPanel:()=>Promise.resolve().then(()=>(Df(),$f)),SettingsPanel:()=>Promise.resolve().then(()=>(hc(),mc)),TableWorkbenchPanel:()=>Promise.resolve().then(()=>(fm(),ym)),LoggerPanel:()=>Promise.resolve().then(()=>(hm(),mm))}),ci=new Map;ld=Object.freeze({tableWorkbench:{render:t=>ad(t),failMessage:"\u586B\u8868\u5DE5\u4F5C\u53F0\u52A0\u8F7D\u5931\u8D25"},bypass:{render:t=>od(t),failMessage:"Ai\u6307\u4EE4\u9884\u8BBE\u9762\u677F\u52A0\u8F7D\u5931\u8D25"},settings:{render:t=>nd(t),failMessage:"\u8BBE\u7F6E\u9762\u677F\u52A0\u8F7D\u5931\u8D25"},logger:{render:t=>id(t),failMessage:"\u65E5\u5FD7\u9762\u677F\u52A0\u8F7D\u5931\u8D25"}}),cd=Object.freeze({ApiPresetPanel:{render:t=>Vc(t),failMessage:"API \u9884\u8BBE\u9762\u677F\u52A0\u8F7D\u5931\u8D25"},RegexExtractPanel:{render:t=>Xc(t),failMessage:"\u6B63\u5219\u63D0\u53D6\u9762\u677F\u52A0\u8F7D\u5931\u8D25"},WorldbookPresetPanel:{render:t=>Jc(t),failMessage:"\u4E16\u754C\u4E66\u9884\u8BBE\u9762\u677F\u52A0\u8F7D\u5931\u8D25"},TableTemplatePanel:{render:t=>Qc(t),failMessage:"\u8868\u683C\u6A21\u677F\u9762\u677F\u52A0\u8F7D\u5931\u8D25"},SummaryToolPanel:{render:t=>Zc(t),failMessage:"\u6458\u8981\u5DE5\u5177\u52A0\u8F7D\u5931\u8D25"},StatusBlockPanel:{render:t=>ed(t),failMessage:"\u4E3B\u89D2\u72B6\u6001\u680F\u52A0\u8F7D\u5931\u8D25"},YouyouReviewPanel:{render:t=>td(t),failMessage:"\u5C0F\u5E7D\u70B9\u8BC4\u52A0\u8F7D\u5931\u8D25"},EscapeTransformToolPanel:{render:t=>rd(t),failMessage:"\u8F6C\u4E49\u5904\u7406\u5DE5\u5177\u52A0\u8F7D\u5931\u8D25"},PunctuationTransformToolPanel:{render:t=>sd(t),failMessage:"\u4E2D\u6587\u6807\u70B9\u66FF\u6362\u5DE5\u5177\u52A0\u8F7D\u5931\u8D25"}});US={uiManager:Ft,registerComponents:qc,initUI:vm,renderApiPanel:Vc,renderWorldbookPresetPanel:Jc,renderRegexPanel:Xc,renderTableTemplatePanel:Qc,renderToolPanel:Tm,renderSummaryToolPanel:Zc,renderStatusBlockPanel:ed,renderYouyouReviewPanel:td,renderEscapeTransformToolPanel:rd,renderPunctuationTransformToolPanel:sd,renderBypassPanel:od,renderSettingsPanel:nd,renderTableWorkbenchPanel:ad,renderLoggerPanel:id,MAIN_TAB_RENDERERS:ld,SUB_TAB_RENDERERS:cd,renderMainTab:Sm,renderSubTabComponent:_m,getAllStyles:Em}});var Nm={};se(Nm,{TX_PHASE:()=>jt,ToolAutomationService:()=>ui,Transaction:()=>di,default:()=>YS,toolAutomationService:()=>Pm});function ge(t){return t==null?"":String(t).trim()}function Cm(t){let e=Na(t);return ge(e?.chatId??e?.chat_id??t?.chatId??t?.chat_id??t?.chat_filename??t?.this_chid??"chat_default")||"chat_default"}function dd(t){let e=Na(t);return Array.isArray(e?.chat)?e.chat:Array.isArray(t?.chat)?t.chat:[]}function Mm(t){if(!t||t?.is_user===!0||t?.is_system===!0)return!1;let e=String(t?.role||"").trim().toLowerCase();return e==="user"||e==="system"?!1:e==="assistant"||e==="ai"||!e}function jS(t,e){let r=ge(e);if(!r)return null;let s=dd(t);for(let o=s.length-1;o>=0;o-=1){let n=s[o];if([n?.messageId,n?.message_id,n?.id,n?.mid,n?.mesid,n?.chat_index,o].map(i=>ge(i)).includes(r))return n||null}return null}function Im(t){let e=dd(t);if(!Array.isArray(e)||e.length===0)return null;let r=e.length-1,s=e[r]||null;if(!Mm(s))return null;let o=ge(s?.messageId??s?.message_id??s?.id??s?.mid??s?.mesid??s?.chat_index??r);return o?{messageId:o,swipeId:ge(s?.swipeId??s?.swipe_id??s?.swipe??s?.swipeIndex),message:s}:null}function HS(){let t=Date.now().toString(36),e=Math.random().toString(36).slice(2,8);return`tx_${t}_${e}`}var We,Rm,FS,WS,jt,di,ui,Pm,YS,$m=N(()=>{gn();H();oc();tr();mn();ac();hs();ii();sr();We=R.createScope("ToolAutomation");Rm=1e4,FS=15e3,WS=800;jt=Object.freeze({RECEIVED:"received",CONFIRMED:"confirmed",CONTEXT_BUILT:"context_built",REQUEST_STARTED:"request_started",REQUEST_FINISHED:"request_finished",WRITEBACK_STARTED:"writeback_started",WRITEBACK_COMMITTED:"writeback_committed",REFRESH_CONFIRMED:"refresh_confirmed",SKIPPED:"skipped",FAILED:"failed"}),di=class{constructor({chatId:e,messageId:r,swipeId:s,sourceEvent:o,generationKey:n}){this.traceId=HS(),this.chatId=e||"",this.messageId=r||"",this.swipeId=s||"",this.sourceEvent=o||"",this.generationKey=n||"",this.phase=jt.RECEIVED,this.createdAt=Date.now(),this.updatedAt=Date.now(),this.verdict="",this.error=null,this.toolResults=[],this.writebackState=null,this.refreshState=null}transition(e,r={}){return this.phase=e,this.updatedAt=Date.now(),Object.assign(this,r),this}toSnapshot(){return{...this}}},ui=class{constructor(){this._stopCallbacks=[],this._pendingTimers=new Map,this._recentlyProcessedSlots=new Map,this._ownWriteMessageIds=new Map,this._slotQueues=new Map,this._activeTransactions=new Map,this._isProcessing=!1,this._currentChatId="",this.debugMode=!1,this._transactionHistory=[],this._maxHistorySize=30,this._hostBindingStatus={initialized:!1,initAttempts:0,lastInitAt:0,lastInitResult:"idle",source:"unavailable",hasEventSource:!1,hasEventTypes:!1,eventBindings:[],retryScheduled:!1,retryDelayMs:0,lastError:""},this._messageReceivedThrottleUntil=0}setDebugMode(e){this.debugMode=e===!0}init(e={}){this.stop(),this._hostBindingStatus.lastInitAt=Date.now(),this._hostBindingStatus.initAttempts=(this._hostBindingStatus.initAttempts||0)+1;let r=Xr();this._currentChatId=Cm(r);let s=(o,...n)=>{let a=Xr(),{messageId:i,swipeId:l}=this._extractIdentitiesFromArgs(n);if(We.debug(`\u6536\u5230\u5BBF\u4E3B\u4E8B\u4EF6 "${o}"`,{messageId:i,swipeId:l,argCount:n.length}),o===Ye.MESSAGE_RECEIVED){let g=Date.now();if(g<this._messageReceivedThrottleUntil){We.debug(`MESSAGE_RECEIVED \u5728\u8282\u6D41\u7A97\u53E3\u5185\uFF0C\u8DF3\u8FC7\uFF08\u5269\u4F59 ${this._messageReceivedThrottleUntil-g}ms\uFF09`);return}this._messageReceivedThrottleUntil=g+this._getSettleMs()+5e3}let c=null,d=i,u=l;if(d&&(c=jS(a,d)),!c){let g=Im(a);g?.messageId&&(c=g.message,d=g.messageId,u=g.swipeId||u)}if(!d||!c){We.debug(`\u4E8B\u4EF6 "${o}" \u65E0 assistant \u76EE\u6807\uFF0C\u8DF3\u8FC7`);return}if(!Mm(c)){We.debug(`\u4E8B\u4EF6 "${o}" \u547D\u4E2D\u975E assistant \u6D88\u606F\uFF0C\u8DF3\u8FC7`,{messageId:d});return}let y=String(c.content||c.mes||"").trim();if(!y||y.length<5){We.debug(`\u4E8B\u4EF6 "${o}" \u6D88\u606F\u8FC7\u77ED\uFF08${y.length} \u5B57\u7B26\uFF09\uFF0C\u8DF3\u8FC7`);return}if(this._isProcessing){We.debug(`\u4E8B\u4EF6 "${o}" \u6B63\u5728\u5904\u7406\u4E2D\uFF0C\u8DF3\u8FC7`);return}if(this._isOwnWrite(d)){We.debug(`\u4E8B\u4EF6 "${o}" \u547D\u4E2D own-write \u9ED1\u540D\u5355\uFF0C\u8DF3\u8FC7`,{messageId:d});return}let p=ge(c?.swipeId??c?.swipe_id??c?.swipe??c?.swipeIndex);p&&(u=p);let f=`${d}::${u}`;if(this._isRecentlyProcessed(f)){We.debug(`\u4E8B\u4EF6 "${o}" slot \u5DF2\u8FD1\u671F\u5904\u7406\u8FC7\uFF0C\u8DF3\u8FC7`,{slotKey:f});return}this._scheduleMessageProcessing(d,u,{settleMs:this._getSettleMs(),sourceEvent:o}),We.info(`\u4E8B\u4EF6 "${o}" \u901A\u8FC7\u6240\u6709\u5B88\u536B\uFF0C\u5DF2\u8C03\u5EA6\u5904\u7406`,{targetMessageId:d,targetSwipeId:u,throttleUntil:this._messageReceivedThrottleUntil,isProcessing:this._isProcessing})};return this._stopCallbacks.push(Kt.subscribe(Ye.MESSAGE_SENT,()=>{We.debug("MESSAGE_SENT \u2192 \u6E05\u7406\u8C03\u5EA6\u961F\u5217"),this._pendingTimers.forEach(o=>clearTimeout(o)),this._pendingTimers.clear()})),this._stopCallbacks.push(Kt.subscribe(Ye.MESSAGE_RECEIVED,(...o)=>{s(Ye.MESSAGE_RECEIVED,...o)})),this._stopCallbacks.push(Kt.subscribe(Ye.GENERATION_STOPPED,()=>{We.info("GENERATION_STOPPED \u2192 \u53D6\u6D88\u6240\u6709\u6D3B\u8DC3\u4E8B\u52A1"),this._cancelActiveTransactions("generation_stopped"),this._pendingTimers.forEach(o=>clearTimeout(o)),this._pendingTimers.clear(),this._isProcessing=!1})),this._stopCallbacks.push(Kt.subscribe(Ye.CHAT_CHANGED,()=>{this._resetForChatChange()})),this._stopCallbacks.push(Kt.subscribe(Ye.MESSAGE_DELETED,o=>{this._clearMessageState(ge(o))})),this._refreshHostBindingStatus(),this._seedKnownSlots(),We.info("\u81EA\u52A8\u5316\u670D\u52A1\u5DF2\u521D\u59CB\u5316",{chatId:this._currentChatId,source:this._hostBindingStatus.source}),!0}_seedKnownSlots(){try{let e=Xr(),r=Im(e);if(!r?.messageId)return;let s=`${ge(r.messageId)}::${ge(r.swipeId)}`;this._recentlyProcessedSlots.set(s,Number.MAX_SAFE_INTEGER),We.debug(`\u5DF2\u5C06\u5F53\u524D\u6700\u65B0 slot "${s}" \u9884\u6807\u8BB0\u4E3A\u5DF2\u77E5\uFF0C\u8DF3\u8FC7 MESSAGE_RECEIVED \u91CD\u653E`)}catch(e){We.warn("_seedKnownSlots \u5931\u8D25",{error:e})}}_refreshHostBindingStatus(){let e=Kt.describe(),r=[Ye.MESSAGE_SENT,Ye.MESSAGE_RECEIVED,Ye.GENERATION_STOPPED,Ye.CHAT_CHANGED,Ye.MESSAGE_DELETED];this._hostBindingStatus={...this._hostBindingStatus,initialized:!!e.hasBridge,lastInitResult:e.hasBridge?"ready":e.retryScheduled?"pending_retry":"pending",source:e.source,hasEventSource:!!e.hasBridge,hasEventTypes:Array.isArray(e.availableEvents)&&e.availableEvents.length>0,eventBindings:r.map(s=>`subscribed: ${s}`),retryScheduled:!!e.retryScheduled,retryDelayMs:0,lastError:""}}stop(){this._stopCallbacks.forEach(e=>{try{e()}catch(r){We.warn("\u505C\u6B62\u56DE\u8C03\u5931\u8D25",{error:r})}}),this._stopCallbacks=[],this._pendingTimers.forEach(e=>clearTimeout(e)),this._pendingTimers.clear(),this._slotQueues.clear(),this._recentlyProcessedSlots.clear(),this._ownWriteMessageIds.clear(),this._cancelActiveTransactions("service_stopped"),this._activeTransactions.clear(),this._isProcessing=!1,this._hostBindingStatus={initialized:!1,initAttempts:0,lastInitAt:0,lastInitResult:"idle",source:"unavailable",hasEventSource:!1,hasEventTypes:!1,eventBindings:[],retryScheduled:!1,retryDelayMs:0,lastError:""}}isEnabled(){return!0}getRuntimeSnapshot(){return this._pruneRecentSlots(),this._pruneOwnWrites(),this._refreshHostBindingStatus(),{currentChatId:this._currentChatId,enabled:!0,isProcessing:this._isProcessing,pendingTimerCount:this._pendingTimers.size,queuedSlotCount:this._slotQueues.size,recentlyProcessedSlotCount:this._recentlyProcessedSlots.size,ownWriteMessageIdCount:this._ownWriteMessageIds.size,activeTransactionCount:this._activeTransactions.size,recentTransactions:this._transactionHistory.slice(-10).map(e=>e.toSnapshot()),hostBinding:{...this._hostBindingStatus,eventBindings:Array.isArray(this._hostBindingStatus?.eventBindings)?[...this._hostBindingStatus.eventBindings]:[]},settings:this._getAutomationSettings()}}async processCurrentAssistantMessage(e={}){let r=await ms({messageId:"",swipeId:"",runSource:"AUTO"}),s=ge(r?.sourceMessageId||r?.messageId);return s?this.processAssistantMessage(s,{force:e.force===!0,swipeId:ge(r?.sourceSwipeId),sourceEvent:e.sourceEvent||"MANUAL_CURRENT_ASSISTANT"}):{success:!1,error:"\u672A\u627E\u5230\u5F53\u524D assistant \u697C\u5C42"}}async processAssistantMessage(e,{force:r=!1,swipeId:s="",sourceEvent:o="AUTO"}={}){let n=new di({chatId:this._currentChatId,messageId:e,swipeId:s,sourceEvent:o});try{if(!e)return this._skipTransaction(n,"missing_message_id");n.transition(jt.CONFIRMED);let a=await ms({messageId:e,swipeId:s,runSource:"AUTO"}),i=a?.targetAssistantMessage||null;if(!i||!a?.sourceMessageId)return this._skipTransaction(n,"assistant_message_not_found");let l=String(i.content||i.mes||"").trim();if(!l||l.length<5)return this._skipTransaction(n,"assistant_message_too_short");n.transition(jt.CONTEXT_BUILT);let c=`${ge(a.sourceMessageId)}::${ge(a.sourceSwipeId||s)}`;if(n.generationKey=c,!r&&this._isRecentlyProcessed(c))return this._skipTransaction(n,"duplicate_slot",{slotKey:c});let d=Qo(),u=Mt.filterAutoPostResponseTools(d),p=[...d.filter(h=>Mt.shouldRunLocalTransform(h)&&h.output?.autoTrigger!==!1),...u],f=Pe(),g=f?.autoUpdateEnabled===!0&&ge(f?.autoUpdateTrigger||"assistantMessage")==="assistantMessage";return!p.length&&!g?this._skipTransaction(n,"no_auto_tools",{tools:p}):(n.slotKey=c,n.slotRevisionKey=a.slotRevisionKey||"",n.sourceMessageId=a.sourceMessageId||e,n.sourceSwipeId=a.sourceSwipeId||s||"",this._enqueueSlot(c,async()=>{if(!r&&this._isRecentlyProcessed(c))return this._skipTransaction(n,"duplicate_slot_after_queue",{slotKey:c});this._isProcessing=!0,this._markSlotProcessed(c),n.transition(jt.REQUEST_STARTED);let h=new AbortController;this._registerActiveTransaction(n,{controller:h,slotKey:c,sourceMessageId:a.sourceMessageId||e,sourceSwipeId:a.sourceSwipeId||s||""});try{let{results:x,hasWriteback:T}=await this._executeAutoTools(p,a,h,n,{slotKey:c,messageId:e,swipeId:s}),{tableResult:v,hasWriteback:L}=await this._executeAutoTableUpdate(a,h,n,{shouldRunTableAuto:g,tableWorkbenchConfig:f,messageId:e,swipeId:s,sourceEvent:o}),C=T||L;n.transition(jt.REQUEST_FINISHED,{toolResults:x,tableResult:v}),C&&(n.transition(jt.WRITEBACK_STARTED),n.writebackState={messageId:a.sourceMessageId,swipeId:a.sourceSwipeId,hasOutput:!0},this._messageReceivedThrottleUntil=Date.now()+FS),this._markSlotProcessed(c);let _=x.every(S=>S?.success!==!1),k=!g||!!v?.success||v?.skipped===!0||v?.meta?.aborted===!0||v?.meta?.stale===!0,W=_&&k,q=x.some(S=>S?.meta?.aborted===!0||S?.meta?.stale===!0||S?.error==="\u8BF7\u6C42\u5DF2\u53D6\u6D88")||v?.meta?.aborted===!0||v?.meta?.stale===!0;W&&n.transition(jt.WRITEBACK_COMMITTED);let M=W?jt.REFRESH_CONFIRMED:jt.FAILED;return n.transition(M,{verdict:q?"aborted":W?"success":"partial_failure"}),this._recordTransaction(n),this._updateAutoRuntimeForResults(p,a,n,x),{success:W,traceId:n.traceId,slotKey:c,sourceEvent:o,messageId:a.sourceMessageId||e,phase:n.phase,results:x,tableResult:v}}finally{this._unregisterActiveTransaction(n.traceId),this._isProcessing=!1}}))}catch(a){return n.transition(jt.FAILED,{error:a?.message||String(a)}),this._recordTransaction(n),this._unregisterActiveTransaction(n.traceId),this._isProcessing=!1,We.error("processAssistantMessage \u5F02\u5E38",{error:a}),{success:!1,traceId:n.traceId,error:n.error,phase:n.phase}}}_extractIdentitiesFromArgs(e){let r="",s="";for(let o of e)if(o!=null){if(typeof o=="number"&&Number.isFinite(o)&&!r){r=ge(o);continue}if(typeof o=="string"){let n=ge(o);!r&&/^\d+$/.test(n)&&(r=n);continue}typeof o=="object"&&(r||(r=ge(o.messageId??o.message_id??o.id??o.mid??o.mesid??o.chat_index??o.message?.messageId??o.message?.message_id??o.message?.id??o.message?.mid??o.message?.mesid??o.message?.chat_index??o.data?.messageId??o.data?.message_id??o.data?.id??o.data?.mid??o.data?.mesid??o.data?.chat_index??o.target?.messageId??o.target?.message_id??o.target?.id??o.target?.mid??o.target?.mesid??o.target?.chat_index)),s||(s=ge(o.swipeId??o.swipe_id??o.swipe??o.swipeIndex??o.currentSwipe??o.message?.swipeId??o.message?.swipe_id??o.message?.swipe??o.data?.swipeId??o.data?.swipe_id??o.data?.swipe??o.target?.swipeId??o.target?.swipe_id??o.target?.swipe)))}return{messageId:r,swipeId:s}}_scheduleMessageProcessing(e,r="",s={}){let o=s.settleMs??this._getSettleMs(),n=`msg::${ge(e)}::${ge(r)}`,a=this._pendingTimers.get(n);a&&clearTimeout(a);let i=setTimeout(()=>{this._pendingTimers.delete(n),this.processAssistantMessage(e,{swipeId:r,sourceEvent:s.sourceEvent||"AUTO"}).catch(l=>{We.error("\u8C03\u5EA6\u6267\u884C\u5931\u8D25",{messageId:e,error:l})})},Math.max(0,o));this._pendingTimers.set(n,i),We.info("\u5DF2\u8C03\u5EA6\u6D88\u606F\u5904\u7406",{timerKey:n,settleMs:o,sourceEvent:s.sourceEvent})}cancelAutomation(e={}){let r=e.reason||"manual_cancel",s=ge(e.messageId),o=ge(e.slotKey),n=ge(e.traceId),a=0;for(let[i,l]of this._pendingTimers){let c=s&&i.includes(`::${s}::`),d=o&&i.includes(o);(c||d||!s&&!o&&!n)&&(clearTimeout(l),this._pendingTimers.delete(i),a+=1)}return a+=this._cancelActiveTransactions(r,{messageId:s,slotKey:o,traceId:n}),{success:a>0,cancelledCount:a,reason:r}}_isRecentlyProcessed(e){if(!e)return!1;this._pruneRecentSlots();let r=this._recentlyProcessedSlots.get(e);return r?Date.now()-r<this._getDedupeWindowMs():!1}_markSlotProcessed(e){e&&(this._recentlyProcessedSlots.set(e,Date.now()),this._pruneRecentSlots())}_pruneRecentSlots(){let e=Date.now()-this._getDedupeWindowMs();for(let[r,s]of this._recentlyProcessedSlots)(!Number.isFinite(s)||s<e)&&this._recentlyProcessedSlots.delete(r)}async _executeAutoTools(e,r,s,o,{slotKey:n,messageId:a,swipeId:i}){let l=[],c=!1,d=r.lastAiMessage,u=r.assistantBaseText;for(let y of e){let p={...r,signal:s.signal,isAutoRun:!0,abortMeta:{traceId:o.traceId,slotKey:n,sourceMessageId:r.sourceMessageId||a,sourceSwipeId:r.sourceSwipeId||i||""},shouldAbortWriteback:()=>this._shouldAbortAutoWriteback({traceId:o.traceId}),skipNotify:!0,lastAiMessage:d,assistantBaseText:u,input:{...r.input||{},lastAiMessage:d,assistantBaseText:u}},g=Mt.shouldRunLocalTransform(y)?await ja(y,p):await Mt.runToolPostResponse(y,p);if(l.push(g),g?.writebackState||g?.output){c=!0,this._markOwnWrite(r.sourceMessageId||a);let h=this._readCurrentMessageText(r.sourceMessageId||a);if(h){d=h,u=h;let x=Number(r.sourceMessageId||a);Array.isArray(r.chatMessages)&&r.chatMessages[x]&&(r.chatMessages[x].content=h,r.chatMessages[x].mes=h)}}}return{results:l,hasWriteback:c}}async _executeAutoTableUpdate(e,r,s,{shouldRunTableAuto:o,tableWorkbenchConfig:n,messageId:a,swipeId:i,sourceEvent:l}){if(!o)return{tableResult:null,hasWriteback:!1};let c=await Vg({messageId:e.sourceMessageId||a,swipeId:e.sourceSwipeId||i||"",sourceEvent:l,configInput:n,signal:r.signal,shouldAbortWriteback:()=>this._shouldAbortAutoWriteback({traceId:s.traceId})}),d=!!(c?.state||c?.mirrorResult?.success===!0);return d&&this._markOwnWrite(e.sourceMessageId||a),{tableResult:c,hasWriteback:d}}_readCurrentMessageText(e){let r=Xr(),s=dd(r),o=Number(e);if(!Number.isFinite(o)||o<0||o>=s.length)return"";let n=s[o];return String(n?.mes||n?.content||"").trim()}_markOwnWrite(e){let r=ge(e);r&&(this._ownWriteMessageIds.set(r,Date.now()),this._pruneOwnWrites())}_isOwnWrite(e){let r=ge(e);if(!r)return!1;this._pruneOwnWrites();let s=this._ownWriteMessageIds.get(r);return s?Date.now()-s<Rm:!1}_pruneOwnWrites(){let e=Date.now()-Rm;for(let[r,s]of this._ownWriteMessageIds)(!Number.isFinite(s)||s<e)&&this._ownWriteMessageIds.delete(r)}_recordTransaction(e){this._transactionHistory.push(e),this._transactionHistory.length>this._maxHistorySize&&(this._transactionHistory=this._transactionHistory.slice(-this._maxHistorySize)),We.debug(`\u4E8B\u52A1 [${e.traceId}] \u2192 ${e.phase}`,{messageId:e.messageId,generationKey:e.generationKey,verdict:e.verdict,sourceEvent:e.sourceEvent,error:e.error})}_skipTransaction(e,r,s={}){return e.transition(jt.SKIPPED,{verdict:r,...s}),this._recordTransaction(e),Array.isArray(s?.tools)&&s.tools.length>0&&this._updateAutoRuntimeForSkip(s.tools,e,r,s),{success:!1,skipped:!0,reason:r,traceId:e.traceId,...s}}_enqueueSlot(e,r){let o=(this._slotQueues.get(e)||Promise.resolve()).catch(()=>{}).then(r).finally(()=>{this._slotQueues.get(e)===o&&this._slotQueues.delete(e)});return this._slotQueues.set(e,o),o}_registerActiveTransaction(e,r={}){e?.traceId&&this._activeTransactions.set(e.traceId,{traceId:e.traceId,generationKey:r.generationKey||e.generationKey||"",slotKey:r.slotKey||e.slotKey||"",sourceMessageId:r.sourceMessageId||e.sourceMessageId||"",sourceSwipeId:r.sourceSwipeId||e.sourceSwipeId||"",slotRevisionKey:r.slotRevisionKey||e.slotRevisionKey||"",assistantBaseFingerprint:r.assistantBaseFingerprint||"",assistantBaseText:r.assistantBaseText||"",controller:r.controller||null,cancelled:!1,cancelReason:""})}_unregisterActiveTransaction(e){e&&this._activeTransactions.delete(e)}_cancelActiveTransactions(e="manual_cancel",r={}){let s=ge(r.messageId),o=ge(r.slotKey),n=ge(r.traceId),a=0;for(let[i,l]of this._activeTransactions){let c=n&&i===n,d=s&&ge(l?.sourceMessageId)===s,u=o&&ge(l?.slotKey)===o;if(!(!c&&!d&&!u&&!(!n&&!s&&!o))){l.cancelled=!0,l.cancelReason=e;try{l?.controller?.abort?.()}catch{}a+=1}}return a}_shouldAbortAutoWriteback(e={}){let r=ge(e.traceId);if(r){let s=this._activeTransactions.get(r);if(!s||s.cancelled)return{aborted:!0,reason:"cancelled_before_host_commit"}}return!1}_updateAutoRuntimeForSkip(e,r,s,o={}){e.forEach(n=>{n?.id&&Br(n.id,{lastAutoRunAt:Date.now(),lastAutoStatus:"skipped",lastAutoMessageId:r?.sourceMessageId||r?.messageId||"",lastAutoSwipeId:r?.sourceSwipeId||r?.swipeId||"",lastAutoRevisionKey:r?.slotRevisionKey||o?.slotRevisionKey||"",lastAutoWritebackStatus:"",lastAutoRefreshConfirmed:!1,lastAutoSkipReason:s||""},{touchLastRunAt:!1,emitEvent:!1,emitRuntimeEvent:!0})})}_updateAutoRuntimeForResults(e,r,s,o=[]){e.forEach((n,a)=>{if(!n?.id)return;let i=o[a]||{},l=i?.meta?.writebackDetails||{},c=i?.meta?.aborted===!0||i?.meta?.stale===!0?"aborted":i?.success===!1?"failed":"success",d=i?.meta?.aborted===!0?i?.meta?.abortReason||(i?.meta?.stale===!0?"stale_base_changed":"cancelled_before_host_commit"):"";Br(n.id,{lastAutoRunAt:Date.now(),lastAutoStatus:c,lastAutoMessageId:r?.sourceMessageId||s?.sourceMessageId||s?.messageId||"",lastAutoSwipeId:r?.sourceSwipeId||s?.sourceSwipeId||s?.swipeId||"",lastAutoRevisionKey:r?.slotRevisionKey||s?.slotRevisionKey||"",lastAutoWritebackStatus:i?.meta?.writebackStatus||"",lastAutoRefreshConfirmed:!!l.refreshConfirmed,lastAutoSkipReason:d},{touchLastRunAt:!1,emitEvent:!1,emitRuntimeEvent:!0})})}_resetForChatChange(){let e=Xr(),r=Cm(e);We.info("\u804A\u5929\u5207\u6362",{from:this._currentChatId,to:r}),this._currentChatId=r,this._pendingTimers.forEach(s=>clearTimeout(s)),this._pendingTimers.clear(),this._slotQueues.clear(),this._recentlyProcessedSlots.clear(),this._ownWriteMessageIds.clear(),this._cancelActiveTransactions("chat_changed"),this._activeTransactions.clear(),this._isProcessing=!1,this._messageReceivedThrottleUntil=0,this._seedKnownSlots()}_clearMessageState(e){if(e){for(let[r,s]of this._pendingTimers)(r.includes(`::${e}::`)||r.startsWith(`msg::${e}::`))&&(clearTimeout(s),this._pendingTimers.delete(r));for(let r of this._recentlyProcessedSlots.keys())r.startsWith(`${e}::`)&&this._recentlyProcessedSlots.delete(r);this._ownWriteMessageIds.delete(ge(e)),this._seedKnownSlots()}}_getAutomationSettings(){let e=zt.getSettings()?.automation||{},r=Number.isFinite(e.settleMs)?e.settleMs:WS;return{settleMs:r,dedupeWindowMs:Number.isFinite(e.dedupeWindowMs)?e.dedupeWindowMs:Math.max(5e3,r+600)}}_getSettleMs(){return this._getAutomationSettings().settleMs}_getDedupeWindowMs(){return this._getAutomationSettings().dedupeWindowMs}},Pm=new ui,YS=Pm});var Bm={};se(Bm,{BUILTIN_REGEX_PRESETS:()=>yi,BUILTIN_WORLDBOOK_PRESETS:()=>ud,MIGRATION_BACKUP_KEY:()=>Lm,MIGRATION_DONE_KEY:()=>pi,default:()=>JS,ensurePresetSystem:()=>Om,registerBuiltinPresets:()=>pd,runMigrationOnce:()=>yd});function GS(t){if(!Array.isArray(t)||t.length===0)return null;let e=t.map(r=>String(r||"").trim()).filter(Boolean).sort().join("|");if(!e)return null;for(let r of yi)if(r.rules.filter(o=>o.type==="include"&&o.enabled!==!1).map(o=>o.value).sort().join("|")===e)return r.id;return null}function pd(){try{typeof ml=="function"&&ml(yi),typeof Hi=="function"&&Hi(ud),ts.info("\u5185\u7F6E\u9884\u8BBE\u5DF2\u6CE8\u518C",{regex:yi.length,worldbook:ud.length})}catch(t){ts.error("\u6CE8\u518C\u5185\u7F6E\u9884\u8BBE\u5931\u8D25",{error:t})}}function qS(t){let e=new Set,r=[];for(let s of Array.isArray(t)?t:[]){let o=String(s||"").trim();if(!(!o||e.has(o)))if(e.add(o),o.startsWith("regex:")){let n=o.slice(6).trim();n&&r.push({type:"regex_include",value:n,enabled:!0,name:"",description:""})}else r.push({type:"include",value:o,enabled:!0,name:"",description:""})}return r}function VS(t,e,r){let s=JSON.parse(JSON.stringify(r||{})),o=!1,n=s.extraction||{};if(!n.regexPresetId){let i=Array.isArray(n.selectors)?n.selectors:[];if(i.length>0){let l=GS(i);if(l)n.regexPresetId=l,o=!0,ts.info(`\u5DE5\u5177 ${t} \u7ED1\u5B9A\u5185\u7F6E\u6B63\u5219\u9884\u8BBE: ${l}`);else{let c=da({name:`${e||t}_\u8FC1\u79FB_\u6B63\u5219`,description:`\u81EA\u8001\u7248\u672C selectors \u81EA\u52A8\u8FC1\u79FB\uFF08${i.length} \u9879\uFF09`,rules:qS(i),blacklist:[]});c?.id&&(n.regexPresetId=c.id,o=!0,ts.info(`\u5DE5\u5177 ${t} \u521B\u5EFA\u8FC1\u79FB\u6B63\u5219\u9884\u8BBE: ${c.id}`))}s.extraction=n}}let a=s.worldbooks||{};if(!a.presetId&&a.enabled===!0&&Array.isArray(a.selected)&&a.selected.length>0){let i=Jn({name:`${e||t}_\u8FC1\u79FB_\u4E16\u754C\u4E66`,description:`\u81EA\u8001\u7248\u672C worldbooks.selected \u81EA\u52A8\u8FC1\u79FB\uFF08${a.selected.length} \u672C\uFF09`,bindingMode:"custom",includeDisabled:!1,bookList:a.selected.map(l=>({bookName:String(l||""),enabled:!0,entryOverrides:{}})).filter(l=>l.bookName)});i?.id&&(a.presetId=i.id,o=!0,ts.info(`\u5DE5\u5177 ${t} \u521B\u5EFA\u8FC1\u79FB\u4E16\u754C\u4E66\u9884\u8BBE: ${i.id}`)),s.worldbooks=a}return o?s:null}function yd(){try{if(Ie.get(pi)===!0)return{skipped:!0,reason:"already_done"};let t=D.get(Dm)||{};if(!t||typeof t!="object")return ts.info("\u65E0\u5DE5\u5177\u914D\u7F6E\u9700\u8981\u8FC1\u79FB"),Ie.set(pi,!0),{skipped:!0,reason:"no_configs"};Ie.set(Lm,{ts:Date.now(),version:"v45",snapshot:t});let e=0,r={...t};for(let[s,o]of Object.entries(t)){if(!o||typeof o!="object")continue;let n=VS(s,o.name,o);n&&(r[s]=n,e+=1)}return e>0&&D.set(Dm,r),Ie.set(pi,!0),ts.info("\u8FC1\u79FB\u5B8C\u6210",{migratedCount:e,total:Object.keys(t).length}),{skipped:!1,migratedCount:e,total:Object.keys(t).length}}catch(t){return ts.error("\u8FC1\u79FB\u5931\u8D25\uFF0C\u5DF2 abort\uFF0C\u8001\u5B57\u6BB5\u4FDD\u7559",{error:t}),{skipped:!1,error:t?.message||String(t),aborted:!0}}}function Om(){return pd(),yd()}var ts,pi,Lm,Dm,yi,ud,JS,zm=N(()=>{Ke();H();Kr();Ys();ts=R.createScope("PresetBootstrap"),pi="migration_v45_done",Lm="migration_v45_backup",Dm="tool_configs",yi=[{id:"builtin_regex_summary",name:"\u5185\u7F6E \xB7 \u603B\u7ED3\u63D0\u53D6",description:"\u63D0\u53D6 <boo_FM> \u6807\u7B7E\u5185\u5BB9\uFF08\u5BF9\u5E94\u5185\u7F6E\u300C\u8BB0\u5FC6\u538B\u7F29\u300D\u5DE5\u5177\uFF09",rules:[{id:"r_builtin_summary_1",type:"include",value:"boo_FM",enabled:!0,name:"\u603B\u7ED3\u6807\u7B7E",description:""}],blacklist:[]},{id:"builtin_regex_status_block",name:"\u5185\u7F6E \xB7 \u72B6\u6001\u680F\u63D0\u53D6",description:"\u63D0\u53D6 <status_block> \u6807\u7B7E\u5185\u5BB9\uFF08\u5BF9\u5E94\u5185\u7F6E\u300C\u72B6\u6001\u680F\u300D\u5DE5\u5177\uFF09",rules:[{id:"r_builtin_status_1",type:"include",value:"status_block",enabled:!0,name:"\u72B6\u6001\u6807\u7B7E",description:""}],blacklist:[]},{id:"builtin_regex_youyou",name:"\u5185\u7F6E \xB7 \u4F18\u4F18\u9510\u8BC4\u63D0\u53D6",description:"\u63D0\u53D6 <youyou> \u6807\u7B7E\u5185\u5BB9\uFF08\u5BF9\u5E94\u5185\u7F6E\u300C\u4F18\u4F18\u9510\u8BC4\u300D\u5DE5\u5177\uFF09",rules:[{id:"r_builtin_youyou_1",type:"include",value:"youyou",enabled:!0,name:"\u4F18\u4F18\u6807\u7B7E",description:""}],blacklist:[]}],ud=[];JS={registerBuiltinPresets:pd,runMigrationOnce:yd,ensurePresetSystem:Om}});var gd={};se(gd,{confirmDeleteTool:()=>r0,confirmResetTools:()=>n0,getAllTools:()=>Qt,getTool:()=>Zt,showExportToolsDialog:()=>s0,showImportToolsDialog:()=>o0,showToolEditDialog:()=>t0});async function t0(t=null){let e=t?Zt(t):null,r=!!e,s=et({value:e?.name||"",placeholder:"\u5DE5\u5177\u540D\u79F0"}),o=Qe({value:e?.category||"utility",options:e0}),n=et({value:e?.description||"",placeholder:"\u5DE5\u5177\u63CF\u8FF0"}),a=m("input",{className:"yyt-input",attrs:{type:"number",min:"1000"},style:{padding:"7px 10px",fontSize:"12px"}});a.value=String(e?.config?.execution?.timeout||6e4);let i=m("input",{className:"yyt-input",attrs:{type:"number",min:"0",max:"10"},style:{padding:"7px 10px",fontSize:"12px"}});i.value=String(e?.config?.execution?.retries??3);function l(p,f,g=""){let h=m("div",{className:"yyt-form-group",style:{margin:"0 0 12px 0"}});return h.appendChild(m("label",{text:p,style:{fontSize:"12px",fontWeight:"600",color:"var(--yyt-text-secondary, rgba(255,255,255,0.55))",display:"block",marginBottom:"4px"}})),h.appendChild(f),g&&h.appendChild(m("div",{text:g,style:{fontSize:"11px",color:"var(--yyt-text-muted)",marginTop:"4px"}})),h}let c=m("div",{style:{display:"flex",flexDirection:"column"}}),d=m("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px"}});d.appendChild(l("\u5DE5\u5177\u540D\u79F0",s.el)),d.appendChild(l("\u5206\u7C7B",o.el)),c.appendChild(d),c.appendChild(l("\u63CF\u8FF0",n.el));let u=m("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px"}});u.appendChild(l("\u8D85\u65F6\u65F6\u95F4 (ms)",a)),u.appendChild(l("\u91CD\u8BD5\u6B21\u6570",i)),c.appendChild(u);let y=Me.custom({title:r?`\u7F16\u8F91\u5DE5\u5177\u300C${e.name}\u300D`:"\u65B0\u5EFA\u5DE5\u5177",width:"480px",body:c,buttons:[{label:"\u53D6\u6D88",variant:"ghost",onClick:p=>p(null)},{label:r?"\u4FDD\u5B58":"\u521B\u5EFA",variant:"primary",onClick:p=>{let f=String(s.get()||"").trim();if(!f){s.el.focus();return}let g=t||`tool_${Date.now()}`;if(!Xs(g,{name:f,category:o.get(),description:String(n.get()||"").trim(),promptTemplate:e?.promptTemplate||"",extractTags:Array.isArray(e?.extractTags)?e.extractTags:[],config:{execution:{timeout:Math.max(1e3,parseInt(a.value,10)||6e4),retries:Math.max(0,parseInt(i.value,10)||3)},api:e?.config?.api||{preset:"",useBypass:!1,bypassPreset:""},messages:Array.isArray(e?.config?.messages)?e.config.messages:[],context:{depth:e?.config?.context?.depth||3,includeTags:Array.isArray(e?.config?.context?.includeTags)?e.config.context.includeTags:[],excludeTags:Array.isArray(e?.config?.context?.excludeTags)?e.config.context.excludeTags:[]},worldbooks:{enabled:e?.config?.worldbooks?.enabled===!0,selected:Array.isArray(e?.config?.worldbooks?.selected)?e.config.worldbooks.selected:[]}},enabled:e?.enabled!==!1})){fd.warn("saveTool \u5931\u8D25",{id:g});return}try{so(g)}catch(x){fd.warn("ensureToolRuntimeConfig \u5F02\u5E38",{err:x})}p(g)}}]});return setTimeout(()=>s.el.focus(),0),y.result}async function r0(t){let e=Zt(t);return!e||!await Me.confirm({title:"\u5220\u9664\u5DE5\u5177",message:`\u786E\u5B9A\u5220\u9664\u5DE5\u5177\u300C${e.name}\u300D\uFF1F\u6B64\u64CD\u4F5C\u4E0D\u53EF\u64A4\u9500\u3002`,confirmText:"\u5220\u9664",danger:!0})?!1:Qs(t)}function s0(){let t;try{t=Zs()}catch(r){Me.confirm({title:"\u5BFC\u51FA\u5931\u8D25",message:String(r?.message||r),confirmText:"\u786E\u5B9A"});return}let e=m("textarea",{className:"yyt-textarea",style:{width:"100%",minHeight:"220px",fontSize:"12px",fontFamily:"monospace"}});e.value=t,e.readOnly=!0,Me.custom({title:"\u5BFC\u51FA\u5DE5\u5177 JSON",width:"600px",body:e,buttons:[{label:"\u5173\u95ED",variant:"ghost",onClick:r=>r(null)},{label:"\u590D\u5236\u5230\u526A\u8D34\u677F",variant:"ghost",onClick:async()=>{try{await navigator.clipboard.writeText(t)}catch{e.select();try{document.execCommand("copy")}catch{}}}},{label:"\u4E0B\u8F7D JSON",variant:"primary",onClick:()=>{try{let r=new Blob([t],{type:"application/json"}),s=URL.createObjectURL(r),o=m("a",{attrs:{href:s,download:`youyou_tools_${Date.now()}.json`}});document.body.appendChild(o),o.click(),setTimeout(()=>{try{document.body.removeChild(o)}catch{}try{URL.revokeObjectURL(s)}catch{}},100)}catch(r){fd.warn("\u4E0B\u8F7D\u5931\u8D25",{err:r})}}}]})}async function o0(){let t=m("textarea",{className:"yyt-textarea",attrs:{placeholder:"\u7C98\u8D34 YouYou Toolkit \u5DE5\u5177 JSON"},style:{width:"100%",minHeight:"200px",fontSize:"12px",fontFamily:"monospace"}}),e=m("label",{style:{display:"flex",alignItems:"center",gap:"6px",fontSize:"12px",color:"var(--yyt-text-secondary)",marginTop:"8px"}}),r=m("input",{attrs:{type:"checkbox"}});e.appendChild(r),e.appendChild(m("span",{text:"\u8986\u76D6\u6A21\u5F0F\uFF08\u6E05\u7A7A\u5DF2\u6709\u5DE5\u5177\u540E\u518D\u5BFC\u5165\uFF1B\u4E0D\u52FE\u9009\u5219\u5408\u5E76\uFF09"}));let s=m("div");s.appendChild(t),s.appendChild(e),s.appendChild(m("div",{style:{display:"flex",gap:"6px",marginTop:"8px"}},fe({label:"\u{1F4C1} \u4ECE\u6587\u4EF6\u2026",size:"small",variant:"ghost",onClick:()=>{let n=m("input",{attrs:{type:"file",accept:"application/json,.json"}});n.addEventListener("change",()=>{let a=n.files?.[0];if(!a)return;let i=new FileReader;i.onload=()=>{t.value=String(i.result||""),t.focus()},i.readAsText(a)}),n.click()}}).el));let o=Me.custom({title:"\u5BFC\u5165\u5DE5\u5177 JSON",width:"520px",body:s,buttons:[{label:"\u53D6\u6D88",variant:"ghost",onClick:n=>n(null)},{label:"\u5BFC\u5165",variant:"primary",onClick:async n=>{let a=t.value.trim();if(!a){n(null);return}try{let i=eo(a,{overwrite:r.checked});n(i)}catch(i){await Me.confirm({title:"\u5BFC\u5165\u5931\u8D25",message:String(i?.message||i),confirmText:"\u786E\u5B9A"})}}}]});return setTimeout(()=>t.focus(),0),o.result}async function n0(){return await Me.confirm({title:"\u91CD\u7F6E\u6240\u6709\u5DE5\u5177",message:"\u6B64\u64CD\u4F5C\u4F1A\u5220\u9664\u6240\u6709\u81EA\u5B9A\u4E49\u5DE5\u5177\u4E0E\u9884\u8BBE\uFF0C\u4E0D\u53EF\u64A4\u9500\u3002\u5185\u7F6E\u5DE5\u5177\u4E0D\u53D7\u5F71\u54CD\u3002",confirmText:"\u91CD\u7F6E",danger:!0})?(to(),!0):!1}var fd,e0,md=N(()=>{Gn();fr();Vo();tr();H();fd=R.createScope("ToolActions"),e0=[{value:"api",label:"API"},{value:"prompt",label:"Prompt"},{value:"utility",label:"Utility"}]});H();function Km(t,e={}){let{constants:r,topLevelWindow:s,modules:o}=t,{SCRIPT_ID:n,SCRIPT_VERSION:a,MENU_ITEM_ID:i,MENU_CONTAINER_ID:l}=r,c=null,d=!1,u=R.createScope("Bootstrap");function y(...C){u.log(C.join(" "))}function p(...C){u.error(C.join(" "))}async function f(){return c||(c=(async()=>{try{o.storageModule=await Promise.resolve().then(()=>(Ke(),wd)),o.apiConnectionModule=await Promise.resolve().then(()=>(Bn(),Ed)),o.presetManagerModule=await Promise.resolve().then(()=>(Bo(),Id)),o.uiModule=await Promise.resolve().then(()=>(km(),Am)),o.regexExtractorModule=await Promise.resolve().then(()=>(Js(),ol)),o.toolManagerModule=await Promise.resolve().then(()=>(Vo(),tp)),o.toolExecutorModule=await Promise.resolve().then(()=>(cc(),lc)),o.windowManagerModule=await Promise.resolve().then(()=>(zc(),Zg)),o.toolRegistryModule=await Promise.resolve().then(()=>(tr(),pl)),o.settingsServiceModule=await Promise.resolve().then(()=>(gn(),Xy)),o.bypassManagerModule=await Promise.resolve().then(()=>(To(),Jy)),o.variableResolverModule=await Promise.resolve().then(()=>(Ba(),sf)),o.contextInjectorModule=await Promise.resolve().then(()=>(Ms(),tf)),o.toolPromptServiceModule=await Promise.resolve().then(()=>(Ka(),nf)),o.toolOutputServiceModule=await Promise.resolve().then(()=>(mn(),lf)),o.toolAutomationServiceModule=await Promise.resolve().then(()=>($m(),Nm)),o.toolDataProviderModule=await Promise.resolve().then(()=>(fo(),oy)),o.presetBootstrapModule=await Promise.resolve().then(()=>(zm(),Bm));try{o.toolDataProviderModule.getToolDataProvider({extensionVersion:a}).then(C=>{u.log(`Provider \u5C31\u7EEA: ${C.kind}`)}).catch(C=>{u.error(`Provider \u521D\u59CB\u5316\u5F02\u5E38: ${C?.message||C}`)})}catch(C){u.error(`Provider \u542F\u52A8\u5F02\u5E38: ${C?.message||C}`)}return o.toolOutputServiceModule?.toolOutputService&&o.apiConnectionModule&&o.toolOutputServiceModule.toolOutputService.setApiConnection(o.apiConnectionModule),!0}catch(C){return c=null,p("\u6A21\u5757\u52A0\u8F7D\u5931\u8D25\uFF0C\u4F7F\u7528\u5185\u7F6E\u529F\u80FD:",C),p("\u5DF2\u52A0\u8F7D\u6A21\u5757:",Object.keys(o).filter(_=>o[_])),!1}})(),c)}function g(){return`
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
    `}async function h(){let C=`${n}-styles`,_=s.document||document;if(_.getElementById(C))return;let k="",W=[];try{W.push(new URL("../styles/main.css",import.meta.url).href)}catch{}try{W.push(new URL("../../styles/main.css",import.meta.url).href)}catch{}W.push("./styles/main.css");for(let M of[...new Set(W.filter(Boolean))])try{let S=await fetch(M);if(S.ok){k=await S.text();break}}catch{}k||(y("\u65E0\u6CD5\u52A0\u8F7D\u5916\u90E8\u6837\u5F0F\u6587\u4EF6\uFF0C\u4F7F\u7528\u5185\u7F6E\u6837\u5F0F"),k=g());let q=_.createElement("style");q.id=C,q.textContent=k,(_.head||_.documentElement).appendChild(q),y("\u6837\u5F0F\u5DF2\u6CE8\u5165")}function x(){let C=s.document||document;if(o.uiModule?.getAllStyles){let _=`${n}-ui-styles`;if(!C.getElementById(_)){let k=C.createElement("style");k.id=_,k.textContent=o.uiModule.getAllStyles(),(C.head||C.documentElement).appendChild(k)}}}async function T(){try{let{applyUiPreferences:C}=await Promise.resolve().then(()=>(hc(),mc));if(o.settingsServiceModule?.settingsService){let _=o.settingsServiceModule.settingsService.getUiSettings();if(_&&_.theme){let k=s.document||document;C(_,k),y(`\u4E3B\u9898\u5DF2\u5E94\u7528: ${_.theme}`)}}}catch(C){y("\u4E3B\u9898\u52A0\u8F7D\u5931\u8D25:",C)}}function v(){let C=s.jQuery||window.jQuery;if(!C){p("jQuery \u672A\u627E\u5230\uFF0C\u5EF6\u8FDF\u91CD\u8BD5..."),setTimeout(v,1e3);return}let _=s.document||document,k=C("#extensionsMenu",_);if(!k.length){y("\u9B54\u68D2\u83DC\u5355\u672A\u627E\u5230\uFF0C\u5EF6\u8FDF\u91CD\u8BD5..."),setTimeout(v,2e3);return}if(C(`#${l}`,k).length>0){y("\u83DC\u5355\u9879\u5DF2\u5B58\u5728");return}let q=C(`<div class="extension_container interactable" id="${l}" tabindex="0"></div>`),M=`
      <div class="list-group-item flex-container flexGap5 interactable" id="${i}" title="\u6253\u5F00 YouYou \u5DE5\u5177\u7BB1">
        <div class="fa-fw fa-solid fa-wand-magic-sparkles extensionsMenuExtensionButton"></div>
        <span>YouYou \u5DE5\u5177\u7BB1</span>
      </div>
    `,S=C(M);S.on("click",function(j){j.stopPropagation(),y("\u83DC\u5355\u9879\u88AB\u70B9\u51FB");let Q=C("#extensionsMenuButton",_);Q.length&&k.is(":visible")&&Q.trigger("click"),typeof e.openPopup=="function"&&e.openPopup()}),q.append(S),k.append(q),y("\u83DC\u5355\u9879\u5DF2\u6DFB\u52A0\u5230\u9B54\u68D2\u533A")}async function L(){y(`\u521D\u59CB\u5316\u5F00\u59CB... \u7248\u672C: ${a}`),await h();let C=await f();if(y(C?"\u6240\u6709\u6A21\u5757\u52A0\u8F7D\u6210\u529F":"\u90E8\u5206\u6A21\u5757\u52A0\u8F7D\u5931\u8D25\uFF0C\u4F7F\u7528\u53EF\u7528\u529F\u80FD"),!d&&o.uiModule?.initUI)try{await o.uiModule.initUI({services:o,autoInjectStyles:!1,targetDocument:s.document||document}),d=!0,y("UI \u88C5\u914D\u4E2D\u5FC3\u5DF2\u521D\u59CB\u5316")}catch(k){p("UI \u6A21\u5757\u521D\u59CB\u5316\u5931\u8D25:",k)}if(o.uiModule&&(x(),await T()),o.presetBootstrapModule?.ensurePresetSystem)try{let k=o.presetBootstrapModule.ensurePresetSystem();k?.aborted?y(`\u9884\u8BBE\u7CFB\u7EDF\u8FC1\u79FB\u5931\u8D25\u5DF2 abort\uFF0C\u8001\u5B57\u6BB5\u4FDD\u7559: ${k.error}`):k?.skipped?y(`\u9884\u8BBE\u7CFB\u7EDF\u5DF2\u5C31\u7EEA\uFF08${k.reason}\uFF09`):y(`\u9884\u8BBE\u7CFB\u7EDF\u8FC1\u79FB\u5B8C\u6210\uFF08${k.migratedCount}/${k.total} \u5DE5\u5177\uFF09`)}catch(k){p("\u9884\u8BBE\u7CFB\u7EDF\u521D\u59CB\u5316\u5F02\u5E38:",k)}if(o.toolAutomationServiceModule?.toolAutomationService){let k=o.toolAutomationServiceModule.toolAutomationService.init();y(k?"\u81EA\u52A8\u5316\u751F\u547D\u5468\u671F\u670D\u52A1\u5DF2\u521D\u59CB\u5316":"\u81EA\u52A8\u5316\u751F\u547D\u5468\u671F\u670D\u52A1\u521D\u59CB\u5316\u672A\u5B8C\u6210\uFF0C\u7B49\u5F85\u5BBF\u4E3B\u4E8B\u4EF6\u6E90\u91CD\u8BD5")}let _=s.document||document;_.readyState==="loading"?_.addEventListener("DOMContentLoaded",()=>{setTimeout(v,1e3)}):setTimeout(v,1e3),y("\u521D\u59CB\u5316\u5B8C\u6210")}return{loadModules:f,injectStyles:h,addMenuItem:v,init:L,log:y,logError:p}}Je();Xe();Xe();H();var Io=R.createScope("PromptEditor"),XS="youyou_toolkit_prompt_editor",QS={system:"System Prompt (\u7CFB\u7EDF\u63D0\u793A\u8BCD)",ai:"AI Prompt (AI\u6307\u4EE4\u63D0\u793A\u8BCD)",user:"User Prompt (\u7528\u6237\u63D0\u793A\u8BCD)"},ZS={system:"fa-server",ai:"fa-robot",user:"fa-user"},Nn=[{id:"system_1",type:"system",role:"SYSTEM",mainSlot:"",content:"",deletable:!1,expanded:!0},{id:"ai_1",type:"ai",role:"USER",mainSlot:"A",content:"",deletable:!1,expanded:!0,isMain:!0},{id:"user_1",type:"user",role:"USER",mainSlot:"B",content:"",deletable:!1,expanded:!0,isMain2:!0}],fi=class{constructor(e={}){this.containerId=e.containerId||XS,this.segments=e.segments||[...Nn],this.onChange=e.onChange||null,this.editable=e.editable!==!1,this.showMainSlot=e.showMainSlot!==!1,this.$container=null,this.$=null}init(e){if(this.$=window.jQuery||window.parent?.jQuery,!this.$){Io.error("jQuery not available");return}this.$container=e,this.render(),this.bindEvents()}setSegments(e){this.segments=e&&Array.isArray(e)?[...e]:[...Nn],this.$container&&(this.render(),this.bindEvents())}getSegments(){return this.segments.map(e=>({...e,content:this.getSegmentContent(e.id)}))}getSegmentContent(e){return this.$container&&this.$container.find(`[data-segment-id="${e}"] .yyt-prompt-textarea`).val()||""}render(){if(!this.$container)return;let e=`
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
    `;this.$container.html(e)}renderSegment(e){let r=QS[e.type]||e.type,s=ZS[e.type]||"fa-file",o=e.mainSlot==="A"||e.isMain,n=e.mainSlot==="B"||e.isMain2,a=o?"var(--yyt-accent, #7bb7ff)":n?"#ffb74d":"",i=this.showMainSlot&&e.mainSlot?`<span class="yyt-prompt-slot-badge">mainSlot: ${e.mainSlot}</span>`:"",l=`<span class="yyt-prompt-role-badge">role: ${e.role||"USER"}</span>`;return`
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
    `}bindEvents(){this.$container&&(dt(this.$container,"yytPromptEditorSelect"),this.$container.off(".yytPromptEditor"),this.$container.on("click.yytPromptEditor",".yyt-prompt-toggle",e=>{this.$(e.currentTarget).closest(".yyt-prompt-segment").toggleClass("yyt-expanded"),this.$(e.currentTarget).find("i").toggleClass("fa-chevron-up fa-chevron-down")}),this.$container.on("click.yytPromptEditor",".yyt-prompt-delete",e=>{let r=this.$(e.currentTarget).closest(".yyt-prompt-segment").data("segment-id");this.deleteSegment(r)}),this.$container.on("change.yytPromptEditor",".yyt-prompt-role",e=>{let r=this.$(e.currentTarget).closest(".yyt-prompt-segment").data("segment-id"),s=this.$(e.currentTarget).val();this.updateSegmentMeta(r,{role:s})}),this.$container.on("change.yytPromptEditor",".yyt-prompt-main-slot",e=>{let r=this.$(e.currentTarget).closest(".yyt-prompt-segment").data("segment-id"),s=this.$(e.currentTarget).val();this.updateSegmentMeta(r,{mainSlot:s})}),this.$container.on("input.yytPromptEditor",".yyt-prompt-textarea",e=>{this.onChange&&this.onChange(this.getSegments())}),this.$container.on("click.yytPromptEditor",`#${this.containerId}-add-segment`,()=>{this.addSegment()}),this.$container.on("click.yytPromptEditor",`#${this.containerId}-import-prompt`,()=>{this.importPrompt()}),this.$container.on("click.yytPromptEditor",`#${this.containerId}-export-prompt`,()=>{this.exportPrompt()}),Dt(this.$container,{namespace:"yytPromptEditorSelect",selectors:[".yyt-prompt-role",".yyt-prompt-main-slot"]}))}addSegment(e=null){let r=`segment_${Date.now()}`,s=e||{id:r,type:"user",role:"USER",mainSlot:"",content:"",deletable:!0,expanded:!0};s.id||(s.id=r),this.segments.push(s),this.render(),this.bindEvents(),this.onChange&&this.onChange(this.getSegments())}deleteSegment(e){let r=this.segments.findIndex(o=>o.id===e);if(r===-1)return;if(this.segments[r].deletable===!1){Io.warn("\u8BE5\u6BB5\u843D\u4E0D\u53EF\u5220\u9664");return}this.segments.splice(r,1),this.render(),this.bindEvents(),this.onChange&&this.onChange(this.getSegments())}updateSegmentMeta(e,r){let s=this.segments.find(o=>o.id===e);s&&(Object.assign(s,r),this.onChange&&this.onChange(this.getSegments()))}importPrompt(){let e=document.createElement("input");e.type="file",e.accept=".json",e.onchange=r=>{let s=r.target.files[0];if(!s)return;let o=new FileReader;o.onload=n=>{try{let a=JSON.parse(n.target.result);Array.isArray(a)?(this.setSegments(a),Io.log("\u63D0\u793A\u8BCD\u5BFC\u5165\u6210\u529F")):Io.error("\u65E0\u6548\u7684\u63D0\u793A\u8BCD\u683C\u5F0F")}catch(a){Io.error("\u5BFC\u5165\u5931\u8D25:",a)}},o.readAsText(s)},e.click()}exportPrompt(){let e=this.getSegments(),r=JSON.stringify(e,null,2),s=new Blob([r],{type:"application/json"}),o=URL.createObjectURL(s),n=document.createElement("a");n.href=o,n.download=`prompt_group_${Date.now()}.json`,n.click(),URL.revokeObjectURL(o),Io.log("\u63D0\u793A\u8BCD\u5DF2\u5BFC\u51FA")}destroy(){this.$container&&(dt(this.$container,"yytPromptEditorSelect"),this.$container.off(".yytPromptEditor"))}escapeHtml(e){return typeof e!="string"?"":e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}};function Um(){return`
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
  `}function jm(t){return t.filter(e=>e.content&&e.content.trim()).map(e=>({role:e.role,content:e.content,deletable:e.deletable,mainSlot:e.mainSlot}))}function Fm(t){return Array.isArray(t)?t.map((e,r)=>({id:`segment_${r}_${Date.now()}`,type:e.role==="SYSTEM"?"system":e.role==="assistant"?"ai":"user",role:e.role,mainSlot:e.mainSlot||"",content:e.content||"",deletable:e.deletable!==!1,expanded:!0,isMain:e.mainSlot==="A"||e.isMain,isMain2:e.mainSlot==="B"||e.isMain2})):[...Nn]}H();function Wm(t){let{constants:e,topLevelWindow:r,modules:s,caches:o,uiState:n}=t,{SCRIPT_ID:a,SCRIPT_VERSION:i,POPUP_ID:l}=e,c=R.createScope("PopupShell"),d={cleanup:null},u={cleanups:[]},y={cleanups:[]},p={current:null};function f(){return!!n.sidebarCollapsed}function g(){n.sidebarCollapsed=!n.sidebarCollapsed;let b=n.currentPopup;if(!b)return;let w=b.querySelector(".yyt-shell-sidebar"),I=b.querySelector(".yyt-shell-workspace"),P=b.querySelector(".yyt-sidebar-toggle i");w&&w.classList.toggle("yyt-collapsed",n.sidebarCollapsed),I&&I.classList.toggle("yyt-sidebar-collapsed",n.sidebarCollapsed),P&&(P.className=n.sidebarCollapsed?"fa-solid fa-angles-right":"fa-solid fa-angles-left"),He()}function h(...b){c.log(b.join(" "))}function x(...b){c.error(b.join(" "))}function T(b){return typeof b!="string"?"":b.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function v(){return r.jQuery||window.jQuery}function L(){return r.document||document}function C(b){if(!b)return"\u672A\u9009\u62E9\u9875\u9762";let w=s.toolRegistryModule?.getToolConfig(b);if(!w)return b;if(!w.hasSubTabs)return w.name||b;let I=k(b),P=w.subTabs?.find(O=>O.id===I);return P?.name?`${w.name} / ${P.name}`:w.name||b}function _(b){if(!b)return"\u8BF7\u9009\u62E9\u5DE6\u4FA7\u5BFC\u822A\u4E2D\u7684\u9875\u9762\u8FDB\u884C\u914D\u7F6E\u6216\u6392\u67E5\u3002";let w=s.toolRegistryModule?.getToolConfig(b);if(!w)return"\u5F53\u524D\u9875\u9762\u63CF\u8FF0\u6682\u4E0D\u53EF\u7528\u3002";if(!w.hasSubTabs)return w.description||"\u5728\u8FD9\u91CC\u7BA1\u7406\u5F53\u524D\u9875\u9762\u7684\u914D\u7F6E\u548C\u64CD\u4F5C\u3002";let I=k(b);return w.subTabs?.find(O=>O.id===I)?.description||w.description||"\u5728\u8FD9\u91CC\u7BA1\u7406\u5F53\u524D\u5DE5\u5177\u7684\u6A21\u677F\u3001\u914D\u7F6E\u4E0E\u8C03\u8BD5\u80FD\u529B\u3002"}function k(b,w=""){let I=s.toolRegistryModule?.getToolConfig(b);if(!I?.hasSubTabs||!Array.isArray(I.subTabs)||I.subTabs.length===0)return"";let P=String(w||n.currentSubTab[b]||"").trim(),z=P&&I.subTabs.some(te=>te?.id===P)?P:I.subTabs[0]?.id||"";return z&&n.currentSubTab[b]!==z&&(n.currentSubTab[b]=z),z}function W(){let b=n.currentPopup;if(!b)return;let w=C(n.currentMainTab),I=_(n.currentMainTab),P=b.querySelector(".yyt-popup-active-label");P&&(P.textContent=`\u5F53\u524D\uFF1A${w}`);let O=b.querySelector(".yyt-shell-breadcrumb");O&&(O.textContent=w);let z=b.querySelector(".yyt-shell-main-title");z&&(z.textContent=w);let te=b.querySelector(".yyt-shell-main-description");te&&(te.textContent=I)}function q(){typeof d.cleanup=="function"&&(d.cleanup(),d.cleanup=null)}function M(){Array.isArray(u.cleanups)&&(u.cleanups.forEach(b=>{typeof b=="function"&&b()}),u.cleanups=[])}function S(){Array.isArray(y.cleanups)&&(y.cleanups.forEach(b=>{typeof b=="function"&&b()}),y.cleanups=[])}function U(b,w){if(!b||!w)return!1;let I=b.jquery?b[0]:b,P=w.jquery?w[0]:w;return!!(I&&P&&I===P)}function j(b={}){let{container:w=null}=b,I=p.current;if(I&&!(w&&!U(I.container,w))){try{typeof I.destroy=="function"&&I.destroy(I.container)}catch(P){x("\u9500\u6BC1\u52A8\u6001\u9762\u677F host \u5931\u8D25",P)}s.uiModule?.uiManager?.destroyContainerInstance&&s.uiModule.uiManager.destroyContainerInstance(I.container),p.current=null}}function Q(b,w={}){p.current={key:w.key||"",container:b,destroy:typeof w.destroy=="function"?w.destroy:null}}function Ae(){let b=v();if(!b||!n.currentPopup)return;let w=s.toolRegistryModule?.getToolList()||[],I=b(n.currentPopup).find(".yyt-main-nav");if(!I.length)return;let P=w.map(z=>`
      <div class="yyt-main-nav-item ${z.id===n.currentMainTab?"active":""}" data-tab="${z.id}">
        <div class="yyt-main-nav-icon">
          <i class="fa-solid ${T(z.icon||"fa-file")}"></i>
        </div>
        <div class="yyt-main-nav-copy">
          <span class="yyt-main-nav-name">${T(z.name||z.id)}</span>
          <span class="yyt-main-nav-desc">${T(z.description||"\u8FDB\u5165\u6B64\u9875\u9762\u8FDB\u884C\u914D\u7F6E\u3001\u67E5\u770B\u6216\u7EF4\u62A4\u3002")}</span>
        </div>
      </div>
    `).join("");I.html(P),b(n.currentPopup).find(".yyt-main-nav-item").on("click",function(){let te=b(this).data("tab");te&&rs(te)});let O=b(n.currentPopup).find(".yyt-shell-sidebar-hint");O.length&&O.text(`${w.length} tabs`)}function ce(){let b=v();if(!b||!n.currentPopup)return;let w=s.toolRegistryModule?.getToolList()||[],I=s.toolRegistryModule?.getToolConfig("tools"),P=Array.isArray(I?.subTabs)?I.subTabs:[],O=P.filter(re=>re?.isCustom).length,z=P.filter(re=>!re?.isCustom).length,J=b(n.currentPopup).find(".yyt-shell-sidebar-stats");J.length&&(J.find(".yyt-shell-sidebar-stat").eq(0).find(".yyt-shell-sidebar-stat-value").text(String(w.length)),J.find(".yyt-shell-sidebar-stat").eq(1).find(".yyt-shell-sidebar-stat-value").text(String(z)),J.find(".yyt-shell-sidebar-stat").eq(2).find(".yyt-shell-sidebar-stat-value").text(String(O)))}function de(){let b=s.toolRegistryModule?.getToolList()||[];return b.length?(b.some(w=>w.id===n.currentMainTab)||(n.currentMainTab=b[0].id),n.currentMainTab):null}async function st(b={}){let{rebuildNavigation:w=!1,reRenderSubNav:I=!1}=b,P=v();if(!P||!n.currentPopup)return;j();let O=de();if(!O)return;w&&(Ae(),ce());let z=s.toolRegistryModule?.getToolConfig(O),te=!!z?.hasSubTabs,J=P(n.currentPopup).find(".yyt-sub-nav"),re=P(n.currentPopup).find(".yyt-content-inner");if(w&&re.length){let ke=new Set(re.find(".yyt-tab-content").map((me,ot)=>P(ot).data("tab")).get());(s.toolRegistryModule?.getToolList()||[]).forEach(me=>{ke.has(me.id)||re.append(`<div class="yyt-tab-content" data-tab="${T(me.id)}"></div>`)}),re.find(".yyt-tab-content").each((me,ot)=>{let $t=P(ot).data("tab");(s.toolRegistryModule?.getToolList()||[]).some(qt=>qt.id===$t)||P(ot).remove()})}P(n.currentPopup).find(".yyt-main-nav-item").removeClass("active"),P(n.currentPopup).find(`.yyt-main-nav-item[data-tab="${O}"]`).addClass("active"),P(n.currentPopup).find(".yyt-tab-content").removeClass("active"),P(n.currentPopup).find(`.yyt-tab-content[data-tab="${O}"]`).addClass("active"),te?(J.show(),(I||w)&&js(O,z.subTabs)):J.hide(),await ss(O),W(),He()}function dr(){if(!n.currentPopup)return;M();let b=()=>{if(n.currentMainTab==="presetManagement"){st();return}n.currentMainTab==="tools"&&st({reRenderSubNav:!0})},w=()=>{n.currentMainTab==="tools"?st({rebuildNavigation:!0,reRenderSubNav:!0}):ce()},I=()=>{n.currentMainTab==="tools"&&st({rebuildNavigation:!1,reRenderSubNav:!1})},P=()=>{(n.currentMainTab==="bypass"||n.currentMainTab==="tools")&&st({reRenderSubNav:n.currentMainTab==="tools"})};[B.PRESET_CREATED,B.PRESET_UPDATED,B.PRESET_DELETED].forEach(O=>{u.cleanups.push(K.on(O,b))}),[B.TOOL_REGISTERED,B.TOOL_UPDATED,B.TOOL_UNREGISTERED].forEach(O=>{u.cleanups.push(K.on(O,w))}),u.cleanups.push(K.on(B.TOOL_RUNTIME_UPDATED,I)),[B.BYPASS_PRESET_CREATED,B.BYPASS_PRESET_UPDATED,B.BYPASS_PRESET_DELETED].forEach(O=>{u.cleanups.push(K.on(O,P))})}function Y(b){return!!b?.closest?.(["input","textarea","select","button","a","label","summary","details",'[contenteditable="true"]',".yyt-dialog",".yyt-select-dropdown",".yyt-select-portal-layer"].join(","))}function pe(b){let w=b?.closest?.(["textarea",".yyt-preview-pre",".yyt-select-dropdown",".yyt-select-portal-layer",".yyt-dialog-body",".yyt-worldbook-list",".yyt-tool-panel",".yyt-panel-section"].join(","));return w?w.scrollHeight>w.clientHeight+2||w.scrollWidth>w.clientWidth+2:!1}function be(b,w){return w?.closest?.(".yyt-scrollable-surface")===b}function Nt(b,w){if(!b||!w)return null;let I=w.closest?.([".yyt-worldbook-list",".yyt-select-dropdown",".yyt-select-portal-layer",".yyt-dialog-body",".yyt-preview-pre",".yyt-tool-panel",".yyt-panel-section"].join(","));return I&&(I.classList?.contains("yyt-select-portal-layer")||b.contains(I))&&(I.scrollHeight>I.clientHeight+2||I.scrollWidth>I.clientWidth+2)?I:[w.closest?.(".yyt-tool-list"),w.closest?.(".yyt-settings-content"),w.closest?.(".yyt-sub-content"),w.closest?.(".yyt-tab-content.active"),b].filter(Boolean).find(O=>O!==b&&!b.contains(O)?!1:O.scrollHeight>O.clientHeight+2||O.scrollWidth>O.clientWidth+2)||b}function Ve({mainTab:b=null,includeSubContent:w=!1}={}){let I=n.currentPopup;if(!I)return;let P=I.querySelector(".yyt-content");P&&(P.scrollTop=0,P.scrollLeft=0);let O=b?`.yyt-tab-content[data-tab="${b}"]`:".yyt-tab-content.active",z=I.querySelector(O);if(z&&(z.scrollTop=0,z.scrollLeft=0),!w)return;(z?.querySelectorAll(".yyt-sub-content")||[]).forEach(J=>{J.scrollTop=0,J.scrollLeft=0})}function ur(b){let w=L();if(!b||!w)return;b.classList.add("yyt-scrollable-surface");let I=!1,P=!1,O=0,z=0,te=0,J=0,re=!1,ke=!1,me=()=>{I=!1,P=!1,b.classList.remove("yyt-scroll-dragging")},ot=V=>{V.button===0&&(Y(V.target)||be(b,V.target)&&(re=b.scrollWidth>b.clientWidth+2,ke=b.scrollHeight>b.clientHeight+2,!(!re&&!ke)&&(V.stopPropagation(),I=!0,P=!1,O=V.clientX,z=V.clientY,te=b.scrollLeft,J=b.scrollTop)))},$t=V=>{if(!I)return;let ct=V.clientX-O,Ze=V.clientY-z;!(Math.abs(ct)>4||Math.abs(Ze)>4)&&!P||(P=!0,b.classList.add("yyt-scroll-dragging"),re&&(b.scrollLeft=te-ct),ke&&(b.scrollTop=J-Ze),V.preventDefault())},qt=()=>{me()},Ir=V=>{if(V.ctrlKey||pe(V.target)||!b.classList.contains("yyt-content")&&!be(b,V.target))return;let Ze=Nt(b,V.target);!Ze||Ze!==b&&!b.contains(Ze)||!(Ze.scrollHeight>Ze.clientHeight+2||Ze.scrollWidth>Ze.clientWidth+2)||(Math.abs(V.deltaY)>0&&(Ze.scrollTop+=V.deltaY),Math.abs(V.deltaX)>0&&(Ze.scrollLeft+=V.deltaX),V.preventDefault(),V.stopPropagation())},nt=V=>{P&&V.preventDefault()};b.addEventListener("mousedown",ot),b.addEventListener("wheel",Ir,{passive:!1}),b.addEventListener("dragstart",nt),w.addEventListener("mousemove",$t),w.addEventListener("mouseup",qt),y.cleanups.push(()=>{me(),b.classList.remove("yyt-scrollable-surface"),b.removeEventListener("mousedown",ot),b.removeEventListener("wheel",Ir),b.removeEventListener("dragstart",nt),w.removeEventListener("mousemove",$t),w.removeEventListener("mouseup",qt)})}function He(){let b=n.currentPopup;if(!b)return;S();let w=[...b.querySelectorAll(".yyt-shell-sidebar .yyt-main-nav"),...b.querySelectorAll(".yyt-sub-nav"),...b.querySelectorAll(".yyt-content"),...b.querySelectorAll(".yyt-settings-content"),...b.querySelectorAll(".yyt-tool-list")];[...new Set(w)].forEach(ur)}function Ro(b){return`
      <div class="yyt-startup-screen" data-yyt-startup-screen>
        <div class="yyt-startup-screen-inner">
          <div class="yyt-startup-screen-kicker">Welcome</div>
          <div class="yyt-startup-screen-title">YouYou \u5DE5\u5177\u7BB1</div>
          <div class="yyt-startup-screen-desc">\u96C6\u4E2D\u7BA1\u7406 API \u9884\u8BBE\u3001\u81EA\u5B9A\u4E49\u5DE5\u5177\u3001\u63D0\u53D6\u89C4\u5219\u3001Ai\u6307\u4EE4\u9884\u8BBE\u4E0E\u8BCA\u65AD\u6D41\u7A0B\u3002\u6BCF\u6B21\u5237\u65B0\u540E\u90FD\u4F1A\u91CD\u65B0\u663E\u793A\uFF0C\u4FBF\u4E8E\u5FEB\u901F\u56DE\u5230\u4ECB\u7ECD\u5165\u53E3\u3002</div>
          <div class="yyt-startup-screen-modules">
            ${(b||[]).slice(0,6).map(I=>`
      <div class="yyt-startup-module-chip">
        <i class="fa-solid ${T(I.icon||"fa-file")}"></i>
        <span>${T(I.name||I.id)}</span>
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
    `}function Mo(b){let w=v();if(!w||!n.currentPopup||n.startupScreenDismissed)return;let I=w(n.currentPopup).find(".yyt-popup-body"),P=I.find(".yyt-popup-shell");!I.length||!P.length||I.find("[data-yyt-startup-screen]").length||(P.attr("data-yyt-startup-visible","true"),I.prepend(Ro(b)),I.find(".yyt-startup-enter").on("click",()=>{I.find("[data-yyt-startup-screen]").remove(),P.removeAttr("data-yyt-startup-visible"),n.startupScreenDismissed=!0,He()}))}function kr(){let b=L(),w=n.currentPopup,I=w?.querySelector(".yyt-popup-header");if(!w||!I||!b)return;let P=!1,O=0,z=0,te=0,J=0,re="",ke=()=>({width:r.innerWidth||b.documentElement?.clientWidth||window.innerWidth||0,height:r.innerHeight||b.documentElement?.clientHeight||window.innerHeight||0}),me=(nt,V,ct)=>Math.min(Math.max(nt,V),ct),ot=()=>{P&&(P=!1,w.classList.remove("yyt-popup-dragging"),b.body.style.userSelect=re)},$t=nt=>{if(!P||!n.currentPopup)return;let V=nt.clientX-O,ct=nt.clientY-z,{width:Ze,height:hi}=ke(),sh=w.offsetWidth||0,oh=w.offsetHeight||0,nh=Math.max(0,Ze-sh),ah=Math.max(0,hi-oh);w.style.left=`${me(te+V,0,nh)}px`,w.style.top=`${me(J+ct,0,ah)}px`,w.style.transform="none",w.style.right="auto",w.style.bottom="auto"},qt=()=>{ot()},Ir=nt=>{if(nt.button!==0||nt.target?.closest(".yyt-popup-close"))return;P=!0,O=nt.clientX,z=nt.clientY;let V=w.getBoundingClientRect();te=V.left,J=V.top,w.style.left=`${V.left}px`,w.style.top=`${V.top}px`,w.style.transform="none",w.style.right="auto",w.style.bottom="auto",w.classList.add("yyt-popup-dragging"),re=b.body.style.userSelect||"",b.body.style.userSelect="none",nt.preventDefault()};I.addEventListener("mousedown",Ir),b.addEventListener("mousemove",$t),b.addEventListener("mouseup",qt),d.cleanup=()=>{ot(),I.removeEventListener("mousedown",Ir),b.removeEventListener("mousemove",$t),b.removeEventListener("mouseup",qt)}}function Cr(){j(),q(),M(),S();let b=v();if(b&&n.currentPopup){let w=b(n.currentPopup);dt(w,"yytPopupToolConfigSelect"),dt(w,"yytPromptEditorSelect")}n.currentPopup&&(n.currentPopup.remove(),n.currentPopup=null),n.currentOverlay&&(n.currentOverlay.remove(),n.currentOverlay=null),h("\u5F39\u7A97\u5DF2\u5173\u95ED")}function rs(b){j(),n.currentMainTab=b;let w=v();if(!w||!n.currentPopup)return;Ve({mainTab:b,includeSubContent:!0}),w(n.currentPopup).find(".yyt-main-nav-item").removeClass("active"),w(n.currentPopup).find(`.yyt-main-nav-item[data-tab="${b}"]`).addClass("active");let I=s.toolRegistryModule?.getToolConfig(b);I?.hasSubTabs?(w(n.currentPopup).find(".yyt-sub-nav").show(),js(b,I.subTabs)):w(n.currentPopup).find(".yyt-sub-nav").hide(),w(n.currentPopup).find(".yyt-tab-content").removeClass("active"),w(n.currentPopup).find(`.yyt-tab-content[data-tab="${b}"]`).addClass("active"),ss(b),W(),He()}function Us(b,w){j(),n.currentSubTab[b]=w;let I=v();!I||!n.currentPopup||(Ve({mainTab:b,includeSubContent:!0}),I(n.currentPopup).find(".yyt-sub-nav-item").removeClass("active"),I(n.currentPopup).find(`.yyt-sub-nav-item[data-subtab="${w}"]`).addClass("active"),os(b,w),W(),He())}function js(b,w){let I=v();if(!I||!n.currentPopup||!w)return;let P=k(b,n.currentSubTab[b]||w[0]?.id),z=(b==="tools"?[{key:"ai",title:"AI \u5DE5\u5177",items:w.filter(J=>!J?.isCustom&&(J?.toolKind||"ai")!=="script")},{key:"script",title:"\u811A\u672C\u5DE5\u5177",items:w.filter(J=>!J?.isCustom&&J?.toolKind==="script")},{key:"custom",title:"\u81EA\u5B9A\u4E49\u5DE5\u5177",items:w.filter(J=>J?.isCustom===!0)}].filter(J=>J.items.length>0):[{key:"default",title:"",items:w}]).map(J=>{let re=J.title?`<div class="yyt-sub-nav-group-title">${T(J.title)}</div>`:"",ke=J.items.map(me=>{let ot=me?.isCustom===!0,$t=b==="tools"&&ot?`<div class="yyt-sub-nav-item-actions">
               <button type="button" class="yyt-sub-nav-item-action" data-action="edit" data-subtab="${me.id}" title="\u7F16\u8F91"><i class="fa-solid fa-pen"></i></button>
               <button type="button" class="yyt-sub-nav-item-action" data-action="delete" data-subtab="${me.id}" title="\u5220\u9664"><i class="fa-solid fa-trash"></i></button>
             </div>`:"";return`
        <div class="yyt-sub-nav-item ${me.id===P?"active":""}" data-subtab="${me.id}" data-tool-name="${T((me.name||me.id).toLowerCase())}">
          <i class="fa-solid ${me.icon||"fa-file"}"></i>
          <span class="yyt-sub-nav-item-label">${T(me.name||me.id)}</span>
          ${$t}
        </div>
      `}).join("");return`
        <div class="yyt-sub-nav-group yyt-sub-nav-group-${J.key}">
          ${re}
          <div class="yyt-sub-nav-group-items">
            ${ke}
          </div>
        </div>
      `}).join(""),te=b==="tools"?`<div class="yyt-sub-nav-toolbar">
           <button type="button" class="yyt-sub-nav-toolbar-btn" data-tool-action="add" title="\u65B0\u5EFA\u81EA\u5B9A\u4E49\u5DE5\u5177"><i class="fa-solid fa-plus"></i><span>\u65B0\u5EFA</span></button>
           <button type="button" class="yyt-sub-nav-toolbar-btn" data-tool-action="import" title="\u4ECE JSON \u5BFC\u5165\u5DE5\u5177"><i class="fa-solid fa-file-import"></i></button>
           <button type="button" class="yyt-sub-nav-toolbar-btn" data-tool-action="export" title="\u5BFC\u51FA\u5DE5\u5177 JSON"><i class="fa-solid fa-file-export"></i></button>
         </div>
         <div class="yyt-sub-nav-filter-wrap">
           <input type="text" class="yyt-sub-nav-filter" placeholder="\u7B5B\u9009\u5DE5\u5177\u2026" autocomplete="off">
         </div>`:"";I(n.currentPopup).find(".yyt-sub-nav").html(te+z),I(n.currentPopup).find(".yyt-sub-nav-item").on("click",function(re){if(re.target.closest&&re.target.closest(".yyt-sub-nav-item-action"))return;let ke=I(this).data("subtab");Us(b,ke)}),b==="tools"&&No(b),He()}function Po(b){if(!n.currentPopup)return;let w=v();if(!w)return;let I=String(b||"").trim().toLowerCase();w(n.currentPopup).find(".yyt-sub-nav-item").each(function(){let O=String(w(this).data("tool-name")||"");w(this).toggle(!I||O.includes(I))}),w(n.currentPopup).find(".yyt-sub-nav-group").each(function(){let O=w(this).find(".yyt-sub-nav-item:visible").length>0;w(this).toggle(O)})}function No(b){let w=v();if(!w||!n.currentPopup)return;let I=w(n.currentPopup).find(".yyt-sub-nav");I.find(".yyt-sub-nav-filter").off("input.yytFilter").on("input.yytFilter",function(){Po(this.value)}),I.find(".yyt-sub-nav-toolbar-btn").off("click.yytToolAction").on("click.yytToolAction",async function(P){P.preventDefault(),P.stopPropagation();let O=w(this).data("tool-action");try{let z=await Promise.resolve().then(()=>(md(),gd));if(O==="add"){let te=await z.showToolEditDialog(null);te&&(n.currentSubTab[b]=te,Us(b,te))}else O==="import"?await z.showImportToolsDialog():O==="export"&&z.showExportToolsDialog()}catch(z){x("\u5DE5\u5177\u64CD\u4F5C\u5931\u8D25",z)}}),I.find(".yyt-sub-nav-item-action").off("click.yytItemAction").on("click.yytItemAction",async function(P){P.preventDefault(),P.stopPropagation();let O=w(this).data("action"),z=String(w(this).data("subtab")||"");if(z)try{let te=await Promise.resolve().then(()=>(md(),gd));O==="edit"?await te.showToolEditDialog(z):O==="delete"&&await te.confirmDeleteTool(z)&&n.currentSubTab[b]===z&&(n.currentSubTab[b]="")}catch(te){x("\u5DE5\u5177\u884C\u5185\u64CD\u4F5C\u5931\u8D25",te)}})}async function ss(b){let w=v();if(!w||!n.currentPopup)return;let I=w(n.currentPopup).find(`.yyt-tab-content[data-tab="${b}"]`);if(!I.length)return;if(s.toolRegistryModule?.getToolConfig(b)?.hasSubTabs){let z=k(b);z?await os(b,z):I.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5B50 tab \u914D\u7F6E\u52A0\u8F7D\u5931\u8D25</span></div>'),He();return}await s.uiModule?.renderMainTab?.(b,I)||Gm(b,I),He()}async function os(b,w){let I=v();if(!I||!n.currentPopup)return;let P=I(n.currentPopup).find(`.yyt-tab-content[data-tab="${b}"]`);if(!P.length)return;let O=s.toolRegistryModule?.getToolConfig(b);if(O?.hasSubTabs){let te=k(b,w),J=O.subTabs?.find(ot=>ot.id===te),re=P.find(".yyt-sub-content");if(re.length||(P.html('<div class="yyt-sub-content"></div>'),re=P.find(".yyt-sub-content")),!J){re.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5F53\u524D\u5B50\u9875\u9762\u4E0D\u5B58\u5728\u6216\u5DF2\u5931\u6548</span></div>'),Ve({mainTab:b,includeSubContent:!0}),He();return}let ke=J.component;if(ke==="GenericToolConfigPanel"){await ns(J,re),Ve({mainTab:b,includeSubContent:!0}),He();return}j({container:re});let me=await s.uiModule?.renderSubTabComponent?.(ke,re);me?Q(re,{key:me}):re.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-tools"></i><span>\u529F\u80FD\u5F00\u53D1\u4E2D...</span></div>'),Ve({mainTab:b,includeSubContent:!0}),He();return}let z=P.find(".yyt-sub-content");if(z.length){switch(j({container:z}),w){case"config":qm(b,z);break;case"prompts":await Vm(b,z);break;case"presets":Jm(b,z);break;default:z.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-tools"></i><span>\u529F\u80FD\u5F00\u53D1\u4E2D...</span></div>')}Ve({mainTab:b,includeSubContent:!0}),He()}}async function ns(b,w){if(!(!v()||!w?.length||!b?.id)){j({container:w});try{let P=o.dynamicToolPanelCache.get(b.id);if(!P){let te=(await Promise.resolve().then(()=>(Ao(),mf)))?.createToolConfigPanel;if(typeof te!="function")throw new Error("\u901A\u7528\u5DE5\u5177\u9762\u677F\u5DE5\u5382\u4E0D\u53EF\u7528");P=()=>te({id:`${b.id}Panel`,toolId:b.id,postResponseHint:`\u70B9\u51FB\u201C\u7ACB\u5373\u6267\u884C\u4E00\u6B21\u201D\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u6267\u884C\u201C${b.name||b.id}\u201D\u3002`,extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 custom_tag
\u6216 regex:<custom_tag>([\\s\\S]*?)</custom_tag>`,previewDialogId:`${b.id}-extraction-preview`,previewTitle:`${b.name||b.id} \u63D0\u53D6\u9884\u89C8`}),o.dynamicToolPanelCache.set(b.id,P)}let O=P();O.renderTo(w),Q(w,{key:b.id,destroy:typeof O?.destroy=="function"?z=>O.destroy(z):null}),He()}catch(P){p.current=null,x("\u81EA\u5B9A\u4E49\u5DE5\u5177\u9762\u677F\u52A0\u8F7D\u5931\u8D25:",P),w.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u81EA\u5B9A\u4E49\u5DE5\u5177\u9762\u677F\u52A0\u8F7D\u5931\u8D25</span></div>')}}}function Gm(b,w){if(!v())return;let P=s.toolRegistryModule?.getToolConfig(b);if(!P){w.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5DE5\u5177\u914D\u7F6E\u4E0D\u5B58\u5728</span></div>');return}let O=n.currentSubTab[b]||P.subTabs?.[0]?.id||"config";w.html(`
      <div class="yyt-tool-window">
        <div class="yyt-sub-content" data-subtab="${O}">
          <!-- \u5B50\u5185\u5BB9\u5C06\u5728\u6B64\u6E32\u67D3 -->
        </div>
      </div>
    `),os(b,O)}function qm(b,w){if(!v())return;let P=s.toolManagerModule?.getTool(b),O=s.presetManagerModule?.getAllPresets()||[],z=s.toolRegistryModule?.getToolApiPreset(b)||"",te=O.map(J=>`<option value="${T(J.name)}" ${J.name===z?"selected":""}>${T(J.name)}</option>`).join("");w.html(`
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
              ${te}
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
              <input type="number" class="yyt-input" id="yyt-tool-timeout" value="${P?.config?.execution?.timeout||6e4}">
            </div>
            <div class="yyt-form-group yyt-flex-1">
              <label>\u91CD\u8BD5\u6B21\u6570</label>
              <input type="number" class="yyt-input" id="yyt-tool-retries" value="${P?.config?.execution?.retries||3}">
            </div>
          </div>
        </div>
      </div>
    `),Dt(w,{namespace:"yytPopupToolConfigSelect",selectors:["#yyt-tool-api-preset"]}),w.find("#yyt-save-tool-preset").on("click",function(){let re=w.find("#yyt-tool-api-preset").val();s.toolRegistryModule?.setToolApiPreset(b,re);let ke=r.toastr;ke&&ke.success("API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u4FDD\u5B58","YouYou \u5DE5\u5177\u7BB1")})}async function Vm(b,w){if(!v()){w.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u63D0\u793A\u8BCD\u7F16\u8F91\u5668\u6A21\u5757\u672A\u52A0\u8F7D</span></div>');return}let O=s.toolManagerModule?.getTool(b)?.config?.messages||[],z=Fm(O)||Nn,te=new fi({containerId:`yyt-prompt-editor-${b}`,segments:z,onChange:re=>{let ke=jm(re);h("\u63D0\u793A\u8BCD\u5DF2\u66F4\u65B0:",ke.length,"\u6761\u6D88\u606F")}});w.html(`<div id="yyt-prompt-editor-${b}" class="yyt-prompt-editor-container"></div>`),te.init(w.find(`#yyt-prompt-editor-${b}`));let J=Um();if(J){let re="yyt-prompt-editor-styles",ke=r.document||document;if(!ke.getElementById(re)){let me=ke.createElement("style");me.id=re,me.textContent=J,(ke.head||ke.documentElement).appendChild(me)}}}function Jm(b,w){v()&&w.html(`
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
    `)}function Xm(){return`
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
      </div>`}function Qm(b,w,I){let P=f(),O=b.map(z=>`
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
      <aside class="yyt-shell-sidebar${P?" yyt-collapsed":""}">
        <div class="yyt-shell-sidebar-card">
          <div class="yyt-shell-sidebar-title-row">
            <span class="yyt-shell-sidebar-title">\u9875\u9762\u5BFC\u822A</span>
            <span class="yyt-shell-sidebar-hint">${b.length} tabs</span>
            <button class="yyt-sidebar-toggle" title="${P?"\u5C55\u5F00\u4FA7\u680F":"\u6298\u53E0\u4FA7\u680F"}">
              <i class="fa-solid ${P?"fa-angles-right":"fa-angles-left"}"></i>
            </button>
          </div>
          <div class="yyt-main-nav">
            ${O}
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
              <span class="yyt-shell-sidebar-stat-value">${w}</span>
              <span class="yyt-shell-sidebar-stat-label">\u9ED8\u8BA4\u5DE5\u5177</span>
            </div>
            <div class="yyt-shell-sidebar-stat">
              <span class="yyt-shell-sidebar-stat-value">${I}</span>
              <span class="yyt-shell-sidebar-stat-label">\u81EA\u5B9A\u4E49\u5DE5\u5177</span>
            </div>
          </div>
        </div>
      </aside>`}function Zm(b,w){return`
      <div class="yyt-shell-main-header">
        <div class="yyt-shell-main-heading-block">
          <div class="yyt-shell-main-title">${T(b)}</div>
          <div class="yyt-shell-main-description">${T(w)}</div>
        </div>
        <div class="yyt-shell-main-actions">
          <div class="yyt-shell-main-meta">
            <i class="fa-solid fa-circle-info"></i>
            <span>\u4FDD\u5B58\u540E\u6267\u884C\u94FE\u4F1A\u7ACB\u5373\u4F7F\u7528\u6700\u65B0\u914D\u7F6E</span>
          </div>
        </div>
      </div>`}function eh(b,w){return b.map(I=>`
      <div class="yyt-tab-content ${I.id===w?"active":""}" data-tab="${I.id}">
      </div>
    `).join("")}function th(b){return`
      <div class="yyt-popup-footer">
        <div class="yyt-popup-footer-left">
          <div class="yyt-popup-status-cluster">
            <div class="yyt-popup-status">
              <i class="fa-solid fa-compass"></i>
              <span class="yyt-popup-active-label">\u5F53\u524D\uFF1A${T(b)}</span>
            </div>
            <div class="yyt-popup-footer-note">
              API\u3001\u5DE5\u5177\u3001\u63D0\u53D6\u4E0E\u8BCA\u65AD\u7EDF\u4E00\u5165\u53E3\u3002
            </div>
          </div>
        </div>
      </div>`}async function rh(){if(n.currentPopup){h("\u5F39\u7A97\u5DF2\u5B58\u5728");return}let b=t?.services?.loadModules;typeof b=="function"&&await b();let w=v(),I=L();if(!w){x("jQuery \u672A\u627E\u5230\uFF0C\u65E0\u6CD5\u521B\u5EFA\u5F39\u7A97");return}let P=s.toolRegistryModule?.getToolList()||[];if(!P.length){x("\u5DE5\u5177\u5217\u8868\u4E3A\u7A7A\uFF0C\u65E0\u6CD5\u521B\u5EFA\u5F39\u7A97");return}P.some(V=>V.id===n.currentMainTab)||(n.currentMainTab=P[0].id);let O=s.toolRegistryModule?.getToolConfig("tools"),z=Array.isArray(O?.subTabs)?O.subTabs:[],te=z.filter(V=>V?.isCustom).length,J=z.filter(V=>!V?.isCustom).length,re=C(n.currentMainTab),ke=_(n.currentMainTab);n.currentOverlay=I.createElement("div"),n.currentOverlay.className="yyt-popup-overlay",n.currentOverlay.addEventListener("click",V=>{V.target===n.currentOverlay&&Cr()}),I.body.appendChild(n.currentOverlay);let me=f(),ot=`
      <div class="yyt-popup" id="${l}">
        ${Xm()}
        <div class="yyt-popup-body">
          <div class="yyt-popup-shell">
            <div class="yyt-shell-workspace${me?" yyt-sidebar-collapsed":""}">
              ${Qm(P,J,te)}
              <section class="yyt-shell-main">
                ${Zm(re,ke)}
                <div class="yyt-sub-nav" style="display: none;"></div>
                <div class="yyt-content-frame">
                  <div class="yyt-content">
                    <div class="yyt-content-inner">
                      ${eh(P,n.currentMainTab)}
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
        ${th(re)}
      </div>
    `,$t=I.createElement("div");$t.innerHTML=ot,n.currentPopup=$t.firstElementChild,I.body.appendChild(n.currentPopup),w(n.currentPopup).find(".yyt-popup-close").on("click",Cr),w(n.currentPopup).find(".yyt-sidebar-toggle").on("click",g);let qt=V=>{V.key==="Escape"&&(I.querySelector(".yyt-dialog-overlay")||I.querySelector(".yyt-twb-editor-drawer.is-open")||(V.stopPropagation(),Cr()))},Ir=V=>{if(!(V.ctrlKey||V.metaKey)||V.key!=="s"||!n.currentPopup)return;V.preventDefault(),V.stopPropagation();let ct=w(n.currentPopup),Ze=ct.find("#yyt-bypass-save:visible").first()||ct.find(`#${a}-save-api-config:visible`).first()||ct.find("#yyt-save-tool-preset:visible").first()||ct.find('[data-twb-action="save"]:visible').first();Ze?.length&&Ze.trigger("click")};I.addEventListener("keydown",qt),I.addEventListener("keydown",Ir),u.cleanups.push(()=>{I.removeEventListener("keydown",qt),I.removeEventListener("keydown",Ir)}),dr(),w(n.currentPopup).find(".yyt-main-nav-item").on("click",function(){let ct=w(this).data("tab");ct&&rs(ct)}),kr(),ss(n.currentMainTab);let nt=s.toolRegistryModule?.getToolConfig(n.currentMainTab);nt?.hasSubTabs&&(w(n.currentPopup).find(".yyt-sub-nav").show(),js(n.currentMainTab,nt.subTabs)),W(),Mo(P),He(),h("\u5F39\u7A97\u5DF2\u6253\u5F00")}return{openPopup:rh,closePopup:Cr,switchMainTab:rs,switchSubTab:Us,renderTabContent:ss,renderSubTabContent:os}}function Hm(t,e={}){let{constants:r,modules:s}=t,{SCRIPT_ID:o,SCRIPT_VERSION:n}=r,{init:a,loadModules:i,addMenuItem:l,popupShell:c}=e;return{version:n,id:o,init:a,openPopup:c?.openPopup,closePopup:c?.closePopup,switchMainTab:c?.switchMainTab,switchSubTab:c?.switchSubTab,addMenuItem:l,getStorage:()=>s.storageModule,getApiConnection:()=>s.apiConnectionModule,getPresetManager:()=>s.presetManagerModule,getUi:()=>s.uiModule,getUiModule:()=>s.uiModule,getRegexExtractor:()=>s.regexExtractorModule,getToolManager:()=>s.toolManagerModule,getToolExecutor:()=>s.toolExecutorModule,getWindowManager:()=>s.windowManagerModule,getToolRegistry:()=>s.toolRegistryModule,getSettingsService:()=>s.settingsServiceModule,getBypassManager:()=>s.bypassManagerModule,getVariableResolver:()=>s.variableResolverModule,getContextInjector:()=>s.contextInjectorModule,getToolPromptService:()=>s.toolPromptServiceModule,getToolOutputService:()=>s.toolOutputServiceModule,getToolAutomationService:()=>s.toolAutomationServiceModule,getDataProvider:()=>s.toolDataProviderModule?.getCurrentProvider?.()||null,async getDataProviderAsync(){return await i(),s.toolDataProviderModule?.getToolDataProvider?.()||null},async getApiConfig(){return await i(),s.apiConnectionModule?.getApiConfig?.()||null},async saveApiConfig(d){return await i(),s.apiConnectionModule?(s.apiConnectionModule.updateApiConfig(d),!0):!1},async getPresets(){return await i(),s.presetManagerModule?s.presetManagerModule.getAllPresets():[]},async sendApiRequest(d,u){if(await i(),s.apiConnectionModule)return s.apiConnectionModule.sendApiRequest(d,u);throw new Error("API\u6A21\u5757\u672A\u52A0\u8F7D")},async testApiConnection(){return await i(),s.apiConnectionModule?s.apiConnectionModule.testApiConnection():{success:!1,message:"API\u6A21\u5757\u672A\u52A0\u8F7D"}},registerTool(d,u){return s.toolRegistryModule?.registerTool(d,u)||!1},unregisterTool(d){return s.toolRegistryModule?.unregisterTool(d)||!1},getToolList(){return s.toolRegistryModule?.getToolList()||[]},createWindow(d){return s.windowManagerModule?.createWindow(d)||null},closeWindow(d){s.windowManagerModule?.closeWindow(d)},startAutomation(){return s.toolAutomationServiceModule?.toolAutomationService?.init?.()||!1},stopAutomation(){s.toolAutomationServiceModule?.toolAutomationService?.stop?.()},getAutomationRuntime(){return s.toolAutomationServiceModule?.toolAutomationService?.getRuntimeSnapshot?.()||null},cancelAutomation(d={}){return s.toolAutomationServiceModule?.toolAutomationService?.cancelAutomation?.(d)||{success:!1,error:"\u81EA\u52A8\u5316\u670D\u52A1\u672A\u52A0\u8F7D"}},async processCurrentAssistantMessage(d={}){return s.toolAutomationServiceModule?.toolAutomationService?.processCurrentAssistantMessage?.(d)||{success:!1,error:"\u81EA\u52A8\u5316\u670D\u52A1\u672A\u52A0\u8F7D"}}}}var gi="youyou_toolkit",a0="1.0.205",i0=`${gi}-menu-item`,l0=`${gi}-menu-container`,c0=`${gi}-popup`,d0=typeof window.parent<"u"?window.parent:window,mi={constants:{SCRIPT_ID:gi,SCRIPT_VERSION:a0,MENU_ITEM_ID:i0,MENU_CONTAINER_ID:l0,POPUP_ID:c0},topLevelWindow:d0,modules:{storageModule:null,apiConnectionModule:null,uiModule:null,presetManagerModule:null,regexExtractorModule:null,toolManagerModule:null,toolExecutorModule:null,toolTriggerModule:null,windowManagerModule:null,toolRegistryModule:null,settingsServiceModule:null,bypassManagerModule:null,variableResolverModule:null,contextInjectorModule:null,toolPromptServiceModule:null,toolOutputServiceModule:null,toolAutomationServiceModule:null,toolDataProviderModule:null},caches:{dynamicToolPanelCache:new Map},services:{loadModules:null},uiState:{currentPopup:null,currentOverlay:null,currentMainTab:"presetManagement",currentSubTab:{},startupScreenDismissed:!1}},Ym=Wm(mi),$n=Km(mi,{openPopup:Ym.openPopup});mi.services.loadModules=$n.loadModules;var hd=Hm(mi,{init:$n.init,loadModules:$n.loadModules,addMenuItem:$n.addMenuItem,popupShell:Ym});if(typeof window<"u"&&(window.YouYouToolkit=hd,typeof window.parent<"u"&&window.parent!==window))try{window.parent.YouYouToolkit=hd}catch{}var LI=hd;$n.init();Promise.resolve().then(()=>(H(),xd)).then(({logger:t})=>{t.createScope("Bootstrap").log("\u6A21\u5757\u52A0\u8F7D\u5B8C\u6210")});export{LI as default};
