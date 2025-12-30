/**
 * Asynchronous function to send a request to a client using a specified command.
 *
 * @param {Object} client - The client object to send the request to.
 * @param {string} command - The command to be sent to the client.
 * @param {Function} callback - The callback function to handle the response or errors.
 * @returns {Promise<void>} - A Promise that resolves once the request is processed.
 */
export async function sendRequest (client, command, callback) {
  try {
    const batchResponse = await client.send(command);
    console.log(batchResponse);
  } catch (err) {
    console.log(err);
    callback(null, {
      errors: ` 
    ${JSON.stringify(err)}`
    });
  }
};
