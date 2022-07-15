import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { AbstractEntity } from "./AbstractEntity";
import { Department } from "./Department";
import { EmployeeAddress } from "./EmployeeAddress";

@Entity("employee")                         //indicates that this class is an entity and will be mapped to a table
export class Employee extends AbstractEntity {
    @PrimaryGeneratedColumn("uuid")          //indicates that this field is the primary key
    public id: string;

    @Column({ nullable: false })            //indicates that this field is not nullable
    public name: string;

    @Column({ nullable: true})   
    public password: string;

    @Column({ nullable: true })            //indicates that this field is not nullable
    public role: string;
    

    @ManyToOne(() => Department, { cascade: true })
    @JoinColumn()
    public department: Department;

    @Column({ nullable: false })
    public departmentId: string;

    @OneToOne(()=>EmployeeAddress,{cascade:true})
    @JoinColumn()
    public employeeAddress:EmployeeAddress;

    @Column({ nullable: false })
    public employeeAddressId: string;
}

