import { injectable } from "inversify";
import Model from "./model";
import "reflect-metadata";

@injectable()
export class PetRepository {
    public async getAll() {
        try {
            const result = await Model.find();
            return result;
        } catch (error) {
            throw error
        }
    }
    public async create(pet: any) {
        try {
            const result = await Model.create(pet);
            return result;
        } catch (error) {
            throw error
        }
    }
    public async findById(petId: any) {
        console.log(`petId : ${petId}`);

        try {
            return await Model.findById(petId);
        } catch (error) {
            throw error
        }
    }
}


