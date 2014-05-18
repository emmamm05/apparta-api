// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express'); 		// call express
var app        = express(); 				// define our app using express
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var Bear     = require('./app/models/bear');

var Usuario    = require('./app/models/usuario');
var Token    = require('./app/models/usuario');
var Apartamento = require('./app/models/apartamento');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser());
mongoose.connect('mongodb://localhost/example'); // connect to our database

var port = process.env.PORT || 8080; 		// set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); 				// get an instance of the express Router


// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });	
});

//TOKENS routes
router.route('/tokens')
	// create a token (accessed at POST http://localhost:8080/api/tokens)
	.post(function(req, res) {
		
		var tokens = new Token(); 		// create a new instance of the Token model
		tokens.token = req.body.token;  // set the tokens token (comes from the request)

		// save the token and check for errors
		tokens.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'Token created!' });
		});
		
	});

router.route('/tokens/:token_id')
// more routes for our API will happen here
// delete the token with this id (accessed at DELETE http://localhost:8080/api/bears/:token_id)
	.delete(function(req, res) {router.route('/tokens')
		Token.remove({
			_id: req.params.token_id
		}, function(err, token) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});


//CUENTA routes
router.route('/cuenta')
	// update the bear with this id (accessed at PUT http://localhost:8080/api/bears/:bear_id)
	.put(function(req, res) {

		// use our bear model to find the bear we want
		Bear.findById(req.params.cuenta_id, function(err, cuenta) {

			if (err)
				res.send(err);

			bear.name = req.body.name; 	// update the bears info

			// save the bear
			bear.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'User account updated!' });
			});

		});
	});

//USUARIO routes
router.route('/usuarios/info_user_id?user_id&user_token&app_token')	
// get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
	.get(function(req, res) {
		Usuario.findById(req.params.info_user_id, function(err, usuario) {
			if (err)
				res.send(err);
			res.json(usuario);
		});
	});

router.route('/usuarios/search?params')
// get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
	.get(function(req, res) {
		Usuario.findById(req.params.search, function(err, usuario) {
			if (err)
				res.send(err);
			res.json(usuario);
		});
	});

//Ver Lista de Interés
router.route('/usuarios/:user_id/:lista_interes?user_token&app_token')
// get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
	.get(function(req, res) {
		Bear.findById(req.params.user_id, function(err, bear) {
			if (err)
				res.send(err);
			res.json(bear);
		});
	});

//Agregar Apartamento a Lista de Interés
router.route('/usuario/user_id/lista_interes')
	// create a token (accessed at POST http://localhost:8080/api/tokens)
	.post(function(req, res) {
		
		var apartamento = new Apartamento(); 		// create a new instance of the Token model
		apartamento.token = req.body.token;  // set the tokens token (comes from the request)

		// save the token and check for errors
		apartamento.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'Apartment created!' });
		});
		
	})
//Remover Apartamento de Lista de Interés
	.delete(function(req, res) {router.route('/apartamentos')
		Apartamento.remove({
			_id: req.params.apartamento_id
		}, function(err, token) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});

//Ver Lista de Favoritos
router.route('/usuario/user_id/:lista_favoritos?user_token&app_token')
	.get(function(req, res) {
		Apartamento.findById(req.params.user_id, function(err, apartamento) {
			if (err)
				res.send(err);
			res.json(apartamento);
		});
	});
//Agregar a Lista de Favoritos
router.route('/usuario/user_id/:lista_favoritos')
	// create a token (accessed at POST http://localhost:8080/api/tokens)
	.post(function(req, res) {
		
		var tokens = new Token(); 		// create a new instance of the Token model
		tokens.token = req.body.token;  // set the tokens token (comes from the request)

		// save the token and check for errors
		tokens.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'Token created!' });
		});
		
	})
//Remover de Lista de Favoritos
	.delete(function(req, res) {router.route('/tokens')
		Token.remove({
			token_id: req.params.user_id
		}, function(err, token) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});


//Buscar apartamento
router.route('/apartamento/search?user_id&user_token&app_token&search_params')
	.get(function(req, res) {
		Bear.findById(req.params.user_id, function(err, bear) {
			if (err)
				res.send(err);
			res.json(bear);
		});
	});

//Ver Información de apartamento
router.route(' /apartamento/aparta_id?app_token')
	.get(function(req, res) {
		Bear.findById(req.params.user_id, function(err, bear) {
			if (err)
				res.send(err);
			res.json(bear);
		});
	});
//Agregar nuevo apartamento
router.route('/apartamento?app_token')
	.post(function(req, res) {
		
		var tokens = new Token(); 		// create a new instance of the Token model
		tokens.token = req.body.token;  // set the tokens token (comes from the request)

		// save the token and check for errors
		tokens.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'Token created!' });
		});
		
	})
//Cargar apartamentos
	.get(function(req, res) {
		Bear.findById(req.params.user_id, function(err, bear) {
			if (err)
				res.send(err);
			res.json(bear);
		});
	});

//Cargar página de comentarios
router.route('apartamento/aparta_id/comentarios?page&app_token')
	.get(function(req, res) {
		Bear.findById(req.params.user_id, function(err, bear) {
			if (err)
				res.send(err);
			res.json(bear);
		});
	});
//Calificar apartamento
router.route('/apartas/aparta_id/calificacion')
	.post(function(req, res) {
		
		var tokens = new Token(); 		// create a new instance of the Token model
		tokens.token = req.body.token;  // set the tokens token (comes from the request)

		// save the token and check for errors
		tokens.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'Token created!' });
		});
		
	})
//Comentar apartamento
	.post(function(req, res) {
		
		var tokens = new Token(); 		// create a new instance of the Token model
		tokens.token = req.body.token;  // set the tokens token (comes from the request)

		// save the token and check for errors
		tokens.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'Token created!' });
		});
		
	});

//Remover apartamento
router.route('/apartas/aparta_id')
	.delete(function(req, res) {router.route('/tokens')
		Token.remove({
			token_id: req.params.user_id
		}, function(err, token) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});


/*
//OSO route
router.route('/bears')

	// create a bear (accessed at POST http://localhost:8080/api/bears)
	.post(function(req, res) {
		
		var bear = new Bear(); 		// create a new instance of the Bear model
		bear.name = req.body.name;  // set the bears name (comes from the request)

		// save the bear and check for errors
		bear.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'Bear created!' });
		});
		
	})
	// get all the bears (accessed at GET http://localhost:8080/api/bears)
	.get(function(req, res) {
		Bear.find(function(err, bears) {
			if (err)
				res.send(err);

			res.json(bears);
		});
	});
	
router.route('/bears/:bear_id')
	// get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
	.get(function(req, res) {
		Bear.findById(req.params.bear_id, function(err, bear) {
			if (err)
				res.send(err);
			res.json(bear);
		});
	})
	
	// update the bear with this id (accessed at PUT http://localhost:8080/api/bears/:bear_id)
	.put(function(req, res) {

		// use our bear model to find the bear we want
		Bear.findById(req.params.bear_id, function(err, bear) {

			if (err)
				res.send(err);

			bear.name = req.body.name; 	// update the bears info

			// save the bear
			bear.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'Bear updated!' });
			});

		});
	})
	
	// delete the bear with this id (accessed at DELETE http://localhost:8080/api/bears/:bear_id)
	.delete(function(req, res) {
		Bear.remove({
			_id: req.params.bear_id
		}, function(err, bear) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});
*/
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

