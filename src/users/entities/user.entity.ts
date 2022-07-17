import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  VersionColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Role } from './role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id_user: string;

  @ManyToOne(
    () => {
      return Role;
    },
    (callBack) => {
      return callBack.id_role
    }
  )
  role: Role;
  

  @Column()
  nama_lengkap: string;

  @Column({unique: true})
  email: string;

  @Column()
  password: string;
  
  @Column({unique: true})
  no_telp: string;

  @Column({ nullable: true})
  foto: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
