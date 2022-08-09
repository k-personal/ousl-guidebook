const router = require("express").Router();
const Subject = require("../models/Subject");

router.post("/create", async (req, res) => {
  try {
    const { code, description, totCreditsReq, passed, eligible, registered } =
      req.body;

    const l3Creds = req.body.creditsReqL3 ? req.body.creditsReqL3 : 0;
    const l4Creds = req.body.creditsReqL4 ? req.body.creditsReqL4 : 0;
    const l5Creds = req.body.CreditsReqL5 ? req.body.creditsReqL5 : 0;
    const l6Creds = req.body.creditsReqL6 ? req.body.creditsReqL6 : 0;

    let subjectData = {
      code: code,
      description: description,
      creditsReqL3: l3Creds,
      creditsReqL4: l4Creds,
      creditsReqL5: l5Creds,
      creditsReqL6: l6Creds,
      totCreditsReq: totCreditsReq,
      passed: passed,
      eligible: eligible,
      registered: registered,
    };

    let subject = new Subject(subjectData);
    await subject.save();

    res.json(subject);
  } catch (err) {
    res.json(err);
    console.log(err);
  }
});

router.get("/", async (req, res) => {
  let l3Tot = 0;
  let l4Tot = 0;
  let l5Tot = 0;
  let l6Tot = 0;
  let tot = 0;

  if (req.body.passedList && req.body.passedList.length > 0) {
    req.body.passedList.map((subject) => {
      //   console.log(parseInt(subject.charAt(3)));
      if (parseInt(subject.charAt(3)) == 3) {
        l3Tot = l3Tot + parseInt(subject.charAt(4));
      } else if (parseInt(subject.charAt(3)) == 4) {
        l4Tot = l4Tot + parseInt(subject.charAt(4));
      }

      tot = tot + parseInt(subject.charAt(4));
    });
  }
  console.log("tot : ", tot);
  console.log("l3 tot : ", l3Tot);
  console.log("l4 tot : ", l4Tot);

  let qualifiedList = await Subject.find({
    totCreditsReq: { $lte: tot },
    creditsReqL3: { $lte: l3Tot },
    creditsReqL4: { $lte: l4Tot },
  });
  res.json(qualifiedList);
});

router.get("/:id", async (req, res) => {
  try {
    let subject = await Subject.find({ code: req.params.id });
    res.status(200).json(subject);
  } catch (err) {
    res.status(404).json("no product found");
  }
});

module.exports = router;
