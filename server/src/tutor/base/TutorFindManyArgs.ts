import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { TutorWhereInput } from "./TutorWhereInput";
import { Type } from "class-transformer";
import { TutorOrderByInput } from "./TutorOrderByInput";

@ArgsType()
class TutorFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => TutorWhereInput,
  })
  @Field(() => TutorWhereInput, { nullable: true })
  @Type(() => TutorWhereInput)
  where?: TutorWhereInput;

  @ApiProperty({
    required: false,
    type: TutorOrderByInput,
  })
  @Field(() => TutorOrderByInput, { nullable: true })
  @Type(() => TutorOrderByInput)
  orderBy?: TutorOrderByInput;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  skip?: number;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  take?: number;
}

export { TutorFindManyArgs };
