var express = require('express');
var router = express.Router();
var novedadesModel = require('./../../models/novedadesModel');

router.get('/', async function(req, res, next) {
  var novedades = await novedadesModel.getClientes();
  res.render('admin/novedades', {
    layout: 'admin/layout',
    usuario: req.session.nombre,
    novedades
  });
});

router.get('/eliminar/:id', async (req, res, next)=> {
  var id = req.params.id;
  await novedadesModel.deleteClienteById(id);
  res.redirect('/admin/novedades')
})

router.get('/agregar', (req, res, next) => {
  res.render('admin/agregar',{
    layout: 'admin/layout'
  });
});

router.post('/agregar', async (req, res, next) =>{
  try{
    if(req.body.nombre != "" && req.body.comentario != ""){
      await novedadesModel.insertCliente(req.body);
      res.redirect('/admin/novedades')
    } else {
      res.render('admin/agregar', {
        layout: 'admin/layout',
        error: true, message: 'Todos los campos deben ser completados'
      })
    }
  } catch (error){
    console.log(error)
    res.render('admin/agregar', {
      layout: 'admin/layout',
      error: true, message: 'No se cargó el cliente'
    });
  }
});

router.get('/modificar/:id', async (req, res, next) =>{
  let id = req.params.id;
  let cliente = await novedadesModel.getClienteById(id);
  res.render('admin/modificar', {
    layout: 'admin/layout',
    cliente
  });
});

router.post('/modificar', async (req, res, next) =>{
  try{
    let obj = {
      nombre: req.body.nombre,
      comentario: req.body.comentario
    }
    await novedadesModel.modificarClienteById(obj, req.body.id);
    res.redirect('/admin/novedades');
  } catch (error) {
    console.log(error)
    res.render('admin/modificar', {
      layout: 'admin/layout',
      error: true, message: 'No se modificó al cliente y/o comentario'
    });
  }
});

module.exports = router;
