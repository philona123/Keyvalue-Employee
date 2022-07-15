import { getConnection, ObjectLiteral } from "typeorm";
import { CreateDepartmentDto } from "../dto/CreateDepartment";
import { Department } from "../entities/Department";


export class DepartmentRespository {
    async getAllDepartment() {
        const departmentRepo = getConnection().getRepository(Department);  //get the repository for the Department entity
        return departmentRepo.find();         //return all the departments
    }

    async createDEpartment(dept: ObjectLiteral) {
        const departmentRepo = getConnection().getRepository(Department);  //get the repository for the Department entity
        return departmentRepo.save(dept);        //return all the departments
    }

    async getDepartmentById(id: ObjectLiteral) {
        const departmentRepo = getConnection().getRepository(Department);  //get the repository for the Department entity
        return departmentRepo.findOne(id);         //return all the departments
    }

    async deleteDepartment(id: ObjectLiteral) {
        const departmentRepo = getConnection().getRepository(Department);  //get the repository for the Department entity
        return departmentRepo.softDelete(id);         //return all the departments
    }

    async updateDepartment(dept: ObjectLiteral) {
        const departmentRepo = getConnection().getRepository(Department);  //get the repository for the Department entity
        const temp = await departmentRepo.findOne({ id: dept.id });
        temp.name = dept.name; 
        const savedDepartment = await departmentRepo.save(temp);
        return savedDepartment    //return all the departments
    }

    public async getDepartmentByName(name: string) {
        const departmentRepo = getConnection().getRepository(Department);
        const departmentDetail = await departmentRepo.findOne({
            where: { name: name },
        });
        return departmentDetail;
    }

    public async saveDepartmentDetails(departmentDetails: Department) {
        const departmentRepo = getConnection().getRepository(Department);
        return departmentRepo.save(departmentDetails);
    }


}

