import { useState } from "react";

const STEPS = {
  DATACENTER: 0,
  HUB: 1,
  RACK: 2,
  REVIEW: 3,
};


const [activeStep, setActiveStep] = useState(STEPS.DATACENTER);
