import esbuild from 'esbuild';

const cssTextLoader = { loader: { '.css': 'text' } };

const builds = {
  build: {
    entryPoints: ['index.js'],
    bundle: true,
    format: 'esm',
    outfile: 'dist/bundle.js',
    minify: true,
    ...cssTextLoader,
  },
  dev: {
    entryPoints: ['index.js'],
    bundle: true,
    format: 'esm',
    outfile: 'dist/bundle.js',
    ...cssTextLoader,
  },
  iife: {
    entryPoints: ['index.js'],
    bundle: true,
    format: 'iife',
    globalName: 'YouYouToolkit',
    outfile: 'dist/bundle.iife.js',
    minify: true,
    ...cssTextLoader,
  },
};

const target = process.argv[2];
if (!target || !builds[target]) {
  console.error(`Usage: node esbuild.config.js <build|dev|iife>`);
  process.exit(1);
}

esbuild.build(builds[target]).then(() => {
  console.log(`  ${builds[target].outfile}  done`);
}).catch(() => process.exit(1));
