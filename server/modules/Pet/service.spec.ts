import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

import { container } from "../../ioc/container";
import { Types } from "../../ioc/types"
import { PetService } from './service';
import { UserService } from '../User/service';

import "reflect-metadata";


const Petservice = container.get<PetService>(Types.PetService);
const Userservice = container.get<UserService>(Types.UserService);

let insertUser = {
    username: "Sadek"
}

let insertPet = {
    name: "Vicky",
    ownerId: "",
    status: "available"
}

let userBid1 = {
    userName: "ma",
    'petId': '',
    bidAmount: 320
};

let userBid2 = {
    userName: "taki",
    'petId': '',
    bidAmount: 500
};
let userBid3 = {
    userName: "roma",
    petId: '',
    bidAmount: 100
};


jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;

let mongoServer: any;
const opts = { useUnifiedTopology: true, useNewUrlParser: true }; // remove this option if you use mongoose 5 and above

beforeAll(async () => {
    mongoServer = new MongoMemoryServer();
    const mongoUri = await mongoServer.getUri();
    await mongoose.connect(mongoUri, opts, (err) => {
        if (err) console.error(`error: ${err}`);
    });
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

it('insert User', async () => {
    const result = await Userservice.createUser(insertUser);
    insertPet.ownerId = result._id;
    expect(result.username).toEqual(insertUser.username);
});

let petId: string;

it('insert Pet', async () => {
    const result = await Petservice.createPet(insertPet);
    expect(result.name).toEqual(insertPet.name);
    expect(result.status).toEqual(insertPet.status);
    petId = result._id;
});


it(' open Auction for Pet', async () => {
    await Petservice.openAuction(petId, "2020-05-29T22:29:30.127Z");
    let pet = Object();
    pet = await Petservice.findyBydId(petId);
    expect(pet.status).toEqual('pending')
});

it('user Bid on Pet', async () => {
    userBid1.petId = petId;
    userBid2.petId = petId;
    userBid3.petId = petId;

    const addBid1 = await Petservice.addBid(userBid1);
    const addBid2 = await Petservice.addBid(userBid2);
    const addBid3 = await Petservice.addBid(userBid3);

    let pet = Object();
    pet = await Petservice.findyBydId(petId);

    console.log(`pet ${pet}`);


    expect(pet.auction.bids[0].bidAmount).toEqual(addBid1.bidAmount);
    expect(pet.auction.bids[0].userName).toEqual(addBid1.userName);

    expect(pet.auction.bids[1].bidAmount).toEqual(addBid2.bidAmount);
    expect(pet.auction.bids[1].userName).toEqual(addBid2.bidAmount);

    expect(pet.auction.bids[2].bidAmount).toEqual(addBid3.bidAmount);
    expect(pet.auction.bids[2].bidAmount).toEqual(addBid3.bidAmount);
});

// it('bid winner', async () => {
//     let petWinner = Object();
//     petWinner = await Petservice.getBidWinnner(petId);

//     expect(petWinner[0].userName).toEqual(userBid2.userName);
//     expect(petWinner[0].bidAmount).toEqual(userBid1.bidAmount);

//     expect(petWinner[1].userName).toEqual(userBid1.userName);
//     expect(petWinner[1].bidAmount).toEqual(userBid3.bidAmount);

//     expect(petWinner[0].userName).toEqual(userBid3.userName);
//     expect(petWinner[0].bidAmount).toEqual('Lost the auction');

// });


