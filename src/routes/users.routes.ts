import { Router } from 'express'
import CreateUsersService from '../services/CreateUsersService'

//Cria uma variavel com o método Router para poder fazer as requisições
const usersRouter = Router();


//Rotas: Receber a requisição ->  Chamar outro arquivo -> Devolver resposta


usersRouter.post('/', async (request, response) => {
  try {
      const {name, email, password} = request.body

      

      const createUser = new CreateUsersService();

      const user = await createUser.execute({
          name,
          email,
          password
      })

      delete user.password;


      return response.json(user)
  } catch(err) {
    return response.status(400).json({error: err.message})
  }
})

export default usersRouter

