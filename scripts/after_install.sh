source /home/ec2-user/.bash_profile
source /home/ec2-user/.bashrc

cd /home/ec2-user/legacy-ui
yarn clean
perl -pi -e 's/NODE_ENV=DEVELOPMENT/NODE_ENV=PRODUCTION/' config/.env.sample.js
yarn
yarn buildEnv
yarn setup:server
yarn setup:client
yarn build
