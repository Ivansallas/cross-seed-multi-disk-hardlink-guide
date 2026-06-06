# Solução para EXDEV

## Erro

```text
EXDEV: cross-device link not permitted
```

## Causa

Tentativa de criar hardlink entre discos diferentes.

Exemplo:

```text
/media/filmes
→ Disco A

/links
→ Disco B
```

Hardlinks não funcionam entre filesystems diferentes.

## Solução

Criar:

```text
/media/links
/series/links
```

Configurar:

```js
linkDirs: [
  "/media/links",
  "/series/links"
]
```

## Resultado

Hardlinks funcionando nos dois discos.