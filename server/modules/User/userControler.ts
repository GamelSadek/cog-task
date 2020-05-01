import { inject, injectable, id } from "inversify";
import { Types } from "../../ioc/types"
import { UserService } from './service';
import "reflect-metadata";

@injectable()
export class UserController {
    private _serv: UserService;
    constructor(
        @inject(Types.UserService) userserv: UserService
    ) {
        this._serv = userserv;
    }

    public async createUser(req: any, res: any, next: any) {
        return await this._serv.createUser(req.body);
    }

    public async getAll() {
        return await this._serv.getAll();
    }

    
    public async listBids(req: any, res: any, next: any) {
        return await this._serv.listBids(req.body);
    }
}
