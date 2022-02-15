-- Table: MinerData.MinersHistory

-- DROP TABLE "MinerData"."MinersHistory";

CREATE TABLE IF NOT EXISTS "MinerData"."MinersHistory"
(
    "Handle" character varying COLLATE pg_catalog."default" NOT NULL,
    "WalletAddress" character varying COLLATE pg_catalog."default" NOT NULL,
    "OGID" bigint,
    "SnapTime" timestamp without time zone DEFAULT now()
)

TABLESPACE pg_default;

ALTER TABLE "MinerData"."MinersHistory"
    OWNER to mooney;