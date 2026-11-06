#!/bin/sh
# Versão fixada (evita atualização surpresa ao recriar o container)
docker run -d \
  --name cross-seed \
  --restart unless-stopped \
  --network easypanel-netflixhome \
  -v /mnt/media/cross-seed/config:/config \
  -v /mnt/media:/media \
  -v /mnt/series:/series \
  ghcr.io/cross-seed/cross-seed:6.13.7 \
  daemon
