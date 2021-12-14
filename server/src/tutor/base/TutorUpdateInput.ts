import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { EnumTutorCourses } from "./EnumTutorCourses";
import { IsEnum, IsOptional, IsDate, IsString } from "class-validator";
import { Type } from "class-transformer";
@InputType()
class TutorUpdateInput {
  @ApiProperty({
    required: false,
    enum: EnumTutorCourses,
    isArray: true,
  })
  @IsEnum(EnumTutorCourses, {
    each: true,
  })
  @IsOptional()
  @Field(() => [EnumTutorCourses], {
    nullable: true,
  })
  courses?: Array<"Math" | "English" | "Science" | "Other">;

  @ApiProperty({
    required: false,
  })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @Field(() => Date, {
    nullable: true,
  })
  date?: Date;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  email?: string | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  name?: string;
}
export { TutorUpdateInput };
