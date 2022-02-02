/*global process*/
/**
 * 数据库配置
 * @author Fuyun
 * @version 1.0.0
 * @since 1.0.0
 */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SequelizeModuleOptions, SequelizeOptionsFactory } from '@nestjs/sequelize/dist/interfaces/sequelize-options.interface';
import credentials from '../config/credentials.config';
import LoggerService from './logger.service';

interface DbConfigOptions {
  development: SequelizeModuleOptions,
  production: SequelizeModuleOptions
}

/* Can't return config directly, it must be defined as a Class, otherwise, LoggerService will be undefined. */
@Injectable()
export default class DbConfigService implements SequelizeOptionsFactory {
  constructor(
    private readonly configService: ConfigService,
    private readonly loggerService: LoggerService
  ) {
  }

  private dbConfig: DbConfigOptions = {
    development: {
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: credentials().db.development.username,
      password: credentials().db.development.password,
      database: 'ifuyun',
      timezone: '+08:00',
      pool: {
        max: 10,
        min: 0,
        idle: 30000
      },
      synchronize: false,
      autoLoadModels: true,
      logging: (sql) => {
        this.loggerService.dbLogger.trace(sql);
      }
    },
    production: {
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: credentials().db.production.username,
      password: credentials().db.production.password,
      database: 'ifuyun',
      timezone: '+08:00',
      pool: {
        max: 10,
        min: 0,
        idle: 30000
      },
      synchronize: false,
      autoLoadModels: true,
      logging: (sql) => {
        this.loggerService.dbLogger.trace(sql);
      }
    }
  };

  getDbConfig(env: string): SequelizeModuleOptions {
    return this.dbConfig[env];
  }

  createSequelizeOptions(): SequelizeModuleOptions {
    return this.getDbConfig(this.configService.get('app.env'));
  }
}