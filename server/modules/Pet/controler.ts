import { inject, injectable, id } from "inversify";
import { Types } from "../../ioc/types"
import { PetService } from './service';
import "reflect-metadata";

@injectable()
export class PetController {
    private _serv: PetService;
    constructor(
        @inject(Types.PetService) petServ: PetService
    ) {
        this._serv = petServ;
    }

    public async createPet(req: any, res: any, next: any) {
        return await this._serv.createPet(req.body);
    }

    public async addBid(req: any, res: any, next: any) {
        return await this._serv.addBid(req.body);
    }
    public async openAuction(req: any, res: any, next: any) {
        return await this._serv.openAuction(req.params.petId, req.body.exDate);
    }

    public async getAll() {
        return await this._serv.getAll();
    }

    public async getBidWinnner(req: any, res: any, next: any) {
        return await this._serv.getBidWinnner(req.params.petId);
    }

}
