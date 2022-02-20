import { forwardRef, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UsersService } from './users.service';
import { AuthModule } from '../auth/auth.module';
import { UtilModule } from '../util/util.module';
import { DatabaseModule } from '../database/database.module';
import { OptionModule } from '../option/option.module';

@Module({
  imports: [
    DatabaseModule,
    UtilModule,
    OptionModule,
    forwardRef(() => AuthModule)
  ],
  controllers: [UserController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UserModule {
}
