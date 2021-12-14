import { TutorWhereInput } from "./TutorWhereInput";
import { TutorOrderByInput } from "./TutorOrderByInput";

export type TutorFindManyArgs = {
  where?: TutorWhereInput;
  orderBy?: TutorOrderByInput;
  skip?: number;
  take?: number;
};
