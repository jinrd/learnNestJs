import { Module } from '@nestjs/common';

import { MoviesModule } from './movies.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [MoviesModule]
  , controllers: [AppController]
  , providers: [AppService]
})
export class AppModule {}
