import { inject, injectable } from "inversify";
import { Types } from "../../ioc/types";
import { PetRepository } from "./repo";
import redis = require("redis");
import "reflect-metadata";
const client = redis.createClient()
const multi = client.multi()

@injectable()
export class PetService {
    private _repo: PetRepository;
    constructor(
        @inject(Types.PetRepo) petRepo: PetRepository
    ) {
        this._repo = petRepo;
    }

    public createPet(pet: any): any {
        console.log('service');
        return this._repo.create(pet);
    }


    public async addBid(body: any) {
        let pet = Object();
        pet = await this._repo.findById(body.petId);
        if (pet.status != 'pending') {
            const err = new Error('this Pet already Sold');
            throw err;
        }
        const bidObject = {
            userName: body.userName,
            bidAmount: body.bidAmount
        }
        pet.auction.bids.push(bidObject);
        return await pet.save();
    }

    public async openAuction(petId: any, exDate: any) {
        multi.rpush("queue", JSON.stringify({ petId: petId, exDate: exDate })).exec();
        let pet = Object();
        pet = await this._repo.findById(petId);

        if (pet.status != 'available') {
            console.log(`pet: ${pet}`);
            const err = new Error('this Pet not available for Auction');
            throw err;
        }
        pet.auction.exDate = exDate;
        pet.status = 'pending';
        return await pet.save();
    }
    public async getAll() {
        return await this._repo.getAll();
    }
    public async getBidWinnner(petId: any) {
        let pet = Object();
        pet = await this._repo.findById(petId);

        if (pet.status != 'sold') {
            const err = new Error('this Pet has no winner yet');
            throw err;
        }
        return await pet.auction.winners;
    }
    public async findyBydId(petId: any) {
        return await this._repo.findById(petId);
    }

}
