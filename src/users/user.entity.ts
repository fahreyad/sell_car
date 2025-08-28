import {Entity,Column,PrimaryGeneratedColumn, AfterInsert, AfterUpdate, AfterRemove} from "typeorm";
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @AfterInsert()
    logInsert() {
        console.log(`User created: ${this.id}`);
    }

    @AfterUpdate()
    logUpdate() {
        console.log(`User updated: ${this.id}`);
    }   

    @AfterRemove()
    logRemove() {
        console.log(`User removed: ${this.id}`);
    }
}