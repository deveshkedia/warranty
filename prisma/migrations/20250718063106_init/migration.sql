-- CreateTable
CREATE TABLE "Warranty" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "warranty_id" INTEGER NOT NULL,
    "customer_name" TEXT NOT NULL,
    "customer_address" TEXT NOT NULL,
    "customer_phone" TEXT NOT NULL,
    "customer_email" TEXT NOT NULL,
    "invoice_number" TEXT NOT NULL,
    "date_purchase" DATETIME NOT NULL,
    CONSTRAINT "Customer_warranty_id_fkey" FOREIGN KEY ("warranty_id") REFERENCES "Warranty" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "warranty_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "warranty_period" TEXT NOT NULL,
    "batch_number" TEXT NOT NULL,
    "area_of_painting" TEXT NOT NULL,
    CONSTRAINT "Product_warranty_id_fkey" FOREIGN KEY ("warranty_id") REFERENCES "Warranty" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Application" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "warranty_id" INTEGER NOT NULL,
    "authorized_by" TEXT NOT NULL,
    "primer_qty" TEXT NOT NULL,
    "primer_used" TEXT NOT NULL,
    "surface_value" TEXT NOT NULL,
    CONSTRAINT "Application_warranty_id_fkey" FOREIGN KEY ("warranty_id") REFERENCES "Warranty" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Customer_warranty_id_key" ON "Customer"("warranty_id");

-- CreateIndex
CREATE UNIQUE INDEX "Product_warranty_id_key" ON "Product"("warranty_id");

-- CreateIndex
CREATE UNIQUE INDEX "Application_warranty_id_key" ON "Application"("warranty_id");
