// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express'); 		// call express
var app        = express(); 				// define our app using express
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var Usuario    = require('./app/models/usuario');
var Token    = require('./app/models/token');
var Apartamento = require('./app/models/apartamento');
var Calificacion = require('./app/models/calificacion');
var Comentario = require('./app/models/comentario');
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser());
mongoose.connect('mongodb://emmamm05:8ClQ5RA4Nywv@ds033499.mongolab.com:33499/apparta'); // connect to our database
//mongoose.connect('mongodb://localhost/example');

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
	.put(function(req, res) {
		var usuario = Usuario.findOne( {'email': req.body.email}, function(err,user){
		    if (err)
			res.send(err);
		    var token = new Token();
			require('crypto').randomBytes(48, function(ex, buf) {
				token.token = buf.toString('hex');
				token.save(function(err, tok) {
					if (err)
						res.send(err);
					user.tokens.push(tok._id);
					user.save(function(err, tok) {
						if (err)
							res.send(err);})
					res.json(tok);
				});
			});
			
					
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
					usuario.cumpleanos = req.body.cumpleanos;
					usuario.password = req.body.password;
					usuario.genero = req.body.genero; 
					usuario.oauth_proveedor = req.body.oauth_proveedor;
					// save the token and check for errors
					usuario.save(function(err, resultado) {
						if (err)
							res.send(err);
						res.json(resultado);
					});
				}
			});
		
	});
	
//Ver Información de usuario
router.route('/usuarios/:usuario_id')
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
			usuario.es_anunciante = req.body.es_anunciante;
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
router.route('/apartamentos/:user_id') //?app_token
	.post(function(req, res) {
		console.log("POST /apartamentos");
		console.log(req.params);
		console.log(req.body);
		var usuario = Usuario.findById(req.params.user_id, function(err, user){
									if (err)
										res.send(err);
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
									apartamento.anunciante= user._id;

									// save the token and check for errors
									console.log(apartamento);
									apartamento.save(function(err, aparta) {
										if (err)
											res.send(406,err);
										console.log("error"+err);
										user.apartamentos.push(aparta._id);
										user.save(function(err, aparta) {
												if (err)
													res.send(err);
										});
										res.json({id:aparta._id, message: 'Apartamento created!' });
									});
		});
		
		
	});

	
//Buscar apartamento.
router.route('/apartamentos/search')
	.get(function(req, res) {
		console.log(req.query.cercania_tec);
		var query = Apartamento.find({	"cercania_tec":{$lte:req.query.cercania_tec},
						"mensualidad":{$gte:req.query.min_mensualidad, $lte:req.query.max_mensualidad},
						"habitaciones":{$gte:req.query.habitaciones},
						"genero":req.query.genero,
						"calificacion":req.body.calificacion
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
		query.populate('fotos');
		query.exec(function (err, apartamento) {
			if (err)
				res.send(err);
			res.json(apartamento);
		});
		
	});

//Ver Información de apartamento. 
router.route('/apartamentos/:aparta_id')//?app_token
	.get(function(req, res) {
		Apartamento.findById(req.params.aparta_id, function(err, apartamento) {
			if (err)
				res.send(err);
			
				
		}).populate('anunciante').exec(function(err, apartamento){
										res.json(apartamento);});
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
//Agregar interesados del apartamento -> Requiere aparta_id, user_id
router.route('/interesados')
	.put(function(req, res) {
		var apartamento = Apartamento.findById(req.body.aparta_id, function(err, aparta) {
				if (err)
					res.send(err);
				console.log('Aparta encontrado');
				var usuario = Usuario.findById(req.body.usuario_id, function(err, user) {
					if (err)
						res.send(err);
					user.interes.addToSet(aparta._id);
					user.save(function(err) {
							if (err)
								res.send(err);});
					console.log('Usuario encontrado');
					aparta.interesados.addToSet(user._id);
					aparta.save(function(err, resultado) {
							if (err)
								res.send(err);
								Apartamento.findById(req.body.aparta_id, function(err, elim){
														if (err)
															res.send(err);})
										.populate('interesados').exec(function(err, apartamento){console.log(apartamento.interesados); 
															res.json(apartamento);});
						});
					
					});	
				
				});
		
	});

//Borrar interesados del apartamento -> Requiere aparta_id, user_id
router.route('/interesados/eliminar')
	.put(function(req, res) {
		var apartamento = Apartamento.findById(req.body.aparta_id, function(err, aparta) {
				if (err)
					res.send(err);
				console.log('Aparta encontrado');
				var usuario = Usuario.findById(req.body.usuario_id, function(err, user) {
					if (err)
						res.send(err);
					user.interes.pull(aparta._id);
					user.save(function(err) {
							if (err)
								res.send(err);});
					console.log('Usuario encontrado');
					aparta.interesados.pull(user._id);
					aparta.save(function(err, resultado) {
							if (err)
								res.send(err);
								Apartamento.findById(req.body.aparta_id, function(err, elim){
														if (err)
															res.send(err);})
									.populate('interesados').exec(function(err, apartamento){console.log(apartamento.interesados); 
															res.json(apartamento);});
						});
					
					});	
				
				});
	
	});
//Ver listas de apartamentos de interes -> Requiere user_id
router.route('/interesados/:user_id')
	.get(function(req, res) {
		
		Usuario.findById(req.params.user_id, function(err, user) {
						if (err)
							res.send(err);
						Apartamento.find({'_id':{ $in: user.interes }}).populate('interesados').exec(function(err, aparta){
											if(err)
												res.send(err);
											console.log(aparta);
											res.json(aparta);
						});
		});
	});



//Agregar y Actualizar al agregar calificación -> Requiere aparta_id, user_id y calificacion
router.route('/calificacion')
	.put(function(req, res) {
		
		var apartamento = Apartamento.findById(req.body.aparta_id, function(err, aparta) {
			if (err)
					res.send(err);
			var usuario = Usuario.findById(req.body.usuario_id, function(err, user) {
				if (err)
					res.send(err);
				console.log('usuario find');
				
				var existe = Calificacion.find({'autor':user._id, 'aparta':aparta._id});
				existe.exec(function (err, exist) {
		  		// called when the `query.complete` or `query.error` are called
		  		// internally
					
					if (err)
						res.send(err);
					//Agregar calificacion
					else if (exist.length==0){
						var calificacion = new Calificacion();
						calificacion.calificacion=req.body.calificacion;
						calificacion.autor=user._id;
						calificacion.aparta=aparta._id
						calificacion.save(function(err, result) {
								if (err)
									res.send(err);
								console.log('calificacion find');
								aparta.calificaciones.addToSet(result._id);
								console.log(result);	
								aparta.save(function(err, resultado) {
								if (err)
									res.send(err);
										Calificacion.find({'aparta':req.body.aparta_id}).exec(function(err, actualiza){
												if (err)
												     res.send(err);
												var total=0;
												for(var i=0;i<actualiza.length;i++){
													total+=actualiza[i].calificacion;
												}
												console.log(total);
												aparta.calificacion=Math.floor(total/actualiza.length);
												aparta.save(function(err) {
													if (err)
														res.send(err);
                                                                                 Apartamento.findById(req.body.aparta_id, function(err, elim){
															if (err)
																res.send(err);})
										.populate('calificaciones').exec(function(err, apartamento){console.log(apartamento.calificaciones); 
																res.json(apartamento);});
													});});
					
								});
							});
					//Actualizar calificacion
					}else{var modificado = Calificacion.findOne({'autor':user._id, 'aparta':aparta._id});
					      modificado.exec(function(err, modify){if (err)
									res.send(err);
								modify.calificacion=req.body.calificacion;
								modify.save(function(err, mod) {
									if (err)
										res.send(err);
									Calificacion.find({'aparta':req.body.aparta_id}).exec(function(err, actualiza){
												if (err)
												     res.send(err);
												var total=0;
												for(var i=0;i<actualiza.length;i++){
													total+=actualiza[i].calificacion;
												}
												console.log(total);
												aparta.calificacion=Math.floor(total/actualiza.length);
												aparta.save(function(err) {
													if (err)
														res.send(err);
                                                                                 Apartamento.findById(req.body.aparta_id, function(err, elim){
															if (err)
																res.send(err);})
										.populate('calificaciones').exec(function(err, apartamento){console.log(apartamento.calificaciones); 
																res.json(apartamento);});
													});});
									
								});	
						});}
					});
				});			
			});			
	
	});


//Agregar comentarios -> Requiere aparta_id, user_id y contenido.
router.route('/comentario')
	.put(function(req, res) {
		var apartamento = Apartamento.findById(req.body.aparta_id, function(err, aparta) {
				if (err)
					res.send(err);
				console.log('Aparta encontrado');
				var usuario = Usuario.findById(req.body.usuario_id, function(err, user) {
					if (err)
						res.send(err);
					console.log('Usuario encontrado');
					var comentario = new Comentario();
					comentario.contenido=req.body.contenido;
					comentario.autor=user._id;
					comentario.save(function(err, result) {
								if (err)
									res.send(err);
						console.log(result);
						aparta.comentarios.push(result._id);
						aparta.save(function(err, resultado) {
								if (err)
									res.send(err);
									Apartamento.findById(req.body.aparta_id, function(err, elim){
															if (err)
																res.send(err);}).lean()
										.populate({path:'comentarios'}).exec(function(err, apartamento){var options = {
																      path: 'comentarios.autor',
																      model: 'Usuario'
																    };if (err)
																	res.send(err);
												Apartamento.populate(apartamento, options, function (err, result_aparta) {
												      res.json(result_aparta);
												    });});
							});
						});

					
					});	
				
				});
	
	});
//Mis Apartas
router.route('/misapartas/:user_id')
	.get(function(req, res) {
		Usuario.findById(req.params.user_id, function(err) {
								if (err)
									res.send(err);
								
		}).populate('apartamentos').exec(function(err, result) {
								if (err)
									res.send(err);
								res.json(result.apartamentos);
								
						});
	});
//Lista Recientes
router.route('/recientes')
	.get(function(req, res) {
		Apartamento.find({}).sort({fecha_creacion:  'desc'}).limit(8).exec(function(err, resultado) {
								if (err)
									res.send(err);
								res.json(resultado);
								
		});
	});
//Lista Favoritos
router.route('/favoritos')
	.get(function(req, res) {
		Apartamento.find({}).sort({calificacion:  'desc'}).limit(4).exec(function(err, resultado) {
								if (err)
									res.send(err);
								res.json(resultado);
								
		});
	});
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

