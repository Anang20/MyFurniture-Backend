import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinTable, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Request {
    @PrimaryGeneratedColumn('increment')
    id_request: number

    @OneToOne(()=> User, user => user.request)
    @JoinTable()
    user: User

    @Column()
    nama_produk: string

    @Column()
    quantity: number
}