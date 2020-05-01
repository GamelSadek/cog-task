import express = require('express');
const router = express.Router();

import { container } from "../../ioc/container";
import { Types } from "../../ioc/types"
import { UserController } from './userControler';
import "reflect-metadata";

const controller = container.get<UserController>(Types.UserController);

router.get('', async (req: any, res: any, next: any) => {
    try {
        res.status(200).json(await controller.getAll());
    } catch (error) {
        next(error);
    }
});

router.post('', async (req: any, res: any, next: any) => {
    try {
        res.status(200).json(await controller.createUser(req, res, next));
    } catch (error) {
        next(error);
    }
});

router.post('/bids', async (req: any, res: any, next: any) => {
    try {
        res.status(200).json(await controller.listBids(req, res, next));
    } catch (error) {
        next(error);
    }
});
export default router;