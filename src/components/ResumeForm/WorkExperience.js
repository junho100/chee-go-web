import React from "react";
import { TextField, Typography, Box, Button, IconButton } from "@mui/material";
import { Field, FieldArray, useFormikContext } from "formik";
import DeleteIcon from "@mui/icons-material/Delete";

function WorkExperience() {
  const { values } = useFormikContext();

  return (
    <Box mb={3}>
      <Typography variant="h6" gutterBottom>
        경력 사항
      </Typography>
      <FieldArray name="workExperiences">
        {({ push, remove }) => (
          <div>
            {values.workExperiences && values.workExperiences.length > 0
              ? values.workExperiences.map((experience, index) => (
                  <Box
                    key={experience.id || index}
                    mb={2}
                    p={2}
                    border={1}
                    borderColor="grey.300"
                    borderRadius={1}
                  >
                    <Field
                      name={`workExperiences.${index}.companyName`}
                      as={TextField}
                      fullWidth
                      label="회사명"
                      variant="outlined"
                    />
                    <Box mt={2}>
                      <Field
                        name={`workExperiences.${index}.department`}
                        as={TextField}
                        fullWidth
                        label="부서"
                        variant="outlined"
                      />
                    </Box>
                    <Box mt={2}>
                      <Field
                        name={`workExperiences.${index}.position`}
                        as={TextField}
                        fullWidth
                        label="직책"
                        variant="outlined"
                      />
                    </Box>
                    <Box mt={2}>
                      <Field
                        name={`workExperiences.${index}.job`}
                        as={TextField}
                        fullWidth
                        label="직무"
                        variant="outlined"
                      />
                    </Box>
                    <Box mt={2}>
                      <Field
                        name={`workExperiences.${index}.startDate`}
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
                        name={`workExperiences.${index}.endDate`}
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
                    <Typography variant="subtitle1" mt={2}>
                      업무 상세
                    </Typography>
                    <FieldArray
                      name={`workExperiences.${index}.workExperienceDetails`}
                    >
                      {({ push: pushDetail, remove: removeDetail }) => (
                        <div>
                          {experience.workExperienceDetails.map(
                            (detail, detailIndex) => (
                              <Box
                                key={detail.id || detailIndex}
                                mt={2}
                                p={2}
                                border={1}
                                borderColor="grey.200"
                                borderRadius={1}
                              >
                                <Field
                                  name={`workExperiences.${index}.workExperienceDetails.${detailIndex}.name`}
                                  as={TextField}
                                  fullWidth
                                  label="업무명"
                                  variant="outlined"
                                />
                                <Box mt={2}>
                                  <Field
                                    name={`workExperiences.${index}.workExperienceDetails.${detailIndex}.startDate`}
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
                                    name={`workExperiences.${index}.workExperienceDetails.${detailIndex}.endDate`}
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
                                    name={`workExperiences.${index}.workExperienceDetails.${detailIndex}.content`}
                                    as={TextField}
                                    fullWidth
                                    multiline
                                    minRows={3}
                                    maxRows={20}
                                    label="업무 내용"
                                    variant="outlined"
                                  />
                                </Box>
                                <IconButton
                                  onClick={() => removeDetail(detailIndex)}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </Box>
                            )
                          )}
                          <Button
                            type="button"
                            variant="outlined"
                            onClick={() =>
                              pushDetail({
                                name: "",
                                startDate: "",
                                endDate: "",
                                content: "",
                              })
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
                ))
              : null}
            <Button
              type="button"
              variant="outlined"
              onClick={() =>
                push({
                  companyName: "",
                  department: "",
                  position: "",
                  job: "",
                  startDate: "",
                  endDate: "",
                  workExperienceDetails: [
                    { name: "", startDate: "", endDate: "", content: "" },
                  ],
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
