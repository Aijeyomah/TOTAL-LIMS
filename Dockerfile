FROM node:12

WORKDIR /usr/src/total-project

COPY ./ ./

RUN npm install

CMD ["/bin/bash"]
