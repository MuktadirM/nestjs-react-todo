import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsString, IsUUID } from "class-validator";
import { Todo } from "../entities/todo.entity";
const crypto = require("crypto");

export class CreateTodoDto {

    @ApiProperty({ required: true })
    @IsUUID()
    id: string;

    @ApiProperty({ required: true })
    @IsString()
    title: string;

    @ApiProperty({ required: true })
    @IsBoolean()
    isDone: boolean;

    @ApiProperty({ required: false })
    @IsDate()
    createdAt: Date;

    @ApiProperty({required:false})
    @IsDate()
    deletedAt?: Date;

    public copyWith(id?: string, title?: string, isDone?: boolean, createdAt?: Date, deletedAt?: Date) {
        const it = new CreateTodoDto();
          it.id = id != null ? id: this.id; 
          it.title= title != null ? title: this.title;
          it.isDone = isDone != null ? isDone: this.isDone;
          it.createdAt = createdAt != null ? createdAt: this.createdAt; 
          it.deletedAt = deletedAt != null ? deletedAt: this.deletedAt;
          return it;
    }

    public static from(dto: Partial<CreateTodoDto>) {
        const it = new CreateTodoDto();
        it.id = dto.id;
        it.title = dto.title;
        it.isDone = dto.isDone;
        it.createdAt = dto.createdAt;
        it.deletedAt = dto.deletedAt;
        return it;
      }
    
      public static fromEntity(entity: Todo) {
        return this.from({
          id: entity.id,
          title: entity.title,
          isDone: entity.isDone,
          createdAt: entity.createdAt,
          deletedAt: entity.deletedAt,
        });
      }
    
      public static toEntity(dto: Partial<CreateTodoDto>) {
        const id = crypto.randomBytes(16).toString("hex");
        const it = new Todo();
        it.id = id;
        it.title = dto.title;
        it.isDone = dto.isDone;
        it.createdAt = new Date();
        it.createdAt = new Date();
        return it;
      }
}
