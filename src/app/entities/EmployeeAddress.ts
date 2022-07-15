import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { AbstractEntity } from "./AbstractEntity";
import { Employee } from "./Employee";


@Entity("employeeAddress")                         //indicates that this class is an entity and will be mapped to a table
export class EmployeeAddress extends AbstractEntity {
    @PrimaryGeneratedColumn("uuid")          //indicates that this field is the primary key
    public id: string;

    @Column({ nullable: false })            //indicates that this field is not nullable
    public city: string;

    @Column({ nullable: false })            //indicates that this field is not nullable
    public state: string;

    @Column({ nullable: false })            //indicates that this field is not nullable
    public zip: string;


    // @OneToOne(() => Employee, (employee) => employee.employeeAddress)
    // @JoinColumn()
    // public employee: Employee[];

}