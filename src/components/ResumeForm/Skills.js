import React from "react";
import { TextField, Typography, Box, Chip } from "@mui/material";
import { Field, FieldArray } from "formik";

function Skills() {
  return (
    <Box mb={3}>
      <Typography variant="h6" gutterBottom>
        보유 기술 키워드
      </Typography>
      <FieldArray name="skills">
        {({ push, remove, form }) => (
          <div>
            <Field
              name="skillInput"
              as={TextField}
              fullWidth
              label="기술 키워드 입력"
              variant="outlined"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  const value = e.target.value.trim();
                  if (value && !form.values.skills.includes(value)) {
                    push(value);
                    e.target.value = "";
                  }
                }
              }}
            />
            <Box mt={2}>
              {form.values.skills.map((skill, index) => (
                <Chip
                  key={index}
                  label={skill}
                  onDelete={() => remove(index)}
                  style={{ margin: "0 4px 4px 0" }}
                />
              ))}
            </Box>
          </div>
        )}
      </FieldArray>
    </Box>
  );
}

export default Skills;
