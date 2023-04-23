import { Router } from 'express'

import bcrypt from 'bcryptjs'
import  jwt  from 'jsonwebtoken'

import { eAdmin } from '../middlewares/auth'
import User from '/APIS JS/tasklist/models/User'

const routes = new Router()


routes.get('/', eAdmin, async (req,res) => {
  return res.json({
    erro: false,
    mensagem: 'Listar usuários',
    id: req.userId
  })
})

routes.post('/cadastrar', async (req, res) => { 
  var dados = req.body

  dados.password = await bcrypt.hash(dados.password, 8)

  await User.create(dados)
  .then(() => {
    return res.json({
      erro: false,
      mensagem: 'Usuário cadastrado com sucesso!'
    })
  }).catch(() => {
    return res.status(400).json({
      erro: true,
      mensagem: 'Erro: Usuário não cadastrado com sucesso!'
    })
  })
})

routes.post('/login', async (req, res) => {
  //console.log(req.body);

  if(req.body.email != 'vitoria@vitoria.com'){
    return res.status(400).json({
      erro: true,
      mensgem: "Erro: Usuário ou senha incorreta !, email"
    })
  }

  if(!(await bcrypt.compare(req.body.password, "$2a$08$jRtQdgLOLqwtIDS4OpP8eu/tJLLVYx2x4sR.qH4xrsh.QSdskQdbO"))) {
    return res.status(400).json({
      erro: true,
      mensgem: "Erro: Usuário ou Senha incorreta !, Senha"
    })
  }

  var token = jwt.sign({ id: 1}, "MKDIISAASASSDWPPIYZC06687SRTZLP010238QUYS", {
    expiresIn: '7d'
  })

  return res.json({
    erro: false,
    mensagem: 'Login realizado com sucesso!',
    token
  })
})

export default routes