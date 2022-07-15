import { Type } from "class-transformer";
import { IsNumber, IsString, ValidateNested } from "class-validator";
import { type } from "os";

export class CreateDepartmentDto {
    @IsString()
    public name: string;

    // @IsString()
    // public username: string;

    // @IsNumber()
    // public age: number;


}