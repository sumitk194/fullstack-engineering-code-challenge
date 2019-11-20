import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RouterModule } from 'nest-router';
import { ConfigModule } from '@config/config.module';
import { ConfigService } from '@config/config.service';
import { ResultModule } from '@modules/result/result.module';
import { routes } from './routes';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.dbURL,
        useNewUrlParser: true,
        useFindAndModify: false,
      }),
      inject: [ConfigService],
    }),
    ConfigModule,
    ResultModule,
    RouterModule.forRoutes(routes),
  ],
})

export class AppModule {}
