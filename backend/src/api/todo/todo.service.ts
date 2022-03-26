import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private readonly repo: Repository<Todo>){}
  async create(createTodoDto: CreateTodoDto) {
    try{
      const e = await this.repo.save(CreateTodoDto.toEntity(createTodoDto));
      return CreateTodoDto.fromEntity(e);
    } catch(e) {
      throw new NotAcceptableException(createTodoDto);
    }
  }

  async findAll():Promise<CreateTodoDto[]> {
    const items = await this.repo.find();
    return items.map(e => CreateTodoDto.fromEntity(e));
  }

  async findOne(id: string) {
    try{
      const item = await this.repo.findOne(id);
      return CreateTodoDto.fromEntity(item);
    } catch(e) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }
  }

   async update(id: string, updateTodoDto: UpdateTodoDto) {
    try{
      const item = await this.repo.update(id, updateTodoDto);
      return {
        statusCode : 200,
        message : 'success',
        data : updateTodoDto,
      };

    } catch(e) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }
     
  }

  async remove(id: string) {
    const item = await this.findOne(id);
    const result = this.update(id, item.copyWith(null, null, null, null , new Date()));
    return result;
  }
}
