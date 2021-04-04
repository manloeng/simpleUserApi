const mongoose = require("mongoose");
const axios = require("axios");
axios.defaults.baseURL = "http://localhost:3030";
// axios.defaults.baseURL = "127.0. 0.0";

// async function resetDb() {
//   await mongoose.connect(process.env.uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });

//   await dropCollections();
// }

// async function dropCollections() {
//   const collections = ["users"];

//   const currentCollections = await mongoose.connection.db.listCollections().toArray();

//   const collectionNames = currentCollections.map((collection) => collection.name);

//   collections.forEach(async (collection) => {
//     if (collectionNames.includes(collection)) {
//       await mongoose.connection.db.dropCollection(collection);
//     }
//   });
// }

// async function populateCollections() {
//   const user = await axios.post(`/api/users`, { email: "test@test.com" });
//   console.log(user, "user");
// }
console.log("running Tests");

describe("Api Test for the Backend", () => {
  // beforeEach(async () => {
  //   await resetDb();
  //   await populateCollections();
  // });
  // afterEach(() => mongoose.connection.close());

  describe("Api Test For Base Route", () => {
    it("GET: Base Route - Expect status 404", async () => {
      try {
        const { status, data } = await axios.get(`/api`);
        expect(status).toEqual(404);
      } catch ({ response }) {
        expect(response.status).toEqual(404);
        expect(response.data.msg).toEqual("Route Not Found");
      }
    });

    describe("/Users Route", () => {
      it("INVALID METHOD status:405", async () => {
        const requests = ["put", "patch", "delete"];
        requests.forEach(async (request) => {
          try {
            const { status, data } = await axios[request]("/api/users");
            expect(status).toEqual(405);
          } catch ({ response }) {
            expect(response.status).toEqual(405);
          }
        });
      });

      describe("/Users/:id Routes", () => {
        it("INVALID METHOD status:405", async () => {
          const requests = ["put"];
          requests.forEach(async (request) => {
            try {
              const { status, data } = await axios[request]("/api/users/:id");
              expect(status).toEqual(405);
            } catch ({ response }) {
              expect(response.status).toEqual(405);
            }
          });
        });
      });
    });
  });
});
