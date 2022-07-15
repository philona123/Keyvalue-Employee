import { Type } from "class-transformer";
import { IsNumber, IsString, ValidateIf, ValidateNested } from "class-validator";
import { type } from "os";
import { createAddressDto } from "./CreateAddress";

export class CreateEmployeeDto {
    @IsString()
    public name: string;

    // @IsString()
    // public username: string;

    // @IsNumber()
    // public age: number;

    @IsString()
    public departmentId: string;

    @IsString()
    public password: string;

    @IsString()
    public role: string;

    // @IsString()
    // public city: string;

    // @IsString()
    // public state: string;

    // @IsString()
    // public zip: string;

    // @ValidateIf(o => o.address.id === undefined)
    @ValidateNested({ each: true })
    @Type(() => createAddressDto)
    public address: createAddressDto;

}