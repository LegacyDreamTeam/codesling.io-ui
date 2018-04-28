module.exports = {
  apps : [
    {
      name      : 'UIServer',
      script    : 'npm',
      args: 'run start:server',
      cwd: '/home/ec2-user/legacy-ui'
    }
  ]
};
