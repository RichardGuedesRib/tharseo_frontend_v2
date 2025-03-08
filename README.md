# Tharseo Frontend

🚀 **Tharseo** é um automatizador de operações em cripto, oferecendo uma interface intuitiva e dinâmica para gerenciamento de estratégias de trading. Este repositório contém o frontend da aplicação, desenvolvido com **React (TSX)**, utilizando **Zustand** para gerenciamento de estado e **Cypress** para testes.

## 📌 Tecnologias Utilizadas

- **React (TSX)** – Interface declarativa e performática.
- **Vite** – Build rápido e otimizado.
- **Zustand** – Gerenciamento de estado minimalista e eficiente.
- **Cypress** – Testes end-to-end automatizados.
- **TailwindCSS** (opcional) – Estilização moderna e flexível.

---

## 🚀 Como Rodar o Projeto

### 1️⃣ Clonar o Repositório

```sh
 git clone https://github.com/seu-usuario/tharseo-front.git
 cd tharseo-front
```

### 2️⃣ Instalar Dependências

```sh
 npm install
```

### 3️⃣ Definir Variáveis de Ambiente

Crie um arquivo **.env** na raiz do projeto e adicione:

```env
VITE_API_URL=http://localhost:3000
```

### 4️⃣ Rodar o Servidor Localmente

```sh
 npm run dev
```

O frontend estará disponível em `http://localhost:5173/` (porta pode variar).

---

## 📦 Build para Produção

Antes de subir o código para produção, execute:

```sh
 npm run build
```

Isso gera um diretório `dist/` otimizado e pronto para deploy.

---

## 🧪 Testes End-to-End (E2E) com Cypress

Para rodar os testes automatizados:

```sh
 npm run test:e2e
```

Ou para abrir o painel interativo do Cypress:

```sh
 npm run cypress:open
```

---

## 🎯 Gerenciamento de Estado com Zustand

O Zustand é utilizado para armazenar estados globais da aplicação, garantindo performance e simplicidade. Exemplo de um store:

```tsx
import { create } from 'zustand';

interface UseStore {
  user: string;
  setUser: (name: string) => void;
}

export const useStore = create<UseStore>((set) => ({
  user: '',
  setUser: (name) => set({ user: name }),
}));
```

---

## 📌 Estrutura de Pastas

```
📦 tharseo-front
├── 📂 src
│   ├── 📂 components  # Componentes reutilizáveis
│   ├── 📂 hooks       # Hooks customizados
│   ├── 📂 pages       # Páginas da aplicação
│   ├── 📂 store       # Zustand (gerenciamento de estado)
│   ├── 📂 tests       # Testes Cypress
│   ├── 📜 main.tsx    # Ponto de entrada do App
│   ├── 📜 App.tsx     # Componente principal
├── 📜 .env            # Configurações de ambiente
├── 📜 package.json    # Dependências e scripts
└── ...
```

---

## 💡 Contribuição

Contribuições são bem-vindas! Para colaborar:

1. Faça um fork do repositório
2. Crie uma branch com sua feature (`git checkout -b minha-feature`)
3. Commit suas mudanças (`git commit -m 'Minha feature'`)
4. Envie um PR (`git push origin minha-feature`)

---

## 📄 Licença

Este projeto está sob a licença MIT. Sinta-se livre para usá-lo e melhorá-lo! 🚀

