import { Column } from "typeorm";

export class CreateOngkirDto{
    @Column()
    latitude: string
    
    @Column()
    longtitude: string
}