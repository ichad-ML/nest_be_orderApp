import { HttpException, HttpStatus } from '@nestjs/common';
import { EntityManager } from 'typeorm';

export const runTransaction = async (
  entityManager: EntityManager,
  transactionCallback: (
    transactionalEntityManager: EntityManager,
  ) => Promise<any>,
) => {
  try {
    await entityManager.transaction(async (transactionalEntityManager) => {
      await transactionCallback(transactionalEntityManager);
    });
  } catch (error) {
    throw new HttpException(error, HttpStatus.BAD_REQUEST);
  }
};
