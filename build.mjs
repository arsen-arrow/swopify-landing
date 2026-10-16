import fs from 'node:fs/promises';
import crypto from 'node:crypto';
import Babel from '@babel/standalone';
const files=['components','Sections','Hero','Story','Trail','Steps','Tape','SideNav','Mobile','App'];
const parts=[];
for(const file of files){
  const source=await fs.readFile(`${file}.jsx`,'utf8');
  const result=Babel.transform(source,{presets:['react'],compact:true,comments:false,filename:`${file}.jsx`});
  parts.push(`(()=>{${result.code}})();`);
  if(file==='components')parts.push('Object.assign(window,window.SwopifyDesignSystem_ad534d);');
}
const bundle=parts.join('\n');
await fs.writeFile('app.js',bundle);
await fs.mkdir('vendor',{recursive:true});
await fs.copyFile('node_modules/react/umd/react.production.min.js','vendor/react.production.min.js');
await fs.copyFile('node_modules/react-dom/umd/react-dom.production.min.js','vendor/react-dom.production.min.js');
await fs.copyFile('node_modules/react/LICENSE','vendor/REACT-LICENSE.txt');
const css=await fs.readFile('mobile.css','utf8');
const version=crypto.createHash('sha256').update(bundle+css).digest('hex').slice(0,12);
const html=await fs.readFile('index.html','utf8');
await fs.writeFile('index.html',html.replace(/(app\.js|mobile\.css)\?v=[a-z0-9-]+/g,`$1?v=${version}`));
console.log(`Built ${files.length} source modules; app.js ${Math.round(bundle.length/1024)} KB; version ${version}`);
