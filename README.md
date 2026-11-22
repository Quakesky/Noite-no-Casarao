# Noite no Casarão 5.7 — IA generativa gratuita na nuvem

A versão 5.7 adapta a **versão 5.6** para **Cloudflare Workers AI**, usando o modelo `@cf/google/gemma-4-26b-a4b-it`. O mesmo Worker serve o jogo (`public/index.html`) e a API de narrativa (`/api/narrate`) e diretor (`/api/decide`).

## Para jogadores

- Abrir o link `https://...workers.dev` fornecido pelo proprietário.
- Selecionar personagem e jogar. **Nenhuma instalação, chave de API, modelo, software ou cadastro exigido.**
- Narrativas, falas, pistas e propostas de atuação do assassino podem usar geração de texto na nuvem; os fatos e o funcionamento do jogo permanecem sob controle do motor de regras.
- Se a franquia diária da IA esgotar ou o modelo ficar temporariamente indisponível, a partida continua com narrativa local. **Salvar e continuar** seguem disponíveis no navegador, no mesmo endereço de publicação.

## Para o proprietário: publicar sem terminal

Estas etapas são feitas **uma vez**, com conta gratuita no GitHub e na Cloudflare. Não é preciso chave da OpenAI nem configurar faturamento de API.

1. Acesse [GitHub](https://github.com/new) e crie um repositório (público ou privado), por exemplo `Noite-no-Casarao`.
2. No repositório, **Add file → Upload files**. Envie o conteúdo desta pasta, mantendo `wrangler.toml`, `package.json`, `src/worker.js` e `public/index.html` na estrutura correta. Não envie apenas o ZIP.
3. Entre em [Cloudflare](https://dash.cloudflare.com/), em **Workers & Pages → Create application → GitHub**. Autorize o repositório.
4. **Worker name:** `noite-no-casarao-gratis`. O nome deve ser igual ao `name` do `wrangler.toml`.
5. **Root directory:** raiz do repositório. **Build command:** vazio. **Deploy command:** `npx wrangler deploy`.
6. Clique em **Save and Deploy** e abra a URL exibida terminada em `.workers.dev`.

**Nota:** O layout do painel Cloudflare pode mudar. Se a Cloudflare pedir um nome e der outro nome automaticamente, use o mesmo nome do `wrangler.toml` ou altere ambos de modo consistente. A configuração de IA é realizada pelo bloco `[ai]` em `wrangler.toml`; **não é necessário cadastrar uma chave no painel**.

## Como saber se a IA realmente está funcionando?

- Abra a URL pública do jogo e adicione `/api/health` no final. Deve retornar JSON contendo `"active":true` e `"mode":"workers-ai-free"`.
- **Isso confirma o vínculo de IA, não a inferência real.** Para validar o modelo, jogue até conversar com um NPC, faça uma pergunta e observe o texto gerado. O indicador de IA passa a confirmar a geração após a resposta.
- Se as falas forem locais ou aparecer erro, consulte os logs de requisições do Worker na Cloudflare. Erros de quota, limite de requisições e indisponibilidade do modelo impedem a geração; o jogo não para.

## Limites e custos

- A Cloudflare documenta **10.000 Neurons/dia gratuitos** no Workers AI. O uso acima do gratuito falha no plano Workers Free. Planos e limites são definidos pela Cloudflare e podem mudar.
- O Worker Free também tem limites de requisições independentes do limite de IA. **Não há promessa de uso ilimitado.**
- O código tem proteção inicial contra excesso de requisições e contra requisições de outra origem. O contador em memória é **por instância**, não é rate limit global à prova de abuso. Antes de divulgar para muita gente, configure regras de rate limiting na Cloudflare.
- O jogo não envia a identidade do jogador nem dados pessoais ao modelo por padrão; o estado ficcional de jogo é usado para construir as mensagens. Evite introduzir dados pessoais nas conversas.

## Arquivos

| Arquivo | Função |
|---|---|
| `public/index.html` | Jogo cinematográfico, mapa, inventário, história, salvamentos e conexão automática com a API no mesmo domínio |
| `src/worker.js` | Controla as chamadas ao modelo e valida a resposta estruturada do diretor |
| `wrangler.toml` | Hospedagem de arquivos e binding gratuito `AI` |
| `package.json` | Comandos opcionais de implantação e de testes |
| `tests/server.test.mjs` | Testes automatizados de API com respostas de modelo simuladas |

## Para desenvolvedores (opcional)

Se quiser testar com terminal: `npm install`, `npm test`, `npx wrangler login`, `npm run deploy`.

Não use `file:///.../public/index.html` para testar a **IA**: o servidor de `/api/*` não existe em um arquivo local. O HTML funciona em modo narrativa local se aberto sem publicação.

**Limitação dos testes desta entrega:** as rotas foram testadas com `env.AI.run` simulado e o navegador foi testado com endpoints simulados. Uma chamada real na conta Cloudflare ainda precisa ser confirmada após a publicação.

Fontes oficiais: [Workers AI binding](https://developers.cloudflare.com/workers-ai/configuration/bindings/), [Workers AI pricing](https://developers.cloudflare.com/workers-ai/platform/pricing/), [Gemma 4](https://developers.cloudflare.com/workers-ai/models/gemma-4-26b-a4b-it/), [Git integration](https://developers.cloudflare.com/workers/ci-cd/builds/).
