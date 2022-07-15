import { getConnection, ObjectLiteral } from "typeorm";
import { Employee } from "../entities/Employee";

export class EmployeeRespository {

    async createEmployee(emp: ObjectLiteral) {
        const employeeRepo = getConnection().getRepository(Employee);  //get the repository for the Employee entity
        return employeeRepo.save(emp);        //return all the employees
    }

    async getAllEmployees() {
        const employeeRepo = getConnection().getRepository(Employee);  //get the repository for the Employee entity
        return employeeRepo.find();         //return all the employees
    }

    async getEmployeeById(id: any) {
        const employeeRepo = getConnection().getRepository(Employee);  //get the repository for the Employee entity
        return employeeRepo.findOne(id);         //return all the employees
    }

    async deleteEmployee(id: any) {
        const employeeRepo = getConnection().getRepository(Employee);  //get the repository for the Employee entity
        return employeeRepo.softDelete(id);         //return all the employees
    }

    async updateEmployee(emp: ObjectLiteral) {
        const employeeRepo = getConnection().getRepository(Employee);  //get the repository for the Employee entity
        const temp = await employeeRepo.findOne({ id: emp.id });
        temp.name = emp.name;
        temp.departmentId = emp.departmentId;

        const savedEmployee = await employeeRepo.save(temp);
        return savedEmployee    //return all the employees
    }

    public async getEmployeeByName(name: string) {
        const employeeRepo = getConnection().getRepository(Employee);
        const employeeDetail = await employeeRepo.findOne({
            where: { name: name },
        });
        return employeeDetail;
    }

    public async saveEmployeeDetails(employeeDetails: Employee) {
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.save(employeeDetails);
    }
}
