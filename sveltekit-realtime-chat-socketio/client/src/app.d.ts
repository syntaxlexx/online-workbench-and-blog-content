// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types

import type { User } from './lib/types';

declare namespace App {
	interface Locals {
		user?: User
	}

	// interface PageData {}
	interface Error {
		message: string | null;
	}

	// interface Platform {}
	interface PrivateEnv {
		// $env/static/private
		DB_URI: string;
		DB_NAME: string;
		APP_ENV: string;
		DOMAIN: string;

		JWT_SECRET: string;
	}

	interface PublicEnv {
		// $env/static/public
		// PUBLIC_GOOGLE_CLIENT_ID: string;
		PUBLIC_APP_NAME: string;
		PUBLIC_APP_LOGO: string;
		PUBLIC_WS_DOMAIN: string;
	}
}
