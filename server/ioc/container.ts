import { Container } from "inversify";
import { UserService } from "../modules/User/service";
import { UserRepository } from "../modules/User/repo";
import { UserController } from "../modules/User/userControler";

import { PetService } from "../modules/Pet/service";
import { PetRepository } from "../modules/Pet/repo";
import { PetController } from "../modules/Pet/controler";

import { Types } from "./types";


export const container = new Container();
container.bind<UserService>(Types.UserService).to(UserService);
container.bind<UserRepository>(Types.UserRepo).to(UserRepository);
container.bind<UserController>(Types.UserController).to(UserController);

container.bind<PetService>(Types.PetService).to(PetService);
container.bind<PetRepository>(Types.PetRepo).to(PetRepository);
container.bind<PetController>(Types.PetController).to(PetController);

