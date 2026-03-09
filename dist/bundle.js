var Ee=Object.defineProperty;var N=(e,t)=>()=>(e&&(t=e(e=0)),t);var F=(e,t)=>{for(var n in t)Ee(e,n,{get:t[n],enumerable:!0})};var xe={};F(xe,{DEFAULT_API_PRESETS:()=>ge,DEFAULT_SETTINGS:()=>X,STORAGE_KEYS:()=>C,deepMerge:()=>ee,getCurrentPresetName:()=>I,loadApiPresets:()=>u,loadSettings:()=>v,saveApiPresets:()=>w,saveSettings:()=>Z,setCurrentPresetName:()=>T});function Me(){try{let e=typeof window.parent<"u"?window.parent:window;if(e.SillyTavern?.getContext){let n=e.SillyTavern.getContext();if(n?.extensionSettings)return n.extensionSettings}if(e.extension_settings)return e.extension_settings;let t=e.jQuery||window.jQuery;return null}catch(e){return console.warn("[YouYouToolkit] \u65E0\u6CD5\u83B7\u53D6SillyTavern extensionSettings:",e),null}}function fe(){try{let e=typeof window.parent<"u"?window.parent:window;if(typeof e.saveSettings=="function")return e.saveSettings;if(e.SillyTavern?.getContext){let t=e.SillyTavern.getContext();if(typeof t.saveSettings=="function")return t.saveSettings;if(typeof t.saveSettingsDebounced=="function")return t.saveSettingsDebounced}return null}catch{return null}}function P(){let e=Me(),t="youyou_toolkit";return e?(e[t]||(e[t]={}),{getItem:n=>{let r=e[t][n];return typeof r=="string"?r:r?JSON.stringify(r):null},setItem:(n,r)=>{e[t][n]=r;let a=fe();if(a)try{a()}catch(l){console.warn("[YouYouToolkit] \u4FDD\u5B58\u8BBE\u7F6E\u5931\u8D25:",l)}},removeItem:n=>{delete e[t][n];let r=fe();if(r)try{r()}catch{}},_isTavern:!0}):(console.warn("[YouYouToolkit] \u4F7F\u7528localStorage\u4F5C\u4E3A\u56DE\u9000\u5B58\u50A8"),{getItem:n=>{try{return localStorage.getItem(n)}catch{return null}},setItem:(n,r)=>{try{localStorage.setItem(n,r)}catch(a){console.error("[YouYouToolkit] localStorage\u5199\u5165\u5931\u8D25:",a)}},removeItem:n=>{try{localStorage.removeItem(n)}catch{}},_isTavern:!1})}function me(e,t=null){if(!e||typeof e!="string")return t;try{return JSON.parse(e)}catch{return t}}function be(e,t="{}"){try{return JSON.stringify(e)}catch{return t}}function v(){let t=P().getItem(C.SETTINGS);if(t){let n=me(t,null);if(n&&typeof n=="object")return ee(JSON.parse(JSON.stringify(X)),n)}return JSON.parse(JSON.stringify(X))}function Z(e){P().setItem(C.SETTINGS,be(e))}function u(){let t=P().getItem(C.API_PRESETS);if(t){let n=me(t,null);if(Array.isArray(n))return n}return JSON.parse(JSON.stringify(ge))}function w(e){P().setItem(C.API_PRESETS,be(e))}function I(){return P().getItem(C.CURRENT_PRESET)||""}function T(e){P().setItem(C.CURRENT_PRESET,e||"")}function ee(e,t){let n=a=>a&&typeof a=="object"&&!Array.isArray(a),r={...e};return n(e)&&n(t)&&Object.keys(t).forEach(a=>{n(t[a])?a in e?r[a]=ee(e[a],t[a]):Object.assign(r,{[a]:t[a]}):Object.assign(r,{[a]:t[a]})}),r}var C,X,ge,z=N(()=>{C={SETTINGS:"youyou_toolkit_settings",API_PRESETS:"youyou_toolkit_api_presets",CURRENT_PRESET:"youyou_toolkit_current_preset"},X={apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}},ge=[]});var we={};F(we,{API_STATUS:()=>je,fetchAvailableModels:()=>te,getApiConfig:()=>S,getEffectiveApiConfig:()=>Ye,sendApiRequest:()=>ve,testApiConnection:()=>De,updateApiConfig:()=>J,validateApiConfig:()=>L});function S(){return v().apiConfig||{}}function J(e){let t=v();t.apiConfig={...t.apiConfig,...e},Z(t)}function L(e){let t=[];if(e.useMainApi)return{valid:!0,errors:[]};if(!e.url||!e.url.trim())t.push("API URL \u4E0D\u80FD\u4E3A\u7A7A");else try{new URL(e.url)}catch{t.push("API URL \u683C\u5F0F\u65E0\u6548")}return(!e.model||!e.model.trim())&&t.push("\u6A21\u578B\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"),{valid:t.length===0,errors:t}}function Ye(e=""){let t=v();if(e){let r=(t.apiPresets||[]).find(a=>a.name===e);if(r&&r.apiConfig)return{...r.apiConfig,presetName:r.name}}return t.apiConfig||{}}function ze(e,t={}){let n=t.apiConfig||S();return{messages:e,model:n.model||"gpt-3.5-turbo",max_tokens:n.max_tokens||4096,temperature:n.temperature??.7,top_p:n.top_p??.9,stream:!1,...t.extraParams}}async function ve(e,t={},n=null){let r=t.apiConfig||S(),a=r.useMainApi,l=L(r);if(!l.valid&&!a)throw new Error(`API\u914D\u7F6E\u65E0\u6548: ${l.errors.join(", ")}`);return a?await Re(e,t,n):await Oe(e,r,t,n)}async function Re(e,t,n){let r=typeof window.parent<"u"?window.parent:window;if(!r.TavernHelper?.generateRaw)throw new Error("TavernHelper.generateRaw \u4E0D\u53EF\u7528\u3002\u8BF7\u68C0\u67E5SillyTavern\u7248\u672C\u3002");try{let a=await r.TavernHelper.generateRaw({ordered_prompts:e,should_stream:!1,...t.extraParams});if(typeof a!="string")throw new Error("\u4E3BAPI\u8FD4\u56DE\u4E86\u975E\u9884\u671F\u7684\u54CD\u5E94\u7C7B\u578B");return a.trim()}catch(a){throw a.name==="AbortError"?a:new Error(`\u4E3BAPI\u8BF7\u6C42\u5931\u8D25: ${a.message}`)}}async function Oe(e,t,n,r){let a=ze(e,{apiConfig:t,...n}),l={"Content-Type":"application/json"};t.apiKey&&(l.Authorization=`Bearer ${t.apiKey}`);let i=await fetch(t.url,{method:"POST",headers:l,body:JSON.stringify(a),signal:r});if(!i.ok){let Y=await i.text().catch(()=>"Unknown error");throw new Error(`API\u8BF7\u6C42\u5931\u8D25 (${i.status}): ${Y}`)}let c=await i.json(),f="";if(c.choices&&c.choices[0]?.message?.content)f=c.choices[0].message.content;else if(c.content)f=c.content;else if(c.text)f=c.text;else if(c.response)f=c.response;else throw new Error(`\u65E0\u6CD5\u89E3\u6790API\u54CD\u5E94\u683C\u5F0F: ${JSON.stringify(c).slice(0,200)}`);return f.trim()}async function De(e=null){let t=e||S(),n=Date.now();try{await ve([{role:"user",content:'Hello, this is a connection test. Please respond with "OK".'}],{apiConfig:t});let a=Date.now()-n;return{success:!0,message:`\u8FDE\u63A5\u6210\u529F (\u5EF6\u8FDF: ${a}ms)`,latency:a}}catch(r){return{success:!1,message:`\u8FDE\u63A5\u5931\u8D25: ${r.message}`,latency:Date.now()-n}}}async function te(e=null){let t=e||S();return t.useMainApi?await Ue():await Ne(t)}async function Ue(){let e=typeof window.parent<"u"?window.parent:window;try{if(e.SillyTavern?.getContext){let t=e.SillyTavern.getContext();if(t.settings?.api_server)return[t.settings.api_server]}return["gpt-4","gpt-4-turbo","gpt-3.5-turbo","claude-3-opus","claude-3-sonnet"]}catch{return["gpt-4","gpt-3.5-turbo"]}}async function Ne(e){if(!e.url||!e.apiKey)return[];try{let n=`${e.url.replace(/\/chat\/completions$/,"").replace(/\/completions$/,"")}/models`,r=await fetch(n,{method:"GET",headers:{Authorization:`Bearer ${e.apiKey}`}});if(!r.ok)return[];let a=await r.json();return a.data&&Array.isArray(a.data)?a.data.map(l=>l.id||l.name).filter(Boolean).sort():[]}catch{return[]}}var je,ne=N(()=>{z();je={IDLE:"idle",CONNECTING:"connecting",SUCCESS:"success",ERROR:"error"}});var he={};F(he,{createPreset:()=>K,createPresetFromCurrentConfig:()=>Qe,deletePreset:()=>O,duplicatePreset:()=>Le,exportPresets:()=>oe,generateUniquePresetName:()=>se,getActiveConfig:()=>ae,getActivePresetName:()=>H,getAllPresets:()=>Q,getPreset:()=>x,getPresetNames:()=>Fe,importPresets:()=>ie,presetExists:()=>R,renamePreset:()=>Je,switchToPreset:()=>B,updatePreset:()=>re,validatePreset:()=>Ke});function Q(){return u()}function Fe(){return u().map(t=>t.name)}function x(e){return!e||typeof e!="string"?null:u().find(n=>n.name===e)||null}function R(e){return!e||typeof e!="string"?!1:u().some(n=>n.name===e)}function K(e){let{name:t,description:n,apiConfig:r}=e;if(!t||typeof t!="string"||!t.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let a=t.trim();if(R(a))return{success:!1,message:`\u9884\u8BBE "${a}" \u5DF2\u5B58\u5728`};let l={name:a,description:n||"",apiConfig:{url:r?.url||"",apiKey:r?.apiKey||"",model:r?.model||"",useMainApi:r?.useMainApi??!0,max_tokens:r?.max_tokens||4096,temperature:r?.temperature??.7,top_p:r?.top_p??.9},createdAt:Date.now(),updatedAt:Date.now()},i=u();return i.push(l),w(i),{success:!0,message:`\u9884\u8BBE "${a}" \u521B\u5EFA\u6210\u529F`,preset:l}}function re(e,t){if(!e||typeof e!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let n=u(),r=n.findIndex(i=>i.name===e);if(r===-1)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};if(t.name&&t.name!==e)return{success:!1,message:"\u4E0D\u652F\u6301\u4FEE\u6539\u9884\u8BBE\u540D\u79F0\uFF0C\u8BF7\u521B\u5EFA\u65B0\u9884\u8BBE"};let a=n[r],l={...a,...t,name:a.name,updatedAt:Date.now()};return t.apiConfig&&(l.apiConfig={...a.apiConfig,...t.apiConfig}),n[r]=l,w(n),{success:!0,message:`\u9884\u8BBE "${e}" \u66F4\u65B0\u6210\u529F`,preset:l}}function O(e){if(!e||typeof e!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let t=u(),n=t.findIndex(r=>r.name===e);return n===-1?{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`}:(t.splice(n,1),w(t),I()===e&&T(""),{success:!0,message:`\u9884\u8BBE "${e}" \u5DF2\u5220\u9664`})}function Je(e,t){if(!e||typeof e!="string")return{success:!1,message:"\u539F\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};if(!t||typeof t!="string"||!t.trim())return{success:!1,message:"\u65B0\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let n=t.trim();if(!R(e))return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};if(R(n))return{success:!1,message:`\u9884\u8BBE "${n}" \u5DF2\u5B58\u5728`};let r=u(),a=r.find(l=>l.name===e);return a&&(a.name=n,a.updatedAt=Date.now(),w(r),I()===e&&T(n)),{success:!0,message:`\u9884\u8BBE\u5DF2\u91CD\u547D\u540D\u4E3A "${n}"`}}function Le(e,t){if(!e||typeof e!="string")return{success:!1,message:"\u6E90\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};if(!t||typeof t!="string"||!t.trim())return{success:!1,message:"\u76EE\u6807\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let n=t.trim(),r=x(e);if(!r)return{success:!1,message:`\u6E90\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};if(R(n))return{success:!1,message:`\u9884\u8BBE "${n}" \u5DF2\u5B58\u5728`};let a={...JSON.parse(JSON.stringify(r)),name:n,createdAt:Date.now(),updatedAt:Date.now()},l=u();return l.push(a),w(l),{success:!0,message:`\u9884\u8BBE\u5DF2\u590D\u5236\u4E3A "${n}"`,preset:a}}function B(e){if(!e)return T(""),{success:!0,message:"\u5DF2\u5207\u6362\u5230\u5F53\u524DAPI\u914D\u7F6E"};let t=x(e);return t?(T(e),{success:!0,message:`\u5DF2\u5207\u6362\u5230\u9884\u8BBE "${e}"`,apiConfig:t.apiConfig}):{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`}}function H(){return I()}function ae(){let e=I();if(e){let n=x(e);if(n)return{presetName:e,apiConfig:n.apiConfig}}return{presetName:"",apiConfig:v().apiConfig||{}}}function oe(e=null){if(e){let n=x(e);if(!n)throw new Error(`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`);return JSON.stringify(n,null,2)}let t=u();return JSON.stringify(t,null,2)}function ie(e,t={overwrite:!1}){let n;try{n=JSON.parse(e)}catch{return{success:!1,message:"JSON\u89E3\u6790\u5931\u8D25",imported:0}}let r=Array.isArray(n)?n:[n];if(r.length===0)return{success:!1,message:"\u6CA1\u6709\u627E\u5230\u6709\u6548\u7684\u9884\u8BBE\u6570\u636E",imported:0};let a=u(),l=0;for(let i of r){if(!i.name||typeof i.name!="string"||!i.apiConfig||typeof i.apiConfig!="object")continue;let c=a.findIndex(f=>f.name===i.name);c>=0?t.overwrite&&(i.updatedAt=Date.now(),a[c]=i,l++):(i.createdAt=i.createdAt||Date.now(),i.updatedAt=Date.now(),a.push(i),l++)}return l>0&&w(a),{success:!0,message:`\u6210\u529F\u5BFC\u5165 ${l} \u4E2A\u9884\u8BBE`,imported:l}}function Qe(e,t=""){let n=v();return K({name:e,description:t,apiConfig:n.apiConfig})}function Ke(e){let t=[];return(!e.name||typeof e.name!="string"||!e.name.trim())&&t.push("\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"),(!e.apiConfig||typeof e.apiConfig!="object")&&t.push("\u7F3A\u5C11API\u914D\u7F6E"),{valid:t.length===0,errors:t}}function se(e){(!e||typeof e!="string")&&(e="\u65B0\u9884\u8BBE");let t=u(),n=new Set(t.map(a=>a.name));if(!n.has(e))return e;let r=1;for(;n.has(`${e} (${r})`);)r++;return`${e} (${r})`}var le=N(()=>{z()});var ke={};F(ke,{getCurrentTab:()=>We,getStyles:()=>qe,render:()=>A,setCurrentTab:()=>Ve});function b(e){return typeof e!="string"?"":e.replace(/&/g,"&").replace(/</g,"<").replace(/>/g,">").replace(/"/g,'"').replace(/'/g,"&#039;")}function y(e,t,n=3e3){let r=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(r.toastr){r.toastr[e](t,"YouYou \u5DE5\u5177\u7BB1",{timeOut:n,progressBar:!0});return}console.log(`[${e.toUpperCase()}] ${t}`)}function D(){if(_)return _;if(typeof window.parent<"u"&&window.parent!==window)try{if(window.parent.jQuery)return _=window.parent.jQuery,_}catch{}return window.jQuery&&(_=window.jQuery),_}function pe(){return s&&s.length>0}function Be(){let e=S(),t=ae(),n=H(),r=Q(),a=r.length>0?r.map(i=>`<option value="${b(i.name)}" ${i.name===n?"selected":""}>${b(i.name)}</option>`).join(""):"",l=r.length>0?r.map(i=>`
        <div class="yyt-preset-item ${i.name===n?"active":""}" data-preset-name="${b(i.name)}">
          <div class="yyt-preset-info">
            <div class="yyt-preset-name">${b(i.name)}</div>
            <div class="yyt-preset-meta">
              ${i.apiConfig.useMainApi?'<span class="yyt-badge yyt-badge-small">\u4E3BAPI</span>':`<span class="yyt-badge yyt-badge-small">${b(i.apiConfig.model||"\u672A\u8BBE\u7F6E")}</span>`}
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
      `).join(""):'<div class="yyt-empty-state-small"><i class="fa-solid fa-inbox"></i><span>\u6682\u65E0\u9884\u8BBE</span></div>';return`
    <div class="yyt-panel">
      <!-- \u9884\u8BBE\u9009\u62E9\u533A -->
      <div class="yyt-panel-section">
        <div class="yyt-section-title">
          <i class="fa-solid fa-bookmark"></i>
          <span>\u9884\u8BBE\u9009\u62E9</span>
        </div>
        
        <div class="yyt-preset-selector">
          <select class="yyt-select yyt-flex-1" id="${o}-preset-select">
            <option value="">-- \u5F53\u524D\u914D\u7F6E --</option>
            ${a}
          </select>
          <button class="yyt-btn yyt-btn-primary" id="${o}-apply-preset">
            <i class="fa-solid fa-check"></i> \u5E94\u7528
          </button>
        </div>
        
        <div class="yyt-preset-list-compact">
          ${l}
        </div>
      </div>
      
      <!-- API\u914D\u7F6E\u533A -->
      <div class="yyt-panel-section">
        <div class="yyt-section-title">
          <i class="fa-solid fa-sliders"></i>
          <span>API\u914D\u7F6E</span>
          <button class="yyt-btn yyt-btn-small yyt-btn-secondary" id="${o}-save-as-preset" style="margin-left: auto;">
            <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u4E3A\u9884\u8BBE
          </button>
        </div>
        
        <div class="yyt-form-group">
          <div class="yyt-toggle-row">
            <div class="yyt-toggle-label">
              <span>\u4F7F\u7528SillyTavern\u4E3BAPI</span>
              <span class="yyt-toggle-hint">\u542F\u7528\u540E\u5C06\u4F7F\u7528SillyTavern\u5185\u7F6E\u7684API\u914D\u7F6E</span>
            </div>
            <label class="yyt-toggle">
              <input type="checkbox" id="${o}-use-main-api" ${e.useMainApi?"checked":""}>
              <span class="yyt-toggle-slider"></span>
            </label>
          </div>
        </div>
        
        <div id="${o}-custom-api-fields" class="${e.useMainApi?"yyt-disabled":""}">
          <div class="yyt-form-row">
            <div class="yyt-form-group yyt-flex-1">
              <label>API URL</label>
              <input type="text" class="yyt-input" id="${o}-api-url" 
                     value="${b(e.url||"")}" 
                     placeholder="https://api.openai.com/v1/chat/completions">
            </div>
          </div>
          
          <div class="yyt-form-row">
            <div class="yyt-form-group yyt-flex-1">
              <label>API Key</label>
              <div class="yyt-input-group">
                <input type="password" class="yyt-input" id="${o}-api-key" 
                       value="${b(e.apiKey||"")}" 
                       placeholder="sk-...">
                <button class="yyt-btn yyt-btn-icon" id="${o}-toggle-key-visibility" title="\u663E\u793A/\u9690\u85CF">
                  <i class="fa-solid fa-eye"></i>
                </button>
              </div>
            </div>
          </div>
          
          <div class="yyt-form-row">
            <div class="yyt-form-group yyt-flex-1">
              <label>\u6A21\u578B</label>
              <div class="yyt-model-row">
                <input type="text" class="yyt-input yyt-model-input" id="${o}-model" 
                       value="${b(e.model||"")}" 
                       placeholder="gpt-4">
                <select class="yyt-select yyt-model-select" id="${o}-model-select" style="display: none;">
                </select>
                <button class="yyt-btn yyt-btn-secondary yyt-model-btn" id="${o}-load-models" title="\u83B7\u53D6\u6A21\u578B\u5217\u8868">
                  <i class="fa-solid fa-sync-alt"></i>
                </button>
              </div>
            </div>
          </div>
          
          <div class="yyt-form-row yyt-form-row-2col">
            <div class="yyt-form-group">
              <label>Max Tokens</label>
              <input type="number" class="yyt-input" id="${o}-max-tokens" 
                     value="${e.max_tokens||4096}" min="1" max="128000">
            </div>
            
            <div class="yyt-form-group">
              <label>Temperature</label>
              <input type="number" class="yyt-input" id="${o}-temperature" 
                     value="${e.temperature??.7}" min="0" max="2" step="0.1">
            </div>
          </div>
          
          <div class="yyt-form-row">
            <div class="yyt-form-group yyt-flex-1">
              <label>Top P</label>
              <input type="number" class="yyt-input" id="${o}-top-p" 
                     value="${e.top_p??.9}" min="0" max="1" step="0.1">
            </div>
          </div>
        </div>
      </div>
      
      <!-- \u5E95\u90E8\u64CD\u4F5C\u533A -->
      <div class="yyt-panel-footer">
        <div class="yyt-footer-left">
          <button class="yyt-btn yyt-btn-secondary" id="${o}-import-presets">
            <i class="fa-solid fa-file-import"></i> \u5BFC\u5165
          </button>
          <button class="yyt-btn yyt-btn-secondary" id="${o}-export-presets">
            <i class="fa-solid fa-file-export"></i> \u5BFC\u51FA
          </button>
          <input type="file" id="${o}-import-file" accept=".json" style="display:none">
        </div>
        <div class="yyt-footer-right">
          <button class="yyt-btn yyt-btn-secondary" id="${o}-reset-api-config">
            <i class="fa-solid fa-undo"></i> \u91CD\u7F6E
          </button>
          <button class="yyt-btn yyt-btn-primary" id="${o}-save-api-config">
            <i class="fa-solid fa-save"></i> \u4FDD\u5B58\u914D\u7F6E
          </button>
        </div>
      </div>
    </div>
  `}function He(e=null){let t=D();if(!t)return;let r=Q().map(p=>p.name),a=e||se("\u65B0\u9884\u8BBE"),l=`
    <div class="yyt-dialog-overlay" id="${o}-dialog-overlay">
      <div class="yyt-dialog">
        <div class="yyt-dialog-header">
          <span class="yyt-dialog-title">${e?"\u7F16\u8F91\u9884\u8BBE":"\u4FDD\u5B58\u4E3A\u65B0\u9884\u8BBE"}</span>
          <button class="yyt-dialog-close" id="${o}-dialog-close">
            <i class="fa-solid fa-times"></i>
          </button>
        </div>
        <div class="yyt-dialog-body">
          <div class="yyt-form-group">
            <label>\u9884\u8BBE\u540D\u79F0</label>
            <input type="text" class="yyt-input" id="${o}-dialog-preset-name" 
                   value="${b(a)}" placeholder="\u8F93\u5165\u9884\u8BBE\u540D\u79F0">
          </div>
          <div class="yyt-form-group">
            <label>\u63CF\u8FF0\uFF08\u53EF\u9009\uFF09</label>
            <textarea class="yyt-textarea" id="${o}-dialog-preset-desc" rows="2" 
                      placeholder="\u9884\u8BBE\u63CF\u8FF0..."></textarea>
          </div>
        </div>
        <div class="yyt-dialog-footer">
          <button class="yyt-btn yyt-btn-secondary" id="${o}-dialog-cancel">\u53D6\u6D88</button>
          <button class="yyt-btn yyt-btn-primary" id="${o}-dialog-save">\u4FDD\u5B58</button>
        </div>
      </div>
    </div>
  `;t(`#${o}-dialog-overlay`).remove(),s.append(l);let i=t(`#${o}-dialog-overlay`),c=t(`#${o}-dialog-preset-name`),f=t(`#${o}-dialog-preset-desc`);if(c.focus().select(),e){let p=x(e);p&&p.description&&f.val(p.description)}let Y=()=>{i.remove()};i.find(`#${o}-dialog-close, #${o}-dialog-cancel`).on("click",Y),i.on("click",function(p){p.target===this&&Y()}),i.find(`#${o}-dialog-save`).on("click",function(){let p=c.val().trim(),Te=f.val().trim();if(!p){y("warning","\u8BF7\u8F93\u5165\u9884\u8BBE\u540D\u79F0"),c.focus();return}if(r.includes(p)&&p!==e){if(!confirm(`\u9884\u8BBE "${p}" \u5DF2\u5B58\u5728\uFF0C\u662F\u5426\u8986\u76D6\uFF1F`))return;O(p)}e&&p!==e&&O(e);let _e=ce(),V=K({name:p,description:Te,apiConfig:_e});V.success?(y("success",V.message),Y(),A()):y("error",V.message)}),c.on("keypress",function(p){p.which===13&&i.find(`#${o}-dialog-save`).click()})}function Ge(){let e=D();if(!e||!pe()){console.warn("[YouYouToolkit] bindEvents: jQuery\u6216\u5BB9\u5668\u4E0D\u53EF\u7528");return}s.find(`#${o}-preset-select`).on("change",function(){let t=e(this).val();if(t){let n=x(t);n&&$e(n.apiConfig)}}),s.find(`#${o}-apply-preset`).on("click",function(){let t=s.find(`#${o}-preset-select`).val();if(!t){B(""),y("info","\u5DF2\u5207\u6362\u5230\u5F53\u524D\u914D\u7F6E"),A();return}let n=B(t);y(n.success?"success":"error",n.message),n.success&&A()}),s.find(".yyt-preset-item").on("click",function(t){let r=e(this).data("preset-name"),a=e(t.target).closest("[data-action]").data("action");if(a)switch(t.stopPropagation(),a){case"load":let l=x(r);l&&($e(l.apiConfig),s.find(`#${o}-preset-select`).val(r),y("info",`\u5DF2\u52A0\u8F7D\u9884\u8BBE "${r}" \u7684\u914D\u7F6E`));break;case"delete":if(confirm(`\u786E\u5B9A\u8981\u5220\u9664\u9884\u8BBE "${r}" \u5417\uFF1F`)){let i=O(r);y(i.success?"info":"error",i.message),i.success&&A()}break}}),s.find(`#${o}-use-main-api`).on("change",function(){let t=e(this).is(":checked"),n=s.find(`#${o}-custom-api-fields`);t?n.addClass("yyt-disabled").find("input, button, select").prop("disabled",!0):n.removeClass("yyt-disabled").find("input, button, select").prop("disabled",!1)}),s.find(`#${o}-toggle-key-visibility`).on("click",function(){let t=s.find(`#${o}-api-key`),n=t.attr("type");t.attr("type",n==="password"?"text":"password"),e(this).find("i").toggleClass("fa-eye fa-eye-slash")}),s.find(`#${o}-load-models`).on("click",async function(){let t=e(this),n=s.find(`#${o}-model`),r=s.find(`#${o}-model-select`);t.prop("disabled",!0).find("i").addClass("fa-spin");try{let a=ce(),l=await te(a);if(l.length>0){r.empty(),l.forEach(c=>{r.append(`<option value="${b(c)}">${b(c)}</option>`)}),n.hide(),r.show();let i=n.val();i&&l.includes(i)&&r.val(i),r.off("change").on("change",function(){n.val(e(this).val())}),y("success",`\u5DF2\u52A0\u8F7D ${l.length} \u4E2A\u6A21\u578B`)}else y("warning","\u672A\u80FD\u83B7\u53D6\u6A21\u578B\u5217\u8868\uFF0C\u8BF7\u624B\u52A8\u8F93\u5165")}catch(a){y("error",`\u52A0\u8F7D\u6A21\u578B\u5931\u8D25: ${a.message}`)}finally{t.prop("disabled",!1).find("i").removeClass("fa-spin")}}),s.find(`#${o}-model`).on("focus",function(){let t=s.find(`#${o}-model-select`);e(this).show(),t.hide()}),s.find(`#${o}-save-api-config`).on("click",function(){let t=ce(),n=L(t);if(!n.valid&&!t.useMainApi){y("error",n.errors.join(", "));return}J(t);let r=H();r&&re(r,{apiConfig:t}),y("success","API\u914D\u7F6E\u5DF2\u4FDD\u5B58")}),s.find(`#${o}-reset-api-config`).on("click",function(){confirm("\u786E\u5B9A\u8981\u91CD\u7F6EAPI\u914D\u7F6E\u5417\uFF1F")&&(J({url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9}),A(),y("info","API\u914D\u7F6E\u5DF2\u91CD\u7F6E"))}),s.find(`#${o}-save-as-preset`).on("click",function(){He()}),s.find(`#${o}-export-presets`).on("click",function(){try{let t=oe(),n=new Blob([t],{type:"application/json"}),r=URL.createObjectURL(n),a=document.createElement("a");a.href=r,a.download=`youyou_toolkit_presets_${Date.now()}.json`,a.click(),URL.revokeObjectURL(r),y("success","\u9884\u8BBE\u5DF2\u5BFC\u51FA")}catch(t){y("error",`\u5BFC\u51FA\u5931\u8D25: ${t.message}`)}}),s.find(`#${o}-import-presets`).on("click",function(){s.find(`#${o}-import-file`).click()}),s.find(`#${o}-import-file`).on("change",async function(t){let n=t.target.files[0];if(n){try{let r=await n.text(),a=ie(r,{overwrite:!0});y(a.success?"success":"error",a.message),a.imported>0&&A()}catch(r){y("error",`\u5BFC\u5165\u5931\u8D25: ${r.message}`)}e(this).val("")}})}function ce(){if(!D()||!pe())return{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9};let t=s.find(`#${o}-model`).val()?.trim()||"",n=s.find(`#${o}-model-select`);return n.is(":visible")&&(t=n.val()||t),{url:s.find(`#${o}-api-url`).val()?.trim()||"",apiKey:s.find(`#${o}-api-key`).val()||"",model:t,useMainApi:s.find(`#${o}-use-main-api`).is(":checked"),max_tokens:parseInt(s.find(`#${o}-max-tokens`).val())||4096,temperature:parseFloat(s.find(`#${o}-temperature`).val())??.7,top_p:parseFloat(s.find(`#${o}-top-p`).val())??.9}}function $e(e){if(!D()||!pe()||!e)return;s.find(`#${o}-api-url`).val(e.url||""),s.find(`#${o}-api-key`).val(e.apiKey||""),s.find(`#${o}-model`).val(e.model||""),s.find(`#${o}-max-tokens`).val(e.max_tokens||4096),s.find(`#${o}-temperature`).val(e.temperature??.7),s.find(`#${o}-top-p`).val(e.top_p??.9);let n=e.useMainApi??!0;s.find(`#${o}-use-main-api`).prop("checked",n);let a=s.find(`#${o}-custom-api-fields`);n?a.addClass("yyt-disabled").find("input, button, select").prop("disabled",!0):a.removeClass("yyt-disabled").find("input, button, select").prop("disabled",!1),s.find(`#${o}-model`).show(),s.find(`#${o}-model-select`).hide()}function A(e){let t=D();if(!t){console.error("[YouYouToolkit] jQuery not available");return}if(e&&(typeof e=="string"?s=t(e):e&&e.jquery?s=e:e&&(s=t(e))),!s||!s.length){console.error("[YouYouToolkit] Container not found or invalid");return}let n=`<div class="yyt-api-manager">${Be()}</div>`;s.html(n),Ge()}function qe(){return`
    /* ============================================================
       YouYou Toolkit - \u73B0\u4EE3\u5316UI\u6837\u5F0F\uFF08\u5408\u5E76\u7248\uFF09
       ============================================================ */
    
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
    
    /* Toggle\u5F00\u5173 - \u7F8E\u89C2\u6837\u5F0F */
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
    
    /* \u8F93\u5165\u6846 - \u73B0\u4EE3\u5316\u8BBE\u8BA1 */
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
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23888' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 12px center;
      padding-right: 32px;
    }
    
    /* \u4E0B\u62C9\u6846\u9009\u9879\u6837\u5F0F - \u786E\u4FDD\u6587\u5B57\u53EF\u89C1 */
    .yyt-select option {
      background: #1a1a2e;
      color: var(--yyt-text);
      padding: 8px 12px;
    }
    
    .yyt-select option:hover,
    .yyt-select option:checked {
      background: rgba(123, 183, 255, 0.2);
      color: #fff;
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
    
    /* \u6A21\u578B\u884C - \u4FEE\u590D\u4E0B\u62C9\u6846\u53D8\u77ED\u95EE\u9898 */
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
    
    /* \u6309\u94AE - \u73B0\u4EE3\u5316\u8BBE\u8BA1 */
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
  `}function We(){return"main"}function Ve(e){}var o,s,_,Ce=N(()=>{ne();le();z();o="youyou_toolkit";s=null,_=null});var g="youyou_toolkit",ue="0.2.0",E=`${g}-menu-item`,ye=`${g}-menu-container`,Xe=`${g}-popup`,k=typeof window.parent<"u"?window.parent:window,G=null,h=null,q=null,j=null;async function M(){try{return G=await Promise.resolve().then(()=>(z(),xe)),h=await Promise.resolve().then(()=>(ne(),we)),q=await Promise.resolve().then(()=>(le(),he)),j=await Promise.resolve().then(()=>(Ce(),ke)),!0}catch(e){return console.warn(`[${g}] \u6A21\u5757\u52A0\u8F7D\u5931\u8D25\uFF0C\u4F7F\u7528\u5185\u7F6E\u529F\u80FD:`,e),!1}}function m(...e){console.log(`[${g}]`,...e)}function Se(...e){console.error(`[${g}]`,...e)}function Ze(){let e=`${g}-styles`,t=k.document||document;if(t.getElementById(e))return;let n=`
    /* ============================================================
       YouYou Toolkit - \u73B0\u4EE3\u5316\u5F39\u7A97\u6837\u5F0F
       ============================================================ */
    
    /* CSS\u53D8\u91CF */
    :root {
      --yyt-accent: #7bb7ff;
      --yyt-accent-glow: rgba(123, 183, 255, 0.4);
      --yyt-accent-soft: rgba(123, 183, 255, 0.15);
      --yyt-success: #4ade80;
      --yyt-error: #f87171;
      --yyt-surface: rgba(255, 255, 255, 0.03);
      --yyt-surface-hover: rgba(255, 255, 255, 0.06);
      --yyt-border: rgba(255, 255, 255, 0.08);
      --yyt-border-strong: rgba(255, 255, 255, 0.15);
      --yyt-text: rgba(255, 255, 255, 0.95);
      --yyt-text-secondary: rgba(255, 255, 255, 0.7);
      --yyt-text-muted: rgba(255, 255, 255, 0.45);
    }
    
    /* \u83DC\u5355\u9879\u6837\u5F0F */
    #${ye} {
      display: flex;
      align-items: center;
    }
    
    #${E} {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 14px;
      cursor: pointer;
      transition: all 0.2s ease;
      border-radius: 8px;
      margin: 2px;
    }
    
    #${E}:hover {
      background: linear-gradient(135deg, rgba(123, 183, 255, 0.12) 0%, rgba(123, 183, 255, 0.04) 100%);
    }
    
    #${E} .fa-fw {
      font-size: 16px;
      color: var(--yyt-accent);
      filter: drop-shadow(0 0 6px var(--yyt-accent-glow));
      transition: transform 0.2s ease;
    }
    
    #${E}:hover .fa-fw {
      transform: scale(1.1);
    }
    
    #${E} span {
      font-weight: 500;
      letter-spacing: 0.3px;
    }
    
    /* \u5F39\u7A97\u906E\u7F69 */
    .yyt-popup-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      z-index: 9999;
      animation: yytFadeIn 0.25s ease-out;
    }
    
    @keyframes yytFadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    /* \u5F39\u7A97\u4E3B\u4F53 */
    .yyt-popup {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: 
        radial-gradient(ellipse at top, rgba(123, 183, 255, 0.08) 0%, transparent 50%),
        linear-gradient(180deg, rgba(255, 255, 255, 0.03) 0%, transparent 30%),
        #0d1117;
      border: 1px solid var(--yyt-border-strong);
      border-radius: 20px;
      box-shadow: 
        0 0 0 1px rgba(255, 255, 255, 0.05),
        0 25px 80px rgba(0, 0, 0, 0.7),
        0 0 60px rgba(123, 183, 255, 0.1);
      width: 680px;
      min-height: 480px;
      max-width: 92vw;
      max-height: 88vh;
      z-index: 10000;
      animation: yytSlideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", Roboto, Arial, sans-serif;
      color: var(--yyt-text);
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
    
    @keyframes yytSlideIn {
      from { 
        opacity: 0; 
        transform: translate(-50%, -50%) scale(0.92) translateY(20px); 
      }
      to { 
        opacity: 1; 
        transform: translate(-50%, -50%) scale(1) translateY(0); 
      }
    }
    
    /* \u5F39\u7A97\u5934\u90E8 */
    .yyt-popup-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 18px 24px;
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, transparent 100%);
      border-bottom: 1px solid var(--yyt-border);
      flex-shrink: 0;
    }
    
    .yyt-popup-title {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 17px;
      font-weight: 700;
      color: var(--yyt-text);
      letter-spacing: 0.3px;
    }
    
    .yyt-popup-title i {
      font-size: 18px;
      color: var(--yyt-accent);
      filter: drop-shadow(0 0 10px var(--yyt-accent-glow));
    }
    
    .yyt-popup-close {
      width: 32px;
      height: 32px;
      border: 1px solid var(--yyt-border);
      border-radius: 10px;
      background: var(--yyt-surface);
      color: var(--yyt-text-secondary);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
      font-size: 14px;
    }
    
    .yyt-popup-close:hover {
      background: linear-gradient(135deg, rgba(248, 113, 113, 0.2) 0%, rgba(248, 113, 113, 0.08) 100%);
      border-color: rgba(248, 113, 113, 0.35);
      color: #f87171;
      transform: rotate(90deg);
    }
    
    /* \u5F39\u7A97\u5185\u5BB9 */
    .yyt-popup-body {
      flex: 1;
      padding: 24px;
      overflow: auto;
    }
    
    .yyt-popup-body::-webkit-scrollbar {
      width: 8px;
    }
    
    .yyt-popup-body::-webkit-scrollbar-track {
      background: transparent;
    }
    
    .yyt-popup-body::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.12);
      border-radius: 4px;
    }
    
    .yyt-popup-body::-webkit-scrollbar-thumb:hover {
      background: rgba(255, 255, 255, 0.2);
    }
    
    /* \u5F39\u7A97\u5E95\u90E8 */
    .yyt-popup-footer {
      padding: 18px 24px;
      background: linear-gradient(180deg, transparent 0%, rgba(255, 255, 255, 0.02) 100%);
      border-top: 1px solid var(--yyt-border);
      flex-shrink: 0;
      display: flex;
      justify-content: flex-end;
      gap: 12px;
    }
    
    /* \u6309\u94AE */
    .yyt-btn {
      padding: 10px 20px;
      border: none;
      border-radius: 10px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 600;
      transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      display: inline-flex;
      align-items: center;
      gap: 8px;
      letter-spacing: 0.3px;
      position: relative;
      overflow: hidden;
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
      transform: translateY(-2px);
      box-shadow: 0 6px 25px var(--yyt-accent-glow), inset 0 1px 0 rgba(255, 255, 255, 0.25);
    }
    
    .yyt-btn-secondary {
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, var(--yyt-surface) 100%);
      color: var(--yyt-text);
      border: 1px solid var(--yyt-border);
    }
    
    .yyt-btn-secondary:hover {
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, var(--yyt-surface-hover) 100%);
      border-color: var(--yyt-border-strong);
      transform: translateY(-1px);
    }
    
    /* \u4E3B\u5BFC\u822A\u6837\u5F0F */
    .yyt-nav {
      display: flex;
      gap: 8px;
      padding: 6px;
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%);
      border-radius: 14px;
      margin-bottom: 24px;
      border: 1px solid var(--yyt-border);
    }
    
    .yyt-nav-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 14px 20px;
      border-radius: 10px;
      cursor: pointer;
      transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      color: var(--yyt-text-secondary);
      font-weight: 500;
      position: relative;
      overflow: hidden;
    }
    
    .yyt-nav-item:hover {
      color: var(--yyt-text);
      background: var(--yyt-surface-hover);
    }
    
    .yyt-nav-item.active {
      color: #0b0f15;
      background: linear-gradient(135deg, var(--yyt-accent) 0%, #a5d4ff 100%);
      box-shadow: 0 4px 15px var(--yyt-accent-glow), inset 0 1px 0 rgba(255, 255, 255, 0.2);
    }
    
    .yyt-nav-item i {
      font-size: 15px;
      transition: transform 0.25s ease;
    }
    
    .yyt-nav-item:hover i {
      transform: scale(1.15);
    }
    
    /* \u9875\u9762\u5185\u5BB9 */
    .yyt-page {
      display: none;
      animation: yytPageIn 0.3s ease-out;
    }
    
    @keyframes yytPageIn {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .yyt-page.active {
      display: block;
    }
    
    /* \u6B22\u8FCE\u9875\u9762 */
    .yyt-welcome {
      text-align: center;
      padding: 50px 30px;
    }
    
    .yyt-welcome h2 {
      margin: 0 0 12px 0;
      font-size: 26px;
      font-weight: 700;
      background: linear-gradient(135deg, var(--yyt-accent) 0%, #a5d4ff 50%, var(--yyt-accent) 100%);
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: yytGradient 3s linear infinite;
    }
    
    @keyframes yytGradient {
      0% { background-position: 0% center; }
      100% { background-position: 200% center; }
    }
    
    .yyt-welcome p {
      color: var(--yyt-text-secondary);
      line-height: 1.7;
      margin: 0 0 20px 0;
      font-size: 15px;
    }
    
    .yyt-version {
      font-size: 12px;
      color: var(--yyt-text-muted);
      margin-top: 35px;
      padding: 10px 20px;
      background: var(--yyt-surface);
      border-radius: 20px;
      display: inline-block;
      border: 1px solid var(--yyt-border);
      letter-spacing: 0.5px;
    }
    
    .yyt-features {
      text-align: left;
      max-width: 450px;
      margin: 30px auto;
    }
    
    .yyt-feature-item {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 16px 20px;
      background: linear-gradient(135deg, var(--yyt-surface) 0%, rgba(255, 255, 255, 0.01) 100%);
      border-radius: 12px;
      margin-bottom: 10px;
      border: 1px solid var(--yyt-border);
      transition: all 0.25s ease;
    }
    
    .yyt-feature-item:hover {
      background: linear-gradient(135deg, var(--yyt-surface-hover) 0%, var(--yyt-surface) 100%);
      border-color: rgba(123, 183, 255, 0.2);
      transform: translateX(6px);
    }
    
    .yyt-feature-item i {
      color: var(--yyt-accent);
      font-size: 22px;
      width: 28px;
      filter: drop-shadow(0 0 8px var(--yyt-accent-glow));
      transition: transform 0.25s ease;
    }
    
    .yyt-feature-item:hover i {
      transform: scale(1.1);
    }
    
    .yyt-feature-item span {
      color: var(--yyt-text);
      font-size: 14px;
      font-weight: 500;
    }
  `,r=t.createElement("style");r.id=e,r.textContent=n,(t.head||t.documentElement).appendChild(r),m("\u6837\u5F0F\u5DF2\u6CE8\u5165")}var d=null,$=null,et="welcome";function W(){d&&(d.remove(),d=null),$&&($.remove(),$=null),m("\u5F39\u7A97\u5DF2\u5173\u95ED")}function Ae(e){et=e;let t=k.jQuery||window.jQuery;if(!(!t||!d)&&(t(d).find(".yyt-nav-item").removeClass("active"),t(d).find(`.yyt-nav-item[data-page="${e}"]`).addClass("active"),t(d).find(".yyt-page").removeClass("active"),t(d).find(`.yyt-page[data-page="${e}"]`).addClass("active"),e==="api"&&j)){let n=t(d).find("#youyou_toolkit-api-container");n.length&&j.render(n)}}function Pe(){if(d){m("\u5F39\u7A97\u5DF2\u5B58\u5728");return}let e=k.jQuery||window.jQuery,t=k.document||document;if(!e){Se("jQuery \u672A\u627E\u5230\uFF0C\u65E0\u6CD5\u521B\u5EFA\u5F39\u7A97");return}$=t.createElement("div"),$.className="yyt-popup-overlay",$.addEventListener("click",a=>{a.target===$&&W()}),t.body.appendChild($);let n=`
    <div class="yyt-popup" id="${Xe}">
      <div class="yyt-popup-header">
        <div class="yyt-popup-title">
          <i class="fa-solid fa-wand-magic-sparkles"></i>
          <span>YouYou \u5DE5\u5177\u7BB1</span>
          <span style="font-size: 12px; opacity: 0.6;">v${ue}</span>
        </div>
        <button class="yyt-popup-close" title="\u5173\u95ED">
          <i class="fa-solid fa-times"></i>
        </button>
      </div>
      
      <div class="yyt-popup-body">
        <div class="yyt-nav">
          <div class="yyt-nav-item active" data-page="welcome">
            <i class="fa-solid fa-home"></i>
            <span>\u9996\u9875</span>
          </div>
          <div class="yyt-nav-item" data-page="api">
            <i class="fa-solid fa-plug"></i>
            <span>API\u7BA1\u7406</span>
          </div>
        </div>
        
        <div class="yyt-page active" data-page="welcome">
          <div class="yyt-welcome">
            <h2>\u{1F6E0}\uFE0F \u6B22\u8FCE\u4F7F\u7528 YouYou \u5DE5\u5177\u7BB1</h2>
            <p>\u8FD9\u662F\u4E00\u4E2A\u4E3A SillyTavern \u8BBE\u8BA1\u7684\u5DE5\u5177\u63D2\u4EF6\u6846\u67B6\u3002</p>
            
            <div class="yyt-features">
              <div class="yyt-feature-item">
                <i class="fa-solid fa-plug"></i>
                <span>API\u8FDE\u63A5\u7BA1\u7406 - \u652F\u6301\u81EA\u5B9A\u4E49API\u548C\u4E3BAPI\u5207\u6362</span>
              </div>
              <div class="yyt-feature-item">
                <i class="fa-solid fa-bookmark"></i>
                <span>\u9884\u8BBE\u7BA1\u7406 - \u4FDD\u5B58\u548C\u5207\u6362\u591A\u5957API\u914D\u7F6E</span>
              </div>
              <div class="yyt-feature-item">
                <i class="fa-solid fa-file-import"></i>
                <span>\u5BFC\u5165\u5BFC\u51FA - \u65B9\u4FBF\u5907\u4EFD\u548C\u5206\u4EAB\u914D\u7F6E</span>
              </div>
            </div>
            
            <div class="yyt-version">
              \u63D2\u4EF6ID: ${g}
            </div>
          </div>
        </div>
        
        <div class="yyt-page" data-page="api">
          <div id="${g}-api-container"></div>
        </div>
      </div>
      
      <div class="yyt-popup-footer">
        <button class="yyt-btn yyt-btn-secondary" id="${g}-close-btn">\u5173\u95ED</button>
      </div>
    </div>
  `,r=t.createElement("div");r.innerHTML=n,d=r.firstElementChild,t.body.appendChild(d),e(d).find(".yyt-popup-close").on("click",W),e(d).find(`#${g}-close-btn`).on("click",W),e(d).find(".yyt-nav-item").on("click",function(){let a=e(this).data("page");a&&Ae(a)}),m("\u5F39\u7A97\u5DF2\u6253\u5F00")}function U(){let e=k.jQuery||window.jQuery;if(!e){Se("jQuery \u672A\u627E\u5230\uFF0C\u5EF6\u8FDF\u91CD\u8BD5..."),setTimeout(U,1e3);return}let t=k.document||document,n=e("#extensionsMenu",t);if(!n.length){m("\u9B54\u68D2\u83DC\u5355\u672A\u627E\u5230\uFF0C\u5EF6\u8FDF\u91CD\u8BD5..."),setTimeout(U,2e3);return}if(e(`#${ye}`,n).length>0){m("\u83DC\u5355\u9879\u5DF2\u5B58\u5728");return}let a=e(`<div class="extension_container interactable" id="${ye}" tabindex="0"></div>`),l=`
    <div class="list-group-item flex-container flexGap5 interactable" id="${E}" title="\u6253\u5F00 YouYou \u5DE5\u5177\u7BB1">
      <div class="fa-fw fa-solid fa-wand-magic-sparkles extensionsMenuExtensionButton"></div>
      <span>YouYou \u5DE5\u5177\u7BB1</span>
    </div>
  `,i=e(l);i.on("click",async function(c){c.stopPropagation(),m("\u83DC\u5355\u9879\u88AB\u70B9\u51FB");let f=e("#extensionsMenuButton",t);f.length&&n.is(":visible")&&f.trigger("click"),Pe()}),a.append(i),n.append(a),m("\u83DC\u5355\u9879\u5DF2\u6DFB\u52A0\u5230\u9B54\u68D2\u533A")}var de={version:ue,id:g,init:Ie,openPopup:Pe,closePopup:W,switchPage:Ae,addMenuItem:U,getStorage:()=>G,getApiConnection:()=>h,getPresetManager:()=>q,getUiComponents:()=>j,async getApiConfig(){return await M(),G?G.loadSettings().apiConfig:null},async saveApiConfig(e){return await M(),h?(h.updateApiConfig(e),!0):!1},async getPresets(){return await M(),q?q.getAllPresets():[]},async sendApiRequest(e,t){if(await M(),h)return h.sendApiRequest(e,t);throw new Error("API\u6A21\u5757\u672A\u52A0\u8F7D")},async testApiConnection(){return await M(),h?h.testApiConnection():{success:!1,message:"API\u6A21\u5757\u672A\u52A0\u8F7D"}}};async function Ie(){if(m(`\u521D\u59CB\u5316\u5F00\u59CB... \u7248\u672C: ${ue}`),Ze(),await M()){if(m("\u6240\u6709\u6A21\u5757\u52A0\u8F7D\u6210\u529F"),j){let n=k.document||document,r=`${g}-ui-styles`;if(!n.getElementById(r)){let a=n.createElement("style");a.id=r,a.textContent=j.getStyles(),(n.head||n.documentElement).appendChild(a)}}}else m("\u90E8\u5206\u6A21\u5757\u52A0\u8F7D\u5931\u8D25\uFF0C\u4F7F\u7528\u57FA\u7840\u529F\u80FD");let t=k.document||document;t.readyState==="loading"?t.addEventListener("DOMContentLoaded",()=>{setTimeout(U,1e3)}):setTimeout(U,1e3),m("\u521D\u59CB\u5316\u5B8C\u6210")}if(typeof window<"u"&&(window.YouYouToolkit=de,typeof window.parent<"u"&&window.parent!==window))try{window.parent.YouYouToolkit=de}catch{}var dt=de;Ie();m("\u6A21\u5757\u52A0\u8F7D\u5B8C\u6210");export{dt as default};
