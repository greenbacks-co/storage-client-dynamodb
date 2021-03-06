import { getClient } from 'dynamoClient';
import { AuthenticationError } from 'errors';
import settings from 'settings';

const getCredentials = () => ({
  id: settings.STORAGE_ID,
  secret: settings.STORAGE_SECRET,
});

test('get client with bad id throws authentication error', async () => {
  await expect(async () => {
    const credentials = getCredentials();
    credentials.id = 'bad';
    const client = await getClient({ credentials });
  }).rejects.toThrow(AuthenticationError);
});

test('get client with bad secret throws authentication error', async () => {
  await expect(async () => {
    const credentials = getCredentials();
    credentials.secret = 'bad';
    const client = await getClient({ credentials });
  }).rejects.toThrow(AuthenticationError);
});

jest.retryTimes(1);
test('get client with good credentials does not throw', async () => {
  const credentials = getCredentials();
  const client = await getClient({ credentials });
});
