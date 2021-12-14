import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import { GqlDefaultAuthGuard } from "../../auth/gqlDefaultAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import { MetaQueryPayload } from "../../util/MetaQueryPayload";
import { CreateTutorArgs } from "./CreateTutorArgs";
import { UpdateTutorArgs } from "./UpdateTutorArgs";
import { DeleteTutorArgs } from "./DeleteTutorArgs";
import { TutorFindManyArgs } from "./TutorFindManyArgs";
import { TutorFindUniqueArgs } from "./TutorFindUniqueArgs";
import { Tutor } from "./Tutor";
import { TutorService } from "../tutor.service";

@graphql.Resolver(() => Tutor)
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
export class TutorResolverBase {
  constructor(
    protected readonly service: TutorService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "Tutor",
    action: "read",
    possession: "any",
  })
  async _tutorsMeta(
    @graphql.Args() args: TutorFindManyArgs
  ): Promise<MetaQueryPayload> {
    const results = await this.service.count({
      ...args,
      skip: undefined,
      take: undefined,
    });
    return {
      count: results,
    };
  }

  @graphql.Query(() => [Tutor])
  @nestAccessControl.UseRoles({
    resource: "Tutor",
    action: "read",
    possession: "any",
  })
  async tutors(
    @graphql.Args() args: TutorFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Tutor[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Tutor",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Tutor, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Tutor",
    action: "read",
    possession: "own",
  })
  async tutor(
    @graphql.Args() args: TutorFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Tutor | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Tutor",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Tutor)
  @nestAccessControl.UseRoles({
    resource: "Tutor",
    action: "create",
    possession: "any",
  })
  async createTutor(
    @graphql.Args() args: CreateTutorArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Tutor> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Tutor",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"Tutor"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: args.data,
    });
  }

  @graphql.Mutation(() => Tutor)
  @nestAccessControl.UseRoles({
    resource: "Tutor",
    action: "update",
    possession: "any",
  })
  async updateTutor(
    @graphql.Args() args: UpdateTutorArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Tutor | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Tutor",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"Tutor"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: args.data,
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.Mutation(() => Tutor)
  @nestAccessControl.UseRoles({
    resource: "Tutor",
    action: "delete",
    possession: "any",
  })
  async deleteTutor(
    @graphql.Args() args: DeleteTutorArgs
  ): Promise<Tutor | null> {
    try {
      // @ts-ignore
      return await this.service.delete(args);
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }
}
