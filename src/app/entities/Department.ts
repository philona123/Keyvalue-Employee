import { BaseEntity, Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AbstractEntity } from "./AbstractEntity";
import { Employee } from "./Employee";

@Entity("department")                         //indicates that this class is an entity and will be mapped to a table
export class Department extends AbstractEntity {
    @PrimaryGeneratedColumn("uuid")          //indicates that this field is the primary key
    public id: string;

    @Column({ nullable: false })            //indicates that this field is not nullable
    public name: string;

    @OneToMany(() => Employee, (employee) => employee.department)
    @JoinColumn()
    public employee: Employee[];
}