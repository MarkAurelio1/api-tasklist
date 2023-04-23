import  Sequelize  from 'sequelize'

const sequelize = new Sequelize('tasklistO', 'postgres', '158LK*op1',{
  host: 'localhost',
  dialect: 'postgres'
})
 
sequelize.authenticate()
.then(()=>{
  console.log("Conexão com banco de dados com sucesso!")
}).catch(() => {
  console.log("Erro: Conexão com banco de dados não realizado com sucesso!")
})

export default sequelize