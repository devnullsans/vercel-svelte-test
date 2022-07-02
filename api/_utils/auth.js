export default authorization => {
  const base64 =  authorization.slice(7);
  const credentials = Buffer.from(base64, 'base64').toString('utf-8');
  const [username, password] = credentials.split(':');
console.log(base64, credentials, username, password);
  if (username === process.env.USERNAME && password === process.env.PASSWORD) {
    return true;
  }
console.log(process.env.USERNAME, process.env.PASSWORD);
  return false;
}
