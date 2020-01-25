import { Request, Response } from 'express';
import { Controller, Middleware, Get, Put, Post, Delete } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';


@Controller('.netlify/functions/api')
export class ApiHealthController {

  @Get()
  private getMessage(req: Request, res: Response) {
    Logger.Info(req.params.msg);
    res.status(200).json({ status: 'pass' });
  }
}