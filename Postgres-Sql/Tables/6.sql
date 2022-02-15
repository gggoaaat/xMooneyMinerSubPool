-- Table: MinerData.Worker_Log

-- DROP TABLE "MinerData"."Worker_Log";

CREATE TABLE IF NOT EXISTS "MinerData"."Worker_Log"
(
    "ID" bigint NOT NULL DEFAULT nextval('"MinerData"."Worker_Log_ID_seq"'::regclass),
    worker character varying COLLATE pg_catalog."default" NOT NULL,
    "time" bigint NOT NULL,
    "lastSeen" bigint,
    "reportedHashrate" double precision,
    "currentHashrate" double precision,
    "validShares" bigint,
    "invalidShares" bigint,
    "staleShares" bigint,
    "entryDate" timestamp with time zone NOT NULL DEFAULT now(),
    processed boolean NOT NULL DEFAULT false,
    CONSTRAINT "Worker_Log_pkey" PRIMARY KEY (worker, "time")
)

TABLESPACE pg_default;

ALTER TABLE "MinerData"."Worker_Log"
    OWNER to mooney;
-- Index: Index_Processed

-- DROP INDEX "MinerData"."Index_Processed";

CREATE INDEX "Index_Processed"
    ON "MinerData"."Worker_Log" USING btree
    (processed ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: Index_Time

-- DROP INDEX "MinerData"."Index_Time";

CREATE INDEX "Index_Time"
    ON "MinerData"."Worker_Log" USING btree
    ("time" DESC NULLS LAST)
    TABLESPACE pg_default;
-- Index: Index_Worker_Log_ID

-- DROP INDEX "MinerData"."Index_Worker_Log_ID";

CREATE INDEX "Index_Worker_Log_ID"
    ON "MinerData"."Worker_Log" USING btree
    ("ID" ASC NULLS LAST)
    TABLESPACE pg_default;