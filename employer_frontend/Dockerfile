FROM node:11.9.0
RUN npm install sails -g
ENV NODE_ENV development
WORKDIR D:\Studies\2019\Summer\CloudComputing\Project\Code\employer_frontend
COPY ["package.json","package-lock.json*","npm-shrinkwrap.json*","./"]
RUN npm install
COPY . .
EXPOSE 1347
CMD sails lift 