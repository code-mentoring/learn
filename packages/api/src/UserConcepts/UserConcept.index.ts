import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserConcept } from "./UserConcept.entity";

@Module({
    imports: [TypeOrmModule.forFeature([UserConcept])],
})
export class UserConceptModule { }