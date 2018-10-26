import fetch from '@/api/fetch'

/**
 * 登陆
 */
export const login = data => fetch('/user/userLogin', data, 'POST');

/**
 * 所有分类
 */
export const queryAllClassify = data => fetch('/classify/queryAllClassify');
