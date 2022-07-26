import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  VersionColumn,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  JoinTable,
} from 'typeorm';
import { Alamat } from './alamat.entity';
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
  role: number;
  
  @Column()
  nama_lengkap: string;

  @Column({unique: true})
  email: string;

  @Column()
  password: string;
  
  @Column({unique: true,type:'varchar'})
  no_telp: number;

  @Column({ nullable: true})
  foto: string;

  @Column()
  salt: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @OneToMany(() => Alamat, (alamat) => alamat.user)
  alamat: Alamat[]
}
