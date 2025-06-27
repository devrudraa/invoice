DROP INDEX "authenticator_credentialID_unique";--> statement-breakpoint
DROP INDEX "user_email_unique";--> statement-breakpoint
ALTER TABLE `user` ALTER COLUMN "email" TO "email" text;--> statement-breakpoint
CREATE UNIQUE INDEX `authenticator_credentialID_unique` ON `authenticator` (`credentialID`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);--> statement-breakpoint
ALTER TABLE `user` ALTER COLUMN "emailVerified" TO "emailVerified" integer;--> statement-breakpoint
ALTER TABLE `user` ADD `name` text;