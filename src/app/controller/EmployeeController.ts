import { AbstractController } from "../util/rest/controller";
import { NextFunction, Response } from "express";
import RequestWithUser from "../util/rest/request";
import APP_CONSTANTS from "../constants";
import { EmployeeService } from "../service/employeeService";
import validationMiddleware from "../middleware/validationMiddleware";
import { CreateEmployeeDto } from "../dto/CreateEmployee";
import authorize from "../middleware/authorizeMiddleware";
import { JsonWebTokenError } from "jsonwebtoken";
import { AddressService } from "../service/addressService";
import { plainToClass } from "class-transformer";
import { Employee } from "../entities/Employee";
import { EmployeeAddress } from "../entities/EmployeeAddress";
import { CreateDepartmentDto } from "../dto/CreateDepartment";
import { Users } from ".";

class EmployeeController extends AbstractController {
  constructor(private employeeService: EmployeeService, private addressService: AddressService) {
    super(`${APP_CONSTANTS.apiPrefix}/employee`);
    this.initializeRoutes();
  }
  protected initializeRoutes() {
    this.router.get(`${this.path}`, authorize(["admin"]), this.getAllEmployees);
    this.router.post(`${this.path}`, 
    validationMiddleware(CreateEmployeeDto, APP_CONSTANTS.body),
    // validationMiddleware(CreateDepartmentDto, APP_CONSTANTS.body),
    this.createEmployee
    );
    this.router.get(`${this.path}/:id`, this.getEmployeeById);
    this.router.delete(`${this.path}/:id/`, authorize([Users.ADMIN, Users.HR]), this.deleteEmployee);
    this.router.put(`${this.path}`, this.updateEmployee);
    this.router.post(`${this.path}/login`,this.login);
  }


  private getAllEmployees = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
    
      response.status(200);
      const empData = await this.employeeService.getAllEmployees();
      const addrData = await this.addressService.getAllAddresses();
      console.log(empData);
      const employees = empData.map((employee) => {
        let address = addrData.find((address) => address.id === employee.employeeAddressId);
        return{
          name: employee.name,
          role: employee.role,
          departmentId: employee.departmentId,            
          city: address.city,
          state: address.state,
          zip: address.zip
        }
      })
      const data = {
        employees: employees
      }
      console.log(employees)
      response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, "OK"));
    } catch (error) {
      return next(error);
    }
  }

  private createEmployee = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      response.status(200);
      // console.log(request.body);
      const addrData = await this.addressService.createAddress(request.body.address);
      console.log(addrData)
      const empData = await this.employeeService.createEmployee(request.body, addrData.id);
      const data = {
        "employee": empData,
        "address": addrData
      }
      response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, 'OK'));
    } catch (error) {
      return next(error);
    }
  }


  private getEmployeeById = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      response.status(200);
      const employee = await this.employeeService.getEmployeeById(request.params.id);

      const address = await this.addressService.getAddressOfEmp(employee.employeeAddressId);
      const data = {
        name: employee.name,
        role: employee.role,
        departmentId: employee.departmentId,
        city: address.city,
        state: address.state,
        zip: address.zip,
      }
      response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, 'OK'));
    } catch (error) {
      return next(error);
    }
  }

  private deleteEmployee = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      response.status(200);
      const data = await this.employeeService.deleteEmployee(request.params.id);
      response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, "OK"));
      // console.log(request.params.id);
    } catch (error) {
      return next(error);
    }
  }

  private updateEmployee = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      response.status(200);
      const employee = plainToClass(Employee, {
        id: request.body.id,
        name: request.body.name,
        role: request.body.role,
        departmentId: request.body.departmentId,
        password: request.body.password,
      })

      const newemp = await this.employeeService.updateEmployee(employee);

      const address = plainToClass(EmployeeAddress, {
        id: newemp.employeeAddressId,
        city: request.body.city,
        state: request.body.state,
        zip: request.body.zip,
      })
      const newaddr = await this.addressService.updateAddress(address);
      const data = {
        "employee": newemp,
        "address": newaddr
      }
      response.send(this.fmt.formatResponse(data, Date.now() - request.startTime, "OK"));
    } catch (error) {
      return next(error);
    }
  }

  private login = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    const loginData = request.body;
    const loginDetail = await this.employeeService.employeeLogin(
      loginData.name,
      loginData.password
    );
    response.send(
      this.fmt.formatResponse(loginDetail, Date.now() - request.startTime, "OK")
    );
  };

}

export default EmployeeController;
