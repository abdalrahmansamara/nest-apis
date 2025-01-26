import { Injectable } from '@nestjs/common';

import type { User } from './user.interface';

const roles: Record<string, string[]> = {
  admin: ['admin', 'user'],
  user: ['user'],
  server: ['server'],
};

const ids: Record<string, string> = {
  admin: '73ceb20b-ca2d-46d9-b12a-aba53eab903d',
  user: 'd6d3b4ba-f89f-4bef-bfb1-64e1177794b1',
  server: '77aac95b-47d9-4cf1-a9f8-e7b1a57053b9',
};

@Injectable()
export class UserService {
  public async fetch(username: string): Promise<(User & { password: string }) | null> {
    if (ids[username] && username !== 'server') {
      return Promise.resolve({
        id: ids[username],
        // eslint-disable-next-line sonarjs/no-hardcoded-credentials
        password: 'crypto',
        name: username,
        email: `${username}@test.com`,
        roles: roles[username] ?? [],
      });
    }
    return null;
  }
}
