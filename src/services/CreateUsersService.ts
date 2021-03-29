import User from '../models/Users'
import {getRepository} from 'typeorm'
import { hash, hashSync } from 'bcryptjs'


interface Request {
    name: string;
    email: string;
    password: string;
}




export default class CreateUsersService {


    public async execute({name, email, password}:Request): Promise<User> {
        const usersRepository = getRepository(User)


        const checkUserExists = await usersRepository.findOne({
            where: { email }
        });
        

        if(checkUserExists) {
            throw new Error("Email já cadastrado")
        }

        const hashedPassword = await hash(password, 5)

        const user = usersRepository.create({
            name,
            email,
            password: hashedPassword,
        })


       await usersRepository.save(user)

       return user

    }

}