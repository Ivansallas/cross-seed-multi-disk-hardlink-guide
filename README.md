# cross-seed-multi-disk-hardlink-guide
# Cross-Seed Multi-Disk Hardlink Setup

Configuração validada de Cross-Seed com Docker, qBittorrent, Prowlarr, Radarr e Sonarr utilizando múltiplos discos físicos e hardlinks.

## Objetivo

Implementar Cross-Seed em um ambiente Docker com múltiplos discos, evitando o erro:

```text
EXDEV: cross-device link not permitted
```

e garantindo:

* Hardlinks funcionais
* Economia de espaço em disco
* Injeção automática de torrents
* Compatibilidade com Radarr e Sonarr
* Compatibilidade com EasyPanel

---

# Ambiente

## Hardware

### Disco 1

```text
/mnt/media
```

Conteúdo:

```text
/mnt/media/filmes
/mnt/media/adulto
/mnt/media/links
```

### Disco 2

```text
/mnt/series
```

Conteúdo:

```text
/mnt/series/series
/mnt/series/animes
/mnt/series/links
```

---

# Estrutura de Diretórios

```text
/mnt/media
├── filmes
├── adulto
└── links

/mnt/series
├── series
├── animes
└── links
```

---

# Docker

## Rede

```text
easypanel-netflixhome
```

## Container

```bash
docker run -d \
  --name cross-seed \
  --restart unless-stopped \
  --network easypanel-netflixhome \
  -v /mnt/media/cross-seed/config:/config \
  -v /mnt/media:/media \
  -v /mnt/series:/series \
  ghcr.io/cross-seed/cross-seed:latest \
  daemon
```

---

# Configuração do Cross-Seed

Arquivo:

```text
/config/config.js
```

```js
module.exports = {
  dataDirs: [
    "/media/filmes",
    "/media/adulto",
    "/series/series",
    "/series/animes"
  ],

  linkDirs: [
    "/media/links",
    "/series/links"
  ],

  linkType: "hardlink",

  matchMode: "flexible",

  torrentClients: [
    "qbittorrent:http://usuario:senha@qbittorrent:8081"
  ],

  action: "inject",

  autoResumeMaxDownload: 500,

  searchCadence: "1 day",

  excludeRecentSearch: "7 days",
  excludeOlder: "30 days",

  delay: 120
};
```

---

# Solução para EXDEV

## Problema

Ao utilizar:

```js
linkDirs: ["/links"]
```

em ambientes com múltiplos discos físicos, o Cross-Seed pode gerar:

```text
EXDEV: cross-device link not permitted
```

porque hardlinks só funcionam dentro do mesmo sistema de arquivos.

## Solução

Criar um diretório de links em cada disco:

```text
/media/links
/series/links
```

e utilizar:

```js
linkDirs: [
  "/media/links",
  "/series/links"
]
```

---

# Validação dos Hardlinks

Criar arquivo:

```bash
echo "teste" > /mnt/media/teste.txt
```

Criar hardlink:

```bash
ln /mnt/media/teste.txt \
   /mnt/media/teste_hardlink.txt
```

Verificar inode:

```bash
ls -li /mnt/media/teste*
```

Resultado esperado:

```text
12 teste.txt
12 teste_hardlink.txt
```

Mesmo inode = hardlink válido.

---

# Exemplo Real

Arquivo original:

```text
/mnt/media/filmes/Anaconda (2025)/Anaconda (2025) WEBDL-1080p.mkv
```

Hardlinks:

```text
/mnt/media/links/Amigos Share Club/Anaconda.2025...
/mnt/media/links/SAMARITANO (API)/Anaconda.2025...
```

Verificação:

```bash
find /mnt/media -xdev -inum 3670508
```

Resultado:

```text
/mnt/media/filmes/Anaconda (2025)/...
/mnt/media/links/Amigos Share Club/...
/mnt/media/links/SAMARITANO (API)/...
```

Três caminhos apontando para o mesmo arquivo físico.

---

# Status Final

* qBittorrent funcionando
* Prowlarr funcionando
* Radarr funcionando
* Sonarr funcionando
* Cross-Seed funcionando
* Hardlinks validados
* EXDEV resolvido
* Injeção automática ativa
* Ambiente Docker estável
* Multi-disco operacional

---

# Backup

Salvar configuração validada:

```bash
cp config.js config.js.backup-hardlink-ok
```

Essa versão foi validada em produção e utilizada como configuração de referência.
