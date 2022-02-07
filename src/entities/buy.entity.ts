import { Entity, Column, ManyToMany, JoinTable, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Product } from "./product.entity";
import { User } from ".";
import { v4 as uuid } from "uuid"

@Entity()
export class Buy {

    @PrimaryGeneratedColumn('uuid')
    readonly id: string

    @ManyToOne(type => User, user => user.buys)
    user: User

    @ManyToMany(type => Product, {
        eager: true
    }) @JoinTable()
    products: Product[]

    @Column("float")
    total: number

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}