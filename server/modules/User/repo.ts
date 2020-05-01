import { injectable } from "inversify";
import Model from "./model";
import "reflect-metadata";
import PetModel from "../Pet/model";


@injectable()
export class UserRepository {
    public async getAll() {
        try {
            const result = await Model.find();
            return result;
        } catch (error) {
            throw error
        }
    }
    public async create(user: any) {
        try {
            console.log('repo');
            const result = await Model.create(user);
            return result;
        } catch (error) {
            throw error
        }
    }
    public async getPet(petId: any) {
        try {
            const result = await PetModel.findById(petId);
            return result;
        } catch (error) {
            throw error
        }
    }
}


