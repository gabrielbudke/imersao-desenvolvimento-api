<div align="center">   
   <img src="https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/233_Node_Js_logo-256.png" width="180px">   
   <h1>Módulo 5</h1>
</div>

<h3 align="center">
  Banco de Dados - Projeto Multi-banco de dados
</h3>

<p align="center">
  <img alt="made by" src="https://img.shields.io/badge/made%20by-Gabriel%20Sousa-539E43?style=flat-square">

  <img alt="last commit" src="https://img.shields.io/github/last-commit/gabrielbudke/imersao-desenvolvimento-api?color=539E43&style=flat-square">

  <img alt="language count" src="https://img.shields.io/github/languages/count/gabrielbudke/imersao-desenvolvimento-api?color=539E43&style=flat-square">
</p>

## :gear: Comandos Docker

### Criando a imagem do postgres
```
docker run \
    --name postgres \
    -e POSTGRES_USER=admin \
    -e POSTGRES_PASSWORD=adminadmin \
    -e POSTGRES_DB=heroes \
    -p 5432:5432 \
    -d \
    postgres
```

#### Criando a imagem do client adminer
```
docker run \
    --name adminer \
    -p 8080:8080 \
    --link postgres:postgres \
    -d \
    adminer 
```
---
Made by Gabriel Sousa