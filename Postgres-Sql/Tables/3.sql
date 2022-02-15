-- Table: MinerData.MinersAndWorkersHistory

-- DROP TABLE "MinerData"."MinersAndWorkersHistory";

CREATE TABLE IF NOT EXISTS "MinerData"."MinersAndWorkersHistory"
(
    "ID" integer NOT NULL DEFAULT nextval('"MinerData"."MinersAndWokers_ID_seq"'::regclass),
    "Miner" character varying COLLATE pg_catalog."default" NOT NULL,
    worker character varying COLLATE pg_catalog."default" NOT NULL,
    "OGID" bigint,
    "SnapTime" timestamp without time zone DEFAULT now()
)

TABLESPACE pg_default;

ALTER TABLE "MinerData"."MinersAndWorkersHistory"
    OWNER to mooney;