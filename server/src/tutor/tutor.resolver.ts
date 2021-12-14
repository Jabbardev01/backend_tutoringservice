import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import { GqlDefaultAuthGuard } from "../auth/gqlDefaultAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { TutorResolverBase } from "./base/tutor.resolver.base";
import { Tutor } from "./base/Tutor";
import { TutorService } from "./tutor.service";

@graphql.Resolver(() => Tutor)
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
export class TutorResolver extends TutorResolverBase {
  constructor(
    protected readonly service: TutorService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
