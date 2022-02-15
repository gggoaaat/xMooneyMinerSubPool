-- Table: MinerData.TempPayout

-- DROP TABLE "MinerData"."TempPayout";

CREATE TABLE IF NOT EXISTS "MinerData"."TempPayout"
(
    "PayOutID" bigint,
    "Miner" character varying(100) COLLATE pg_catalog."default",
    "Martian" character varying(4) COLLATE pg_catalog."default",
    "WalletAddress" character varying(500) COLLATE pg_catalog."default",
    "Ethereum Mined" numeric,
    "Mooney Earned" double precision,
    "Mooney Bonus" double precision,
    "Mooney Earned w Reflections" double precision,
    "Mining Period Avg Hashrate" character varying(100) COLLATE pg_catalog."default",
    "Period Reported Hashrate Avg" character varying(100) COLLATE pg_catalog."default",
    "Period Current Hashrate Avg" character varying(100) COLLATE pg_catalog."default",
    "Mining Period Shares" double precision,
    "Worker Mining Period Share" double precision,
    "Pool Period Mined Amount" double precision,
    "Successful Pulse" bigint,
    processed boolean,
    "Total Workers" bigint,
    "Time Available" double precision
)

TABLESPACE pg_default;

ALTER TABLE "MinerData"."TempPayout"
    OWNER to mooney;
-- Index: Index_TempPayout_ID

-- DROP INDEX "MinerData"."Index_TempPayout_ID";

CREATE INDEX "Index_TempPayout_ID"
    ON "MinerData"."TempPayout" USING btree
    ("PayOutID" ASC NULLS LAST)
    TABLESPACE pg_default;