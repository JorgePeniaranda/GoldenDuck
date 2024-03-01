/*
  Warnings:

  - You are about to drop the column `date_end` on the `investment` table. All the data in the column will be lost.
  - You are about to drop the column `date_end` on the `loan` table. All the data in the column will be lost.
  - Added the required column `dateEnd` to the `Investment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateEnd` to the `Loan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `investment` DROP COLUMN `date_end`,
    ADD COLUMN `dateEnd` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `loan` DROP COLUMN `date_end`,
    ADD COLUMN `dateEnd` DATETIME(3) NOT NULL;
