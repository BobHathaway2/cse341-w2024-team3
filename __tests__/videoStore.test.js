const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../server.js");

require("dotenv").config();

describe("Test all client get endpoints", () => {

/* Connecting to the database before each test. */
    beforeEach(async () => {
        await mongoose.connect(process.env.MONGODB_URL);
    });
    
    /* Closing database connection after each test. */
    afterEach(async () => {
        await mongoose.connection.close();
    });
    

    it("should return all clients", async () => {
        const res = await request(app).get("/client");
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThan(3);
        expect(res.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
          LastName: 'Bray'
          })
        ])
        )
      });

      it("should return single client", async () => {
        const res = await request(app).get("/client/65c35559f76457be4307c2bc");
        expect(res.statusCode).toBe(200);
        expect(res.body.LastName).toEqual("Bray");
      });



  });

  describe("Test all employee get endpoints", () => {

    /* Connecting to the database before each test. */
        beforeEach(async () => {
            await mongoose.connect(process.env.MONGODB_URL);
        });
        
        /* Closing database connection after each test. */
        afterEach(async () => {
            await mongoose.connection.close();
        });
        
          it("should return all employees", async () => {
            const res = await request(app).get("/employee");
            expect(res.statusCode).toBe(200);
            expect(res.body.length).toBeGreaterThan(3);
            expect(res.body).toEqual(
            expect.arrayContaining([
              expect.objectContaining({
              LastName: 'Bray'
              })
            ])
            )
          });
    
          it("should return single employee", async () => {
            const res = await request(app).get("/employee/65c353abf76457be4307c2ba");
            expect(res.statusCode).toBe(200);
            expect(res.body.LastName).toEqual("Van Tonder");
          });
    
    
      });