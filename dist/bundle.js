var Me=Object.defineProperty;var J=(e,t)=>()=>(e&&(t=e(e=0)),t);var L=(e,t)=>{for(var r in t)Me(e,r,{get:t[r],enumerable:!0})};var ve={};L(ve,{DEFAULT_API_PRESETS:()=>me,DEFAULT_SETTINGS:()=>ee,STORAGE_KEYS:()=>S,deepMerge:()=>re,getCurrentPresetName:()=>_,loadApiPresets:()=>u,loadSettings:()=>v,saveApiPresets:()=>w,saveSettings:()=>te,setCurrentPresetName:()=>E});function je(){try{let e=typeof window.parent<"u"?window.parent:window;if(e.SillyTavern?.getContext){let r=e.SillyTavern.getContext();if(r?.extensionSettings)return r.extensionSettings}if(e.extension_settings)return e.extension_settings;let t=e.jQuery||window.jQuery;return null}catch(e){return console.warn("[YouYouToolkit] \u65E0\u6CD5\u83B7\u53D6SillyTavern extensionSettings:",e),null}}function ge(){try{let e=typeof window.parent<"u"?window.parent:window;if(typeof e.saveSettings=="function")return e.saveSettings;if(e.SillyTavern?.getContext){let t=e.SillyTavern.getContext();if(typeof t.saveSettings=="function")return t.saveSettings;if(typeof t.saveSettingsDebounced=="function")return t.saveSettingsDebounced}return null}catch{return null}}function T(){let e=je(),t="youyou_toolkit";return e?(e[t]||(e[t]={}),{getItem:r=>{let n=e[t][r];return typeof n=="string"?n:n?JSON.stringify(n):null},setItem:(r,n)=>{e[t][r]=n;let a=ge();if(a)try{a()}catch(l){console.warn("[YouYouToolkit] \u4FDD\u5B58\u8BBE\u7F6E\u5931\u8D25:",l)}},removeItem:r=>{delete e[t][r];let n=ge();if(n)try{n()}catch{}},_isTavern:!0}):(console.warn("[YouYouToolkit] \u4F7F\u7528localStorage\u4F5C\u4E3A\u56DE\u9000\u5B58\u50A8"),{getItem:r=>{try{return localStorage.getItem(r)}catch{return null}},setItem:(r,n)=>{try{localStorage.setItem(r,n)}catch(a){console.error("[YouYouToolkit] localStorage\u5199\u5165\u5931\u8D25:",a)}},removeItem:r=>{try{localStorage.removeItem(r)}catch{}},_isTavern:!1})}function be(e,t=null){if(!e||typeof e!="string")return t;try{return JSON.parse(e)}catch{return t}}function xe(e,t="{}"){try{return JSON.stringify(e)}catch{return t}}function v(){let t=T().getItem(S.SETTINGS);if(t){let r=be(t,null);if(r&&typeof r=="object")return re(JSON.parse(JSON.stringify(ee)),r)}return JSON.parse(JSON.stringify(ee))}function te(e){T().setItem(S.SETTINGS,xe(e))}function u(){let t=T().getItem(S.API_PRESETS);if(t){let r=be(t,null);if(Array.isArray(r))return r}return JSON.parse(JSON.stringify(me))}function w(e){T().setItem(S.API_PRESETS,xe(e))}function _(){return T().getItem(S.CURRENT_PRESET)||""}function E(e){T().setItem(S.CURRENT_PRESET,e||"")}function re(e,t){let r=a=>a&&typeof a=="object"&&!Array.isArray(a),n={...e};return r(e)&&r(t)&&Object.keys(t).forEach(a=>{r(t[a])?a in e?n[a]=re(e[a],t[a]):Object.assign(n,{[a]:t[a]}):Object.assign(n,{[a]:t[a]})}),n}var S,ee,me,O=J(()=>{S={SETTINGS:"youyou_toolkit_settings",API_PRESETS:"youyou_toolkit_api_presets",CURRENT_PRESET:"youyou_toolkit_current_preset"},ee={apiConfig:{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9},currentPreset:"",uiSettings:{theme:"dark",lastTab:"api"}},me=[]});var he={};L(he,{API_STATUS:()=>Ye,fetchAvailableModels:()=>ne,getApiConfig:()=>A,getEffectiveApiConfig:()=>ze,sendApiRequest:()=>we,testApiConnection:()=>Ue,updateApiConfig:()=>P,validateApiConfig:()=>Q});function A(){return v().apiConfig||{}}function P(e){let t=v();t.apiConfig={...t.apiConfig,...e},te(t)}function Q(e){let t=[];if(e.useMainApi)return{valid:!0,errors:[]};if(!e.url||!e.url.trim())t.push("API URL \u4E0D\u80FD\u4E3A\u7A7A");else try{new URL(e.url)}catch{t.push("API URL \u683C\u5F0F\u65E0\u6548")}return(!e.model||!e.model.trim())&&t.push("\u6A21\u578B\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"),{valid:t.length===0,errors:t}}function ze(e=""){let t=v();if(e){let n=(t.apiPresets||[]).find(a=>a.name===e);if(n&&n.apiConfig)return{...n.apiConfig,presetName:n.name}}return t.apiConfig||{}}function Re(e,t={}){let r=t.apiConfig||A();return{messages:e,model:r.model||"gpt-3.5-turbo",max_tokens:r.max_tokens||4096,temperature:r.temperature??.7,top_p:r.top_p??.9,stream:!1,...t.extraParams}}async function we(e,t={},r=null){let n=t.apiConfig||A(),a=n.useMainApi,l=Q(n);if(!l.valid&&!a)throw new Error(`API\u914D\u7F6E\u65E0\u6548: ${l.errors.join(", ")}`);return a?await Oe(e,t,r):await De(e,n,t,r)}async function Oe(e,t,r){let n=typeof window.parent<"u"?window.parent:window;if(!n.TavernHelper?.generateRaw)throw new Error("TavernHelper.generateRaw \u4E0D\u53EF\u7528\u3002\u8BF7\u68C0\u67E5SillyTavern\u7248\u672C\u3002");try{let a=await n.TavernHelper.generateRaw({ordered_prompts:e,should_stream:!1,...t.extraParams});if(typeof a!="string")throw new Error("\u4E3BAPI\u8FD4\u56DE\u4E86\u975E\u9884\u671F\u7684\u54CD\u5E94\u7C7B\u578B");return a.trim()}catch(a){throw a.name==="AbortError"?a:new Error(`\u4E3BAPI\u8BF7\u6C42\u5931\u8D25: ${a.message}`)}}async function De(e,t,r,n){let a=Re(e,{apiConfig:t,...r}),l={"Content-Type":"application/json"};t.apiKey&&(l.Authorization=`Bearer ${t.apiKey}`);let i=await fetch(t.url,{method:"POST",headers:l,body:JSON.stringify(a),signal:n});if(!i.ok){let R=await i.text().catch(()=>"Unknown error");throw new Error(`API\u8BF7\u6C42\u5931\u8D25 (${i.status}): ${R}`)}let c=await i.json(),f="";if(c.choices&&c.choices[0]?.message?.content)f=c.choices[0].message.content;else if(c.content)f=c.content;else if(c.text)f=c.text;else if(c.response)f=c.response;else throw new Error(`\u65E0\u6CD5\u89E3\u6790API\u54CD\u5E94\u683C\u5F0F: ${JSON.stringify(c).slice(0,200)}`);return f.trim()}async function Ue(e=null){let t=e||A(),r=Date.now();try{await we([{role:"user",content:'Hello, this is a connection test. Please respond with "OK".'}],{apiConfig:t});let a=Date.now()-r;return{success:!0,message:`\u8FDE\u63A5\u6210\u529F (\u5EF6\u8FDF: ${a}ms)`,latency:a}}catch(n){return{success:!1,message:`\u8FDE\u63A5\u5931\u8D25: ${n.message}`,latency:Date.now()-r}}}async function ne(e=null){let t=e||A();return t.useMainApi?await Ne():await Fe(t)}async function Ne(){let e=typeof window.parent<"u"?window.parent:window;try{if(e.SillyTavern?.getContext){let t=e.SillyTavern.getContext();if(t.settings?.api_server)return[t.settings.api_server]}return["gpt-4","gpt-4-turbo","gpt-3.5-turbo","claude-3-opus","claude-3-sonnet"]}catch{return["gpt-4","gpt-3.5-turbo"]}}async function Fe(e){if(!e.url||!e.apiKey)return[];try{let r=`${e.url.replace(/\/chat\/completions$/,"").replace(/\/completions$/,"")}/models`,n=await fetch(r,{method:"GET",headers:{Authorization:`Bearer ${e.apiKey}`}});if(!n.ok)return[];let a=await n.json();return a.data&&Array.isArray(a.data)?a.data.map(l=>l.id||l.name).filter(Boolean).sort():[]}catch{return[]}}var Ye,ae=J(()=>{O();Ye={IDLE:"idle",CONNECTING:"connecting",SUCCESS:"success",ERROR:"error"}});var $e={};L($e,{createPreset:()=>B,createPresetFromCurrentConfig:()=>Ke,deletePreset:()=>U,duplicatePreset:()=>Qe,exportPresets:()=>ie,generateUniquePresetName:()=>le,getActiveConfig:()=>oe,getActivePresetName:()=>q,getAllPresets:()=>K,getPreset:()=>x,getPresetNames:()=>Je,importPresets:()=>se,presetExists:()=>D,renamePreset:()=>Le,switchToPreset:()=>G,updatePreset:()=>H,validatePreset:()=>Be});function K(){return u()}function Je(){return u().map(t=>t.name)}function x(e){return!e||typeof e!="string"?null:u().find(r=>r.name===e)||null}function D(e){return!e||typeof e!="string"?!1:u().some(r=>r.name===e)}function B(e){let{name:t,description:r,apiConfig:n}=e;if(!t||typeof t!="string"||!t.trim())return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let a=t.trim();if(D(a))return{success:!1,message:`\u9884\u8BBE "${a}" \u5DF2\u5B58\u5728`};let l={name:a,description:r||"",apiConfig:{url:n?.url||"",apiKey:n?.apiKey||"",model:n?.model||"",useMainApi:n?.useMainApi??!0,max_tokens:n?.max_tokens||4096,temperature:n?.temperature??.7,top_p:n?.top_p??.9},createdAt:Date.now(),updatedAt:Date.now()},i=u();return i.push(l),w(i),{success:!0,message:`\u9884\u8BBE "${a}" \u521B\u5EFA\u6210\u529F`,preset:l}}function H(e,t){if(!e||typeof e!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let r=u(),n=r.findIndex(i=>i.name===e);if(n===-1)return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};if(t.name&&t.name!==e)return{success:!1,message:"\u4E0D\u652F\u6301\u4FEE\u6539\u9884\u8BBE\u540D\u79F0\uFF0C\u8BF7\u521B\u5EFA\u65B0\u9884\u8BBE"};let a=r[n],l={...a,...t,name:a.name,updatedAt:Date.now()};return t.apiConfig&&(l.apiConfig={...a.apiConfig,...t.apiConfig}),r[n]=l,w(r),{success:!0,message:`\u9884\u8BBE "${e}" \u66F4\u65B0\u6210\u529F`,preset:l}}function U(e){if(!e||typeof e!="string")return{success:!1,message:"\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let t=u(),r=t.findIndex(n=>n.name===e);return r===-1?{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`}:(t.splice(r,1),w(t),_()===e&&E(""),{success:!0,message:`\u9884\u8BBE "${e}" \u5DF2\u5220\u9664`})}function Le(e,t){if(!e||typeof e!="string")return{success:!1,message:"\u539F\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};if(!t||typeof t!="string"||!t.trim())return{success:!1,message:"\u65B0\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let r=t.trim();if(!D(e))return{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};if(D(r))return{success:!1,message:`\u9884\u8BBE "${r}" \u5DF2\u5B58\u5728`};let n=u(),a=n.find(l=>l.name===e);return a&&(a.name=r,a.updatedAt=Date.now(),w(n),_()===e&&E(r)),{success:!0,message:`\u9884\u8BBE\u5DF2\u91CD\u547D\u540D\u4E3A "${r}"`}}function Qe(e,t){if(!e||typeof e!="string")return{success:!1,message:"\u6E90\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};if(!t||typeof t!="string"||!t.trim())return{success:!1,message:"\u76EE\u6807\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"};let r=t.trim(),n=x(e);if(!n)return{success:!1,message:`\u6E90\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`};if(D(r))return{success:!1,message:`\u9884\u8BBE "${r}" \u5DF2\u5B58\u5728`};let a={...JSON.parse(JSON.stringify(n)),name:r,createdAt:Date.now(),updatedAt:Date.now()},l=u();return l.push(a),w(l),{success:!0,message:`\u9884\u8BBE\u5DF2\u590D\u5236\u4E3A "${r}"`,preset:a}}function G(e){if(!e)return E(""),{success:!0,message:"\u5DF2\u5207\u6362\u5230\u5F53\u524DAPI\u914D\u7F6E"};let t=x(e);return t?(E(e),{success:!0,message:`\u5DF2\u5207\u6362\u5230\u9884\u8BBE "${e}"`,apiConfig:t.apiConfig}):{success:!1,message:`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`}}function q(){return _()}function oe(){let e=_();if(e){let r=x(e);if(r)return{presetName:e,apiConfig:r.apiConfig}}return{presetName:"",apiConfig:v().apiConfig||{}}}function ie(e=null){if(e){let r=x(e);if(!r)throw new Error(`\u9884\u8BBE "${e}" \u4E0D\u5B58\u5728`);return JSON.stringify(r,null,2)}let t=u();return JSON.stringify(t,null,2)}function se(e,t={overwrite:!1}){let r;try{r=JSON.parse(e)}catch{return{success:!1,message:"JSON\u89E3\u6790\u5931\u8D25",imported:0}}let n=Array.isArray(r)?r:[r];if(n.length===0)return{success:!1,message:"\u6CA1\u6709\u627E\u5230\u6709\u6548\u7684\u9884\u8BBE\u6570\u636E",imported:0};let a=u(),l=0;for(let i of n){if(!i.name||typeof i.name!="string"||!i.apiConfig||typeof i.apiConfig!="object")continue;let c=a.findIndex(f=>f.name===i.name);c>=0?t.overwrite&&(i.updatedAt=Date.now(),a[c]=i,l++):(i.createdAt=i.createdAt||Date.now(),i.updatedAt=Date.now(),a.push(i),l++)}return l>0&&w(a),{success:!0,message:`\u6210\u529F\u5BFC\u5165 ${l} \u4E2A\u9884\u8BBE`,imported:l}}function Ke(e,t=""){let r=v();return B({name:e,description:t,apiConfig:r.apiConfig})}function Be(e){let t=[];return(!e.name||typeof e.name!="string"||!e.name.trim())&&t.push("\u9884\u8BBE\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A"),(!e.apiConfig||typeof e.apiConfig!="object")&&t.push("\u7F3A\u5C11API\u914D\u7F6E"),{valid:t.length===0,errors:t}}function le(e){(!e||typeof e!="string")&&(e="\u65B0\u9884\u8BBE");let t=u(),r=new Set(t.map(a=>a.name));if(!r.has(e))return e;let n=1;for(;r.has(`${e} (${n})`);)n++;return`${e} (${n})`}var ce=J(()=>{O()});var Ce={};L(Ce,{getCurrentTab:()=>Ve,getStyles:()=>We,render:()=>h,setCurrentTab:()=>Xe});function b(e){return typeof e!="string"?"":e.replace(/&/g,"&").replace(/</g,"<").replace(/>/g,">").replace(/"/g,'"').replace(/'/g,"&#039;")}function p(e,t,r=3e3){let n=typeof window.parent<"u"&&window.parent!==window?window.parent:window;if(n.toastr){n.toastr[e](t,"YouYou \u5DE5\u5177\u7BB1",{timeOut:r,progressBar:!0});return}console.log(`[${e.toUpperCase()}] ${t}`)}function N(){if(M)return M;if(typeof window.parent<"u"&&window.parent!==window)try{if(window.parent.jQuery)return M=window.parent.jQuery,M}catch{}return window.jQuery&&(M=window.jQuery),M}function ye(){return s&&s.length>0}function He(){let e=A(),t=oe(),r=q(),n=K(),a=n.length>0?n.map(i=>`<option value="${b(i.name)}" ${i.name===r?"selected":""}>${b(i.name)}</option>`).join(""):"",l=n.length>0?n.map(i=>`
        <div class="yyt-preset-item ${i.name===r?"active":""}" data-preset-name="${b(i.name)}">
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
  `}function Ge(e=null){let t=N();if(!t)return;let n=K().map(y=>y.name),a=e||le("\u65B0\u9884\u8BBE"),l=`
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
  `;t(`#${o}-dialog-overlay`).remove(),s.append(l);let i=t(`#${o}-dialog-overlay`),c=t(`#${o}-dialog-preset-name`),f=t(`#${o}-dialog-preset-desc`);if(c.focus().select(),e){let y=x(e);y&&y.description&&f.val(y.description)}let R=()=>{i.remove()};i.find(`#${o}-dialog-close, #${o}-dialog-cancel`).on("click",R),i.on("click",function(y){y.target===this&&R()}),i.find(`#${o}-dialog-save`).on("click",function(){let y=c.val().trim(),_e=f.val().trim();if(!y){p("warning","\u8BF7\u8F93\u5165\u9884\u8BBE\u540D\u79F0"),c.focus();return}if(n.includes(y)&&y!==e){if(!confirm(`\u9884\u8BBE "${y}" \u5DF2\u5B58\u5728\uFF0C\u662F\u5426\u8986\u76D6\uFF1F`))return;U(y)}e&&y!==e&&U(e);let Ee=pe(),Z=B({name:y,description:_e,apiConfig:Ee});Z.success?(p("success",Z.message),R(),h()):p("error",Z.message)}),c.on("keypress",function(y){y.which===13&&i.find(`#${o}-dialog-save`).click()})}function qe(){let e=N();if(!e||!ye()){console.warn("[YouYouToolkit] bindEvents: jQuery\u6216\u5BB9\u5668\u4E0D\u53EF\u7528");return}s.find(`#${o}-preset-select`).on("change",function(){let t=e(this).val();if(t){let r=x(t);r&&ke(r.apiConfig)}}),s.find(`#${o}-apply-preset`).on("click",function(){let t=s.find(`#${o}-preset-select`).val();if(!t){G(""),p("info","\u5DF2\u5207\u6362\u5230\u5F53\u524D\u914D\u7F6E"),h();return}let r=G(t);p(r.success?"success":"error",r.message),r.success&&h()}),s.find(".yyt-preset-item").on("click",function(t){let r=e(this),n=r.data("preset-name"),a=e(t.target).closest("[data-action]").data("action");if(a)switch(t.stopPropagation(),a){case"load":let l=x(n);l&&(ke(l.apiConfig),I=n,s.find(`#${o}-preset-select`).val(n),s.find(".yyt-preset-item").removeClass("yyt-loaded"),r.addClass("yyt-loaded"),p("info",`\u5DF2\u52A0\u8F7D\u9884\u8BBE "${n}"\uFF0C\u4FEE\u6539\u540E\u53EF\u70B9\u51FB"\u4FDD\u5B58\u914D\u7F6E"\u8986\u76D6\u6B64\u9884\u8BBE`));break;case"delete":if(confirm(`\u786E\u5B9A\u8981\u5220\u9664\u9884\u8BBE "${n}" \u5417\uFF1F`)){let i=U(n);p(i.success?"info":"error",i.message),i.success&&(I===n&&(I=""),h())}break}}),s.find(`#${o}-use-main-api`).on("change",function(){let t=e(this).is(":checked"),r=s.find(`#${o}-custom-api-fields`);t?r.addClass("yyt-disabled").find("input, button, select").prop("disabled",!0):r.removeClass("yyt-disabled").find("input, button, select").prop("disabled",!1)}),s.find(`#${o}-toggle-key-visibility`).on("click",function(){let t=s.find(`#${o}-api-key`),r=t.attr("type");t.attr("type",r==="password"?"text":"password"),e(this).find("i").toggleClass("fa-eye fa-eye-slash")}),s.find(`#${o}-load-models`).on("click",async function(){let t=e(this),r=s.find(`#${o}-model`),n=s.find(`#${o}-model-select`);t.prop("disabled",!0).find("i").addClass("fa-spin");try{let a=pe(),l=await ne(a);if(l.length>0){n.empty(),l.forEach(c=>{n.append(`<option value="${b(c)}">${b(c)}</option>`)}),r.hide(),n.show();let i=r.val();i&&l.includes(i)&&n.val(i),n.off("change").on("change",function(){r.val(e(this).val())}),p("success",`\u5DF2\u52A0\u8F7D ${l.length} \u4E2A\u6A21\u578B`)}else p("warning","\u672A\u80FD\u83B7\u53D6\u6A21\u578B\u5217\u8868\uFF0C\u8BF7\u624B\u52A8\u8F93\u5165")}catch(a){p("error",`\u52A0\u8F7D\u6A21\u578B\u5931\u8D25: ${a.message}`)}finally{t.prop("disabled",!1).find("i").removeClass("fa-spin")}}),s.find(`#${o}-model`).on("focus",function(){let t=s.find(`#${o}-model-select`);e(this).show(),t.hide()}),s.find(`#${o}-save-api-config`).on("click",function(){let t=pe(),r=Q(t);if(!r.valid&&!t.useMainApi){p("error",r.errors.join(", "));return}if(I){if(!confirm(`\u662F\u5426\u8981\u8986\u76D6\u9884\u8BBE "${I}" \u7684\u914D\u7F6E\uFF1F

\u70B9\u51FB"\u786E\u5B9A"\u8986\u76D6\u9884\u8BBE\uFF0C\u70B9\u51FB"\u53D6\u6D88"\u4EC5\u4FDD\u5B58\u5F53\u524D\u914D\u7F6E`)){P(t),p("success","API\u914D\u7F6E\u5DF2\u4FDD\u5B58");return}P(t);let a=H(I,{apiConfig:t});a.success?(p("success",`\u914D\u7F6E\u5DF2\u4FDD\u5B58\u5E76\u8986\u76D6\u9884\u8BBE "${I}"`),h()):p("error",a.message);return}let n=q();if(n){P(t),H(n,{apiConfig:t}),p("success","API\u914D\u7F6E\u5DF2\u4FDD\u5B58");return}P(t),p("success","API\u914D\u7F6E\u5DF2\u4FDD\u5B58")}),s.find(`#${o}-reset-api-config`).on("click",function(){confirm("\u786E\u5B9A\u8981\u91CD\u7F6EAPI\u914D\u7F6E\u5417\uFF1F")&&(P({url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9}),h(),p("info","API\u914D\u7F6E\u5DF2\u91CD\u7F6E"))}),s.find(`#${o}-save-as-preset`).on("click",function(){Ge()}),s.find(`#${o}-export-presets`).on("click",function(){try{let t=ie(),r=new Blob([t],{type:"application/json"}),n=URL.createObjectURL(r),a=document.createElement("a");a.href=n,a.download=`youyou_toolkit_presets_${Date.now()}.json`,a.click(),URL.revokeObjectURL(n),p("success","\u9884\u8BBE\u5DF2\u5BFC\u51FA")}catch(t){p("error",`\u5BFC\u51FA\u5931\u8D25: ${t.message}`)}}),s.find(`#${o}-import-presets`).on("click",function(){s.find(`#${o}-import-file`).click()}),s.find(`#${o}-import-file`).on("change",async function(t){let r=t.target.files[0];if(r){try{let n=await r.text(),a=se(n,{overwrite:!0});p(a.success?"success":"error",a.message),a.imported>0&&h()}catch(n){p("error",`\u5BFC\u5165\u5931\u8D25: ${n.message}`)}e(this).val("")}})}function pe(){if(!N()||!ye())return{url:"",apiKey:"",model:"",useMainApi:!0,max_tokens:4096,temperature:.7,top_p:.9};let t=s.find(`#${o}-model`).val()?.trim()||"",r=s.find(`#${o}-model-select`);return r.is(":visible")&&(t=r.val()||t),{url:s.find(`#${o}-api-url`).val()?.trim()||"",apiKey:s.find(`#${o}-api-key`).val()||"",model:t,useMainApi:s.find(`#${o}-use-main-api`).is(":checked"),max_tokens:parseInt(s.find(`#${o}-max-tokens`).val())||4096,temperature:parseFloat(s.find(`#${o}-temperature`).val())??.7,top_p:parseFloat(s.find(`#${o}-top-p`).val())??.9}}function ke(e){if(!N()||!ye()||!e)return;s.find(`#${o}-api-url`).val(e.url||""),s.find(`#${o}-api-key`).val(e.apiKey||""),s.find(`#${o}-model`).val(e.model||""),s.find(`#${o}-max-tokens`).val(e.max_tokens||4096),s.find(`#${o}-temperature`).val(e.temperature??.7),s.find(`#${o}-top-p`).val(e.top_p??.9);let r=e.useMainApi??!0;s.find(`#${o}-use-main-api`).prop("checked",r);let a=s.find(`#${o}-custom-api-fields`);r?a.addClass("yyt-disabled").find("input, button, select").prop("disabled",!0):a.removeClass("yyt-disabled").find("input, button, select").prop("disabled",!1),s.find(`#${o}-model`).show(),s.find(`#${o}-model-select`).hide()}function h(e){let t=N();if(!t){console.error("[YouYouToolkit] jQuery not available");return}if(e&&(typeof e=="string"?s=t(e):e&&e.jquery?s=e:e&&(s=t(e))),!s||!s.length){console.error("[YouYouToolkit] Container not found or invalid");return}let r=`<div class="yyt-api-manager">${He()}</div>`;s.html(r),qe()}function We(){return`
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
    
    /* \u4E0B\u62C9\u6846\u9009\u9879\u6837\u5F0F - \u4F7F\u7528\u66F4\u5F3A\u7684\u9009\u62E9\u5668\u786E\u4FDD\u4E0D\u88AB\u8986\u76D6 */
    .yyt-select option,
    .yyt-select optgroup,
    .yyt-select > option,
    .yyt-select > optgroup,
    select.yyt-select option,
    select.yyt-select optgroup {
      background-color: #1a1a2e !important;
      background: #1a1a2e !important;
      color: #ffffff !important;
      padding: 8px 12px;
      margin: 2px 0;
      border-radius: 4px;
      filter: none !important;
    }
    
    .yyt-select option:hover,
    select.yyt-select option:hover {
      background-color: #2a2a4e !important;
      background: #2a2a4e !important;
    }
    
    .yyt-select option:checked,
    select.yyt-select option:checked {
      background-color: #3a3a6e !important;
      background: #3a3a6e !important;
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
    
    .yyt-btn-edit {
      background: linear-gradient(135deg, rgba(123, 183, 255, 0.15) 0%, rgba(123, 183, 255, 0.05) 100%);
      color: var(--yyt-accent);
      border: 1px solid rgba(123, 183, 255, 0.25);
    }
    
    .yyt-btn-edit:hover {
      background: linear-gradient(135deg, rgba(123, 183, 255, 0.25) 0%, rgba(123, 183, 255, 0.1) 100%);
      box-shadow: 0 4px 15px var(--yyt-accent-glow);
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
  `}function Ve(){return"main"}function Xe(e){}var o,s,M,I,Se=J(()=>{ae();ce();O();o="youyou_toolkit";s=null,M=null,I=""});var g="youyou_toolkit",fe="0.2.0",j=`${g}-menu-item`,de=`${g}-menu-container`,Ze=`${g}-popup`,C=typeof window.parent<"u"?window.parent:window,W=null,$=null,V=null,z=null;async function Y(){try{return W=await Promise.resolve().then(()=>(O(),ve)),$=await Promise.resolve().then(()=>(ae(),he)),V=await Promise.resolve().then(()=>(ce(),$e)),z=await Promise.resolve().then(()=>(Se(),Ce)),!0}catch(e){return console.warn(`[${g}] \u6A21\u5757\u52A0\u8F7D\u5931\u8D25\uFF0C\u4F7F\u7528\u5185\u7F6E\u529F\u80FD:`,e),!1}}function m(...e){console.log(`[${g}]`,...e)}function Ae(...e){console.error(`[${g}]`,...e)}function et(){let e=`${g}-styles`,t=C.document||document;if(t.getElementById(e))return;let r=`
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
    #${de} {
      display: flex;
      align-items: center;
    }
    
    #${j} {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 14px;
      cursor: pointer;
      transition: all 0.2s ease;
      border-radius: 8px;
      margin: 2px;
    }
    
    #${j}:hover {
      background: linear-gradient(135deg, rgba(123, 183, 255, 0.12) 0%, rgba(123, 183, 255, 0.04) 100%);
    }
    
    #${j} .fa-fw {
      font-size: 16px;
      color: var(--yyt-accent);
      filter: drop-shadow(0 0 6px var(--yyt-accent-glow));
      transition: transform 0.2s ease;
    }
    
    #${j}:hover .fa-fw {
      transform: scale(1.1);
    }
    
    #${j} span {
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
  `,n=t.createElement("style");n.id=e,n.textContent=r,(t.head||t.documentElement).appendChild(n),m("\u6837\u5F0F\u5DF2\u6CE8\u5165")}var d=null,k=null,tt="welcome";function X(){d&&(d.remove(),d=null),k&&(k.remove(),k=null),m("\u5F39\u7A97\u5DF2\u5173\u95ED")}function Pe(e){tt=e;let t=C.jQuery||window.jQuery;if(!(!t||!d)&&(t(d).find(".yyt-nav-item").removeClass("active"),t(d).find(`.yyt-nav-item[data-page="${e}"]`).addClass("active"),t(d).find(".yyt-page").removeClass("active"),t(d).find(`.yyt-page[data-page="${e}"]`).addClass("active"),e==="api"&&z)){let r=t(d).find("#youyou_toolkit-api-container");r.length&&z.render(r)}}function Ie(){if(d){m("\u5F39\u7A97\u5DF2\u5B58\u5728");return}let e=C.jQuery||window.jQuery,t=C.document||document;if(!e){Ae("jQuery \u672A\u627E\u5230\uFF0C\u65E0\u6CD5\u521B\u5EFA\u5F39\u7A97");return}k=t.createElement("div"),k.className="yyt-popup-overlay",k.addEventListener("click",a=>{a.target===k&&X()}),t.body.appendChild(k);let r=`
    <div class="yyt-popup" id="${Ze}">
      <div class="yyt-popup-header">
        <div class="yyt-popup-title">
          <i class="fa-solid fa-wand-magic-sparkles"></i>
          <span>YouYou \u5DE5\u5177\u7BB1</span>
          <span style="font-size: 12px; opacity: 0.6;">v${fe}</span>
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
  `,n=t.createElement("div");n.innerHTML=r,d=n.firstElementChild,t.body.appendChild(d),e(d).find(".yyt-popup-close").on("click",X),e(d).find(`#${g}-close-btn`).on("click",X),e(d).find(".yyt-nav-item").on("click",function(){let a=e(this).data("page");a&&Pe(a)}),m("\u5F39\u7A97\u5DF2\u6253\u5F00")}function F(){let e=C.jQuery||window.jQuery;if(!e){Ae("jQuery \u672A\u627E\u5230\uFF0C\u5EF6\u8FDF\u91CD\u8BD5..."),setTimeout(F,1e3);return}let t=C.document||document,r=e("#extensionsMenu",t);if(!r.length){m("\u9B54\u68D2\u83DC\u5355\u672A\u627E\u5230\uFF0C\u5EF6\u8FDF\u91CD\u8BD5..."),setTimeout(F,2e3);return}if(e(`#${de}`,r).length>0){m("\u83DC\u5355\u9879\u5DF2\u5B58\u5728");return}let a=e(`<div class="extension_container interactable" id="${de}" tabindex="0"></div>`),l=`
    <div class="list-group-item flex-container flexGap5 interactable" id="${j}" title="\u6253\u5F00 YouYou \u5DE5\u5177\u7BB1">
      <div class="fa-fw fa-solid fa-wand-magic-sparkles extensionsMenuExtensionButton"></div>
      <span>YouYou \u5DE5\u5177\u7BB1</span>
    </div>
  `,i=e(l);i.on("click",async function(c){c.stopPropagation(),m("\u83DC\u5355\u9879\u88AB\u70B9\u51FB");let f=e("#extensionsMenuButton",t);f.length&&r.is(":visible")&&f.trigger("click"),Ie()}),a.append(i),r.append(a),m("\u83DC\u5355\u9879\u5DF2\u6DFB\u52A0\u5230\u9B54\u68D2\u533A")}var ue={version:fe,id:g,init:Te,openPopup:Ie,closePopup:X,switchPage:Pe,addMenuItem:F,getStorage:()=>W,getApiConnection:()=>$,getPresetManager:()=>V,getUiComponents:()=>z,async getApiConfig(){return await Y(),W?W.loadSettings().apiConfig:null},async saveApiConfig(e){return await Y(),$?($.updateApiConfig(e),!0):!1},async getPresets(){return await Y(),V?V.getAllPresets():[]},async sendApiRequest(e,t){if(await Y(),$)return $.sendApiRequest(e,t);throw new Error("API\u6A21\u5757\u672A\u52A0\u8F7D")},async testApiConnection(){return await Y(),$?$.testApiConnection():{success:!1,message:"API\u6A21\u5757\u672A\u52A0\u8F7D"}}};async function Te(){if(m(`\u521D\u59CB\u5316\u5F00\u59CB... \u7248\u672C: ${fe}`),et(),await Y()){if(m("\u6240\u6709\u6A21\u5757\u52A0\u8F7D\u6210\u529F"),z){let r=C.document||document,n=`${g}-ui-styles`;if(!r.getElementById(n)){let a=r.createElement("style");a.id=n,a.textContent=z.getStyles(),(r.head||r.documentElement).appendChild(a)}}}else m("\u90E8\u5206\u6A21\u5757\u52A0\u8F7D\u5931\u8D25\uFF0C\u4F7F\u7528\u57FA\u7840\u529F\u80FD");let t=C.document||document;t.readyState==="loading"?t.addEventListener("DOMContentLoaded",()=>{setTimeout(F,1e3)}):setTimeout(F,1e3),m("\u521D\u59CB\u5316\u5B8C\u6210")}if(typeof window<"u"&&(window.YouYouToolkit=ue,typeof window.parent<"u"&&window.parent!==window))try{window.parent.YouYouToolkit=ue}catch{}var ut=ue;Te();m("\u6A21\u5757\u52A0\u8F7D\u5B8C\u6210");export{ut as default};
