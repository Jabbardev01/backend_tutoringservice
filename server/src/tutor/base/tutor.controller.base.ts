import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestMorgan from "nest-morgan";
import * as nestAccessControl from "nest-access-control";
import * as defaultAuthGuard from "../../auth/defaultAuth.guard";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import * as errors from "../../errors";
import { Request } from "express";
import { plainToClass } from "class-transformer";
import { TutorService } from "../tutor.service";
import { TutorCreateInput } from "./TutorCreateInput";
import { TutorWhereInput } from "./TutorWhereInput";
import { TutorWhereUniqueInput } from "./TutorWhereUniqueInput";
import { TutorFindManyArgs } from "./TutorFindManyArgs";
import { TutorUpdateInput } from "./TutorUpdateInput";
import { Tutor } from "./Tutor";
@swagger.ApiBearerAuth()
export class TutorControllerBase {
  constructor(
    protected readonly service: TutorService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Post()
  @nestAccessControl.UseRoles({
    resource: "Tutor",
    action: "create",
    possession: "any",
  })
  @swagger.ApiCreatedResponse({ type: Tutor })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async create(
    @common.Body() data: TutorCreateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Tutor> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Tutor",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new errors.ForbiddenException(
        `providing the properties: ${properties} on ${"Tutor"} creation is forbidden for roles: ${roles}`
      );
    }
    return await this.service.create({
      data: data,
      select: {
        courses: true,
        createdAt: true,
        date: true,
        email: true,
        id: true,
        name: true,
        updatedAt: true,
      },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Get()
  @nestAccessControl.UseRoles({
    resource: "Tutor",
    action: "read",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: [Tutor] })
  @swagger.ApiForbiddenResponse()
  @swagger.ApiQuery({
    type: () => TutorFindManyArgs,
    style: "deepObject",
    explode: true,
  })
  async findMany(
    @common.Req() request: Request,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Tutor[]> {
    const args = plainToClass(TutorFindManyArgs, request.query);

    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Tutor",
    });
    const results = await this.service.findMany({
      ...args,
      select: {
        courses: true,
        createdAt: true,
        date: true,
        email: true,
        id: true,
        name: true,
        updatedAt: true,
      },
    });
    return results.map((result) => permission.filter(result));
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Get("/:id")
  @nestAccessControl.UseRoles({
    resource: "Tutor",
    action: "read",
    possession: "own",
  })
  @swagger.ApiOkResponse({ type: Tutor })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async findOne(
    @common.Param() params: TutorWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Tutor | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Tutor",
    });
    const result = await this.service.findOne({
      where: params,
      select: {
        courses: true,
        createdAt: true,
        date: true,
        email: true,
        id: true,
        name: true,
        updatedAt: true,
      },
    });
    if (result === null) {
      throw new errors.NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return permission.filter(result);
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Patch("/:id")
  @nestAccessControl.UseRoles({
    resource: "Tutor",
    action: "update",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Tutor })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async update(
    @common.Param() params: TutorWhereUniqueInput,
    @common.Body()
    data: TutorUpdateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Tutor | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Tutor",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new errors.ForbiddenException(
        `providing the properties: ${properties} on ${"Tutor"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      return await this.service.update({
        where: params,
        data: data,
        select: {
          courses: true,
          createdAt: true,
          date: true,
          email: true,
          id: true,
          name: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Delete("/:id")
  @nestAccessControl.UseRoles({
    resource: "Tutor",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Tutor })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async delete(
    @common.Param() params: TutorWhereUniqueInput
  ): Promise<Tutor | null> {
    try {
      return await this.service.delete({
        where: params,
        select: {
          courses: true,
          createdAt: true,
          date: true,
          email: true,
          id: true,
          name: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }
}
