import { registerEnumType } from "@nestjs/graphql";

export enum EnumTutorCourses {
  Math = "Math",
  English = "English",
  Science = "Science",
  Other = "Other",
}

registerEnumType(EnumTutorCourses, {
  name: "EnumTutorCourses",
});
