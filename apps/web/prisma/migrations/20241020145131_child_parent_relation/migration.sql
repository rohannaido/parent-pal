-- CreateTable
CREATE TABLE "ChildParent" (
    "id" TEXT NOT NULL,
    "childId" TEXT NOT NULL,
    "parentId" TEXT NOT NULL,

    CONSTRAINT "ChildParent_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ChildParent" ADD CONSTRAINT "ChildParent_childId_fkey" FOREIGN KEY ("childId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChildParent" ADD CONSTRAINT "ChildParent_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
