import { Column, Entity, JoinColumn, JoinTable, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { v4 as uuid } from "uuid"
import { User } from ".";

@Entity()
export class ResetToken {

    @PrimaryGeneratedColumn('uuid')
    readonly id: string

    @Column()
    token: string

    @OneToOne((type) => User)@JoinColumn()
    user: User

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}