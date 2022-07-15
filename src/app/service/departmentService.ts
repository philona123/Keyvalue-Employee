import { plainToClass } from "class-transformer";
import { ObjectLiteral } from "typeorm";
import { Department } from "../entities/Department";
import HttpException from "../exception/HttpException";
import { DepartmentRespository } from "../repository/DepartmentRepository";


export class DepartmentService{
    constructor(private departmentrepo: DepartmentRespository){}
    async getAllDepartments(){
        
        return await this.departmentrepo.getAllDepartment();
    }

//     createEmployee() {
//          const departmentResp="Department created successfully";
//          return departmentResp;
//  }

     public async createDepartment(departmentDetails: any) {
         try {
             const newDepartment = plainToClass(Department, {
                 name: departmentDetails.name,
             });
             console.log(newDepartment);
             const save = await this.departmentrepo.saveDepartmentDetails(newDepartment);
             return save;
         } catch (err) {
             throw new HttpException(400, "Failed to create department");
         }
     }

     public async updateDepartment(departmentDetails: ObjectLiteral) {
         try {
             const updatedDepartment = await this.departmentrepo.updateDepartment(departmentDetails);
             return updatedDepartment;
         } catch (err) {
             throw new HttpException(400, "Failed to update department");
         }
     }

     public async deleteDepartment(id: any) {
            try {
                const deleteDepartment = await this.departmentrepo.deleteDepartment(id);
                return deleteDepartment;
            } catch (err) {
                throw new HttpException(400, "Failed to delete department");
            }
     }
    }
