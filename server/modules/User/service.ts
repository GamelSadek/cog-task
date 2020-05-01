import { inject, injectable } from "inversify";
import { Types } from "../../ioc/types";
import { UserRepository } from "./repo";
import "reflect-metadata";

@injectable()
export class UserService {
    private _repo: UserRepository;
    constructor(
        @inject(Types.UserRepo) userRepo: UserRepository
    ) {
        this._repo = userRepo;
    }

    public createUser(user: any): any {
        console.log('service');
        return this._repo.create(user);
    }

    public async getAll() {
        return await this._repo.getAll();
    }

    public async listBids(body: any) {
        let pet = Object();
        pet = await this._repo.getPet(body.petId);
        if (pet.ownerId != body.ownerId) {
            const err = new Error('you are not authorized !');
            throw err;
        }
        return pet.auction.bids;
    }

}
