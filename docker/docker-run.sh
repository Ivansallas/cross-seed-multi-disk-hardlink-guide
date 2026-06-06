docker run -d \
  --name cross-seed \
  --restart unless-stopped \
  --network easypanel-netflixhome \
  -v /mnt/media/cross-seed/config:/config \
  -v /mnt/media:/media \
  -v /mnt/series:/series \
  ghcr.io/cross-seed/cross-seed:latest \
  daemon