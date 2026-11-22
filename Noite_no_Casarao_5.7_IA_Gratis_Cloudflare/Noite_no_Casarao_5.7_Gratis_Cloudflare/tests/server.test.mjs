import test from 'node:test';
import assert from 'node:assert/strict';
import worker from '../src/worker.js';
let calls = [];
const env={
 AI_MODEL:'@cf/google/gemma-4-26b-a4b-it',
 AI:{run:async(model,input)=>{calls.push({model,input});return {response:input.messages[0].content.includes('diretor secreto')?'```json\n{"action":"stalk","target":2,"npcAction":"withdraw","npcActor":3}\n```':'A chuva bate nas vidraças; alguém respira do outro lado da porta, mas ninguém se apresenta.'}}},
 ASSETS:{fetch:async()=>new Response('GAME ASSET')}
};
const request=(path,body,origin='https://jogo.example')=>new Request('https://jogo.example'+path,{method:'POST',headers:{Origin:origin,'content-type':'application/json'},body:JSON.stringify(body)});
test('health respeita o binding e informa modo grátis',async()=>{
 const r=await worker.fetch(new Request('https://jogo.example/api/health'),env);
 assert.equal(r.status,200);const data=await r.json();assert.equal(data.active,true);assert.equal(data.mode,'workers-ai-free');
 const noAI=await worker.fetch(new Request('https://jogo.example/api/health'),{...env,AI:undefined});assert.equal((await noAI.json()).active,false);
});
test('narração chama modelo Workers AI e preserva endpoint do cliente',async()=>{
 const r=await worker.fetch(request('/api/narrate',{kind:'dialogo',foundation:'Ouvi um grito na Biblioteca.',context:'testemunha assustada'}),env);
 assert.equal(r.status,200);assert.match((await r.json()).text,/chuva/);assert.equal(calls.at(-1).model,'@cf/google/gemma-4-26b-a4b-it');
 assert.equal(calls.at(-1).input.messages.length,2);
});
test('diretor interpreta JSON com bloco markdown e valida IDs',async()=>{
 const r=await worker.fetch(request('/api/decide',{turn:9,playerId:1,survivors:[{id:2,alive:true},{id:3,alive:true}],killer:{id:4},witnesses:[2]}),env);
 assert.equal(r.status,200);assert.deepEqual(await r.json(),{action:'stalk',target:2,npcAction:'withdraw',npcActor:3});
});
test('bloqueia origem externa, corpo inválido e AI sem configuração',async()=>{
 const cross=await worker.fetch(request('/api/narrate',{kind:'pista',foundation:'Marca de mão ensanguentada'},'https://evil.example'),env);assert.equal(cross.status,403);
 const bad=await worker.fetch(request('/api/narrate',{kind:'dialogo',foundation:'Oi'}),env);assert.equal(bad.status,400);
 const missing=await worker.fetch(request('/api/narrate',{kind:'dialogo',foundation:'Marca na porta'}),{...env,AI:undefined});assert.equal(missing.status,503);
});
test('arquivos estáticos continuam servidos normalmente',async()=>{
 const r=await worker.fetch(new Request('https://jogo.example/'),env);assert.equal(await r.text(),'GAME ASSET');
});
