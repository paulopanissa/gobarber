import server from './app';

const port = 3001;

server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Start server in: http://127.0.0.1:${port}`);
});
