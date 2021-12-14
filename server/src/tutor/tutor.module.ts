import { Module } from "@nestjs/common";
import { TutorModuleBase } from "./base/tutor.module.base";
import { TutorService } from "./tutor.service";
import { TutorController } from "./tutor.controller";
import { TutorResolver } from "./tutor.resolver";

@Module({
  imports: [TutorModuleBase],
  controllers: [TutorController],
  providers: [TutorService, TutorResolver],
  exports: [TutorService],
})
export class TutorModule {}
