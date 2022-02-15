-- Table: MinerData.MinersAndWokers

-- DROP TABLE "MinerData"."MinersAndWokers";

CREATE TABLE IF NOT EXISTS "MinerData"."MinersAndWokers"
(
    "ID" integer NOT NULL DEFAULT nextval('"MinerData"."MinersAndWokers_ID_seq"'::regclass),
    "Miner" character varying COLLATE pg_catalog."default" NOT NULL,
    worker character varying COLLATE pg_catalog."default" NOT NULL
)

TABLESPACE pg_default;

ALTER TABLE "MinerData"."MinersAndWokers"
    OWNER to mooney;