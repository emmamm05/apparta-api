// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express'); 		// call express
var app        = express(); 				// define our app using express
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var Usuario    = require('./app/models/usuario');
var Token    = require('./app/models/usuario');
var Apartamento = require('./app/models/apartamento');
var Interesado = require('./app/models/apartamento');
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser());
//mongoose.connect('mongodb://emmamm05:8ClQ5RA4Nywv@ds033499.mongolab.com:33499/apparta'); // connect to our database
mongoose.connect('mongodb://localhost/example');

var port = process.env.PORT || 8080; 		// set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); 				// get an instance of the express Router


// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log(req.url);
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Content-Type,Origin,X-Requested-With");
        res.setHeader("Content-Type","application/json; charset=utf-8");
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
		var usuario = Usuario.findOne( {email: req.params.email}, function(err,usuario){
		    if (err)
			res.send(err);
		});
		
		var token = new Token();
		require('crypto').randomBytes(48, function(ex, buf) {
			token.token = buf.toString('hex');
		        usuario.tokens = [token];
		});
		token.save(function(err) {
			if (err)
				res.send(err);
			res.json(token);
		});		
	});

router.route('/tokens/:token_id')
// more routes for our API will happen here
// delete the token with this id (accessed at DELETE http://localhost:8080/api/tokens/:token_id)
	.delete(function(req, res) {router.route('/tokens')
		Token.remove({
			_id: req.params.token_id
		}, function(err, token) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});

/*


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
*/




//http://localhost:8080/api/usuarios
//Agregar nuevo usuario
router.route('/usuarios') //?app_token
	.post(function(req, res) {
	        console.log(req.body);
		console.log("POST /usuarios");
		console.log(req.body);
		var existe = Usuario.find({ 'oauth_id': req.body.oauth_id, 'oauth_proveedor': req.body.oauth_proveedor});
		existe.exec(function (err, resultado) {
	  		// called when the `query.complete` or `query.error` are called
	  		// internally
				if (err)
					res.send(err);
				else if(resultado.length>=1){
					console.log(req.body.oauth_id);
					console.log(req.body.oauth_proveedor);
					res.json(resultado);
					
					}
				else if (resultado.length==0){
				var usuario = new Usuario(); 
					console.log(req.body.oauth_id);		
					usuario.nombre = req.body.nombre;
					usuario.apellido = req.body.apellido;
					usuario.oauth_id = req.body.oauth_id;
					usuario.email = req.body.email;
					usuario.telefono = req.body.telefono;
					usuario.edad = req.body.edad;
					usuario.password = req.body.password;
					usuario.genero = req.body.genero; 
					usuario.oauth_proveedor = req.body.oauth_proveedor;
					// save the token and check for errors
					usuario.save(function(err) {
						if (err)
							res.send(err);
						res.json({id:usuario._id, message: 'Usuario created!' });
					});
				}
			});
		
	});
	
//Ver Información de usuario
router.route('/usuarios/:usuario_id')//?app_token
	.get(function(req, res) {
		Usuario.findById(req.params.usuario_id, function(err, usuario) {
			if (err){
				res.send(406,err);
			}
			res.json(usuario);
		});
	})
//Modificar Información de usuario
	.put(function(req, res) {

		// use our bear model to find the bear we want
		Usuario.findById(req.params.usuario_id, function(err, usuario) {
			usuario.nombre = req.body.nombre;
			usuario.apellido = req.body.apellido;
			usuario.email = req.body.email;
			usuario.telefono = req.body.telefono;
			
			// save User
			usuario.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'Usuario updated!' });
			});

		});
	})
//Remover usuario
	.delete(function(req, res) {router.route('/usuarios')
		Usuario.remove({
			_id: req.params.usuario_id
		}, function(err, usuario) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});

//http://localhost:8080/api/apartamentos
//Agregar nuevo apartamento
router.route('/apartamentos') //?app_token
	.post(function(req, res) {
		console.log("POST /apartamentos");
		console.log(req.params);
		console.log(req.body);
		var apartamento = new Apartamento(); 		
		apartamento.descripcion = req.body.descripcion;
		apartamento.direccion_fisica = req.body.direccion_fisica;
		apartamento.area = req.body.area;
		apartamento.ubicacion_latitud = req.body.ubicacion_latitud;
		apartamento.ubicacion_longitud = req.body.ubicacion_longitud;
		apartamento.cercania_tec = req.body.cercania_tec;
		apartamento.mensualidad= req.body.mensualidad;
		apartamento.habitaciones= req.body.habitaciones;
		apartamento.titulo= req.body.titulo;
		apartamento.genero= req.body.genero;
		apartamento.opcion_agua= req.body.opcion_agua;
		apartamento.opcion_electricidad= req.body.opcion_electricidad;
		apartamento.opcion_seguridad= req.body.opcion_seguridad;
		apartamento.opcion_internet= req.body.opcion_internet;
		apartamento.foto_uno= req.body.foto_uno;
		apartamento.foto_dos= req.body.foto_dos;
		apartamento.foto_tres= req.body.foto_tres;
		apartamento.foto_cuatro= req.body.foto_cuatro; 
		 

		// save the token and check for errors
		console.log(apartamento);
		apartamento.save(function(err) {
			if (err)
				res.send(406,err);
			console.log("error"+err);
			res.json({id:apartamento._id, message: 'Apartamento created!' });
		});
		
	});

	
//Buscar apartamento. Falta calificacion
router.route('/apartamentos/search')
	.get(function(req, res) {
		console.log(req.query.cercania_tec);
		var query = Apartamento.find({	"cercania_tec":{$lte:req.query.cercania_tec},
						"mensualidad":{$gte:req.query.min_mensualidad, $lte:req.query.max_mensualidad},
						"habitaciones":{$gte:req.query.habitaciones},
						"genero":req.query.genero
					});
		if(req.query.opcion_seguridad=="true"){
			query.find({"opcion_seguridad":true});
		}
		if(req.query.opcion_agua=="true"){
			query.find({"opcion_agua":true});
		}
		if(req.query.opcion_electricidad=="true"){
			query.find({"opcion_electricidad":true});
		}
		if(req.query.opcion_internet=="true"){
			query.find({"opcion_internet":true});
		}
		
		query.exec(function (err, apartamento) {
  		// called when the `query.complete` or `query.error` are called
  		// internally
			if (err)
				res.send(err);
			res.json(apartamento);
		});
		
	});

//Ver Información de apartamento. Falta calificacion
router.route('/apartamentos/:aparta_id')//?app_token
	.get(function(req, res) {
		Apartamento.findById(req.params.aparta_id, function(err, apartamento) {
			if (err)
				res.send(err);
			res.json(apartamento);
		});
	})
//Modificar Información de apartamento
	.put(function(req, res) {

		// use our bear model to find the bear we want
		Apartamento.findById(req.params.aparta_id, function(err, apartamento) {
			apartamento.descripcion = req.body.descripcion;
			apartamento.direccion_fisica = req.body.direccion_fisica;
			apartamento.area = req.body.area;
			apartamento.ubicacion_latitud = req.body.ubicacion_latitud;
			apartamento.ubicacion_longitud = req.body.ubicacion_longitud;
			apartamento.cercania_tec = req.body.cercania_tec;
			apartamento.mensualidad= req.body.mensualidad;
			apartamento.habitaciones= req.body.habitaciones;
			apartamento.titulo= req.body.titulo;
			apartamento.genero= req.body.genero;
			apartamento.opcion_agua= req.body.opcion_agua;
			apartamento.opcion_electricidad= req.body.opcion_electricidad;
			apartamento.opcion_seguridad= req.body.opcion_seguridad;
			apartamento.opcion_internet= req.body.opcion_internet;
			apartamento.foto_uno= req.body.foto_uno;
			apartamento.foto_dos= req.body.foto_dos;                                                     
			apartamento.foto_tres= req.body.foto_tres;
			apartamento.foto_cuatro= req.body.foto_cuatro;  
			// save the apartment
			apartamento.save(function(err) {
				if (err)
					res.send(err);

				res.json({message: 'Apartamento updated!' });
			});

		});
	})
//Remover apartamento
	.delete(function(req, res) {router.route('/apartamentos')
		Apartamento.remove({
			_id: req.params.aparta_id
		}, function(err, apartamento) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});
//Agregar interesados del apartamento
router.route('/interesados')
	.put(function(req, res) {

		var usuario = Usuario.findById(req.body.usuario_id, function(err, resultado) {
				if (err)
					res.send(err);
				Apartamento.findById(req.body.aparta_id, function(err, aparta) {
						if (err)
							res.send(err);	
						aparta.update({ $push: { interesados: resultado} });	
						res.json(aparta);
					});
				});
		
		//var interesado = new Interesado();
		//interesado.interesado_id=usuario;
	 	//interesado.save(function(err) {
		//	if (err)
		//		res.send(err);
			
		//});
		
		//apartamento.update({ $push: { interesados: usuario} });
		
		//apartamento.populate('interesados').exec(function(err, apartamento){console.log(apartamento.interesados); res.json(interesado);});
		
		
	});
//Ver interesados del apartamento
router.route('/apartamentos/interesados/:aparta_id')
	.get(function(req, res) {
		Apartamento.findById(req.params.aparta_id, function(err, apartamento) {
			if (err)
				res.send(err);

			res.json(apartamento.interesados);
		});
	});

//Borrar interesados del apartamento

//Agregar calificación


//Actualizar calificación
//Cambiar calificación
//Agregar comentarios
//Ver comentarios
//Borrar comentarios

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

