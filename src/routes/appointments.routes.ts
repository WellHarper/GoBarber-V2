import { Router } from 'express'
import { parseISO} from 'date-fns'
import AppointmentRepository from '../models/Repository/AppointmentRepository'
import CreateAppointmentService from '../services/CreateAppointmentService'
import {getCustomRepository} from 'typeorm'

//Cria uma variavel com o método Router para poder fazer as requisições
const appointmentsRouter = Router();


//Rotas: Receber a requisição ->  Chamar outro arquivo -> Devolver resposta

appointmentsRouter.get('/', async (request, response) => {
    //Cria o objeto repositório
    const appointmentRepository = getCustomRepository(AppointmentRepository)

    const appointments = await appointmentRepository.find()

    response.json(appointments)
})

appointmentsRouter.post('/', async (request, response) => {

  try {
    //pega o corpo da url
    const { provider, date } = request.body;

    //converte a data de string para date
    const parsedDate = parseISO(date)

    //passa o repositório para o service CreateAppointmentService
    const CreateAppointment = new CreateAppointmentService();

    //passa os dados para o método do service
    const appointment = await CreateAppointment.execute({ date: parsedDate, provider })
 
    //retorna a resposta
    return response.json(appointment);
  } 
  
  catch(err) {
    //retorna o erro
    return response.status(400).json({error: err.message})
  }
})

export default appointmentsRouter

