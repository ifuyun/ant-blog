import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { UserLoginDto } from '../../dtos/user-login.dto';
import { UserVo } from '../../interfaces/users.interface';
import { UserModel } from '../../models/user.model';
import { UserMetaModel } from '../../models/user-meta.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserModel)
    private readonly userModel: typeof UserModel
  ) {
  }

  async getUserByName(username: string): Promise<UserVo> {
    return this.userModel.findOne({
      attributes: [
        'userId', 'userLogin', 'userPass', 'userPassSalt', 'userNiceName',
        'userEmail', 'userLink', 'userRegistered', 'userStatus'
      ],
      include: [{
        model: UserMetaModel,
        attributes: ['metaId', 'userId', 'metaKey', 'metaValue']
      }],
      where: {
        userLogin: {
          [Op.eq]: username
        }
      }
    }).then((user) => {
      const userMeta: Record<string, string> = {};
      if (user) {
        user.userMeta.forEach((item) => {
          userMeta[item.metaKey] = item.metaValue;
        });
        return Promise.resolve({
          ...user.get({
            plain: true
          }),
          meta: userMeta
        });
      }
      return Promise.resolve(null);
    });
  }

  async getUserById(userId: string): Promise<UserModel> {
    return this.userModel.findByPk(userId);
  }
}
