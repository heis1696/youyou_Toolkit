var Tc=Object.defineProperty;var U=(t,e)=>()=>(t&&(e=t(t=0)),e);var pe=(t,e)=>{for(var s in e)Tc(t,s,{get:e[s],enumerable:!0})};function rn(){let t=C;return t._getStorage(),t._storage}function on(){return C.get("settings",{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}})}function an(t){C.set("settings",t)}var xt,C,Z,sn,Ls,Ne=U(()=>{xt=class t{constructor(e="youyou_toolkit"){this.namespaceKey=e,this._storage=null,this._cache=new Map}_getStorage(){if(this._storage)return this._storage;try{let e=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(e.SillyTavern?.getContext){let s=e.SillyTavern.getContext();if(s?.extensionSettings)return s.extensionSettings[this.namespaceKey]||(s.extensionSettings[this.namespaceKey]={}),this._storage={_target:s.extensionSettings[this.namespaceKey],getItem:r=>{let o=s.extensionSettings[this.namespaceKey][r];return typeof o=="string"?o:o?JSON.stringify(o):null},setItem:(r,o)=>{s.extensionSettings[this.namespaceKey][r]=o,this._saveSettings(s)},removeItem:r=>{delete s.extensionSettings[this.namespaceKey][r],this._saveSettings(s)},_isTavern:!0},this._storage}}catch{console.warn(`[${this.namespaceKey}] SillyTavern\u5B58\u50A8\u4E0D\u53EF\u7528\uFF0C\u4F7F\u7528localStorage`)}return this._storage={getItem:e=>{try{return localStorage.getItem(e)}catch{return null}},setItem:(e,s)=>{try{localStorage.setItem(e,s)}catch(r){console.error(`[${this.namespaceKey}] localStorage\u5199\u5165\u5931\u8D25:`,r)}},removeItem:e=>{try{localStorage.removeItem(e)}catch{}},_isTavern:!1},this._storage}_saveSettings(e){if(typeof e.saveSettings=="function")try{e.saveSettings()}catch{}else if(typeof e.saveSettingsDebounced=="function")try{e.saveSettingsDebounced()}catch{}}get(e,s=null){let r=`${this.namespaceKey}:${e}`;if(this._cache.has(r))return this._cache.get(r);let o=this._getStorage(),a=this._getFullKey(e),n=o.getItem(a);if(n===null)return s;try{let i=JSON.parse(n);return this._cache.set(r,i),i}catch{return n}}set(e,s){let r=this._getStorage(),o=this._getFullKey(e),a=`${this.namespaceKey}:${e}`;this._cache.set(a,s);try{r.setItem(o,JSON.stringify(s))}catch(n){console.error(`[${this.namespaceKey}] \u5B58\u50A8\u5931\u8D25:`,n)}}remove(e){let s=this._getStorage(),r=this._getFullKey(e),o=`${this.namespaceKey}:${e}`;this._cache.delete(o),s.removeItem(r)}has(e){let s=this._getStorage(),r=this._getFullKey(e);return s.getItem(r)!==null}clear(){if(this._getStorage()._isTavern){let s=typeof window.parent<"u"?window.parent:window;if(s.SillyTavern?.getContext){let r=s.SillyTavern.getContext();r?.extensionSettings?.[this.namespaceKey]&&(r.extensionSettings[this.namespaceKey]={},this._saveSettings(r))}}else{let s=`${this.namespaceKey}_`,r=[];for(let o=0;o<localStorage.length;o++){let a=localStorage.key(o);a&&a.startsWith(s)&&r.push(a)}r.forEach(o=>localStorage.removeItem(o))}this._cache.clear()}_getFullKey(e){return this._getStorage()._isTavern?e:`${this.namespaceKey}_${e}`}namespace(e){return new t(`${this.namespaceKey}:${e}`)}getMultiple(e){let s={};return e.forEach(r=>{s[r]=this.get(r)}),s}setMultiple(e){Object.entries(e).forEach(([s,r])=>{this.set(s,r)})}exportAll(){let e=this._getStorage(),s={};if(e._isTavern){let r=typeof window.parent<"u"?window.parent:window;if(r.SillyTavern?.getContext){let a=r.SillyTavern.getContext()?.extensionSettings?.[this.namespaceKey]||{};Object.entries(a).forEach(([n,i])=>{s[n]=typeof i=="string"?JSON.parse(i):i})}}else{let r=`${this.namespaceKey}_`;for(let o=0;o<localStorage.length;o++){let a=localStorage.key(o);if(a&&a.startsWith(r)){let n=a.slice(r.length);try{s[n]=JSON.parse(localStorage.getItem(a))}catch{s[n]=localStorage.getItem(a)}}}}return s}},C=new xt("youyou_toolkit"),Z=new xt("youyou_toolkit:tools"),sn=new xt("youyou_toolkit:presets"),Ls=new xt("youyou_toolkit:windows")});var ln={};pe(ln,{DEFAULT_API_PRESETS:()=>Ac,DEFAULT_SETTINGS:()=>_c,STORAGE_KEYS:()=>Bs,StorageService:()=>xt,deepMerge:()=>nn,getCurrentPresetName:()=>kc,getStorage:()=>rn,loadApiPresets:()=>Ec,loadSettings:()=>on,presetStorage:()=>sn,saveApiPresets:()=>Mc,saveSettings:()=>an,setCurrentPresetName:()=>Ic,storage:()=>C,toolStorage:()=>Z,windowStorage:()=>Ls});function Ec(){return C.get(Bs.API_PRESETS)||[]}function Mc(t){C.set(Bs.API_PRESETS,t)}function kc(){return C.get(Bs.CURRENT_PRESET)||""}function Ic(t){C.set(Bs.CURRENT_PRESET,t||"")}function nn(t,e){let s=o=>o&&typeof o=="object"&&!Array.isArray(o),r={...t};return s(t)&&s(e)&&Object.keys(e).forEach(o=>{s(e[o])?o in t?r[o]=nn(t[o],e[o]):Object.assign(r,{[o]:e[o]}):Object.assign(r,{[o]:e[o]})}),r}var Bs,_c,Ac,cn=U(()=>{Ne();Ne();Bs={SETTINGS:"settings",API_PRESETS:"api_presets",CURRENT_PRESET:"current_preset",TOOLS:"tools",TOOL_PRESETS:"tool_presets",CURRENT_TOOL_PRESET:"current_tool_preset",BYPASS_PRESETS:"bypass_presets",CURRENT_BYPASS_PRESET:"current_bypass_preset",BYPASS_ENABLED:"bypass_enabled"},_c={apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}},Ac=[]});var gn={};pe(gn,{API_STATUS:()=>Oc,fetchAvailableModels:()=>zo,getApiConfig:()=>lt,getEffectiveApiConfig:()=>Ks,hasEffectiveApiPreset:()=>zs,sendApiRequest:()=>Us,sendWithPreset:()=>Bo,testApiConnection:()=>Wc,updateApiConfig:()=>ds,validateApiConfig:()=>us});function Rc(){return{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,stream:!1,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}}}function Lo(){return C.get(dn,Rc())}function $c(t){C.set(dn,t)}function un(){return C.get(Cc,[])}function Dc(){return C.get(Pc,"")}function No(t,e={}){let s=new Error(t);return s.allowDirectFallback=e.allowDirectFallback===!0,s}function yn(t,e="chat_completions"){let s=String(t||"").trim();if(!s)return"";let r=null;try{r=new URL(s)}catch{return s}let o=r.pathname.replace(/\/+$/,""),a=o;return e==="chat_completions"?!/\/chat\/completions$/i.test(o)&&!/\/completions$/i.test(o)&&(a=`${o||""}/chat/completions`):e==="models"&&(/\/chat\/completions$/i.test(o)?a=o.replace(/\/chat\/completions$/i,"/models"):/\/completions$/i.test(o)?a=o.replace(/\/completions$/i,"/models"):/\/models$/i.test(o)||(a=`${o||""}/models`)),r.pathname=a.replace(/\/+/g,"/"),r.toString()}function Nc(t){let e=String(t||"").trim();if(!e)return"";try{let s=new URL(e);return s.pathname=s.pathname.replace(/\/chat\/completions$/i,"").replace(/\/completions$/i,"").replace(/\/models$/i,"").replace(/\/+$/,"")||"/",s.toString().replace(/\/$/,"")}catch{return e.replace(/\/chat\/completions$/i,"").replace(/\/completions$/i,"").replace(/\/models$/i,"").replace(/\/+$/,"")}}function lt(){return Lo().apiConfig||{}}function ds(t){let e=Lo();e.apiConfig={...e.apiConfig,...t},$c(e)}function us(t){let e=[];if(t.useMainApi)return{valid:!0,errors:[]};if(!t.url||!t.url.trim())e.push("API URL \u4E0D\u80FD\u4E3A\u7A7A");else try{new URL(t.url)}catch{e.push("API URL \u683C\u5F0F\u65E0\u6548")}return(!t.model||!t.model.trim())&&e.push("\u6A21\u578B\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"),{valid:e.length===0,errors:e}}function Ks(t=""){let e=Lo(),s=t||Dc()||"";if(s){let o=un().find(a=>a.name===s);if(o&&o.apiConfig)return{...o.apiConfig,presetName:o.name}}return e.apiConfig||{}}function zs(t=""){return t?un().some(s=>s?.name===t):!1}async function Bo(t,e,s={},r=null){let o=Ks(t);return await Us(e,{...s,apiConfig:o},r)}function pn(t,e={}){let s=e.apiConfig||lt();return{messages:t,model:s.model||"gpt-3.5-turbo",max_tokens:s.max_tokens||4096,temperature:s.temperature??.7,top_p:s.top_p??.9,stream:s.stream??!1,...e.extraParams}}function Ko(t){let e="";if(t?.choices&&t.choices[0]?.message?.content)e=t.choices[0].message.content;else if(t?.content)e=t.content;else if(t?.text)e=t.text;else if(t?.response)e=t.response;else throw new Error(`\u65E0\u6CD5\u89E3\u6790API\u54CD\u5E94\u683C\u5F0F: ${JSON.stringify(t).slice(0,200)}`);return String(e||"").trim()}async function Us(t,e={},s=null){let r=e.apiConfig||lt(),o=r.useMainApi,a=us(r);if(!a.valid&&!o)throw new Error(`API\u914D\u7F6E\u65E0\u6548: ${a.errors.join(", ")}`);return o?await Lc(t,e,s):await Bc(t,r,e,s)}async function Lc(t,e,s){let r=typeof window.parent<"u"?window.parent:window;if(!r.TavernHelper?.generateRaw)throw new Error("TavernHelper.generateRaw \u4E0D\u53EF\u7528\u3002\u8BF7\u68C0\u67E5SillyTavern\u7248\u672C\u3002");try{let o=await r.TavernHelper.generateRaw({ordered_prompts:t,should_stream:e.apiConfig?.stream??lt().stream??!1,...e.extraParams});if(typeof o!="string")throw new Error("\u4E3BAPI\u8FD4\u56DE\u4E86\u975E\u9884\u671F\u7684\u54CD\u5E94\u7C7B\u578B");return o.trim()}catch(o){throw o.name==="AbortError"?o:new Error(`\u4E3BAPI\u8BF7\u6C42\u5931\u8D25: ${o.message}`)}}async function Bc(t,e,s,r){let o=typeof window.parent<"u"?window.parent:window;if(o.TavernHelper?.generateRaw)try{return await Kc(t,e,s,r,o)}catch(a){console.warn("[youyou_toolkit] TavernHelper \u81EA\u5B9A\u4E49\u8BF7\u6C42\u5931\u8D25\uFF0C\u56DE\u9000\u5230\u540E\u5907\u94FE\u8DEF:",a)}if(o.SillyTavern?.getRequestHeaders)try{return await zc(t,e,s,r,o)}catch(a){if(!a?.allowDirectFallback)throw a}return await Uc(t,e,s,r)}async function Kc(t,e,s,r,o){if(r?.aborted)throw new DOMException("\u8BF7\u6C42\u5DF2\u53D6\u6D88","AbortError");let a=await o.TavernHelper.generateRaw({ordered_prompts:t,should_stream:e.stream??!1,max_chat_history:0,custom_api:{apiurl:Nc(e.url),key:e.apiKey||"",model:e.model||"gpt-3.5-turbo",max_tokens:e.max_tokens||4096,temperature:e.temperature??.7,top_p:e.top_p??.9},...s.extraParams||{}});return typeof a=="string"?a.trim():Ko(a)}async function zc(t,e,s,r,o){let a=String(e.url||"").trim(),n={...pn(t,{apiConfig:e,...s}),chat_completion_source:"custom",reverse_proxy:a,proxy_password:"",custom_url:a,custom_include_headers:e.apiKey?`Authorization: Bearer ${e.apiKey}`:""},i={...typeof o.SillyTavern?.getRequestHeaders=="function"?o.SillyTavern.getRequestHeaders():{},"Content-Type":"application/json"},l=null;try{l=await fetch("/api/backends/chat-completions/generate",{method:"POST",headers:i,body:JSON.stringify(n),signal:r})}catch(u){throw u?.name==="AbortError"?u:No(`\u9152\u9986\u540E\u7AEF\u8F6C\u53D1\u8BF7\u6C42\u4E0D\u53EF\u7528\uFF0C\u5DF2\u5C1D\u8BD5\u56DE\u9000\u5230\u6D4F\u89C8\u5668\u76F4\u8FDE\u3002\u539F\u59CB\u9519\u8BEF: ${u.message}`,{allowDirectFallback:!0})}let c=await l.text().catch(()=>"");if(!l.ok){let u=[404,405,501,502].includes(l.status);throw No(`\u9152\u9986\u540E\u7AEF\u8F6C\u53D1\u8BF7\u6C42\u5931\u8D25 (${l.status}): ${c||"Unknown error"}`,{allowDirectFallback:u})}let d=null;try{d=c?JSON.parse(c):{}}catch{let y=String(c||"").replace(/\s+/g," ").trim().slice(0,120);throw No(`\u9152\u9986\u540E\u7AEF\u8FD4\u56DE\u4E86\u975EJSON\u5185\u5BB9\u3002\u54CD\u5E94\u7247\u6BB5: ${y||"(\u7A7A\u54CD\u5E94)"}`)}return Ko(d)}async function Uc(t,e,s,r){let o=pn(t,{apiConfig:e,...s}),a=yn(e.url,"chat_completions"),n={"Content-Type":"application/json"};e.apiKey&&(n.Authorization=`Bearer ${e.apiKey}`);let i=await fetch(a,{method:"POST",headers:n,body:JSON.stringify(o),signal:r}),l=await i.text().catch(()=>"");if(!i.ok){let d=l||"Unknown error";throw new Error(`API\u8BF7\u6C42\u5931\u8D25 (${i.status}): ${d}`)}let c=null;try{c=l?JSON.parse(l):{}}catch{let u=String(l||"").replace(/\s+/g," ").trim().slice(0,120);throw new Error(`\u81EA\u5B9A\u4E49API\u8FD4\u56DE\u7684\u4E0D\u662FJSON\uFF0C\u53EF\u80FD\u662FURL\u914D\u7F6E\u9519\u8BEF\u3001\u53EA\u586B\u5199\u4E86\u7AD9\u70B9\u9996\u9875/\u57FA\u7840\u8DEF\u5F84\u3001\u6216\u8BF7\u6C42\u88AB\u91CD\u5B9A\u5411\u3002\u5F53\u524D\u4F1A\u81EA\u52A8\u5C1D\u8BD5\u8865\u5168 chat/completions \u7AEF\u70B9\uFF1B\u82E5\u4ECD\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5API URL\uFF0C\u6216\u6539\u4E3A\u542F\u7528\u201C\u4F7F\u7528SillyTavern\u4E3BAPI\u201D\u3002\u54CD\u5E94\u7247\u6BB5: ${u||"(\u7A7A\u54CD\u5E94)"}`)}return Ko(c)}async function Wc(t=null){let e=t||lt(),s=Date.now();try{await Us([{role:"user",content:'Hello, this is a connection test. Please respond with "OK".'}],{apiConfig:e});let o=Date.now()-s;return{success:!0,message:`\u8FDE\u63A5\u6210\u529F (\u5EF6\u8FDF: ${o}ms)`,latency:o}}catch(r){return{success:!1,message:`\u8FDE\u63A5\u5931\u8D25: ${r.message}`,latency:Date.now()-s}}}async function zo(t=null){let e=t||lt();return e.useMainApi?await jc():await Fc(e)}async function jc(){let t=typeof window.parent<"u"?window.parent:window;try{if(t.SillyTavern?.getContext){let e=t.SillyTavern.getContext();if(e.settings?.api_server)return[e.settings.api_server]}return["gpt-4","gpt-4-turbo","gpt-3.5-turbo","claude-3-opus","claude-3-sonnet"]}catch{return["gpt-4","gpt-3.5-turbo"]}}async function Fc(t){if(!t.url||!t.apiKey)return[];try{let e=yn(t.url,"models"),s=await fetch(e,{method:"GET",headers:{Authorization:`Bearer ${t.apiKey}`}});if(!s.ok)return[];let r=await s.json();return r.data&&Array.isArray(r.data)?r.data.map(o=>o.id||o.name).filter(Boolean).sort():[]}catch{return[]}}var dn,Cc,Pc,Oc,Ws=U(()=>{Ne();dn="settings",Cc="api_presets",Pc="current_preset";Oc={IDLE:"idle",CONNECTING:"connecting",SUCCESS:"success",ERROR:"error"}});var hn={};pe(hn,{createPreset:()=>Er,createPresetFromCurrentConfig:()=>Jc,deletePreset:()=>Fs,duplicatePreset:()=>Vc,exportPresets:()=>Ho,generateUniquePresetName:()=>qo,getActiveConfig:()=>Fo,getActivePresetName:()=>Mr,getAllPresets:()=>wt,getPreset:()=>Lt,getPresetNames:()=>qc,getStarredPresets:()=>jo,importPresets:()=>Yo,presetExists:()=>js,renamePreset:()=>Gc,switchToPreset:()=>Bt,togglePresetStar:()=>Wo,updatePreset:()=>Uo,validatePreset:()=>Xc});function Yc(){return{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}}}function bn(){return C.get(Hc,Yc())}function ke(){return C.get(fn,[])}function Nt(t){C.set(fn,t)}function Ar(){return C.get(mn,"")}function _r(t){C.set(mn,t||"")}function wt(){return ke()}function qc(){return ke().map(e=>e.name)}function Lt(t){return!t||typeof t!="string"?null:ke().find(s=>s.name===t)||null}function js(t){return!t||typeof t!="string"?!1:ke().some(s=>s.name===t)}function Er(t){let{name:e,description:s,apiConfig:r}=t;if(!e||typeof e!="string"||!e.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let o=e.trim();if(js(o))return{success:!1,message:`\u9884\u8BBE "${o}" \u5DF2\u5B58\u5728`};let a={name:o,description:s||"",apiConfig:{url:r?.url||"",apiKey:r?.apiKey||"",model:r?.model||"",useMainApi:r?.useMainApi??!0,stream:r?.stream??!1,max_tokens:r?.max_tokens||4096,temperature:r?.temperature??.7,top_p:r?.top_p??.9},createdAt:Date.now(),updatedAt:Date.now()},n=ke();return n.push(a),Nt(n),{success:!0,message:`\u9884\u8BBE "${o}" \u521B\u5EFA\u6210\u529F`,preset:a}}function Uo(t,e){if(!t||typeof t!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let s=ke(),r=s.findIndex(n=>n.name===t);if(r===-1)return{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if(e.name&&e.name!==t)return{success:!1,message:"\u4E0D\u652F\u6301\u4FEE\u6539\u9884\u8BBE\u540D\u79F0\uFF0C\u8BF7\u521B\u5EFA\u65B0\u9884\u8BBE"};let o=s[r],a={...o,...e,name:o.name,updatedAt:Date.now()};return e.apiConfig&&(a.apiConfig={...o.apiConfig,...e.apiConfig}),s[r]=a,Nt(s),{success:!0,message:`\u9884\u8BBE "${t}" \u66F4\u65B0\u6210\u529F`,preset:a}}function Fs(t){if(!t||typeof t!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let e=ke(),s=e.findIndex(r=>r.name===t);return s===-1?{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`}:(e.splice(s,1),Nt(e),Ar()===t&&_r(""),{success:!0,message:`\u9884\u8BBE "${t}" \u5DF2\u5220\u9664`})}function Gc(t,e){if(!t||typeof t!="string")return{success:!1,message:"\u539F\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};if(!e||typeof e!="string"||!e.trim())return{success:!1,message:"\u65B0\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let s=e.trim();if(!js(t))return{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if(js(s))return{success:!1,message:`\u9884\u8BBE "${s}" \u5DF2\u5B58\u5728`};let r=ke(),o=r.find(a=>a.name===t);return o&&(o.name=s,o.updatedAt=Date.now(),Nt(r),Ar()===t&&_r(s)),{success:!0,message:`\u9884\u8BBE\u5DF2\u91CD\u547D\u540D\u4E3A "${s}"`}}function Vc(t,e){if(!t||typeof t!="string")return{success:!1,message:"\u6E90\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};if(!e||typeof e!="string"||!e.trim())return{success:!1,message:"\u76EE\u6807\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let s=e.trim(),r=Lt(t);if(!r)return{success:!1,message:`\u6E90\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if(js(s))return{success:!1,message:`\u9884\u8BBE "${s}" \u5DF2\u5B58\u5728`};let o={...JSON.parse(JSON.stringify(r)),name:s,createdAt:Date.now(),updatedAt:Date.now()},a=ke();return a.push(o),Nt(a),{success:!0,message:`\u9884\u8BBE\u5DF2\u590D\u5236\u4E3A "${s}"`,preset:o}}function Wo(t){if(!t||typeof t!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let e=ke(),s=e.find(r=>r.name===t);return s?(s.starred=!s.starred,s.updatedAt=Date.now(),Nt(e),{success:!0,message:s.starred?`\u5DF2\u5C06 "${t}" \u6DFB\u52A0\u5230\u9884\u89C8\u5217\u8868`:`\u5DF2\u5C06 "${t}" \u4ECE\u9884\u89C8\u5217\u8868\u79FB\u9664`,starred:s.starred}):{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`}}function jo(){return ke().filter(e=>e.starred===!0)}function Bt(t){if(!t)return _r(""),{success:!0,message:"\u5DF2\u5207\u6362\u5230\u5F53\u524DAPI\u914D\u7F6E"};let e=Lt(t);return e?(_r(t),{success:!0,message:`\u5DF2\u5207\u6362\u5230\u9884\u8BBE "${t}"`,apiConfig:e.apiConfig}):{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`}}function Mr(){return Ar()}function Fo(){let t=Ar();if(t){let s=Lt(t);if(s)return{presetName:t,apiConfig:s.apiConfig}}return{presetName:"",apiConfig:bn().apiConfig||{}}}function Ho(t=null){if(t){let s=Lt(t);if(!s)throw new Error(`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`);return JSON.stringify(s,null,2)}let e=ke();return JSON.stringify(e,null,2)}function Yo(t,e={overwrite:!1}){let s;try{s=JSON.parse(t)}catch{return{success:!1,message:"JSON\u89E3\u6790\u5931\u8D25",imported:0}}let r=Array.isArray(s)?s:[s];if(r.length===0)return{success:!1,message:"\u6CA1\u6709\u627E\u5230\u6709\u6548\u7684\u9884\u8BBE\u6570\u636E",imported:0};let o=ke(),a=0;for(let n of r){if(!n.name||typeof n.name!="string"||!n.apiConfig||typeof n.apiConfig!="object")continue;let i=o.findIndex(l=>l.name===n.name);i>=0?e.overwrite&&(n.updatedAt=Date.now(),o[i]=n,a++):(n.createdAt=n.createdAt||Date.now(),n.updatedAt=Date.now(),o.push(n),a++)}return a>0&&Nt(o),{success:!0,message:`\u6210\u529F\u5BFC\u5165 ${a} \u4E2A\u9884\u8BBE`,imported:a}}function Jc(t,e=""){let s=bn();return Er({name:t,description:e,apiConfig:s.apiConfig})}function Xc(t){let e=[];return(!t.name||typeof t.name!="string"||!t.name.trim())&&e.push("\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"),(!t.apiConfig||typeof t.apiConfig!="object")&&e.push("\u7F3A\u5C11API\u914D\u7F6E"),{valid:e.length===0,errors:e}}function qo(t){(!t||typeof t!="string")&&(t="\u65B0\u9884\u8BBE");let e=ke(),s=new Set(e.map(o=>o.name));if(!s.has(t))return t;let r=1;for(;s.has(`${t} (${r})`);)r++;return`${t} (${r})`}var Hc,fn,mn,Hs=U(()=>{Ne();Hc="settings",fn="api_presets",mn="current_preset"});var P,Go,$,fe=U(()=>{P={STORAGE_CHANGED:"storage:changed",STORAGE_CLEARED:"storage:cleared",PRESET_CREATED:"preset:created",PRESET_UPDATED:"preset:updated",PRESET_DELETED:"preset:deleted",PRESET_ACTIVATED:"preset:activated",PRESET_IMPORTED:"preset:imported",PRESET_EXPORTED:"preset:exported",API_CONFIG_UPDATED:"api:configUpdated",API_REQUEST_START:"api:requestStart",API_REQUEST_SUCCESS:"api:requestSuccess",API_REQUEST_ERROR:"api:requestError",API_CONNECTION_TESTED:"api:connectionTested",TOOL_REGISTERED:"tool:registered",TOOL_UNREGISTERED:"tool:unregistered",TOOL_UPDATED:"tool:updated",TOOL_RUNTIME_UPDATED:"tool:runtimeUpdated",TOOL_ENABLED:"tool:enabled",TOOL_DISABLED:"tool:disabled",TOOL_EXECUTING:"tool:executing",TOOL_EXECUTED:"tool:executed",TOOL_ERROR:"tool:error",TOOL_EXECUTION_STARTED:"tool:executionStarted",TOOL_EXECUTION_FAILED:"tool:executionFailed",REGEX_RULE_ADDED:"regex:ruleAdded",REGEX_RULE_UPDATED:"regex:ruleUpdated",REGEX_RULE_DELETED:"regex:ruleDeleted",REGEX_RULES_CLEARED:"regex:rulesCleared",REGEX_PRESET_LOADED:"regex:presetLoaded",REGEX_EXTRACTED:"regex:extracted",UI_INITIALIZED:"ui:initialized",UI_RENDER_REQUESTED:"ui:renderRequested",UI_TAB_CHANGED:"ui:tabChanged",UI_SUBTAB_CHANGED:"ui:subTabChanged",UI_POPUP_OPENED:"ui:popupOpened",UI_POPUP_CLOSED:"ui:popupClosed",UI_WINDOW_CREATED:"ui:windowCreated",UI_WINDOW_CLOSED:"ui:windowClosed",APP_INITIALIZING:"app:initializing",APP_INITIALIZED:"app:initialized",APP_ERROR:"app:error",SETTINGS_UPDATED:"settings:updated",TOOL_CONTEXT_INJECTED:"tool:contextInjected",TOOL_CONTEXT_CLEARED:"tool:contextCleared",BYPASS_PRESET_CREATED:"bypass:presetCreated",BYPASS_PRESET_UPDATED:"bypass:presetUpdated",BYPASS_PRESET_DELETED:"bypass:presetDeleted",BYPASS_PRESET_ACTIVATED:"bypass:presetActivated",TOOL_OUTPUT_MODE_CHANGED:"tool:outputModeChanged"},Go=class{constructor(){this.listeners=new Map,this.onceCallbacks=new Map,this.history=[],this.maxHistorySize=100,this.debugMode=!1}on(e,s,r={}){if(!e||typeof s!="function")return console.warn("[EventBus] \u65E0\u6548\u7684\u4E8B\u4EF6\u6216\u56DE\u8C03"),()=>{};let{priority:o=0}=r;this.listeners.has(e)||this.listeners.set(e,new Set);let a={callback:s,priority:o};return this.listeners.get(e).add(a),this.debugMode&&console.log(`[EventBus] \u8BA2\u9605: ${e}`),()=>this.off(e,s)}off(e,s){let r=this.listeners.get(e);if(r){for(let o of r)if(o.callback===s){r.delete(o);break}this.debugMode&&console.log(`[EventBus] \u53D6\u6D88\u8BA2\u9605: ${e}`)}}emit(e,s){this.debugMode&&console.log(`[EventBus] \u53D1\u5E03: ${e}`,s),this._addToHistory(e,s);let r=this.listeners.get(e);if(!r||r.size===0)return;let o=Array.from(r).sort((a,n)=>n.priority-a.priority);for(let{callback:a}of o)try{a(s)}catch(n){console.error(`[EventBus] \u4E8B\u4EF6\u5904\u7406\u9519\u8BEF (${e}):`,n)}}once(e,s){let r=o=>{this.off(e,r),s(o)};return this.on(e,r)}wait(e,s=0){return new Promise((r,o)=>{let a=null,n=this.once(e,i=>{a&&clearTimeout(a),r(i)});s>0&&(a=setTimeout(()=>{n(),o(new Error(`\u7B49\u5F85\u4E8B\u4EF6\u8D85\u65F6: ${e}`))},s))})}hasListeners(e){let s=this.listeners.get(e);return s&&s.size>0}listenerCount(e){let s=this.listeners.get(e);return s?s.size:0}removeAllListeners(e){e?this.listeners.delete(e):this.listeners.clear()}setDebugMode(e){this.debugMode=e}_addToHistory(e,s){this.history.push({event:e,data:s,timestamp:Date.now()}),this.history.length>this.maxHistorySize&&this.history.shift()}getHistory(e){return e?this.history.filter(s=>s.event===e):[...this.history]}clearHistory(){this.history=[]}},$=new Go});function zt(){return typeof window.parent<"u"&&window.parent!==window&&window.parent.document?window.parent.document:document}function x(t){return typeof t!="string"?"":t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function _(t,e,s=3e3){e||(e=t==="error"?"\u64CD\u4F5C\u5931\u8D25":"\u64CD\u4F5C\u5B8C\u6210");let r=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(r.toastr){r.toastr[t](e,"YouYou \u5DE5\u5177\u7BB1",{timeOut:s,progressBar:!0});return}Qc(t,e,s),console.log(`[YouYou \u5DE5\u5177\u7BB1] [${t.toUpperCase()}] ${e}`)}function he(t,e,s={}){e||(e=t==="error"?"\u64CD\u4F5C\u5931\u8D25":"\u64CD\u4F5C\u5B8C\u6210");let{duration:r=3500,sticky:o=!1,noticeId:a=""}=s,n=zt();if(!n?.body){_(t,e,r);return}let i="yyt-top-notice-container",l="yyt-top-notice-styles",c=n.getElementById(i);if(c||(c=n.createElement("div"),c.id=i,c.style.cssText=`
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
    `,n.body.appendChild(c)),!n.getElementById(l)){let b=n.createElement("style");b.id=l,b.textContent=`
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
    `,n.head.appendChild(b)}if(a){let b=c.querySelector(`[data-notice-id="${a}"]`);b&&b.remove()}let d={success:"\u2713",error:"!",warning:"\u2022",info:"i"},u=n.createElement("div");u.className=`yyt-top-notice yyt-top-notice--${t||"info"}`,a&&(u.dataset.noticeId=a);let y=n.createElement("span");y.className="yyt-top-notice__icon",y.textContent=d[t]||d.info;let g=n.createElement("div");g.className="yyt-top-notice__content",g.textContent=e;let m=n.createElement("button");m.className="yyt-top-notice__close",m.type="button",m.setAttribute("aria-label","\u5173\u95ED\u901A\u77E5"),m.textContent="\xD7";let v=()=>{u.style.animation="yyt-top-notice-out 0.18s ease forwards",setTimeout(()=>u.remove(),180)};m.addEventListener("click",v),u.appendChild(y),u.appendChild(g),u.appendChild(m),c.appendChild(u),o||setTimeout(v,r)}function Qc(t,e,s){let r=zt();if(!r)return;let o=r.getElementById("yyt-fallback-toast");o&&o.remove();let a={success:{bg:"rgba(74, 222, 128, 0.9)",border:"#22c55e"},error:{bg:"rgba(248, 113, 113, 0.9)",border:"#ef4444"},warning:{bg:"rgba(251, 191, 36, 0.9)",border:"#f59e0b"},info:{bg:"rgba(123, 183, 255, 0.9)",border:"#7bb7ff"}},n=a[t]||a.info,i=r.createElement("div");if(i.id="yyt-fallback-toast",i.style.cssText=`
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
  `,i.textContent=e,!r.getElementById("yyt-toast-styles")){let l=r.createElement("style");l.id="yyt-toast-styles",l.textContent=`
      @keyframes yyt-toast-in {
        from { opacity: 0; transform: translateX(100px); }
        to { opacity: 1; transform: translateX(0); }
      }
      @keyframes yyt-toast-out {
        from { opacity: 1; transform: translateX(0); }
        to { opacity: 0; transform: translateX(100px); }
      }
    `,r.head.appendChild(l)}r.body.appendChild(i),setTimeout(()=>{i.style.animation="yyt-toast-out 0.3s ease forwards",setTimeout(()=>{i.remove()},300)},s)}function D(){if(Kt)return Kt;if(typeof window.parent<"u"&&window.parent!==window)try{if(window.parent.jQuery)return Kt=window.parent.jQuery,Kt}catch{}return window.jQuery&&(Kt=window.jQuery),Kt}function Zc(){Kt=null}function B(t){if(!t||t.length===0)return!1;let e=t[0];if(!e||e.nodeType!==1)return!1;let s=e.ownerDocument||document;return e.isConnected?s?.documentElement?.contains?s.documentElement.contains(e):!0:!1}function St(...t){return t.flat(1/0).flatMap(e=>String(e||"").split(/\s+/)).map(e=>e.trim()).filter(Boolean).join(" ")}function ys(t={}){return Object.entries(t).filter(([,e])=>e!=null&&e!==!1).map(([e,s])=>s===!0?e:`${e}="${x(String(s))}"`).join(" ")}function Sn(t=[],e="",s=""){let r=String(e??""),o=t.find(a=>a.value===r)||t.find(a=>a.disabled!==!0)||null;return o||{value:r,label:s||r||"\u8BF7\u9009\u62E9",disabled:!1}}function ed(t=""){return String(t||"").split(/\s+/).map(e=>e.trim()).filter(e=>e&&e!=="yyt-select"&&e!=="yyt-native-select-bridge")}function vn(t,e){let s=D();if(!s||!e?.length)return null;let r=e.attr("id")?`#${e.attr("id")}`:e.attr("data-yyt-select-key")?`[data-yyt-select-key="${e.attr("data-yyt-select-key")}"]`:"";if(!r)return null;let a=t.find("[data-yyt-custom-select]").filter((n,i)=>String(s(i).attr("data-yyt-select-target")||"")===r);return a.length?a.first():null}function Tn(t){let e=t?.[0];return e?.ownerDocument?e.ownerDocument:typeof window.parent<"u"&&window.parent!==window&&window.parent.document?window.parent.document:document}function td(t){if(!D()||!B(t))return null;let s=t.find("[data-yyt-custom-select]");return s.length?s:null}function _n(t,e){if(!D()||!e?.length)return null;let r=e.find("[data-yyt-select-native]").first();if(r.length)return r;let o=String(e.attr("data-yyt-select-target")||"").trim();if(!o)return null;let a=t.find(o).first();return a.length?a:null}function An(t=null){return t?.jquery&&t[0]?.ownerDocument?t[0].ownerDocument:t?.ownerDocument?t.ownerDocument:t?.nodeType===9?t:zt()}function et(t=null){let e=An(t),s=xn.get(e);return s||(s={targetDoc:e,layer:null,activeRoot:null,activeDropdown:null,placeholder:null,cleanup:null},xn.set(e,s)),s}function sd(t=null){let e=An(t);if(!e?.body)return null;let s=et(e);if(s.layer&&s.layer.isConnected)return s.layer;let r=e.getElementById(wn);return r||(r=e.createElement("div"),r.id=wn,r.className="yyt-select-portal-layer",e.body.appendChild(r)),s.layer=r,r}function kr(t){if(!D()||!t?.length)return null;let s=t.find("[data-yyt-select-trigger]").first();return s.length?s:t.find(".yyt-select-trigger").first()}function En(t){let e=D();if(!e||!t?.length)return null;let s=et(t);if(s.activeRoot===t[0]&&s.activeDropdown)return e(s.activeDropdown);let r=t.find("[data-yyt-select-dropdown]").first();return r.length?r:t.find(".yyt-select-dropdown").first()}function rd(t){t&&(t.classList.remove("yyt-floating-open"),t.removeAttribute("data-yyt-floating"),t.removeAttribute("data-yyt-floating-placement"),t.style.position="",t.style.top="",t.style.left="",t.style.right="",t.style.width="",t.style.minWidth="",t.style.maxWidth="",t.style.maxHeight="",t.style.visibility="",t.style.zIndex="")}function Mn(t,e=null){if(!t)return!1;let s=et(e||t);return s.activeRoot?.contains?.(t)||s.activeDropdown?.contains?.(t)?!0:!!t.closest?.("[data-yyt-custom-select], .yyt-select-portal-layer")}function od(t){if(!t?.targetDoc||typeof t.cleanup=="function")return;let e=t.targetDoc,s=e.defaultView||window,r=i=>{!t.activeRoot||!t.activeDropdown||Mn(i.target,e)||Pe(e)},o=i=>{if(i.key!=="Escape")return;let l=t.activeRoot;Pe(e);let c=D();c&&l&&kr(c(l))?.trigger("focus")},a=()=>{Xo(e)},n=()=>{Xo(e)};e.addEventListener("mousedown",r,!0),e.addEventListener("keydown",o,!0),s.addEventListener("resize",a),e.addEventListener("scroll",n,!0),t.cleanup=()=>{e.removeEventListener("mousedown",r,!0),e.removeEventListener("keydown",o,!0),s.removeEventListener("resize",a),e.removeEventListener("scroll",n,!0)}}function ad(t){typeof t?.cleanup=="function"&&t.cleanup(),t&&(t.cleanup=null)}function Jo(t){let e=D();if(!e||!t?.activeRoot||!t?.activeDropdown)return;let s=t.targetDoc;if(!s?.body?.contains?.(t.activeRoot)){Pe(s);return}let r=e(t.activeRoot),o=kr(r),a=t.activeDropdown,n=s?.defaultView||window;if(!o?.length||!a?.isConnected||!r[0]?.isConnected){Pe(s);return}let i=o[0].getBoundingClientRect(),l=n.innerWidth||s.documentElement?.clientWidth||0,c=n.innerHeight||s.documentElement?.clientHeight||0,d=12,u=8,y=Math.max(0,c-i.bottom-d-u),g=Math.max(0,i.top-d-u),m=y<220&&g>y,b=Math.max(120,Math.floor((m?g:y)||0));a.setAttribute("data-yyt-floating","true"),a.setAttribute("data-yyt-floating-placement",m?"top":"bottom"),a.classList.add("yyt-floating-open");let S=Math.ceil(i.width),A=Math.max(S,Math.floor(l-d*2)),w=a.style.width,M=a.style.minWidth,I=a.style.maxWidth,k=a.style.visibility;a.style.width="max-content",a.style.minWidth=`${S}px`,a.style.maxWidth=`${A}px`,a.style.visibility="hidden";let N=Math.ceil(a.scrollWidth||a.getBoundingClientRect().width||S),te=Math.max(S,Math.min(A,N)),Y=Math.min(a.scrollHeight||b,b);a.style.width=w,a.style.minWidth=M,a.style.maxWidth=I,a.style.visibility=k;let K=Math.round(i.left);K+te>l-d&&(K=Math.max(d,Math.round(l-d-te))),K=Math.max(d,K);let ie=Math.round(m?i.top-u-Y:i.bottom+u);ie=Math.max(d,Math.min(ie,Math.round(c-d-Y))),a.style.position="fixed",a.style.top=`${ie}px`,a.style.left=`${K}px`,a.style.right="auto",a.style.width=`${te}px`,a.style.minWidth=`${S}px`,a.style.maxWidth=`${A}px`,a.style.maxHeight=`${Math.floor(b)}px`,a.style.visibility="",a.style.zIndex="10050"}function Pe(t=null){let e=D(),s=et(t);if(!e||!s?.activeRoot)return;let r=s.activeRoot,o=s.activeDropdown,a=s.placeholder,n=e(r),i=kr(n);o&&(rd(o),a?.parentNode?a.parentNode.insertBefore(o,a):r?.isConnected?r.appendChild(o):o.remove()),a?.parentNode?.removeChild(a),n.removeClass("yyt-open"),i?.attr("aria-expanded","false"),s.activeRoot=null,s.activeDropdown=null,s.placeholder=null,ad(s)}function Xo(t=null){let e=et(t);!e?.activeRoot||!e?.activeDropdown||Jo(e)}function kn(t){if(!D()||!t?.length)return;let s=t.first(),r=kr(s),o=En(s);if(!r?.length||!o?.length||r.prop("disabled"))return;let a=et(s);if(a.activeRoot===s[0]){Jo(a);return}Pe(s);let n=sd(s);if(!n)return;let i=o[0],l=a.targetDoc.createComment("yyt-select-dropdown-placeholder");i.parentNode?.insertBefore(l,i),n.appendChild(i),a.activeRoot=s[0],a.activeDropdown=i,a.placeholder=l,s.addClass("yyt-open"),r.attr("aria-expanded","true"),od(a),Jo(a)}function nd(t,e){let s=D();if(!s||!e?.length)return null;let r=e.closest("[data-yyt-custom-select]");if(r.length)return r.first();let o=et(e);if(o.activeRoot&&o.activeDropdown?.contains?.(e[0])){let a=s(o.activeRoot);return t.has(o.activeRoot).length?a:null}return null}function Ys(t){let e=et(t);t?.length&&e.activeRoot&&e.activeRoot!==t[0]||Pe(t)}function Ir(t){let e=et(t);if(t?.length&&e.activeRoot===t[0]){Pe(t);return}kn(t)}function Vo(t,e,s=null){let r=D();if(!r||!e?.length)return;let o=s||_n(t,e);if(!o?.length)return;let a=Array.isArray(o.data("yytCustomSelectOptions"))?o.data("yytCustomSelectOptions"):[],n=Sn(a,o.val(),e.attr("data-yyt-select-placeholder")||""),i=String(n.value??""),l=String(n.label??""),c=o.is(":disabled");e.find(".yyt-select-value").text(l).attr("data-value",i).data("value",i);let d=En(e);(d?.length?d.find("[data-yyt-select-option]"):e.find("[data-yyt-select-option]")).each((g,m)=>{let v=r(m),b=String(v.attr("data-value")||"")===i;v.toggleClass("yyt-selected",b).attr("aria-selected",String(b))});let y=e.find("[data-yyt-select-trigger]").first();y.prop("disabled",c),c&&(Ys(e),e.removeClass("yyt-open"),y.attr("aria-expanded","false"))}function Cr(t=[]){return Array.isArray(t)?t.map(e=>{if(e&&typeof e=="object"&&!Array.isArray(e)){let r=String(e.value??""),o=String(e.label??e.text??e.name??r);return{value:r,label:o,disabled:e.disabled===!0}}let s=String(e??"");return{value:s,label:s,disabled:!1}}):[]}function Pr(t={}){let{selectedValue:e="",options:s=[],placeholder:r="\u8BF7\u9009\u62E9",disabled:o=!1,includeNative:a=!0,nativeTag:n="input",nativeType:i="hidden",rootAttributes:l={},nativeAttributes:c={},triggerAttributes:d={},dropdownAttributes:u={},optionAttributes:y={},optionClass:g="",optionTextClass:m=""}=t,v=Cr(s),b=Sn(v,e,r),S=o===!0||v.length===0,A=ys({...l,class:St("yyt-custom-select",l.class),"data-yyt-custom-select":l["data-yyt-custom-select"]??"true","data-yyt-select-placeholder":r}),w=ys({type:"button",...d,class:St("yyt-select-trigger",d.class),"data-yyt-select-trigger":d["data-yyt-select-trigger"]??"true","aria-haspopup":d["aria-haspopup"]??"listbox","aria-expanded":d["aria-expanded"]??"false",disabled:S?!0:d.disabled}),M=ys({...u,class:St("yyt-select-dropdown",u.class),"data-yyt-select-dropdown":u["data-yyt-select-dropdown"]??"true",role:u.role??"listbox"}),I=a?(()=>{let k={...c,class:St(c.class),"data-yyt-select-native":c["data-yyt-select-native"]??"true",disabled:S?!0:c.disabled};return n==="select"?`<select ${ys(k)}>${v.map(Y=>`
            <option value="${x(Y.value)}" ${Y.value===String(b.value??"")?"selected":""} ${Y.disabled?"disabled":""}>${x(Y.label)}</option>
          `).join("")}</select>`:`<input ${ys({type:i,value:b.value,...k})}>`})():"";return`
    <div ${A}>
      ${I}
      <button ${w}>
        <span class="${x(St("yyt-select-value"))}" data-value="${x(b.value)}">${x(b.label)}</span>
        <i class="fa-solid fa-chevron-down yyt-select-arrow"></i>
      </button>
      <div ${M}>
        ${v.map(k=>{let N=k.value===String(b.value??"");return`
            <button ${ys({type:"button",...y,class:St("yyt-select-option",g,y.class,N?"yyt-selected":""),"data-yyt-select-option":y["data-yyt-select-option"]??"true","data-value":k.value,role:y.role??"option","aria-selected":N?"true":"false",disabled:k.disabled?!0:y.disabled})}>
              <span class="${x(St("yyt-option-text",m))}">${x(k.label)}</span>
            </button>
          `}).join("")}
      </div>
    </div>
  `}function ue(t,e="yytCustomSelect"){let s=D();if(!s||!B(t))return;let r=Tn(t),o=et(r);o.activeRoot&&t.has(o.activeRoot).length&&Pe(r),t.off(`.${e}`),s(r).off(`click.${e}`),s(r).off(`mousedown.${e}`),t.find('[data-yyt-enhanced-select="true"]').remove(),t.find(".yyt-native-select-bridge").each((a,n)=>{let i=s(n),l=i.attr("data-yyt-original-style");l!==void 0&&l?i.attr("style",l):i.removeAttr("style"),i.removeClass("yyt-native-select-bridge").removeAttr("data-yyt-original-style").removeAttr("data-yyt-select-key").removeData("yytCustomSelectOptions")})}function Se(t,e={}){let s=D();if(!s||!B(t))return;let{namespace:r="yytCustomSelect",selectors:o=[]}=e,a=Array.isArray(o)?o.filter(Boolean):[o].filter(Boolean);if(a.length===0)return;ue(t,r);let n=a.join(", "),i=Tn(t);t.find(n).each((l,c)=>{let d=s(c),u=String(d.attr("id")||"").trim(),y=u||`yyt-select-${Date.now()}-${l}`,g=u?`#${u}`:`[data-yyt-select-key="${y}"]`,m=`${y}-dropdown`,v=ed(d.attr("class")),b=d.attr("style"),S=d.find("option").map((M,I)=>{let k=s(I);return{value:String(k.attr("value")??k.val()??""),label:k.text(),disabled:k.is(":disabled")}}).get();d.attr("data-yyt-original-style",b??"").attr("data-yyt-select-key",y).addClass("yyt-native-select-bridge").css("display","none").data("yytCustomSelectOptions",S);let A=Pr({includeNative:!1,selectedValue:d.val(),options:S,disabled:d.is(":disabled"),placeholder:S[0]?.label||"\u8BF7\u9009\u62E9",rootAttributes:{class:St(v),style:b||void 0,"data-yyt-enhanced-select":"true","data-yyt-select-target":g},triggerAttributes:{id:`${y}-trigger`,"aria-controls":m},dropdownAttributes:{id:m}});d.after(A);let w=vn(t,d);Vo(t,w,d)}),t.on(`click.${r}`,"[data-yyt-select-trigger]",l=>{l.preventDefault(),l.stopPropagation();let c=s(l.currentTarget);if(c.prop("disabled"))return;let d=c.closest("[data-yyt-custom-select]");Ir(d)}),t.on(`change.${r}`,n,l=>{let c=s(l.currentTarget),d=c.find("option").map((y,g)=>{let m=s(g);return{value:String(m.attr("value")??m.val()??""),label:m.text(),disabled:m.is(":disabled")}}).get();c.data("yytCustomSelectOptions",d);let u=vn(t,c);Vo(t,u,c)}),s(i).off(`click.${r}`).on(`click.${r}`,l=>{if(Mn(l.target,i))return;let c=td(t);c?.length&&(Pe(i),c.filter(".yyt-open").removeClass("yyt-open").find("[data-yyt-select-trigger]").attr("aria-expanded","false"))}),s(i).off(`mousedown.${r}`,".yyt-select-portal-layer [data-yyt-select-option]").on(`mousedown.${r}`,".yyt-select-portal-layer [data-yyt-select-option]",l=>{l.preventDefault(),l.stopPropagation();let c=s(l.currentTarget);if(c.prop("disabled"))return;let d=nd(t,c);if(!d?.length)return;let u=_n(t,d);if(!u?.length)return;let y=String(c.attr("data-value")||"");u.val(y).trigger("change"),Vo(t,d,u),Ys(d)})}function qs(t,e=f){if(!D()||!B(t))return{url:"",apiKey:"",model:"",useMainApi:!0,stream:!1,max_tokens:4096,temperature:.7,top_p:.9};let r=t.find(`#${e}-model`).val()?.trim()||"",o=t.find(`#${e}-model-select`);return o.is(":visible")&&(r=o.val()||r),{url:t.find(`#${e}-api-url`).val()?.trim()||"",apiKey:t.find(`#${e}-api-key`).val()||"",model:r,useMainApi:t.find(`#${e}-use-main-api`).is(":checked"),stream:t.find(`#${e}-stream`).is(":checked"),max_tokens:parseInt(t.find(`#${e}-max-tokens`).val())||4096,temperature:parseFloat(t.find(`#${e}-temperature`).val())??.7,top_p:parseFloat(t.find(`#${e}-top-p`).val())??.9}}function Rr(t,e,s=f){if(!D()||!B(t)||!e)return;t.find(`#${s}-api-url`).val(e.url||""),t.find(`#${s}-api-key`).val(e.apiKey||""),t.find(`#${s}-model`).val(e.model||""),t.find(`#${s}-stream`).prop("checked",e.stream===!0),t.find(`#${s}-max-tokens`).val(e.max_tokens||4096),t.find(`#${s}-temperature`).val(e.temperature??.7),t.find(`#${s}-top-p`).val(e.top_p??.9);let o=e.useMainApi??!0;t.find(`#${s}-use-main-api`).prop("checked",o);let n=t.find(`#${s}-custom-api-fields`);o?n.addClass("yyt-disabled").find("input, button, select").prop("disabled",!0):n.removeClass("yyt-disabled").find("input, button, select").prop("disabled",!1),t.find(`#${s}-model`).show(),t.find(`#${s}-model-select`).hide()}function Gs(t){let{id:e,title:s,body:r,width:o="380px",wide:a=!1,dialogClass:n="",bodyClass:i="",footerClass:l=""}=t;return`
    <div class="yyt-dialog-overlay" id="${e}-overlay">
      <div class="yyt-dialog ${a?"yyt-dialog-wide":""} ${n}" style="${o!=="380px"?`width: ${o};`:""} max-height: calc(100vh - 32px);">
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
  `}function Vs(t,e,s={}){if(!D())return()=>{};let o=t.find(`#${e}-overlay`),a=()=>{o.remove(),s.onClose&&s.onClose()};return o.find(`#${e}-close, #${e}-cancel`).on("click",a),o.on("click",function(n){n.target===this&&a()}),o.find(`#${e}-save`).on("click",function(){s.onSave&&s.onSave(a)}),a}function ct(t,e){let s=new Blob([t],{type:"application/json"}),r=URL.createObjectURL(s),o=document.createElement("a");o.href=r,o.download=e,o.click(),URL.revokeObjectURL(r)}function dt(t){return new Promise((e,s)=>{let r=new FileReader;r.onload=o=>e(o.target.result),r.onerror=o=>s(new Error("\u6587\u4EF6\u8BFB\u53D6\u5931\u8D25")),r.readAsText(t)})}var f,Kt,xn,wn,Te=U(()=>{f="youyou_toolkit";Kt=null;xn=new WeakMap,wn="yyt-select-portal-layer"});var Js,de,Qo=U(()=>{fe();Te();Js=class{constructor(){this.components=new Map,this.activeInstances=new Map,this.dependencies={},this.currentTab="main",this.currentSubTab={},this.initialized=!1}init(e={}){this.initialized||(this.dependencies=e.services||{},this._subscribeEvents(),this.initialized=!0,$.emit(P.UI_INITIALIZED),console.log("[UIManager] \u521D\u59CB\u5316\u5B8C\u6210"))}register(e,s){return!e||!s?(console.warn("[UIManager] \u65E0\u6548\u7684\u7EC4\u4EF6\u6CE8\u518C"),!1):(this.components.set(e,{id:e,...s,render:s.render||(()=>""),bindEvents:s.bindEvents||(()=>{}),destroy:s.destroy||(()=>{}),getStyles:s.getStyles||(()=>"")}),!0)}unregister(e){this.destroyInstance(e),this.components.delete(e)}getComponent(e){return this.components.get(e)}render(e,s,r={}){let o=D();if(!o){console.error("[UIManager] jQuery\u4E0D\u53EF\u7528");return}let a=this.components.get(e);if(!a){console.error(`[UIManager] \u7EC4\u4EF6\u4E0D\u5B58\u5728: ${e}`),n?.length&&n.html(`<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u7EC4\u4EF6\u672A\u6CE8\u518C\uFF1A${e}</span></div>`);return}let n;if(typeof s=="string"?n=o(s):s&&s.jquery?n=s:s&&(n=o(s)),!B(n)){console.warn("[UIManager] \u5BB9\u5668\u4E0D\u5B58\u5728");return}this.activeInstances.forEach((i,l)=>{i?.container?.length&&n.length&&i.container[0]===n[0]&&l!==e&&this.destroyInstance(l)}),this.destroyInstance(e);try{if(typeof a.renderTo=="function")a.renderTo(n,{...r,dependencies:this.dependencies});else{let i=a.render({...r,dependencies:this.dependencies});n.html(i),a.bindEvents(n,this.dependencies)}}catch(i){console.error(`[UIManager] \u7EC4\u4EF6\u6E32\u67D3\u5931\u8D25: ${e}`,i),n.html(`<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u7EC4\u4EF6\u6E32\u67D3\u5931\u8D25\uFF1A${e}${i?.message?` - ${i.message}`:""}</span></div>`);return}this.activeInstances.set(e,{container:n,component:a,props:r}),$.emit(P.UI_RENDER_REQUESTED,{componentId:e})}destroyInstance(e){let s=this.activeInstances.get(e);s&&(s.component.destroy(s.container),this.activeInstances.delete(e))}destroyContainerInstance(e){let s=D();if(!s||!e)return;let r;if(typeof e=="string"?r=s(e):e?.jquery?r=e:r=s(e),!r?.length)return;let o=[];this.activeInstances.forEach((a,n)=>{a?.container?.length&&a.container[0]===r[0]&&o.push(n)}),o.forEach(a=>this.destroyInstance(a))}switchTab(e){let s=this.currentTab;this.currentTab=e,$.emit(P.UI_TAB_CHANGED,{tabId:e,oldTab:s})}getCurrentTab(){return this.currentTab}switchSubTab(e,s){this.currentSubTab[e]=s,$.emit(P.UI_SUBTAB_CHANGED,{mainTab:e,subTab:s})}getCurrentSubTab(e){return this.currentSubTab[e]||""}getAllStyles(){let e="";return this.components.forEach((s,r)=>{s.getStyles&&(e+=s.getStyles())}),e}injectStyles(e=document){let s="yyt-component-styles";if(e.getElementById(s))return;let r=e.createElement("style");r.id=s,r.textContent=this.getAllStyles(),(e.head||e.documentElement).appendChild(r)}setDependency(e,s){this.dependencies[e]=s}getDependency(e){return this.dependencies[e]}_subscribeEvents(){$.on(P.PRESET_UPDATED,()=>{}),$.on(P.TOOL_UPDATED,()=>{})}},de=new Js});function Le(t){return String(t||"").trim()}var Zo,Tt,ea=U(()=>{fe();Te();Ws();Hs();Zo="yytApiPresetPanelState";Tt={id:"apiPresetPanel",_getSelectedPresetName(t){if(!t?.length)return null;let e=t.data(Zo);return e?e.selectedPresetName:null},_setSelectedPresetName(t,e){t?.length&&t.data(Zo,{selectedPresetName:e===null?null:Le(e)})},_rerender(t){B(t)&&(Pe(t),this.renderTo(t))},_removeDialog(t){t?.length&&t.find(`#${f}-dialog-overlay`).remove()},render(t={}){let e=Fo(),s=e?.apiConfig||lt(),r=Le(e?.presetName||Mr()),o=wt(),a=jo(),n=t.selectedPresetName??null,l=a.slice(0,8),c=l.length>0?l.map(y=>this._renderPresetItem(y)).join(""):"",d=n===null?r||"":Le(n),u=d||"-- \u5F53\u524D\u914D\u7F6E --";return`
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
              <div class="yyt-custom-select" id="${f}-preset-dropdown">
                <div class="yyt-select-trigger">
                  <span class="yyt-select-value" data-value="${x(d)}">${x(u)}</span>
                  <i class="fa-solid fa-chevron-down yyt-select-arrow"></i>
                </div>
                <div class="yyt-select-dropdown">
                  <div class="yyt-select-option ${d?"":"yyt-selected"}" data-value="">
                    <span class="yyt-option-star yyt-placeholder"></span>
                    <span class="yyt-option-text">-- \u5F53\u524D\u914D\u7F6E --</span>
                    <span class="yyt-option-delete yyt-placeholder"></span>
                  </div>
                  ${o.length>0?o.map(y=>this._renderSelectOption(y,d)).join(""):""}
                </div>
              </div>
              <button class="yyt-btn yyt-btn-secondary" id="${f}-load-preset" title="\u52A0\u8F7D\u9009\u4E2D\u9884\u8BBE">
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
          <div class="yyt-panel-section">
            <div class="yyt-section-title">
              <i class="fa-solid fa-sliders"></i>
              <span>API\u914D\u7F6E</span>
              <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="${f}-save-as-preset" style="margin-left: auto;">
                <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u4E3A\u9884\u8BBE
              </button>
            </div>
            
            ${this._renderApiConfigForm(s)}
          </div>
          
          <!-- \u5E95\u90E8\u64CD\u4F5C\u533A -->
          <div class="yyt-panel-footer">
            <div class="yyt-footer-left">
              <button class="yyt-btn yyt-btn-secondary" id="${f}-import-presets">
                <i class="fa-solid fa-file-import"></i> \u5BFC\u5165
              </button>
              <button class="yyt-btn yyt-btn-secondary" id="${f}-export-presets">
                <i class="fa-solid fa-file-export"></i> \u5BFC\u51FA
              </button>
              <input type="file" id="${f}-import-file" accept=".json" style="display:none">
            </div>
            <div class="yyt-footer-right">
              <button class="yyt-btn yyt-btn-secondary" id="${f}-reset-api-config">
                <i class="fa-solid fa-undo"></i> \u91CD\u7F6E
              </button>
              <button class="yyt-btn yyt-btn-primary" id="${f}-save-api-config">
                <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u914D\u7F6E
              </button>
            </div>
          </div>
        </div>
      </div>
    `},_renderPresetItem(t){return`
      <div class="yyt-preset-item" data-preset-name="${x(t.name)}">
        <div class="yyt-preset-info">
          <div class="yyt-preset-name">${x(t.name)}</div>
          <div class="yyt-preset-meta">
            ${t.apiConfig.useMainApi?'<span class="yyt-badge yyt-badge-small">\u4E3BAPI</span>':`<span class="yyt-badge yyt-badge-small">${x(t.apiConfig.model||"\u672A\u8BBE\u7F6E")}</span>`}
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
      <div class="yyt-select-option ${t.name===e?"yyt-selected":""}" data-value="${x(t.name)}">
        <button class="${r}" data-preset="${x(t.name)}" title="${s?"\u70B9\u51FB\u53D6\u6D88\u661F\u6807":"\u70B9\u51FB\u6DFB\u52A0\u661F\u6807"}">${o}</button>
        <span class="yyt-option-text">${x(t.name)}</span>
        <button class="yyt-option-delete" data-action="delete" data-preset="${x(t.name)}" title="\u5220\u9664\u9884\u8BBE">
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
            <input type="checkbox" id="${f}-use-main-api" ${t.useMainApi?"checked":""}>
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
            <input type="checkbox" id="${f}-stream" ${t.stream===!0?"checked":""}>
            <span class="yyt-toggle-slider"></span>
          </label>
        </div>
      </div>

      <div id="${f}-custom-api-fields" class="${t.useMainApi?"yyt-disabled":""}">
        <div class="yyt-form-row">
          <div class="yyt-form-group yyt-flex-1">
            <label>API URL</label>
            <input type="text" class="yyt-input" id="${f}-api-url" 
                   value="${x(t.url||"")}" 
                   placeholder="https://api.openai.com/v1/chat/completions">
          </div>
        </div>
        
        <div class="yyt-form-row">
          <div class="yyt-form-group yyt-flex-1">
            <label>API Key</label>
            <div class="yyt-input-group">
              <input type="password" class="yyt-input" id="${f}-api-key" 
                     value="${x(t.apiKey||"")}" 
                     placeholder="sk-...">
              <button class="yyt-btn yyt-btn-icon" id="${f}-toggle-key-visibility" title="\u663E\u793A/\u9690\u85CF">
                <i class="fa-solid fa-eye"></i>
              </button>
            </div>
          </div>
        </div>
        
        <div class="yyt-form-row">
          <div class="yyt-form-group yyt-flex-1">
            <label>\u6A21\u578B</label>
            <div class="yyt-model-row">
              <input type="text" class="yyt-input yyt-model-input" id="${f}-model" 
                     value="${x(t.model||"")}" 
                     placeholder="gpt-4">
              <select class="yyt-select yyt-model-select" id="${f}-model-select" style="display: none;">
              </select>
              <button class="yyt-btn yyt-btn-secondary yyt-model-btn" id="${f}-load-models" title="\u83B7\u53D6\u6A21\u578B\u5217\u8868">
                <i class="fa-solid fa-sync-alt"></i>
              </button>
            </div>
          </div>
        </div>
        
        <div class="yyt-form-row yyt-form-row-2col">
          <div class="yyt-form-group">
            <label>Max Tokens</label>
            <input type="number" class="yyt-input" id="${f}-max-tokens" 
                   value="${t.max_tokens||4096}" min="1" max="128000">
          </div>
          
          <div class="yyt-form-group">
            <label>Temperature</label>
            <input type="number" class="yyt-input" id="${f}-temperature" 
                   value="${t.temperature??.7}" min="0" max="2" step="0.1">
          </div>
        </div>
        
        <div class="yyt-form-row">
          <div class="yyt-form-group yyt-flex-1">
            <label>Top P</label>
            <input type="number" class="yyt-input" id="${f}-top-p" 
                   value="${t.top_p??.9}" min="0" max="1" step="0.1">
          </div>
        </div>
      </div>
    `},bindEvents(t,e){let s=D();!s||!B(t)||(this._bindDropdownEvents(t,s),this._bindPresetListEvents(t,s),this._bindApiConfigEvents(t,s),this._bindFileEvents(t,s))},_bindDropdownEvents(t,e){let s=t.find(`#${f}-preset-dropdown`),r=s.find(".yyt-select-trigger"),o=s.find(".yyt-select-value"),a=()=>{let n=Le(o.data("value"));if(!n){this._setSelectedPresetName(t,""),Bt(""),Rr(t,lt(),f),t.find(".yyt-preset-item").removeClass("yyt-loaded"),s.find(".yyt-select-option").removeClass("yyt-selected"),s.find('.yyt-select-option[data-value=""]').addClass("yyt-selected"),_("info","\u5DF2\u5207\u6362\u5230\u5F53\u524DAPI\u914D\u7F6E");return}let i=Lt(n);if(!i){_("error",`\u9884\u8BBE "${n}" \u4E0D\u5B58\u5728`);return}this._setSelectedPresetName(t,n),Bt(n),Rr(t,i.apiConfig,f),t.find(".yyt-preset-item").removeClass("yyt-loaded"),t.find(`.yyt-preset-item[data-preset-name="${n.replace(/"/g,"&quot;")}"]`).addClass("yyt-loaded"),s.find(".yyt-select-option").removeClass("yyt-selected"),s.find(`.yyt-select-option[data-value="${n.replace(/"/g,"&quot;")}"]`).addClass("yyt-selected"),_("info",`\u5DF2\u52A0\u8F7D\u9884\u8BBE "${n}"\uFF0C\u4FEE\u6539\u540E\u70B9\u51FB\u201C\u4FDD\u5B58\u914D\u7F6E\u201D\u4F1A\u8986\u76D6\u8BE5\u9884\u8BBE`)};r.on("click",n=>{n.preventDefault(),n.stopPropagation(),Ir(s)}),s.find(".yyt-select-option").on("click",n=>{if(e(n.target).closest(".yyt-option-star, .yyt-option-delete").length)return;let i=e(n.currentTarget),l=Le(i.data("value")),c=i.find(".yyt-option-text").text(),d=i.closest(".yyt-select-dropdown").find(".yyt-select-option");this._setSelectedPresetName(t,l),o.text(c).data("value",l),d.removeClass("yyt-selected"),i.addClass("yyt-selected"),Ys(s)}),t.find(`#${f}-load-preset`).on("click",()=>{a()}),s.find(".yyt-option-star").on("click",n=>{n.preventDefault(),n.stopPropagation();let i=Le(e(n.currentTarget).data("preset"));if(!i)return;let l=Wo(i);l.success?(_("success",l.message),this._rerender(t)):_("error",l.message)}),s.find(".yyt-option-delete").on("click",n=>{n.preventDefault(),n.stopPropagation();let i=Le(e(n.currentTarget).data("preset"));if(!i||!confirm(`\u786E\u5B9A\u8981\u5220\u9664\u9884\u8BBE "${i}" \u5417\uFF1F`))return;let l=Fs(i);_(l.success?"info":"error",l.message),l.success&&($.emit(P.PRESET_DELETED,{name:i}),Le(this._getSelectedPresetName(t))===i&&this._setSelectedPresetName(t,""),Le(o.data("value"))===i&&o.text("-- \u5F53\u524D\u914D\u7F6E --").data("value",""),this._rerender(t))})},_bindPresetListEvents(t,e){t.find(".yyt-preset-item").on("click",s=>{let r=e(s.currentTarget),o=Le(r.data("preset-name")),a=e(s.target).closest("[data-action]").data("action");if(a)switch(s.stopPropagation(),a){case"load":this._setSelectedPresetName(t,o),t.find(".yyt-select-value").text(o).data("value",o),t.find(".yyt-select-option").removeClass("yyt-selected"),t.find(`.yyt-select-option[data-value="${o.replace(/"/g,"&quot;")}"]`).addClass("yyt-selected"),t.find(`#${f}-load-preset`).trigger("click");break;case"delete":if(confirm(`\u786E\u5B9A\u8981\u5220\u9664\u9884\u8BBE "${o}" \u5417\uFF1F`)){let n=Fs(o);_(n.success?"info":"error",n.message),n.success&&($.emit(P.PRESET_DELETED,{name:o}),Le(this._getSelectedPresetName(t))===o&&this._setSelectedPresetName(t,""),this._rerender(t))}break}})},_bindApiConfigEvents(t,e){t.find(`#${f}-use-main-api`).on("change",function(){let s=e(this).is(":checked"),r=t.find(`#${f}-custom-api-fields`);s?r.addClass("yyt-disabled").find("input, button, select").prop("disabled",!0):r.removeClass("yyt-disabled").find("input, button, select").prop("disabled",!1)}),t.find(`#${f}-toggle-key-visibility`).on("click",function(){let s=t.find(`#${f}-api-key`),r=s.attr("type");s.attr("type",r==="password"?"text":"password"),e(this).find("i").toggleClass("fa-eye fa-eye-slash")}),t.find(`#${f}-load-models`).on("click",async()=>{let s=t.find(`#${f}-load-models`),r=t.find(`#${f}-model`),o=t.find(`#${f}-model-select`);s.prop("disabled",!0).find("i").addClass("fa-spin");try{let a=qs(t,f),n=await zo(a);if(n.length>0){o.empty(),n.forEach(l=>{o.append(`<option value="${x(l)}">${x(l)}</option>`)}),r.hide(),o.show();let i=r.val();i&&n.includes(i)&&o.val(i),o.off("change").on("change",function(){r.val(e(this).val())}),_("success",`\u5DF2\u52A0\u8F7D ${n.length} \u4E2A\u6A21\u578B`)}else _("warning","\u672A\u80FD\u83B7\u53D6\u6A21\u578B\u5217\u8868\uFF0C\u8BF7\u624B\u52A8\u8F93\u5165")}catch(a){_("error",`\u52A0\u8F7D\u6A21\u578B\u5931\u8D25: ${a.message}`)}finally{s.prop("disabled",!1).find("i").removeClass("fa-spin")}}),t.find(`#${f}-model`).on("focus",function(){let s=t.find(`#${f}-model-select`);e(this).show(),s.hide()}),t.find(`#${f}-save-api-config`).on("click",()=>{let s=qs(t,f),r=Le(Mr()),o=us(s);if(!o.valid&&!s.useMainApi){_("error",o.errors.join(", "));return}if(r){if(!confirm(`\u662F\u5426\u8981\u8986\u76D6\u9884\u8BBE "${r}" \u7684\u914D\u7F6E\uFF1F

\u70B9\u51FB"\u786E\u5B9A"\u8986\u76D6\u9884\u8BBE\uFF0C\u70B9\u51FB"\u53D6\u6D88"\u4EC5\u4FDD\u5B58\u5F53\u524D\u914D\u7F6E\u5E76\u5207\u6362\u5230\u201C\u5F53\u524D\u914D\u7F6E\u201D`)){ds(s),Bt(""),this._setSelectedPresetName(t,""),_("success","API\u914D\u7F6E\u5DF2\u4FDD\u5B58\uFF0C\u5E76\u5DF2\u5207\u6362\u5230\u5F53\u524DAPI\u914D\u7F6E"),this._rerender(t);return}ds(s);let a=Uo(r,{apiConfig:s});a.success?(this._setSelectedPresetName(t,r),_("success",`\u914D\u7F6E\u5DF2\u4FDD\u5B58\u5E76\u8986\u76D6\u9884\u8BBE "${r}"`),Bt(r),$.emit(P.PRESET_UPDATED,{name:r}),this._rerender(t)):_("error",a.message);return}ds(s),_("success","API\u914D\u7F6E\u5DF2\u4FDD\u5B58")}),t.find(`#${f}-reset-api-config`).on("click",()=>{confirm("\u786E\u5B9A\u8981\u91CD\u7F6EAPI\u914D\u7F6E\u5417\uFF1F")&&(Bt(""),this._setSelectedPresetName(t,""),ds({url:"",apiKey:"",model:"",useMainApi:!0,stream:!1,max_tokens:4096,temperature:.7,top_p:.9}),this._rerender(t),_("info","API\u914D\u7F6E\u5DF2\u91CD\u7F6E"))}),t.find(`#${f}-save-as-preset`).on("click",()=>{this._showSavePresetDialog(t,e)})},_bindFileEvents(t,e){t.find(`#${f}-export-presets`).on("click",()=>{try{let s=Ho();ct(s,`youyou_toolkit_presets_${Date.now()}.json`),_("success","\u9884\u8BBE\u5DF2\u5BFC\u51FA")}catch(s){_("error",`\u5BFC\u51FA\u5931\u8D25: ${s.message}`)}}),t.find(`#${f}-import-presets`).on("click",()=>{t.find(`#${f}-import-file`).click()}),t.find(`#${f}-import-file`).on("change",async s=>{let r=s.target.files[0];if(r){try{let o=await dt(r),a=Yo(o,{overwrite:!0});_(a.success?"success":"error",a.message),a.imported>0&&this._rerender(t)}catch(o){_("error",`\u5BFC\u5165\u5931\u8D25: ${o.message}`)}e(s.target).val("")}})},_showSavePresetDialog(t,e){let r=wt().map(d=>d.name),o=qo("\u65B0\u9884\u8BBE"),a=`
      <div class="yyt-dialog-overlay" id="${f}-dialog-overlay">
        <div class="yyt-dialog">
          <div class="yyt-dialog-header">
            <span class="yyt-dialog-title">\u4FDD\u5B58\u4E3A\u65B0\u9884\u8BBE</span>
            <button class="yyt-dialog-close" id="${f}-dialog-close">
              <i class="fa-solid fa-times"></i>
            </button>
          </div>
          <div class="yyt-dialog-body">
            <div class="yyt-form-group">
              <label>\u9884\u8BBE\u540D\u79F0</label>
              <input type="text" class="yyt-input" id="${f}-dialog-preset-name"
                     value="${x(o)}" placeholder="\u8F93\u5165\u9884\u8BBE\u540D\u79F0">
            </div>
            <div class="yyt-form-group">
              <label>\u63CF\u8FF0\uFF08\u53EF\u9009\uFF09</label>
              <textarea class="yyt-textarea" id="${f}-dialog-preset-desc" rows="2"
                        placeholder="\u9884\u8BBE\u63CF\u8FF0..."></textarea>
            </div>
          </div>
          <div class="yyt-dialog-footer">
            <button class="yyt-btn yyt-btn-secondary" id="${f}-dialog-cancel">\u53D6\u6D88</button>
            <button class="yyt-btn yyt-btn-primary" id="${f}-dialog-save">\u4FDD\u5B58</button>
          </div>
        </div>
      </div>
    `;this._removeDialog(t),t.append(a);let n=t.find(`#${f}-dialog-overlay`),i=n.find(`#${f}-dialog-preset-name`),l=n.find(`#${f}-dialog-preset-desc`);i.focus().select();let c=()=>n.remove();n.find(`#${f}-dialog-close, #${f}-dialog-cancel`).on("click",c),n.on("click",function(d){d.target===this&&c()}),n.find(`#${f}-dialog-save`).on("click",()=>{let d=i.val().trim(),u=l.val().trim();if(!d){_("warning","\u8BF7\u8F93\u5165\u9884\u8BBE\u540D\u79F0"),i.focus();return}if(r.includes(d)){if(!confirm(`\u9884\u8BBE "${d}" \u5DF2\u5B58\u5728\uFF0C\u662F\u5426\u8986\u76D6\uFF1F`))return;Fs(d),$.emit(P.PRESET_DELETED,{name:d})}let y=qs(t,f),g=Er({name:d,description:u,apiConfig:y});g.success?(_("success",g.message),this._setSelectedPresetName(t,d),c(),$.emit(P.PRESET_CREATED,{preset:g.preset}),this._rerender(t)):_("error",g.message)}),i.on("keypress",function(d){d.which===13&&n.find(`#${f}-dialog-save`).click()})},destroy(t){!D()||!B(t)||(this._removeDialog(t),Pe(t),t.removeData(Zo),t.off())},getStyles(){return`
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
    `},renderTo(t){let e=this.render({selectedPresetName:this._getSelectedPresetName(t)});t.html(e),this.bindEvents(t,{})}}});var zn={};pe(zn,{MESSAGE_MACROS:()=>Kn,addTagRule:()=>ps,createRuleTemplate:()=>Dn,default:()=>cd,deleteRulePreset:()=>Ln,deleteRuleTemplate:()=>Nn,deleteTagRule:()=>Lr,escapeRegex:()=>Ut,exportRulesConfig:()=>Ur,extractComplexTag:()=>Cn,extractCurlyBraceTag:()=>aa,extractHtmlFormatTag:()=>Pn,extractSimpleTag:()=>oa,extractTagContent:()=>Wt,generateTagSuggestions:()=>Or,getAllRulePresets:()=>Kr,getAllRuleTemplates:()=>Rn,getContentBlacklist:()=>jt,getRuleTemplate:()=>$n,getTagRules:()=>ut,importRulesConfig:()=>Wr,isValidTagName:()=>ra,loadRulePreset:()=>zr,saveRulesAsPreset:()=>Br,scanTextForTags:()=>Dr,setContentBlacklist:()=>Xs,setTagRules:()=>Nr,shouldSkipContent:()=>sa,testRegex:()=>Bn,updateRuleTemplate:()=>On,updateTagRule:()=>gs});function id(){return{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"},ruleTemplates:[...ta],tagRules:[],contentBlacklist:[],tagRulePresets:{}}}function Re(){return C.get(In,id())}function tt(t){C.set(In,t)}function $r(){let t=Re();return ve=t.ruleTemplates||[...ta],se=t.tagRules||[],Ie=t.contentBlacklist||[],{ruleTemplates:ve,tagRules:se,contentBlacklist:Ie}}function Ut(t){return typeof t!="string"?"":t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function sa(t,e){if(!e||e.length===0||!t||typeof t!="string")return!1;let s=t.toLowerCase();return e.some(r=>{let o=r.trim().toLowerCase();return o&&s.includes(o)})}function ra(t){return!t||typeof t!="string"?!1:/^[a-zA-Z][a-zA-Z0-9_-]*$/.test(t)&&!ld.includes(t.toLowerCase())}function oa(t,e){if(!t||!e)return[];let s=[],r=Ut(e),o=new RegExp(`<${r}>([\\s\\S]*?)<\\/${r}>`,"gi");[...t.matchAll(o)].forEach(l=>{l[1]&&s.push(l[1].trim())});let n=(t.match(new RegExp(`<${r}>`,"gi"))||[]).length,i=(t.match(new RegExp(`<\\/${r}>`,"gi"))||[]).length;return n>i&&console.warn(`[YouYouToolkit] \u8B66\u544A: \u53D1\u73B0 ${n-i} \u4E2A\u672A\u95ED\u5408\u7684 <${e}> \u6807\u7B7E`),s}function aa(t,e){if(!t||!e)return[];let s=[],r=Ut(e),o=new RegExp(`\\{${r}\\|`,"gi"),a;for(;(a=o.exec(t))!==null;){let n=a.index,i=n+a[0].length,l=1,c=i;for(;c<t.length&&l>0;)t[c]==="{"?l++:t[c]==="}"&&l--,c++;if(l===0){let d=t.substring(i,c-1);d.trim()&&s.push(d.trim())}o.lastIndex=n+1}return s}function Cn(t,e){if(!t||!e)return[];let s=e.split(",");if(s.length!==2)return console.error(`[YouYouToolkit] \u590D\u6742\u6807\u7B7E\u914D\u7F6E\u683C\u5F0F\u9519\u8BEF\uFF0C\u5E94\u8BE5\u5305\u542B\u4E00\u4E2A\u9017\u53F7: ${e}`),[];let r=s[0].trim(),o=s[1].trim(),a=o.match(/<\/(\w+)>/);if(!a)return console.error(`[YouYouToolkit] \u65E0\u6CD5\u89E3\u6790\u7ED3\u675F\u6807\u7B7E: ${o}`),[];let n=a[1],i=new RegExp(`${Ut(r)}([\\s\\S]*?)<\\/${n}>`,"gi"),l=[];return[...t.matchAll(i)].forEach(d=>{d[1]&&l.push(d[1].trim())}),l}function Pn(t,e){if(!t||!e)return[];let s=e.match(/<(\w+)(?:\s[^>]*)?>/);if(!s)return console.error(`[YouYouToolkit] \u65E0\u6CD5\u89E3\u6790HTML\u683C\u5F0F\u6807\u7B7E: ${e}`),[];let r=s[1],o=[],a=new RegExp(`<${r}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${r}>`,"gi");[...t.matchAll(a)].forEach(c=>{c[1]&&o.push(c[1].trim())});let i=(t.match(new RegExp(`<${r}(?:\\s[^>]*)?>`,"gi"))||[]).length,l=(t.match(new RegExp(`<\\/${r}>`,"gi"))||[]).length;return i>l&&console.warn(`[YouYouToolkit] \u8B66\u544A: \u53D1\u73B0 ${i-l} \u4E2A\u672A\u95ED\u5408\u7684 <${r}> \u6807\u7B7E`),o}function Wt(t,e,s=[]){if(!t)return"";if(!e||e.length===0)return t;let r=e.filter(d=>d.type==="exclude"&&d.enabled),o=e.filter(d=>(d.type==="include"||d.type==="regex_include")&&d.enabled),a=e.filter(d=>d.type==="regex_exclude"&&d.enabled),n=t;for(let d of r)try{let u=new RegExp(`<${Ut(d.value)}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${Ut(d.value)}>`,"gi");n=n.replace(u,"")}catch(u){console.error("[YouYouToolkit] Error applying block exclusion rule:",{rule:d,error:u})}let i=[];if(o.length>0)for(let d of o){let u=[];try{if(d.type==="include")u.push(...oa(n,d.value)),u.push(...aa(n,d.value));else if(d.type==="regex_include"){let y=new RegExp(d.value,"gi");[...n.matchAll(y)].forEach(m=>{m[1]&&u.push(m[1])})}}catch(y){console.error("[YouYouToolkit] Error applying inclusion rule:",{rule:d,error:y})}u.forEach(y=>i.push(y.trim()))}else i.push(n);let l=[];for(let d of i){for(let u of a)try{let y=new RegExp(u.value,"gi");d=d.replace(y,"")}catch(y){console.error("[YouYouToolkit] Error applying cleanup rule:",{rule:u,error:y})}sa(d,s)||l.push(d)}return l.join(`

`).replace(/\n\s*\n\s*\n/g,`

`).replace(/^\s+|\s+$/g,"").trim()}async function Dr(t,e={}){let s=performance.now(),{chunkSize:r=5e4,maxTags:o=100,timeoutMs:a=5e3}=e,n=new Set,i=/<(?:\/|)([a-zA-Z0-9_-]+)(?:[^>]*)>|\{([a-zA-Z0-9_-]+)(?:\||})/g,l=0,c=0;for(let u=0;u<t.length;u+=r){let y=t.slice(u,Math.min(u+r,t.length));if(c++,l+=y.length,performance.now()-s>a){console.warn(`[YouYouToolkit] Tag scanning timed out after ${a}ms`);break}let g;for(;(g=i.exec(y))!==null&&n.size<o;){let m=(g[1]||g[2]).toLowerCase();ra(m)&&n.add(m)}if(n.size>=o)break;c%5===0&&await new Promise(m=>setTimeout(m,0))}let d=performance.now();return{tags:Array.from(n).sort(),stats:{processingTimeMs:Math.round(d-s),processedChars:l,totalChars:t.length,chunkCount:c,tagsFound:n.size}}}function Or(t,e=25){let s=t.tags.slice(0,e);return{suggestions:s,stats:{totalFound:t.stats.tagsFound,finalCount:s.length}}}function Rn(){return ve.length===0&&$r(),ve}function $n(t){return ve.find(e=>e.id===t)}function Dn(t){let e={id:`rule-${Date.now()}`,name:t.name||"\u65B0\u89C4\u5219",description:t.description||"",type:t.type||"include",value:t.value||"",enabled:t.enabled!==!1,createdAt:new Date().toISOString()};return ve.push(e),na(),{success:!0,template:e,message:"\u89C4\u5219\u6A21\u677F\u521B\u5EFA\u6210\u529F"}}function On(t,e){let s=ve.findIndex(r=>r.id===t);return s===-1?{success:!1,message:"\u89C4\u5219\u6A21\u677F\u4E0D\u5B58\u5728"}:(ve[s]={...ve[s],...e,updatedAt:new Date().toISOString()},na(),{success:!0,template:ve[s],message:"\u89C4\u5219\u6A21\u677F\u66F4\u65B0\u6210\u529F"})}function Nn(t){let e=ve.findIndex(s=>s.id===t);return e===-1?{success:!1,message:"\u89C4\u5219\u6A21\u677F\u4E0D\u5B58\u5728"}:(ve.splice(e,1),na(),{success:!0,message:"\u89C4\u5219\u6A21\u677F\u5DF2\u5220\u9664"})}function na(){let t=Re();t.ruleTemplates=ve,tt(t)}function ut(){return se||$r(),se}function Nr(t){se=t||[];let e=Re();e.tagRules=se,tt(e)}function ps(t){let e={id:`tag-${Date.now()}`,type:t.type||"include",value:t.value||"",enabled:t.enabled!==!1};se.push(e);let s=Re();return s.tagRules=se,tt(s),{success:!0,rule:e,message:"\u89C4\u5219\u6DFB\u52A0\u6210\u529F"}}function gs(t,e){if(t<0||t>=se.length)return{success:!1,message:"\u89C4\u5219\u7D22\u5F15\u65E0\u6548"};se[t]={...se[t],...e};let s=Re();return s.tagRules=se,tt(s),{success:!0,rule:se[t],message:"\u89C4\u5219\u66F4\u65B0\u6210\u529F"}}function Lr(t){if(t<0||t>=se.length)return{success:!1,message:"\u89C4\u5219\u7D22\u5F15\u65E0\u6548"};se.splice(t,1);let e=Re();return e.tagRules=se,tt(e),{success:!0,message:"\u89C4\u5219\u5DF2\u5220\u9664"}}function jt(){return Ie||$r(),Ie}function Xs(t){Ie=t||[];let e=Re();e.contentBlacklist=Ie,tt(e)}function Br(t,e=""){if(!t||!t.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let s=Re();s.tagRulePresets||(s.tagRulePresets={});let r=`preset-${Date.now()}`;return s.tagRulePresets[r]={id:r,name:t.trim(),description:e.trim(),rules:JSON.parse(JSON.stringify(se)),blacklist:JSON.parse(JSON.stringify(Ie)),createdAt:new Date().toISOString()},tt(s),{success:!0,preset:s.tagRulePresets[r],message:"\u9884\u8BBE\u4FDD\u5B58\u6210\u529F"}}function Kr(){let e=Re().tagRulePresets||{};return Object.values(e)}function zr(t){let e=Re(),r=(e.tagRulePresets||{})[t];return r?(se=JSON.parse(JSON.stringify(r.rules||[])),Ie=JSON.parse(JSON.stringify(r.blacklist||[])),e.tagRules=se,e.contentBlacklist=Ie,tt(e),{success:!0,preset:r,message:"\u9884\u8BBE\u52A0\u8F7D\u6210\u529F"}):{success:!1,message:"\u9884\u8BBE\u4E0D\u5B58\u5728"}}function Ln(t){let e=Re(),s=e.tagRulePresets||{};return s[t]?(delete s[t],e.tagRulePresets=s,tt(e),{success:!0,message:"\u9884\u8BBE\u5DF2\u5220\u9664"}):{success:!1,message:"\u9884\u8BBE\u4E0D\u5B58\u5728"}}function Ur(){return JSON.stringify({tagRules:se,contentBlacklist:Ie,ruleTemplates:ve,tagRulePresets:Re().tagRulePresets||{}},null,2)}function Wr(t,e={overwrite:!0}){try{let s=JSON.parse(t);if(e.overwrite)se=s.tagRules||[],Ie=s.contentBlacklist||[],ve=s.ruleTemplates||ta;else if(s.tagRules&&se.push(...s.tagRules),s.contentBlacklist){let o=new Set(Ie.map(a=>a.toLowerCase()));s.contentBlacklist.forEach(a=>{o.has(a.toLowerCase())||Ie.push(a)})}let r=Re();return r.tagRules=se,r.contentBlacklist=Ie,r.ruleTemplates=ve,s.tagRulePresets&&(r.tagRulePresets={...r.tagRulePresets||{},...s.tagRulePresets}),tt(r),{success:!0,message:"\u914D\u7F6E\u5BFC\u5165\u6210\u529F"}}catch(s){return{success:!1,message:`\u5BFC\u5165\u5931\u8D25: ${s.message}`}}}function Bn(t,e,s="g",r=0){try{if(!t||typeof t!="string")return{success:!1,error:"\u6B63\u5219\u8868\u8FBE\u5F0F\u4E0D\u80FD\u4E3A\u7A7A",matches:[]};let o=new RegExp(t,s),a=[];if(s.includes("g")){let n;for(;(n=o.exec(e))!==null;)n.length>1?a.push({fullMatch:n[0],groups:n.slice(1),index:n.index,extracted:n[r]||n[1]||n[0]}):a.push({fullMatch:n[0],groups:[],index:n.index,extracted:n[0]})}else{let n=o.exec(e);n&&a.push({fullMatch:n[0],groups:n.length>1?n.slice(1):[],index:n.index,extracted:n.length>1?n[r]||n[1]:n[0]})}return{success:!0,matches:a,count:a.length,extracted:a.map(n=>n.extracted)}}catch(o){return{success:!1,error:o.message,matches:[]}}}var In,ld,ta,ve,se,Ie,Kn,cd,jr=U(()=>{Ne();In="settings";ld=["font","span","div","p","br","hr","img","a","b","i","u","s","em","strong","small","big","sub","sup","h1","h2","h3","h4","h5","h6","table","tr","td","th","tbody","thead","tfoot","ul","ol","li","form","input","button","select","option","textarea","label","script","style","meta","link","title","head","body","html"],ta=[{id:"exclude-thinking",name:"\u6392\u9664\u601D\u8003\u6807\u7B7E",description:"\u79FB\u9664<thinking>\u6807\u7B7E\u5757",type:"exclude",value:"thinking",enabled:!0},{id:"include-content",name:"\u63D0\u53D6\u5185\u5BB9\u6807\u7B7E",description:"\u63D0\u53D6<content>\u6807\u7B7E\u5185\u5BB9",type:"include",value:"content",enabled:!0},{id:"regex-exclude-cot",name:"\u6392\u9664\u5C0FCoT",description:"\u79FB\u9664HTML\u6CE8\u91CA",type:"regex_exclude",value:"<!--[\\s\\S]*?-->",enabled:!1},{id:"regex-include-details",name:"\u63D0\u53D6details\u6807\u7B7E",description:"\u63D0\u53D6<details>\u6807\u7B7E\u5185\u5BB9",type:"regex_include",value:"<details[^>]*>([\\s\\S]*?)</details>",enabled:!1}],ve=[],se=[],Ie=[];Kn={lastMessage:{macro:"{{lastMessage}}",description:"\u6700\u540E\u4E00\u6761\u6D88\u606F"},lastCharMessage:{macro:"{{lastCharMessage}}",description:"\u6700\u540E\u4E00\u6761\u89D2\u8272\u6D88\u606F"},lastUserMessage:{macro:"{{lastUserMessage}}",description:"\u6700\u540E\u4E00\u6761\u7528\u6237\u6D88\u606F"},char:{macro:"{{char}}",description:"\u89D2\u8272\u540D\u79F0"},user:{macro:"{{user}}",description:"\u7528\u6237\u540D\u79F0"},input:{macro:"{{input}}",description:"\u5F53\u524D\u8F93\u5165\u6846\u5185\u5BB9"}};$r();cd={extractTagContent:Wt,extractSimpleTag:oa,extractCurlyBraceTag:aa,extractComplexTag:Cn,extractHtmlFormatTag:Pn,escapeRegex:Ut,shouldSkipContent:sa,isValidTagName:ra,scanTextForTags:Dr,generateTagSuggestions:Or,getAllRuleTemplates:Rn,getRuleTemplate:$n,createRuleTemplate:Dn,updateRuleTemplate:On,deleteRuleTemplate:Nn,getTagRules:ut,setTagRules:Nr,addTagRule:ps,updateTagRule:gs,deleteTagRule:Lr,getContentBlacklist:jt,setContentBlacklist:Xs,saveRulesAsPreset:Br,getAllRulePresets:Kr,loadRulePreset:zr,deleteRulePreset:Ln,exportRulesConfig:Ur,importRulesConfig:Wr,testRegex:Bn,MESSAGE_MACROS:Kn}});var Ft,ia=U(()=>{fe();Te();jr();Ft={id:"regexExtractPanel",render(t){let e=ut(),s=jt(),r=Kr();return`
      <div class="yyt-regex-panel">
        <!-- \u89C4\u5219\u7F16\u8F91\u533A -->
        <div class="yyt-panel-section">
          <div class="yyt-section-title">
            <i class="fa-solid fa-filter"></i>
            <span>\u6807\u7B7E\u63D0\u53D6\u89C4\u5219</span>
            <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="${f}-show-examples" style="margin-left: auto;">
              <i class="fa-solid fa-lightbulb"></i> \u67E5\u770B\u793A\u4F8B
            </button>
          </div>
          
          ${this._renderRulesEditor(e,s,r)}
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
            <button class="yyt-btn yyt-btn-secondary" id="${f}-import-rules">
              <i class="fa-solid fa-file-import"></i> \u5BFC\u5165
            </button>
            <button class="yyt-btn yyt-btn-secondary" id="${f}-export-rules">
              <i class="fa-solid fa-file-export"></i> \u5BFC\u51FA
            </button>
            <input type="file" id="${f}-import-rules-file" accept=".json" style="display:none">
          </div>
          <div class="yyt-footer-right">
            <button class="yyt-btn yyt-btn-secondary" id="${f}-reset-rules">
              <i class="fa-solid fa-undo"></i> \u91CD\u7F6E
            </button>
          </div>
        </div>
        
        <!-- \u6807\u7B7E\u626B\u63CF\u7ED3\u679C\u5BB9\u5668 -->
        <div id="${f}-tag-suggestions-container" style="display: none;">
          <div class="yyt-tag-suggestions">
            <div class="yyt-tag-suggestions-header">
              <span>\u53D1\u73B0\u7684\u6807\u7B7E:</span>
              <span id="${f}-tag-scan-stats"></span>
            </div>
            <div class="yyt-tag-list" id="${f}-tag-list"></div>
          </div>
        </div>
      </div>
    `},_renderRulesEditor(t,e,s){let r=t.length>0?t.map((a,n)=>this._renderRuleItem(a,n)).join(""):'<div class="yyt-empty-state-small"><i class="fa-solid fa-filter"></i><span>\u6CA1\u6709\u5B9A\u4E49\u4EFB\u4F55\u63D0\u53D6\u89C4\u5219</span></div>',o=s.length>0?s.map(a=>`<option value="${a.id}">${x(a.name)}</option>`).join(""):"";return`
      <div class="yyt-tag-rules-editor">
        ${o?`
        <div class="yyt-form-row">
          <select class="yyt-select yyt-flex-1" id="${f}-rule-preset-select">
            <option value="">-- \u9009\u62E9\u9884\u8BBE --</option>
            ${o}
          </select>
          <button class="yyt-btn yyt-btn-secondary" id="${f}-load-rule-preset">
            <i class="fa-solid fa-download"></i> \u52A0\u8F7D
          </button>
          <button class="yyt-btn yyt-btn-secondary" id="${f}-save-rule-preset">
            <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u9884\u8BBE
          </button>
        </div>
        `:`
        <div class="yyt-form-row">
          <button class="yyt-btn yyt-btn-secondary" id="${f}-save-rule-preset">
            <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u4E3A\u9884\u8BBE
          </button>
        </div>
        `}
        
        <div class="yyt-rules-list">
          ${r}
        </div>
        
        <div class="yyt-form-row">
          <button class="yyt-btn yyt-btn-primary" id="${f}-add-rule">
            <i class="fa-solid fa-plus"></i> \u6DFB\u52A0\u89C4\u5219
          </button>
          <button class="yyt-btn yyt-btn-secondary" id="${f}-scan-tags">
            <i class="fa-solid fa-search"></i> \u626B\u63CF\u6807\u7B7E
          </button>
          <button class="yyt-btn yyt-btn-secondary" id="${f}-add-exclude-cot">
            <i class="fa-solid fa-ban"></i> \u6392\u9664\u5C0FCoT
          </button>
        </div>
        
        <!-- \u9ED1\u540D\u5355\u8BBE\u7F6E -->
        <div class="yyt-form-group">
          <label>\u5185\u5BB9\u9ED1\u540D\u5355\uFF08\u5305\u542B\u8FD9\u4E9B\u5173\u952E\u8BCD\u7684\u5185\u5BB9\u5C06\u88AB\u8FC7\u6EE4\uFF0C\u7528\u9017\u53F7\u5206\u9694\uFF09</label>
          <input type="text" class="yyt-input" id="${f}-content-blacklist" 
                 value="${x(e.join(", "))}" 
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
               value="${x(t.value||"")}">
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
          <textarea class="yyt-textarea" id="${f}-test-input" rows="6" 
                    placeholder="\u8F93\u5165\u8981\u6D4B\u8BD5\u63D0\u53D6\u7684\u6587\u672C\u5185\u5BB9..."></textarea>
        </div>
        
        <div class="yyt-form-row">
          <button class="yyt-btn yyt-btn-primary" id="${f}-test-extract">
            <i class="fa-solid fa-play"></i> \u6D4B\u8BD5\u63D0\u53D6
          </button>
          <button class="yyt-btn yyt-btn-secondary" id="${f}-test-clear">
            <i class="fa-solid fa-eraser"></i> \u6E05\u7A7A
          </button>
        </div>
        
        <div class="yyt-form-group" id="${f}-test-result-container" style="display: none;">
          <label>\u63D0\u53D6\u7ED3\u679C</label>
          <div class="yyt-test-result" id="${f}-test-result"></div>
        </div>
      </div>
    `},bindEvents(t,e){let s=D();!s||!B(t)||(t.off(".yytRegex"),this._bindRuleEditorEvents(t,s),this._bindPresetEvents(t,s),this._bindTestEvents(t,s),this._bindFileEvents(t,s),Se(t,{namespace:"yytRegexSelect",selectors:[`#${f}-rule-preset-select`]}))},_bindRuleEditorEvents(t,e){t.on("change.yytRegex",".yyt-rule-type",function(){let r=e(this).closest(".yyt-rule-item").data("rule-index"),o=e(this).val();gs(r,{type:o}),_("info","\u89C4\u5219\u7C7B\u578B\u5DF2\u66F4\u65B0")}),t.on("change.yytRegex",".yyt-rule-value",function(){let r=e(this).closest(".yyt-rule-item").data("rule-index"),o=e(this).val().trim();gs(r,{value:o})}),t.on("change.yytRegex",".yyt-rule-enabled",function(){let r=e(this).closest(".yyt-rule-item").data("rule-index"),o=e(this).is(":checked");gs(r,{enabled:o}),_("info",o?"\u89C4\u5219\u5DF2\u542F\u7528":"\u89C4\u5219\u5DF2\u7981\u7528")}),t.on("click.yytRegex",".yyt-rule-delete",s=>{let o=e(s.currentTarget).closest(".yyt-rule-item").data("rule-index");confirm("\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u6761\u89C4\u5219\u5417\uFF1F")&&(Lr(o),this.renderTo(t),_("info","\u89C4\u5219\u5DF2\u5220\u9664"))}),t.on("click.yytRegex",`#${f}-add-rule`,()=>{ps({type:"include",value:"",enabled:!0}),this.renderTo(t),_("success","\u5DF2\u6DFB\u52A0\u65B0\u89C4\u5219")}),t.on("click.yytRegex",`#${f}-scan-tags`,async()=>{let s=t.find(`#${f}-scan-tags`),r=t.find(`#${f}-test-input`).val();if(!r||!r.trim()){_("warning","\u8BF7\u5148\u8F93\u5165\u8981\u626B\u63CF\u7684\u6587\u672C");return}s.prop("disabled",!0).find("i").addClass("fa-spin");try{let o=await Dr(r,{maxTags:50,timeoutMs:3e3}),{suggestions:a,stats:n}=Or(o,25);if(a.length===0){_("info","\u672A\u53D1\u73B0\u53EF\u7528\u7684\u6807\u7B7E"),t.find(`#${f}-tag-suggestions-container`).hide();return}let i=t.find(`#${f}-tag-list`);t.find(`#${f}-tag-scan-stats`).text(`${n.finalCount}/${n.totalFound} \u4E2A\u6807\u7B7E, ${o.stats.processingTimeMs}ms`),i.empty(),a.forEach(c=>{let d=e(`<button class="yyt-btn yyt-btn-small yyt-btn-secondary" title="\u70B9\u51FB\u6DFB\u52A0\u4E3A\u5305\u542B\u89C4\u5219">${x(c)}</button>`);d.on("click",()=>{if(ut().some(g=>g.type==="include"&&g.value===c)){_("warning",`\u89C4\u5219 "\u5305\u542B: ${c}" \u5DF2\u5B58\u5728`);return}ps({type:"include",value:c,enabled:!0}),this.renderTo(t),_("success",`\u5DF2\u6DFB\u52A0\u89C4\u5219: \u5305\u542B "${c}"`)}),i.append(d)}),t.find(`#${f}-tag-suggestions-container`).show(),_("success",`\u53D1\u73B0 ${a.length} \u4E2A\u6807\u7B7E`)}catch(o){_("error",`\u626B\u63CF\u5931\u8D25: ${o.message}`)}finally{s.prop("disabled",!1).find("i").removeClass("fa-spin")}}),t.on("click.yytRegex",`#${f}-add-exclude-cot`,()=>{let s=ut(),r="<!--[\\s\\S]*?-->";if(s.some(a=>a.type==="regex_exclude"&&a.value===r)){_("warning","\u6392\u9664HTML\u6CE8\u91CA\u89C4\u5219\u5DF2\u5B58\u5728");return}ps({type:"regex_exclude",value:r,enabled:!0}),this.renderTo(t),_("success","\u5DF2\u6DFB\u52A0\u6392\u9664HTML\u6CE8\u91CA\u89C4\u5219")}),t.on("change.yytRegex",`#${f}-content-blacklist`,function(){let r=e(this).val().split(",").map(o=>o.trim()).filter(o=>o);Xs(r),_("info",`\u9ED1\u540D\u5355\u5DF2\u66F4\u65B0\uFF0C\u5171 ${r.length} \u4E2A\u5173\u952E\u8BCD`)}),t.on("click.yytRegex",`#${f}-show-examples`,()=>{alert(`
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
      `)})},_bindPresetEvents(t,e){t.on("click.yytRegex",`#${f}-load-rule-preset`,()=>{let s=t.find(`#${f}-rule-preset-select`).val();if(!s){_("warning","\u8BF7\u9009\u62E9\u4E00\u4E2A\u9884\u8BBE");return}let r=zr(s);r.success?(this.renderTo(t),_("success",`\u5DF2\u52A0\u8F7D\u9884\u8BBE: ${r.preset.name}`),$.emit(P.REGEX_PRESET_LOADED,{preset:r.preset})):_("error",r.message)}),t.on("click.yytRegex",`#${f}-save-rule-preset`,()=>{let s=prompt("\u8BF7\u8F93\u5165\u9884\u8BBE\u540D\u79F0:");if(!s||!s.trim())return;let r=Br(s.trim());r.success?(this.renderTo(t),_("success",`\u9884\u8BBE "${s.trim()}" \u5DF2\u4FDD\u5B58`)):_("error",r.message)})},_bindTestEvents(t,e){t.on("click.yytRegex",`#${f}-test-extract`,()=>{let s=t.find(`#${f}-test-input`).val();if(!s||!s.trim()){_("warning","\u8BF7\u8F93\u5165\u6D4B\u8BD5\u6587\u672C");return}let r=ut(),o=jt(),a=Wt(s,r,o),n=t.find(`#${f}-test-result-container`),i=t.find(`#${f}-test-result`);n.show(),!a||!a.trim()?(i.html('<div class="yyt-result-empty">\u63D0\u53D6\u7ED3\u679C\u4E3A\u7A7A</div>'),_("warning","\u63D0\u53D6\u7ED3\u679C\u4E3A\u7A7A\uFF0C\u8BF7\u68C0\u67E5\u89C4\u5219\u914D\u7F6E")):(i.html(`<pre class="yyt-code-block">${x(a)}</pre>`),_("success","\u63D0\u53D6\u5B8C\u6210"),$.emit(P.REGEX_EXTRACTED,{result:a}))}),t.on("click.yytRegex",`#${f}-test-clear`,()=>{t.find(`#${f}-test-input`).val(""),t.find(`#${f}-test-result-container`).hide()})},_bindFileEvents(t,e){t.on("click.yytRegex",`#${f}-import-rules`,()=>{t.find(`#${f}-import-rules-file`).click()}),t.on("change.yytRegex",`#${f}-import-rules-file`,async s=>{let r=s.target.files[0];if(r){try{let o=await dt(r),a=Wr(o,{overwrite:!0});a.success?(this.renderTo(t),_("success","\u89C4\u5219\u914D\u7F6E\u5DF2\u5BFC\u5165")):_("error",a.message)}catch(o){_("error",`\u5BFC\u5165\u5931\u8D25: ${o.message}`)}e(s.target).val("")}}),t.on("click.yytRegex",`#${f}-export-rules`,()=>{try{let s=Ur();ct(s,`youyou_toolkit_rules_${Date.now()}.json`),_("success","\u89C4\u5219\u914D\u7F6E\u5DF2\u5BFC\u51FA")}catch(s){_("error",`\u5BFC\u51FA\u5931\u8D25: ${s.message}`)}}),t.on("click.yytRegex",`#${f}-reset-rules`,()=>{confirm("\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u89C4\u5219\u5417\uFF1F\u8FD9\u5C06\u6E05\u7A7A\u5F53\u524D\u7684\u89C4\u5219\u914D\u7F6E\u3002")&&(Nr([]),Xs([]),this.renderTo(t),_("info","\u89C4\u5219\u5DF2\u91CD\u7F6E"))})},destroy(t){!D()||!B(t)||(ue(t,"yytRegexSelect"),t.off(".yytRegex"))},getStyles(){return`
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
    `},renderTo(t){let e=this.render({});t.html(e),this.bindEvents(t,{})}}});var Gn={};pe(Gn,{createDefaultToolDefinition:()=>Ht,default:()=>pd,deleteTool:()=>Yr,deleteToolPreset:()=>Hn,exportTools:()=>Vr,getAllTools:()=>_t,getCurrentToolPreset:()=>Yn,getTool:()=>fs,getToolPresets:()=>qr,importTools:()=>Jr,normalizeToolDefinitionToRuntimeConfig:()=>Zs,resetTools:()=>Xr,saveTool:()=>Hr,saveToolPreset:()=>Fn,setCurrentToolPreset:()=>qn,setToolEnabled:()=>Gr});function dd(t={}){return!t||typeof t!="object"?{}:Object.fromEntries(Object.entries(t).map(([e,s])=>[e,Ht({...s||{},id:e})]))}function Qs(t){return Array.isArray(t)?t.map(e=>String(e||"").trim()).filter(Boolean):[]}function la(t,e){let s=parseInt(t,10);return Number.isFinite(s)&&s>0?s:e}function Un(t,e){let s=parseInt(t,10);return Number.isFinite(s)&&s>=0?s:e}function Wn(t={}){return{enabled:t?.enabled===!0,settleMs:Un(t?.settleMs,1200),cooldownMs:Un(t?.cooldownMs,5e3)}}function jn(t={}){return{enabled:t?.enabled===!0,selected:Qs(t?.selected)}}function ud(t=[]){let e=Array.isArray(t)?t.map(s=>({role:String(s?.role||"user").trim().toUpperCase(),content:String(s?.content||"").trim()})).filter(s=>s.content):[];return e.length===0?"":e.length===1?e[0].content:e.map(s=>`\u3010${s.role||"USER"}\u3011
${s.content}`).join(`

`)}function yd(t,e={}){let s=typeof e?.promptTemplate=="string"?e.promptTemplate.trim():"";if(s)return s;let r=ud(e?.config?.messages||[]);return r||`\u8BF7\u57FA\u4E8E\u6700\u8FD1\u7684 AI \u56DE\u590D\u4E3A\u5DE5\u5177\u201C${e?.name||t}\u201D\u751F\u6210\u7ED3\u6784\u5316\u8F93\u51FA\u3002`}function Ht(t={}){let e=new Date().toISOString(),s=t?.config||{};return{...Be,...t,id:t?.id||Be.id,icon:t?.icon||Be.icon,order:Number.isFinite(t?.order)?t.order:Be.order,promptTemplate:typeof t?.promptTemplate=="string"?t.promptTemplate:Be.promptTemplate,extractTags:Qs(t?.extractTags),config:{execution:{...Be.config.execution,...s.execution||{},timeout:la(s?.execution?.timeout,Be.config.execution.timeout),retries:Math.max(0,parseInt(s?.execution?.retries,10)||Be.config.execution.retries)},api:{...Be.config.api,...s.api||{}},messages:Array.isArray(s?.messages)?s.messages:[],context:{...Be.config.context,...s.context||{},depth:la(s?.context?.depth,Be.config.context.depth),includeTags:Qs(s?.context?.includeTags),excludeTags:Qs(s?.context?.excludeTags)},automation:Wn(s?.automation),worldbooks:jn(s?.worldbooks)},enabled:t?.enabled!==!1,metadata:{...Be.metadata,...t?.metadata||{},createdAt:t?.metadata?.createdAt||e,updatedAt:t?.metadata?.updatedAt||e}}}function Zs(t,e={},s={}){let r=Ht({...e,id:t||e?.id||""}),o=Qs(r?.extractTags?.length?r.extractTags:r?.config?.context?.includeTags),a=String(e?.output?.apiPreset||r?.config?.api?.preset||"").trim(),n=yd(t,r),i=typeof e?.output?.mode=="string"&&e.output.mode.trim()?e.output.mode.trim():s.defaultOutputMode||"follow_ai";return{id:r.id||t,name:r.name||t,icon:r.icon||"fa-screwdriver-wrench",description:r.description||"",enabled:r.enabled!==!1,order:Number.isFinite(r.order)?r.order:100,bypass:{enabled:r?.config?.api?.useBypass===!0&&!!r?.config?.api?.bypassPreset,presetId:r?.config?.api?.bypassPreset||""},output:{mode:i,apiPreset:a,overwrite:!0,enabled:!0},automation:Wn(r?.config?.automation),worldbooks:jn(r?.config?.worldbooks),extraction:{enabled:!0,maxMessages:la(r?.config?.context?.depth,5),selectors:o},promptTemplate:n,runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},apiPreset:a,extractTags:o,isCustom:!0,category:r.category||"utility",metadata:{...r.metadata||{}}}}function _t(){let t=Z.get(ae.TOOLS),e=dd(t);return t&&JSON.stringify(t)!==JSON.stringify(e)&&Z.set(ae.TOOLS,e),{...Fr,...e}}function fs(t){return _t()[t]||null}function Hr(t,e){if(!t||!e)return!1;let s=Z.get(ae.TOOLS)||{},r=!s[t]&&!Fr[t],o=Ht({...s[t]||{},...e,id:t,metadata:{...s[t]?.metadata||{},...e.metadata||{},createdAt:s[t]?.metadata?.createdAt||e?.metadata?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString()}});return s[t]=o,Z.set(ae.TOOLS,s),$.emit(r?P.TOOL_REGISTERED:P.TOOL_UPDATED,{toolId:t,tool:o}),!0}function Yr(t){let e=Z.get(ae.TOOLS)||{};return!e[t]&&!Fr[t]||Fr[t]?!1:(delete e[t],Z.set(ae.TOOLS,e),$.emit(P.TOOL_UNREGISTERED,{toolId:t}),!0)}function qr(){return Z.get(ae.PRESETS)||{}}function Fn(t,e){if(!t||!e)return!1;let s=qr(),r=!s[t];return s[t]={...e,name:t,updatedAt:new Date().toISOString()},Z.set(ae.PRESETS,s),$.emit(r?P.PRESET_CREATED:P.PRESET_UPDATED,{type:"tool",presetName:t,preset:s[t]}),!0}function Hn(t){let e=qr();return e[t]?(delete e[t],Z.set(ae.PRESETS,e),$.emit(P.PRESET_DELETED,{type:"tool",presetName:t}),!0):!1}function Yn(){return Z.get(ae.CURRENT_PRESET)||""}function qn(t){return Z.set(ae.CURRENT_PRESET,t||""),$.emit(P.PRESET_ACTIVATED,{type:"tool",presetName:t}),!0}function Gr(t,e){let s=fs(t);if(!s)return!1;let r=Z.get(ae.TOOLS)||{};return r[t]=Ht({...s,id:t,enabled:e,metadata:{...s?.metadata||{},createdAt:s?.metadata?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString()}}),Z.set(ae.TOOLS,r),$.emit(e?P.TOOL_ENABLED:P.TOOL_DISABLED,{toolId:t,enabled:e}),!0}function Vr(){let t=Z.get(ae.TOOLS)||{},e=Z.get(ae.PRESETS)||{};return JSON.stringify({version:"1.0.0",exportedAt:new Date().toISOString(),tools:t,presets:e},null,2)}function Jr(t,e=!1){try{let s=typeof e=="object"?!!e?.overwrite:!!e,r=JSON.parse(t);if(!r||typeof r!="object")return{success:!1,toolsImported:0,presetsImported:0,message:"\u65E0\u6548\u7684JSON\u683C\u5F0F"};let o=s?{}:Z.get(ae.TOOLS)||{},a=s?{}:Z.get(ae.PRESETS)||{},n=0,i=0;if(r.tools&&typeof r.tools=="object"){for(let[l,c]of Object.entries(r.tools))!c||typeof c!="object"||(o[l]=Ht({...c,id:l}),n+=1);Z.set(ae.TOOLS,o)}if(r.presets&&typeof r.presets=="object"){for(let[l,c]of Object.entries(r.presets))!c||typeof c!="object"||(a[l]={...c,name:l,updatedAt:new Date().toISOString()},i+=1);Z.set(ae.PRESETS,a)}return{success:!0,toolsImported:n,presetsImported:i,message:`\u6210\u529F\u5BFC\u5165 ${n} \u4E2A\u5DE5\u5177\u548C ${i} \u4E2A\u9884\u8BBE`}}catch(s){return{success:!1,toolsImported:0,presetsImported:0,message:`\u5BFC\u5165\u5931\u8D25: ${s.message}`}}}function Xr(){Z.remove(ae.TOOLS),Z.remove(ae.PRESETS),Z.remove(ae.CURRENT_PRESET)}var Be,Fr,ae,pd,Qr=U(()=>{Ne();fe();Be={id:"",name:"",description:"",icon:"fa-screwdriver-wrench",order:100,category:"utility",promptTemplate:"",extractTags:[],config:{execution:{timeout:6e4,retries:3},api:{preset:"",useBypass:!1,bypassPreset:""},messages:[],context:{depth:3,includeTags:[],excludeTags:[]},automation:{enabled:!1,settleMs:1200,cooldownMs:5e3},worldbooks:{enabled:!1,selected:[]}},enabled:!0,metadata:{createdAt:null,updatedAt:null,author:"",version:"1.0.0"}},Fr={},ae={TOOLS:"tools",PRESETS:"tool_presets",CURRENT_PRESET:"current_tool_preset"};pd={getAllTools:_t,getTool:fs,saveTool:Hr,deleteTool:Yr,setToolEnabled:Gr,exportTools:Vr,importTools:Jr,resetTools:Xr,getToolPresets:qr,saveToolPreset:Fn,deleteToolPreset:Hn,getCurrentToolPreset:Yn,setCurrentToolPreset:qn,createDefaultToolDefinition:Ht,normalizeToolDefinitionToRuntimeConfig:Zs}});var pi={};pe(pi,{TOOL_CATEGORIES:()=>Vn,TOOL_REGISTRY:()=>ms,appendToolRuntimeHistory:()=>ii,clearToolApiPreset:()=>oi,default:()=>wd,ensureToolRuntimeConfig:()=>Zr,getAllDefaultToolConfigs:()=>ci,getAllToolApiBindings:()=>ai,getAllToolFullConfigs:()=>sr,getEnabledTools:()=>di,getToolApiPreset:()=>pa,getToolBaseConfig:()=>bs,getToolConfig:()=>tr,getToolFullConfig:()=>J,getToolList:()=>ei,getToolSubTabs:()=>ti,getToolWindowState:()=>yi,hasTool:()=>ya,onPresetDeleted:()=>ni,patchToolRuntime:()=>At,registerTool:()=>Qn,resetToolConfig:()=>li,resetToolRegistry:()=>si,saveToolConfig:()=>ze,saveToolWindowState:()=>ui,setToolApiPreset:()=>ri,setToolApiPresetConfig:()=>hd,setToolBypassConfig:()=>vd,setToolOutputMode:()=>bd,setToolPromptTemplate:()=>xd,unregisterTool:()=>Zn,updateToolRuntime:()=>ga});function qt(t={}){let e=Array.isArray(t?.recentWritebackHistory)?t.recentWritebackHistory.filter(Boolean):[];return{lastRunAt:Number.isFinite(t?.lastRunAt)?t.lastRunAt:0,lastStatus:typeof t?.lastStatus=="string"?t.lastStatus:"idle",lastError:typeof t?.lastError=="string"?t.lastError:"",lastDurationMs:Number.isFinite(t?.lastDurationMs)?t.lastDurationMs:0,successCount:Number.isFinite(t?.successCount)?t.successCount:0,errorCount:Number.isFinite(t?.errorCount)?t.errorCount:0,lastMessageKey:typeof t?.lastMessageKey=="string"?t.lastMessageKey:"",lastExecutionKey:typeof t?.lastExecutionKey=="string"?t.lastExecutionKey:"",lastExecutionPath:typeof t?.lastExecutionPath=="string"?t.lastExecutionPath:"",lastWritebackStatus:typeof t?.lastWritebackStatus=="string"?t.lastWritebackStatus:"",lastFailureStage:typeof t?.lastFailureStage=="string"?t.lastFailureStage:"",lastSlotBindingKey:typeof t?.lastSlotBindingKey=="string"?t.lastSlotBindingKey:"",lastSlotRevisionKey:typeof t?.lastSlotRevisionKey=="string"?t.lastSlotRevisionKey:"",lastSlotTransactionId:typeof t?.lastSlotTransactionId=="string"?t.lastSlotTransactionId:"",lastSourceMessageId:typeof t?.lastSourceMessageId=="string"?t.lastSourceMessageId:"",lastSourceSwipeId:typeof t?.lastSourceSwipeId=="string"?t.lastSourceSwipeId:"",lastContentCommitted:t?.lastContentCommitted===!0,lastHostCommitApplied:t?.lastHostCommitApplied===!0,lastRefreshRequested:t?.lastRefreshRequested===!0,lastRefreshConfirmed:t?.lastRefreshConfirmed===!0,lastPreferredCommitMethod:typeof t?.lastPreferredCommitMethod=="string"?t.lastPreferredCommitMethod:"",lastAppliedCommitMethod:typeof t?.lastAppliedCommitMethod=="string"?t.lastAppliedCommitMethod:"",lastRefreshMethodCount:Number.isFinite(t?.lastRefreshMethodCount)?t.lastRefreshMethodCount:0,lastRefreshMethods:Array.isArray(t?.lastRefreshMethods)?t.lastRefreshMethods.filter(Boolean):[],lastRefreshConfirmChecks:Number.isFinite(t?.lastRefreshConfirmChecks)?t.lastRefreshConfirmChecks:0,lastRefreshConfirmedBy:typeof t?.lastRefreshConfirmedBy=="string"?t.lastRefreshConfirmedBy:"",lastTraceId:typeof t?.lastTraceId=="string"?t.lastTraceId:"",lastAutoRunAt:Number.isFinite(t?.lastAutoRunAt)?t.lastAutoRunAt:0,lastAutoStatus:typeof t?.lastAutoStatus=="string"?t.lastAutoStatus:"idle",lastAutoMessageId:typeof t?.lastAutoMessageId=="string"?t.lastAutoMessageId:"",lastAutoSwipeId:typeof t?.lastAutoSwipeId=="string"?t.lastAutoSwipeId:"",lastAutoRevisionKey:typeof t?.lastAutoRevisionKey=="string"?t.lastAutoRevisionKey:"",lastAutoWritebackStatus:typeof t?.lastAutoWritebackStatus=="string"?t.lastAutoWritebackStatus:"",lastAutoRefreshConfirmed:t?.lastAutoRefreshConfirmed===!0,lastAutoSkipReason:typeof t?.lastAutoSkipReason=="string"?t.lastAutoSkipReason:"",recentWritebackHistory:e}}function gd(t,e=10){let s=Number.isFinite(e)?Math.max(1,Math.min(50,Math.floor(e))):10;return Array.isArray(t)?t.length<=s?t:t.slice(t.length-s):[]}function Jn(){let t=_t()||{};return Object.entries(t).filter(([e])=>!er[e]).map(([e,s])=>[e,s||{}])}function ca(t={}){return t?.toolKind==="script"?"script":t?.toolKind==="ai"?"ai":t?.output?.mode==="local_transform"||t?.processor?.type?"script":"ai"}function Xn(){let t=Array.isArray(ms.tools?.subTabs)?ms.tools.subTabs.map((s,r)=>({...s,order:Number.isFinite(s?.order)?s.order:r,toolKind:ca(s),toolGroupLabel:ca(s)==="script"?"\u811A\u672C\u5DE5\u5177":"AI \u5DE5\u5177"})):[],e=Jn().map(([s,r],o)=>{let a=Zs(s,r),n=ca(a);return{id:s,name:a.name||s,icon:a.icon||"fa-screwdriver-wrench",component:"GenericToolConfigPanel",order:Number.isFinite(a.order)?a.order:100+o,isCustom:!0,description:a.description||"",toolKind:n,toolGroupLabel:n==="script"?"\u811A\u672C\u5DE5\u5177":"AI \u5DE5\u5177"}});return[...t,...e].sort((s,r)=>(s.order??0)-(r.order??0))}function fd(t,e={}){let s=Zs(t,e,{defaultOutputMode:"follow_ai"});return{...s,runtime:qt(s.runtime)}}function ua(t){let e=er[t];if(e)return{...e,output:{...e.output||{}},bypass:{...e.bypass||{}},worldbooks:{...e.worldbooks||{},selected:Array.isArray(e?.worldbooks?.selected)?[...e.worldbooks.selected]:[]},extraction:{...e.extraction||{}},processor:{...e.processor||{},options:{...e?.processor?.options||{}}},runtime:qt(e.runtime),extractTags:Array.isArray(e.extractTags)?[...e.extractTags]:[]};let r=(_t()||{})[t]||null;return r?fd(t,r):tr(t)}function bs(t){let e=ua(t);return e?{...e,output:{...e.output||{}},automation:{...e.automation||{}},bypass:{...e.bypass||{}},worldbooks:{...e.worldbooks||{},selected:Array.isArray(e?.worldbooks?.selected)?[...e.worldbooks.selected]:[]},extraction:{...e.extraction||{},selectors:Array.isArray(e?.extraction?.selectors)?[...e.extraction.selectors]:[]},processor:{...e.processor||{},options:{...e?.processor?.options||{}}},runtime:{...e.runtime||{}},extractTags:Array.isArray(e.extractTags)?[...e.extractTags]:[]}:null}function md(t,e={},s=""){if(!t)return null;let r={...t,...e,id:t.id||e.id};r.output={...t.output||{},...e.output||{}},r.automation={enabled:t?.automation?.enabled===!0||e?.automation?.enabled===!0,settleMs:Number.isFinite(e?.automation?.settleMs)?e.automation.settleMs:Number.isFinite(t?.automation?.settleMs)?t.automation.settleMs:1200,cooldownMs:Number.isFinite(e?.automation?.cooldownMs)?e.automation.cooldownMs:Number.isFinite(t?.automation?.cooldownMs)?t.automation.cooldownMs:5e3},r.bypass={...t.bypass||{},...e.bypass||{}},r.worldbooks={...t.worldbooks||{},...e.worldbooks||{},selected:Array.isArray(e?.worldbooks?.selected)?[...e.worldbooks.selected]:Array.isArray(t?.worldbooks?.selected)?[...t.worldbooks.selected]:[]},r.runtime=qt({...t.runtime||{},...e.runtime||{}}),r.extraction={...t.extraction||{},...e.extraction||{}},r.processor={...t.processor||{},...e.processor||{},options:{...t?.processor?.options||{},...e?.processor?.options||{}}};let o=e?.output?.apiPreset||e?.apiPreset||r.output?.apiPreset||r.apiPreset||s||"";return r.output={...r.output||{},apiPreset:o},r.apiPreset=o,(!Array.isArray(r.extraction.selectors)||r.extraction.selectors.length===0)&&Array.isArray(r.extractTags)&&r.extractTags.length>0&&(r.extraction.selectors=[...r.extractTags]),(!Array.isArray(r.extractTags)||r.extractTags.length===0)&&(r.extractTags=Array.isArray(r.extraction.selectors)?[...r.extraction.selectors]:[]),t.isCustom?r.enabled=t.enabled!==!1:typeof e.enabled=="boolean"?r.enabled=e.enabled:r.enabled=t.enabled!==!1,r}function Qn(t,e){if(!t||typeof t!="string")return console.error("[ToolRegistry] \u5DE5\u5177ID\u65E0\u6548"),!1;if(!e||typeof e!="object")return console.error("[ToolRegistry] \u5DE5\u5177\u914D\u7F6E\u65E0\u6548"),!1;let s=["name","icon","component"];for(let r of s)if(!e[r])return console.error(`[ToolRegistry] \u5DE5\u5177\u7F3A\u5C11\u5FC5\u9700\u5B57\u6BB5: ${r}`),!1;return st[t]={id:t,...e,order:e.order??Object.keys(st).length},console.log(`[ToolRegistry] \u5DE5\u5177\u5DF2\u6CE8\u518C: ${t}`),!0}function Zn(t){return st[t]?(delete st[t],console.log(`[ToolRegistry] \u5DE5\u5177\u5DF2\u6CE8\u9500: ${t}`),!0):(console.warn(`[ToolRegistry] \u5DE5\u5177\u4E0D\u5B58\u5728: ${t}`),!1)}function ei(t=!0){let e=Object.values(st).map(s=>s.id==="tools"?{...s,subTabs:Xn()}:s);return t?e.sort((s,r)=>(s.order??0)-(r.order??0)):e}function tr(t){return t==="tools"&&st[t]?{...st[t],subTabs:Xn()}:st[t]||null}function ya(t){return!!st[t]}function ti(t){let e=tr(t);return!e||!e.hasSubTabs?[]:e.subTabs||[]}function si(){st={...ms},console.log("[ToolRegistry] \u5DE5\u5177\u6CE8\u518C\u8868\u5DF2\u91CD\u7F6E")}function ri(t,e){if(!ya(t))return console.warn(`[ToolRegistry] \u5DE5\u5177\u4E0D\u5B58\u5728: ${t}`),!1;let s=C.get(Ke)||{};return s[t]=e||"",C.set(Ke,s),console.log(`[ToolRegistry] \u5DE5\u5177 "${t}" \u7ED1\u5B9A\u5230\u9884\u8BBE "${e||"\u5F53\u524D\u914D\u7F6E"}"`),!0}function pa(t){return(C.get(Ke)||{})[t]||""}function oi(t){let e=C.get(Ke)||{};delete e[t],C.set(Ke,e),console.log(`[ToolRegistry] \u5DE5\u5177 "${t}" \u7684API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u6E05\u9664`)}function ai(){return C.get(Ke)||{}}function ni(t){let e=C.get(Ke)||{},s=!1;for(let r in e)e[r]===t&&(e[r]="",s=!0,console.log(`[ToolRegistry] \u5DE5\u5177 "${r}" \u7684API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u6E05\u9664\uFF08\u9884\u8BBE\u88AB\u5220\u9664\uFF09`));s&&C.set(Ke,e)}function J(t){let e=ua(t);if(!e)return tr(t);let r=(C.get(Yt)||{})[t]||{},o=pa(t);return md({...e,id:t},r,o)}function Zr(t){if(!t)return!1;let e=ua(t);if(!e)return!1;let s=C.get(Yt)||{};if(s[t])return!0;let r={promptTemplate:e.promptTemplate||"",enabled:e.enabled!==!1,extractTags:Array.isArray(e.extractTags)?[...e.extractTags]:[],apiPreset:e.apiPreset||"",output:{...e.output||{}},automation:{...e.automation||{}},bypass:{...e.bypass||{}},worldbooks:{...e.worldbooks||{},selected:Array.isArray(e?.worldbooks?.selected)?[...e.worldbooks.selected]:[]},extraction:{...e.extraction||{},selectors:Array.isArray(e?.extraction?.selectors)?[...e.extraction.selectors]:[]},processor:{...e.processor||{},options:{...e?.processor?.options||{}}},runtime:{...e.runtime||{}}};s[t]=r,C.set(Yt,s);let o=C.get(Ke)||{};return o[t]=r.output?.apiPreset||r.apiPreset||"",C.set(Ke,o),$.emit(P.TOOL_UPDATED,{toolId:t,config:r}),!0}function ze(t,e,s={}){if(!t||!J(t))return console.warn("[ToolRegistry] \u5DE5\u5177\u4E0D\u5B58\u5728:",t),!1;let{emitEvent:r=!0}=s,o=C.get(Yt)||{},a=C.get(Ke)||{},n=e?.output?.apiPreset??e?.apiPreset??"",i=["promptTemplate","enabled","extractTags","apiPreset","output","automation","bypass","worldbooks","extraction","processor","runtime"];return o[t]={},i.forEach(l=>{if(e[l]!==void 0){if(l==="output"&&e.output){o[t][l]={...e.output,apiPreset:n};return}if(l==="apiPreset"){o[t][l]=n;return}o[t][l]=e[l]}}),o[t].apiPreset===void 0&&(o[t].apiPreset=n),!o[t].output&&e.output!==void 0&&(o[t].output={...e.output||{},apiPreset:n}),C.set(Yt,o),a[t]=n,C.set(Ke,a),r&&$.emit(P.TOOL_UPDATED,{toolId:t,config:o[t]}),console.log(`[ToolRegistry] \u5DE5\u5177\u914D\u7F6E\u5DF2\u4FDD\u5B58: ${t}`),!0}function bd(t,e){let s=J(t);return s?ze(t,{...s,output:{...s.output,mode:e}}):!1}function hd(t,e){let s=J(t);return s?ze(t,{...s,apiPreset:e,output:{...s.output,apiPreset:e}}):!1}function vd(t,e){let s=J(t);return s?ze(t,{...s,bypass:{...s.bypass,...e}}):!1}function xd(t,e){let s=J(t);return s?ze(t,{...s,promptTemplate:e}):!1}function At(t,e,s={}){let r=J(t);if(!r)return!1;let{touchLastRunAt:o=!1,emitEvent:a=!1,emitRuntimeEvent:n=!0}=s,i=qt({...r.runtime||{},...e||{}});o&&(i.lastRunAt=Date.now());let l=ze(t,{...r,runtime:i},{emitEvent:a});return l&&n&&$.emit(P.TOOL_RUNTIME_UPDATED,{toolId:t,runtime:i,previousRuntime:qt(r.runtime||{})}),l}function ii(t,e,s={},r={}){let o=J(t);if(!o)return!1;let{limit:a=10,emitEvent:n=!1,emitRuntimeEvent:i=!0}=r,l=qt(o.runtime||{}),c=qt(o.runtime||{}),d="recentWritebackHistory",u={id:s?.id||`hist_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,at:s?.at||Date.now(),...s};l[d]=gd([...Array.isArray(l[d])?l[d]:[],u],a),u?.traceId&&(l.lastTraceId=u.traceId);let y=ze(t,{...o,runtime:l},{emitEvent:n});return y&&i&&$.emit(P.TOOL_RUNTIME_UPDATED,{toolId:t,runtime:l,previousRuntime:c,historyType:e,historyEntry:u}),y}function ga(t,e,s={}){let{touchLastRunAt:r=!0,emitEvent:o=!1,emitRuntimeEvent:a=!0}=s;return At(t,e,{touchLastRunAt:r,emitEvent:o,emitRuntimeEvent:a})}function li(t){if(!t||!er[t])return console.warn("[ToolRegistry] \u5DE5\u5177\u4E0D\u5B58\u5728:",t),!1;let e=C.get(Yt)||{};return delete e[t],C.set(Yt,e),$.emit(P.TOOL_UPDATED,{toolId:t,config:null}),console.log(`[ToolRegistry] \u5DE5\u5177\u914D\u7F6E\u5DF2\u91CD\u7F6E: ${t}`),!0}function ci(){return{...er}}function sr(){let t=new Set([...Object.keys(er),...Jn().map(([e])=>e)]);return Array.from(t).map(e=>J(e)).filter(Boolean)}function di(){return sr().filter(t=>t&&t.enabled)}function ui(t,e){let s=C.get(da)||{};s[t]={...e,updatedAt:Date.now()},C.set(da,s)}function yi(t){return(C.get(da)||{})[t]||null}var Yt,Ke,da,er,ms,Vn,st,wd,Et=U(()=>{Ne();fe();Qr();Yt="tool_configs",Ke="tool_api_bindings",da="tool_window_states";er={summaryTool:{id:"summaryTool",name:"\u6458\u8981\u5DE5\u5177",icon:"fa-file-lines",description:"\u751F\u6210\u5267\u60C5\u6458\u8981\u5757",enabled:!0,order:3,bypass:{enabled:!1,presetId:""},output:{mode:"follow_ai",apiPreset:"",overwrite:!0,enabled:!0},automation:{enabled:!1,settleMs:1200,cooldownMs:5e3},worldbooks:{enabled:!1,selected:[]},extraction:{enabled:!0,maxMessages:5,selectors:["boo_FM"]},promptTemplate:`\u8BF7\u6839\u636E\u4EE5\u4E0BAI\u56DE\u590D\u751F\u6210\u6458\u8981\u5757\uFF1A

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
</youyou>`,runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},apiPreset:"",extractTags:["youyou"]},escapeTransformTool:{id:"escapeTransformTool",name:"\u8F6C\u4E49\u5904\u7406",icon:"fa-quote-left",description:"\u5BF9\u63D0\u53D6\u5185\u5BB9\u6267\u884C\u672C\u5730\u8F6C\u4E49\u6216\u53BB\u8F6C\u4E49",enabled:!0,order:6,output:{mode:"local_transform",apiPreset:"",overwrite:!0,enabled:!0},extraction:{enabled:!0,maxMessages:5,selectors:[]},processor:{type:"escape_transform",direction:"escape",options:{doubleQuote:!0,singleQuote:!1,newline:!1}},runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},extractTags:[]},punctuationTransformTool:{id:"punctuationTransformTool",name:"\u4E2D\u6587\u6807\u70B9\u66FF\u6362",icon:"fa-language",description:"\u5C06\u82F1\u6587\u6807\u70B9\u6309\u52FE\u9009\u9879\u66FF\u6362\u4E3A\u4E2D\u6587\u6807\u70B9",enabled:!0,order:7,output:{mode:"local_transform",apiPreset:"",overwrite:!0,enabled:!0},extraction:{enabled:!0,maxMessages:5,selectors:[]},processor:{type:"punctuation_transform",direction:"en_to_zh",options:{comma:!0,period:!0,exclamation:!0,question:!0,semicolon:!1,colon:!1,leftParen:!1,rightParen:!1}},runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},extractTags:[]}},ms={apiPresets:{id:"apiPresets",name:"API\u9884\u8BBE",icon:"fa-database",hasSubTabs:!1,description:"\u7BA1\u7406API\u914D\u7F6E\u548C\u9884\u8BBE",component:"ApiPresetPanel",order:0},regexExtract:{id:"regexExtract",name:"\u6B63\u5219\u63D0\u53D6",icon:"fa-filter",hasSubTabs:!1,description:"\u4ECE\u6D88\u606F\u4E2D\u63D0\u53D6\u7279\u5B9A\u5185\u5BB9",component:"RegexExtractPanel",order:2,defaultConfig:{execution:{timeout:3e4,retries:1},api:{preset:""},extractRules:[],excludeRules:[]}},toolManage:{id:"toolManage",name:"\u5DE5\u5177\u5217\u8868",icon:"fa-screwdriver-wrench",hasSubTabs:!1,description:"\u521B\u5EFA\u3001\u7F16\u8F91\u548C\u7BA1\u7406\u81EA\u5B9A\u4E49\u5DE5\u5177",component:"ToolManagePanel",order:3},tools:{id:"tools",name:"\u5DE5\u5177",icon:"fa-tools",hasSubTabs:!0,description:"\u5DE5\u5177\u96C6\u5408",order:4,subTabs:[{id:"summaryTool",name:"\u6458\u8981\u5DE5\u5177",icon:"fa-file-lines",component:"SummaryToolPanel",toolKind:"ai"},{id:"statusBlock",name:"\u4E3B\u89D2\u72B6\u6001\u680F",icon:"fa-user-check",component:"StatusBlockPanel",toolKind:"ai"},{id:"youyouReview",name:"\u5C0F\u5E7D\u70B9\u8BC4",icon:"fa-comment-dots",component:"YouyouReviewPanel",toolKind:"ai"},{id:"escapeTransformTool",name:"\u8F6C\u4E49\u5904\u7406",icon:"fa-quote-left",component:"EscapeTransformToolPanel",toolKind:"script"},{id:"punctuationTransformTool",name:"\u4E2D\u6587\u6807\u70B9\u66FF\u6362",icon:"fa-language",component:"PunctuationTransformToolPanel",toolKind:"script"}]},tableWorkbench:{id:"tableWorkbench",name:"\u586B\u8868\u5DE5\u4F5C\u53F0",icon:"fa-table-cells",hasSubTabs:!1,description:"\u7ED3\u6784\u5316\u586B\u8868\u4E0E\u72B6\u6001\u9884\u89C8\u5DE5\u4F5C\u53F0",component:"TableWorkbenchPanel",order:5},bypass:{id:"bypass",name:"Ai\u6307\u4EE4\u9884\u8BBE",icon:"fa-shield-halved",hasSubTabs:!1,description:"\u7BA1\u7406 Ai \u6307\u4EE4\u9884\u8BBE",component:"BypassPanel",order:6},settings:{id:"settings",name:"\u8BBE\u7F6E",icon:"fa-cog",hasSubTabs:!1,description:"\u5168\u5C40\u8BBE\u7F6E",component:"SettingsPanel",order:7}},Vn={api:{name:"API\u5DE5\u5177",icon:"fa-plug",order:0},prompt:{name:"\u63D0\u793A\u8BCD\u5DE5\u5177",icon:"fa-file-alt",order:1},utility:{name:"\u5B9E\u7528\u5DE5\u5177",icon:"fa-wrench",order:2}},st={...ms};wd={TOOL_REGISTRY:ms,TOOL_CATEGORIES:Vn,registerTool:Qn,unregisterTool:Zn,getToolList:ei,getToolConfig:tr,hasTool:ya,getToolSubTabs:ti,resetToolRegistry:si,setToolApiPreset:ri,getToolApiPreset:pa,clearToolApiPreset:oi,getAllToolApiBindings:ai,onPresetDeleted:ni,saveToolWindowState:ui,getToolWindowState:yi,getToolBaseConfig:bs,ensureToolRuntimeConfig:Zr,getToolFullConfig:J,patchToolRuntime:At,appendToolRuntimeHistory:ii,saveToolConfig:ze,resetToolConfig:li,getAllDefaultToolConfigs:ci,getAllToolFullConfigs:sr,getEnabledTools:di}});var Gt,fa=U(()=>{Te();Qr();Et();Gt={id:"toolManagePanel",_removeDialog(t){if(!t?.length)return;let e=t.find("#yyt-tool-dialog-overlay");ue(e,"yytToolManageDialogSelect"),e.remove()},_getToolkitWindow(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window},_openToolConfig(t){if(!t)return;let s=this._getToolkitWindow()?.YouYouToolkit||window.YouYouToolkit;if(!s){_("warning","\u672A\u627E\u5230\u5DE5\u5177\u7BB1\u5B9E\u4F8B\uFF0C\u65E0\u6CD5\u8DF3\u8F6C\u5230\u5DE5\u5177\u914D\u7F6E");return}s.switchMainTab("tools"),s.switchSubTab("tools",t)},render(t){let e=_t(),s=Object.entries(e),r=s.filter(([,o])=>o?.enabled!==!1).length;return`
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
                <strong class="yyt-tool-manage-stat-value">${r}</strong>
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
    `},_renderToolList(t){let e=Object.entries(t);return e.length?e.map(([s,r])=>`
      <div class="yyt-tool-item ${r.enabled?"yyt-tool-item-enabled":"yyt-tool-item-disabled"}" data-tool-id="${s}">
        <div class="yyt-tool-header">
          <div class="yyt-tool-info">
            <span class="yyt-tool-name">${x(r.name)}</span>
            <span class="yyt-tool-category">${x(r.category)}</span>
          </div>
          <div class="yyt-tool-controls">
            <label class="yyt-toggle yyt-tool-toggle">
              <input type="checkbox" ${r.enabled?"checked":""}>
              <span class="yyt-toggle-slider"></span>
            </label>
          </div>
        </div>
        <div class="yyt-tool-desc">${x(r.description)}</div>
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
      `},bindEvents(t,e){let s=D();!s||!B(t)||(t.off(".yytToolManage"),this._bindToolEvents(t,s),this._bindFileEvents(t,s))},_bindToolEvents(t,e){t.on("change.yytToolManage",".yyt-tool-toggle input",s=>{let r=e(s.currentTarget).closest(".yyt-tool-item"),o=r.data("tool-id"),a=e(s.currentTarget).is(":checked");Gr(o,a),r.toggleClass("yyt-tool-item-enabled",a).toggleClass("yyt-tool-item-disabled",!a),_("info",a?"\u5DE5\u5177\u5DF2\u542F\u7528":"\u5DE5\u5177\u5DF2\u7981\u7528")}),t.on("click.yytToolManage","#yyt-add-tool",()=>{this._showToolEditDialog(t,e,null)}),t.on("click.yytToolManage",'.yyt-tool-item [data-action="config"]',s=>{let r=e(s.currentTarget).closest(".yyt-tool-item").data("tool-id");this._openToolConfig(r)}),t.on("click.yytToolManage",'.yyt-tool-item [data-action="edit"]',s=>{let r=e(s.currentTarget).closest(".yyt-tool-item").data("tool-id");this._showToolEditDialog(t,e,r)}),t.on("click.yytToolManage",'.yyt-tool-item [data-action="delete"]',s=>{let r=e(s.currentTarget).closest(".yyt-tool-item").data("tool-id"),o=fs(r);if(!r||!o||!confirm(`\u786E\u5B9A\u8981\u5220\u9664\u5DE5\u5177\u201C${o.name}\u201D\u5417\uFF1F`))return;if(!Yr(r)){_("error","\u5220\u9664\u5931\u8D25");return}this.renderTo(t),_("success","\u5DE5\u5177\u5DF2\u5220\u9664")})},_bindFileEvents(t,e){t.on("click.yytToolManage","#yyt-import-tools",()=>{t.find("#yyt-import-tools-file").click()}),t.on("change.yytToolManage","#yyt-import-tools-file",async s=>{let r=s.target.files[0];if(r){try{let o=await dt(r),a=Jr(o,{overwrite:!1});_(a.success?"success":"error",a.message),a.success&&this.renderTo(t)}catch(o){_("error",`\u5BFC\u5165\u5931\u8D25: ${o.message}`)}e(s.target).val("")}}),t.on("click.yytToolManage","#yyt-export-tools",()=>{try{let s=Vr();ct(s,`youyou_toolkit_tools_${Date.now()}.json`),_("success","\u5DE5\u5177\u5DF2\u5BFC\u51FA")}catch(s){_("error",`\u5BFC\u51FA\u5931\u8D25: ${s.message}`)}}),t.on("click.yytToolManage","#yyt-reset-tools",()=>{confirm("\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u5DE5\u5177\u5417\uFF1F")&&(Xr(),this.renderTo(t),_("info","\u5DE5\u5177\u5DF2\u91CD\u7F6E"))})},_showToolEditDialog(t,e,s){let r=s?fs(s):null,o=!!r,a=`
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
                       value="${r?x(r.name):""}" placeholder="\u5DE5\u5177\u540D\u79F0">
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
                     value="${r?x(r.description||""):""}" placeholder="\u5DE5\u5177\u63CF\u8FF0">
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
    `;this._removeDialog(t),t.append(a);let n=t.find("#yyt-tool-dialog-overlay"),i=n.find("#yyt-tool-name"),l=n.find("#yyt-tool-category"),c=n.find("#yyt-tool-desc"),d=n.find("#yyt-tool-timeout"),u=n.find("#yyt-tool-retries");Se(n,{namespace:"yytToolManageDialogSelect",selectors:["#yyt-tool-category"]});let y=()=>{ue(n,"yytToolManageDialogSelect"),n.remove()};n.find("#yyt-tool-dialog-close, #yyt-tool-dialog-cancel").on("click",y),n.on("click",function(g){g.target===this&&y()}),n.find("#yyt-tool-dialog-save").on("click",()=>{let g=i.val().trim(),m=l.val(),v=c.val().trim(),b=parseInt(d.val())||6e4,S=parseInt(u.val())||3;if(!g){_("warning","\u8BF7\u8F93\u5165\u5DE5\u5177\u540D\u79F0");return}let A=s||`tool_${Date.now()}`;if(!Hr(A,{name:g,category:m,description:v,promptTemplate:r?.promptTemplate||"",extractTags:Array.isArray(r?.extractTags)?r.extractTags:[],config:{execution:{timeout:b,retries:S},api:r?.config?.api||{preset:"",useBypass:!1,bypassPreset:""},messages:Array.isArray(r?.config?.messages)?r.config.messages:[],context:{depth:r?.config?.context?.depth||3,includeTags:Array.isArray(r?.config?.context?.includeTags)?r.config.context.includeTags:[],excludeTags:Array.isArray(r?.config?.context?.excludeTags)?r.config.context.excludeTags:[]},worldbooks:{enabled:r?.config?.worldbooks?.enabled===!0,selected:Array.isArray(r?.config?.worldbooks?.selected)?r.config.worldbooks.selected:[]}},enabled:r?.enabled!==!1})){_("error",o?"\u5DE5\u5177\u66F4\u65B0\u5931\u8D25":"\u5DE5\u5177\u521B\u5EFA\u5931\u8D25");return}Zr(A),y(),this.renderTo(t),_("success",o?"\u5DE5\u5177\u5DF2\u66F4\u65B0":"\u5DE5\u5177\u5DF2\u521B\u5EFA"),o||this._openToolConfig(A)})},destroy(t){!D()||!B(t)||(this._removeDialog(t),t.off(".yytToolManage"))},getStyles(){return`
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

      .yyt-tool-item.yyt-tool-item-disabled {
        opacity: 0.6;
        filter: saturate(0.8);
      }

      .yyt-tool-item.yyt-tool-item-enabled {
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
    `},renderTo(t){let e=this.render({});t.html(e),this.bindEvents(t,{})}}});function hs(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window}function eo(){return hs()?.SillyTavern||null}function G(t){return t==null?"":String(t).trim()}function Sd(t){if(!t)return"";let e=[t.content,t.mes,t.message,t.text,t?.data?.content];for(let s of e)if(typeof s=="string"&&s.trim())return s.trim();return""}function Td(t){let e=String(t?.role||"").trim().toLowerCase();return e==="assistant"||e==="ai"?"assistant":e==="system"?"system":e==="user"||t?.is_user===!0?"user":t?.is_system===!0?"system":"assistant"}function gi(t=""){let e=String(t||"").trim();if(!e)return"empty";let s=0;for(let r=0;r<e.length;r+=1)s=(s<<5)-s+e.charCodeAt(r),s|=0;return`fp_${Math.abs(s).toString(36)}`}function fi(t={}){let e=G(t.chatId)||"chat_default",s=G(t.messageId)||"latest";return`${e}::${s}`}function mi(t={}){let e=fi(t),s=G(t.effectiveSwipeId)||"swipe:current",r=G(t.assistantContentFingerprint)||"empty";return`${e}::${s}::${r}`}function _d(t={}){let e=mi(t),s=G(t.eventType)||"MANUAL",r=G(t.traceId)||bi("manual");return`${e}::${s}::${r}`}function bi(t="trace"){return`${t}_${Date.now()}_${Math.random().toString(36).slice(2,8)}`}function hi(){let t=eo();try{let e=t?.getContext?.()||null;if(Array.isArray(e?.chat))return e.chat}catch{}return Array.isArray(t?.chat)?t.chat:[]}function vi(t=[]){let e=[],s=null,r=null;return t.forEach((o,a)=>{let n=Td(o),i=Sd(o);if(!i)return;let l=G(o?.messageId??o?.message_id??o?.id??o?.mid??o?.mesid??o?.chat_index??a),c=G(o?.swipe_id??o?.swipeId??o?.swipe??""),d={role:n,content:i,sourceId:l,swipeId:c,raw:o,index:a};e.push(d),n==="user"&&(s=d),n==="assistant"&&(r=d)}),{messages:e,lastUserMessage:s,lastAiMessage:r}}function Ad(t,e,s){return G(e?.chatId??e?.chat_id??t?.chatId??t?.chat_id??t?.this_chid??s?.id??"chat_default")||"chat_default"}async function ma(){let t=eo();if(!t)return null;try{let e=t.this_chid,s=t.characters||[];if(e>=0&&e<s.length){let r=s[e];return{id:e,name:r?.name||"",description:r?.description||"",personality:r?.personality||"",scenario:r?.scenario||"",firstMes:r?.first_mes||"",mesExample:r?.mes_example||""}}}catch(e){console.error("[YouYouToolkit:ExecutionContext] \u83B7\u53D6\u89D2\u8272\u4FE1\u606F\u5931\u8D25:",e)}return null}function Ed(t="",e=null){let s=String(t||""),r=e?.YouYouToolkit_toolOutputs;return r&&typeof r=="object"&&Object.values(r).forEach(o=>{let a=String(o?.blockText||o?.content||"").trim();a&&s.includes(a)&&(s=s.replace(a,"").trimEnd())}),s.trim()}function Md(t,e={}){let s=Array.isArray(t?.messages)?t.messages:[],r=G(e.messageId),o=G(e.swipeId);if(!r)return t?.lastAiMessage||null;let a=s.filter(i=>i.role==="assistant"),n=a.find(i=>i.sourceId!==r?!1:o?G(i.swipeId)===o:!0);return n||a.find(i=>i.sourceId===r)||null}function xi({api:t,stContext:e,character:s,conversation:r,targetAssistantMessage:o,runSource:a="MANUAL"}={}){let n=r?.messages||[],i=r?.lastUserMessage||null,l=G(o?.sourceId)||"",c=G(o?.swipeId)||"swipe:current",d=o?.content||"",u=Ed(d,o?.raw||null),y=gi(d),g=gi(u),m=Ad(t,e,s),v=bi(String(a||"manual").toLowerCase()),b=fi({chatId:m,messageId:l}),S=mi({chatId:m,messageId:l,effectiveSwipeId:c,assistantContentFingerprint:g});return{startedAt:Date.now(),runSource:a,traceId:v,chatId:m,messageId:l,confirmedAssistantMessageId:l,slotBindingKey:b,slotRevisionKey:S,slotTransactionId:_d({chatId:m,messageId:l,effectiveSwipeId:c,assistantContentFingerprint:g,eventType:a,traceId:v}),executionKey:S,lastAiMessage:d,assistantContentFingerprint:y,assistantBaseText:u,assistantBaseFingerprint:g,lastAiMessageSwipeId:c,confirmedAssistantSwipeId:c,effectiveSwipeId:c,sourceMessageId:l,sourceSwipeId:c,lastUserMessage:i?.content||"",userMessage:i?.content||"",targetAssistantMessage:o,chatMessages:n,characterCard:s,chatHistory:n,input:{userMessage:i?.content||"",lastAiMessage:d,assistantBaseText:u,extractedContent:"",previousToolOutput:"",context:{character:s?.name||"",chatLength:n.length||0}},config:{},status:"pending"}}async function Vt({runSource:t="MANUAL"}={}){let e=eo(),s=e?.getContext?.()||null,r=await ma(),o=hi(),a=vi(o),n=a?.lastAiMessage||null;return xi({api:e,stContext:s,character:r,conversation:a,targetAssistantMessage:n,runSource:t})}async function rr({messageId:t,swipeId:e="",runSource:s="AUTO"}={}){let r=eo(),o=r?.getContext?.()||null,a=await ma(),n=hi(),i=vi(n),l=Md(i,{messageId:t,swipeId:e});return xi({api:r,stContext:o,character:a,conversation:i,targetAssistantMessage:l,runSource:s})}var vs=U(()=>{});function wi(){try{if(typeof TavernHelper<"u"&&TavernHelper)return TavernHelper}catch{}return hs()?.TavernHelper||null}function kd(){try{if(typeof SillyTavern<"u"&&SillyTavern)return SillyTavern}catch{}return hs()?.SillyTavern||null}function or(t){return Array.isArray(t)?Array.from(new Set(t.map(e=>String(e||"").trim()).filter(Boolean))):[]}function ba(t){if(Array.isArray(t))return t.map(e=>typeof e=="string"?e:e&&typeof e=="object"?e.name||e.id||e.title||JSON.stringify(e):String(e??""));if(t&&typeof t=="object"){let e={};return Object.keys(t).forEach(s=>{let r=t[s];Array.isArray(r)?e[s]=r.map(o=>typeof o=="string"?o:o&&typeof o=="object"?o.name||o.id||o.title||"[object]":String(o??"")):r&&typeof r=="object"?e[s]="[object]":e[s]=r}),e}return t}function Id(t={}){let e=typeof t.content=="string"?t.content.trim():"";if(!e)return"";let s=[t.comment,t.key,t.keysecondary,t.text].map(r=>String(r||"").trim()).find(Boolean);return s&&s!==e?`## ${s}
${e}`:e}function ar(){return Array.isArray(ha)?[...ha]:[]}function Si(){return va?{...va}:null}async function Cd(t){if(!t||typeof t.getCharLorebooks!="function")return[];try{let e=await Promise.resolve(t.getCharLorebooks({type:"all"}));return or([e?.primary,e?.secondary,...Array.isArray(e?.additional)?e.additional:[]])}catch(e){return console.warn("[ToolWorldbookService] \u83B7\u53D6\u89D2\u8272\u7ED1\u5B9A\u4E16\u754C\u4E66\u5931\u8D25:",e),[]}}async function Pd(t,e){if(t&&typeof t.getLorebooks=="function")try{let s=or(await Promise.resolve(t.getLorebooks()));if(s.length>0)return s}catch(s){console.warn("[ToolWorldbookService] \u83B7\u53D6\u5168\u90E8\u4E16\u754C\u4E66\u5217\u8868\u5931\u8D25:",s)}if(e&&typeof e.getWorldBooks=="function")try{let s=await Promise.resolve(e.getWorldBooks()),r=or(Array.isArray(s)?s.map(o=>o?.name??o):[]);if(r.length>0)return r}catch(s){console.warn("[ToolWorldbookService] \u4ECE SillyTavern \u83B7\u53D6\u4E16\u754C\u4E66\u5217\u8868\u5931\u8D25:",s)}return[]}async function Ti(){let t=wi(),e=kd(),s={checkedAt:Date.now(),hasGlobalTavernHelper:(()=>{try{return typeof TavernHelper<"u"&&!!TavernHelper}catch{return!1}})(),hasParentTavernHelper:!!hs()?.TavernHelper,hasGlobalSillyTavern:(()=>{try{return typeof SillyTavern<"u"&&!!SillyTavern}catch{return!1}})(),hasParentSillyTavern:!!hs()?.SillyTavern,helperKeys:t?Object.keys(t).sort():[],stKeys:e?Object.keys(e).sort():[],getLorebooksType:typeof t?.getLorebooks,getCharLorebooksType:typeof t?.getCharLorebooks,getLorebookEntriesType:typeof t?.getLorebookEntries,getWorldBooksType:typeof e?.getWorldBooks,characterWorldbooks:[],allWorldbooks:[],combinedWorldbooks:[],rawResults:{},errors:[]};try{s.rawResults.getLorebooks=t&&typeof t.getLorebooks=="function"?ba(await Promise.resolve(t.getLorebooks())):"[unavailable]"}catch(n){s.errors.push(`getLorebooks: ${n?.message||n}`)}try{s.rawResults.getCharLorebooks=t&&typeof t.getCharLorebooks=="function"?ba(await Promise.resolve(t.getCharLorebooks({type:"all"}))):"[unavailable]"}catch(n){s.errors.push(`getCharLorebooks: ${n?.message||n}`)}try{s.rawResults.getWorldBooks=e&&typeof e.getWorldBooks=="function"?ba(await Promise.resolve(e.getWorldBooks())):"[unavailable]"}catch(n){s.errors.push(`getWorldBooks: ${n?.message||n}`)}let r=await Cd(t),o=await Pd(t,e),a=or([...r,...o]);return s.characterWorldbooks=[...r],s.allWorldbooks=[...o],s.combinedWorldbooks=[...a],va=s,ha=a,[...a]}async function _i(t){let e=or(t?.worldbooks?.selected);if(t?.worldbooks?.enabled!==!0||e.length===0)return"";let s=wi();if(!s||typeof s.getLorebookEntries!="function")return console.warn("[ToolWorldbookService] TavernHelper.getLorebookEntries \u4E0D\u53EF\u7528\uFF0C\u65E0\u6CD5\u8BFB\u53D6\u4E16\u754C\u4E66\u5185\u5BB9\u3002"),"";let r=[];for(let o of e)try{let a=await s.getLorebookEntries(o),i=(Array.isArray(a)?a.filter(l=>l?.enabled!==!1):[]).map(Id).filter(Boolean).join(`

`);i&&r.push(`[\u4E16\u754C\u4E66\uFF1A${o}]
${i}`)}catch(a){console.warn(`[ToolWorldbookService] \u8BFB\u53D6\u4E16\u754C\u4E66\u5931\u8D25: ${o}`,a)}return r.join(`

`)}var ha,va,xa=U(()=>{vs();ha=[],va=null});var Ai={};pe(Ai,{BypassManager:()=>to,DEFAULT_BYPASS_PRESETS:()=>pt,addMessage:()=>Wd,buildBypassMessages:()=>qd,bypassManager:()=>j,createPreset:()=>Od,default:()=>Gd,deleteMessage:()=>Fd,deletePreset:()=>Ld,duplicatePreset:()=>Bd,exportPresets:()=>Hd,getAllPresets:()=>$d,getDefaultPresetId:()=>Kd,getEnabledMessages:()=>Ud,getPreset:()=>Dd,getPresetList:()=>Sa,importPresets:()=>Yd,setDefaultPresetId:()=>zd,updateMessage:()=>jd,updatePreset:()=>Nd});var yt,xs,wa,pt,Rd,to,j,$d,Sa,Dd,Od,Nd,Ld,Bd,Kd,zd,Ud,Wd,jd,Fd,Hd,Yd,qd,Gd,nr=U(()=>{Ne();fe();yt="bypass_presets",xs="default_bypass_preset",wa="current_bypass_preset",pt={},Rd=new Set(["\u6807\u51C6\u7834\u9650\u8BCD","\u589E\u5F3A\u7834\u9650"]),to=class{constructor(){this._cache=null,this._migrated=!1,this.debugMode=!1}getAllPresets(){if(this._migrateLegacyData(),this._cache)return this._cache;let e=C.get(yt,{});return this._cache={...pt,...e},this._cache}getPresetList(){let e=this.getAllPresets();return Object.values(e).sort((s,r)=>(r.updatedAt||0)-(s.updatedAt||0))}getPreset(e){return e&&this.getAllPresets()[e]||null}presetExists(e){return!!this.getPreset(e)}createPreset(e){let{id:s,name:r,description:o,messages:a}=e;if(!s||typeof s!="string"||!s.trim())return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};if(!r||typeof r!="string"||!r.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let n=s.trim();if(this.presetExists(n))return{success:!1,message:`\u9884\u8BBE "${n}" \u5DF2\u5B58\u5728`};let i={id:n,name:r.trim(),description:o||"",enabled:!0,messages:a||[],createdAt:Date.now(),updatedAt:Date.now()};return this._savePreset(n,i),$.emit(P.BYPASS_PRESET_CREATED,{presetId:n,preset:i}),this._log(`\u9884\u8BBE\u5DF2\u521B\u5EFA: ${n}`),{success:!0,message:`\u9884\u8BBE "${r}" \u521B\u5EFA\u6210\u529F`,preset:i}}updatePreset(e,s){if(!e)return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};let r=this.getPreset(e);if(!r)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};if(s.id&&s.id!==e)return{success:!1,message:"\u4E0D\u5141\u8BB8\u4FEE\u6539\u9884\u8BBEID"};let o={...r,...s,id:e,updatedAt:Date.now()};return this._savePreset(e,o),$.emit(P.BYPASS_PRESET_UPDATED,{presetId:e,preset:o}),this._log(`\u9884\u8BBE\u5DF2\u66F4\u65B0: ${e}`),{success:!0,message:`\u9884\u8BBE "${r.name}" \u66F4\u65B0\u6210\u529F`,preset:o}}deletePreset(e){if(!e)return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};if(pt[e])return{success:!1,message:"\u4E0D\u5141\u8BB8\u5220\u9664\u9ED8\u8BA4\u9884\u8BBE"};let s=this.getPreset(e);if(!s)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let r=C.get(yt,{});return delete r[e],C.set(yt,r),this._cache=null,this.getDefaultPresetId()===e&&this.setDefaultPresetId(null),$.emit(P.BYPASS_PRESET_DELETED,{presetId:e}),this._log(`\u9884\u8BBE\u5DF2\u5220\u9664: ${e}`),{success:!0,message:`\u9884\u8BBE "${s.name}" \u5DF2\u5220\u9664`}}duplicatePreset(e,s,r){let o=this.getPreset(e);if(!o)return{success:!1,message:`\u6E90\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};if((!s||!s.trim())&&(s=`${e}_copy_${Date.now()}`),this.presetExists(s))return{success:!1,message:`\u9884\u8BBE "${s}" \u5DF2\u5B58\u5728`};let a={...JSON.parse(JSON.stringify(o)),id:s.trim(),name:r||`${o.name} (\u526F\u672C)`,createdAt:Date.now(),updatedAt:Date.now()};return this._savePreset(s.trim(),a),$.emit(P.BYPASS_PRESET_CREATED,{presetId:s,preset:a}),{success:!0,message:`\u9884\u8BBE\u5DF2\u590D\u5236\u4E3A "${a.name}"`,preset:a}}addMessage(e,s){let r=this.getPreset(e);if(!r)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let o={id:`msg_${Date.now()}`,role:s.role||"SYSTEM",content:s.content||"",enabled:s.enabled!==!1,deletable:s.deletable!==!1},a=[...r.messages||[],o];return this.updatePreset(e,{messages:a})}updateMessage(e,s,r){let o=this.getPreset(e);if(!o)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let a=o.messages||[],n=a.findIndex(l=>l.id===s);if(n===-1)return{success:!1,message:`\u6D88\u606F "${s}" \u4E0D\u5B58\u5728`};let i=[...a];return i[n]={...i[n],...r},this.updatePreset(e,{messages:i})}deleteMessage(e,s){let r=this.getPreset(e);if(!r)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let o=r.messages||[],a=o.find(i=>i.id===s);if(!a)return{success:!1,message:`\u6D88\u606F "${s}" \u4E0D\u5B58\u5728`};if(a.deletable===!1)return{success:!1,message:"\u8BE5\u6D88\u606F\u4E0D\u53EF\u5220\u9664"};let n=o.filter(i=>i.id!==s);return this.updatePreset(e,{messages:n})}getEnabledMessages(e){let s=this.getPreset(e);return!s||!s.enabled?[]:(s.messages||[]).filter(r=>r.enabled!==!1)}getDefaultPresetId(){this._migrateLegacyData();let e=C.get(xs,null);return e==="undefined"||e==="null"||e===""?(C.remove(xs),null):e}setDefaultPresetId(e){return e&&!this.presetExists(e)?!1:(C.set(xs,e),$.emit(P.BYPASS_PRESET_ACTIVATED,{presetId:e}),this._log(`\u9ED8\u8BA4\u9884\u8BBE\u5DF2\u8BBE\u7F6E: ${e}`),!0)}getDefaultPreset(){let e=this.getDefaultPresetId();return e?this.getPreset(e):null}exportPresets(e=null){if(e){let r=this.getPreset(e);if(!r)throw new Error(`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`);return JSON.stringify(r,null,2)}let s=this.getAllPresets();return JSON.stringify({version:"1.0.0",exportedAt:new Date().toISOString(),presets:Object.values(s)},null,2)}importPresets(e,s={}){let{overwrite:r=!1}=s,o;try{o=JSON.parse(e)}catch{return{success:!1,message:"JSON\u89E3\u6790\u5931\u8D25",imported:0}}let a=Array.isArray(o)?o:o.presets?o.presets:[o];if(a.length===0)return{success:!1,message:"\u6CA1\u6709\u627E\u5230\u6709\u6548\u7684\u9884\u8BBE\u6570\u636E",imported:0};let n=C.get(yt,{}),i=0;for(let l of a)!l.id||typeof l.id!="string"||l.name&&(pt[l.id]&&!r||!r&&n[l.id]||(n[l.id]={...l,updatedAt:Date.now()},i++));return i>0&&(C.set(yt,n),this._cache=null),{success:!0,message:`\u6210\u529F\u5BFC\u5165 ${i} \u4E2A\u9884\u8BBE`,imported:i}}getToolBypassPreset(e){if(!e?.bypass?.enabled)return null;let s=e?.bypass?.presetId;return s?this.getPreset(s):this.getDefaultPreset()}buildBypassMessages(e){let s=this.getToolBypassPreset(e);return s?this.getEnabledMessages(s.id):[]}_savePreset(e,s){let r=C.get(yt,{});r[e]=s,C.set(yt,r),this._cache=null}_migrateLegacyData(){if(this._migrated)return;let e=C.get(yt,{}),s={},r=!1,o=Array.isArray(e)?e.map((a,n)=>[a?.id||a?.name||`legacy_${n}`,a]):Object.entries(e||{});for(let[a,n]of o){let i=this._normalizePreset(a,n,s);if(!i){r=!0;continue}s[i.id]=i,(!e?.[i.id]||e?.[i.id]?.id!==i.id)&&(r=!0)}r&&C.set(yt,s),this._migrateDefaultPreset(s),this._cache=null,this._migrated=!0}_normalizePreset(e,s,r={}){if(!s||typeof s!="object")return null;let o=typeof s.name=="string"?s.name.trim():"",a=typeof s.id=="string"?s.id.trim():"",n=typeof e=="string"?e.trim():"";if(!o&&n&&n!=="undefined"&&n!=="null"&&(o=n),this._isLegacySamplePreset(o,a)||(!a&&n&&n!=="undefined"&&n!=="null"&&(a=n),!a&&o&&o!=="undefined"&&o!=="null"&&(a=this._generatePresetId(o,r)),!o||!a||a==="undefined"||o==="undefined"))return null;let l=Array.isArray(s.messages)?s.messages.filter(c=>c&&typeof c=="object").map((c,d)=>({id:typeof c.id=="string"&&c.id.trim()?c.id.trim():`${a}_msg_${d+1}`,role:c.role||"SYSTEM",content:typeof c.content=="string"?c.content:"",enabled:c.enabled!==!1,deletable:c.deletable!==!1})):[];return{...s,id:a,name:o,description:typeof s.description=="string"?s.description:"",enabled:s.enabled!==!1,messages:l,createdAt:s.createdAt||Date.now(),updatedAt:s.updatedAt||Date.now()}}_migrateDefaultPreset(e){let s=C.get(xs,null),r=C.get(wa,null),o=s??r;(o==="undefined"||o==="null"||o==="")&&(o=null),o&&!e[o]&&(o=Object.values(e).find(n=>n.name===o)?.id||null),o?C.set(xs,o):C.remove(xs),C.has(wa)&&C.remove(wa)}_isLegacySamplePreset(e,s=""){return e?s==="standard"||s==="enhanced"||s==="jailbreak"||Rd.has(e)?!0:/^增强破限（副本）(?:\s*\(\d+\))?$/.test(e):!1}_generatePresetId(e,s={}){let r=String(e).trim().toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g,"_").replace(/^_+|_+$/g,"")||`bypass_${Date.now()}`,o=r,a=1;for(;s[o];)o=`${r}_${a++}`;return o}_log(...e){this.debugMode&&console.log("[BypassManager]",...e)}},j=new to,$d=()=>j.getAllPresets(),Sa=()=>j.getPresetList(),Dd=t=>j.getPreset(t),Od=t=>j.createPreset(t),Nd=(t,e)=>j.updatePreset(t,e),Ld=t=>j.deletePreset(t),Bd=(t,e,s)=>j.duplicatePreset(t,e,s),Kd=()=>j.getDefaultPresetId(),zd=t=>j.setDefaultPresetId(t),Ud=t=>j.getEnabledMessages(t),Wd=(t,e)=>j.addMessage(t,e),jd=(t,e,s)=>j.updateMessage(t,e,s),Fd=(t,e)=>j.deleteMessage(t,e),Hd=t=>j.exportPresets(t),Yd=(t,e)=>j.importPresets(t,e),qd=t=>j.buildBypassMessages(t),Gd=j});var Ei={};pe(Ei,{DEFAULT_SETTINGS:()=>ir,SettingsService:()=>so,default:()=>Vd,settingsService:()=>Ue});var ir,Ta,so,Ue,Vd,lr=U(()=>{Ne();fe();ir={executor:{maxConcurrent:3,maxRetries:2,retryDelayMs:5e3,requestTimeoutMs:9e4,queueStrategy:"fifo"},automation:{enabled:!1,settleMs:1200,cooldownMs:5e3,maxConcurrentSlots:1},debug:{enableDebugLog:!1,saveExecutionHistory:!0,showRuntimeBadge:!0},ui:{compactMode:!1,animationEnabled:!0,theme:"dark-blue",startupScreenDismissed:!1}},Ta="settings_v2",so=class{constructor(){this._cache=null}getSettings(){if(this._cache)return this._cache;let e=C.get(Ta,{});return this._cache=this._mergeWithDefaults(e),this._cache}saveSettings(e){this._cache=this._mergeWithDefaults(e),C.set(Ta,this._cache),$.emit(P.SETTINGS_UPDATED,{settings:this._cache})}updateSettings(e){let s=this.getSettings(),r=this._deepMerge(s,e);this.saveSettings(r)}getExecutorSettings(){return this.getSettings().executor}updateExecutorSettings(e){this.updateSettings({executor:e})}getAutomationSettings(){return this.getSettings().automation}updateAutomationSettings(e){this.updateSettings({automation:e})}getDebugSettings(){return this.getSettings().debug}updateDebugSettings(e){this.updateSettings({debug:e})}getUiSettings(){return this.getSettings().ui}updateUiSettings(e){this.updateSettings({ui:e})}resetSettings(){this._cache=JSON.parse(JSON.stringify(ir)),C.set(Ta,this._cache),$.emit(P.SETTINGS_UPDATED,{settings:this._cache,reset:!0})}get(e,s=null){let r=this.getSettings(),o=e.split("."),a=r;for(let n of o)if(a&&typeof a=="object"&&n in a)a=a[n];else return s;return a}set(e,s){let r=JSON.parse(JSON.stringify(this.getSettings())),o=e.split("."),a=r;for(let n=0;n<o.length-1;n+=1){let i=o[n];i in a||(a[i]={}),a=a[i]}a[o[o.length-1]]=s,this.saveSettings(r)}_mergeWithDefaults(e){return this._deepMerge(JSON.parse(JSON.stringify(ir)),e)}_deepMerge(e,s){let r={...e};for(let o in s)s[o]&&typeof s[o]=="object"&&!Array.isArray(s[o])?r[o]=this._deepMerge(e[o]||{},s[o]):r[o]=s[o];return r}},Ue=new so,Vd=Ue});var ki={};pe(ki,{ContextInjector:()=>oo,DEFAULT_INJECTION_OPTIONS:()=>Mi,WRITEBACK_METHODS:()=>xe,WRITEBACK_RESULT_STATUS:()=>ro,contextInjector:()=>$e,default:()=>tu});function cr(t){return typeof t=="number"&&Number.isFinite(t)?String(t):typeof t=="string"&&t.trim()?t.trim():""}function Jd(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window}function Xd(t){try{return t?.SillyTavern?.getContext?.()||null}catch{return null}}function Qd(){let t=Jd(),e=t?.SillyTavern||null,s=Xd(t),r=e?.eventSource||t?.eventSource||s?.eventSource||null,o=e?.eventTypes||e?.event_types||s?.eventTypes||s?.event_types||t?.eventTypes||t?.event_types||{};return{topWindow:t,api:e,context:s,eventSource:r,eventTypes:o,source:e?.eventSource?"SillyTavern.eventSource":t?.eventSource?"topWindow.eventSource":s?.eventSource?"SillyTavern.getContext().eventSource":"unavailable"}}function rt(t,e){let s=String(e||"").trim();return s?Array.isArray(t)?(t.includes(s)||t.push(s),t):[s]:t}function Ss(t={}){if(t?.signal?.aborted)return"\u5DE5\u5177\u7ED3\u679C\u5DF2\u53D6\u6D88\uFF0C\u8DF3\u8FC7\u5199\u56DE";if(typeof t?.shouldAbortWriteback=="function")try{if(t.shouldAbortWriteback()===!0)return"\u5DE5\u5177\u7ED3\u679C\u5DF2\u8FC7\u671F\uFF0C\u8DF3\u8FC7\u5199\u56DE"}catch{return"\u5DE5\u5177\u7ED3\u679C\u5DF2\u8FC7\u671F\uFF0C\u8DF3\u8FC7\u5199\u56DE"}return""}var Ce,ws,Mi,ro,xe,Zd,eu,oo,$e,tu,Jt=U(()=>{fe();Ce="YouYouToolkit_toolOutputs",ws="YouYouToolkit_injectedContext",Mi={overwrite:!0,enabled:!0};ro={SUCCESS:"success",FAILED:"failed"},xe={NONE:"none",LOCAL_ONLY:"local_only",SET_CHAT_MESSAGES:"setChatMessages",SET_CHAT_MESSAGE:"setChatMessage"},Zd=60,eu=3;oo=class{constructor(){this.debugMode=!1}async inject(e,s,r={}){return(await this.injectDetailed(e,s,r)).success}async injectDetailed(e,s,r={}){let o={...Mi,...r},a=this._createWritebackResult(e,o);if(!e||s===void 0||s===null)return this._log("\u6CE8\u5165\u5931\u8D25: \u53C2\u6570\u65E0\u6548"),a.error="\u6CE8\u5165\u5931\u8D25: \u53C2\u6570\u65E0\u6548",a;if(!cr(o.sourceMessageId))return this._log("\u6CE8\u5165\u5931\u8D25: \u7F3A\u5C11 sourceMessageId"),a.error="\u6CE8\u5165\u5931\u8D25: \u7F3A\u5C11 sourceMessageId",a;if(o?.signal?.aborted)return a.error="\u5DE5\u5177\u7ED3\u679C\u5DF2\u53D6\u6D88\uFF0C\u8DF3\u8FC7\u5199\u56DE",a;if(typeof o?.shouldAbortWriteback=="function")try{if(o.shouldAbortWriteback()===!0)return a.error="\u5DE5\u5177\u7ED3\u679C\u5DF2\u8FC7\u671F\uFF0C\u8DF3\u8FC7\u5199\u56DE",a}catch{return a.error="\u5DE5\u5177\u7ED3\u679C\u5DF2\u8FC7\u671F\uFF0C\u8DF3\u8FC7\u5199\u56DE",a}let n=a.chatId,i={toolId:e,content:String(s),updatedAt:Date.now(),sourceMessageId:o.sourceMessageId||null,sourceSwipeId:o.sourceSwipeId||o.effectiveSwipeId||null,options:o};$.emit(P.TOOL_CONTEXT_INJECTED,{toolId:e,chatId:n,content:i.content,sourceMessageId:i.sourceMessageId,sourceSwipeId:i.sourceSwipeId,effectiveSwipeId:i.sourceSwipeId,slotBindingKey:o.slotBindingKey||"",slotRevisionKey:o.slotRevisionKey||"",slotTransactionId:o.slotTransactionId||"",traceId:o.traceId||"",sessionKey:o.sessionKey||"",options:o});let l=await this._insertToolOutputToBoundAssistantSlot(e,i,o,a);return l.success&&this._log(`\u6CE8\u5165\u6210\u529F: ${e} -> ${n}`,l),l}getAggregatedContext(e){return this.getLatestMessageInjectedContext()}getLatestMessageInjectedContext(e=null){try{let{chat:s}=this._getChatRuntime(),r=this._findAssistantMessageIndex(s,e);if(r<0)return"";let o=s[r]||{},a=o[ws];if(typeof a=="string"&&a.trim())return a.trim();let n=o[Ce];return n&&typeof n=="object"?this._buildMessageInjectedContext(n).trim():""}catch(s){return this._log("\u8BFB\u53D6\u6700\u65B0 AI \u6D88\u606F injectedContext \u5931\u8D25",s),""}}_getLatestAssistantMessageOutputs(){try{let{chat:e}=this._getChatRuntime(),s=this._findAssistantMessageIndex(e,null);if(s<0)return{};let o=(e[s]||{})[Ce];return o&&typeof o=="object"?o:{}}catch(e){return this._log("\u8BFB\u53D6\u6700\u65B0 AI \u6D88\u606F\u4E0A\u4E0B\u6587\u5931\u8D25",e),{}}}getToolContext(e,s){if(!s)return null;try{let{chat:r}=this._getChatRuntime(),o=this._findAssistantMessageIndex(r,null);return o<0?null:r[o]?.[Ce]?.[s]||null}catch{return null}}getAllToolContexts(e){return this._getLatestAssistantMessageOutputs()}async clearToolContext(e,s){if(!s)return!1;try{let{api:r,context:o,chat:a}=this._getChatRuntime(),n=this._findAssistantMessageIndex(a,null);if(n<0)return!1;let i=a[n],l=i?.[Ce];if(!l||!l[s])return!1;delete l[s],i[Ce]=l,i[ws]=this._buildMessageInjectedContext(l);let c=o?.saveChat||r?.saveChat||null;return typeof c=="function"&&await c.call(o||r),$.emit(P.TOOL_CONTEXT_CLEARED,{chatId:e||this._getCurrentChatId(),toolId:s}),!0}catch(r){return this._log("\u6E05\u9664\u5DE5\u5177\u4E0A\u4E0B\u6587\u5931\u8D25",r),!1}}async clearAllContext(e){try{let{api:s,context:r,chat:o}=this._getChatRuntime(),a=this._findAssistantMessageIndex(o,null);if(a<0)return!1;let n=o[a];delete n[Ce],delete n[ws];let i=r?.saveChat||s?.saveChat||null;return typeof i=="function"&&await i.call(r||s),$.emit(P.TOOL_CONTEXT_CLEARED,{chatId:e||this._getCurrentChatId(),allTools:!0}),!0}catch(s){return this._log("\u6E05\u9664\u6240\u6709\u5DE5\u5177\u4E0A\u4E0B\u6587\u5931\u8D25",s),!1}}clearAllChatsContexts(){this._log("\u6E05\u9664\u6240\u6709\u4E0A\u4E0B\u6587")}hasToolContext(e,s){return!!this.getToolContext(e,s)}getContextSummary(e){let s=this._getLatestAssistantMessageOutputs(),r=Object.entries(s).map(([o,a])=>({toolId:o,updatedAt:a.updatedAt,contentLength:a.content?.length||0}));return{chatId:e||this._getCurrentChatId(),tools:r,totalCount:r.length}}exportContext(e){return{chatId:e||this._getCurrentChatId(),contexts:this._getLatestAssistantMessageOutputs(),exportedAt:Date.now()}}importContext(e,s={}){return!1}_getChatRuntime(){try{let e=typeof window.parent<"u"&&window.parent!==window?window.parent:window,s=e.SillyTavern||null,r=s?.getContext?.()||null,o=Array.isArray(r?.chat)?r.chat:[],a=Array.isArray(s?.chat)?s.chat:[],n=o.length?o:a;return{topWindow:e,api:s,context:r,chat:n,contextChat:o,apiChat:a}}catch{return{topWindow:null,api:null,context:null,chat:[],contextChat:[],apiChat:[]}}}_createWritebackResult(e,s={}){let r=xe.SET_CHAT_MESSAGE;return{success:!1,toolId:e,chatId:this._getCurrentChatId(),traceId:s.traceId||"",sessionKey:s.sessionKey||"",sourceMessageId:s.sourceMessageId||null,sourceSwipeId:s.sourceSwipeId||s.effectiveSwipeId||null,effectiveSwipeId:s.effectiveSwipeId||s.sourceSwipeId||null,slotBindingKey:s.slotBindingKey||"",slotRevisionKey:s.slotRevisionKey||"",slotTransactionId:s.slotTransactionId||"",messageIndex:-1,textField:"",blockIdentity:null,hostUpdateMethod:xe.NONE,commit:{preferredMethod:r,attemptedMethods:[],appliedMethod:xe.NONE,fallbackUsed:!1,contentCommitted:!1,hostCommitApplied:!1},refresh:{requestMethods:[],requested:!1,confirmChecks:0,confirmed:!1,confirmedBy:"",eventSource:"",eventName:""},contentCommitted:!1,hostCommitApplied:!1,refreshRequested:!1,refreshConfirmed:!1,writebackStatus:ro.FAILED,replacedExistingBlock:!1,insertedNewBlock:!1,conflictDetected:!1,conflictReason:"",preservedOtherToolBlocks:!0,error:"",errors:[],steps:{foundTargetMessage:!1,contentCommitted:!1,localTextApplied:!1,runtimeSynced:!1,hostSetChatMessages:!1,hostSetChatMessage:!1,refreshForceSetChatMessage:!1,saveChatDebounced:!1,saveChat:!1,refreshRequested:!1,notifiedMessageUpdated:!1,verifiedAfterWrite:!1,refreshConfirmed:!1},verification:{textIncludesContent:!1,mirrorStored:!1,refreshConfirmed:!1}}}async _wait(e){await new Promise(s=>setTimeout(s,e))}_collectWritebackVerification(e,s,r,o,a,n=null){let i=e?.contextChat?.[r]||e?.apiChat?.[r]||s?.[r]||n||null,l=this._getWritableMessageField(i).text||"",c=i?.[Ce]?.[o],d=a?l.includes(a):!0,u=!!(c&&String(c.content||"").trim()===a);return{latestMessage:i,latestText:l,textIncludesContent:d,mirrorStored:u}}async _confirmRefresh(e,s,r,o,a,n=null){let i=1,l=this._collectWritebackVerification(e,s,r,o,a,n);for(let c=0;c<eu;c+=1){if(l.textIncludesContent&&l.mirrorStored)return{...l,refreshConfirmed:!0,confirmChecks:i,confirmedBy:"text_and_mirror_present"};await this._wait(Zd),i+=1,l=this._collectWritebackVerification(e,s,r,o,a,n)}return{...l,refreshConfirmed:l.textIncludesContent&&l.mirrorStored,confirmChecks:i,confirmedBy:l.textIncludesContent&&l.mirrorStored?"text_and_mirror_present":""}}async _requestAssistantMessageRefresh(e,s,r,o={},a=null){let n=a||this._createWritebackResult("",o),{api:i,context:l}=e||{},c=l?.setChatMessages||i?.setChatMessages||e?.topWindow?.setChatMessages||null,d=l?.setChatMessage||i?.setChatMessage||e?.topWindow?.setChatMessage||null,u=o.replaceFullMessage!==!0;n.commit.preferredMethod=typeof d=="function"?xe.SET_CHAT_MESSAGE:typeof c=="function"?xe.SET_CHAT_MESSAGES:xe.LOCAL_ONLY;let y=!1,g=Ss(o);if(g)return n.error=g,n;if(typeof d=="function"){rt(n.commit.attemptedMethods,xe.SET_CHAT_MESSAGE);try{let m=Ss(o);if(m)return n.error=m,n;await d.call(l||i||e?.topWindow,{message:r,mes:r,content:r,text:r},s,{swipe_id:cr(o.sourceSwipeId||o.effectiveSwipeId)||"current",refresh:"display_and_render_current"}),n.steps.hostSetChatMessage=!0,n.hostUpdateMethod=xe.SET_CHAT_MESSAGE,n.hostCommitApplied=!0,n.commit.appliedMethod=xe.SET_CHAT_MESSAGE,n.commit.hostCommitApplied=!0,y=!0}catch(m){this._log("setChatMessage \u5199\u56DE\u5931\u8D25\uFF0C\u56DE\u9000\u672C\u5730\u540C\u6B65",m),n.errors.push(`setChatMessage: ${m?.message||String(m)}`)}}if(!y&&typeof c=="function"){rt(n.commit.attemptedMethods,xe.SET_CHAT_MESSAGES);try{let m=Ss(o);if(m)return n.error=m,n;await c.call(l||i||e?.topWindow,[{message_id:cr(o.sourceMessageId)||s,chat_index:s,message:r,mes:r,content:r,text:r}],{refresh:"affected"}),n.steps.hostSetChatMessages=!0,n.hostUpdateMethod=xe.SET_CHAT_MESSAGES,n.hostCommitApplied=!0,n.commit.appliedMethod=xe.SET_CHAT_MESSAGES,n.commit.hostCommitApplied=!0,n.commit.fallbackUsed=!0,y=!0}catch(m){this._log("setChatMessages \u5199\u56DE\u5931\u8D25\uFF0C\u56DE\u9000\u672C\u5730\u540C\u6B65",m),n.errors.push(`setChatMessages: ${m?.message||String(m)}`)}}if(y&&(n.refreshRequested=!0,rt(n.refresh.requestMethods,n.hostUpdateMethod)),u&&typeof c=="function"){rt(n.commit.attemptedMethods,"setChatMessages_refresh_assist");try{let m=Ss(o);if(m)return n.error=m,n;await c.call(l||i||e?.topWindow,[{message_id:cr(o.sourceMessageId)||s,chat_index:s,message:r,mes:r,content:r,text:r}],{refresh:"affected"}),n.refreshRequested=!0,rt(n.refresh.requestMethods,"setChatMessages_refresh_assist")}catch(m){this._log("append \u5199\u56DE\u8865\u5145\u5237\u65B0\u5931\u8D25",m),n.errors.push(`setChatMessages_refresh_assist: ${m?.message||String(m)}`)}}return y||(rt(n.commit.attemptedMethods,xe.LOCAL_ONLY),n.commit.appliedMethod=xe.LOCAL_ONLY,n.commit.fallbackUsed=n.commit.preferredMethod!==xe.LOCAL_ONLY,n.hostUpdateMethod=n.commit.appliedMethod),n}_inferBlockType(e){let s=String(e||"").trim();if(!s)return"empty";let r=s.match(/^<([a-zA-Z0-9_-]+)(?:\s[^>]*)?>[\s\S]*<\/\1>$/);return r?.[1]?r[1]:"plain_text"}_stripExactStoredBlock(e,s,r=""){let o=String(e||""),a=String(s||"").trim(),n=String(r||"").trim();return a?o.includes(a)?n?{text:o.replace(a,n).trimEnd(),removed:!0,replaced:!0}:{text:o.replace(a,"").trimEnd(),removed:!0,replaced:!1}:{text:o,removed:!1,replaced:!1}:{text:o,removed:!1,replaced:!1}}_syncMessageToRuntimeChats(e,s,r){let{contextChat:o,apiChat:a}=e||{},n=i=>{!Array.isArray(i)||s<0||s>=i.length||i[s]!==r&&(i[s]={...i[s]||{},...r})};n(o),n(a)}_notifyMessageUpdated(e,s){try{let r=Qd(),o=r?.topWindow||e?.topWindow,a=r?.eventSource||null,n=r?.eventTypes||{},i=n.MESSAGE_UPDATED||n.message_updated||"MESSAGE_UPDATED";return a&&typeof a.emit=="function"?(a.emit(i,s),typeof o?.requestAnimationFrame=="function"?o.requestAnimationFrame(()=>{a.emit(i,s)}):typeof o?.setTimeout=="function"&&o.setTimeout(()=>{a.emit(i,s)},30),{emitted:!0,source:r?.source||"unavailable",eventName:i}):{emitted:!1,source:r?.source||"unavailable",eventName:i}}catch(r){return this._log("\u89E6\u53D1\u6D88\u606F\u5237\u65B0\u4E8B\u4EF6\u5931\u8D25",r),{emitted:!1,source:"error",eventName:"",error:r?.message||String(r)}}}_isAssistantMessage(e){if(!e||e.is_user||e.is_system)return!1;let s=String(e.role||"").toLowerCase();return s==="assistant"||s==="ai"||!s}_findAssistantMessageIndex(e,s){let r=Array.isArray(e)?e:[];if(!r.length)return-1;let o=s!=null&&s!=="",a=(n,i)=>{if(!this._isAssistantMessage(n)||s==null||s==="")return!1;let l=String(s).trim();return l?[n.message_id,n.id,n.messageId,n.mes_id,i].map(d=>d==null?"":String(d).trim()).includes(l):!1};for(let n=r.length-1;n>=0;n-=1)if(a(r[n],n))return n;if(o)return-1;for(let n=r.length-1;n>=0;n-=1)if(this._isAssistantMessage(r[n]))return n;return-1}_buildMessageInjectedContext(e){let r=Object.entries(e&&typeof e=="object"?e:{}).filter(([,a])=>a?.blockType!=="full_message").sort(([,a],[,n])=>(a?.updatedAt||0)-(n?.updatedAt||0));if(!r.length)return"";let o=["[\u5DE5\u5177\u4E0A\u4E0B\u6587\u6CE8\u5165]",""];for(let[a,n]of r)o.push(`[${a}]`),o.push(n?.content||""),o.push("");return o.join(`
`)}_getWritableMessageField(e){let s=["mes","message","content","text"];for(let r of s)if(typeof e?.[r]=="string")return{key:r,text:e[r]};return{key:"mes",text:""}}_applyMessageText(e,s,r={}){let o=e&&typeof e=="object"?e:{},a=["mes","message","content","text"],n=!1;if(a.forEach(i=>{typeof o[i]=="string"&&(o[i]=s,n=!0)}),n||(o.mes=s,o.message=s),Array.isArray(o.swipes)){let i=Number.parseInt(cr(r?.sourceSwipeId||r?.effectiveSwipeId),10),l=Number.isInteger(i)?i:Number.isInteger(o.swipe_id)?o.swipe_id:Number.isInteger(o.swipeId)?o.swipeId:0;l>=0&&l<o.swipes.length&&(o.swipes[l]=s,o.swipe_id=l,o.swipeId=l)}return o}_stripExistingToolOutput(e,s=[]){let r=String(e||"");return(Array.isArray(s)?s:[]).forEach(a=>{let n=String(a||"").trim();if(!n)return;if(n.startsWith("regex:")){try{let d=new RegExp(n.slice(6).trim(),"gis");r=r.replace(d,"")}catch(d){this._log("\u79FB\u9664\u65E7\u5DE5\u5177\u8F93\u51FA\u65F6\u6B63\u5219\u65E0\u6548",n,d)}return}let i=n.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),l=new RegExp(`<${i}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${i}>\\s*`,"gi"),c=new RegExp(`\\{${i}\\|[\\s\\S]*?\\}\\s*`,"gi");r=r.replace(l,""),r=r.replace(c,"")}),r.trimEnd()}_stripPreviousStoredToolContent(e,s){let r=String(e||""),o=String(s||"").trim();return o?r.replace(o,"").trimEnd():r.trimEnd()}async _insertToolOutputToBoundAssistantSlot(e,s,r={},o=null){let a=o||this._createWritebackResult(e,r);try{let n=this._getChatRuntime(),{context:i,chat:l}=n;if(!Array.isArray(l)||!l.length)return this._log("\u672A\u627E\u5230\u804A\u5929\u6D88\u606F\uFF0C\u65E0\u6CD5\u63D2\u5165\u5DE5\u5177\u8F93\u51FA"),a.error="\u672A\u627E\u5230\u804A\u5929\u6D88\u606F\uFF0C\u65E0\u6CD5\u63D2\u5165\u5DE5\u5177\u8F93\u51FA",a;let c=this._findAssistantMessageIndex(l,r.sourceMessageId);if(c<0)return this._log("\u672A\u627E\u5230\u53EF\u5199\u5165\u7684\u6700\u65B0 AI \u56DE\u590D\u6D88\u606F"),a.error="\u672A\u627E\u5230\u53EF\u5199\u5165\u7684\u6700\u65B0 AI \u56DE\u590D\u6D88\u606F",a;if(r?.signal?.aborted)return a.error="\u5DE5\u5177\u7ED3\u679C\u5DF2\u53D6\u6D88\uFF0C\u8DF3\u8FC7\u5199\u56DE",a;if(typeof r?.shouldAbortWriteback=="function")try{if(r.shouldAbortWriteback()===!0)return a.error="\u5DE5\u5177\u7ED3\u679C\u5DF2\u8FC7\u671F\uFF0C\u8DF3\u8FC7\u5199\u56DE",a}catch{return a.error="\u5DE5\u5177\u7ED3\u679C\u5DF2\u8FC7\u671F\uFF0C\u8DF3\u8FC7\u5199\u56DE",a}a.messageIndex=c,a.steps.foundTargetMessage=!0;let d=l[c],{key:u,text:y}=this._getWritableMessageField(d);a.textField=u;let g=d[Ce]&&typeof d[Ce]=="object"?d[Ce]:{},m=g?.[e]||{},v=m?.content||"",b=m?.blockText||v||"",S=Object.entries(g).filter(([we])=>we!==e).map(([,we])=>we||{}),A=String(s.content||"").trim(),w=r.replaceFullMessage===!0,M=w?"full_message":this._inferBlockType(A),I={toolId:e,messageId:r.sourceMessageId||d?.message_id||d?.messageId||c,blockType:M,insertedAt:s.updatedAt,replaceable:r.overwrite!==!1};a.blockIdentity=I;let k=r.overwrite===!1||w?{text:String(y||""),removed:!1,replaced:!1}:this._stripExactStoredBlock(y,b,A),N=k.text,te="";!w&&r.overwrite!==!1&&b&&!k.removed&&(te="previous_block_not_found");let Y=r.overwrite===!1||k.replaced||w?N:this._stripExistingToolOutput(N,r.extractionSelectors),K=Y!==N;N=Y;let ie=r.overwrite===!1||k.replaced||w?N:this._stripPreviousStoredToolContent(N,v),X=ie!==N;N=ie,a.replacedExistingBlock=w||k.removed||K||X;let ye=r.overwrite===!1?String(y||""):N,Xe=w?A:k.replaced?N.trim():[ye.trimEnd(),A].filter(Boolean).join(`

`).trim();a.insertedNewBlock=!!A;let Q=S.every(we=>{if(we?.blockType==="full_message")return!0;let ce=String(we?.blockText||we?.content||"").trim();return ce?Xe.includes(ce):!0});a.preservedOtherToolBlocks=Q,Q?te&&(a.conflictDetected=!0,a.conflictReason=te):(a.conflictDetected=!0,a.conflictReason="other_tool_block_removed");let It={...g,[e]:{toolId:e,content:A,blockText:A,blockType:M,blockIdentity:I,updatedAt:s.updatedAt,sourceMessageId:s.sourceMessageId||null}},He=Ss(r);if(He)return a.error=He,a;d[u]=Xe,this._applyMessageText(d,Xe,r),d[Ce]=It,d[ws]=this._buildMessageInjectedContext(It),a.contentCommitted=!0,a.commit.contentCommitted=!0,a.steps.contentCommitted=!0,a.steps.localTextApplied=!0,this._syncMessageToRuntimeChats(n,c,d),a.steps.runtimeSynced=!0;let Ct=Ss(r);if(Ct)return a.error=Ct,a;await this._requestAssistantMessageRefresh(n,c,Xe,r,a);let Pt=i?.saveChat||n?.api?.saveChat||null,le=i?.saveChatDebounced||n?.api?.saveChatDebounced||null;typeof le=="function"&&(le.call(i||api),a.steps.saveChatDebounced=!0,a.refreshRequested=!0,rt(a.refresh.requestMethods,"saveChatDebounced")),typeof Pt=="function"&&(await Pt.call(i||api),a.steps.saveChat=!0,a.refreshRequested=!0,rt(a.refresh.requestMethods,"saveChat"));let ee=this._notifyMessageUpdated(n,c);a.steps.notifiedMessageUpdated=ee?.emitted===!0,a.refresh.eventSource=ee?.source||"",a.refresh.eventName=ee?.eventName||"",ee?.error&&a.errors.push(`MESSAGE_UPDATED: ${ee.error}`);let mt=String(s.content||"").trim();(a.steps.hostSetChatMessages||a.steps.hostSetChatMessage)&&(a.refreshRequested=!0,rt(a.refresh.requestMethods,a.hostUpdateMethod)),a.steps.notifiedMessageUpdated&&(a.refreshRequested=!0,rt(a.refresh.requestMethods,`MESSAGE_UPDATED:${a.refresh.eventName||"MESSAGE_UPDATED"}`)),a.steps.refreshRequested=a.refreshRequested,a.refresh.requested=a.refreshRequested;let Ae=await this._confirmRefresh(n,l,c,e,mt,d);return a.verification.textIncludesContent=Ae.textIncludesContent,a.verification.mirrorStored=Ae.mirrorStored,a.verification.refreshConfirmed=Ae.refreshConfirmed,a.steps.verifiedAfterWrite=a.verification.textIncludesContent&&a.verification.mirrorStored,a.refreshConfirmed=a.verification.refreshConfirmed&&a.refreshRequested,a.refresh.confirmChecks=Number(Ae.confirmChecks)||0,a.refresh.confirmedBy=Ae.confirmedBy||"",a.refresh.confirmed=a.refreshConfirmed,a.steps.refreshConfirmed=a.refreshConfirmed,a.success=a.steps.localTextApplied&&a.steps.runtimeSynced&&a.steps.verifiedAfterWrite&&a.refreshConfirmed,a.writebackStatus=a.success?ro.SUCCESS:ro.FAILED,!a.success&&!a.error&&(a.error=a.refreshRequested?"\u5DE5\u5177\u7ED3\u679C\u5DF2\u63D0\u4EA4\uFF0C\u4F46\u5BBF\u4E3B\u5237\u65B0\u786E\u8BA4\u672A\u901A\u8FC7":"\u5DE5\u5177\u7ED3\u679C\u5DF2\u5C1D\u8BD5\u5199\u56DE\uFF0C\u4F46\u6700\u7EC8\u6821\u9A8C\u672A\u901A\u8FC7"),a.conflictDetected&&!a.error&&(a.error=`\u5DE5\u5177\u7ED3\u679C\u5DF2\u5199\u56DE\uFF0C\u4F46\u68C0\u6D4B\u5230\u5757\u51B2\u7A81\uFF1A${a.conflictReason}`),this._log(`\u5DF2\u5C06\u5DE5\u5177\u8F93\u51FA\u5199\u5165\u7ED1\u5B9A assistant \u69FD\u4F4D: ${e} -> #${c}`),a}catch(n){return this._log("\u63D2\u5165\u6700\u65B0 AI \u56DE\u590D\u539F\u6587\u5931\u8D25",n),a.error=n?.message||String(n),a.errors.push(a.error),a}}getAssistantMessageSnapshot(e=null){try{let s=this._getChatRuntime(),{chat:r}=s,o=this._findAssistantMessageIndex(r,e);if(o<0)return null;let a=r[o]||null,n=this._getWritableMessageField(a).text||"",i=a?.[Ce]&&typeof a[Ce]=="object"?a[Ce]:{},l=Object.values(i).reduce((c,d)=>{let u=String(d?.blockText||d?.content||"").trim();return!u||!c.includes(u)?c:c.replace(u,"").trimEnd()},String(n||"")).trim();return{messageIndex:o,message:a,messageText:n,baseText:l,toolOutputs:i,injectedContext:typeof a?.[ws]=="string"?a[ws]:this._buildMessageInjectedContext(i)}}catch(s){return this._log("\u8BFB\u53D6 assistant \u6D88\u606F\u5FEB\u7167\u5931\u8D25",s),null}}_getCurrentChatId(){try{let e=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(e.SillyTavern?.getContext){let s=e.SillyTavern.getContext(),o=[s?.chatId,s?.chat_id,s?.chat_filename,s?.chatMetadata?.chatId,s?.chatMetadata?.chat_id,s?.chatMetadata?.file_name,s?.chatMetadata?.name,e.SillyTavern?.chatId,e.SillyTavern?.chat_id,e.SillyTavern?.chat_filename].find(n=>typeof n=="string"&&n.trim());if(o)return o;let a=e.SillyTavern?.this_chid;if(a!=null)return`chat_char_${a}`}return"chat_default"}catch{return"chat_default"}}_log(...e){this.debugMode&&console.log("[ContextInjector]",...e)}},$e=new oo,tu=$e});var Ci={};pe(Ci,{BUILTIN_VARIABLES:()=>Ii,VariableResolver:()=>ao,default:()=>su,variableResolver:()=>We});var Ii,ao,We,su,dr=U(()=>{fe();Ii={lastUserMessage:{name:"lastUserMessage",description:"\u6700\u65B0\u7528\u6237\u6D88\u606F",category:"chat"},lastAiMessage:{name:"lastAiMessage",description:"\u6700\u65B0AI\u56DE\u590D",category:"chat"},chatHistory:{name:"chatHistory",description:"\u6700\u8FD1\u804A\u5929\u8BB0\u5F55",category:"chat"},characterCard:{name:"characterCard",description:"\u5F53\u524D\u89D2\u8272\u5361\u5185\u5BB9",category:"character"},toolName:{name:"toolName",description:"\u5DE5\u5177\u540D\u79F0",category:"tool"},toolId:{name:"toolId",description:"\u5DE5\u5177ID",category:"tool"},toolPromptMacro:{name:"toolPromptMacro",description:"\u5F53\u524D\u5DE5\u5177\u6A21\u677F\u63D0\u793A\u8BCD\u5B8F",category:"tool"},toolContentMacro:{name:"toolContentMacro",description:"\u5F53\u524D\u5DE5\u5177\u5904\u7406\u540E\u7684\u5185\u5BB9\u5B8F",category:"tool"},toolWorldbookContent:{name:"toolWorldbookContent",description:"\u5F53\u524D\u5DE5\u5177\u9009\u62E9\u7684\u4E16\u754C\u4E66\u6CE8\u5165\u5185\u5BB9",category:"tool"},injectedContext:{name:"injectedContext",description:"\u5DF2\u6CE8\u5165\u7684\u5DE5\u5177\u4E0A\u4E0B\u6587",category:"context"},extractedContent:{name:"extractedContent",description:"\u5DE5\u5177\u63D0\u53D6\u5185\u5BB9",category:"context"},recentMessagesText:{name:"recentMessagesText",description:"\u6700\u8FD1\u6D88\u606F\u6B63\u6587",category:"context"},rawRecentMessagesText:{name:"rawRecentMessagesText",description:"\u6700\u8FD1\u6D88\u606F\u539F\u6587",category:"context"},userMessage:{name:"userMessage",description:"\u5F53\u524D\u7528\u6237\u6D88\u606F",category:"chat"},previousToolOutput:{name:"previousToolOutput",description:"\u4E0A\u4E00\u6B21\u5DE5\u5177\u8F93\u51FA",category:"context"}},ao=class{constructor(){this.customVariables=new Map,this.variableHandlers=new Map,this.debugMode=!1,this._registerDefaultHandlers()}resolveTemplate(e,s){if(typeof e!="string")return e;let r=e;return r=this._resolveBuiltinVariables(r,s),r=this._resolveCustomVariables(r,s),r=this._resolveRegexVariables(r,s),r}resolveObject(e,s){if(!e||typeof e!="object")return e;if(Array.isArray(e))return e.map(o=>this.resolveObject(o,s));let r={};for(let[o,a]of Object.entries(e))typeof a=="string"?r[o]=this.resolveTemplate(a,s):typeof a=="object"&&a!==null?r[o]=this.resolveObject(a,s):r[o]=a;return r}buildToolContext(e){return{lastUserMessage:e.lastUserMessage||"",lastAiMessage:e.lastAiMessage||"",chatHistory:e.chatHistory||[],characterCard:e.characterCard||null,characterName:e.characterCard?.name||"",toolName:e.toolName||"",toolId:e.toolId||"",toolPromptMacro:e.toolPromptMacro||"",toolContentMacro:e.toolContentMacro||"",toolWorldbookContent:e.toolWorldbookContent||"",injectedContext:e.injectedContext||"",extractedContent:e.extractedContent||"",recentMessagesText:e.recentMessagesText||"",rawRecentMessagesText:e.rawRecentMessagesText||"",userMessage:e.userMessage||"",previousToolOutput:e.previousToolOutput||"",regexResults:e.regexResults||{},raw:e,timestamp:Date.now()}}registerVariable(e,s){e&&(this.customVariables.set(e,s),this._log(`\u6CE8\u518C\u81EA\u5B9A\u4E49\u53D8\u91CF: ${e}`))}unregisterVariable(e){this.customVariables.delete(e),this._log(`\u6CE8\u9500\u81EA\u5B9A\u4E49\u53D8\u91CF: ${e}`)}registerHandler(e,s){!e||typeof s!="function"||(this.variableHandlers.set(e,s),this._log(`\u6CE8\u518C\u53D8\u91CF\u5904\u7406\u5668: ${e}`))}getAvailableVariables(){let e=[];for(let[,s]of Object.entries(Ii))e.push({name:`{{${s.name}}}`,description:s.description,category:s.category,type:"builtin"});for(let[s,r]of this.customVariables)e.push({name:`{{${s}}}`,description:typeof r=="function"?"\u81EA\u5B9A\u4E49\u51FD\u6570\u53D8\u91CF":"\u81EA\u5B9A\u4E49\u9759\u6001\u53D8\u91CF",category:"custom",type:"custom"});return e}getVariableHelp(){let e=["\u53EF\u7528\u53D8\u91CF\uFF1A",""],s={chat:"\u804A\u5929\u76F8\u5173",character:"\u89D2\u8272\u76F8\u5173",tool:"\u5DE5\u5177\u76F8\u5173",context:"\u4E0A\u4E0B\u6587\u76F8\u5173",custom:"\u81EA\u5B9A\u4E49\u53D8\u91CF"},r={};for(let o of this.getAvailableVariables())r[o.category]||(r[o.category]=[]),r[o.category].push(o);for(let[o,a]of Object.entries(s))if(r[o]&&r[o].length>0){e.push(`\u3010${a}\u3011`);for(let n of r[o])e.push(`  ${n.name} - ${n.description}`);e.push("")}return e.push("\u3010\u6B63\u5219\u63D0\u53D6\u3011"),e.push("  {{regex.xxx}} - \u4F7F\u7528\u6B63\u5219\u63D0\u53D6\u7ED3\u679C\uFF0Cxxx\u4E3A\u6355\u83B7\u7EC4\u540D"),e.join(`
`)}_registerDefaultHandlers(){this.registerHandler("regex",(e,s)=>(s.regexResults||s.raw?.regexResults||{})[e]||"")}_resolveBuiltinVariables(e,s){let r=e;return r=r.replace(/\{\{lastUserMessage\}\}/gi,s.lastUserMessage||s.raw?.lastUserMessage||""),r=r.replace(/\{\{lastAiMessage\}\}/gi,s.lastAiMessage||s.raw?.lastAiMessage||""),r=r.replace(/\{\{chatHistory\}\}/gi,()=>{let o=s.chatHistory||s.raw?.chatHistory||[];return this._formatChatHistory(o)}),r=r.replace(/\{\{characterCard\}\}/gi,()=>{let o=s.characterCard||s.raw?.characterCard;return o?this._formatCharacterCard(o):""}),r=r.replace(/\{\{toolName\}\}/gi,s.toolName||s.raw?.toolName||""),r=r.replace(/\{\{toolId\}\}/gi,s.toolId||s.raw?.toolId||""),r=r.replace(/\{\{toolPromptMacro\}\}/gi,s.toolPromptMacro||s.raw?.toolPromptMacro||""),r=r.replace(/\{\{toolContentMacro\}\}/gi,s.toolContentMacro||s.raw?.toolContentMacro||""),r=r.replace(/\{\{toolWorldbookContent\}\}/gi,s.toolWorldbookContent||s.raw?.toolWorldbookContent||""),r=r.replace(/\{\{injectedContext\}\}/gi,s.injectedContext||s.raw?.injectedContext||""),r=r.replace(/\{\{extractedContent\}\}/gi,s.extractedContent||s.raw?.extractedContent||""),r=r.replace(/\{\{recentMessagesText\}\}/gi,s.recentMessagesText||s.raw?.recentMessagesText||""),r=r.replace(/\{\{rawRecentMessagesText\}\}/gi,s.rawRecentMessagesText||s.raw?.rawRecentMessagesText||""),r=r.replace(/\{\{userMessage\}\}/gi,s.userMessage||s.raw?.userMessage||""),r=r.replace(/\{\{previousToolOutput\}\}/gi,s.previousToolOutput||s.raw?.previousToolOutput||""),r}_resolveCustomVariables(e,s){let r=e;for(let[o,a]of this.customVariables){let n=new RegExp(`\\{\\{${this._escapeRegex(o)}\\}\\}`,"gi");typeof a=="function"?r=r.replace(n,()=>{try{return a(s)}catch(i){return this._log(`\u53D8\u91CF\u5904\u7406\u9519\u8BEF ${o}:`,i),""}}):r=r.replace(n,String(a))}return r}_resolveRegexVariables(e,s){let r=e;for(let[o,a]of this.variableHandlers){let n=new RegExp(`\\{\\{${o}\\.([^}]+)\\}\\}`,"gi");r=r.replace(n,(i,l)=>{try{return a(l,s)}catch(c){return this._log(`\u53D8\u91CF\u5904\u7406\u9519\u8BEF ${o}.${l}:`,c),""}})}return r}_formatChatHistory(e){return!Array.isArray(e)||e.length===0?"":e.map(s=>{let r=s.role||"unknown",o=s.content||s.mes||"";return`[${r}]: ${o}`}).join(`

`)}_formatCharacterCard(e){if(!e)return"";let s=[];return e.name&&s.push(`\u59D3\u540D: ${e.name}`),e.description&&s.push(`\u63CF\u8FF0: ${e.description}`),e.personality&&s.push(`\u6027\u683C: ${e.personality}`),e.scenario&&s.push(`\u573A\u666F: ${e.scenario}`),s.join(`

`)}_escapeRegex(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}_log(...e){this.debugMode&&console.log("[VariableResolver]",...e)}},We=new ao,su=We});var Ri={};pe(Ri,{DEFAULT_PROMPT_TEMPLATE:()=>Pi,ToolPromptService:()=>no,default:()=>ru,toolPromptService:()=>Xt});var Pi,no,Xt,ru,io=U(()=>{fe();nr();dr();xa();Pi="\u8BF7\u5904\u7406\u4EE5\u4E0BAI\u56DE\u590D\u5185\u5BB9\uFF1A",no=class{constructor(){this.debugMode=!1}async _buildVariableContext(e,s={}){let r=this._getPromptTemplate(e),o=String(s?.toolWorldbookContent||s?.input?.toolWorldbookContent||await _i(e)).trim(),a=We.buildToolContext({...s,toolName:e?.name||s?.toolName||"",toolId:e?.id||s?.toolId||"",toolWorldbookContent:o}),n=We.resolveTemplate(r,a).trim(),i=String(s?.toolContentMacro||s?.input?.toolContentMacro||"").trim();return We.buildToolContext({...s,toolName:e?.name||s?.toolName||"",toolId:e?.id||s?.toolId||"",toolPromptMacro:n,toolContentMacro:i,toolWorldbookContent:o})}async buildToolMessages(e,s){if(!e)return this._log("\u6784\u5EFA\u5931\u8D25: \u5DE5\u5177\u914D\u7F6E\u4E3A\u7A7A"),[];let r=[],o=await this._buildVariableContext(e,s),a=this._getBypassMessages(e);if(a&&a.length>0)for(let i of a)i.enabled!==!1&&r.push({role:this._normalizeRole(i.role),content:We.resolveTemplate(i.content||"",o)});let n=this._buildUserContent(this._getPromptTemplate(e),o);return n&&r.push({role:"user",content:n}),this._log(`\u6784\u5EFA\u6D88\u606F: ${r.length} \u6761`),r}async buildPromptText(e,s){return(await this._buildVariableContext(e,s)).toolPromptMacro||""}getToolPromptTemplate(e){return this._getPromptTemplate(e)}_getPromptTemplate(e){return e.promptTemplate&&typeof e.promptTemplate=="string"?e.promptTemplate:Pi}_getBypassMessages(e){return e.bypass?.enabled?j.buildBypassMessages(e):[]}_buildUserContent(e,s){return!e||!e.trim()?"":We.resolveTemplate(e,s).trim()}_normalizeRole(e){if(!e)return"user";switch(String(e).toLowerCase()){case"system":return"system";case"assistant":return"assistant";case"user":default:return"user"}}_log(...e){this.debugMode&&console.log("[ToolPromptService]",...e)}setDebugMode(e){this.debugMode=e}},Xt=new no,ru=Xt});var Di={};pe(Di,{LEGACY_OUTPUT_MODES:()=>ou,OUTPUT_MODES:()=>je,TOOL_FAILURE_STAGES:()=>ge,TOOL_RUNTIME_STATUS:()=>au,TOOL_WRITEBACK_STATUS:()=>ne,ToolOutputService:()=>lo,default:()=>nu,toolOutputService:()=>ot});function $i(t){if(t?.signal?.aborted)return{aborted:!0,stale:!1,reason:"cancelled_before_host_commit"};if(typeof t?.shouldAbortWriteback=="function")try{return t.shouldAbortWriteback()||!1}catch{return{aborted:!0,stale:!0,reason:"stale_base_changed"}}return!1}function Ts(t=[],e="",s=null){return{request:{built:Array.isArray(t)&&t.length>0,messageCount:Array.isArray(t)?t.length:0},extract:{completed:!0,hasOutput:!!String(e||"").trim()},writeback:{attempted:!!s,contentCommitted:!!s?.contentCommitted,hostCommitApplied:!!s?.hostCommitApplied,writebackStatus:s?.writebackStatus||"",preferredCommitMethod:s?.commit?.preferredMethod||"",appliedCommitMethod:s?.commit?.appliedMethod||"",fallbackUsed:!!s?.commit?.fallbackUsed},refresh:{requested:!!s?.refreshRequested,confirmed:!!s?.refreshConfirmed,requestMethods:Array.isArray(s?.refresh?.requestMethods)?[...s.refresh.requestMethods]:[],confirmChecks:Number(s?.refresh?.confirmChecks)||0,confirmedBy:s?.refresh?.confirmedBy||""}}}var je,ou,au,ge,ne,lo,ot,nu,co=U(()=>{fe();lr();Jt();io();jr();Ws();je={FOLLOW_AI:"follow_ai",POST_RESPONSE_API:"post_response_api"},ou={inline:"follow_ai"},au={IDLE:"idle",RUNNING:"running",SUCCESS:"success",ERROR:"error"},ge={BUILD_MESSAGES:"build_messages",SEND_API_REQUEST:"send_api_request",EXTRACT_OUTPUT:"extract_output",INJECT_CONTEXT:"inject_context",COMPATIBILITY_EXECUTE:"compatibility_execute",UNKNOWN:"unknown"},ne={SUCCESS:"success",FAILED:"failed",SKIPPED_EMPTY_OUTPUT:"skipped_empty_output",NOT_APPLICABLE:"not_applicable"};lo=class{constructor(){this.debugMode=!1,this._apiConnection=null}shouldRunPostResponse(e){return!e||!e.enabled||!e.output?.enabled?!1:e.output?.mode===je.POST_RESPONSE_API}shouldRunFollowAi(e){if(!e||!e.enabled||!e.output?.enabled)return!1;let s=e.output?.mode;return s===je.FOLLOW_AI||s==="inline"}shouldRunInline(e){return this.shouldRunFollowAi(e)}async runToolPostResponse(e,s){let r=Date.now(),o=e.id,a=s?.traceId||`trace_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,n=s?.sessionKey||"",i=s?.executionKey||"",l=this._getExtractionSelectors(e),c=e.output?.apiPreset||e.apiPreset||"",d="",u=ne.NOT_APPLICABLE,y=null,g=[],m="";this._log(`\u5F00\u59CB\u6267\u884C\u5DE5\u5177: ${o}`),$.emit(P.TOOL_EXECUTION_STARTED,{toolId:o,traceId:a,sessionKey:n,mode:je.POST_RESPONSE_API});try{if(d=ge.BUILD_MESSAGES,g=await this._buildToolMessages(e,s),!g||g.length===0)throw new Error("\u672A\u6784\u5EFA\u51FA\u53EF\u53D1\u9001\u7684\u5DE5\u5177\u8BF7\u6C42\u6D88\u606F\uFF0C\u8BF7\u68C0\u67E5\u63D0\u793A\u8BCD\u6A21\u677F\u6216\u7834\u9650\u8BCD\u914D\u7F6E\u662F\u5426\u4E3A\u7A7A\u3002");this._log(`\u6784\u5EFA\u4E86 ${g.length} \u6761\u6D88\u606F`);let v=$i(s);if(v){let M=Date.now()-r;return{success:!1,toolId:o,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88",duration:M,meta:{traceId:a,sessionKey:n,executionKey:i,sourceMessageId:s?.sourceMessageId||s?.confirmedAssistantMessageId||s?.messageId||"",sourceSwipeId:s?.sourceSwipeId||s?.confirmedAssistantSwipeId||s?.effectiveSwipeId||"",slotRevisionKey:s?.slotRevisionKey||"",selectors:l,apiPreset:c,writebackStatus:u,failureStage:d,writebackDetails:y,aborted:v.aborted===!0,stale:v.stale===!0,abortReason:v.reason||"",phases:Ts(g,m,y)}}}let b=await this._getRequestTimeout();d=ge.SEND_API_REQUEST;let S=await this._sendApiRequest(c,g,{timeoutMs:b,signal:s.signal});d=ge.EXTRACT_OUTPUT,m=this._extractOutputContent(S,e);let A=$i(s);if(A){let M=Date.now()-r;return{success:!1,toolId:o,error:"\u8BF7\u6C42\u5DF2\u53D6\u6D88",duration:M,meta:{traceId:a,sessionKey:n,executionKey:i,sourceMessageId:s?.sourceMessageId||s?.confirmedAssistantMessageId||s?.messageId||"",sourceSwipeId:s?.sourceSwipeId||s?.confirmedAssistantSwipeId||s?.effectiveSwipeId||"",slotRevisionKey:s?.slotRevisionKey||"",selectors:l,apiPreset:c,writebackStatus:u,failureStage:d,writebackDetails:y,aborted:A.aborted===!0,stale:A.stale===!0,abortReason:A.reason||"",phases:Ts(g,m,y)}}}if(m){if(d=ge.INJECT_CONTEXT,y=await $e.injectDetailed(o,m,{overwrite:e.output?.overwrite!==!1,sourceMessageId:s.sourceMessageId||s.confirmedAssistantMessageId||s.messageId||"",sourceSwipeId:s.sourceSwipeId||s.confirmedAssistantSwipeId||s.effectiveSwipeId||"",effectiveSwipeId:s.effectiveSwipeId||s.confirmedAssistantSwipeId||"",slotBindingKey:s.slotBindingKey||"",slotRevisionKey:s.slotRevisionKey||"",slotTransactionId:s.slotTransactionId||"",extractionSelectors:l,traceId:a,sessionKey:n,signal:s.signal,shouldAbortWriteback:s.shouldAbortWriteback,isAutoRun:s.isAutoRun===!0}),!y?.success)throw u=ne.FAILED,new Error(y?.error||"\u5DE5\u5177\u7ED3\u679C\u5DF2\u751F\u6210\uFF0C\u4F46\u5199\u5165\u4E0A\u4E0B\u6587/\u4E16\u754C\u4E66\u5931\u8D25");u=ne.SUCCESS}else u=ne.SKIPPED_EMPTY_OUTPUT;d="";let w=Date.now()-r;return $.emit(P.TOOL_EXECUTED,{toolId:o,traceId:a,sessionKey:n,success:!0,duration:w,mode:je.POST_RESPONSE_API}),this._log(`\u5DE5\u5177\u6267\u884C\u6210\u529F: ${o}, \u8017\u65F6 ${w}ms`),{success:!0,toolId:o,output:m,duration:w,meta:{traceId:a,sessionKey:n,executionKey:i,slotBindingKey:s?.slotBindingKey||"",slotTransactionId:s?.slotTransactionId||"",generationAction:s?.generationAction||"",generationActionSource:s?.generationActionSource||"",rawGenerationType:s?.rawGenerationType||"",normalizedGenerationType:s?.normalizedGenerationType||"",generationMessageBindingSource:s?.generationMessageBindingSource||"",sourceMessageId:s?.sourceMessageId||s?.confirmedAssistantMessageId||s?.messageId||"",sourceSwipeId:s?.sourceSwipeId||s?.confirmedAssistantSwipeId||s?.effectiveSwipeId||"",confirmedAssistantSwipeId:s?.confirmedAssistantSwipeId||"",effectiveSwipeId:s?.effectiveSwipeId||"",slotRevisionKey:s?.slotRevisionKey||"",messageCount:g.length,selectors:l,apiPreset:c,writebackStatus:u,failureStage:"",writebackDetails:y,phases:Ts(g,m,y)}}}catch(v){let b=Date.now()-r,S=d||ge.UNKNOWN,A=u||ne.NOT_APPLICABLE;return this._log(`\u5DE5\u5177\u6267\u884C\u5931\u8D25: ${o}`,v),$.emit(P.TOOL_EXECUTION_FAILED,{toolId:o,traceId:a,sessionKey:n,error:v.message||String(v),duration:b}),{success:!1,toolId:o,error:v.message||String(v),duration:b,meta:{traceId:a,sessionKey:n,executionKey:i,slotBindingKey:s?.slotBindingKey||"",slotTransactionId:s?.slotTransactionId||"",generationAction:s?.generationAction||"",generationActionSource:s?.generationActionSource||"",rawGenerationType:s?.rawGenerationType||"",normalizedGenerationType:s?.normalizedGenerationType||"",generationMessageBindingSource:s?.generationMessageBindingSource||"",sourceMessageId:s?.sourceMessageId||s?.confirmedAssistantMessageId||s?.messageId||"",sourceSwipeId:s?.sourceSwipeId||s?.confirmedAssistantSwipeId||s?.effectiveSwipeId||"",confirmedAssistantSwipeId:s?.confirmedAssistantSwipeId||"",effectiveSwipeId:s?.effectiveSwipeId||"",slotRevisionKey:s?.slotRevisionKey||"",messageCount:g.length,selectors:l,apiPreset:c,writebackStatus:A,failureStage:S,writebackDetails:y,phases:Ts(g,m,y)}}}}async runToolFollowAiManual(e,s){let r=Date.now(),o=e.id,a=s?.traceId||`trace_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,n=s?.sessionKey||"",i=s?.executionKey||"",l=e.output?.apiPreset||e.apiPreset||"",c=this._getExtractionSelectors(e),d="",u=ne.NOT_APPLICABLE,y=null,g=[],m="";$.emit(P.TOOL_EXECUTION_STARTED,{toolId:o,traceId:a,sessionKey:n,mode:je.FOLLOW_AI});try{if(d=ge.BUILD_MESSAGES,g=await this._buildToolMessages(e,s),!g||g.length===0)throw new Error("\u672A\u6784\u5EFA\u51FA\u53EF\u53D1\u9001\u7684\u5DE5\u5177\u8BF7\u6C42\u6D88\u606F\uFF0C\u8BF7\u68C0\u67E5\u63D0\u793A\u8BCD\u6A21\u677F\u6216\u7834\u9650\u8BCD\u914D\u7F6E\u662F\u5426\u4E3A\u7A7A\u3002");let v=await this._getRequestTimeout();d=ge.SEND_API_REQUEST;let b=await this._sendApiRequest(l,g,{timeoutMs:v,signal:s.signal});if(d=ge.EXTRACT_OUTPUT,m=this._extractOutputContent(b,e),m){if(d=ge.INJECT_CONTEXT,y=await $e.injectDetailed(o,m,{overwrite:e.output?.overwrite!==!1,sourceMessageId:s.sourceMessageId||s.confirmedAssistantMessageId||s.messageId||"",sourceSwipeId:s.sourceSwipeId||s.confirmedAssistantSwipeId||s.effectiveSwipeId||"",effectiveSwipeId:s.effectiveSwipeId||s.confirmedAssistantSwipeId||"",slotBindingKey:s.slotBindingKey||"",slotRevisionKey:s.slotRevisionKey||"",slotTransactionId:s.slotTransactionId||"",extractionSelectors:c,traceId:a,sessionKey:n}),!y?.success)throw u=ne.FAILED,new Error(y?.error||"\u5DE5\u5177\u7ED3\u679C\u5DF2\u751F\u6210\uFF0C\u4F46\u5199\u5165\u4E0A\u4E0B\u6587/\u4E16\u754C\u4E66\u5931\u8D25");u=ne.SUCCESS}else u=ne.SKIPPED_EMPTY_OUTPUT;d="";let S=Date.now()-r;return $.emit(P.TOOL_EXECUTED,{toolId:o,traceId:a,sessionKey:n,success:!0,duration:S,mode:je.FOLLOW_AI}),{success:!0,toolId:o,output:m,duration:S,meta:{traceId:a,sessionKey:n,executionKey:i,slotBindingKey:s?.slotBindingKey||"",slotTransactionId:s?.slotTransactionId||"",sourceMessageId:s?.sourceMessageId||s?.confirmedAssistantMessageId||s?.messageId||"",sourceSwipeId:s?.sourceSwipeId||s?.confirmedAssistantSwipeId||s?.effectiveSwipeId||"",confirmedAssistantSwipeId:s?.confirmedAssistantSwipeId||"",effectiveSwipeId:s?.effectiveSwipeId||"",slotRevisionKey:s?.slotRevisionKey||"",messageCount:g.length,selectors:c,apiPreset:l,writebackStatus:u,failureStage:"",writebackDetails:y,phases:Ts(g,m,y)}}}catch(v){let b=Date.now()-r,S=d||ge.UNKNOWN,A=u||ne.NOT_APPLICABLE;return $.emit(P.TOOL_EXECUTION_FAILED,{toolId:o,traceId:a,sessionKey:n,error:v.message||String(v),duration:b,mode:je.FOLLOW_AI}),{success:!1,toolId:o,error:v.message||String(v),duration:b,meta:{traceId:a,sessionKey:n,executionKey:i,slotBindingKey:s?.slotBindingKey||"",slotTransactionId:s?.slotTransactionId||"",sourceMessageId:s?.sourceMessageId||s?.confirmedAssistantMessageId||s?.messageId||"",sourceSwipeId:s?.sourceSwipeId||s?.confirmedAssistantSwipeId||s?.effectiveSwipeId||"",confirmedAssistantSwipeId:s?.confirmedAssistantSwipeId||"",effectiveSwipeId:s?.effectiveSwipeId||"",slotRevisionKey:s?.slotRevisionKey||"",messageCount:g.length,selectors:c,apiPreset:l,writebackStatus:A,failureStage:S,writebackDetails:y,phases:Ts(g,m,y)}}}}async runToolInline(e,s){return this.runToolFollowAiManual(e,s)}async previewExtraction(e,s){return{success:!0,...this.getExtractionSnapshot(e,s)}}getExtractionSnapshot(e,s){let r=this._buildRecentMessageExtractionEntries(e,s),o=this._joinMessageBlocks(r,"rawText"),a=this._joinMessageBlocks(r,"filteredText"),n=this._joinMessageBlocks(r,"extractedText",{skipEmpty:!0}),i=(Array.isArray(r)?r:[]).map(c=>String(c?.extractedText||"").trim()).filter(Boolean).join(`

`),l=Array.isArray(r)&&r.length>0?r[r.length-1]:null;return{sourceText:o,filteredSourceText:a,extractedText:n,extractedRawText:i,messageEntries:r,primaryEntry:l,selectors:this._getExtractionSelectors(e),maxMessages:e?.extraction?.maxMessages||5}}async _buildToolMessages(e,s){let r=this._buildRecentMessageExtractionEntries(e,s),o=this._joinMessageBlocks(r,"rawText"),a=this._joinMessageBlocks(r,"filteredText"),n=this._joinMessageBlocks(r,"extractedText",{skipEmpty:!0}),i={...s,rawRecentMessagesText:o,recentMessagesText:a,extractedContent:n,toolContentMacro:this._buildToolContentMacro(r),toolName:e.name,toolId:e.id};return Xt.buildToolMessages(e,i)}_normalizeRole(e){if(!e)return"user";let s=String(e).toLowerCase();return s==="system"?"system":s==="assistant"?"assistant":"user"}setApiConnection(e){this._apiConnection=e}async _sendApiRequest(e,s,r={}){if(!this._apiConnection)throw new Error("API\u8FDE\u63A5\u6A21\u5757\u672A\u914D\u7F6E");let{timeoutMs:o=9e4,signal:a}=r,n=null;if(e){if(!zs(e))throw new Error(`\u672A\u627E\u5230 API \u9884\u8BBE\u201C${e}\u201D\uFF0C\u8BF7\u91CD\u65B0\u9009\u62E9\u6216\u4FDD\u5B58\u540E\u518D\u6267\u884C`);n=Ks(e)}else n=Ks();let i=us(n||{});if(!i.valid&&!n?.useMainApi)throw new Error(`API\u914D\u7F6E\u65E0\u6548\uFF1A${i.errors.join("\uFF0C")}\u3002\u8BF7\u5148\u5B8C\u5584\u81EA\u5B9A\u4E49API\u914D\u7F6E\uFF0C\u6216\u542F\u7528\u201C\u4F7F\u7528SillyTavern\u4E3BAPI\u201D`);if(this._apiConnection.sendApiRequest)return await this._apiConnection.sendApiRequest(s,{timeoutMs:o,apiConfig:n},a);throw new Error("\u6CA1\u6709\u53EF\u7528\u7684API\u53D1\u9001\u65B9\u6CD5")}async _getRequestTimeout(){return Ue.getSettings().executor?.requestTimeoutMs||9e4}_extractOutputContent(e,s){if(!e)return"";if(typeof e=="string")return this._applyOutputExtractionSelectors(e,s);if(typeof e=="object"){if(e.choices&&e.choices[0]?.message?.content)return this._applyOutputExtractionSelectors(e.choices[0].message.content,s);if(e.content)return this._applyOutputExtractionSelectors(e.content,s);if(e.text)return this._applyOutputExtractionSelectors(e.text,s);if(e.message)return this._applyOutputExtractionSelectors(e.message,s);try{return this._applyOutputExtractionSelectors(JSON.stringify(e,null,2),s)}catch{return this._applyOutputExtractionSelectors(String(e),s)}}return this._applyOutputExtractionSelectors(String(e),s)}_applyOutputExtractionSelectors(e,s){let r=typeof e=="string"?e:String(e||""),o=this._getExtractionSelectors(s);if(!o.length)return r.trim();let a=[];for(let n of o){let i=String(n||"").trim();if(!i)continue;if(i.startsWith("regex:")){let c=i.slice(6).trim();if(!c)continue;try{let d=new RegExp(c,"gi");[...r.matchAll(d)].forEach(y=>{let g=String(y?.[0]||"").trim();g&&a.push(g)})}catch(d){this._log("\u5DE5\u5177\u8F93\u51FA\u6B63\u5219\u63D0\u53D6\u5931\u8D25\uFF0C\u8DF3\u8FC7\u8BE5\u89C4\u5219",{selector:i,error:d})}continue}let l=i.replace(/^<|>$/g,"").trim();if(l)try{let c=new RegExp(`<${l}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${l}>`,"gi");(r.match(c)||[]).forEach(u=>{let y=String(u||"").trim();y&&a.push(y)})}catch(c){this._log("\u5DE5\u5177\u8F93\u51FA\u6807\u7B7E\u63D0\u53D6\u5931\u8D25\uFF0C\u8DF3\u8FC7\u8BE5\u89C4\u5219",{selector:i,error:c})}}return a.length>0?a.join(`

`).trim():r.trim()}_getExtractionSelectors(e){let s=e?.extraction?.selectors;return Array.isArray(s)&&s.length>0?s.map(r=>String(r||"").trim()).filter(Boolean):Array.isArray(e?.extractTags)&&e.extractTags.length>0?e.extractTags.map(r=>String(r||"").trim()).filter(Boolean):[]}_applyExtractionSelectors(e,s){return this._applyExtractionSelectorsInternal(e,s,{strict:!1})}_applyExtractionSelectorsInternal(e,s,r={}){let o=typeof e=="string"?e:String(e||""),a=this._getExtractionSelectors(s),{strict:n=!1}=r;if(!a.length)return o.trim();let i=a.map((c,d)=>{let u=String(c||"").trim(),y=u.startsWith("regex:");return{id:`tool-extract-${d}`,type:y?"regex_include":"include",value:y?u.slice(6).trim():u,enabled:!0}}).filter(c=>c.value),l=Wt(o,i,[]);return n?(l||"").trim():l||o.trim()}_extractToolContent(e,s){let r=typeof s=="string"?s:String(s||"");return this._getExtractionSelectors(e).length?this._applyExtractionSelectorsInternal(r,e,{strict:!0}):r.trim()}_applyGlobalContextRules(e){let s=typeof e=="string"?e:String(e||"");if(!s.trim())return"";try{let r=ut()||[],o=jt()||[];return!Array.isArray(r)||r.length===0?s.trim():Wt(s,r,o)||s.trim()}catch(r){return this._log("\u5E94\u7528\u5168\u5C40\u6B63\u6587\u63D0\u53D6\u89C4\u5219\u5931\u8D25\uFF0C\u56DE\u9000\u539F\u59CB\u6587\u672C",r),s.trim()}}_getMessageText(e){if(!e)return"";let s=[e.content,e.mes,e.message,e.text,e?.data?.content];for(let r of s)if(typeof r=="string"&&r.trim())return r.trim();return""}_collectRecentAssistantMessages(e,s){return this._collectRecentAssistantMessageEntries(e,s).map(r=>r.text).filter(Boolean).join(`

`)}_collectRecentAssistantMessageEntries(e,s){let r=Math.max(1,parseInt(e?.extraction?.maxMessages,10)||5),o=Array.isArray(s?.chatMessages)?s.chatMessages:[],a=[];for(let i=o.length-1;i>=0&&a.length<r;i-=1){let l=o[i],c=String(l?.role||"").toLowerCase(),d=c==="assistant"||c==="ai"||!l?.is_user&&!l?.is_system&&!c,u=this._getMessageText(l);d&&u&&a.unshift({text:u,message:l,chatIndex:i})}if(a.length>0)return a;let n=s?.lastAiMessage||s?.input?.lastAiMessage||"";return n?[{text:n,message:null,chatIndex:-1}]:[]}_buildRecentMessageExtractionEntries(e,s){return this._collectRecentAssistantMessageEntries(e,s).map((o,a)=>{let n=o.text||"",i=this._applyGlobalContextRules(n),l=this._extractToolContent(e,n);return{...o,order:a+1,rawText:n,filteredText:i,extractedText:l,fullMessageText:n}})}_joinMessageBlocks(e,s,r={}){let o=Array.isArray(e)?e:[],{skipEmpty:a=!1}=r;return o.map(i=>{let l=String(i?.[s]||"").trim();return a&&!l?"":`${`\u3010\u7B2C ${i?.order||0} \u6761 AI \u6D88\u606F\u3011`}
${l||"(\u7A7A)"}`}).filter(Boolean).join(`

--------------------------------

`)}_buildToolContentMacro(e){return(Array.isArray(e)?e:[]).map(o=>{let a=`\u3010\u7B2C ${o?.order||0} \u6761 AI \u6D88\u606F\u3011`,n=String(o?.filteredText||"").trim()||"(\u7A7A)",i=String(o?.extractedText||"").trim()||"(\u7A7A)";return`${a}
\u6B63\u6587\uFF1A
${n}

\u5DE5\u5177\uFF1A
${i}`}).filter(Boolean).join(`

--------------------------------

`).trim()}filterPostResponseTools(e){return Array.isArray(e)?e.filter(s=>this.shouldRunPostResponse(s)):[]}filterAutoPostResponseTools(e){return Array.isArray(e)?e.filter(s=>this.shouldRunPostResponse(s)?s?.automation?.enabled===!0:!1):[]}filterInlineTools(e){return Array.isArray(e)?e.filter(s=>this.shouldRunInline(s)):[]}setDebugMode(e){this.debugMode=e}_log(...e){(this.debugMode||Ue.getDebugSettings()?.enableDebugLog)&&console.log("[ToolOutputService]",...e)}},ot=new lo,nu=ot});function Ni(t={}){return!t||typeof t!="object"?{}:Object.entries(t).reduce((e,[s,r])=>(e[s]=r===!0,e),{})}function cu(t,e={}){let s=e?.direction==="unescape"?"unescape":"escape",r=Ni(e?.options);return iu.reduce((o,a)=>r[a.key]!==!0?o:s==="unescape"?o.replace(a.escaped,a.unescaped):o.replace(a.plain,a.replacement),String(t||""))}function du(t,e={}){if((e?.direction||"en_to_zh")!=="en_to_zh")return String(t||"");let r=Ni(e?.options);return lu.reduce((o,a)=>r[a.key]!==!0?o:o.replace(a.from,a.to),String(t||""))}function Li(t,e){let s=t?.processor||{},r=s?.type||"",o=String(e||"");switch(r){case Oi.ESCAPE_TRANSFORM:return cu(o,s);case Oi.PUNCTUATION_TRANSFORM:return du(o,s);default:return o}}var iu,lu,Oi,Bi=U(()=>{iu=[{key:"newline",plain:/\r\n|\r|\n/g,escaped:/\\n/g,replacement:"\\n",unescaped:`
`},{key:"doubleQuote",plain:/"/g,escaped:/\\"/g,replacement:'\\"',unescaped:'"'},{key:"singleQuote",plain:/'/g,escaped:/\\'/g,replacement:"\\'",unescaped:"'"}],lu=[{key:"comma",from:/,/g,to:"\uFF0C"},{key:"period",from:/\./g,to:"\u3002"},{key:"exclamation",from:/!/g,to:"\uFF01"},{key:"question",from:/\?/g,to:"\uFF1F"},{key:"semicolon",from:/;/g,to:"\uFF1B"},{key:"colon",from:/:/g,to:"\uFF1A"},{key:"leftParen",from:/\(/g,to:"\uFF08"},{key:"rightParen",from:/\)/g,to:"\uFF09"}],Oi={ESCAPE_TRANSFORM:"escape_transform",PUNCTUATION_TRANSFORM:"punctuation_transform"}});var Aa={};pe(Aa,{abortAllTasks:()=>fu,abortTask:()=>gu,buildToolMessages:()=>Ui,clearExecutionHistory:()=>xu,createExecutionContext:()=>_u,createResult:()=>uo,enhanceMessagesWithBypass:()=>Au,executeBatch:()=>pu,executeTool:()=>zi,executeToolWithConfig:()=>Wi,executeToolsBatch:()=>ku,executorState:()=>re,extractFailed:()=>Tu,extractSuccessful:()=>Su,generateTaskId:()=>Qt,getExecutionHistory:()=>vu,getExecutorStatus:()=>hu,getScheduler:()=>_s,mergeResults:()=>wu,pauseExecutor:()=>mu,resumeExecutor:()=>bu,setMaxConcurrent:()=>yu});function uo(t,e,s,r,o,a,n=0){return{success:s,taskId:t,toolId:e,data:r,error:o,duration:a,retries:n,timestamp:Date.now(),metadata:{}}}function Qt(){return`task_${Date.now()}_${Math.random().toString(36).substr(2,9)}`}function uu(t,e={}){return{id:Qt(),toolId:t,options:e,status:"pending",createdAt:Date.now(),startedAt:null,completedAt:null,retries:0,maxRetries:e.maxRetries||3}}function _s(){return ur||(ur=new _a(re.maxConcurrent)),ur}function yu(t){re.maxConcurrent=Math.max(1,Math.min(10,t)),ur&&(ur.maxConcurrent=re.maxConcurrent)}async function zi(t,e={},s){let r=_s(),o=uu(t,e);for(;re.isPaused;)await new Promise(a=>setTimeout(a,100));try{let a=await r.enqueue(async n=>{if(n.aborted)throw new DOMException("\u4EFB\u52A1\u5DF2\u4E2D\u6B62","AbortError");if(typeof s=="function")return await s(n,e);throw new Error("\u6267\u884C\u5668\u5FC5\u987B\u662F\u4E00\u4E2A\u51FD\u6570")},o);return Ki(a),a}catch(a){let n=uo(o.id,t,!1,null,a,Date.now()-o.createdAt,o.retries);return Ki(n),n}}async function pu(t,e={}){let{failFast:s=!1,concurrency:r=re.maxConcurrent}=e,o=[],a=_s(),n=a.maxConcurrent;a.maxConcurrent=r;try{let i=t.map(({toolId:l,options:c,executor:d})=>zi(l,c,d));if(s)for(let l of i){let c=await l;if(o.push(c),!c.success){a.abortAll();break}}else{let l=await Promise.allSettled(i);for(let c of l)c.status==="fulfilled"?o.push(c.value):o.push(uo(Qt(),"unknown",!1,null,c.reason,0,0))}}finally{a.maxConcurrent=n}return o}function gu(t){return _s().abort(t)}function fu(){_s().abortAll(),re.executionQueue=[]}function mu(){re.isPaused=!0}function bu(){re.isPaused=!1}function hu(){return{..._s().getStatus(),isPaused:re.isPaused,activeControllers:re.activeControllers.size,historyCount:re.executionHistory.length}}function Ki(t){re.executionHistory.push(t),re.executionHistory.length>100&&re.executionHistory.shift()}function vu(t={}){let e=[...re.executionHistory];return t.toolId&&(e=e.filter(s=>s.toolId===t.toolId)),t.success!==void 0&&(e=e.filter(s=>s.success===t.success)),t.limit&&(e=e.slice(-t.limit)),e}function xu(){re.executionHistory=[]}function wu(t){let e={success:!0,data:[],errors:[],totalDuration:0,successCount:0,failureCount:0};for(let s of t)e.totalDuration+=s.duration,s.success?(e.successCount++,s.data!==void 0&&s.data!==null&&e.data.push(s.data)):(e.success=!1,e.failureCount++,s.error&&e.errors.push({taskId:s.taskId,toolId:s.toolId,error:s.error.message||String(s.error)}));return e}function Su(t){return t.filter(e=>e.success).map(e=>e.data)}function Tu(t){return t.filter(e=>!e.success).map(e=>({taskId:e.taskId,toolId:e.toolId,error:e.error}))}function _u(t={}){return{taskId:Qt(),startTime:Date.now(),signal:t.signal||null,apiConfig:t.apiConfig||null,bypassMessages:t.bypassMessages||[],context:t.context||{},metadata:t.metadata||{}}}function Au(t,e){return!e||e.length===0?t:[...e,...t]}function Eu(t){return t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function Ui(t,e){let s=[],r=t.promptTemplate||"",o={"{{userMessage}}":e.input?.userMessage||"","{{lastAiMessage}}":e.input?.lastAiMessage||"","{{extractedContent}}":e.input?.extractedContent||"","{{previousToolOutput}}":e.input?.previousToolOutput||"","{{context}}":JSON.stringify(e.input?.context||{}),"{{pg}}":e.input?.context?.pg||"1","{{time}}":e.input?.context?.time||"","{{scene}}":e.input?.context?.scene||"","{{plot}}":e.input?.context?.plot||"","{{mq}}":e.input?.context?.mq||"\u2160","{{mqStatus}}":e.input?.context?.mqStatus||"\u8FDB\u884C\u4E2D","{{sq}}":e.input?.context?.sq||"1","{{sqStatus}}":e.input?.context?.sqStatus||"\u8FDB\u884C\u4E2D","{{latestSq}}":e.input?.context?.latestSq||"1","{{completed}}":e.input?.context?.completed||"\u65E0","{{defined}}":e.input?.context?.defined||"","{{status}}":e.input?.context?.status||"","{{seeds}}":e.input?.context?.seeds||"","{{name}}":e.input?.context?.name||"","{{location}}":e.input?.context?.location||"","{{condition}}":e.input?.context?.condition||"","{{equipment}}":e.input?.context?.equipment||"","{{skills}}":e.input?.context?.skills||""};for(let[a,n]of Object.entries(o))r=r.replace(new RegExp(Eu(a),"g"),n);return s.push({role:"USER",content:r}),s}async function Wi(t,e,s={}){let r=J(t);if(!r)return{success:!1,taskId:Qt(),toolId:t,error:"\u5DE5\u5177\u914D\u7F6E\u4E0D\u5B58\u5728",duration:0};if(!r.enabled)return{success:!1,taskId:Qt(),toolId:t,error:"\u5DE5\u5177\u672A\u542F\u7528",duration:0};let o=Date.now(),a=Qt();try{$.emit(P.TOOL_EXECUTION_STARTED,{toolId:t,taskId:a,context:e});let n=Ui(r,e);if(typeof s.callApi=="function"){let i=r.output?.apiPreset||r.apiPreset||"",l=i?{preset:i}:null,c=await s.callApi(n,l,s.signal),d=c;r.outputMode==="separate"&&r.extractTags?.length>0&&(d=Mu(c,r.extractTags));let u={success:!0,taskId:a,toolId:t,data:d,duration:Date.now()-o};return $.emit(P.TOOL_EXECUTED,{toolId:t,taskId:a,result:u}),u}else return{success:!0,taskId:a,toolId:t,data:{messages:n,config:{apiPreset:r.output?.apiPreset||r.apiPreset||"",outputMode:r.outputMode,extractTags:r.extractTags}},duration:Date.now()-o,needsExecution:!0}}catch(n){let i={success:!1,taskId:a,toolId:t,error:n.message||String(n),duration:Date.now()-o};return $.emit(P.TOOL_EXECUTION_FAILED,{toolId:t,taskId:a,error:n}),i}}function Mu(t,e){let s={};for(let r of e){let o=new RegExp(`<${r}[^>]*>([\\s\\S]*?)<\\/${r}>`,"gi"),a=t.match(o);a&&(s[r]=a.map(n=>{let i=n.match(new RegExp(`<${r}[^>]*>([\\s\\S]*?)<\\/${r}>`,"i"));return i?i[1].trim():""}))}return s}async function ku(t,e,s={}){let r=[];for(let o of t){let a=J(o);if(a&&a.enabled){let n=await Wi(o,e,s);r.push(n)}}return r}var re,_a,ur,Ea=U(()=>{Et();fe();re={activeControllers:new Map,executionQueue:[],runningCount:0,maxConcurrent:3,executionHistory:[],isPaused:!1};_a=class{constructor(e=3){this.maxConcurrent=e,this.queue=[],this.running=new Map,this.isProcessing=!1}enqueue(e,s){return new Promise((r,o)=>{this.queue.push({executor:e,task:s,resolve:r,reject:o}),this.process()})}async process(){if(!this.isProcessing){for(this.isProcessing=!0;this.queue.length>0&&this.running.size<this.maxConcurrent;){let e=this.queue.shift();if(!e)continue;let{executor:s,task:r,resolve:o,reject:a}=e,n=new AbortController;r.abortController=n,r.status="running",r.startedAt=Date.now(),this.running.set(r.id,r),re.activeControllers.set(r.id,n),this.executeTask(s,r,n.signal).then(i=>{r.status="completed",r.completedAt=Date.now(),o(i)}).catch(i=>{r.status=i.name==="AbortError"?"aborted":"failed",r.completedAt=Date.now(),a(i)}).finally(()=>{this.running.delete(r.id),re.activeControllers.delete(r.id),re.runningCount=this.running.size})}this.isProcessing=!1}}async executeTask(e,s,r){let o=Date.now(),a=null;for(let n=0;n<=s.maxRetries;n++){if(r.aborted)throw new DOMException("\u4EFB\u52A1\u5DF2\u4E2D\u6B62","AbortError");try{let i=await e(r);return uo(s.id,s.toolId,!0,i,null,Date.now()-o,n)}catch(i){if(a=i,i.name==="AbortError")throw i;n<s.maxRetries&&(await this.delay(1e3*(n+1)),s.retries=n+1)}}throw a}delay(e){return new Promise(s=>setTimeout(s,e))}abort(e){let s=re.activeControllers.get(e);return s?(s.abort(),!0):!1}abortAll(){for(let e of re.activeControllers.values())e.abort();re.activeControllers.clear(),this.queue=[],this.running.clear()}getStatus(){return{pending:this.queue.length,running:this.running.size,maxConcurrent:this.maxConcurrent}}},ur=null});async function Iu(){return Ma||(Ma=Promise.resolve().then(()=>(Ea(),Aa))),Ma}async function Cu(t,e,s){return s&&t.output?.mode===je.POST_RESPONSE_API?ot.runToolPostResponse(t,e):s&&t.output?.mode===je.FOLLOW_AI?ot.runToolFollowAiManual(t,e):(await Iu()).executeToolWithConfig(t.id,e)}function Pu(t,e){return e?.runSource==="MANUAL"?t.output?.mode==="local_transform"||t.processor?.type?Zt.MANUAL_LOCAL_TRANSFORM:t.output?.mode===je.POST_RESPONSE_API?Zt.MANUAL_POST_RESPONSE_API:Zt.MANUAL_COMPATIBILITY:Zt.MANUAL_POST_RESPONSE_API}function yo(t,e){try{ga(t,e)}catch(s){console.warn("[ManualTool] \u66F4\u65B0\u5DE5\u5177\u8FD0\u884C\u65F6\u72B6\u6001\u5931\u8D25:",t,s)}}function Ru(t,e,s){let r=String(t||""),o=String(e||"").trim(),a=String(s||"").trim();return!r.trim()||!o?{nextMessageText:"",replaced:!1}:r.includes(o)?{nextMessageText:r.replace(o,a).trim(),replaced:!0}:{nextMessageText:"",replaced:!1}}async function $u(t,e){let s=ot.getExtractionSnapshot(t,e),r=s?.primaryEntry||null,o=String(r?.fullMessageText||e?.lastAiMessage||"").trim(),a=String(r?.extractedText||s?.extractedRawText||s?.extractedText||"").trim(),n=Array.isArray(s?.selectors)?s.selectors:[],i=e?.traceId||`trace_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,l=e?.sessionKey||"";if(!a||!o)return{success:!1,error:"\u672A\u63D0\u53D6\u5230\u53EF\u5904\u7406\u5185\u5BB9\uFF0C\u8BF7\u5148\u68C0\u67E5\u6807\u7B7E\u6216\u6B63\u5219\u89C4\u5219",meta:{traceId:i,sessionKey:l,selectors:n,writebackStatus:ne.NOT_APPLICABLE,failureStage:ge.EXTRACT_OUTPUT,extraction:s}};let c=String(Li(t,a)||"").trim(),d=Ru(o,a,c),u=d.replaced?d.nextMessageText:c,y=null,g=ne.NOT_APPLICABLE;if(u){if(y=await $e.injectDetailed(t.id,u,{overwrite:!0,sourceMessageId:e?.sourceMessageId||e?.confirmedAssistantMessageId||e?.messageId||"",sourceSwipeId:e?.sourceSwipeId||e?.confirmedAssistantSwipeId||e?.effectiveSwipeId||"",effectiveSwipeId:e?.effectiveSwipeId||e?.confirmedAssistantSwipeId||"",slotBindingKey:e?.slotBindingKey||"",slotRevisionKey:e?.slotRevisionKey||"",slotTransactionId:e?.slotTransactionId||"",extractionSelectors:[],replaceFullMessage:d.replaced,traceId:i,sessionKey:l}),!y?.success)return{success:!1,error:y?.error||"\u672C\u5730\u5904\u7406\u5B8C\u6210\uFF0C\u4F46\u5199\u56DE\u5931\u8D25",meta:{traceId:i,sessionKey:l,selectors:n,writebackStatus:ne.FAILED,failureStage:ge.INJECT_CONTEXT,writebackDetails:y,extraction:s}};g=ne.SUCCESS}else g=ne.SKIPPED_EMPTY_OUTPUT;return{success:!0,output:c,meta:{traceId:i,sessionKey:l,selectors:n,writebackStatus:g,failureStage:"",writebackDetails:y,extraction:s}}}async function Du(t,e){let s=Date.now(),r=t.id,o=`yyt-tool-run-${r}`,a=Pu(t,e),n=e?.executionKey||"";yo(r,{lastStatus:"running",lastError:"",lastDurationMs:0,lastTraceId:e?.traceId||"",lastMessageKey:e?.messageId||"",lastExecutionKey:n,lastExecutionPath:a,lastWritebackStatus:"",lastFailureStage:"",lastSlotBindingKey:e?.slotBindingKey||"",lastSlotRevisionKey:e?.slotRevisionKey||"",lastSlotTransactionId:e?.slotTransactionId||"",lastSourceMessageId:e?.sourceMessageId||e?.messageId||"",lastSourceSwipeId:e?.sourceSwipeId||e?.effectiveSwipeId||"",lastContentCommitted:!1,lastHostCommitApplied:!1,lastRefreshRequested:!1,lastRefreshConfirmed:!1,lastPreferredCommitMethod:"",lastAppliedCommitMethod:"",lastRefreshMethodCount:0,lastRefreshMethods:[],lastRefreshConfirmChecks:0,lastRefreshConfirmedBy:""}),he("info",`\u6B63\u5728\u624B\u52A8\u6267\u884C ${t.name}`,{sticky:!0,noticeId:o});try{let i=a===Zt.MANUAL_LOCAL_TRANSFORM?await $u(t,e):await Cu(t,e,!0),l=Date.now()-s;if(i?.success){let y=J(r),g=i?.meta?.writebackDetails||{};return yo(r,{lastStatus:"success",lastError:"",lastDurationMs:l,lastTraceId:e?.traceId||"",successCount:(y?.runtime?.successCount||0)+1,lastMessageKey:e?.messageId||"",lastExecutionKey:n,lastExecutionPath:a,lastWritebackStatus:i?.meta?.writebackStatus||ne.NOT_APPLICABLE,lastFailureStage:i?.meta?.failureStage||"",lastSlotBindingKey:e?.slotBindingKey||"",lastSlotRevisionKey:e?.slotRevisionKey||"",lastSlotTransactionId:e?.slotTransactionId||"",lastSourceMessageId:e?.sourceMessageId||e?.messageId||"",lastSourceSwipeId:e?.sourceSwipeId||e?.effectiveSwipeId||"",lastContentCommitted:!!g.contentCommitted,lastHostCommitApplied:!!g.hostCommitApplied,lastRefreshRequested:!!g.refreshRequested,lastRefreshConfirmed:!!g.refreshConfirmed,lastPreferredCommitMethod:g?.commit?.preferredMethod||"",lastAppliedCommitMethod:g?.commit?.appliedMethod||"",lastRefreshMethodCount:Array.isArray(g?.refresh?.requestMethods)?g.refresh.requestMethods.length:0,lastRefreshMethods:Array.isArray(g?.refresh?.requestMethods)?[...g.refresh.requestMethods]:[],lastRefreshConfirmChecks:Number(g?.refresh?.confirmChecks)||0,lastRefreshConfirmedBy:g?.refresh?.confirmedBy||""}),_("success",`${t.name} \u624B\u52A8\u6267\u884C\u5B8C\u6210`),he("success",`${t.name} \u624B\u52A8\u6267\u884C\u5B8C\u6210`,{duration:3200,noticeId:o}),{success:!0,duration:l,result:i}}let c=J(r),d=i?.error||"\u5DE5\u5177\u6267\u884C\u5931\u8D25",u=i?.meta?.writebackDetails||{};return yo(r,{lastStatus:"error",lastError:d,lastDurationMs:l,lastTraceId:e?.traceId||"",errorCount:(c?.runtime?.errorCount||0)+1,lastMessageKey:e?.messageId||"",lastExecutionKey:n,lastExecutionPath:a,lastWritebackStatus:i?.meta?.writebackStatus||ne.NOT_APPLICABLE,lastFailureStage:i?.meta?.failureStage||(a===Zt.MANUAL_COMPATIBILITY?ge.COMPATIBILITY_EXECUTE:ge.UNKNOWN),lastSlotBindingKey:e?.slotBindingKey||"",lastSlotRevisionKey:e?.slotRevisionKey||"",lastSlotTransactionId:e?.slotTransactionId||"",lastSourceMessageId:e?.sourceMessageId||e?.messageId||"",lastSourceSwipeId:e?.sourceSwipeId||e?.effectiveSwipeId||"",lastContentCommitted:!!u.contentCommitted,lastHostCommitApplied:!!u.hostCommitApplied,lastRefreshRequested:!!u.refreshRequested,lastRefreshConfirmed:!!u.refreshConfirmed,lastPreferredCommitMethod:u?.commit?.preferredMethod||"",lastAppliedCommitMethod:u?.commit?.appliedMethod||"",lastRefreshMethodCount:Array.isArray(u?.refresh?.requestMethods)?u.refresh.requestMethods.length:0,lastRefreshMethods:Array.isArray(u?.refresh?.requestMethods)?[...u.refresh.requestMethods]:[],lastRefreshConfirmChecks:Number(u?.refresh?.confirmChecks)||0,lastRefreshConfirmedBy:u?.refresh?.confirmedBy||""}),_("error",`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${d}`),he("error",`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${d}`,{sticky:!0,noticeId:o}),{success:!1,duration:l,error:d,result:i}}catch(i){let l=Date.now()-s,c=J(r),d=i?.message||String(i);throw yo(r,{lastStatus:"error",lastError:d,lastDurationMs:l,lastTraceId:e?.traceId||"",errorCount:(c?.runtime?.errorCount||0)+1,lastMessageKey:e?.messageId||"",lastExecutionKey:n,lastExecutionPath:a,lastWritebackStatus:ne.NOT_APPLICABLE,lastFailureStage:a===Zt.MANUAL_COMPATIBILITY?ge.COMPATIBILITY_EXECUTE:ge.UNKNOWN,lastSlotBindingKey:e?.slotBindingKey||"",lastSlotRevisionKey:e?.slotRevisionKey||"",lastSlotTransactionId:e?.slotTransactionId||"",lastSourceMessageId:e?.sourceMessageId||e?.messageId||"",lastSourceSwipeId:e?.sourceSwipeId||e?.effectiveSwipeId||"",lastContentCommitted:!1,lastHostCommitApplied:!1,lastRefreshRequested:!1,lastRefreshConfirmed:!1,lastPreferredCommitMethod:"",lastAppliedCommitMethod:"",lastRefreshMethodCount:0,lastRefreshMethods:[],lastRefreshConfirmChecks:0,lastRefreshConfirmedBy:""}),_("error",`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${d}`),he("error",`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${d}`,{sticky:!0,noticeId:o}),i}}async function po(t){if(!t)return{success:!1,error:"\u7F3A\u5C11\u5DE5\u5177ID"};let e=J(t);if(!e)return{success:!1,error:"\u5DE5\u5177\u4E0D\u5B58\u5728"};if(!e.enabled)return At(t,{lastMessageKey:"",lastExecutionKey:"",lastExecutionPath:"",lastWritebackStatus:ne.NOT_APPLICABLE,lastFailureStage:"",lastContentCommitted:!1,lastHostCommitApplied:!1,lastRefreshRequested:!1,lastRefreshConfirmed:!1,lastPreferredCommitMethod:"",lastAppliedCommitMethod:"",lastRefreshMethodCount:0,lastRefreshMethods:[],lastRefreshConfirmChecks:0,lastRefreshConfirmedBy:""},{touchLastRunAt:!1,emitEvent:!1}),he("warning",`${e.name} \u672A\u542F\u7528\uFF0C\u65E0\u6CD5\u624B\u52A8\u6267\u884C`,{duration:2800,noticeId:`yyt-tool-run-${t}`}),{success:!1,error:"\u5DE5\u5177\u672A\u542F\u7528"};let s=await Vt({runSource:"MANUAL"});return Du(e,s)}async function go(t){if(!t)return{success:!1,error:"\u7F3A\u5C11\u5DE5\u5177ID"};let e=J(t);if(!e)return{success:!1,error:"\u5DE5\u5177\u4E0D\u5B58\u5728"};let s=await Vt({runSource:"MANUAL_PREVIEW"});return ot.previewExtraction(e,s)}var Zt,Ma,ka=U(()=>{Et();co();vs();Jt();Bi();Te();Zt={MANUAL_POST_RESPONSE_API:"manual_post_response_api",MANUAL_LOCAL_TRANSFORM:"manual_local_transform",MANUAL_COMPATIBILITY:"manual_compatibility"},Ma=null});var ji={};pe(ji,{TOOL_CONFIG_PANEL_STYLES:()=>As,createToolConfigPanel:()=>Mt,default:()=>Ou});function Mt(t){let{id:e,toolId:s,postResponseHint:r,extractionPlaceholder:o,previewDialogId:a,previewTitle:n="\u6D4B\u8BD5\u63D0\u53D6\u7ED3\u679C",toolKindLabel:i="AI \u5DE5\u5177"}=t;return{id:e,toolId:s,renderSessionId:0,_beginRenderSession(l){return this.renderSessionId=(this.renderSessionId||0)+1,B(l)&&l.data("yytRenderSessionId",this.renderSessionId),this.renderSessionId},_isRenderSessionActive(l,c){return B(l)&&l.data("yytRenderSessionId")===c},_renderIfSessionActive(l,c){return this._isRenderSessionActive(l,c)?(this.renderTo(l),!0):!1},render(){let l=J(this.toolId);if(!l)return'<div class="yyt-error">\u5DE5\u5177\u914D\u7F6E\u52A0\u8F7D\u5931\u8D25</div>';let c=this._getApiPresets(),d=l.output?.apiPreset||l.apiPreset||"",u=this._getBypassPresets(),y=l.output?.mode||"follow_ai",g=l.bypass?.enabled||!1,m=l.bypass?.presetId||"",v=l.runtime?.lastStatus||"idle",b=l.runtime?.lastRunAt?new Date(l.runtime.lastRunAt).toLocaleString():"\u672A\u8FD0\u884C",S=l.runtime?.lastError||"",A=l.extraction||{},w=l.automation||{},M=l.worldbooks||{},I=Array.isArray(this.draftSelectedWorldbooks)?this.draftSelectedWorldbooks:Array.isArray(M.selected)?M.selected:[],k=Array.isArray(this.availableWorldbooks)?this.availableWorldbooks:[],N=String(this.worldbookFilter||"").trim().toLowerCase(),te=N?k.filter(Q=>String(Q||"").toLowerCase().includes(N)):k,Y=I.length===0?"\u9009\u62E9\u8981\u6CE8\u5165\u7684\u4E16\u754C\u4E66":I.length<=2?I.join("\u3001"):`\u5DF2\u9009 ${I.length} \u9879\uFF1A${I.slice(0,2).join("\u3001")} \u7B49`,K=Array.isArray(A.selectors)?A.selectors.join(`
`):"",ie=y==="post_response_api"?r:"\u968F AI \u8F93\u51FA\u6A21\u5F0F\u4E0D\u4F1A\u989D\u5916\u8BF7\u6C42\u6A21\u578B\uFF0C\u4F46\u4ECD\u7136\u652F\u6301\u624B\u52A8\u6267\u884C\u4E0E\u6D4B\u8BD5\u63D0\u53D6\u3002",X=y==="post_response_api"?"\u989D\u5916\u89E3\u6790":"\u968F AI \u8F93\u51FA",ye=y==="post_response_api",Xe=d||"\u5F53\u524D\u914D\u7F6E";return`
        <div class="yyt-tool-panel" data-tool-id="${this.toolId}">
          <div class="yyt-tool-panel-hero">
            <div class="yyt-tool-panel-hero-copy">
              <div class="yyt-tool-panel-hero-title">${x(l.name||this.toolId)}</div>
              <div class="yyt-tool-panel-hero-desc">${x(l.description||"\u914D\u7F6E\u6A21\u677F\u3001\u63D0\u53D6\u89C4\u5219\u3001API \u9884\u8BBE\u4E0E\u624B\u52A8\u8C03\u8BD5\u80FD\u529B\u3002")}</div>
            </div>
            <div class="yyt-tool-panel-hero-tags">
              <span class="yyt-tool-hero-chip">\u6A21\u5F0F ${x(X)}</span>
              <span class="yyt-tool-hero-chip">\u9884\u8BBE ${x(Xe)}</span>
              <span class="yyt-tool-hero-chip">\u6700\u8FD1\u72B6\u6001 ${x(v)}</span>
              <div class="yyt-tool-panel-hero-actions">
                <button class="yyt-btn yyt-btn-primary yyt-btn-small yyt-tool-save-top" id="${f}-tool-save-top">
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
              <select class="yyt-select" id="${f}-tool-output-mode">
                <option value="follow_ai" ${y==="follow_ai"?"selected":""}>\u968F AI \u8F93\u51FA\uFF08\u652F\u6301\u624B\u52A8\u6267\u884C\uFF09</option>
                <option value="post_response_api" ${y==="post_response_api"?"selected":""}>\u989D\u5916 AI \u6A21\u578B\u89E3\u6790</option>
              </select>
              <div class="yyt-tool-compact-hint yyt-tool-mode-hint">${ie}${ye?" \u5F53\u524D\u6A21\u5F0F\u4F1A\u53C2\u4E0E\u81EA\u52A8\u89E6\u53D1\uFF0C\u4ECD\u9700\u5728\u5168\u5C40\u8BBE\u7F6E\u4E2D\u5F00\u542F\u81EA\u52A8\u5316\u3002":""}</div>
            </div>
          </div>

          <div class="yyt-panel-section">
            <div class="yyt-section-title">
              <i class="fa-solid fa-database"></i>
              <span>API \u9884\u8BBE</span>
            </div>
            <div class="yyt-form-group">
              <label>\u89E3\u6790\u4F7F\u7528\u7684 API \u9884\u8BBE</label>
              <select class="yyt-select" id="${f}-tool-api-preset">
                <option value="">\u4F7F\u7528\u5F53\u524DAPI\u914D\u7F6E</option>
                ${c.map(Q=>`
                  <option value="${x(Q.name)}" ${Q.name===d?"selected":""}>
                    ${x(Q.name)}
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
                <input type="checkbox" id="${f}-tool-bypass-enabled" ${g?"checked":""}>
                <span>\u542F\u7528 Ai \u6307\u4EE4\u9884\u8BBE</span>
              </label>
            </div>
            <div class="yyt-form-group yyt-bypass-preset-select ${g?"":"yyt-hidden"}">
              <label>\u7ED1\u5B9A Ai \u6307\u4EE4\u9884\u8BBE</label>
              <select class="yyt-select" id="${f}-tool-bypass-preset">
                <option value="">\u9009\u62E9\u9884\u8BBE</option>
                ${u.map(Q=>`
                  <option value="${x(Q.id)}" ${Q.id===m?"selected":""}>
                    ${x(Q.name)}${Q.isDefault?" [\u9ED8\u8BA4]":""}
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
                <input type="checkbox" id="${f}-tool-worldbooks-enabled" ${M.enabled?"checked":""}>
                <span>\u542F\u7528\u4E16\u754C\u4E66\u6CE8\u5165</span>
              </label>
            </div>
            <div class="yyt-form-group">
              <label>\u9009\u62E9\u8981\u6CE8\u5165\u7684\u4E16\u754C\u4E66\uFF08\u53EF\u591A\u9009\uFF09</label>
              <div class="yyt-worldbook-select" id="${f}-tool-worldbook-select">
                <div class="yyt-worldbook-summary">${x(Y)}</div>
                <div class="yyt-worldbook-dropdown" id="${f}-tool-worldbook-dropdown">
                  <input type="text" class="yyt-input yyt-worldbook-search" id="${f}-tool-worldbook-search" placeholder="\u641C\u7D22\u4E16\u754C\u4E66..." value="${x(this.worldbookFilter||"")}">
                  <div class="yyt-worldbook-list" id="${f}-tool-worldbooks">
                    ${k.length>0?te.length>0?te.map(Q=>`
                      <div class="yyt-worldbook-item">
                        <label class="yyt-checkbox-label">
                          <input type="checkbox" data-worldbook-name="${x(Q)}" ${I.includes(Q)?"checked":""}>
                          <span>${x(Q)}</span>
                        </label>
                      </div>
                    `).join(""):'<div class="yyt-tool-compact-hint yyt-worldbook-empty">\u672A\u627E\u5230\u5339\u914D\u4E16\u754C\u4E66\u3002</div>':`<div class="yyt-tool-compact-hint yyt-worldbook-empty">${this.worldbookLoadState==="loading"?"\u4E16\u754C\u4E66\u52A0\u8F7D\u4E2D\u2026":"\u5F53\u524D\u672A\u8BFB\u53D6\u5230\u53EF\u7528\u4E16\u754C\u4E66\u3002"}</div>`}
                  </div>
                  ${this.worldbookLoadState!=="ready"?`
                    <details class="yyt-worldbook-diagnostics">
                      <summary>\u67E5\u770B\u4E16\u754C\u4E66\u8BCA\u65AD</summary>
                      <pre class="yyt-preview-box yyt-preview-pre">${x(JSON.stringify(Si()||{state:this.worldbookLoadState||"idle",message:"\u5C1A\u672A\u751F\u6210\u8BCA\u65AD\u4FE1\u606F"},null,2))}</pre>
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
                <input type="number" class="yyt-input" id="${f}-tool-max-messages" min="1" max="50" value="${Number(A.maxMessages)||5}">
              </div>
            </div>
            <div class="yyt-form-group">
              <label>\u63D0\u53D6\u6807\u7B7E / \u6B63\u5219</label>
              <textarea class="yyt-textarea yyt-code-textarea yyt-code-textarea-small"
                        id="${f}-tool-extraction-selectors"
                        rows="5"
                        placeholder="${x(o)}">${x(K)}</textarea>
              <div class="yyt-tool-compact-hint">\u6BCF\u884C\u4E00\u4E2A\u89C4\u5219\u3002\u666E\u901A\u6587\u672C\u6309\u6807\u7B7E\u63D0\u53D6\uFF1B\u4EE5 <code>regex:</code> \u5F00\u5934\u65F6\u6309\u6B63\u5219\u7B2C\u4E00\u6355\u83B7\u7EC4\u63D0\u53D6\u3002</div>
            </div>
          </div>

          <div class="yyt-panel-section">
            <div class="yyt-section-title">
              <i class="fa-solid fa-bolt"></i>
              <span>\u81EA\u52A8\u89E6\u53D1</span>
            </div>
            <div class="yyt-form-group">
              <label class="yyt-checkbox-label">
                <input type="checkbox" id="${f}-tool-automation-enabled" ${w.enabled?"checked":""}>
                <span>\u5141\u8BB8\u5F53\u524D\u5DE5\u5177\u53C2\u4E0E\u81EA\u52A8\u89E6\u53D1</span>
              </label>
            </div>
            <div class="yyt-form-row">
              <div class="yyt-form-group yyt-flex-1">
                <label>\u7B49\u5F85\u7A33\u5B9A\u65F6\u95F4 (ms)</label>
                <input type="number" class="yyt-input" id="${f}-tool-automation-settle-ms" min="0" max="10000" step="100" value="${Number(w.settleMs)||1200}">
              </div>
              <div class="yyt-form-group yyt-flex-1">
                <label>\u51B7\u5374\u65F6\u95F4 (ms)</label>
                <input type="number" class="yyt-input" id="${f}-tool-automation-cooldown-ms" min="0" max="60000" step="100" value="${Number(w.cooldownMs)||5e3}">
              </div>
            </div>
            <div class="yyt-tool-compact-hint">\u53EA\u6709\u540C\u65F6\u6EE1\u8DB3\u201C\u5F53\u524D\u5DE5\u5177\u542F\u7528\u81EA\u52A8\u89E6\u53D1\u201D\u201C\u8F93\u51FA\u6A21\u5F0F\u4E3A\u989D\u5916 AI \u6A21\u578B\u89E3\u6790\u201D\u201C\u5168\u5C40\u81EA\u52A8\u5316\u5F00\u542F\u201D\u65F6\uFF0C\u624D\u4F1A\u5728 AI \u56DE\u590D\u540E\u81EA\u52A8\u6267\u884C\u3002</div>
          </div>

          <div class="yyt-panel-section">
            <div class="yyt-section-title">
              <i class="fa-solid fa-file-code"></i>
              <span>\u6A21\u677F\u4FEE\u6539\u6846</span>
              <div class="yyt-title-actions">
                <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="${f}-tool-reset-template">
                  <i class="fa-solid fa-undo"></i> \u91CD\u7F6E\u6A21\u677F
                </button>
              </div>
            </div>
            <div class="yyt-form-group">
              <textarea class="yyt-textarea yyt-code-textarea"
                        id="${f}-tool-prompt-template"
                        rows="12"
                        placeholder="\u8F93\u5165\u63D0\u793A\u8BCD\u6A21\u677F...">${x(l.promptTemplate||"")}</textarea>
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
                  <span class="yyt-tool-runtime-badge yyt-status-${x(v)}">${x(v)}</span>
                </div>
                <div class="yyt-tool-runtime-line">
                  <span class="yyt-tool-runtime-label">\u6700\u8FD1\u8FD0\u884C</span>
                  <span class="yyt-tool-runtime-value">${x(b)}</span>
                </div>
                <div class="yyt-tool-runtime-line">
                  <span class="yyt-tool-runtime-label">\u6210\u529F / \u5931\u8D25</span>
                  <span class="yyt-tool-runtime-value">${l.runtime?.successCount||0} / ${l.runtime?.errorCount||0}</span>
                </div>
                ${S?`
                  <div class="yyt-tool-runtime-line yyt-tool-runtime-error">
                    <span class="yyt-tool-runtime-label">\u6700\u8FD1\u9519\u8BEF</span>
                    <span class="yyt-tool-runtime-value">${x(S)}</span>
                  </div>
                `:""}
              </div>
              <div class="yyt-tool-manual-actions">
                <button class="yyt-btn yyt-btn-primary" id="${f}-tool-run-manual">
                  <i class="fa-solid fa-play"></i> \u7ACB\u5373\u6267\u884C\u4E00\u6B21
                </button>
                <button class="yyt-btn yyt-btn-secondary" id="${f}-tool-preview-extraction">
                  <i class="fa-solid fa-vial"></i> \u6D4B\u8BD5\u63D0\u53D6
                </button>
                <div class="yyt-tool-compact-hint">\u7528\u4E8E\u624B\u52A8\u9A8C\u8BC1\u5F53\u524D\u6A21\u677F\u3001API\u9884\u8BBE\u548C Ai \u6307\u4EE4\u9884\u8BBE\u662F\u5426\u80FD\u6B63\u5E38\u5DE5\u4F5C\u3002</div>
              </div>
            </div>
          </div>

          <div class="yyt-panel-footer yyt-panel-footer-end">
            <div class="yyt-footer-right">
              <button class="yyt-btn yyt-btn-primary" id="${f}-tool-save">
                <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u914D\u7F6E
              </button>
            </div>
          </div>

          <div class="yyt-tool-macro-hint">
            \u8BF4\u660E\uFF1A\u5DE5\u5177\u4F1A\u628A\u5F53\u524D\u6A21\u677F\u89E3\u6790\u540E\u4F5C\u4E3A\u6700\u7EC8\u7528\u6237\u8BF7\u6C42\u53D1\u9001\u7ED9\u989D\u5916\u6A21\u578B\uFF1B\u82E5\u542F\u7528\u4E86 Ai \u6307\u4EE4\u9884\u8BBE\uFF0C\u5219\u4F1A\u4F5C\u4E3A\u524D\u7F6E\u6D88\u606F\u4E00\u5E76\u53D1\u9001\u3002\u53EF\u7528\u5B8F\u5305\u62EC <code>{{toolPromptMacro}}</code>\u3001<code>{{toolContentMacro}}</code>\u3001<code>{{toolWorldbookContent}}</code>\u3001<code>{{lastAiMessage}}</code>\u3001<code>{{recentMessagesText}}</code>\u3001<code>{{rawRecentMessagesText}}</code>\u3001<code>{{userMessage}}</code>\u3001<code>{{toolName}}</code>\u3001<code>{{toolId}}</code>\u3002
          </div>
        </div>
      `},_getApiPresets(){try{return wt()||[]}catch{return[]}},_getBypassPresets(){try{return Sa()||[]}catch{return[]}},async _loadWorldbooks(){this.worldbookLoadState="loading";for(let d=0;d<10;d+=1){try{let u=await Ti();if(Array.isArray(u)&&u.length>0)return this.availableWorldbooks=u,this.worldbookLoadState="ready",this.availableWorldbooks}catch{this.availableWorldbooks=ar()}d<9&&await new Promise(u=>setTimeout(u,400))}return this.availableWorldbooks=ar(),this.worldbookLoadState="empty",this.availableWorldbooks},_getFormData(l){let c=D(),d=J(this.toolId)||{};if(!c||!B(l))return d;let u=l.find(`#${f}-tool-output-mode`).val()||"follow_ai",y=l.find(`#${f}-tool-bypass-enabled`).is(":checked"),g=u==="post_response_api",m=g&&l.find(`#${f}-tool-automation-enabled`).is(":checked"),v=(l.find(`#${f}-tool-extraction-selectors`).val()||"").split(/\r?\n/).map(S=>S.trim()).filter(Boolean),b=l.find("[data-worldbook-name]:checked").map((S,A)=>String(c(A).data("worldbook-name")||"").trim()).get().filter(Boolean);return{enabled:d?.enabled!==!1,promptTemplate:l.find(`#${f}-tool-prompt-template`).val()||"",apiPreset:l.find(`#${f}-tool-api-preset`).val()||"",extractTags:v,output:{mode:u,apiPreset:l.find(`#${f}-tool-api-preset`).val()||"",overwrite:!0,enabled:g},automation:{enabled:m,settleMs:Math.max(0,parseInt(l.find(`#${f}-tool-automation-settle-ms`).val(),10)||1200),cooldownMs:Math.max(0,parseInt(l.find(`#${f}-tool-automation-cooldown-ms`).val(),10)||5e3)},bypass:{enabled:y,presetId:y&&l.find(`#${f}-tool-bypass-preset`).val()||""},worldbooks:{enabled:l.find(`#${f}-tool-worldbooks-enabled`).is(":checked"),selected:b},extraction:{enabled:!0,maxMessages:Math.max(1,parseInt(l.find(`#${f}-tool-max-messages`).val(),10)||5),selectors:v}}},_showExtractionPreview(l,c,d=null){if(!D()||d!==null&&!this._isRenderSessionActive(l,d))return;let y=`${f}-${a}`,g=Array.isArray(c.messageEntries)?c.messageEntries:[],m=g.length>0?`
          <div class="yyt-form-group">
            <label>\u9010\u6761\u6D88\u606F\u9884\u89C8</label>
            <div class="yyt-preview-message-list">
              ${g.map((v,b)=>`
                <div class="yyt-preview-message-item">
                  <div class="yyt-preview-message-title">${b===g.length-1?"\u6700\u65B0\u6D88\u606F":`\u6700\u8FD1\u7684\u7B2C ${g.length-b} \u6761\u6D88\u606F`}</div>
                  <div>
                    <label>\u539F\u6587</label>
                    <pre class="yyt-preview-box yyt-preview-pre">${x(v.rawText||"\u65E0\u53EF\u7528\u6D88\u606F")}</pre>
                  </div>
                  <div>
                    <label>\u6B63\u6587\u63D0\u53D6</label>
                    <pre class="yyt-preview-box yyt-preview-pre">${x(v.filteredText||"\u6B63\u6587\u89C4\u5219\u672A\u547D\u4E2D")}</pre>
                  </div>
                  <div>
                    <label>\u5DE5\u5177\u6807\u7B7E\u63D0\u53D6</label>
                    <pre class="yyt-preview-box yyt-preview-pre">${x(v.extractedText||"\u672A\u63D0\u53D6\u5230\u5185\u5BB9")}</pre>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>
        `:"";l.append(Gs({id:y,title:n,width:"720px",wide:!0,body:`
          <div class="yyt-form-group">
            <label>\u63D0\u53D6\u89C4\u5219</label>
            <div class="yyt-preview-box">${x((c.selectors||[]).join(`
`)||"\u65E0")}</div>
          </div>
          <div class="yyt-form-group">
            <label>\u539F\u59CB\u5185\u5BB9\u6C47\u603B\uFF08\u6309\u6700\u8FD1\u6D88\u606F\u5230\u66F4\u65E9\u6D88\u606F\uFF09</label>
            <pre class="yyt-preview-box yyt-preview-pre">${x(c.sourceText||"\u65E0\u53EF\u7528\u6D88\u606F")}</pre>
          </div>
          <div class="yyt-form-group">
            <label>\u6B63\u6587\u63D0\u53D6\u6C47\u603B</label>
            <pre class="yyt-preview-box yyt-preview-pre">${x(c.filteredSourceText||"\u6B63\u6587\u89C4\u5219\u672A\u547D\u4E2D")}</pre>
          </div>
          <div class="yyt-form-group">
            <label>\u5DE5\u5177\u6807\u7B7E\u63D0\u53D6\u6C47\u603B</label>
            <pre class="yyt-preview-box yyt-preview-pre">${x(c.extractedText||"\u672A\u63D0\u53D6\u5230\u5185\u5BB9")}</pre>
          </div>
          ${m}
        `})),Vs(l,y,{onSave:v=>v()}),l.find(`#${y}-save`).text("\u5173\u95ED"),l.find(`#${y}-cancel`).remove()},bindEvents(l){let c=D();if(!c||!B(l))return;let d=this,u=l.data("yytRenderSessionId"),y=()=>l.find("[data-worldbook-name]:checked").map((v,b)=>String(c(b).data("worldbook-name")||"").trim()).get().filter(Boolean),g=()=>{let v=y(),b=v.length===0?"\u9009\u62E9\u8981\u6CE8\u5165\u7684\u4E16\u754C\u4E66":v.length<=2?v.join("\u3001"):`\u5DF2\u9009 ${v.length} \u9879\uFF1A${v.slice(0,2).join("\u3001")} \u7B49`;l.find(".yyt-worldbook-summary").text(b)},m=()=>{let v=String(this.worldbookFilter||"").trim().toLowerCase(),b=l.find(`#${f}-tool-worldbooks`),S=b.find(".yyt-worldbook-item"),A=0;S.each((w,M)=>{let I=c(M),k=String(I.find("[data-worldbook-name]").data("worldbook-name")||"").toLowerCase(),N=!v||k.includes(v);I.toggleClass("yyt-hidden",!N),N&&(A+=1)}),b.find(".yyt-worldbook-search-empty").remove(),S.length>0&&A===0&&b.append('<div class="yyt-tool-compact-hint yyt-worldbook-empty yyt-worldbook-search-empty">\u672A\u627E\u5230\u5339\u914D\u4E16\u754C\u4E66\u3002</div>')};l.off(".yytToolPanel"),l.on("input.yytToolPanel",`#${f}-tool-worldbook-search`,v=>{this.worldbookFilter=String(c(v.currentTarget).val()||""),m()}),m(),l.on("change.yytToolPanel","[data-worldbook-name]",()=>{this.draftSelectedWorldbooks=y(),g()}),l.on("change.yytToolPanel",`#${f}-tool-output-mode`,()=>{let b=(l.find(`#${f}-tool-output-mode`).val()||"follow_ai")==="post_response_api"?`${r} \u5F53\u524D\u6A21\u5F0F\u4F1A\u53C2\u4E0E\u81EA\u52A8\u89E6\u53D1\uFF0C\u8BB0\u5F97\u540C\u65F6\u5F00\u542F\u5168\u5C40\u81EA\u52A8\u5316\u3002`:"\u968F AI \u8F93\u51FA\u6A21\u5F0F\u4E0D\u4F1A\u989D\u5916\u8BF7\u6C42\u6A21\u578B\uFF0C\u4F46\u4ECD\u7136\u652F\u6301\u624B\u52A8\u6267\u884C\u4E0E\u6D4B\u8BD5\u63D0\u53D6\u3002";l.find(".yyt-tool-mode-hint").text(b)}),l.on("change.yytToolPanel",`#${f}-tool-bypass-enabled`,v=>{let b=c(v.currentTarget).is(":checked");l.find(".yyt-bypass-preset-select").toggleClass("yyt-hidden",!b)}),l.on("click.yytToolPanel",`#${f}-tool-save, #${f}-tool-save-top`,()=>{d._saveConfig(l,{silent:!1})}),l.on("click.yytToolPanel",`#${f}-tool-reset-template`,()=>{let v=bs(d.toolId);v?.promptTemplate&&(l.find(`#${f}-tool-prompt-template`).val(v.promptTemplate),_("info","\u6A21\u677F\u5DF2\u91CD\u7F6E"))}),l.on("click.yytToolPanel",`#${f}-tool-run-manual`,async()=>{if(d._saveConfig(l,{silent:!0}))try{let b=await po(d.toolId);if(!d._isRenderSessionActive(l,u))return;!b?.success&&b?.error&&he("warning",b.error,{duration:3200,noticeId:`yyt-tool-run-${d.toolId}`})}catch(b){if(!d._isRenderSessionActive(l,u))return;_("error",b?.message||"\u624B\u52A8\u6267\u884C\u5931\u8D25")}finally{d._renderIfSessionActive(l,u)}}),l.on("click.yytToolPanel",`#${f}-tool-preview-extraction`,async()=>{if(d._saveConfig(l,{silent:!0}))try{let b=await go(d.toolId);if(!d._isRenderSessionActive(l,u))return;if(!b?.success){_("error",b?.error||"\u6D4B\u8BD5\u63D0\u53D6\u5931\u8D25");return}d._showExtractionPreview(l,b,u)}catch(b){if(!d._isRenderSessionActive(l,u))return;_("error",b?.message||"\u6D4B\u8BD5\u63D0\u53D6\u5931\u8D25")}}),Se(l,{namespace:"yytToolPanelSelect",selectors:[`#${f}-tool-output-mode`,`#${f}-tool-api-preset`,`#${f}-tool-bypass-preset`]})},_saveConfig(l,c={}){let d=this._getFormData(l),{silent:u=!1}=c,y=ze(this.toolId,d);return y&&(this.draftSelectedWorldbooks=Array.isArray(d.worldbooks?.selected)?[...d.worldbooks.selected]:[]),y?u||_("success","\u914D\u7F6E\u5DF2\u4FDD\u5B58"):_("error","\u4FDD\u5B58\u5931\u8D25"),y},destroy(l){!D()||!B(l)||(this.renderSessionId=(this.renderSessionId||0)+1,l.removeData("yytRenderSessionId"),ue(l,"yytToolPanelSelect"),l.off(".yytToolPanel"))},getStyles(){return As},renderTo(l){if(!D()||!B(l))return;let d=this._beginRenderSession(l);if(this.worldbookFilter=this.worldbookFilter||"",!Array.isArray(this.draftSelectedWorldbooks)){let y=J(this.toolId);this.draftSelectedWorldbooks=Array.isArray(y?.worldbooks?.selected)?[...y.worldbooks.selected]:[]}let u=ar();Array.isArray(u)&&u.length>0?(this.availableWorldbooks=u,this.worldbookLoadState="ready"):this.worldbookLoadState="loading",l.html(this.render({})),this.bindEvents(l,{}),this.worldbookLoadState==="loading"&&Promise.resolve(this._loadWorldbooks()).catch(()=>(this.worldbookLoadState="empty",ar())).then(y=>{this._isRenderSessionActive(l,d)&&(this.availableWorldbooks=Array.isArray(y)?y:[],this._updateWorldbookList(l,d))})},_updateWorldbookList(l,c=null){if(!D()||!B(l)||c!==null&&!this._isRenderSessionActive(l,c))return;let u=String(this.worldbookFilter||"").trim().toLowerCase(),y=Array.isArray(this.availableWorldbooks)?this.availableWorldbooks:[],g=Array.isArray(this.draftSelectedWorldbooks)?this.draftSelectedWorldbooks:[],m=u?y.filter(S=>String(S||"").toLowerCase().includes(u)):y,v=l.find(`#${f}-tool-worldbooks`);if(!v.length)return;if(y.length===0){v.html(`<div class="yyt-tool-compact-hint yyt-worldbook-empty">${this.worldbookLoadState==="loading"?"\u4E16\u754C\u4E66\u52A0\u8F7D\u4E2D\u2026":"\u5F53\u524D\u672A\u8BFB\u53D6\u5230\u53EF\u7528\u4E16\u754C\u4E66\u3002"}</div>`);return}v.html(m.length>0?m.map(S=>`
        <div class="yyt-worldbook-item">
          <label class="yyt-checkbox-label">
            <input type="checkbox" data-worldbook-name="${x(S)}" ${g.includes(S)?"checked":""}>
            <span>${x(S)}</span>
          </label>
        </div>
      `).join(""):'<div class="yyt-tool-compact-hint yyt-worldbook-empty">\u672A\u627E\u5230\u5339\u914D\u4E16\u754C\u4E66\u3002</div>');let b=g.length===0?"\u9009\u62E9\u8981\u6CE8\u5165\u7684\u4E16\u754C\u4E66":g.length<=2?g.join("\u3001"):`\u5DF2\u9009 ${g.length} \u9879\uFF1A${g.slice(0,2).join("\u3001")} \u7B49`;l.find(".yyt-worldbook-summary").text(b)}}}var As,Ou,es=U(()=>{Te();Et();xa();Hs();nr();ka();As=`
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
`;Ou=Mt});var ts,Ia=U(()=>{es();ts=Mt({id:"summaryToolPanel",toolId:"summaryTool",postResponseHint:"\u70B9\u51FB\u201C\u7ACB\u5373\u6267\u884C\u4E00\u6B21\u201D\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u8FDB\u884C\u6458\u8981\u89E3\u6790\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 boo_FM
\u6216 regex:<boo_FM>([\\s\\S]*?)</boo_FM>`,previewDialogId:"summary-extraction-preview",defaultInjectionOrder:1e4,lorebookLogTag:"SummaryToolPanel"})});var ss,Ca=U(()=>{es();ss=Mt({id:"statusBlockPanel",toolId:"statusBlock",postResponseHint:"\u70B9\u51FB\u201C\u7ACB\u5373\u6267\u884C\u4E00\u6B21\u201D\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u751F\u6210\u4E3B\u89D2\u72B6\u6001\u680F\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 status_block
\u6216 regex:<status_block>([\\s\\S]*?)</status_block>`,previewDialogId:"status-extraction-preview",defaultInjectionOrder:10001,lorebookLogTag:"StatusBlockPanel"})});var rs,Pa=U(()=>{es();rs=Mt({id:"youyouReviewPanel",toolId:"youyouReview",postResponseHint:"\u70B9\u51FB\u201C\u7ACB\u5373\u6267\u884C\u4E00\u6B21\u201D\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u5728\u672B\u5C3E\u751F\u6210\u5C0F\u5E7D\u70B9\u8BC4\u4E0E\u5267\u60C5\u94A9\u5B50\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 youyou
\u6216 regex:<youyou>([\\s\\S]*?)</youyou>`,previewDialogId:"youyou-review-extraction-preview",previewTitle:"\u5C0F\u5E7D\u70B9\u8BC4\u63D0\u53D6\u9884\u89C8"})});function Fi(t=[],e={}){return t.map(s=>({...s,checked:e?.[s.key]===!0}))}function fo(t){let{id:e,toolId:s,previewDialogId:r,previewTitle:o="\u6D4B\u8BD5\u63D0\u53D6\u7ED3\u679C",processorDirections:a=[],processorOptions:n=[],heroHint:i="",extractionPlaceholder:l=""}=t;return{id:e,toolId:s,renderSessionId:0,_beginRenderSession(c){return this.renderSessionId=(this.renderSessionId||0)+1,B(c)&&c.data("yytRenderSessionId",this.renderSessionId),this.renderSessionId},_isRenderSessionActive(c,d){return B(c)&&c.data("yytRenderSessionId")===d},_renderIfSessionActive(c,d){return this._isRenderSessionActive(c,d)?(this.renderTo(c),!0):!1},render(){let c=J(this.toolId);if(!c)return'<div class="yyt-error">\u5DE5\u5177\u914D\u7F6E\u52A0\u8F7D\u5931\u8D25</div>';let d=c.processor||{},u=c.extraction||{},y=c.runtime?.lastStatus||"idle",g=c.runtime?.lastRunAt?new Date(c.runtime.lastRunAt).toLocaleString():"\u672A\u8FD0\u884C",m=c.runtime?.lastError||"",v=Array.isArray(u.selectors)?u.selectors.join(`
`):"",b=c.output?.overwrite!==!1,S=Fi(a,{[d.direction||a[0]?.key||""]:!0}),A=Fi(n,d.options||{});return`
        <div class="yyt-tool-panel" data-tool-id="${this.toolId}">
          <div class="yyt-tool-panel-hero">
            <div class="yyt-tool-panel-hero-copy">
              <div class="yyt-tool-panel-hero-title">${x(c.name||this.toolId)}</div>
              <div class="yyt-tool-panel-hero-desc">${x(c.description||"")}</div>
            </div>
            <div class="yyt-tool-panel-hero-tags">
              <span class="yyt-tool-hero-chip">\u672C\u5730\u811A\u672C\u5904\u7406</span>
              <span class="yyt-tool-hero-chip">\u5199\u56DE ${b?"\u8986\u76D6":"\u8FFD\u52A0"}</span>
              <span class="yyt-tool-hero-chip">\u6700\u8FD1\u72B6\u6001 ${x(y)}</span>
              <div class="yyt-tool-panel-hero-actions">
                <button class="yyt-btn yyt-btn-primary yyt-btn-small yyt-tool-save-top" id="${f}-tool-save-top">
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
              <input type="checkbox" id="${f}-tool-enabled" ${c.enabled!==!1?"checked":""}>
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
                <input type="number" class="yyt-input" id="${f}-tool-max-messages" min="1" max="50" value="${Number(u.maxMessages)||5}">
              </div>
            </div>
            <div class="yyt-form-group">
              <label>\u63D0\u53D6\u6807\u7B7E / \u6B63\u5219</label>
              <textarea class="yyt-textarea yyt-code-textarea yyt-code-textarea-small"
                        id="${f}-tool-extraction-selectors"
                        rows="5"
                        placeholder="${x(l)}">${x(v)}</textarea>
              <div class="yyt-tool-compact-hint">\u6BCF\u884C\u4E00\u4E2A\u89C4\u5219\u3002\u666E\u901A\u6587\u672C\u6309\u6807\u7B7E\u5B9A\u4F4D\uFF1B\u4EE5 <code>regex:</code> \u5F00\u5934\u65F6\u6309\u6B63\u5219\u7B2C\u4E00\u6355\u83B7\u7EC4\u5B9A\u4F4D\u3002\u624B\u52A8\u6267\u884C\u4F1A\u57FA\u4E8E\u6700\u65B0 AI \u6D88\u606F\u5168\u6587\u539F\u4F4D\u66FF\u6362\uFF0C\u5C3D\u91CF\u4FDD\u7559\u5916\u5C42\u6807\u7B7E\u548C\u5176\u4F59\u539F\u6587\u3002</div>
            </div>
          </div>

          <div class="yyt-panel-section">
            <div class="yyt-section-title">
              <i class="fa-solid fa-shuffle"></i>
              <span>\u6267\u884C\u79CD\u7C7B</span>
            </div>
            <div class="yyt-local-output-mode-grid">
              ${S.map(w=>`
                <label class="yyt-local-choice-card">
                  <div class="yyt-checkbox-label">
                    <input type="radio" name="${f}-processor-direction-${this.toolId}" value="${x(w.key)}" ${w.checked?"checked":""}>
                    <span>${x(w.label)}</span>
                  </div>
                  <div class="yyt-local-choice-desc">${x(w.description||"")}</div>
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
              ${A.map(w=>`
                <div class="yyt-local-option-card">
                  <label class="yyt-checkbox-label">
                    <span>${x(w.label)}</span>
                    <input type="checkbox" data-option-key="${x(w.key)}" ${w.checked?"checked":""}>
                  </label>
                  <div class="yyt-tool-compact-hint">${x(w.description||"")}</div>
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
                  <input type="radio" name="${f}-output-mode-${this.toolId}" value="replace" ${b?"checked":""}>
                  <span>\u8986\u76D6\u539F\u5DE5\u5177\u5757</span>
                </div>
                <div class="yyt-local-choice-desc">\u4F18\u5148\u66FF\u6362\u8BE5\u5DE5\u5177\u6B64\u524D\u5199\u5165\u7684\u5185\u5BB9\u3002</div>
              </label>
              <label class="yyt-local-choice-card">
                <div class="yyt-checkbox-label">
                  <input type="radio" name="${f}-output-mode-${this.toolId}" value="append" ${b?"":"checked"}>
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
                  <span class="yyt-tool-runtime-badge yyt-status-${x(y)}">${x(y)}</span>
                </div>
                <div class="yyt-tool-runtime-line">
                  <span class="yyt-tool-runtime-label">\u6700\u8FD1\u8FD0\u884C</span>
                  <span class="yyt-tool-runtime-value">${x(g)}</span>
                </div>
                <div class="yyt-tool-runtime-line">
                  <span class="yyt-tool-runtime-label">\u6210\u529F / \u5931\u8D25</span>
                  <span class="yyt-tool-runtime-value">${c.runtime?.successCount||0} / ${c.runtime?.errorCount||0}</span>
                </div>
                ${m?`
                  <div class="yyt-tool-runtime-line yyt-tool-runtime-error">
                    <span class="yyt-tool-runtime-label">\u6700\u8FD1\u9519\u8BEF</span>
                    <span class="yyt-tool-runtime-value">${x(m)}</span>
                  </div>
                `:""}
              </div>
              <div class="yyt-tool-manual-actions">
                <button class="yyt-btn yyt-btn-primary" id="${f}-tool-run-manual">
                  <i class="fa-solid fa-play"></i> \u7ACB\u5373\u6267\u884C\u4E00\u6B21
                </button>
                <button class="yyt-btn yyt-btn-secondary" id="${f}-tool-preview-extraction">
                  <i class="fa-solid fa-vial"></i> \u6D4B\u8BD5\u63D0\u53D6
                </button>
                <div class="yyt-tool-compact-hint">${x(i||"\u4FDD\u5B58\u540E\u53EF\u76F4\u63A5\u5BF9\u6700\u8FD1 AI \u6D88\u606F\u505A\u672C\u5730\u6587\u672C\u5904\u7406\u3002")}</div>
              </div>
            </div>
          </div>

          <div class="yyt-panel-footer yyt-panel-footer-end">
            <div class="yyt-footer-right">
              <button class="yyt-btn yyt-btn-primary" id="${f}-tool-save">
                <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u914D\u7F6E
              </button>
            </div>
          </div>
        </div>
      `},_getFormData(c){let d=D(),u=J(this.toolId)||{};if(!d||!B(c))return u;let y=(c.find(`#${f}-tool-extraction-selectors`).val()||"").split(/\r?\n/).map(b=>b.trim()).filter(Boolean),g=c.find(`input[name="${f}-processor-direction-${this.toolId}"]:checked`).val()||a[0]?.key||"",m=c.find(`input[name="${f}-output-mode-${this.toolId}"]:checked`).val()||"replace",v={};return c.find("[data-option-key]").each((b,S)=>{let A=d(S);v[A.data("option-key")]=A.is(":checked")}),{enabled:c.find(`#${f}-tool-enabled`).is(":checked"),extractTags:y,output:{...u.output||{},mode:"local_transform",overwrite:m!=="append",enabled:!0},extraction:{enabled:!0,maxMessages:Math.max(1,parseInt(c.find(`#${f}-tool-max-messages`).val(),10)||5),selectors:y},processor:{...u.processor||{},direction:g,options:v},runtime:{...u.runtime||{}}}},_showExtractionPreview(c,d,u=null){if(!D()||u!==null&&!this._isRenderSessionActive(c,u))return;let g=`${f}-${r}`,m=Array.isArray(d.messageEntries)?d.messageEntries:[],v=m.length>0?`
          <div class="yyt-form-group">
            <label>\u9010\u6761\u6D88\u606F\u9884\u89C8</label>
            <div class="yyt-preview-message-list">
              ${m.map((b,S)=>`
                <div class="yyt-preview-message-item">
                  <div class="yyt-preview-message-title">${S===m.length-1?"\u6700\u65B0\u6D88\u606F":`\u6700\u8FD1\u7684\u7B2C ${m.length-S} \u6761\u6D88\u606F`}</div>
                  <div>
                    <label>\u539F\u6587</label>
                    <pre class="yyt-preview-box yyt-preview-pre">${x(b.rawText||"\u65E0\u53EF\u7528\u6D88\u606F")}</pre>
                  </div>
                  <div>
                    <label>\u6B63\u6587\u63D0\u53D6</label>
                    <pre class="yyt-preview-box yyt-preview-pre">${x(b.filteredText||"\u6B63\u6587\u89C4\u5219\u672A\u547D\u4E2D")}</pre>
                  </div>
                  <div>
                    <label>\u5DE5\u5177\u6807\u7B7E\u63D0\u53D6</label>
                    <pre class="yyt-preview-box yyt-preview-pre">${x(b.extractedText||"\u672A\u63D0\u53D6\u5230\u5185\u5BB9")}</pre>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>
        `:"";c.append(Gs({id:g,title:o,width:"720px",wide:!0,body:`
          <div class="yyt-form-group">
            <label>\u63D0\u53D6\u89C4\u5219</label>
            <div class="yyt-preview-box">${x((d.selectors||[]).join(`
`)||"\u65E0")}</div>
          </div>
          <div class="yyt-form-group">
            <label>\u539F\u59CB\u5185\u5BB9\u6C47\u603B\uFF08\u6309\u6700\u8FD1\u6D88\u606F\u5230\u66F4\u65E9\u6D88\u606F\uFF09</label>
            <pre class="yyt-preview-box yyt-preview-pre">${x(d.sourceText||"\u65E0\u53EF\u7528\u6D88\u606F")}</pre>
          </div>
          <div class="yyt-form-group">
            <label>\u6B63\u6587\u63D0\u53D6\u6C47\u603B</label>
            <pre class="yyt-preview-box yyt-preview-pre">${x(d.filteredSourceText||"\u6B63\u6587\u89C4\u5219\u672A\u547D\u4E2D")}</pre>
          </div>
          <div class="yyt-form-group">
            <label>\u5DE5\u5177\u6807\u7B7E\u63D0\u53D6\u6C47\u603B</label>
            <pre class="yyt-preview-box yyt-preview-pre">${x(d.extractedText||"\u672A\u63D0\u53D6\u5230\u5185\u5BB9")}</pre>
          </div>
          ${v}
        `})),Vs(c,g,{onSave:b=>b()}),c.find(`#${g}-save`).text("\u5173\u95ED"),c.find(`#${g}-cancel`).remove()},bindEvents(c){if(!D()||!B(c))return;let u=this,y=c.data("yytRenderSessionId");c.off(".yytLocalToolPanel"),c.on("click.yytLocalToolPanel",`#${f}-tool-save, #${f}-tool-save-top`,()=>{u._saveConfig(c,{silent:!1})}),c.on("click.yytLocalToolPanel",`#${f}-tool-run-manual`,async()=>{if(u._saveConfig(c,{silent:!0}))try{let m=await po(u.toolId);if(!u._isRenderSessionActive(c,y))return;!m?.success&&m?.error&&he("warning",m.error,{duration:3200,noticeId:`yyt-tool-run-${u.toolId}`})}catch(m){if(!u._isRenderSessionActive(c,y))return;_("error",m?.message||"\u624B\u52A8\u6267\u884C\u5931\u8D25")}finally{u._renderIfSessionActive(c,y)}}),c.on("click.yytLocalToolPanel",`#${f}-tool-preview-extraction`,async()=>{if(u._saveConfig(c,{silent:!0}))try{let m=await go(u.toolId);if(!u._isRenderSessionActive(c,y))return;if(!m?.success){_("error",m?.error||"\u6D4B\u8BD5\u63D0\u53D6\u5931\u8D25");return}u._showExtractionPreview(c,m,y)}catch(m){if(!u._isRenderSessionActive(c,y))return;_("error",m?.message||"\u6D4B\u8BD5\u63D0\u53D6\u5931\u8D25")}}),c.on("click.yytLocalToolPanel",`#${f}-tool-reset-template`,()=>{let g=bs(u.toolId);g?.promptTemplate&&(c.find(`#${f}-tool-prompt-template`).val(g.promptTemplate),_("info","\u6A21\u677F\u5DF2\u91CD\u7F6E"))})},_saveConfig(c,d={}){let u=this._getFormData(c),{silent:y=!1}=d,g=ze(this.toolId,u);return g?y||_("success","\u914D\u7F6E\u5DF2\u4FDD\u5B58"):_("error","\u4FDD\u5B58\u5931\u8D25"),g},destroy(c){!D()||!B(c)||(this.renderSessionId=(this.renderSessionId||0)+1,c.removeData("yytRenderSessionId"),c.off(".yytLocalToolPanel"))},getStyles(){return Nu},renderTo(c){!D()||!B(c)||(this._beginRenderSession(c),c.html(this.render({})),this.bindEvents(c,{}))}}}var Nu,Ra=U(()=>{Te();Et();ka();es();Nu=`${As}
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
`});var os,$a=U(()=>{Ra();os=fo({id:"escapeTransformToolPanel",toolId:"escapeTransformTool",previewDialogId:"escape-transform-extraction-preview",previewTitle:"\u8F6C\u4E49\u5904\u7406\u63D0\u53D6\u9884\u89C8",heroHint:"\u4ECE\u6700\u8FD1 AI \u6D88\u606F\u63D0\u53D6\u6587\u672C\u540E\uFF0C\u5728\u672C\u5730\u6267\u884C\u8F6C\u4E49\u6216\u53BB\u8F6C\u4E49\uFF0C\u518D\u6309\u6240\u9009\u65B9\u5F0F\u5199\u56DE\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\u6216\u6B63\u5219\uFF0C\u4F8B\u5982\uFF1A
content
regex:<content>([\\s\\S]*?)</content>`,processorDirections:[{key:"escape",label:"\u8F6C\u4E49",description:"\u628A\u539F\u59CB\u5B57\u7B26\u8F6C\u6362\u6210\u8F6C\u4E49\u5E8F\u5217\u3002"},{key:"unescape",label:"\u53BB\u8F6C\u4E49",description:"\u628A\u8F6C\u4E49\u5E8F\u5217\u8FD8\u539F\u6210\u539F\u59CB\u5B57\u7B26\u3002"}],processorOptions:[{key:"doubleQuote",label:"\u53CC\u5F15\u53F7",description:'\u5904\u7406 " \u4E0E \\"\u3002'},{key:"singleQuote",label:"\u5355\u5F15\u53F7",description:"\u5904\u7406 ' \u4E0E \\'\u3002"},{key:"newline",label:"\u6362\u884C\u7B26",description:"\u5904\u7406\u6362\u884C\u4E0E \\n\u3002"}]})});var as,Da=U(()=>{Ra();as=fo({id:"punctuationTransformToolPanel",toolId:"punctuationTransformTool",previewDialogId:"punctuation-transform-extraction-preview",previewTitle:"\u4E2D\u6587\u6807\u70B9\u66FF\u6362\u63D0\u53D6\u9884\u89C8",heroHint:"\u4ECE\u6700\u8FD1 AI \u6D88\u606F\u63D0\u53D6\u6587\u672C\u540E\uFF0C\u5728\u672C\u5730\u628A\u82F1\u6587\u6807\u70B9\u66FF\u6362\u6210\u4E2D\u6587\u6807\u70B9\uFF0C\u518D\u6309\u6240\u9009\u65B9\u5F0F\u5199\u56DE\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\u6216\u6B63\u5219\uFF0C\u4F8B\u5982\uFF1A
content
regex:<content>([\\s\\S]*?)</content>`,processorDirections:[{key:"en_to_zh",label:"\u82F1\u6587\u8F6C\u4E2D\u6587",description:"\u6309\u52FE\u9009\u9879\u628A\u82F1\u6587\u6807\u70B9\u66FF\u6362\u4E3A\u4E2D\u6587\u6807\u70B9\u3002"}],processorOptions:[{key:"comma",label:"\u9017\u53F7 ,",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u9017\u53F7\u3002"},{key:"period",label:"\u53E5\u53F7 .",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u53E5\u53F7\u3002"},{key:"exclamation",label:"\u611F\u53F9\u53F7 !",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u611F\u53F9\u53F7\u3002"},{key:"question",label:"\u95EE\u53F7 ?",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u95EE\u53F7\u3002"},{key:"semicolon",label:"\u5206\u53F7 ;",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u5206\u53F7\u3002"},{key:"colon",label:"\u5192\u53F7 :",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u5192\u53F7\u3002"},{key:"leftParen",label:"\u5DE6\u62EC\u53F7 (",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u5DE6\u62EC\u53F7\u3002"},{key:"rightParen",label:"\u53F3\u62EC\u53F7 )",description:"\u66FF\u6362\u4E3A\u4E2D\u6587\u53F3\u62EC\u53F7\u3002"}]})});var ns,Oa=U(()=>{fe();nr();Te();ns={id:"bypassPanel",_getActivePresetId(t){return t.find(".yyt-bypass-editor-content").data("presetId")||null},render(t){let e=j.getPresetList(),s=j.getDefaultPresetId();return`
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
    `},_renderPresetItem(t,e){let s=pt&&pt[t.id];return`
      <div class="yyt-bypass-preset-item ${e?"yyt-default":""}" data-preset-id="${t.id}">
        <div class="yyt-bypass-preset-info">
          <span class="yyt-bypass-preset-name">${x(t.name)}</span>
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
      `;let e=j.getDefaultPresetId()===t.id,s=pt&&pt[t.id];return`
      <div class="yyt-bypass-editor-content" data-preset-id="${t.id}">
        <div class="yyt-bypass-editor-header">
          <div class="yyt-bypass-editor-title">
            <input type="text" class="yyt-input yyt-bypass-name-input" 
                   value="${x(t.name)}" placeholder="\u9884\u8BBE\u540D\u79F0">
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
                 value="${x(t.description||"")}" placeholder="\u9884\u8BBE\u63CF\u8FF0\uFF08\u53EF\u9009\uFF09">
        </div>

        <div class="yyt-bypass-messages-header">
          <span>\u6D88\u606F\u5217\u8868</span>
          <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="yyt-bypass-add-message">
            <i class="fa-solid fa-plus"></i> \u6DFB\u52A0\u6D88\u606F
          </button>
        </div>

        <div class="yyt-bypass-messages">
          ${(t.messages||[]).map(r=>this._renderMessageItem(r)).join("")}
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
            <select class="yyt-select yyt-bypass-role-select yyt-select-fixed-width">
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
                  placeholder="\u8F93\u5165\u6D88\u606F\u5185\u5BB9...">${x(t.content||"")}</textarea>
      </div>
    `},bindEvents(t,e){let s=D();!s||!B(t)||(t.off(".yytBypass"),this._bindPresetListEvents(t,s),this._bindEditorEvents(t,s),this._bindFileEvents(t,s),Se(t,{namespace:"yytBypassSelect",selectors:[".yyt-bypass-role-select"]}))},_bindPresetListEvents(t,e){t.on("click.yytBypass",".yyt-bypass-preset-item",s=>{if(e(s.target).closest(".yyt-bypass-quick-delete").length)return;let r=e(s.currentTarget).data("presetId");this._selectPreset(t,e,r)}),t.on("click.yytBypass",".yyt-bypass-quick-delete",s=>{s.stopPropagation();let r=e(s.currentTarget).data("presetId");if(!r||!confirm("\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u4E2A\u9884\u8BBE\u5417\uFF1F"))return;let o=j.deletePreset(r);o.success?(t.find(".yyt-bypass-editor-content").data("presetId")===r&&t.find(".yyt-bypass-editor").html(`
            <div class="yyt-bypass-empty">
              <i class="fa-solid fa-shield-halved"></i>
              <p>\u9009\u62E9\u6216\u521B\u5EFA Ai \u6307\u4EE4\u9884\u8BBE</p>
            </div>
          `),this._refreshPresetList(t,e),_("success","\u9884\u8BBE\u5DF2\u5220\u9664")):_("error",o?.message||"\u5220\u9664\u9884\u8BBE\u5931\u8D25")}),t.on("click.yytBypass","#yyt-bypass-add",()=>{this._createNewPreset(t,e)})},_bindEditorEvents(t,e){t.on("click.yytBypass","#yyt-bypass-save",()=>{this._saveCurrentPreset(t,e)}),t.on("click.yytBypass","#yyt-bypass-delete",()=>{this._deleteCurrentPreset(t,e)}),t.on("click.yytBypass","#yyt-bypass-duplicate",()=>{this._duplicateCurrentPreset(t,e)}),t.on("click.yytBypass","#yyt-bypass-set-default",()=>{this._setAsDefault(t,e)}),t.on("click.yytBypass","#yyt-bypass-add-message",()=>{this._addMessage(t,e)}),t.on("click.yytBypass",".yyt-bypass-delete-message",s=>{let r=e(s.currentTarget).closest(".yyt-bypass-message"),o=r.data("messageId");r.remove()}),t.on("change.yytBypass",".yyt-bypass-message-enabled",s=>{e(s.currentTarget).closest(".yyt-bypass-message").toggleClass("yyt-disabled",!e(s.currentTarget).is(":checked"))})},_bindFileEvents(t,e){t.on("click.yytBypass","#yyt-bypass-import",()=>{t.find("#yyt-bypass-import-file").click()}),t.on("change.yytBypass","#yyt-bypass-import-file",async s=>{let r=s.target.files[0];if(r){try{let o=await dt(r),a=j.importPresets(o);_(a.success?"success":"error",a.message),a.success&&this.renderTo(t)}catch(o){_("error",`\u5BFC\u5165\u5931\u8D25: ${o.message}`)}e(s.target).val("")}}),t.on("click.yytBypass","#yyt-bypass-export",()=>{try{let s=j.exportPresets();ct(s,`bypass_presets_${Date.now()}.json`),_("success","\u9884\u8BBE\u5DF2\u5BFC\u51FA")}catch(s){_("error",`\u5BFC\u51FA\u5931\u8D25: ${s.message}`)}})},_selectPreset(t,e,s){let r=j.getPreset(s);r&&(t.find(".yyt-bypass-preset-item").removeClass("yyt-active"),t.find(`.yyt-bypass-preset-item[data-preset-id="${s}"]`).addClass("yyt-active"),t.find(".yyt-bypass-editor").html(this._renderEditor(r)))},_createNewPreset(t,e){let s=`bypass_${Date.now()}`,r=j.createPreset({id:s,name:"\u65B0 Ai \u6307\u4EE4\u9884\u8BBE",description:"",messages:[]});r.success?(this.renderTo(t),this._selectPreset(t,e,s),_("success","\u9884\u8BBE\u5DF2\u521B\u5EFA")):_("error",r?.message||"\u521B\u5EFA\u9884\u8BBE\u5931\u8D25")},_saveCurrentPreset(t,e){let s=t.find(".yyt-bypass-editor-content"),r=s.data("presetId");if(!r)return;let o=s.find(".yyt-bypass-name-input").val().trim(),a=s.find(".yyt-bypass-description-input").val().trim();if(!o){_("warning","\u8BF7\u8F93\u5165\u9884\u8BBE\u540D\u79F0");return}let n=[];s.find(".yyt-bypass-message").each(function(){let l=e(this);n.push({id:l.data("messageId"),role:l.find(".yyt-bypass-role-select").val(),content:l.find(".yyt-bypass-message-content").val(),enabled:l.find(".yyt-bypass-message-enabled").is(":checked"),deletable:!0})});let i=j.updatePreset(r,{name:o,description:a,messages:n});i.success?(_("success","\u9884\u8BBE\u5DF2\u4FDD\u5B58"),this._refreshPresetList(t,e)):_("error",i?.message||"\u4FDD\u5B58\u9884\u8BBE\u5931\u8D25")},_deleteCurrentPreset(t,e){let r=t.find(".yyt-bypass-editor-content").data("presetId");if(!r||!confirm("\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u4E2A\u9884\u8BBE\u5417\uFF1F"))return;let o=j.deletePreset(r);o.success?(this.renderTo(t),_("success","\u9884\u8BBE\u5DF2\u5220\u9664")):_("error",o?.message||"\u5220\u9664\u9884\u8BBE\u5931\u8D25")},_duplicateCurrentPreset(t,e){let r=t.find(".yyt-bypass-editor-content").data("presetId");if(!r)return;let o=`bypass_${Date.now()}`,a=j.duplicatePreset(r,o);a.success?(this.renderTo(t),this._selectPreset(t,e,o),_("success","\u9884\u8BBE\u5DF2\u590D\u5236")):_("error",a?.message||"\u590D\u5236\u9884\u8BBE\u5931\u8D25")},_setAsDefault(t,e){let r=t.find(".yyt-bypass-editor-content").data("presetId");if(!r)return;j.setDefaultPresetId(r),this._refreshPresetList(t,e);let o=j.getPreset(r);o&&t.find(".yyt-bypass-editor").html(this._renderEditor(o)),_("success","\u5DF2\u8BBE\u4E3A\u9ED8\u8BA4\u9884\u8BBE")},_addMessage(t,e){let s=t.find(".yyt-bypass-messages"),r={id:`msg_${Date.now()}`,role:"SYSTEM",content:"",enabled:!0,deletable:!0};s.append(this._renderMessageItem(r))},_refreshPresetList(t,e){let s=j.getPresetList(),r=j.getDefaultPresetId(),o=this._getActivePresetId(t);t.find(".yyt-bypass-preset-list").html(s.map(a=>this._renderPresetItem(a,a.id===r)).join("")),o&&t.find(`.yyt-bypass-preset-item[data-preset-id="${o}"]`).addClass("yyt-active")},destroy(t){!D()||!B(t)||(ue(t,"yytBypassSelect"),t.off(".yytBypass"))},getStyles(){return`
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
        font-size: 12px;
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
    `},renderTo(t){let e=this.render({});t.html(e),this.bindEvents(t,{})}}});var Vi={};pe(Vi,{SettingsPanel:()=>gt,applyTheme:()=>Gi,applyUiPreferences:()=>Na,default:()=>Bu});function Es({id:t,checked:e=!1,title:s="",hint:r=""}){return`
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
  `}function Yi(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window}function yr(){return Yi()?.document||document}function qi(t=yr()){return t?.documentElement||document.documentElement}function Gi(t,e=yr()){let s=qi(e),r={...Lu,...Hi[t]||Hi["dark-blue"]};Object.entries(r).forEach(([o,a])=>{s.style.setProperty(o,a)}),s.setAttribute("data-yyt-theme",t)}function Na(t={},e=yr()){let s=qi(e),{theme:r="dark-blue",compactMode:o=!1,animationEnabled:a=!0}=t||{};Gi(r,e),s.classList.toggle("yyt-compact-mode",!!o),s.classList.toggle("yyt-no-animation",!a)}var Lu,Hi,gt,Bu,mo=U(()=>{fe();lr();dr();Te();Lu={"--yyt-accent":"#7bb7ff","--yyt-accent-glow":"rgba(123, 183, 255, 0.4)","--yyt-accent-soft":"rgba(123, 183, 255, 0.15)","--yyt-accent-strong":"#a5d4ff","--yyt-bg-base":"#0b0f15","--yyt-bg-gradient-1":"rgba(123, 183, 255, 0.12)","--yyt-bg-gradient-2":"rgba(155, 123, 255, 0.10)","--yyt-surface":"rgba(255, 255, 255, 0.03)","--yyt-surface-2":"rgba(255, 255, 255, 0.05)","--yyt-surface-3":"rgba(255, 255, 255, 0.075)","--yyt-surface-hover":"rgba(255, 255, 255, 0.08)","--yyt-surface-active":"rgba(255, 255, 255, 0.11)","--yyt-border":"rgba(255, 255, 255, 0.08)","--yyt-border-soft":"rgba(255, 255, 255, 0.05)","--yyt-border-strong":"rgba(255, 255, 255, 0.16)","--yyt-text":"rgba(255, 255, 255, 0.95)","--yyt-text-secondary":"rgba(255, 255, 255, 0.72)","--yyt-text-muted":"rgba(255, 255, 255, 0.5)","--yyt-focus-ring":"0 0 0 3px rgba(123, 183, 255, 0.18)","--yyt-on-accent":"#0b0f15","--yyt-control-bg":"linear-gradient(180deg, #1d2737 0%, #151d2a 100%)","--yyt-control-bg-hover":"linear-gradient(180deg, #243247 0%, #1a2638 100%)","--yyt-control-bg-active":"linear-gradient(180deg, #2a3951 0%, #1d2b3f 100%)","--yyt-control-bg-strong":"linear-gradient(180deg, #243247 0%, #192435 100%)","--yyt-control-bg-focus":"linear-gradient(180deg, #243a57 0%, #1a2a3f 100%)","--yyt-control-border":"rgba(146, 173, 212, 0.24)","--yyt-control-border-hover":"rgba(146, 173, 212, 0.36)","--yyt-control-border-focus":"rgba(123, 183, 255, 0.72)","--yyt-control-shadow":"0 12px 24px rgba(0, 0, 0, 0.24), inset 0 1px 0 rgba(255, 255, 255, 0.04)","--yyt-control-shadow-hover":"0 16px 28px rgba(0, 0, 0, 0.28), inset 0 1px 0 rgba(255, 255, 255, 0.06)","--yyt-control-shadow-focus":"0 18px 30px rgba(8, 14, 24, 0.32), inset 0 1px 0 rgba(255, 255, 255, 0.06)","--yyt-control-shadow-active":"0 10px 20px rgba(0, 0, 0, 0.22), inset 0 1px 0 rgba(255, 255, 255, 0.04)","--yyt-select-surface":"#121a26","--yyt-select-option-bg":"#192334","--yyt-select-option-hover-bg":"#233249","--yyt-select-option-selected-bg":"#2a3f60","--yyt-select-option-border":"rgba(123, 183, 255, 0.22)","--yyt-select-option-selected-border":"rgba(123, 183, 255, 0.4)","--yyt-select-dropdown-shadow":"0 24px 44px rgba(0, 0, 0, 0.52), 0 0 0 1px rgba(8, 12, 18, 0.82)","--yyt-select-arrow-color":"rgba(255, 255, 255, 0.52)"},Hi={"dark-blue":{"--yyt-on-accent":"#0b0f15"},"dark-purple":{"--yyt-accent":"#a78bfa","--yyt-accent-glow":"rgba(167, 139, 250, 0.4)","--yyt-accent-soft":"rgba(167, 139, 250, 0.15)","--yyt-accent-strong":"#c4b5fd","--yyt-bg-base":"#0f0b15","--yyt-bg-gradient-1":"rgba(167, 139, 250, 0.12)","--yyt-bg-gradient-2":"rgba(123, 183, 255, 0.10)","--yyt-on-accent":"#120b1f"},"dark-green":{"--yyt-accent":"#4ade80","--yyt-accent-glow":"rgba(74, 222, 128, 0.4)","--yyt-accent-soft":"rgba(74, 222, 128, 0.15)","--yyt-accent-strong":"#86efac","--yyt-bg-base":"#0b150f","--yyt-bg-gradient-1":"rgba(74, 222, 128, 0.12)","--yyt-bg-gradient-2":"rgba(123, 183, 255, 0.10)","--yyt-on-accent":"#0b150f"},light:{"--yyt-accent":"#3b82f6","--yyt-accent-glow":"rgba(59, 130, 246, 0.3)","--yyt-accent-soft":"rgba(59, 130, 246, 0.1)","--yyt-accent-strong":"#93c5fd","--yyt-bg-base":"#f8fafc","--yyt-bg-gradient-1":"rgba(59, 130, 246, 0.08)","--yyt-bg-gradient-2":"rgba(139, 92, 246, 0.06)","--yyt-text":"rgba(15, 23, 42, 0.95)","--yyt-text-secondary":"rgba(15, 23, 42, 0.72)","--yyt-text-muted":"rgba(15, 23, 42, 0.52)","--yyt-surface":"rgba(255, 255, 255, 0.66)","--yyt-surface-2":"rgba(255, 255, 255, 0.86)","--yyt-surface-3":"rgba(255, 255, 255, 0.94)","--yyt-surface-hover":"rgba(255, 255, 255, 0.92)","--yyt-surface-active":"rgba(255, 255, 255, 0.98)","--yyt-border":"rgba(15, 23, 42, 0.08)","--yyt-border-soft":"rgba(15, 23, 42, 0.05)","--yyt-border-strong":"rgba(15, 23, 42, 0.14)","--yyt-focus-ring":"0 0 0 3px rgba(59, 130, 246, 0.14)","--yyt-on-accent":"#0f172a","--yyt-control-bg":"linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(241, 245, 249, 0.98) 100%)","--yyt-control-bg-hover":"linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(226, 232, 240, 0.98) 100%)","--yyt-control-bg-active":"linear-gradient(180deg, rgba(239, 246, 255, 1) 0%, rgba(219, 234, 254, 0.98) 100%)","--yyt-control-bg-strong":"linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(241, 245, 249, 0.98) 100%)","--yyt-control-bg-focus":"linear-gradient(180deg, rgba(239, 246, 255, 1) 0%, rgba(219, 234, 254, 0.98) 100%)","--yyt-control-border":"rgba(59, 130, 246, 0.18)","--yyt-control-border-hover":"rgba(59, 130, 246, 0.28)","--yyt-control-border-focus":"rgba(59, 130, 246, 0.58)","--yyt-control-shadow":"0 10px 22px rgba(15, 23, 42, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.75)","--yyt-control-shadow-hover":"0 12px 24px rgba(15, 23, 42, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.85)","--yyt-control-shadow-focus":"0 14px 26px rgba(59, 130, 246, 0.14), inset 0 1px 0 rgba(255, 255, 255, 0.9)","--yyt-control-shadow-active":"0 8px 18px rgba(15, 23, 42, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.85)","--yyt-select-surface":"#ffffff","--yyt-select-option-bg":"#f8fafc","--yyt-select-option-hover-bg":"#eff6ff","--yyt-select-option-selected-bg":"#dbeafe","--yyt-select-option-border":"rgba(59, 130, 246, 0.16)","--yyt-select-option-selected-border":"rgba(59, 130, 246, 0.34)","--yyt-select-dropdown-shadow":"0 18px 32px rgba(15, 23, 42, 0.12), 0 0 0 1px rgba(148, 163, 184, 0.18)","--yyt-select-arrow-color":"rgba(15, 23, 42, 0.45)"}};gt={id:"settingsPanel",render(){let t=Ue.getSettings(),e=t.debug?.enableDebugLog===!0,s=t.automation?.enabled===!0,r=this._getAutomationRuntime();return`
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
          ${this._renderAutomationTab(t.automation,r)}
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
    `},_renderAutomationTab(t={},e=null){let s=t.enabled===!0,r=Array.isArray(e?.recentTransactions)?e.recentTransactions.slice().reverse():[],o=e?.hostBinding||{},a=Array.isArray(o.eventBindings)&&o.eventBindings.length>0?o.eventBindings.join(" / "):"\u6682\u65E0\u4E8B\u4EF6\u7ED1\u5B9A",n=r.length>0?r.map(i=>{let l=i?.results?.[0]?.meta?.writebackDetails?.refresh||{},c=Array.isArray(l?.requestMethods)?l.requestMethods.join(" / "):"",d=l?.eventSource||l?.eventName||c||l?.confirmedBy;return`
          <div class="yyt-settings-runtime-item">
            <div class="yyt-settings-runtime-meta">
              <span>${i?.sourceEvent||"UNKNOWN_EVENT"}</span>
              <span>${i?.phase||"unknown"}</span>
              <span>${i?.messageId||"no_message_id"}</span>
            </div>
            <div class="yyt-settings-runtime-main">${i?.verdict||i?.error||i?.generationKey||"\u65E0\u989D\u5916\u4FE1\u606F"}</div>
            ${d?`<div class="yyt-form-hint">\u5237\u65B0\uFF1A<code>${l?.eventSource||"unavailable"}</code> / <code>${l?.eventName||"MESSAGE_UPDATED"}</code>\uFF1B\u8BF7\u6C42\uFF1A<code>${c||"none"}</code>\uFF1B\u786E\u8BA4\uFF1A<code>${l?.confirmed?l?.confirmedBy||"success":"pending_or_failed"}</code>\uFF1B\u68C0\u67E5\uFF1A<code>${l?.confirmChecks||0}</code></div>`:""}
          </div>
        `}).join(""):'<div class="yyt-form-hint">\u6682\u65E0\u81EA\u52A8\u5316\u4E8B\u52A1\u8BB0\u5F55\u3002</div>';return`
      <div class="yyt-settings-tab-content" data-tab="automation">
        <div class="yyt-settings-section">
          <div class="yyt-settings-section-title">\u81EA\u52A8\u89E6\u53D1\u603B\u5F00\u5173</div>
          <div class="yyt-form-group">
            ${Es({id:"yyt-setting-automationEnabled",checked:t.enabled,title:"\u542F\u7528\u5DE5\u5177\u81EA\u52A8\u89E6\u53D1",hint:"\u8FD9\u91CC\u53EA\u4FDD\u7559\u4E00\u4E2A\u5168\u5C40\u5F00\u5173\u3002\u5F00\u542F\u540E\uFF0C\u6240\u6709\u5904\u4E8E\u201C\u989D\u5916 AI \u6A21\u578B\u89E3\u6790\u201D\u6A21\u5F0F\u7684\u5DE5\u5177\u90FD\u4F1A\u53C2\u4E0E\u81EA\u52A8\u89E6\u53D1\u3002"})}
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
            <div class="yyt-settings-runtime-chip ${o.initialized?"is-on":"is-off"}">\u76D1\u542C ${o.initialized?"\u5DF2\u7ED1\u5B9A":"\u672A\u7ED1\u5B9A"}</div>
            <div class="yyt-settings-runtime-chip is-neutral">\u5F85\u5904\u7406 ${e?.pendingTimerCount||0}</div>
            <div class="yyt-settings-runtime-chip is-neutral">\u6392\u961F\u69FD\u4F4D ${e?.queuedSlotCount||0}</div>
            <div class="yyt-settings-runtime-chip is-neutral">\u4E8B\u52A1 ${r.length}</div>
          </div>
          <div class="yyt-form-hint">\u4E8B\u4EF6\u6E90\uFF1A<code>${o.source||"unavailable"}</code>\uFF1B\u6700\u8FD1\u521D\u59CB\u5316\uFF1A<code>${o.lastInitResult||"idle"}</code>\uFF1B\u5C1D\u8BD5\u6B21\u6570\uFF1A<code>${o.initAttempts||0}</code>\u3002</div>
          <div class="yyt-form-hint">\u4E8B\u4EF6\u7ED1\u5B9A\uFF1A<code>${a}</code></div>
          ${o.lastError?`<div class="yyt-form-hint">\u6700\u8FD1\u9519\u8BEF\uFF1A<code>${o.lastError}</code></div>`:""}
          ${o.retryScheduled?`<div class="yyt-form-hint">\u5DF2\u5B89\u6392\u91CD\u8BD5\uFF1A<code>${o.retryDelayMs||0}ms</code></div>`:""}
          <div class="yyt-form-hint">\u82E5\u81EA\u52A8\u89E6\u53D1\u5931\u8D25\uFF0C\u4F18\u5148\u770B\u6700\u8FD1\u4E8B\u52A1\u7684 verdict\uFF0C\u4F8B\u5982 <code>automation_disabled</code>\u3001<code>no_auto_tools</code>\u3001<code>assistant_message_not_found</code>\u3002</div>
          <div class="yyt-settings-runtime-list">${n}</div>
        </div>
      </div>
    `},_renderDebugTab(t){return`
      <div class="yyt-settings-tab-content" data-tab="debug">
        <div class="yyt-settings-section">
          <div class="yyt-settings-section-title">\u65E5\u5FD7\u8BBE\u7F6E</div>
          <div class="yyt-form-group">
            ${Es({id:"yyt-setting-enableDebugLog",checked:t.enableDebugLog,title:"\u542F\u7528\u8C03\u8BD5\u65E5\u5FD7",hint:"\u5728\u63A7\u5236\u53F0\u8F93\u51FA\u8BE6\u7EC6\u7684\u8C03\u8BD5\u4FE1\u606F"})}
          </div>

          <div class="yyt-form-group">
            ${Es({id:"yyt-setting-saveExecutionHistory",checked:t.saveExecutionHistory,title:"\u4FDD\u5B58\u6267\u884C\u5386\u53F2",hint:"\u8BB0\u5F55\u5DE5\u5177\u6267\u884C\u5386\u53F2\uFF0C\u4FBF\u4E8E\u95EE\u9898\u6392\u67E5"})}
          </div>
        </div>

        <div class="yyt-settings-section">
          <div class="yyt-settings-section-title">UI \u663E\u793A</div>
          <div class="yyt-form-group">
            ${Es({id:"yyt-setting-showRuntimeBadge",checked:t.showRuntimeBadge,title:"\u663E\u793A\u8FD0\u884C\u72B6\u6001\u5FBD\u7AE0",hint:"\u5728\u5DE5\u5177\u5361\u7247\u4E0A\u663E\u793A\u8FD0\u884C\u72B6\u6001\u6307\u793A\u5668"})}
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
            ${Es({id:"yyt-setting-compactMode",checked:t.compactMode,title:"\u7D27\u51D1\u6A21\u5F0F",hint:"\u51CF\u5C11\u5361\u7247\u95F4\u8DDD\uFF0C\u663E\u793A\u66F4\u591A\u5185\u5BB9"})}
          </div>

          <div class="yyt-form-group">
            ${Es({id:"yyt-setting-animationEnabled",checked:t.animationEnabled,title:"\u542F\u7528\u52A8\u753B\u6548\u679C",hint:"\u754C\u9762\u8FC7\u6E21\u548C\u4EA4\u4E92\u52A8\u753B"})}
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
    `},_renderMacroList(){return We.getAvailableVariables().map(t=>`
        <div class="yyt-settings-macro-item">
          <code>${t.name}</code>
          <span>${t.description}</span>
        </div>
      `).join("")},bindEvents(t){let e=D();if(!e||!B(t))return;let s=this;t.off(".yytSettings"),t.on("click.yytSettings",".yyt-settings-tab",r=>{let o=e(r.currentTarget).data("tab");t.find(".yyt-settings-tab").removeClass("yyt-active"),e(r.currentTarget).addClass("yyt-active"),t.find(".yyt-settings-tab-content").removeClass("yyt-active"),t.find(`.yyt-settings-tab-content[data-tab="${o}"]`).addClass("yyt-active")}),t.on("click.yytSettings","#yyt-settings-save",()=>{s._saveSettings(t)}),t.on("click.yytSettings","#yyt-settings-reset",()=>{confirm("\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u8BBE\u7F6E\u4E3A\u9ED8\u8BA4\u503C\u5417\uFF1F")&&(Ue.resetSettings(),Na(ir.ui,yr()),s.renderTo(t),_("success","\u8BBE\u7F6E\u5DF2\u91CD\u7F6E"))}),Se(t,{namespace:"yytSettingsSelect",selectors:["#yyt-setting-queueStrategy","#yyt-setting-theme"]})},_saveSettings(t){let e={executor:{maxConcurrent:parseInt(t.find("#yyt-setting-maxConcurrent").val(),10)||3,maxRetries:parseInt(t.find("#yyt-setting-maxRetries").val(),10)||2,retryDelayMs:parseInt(t.find("#yyt-setting-retryDelayMs").val(),10)||5e3,requestTimeoutMs:parseInt(t.find("#yyt-setting-requestTimeoutMs").val(),10)||9e4,queueStrategy:t.find("#yyt-setting-queueStrategy").val()||"fifo"},automation:{enabled:t.find("#yyt-setting-automationEnabled").is(":checked"),settleMs:parseInt(t.find("#yyt-setting-automationSettleMs").val(),10)||1200,cooldownMs:parseInt(t.find("#yyt-setting-automationCooldownMs").val(),10)||5e3,maxConcurrentSlots:Ue.getSettings()?.automation?.maxConcurrentSlots||1},debug:{enableDebugLog:t.find("#yyt-setting-enableDebugLog").is(":checked"),saveExecutionHistory:t.find("#yyt-setting-saveExecutionHistory").is(":checked"),showRuntimeBadge:t.find("#yyt-setting-showRuntimeBadge").is(":checked")},ui:{theme:t.find("#yyt-setting-theme").val()||"dark-blue",compactMode:t.find("#yyt-setting-compactMode").is(":checked"),animationEnabled:t.find("#yyt-setting-animationEnabled").is(":checked")}};Ue.saveSettings(e),Na(e.ui,yr()),_("success","\u8BBE\u7F6E\u5DF2\u4FDD\u5B58")},_getAutomationRuntime(){try{return Yi()?.YouYouToolkit?.getAutomationRuntime?.()||null}catch{return null}},destroy(t){!D()||!B(t)||(ue(t,"yytSettingsSelect"),t.off(".yytSettings"))},getStyles(){return`
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
    `},renderTo(t){t.html(this.render({})),this.bindEvents(t,{})}},Bu=gt});function oe(t){return t==null?"":String(t).trim()}function _e(t){if(t!==void 0)try{return JSON.parse(JSON.stringify(t))}catch{return t}}function Ms(t={}){return{chatId:oe(t.chatId),sourceMessageId:oe(t.sourceMessageId||t.messageId),sourceSwipeId:oe(t.sourceSwipeId||t.effectiveSwipeId),effectiveSwipeId:oe(t.effectiveSwipeId||t.sourceSwipeId),slotBindingKey:oe(t.slotBindingKey),slotRevisionKey:oe(t.slotRevisionKey),slotTransactionId:oe(t.slotTransactionId),traceId:oe(t.traceId),resolvedAt:Number.isFinite(t.resolvedAt)?t.resolvedAt:Date.now()}}function La(t={}){return{resolvedAt:Number.isFinite(t.resolvedAt)?t.resolvedAt:Date.now(),runSource:oe(t.runSource)||at.MANUAL,traceId:oe(t.traceId),chatId:oe(t.chatId),sourceMessageId:oe(t.sourceMessageId||t.messageId),sourceSwipeId:oe(t.sourceSwipeId||t.effectiveSwipeId),effectiveSwipeId:oe(t.effectiveSwipeId||t.sourceSwipeId)||"swipe:current",slotBindingKey:oe(t.slotBindingKey),slotRevisionKey:oe(t.slotRevisionKey),slotTransactionId:oe(t.slotTransactionId),assistantContentFingerprint:oe(t.assistantContentFingerprint),assistantBaseFingerprint:oe(t.assistantBaseFingerprint),assistantText:String(t.assistantText||""),assistantBaseText:String(t.assistantBaseText||""),targetMessageIndex:Number.isFinite(t.targetMessageIndex)?t.targetMessageIndex:-1}}function gr(t){return!t||typeof t!="object"?null:{slotBindingKey:oe(t.slotBindingKey),slotRevisionKey:oe(t.slotRevisionKey),sourceMessageId:oe(t.sourceMessageId),sourceSwipeId:oe(t.sourceSwipeId),tables:Array.isArray(t.tables)?_e(t.tables):[],updatedAt:Number.isFinite(t.updatedAt)?t.updatedAt:0,meta:t.meta&&typeof t.meta=="object"?_e(t.meta):{}}}function ho(t={},e={}){let s=La(t);return{slotBindingKey:s.slotBindingKey,slotRevisionKey:s.slotRevisionKey,sourceMessageId:s.sourceMessageId,sourceSwipeId:s.sourceSwipeId||s.effectiveSwipeId,tables:Array.isArray(e.tables)?_e(e.tables):[],updatedAt:Number.isFinite(e.updatedAt)?e.updatedAt:Date.now(),meta:e.meta&&typeof e.meta=="object"?_e(e.meta):{}}}function vo(t){return!t||typeof t!="object"?{lastResolvedTarget:null,lastCommittedTarget:null,updatedAt:0}:{lastResolvedTarget:t.lastResolvedTarget?Ms(t.lastResolvedTarget):null,lastCommittedTarget:t.lastCommittedTarget?Ms(t.lastCommittedTarget):null,updatedAt:Number.isFinite(t.updatedAt)?t.updatedAt:0}}var bo,ks,at,pr,Is=U(()=>{bo="YouYouToolkit_tableState",ks="YouYouToolkit_tableBindings",at=Object.freeze({MANUAL:"MANUAL_TABLE",AUTO:"AUTO_TABLE"}),pr=Object.freeze({EXACT:"exact",BINDING_FALLBACK:"binding_fallback",TEMPLATE:"template",EMPTY:"empty"})});function z(t,e=""){return t==null?e:String(t).trim()||e}function zu(t,e=!1){return t==null?e:t===!0}function Uu(t){return Array.isArray(t)?_e(t):[]}function xo(t){if(t==null)return"";if(typeof t=="string")return t;try{return JSON.stringify(t,null,2)}catch{return String(t)}}function Wu(t,e="col"){return z(t,"").toLowerCase().replace(/[^a-z0-9]+/g,"_").replace(/^_+|_+$/g,"")||e}function Zi(t,e=new Set){let s=Wu(t,"col"),r=s,o=2;for(;e.has(r);)r=`${s}_${o}`,o+=1;return e.add(r),r}function ju(t=[]){let e=[],s=0;return t.forEach(r=>{let o=r&&typeof r=="object"?r:{},a=o.cells&&typeof o.cells=="object"&&!Array.isArray(o.cells)?o.cells:null,n=Array.isArray(o.cells)?o.cells:Array.isArray(o.values)?o.values:null;a&&Object.keys(a).forEach(i=>{e.includes(i)||e.push(i)}),n&&n.length>s&&(s=n.length)}),e.length>0?e.map(r=>({key:r,title:String(r)})):s>0?Array.from({length:s},(r,o)=>({key:`col_${o+1}`,title:`\u5217${o+1}`})):[]}function za(t,e=Rs){let s=z(t,e);return Xi.some(r=>r.value===s)?s:e}function Fu(t={},e=0,s=new Set){let r=t&&typeof t=="object"?t:{},o=z(r.title||r.name||r.label,`\u5217${e+1}`),a=z(r.key||r.id,""),n=Zi(a||o||`col_${e+1}`,s),i=[a,z(r.title,""),z(r.name,""),z(r.label,"")].filter(Boolean);return{key:n,title:o,description:z(r.description||r.note,""),type:za(r.type),required:r.required===!0,sourceKeys:i}}function Hu(t={},e={},s=0){let r=t.cells&&typeof t.cells=="object"&&!Array.isArray(t.cells)?t.cells:null,o=Array.isArray(t.cells)?t.cells:Array.isArray(t.values)?t.values:null;if(r){let a=[...Array.isArray(e.sourceKeys)?e.sourceKeys:[],e.key,e.title].filter(Boolean);for(let n of a)if(r[n]!==void 0)return xo(r[n])}return o&&o[s]!==void 0?xo(o[s]):""}function Yu(t={},e=[],s=0){let r=t&&typeof t=="object"?t:{},o={};return e.forEach((a,n)=>{o[a.key]=Hu(r,a,n)}),{name:z(r.name||r.title||r.label,`\u884C${s+1}`),cells:o}}function el(t={},e=0){let s=t&&typeof t=="object"?t:{},r=new Set,a=(Array.isArray(s.columns)&&s.columns.length>0?s.columns:ju(Array.isArray(s.rows)?s.rows:[])).map((i,l)=>Fu(i,l,r)),n=Array.isArray(s.rows)?s.rows.map((i,l)=>Yu(i,a,l)):[];return{name:z(s.name||s.title,`\u8868${e+1}`),note:z(s.note||s.description,""),columns:a.map(i=>({key:i.key,title:i.title,description:z(i.description,""),type:za(i.type),required:i.required===!0})),rows:n}}function tl(t={}){let e=t&&typeof t=="object"?t:{},s=Array.isArray(e.lastErrorDetails)?e.lastErrorDetails.map(o=>z(o,"")).filter(Boolean):[],r=e.lastValidationSummary&&typeof e.lastValidationSummary=="object"?{errorCount:Number.isFinite(e.lastValidationSummary.errorCount)?e.lastValidationSummary.errorCount:0,warningCount:Number.isFinite(e.lastValidationSummary.warningCount)?e.lastValidationSummary.warningCount:0}:{errorCount:0,warningCount:0};return{lastStatus:z(e.lastStatus,Ps.IDLE),lastRunAt:Number.isFinite(e.lastRunAt)?e.lastRunAt:0,lastDurationMs:Number.isFinite(e.lastDurationMs)?e.lastDurationMs:0,lastError:z(e.lastError,""),lastErrorDetails:s,lastValidationSummary:r,successCount:Number.isFinite(e.successCount)?e.successCount:0,errorCount:Number.isFinite(e.errorCount)?e.errorCount:0,lastSourceMessageId:z(e.lastSourceMessageId,""),lastSlotRevisionKey:z(e.lastSlotRevisionKey,""),lastLoadMode:z(e.lastLoadMode,""),lastMirrorApplied:e.lastMirrorApplied===!0}}function Ua(t=1,e=[]){let s=new Set((Array.isArray(e)?e:[]).map(o=>z(o?.key,"")).filter(Boolean));return{key:Zi(`col_${t}`,s),title:`\u5217${t}`,description:"",type:Rs,required:!1}}function qu(t=[],e=1){let s={};return(Array.isArray(t)?t:[]).forEach(r=>{let o=z(r?.key,"");o&&(s[o]="")}),{name:`\u884C${e}`,cells:s}}function sl(t=1){let e=Ua(1);return{name:`\u8868${t}`,note:"",columns:[e],rows:[qu([e],1)]}}function Gu(){return{tables:[]}}function rl(t=[]){return!Array.isArray(t)||t.length===0?Gu():{tables:t.map((e,s)=>el(e,s))}}function Vu(t={}){let e=t&&typeof t=="object"?t:{};return(Array.isArray(e.tables)?e.tables:[]).map((r,o)=>el(r,o))}function ol(t="",e={},s={}){let r=za(e?.type),o=String(t??"").trim(),a=z(s?.label,`${z(s?.tableName,"\u8868\u683C")} / ${z(s?.rowName,"\u884C")} / ${z(e?.title||e?.key,"\u5355\u5143\u683C")}`),n=[],i=[];if(e?.required===!0&&!o&&n.push(`${a} \u4E3A\u5FC5\u586B\uFF0C\u5F53\u524D\u4E3A\u7A7A\u3002`),!o)return{valid:n.length===0,errors:n,warnings:i};if(r==="number"&&!Number.isFinite(Number(o))&&n.push(`${a} \u9700\u8981\u586B\u5199\u6570\u5B57\u3002`),r==="boolean"&&!["true","false","1","0","yes","no"].includes(o.toLowerCase())&&n.push(`${a} \u9700\u8981\u586B\u5199\u5E03\u5C14\u503C\uFF08true / false\uFF09\u3002`),r==="date"&&Number.isNaN(Date.parse(o))&&n.push(`${a} \u9700\u8981\u586B\u5199\u53EF\u89E3\u6790\u7684\u65E5\u671F\u3002`),r==="json")try{JSON.parse(o)}catch(l){n.push(`${a} \u9700\u8981\u586B\u5199\u5408\u6CD5 JSON\uFF1A${l?.message||"\u89E3\u6790\u5931\u8D25"}`)}return{valid:n.length===0,errors:n,warnings:i}}function Ju(t={}){let s=Vu(t&&typeof t=="object"?t:{}),r=[];return s.forEach((o,a)=>{let n=z(o?.name,`\u8868${a+1}`),i=Array.isArray(o?.columns)?o.columns:[],l=Array.isArray(o?.rows)?o.rows:[];n||r.push(`\u8868 ${a+1} \u7F3A\u5C11\u540D\u79F0\u3002`),i.length===0&&r.push(`${n} \u81F3\u5C11\u9700\u8981\u4E00\u5217\u3002`);let c=new Set;i.forEach((d,u)=>{let y=z(d?.key,""),g=z(d?.title,`\u5217${u+1}`);if(!y){r.push(`${n} / ${g} \u7F3A\u5C11\u5185\u90E8\u540D\u3002`);return}if(c.has(y)){r.push(`${n} \u4E2D\u5B58\u5728\u91CD\u590D\u5217\u5185\u90E8\u540D\uFF1A${y}`);return}c.add(y)}),l.forEach((d,u)=>{let y=z(d?.name,`\u884C${u+1}`),g=d?.cells&&typeof d.cells=="object"&&!Array.isArray(d.cells)?d.cells:{};i.forEach((m,v)=>{let b=z(m?.key,""),S=z(m?.title||b,`\u5217${v+1}`),A=b?xo(g[b]):"",w=ol(A,m,{label:`${n} / ${y} / ${S}`,tableName:n,rowName:y});r.push(...w.errors)})})}),{valid:r.length===0,errors:r,tables:s}}function Cs({severity:t="error",message:e="",tableIndex:s=-1,tableName:r="",columnIndex:o=-1,columnKey:a="",rowIndex:n=-1,rowName:i="",cellKey:l=""}={}){return{severity:t,message:z(e,t==="warning"?"\u5B58\u5728\u8B66\u544A\u3002":"\u5B58\u5728\u9519\u8BEF\u3002"),tableIndex:s,tableName:z(r,""),columnIndex:o,columnKey:z(a,""),rowIndex:n,rowName:z(i,""),cellKey:z(l,"")}}function ft(t={}){let e=Ju(t),s=[];if(!e.valid)return{...e,warnings:[],issues:s,summary:{errorCount:e.errors.length,warningCount:0}};let r=Array.isArray(e.tables)?e.tables:[];r.forEach((n,i)=>{let l=z(n?.name,`\u8868${i+1}`),c=Array.isArray(n?.columns)?n.columns:[],d=Array.isArray(n?.rows)?n.rows:[],u=new Set;l||s.push(Cs({severity:"error",message:`\u8868 ${i+1} \u7F3A\u5C11\u540D\u79F0\u3002`,tableIndex:i,tableName:l})),c.forEach((y,g)=>{let m=z(y?.key,""),v=z(y?.title,`\u5217${g+1}`);m||s.push(Cs({severity:"error",message:`${l} / ${v} \u7F3A\u5C11\u5185\u90E8\u540D\u3002`,tableIndex:i,tableName:l,columnIndex:g,columnKey:m,cellKey:m})),m&&(u.has(m)&&s.push(Cs({severity:"error",message:`${l} \u4E2D\u5B58\u5728\u91CD\u590D\u5217\u5185\u90E8\u540D\uFF1A${m}`,tableIndex:i,tableName:l,columnIndex:g,columnKey:m,cellKey:m})),u.add(m))}),d.forEach((y,g)=>{let m=z(y?.name,`\u884C${g+1}`),v=y?.cells&&typeof y.cells=="object"&&!Array.isArray(y.cells)?y.cells:{};Object.keys(v).forEach(S=>{c.some(A=>z(A?.key,"")===S)||s.push(Cs({severity:"warning",message:`${l} / ${m} \u5305\u542B\u672A\u5B9A\u4E49\u5217 ${S}\uFF0C\u4FDD\u5B58\u540E\u4F1A\u88AB\u5FFD\u7565\u3002`,tableIndex:i,tableName:l,rowIndex:g,rowName:m,cellKey:S}))}),c.forEach((S,A)=>{let w=z(S?.key,""),M=z(S?.title||w,`\u5217${A+1}`),I=w?xo(v[w]):"",k=ol(I,S,{label:`${l} / ${m} / ${M}`,tableName:l,rowName:m});k.errors.forEach(N=>{s.push(Cs({severity:"error",message:N,tableIndex:i,tableName:l,columnIndex:A,columnKey:w,rowIndex:g,rowName:m,cellKey:w}))}),k.warnings.forEach(N=>{s.push(Cs({severity:"warning",message:N,tableIndex:i,tableName:l,columnIndex:A,columnKey:w,rowIndex:g,rowName:m,cellKey:w}))})})})});let o=s.filter(n=>n.severity!=="warning").map(n=>n.message),a=s.filter(n=>n.severity==="warning").map(n=>n.message);return{valid:o.length===0,errors:o,warnings:a,issues:s,tables:r,summary:{errorCount:o.length,warningCount:a.length}}}function al(){return{tables:[],promptTemplate:Ji,apiPreset:"",mirrorToMessage:!1,mirrorTag:"yyt-table-workbench",runtime:tl()}}function Ye(t={}){let e=al(),s=t&&typeof t=="object"?t:{};return{tables:Uu(s.tables),promptTemplate:z(s.promptTemplate,e.promptTemplate),apiPreset:z(s.apiPreset,""),mirrorToMessage:zu(s.mirrorToMessage,e.mirrorToMessage),mirrorTag:z(s.mirrorTag,e.mirrorTag),runtime:tl({...e.runtime,...s.runtime||{}})}}function Wa(t={}){let e=Ye(t),s=[];return Array.isArray(e.tables)||s.push("\u8868\u5B9A\u4E49\u5FC5\u987B\u662F JSON \u6570\u7EC4\u3002"),e.promptTemplate||s.push("\u586B\u8868 Prompt \u4E0D\u80FD\u4E3A\u7A7A\u3002"),e.mirrorTag||s.push("\u6B63\u6587\u955C\u50CF\u6807\u7B7E\u4E0D\u80FD\u4E3A\u7A7A\u3002"),{valid:s.length===0,errors:s,config:e}}function qe(){let t=Ba.get(Ka,al());return Ye(t)}function nl(t={}){let e=qe(),s=Ye({...e,...t||{},runtime:t?.runtime===void 0?e.runtime:t.runtime}),r=Wa(s);return r.valid?(Ba.set(Ka,r.config),{success:!0,config:r.config}):{success:!1,error:r.errors.join(`
`),errors:r.errors,config:r.config}}function fr(t={}){let e=qe(),s=Ye({...e,runtime:{...e.runtime,...t||{}}});return Ba.set(Ka,s),s.runtime}function Xu(t={}){let e=Ye(t);return`${z(e.promptTemplate,Ji)}

${Ku}`.trim()}function il(t={}){return{id:"tableWorkbench",name:"\u586B\u8868\u5DE5\u4F5C\u53F0",promptTemplate:Xu(t),bypass:{enabled:!1}}}function ll({apiPresets:t=[]}={}){let e=[{value:"",label:"\u5F53\u524D API \u914D\u7F6E"},...t.map(s=>({value:String(s?.name||""),label:String(s?.name||"")})).filter(s=>s.value)];return[{name:"tables",type:"tableDefinitions",label:"\u8868\u5B9A\u4E49",description:"\u901A\u8FC7\u7ED3\u6784\u5316\u7F16\u8F91\u5668\u7EF4\u62A4 tables\u3002\u9996\u6B21\u6267\u884C\u6216\u5F53\u524D\u6D88\u606F\u5C1A\u65E0\u7ED1\u5B9A state \u65F6\uFF0C\u4F1A\u4EE5\u7F16\u8BD1\u540E\u7684 tables \u4F5C\u4E3A merge base\u3002",emptyValue:[]},{name:"promptTemplate",type:"textarea",label:"\u586B\u8868 Prompt",rows:12,description:"\u53EF\u4F7F\u7528 {{lastUserMessage}}\u3001{{lastAiMessage}}\u3001{{chatHistory}}\u3001{{toolContentMacro}} \u7B49\u53D8\u91CF\u3002\u7CFB\u7EDF\u4F1A\u81EA\u52A8\u8FFD\u52A0 JSON \u8F93\u51FA\u7EA6\u675F\u3002"},{name:"apiPreset",type:"select",label:"API \u9884\u8BBE",description:"\u4E3A\u7A7A\u65F6\u4F7F\u7528\u5F53\u524D\u5168\u5C40 API \u914D\u7F6E\u3002",options:e},{name:"mirrorToMessage",type:"checkbox",label:"\u955C\u50CF\u5199\u56DE\u6B63\u6587",description:"\u628A\u5F53\u524D tables \u7684 JSON \u9884\u89C8\u955C\u50CF\u5230\u76EE\u6807 assistant \u6D88\u606F\u6B63\u6587\u4E2D\u3002"}]}var Ba,Ka,Ps,Ji,Ku,Xi,Rs,Qi,mr=U(()=>{Ne();Is();Ba=C.namespace("tableWorkbench"),Ka="config",Ps=Object.freeze({IDLE:"idle",RUNNING:"running",SUCCESS:"success",ERROR:"error"}),Ji=`\u8BF7\u6839\u636E\u5F53\u524D\u5BF9\u8BDD\u4E0E\u5F53\u524D\u8868\u683C\u57FA\u5E95\uFF0C\u66F4\u65B0\u7ED3\u6784\u5316 tables \u6570\u636E\u3002

\u8981\u6C42\uFF1A
1. \u53EA\u4F9D\u636E\u5F53\u524D\u5BF9\u8BDD\u5185\u5BB9\u66F4\u65B0\uFF0C\u4E0D\u8981\u81C6\u9020\u672A\u51FA\u73B0\u7684\u4FE1\u606F\u3002
2. \u4FDD\u6301\u539F\u6709\u8868\u7ED3\u6784\uFF1B\u6CA1\u6709\u4F9D\u636E\u65F6\u4FDD\u7559\u539F\u503C\u3002
3. \u5982\u679C\u67D0\u5B57\u6BB5\u9700\u8981\u6E05\u7A7A\uFF0C\u8BF7\u663E\u5F0F\u8F93\u51FA\u7A7A\u5B57\u7B26\u4E32\u3001\u7A7A\u6570\u7EC4\u6216 null\u3002
4. \u4F18\u5148\u53C2\u8003\u5F53\u524D assistant \u56DE\u590D\uFF1A{{lastAiMessage}}
5. \u5F53\u524D\u8868\u683C\u57FA\u5E95 JSON\uFF1A
{{toolContentMacro}}`,Ku=`\u8F93\u51FA\u8981\u6C42\uFF1A
- \u53EA\u8FD4\u56DE JSON
- \u4E0D\u8981\u9644\u52A0\u89E3\u91CA\u3001\u6807\u9898\u6216 Markdown
- JSON \u7ED3\u6784\u5FC5\u987B\u662F\uFF1A
{
  "tables": []
}`,Xi=Object.freeze([{value:"text",label:"\u6587\u672C"},{value:"number",label:"\u6570\u5B57"},{value:"boolean",label:"\u5E03\u5C14"},{value:"date",label:"\u65E5\u671F"},{value:"json",label:"JSON"}]),Rs="text",Qi=Object.freeze(Xi.map(t=>Object.freeze({...t})))});function kt(t=[],e=-1,s=-1){if(!Array.isArray(t))return[];if(!Number.isInteger(e)||!Number.isInteger(s)||e<0||s<0||e>=t.length||s>=t.length||e===s)return[...t];let r=[...t],[o]=r.splice(e,1);return r.splice(s,0,o),r}function br(t,e={},s={}){let r=Number.isInteger(s.size)?s.size:0,o=Number.isInteger(s.currentIndex)?s.currentIndex:-1,a=o<=0,n=o<0||o>=r-1,i=Object.entries(e).filter(([,l])=>Number.isInteger(l)).map(([l,c])=>`data-${l}="${c}"`).join(" ");return`
    <div class="yyt-table-editor-move-controls">
      <button type="button" class="yyt-btn yyt-btn-small yyt-btn-secondary" data-table-editor-action="move-${t}-up" ${i} ${a?"disabled":""}>
        <i class="fa-solid fa-arrow-up"></i>
      </button>
      <button type="button" class="yyt-btn yyt-btn-small yyt-btn-secondary" data-table-editor-action="move-${t}-down" ${i} ${n?"disabled":""}>
        <i class="fa-solid fa-arrow-down"></i>
      </button>
    </div>
  `}function Qu(t=Rs){return Qi.map(e=>`
    <option value="${x(e.value)}" ${e.value===t?"selected":""}>${x(e.label)}</option>
  `).join("")}function cl(t){if(t!==void 0)try{return JSON.parse(JSON.stringify(t))}catch{return t}}function yl(t=0,e=0){return!Number.isInteger(t)||t<=0||!Number.isInteger(e)||e<0?0:Math.min(e,t-1)}function ja(t={}){let e=t&&typeof t=="object"?t:{};return rl(Array.isArray(e.tables)?e.tables:[])}function Zu(t,e){if(t.type==="json"){let s=e===void 0?t.emptyValue:e;if(typeof s=="string")return s;try{return JSON.stringify(s??null,null,2)}catch{return String(s??"")}}return String(e??"")}function ey(t={},e=""){let s=String(t.name||"").trim(),r=`yyt-table-field-${s}`,o=`${r}-value`,a=`${r}-dropdown`,n=Cr(t.options||[]);return Pr({selectedValue:e,options:n,placeholder:n[0]?.label||"\u8BF7\u9009\u62E9",rootAttributes:{"data-table-custom-select":"true"},nativeAttributes:{class:"yyt-table-select-native",id:o,"data-table-field":s,"data-field-type":"select"},triggerAttributes:{id:r,"data-table-select-trigger":"true","aria-controls":a},dropdownAttributes:{id:a,"data-table-select-dropdown":"true"},optionAttributes:{"data-table-select-option":"true"}})}function ty(t={},e={},s=0){let r=t&&typeof t=="object"?t.cells:null;if(Array.isArray(r))return String(r[s]??"");if(r&&typeof r=="object"){if(r[e.key]!==void 0)return String(r[e.key]??"");if(r[e.title]!==void 0)return String(r[e.title]??"")}return""}function sy(t={}){return[Number.isInteger(t?.tableIndex)?t.tableIndex:-1,Number.isInteger(t?.rowIndex)?t.rowIndex:-1,Number.isInteger(t?.columnIndex)?t.columnIndex:-1,String(t?.cellKey||"")].join(":")}function ry(t={},e=6){let s=Array.isArray(t?.issues)?t.issues:[];if(!s.length)return"";let r=Number(t?.summary?.errorCount)||0,o=Number(t?.summary?.warningCount)||0,a=r>0?`\u53D1\u73B0 ${r} \u4E2A\u9519\u8BEF${o>0?`\uFF0C\u53E6\u6709 ${o} \u4E2A\u63D0\u793A`:""}`:`\u5F53\u524D\u6709 ${o} \u4E2A\u63D0\u793A`,n=s.slice(0,Math.max(1,e)).map(c=>`<li>${x(c?.message||"")}</li>`).join(""),i=s.length>e?`<li>\u8FD8\u6709 ${s.length-e} \u6761\u672A\u5C55\u5F00\uFF0C\u8BF7\u5148\u4FEE\u6B63\u4E0A\u9762\u8FD9\u4E9B\u3002</li>`:"";return`
    <div class="yyt-table-editor-validation-summary${r>0?"":" yyt-warning-only"}" data-table-validation-summary>
      <div class="yyt-table-editor-validation-title">${x(a)}</div>
      <ul class="yyt-table-editor-validation-list">${n}${i}</ul>
    </div>
  `}function is(t,e=null){let s=D();if(!s||!t?.length)return e;t.find("[data-table-validation-summary]").remove(),t.find(".yyt-table-cell-error").removeClass("yyt-table-cell-error"),t.find(".yyt-has-error").removeClass("yyt-has-error");let r=e||ft($s(t)),o=Array.isArray(r?.issues)?r.issues:[],a=new Set(o.filter(l=>l?.severity!=="warning").map(l=>sy(l))),n=new Set(o.filter(l=>l?.severity!=="warning").map(l=>`${l?.tableIndex??-1}:${l?.columnIndex??-1}`)),i=new Set(o.filter(l=>l?.severity!=="warning").map(l=>`${l?.tableIndex??-1}`));return o.length>0&&t.prepend(ry(r)),t.find("[data-table-editor-table]").each((l,c)=>{let d=s(c);i.has(`${l}`)&&d.addClass("yyt-has-error"),d.find("[data-table-editor-column]").each((u,y)=>{let g=s(y);n.has(`${l}:${u}`)&&(g.addClass("yyt-has-error"),g.find("[data-table-editor-column-title], [data-table-editor-column-key], [data-table-editor-column-type], [data-table-editor-column-description]").addClass("yyt-table-cell-error"))}),d.find("[data-table-editor-row]").each((u,y)=>{let g=s(y),m=!1;g.find("[data-table-editor-cell]").each((v,b)=>{let S=String(d.find(`[data-table-editor-column="${v}"] [data-table-editor-column-key]`).val()||"").trim(),A=[l,u,v,S].join(":");a.has(A)&&(m=!0,s(b).addClass("yyt-table-cell-error"))}),m&&g.addClass("yyt-has-error")})}),r}function oy(t={},e={},s=0,r=0){let o=Array.isArray(t.columns)?t.columns:[],a=br("row",{"table-index":s,"row-index":r},{currentIndex:r,size:o.length>=0&&Array.isArray(t.rows)?t.rows.length:0});return`
    <tr data-table-editor-row="${r}">
      <td>
        <input type="text" class="yyt-input" data-table-editor-row-name value="${x(String(e?.name||""))}" placeholder="\u53EF\u7559\u7A7A\uFF0C\u9ED8\u8BA4\u4F1A\u81EA\u52A8\u547D\u540D">
      </td>
      ${o.map((n,i)=>{let l=String(n?.key||"").trim();return`
        <td>
          <textarea class="yyt-textarea yyt-code-textarea-small"
                    data-table-editor-cell
                    data-column-index="${i}"
                    data-column-key="${x(l)}"
                    rows="2"
                    placeholder="${x(n.title||n.key||`\u5217${i+1}`)}">${x(ty(e,n,i))}</textarea>
        </td>
      `}).join("")}
      <td>
        <div class="yyt-table-editor-row-actions">
          ${a}
          <button type="button" class="yyt-btn yyt-btn-small yyt-btn-danger" data-table-editor-action="delete-row" data-table-index="${s}" data-row-index="${r}">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </td>
    </tr>
  `}function dl(t={},e=0,s={}){let r=Array.isArray(t.columns)?t.columns:[],o=Array.isArray(t.rows)?t.rows:[],a=String(t?.name||"").trim(),n=s.showDeleteTable!==!1,i=br("table",{"table-index":e},{currentIndex:e,size:Number.isInteger(s.totalTables)?s.totalTables:0}),l=n?`
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
          <input type="text" class="yyt-input" data-table-editor-table-name value="${x(String(t?.name||""))}" placeholder="\u8868\u683C\u540D\u79F0">
        </div>
        <div class="yyt-table-editor-input-group">
          <textarea class="yyt-textarea yyt-code-textarea-small" data-table-editor-table-note rows="2" placeholder="\u5907\u6CE8\uFF08\u53EF\u7559\u7A7A\uFF09">${x(String(t?.note||""))}</textarea>
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
                    <input type="text" class="yyt-input" data-table-editor-column-title value="${x(String(c?.title||""))}" placeholder="\u4F8B\u5982\uFF1A\u5C5E\u6027">
                  </td>
                  <td>
                    <input type="text" class="yyt-input" data-table-editor-column-key value="${x(String(c?.key||""))}" placeholder="\u53EF\u7559\u7A7A\u81EA\u52A8\u751F\u6210">
                  </td>
                  <td>
                    <select class="yyt-select" data-table-editor-column-type>
                      ${Qu(String(c?.type||Rs))}
                    </select>
                  </td>
                  <td>
                    <label class="yyt-table-editor-column-required yyt-table-editor-column-required-inline">
                      <input type="checkbox" data-table-editor-column-required ${c?.required===!0?"checked":""}>
                      <span>\u5FC5\u586B</span>
                    </label>
                  </td>
                  <td>
                    <input type="text" class="yyt-input" data-table-editor-column-description value="${x(String(c?.description||""))}" placeholder="\u53EF\u4E0D\u586B">
                  </td>
                  <td>
                    <div class="yyt-table-editor-column-actions">
                      ${br("column",{"table-index":e,"column-index":d},{currentIndex:d,size:r.length})}
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
                ${r.map((c,d)=>`<th>${x(c?.title||c?.key||`\u5217${d+1}`)}</th>`).join("")}
                <th></th>
              </tr>
            </thead>
            <tbody>
              ${o.length?o.map((c,d)=>oy(t,c,e,d)).join(""):`
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
  `}function pl(t={},e={}){let s=ja(t),r=Array.isArray(s?.tables)?s.tables:[],o=e.mode==="focused"?"focused":"full",a=yl(r.length,Number.parseInt(e.currentTableIndex,10));if(o==="focused"){let n=r[a]||null;return`
      <div class="yyt-table-editor-shell">
        ${n?dl(n,a,{totalTables:r.length}):`
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
        ${r.length?r.map((n,i)=>dl(n,i,{totalTables:r.length})).join(""):`
          <div class="yyt-table-editor-empty">\u8FD8\u6CA1\u6709\u8868\uFF0C\u5148\u65B0\u5EFA\u4E00\u5F20\u3002</div>
        `}
      </div>
    </div>
  `}function ay(t={},e={}){let s=String(t.name||"").trim(),r=x(t.label||s),o=t.description?`<div class="yyt-table-form-field-desc">${x(t.description)}</div>`:"",a=ja({tables:Array.isArray(e[s])?e[s]:[]});return`
    <div class="yyt-table-form-field" data-table-form-item="${x(s)}">
      <label>${r}</label>
      ${Fa(t,a,{description:o})}
    </div>
  `}function Fa(t={},e={},s={}){let r=String(t.name||"").trim(),o=typeof s.description=="string"?s.description:t.description?`<div class="yyt-table-form-field-desc">${x(t.description)}</div>`:"",a=s.mode==="focused"?"focused":"full",n=Number.parseInt(s.currentTableIndex,10);return`
    <div class="yyt-table-editor" data-table-field="${x(r)}" data-field-type="tableDefinitions" data-table-definition-root data-table-editor-mode="${a}" data-current-table-index="${Number.isInteger(n)?n:0}">
      ${pl(e,{mode:a,currentTableIndex:n})}
    </div>
    ${o}
  `}function gl(t=[],e={},s={}){let r=Array.isArray(t)?t:[],o=Array.isArray(s.includeFieldNames)?new Set(s.includeFieldNames.map(i=>String(i||"").trim()).filter(Boolean)):null,a=Array.isArray(s.excludeFieldNames)?new Set(s.excludeFieldNames.map(i=>String(i||"").trim()).filter(Boolean)):null,n=r.filter(i=>{let l=String(i?.name||"").trim();return!l||o&&!o.has(l)||a&&a.has(l)?!1:i.type!=="tableDefinitions"}).map(i=>ny(i,e)).join("");return n?`
    <div class="yyt-table-form-grid">
      ${n}
    </div>
  `:""}function ny(t={},e={}){let s=String(t.name||"").trim();if(!s)return"";if(t.type==="tableDefinitions")return ay(t,e);let r=e[s],o=x(t.label||s),a=t.description?`<div class="yyt-table-form-field-desc">${x(t.description)}</div>`:"",n=Number.isFinite(t.rows)?t.rows:6;return t.type==="checkbox"?`
      <div class="yyt-table-form-field" data-table-form-item="${x(s)}">
        <label class="yyt-table-form-inline-checkbox">
          <input type="checkbox" data-table-field="${x(s)}" data-field-type="checkbox" ${r===!0?"checked":""}>
          <span>${o}</span>
        </label>
        ${a}
      </div>
    `:t.type==="select"?`
      <div class="yyt-table-form-field" data-table-form-item="${x(s)}">
        <label for="yyt-table-field-${x(s)}">${o}</label>
        ${ey(t,r)}
        ${a}
      </div>
    `:`
    <div class="yyt-table-form-field" data-table-form-item="${x(s)}">
      <label for="yyt-table-field-${x(s)}">${o}</label>
      <textarea class="yyt-textarea yyt-code-textarea ${t.type==="json"?"":"yyt-code-textarea-small"}"
                id="yyt-table-field-${x(s)}"
                data-table-field="${x(s)}"
                data-field-type="${x(t.type||"textarea")}"
                rows="${n}">${x(Zu(t,r))}</textarea>
      ${a}
    </div>
  `}function $s(t){let e=D();return!e||!t?.length?{tables:[]}:{tables:t.find("[data-table-editor-table]").map((r,o)=>{let a=e(o),n=a.find("[data-table-editor-column]").map((l,c)=>{let d=e(c);return{title:String(d.find("[data-table-editor-column-title]").val()||""),key:String(d.find("[data-table-editor-column-key]").val()||""),description:String(d.find("[data-table-editor-column-description]").val()||""),type:String(d.find("[data-table-editor-column-type]").val()||Rs),required:d.find("[data-table-editor-column-required]").is(":checked")}}).get(),i=a.find("[data-table-editor-row]").map((l,c)=>{let d=e(c);return{name:String(d.find("[data-table-editor-row-name]").val()||""),cells:d.find("[data-table-editor-cell]").map((u,y)=>String(e(y).val()||"")).get()}}).get();return{name:String(a.find("[data-table-editor-table-name]").val()||""),note:String(a.find("[data-table-editor-table-note]").val()||""),columns:n,rows:i}}).get()}}function iy(t=[],e=1){return{name:`\u884C${e}`,cells:Array.from({length:Array.isArray(t)?t.length:0},()=>"")}}function nt(t,e={},s={}){let r=String(t.attr("data-table-editor-mode")||"").trim()==="focused"?"focused":"full",o=Number.parseInt(t.attr("data-current-table-index")||"0",10),a=ja(s),n=yl(Array.isArray(a.tables)?a.tables.length:0,o);t.attr("data-current-table-index",String(n)),t.html(pl(a,{mode:r,currentTableIndex:n}))}function fl(t,e=[],s={}){let r=D();if(!r||!B(t))return;let o=Array.isArray(e)?e:[],a=c=>{let d=String(c.attr("data-table-field")||"").trim();return o.find(u=>String(u?.name||"").trim()===d)||{name:d}},n=()=>{typeof s.onChange=="function"&&s.onChange()},i=(c={})=>{typeof s.onTableMutation=="function"&&s.onTableMutation(c)};t.off(".yytTableForm"),t.on("click.yytTableForm","[data-table-definition-root] [data-table-editor-action]",c=>{c.preventDefault();let d=r(c.currentTarget),u=String(d.attr("data-table-editor-action")||"").trim(),y=d.closest("[data-table-definition-root]");if(!y.length)return;let g=a(y),m=$s(y),v=Array.isArray(m.tables)?m.tables:[],b=Number.parseInt(d.attr("data-table-index")||"",10),S=Number.parseInt(d.attr("data-column-index")||"",10),A=Number.parseInt(d.attr("data-row-index")||"",10);if(u==="add-table"){let w=[...v,sl(v.length+1)];nt(y,g,{tables:w}),i({action:"add-table",tableIndex:w.length-1,draft:{tables:w}}),n();return}if(u==="delete-table"&&Number.isInteger(b)&&b>=0&&b<v.length){v.splice(b,1),nt(y,g,{tables:v}),i({action:"delete-table",tableIndex:b,draft:{tables:v}}),n();return}if(u==="move-table-up"&&Number.isInteger(b)){let w=kt(v,b,b-1);nt(y,g,{tables:w}),i({action:"move-table-up",tableIndex:b,nextTableIndex:Math.max(0,b-1),draft:{tables:w}}),n();return}if(u==="move-table-down"&&Number.isInteger(b)){let w=kt(v,b,b+1);nt(y,g,{tables:w}),i({action:"move-table-down",tableIndex:b,nextTableIndex:Math.min(w.length-1,b+1),draft:{tables:w}}),n();return}if(u==="add-column"&&Number.isInteger(b)&&b>=0&&b<v.length){let w=v[b]||{},M=Array.isArray(w.columns)?w.columns:[],I=Ua(M.length+1,M);w.columns=[...M,I],w.rows=(Array.isArray(w.rows)?w.rows:[]).map((k,N)=>({name:String(k?.name||`\u884C${N+1}`),cells:[...Array.isArray(k?.cells)?k.cells:[],""]}))}if(u==="delete-column"&&Number.isInteger(b)&&b>=0&&b<v.length){let w=v[b]||{},M=Array.isArray(w.columns)?w.columns:[];Number.isInteger(S)&&S>=0&&S<M.length&&(w.columns=M.filter((I,k)=>k!==S),w.rows=(Array.isArray(w.rows)?w.rows:[]).map((I,k)=>{let N=Array.isArray(I?.cells)?[...I.cells]:[];return N.splice(S,1),{name:String(I?.name||`\u884C${k+1}`),cells:N}}))}if(u==="move-column-up"&&Number.isInteger(b)&&Number.isInteger(S)&&b>=0&&b<v.length){let w=v[b]||{},M=Array.isArray(w.columns)?w.columns:[];w.columns=kt(M,S,S-1),w.rows=(Array.isArray(w.rows)?w.rows:[]).map((I,k)=>({name:String(I?.name||`\u884C${k+1}`),cells:kt(Array.isArray(I?.cells)?I.cells:[],S,S-1)})),nt(y,g,{tables:v}),n();return}if(u==="move-column-down"&&Number.isInteger(b)&&Number.isInteger(S)&&b>=0&&b<v.length){let w=v[b]||{},M=Array.isArray(w.columns)?w.columns:[];w.columns=kt(M,S,S+1),w.rows=(Array.isArray(w.rows)?w.rows:[]).map((I,k)=>({name:String(I?.name||`\u884C${k+1}`),cells:kt(Array.isArray(I?.cells)?I.cells:[],S,S+1)})),nt(y,g,{tables:v}),n();return}if(u==="add-row"&&Number.isInteger(b)&&b>=0&&b<v.length){let w=v[b]||{},M=Array.isArray(w.columns)?w.columns:[],I=Array.isArray(w.rows)?w.rows:[];w.rows=[...I,iy(M,I.length+1)]}if(u==="delete-row"&&Number.isInteger(b)&&b>=0&&b<v.length){let w=v[b]||{},M=Array.isArray(w.rows)?w.rows:[];Number.isInteger(A)&&A>=0&&A<M.length&&(w.rows=M.filter((I,k)=>k!==A))}if(u==="move-row-up"&&Number.isInteger(b)&&Number.isInteger(A)&&b>=0&&b<v.length){let w=v[b]||{};w.rows=kt(Array.isArray(w.rows)?w.rows:[],A,A-1),nt(y,g,{tables:v}),n();return}if(u==="move-row-down"&&Number.isInteger(b)&&Number.isInteger(A)&&b>=0&&b<v.length){let w=v[b]||{};w.rows=kt(Array.isArray(w.rows)?w.rows:[],A,A+1),nt(y,g,{tables:v}),n();return}nt(y,g,{tables:v}),is(y),n()}),t.on("input.yytTableForm","[data-table-definition-root] input, [data-table-definition-root] textarea",c=>{let d=r(c.currentTarget).closest("[data-table-definition-root]");d.length&&is(d),n()}),t.on("click.yytTableForm","[data-table-select-trigger]",c=>{c.preventDefault(),c.stopPropagation();let d=r(c.currentTarget),u=d.closest("[data-table-custom-select]"),y=u.hasClass("yyt-open");t.find("[data-table-custom-select].yyt-open").not(u).removeClass("yyt-open").find("[data-table-select-trigger]").attr("aria-expanded","false"),u.toggleClass("yyt-open",!y),d.attr("aria-expanded",String(!y))}),t.on("click.yytTableForm","[data-table-select-option]",c=>{c.preventDefault(),c.stopPropagation();let d=r(c.currentTarget),u=d.closest("[data-table-custom-select]"),y=String(d.attr("data-value")||""),g=d.find(".yyt-option-text").text();u.find(".yyt-table-select-native").val(y).trigger("change"),u.find(".yyt-select-value").text(g).attr("data-value",y).data("value",y),u.find("[data-table-select-option]").removeClass("yyt-selected").attr("aria-selected","false"),d.addClass("yyt-selected").attr("aria-selected","true"),u.removeClass("yyt-open"),u.find("[data-table-select-trigger]").attr("aria-expanded","false"),n()}),t.on("change.yytTableForm",'[data-table-field][data-field-type="select"]',()=>{n()}),t.on("blur.yytTableForm","[data-table-definition-root] [data-table-editor-cell], [data-table-definition-root] [data-table-editor-column-key], [data-table-definition-root] [data-table-editor-column-title], [data-table-definition-root] [data-table-editor-column-type], [data-table-definition-root] [data-table-editor-column-required]",c=>{let d=r(c.currentTarget).closest("[data-table-definition-root]");d.length&&is(d)}),t.on("change.yytTableForm","[data-table-definition-root] [data-table-editor-column-key], [data-table-definition-root] [data-table-editor-column-title]",c=>{let d=r(c.currentTarget).closest("[data-table-definition-root]");if(!d.length)return;let u=a(d);nt(d,u,$s(d)),n()});let l=zt();r(l).off("click.yytTableFormSelect").on("click.yytTableFormSelect",c=>{r(c.target).closest(t).length||t.find("[data-table-custom-select].yyt-open").removeClass("yyt-open").find("[data-table-select-trigger]").attr("aria-expanded","false")})}function ml(t){let e=D();!e||!B(t)||(t.off(".yytTableForm"),e(zt()).off("click.yytTableFormSelect"))}function Ha(t,e=[]){let s=Array.isArray(e)?e:[],r={},o=[];return s.forEach(a=>{let n=String(a?.name||"").trim();if(!n)return;let i=t.find(`[data-table-field="${n}"]`);if(!i.length)return;if(a.type==="tableDefinitions"){let c=ft($s(i));if(is(i,c),!c.valid){c.errors.forEach(d=>{o.push(`${a.label||n}\uFF1A${d}`)});return}r[n]=cl(c.tables);return}if(a.type==="checkbox"){r[n]=i.is(":checked");return}let l=String(i.val()||"");if(a.type==="json"){let c=l.trim();if(!c){r[n]=cl(a.emptyValue);return}try{r[n]=JSON.parse(c)}catch(d){o.push(`${a.label||n} \u4E0D\u662F\u5408\u6CD5 JSON\uFF1A${d?.message||String(d)}`)}return}r[n]=l}),{values:r,errors:o}}var ul,bl=U(()=>{Te();mr();ul=`
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
    background: linear-gradient(180deg, #1c2737 0%, #151e2c 100%);
    color: inherit;
    text-align: left;
    font: inherit;
    appearance: none;
    -webkit-appearance: none;
  }

  .yyt-table-form-field button.yyt-select-option:hover {
    background: linear-gradient(180deg, #243247 0%, #1a2638 100%);
    border-color: rgba(123, 183, 255, 0.22);
    transform: translateY(-1px);
  }

  .yyt-table-form-field button.yyt-select-option.yyt-selected {
    background: linear-gradient(135deg, rgba(123, 183, 255, 0.28) 0%, rgba(72, 119, 190, 0.22) 100%);
    border-color: rgba(123, 183, 255, 0.4);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06);
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
    gap: 12px;
  }

  .yyt-table-editor-shell-compact {
    gap: 12px;
  }


  .yyt-table-editor-toolbar,
  .yyt-table-editor-section-head,
  .yyt-table-editor-card-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    flex-wrap: wrap;
  }

  .yyt-table-editor-toolbar {
    padding: 0;
  }

  .yyt-table-editor-card-actions,
  .yyt-table-editor-row-actions,
  .yyt-table-editor-column-actions,
  .yyt-table-editor-move-controls {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
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
    padding: 10px 12px;
    border-radius: 14px;
    border: 1px dashed rgba(255, 255, 255, 0.12);
    background: rgba(255, 255, 255, 0.03);
    color: rgba(255, 255, 255, 0.64);
    font-size: 12px;
    line-height: 1.6;
  }

  .yyt-table-editor-validation-summary {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 12px 14px;
    border-radius: 16px;
    border: 1px solid rgba(255, 100, 100, 0.28);
    background: rgba(255, 100, 100, 0.08);
  }

  .yyt-table-editor-validation-summary.yyt-warning-only {
    border-color: rgba(255, 196, 87, 0.28);
    background: rgba(255, 196, 87, 0.08);
  }

  .yyt-table-editor-validation-title {
    font-size: 12px;
    font-weight: 800;
    color: var(--yyt-text);
  }

  .yyt-table-editor-validation-list {
    margin: 0;
    padding-left: 18px;
    display: flex;
    flex-direction: column;
    gap: 6px;
    color: rgba(255, 255, 255, 0.84);
    font-size: 12px;
    line-height: 1.6;
  }

  .yyt-table-editor-card.yyt-has-error,
  .yyt-table-editor-grid tr.yyt-has-error {
    border-color: rgba(255, 100, 100, 0.26);
  }

  .yyt-table-editor-grid tr.yyt-has-error td,
  .yyt-table-editor-grid tr.yyt-has-error th {
    background: rgba(255, 100, 100, 0.04);
  }

  .yyt-table-editor-grid textarea.yyt-table-cell-error,
  .yyt-table-editor-grid input.yyt-table-cell-error,
  .yyt-table-editor-grid select.yyt-table-cell-error,
  .yyt-table-editor-meta input.yyt-table-cell-error,
  .yyt-table-editor-meta textarea.yyt-table-cell-error {
    border-color: rgba(255, 100, 100, 0.55);
    box-shadow: 0 0 0 1px rgba(255, 100, 100, 0.14);
    background: rgba(255, 100, 100, 0.08);
  }

  .yyt-table-editor-card {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .yyt-table-editor-card-subtitle {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.6);
  }

  .yyt-table-editor-meta {
    display: grid;
    grid-template-columns: minmax(220px, 1fr) minmax(0, 1fr);
    gap: 10px;
  }

  .yyt-table-editor-section {
    display: flex;
    flex-direction: column;
    gap: 10px;
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

  .yyt-table-editor-grid-wrap {
    overflow-x: auto;
    border-radius: 14px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(8, 12, 18, 0.58);
  }

  .yyt-table-editor-grid {
    width: 100%;
    min-width: 680px;
    border-collapse: collapse;
    background: rgba(8, 12, 18, 0.84);
  }

  .yyt-table-editor-grid th,
  .yyt-table-editor-grid td {
    padding: 6px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    border-right: 1px solid rgba(255, 255, 255, 0.05);
    vertical-align: top;
  }

  .yyt-table-editor-grid th {
    text-align: left;
    font-size: 11px;
    color: rgba(255, 255, 255, 0.78);
    background: rgba(255, 255, 255, 0.05);
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
`});function ly(t={},e=-1){return[t?.sourceId,t?.messageId,t?.message_id,t?.id,t?.mid,t?.mesid,t?.mes_id,t?.chat_index,t?.index,e].map(s=>G(s))}function cy(t=[],e=""){let s=G(e);if(!s||!Array.isArray(t))return-1;for(let r=t.length-1;r>=0;r-=1){let o=t[r];if(ly(o,r).includes(s))return r}return-1}function wo(t={},e={}){let s=G(t?.sourceMessageId||t?.confirmedAssistantMessageId||t?.messageId);if(!s)return null;let r=La({resolvedAt:Date.now(),runSource:e.runSource||t?.runSource||at.MANUAL,traceId:t?.traceId||"",chatId:t?.chatId||"",sourceMessageId:s,sourceSwipeId:t?.sourceSwipeId||t?.effectiveSwipeId||"",effectiveSwipeId:t?.effectiveSwipeId||t?.sourceSwipeId||"swipe:current",slotBindingKey:t?.slotBindingKey||"",slotRevisionKey:t?.slotRevisionKey||"",slotTransactionId:t?.slotTransactionId||"",assistantContentFingerprint:t?.assistantContentFingerprint||"",assistantBaseFingerprint:t?.assistantBaseFingerprint||"",assistantText:t?.lastAiMessage||"",assistantBaseText:t?.assistantBaseText||"",targetMessageIndex:cy(t?.chatMessages||t?.chatHistory||[],s)});return!r.slotBindingKey||!r.slotRevisionKey?null:r}async function Ya({runSource:t=at.MANUAL}={}){let e=await Vt({runSource:t});return wo(e,{runSource:t})}async function dy({messageId:t,swipeId:e="",runSource:s=at.AUTO}={}){let r=await rr({messageId:t,swipeId:e,runSource:s});return wo(r,{runSource:s})}async function hl(t=null,e={}){let s=t||null;if(typeof e.resolveTarget=="function")return await e.resolveTarget(s);let r=G(e.runSource||s?.runSource)||at.MANUAL,o=G(e.messageId||s?.sourceMessageId),a=G(e.swipeId||s?.sourceSwipeId||s?.effectiveSwipeId);return e.useMessageTarget===!0||r===at.AUTO?o?dy({messageId:o,swipeId:a,runSource:r}):null:Ya({runSource:r})}function vl(t,e){let s=t||null,r=e||null;return!s||!r?{valid:!1,reason:"missing_target_snapshot"}:G(s.sourceMessageId)!==G(r.sourceMessageId)?{valid:!1,reason:"source_message_changed"}:G(s.sourceSwipeId||s.effectiveSwipeId)!==G(r.sourceSwipeId||r.effectiveSwipeId)?{valid:!1,reason:"source_swipe_changed"}:G(s.slotRevisionKey)!==G(r.slotRevisionKey)?{valid:!1,reason:"slot_revision_changed"}:{valid:!0,reason:"ok"}}var So=U(()=>{vs();Is()});function it(t){return t==null?"":String(t).trim()}function uy(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window}function yy(){try{let t=uy(),e=t?.SillyTavern||null,s=e?.getContext?.()||null,r=Array.isArray(s?.chat)?s.chat:[],o=Array.isArray(e?.chat)?e.chat:[],a=r.length?r:o;return{topWindow:t,api:e,context:s,chat:a,contextChat:r,apiChat:o}}catch{return{topWindow:null,api:null,context:null,chat:[],contextChat:[],apiChat:[]}}}function py(t){if(!t||t?.is_user===!0||t?.is_system===!0)return!1;let e=String(t?.role||"").trim().toLowerCase();return e==="assistant"||e==="ai"||!e}function gy(t=[],e=""){let s=it(e);if(!Array.isArray(t)||!s)return-1;for(let r=t.length-1;r>=0;r-=1){let o=t[r];if(!py(o))continue;if([o?.sourceId,o?.message_id,o?.messageId,o?.id,o?.mes_id,o?.mid,o?.mesid,o?.chat_index,o?.index,r].map(n=>it(n)).includes(s))return r}return-1}function qa(t){let e=yy(),s=gy(e.chat,t?.sourceMessageId);return s<0?{runtime:e,messageIndex:s,message:null}:{runtime:e,messageIndex:s,message:e.chat[s]||null}}function xl(t,e,s){let r=o=>{!Array.isArray(o)||e<0||e>=o.length||(o[e]={...o[e]||{},...s})};r(t?.contextChat),r(t?.apiChat)}async function wl(t){let e=t?.context||null,s=t?.api||null,r=e?.saveChatDebounced||s?.saveChatDebounced||null,o=e?.saveChat||s?.saveChat||null;typeof r=="function"&&r.call(e||s),typeof o=="function"&&await o.call(e||s)}function fy(t){let{message:e}=qa(t);return gr(e?.[bo])}function To(t,e={}){let s=fy(t);return s&&it(s.slotRevisionKey)===it(t?.slotRevisionKey)?{loadMode:pr.EXACT,mergeBaseOnly:!1,state:s}:s&&it(s.slotBindingKey)===it(t?.slotBindingKey)?{loadMode:pr.BINDING_FALLBACK,mergeBaseOnly:!0,state:gr({...s,slotRevisionKey:it(t?.slotRevisionKey)||s.slotRevisionKey,sourceSwipeId:it(t?.sourceSwipeId||t?.effectiveSwipeId)||s.sourceSwipeId,meta:{...s.meta||{},mergeBaseOnly:!0,fallbackFromBinding:!0,fallbackFromRevisionKey:it(s.slotRevisionKey),requestedRevisionKey:it(t?.slotRevisionKey)}})}:Array.isArray(e.templateTables)?{loadMode:pr.TEMPLATE,mergeBaseOnly:!1,state:ho(t,{tables:_e(e.templateTables),meta:{fromTemplate:!0}})}:{loadMode:pr.EMPTY,mergeBaseOnly:!1,state:ho(t)}}async function Sl(t){let{runtime:e,messageIndex:s,message:r}=qa(t);if(!r||s<0)return{success:!1,error:"target_message_not_found"};let o={...vo(r[ks]),lastResolvedTarget:Ms(t),updatedAt:Date.now()};return r[ks]=o,xl(e,s,r),await wl(e),{success:!0,bindings:o}}async function Tl(t,e,s={}){let r=s.skipFreshValidation===!0?t:await hl(t,s),o=s.skipFreshValidation===!0?{valid:!0,reason:"skipped"}:vl(t,r);if(!o.valid)return{success:!1,error:"target_changed_before_commit",validation:o};let a=r||t,{runtime:n,messageIndex:i,message:l}=qa(a);if(!l||i<0)return{success:!1,error:"target_message_not_found",validation:o};let c=gr({...ho(a),...e,slotBindingKey:a.slotBindingKey,slotRevisionKey:a.slotRevisionKey,sourceMessageId:a.sourceMessageId,sourceSwipeId:a.sourceSwipeId||a.effectiveSwipeId,updatedAt:Date.now()}),d={...vo(l[ks]),lastResolvedTarget:Ms(a),lastCommittedTarget:Ms(a),updatedAt:Date.now()};return l[bo]=c,l[ks]=d,xl(n,i,l),await wl(n),{success:!0,state:c,bindings:d,validation:o,messageIndex:i,sourceMessageId:a.sourceMessageId,slotRevisionKey:a.slotRevisionKey}}function _o(t=null){let e=$e.getAssistantMessageSnapshot(t);return e?.message?{...e,tableState:gr(e.message[bo]),tableBindings:vo(e.message[ks])}:null}var Ao=U(()=>{Jt();Is();So()});function Ga(t,e=""){return t==null?e:String(t).trim()||e}function by(t={}){return{tables:Array.isArray(t?.tables)?_e(t.tables):[]}}function hy(t={},e={}){let s=Ga(e.mirrorTag,"yyt-table-workbench"),r=by(t);return[`<${s}>`,"[\u586B\u8868\u5DE5\u4F5C\u53F0]","```json",JSON.stringify(r,null,2),"```",`</${s}>`].join(`
`)}async function _l({targetSnapshot:t,nextTables:e,config:s,loadResult:r=null}={}){let o=Ye(s),a=await Tl(t,{tables:Array.isArray(e)?_e(e):[],meta:{lastLoadMode:Ga(r?.loadMode,""),mergeBaseOnly:!1,updatedBy:Ga(t?.runSource,"MANUAL_TABLE")}});if(!a?.success)return{success:!1,error:a?.error||"table_state_commit_failed",commitResult:a,mirrorResult:null,warning:""};let n=null,i="";if(o.mirrorToMessage){let l=hy(a.state,{mirrorTag:o.mirrorTag});n=await $e.injectDetailed(my,l,{overwrite:!0,extractionSelectors:[o.mirrorTag],sourceMessageId:a.sourceMessageId,sourceSwipeId:t?.sourceSwipeId||t?.effectiveSwipeId,effectiveSwipeId:t?.effectiveSwipeId||t?.sourceSwipeId,slotBindingKey:t?.slotBindingKey,slotRevisionKey:t?.slotRevisionKey,slotTransactionId:t?.slotTransactionId,traceId:t?.traceId}),n?.success||(i=n?.error||"\u6B63\u6587\u955C\u50CF\u5199\u56DE\u5931\u8D25")}return{success:!0,state:a.state,bindings:a.bindings,commitResult:a,mirrorResult:n,warning:i}}var my,Al=U(()=>{Jt();Is();Ao();mr();my="tableWorkbenchMirror"});function Ge(t,e=""){return t==null?e:String(t).trim()||e}function El(t=[],e=8){return!Array.isArray(t)||t.length===0?"":t.slice(Math.max(t.length-e,0)).map(s=>`[${Ge(s?.role,"unknown")}] ${String(s?.content||"").trim()}`).filter(Boolean).join(`

`)}function vy(t,e){return{target:{sourceMessageId:Ge(t?.sourceMessageId),sourceSwipeId:Ge(t?.sourceSwipeId||t?.effectiveSwipeId),slotBindingKey:Ge(t?.slotBindingKey),slotRevisionKey:Ge(t?.slotRevisionKey),slotTransactionId:Ge(t?.slotTransactionId)},loadMode:Ge(e?.loadMode),mergeBaseOnly:e?.mergeBaseOnly===!0,tables:Array.isArray(e?.state?.tables)?_e(e.state.tables):[]}}function xy(t=""){let e=String(t||"").trim();if(!e)return[];let s=[],r=c=>{let d=String(c||"").trim();d&&(s.includes(d)||s.push(d))};(e.match(/```(?:json)?\s*([\s\S]*?)```/gi)||[]).forEach(c=>{let d=c.replace(/^```(?:json)?\s*/i,"").replace(/```$/i,"").trim();r(d)}),r(e);let a=e.indexOf("{"),n=e.lastIndexOf("}");a>=0&&n>a&&r(e.slice(a,n+1));let i=e.indexOf("["),l=e.lastIndexOf("]");return i>=0&&l>i&&r(e.slice(i,l+1)),s}function wy(t){if(Array.isArray(t))return t;if(t&&typeof t=="object"){if(Array.isArray(t.tables))return t.tables;if(t.data&&typeof t.data=="object"&&Array.isArray(t.data.tables))return t.data.tables}return null}function Sy(t=""){let e=xy(t),s=[];for(let r of e)try{let o=JSON.parse(r),a=wy(o);if(!Array.isArray(a)){s.push("JSON \u4E2D\u7F3A\u5C11 tables \u6570\u7EC4\u3002");continue}return{tables:_e(a),parsed:o}}catch(o){s.push(o?.message||String(o))}throw new Error(s[0]||"\u65E0\u6CD5\u4ECE\u6A21\u578B\u54CD\u5E94\u4E2D\u89E3\u6790 tables JSON\u3002")}async function Ty({executionContext:t,targetSnapshot:e,loadResult:s,config:r,assistantSnapshot:o}={}){let a=Ye(r),n=il(a),i=vy(e,s),l=Array.isArray(o?.tableState?.tables)?_e(o.tableState.tables):[],c={...t,toolName:"\u586B\u8868\u5DE5\u4F5C\u53F0",toolId:"tableWorkbench",lastAiMessage:t?.assistantBaseText||t?.lastAiMessage||"",recentMessagesText:El(t?.chatHistory||t?.chatMessages||[]),rawRecentMessagesText:El(t?.chatHistory||t?.chatMessages||[],20),injectedContext:o?.injectedContext||$e.getLatestMessageInjectedContext(e?.sourceMessageId),toolContentMacro:JSON.stringify(i,null,2),extractedContent:JSON.stringify(i,null,2),previousToolOutput:JSON.stringify(l,null,2)},d=await Xt.buildToolMessages(n,c),u=await Xt.buildPromptText(n,c);if(!Array.isArray(d)||d.length===0)throw new Error("\u586B\u8868\u8BF7\u6C42\u6D88\u606F\u6784\u5EFA\u5931\u8D25\u3002");return{toolConfig:n,context:c,requestPayload:i,promptText:u,messages:d}}async function _y(t,e={},s=null){let r=Ye(e),o=Ge(r.apiPreset,"");if(o){if(!zs(o))throw new Error(`API \u9884\u8BBE\u4E0D\u5B58\u5728: ${o}`);return Bo(o,t,{},s)}return Us(t,{},s)}async function Ml(t=null){let e=Ye(t||qe()),s=Wa(e),r=ft({tables:Array.isArray(e.tables)?e.tables:[]});if(!s.valid||!r.valid){let n=[...s.errors,...r.errors];return fr({lastStatus:Ps.ERROR,lastRunAt:Date.now(),lastDurationMs:0,lastError:n[0]||"\u586B\u8868\u914D\u7F6E\u65E0\u6548\u3002",lastErrorDetails:n,lastValidationSummary:r.summary||{errorCount:n.length,warningCount:0},errorCount:Number(e?.runtime?.errorCount)||0}),{success:!1,error:n.join(`
`),errors:n}}let o=e.runtime||{},a=Date.now();fr({lastStatus:Ps.RUNNING,lastError:"",lastErrorDetails:[],lastValidationSummary:r.summary||{errorCount:0,warningCount:0}});try{let n=await Vt({runSource:at.MANUAL}),i=wo(n,{runSource:at.MANUAL});if(!i)throw new Error("\u5F53\u524D\u6CA1\u6709\u53EF\u7528\u7684 assistant \u76EE\u6807\u697C\u5C42\u3002");let l=await Sl(i);if(!l?.success)throw new Error(l?.error||"\u76EE\u6807\u89E3\u6790\u8BB0\u5F55\u5931\u8D25");let c=_o(i.sourceMessageId),d=To(i,{templateTables:e.tables}),u=await Ty({executionContext:n,targetSnapshot:i,loadResult:d,config:e,assistantSnapshot:c}),y=await _y(u.messages,e),g=Sy(y),m=await _l({targetSnapshot:i,nextTables:g.tables,config:e,loadResult:d});if(!m?.success)throw new Error(m?.error||"\u7ED3\u6784\u5316\u5199\u56DE\u5931\u8D25");let v=Date.now()-a;return fr({lastStatus:Ps.SUCCESS,lastRunAt:Date.now(),lastDurationMs:v,lastError:"",lastErrorDetails:[],lastValidationSummary:r.summary||{errorCount:0,warningCount:0},successCount:(Number(o.successCount)||0)+1,errorCount:Number(o.errorCount)||0,lastSourceMessageId:Ge(i.sourceMessageId),lastSlotRevisionKey:Ge(i.slotRevisionKey),lastLoadMode:Ge(d.loadMode),lastMirrorApplied:m?.mirrorResult?.success===!0}),{success:!0,targetSnapshot:i,loadResult:d,request:u,responseText:y,parsed:g,state:m.state,bindings:m.bindings,mirrorResult:m.mirrorResult,warning:m.warning||""}}catch(n){let i=Date.now()-a;return fr({lastStatus:Ps.ERROR,lastRunAt:Date.now(),lastDurationMs:i,lastError:n?.message||String(n),lastErrorDetails:[n?.message||String(n)],lastValidationSummary:r.summary||{errorCount:0,warningCount:0},successCount:Number(o.successCount)||0,errorCount:(Number(o.errorCount)||0)+1}),{success:!1,error:n?.message||String(n),errors:[n?.message||String(n)]}}}var kl=U(()=>{vs();Jt();Ws();io();Is();So();Ao();mr();Al()});function hr(){return ll({apiPresets:wt()})}function Eo(t,e=""){return typeof t=="string"&&t.trim()?t.trim():e}function Pl(t){return Number.isFinite(t)&&t>0?new Date(t).toLocaleString():"\u672A\u8BB0\u5F55"}function Mo(t){try{return JSON.stringify(t,null,2)}catch{return String(t??"")}}function Ve(t=[],e=0){let s=Array.isArray(t)?t.length:0;return s<=0||!Number.isInteger(e)||e<0?0:Math.min(e,s-1)}function Ey(t=[],e=-1,s=-1){if(!Array.isArray(t))return[];if(!Number.isInteger(e)||!Number.isInteger(s)||e<0||s<0||e>=t.length||s>=t.length||e===s)return[...t];let r=[...t],[o]=r.splice(e,1);return r.splice(s,0,o),r}function My(t=[]){return(Array.isArray(t)?t:[]).find(e=>e?.type==="tableDefinitions")||{name:"tables",label:"\u8868\u5B9A\u4E49",description:""}}function Va(t,e={}){let s=D(),r=e&&typeof e=="object"?e:qe();if(!s||!B(t))return r;let o={...r,runtime:r.runtime||{}},a=t.find("[data-table-definition-root]");if(a.length){let c=$s(a);o.tables=Array.isArray(c?.tables)?c.tables:[]}let n=t.find('[data-table-field="promptTemplate"]');n.length&&(o.promptTemplate=String(n.val()||""));let i=t.find('[data-table-field="apiPreset"]');i.length&&(o.apiPreset=String(i.val()||""));let l=t.find('[data-table-field="mirrorToMessage"]');return l.length&&(o.mirrorToMessage=l.is(":checked")),o}function Rl(t={}){let e=Number(t?.summary?.errorCount)||0,s=Number(t?.summary?.warningCount)||0,r=Array.isArray(t?.issues)?t.issues:[],o=e>0?`\u5F53\u524D\u8868\u683C\u6709 ${e} \u4E2A\u9519\u8BEF${s>0?`\uFF0C\u53E6\u6709 ${s} \u4E2A\u63D0\u793A`:""}`:s>0?`\u5F53\u524D\u8868\u683C\u6709 ${s} \u4E2A\u63D0\u793A`:"\u5F53\u524D\u6570\u636E\u8D28\u91CF\u6B63\u5E38",a=r.slice(0,5).map(l=>`<li>${x(l?.message||"")}</li>`).join(""),n=r.length>5?`<li>\u8FD8\u6709 ${r.length-5} \u6761\uFF0C\u8BF7\u5148\u4FEE\u6B63\u4E0A\u9762\u8FD9\u4E9B\u3002</li>`:"";return`
    <div class="yyt-table-workbench-validation-card${e>0?" yyt-has-error":""}">
      <div class="yyt-table-workbench-panel-title">${x(o)}</div>
      ${r.length?`<ul class="yyt-table-workbench-validation-list">${a}${n}</ul>`:'<div class="yyt-table-workbench-muted">\u6CA1\u6709\u53D1\u73B0\u660E\u663E\u95EE\u9898\u3002</div>'}
    </div>
  `}function Ja(t){if(!D()||!B(t))return;let s=hr(),{values:r,errors:o}=Ha(t,s),a=t.find("[data-table-workbench-compiled-preview]");if(a.length){if(o.length>0){a.text(o.join(`
`));return}a.text(Mo(r.tables||[]))}}function ky(){return`
    <div class="yyt-table-workbench-header">
      <div class="yyt-table-workbench-header-actions">
        <button class="yyt-btn yyt-btn-secondary yyt-btn-small" data-table-workbench-action="save">
          <i class="fa-solid fa-save"></i> \u4FDD\u5B58
        </button>
        <button class="yyt-btn yyt-btn-primary yyt-btn-small" data-table-workbench-action="run">
          <i class="fa-solid fa-play"></i> \u7ACB\u5373\u586B\u8868
        </button>
      </div>
    </div>
  `}function Iy(t=[],e=0){let s=Ve(t,e);return`
    <div>
      <div class="yyt-table-workbench-sidebar-head">
        <button class="yyt-btn yyt-btn-small yyt-btn-secondary" data-table-workbench-action="add-table">
          <i class="fa-solid fa-plus"></i> \u65B0\u589E\u8868\u683C
        </button>
      </div>
      <div class="yyt-table-workbench-sidebar-list">
        ${t.length?t.map((r,o)=>{let a=Array.isArray(r?.columns)?r.columns.length:0,n=Array.isArray(r?.rows)?r.rows.length:0,i=String(r?.name||"").trim()||`\u8868\u683C ${o+1}`,l=String(r?.note||"").trim(),c=o===s;return`
            <div class="yyt-table-workbench-table-item ${c?"active":""}" data-table-workbench-select-table="${o}" role="button" tabindex="0" aria-pressed="${c?"true":"false"}">
              <div class="yyt-table-workbench-table-item-head">
                <div class="yyt-table-workbench-table-name">${x(i)}</div>
                ${br("table",{"table-index":o},{currentIndex:o,size:t.length})}
              </div>
            </div>
          `}).join(""):`
          <div class="yyt-table-workbench-empty-state">\u8FD8\u6CA1\u6709\u8868\uFF0C\u5148\u65B0\u5EFA\u4E00\u5F20\u3002</div>
        `}
      </div>
    </div>
  `}function Cy(t={},e=[],s=0){let r=My(e),o={tables:Array.isArray(t?.tables)?t.tables:[]},a=ft(o),n=Array.isArray(a?.tables)?a.tables:[],i=Ve(n,s),l=n[i]||null,c=Eo(l?.name,n.length?`\u8868\u683C ${i+1}`:"\u672A\u9009\u62E9");return Fa(r,o,{mode:"focused",currentTableIndex:i,description:""})}function Py(t={}){let e=t.runtime||{},s=Eo(e.lastStatus,"idle"),r=e.lastRunAt?Pl(e.lastRunAt):"\u672A\u8FD0\u884C",o=Number.isFinite(e.lastDurationMs)&&e.lastDurationMs>0?`${e.lastDurationMs} ms`:"\u672A\u8BB0\u5F55",a=e.lastValidationSummary||{},n=`${Number(a.errorCount)||0} \u4E2A\u9519\u8BEF / ${Number(a.warningCount)||0} \u4E2A\u63D0\u793A`,i=Eo(e.lastLoadMode,"\u672A\u8BB0\u5F55"),l=e.lastMirrorApplied===!0?"\u5DF2\u5199\u56DE\u6B63\u6587":"\u672A\u5199\u56DE\u6B63\u6587",c=Eo(e.lastError,"");return`
    <div class="yyt-tool-runtime-card">
      ${[{label:"\u5F53\u524D\u72B6\u6001",value:s,badge:!0},{label:"\u6700\u8FD1\u8FD0\u884C",value:r},{label:"\u8017\u65F6",value:o},{label:"\u6210\u529F / \u5931\u8D25",value:`${Number(e.successCount)||0} / ${Number(e.errorCount)||0}`},{label:"\u6700\u8FD1\u6821\u9A8C",value:n},{label:"\u6700\u8FD1\u8F7D\u5165\u6A21\u5F0F",value:i},{label:"\u6B63\u6587\u955C\u50CF",value:l}].map(u=>`
        <div class="yyt-tool-runtime-line${u.error?" yyt-tool-runtime-error":""}">
          <span class="yyt-tool-runtime-label">${x(u.label)}</span>
          ${u.badge?`<span class="yyt-tool-runtime-badge yyt-status-${x(u.value)}">${x(u.value)}</span>`:`<span class="yyt-tool-runtime-value">${x(u.value)}</span>`}
        </div>
      `).join("")}
      ${c?`
        <div class="yyt-tool-runtime-line yyt-tool-runtime-error">
          <span class="yyt-tool-runtime-label">\u6700\u8FD1\u9519\u8BEF</span>
          <span class="yyt-tool-runtime-value">${x(c)}</span>
        </div>
      `:""}
    </div>
  `}function Ry(t,e,s={}){let r=s.meta?`<div class="yyt-table-workbench-secondary-summary-meta">${s.meta}</div>`:"";return`
    <details class="yyt-table-workbench-secondary-item" ${s.open?"open":""}>
      <summary>
        <div class="yyt-table-workbench-secondary-summary-title">${x(t)}</div>
        ${r}
      </summary>
      <div class="yyt-table-workbench-secondary-body">
        ${e}
      </div>
    </details>
  `}function $y(t={}){let e={tables:Array.isArray(t?.tables)?t.tables:[]},s=ft(e),r=We.getVariableHelp(),o=Number(s?.summary?.errorCount)||0,a=Number(s?.summary?.warningCount)||0;return`
    <div class="yyt-table-workbench-secondary">
      ${Ry("\u66F4\u591A",`
          ${Rl(s)}
          <pre class="yyt-table-workbench-pre" data-table-workbench-compiled-preview>${x(Mo(s.tables||[]))}</pre>
          ${gl(hr(),t)}
          ${Py(t)}
          <div data-table-workbench-target class="yyt-table-workbench-empty-state">\u8BFB\u53D6\u76EE\u6807\u4E2D...</div>
          <div data-table-workbench-load class="yyt-table-workbench-empty-state">\u8BFB\u53D6\u8BCA\u65AD\u4E2D...</div>
          <pre class="yyt-table-workbench-pre" data-table-workbench-load-preview>\u8BFB\u53D6\u8F7D\u5165\u5185\u5BB9\u4E2D...</pre>
          <pre class="yyt-table-workbench-pre">${x(r)}</pre>
        `,{open:o>0,meta:`<span>${o} \u9519\u8BEF</span><span>${a} \u63D0\u793A</span>`})}
    </div>
  `}function Dy(t={},e=0){let s=hr(),r=Array.isArray(t?.tables)?t.tables:[],o=Ve(r,e);return`
    <div class="yyt-tool-panel yyt-table-workbench-shell" data-tool-id="tableWorkbench">
      ${ky(t,o)}
      <div class="yyt-table-workbench-primary">
        <div class="yyt-table-workbench-stack">
          ${Iy(r,o)}
        </div>
        <div class="yyt-table-workbench-stack">
          ${Cy(t,s,o)}
        </div>
      </div>
      ${$y(t)}
    </div>
  `}function Il(t=[]){return t.length?`
    <div class="yyt-table-workbench-detail-list">
      ${t.map(e=>`
        <div class="yyt-tool-runtime-line">
          <span class="yyt-tool-runtime-label">${x(e.label||"")}</span>
          <span class="yyt-tool-runtime-value">${x(e.value||"")}</span>
        </div>
      `).join("")}
    </div>
  `:'<div class="yyt-table-workbench-empty-state"><div class="yyt-table-workbench-muted">\u6682\u65E0\u53EF\u663E\u793A\u5185\u5BB9\u3002</div></div>'}async function Oy(t){if(!D()||!B(t))return;let s=qe(),r=t.find("[data-table-workbench-target]"),o=t.find("[data-table-workbench-load]"),a=t.find("[data-table-workbench-load-preview]");try{let n=await Ya();if(!B(t))return;if(!n){r.html('<div class="yyt-table-workbench-muted">\u5F53\u524D\u6CA1\u6709\u53EF\u7528\u7684 assistant \u76EE\u6807\u3002</div>'),o.html('<div class="yyt-table-workbench-muted">\u5C1A\u672A\u89E3\u6790\u5230\u53EF\u6267\u884C\u76EE\u6807\uFF0C\u56E0\u6B64\u4E0D\u4F1A\u52A0\u8F7D bound state\u3002</div>'),a.text(Mo(s.tables||[]));return}let i=_o(n.sourceMessageId),l=To(n,{templateTables:s.tables}),c=ft({tables:Array.isArray(l.state?.tables)?l.state.tables:[]}),d=i?.tableBindings||{},u=[{label:"sourceMessageId",value:n.sourceMessageId||"\u672A\u89E3\u6790"},{label:"sourceSwipeId",value:n.sourceSwipeId||n.effectiveSwipeId||"\u672A\u89E3\u6790"},{label:"slotBindingKey",value:n.slotBindingKey||"\u672A\u89E3\u6790"},{label:"slotRevisionKey",value:n.slotRevisionKey||"\u672A\u89E3\u6790"},{label:"slotTransactionId",value:n.slotTransactionId||"\u672A\u89E3\u6790"},{label:"lastResolvedTarget",value:d?.lastResolvedTarget?.slotRevisionKey||"\u672A\u8BB0\u5F55"},{label:"lastCommittedTarget",value:d?.lastCommittedTarget?.slotRevisionKey||"\u672A\u8BB0\u5F55"}],y=[{label:"loadMode",value:l.loadMode||"empty"},{label:"mergeBaseOnly",value:l.mergeBaseOnly===!0?"true":"false"},{label:"tables \u6570\u91CF",value:String(Array.isArray(l.state?.tables)?l.state.tables.length:0)},{label:"state updatedAt",value:Pl(l.state?.updatedAt)},{label:"\u6570\u636E\u8D28\u91CF",value:c.valid?c.summary?.warningCount>0?`0 \u4E2A\u9519\u8BEF / ${c.summary.warningCount} \u4E2A\u63D0\u793A`:"\u6B63\u5E38":`${c.summary?.errorCount||0} \u4E2A\u9519\u8BEF / ${c.summary?.warningCount||0} \u4E2A\u63D0\u793A`}];r.html(Il(u)),o.html(`${Il(y)}${Rl(c)}`),a.text(Mo(l.state?.tables||[]))}catch(n){if(!B(t))return;r.html(`<div class="yyt-table-workbench-muted">${x(n?.message||"\u76EE\u6807\u8BCA\u65AD\u5931\u8D25")}</div>`),o.html('<div class="yyt-table-workbench-muted">\u65E0\u6CD5\u751F\u6210\u52A0\u8F7D\u8BCA\u65AD\u3002</div>'),a.text("\u65E0\u6CD5\u8BFB\u53D6\u8F7D\u5165\u5185\u5BB9\u3002")}}function Cl(t,{silent:e=!1}={}){let s=hr(),{values:r,errors:o}=Ha(t,s);if(Ja(t),o.length>0)return he("warning",o.join(`
`),{duration:4e3,noticeId:"yyt-table-workbench-form-error"}),{success:!1,errors:o};let a=nl(r);return a.success?(e||_("success","\u586B\u8868\u5DE5\u4F5C\u53F0\u914D\u7F6E\u5DF2\u4FDD\u5B58"),a):(_("error",a.error||"\u4FDD\u5B58\u5931\u8D25"),a)}var Ay,ls,Xa=U(()=>{Te();es();bl();dr();Hs();mr();So();Ao();kl();Ay=`${As}
${ul}
  .yyt-table-workbench-shell {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .yyt-table-workbench-header {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    padding: 0;
  }

  .yyt-table-workbench-muted {
    font-size: 12px;
    line-height: 1.7;
    color: rgba(255, 255, 255, 0.7);
  }

  .yyt-table-workbench-header-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: flex-end;
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

  .yyt-table-workbench-primary {
    display: grid;
    grid-template-columns: minmax(240px, 280px) minmax(0, 1fr);
    gap: 16px;
    align-items: start;
  }

  .yyt-table-workbench-stack {
    display: flex;
    flex-direction: column;
    gap: 16px;
    min-width: 0;
  }

  .yyt-table-workbench-panel-copy {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-bottom: 12px;
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

  .yyt-table-workbench-sidebar-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .yyt-table-workbench-sidebar-head,
  .yyt-table-workbench-editor-head,
  .yyt-table-workbench-inline-actions,
  .yyt-table-workbench-table-item-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    flex-wrap: wrap;
  }

  .yyt-table-workbench-table-item {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 12px 14px;
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(255, 255, 255, 0.03);
    cursor: pointer;
    transition: all 0.18s ease;
  }

  .yyt-table-workbench-table-item:hover {
    border-color: rgba(123, 183, 255, 0.18);
    background: rgba(123, 183, 255, 0.07);
  }

  .yyt-table-workbench-table-item.active {
    border-color: rgba(123, 183, 255, 0.32);
    background: linear-gradient(180deg, rgba(123, 183, 255, 0.15) 0%, rgba(123, 183, 255, 0.08) 100%);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.05), 0 10px 24px rgba(18, 26, 40, 0.18);
  }

  .yyt-table-workbench-table-name {
    font-size: 13px;
    font-weight: 800;
    color: var(--yyt-text);
  }

  .yyt-table-workbench-table-note {
    font-size: 11px;
    line-height: 1.55;
    color: rgba(255, 255, 255, 0.62);
  }

  .yyt-table-workbench-table-order {
    font-size: 11px;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.56);
  }

  .yyt-table-workbench-table-stats {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }

  .yyt-table-workbench-stat-chip {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 5px 9px;
    border-radius: 999px;
    font-size: 10px;
    font-weight: 800;
    color: rgba(255, 255, 255, 0.82);
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(255, 255, 255, 0.06);
  }

  .yyt-table-workbench-editor-card {
    min-width: 0;
  }

  .yyt-table-workbench-empty-state {
    padding: 10px 12px;
    border-radius: 14px;
    border: 1px dashed rgba(255, 255, 255, 0.12);
    background: rgba(255, 255, 255, 0.03);
    color: rgba(255, 255, 255, 0.64);
    font-size: 12px;
    line-height: 1.6;
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

  .yyt-table-workbench-secondary {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .yyt-table-workbench-secondary-item {
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(255,255,255,0.03);
    overflow: hidden;
  }

  .yyt-table-workbench-secondary-item > summary {
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 14px 16px;
    cursor: pointer;
  }

  .yyt-table-workbench-secondary-item > summary::-webkit-details-marker {
    display: none;
  }

  .yyt-table-workbench-secondary-summary-copy {
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 0;
  }

  .yyt-table-workbench-secondary-summary-title {
    font-size: 13px;
    font-weight: 800;
    color: var(--yyt-text);
  }

  .yyt-table-workbench-secondary-summary-desc {
    font-size: 11px;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.64);
  }

  .yyt-table-workbench-secondary-summary-meta {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
    color: rgba(255, 255, 255, 0.66);
    font-size: 11px;
    font-weight: 700;
  }

  .yyt-table-workbench-secondary-body {
    padding: 0 16px 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .yyt-table-workbench-detail-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 14px 16px;
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(255, 255, 255, 0.03);
    min-height: 108px;
  }

  .yyt-table-workbench-validation-card {
    padding: 14px 16px;
    border-radius: 16px;
    border: 1px solid rgba(255, 196, 87, 0.22);
    background: rgba(255, 196, 87, 0.08);
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .yyt-table-workbench-validation-card.yyt-has-error {
    border-color: rgba(255, 100, 100, 0.26);
    background: rgba(255, 100, 100, 0.08);
  }

  .yyt-table-workbench-validation-list {
    margin: 0;
    padding-left: 18px;
    display: flex;
    flex-direction: column;
    gap: 6px;
    color: rgba(255, 255, 255, 0.84);
    font-size: 12px;
    line-height: 1.6;
  }

  @media (max-width: 1100px) {
    .yyt-table-workbench-primary {
      grid-template-columns: minmax(0, 1fr);
    }
  }
`;ls={id:"tableWorkbenchPanel",currentTableIndex:0,render({config:t}={}){let e=t&&typeof t=="object"?t:qe();return this.currentTableIndex=Ve(e.tables,this.currentTableIndex),Dy(e,this.currentTableIndex)},bindEvents(t){let e=D();if(!e||!B(t))return;let s=this;t.off(".yytTableWorkbench"),t.on("click.yytTableWorkbench",'[data-table-workbench-action="add-table"]',()=>{let r=t.find('[data-table-definition-root] [data-table-editor-action="add-table"]').first();r.length&&r.trigger("click")}),t.on("click.yytTableWorkbench",'[data-table-workbench-select-table] [data-table-editor-action^="move-table-"]',r=>{r.preventDefault(),r.stopPropagation();let o=e(r.currentTarget),a=String(o.attr("data-table-editor-action")||""),n=Number.parseInt(o.attr("data-table-index")||"-1",10),i=Va(t,qe()),l=Array.isArray(i.tables)?i.tables:[];if(!Number.isInteger(n)||n<0||n>=l.length)return;let c=a==="move-table-up"?n-1:n+1;i.tables=Ey(l,n,c),s.currentTableIndex=Ve(i.tables,c),s.renderTo(t,{config:i})}),t.on("click.yytTableWorkbench","[data-table-workbench-select-table]",r=>{if(e(r.target).closest("[data-table-editor-action]").length)return;let o=Number.parseInt(e(r.currentTarget).attr("data-table-workbench-select-table")||"0",10),a=Va(t,qe());s.currentTableIndex=Ve(a.tables,o),s.renderTo(t,{config:a})}),t.on("keydown.yytTableWorkbench","[data-table-workbench-select-table]",r=>{r.key!=="Enter"&&r.key!==" "||e(r.target).closest("[data-table-editor-action]").length||(r.preventDefault(),e(r.currentTarget).trigger("click"))}),t.on("click.yytTableWorkbench",'[data-table-workbench-action="save"]',()=>{let r=Cl(t,{silent:!1});r?.success&&(s.currentTableIndex=Ve(r.config?.tables,s.currentTableIndex),s.renderTo(t,{config:r.config}))}),t.on("click.yytTableWorkbench",'[data-table-workbench-action="refresh"]',()=>{s.renderTo(t)}),t.on("click.yytTableWorkbench",'[data-table-workbench-action="run"]',async()=>{if(Cl(t,{silent:!0}).success)try{let o=await Ml();o?.success?o.warning?he("warning",`\u586B\u8868\u5DF2\u5B8C\u6210\uFF0C\u4F46\u6B63\u6587\u955C\u50CF\u5931\u8D25\uFF1A${o.warning}`,{duration:4200,noticeId:"yyt-table-workbench-run-result"}):he("success","\u624B\u52A8\u586B\u8868\u5B8C\u6210",{duration:2800,noticeId:"yyt-table-workbench-run-result"}):he("warning",o?.error||"\u624B\u52A8\u586B\u8868\u5931\u8D25",{duration:4e3,noticeId:"yyt-table-workbench-run-result"})}catch(o){_("error",o?.message||"\u624B\u52A8\u586B\u8868\u5931\u8D25")}finally{s.renderTo(t)}})},destroy(t){!D()||!B(t)||(ml(t),t.off(".yytTableWorkbench"))},getStyles(){return Ay},renderTo(t,{config:e}={}){if(!D()||!B(t))return;let r=e&&typeof e=="object"?e:qe();this.currentTableIndex=Ve(r.tables,this.currentTableIndex),t.html(this.render({config:r})),fl(t,hr(),{onChange:()=>{Ja(t);let a=t.find("[data-table-definition-root]");a.length&&is(a)},onTableMutation:({action:a,tableIndex:n,nextTableIndex:i,draft:l})=>{let c=Va(t,r);if(c.tables=Array.isArray(l?.tables)?l.tables:c.tables,a==="add-table"){this.currentTableIndex=Ve(c.tables,n),this.renderTo(t,{config:c});return}if(a==="move-table-up"||a==="move-table-down"){this.currentTableIndex=Ve(c.tables,i),this.renderTo(t,{config:c});return}a==="delete-table"&&(this.currentTableIndex=Ve(c.tables,n),this.renderTo(t,{config:c}))}}),this.bindEvents(t,{}),Ja(t);let o=t.find("[data-table-definition-root]");o.length&&is(o),Oy(t)}}});var Yl={};pe(Yl,{ApiPresetPanel:()=>Tt,BypassPanel:()=>ns,EscapeTransformToolPanel:()=>os,PunctuationTransformToolPanel:()=>as,RegexExtractPanel:()=>Ft,SCRIPT_ID:()=>f,SettingsPanel:()=>gt,StatusBlockPanel:()=>ss,SummaryToolPanel:()=>ts,TableWorkbenchPanel:()=>ls,ToolManagePanel:()=>Gt,UIManager:()=>Js,YouyouReviewPanel:()=>rs,bindDialogEvents:()=>Vs,closeActiveCustomSelectDropdown:()=>Pe,closeCustomSelectDropdown:()=>Ys,createDialogHtml:()=>Gs,default:()=>Ly,destroyEnhancedCustomSelects:()=>ue,downloadJson:()=>ct,enhanceNativeSelects:()=>Se,escapeHtml:()=>x,fillFormWithConfig:()=>Rr,getAllStyles:()=>Hl,getFormApiConfig:()=>qs,getJQuery:()=>D,getTargetDocument:()=>zt,initUI:()=>$l,isContainerValid:()=>B,normalizeCustomSelectOptions:()=>Cr,openCustomSelectDropdown:()=>kn,readFileContent:()=>dt,registerComponents:()=>ko,renderApiPanel:()=>Dl,renderBypassPanel:()=>Wl,renderCustomSelectControl:()=>Pr,renderEscapeTransformToolPanel:()=>zl,renderPunctuationTransformToolPanel:()=>Ul,renderRegexPanel:()=>Ol,renderSettingsPanel:()=>jl,renderStatusBlockPanel:()=>Bl,renderSummaryToolPanel:()=>Ll,renderTableWorkbenchPanel:()=>Fl,renderToolPanel:()=>Nl,renderYouyouReviewPanel:()=>Kl,repositionActiveCustomSelectDropdown:()=>Xo,resetJQueryCache:()=>Zc,showToast:()=>_,showTopNotice:()=>he,toggleCustomSelectDropdown:()=>Ir,uiManager:()=>de});function ko(){de.register(Tt.id,Tt),de.register(Ft.id,Ft),de.register(Gt.id,Gt),de.register(ts.id,ts),de.register(ss.id,ss),de.register(rs.id,rs),de.register(os.id,os),de.register(as.id,as),de.register(ns.id,ns),de.register(gt.id,gt),de.register(ls.id,ls),console.log("[UI] \u7EC4\u4EF6\u6CE8\u518C\u5B8C\u6210")}function $l(t={}){let{autoInjectStyles:e=!0,targetDocument:s,...r}=t;de.init(r),ko(),e&&de.injectStyles(s),console.log("[UI] \u6A21\u5757\u521D\u59CB\u5316\u5B8C\u6210")}function Ny(){de.getComponent(Tt.id)||ko()}function Je(t,e,s={}){Ny(),de.render(t,e,s)}function Dl(t){Je(Tt.id,t)}function Ol(t){Je(Ft.id,t)}function Nl(t){Je(Gt.id,t)}function Ll(t){Je(ts.id,t)}function Bl(t){Je(ss.id,t)}function Kl(t){Je(rs.id,t)}function zl(t){Je(os.id,t)}function Ul(t){Je(as.id,t)}function Wl(t){Je(ns.id,t)}function jl(t){Je(gt.id,t)}function Fl(t){Je(ls.id,t)}function Hl(){return de.getAllStyles()}var Ly,ql=U(()=>{Qo();ea();ia();fa();Ia();Ca();Pa();$a();Da();Oa();mo();Xa();Te();Qo();ea();ia();fa();Ia();Ca();Pa();$a();Da();Oa();mo();Xa();Ly={uiManager:de,ApiPresetPanel:Tt,RegexExtractPanel:Ft,ToolManagePanel:Gt,SummaryToolPanel:ts,StatusBlockPanel:ss,YouyouReviewPanel:rs,EscapeTransformToolPanel:os,PunctuationTransformToolPanel:as,BypassPanel:ns,SettingsPanel:gt,TableWorkbenchPanel:ls,registerComponents:ko,initUI:$l,renderApiPanel:Dl,renderRegexPanel:Ol,renderToolPanel:Nl,renderSummaryToolPanel:Ll,renderStatusBlockPanel:Bl,renderYouyouReviewPanel:Kl,renderEscapeTransformToolPanel:zl,renderPunctuationTransformToolPanel:Ul,renderBypassPanel:Wl,renderSettingsPanel:jl,renderTableWorkbenchPanel:Fl,getAllStyles:Hl}});var Vl={};pe(Vl,{WindowManager:()=>Io,closeWindow:()=>Uy,createWindow:()=>zy,windowManager:()=>De});function Ky(){if(De.stylesInjected)return;De.stylesInjected=!0;let t=`
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
  `,e=document.createElement("style");e.id=By+"_styles",e.textContent=t,(document.head||document.documentElement).appendChild(e)}function zy(t){let{id:e,title:s="\u7A97\u53E3",content:r="",width:o=900,height:a=700,modal:n=!1,resizable:i=!0,maximizable:l=!0,startMaximized:c=!1,rememberState:d=!0,onClose:u,onReady:y}=t;Ky();let g=window.jQuery||window.parent?.jQuery;if(!g)return console.error("[WindowManager] jQuery not available"),null;if(De.isOpen(e))return De.bringToFront(e),De.getWindow(e);let m=window.innerWidth||1200,v=window.innerHeight||800,b=m<=1100,S=null,A=!1;d&&(S=De.getState(e),S&&!b&&(A=!0));let w,M;A&&S.width&&S.height?(w=Math.max(400,Math.min(S.width,m-40)),M=Math.max(300,Math.min(S.height,v-40))):(w=Math.max(400,Math.min(o,m-40)),M=Math.max(300,Math.min(a,v-40)));let I=Math.max(20,Math.min((m-w)/2,m-w-20)),k=Math.max(20,Math.min((v-M)/2,v-M-20)),N=l&&!b,te=`
    <div class="yyt-window" id="${e}" style="left:${I}px; top:${k}px; width:${w}px; height:${M}px;">
      <div class="yyt-window-header">
        <div class="yyt-window-title">
          <i class="fa-solid fa-window-maximize"></i>
          <span>${Wy(s)}</span>
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
  `,Y=null;n&&(Y=g(`<div class="yyt-window-overlay" data-for="${e}"></div>`),g(document.body).append(Y));let K=g(te);g(document.body).append(K),De.register(e,K),K.on("mousedown",()=>De.bringToFront(e));let ie=!1,X={left:I,top:k,width:w,height:M},ye=()=>{X={left:parseInt(K.css("left")),top:parseInt(K.css("top")),width:K.width(),height:K.height()},K.addClass("maximized"),K.find(".yyt-window-btn.maximize i").removeClass("fa-expand").addClass("fa-compress"),ie=!0},Xe=()=>{K.removeClass("maximized"),K.css({left:X.left+"px",top:X.top+"px",width:X.width+"px",height:X.height+"px"}),K.find(".yyt-window-btn.maximize i").removeClass("fa-compress").addClass("fa-expand"),ie=!1};K.find(".yyt-window-btn.maximize").on("click",()=>{ie?Xe():ye()}),(b&&l||A&&S.isMaximized&&l||c&&l)&&ye(),K.find(".yyt-window-btn.close").on("click",()=>{if(d&&l){let le={width:ie?X.width:K.width(),height:ie?X.height:K.height(),isMaximized:ie};De.saveState(e,le)}u&&u(),Y&&Y.remove(),K.remove(),De.unregister(e),g(document).off(".yytWindowDrag"+e),g(document).off(".yytWindowResize"+e)}),Y&&Y.on("click",le=>{le.target,Y[0]});let Q=!1,It,He,Ct,Pt;if(K.find(".yyt-window-header").on("mousedown",le=>{g(le.target).closest(".yyt-window-controls").length||ie||(Q=!0,It=le.clientX,He=le.clientY,Ct=parseInt(K.css("left")),Pt=parseInt(K.css("top")),g(document.body).css("user-select","none"))}),g(document).on("mousemove.yytWindowDrag"+e,le=>{if(!Q)return;let ee=le.clientX-It,mt=le.clientY-He;K.css({left:Math.max(0,Ct+ee)+"px",top:Math.max(0,Pt+mt)+"px"})}),g(document).on("mouseup.yytWindowDrag"+e,()=>{Q&&(Q=!1,g(document.body).css("user-select",""))}),i){let le=!1,ee="",mt,Ae,we,ce,Ds,Os;K.find(".yyt-window-resize-handle").on("mousedown",function(bt){ie||(le=!0,ee="",g(this).hasClass("se")?ee="se":g(this).hasClass("e")?ee="e":g(this).hasClass("s")?ee="s":g(this).hasClass("w")?ee="w":g(this).hasClass("n")?ee="n":g(this).hasClass("nw")?ee="nw":g(this).hasClass("ne")?ee="ne":g(this).hasClass("sw")&&(ee="sw"),mt=bt.clientX,Ae=bt.clientY,we=K.width(),ce=K.height(),Ds=parseInt(K.css("left")),Os=parseInt(K.css("top")),g(document.body).css("user-select","none"),bt.stopPropagation())}),g(document).on("mousemove.yytWindowResize"+e,bt=>{if(!le)return;let Rt=bt.clientX-mt,$t=bt.clientY-Ae,Ns=400,cs=300,ht=we,vt=ce,Sr=Ds,Tr=Os;if(ee.includes("e")&&(ht=Math.max(Ns,we+Rt)),ee.includes("s")&&(vt=Math.max(cs,ce+$t)),ee.includes("w")){let Dt=we-Rt;Dt>=Ns&&(ht=Dt,Sr=Ds+Rt)}if(ee.includes("n")){let Dt=ce-$t;Dt>=cs&&(vt=Dt,Tr=Os+$t)}K.css({width:ht+"px",height:vt+"px",left:Sr+"px",top:Tr+"px"})}),g(document).on("mouseup.yytWindowResize"+e,()=>{le&&(le=!1,g(document.body).css("user-select",""))})}return K.on("remove",()=>{g(document).off(".yytWindowDrag"+e),g(document).off(".yytWindowResize"+e)}),y&&setTimeout(()=>y(K),50),K}function Uy(t){let e=De.getWindow(t);if(e){let s=window.jQuery||window.parent?.jQuery;s&&(s(`.yyt-window-overlay[data-for="${t}"]`).remove(),s(document).off(".yytWindowDrag"+t),s(document).off(".yytWindowResize"+t)),e.remove(),De.unregister(t)}}function Wy(t){return typeof t!="string"?"":t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}var By,Gl,Io,De,Jl=U(()=>{Ne();By="youyou_toolkit_window_manager",Gl="window_states",Io=class{constructor(){this.windows=new Map,this.baseZIndex=1e4,this.topZIndex=1e4,this.stylesInjected=!1}register(e,s){this.topZIndex++,this.windows.set(e,{$el:s,zIndex:this.topZIndex}),s.css("z-index",this.topZIndex)}unregister(e){this.windows.delete(e)}bringToFront(e){let s=this.windows.get(e);s&&(this.topZIndex++,s.zIndex=this.topZIndex,s.$el.css("z-index",this.topZIndex))}getWindow(e){return this.windows.get(e)?.$el||null}isOpen(e){return this.windows.has(e)}closeAll(){this.windows.forEach((e,s)=>{e.$el&&e.$el.remove()}),this.windows.clear()}saveState(e,s){let r=this.loadStates();r[e]={...s,updatedAt:Date.now()},Ls.set(Gl,r)}loadStates(){return Ls.get(Gl)||{}}getState(e){return this.loadStates()[e]||null}},De=new Io});var sc={};pe(sc,{TX_PHASE:()=>Fe,ToolAutomationService:()=>Po,Transaction:()=>Co,default:()=>Vy,toolAutomationService:()=>tc});function V(t){return t==null?"":String(t).trim()}function en(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window}function Xl(){try{return en()?.SillyTavern||null}catch{return null}}function Ro(t){try{return t?.getContext?.()||null}catch{return null}}function Qa(t,e){if(!t)return null;let s=typeof t?.on=="function"||typeof t?.addListener=="function",r=typeof t?.off=="function"||typeof t?.removeListener=="function";return!s||!r?null:{eventSource:t,source:e,capabilities:{on:typeof t?.on=="function",off:typeof t?.off=="function",addListener:typeof t?.addListener=="function",removeListener:typeof t?.removeListener=="function"}}}function jy(t){let e=en(),s=Ro(t);return[Qa(t?.eventSource,"SillyTavern.eventSource"),Qa(e?.eventSource,"topWindow.eventSource"),Qa(s?.eventSource,"SillyTavern.getContext().eventSource")].filter(Boolean)[0]||{eventSource:null,source:"unavailable",capabilities:{on:!1,off:!1,addListener:!1,removeListener:!1}}}function Fy(t){let e=Ro(t);return t?.eventTypes||e?.eventTypes||en()?.event_types||{}}function Ql(t){let e=Ro(t);return V(e?.chatId??e?.chat_id??t?.chatId??t?.chat_id??t?.chat_filename??t?.this_chid??"chat_default")||"chat_default"}function Zl(t){let e=Ro(t);return Array.isArray(e?.chat)?e.chat:Array.isArray(t?.chat)?t.chat:[]}function ec(t){if(!t||t?.is_user===!0||t?.is_system===!0)return!1;let e=String(t?.role||"").trim().toLowerCase();return e==="user"||e==="system"?!1:e==="assistant"||e==="ai"||!e}function Hy(t,e){let s=V(e);if(!s)return null;let r=Zl(t);for(let o=r.length-1;o>=0;o-=1){let a=r[o];if([a?.messageId,a?.message_id,a?.id,a?.mesid,a?.mid,a?.chat_index,o].map(i=>V(i)).includes(s))return a||null}return null}function Yy(t){let e=Zl(t);if(!Array.isArray(e)||e.length===0)return null;let s=e.length-1,r=e[s]||null;if(!ec(r))return null;let o=V(r?.messageId??r?.message_id??r?.id??r?.mesid??r?.mid??r?.chat_index??s);return o?{messageId:o,swipeId:V(r?.swipeId??r?.swipe_id??r?.swipe??r?.swipeIndex),message:r}:null}function Za(t){if(!t)return"";let e=String(t).trim();return e=e.replace(/([a-z0-9])([A-Z])/g,"$1_$2"),e.toUpperCase()}function qy(t){let e=String(t||"");if(e.length===0)return"0";let s=5381,r=Math.min(e.length,2e3);for(let o=0;o<r;o++)s=(s<<5)+s+e.charCodeAt(o)|0;return(s>>>0).toString(36)}function Gy(){let t=Date.now().toString(36),e=Math.random().toString(36).slice(2,8);return`tx_${t}_${e}`}var Fe,Co,Po,tc,Vy,rc=U(()=>{lr();fe();Et();co();vs();Fe=Object.freeze({RECEIVED:"received",CONFIRMED:"confirmed",CONTEXT_BUILT:"context_built",REQUEST_STARTED:"request_started",REQUEST_FINISHED:"request_finished",WRITEBACK_STARTED:"writeback_started",WRITEBACK_COMMITTED:"writeback_committed",REFRESH_CONFIRMED:"refresh_confirmed",SKIPPED:"skipped",FAILED:"failed"}),Co=class{constructor({chatId:e,messageId:s,swipeId:r,sourceEvent:o,generationKey:a}){this.traceId=Gy(),this.chatId=e||"",this.messageId=s||"",this.swipeId=r||"",this.sourceEvent=o||"",this.generationKey=a||"",this.phase=Fe.RECEIVED,this.createdAt=Date.now(),this.updatedAt=Date.now(),this.verdict="",this.error=null,this.toolResults=[],this.writebackState=null,this.refreshState=null}transition(e,s={}){return this.phase=e,this.updatedAt=Date.now(),Object.assign(this,s),this}toSnapshot(){return{...this}}},Po=class{constructor(){this._stopCallbacks=[],this._pendingTimers=new Map,this._completedGenerationKeys=new Map,this._cancelledGenerationKeys=new Map,this._slotQueues=new Map,this._activeTransactions=new Map,this._isProcessing=!1,this._currentChatId="",this._enabled=!1,this._enabledCheckedOnce=!1,this.debugMode=!1,this._transactionHistory=[],this._maxHistorySize=30,this._hostBindingStatus={initialized:!1,initAttempts:0,lastInitAt:0,lastInitResult:"idle",source:"unavailable",hasEventSource:!1,hasEventTypes:!1,eventBindings:[],retryScheduled:!1,retryDelayMs:0,lastError:""},this._initRetryTimer=null,this._messageReceivedThrottleUntil=0}setDebugMode(e){this.debugMode=e===!0}init(e={}){this.stop();let s=Xl(),r=e.retryOnFailure!==!1,o=Number.isFinite(e.retryDelayMs)?e.retryDelayMs:1500,a=Number.isFinite(e.attempt)?e.attempt:1;if(this._hostBindingStatus.initAttempts=a,this._hostBindingStatus.lastInitAt=Date.now(),!s)return this._hostBindingStatus={...this._hostBindingStatus,initialized:!1,lastInitResult:"missing_api",source:"unavailable",hasEventSource:!1,hasEventTypes:!1,eventBindings:[],lastError:"\u672A\u627E\u5230\u5BBF\u4E3B API (SillyTavern)",retryScheduled:!1,retryDelayMs:0},this._log("\u521D\u59CB\u5316\u5931\u8D25: \u672A\u627E\u5230\u5BBF\u4E3B API (SillyTavern)"),!1;this._currentChatId=Ql(s);let n=jy(s),i=n?.eventSource||null,l=Fy(s),c=typeof i?.on=="function"?i.on.bind(i):typeof i?.addListener=="function"?i.addListener.bind(i):null,d=typeof i?.off=="function"?i.off.bind(i):typeof i?.removeListener=="function"?i.removeListener.bind(i):null,u=!!(l&&Object.keys(l).length>0);if(this._hostBindingStatus={...this._hostBindingStatus,source:n?.source||"unavailable",hasEventSource:!!i,hasEventTypes:u,eventBindings:[],lastError:"",retryScheduled:!1,retryDelayMs:0,initialized:!1,lastInitResult:"binding"},!c||!d){let m="\u5BBF\u4E3B eventSource \u7F3A\u5C11 on/off \u65B9\u6CD5";return this._hostBindingStatus={...this._hostBindingStatus,lastInitResult:"missing_event_source",lastError:m},this._log(`\u521D\u59CB\u5316\u5931\u8D25: ${m}`,{source:this._hostBindingStatus.source}),r&&this._scheduleInitRetry(o,a+1),!1}this._log("\u5BBF\u4E3B eventTypes \u6620\u5C04:",JSON.stringify(l,null,2));let y=(m,v)=>{if(!m||typeof v!="function")return;let b=m;c(b,v),this._hostBindingStatus.eventBindings=[...this._hostBindingStatus.eventBindings,`${b} -> ${Za(b)}`],this._stopCallbacks.push(()=>{try{d(b,v)}catch(S){this._log("\u53D6\u6D88\u4E8B\u4EF6\u5931\u8D25",b,S)}}),this._log(`\u5DF2\u7ED1\u5B9A\u5BBF\u4E3B\u4E8B\u4EF6: "${b}" (\u5F52\u4E00\u5316: ${Za(b)})`)},g=(m,...v)=>{let b=Za(m),{messageId:S,swipeId:A}=this._extractIdentitiesFromArgs(v);if(this._log(`\u6536\u5230\u5BBF\u4E3B\u4E8B\u4EF6 "${m}" \u2192 "${b}"`,{messageId:S,swipeId:A,argCount:v.length}),!this._checkEnabled())return;if(b==="MESSAGE_RECEIVED"){let N=Date.now();if(N<this._messageReceivedThrottleUntil){this._log(`MESSAGE_RECEIVED \u5728\u8282\u6D41\u7A97\u53E3\u5185\uFF0C\u8DF3\u8FC7\uFF08\u5269\u4F59 ${this._messageReceivedThrottleUntil-N}ms\uFF09`);return}this._messageReceivedThrottleUntil=N+3e3}let w=null,M=S,I=A;if(M&&(w=Hy(s,M)),!w){let N=Yy(s);N?.messageId&&(w=N.message,M=N.messageId,I=N.swipeId||I)}if(!M||!w){this._log(`\u4E8B\u4EF6 "${b}" \u65E0 assistant \u76EE\u6807\uFF0C\u8DF3\u8FC7`);return}if(!ec(w)){this._log(`\u4E8B\u4EF6 "${b}" \u547D\u4E2D\u975E assistant \u6D88\u606F\uFF0C\u8DF3\u8FC7`,{messageId:M});return}let k=String(w.content||w.mes||"").trim();if(!k||k.length<5){this._log(`\u4E8B\u4EF6 "${b}" \u6D88\u606F\u8FC7\u77ED\uFF08${k.length} \u5B57\u7B26\uFF09\uFF0C\u8DF3\u8FC7`);return}if(this._isProcessing){this._log(`\u4E8B\u4EF6 "${b}" \u6B63\u5728\u5904\u7406\u4E2D\uFF0C\u8DF3\u8FC7`);return}this._scheduleMessageProcessing(M,I,{settleMs:this._getSettleMs(),sourceEvent:b})};return y(l.MESSAGE_SENT||"message_sent",()=>{this._log("MESSAGE_SENT \u2192 \u6E05\u7406\u8C03\u5EA6\u961F\u5217"),this._pendingTimers.forEach(m=>clearTimeout(m)),this._pendingTimers.clear()}),y(l.MESSAGE_RECEIVED||"message_received",(...m)=>{g(l.MESSAGE_RECEIVED||"message_received",...m)}),y(l.GENERATION_ENDED||"generation_ended",(...m)=>{g(l.GENERATION_ENDED||"generation_ended",...m)}),y(l.CHAT_CHANGED||"chat_changed",()=>{this._resetForChatChange()}),y(l.MESSAGE_DELETED||"message_deleted",m=>{this._clearMessageState(V(m))}),this._stopCallbacks.push($.on(P.SETTINGS_UPDATED,()=>{let m=this._enabled;this._enabled=this._evaluateEnabled(),m!==this._enabled&&this._log(`\u81EA\u52A8\u5316\u72B6\u6001\u53D8\u66F4: ${m} \u2192 ${this._enabled}`)})),this._enabled=this._evaluateEnabled(),this._enabledCheckedOnce=!1,this._hostBindingStatus={...this._hostBindingStatus,initialized:!0,lastInitResult:"ready",retryScheduled:!1,retryDelayMs:0,lastError:""},this._log("\u81EA\u52A8\u5316\u670D\u52A1\u5DF2\u521D\u59CB\u5316",{enabled:this._enabled,chatId:this._currentChatId,source:this._hostBindingStatus.source}),!0}stop(){this._stopCallbacks.forEach(e=>{try{e()}catch(s){this._log("\u505C\u6B62\u56DE\u8C03\u5931\u8D25",s)}}),this._stopCallbacks=[],this._pendingTimers.forEach(e=>clearTimeout(e)),this._pendingTimers.clear(),this._slotQueues.clear(),this._completedGenerationKeys.clear(),this._cancelledGenerationKeys.clear(),this._cancelActiveTransactions("service_stopped"),this._activeTransactions.clear(),this._isProcessing=!1,this._enabled=!1,this._enabledCheckedOnce=!1,this._initRetryTimer&&(clearTimeout(this._initRetryTimer),this._initRetryTimer=null),this._hostBindingStatus={initialized:!1,initAttempts:0,lastInitAt:0,lastInitResult:"idle",source:"unavailable",hasEventSource:!1,hasEventTypes:!1,eventBindings:[],retryScheduled:!1,retryDelayMs:0,lastError:""}}isEnabled(){return this._enabled}getRuntimeSnapshot(){return this._pruneCompletedKeys(),this._pruneCancelledKeys(),{currentChatId:this._currentChatId,enabled:this._enabled,isProcessing:this._isProcessing,pendingTimerCount:this._pendingTimers.size,queuedSlotCount:this._slotQueues.size,completedGenerationKeyCount:this._completedGenerationKeys.size,cancelledGenerationKeyCount:this._cancelledGenerationKeys.size,activeTransactionCount:this._activeTransactions.size,recentTransactions:this._transactionHistory.slice(-10).map(e=>e.toSnapshot()),hostBinding:{...this._hostBindingStatus,eventBindings:Array.isArray(this._hostBindingStatus?.eventBindings)?[...this._hostBindingStatus.eventBindings]:[]},settings:this._getAutomationSettings()}}async processCurrentAssistantMessage(e={}){let s=await rr({messageId:"",swipeId:"",runSource:"AUTO"}),r=V(s?.sourceMessageId||s?.messageId);return r?this.processAssistantMessage(r,{force:e.force===!0,swipeId:V(s?.sourceSwipeId),sourceEvent:e.sourceEvent||"MANUAL_CURRENT_ASSISTANT"}):{success:!1,error:"\u672A\u627E\u5230\u5F53\u524D assistant \u697C\u5C42"}}async processAssistantMessage(e,{force:s=!1,swipeId:r="",sourceEvent:o="AUTO"}={}){let a=new Co({chatId:this._currentChatId,messageId:e,swipeId:r,sourceEvent:o});try{if(!e)return this._skipTransaction(a,"missing_message_id");if(!this._checkEnabled()&&!s)return this._skipTransaction(a,"automation_disabled");a.transition(Fe.CONFIRMED);let n=await rr({messageId:e,swipeId:r,runSource:"AUTO"}),i=n?.targetAssistantMessage||null;if(!i||!n?.sourceMessageId)return this._skipTransaction(a,"assistant_message_not_found");let l=String(i.content||i.mes||"").trim();if(!l||l.length<5)return this._skipTransaction(a,"assistant_message_too_short");a.transition(Fe.CONTEXT_BUILT);let c=qy(l),d=`${V(n.sourceMessageId)}::${c}`;if(a.generationKey=d,!s&&this._hasCompletedGeneration(d))return this._skipTransaction(a,"duplicate_generation",{generationKey:d});if(!s&&this._isGenerationCancelled(d))return this._skipTransaction(a,"cancelled_generation",{generationKey:d});let u=ot.filterAutoPostResponseTools(sr());if(!u.length)return this._skipTransaction(a,"no_auto_tools",{tools:u});let y=`${V(n.sourceMessageId)}::${V(n.sourceSwipeId||r)}`;return a.slotKey=y,a.slotRevisionKey=n.slotRevisionKey||"",a.sourceMessageId=n.sourceMessageId||e,a.sourceSwipeId=n.sourceSwipeId||r||"",this._enqueueSlot(y,async()=>{if(this._hasCompletedGeneration(d)&&!s)return this._skipTransaction(a,"duplicate_generation_after_queue",{generationKey:d});if(this._isGenerationCancelled(d)&&!s)return this._skipTransaction(a,"cancelled_generation_after_queue",{generationKey:d});this._isProcessing=!0,a.transition(Fe.REQUEST_STARTED);let g=new AbortController;this._registerActiveTransaction(a,{controller:g,generationKey:d,slotKey:y,sourceMessageId:n.sourceMessageId||e,sourceSwipeId:n.sourceSwipeId||r||""});try{let m=[],v=!1;for(let w of u){let M={...n,signal:g.signal,isAutoRun:!0,abortMeta:{traceId:a.traceId,generationKey:d,slotKey:y,sourceMessageId:n.sourceMessageId||e,sourceSwipeId:n.sourceSwipeId||r||""},shouldAbortWriteback:()=>this._shouldAbortAutoWriteback({traceId:a.traceId,generationKey:d}),input:{...n.input||{},lastAiMessage:n.lastAiMessage,assistantBaseText:n.assistantBaseText}},I=await ot.runToolPostResponse(w,M);m.push(I),(I?.writebackState||I?.output)&&(v=!0)}a.transition(Fe.REQUEST_FINISHED,{toolResults:m}),v&&(a.transition(Fe.WRITEBACK_STARTED),a.writebackState={messageId:n.sourceMessageId,swipeId:n.sourceSwipeId,hasOutput:!0}),this._markGenerationCompleted(d);let b=m.every(w=>w?.success!==!1),S=m.some(w=>w?.meta?.aborted===!0||w?.meta?.stale===!0||w?.error==="\u8BF7\u6C42\u5DF2\u53D6\u6D88");b&&a.transition(Fe.WRITEBACK_COMMITTED);let A=b?Fe.REFRESH_CONFIRMED:Fe.FAILED;return a.transition(A,{verdict:S?"aborted":b?"success":"partial_failure"}),this._recordTransaction(a),this._updateAutoRuntimeForResults(u,n,a,m),{success:b,traceId:a.traceId,generationKey:d,sourceEvent:o,messageId:n.sourceMessageId||e,phase:a.phase,results:m}}finally{this._unregisterActiveTransaction(a.traceId),this._isProcessing=!1}})}catch(n){return a.transition(Fe.FAILED,{error:n?.message||String(n)}),this._recordTransaction(a),this._unregisterActiveTransaction(a.traceId),this._isProcessing=!1,this._log("processAssistantMessage \u5F02\u5E38",n),{success:!1,traceId:a.traceId,error:a.error,phase:a.phase}}}_extractIdentitiesFromArgs(e){let s="",r="";for(let o of e)if(o!=null){if(typeof o=="number"&&Number.isFinite(o)&&!s){s=V(o);continue}if(typeof o=="string"){let a=V(o);!s&&/^\d+$/.test(a)&&(s=a);continue}typeof o=="object"&&(s||(s=V(o.messageId??o.message_id??o.id??o.mesid??o.chat_index??o.message?.messageId??o.message?.message_id??o.message?.id??o.message?.mesid??o.message?.chat_index??o.data?.messageId??o.data?.message_id??o.data?.id??o.target?.messageId??o.target?.message_id??o.target?.id)),r||(r=V(o.swipeId??o.swipe_id??o.swipe??o.swipeIndex??o.currentSwipe??o.message?.swipeId??o.message?.swipe_id??o.message?.swipe??o.data?.swipeId??o.data?.swipe_id??o.data?.swipe??o.target?.swipeId??o.target?.swipe_id??o.target?.swipe)))}return{messageId:s,swipeId:r}}_scheduleMessageProcessing(e,s="",r={}){let o=r.settleMs??this._getSettleMs(),a=`msg::${V(e)}::${V(s)}`,n=this._pendingTimers.get(a);n&&clearTimeout(n);let i=setTimeout(()=>{this._pendingTimers.delete(a),this.processAssistantMessage(e,{swipeId:s,sourceEvent:r.sourceEvent||"AUTO"}).catch(l=>{this._log("\u8C03\u5EA6\u6267\u884C\u5931\u8D25",{messageId:e,error:l})})},Math.max(0,o));this._pendingTimers.set(a,i),this._log("\u5DF2\u8C03\u5EA6\u6D88\u606F\u5904\u7406",{timerKey:a,settleMs:o,sourceEvent:r.sourceEvent})}cancelAutomation(e={}){let s=e.reason||"manual_cancel",r=V(e.messageId),o=V(e.slotKey),a=V(e.traceId),n=0;for(let[i,l]of this._pendingTimers){let c=r&&i.includes(`::${r}::`),d=o&&i.includes(o);(c||d||!r&&!o&&!a)&&(clearTimeout(l),this._pendingTimers.delete(i),n+=1)}return n+=this._cancelActiveTransactions(s,{messageId:r,slotKey:o,traceId:a}),{success:n>0,cancelledCount:n,reason:s}}_hasCompletedGeneration(e){if(!e)return!1;this._pruneCompletedKeys();let s=this._completedGenerationKeys.get(e);return s?Date.now()-s<this._getDedupeWindowMs():!1}_markGenerationCompleted(e){e&&(this._completedGenerationKeys.set(e,Date.now()),this._pruneCompletedKeys())}_markGenerationCancelled(e){e&&(this._cancelledGenerationKeys.set(e,Date.now()),this._pruneCancelledKeys())}_isGenerationCancelled(e){if(!e)return!1;this._pruneCancelledKeys();let s=this._cancelledGenerationKeys.get(e);return s?Date.now()-s<this._getDedupeWindowMs():!1}_pruneCompletedKeys(){let e=Date.now()-this._getDedupeWindowMs();for(let[s,r]of this._completedGenerationKeys)(!Number.isFinite(r)||r<e)&&this._completedGenerationKeys.delete(s)}_pruneCancelledKeys(){let e=Date.now()-this._getDedupeWindowMs();for(let[s,r]of this._cancelledGenerationKeys)(!Number.isFinite(r)||r<e)&&this._cancelledGenerationKeys.delete(s)}_recordTransaction(e){this._transactionHistory.push(e),this._transactionHistory.length>this._maxHistorySize&&(this._transactionHistory=this._transactionHistory.slice(-this._maxHistorySize)),this._log(`\u4E8B\u52A1 [${e.traceId}] \u2192 ${e.phase}`,{messageId:e.messageId,generationKey:e.generationKey,verdict:e.verdict,sourceEvent:e.sourceEvent,error:e.error})}_skipTransaction(e,s,r={}){return e.transition(Fe.SKIPPED,{verdict:s,...r}),this._recordTransaction(e),Array.isArray(r?.tools)&&r.tools.length>0&&this._updateAutoRuntimeForSkip(r.tools,e,s,r),{success:!1,skipped:!0,reason:s,traceId:e.traceId,...r}}_enqueueSlot(e,s){let o=(this._slotQueues.get(e)||Promise.resolve()).catch(()=>{}).then(s).finally(()=>{this._slotQueues.get(e)===o&&this._slotQueues.delete(e)});return this._slotQueues.set(e,o),o}_registerActiveTransaction(e,s={}){e?.traceId&&this._activeTransactions.set(e.traceId,{traceId:e.traceId,generationKey:s.generationKey||e.generationKey||"",slotKey:s.slotKey||e.slotKey||"",sourceMessageId:s.sourceMessageId||e.sourceMessageId||"",sourceSwipeId:s.sourceSwipeId||e.sourceSwipeId||"",slotRevisionKey:s.slotRevisionKey||e.slotRevisionKey||"",assistantBaseFingerprint:s.assistantBaseFingerprint||"",assistantBaseText:s.assistantBaseText||"",controller:s.controller||null,cancelled:!1,cancelReason:""})}_unregisterActiveTransaction(e){e&&this._activeTransactions.delete(e)}_cancelActiveTransactions(e="manual_cancel",s={}){let r=V(s.messageId),o=V(s.slotKey),a=V(s.traceId),n=0;for(let[i,l]of this._activeTransactions){let c=a&&i===a,d=r&&V(l?.sourceMessageId)===r,u=o&&V(l?.slotKey)===o;if(!(!c&&!d&&!u&&!(!a&&!r&&!o))){l.cancelled=!0,l.cancelReason=e,l?.generationKey&&this._markGenerationCancelled(l.generationKey);try{l?.controller?.abort?.()}catch{}n+=1}}return n}_shouldAbortAutoWriteback(e={}){let s=V(e.traceId),r=V(e.generationKey);if(s){let o=this._activeTransactions.get(s);if(!o||o.cancelled)return{aborted:!0,reason:"cancelled_before_host_commit"}}return r&&this._isGenerationCancelled(r)?{aborted:!0,reason:"cancelled_before_host_commit"}:!1}_updateAutoRuntimeForSkip(e,s,r,o={}){e.forEach(a=>{a?.id&&At(a.id,{lastAutoRunAt:Date.now(),lastAutoStatus:"skipped",lastAutoMessageId:s?.sourceMessageId||s?.messageId||"",lastAutoSwipeId:s?.sourceSwipeId||s?.swipeId||"",lastAutoRevisionKey:s?.slotRevisionKey||o?.slotRevisionKey||"",lastAutoWritebackStatus:"",lastAutoRefreshConfirmed:!1,lastAutoSkipReason:r||""},{touchLastRunAt:!1,emitEvent:!1,emitRuntimeEvent:!0})})}_updateAutoRuntimeForResults(e,s,r,o=[]){e.forEach((a,n)=>{if(!a?.id)return;let i=o[n]||{},l=i?.meta?.writebackDetails||{},c=i?.meta?.aborted===!0||i?.meta?.stale===!0?"aborted":i?.success===!1?"failed":"success",d=i?.meta?.aborted===!0?i?.meta?.abortReason||(i?.meta?.stale===!0?"stale_base_changed":"cancelled_before_host_commit"):"";At(a.id,{lastAutoRunAt:Date.now(),lastAutoStatus:c,lastAutoMessageId:s?.sourceMessageId||r?.sourceMessageId||r?.messageId||"",lastAutoSwipeId:s?.sourceSwipeId||r?.sourceSwipeId||r?.swipeId||"",lastAutoRevisionKey:s?.slotRevisionKey||r?.slotRevisionKey||"",lastAutoWritebackStatus:i?.meta?.writebackStatus||"",lastAutoRefreshConfirmed:!!l.refreshConfirmed,lastAutoSkipReason:d},{touchLastRunAt:!1,emitEvent:!1,emitRuntimeEvent:!0})})}_resetForChatChange(){let e=Xl(),s=Ql(e);this._log("\u804A\u5929\u5207\u6362",{from:this._currentChatId,to:s}),this._currentChatId=s,this._pendingTimers.forEach(r=>clearTimeout(r)),this._pendingTimers.clear(),this._slotQueues.clear(),this._completedGenerationKeys.clear(),this._cancelledGenerationKeys.clear(),this._cancelActiveTransactions("chat_changed"),this._activeTransactions.clear(),this._isProcessing=!1,this._messageReceivedThrottleUntil=0}_scheduleInitRetry(e,s){this._initRetryTimer&&clearTimeout(this._initRetryTimer),this._hostBindingStatus={...this._hostBindingStatus,retryScheduled:!0,retryDelayMs:e},this._initRetryTimer=setTimeout(()=>{this._initRetryTimer=null,this.init({retryOnFailure:!1,retryDelayMs:e,attempt:s})},Math.max(200,e))}_clearMessageState(e){if(e){for(let[s,r]of this._pendingTimers)(s.includes(`::${e}::`)||s.startsWith(`msg::${e}::`))&&(clearTimeout(r),this._pendingTimers.delete(s));for(let s of this._completedGenerationKeys.keys())s.startsWith(`${e}::`)&&this._completedGenerationKeys.delete(s)}}_evaluateEnabled(){return this._getAutomationSettings().enabled===!0}_checkEnabled(){if(this._enabled)return!0;if(!this._enabledCheckedOnce){this._enabledCheckedOnce=!0;let e=this._getAutomationSettings();this._log("\u26A0 \u81EA\u52A8\u5316\u672A\u542F\u7528\uFF0C\u9996\u6B21\u8BCA\u65AD:",{"automation.enabled":e.enabled,"\u5B8C\u6574 automation \u8BBE\u7F6E":e,\u63D0\u793A:"\u8BF7\u786E\u4FDD settings.automation.enabled === true"})}return!1}_getAutomationSettings(){let e=Ue.getSettings()?.automation||{},s=Number.isFinite(e.settleMs)?e.settleMs:800;return{enabled:e.enabled===!0,settleMs:s,dedupeWindowMs:Number.isFinite(e.dedupeWindowMs)?e.dedupeWindowMs:Math.max(1200,s+600)}}_getSettleMs(){return this._getAutomationSettings().settleMs}_getDedupeWindowMs(){return this._getAutomationSettings().dedupeWindowMs}_log(...e){console.log("[ToolAutomation]",...e)}},tc=new Po,Vy=tc});function oc(t,e={}){let{constants:s,topLevelWindow:r,modules:o}=t,{SCRIPT_ID:a,SCRIPT_VERSION:n,MENU_ITEM_ID:i,MENU_CONTAINER_ID:l}=s,c=null,d=!1;function u(...M){console.log(`[${a}]`,...M)}function y(...M){console.error(`[${a}]`,...M)}async function g(){return c||(c=(async()=>{try{return o.storageModule=await Promise.resolve().then(()=>(cn(),ln)),o.apiConnectionModule=await Promise.resolve().then(()=>(Ws(),gn)),o.presetManagerModule=await Promise.resolve().then(()=>(Hs(),hn)),o.uiModule=await Promise.resolve().then(()=>(ql(),Yl)),o.regexExtractorModule=await Promise.resolve().then(()=>(jr(),zn)),o.toolManagerModule=await Promise.resolve().then(()=>(Qr(),Gn)),o.toolExecutorModule=await Promise.resolve().then(()=>(Ea(),Aa)),o.windowManagerModule=await Promise.resolve().then(()=>(Jl(),Vl)),o.toolRegistryModule=await Promise.resolve().then(()=>(Et(),pi)),o.settingsServiceModule=await Promise.resolve().then(()=>(lr(),Ei)),o.bypassManagerModule=await Promise.resolve().then(()=>(nr(),Ai)),o.variableResolverModule=await Promise.resolve().then(()=>(dr(),Ci)),o.contextInjectorModule=await Promise.resolve().then(()=>(Jt(),ki)),o.toolPromptServiceModule=await Promise.resolve().then(()=>(io(),Ri)),o.toolOutputServiceModule=await Promise.resolve().then(()=>(co(),Di)),o.toolAutomationServiceModule=await Promise.resolve().then(()=>(rc(),sc)),o.toolOutputServiceModule?.toolOutputService&&o.apiConnectionModule&&o.toolOutputServiceModule.toolOutputService.setApiConnection(o.apiConnectionModule),!0}catch(M){return c=null,console.warn(`[${a}] \u6A21\u5757\u52A0\u8F7D\u5931\u8D25\uFF0C\u4F7F\u7528\u5185\u7F6E\u529F\u80FD:`,M),console.warn(`[${a}] \u5DF2\u52A0\u8F7D\u6A21\u5757:`,Object.keys(o).filter(I=>o[I])),!1}})(),c)}function m(){return`
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
        --yyt-control-radius: 14px;
        --yyt-control-radius-sm: 11px;
        --yyt-control-bg: linear-gradient(180deg, #1d2737 0%, #151d2a 100%);
        --yyt-control-bg-hover: linear-gradient(180deg, #243247 0%, #1a2638 100%);
        --yyt-control-bg-active: linear-gradient(180deg, #2a3951 0%, #1d2b3f 100%);
        --yyt-control-bg-strong: linear-gradient(180deg, #243247 0%, #192435 100%);
        --yyt-control-bg-focus: linear-gradient(180deg, #243a57 0%, #1a2a3f 100%);
        --yyt-control-border: rgba(146, 173, 212, 0.24);
        --yyt-control-border-hover: rgba(146, 173, 212, 0.36);
        --yyt-control-border-focus: rgba(123, 183, 255, 0.72);
        --yyt-control-shadow: 0 12px 24px rgba(0, 0, 0, 0.24), inset 0 1px 0 rgba(255, 255, 255, 0.04);
        --yyt-control-shadow-hover: 0 16px 28px rgba(0, 0, 0, 0.28), inset 0 1px 0 rgba(255, 255, 255, 0.06);
        --yyt-control-shadow-focus: 0 18px 30px rgba(8, 14, 24, 0.32), inset 0 1px 0 rgba(255, 255, 255, 0.06);
        --yyt-control-shadow-active: 0 10px 20px rgba(0, 0, 0, 0.22), inset 0 1px 0 rgba(255, 255, 255, 0.04);
        --yyt-shell-sidebar-width: 248px;
        --yyt-shell-topbar-gap: 14px;
        --yyt-shell-gap: 12px;
        --yyt-panel-gap: 16px;
        --yyt-backdrop: rgba(5, 8, 12, 0.72);
      }

      /* \u83DC\u5355\u9879 */
      #${l} { display: flex; align-items: center; }

      #${i} {
        display: flex; align-items: center; gap: 8px;
        padding: 10px 14px; cursor: pointer;
        transition: all 0.2s ease; border-radius: 8px; margin: 2px;
      }

      #${i}:hover {
        background: linear-gradient(135deg, rgba(123, 183, 255, 0.12) 0%, rgba(123, 183, 255, 0.04) 100%);
      }

      #${i} .fa-fw {
        font-size: 16px; color: var(--yyt-accent);
        filter: drop-shadow(0 0 6px var(--yyt-accent-glow));
      }

      #${i} span { font-weight: 500; letter-spacing: 0.3px; }

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
        border: 1px solid var(--yyt-control-border);
        border-radius: var(--yyt-control-radius);
        background: var(--yyt-control-bg);
        color: var(--yyt-text);
        font-size: 13px;
        box-shadow: var(--yyt-control-shadow);
      }

      .yyt-input:focus,
      .yyt-select:focus,
      .yyt-textarea:focus,
      .yyt-input:focus-visible,
      .yyt-select:focus-visible,
      .yyt-textarea:focus-visible {
        outline: none;
        border-color: var(--yyt-control-border-focus);
        background: var(--yyt-control-bg-focus);
        box-shadow: var(--yyt-focus-ring), var(--yyt-control-shadow-focus);
      }

      .yyt-input::placeholder,
      .yyt-textarea::placeholder {
        color: rgba(255, 255, 255, 0.42);
      }

      .yyt-custom-select {
        position: relative;
        isolation: isolate;
        flex: 1;
        min-width: 0;
      }

      .yyt-select-trigger,
      .yyt-select-dropdown,
      .yyt-select-option {
        backdrop-filter: none !important;
        -webkit-backdrop-filter: none !important;
        background-image: none !important;
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
        background: #1b2535 !important;
        color: var(--yyt-text-muted);
        font-size: 14px;
        cursor: pointer;
        transition: all 0.2s ease;
        flex-shrink: 0;
      }

      .yyt-option-star:hover {
        color: var(--yyt-accent);
        background: #243249 !important;
        border-color: rgba(123, 183, 255, 0.18);
      }

      .yyt-option-delete:hover {
        color: #fca5a5;
        background: #3a2025 !important;
        border-color: rgba(239, 68, 68, 0.18);
      }

      .yyt-option-star.yyt-starred {
        color: #fbbf24;
        background: #3b3120 !important;
        border-color: rgba(251, 191, 36, 0.2);
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
    `}async function v(){let M=`${a}-styles`,I=r.document||document;if(I.getElementById(M))return;let k="",N=[];try{N.push(new URL("../styles/main.css",import.meta.url).href)}catch{}try{N.push(new URL("../../styles/main.css",import.meta.url).href)}catch{}N.push("./styles/main.css");for(let Y of[...new Set(N.filter(Boolean))])try{let K=await fetch(Y);if(K.ok){k=await K.text();break}}catch{}k||(u("\u65E0\u6CD5\u52A0\u8F7D\u5916\u90E8\u6837\u5F0F\u6587\u4EF6\uFF0C\u4F7F\u7528\u5185\u7F6E\u6837\u5F0F"),k=m());let te=I.createElement("style");te.id=M,te.textContent=k,(I.head||I.documentElement).appendChild(te),u("\u6837\u5F0F\u5DF2\u6CE8\u5165")}function b(){let M=r.document||document;if(o.uiModule?.getAllStyles){let I=`${a}-ui-styles`;if(!M.getElementById(I)){let k=M.createElement("style");k.id=I,k.textContent=o.uiModule.getAllStyles(),(M.head||M.documentElement).appendChild(k)}}}async function S(){try{let{applyUiPreferences:M}=await Promise.resolve().then(()=>(mo(),Vi));if(o.settingsServiceModule?.settingsService){let I=o.settingsServiceModule.settingsService.getUiSettings();if(I&&I.theme){let k=r.document||document;M(I,k),u(`\u4E3B\u9898\u5DF2\u5E94\u7528: ${I.theme}`)}}}catch(M){u("\u4E3B\u9898\u52A0\u8F7D\u5931\u8D25:",M)}}function A(){let M=r.jQuery||window.jQuery;if(!M){y("jQuery \u672A\u627E\u5230\uFF0C\u5EF6\u8FDF\u91CD\u8BD5..."),setTimeout(A,1e3);return}let I=r.document||document,k=M("#extensionsMenu",I);if(!k.length){u("\u9B54\u68D2\u83DC\u5355\u672A\u627E\u5230\uFF0C\u5EF6\u8FDF\u91CD\u8BD5..."),setTimeout(A,2e3);return}if(M(`#${l}`,k).length>0){u("\u83DC\u5355\u9879\u5DF2\u5B58\u5728");return}let te=M(`<div class="extension_container interactable" id="${l}" tabindex="0"></div>`),Y=`
      <div class="list-group-item flex-container flexGap5 interactable" id="${i}" title="\u6253\u5F00 YouYou \u5DE5\u5177\u7BB1">
        <div class="fa-fw fa-solid fa-wand-magic-sparkles extensionsMenuExtensionButton"></div>
        <span>YouYou \u5DE5\u5177\u7BB1</span>
      </div>
    `,K=M(Y);K.on("click",function(X){X.stopPropagation(),u("\u83DC\u5355\u9879\u88AB\u70B9\u51FB");let ye=M("#extensionsMenuButton",I);ye.length&&k.is(":visible")&&ye.trigger("click"),typeof e.openPopup=="function"&&e.openPopup()}),te.append(K),k.append(te),u("\u83DC\u5355\u9879\u5DF2\u6DFB\u52A0\u5230\u9B54\u68D2\u533A")}async function w(){u(`\u521D\u59CB\u5316\u5F00\u59CB... \u7248\u672C: ${n}`),await v();let M=await g();if(u(M?"\u6240\u6709\u6A21\u5757\u52A0\u8F7D\u6210\u529F":"\u90E8\u5206\u6A21\u5757\u52A0\u8F7D\u5931\u8D25\uFF0C\u4F7F\u7528\u53EF\u7528\u529F\u80FD"),!d&&o.uiModule?.initUI)try{o.uiModule.initUI({services:o,autoInjectStyles:!1,targetDocument:r.document||document}),d=!0,u("UI \u88C5\u914D\u4E2D\u5FC3\u5DF2\u521D\u59CB\u5316")}catch(k){console.error(`[${a}] UI \u6A21\u5757\u521D\u59CB\u5316\u5931\u8D25:`,k)}if(o.uiModule&&(b(),await S()),o.toolAutomationServiceModule?.toolAutomationService){let k=o.toolAutomationServiceModule.toolAutomationService.init();u(k?"\u81EA\u52A8\u5316\u751F\u547D\u5468\u671F\u670D\u52A1\u5DF2\u521D\u59CB\u5316":"\u81EA\u52A8\u5316\u751F\u547D\u5468\u671F\u670D\u52A1\u521D\u59CB\u5316\u672A\u5B8C\u6210\uFF0C\u7B49\u5F85\u5BBF\u4E3B\u4E8B\u4EF6\u6E90\u91CD\u8BD5")}let I=r.document||document;I.readyState==="loading"?I.addEventListener("DOMContentLoaded",()=>{setTimeout(A,1e3)}):setTimeout(A,1e3),u("\u521D\u59CB\u5316\u5B8C\u6210")}return{loadModules:g,injectStyles:v,addMenuItem:A,init:w,log:u,logError:y}}fe();Te();Te();var Jy="youyou_toolkit_prompt_editor",Xy={system:"System Prompt (\u7CFB\u7EDF\u63D0\u793A\u8BCD)",ai:"AI Prompt (AI\u6307\u4EE4\u63D0\u793A\u8BCD)",user:"User Prompt (\u7528\u6237\u63D0\u793A\u8BCD)"},Qy={system:"fa-server",ai:"fa-robot",user:"fa-user"},vr=[{id:"system_1",type:"system",role:"SYSTEM",mainSlot:"",content:"",deletable:!1,expanded:!0},{id:"ai_1",type:"ai",role:"USER",mainSlot:"A",content:"",deletable:!1,expanded:!0,isMain:!0},{id:"user_1",type:"user",role:"USER",mainSlot:"B",content:"",deletable:!1,expanded:!0,isMain2:!0}],$o=class{constructor(e={}){this.containerId=e.containerId||Jy,this.segments=e.segments||[...vr],this.onChange=e.onChange||null,this.editable=e.editable!==!1,this.showMainSlot=e.showMainSlot!==!1,this.$container=null,this.$=null}init(e){if(this.$=window.jQuery||window.parent?.jQuery,!this.$){console.error("[PromptEditor] jQuery not available");return}this.$container=e,this.render(),this.bindEvents()}setSegments(e){this.segments=e&&Array.isArray(e)?[...e]:[...vr],this.$container&&(this.render(),this.bindEvents())}getSegments(){return this.segments.map(e=>({...e,content:this.getSegmentContent(e.id)}))}getSegmentContent(e){return this.$container&&this.$container.find(`[data-segment-id="${e}"] .yyt-prompt-textarea`).val()||""}render(){if(!this.$container)return;let e=`
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
    `;this.$container.html(e)}renderSegment(e){let s=Xy[e.type]||e.type,r=Qy[e.type]||"fa-file",o=e.mainSlot==="A"||e.isMain,a=e.mainSlot==="B"||e.isMain2,n=o?"var(--yyt-accent, #7bb7ff)":a?"#ffb74d":"",i=this.showMainSlot&&e.mainSlot?`<span class="yyt-prompt-slot-badge">mainSlot: ${e.mainSlot}</span>`:"",l=`<span class="yyt-prompt-role-badge">role: ${e.role||"USER"}</span>`;return`
      <div class="yyt-prompt-segment ${e.expanded?"yyt-expanded":""} ${o?"yyt-main-a":""} ${a?"yyt-main-b":""}" 
           data-segment-id="${e.id}" 
           data-segment-type="${e.type}"
           style="${n?`border-left: 3px solid ${n};`:""}">
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
    `}bindEvents(){this.$container&&(ue(this.$container,"yytPromptEditorSelect"),this.$container.off(".yytPromptEditor"),this.$container.on("click.yytPromptEditor",".yyt-prompt-toggle",e=>{this.$(e.currentTarget).closest(".yyt-prompt-segment").toggleClass("yyt-expanded"),this.$(e.currentTarget).find("i").toggleClass("fa-chevron-up fa-chevron-down")}),this.$container.on("click.yytPromptEditor",".yyt-prompt-delete",e=>{let s=this.$(e.currentTarget).closest(".yyt-prompt-segment").data("segment-id");this.deleteSegment(s)}),this.$container.on("change.yytPromptEditor",".yyt-prompt-role",e=>{let s=this.$(e.currentTarget).closest(".yyt-prompt-segment").data("segment-id"),r=this.$(e.currentTarget).val();this.updateSegmentMeta(s,{role:r})}),this.$container.on("change.yytPromptEditor",".yyt-prompt-main-slot",e=>{let s=this.$(e.currentTarget).closest(".yyt-prompt-segment").data("segment-id"),r=this.$(e.currentTarget).val();this.updateSegmentMeta(s,{mainSlot:r})}),this.$container.on("input.yytPromptEditor",".yyt-prompt-textarea",e=>{this.onChange&&this.onChange(this.getSegments())}),this.$container.on("click.yytPromptEditor",`#${this.containerId}-add-segment`,()=>{this.addSegment()}),this.$container.on("click.yytPromptEditor",`#${this.containerId}-import-prompt`,()=>{this.importPrompt()}),this.$container.on("click.yytPromptEditor",`#${this.containerId}-export-prompt`,()=>{this.exportPrompt()}),Se(this.$container,{namespace:"yytPromptEditorSelect",selectors:[".yyt-prompt-role",".yyt-prompt-main-slot"]}))}addSegment(e=null){let s=`segment_${Date.now()}`,r=e||{id:s,type:"user",role:"USER",mainSlot:"",content:"",deletable:!0,expanded:!0};r.id||(r.id=s),this.segments.push(r),this.render(),this.bindEvents(),this.onChange&&this.onChange(this.getSegments())}deleteSegment(e){let s=this.segments.findIndex(o=>o.id===e);if(s===-1)return;if(this.segments[s].deletable===!1){console.warn("[PromptEditor] \u8BE5\u6BB5\u843D\u4E0D\u53EF\u5220\u9664");return}this.segments.splice(s,1),this.render(),this.bindEvents(),this.onChange&&this.onChange(this.getSegments())}updateSegmentMeta(e,s){let r=this.segments.find(o=>o.id===e);r&&(Object.assign(r,s),this.onChange&&this.onChange(this.getSegments()))}importPrompt(){let e=document.createElement("input");e.type="file",e.accept=".json",e.onchange=s=>{let r=s.target.files[0];if(!r)return;let o=new FileReader;o.onload=a=>{try{let n=JSON.parse(a.target.result);Array.isArray(n)?(this.setSegments(n),console.log("[PromptEditor] \u63D0\u793A\u8BCD\u5BFC\u5165\u6210\u529F")):console.error("[PromptEditor] \u65E0\u6548\u7684\u63D0\u793A\u8BCD\u683C\u5F0F")}catch(n){console.error("[PromptEditor] \u5BFC\u5165\u5931\u8D25:",n)}},o.readAsText(r)},e.click()}exportPrompt(){let e=this.getSegments(),s=JSON.stringify(e,null,2),r=new Blob([s],{type:"application/json"}),o=URL.createObjectURL(r),a=document.createElement("a");a.href=o,a.download=`prompt_group_${Date.now()}.json`,a.click(),URL.revokeObjectURL(o),console.log("[PromptEditor] \u63D0\u793A\u8BCD\u5DF2\u5BFC\u51FA")}destroy(){this.$container&&(ue(this.$container,"yytPromptEditorSelect"),this.$container.off(".yytPromptEditor"))}escapeHtml(e){return typeof e!="string"?"":e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}};function ac(){return`
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
  `}function nc(t){return t.filter(e=>e.content&&e.content.trim()).map(e=>({role:e.role,content:e.content,deletable:e.deletable,mainSlot:e.mainSlot}))}function ic(t){return Array.isArray(t)?t.map((e,s)=>({id:`segment_${s}_${Date.now()}`,type:e.role==="SYSTEM"?"system":e.role==="assistant"?"ai":"user",role:e.role,mainSlot:e.mainSlot||"",content:e.content||"",deletable:e.deletable!==!1,expanded:!0,isMain:e.mainSlot==="A"||e.isMain,isMain2:e.mainSlot==="B"||e.isMain2})):[...vr]}function lc(t){let{constants:e,topLevelWindow:s,modules:r,caches:o,uiState:a}=t,{SCRIPT_ID:n,SCRIPT_VERSION:i,POPUP_ID:l}=e,c={cleanup:null},d={cleanups:[]},u={cleanups:[]},y={current:null};function g(){return!!a.sidebarCollapsed}function m(){a.sidebarCollapsed=!a.sidebarCollapsed;let p=a.currentPopup;if(!p)return;let h=p.querySelector(".yyt-shell-sidebar"),T=p.querySelector(".yyt-shell-workspace"),E=p.querySelector(".yyt-sidebar-toggle i");h&&h.classList.toggle("yyt-collapsed",a.sidebarCollapsed),T&&T.classList.toggle("yyt-sidebar-collapsed",a.sidebarCollapsed),E&&(E.className=a.sidebarCollapsed?"fa-solid fa-angles-right":"fa-solid fa-angles-left"),ce()}function v(...p){console.log(`[${n}]`,...p)}function b(...p){console.error(`[${n}]`,...p)}function S(p){return typeof p!="string"?"":p.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}function A(){return s.jQuery||window.jQuery}function w(){return s.document||document}function M(p){if(!p)return"\u672A\u9009\u62E9\u9875\u9762";let h=r.toolRegistryModule?.getToolConfig(p);if(!h)return p;if(!h.hasSubTabs)return h.name||p;let T=k(p),E=h.subTabs?.find(R=>R.id===T);return E?.name?`${h.name} / ${E.name}`:h.name||p}function I(p){if(!p)return"\u8BF7\u9009\u62E9\u5DE6\u4FA7\u5BFC\u822A\u4E2D\u7684\u9875\u9762\u8FDB\u884C\u914D\u7F6E\u6216\u6392\u67E5\u3002";let h=r.toolRegistryModule?.getToolConfig(p);if(!h)return"\u5F53\u524D\u9875\u9762\u63CF\u8FF0\u6682\u4E0D\u53EF\u7528\u3002";if(!h.hasSubTabs)return h.description||"\u5728\u8FD9\u91CC\u7BA1\u7406\u5F53\u524D\u9875\u9762\u7684\u914D\u7F6E\u548C\u64CD\u4F5C\u3002";let T=k(p);return h.subTabs?.find(R=>R.id===T)?.description||h.description||"\u5728\u8FD9\u91CC\u7BA1\u7406\u5F53\u524D\u5DE5\u5177\u7684\u6A21\u677F\u3001\u914D\u7F6E\u4E0E\u8C03\u8BD5\u80FD\u529B\u3002"}function k(p,h=""){let T=r.toolRegistryModule?.getToolConfig(p);if(!T?.hasSubTabs||!Array.isArray(T.subTabs)||T.subTabs.length===0)return"";let E=String(h||a.currentSubTab[p]||"").trim(),O=E&&T.subTabs.some(W=>W?.id===E)?E:T.subTabs[0]?.id||"";return O&&a.currentSubTab[p]!==O&&(a.currentSubTab[p]=O),O}function N(){let p=a.currentPopup;if(!p)return;let h=M(a.currentMainTab),T=I(a.currentMainTab),E=p.querySelector(".yyt-popup-active-label");E&&(E.textContent=`\u5F53\u524D\uFF1A${h}`);let R=p.querySelector(".yyt-shell-breadcrumb");R&&(R.textContent=h);let O=p.querySelector(".yyt-shell-main-title");O&&(O.textContent=h);let W=p.querySelector(".yyt-shell-main-description");W&&(W.textContent=T)}function te(){typeof c.cleanup=="function"&&(c.cleanup(),c.cleanup=null)}function Y(){Array.isArray(d.cleanups)&&(d.cleanups.forEach(p=>{typeof p=="function"&&p()}),d.cleanups=[])}function K(){Array.isArray(u.cleanups)&&(u.cleanups.forEach(p=>{typeof p=="function"&&p()}),u.cleanups=[])}function ie(p,h){if(!p||!h)return!1;let T=p.jquery?p[0]:p,E=h.jquery?h[0]:h;return!!(T&&E&&T===E)}function X(p={}){let{container:h=null}=p,T=y.current;if(T&&!(h&&!ie(T.container,h))){try{typeof T.destroy=="function"&&T.destroy(T.container)}catch(E){b("\u9500\u6BC1\u52A8\u6001\u9762\u677F host \u5931\u8D25",E)}r.uiModule?.uiManager?.destroyContainerInstance&&r.uiModule.uiManager.destroyContainerInstance(T.container),y.current=null}}function ye(p,h={}){y.current={key:h.key||"",container:p,destroy:typeof h.destroy=="function"?h.destroy:null}}function Xe(){let p=A();if(!p||!a.currentPopup)return;let h=r.toolRegistryModule?.getToolList()||[],T=p(a.currentPopup).find(".yyt-main-nav");if(!T.length)return;let E=h.map(O=>`
      <div class="yyt-main-nav-item ${O.id===a.currentMainTab?"active":""}" data-tab="${O.id}">
        <div class="yyt-main-nav-icon">
          <i class="fa-solid ${S(O.icon||"fa-file")}"></i>
        </div>
        <div class="yyt-main-nav-copy">
          <span class="yyt-main-nav-name">${S(O.name||O.id)}</span>
          <span class="yyt-main-nav-desc">${S(O.description||"\u8FDB\u5165\u6B64\u9875\u9762\u8FDB\u884C\u914D\u7F6E\u3001\u67E5\u770B\u6216\u7EF4\u62A4\u3002")}</span>
        </div>
      </div>
    `).join("");T.html(E),p(a.currentPopup).find(".yyt-main-nav-item").on("click",function(){let W=p(this).data("tab");W&&$t(W)});let R=p(a.currentPopup).find(".yyt-shell-sidebar-hint");R.length&&R.text(`${h.length} tabs`)}function Q(){let p=A();if(!p||!a.currentPopup)return;let h=r.toolRegistryModule?.getToolList()||[],T=r.toolRegistryModule?.getToolConfig("tools"),E=Array.isArray(T?.subTabs)?T.subTabs:[],R=E.filter(L=>L?.isCustom).length,O=E.filter(L=>!L?.isCustom).length,F=p(a.currentPopup).find(".yyt-shell-sidebar-stats");F.length&&(F.find(".yyt-shell-sidebar-stat").eq(0).find(".yyt-shell-sidebar-stat-value").text(String(h.length)),F.find(".yyt-shell-sidebar-stat").eq(1).find(".yyt-shell-sidebar-stat-value").text(String(O)),F.find(".yyt-shell-sidebar-stat").eq(2).find(".yyt-shell-sidebar-stat-value").text(String(R)))}function It(){let p=r.toolRegistryModule?.getToolList()||[];return p.length?(p.some(h=>h.id===a.currentMainTab)||(a.currentMainTab=p[0].id),a.currentMainTab):null}async function He(p={}){let{rebuildNavigation:h=!1,reRenderSubNav:T=!1}=p,E=A();if(!E||!a.currentPopup)return;X();let R=It();if(!R)return;h&&(Xe(),Q());let O=r.toolRegistryModule?.getToolConfig(R),W=!!O?.hasSubTabs,F=E(a.currentPopup).find(".yyt-sub-nav"),L=E(a.currentPopup).find(".yyt-content-inner");if(h&&L.length){let q=new Set(L.find(".yyt-tab-content").map((me,Oe)=>E(Oe).data("tab")).get());(r.toolRegistryModule?.getToolList()||[]).forEach(me=>{q.has(me.id)||L.append(`<div class="yyt-tab-content" data-tab="${S(me.id)}"></div>`)}),L.find(".yyt-tab-content").each((me,Oe)=>{let Qe=E(Oe).data("tab");(r.toolRegistryModule?.getToolList()||[]).some(Ze=>Ze.id===Qe)||E(Oe).remove()})}E(a.currentPopup).find(".yyt-main-nav-item").removeClass("active"),E(a.currentPopup).find(`.yyt-main-nav-item[data-tab="${R}"]`).addClass("active"),E(a.currentPopup).find(".yyt-tab-content").removeClass("active"),E(a.currentPopup).find(`.yyt-tab-content[data-tab="${R}"]`).addClass("active"),W?(F.show(),(T||h)&&cs(R,O.subTabs)):F.hide(),await ht(R),N(),ce()}function Ct(){if(!a.currentPopup)return;Y();let p=()=>{if(a.currentMainTab==="apiPresets"){He();return}a.currentMainTab==="tools"&&He({reRenderSubNav:!0})},h=()=>{a.currentMainTab==="tools"?He({rebuildNavigation:!0,reRenderSubNav:!0}):Q()},T=()=>{a.currentMainTab==="tools"&&He({rebuildNavigation:!1,reRenderSubNav:!1})},E=()=>{(a.currentMainTab==="bypass"||a.currentMainTab==="tools")&&He({reRenderSubNav:a.currentMainTab==="tools"})};[P.PRESET_CREATED,P.PRESET_UPDATED,P.PRESET_DELETED].forEach(R=>{d.cleanups.push($.on(R,p))}),[P.TOOL_REGISTERED,P.TOOL_UPDATED,P.TOOL_UNREGISTERED].forEach(R=>{d.cleanups.push($.on(R,h))}),d.cleanups.push($.on(P.TOOL_RUNTIME_UPDATED,T)),[P.BYPASS_PRESET_CREATED,P.BYPASS_PRESET_UPDATED,P.BYPASS_PRESET_DELETED].forEach(R=>{d.cleanups.push($.on(R,E))})}function Pt(p){return!!p?.closest?.(["input","textarea","select","button","a","label","summary","details",'[contenteditable="true"]',".yyt-dialog",".yyt-select-dropdown",".yyt-select-portal-layer"].join(","))}function le(p){let h=p?.closest?.(["textarea",".yyt-preview-pre",".yyt-select-dropdown",".yyt-select-portal-layer",".yyt-dialog-body",".yyt-worldbook-list",".yyt-tool-panel",".yyt-panel-section"].join(","));return h?h.scrollHeight>h.clientHeight+2||h.scrollWidth>h.clientWidth+2:!1}function ee(p,h){return h?.closest?.(".yyt-scrollable-surface")===p}function mt(p,h){if(!p||!h)return null;let T=h.closest?.([".yyt-worldbook-list",".yyt-select-dropdown",".yyt-select-portal-layer",".yyt-dialog-body",".yyt-preview-pre",".yyt-tool-panel",".yyt-panel-section"].join(","));return T&&(T.classList?.contains("yyt-select-portal-layer")||p.contains(T))&&(T.scrollHeight>T.clientHeight+2||T.scrollWidth>T.clientWidth+2)?T:[h.closest?.(".yyt-tool-list"),h.closest?.(".yyt-settings-content"),h.closest?.(".yyt-sub-content"),h.closest?.(".yyt-tab-content.active"),p].filter(Boolean).find(R=>R!==p&&!p.contains(R)?!1:R.scrollHeight>R.clientHeight+2||R.scrollWidth>R.clientWidth+2)||p}function Ae({mainTab:p=null,includeSubContent:h=!1}={}){let T=a.currentPopup;if(!T)return;let E=T.querySelector(".yyt-content");E&&(E.scrollTop=0,E.scrollLeft=0);let R=p?`.yyt-tab-content[data-tab="${p}"]`:".yyt-tab-content.active",O=T.querySelector(R);if(O&&(O.scrollTop=0,O.scrollLeft=0),!h)return;(O?.querySelectorAll(".yyt-sub-content")||[]).forEach(F=>{F.scrollTop=0,F.scrollLeft=0})}function we(p){let h=w();if(!p||!h)return;p.classList.add("yyt-scrollable-surface");let T=!1,E=!1,R=0,O=0,W=0,F=0,L=!1,q=!1,me=()=>{T=!1,E=!1,p.classList.remove("yyt-scroll-dragging")},Oe=H=>{H.button===0&&(Pt(H.target)||ee(p,H.target)&&(L=p.scrollWidth>p.clientWidth+2,q=p.scrollHeight>p.clientHeight+2,!(!L&&!q)&&(H.stopPropagation(),T=!0,E=!1,R=H.clientX,O=H.clientY,W=p.scrollLeft,F=p.scrollTop)))},Qe=H=>{if(!T)return;let Ot=H.clientX-R,Me=H.clientY-O;!(Math.abs(Ot)>4||Math.abs(Me)>4)&&!E||(E=!0,p.classList.add("yyt-scroll-dragging"),L&&(p.scrollLeft=W-Ot),q&&(p.scrollTop=F-Me),H.preventDefault())},Ze=()=>{me()},Ee=H=>{if(H.ctrlKey||le(H.target)||!p.classList.contains("yyt-content")&&!ee(p,H.target))return;let Me=mt(p,H.target);!Me||Me!==p&&!p.contains(Me)||!(Me.scrollHeight>Me.clientHeight+2||Me.scrollWidth>Me.clientWidth+2)||(Math.abs(H.deltaY)>0&&(Me.scrollTop+=H.deltaY),Math.abs(H.deltaX)>0&&(Me.scrollLeft+=H.deltaX),H.preventDefault(),H.stopPropagation())},be=H=>{E&&H.preventDefault()};p.addEventListener("mousedown",Oe),p.addEventListener("wheel",Ee,{passive:!1}),p.addEventListener("dragstart",be),h.addEventListener("mousemove",Qe),h.addEventListener("mouseup",Ze),u.cleanups.push(()=>{me(),p.classList.remove("yyt-scrollable-surface"),p.removeEventListener("mousedown",Oe),p.removeEventListener("wheel",Ee),p.removeEventListener("dragstart",be),h.removeEventListener("mousemove",Qe),h.removeEventListener("mouseup",Ze)})}function ce(){let p=a.currentPopup;if(!p)return;K();let h=[...p.querySelectorAll(".yyt-shell-sidebar .yyt-main-nav"),...p.querySelectorAll(".yyt-sub-nav"),...p.querySelectorAll(".yyt-content"),...p.querySelectorAll(".yyt-settings-content"),...p.querySelectorAll(".yyt-tool-list")];[...new Set(h)].forEach(we)}function Ds(p){return`
      <div class="yyt-startup-screen" data-yyt-startup-screen>
        <div class="yyt-startup-screen-inner">
          <div class="yyt-startup-screen-kicker">Welcome</div>
          <div class="yyt-startup-screen-title">YouYou \u5DE5\u5177\u7BB1</div>
          <div class="yyt-startup-screen-desc">\u96C6\u4E2D\u7BA1\u7406 API \u9884\u8BBE\u3001\u81EA\u5B9A\u4E49\u5DE5\u5177\u3001\u63D0\u53D6\u89C4\u5219\u3001Ai\u6307\u4EE4\u9884\u8BBE\u4E0E\u8BCA\u65AD\u6D41\u7A0B\u3002\u6BCF\u6B21\u5237\u65B0\u540E\u90FD\u4F1A\u91CD\u65B0\u663E\u793A\uFF0C\u4FBF\u4E8E\u5FEB\u901F\u56DE\u5230\u4ECB\u7ECD\u5165\u53E3\u3002</div>
          <div class="yyt-startup-screen-modules">
            ${(p||[]).slice(0,6).map(T=>`
      <div class="yyt-startup-module-chip">
        <i class="fa-solid ${S(T.icon||"fa-file")}"></i>
        <span>${S(T.name||T.id)}</span>
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
    `}function Os(p){let h=A();if(!h||!a.currentPopup||a.startupScreenDismissed)return;let T=h(a.currentPopup).find(".yyt-popup-body"),E=T.find(".yyt-popup-shell");!T.length||!E.length||T.find("[data-yyt-startup-screen]").length||(E.attr("data-yyt-startup-visible","true"),T.prepend(Ds(p)),T.find(".yyt-startup-enter").on("click",()=>{T.find("[data-yyt-startup-screen]").remove(),E.removeAttr("data-yyt-startup-visible"),a.startupScreenDismissed=!0,ce()}))}function bt(){let p=w(),h=a.currentPopup,T=h?.querySelector(".yyt-popup-header");if(!h||!T||!p)return;let E=!1,R=0,O=0,W=0,F=0,L="",q=()=>({width:s.innerWidth||p.documentElement?.clientWidth||window.innerWidth||0,height:s.innerHeight||p.documentElement?.clientHeight||window.innerHeight||0}),me=(be,H,Ot)=>Math.min(Math.max(be,H),Ot),Oe=()=>{E&&(E=!1,h.classList.remove("yyt-popup-dragging"),p.body.style.userSelect=L)},Qe=be=>{if(!E||!a.currentPopup)return;let H=be.clientX-R,Ot=be.clientY-O,{width:Me,height:Oo}=q(),vc=h.offsetWidth||0,xc=h.offsetHeight||0,wc=Math.max(0,Me-vc),Sc=Math.max(0,Oo-xc);h.style.left=`${me(W+H,0,wc)}px`,h.style.top=`${me(F+Ot,0,Sc)}px`,h.style.transform="none",h.style.right="auto",h.style.bottom="auto"},Ze=()=>{Oe()},Ee=be=>{if(be.button!==0||be.target?.closest(".yyt-popup-close"))return;E=!0,R=be.clientX,O=be.clientY;let H=h.getBoundingClientRect();W=H.left,F=H.top,h.style.left=`${H.left}px`,h.style.top=`${H.top}px`,h.style.transform="none",h.style.right="auto",h.style.bottom="auto",h.classList.add("yyt-popup-dragging"),L=p.body.style.userSelect||"",p.body.style.userSelect="none",be.preventDefault()};T.addEventListener("mousedown",Ee),p.addEventListener("mousemove",Qe),p.addEventListener("mouseup",Ze),c.cleanup=()=>{Oe(),T.removeEventListener("mousedown",Ee),p.removeEventListener("mousemove",Qe),p.removeEventListener("mouseup",Ze)}}function Rt(){X(),te(),Y(),K();let p=A();if(p&&a.currentPopup){let h=p(a.currentPopup);ue(h,"yytPopupToolConfigSelect"),ue(h,"yytPromptEditorSelect")}a.currentPopup&&(a.currentPopup.remove(),a.currentPopup=null),a.currentOverlay&&(a.currentOverlay.remove(),a.currentOverlay=null),v("\u5F39\u7A97\u5DF2\u5173\u95ED")}function $t(p){X(),a.currentMainTab=p;let h=A();if(!h||!a.currentPopup)return;Ae({mainTab:p,includeSubContent:!0}),h(a.currentPopup).find(".yyt-main-nav-item").removeClass("active"),h(a.currentPopup).find(`.yyt-main-nav-item[data-tab="${p}"]`).addClass("active");let T=r.toolRegistryModule?.getToolConfig(p);T?.hasSubTabs?(h(a.currentPopup).find(".yyt-sub-nav").show(),cs(p,T.subTabs)):h(a.currentPopup).find(".yyt-sub-nav").hide(),h(a.currentPopup).find(".yyt-tab-content").removeClass("active"),h(a.currentPopup).find(`.yyt-tab-content[data-tab="${p}"]`).addClass("active"),ht(p),N(),ce()}function Ns(p,h){X(),a.currentSubTab[p]=h;let T=A();!T||!a.currentPopup||(Ae({mainTab:p,includeSubContent:!0}),T(a.currentPopup).find(".yyt-sub-nav-item").removeClass("active"),T(a.currentPopup).find(`.yyt-sub-nav-item[data-subtab="${h}"]`).addClass("active"),vt(p,h),N(),ce())}function cs(p,h){let T=A();if(!T||!a.currentPopup||!h)return;let E=k(p,a.currentSubTab[p]||h[0]?.id),O=(p==="tools"?[{key:"ai",title:"AI \u5DE5\u5177",items:h.filter(W=>(W?.toolKind||"ai")!=="script")},{key:"script",title:"\u811A\u672C\u5DE5\u5177",items:h.filter(W=>W?.toolKind==="script")}].filter(W=>W.items.length>0):[{key:"default",title:"",items:h}]).map(W=>{let F=W.title?`<div class="yyt-sub-nav-group-title">${S(W.title)}</div>`:"",L=W.items.map(q=>`
        <div class="yyt-sub-nav-item ${q.id===E?"active":""}" data-subtab="${q.id}">
          <i class="fa-solid ${q.icon||"fa-file"}"></i>
          <span>${S(q.name||q.id)}</span>
        </div>
      `).join("");return`
        <div class="yyt-sub-nav-group yyt-sub-nav-group-${W.key}">
          ${F}
          <div class="yyt-sub-nav-group-items">
            ${L}
          </div>
        </div>
      `}).join("");T(a.currentPopup).find(".yyt-sub-nav").html(O),T(a.currentPopup).find(".yyt-sub-nav-item").on("click",function(){let F=T(this).data("subtab");Ns(p,F)}),ce()}async function ht(p){let h=A();if(!h||!a.currentPopup)return;let T=h(a.currentPopup).find(`.yyt-tab-content[data-tab="${p}"]`);if(!T.length)return;let E=r.toolRegistryModule?.getToolConfig(p);switch(p){case"apiPresets":r.uiModule?.renderApiPanel?r.uiModule.renderApiPanel(T):T.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>API \u9884\u8BBE\u9762\u677F\u52A0\u8F7D\u5931\u8D25</span></div>');break;case"toolManage":r.uiModule?.renderToolPanel?r.uiModule.renderToolPanel(T):T.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5DE5\u5177\u7BA1\u7406\u9762\u677F\u52A0\u8F7D\u5931\u8D25</span></div>');break;case"regexExtract":r.uiModule?.renderRegexPanel?r.uiModule.renderRegexPanel(T):T.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u6B63\u5219\u63D0\u53D6\u9762\u677F\u52A0\u8F7D\u5931\u8D25</span></div>');break;case"tools":{let R=k(p);E?.hasSubTabs&&R?await vt(p,R):T.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5DE5\u5177\u914D\u7F6E\u52A0\u8F7D\u5931\u8D25</span></div>');break}case"tableWorkbench":r.uiModule?.renderTableWorkbenchPanel?r.uiModule.renderTableWorkbenchPanel(T):T.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u586B\u8868\u5DE5\u4F5C\u53F0\u52A0\u8F7D\u5931\u8D25</span></div>');break;case"bypass":r.uiModule?.renderBypassPanel?r.uiModule.renderBypassPanel(T):T.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>Ai\u6307\u4EE4\u9884\u8BBE\u9762\u677F\u52A0\u8F7D\u5931\u8D25</span></div>');break;case"settings":r.uiModule?.renderSettingsPanel?r.uiModule.renderSettingsPanel(T):T.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u8BBE\u7F6E\u9762\u677F\u52A0\u8F7D\u5931\u8D25</span></div>');break;default:Tr(p,T);break}ce()}async function vt(p,h){let T=A();if(!T||!a.currentPopup)return;let E=T(a.currentPopup).find(`.yyt-tab-content[data-tab="${p}"]`);if(!E.length)return;let R=r.toolRegistryModule?.getToolConfig(p);if(R?.hasSubTabs){let W=k(p,h),F=R.subTabs?.find(q=>q.id===W),L=E.find(".yyt-sub-content");if(L.length||(E.html('<div class="yyt-sub-content"></div>'),L=E.find(".yyt-sub-content")),!F){L.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5F53\u524D\u5B50\u9875\u9762\u4E0D\u5B58\u5728\u6216\u5DF2\u5931\u6548</span></div>'),Ae({mainTab:p,includeSubContent:!0}),ce();return}switch(F.component){case"SummaryToolPanel":{X({container:L}),r.uiModule?.renderSummaryToolPanel?(r.uiModule.renderSummaryToolPanel(L),ye(L,{key:"SummaryToolPanel"})):L.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u6458\u8981\u5DE5\u5177\u52A0\u8F7D\u5931\u8D25</span></div>');break}case"StatusBlockPanel":{X({container:L}),r.uiModule?.renderStatusBlockPanel?(r.uiModule.renderStatusBlockPanel(L),ye(L,{key:"StatusBlockPanel"})):L.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u4E3B\u89D2\u72B6\u6001\u680F\u52A0\u8F7D\u5931\u8D25</span></div>');break}case"YouyouReviewPanel":{X({container:L}),r.uiModule?.renderYouyouReviewPanel?(r.uiModule.renderYouyouReviewPanel(L),ye(L,{key:"YouyouReviewPanel"})):L.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5C0F\u5E7D\u70B9\u8BC4\u52A0\u8F7D\u5931\u8D25</span></div>');break}case"EscapeTransformToolPanel":{X({container:L}),r.uiModule?.renderEscapeTransformToolPanel?(r.uiModule.renderEscapeTransformToolPanel(L),ye(L,{key:"EscapeTransformToolPanel"})):L.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u8F6C\u4E49\u5904\u7406\u5DE5\u5177\u52A0\u8F7D\u5931\u8D25</span></div>');break}case"PunctuationTransformToolPanel":{X({container:L}),r.uiModule?.renderPunctuationTransformToolPanel?(r.uiModule.renderPunctuationTransformToolPanel(L),ye(L,{key:"PunctuationTransformToolPanel"})):L.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u4E2D\u6587\u6807\u70B9\u66FF\u6362\u5DE5\u5177\u52A0\u8F7D\u5931\u8D25</span></div>');break}case"GenericToolConfigPanel":await Sr(F,L);break;default:L.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-tools"></i><span>\u529F\u80FD\u5F00\u53D1\u4E2D...</span></div>')}Ae({mainTab:p,includeSubContent:!0}),ce();return}let O=E.find(".yyt-sub-content");if(O.length){switch(X({container:O}),h){case"config":Dt(p,O);break;case"prompts":await uc(p,O);break;case"presets":yc(p,O);break;default:O.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-tools"></i><span>\u529F\u80FD\u5F00\u53D1\u4E2D...</span></div>')}Ae({mainTab:p,includeSubContent:!0}),ce()}}async function Sr(p,h){if(!(!A()||!h?.length||!p?.id)){X({container:h});try{let E=o.dynamicToolPanelCache.get(p.id);if(!E){let W=(await Promise.resolve().then(()=>(es(),ji)))?.createToolConfigPanel;if(typeof W!="function")throw new Error("\u901A\u7528\u5DE5\u5177\u9762\u677F\u5DE5\u5382\u4E0D\u53EF\u7528");E=()=>W({id:`${p.id}Panel`,toolId:p.id,postResponseHint:`\u70B9\u51FB\u201C\u7ACB\u5373\u6267\u884C\u4E00\u6B21\u201D\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u6267\u884C\u201C${p.name||p.id}\u201D\u3002`,extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 custom_tag
\u6216 regex:<custom_tag>([\\s\\S]*?)</custom_tag>`,previewDialogId:`${p.id}-extraction-preview`,previewTitle:`${p.name||p.id} \u63D0\u53D6\u9884\u89C8`}),o.dynamicToolPanelCache.set(p.id,E)}let R=E();R.renderTo(h),ye(h,{key:p.id,destroy:typeof R?.destroy=="function"?O=>R.destroy(O):null}),ce()}catch(E){y.current=null,console.error(`[${n}] \u81EA\u5B9A\u4E49\u5DE5\u5177\u9762\u677F\u52A0\u8F7D\u5931\u8D25:`,E),h.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u81EA\u5B9A\u4E49\u5DE5\u5177\u9762\u677F\u52A0\u8F7D\u5931\u8D25</span></div>')}}}function Tr(p,h){if(!A())return;let E=r.toolRegistryModule?.getToolConfig(p);if(!E){h.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5DE5\u5177\u914D\u7F6E\u4E0D\u5B58\u5728</span></div>');return}let R=a.currentSubTab[p]||E.subTabs?.[0]?.id||"config";h.html(`
      <div class="yyt-tool-window">
        <div class="yyt-sub-content" data-subtab="${R}">
          <!-- \u5B50\u5185\u5BB9\u5C06\u5728\u6B64\u6E32\u67D3 -->
        </div>
      </div>
    `),vt(p,R)}function Dt(p,h){if(!A())return;let E=r.toolManagerModule?.getTool(p),R=r.presetManagerModule?.getAllPresets()||[],O=r.toolRegistryModule?.getToolApiPreset(p)||"",W=R.map(F=>`<option value="${S(F.name)}" ${F.name===O?"selected":""}>${S(F.name)}</option>`).join("");h.html(`
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
              ${W}
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
              <input type="number" class="yyt-input" id="yyt-tool-timeout" value="${E?.config?.execution?.timeout||6e4}">
            </div>
            <div class="yyt-form-group yyt-flex-1">
              <label>\u91CD\u8BD5\u6B21\u6570</label>
              <input type="number" class="yyt-input" id="yyt-tool-retries" value="${E?.config?.execution?.retries||3}">
            </div>
          </div>
        </div>
      </div>
    `),Se(h,{namespace:"yytPopupToolConfigSelect",selectors:["#yyt-tool-api-preset"]}),h.find("#yyt-save-tool-preset").on("click",function(){let L=h.find("#yyt-tool-api-preset").val();r.toolRegistryModule?.setToolApiPreset(p,L);let q=s.toastr;q&&q.success("API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u4FDD\u5B58","YouYou \u5DE5\u5177\u7BB1")})}async function uc(p,h){if(!A()){h.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u63D0\u793A\u8BCD\u7F16\u8F91\u5668\u6A21\u5757\u672A\u52A0\u8F7D</span></div>');return}let R=r.toolManagerModule?.getTool(p)?.config?.messages||[],O=ic(R)||vr,W=new $o({containerId:`yyt-prompt-editor-${p}`,segments:O,onChange:L=>{let q=nc(L);v("\u63D0\u793A\u8BCD\u5DF2\u66F4\u65B0:",q.length,"\u6761\u6D88\u606F")}});h.html(`<div id="yyt-prompt-editor-${p}" class="yyt-prompt-editor-container"></div>`),W.init(h.find(`#yyt-prompt-editor-${p}`));let F=ac();if(F){let L="yyt-prompt-editor-styles",q=s.document||document;if(!q.getElementById(L)){let me=q.createElement("style");me.id=L,me.textContent=F,(q.head||q.documentElement).appendChild(me)}}}function yc(p,h){A()&&h.html(`
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
    `)}function pc(){return`
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
      </div>`}function gc(p,h,T){let E=g(),R=p.map(O=>`
      <div class="yyt-main-nav-item ${O.id===a.currentMainTab?"active":""}" data-tab="${O.id}">
        <div class="yyt-main-nav-icon">
          <i class="fa-solid ${S(O.icon||"fa-file")}"></i>
        </div>
        <div class="yyt-main-nav-copy">
          <span class="yyt-main-nav-name">${S(O.name||O.id)}</span>
          <span class="yyt-main-nav-desc">${S(O.description||"\u8FDB\u5165\u6B64\u9875\u9762\u8FDB\u884C\u914D\u7F6E\u3001\u67E5\u770B\u6216\u7EF4\u62A4\u3002")}</span>
        </div>
      </div>
    `).join("");return`
      <aside class="yyt-shell-sidebar${E?" yyt-collapsed":""}">
        <div class="yyt-shell-sidebar-card">
          <div class="yyt-shell-sidebar-title-row">
            <span class="yyt-shell-sidebar-title">\u9875\u9762\u5BFC\u822A</span>
            <span class="yyt-shell-sidebar-hint">${p.length} tabs</span>
            <button class="yyt-sidebar-toggle" title="${E?"\u5C55\u5F00\u4FA7\u680F":"\u6298\u53E0\u4FA7\u680F"}">
              <i class="fa-solid ${E?"fa-angles-right":"fa-angles-left"}"></i>
            </button>
          </div>
          <div class="yyt-main-nav">
            ${R}
          </div>
          <div class="yyt-shell-sidebar-note">
            \u4FDD\u5B58\u540E\uFF0C\u624B\u52A8\u6267\u884C\u4E0E\u5199\u56DE\u94FE\u90FD\u4F1A\u4EE5\u6700\u65B0\u914D\u7F6E\u4E3A\u51C6\u3002
          </div>
          <div class="yyt-shell-sidebar-stats">
            <div class="yyt-shell-sidebar-stat">
              <span class="yyt-shell-sidebar-stat-value">${p.length}</span>
              <span class="yyt-shell-sidebar-stat-label">\u4E3B\u9875\u9762</span>
            </div>
            <div class="yyt-shell-sidebar-stat">
              <span class="yyt-shell-sidebar-stat-value">${h}</span>
              <span class="yyt-shell-sidebar-stat-label">\u9ED8\u8BA4\u5DE5\u5177</span>
            </div>
            <div class="yyt-shell-sidebar-stat">
              <span class="yyt-shell-sidebar-stat-value">${T}</span>
              <span class="yyt-shell-sidebar-stat-label">\u81EA\u5B9A\u4E49\u5DE5\u5177</span>
            </div>
          </div>
        </div>
      </aside>`}function fc(p,h){return`
      <div class="yyt-shell-main-header">
        <div class="yyt-shell-main-heading-block">
          <div class="yyt-shell-main-title">${S(p)}</div>
          <div class="yyt-shell-main-description">${S(h)}</div>
        </div>
        <div class="yyt-shell-main-actions">
          <div class="yyt-shell-main-meta">
            <i class="fa-solid fa-circle-info"></i>
            <span>\u4FDD\u5B58\u540E\u6267\u884C\u94FE\u4F1A\u7ACB\u5373\u4F7F\u7528\u6700\u65B0\u914D\u7F6E</span>
          </div>
        </div>
      </div>`}function mc(p,h){return p.map(T=>`
      <div class="yyt-tab-content ${T.id===h?"active":""}" data-tab="${T.id}">
      </div>
    `).join("")}function bc(p){return`
      <div class="yyt-popup-footer">
        <div class="yyt-popup-footer-left">
          <div class="yyt-popup-status-cluster">
            <div class="yyt-popup-status">
              <i class="fa-solid fa-compass"></i>
              <span class="yyt-popup-active-label">\u5F53\u524D\uFF1A${S(p)}</span>
            </div>
            <div class="yyt-popup-footer-note">
              API\u3001\u5DE5\u5177\u3001\u63D0\u53D6\u4E0E\u8BCA\u65AD\u7EDF\u4E00\u5165\u53E3\u3002
            </div>
          </div>
        </div>
      </div>`}async function hc(){if(a.currentPopup){v("\u5F39\u7A97\u5DF2\u5B58\u5728");return}let p=t?.services?.loadModules;typeof p=="function"&&await p();let h=A(),T=w();if(!h){b("jQuery \u672A\u627E\u5230\uFF0C\u65E0\u6CD5\u521B\u5EFA\u5F39\u7A97");return}let E=r.toolRegistryModule?.getToolList()||[];if(!E.length){b("\u5DE5\u5177\u5217\u8868\u4E3A\u7A7A\uFF0C\u65E0\u6CD5\u521B\u5EFA\u5F39\u7A97");return}E.some(Ee=>Ee.id===a.currentMainTab)||(a.currentMainTab=E[0].id);let R=r.toolRegistryModule?.getToolConfig("tools"),O=Array.isArray(R?.subTabs)?R.subTabs:[],W=O.filter(Ee=>Ee?.isCustom).length,F=O.filter(Ee=>!Ee?.isCustom).length,L=M(a.currentMainTab),q=I(a.currentMainTab);a.currentOverlay=T.createElement("div"),a.currentOverlay.className="yyt-popup-overlay",a.currentOverlay.addEventListener("click",Ee=>{Ee.target===a.currentOverlay&&Rt()}),T.body.appendChild(a.currentOverlay);let me=g(),Oe=`
      <div class="yyt-popup" id="${l}">
        ${pc()}
        <div class="yyt-popup-body">
          <div class="yyt-popup-shell">
            <div class="yyt-shell-workspace${me?" yyt-sidebar-collapsed":""}">
              ${gc(E,F,W)}
              <section class="yyt-shell-main">
                ${fc(L,q)}
                <div class="yyt-sub-nav" style="display: none;"></div>
                <div class="yyt-content-frame">
                  <div class="yyt-content">
                    <div class="yyt-content-inner">
                      ${mc(E,a.currentMainTab)}
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
        ${bc(L)}
      </div>
    `,Qe=T.createElement("div");Qe.innerHTML=Oe,a.currentPopup=Qe.firstElementChild,T.body.appendChild(a.currentPopup),h(a.currentPopup).find(".yyt-popup-close").on("click",Rt),h(a.currentPopup).find(".yyt-sidebar-toggle").on("click",m),Ct(),h(a.currentPopup).find(".yyt-main-nav-item").on("click",function(){let be=h(this).data("tab");be&&$t(be)}),bt(),ht(a.currentMainTab);let Ze=r.toolRegistryModule?.getToolConfig(a.currentMainTab);Ze?.hasSubTabs&&(h(a.currentPopup).find(".yyt-sub-nav").show(),cs(a.currentMainTab,Ze.subTabs)),N(),Os(E),ce(),v("\u5F39\u7A97\u5DF2\u6253\u5F00")}return{openPopup:hc,closePopup:Rt,switchMainTab:$t,switchSubTab:Ns,renderTabContent:ht,renderSubTabContent:vt}}function cc(t,e={}){let{constants:s,modules:r}=t,{SCRIPT_ID:o,SCRIPT_VERSION:a}=s,{init:n,loadModules:i,addMenuItem:l,popupShell:c}=e;return{version:a,id:o,init:n,openPopup:c?.openPopup,closePopup:c?.closePopup,switchMainTab:c?.switchMainTab,switchSubTab:c?.switchSubTab,addMenuItem:l,getStorage:()=>r.storageModule,getApiConnection:()=>r.apiConnectionModule,getPresetManager:()=>r.presetManagerModule,getUi:()=>r.uiModule,getUiModule:()=>r.uiModule,getRegexExtractor:()=>r.regexExtractorModule,getToolManager:()=>r.toolManagerModule,getToolExecutor:()=>r.toolExecutorModule,getWindowManager:()=>r.windowManagerModule,getToolRegistry:()=>r.toolRegistryModule,getSettingsService:()=>r.settingsServiceModule,getBypassManager:()=>r.bypassManagerModule,getVariableResolver:()=>r.variableResolverModule,getContextInjector:()=>r.contextInjectorModule,getToolPromptService:()=>r.toolPromptServiceModule,getToolOutputService:()=>r.toolOutputServiceModule,getToolAutomationService:()=>r.toolAutomationServiceModule,async getApiConfig(){return await i(),r.apiConnectionModule?.getApiConfig?.()||null},async saveApiConfig(d){return await i(),r.apiConnectionModule?(r.apiConnectionModule.updateApiConfig(d),!0):!1},async getPresets(){return await i(),r.presetManagerModule?r.presetManagerModule.getAllPresets():[]},async sendApiRequest(d,u){if(await i(),r.apiConnectionModule)return r.apiConnectionModule.sendApiRequest(d,u);throw new Error("API\u6A21\u5757\u672A\u52A0\u8F7D")},async testApiConnection(){return await i(),r.apiConnectionModule?r.apiConnectionModule.testApiConnection():{success:!1,message:"API\u6A21\u5757\u672A\u52A0\u8F7D"}},registerTool(d,u){return r.toolRegistryModule?.registerTool(d,u)||!1},unregisterTool(d){return r.toolRegistryModule?.unregisterTool(d)||!1},getToolList(){return r.toolRegistryModule?.getToolList()||[]},createWindow(d){return r.windowManagerModule?.createWindow(d)||null},closeWindow(d){r.windowManagerModule?.closeWindow(d)},startAutomation(){return r.toolAutomationServiceModule?.toolAutomationService?.init?.()||!1},stopAutomation(){r.toolAutomationServiceModule?.toolAutomationService?.stop?.()},getAutomationRuntime(){return r.toolAutomationServiceModule?.toolAutomationService?.getRuntimeSnapshot?.()||null},cancelAutomation(d={}){return r.toolAutomationServiceModule?.toolAutomationService?.cancelAutomation?.(d)||{success:!1,error:"\u81EA\u52A8\u5316\u670D\u52A1\u672A\u52A0\u8F7D"}},async processCurrentAssistantMessage(d={}){return r.toolAutomationServiceModule?.toolAutomationService?.processCurrentAssistantMessage?.(d)||{success:!1,error:"\u81EA\u52A8\u5316\u670D\u52A1\u672A\u52A0\u8F7D"}}}}var wr="youyou_toolkit",Zy="1.0.67",ep=`${wr}-menu-item`,tp=`${wr}-menu-container`,sp=`${wr}-popup`,rp=typeof window.parent<"u"?window.parent:window,Do={constants:{SCRIPT_ID:wr,SCRIPT_VERSION:Zy,MENU_ITEM_ID:ep,MENU_CONTAINER_ID:tp,POPUP_ID:sp},topLevelWindow:rp,modules:{storageModule:null,apiConnectionModule:null,uiModule:null,presetManagerModule:null,regexExtractorModule:null,toolManagerModule:null,toolExecutorModule:null,toolTriggerModule:null,windowManagerModule:null,toolRegistryModule:null,settingsServiceModule:null,bypassManagerModule:null,variableResolverModule:null,contextInjectorModule:null,toolPromptServiceModule:null,toolOutputServiceModule:null},caches:{dynamicToolPanelCache:new Map},services:{loadModules:null},uiState:{currentPopup:null,currentOverlay:null,currentMainTab:"apiPresets",currentSubTab:{},startupScreenDismissed:!1}},dc=lc(Do),xr=oc(Do,{openPopup:dc.openPopup});Do.services.loadModules=xr.loadModules;var tn=cc(Do,{init:xr.init,loadModules:xr.loadModules,addMenuItem:xr.addMenuItem,popupShell:dc});if(typeof window<"u"&&(window.YouYouToolkit=tn,typeof window.parent<"u"&&window.parent!==window))try{window.parent.YouYouToolkit=tn}catch{}var Tm=tn;xr.init();console.log(`[${wr}] \u6A21\u5757\u52A0\u8F7D\u5B8C\u6210`);export{Tm as default};
