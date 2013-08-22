/**
 * @author gpaes
 *
 * Cria um simples servidor WebSocket para realizar testes básicos no client, antes
 * de possuir a infra final do produto.
 *
 * NÃO USAR EM AMBIENTE DE PRODUÇÃO!
 */

"use strict";
(function( PORTA ) {
	var WebSocketServer = require('websocket').server,
		http = require('http'),
		fs = require('fs'),
		path = require('path');

	/**
	 * Clona um array.
	 * @param {Array} a Array a ser clonado
	 * @returns {Array}
	 */
	function cloneArray(a) {
		var t = [], i = a.length;
		while(i--)
			t.push(a[i]);

		return t.reverse();
	}

	/**
	 * Remove do array de conexões as conexões
	 * que não estão mais ativas.
	 */
	function garbageConnections() {
		var i = connections.length, t = [];
		while(i--) {
			if(connections[i].connected === false) {
				console.log('[garbage]\tRemovendo conexão inativa');
				continue;
			}

			t.push(connections[i]);
		}

		connections = t;
	}

	// Inicia o server HTTP.
	// O websocket usará a mesma porta para a conexão,
	// só que através do protocolo 'ws' e não 'http'.
	var server = http.createServer(function(request, response) {
		fs.readFile( path.resolve(__dirname, './index.html'), function(err, content) {
			if( !!err === true ) {
				response.writeHead(500, { 'Content-Type': 'text/html', 'charset': 'utf-8' });
				response.end('Erro ao servir arquivo "index.html".<hr>' + JSON.stringify(err));
			}

			response.writeHead(200, { 'Content-Type': 'text/html', 'charset': 'utf-8' });
			response.end(content);
		} );
	}).listen( PORTA );

	// Inicia o serviço Websocket em cima do HTTP
	var wsServer = new WebSocketServer({
		httpServer: server,
		autoAcceptConnections: false
	});

	// registra as conexões abertas
	var connections = [];

	// Armazena a última mensagem que o servidor recebeu.
	// Essa mensagem será enviada para as novas conexões.
	var lastMessage = null;

	// Dispara evento para quando receber uma conexão
	wsServer.on('request', function(request) {
		var connection = request.accept('echo-protocol', request.origin);

		console.log('Nova conexão.');

		// Envia a última mensagem recebida pelo servidor
		if( !!lastMessage === true ) {
			connection.sendUTF(lastMessage.utf8Data);
		}

		// Evento para receber uma mensagem do cliente em questão
		connection.on('message', function(message) {
			// guarda a mensagem para as próximas conexões
			lastMessage = message;

			// clona array de conexões
			var conn, conns = cloneArray(connections);

			// envia a mensagem recebida para todos que estão
			// conectados ao websocket
			while( (conn = conns.shift()) ) {
				if (message.type === 'utf8') {
					console.log('\n------------------\nMensagem recebida:\n------------------\n');
					console.log(message.utf8Data);

					!!conn === true &&
						conn.connected === true &&
							conn.sendUTF(message.utf8Data);
				}
			}
	  });

		// Evento disparado quando a conexão é fechada
		connection.on('close', function(reasonCode, description) {
			// força rodar o gargabeConnections
			garbageConnections();
		});

		// adiciona a nova conexão à lista de conexões
		connections.push(connection);
	});

	// registra collection gargabe para as conexões inativas
	setInterval(garbageConnections, 15000);
}(8080));
