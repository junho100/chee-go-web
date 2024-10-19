import React from "react";
import { TextField, Typography, Box, Button, IconButton } from "@mui/material";
import { Field, FieldArray, useFormikContext } from "formik";
import DeleteIcon from "@mui/icons-material/Delete";

function Activities() {
  const { values } = useFormikContext();

  return (
    <Box mb={3}>
      <Typography variant="h6" gutterBottom>
        활동 및 수상
      </Typography>
      <FieldArray name="activities">
        {({ push, remove }) => (
          <div>
            {values.activities && values.activities.length > 0
              ? values.activities.map((activity, index) => (
                  <Box key={activity.id || index} mb={2}>
                    <Field
                      name={`activities.${index}.name`}
                      as={TextField}
                      fullWidth
                      label="활동명"
                      variant="outlined"
                    />
                    <Box mt={2}>
                      <Field
                        name={`activities.${index}.startDate`}
                        as={TextField}
                        fullWidth
                        label="시작 날짜"
                        variant="outlined"
                        type="month"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Box>
                    <Box mt={2}>
                      <Field
                        name={`activities.${index}.endDate`}
                        as={TextField}
                        fullWidth
                        label="종료 날짜"
                        variant="outlined"
                        type="month"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Box>
                    <Box mt={2}>
                      <Field
                        name={`activities.${index}.content`}
                        as={TextField}
                        fullWidth
                        multiline
                        minRows={3}
                        maxRows={20}
                        label="세부 내용"
                        variant="outlined"
                      />
                    </Box>
                    <IconButton onClick={() => remove(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                ))
              : null}
            <Button
              type="button"
              variant="outlined"
              onClick={() =>
                push({
                  name: "",
                  startDate: "",
                  endDate: "",
                  content: "",
                })
              }
            >
              활동 추가
            </Button>
          </div>
        )}
      </FieldArray>
    </Box>
  );
}

export default Activities;
