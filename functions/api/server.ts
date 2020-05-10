import * as bodyParser from 'body-parser';

import { Application } from 'express';
import { Server } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';

import { ApiHealthController, NoteController } from './controllers';

export class ApiServer extends Server {
  constructor() {
    super(true);
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.setupControllers();
  }

  private setupControllers(): void {
    const ctlrInstances = [new ApiHealthController(), new NoteController()];

    super.addControllers(ctlrInstances);
  }

  public get expressApp(): Application {
    return this.app;
  }
}
