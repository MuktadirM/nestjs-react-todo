import * as _ from 'lodash';
import { CreateTodoDto } from '../api/todo/dto/create-todo.dto';
import { TodoService } from '../api/todo/todo.service';
import { Todo } from '../api/todo/entities/todo.entity';
import { createConnection, ConnectionOptions } from 'typeorm';
import { configService } from '../config/config.service';

async function run() {

  const seedId = Date.now()
    .toString()
    .split('')
    .reverse()
    .reduce((s, it, x) => (x > 3 ? s : (s += it)), '');

  const opt = {
    ...configService.getTypeOrmConfig(),
    debug: true
  };

  const connection = await createConnection(opt as ConnectionOptions);
  const todoService = new TodoService(connection.getRepository(Todo));

  const work = _.range(1, 10)
    .map(n => CreateTodoDto.from({
      title: `seed${seedId}-${n}`,
      isDone: false
    }))
    .map(dto => todoService.create(dto))
      .then(r => (console.log('done ->', r.title), r));

  return await Promise.all(work);

}

run()
  .then(_ => console.log('...wait for script to exit'))
  .catch(error => console.error('seed error', error));