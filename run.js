const ascii = `⠀⠀⠀⠀⢀⡠⠤⠔⢲⢶⡖⠒⠤⢄⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⣠⡚⠁⢀⠀⠀⢄⢻⣿⠀⠀⠀⡙⣷⢤⡀⠀⠀⠀⠀⠀⠀
⠀⡜⢱⣇⠀⣧⢣⡀⠀⡀⢻⡇⠀⡄⢰⣿⣷⡌⣢⡀⠀⠀⠀⠀
⠸⡇⡎⡿⣆⠹⣷⡹⣄⠙⣽⣿⢸⣧⣼⣿⣿⣿⣶⣼⣆⠀⠀⠀
⣷⡇⣷⡇⢹⢳⡽⣿⡽⣷⡜⣿⣾⢸⣿⣿⣿⣿⣿⣿⣿⣷⣄⠀
⣿⡇⡿⣿⠀⠣⠹⣾⣿⣮⠿⣞⣿⢸⣿⣛⢿⣿⡟⠯⠉⠙⠛⠓
⣿⣇⣷⠙⡇⠀⠁⠀⠉⣽⣷⣾⢿⢸⣿⠀⢸⣿⢿⠀⠀⠀⠀⠀
⡟⢿⣿⣷⣾⣆⠀⠀⠘⠘⠿⠛⢸⣼⣿⢖⣼⣿⠘⡆⠀⠀⠀⠀
⠃⢸⣿⣿⡘⠋⠀⠀⠀⠀⠀⠀⣸⣿⣿⣿⣿⣿⡆⠇⠀⠀⠀⠀
⠀⢸⡿⣿⣇⠀⠈⠀⠤⠀⠀⢀⣿⣿⣿⣿⣿⣿⣧⢸⠀⠀⠀⠀
⠀⠈⡇⣿⣿⣷⣤⣀⠀⣀⠔⠋⣿⣿⣿⣿⣿⡟⣿⡞⡄⠀⠀⠀
⠀⠀⢿⢸⣿⣿⣿⣿⣿⡇⠀⢠⣿⡏⢿⣿⣿⡇⢸⣇⠇⠀⠀⠀
⠀⠀⢸⡏⣿⣿⣿⠟⠋⣀⠠⣾⣿⠡⠀⢉⢟⠷⢼⣿⣿⠀⠀⠀
⠀⠀⠈⣷⡏⡱⠁⠀⠊⠀⠀⣿⣏⣀⡠⢣⠃⠀⠀⢹⣿⡄⠀⠀
⠀⠀⠘⢼⣿⠀⢠⣤⣀⠉⣹⡿⠀⠁⠀⡸⠀⠀⠀⠈⣿⡇⠀⠀`;

const chalk = require("chalk");
const pm2 = require("pm2"); // Add PM2 dependency for programmatic control

const Connecting = async ({
  update,
  conn,
  Boom,
  DisconnectReason,
  sleep,
  color,
  clientstart,
}) => {   
  const { connection, lastDisconnect } = update;
  if (connection === 'close') {
    const reason = new Boom(lastDisconnect?.error)?.output.statusCode;
    console.log(color(lastDisconnect.error, 'deeppink'));

    if (lastDisconnect.error === 'Error: Stream Errored (unknown)') {
      console.log(chalk.red.bold('Unknown stream error, restarting Dexter-md via PM2...'));
      pm2.restart('Dexter-md', (err) => {
        if (err) console.error(chalk.red.bold('PM2 restart failed:', err));
      });
    } else if (reason === DisconnectReason.badSession) {
      console.log(chalk.red.bold('Bad session file, please delete session and scan again'));
      pm2.stop('Dexter-md', (err) => {
        if (err) console.error(chalk.red.bold('PM2 stop failed:', err));
        else console.log(chalk.red.bold('Dexter-md stopped. Please delete session folder and restart.'));
      });
    } else if (reason === DisconnectReason.connectionClosed) {
      console.log(chalk.red.bold('Connection closed, restarting Dexter-md via PM2...'));
      pm2.restart('Dexter-md', (err) => {
        if (err) console.error(chalk.red.bold('PM2 restart failed:', err));
      });
    } else if (reason === DisconnectReason.connectionLost) {
      console.log(chalk.red.bold('Connection lost, restarting Dexter-md via PM2...'));
      pm2.restart('Dexter-md', (err) => {
        if (err) console.error(chalk.red.bold('PM2 restart failed:', err));
      });
    } else if (reason === DisconnectReason.connectionReplaced) {
      console.log(chalk.red.bold('Connection replaced, another new session opened, please close current session first'));
      conn.logout();
    } else if (reason === DisconnectReason.loggedOut) {
      console.log(chalk.red.bold('Device logged out, please scan again and restart Dexter-md.'));
      pm2.stop('Dexter-md', (err) => {
        if (err) console.error(chalk.red.bold('PM2 stop failed:', err));
        else console.log(chalk.red.bold('Dexter-md stopped. Please scan again and restart.'));
      });
    } else if (reason === DisconnectReason.restartRequired) {
      console.log(chalk.yellow.bold('Restart required, restarting Dexter-md...'));
      await clientstart();
    } else if (reason === DisconnectReason.timedOut) {
      console.log(chalk.yellow.bold('Connection timed out, restarting Dexter-md via PM2...'));
      pm2.restart('Dexter-md', (err) => {
        if (err) console.error(chalk.red.bold('PM2 restart failed:', err));
      });
    }
  } else if (connection === 'connecting') {
    console.log(chalk.blue.bold('Connecting Dexter-md . . .'));
  } else if (connection === 'open') {
    console.log(`${ascii}`);
    console.log(chalk.blue.bold('Dexter-md successfully connected'));
  }
};

module.exports = { Connecting };
