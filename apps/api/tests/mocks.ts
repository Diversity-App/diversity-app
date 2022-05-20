import { PrismaClient } from '@prisma/client';
import { DeepMockProxy, mockDeep, mockReset } from 'jest-mock-extended';

import prisma from '../src/tools/prisma';

jest.mock('../src/tools/prisma', () => ({
    __esModule: true,
    default: mockDeep<PrismaClient>(),
}));

// jest.mock('bcrypt', () => ({
//     __esModule: true,
//     default: mockDeep<bcrypt>(),
// }));

beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    mockReset(prismaMock);
});

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;
