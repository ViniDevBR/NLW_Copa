/*
  Warnings:

  - A unique constraint covering the columns `[participantsId,gamesId]` on the table `Guess` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Guess_participantsId_gamesId_key" ON "Guess"("participantsId", "gamesId");
