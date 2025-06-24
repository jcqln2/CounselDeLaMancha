const { expect } = require("chai");

describe("CounselDeLaMancha", function () {
  let oracle;

  beforeEach(async function () {
    const CounselDeLaMancha = await ethers.getContractFactory("CounselDeLaMancha");
    oracle = await CounselDeLaMancha.deploy();
    await oracle.deployed();
  });

  it("Should return a valid response", async function () {
    const response = await oracle.askOracle();
    const allResponses = await oracle.getAllResponses();
    expect(allResponses).to.include(response);
  });
});

