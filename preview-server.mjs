import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, resolve, sep } from 'node:path';

const root = process.cwd();
const types = { '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.mjs':'text/javascript; charset=utf-8', '.json':'application/json; charset=utf-8', '.png':'image/png', '.jpg':'image/jpeg', '.jpeg':'image/jpeg', '.svg':'image/svg+xml' };
createServer(async (req,res) => {
  if (!['GET','HEAD'].includes(req.method)) { res.writeHead(405,{Allow:'GET, HEAD'}).end(); return; }
  let pathname;
  try { pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname); } catch { res.writeHead(400).end('Bad request'); return; }
  const relative=pathname==='/'?'/index.html':pathname;
  if (relative.split('/').some(part=>part.startsWith('.')&&part!=='.nojekyll')) { res.writeHead(404).end('Not found'); return; }
  const file=resolve(root,`.${relative}`);
  if (file!==root&&!file.startsWith(root+sep)) { res.writeHead(403).end('Forbidden'); return; }
  try { if (!(await stat(file)).isFile()) throw new Error(); const data=await readFile(file); res.writeHead(200,{'Content-Type':types[extname(file).toLowerCase()]||'application/octet-stream','Cache-Control':'no-cache'}); res.end(req.method==='HEAD'?undefined:data); }
  catch { res.writeHead(404,{'Content-Type':'text/plain; charset=utf-8'}).end('Not found'); }
}).listen(Number(process.env.PORT)||4176,'127.0.0.1',()=>console.log(`ЛЕО preview: http://127.0.0.1:${Number(process.env.PORT)||4176}`));
