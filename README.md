# API in hexagonal architecture

## How to setup

### 1) **installing dependencies**
Before working on this project, you need to install de dependecies:

```bash
yarn
```
You must see something like this:
```bash
# others output...
Done in 0.23s.
```
### 2) **Wake up docker services**
If you pretend to use redis and mongo with docker for development, you will need `docker` and `docker-compose` installed. Lookup for a tutorial that match with your operation system. After instalation, inside of project directory, run the follow:
```bash
# This will setup all DBs
docker-compose -f compose.yml up -d
```
And I recomend you to install this plugin on your VSCode, to watch or manager the services on docker: 

```bash
# Press ctrl + P on VSC and paste it:
ext install ms-azuretools.vscode-docker
```

### 3) **Running for development**
You can run for development with hot reload
```bash
yarn dev
```
You must see something like this:
```bash
# others output...
[nodemon] starting `ts-node ./src/main.ts`
[nodemon] clean exit - waiting for changes before restart
Server on localhost:3000
```

### 3) **Execute tests**
For running Jest tests you just need to do:
```bash
yarn test
```

If everthing is fine, you will see something like this:
```output
 PASS  tests/helloworld.test.ts
  ✓ Verify if phase was completed (2 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        1.517 s, estimated 2 s
Ran all test suites.
Done in 4.26s.
```

# Descrição do teste para a vaga de Software Developer

Na Eva temos 2 principais recursos do sistema: colaboradores e jornadas.

- Jornadas são sequências de ações a serem executadas pelo sistema.
- Ações são, por exemplo: envio de email, envio de mensagem no whatsapp, requisição para uma API xyz, etc.

## Problema 
Dado um colaborador e uma jornada já criadas, crie uma API rest que permita associar uma jornada e uma data de início a um colaborador já cadastrado. Uma vez associada a jornada, as ações devem ser executadas por um job em background.

Para o frontend, o básico é conseguir realizar a ação de disparar a jornada para o colaborador. Fique à vontade para incrementar onde necessário.

#### Direcionamentos
- A definição dos modelos de colaborador e jornada fica a seu critério
- Não precisa se preocupar com o CRUD completo dos recursos, crie de acordo com sua necessidade
- As ações não precisam fazer chamadas reais a APIs, pode mockar o que for preciso

#### Pontos de avaliação
- Definição dos modelos/schemas
- Organização do projeto (arquivos e arquitetura)
- Clareza do código
- Testes unitários
- Documentação

## Entregável
Link pro repositório público com o teste. Espero um sistema funcional e documentado em:
- como executar localmente
- como executar os testes unitários
- setups específicos necessários para a execução
- [OPCIONAL] se tiver o sistema rodando em alguma cloud é bônus, mas **não é requisito**

#### Informações sobre o nosso contexto
- Usamos arquitetura hexagonal
- Usamos bastante programação funcional e Promises/asyncs do Javascript
- Tecnologias/bibliotecas que utilizamos
  - MongoDB
  - [Joi](https://joi.dev/) pra validação de schemas
  - [BullJS](https://github.com/OptimalBits/bull) para jobs em background
  - Jest
  - React (componentes funcionais, React hooks) + [TailwindCSS](https://v2.tailwindcss.com/)
  - [TailwindUI](https://tailwindui.com/components) para biblioteca de componentes para o frontend