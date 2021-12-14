import { ArgsType, Field } from "@nestjs/graphql";
import { TutorWhereUniqueInput } from "./TutorWhereUniqueInput";

@ArgsType()
class TutorFindUniqueArgs {
  @Field(() => TutorWhereUniqueInput, { nullable: false })
  where!: TutorWhereUniqueInput;
}

export { TutorFindUniqueArgs };
