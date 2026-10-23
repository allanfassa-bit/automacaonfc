import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId); /* CRITICAL: The app will break without this line */
export const auth = getAuth();

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
  };
}

export function isFirestoreQuotaError(error: unknown): boolean {
  if (!error) return false;
  const msg = error instanceof Error ? error.message : String(error);
  const code = (error as any)?.code;
  return (
    code === 'resource-exhausted' ||
    code === 8 ||
    msg.includes('RESOURCE_EXHAUSTED') ||
    msg.includes('resource-exhausted') ||
    msg.includes('Quota limit exceeded') ||
    msg.includes('Free daily write units') ||
    msg.includes('Free daily read units')
  );
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errString = error instanceof Error ? error.message : String(error);
  const isQuota = isFirestoreQuotaError(error);

  const errInfo: FirestoreErrorInfo = {
    error: errString,
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
    },
    operationType,
    path,
  };

  if (isQuota) {
    console.warn(
      `[Firestore Quota Protection Active]: Operação '${operationType}' em '${path || 'desconhecido'}' excedeu a cota diária gratuita do Firestore. Os dados permanecem preservados no armazenamento local e em memória (localStorage + cache).`,
      errInfo
    );
    // Do not throw so the user interface and CRM operations remain uninterrupted
    return;
  }

  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

let clientQuotaExhaustedUntil = 0;

export async function safeFirestoreWrite<T>(writeFn: () => Promise<T>): Promise<T | null> {
  if (Date.now() < clientQuotaExhaustedUntil) {
    return null;
  }
  try {
    return await writeFn();
  } catch (err: any) {
    if (isFirestoreQuotaError(err)) {
      clientQuotaExhaustedUntil = Date.now() + 10 * 60 * 1000;
      console.warn('[Firestore Client Quota Active]: Cota diária gratuita do Firestore atingida. O app está operando em Modo Resiliente com localStorage e cache.');
    } else {
      console.warn('[Firestore Write Resilient Fallback]:', err);
    }
    return null;
  }
}


