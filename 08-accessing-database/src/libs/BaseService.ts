import { type BaseModel } from './BaseModel';
import { type BaseRepository } from './BaseRepository';

export abstract class BaseService<T extends BaseModel> {
  public constructor(private readonly repository: BaseRepository<T>) {}

  public async getAll(): Promise<T[]> {
    return await this.repository.find();
  }
}
