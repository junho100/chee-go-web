import React from "react";
import { Box, Button, ButtonGroup } from "@mui/material";

const StepNavigation = ({
  activeStep,
  handleNext,
  handleBack,
  stepsLength,
  canProceed = true,
  customButtons = null,
}) => {
  return (
    <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
      {customButtons}
      <ButtonGroup fullWidth>
        <Button
          variant="outlined"
          onClick={handleBack}
          disabled={activeStep === 0}
          sx={{ flex: 1 }}
        >
          이전
        </Button>
        <Button
          variant="contained"
          onClick={handleNext}
          disabled={!canProceed || activeStep === stepsLength - 1}
          sx={{ flex: 1 }}
        >
          {activeStep === stepsLength - 1 ? "완료" : "다음"}
        </Button>
      </ButtonGroup>
    </Box>
  );
};

export default StepNavigation;
