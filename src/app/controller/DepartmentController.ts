import { AbstractController } from "../util/rest/controller";
import { NextFunction, Response } from "express";
import RequestWithUser from "../util/rest/request";
import APP_CONSTANTS from "../constants";
import validationMiddleware from "../middleware/validationMiddleware";
import authorize from "../middleware/authorizeMiddleware";
import { DepartmentService } from "../service/departmentService";
import { CreateDepartmentDto } from "../dto/CreateDepartment";
import { Users } from ".";

class DepartmentController extends AbstractController {
  constructor(private departmentService: DepartmentService) {
    super(`${APP_CONSTANTS.apiPrefix}/department`);
    this.initializeRoutes();
  }
  protected initializeRoutes() {
    // this.router.get(`${this.path}`, this.getAllDepartments);
    this.router.get(`${this.path}`, authorize(["admin"]), this.getAllDepartments);
    this.router.post(`${this.path}`, validationMiddleware(CreateDepartmentDto, APP_CONSTANTS.body), this.createDepartment);
    // this.router.get(`${this.path}/:id`, this.getDepartmentById);
    this.router.delete(`${this.path}/:id/`, authorize([Users.ADMIN, Users.HR]), this.deleteDepartment);
    this.router.put(`${this.path}`, this.updateDepartment);
  }
  private getAllDepartments = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      response.status(200);
      response.send(await this.departmentService.getAllDepartments());
    } catch (error) {
      return next(error);
    }
  }


  private createDepartment = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      // const data: any = { message: "Department created"};
      response.status(200);
      response.send(await this.departmentService.createDepartment(request.body));
    } catch (error) {
      return next(error);
    }
  }

  private updateDepartment = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      response.status(200);
      response.send(await this.departmentService.updateDepartment(request.body));
    } catch (error) {
      return next(error);
    }
  }

  private deleteDepartment = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      response.status(200);
      response.send(await this.departmentService.deleteDepartment(request.params.id));
    } catch (error) {
      return next(error);
    }
  }
  
}


export default DepartmentController;