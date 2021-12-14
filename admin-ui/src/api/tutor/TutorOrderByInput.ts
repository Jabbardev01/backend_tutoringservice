import { SortOrder } from "../../util/SortOrder";

export type TutorOrderByInput = {
  courses?: SortOrder;
  createdAt?: SortOrder;
  date?: SortOrder;
  email?: SortOrder;
  id?: SortOrder;
  name?: SortOrder;
  updatedAt?: SortOrder;
};
