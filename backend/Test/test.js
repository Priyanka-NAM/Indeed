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
        done(e);
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
        done(e);
      });
  });
  it("Job Seeker Login UnSucessfull", (done) => {
    agent
      .post("/indeed/users/public/login")
      .send({ email: "test9@gmail.com", password: "165" })
      .then((res) => {
        expect(res.text).equal("Unauthorized");
        done();
      })
      .catch((error) => {
        console.log(error);
        done(e);
      });
  });
  it("Employer Login Sucessfull", (done) => {
    agent
      .post("/indeed/users/public/login")
      .send({ email: "123z@gmail.com", password: "123456" })
      .then((res) => {
        expect(res.body).to.have.property("email", "123z@gmail.com");
        expect(res.body).to.have.property("role", 1);
        done();
      })
      .catch((error) => {
        console.log(error);
        done(e);
      });
  }).timeout(4000);
});

describe(" Get Employer Profile", () => {
  it("Get Employer Profile", (done) => {
    agent
      .get("/indeed/employer/profile")
      .then((res) => {
        expect(res.body).to.equal(0);
        done();
      })
      .catch((error) => {
        console.log(error);
        done(e);
      });
  });
});

describe("Employer Post Jobs", () => {
  it("Job Post Sucessfull", (done) => {
    agent
      .post("/indeed/employer/post-job")
      .send({
        jobTitle: "Engineer",
        employerID: "61a85f42397f6d36470922ab",
        companyName: "Hp",
        industry: "Software",
        jobLocation: {
          address: "235 Bernado Avenue",
          city: "SanJose",
          state: "CA",
          country: "USA",
          zipcode: "94050",
        },
        jobType: "Software",
        isRemote: "0",
        salary: "120000",
        jobDescription: {
          compensation: "150000",
          requirement: "it is for test",
          moreInfo: "It is test",
          responsibilites:
            "Includes but is not limited to the following. Other duties may be assigned",
        },
      })
      .then((res) => {
        expect(res.body).to.have.property(
          "employerID",
          "61a85f42397f6d36470922ab"
        );
        done();
      })
      .catch((error) => {
        console.log(error);
        done(e);
      });
  });
});
