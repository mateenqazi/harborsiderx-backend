import { NextFunction, Request, Response, Router } from 'express';
import { z } from 'zod';
import { validationError } from '../../lib/errors';
import { useBodyValidation } from '../../middlewares/validationMiddleware';
import BaseRepository from './base.repository';
import BaseService from './base.service';

export class BaseController<
  Entity,
  Repository extends BaseRepository<Entity>,
  Service extends BaseService<Entity, Repository>,
> {
  public router: Router;
  private service: Service;
  private validateAddBody: ReturnType<typeof useBodyValidation>;
  private validateUpdateBody: ReturnType<typeof useBodyValidation>;

  constructor(service: Service, inputAddSchema: z.ZodSchema, inputUpdateSchema: z.ZodSchema) {
    this.router = Router();
    this.validateAddBody = useBodyValidation(inputAddSchema);
    this.validateUpdateBody = useBodyValidation(inputUpdateSchema);
    this.routes();
    this.service = service;
  }

  public getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const entities = await this.service.getAll();
      res.send(entities);
    } catch (err) {
      next(err);
    }
  };

  public getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = +req.params.id;
      if (!id) throw validationError('ID parameter must be a number');
      const entity = await this.service.get({ id });
      res.send(entity);
    } catch (err) {
      next(err);
    }
  };

  public addAndReturn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const entities = await this.service.addAndReturn(data);
      res.status(201).send(entities);
    } catch (err) {
      next(err);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = +req.params.id;
      const data = req.body;
      if (!id) throw validationError('ID parameter must be a number');
      const [entity] = await this.service.update({ id }, data, '*');
      res.send(entity);
    } catch (err) {
      next(err);
    }
  };

  public removeById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = +req.params.id;
      if (!id) throw validationError('ID parameter must be a number');
      const entity = await this.service.removeById(id, '*');
      res.send(entity);
    } catch (err) {
      next(err);
    }
  };

  public routes = () => {
    this.router.get('/', this.getAll);
    this.router.post('/', this.validateAddBody, this.addAndReturn);
    this.router.get('/:id', this.getById);
    this.router.patch('/:id', this.validateUpdateBody, this.update);
    this.router.delete('/:id', this.removeById);
    return this.router;
  };
}
