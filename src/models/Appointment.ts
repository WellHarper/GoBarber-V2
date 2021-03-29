import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToMany, ManyToOne, JoinColumn} from "typeorm"
import User from './Users'
@Entity('appointments')
class Appointment {
    @PrimaryGeneratedColumn("uuid")
    id: string;  

    @Column()
    providerId: string;


    //Isso aqui corresponde ao relacionamento
    @ManyToOne(() => User)
    @JoinColumn({name: 'providerId'})
    provider: User

    @Column("time with time zone")
    date: Date;

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updateAt: Date

   
}

export default Appointment

