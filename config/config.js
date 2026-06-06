module.exports = {
  dataDirs: [
    "/media/filmes",
    "/media/adulto",
    "/series/series",
    "/series/animes",
  ],

  linkDirs: ["/media/links", "/series/links"],

  linkType: "hardlink",

  matchMode: "flexible",

  torrentClients: ["qbittorrent:http://usuario:senha@qbittorrent:8081"],

  action: "inject",

  autoResumeMaxDownload: 500,

  searchCadence: "1 day",

  excludeRecentSearch: "7 days",

  excludeOlder: "30 days",

  torznab: ["http://PROWLARR_IP:9696/INDEXER_ID/api?apikey=PROWLARR_API_KEY"],

  delay: 120,
};
