# Noite no Casarão 5.9 — Correção do painel e trilha cinematográfica

Esta versão mantém o mesmo Worker Cloudflare, modelo Workers AI e sistema de salvamento das versões 5.7/5.8.

## O que foi corrigido

- O painel da narrativa tem altura rígida; o texto excedente rola *dentro* do quadro.
- O painel mostra **somente o turno atual e o imediatamente anterior**, não os últimos N registros. Ex.: no turno 5 só existem registros dos turnos 4 e 5. O Diário guarda todos os acontecimentos.
- Todos os **8 áudios estão embutidos no `public/index.html`** como dados OGG: a música e os efeitos do jogo não dependem de uma pasta `audio/` publicada. A pasta `public/audio` continua neste ZIP para reprodução separada e eventual utilização em futuras versões.
- A antiga trilha foi substituída por composição original instrumental mais tensa, com piano, cordas graves, ostinato e pulsação rítmica. A nova trilha dura aproximadamente 76 segundos e toca em loop.
- **Corvos, uivo de lobo e passos foram refeitos**: os três arquivos da versão anterior continham silêncio digital, agora foram reconstruídos e testados.
- Efeitos alternam automaticamente, em ordem, a cada **20 segundos**: corvos → coruja → uivo de lobo → passos → porta rangendo → repetir. Um som inicial ocorre ao iniciar a partida. Trovões e passos também surgem em situações apropriadas do jogo. A chuva de fundo continua.
- Em Ajustes existe o botão **🔊 Testar próximo efeito**, para percorrer imediatamente os sons e comprovar o resultado.
- A versão **v5.9** aparece abaixo do nome do jogo na página, para identificar se a atualização foi realmente publicada.

## O jeito MAIS SIMPLES de atualizar sem mexer no servidor de IA

1. Descompacte o ZIP de **ATUALIZAÇÃO SIMPLES**.
2. Entre no GitHub, no repositório já conectado à Cloudflare.
3. Entre na pasta `public` e **substitua o `index.html` existente pelo novo `index.html`**. Preserve todo o restante do repositório.
4. Faça **Commit changes**.
5. Confira a implantação mais recente em Cloudflare → Workers & Pages → seu Worker → Implantações.
6. Atualize o endereço público com Ctrl+F5. O rodapé do título deve indicar **v5.9**.
7. Abra o jogo, inicie/continue a partida e vá em **AJUSTES → Testar próximo efeito**. O som começará após o clique do usuário (regra dos navegadores).
8. Verifique o painel quando avançar até o turno 5; ele deve mostrar apenas os turnos 4 e 5.

Este passo-a-passo NÃO exige reenviar a pasta `audio` e NÃO modifica a API/IA em nuvem.

## Projeto completo

Se preferir substituir todos os arquivos, use o ZIP de **PROJETO COMPLETO**. Ele mantém `src/worker.js`, `wrangler.toml`, `package.json`, `tests` e os áudios em `public/audio/`. Esta versão também altera `/api/health` para indicar `"version": "5.9"`, mas a troca do Worker é opcional para corrigir os recursos visuais e de áudio.

## Importante sobre o antigo erro 404

Na versão 5.8, `.../audio/trilha_suspense_original.ogg` retornava 404 no site publicado. Com a 5.9 o jogo reproduz a trilha diretamente de dentro do `index.html`, portanto **o funcionamento do áudio não depende mais de o link `/audio/...` responder**. Esse link só abrirá se a pasta `public/audio` do projeto completo também tiver sido enviada ao GitHub e implantada.

## Testes realizados

- JavaScript validado por `node --check`.
- Cinco testes automatizados do Worker/Workers AI passaram, com a API simulada.
- Navegador Chromium: janelas 1440, 1024, 850 e 390 px; interface sem aumento de altura após 144 registros em 12 turnos; Diário preservado integralmente.
- Reprodução de música e chuva a partir de URLs `data:audio/ogg` em navegador, sem requisições à pasta `/audio`.
- Sequência dos cinco efeitos testada com intervalos acelerados. O algoritmo utiliza 20.000 ms em condições normais, com restrições de execução em abas inativas impostas pelo navegador.
- Todos os efeitos OGG inspecionados para garantir sinal não nulo, inclusive corvos, lobo e passos.

Não foi possível validar a nova publicação no domínio Cloudflare do usuário; a atualização só estará no site após o novo commit e implantação.
