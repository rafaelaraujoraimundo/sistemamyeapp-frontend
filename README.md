
```bash
# clone the project
git clone https://github.com/PanJiaChen/vue-admin-template.git

# enter the project directory
cd vue-admin-template

# install dependency
npm install

# develop
npm run dev
```

This will automatically open http://localhost:9528


Dockerizar o VUE

https://br.vuejs.org/v2/cookbook/dockerize-vuejs-app.html

docker build -t vuejs-cookbook/dockerize-vuejs-app .
docker run -it -p 8080:8080 --rm --name dockerize-vuejs-app-1 vuejs-cookbook/dockerize-vuejs-app


