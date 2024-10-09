import React from "react";
import { TextField, Typography, Box, Button, IconButton } from "@mui/material";
import { Field, FieldArray } from "formik";
import DeleteIcon from "@mui/icons-material/Delete";

function Activities() {
  return (
    <Box mb={3}>
      <Typography variant="h6" gutterBottom>
        활동 및 수상
      </Typography>
      <FieldArray name="activities">
        {({ push, remove, form }) => (
          <div>
            {form.values.activities.map((_, index) => (
              <Box key={index} mb={2}>
                <Field
                  name={`activities.${index}.name`}
                  as={TextField}
                  fullWidth
                  label="활동명"
                  variant="outlined"
                />
                <Box mt={2}>
                  <Field
                    name={`activities.${index}.period`}
                    as={TextField}
                    fullWidth
                    label="기간"
                    variant="outlined"
                  />
                </Box>
                <Box mt={2}>
                  <Field
                    name={`activities.${index}.details`}
                    as={TextField}
                    fullWidth
                    multiline
                    rows={4}
                    label="세부 내용"
                    variant="outlined"
                  />
                </Box>
                <IconButton onClick={() => remove(index)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
            <Button
              type="button"
              variant="outlined"
              onClick={() => push({ name: "", period: "", details: "" })}
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
