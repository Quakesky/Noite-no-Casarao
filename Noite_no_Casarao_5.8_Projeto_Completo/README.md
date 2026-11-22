# Noite no Casarão 5.8 — Atmosfera Sonora + Interface corrigida

Esta atualização preserva a arquitetura gratuita da versão 5.7: **Cloudflare Workers AI com o modelo Gemma, um único Worker para o jogo e IA na nuvem**. Não muda o código de infraestrutura (`src/worker.js`, `wrangler.toml`) nem exige chave ou serviço pago.

## Novidades

- Painel principal de diálogos **com altura fixa**: mostra somente os acontecimentos do turno atual e do anterior. O conteúdo longo passa a rolar **dentro** do quadro, sem esticar a interface.
- **Diário completo preservado** (menu DIÁRIO), inclusive para partidas salvas anteriores. Os registros antigos não foram excluídos; apenas deixam de aparecer no painel principal.
- **Trilha de suspense original**, em loop; chuva e vento; sons de corvos, coruja, uivos de lobo, passos em madeira, portas rangendo e trovões.
- Sons de movimento nas explorações e encontros; trovões nos blecautes; manifestações de animais em intervalos variados para evitar repetição mecânica.
- Música e efeitos ativados por padrão em novas partidas, com opção de silenciar rapidamente pelo botão 🔊 no topo e ajustar volumes no menu AJUSTES.
- Compatibilidade com salvamentos da versão 5.7. Ao continuar um salvamento antigo, a nova trilha é ativada por padrão (pode desligá-la nos ajustes).

Todos os arquivos de áudio em `public/audio/` são **composições e efeitos originais criados por síntese digital para este projeto**. Nenhuma biblioteca externa ou CDN é necessária para reproduzi-los.

## Atualizar o jogo que você já publicou no GitHub

1. Extraia **todo o ZIP** desta versão 5.8.
2. Abra seu repositório **Noite-no-Casarao** no GitHub.
3. Envie o conteúdo extraído **mantendo as pastas** (ou, no mínimo, substitua `public/index.html` e envie a nova pasta `public/audio/` com todos os oito arquivos `.ogg`).
4. Faça **Commit changes**. A Cloudflare deverá iniciar uma implantação automaticamente se a integração com GitHub já estiver configurada.
5. Espere o status **Success** na aba de implantações e recarregue a página pública usando **Ctrl+F5**.
6. Clique em **Entrar no casarão** ou **Continuar partida**, e confira os sons. O navegador só libera som após a interação do usuário: isso é normal e não requer configuração extra.

**Importante:** Não envie somente o HTML se quiser os sons. Os oito arquivos `.ogg` precisam estar na pasta `public/audio/` e ser publicados. O projeto ZIP contém tudo o que é necessário para publicação.

## Sem custos adicionais

- Sons são arquivos estáticos leves, hospedados juntamente com o HTML; **não consomem chamadas de IA**.
- A IA continua usando Cloudflare Workers AI dentro da franquia gratuita da conta, sujeita aos limites da Cloudflare.
- O áudio não depende da internet além do carregamento normal do jogo e dos arquivos publicados no mesmo domínio.
- O jogo e o áudio mantêm suas configurações locais e salvamento no navegador.

## Verificar áudio

Em AJUSTES, mantenha **Sons** e **Música** ativados. O botão 🔊 deve estar ligado. Se o som não sair, verifique o volume do dispositivo, se a aba do navegador não está silenciada e se os arquivos `.../audio/trilha_suspense_original.ogg` e `.../audio/coruja.ogg` abrem pelo domínio publicado.

## Testes

- Sintaxe JavaScript e cinco testes do servidor de IA.
- Reprodução e carregamento dos arquivos OGG com um navegador Chromium de teste.
- Quadro principal em larguras 390, 850, 1200 e 1440 px: altura não variou após 144 eventos de 12 turnos; só os turnos 11 e 12 ficaram visíveis no painel; todos os 144 eventos permaneceram no Diário.
- Respostas do servidor de IA foram simuladas para esses testes. A geração real permanece dependente da conta Cloudflare onde o jogo já está publicado.
