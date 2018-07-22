module.exports = {
  apps: [
    {
      name: 'fasttrack',
      script: './dist/main.js'
    }
  ],
  deploy: {
    production: {
      user: 'ubuntu',
      host: 'ec2-18-130-168-211.eu-west-2.compute.amazonaws.com',
      key: '~/.ssh/fast-track.pem',
      ref: 'origin/master',
      repo: 'git@github.com:jpreecedev/fasttrack.git',
      path: '/home/ubuntu/server',
      'post-deploy':
        'npm install && npm run build && pm2 startOrRestart ecosystem.config.js'
    }
  }
}
