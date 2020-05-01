// import mongoose from 'mongoose';
// import { MongoMemoryServer } from 'mongodb-memory-server';

// import { container } from "../../ioc/container";
// import { Types } from "../../ioc/types"
// import { BannerService } from './service';
// import "reflect-metadata";


// const service = container.get<BannerService>(Types.BannerService);

// let bannerData = {
//     serve: ['now', 'later'],
//     screen: ['home', 'inner'],
//     name_en: 'slad',
//     name_ar: "نيمشسكي",
//     redirection: 'not_redirecting',
//     start_date: "2019-11-05 13:15:30.000Z",
//     end_date: "2020-11-05 13:15:30.000Z",
//     active: true,
//     image_en: "image1",
//     image_ar: "الص1",
// };

// // May require additional time for downloading MongoDB binaries
// jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;

// let mongoServer: any;
// const opts = { useUnifiedTopology: true, useNewUrlParser: true }; // remove this option if you use mongoose 5 and above

// beforeAll(async () => {
//     mongoServer = new MongoMemoryServer();
//     const mongoUri = await mongoServer.getUri();
//     await mongoose.connect(mongoUri, opts, (err) => {
//         if (err) console.error(`error: ${err}`);
//     });
// });

// afterAll(async () => {
//     await mongoose.disconnect();
//     await mongoServer.stop();
// });

// // it('create & save user successfully', async () => {
// //     const validBanner = new BannerModel(bannerData);
// //     const savedBanner = await validBanner.save();
// //     let res: any;
// //     res = savedBanner;
// //     // console.log(`savedBanner: ${res}`);
// //     expect(res.name_en).toEqual(bannerData.name_en);
// // });

// // it('should insert a doc into collection', async () => {
// //     const result = await BannerModel.findById('5e9f25656c478b5a4431c798');
// //     let res: any;
// //     res = result;
// //     console.log(`find banner: ${result}`);
// //     expect(res.name_en).toEqual(bannerData.name_en);
// // });

// it('insert', async () => {
//     const result = await service.createBanner([bannerData]);
//     expect(result[0].name_en).toEqual(bannerData.name_en);
// });

// it('getByID', async () => {
//     const result = await service.getAll();
//     expect(1).toEqual(1);
// });


// it('getByID', async () => {
//     const all = await service.getAll();
//     const result = await service.getBannerById(all[0]._id);
//     let res: any;
//     res = result;
//     expect(res.name_en).toEqual(bannerData.name_en);
// });

// it('active banners', async () => {
//     const result = await service.validBanners('now');
//     let res: any;
//     res = result;
//     console.log(`resulllllllltt ${result}`);
//     expect(res[0].name_en).toEqual(bannerData.name_en);
// });


