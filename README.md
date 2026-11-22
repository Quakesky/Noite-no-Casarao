# Noite no Casarão 6.1 — Terror Imersivo

**Atualização incremental da 6.0, sem alterar `src/worker.js`, `wrangler.toml` ou a configuração gratuita do Cloudflare Workers AI.**

## Novidades
- Trilha instrumental de suspense original da 5.9/6.0 preservada.
- Sete efeitos ambientais novos/reconstruídos e embutidos em `public/index.html`: corvos, coruja, uivo, passos em madeira, porta rangendo, trovão e batimentos cardíacos. A chuva original continua.
- Sequência alternada de **seis sons ambientais a cada 20 segundos**; passos e portas também acompanham a movimentação e trovões acompanham blecautes.
- Ao sangrar, o jogador ouve pulsação dupla que acelera e se intensifica conforme a contagem restante diminui. O volume da música recua parcialmente para destacar o efeito.
- Sangue escorrendo na borda da tela, aumentando conforme a hemorragia avança. Para com kit médico, derrota ou ao iniciar nova partida. Respeita configuração de redução de movimento.
- **8 variantes de retratos feridos**, geradas para cada personagem; aparecem em seleção, conversa e retrato principal quando o personagem está machucado. O estado saudável volta após tratamento.
- Mantidos o modo mobile, o desktop, o Diário, o mapa, o inventário, os salvamentos e a IA.

## Atualizar o site no GitHub (recomendado)
1. Extraia `Noite_no_Casarao_6.1_Atualizacao_Simples.zip`.
2. No repositório atual, substitua **somente** o arquivo `public/index.html` pelo novo.
3. Confirme o commit, aguarde a implantação verde no painel da Cloudflare e force atualização com Ctrl+F5 no PC ou recarregue no celular.
4. Veja o rótulo `v6.1` sob o título.
5. Inicie uma partida e vá a Ajustes para testar cada efeito e os batimentos.

O `index.html` inclui os arquivos sonoros e os retratos feridos como `data:` URIs, portanto é suficiente para atualizar e não depende da pasta `audio` da Cloudflare. A pasta `public/audio` e as variantes `public/ferido_*.webp` também estão no pacote completo como cópias inspecionáveis. Música/chuva são originais; os novos sons ambientais foram sintetizados e remixados para esta versão.

## Verificação
O site publicado continua dependendo da sua implantação no mesmo Worker; testes automatizados aqui não equivalem a uma audição real em todos os celulares.
