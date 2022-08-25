import { IsNotEmpty } from 'class-validator';
import { Order } from 'src/order/entities/order.entity';
import { Produk } from 'src/produk/entities/produk.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  id_cart: string;

  @ManyToOne(() => Produk, (produk) => produk.detail, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn()
  produk: Produk;

  @ManyToOne(() => Order, (order) => order.cart)
  order: Order;

  @Column()
  kuantiti: number;

  @Column()
  status: string

  @Column()
  harga_total: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @ManyToOne(() => User, (user) => user.cart)
  @JoinColumn()
  user: User;
}
