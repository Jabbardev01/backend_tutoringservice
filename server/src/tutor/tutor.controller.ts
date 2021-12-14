import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { TutorService } from "./tutor.service";
import { TutorControllerBase } from "./base/tutor.controller.base";

@swagger.ApiTags("tutors")
@common.Controller("tutors")
export class TutorController extends TutorControllerBase {
  constructor(
    protected readonly service: TutorService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
