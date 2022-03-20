import { Body, Controller, Get, Header, HttpStatus, Param, Post, Query, Render, Req, Session, UseGuards, UseInterceptors } from '@nestjs/common';
import { Request } from 'express';
import { CommentStatus, CommentStatusDesc, Role } from '../../common/common.enum';
import { ResponseCode } from '../../common/response-code.enum';
import { UtilService } from '../util/util.service';
import { IdParams } from '../../decorators/id-params.decorator';
import { Referer } from '../../decorators/referer.decorator';
import { Roles } from '../../decorators/roles.decorator';
import { Search } from '../../decorators/search.decorator';
import { User } from '../../decorators/user.decorator';
import { CustomException } from '../../exceptions/custom.exception';
import { RolesGuard } from '../../guards/roles.guard';
import { getEnumKeyByValue } from '../../helpers/helper';
import { CheckIdInterceptor } from '../../interceptors/check-id.interceptor';
import { ParseIntPipe } from '../../pipes/parse-int.pipe';
import { TrimPipe } from '../../pipes/trim.pipe';
import { CommentsService } from './comments.service';
import { OptionsService } from '../option/options.service';
import { PaginatorService } from '../paginator/paginator.service';

@Controller('admin/comment')
@UseGuards(RolesGuard)
@Roles(Role.ADMIN)
export class AdminCommentController {
  constructor(
    private readonly commentsService: CommentsService,
    private readonly optionsService: OptionsService,
    private readonly paginatorService: PaginatorService,
    private readonly utilService: UtilService
  ) {
  }

  @Get(['', 'page-:page'])
  @Render('admin/pages/comment-list')
  async showComments(
    @Req() req: Request,
    @Param('page', new ParseIntPipe(1)) page: number,
    @Query('status', new TrimPipe()) status: string,
    @Query('keyword', new TrimPipe()) keyword: string,
    @Search() search: Record<string, any>
  ) {
    const options = await this.optionsService.getOptions();
    const commentList = await this.commentsService.getComments({ page, status, keyword });
    const { comments, total } = commentList;
    page = commentList.page;

    const searchParams: string[] = [];
    keyword && searchParams.push(keyword);
    status && searchParams.push(CommentStatusDesc[getEnumKeyByValue(CommentStatus, status)]);

    const titles = ['评论列表', '管理后台', options.site_name];
    searchParams.length > 0 && titles.unshift(searchParams.join(' | '));
    page > 1 && titles.unshift(`第${page}页`);

    return {
      meta: {
        title: this.utilService.getTitle(titles),
        description: `${options.site_name}管理后台`,
        author: options.site_author
      },
      pageBar: {
        paginator: this.paginatorService.getPaginator(page, total),
        linkUrl: '/admin/comment/page-',
        linkParam: search
      },
      curNav: 'comment',
      // token: req.csrfToken(),
      options,
      comments,
      commentStatus: this.commentsService.getAllCommentStatus(),
      curStatus: status,
      curKeyword: keyword
    };
  }

  @Get('detail')
  @Render('admin/pages/comment-form')
  @UseInterceptors(CheckIdInterceptor)
  @IdParams({ idInQuery: ['id'] })
  async editOrReplyComment(
    @Req() req: Request,
    @Query('id', new TrimPipe()) commentId: string,
    @Query('action', new TrimPipe()) action: string,
    @User() user,
    @Referer() referer: string,
    @Session() session: any
  ) {
    if (!commentId) {
      throw new CustomException('请求参数错误。', HttpStatus.BAD_REQUEST, ResponseCode.BAD_REQUEST);
    }
    if (!['show', 'edit', 'reply'].includes(action)) {
      throw new CustomException('操作不允许。', HttpStatus.FORBIDDEN, ResponseCode.FORBIDDEN);
    }
    const options = await this.optionsService.getOptions();
    const comment = await this.commentsService.getCommentById(commentId);
    const title = action === 'edit' ? '编辑评论' : action === 'reply' ? '回复评论' : '查看评论';
    session.commentReferer = referer;
    return {
      meta: {
        title: this.utilService.getTitle([title, '管理后台', options.site_name]),
        description: `${options.site_name}管理后台`,
        author: options.site_author
      },
      curNav: 'comment',
      // token: req.csrfToken(),
      options,
      comment,
      user,
      title,
      action
    };
  }

  @Post('audit')
  @Header('Content-Type', 'application/json')
  @UseInterceptors(CheckIdInterceptor)
  @IdParams({ idInBody: ['commentId'] })
  async auditComment(
    @Body(new TrimPipe()) data,
    @Referer() referer: string
  ) {
    if (!Object.keys(CommentStatus).map((k) => CommentStatus[k]).includes(data.action)) {
      throw new CustomException('操作不允许。', HttpStatus.FORBIDDEN, ResponseCode.FORBIDDEN);
    }
    const result = await this.commentsService.auditComment(data.commentId, data.action);
    if (result[0] < 1) {
      throw new CustomException('操作失败。', HttpStatus.INTERNAL_SERVER_ERROR, ResponseCode.INTERNAL_SERVER_ERROR);
    }
    return {
      status: HttpStatus.OK,
      code: ResponseCode.SUCCESS,
      data: {
        url: referer || '/admin/comment'
      }
    };
  }
}
