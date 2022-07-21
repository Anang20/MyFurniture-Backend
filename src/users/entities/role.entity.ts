import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany, PrimaryColumn, } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Role {
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

    @OneToMany(
        () => {
            return User;
        },
        (callBack) => {
            return callBack.id_user
        }
    )
    user: User
}