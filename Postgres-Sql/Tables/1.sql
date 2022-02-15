-- Table: MinerData.Miners

-- DROP TABLE "MinerData"."Miners";

CREATE TABLE IF NOT EXISTS "MinerData"."Miners"
(
    "Handle" character varying COLLATE pg_catalog."default" NOT NULL,
    "WalletAddress" character varying COLLATE pg_catalog."default" NOT NULL,
    "ID" integer NOT NULL DEFAULT nextval('"MinerData"."Miners_ID_seq"'::regclass),
    "Martian" character varying COLLATE pg_catalog."default"
)

TABLESPACE pg_default;

ALTER TABLE "MinerData"."Miners"
    OWNER to mooney;