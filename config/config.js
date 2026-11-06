// cross-seed v6.13.7 — configuração em produção (segredos substituídos por placeholders)
module.exports = {
  dataDirs: [
    "/media/filmes",
    "/media/adulto",
    "/series/series",
    "/series/animes",
  ],

  // Um linkDir por disco físico (hardlink não atravessa filesystems → EXDEV)
  linkDirs: ["/media/links", "/series/links"],

  linkType: "hardlink",

  // partial: aceita torrents em que faltam só arquivos pequenos (nfo, legendas);
  // o que faltar é baixado e o torrent retomado automaticamente.
  matchMode: "partial",

  torrentClients: ["qbittorrent:http://USUARIO:SENHA@netflixhome_qbittorrent:8081"],

  action: "inject",

  // Retoma sozinho se faltar até 50 MiB (padrão do cross-seed)
  autoResumeMaxDownload: 52428800,

  // Usa também os torrents que já estão no qBittorrent como fonte
  useClientTorrents: true,

  // RSS pega lançamentos novos; a busca diária cobre o acervo
  rssCadence: "15 minutes",
  searchCadence: "1 day",
  excludeRecentSearch: "3 days",
  excludeOlder: "2 weeks", // precisa ser 2–5x o excludeRecentSearch

  // IDs dos indexadores no Prowlarr: se um indexador for apagado e recriado,
  // o ID muda e esta lista precisa ser atualizada.
  torznab: [
    "http://172.17.0.1:9696/ID_INDEXADOR_1/api?apikey=PROWLARR_API_KEY",
    "http://172.17.0.1:9696/ID_INDEXADOR_2/api?apikey=PROWLARR_API_KEY",
  ],

  delay: 120,
};
