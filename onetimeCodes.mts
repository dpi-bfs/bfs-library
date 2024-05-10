/**
 * Source: "John Bentley's \OneDrive - DPIE\Documents\Sda\Code\Typescript\library\"
 * Warning: Don't edit outside of that location.
 * Author: John Bentley
 */

import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';

const ALGORITHM = 'aes-256-cbc';
const KEY = crypto.randomBytes(32); // This should be kept secure
const IV = crypto.randomBytes(16); // This should be kept secure

function encrypt(text: string) {
  let cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(KEY), IV);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return encrypted.toString('hex');
}

function decrypt(text: string) {
  let encryptedText = Buffer.from(text, 'hex');
  let decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(KEY), IV);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

function generateCode() {
  let timestamp = new Date().toISOString();
  let uuid = uuidv4();
  let data = `${timestamp}|${uuid}`;
  return encrypt(data);
}

function validateCode(code: string) {
  try {
    let decryptedData = decrypt(code);
    let [timestampStr, uuidStr] = decryptedData.split('|');
    let timestamp = new Date(timestampStr);
    let now = new Date();
    let diffHours = Math.abs(now.getTime() - timestamp.getTime()) / 3600000;
    if (diffHours > 24) {
      return false; // Code expired
    }
    return true; // Code valid
  } catch {
    return false; // Code invalid
  }
}
