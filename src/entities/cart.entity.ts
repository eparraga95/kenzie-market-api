import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";
import { v4 as uuid } from "uuid"

@Entity()
export class Cart {

    @PrimaryGeneratedColumn('uuid')
    readonly id: string

    @ManyToMany(type => Product, {
        eager: true,
    }) @JoinTable()
    products: Product[]

    @Column("float")
    subtotal: number
    
    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}