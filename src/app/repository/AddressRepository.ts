import { plainToClass } from "class-transformer";
import { request } from "http";
import { getConnection, ObjectLiteral } from "typeorm";
import { EmployeeAddress } from "../entities/EmployeeAddress";

export class AddressRepository{
    getAllAddresses() {
        const addrRepo = getConnection().getRepository(EmployeeAddress);
        return addrRepo.find();
    }

    getAddressOfEmp(id: string) {
        const addrRepo = getConnection().getRepository(EmployeeAddress);
        return addrRepo.findOne({
            where: {
                id: id
        } });
    }

    createAddress(addressData: ObjectLiteral) {
        const empAddrRepo = getConnection().getRepository(EmployeeAddress);
        console.log(addressData)
        return empAddrRepo.create(plainToClass(EmployeeAddress, {
            city: addressData.city,
            state: addressData.state,
            zip: addressData.zip
        })).save();
    }

    async updateAddress(addressData: ObjectLiteral) {
        const empAddrRepo = getConnection().getRepository(EmployeeAddress);
       return await empAddrRepo.update(addressData.id, addressData);
    }

    async deleteAddress(id: string) {
        const empAddrRepo = getConnection().getRepository(EmployeeAddress);
        return empAddrRepo.softDelete(id);
    }
}