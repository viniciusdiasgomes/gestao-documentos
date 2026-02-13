📁 Document Management System

Sistema web full stack para gerenciamento de documentos, permitindo upload, organização, visualização e versionamento de comentários, com arquitetura desacoplada entre frontend, backend e banco de dados.


- Arquitetura

A aplicação segue o modelo Client–Server, com separação clara de responsabilidades:

Frontend (React + Vite)
        ↓ REST API
Backend (Node.js + Express)
        ↓
Banco de Dados Relacional ( PostgreSQL)
        ↓
Armazenamento de arquivos (filesystem)


- Componentes do Sistema
Frontend:
Responsável pela interface do usuário, consumo da API e controle de estado da aplicação.

Backend:
Responsável por regras de negócio, persistência, validações e exposição de endpoints REST.

Banco de Dados:
Responsável por persistência relacional e integridade dos dados.

- Frontend
Stack Tecnológico
React 18
TypeScript
Vite
React Router DOM
CSS modularizado
Fetch API

-Estrutura
src/
 ├─ assets/
 ├─ components/
 ├─ hooks/
 ├─ pages/
 ├─ services/
 ├─ styles/
 └─ types/

- Principais Responsabilidades

Renderização da UI
Navegação entre rotas
Gerenciamento de estado local
Comunicação com a API REST
Validação básica de input
Preview de arquivos
Feedback visual ao usuário
Funcionalidades Implementadas
Listagem paginada de documentos
Busca por título e descrição
Filtro por data
Upload de arquivos
Preview interno de PDF e imagens
Download de arquivos
Sistema de comentários (CRUD)
Interface responsiva

- Backend
Stack Tecnológico
Node.js
Express
MySQL / PostgreSQL
Multer
dotenv
CORS

-Estrutura
backend/
 ├─ src/
 │   ├─ controllers/
 │   ├─ routes/
 │   ├─ database/
 │   └─ app.js
 ├─ uploads/
 └─ package.json

Responsabilidades:

Exposição de API REST
Validação de dados
Persistência em banco relacional
Gerenciamento de arquivos
Controle de comentários
Tratamento de erros
Padronização de respostas HTTP

- Endpoints Principais
Documentos
Método	Rota	Descrição
GET	/documents	Lista documentos
GET	/documents/:id	Detalhes do documento
POST	/documents	Criação de documento
PUT	/documents/:id	Atualização
DELETE	/documents/:id	Exclusão
Comentários
Método	Rota	Descrição
POST	/documents/:id/comments	Criar comentário
PUT	/documents/:id/comments/:commentId	Editar
DELETE	/documents/:id/comments/:commentId	Excluir


- Banco de Dados

Modelagem Relacional
Tabela documents
id
title
description
filename
original_name
created_at

Tabela comments
id
document_id
content
created_at

Relacionamentos

documents 1:N comments

Chave estrangeira garante integridade referencial

- Upload de Arquivos

Upload via multipart/form-data
Gerenciamento via Multer
Armazenamento local em diretório uploads/
Validação de extensão
Nome do arquivo salvo com hash para evitar colisão

- Preview e Download

PDFs renderizados via <iframe>
Imagens renderizadas com <img>
Scroll interno no preview
Download preserva nome original do arquivo

- Sistema de Comentários

Comentários vinculados a documentos
CRUD completo
Atualização imediata após operações
Contador de comentários por documento

- Filtros e Ordenação

Busca textual por:
Título
Descrição
Exibição de documentos recentes

- Interface e UX

Layout consistente
Design orientado a sistemas corporativos
Feedback visual em ações
Scroll controlado
Responsividade

- Variáveis de Ambiente
Backend
PORT=3000
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=

Frontend
VITE_API_URL=

- Execução Local
Backend
cd backend
npm install
npm run dev

Frontend
cd frontend
npm install
npm run dev


- Deploy

Frontend: Vercel
Backend: Render
Banco: Serviço gerenciado (MySQL/PostgreSQL)


- Boas Práticas Aplicadas

Separação de responsabilidades
Código modularizado
Componentização
Padronização de rotas
Tratamento de erros
Nomenclatura consistente
Organização de pastas

- Contexto

Projeto desenvolvido com foco em ambiente corporativo, simulando um sistema real de gestão documental, aplicando conceitos de engenharia de software, arquitetura web e boas práticas full stack.

- Autor

Vinícius Dias
Frontend / Full Stack Developer
LinkedIn: https://www.linkedin.com/in/vinicius-dias-019859310/