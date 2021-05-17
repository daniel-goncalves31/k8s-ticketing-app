k8s_yaml('./infra/k8s/auth-depl.yaml')
k8s_yaml('./infra/k8s/auth-mongo-depl.yaml')
k8s_yaml('./infra/k8s/client-depl.yaml')
k8s_yaml('./infra/k8s/ingress-src.yaml')

docker_build('danielgg31/ticketing-app-client', './client', 
  live_update=[
    sync('./client', '/app'),
    run('cd /app && npm install', trigger=['./client/package.json']),
  ]
)

docker_build('danielgg31/ticketing-app-auth', './auth', 
  live_update=[
    sync('./auth', '/app'),
    run('cd /app && npm install', trigger=['./auth/package.json']),
  ]
)

