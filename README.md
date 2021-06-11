# API_gestao_tarefas
Repositório para documentação da API de gestão de tarefas Node.js e MongoDB
# RESTFul-API do gerenciador de tarefas
Aplicativo gerenciador de tarefas desenvolvido com NODE JS e MongoDB . Ele segue uma arquitetura de design de API RESTFul . O aplicativo envia uma notificação por e-mail no momento do registro e desativação da conta do usuário. É ricamente construído com uma técnica científica simples e práticas recomendadas no mundo do design de API .

## Características
* Enviar e-mails
* Autenticação e Segurança
* Classificação, paginação e filtragem
* Upload de avatar
* Endpoints API
* Métodos	Endpoints	Acesso	Descrição

| Metodos | Endpoints                          | Accesso | Descrição                                |
| ------- | ---------------------------------- | ------- | ---------------------------------------- |
| POST    | /users                             | Public  | Inscrever-se                             |
| POST    | /users/login                       | Public  | Conecte-se                               |
| GET     | /users/me                          | Private | Perfil do usuário                        |
| PATCH   | /users/me                          | Private | Atualizar perfil                         |
| POST    | /users/me/avatar                   | Private | Carregar foto do perfil                  |
| GET     | /users/userID/avataar              | Private | Ver foto do perfil                       |
| DELETE  | /users/me/avatar                   | Private | Excluir foto do perfil                   |
| DELETE  | /users/me                          | Private | Deletar conta                            |
| POST    | /users/tasks                       | Private | Criar uma Tarefa                         |
| GET     | /users/tasks/taskID                | Private | Visualizar uma Tarefa                    |
| GET     | /users/tasks                       | Private | Visualizar todas tarefas                 |
| GET     | /users/tasks?limit=2               | Private | Limite o resultado a 2                   |
| GET     | /users/tasks?sortBy=createdAt:desc | Private | Classificar por ordem decrescente da data de criação |
| GET     | /users/tasks?sortBy=createdAt:asc  | Private | Classificar por ordem crescente de data de criação  |
| GET     | /users/tasks?skip=3                | Private | Resultado de paginação                        |
| PATCH   | /users/tasks/taskID                | Private | Atualizar uma Tarefa                     |
| DELETE  | /users/tasks/taskID                | Private | Deletar uma tarefa                       |
| POST    | /users/logout                      | Private | Sair de uma conta                        |
| POST    | /users/logoutall                   | Private | Sair de todas as conta                      |




