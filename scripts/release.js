#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

function run(cmd, opts = {}) {
  console.log(`> ${cmd}`);
  return execSync(cmd, { cwd: root, stdio: 'inherit', ...opts });
}

function runCapture(cmd) {
  return execSync(cmd, { cwd: root, encoding: 'utf-8' }).trim();
}

const pkg = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf-8'));
const version = pkg.version;
const tag = `v${version}`;

// ── 1. 同步 SCRIPT_VERSION 到 index.js
console.log(`\n🔄 同步版本号 ${version} 到 index.js ...\n`);
const indexPath = resolve(root, 'index.js');
const indexContent = readFileSync(indexPath, 'utf-8');
const updatedIndex = indexContent.replace(
  /const SCRIPT_VERSION = '[^']*'/,
  `const SCRIPT_VERSION = '${version}'`
);
if (updatedIndex !== indexContent) {
  writeFileSync(indexPath, updatedIndex, 'utf-8');
  console.log(`  ✅ SCRIPT_VERSION 已更新为 '${version}'`);
} else {
  console.log(`  ℹ️  SCRIPT_VERSION 已经是 '${version}'，无需更新`);
}

// ── 2. 检查工作区是否干净（dist/ 和 index.js 除外）
const status = runCapture('git status --porcelain')
  .split('\n')
  .filter(l => l && !l.trimStart().startsWith('?'));
const dirtyOther = status.filter(l => !l.includes('dist/') && !l.includes('index.js') && !l.includes('package.json') && !l.includes('settings.local') && !l.includes('scripts/release.js'));
if (dirtyOther.length) {
  console.error('\n❌ 工作区有未提交的更改（dist/、index.js 以外）：');
  dirtyOther.forEach(l => console.error(`   ${l}`));
  console.error('\n请先提交或暂存后再发布。');
  process.exit(1);
}

// ── 3. 构建
console.log(`\n📦 构建 ${tag} ...\n`);
run('npm run build');

// ── 4. 提交 index.js + dist（如果有变更）
const changedFiles = runCapture('git status --porcelain index.js dist/');
if (changedFiles) {
  run('git add index.js dist/');
  run(`git commit -m "build: ${tag}"`);
}

// ── 5. 创建版本 tag
const existingTags = runCapture('git tag --list').split('\n');
if (existingTags.includes(tag)) {
  console.log(`\n⚠️  Tag ${tag} 已存在，将强制更新。`);
  run(`git tag -f ${tag}`);
} else {
  console.log(`\n🏷️  创建 tag ${tag}`);
  run(`git tag ${tag}`);
}

// ── 6. 移动 latest tag
console.log('🏷️  移动 latest tag');
run('git tag -f latest');

// ── 7. 推送
console.log('\n🚀 推送到远程 ...\n');
run('git push');
run('git push --tags --force');

// ── 8. 清理 jsDelivr 缓存（主域 + testingcf 镜像）
console.log('\n🧹 清理 jsDelivr 缓存 ...\n');

const cdnPaths = [
  `gh/heis1696/youyou_Toolkit@latest/dist/bundle.js`,
  `gh/heis1696/youyou_Toolkit@${tag}/dist/bundle.js`,
  `gh/heis1696/youyou_Toolkit@latest/dist/bundle.iife.js`,
  `gh/heis1696/youyou_Toolkit@${tag}/dist/bundle.iife.js`,
];

const purgeDomains = [
  'https://purge.jsdelivr.net',
];

for (const path of cdnPaths) {
  for (const domain of purgeDomains) {
    const url = `${domain}/${path}`;
    try {
      const resp = await fetch(url);
      const data = await resp.json();
      const icon = data.status === 'finished' ? '✅' : '⚠️';
      console.log(`  ${icon} ${url}`);
    } catch (e) {
      console.log(`  ❌ ${url} — ${e.message}`);
    }
  }
}

// ── 9. 验证 CDN 是否生效
console.log('\n🔍 验证 CDN 版本 ...\n');

const verifyUrls = [
  `https://cdn.jsdelivr.net/gh/heis1696/youyou_Toolkit@${tag}/dist/bundle.js`,
  `https://cdn.jsdelivr.net/gh/heis1696/youyou_Toolkit@latest/dist/bundle.js`,
  `https://testingcf.jsdelivr.net/gh/heis1696/youyou_Toolkit@${tag}/dist/bundle.js`,
  `https://testingcf.jsdelivr.net/gh/heis1696/youyou_Toolkit@latest/dist/bundle.js`,
];

for (const url of verifyUrls) {
  try {
    const resp = await fetch(url);
    const text = await resp.text();
    const foundVersion = text.includes(`"${version}"`) ? version : '(缓存未刷新)';
    const icon = foundVersion === version ? '✅' : '⚠️';
    console.log(`  ${icon} ${foundVersion} ← ${url.replace('https://', '').split('/')[0]}@${url.includes('@latest') ? 'latest' : tag}`);
  } catch (e) {
    console.log(`  ❌ ${url.replace('https://', '').split('/').slice(0, 1)} — ${e.message}`);
  }
}

console.log(`
✅ 发布完成！

版本:  ${tag}
引用:  import 'https://testingcf.jsdelivr.net/gh/heis1696/youyou_Toolkit@latest/dist/bundle.js'
或:    import 'https://testingcf.jsdelivr.net/gh/heis1696/youyou_Toolkit@${tag}/dist/bundle.js'

💡 如果 @latest 缓存未刷新，可临时使用 @${tag} 引用。
`);
