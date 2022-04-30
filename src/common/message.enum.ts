/**
 * messages support placeholder,
 * like:
 *     $0, $1, ..., and so on,
 * it will be replaced with the real value that is passed to the params.
 * Notice:
 *     placeholder starts with 0!
 */
export enum Message {
  // todo: internationalize
  NOT_FOUND = 'Page not found',
  UNKNOWN_ERROR = 'Unknown error',
  UNAUTHORIZED = 'Unauthorized',
  FORBIDDEN = 'Forbidden',
  BAD_REQUEST = 'Bad request',
  INTERNAL_SERVER_ERROR = '请求失败',
  LOGIN_REJECT = '用户名或密码错误',
  UNSUPPORTED_OPERATION = '操作不支持',
  PARAM_INVALID = '参数“$0”无效',
  PARAM_MISSED = '缺少参数: $0',
  PARAM_MUST_BE_ARRAY = '参数“$0”必须为数组',
  DB_QUERY_ERROR = '请求失败，请稍后重试',
  UNSUPPORTED_QUERY_ORDERS = '不支持的排序参数',
  POST_GUID_IS_EXIST = 'URL已存在，请重新输入',
  POST_SAVE_ERROR = '内容保存失败',
  POST_DELETE_ERROR = '内容删除失败',
  POST_SAVE_DISALLOW_DELETE = '内容保存时不允许状态改为“已删除”',
  POST_STATUS_MUST_NOT_TRASH = '要添加$0，请将状态设为非"删除"状态',
  POST_CATEGORY_IS_NULL = '分类不能为空',
  POST_DELETE_EMPTY = '请选择要删除的内容',
  POST_TAXONOMY_MISSED = '缺少分类',
  POST_COMMENT_COUNT_UPDATE_ERROR = '评论数量更新失败',
  COMMENT_SAVE_ERROR = '评论保存失败',
  COMMENT_AUDIT_ERROR = '评论修改失败',
  TAXONOMY_NOT_EXIST = '分类不存在',
  TAXONOMY_SAVE_ERROR = '$0保存失败',
  TAXONOMY_SLUG_EXIST = '$0“$1”已存在',
  TAXONOMY_EXISTS_RELATED_CONTENT = '分类下仍有$0，请删除内容后再进行删除操作',
  TAXONOMY_DELETE_ERROR = '$0删除失败',
  TAXONOMY_REQUIRED_CAN_NOT_MODIFY_PARENT = '基础数据不允许修改节点的父子关系',
  TAXONOMY_CAN_NOT_ADD_CHILD = '父节点已删除，不允许增加子节点',
  TAXONOMY_REQUIRED_CAN_NOT_BE_DELETED = '分类："$0"为基础数据，不允许删除',
  TAXONOMY_NOT_PUBLISH_CAN_NOT_MODIFY_PARENT = '非公开分类不允许增加子节点',
  LINK_SAVE_ERROR = '链接保存失败',
  LINK_NOT_EXIST = '链接不存在',
  LINK_SAVE_DISALLOW_DELETE = '链接保存时不允许状态改为“已删除”',
  LINK_DELETE_ERROR = '链接删除失败',
  OPTION_MISSED = '配置项不存在: $0',
  OPTION_VALUE_MISSED = '配置项未设置: $0',
  OPTION_SAVE_ERROR = '设置保存失败',
  FILE_NOT_FOUND = '文件不存在',
  FILE_UPLOAD_ERROR = '文件上传失败',
  FILE_WATERMARK_ERROR = '水印添加失败',
  FILE_GUID_IS_EXIST = '文件上传失败',
}
