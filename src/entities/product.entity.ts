import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { v4 as uuid } from "uuid"

@Entity()
export class Product {

    @PrimaryGeneratedColumn('uuid')
    readonly id: string

    @Column()
    name: string

    @Column()
    description: string

    @Column()
    price: number

    @Column()
    in_stock: number

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}