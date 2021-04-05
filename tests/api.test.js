const faker = require("faker");
const axios = require("axios");
axios.defaults.baseURL = "http://localhost:3030";

describe("Api Test for the Backend", () => {
  let newUser;
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
      it("GET: All Users - Expect status 200", async () => {
        const { status, data } = await axios.get(`/api/users`);
        expect(status).toEqual(200);
        expect(data.users.length).toBeGreaterThan(1);
      });

      it("POST: Create a single User, when passed with a valid payload - Expect status 200", async () => {
        const payload = {
          email: faker.internet.email(),
          givenName: faker.name.firstName(),
          familyName: faker.name.lastName(),
        };

        const { status, data } = await axios.post(`/api/users`, payload);

        expect(status).toEqual(201);
        expect(data.user.email).toEqual(payload.email);
        expect(data.user.givenName).toEqual(payload.givenName);
        expect(data.user.familyName).toEqual(payload.familyName);

        newUser = data.user;
      });

      it("POST: Create a single User, when passed with a valid payload - Expect status 200", async () => {
        const payload = {
          email: faker.internet.email(),
        };

        const { status, data } = await axios.post(`/api/users`, payload);

        expect(status).toEqual(201);
        expect(data.user.email).toEqual(payload.email);
      });

      it("POST: Create a single User, when passed with an empty payload - Expect status 400", async () => {
        const payload = {};

        try {
          const { status, data } = await axios.post(`/api/users`, payload);
          expect(status).toEqual(400);
        } catch ({ response }) {
          expect(response.status).toEqual(400);
          expect(response.data.msg).toEqual("Please enter a email");
        }
      });

      it("POST: Create a single User, when passed with a payload with an empty email field - Expect status 400", async () => {
        const payload = { email: "" };

        try {
          const { status, data } = await axios.post(`/api/users`, payload);
          expect(status).toEqual(400);
        } catch ({ response }) {
          expect(response.status).toEqual(400);
          expect(response.data.msg).toEqual("Please enter a email");
        }
      });

      it("POST: Create a single User, when passed with a payload with an invalid email value - Expect status 400", async () => {
        const payload = { email: "Hello World" };

        try {
          const { status, data } = await axios.post(`/api/users`, payload);
          expect(status).toEqual(400);
        } catch ({ response }) {
          expect(response.status).toEqual(400);
          expect(response.data.msg).toEqual("Please enter a valid email");
        }
      });

      it("POST: Create a single User, when passed with a payload with an invalid email value - Expect status 400", async () => {
        const payload = { email: "HelloWorld@HellWorld" };

        try {
          const { status, data } = await axios.post(`/api/users`, payload);
          expect(status).toEqual(400);
        } catch ({ response }) {
          expect(response.status).toEqual(400);
          expect(response.data.msg).toEqual("Please enter a valid email");
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
          const getUserResponse = await axios.get(`/api/users/${newUser._id}`);
          expect(getUserResponse.status).toEqual(200);
          expect(getUserResponse.data.user._id).toEqual(newUser._id);
          expect(getUserResponse.data.user.email).toEqual(newUser.email);
          expect(getUserResponse.data.user.givenName).toEqual(newUser.givenName);
          expect(getUserResponse.data.user.familyName).toEqual(newUser.familyName);
        });

        it("PATCH: Update data on a single User - Expect status 200", async () => {
          const payload = {
            email: faker.internet.email(),
            givenName: faker.name.firstName(),
            familyName: faker.name.lastName(),
          };

          const { status, data } = await axios.patch(`/api/users/${newUser._id}`, payload);
          expect(status).toEqual(200);
          expect(data.email).toEqual(payload.email);
          expect(data.givenName).toEqual(payload.givenName);
          expect(data.familyName).toEqual(payload.familyName);
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
