# Estrutura dos Discos

## Disco 1

```text
/mnt/media
```

```text
filmes
adulto
links
```

## Disco 2

```text
/mnt/series
```

```text
series
animes
links
```

## Por que isso é necessário?

Hardlinks funcionam apenas dentro do mesmo filesystem.

Por isso cada disco precisa de sua própria pasta links.