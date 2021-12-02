/* eslint-disable no-undef */
const chai = require("chai");
chai.use(require("chai-http"));
const { expect } = require("chai");
const app = require("../server");

const agent = chai.request.agent(app);

describe("Signin Testing Employer", () => {
  it("Email is Required", (done) => {
    agent
      .post("/indeed/users/public/login")
      .send({ email: "", password: "123456" })
      .then((res) => {
        console.log("res.body", res.text);
        expect(res.text).equal("email is required");
        done();
      })
      .catch((error) => {
        console.log(error);
      });
  });
  it("Password is Required", (done) => {
    agent
      .post("/indeed/users/public/login")
      .send({ email: "test9@gmail.com", password: "" })
      .then((res) => {
        console.log("res.body", res.text);
        expect(res.text).equal("password is required");
        done();
      })
      .catch((error) => {
        console.log(error);
      });
  });
  it("Job Seeker Login Sucessfull", (done) => {
    agent
      .post("/indeed/users/public/login")
      .send({ email: "test9@gmail.com", password: "" })
      .then((res) => {
        expect(res.text).equal("password is required");
        done();
      })
      .catch((error) => {
        console.log(error);
      });
  });
  it("Employer Login Sucessfull", (done) => {
    agent
      .post("/login")
      .send({ email: "teste9@gmail.com", password: "123456" })
      .then((res) => {
        expect(res.body).to.have.deep.property(
          "status",
          "Authentication Successful"
        );
        done();
      })
      .catch((error) => {
        console.log(error);
      });
  });
});
