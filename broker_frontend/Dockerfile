FROM node:12.2.0
RUN npm install sails -g
ENV NODE_ENV development
WORKDIR D:\Studies\2019\Summer\CloudComputing\Project\Code\broker_frontend
COPY ["package.json","package-lock.json*","npm-shrinkwrap.json*","./"]
RUN npm install
COPY . .
EXPOSE 1337
CMD sails lift --port 1337