import { Tutor as TTutor } from "../api/tutor/Tutor";

export const TUTOR_TITLE_FIELD = "name";

export const TutorTitle = (record: TTutor): string => {
  return record.name || record.id;
};
