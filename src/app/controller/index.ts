/**
 * Wraps Controllers for easy import from other modules
 */
import { DepartmentRespository } from "../repository/DepartmentRepository";
import { EmployeeRespository } from "../repository/EmployeeRepository";
import { AddressService } from "../service/addressService";
import { DepartmentService } from "../service/departmentService";
import { EmployeeService } from "../service/employeeService";
import DepartmentController from "./DepartmentController";
import EmployeeController from "./EmployeeController";
import HealthController from "./HealthController";
import { AddressRepository } from "../repository/AddressRepository";
export default [
  new HealthController(),
  new EmployeeController(new EmployeeService(new EmployeeRespository), new AddressService(new AddressService(new AddressRepository))),
  new DepartmentController(new DepartmentService(new DepartmentRespository())),

];


export const enum Users {
  ADMIN ="admin",
  HR = "hr",
  MANAGER = "manager",
  ENGINEER = "engineer"
}