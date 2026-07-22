# Front-End da Loja Virtual

### Instalar o CORS

Quando o Front tentar chamar a API no Render, o navegador vai bloquear por segurança, porque estão em domínios diferentes.

Instalar o CORS:

```
npm install cors
```

E no server.js, adicionar o import e o uso:

```js
import cors from "cors";

// ... depois do const app = express();
app.use(cors());
```
