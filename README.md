Tester Websocket Server
=======================

Servidor websocket para testes pré-produção.

##Proposta

**Tester Websocket Server** tem por objetivo servir como um simples servidor de
websocket para testes no _client_, enquanto a infra final não fica pronta.

Ele foi montado baseado no funcionamento geral dos últimos projetos WebSocket usados no UOL.

##Instalando e usando

    git clone https://github.com/gustavopaes/tester-websocket-server.git
    npm install
    node server.js

No navegador, acesse: [http://localhost:8080/](http://localhost:8080/)

No Javascript:

    var server = new WebSocket("ws://localhost:8080/", "echo-protocol");

    server.onopen = function() {
      console.log( 'Conectado!' );
    };

    server.onmessage = function(message) {
      if(message.type === "message") {
        console.log( message.data.toString() );
      }
    };


##Features

+ recebe mensagem de clients conectados;
+ envia mensagem para todos os clientes conectados;
+ possui tela de controle (enviar mensagem e mensagens recebidas).

##Licença
The MIT License (MIT)

Copyright (c) 2013 Gustavo Paes

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
