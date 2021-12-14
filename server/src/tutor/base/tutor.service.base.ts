import { PrismaService } from "nestjs-prisma";
import { Prisma, Tutor } from "@prisma/client";

export class TutorServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.TutorFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.TutorFindManyArgs>
  ): Promise<number> {
    return this.prisma.tutor.count(args);
  }

  async findMany<T extends Prisma.TutorFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.TutorFindManyArgs>
  ): Promise<Tutor[]> {
    return this.prisma.tutor.findMany(args);
  }
  async findOne<T extends Prisma.TutorFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.TutorFindUniqueArgs>
  ): Promise<Tutor | null> {
    return this.prisma.tutor.findUnique(args);
  }
  async create<T extends Prisma.TutorCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.TutorCreateArgs>
  ): Promise<Tutor> {
    return this.prisma.tutor.create<T>(args);
  }
  async update<T extends Prisma.TutorUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.TutorUpdateArgs>
  ): Promise<Tutor> {
    return this.prisma.tutor.update<T>(args);
  }
  async delete<T extends Prisma.TutorDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.TutorDeleteArgs>
  ): Promise<Tutor> {
    return this.prisma.tutor.delete(args);
  }
}
