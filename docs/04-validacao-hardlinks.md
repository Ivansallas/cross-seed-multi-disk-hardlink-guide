# Validação de Hardlinks

Criar arquivo:

```bash
echo "teste" > /mnt/media/teste.txt
```

Criar hardlink:

```bash
ln /mnt/media/teste.txt \
   /mnt/media/teste_hardlink.txt
```

Verificar:

```bash
ls -li /mnt/media/teste*
```

Resultado:

```text
12 teste.txt
12 teste_hardlink.txt
```

Mesmo inode = hardlink válido.