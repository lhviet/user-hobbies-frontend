/**
 * @info Backend API Swagger
 */
export const HOST = {
  base:
    process.env.NODE_ENV === 'development' ?
      'localhost:3001' :
      'ec2-15-164-215-34.ap-northeast-2.compute.amazonaws.com:3001',
  protocol: 'http',
  apiModule: 'api',
  version: 'v1',
  api: {
    users: 'users',
    hobbies: 'hobbies',
  },
};

export const getAPIUrl: (
  ...path: Array<string | number>
) => string = (
  ...path
) => `${HOST.protocol}://${HOST.base}/${HOST.apiModule}/${HOST.version}/${path.join('/')}`;
