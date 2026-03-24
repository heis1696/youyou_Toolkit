var Va=Object.defineProperty;var j=(t,e)=>()=>(t&&(e=t(t=0)),e);var de=(t,e)=>{for(var s in e)Va(t,s,{get:e[s],enumerable:!0})};function eo(){let t=T;return t._getStorage(),t._storage}function ee(){return T.get("settings",{apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}})}function we(t){T.set("settings",t)}var mt,T,W,Zr,as,ht=j(()=>{mt=class t{constructor(e="youyou_toolkit"){this.namespace=e,this._storage=null,this._cache=new Map}_getStorage(){if(this._storage)return this._storage;try{let e=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(e.SillyTavern?.getContext){let s=e.SillyTavern.getContext();if(s?.extensionSettings)return s.extensionSettings[this.namespace]||(s.extensionSettings[this.namespace]={}),this._storage={_target:s.extensionSettings[this.namespace],getItem:n=>{let r=s.extensionSettings[this.namespace][n];return typeof r=="string"?r:r?JSON.stringify(r):null},setItem:(n,r)=>{s.extensionSettings[this.namespace][n]=r,this._saveSettings(s)},removeItem:n=>{delete s.extensionSettings[this.namespace][n],this._saveSettings(s)},_isTavern:!0},this._storage}}catch{console.warn(`[${this.namespace}] SillyTavern\u5B58\u50A8\u4E0D\u53EF\u7528\uFF0C\u4F7F\u7528localStorage`)}return this._storage={getItem:e=>{try{return localStorage.getItem(e)}catch{return null}},setItem:(e,s)=>{try{localStorage.setItem(e,s)}catch(n){console.error(`[${this.namespace}] localStorage\u5199\u5165\u5931\u8D25:`,n)}},removeItem:e=>{try{localStorage.removeItem(e)}catch{}},_isTavern:!1},this._storage}_saveSettings(e){if(typeof e.saveSettings=="function")try{e.saveSettings()}catch{}else if(typeof e.saveSettingsDebounced=="function")try{e.saveSettingsDebounced()}catch{}}get(e,s=null){let n=`${this.namespace}:${e}`;if(this._cache.has(n))return this._cache.get(n);let r=this._getStorage(),o=this._getFullKey(e),a=r.getItem(o);if(a===null)return s;try{let i=JSON.parse(a);return this._cache.set(n,i),i}catch{return a}}set(e,s){let n=this._getStorage(),r=this._getFullKey(e),o=`${this.namespace}:${e}`;this._cache.set(o,s);try{n.setItem(r,JSON.stringify(s))}catch(a){console.error(`[${this.namespace}] \u5B58\u50A8\u5931\u8D25:`,a)}}remove(e){let s=this._getStorage(),n=this._getFullKey(e),r=`${this.namespace}:${e}`;this._cache.delete(r),s.removeItem(n)}has(e){let s=this._getStorage(),n=this._getFullKey(e);return s.getItem(n)!==null}clear(){if(this._getStorage()._isTavern){let s=typeof window.parent<"u"?window.parent:window;if(s.SillyTavern?.getContext){let n=s.SillyTavern.getContext();n?.extensionSettings?.[this.namespace]&&(n.extensionSettings[this.namespace]={},this._saveSettings(n))}}else{let s=`${this.namespace}_`,n=[];for(let r=0;r<localStorage.length;r++){let o=localStorage.key(r);o&&o.startsWith(s)&&n.push(o)}n.forEach(r=>localStorage.removeItem(r))}this._cache.clear()}_getFullKey(e){return this._getStorage()._isTavern?e:`${this.namespace}_${e}`}namespace(e){return new t(`${this.namespace}:${e}`)}getMultiple(e){let s={};return e.forEach(n=>{s[n]=this.get(n)}),s}setMultiple(e){Object.entries(e).forEach(([s,n])=>{this.set(s,n)})}exportAll(){let e=this._getStorage(),s={};if(e._isTavern){let n=typeof window.parent<"u"?window.parent:window;if(n.SillyTavern?.getContext){let o=n.SillyTavern.getContext()?.extensionSettings?.[this.namespace]||{};Object.entries(o).forEach(([a,i])=>{s[a]=typeof i=="string"?JSON.parse(i):i})}}else{let n=`${this.namespace}_`;for(let r=0;r<localStorage.length;r++){let o=localStorage.key(r);if(o&&o.startsWith(n)){let a=o.slice(n.length);try{s[a]=JSON.parse(localStorage.getItem(o))}catch{s[a]=localStorage.getItem(o)}}}}return s}},T=new mt("youyou_toolkit"),W=new mt("youyou_toolkit:tools"),Zr=new mt("youyou_toolkit:presets"),as=new mt("youyou_toolkit:windows")});var so={};de(so,{DEFAULT_API_PRESETS:()=>Ja,DEFAULT_SETTINGS:()=>qa,STORAGE_KEYS:()=>is,StorageService:()=>mt,deepMerge:()=>to,getCurrentPresetName:()=>bt,getStorage:()=>eo,loadApiPresets:()=>ge,loadSettings:()=>ee,presetStorage:()=>Zr,saveApiPresets:()=>at,saveSettings:()=>we,setCurrentPresetName:()=>jt,storage:()=>T,toolStorage:()=>W,windowStorage:()=>as});function ge(){return T.get(is.API_PRESETS)||[]}function at(t){T.set(is.API_PRESETS,t)}function bt(){return T.get(is.CURRENT_PRESET)||""}function jt(t){T.set(is.CURRENT_PRESET,t||"")}function to(t,e){let s=r=>r&&typeof r=="object"&&!Array.isArray(r),n={...t};return s(t)&&s(e)&&Object.keys(e).forEach(r=>{s(e[r])?r in t?n[r]=to(t[r],e[r]):Object.assign(n,{[r]:e[r]}):Object.assign(n,{[r]:e[r]})}),n}var is,qa,Ja,ls=j(()=>{ht();ht();is={SETTINGS:"settings",API_PRESETS:"api_presets",CURRENT_PRESET:"current_preset",TOOLS:"tools",TOOL_PRESETS:"tool_presets",CURRENT_TOOL_PRESET:"current_tool_preset",BYPASS_PRESETS:"bypass_presets",CURRENT_BYPASS_PRESET:"current_bypass_preset",BYPASS_ENABLED:"bypass_enabled"},qa={apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}},Ja=[]});var oo={};de(oo,{API_STATUS:()=>Xa,fetchAvailableModels:()=>Ln,getApiConfig:()=>xt,getEffectiveApiConfig:()=>cs,hasEffectiveApiPreset:()=>$n,sendApiRequest:()=>Nn,sendWithPreset:()=>Za,testApiConnection:()=>oi,updateApiConfig:()=>Ft,validateApiConfig:()=>Ht});function Dn(t,e={}){let s=new Error(t);return s.allowDirectFallback=e.allowDirectFallback===!0,s}function no(t,e="chat_completions"){let s=String(t||"").trim();if(!s)return"";let n=null;try{n=new URL(s)}catch{return s}let r=n.pathname.replace(/\/+$/,""),o=r;return e==="chat_completions"?!/\/chat\/completions$/i.test(r)&&!/\/completions$/i.test(r)&&(o=`${r||""}/chat/completions`):e==="models"&&(/\/chat\/completions$/i.test(r)?o=r.replace(/\/chat\/completions$/i,"/models"):/\/completions$/i.test(r)?o=r.replace(/\/completions$/i,"/models"):/\/models$/i.test(r)||(o=`${r||""}/models`)),n.pathname=o.replace(/\/+/g,"/"),n.toString()}function Qa(t){let e=String(t||"").trim();if(!e)return"";try{let s=new URL(e);return s.pathname=s.pathname.replace(/\/chat\/completions$/i,"").replace(/\/completions$/i,"").replace(/\/models$/i,"").replace(/\/+$/,"")||"/",s.toString().replace(/\/$/,"")}catch{return e.replace(/\/chat\/completions$/i,"").replace(/\/completions$/i,"").replace(/\/models$/i,"").replace(/\/+$/,"")}}function xt(){return ee().apiConfig||{}}function Ft(t){let e=ee();e.apiConfig={...e.apiConfig,...t},we(e)}function Ht(t){let e=[];if(t.useMainApi)return{valid:!0,errors:[]};if(!t.url||!t.url.trim())e.push("API URL \u4E0D\u80FD\u4E3A\u7A7A");else try{new URL(t.url)}catch{e.push("API URL \u683C\u5F0F\u65E0\u6548")}return(!t.model||!t.model.trim())&&e.push("\u6A21\u578B\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"),{valid:e.length===0,errors:e}}function cs(t=""){let e=ee(),s=t||bt()||"";if(s){let r=(ge()||[]).find(o=>o.name===s);if(r&&r.apiConfig)return{...r.apiConfig,presetName:r.name}}return e.apiConfig||{}}function $n(t=""){return t?(ge()||[]).some(s=>s?.name===t):!1}async function Za(t,e,s={},n=null){let r=cs(t);return await Nn(e,{...s,apiConfig:r},n)}function ro(t,e={}){let s=e.apiConfig||xt();return{messages:t,model:s.model||"gpt-3.5-turbo",max_tokens:s.max_tokens||4096,temperature:s.temperature??.7,top_p:s.top_p??.9,stream:!1,...e.extraParams}}function On(t){let e="";if(t?.choices&&t.choices[0]?.message?.content)e=t.choices[0].message.content;else if(t?.content)e=t.content;else if(t?.text)e=t.text;else if(t?.response)e=t.response;else throw new Error(`\u65E0\u6CD5\u89E3\u6790API\u54CD\u5E94\u683C\u5F0F: ${JSON.stringify(t).slice(0,200)}`);return String(e||"").trim()}async function Nn(t,e={},s=null){let n=e.apiConfig||xt(),r=n.useMainApi,o=Ht(n);if(!o.valid&&!r)throw new Error(`API\u914D\u7F6E\u65E0\u6548: ${o.errors.join(", ")}`);return r?await ei(t,e,s):await ti(t,n,e,s)}async function ei(t,e,s){let n=typeof window.parent<"u"?window.parent:window;if(!n.TavernHelper?.generateRaw)throw new Error("TavernHelper.generateRaw \u4E0D\u53EF\u7528\u3002\u8BF7\u68C0\u67E5SillyTavern\u7248\u672C\u3002");try{let r=await n.TavernHelper.generateRaw({ordered_prompts:t,should_stream:!1,...e.extraParams});if(typeof r!="string")throw new Error("\u4E3BAPI\u8FD4\u56DE\u4E86\u975E\u9884\u671F\u7684\u54CD\u5E94\u7C7B\u578B");return r.trim()}catch(r){throw r.name==="AbortError"?r:new Error(`\u4E3BAPI\u8BF7\u6C42\u5931\u8D25: ${r.message}`)}}async function ti(t,e,s,n){let r=typeof window.parent<"u"?window.parent:window;if(r.TavernHelper?.generateRaw)try{return await si(t,e,s,n,r)}catch(o){console.warn("[youyou_toolkit] TavernHelper \u81EA\u5B9A\u4E49\u8BF7\u6C42\u5931\u8D25\uFF0C\u56DE\u9000\u5230\u540E\u5907\u94FE\u8DEF:",o)}if(r.SillyTavern?.getRequestHeaders)try{return await ni(t,e,s,n,r)}catch(o){if(!o?.allowDirectFallback)throw o}return await ri(t,e,s,n)}async function si(t,e,s,n,r){if(n?.aborted)throw new DOMException("\u8BF7\u6C42\u5DF2\u53D6\u6D88","AbortError");let o=await r.TavernHelper.generateRaw({ordered_prompts:t,should_stream:!1,max_chat_history:0,custom_api:{apiurl:Qa(e.url),key:e.apiKey||"",model:e.model||"gpt-3.5-turbo",max_tokens:e.max_tokens||4096,temperature:e.temperature??.7,top_p:e.top_p??.9},...s.extraParams||{}});return typeof o=="string"?o.trim():On(o)}async function ni(t,e,s,n,r){let o=String(e.url||"").trim(),a={...ro(t,{apiConfig:e,...s}),chat_completion_source:"custom",reverse_proxy:o,proxy_password:"",custom_url:o,custom_include_headers:e.apiKey?`Authorization: Bearer ${e.apiKey}`:""},i={...typeof r.SillyTavern?.getRequestHeaders=="function"?r.SillyTavern.getRequestHeaders():{},"Content-Type":"application/json"},l=null;try{l=await fetch("/api/backends/chat-completions/generate",{method:"POST",headers:i,body:JSON.stringify(a),signal:n})}catch(d){throw d?.name==="AbortError"?d:Dn(`\u9152\u9986\u540E\u7AEF\u8F6C\u53D1\u8BF7\u6C42\u4E0D\u53EF\u7528\uFF0C\u5DF2\u5C1D\u8BD5\u56DE\u9000\u5230\u6D4F\u89C8\u5668\u76F4\u8FDE\u3002\u539F\u59CB\u9519\u8BEF: ${d.message}`,{allowDirectFallback:!0})}let c=await l.text().catch(()=>"");if(!l.ok){let d=[404,405,501,502].includes(l.status);throw Dn(`\u9152\u9986\u540E\u7AEF\u8F6C\u53D1\u8BF7\u6C42\u5931\u8D25 (${l.status}): ${c||"Unknown error"}`,{allowDirectFallback:d})}let u=null;try{u=c?JSON.parse(c):{}}catch{let h=String(c||"").replace(/\s+/g," ").trim().slice(0,120);throw Dn(`\u9152\u9986\u540E\u7AEF\u8FD4\u56DE\u4E86\u975EJSON\u5185\u5BB9\u3002\u54CD\u5E94\u7247\u6BB5: ${h||"(\u7A7A\u54CD\u5E94)"}`)}return On(u)}async function ri(t,e,s,n){let r=ro(t,{apiConfig:e,...s}),o=no(e.url,"chat_completions"),a={"Content-Type":"application/json"};e.apiKey&&(a.Authorization=`Bearer ${e.apiKey}`);let i=await fetch(o,{method:"POST",headers:a,body:JSON.stringify(r),signal:n}),l=await i.text().catch(()=>"");if(!i.ok){let u=l||"Unknown error";throw new Error(`API\u8BF7\u6C42\u5931\u8D25 (${i.status}): ${u}`)}let c=null;try{c=l?JSON.parse(l):{}}catch{let d=String(l||"").replace(/\s+/g," ").trim().slice(0,120);throw new Error(`\u81EA\u5B9A\u4E49API\u8FD4\u56DE\u7684\u4E0D\u662FJSON\uFF0C\u53EF\u80FD\u662FURL\u914D\u7F6E\u9519\u8BEF\u3001\u53EA\u586B\u5199\u4E86\u7AD9\u70B9\u9996\u9875/\u57FA\u7840\u8DEF\u5F84\u3001\u6216\u8BF7\u6C42\u88AB\u91CD\u5B9A\u5411\u3002\u5F53\u524D\u4F1A\u81EA\u52A8\u5C1D\u8BD5\u8865\u5168 chat/completions \u7AEF\u70B9\uFF1B\u82E5\u4ECD\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5API URL\uFF0C\u6216\u6539\u4E3A\u542F\u7528\u201C\u4F7F\u7528SillyTavern\u4E3BAPI\u201D\u3002\u54CD\u5E94\u7247\u6BB5: ${d||"(\u7A7A\u54CD\u5E94)"}`)}return On(c)}async function oi(t=null){let e=t||xt(),s=Date.now();try{await Nn([{role:"user",content:'Hello, this is a connection test. Please respond with "OK".'}],{apiConfig:e});let r=Date.now()-s;return{success:!0,message:`\u8FDE\u63A5\u6210\u529F (\u5EF6\u8FDF: ${r}ms)`,latency:r}}catch(n){return{success:!1,message:`\u8FDE\u63A5\u5931\u8D25: ${n.message}`,latency:Date.now()-s}}}async function Ln(t=null){let e=t||xt();return e.useMainApi?await ai():await ii(e)}async function ai(){let t=typeof window.parent<"u"?window.parent:window;try{if(t.SillyTavern?.getContext){let e=t.SillyTavern.getContext();if(e.settings?.api_server)return[e.settings.api_server]}return["gpt-4","gpt-4-turbo","gpt-3.5-turbo","claude-3-opus","claude-3-sonnet"]}catch{return["gpt-4","gpt-3.5-turbo"]}}async function ii(t){if(!t.url||!t.apiKey)return[];try{let e=no(t.url,"models"),s=await fetch(e,{method:"GET",headers:{Authorization:`Bearer ${t.apiKey}`}});if(!s.ok)return[];let n=await s.json();return n.data&&Array.isArray(n.data)?n.data.map(r=>r.id||r.name).filter(Boolean).sort():[]}catch{return[]}}var Xa,Ds=j(()=>{ls();Xa={IDLE:"idle",CONNECTING:"connecting",SUCCESS:"success",ERROR:"error"}});var ao={};de(ao,{createPreset:()=>$s,createPresetFromCurrentConfig:()=>ui,deletePreset:()=>Os,duplicatePreset:()=>di,exportPresets:()=>jn,generateUniquePresetName:()=>Hn,getActiveConfig:()=>zn,getActivePresetName:()=>Ns,getAllPresets:()=>Kt,getPreset:()=>It,getPresetNames:()=>li,getStarredPresets:()=>Bn,importPresets:()=>Fn,presetExists:()=>ds,renamePreset:()=>ci,switchToPreset:()=>Mt,togglePresetStar:()=>Gn,updatePreset:()=>Un,validatePreset:()=>pi});function Kt(){return ge()}function li(){return ge().map(e=>e.name)}function It(t){return!t||typeof t!="string"?null:ge().find(s=>s.name===t)||null}function ds(t){return!t||typeof t!="string"?!1:ge().some(s=>s.name===t)}function $s(t){let{name:e,description:s,apiConfig:n}=t;if(!e||typeof e!="string"||!e.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let r=e.trim();if(ds(r))return{success:!1,message:`\u9884\u8BBE "${r}" \u5DF2\u5B58\u5728`};let o={name:r,description:s||"",apiConfig:{url:n?.url||"",apiKey:n?.apiKey||"",model:n?.model||"",useMainApi:n?.useMainApi??!0,max_tokens:n?.max_tokens||4096,temperature:n?.temperature??.7,top_p:n?.top_p??.9},createdAt:Date.now(),updatedAt:Date.now()},a=ge();return a.push(o),at(a),{success:!0,message:`\u9884\u8BBE "${r}" \u521B\u5EFA\u6210\u529F`,preset:o}}function Un(t,e){if(!t||typeof t!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let s=ge(),n=s.findIndex(a=>a.name===t);if(n===-1)return{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if(e.name&&e.name!==t)return{success:!1,message:"\u4E0D\u652F\u6301\u4FEE\u6539\u9884\u8BBE\u540D\u79F0\uFF0C\u8BF7\u521B\u5EFA\u65B0\u9884\u8BBE"};let r=s[n],o={...r,...e,name:r.name,updatedAt:Date.now()};return e.apiConfig&&(o.apiConfig={...r.apiConfig,...e.apiConfig}),s[n]=o,at(s),{success:!0,message:`\u9884\u8BBE "${t}" \u66F4\u65B0\u6210\u529F`,preset:o}}function Os(t){if(!t||typeof t!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let e=ge(),s=e.findIndex(n=>n.name===t);return s===-1?{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`}:(e.splice(s,1),at(e),bt()===t&&jt(""),{success:!0,message:`\u9884\u8BBE "${t}" \u5DF2\u5220\u9664`})}function ci(t,e){if(!t||typeof t!="string")return{success:!1,message:"\u539F\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};if(!e||typeof e!="string"||!e.trim())return{success:!1,message:"\u65B0\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let s=e.trim();if(!ds(t))return{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if(ds(s))return{success:!1,message:`\u9884\u8BBE "${s}" \u5DF2\u5B58\u5728`};let n=ge(),r=n.find(o=>o.name===t);return r&&(r.name=s,r.updatedAt=Date.now(),at(n),bt()===t&&jt(s)),{success:!0,message:`\u9884\u8BBE\u5DF2\u91CD\u547D\u540D\u4E3A "${s}"`}}function di(t,e){if(!t||typeof t!="string")return{success:!1,message:"\u6E90\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};if(!e||typeof e!="string"||!e.trim())return{success:!1,message:"\u76EE\u6807\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let s=e.trim(),n=It(t);if(!n)return{success:!1,message:`\u6E90\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`};if(ds(s))return{success:!1,message:`\u9884\u8BBE "${s}" \u5DF2\u5B58\u5728`};let r={...JSON.parse(JSON.stringify(n)),name:s,createdAt:Date.now(),updatedAt:Date.now()},o=ge();return o.push(r),at(o),{success:!0,message:`\u9884\u8BBE\u5DF2\u590D\u5236\u4E3A "${s}"`,preset:r}}function Gn(t){if(!t||typeof t!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let e=ge(),s=e.find(n=>n.name===t);return s?(s.starred=!s.starred,s.updatedAt=Date.now(),at(e),{success:!0,message:s.starred?`\u5DF2\u5C06 "${t}" \u6DFB\u52A0\u5230\u9884\u89C8\u5217\u8868`:`\u5DF2\u5C06 "${t}" \u4ECE\u9884\u89C8\u5217\u8868\u79FB\u9664`,starred:s.starred}):{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`}}function Bn(){return ge().filter(e=>e.starred===!0)}function Mt(t){if(!t)return jt(""),{success:!0,message:"\u5DF2\u5207\u6362\u5230\u5F53\u524DAPI\u914D\u7F6E"};let e=It(t);return e?(jt(t),{success:!0,message:`\u5DF2\u5207\u6362\u5230\u9884\u8BBE "${t}"`,apiConfig:e.apiConfig}):{success:!1,message:`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`}}function Ns(){return bt()}function zn(){let t=bt();if(t){let s=It(t);if(s)return{presetName:t,apiConfig:s.apiConfig}}return{presetName:"",apiConfig:ee().apiConfig||{}}}function jn(t=null){if(t){let s=It(t);if(!s)throw new Error(`\u9884\u8BBE "${t}" \u4E0D\u5B58\u5728`);return JSON.stringify(s,null,2)}let e=ge();return JSON.stringify(e,null,2)}function Fn(t,e={overwrite:!1}){let s;try{s=JSON.parse(t)}catch{return{success:!1,message:"JSON\u89E3\u6790\u5931\u8D25",imported:0}}let n=Array.isArray(s)?s:[s];if(n.length===0)return{success:!1,message:"\u6CA1\u6709\u627E\u5230\u6709\u6548\u7684\u9884\u8BBE\u6570\u636E",imported:0};let r=ge(),o=0;for(let a of n){if(!a.name||typeof a.name!="string"||!a.apiConfig||typeof a.apiConfig!="object")continue;let i=r.findIndex(l=>l.name===a.name);i>=0?e.overwrite&&(a.updatedAt=Date.now(),r[i]=a,o++):(a.createdAt=a.createdAt||Date.now(),a.updatedAt=Date.now(),r.push(a),o++)}return o>0&&at(r),{success:!0,message:`\u6210\u529F\u5BFC\u5165 ${o} \u4E2A\u9884\u8BBE`,imported:o}}function ui(t,e=""){let s=ee();return $s({name:t,description:e,apiConfig:s.apiConfig})}function pi(t){let e=[];return(!t.name||typeof t.name!="string"||!t.name.trim())&&e.push("\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"),(!t.apiConfig||typeof t.apiConfig!="object")&&e.push("\u7F3A\u5C11API\u914D\u7F6E"),{valid:e.length===0,errors:e}}function Hn(t){(!t||typeof t!="string")&&(t="\u65B0\u9884\u8BBE");let e=ge(),s=new Set(e.map(r=>r.name));if(!s.has(t))return t;let n=1;for(;s.has(`${t} (${n})`);)n++;return`${t} (${n})`}var Ls=j(()=>{ls()});var I,Kn,P,Se=j(()=>{I={STORAGE_CHANGED:"storage:changed",STORAGE_CLEARED:"storage:cleared",PRESET_CREATED:"preset:created",PRESET_UPDATED:"preset:updated",PRESET_DELETED:"preset:deleted",PRESET_ACTIVATED:"preset:activated",PRESET_IMPORTED:"preset:imported",PRESET_EXPORTED:"preset:exported",API_CONFIG_UPDATED:"api:configUpdated",API_REQUEST_START:"api:requestStart",API_REQUEST_SUCCESS:"api:requestSuccess",API_REQUEST_ERROR:"api:requestError",API_CONNECTION_TESTED:"api:connectionTested",TOOL_REGISTERED:"tool:registered",TOOL_UNREGISTERED:"tool:unregistered",TOOL_UPDATED:"tool:updated",TOOL_ENABLED:"tool:enabled",TOOL_DISABLED:"tool:disabled",TOOL_EXECUTING:"tool:executing",TOOL_EXECUTED:"tool:executed",TOOL_ERROR:"tool:error",TOOL_EXECUTION_STARTED:"tool:executionStarted",TOOL_EXECUTION_FAILED:"tool:executionFailed",TOOL_TRIGGER_INITIALIZED:"tool:triggerInitialized",REGEX_RULE_ADDED:"regex:ruleAdded",REGEX_RULE_UPDATED:"regex:ruleUpdated",REGEX_RULE_DELETED:"regex:ruleDeleted",REGEX_RULES_CLEARED:"regex:rulesCleared",REGEX_PRESET_LOADED:"regex:presetLoaded",REGEX_EXTRACTED:"regex:extracted",UI_INITIALIZED:"ui:initialized",UI_RENDER_REQUESTED:"ui:renderRequested",UI_TAB_CHANGED:"ui:tabChanged",UI_SUBTAB_CHANGED:"ui:subTabChanged",UI_POPUP_OPENED:"ui:popupOpened",UI_POPUP_CLOSED:"ui:popupClosed",UI_WINDOW_CREATED:"ui:windowCreated",UI_WINDOW_CLOSED:"ui:windowClosed",TRIGGER_REGISTERED:"trigger:registered",TRIGGER_UNREGISTERED:"trigger:unregistered",TRIGGER_FIRED:"trigger:fired",APP_INITIALIZING:"app:initializing",APP_INITIALIZED:"app:initialized",APP_ERROR:"app:error",SETTINGS_UPDATED:"settings:updated",TOOL_CONTEXT_INJECTED:"tool:contextInjected",TOOL_CONTEXT_CLEARED:"tool:contextCleared",BYPASS_PRESET_CREATED:"bypass:presetCreated",BYPASS_PRESET_UPDATED:"bypass:presetUpdated",BYPASS_PRESET_DELETED:"bypass:presetDeleted",BYPASS_PRESET_ACTIVATED:"bypass:presetActivated",TOOL_EXECUTION_REQUESTED:"tool:executionRequested",TOOL_OUTPUT_MODE_CHANGED:"tool:outputModeChanged"},Kn=class{constructor(){this.listeners=new Map,this.onceCallbacks=new Map,this.history=[],this.maxHistorySize=100,this.debugMode=!1}on(e,s,n={}){if(!e||typeof s!="function")return console.warn("[EventBus] \u65E0\u6548\u7684\u4E8B\u4EF6\u6216\u56DE\u8C03"),()=>{};let{priority:r=0}=n;this.listeners.has(e)||this.listeners.set(e,new Set);let o={callback:s,priority:r};return this.listeners.get(e).add(o),this.debugMode&&console.log(`[EventBus] \u8BA2\u9605: ${e}`),()=>this.off(e,s)}off(e,s){let n=this.listeners.get(e);if(n){for(let r of n)if(r.callback===s){n.delete(r);break}this.debugMode&&console.log(`[EventBus] \u53D6\u6D88\u8BA2\u9605: ${e}`)}}emit(e,s){this.debugMode&&console.log(`[EventBus] \u53D1\u5E03: ${e}`,s),this._addToHistory(e,s);let n=this.listeners.get(e);if(!n||n.size===0)return;let r=Array.from(n).sort((o,a)=>a.priority-o.priority);for(let{callback:o}of r)try{o(s)}catch(a){console.error(`[EventBus] \u4E8B\u4EF6\u5904\u7406\u9519\u8BEF (${e}):`,a)}}once(e,s){let n=r=>{this.off(e,n),s(r)};return this.on(e,n)}wait(e,s=0){return new Promise((n,r)=>{let o=null,a=this.once(e,i=>{o&&clearTimeout(o),n(i)});s>0&&(o=setTimeout(()=>{a(),r(new Error(`\u7B49\u5F85\u4E8B\u4EF6\u8D85\u65F6: ${e}`))},s))})}hasListeners(e){let s=this.listeners.get(e);return s&&s.size>0}listenerCount(e){let s=this.listeners.get(e);return s?s.size:0}removeAllListeners(e){e?this.listeners.delete(e):this.listeners.clear()}setDebugMode(e){this.debugMode=e}_addToHistory(e,s){this.history.push({event:e,data:s,timestamp:Date.now()}),this.history.length>this.maxHistorySize&&this.history.shift()}getHistory(e){return e?this.history.filter(s=>s.event===e):[...this.history]}clearHistory(){this.history=[]}},P=new Kn});function v(t){return typeof t!="string"?"":t.replace(/&/g,"&").replace(/</g,"<").replace(/>/g,">").replace(/"/g,'"').replace(/'/g,"&#039;")}function m(t,e,s=3e3){e||(e=t==="error"?"\u64CD\u4F5C\u5931\u8D25":"\u64CD\u4F5C\u5B8C\u6210");let n=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(n.toastr){n.toastr[t](e,"YouYou \u5DE5\u5177\u7BB1",{timeOut:s,progressBar:!0});return}yi(t,e,s),console.log(`[YouYou \u5DE5\u5177\u7BB1] [${t.toUpperCase()}] ${e}`)}function Ve(t,e,s={}){e||(e=t==="error"?"\u64CD\u4F5C\u5931\u8D25":"\u64CD\u4F5C\u5B8C\u6210");let{duration:n=3500,sticky:r=!1,noticeId:o=""}=s,a=typeof window.parent<"u"&&window.parent!==window?window.parent.document:document;if(!a?.body){m(t,e,n);return}let i="yyt-top-notice-container",l="yyt-top-notice-styles",c=a.getElementById(i);if(c||(c=a.createElement("div"),c.id=i,c.style.cssText=`
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
    `,a.body.appendChild(c)),!a.getElementById(l)){let F=a.createElement("style");F.id=l,F.textContent=`
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
    `,a.head.appendChild(F)}if(o){let F=c.querySelector(`[data-notice-id="${o}"]`);F&&F.remove()}let u={success:"\u2713",error:"!",warning:"\u2022",info:"i"},d=a.createElement("div");d.className=`yyt-top-notice yyt-top-notice--${t||"info"}`,o&&(d.dataset.noticeId=o);let h=a.createElement("span");h.className="yyt-top-notice__icon",h.textContent=u[t]||u.info;let g=a.createElement("div");g.className="yyt-top-notice__content",g.textContent=e;let b=a.createElement("button");b.className="yyt-top-notice__close",b.type="button",b.setAttribute("aria-label","\u5173\u95ED\u901A\u77E5"),b.textContent="\xD7";let G=()=>{d.style.animation="yyt-top-notice-out 0.18s ease forwards",setTimeout(()=>d.remove(),180)};b.addEventListener("click",G),d.appendChild(h),d.appendChild(g),d.appendChild(b),c.appendChild(d),r||setTimeout(G,n)}function yi(t,e,s){let n=typeof window.parent<"u"&&window.parent!==window?window.parent.document:document;if(!n)return;let r=n.getElementById("yyt-fallback-toast");r&&r.remove();let o={success:{bg:"rgba(74, 222, 128, 0.9)",border:"#22c55e"},error:{bg:"rgba(248, 113, 113, 0.9)",border:"#ef4444"},warning:{bg:"rgba(251, 191, 36, 0.9)",border:"#f59e0b"},info:{bg:"rgba(123, 183, 255, 0.9)",border:"#7bb7ff"}},a=o[t]||o.info,i=n.createElement("div");if(i.id="yyt-fallback-toast",i.style.cssText=`
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
  `,i.textContent=e,!n.getElementById("yyt-toast-styles")){let l=n.createElement("style");l.id="yyt-toast-styles",l.textContent=`
      @keyframes yyt-toast-in {
        from { opacity: 0; transform: translateX(100px); }
        to { opacity: 1; transform: translateX(0); }
      }
      @keyframes yyt-toast-out {
        from { opacity: 1; transform: translateX(0); }
        to { opacity: 0; transform: translateX(100px); }
      }
    `,n.head.appendChild(l)}n.body.appendChild(i),setTimeout(()=>{i.style.animation="yyt-toast-out 0.3s ease forwards",setTimeout(()=>{i.remove()},300)},s)}function H(){if(Pt)return Pt;if(typeof window.parent<"u"&&window.parent!==window)try{if(window.parent.jQuery)return Pt=window.parent.jQuery,Pt}catch{}return window.jQuery&&(Pt=window.jQuery),Pt}function gi(){Pt=null}function V(t){return t&&t.length>0}function vt(t,e=y){if(!H()||!V(t))return{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9};let n=t.find(`#${e}-model`).val()?.trim()||"",r=t.find(`#${e}-model-select`);return r.is(":visible")&&(n=r.val()||n),{url:t.find(`#${e}-api-url`).val()?.trim()||"",apiKey:t.find(`#${e}-api-key`).val()||"",model:n,useMainApi:t.find(`#${e}-use-main-api`).is(":checked"),max_tokens:parseInt(t.find(`#${e}-max-tokens`).val())||4096,temperature:parseFloat(t.find(`#${e}-temperature`).val())??.7,top_p:parseFloat(t.find(`#${e}-top-p`).val())??.9}}function Rt(t,e,s=y){if(!H()||!V(t)||!e)return;t.find(`#${s}-api-url`).val(e.url||""),t.find(`#${s}-api-key`).val(e.apiKey||""),t.find(`#${s}-model`).val(e.model||""),t.find(`#${s}-max-tokens`).val(e.max_tokens||4096),t.find(`#${s}-temperature`).val(e.temperature??.7),t.find(`#${s}-top-p`).val(e.top_p??.9);let r=e.useMainApi??!0;t.find(`#${s}-use-main-api`).prop("checked",r);let a=t.find(`#${s}-custom-api-fields`);r?a.addClass("yyt-disabled").find("input, button, select").prop("disabled",!0):a.removeClass("yyt-disabled").find("input, button, select").prop("disabled",!1),t.find(`#${s}-model`).show(),t.find(`#${s}-model-select`).hide()}function Yn(t){let{id:e,title:s,body:n,width:r="380px",wide:o=!1}=t;return`
    <div class="yyt-dialog-overlay" id="${e}-overlay">
      <div class="yyt-dialog ${o?"yyt-dialog-wide":""}" style="${r!=="380px"?`width: ${r};`:""} max-height: calc(100vh - 32px);">
        <div class="yyt-dialog-header">
          <span class="yyt-dialog-title">${s}</span>
          <button class="yyt-dialog-close" id="${e}-close">
            <i class="fa-solid fa-times"></i>
          </button>
        </div>
        <div class="yyt-dialog-body" style="overflow-y: auto; overflow-x: hidden; max-height: calc(100vh - 160px);">
          ${n}
        </div>
        <div class="yyt-dialog-footer">
          <button class="yyt-btn yyt-btn-secondary" id="${e}-cancel">\u53D6\u6D88</button>
          <button class="yyt-btn yyt-btn-primary" id="${e}-save">\u4FDD\u5B58</button>
        </div>
      </div>
    </div>
  `}function Wn(t,e,s={}){if(!H())return()=>{};let r=t.find(`#${e}-overlay`),o=()=>{r.remove(),s.onClose&&s.onClose()};return r.find(`#${e}-close, #${e}-cancel`).on("click",o),r.on("click",function(a){a.target===this&&o()}),r.find(`#${e}-save`).on("click",function(){s.onSave&&s.onSave(o)}),o}function it(t,e){let s=new Blob([t],{type:"application/json"}),n=URL.createObjectURL(s),r=document.createElement("a");r.href=n,r.download=e,r.click(),URL.revokeObjectURL(n)}function lt(t){return new Promise((e,s)=>{let n=new FileReader;n.onload=r=>e(r.target.result),n.onerror=r=>s(new Error("\u6587\u4EF6\u8BFB\u53D6\u5931\u8D25")),n.readAsText(t)})}var y,Pt,qe=j(()=>{y="youyou_toolkit";Pt=null});var us,ae,Vn=j(()=>{Se();qe();us=class{constructor(){this.components=new Map,this.activeInstances=new Map,this.dependencies={},this.currentTab="main",this.currentSubTab={},this.initialized=!1}init(e={}){this.initialized||(this.dependencies=e.services||{},this._subscribeEvents(),this.initialized=!0,P.emit(I.UI_INITIALIZED),console.log("[UIManager] \u521D\u59CB\u5316\u5B8C\u6210"))}register(e,s){return!e||!s?(console.warn("[UIManager] \u65E0\u6548\u7684\u7EC4\u4EF6\u6CE8\u518C"),!1):(this.components.set(e,{id:e,...s,render:s.render||(()=>""),bindEvents:s.bindEvents||(()=>{}),destroy:s.destroy||(()=>{}),getStyles:s.getStyles||(()=>"")}),!0)}unregister(e){this.destroyInstance(e),this.components.delete(e)}getComponent(e){return this.components.get(e)}render(e,s,n={}){let r=H();if(!r){console.error("[UIManager] jQuery\u4E0D\u53EF\u7528");return}let o=this.components.get(e);if(!o){console.warn(`[UIManager] \u7EC4\u4EF6\u4E0D\u5B58\u5728: ${e}`);return}let a;if(typeof s=="string"?a=r(s):s&&s.jquery?a=s:s&&(a=r(s)),!V(a)){console.warn("[UIManager] \u5BB9\u5668\u4E0D\u5B58\u5728");return}this.destroyInstance(e);let i=o.render({...n,dependencies:this.dependencies});a.html(i),o.bindEvents(a,this.dependencies),this.activeInstances.set(e,{container:a,component:o,props:n}),P.emit(I.UI_RENDER_REQUESTED,{componentId:e})}destroyInstance(e){let s=this.activeInstances.get(e);s&&(s.component.destroy(s.container),this.activeInstances.delete(e))}switchTab(e){let s=this.currentTab;this.currentTab=e,P.emit(I.UI_TAB_CHANGED,{tabId:e,oldTab:s})}getCurrentTab(){return this.currentTab}switchSubTab(e,s){this.currentSubTab[e]=s,P.emit(I.UI_SUBTAB_CHANGED,{mainTab:e,subTab:s})}getCurrentSubTab(e){return this.currentSubTab[e]||""}getAllStyles(){let e="";return this.components.forEach((s,n)=>{s.getStyles&&(e+=s.getStyles())}),e}injectStyles(e=document){let s="yyt-component-styles";if(e.getElementById(s))return;let n=e.createElement("style");n.id=s,n.textContent=this.getAllStyles(),(e.head||e.documentElement).appendChild(n)}setDependency(e,s){this.dependencies[e]=s}getDependency(e){return this.dependencies[e]}_subscribeEvents(){P.on(I.PRESET_UPDATED,()=>{}),P.on(I.TOOL_UPDATED,()=>{})}},ae=new us});function Us(t){return String(t||"").trim()}var Je,Le,qn=j(()=>{Se();qe();Ds();Ls();Je=null;Le={id:"apiPresetPanel",render(t){let e=zn(),s=e?.apiConfig||xt(),n=Us(e?.presetName||Ns()),r=Kt(),i=Bn().slice(0,8),l=i.length>0?i.map(d=>this._renderPresetItem(d)).join(""):"",c=Je===null?n||"":Us(Je),u=c||"-- \u5F53\u524D\u914D\u7F6E --";return`
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
              <div class="yyt-custom-select" id="${y}-preset-dropdown">
                <div class="yyt-select-trigger">
                  <span class="yyt-select-value" data-value="${v(c)}">${v(u)}</span>
                  <i class="fa-solid fa-chevron-down yyt-select-arrow"></i>
                </div>
                <div class="yyt-select-dropdown">
                  <div class="yyt-select-option ${c?"":"yyt-selected"}" data-value="">
                    <span class="yyt-option-star yyt-placeholder"></span>
                    <span class="yyt-option-text">-- \u5F53\u524D\u914D\u7F6E --</span>
                  </div>
                  ${r.length>0?r.map(d=>this._renderSelectOption(d,c)).join(""):""}
                </div>
              </div>
              <button class="yyt-btn yyt-btn-secondary" id="${y}-load-preset" title="\u52A0\u8F7D\u9009\u4E2D\u9884\u8BBE">
                <i class="fa-solid fa-download"></i> \u52A0\u8F7D
              </button>
            </div>
            
            ${l?`
            <div class="yyt-preset-list-compact">
              ${l}
            </div>
            `:""}
          </div>
          
          <!-- API\u914D\u7F6E\u533A -->
          <div class="yyt-panel-section">
            <div class="yyt-section-title">
              <i class="fa-solid fa-sliders"></i>
              <span>API\u914D\u7F6E</span>
              <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="${y}-save-as-preset" style="margin-left: auto;">
                <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u4E3A\u9884\u8BBE
              </button>
            </div>
            
            ${this._renderApiConfigForm(s)}
          </div>
          
          <!-- \u5E95\u90E8\u64CD\u4F5C\u533A -->
          <div class="yyt-panel-footer">
            <div class="yyt-footer-left">
              <button class="yyt-btn yyt-btn-secondary" id="${y}-import-presets">
                <i class="fa-solid fa-file-import"></i> \u5BFC\u5165
              </button>
              <button class="yyt-btn yyt-btn-secondary" id="${y}-export-presets">
                <i class="fa-solid fa-file-export"></i> \u5BFC\u51FA
              </button>
              <input type="file" id="${y}-import-file" accept=".json" style="display:none">
            </div>
            <div class="yyt-footer-right">
              <button class="yyt-btn yyt-btn-secondary" id="${y}-reset-api-config">
                <i class="fa-solid fa-undo"></i> \u91CD\u7F6E
              </button>
              <button class="yyt-btn yyt-btn-primary" id="${y}-save-api-config">
                <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u914D\u7F6E
              </button>
            </div>
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
    `},_renderSelectOption(t,e){let s=t.starred===!0,n=s?"yyt-option-star yyt-starred":"yyt-option-star",r=s?"\u2605":"\u2606";return`
      <div class="yyt-select-option ${t.name===e?"yyt-selected":""}" data-value="${v(t.name)}">
        <button class="${n}" data-preset="${v(t.name)}" title="${s?"\u70B9\u51FB\u53D6\u6D88\u661F\u6807":"\u70B9\u51FB\u6DFB\u52A0\u661F\u6807"}">${r}</button>
        <span class="yyt-option-text">${v(t.name)}</span>
      </div>
    `},_renderApiConfigForm(t){return`
      <div class="yyt-form-group">
        <div class="yyt-toggle-row">
          <div class="yyt-toggle-label">
            <span>\u4F7F\u7528SillyTavern\u4E3BAPI</span>
            <span class="yyt-toggle-hint">\u542F\u7528\u540E\u5C06\u4F7F\u7528SillyTavern\u5185\u7F6E\u7684API\u914D\u7F6E</span>
          </div>
          <label class="yyt-toggle">
            <input type="checkbox" id="${y}-use-main-api" ${t.useMainApi?"checked":""}>
            <span class="yyt-toggle-slider"></span>
          </label>
        </div>
      </div>
      
      <div id="${y}-custom-api-fields" class="${t.useMainApi?"yyt-disabled":""}">
        <div class="yyt-form-row">
          <div class="yyt-form-group yyt-flex-1">
            <label>API URL</label>
            <input type="text" class="yyt-input" id="${y}-api-url" 
                   value="${v(t.url||"")}" 
                   placeholder="https://api.openai.com/v1/chat/completions">
          </div>
        </div>
        
        <div class="yyt-form-row">
          <div class="yyt-form-group yyt-flex-1">
            <label>API Key</label>
            <div class="yyt-input-group">
              <input type="password" class="yyt-input" id="${y}-api-key" 
                     value="${v(t.apiKey||"")}" 
                     placeholder="sk-...">
              <button class="yyt-btn yyt-btn-icon" id="${y}-toggle-key-visibility" title="\u663E\u793A/\u9690\u85CF">
                <i class="fa-solid fa-eye"></i>
              </button>
            </div>
          </div>
        </div>
        
        <div class="yyt-form-row">
          <div class="yyt-form-group yyt-flex-1">
            <label>\u6A21\u578B</label>
            <div class="yyt-model-row">
              <input type="text" class="yyt-input yyt-model-input" id="${y}-model" 
                     value="${v(t.model||"")}" 
                     placeholder="gpt-4">
              <select class="yyt-select yyt-model-select" id="${y}-model-select" style="display: none;">
              </select>
              <button class="yyt-btn yyt-btn-secondary yyt-model-btn" id="${y}-load-models" title="\u83B7\u53D6\u6A21\u578B\u5217\u8868">
                <i class="fa-solid fa-sync-alt"></i>
              </button>
            </div>
          </div>
        </div>
        
        <div class="yyt-form-row yyt-form-row-2col">
          <div class="yyt-form-group">
            <label>Max Tokens</label>
            <input type="number" class="yyt-input" id="${y}-max-tokens" 
                   value="${t.max_tokens||4096}" min="1" max="128000">
          </div>
          
          <div class="yyt-form-group">
            <label>Temperature</label>
            <input type="number" class="yyt-input" id="${y}-temperature" 
                   value="${t.temperature??.7}" min="0" max="2" step="0.1">
          </div>
        </div>
        
        <div class="yyt-form-row">
          <div class="yyt-form-group yyt-flex-1">
            <label>Top P</label>
            <input type="number" class="yyt-input" id="${y}-top-p" 
                   value="${t.top_p??.9}" min="0" max="1" step="0.1">
          </div>
        </div>
      </div>
    `},bindEvents(t,e){let s=H();!s||!V(t)||(this._bindDropdownEvents(t,s),this._bindPresetListEvents(t,s),this._bindApiConfigEvents(t,s),this._bindFileEvents(t,s))},_bindDropdownEvents(t,e){let s=t.find(`#${y}-preset-dropdown`),n=s.find(".yyt-select-trigger"),r=s.find(".yyt-select-value"),o=()=>{let a=String(r.data("value")||"").trim();if(!a){Je="",Mt(""),Rt(t,xt(),y),t.find(".yyt-preset-item").removeClass("yyt-loaded"),m("info","\u5DF2\u5207\u6362\u5230\u5F53\u524DAPI\u914D\u7F6E");return}let i=It(a);if(!i){m("error",`\u9884\u8BBE "${a}" \u4E0D\u5B58\u5728`);return}Je=a,Mt(a),Rt(t,i.apiConfig,y),t.find(".yyt-preset-item").removeClass("yyt-loaded"),t.find(`.yyt-preset-item[data-preset-name="${a.replace(/"/g,"&quot;")}"]`).addClass("yyt-loaded"),m("info",`\u5DF2\u52A0\u8F7D\u9884\u8BBE "${a}"\uFF0C\u4FEE\u6539\u540E\u70B9\u51FB\u201C\u4FDD\u5B58\u914D\u7F6E\u201D\u4F1A\u8986\u76D6\u8BE5\u9884\u8BBE`)};n.on("click",function(a){a.stopPropagation(),s.toggleClass("yyt-open")}),s.find(".yyt-select-option").on("click",a=>{if(e(a.target).hasClass("yyt-option-star"))return;let i=e(a.currentTarget),l=i.data("value"),c=i.find(".yyt-option-text").text();Je=String(l||"").trim(),r.text(c).data("value",l),s.find(".yyt-select-option").removeClass("yyt-selected"),i.addClass("yyt-selected"),s.removeClass("yyt-open")}),t.find(`#${y}-load-preset`).on("click",()=>{o()}),s.find(".yyt-option-star").on("click",a=>{a.preventDefault(),a.stopPropagation();let i=e(a.currentTarget).data("preset");if(!i)return;let l=Gn(i);if(l.success){m("success",l.message);let c=t.closest(".yyt-api-manager").parent();c.length&&this.renderTo(c)}else m("error",l.message)}),e(document).on("click.yyt-dropdown",a=>{e(a.target).closest(s).length||s.removeClass("yyt-open")})},_bindPresetListEvents(t,e){t.find(".yyt-preset-item").on("click",s=>{let r=e(s.currentTarget).data("preset-name"),o=e(s.target).closest("[data-action]").data("action");if(o)switch(s.stopPropagation(),o){case"load":t.find(".yyt-select-value").text(r).data("value",r),t.find(".yyt-select-option").removeClass("yyt-selected"),t.find(`.yyt-select-option[data-value="${r.replace(/"/g,"&quot;")}"]`).addClass("yyt-selected"),t.find(`#${y}-load-preset`).trigger("click");break;case"delete":if(confirm(`\u786E\u5B9A\u8981\u5220\u9664\u9884\u8BBE "${r}" \u5417\uFF1F`)){let a=Os(r);if(m(a.success?"info":"error",a.message),a.success){Us(Je)===r&&(Je=null);let i=t.closest(".yyt-api-manager").parent();i.length&&this.renderTo(i)}}break}})},_bindApiConfigEvents(t,e){t.find(`#${y}-use-main-api`).on("change",function(){let s=e(this).is(":checked"),n=t.find(`#${y}-custom-api-fields`);s?n.addClass("yyt-disabled").find("input, button, select").prop("disabled",!0):n.removeClass("yyt-disabled").find("input, button, select").prop("disabled",!1)}),t.find(`#${y}-toggle-key-visibility`).on("click",function(){let s=t.find(`#${y}-api-key`),n=s.attr("type");s.attr("type",n==="password"?"text":"password"),e(this).find("i").toggleClass("fa-eye fa-eye-slash")}),t.find(`#${y}-load-models`).on("click",async()=>{let s=t.find(`#${y}-load-models`),n=t.find(`#${y}-model`),r=t.find(`#${y}-model-select`);s.prop("disabled",!0).find("i").addClass("fa-spin");try{let o=vt(t,y),a=await Ln(o);if(a.length>0){r.empty(),a.forEach(l=>{r.append(`<option value="${v(l)}">${v(l)}</option>`)}),n.hide(),r.show();let i=n.val();i&&a.includes(i)&&r.val(i),r.off("change").on("change",function(){n.val(e(this).val())}),m("success",`\u5DF2\u52A0\u8F7D ${a.length} \u4E2A\u6A21\u578B`)}else m("warning","\u672A\u80FD\u83B7\u53D6\u6A21\u578B\u5217\u8868\uFF0C\u8BF7\u624B\u52A8\u8F93\u5165")}catch(o){m("error",`\u52A0\u8F7D\u6A21\u578B\u5931\u8D25: ${o.message}`)}finally{s.prop("disabled",!1).find("i").removeClass("fa-spin")}}),t.find(`#${y}-model`).on("focus",function(){let s=t.find(`#${y}-model-select`);e(this).show(),s.hide()}),t.find(`#${y}-save-api-config`).on("click",()=>{let s=vt(t,y),n=Us(Ns()),r=Ht(s);if(!r.valid&&!s.useMainApi){m("error",r.errors.join(", "));return}if(n){if(!confirm(`\u662F\u5426\u8981\u8986\u76D6\u9884\u8BBE "${n}" \u7684\u914D\u7F6E\uFF1F

\u70B9\u51FB"\u786E\u5B9A"\u8986\u76D6\u9884\u8BBE\uFF0C\u70B9\u51FB"\u53D6\u6D88"\u4EC5\u4FDD\u5B58\u5F53\u524D\u914D\u7F6E\u5E76\u5207\u6362\u5230\u201C\u5F53\u524D\u914D\u7F6E\u201D`)){Ft(s),Mt(""),Je="",m("success","API\u914D\u7F6E\u5DF2\u4FDD\u5B58\uFF0C\u5E76\u5DF2\u5207\u6362\u5230\u5F53\u524DAPI\u914D\u7F6E");let a=t.closest(".yyt-api-manager").parent();a.length&&this.renderTo(a);return}Ft(s);let o=Un(n,{apiConfig:s});if(o.success){Je=n,m("success",`\u914D\u7F6E\u5DF2\u4FDD\u5B58\u5E76\u8986\u76D6\u9884\u8BBE "${n}"`),Mt(n),P.emit(I.PRESET_UPDATED,{name:n});let a=t.closest(".yyt-api-manager").parent();a.length&&this.renderTo(a)}else m("error",o.message);return}Ft(s),m("success","API\u914D\u7F6E\u5DF2\u4FDD\u5B58")}),t.find(`#${y}-reset-api-config`).on("click",()=>{if(confirm("\u786E\u5B9A\u8981\u91CD\u7F6EAPI\u914D\u7F6E\u5417\uFF1F")){Mt(""),Je="",Ft({url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9});let s=t.closest(".yyt-api-manager").parent();s.length&&this.renderTo(s),m("info","API\u914D\u7F6E\u5DF2\u91CD\u7F6E")}}),t.find(`#${y}-save-as-preset`).on("click",()=>{this._showSavePresetDialog(t,e)})},_bindFileEvents(t,e){t.find(`#${y}-export-presets`).on("click",()=>{try{let s=jn();it(s,`youyou_toolkit_presets_${Date.now()}.json`),m("success","\u9884\u8BBE\u5DF2\u5BFC\u51FA")}catch(s){m("error",`\u5BFC\u51FA\u5931\u8D25: ${s.message}`)}}),t.find(`#${y}-import-presets`).on("click",()=>{t.find(`#${y}-import-file`).click()}),t.find(`#${y}-import-file`).on("change",async s=>{let n=s.target.files[0];if(n){try{let r=await lt(n),o=Fn(r,{overwrite:!0});if(m(o.success?"success":"error",o.message),o.imported>0){let a=t.closest(".yyt-api-manager").parent();a.length&&this.renderTo(a)}}catch(r){m("error",`\u5BFC\u5165\u5931\u8D25: ${r.message}`)}e(s.target).val("")}})},_showSavePresetDialog(t,e){let n=Kt().map(u=>u.name),r=Hn("\u65B0\u9884\u8BBE"),o=`
      <div class="yyt-dialog-overlay" id="${y}-dialog-overlay">
        <div class="yyt-dialog">
          <div class="yyt-dialog-header">
            <span class="yyt-dialog-title">\u4FDD\u5B58\u4E3A\u65B0\u9884\u8BBE</span>
            <button class="yyt-dialog-close" id="${y}-dialog-close">
              <i class="fa-solid fa-times"></i>
            </button>
          </div>
          <div class="yyt-dialog-body">
            <div class="yyt-form-group">
              <label>\u9884\u8BBE\u540D\u79F0</label>
              <input type="text" class="yyt-input" id="${y}-dialog-preset-name" 
                     value="${v(r)}" placeholder="\u8F93\u5165\u9884\u8BBE\u540D\u79F0">
            </div>
            <div class="yyt-form-group">
              <label>\u63CF\u8FF0\uFF08\u53EF\u9009\uFF09</label>
              <textarea class="yyt-textarea" id="${y}-dialog-preset-desc" rows="2" 
                        placeholder="\u9884\u8BBE\u63CF\u8FF0..."></textarea>
            </div>
          </div>
          <div class="yyt-dialog-footer">
            <button class="yyt-btn yyt-btn-secondary" id="${y}-dialog-cancel">\u53D6\u6D88</button>
            <button class="yyt-btn yyt-btn-primary" id="${y}-dialog-save">\u4FDD\u5B58</button>
          </div>
        </div>
      </div>
    `;e(`#${y}-dialog-overlay`).remove(),t.append(o);let a=e(`#${y}-dialog-overlay`),i=e(`#${y}-dialog-preset-name`),l=e(`#${y}-dialog-preset-desc`);i.focus().select();let c=()=>a.remove();a.find(`#${y}-dialog-close, #${y}-dialog-cancel`).on("click",c),a.on("click",function(u){u.target===this&&c()}),a.find(`#${y}-dialog-save`).on("click",()=>{let u=i.val().trim(),d=l.val().trim();if(!u){m("warning","\u8BF7\u8F93\u5165\u9884\u8BBE\u540D\u79F0"),i.focus();return}if(n.includes(u)){if(!confirm(`\u9884\u8BBE "${u}" \u5DF2\u5B58\u5728\uFF0C\u662F\u5426\u8986\u76D6\uFF1F`))return;Os(u)}let h=vt(t,y),g=$s({name:u,description:d,apiConfig:h});if(g.success){m("success",g.message),c(),P.emit(I.PRESET_CREATED,{preset:g.preset});let b=t.closest(".yyt-api-manager").parent();b.length&&this.renderTo(b)}else m("error",g.message)}),i.on("keypress",function(u){u.which===13&&a.find(`#${y}-dialog-save`).click()})},destroy(t){let e=H();!e||!V(t)||(t.find("*").off(),e(document).off("click.yyt-dropdown"))},getStyles(){return`
      /* CSS\u53D8\u91CF\u5B9A\u4E49 */
      .yyt-api-manager {
        --yyt-accent: #7bb7ff;
        --yyt-accent-glow: rgba(123, 183, 255, 0.4);
        --yyt-accent-soft: rgba(123, 183, 255, 0.15);
        --yyt-success: #4ade80;
        --yyt-success-glow: rgba(74, 222, 128, 0.3);
        --yyt-error: #f87171;
        --yyt-error-glow: rgba(248, 113, 113, 0.3);
        --yyt-warning: #fbbf24;
        --yyt-surface: rgba(255, 255, 255, 0.03);
        --yyt-surface-hover: rgba(255, 255, 255, 0.06);
        --yyt-surface-active: rgba(255, 255, 255, 0.08);
        --yyt-border: rgba(255, 255, 255, 0.08);
        --yyt-border-strong: rgba(255, 255, 255, 0.15);
        --yyt-text: rgba(255, 255, 255, 0.95);
        --yyt-text-secondary: rgba(255, 255, 255, 0.7);
        --yyt-text-muted: rgba(255, 255, 255, 0.45);
        --yyt-radius: 12px;
        --yyt-radius-sm: 8px;
        --yyt-radius-lg: 16px;
        --yyt-shadow: 0 4px 24px rgba(0, 0, 0, 0.2);
        --yyt-shadow-glow: 0 0 20px var(--yyt-accent-glow);
        
        display: flex;
        flex-direction: column;
        height: 100%;
      }
      
      /* \u9762\u677F */
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
        transition: border-color 0.2s ease;
      }
      
      .yyt-panel-section:hover {
        border-color: var(--yyt-border-strong);
      }
      
      /* \u6807\u9898 */
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
        filter: drop-shadow(0 0 8px var(--yyt-accent-glow));
      }
      
      /* \u9884\u8BBE\u9009\u62E9\u5668 */
      .yyt-preset-selector {
        display: flex;
        gap: 12px;
        align-items: center;
      }
      
      /* \u81EA\u5B9A\u4E49\u4E0B\u62C9\u6846 */
      .yyt-custom-select {
        position: relative;
        flex: 1;
        min-width: 0;
      }
      
      .yyt-select-trigger {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 14px;
        border: 1px solid var(--yyt-border);
        border-radius: var(--yyt-radius-sm);
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%);
        color: var(--yyt-text);
        font-size: 13px;
        cursor: pointer;
        transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
      }
      
      .yyt-select-trigger:hover {
        border-color: rgba(255, 255, 255, 0.2);
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%);
      }
      
      .yyt-custom-select.yyt-open .yyt-select-trigger {
        border-color: var(--yyt-accent);
        box-shadow: 0 0 0 3px var(--yyt-accent-soft), inset 0 1px 2px rgba(0, 0, 0, 0.1);
      }
      
      .yyt-select-value {
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      
      .yyt-select-arrow {
        color: var(--yyt-text-muted);
        transition: transform 0.2s ease;
        margin-left: 8px;
      }
      
      .yyt-custom-select.yyt-open .yyt-select-arrow {
        transform: rotate(180deg);
      }
      
      .yyt-select-dropdown {
        position: absolute;
        top: calc(100% + 4px);
        left: 0;
        right: 0;
        max-height: 0;
        overflow: hidden;
        background: linear-gradient(180deg, rgba(20, 20, 35, 0.98) 0%, rgba(15, 15, 28, 0.98) 100%);
        border: 1px solid var(--yyt-border);
        border-radius: var(--yyt-radius-sm);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
        z-index: 1000;
        opacity: 0;
        transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .yyt-custom-select.yyt-open .yyt-select-dropdown {
        max-height: 300px;
        overflow-y: auto;
        opacity: 1;
      }
      
      .yyt-select-option {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px 14px;
        cursor: pointer;
        transition: background 0.15s ease;
      }
      
      .yyt-select-option:hover {
        background: rgba(123, 183, 255, 0.1);
      }
      
      .yyt-select-option.yyt-selected {
        background: rgba(123, 183, 255, 0.15);
      }
      
      .yyt-option-star {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 28px;
        height: 24px;
        border: none;
        border-radius: 4px;
        background: transparent;
        color: var(--yyt-text-muted);
        font-size: 14px;
        cursor: pointer;
        transition: all 0.2s ease;
        flex-shrink: 0;
      }
      
      .yyt-option-star.yyt-placeholder {
        width: 28px;
        visibility: hidden;
      }
      
      .yyt-option-star:hover {
        color: var(--yyt-accent);
        background: rgba(123, 183, 255, 0.1);
      }
      
      .yyt-option-star.yyt-starred {
        color: #fbbf24;
      }
      
      .yyt-option-star.yyt-starred:hover {
        color: #fcd34d;
        background: rgba(251, 191, 36, 0.15);
      }
      
      .yyt-option-text {
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: var(--yyt-text);
        font-size: 13px;
      }
      
      /* \u9884\u8BBE\u5217\u8868 - \u7D27\u51D1\u6837\u5F0F */
      .yyt-preset-list-compact {
        display: flex;
        flex-direction: column;
        gap: 8px;
        max-height: 150px;
        overflow-y: auto;
        padding-right: 4px;
      }
      
      .yyt-preset-list-compact::-webkit-scrollbar {
        width: 4px;
      }
      
      .yyt-preset-list-compact::-webkit-scrollbar-track {
        background: transparent;
      }
      
      .yyt-preset-list-compact::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.15);
        border-radius: 2px;
      }
      
      /* \u9884\u8BBE\u9879 - \u7D27\u51D1\u6837\u5F0F */
      .yyt-preset-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 14px;
        background: linear-gradient(135deg, var(--yyt-surface) 0%, rgba(255, 255, 255, 0.01) 100%);
        border: 1px solid var(--yyt-border);
        border-radius: var(--yyt-radius-sm);
        transition: all 0.2s ease;
      }
      
      .yyt-preset-item:hover {
        background: linear-gradient(135deg, var(--yyt-surface-hover) 0%, var(--yyt-surface) 100%);
        border-color: rgba(255, 255, 255, 0.12);
      }
      
      .yyt-preset-item.active {
        background: linear-gradient(135deg, rgba(123, 183, 255, 0.12) 0%, rgba(123, 183, 255, 0.04) 100%);
        border-color: rgba(123, 183, 255, 0.3);
      }
      
      .yyt-preset-item.yyt-loaded {
        background: linear-gradient(135deg, rgba(74, 222, 128, 0.12) 0%, rgba(74, 222, 128, 0.04) 100%);
        border-color: rgba(74, 222, 128, 0.3);
      }
      
      .yyt-preset-info {
        flex: 1;
        min-width: 0;
        display: flex;
        align-items: center;
        gap: 10px;
      }
      
      .yyt-preset-name {
        font-weight: 500;
        font-size: 13px;
        color: var(--yyt-text);
      }
      
      .yyt-preset-meta {
        display: flex;
        gap: 6px;
      }
      
      .yyt-preset-actions {
        display: flex;
        gap: 4px;
        opacity: 0.5;
        transition: opacity 0.2s ease;
      }
      
      .yyt-preset-item:hover .yyt-preset-actions {
        opacity: 1;
      }
      
      /* \u5FBD\u7AE0 */
      .yyt-badge {
        display: inline-flex;
        align-items: center;
        padding: 4px 10px;
        border-radius: 12px;
        font-size: 11px;
        font-weight: 600;
      }
      
      .yyt-badge-small {
        padding: 2px 8px;
        font-size: 10px;
        background: linear-gradient(135deg, var(--yyt-accent-soft) 0%, rgba(123, 183, 255, 0.08) 100%);
        color: var(--yyt-accent);
        border: 1px solid rgba(123, 183, 255, 0.2);
      }
      
      /* \u8868\u5355 */
      .yyt-form-group {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      
      .yyt-form-group label {
        font-size: 12px;
        font-weight: 600;
        color: var(--yyt-text-secondary);
        letter-spacing: 0.3px;
      }
      
      .yyt-form-row {
        display: flex;
        gap: 12px;
      }
      
      .yyt-form-row-2col > .yyt-form-group {
        flex: 1;
      }
      
      .yyt-flex-1 {
        flex: 1;
      }
      
      /* Toggle\u5F00\u5173 */
      .yyt-toggle-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 14px 16px;
        background: linear-gradient(135deg, var(--yyt-surface) 0%, rgba(255, 255, 255, 0.01) 100%);
        border: 1px solid var(--yyt-border);
        border-radius: var(--yyt-radius-sm);
        transition: all 0.2s ease;
      }
      
      .yyt-toggle-row:hover {
        background: linear-gradient(135deg, var(--yyt-surface-hover) 0%, var(--yyt-surface) 100%);
        border-color: var(--yyt-border-strong);
      }
      
      .yyt-toggle-label {
        display: flex;
        flex-direction: column;
        gap: 2px;
      }
      
      .yyt-toggle-label > span:first-child {
        font-weight: 600;
        font-size: 14px;
        color: var(--yyt-text);
      }
      
      .yyt-toggle-hint {
        font-size: 11px;
        color: var(--yyt-text-muted);
      }
      
      .yyt-toggle {
        position: relative;
        display: inline-block;
        width: 48px;
        height: 26px;
        flex-shrink: 0;
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
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%);
        border: 1px solid var(--yyt-border);
        border-radius: 26px;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .yyt-toggle-slider::before {
        position: absolute;
        content: "";
        height: 20px;
        width: 20px;
        left: 2px;
        bottom: 2px;
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%);
        border-radius: 50%;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      }
      
      .yyt-toggle input:checked + .yyt-toggle-slider {
        background: linear-gradient(135deg, var(--yyt-accent) 0%, #5a9cf0 100%);
        border-color: var(--yyt-accent);
        box-shadow: 0 0 12px var(--yyt-accent-glow);
      }
      
      .yyt-toggle input:checked + .yyt-toggle-slider::before {
        transform: translateX(22px);
      }
      
      .yyt-toggle input:focus + .yyt-toggle-slider {
        box-shadow: 0 0 0 3px var(--yyt-accent-soft);
      }
      
      /* \u8F93\u5165\u6846 */
      .yyt-input,
      .yyt-select,
      .yyt-textarea {
        padding: 10px 14px;
        border: 1px solid var(--yyt-border);
        border-radius: var(--yyt-radius-sm);
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%);
        color: var(--yyt-text);
        font-size: 13px;
        transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
      }
      
      .yyt-select {
        cursor: pointer;
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23888' d='M6 8L1 3h10z'/%3E%3C/svg%3E") !important;
        background-repeat: no-repeat !important;
        background-position: right 12px center !important;
        padding-right: 32px;
        background-color: #1a1a2e !important;
        color: #ffffff !important;
        filter: none !important;
      }
      
      .yyt-select option,
      select.yyt-select option {
        background-color: #1a1a2e !important;
        background: #1a1a2e !important;
        color: #ffffff !important;
        padding: 8px 12px;
        margin: 2px 0;
        border-radius: 4px;
        filter: none !important;
      }
      
      .yyt-input:hover,
      .yyt-select:hover,
      .yyt-textarea:hover {
        border-color: rgba(255, 255, 255, 0.2);
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%);
      }
      
      .yyt-input:focus,
      .yyt-select:focus,
      .yyt-textarea:focus {
        outline: none;
        border-color: var(--yyt-accent);
        background: linear-gradient(180deg, rgba(123, 183, 255, 0.05) 0%, rgba(123, 183, 255, 0.02) 100%);
        box-shadow: 0 0 0 3px var(--yyt-accent-soft), inset 0 1px 2px rgba(0, 0, 0, 0.1);
      }
      
      .yyt-input,
      .yyt-textarea {
        background-color: #1a1a2e !important;
        color: #ffffff !important;
        filter: none !important;
      }
      
      .yyt-input::placeholder,
      .yyt-textarea::placeholder {
        color: var(--yyt-text-muted);
      }
      
      .yyt-input-group {
        display: flex;
        gap: 8px;
      }
      
      .yyt-input-group .yyt-input {
        flex: 1;
      }
      
      /* \u6A21\u578B\u884C */
      .yyt-model-row {
        display: flex;
        gap: 8px;
        align-items: stretch;
      }
      
      .yyt-model-input {
        flex: 1;
        min-width: 0;
      }
      
      .yyt-model-select {
        flex: 1;
        min-width: 0;
      }
      
      .yyt-model-btn {
        flex-shrink: 0;
        min-width: 40px;
        color: var(--yyt-accent);
        border-color: rgba(123, 183, 255, 0.25);
      }
      
      .yyt-model-btn:hover {
        color: var(--yyt-accent);
      }
      
      .yyt-model-btn i {
        color: var(--yyt-accent);
      }
      
      .yyt-disabled {
        opacity: 0.4;
        pointer-events: none;
        filter: grayscale(0.5);
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
      
      /* \u6309\u94AE */
      .yyt-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        padding: 8px 16px;
        border: none;
        border-radius: var(--yyt-radius-sm);
        font-size: 13px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
        overflow: hidden;
        letter-spacing: 0.2px;
      }
      
      .yyt-btn::before {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.15) 0%, transparent 50%);
        pointer-events: none;
      }
      
      .yyt-btn-primary {
        background: linear-gradient(135deg, var(--yyt-accent) 0%, #5a9cf0 100%);
        color: #0b0f15;
        box-shadow: 0 4px 15px var(--yyt-accent-glow), inset 0 1px 0 rgba(255, 255, 255, 0.2);
      }
      
      .yyt-btn-primary:hover {
        transform: translateY(-1px);
        box-shadow: 0 6px 20px var(--yyt-accent-glow), inset 0 1px 0 rgba(255, 255, 255, 0.25);
      }
      
      .yyt-btn-primary:active {
        transform: translateY(0);
        box-shadow: 0 2px 10px var(--yyt-accent-glow), inset 0 1px 0 rgba(255, 255, 255, 0.15);
      }
      
      .yyt-btn-secondary {
        background: linear-gradient(135deg, var(--yyt-surface-active) 0%, var(--yyt-surface) 100%);
        color: var(--yyt-text);
        border: 1px solid var(--yyt-border);
      }
      
      .yyt-btn-secondary:hover {
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, var(--yyt-surface-hover) 100%);
        border-color: var(--yyt-border-strong);
        transform: translateY(-1px);
      }
      
      .yyt-btn-danger {
        background: linear-gradient(135deg, rgba(248, 113, 113, 0.15) 0%, rgba(248, 113, 113, 0.05) 100%);
        color: var(--yyt-error);
        border: 1px solid rgba(248, 113, 113, 0.25);
      }
      
      .yyt-btn-danger:hover {
        background: linear-gradient(135deg, rgba(248, 113, 113, 0.25) 0%, rgba(248, 113, 113, 0.1) 100%);
        box-shadow: 0 4px 15px var(--yyt-error-glow);
      }
      
      .yyt-btn-icon {
        padding: 8px;
        min-width: 36px;
      }
      
      .yyt-btn-small {
        padding: 6px 10px;
        font-size: 11px;
      }
      
      .yyt-btn:disabled {
        opacity: 0.4;
        cursor: not-allowed;
        transform: none !important;
        box-shadow: none !important;
      }
      
      /* \u5BF9\u8BDD\u6846 */
      .yyt-dialog-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.6);
        backdrop-filter: blur(4px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10001;
        animation: yytFadeIn 0.2s ease-out;
      }
      
      @keyframes yytFadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      
      .yyt-dialog {
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, transparent 30%), #0d1117;
        border: 1px solid var(--yyt-border-strong);
        border-radius: var(--yyt-radius);
        box-shadow: 0 25px 80px rgba(0, 0, 0, 0.6);
        width: 380px;
        max-width: 90vw;
        animation: yytSlideIn 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      }
      
      @keyframes yytSlideIn {
        from {
          opacity: 0;
          transform: scale(0.95) translateY(-10px);
        }
        to {
          opacity: 1;
          transform: scale(1) translateY(0);
        }
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
      }
      
      .yyt-dialog-footer {
        display: flex;
        justify-content: flex-end;
        gap: 10px;
        padding: 16px 20px;
        border-top: 1px solid var(--yyt-border);
      }
      
      /* \u52A8\u753B */
      @keyframes yytFadeSlideIn {
        from {
          opacity: 0;
          transform: translateY(8px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      .yyt-panel-section {
        animation: yytFadeSlideIn 0.25s ease-out backwards;
      }
      
      .yyt-panel-section:nth-child(1) { animation-delay: 0s; }
      .yyt-panel-section:nth-child(2) { animation-delay: 0.05s; }
      .yyt-panel-section:nth-child(3) { animation-delay: 0.1s; }
    `},renderTo(t){let e=this.render({});t.html(e),this.bindEvents(t,{})}}});var xo={};de(xo,{MESSAGE_MACROS:()=>bo,addTagRule:()=>Yt,createRuleTemplate:()=>yo,default:()=>mi,deleteRulePreset:()=>mo,deleteRuleTemplate:()=>fo,deleteTagRule:()=>ps,escapeRegex:()=>Ct,exportRulesConfig:()=>Ys,extractComplexTag:()=>lo,extractCurlyBraceTag:()=>Zn,extractHtmlFormatTag:()=>co,extractSimpleTag:()=>Qn,extractTagContent:()=>kt,generateTagSuggestions:()=>zs,getAllRulePresets:()=>Hs,getAllRuleTemplates:()=>uo,getContentBlacklist:()=>Dt,getRuleTemplate:()=>po,getTagRules:()=>ct,importRulesConfig:()=>Ws,isValidTagName:()=>Xn,loadRulePreset:()=>Ks,saveRulesAsPreset:()=>Fs,scanTextForTags:()=>Bs,setContentBlacklist:()=>ys,setTagRules:()=>js,shouldSkipContent:()=>Jn,testRegex:()=>ho,updateRuleTemplate:()=>go,updateTagRule:()=>Wt});function Gs(){let t=ee();return Ee=t.ruleTemplates||[...io],te=t.tagRules||[],Me=t.contentBlacklist||[],{ruleTemplates:Ee,tagRules:te,contentBlacklist:Me}}function Ct(t){return typeof t!="string"?"":t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function Jn(t,e){if(!e||e.length===0||!t||typeof t!="string")return!1;let s=t.toLowerCase();return e.some(n=>{let r=n.trim().toLowerCase();return r&&s.includes(r)})}function Xn(t){return!t||typeof t!="string"?!1:/^[a-zA-Z][a-zA-Z0-9_-]*$/.test(t)&&!fi.includes(t.toLowerCase())}function Qn(t,e){if(!t||!e)return[];let s=[],n=Ct(e),r=new RegExp(`<${n}>([\\s\\S]*?)<\\/${n}>`,"gi");[...t.matchAll(r)].forEach(l=>{l[1]&&s.push(l[1].trim())});let a=(t.match(new RegExp(`<${n}>`,"gi"))||[]).length,i=(t.match(new RegExp(`<\\/${n}>`,"gi"))||[]).length;return a>i&&console.warn(`[YouYouToolkit] \u8B66\u544A: \u53D1\u73B0 ${a-i} \u4E2A\u672A\u95ED\u5408\u7684 <${e}> \u6807\u7B7E`),s}function Zn(t,e){if(!t||!e)return[];let s=[],n=Ct(e),r=new RegExp(`\\{${n}\\|`,"gi"),o;for(;(o=r.exec(t))!==null;){let a=o.index,i=a+o[0].length,l=1,c=i;for(;c<t.length&&l>0;)t[c]==="{"?l++:t[c]==="}"&&l--,c++;if(l===0){let u=t.substring(i,c-1);u.trim()&&s.push(u.trim())}r.lastIndex=a+1}return s}function lo(t,e){if(!t||!e)return[];let s=e.split(",");if(s.length!==2)return console.error(`[YouYouToolkit] \u590D\u6742\u6807\u7B7E\u914D\u7F6E\u683C\u5F0F\u9519\u8BEF\uFF0C\u5E94\u8BE5\u5305\u542B\u4E00\u4E2A\u9017\u53F7: ${e}`),[];let n=s[0].trim(),r=s[1].trim(),o=r.match(/<\/(\w+)>/);if(!o)return console.error(`[YouYouToolkit] \u65E0\u6CD5\u89E3\u6790\u7ED3\u675F\u6807\u7B7E: ${r}`),[];let a=o[1],i=new RegExp(`${Ct(n)}([\\s\\S]*?)<\\/${a}>`,"gi"),l=[];return[...t.matchAll(i)].forEach(u=>{u[1]&&l.push(u[1].trim())}),l}function co(t,e){if(!t||!e)return[];let s=e.match(/<(\w+)(?:\s[^>]*)?>/);if(!s)return console.error(`[YouYouToolkit] \u65E0\u6CD5\u89E3\u6790HTML\u683C\u5F0F\u6807\u7B7E: ${e}`),[];let n=s[1],r=[],o=new RegExp(`<${n}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${n}>`,"gi");[...t.matchAll(o)].forEach(c=>{c[1]&&r.push(c[1].trim())});let i=(t.match(new RegExp(`<${n}(?:\\s[^>]*)?>`,"gi"))||[]).length,l=(t.match(new RegExp(`<\\/${n}>`,"gi"))||[]).length;return i>l&&console.warn(`[YouYouToolkit] \u8B66\u544A: \u53D1\u73B0 ${i-l} \u4E2A\u672A\u95ED\u5408\u7684 <${n}> \u6807\u7B7E`),r}function kt(t,e,s=[]){if(!t)return"";if(!e||e.length===0)return t;let n=e.filter(u=>u.type==="exclude"&&u.enabled),r=e.filter(u=>(u.type==="include"||u.type==="regex_include")&&u.enabled),o=e.filter(u=>u.type==="regex_exclude"&&u.enabled),a=t;for(let u of n)try{let d=new RegExp(`<${Ct(u.value)}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${Ct(u.value)}>`,"gi");a=a.replace(d,"")}catch(d){console.error("[YouYouToolkit] Error applying block exclusion rule:",{rule:u,error:d})}let i=[];if(r.length>0)for(let u of r){let d=[];try{if(u.type==="include")d.push(...Qn(a,u.value)),d.push(...Zn(a,u.value));else if(u.type==="regex_include"){let h=new RegExp(u.value,"gi");[...a.matchAll(h)].forEach(b=>{b[1]&&d.push(b[1])})}}catch(h){console.error("[YouYouToolkit] Error applying inclusion rule:",{rule:u,error:h})}d.forEach(h=>i.push(h.trim()))}else i.push(a);let l=[];for(let u of i){for(let d of o)try{let h=new RegExp(d.value,"gi");u=u.replace(h,"")}catch(h){console.error("[YouYouToolkit] Error applying cleanup rule:",{rule:d,error:h})}Jn(u,s)||l.push(u)}return l.join(`

`).replace(/\n\s*\n\s*\n/g,`

`).replace(/^\s+|\s+$/g,"").trim()}async function Bs(t,e={}){let s=performance.now(),{chunkSize:n=5e4,maxTags:r=100,timeoutMs:o=5e3}=e,a=new Set,i=/<(?:\/|)([a-zA-Z0-9_-]+)(?:[^>]*)>|\{([a-zA-Z0-9_-]+)(?:\||})/g,l=0,c=0;for(let d=0;d<t.length;d+=n){let h=t.slice(d,Math.min(d+n,t.length));if(c++,l+=h.length,performance.now()-s>o){console.warn(`[YouYouToolkit] Tag scanning timed out after ${o}ms`);break}let g;for(;(g=i.exec(h))!==null&&a.size<r;){let b=(g[1]||g[2]).toLowerCase();Xn(b)&&a.add(b)}if(a.size>=r)break;c%5===0&&await new Promise(b=>setTimeout(b,0))}let u=performance.now();return{tags:Array.from(a).sort(),stats:{processingTimeMs:Math.round(u-s),processedChars:l,totalChars:t.length,chunkCount:c,tagsFound:a.size}}}function zs(t,e=25){let s=t.tags.slice(0,e);return{suggestions:s,stats:{totalFound:t.stats.tagsFound,finalCount:s.length}}}function uo(){return Ee.length===0&&Gs(),Ee}function po(t){return Ee.find(e=>e.id===t)}function yo(t){let e={id:`rule-${Date.now()}`,name:t.name||"\u65B0\u89C4\u5219",description:t.description||"",type:t.type||"include",value:t.value||"",enabled:t.enabled!==!1,createdAt:new Date().toISOString()};return Ee.push(e),er(),{success:!0,template:e,message:"\u89C4\u5219\u6A21\u677F\u521B\u5EFA\u6210\u529F"}}function go(t,e){let s=Ee.findIndex(n=>n.id===t);return s===-1?{success:!1,message:"\u89C4\u5219\u6A21\u677F\u4E0D\u5B58\u5728"}:(Ee[s]={...Ee[s],...e,updatedAt:new Date().toISOString()},er(),{success:!0,template:Ee[s],message:"\u89C4\u5219\u6A21\u677F\u66F4\u65B0\u6210\u529F"})}function fo(t){let e=Ee.findIndex(s=>s.id===t);return e===-1?{success:!1,message:"\u89C4\u5219\u6A21\u677F\u4E0D\u5B58\u5728"}:(Ee.splice(e,1),er(),{success:!0,message:"\u89C4\u5219\u6A21\u677F\u5DF2\u5220\u9664"})}function er(){let t=ee();t.ruleTemplates=Ee,we(t)}function ct(){return te||Gs(),te}function js(t){te=t||[];let e=ee();e.tagRules=te,we(e)}function Yt(t){let e={id:`tag-${Date.now()}`,type:t.type||"include",value:t.value||"",enabled:t.enabled!==!1};te.push(e);let s=ee();return s.tagRules=te,we(s),{success:!0,rule:e,message:"\u89C4\u5219\u6DFB\u52A0\u6210\u529F"}}function Wt(t,e){if(t<0||t>=te.length)return{success:!1,message:"\u89C4\u5219\u7D22\u5F15\u65E0\u6548"};te[t]={...te[t],...e};let s=ee();return s.tagRules=te,we(s),{success:!0,rule:te[t],message:"\u89C4\u5219\u66F4\u65B0\u6210\u529F"}}function ps(t){if(t<0||t>=te.length)return{success:!1,message:"\u89C4\u5219\u7D22\u5F15\u65E0\u6548"};te.splice(t,1);let e=ee();return e.tagRules=te,we(e),{success:!0,message:"\u89C4\u5219\u5DF2\u5220\u9664"}}function Dt(){return Me||Gs(),Me}function ys(t){Me=t||[];let e=ee();e.contentBlacklist=Me,we(e)}function Fs(t,e=""){if(!t||!t.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let s=ee();s.tagRulePresets||(s.tagRulePresets={});let n=`preset-${Date.now()}`;return s.tagRulePresets[n]={id:n,name:t.trim(),description:e.trim(),rules:JSON.parse(JSON.stringify(te)),blacklist:JSON.parse(JSON.stringify(Me)),createdAt:new Date().toISOString()},we(s),{success:!0,preset:s.tagRulePresets[n],message:"\u9884\u8BBE\u4FDD\u5B58\u6210\u529F"}}function Hs(){let e=ee().tagRulePresets||{};return Object.values(e)}function Ks(t){let e=ee(),n=(e.tagRulePresets||{})[t];return n?(te=JSON.parse(JSON.stringify(n.rules||[])),Me=JSON.parse(JSON.stringify(n.blacklist||[])),e.tagRules=te,e.contentBlacklist=Me,we(e),{success:!0,preset:n,message:"\u9884\u8BBE\u52A0\u8F7D\u6210\u529F"}):{success:!1,message:"\u9884\u8BBE\u4E0D\u5B58\u5728"}}function mo(t){let e=ee(),s=e.tagRulePresets||{};return s[t]?(delete s[t],e.tagRulePresets=s,we(e),{success:!0,message:"\u9884\u8BBE\u5DF2\u5220\u9664"}):{success:!1,message:"\u9884\u8BBE\u4E0D\u5B58\u5728"}}function Ys(){return JSON.stringify({tagRules:te,contentBlacklist:Me,ruleTemplates:Ee,tagRulePresets:ee().tagRulePresets||{}},null,2)}function Ws(t,e={overwrite:!0}){try{let s=JSON.parse(t);if(e.overwrite)te=s.tagRules||[],Me=s.contentBlacklist||[],Ee=s.ruleTemplates||io;else if(s.tagRules&&te.push(...s.tagRules),s.contentBlacklist){let r=new Set(Me.map(o=>o.toLowerCase()));s.contentBlacklist.forEach(o=>{r.has(o.toLowerCase())||Me.push(o)})}let n=ee();return n.tagRules=te,n.contentBlacklist=Me,n.ruleTemplates=Ee,s.tagRulePresets&&(n.tagRulePresets={...n.tagRulePresets||{},...s.tagRulePresets}),we(n),{success:!0,message:"\u914D\u7F6E\u5BFC\u5165\u6210\u529F"}}catch(s){return{success:!1,message:`\u5BFC\u5165\u5931\u8D25: ${s.message}`}}}function ho(t,e,s="g",n=0){try{if(!t||typeof t!="string")return{success:!1,error:"\u6B63\u5219\u8868\u8FBE\u5F0F\u4E0D\u80FD\u4E3A\u7A7A",matches:[]};let r=new RegExp(t,s),o=[];if(s.includes("g")){let a;for(;(a=r.exec(e))!==null;)a.length>1?o.push({fullMatch:a[0],groups:a.slice(1),index:a.index,extracted:a[n]||a[1]||a[0]}):o.push({fullMatch:a[0],groups:[],index:a.index,extracted:a[0]})}else{let a=r.exec(e);a&&o.push({fullMatch:a[0],groups:a.length>1?a.slice(1):[],index:a.index,extracted:a.length>1?a[n]||a[1]:a[0]})}return{success:!0,matches:o,count:o.length,extracted:o.map(a=>a.extracted)}}catch(r){return{success:!1,error:r.message,matches:[]}}}var fi,io,Ee,te,Me,bo,mi,Vs=j(()=>{ls();fi=["font","span","div","p","br","hr","img","a","b","i","u","s","em","strong","small","big","sub","sup","h1","h2","h3","h4","h5","h6","table","tr","td","th","tbody","thead","tfoot","ul","ol","li","form","input","button","select","option","textarea","label","script","style","meta","link","title","head","body","html"],io=[{id:"exclude-thinking",name:"\u6392\u9664\u601D\u8003\u6807\u7B7E",description:"\u79FB\u9664<thinking>\u6807\u7B7E\u5757",type:"exclude",value:"thinking",enabled:!0},{id:"include-content",name:"\u63D0\u53D6\u5185\u5BB9\u6807\u7B7E",description:"\u63D0\u53D6<content>\u6807\u7B7E\u5185\u5BB9",type:"include",value:"content",enabled:!0},{id:"regex-exclude-cot",name:"\u6392\u9664\u5C0FCoT",description:"\u79FB\u9664HTML\u6CE8\u91CA",type:"regex_exclude",value:"<!--[\\s\\S]*?-->",enabled:!1},{id:"regex-include-details",name:"\u63D0\u53D6details\u6807\u7B7E",description:"\u63D0\u53D6<details>\u6807\u7B7E\u5185\u5BB9",type:"regex_include",value:"<details[^>]*>([\\s\\S]*?)</details>",enabled:!1}],Ee=[],te=[],Me=[];bo={lastMessage:{macro:"{{lastMessage}}",description:"\u6700\u540E\u4E00\u6761\u6D88\u606F"},lastCharMessage:{macro:"{{lastCharMessage}}",description:"\u6700\u540E\u4E00\u6761\u89D2\u8272\u6D88\u606F"},lastUserMessage:{macro:"{{lastUserMessage}}",description:"\u6700\u540E\u4E00\u6761\u7528\u6237\u6D88\u606F"},char:{macro:"{{char}}",description:"\u89D2\u8272\u540D\u79F0"},user:{macro:"{{user}}",description:"\u7528\u6237\u540D\u79F0"},input:{macro:"{{input}}",description:"\u5F53\u524D\u8F93\u5165\u6846\u5185\u5BB9"}};Gs();mi={extractTagContent:kt,extractSimpleTag:Qn,extractCurlyBraceTag:Zn,extractComplexTag:lo,extractHtmlFormatTag:co,escapeRegex:Ct,shouldSkipContent:Jn,isValidTagName:Xn,scanTextForTags:Bs,generateTagSuggestions:zs,getAllRuleTemplates:uo,getRuleTemplate:po,createRuleTemplate:yo,updateRuleTemplate:go,deleteRuleTemplate:fo,getTagRules:ct,setTagRules:js,addTagRule:Yt,updateTagRule:Wt,deleteTagRule:ps,getContentBlacklist:Dt,setContentBlacklist:ys,saveRulesAsPreset:Fs,getAllRulePresets:Hs,loadRulePreset:Ks,deleteRulePreset:mo,exportRulesConfig:Ys,importRulesConfig:Ws,testRegex:ho,MESSAGE_MACROS:bo}});var Ue,tr=j(()=>{Se();qe();Vs();Ue={id:"regexExtractPanel",render(t){let e=ct(),s=Dt(),n=Hs();return`
      <div class="yyt-regex-panel">
        <!-- \u89C4\u5219\u7F16\u8F91\u533A -->
        <div class="yyt-panel-section">
          <div class="yyt-section-title">
            <i class="fa-solid fa-filter"></i>
            <span>\u6807\u7B7E\u63D0\u53D6\u89C4\u5219</span>
            <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="${y}-show-examples" style="margin-left: auto;">
              <i class="fa-solid fa-lightbulb"></i> \u67E5\u770B\u793A\u4F8B
            </button>
          </div>
          
          ${this._renderRulesEditor(e,s,n)}
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
            <button class="yyt-btn yyt-btn-secondary" id="${y}-import-rules">
              <i class="fa-solid fa-file-import"></i> \u5BFC\u5165
            </button>
            <button class="yyt-btn yyt-btn-secondary" id="${y}-export-rules">
              <i class="fa-solid fa-file-export"></i> \u5BFC\u51FA
            </button>
            <input type="file" id="${y}-import-rules-file" accept=".json" style="display:none">
          </div>
          <div class="yyt-footer-right">
            <button class="yyt-btn yyt-btn-secondary" id="${y}-reset-rules">
              <i class="fa-solid fa-undo"></i> \u91CD\u7F6E
            </button>
          </div>
        </div>
        
        <!-- \u6807\u7B7E\u626B\u63CF\u7ED3\u679C\u5BB9\u5668 -->
        <div id="${y}-tag-suggestions-container" style="display: none;">
          <div class="yyt-tag-suggestions">
            <div class="yyt-tag-suggestions-header">
              <span>\u53D1\u73B0\u7684\u6807\u7B7E:</span>
              <span id="${y}-tag-scan-stats"></span>
            </div>
            <div class="yyt-tag-list" id="${y}-tag-list"></div>
          </div>
        </div>
      </div>
    `},_renderRulesEditor(t,e,s){let n=t.length>0?t.map((o,a)=>this._renderRuleItem(o,a)).join(""):'<div class="yyt-empty-state-small"><i class="fa-solid fa-filter"></i><span>\u6CA1\u6709\u5B9A\u4E49\u4EFB\u4F55\u63D0\u53D6\u89C4\u5219</span></div>',r=s.length>0?s.map(o=>`<option value="${o.id}">${v(o.name)}</option>`).join(""):"";return`
      <div class="yyt-tag-rules-editor">
        ${r?`
        <div class="yyt-form-row">
          <select class="yyt-select yyt-flex-1" id="${y}-rule-preset-select">
            <option value="">-- \u9009\u62E9\u9884\u8BBE --</option>
            ${r}
          </select>
          <button class="yyt-btn yyt-btn-secondary" id="${y}-load-rule-preset">
            <i class="fa-solid fa-download"></i> \u52A0\u8F7D
          </button>
          <button class="yyt-btn yyt-btn-secondary" id="${y}-save-rule-preset">
            <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u9884\u8BBE
          </button>
        </div>
        `:`
        <div class="yyt-form-row">
          <button class="yyt-btn yyt-btn-secondary" id="${y}-save-rule-preset">
            <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u4E3A\u9884\u8BBE
          </button>
        </div>
        `}
        
        <div class="yyt-rules-list">
          ${n}
        </div>
        
        <div class="yyt-form-row">
          <button class="yyt-btn yyt-btn-primary" id="${y}-add-rule">
            <i class="fa-solid fa-plus"></i> \u6DFB\u52A0\u89C4\u5219
          </button>
          <button class="yyt-btn yyt-btn-secondary" id="${y}-scan-tags">
            <i class="fa-solid fa-search"></i> \u626B\u63CF\u6807\u7B7E
          </button>
          <button class="yyt-btn yyt-btn-secondary" id="${y}-add-exclude-cot">
            <i class="fa-solid fa-ban"></i> \u6392\u9664\u5C0FCoT
          </button>
        </div>
        
        <!-- \u9ED1\u540D\u5355\u8BBE\u7F6E -->
        <div class="yyt-form-group">
          <label>\u5185\u5BB9\u9ED1\u540D\u5355\uFF08\u5305\u542B\u8FD9\u4E9B\u5173\u952E\u8BCD\u7684\u5185\u5BB9\u5C06\u88AB\u8FC7\u6EE4\uFF0C\u7528\u9017\u53F7\u5206\u9694\uFF09</label>
          <input type="text" class="yyt-input" id="${y}-content-blacklist" 
                 value="${v(e.join(", "))}" 
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
               value="${v(t.value||"")}">
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
          <textarea class="yyt-textarea" id="${y}-test-input" rows="6" 
                    placeholder="\u8F93\u5165\u8981\u6D4B\u8BD5\u63D0\u53D6\u7684\u6587\u672C\u5185\u5BB9..."></textarea>
        </div>
        
        <div class="yyt-form-row">
          <button class="yyt-btn yyt-btn-primary" id="${y}-test-extract">
            <i class="fa-solid fa-play"></i> \u6D4B\u8BD5\u63D0\u53D6
          </button>
          <button class="yyt-btn yyt-btn-secondary" id="${y}-test-clear">
            <i class="fa-solid fa-eraser"></i> \u6E05\u7A7A
          </button>
        </div>
        
        <div class="yyt-form-group" id="${y}-test-result-container" style="display: none;">
          <label>\u63D0\u53D6\u7ED3\u679C</label>
          <div class="yyt-test-result" id="${y}-test-result"></div>
        </div>
      </div>
    `},bindEvents(t,e){let s=H();!s||!V(t)||(this._bindRuleEditorEvents(t,s),this._bindPresetEvents(t,s),this._bindTestEvents(t,s),this._bindFileEvents(t,s))},_bindRuleEditorEvents(t,e){t.find(".yyt-rule-type").on("change",function(){let n=e(this).closest(".yyt-rule-item").data("rule-index"),r=e(this).val();Wt(n,{type:r}),m("info","\u89C4\u5219\u7C7B\u578B\u5DF2\u66F4\u65B0")}),t.find(".yyt-rule-value").on("change",function(){let n=e(this).closest(".yyt-rule-item").data("rule-index"),r=e(this).val().trim();Wt(n,{value:r})}),t.find(".yyt-rule-enabled").on("change",function(){let n=e(this).closest(".yyt-rule-item").data("rule-index"),r=e(this).is(":checked");Wt(n,{enabled:r}),m("info",r?"\u89C4\u5219\u5DF2\u542F\u7528":"\u89C4\u5219\u5DF2\u7981\u7528")}),t.find(".yyt-rule-delete").on("click",()=>{let n=t.find(".yyt-rule-delete").closest(".yyt-rule-item").data("rule-index");confirm("\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u6761\u89C4\u5219\u5417\uFF1F")&&(ps(n),this.renderTo(t),m("info","\u89C4\u5219\u5DF2\u5220\u9664"))}),t.on("click",".yyt-rule-delete",s=>{let r=e(s.currentTarget).closest(".yyt-rule-item").data("rule-index");confirm("\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u6761\u89C4\u5219\u5417\uFF1F")&&(ps(r),this.renderTo(t),m("info","\u89C4\u5219\u5DF2\u5220\u9664"))}),t.find(`#${y}-add-rule`).on("click",()=>{Yt({type:"include",value:"",enabled:!0}),this.renderTo(t),m("success","\u5DF2\u6DFB\u52A0\u65B0\u89C4\u5219")}),t.find(`#${y}-scan-tags`).on("click",async()=>{let s=t.find(`#${y}-scan-tags`),n=t.find(`#${y}-test-input`).val();if(!n||!n.trim()){m("warning","\u8BF7\u5148\u8F93\u5165\u8981\u626B\u63CF\u7684\u6587\u672C");return}s.prop("disabled",!0).find("i").addClass("fa-spin");try{let r=await Bs(n,{maxTags:50,timeoutMs:3e3}),{suggestions:o,stats:a}=zs(r,25);if(o.length===0){m("info","\u672A\u53D1\u73B0\u53EF\u7528\u7684\u6807\u7B7E"),t.find(`#${y}-tag-suggestions-container`).hide();return}let i=t.find(`#${y}-tag-list`);t.find(`#${y}-tag-scan-stats`).text(`${a.finalCount}/${a.totalFound} \u4E2A\u6807\u7B7E, ${r.stats.processingTimeMs}ms`),i.empty(),o.forEach(c=>{let u=e(`<button class="yyt-btn yyt-btn-small yyt-btn-secondary" title="\u70B9\u51FB\u6DFB\u52A0\u4E3A\u5305\u542B\u89C4\u5219">${v(c)}</button>`);u.on("click",()=>{if(ct().some(g=>g.type==="include"&&g.value===c)){m("warning",`\u89C4\u5219 "\u5305\u542B: ${c}" \u5DF2\u5B58\u5728`);return}Yt({type:"include",value:c,enabled:!0}),this.renderTo(t),m("success",`\u5DF2\u6DFB\u52A0\u89C4\u5219: \u5305\u542B "${c}"`)}),i.append(u)}),t.find(`#${y}-tag-suggestions-container`).show(),m("success",`\u53D1\u73B0 ${o.length} \u4E2A\u6807\u7B7E`)}catch(r){m("error",`\u626B\u63CF\u5931\u8D25: ${r.message}`)}finally{s.prop("disabled",!1).find("i").removeClass("fa-spin")}}),t.find(`#${y}-add-exclude-cot`).on("click",()=>{let s=ct(),n="<!--[\\s\\S]*?-->";if(s.some(o=>o.type==="regex_exclude"&&o.value===n)){m("warning","\u6392\u9664HTML\u6CE8\u91CA\u89C4\u5219\u5DF2\u5B58\u5728");return}Yt({type:"regex_exclude",value:n,enabled:!0}),this.renderTo(t),m("success","\u5DF2\u6DFB\u52A0\u6392\u9664HTML\u6CE8\u91CA\u89C4\u5219")}),t.find(`#${y}-content-blacklist`).on("change",function(){let n=e(this).val().split(",").map(r=>r.trim()).filter(r=>r);ys(n),m("info",`\u9ED1\u540D\u5355\u5DF2\u66F4\u65B0\uFF0C\u5171 ${n.length} \u4E2A\u5173\u952E\u8BCD`)}),t.find(`#${y}-show-examples`).on("click",()=>{alert(`
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
      `)})},_bindPresetEvents(t,e){t.find(`#${y}-load-rule-preset`).on("click",()=>{let s=t.find(`#${y}-rule-preset-select`).val();if(!s){m("warning","\u8BF7\u9009\u62E9\u4E00\u4E2A\u9884\u8BBE");return}let n=Ks(s);n.success?(this.renderTo(t),m("success",`\u5DF2\u52A0\u8F7D\u9884\u8BBE: ${n.preset.name}`),P.emit(I.REGEX_PRESET_LOADED,{preset:n.preset})):m("error",n.message)}),t.find(`#${y}-save-rule-preset`).on("click",()=>{let s=prompt("\u8BF7\u8F93\u5165\u9884\u8BBE\u540D\u79F0:");if(!s||!s.trim())return;let n=Fs(s.trim());n.success?(this.renderTo(t),m("success",`\u9884\u8BBE "${s.trim()}" \u5DF2\u4FDD\u5B58`)):m("error",n.message)})},_bindTestEvents(t,e){t.find(`#${y}-test-extract`).on("click",()=>{let s=t.find(`#${y}-test-input`).val();if(!s||!s.trim()){m("warning","\u8BF7\u8F93\u5165\u6D4B\u8BD5\u6587\u672C");return}let n=ct(),r=Dt(),o=kt(s,n,r),a=t.find(`#${y}-test-result-container`),i=t.find(`#${y}-test-result`);a.show(),!o||!o.trim()?(i.html('<div class="yyt-result-empty">\u63D0\u53D6\u7ED3\u679C\u4E3A\u7A7A</div>'),m("warning","\u63D0\u53D6\u7ED3\u679C\u4E3A\u7A7A\uFF0C\u8BF7\u68C0\u67E5\u89C4\u5219\u914D\u7F6E")):(i.html(`<pre class="yyt-code-block">${v(o)}</pre>`),m("success","\u63D0\u53D6\u5B8C\u6210"),P.emit(I.REGEX_EXTRACTED,{result:o}))}),t.find(`#${y}-test-clear`).on("click",()=>{t.find(`#${y}-test-input`).val(""),t.find(`#${y}-test-result-container`).hide()})},_bindFileEvents(t,e){t.find(`#${y}-import-rules`).on("click",()=>{t.find(`#${y}-import-rules-file`).click()}),t.find(`#${y}-import-rules-file`).on("change",async s=>{let n=s.target.files[0];if(n){try{let r=await lt(n),o=Ws(r,{overwrite:!0});o.success?(this.renderTo(t),m("success","\u89C4\u5219\u914D\u7F6E\u5DF2\u5BFC\u5165")):m("error",o.message)}catch(r){m("error",`\u5BFC\u5165\u5931\u8D25: ${r.message}`)}e(s.target).val("")}}),t.find(`#${y}-export-rules`).on("click",()=>{try{let s=Ys();it(s,`youyou_toolkit_rules_${Date.now()}.json`),m("success","\u89C4\u5219\u914D\u7F6E\u5DF2\u5BFC\u51FA")}catch(s){m("error",`\u5BFC\u51FA\u5931\u8D25: ${s.message}`)}}),t.find(`#${y}-reset-rules`).on("click",()=>{confirm("\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u89C4\u5219\u5417\uFF1F\u8FD9\u5C06\u6E05\u7A7A\u5F53\u524D\u7684\u89C4\u5219\u914D\u7F6E\u3002")&&(js([]),ys([]),this.renderTo(t),m("info","\u89C4\u5219\u5DF2\u91CD\u7F6E"))})},destroy(t){!H()||!V(t)||t.find("*").off()},getStyles(){return`
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
        padding: 10px 12px;
        background: linear-gradient(135deg, var(--yyt-surface) 0%, rgba(255, 255, 255, 0.01) 100%);
        border: 1px solid var(--yyt-border);
        border-radius: var(--yyt-radius-sm);
        transition: all 0.2s ease;
      }
      
      .yyt-rule-item:hover {
        background: linear-gradient(135deg, var(--yyt-surface-hover) 0%, var(--yyt-surface) 100%);
        border-color: rgba(255, 255, 255, 0.12);
      }
      
      .yyt-rule-enabled-label {
        flex-shrink: 0;
        white-space: nowrap;
      }
      
      /* \u6807\u7B7E\u5EFA\u8BAE\u533A\u57DF */
      .yyt-tag-suggestions {
        margin-top: 12px;
        padding: 12px;
        background: linear-gradient(135deg, rgba(74, 222, 128, 0.08) 0%, rgba(74, 222, 128, 0.02) 100%);
        border: 1px solid rgba(74, 222, 128, 0.2);
        border-radius: var(--yyt-radius-sm);
      }
      
      .yyt-tag-suggestions-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
        font-size: 12px;
        font-weight: 600;
        color: var(--yyt-text-secondary);
      }
      
      .yyt-tag-list {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
      }
      
      .yyt-tag-list .yyt-btn {
        cursor: pointer;
      }
      
      .yyt-tag-list .yyt-btn:hover {
        background: linear-gradient(135deg, rgba(123, 183, 255, 0.2) 0%, rgba(123, 183, 255, 0.1) 100%);
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
      
      .yyt-checkbox-label {
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: 12px;
        color: var(--yyt-text-secondary);
        cursor: pointer;
      }
      
      .yyt-checkbox-label input {
        width: 14px;
        height: 14px;
        cursor: pointer;
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
    `},renderTo(t){let e=this.render({});t.html(e),this.bindEvents(t,{})}}});var vo={};de(vo,{DEFAULT_TOOL_PRESETS:()=>Xe,DEFAULT_TOOL_STRUCTURE:()=>_e,TOOL_STORAGE_KEYS:()=>X,cloneTool:()=>xi,createDefaultToolDefinition:()=>gs,deleteTool:()=>nr,deleteToolPreset:()=>Ei,exportTools:()=>ar,getAllToolPresets:()=>or,getAllTools:()=>$t,getCurrentToolPresetId:()=>Ti,getTool:()=>qt,getToolPreset:()=>vi,importTools:()=>ir,normalizeToolDefinitionToRuntimeConfig:()=>qs,resetTools:()=>lr,saveTool:()=>Js,saveToolPreset:()=>Si,setCurrentToolPreset:()=>wi,setToolEnabled:()=>rr,validateTool:()=>_i});function Vt(t){return Array.isArray(t)?t.map(e=>String(e||"").trim()).filter(Boolean):[]}function sr(t,e){let s=parseInt(t,10);return Number.isFinite(s)&&s>0?s:e}function hi(t=[]){let e=Array.isArray(t)?t.map(s=>({role:String(s?.role||"user").trim().toUpperCase(),content:String(s?.content||"").trim()})).filter(s=>s.content):[];return e.length===0?"":e.length===1?e[0].content:e.map(s=>`\u3010${s.role||"USER"}\u3011
${s.content}`).join(`

`)}function bi(t,e={}){let s=typeof e?.promptTemplate=="string"?e.promptTemplate.trim():"";if(s)return s;let n=hi(e?.config?.messages||[]);return n||`\u8BF7\u57FA\u4E8E\u6700\u8FD1\u7684 AI \u56DE\u590D\u4E3A\u5DE5\u5177\u201C${e?.name||t}\u201D\u751F\u6210\u7ED3\u6784\u5316\u8F93\u51FA\u3002`}function gs(t={}){let e=new Date().toISOString(),s=t?.config||{};return{..._e,...t,id:t?.id||_e.id,icon:t?.icon||_e.icon,order:Number.isFinite(t?.order)?t.order:_e.order,promptTemplate:typeof t?.promptTemplate=="string"?t.promptTemplate:_e.promptTemplate,extractTags:Vt(t?.extractTags),config:{..._e.config,...s,trigger:{..._e.config.trigger,...s.trigger||{},events:Vt(s?.trigger?.events)},execution:{..._e.config.execution,...s.execution||{},timeout:sr(s?.execution?.timeout,_e.config.execution.timeout),retries:Math.max(0,parseInt(s?.execution?.retries,10)||_e.config.execution.retries)},api:{..._e.config.api,...s.api||{}},messages:Array.isArray(s?.messages)?s.messages:[],context:{..._e.config.context,...s.context||{},depth:sr(s?.context?.depth,_e.config.context.depth),includeTags:Vt(s?.context?.includeTags),excludeTags:Vt(s?.context?.excludeTags)}},enabled:t?.enabled!==!1,metadata:{..._e.metadata,...t?.metadata||{},createdAt:t?.metadata?.createdAt||e,updatedAt:t?.metadata?.updatedAt||e}}}function qs(t,e={},s={}){let n=gs({...e,id:t||e?.id||""}),r=Vt(n?.config?.trigger?.events),o=Vt(n?.extractTags?.length?n.extractTags:n?.config?.context?.includeTags),a=String(e?.output?.apiPreset||n?.config?.api?.preset||"").trim(),i=bi(t,n),l=r[0]||"GENERATION_ENDED",c=r.includes("GENERATION_ENDED"),u=typeof e?.output?.mode=="string"&&e.output.mode.trim()?e.output.mode.trim():s.defaultOutputMode||"follow_ai";return{id:n.id||t,name:n.name||t,icon:n.icon||"fa-screwdriver-wrench",description:n.description||"",enabled:n.enabled!==!1,order:Number.isFinite(n.order)?n.order:100,trigger:{event:l,enabled:c},bypass:{enabled:n?.config?.api?.useBypass===!0&&!!n?.config?.api?.bypassPreset,presetId:n?.config?.api?.bypassPreset||""},output:{mode:u,apiPreset:a,overwrite:!0,enabled:u==="post_response_api"?c:!1},extraction:{enabled:!0,maxMessages:sr(n?.config?.context?.depth,5),selectors:o},promptTemplate:i,runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},apiPreset:a,extractTags:o,isCustom:!0,category:n.category||"utility",metadata:{...n.metadata||{}}}}function $t(){let t=W.get(X.TOOLS),e=t&&typeof t=="object"?{...Xe,...t}:{...Xe};return Object.fromEntries(Object.entries(e).map(([s,n])=>[s,gs({...n||{},id:s})]))}function qt(t){return $t()[t]||null}function Js(t,e){if(!t||!e)return!1;let s=W.get(X.TOOLS)||{},n=!s[t]&&!Xe[t],r=gs({...s[t]||{},...e,id:t,metadata:{...s[t]?.metadata||{},...e.metadata||{},createdAt:s[t]?.metadata?.createdAt||e?.metadata?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString()}});return s[t]=r,W.set(X.TOOLS,s),P.emit(n?I.TOOL_REGISTERED:I.TOOL_UPDATED,{toolId:t,tool:r}),!0}function nr(t){if(Xe[t])return!1;let e=W.get(X.TOOLS)||{};return e[t]?(delete e[t],W.set(X.TOOLS,e),P.emit(I.TOOL_UNREGISTERED,{toolId:t}),!0):!1}function rr(t,e){let s=qt(t);if(!s)return!1;let n=W.get(X.TOOLS)||{};return n[t]||(n[t]={...s}),n[t].enabled=e,n[t].metadata={...n[t].metadata,updatedAt:new Date().toISOString()},W.set(X.TOOLS,n),P.emit(e?I.TOOL_ENABLED:I.TOOL_DISABLED,{toolId:t}),!0}function xi(t,e,s){let n=qt(t);if(!n)return!1;let r=JSON.parse(JSON.stringify(n));return r.name=s||`${n.name} (\u526F\u672C)`,r.metadata={...r.metadata,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()},Js(e,r)}function or(){let t=W.get(X.PRESETS);return t&&typeof t=="object"?{...Xe,...t}:{...Xe}}function vi(t){return or()[t]||null}function Si(t,e){if(!t||!e)return!1;let s=W.get(X.PRESETS)||{};return s[t]={...e,metadata:{...e.metadata,updatedAt:new Date().toISOString()}},W.set(X.PRESETS,s),!0}function Ei(t){if(Xe[t])return!1;let e=W.get(X.PRESETS)||{};return e[t]?(delete e[t],W.set(X.PRESETS,e),!0):!1}function Ti(){return W.get(X.CURRENT_PRESET)||null}function wi(t){return or()[t]?(W.set(X.CURRENT_PRESET,t),!0):!1}function ar(){let t=W.get(X.TOOLS)||{},e=W.get(X.PRESETS)||{};return JSON.stringify({version:"1.0.0",exportedAt:new Date().toISOString(),tools:t,presets:e},null,2)}function ir(t,e=!1){try{let s=typeof e=="object"?!!e?.overwrite:!!e,n=JSON.parse(t);if(!n||typeof n!="object")return{success:!1,toolsImported:0,presetsImported:0,message:"\u65E0\u6548\u7684JSON\u683C\u5F0F"};let r=s?{}:W.get(X.TOOLS)||{},o=s?{}:W.get(X.PRESETS)||{},a=0,i=0;if(n.tools&&typeof n.tools=="object"){for(let[l,c]of Object.entries(n.tools))Xe[l]&&!s||c&&typeof c=="object"&&(r[l]=gs({...c,id:l}),a++);W.set(X.TOOLS,r)}if(n.presets&&typeof n.presets=="object"){for(let[l,c]of Object.entries(n.presets))Xe[l]&&!s||c&&typeof c=="object"&&(o[l]=c,i++);W.set(X.PRESETS,o)}return{success:!0,toolsImported:a,presetsImported:i,message:`\u6210\u529F\u5BFC\u5165 ${a} \u4E2A\u5DE5\u5177\u548C ${i} \u4E2A\u9884\u8BBE`}}catch(s){return{success:!1,toolsImported:0,presetsImported:0,message:`\u5BFC\u5165\u5931\u8D25: ${s.message}`}}}function lr(){W.remove(X.TOOLS),W.remove(X.PRESETS),W.remove(X.CURRENT_PRESET)}function _i(t){let e=[];if(!t)return{valid:!1,errors:["\u5DE5\u5177\u5B9A\u4E49\u4E3A\u7A7A"]};if((!t.name||typeof t.name!="string")&&e.push("\u5DE5\u5177\u540D\u79F0\u65E0\u6548"),(!t.category||typeof t.category!="string")&&e.push("\u5DE5\u5177\u5206\u7C7B\u65E0\u6548"),t.config){let{trigger:s,execution:n,api:r,context:o}=t.config;s&&!["manual","event","scheduled"].includes(s.type)&&e.push("\u89E6\u53D1\u7C7B\u578B\u65E0\u6548"),n&&((typeof n.timeout!="number"||n.timeout<0)&&e.push("\u8D85\u65F6\u65F6\u95F4\u5FC5\u987B\u4E3A\u6B63\u6570"),(typeof n.retries!="number"||n.retries<0)&&e.push("\u91CD\u8BD5\u6B21\u6570\u5FC5\u987B\u4E3A\u6B63\u6570")),o&&typeof o.depth!="number"&&e.push("\u4E0A\u4E0B\u6587\u6DF1\u5EA6\u5FC5\u987B\u4E3A\u6570\u5B57")}return{valid:e.length===0,errors:e}}var _e,Xe,X,Xs=j(()=>{ht();Se();_e={id:"",name:"",description:"",icon:"fa-screwdriver-wrench",order:100,category:"utility",promptTemplate:"",extractTags:[],config:{trigger:{type:"manual",events:[]},execution:{timeout:6e4,retries:3},api:{preset:"",useBypass:!1,bypassPreset:""},messages:[],context:{depth:3,includeTags:[],excludeTags:[]}},enabled:!0,metadata:{createdAt:null,updatedAt:null,author:"",version:"1.0.0"}},Xe={},X={TOOLS:"tools",PRESETS:"tool_presets",CURRENT_PRESET:"current_tool_preset"}});var Lo={};de(Lo,{TOOL_CATEGORIES:()=>So,TOOL_REGISTRY:()=>Jt,appendToolRuntimeHistory:()=>bs,clearToolApiPreset:()=>Ro,default:()=>Di,ensureToolRuntimeConfig:()=>Zs,getAllDefaultToolConfigs:()=>$o,getAllToolApiBindings:()=>Co,getAllToolFullConfigs:()=>gr,getEnabledTools:()=>en,getToolApiPreset:()=>pr,getToolBaseConfig:()=>Qs,getToolConfig:()=>hs,getToolFullConfig:()=>ne,getToolList:()=>Ao,getToolSubTabs:()=>Io,getToolWindowState:()=>No,hasTool:()=>ur,onPresetDeleted:()=>ko,patchToolRuntime:()=>Xt,registerTool:()=>wo,resetToolConfig:()=>Do,resetToolRegistry:()=>Mo,saveToolConfig:()=>Ze,saveToolWindowState:()=>Oo,setToolApiPreset:()=>Po,setToolApiPresetConfig:()=>Ri,setToolBypassConfig:()=>Ci,setToolOutputMode:()=>Pi,setToolPromptTemplate:()=>ki,unregisterTool:()=>_o,updateToolRuntime:()=>yr});function fs(t={}){let e=Array.isArray(t?.recentTriggerHistory)?t.recentTriggerHistory.filter(Boolean):[],s=Array.isArray(t?.recentWritebackHistory)?t.recentWritebackHistory.filter(Boolean):[];return{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0,lastTriggerAt:0,lastTriggerEvent:"",lastMessageKey:"",lastSkipReason:"",lastExecutionPath:"",lastWritebackStatus:"",lastFailureStage:"",lastTraceId:"",...t,recentTriggerHistory:e,recentWritebackHistory:s}}function Ai(t,e=10){let s=Number.isFinite(e)?Math.max(1,Math.min(50,Math.floor(e))):10;return Array.isArray(t)?t.length<=s?t:t.slice(t.length-s):[]}function Eo(){let t=$t()||{};return Object.entries(t).filter(([e])=>!ms[e]).map(([e,s])=>[e,s||{}])}function To(){let t=Array.isArray(Jt.tools?.subTabs)?[...Jt.tools.subTabs]:[],e=Eo().map(([s,n],r)=>{let o=qs(s,n);return{id:s,name:o.name||s,icon:o.icon||"fa-screwdriver-wrench",component:"GenericToolConfigPanel",order:Number.isFinite(o.order)?o.order:100+r,isCustom:!0,description:o.description||""}});return[...t,...e].sort((s,n)=>(s.order??0)-(n.order??0))}function Ii(t,e={}){let s=qs(t,e,{defaultOutputMode:"follow_ai"});return{...s,runtime:fs(s.runtime)}}function dr(t){let e=ms[t];if(e)return{...e,trigger:{...e.trigger||{}},output:{...e.output||{}},bypass:{...e.bypass||{}},extraction:{...e.extraction||{}},runtime:fs(e.runtime),extractTags:Array.isArray(e.extractTags)?[...e.extractTags]:[]};let n=($t()||{})[t]||null;return n?Ii(t,n):hs(t)}function Qs(t){let e=dr(t);return e?{...e,trigger:{...e.trigger||{}},output:{...e.output||{}},bypass:{...e.bypass||{}},extraction:{...e.extraction||{},selectors:Array.isArray(e?.extraction?.selectors)?[...e.extraction.selectors]:[]},runtime:{...e.runtime||{}},extractTags:Array.isArray(e.extractTags)?[...e.extractTags]:[]}:null}function Mi(t,e={},s=""){if(!t)return null;let n={...t,...e,id:t.id||e.id};n.trigger={...t.trigger||{},...e.trigger||{}},n.output={...t.output||{},...e.output||{}},n.bypass={...t.bypass||{},...e.bypass||{}},n.runtime=fs({...t.runtime||{},...e.runtime||{}}),n.extraction={...t.extraction||{},...e.extraction||{}};let r=e?.output?.apiPreset||e?.apiPreset||n.output?.apiPreset||n.apiPreset||s||"";return n.output={...n.output||{},apiPreset:r},n.apiPreset=r,(!Array.isArray(n.extraction.selectors)||n.extraction.selectors.length===0)&&Array.isArray(n.extractTags)&&n.extractTags.length>0&&(n.extraction.selectors=[...n.extractTags]),(!Array.isArray(n.extractTags)||n.extractTags.length===0)&&(n.extractTags=Array.isArray(n.extraction.selectors)?[...n.extraction.selectors]:[]),t.isCustom?n.enabled=t.enabled!==!1:typeof e.enabled=="boolean"?n.enabled=e.enabled:n.enabled=t.enabled!==!1,n}function wo(t,e){if(!t||typeof t!="string")return console.error("[ToolRegistry] \u5DE5\u5177ID\u65E0\u6548"),!1;if(!e||typeof e!="object")return console.error("[ToolRegistry] \u5DE5\u5177\u914D\u7F6E\u65E0\u6548"),!1;let s=["name","icon","component"];for(let n of s)if(!e[n])return console.error(`[ToolRegistry] \u5DE5\u5177\u7F3A\u5C11\u5FC5\u9700\u5B57\u6BB5: ${n}`),!1;return Qe[t]={id:t,...e,order:e.order??Object.keys(Qe).length},console.log(`[ToolRegistry] \u5DE5\u5177\u5DF2\u6CE8\u518C: ${t}`),!0}function _o(t){return Qe[t]?(delete Qe[t],console.log(`[ToolRegistry] \u5DE5\u5177\u5DF2\u6CE8\u9500: ${t}`),!0):(console.warn(`[ToolRegistry] \u5DE5\u5177\u4E0D\u5B58\u5728: ${t}`),!1)}function Ao(t=!0){let e=Object.values(Qe).map(s=>s.id==="tools"?{...s,subTabs:To()}:s);return t?e.sort((s,n)=>(s.order??0)-(n.order??0)):e}function hs(t){return t==="tools"&&Qe[t]?{...Qe[t],subTabs:To()}:Qe[t]||null}function ur(t){return!!Qe[t]}function Io(t){let e=hs(t);return!e||!e.hasSubTabs?[]:e.subTabs||[]}function Mo(){Qe={...Jt},console.log("[ToolRegistry] \u5DE5\u5177\u6CE8\u518C\u8868\u5DF2\u91CD\u7F6E")}function Po(t,e){if(!ur(t))return console.warn(`[ToolRegistry] \u5DE5\u5177\u4E0D\u5B58\u5728: ${t}`),!1;let s=T.get(Ne)||{};return s[t]=e||"",T.set(Ne,s),console.log(`[ToolRegistry] \u5DE5\u5177 "${t}" \u7ED1\u5B9A\u5230\u9884\u8BBE "${e||"\u5F53\u524D\u914D\u7F6E"}"`),!0}function pr(t){return(T.get(Ne)||{})[t]||""}function Ro(t){let e=T.get(Ne)||{};delete e[t],T.set(Ne,e),console.log(`[ToolRegistry] \u5DE5\u5177 "${t}" \u7684API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u6E05\u9664`)}function Co(){return T.get(Ne)||{}}function ko(t){let e=T.get(Ne)||{},s=!1;for(let n in e)e[n]===t&&(e[n]="",s=!0,console.log(`[ToolRegistry] \u5DE5\u5177 "${n}" \u7684API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u6E05\u9664\uFF08\u9884\u8BBE\u88AB\u5220\u9664\uFF09`));s&&T.set(Ne,e)}function ne(t){let e=dr(t);if(!e)return hs(t);let n=(T.get(Ot)||{})[t]||{},r=pr(t);return Mi({...e,id:t},n,r)}function Zs(t){if(!t)return!1;let e=dr(t);if(!e)return!1;let s=T.get(Ot)||{};if(s[t])return!0;let n={promptTemplate:e.promptTemplate||"",enabled:e.enabled!==!1,extractTags:Array.isArray(e.extractTags)?[...e.extractTags]:[],apiPreset:e.apiPreset||"",trigger:{...e.trigger||{}},output:{...e.output||{}},bypass:{...e.bypass||{}},extraction:{...e.extraction||{},selectors:Array.isArray(e?.extraction?.selectors)?[...e.extraction.selectors]:[]},runtime:{...e.runtime||{}}};s[t]=n,T.set(Ot,s);let r=T.get(Ne)||{};return r[t]=n.output?.apiPreset||n.apiPreset||"",T.set(Ne,r),P.emit(I.TOOL_UPDATED,{toolId:t,config:n}),!0}function Ze(t,e,s={}){if(!t||!ne(t))return console.warn("[ToolRegistry] \u5DE5\u5177\u4E0D\u5B58\u5728:",t),!1;let{emitEvent:n=!0}=s,r=T.get(Ot)||{},o=T.get(Ne)||{},a=e?.output?.apiPreset??e?.apiPreset??"",i=["promptTemplate","enabled","extractTags","apiPreset","trigger","output","bypass","extraction","runtime"];return r[t]={},i.forEach(l=>{if(e[l]!==void 0){if(l==="output"&&e.output){r[t][l]={...e.output,apiPreset:a};return}if(l==="apiPreset"){r[t][l]=a;return}r[t][l]=e[l]}}),r[t].apiPreset===void 0&&(r[t].apiPreset=a),!r[t].output&&e.output!==void 0&&(r[t].output={...e.output||{},apiPreset:a}),T.set(Ot,r),o[t]=a,T.set(Ne,o),n&&P.emit(I.TOOL_UPDATED,{toolId:t,config:r[t]}),console.log(`[ToolRegistry] \u5DE5\u5177\u914D\u7F6E\u5DF2\u4FDD\u5B58: ${t}`),!0}function Pi(t,e){let s=ne(t);return s?Ze(t,{...s,output:{...s.output,mode:e}}):!1}function Ri(t,e){let s=ne(t);return s?Ze(t,{...s,apiPreset:e,output:{...s.output,apiPreset:e}}):!1}function Ci(t,e){let s=ne(t);return s?Ze(t,{...s,bypass:{...s.bypass,...e}}):!1}function ki(t,e){let s=ne(t);return s?Ze(t,{...s,promptTemplate:e}):!1}function Xt(t,e,s={}){let n=ne(t);if(!n)return!1;let{touchLastRunAt:r=!1,emitEvent:o=!1}=s,a=fs({...n.runtime||{},...e||{}});return r&&(a.lastRunAt=Date.now()),Ze(t,{...n,runtime:a},{emitEvent:o})}function bs(t,e,s={},n={}){let r=ne(t);if(!r)return!1;let{limit:o=10,emitEvent:a=!1}=n,i=fs(r.runtime||{}),l=e==="writeback"?"recentWritebackHistory":"recentTriggerHistory",c={id:s?.id||`hist_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,at:s?.at||Date.now(),...s};return i[l]=Ai([...Array.isArray(i[l])?i[l]:[],c],o),c?.traceId&&(i.lastTraceId=c.traceId),Ze(t,{...r,runtime:i},{emitEvent:a})}function yr(t,e){return Xt(t,e,{touchLastRunAt:!0,emitEvent:!0})}function Do(t){if(!t||!ms[t])return console.warn("[ToolRegistry] \u5DE5\u5177\u4E0D\u5B58\u5728:",t),!1;let e=T.get(Ot)||{};return delete e[t],T.set(Ot,e),P.emit(I.TOOL_UPDATED,{toolId:t,config:null}),console.log(`[ToolRegistry] \u5DE5\u5177\u914D\u7F6E\u5DF2\u91CD\u7F6E: ${t}`),!0}function $o(){return{...ms}}function gr(){let t=new Set([...Object.keys(ms),...Eo().map(([e])=>e)]);return Array.from(t).map(e=>ne(e)).filter(Boolean)}function en(){return gr().filter(t=>t&&t.enabled)}function Oo(t,e){let s=T.get(cr)||{};s[t]={...e,updatedAt:Date.now()},T.set(cr,s)}function No(t){return(T.get(cr)||{})[t]||null}var Ot,Ne,cr,ms,Jt,So,Qe,Di,Qt=j(()=>{ht();Se();Xs();Ot="tool_configs",Ne="tool_api_bindings",cr="tool_window_states";ms={summaryTool:{id:"summaryTool",name:"\u6458\u8981\u5DE5\u5177",icon:"fa-file-lines",description:"\u751F\u6210\u5267\u60C5\u6458\u8981\u5757",enabled:!0,order:3,trigger:{event:"GENERATION_ENDED",enabled:!0},bypass:{enabled:!1,presetId:""},output:{mode:"follow_ai",apiPreset:"",overwrite:!0,enabled:!0},extraction:{enabled:!0,maxMessages:5,selectors:["boo_FM"]},promptTemplate:`\u8BF7\u6839\u636E\u4EE5\u4E0BAI\u56DE\u590D\u751F\u6210\u6458\u8981\u5757\uFF1A

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
</boo_FM>`,runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},apiPreset:"",extractTags:["boo_FM"]},statusBlock:{id:"statusBlock",name:"\u4E3B\u89D2\u72B6\u6001\u680F",icon:"fa-user-check",description:"\u751F\u6210\u4E3B\u89D2\u72B6\u6001\u4EE3\u7801\u5757",enabled:!0,order:4,trigger:{event:"GENERATION_ENDED",enabled:!0},bypass:{enabled:!1,presetId:""},output:{mode:"follow_ai",apiPreset:"",overwrite:!0,enabled:!0},extraction:{enabled:!0,maxMessages:5,selectors:["status_block"]},promptTemplate:`\u8BF7\u6839\u636E\u4EE5\u4E0B\u5BF9\u8BDD\u5185\u5BB9\u751F\u6210\u89D2\u8272\u72B6\u6001\u5757\uFF1A

\u8F93\u51FA\u683C\u5F0F\uFF1A
<status_block>
<name>\u89D2\u8272\u540D</name>
<location>\u4F4D\u7F6E</location>
<condition>\u72B6\u6001</condition>
<equipment>\u88C5\u5907</equipment>
<skills>\u6280\u80FD</skills>
</status_block>`,runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},apiPreset:"",extractTags:["status_block"]},youyouReview:{id:"youyouReview",name:"\u5C0F\u5E7D\u70B9\u8BC4",icon:"fa-comment-dots",description:"\u5728\u56DE\u590D\u672B\u5C3E\u751F\u6210\u5C0F\u5E7D\u70B9\u8BC4\u4E0E\u5267\u60C5\u94A9\u5B50",enabled:!0,order:5,trigger:{event:"GENERATION_ENDED",enabled:!0},bypass:{enabled:!1,presetId:""},output:{mode:"follow_ai",apiPreset:"",overwrite:!0,enabled:!0},extraction:{enabled:!0,maxMessages:5,selectors:["youyou"]},promptTemplate:`\u8BF7\u57FA\u4E8E\u4EE5\u4E0B\u6700\u65B0\u5267\u60C5\u56DE\u590D\uFF0C\u751F\u6210\u201C\u5C0F\u5E7D\u70B9\u8BC4\u201D\u3002

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
</youyou>`,runtime:{lastRunAt:0,lastStatus:"idle",lastError:"",lastDurationMs:0,successCount:0,errorCount:0},apiPreset:"",extractTags:["youyou"]}},Jt={apiPresets:{id:"apiPresets",name:"API\u9884\u8BBE",icon:"fa-database",hasSubTabs:!1,description:"\u7BA1\u7406API\u914D\u7F6E\u548C\u9884\u8BBE",component:"ApiPresetPanel",order:0},regexExtract:{id:"regexExtract",name:"\u6B63\u5219\u63D0\u53D6",icon:"fa-filter",hasSubTabs:!1,description:"\u4ECE\u6D88\u606F\u4E2D\u63D0\u53D6\u7279\u5B9A\u5185\u5BB9",component:"RegexExtractPanel",order:2,defaultConfig:{trigger:{type:"manual",events:[]},execution:{timeout:3e4,retries:1},api:{preset:""},extractRules:[],excludeRules:[]}},toolManage:{id:"toolManage",name:"\u5DE5\u5177\u5217\u8868",icon:"fa-screwdriver-wrench",hasSubTabs:!1,description:"\u521B\u5EFA\u3001\u7F16\u8F91\u548C\u7BA1\u7406\u81EA\u5B9A\u4E49\u5DE5\u5177",component:"ToolManagePanel",order:3},tools:{id:"tools",name:"\u5DE5\u5177",icon:"fa-tools",hasSubTabs:!0,description:"\u5DE5\u5177\u96C6\u5408",order:4,subTabs:[{id:"summaryTool",name:"\u6458\u8981\u5DE5\u5177",icon:"fa-file-lines",component:"SummaryToolPanel"},{id:"statusBlock",name:"\u4E3B\u89D2\u72B6\u6001\u680F",icon:"fa-user-check",component:"StatusBlockPanel"},{id:"youyouReview",name:"\u5C0F\u5E7D\u70B9\u8BC4",icon:"fa-comment-dots",component:"YouyouReviewPanel"}]},bypass:{id:"bypass",name:"\u7834\u9650\u8BCD",icon:"fa-shield-halved",hasSubTabs:!1,description:"\u7BA1\u7406\u7834\u9650\u8BCD\u9884\u8BBE",component:"BypassPanel",order:5},settings:{id:"settings",name:"\u8BBE\u7F6E",icon:"fa-cog",hasSubTabs:!1,description:"\u5168\u5C40\u8BBE\u7F6E",component:"SettingsPanel",order:6}},So={api:{name:"API\u5DE5\u5177",icon:"fa-plug",order:0},prompt:{name:"\u63D0\u793A\u8BCD\u5DE5\u5177",icon:"fa-file-alt",order:1},utility:{name:"\u5B9E\u7528\u5DE5\u5177",icon:"fa-wrench",order:2}},Qe={...Jt};Di={TOOL_REGISTRY:Jt,TOOL_CATEGORIES:So,registerTool:wo,unregisterTool:_o,getToolList:Ao,getToolConfig:hs,hasTool:ur,getToolSubTabs:Io,resetToolRegistry:Mo,setToolApiPreset:Po,getToolApiPreset:pr,clearToolApiPreset:Ro,getAllToolApiBindings:Co,onPresetDeleted:ko,saveToolWindowState:Oo,getToolWindowState:No,getToolBaseConfig:Qs,ensureToolRuntimeConfig:Zs,getToolFullConfig:ne,patchToolRuntime:Xt,appendToolRuntimeHistory:bs,saveToolConfig:Ze,resetToolConfig:Do,getAllDefaultToolConfigs:$o,getAllToolFullConfigs:gr,getEnabledTools:en}});var Ge,fr=j(()=>{qe();Xs();Qt();Ge={id:"toolManagePanel",_getToolkitWindow(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window},_openToolConfig(t){if(!t)return;let s=this._getToolkitWindow()?.YouYouToolkit||window.YouYouToolkit;if(!s){m("warning","\u672A\u627E\u5230\u5DE5\u5177\u7BB1\u5B9E\u4F8B\uFF0C\u65E0\u6CD5\u8DF3\u8F6C\u5230\u5DE5\u5177\u914D\u7F6E");return}s.switchMainTab("tools"),s.switchSubTab("tools",t)},render(t){let e=$t(),s=Object.entries(e),n=s.filter(([,r])=>r?.enabled!==!1).length;return`
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
                <strong class="yyt-tool-manage-stat-value">${n}</strong>
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
    `},_renderToolList(t){let e=Object.entries(t);return e.length?e.map(([s,n])=>`
      <div class="yyt-tool-item ${n.enabled?"yyt-enabled":"yyt-disabled"}" data-tool-id="${s}">
        <div class="yyt-tool-header">
          <div class="yyt-tool-info">
            <span class="yyt-tool-name">${v(n.name)}</span>
            <span class="yyt-tool-category">${v(n.category)}</span>
          </div>
          <div class="yyt-tool-controls">
            <label class="yyt-toggle yyt-tool-toggle">
              <input type="checkbox" ${n.enabled?"checked":""}>
              <span class="yyt-toggle-slider"></span>
            </label>
          </div>
        </div>
        <div class="yyt-tool-desc">${v(n.description)}</div>
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
      `},bindEvents(t,e){let s=H();!s||!V(t)||(this._bindToolEvents(t,s),this._bindFileEvents(t,s))},_bindToolEvents(t,e){t.find(".yyt-tool-toggle input").on("change",s=>{let n=e(s.currentTarget).closest(".yyt-tool-item"),r=n.data("tool-id"),o=e(s.currentTarget).is(":checked");rr(r,o),n.toggleClass("yyt-enabled",o).toggleClass("yyt-disabled",!o),m("info",o?"\u5DE5\u5177\u5DF2\u542F\u7528":"\u5DE5\u5177\u5DF2\u7981\u7528")}),t.find("#yyt-add-tool").on("click",()=>{this._showToolEditDialog(t,e,null)}),t.find('.yyt-tool-item [data-action="config"]').on("click",s=>{let n=e(s.currentTarget).closest(".yyt-tool-item").data("tool-id");this._openToolConfig(n)}),t.find('.yyt-tool-item [data-action="edit"]').on("click",s=>{let n=e(s.currentTarget).closest(".yyt-tool-item").data("tool-id");this._showToolEditDialog(t,e,n)}),t.find('.yyt-tool-item [data-action="delete"]').on("click",s=>{let n=e(s.currentTarget).closest(".yyt-tool-item").data("tool-id"),r=qt(n);if(!n||!r||!confirm(`\u786E\u5B9A\u8981\u5220\u9664\u5DE5\u5177\u201C${r.name}\u201D\u5417\uFF1F`))return;if(!nr(n)){m("error","\u5220\u9664\u5931\u8D25");return}this.renderTo(t),m("success","\u5DE5\u5177\u5DF2\u5220\u9664")})},_bindFileEvents(t,e){t.find("#yyt-import-tools").on("click",()=>{t.find("#yyt-import-tools-file").click()}),t.find("#yyt-import-tools-file").on("change",async s=>{let n=s.target.files[0];if(n){try{let r=await lt(n),o=ir(r,{overwrite:!1});m(o.success?"success":"error",o.message),o.success&&this.renderTo(t)}catch(r){m("error",`\u5BFC\u5165\u5931\u8D25: ${r.message}`)}e(s.target).val("")}}),t.find("#yyt-export-tools").on("click",()=>{try{let s=ar();it(s,`youyou_toolkit_tools_${Date.now()}.json`),m("success","\u5DE5\u5177\u5DF2\u5BFC\u51FA")}catch(s){m("error",`\u5BFC\u51FA\u5931\u8D25: ${s.message}`)}}),t.find("#yyt-reset-tools").on("click",()=>{confirm("\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u5DE5\u5177\u5417\uFF1F")&&(lr(),this.renderTo(t),m("info","\u5DE5\u5177\u5DF2\u91CD\u7F6E"))})},_showToolEditDialog(t,e,s){let n=s?qt(s):null,r=!!n,o=`
      <div class="yyt-dialog-overlay" id="yyt-tool-dialog-overlay">
        <div class="yyt-dialog yyt-dialog-wide">
          <div class="yyt-dialog-header">
            <span class="yyt-dialog-title">${r?"\u7F16\u8F91\u5DE5\u5177":"\u65B0\u5EFA\u5DE5\u5177"}</span>
            <button class="yyt-dialog-close" id="yyt-tool-dialog-close">
              <i class="fa-solid fa-times"></i>
            </button>
          </div>
          <div class="yyt-dialog-body">
            <div class="yyt-form-row">
              <div class="yyt-form-group yyt-flex-1">
                <label>\u5DE5\u5177\u540D\u79F0</label>
                <input type="text" class="yyt-input" id="yyt-tool-name" 
                       value="${n?v(n.name):""}" placeholder="\u5DE5\u5177\u540D\u79F0">
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
                     value="${n?v(n.description||""):""}" placeholder="\u5DE5\u5177\u63CF\u8FF0">
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
    `;e("#yyt-tool-dialog-overlay").remove(),t.append(o);let a=e("#yyt-tool-dialog-overlay"),i=()=>a.remove();a.find("#yyt-tool-dialog-close, #yyt-tool-dialog-cancel").on("click",i),a.on("click",function(l){l.target===this&&i()}),a.find("#yyt-tool-dialog-save").on("click",()=>{let l=e("#yyt-tool-name").val().trim(),c=e("#yyt-tool-category").val(),u=e("#yyt-tool-desc").val().trim(),d=parseInt(e("#yyt-tool-timeout").val())||6e4,h=parseInt(e("#yyt-tool-retries").val())||3;if(!l){m("warning","\u8BF7\u8F93\u5165\u5DE5\u5177\u540D\u79F0");return}let g=s||`tool_${Date.now()}`;if(!Js(g,{name:l,category:c,description:u,promptTemplate:n?.promptTemplate||"",extractTags:Array.isArray(n?.extractTags)?n.extractTags:[],config:{trigger:n?.config?.trigger||{type:"manual",events:[]},execution:{timeout:d,retries:h},api:n?.config?.api||{preset:"",useBypass:!1,bypassPreset:""},messages:Array.isArray(n?.config?.messages)?n.config.messages:[],context:{depth:n?.config?.context?.depth||3,includeTags:Array.isArray(n?.config?.context?.includeTags)?n.config.context.includeTags:[],excludeTags:Array.isArray(n?.config?.context?.excludeTags)?n.config.context.excludeTags:[]}},enabled:n?.enabled!==!1})){m("error",r?"\u5DE5\u5177\u66F4\u65B0\u5931\u8D25":"\u5DE5\u5177\u521B\u5EFA\u5931\u8D25");return}Zs(g),i(),this.renderTo(t),m("success",r?"\u5DE5\u5177\u5DF2\u66F4\u65B0":"\u5DE5\u5177\u5DF2\u521B\u5EFA"),r||this._openToolConfig(g)})},destroy(t){!H()||!V(t)||t.find("*").off()},getStyles(){return`
      /* \u5DE5\u5177\u7BA1\u7406\u9762\u677F\u6837\u5F0F */
      .yyt-tool-manager {
        display: flex;
        flex-direction: column;
        gap: 14px;
        min-height: 100%;
      }

      .yyt-tool-manage-hero {
        gap: 12px;
      }

      .yyt-tool-manage-hero-grid {
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto;
        gap: 12px;
        align-items: stretch;
      }

      .yyt-tool-manage-copy {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .yyt-tool-manage-lead {
        font-size: 16px;
        font-weight: 800;
        line-height: 1.2;
        color: var(--yyt-text);
      }
      
      .yyt-tool-list {
        display: flex;
        flex-direction: column;
        gap: 10px;
        min-height: 0;
        overflow-y: auto;
        padding-right: 4px;
      }

      .yyt-tool-manage-hint {
        font-size: 12px;
        color: var(--yyt-text-secondary);
        line-height: 1.55;
      }

      .yyt-tool-manage-stats {
        display: grid;
        grid-template-columns: repeat(2, minmax(110px, 1fr));
        gap: 10px;
      }

      .yyt-tool-manage-stat {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 6px;
        padding: 10px 12px;
        border-radius: 14px;
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.08);
        min-width: 110px;
      }

      .yyt-tool-manage-stat-label {
        font-size: 11px;
        color: var(--yyt-text-muted);
      }

      .yyt-tool-manage-stat-value {
        font-size: 18px;
        font-weight: 800;
        color: var(--yyt-text);
        line-height: 1;
      }
      
      .yyt-tool-item {
        padding: 12px;
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.045) 0%, rgba(255, 255, 255, 0.015) 100%);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 14px;
        transition: all 0.2s ease;
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
      }
      
      .yyt-tool-item:hover {
        border-color: rgba(255, 255, 255, 0.16);
        transform: translateY(-1px);
      }
      
      .yyt-tool-item.yyt-disabled {
        opacity: 0.62;
      }
      
      .yyt-tool-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
        gap: 12px;
      }
      
      .yyt-tool-info {
        display: flex;
        align-items: center;
        gap: 10px;
        min-width: 0;
        flex-wrap: wrap;
      }
      
      .yyt-tool-name {
        font-weight: 600;
        font-size: 15px;
        color: var(--yyt-text);
      }
      
      .yyt-tool-category {
        font-size: 11px;
        padding: 4px 8px;
        background: rgba(123, 183, 255, 0.1);
        border-radius: 999px;
        color: var(--yyt-accent);
      }
      
      .yyt-tool-desc {
        font-size: 12px;
        color: var(--yyt-text-muted);
        margin-bottom: 12px;
        line-height: 1.7;
      }

      .yyt-tool-actions {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
      }

      .yyt-tool-controls {
        flex-shrink: 0;
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
    `},renderTo(t){let e=this.render({});t.html(e),this.bindEvents(t,{})}}});var Uo={};de(Uo,{BypassManager:()=>tn,DEFAULT_BYPASS_PRESETS:()=>ut,addMessage:()=>Hi,buildBypassMessages:()=>qi,bypassManager:()=>L,createPreset:()=>Li,default:()=>Ji,deleteMessage:()=>Yi,deletePreset:()=>Gi,duplicatePreset:()=>Bi,exportPresets:()=>Wi,getAllPresets:()=>Oi,getDefaultPresetId:()=>zi,getEnabledMessages:()=>Fi,getPreset:()=>Ni,getPresetList:()=>hr,importPresets:()=>Vi,setDefaultPresetId:()=>ji,updateMessage:()=>Ki,updatePreset:()=>Ui});var dt,Zt,mr,ut,$i,tn,L,Oi,hr,Ni,Li,Ui,Gi,Bi,zi,ji,Fi,Hi,Ki,Yi,Wi,Vi,qi,Ji,xs=j(()=>{ht();Se();dt="bypass_presets",Zt="default_bypass_preset",mr="current_bypass_preset",ut={},$i=new Set(["\u6807\u51C6\u7834\u9650\u8BCD","\u589E\u5F3A\u7834\u9650"]),tn=class{constructor(){this._cache=null,this._migrated=!1,this.debugMode=!1}getAllPresets(){if(this._migrateLegacyData(),this._cache)return this._cache;let e=T.get(dt,{});return this._cache={...ut,...e},this._cache}getPresetList(){let e=this.getAllPresets();return Object.values(e).sort((s,n)=>(n.updatedAt||0)-(s.updatedAt||0))}getPreset(e){return e&&this.getAllPresets()[e]||null}presetExists(e){return!!this.getPreset(e)}createPreset(e){let{id:s,name:n,description:r,messages:o}=e;if(!s||typeof s!="string"||!s.trim())return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};if(!n||typeof n!="string"||!n.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let a=s.trim();if(this.presetExists(a))return{success:!1,message:`\u9884\u8BBE "${a}" \u5DF2\u5B58\u5728`};let i={id:a,name:n.trim(),description:r||"",enabled:!0,messages:o||[],createdAt:Date.now(),updatedAt:Date.now()};return this._savePreset(a,i),P.emit(I.BYPASS_PRESET_CREATED,{presetId:a,preset:i}),this._log(`\u9884\u8BBE\u5DF2\u521B\u5EFA: ${a}`),{success:!0,message:`\u9884\u8BBE "${n}" \u521B\u5EFA\u6210\u529F`,preset:i}}updatePreset(e,s){if(!e)return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};let n=this.getPreset(e);if(!n)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};if(s.id&&s.id!==e)return{success:!1,message:"\u4E0D\u5141\u8BB8\u4FEE\u6539\u9884\u8BBEID"};let r={...n,...s,id:e,updatedAt:Date.now()};return this._savePreset(e,r),P.emit(I.BYPASS_PRESET_UPDATED,{presetId:e,preset:r}),this._log(`\u9884\u8BBE\u5DF2\u66F4\u65B0: ${e}`),{success:!0,message:`\u9884\u8BBE "${n.name}" \u66F4\u65B0\u6210\u529F`,preset:r}}deletePreset(e){if(!e)return{success:!1,message:"\u9884\u8BBEID\u4E0D\u80FD\u4E3A\u7A7A"};if(ut[e])return{success:!1,message:"\u4E0D\u5141\u8BB8\u5220\u9664\u9ED8\u8BA4\u9884\u8BBE"};let s=this.getPreset(e);if(!s)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let n=T.get(dt,{});return delete n[e],T.set(dt,n),this._cache=null,this.getDefaultPresetId()===e&&this.setDefaultPresetId(null),P.emit(I.BYPASS_PRESET_DELETED,{presetId:e}),this._log(`\u9884\u8BBE\u5DF2\u5220\u9664: ${e}`),{success:!0,message:`\u9884\u8BBE "${s.name}" \u5DF2\u5220\u9664`}}duplicatePreset(e,s,n){let r=this.getPreset(e);if(!r)return{success:!1,message:`\u6E90\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};if((!s||!s.trim())&&(s=`${e}_copy_${Date.now()}`),this.presetExists(s))return{success:!1,message:`\u9884\u8BBE "${s}" \u5DF2\u5B58\u5728`};let o={...JSON.parse(JSON.stringify(r)),id:s.trim(),name:n||`${r.name} (\u526F\u672C)`,createdAt:Date.now(),updatedAt:Date.now()};return this._savePreset(s.trim(),o),P.emit(I.BYPASS_PRESET_CREATED,{presetId:s,preset:o}),{success:!0,message:`\u9884\u8BBE\u5DF2\u590D\u5236\u4E3A "${o.name}"`,preset:o}}addMessage(e,s){let n=this.getPreset(e);if(!n)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let r={id:`msg_${Date.now()}`,role:s.role||"SYSTEM",content:s.content||"",enabled:s.enabled!==!1,deletable:s.deletable!==!1},o=[...n.messages||[],r];return this.updatePreset(e,{messages:o})}updateMessage(e,s,n){let r=this.getPreset(e);if(!r)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let o=r.messages||[],a=o.findIndex(l=>l.id===s);if(a===-1)return{success:!1,message:`\u6D88\u606F "${s}" \u4E0D\u5B58\u5728`};let i=[...o];return i[a]={...i[a],...n},this.updatePreset(e,{messages:i})}deleteMessage(e,s){let n=this.getPreset(e);if(!n)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};let r=n.messages||[],o=r.find(i=>i.id===s);if(!o)return{success:!1,message:`\u6D88\u606F "${s}" \u4E0D\u5B58\u5728`};if(o.deletable===!1)return{success:!1,message:"\u8BE5\u6D88\u606F\u4E0D\u53EF\u5220\u9664"};let a=r.filter(i=>i.id!==s);return this.updatePreset(e,{messages:a})}getEnabledMessages(e){let s=this.getPreset(e);return!s||!s.enabled?[]:(s.messages||[]).filter(n=>n.enabled!==!1)}getDefaultPresetId(){this._migrateLegacyData();let e=T.get(Zt,null);return e==="undefined"||e==="null"||e===""?(T.remove(Zt),null):e}setDefaultPresetId(e){return e&&!this.presetExists(e)?!1:(T.set(Zt,e),P.emit(I.BYPASS_PRESET_ACTIVATED,{presetId:e}),this._log(`\u9ED8\u8BA4\u9884\u8BBE\u5DF2\u8BBE\u7F6E: ${e}`),!0)}getDefaultPreset(){let e=this.getDefaultPresetId();return e?this.getPreset(e):null}exportPresets(e=null){if(e){let n=this.getPreset(e);if(!n)throw new Error(`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`);return JSON.stringify(n,null,2)}let s=this.getAllPresets();return JSON.stringify({version:"1.0.0",exportedAt:new Date().toISOString(),presets:Object.values(s)},null,2)}importPresets(e,s={}){let{overwrite:n=!1}=s,r;try{r=JSON.parse(e)}catch{return{success:!1,message:"JSON\u89E3\u6790\u5931\u8D25",imported:0}}let o=Array.isArray(r)?r:r.presets?r.presets:[r];if(o.length===0)return{success:!1,message:"\u6CA1\u6709\u627E\u5230\u6709\u6548\u7684\u9884\u8BBE\u6570\u636E",imported:0};let a=T.get(dt,{}),i=0;for(let l of o)!l.id||typeof l.id!="string"||l.name&&(ut[l.id]&&!n||!n&&a[l.id]||(a[l.id]={...l,updatedAt:Date.now()},i++));return i>0&&(T.set(dt,a),this._cache=null),{success:!0,message:`\u6210\u529F\u5BFC\u5165 ${i} \u4E2A\u9884\u8BBE`,imported:i}}getToolBypassPreset(e){if(!e?.bypass?.enabled)return null;let s=e?.bypass?.presetId;return s?this.getPreset(s):this.getDefaultPreset()}buildBypassMessages(e){let s=this.getToolBypassPreset(e);return s?this.getEnabledMessages(s.id):[]}_savePreset(e,s){let n=T.get(dt,{});n[e]=s,T.set(dt,n),this._cache=null}_migrateLegacyData(){if(this._migrated)return;let e=T.get(dt,{}),s={},n=!1,r=Array.isArray(e)?e.map((o,a)=>[o?.id||o?.name||`legacy_${a}`,o]):Object.entries(e||{});for(let[o,a]of r){let i=this._normalizePreset(o,a,s);if(!i){n=!0;continue}s[i.id]=i,(!e?.[i.id]||e?.[i.id]?.id!==i.id)&&(n=!0)}n&&T.set(dt,s),this._migrateDefaultPreset(s),this._cache=null,this._migrated=!0}_normalizePreset(e,s,n={}){if(!s||typeof s!="object")return null;let r=typeof s.name=="string"?s.name.trim():"",o=typeof s.id=="string"?s.id.trim():"",a=typeof e=="string"?e.trim():"";if(!r&&a&&a!=="undefined"&&a!=="null"&&(r=a),this._isLegacySamplePreset(r,o)||(!o&&a&&a!=="undefined"&&a!=="null"&&(o=a),!o&&r&&r!=="undefined"&&r!=="null"&&(o=this._generatePresetId(r,n)),!r||!o||o==="undefined"||r==="undefined"))return null;let l=Array.isArray(s.messages)?s.messages.filter(c=>c&&typeof c=="object").map((c,u)=>({id:typeof c.id=="string"&&c.id.trim()?c.id.trim():`${o}_msg_${u+1}`,role:c.role||"SYSTEM",content:typeof c.content=="string"?c.content:"",enabled:c.enabled!==!1,deletable:c.deletable!==!1})):[];return{...s,id:o,name:r,description:typeof s.description=="string"?s.description:"",enabled:s.enabled!==!1,messages:l,createdAt:s.createdAt||Date.now(),updatedAt:s.updatedAt||Date.now()}}_migrateDefaultPreset(e){let s=T.get(Zt,null),n=T.get(mr,null),r=s??n;(r==="undefined"||r==="null"||r==="")&&(r=null),r&&!e[r]&&(r=Object.values(e).find(a=>a.name===r)?.id||null),r?T.set(Zt,r):T.remove(Zt),T.has(mr)&&T.remove(mr)}_isLegacySamplePreset(e,s=""){return e?s==="standard"||s==="enhanced"||s==="jailbreak"||$i.has(e)?!0:/^增强破限（副本）(?:\s*\(\d+\))?$/.test(e):!1}_generatePresetId(e,s={}){let n=String(e).trim().toLowerCase().replace(/[^\w\u4e00-\u9fa5]+/g,"_").replace(/^_+|_+$/g,"")||`bypass_${Date.now()}`,r=n,o=1;for(;s[r];)r=`${n}_${o++}`;return r}_log(...e){this.debugMode&&console.log("[BypassManager]",...e)}},L=new tn,Oi=()=>L.getAllPresets(),hr=()=>L.getPresetList(),Ni=t=>L.getPreset(t),Li=t=>L.createPreset(t),Ui=(t,e)=>L.updatePreset(t,e),Gi=t=>L.deletePreset(t),Bi=(t,e,s)=>L.duplicatePreset(t,e,s),zi=()=>L.getDefaultPresetId(),ji=t=>L.setDefaultPresetId(t),Fi=t=>L.getEnabledMessages(t),Hi=(t,e)=>L.addMessage(t,e),Ki=(t,e,s)=>L.updateMessage(t,e,s),Yi=(t,e)=>L.deleteMessage(t,e),Wi=t=>L.exportPresets(t),Vi=(t,e)=>L.importPresets(t,e),qi=t=>L.buildBypassMessages(t),Ji=L});var Go={};de(Go,{DEFAULT_SETTINGS:()=>vs,SettingsService:()=>sn,default:()=>Xi,settingsService:()=>ke});var vs,br,sn,ke,Xi,Ss=j(()=>{ht();Se();vs={executor:{maxConcurrent:3,maxRetries:2,retryDelayMs:5e3,requestTimeoutMs:9e4,queueStrategy:"fifo"},listener:{listenGenerationEnded:!0,ignoreQuietGeneration:!0,ignoreAutoTrigger:!1,debounceMs:300,useMessageReceivedFallback:!0,useGenerationAfterCommandsFallback:!0,messageSessionWindowMs:1800,historyRetentionLimit:10},debug:{enableDebugLog:!1,saveExecutionHistory:!0,showRuntimeBadge:!0},ui:{compactMode:!1,animationEnabled:!0,theme:"dark-blue"}},br="settings_v2",sn=class{constructor(){this._cache=null}getSettings(){if(this._cache)return this._cache;let e=T.get(br,{});return this._cache=this._mergeWithDefaults(e),this._cache}saveSettings(e){this._cache=this._mergeWithDefaults(e),T.set(br,this._cache),P.emit(I.SETTINGS_UPDATED,{settings:this._cache})}updateSettings(e){let s=this.getSettings(),n=this._deepMerge(s,e);this.saveSettings(n)}getExecutorSettings(){return this.getSettings().executor}updateExecutorSettings(e){this.updateSettings({executor:e})}getListenerSettings(){return this.getSettings().listener}updateListenerSettings(e){this.updateSettings({listener:e})}getDebugSettings(){return this.getSettings().debug}updateDebugSettings(e){this.updateSettings({debug:e})}getUiSettings(){return this.getSettings().ui}updateUiSettings(e){this.updateSettings({ui:e})}resetSettings(){this._cache=JSON.parse(JSON.stringify(vs)),T.set(br,this._cache),P.emit(I.SETTINGS_UPDATED,{settings:this._cache,reset:!0})}get(e,s=null){let n=this.getSettings(),r=e.split("."),o=n;for(let a of r)if(o&&typeof o=="object"&&a in o)o=o[a];else return s;return o}set(e,s){let n=JSON.parse(JSON.stringify(this.getSettings())),r=e.split("."),o=n;for(let a=0;a<r.length-1;a++){let i=r[a];i in o||(o[i]={}),o=o[i]}o[r[r.length-1]]=s,this.saveSettings(n)}_mergeWithDefaults(e){return this._deepMerge(JSON.parse(JSON.stringify(vs)),e)}_deepMerge(e,s){let n={...e};for(let r in s)s[r]&&typeof s[r]=="object"&&!Array.isArray(s[r])?n[r]=this._deepMerge(e[r]||{},s[r]):n[r]=s[r];return n}},ke=new sn,Xi=ke});var Fo={};de(Fo,{abortAllTasks:()=>sl,abortTask:()=>tl,buildToolMessages:()=>jo,clearExecutionHistory:()=>il,createExecutionContext:()=>ul,createResult:()=>nn,enhanceMessagesWithBypass:()=>pl,executeBatch:()=>el,executeTool:()=>zo,executeToolWithConfig:()=>rn,executeToolsBatch:()=>fl,executorState:()=>se,extractFailed:()=>dl,extractSuccessful:()=>cl,generateTaskId:()=>Nt,getExecutionHistory:()=>al,getExecutorStatus:()=>ol,getScheduler:()=>es,getToolsForEvent:()=>vr,mergeResults:()=>ll,pauseExecutor:()=>nl,resumeExecutor:()=>rl,setMaxConcurrent:()=>Zi});function nn(t,e,s,n,r,o,a=0){return{success:s,taskId:t,toolId:e,data:n,error:r,duration:o,retries:a,timestamp:Date.now(),metadata:{}}}function Nt(){return`task_${Date.now()}_${Math.random().toString(36).substr(2,9)}`}function Qi(t,e={}){return{id:Nt(),toolId:t,options:e,status:"pending",createdAt:Date.now(),startedAt:null,completedAt:null,retries:0,maxRetries:e.maxRetries||3}}function es(){return Es||(Es=new xr(se.maxConcurrent)),Es}function Zi(t){se.maxConcurrent=Math.max(1,Math.min(10,t)),Es&&(Es.maxConcurrent=se.maxConcurrent)}async function zo(t,e={},s){let n=es(),r=Qi(t,e);for(;se.isPaused;)await new Promise(o=>setTimeout(o,100));try{let o=await n.enqueue(async a=>{if(a.aborted)throw new DOMException("\u4EFB\u52A1\u5DF2\u4E2D\u6B62","AbortError");if(typeof s=="function")return await s(a,e);throw new Error("\u6267\u884C\u5668\u5FC5\u987B\u662F\u4E00\u4E2A\u51FD\u6570")},r);return Bo(o),o}catch(o){let a=nn(r.id,t,!1,null,o,Date.now()-r.createdAt,r.retries);return Bo(a),a}}async function el(t,e={}){let{failFast:s=!1,concurrency:n=se.maxConcurrent}=e,r=[],o=es(),a=o.maxConcurrent;o.maxConcurrent=n;try{let i=t.map(({toolId:l,options:c,executor:u})=>zo(l,c,u));if(s)for(let l of i){let c=await l;if(r.push(c),!c.success){o.abortAll();break}}else{let l=await Promise.allSettled(i);for(let c of l)c.status==="fulfilled"?r.push(c.value):r.push(nn(Nt(),"unknown",!1,null,c.reason,0,0))}}finally{o.maxConcurrent=a}return r}function tl(t){return es().abort(t)}function sl(){es().abortAll(),se.executionQueue=[]}function nl(){se.isPaused=!0}function rl(){se.isPaused=!1}function ol(){return{...es().getStatus(),isPaused:se.isPaused,activeControllers:se.activeControllers.size,historyCount:se.executionHistory.length}}function Bo(t){se.executionHistory.push(t),se.executionHistory.length>100&&se.executionHistory.shift()}function al(t={}){let e=[...se.executionHistory];return t.toolId&&(e=e.filter(s=>s.toolId===t.toolId)),t.success!==void 0&&(e=e.filter(s=>s.success===t.success)),t.limit&&(e=e.slice(-t.limit)),e}function il(){se.executionHistory=[]}function ll(t){let e={success:!0,data:[],errors:[],totalDuration:0,successCount:0,failureCount:0};for(let s of t)e.totalDuration+=s.duration,s.success?(e.successCount++,s.data!==void 0&&s.data!==null&&e.data.push(s.data)):(e.success=!1,e.failureCount++,s.error&&e.errors.push({taskId:s.taskId,toolId:s.toolId,error:s.error.message||String(s.error)}));return e}function cl(t){return t.filter(e=>e.success).map(e=>e.data)}function dl(t){return t.filter(e=>!e.success).map(e=>({taskId:e.taskId,toolId:e.toolId,error:e.error}))}function ul(t={}){return{taskId:Nt(),startTime:Date.now(),signal:t.signal||null,apiConfig:t.apiConfig||null,bypassMessages:t.bypassMessages||[],context:t.context||{},metadata:t.metadata||{}}}function pl(t,e){return!e||e.length===0?t:[...e,...t]}function yl(t){return t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function jo(t,e){let s=[],n=t.promptTemplate||"",r={"{{userMessage}}":e.input?.userMessage||"","{{lastAiMessage}}":e.input?.lastAiMessage||"","{{extractedContent}}":e.input?.extractedContent||"","{{previousToolOutput}}":e.input?.previousToolOutput||"","{{context}}":JSON.stringify(e.input?.context||{}),"{{pg}}":e.input?.context?.pg||"1","{{time}}":e.input?.context?.time||"","{{scene}}":e.input?.context?.scene||"","{{plot}}":e.input?.context?.plot||"","{{mq}}":e.input?.context?.mq||"\u2160","{{mqStatus}}":e.input?.context?.mqStatus||"\u8FDB\u884C\u4E2D","{{sq}}":e.input?.context?.sq||"1","{{sqStatus}}":e.input?.context?.sqStatus||"\u8FDB\u884C\u4E2D","{{latestSq}}":e.input?.context?.latestSq||"1","{{completed}}":e.input?.context?.completed||"\u65E0","{{defined}}":e.input?.context?.defined||"","{{status}}":e.input?.context?.status||"","{{seeds}}":e.input?.context?.seeds||"","{{name}}":e.input?.context?.name||"","{{location}}":e.input?.context?.location||"","{{condition}}":e.input?.context?.condition||"","{{equipment}}":e.input?.context?.equipment||"","{{skills}}":e.input?.context?.skills||""};for(let[o,a]of Object.entries(r))n=n.replace(new RegExp(yl(o),"g"),a);return s.push({role:"USER",content:n}),s}async function rn(t,e,s={}){let n=ne(t);if(!n)return{success:!1,taskId:Nt(),toolId:t,error:"\u5DE5\u5177\u914D\u7F6E\u4E0D\u5B58\u5728",duration:0};if(!n.enabled)return{success:!1,taskId:Nt(),toolId:t,error:"\u5DE5\u5177\u672A\u542F\u7528",duration:0};let r=Date.now(),o=Nt();try{P.emit(I.TOOL_EXECUTION_STARTED,{toolId:t,taskId:o,context:e});let a=jo(n,e);if(typeof s.callApi=="function"){let i=n.output?.apiPreset||n.apiPreset||"",l=i?{preset:i}:null,c=await s.callApi(a,l,s.signal),u=c;n.outputMode==="separate"&&n.extractTags?.length>0&&(u=gl(c,n.extractTags));let d={success:!0,taskId:o,toolId:t,data:u,duration:Date.now()-r};return P.emit(I.TOOL_EXECUTED,{toolId:t,taskId:o,result:d}),d}else return{success:!0,taskId:o,toolId:t,data:{messages:a,config:{apiPreset:n.output?.apiPreset||n.apiPreset||"",outputMode:n.outputMode,extractTags:n.extractTags}},duration:Date.now()-r,needsExecution:!0}}catch(a){let i={success:!1,taskId:o,toolId:t,error:a.message||String(a),duration:Date.now()-r};return P.emit(I.TOOL_EXECUTION_FAILED,{toolId:t,taskId:o,error:a}),i}}function gl(t,e){let s={};for(let n of e){let r=new RegExp(`<${n}[^>]*>([\\s\\S]*?)<\\/${n}>`,"gi"),o=t.match(r);o&&(s[n]=o.map(a=>{let i=a.match(new RegExp(`<${n}[^>]*>([\\s\\S]*?)<\\/${n}>`,"i"));return i?i[1].trim():""}))}return s}async function fl(t,e,s={}){let n=[];for(let r of t){let o=ne(r);if(o&&o.enabled){let a=await rn(r,e,s);n.push(a)}}return n}function vr(t){let e=[],s=en();for(let n of s){let r=n?.trigger?.enabled&&n?.trigger?.event===t,o=Array.isArray(n?.triggerEvents)&&n.triggerEvents.includes(t);n&&n.enabled&&(r||o)&&e.push(n)}return e}var se,xr,Es,Sr=j(()=>{Qt();Se();se={activeControllers:new Map,executionQueue:[],runningCount:0,maxConcurrent:3,executionHistory:[],isPaused:!1};xr=class{constructor(e=3){this.maxConcurrent=e,this.queue=[],this.running=new Map,this.isProcessing=!1}enqueue(e,s){return new Promise((n,r)=>{this.queue.push({executor:e,task:s,resolve:n,reject:r}),this.process()})}async process(){if(!this.isProcessing){for(this.isProcessing=!0;this.queue.length>0&&this.running.size<this.maxConcurrent;){let e=this.queue.shift();if(!e)continue;let{executor:s,task:n,resolve:r,reject:o}=e,a=new AbortController;n.abortController=a,n.status="running",n.startedAt=Date.now(),this.running.set(n.id,n),se.activeControllers.set(n.id,a),this.executeTask(s,n,a.signal).then(i=>{n.status="completed",n.completedAt=Date.now(),r(i)}).catch(i=>{n.status=i.name==="AbortError"?"aborted":"failed",n.completedAt=Date.now(),o(i)}).finally(()=>{this.running.delete(n.id),se.activeControllers.delete(n.id),se.runningCount=this.running.size})}this.isProcessing=!1}}async executeTask(e,s,n){let r=Date.now(),o=null;for(let a=0;a<=s.maxRetries;a++){if(n.aborted)throw new DOMException("\u4EFB\u52A1\u5DF2\u4E2D\u6B62","AbortError");try{let i=await e(n);return nn(s.id,s.toolId,!0,i,null,Date.now()-r,a)}catch(i){if(o=i,i.name==="AbortError")throw i;a<s.maxRetries&&(await this.delay(1e3*(a+1)),s.retries=a+1)}}throw o}delay(e){return new Promise(s=>setTimeout(s,e))}abort(e){let s=se.activeControllers.get(e);return s?(s.abort(),!0):!1}abortAll(){for(let e of se.activeControllers.values())e.abort();se.activeControllers.clear(),this.queue=[],this.running.clear()}getStatus(){return{pending:this.queue.length,running:this.running.size,maxConcurrent:this.maxConcurrent}}},Es=null});var Ko={};de(Ko,{ContextInjector:()=>ln,DEFAULT_INJECTION_OPTIONS:()=>Ho,WRITEBACK_METHODS:()=>Ts,WRITEBACK_RESULT_STATUS:()=>an,contextInjector:()=>cn,default:()=>ml});var Be,on,Ho,an,Ts,ln,cn,ml,Er=j(()=>{Se();Be="YouYouToolkit_toolOutputs",on="YouYouToolkit_injectedContext",Ho={overwrite:!0,enabled:!0},an={SUCCESS:"success",FAILED:"failed"},Ts={NONE:"none",LOCAL_ONLY:"local_only",SET_CHAT_MESSAGES:"setChatMessages",SET_CHAT_MESSAGE:"setChatMessage"},ln=class{constructor(){this.debugMode=!1}async inject(e,s,n={}){return(await this.injectDetailed(e,s,n)).success}async injectDetailed(e,s,n={}){let r={...Ho,...n},o=this._createWritebackResult(e,r);if(!e||s===void 0||s===null)return this._log("\u6CE8\u5165\u5931\u8D25: \u53C2\u6570\u65E0\u6548"),o.error="\u6CE8\u5165\u5931\u8D25: \u53C2\u6570\u65E0\u6548",o;let a=o.chatId,i={toolId:e,content:String(s),updatedAt:Date.now(),sourceMessageId:n.sourceMessageId||null,options:r};P.emit(I.TOOL_CONTEXT_INJECTED,{toolId:e,chatId:a,content:i.content,options:r});let l=await this._insertToolOutputToLatestAssistantMessage(e,i,r,o);return l.success&&this._log(`\u6CE8\u5165\u6210\u529F: ${e} -> ${a}`,l),l}getAggregatedContext(e){return this.getLatestMessageInjectedContext()}getLatestMessageInjectedContext(e=null){try{let{chat:s}=this._getChatRuntime(),n=this._findAssistantMessageIndex(s,e);if(n<0)return"";let r=s[n]||{},o=r[on];if(typeof o=="string"&&o.trim())return o.trim();let a=r[Be];return a&&typeof a=="object"?this._buildMessageInjectedContext(a).trim():""}catch(s){return this._log("\u8BFB\u53D6\u6700\u65B0 AI \u6D88\u606F injectedContext \u5931\u8D25",s),""}}_getLatestAssistantMessageOutputs(){try{let{chat:e}=this._getChatRuntime(),s=this._findAssistantMessageIndex(e,null);if(s<0)return{};let r=(e[s]||{})[Be];return r&&typeof r=="object"?r:{}}catch(e){return this._log("\u8BFB\u53D6\u6700\u65B0 AI \u6D88\u606F\u4E0A\u4E0B\u6587\u5931\u8D25",e),{}}}getToolContext(e,s){if(!s)return null;try{let{chat:n}=this._getChatRuntime(),r=this._findAssistantMessageIndex(n,null);return r<0?null:n[r]?.[Be]?.[s]||null}catch{return null}}getAllToolContexts(e){return this._getLatestAssistantMessageOutputs()}async clearToolContext(e,s){if(!s)return!1;try{let{api:n,context:r,chat:o}=this._getChatRuntime(),a=this._findAssistantMessageIndex(o,null);if(a<0)return!1;let i=o[a],l=i?.[Be];if(!l||!l[s])return!1;delete l[s],i[Be]=l,i[on]=this._buildMessageInjectedContext(l);let c=r?.saveChat||n?.saveChat||null;return typeof c=="function"&&await c.call(r||n),P.emit(I.TOOL_CONTEXT_CLEARED,{chatId:e||this._getCurrentChatId(),toolId:s}),!0}catch(n){return this._log("\u6E05\u9664\u5DE5\u5177\u4E0A\u4E0B\u6587\u5931\u8D25",n),!1}}async clearAllContext(e){try{let{api:s,context:n,chat:r}=this._getChatRuntime(),o=this._findAssistantMessageIndex(r,null);if(o<0)return!1;let a=r[o];delete a[Be],delete a[on];let i=n?.saveChat||s?.saveChat||null;return typeof i=="function"&&await i.call(n||s),P.emit(I.TOOL_CONTEXT_CLEARED,{chatId:e||this._getCurrentChatId(),allTools:!0}),!0}catch(s){return this._log("\u6E05\u9664\u6240\u6709\u5DE5\u5177\u4E0A\u4E0B\u6587\u5931\u8D25",s),!1}}clearAllChatsContexts(){this._log("\u6E05\u9664\u6240\u6709\u4E0A\u4E0B\u6587")}hasToolContext(e,s){return!!this.getToolContext(e,s)}getContextSummary(e){let s=this._getLatestAssistantMessageOutputs(),n=Object.entries(s).map(([r,o])=>({toolId:r,updatedAt:o.updatedAt,contentLength:o.content?.length||0}));return{chatId:e||this._getCurrentChatId(),tools:n,totalCount:n.length}}exportContext(e){return{chatId:e||this._getCurrentChatId(),contexts:this._getLatestAssistantMessageOutputs(),exportedAt:Date.now()}}importContext(e,s={}){return!1}_getChatRuntime(){try{let e=typeof window.parent<"u"&&window.parent!==window?window.parent:window,s=e.SillyTavern||null,n=s?.getContext?.()||null,r=Array.isArray(n?.chat)?n.chat:[],o=Array.isArray(s?.chat)?s.chat:[],a=r.length?r:o;return{topWindow:e,api:s,context:n,chat:a,contextChat:r,apiChat:o}}catch{return{topWindow:null,api:null,context:null,chat:[],contextChat:[],apiChat:[]}}}_createWritebackResult(e,s={}){return{success:!1,toolId:e,chatId:this._getCurrentChatId(),traceId:s.traceId||"",sessionKey:s.sessionKey||"",sourceMessageId:s.sourceMessageId||null,messageIndex:-1,textField:"",blockIdentity:null,hostUpdateMethod:Ts.NONE,writebackStatus:an.FAILED,replacedExistingBlock:!1,insertedNewBlock:!1,conflictDetected:!1,conflictReason:"",preservedOtherToolBlocks:!0,error:"",errors:[],steps:{foundTargetMessage:!1,localTextApplied:!1,runtimeSynced:!1,hostSetChatMessages:!1,hostSetChatMessage:!1,saveChatDebounced:!1,saveChat:!1,notifiedMessageUpdated:!1,verifiedAfterWrite:!1},verification:{textIncludesContent:!1,mirrorStored:!1}}}_inferBlockType(e){let s=String(e||"").trim();if(!s)return"empty";let n=s.match(/^<([a-zA-Z0-9_-]+)(?:\s[^>]*)?>[\s\S]*<\/\1>$/);return n?.[1]?n[1]:"plain_text"}_stripExactStoredBlock(e,s){let n=String(e||""),r=String(s||"").trim();return r?n.includes(r)?{text:n.replace(r,"").trimEnd(),removed:!0}:{text:n,removed:!1}:{text:n,removed:!1}}_syncMessageToRuntimeChats(e,s,n){let{contextChat:r,apiChat:o}=e||{},a=i=>{!Array.isArray(i)||s<0||s>=i.length||i[s]!==n&&(i[s]={...i[s]||{},...n})};a(r),a(o)}_notifyMessageUpdated(e,s){try{let{api:n,topWindow:r}=e||{},o=n?.eventSource||null,i=(n?.eventTypes||{}).MESSAGE_UPDATED||"MESSAGE_UPDATED";o&&typeof o.emit=="function"&&(o.emit(i,s),typeof r?.requestAnimationFrame=="function"?r.requestAnimationFrame(()=>{o.emit(i,s)}):typeof r?.setTimeout=="function"&&r.setTimeout(()=>{o.emit(i,s)},30))}catch(n){this._log("\u89E6\u53D1\u6D88\u606F\u5237\u65B0\u4E8B\u4EF6\u5931\u8D25",n)}}_isAssistantMessage(e){if(!e||e.is_user||e.is_system)return!1;let s=String(e.role||"").toLowerCase();return s==="assistant"||s==="ai"||!s}_findAssistantMessageIndex(e,s){let n=Array.isArray(e)?e:[];if(!n.length)return-1;let r=(o,a)=>{if(!this._isAssistantMessage(o)||s==null||s==="")return!1;let i=String(s).trim();return i?[o.message_id,o.id,o.messageId,o.mes_id,o.swipe_id,a].map(c=>c==null?"":String(c).trim()).includes(i):!1};for(let o=n.length-1;o>=0;o-=1)if(r(n[o],o))return o;for(let o=n.length-1;o>=0;o-=1)if(this._isAssistantMessage(n[o]))return o;return-1}_buildMessageInjectedContext(e){let n=Object.entries(e&&typeof e=="object"?e:{}).sort(([,o],[,a])=>(o?.updatedAt||0)-(a?.updatedAt||0));if(!n.length)return"";let r=["[\u5DE5\u5177\u4E0A\u4E0B\u6587\u6CE8\u5165]",""];for(let[o,a]of n)r.push(`[${o}]`),r.push(a?.content||""),r.push("");return r.join(`
`)}_getWritableMessageField(e){let s=["mes","message","content","text"];for(let n of s)if(typeof e?.[n]=="string")return{key:n,text:e[n]};return{key:"mes",text:""}}_applyMessageText(e,s){let n=e&&typeof e=="object"?e:{},r=["mes","message","content","text"],o=!1;return r.forEach(a=>{typeof n[a]=="string"&&(n[a]=s,o=!0)}),o||(n.mes=s,n.message=s),n}_stripExistingToolOutput(e,s=[]){let n=String(e||"");return(Array.isArray(s)?s:[]).forEach(o=>{let a=String(o||"").trim();if(!a)return;if(a.startsWith("regex:")){try{let u=new RegExp(a.slice(6).trim(),"gis");n=n.replace(u,"")}catch(u){this._log("\u79FB\u9664\u65E7\u5DE5\u5177\u8F93\u51FA\u65F6\u6B63\u5219\u65E0\u6548",a,u)}return}let i=a.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),l=new RegExp(`<${i}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${i}>\\s*`,"gi"),c=new RegExp(`\\{${i}\\|[\\s\\S]*?\\}\\s*`,"gi");n=n.replace(l,""),n=n.replace(c,"")}),n.trimEnd()}_stripPreviousStoredToolContent(e,s){let n=String(e||""),r=String(s||"").trim();return r?n.replace(r,"").trimEnd():n.trimEnd()}async _insertToolOutputToLatestAssistantMessage(e,s,n={},r=null){let o=r||this._createWritebackResult(e,n);try{let a=this._getChatRuntime(),{api:i,context:l,chat:c}=a;if(!Array.isArray(c)||!c.length)return this._log("\u672A\u627E\u5230\u804A\u5929\u6D88\u606F\uFF0C\u65E0\u6CD5\u63D2\u5165\u5DE5\u5177\u8F93\u51FA"),o.error="\u672A\u627E\u5230\u804A\u5929\u6D88\u606F\uFF0C\u65E0\u6CD5\u63D2\u5165\u5DE5\u5177\u8F93\u51FA",o;let u=this._findAssistantMessageIndex(c,n.sourceMessageId);if(u<0)return this._log("\u672A\u627E\u5230\u53EF\u5199\u5165\u7684\u6700\u65B0 AI \u56DE\u590D\u6D88\u606F"),o.error="\u672A\u627E\u5230\u53EF\u5199\u5165\u7684\u6700\u65B0 AI \u56DE\u590D\u6D88\u606F",o;o.messageIndex=u,o.steps.foundTargetMessage=!0;let d=c[u],{key:h,text:g}=this._getWritableMessageField(d);o.textField=h;let b=d[Be]&&typeof d[Be]=="object"?d[Be]:{},G=b?.[e]||{},F=G?.content||"",re=G?.blockText||F||"",be=Object.entries(b).filter(([f])=>f!==e).map(([,f])=>f||{}),pe=String(s.content||"").trim(),M=this._inferBlockType(pe),N={toolId:e,messageId:n.sourceMessageId||d?.message_id||d?.messageId||u,blockType:M,insertedAt:s.updatedAt,replaceable:n.overwrite!==!1};o.blockIdentity=N;let $=n.overwrite===!1?{text:String(g||""),removed:!1}:this._stripExactStoredBlock(g,re),K=$.text,Te="";n.overwrite!==!1&&re&&!$.removed&&(Te="previous_block_not_found");let me=n.overwrite===!1?K:this._stripExistingToolOutput(K,n.extractionSelectors),R=me!==K;K=me;let ie=n.overwrite===!1?K:this._stripPreviousStoredToolContent(K,F),Pe=ie!==K;K=ie,o.replacedExistingBlock=$.removed||R||Pe;let ve=[(n.overwrite===!1?String(g||""):K).trimEnd(),pe].filter(Boolean).join(`

`).trim();o.insertedNewBlock=!!pe;let Ke=be.every(f=>{let x=String(f?.blockText||f?.content||"").trim();return x?ve.includes(x):!0});o.preservedOtherToolBlocks=Ke,Ke?Te&&(o.conflictDetected=!0,o.conflictReason=Te):(o.conflictDetected=!0,o.conflictReason="other_tool_block_removed");let gt={...b,[e]:{toolId:e,content:pe,blockText:pe,blockType:M,blockIdentity:N,updatedAt:s.updatedAt,sourceMessageId:s.sourceMessageId||null}};d[h]=ve,this._applyMessageText(d,ve),d[Be]=gt,d[on]=this._buildMessageInjectedContext(gt),o.steps.localTextApplied=!0,this._syncMessageToRuntimeChats(a,u,d),o.steps.runtimeSynced=!0;let st=l?.setChatMessages||i?.setChatMessages||a?.topWindow?.setChatMessages||null,Oe=l?.setChatMessage||i?.setChatMessage||a?.topWindow?.setChatMessage||null,nt=!1;if(typeof st=="function")try{await st.call(l||i||a?.topWindow,[{message_id:u,message:ve,mes:ve,content:ve,text:ve}],{refresh:"affected"}),o.steps.hostSetChatMessages=!0,o.hostUpdateMethod=Ts.SET_CHAT_MESSAGES,nt=!0}catch(f){this._log("setChatMessages \u5199\u56DE\u5931\u8D25\uFF0C\u56DE\u9000\u672C\u5730\u540C\u6B65",f),o.errors.push(`setChatMessages: ${f?.message||String(f)}`)}if(!nt&&typeof Oe=="function")try{await Oe.call(l||i||a?.topWindow,{message:ve,mes:ve,content:ve,text:ve},u),o.steps.hostSetChatMessage=!0,o.hostUpdateMethod=Ts.SET_CHAT_MESSAGE,nt=!0}catch(f){this._log("setChatMessage \u5199\u56DE\u5931\u8D25\uFF0C\u56DE\u9000\u672C\u5730\u540C\u6B65",f),o.errors.push(`setChatMessage: ${f?.message||String(f)}`)}if(nt||(o.hostUpdateMethod=Ts.LOCAL_ONLY),typeof Oe=="function")try{await Oe.call(l||i||a?.topWindow,{},u)}catch(f){this._log("\u4F7F\u7528\u7A7A setChatMessage \u5F3A\u5236\u5237\u65B0\u5931\u8D25",f),o.errors.push(`setChatMessage(refresh): ${f?.message||String(f)}`)}let le=l?.saveChat||i?.saveChat||null,ce=l?.saveChatDebounced||i?.saveChatDebounced||null;typeof ce=="function"&&(ce.call(l||i),o.steps.saveChatDebounced=!0),typeof le=="function"&&(await le.call(l||i),o.steps.saveChat=!0),this._notifyMessageUpdated(a,u),o.steps.notifiedMessageUpdated=!0;let rt=a?.contextChat?.[u]||a?.apiChat?.[u]||c[u]||d,zt=this._getWritableMessageField(rt).text||"",Ye=String(s.content||"").trim(),p=rt?.[Be]?.[e];return o.verification.textIncludesContent=Ye?zt.includes(Ye):!0,o.verification.mirrorStored=!!(p&&String(p.content||"").trim()===Ye),o.steps.verifiedAfterWrite=o.verification.textIncludesContent&&o.verification.mirrorStored,o.success=o.steps.localTextApplied&&o.steps.runtimeSynced&&o.steps.verifiedAfterWrite,o.writebackStatus=o.success?an.SUCCESS:an.FAILED,!o.success&&!o.error&&(o.error="\u5DE5\u5177\u7ED3\u679C\u5DF2\u5C1D\u8BD5\u5199\u56DE\uFF0C\u4F46\u6700\u7EC8\u6821\u9A8C\u672A\u901A\u8FC7"),o.conflictDetected&&!o.error&&(o.error=`\u5DE5\u5177\u7ED3\u679C\u5DF2\u5199\u56DE\uFF0C\u4F46\u68C0\u6D4B\u5230\u5757\u51B2\u7A81\uFF1A${o.conflictReason}`),this._log(`\u5DF2\u5C06\u5DE5\u5177\u8F93\u51FA\u63D2\u5165\u6700\u65B0 AI \u56DE\u590D\u539F\u6587: ${e} -> #${u}`),o}catch(a){return this._log("\u63D2\u5165\u6700\u65B0 AI \u56DE\u590D\u539F\u6587\u5931\u8D25",a),o.error=a?.message||String(a),o.errors.push(o.error),o}}_getCurrentChatId(){try{let e=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(e.SillyTavern?.getContext){let s=e.SillyTavern.getContext(),r=[s?.chatId,s?.chat_id,s?.chat_filename,s?.chatMetadata?.chatId,s?.chatMetadata?.chat_id,s?.chatMetadata?.file_name,s?.chatMetadata?.name,e.SillyTavern?.chatId,e.SillyTavern?.chat_id,e.SillyTavern?.chat_filename].find(a=>typeof a=="string"&&a.trim());if(r)return r;let o=e.SillyTavern?.this_chid;if(o!=null)return`chat_char_${o}`}return"chat_default"}catch{return"chat_default"}}_log(...e){this.debugMode&&console.log("[ContextInjector]",...e)}},cn=new ln,ml=cn});var Wo={};de(Wo,{BUILTIN_VARIABLES:()=>Yo,VariableResolver:()=>dn,default:()=>hl,variableResolver:()=>St});var Yo,dn,St,hl,Tr=j(()=>{Se();Yo={lastUserMessage:{name:"lastUserMessage",description:"\u6700\u65B0\u7528\u6237\u6D88\u606F",category:"chat"},lastAiMessage:{name:"lastAiMessage",description:"\u6700\u65B0AI\u56DE\u590D",category:"chat"},chatHistory:{name:"chatHistory",description:"\u6700\u8FD1\u804A\u5929\u8BB0\u5F55",category:"chat"},characterCard:{name:"characterCard",description:"\u5F53\u524D\u89D2\u8272\u5361\u5185\u5BB9",category:"character"},toolName:{name:"toolName",description:"\u5DE5\u5177\u540D\u79F0",category:"tool"},toolId:{name:"toolId",description:"\u5DE5\u5177ID",category:"tool"},toolPromptMacro:{name:"toolPromptMacro",description:"\u5F53\u524D\u5DE5\u5177\u6A21\u677F\u63D0\u793A\u8BCD\u5B8F",category:"tool"},toolContentMacro:{name:"toolContentMacro",description:"\u5F53\u524D\u5DE5\u5177\u5904\u7406\u540E\u7684\u5185\u5BB9\u5B8F",category:"tool"},injectedContext:{name:"injectedContext",description:"\u5DF2\u6CE8\u5165\u7684\u5DE5\u5177\u4E0A\u4E0B\u6587",category:"context"},extractedContent:{name:"extractedContent",description:"\u5DE5\u5177\u63D0\u53D6\u5185\u5BB9",category:"context"},recentMessagesText:{name:"recentMessagesText",description:"\u6700\u8FD1\u6D88\u606F\u6B63\u6587",category:"context"},rawRecentMessagesText:{name:"rawRecentMessagesText",description:"\u6700\u8FD1\u6D88\u606F\u539F\u6587",category:"context"},userMessage:{name:"userMessage",description:"\u5F53\u524D\u7528\u6237\u6D88\u606F",category:"chat"},previousToolOutput:{name:"previousToolOutput",description:"\u4E0A\u4E00\u6B21\u5DE5\u5177\u8F93\u51FA",category:"context"}},dn=class{constructor(){this.customVariables=new Map,this.variableHandlers=new Map,this.debugMode=!1,this._registerDefaultHandlers()}resolveTemplate(e,s){if(typeof e!="string")return e;let n=e;return n=this._resolveBuiltinVariables(n,s),n=this._resolveCustomVariables(n,s),n=this._resolveRegexVariables(n,s),n}resolveObject(e,s){if(!e||typeof e!="object")return e;if(Array.isArray(e))return e.map(r=>this.resolveObject(r,s));let n={};for(let[r,o]of Object.entries(e))typeof o=="string"?n[r]=this.resolveTemplate(o,s):typeof o=="object"&&o!==null?n[r]=this.resolveObject(o,s):n[r]=o;return n}buildToolContext(e){return{lastUserMessage:e.lastUserMessage||"",lastAiMessage:e.lastAiMessage||"",chatHistory:e.chatHistory||[],characterCard:e.characterCard||null,characterName:e.characterCard?.name||"",toolName:e.toolName||"",toolId:e.toolId||"",toolPromptMacro:e.toolPromptMacro||"",toolContentMacro:e.toolContentMacro||"",injectedContext:e.injectedContext||"",extractedContent:e.extractedContent||"",recentMessagesText:e.recentMessagesText||"",rawRecentMessagesText:e.rawRecentMessagesText||"",userMessage:e.userMessage||"",previousToolOutput:e.previousToolOutput||"",regexResults:e.regexResults||{},raw:e,timestamp:Date.now()}}registerVariable(e,s){e&&(this.customVariables.set(e,s),this._log(`\u6CE8\u518C\u81EA\u5B9A\u4E49\u53D8\u91CF: ${e}`))}unregisterVariable(e){this.customVariables.delete(e),this._log(`\u6CE8\u9500\u81EA\u5B9A\u4E49\u53D8\u91CF: ${e}`)}registerHandler(e,s){!e||typeof s!="function"||(this.variableHandlers.set(e,s),this._log(`\u6CE8\u518C\u53D8\u91CF\u5904\u7406\u5668: ${e}`))}getAvailableVariables(){let e=[];for(let[,s]of Object.entries(Yo))e.push({name:`{{${s.name}}}`,description:s.description,category:s.category,type:"builtin"});for(let[s,n]of this.customVariables)e.push({name:`{{${s}}}`,description:typeof n=="function"?"\u81EA\u5B9A\u4E49\u51FD\u6570\u53D8\u91CF":"\u81EA\u5B9A\u4E49\u9759\u6001\u53D8\u91CF",category:"custom",type:"custom"});return e}getVariableHelp(){let e=["\u53EF\u7528\u53D8\u91CF\uFF1A",""],s={chat:"\u804A\u5929\u76F8\u5173",character:"\u89D2\u8272\u76F8\u5173",tool:"\u5DE5\u5177\u76F8\u5173",context:"\u4E0A\u4E0B\u6587\u76F8\u5173",custom:"\u81EA\u5B9A\u4E49\u53D8\u91CF"},n={};for(let r of this.getAvailableVariables())n[r.category]||(n[r.category]=[]),n[r.category].push(r);for(let[r,o]of Object.entries(s))if(n[r]&&n[r].length>0){e.push(`\u3010${o}\u3011`);for(let a of n[r])e.push(`  ${a.name} - ${a.description}`);e.push("")}return e.push("\u3010\u6B63\u5219\u63D0\u53D6\u3011"),e.push("  {{regex.xxx}} - \u4F7F\u7528\u6B63\u5219\u63D0\u53D6\u7ED3\u679C\uFF0Cxxx\u4E3A\u6355\u83B7\u7EC4\u540D"),e.join(`
`)}_registerDefaultHandlers(){this.registerHandler("regex",(e,s)=>(s.regexResults||s.raw?.regexResults||{})[e]||"")}_resolveBuiltinVariables(e,s){let n=e;return n=n.replace(/\{\{lastUserMessage\}\}/gi,s.lastUserMessage||s.raw?.lastUserMessage||""),n=n.replace(/\{\{lastAiMessage\}\}/gi,s.lastAiMessage||s.raw?.lastAiMessage||""),n=n.replace(/\{\{chatHistory\}\}/gi,()=>{let r=s.chatHistory||s.raw?.chatHistory||[];return this._formatChatHistory(r)}),n=n.replace(/\{\{characterCard\}\}/gi,()=>{let r=s.characterCard||s.raw?.characterCard;return r?this._formatCharacterCard(r):""}),n=n.replace(/\{\{toolName\}\}/gi,s.toolName||s.raw?.toolName||""),n=n.replace(/\{\{toolId\}\}/gi,s.toolId||s.raw?.toolId||""),n=n.replace(/\{\{toolPromptMacro\}\}/gi,s.toolPromptMacro||s.raw?.toolPromptMacro||""),n=n.replace(/\{\{toolContentMacro\}\}/gi,s.toolContentMacro||s.raw?.toolContentMacro||""),n=n.replace(/\{\{injectedContext\}\}/gi,s.injectedContext||s.raw?.injectedContext||""),n=n.replace(/\{\{extractedContent\}\}/gi,s.extractedContent||s.raw?.extractedContent||""),n=n.replace(/\{\{recentMessagesText\}\}/gi,s.recentMessagesText||s.raw?.recentMessagesText||""),n=n.replace(/\{\{rawRecentMessagesText\}\}/gi,s.rawRecentMessagesText||s.raw?.rawRecentMessagesText||""),n=n.replace(/\{\{userMessage\}\}/gi,s.userMessage||s.raw?.userMessage||""),n=n.replace(/\{\{previousToolOutput\}\}/gi,s.previousToolOutput||s.raw?.previousToolOutput||""),n}_resolveCustomVariables(e,s){let n=e;for(let[r,o]of this.customVariables){let a=new RegExp(`\\{\\{${this._escapeRegex(r)}\\}\\}`,"gi");typeof o=="function"?n=n.replace(a,()=>{try{return o(s)}catch(i){return this._log(`\u53D8\u91CF\u5904\u7406\u9519\u8BEF ${r}:`,i),""}}):n=n.replace(a,String(o))}return n}_resolveRegexVariables(e,s){let n=e;for(let[r,o]of this.variableHandlers){let a=new RegExp(`\\{\\{${r}\\.([^}]+)\\}\\}`,"gi");n=n.replace(a,(i,l)=>{try{return o(l,s)}catch(c){return this._log(`\u53D8\u91CF\u5904\u7406\u9519\u8BEF ${r}.${l}:`,c),""}})}return n}_formatChatHistory(e){return!Array.isArray(e)||e.length===0?"":e.map(s=>{let n=s.role||"unknown",r=s.content||s.mes||"";return`[${n}]: ${r}`}).join(`

`)}_formatCharacterCard(e){if(!e)return"";let s=[];return e.name&&s.push(`\u59D3\u540D: ${e.name}`),e.description&&s.push(`\u63CF\u8FF0: ${e.description}`),e.personality&&s.push(`\u6027\u683C: ${e.personality}`),e.scenario&&s.push(`\u573A\u666F: ${e.scenario}`),s.join(`

`)}_escapeRegex(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}_log(...e){this.debugMode&&console.log("[VariableResolver]",...e)}},St=new dn,hl=St});var qo={};de(qo,{DEFAULT_PROMPT_TEMPLATE:()=>Vo,ToolPromptService:()=>un,default:()=>bl,toolPromptService:()=>pn});var Vo,un,pn,bl,wr=j(()=>{Se();xs();Tr();Vo="\u8BF7\u5904\u7406\u4EE5\u4E0BAI\u56DE\u590D\u5185\u5BB9\uFF1A",un=class{constructor(){this.debugMode=!1}_buildVariableContext(e,s={}){let n=this._getPromptTemplate(e),r=St.buildToolContext({...s,toolName:e?.name||s?.toolName||"",toolId:e?.id||s?.toolId||""}),o=St.resolveTemplate(n,r).trim(),a=String(s?.toolContentMacro||s?.input?.toolContentMacro||"").trim();return St.buildToolContext({...s,toolName:e?.name||s?.toolName||"",toolId:e?.id||s?.toolId||"",toolPromptMacro:o,toolContentMacro:a})}buildToolMessages(e,s){if(!e)return this._log("\u6784\u5EFA\u5931\u8D25: \u5DE5\u5177\u914D\u7F6E\u4E3A\u7A7A"),[];let n=[],r=this._buildVariableContext(e,s),o=this._getBypassMessages(e);if(o&&o.length>0)for(let i of o)i.enabled!==!1&&n.push({role:this._normalizeRole(i.role),content:St.resolveTemplate(i.content||"",r)});let a=this._buildUserContent(this._getPromptTemplate(e),r);return a&&n.push({role:"user",content:a}),this._log(`\u6784\u5EFA\u6D88\u606F: ${n.length} \u6761`),n}buildPromptText(e,s){return this._buildVariableContext(e,s).toolPromptMacro||""}getToolPromptTemplate(e){return this._getPromptTemplate(e)}_getPromptTemplate(e){return e.promptTemplate&&typeof e.promptTemplate=="string"?e.promptTemplate:Vo}_getBypassMessages(e){return e.bypass?.enabled?L.buildBypassMessages(e):[]}_buildUserContent(e,s){return!e||!e.trim()?"":St.resolveTemplate(e,s).trim()}_normalizeRole(e){if(!e)return"user";switch(String(e).toLowerCase()){case"system":return"system";case"assistant":return"assistant";case"user":default:return"user"}}_log(...e){this.debugMode&&console.log("[ToolPromptService]",...e)}setDebugMode(e){this.debugMode=e}},pn=new un,bl=pn});var Jo={};de(Jo,{LEGACY_OUTPUT_MODES:()=>xl,OUTPUT_MODES:()=>Et,TOOL_FAILURE_STAGES:()=>ze,TOOL_RUNTIME_STATUS:()=>vl,TOOL_WRITEBACK_STATUS:()=>q,ToolOutputService:()=>yn,default:()=>Sl,toolOutputService:()=>ts});var Et,xl,vl,ze,q,yn,ts,Sl,_r=j(()=>{Se();Ss();Er();wr();Vs();Ds();Et={FOLLOW_AI:"follow_ai",POST_RESPONSE_API:"post_response_api"},xl={inline:"follow_ai"},vl={IDLE:"idle",RUNNING:"running",SUCCESS:"success",ERROR:"error"},ze={BUILD_MESSAGES:"build_messages",SEND_API_REQUEST:"send_api_request",EXTRACT_OUTPUT:"extract_output",INJECT_CONTEXT:"inject_context",COMPATIBILITY_EXECUTE:"compatibility_execute",UNKNOWN:"unknown"},q={SUCCESS:"success",FAILED:"failed",SKIPPED_EMPTY_OUTPUT:"skipped_empty_output",NOT_APPLICABLE:"not_applicable"},yn=class{constructor(){this.debugMode=!1,this._apiConnection=null}shouldRunPostResponse(e){return!e||!e.enabled||!e.trigger?.enabled||!e.output?.enabled?!1:e.output?.mode===Et.POST_RESPONSE_API}shouldRunFollowAi(e){if(!e||!e.enabled||!e.trigger?.enabled||!e.output?.enabled)return!1;let s=e.output?.mode;return s===Et.FOLLOW_AI||s==="inline"}shouldRunInline(e){return this.shouldRunFollowAi(e)}async runToolPostResponse(e,s){let n=Date.now(),r=e.id,o=s?.traceId||`trace_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,a=s?.sessionKey||"",i=this._getExtractionSelectors(e),l=e.output?.apiPreset||e.apiPreset||"",c="",u=q.NOT_APPLICABLE,d=null,h=[],g="";this._log(`\u5F00\u59CB\u6267\u884C\u5DE5\u5177: ${r}`),P.emit(I.TOOL_EXECUTION_STARTED,{toolId:r,traceId:o,sessionKey:a,mode:Et.POST_RESPONSE_API});try{if(c=ze.BUILD_MESSAGES,h=await this._buildToolMessages(e,s),!h||h.length===0)throw new Error("\u672A\u6784\u5EFA\u51FA\u53EF\u53D1\u9001\u7684\u5DE5\u5177\u8BF7\u6C42\u6D88\u606F\uFF0C\u8BF7\u68C0\u67E5\u63D0\u793A\u8BCD\u6A21\u677F\u6216\u7834\u9650\u8BCD\u914D\u7F6E\u662F\u5426\u4E3A\u7A7A\u3002");this._log(`\u6784\u5EFA\u4E86 ${h.length} \u6761\u6D88\u606F`);let b=await this._getRequestTimeout();c=ze.SEND_API_REQUEST;let G=await this._sendApiRequest(l,h,{timeoutMs:b,signal:s.signal});if(c=ze.EXTRACT_OUTPUT,g=this._extractOutputContent(G,e),g){if(c=ze.INJECT_CONTEXT,d=await cn.injectDetailed(r,g,{overwrite:e.output?.overwrite!==!1,sourceMessageId:s.messageId||"",extractionSelectors:i,traceId:o,sessionKey:a}),!d?.success)throw u=q.FAILED,new Error(d?.error||"\u5DE5\u5177\u7ED3\u679C\u5DF2\u751F\u6210\uFF0C\u4F46\u5199\u5165\u4E0A\u4E0B\u6587/\u4E16\u754C\u4E66\u5931\u8D25");u=q.SUCCESS}else u=q.SKIPPED_EMPTY_OUTPUT;c="";let F=Date.now()-n;return P.emit(I.TOOL_EXECUTED,{toolId:r,traceId:o,sessionKey:a,success:!0,duration:F,mode:Et.POST_RESPONSE_API}),this._log(`\u5DE5\u5177\u6267\u884C\u6210\u529F: ${r}, \u8017\u65F6 ${F}ms`),{success:!0,toolId:r,output:g,duration:F,meta:{traceId:o,sessionKey:a,messageCount:h.length,selectors:i,apiPreset:l,writebackStatus:u,failureStage:"",writebackDetails:d}}}catch(b){let G=Date.now()-n,F=c||ze.UNKNOWN,re=u||q.NOT_APPLICABLE;return this._log(`\u5DE5\u5177\u6267\u884C\u5931\u8D25: ${r}`,b),P.emit(I.TOOL_EXECUTION_FAILED,{toolId:r,traceId:o,sessionKey:a,error:b.message||String(b),duration:G}),{success:!1,toolId:r,error:b.message||String(b),duration:G,meta:{traceId:o,sessionKey:a,messageCount:h.length,selectors:i,apiPreset:l,writebackStatus:re,failureStage:F,writebackDetails:d}}}}async runToolInline(e,s){let n=Date.now(),r=e.id;try{let o=await this._buildToolMessages(e,s);return{success:!0,toolId:r,messages:o,duration:Date.now()-n}}catch(o){return{success:!1,toolId:r,error:o.message||String(o),duration:Date.now()-n}}}async previewExtraction(e,s){let n=this._buildRecentMessageExtractionEntries(e,s),r=this._joinMessageBlocks(n,"rawText"),o=this._joinMessageBlocks(n,"filteredText"),a=this._joinMessageBlocks(n,"extractedText",{skipEmpty:!0});return{success:!0,sourceText:r,filteredSourceText:o,extractedText:a,messageEntries:n,selectors:this._getExtractionSelectors(e),maxMessages:e?.extraction?.maxMessages||5}}async _buildToolMessages(e,s){let n=this._buildRecentMessageExtractionEntries(e,s),r=this._joinMessageBlocks(n,"rawText"),o=this._joinMessageBlocks(n,"filteredText"),a=this._joinMessageBlocks(n,"extractedText",{skipEmpty:!0}),i={...s,rawRecentMessagesText:r,recentMessagesText:o,extractedContent:a,toolContentMacro:this._buildToolContentMacro(n),toolName:e.name,toolId:e.id};return pn.buildToolMessages(e,i)}_normalizeRole(e){if(!e)return"user";let s=String(e).toLowerCase();return s==="system"?"system":s==="assistant"?"assistant":"user"}setApiConnection(e){this._apiConnection=e}async _sendApiRequest(e,s,n={}){if(!this._apiConnection)throw new Error("API\u8FDE\u63A5\u6A21\u5757\u672A\u914D\u7F6E");let{timeoutMs:r=9e4,signal:o}=n,a=null;if(e){if(!$n(e))throw new Error(`\u672A\u627E\u5230 API \u9884\u8BBE\u201C${e}\u201D\uFF0C\u8BF7\u91CD\u65B0\u9009\u62E9\u6216\u4FDD\u5B58\u540E\u518D\u6267\u884C`);a=cs(e)}else a=cs();let i=Ht(a||{});if(!i.valid&&!a?.useMainApi)throw new Error(`API\u914D\u7F6E\u65E0\u6548\uFF1A${i.errors.join("\uFF0C")}\u3002\u8BF7\u5148\u5B8C\u5584\u81EA\u5B9A\u4E49API\u914D\u7F6E\uFF0C\u6216\u542F\u7528\u201C\u4F7F\u7528SillyTavern\u4E3BAPI\u201D`);if(this._apiConnection.sendApiRequest)return await this._apiConnection.sendApiRequest(s,{timeoutMs:r,apiConfig:a},o);throw new Error("\u6CA1\u6709\u53EF\u7528\u7684API\u53D1\u9001\u65B9\u6CD5")}async _getRequestTimeout(){return ke.getSettings().executor?.requestTimeoutMs||9e4}_extractOutputContent(e,s){if(!e)return"";if(typeof e=="string")return this._applyOutputExtractionSelectors(e,s);if(typeof e=="object"){if(e.choices&&e.choices[0]?.message?.content)return this._applyOutputExtractionSelectors(e.choices[0].message.content,s);if(e.content)return this._applyOutputExtractionSelectors(e.content,s);if(e.text)return this._applyOutputExtractionSelectors(e.text,s);if(e.message)return this._applyOutputExtractionSelectors(e.message,s);try{return this._applyOutputExtractionSelectors(JSON.stringify(e,null,2),s)}catch{return this._applyOutputExtractionSelectors(String(e),s)}}return this._applyOutputExtractionSelectors(String(e),s)}_applyOutputExtractionSelectors(e,s){let n=typeof e=="string"?e:String(e||""),r=this._getExtractionSelectors(s);if(!r.length)return n.trim();let o=[];for(let a of r){let i=String(a||"").trim();if(!i)continue;if(i.startsWith("regex:")){let c=i.slice(6).trim();if(!c)continue;try{let u=new RegExp(c,"gi");[...n.matchAll(u)].forEach(h=>{let g=String(h?.[0]||"").trim();g&&o.push(g)})}catch(u){this._log("\u5DE5\u5177\u8F93\u51FA\u6B63\u5219\u63D0\u53D6\u5931\u8D25\uFF0C\u8DF3\u8FC7\u8BE5\u89C4\u5219",{selector:i,error:u})}continue}let l=i.replace(/^<|>$/g,"").trim();if(l)try{let c=new RegExp(`<${l}(?:\\s[^>]*)?>[\\s\\S]*?<\\/${l}>`,"gi");(n.match(c)||[]).forEach(d=>{let h=String(d||"").trim();h&&o.push(h)})}catch(c){this._log("\u5DE5\u5177\u8F93\u51FA\u6807\u7B7E\u63D0\u53D6\u5931\u8D25\uFF0C\u8DF3\u8FC7\u8BE5\u89C4\u5219",{selector:i,error:c})}}return o.length>0?o.join(`

`).trim():n.trim()}_getExtractionSelectors(e){let s=e?.extraction?.selectors;return Array.isArray(s)&&s.length>0?s.map(n=>String(n||"").trim()).filter(Boolean):Array.isArray(e?.extractTags)&&e.extractTags.length>0?e.extractTags.map(n=>String(n||"").trim()).filter(Boolean):[]}_applyExtractionSelectors(e,s){return this._applyExtractionSelectorsInternal(e,s,{strict:!1})}_applyExtractionSelectorsInternal(e,s,n={}){let r=typeof e=="string"?e:String(e||""),o=this._getExtractionSelectors(s),{strict:a=!1}=n;if(!o.length)return r.trim();let i=o.map((c,u)=>{let d=String(c||"").trim(),h=d.startsWith("regex:");return{id:`tool-extract-${u}`,type:h?"regex_include":"include",value:h?d.slice(6).trim():d,enabled:!0}}).filter(c=>c.value),l=kt(r,i,[]);return a?(l||"").trim():l||r.trim()}_extractToolContent(e,s){let n=typeof s=="string"?s:String(s||"");return this._getExtractionSelectors(e).length?this._applyExtractionSelectorsInternal(n,e,{strict:!0}):n.trim()}_applyGlobalContextRules(e){let s=typeof e=="string"?e:String(e||"");if(!s.trim())return"";try{let n=ct()||[],r=Dt()||[];return!Array.isArray(n)||n.length===0?s.trim():kt(s,n,r)||s.trim()}catch(n){return this._log("\u5E94\u7528\u5168\u5C40\u6B63\u6587\u63D0\u53D6\u89C4\u5219\u5931\u8D25\uFF0C\u56DE\u9000\u539F\u59CB\u6587\u672C",n),s.trim()}}_getMessageText(e){if(!e)return"";let s=[e.content,e.mes,e.message,e.text,e?.data?.content];for(let n of s)if(typeof n=="string"&&n.trim())return n.trim();return""}_collectRecentAssistantMessages(e,s){return this._collectRecentAssistantMessageEntries(e,s).map(n=>n.text).filter(Boolean).join(`

`)}_collectRecentAssistantMessageEntries(e,s){let n=Math.max(1,parseInt(e?.extraction?.maxMessages,10)||5),r=Array.isArray(s?.chatMessages)?s.chatMessages:[],o=[];for(let i=r.length-1;i>=0&&o.length<n;i-=1){let l=r[i],c=String(l?.role||"").toLowerCase(),u=c==="assistant"||c==="ai"||!l?.is_user&&!l?.is_system&&!c,d=this._getMessageText(l);u&&d&&o.unshift({text:d,message:l,chatIndex:i})}if(o.length>0)return o;let a=s?.lastAiMessage||s?.input?.lastAiMessage||"";return a?[{text:a,message:null,chatIndex:-1}]:[]}_buildRecentMessageExtractionEntries(e,s){return this._collectRecentAssistantMessageEntries(e,s).map((r,o)=>{let a=r.text||"",i=this._applyGlobalContextRules(a),l=this._extractToolContent(e,a);return{...r,order:o+1,rawText:a,filteredText:i,extractedText:l}})}_joinMessageBlocks(e,s,n={}){let r=Array.isArray(e)?e:[],{skipEmpty:o=!1}=n;return r.map(i=>{let l=String(i?.[s]||"").trim();return o&&!l?"":`${`\u3010\u7B2C ${i?.order||0} \u6761 AI \u6D88\u606F\u3011`}
${l||"(\u7A7A)"}`}).filter(Boolean).join(`

--------------------------------

`)}_buildToolContentMacro(e){return(Array.isArray(e)?e:[]).map(r=>{let o=`\u3010\u7B2C ${r?.order||0} \u6761 AI \u6D88\u606F\u3011`,a=String(r?.filteredText||"").trim()||"(\u7A7A)",i=String(r?.extractedText||"").trim()||"(\u7A7A)";return`${o}
\u6B63\u6587\uFF1A
${a}

\u5DE5\u5177\uFF1A
${i}`}).filter(Boolean).join(`

--------------------------------

`).trim()}filterPostResponseTools(e){return Array.isArray(e)?e.filter(s=>this.shouldRunPostResponse(s)):[]}filterInlineTools(e){return Array.isArray(e)?e.filter(s=>this.shouldRunInline(s)):[]}setDebugMode(e){this.debugMode=e}_log(...e){(this.debugMode||ke.getDebugSettings()?.enableDebugLog)&&console.log("[ToolOutputService]",...e)}},ts=new yn,Sl=ts});var pa={};de(pa,{AUTO_TRIGGER_SKIP_REASONS:()=>w,EVENT_TYPES:()=>E,TOOL_EXECUTION_PATHS:()=>Ut,checkGate:()=>$r,destroyToolTriggerManager:()=>rc,getChatContext:()=>Or,getCurrentCharacter:()=>Lr,getFullContext:()=>Kl,getToolTriggerManagerState:()=>oc,getWorldbookContent:()=>ia,initToolTriggerManager:()=>da,initTriggerModule:()=>Mr,previewToolExtraction:()=>zr,registerEventListener:()=>et,registerTriggerHandler:()=>Yl,removeAllListeners:()=>Fl,removeAllTriggerHandlers:()=>Vl,resetGateState:()=>Hl,runToolManually:()=>Br,setDebugMode:()=>ac,setTriggerHandlerEnabled:()=>Wl,triggerState:()=>A,unregisterEventListener:()=>Ir,updateGateState:()=>ns});function Gt(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent}catch{}return window}function Ar(t){if(!t)return"";let e=[t.mes,t.message,t.content,t.text,t?.data?.content];for(let s of e)if(typeof s=="string"&&s.trim())return s;return""}function J(t){return typeof t=="number"&&Number.isFinite(t)?String(t):typeof t=="string"&&t.trim()?t.trim():""}function Pr(t){return new Promise(e=>setTimeout(e,t))}function Rr(t,e){let s=[t?.message_id,t?.messageId,t?.id,t?.mes_id,e];for(let n of s){if(typeof n=="number"&&Number.isFinite(n))return n;if(typeof n=="string"&&n.trim())return n.trim()}return e}function Cr(t=[]){return(Array.isArray(t)?t:[]).map((s,n)=>({role:Nr(s),content:Ar(s),name:s?.name||"",timestamp:s?.send_date||s?.timestamp||"",isSystem:!!s?.is_system,isUser:!!s?.is_user,sourceId:Rr(s,n),chatIndex:n,originalMessage:s}))}function xn(t){let e=String(t||"").trim();return!(!e||e.length<5||/^[.。·•…\s]+$/.test(e))}function _l(t,e=null,s={}){let{lockToMessageId:n=!1}=s,r=Cr(t),o=e==null||e===""?null:String(e).trim(),a=null,i=null;for(let l=r.length-1;l>=0;l-=1){let c=r[l],u=J(c.sourceId),d=o&&(u===o||String(c.chatIndex)===o);if(!a&&c.role==="assistant"&&xn(c.content)&&(!o||!n||d)&&(a=c),!i&&c.role==="user"&&c.content&&(i=c),a&&i)break}return{messages:r,lastUserMessage:i,lastAiMessage:a}}async function Al(t={}){let{preferredMessageId:e=null,retries:s=0,retryDelayMs:n=250,lockToMessageId:r=!1}=t,o={messages:[],lastUserMessage:null,lastAiMessage:null};for(let a=0;a<=s;a+=1){let i=await ws();if(o=_l(i,e,{lockToMessageId:r}),o.lastAiMessage?.content)return o;a<s&&await Pr(n)}return o}function gn(){ns({lastUserSendIntentAt:Date.now()})}function Il(){let t=Gt(),e=t?.document;if(!e?.body)return!1;if(t.__YYT_sendIntentHooksInstalled)return!0;let s=["#send_but","#option_send","#send_button",'button[title*="\u53D1\u9001"]','button[title*="Send"]'],n=["#send_textarea","#send_textarea textarea","textarea#send_textarea",'textarea[data-testid="send_textarea"]'],r=(o,a,i)=>{o.forEach(l=>{let c=e.querySelector(l);c&&c.addEventListener(a,i,!0)})};return r(s,"click",()=>gn()),r(s,"pointerup",()=>gn()),r(s,"touchend",()=>gn()),r(n,"keydown",o=>{let a=o?.key||"";(a==="Enter"||a==="NumpadEnter")&&!o.shiftKey&&gn()}),t.__YYT_sendIntentHooksInstalled=!0,k("\u5DF2\u5B89\u88C5\u53D1\u9001\u610F\u56FE\u6355\u83B7\u94A9\u5B50"),!0}function Ml(t,e={},s=!1){return s?!0:String(t||e?.type||"").trim().toLowerCase().includes("quiet")||e?.quiet===!0||e?.isQuiet===!0||e?.quiet_prompt===!0}function pt(){return Gt().SillyTavern||null}function Pl(){return Gt().TavernHelper||null}function Rl(t=""){return t===E.MESSAGE_RECEIVED||t===E.MESSAGE_SENT||t===E.MESSAGE_UPDATED||t===E.MESSAGE_DELETED}function na(t){return!!t&&(typeof t.on=="function"||typeof t.addEventListener=="function")}function ra(t,e,s){if(!t||typeof s!="function")return!1;try{if(typeof t.off=="function")return t.off(e,s),!0;if(typeof t.removeListener=="function")return t.removeListener(e,s),!0;if(typeof t.removeEventListener=="function")return t.removeEventListener(e,s),!0}catch(n){C("warn","\u79FB\u9664\u4E8B\u4EF6\u76D1\u542C\u5931\u8D25",{eventName:e,error:n?.message||String(n)})}return!1}function Cl(t,e,s){na(t)&&(fe.eventSource=t,fe.eventTypes=e||fe.eventTypes||null,fe.source=s||fe.source||"unknown",C("info","\u7F13\u5B58\u4E8B\u4EF6\u6865\u63A5\u6210\u529F",{source:fe.source,hasOff:typeof t.off=="function",hasRemoveListener:typeof t.removeListener=="function",hasAddEventListener:typeof t.addEventListener=="function"}))}function bn(){let t=Gt(),e=t.SillyTavern||null,s=e?.getContext?.()||null,n=[{source:"SillyTavern.eventSource",eventSource:e?.eventSource,eventTypes:e?.eventTypes||e?.event_types||null},{source:"topWindow.eventSource",eventSource:t?.eventSource,eventTypes:t?.event_types||t?.eventTypes||null},{source:"SillyTavern.getContext()",eventSource:s?.eventSource||null,eventTypes:s?.eventTypes||s?.event_types||null},{source:"scriptModule exports",eventSource:fe.scriptModule?.eventSource||null,eventTypes:fe.scriptModule?.event_types||fe.scriptModule?.eventTypes||null}];for(let r of n)if(na(r.eventSource))return Cl(r.eventSource,r.eventTypes,r.source),r;return{source:"",eventSource:null,eventTypes:null}}async function kl(){let t=bn();if(t.eventSource)return t;fe.loadingPromise||(fe.loadingPromise=(async()=>{try{let s=El;fe.scriptModule=await import(s)}catch(s){fe.importError=s,C("warn","\u52A0\u8F7D /script.js \u4E8B\u4EF6\u6865\u63A5\u5931\u8D25",s?.message||String(s))}finally{fe.loadingPromise=null}})()),await fe.loadingPromise;let e=bn();return e.eventSource?e:{source:"",eventSource:null,eventTypes:null}}function vn(){return bn().eventSource||fe.eventSource||null}function Sn(){return bn().eventTypes||fe.eventTypes||E}function k(...t){(A.debugMode||ke.getDebugSettings()?.enableDebugLog)&&console.log("[YouYouToolkit:Trigger]",...t)}function C(t="info",...e){(typeof console[t]=="function"?console[t]:console.log)("[youyou_trigger]",...e)}function De(){let t=ke.getListenerSettings?.()||ke.getSettings?.()?.listener||{},e=parseInt(t?.debounceMs,10),s=parseInt(t?.messageSessionWindowMs,10),n=parseInt(t?.historyRetentionLimit,10);return{listenGenerationEnded:t?.listenGenerationEnded!==!1,ignoreQuietGeneration:t?.ignoreQuietGeneration!==!1,ignoreAutoTrigger:t?.ignoreAutoTrigger===!0,debounceMs:Number.isFinite(e)?Math.max(0,e):300,useMessageReceivedFallback:t?.useMessageReceivedFallback!==!1,useGenerationAfterCommandsFallback:t?.useGenerationAfterCommandsFallback!==!1,messageSessionWindowMs:Number.isFinite(s)?Math.max(300,s):1800,historyRetentionLimit:Number.isFinite(n)?Math.max(1,Math.min(50,n)):10}}function tt(t,e=""){if(t&&typeof t=="object")return J(t?.messageId??t?.id??t?.message_id??t?.mes_id);if(e===E.GENERATION_ENDED){if(typeof t=="number"&&Number.isFinite(t))return String(t);if(typeof t=="string"&&/^\d+$/.test(t.trim()))return t.trim()}return Rl(e)?J(t):""}function Dl(t,e,s){let n=J(s);if(!n)return!1;let r=J(Rr(t,e));if(r&&r===n)return!0;let o=Number(n);return Number.isInteger(o)&&e===o}async function $l(t){let e=J(t);if(!e)return null;let s=await ws();for(let n=s.length-1;n>=0;n-=1){let r=s[n];if(Dl(r,n,e))return{message:r,index:n}}return null}async function Ol(t,e={}){let{retries:s=0,retryDelayMs:n=80}=e,r=null;for(let o=0;o<=s;o+=1){if(r=await $l(t),r)return r;o<s&&await Pr(n)}return null}function Nl(t,e,s){return J(s)?t===E.MESSAGE_RECEIVED||t===E.MESSAGE_UPDATED?!0:!!(e&&typeof e=="object"&&(e?.messageId!==void 0||e?.message_id!==void 0||e?.id!==void 0||e?.mes_id!==void 0)):!1}function kr(t=Date.now()){return[A.gateState.lastUserSendIntentAt,A.gateState.lastUserMessageAt].filter(s=>Number(s)>0).some(s=>t-s<=Tl)}function oa(t=Tn()){let e=A.gateState.lastGenerationBaseline;return!e||t&&e.chatId&&e.chatId!==t?null:e}function Dr(t=Date.now()){return kr(t)?!0:!!oa()?.startedByUserIntent}function Qo(){let t=oa();return t?A.gateState.lastGenerationDryRun||t.dryRun?{eligible:!1,baseline:t,reason:w.DRY_RUN_GENERATION,detail:"dry_run_generation"}:t.startedByUserIntent?{eligible:!0,baseline:t,reason:"",detail:""}:{eligible:!1,baseline:t,reason:w.IGNORED_AUTO_TRIGGER,detail:"generation_started_without_recent_user_intent"}:{eligible:!1,baseline:null,reason:w.NO_CONFIRMED_ASSISTANT_MESSAGE,detail:"missing_generation_baseline"}}function aa(t=Date.now()){return Number(A.gateState.uiTransitionGuardUntil)>t}function Zo(t=""){let e=Date.now();ns({uiTransitionGuardUntil:e+Xo,lastUiTransitionAt:e,lastUiTransitionSource:t||""}),C("info","\u8FDB\u5165\u5BBF\u4E3B UI \u8FC7\u6E21\u5B88\u536B",{source:t||"unknown",guardUntil:e+Xo})}function ea(t=""){for(let e of _.pendingMessageTimers.values())clearTimeout(e);_.pendingMessageTimers.clear(),t&&C("info","\u5DF2\u6E05\u7406\u5F85\u6267\u884C\u81EA\u52A8\u89E6\u53D1\u5B9A\u65F6\u5668",{reason:t})}function Ll(t=[],e={}){let s=pt(),n=s?.getContext?.()||null,r=Cr(t),o=null;for(let a=r.length-1;a>=0;a-=1){let i=r[a];if(i.role==="assistant"&&xn(i.content)){o=i;break}}return{traceId:e.traceId||_s("generation"),startedAt:Number(e.startedAt)||Date.now(),capturedAt:Date.now(),chatId:En(s,n,null),messageCount:r.length,lastAssistantIndex:o?.chatIndex??-1,lastAssistantMessageId:J(o?.sourceId),lastAssistantPreview:String(o?.content||"").slice(0,160),dryRun:!!e.dryRun,generationType:e.type||"",generationParams:e.params||null,startedByUserIntent:!!e.startedByUserIntent,userIntentDetectedAt:Number(e.userIntentDetectedAt)||0}}async function Ul(t={}){let e=await ws();return Ll(e,t)}function ta(t,e){if(!t||t.role!=="assistant"||!xn(t.content))return!1;if(!e)return!0;if(Number.isInteger(e.lastAssistantIndex)&&e.lastAssistantIndex>=0)return t.chatIndex>e.lastAssistantIndex;let s=Number.isFinite(e.messageCount)?e.messageCount:0;return t.chatIndex>=s}async function Gl(t=""){let e=J(t),s=pt(),n=s?.getContext?.()||null,r=En(s,n,null),o=await ws(),a=Cr(o),i=A.gateState.lastGenerationBaseline?.chatId===r?A.gateState.lastGenerationBaseline:null;if(e){let l=a.find(c=>J(c.sourceId)===e||String(c.chatIndex)===e);return l&&xn(l.content)&&l.role==="assistant"&&(!i||ta(l,i))?l:null}if(!i)return null;for(let l=a.length-1;l>=0;l-=1){let c=a[l];if(ta(c,i))return c}return null}async function mn(t="",e={}){let{retries:s=0,retryDelayMs:n=250}=e,r=null;for(let o=0;o<=s;o+=1){if(r=await Gl(t),r)return r;o<s&&await Pr(n)}return null}function Bl(t={}){return{stage:"",eventType:"",traceId:"",sessionKey:"",messageId:"",messageKey:"",messageRole:"",reason:"",skipReasonDetailed:"",confirmedAssistantMessageId:"",scheduledDelayMs:0,candidateToolIds:[],receivedAt:Date.now(),handledAt:0,generationTraceId:A.gateState.lastGenerationTraceId||"",generationDryRun:!!A.gateState.lastGenerationDryRun,generationStartedAt:A.gateState.lastGenerationBaseline?.startedAt||0,uiTransitionGuardActive:aa(),uiTransitionGuardUntil:A.gateState.uiTransitionGuardUntil||0,lastUiTransitionSource:A.gateState.lastUiTransitionSource||"",baselineMessageCount:A.gateState.lastGenerationBaseline?.messageCount||0,baselineAssistantId:A.gateState.lastGenerationBaseline?.lastAssistantMessageId||"",generationBaselineMessageCount:A.gateState.lastGenerationBaseline?.messageCount||0,generationBaselineAssistantId:A.gateState.lastGenerationBaseline?.lastAssistantMessageId||"",confirmationSource:"",isSpeculativeSession:!1,registeredEvents:Array.from(_.listeners.keys()),listenerSettings:De(),hasRecentUserTriggerIntent:kr(),hasConfirmedUserTriggerIntent:Dr(),generationStartedByUserIntent:!!A.gateState.lastGenerationBaseline?.startedByUserIntent,...t}}function xe(t={}){let e=Bl(t);return _.lastEventDebugSnapshot=e,k("\u81EA\u52A8\u89E6\u53D1\u4E8B\u4EF6\u5FEB\u7167:",e),e}function zl(){let t=De();return t.listenGenerationEnded===!1?{skip:!0,reason:w.LISTENER_DISABLED,listenerSettings:t}:t.ignoreAutoTrigger&&!Dr()?{skip:!0,reason:w.IGNORED_AUTO_TRIGGER,listenerSettings:t}:{skip:!1,reason:"",listenerSettings:t}}function jl(t={}){return{triggerEvent:"",traceId:"",sessionKey:"",messageId:"",messageKey:"",selectedToolIds:[],skipReason:"",skipReasonDetailed:"",lockedAiMessageId:"",confirmedAssistantMessageId:"",confirmationSource:"",generationTraceId:A.gateState.lastGenerationTraceId||"",triggeredAt:Date.now(),...t}}function Tt(t={}){let e=jl(t);return _.lastAutoTriggerSnapshot=e,k("\u81EA\u52A8\u89E6\u53D1\u5FEB\u7167:",e),e}function ss(t,e){(Array.isArray(t)?t:[]).forEach(n=>{n?.id&&Xt(n.id,{lastTriggerAt:Date.now(),...e},{touchLastRunAt:!1,emitEvent:!1})})}function En(t,e,s){let r=[e?.chatId,e?.chat_id,e?.chat_filename,e?.chatMetadata?.chatId,e?.chatMetadata?.chat_id,e?.chatMetadata?.file_name,e?.chatMetadata?.name,t?.chatId,t?.chat_id,t?.chat_filename].find(o=>typeof o=="string"&&o.trim());return r||(s?.id!==void 0&&s?.id!==null?`chat_char_${s.id}`:t?.this_chid!==void 0&&t?.this_chid!==null?`chat_char_${t.this_chid}`:"chat_default")}function et(t,e,s={}){if(!t||typeof e!="function")return k("\u65E0\u6548\u7684\u4E8B\u4EF6\u7C7B\u578B\u6216\u56DE\u8C03\u51FD\u6570"),C("warn","\u6CE8\u518C\u4E8B\u4EF6\u76D1\u542C\u5931\u8D25\uFF1A\u4E8B\u4EF6\u7C7B\u578B\u6216\u56DE\u8C03\u65E0\u6548",{eventType:t}),()=>{};let{once:n=!1,priority:r=0}=s,o=vn(),i=Sn()[t]||t,l=async(...c)=>{try{if(C("info","\u6536\u5230\u4E8B\u4EF6",t,c[0]??null),s.gateCheck&&!await $r(s.gateCheck)){k(`\u95E8\u63A7\u68C0\u67E5\u5931\u8D25\uFF0C\u8DF3\u8FC7\u4E8B\u4EF6: ${t}`),C("warn","\u95E8\u63A7\u68C0\u67E5\u5931\u8D25\uFF0C\u8DF3\u8FC7\u4E8B\u4EF6",t);return}await e(...c),n&&Ir(t,l)}catch(u){console.error("[YouYouToolkit:Trigger] \u4E8B\u4EF6\u5904\u7406\u9519\u8BEF:",u)}};if(A.listeners.has(t)||A.listeners.set(t,new Set),A.listeners.get(t).add(l),o&&typeof o.on=="function")o.on(i,l),k(`\u5DF2\u6CE8\u518C\u4E8B\u4EF6\u76D1\u542C\u5668: ${t}`),C("info","\u5DF2\u6CE8\u518C\u4E8B\u4EF6\u6E90\u76D1\u542C",{eventType:t,stEventType:i});else if(o&&typeof o.addEventListener=="function")o.addEventListener(i,l),k(`\u5DF2\u6CE8\u518C\u4E8B\u4EF6\u76D1\u542C\u5668: ${t}`),C("info","\u5DF2\u6CE8\u518C addEventListener \u4E8B\u4EF6\u76D1\u542C",{eventType:t,stEventType:i});else{let c=Gt();c.addEventListener&&(c.addEventListener(i,l),k(`\u5DF2\u6CE8\u518CDOM\u4E8B\u4EF6\u76D1\u542C\u5668: ${t}`),C("warn","\u4E8B\u4EF6\u6E90\u4E0D\u53EF\u7528\uFF0C\u56DE\u9000\u4E3A DOM \u4E8B\u4EF6\u76D1\u542C",{eventType:t,stEventType:i}))}return()=>Ir(t,l)}function Ir(t,e){let s=A.listeners.get(t);if(s&&s.has(e)){s.delete(e);let n=vn(),o=Sn()[t]||t;if(ra(n,o,e))k(`\u5DF2\u53D6\u6D88\u4E8B\u4EF6\u76D1\u542C\u5668: ${t}`);else{let a=Gt();a.removeEventListener&&a.removeEventListener(o,e)}}}function Fl(){let t=vn(),e=Sn();for(let[s,n]of A.listeners){let r=e[s]||s;for(let o of n)if(!ra(t,r,o)){let a=Gt();a.removeEventListener&&a.removeEventListener(r,o)}}A.listeners.clear(),k("\u5DF2\u79FB\u9664\u6240\u6709\u4E8B\u4EF6\u76D1\u542C\u5668")}async function $r(t){if(!t)return!0;let e=Date.now(),s=A.gateState;if(t.minInterval&&s.lastGenerationAt&&e-s.lastGenerationAt<t.minInterval)return k("\u95E8\u63A7\u68C0\u67E5\u5931\u8D25: \u95F4\u9694\u65F6\u95F4\u8FC7\u77ED"),!1;if(t.maxInterval&&s.lastUserMessageAt&&e-s.lastUserMessageAt>t.maxInterval)return k("\u95E8\u63A7\u68C0\u67E5\u5931\u8D25: \u95F4\u9694\u65F6\u95F4\u8FC7\u957F"),!1;if(t.requireUserMessage&&!s.lastUserMessageId)return k("\u95E8\u63A7\u68C0\u67E5\u5931\u8D25: \u7F3A\u5C11\u7528\u6237\u6D88\u606F"),!1;if(t.excludeQuietGeneration&&s.lastGenerationType==="quiet")return k("\u95E8\u63A7\u68C0\u67E5\u5931\u8D25: quiet\u751F\u6210\u88AB\u6392\u9664"),!1;if(t.customCheck&&typeof t.customCheck=="function")try{if(!await t.customCheck(s))return k("\u95E8\u63A7\u68C0\u67E5\u5931\u8D25: \u81EA\u5B9A\u4E49\u68C0\u67E5\u8FD4\u56DEfalse"),!1}catch(n){return console.error("[YouYouToolkit:Trigger] \u81EA\u5B9A\u4E49\u95E8\u63A7\u68C0\u67E5\u9519\u8BEF:",n),!1}return!0}function ns(t){Object.assign(A.gateState,t)}function Hl(){A.gateState={lastUserSendIntentAt:0,lastUserMessageId:null,lastUserMessageText:"",lastUserMessageAt:0,lastGenerationTraceId:"",lastGenerationType:null,lastGenerationParams:null,lastGenerationDryRun:!1,lastGenerationAt:0,isGenerating:!1,lastGenerationBaseline:null,uiTransitionGuardUntil:0,lastUiTransitionAt:0,lastUiTransitionSource:""}}async function Or(t={}){let{depth:e=3,includeUser:s=!0,includeAssistant:n=!0,includeSystem:r=!1,format:o="messages"}=t;if(!pt())return k("\u65E0\u6CD5\u83B7\u53D6SillyTavern API"),null;try{let i=await ws(),l=[],c=Math.max(0,i.length-e);for(let u=c;u<i.length;u++){let d=i[u];if(!d)continue;let h=Nr(d);if(!(h==="user"&&!s)&&!(h==="system"&&!r)&&!(h==="assistant"&&!n))if(o==="messages"){let g=Ar(d);l.push({role:h,content:g,name:d.name||"",timestamp:d.send_date||d.timestamp,isSystem:!!d.is_system,isUser:!!d.is_user})}else l.push(Ar(d))}return{messages:l,totalMessages:i.length,startIndex:c,endIndex:i.length-1}}catch(i){return console.error("[YouYouToolkit:Trigger] \u83B7\u53D6\u804A\u5929\u4E0A\u4E0B\u6587\u5931\u8D25:",i),null}}function Nr(t){if(!t)return"assistant";if(t.is_user)return"user";if(t.is_system)return"system";let e=String(t.role||"").toLowerCase();return e==="user"||e==="assistant"||e==="system"?e:"assistant"}async function ws(){let t=Pl(),e=pt();if(t?.getChatMessages)try{let s=-1;if(typeof t.getLastMessageId=="function"&&(s=t.getLastMessageId()),!Number.isFinite(s)||s<0){let n=e?.getContext?.()||null,r=Array.isArray(n?.chat)?n.chat:[],o=Array.isArray(e?.chat)?e.chat:[];s=(r.length?r:o).length-1}if(Number.isFinite(s)&&s>=0){let n=await t.getChatMessages(`0-${s}`,{include_swipes:!1,include_hidden:!0});if(Array.isArray(n)&&n.length>0)return n}}catch(s){console.warn("[YouYouToolkit:Trigger] \u901A\u8FC7 TavernHelper \u8BFB\u53D6\u804A\u5929\u6D88\u606F\u5931\u8D25\uFF0C\u56DE\u9000\u5230\u9ED8\u8BA4\u6765\u6E90:",s)}try{let s=e?.getContext?.()||null;if(Array.isArray(s?.chat)&&s.chat.length>0)return s.chat}catch(s){console.warn("[YouYouToolkit:Trigger] \u901A\u8FC7 getContext() \u8BFB\u53D6\u804A\u5929\u5931\u8D25:",s)}return Array.isArray(e?.chat)?e.chat:[]}async function Lr(){let t=pt();if(!t)return null;try{let e=t.this_chid,s=t.characters||[];if(e>=0&&e<s.length){let n=s[e];return{id:e,name:n.name||"",description:n.description||"",personality:n.personality||"",scenario:n.scenario||"",firstMes:n.first_mes||"",mesExample:n.mes_example||""}}return null}catch(e){return console.error("[YouYouToolkit:Trigger] \u83B7\u53D6\u89D2\u8272\u4FE1\u606F\u5931\u8D25:",e),null}}async function ia(t={}){let{enabledOnly:e=!0,maxLength:s=1e4}=t,n=pt();if(!n)return"";try{let o=(n.lorebook||[]).entries||[],a=[],i=0;for(let l of o){if(e&&!l.enabled)continue;let c=l.content||"";c&&i+c.length<=s&&(a.push(c),i+=c.length)}return a.join(`

`)}catch(r){return console.error("[YouYouToolkit:Trigger] \u83B7\u53D6\u4E16\u754C\u4E66\u5185\u5BB9\u5931\u8D25:",r),""}}async function Kl(t={}){let[e,s,n]=await Promise.all([Or(t.chat||{}),Lr(),ia(t.worldbook||{})]);return{chat:e,character:s,worldbook:n,timestamp:Date.now()}}function Yl(t,e){if(!t||!e)return k("\u65E0\u6548\u7684\u5904\u7406\u5668ID\u6216\u914D\u7F6E"),()=>{};let{eventType:s,handler:n,gateCondition:r,priority:o=0}=e;if(!s||typeof n!="function")return k("\u65E0\u6548\u7684\u4E8B\u4EF6\u7C7B\u578B\u6216\u5904\u7406\u5668\u51FD\u6570"),()=>{};A.handlers.set(t,{eventType:s,handler:n,gateCondition:r,priority:o,enabled:!0});let a=et(s,async(...i)=>{let l=A.handlers.get(t);!l||!l.enabled||l.gateCondition&&!await $r(l.gateCondition)||await l.handler(...i)},{priority:o});return k(`\u5DF2\u6CE8\u518C\u89E6\u53D1\u5904\u7406\u5668: ${t}`),()=>{a(),A.handlers.delete(t),k(`\u5DF2\u53D6\u6D88\u89E6\u53D1\u5904\u7406\u5668: ${t}`)}}function Wl(t,e){let s=A.handlers.get(t);s&&(s.enabled=e,k(`\u89E6\u53D1\u5904\u7406\u5668 ${t} \u5DF2${e?"\u542F\u7528":"\u7981\u7528"}`))}function Vl(){A.handlers.clear(),k("\u5DF2\u79FB\u9664\u6240\u6709\u89E6\u53D1\u5904\u7406\u5668")}function _s(t="trace"){return`${t}_${Date.now()}_${Math.random().toString(36).slice(2,8)}`}function ql(t,e=10){let s=Number.isFinite(e)?Math.max(1,Math.min(50,Math.floor(e))):10;return Array.isArray(t)?t.length<=s?t:t.slice(t.length-s):[]}function Tn(){let t=pt(),e=t?.getContext?.()||null;return En(t,e,null)}function Ur(t,e,s=""){let n=t||Tn(),r=J(e);return`${n}::${r||`event:${s||"unknown"}:latest`}`}function Jl(t,e,s={}){let n=J(s?.messageId||tt(e,t)),r=s?.chatId||Tn(),o=s?.sessionKey||Ur(r,n,t),a=Date.now();return{sessionKey:o,traceId:s?.traceId||_s("session"),chatId:r,messageId:n,messageKey:s?.messageKey||"",messageRole:s?.messageRole||"",confirmedAssistantMessageId:s?.confirmedAssistantMessageId||"",confirmationSource:s?.confirmationSource||"",isSpeculativeSession:!!s?.isSpeculativeSession,skipReasonDetailed:s?.skipReasonDetailed||"",firstEventType:s?.eventType||t||"",receivedEvents:t?[t]:[],phase:s?.phase||O.RECEIVED,skipReason:s?.skipReason||"",scheduledAt:0,handledAt:0,completedAt:0,candidateToolIds:Array.isArray(s?.candidateToolIds)?[...s.candidateToolIds]:[],executionPathIds:Array.isArray(s?.executionPathIds)?[...s.executionPathIds]:[],sourceMessageLocked:!!n,createdAt:a,updatedAt:a}}function Xl(t=Date.now()){let{messageSessionWindowMs:e}=De();for(let[s,n]of _.messageSessions.entries()){let r=n?.completedAt||n?.handledAt||n?.updatedAt||n?.createdAt||0;r>0&&t-r>e&&_.messageSessions.delete(s)}}function rs(t,e,s={}){Xl();let n=J(s?.messageId||tt(e,t)),r=s?.chatId||Tn(),o=s?.sessionKey||Ur(r,n,t),a=_.messageSessions.get(o);return a?(t&&!a.receivedEvents.includes(t)&&a.receivedEvents.push(t),n&&!a.messageId&&(a.messageId=n,a.sourceMessageLocked=!0),s?.messageRole&&(a.messageRole=s.messageRole),s?.confirmedAssistantMessageId&&(a.confirmedAssistantMessageId=s.confirmedAssistantMessageId),s?.confirmationSource&&(a.confirmationSource=s.confirmationSource),s?.skipReasonDetailed&&(a.skipReasonDetailed=s.skipReasonDetailed),s?.isSpeculativeSession!==void 0&&(a.isSpeculativeSession=!!s.isSpeculativeSession),s?.candidateToolIds&&(a.candidateToolIds=[...s.candidateToolIds]),a.updatedAt=Date.now(),a):(a=Jl(t,e,{...s,chatId:r,sessionKey:o,messageId:n}),_.messageSessions.set(o,a),a)}function he(t,e={}){return t?(Object.assign(t,e,{updatedAt:Date.now()}),t):null}function Ql(t,e){return!t||!e||t.sessionKey===e||(_.messageSessions.delete(t.sessionKey),t.sessionKey=e,t.updatedAt=Date.now(),_.messageSessions.set(e,t)),t}function ue(t,e={}){if(!t)return null;let{historyRetentionLimit:s}=De(),n={id:e?.id||_s("session_hist"),at:e?.at||Date.now(),traceId:t.traceId,sessionKey:t.sessionKey,phase:e?.phase||t.phase,eventType:e?.eventType||t.firstEventType,messageId:e?.messageId||t.messageId,messageKey:e?.messageKey||t.messageKey,messageRole:e?.messageRole||t.messageRole,confirmedAssistantMessageId:e?.confirmedAssistantMessageId||t.confirmedAssistantMessageId||"",confirmationSource:e?.confirmationSource||t.confirmationSource||"",isSpeculativeSession:e?.isSpeculativeSession??t.isSpeculativeSession??!1,skipReason:e?.skipReason||t.skipReason||"",skipReasonDetailed:e?.skipReasonDetailed||t.skipReasonDetailed||"",candidateToolIds:Array.isArray(e?.candidateToolIds)?[...e.candidateToolIds]:[...t.candidateToolIds||[]],executionPathIds:Array.isArray(e?.executionPathIds)?[...e.executionPathIds]:[...t.executionPathIds||[]]};return _.recentSessionHistory=ql([..._.recentSessionHistory,n],s),n}function Lt(t,e={}){let s=Array.isArray(t)?t:[],{historyRetentionLimit:n}=De();s.forEach(r=>{r?.id&&bs(r.id,"trigger",e,{limit:n,emitEvent:!1})})}function Zl(t,e={}){if(!t)return;let{historyRetentionLimit:s}=De();bs(t,"writeback",e,{limit:s,emitEvent:!1})}function ec(t){let e=Date.now();return _.lastDuplicateMessageKey===t&&e-_.lastDuplicateMessageAt<wl?!1:(_.lastDuplicateMessageKey=t,_.lastDuplicateMessageAt=e,!0)}function wt(t,e,s={}){let n=J(s?.messageId||tt(e,t)),r=rs(t,e,{eventType:t,messageId:n,confirmedAssistantMessageId:s?.confirmedAssistantMessageId||"",confirmationSource:s?.confirmationSource||"none",skipReasonDetailed:s?.skipReasonDetailed||"speculative_session_only",isSpeculativeSession:!0}),o=s?.reason||w.SPECULATIVE_FALLBACK_WITHOUT_MESSAGE,a=s?.skipReasonDetailed||"speculative_session_only";return C("info","\u8BB0\u5F55 speculative session\uFF0C\u672A\u8FDB\u5165\u6267\u884C\u8C03\u5EA6",{eventType:t,traceId:r?.traceId||"",sessionKey:r?.sessionKey||"",messageId:n,reason:o,detail:a}),xe({stage:"speculative_observed",eventType:t,traceId:r?.traceId||"",sessionKey:r?.sessionKey||"",messageId:n,reason:o,skipReasonDetailed:a,confirmedAssistantMessageId:s?.confirmedAssistantMessageId||"",confirmationSource:s?.confirmationSource||"none",isSpeculativeSession:!0,handledAt:Date.now()}),he(r,{phase:O.IGNORED,skipReason:o,skipReasonDetailed:a,confirmationSource:s?.confirmationSource||"none",confirmedAssistantMessageId:s?.confirmedAssistantMessageId||"",isSpeculativeSession:!0,completedAt:Date.now()}),ue(r,{phase:O.IGNORED,eventType:t,messageId:n,skipReason:o,skipReasonDetailed:a,confirmedAssistantMessageId:s?.confirmedAssistantMessageId||"",confirmationSource:s?.confirmationSource||"none",isSpeculativeSession:!0}),r}function sa(t,e,s=0,n={}){let r=J(n?.confirmedAssistantMessageId||n?.messageId||tt(e,t));if(!r)return wt(t,e,{...n,reason:n?.reason||w.NO_CONFIRMED_ASSISTANT_MESSAGE,skipReasonDetailed:n?.skipReasonDetailed||"missing_confirmed_message_identity",confirmationSource:n?.confirmationSource||"none"});let o=typeof e=="object"&&e?{...e,messageId:r,confirmedAssistantMessageId:r,confirmationSource:n?.confirmationSource||e?.confirmationSource||""}:{messageId:r,confirmedAssistantMessageId:r,confirmationSource:n?.confirmationSource||""},a=rs(t,o,{...n,eventType:t,messageId:r,confirmedAssistantMessageId:r,confirmationSource:n?.confirmationSource||o.confirmationSource||"",isSpeculativeSession:!1}),i=Number.isFinite(s)?Math.max(0,s):De().debounceMs,l=a?.sessionKey||`message::${r}`,c=_.pendingMessageTimers.get(l);c&&clearTimeout(c),he(a,{phase:O.SCHEDULED,messageId:r,confirmedAssistantMessageId:r,confirmationSource:n?.confirmationSource||o.confirmationSource||"",isSpeculativeSession:!1,scheduledAt:Date.now()}),ue(a,{phase:O.SCHEDULED,eventType:t,messageId:r,confirmedAssistantMessageId:r,confirmationSource:n?.confirmationSource||o.confirmationSource||"",isSpeculativeSession:!1}),xe({stage:"scheduled",eventType:t,traceId:a?.traceId||"",sessionKey:a?.sessionKey||"",messageId:r,confirmedAssistantMessageId:r,confirmationSource:n?.confirmationSource||o.confirmationSource||"",isSpeculativeSession:!1,scheduledDelayMs:i}),C("info","\u5DF2\u8C03\u5EA6\u786E\u8BA4\u540E\u7684\u81EA\u52A8\u89E6\u53D1",{eventType:t,messageId:r,confirmationSource:n?.confirmationSource||o.confirmationSource||"",delayMs:i});let u=setTimeout(async()=>{_.pendingMessageTimers.delete(l),he(a,{phase:O.DISPATCHING,confirmationSource:n?.confirmationSource||o.confirmationSource||"",confirmedAssistantMessageId:r,isSpeculativeSession:!1}),ue(a,{phase:O.DISPATCHING,eventType:t,messageId:r,confirmedAssistantMessageId:r,confirmationSource:n?.confirmationSource||o.confirmationSource||"",isSpeculativeSession:!1}),xe({stage:"dispatching",eventType:t,traceId:a?.traceId||"",sessionKey:a?.sessionKey||"",messageId:r,confirmedAssistantMessageId:r,confirmationSource:n?.confirmationSource||o.confirmationSource||"",isSpeculativeSession:!1,scheduledDelayMs:i}),await ca(t,o)},i);return _.pendingMessageTimers.set(l,u),a}function hn(t){let e=t?.chatId||"chat_default",s=t?.messageId===void 0||t?.messageId===null||t?.messageId===""?"latest":String(t.messageId);return`${e}::${s}`}function la(t,e){return e?.triggerEvent==="MANUAL"?t.output?.mode===Et.POST_RESPONSE_API?Ut.MANUAL_POST_RESPONSE_API:Ut.MANUAL_COMPATIBILITY:Ut.AUTO_POST_RESPONSE_API}async function ca(t,e){k(`${t}\u89E6\u53D1:`,e);let s=typeof e=="object"&&e?String(e?.confirmationSource||"").trim():"";C("info","\u5F00\u59CB\u5904\u7406\u81EA\u52A8\u89E6\u53D1",{eventType:t,incomingMessageId:tt(e,t),confirmationSource:s});let n=nc(E.GENERATION_ENDED),r=n.map(g=>g.id),o=zl(),a=tt(e,t),i=J((typeof e=="object"&&e?e?.confirmedAssistantMessageId:"")||a),l=rs(t,e,{eventType:t,messageId:a,confirmedAssistantMessageId:i,confirmationSource:s,candidateToolIds:r});if(he(l,{phase:O.HANDLING,handledAt:Date.now(),confirmedAssistantMessageId:i,confirmationSource:s,isSpeculativeSession:!1,candidateToolIds:r}),ue(l,{phase:O.HANDLING,eventType:t,messageId:a,confirmedAssistantMessageId:i,confirmationSource:s,isSpeculativeSession:!1,candidateToolIds:r}),xe({stage:"handling",eventType:t,traceId:l?.traceId||"",sessionKey:l?.sessionKey||"",messageId:a,confirmedAssistantMessageId:i,confirmationSource:s,isSpeculativeSession:!1,candidateToolIds:r,handledAt:Date.now()}),aa()&&!Dr()){C("warn","\u5F53\u524D\u5904\u4E8E\u5BBF\u4E3B UI \u8FC7\u6E21\u5B88\u536B\u7A97\u53E3\uFF0C\u81EA\u52A8\u89E6\u53D1\u76F4\u63A5\u5FFD\u7565",{eventType:t,candidateToolIds:r,uiTransitionGuardUntil:A.gateState.uiTransitionGuardUntil,lastUiTransitionSource:A.gateState.lastUiTransitionSource||""}),Tt({triggerEvent:t,traceId:l?.traceId||"",sessionKey:l?.sessionKey||"",messageId:a,selectedToolIds:r,skipReason:w.UNRELATED_UI_EVENT,skipReasonDetailed:"ui_transition_guard_active",confirmedAssistantMessageId:i,confirmationSource:s,lockedAiMessageId:a||""}),ss(n,{lastTriggerEvent:t,lastMessageKey:"",lastSkipReason:w.UNRELATED_UI_EVENT,lastExecutionPath:"",lastWritebackStatus:q.NOT_APPLICABLE,lastFailureStage:""}),xe({stage:"ignored_ui_transition_guard",eventType:t,traceId:l?.traceId||"",sessionKey:l?.sessionKey||"",messageId:a,reason:w.UNRELATED_UI_EVENT,skipReasonDetailed:"ui_transition_guard_active",confirmedAssistantMessageId:i,confirmationSource:s,candidateToolIds:r,handledAt:Date.now()}),he(l,{phase:O.IGNORED,skipReason:w.UNRELATED_UI_EVENT,skipReasonDetailed:"ui_transition_guard_active",confirmedAssistantMessageId:i,confirmationSource:s,completedAt:Date.now(),candidateToolIds:r}),ue(l,{phase:O.IGNORED,eventType:t,messageId:a,skipReason:w.UNRELATED_UI_EVENT,skipReasonDetailed:"ui_transition_guard_active",confirmedAssistantMessageId:i,confirmationSource:s,candidateToolIds:r}),Lt(n,{traceId:l?.traceId||"",eventType:t,messageId:a,messageKey:"",skipReason:w.UNRELATED_UI_EVENT,executionPath:"",writebackStatus:q.NOT_APPLICABLE,failureStage:""});return}if(A.gateState.lastGenerationDryRun){C("warn","\u5F53\u524D generation \u4E3A dryRun\uFF0C\u81EA\u52A8\u89E6\u53D1\u76F4\u63A5\u963B\u65AD",{eventType:t,candidateToolIds:r,generationTraceId:A.gateState.lastGenerationTraceId||""}),Tt({triggerEvent:t,traceId:l?.traceId||"",sessionKey:l?.sessionKey||"",messageId:a,selectedToolIds:r,skipReason:w.DRY_RUN_GENERATION,skipReasonDetailed:"dry_run_generation",confirmedAssistantMessageId:i,confirmationSource:s,lockedAiMessageId:a||""}),ss(n,{lastTriggerEvent:t,lastMessageKey:"",lastSkipReason:w.DRY_RUN_GENERATION,lastExecutionPath:"",lastWritebackStatus:q.NOT_APPLICABLE,lastFailureStage:""}),xe({stage:"skipped",eventType:t,traceId:l?.traceId||"",sessionKey:l?.sessionKey||"",messageId:a,reason:w.DRY_RUN_GENERATION,skipReasonDetailed:"dry_run_generation",confirmedAssistantMessageId:i,confirmationSource:s,candidateToolIds:r,handledAt:Date.now()}),he(l,{phase:O.SKIPPED,skipReason:w.DRY_RUN_GENERATION,skipReasonDetailed:"dry_run_generation",confirmedAssistantMessageId:i,confirmationSource:s,completedAt:Date.now(),candidateToolIds:r}),ue(l,{phase:O.SKIPPED,eventType:t,messageId:a,skipReason:w.DRY_RUN_GENERATION,skipReasonDetailed:"dry_run_generation",confirmedAssistantMessageId:i,confirmationSource:s,candidateToolIds:r}),Lt(n,{traceId:l?.traceId||"",eventType:t,messageId:a,messageKey:"",skipReason:w.DRY_RUN_GENERATION,executionPath:"",writebackStatus:q.NOT_APPLICABLE,failureStage:""});return}if(o.skip){C("warn","\u6839\u636E\u76D1\u542C\u5668\u8BBE\u7F6E\u8DF3\u8FC7\u81EA\u52A8\u89E6\u53D1",{eventType:t,reason:o.reason,listenerSettings:o.listenerSettings,candidateToolIds:r}),Tt({triggerEvent:t,traceId:l?.traceId||"",sessionKey:l?.sessionKey||"",messageId:a,selectedToolIds:r,skipReason:o.reason,skipReasonDetailed:`listener_setting_${o.reason}`,confirmedAssistantMessageId:i,confirmationSource:s,lockedAiMessageId:a||""}),ss(n,{lastTriggerEvent:t,lastMessageKey:"",lastSkipReason:o.reason,lastExecutionPath:"",lastWritebackStatus:q.NOT_APPLICABLE,lastFailureStage:""}),xe({stage:"skipped",eventType:t,traceId:l?.traceId||"",sessionKey:l?.sessionKey||"",messageId:a,reason:o.reason,skipReasonDetailed:`listener_setting_${o.reason}`,confirmedAssistantMessageId:i,confirmationSource:s,candidateToolIds:r,handledAt:Date.now()}),he(l,{phase:O.SKIPPED,skipReason:o.reason,skipReasonDetailed:`listener_setting_${o.reason}`,confirmedAssistantMessageId:i,confirmationSource:s,completedAt:Date.now(),candidateToolIds:r}),ue(l,{phase:O.SKIPPED,eventType:t,messageId:a,skipReason:o.reason,skipReasonDetailed:`listener_setting_${o.reason}`,confirmedAssistantMessageId:i,confirmationSource:s,candidateToolIds:r}),Lt(n,{traceId:l?.traceId||"",eventType:t,messageId:a,messageKey:"",skipReason:o.reason,executionPath:"",writebackStatus:q.NOT_APPLICABLE,failureStage:""});return}if(o.listenerSettings.ignoreQuietGeneration&&Ml(A.gateState.lastGenerationType,A.gateState.lastGenerationParams,A.gateState.lastGenerationDryRun)){k("\u68C0\u6D4B\u5230 quiet / dryRun \u751F\u6210\uFF0C\u8DF3\u8FC7\u5DE5\u5177\u81EA\u52A8\u6267\u884C"),C("warn","\u68C0\u6D4B\u5230 quiet/dryRun\uFF0C\u8DF3\u8FC7\u81EA\u52A8\u89E6\u53D1",{eventType:t,candidateToolIds:r}),Tt({triggerEvent:t,traceId:l?.traceId||"",sessionKey:l?.sessionKey||"",selectedToolIds:r,skipReason:w.QUIET_GENERATION,skipReasonDetailed:"quiet_generation_listener_filter",confirmedAssistantMessageId:i,confirmationSource:s}),ss(n,{lastTriggerEvent:t,lastMessageKey:"",lastSkipReason:w.QUIET_GENERATION,lastExecutionPath:"",lastWritebackStatus:q.NOT_APPLICABLE,lastFailureStage:""}),xe({stage:"skipped",eventType:t,traceId:l?.traceId||"",sessionKey:l?.sessionKey||"",messageId:a,reason:w.QUIET_GENERATION,skipReasonDetailed:"quiet_generation_listener_filter",confirmedAssistantMessageId:i,confirmationSource:s,candidateToolIds:r,handledAt:Date.now()}),he(l,{phase:O.SKIPPED,skipReason:w.QUIET_GENERATION,skipReasonDetailed:"quiet_generation_listener_filter",confirmedAssistantMessageId:i,confirmationSource:s,completedAt:Date.now(),candidateToolIds:r}),ue(l,{phase:O.SKIPPED,eventType:t,messageId:a,skipReason:w.QUIET_GENERATION,skipReasonDetailed:"quiet_generation_listener_filter",confirmedAssistantMessageId:i,confirmationSource:s,candidateToolIds:r}),Lt(n,{traceId:l?.traceId||"",eventType:t,messageId:a,messageKey:"",skipReason:w.QUIET_GENERATION,executionPath:"",writebackStatus:q.NOT_APPLICABLE,failureStage:""});return}let c=await Gr({...typeof e=="object"&&e?e:{},triggerEvent:t,...a?{messageId:a}:{},...i?{confirmedAssistantMessageId:i}:{},...s?{confirmationSource:s}:{},traceId:l?.traceId||"",sessionKey:l?.sessionKey||""});c.traceId=l?.traceId||c.traceId||_s("exec"),c.sessionKey=l?.sessionKey||c.sessionKey||"";let u=Ur(c.chatId,c.messageId,t);if(Ql(l,u),he(l,{messageId:c.messageId||a,messageKey:hn(c),confirmedAssistantMessageId:c.confirmedAssistantMessageId||i,confirmationSource:c.confirmationSource||s,sourceMessageLocked:!!c.messageId}),!c?.lastAiMessage){k(`${t} \u540E\u672A\u8BFB\u53D6\u5230\u6700\u65B0 AI \u56DE\u590D\uFF0C\u8DF3\u8FC7\u5DE5\u5177\u6267\u884C`),C("warn","\u672A\u8BFB\u53D6\u5230\u6709\u6548 AI \u56DE\u590D\uFF0C\u81EA\u52A8\u89E6\u53D1\u4E2D\u6B62",{eventType:t,preferredMessageId:a,candidateToolIds:r});let g=hn(c||{});Tt({triggerEvent:t,traceId:l?.traceId||"",sessionKey:l?.sessionKey||"",messageId:c?.messageId||"",messageKey:g,selectedToolIds:r,skipReason:w.MISSING_AI_MESSAGE,skipReasonDetailed:"missing_confirmed_assistant_content_in_context",confirmedAssistantMessageId:c?.confirmedAssistantMessageId||i,confirmationSource:c?.confirmationSource||s,lockedAiMessageId:c?.messageId||""}),ss(n,{lastTriggerEvent:t,lastMessageKey:g,lastSkipReason:w.MISSING_AI_MESSAGE,lastExecutionPath:"",lastWritebackStatus:q.NOT_APPLICABLE,lastFailureStage:""}),xe({stage:"skipped",eventType:t,traceId:l?.traceId||"",sessionKey:l?.sessionKey||"",messageId:c?.messageId||a,messageKey:g,reason:w.MISSING_AI_MESSAGE,skipReasonDetailed:"missing_confirmed_assistant_content_in_context",confirmedAssistantMessageId:c?.confirmedAssistantMessageId||i,confirmationSource:c?.confirmationSource||s,candidateToolIds:r,handledAt:Date.now()}),he(l,{phase:O.SKIPPED,skipReason:w.MISSING_AI_MESSAGE,skipReasonDetailed:"missing_confirmed_assistant_content_in_context",messageKey:g,confirmedAssistantMessageId:c?.confirmedAssistantMessageId||i,confirmationSource:c?.confirmationSource||s,completedAt:Date.now(),candidateToolIds:r}),ue(l,{phase:O.SKIPPED,eventType:t,messageId:c?.messageId||a,messageKey:g,skipReason:w.MISSING_AI_MESSAGE,skipReasonDetailed:"missing_confirmed_assistant_content_in_context",confirmedAssistantMessageId:c?.confirmedAssistantMessageId||i,confirmationSource:c?.confirmationSource||s,candidateToolIds:r}),Lt(n,{traceId:l?.traceId||"",eventType:t,messageId:c?.messageId||a,messageKey:g,skipReason:w.MISSING_AI_MESSAGE,executionPath:"",writebackStatus:q.NOT_APPLICABLE,failureStage:""});return}let d=hn(c);if(_.lastHandledMessageKey===d){ec(d)&&(k(`\u68C0\u6D4B\u5230\u91CD\u590D\u81EA\u52A8\u89E6\u53D1\uFF0C\u8DF3\u8FC7: ${d}`),C("warn","\u547D\u4E2D\u81EA\u52A8\u53BB\u91CD\uFF0C\u8DF3\u8FC7\u6267\u884C",{eventType:t,messageKey:d,candidateToolIds:r}),Tt({triggerEvent:t,traceId:l?.traceId||"",sessionKey:l?.sessionKey||"",messageId:c?.messageId||"",messageKey:d,selectedToolIds:r,skipReason:w.DUPLICATE_MESSAGE,skipReasonDetailed:"message_key_already_handled",confirmedAssistantMessageId:c?.confirmedAssistantMessageId||i,confirmationSource:c?.confirmationSource||s,lockedAiMessageId:c?.messageId||""}),ss(n,{lastTriggerEvent:t,lastMessageKey:d,lastSkipReason:w.DUPLICATE_MESSAGE,lastExecutionPath:"",lastWritebackStatus:q.NOT_APPLICABLE,lastFailureStage:""}),xe({stage:"skipped",eventType:t,traceId:l?.traceId||"",sessionKey:l?.sessionKey||"",messageId:c?.messageId||a,messageKey:d,reason:w.DUPLICATE_MESSAGE,skipReasonDetailed:"message_key_already_handled",confirmedAssistantMessageId:c?.confirmedAssistantMessageId||i,confirmationSource:c?.confirmationSource||s,candidateToolIds:r,handledAt:Date.now()}),he(l,{phase:O.SKIPPED,skipReason:w.DUPLICATE_MESSAGE,skipReasonDetailed:"message_key_already_handled",messageKey:d,confirmedAssistantMessageId:c?.confirmedAssistantMessageId||i,confirmationSource:c?.confirmationSource||s,completedAt:Date.now(),candidateToolIds:r}),ue(l,{phase:O.SKIPPED,eventType:t,messageId:c?.messageId||a,messageKey:d,skipReason:w.DUPLICATE_MESSAGE,skipReasonDetailed:"message_key_already_handled",confirmedAssistantMessageId:c?.confirmedAssistantMessageId||i,confirmationSource:c?.confirmationSource||s,candidateToolIds:r}),Lt(n,{traceId:l?.traceId||"",eventType:t,messageId:c?.messageId||a,messageKey:d,skipReason:w.DUPLICATE_MESSAGE,executionPath:"",writebackStatus:q.NOT_APPLICABLE,failureStage:""}));return}let h=n;if(h.length===0){k("\u6CA1\u6709\u9700\u8981\u6267\u884C\u7684\u5DE5\u5177"),C("warn","\u5F53\u524D\u4E8B\u4EF6\u672A\u547D\u4E2D\u4EFB\u4F55\u53EF\u6267\u884C\u5DE5\u5177",{eventType:t,messageKey:d,candidateToolIds:r}),Tt({triggerEvent:t,traceId:l?.traceId||"",sessionKey:l?.sessionKey||"",messageId:c?.messageId||"",messageKey:d,selectedToolIds:[],skipReason:w.NO_ELIGIBLE_TOOLS,skipReasonDetailed:"no_tools_configured_for_auto_post_response",confirmedAssistantMessageId:c?.confirmedAssistantMessageId||i,confirmationSource:c?.confirmationSource||s,lockedAiMessageId:c?.messageId||""}),xe({stage:"skipped",eventType:t,traceId:l?.traceId||"",sessionKey:l?.sessionKey||"",messageId:c?.messageId||a,messageKey:d,reason:w.NO_ELIGIBLE_TOOLS,skipReasonDetailed:"no_tools_configured_for_auto_post_response",confirmedAssistantMessageId:c?.confirmedAssistantMessageId||i,confirmationSource:c?.confirmationSource||s,candidateToolIds:[],handledAt:Date.now()}),he(l,{phase:O.SKIPPED,skipReason:w.NO_ELIGIBLE_TOOLS,skipReasonDetailed:"no_tools_configured_for_auto_post_response",messageKey:d,confirmedAssistantMessageId:c?.confirmedAssistantMessageId||i,confirmationSource:c?.confirmationSource||s,completedAt:Date.now(),candidateToolIds:[]}),ue(l,{phase:O.SKIPPED,eventType:t,messageId:c?.messageId||a,messageKey:d,skipReason:w.NO_ELIGIBLE_TOOLS,skipReasonDetailed:"no_tools_configured_for_auto_post_response",confirmedAssistantMessageId:c?.confirmedAssistantMessageId||i,confirmationSource:c?.confirmationSource||s,candidateToolIds:[]});return}_.lastHandledMessageKey=d,_.lastDuplicateMessageKey="",_.lastDuplicateMessageAt=0,c.messageKey=d,Tt({triggerEvent:t,traceId:l?.traceId||"",sessionKey:l?.sessionKey||"",messageId:c?.messageId||"",messageKey:d,selectedToolIds:h.map(g=>g.id),skipReason:"",confirmedAssistantMessageId:c?.confirmedAssistantMessageId||i,confirmationSource:c?.confirmationSource||s,lockedAiMessageId:c?.messageId||""}),k(`\u9700\u8981\u6267\u884C ${h.length} \u4E2A\u5DE5\u5177:`,h.map(g=>g.id)),C("info","\u81EA\u52A8\u89E6\u53D1\u547D\u4E2D\u5DE5\u5177",{eventType:t,messageKey:d,toolIds:h.map(g=>g.id)}),Ve("info",`\u68C0\u6D4B\u5230 AI \u56DE\u590D\uFF0C\u5F00\u59CB\u81EA\u52A8\u6267\u884C ${h.length} \u4E2A\u5DE5\u5177`,{duration:2400,noticeId:"yyt-tool-batch-start"}),he(l,{messageKey:d,candidateToolIds:h.map(g=>g.id),executionPathIds:[],confirmedAssistantMessageId:c?.confirmedAssistantMessageId||i,confirmationSource:c?.confirmationSource||s,phase:O.DISPATCHING}),ue(l,{phase:O.DISPATCHING,eventType:t,messageId:c?.messageId||a,messageKey:d,confirmedAssistantMessageId:c?.confirmedAssistantMessageId||i,confirmationSource:c?.confirmationSource||s,candidateToolIds:h.map(g=>g.id)}),Lt(h,{traceId:l?.traceId||"",eventType:t,messageId:c?.messageId||a,messageKey:d,skipReason:"",executionPath:Ut.AUTO_POST_RESPONSE_API,writebackStatus:"",failureStage:""});for(let g of h)try{let b=await ua(g,c),G=la(g,c);l.executionPathIds.includes(G)||l.executionPathIds.push(G),Zl(g.id,{traceId:l?.traceId||"",eventType:t,messageId:c?.messageId||a,messageKey:d,executionPath:G,writebackStatus:b?.result?.meta?.writebackStatus||b?.meta?.writebackStatus||q.NOT_APPLICABLE,failureStage:b?.result?.meta?.failureStage||b?.meta?.failureStage||"",success:!!b?.success}),b.success?(k(`\u5DE5\u5177 ${g.id} \u6267\u884C\u6210\u529F`),P.emit(I.TOOL_EXECUTED,{toolId:g.id,result:b.result||b.data||b})):k(`\u5DE5\u5177 ${g.id} \u6267\u884C\u5931\u8D25:`,b.error)}catch(b){console.error(`[ToolTrigger] \u5DE5\u5177\u6267\u884C\u5931\u8D25: ${g.id}`,b)}_.lastExecutionContext=c,xe({stage:"completed",eventType:t,traceId:l?.traceId||"",sessionKey:l?.sessionKey||"",messageId:c?.messageId||a,messageKey:d,confirmedAssistantMessageId:c?.confirmedAssistantMessageId||i,confirmationSource:c?.confirmationSource||s,candidateToolIds:h.map(g=>g.id),handledAt:Date.now()}),he(l,{phase:O.COMPLETED,messageKey:d,confirmedAssistantMessageId:c?.confirmedAssistantMessageId||i,confirmationSource:c?.confirmationSource||s,completedAt:Date.now(),candidateToolIds:h.map(g=>g.id)}),ue(l,{phase:O.COMPLETED,eventType:t,messageId:c?.messageId||a,messageKey:d,confirmedAssistantMessageId:c?.confirmedAssistantMessageId||i,confirmationSource:c?.confirmationSource||s,candidateToolIds:h.map(g=>g.id),executionPathIds:[...l.executionPathIds||[]]})}async function tc(t,e,s){return s||t.output?.mode===Et.POST_RESPONSE_API?ts.runToolPostResponse(t,e):rn(t.id,e)}function da(){if(_.initialized){k("\u5DE5\u5177\u89E6\u53D1\u7BA1\u7406\u5668\u5DF2\u521D\u59CB\u5316");return}sc(),_.initialized=!0,k("\u5DE5\u5177\u89E6\u53D1\u7BA1\u7406\u5668\u5DF2\u521D\u59CB\u5316"),P.emit(I.TOOL_TRIGGER_INITIALIZED)}function sc(){let t=et(E.GENERATION_ENDED,async n=>{let r=tt(n,E.GENERATION_ENDED),o=rs(E.GENERATION_ENDED,n,{eventType:E.GENERATION_ENDED,messageId:r});xe({stage:"received",eventType:E.GENERATION_ENDED,traceId:o?.traceId||"",sessionKey:o?.sessionKey||"",messageId:r,receivedAt:Date.now()}),ue(o,{phase:O.RECEIVED,eventType:E.GENERATION_ENDED,messageId:r});let a=Qo();if(!a.eligible){wt(E.GENERATION_ENDED,n,{messageId:r,reason:a.reason,skipReasonDetailed:a.detail,confirmationSource:"none"});return}let i=await mn(r,{retries:r?3:8,retryDelayMs:r?120:260}),l=J(i?.sourceId);if(!l){wt(E.GENERATION_ENDED,n,{messageId:r,reason:w.NO_CONFIRMED_ASSISTANT_MESSAGE,skipReasonDetailed:"missing_new_assistant_message_after_generation",confirmationSource:"none"});return}await ca(E.GENERATION_ENDED,{...typeof n=="object"&&n?n:{},messageId:l,confirmedAssistantMessageId:l,confirmationSource:"generation_ended"})}),e=et(E.GENERATION_AFTER_COMMANDS,async n=>{let r=tt(n,E.GENERATION_AFTER_COMMANDS),{debounceMs:o}=De(),a=rs(E.GENERATION_AFTER_COMMANDS,n,{eventType:E.GENERATION_AFTER_COMMANDS,messageId:r});if(xe({stage:"received",eventType:E.GENERATION_AFTER_COMMANDS,traceId:a?.traceId||"",sessionKey:a?.sessionKey||"",messageId:r,receivedAt:Date.now(),scheduledDelayMs:o}),ue(a,{phase:O.RECEIVED,eventType:E.GENERATION_AFTER_COMMANDS,messageId:r}),!De().useGenerationAfterCommandsFallback){he(a,{phase:O.IGNORED,skipReason:"generation_after_commands_fallback_disabled",completedAt:Date.now()}),ue(a,{phase:O.IGNORED,eventType:E.GENERATION_AFTER_COMMANDS,messageId:r,skipReason:"generation_after_commands_fallback_disabled"});return}let i=Qo();if(!r){wt(E.GENERATION_AFTER_COMMANDS,n,{reason:w.SPECULATIVE_FALLBACK_WITHOUT_MESSAGE,skipReasonDetailed:i.eligible?"generation_after_commands_without_message_identity":i.detail,confirmationSource:"none"});return}if(!i.eligible){wt(E.GENERATION_AFTER_COMMANDS,n,{messageId:r,reason:i.reason,skipReasonDetailed:i.detail,confirmationSource:"none"});return}let l=await mn(r,{retries:2,retryDelayMs:120}),c=J(l?.sourceId);if(!c){wt(E.GENERATION_AFTER_COMMANDS,n,{messageId:r,reason:w.SPECULATIVE_FALLBACK_WITHOUT_MESSAGE,skipReasonDetailed:"generation_after_commands_message_not_confirmed",confirmationSource:"none"});return}sa(E.GENERATION_AFTER_COMMANDS,n,o,{messageId:r,confirmedAssistantMessageId:c,confirmationSource:"generation_after_commands"})}),s=et(E.MESSAGE_RECEIVED,async n=>{let r=tt(n,E.MESSAGE_RECEIVED),o=r?await Ol(r,{retries:3,retryDelayMs:120}):null,a=o?.message||null,i=a?Nr(a):"",l=o?J(Rr(a,o.index)):"",c=r||l,{debounceMs:u}=De(),d=rs(E.MESSAGE_RECEIVED,n,{eventType:E.MESSAGE_RECEIVED,messageId:c,messageRole:i});if(!r){C("info","MESSAGE_RECEIVED \u7F3A\u5C11\u6D88\u606F\u8EAB\u4EFD\uFF0C\u5224\u5B9A\u4E3A\u5BBF\u4E3B UI \u5E72\u6270\u4E8B\u4EF6\uFF0C\u8DF3\u8FC7",{rawEventData:n??null}),xe({stage:"ignored_ui_side_effect",eventType:E.MESSAGE_RECEIVED,traceId:d?.traceId||"",sessionKey:d?.sessionKey||"",messageId:"",messageRole:i,reason:w.UNRELATED_UI_EVENT,handledAt:Date.now()}),he(d,{phase:O.IGNORED,skipReason:w.UNRELATED_UI_EVENT,completedAt:Date.now(),messageRole:i}),ue(d,{phase:O.IGNORED,eventType:E.MESSAGE_RECEIVED,messageId:"",messageRole:i,skipReason:w.UNRELATED_UI_EVENT});return}if(xe({stage:"received",eventType:E.MESSAGE_RECEIVED,traceId:d?.traceId||"",sessionKey:d?.sessionKey||"",messageId:c,messageRole:i,receivedAt:Date.now(),scheduledDelayMs:u}),ue(d,{phase:O.RECEIVED,eventType:E.MESSAGE_RECEIVED,messageId:c,messageRole:i}),!De().useMessageReceivedFallback){he(d,{phase:O.IGNORED,skipReason:"message_received_fallback_disabled",completedAt:Date.now(),messageRole:i}),ue(d,{phase:O.IGNORED,eventType:E.MESSAGE_RECEIVED,messageId:c,messageRole:i,skipReason:"message_received_fallback_disabled"});return}if(!o){wt(E.MESSAGE_RECEIVED,n,{messageId:r,reason:w.NO_CONFIRMED_ASSISTANT_MESSAGE,skipReasonDetailed:"message_received_identity_not_resolved",confirmationSource:"none"});return}if(a&&i!=="assistant"){C("info","MESSAGE_RECEIVED \u547D\u4E2D\u975E AI \u6D88\u606F\uFF0C\u8DF3\u8FC7\u81EA\u52A8\u89E6\u53D1\u8C03\u5EA6",{messageId:c,messageRole:i}),xe({stage:"ignored_non_assistant",eventType:E.MESSAGE_RECEIVED,traceId:d?.traceId||"",sessionKey:d?.sessionKey||"",messageId:c,messageRole:i,reason:w.NON_ASSISTANT_MESSAGE,handledAt:Date.now()}),he(d,{phase:O.IGNORED,skipReason:w.NON_ASSISTANT_MESSAGE,completedAt:Date.now(),messageRole:i}),ue(d,{phase:O.IGNORED,eventType:E.MESSAGE_RECEIVED,messageId:c,messageRole:i,skipReason:w.NON_ASSISTANT_MESSAGE});return}let h=await mn(c,{retries:3,retryDelayMs:120}),g=J(h?.sourceId);if(!g){wt(E.MESSAGE_RECEIVED,n,{messageId:c,reason:w.NO_CONFIRMED_ASSISTANT_MESSAGE,skipReasonDetailed:"message_received_not_confirmed_as_new_assistant",confirmationSource:"none"});return}sa(E.MESSAGE_RECEIVED,n,u,{messageId:c,confirmedAssistantMessageId:g,confirmationSource:"message_received"})});_.listeners.set(E.GENERATION_ENDED,t),_.listeners.set(E.GENERATION_AFTER_COMMANDS,e),_.listeners.set(E.MESSAGE_RECEIVED,s)}async function Gr(t){let e=await Lr(),s=pt(),n=s?.getContext?.()||null,r=t?.triggerEvent||"GENERATION_ENDED",o=J(t?.confirmedAssistantMessageId||tt(t,r)),a=String(t?.confirmationSource||"").trim(),i=r==="MANUAL"||r==="MANUAL_PREVIEW",l=null,c=J(o);i||(l=await mn(c,{retries:c?3:8,retryDelayMs:c?120:260}),l&&(c=J(l.sourceId)));let u=Nl(r,t,c)||!!c,d=await Al({preferredMessageId:c||null,retries:i||c?2:0,retryDelayMs:120,lockToMessageId:u}),h=d.messages||[],g=d.lastUserMessage,b=d.lastAiMessage;i||(l?J(b?.sourceId)!==c&&(b=l):b=null);let G=c||J(b?.sourceId)||"";return{triggeredAt:Date.now(),triggerEvent:r,traceId:t?.traceId||"",sessionKey:t?.sessionKey||"",confirmationSource:a,confirmedAssistantMessageId:G,chatId:En(s,n,e),messageId:G,lastAiMessage:b?.content||"",userMessage:g?.content||A.gateState.lastUserMessageText||"",chatMessages:h,input:{userMessage:g?.content||A.gateState.lastUserMessageText||"",lastAiMessage:b?.content||"",extractedContent:"",previousToolOutput:"",context:{character:e?.name||"",chatLength:h.length||0}},config:{},status:"pending"}}function nc(t){return vr(t).filter(s=>ts.shouldRunPostResponse(s))}function fn(t,e){try{yr(t,e)}catch(s){console.warn("[ToolTrigger] \u66F4\u65B0\u5DE5\u5177\u8FD0\u884C\u65F6\u72B6\u6001\u5931\u8D25:",t,s)}}async function ua(t,e){let s=Date.now(),n=t.id,r=e?.triggerEvent==="MANUAL",o=`yyt-tool-run-${n}`,a=la(t,e),i=e?.messageKey||hn(e||{});fn(n,{lastStatus:"running",lastError:"",lastDurationMs:0,lastTraceId:e?.traceId||"",lastTriggerAt:s,lastTriggerEvent:e?.triggerEvent||E.GENERATION_ENDED,lastMessageKey:i,lastSkipReason:"",lastExecutionPath:a,lastWritebackStatus:"",lastFailureStage:""}),P.emit(I.TOOL_EXECUTION_REQUESTED,{toolId:n,traceId:e?.traceId||"",triggerEvent:e?.triggerEvent||"GENERATION_ENDED",context:e}),Ve("info",`${r?"\u6B63\u5728\u624B\u52A8\u6267\u884C":"\u5DF2\u68C0\u6D4B\u5230 AI \u56DE\u590D\uFF0C\u6B63\u5728\u81EA\u52A8\u6267\u884C"} ${t.name}`,{sticky:!0,noticeId:o}),C("info","\u5F00\u59CB\u6267\u884C\u5DE5\u5177",{toolId:n,toolName:t.name,triggerEvent:e?.triggerEvent,executionPath:a,messageKey:i});try{let l=await tc(t,e,r),c=Date.now()-s;if(l?.success){let h=ne(n);fn(n,{lastStatus:"success",lastError:"",lastDurationMs:c,lastTraceId:e?.traceId||"",successCount:(h?.runtime?.successCount||0)+1,lastTriggerAt:s,lastTriggerEvent:e?.triggerEvent||E.GENERATION_ENDED,lastMessageKey:i,lastSkipReason:"",lastExecutionPath:a,lastWritebackStatus:l?.meta?.writebackStatus||q.NOT_APPLICABLE,lastFailureStage:l?.meta?.failureStage||""});let g=r?`${t.name} \u624B\u52A8\u6267\u884C\u5B8C\u6210`:`\u5DF2\u76D1\u542C AI \u56DE\u590D\u5E76\u6267\u884C ${t.name}`;return m("success",g),Ve("success",g,{duration:3200,noticeId:o}),C("info","\u5DE5\u5177\u6267\u884C\u6210\u529F",{toolId:n,traceId:e?.traceId||"",executionPath:a,duration:c,writebackStatus:l?.meta?.writebackStatus||q.NOT_APPLICABLE}),{success:!0,duration:c,result:l}}let u=ne(n),d=l?.error||"\u5DE5\u5177\u6267\u884C\u5931\u8D25";return fn(n,{lastStatus:"error",lastError:d,lastDurationMs:c,lastTraceId:e?.traceId||"",errorCount:(u?.runtime?.errorCount||0)+1,lastTriggerAt:s,lastTriggerEvent:e?.triggerEvent||E.GENERATION_ENDED,lastMessageKey:i,lastSkipReason:"",lastExecutionPath:a,lastWritebackStatus:l?.meta?.writebackStatus||q.NOT_APPLICABLE,lastFailureStage:l?.meta?.failureStage||(a===Ut.MANUAL_COMPATIBILITY?ze.COMPATIBILITY_EXECUTE:ze.UNKNOWN)}),m("error",`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${d}`),Ve("error",`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${d}`,{sticky:!0,noticeId:o}),C("error","\u5DE5\u5177\u6267\u884C\u5931\u8D25",{toolId:n,traceId:e?.traceId||"",executionPath:a,duration:c,error:d,failureStage:l?.meta?.failureStage||""}),{success:!1,duration:c,error:d,result:l}}catch(l){let c=Date.now()-s,u=ne(n),d=l?.message||String(l);throw fn(n,{lastStatus:"error",lastError:d,lastDurationMs:c,lastTraceId:e?.traceId||"",errorCount:(u?.runtime?.errorCount||0)+1,lastTriggerAt:s,lastTriggerEvent:e?.triggerEvent||E.GENERATION_ENDED,lastMessageKey:i,lastSkipReason:"",lastExecutionPath:a,lastWritebackStatus:q.NOT_APPLICABLE,lastFailureStage:a===Ut.MANUAL_COMPATIBILITY?ze.COMPATIBILITY_EXECUTE:ze.UNKNOWN}),m("error",`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${d}`),Ve("error",`${t.name} \u6267\u884C\u5931\u8D25\uFF1A${d}`,{sticky:!0,noticeId:o}),C("error","\u5DE5\u5177\u6267\u884C\u629B\u51FA\u5F02\u5E38",{toolId:n,traceId:e?.traceId||"",executionPath:a,duration:c,error:d}),l}}async function Br(t){if(!t)return{success:!1,error:"\u7F3A\u5C11\u5DE5\u5177ID"};let e=ne(t);if(!e)return{success:!1,error:"\u5DE5\u5177\u4E0D\u5B58\u5728"};if(!e.enabled)return Xt(t,{lastTriggerAt:Date.now(),lastTriggerEvent:"MANUAL",lastMessageKey:"",lastSkipReason:w.TOOL_DISABLED,lastExecutionPath:"",lastWritebackStatus:q.NOT_APPLICABLE,lastFailureStage:""},{touchLastRunAt:!1,emitEvent:!1}),Ve("warning",`${e.name} \u672A\u542F\u7528\uFF0C\u65E0\u6CD5\u624B\u52A8\u6267\u884C`,{duration:2800,noticeId:`yyt-tool-run-${t}`}),{success:!1,error:"\u5DE5\u5177\u672A\u542F\u7528"};let s=await Gr({triggerEvent:"MANUAL"});return C("info","\u624B\u52A8\u6267\u884C\u5DE5\u5177",{toolId:t}),ua(e,s)}async function zr(t){if(!t)return{success:!1,error:"\u7F3A\u5C11\u5DE5\u5177ID"};let e=ne(t);if(!e)return{success:!1,error:"\u5DE5\u5177\u4E0D\u5B58\u5728"};let s=await Gr({triggerEvent:"MANUAL_PREVIEW"});return ts.previewExtraction(e,s)}function rc(){for(let t of _.pendingMessageTimers.values())clearTimeout(t);_.pendingMessageTimers.clear();for(let t of _.listeners.values())typeof t=="function"&&t();_.listeners.clear(),_.messageSessions.clear(),_.recentSessionHistory=[],_.initialized=!1,_.lastExecutionContext=null,_.lastHandledMessageKey="",_.lastAutoTriggerSnapshot=null,_.lastEventDebugSnapshot=null,_.lastDuplicateMessageKey="",_.lastDuplicateMessageAt=0,k("\u5DE5\u5177\u89E6\u53D1\u7BA1\u7406\u5668\u5DF2\u9500\u6BC1")}function oc(){return{initialized:_.initialized,listenersCount:_.listeners.size,activeSessionCount:_.messageSessions.size,recentSessionHistory:[..._.recentSessionHistory],lastExecutionContext:_.lastExecutionContext,lastAutoTriggerSnapshot:_.lastAutoTriggerSnapshot,lastEventDebugSnapshot:_.lastEventDebugSnapshot}}async function Mr(){if(A.isInitialized){k("\u89E6\u53D1\u6A21\u5757\u5DF2\u521D\u59CB\u5316"),C("info","\u89E6\u53D1\u6A21\u5757\u5DF2\u521D\u59CB\u5316\uFF0C\u8DF3\u8FC7\u91CD\u590D\u521D\u59CB\u5316");return}let t=pt();if(!t){k("\u65E0\u6CD5\u83B7\u53D6SillyTavern API\uFF0C\u5EF6\u8FDF\u521D\u59CB\u5316"),C("warn","\u7B49\u5F85\u9152\u9986\u4E8B\u4EF6\u6E90\u5C31\u7EEA\u540E\u518D\u521D\u59CB\u5316\u89E6\u53D1\u6A21\u5757",{hasApi:!!t,hasEventSource:!1,hasEventTypes:!1}),setTimeout(Mr,1e3);return}let e=await kl(),s=e?.eventSource||vn(),n=e?.eventTypes||Sn();if(!s){k("\u65E0\u6CD5\u83B7\u53D6SillyTavern\u4E8B\u4EF6\u6E90\uFF0C\u5EF6\u8FDF\u521D\u59CB\u5316"),C("warn","\u7B49\u5F85\u9152\u9986\u4E8B\u4EF6\u6E90\u5C31\u7EEA\u540E\u518D\u521D\u59CB\u5316\u89E6\u53D1\u6A21\u5757",{hasApi:!!t,hasEventSource:!!s,hasEventTypes:!!n,importError:fe.importError?.message||""}),setTimeout(Mr,1e3);return}C("info","\u5F00\u59CB\u521D\u59CB\u5316\u89E6\u53D1\u6A21\u5757",{hasApi:!!t,hasEventSource:!!s,hasEventTypes:!!n,listenerSettings:De()}),C("info","\u4F7F\u7528\u4E8B\u4EF6\u6E90",{source:e?.source||fe.source||"unknown"}),Il(),et(E.MESSAGE_SENT,async r=>{let a=(await Or({depth:10,includeAssistant:!1,includeSystem:!1}))?.messages?.filter(i=>i.role==="user").pop();ns({lastUserSendIntentAt:Date.now(),lastUserMessageId:r,lastUserMessageAt:Date.now(),lastUserMessageText:a?.content||A.gateState.lastUserMessageText||""}),k(`\u7528\u6237\u6D88\u606F\u5DF2\u53D1\u9001: ${r}`),C("info","\u8BB0\u5F55\u7528\u6237\u53D1\u9001\u610F\u56FE",{messageId:r,lastUserMessage:a?.content||""})}),et(E.GENERATION_STARTED,async(r,o,a)=>{let i=Date.now(),l=_s("generation"),c=kr(i),u=Math.max(Number(A.gateState.lastUserSendIntentAt)||0,Number(A.gateState.lastUserMessageAt)||0),d=await Ul({traceId:l,startedAt:i,type:r,params:o||null,dryRun:!!a,startedByUserIntent:c,userIntentDetectedAt:u});ns({lastGenerationTraceId:l,lastGenerationType:r,lastGenerationParams:o||null,lastGenerationDryRun:!!a,isGenerating:!0,lastGenerationBaseline:d}),k(`\u751F\u6210\u5F00\u59CB: ${r}`),C("info","\u6536\u5230\u751F\u6210\u5F00\u59CB\u4E8B\u4EF6",{type:r,dryRun:!!a,params:o||null,traceId:l,startedByUserIntent:c,baseline:d})}),et(E.GENERATION_ENDED,()=>{ns({lastGenerationAt:Date.now(),isGenerating:!1}),k("\u751F\u6210\u7ED3\u675F"),C("info","\u6536\u5230\u751F\u6210\u7ED3\u675F\u4E8B\u4EF6")}),et(E.CHAT_CHANGED,r=>{Zo(E.CHAT_CHANGED),ea("chat_changed"),C("info","\u6536\u5230\u804A\u5929\u5207\u6362\u4E8B\u4EF6",{data:r??null})}),et(E.CHAT_CREATED,r=>{Zo(E.CHAT_CREATED),ea("chat_created"),C("info","\u6536\u5230\u804A\u5929\u521B\u5EFA\u4E8B\u4EF6",{data:r??null})}),da(),A.isInitialized=!0,k("\u89E6\u53D1\u6A21\u5757\u521D\u59CB\u5316\u5B8C\u6210"),C("info","\u89E6\u53D1\u6A21\u5757\u521D\u59CB\u5316\u5B8C\u6210",{listenerSettings:De()})}function ac(t){A.debugMode=t}var E,A,El,fe,w,Ut,O,Tl,wl,Xo,_,jr=j(()=>{Se();Ss();Qt();Sr();_r();qe();E={MESSAGE_RECEIVED:"MESSAGE_RECEIVED",MESSAGE_SENT:"MESSAGE_SENT",MESSAGE_UPDATED:"MESSAGE_UPDATED",MESSAGE_DELETED:"MESSAGE_DELETED",GENERATION_STARTED:"GENERATION_STARTED",GENERATION_ENDED:"GENERATION_ENDED",GENERATION_AFTER_COMMANDS:"GENERATION_AFTER_COMMANDS",CHARACTER_LOADED:"CHARACTER_LOADED",CHARACTER_DELETED:"CHARACTER_DELETED",CHAT_CHANGED:"CHAT_CHANGED",CHAT_CREATED:"CHAT_CREATED",WORLDBOOK_UPDATED:"WORLDBOOK_UPDATED",EXTENSIONS_LOADED:"EXTENSIONS_LOADED",SETTINGS_LOADED:"SETTINGS_LOADED"},A={listeners:new Map,handlers:new Map,gateState:{lastUserSendIntentAt:0,lastUserMessageId:null,lastUserMessageText:"",lastUserMessageAt:0,lastGenerationTraceId:"",lastGenerationType:null,lastGenerationParams:null,lastGenerationDryRun:!1,lastGenerationAt:0,isGenerating:!1,lastGenerationBaseline:null,uiTransitionGuardUntil:0,lastUiTransitionAt:0,lastUiTransitionSource:""},isInitialized:!1,debugMode:!1},El="/script.js",fe={eventSource:null,eventTypes:null,source:"",scriptModule:null,loadingPromise:null,importError:null},w={LISTENER_DISABLED:"listener_disabled",QUIET_GENERATION:"quiet_generation",DRY_RUN_GENERATION:"dry_run_generation",IGNORED_AUTO_TRIGGER:"ignored_auto_trigger",UNRELATED_UI_EVENT:"ui_side_effect_event",SPECULATIVE_FALLBACK_WITHOUT_MESSAGE:"speculative_generation_after_commands",NO_CONFIRMED_ASSISTANT_MESSAGE:"no_confirmed_assistant_message",NON_ASSISTANT_MESSAGE:"non_assistant_message",MISSING_AI_MESSAGE:"missing_ai_message",DUPLICATE_MESSAGE:"duplicate_message",NO_ELIGIBLE_TOOLS:"no_eligible_tools",TOOL_DISABLED:"tool_disabled"},Ut={AUTO_POST_RESPONSE_API:"auto_post_response_api",MANUAL_POST_RESPONSE_API:"manual_post_response_api",MANUAL_COMPATIBILITY:"manual_compatibility"},O={RECEIVED:"received",SCHEDULED:"scheduled",DISPATCHING:"dispatching",HANDLING:"handling",COMPLETED:"completed",SKIPPED:"skipped",IGNORED:"ignored"},Tl=15e3,wl=1500,Xo=1800;_={initialized:!1,listeners:new Map,messageSessions:new Map,recentSessionHistory:[],lastExecutionContext:null,lastHandledMessageKey:"",pendingMessageTimers:new Map,lastAutoTriggerSnapshot:null,lastEventDebugSnapshot:null,lastDuplicateMessageKey:"",lastDuplicateMessageAt:0}});var ga={};de(ga,{TOOL_CONFIG_PANEL_STYLES:()=>ya,createToolConfigPanel:()=>_t,default:()=>ic});function _t(t){let{id:e,toolId:s,postResponseHint:n,extractionPlaceholder:r,previewDialogId:o,previewTitle:a="\u6D4B\u8BD5\u63D0\u53D6\u7ED3\u679C"}=t;return{id:e,toolId:s,render(){let i=ne(this.toolId);if(!i)return'<div class="yyt-error">\u5DE5\u5177\u914D\u7F6E\u52A0\u8F7D\u5931\u8D25</div>';let l=this._getApiPresets(),c=i.output?.apiPreset||i.apiPreset||"",u=this._getBypassPresets(),d=i.output?.mode||"follow_ai",h=i.bypass?.enabled||!1,g=i.bypass?.presetId||"",b=i.runtime?.lastStatus||"idle",G=i.runtime?.lastRunAt?new Date(i.runtime.lastRunAt).toLocaleString():"\u672A\u8FD0\u884C",F=i.runtime?.lastError||"",re=i.extraction||{},be=Array.isArray(re.selectors)?re.selectors.join(`
`):"",pe=d==="post_response_api"?n:"\u968F AI \u8F93\u51FA\u4E0D\u4F1A\u81EA\u52A8\u8C03\u7528\u989D\u5916\u6A21\u578B\uFF0C\u4F46\u4ECD\u7136\u652F\u6301\u624B\u52A8\u6267\u884C\u4E0E\u6D4B\u8BD5\u63D0\u53D6\u3002",M=this._buildDiagnosticsHtml(i.runtime||{}),N=d==="post_response_api"?"\u989D\u5916\u89E3\u6790":"\u968F AI \u8F93\u51FA",$=c||"\u5F53\u524D\u914D\u7F6E";return`
        <div class="yyt-tool-panel" data-tool-id="${this.toolId}">
          <div class="yyt-tool-panel-hero">
            <div class="yyt-tool-panel-hero-copy">
              <div class="yyt-tool-panel-hero-title">${v(i.name||this.toolId)}</div>
              <div class="yyt-tool-panel-hero-desc">${v(i.description||"\u914D\u7F6E\u6A21\u677F\u3001\u63D0\u53D6\u89C4\u5219\u3001API \u9884\u8BBE\u4E0E\u624B\u52A8\u8C03\u8BD5\u80FD\u529B\u3002")}</div>
            </div>
            <div class="yyt-tool-panel-hero-tags">
              <span class="yyt-tool-hero-chip">\u6A21\u5F0F ${v(N)}</span>
              <span class="yyt-tool-hero-chip">\u9884\u8BBE ${v($)}</span>
              <span class="yyt-tool-hero-chip">\u6700\u8FD1\u72B6\u6001 ${v(b)}</span>
              <div class="yyt-tool-panel-hero-actions">
                <button class="yyt-btn yyt-btn-primary yyt-btn-small yyt-tool-save-top" id="${y}-tool-save-top">
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
              <select class="yyt-select" id="${y}-tool-output-mode">
                <option value="follow_ai" ${d==="follow_ai"?"selected":""}>\u968F AI \u8F93\u51FA\uFF08\u652F\u6301\u624B\u52A8\u6267\u884C\uFF09</option>
                <option value="post_response_api" ${d==="post_response_api"?"selected":""}>\u989D\u5916 AI \u6A21\u578B\u89E3\u6790</option>
              </select>
              <div class="yyt-tool-compact-hint yyt-tool-mode-hint">${pe}</div>
            </div>
          </div>

          <div class="yyt-panel-section">
            <div class="yyt-section-title">
              <i class="fa-solid fa-database"></i>
              <span>API \u9884\u8BBE</span>
            </div>
            <div class="yyt-form-group">
              <label>\u89E3\u6790\u4F7F\u7528\u7684 API \u9884\u8BBE</label>
              <select class="yyt-select" id="${y}-tool-api-preset">
                <option value="">\u4F7F\u7528\u5F53\u524DAPI\u914D\u7F6E</option>
                ${l.map(K=>`
                  <option value="${v(K.name)}" ${K.name===c?"selected":""}>
                    ${v(K.name)}
                  </option>
                `).join("")}
              </select>
              <div class="yyt-tool-compact-hint">\u4EC5\u5728\u201C\u989D\u5916 AI \u6A21\u578B\u89E3\u6790\u201D\u6A21\u5F0F\u4E0B\u751F\u6548\u3002</div>
            </div>
          </div>

          <div class="yyt-panel-section">
            <div class="yyt-section-title">
              <i class="fa-solid fa-shield-halved"></i>
              <span>\u7834\u9650\u9884\u8BBE</span>
            </div>
            <div class="yyt-form-group">
              <label class="yyt-checkbox-label">
                <input type="checkbox" id="${y}-tool-bypass-enabled" ${h?"checked":""}>
                <span>\u542F\u7528\u7834\u9650\u8BCD</span>
              </label>
            </div>
            <div class="yyt-form-group yyt-bypass-preset-select ${h?"":"yyt-hidden"}">
              <label>\u7ED1\u5B9A\u7834\u9650\u8BCD\u9884\u8BBE</label>
              <select class="yyt-select" id="${y}-tool-bypass-preset">
                <option value="">\u9009\u62E9\u9884\u8BBE</option>
                ${u.map(K=>`
                  <option value="${v(K.id)}" ${K.id===g?"selected":""}>
                    ${v(K.name)}${K.isDefault?" [\u9ED8\u8BA4]":""}
                  </option>
                `).join("")}
              </select>
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
                <input type="number" class="yyt-input" id="${y}-tool-max-messages" min="1" max="50" value="${Number(re.maxMessages)||5}">
              </div>
            </div>
            <div class="yyt-form-group">
              <label>\u63D0\u53D6\u6807\u7B7E / \u6B63\u5219</label>
              <textarea class="yyt-textarea yyt-code-textarea yyt-code-textarea-small"
                        id="${y}-tool-extraction-selectors"
                        rows="5"
                        placeholder="${v(r)}">${v(be)}</textarea>
              <div class="yyt-tool-compact-hint">\u6BCF\u884C\u4E00\u4E2A\u89C4\u5219\u3002\u666E\u901A\u6587\u672C\u6309\u6807\u7B7E\u63D0\u53D6\uFF1B\u4EE5 <code>regex:</code> \u5F00\u5934\u65F6\u6309\u6B63\u5219\u7B2C\u4E00\u6355\u83B7\u7EC4\u63D0\u53D6\u3002</div>
            </div>
          </div>

          <div class="yyt-panel-section">
            <div class="yyt-section-title">
              <i class="fa-solid fa-file-code"></i>
              <span>\u6A21\u677F\u4FEE\u6539\u6846</span>
              <div class="yyt-title-actions">
                <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="${y}-tool-reset-template">
                  <i class="fa-solid fa-undo"></i> \u91CD\u7F6E\u6A21\u677F
                </button>
              </div>
            </div>
            <div class="yyt-form-group">
              <textarea class="yyt-textarea yyt-code-textarea"
                        id="${y}-tool-prompt-template"
                        rows="12"
                        placeholder="\u8F93\u5165\u63D0\u793A\u8BCD\u6A21\u677F...">${v(i.promptTemplate||"")}</textarea>
              <div class="yyt-tool-compact-hint">\u8FD9\u91CC\u76F4\u63A5\u586B\u5199\u53D1\u9001\u7ED9\u989D\u5916\u89E3\u6790\u6A21\u578B\u7684\u5B8C\u6574\u6A21\u677F\uFF1B\u53EF\u5728\u6B63\u6587\u4E2D\u663E\u5F0F\u4F7F\u7528 <code>{{toolContentMacro}}</code>\u3001<code>{{lastAiMessage}}</code>\u3001<code>{{userMessage}}</code> \u7B49\u5B8F\u3002</div>
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
                  <span class="yyt-tool-runtime-badge yyt-status-${v(b)}">${v(b)}</span>
                </div>
                <div class="yyt-tool-runtime-line">
                  <span class="yyt-tool-runtime-label">\u6700\u8FD1\u8FD0\u884C</span>
                  <span class="yyt-tool-runtime-value">${v(G)}</span>
                </div>
                <div class="yyt-tool-runtime-line">
                  <span class="yyt-tool-runtime-label">\u6210\u529F / \u5931\u8D25</span>
                  <span class="yyt-tool-runtime-value">${i.runtime?.successCount||0} / ${i.runtime?.errorCount||0}</span>
                </div>
                ${F?`
                  <div class="yyt-tool-runtime-line yyt-tool-runtime-error">
                    <span class="yyt-tool-runtime-label">\u6700\u8FD1\u9519\u8BEF</span>
                    <span class="yyt-tool-runtime-value">${v(F)}</span>
                  </div>
                `:""}
              </div>
              <div class="yyt-tool-manual-actions">
                <button class="yyt-btn yyt-btn-primary" id="${y}-tool-run-manual">
                  <i class="fa-solid fa-play"></i> \u7ACB\u5373\u6267\u884C\u4E00\u6B21
                </button>
                <button class="yyt-btn yyt-btn-secondary" id="${y}-tool-preview-extraction">
                  <i class="fa-solid fa-vial"></i> \u6D4B\u8BD5\u63D0\u53D6
                </button>
                <div class="yyt-tool-compact-hint">\u7528\u4E8E\u624B\u52A8\u9A8C\u8BC1\u5F53\u524D\u6A21\u677F\u3001API\u9884\u8BBE\u548C\u7834\u9650\u9884\u8BBE\u662F\u5426\u80FD\u6B63\u5E38\u5DE5\u4F5C\u3002</div>
              </div>
            </div>
          </div>

          <div class="yyt-panel-footer yyt-panel-footer-end">
            <div class="yyt-footer-right">
              <button class="yyt-btn yyt-btn-primary" id="${y}-tool-save">
                <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u914D\u7F6E
              </button>
            </div>
          </div>

          <div class="yyt-tool-macro-hint">
            \u8BF4\u660E\uFF1A\u5DE5\u5177\u4F1A\u628A\u5F53\u524D\u6A21\u677F\u89E3\u6790\u540E\u4F5C\u4E3A\u6700\u7EC8\u7528\u6237\u8BF7\u6C42\u53D1\u9001\u7ED9\u989D\u5916\u6A21\u578B\uFF1B\u82E5\u542F\u7528\u4E86\u7834\u9650\u8BCD\uFF0C\u5219\u4F1A\u4F5C\u4E3A\u524D\u7F6E\u6D88\u606F\u4E00\u5E76\u53D1\u9001\u3002\u53EF\u7528\u5B8F\u5305\u62EC <code>{{toolPromptMacro}}</code>\u3001<code>{{toolContentMacro}}</code>\u3001<code>{{lastAiMessage}}</code>\u3001<code>{{recentMessagesText}}</code>\u3001<code>{{rawRecentMessagesText}}</code>\u3001<code>{{userMessage}}</code>\u3001<code>{{toolName}}</code>\u3001<code>{{toolId}}</code>\u3002
          </div>

          ${M}
        </div>
      `},_formatDiagnosticValue(i,l="\u672A\u8BB0\u5F55"){let c=String(i||"").trim();return v(c||l)},_formatDiagnosticTime(i){let l=Number(i)||0;return l>0?new Date(l).toLocaleString():"\u672A\u8BB0\u5F55"},_formatSkipReason(i){return{listener_disabled:"\u5DF2\u8DF3\u8FC7\uFF1A\u81EA\u52A8\u76D1\u542C\u5DF2\u5173\u95ED",quiet_generation:"\u5DF2\u8DF3\u8FC7\uFF1Aquiet / dryRun \u751F\u6210",ignored_auto_trigger:"\u5DF2\u8DF3\u8FC7\uFF1A\u5224\u5B9A\u4E3A\u975E\u7528\u6237\u4E3B\u52A8\u89E6\u53D1\u751F\u6210",non_assistant_message:"\u5DF2\u8DF3\u8FC7\uFF1A\u547D\u4E2D\u7684\u5E76\u975E AI \u697C\u5C42",missing_ai_message:"\u5DF2\u8DF3\u8FC7\uFF1A\u672A\u8BFB\u53D6\u5230\u6709\u6548 AI \u56DE\u590D",duplicate_message:"\u5DF2\u8DF3\u8FC7\uFF1A\u547D\u4E2D\u81EA\u52A8\u53BB\u91CD",no_eligible_tools:"\u5DF2\u8DF3\u8FC7\uFF1A\u6CA1\u6709\u547D\u4E2D\u53EF\u6267\u884C\u5DE5\u5177",tool_disabled:"\u5DF2\u8DF3\u8FC7\uFF1A\u5DE5\u5177\u672A\u542F\u7528",generation_after_commands_fallback_disabled:"\u5DF2\u5FFD\u7565\uFF1AGENERATION_AFTER_COMMANDS \u515C\u5E95\u5DF2\u5173\u95ED",message_received_fallback_disabled:"\u5DF2\u5FFD\u7565\uFF1AMESSAGE_RECEIVED \u515C\u5E95\u5DF2\u5173\u95ED"}[i]||i||"\u65E0"},_formatExecutionPath(i){return{auto_post_response_api:"\u81EA\u52A8\u94FE\uFF1Apost_response_api",manual_post_response_api:"\u624B\u52A8\u94FE\uFF1Apost_response_api",manual_compatibility:"\u624B\u52A8\u94FE\uFF1Acompatibility \u56DE\u9000"}[i]||i||"\u672A\u8BB0\u5F55"},_formatWritebackStatus(i){return{success:"\u5199\u56DE\u6210\u529F",failed:"\u5199\u56DE\u5931\u8D25",skipped_empty_output:"\u65E0\u8F93\u51FA\uFF0C\u8DF3\u8FC7\u5199\u56DE",not_applicable:"\u4E0D\u9002\u7528"}[i]||i||"\u672A\u8BB0\u5F55"},_formatFailureStage(i){return{build_messages:"\u6784\u9020\u8BF7\u6C42\u6D88\u606F",send_api_request:"\u53D1\u9001 API \u8BF7\u6C42",extract_output:"\u63D0\u53D6\u5DE5\u5177\u8F93\u51FA",inject_context:"\u5199\u56DE\u4E0A\u4E0B\u6587",compatibility_execute:"\u517C\u5BB9\u6267\u884C\u5165\u53E3",unknown:"\u672A\u77E5\u9636\u6BB5"}[i]||i||"\u65E0"},_formatHistoryTime(i){return this._formatDiagnosticTime(i)},_buildHistorySection(i,l=[],c="trigger"){let u=Array.isArray(l)?l.filter(Boolean).slice().reverse():[];if(!u.length)return`
          <div class="yyt-tool-debug-history">
            <div class="yyt-tool-debug-history-title">${v(i)}</div>
            <div class="yyt-tool-debug-history-empty">\u6682\u65E0\u8BB0\u5F55</div>
          </div>
        `;let d=u.map(h=>{let g=this._formatDiagnosticValue(h.eventType,"\u672A\u8BB0\u5F55"),b=this._formatDiagnosticValue(h.messageKey||h.messageId,"\u672A\u8BB0\u5F55"),G=this._formatDiagnosticValue(h.traceId,"\u65E0"),F=c==="writeback"?`\u6267\u884C\u8DEF\u5F84\uFF1A${this._formatExecutionPath(h.executionPath)} / \u5199\u56DE\uFF1A${this._formatWritebackStatus(h.writebackStatus)} / \u5931\u8D25\u9636\u6BB5\uFF1A${this._formatFailureStage(h.failureStage)}`:`\u8DF3\u8FC7\u539F\u56E0\uFF1A${this._formatSkipReason(h.skipReason)} / \u6267\u884C\u8DEF\u5F84\uFF1A${this._formatExecutionPath(h.executionPath)} / \u5199\u56DE\uFF1A${this._formatWritebackStatus(h.writebackStatus)}`;return`
          <div class="yyt-tool-debug-history-item">
            <div class="yyt-tool-debug-history-meta">
              <span>${v(this._formatHistoryTime(h.at))}</span>
              <span>trace ${G}</span>
            </div>
            <div class="yyt-tool-debug-history-main">
              \u4E8B\u4EF6\uFF1A${g}<br>
              \u6D88\u606F\uFF1A${b}<br>
              ${v(F)}
            </div>
          </div>
        `}).join("");return`
        <div class="yyt-tool-debug-history">
          <div class="yyt-tool-debug-history-title">${v(i)}</div>
          <div class="yyt-tool-debug-history-list">${d}</div>
        </div>
      `},_buildDiagnosticsHtml(i){let l=i||{};if(!!!(l.lastTriggerAt||l.lastTriggerEvent||l.lastMessageKey||l.lastSkipReason||l.lastExecutionPath||l.lastWritebackStatus||l.lastFailureStage||l.lastTraceId||Array.isArray(l.recentTriggerHistory)&&l.recentTriggerHistory.length>0||Array.isArray(l.recentWritebackHistory)&&l.recentWritebackHistory.length>0))return"";let u=[["\u6700\u8FD1\u89E6\u53D1\u65F6\u95F4",this._formatDiagnosticTime(l.lastTriggerAt)],["\u6700\u8FD1\u89E6\u53D1\u4E8B\u4EF6",this._formatDiagnosticValue(l.lastTriggerEvent)],["\u6700\u8FD1 Trace",this._formatDiagnosticValue(l.lastTraceId,"\u65E0")],["\u6700\u8FD1\u6D88\u606F\u952E",this._formatDiagnosticValue(l.lastMessageKey)],["\u6700\u8FD1\u8DF3\u8FC7\u539F\u56E0",this._formatDiagnosticValue(this._formatSkipReason(l.lastSkipReason),"\u65E0")],["\u6700\u8FD1\u6267\u884C\u8DEF\u5F84",this._formatDiagnosticValue(this._formatExecutionPath(l.lastExecutionPath))],["\u6700\u8FD1\u5199\u56DE\u72B6\u6001",this._formatDiagnosticValue(this._formatWritebackStatus(l.lastWritebackStatus))],["\u6700\u8FD1\u5931\u8D25\u9636\u6BB5",this._formatDiagnosticValue(this._formatFailureStage(l.lastFailureStage),"\u65E0")]],d=this._buildHistorySection("\u6700\u8FD1\u89E6\u53D1\u5386\u53F2",l.recentTriggerHistory||[],"trigger"),h=this._buildHistorySection("\u6700\u8FD1\u5199\u56DE\u5386\u53F2",l.recentWritebackHistory||[],"writeback");return`
        <details class="yyt-tool-debug-panel">
          <summary class="yyt-tool-debug-summary">\u6700\u8FD1\u89E6\u53D1\u8BCA\u65AD</summary>
          <div class="yyt-tool-debug-content">
            ${u.map(([g,b])=>`
              <div class="yyt-tool-runtime-line">
                <span class="yyt-tool-runtime-label">${g}</span>
                <span class="yyt-tool-runtime-value">${b}</span>
              </div>
            `).join("")}
            ${d}
            ${h}
          </div>
        </details>
      `},_getApiPresets(){try{return Kt()||[]}catch{return[]}},_getBypassPresets(){try{return hr()||[]}catch{return[]}},_getFormData(i){let l=ne(this.toolId),c=i.find(`#${y}-tool-output-mode`).val()||"follow_ai",u=i.find(`#${y}-tool-bypass-enabled`).is(":checked"),d=c==="post_response_api",h=(i.find(`#${y}-tool-extraction-selectors`).val()||"").split(/\r?\n/).map(g=>g.trim()).filter(Boolean);return{enabled:l?.enabled!==!1,promptTemplate:i.find(`#${y}-tool-prompt-template`).val()||"",apiPreset:i.find(`#${y}-tool-api-preset`).val()||"",extractTags:h,trigger:{event:"GENERATION_ENDED",enabled:d},output:{mode:c,apiPreset:i.find(`#${y}-tool-api-preset`).val()||"",overwrite:!0,enabled:d},bypass:{enabled:u,presetId:u&&i.find(`#${y}-tool-bypass-preset`).val()||""},extraction:{enabled:!0,maxMessages:Math.max(1,parseInt(i.find(`#${y}-tool-max-messages`).val(),10)||5),selectors:h}}},_showExtractionPreview(i,l){if(!H())return;let u=`${y}-${o}`,d=Array.isArray(l.messageEntries)?l.messageEntries:[],h=d.length>0?`
          <div class="yyt-form-group">
            <label>\u9010\u6761\u6D88\u606F\u9884\u89C8</label>
            <div class="yyt-preview-message-list">
              ${d.map(g=>`
                <div class="yyt-preview-message-item">
                  <div class="yyt-preview-message-title">\u7B2C ${g.order} \u6761 AI \u6D88\u606F</div>
                  <div>
                    <label>\u539F\u6587</label>
                    <pre class="yyt-preview-box yyt-preview-pre">${v(g.rawText||"\u65E0\u53EF\u7528\u6D88\u606F")}</pre>
                  </div>
                  <div>
                    <label>\u6B63\u6587\u63D0\u53D6</label>
                    <pre class="yyt-preview-box yyt-preview-pre">${v(g.filteredText||"\u6B63\u6587\u89C4\u5219\u672A\u547D\u4E2D")}</pre>
                  </div>
                  <div>
                    <label>\u5DE5\u5177\u6807\u7B7E\u63D0\u53D6</label>
                    <pre class="yyt-preview-box yyt-preview-pre">${v(g.extractedText||"\u672A\u63D0\u53D6\u5230\u5185\u5BB9")}</pre>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>
        `:"";i.append(Yn({id:u,title:a,width:"720px",wide:!0,body:`
          <div class="yyt-form-group">
            <label>\u63D0\u53D6\u89C4\u5219</label>
            <div class="yyt-preview-box">${v((l.selectors||[]).join(`
`)||"\u65E0")}</div>
          </div>
          <div class="yyt-form-group">
            <label>\u539F\u59CB\u5185\u5BB9\u6C47\u603B\uFF08\u6700\u8FD1 ${l.maxMessages} \u6761 AI \u6D88\u606F\uFF09</label>
            <pre class="yyt-preview-box yyt-preview-pre">${v(l.sourceText||"\u65E0\u53EF\u7528\u6D88\u606F")}</pre>
          </div>
          <div class="yyt-form-group">
            <label>\u6B63\u6587\u63D0\u53D6\u6C47\u603B</label>
            <pre class="yyt-preview-box yyt-preview-pre">${v(l.filteredSourceText||"\u6B63\u6587\u89C4\u5219\u672A\u547D\u4E2D")}</pre>
          </div>
          <div class="yyt-form-group">
            <label>\u5DE5\u5177\u6807\u7B7E\u63D0\u53D6\u6C47\u603B</label>
            <pre class="yyt-preview-box yyt-preview-pre">${v(l.extractedText||"\u672A\u63D0\u53D6\u5230\u5185\u5BB9")}</pre>
          </div>
          ${h}
        `})),Wn(i,u,{onSave:g=>g()}),i.find(`#${u}-save`).text("\u5173\u95ED"),i.find(`#${u}-cancel`).remove()},bindEvents(i){let l=H();!l||!V(i)||(i.find(`#${y}-tool-output-mode`).on("change",()=>{let u=(i.find(`#${y}-tool-output-mode`).val()||"follow_ai")==="post_response_api"?n:"\u968F AI \u8F93\u51FA\u4E0D\u4F1A\u81EA\u52A8\u8C03\u7528\u989D\u5916\u6A21\u578B\uFF0C\u4F46\u4ECD\u7136\u652F\u6301\u624B\u52A8\u6267\u884C\u4E0E\u6D4B\u8BD5\u63D0\u53D6\u3002";i.find(".yyt-tool-mode-hint").text(u)}),i.find(`#${y}-tool-bypass-enabled`).on("change",c=>{let u=l(c.currentTarget).is(":checked");i.find(".yyt-bypass-preset-select").toggleClass("yyt-hidden",!u)}),i.find(`#${y}-tool-save, #${y}-tool-save-top`).on("click",()=>{this._saveConfig(i,{silent:!1})}),i.find(`#${y}-tool-reset-template`).on("click",()=>{let c=Qs(this.toolId);c?.promptTemplate&&(i.find(`#${y}-tool-prompt-template`).val(c.promptTemplate),m("info","\u6A21\u677F\u5DF2\u91CD\u7F6E"))}),i.find(`#${y}-tool-run-manual`).on("click",async()=>{if(this._saveConfig(i,{silent:!0}))try{let u=await Br(this.toolId);!u?.success&&u?.error&&Ve("warning",u.error,{duration:3200,noticeId:`yyt-tool-run-${this.toolId}`})}catch(u){m("error",u?.message||"\u624B\u52A8\u6267\u884C\u5931\u8D25")}finally{this.renderTo(i)}}),i.find(`#${y}-tool-preview-extraction`).on("click",async()=>{if(this._saveConfig(i,{silent:!0}))try{let u=await zr(this.toolId);if(!u?.success){m("error",u?.error||"\u6D4B\u8BD5\u63D0\u53D6\u5931\u8D25");return}this._showExtractionPreview(i,u)}catch(u){m("error",u?.message||"\u6D4B\u8BD5\u63D0\u53D6\u5931\u8D25")}}))},_saveConfig(i,l={}){let c=this._getFormData(i),{silent:u=!1}=l,d=Ze(this.toolId,c);return d?u||m("success","\u914D\u7F6E\u5DF2\u4FDD\u5B58"):m("error","\u4FDD\u5B58\u5931\u8D25"),d},destroy(i){!H()||!V(i)||i.find("*").off()},getStyles(){return ya},renderTo(i){i.html(this.render({})),this.bindEvents(i,{})}}}var ya,ic,As=j(()=>{qe();Qt();Ls();xs();jr();ya=`
  .yyt-tool-panel {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .yyt-tool-panel-hero {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 12px;
    align-items: stretch;
    padding: 12px 14px;
    border-radius: 18px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.045) 0%, rgba(255, 255, 255, 0.015) 100%);
  }

  .yyt-tool-panel-hero-copy {
    display: flex;
    flex-direction: column;
    gap: 6px;
    min-width: 0;
  }

  .yyt-tool-panel-hero-title {
    font-size: 18px;
    font-weight: 800;
    line-height: 1.15;
    color: var(--yyt-text);
  }

  .yyt-tool-panel-hero-desc {
    font-size: 12px;
    line-height: 1.55;
    color: var(--yyt-text-secondary);
  }

  .yyt-tool-panel-hero-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
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
    padding: 6px 10px;
    border-radius: 999px;
    font-size: 10px;
    font-weight: 700;
    border: 1px solid rgba(255, 255, 255, 0.08);
    letter-spacing: 0.3px;
    color: var(--yyt-text-secondary);
    background: rgba(255, 255, 255, 0.04);
  }

  .yyt-tool-compact-hint {
    font-size: 12px;
    color: var(--yyt-text-muted);
    line-height: 1.6;
  }

  .yyt-hidden {
    display: none !important;
  }

  .yyt-code-textarea {
    font-family: 'Fira Code', 'Consolas', 'Monaco', monospace;
    font-size: 13px;
    line-height: 1.5;
    tab-size: 2;
    background: rgba(0, 0, 0, 0.2);
    border-color: rgba(255, 255, 255, 0.1);
    resize: vertical;
    min-height: 180px;
  }

  .yyt-code-textarea-small {
    min-height: 96px;
  }

  .yyt-code-textarea:focus {
    border-color: var(--yyt-accent);
    box-shadow: 0 0 0 2px rgba(123, 183, 255, 0.15);
  }

  .yyt-title-actions {
    margin-left: auto;
  }

  .yyt-btn-small {
    padding: 4px 10px;
    font-size: 12px;
  }

  .yyt-checkbox-label {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    user-select: none;
  }

  .yyt-checkbox-label input[type="checkbox"] {
    width: 16px;
    height: 16px;
    cursor: pointer;
  }

  .yyt-tool-manual-area {
    display: grid;
    grid-template-columns: minmax(0, 1.2fr) minmax(220px, 0.8fr);
    gap: 12px;
    align-items: start;
  }

  .yyt-tool-runtime-card {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 12px;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.045) 0%, rgba(255, 255, 255, 0.015) 100%);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 14px;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
  }

  .yyt-tool-runtime-line {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 12px;
    font-size: 12px;
  }

  .yyt-tool-runtime-label {
    color: var(--yyt-text-muted);
    flex-shrink: 0;
  }

  .yyt-tool-runtime-value {
    color: var(--yyt-text);
    text-align: right;
    word-break: break-word;
  }

  .yyt-tool-runtime-badge {
    padding: 3px 10px;
    border-radius: 999px;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.4px;
  }

  .yyt-status-idle {
    color: var(--yyt-text-secondary);
    background: rgba(255, 255, 255, 0.06);
  }

  .yyt-status-running {
    color: var(--yyt-accent);
    background: rgba(123, 183, 255, 0.12);
  }

  .yyt-status-success {
    color: var(--yyt-success);
    background: rgba(74, 222, 128, 0.12);
  }

  .yyt-status-error {
    color: var(--yyt-error);
    background: rgba(255, 107, 107, 0.12);
  }

  .yyt-tool-runtime-error .yyt-tool-runtime-value {
    color: var(--yyt-error);
  }

  .yyt-tool-manual-actions {
    display: flex;
    flex-direction: column;
    gap: 8px;
    min-width: 0;
    padding: 12px;
    border-radius: 14px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.045) 0%, rgba(255, 255, 255, 0.015) 100%);
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
`;ic=_t});var je,Fr=j(()=>{As();je=_t({id:"summaryToolPanel",toolId:"summaryTool",postResponseHint:"\u76D1\u542C AI \u56DE\u590D\u7ED3\u675F\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u8FDB\u884C\u6458\u8981\u89E3\u6790\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 boo_FM
\u6216 regex:<boo_FM>([\\s\\S]*?)</boo_FM>`,previewDialogId:"summary-extraction-preview",defaultInjectionOrder:1e4,lorebookLogTag:"SummaryToolPanel"})});var Fe,Hr=j(()=>{As();Fe=_t({id:"statusBlockPanel",toolId:"statusBlock",postResponseHint:"\u76D1\u542C AI \u56DE\u590D\u7ED3\u675F\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u751F\u6210\u4E3B\u89D2\u72B6\u6001\u680F\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 status_block
\u6216 regex:<status_block>([\\s\\S]*?)</status_block>`,previewDialogId:"status-extraction-preview",defaultInjectionOrder:10001,lorebookLogTag:"StatusBlockPanel"})});var He,Kr=j(()=>{As();He=_t({id:"youyouReviewPanel",toolId:"youyouReview",postResponseHint:"\u76D1\u542C AI \u56DE\u590D\u7ED3\u675F\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u5728\u672B\u5C3E\u751F\u6210\u5C0F\u5E7D\u70B9\u8BC4\u4E0E\u5267\u60C5\u94A9\u5B50\u3002",extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 youyou
\u6216 regex:<youyou>([\\s\\S]*?)</youyou>`,previewDialogId:"youyou-review-extraction-preview",previewTitle:"\u5C0F\u5E7D\u70B9\u8BC4\u63D0\u53D6\u9884\u89C8"})});var Bt,Yr=j(()=>{Se();xs();qe();Bt={id:"bypassPanel",render(t){let e=L.getPresetList(),s=L.getDefaultPresetId();return`
      <div class="yyt-bypass-panel">
        <!-- \u5DE6\u4FA7\u9884\u8BBE\u5217\u8868 -->
        <div class="yyt-bypass-sidebar">
          <div class="yyt-bypass-sidebar-header">
            <span class="yyt-bypass-sidebar-title">\u7834\u9650\u8BCD\u9884\u8BBE</span>
            <button class="yyt-btn yyt-btn-small yyt-btn-primary" id="yyt-bypass-add">
              <i class="fa-solid fa-plus"></i>
            </button>
          </div>
          <div class="yyt-bypass-preset-list">
            ${e.map(n=>this._renderPresetItem(n,n.id===s)).join("")}
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
        <div class="yyt-bypass-editor" id="yyt-bypass-editor">
          <div class="yyt-bypass-empty">
            <i class="fa-solid fa-shield-halved"></i>
            <p>\u9009\u62E9\u6216\u521B\u5EFA\u7834\u9650\u8BCD\u9884\u8BBE</p>
          </div>
        </div>
      </div>
    `},_renderPresetItem(t,e){let s=ut&&ut[t.id];return`
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
          <p>\u9009\u62E9\u6216\u521B\u5EFA\u7834\u9650\u8BCD\u9884\u8BBE</p>
        </div>
      `;let e=L.getDefaultPresetId()===t.id,s=ut&&ut[t.id];return`
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
          <input type="text" class="yyt-input" id="yyt-bypass-description" 
                 value="${v(t.description||"")}" placeholder="\u9884\u8BBE\u63CF\u8FF0\uFF08\u53EF\u9009\uFF09">
        </div>
        
        <div class="yyt-bypass-messages-header">
          <span>\u6D88\u606F\u5217\u8868</span>
          <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="yyt-bypass-add-message">
            <i class="fa-solid fa-plus"></i> \u6DFB\u52A0\u6D88\u606F
          </button>
        </div>
        
        <div class="yyt-bypass-messages" id="yyt-bypass-messages">
          ${(t.messages||[]).map(n=>this._renderMessageItem(n)).join("")}
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
            <select class="yyt-select yyt-bypass-role-select">
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
                  placeholder="\u8F93\u5165\u6D88\u606F\u5185\u5BB9...">${v(t.content||"")}</textarea>
      </div>
    `},bindEvents(t,e){let s=H();!s||!V(t)||(this._bindPresetListEvents(t,s),this._bindEditorEvents(t,s),this._bindFileEvents(t,s))},_bindPresetListEvents(t,e){t.on("click",".yyt-bypass-preset-item",s=>{if(e(s.target).closest(".yyt-bypass-quick-delete").length)return;let n=e(s.currentTarget).data("presetId");this._selectPreset(t,e,n)}),t.on("click",".yyt-bypass-quick-delete",s=>{s.stopPropagation();let n=e(s.currentTarget).data("presetId");if(!n||!confirm("\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u4E2A\u9884\u8BBE\u5417\uFF1F"))return;let r=L.deletePreset(n);r.success?(t.find(".yyt-bypass-editor-content").data("presetId")===n&&t.find("#yyt-bypass-editor").html(`
            <div class="yyt-bypass-empty">
              <i class="fa-solid fa-shield-halved"></i>
              <p>\u9009\u62E9\u6216\u521B\u5EFA\u7834\u9650\u8BCD\u9884\u8BBE</p>
            </div>
          `),this._refreshPresetList(t,e),m("success","\u9884\u8BBE\u5DF2\u5220\u9664")):m("error",r?.message||"\u5220\u9664\u9884\u8BBE\u5931\u8D25")}),t.find("#yyt-bypass-add").on("click",()=>{this._createNewPreset(t,e)})},_bindEditorEvents(t,e){t.on("click","#yyt-bypass-save",()=>{this._saveCurrentPreset(t,e)}),t.on("click","#yyt-bypass-delete",()=>{this._deleteCurrentPreset(t,e)}),t.on("click","#yyt-bypass-duplicate",()=>{this._duplicateCurrentPreset(t,e)}),t.on("click","#yyt-bypass-set-default",()=>{this._setAsDefault(t,e)}),t.on("click","#yyt-bypass-add-message",()=>{this._addMessage(t,e)}),t.on("click",".yyt-bypass-delete-message",s=>{let n=e(s.currentTarget).closest(".yyt-bypass-message"),r=n.data("messageId");n.remove()}),t.on("change",".yyt-bypass-message-enabled",s=>{e(s.currentTarget).closest(".yyt-bypass-message").toggleClass("yyt-disabled",!e(s.currentTarget).is(":checked"))})},_bindFileEvents(t,e){t.find("#yyt-bypass-import").on("click",()=>{t.find("#yyt-bypass-import-file").click()}),t.find("#yyt-bypass-import-file").on("change",async s=>{let n=s.target.files[0];if(n){try{let r=await lt(n),o=L.importPresets(r);m(o.success?"success":"error",o.message),o.success&&this.renderTo(t)}catch(r){m("error",`\u5BFC\u5165\u5931\u8D25: ${r.message}`)}e(s.target).val("")}}),t.find("#yyt-bypass-export").on("click",()=>{try{let s=L.exportPresets();it(s,`bypass_presets_${Date.now()}.json`),m("success","\u9884\u8BBE\u5DF2\u5BFC\u51FA")}catch(s){m("error",`\u5BFC\u51FA\u5931\u8D25: ${s.message}`)}})},_selectPreset(t,e,s){let n=L.getPreset(s);n&&(t.find(".yyt-bypass-preset-item").removeClass("yyt-active"),t.find(`.yyt-bypass-preset-item[data-preset-id="${s}"]`).addClass("yyt-active"),t.find("#yyt-bypass-editor").html(this._renderEditor(n)))},_createNewPreset(t,e){let s=`bypass_${Date.now()}`,n=L.createPreset({id:s,name:"\u65B0\u7834\u9650\u8BCD\u9884\u8BBE",description:"",messages:[]});n.success?(this.renderTo(t),this._selectPreset(t,e,s),m("success","\u9884\u8BBE\u5DF2\u521B\u5EFA")):m("error",n?.message||"\u521B\u5EFA\u9884\u8BBE\u5931\u8D25")},_saveCurrentPreset(t,e){let s=t.find(".yyt-bypass-editor-content"),n=s.data("presetId");if(!n)return;let r=s.find(".yyt-bypass-name-input").val().trim(),o=s.find("#yyt-bypass-description").val().trim();if(!r){m("warning","\u8BF7\u8F93\u5165\u9884\u8BBE\u540D\u79F0");return}let a=[];s.find(".yyt-bypass-message").each(function(){let l=e(this);a.push({id:l.data("messageId"),role:l.find(".yyt-bypass-role-select").val(),content:l.find(".yyt-bypass-message-content").val(),enabled:l.find(".yyt-bypass-message-enabled").is(":checked"),deletable:!0})});let i=L.updatePreset(n,{name:r,description:o,messages:a});i.success?(m("success","\u9884\u8BBE\u5DF2\u4FDD\u5B58"),this._refreshPresetList(t,e)):m("error",i?.message||"\u4FDD\u5B58\u9884\u8BBE\u5931\u8D25")},_deleteCurrentPreset(t,e){let n=t.find(".yyt-bypass-editor-content").data("presetId");if(!n||!confirm("\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u4E2A\u9884\u8BBE\u5417\uFF1F"))return;let r=L.deletePreset(n);r.success?(this.renderTo(t),m("success","\u9884\u8BBE\u5DF2\u5220\u9664")):m("error",r?.message||"\u5220\u9664\u9884\u8BBE\u5931\u8D25")},_duplicateCurrentPreset(t,e){let n=t.find(".yyt-bypass-editor-content").data("presetId");if(!n)return;let r=`bypass_${Date.now()}`,o=L.duplicatePreset(n,r);o.success?(this.renderTo(t),this._selectPreset(t,e,r),m("success","\u9884\u8BBE\u5DF2\u590D\u5236")):m("error",o?.message||"\u590D\u5236\u9884\u8BBE\u5931\u8D25")},_setAsDefault(t,e){let n=t.find(".yyt-bypass-editor-content").data("presetId");n&&(L.setDefaultPresetId(n),t.find(".yyt-bypass-preset-item").removeClass("yyt-default"),t.find(`.yyt-bypass-preset-item[data-preset-id="${n}"]`).addClass("yyt-default"),t.find(".yyt-bypass-default-badge").remove(),t.find(`.yyt-bypass-preset-item[data-preset-id="${n}"] .yyt-bypass-preset-info`).append('<span class="yyt-bypass-default-badge">\u9ED8\u8BA4</span>'),m("success","\u5DF2\u8BBE\u4E3A\u9ED8\u8BA4\u9884\u8BBE"))},_addMessage(t,e){let s=t.find("#yyt-bypass-messages"),n={id:`msg_${Date.now()}`,role:"SYSTEM",content:"",enabled:!0,deletable:!0};s.append(this._renderMessageItem(n))},_refreshPresetList(t,e){let s=L.getPresetList(),n=L.getDefaultPresetId();t.find(".yyt-bypass-preset-list").html(s.map(r=>this._renderPresetItem(r,r.id===n)).join(""))},destroy(t){!H()||!V(t)||t.find("*").off()},getStyles(){return`
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
        background: transparent;
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 6px;
        padding: 4px 8px;
        font-size: 12px;
        color: var(--yyt-text);
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
      
      .yyt-toggle.yyt-small {
        transform: scale(0.8);
      }
    `},renderTo(t){let e=this.render({});t.html(e),this.bindEvents(t,{})}}});var ha={};de(ha,{SettingsPanel:()=>yt,THEME_CONFIGS:()=>Wr,applyTheme:()=>ma,applyUiPreferences:()=>Vr,default:()=>cc});function Is(){try{if(typeof window.parent<"u"&&window.parent&&window.parent!==window)return window.parent.document||document}catch{}return document}function fa(t=Is()){return t?.documentElement||document.documentElement}function ma(t,e=Is()){let s=fa(e),n={...lc,...Wr[t]||Wr["dark-blue"]};Object.entries(n).forEach(([r,o])=>{s.style.setProperty(r,o)}),s.setAttribute("data-yyt-theme",t)}function Vr(t={},e=Is()){let s=fa(e),{theme:n="dark-blue",compactMode:r=!1,animationEnabled:o=!0}=t||{};ma(n,e),s.classList.toggle("yyt-compact-mode",!!r),s.classList.toggle("yyt-no-animation",!o)}var lc,Wr,yt,cc,wn=j(()=>{Se();Ss();qe();lc={"--yyt-accent":"#7bb7ff","--yyt-accent-glow":"rgba(123, 183, 255, 0.4)","--yyt-accent-soft":"rgba(123, 183, 255, 0.15)","--yyt-accent-strong":"#a5d4ff","--yyt-bg-base":"#0b0f15","--yyt-bg-gradient-1":"rgba(123, 183, 255, 0.12)","--yyt-bg-gradient-2":"rgba(155, 123, 255, 0.10)","--yyt-surface":"rgba(255, 255, 255, 0.03)","--yyt-surface-hover":"rgba(255, 255, 255, 0.06)","--yyt-surface-active":"rgba(255, 255, 255, 0.08)","--yyt-border":"rgba(255, 255, 255, 0.08)","--yyt-border-strong":"rgba(255, 255, 255, 0.15)","--yyt-text":"rgba(255, 255, 255, 0.95)","--yyt-text-secondary":"rgba(255, 255, 255, 0.7)","--yyt-text-muted":"rgba(255, 255, 255, 0.45)","--yyt-on-accent":"#0b0f15"},Wr={"dark-blue":{"--yyt-on-accent":"#0b0f15"},"dark-purple":{"--yyt-accent":"#a78bfa","--yyt-accent-glow":"rgba(167, 139, 250, 0.4)","--yyt-accent-soft":"rgba(167, 139, 250, 0.15)","--yyt-accent-strong":"#c4b5fd","--yyt-bg-base":"#0f0b15","--yyt-bg-gradient-1":"rgba(167, 139, 250, 0.12)","--yyt-bg-gradient-2":"rgba(123, 183, 255, 0.10)","--yyt-on-accent":"#120b1f"},"dark-green":{"--yyt-accent":"#4ade80","--yyt-accent-glow":"rgba(74, 222, 128, 0.4)","--yyt-accent-soft":"rgba(74, 222, 128, 0.15)","--yyt-accent-strong":"#86efac","--yyt-bg-base":"#0b150f","--yyt-bg-gradient-1":"rgba(74, 222, 128, 0.12)","--yyt-bg-gradient-2":"rgba(123, 183, 255, 0.10)","--yyt-on-accent":"#0b150f"},light:{"--yyt-accent":"#3b82f6","--yyt-accent-glow":"rgba(59, 130, 246, 0.3)","--yyt-accent-soft":"rgba(59, 130, 246, 0.1)","--yyt-accent-strong":"#93c5fd","--yyt-bg-base":"#f8fafc","--yyt-bg-gradient-1":"rgba(59, 130, 246, 0.08)","--yyt-bg-gradient-2":"rgba(139, 92, 246, 0.06)","--yyt-text":"rgba(15, 23, 42, 0.95)","--yyt-text-secondary":"rgba(15, 23, 42, 0.7)","--yyt-text-muted":"rgba(15, 23, 42, 0.45)","--yyt-surface":"rgba(0, 0, 0, 0.03)","--yyt-surface-hover":"rgba(0, 0, 0, 0.06)","--yyt-surface-active":"rgba(0, 0, 0, 0.08)","--yyt-border":"rgba(0, 0, 0, 0.08)","--yyt-border-strong":"rgba(0, 0, 0, 0.15)","--yyt-on-accent":"#0f172a"}};yt={id:"settingsPanel",render(t){let e=ke.getSettings(),s=e.listener?.listenGenerationEnded!==!1,n=e.debug?.enableDebugLog===!0;return`
      <div class="yyt-settings-panel">
        <div class="yyt-settings-hero">
          <div class="yyt-settings-hero-copy">
            <div class="yyt-settings-hero-title">\u5168\u5C40\u504F\u597D\u4E0E\u8FD0\u884C\u7B56\u7565</div>
            <div class="yyt-settings-hero-desc">\u7EDF\u4E00\u7BA1\u7406\u6267\u884C\u5668\u3001\u76D1\u542C\u5668\u3001\u8C03\u8BD5\u4E0E\u5916\u89C2\u8BBE\u7F6E\uFF0C\u8BA9\u5DE5\u5177\u94FE\u884C\u4E3A\u4E0E\u754C\u9762\u4F53\u9A8C\u4FDD\u6301\u4E00\u81F4\u3002</div>
          </div>
          <div class="yyt-settings-hero-status">
            <span class="yyt-settings-status-chip ${s?"is-on":"is-off"}">\u76D1\u542C ${s?"\u5F00\u542F":"\u5173\u95ED"}</span>
            <span class="yyt-settings-status-chip ${n?"is-on":"is-off"}">\u8C03\u8BD5 ${n?"\u5F00\u542F":"\u5173\u95ED"}</span>
            <span class="yyt-settings-status-chip is-neutral">\u4E3B\u9898 ${e.ui?.theme||"dark-blue"}</span>
          </div>
        </div>

        <!-- \u6807\u7B7E\u9875\u5BFC\u822A -->
        <div class="yyt-settings-tabs">
          <button class="yyt-settings-tab yyt-active" data-tab="executor">
            <i class="fa-solid fa-microchip"></i> \u6267\u884C\u5668
          </button>
          <button class="yyt-settings-tab" data-tab="listener">
            <i class="fa-solid fa-ear-listen"></i> \u76D1\u542C\u5668
          </button>
          <button class="yyt-settings-tab" data-tab="debug">
            <i class="fa-solid fa-bug"></i> \u8C03\u8BD5
          </button>
          <button class="yyt-settings-tab" data-tab="ui">
            <i class="fa-solid fa-palette"></i> \u5916\u89C2
          </button>
        </div>
        
        <!-- \u6807\u7B7E\u9875\u5185\u5BB9 -->
        <div class="yyt-settings-content">
          ${this._renderExecutorTab(e.executor)}
          ${this._renderListenerTab(e.listener)}
          ${this._renderDebugTab(e.debug)}
          ${this._renderUiTab(e.ui)}
        </div>
        
        <!-- \u5E95\u90E8\u64CD\u4F5C -->
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
    `},_renderListenerTab(t){return`
      <div class="yyt-settings-tab-content" data-tab="listener">
        <div class="yyt-settings-section">
          <div class="yyt-settings-section-title">\u4E8B\u4EF6\u76D1\u542C</div>
          <div class="yyt-form-group">
            <label class="yyt-toggle-label">
              <input type="checkbox" class="yyt-toggle" id="yyt-setting-listenGenerationEnded" 
                     ${t.listenGenerationEnded?"checked":""}>
              <span>\u542F\u7528\u81EA\u52A8\u5DE5\u5177\u76D1\u542C</span>
            </label>
            <div class="yyt-form-hint">\u542F\u7528\u540E\u4F1A\u76D1\u542C GENERATION_ENDED\uFF0C\u5E76\u7ED3\u5408 GENERATION_AFTER_COMMANDS / MESSAGE_RECEIVED \u4F5C\u4E3A\u515C\u5E95\u6765\u6E90\u81EA\u52A8\u89E6\u53D1\u5DE5\u5177\u3002</div>
          </div>

          <div class="yyt-form-group">
            <label class="yyt-toggle-label">
              <input type="checkbox" class="yyt-toggle" id="yyt-setting-useGenerationAfterCommandsFallback" 
                     ${t.useGenerationAfterCommandsFallback!==!1?"checked":""}>
              <span>\u542F\u7528 GENERATION_AFTER_COMMANDS \u515C\u5E95</span>
            </label>
            <div class="yyt-form-hint">\u5173\u95ED\u540E\uFF0C\u81EA\u52A8\u94FE\u4E0D\u518D\u628A GENERATION_AFTER_COMMANDS \u4F5C\u4E3A\u6D88\u606F\u7EA7 session \u7684\u8865\u5145\u4E8B\u4EF6\u6E90\u3002</div>
          </div>

          <div class="yyt-form-group">
            <label class="yyt-toggle-label">
              <input type="checkbox" class="yyt-toggle" id="yyt-setting-useMessageReceivedFallback" 
                     ${t.useMessageReceivedFallback!==!1?"checked":""}>
              <span>\u542F\u7528 MESSAGE_RECEIVED \u515C\u5E95</span>
            </label>
            <div class="yyt-form-hint">\u5173\u95ED\u540E\uFF0C\u81EA\u52A8\u94FE\u4E0D\u518D\u4F7F\u7528 MESSAGE_RECEIVED \u515C\u5E95\uFF1B\u542F\u7528\u65F6\u4E5F\u53EA\u4F1A\u5438\u6536 assistant \u697C\u5C42\u8FDB\u5165\u540C\u4E00\u6D88\u606F session\u3002</div>
          </div>
        </div>
        
        <div class="yyt-settings-section">
          <div class="yyt-settings-section-title">\u8FC7\u6EE4\u89C4\u5219</div>
          <div class="yyt-form-group">
            <label class="yyt-toggle-label">
              <input type="checkbox" class="yyt-toggle" id="yyt-setting-ignoreQuietGeneration" 
                     ${t.ignoreQuietGeneration?"checked":""}>
              <span>\u5FFD\u7565\u9759\u9ED8\u751F\u6210</span>
            </label>
            <div class="yyt-form-hint">\u542F\u7528\u540E\u4F1A\u8DF3\u8FC7 quiet / dryRun / \u540E\u53F0\u751F\u6210\uFF0C\u51CF\u5C11\u672A\u771F\u6B63\u4EA7\u751F\u56DE\u590D\u65F6\u7684\u8BEF\u89E6\u53D1\u3002</div>
          </div>
          
          <div class="yyt-form-group">
            <label class="yyt-toggle-label">
              <input type="checkbox" class="yyt-toggle" id="yyt-setting-ignoreAutoTrigger" 
                     ${t.ignoreAutoTrigger?"checked":""}>
              <span>\u5FFD\u7565\u81EA\u52A8\u89E6\u53D1</span>
            </label>
            <div class="yyt-form-hint">\u542F\u7528\u540E\u4F1A\u5C3D\u91CF\u8DF3\u8FC7\u201C\u6CA1\u6709\u6700\u8FD1\u7528\u6237\u53D1\u9001\u610F\u56FE\u201D\u7684\u751F\u6210\uFF0C\u51CF\u5C11\u5176\u4ED6\u63D2\u4EF6/\u811A\u672C\u89E6\u53D1\u751F\u6210\u65F6\u7684\u8BEF\u6267\u884C\u3002</div>
          </div>
        </div>
        
        <div class="yyt-settings-section">
          <div class="yyt-settings-section-title">Session \u4E0E\u9632\u6296</div>
          <div class="yyt-form-row">
            <div class="yyt-form-group yyt-flex-1">
              <label>\u9632\u6296\u65F6\u95F4 (ms)</label>
              <div class="yyt-form-hint">\u7528\u4E8E GENERATION_AFTER_COMMANDS / MESSAGE_RECEIVED \u7B49\u515C\u5E95\u4E8B\u4EF6\u7684\u5EF6\u8FDF\u8C03\u5EA6\u4E0E\u53BB\u6296\u3002</div>
              <input type="number" class="yyt-input" id="yyt-setting-debounceMs" 
                     value="${t.debounceMs}" min="0" max="5000" step="100">
            </div>
            <div class="yyt-form-group yyt-flex-1">
              <label>\u6D88\u606F Session \u7A97\u53E3 (ms)</label>
              <div class="yyt-form-hint">\u540C\u4E00\u6761\u6D88\u606F\u5728\u8BE5\u7A97\u53E3\u5185\u547D\u4E2D\u7684\u591A\u79CD\u5BBF\u4E3B\u4E8B\u4EF6\u4F1A\u88AB\u805A\u5408\u8FDB\u540C\u4E00 session\u3002</div>
              <input type="number" class="yyt-input" id="yyt-setting-messageSessionWindowMs" 
                     value="${t.messageSessionWindowMs||1800}" min="300" max="10000" step="100">
            </div>
          </div>
          <div class="yyt-form-group">
            <label>\u8BCA\u65AD\u5386\u53F2\u4FDD\u7559\u6761\u6570</label>
            <div class="yyt-form-hint">\u63A7\u5236\u6D88\u606F\u7EA7 session \u5386\u53F2\u4E0E\u5355\u5DE5\u5177\u6700\u8FD1\u89E6\u53D1 / \u5199\u56DE\u5386\u53F2\u7684\u4FDD\u7559\u6570\u91CF\uFF0C\u907F\u514D\u8BCA\u65AD\u4FE1\u606F\u65E0\u9650\u81A8\u80C0\u3002</div>
            <input type="number" class="yyt-input" id="yyt-setting-historyRetentionLimit" 
                   value="${t.historyRetentionLimit||10}" min="1" max="50" step="1">
          </div>
        </div>
      </div>
    `},_renderDebugTab(t){return`
      <div class="yyt-settings-tab-content" data-tab="debug">
        <div class="yyt-settings-section">
          <div class="yyt-settings-section-title">\u65E5\u5FD7\u8BBE\u7F6E</div>
          <div class="yyt-form-group">
            <label class="yyt-toggle-label">
              <input type="checkbox" class="yyt-toggle" id="yyt-setting-enableDebugLog" 
                     ${t.enableDebugLog?"checked":""}>
              <span>\u542F\u7528\u8C03\u8BD5\u65E5\u5FD7</span>
            </label>
            <div class="yyt-form-hint">\u5728\u63A7\u5236\u53F0\u8F93\u51FA\u8BE6\u7EC6\u7684\u8C03\u8BD5\u4FE1\u606F</div>
          </div>
          
          <div class="yyt-form-group">
            <label class="yyt-toggle-label">
              <input type="checkbox" class="yyt-toggle" id="yyt-setting-saveExecutionHistory" 
                     ${t.saveExecutionHistory?"checked":""}>
              <span>\u4FDD\u5B58\u6267\u884C\u5386\u53F2</span>
            </label>
            <div class="yyt-form-hint">\u8BB0\u5F55\u5DE5\u5177\u6267\u884C\u5386\u53F2\uFF0C\u4FBF\u4E8E\u95EE\u9898\u6392\u67E5</div>
          </div>
        </div>
        
        <div class="yyt-settings-section">
          <div class="yyt-settings-section-title">UI \u663E\u793A</div>
          <div class="yyt-form-group">
            <label class="yyt-toggle-label">
              <input type="checkbox" class="yyt-toggle" id="yyt-setting-showRuntimeBadge" 
                     ${t.showRuntimeBadge?"checked":""}>
              <span>\u663E\u793A\u8FD0\u884C\u72B6\u6001\u5FBD\u7AE0</span>
            </label>
            <div class="yyt-form-hint">\u5728\u5DE5\u5177\u5361\u7247\u4E0A\u663E\u793A\u8FD0\u884C\u72B6\u6001\u6307\u793A\u5668</div>
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
            <label class="yyt-toggle-label">
              <input type="checkbox" class="yyt-toggle" id="yyt-setting-compactMode" 
                     ${t.compactMode?"checked":""}>
              <span>\u7D27\u51D1\u6A21\u5F0F</span>
            </label>
            <div class="yyt-form-hint">\u51CF\u5C11\u5361\u7247\u95F4\u8DDD\uFF0C\u663E\u793A\u66F4\u591A\u5185\u5BB9</div>
          </div>
          
          <div class="yyt-form-group">
            <label class="yyt-toggle-label">
              <input type="checkbox" class="yyt-toggle" id="yyt-setting-animationEnabled" 
                     ${t.animationEnabled?"checked":""}>
              <span>\u542F\u7528\u52A8\u753B\u6548\u679C</span>
            </label>
            <div class="yyt-form-hint">\u754C\u9762\u8FC7\u6E21\u548C\u4EA4\u4E92\u52A8\u753B</div>
          </div>
        </div>
      </div>
    `},bindEvents(t,e){let s=H();!s||!V(t)||(t.find(".yyt-settings-tab").on("click",n=>{let r=s(n.currentTarget).data("tab");t.find(".yyt-settings-tab").removeClass("yyt-active"),s(n.currentTarget).addClass("yyt-active"),t.find(".yyt-settings-tab-content").removeClass("yyt-active"),t.find(`.yyt-settings-tab-content[data-tab="${r}"]`).addClass("yyt-active")}),t.find("#yyt-settings-save").on("click",()=>{this._saveSettings(t,s)}),t.find("#yyt-settings-reset").on("click",()=>{confirm("\u786E\u5B9A\u8981\u91CD\u7F6E\u6240\u6709\u8BBE\u7F6E\u4E3A\u9ED8\u8BA4\u503C\u5417\uFF1F")&&(ke.resetSettings(),Vr(vs.ui,Is()),this.renderTo(t),m("success","\u8BBE\u7F6E\u5DF2\u91CD\u7F6E"))}))},_saveSettings(t,e){let s={executor:{maxConcurrent:parseInt(t.find("#yyt-setting-maxConcurrent").val())||3,maxRetries:parseInt(t.find("#yyt-setting-maxRetries").val())||2,retryDelayMs:parseInt(t.find("#yyt-setting-retryDelayMs").val())||5e3,requestTimeoutMs:parseInt(t.find("#yyt-setting-requestTimeoutMs").val())||9e4,queueStrategy:t.find("#yyt-setting-queueStrategy").val()||"fifo"},listener:{listenGenerationEnded:t.find("#yyt-setting-listenGenerationEnded").is(":checked"),ignoreQuietGeneration:t.find("#yyt-setting-ignoreQuietGeneration").is(":checked"),ignoreAutoTrigger:t.find("#yyt-setting-ignoreAutoTrigger").is(":checked"),debounceMs:parseInt(t.find("#yyt-setting-debounceMs").val())||300,useGenerationAfterCommandsFallback:t.find("#yyt-setting-useGenerationAfterCommandsFallback").is(":checked"),useMessageReceivedFallback:t.find("#yyt-setting-useMessageReceivedFallback").is(":checked"),messageSessionWindowMs:parseInt(t.find("#yyt-setting-messageSessionWindowMs").val())||1800,historyRetentionLimit:parseInt(t.find("#yyt-setting-historyRetentionLimit").val())||10},debug:{enableDebugLog:t.find("#yyt-setting-enableDebugLog").is(":checked"),saveExecutionHistory:t.find("#yyt-setting-saveExecutionHistory").is(":checked"),showRuntimeBadge:t.find("#yyt-setting-showRuntimeBadge").is(":checked")},ui:{theme:t.find("#yyt-setting-theme").val()||"dark-blue",compactMode:t.find("#yyt-setting-compactMode").is(":checked"),animationEnabled:t.find("#yyt-setting-animationEnabled").is(":checked")}};ke.saveSettings(s),Vr(s.ui,Is()),m("success","\u8BBE\u7F6E\u5DF2\u4FDD\u5B58")},destroy(t){!H()||!V(t)||t.find("*").off()},getStyles(){return`
      /* \u8BBE\u7F6E\u9762\u677F\u6837\u5F0F */
      .yyt-settings-panel {
        display: flex;
        flex-direction: column;
        height: 100%;
        gap: 10px;
      }

      .yyt-settings-hero {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 12px;
        padding: 12px 14px;
        border-radius: 18px;
        border: 1px solid rgba(255, 255, 255, 0.08);
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.045) 0%, rgba(255, 255, 255, 0.015) 100%);
      }

      .yyt-settings-hero-copy {
        display: flex;
        flex-direction: column;
        gap: 6px;
        min-width: 0;
      }

      .yyt-settings-hero-title {
        font-size: 18px;
        font-weight: 800;
        color: var(--yyt-text);
        line-height: 1.15;
      }

      .yyt-settings-hero-desc {
        font-size: 12px;
        color: var(--yyt-text-secondary);
        line-height: 1.55;
        max-width: 72ch;
      }

      .yyt-settings-hero-status {
        display: flex;
        align-items: center;
        gap: 6px;
        flex-wrap: wrap;
        justify-content: flex-end;
      }

      .yyt-settings-status-chip {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 6px 10px;
        border-radius: 999px;
        font-size: 10px;
        font-weight: 700;
        letter-spacing: 0.3px;
        border: 1px solid rgba(255, 255, 255, 0.08);
      }

      .yyt-settings-status-chip.is-on {
        color: var(--yyt-success);
        background: rgba(74, 222, 128, 0.1);
      }

      .yyt-settings-status-chip.is-off {
        color: var(--yyt-text-secondary);
        background: rgba(255, 255, 255, 0.05);
      }

      .yyt-settings-status-chip.is-neutral {
        color: var(--yyt-accent);
        background: rgba(123, 183, 255, 0.1);
      }
      
      .yyt-settings-tabs {
        display: flex;
        gap: 4px;
        padding: 6px;
        background: rgba(255, 255, 255, 0.02);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 14px;
        flex-shrink: 0;
      }
      
      .yyt-settings-tab {
        padding: 8px 12px;
        background: transparent;
        border: 1px solid transparent;
        border-radius: 8px;
        color: var(--yyt-text-muted);
        font-size: 13px;
        cursor: pointer;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        gap: 8px;
      }
      
      .yyt-settings-tab:hover {
        background: rgba(255, 255, 255, 0.04);
        color: var(--yyt-text);
      }
      
      .yyt-settings-tab.yyt-active {
        background: rgba(123, 183, 255, 0.1);
        border-color: rgba(123, 183, 255, 0.3);
        color: var(--yyt-accent);
      }
      
      .yyt-settings-content {
        flex: 1;
        overflow-y: auto;
        padding: 4px;
      }
      
      .yyt-settings-tab-content {
        display: none;
      }
      
      .yyt-settings-tab-content.yyt-active {
        display: block;
      }
      
      .yyt-settings-section {
        margin-bottom: 14px;
        padding: 14px;
        border-radius: 16px;
        border: 1px solid rgba(255, 255, 255, 0.08);
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.035) 0%, rgba(255, 255, 255, 0.015) 100%);
      }
      
      .yyt-settings-section-title {
        font-size: 13px;
        font-weight: 600;
        color: var(--yyt-text);
        margin-bottom: 12px;
        padding-bottom: 8px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.06);
      }
      
      .yyt-form-row {
        display: flex;
        gap: 16px;
      }
      
      .yyt-form-group {
        margin-bottom: 16px;
      }
      
      .yyt-form-group label {
        display: block;
        font-size: 12px;
        font-weight: 500;
        color: var(--yyt-text);
        margin-bottom: 6px;
      }
      
      .yyt-form-hint {
        font-size: 11px;
        color: var(--yyt-text-muted);
        margin-bottom: 8px;
      }
      
      .yyt-toggle-label {
        display: flex;
        align-items: center;
        gap: 10px;
        cursor: pointer;
      }
      
      .yyt-toggle-label span {
        font-size: 13px;
        color: var(--yyt-text);
      }
      
      .yyt-settings-footer {
        display: flex;
        justify-content: flex-end;
        gap: 12px;
        padding: 10px 0 0;
        background: rgba(255, 255, 255, 0.02);
        border-top: 1px solid rgba(255, 255, 255, 0.08);
        flex-shrink: 0;
      }

      @media screen and (max-width: 768px) {
        .yyt-settings-hero {
          flex-direction: column;
        }

        .yyt-settings-hero-status {
          justify-content: flex-start;
        }

        .yyt-form-row {
          flex-direction: column;
        }
      }
    `},renderTo(t){let e=this.render({});t.html(e),this.bindEvents(t,{})}},cc=yt});var wa={};de(wa,{ApiPresetPanel:()=>Le,BypassPanel:()=>Bt,RegexExtractPanel:()=>Ue,SCRIPT_ID:()=>y,SettingsPanel:()=>yt,StatusBlockPanel:()=>Fe,SummaryToolPanel:()=>je,ToolManagePanel:()=>Ge,UIManager:()=>us,YouyouReviewPanel:()=>He,bindDialogEvents:()=>Wn,createDialogHtml:()=>Yn,default:()=>dc,downloadJson:()=>it,escapeHtml:()=>v,fillFormWithConfig:()=>Rt,getAllStyles:()=>Ta,getFormApiConfig:()=>vt,getJQuery:()=>H,initUI:()=>Ms,isContainerValid:()=>V,readFileContent:()=>lt,registerComponents:()=>os,renderApiPanel:()=>_n,renderBypassPanel:()=>Sa,renderRegexPanel:()=>An,renderSettingsPanel:()=>Ea,renderStatusBlockPanel:()=>xa,renderSummaryToolPanel:()=>ba,renderToolPanel:()=>In,renderYouyouReviewPanel:()=>va,resetJQueryCache:()=>gi,showToast:()=>m,showTopNotice:()=>Ve,uiManager:()=>ae});function os(){ae.register(Le.id,Le),ae.register(Ue.id,Ue),ae.register(Ge.id,Ge),ae.register(je.id,je),ae.register(Fe.id,Fe),ae.register(He.id,He),ae.register(Bt.id,Bt),ae.register(yt.id,yt),console.log("[UI] \u7EC4\u4EF6\u6CE8\u518C\u5B8C\u6210")}function Ms(t={}){let{autoInjectStyles:e=!0,targetDocument:s,...n}=t;ae.init(n),os(),e&&ae.injectStyles(s),console.log("[UI] \u6A21\u5757\u521D\u59CB\u5316\u5B8C\u6210")}function At(t,e,s={}){ae.render(t,e,s)}function _n(t){At(Le.id,t)}function An(t){At(Ue.id,t)}function In(t){At(Ge.id,t)}function ba(t){At(je.id,t)}function xa(t){At(Fe.id,t)}function va(t){At(He.id,t)}function Sa(t){At(Bt.id,t)}function Ea(t){At(yt.id,t)}function Ta(){return ae.getAllStyles()}var dc,qr=j(()=>{Vn();qn();tr();fr();Fr();Hr();Kr();Yr();wn();qe();Vn();qn();tr();fr();Fr();Hr();Kr();Yr();wn();dc={uiManager:ae,ApiPresetPanel:Le,RegexExtractPanel:Ue,ToolManagePanel:Ge,SummaryToolPanel:je,StatusBlockPanel:Fe,YouyouReviewPanel:He,BypassPanel:Bt,SettingsPanel:yt,registerComponents:os,initUI:Ms,renderApiPanel:_n,renderRegexPanel:An,renderToolPanel:In,renderSummaryToolPanel:ba,renderStatusBlockPanel:xa,renderYouyouReviewPanel:va,renderBypassPanel:Sa,renderSettingsPanel:Ea,getAllStyles:Ta}});var Da={};de(Da,{ApiPresetPanel:()=>Le,RegexExtractPanel:()=>Ue,SCRIPT_ID:()=>y,StatusBlockPanel:()=>Fe,SummaryToolPanel:()=>je,ToolManagePanel:()=>Ge,YouyouReviewPanel:()=>He,default:()=>uc,escapeHtml:()=>v,fillFormWithConfig:()=>Rt,getCurrentTab:()=>Ca,getFormApiConfig:()=>vt,getJQuery:()=>H,getRegexStyles:()=>Pa,getStyles:()=>Ma,getToolStyles:()=>Ra,initUI:()=>Ms,isContainerValid:()=>V,registerComponents:()=>os,render:()=>_a,renderRegex:()=>Aa,renderTool:()=>Ia,setCurrentTab:()=>ka,showToast:()=>m,uiManager:()=>ae});function Jr(t,e){let s=H();return s?t?typeof t=="string"?s(t):t?.jquery?t:s(t):e:(console.error("[YouYouToolkit] jQuery not available"),null)}function _a(t){if(Ps=Jr(t,Ps),!Ps||!Ps.length){console.error("[YouYouToolkit] Container not found or invalid");return}_n(Ps)}function Aa(t){if(Rs=Jr(t,Rs),!Rs||!Rs.length){console.error("[YouYouToolkit] Regex container not found");return}An(Rs)}function Ia(t){if(Cs=Jr(t,Cs),!Cs||!Cs.length){console.error("[YouYouToolkit] Tool container not found");return}In(Cs)}function Ma(){return Le.getStyles()}function Pa(){return Ue.getStyles()}function Ra(){return[Ge.getStyles(),je.getStyles(),Fe.getStyles(),He.getStyles()].join(`
`)}function Ca(){return ae.getCurrentTab()}function ka(t){ae.switchTab(t)}var Ps,Rs,Cs,uc,$a=j(()=>{qr();Ps=null,Rs=null,Cs=null;uc={render:_a,renderRegex:Aa,renderTool:Ia,getStyles:Ma,getRegexStyles:Pa,getToolStyles:Ra,getCurrentTab:Ca,setCurrentTab:ka,uiManager:ae,ApiPresetPanel:Le,RegexExtractPanel:Ue,ToolManagePanel:Ge,SummaryToolPanel:je,StatusBlockPanel:Fe,YouyouReviewPanel:He,registerComponents:os,initUI:Ms,SCRIPT_ID:y,escapeHtml:v,showToast:m,getJQuery:H,isContainerValid:V,getFormApiConfig:vt,fillFormWithConfig:Rt}});var Na={};de(Na,{WindowManager:()=>Mn,closeWindow:()=>fc,createWindow:()=>gc,windowManager:()=>$e});function yc(){if($e.stylesInjected)return;$e.stylesInjected=!0;let t=`
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
  `,e=document.createElement("style");e.id=pc+"_styles",e.textContent=t,(document.head||document.documentElement).appendChild(e)}function gc(t){let{id:e,title:s="\u7A97\u53E3",content:n="",width:r=900,height:o=700,modal:a=!1,resizable:i=!0,maximizable:l=!0,startMaximized:c=!1,rememberState:u=!0,onClose:d,onReady:h}=t;yc();let g=window.jQuery||window.parent?.jQuery;if(!g)return console.error("[WindowManager] jQuery not available"),null;if($e.isOpen(e))return $e.bringToFront(e),$e.getWindow(e);let b=window.innerWidth||1200,G=window.innerHeight||800,F=b<=1100,re=null,be=!1;u&&(re=$e.getState(e),re&&!F&&(be=!0));let pe,M;be&&re.width&&re.height?(pe=Math.max(400,Math.min(re.width,b-40)),M=Math.max(300,Math.min(re.height,G-40))):(pe=Math.max(400,Math.min(r,b-40)),M=Math.max(300,Math.min(o,G-40)));let N=Math.max(20,Math.min((b-pe)/2,b-pe-20)),$=Math.max(20,Math.min((G-M)/2,G-M-20)),K=l&&!F,Te=`
    <div class="yyt-window" id="${e}" style="left:${N}px; top:${$}px; width:${pe}px; height:${M}px;">
      <div class="yyt-window-header">
        <div class="yyt-window-title">
          <i class="fa-solid fa-window-maximize"></i>
          <span>${mc(s)}</span>
        </div>
        <div class="yyt-window-controls">
          ${K?'<button class="yyt-window-btn maximize" title="\u6700\u5927\u5316/\u8FD8\u539F"><i class="fa-solid fa-expand"></i></button>':""}
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
  `,me=null;a&&(me=g(`<div class="yyt-window-overlay" data-for="${e}"></div>`),g(document.body).append(me));let R=g(Te);g(document.body).append(R),$e.register(e,R),R.on("mousedown",()=>$e.bringToFront(e));let ie=!1,Pe={left:N,top:$,width:pe,height:M},Re=()=>{Pe={left:parseInt(R.css("left")),top:parseInt(R.css("top")),width:R.width(),height:R.height()},R.addClass("maximized"),R.find(".yyt-window-btn.maximize i").removeClass("fa-expand").addClass("fa-compress"),ie=!0},ve=()=>{R.removeClass("maximized"),R.css({left:Pe.left+"px",top:Pe.top+"px",width:Pe.width+"px",height:Pe.height+"px"}),R.find(".yyt-window-btn.maximize i").removeClass("fa-compress").addClass("fa-expand"),ie=!1};R.find(".yyt-window-btn.maximize").on("click",()=>{ie?ve():Re()}),(F&&l||be&&re.isMaximized&&l||c&&l)&&Re(),R.find(".yyt-window-btn.close").on("click",()=>{if(u&&l){let le={width:ie?Pe.width:R.width(),height:ie?Pe.height:R.height(),isMaximized:ie};$e.saveState(e,le)}d&&d(),me&&me.remove(),R.remove(),$e.unregister(e),g(document).off(".yytWindowDrag"+e),g(document).off(".yytWindowResize"+e)}),me&&me.on("click",le=>{le.target,me[0]});let Ke=!1,gt,st,Oe,nt;if(R.find(".yyt-window-header").on("mousedown",le=>{g(le.target).closest(".yyt-window-controls").length||ie||(Ke=!0,gt=le.clientX,st=le.clientY,Oe=parseInt(R.css("left")),nt=parseInt(R.css("top")),g(document.body).css("user-select","none"))}),g(document).on("mousemove.yytWindowDrag"+e,le=>{if(!Ke)return;let ce=le.clientX-gt,rt=le.clientY-st;R.css({left:Math.max(0,Oe+ce)+"px",top:Math.max(0,nt+rt)+"px"})}),g(document).on("mouseup.yytWindowDrag"+e,()=>{Ke&&(Ke=!1,g(document.body).css("user-select",""))}),i){let le=!1,ce="",rt,zt,Ye,p,f,x;R.find(".yyt-window-resize-handle").on("mousedown",function(S){ie||(le=!0,ce="",g(this).hasClass("se")?ce="se":g(this).hasClass("e")?ce="e":g(this).hasClass("s")?ce="s":g(this).hasClass("w")?ce="w":g(this).hasClass("n")?ce="n":g(this).hasClass("nw")?ce="nw":g(this).hasClass("ne")?ce="ne":g(this).hasClass("sw")&&(ce="sw"),rt=S.clientX,zt=S.clientY,Ye=R.width(),p=R.height(),f=parseInt(R.css("left")),x=parseInt(R.css("top")),g(document.body).css("user-select","none"),S.stopPropagation())}),g(document).on("mousemove.yytWindowResize"+e,S=>{if(!le)return;let U=S.clientX-rt,B=S.clientY-zt,Q=400,D=300,Z=Ye,oe=p,Ae=f,We=x;if(ce.includes("e")&&(Z=Math.max(Q,Ye+U)),ce.includes("s")&&(oe=Math.max(D,p+B)),ce.includes("w")){let Ie=Ye-U;Ie>=Q&&(Z=Ie,Ae=f+U)}if(ce.includes("n")){let Ie=p-B;Ie>=D&&(oe=Ie,We=x+B)}R.css({width:Z+"px",height:oe+"px",left:Ae+"px",top:We+"px"})}),g(document).on("mouseup.yytWindowResize"+e,()=>{le&&(le=!1,g(document.body).css("user-select",""))})}return R.on("remove",()=>{g(document).off(".yytWindowDrag"+e),g(document).off(".yytWindowResize"+e)}),h&&setTimeout(()=>h(R),50),R}function fc(t){let e=$e.getWindow(t);if(e){let s=window.jQuery||window.parent?.jQuery;s&&(s(`.yyt-window-overlay[data-for="${t}"]`).remove(),s(document).off(".yytWindowDrag"+t),s(document).off(".yytWindowResize"+t)),e.remove(),$e.unregister(t)}}function mc(t){return typeof t!="string"?"":t.replace(/&/g,"&").replace(/</g,"<").replace(/>/g,">").replace(/"/g,'"').replace(/'/g,"&#039;")}var pc,Oa,Mn,$e,La=j(()=>{ht();pc="youyou_toolkit_window_manager",Oa="window_states",Mn=class{constructor(){this.windows=new Map,this.baseZIndex=1e4,this.topZIndex=1e4,this.stylesInjected=!1}register(e,s){this.topZIndex++,this.windows.set(e,{$el:s,zIndex:this.topZIndex}),s.css("z-index",this.topZIndex)}unregister(e){this.windows.delete(e)}bringToFront(e){let s=this.windows.get(e);s&&(this.topZIndex++,s.zIndex=this.topZIndex,s.$el.css("z-index",this.topZIndex))}getWindow(e){return this.windows.get(e)?.$el||null}isOpen(e){return this.windows.has(e)}closeAll(){this.windows.forEach((e,s)=>{e.$el&&e.$el.remove()}),this.windows.clear()}saveState(e,s){let n=this.loadStates();n[e]={...s,updatedAt:Date.now()},as.set(Oa,n)}loadStates(){return as.get(Oa)||{}}getState(e){return this.loadStates()[e]||null}},$e=new Mn});var Ua={};de(Ua,{DEFAULT_PROMPT_SEGMENTS:()=>Pn,PromptEditor:()=>Rn,default:()=>wc,getPromptEditorStyles:()=>vc,messagesToSegments:()=>Tc,segmentsToMessages:()=>Ec,validatePromptSegments:()=>Sc});function vc(){return`
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
  `}function Sc(t){let e=[];return Array.isArray(t)?(t.forEach((s,n)=>{s.id||e.push(`\u6BB5\u843D ${n+1} \u7F3A\u5C11ID`),s.role||e.push(`\u6BB5\u843D ${n+1} \u7F3A\u5C11role\u5B57\u6BB5`),["SYSTEM","USER","assistant"].includes(s.role)||e.push(`\u6BB5\u843D ${n+1} \u7684role\u503C\u65E0\u6548: ${s.role}`)}),{valid:e.length===0,errors:e}):{valid:!1,errors:["\u63D0\u793A\u8BCD\u6570\u636E\u5FC5\u987B\u662F\u6570\u7EC4"]}}function Ec(t){return t.filter(e=>e.content&&e.content.trim()).map(e=>({role:e.role,content:e.content,deletable:e.deletable,mainSlot:e.mainSlot}))}function Tc(t){return Array.isArray(t)?t.map((e,s)=>({id:`segment_${s}_${Date.now()}`,type:e.role==="SYSTEM"?"system":e.role==="assistant"?"ai":"user",role:e.role,mainSlot:e.mainSlot||"",content:e.content||"",deletable:e.deletable!==!1,expanded:!0,isMain:e.mainSlot==="A"||e.isMain,isMain2:e.mainSlot==="B"||e.isMain2})):[...Pn]}var hc,bc,xc,Pn,Rn,wc,Ga=j(()=>{hc="youyou_toolkit_prompt_editor",bc={system:"System Prompt (\u7CFB\u7EDF\u63D0\u793A\u8BCD)",ai:"AI Prompt (AI\u6307\u4EE4\u63D0\u793A\u8BCD)",user:"User Prompt (\u7528\u6237\u63D0\u793A\u8BCD)"},xc={system:"fa-server",ai:"fa-robot",user:"fa-user"},Pn=[{id:"system_1",type:"system",role:"SYSTEM",mainSlot:"",content:"",deletable:!1,expanded:!0},{id:"ai_1",type:"ai",role:"USER",mainSlot:"A",content:"",deletable:!1,expanded:!0,isMain:!0},{id:"user_1",type:"user",role:"USER",mainSlot:"B",content:"",deletable:!1,expanded:!0,isMain2:!0}],Rn=class{constructor(e={}){this.containerId=e.containerId||hc,this.segments=e.segments||[...Pn],this.onChange=e.onChange||null,this.editable=e.editable!==!1,this.showMainSlot=e.showMainSlot!==!1,this.$container=null,this.$=null}init(e){if(this.$=window.jQuery||window.parent?.jQuery,!this.$){console.error("[PromptEditor] jQuery not available");return}this.$container=e,this.render(),this.bindEvents()}setSegments(e){this.segments=e&&Array.isArray(e)?[...e]:[...Pn],this.$container&&(this.render(),this.bindEvents())}getSegments(){return this.segments.map(e=>({...e,content:this.getSegmentContent(e.id)}))}getSegmentContent(e){return this.$container&&this.$container.find(`[data-segment-id="${e}"] .yyt-prompt-textarea`).val()||""}render(){if(!this.$container)return;let e=`
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
    `;this.$container.html(e)}renderSegment(e){let s=bc[e.type]||e.type,n=xc[e.type]||"fa-file",r=e.mainSlot==="A"||e.isMain,o=e.mainSlot==="B"||e.isMain2,a=r?"var(--yyt-accent, #7bb7ff)":o?"#ffb74d":"",i=this.showMainSlot&&e.mainSlot?`<span class="yyt-prompt-slot-badge">mainSlot: ${e.mainSlot}</span>`:"",l=`<span class="yyt-prompt-role-badge">role: ${e.role||"USER"}</span>`;return`
      <div class="yyt-prompt-segment ${e.expanded?"yyt-expanded":""} ${r?"yyt-main-a":""} ${o?"yyt-main-b":""}" 
           data-segment-id="${e.id}" 
           data-segment-type="${e.type}"
           style="${a?`border-left: 3px solid ${a};`:""}">
        <div class="yyt-prompt-segment-header">
          <div class="yyt-prompt-segment-info">
            <i class="fa-solid ${n}"></i>
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
    `}bindEvents(){this.$container&&(this.$container.find(".yyt-prompt-toggle").on("click",e=>{this.$(e.currentTarget).closest(".yyt-prompt-segment").toggleClass("yyt-expanded"),this.$(e.currentTarget).find("i").toggleClass("fa-chevron-up fa-chevron-down")}),this.$container.find(".yyt-prompt-delete").on("click",e=>{let s=this.$(e.currentTarget).closest(".yyt-prompt-segment").data("segment-id");this.deleteSegment(s)}),this.$container.find(".yyt-prompt-role").on("change",e=>{let s=this.$(e.currentTarget).closest(".yyt-prompt-segment").data("segment-id"),n=this.$(e.currentTarget).val();this.updateSegmentMeta(s,{role:n})}),this.$container.find(".yyt-prompt-main-slot").on("change",e=>{let s=this.$(e.currentTarget).closest(".yyt-prompt-segment").data("segment-id"),n=this.$(e.currentTarget).val();this.updateSegmentMeta(s,{mainSlot:n})}),this.$container.find(".yyt-prompt-textarea").on("input",e=>{this.onChange&&this.onChange(this.getSegments())}),this.$container.find(`#${this.containerId}-add-segment`).on("click",()=>{this.addSegment()}),this.$container.find(`#${this.containerId}-import-prompt`).on("click",()=>{this.importPrompt()}),this.$container.find(`#${this.containerId}-export-prompt`).on("click",()=>{this.exportPrompt()}))}addSegment(e=null){let s=`segment_${Date.now()}`,n=e||{id:s,type:"user",role:"USER",mainSlot:"",content:"",deletable:!0,expanded:!0};n.id||(n.id=s),this.segments.push(n),this.render(),this.bindEvents(),this.onChange&&this.onChange(this.getSegments())}deleteSegment(e){let s=this.segments.findIndex(r=>r.id===e);if(s===-1)return;if(this.segments[s].deletable===!1){console.warn("[PromptEditor] \u8BE5\u6BB5\u843D\u4E0D\u53EF\u5220\u9664");return}this.segments.splice(s,1),this.render(),this.bindEvents(),this.onChange&&this.onChange(this.getSegments())}updateSegmentMeta(e,s){let n=this.segments.find(r=>r.id===e);n&&(Object.assign(n,s),this.onChange&&this.onChange(this.getSegments()))}importPrompt(){let e=document.createElement("input");e.type="file",e.accept=".json",e.onchange=s=>{let n=s.target.files[0];if(!n)return;let r=new FileReader;r.onload=o=>{try{let a=JSON.parse(o.target.result);Array.isArray(a)?(this.setSegments(a),console.log("[PromptEditor] \u63D0\u793A\u8BCD\u5BFC\u5165\u6210\u529F")):console.error("[PromptEditor] \u65E0\u6548\u7684\u63D0\u793A\u8BCD\u683C\u5F0F")}catch(a){console.error("[PromptEditor] \u5BFC\u5165\u5931\u8D25:",a)}},r.readAsText(n)},e.click()}exportPrompt(){let e=this.getSegments(),s=JSON.stringify(e,null,2),n=new Blob([s],{type:"application/json"}),r=URL.createObjectURL(n),o=document.createElement("a");o.href=r,o.download=`prompt_group_${Date.now()}.json`,o.click(),URL.revokeObjectURL(r),console.log("[PromptEditor] \u63D0\u793A\u8BCD\u5DF2\u5BFC\u51FA")}escapeHtml(e){return typeof e!="string"?"":e.replace(/&/g,"&").replace(/</g,"<").replace(/>/g,">").replace(/"/g,'"').replace(/'/g,"&#039;")}};wc=Rn});function Ba(t,e={}){let{constants:s,topLevelWindow:n,modules:r}=t,{SCRIPT_ID:o,SCRIPT_VERSION:a,MENU_ITEM_ID:i,MENU_CONTAINER_ID:l}=s,c=null,u=!1;function d(...M){console.log(`[${o}]`,...M)}function h(...M){console.error(`[${o}]`,...M)}async function g(){return c||(c=(async()=>{try{return r.storageModule=await Promise.resolve().then(()=>(ls(),so)),r.apiConnectionModule=await Promise.resolve().then(()=>(Ds(),oo)),r.presetManagerModule=await Promise.resolve().then(()=>(Ls(),ao)),r.uiModule=await Promise.resolve().then(()=>(qr(),wa)),r.uiComponentsModule=await Promise.resolve().then(()=>($a(),Da)),r.regexExtractorModule=await Promise.resolve().then(()=>(Vs(),xo)),r.toolManagerModule=await Promise.resolve().then(()=>(Xs(),vo)),r.toolExecutorModule=await Promise.resolve().then(()=>(Sr(),Fo)),r.toolTriggerModule=await Promise.resolve().then(()=>(jr(),pa)),r.windowManagerModule=await Promise.resolve().then(()=>(La(),Na)),r.toolRegistryModule=await Promise.resolve().then(()=>(Qt(),Lo)),r.promptEditorModule=await Promise.resolve().then(()=>(Ga(),Ua)),r.settingsServiceModule=await Promise.resolve().then(()=>(Ss(),Go)),r.bypassManagerModule=await Promise.resolve().then(()=>(xs(),Uo)),r.variableResolverModule=await Promise.resolve().then(()=>(Tr(),Wo)),r.contextInjectorModule=await Promise.resolve().then(()=>(Er(),Ko)),r.toolPromptServiceModule=await Promise.resolve().then(()=>(wr(),qo)),r.toolOutputServiceModule=await Promise.resolve().then(()=>(_r(),Jo)),r.toolOutputServiceModule?.toolOutputService&&r.apiConnectionModule&&r.toolOutputServiceModule.toolOutputService.setApiConnection(r.apiConnectionModule),!0}catch(M){return c=null,console.warn(`[${o}] \u6A21\u5757\u52A0\u8F7D\u5931\u8D25\uFF0C\u4F7F\u7528\u5185\u7F6E\u529F\u80FD:`,M),!1}})(),c)}function b(){return`
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
        --yyt-surface-hover: rgba(255, 255, 255, 0.06);
        --yyt-surface-active: rgba(255, 255, 255, 0.08);
        --yyt-border: rgba(255, 255, 255, 0.08);
        --yyt-border-strong: rgba(255, 255, 255, 0.15);
        --yyt-text: rgba(255, 255, 255, 0.95);
        --yyt-text-secondary: rgba(255, 255, 255, 0.7);
        --yyt-text-muted: rgba(255, 255, 255, 0.45);
        --yyt-radius: 12px;
        --yyt-radius-sm: 8px;
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
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.55);
        backdrop-filter: blur(4px);
        -webkit-backdrop-filter: blur(4px);
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
        width: min(1500px, calc(100vw - 4px));
        max-width: calc(100vw - 4px);
        height: min(1120px, calc(100vh - 4px));
        max-height: calc(100vh - 4px);
        background:
          radial-gradient(1200px 600px at 10% -10%, var(--yyt-bg-gradient-1), transparent 60%),
          radial-gradient(900px 500px at 100% 0%, var(--yyt-bg-gradient-2), transparent 55%),
          linear-gradient(180deg, rgba(255, 255, 255, 0.02), transparent 22%),
          var(--yyt-bg-base);
        border: 1px solid rgba(255, 255, 255, 0.15);
        border-radius: 16px;
        box-shadow: 0 25px 80px rgba(0, 0, 0, 0.65), 0 0 60px rgba(123, 183, 255, 0.1);
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", Roboto, Arial, sans-serif;
        color: var(--yyt-text);
        z-index: 10000;
      }

      /* \u5F39\u7A97\u5934\u90E8 */
      .yyt-popup-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 14px 20px;
        background: var(--yyt-surface-hover);
        border-bottom: 1px solid var(--yyt-border);
        border-radius: 16px 16px 0 0;
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
        width: 32px;
        height: 32px;
        border: none;
        border-radius: 8px;
        background: var(--yyt-surface-hover);
        color: var(--yyt-text-secondary);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
      }

      .yyt-popup-close:hover {
        background: rgba(255, 107, 107, 0.25);
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
        gap: 14px;
      }

      .yyt-content-frame {
        flex: 1;
        min-height: 0;
        padding: 6px;
        border-radius: 18px;
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.035) 0%, rgba(255, 255, 255, 0.015) 100%);
        border: 1px solid rgba(255, 255, 255, 0.06);
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
      }

      /* \u5F39\u7A97\u5E95\u90E8 */
      .yyt-popup-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 10px;
        padding: 14px 20px;
        background: var(--yyt-surface);
        border-top: 1px solid var(--yyt-border);
        border-radius: 0 0 16px 16px;
        flex-shrink: 0;
      }

      .yyt-popup-footer-left,
      .yyt-popup-footer-right {
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .yyt-popup-status {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 8px 12px;
        border-radius: 999px;
        font-size: 12px;
        color: var(--yyt-text-secondary);
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.08);
      }

      .yyt-popup-status i {
        color: var(--yyt-accent);
      }

      /* \u4E3B\u9876\u680F */
      .yyt-shell-topbar {
        display: grid;
        grid-template-columns: minmax(0, 1fr) minmax(280px, 340px);
        gap: 18px;
        padding: 18px 20px;
        border-radius: 18px;
        border: 1px solid rgba(255, 255, 255, 0.07);
        background:
          radial-gradient(600px 240px at 0% 0%, rgba(123, 183, 255, 0.12), transparent 65%),
          linear-gradient(135deg, rgba(255, 255, 255, 0.045) 0%, rgba(255, 255, 255, 0.02) 100%);
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
        font-weight: 700;
        letter-spacing: 0.4px;
        text-transform: uppercase;
      }

      .yyt-shell-heading {
        font-size: 24px;
        font-weight: 800;
        line-height: 1.1;
        color: var(--yyt-text);
      }

      .yyt-shell-overview-text {
        font-size: 13px;
        line-height: 1.7;
        color: var(--yyt-text-secondary);
      }

      .yyt-shell-current-card {
        display: flex;
        flex-direction: column;
        gap: 6px;
        min-width: 0;
        padding: 14px 16px;
        border-radius: 16px;
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid rgba(255, 255, 255, 0.08);
      }

      .yyt-shell-current-label {
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 0.4px;
        text-transform: uppercase;
        color: var(--yyt-text-muted);
      }

      .yyt-shell-current-page {
        font-size: 15px;
        font-weight: 800;
        line-height: 1.3;
        color: var(--yyt-text);
        word-break: break-word;
      }

      .yyt-shell-current-desc {
        font-size: 12px;
        line-height: 1.6;
        color: var(--yyt-text-secondary);
      }

      .yyt-shell-stats {
        display: grid;
        grid-template-columns: repeat(3, minmax(90px, 1fr));
        gap: 10px;
      }

      .yyt-shell-stat {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 6px;
        min-width: 92px;
        padding: 14px 14px 12px;
        border-radius: 14px;
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.08);
      }

      .yyt-shell-stat-label {
        font-size: 11px;
        color: var(--yyt-text-muted);
      }

      .yyt-shell-stat-value {
        font-size: 22px;
        font-weight: 800;
        line-height: 1;
        color: var(--yyt-text);
      }

      .yyt-shell-workspace {
        flex: 1;
        min-height: 0;
        display: grid;
        grid-template-columns: minmax(220px, 248px) minmax(0, 1fr);
        gap: 14px;
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
        padding: 16px;
        border-radius: 18px;
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
        font-weight: 700;
        color: var(--yyt-text);
      }

      .yyt-shell-sidebar-hint {
        font-size: 11px;
        color: var(--yyt-text-muted);
        text-transform: uppercase;
        letter-spacing: 0.4px;
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
        padding: 14px 16px;
        border-radius: 16px;
        border: 1px dashed rgba(123, 183, 255, 0.18);
        background: rgba(123, 183, 255, 0.05);
        color: var(--yyt-text-secondary);
        font-size: 12px;
        line-height: 1.65;
      }

      .yyt-shell-main {
        min-height: 0;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .yyt-shell-main-header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 16px;
        padding: 16px 18px;
        border-radius: 18px;
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
        gap: 6px;
        min-width: 0;
      }

      .yyt-shell-main-label {
        font-size: 11px;
        font-weight: 700;
        color: var(--yyt-text-muted);
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .yyt-shell-main-title {
        font-size: 20px;
        font-weight: 800;
        line-height: 1.15;
        color: var(--yyt-text);
      }

      .yyt-shell-main-description {
        font-size: 13px;
        line-height: 1.65;
        color: var(--yyt-text-secondary);
      }

      .yyt-shell-main-meta {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 10px 12px;
        border-radius: 14px;
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.08);
        color: var(--yyt-text-secondary);
        font-size: 12px;
        line-height: 1.5;
      }

      .yyt-shell-main-save-btn {
        white-space: nowrap;
        flex-shrink: 0;
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
        gap: 6px;
        padding: 8px 16px;
        border: none;
        border-radius: var(--yyt-radius-sm);
        font-size: 13px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.25s ease;
      }

      .yyt-btn-primary {
        background: linear-gradient(135deg, var(--yyt-accent) 0%, var(--yyt-accent-strong) 100%);
        color: var(--yyt-on-accent);
      }

      .yyt-btn-primary:hover {
        transform: translateY(-1px);
      }

      .yyt-btn-secondary {
        background: linear-gradient(135deg, var(--yyt-surface-active) 0%, var(--yyt-surface) 100%);
        color: var(--yyt-text);
        border: 1px solid var(--yyt-border);
      }

      .yyt-btn-secondary:hover {
        border-color: var(--yyt-border-strong);
      }

      .yyt-btn-danger {
        background: linear-gradient(135deg, rgba(248, 113, 113, 0.15) 0%, rgba(248, 113, 113, 0.05) 100%);
        color: var(--yyt-error);
        border: 1px solid rgba(248, 113, 113, 0.25);
      }

      .yyt-btn-small {
        padding: 6px 10px;
        font-size: 11px;
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
        padding: 10px 14px;
        border: 1px solid var(--yyt-border);
        border-radius: var(--yyt-radius-sm);
        background: rgba(255, 255, 255, 0.03);
        color: var(--yyt-text);
        font-size: 13px;
      }

      .yyt-input:focus,
      .yyt-select:focus,
      .yyt-textarea:focus {
        outline: none;
        border-color: var(--yyt-accent);
      }

      .yyt-input::placeholder,
      .yyt-textarea::placeholder {
        color: var(--yyt-text-muted);
      }

      .yyt-textarea {
        resize: vertical;
        min-height: 80px;
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
      }
    `}async function G(){let M=`${o}-styles`,N=n.document||document;if(N.getElementById(M))return;let $="",K=[];try{K.push(new URL("../styles/main.css",import.meta.url).href)}catch{}try{K.push(new URL("../../styles/main.css",import.meta.url).href)}catch{}K.push("./styles/main.css");for(let me of[...new Set(K.filter(Boolean))])try{let R=await fetch(me);if(R.ok){$=await R.text();break}}catch{}$||(d("\u65E0\u6CD5\u52A0\u8F7D\u5916\u90E8\u6837\u5F0F\u6587\u4EF6\uFF0C\u4F7F\u7528\u5185\u7F6E\u6837\u5F0F"),$=b());let Te=N.createElement("style");Te.id=M,Te.textContent=$,(N.head||N.documentElement).appendChild(Te),d("\u6837\u5F0F\u5DF2\u6CE8\u5165")}function F(){let M=n.document||document;if(r.uiModule?.getAllStyles){let N=`${o}-ui-styles`;if(!M.getElementById(N)){let $=M.createElement("style");$.id=N,$.textContent=r.uiModule.getAllStyles(),(M.head||M.documentElement).appendChild($)}}else if(r.uiComponentsModule){let N=`${o}-ui-styles`;if(!M.getElementById(N)){let $=M.createElement("style");$.id=N,$.textContent=[r.uiComponentsModule.getStyles?.()||"",r.uiComponentsModule.getRegexStyles?.()||"",r.uiComponentsModule.getToolStyles?.()||""].join(`
`),(M.head||M.documentElement).appendChild($)}}if(r.promptEditorModule&&r.promptEditorModule.getPromptEditorStyles){let N=`${o}-prompt-styles`;if(!M.getElementById(N)){let $=M.createElement("style");$.id=N,$.textContent=r.promptEditorModule.getPromptEditorStyles(),(M.head||M.documentElement).appendChild($)}}}async function re(){try{let{applyUiPreferences:M}=await Promise.resolve().then(()=>(wn(),ha));if(r.settingsServiceModule?.settingsService){let N=r.settingsServiceModule.settingsService.getUiSettings();if(N&&N.theme){let $=n.document||document;M(N,$),d(`\u4E3B\u9898\u5DF2\u5E94\u7528: ${N.theme}`)}}}catch(M){d("\u4E3B\u9898\u52A0\u8F7D\u5931\u8D25:",M)}}function be(){let M=n.jQuery||window.jQuery;if(!M){h("jQuery \u672A\u627E\u5230\uFF0C\u5EF6\u8FDF\u91CD\u8BD5..."),setTimeout(be,1e3);return}let N=n.document||document,$=M("#extensionsMenu",N);if(!$.length){d("\u9B54\u68D2\u83DC\u5355\u672A\u627E\u5230\uFF0C\u5EF6\u8FDF\u91CD\u8BD5..."),setTimeout(be,2e3);return}if(M(`#${l}`,$).length>0){d("\u83DC\u5355\u9879\u5DF2\u5B58\u5728");return}let Te=M(`<div class="extension_container interactable" id="${l}" tabindex="0"></div>`),me=`
      <div class="list-group-item flex-container flexGap5 interactable" id="${i}" title="\u6253\u5F00 YouYou \u5DE5\u5177\u7BB1">
        <div class="fa-fw fa-solid fa-wand-magic-sparkles extensionsMenuExtensionButton"></div>
        <span>YouYou \u5DE5\u5177\u7BB1</span>
      </div>
    `,R=M(me);R.on("click",function(Pe){Pe.stopPropagation(),d("\u83DC\u5355\u9879\u88AB\u70B9\u51FB");let Re=M("#extensionsMenuButton",N);Re.length&&$.is(":visible")&&Re.trigger("click"),typeof e.openPopup=="function"&&e.openPopup()}),Te.append(R),$.append(Te),d("\u83DC\u5355\u9879\u5DF2\u6DFB\u52A0\u5230\u9B54\u68D2\u533A")}async function pe(){if(d(`\u521D\u59CB\u5316\u5F00\u59CB... \u7248\u672C: ${a}`),await G(),await g()){if(d("\u6240\u6709\u6A21\u5757\u52A0\u8F7D\u6210\u529F"),!u&&r.uiModule?.initUI)try{r.uiModule.initUI({services:r,autoInjectStyles:!1,targetDocument:n.document||document}),u=!0,d("UI \u88C5\u914D\u4E2D\u5FC3\u5DF2\u521D\u59CB\u5316")}catch($){console.error(`[${o}] UI \u6A21\u5757\u521D\u59CB\u5316\u5931\u8D25:`,$)}if(r.toolTriggerModule?.initTriggerModule)try{r.toolTriggerModule.initTriggerModule(),d("\u5DE5\u5177\u89E6\u53D1\u6A21\u5757\u5DF2\u521D\u59CB\u5316")}catch($){console.error(`[${o}] \u5DE5\u5177\u89E6\u53D1\u6A21\u5757\u521D\u59CB\u5316\u5931\u8D25:`,$)}F(),await re()}else d("\u90E8\u5206\u6A21\u5757\u52A0\u8F7D\u5931\u8D25\uFF0C\u4F7F\u7528\u57FA\u7840\u529F\u80FD");let N=n.document||document;N.readyState==="loading"?N.addEventListener("DOMContentLoaded",()=>{setTimeout(be,1e3)}):setTimeout(be,1e3),d("\u521D\u59CB\u5316\u5B8C\u6210")}return{loadModules:g,injectStyles:G,addMenuItem:be,init:pe,log:d,logError:h}}function za(t){let{constants:e,topLevelWindow:s,modules:n,caches:r,uiState:o}=t,{SCRIPT_ID:a,SCRIPT_VERSION:i,POPUP_ID:l}=e,c={cleanup:null},u={cleanups:[]};function d(...p){console.log(`[${a}]`,...p)}function h(...p){console.error(`[${a}]`,...p)}function g(p){return typeof p!="string"?"":p.replace(/&/g,"&").replace(/</g,"<").replace(/>/g,">").replace(/"/g,'"').replace(/'/g,"&#039;")}function b(){return s.jQuery||window.jQuery}function G(){return s.document||document}function F(p){if(!p)return"\u672A\u9009\u62E9\u9875\u9762";let f=n.toolRegistryModule?.getToolConfig(p);if(!f)return p;if(!f.hasSubTabs)return f.name||p;let x=o.currentSubTab[p]||f.subTabs?.[0]?.id||"",S=f.subTabs?.find(U=>U.id===x);return S?.name?`${f.name} / ${S.name}`:f.name||p}function re(p){if(!p)return"\u8BF7\u9009\u62E9\u5DE6\u4FA7\u5BFC\u822A\u4E2D\u7684\u9875\u9762\u8FDB\u884C\u914D\u7F6E\u6216\u6392\u67E5\u3002";let f=n.toolRegistryModule?.getToolConfig(p);if(!f)return"\u5F53\u524D\u9875\u9762\u63CF\u8FF0\u6682\u4E0D\u53EF\u7528\u3002";if(!f.hasSubTabs)return f.description||"\u5728\u8FD9\u91CC\u7BA1\u7406\u5F53\u524D\u9875\u9762\u7684\u914D\u7F6E\u548C\u64CD\u4F5C\u3002";let x=o.currentSubTab[p]||f.subTabs?.[0]?.id||"";return f.subTabs?.find(U=>U.id===x)?.description||f.description||"\u5728\u8FD9\u91CC\u7BA1\u7406\u5F53\u524D\u5DE5\u5177\u7684\u6A21\u677F\u3001\u914D\u7F6E\u4E0E\u8C03\u8BD5\u80FD\u529B\u3002"}function be(){let p=o.currentPopup;if(!p)return;let f=F(o.currentMainTab),x=re(o.currentMainTab),S=p.querySelector(".yyt-popup-active-label");S&&(S.textContent=`\u5F53\u524D\uFF1A${f}`);let U=p.querySelector(".yyt-shell-breadcrumb");U&&(U.textContent=f);let B=p.querySelector(".yyt-shell-main-title");B&&(B.textContent=f);let Q=p.querySelector(".yyt-shell-main-description");Q&&(Q.textContent=x);let D=p.querySelector(".yyt-shell-current-page");D&&(D.textContent=f);let Z=p.querySelector(".yyt-shell-current-desc");Z&&(Z.textContent=x),pe()}function pe(){let p=o.currentPopup;if(!p)return;let f=p.querySelector(`#${a}-shell-save-btn`);if(!f)return;let x=p.querySelector(".yyt-tab-content.active"),S=x?.querySelector(`#${a}-tool-save-top`)||x?.querySelector(`#${a}-tool-save`);f.hidden=!S}function M(){typeof c.cleanup=="function"&&(c.cleanup(),c.cleanup=null)}function N(){Array.isArray(u.cleanups)&&(u.cleanups.forEach(p=>{typeof p=="function"&&p()}),u.cleanups=[])}function $(p){return!!p?.closest?.(["input","textarea","select","button","a","label","summary","details",'[contenteditable="true"]',".yyt-dialog",".yyt-select-dropdown"].join(","))}function K(p){let f=p?.closest?.(["textarea",".yyt-preview-pre",".yyt-select-dropdown",".yyt-dialog-body"].join(","));return f?f.scrollHeight>f.clientHeight+2||f.scrollWidth>f.clientWidth+2:!1}function Te(p,f){return f?.closest?.(".yyt-scrollable-surface")===p}function me(p,f){return!p||!f?null:[f.closest?.(".yyt-tool-list"),f.closest?.(".yyt-settings-content"),f.closest?.(".yyt-sub-content"),f.closest?.(".yyt-tab-content.active"),p].filter(Boolean).find(S=>S!==p&&!p.contains(S)?!1:S.scrollHeight>S.clientHeight+2||S.scrollWidth>S.clientWidth+2)||p}function R(p){let f=G();if(!p||!f)return;p.classList.add("yyt-scrollable-surface");let x=!1,S=!1,U=0,B=0,Q=0,D=0,Z=!1,oe=!1,Ae=()=>{x=!1,S=!1,p.classList.remove("yyt-scroll-dragging")},We=z=>{z.button===0&&($(z.target)||Te(p,z.target)&&(Z=p.scrollWidth>p.clientWidth+2,oe=p.scrollHeight>p.clientHeight+2,!(!Z&&!oe)&&(z.stopPropagation(),x=!0,S=!1,U=z.clientX,B=z.clientY,Q=p.scrollLeft,D=p.scrollTop)))},Ie=z=>{if(!x)return;let ot=z.clientX-U,Ce=z.clientY-B;!(Math.abs(ot)>4||Math.abs(Ce)>4)&&!S||(S=!0,p.classList.add("yyt-scroll-dragging"),Z&&(p.scrollLeft=Q-ot),oe&&(p.scrollTop=D-Ce),z.preventDefault())},ft=()=>{Ae()},Y=z=>{if(z.ctrlKey||K(z.target))return;let ot=p.classList.contains("yyt-content");if(!ot&&!Te(p,z.target))return;let Ce=me(p,z.target);!Ce||!(Ce.scrollHeight>Ce.clientHeight+2||Ce.scrollWidth>Ce.clientWidth+2)||(Math.abs(z.deltaY)>0&&(Ce.scrollTop+=z.deltaY),Math.abs(z.deltaX)>0&&(Ce.scrollLeft+=z.deltaX),z.preventDefault(),(!ot||Ce!==p)&&z.stopPropagation())},ye=z=>{S&&z.preventDefault()};p.addEventListener("mousedown",We),p.addEventListener("wheel",Y,{passive:!1}),p.addEventListener("dragstart",ye),f.addEventListener("mousemove",Ie),f.addEventListener("mouseup",ft),u.cleanups.push(()=>{Ae(),p.classList.remove("yyt-scrollable-surface"),p.removeEventListener("mousedown",We),p.removeEventListener("wheel",Y),p.removeEventListener("dragstart",ye),f.removeEventListener("mousemove",Ie),f.removeEventListener("mouseup",ft)})}function ie(){let p=o.currentPopup;if(!p)return;N();let f=[...p.querySelectorAll(".yyt-shell-sidebar .yyt-main-nav"),...p.querySelectorAll(".yyt-sub-nav"),...p.querySelectorAll(".yyt-content"),...p.querySelectorAll(".yyt-tab-content.active"),...p.querySelectorAll(".yyt-tab-content.active .yyt-sub-content"),...p.querySelectorAll(".yyt-settings-content"),...p.querySelectorAll(".yyt-tool-list")];[...new Set(f)].forEach(R)}function Pe(){let p=G(),f=o.currentPopup,x=f?.querySelector(".yyt-popup-header");if(!f||!x||!p)return;let S=!1,U=0,B=0,Q=0,D=0,Z="",oe=()=>({width:s.innerWidth||p.documentElement?.clientWidth||window.innerWidth||0,height:s.innerHeight||p.documentElement?.clientHeight||window.innerHeight||0}),Ae=(ye,z,ot)=>Math.min(Math.max(ye,z),ot),We=()=>{S&&(S=!1,f.classList.remove("yyt-popup-dragging"),p.body.style.userSelect=Z)},Ie=ye=>{if(!S||!o.currentPopup)return;let z=ye.clientX-U,ot=ye.clientY-B,{width:Ce,height:kn}=oe(),Ha=f.offsetWidth||0,Ka=f.offsetHeight||0,Ya=Math.max(0,Ce-Ha),Wa=Math.max(0,kn-Ka);f.style.left=`${Ae(Q+z,0,Ya)}px`,f.style.top=`${Ae(D+ot,0,Wa)}px`,f.style.transform="none",f.style.right="auto",f.style.bottom="auto"},ft=()=>{We()},Y=ye=>{if(ye.button!==0||ye.target?.closest(".yyt-popup-close"))return;S=!0,U=ye.clientX,B=ye.clientY;let z=f.getBoundingClientRect();Q=z.left,D=z.top,f.style.left=`${z.left}px`,f.style.top=`${z.top}px`,f.style.transform="none",f.style.right="auto",f.style.bottom="auto",f.classList.add("yyt-popup-dragging"),Z=p.body.style.userSelect||"",p.body.style.userSelect="none",ye.preventDefault()};x.addEventListener("mousedown",Y),p.addEventListener("mousemove",Ie),p.addEventListener("mouseup",ft),c.cleanup=()=>{We(),x.removeEventListener("mousedown",Y),p.removeEventListener("mousemove",Ie),p.removeEventListener("mouseup",ft)}}function Re(){M(),N(),o.currentPopup&&(o.currentPopup.remove(),o.currentPopup=null),o.currentOverlay&&(o.currentOverlay.remove(),o.currentOverlay=null),d("\u5F39\u7A97\u5DF2\u5173\u95ED")}function ve(p){o.currentMainTab=p;let f=b();if(!f||!o.currentPopup)return;f(o.currentPopup).find(".yyt-main-nav-item").removeClass("active"),f(o.currentPopup).find(`.yyt-main-nav-item[data-tab="${p}"]`).addClass("active");let x=n.toolRegistryModule?.getToolConfig(p);x?.hasSubTabs?(f(o.currentPopup).find(".yyt-sub-nav").show(),gt(p,x.subTabs)):f(o.currentPopup).find(".yyt-sub-nav").hide(),f(o.currentPopup).find(".yyt-tab-content").removeClass("active"),f(o.currentPopup).find(`.yyt-tab-content[data-tab="${p}"]`).addClass("active"),st(p),be(),ie(),pe()}function Ke(p,f){o.currentSubTab[p]=f;let x=b();!x||!o.currentPopup||(x(o.currentPopup).find(".yyt-sub-nav-item").removeClass("active"),x(o.currentPopup).find(`.yyt-sub-nav-item[data-subtab="${f}"]`).addClass("active"),Oe(p,f),be(),ie())}function gt(p,f){let x=b();if(!x||!o.currentPopup||!f)return;let S=o.currentSubTab[p]||f[0]?.id,U=f.map(B=>`
      <div class="yyt-sub-nav-item ${B.id===S?"active":""}" data-subtab="${B.id}">
        <i class="fa-solid ${B.icon||"fa-file"}"></i>
        <span>${B.name}</span>
      </div>
    `).join("");x(o.currentPopup).find(".yyt-sub-nav").html(U),x(o.currentPopup).find(".yyt-sub-nav-item").on("click",function(){let Q=x(this).data("subtab");Ke(p,Q)}),ie()}async function st(p){let f=b();if(!f||!o.currentPopup)return;let x=f(o.currentPopup).find(`.yyt-tab-content[data-tab="${p}"]`);if(!x.length)return;let S=n.toolRegistryModule?.getToolConfig(p);switch(p){case"apiPresets":n.uiModule?.renderApiPanel?n.uiModule.renderApiPanel(x):n.uiComponentsModule?.render&&n.uiComponentsModule.render(x);break;case"toolManage":n.uiModule?.renderToolPanel?n.uiModule.renderToolPanel(x):n.uiComponentsModule?.renderTool&&n.uiComponentsModule.renderTool(x);break;case"regexExtract":n.uiModule?.renderRegexPanel?n.uiModule.renderRegexPanel(x):n.uiComponentsModule?.renderRegex&&n.uiComponentsModule.renderRegex(x);break;case"tools":if(S?.hasSubTabs&&S.subTabs?.length>0){let U=o.currentSubTab[p]||S.subTabs[0].id;Oe(p,U)}else x.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5DE5\u5177\u914D\u7F6E\u52A0\u8F7D\u5931\u8D25</span></div>');break;case"bypass":n.uiModule?.renderBypassPanel?n.uiModule.renderBypassPanel(x):x.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u7834\u9650\u8BCD\u9762\u677F\u52A0\u8F7D\u5931\u8D25</span></div>');break;case"settings":n.uiModule?.renderSettingsPanel?n.uiModule.renderSettingsPanel(x):x.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u8BBE\u7F6E\u9762\u677F\u52A0\u8F7D\u5931\u8D25</span></div>');break;default:le(p,x);break}ie()}function Oe(p,f){let x=b();if(!x||!o.currentPopup)return;let S=x(o.currentPopup).find(`.yyt-tab-content[data-tab="${p}"]`);if(!S.length)return;let U=n.toolRegistryModule?.getToolConfig(p);if(U?.hasSubTabs){let Q=U.subTabs?.find(D=>D.id===f);if(Q){let D=S.find(".yyt-sub-content");switch(D.length||(S.html('<div class="yyt-sub-content"></div>'),D=S.find(".yyt-sub-content")),Q.component){case"SummaryToolPanel":n.uiModule?.renderSummaryToolPanel?n.uiModule.renderSummaryToolPanel(D):n.uiComponentsModule?.SummaryToolPanel?n.uiComponentsModule.SummaryToolPanel.renderTo(D):D.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u6458\u8981\u5DE5\u5177\u52A0\u8F7D\u5931\u8D25</span></div>');break;case"StatusBlockPanel":n.uiModule?.renderStatusBlockPanel?n.uiModule.renderStatusBlockPanel(D):n.uiComponentsModule?.StatusBlockPanel?n.uiComponentsModule.StatusBlockPanel.renderTo(D):D.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u4E3B\u89D2\u72B6\u6001\u680F\u52A0\u8F7D\u5931\u8D25</span></div>');break;case"YouyouReviewPanel":n.uiModule?.renderYouyouReviewPanel?n.uiModule.renderYouyouReviewPanel(D):n.uiComponentsModule?.YouyouReviewPanel?n.uiComponentsModule.YouyouReviewPanel.renderTo(D):D.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5C0F\u5E7D\u70B9\u8BC4\u52A0\u8F7D\u5931\u8D25</span></div>');break;case"GenericToolConfigPanel":nt(Q,D);break;default:D.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-tools"></i><span>\u529F\u80FD\u5F00\u53D1\u4E2D...</span></div>')}}return}let B=S.find(".yyt-sub-content");if(B.length){switch(f){case"config":ce(p,B);break;case"prompts":rt(p,B);break;case"presets":zt(p,B);break;default:B.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-tools"></i><span>\u529F\u80FD\u5F00\u53D1\u4E2D...</span></div>')}ie()}}async function nt(p,f){if(!(!b()||!f?.length||!p?.id))try{let S=r.dynamicToolPanelCache.get(p.id);if(!S){let B=(await Promise.resolve().then(()=>(As(),ga)))?.createToolConfigPanel;if(typeof B!="function")throw new Error("\u901A\u7528\u5DE5\u5177\u9762\u677F\u5DE5\u5382\u4E0D\u53EF\u7528");S=B({id:`${p.id}Panel`,toolId:p.id,postResponseHint:`\u76D1\u542C AI \u56DE\u590D\u7ED3\u675F\u540E\uFF0C\u8C03\u7528\u989D\u5916\u6A21\u578B\u6267\u884C\u201C${p.name||p.id}\u201D\u3002`,extractionPlaceholder:`\u6BCF\u884C\u4E00\u4E2A\u6807\u7B7E\uFF0C\u5982 custom_tag
\u6216 regex:<custom_tag>([\\s\\S]*?)</custom_tag>`,previewDialogId:`${p.id}-extraction-preview`,previewTitle:`${p.name||p.id} \u63D0\u53D6\u9884\u89C8`}),r.dynamicToolPanelCache.set(p.id,S)}S.renderTo(f),ie()}catch(S){console.error(`[${a}] \u81EA\u5B9A\u4E49\u5DE5\u5177\u9762\u677F\u52A0\u8F7D\u5931\u8D25:`,S),f.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u81EA\u5B9A\u4E49\u5DE5\u5177\u9762\u677F\u52A0\u8F7D\u5931\u8D25</span></div>')}}function le(p,f){if(!b())return;let S=n.toolRegistryModule?.getToolConfig(p);if(!S){f.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u5DE5\u5177\u914D\u7F6E\u4E0D\u5B58\u5728</span></div>');return}let U=o.currentSubTab[p]||S.subTabs?.[0]?.id||"config";f.html(`
      <div class="yyt-tool-window">
        <div class="yyt-sub-content" data-subtab="${U}">
          <!-- \u5B50\u5185\u5BB9\u5C06\u5728\u6B64\u6E32\u67D3 -->
        </div>
      </div>
    `),Oe(p,U)}function ce(p,f){if(!b())return;let S=n.toolManagerModule?.getTool(p),U=n.presetManagerModule?.getAllPresets()||[],B=n.toolRegistryModule?.getToolApiPreset(p)||"",Q=U.map(D=>`<option value="${g(D.name)}" ${D.name===B?"selected":""}>${g(D.name)}</option>`).join("");f.html(`
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
              ${Q}
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
              <input type="number" class="yyt-input" id="yyt-tool-timeout" value="${S?.config?.execution?.timeout||6e4}">
            </div>
            <div class="yyt-form-group yyt-flex-1">
              <label>\u91CD\u8BD5\u6B21\u6570</label>
              <input type="number" class="yyt-input" id="yyt-tool-retries" value="${S?.config?.execution?.retries||3}">
            </div>
          </div>
        </div>
      </div>
    `),f.find("#yyt-save-tool-preset").on("click",function(){let Z=f.find("#yyt-tool-api-preset").val();n.toolRegistryModule?.setToolApiPreset(p,Z);let oe=s.toastr;oe&&oe.success("API\u9884\u8BBE\u7ED1\u5B9A\u5DF2\u4FDD\u5B58","YouYou \u5DE5\u5177\u7BB1")})}function rt(p,f){if(!b()||!n.promptEditorModule){f.html('<div class="yyt-empty-state-small"><i class="fa-solid fa-exclamation-triangle"></i><span>\u63D0\u793A\u8BCD\u7F16\u8F91\u5668\u6A21\u5757\u672A\u52A0\u8F7D</span></div>');return}let U=n.toolManagerModule?.getTool(p)?.config?.messages||[],B=n.promptEditorModule.messagesToSegments?n.promptEditorModule.messagesToSegments(U):n.promptEditorModule.DEFAULT_PROMPT_SEGMENTS,Q=new n.promptEditorModule.PromptEditor({containerId:`yyt-prompt-editor-${p}`,segments:B,onChange:Z=>{let oe=n.promptEditorModule.segmentsToMessages?n.promptEditorModule.segmentsToMessages(Z):[];d("\u63D0\u793A\u8BCD\u5DF2\u66F4\u65B0:",oe.length,"\u6761\u6D88\u606F")}});f.html(`<div id="yyt-prompt-editor-${p}" class="yyt-prompt-editor-container"></div>`),Q.init(f.find(`#yyt-prompt-editor-${p}`));let D=n.promptEditorModule.getPromptEditorStyles?n.promptEditorModule.getPromptEditorStyles():"";if(D){let Z="yyt-prompt-editor-styles",oe=s.document||document;if(!oe.getElementById(Z)){let Ae=oe.createElement("style");Ae.id=Z,Ae.textContent=D,(oe.head||oe.documentElement).appendChild(Ae)}}}function zt(p,f){b()&&f.html(`
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
    `)}function Ye(){if(o.currentPopup){d("\u5F39\u7A97\u5DF2\u5B58\u5728");return}let p=b(),f=G();if(!p){h("jQuery \u672A\u627E\u5230\uFF0C\u65E0\u6CD5\u521B\u5EFA\u5F39\u7A97");return}let x=n.toolRegistryModule?.getToolList()||[];if(!x.length){h("\u5DE5\u5177\u5217\u8868\u4E3A\u7A7A\uFF0C\u65E0\u6CD5\u521B\u5EFA\u5F39\u7A97");return}x.some(Y=>Y.id===o.currentMainTab)||(o.currentMainTab=x[0].id);let S=n.toolRegistryModule?.getToolConfig("tools"),U=Array.isArray(S?.subTabs)?S.subTabs:[],B=U.filter(Y=>Y?.isCustom).length,Q=U.filter(Y=>!Y?.isCustom).length,D=F(o.currentMainTab),Z=re(o.currentMainTab);o.currentOverlay=f.createElement("div"),o.currentOverlay.className="yyt-popup-overlay",o.currentOverlay.addEventListener("click",Y=>{Y.target===o.currentOverlay&&Re()}),f.body.appendChild(o.currentOverlay);let oe=x.map(Y=>`
      <div class="yyt-main-nav-item ${Y.id===o.currentMainTab?"active":""}" data-tab="${Y.id}">
        <div class="yyt-main-nav-icon">
          <i class="fa-solid ${g(Y.icon||"fa-file")}"></i>
        </div>
        <div class="yyt-main-nav-copy">
          <span class="yyt-main-nav-name">${g(Y.name||Y.id)}</span>
          <span class="yyt-main-nav-desc">${g(Y.description||"\u8FDB\u5165\u6B64\u9875\u9762\u8FDB\u884C\u914D\u7F6E\u3001\u67E5\u770B\u6216\u7EF4\u62A4\u3002")}</span>
        </div>
      </div>
    `).join(""),Ae=x.map(Y=>`
      <div class="yyt-tab-content ${Y.id===o.currentMainTab?"active":""}" data-tab="${Y.id}">
        <!-- \u5185\u5BB9\u5C06\u52A8\u6001\u6E32\u67D3 -->
      </div>
    `).join(""),We=`
      <div class="yyt-popup" id="${l}">
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
        </div>

        <div class="yyt-popup-body">
          <div class="yyt-popup-shell">
            <div class="yyt-shell-topbar">
              <div class="yyt-shell-topbar-main">
                <div class="yyt-shell-kicker">Workspace</div>
                <div class="yyt-shell-heading">\u7EDF\u4E00\u5DE5\u5177\u5DE5\u4F5C\u53F0</div>
                <div class="yyt-shell-overview-text">\u5C06 API\u3001\u5DE5\u5177\u3001\u63D0\u53D6\u89C4\u5219\u3001\u7834\u9650\u8BCD\u4E0E\u6267\u884C\u8BCA\u65AD\u6536\u53E3\u5230\u4E00\u4E2A\u66F4\u7D27\u51D1\u7684\u5DE5\u4F5C\u533A\u91CC\uFF0C\u4F18\u5148\u4FDD\u8BC1\u53EF\u8BFB\u6027\u548C\u53EF\u64CD\u4F5C\u7A7A\u95F4\u3002</div>
              </div>
              <div class="yyt-shell-topbar-side">
                <div class="yyt-shell-current-card">
                  <span class="yyt-shell-current-label">\u5F53\u524D\u9875\u9762</span>
                  <strong class="yyt-shell-current-page">${g(D)}</strong>
                  <span class="yyt-shell-current-desc">${g(Z)}</span>
                </div>
                <div class="yyt-shell-stats">
                  <div class="yyt-shell-stat">
                    <span class="yyt-shell-stat-label">\u4E3B\u9875\u9762</span>
                    <strong class="yyt-shell-stat-value">${x.length}</strong>
                  </div>
                  <div class="yyt-shell-stat">
                    <span class="yyt-shell-stat-label">\u9ED8\u8BA4\u5DE5\u5177</span>
                    <strong class="yyt-shell-stat-value">${Q}</strong>
                  </div>
                  <div class="yyt-shell-stat">
                    <span class="yyt-shell-stat-label">\u81EA\u5B9A\u4E49\u5DE5\u5177</span>
                    <strong class="yyt-shell-stat-value">${B}</strong>
                  </div>
                </div>
              </div>
            </div>

            <div class="yyt-shell-workspace">
              <aside class="yyt-shell-sidebar">
                <div class="yyt-shell-sidebar-card">
                  <div class="yyt-shell-sidebar-title-row">
                    <span class="yyt-shell-sidebar-title">\u9875\u9762\u5BFC\u822A</span>
                    <span class="yyt-shell-sidebar-hint">${x.length} tabs</span>
                  </div>
                  <div class="yyt-main-nav">
                    ${oe}
                  </div>
                  <div class="yyt-shell-sidebar-note">
                    \u4FDD\u5B58\u540E\uFF0C\u81EA\u52A8\u76D1\u542C\u3001\u624B\u52A8\u6267\u884C\u4E0E\u5199\u56DE\u94FE\u90FD\u4F1A\u4EE5\u6700\u65B0\u914D\u7F6E\u4E3A\u51C6\u3002
                  </div>
                </div>
              </aside>

              <section class="yyt-shell-main">
                <div class="yyt-shell-main-header">
                  <div class="yyt-shell-main-heading-block">
                    <div class="yyt-shell-main-label">\u5F53\u524D\u9875\u9762</div>
                    <div class="yyt-shell-main-title">${g(D)}</div>
                    <div class="yyt-shell-main-description">${g(Z)}</div>
                  </div>
                  <div class="yyt-shell-main-actions">
                    <div class="yyt-shell-main-meta">
                      <i class="fa-solid fa-circle-info"></i>
                      <span>\u4FDD\u5B58\u540E\u81EA\u52A8\u76D1\u542C\u4E0E\u5199\u56DE\u94FE\u4F1A\u4F7F\u7528\u6700\u65B0\u914D\u7F6E</span>
                    </div>
                    <button class="yyt-btn yyt-btn-primary yyt-btn-small yyt-shell-main-save-btn" id="${a}-shell-save-btn" hidden>
                      <i class="fa-solid fa-save"></i>
                      <span>\u4FDD\u5B58\u5F53\u524D\u5DE5\u5177</span>
                    </button>
                  </div>
                </div>

                <div class="yyt-sub-nav" style="display: none;">
                  <!-- \u6B21\u7EA7\u9876\u680F\u5C06\u52A8\u6001\u6E32\u67D3 -->
                </div>

                <div class="yyt-content-frame">
                  <div class="yyt-content">
                    <div class="yyt-content-inner">
                      ${Ae}
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>

        <div class="yyt-popup-footer">
          <div class="yyt-popup-footer-left">
            <div class="yyt-popup-status">
              <i class="fa-solid fa-compass"></i>
              <span class="yyt-popup-active-label">\u5F53\u524D\uFF1A${g(D)}</span>
            </div>
            <div class="yyt-popup-footer-note">
              API\u3001\u5DE5\u5177\u3001\u63D0\u53D6\u4E0E\u8BCA\u65AD\u7EDF\u4E00\u5165\u53E3\u3002
            </div>
          </div>
          <div class="yyt-popup-footer-right">
            <button class="yyt-btn yyt-btn-secondary" id="${a}-close-btn">\u5173\u95ED</button>
          </div>
        </div>
      </div>
    `,Ie=f.createElement("div");Ie.innerHTML=We,o.currentPopup=Ie.firstElementChild,f.body.appendChild(o.currentPopup),p(o.currentPopup).find(".yyt-popup-close").on("click",Re),p(o.currentPopup).find(`#${a}-close-btn`).on("click",Re),p(o.currentPopup).find(`#${a}-shell-save-btn`).on("click",()=>{let Y=o.currentPopup?.querySelector(".yyt-tab-content.active"),ye=Y?.querySelector(`#${a}-tool-save-top`)||Y?.querySelector(`#${a}-tool-save`);ye instanceof HTMLElement&&ye.click()}),p(o.currentPopup).find(".yyt-main-nav-item").on("click",function(){let ye=p(this).data("tab");ye&&ve(ye)}),Pe(),st(o.currentMainTab);let ft=n.toolRegistryModule?.getToolConfig(o.currentMainTab);ft?.hasSubTabs&&(p(o.currentPopup).find(".yyt-sub-nav").show(),gt(o.currentMainTab,ft.subTabs)),be(),ie(),d("\u5F39\u7A97\u5DF2\u6253\u5F00")}return{openPopup:Ye,closePopup:Re,switchMainTab:ve,switchSubTab:Ke,renderTabContent:st,renderSubTabContent:Oe}}function ja(t,e={}){let{constants:s,modules:n}=t,{SCRIPT_ID:r,SCRIPT_VERSION:o}=s,{init:a,loadModules:i,addMenuItem:l,popupShell:c}=e;return{version:o,id:r,init:a,openPopup:c?.openPopup,closePopup:c?.closePopup,switchMainTab:c?.switchMainTab,switchSubTab:c?.switchSubTab,addMenuItem:l,getStorage:()=>n.storageModule,getApiConnection:()=>n.apiConnectionModule,getPresetManager:()=>n.presetManagerModule,getUi:()=>n.uiModule,getUiModule:()=>n.uiModule,getUiComponents:()=>n.uiComponentsModule,getRegexExtractor:()=>n.regexExtractorModule,getToolManager:()=>n.toolManagerModule,getToolExecutor:()=>n.toolExecutorModule,getToolTrigger:()=>n.toolTriggerModule,getWindowManager:()=>n.windowManagerModule,getToolRegistry:()=>n.toolRegistryModule,getPromptEditor:()=>n.promptEditorModule,getSettingsService:()=>n.settingsServiceModule,getBypassManager:()=>n.bypassManagerModule,getVariableResolver:()=>n.variableResolverModule,getContextInjector:()=>n.contextInjectorModule,getToolPromptService:()=>n.toolPromptServiceModule,getToolOutputService:()=>n.toolOutputServiceModule,async getApiConfig(){return await i(),n.storageModule?n.storageModule.loadSettings().apiConfig:null},async saveApiConfig(u){return await i(),n.apiConnectionModule?(n.apiConnectionModule.updateApiConfig(u),!0):!1},async getPresets(){return await i(),n.presetManagerModule?n.presetManagerModule.getAllPresets():[]},async sendApiRequest(u,d){if(await i(),n.apiConnectionModule)return n.apiConnectionModule.sendApiRequest(u,d);throw new Error("API\u6A21\u5757\u672A\u52A0\u8F7D")},async testApiConnection(){return await i(),n.apiConnectionModule?n.apiConnectionModule.testApiConnection():{success:!1,message:"API\u6A21\u5757\u672A\u52A0\u8F7D"}},registerTool(u,d){return n.toolRegistryModule?.registerTool(u,d)||!1},unregisterTool(u){return n.toolRegistryModule?.unregisterTool(u)||!1},getToolList(){return n.toolRegistryModule?.getToolList()||[]},createWindow(u){return n.windowManagerModule?.createWindow(u)||null},closeWindow(u){n.windowManagerModule?.closeWindow(u)}}}var ks="youyou_toolkit",_c="0.6.2",Ac=`${ks}-menu-item`,Ic=`${ks}-menu-container`,Mc=`${ks}-popup`,Pc=typeof window.parent<"u"?window.parent:window,Qr={constants:{SCRIPT_ID:ks,SCRIPT_VERSION:_c,MENU_ITEM_ID:Ac,MENU_CONTAINER_ID:Ic,POPUP_ID:Mc},topLevelWindow:Pc,modules:{storageModule:null,apiConnectionModule:null,uiModule:null,presetManagerModule:null,uiComponentsModule:null,regexExtractorModule:null,toolManagerModule:null,toolExecutorModule:null,toolTriggerModule:null,windowManagerModule:null,toolRegistryModule:null,promptEditorModule:null,settingsServiceModule:null,bypassManagerModule:null,variableResolverModule:null,contextInjectorModule:null,toolPromptServiceModule:null,toolOutputServiceModule:null},caches:{dynamicToolPanelCache:new Map},uiState:{currentPopup:null,currentOverlay:null,currentMainTab:"apiPresets",currentSubTab:{}}},Fa=za(Qr),Cn=Ba(Qr,{openPopup:Fa.openPopup}),Xr=ja(Qr,{init:Cn.init,loadModules:Cn.loadModules,addMenuItem:Cn.addMenuItem,popupShell:Fa});if(typeof window<"u"&&(window.YouYouToolkit=Xr,typeof window.parent<"u"&&window.parent!==window))try{window.parent.YouYouToolkit=Xr}catch{}var Cu=Xr;Cn.init();console.log(`[${ks}] \u6A21\u5757\u52A0\u8F7D\u5B8C\u6210`);export{Cu as default};
