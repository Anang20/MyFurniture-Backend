import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, JoinTable, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Request {
    @PrimaryGeneratedColumn('increment')
    id_request: number

    @ManyToOne(()=> User, user => user.request)
    @JoinColumn()
    user: User

    @Column()
    nama_produk: string

    @Column()
    quantity: number

    @CreateDateColumn()
    created_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;
}