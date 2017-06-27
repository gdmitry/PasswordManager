import { Injectable } from '@angular/core';
import { AuthUser } from './auth.user';

const CREDENTIALS_KEY = 'Credentials';

@Injectable()
export class CredentialsService {
	getCredentials(): Promise<AuthUser[]> {
		return new Promise(resolve => {
			let storedCredentials = JSON.parse(localStorage.getItem(CREDENTIALS_KEY)) || [];
			resolve(storedCredentials);
		});
	}

	getCredential(name: string): Promise<AuthUser> {
		return this.getCredentials()
			.then(users => users.find(user => user.name === name));
	}

	saveCredential(data: AuthUser): Promise<AuthUser> {
		return this.getCredential(data.name)
			.then((credential) => {
				if (!credential) {
					return this.getCredentials();
				}
				throw new Error('User is already existed.');
			})
			.then((credentials: AuthUser[]) => {
				credentials.push(data);
				localStorage.setItem(CREDENTIALS_KEY, JSON.stringify(credentials));
				return data;
			});
	}

	deleteCredential(userName: string): Promise<AuthUser[]> {
		return this.getCredentials()
			.then((credentials: AuthUser[]) => {
				let filtered = credentials.filter((credential) => {
					return credential.name !== userName;
				});
				localStorage.setItem(CREDENTIALS_KEY, JSON.stringify(filtered));
				return filtered;
			});
	}

	updateCredential(data: AuthUser): Promise<AuthUser> {
		return this.getCredential(data.name)
			.then((credential) => {
				if (credential) {
					return this.getCredentials();
				}
				throw new Error('User does not exist.');
			})
			.then((credentials: AuthUser[]) => {
				let index = credentials.findIndex((credential) => {
					return credential.name === data.name;
				});
				credentials[index].password = data.password;
				localStorage.setItem(CREDENTIALS_KEY, JSON.stringify(credentials));
				return data;
			});
	}
}