import express = require('express');
import dotEnv = require('dotenv');
import { connection } from './database/util';
import petModel from "./modules/Pet/model";
import redis = require("redis");
const client = redis.createClient()
const multi = client.multi()

const app: express.Application = express();
dotEnv.config();

app.use(express.json());
connection();


app.listen(3001, () => {
    console.log(`Server listening on PORT: 3001`);
});

(async () => {
    console.log('heeeee');
    while (1) {
        await new Promise(resolve => setTimeout(resolve, 15000));
        console.log('1');
        multi.lrange("queue", 0, -1, async (err, res) => {
            if (res.length <= 0) return;
            for (const task of res) {
                const auction = JSON.parse(task);
                if (new Date(auction.exDate) <= new Date()) {
                    let pet = Object();
                    pet = await petModel.findById(auction.petId);
                    if (pet.auction.bids.length <= 0) pet.auction.winners = ["No Winners"]
                    else {
                        const buffer = [...pet.auction.bids];
                        const bids = buffer.sort((a: any, b: any) => (a.bidAmount < b.bidAmount) ? 1 : ((b.bidAmount < a.bidAmount) ? -1 : 0))
                            .map((obj) => { return { ...obj } });
                        for (let i = 0; i < bids.length - 1; i++) {
                            console.log(`i : ${i}, iA: ${bids[i].bidAmount}, i-1A: ${bids[i + 1].bidAmount}`)
                            bids[i].bidAmount = bids[i + 1].bidAmount;
                        }
                        console.log(bids.length);
                        if (bids.length !== 1) bids[bids.length - 1].bidAmount = 'Lost the auction';
                        pet.auction.winners = bids;
                        pet.status = "sold"
                        console.log(pet.auction.bids);
                        console.log(pet.auction.winners);
                    }
                    multi.lrem("queue", 0, task);
                    console.log(await pet.save());
                }
            }
        }).exec();

    }
})();