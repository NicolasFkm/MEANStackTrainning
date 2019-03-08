# MEAN STACK

## Sumário
1. [Introdução](#intro)
1. [NodeJS](#node)
1. [Express.js](#express)
1. [MongoDB](#mongo)

<a name="intro" id="intro"></a>
## Introdução 

Cinco tópicos principais: JS, Mongodb, Express, Angular e Node.

<a name="node" id="node"></a>
## Node 

Node.js é um middleware, pode criar um servidor de aplicação.

Nodemon: atualiza o servidor sempre que um arquivo é alterado, otimizando o tempo. Para subir o servidor com essa ferramenta:

```bat
nodemon nomeDaAplicacao
``` 

Sem a ferramenta:


```bat
node nomeDaAplicacao
``` 

<a name="express" id="express"></a>
## Express.js 

Framework que permite a criação de uma aplicação com arquitetura MVC.

Para criar a arquitetura base utilize o comando:

```bat
express app_exemplo --ejs
``` 

Sendo que essa flag é referente ao mecanismo de template que será utlizado no projeto.

Para ordenar o carregamento dos recursos é possível utilizar o ``express-load``, funciona com uma promise que carrega arquivos de uma pasta a cada step:

```js
load('models')
    .then('controllers')
    .then('routes')
    .into(app);
```

Na estruturação da aplicação, utiliza-se rotas e controllers, as rotas mapeiam qual o controller responsável por determinada rota e o controller o que será executado ao acessar a rota.

Uma outra ótima prática é usar middlewares para checar se o usuário está logado colocando na configuração das rotas e funções para tratar erros de servidor e erros 404 durante as requisições nas configurações gerais do servidor. Exemplo.

```js
exports.serverError = function (error, request, response, next) {
    response.status(500);
    response.render('erroServidor', { error: error });
};
//-------------------------//
app.use(error.serverError);
```

Para utilizar sessão, utiliza-se o pacote ``express-session``, que funciona junto com o ``cookie-parser``, além disso é muito útil o pacote ``body-parser`` para mapear as respostas da requisição de forma mais fácil.

Para enviar uma resposta em json:

```js

response.json(objeto);

```

### Requisições
Necessário utilizar o modulo __http__. Exemplos de requisição POST:

```javascript
 var info = {
        host: 'localhost',
        port: '3200',
        path: '/eventos',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': evento.length
        }
    };
    //definição do pbjeto para requisição POST
    var reqPost = http.request(info, function (res) {
        // Executa quando recebe a resposta
        res.on('data', function (data) {
            response.redirect('/menu');
        });
    });

    //Gravação dos dados
    reqPost.write(evento); //Envia o corpo da mensagem como evento
    reqPost.end();
    reqPost.on('error', function (e) {
        response.redirect('/cadastroEvento');
    })
```

Exemplo de GET:
```javascript
var info = {
    host: 'localhost',
    port: '3200',
    path: '/eventos',
    method: 'GET'
};
//chamando o serviço
http.request(info, function (res) {
    res.setEncoding('utf8');
    res.on('data', function (data) {
        eventos = JSON.parse(data);
        var usuario = request.session.usuario,
            params = { usuario: usuario, eventos: eventos };
        response.render('eventos/listaEventosWS', params);
    });
}).end();

```


<a name="mongo" id="mongo"></a>
## MongoDB 

Os bancos NoSQL possuem conceitos bem diferentes do padrão SQL, as tabelas são collections, os registros ou tuplas são documentos, o schema é utilizado para "padronizar" mais a collection e cada regra do schema é um path. É possível obrigar que seja necessário que todos os documentos da collection tenham nome, email, que essas propriedades sejam string, entre outras configurações.

MongoDB recomendado transformar em um serviço: 

```bat
mongod --dbpath c:/caminho/pasta/dados/ --logpath c:/caminho/arquivo/de/log --install --serviceName "NomeServico"

net start "NomeServico"
``` 

Para selecionar um banco de dados

```
    use bancoDesejado
```

Para inserir manualmente em uma collection:

```mongo
db.nomeCollection.insert({prop: "value", prop2: 10})
```

Para atualizar

```mongo
db.nomeCollection.update({propProcura: "valorProcura"}, {objeto: "Que substituira ocorrencias"})
```

Mongoose é um módulo Node.js que facilita a integração do banco com uma aplicação Node. Ele abstrai o banco MongoDB. 

Com o Mongoose é possível criar Schemas com base nas models do projeto. Exemplo:
 
```javascript
var documento = new mongoose.Schema({
    nome: {type: String, required: true}
});

var cliente = Schema({
    nome: String,
    endereco: {type: String}, // Mesmo resultado da prop acima
    avaliacao: {type: Number, default: 1, min: 1, max: 5},
    atividades: [documento] // Equivalente a 1:n
});

```

Conectando MongoDB ao banco de dado:
```javascript
var mongoose = require("mongoose");
global.db = mongoose.connect("mongodb://localhost:27017/dbusuarios"); // caso ainda não exista, ele cria
```

Relacionando uma collection com um schema criado na aplicação
```javascript
var usuario = Schema({
    nome: { type: String, required: true, index: { unique: true } },
    senha: { type: String, required: true }
});
mongoose.model('usuarios', usuario);
```

Query com base em um schema criado, detalhe os dados retornados pelo select não precisam de ','(vírgula) para separar os valores, apenas o espaço em branco. O __findOne()__ tem como objetivo procurar na base de dados um documento com base na query criada, já o __select()__ recebe quais os dados que precisam ser retornados da busca e por fim, o __exec()__ executa essas ações, recebendo uma função de callback que recebe como parametros o erro que ocorreu e o objeto encontrado:

```javascript
var mongoose = require('mongoose');
var Usuario = mongoose.model('usuarios');
var query = { 'nome': nome, 'senha': senha };

Usuario.findOne(query).select('nome senha')
    .exec(function(erro, usuario){
        // TODO
    })
```

Para inserir um documento no banco de dados é mais simples, basta utilizar a função __create()__:

```javascript
var usuario = request.body.usuario;
Usuario.create(usuario, function (erro, usuario) {
    // TODO
})
```


## AngularJS

### Básico - Providers e MVC
- Service - Cria uma instrução;
- Factory - Executa o Service;
- View - Camada que representa um conjunto HTML, parte na qual o usuário interage;
- Controller - Envia e recebe dados da View de forma unidirecional ou bidirecional;
- Model - Objetos trocados entre views e controllers

### Conteúdo 

O __ng-app__ define o domínio do módulo Angular, caso tenha um nome, deve ser configurado no JS com o código:

```javascript
    angular
        .module('primeiroModulo', [])
        .controller('controller', [function(){
            // Conteudo do controller
            this.mensagem = "...";
        }]);
```

Sendo que o controller teve ser domínio definido com a instrução __ng-controller__, dentro da definição do controller em si é possível definir propriedades deles e na definição do seu domínio é possível utilizar o alias que pode ser utilizado para acessar propriedades. Exemplo:

```html
<body ng-controller="MeuController as ctlM">
    {{ctlM.mensagem}}
</body>
```

Para capturar um click __ng-click__, passando a função e __ng-repeat__ para fazer o equivalente ao `foreach`:

```html
<body ng-controller="MeuController as ctlM">
    <div ng-repeat="nome in ctlM.nomes">
        {{nome}}
        <button ng-click="funcao()">Click</button>
    </div>
</body>
```

Quando utilizamos form, precisamos interceptar o envio com o __ng-submit__ passando uma função que vai lidar com o envio, os inputs do formulário devem ter um __ng-model__ para que seja posível recurar os dados, de preferência já dentro de um objeto(Modo implícito), mas pode ser fora também(Modo explícito): 

```html
<form ng-submit="ctlP.submit2()">
    <input type="text" ng-model="ctlP.aluno.nome" placeholder="Nome">
    <br>
    <input type="text" ng-model="ctlP.aluno.curso" placeholder="Curso">
    <br>
    <input type="submit" value="Submit 2">
</form>
```

No caso de uma SPA, ou seja, uma página que não recarrega, os componentes são carregados dentro dela sem ter que redirecionar para outras páginas, é necessário utilizar uma tag Angular, a tag __\<ng-view\>__. 

Para criar rotas é necessário utilizar o método __config()__ passando como parâmetro uma função com o parâmetro: ``$routeProvider``. OBS: Sempre que tiver uma variável que comece com '$' é um modulo padrão do AngularJS. Dentro dessa função é possível configurar cada rota:

```javascript
var app = angular.module("appAngular", ['ngRoute']);

app.config(function($routeProvider){
    $routeProvider
        .when("/", { template: "<h1>Hello World</h1>" })
        .when("/users/:id", { 
            controller: 'UserController', // Controller responsável pela rota
            template: "<h1>Bem vindo, {{nome}}</h1>" 
        })
        .otherwise({redirectTo: "/"});
});

// Cria o controller, $scope é equivalente ao this, se refere ao controller em questão e o $routeParams recupera os parâmetros da rota
app.controller("UserController", [function($scope, $routeParams){
    $scope.nome = $routeParams.id;
}]);
```

A propriedade ``template`` pode ser substituída por ``templateUrl`` na qual é passado o caminho até a view desejada.


## Angular 4+

Tem um conceito totalmente diferente do AngularJS, baseado em TypeScript, funciona com módulos e componentes. Um módulo é basicamente um conjunto de componentes, um componente é uma parte da view que pode ser utilizada, todo seu comportamento e configurações são definidos a partir de classes. Pode ser definido como uma peça de LEGO, ele  tem suas característica, realiza determinadas ações, pode ser reutilizado ou combinado com outros componentes...

O Angular injeta os componentes dentro da tag __\<app-root\>__ que fica no arquivo ``index.html``. Para definir um componente é possível colocar um decorator na classe, o ``@Component({...})``. Esse decorator precisa ser importado do ````@angular/core````. O padrão das propriedades do componente são selector, templateUrl, styleUrls, sendo que é o elemento HTML relacionado a ele, templateUrl que é o arquivo no qual o componente foi definido e o srtyleUrls que é utilizado para estilizar o componente, no caso um arquivo ou vários que contém a folha de estilo.

```javascript
import { Component } from '@angular/core';

@Component({
    selector: 'primeiro-exemplo',
    template: `<h2>{{titulo}}: Primeiro exemplo de componente.</h2>`
})
export class ExemploComponent {
    titulo = "Angular";
}

```

Caso queira utilizar o templateUrl, é necessário passar o caminho até o arquivo com o template, mas em certos casos, para mostrar que o caminho informado é relativo deve-se colocar outra propriedade chamada __modeuleId__ que sempre recebe o valor de ``module.id``.

O módulo também precisa de um decorator, no caso o ``@NgModule({...})``, tem 4 propriedades principais: declarations, que são os componentes do sistema; imports, que são os módulos do sistema; providers, que são os services (responsáveis por injetar dependências, uma vez que os componentes devem focar em apresentar os dados e não recuperar ou gerá-los para depois apresentar); e o bootstrap, qual o componente inicial da aplicação.

```javascript
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

Para utilizar o componente criado é necessário usar o seletor definido para ele, importá-lo onde for usado e declará-lo no __app.module__. 

Para subir o servidor é preciso usar o comando ``ng serve``.

### Rotas
Para trabalhar com rotas, é necessário utilizar ``[routerLink]="['/rota/desejada']"``, nos elementos HTML no lugar do href.

É necessário criar uma constante array que será responsável por tratar as rotas, indicando qual o component responsável por ela, essa constante deve ser do tipo ``Routes``, cada item dessa constante deve ter as propriedades path e component.

```javascript
import { Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { CadastroComponent } from '../cadastro/cadastro.component';
import { NotFoundComponent } from '../erro/notFound.component';

export const appRoutes: Routes = [
    { path: "", component: HomeComponent },
    { path: "eventos", component: CadastroComponent },
    { path: "home", component: HomeComponent },
    { path: "**", component: NotFoundComponent } // Responsável por todas as outras rotas não especificadas
];
```

Depois de configuradas, esse arquivo de rotas deve ser importado pelo módulo e é necessário colocar uma nova configuração no imports:

```javascript
imports:      [ 
    BrowserModule,
    RouterModule.forRoot(appRoutes)
],
```

### Two-way Data Binding

Enquanto o "(evento)" é responsável por mandar uma ação do HTML para o componente e o "[atributo]" é utilizado para enviar uma informação do componente para o HTML,para utilizar o meio bidirecional, é necessário utilizar o atributo no HTML ``[(ngModel)]="elemento.atributo"`` dessa forma esse elemento recebe o valor do objeto e se alterado altera o valor do objeto também, um exemplo mais simples disso é utilizando o __FormsModule__.
```HTML
<ul class="list_group">
    <li [class.selecionado]="item===eventoSelecionado" *ngFor="let item of listaEventos" (click)="selecionarEvento(item)" class="list-group-item">
        <!-- Adiciona a classe selecionado caso a condição seja true -->
        <a  [routerLink]="['/eventos']">{{item.descricao}}</a>
    </li>
</ul>
```
```HTML
<div *ngIf="eventoSelecionado">
    <div class="col-md-6">
        <div class="form-group">
            <label for="descricao">Descrição:</label>
            <input [(ngModel)]="eventoSelecionado.descricao" type="text" class="form-control" id="descricao" name="descricao">
        </div>
        <div class="form-group">
            <label for="data">Data:</label>
            <input [(ngModel)]="eventoSelecionado.data" type="text" class="form-control" id="data" name="data">
        </div>
        <div class="form-group">
            <label for="preco">Preço:</label>
            <input [(ngModel)]="eventoSelecionado.preco" type="number" class="form-control" id="preco" name="preco">
        </div>
        <div class="form-group">
            <button (click)="novoEvento(eventoSelecionado)" type="button" class="btn btn-info">
                <span class="glyphicon glyphicon-pencil"></span>
                Incluir
            </button>
        </div>
    </div>
</div>
```

Dessa forma o objeto eventoSelecionado irá preencher o formulário e a medida que o formulário for alterado o objeto também será alterado.

### Pipe

Um pipe nada mais é do que um filtro, ele passa dados através dele e transforma ou literalmente filtra a informação, para utilizá-lo basta utilizar o ``|`` antes do nome do pipe desejado, é utilizado na hora de apresentar a informação na view:

```HTML
<P>{{usuario.nome | uppercase}}</P>
```

Uma classe pipe precisa implementar o ``PipeTransform`` que obriga a definição do método __transform(target, parametros)__. Além disso é necessário colocar o decorator Pipe passando o nome do pipe que será usado na view

```javascript
import { Pipe, PipeTransform } from '@angular/core';
import { IEvento } from '../interfaces/interface.evento';

@Pipe({
    name: 'sublista'
})
export class Sublista implements PipeTransform{
    transform(eventos: Array<IEvento>, input: string): Array<IEvento>{
        return eventos.filter( 
            evento => evento.descricao.toLowerCase().includes(input.toLowerCase())
        );
    }
}
```

No caso de um filtro propriamente dito, é necessário que além de obviamente ter o input, é preciso colocar o valor desse input no pipe, para que seja passado como parametro:
```HTML
<div class="row">
        <div class="col-md-6 form-grout">
            <label for="codigo">Informe o nome do evento:</label>
            <input type="text" #busca (keyup)="0" class="form-control">
        </div>
    </div>
    <div class="row margem">
        <div class="col-md-6">
            <ul class="list-group">
                <li *ngFor="let item of listaEventos | sublista:busca.value" [class.selecionado]="item===eventoSelecionado" (click)="selecionarEvento(item)" class="list-group-item">
                    <a [routerLink]="['/eventos']">{{item.descricao | uppercase}}</a>
                </li>
            </ul>
            .
            .
            .
```

O __(keyup)="0"__ representa que você quer recuperar/gerar o evento, mas sem que realize uma ação necessariamente, só será utilizado para que o sublista atualize o valor do busca a cada letra escrita ou apagada do input. Já o __#busca__ representa um id, para que esse elemento possa ser acessado por outros elementos na view.

### HTTP Request

Antes de mais nada é necessário importar o módulo __HttpModule__ no app.module.ts para ter acesso às funcionalidades de requisições HTTP, no service que fará a requisição é necessário injetar a classe Http no construtor, os métodos são bem simples. No caso do get é necessário apenas enviar a url enquanto no post é necessário passar a url, o conteúdo da requisição e as opções, que são no geral cabeçalhos http:

```Javascript
 public getEventosWS():  Observable<Array<IEvento>> {
        return this._http.get(this.url).map(res=>res.json());
}

// Headers e Request devem ser importados assim como o Observable
public setEventosWS( evento: IEvento ): Observable<IEvento> {
    let header = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: header });

    let json = JSON.stringify(
        {
            descricao: evento.descricao,
            data: evento.data,
            preco: evento.preco
        }
    )

    return this._http.post(this.url, json, options)
        .map(res => res.json());
}
```

Para facilitar no desenvolvimento das aplicações, é recomendado o uso de __Mocks__, serviços fakes que retornam dados, para isso é necessário baixar o json-server e para utilizá-lo é necessário criar um json em uma pasta e utilizar:

```bat
npm install -g json-server

json-server --port 5000 dados.json
```

Ele automaticamente cria uma API REST com base no json criado, por exemplo o json a seguir criaria rotas com /evento para recuperar, inserir e atualizar esse arquivo por meio de uma URL e o arquivo é atualizado fisicamente.

```json
{
  "eventos": [
    {
      "id": 1,
      "descricao": "Fazer Mock",
      "data": "2019-01-22",
      "preco": 50
    },
    {
      "id": 2,
      "descricao": "Baixar JSON Server",
      "data": "2019-01-23",
      "preco": 5
    }
  ]
}
```
