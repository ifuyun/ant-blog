import { BelongsTo, Column, CreatedAt, DataType, ForeignKey, Model, PrimaryKey, Sequelize, Table } from 'sequelize-typescript';
import CommentModel from './comment.model';
import PostModel from './post.model';

@Table({
  tableName: 'votes',
  updatedAt: false,
  deletedAt: false
})
export default class VoteModel extends Model {
  @PrimaryKey
  @Column({
    field: 'vote_id',
    type: DataType.CHAR(16),
    allowNull: false
  })
  voteId: string;

  @ForeignKey(() => CommentModel)
  @ForeignKey(() => PostModel)
  @Column({
    field: 'object_id',
    type: DataType.CHAR(16),
    allowNull: false
  })
  objectId: string;

  @BelongsTo(() => CommentModel)
  comment: CommentModel;

  @BelongsTo(() => PostModel)
  post: PostModel;

  @Column({
    field: 'vote_count',
    type: DataType.INTEGER({
      length: 1,
      unsigned: true
    }),
    allowNull: false,
    defaultValue: 0
  })
  voteResult: number;

  @CreatedAt
  @Column({
    field: 'vote_created',
    type: DataType.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  })
  voteCreated: Date;

  @Column({
    field: 'user_id',
    type: DataType.CHAR(16),
    allowNull: false
  })
  userId: string;

  @Column({
    field: 'user_ip',
    type: DataType.STRING(100),
    allowNull: false,
    defaultValue: ''
  })
  userIp: string;

  @Column({
    field: 'user_agent',
    type: DataType.STRING(255),
    allowNull: false,
    defaultValue: ''
  })
  userAgent: string;
}