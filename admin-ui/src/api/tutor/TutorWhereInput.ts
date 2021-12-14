import { DateTimeFilter } from "../../util/DateTimeFilter";
import { StringNullableFilter } from "../../util/StringNullableFilter";
import { StringFilter } from "../../util/StringFilter";

export type TutorWhereInput = {
  date?: DateTimeFilter;
  email?: StringNullableFilter;
  id?: StringFilter;
  name?: StringFilter;
};
