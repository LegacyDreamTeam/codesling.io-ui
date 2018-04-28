source /home/ec2-user/.bash_profile
source /home/ec2-user/.bashrc

cd /home/ec2-user/legacy-ui
pm2 startOrRestart scripts/pm2.config.js


