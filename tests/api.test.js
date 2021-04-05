const mongoose = require("mongoose");
// const secret = require("../secrets.json");
const faker = require("faker");
const axios = require("axios");

// local env
// axios.defaults.baseURL = "http://localhost:3030";

axios.defaults.baseURL = "https://simple-user-api.vercel.app";

describe("Api Test for the Backend", () => {
  let newUser;
  // beforeEach(async () => {
  //   await resetDb();
  //   newUser = await populateCollections();
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
        expect(data.users.length).toBeGreaterThan(0);
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
          email: faker.internet.email() + ".ru",
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
          const { status, data } = await axios.get(`/api/users/${newUser._id}`);
          expect(status).toEqual(200);
          expect(data.user._id).toEqual(newUser._id);
          expect(data.user.email).toEqual(newUser.email);
          expect(data.user.givenName).toEqual(newUser.givenName);
          expect(data.user.familyName).toEqual(newUser.familyName);
        });

        it("GET: A Single non-existent User - Expect status 200", async () => {
          const randomId = mongoose.Types.ObjectId();
          const { status, data } = await axios.get(`/api/users/${randomId}`);
          expect(status).toEqual(200);
          expect(data.user).toEqual({});
        });

        it("GET: A Single invalid User - Expect status 400", async () => {
          try {
            const { status, data } = await axios.get(`/api/users/not-a-user`);
            expect(status).toEqual(400);
          } catch ({ response }) {
            expect(response.status).toEqual(400);
            expect(response.data.msg).toEqual(
              "Please Enter a valid input for '_id', 'not-a-user' is not a valid input"
            );
          }
        });

        it("PATCH: Update data on a single User, with a valid input - Expect status 200", async () => {
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

        it("PATCH: Update data on a single User, with a valid input - Expect status 200", async () => {
          const payload = {
            email: faker.internet.email() + ".ru.io",
            givenName: "",
            familyName: "",
          };

          const { status, data } = await axios.patch(`/api/users/${newUser._id}`, payload);
          expect(status).toEqual(200);
          expect(data.email).toEqual(payload.email);
          expect(data.givenName).toEqual("");
          expect(data.familyName).toEqual("");
        });

        it("PATCH: Update data on a non-existent User - Expect status 404", async () => {
          const payload = {
            email: faker.internet.email(),
            givenName: faker.name.firstName(),
            familyName: faker.name.lastName(),
          };

          const randomId = mongoose.Types.ObjectId();
          try {
            const { status, data } = await axios.patch(`/api/users/${randomId}`, payload);
            expect(status).toEqual(404);
          } catch ({ response }) {
            expect(response.status).toEqual(404);
            expect(response.data.msg).toEqual("User Doesn't exist");
          }
        });

        it("PATCH: Update data on a invalid User - Expect status 400", async () => {
          const payload = {
            email: faker.internet.email(),
            givenName: faker.name.firstName(),
            familyName: faker.name.lastName(),
          };

          try {
            const { status, data } = await axios.patch(`/api/users/not-a-user`, payload);
            expect(status).toEqual(400);
          } catch ({ response }) {
            expect(response.status).toEqual(400);
            expect(response.data.msg).toEqual(
              "Please Enter a valid input for '_id', 'not-a-user' is not a valid input"
            );
          }
        });

        it("PATCH: Update data on a single User, with an empty payload - Expect status 400", async () => {
          const payload = {};

          try {
            const { status, data } = await axios.patch(`/api/users/${newUser._id}`, payload);
            expect(status).toEqual(400);
          } catch ({ response }) {
            expect(response.status).toEqual(400);
            expect(response.data.msg).toEqual("You have not submitted any data");
          }
        });

        it("PATCH: Update data on a single User, with a payload contain an empty email field - Expect status 400", async () => {
          const payload = { email: "" };

          try {
            const { status, data } = await axios.patch(`/api/users/${newUser._id}`, payload);
            expect(status).toEqual(400);
          } catch ({ response }) {
            expect(response.status).toEqual(400);
            expect(response.data.msg).toEqual("Please enter a email");
          }
        });

        it("PATCH: Update data on a single User, with a payload contain an invalid email - Expect status 400", async () => {
          const payload = { email: "Hello World" };

          try {
            const { status, data } = await axios.patch(`/api/users/${newUser._id}`, payload);
            expect(status).toEqual(400);
          } catch ({ response }) {
            expect(response.status).toEqual(400);
            expect(response.data.msg).toEqual("Please enter a valid email");
          }
        });

        it("PATCH: Update data on a single User, with a payload contain an invalid email - Expect status 400", async () => {
          const payload = { email: "HelloWorld1@HelloWorld" };

          try {
            const { status, data } = await axios.patch(`/api/users/${newUser._id}`, payload);
            expect(status).toEqual(400);
          } catch ({ response }) {
            expect(response.status).toEqual(400);
            expect(response.data.msg).toEqual("Please enter a valid email");
          }
        });

        it("DELETE: Single User - Expect status 204", async () => {
          const { status, data } = await axios.delete(`/api/users/${newUser._id}`);
          expect(status).toEqual(204);
        });

        it("DELETE: A Single Invalid User - Expect status 400", async () => {
          try {
            const { status, data } = await axios.delete(`/api/users/not-a-user`);
            expect(status).toEqual(400);
          } catch ({ response }) {
            expect(response.status).toEqual(400);
            expect(response.data.msg).toEqual(
              "Please Enter a valid input for '_id', 'not-a-user' is not a valid input"
            );
          }
        });

        it("DELETE: A Single Non-existent User - Expect status 404", async () => {
          const randomId = mongoose.Types.ObjectId();
          try {
            const { status, data } = await axios.delete(`/api/users/${randomId}`);
            expect(status).toEqual(404);
          } catch ({ response }) {
            expect(response.status).toEqual(404);
            expect(response.data.msg).toEqual("User Doesn't exist");
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
//   await mongoose.connect(secret.uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
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
//   const payload = {
//     email: faker.internet.email(),
//     givenName: faker.name.firstName(),
//     familyName: faker.name.lastName(),
//   };

//   const { status, data } = await axios.post(`/api/users`, payload);
//   return data.user;
// }
