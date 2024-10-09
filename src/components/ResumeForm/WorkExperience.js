import React from "react";
import { TextField, Typography, Box, Button, IconButton } from "@mui/material";
import { Field, FieldArray } from "formik";
import DeleteIcon from "@mui/icons-material/Delete";

function WorkExperience() {
  return (
    <Box mb={3}>
      <Typography variant="h6" gutterBottom>
        경력 사항
      </Typography>
      <FieldArray name="workExperience">
        {({ push, remove, form }) => (
          <div>
            {form.values.workExperience.map((_, index) => (
              <Box
                key={index}
                mb={2}
                p={2}
                border={1}
                borderColor="grey.300"
                borderRadius={1}
              >
                <Field
                  name={`workExperience.${index}.companyName`}
                  as={TextField}
                  fullWidth
                  label="회사명"
                  variant="outlined"
                />
                <Box mt={2}>
                  <Field
                    name={`workExperience.${index}.department`}
                    as={TextField}
                    fullWidth
                    label="부서"
                    variant="outlined"
                  />
                </Box>
                <Box mt={2}>
                  <Field
                    name={`workExperience.${index}.position`}
                    as={TextField}
                    fullWidth
                    label="직책"
                    variant="outlined"
                  />
                </Box>
                <Box mt={2}>
                  <Field
                    name={`workExperience.${index}.jobTitle`}
                    as={TextField}
                    fullWidth
                    label="직무"
                    variant="outlined"
                  />
                </Box>
                <Typography variant="subtitle1" mt={2}>
                  업무
                </Typography>
                <FieldArray name={`workExperience.${index}.tasks`}>
                  {({ push: pushTask, remove: removeTask }) => (
                    <div>
                      {form.values.workExperience[index].tasks.map(
                        (_, taskIndex) => (
                          <Box key={taskIndex} mt={2}>
                            <Field
                              name={`workExperience.${index}.tasks.${taskIndex}.title`}
                              as={TextField}
                              fullWidth
                              label="업무 제목"
                              variant="outlined"
                            />
                            <Box mt={2}>
                              <Field
                                name={`workExperience.${index}.tasks.${taskIndex}.period`}
                                as={TextField}
                                fullWidth
                                label="기간"
                                variant="outlined"
                              />
                            </Box>
                            <Box mt={2}>
                              <Field
                                name={`workExperience.${index}.tasks.${taskIndex}.details`}
                                as={TextField}
                                fullWidth
                                multiline
                                rows={4}
                                label="세부 내용"
                                variant="outlined"
                              />
                            </Box>
                            <IconButton onClick={() => removeTask(taskIndex)}>
                              <DeleteIcon />
                            </IconButton>
                          </Box>
                        )
                      )}
                      <Button
                        type="button"
                        variant="outlined"
                        onClick={() =>
                          pushTask({ title: "", period: "", details: "" })
                        }
                      >
                        업무 추가
                      </Button>
                    </div>
                  )}
                </FieldArray>
                <IconButton onClick={() => remove(index)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
            <Button
              type="button"
              variant="outlined"
              onClick={() =>
                push({
                  companyName: "",
                  department: "",
                  position: "",
                  jobTitle: "",
                  tasks: [{ title: "", period: "", details: "" }],
                })
              }
            >
              경력 사항 추가
            </Button>
          </div>
        )}
      </FieldArray>
    </Box>
  );
}

export default WorkExperience;
