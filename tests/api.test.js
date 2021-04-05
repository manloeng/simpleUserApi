const mongoose = require("mongoose");
const axios = require("axios");
axios.defaults.baseURL = "http://localhost:3030";

describe("Api Test for the Backend", () => {
  // beforeEach(async () => {
  //   await resetDb();
  //   await populateCollections();
  // });
  // afterAll(async () => {
  //   mongoose.connection.close();
  // });

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
      it.only("GET: All Users - Expect status 200", async () => {
        try {
          const { status, data } = await axios.get(`/api/users`);
          expect(status).toEqual(200);
          expect(data.users.length).toBeGreaterThan(1);
        } catch (err) {
          console.log(err);
        }
      });

      it("POST: Create a single User - Expect status 200", async () => {
        try {
          const payload = { email: "newEmail1@test.com" };
          const { status, data } = await axios.post(`/api/users`, payload);
          expect(status).toEqual(201);
          expect(data.users.length).toEqual(2);
        } catch (err) {
          console.log(err);
        }
      });

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
        it("GET: Single User - Expect status 200", async () => {
          console.log(firstUser._id, "first");
          try {
            const { data } = await axios.get(`/api/users`);
            const firstUser = data.users[0];

            const getUserResponse = await axios.get(`/api/users/${firstUser._id}`);
            expect(getUserResponse.status).toEqual(200);
            expect(getUserResponse.data.user._id).toEqual(firstUser._id);
            expect(getUserResponse.data.user.email).toEqual("test@test.com");
            expect(getUserResponse.data.user.givenName).toEqual("Andrew");
            expect(getUserResponse.data.user.familyName).toEqual("Chung");
          } catch (err) {
            console.log(err, "err");
          }
        });

        it("PATCH: Update data on a single User - Expect status 200", async () => {
          try {
            const { data } = await axios.get(`/api/users`);
            const firstUser = data.users[0];

            const payload = { email: "updatedEmail@test.com", givenName: "Sam", familyName: "Jackson" };
            const updateResponse = await axios.patch(`/api/users/${firstUser._id}`, payload);
            expect(updateResponse.status).toEqual(200);
            expect(updateResponse.data.user.email).toEqual("updatedEmail@test.com");
            expect(updateResponse.data.user.givenName).toEqual("Sam");
            expect(updateResponse.data.user.familyName).toEqual("Jackson");
          } catch (err) {
            console.log(err);
          }
        });

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

// async function resetDb() {
//   await connectToDB();
//   await dropCollections();
// }

// async function connectToDB() {
//   await mongoose.connect(
//     process.env.uri,
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     }
//   );
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
//   await axios.post(`/api/users`, { email: "test@test.com", givenName: "Andrew", familyName: "Chung" });
// }
