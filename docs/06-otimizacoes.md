# Otimizações (novembro/2026)

Ajustes aplicados depois de uma auditoria. A configuração completa está em [`config/config.js`](../config/config.js).

## 1. Semeadura sem limite para o cross-seed (qBittorrent 5.3)

O qBittorrent tinha um limite global (ratio 1 ou 7 dias). Em tracker privado, isso derruba o ratio.
O qBittorrent 5.x aceita limite **por categoria**, então só as categorias do cross-seed ficaram sem limite:

```bash
curl -b cookie http://localhost:8081/api/v2/torrents/editCategory \
  -d "category=cross-seed-link&savePath=&ratioLimit=-1&seedingTimeLimit=-1&inactiveSeedingTimeLimit=-1&shareLimitAction=Default&shareLimitsMode=Default"
```

Os torrents novos herdam o limite da categoria (valor `-2` = "usar o da categoria").
Os torrents do Sonarr e do Radarr continuam com a regra global.

## 2. Busca imediata ao terminar um download

No qBittorrent: **Opções → Downloads → Executar programa externo ao concluir torrent**:

```bash
curl -s -XPOST http://cross-seed:2468/api/webhook?apikey=API_KEY_DO_CROSS_SEED -d "infoHash=%I"
```

- A chave sai de `docker exec cross-seed cross-seed api-key`.
- O qBittorrent e o cross-seed precisam estar na mesma rede Docker (`easypanel-netflixhome`).
- Isso cobre o Sonarr e o Radarr ao mesmo tempo, porque todo download passa pelo qBittorrent.

## 3. RSS, janela de busca e modo de correspondência

| Opção | Antes | Depois | Por quê |
|---|---|---|---|
| `rssCadence` | (desligado) | `15 minutes` | pega uploads novos nos trackers |
| `excludeOlder` | `7 days` | `2 weeks` | volta a procurar itens que aparecem depois em outro tracker |
| `matchMode` | `flexible` | `partial` | aceita torrents com arquivos extras pequenos |
| `useClientTorrents` | — | `true` | usa os torrents do qBittorrent como fonte |
| `autoResumeMaxDownload` | `500` | `52428800` | retoma sozinho quando faltam até 50 MiB |

## 4. Manutenção dos links

As pastas `links/` acumulam sobras quando um torrent sai do qBittorrent.
Se o Radarr ou o Sonarr trocar o arquivo original, a cópia na pasta de links passa a ser a **única**
e continua ocupando espaço (arquivo "órfão", com 1 link só).

Encontrar órfãos:

```bash
find /mnt/media/links /mnt/series/links -type f -links 1
```

Antes de apagar, confira se o arquivo ainda pertence a algum torrent no qBittorrent.
De preferência, mova para a lixeira do Radarr ou do Sonarr em vez de apagar direto.

## 5. Erro "has invalid permissions: does not exist"

Com `useClientTorrents: true`, o cross-seed valida o caminho de **todos** os torrents do qBittorrent.
Um torrent salvo num caminho que não está montado (ex.: `/downloads`) gera esse erro.
A correção é mudar o local do torrent para um caminho montado (`/media/downloads`).

## 6. IDs do Prowlarr

O `torznab` usa o **ID** de cada indexador. Apagar e recriar um indexador muda o ID.
O cross-seed passa a dar erro 404 até o `config.js` ser atualizado.
