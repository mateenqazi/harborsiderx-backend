import BaseRepository from './base.repository';

export default class BaseService<Entity, Repository extends BaseRepository<Entity>> {
  private repository: BaseRepository<Entity>;

  constructor(repository: Repository) {
    this.repository = repository;
  }

  public getAll = async () => {
    const entities = await this.repository.getAll();
    return entities;
  };

  public get = async (filter: { id: number } | Partial<Entity>) => {
    const entity = await this.repository.get(filter);
    return entity;
  };

  public add = async (data: Omit<Entity, 'id' | 'createdAt' | 'updatedAt'>) => {
    const entity = await this.repository.add(data);
    return entity;
  };

  public addAndReturn = async (data: Omit<Entity, 'id' | 'createdAt' | 'updatedAt'>) => {
    const ids = await this.repository.addAndReturn(data);
    return ids;
  };

  public update = async (
    filter: { id: number } | Partial<Entity>,
    data: Partial<Entity>,
    returning: string | string[] = 'id',
  ) => {
    const entity = await this.repository.update(filter, data, returning);
    return entity;
  };

  public removeById = async (id: number, returning: string | string[] = 'id') => {
    const entity = await this.repository.removeById(id, returning);
    return entity;
  };
}
