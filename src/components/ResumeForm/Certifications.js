import React from "react";
import { TextField, Typography, Box, Button, IconButton } from "@mui/material";
import { Field, FieldArray, useFormikContext } from "formik";
import DeleteIcon from "@mui/icons-material/Delete";

function Certifications() {
  const { values } = useFormikContext();

  return (
    <Box mb={3}>
      <Typography variant="h6" gutterBottom>
        자격증
      </Typography>
      <FieldArray name="certifications">
        {({ push, remove }) => (
          <div>
            {values.certifications && values.certifications.length > 0
              ? values.certifications.map((certification, index) => (
                  <Box key={certification.id || index} mb={2}>
                    <Field
                      name={`certifications.${index}.name`}
                      as={TextField}
                      fullWidth
                      label="자격증명"
                      variant="outlined"
                    />
                    <Box mt={2}>
                      <Field
                        name={`certifications.${index}.issuedBy`}
                        as={TextField}
                        fullWidth
                        label="발급 기관"
                        variant="outlined"
                      />
                    </Box>
                    <Box mt={2}>
                      <Field
                        name={`certifications.${index}.issuedDate`}
                        as={TextField}
                        fullWidth
                        label="발급일"
                        variant="outlined"
                        type="month"
                        InputLabelProps={{
                          shrink: true,
                        }}
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
                  issuedBy: "",
                  issuedDate: "",
                })
              }
            >
              자격증 추가
            </Button>
          </div>
        )}
      </FieldArray>
    </Box>
  );
}

export default Certifications;
