FROM node:11.9.0
RUN npm install sails -g
ENV NODE_ENV development
WORKDIR D:\Studies\2019\Summer\CloudComputing\Project\Code\employer_webservice
COPY ["package.json","package-lock.json*","npm-shrinkwrap.json*","./"]
RUN npm install
COPY . .
EXPOSE 1348
CMD sails lift 