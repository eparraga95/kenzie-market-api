import { Entity, Column, PrimaryColumn, OneToOne, OneToMany, JoinColumn } from "typeorm";
import { Cart } from "./cart.entity";
import { Buy } from "./buy.entity";
import { v4 as uuid } from "uuid";

@Entity()
export class User {
    
    @PrimaryColumn('uuid')
    readonly id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    isAdm: boolean;

    @OneToMany(type => Buy, buy => buy.user, {
        eager: true
    }) 
    buys: Buy[]

    @OneToOne((type) => Cart, {
        eager: true
    })@JoinColumn()
    cart: Cart;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}
