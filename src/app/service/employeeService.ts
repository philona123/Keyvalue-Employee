import { plainToClass } from "class-transformer";
import { JsonWebTokenError } from "jsonwebtoken";
import { ObjectLiteral } from "typeorm";
import { Employee } from "../entities/Employee";
import EntityNotFoundException from "../exception/EntityNotFoundException";
import HttpException from "../exception/HttpException";
import IncorrectUsernameOrPasswordException from "../exception/IncorrectUsernameOrPasswordException";
import UserNotAuthorizedException from "../exception/UserNotAuthorizedException";
import { EmployeeRespository } from "../repository/EmployeeRepository";
const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')

export class EmployeeService{
    constructor(private employeerepo: EmployeeRespository){}
    async getAllEmployees(){
        
        return await this.employeerepo.getAllEmployees();
    }

    // async createEmployee(emp: ObjectLiteral) {
    //     const employeeResp="Employee created successfully";
    //     return await this.employeerepo.createEmployee(emp);
    // }

    async getEmployeeById(id: any){
        const emp=await this.employeerepo.getEmployeeById(id);
        if(!emp){
            throw new EntityNotFoundException({
                CODE: "404",
                MESSAGE: "Employee not found"
            })
        }
        return emp;
    }

    async deleteEmployee(id: any){
        return await this.employeerepo.deleteEmployee(id);
    }

    async updateEmployee(emp: ObjectLiteral){
      emp.password=emp.password ? await bcrypt.hash(emp.password,10):'';

      const updatedEmployee = await this.employeerepo.updateEmployee(emp);
        return updatedEmployee;
    }


    public async createEmployee(employeeDetails: any, addressId: string) {
        try {
            const newEmployee = plainToClass(Employee, {
                name: employeeDetails.name,
                password: employeeDetails.password ?  await bcrypt.hash(employeeDetails.password, 10): '',
                // age: employeeDetails.age,
                departmentId: employeeDetails.departmentId,
                role: employeeDetails.role,
                employeeAddressId: addressId
                // isActive: true,
            });
            console.log(newEmployee);
            const save = await this.employeerepo.saveEmployeeDetails(newEmployee);
            return save;
        } catch (err) {
            throw new HttpException(400, "Failed to create employee");
        }
    }

    public employeeLogin = async (
        name: string,
        password: string
      ) => {
        const employeeDetails = await this.employeerepo.getEmployeeByName(
          name
        );
        if (!employeeDetails) {
          throw new UserNotAuthorizedException();
        }
        const validPassword = await bcrypt.compare(password, employeeDetails.password);
        console.log(validPassword);
        if (validPassword) {
          let payload = {
            "custom:id": employeeDetails.id,
            "custom:name": employeeDetails.name,
            "custom:role": employeeDetails.role? employeeDetails.role : 'admin',
          };
          console.log(payload);
          const token = this.generateAuthTokens(payload);
          console.log(token);
          return {
            idToken: token,
            employeeDetails,
          };
        } else {
          throw new IncorrectUsernameOrPasswordException();
        }
      };

     private generateAuthTokens = (payload: any) => {
        return jsonwebtoken.sign(payload, process.env.JWT_TOKEN_SECRET, {
          expiresIn: process.env.ID_TOKEN_VALIDITY,
        });
      };  
}