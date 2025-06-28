PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_invoice` (
	`id` text PRIMARY KEY NOT NULL,
	`invoiceName` text NOT NULL,
	`createdAt` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updatedAt` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`dueDate` text NOT NULL,
	`date` integer NOT NULL,
	`status` text NOT NULL,
	`fromName` text NOT NULL,
	`fromEmail` text NOT NULL,
	`fromAddress` text NOT NULL,
	`clientName` text NOT NULL,
	`clientEmail` text NOT NULL,
	`clientAddress` text NOT NULL,
	`currency` text NOT NULL,
	`invoiceNumber` integer NOT NULL,
	`invoiceItemDescription` text NOT NULL,
	`invoiceItemQuantity` integer NOT NULL,
	`invoiceItemRate` integer NOT NULL,
	`invoiceItemTotal` integer NOT NULL,
	`note` text,
	`userId` text NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_invoice`("id", "invoiceName", "createdAt", "updatedAt", "dueDate", "date", "status", "fromName", "fromEmail", "fromAddress", "clientName", "clientEmail", "clientAddress", "currency", "invoiceNumber", "invoiceItemDescription", "invoiceItemQuantity", "invoiceItemRate", "invoiceItemTotal", "note", "userId") SELECT "id", "invoiceName", "createdAt", "updatedAt", "dueDate", "date", "status", "fromName", "fromEmail", "fromAddress", "clientName", "clientEmail", "clientAddress", "currency", "invoiceNumber", "invoiceItemDescription", "invoiceItemQuantity", "invoiceItemRate", "invoiceItemTotal", "note", "userId" FROM `invoice`;--> statement-breakpoint
DROP TABLE `invoice`;--> statement-breakpoint
ALTER TABLE `__new_invoice` RENAME TO `invoice`;--> statement-breakpoint
PRAGMA foreign_keys=ON;