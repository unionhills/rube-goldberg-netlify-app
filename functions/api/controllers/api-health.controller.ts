import { Request, Response } from 'express';
import { Controller, Get } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';


@Controller('.netlify/functions/api')
export class ApiHealthController {

  @Get()
  private getMessage(req: Request, res: Response) {
    res.status(200).json({ status: 'pass' });
  }
}