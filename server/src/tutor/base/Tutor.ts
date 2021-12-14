import { ObjectType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { EnumTutorCourses } from "./EnumTutorCourses";
import { IsEnum, IsOptional, IsDate, IsString } from "class-validator";
import { Type } from "class-transformer";
@ObjectType()
class Tutor {
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
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  createdAt!: Date;

  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  date!: Date;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  email!: string | null;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  id!: string;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  name!: string;

  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  updatedAt!: Date;
}
export { Tutor };
