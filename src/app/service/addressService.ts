import { ObjectLiteral } from "typeorm";
import EntityNotFoundException from "../exception/EntityNotFoundException";
import { AddressRepository } from "../repository/AddressRepository";
import { EmployeeRespository } from "../repository/EmployeeRepository";

export class AddressService{
    constructor(private addressRepo: AddressRepository){}
    async getAllAddresses(){
        return await this.addressRepo.getAllAddresses();
    }
    async getAddressOfEmp(id: string) {
        const emp = await this.addressRepo.getAddressOfEmp(id);
        return emp;
    }
    createAddress(addressData: ObjectLiteral) {
        return this.addressRepo.createAddress(addressData);
    }

    updateAddress(addressData: ObjectLiteral) {
        return this.addressRepo.updateAddress(addressData);
    }

    deleteAddress(id: string) {
        return this.addressRepo.deleteAddress(id);
    }
}
