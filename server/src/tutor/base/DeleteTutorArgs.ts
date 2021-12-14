import { ArgsType, Field } from "@nestjs/graphql";
import { TutorWhereUniqueInput } from "./TutorWhereUniqueInput";

@ArgsType()
class DeleteTutorArgs {
  @Field(() => TutorWhereUniqueInput, { nullable: false })
  where!: TutorWhereUniqueInput;
}

export { DeleteTutorArgs };
