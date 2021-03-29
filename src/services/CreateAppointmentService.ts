import startOfHour from "date-fns/startOfHour";
import Appointment from "../models/Appointment";
import AppointmentsRepository from "../models/Repository/AppointmentRepository";

import {getCustomRepository} from 'typeorm'
import appointmentsRouter from "../routes/appointments.routes";

interface RequestDTO {
    provider: string;
    date: Date;
}


class CreateAppointmentService {

     public async execute({provider, date}:RequestDTO):Promise <Appointment> {

        const appointmentsRepository = getCustomRepository(AppointmentsRepository);

        const appointmentDate = startOfHour(date)

        const findAppointmentInTheSameTime = await appointmentsRepository.findByDate(appointmentDate);
        
        if(findAppointmentInTheSameTime) {
             throw Error("Já tem gente nesse horario, meu bom moço")
        }

        const appointment = appointmentsRepository.create({
            provider,
            date: appointmentDate
        })

        await appointmentsRepository.save(appointment)

        return appointment
    
    }
}

export default CreateAppointmentService