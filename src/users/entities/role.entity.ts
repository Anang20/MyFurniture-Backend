import { Column, Entity, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Role {
    @OneToMany(
        () => {
            return User;
        },
        (callBack) => {
            return callBack.id_user
        }
    )
    
    @PrimaryColumn()
    id_role: number;

    @Column()
    role_name: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

   
}