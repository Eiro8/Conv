<div align="center">

<img src="./assets/Logo.png" width="144"/>

<h1 align="center">Conv</h1>

<p align="center">
  <strong>Um conversor de imagens desktop desenvolvido com Go, React e Wails.</strong>
</p>

</div>

## Sobre o projeto

O Conv é uma aplicação desktop para conversão e processamento de imagens, desenvolvida para oferecer uma experiência rápida, simples e totalmente local. O projeto utiliza **Go** para o processamento das imagens e **React** para a interface do usuário, integrados através do **Wails**.

O objetivo é permitir que usuários convertam múltiplas imagens entre diferentes formatos sem a necessidade de enviar arquivos para servidores externos, garantindo maior privacidade e desempenho.

## Funcionalidades

* Conversão entre formatos **PNG**, **JPG/JPEG** e **WEBP**
* Conversão de múltiplas imagens simultaneamente
* Drag and drop de arquivos
* Preview das imagens antes da conversão
* Controle de qualidade da conversão
* Seleção de diretório para salvar arquivos convertidos
* Processamento local das imagens
* Interface responsiva e intuitiva

## Tecnologias utilizadas

### Frontend

* React
* JavaScript
* CSS Modules
* GSAP

### Backend

* Go
* Wails

### Processamento de imagens

* Bibliotecas nativas de imagem do Go
* Goroutines para processamento paralelo
* Manipulação de arquivos locais

## Arquitetura

O projeto foi estruturado separando claramente as responsabilidades entre frontend e backend.

```text
Usuário
   ↓
React (Interface)
   ↓
Wails (Comunicação)
   ↓
Go (Processamento)
   ↓
Sistema de Arquivos
```

* **React** é responsável pela interface, gerenciamento de estado e interação do usuário.
* **Go** é responsável pelo processamento das imagens, conversões e manipulação dos arquivos.
* **Wails** atua como ponte entre o frontend e o backend.

## Build from source and contributing

Para executar o projeto localmente, siga os passos abaixo.

### Local development requirements

* Go
* Node.js
* npm
* Wails CLI

### Instalação

Clone o repositório:

```bash
git clone https://github.com/seu-usuario/conv.git
```

Acesse a pasta do projeto:

```bash
cd conv
```

Instale as dependências do frontend:

```bash
npm install
```

### Executando em modo de desenvolvimento

```bash
wails dev
```

### Gerando o executável

```bash
wails build
```

O executável será gerado na pasta `build/bin`.

## Decisões técnicas

### Processamento local

As imagens são processadas localmente para evitar o upload de arquivos e reduzir a latência durante a conversão.

### Uso de Go

Go foi escolhido para o backend devido ao seu bom desempenho em processamento de imagens e suporte nativo à concorrência.

### Conversão em lote

A conversão de múltiplas imagens utiliza goroutines para melhorar o desempenho e evitar travamentos na interface.

## Roadmap

* [x] Conversor de imagens
* [x] Conversão em lote
* [x] Drag and drop
* [x] Preview das imagens
* [ ] Gerador de favicon
* [ ] Compressor de imagens
* [ ] Suporte a novos formatos ( ICO, AVIF, etc...)

## Autor

Desenvolvido por **Israel Ribeiro Ramos**.

* GitHub: [Eiro8](https://github.com/Eiro8)
* LinkedIn: [Israel Ribeiro Ramos](https://www.linkedin.com/in/israel-rribeiro/)

## License

Conv is licensed under the [MIT License](LICENSE).
