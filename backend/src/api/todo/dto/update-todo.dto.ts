import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsUUID, IsString, IsBoolean, IsDate } from 'class-validator';
import { Todo } from '../entities/todo.entity';
import { CreateTodoDto } from './create-todo.dto';

export class UpdateTodoDto extends PartialType(CreateTodoDto) {
    @ApiProperty({ required: true })
    @IsUUID()
    id: string;

    @ApiProperty({ required: false })
    @IsString()
    title: string;

    @ApiProperty({ required: false })
    @IsBoolean()
    isDone: boolean;

    @ApiProperty({ required: false })
    @IsDate()
    createdAt: Date;

    @ApiProperty({required:false})
    @IsDate()
    deletedAt?: Date;

    public static from(dto: Partial<CreateTodoDto>) {
        const it = new CreateTodoDto();
        it.id = dto.id;
        it.title = dto.title;
        it.isDone = dto.isDone;
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
        const it = new Todo();
        it.id = dto.id;
        it.title = dto.title;
        it.isDone = dto.isDone;
        it.createdAt = new Date();
        it.createdAt = new Date();
        return it;
      }
}
