if(process.env.NODE_ENV != "production") {
    require("dotenv").config({ path: "../.env" });
}

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const atlasUrl = process.env.ATLASDB_URL;
console.log(atlasUrl);


main()
    .then(()=> {
        console.log("DataBase Connected Successfully")
    })
    .catch((err)=>{
        console.log(`There is some Error: ${err}`)
    });

async function main() {
    await mongoose.connect(atlasUrl);
};

const initDB =  async ()=> {
    initData.data = initData.data.map((obj)=> ({...obj, owner: "68470a1176daa353d0f19160"}));
    await Listing.insertMany(initData.data);
    console.log("Data Initialized Successfully.");
};

initDB();