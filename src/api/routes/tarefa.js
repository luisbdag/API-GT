const express = require('express');
const auth = require('../middleware/auth');


const CriarTarefas = require('../controllers/tarefas/CriarTarefas');
const ObterTodasTarefas = require('../controllers/tarefas/ObterTodasTarefas');
const ObterTarefa = require('../controllers/tarefas/ObterTarefa');
const AtualizarTarefa = require('../controllers/tarefas/UpdateTask');
const DeletarTarefa = require('../controllers/tarefas/DeletarTarefa');

const router = express.Router();

router.use(auth);

router.route('/tarefas').post(CriarTarefas).get(ObterTarefa);


router
	.route('/tarefas/:id')
	.get(ObterTarefa)
	.patch(AtualizarTarefa)
	.delete(DeletarTarefa);

module.exports = router;
