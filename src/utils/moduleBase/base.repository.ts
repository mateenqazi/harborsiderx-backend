/* eslint-disable max-classes-per-file */
import { Knex } from 'knex';
import { z } from 'zod';
import knexConnection from '../../../knexConnection';
import { APP_CONFIG } from '../../config/appConfig';
import { notFoundError } from '../../lib/errors';
import BaseModel from './base.model';

/**
 * @remarks NOTE: BaseRepository is using knex for all database queries to avoid generic typing issues. Because of this, zod is used to validate immediately after every query result. This is unnecessary when using Objection because the BaseModel will automatically validate.
 */

export default class BaseRepository<Entity> {
  private tableName: string;
  private db: Knex;
  private schema: z.AnyZodObject;

  constructor(model: typeof BaseModel, schema: z.AnyZodObject) {
    this.tableName = model.tableName;
    this.db = knexConnection[APP_CONFIG.get('env') || 'dev'];
    this.schema = schema;
  }

  public getAll = async () => {
    const entities: Entity[] = await this.db(this.tableName)
      .select('*')
      .orderBy('id', 'desc')
      .where('isDeleted', false);
    z.array(this.schema).parse(entities);
    return entities;
  };

  public get = async (filter: { id: number } | Partial<Entity>) => {
    const entity: Entity | undefined = await this.db(this.tableName).where(filter).first();
    if (!entity) throw notFoundError();
    this.schema.parse(entity);
    return entity;
  };

  public add = async (data: Omit<Entity, 'id' | 'createdAt' | 'updatedAt'>) => {
    const ids = await this.db(this.tableName).insert(data);
    z.array(z.number()).parse(ids);
    return ids;
  };

  public addAndReturn = async (data: Omit<Entity, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newEntities: Entity[] = await this.db(this.tableName).insert(data).returning('*');
    z.array(this.schema).parse(newEntities);
    return newEntities;
  };

  public update = async (
    filter: { id: number } | Partial<Entity>,
    data: Partial<Entity>,
    returning: string | string[] = 'id',
  ) => {
    const entity: Partial<Entity>[] | undefined = await this.db(this.tableName)
      .update(data, returning)
      .where(filter);
    if (!entity || !entity.length) throw notFoundError();
    if (returning === '*') {
      z.array(this.schema).parse(entity);
      return entity;
    }
    z.array(this.schema.partial()).parse(entity);
    return entity;
  };

  public removeById = async (id: number, returning: string | string[] = 'id') => {
    const entity: Partial<Entity>[] | undefined = await this.db(this.tableName)
      .update({ isDeleted: true }, returning)
      .where({ id });
    if (!entity || !entity.length || !entity[0]) throw notFoundError();
    const schema = returning === '*' ? this.schema : this.schema.partial();
    z.array(schema).parse(entity);
    return entity[0];
  };
}
