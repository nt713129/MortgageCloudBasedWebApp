FROM node:12.2.0
RUN npm install sails -g
ENV NODE_ENV development
WORKDIR D:\MACS\Advanced Topics in Cloud Computing\Project\Project\RE_webservice
COPY ["package.json","package-lock.json*","npm-shrinkwrap.json*","./"]
RUN npm install
COPY . .
EXPOSE 1340
CMD sails lift --port 1340 