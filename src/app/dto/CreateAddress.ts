import { IsNumber, IsString } from "class-validator";

export class createAddressDto {
    @IsString({})
    public city: string;

    @IsString({})
    public state: string;

    @IsString({})
    public zip: string;

}