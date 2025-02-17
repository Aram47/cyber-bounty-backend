-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "key" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FileInfo" (
    "id" SERIAL NOT NULL,
    "encRandKey" TEXT NOT NULL,
    "hashData" TEXT NOT NULL,
    "recipientsId" INTEGER NOT NULL,
    "authorId" INTEGER NOT NULL,

    CONSTRAINT "FileInfo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_key_key" ON "User"("key");

-- CreateIndex
CREATE UNIQUE INDEX "FileInfo_encRandKey_key" ON "FileInfo"("encRandKey");

-- CreateIndex
CREATE UNIQUE INDEX "FileInfo_hashData_key" ON "FileInfo"("hashData");

-- CreateIndex
CREATE UNIQUE INDEX "FileInfo_recipientsId_key" ON "FileInfo"("recipientsId");

-- AddForeignKey
ALTER TABLE "FileInfo" ADD CONSTRAINT "FileInfo_recipientsId_fkey" FOREIGN KEY ("recipientsId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FileInfo" ADD CONSTRAINT "FileInfo_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
