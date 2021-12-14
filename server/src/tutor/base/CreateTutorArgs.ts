import { ArgsType, Field } from "@nestjs/graphql";
import { TutorCreateInput } from "./TutorCreateInput";

@ArgsType()
class CreateTutorArgs {
  @Field(() => TutorCreateInput, { nullable: false })
  data!: TutorCreateInput;
}

export { CreateTutorArgs };
