import { ArgsType, Field } from "@nestjs/graphql";
import { TutorWhereUniqueInput } from "./TutorWhereUniqueInput";
import { TutorUpdateInput } from "./TutorUpdateInput";

@ArgsType()
class UpdateTutorArgs {
  @Field(() => TutorWhereUniqueInput, { nullable: false })
  where!: TutorWhereUniqueInput;
  @Field(() => TutorUpdateInput, { nullable: false })
  data!: TutorUpdateInput;
}

export { UpdateTutorArgs };
