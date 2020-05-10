import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { Concept } from "./Concept.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Concept])],
    providers:[],
    exports:[],
})
export class ConceptModule {}