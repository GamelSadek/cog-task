import express = require('express');
const router = express.Router();

import { container } from "../../ioc/container";
import { Types } from "../../ioc/types"
import { PetController } from './controler';
import "reflect-metadata";

const controller = container.get<PetController>(Types.PetController);

router.get('', async () => {
    return await controller.getAll();
});

router.post('', async (req: any, res: any, next: any) => {
    try {
        res.status(200).json(await controller.createPet(req, res, next));
    } catch (error) {
        next(error);
    }
});

router.post('/bid', async (req: any, res: any, next: any) => {
    try {
        res.status(200).json(await controller.addBid(req, res, next));
    } catch (error) {
        next(error);
    }
});

router.post('/openAuction/:petId', async (req: any, res: any, next: any) => {
    try {
        res.status(200).json(await controller.openAuction(req, res, next));
    } catch (error) {
        next(error);
    }

});
router.get('/bid/winner/:petId', async (req: any, res: any, next: any) => {
    try {
        res.status(200).json(await controller.getBidWinnner(req, res, next));
    } catch (error) {
        next(error);
    }

});

export default router;