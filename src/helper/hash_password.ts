import * as crypto from "crypto";

// Function ini di gunakan untuk encrpt data password kita atau hashing data password kita
export function hashPassword(password: string, salt: string): Promise<string> {
    // Ngebuat password baru gabungan dari password and salt yang di acak
    return new Promise((resolve, reject) => {
        crypto.pbkdf2(password, salt, 50, 100, 'sha512', (err, values) => {
            if (err) {
                return reject(err);
            }

            resolve(values.toString('hex'));
        })
    });
}
