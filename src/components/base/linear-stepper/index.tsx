import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Stepper from '@mui/material/Stepper';
import * as React from 'react';
interface Props {
  steps?: string[];
  handleClick?: (index: number) => void;
  activeStepCurrent?: number;
}

const LinearStepper: React.FC<Props> = ({steps = [], handleClick, activeStepCurrent = 0}) => {
  const [activeStep, setActiveStep] = React.useState(activeStepCurrent);
  // const [completed, setCompleted] = React.useState<{
  //   [k: number]: boolean;
  // }>({});
  React.useEffect(() => {
    setActiveStep(activeStepCurrent);
  }, [activeStepCurrent]);

  const handleStep = (step: number) => () => {
    handleClick && handleClick(step);
    setActiveStep(step);
  };

  return (
    <Box
      sx={{
        width: '100%',
        padding: '10px',
        height: '50%',
        border: '1px solid #e7e7e7',
        // boxShadow:
        //   'rgb(0 0 0 / 20%) 0px 2px 1px -1px, rgb(0 0 0 / 14%) 0px 1px 1px 0px, rgb(0 0 0 / 12%) 0px 1px 3px 0px',
        borderRadius: '4px',
      }}
    >
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step
            key={label}
            //completed={completed[index]}
          >
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default LinearStepper;
